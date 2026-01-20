---
title: "Passo a passo do contrato da ponte padrão do Optimism"
description: "Como funciona a ponte padrão para o Optimism? Por que funciona desta maneira?"
author: |
  Ori Pomerantz
tags: [ "solidez", "ponte", "camada 2" ]
skill: intermediate
published: 2022-03-30
lang: pt-br
---

[Optimism](https://www.optimism.io/) é um [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/).
Os optimistic rollups podem processar transações por um preço muito mais baixo do que a Rede Principal da Ethereum (também conhecida como camada 1 ou L1), porque as transações são processadas apenas por alguns nós, em vez de por todos os nós na rede.
Ao mesmo tempo, todos os dados são escritos na L1, para que tudo possa ser provado e reconstruído com todas as garantias de integridade e disponibilidade da Rede Principal.

Para usar ativos da L1 no Optimism (ou em qualquer outra L2), os ativos precisam ser [transferidos por ponte](/bridges/#prerequisites).
Uma maneira de conseguir isso é os usuários bloquearem ativos (ETH e [tokens ERC-20](/developers/docs/standards/tokens/erc-20/) são os mais comuns) na L1 e receberem ativos equivalentes para usar na L2.
Eventualmente, quem quer que acabe com eles pode querer transferi-los por ponte de volta para a L1.
Ao fazer isso, os ativos são queimados na L2 e então liberados de volta para o usuário na L1.

É assim que a [ponte padrão do Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge) funciona.
Neste artigo, analisamos o código-fonte dessa ponte para ver como ela funciona e estudá-la como um exemplo de código Solidity bem escrito.

## Fluxos de controle {#control-flows}

A ponte tem dois fluxos principais:

- Depósito (da L1 para a L2)
- Retirada (da L2 para a L1)

### Fluxo de depósito {#deposit-flow}

#### Camada 1 {#deposit-flow-layer-1}

1. Ao depositar um ERC-20, o depositante concede à ponte uma autorização para gastar o valor que está sendo depositado
2. O depositante chama a ponte da L1 (`depositERC20`, `depositERC20To`, `depositETH` ou `depositETHTo`)
3. A ponte da L1 toma posse do ativo transferido pela ponte
   - ETH: o ativo é transferido pelo depositante como parte da chamada
   - ERC-20: o ativo é transferido pela ponte para si mesma usando a autorização fornecida pelo depositante
4. A ponte da L1 usa o mecanismo de mensagens entre domínios para chamar `finalizeDeposit` na ponte da L2

#### Camada 2 {#deposit-flow-layer-2}

5. A ponte da L2 verifica se a chamada para `finalizeDeposit` é legítima:
   - Veio do contrato de mensagens entre domínios
   - Era originalmente da ponte na L1
6. A ponte da L2 verifica se o contrato do token ERC-20 na L2 é o correto:
   - O contrato da L2 informa que sua contraparte da L1 é a mesma de onde os tokens vieram na L1
   - O contrato da L2 informa que suporta a interface correta ([usando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Se o contrato da L2 for o correto, chame-o para cunhar o número apropriado de tokens para o endereço apropriado. Caso contrário, inicie um processo de retirada para permitir que o usuário resgate os tokens na L1.

### Fluxo de retirada {#withdrawal-flow}

#### Camada 2 {#withdrawal-flow-layer-2}

1. O sacador chama a ponte da L2 (`withdraw` ou `withdrawTo`)
2. A ponte da L2 queima o número apropriado de tokens pertencentes a `msg.sender`
3. A ponte da L2 usa o mecanismo de mensagens entre domínios para chamar `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` na ponte da L1

#### Camada 1 {#withdrawal-flow-layer-1}

4. A ponte da L1 verifica se a chamada para `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` é legítima:
   - Veio do mecanismo de mensagens entre domínios
   - Foi originada da ponte na L2
5. A ponte da L1 transfere o ativo apropriado (ETH ou ERC-20) para o endereço apropriado

## Código da Camada 1 {#layer-1-code}

Este é o código que é executado na L1, a Rede Principal da Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Esta interface é definida aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Ela inclui funções e definições necessárias para a transferência de tokens ERC-20 por ponte.

```solidity
// SPDX-License-Identifier: MIT
```

[A maior parte do código do Optimism é lançada sob a licença MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

No momento em que este artigo foi escrito, a versão mais recente do Solidity era a 0.8.12.
Até que a versão 0.9.0 seja lançada, não sabemos se este código é compatível com ela ou não.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Eventos *
     **********/

    event ERC20DepositInitiated(
```

Na terminologia de ponte do Optimism, _deposit_ (depósito) significa transferência da L1 para a L2, e _withdrawal_ (retirada) significa uma transferência da L2 para a L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Na maioria dos casos, o endereço de um ERC-20 na L1 não é o mesmo que o endereço do ERC-20 equivalente na L2.
[Você pode ver a lista de endereços de token aqui](https://static.optimism.io/optimism.tokenlist.json).
O endereço com `chainId` 1 está na L1 (Rede Principal) e o endereço com `chainId` 10 está na L2 (Optimism).
Os outros dois valores de `chainId` são para a rede de teste Kovan (42) e a rede de teste Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

É possível adicionar anotações às transferências, e nesse caso, elas são adicionadas aos eventos que as relatam.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

O mesmo contrato de ponte lida com transferências em ambas as direções.
No caso da ponte da L1, isso significa a inicialização de depósitos e a finalização de retiradas.

```solidity

    /********************
     * Funções Públicas *
     ********************/

    /**
     * @dev obtém o endereço do contrato da ponte da L2 correspondente.
     * @return Endereço do contrato da ponte da L2 correspondente.
     */
    function l2TokenBridge() external returns (address);
```

Esta função não é realmente necessária, porque na L2 ela é um contrato pré-implantado, então está sempre no endereço `0x4200000000000000000000000000000000000010`.
Ela está aqui por simetria com a ponte da L2, porque o endereço da ponte da L1 _não_ é trivial de saber.

```solidity
    /**
     * @dev deposita uma quantia do ERC20 no saldo do chamador na L2.
     * @param _l1Token Endereço do ERC20 da L1 que estamos depositando
     * @param _l2Token Endereço do respectivo ERC20 da L2
     * @param _amount Quantia do ERC20 a ser depositada
     * @param _l2Gas Limite de gás necessário para completar o depósito na L2.
     * @param _data Dados opcionais para encaminhar para a L2. Estes dados são fornecidos
     *        apenas como uma conveniência para contratos externos. Além de impor um comprimento
     *        máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

O parâmetro `_l2Gas` é a quantidade de gás da L2 que a transação pode gastar.
[Até um certo limite (alto), isso é gratuito](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), então, a menos que o contrato ERC-20 faça algo muito estranho durante a cunhagem, não deve ser um problema.
Esta função cuida do cenário comum, em que um usuário transfere ativos por ponte para o mesmo endereço em uma blockchain diferente.

```solidity
    /**
     * @dev deposita uma quantia de ERC20 no saldo de um destinatário na L2.
     * @param _l1Token Endereço do ERC20 da L1 que estamos depositando
     * @param _l2Token Endereço do respectivo ERC20 da L2
     * @param _to endereço da L2 para creditar a retirada.
     * @param _amount Quantia do ERC20 a ser depositada.
     * @param _l2Gas Limite de gás necessário para completar o depósito na L2.
     * @param _data Dados opcionais para encaminhar para a L2. Estes dados são fornecidos
     *        apenas como uma conveniência para contratos externos. Além de impor um comprimento
     *        máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Esta função é quase idêntica a `depositERC20`, mas permite que você envie o ERC-20 para um endereço diferente.

```solidity
    /*************************
     * Funções entre cadeias *
     *************************/

    /**
     * @dev Completa uma retirada da L2 para a L1 e credita fundos no saldo do destinatário do
     * token ERC20 da L1.
     * Esta chamada falhará se a retirada iniciada da L2 não tiver sido finalizada.
     *
     * @param _l1Token Endereço do token da L1 para o qual finalizeWithdrawal será executado.
     * @param _l2Token Endereço do token da L2 onde a retirada foi iniciada.
     * @param _from Endereço da L2 que iniciou a transferência.
     * @param _to Endereço da L1 para creditar a retirada.
     * @param _amount Quantia do ERC20 a ser depositada.
     * @param _data Dados fornecidos pelo remetente na L2. Estes dados são fornecidos
     *   apenas como uma conveniência para contratos externos. Além de impor um comprimento
     *   máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

As retiradas (e outras mensagens da L2 para a L1) no Optimism são um processo de duas etapas:

1. Uma transação de iniciação na L2.
2. Uma transação de finalização ou de resgate na L1.
   Essa transação precisa acontecer após o término do [período de contestação de falhas](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) para a transação da L2.

### IL1StandardBridge {#il1standardbridge}

[Esta interface é definida aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Este arquivo contém definições de evento e função para ETH.
Essas definições são muito semelhantes às definidas em `IL1ERC20Bridge` acima para ERC-20.

A interface da ponte é dividida em dois arquivos porque alguns tokens ERC-20 exigem processamento personalizado e não podem ser tratados pela ponte padrão.
Dessa forma, a ponte personalizada que lida com esse token pode implementar `IL1ERC20Bridge` e não precisar também transferir ETH por ponte.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Eventos *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Este evento é quase idêntico à versão ERC-20 (`ERC20DepositInitiated`), exceto que não tem os endereços de token da L1 e da L2.
O mesmo se aplica aos outros eventos e funções.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Funções Públicas *
     ********************/

    /**
     * @dev Deposita uma quantia de ETH no saldo do chamador na L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposita uma quantia de ETH no saldo de um destinatário na L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Funções entre cadeias *
     *************************/

    /**
     * @dev Completa uma retirada da L2 para a L1 e credita os fundos no saldo do destinatário do
     * token ETH da L1. Como apenas o xDomainMessenger pode chamar esta função, ela nunca será chamada
     * antes da finalização da retirada.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Este contrato](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) é herdado por ambas as pontes ([L1](#the-l1-bridge-contract) e [L2](#the-l2-bridge-contract)) para enviar mensagens para a outra camada.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importações de Interface */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) informa ao contrato como enviar mensagens para a outra camada, usando o mensageiro entre domínios.
Este mensageiro entre domínios é um sistema completamente diferente, e merece seu próprio artigo, que espero escrever no futuro.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Contrato auxiliar para contratos que realizam comunicações entre domínios
 *
 * Compilador usado: definido pelo contrato herdado
 */
contract CrossDomainEnabled {
    /*************
     * Variáveis *
     *************/

    // Contrato de mensageiro usado para enviar e receber mensagens do outro domínio.
    address public messenger;

    /***************
     * Construtor *
     ***************/

    /**
     * @param _messenger Endereço do CrossDomainMessenger na camada atual.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

O único parâmetro que o contrato precisa saber é o endereço do mensageiro entre domínios nessa camada.
Este parâmetro é definido uma vez, no construtor, e nunca muda.

```solidity

    /**********************
     * Modificadores de Função *
     **********************/

    /**
     * Garante que a função modificada só pode ser chamada por uma conta específica de outro domínio.
     * @param _sourceDomainAccount A única conta no domínio de origem que está
     *  autenticada para chamar esta função.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

O sistema de mensagens entre domínios é acessível por qualquer contrato na blockchain em que está sendo executado (seja a Rede Principal da Ethereum ou o Optimism).
Mas precisamos que a ponte de cada lado confie _apenas_ em certas mensagens se elas vierem da ponte do outro lado.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: contrato de mensageiro não autenticado"
        );
```

Apenas mensagens do mensageiro entre domínios apropriado (`messenger`, como você verá abaixo) são confiáveis.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: remetente incorreto da mensagem entre domínios"
        );
```

A forma como o mensageiro entre domínios fornece o endereço que enviou uma mensagem para a outra camada é através da [função `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Desde que seja chamada na transação que foi iniciada pela mensagem, ela pode fornecer esta informação.

Precisamos ter certeza de que a mensagem que recebemos veio da outra ponte.

```solidity

        _;
    }

    /**********************
     * Funções Internas *
     **********************/

    /**
     * Obtém o mensageiro, geralmente do armazenamento. Esta função é exposta caso um contrato filho
     * precise substituí-la.
     * @return O endereço do contrato do mensageiro entre domínios que deve ser usado.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Esta função retorna o mensageiro entre domínios.
Usamos uma função em vez da variável `messenger` para permitir que contratos que herdam deste usem um algoritmo para especificar qual mensageiro entre domínios usar.

```solidity

    /**
     * Envia uma mensagem para uma conta em outro domínio
     * @param _crossDomainTarget O destinatário pretendido no domínio de destino
     * @param _message Os dados a serem enviados para o destino (geralmente calldata para uma função com
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit O gasLimit para o recebimento da mensagem no domínio de destino.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Finalmente, a função que envia uma mensagem para a outra camada.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) é um analisador estático que o Optimism executa em cada contrato para procurar por vulnerabilidades e outros problemas em potencial.
Nesse caso, a linha seguinte aciona duas vulnerabilidades:

1. [Eventos de reentrância](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrância benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Neste caso, não estamos preocupados com a reentrância, pois sabemos que `getCrossDomainMessenger()` retorna um endereço confiável, mesmo que o Slither não tenha como saber disso.

### O contrato da ponte da L1 {#the-l1-bridge-contract}

[O código-fonte para este contrato está aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

As interfaces podem fazer parte de outros contratos, por isso precisam suportar uma ampla gama de versões do Solidity.
Mas a ponte em si é nosso contrato, e podemos ser rigorosos sobre qual versão do Solidity ela usa.

```solidity
/* Importações de Interface */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) e [IL1StandardBridge](#IL1StandardBridge) são explicados acima.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nos permite criar mensagens para controlar a ponte padrão na L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Esta interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nos permite controlar contratos ERC-20.
[Você pode ler mais sobre isso aqui](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importações de Biblioteca */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Como explicado acima](#crossdomainenabled), este contrato é usado para mensagens entre camadas.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

`Lib_PredeployAddresses` (https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) tem os endereços para os contratos da L2 que sempre têm o mesmo endereço. Isso inclui a ponte padrão na L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitários de Endereço do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). É usado para distinguir entre endereços de contrato e aqueles pertencentes a contas de propriedade externa (EOA).

Note que esta não é uma solução perfeita, porque não há como distinguir entre chamadas diretas e chamadas feitas a partir do construtor de um contrato, mas pelo menos isso nos permite identificar e prevenir alguns erros comuns de usuários.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[O padrão ERC-20](https://eips.ethereum.org/EIPS/eip-20) suporta duas maneiras para um contrato relatar falhas:

1. Reverter
2. Retornar `false`

Lidar com ambos os casos tornaria nosso código mais complicado, então, em vez disso, usamos o [`SafeERC20` do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), que garante que [todas as falhas resultem em uma reversão](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev A Ponte de ETH e ERC20 da L1 é um contrato que armazena fundos depositados da L1 e tokens padrão
 * que estão em uso na L2. Ela sincroniza uma Ponte da L2 correspondente, informando-a sobre depósitos
 * e escutando-a para novas retiradas finalizadas.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Esta linha é como especificamos o uso do wrapper `SafeERC20` toda vez que usamos a interface `IERC20`.

```solidity

    /********************************
     * Referências de Contratos Externos *
     ********************************/

    address public l2TokenBridge;
```

O endereço do [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Mapeia o token da L1 para o token da L2 para o saldo do token da L1 depositado
    mapping(address => mapping(address => uint256)) public deposits;
```

Um [mapeamento](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) duplo como este é a maneira de definir uma [matriz esparsa bidimensional](https://en.wikipedia.org/wiki/Sparse_matrix).
Os valores nesta estrutura de dados são identificados como `deposit[L1 token addr][L2 token addr]`.
O valor padrão é zero.
Apenas as células que são definidas com um valor diferente são escritas no armazenamento.

```solidity

    /***************
     * Construtor *
     ***************/

    // Este contrato vive por trás de um proxy, então os parâmetros do construtor não serão utilizados.
    constructor() CrossDomainEnabled(address(0)) {}
```

Para poder atualizar este contrato sem ter que copiar todas as variáveis no armazenamento.
Para fazer isso, usamos um [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), um contrato que usa [`delegatecall`](https://solidity-by-example.org/delegatecall/) para transferir chamadas para um contrato separado cujo endereço é armazenado pelo contrato proxy (quando você atualiza, você diz ao proxy para mudar esse endereço).
Quando você usa `delegatecall`, o armazenamento permanece o armazenamento do contrato _chamador_, então os valores de todas as variáveis de estado do contrato não são afetados.

Um efeito deste padrão é que o armazenamento do contrato que é o _chamado_ de `delegatecall` não é usado e, portanto, os valores do construtor passados para ele não importam.
Esta é a razão pela qual podemos fornecer um valor sem sentido para o construtor `CrossDomainEnabled`.
É também a razão pela qual a inicialização abaixo é separada do construtor.

```solidity
    /******************
     * Inicialização *
     ******************/

    /**
     * @param _l1messenger Endereço do Mensageiro da L1 sendo usado para comunicações entre cadeias.
     * @param _l2TokenBridge Endereço da ponte padrão da L2.
     */
    // slither-disable-next-line external-function
```

Este [teste do Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica funções que não são chamadas do código do contrato e que, portanto, poderiam ser declaradas `external` em vez de `public`.
O custo de gás de funções `external` pode ser menor, porque elas podem receber parâmetros no calldata.
Funções declaradas como `public` precisam ser acessíveis de dentro do contrato.
Contratos não podem modificar seu próprio calldata, então os parâmetros precisam estar na memória.
Quando tal função é chamada externamente, é necessário copiar o calldata para a memória, o que custa gás.
Neste caso, a função é chamada apenas uma vez, então a ineficiência não importa para nós.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "O contrato já foi inicializado.");
```

A função `initialize` deve ser chamada apenas uma vez.
Se o endereço do mensageiro entre domínios da L1 ou da ponte de token da L2 mudar, criamos um novo proxy e uma nova ponte que o chama.
Isso é improvável de acontecer, exceto quando todo o sistema é atualizado, uma ocorrência muito rara.

Note que esta função não tem nenhum mecanismo que restringe _quem_ pode chamá-la.
Isso significa que, em teoria, um invasor poderia esperar até que implantemos o proxy e a primeira versão da ponte e, em seguida, usar [front-run](https://solidity-by-example.org/hacks/front-running/) para chegar à função `initialize` antes que o usuário legítimo o faça. Mas há dois métodos para evitar isso:

1. Se os contratos forem implantados não diretamente por uma EOA, mas [em uma transação que tem outro contrato para criá-los](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), todo o processo pode ser atômico e terminar antes que qualquer outra transação seja executada.
2. Se a chamada legítima para `initialize` falhar, é sempre possível ignorar o proxy e a ponte recém-criados e criar novos.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Estes são os dois parâmetros que a ponte precisa conhecer.

```solidity

    /**************
     * Depósito *
     **************/

    /** @dev Modificador que exige que o remetente seja uma EOA.  Esta verificação poderia ser contornada por um
     *  contrato malicioso via initcode, mas cuida do erro de usuário que queremos evitar.
     */
    modifier onlyEOA() {
        // Usado para impedir depósitos de contratos (evita a perda acidental de tokens)
        require(!Address.isContract(msg.sender), "Conta não é EOA");
        _;
    }
```

É por essa razão que precisamos de utilitários de `Address` do OpenZeppelin.

```solidity
    /**
     * @dev Esta função pode ser chamada sem dados
     * para depositar uma quantia de ETH no saldo do chamador na L2.
     * Como a função receive não aceita dados, uma quantia
     * padrão conservadora é encaminhada para a L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

A função existe para finalidade de testes.
Note que ela não aparece nas definições de interface - não é para uso corrente.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Estas duas funções são wrappers em volta do `_initiateETHDeposit`, a função que lida com o depósito real de ETH.

```solidity
    /**
     * @dev Executa a lógica para depósitos armazenando o ETH e informando o Gateway de ETH da L2 sobre
     * o depósito.
     * @param _from Conta da qual o depósito será retirado na L1.
     * @param _to Conta para a qual o depósito será creditado na L2.
     * @param _l2Gas Limite de gás necessário para completar o depósito na L2.
     * @param _data Dados opcionais para encaminhar para a L2. Estes dados são fornecidos
     *        apenas como uma conveniência para contratos externos. Além de impor um comprimento
     *        máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Constrói o calldata para a chamada finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

A maneira como as mensagens entre domínios funcionam é que o contrato de destino é chamado com a mensagem como seu calldata.
Os contratos Solidity sempre interpretam seu calldata de acordo com
[as especificações da ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
A função do Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) cria esse calldata.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

A mensagem aqui é para chamar [a função `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) com estes parâmetros:

| Parâmetro                       | Valor                                                                                    | Significado                                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Valor especial para representar ETH (que não é um token ERC-20) na L1                                                                             |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | O contrato da L2 que gerencia ETH no Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (este contrato é para uso interno do Optimism apenas) |
| \_from    | \_from                                                             | O endereço na L1 que envia o ETH                                                                                                                                     |
| \_to      | \_to                                                               | O endereço na L2 que recebe o ETH                                                                                                                                    |
| quantidade                      | msg.value                                                                | Quantidade de wei enviado (que já foi enviado para a ponte)                                                                                       |
| \_data    | \_data                                                             | Dados adicionais para anexar ao depósito                                                                                                                             |

```solidity
        // Envia o calldata para a L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Envia a mensagem através do mensageiro entre domínios.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emite um evento para informar qualquer aplicativo descentralizado que escuta esta transferência.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Estas duas funções são wrappers em volta do `_initiateERC20Deposit`, a função que manipula o depósito real do ERC-20.

```solidity
    /**
     * @dev Executa a lógica para depósitos, informando o contrato do Token Depositado da L2
     * sobre o depósito e chamando um manipulador para bloquear os fundos da L1. (ex: transferFrom)
     *
     * @param _l1Token Endereço do ERC20 da L1 que estamos depositando
     * @param _l2Token Endereço do respectivo ERC20 da L2
     * @param _from Conta da qual o depósito será retirado na L1
     * @param _to Conta para a qual o depósito será creditado na L2
     * @param _amount Quantia do ERC20 a ser depositada.
     * @param _l2Gas Limite de gás necessário para completar o depósito na L2.
     * @param _data Dados opcionais para encaminhar para a L2. Estes dados são fornecidos
     *        apenas como uma conveniência para contratos externos. Além de impor um comprimento
     *        máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Esta função é semelhante a `_initiateETHDeposit` acima, com algumas diferenças importantes.
A primeira diferença é que esta função recebe os endereços de token e a quantia a ser transferida como parâmetros.
No caso do ETH, a chamada para a ponte já inclui a transferência do ativo para a conta da ponte (`msg.value`).

```solidity
        // Quando um depósito é iniciado na L1, a Ponte da L1 transfere os fundos para si mesma para futuras
        // retiradas. safeTransferFrom também verifica se o contrato tem código, então isso falhará se
        // _from for uma EOA ou address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

As transferências de token ERC-20 seguem um processo diferente do ETH:

1. O usuário (`_from`) concede uma autorização à ponte para transferir os tokens apropriados.
2. O usuário chama a ponte com o endereço do contrato do token, a quantia, etc.
3. A ponte transfere os tokens (para si mesma) como parte do processo de depósito.

O primeiro passo pode acontecer em uma transação separada dos dois últimos.
No entanto, o front-running não é um problema porque as duas funções que chamam `_initiateERC20Deposit` (`depositERC20` e `depositERC20To`) só chamam esta função com `msg.sender` como o parâmetro `_from`.

```solidity
        // Constrói o calldata para _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Envia o calldata para a L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Adiciona a quantia depositada de tokens à estrutura de dados `deposits`.
Pode haver múltiplos endereços na L2 que correspondem ao mesmo token ERC-20 da L1, então não é suficiente usar o saldo da ponte do token ERC-20 da L1 para rastrear os depósitos.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Funções entre cadeias *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

A ponte da L2 envia uma mensagem para o mensageiro entre domínios da L2, o que faz com que o mensageiro entre domínios da L1 chame esta função (uma vez que a [transação que finaliza a mensagem](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) seja enviada na L1, é claro).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Certifique-se de que esta é uma mensagem _legítima_, vinda do mensageiro entre domínios e originada na ponte de tokens da L2.
Esta função é usada para retirar ETH da ponte, então temos que ter certeza de que ela só é chamada pelo chamador autorizado.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

A maneira de transferir ETH é chamar o destinatário com a quantia de wei no `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: falha na transferência de ETH");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emite um evento sobre a retirada.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Esta função é semelhante a `finalizeETHWithdrawal` acima, com as alterações necessárias para tokens ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Atualiza a estrutura de dados `deposits`.

```solidity

        // Quando uma retirada é finalizada na L1, a Ponte da L1 transfere os fundos para o sacador
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporário - Migrando ETH *
     *****************************/

    /**
     * @dev Adiciona saldo de ETH à conta. Isso serve para permitir que o ETH
     * seja migrado de um gateway antigo para um novo gateway.
     * OBS: Isso é deixado para apenas uma atualização, para que possamos receber o ETH migrado do
     * contrato antigo
     */
    function donateETH() external payable {}
}
```

Havia uma implementação anterior da ponte.
Quando mudamos da implementação anterior para esta, tivemos que mover todos os ativos.
Os tokens ERC-20 podem simplesmente ser movidos.
No entanto, para transferir ETH para um contrato, você precisa da aprovação desse contrato, que é o que `donateETH` nos fornece.

## Tokens ERC-20 na L2 {#erc-20-tokens-on-l2}

Para um token ERC-20 se encaixar na ponte padrão, ele precisa permitir que a ponte padrão, e _apenas_ a ponte padrão, cunhe o token.
Isso é necessário porque as pontes precisam garantir que o número de tokens circulando no Optimism seja igual ao número de tokens bloqueados dentro do contrato da ponte da L1.
Se houver muitos tokens na L2, alguns usuários não conseguirão transferir seus ativos de volta para a L1 por meio da ponte.
Em vez de uma ponte confiável, estaríamos essencialmente recriando o [sistema de reservas fracionárias](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Se houver tokens demais na L1, alguns desses tokens ficariam bloqueados dentro do contrato da ponte para sempre, porque não há como liberá-los sem queimar tokens da L2.

### IL2StandardERC20 {#il2standarderc20}

Todo token ERC-20 na L2 que usa a ponte padrão precisa fornecer [esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), que tem as funções e eventos de que a ponte padrão precisa.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[A interface padrão ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) não inclui as funções `mint` e `burn`.
Esses métodos não são exigidos pelo [padrão ERC-20](https://eips.ethereum.org/EIPS/eip-20), que não especifica os mecanismos para criar e destruir tokens.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[A interface ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) é usada para especificar quais funções um contrato fornece.
[Você pode ler o padrão aqui](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Esta função fornece o endereço do token da L1 que é transferido por ponte para este contrato.
Observe que não temos uma função semelhante na direção oposta.
Precisamos ser capazes de transferir por ponte qualquer token da L1, independentemente de o suporte à L2 ter sido planejado quando ele foi implementado ou não.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funções e eventos para cunhar (criar) e queimar (destruir) tokens.
A ponte deve ser a única entidade que pode executar essas funções para garantir que o número de tokens esteja correto (igual ao número de tokens bloqueados na L1).

### L2StandardERC20 {#L2StandardERC20}

[Esta é a nossa implementação da interface `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
A menos que você precise de algum tipo de lógica personalizada, você deve usar esta.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[O contrato ERC-20 do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
O Optimism não acredita em reinventar a roda, especialmente quando a roda é bem auditada e precisa ser confiável o suficiente para guardar ativos.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Estes são os dois parâmetros de configuração adicionais que exigimos e que um ERC-20 normalmente não exige.

```solidity

    /**
     * @param _l2Bridge Endereço da ponte padrão da L2.
     * @param _l1Token Endereço do token correspondente da L1.
     * @param _name Nome do ERC20.
     * @param _symbol Símbolo do ERC20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Primeiro chame o construtor do contrato que herdamos (`ERC20(_name, _symbol)`) e depois defina nossas próprias variáveis.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Apenas a Ponte da L2 pode cunhar e queimar");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

É assim que o [ERC-165](https://eips.ethereum.org/EIPS/eip-165) funciona.
Cada interface é um número de funções suportadas e é identificada como o [ou exclusivo](https://en.wikipedia.org/wiki/Exclusive_or) dos [seletores de função da ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) dessas funções.

A ponte da L2 usa o ERC-165 como uma verificação de sanidade para garantir que o contrato ERC-20 para o qual envia ativos é um `IL2StandardERC20`.

**Observação:** Não há nada que impeça um contrato mal-intencionado de fornecer respostas falsas para `supportsInterface`, portanto, este é um mecanismo de verificação de sanidade, _não_ um mecanismo de segurança.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Apenas a ponte da L2 pode cunhar e queimar ativos.

`_mint` e `_burn` são, na verdade, definidos no [contrato ERC-20 da OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Aquele contrato simplesmente não os expõe externamente, porque as condições para cunhar e queimar tokens são tão variadas quanto o número de maneiras de usar o ERC-20.

## Código da Ponte da L2 {#l2-bridge-code}

Este é o código que executa a ponte no Optimism.
[A fonte para este contrato está aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importações de Interface */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

A interface [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) é muito semelhante ao [equivalente da L1](#IL1ERC20Bridge) que vimos acima.
Há duas diferenças significativas:

1. Na L1, você inicia depósitos e finaliza retiradas.
   Aqui, você inicia retiradas e finaliza depósitos.
2. Na L1, é necessário distinguir entre tokens ETH e ERC-20.
   Na L2, podemos usar as mesmas funções para ambos, porque internamente os saldos de ETH no Optimism são tratados como um token ERC-20 com o endereço [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importações de Biblioteca */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importações de Contrato */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev A ponte Padrão da L2 é um contrato que funciona em conjunto com a ponte Padrão da L1 para
 * permitir transições de ETH e ERC20 entre L1 e L2.
 * Este contrato atua como um cunhador para novos tokens quando ouve sobre depósitos na Ponte Padrão
 * da L1.
 * Este contrato também atua como um queimador dos tokens destinados à retirada, informando à ponte
 * da L1 para liberar fundos da L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Referências de Contratos Externos *
     ********************************/

    address public l1TokenBridge;
```

Acompanhe o endereço da ponte da L1.
Observe que, em contraste com o equivalente da L1, aqui _precisamos_ desta variável.
O endereço da ponte da L1 não é conhecido antecipadamente.

```solidity

    /***************
     * Construtor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mensageiro entre domínios usado por este contrato.
     * @param _l1TokenBridge Endereço da ponte da L1 implantada na cadeia principal.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Retirada *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Estas duas funções iniciam as retiradas.
Observe que não há necessidade de especificar o endereço do token da L1.
Espera-se que os tokens da L2 nos digam o endereço do equivalente da L1.

```solidity

    /**
     * @dev Executa a lógica para retiradas, queimando o token e informando
     *      o Gateway de Token da L1 sobre a retirada.
     * @param _l2Token Endereço do token da L2 onde a retirada é iniciada.
     * @param _from Conta da qual a retirada será retirada na L2.
     * @param _to Conta para a qual a retirada será creditada na L1.
     * @param _amount Quantidade do token a ser retirado.
     * @param _l1Gas Não utilizado, mas incluído para possíveis considerações de compatibilidade futura.
     * @param _data Dados opcionais para encaminhar para a L1. Estes dados são fornecidos
     *        apenas como uma conveniência para contratos externos. Além de impor um comprimento
     *        máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Quando uma retirada é iniciada, nós queimamos os fundos do sacador para evitar o uso subsequente na L2
        //
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Observe que não estamos confiando no parâmetro `_from`, mas em `msg.sender`, que é muito mais difícil de falsificar (impossível, até onde eu sei).

```solidity

        // Constrói o calldata para l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na L1, é necessário distinguir entre ETH e ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Envia a mensagem para a ponte da L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Função entre cadeias: Depósito *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Essa função é chamada pelo `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Certifique-se de que a origem da mensagem é legítima.
Isso é importante porque a função chama `_mint` e poderia ser usada para dar tokens que não são cobertos pelos tokens que a ponte possui na L1.

```solidity
        // Verifica se o token de destino é compatível e
        // verifica se o token depositado na L1 corresponde à representação do token depositado na L2 aqui
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Verificações de sanidade:

1. A interface correta é suportada
2. O endereço L1 do contrato ERC-20 da L2 corresponde à origem dos tokens na L1

```solidity
        ) {
            // Quando um depósito é finalizado, creditamos na conta da L2 a mesma quantidade de
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Se a verificação de sanidade passar, finalize o depósito:

1. Cunhar os tokens
2. Emitir o evento apropriado

```solidity
        } else {
            // Ou o token da L2 que está sendo depositado discorda sobre o endereço correto
            // de seu token da L1, ou não suporta a interface correta.
            // Isso só deve acontecer se houver um token malicioso na L2, ou se um usuário de alguma forma
            // especificou o endereço errado do token da L2 para depositar.
            // Em ambos os casos, paramos o processo aqui e construímos uma mensagem de retirada
            // para que os usuários possam retirar seus fundos em alguns casos.
            // Não há como evitar contratos de token maliciosos completamente, mas isso limita
            // o erro do usuário e mitiga algumas formas de comportamento de contrato malicioso.
```

Se um usuário cometeu um erro detectável usando o endereço de token da L2 errado, queremos cancelar o depósito e retornar os tokens na L1.
A única maneira de fazer isso a partir da L2 é enviar uma mensagem que terá que esperar o período de contestação de falhas, mas isso é muito melhor para o usuário do que perder os tokens permanentemente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // trocou o _to e o _from aqui para devolver o depósito ao remetente
                _from,
                _amount,
                _data
            );

            // Envia a mensagem para a ponte da L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusão {#conclusion}

A ponte padrão é o mecanismo mais flexível para transferência de ativos.
Porém, por ser genérico não é sempre o mecanismo mais fácil de usar.
Especialmente para retiradas, a maioria dos usuários prefere usar [pontes de terceiros](https://optimism.io/apps#bridge) que não esperam o período de desafio e não exigem uma prova de Merkle para finalizar a retirada.

Estas pontes tipicamente funcionam tendo ativos na L1, que elas fornecem imediatamente por uma taxa pequena (geralmente menor que o custo de gás para uma retirada de uma ponte padrão).
Quando a ponte (ou as pessoas que a administram) antecipa a falta de ativos da L1, ela transfere ativos suficientes da L2. Como estes são saques muito grandes, o custo do saque é amortizado por uma grande quantia e é um percentual muito menor.

Esperamos que este artigo tenha ajudado você a entender mais sobre como a camada 2 funciona e como escrever um código Solidity claro e seguro.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
