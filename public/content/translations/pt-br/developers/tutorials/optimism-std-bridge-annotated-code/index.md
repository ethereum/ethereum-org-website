---
title: "Passo a passo do contrato da ponte padrão do Optimism"
description: Como funciona a ponte padrão do Optimism? Por que ela funciona dessa maneira?
author: Ori Pomerantz
tags: ["Solidity", "ponte", "camada 2 (l2)"]
skill: intermediate
breadcrumb: Ponte do Optimism
published: 2022-03-30
lang: pt-br
---

[Optimism](https://www.optimism.io/) é um [rollup otimista](/developers/docs/scaling/optimistic-rollups/).
Rollups otimistas podem processar transações por um preço muito menor do que a Rede Principal do Ethereum (também conhecida como camada 1 (l1)) porque as transações são processadas apenas por alguns nós, em vez de todos os nós da rede.
Ao mesmo tempo, todos os dados são gravados na l1 para que tudo possa ser provado e reconstruído com todas as garantias de integridade e disponibilidade da Mainnet.

Para usar ativos da l1 no Optimism (ou em qualquer outra l2), os ativos precisam ser [transferidos via ponte](/bridges/#prerequisites).
Uma maneira de conseguir isso é os usuários bloquearem ativos (ETH e [tokens ERC-20](/developers/docs/standards/tokens/erc-20/) são os mais comuns) na l1 e receberem ativos equivalentes para usar na l2.
Eventualmente, quem acabar com eles pode querer transferi-los via ponte de volta para a l1.
Ao fazer isso, os ativos são queimados na l2 e, em seguida, liberados de volta para o usuário na l1.

É assim que a [ponte padrão do Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge) funciona.
Neste artigo, analisamos o código-fonte dessa ponte para ver como ela funciona e estudá-la como um exemplo de código Solidity bem escrito.

## Fluxos de controle {#control-flows}

A ponte tem dois fluxos principais:

- Depósito (da l1 para a l2)
- Saque (da l2 para a l1)

### Fluxo de depósito {#deposit-flow}

#### Camada 1 {#deposit-flow-layer-1}

1. Se estiver depositando um ERC-20, o depositante dá à ponte uma permissão para gastar o valor que está sendo depositado
2. O depositante chama a ponte da l1 (`depositERC20`, `depositERC20To`, `depositETH` ou `depositETHTo`)
3. A ponte da l1 toma posse do ativo transferido via ponte
   - ETH: O ativo é transferido pelo depositante como parte da chamada
   - ERC-20: O ativo é transferido pela ponte para si mesma usando a permissão fornecida pelo depositante
4. A ponte da l1 usa o mecanismo de mensagem de domínio cruzado para chamar `finalizeDeposit` na ponte da l2

#### Camada 2 {#deposit-flow-layer-2}

5. A ponte da l2 verifica se a chamada para `finalizeDeposit` é legítima:
   - Veio do contrato de mensagem de domínio cruzado
   - Era originalmente da ponte na l1
6. A ponte da l2 verifica se o contrato do token ERC-20 na l2 é o correto:
   - O contrato da l2 relata que sua contraparte da l1 é a mesma de onde os tokens vieram na l1
   - O contrato da l2 relata que suporta a interface correta ([usando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Se o contrato da l2 for o correto, chame-o para cunhar o número apropriado de tokens para o endereço apropriado. Caso contrário, inicie um processo de saque para permitir que o usuário reivindique os tokens na l1.

### Fluxo de saque {#withdrawal-flow}

#### Camada 2 {#withdrawal-flow-layer-2}

1. O sacador chama a ponte da l2 (`withdraw` ou `withdrawTo`)
2. A ponte da l2 queima o número apropriado de tokens pertencentes a `msg.sender`
3. A ponte da l2 usa o mecanismo de mensagem de domínio cruzado para chamar `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` na ponte da l1

#### Camada 1 {#withdrawal-flow-layer-1}

4. A ponte da l1 verifica se a chamada para `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` é legítima:
   - Veio do mecanismo de mensagem de domínio cruzado
   - Era originalmente da ponte na l2
5. A ponte da l1 transfere o ativo apropriado (ETH ou ERC-20) para o endereço apropriado

## Código da camada 1 {#layer-1-code}

Este é o código que é executado na l1, a Rede Principal do Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Esta interface é definida aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Ela inclui funções e definições necessárias para transferir tokens ERC-20 via ponte.

```solidity
// SPDX-License-Identifier: MIT
```

[A maior parte do código do Optimism é lançada sob a licença MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

No momento da redação, a versão mais recente da Solidity é a 0.8.12.
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

Na terminologia da ponte do Optimism, _depósito_ significa transferência da l1 para a l2, e _saque_ significa uma transferência da l2 para a l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Na maioria dos casos, o endereço de um ERC-20 na l1 não é o mesmo endereço do ERC-20 equivalente na l2.
[Você pode ver a lista de endereços de tokens aqui](https://static.optimism.io/optimism.tokenlist.json).
O endereço com `chainId` 1 está na l1 (Mainnet) e o endereço com `chainId` 10 está na l2 (Optimism).
Os outros dois valores de `chainId` são para a rede de teste Kovan (42) e a rede de teste Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

É possível adicionar notas às transferências, caso em que elas são adicionadas aos eventos que as relatam.

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
No caso da ponte da l1, isso significa inicialização de depósitos e finalização de saques.

```solidity

    /********************
     * Funções Públicas *
     ********************/

    /**
     * @dev obtém o endereço do contrato de ponte da l2 correspondente.
     * @return Endereço do contrato de ponte da l2 correspondente.
     */
    function l2TokenBridge() external returns (address);
```

Esta função não é realmente necessária, porque na l2 é um contrato pré-implantado, então está sempre no endereço `0x4200000000000000000000000000000000000010`.
Ela está aqui por simetria com a ponte da l2, porque o endereço da ponte da l1 _não_ é trivial de se saber.

```solidity
    /**
     * @dev deposita uma quantia do ERC-20 no saldo do chamador na l2.
     * @param _l1Token Endereço do ERC-20 da l1 que estamos depositando
     * @param _l2Token Endereço do respectivo ERC-20 da l2 da l1
     * @param _amount Quantia do ERC-20 a depositar
     * @param _l2Gas Limite de gás exigido para concluir o depósito na l2.
     * @param _data Dados opcionais para encaminhar para a l2. Estes dados são fornecidos
     *        exclusivamente como uma conveniência para contratos externos. Além de exigir um
     *        comprimento máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

O parâmetro `_l2Gas` é a quantidade de gás da l2 que a transação tem permissão para gastar.
[Até um certo limite (alto), isso é gratuito](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), então, a menos que o contrato ERC-20 faça algo realmente estranho ao cunhar, isso não deve ser um problema.
Esta função cuida do cenário comum, onde um usuário transfere ativos via ponte para o mesmo endereço em uma blockchain diferente.

```solidity
    /**
     * @dev deposita uma quantia de ERC-20 no saldo de um destinatário na l2.
     * @param _l1Token Endereço do ERC-20 da l1 que estamos depositando
     * @param _l2Token Endereço do respectivo ERC-20 da l2 da l1
     * @param _to Endereço da l2 para creditar o saque.
     * @param _amount Quantia do ERC-20 a depositar.
     * @param _l2Gas Limite de gás exigido para concluir o depósito na l2.
     * @param _data Dados opcionais para encaminhar para a l2. Estes dados são fornecidos
     *        exclusivamente como uma conveniência para contratos externos. Além de exigir um
     *        comprimento máximo, estes contratos não fornecem garantias sobre seu conteúdo.
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
     * Funções Cross-chain *
     *************************/

    /**
     * @dev Conclui um saque da l2 para a l1 e credita fundos no saldo do destinatário do
     * token ERC-20 da l1.
     * Esta chamada falhará se o saque inicializado da l2 não tiver sido finalizado.
     *
     * @param _l1Token Endereço do token da l1 para o qual fazer finalizeWithdrawal.
     * @param _l2Token Endereço do token da l2 onde o saque foi iniciado.
     * @param _from Endereço da l2 iniciando a transferência.
     * @param _to Endereço da l1 para creditar o saque.
     * @param _amount Quantia do ERC-20 a depositar.
     * @param _data Dados fornecidos pelo remetente na l2. Estes dados são fornecidos
     *   exclusivamente como uma conveniência para contratos externos. Além de exigir um
     *   comprimento máximo, estes contratos não fornecem garantias sobre seu conteúdo.
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

Saques (e outras mensagens da l2 para a l1) no Optimism são um processo de duas etapas:

1. Uma transação de inicialização na l2.
2. Uma transação de finalização ou reivindicação na l1.
   Esta transação precisa acontecer após o término do [período de desafio de falha](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) para a transação da l2.

### IL1StandardBridge {#il1standardbridge}

[Esta interface é definida aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Este arquivo contém definições de eventos e funções para ETH.
Essas definições são muito semelhantes àquelas definidas em `IL1ERC20Bridge` acima para ERC-20.

A interface da ponte é dividida entre dois arquivos porque alguns tokens ERC-20 exigem processamento personalizado e não podem ser manipulados pela ponte padrão.
Dessa forma, a ponte personalizada que lida com tal token pode implementar `IL1ERC20Bridge` e não ter que transferir ETH via ponte também.

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

Este evento é quase idêntico à versão ERC-20 (`ERC20DepositInitiated`), exceto sem os endereços de token da l1 e l2.
O mesmo vale para os outros eventos e as funções.

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
     * @dev Deposita uma quantia do ETH no saldo do chamador na l2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposita uma quantia de ETH no saldo de um destinatário na l2.
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
     * Funções Cross-chain *
     *************************/

    /**
     * @dev Conclui um saque da l2 para a l1 e credita fundos no saldo do destinatário do
     * token ETH da l1. Como apenas o xDomainMessenger pode chamar esta função, ela nunca será chamada
     * antes que o saque seja finalizado.
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

[Este contrato](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) é herdado por ambas as pontes ([l1](#the-l1-bridge-contract) e [l2](#l2-bridge-code)) para enviar mensagens para a outra camada.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importações de Interface */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) diz ao contrato como enviar mensagens para a outra camada, usando o mensageiro de domínio cruzado.
Este mensageiro de domínio cruzado é um sistema totalmente diferente e merece seu próprio artigo, que espero escrever no futuro.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Contrato auxiliar para contratos realizando comunicações entre domínios
 *
 * Compilador usado: definido pelo contrato herdeiro
 */
contract CrossDomainEnabled {
    /*************
     * Variáveis *
     *************/

    // Contrato mensageiro usado para enviar e receber mensagens do outro domínio.
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

O único parâmetro que o contrato precisa saber, o endereço do mensageiro de domínio cruzado nesta camada.
Este parâmetro é definido uma vez, no construtor, e nunca muda.

```solidity

    /**********************
     * Modificadores de Função *
     **********************/

    /**
     * Exige que a função modificada seja chamável apenas por uma conta de domínio cruzado específica.
     * @param _sourceDomainAccount A única conta no domínio de origem que está
     *  autenticada para chamar esta função.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

As mensagens de domínio cruzado são acessíveis por qualquer contrato na blockchain onde estão sendo executadas (seja a Mainnet do Ethereum ou o Optimism).
Mas precisamos que a ponte de cada lado _apenas_ confie em certas mensagens se elas vierem da ponte do outro lado.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Apenas mensagens do mensageiro de domínio cruzado apropriado (`messenger`, como você vê abaixo) podem ser confiáveis.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

A maneira como o mensageiro de domínio cruzado fornece o endereço que enviou uma mensagem com a outra camada é [a função `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Desde que seja chamada na transação que foi iniciada pela mensagem, ela pode fornecer essas informações.

Precisamos ter certeza de que a mensagem que recebemos veio da outra ponte.

```solidity

        _;
    }

    /**********************
     * Funções Internas *
     **********************/

    /**
     * Obtém o mensageiro, geralmente do armazenamento. Esta função é exposta caso um contrato filho
     * precise sobrescrever.
     * @return O endereço do contrato mensageiro de domínio cruzado que deve ser usado.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Esta função retorna o mensageiro de domínio cruzado.
Usamos uma função em vez da variável `messenger` para permitir que contratos que herdam deste usem um algoritmo para especificar qual mensageiro de domínio cruzado usar.

```solidity

    /**
     * Envia uma mensagem para uma conta em outro domínio
     * @param _crossDomainTarget O destinatário pretendido no domínio de destino
     * @param _message Os dados a enviar para o alvo (geralmente dados de chamada para uma função com
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit O limite de gás para o recebimento da mensagem no domínio de destino.
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

[Slither](https://github.com/crytic/slither) é um analisador estático que o Optimism executa em cada contrato para procurar vulnerabilidades e outros problemas potenciais.
Neste caso, a linha a seguir aciona duas vulnerabilidades:

1. [Eventos de reentrada](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrada benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Neste caso, não estamos preocupados com a reentrada, sabemos que `getCrossDomainMessenger()` retorna um endereço confiável, mesmo que o Slither não tenha como saber disso.

### O contrato da ponte da l1 {#the-l1-bridge-contract}

[O código-fonte para este contrato está aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

As interfaces podem fazer parte de outros contratos, então elas precisam suportar uma ampla gama de versões da Solidity.
Mas a ponte em si é o nosso contrato, e podemos ser rigorosos sobre qual versão da Solidity ela usa.

```solidity
/* Importações de Interface */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) e [IL1StandardBridge](#il1standardbridge) são explicados acima.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nos permite criar mensagens para controlar a ponte padrão na l2.

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

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) tem os endereços para os contratos da l2 que sempre têm o mesmo endereço. Isso inclui a ponte padrão na l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitários de endereço do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). É usado para distinguir entre endereços de contrato e aqueles pertencentes a contas de propriedade externa (EOA).

Observe que esta não é uma solução perfeita, porque não há como distinguir entre chamadas diretas e chamadas feitas a partir do construtor de um contrato, mas pelo menos isso nos permite identificar e evitar alguns erros comuns do usuário.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[O padrão ERC-20](https://eips.ethereum.org/EIPS/eip-20) suporta duas maneiras de um contrato relatar falha:

1. Reverter
2. Retornar `false`

Lidar com ambos os casos tornaria nosso código mais complicado, então, em vez disso, usamos o [`SafeERC20` do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), que garante que [todas as falhas resultem em uma reversão](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev A ponte de ETH e ERC-20 da l1 é um contrato que armazena fundos da l1 depositados e tokens
 * padrão que estão em uso na l2. Ela sincroniza uma ponte da l2 correspondente, informando-a sobre depósitos
 * e ouvindo-a para saques recém-finalizados.
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

O endereço de [L2StandardBridge](#l2-bridge-code).

```solidity

    // Mapeia o token da l1 para o token da l2 para o saldo do token da l1 depositado
    mapping(address => mapping(address => uint256)) public deposits;
```

Um [mapeamento](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) duplo como este é a maneira de definir um [array esparso bidimensional](https://en.wikipedia.org/wiki/Sparse_matrix).
Os valores nesta estrutura de dados são identificados como `deposit[L1 token addr][L2 token addr]`.
O valor padrão é zero.
Apenas as células que são definidas com um valor diferente são gravadas no armazenamento.

```solidity

    /***************
     * Construtor *
     ***************/

    // Este contrato vive atrás de um proxy, então os parâmetros do construtor não serão usados.
    constructor() CrossDomainEnabled(address(0)) {}
```

Queremos ser capazes de atualizar este contrato sem ter que copiar todas as variáveis no armazenamento.
Para fazer isso, usamos um [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), um contrato que usa [`delegatecall`](https://solidity-by-example.org/delegatecall/) para transferir chamadas para um contrato separado cujo endereço é armazenado pelo contrato proxy (quando você atualiza, você diz ao proxy para alterar esse endereço).
Quando você usa `delegatecall`, o armazenamento permanece o armazenamento do contrato _chamador_, de modo que os valores de todas as variáveis de estado do contrato não são afetados.

Um efeito desse padrão é que o armazenamento do contrato que é o _chamado_ de `delegatecall` não é usado e, portanto, os valores do construtor passados para ele não importam.
Esta é a razão pela qual podemos fornecer um valor sem sentido para o construtor `CrossDomainEnabled`.
É também a razão pela qual a inicialização abaixo é separada do construtor.

```solidity
    /******************
     * Inicialização *
     ******************/

    /**
     * @param _l1messenger Endereço do mensageiro da l1 sendo usado para comunicações cross-chain.
     * @param _l2TokenBridge Endereço da ponte padrão da l2.
     */
    // slither-disable-next-line external-function
```

Este [teste do Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica funções que não são chamadas a partir do código do contrato e, portanto, poderiam ser declaradas como `external` em vez de `public`.
O custo de gás das funções `external` pode ser menor, porque elas podem ser fornecidas com parâmetros nos dados de chamada.
As funções declaradas como `public` devem ser acessíveis de dentro do contrato.
Os contratos não podem modificar seus próprios dados de chamada, então os parâmetros devem estar na memória.
Quando tal função é chamada externamente, é necessário copiar os dados de chamada para a memória, o que custa gás.
Neste caso, a função é chamada apenas uma vez, então a ineficiência não importa para nós.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

A função `initialize` deve ser chamada apenas uma vez.
Se o endereço do mensageiro de domínio cruzado da l1 ou da ponte de token da l2 mudar, criamos um novo proxy e uma nova ponte que o chama.
É improvável que isso aconteça, exceto quando todo o sistema for atualizado, uma ocorrência muito rara.

Observe que esta função não possui nenhum mecanismo que restrinja _quem_ pode chamá-la.
Isso significa que, em teoria, um invasor poderia esperar até implantarmos o proxy e a primeira versão da ponte e, em seguida, fazer [front-running](https://solidity-by-example.org/hacks/front-running/) para chegar à função `initialize` antes do usuário legítimo. Mas existem dois métodos para evitar isso:

1. Se os contratos não forem implantados diretamente por uma EOA, mas [em uma transação que faz com que outro contrato os crie](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), todo o processo pode ser atômico e terminar antes que qualquer outra transação seja executada.
2. Se a chamada legítima para `initialize` falhar, é sempre possível ignorar o proxy e a ponte recém-criados e criar novos.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Estes são os dois parâmetros que a ponte precisa saber.

```solidity

    /**************
     * Depositando *
     **************/

    /** @dev Modificador exigindo que o remetente seja EOA. Esta verificação poderia ser contornada por um contrato
     *  malicioso via initcode, mas cuida do erro de usuário que queremos evitar.
     */
    modifier onlyEOA() {
        // Usado para impedir depósitos de contratos (evitar tokens perdidos acidentalmente)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Esta é a razão pela qual precisávamos dos utilitários `Address` do OpenZeppelin.

```solidity
    /**
     * @dev Esta função pode ser chamada sem dados
     * para depositar uma quantia de ETH no saldo do chamador na l2.
     * Como a função receive não recebe dados, uma quantia padrão
     * conservadora é encaminhada para a l2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Esta função existe para fins de teste.
Observe que ela não aparece nas definições de interface - não é para uso normal.

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

Estas duas funções são wrappers em torno de `_initiateETHDeposit`, a função que lida com o depósito real de ETH.

```solidity
    /**
     * @dev Executa a lógica para depósitos armazenando o ETH e informando o Gateway de ETH da l2 sobre
     * o depósito.
     * @param _from Conta de onde retirar o depósito na l1.
     * @param _to Conta para a qual dar o depósito na l2.
     * @param _l2Gas Limite de gás exigido para concluir o depósito na l2.
     * @param _data Dados opcionais para encaminhar para a l2. Estes dados são fornecidos
     *        exclusivamente como uma conveniência para contratos externos. Além de exigir um
     *        comprimento máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Constrói dados de chamada para a chamada finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

A maneira como as mensagens de domínio cruzado funcionam é que o contrato de destino é chamado com a mensagem como seus dados de chamada.
Os contratos em Solidity sempre interpretam seus dados de chamada de acordo com
[as especificações da ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
A função em Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) cria esses dados de chamada.

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

| Parâmetro | Valor                          | Significado                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Valor especial para representar ETH (que não é um token ERC-20) na l1                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | O contrato da l2 que gerencia ETH no Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (este contrato é apenas para uso interno do Optimism) |
| \_from    | \_from                         | O endereço na l1 que envia o ETH                                                                                                         |
| \_to      | \_to                           | O endereço na l2 que recebe o ETH                                                                                                      |
| amount    | msg.value                      | Quantidade de Wei enviada (que já foi enviada para a ponte)                                                                               |
| \_data    | \_data                         | Dados adicionais para anexar ao depósito                                                                                                     |

```solidity
        // Envia dados de chamada para a l2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Envie a mensagem através do mensageiro de domínio cruzado.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emita um evento para informar qualquer aplicativo descentralizado (dapp) que escute essa transferência.

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

Estas duas funções são wrappers em torno de `_initiateERC20Deposit`, a função que lida com o depósito real de ERC-20.

```solidity
    /**
     * @dev Executa a lógica para depósitos informando o contrato de Token Depositado da l2
     * sobre o depósito e chamando um manipulador para bloquear os fundos da l1. (ex., transferFrom)
     *
     * @param _l1Token Endereço do ERC-20 da l1 que estamos depositando
     * @param _l2Token Endereço do respectivo ERC-20 da l2 da l1
     * @param _from Conta de onde retirar o depósito na l1
     * @param _to Conta para a qual dar o depósito na l2
     * @param _amount Quantia do ERC-20 a depositar.
     * @param _l2Gas Limite de gás exigido para concluir o depósito na l2.
     * @param _data Dados opcionais para encaminhar para a l2. Estes dados são fornecidos
     *        exclusivamente como uma conveniência para contratos externos. Além de exigir um
     *        comprimento máximo, estes contratos não fornecem garantias sobre seu conteúdo.
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
A primeira diferença é que esta função recebe os endereços do token e o valor a ser transferido como parâmetros.
No caso do ETH, a chamada para a ponte já inclui a transferência do ativo para a conta da ponte (`msg.value`).

```solidity
        // Quando um depósito é iniciado na l1, a ponte da l1 transfere os fundos para si mesma para futuros
        // saques. safeTransferFrom também verifica se o contrato tem código, então isso falhará se
        // _from for um EOA ou address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

As transferências de token ERC-20 seguem um processo diferente do ETH:

1. O usuário (`_from`) dá uma permissão à ponte para transferir os tokens apropriados.
2. O usuário chama a ponte com o endereço do contrato do token, o valor, etc.
3. A ponte transfere os tokens (para si mesma) como parte do processo de depósito.

O primeiro passo pode acontecer em uma transação separada dos dois últimos.
No entanto, o front-running não é um problema porque as duas funções que chamam `_initiateERC20Deposit` (`depositERC20` e `depositERC20To`) apenas chamam esta função com `msg.sender` como o parâmetro `_from`.

```solidity
        // Constrói dados de chamada para _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Envia dados de chamada para a l2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Adicione a quantidade depositada de tokens à estrutura de dados `deposits`.
Pode haver vários endereços na l2 que correspondem ao mesmo token ERC-20 da l1, portanto, não é suficiente usar o saldo da ponte do token ERC-20 da l1 para rastrear os depósitos.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Funções Cross-chain *
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

A ponte da l2 envia uma mensagem para o mensageiro de domínio cruzado da l2, o que faz com que o mensageiro de domínio cruzado da l1 chame esta função (uma vez que a [transação que finaliza a mensagem](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) seja enviada na l1, é claro).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Certifique-se de que esta é uma mensagem _legítima_, vinda do mensageiro de domínio cruzado e originada na ponte de token da l2.
Esta função é usada para sacar ETH da ponte, então temos que ter certeza de que ela é chamada apenas pelo chamador autorizado.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

A maneira de transferir ETH é chamar o destinatário com a quantidade de Wei no `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emita um evento sobre o saque.

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

Atualize a estrutura de dados `deposits`.

```solidity

        // Quando um saque é finalizado na l1, a ponte da l1 transfere os fundos para o sacador
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporário - Migrando ETH *
     *****************************/

    /**
     * @dev Adiciona saldo de ETH à conta. Isso tem o objetivo de permitir que o ETH
     * seja migrado de um gateway antigo para um novo gateway.
     * NOTA: Isso é deixado para apenas uma atualização para que possamos receber o ETH migrado do
     * contrato antigo
     */
    function donateETH() external payable {}
}
```

Houve uma implementação anterior da ponte.
Quando mudamos da implementação para esta, tivemos que mover todos os ativos.
Os tokens ERC-20 podem simplesmente ser movidos.
No entanto, para transferir ETH para um contrato, você precisa da aprovação desse contrato, que é o que `donateETH` nos fornece.

## Tokens ERC-20 na l2 {#erc-20-tokens-on-l2}

Para que um token ERC-20 se encaixe na ponte padrão, ele precisa permitir que a ponte padrão, e _apenas_ a ponte padrão, cunhe o token.
Isso é necessário porque as pontes precisam garantir que o número de tokens circulando no Optimism seja igual ao número de tokens bloqueados dentro do contrato da ponte da l1.
Se houver muitos tokens na l2, alguns usuários não conseguiriam transferir seus ativos via ponte de volta para a l1.
Em vez de uma ponte confiável, recriaríamos essencialmente o [sistema bancário de reservas fracionárias](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Se houver muitos tokens na l1, alguns desses tokens ficariam bloqueados dentro do contrato da ponte para sempre, porque não há como liberá-los sem queimar tokens da l2.

### IL2StandardERC20 {#il2standarderc20}

Todo token ERC-20 na l2 que usa a ponte padrão precisa fornecer [esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), que tem as funções e eventos que a ponte padrão precisa.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[A interface ERC-20 padrão](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) não inclui as funções `mint` e `burn`.
Esses métodos não são exigidos pelo [padrão ERC-20](https://eips.ethereum.org/EIPS/eip-20), que deixa não especificados os mecanismos para criar e destruir tokens.

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[A interface ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) é usada para especificar quais funções um contrato fornece.
[Você pode ler o padrão aqui](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Esta função fornece o endereço do token da l1 que é transferido via ponte para este contrato.
Observe que não temos uma função semelhante na direção oposta.
Precisamos ser capazes de transferir via ponte qualquer token da l1, independentemente de o suporte à l2 ter sido planejado quando foi implementado ou não.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funções e eventos para cunhar (criar) e queimar (destruir) tokens.
A ponte deve ser a única entidade que pode executar essas funções para garantir que o número de tokens esteja correto (igual ao número de tokens bloqueados na l1).

### L2StandardERC20 {#l2standarderc20}

[Esta é a nossa implementação da interface `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
A menos que você precise de algum tipo de lógica personalizada, você deve usar esta.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[O contrato ERC-20 do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
O Optimism não acredita em reinventar a roda, especialmente quando a roda é bem auditada e precisa ser confiável o suficiente para manter ativos.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Estes são os dois parâmetros de configuração adicionais que exigimos e que o ERC-20 normalmente não exige.

```solidity

    /**
     * @param _l2Bridge Endereço da ponte padrão da l2.
     * @param _l1Token Endereço do token da l1 correspondente.
     * @param _name Nome do ERC-20.
     * @param _symbol Símbolo do ERC-20.
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

Primeiro chame o construtor para o contrato do qual herdamos (`ERC20(_name, _symbol)`) e depois defina nossas próprias variáveis.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
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

A ponte da l2 usa o ERC-165 como uma verificação de sanidade para garantir que o contrato ERC-20 para o qual envia ativos seja um `IL2StandardERC20`.

**Nota:** Não há nada que impeça um contrato malicioso de fornecer respostas falsas para `supportsInterface`, portanto, este é um mecanismo de verificação de sanidade, _não_ um mecanismo de segurança.

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

Apenas a ponte da l2 tem permissão para cunhar e queimar ativos.

`_mint` e `_burn` são na verdade definidos no [contrato ERC-20 do OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Esse contrato apenas não os expõe externamente, porque as condições para cunhar e queimar tokens são tão variadas quanto o número de maneiras de usar o ERC-20.

## Código da ponte da l2 {#l2-bridge-code}

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

A interface [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) é muito semelhante ao [equivalente da l1](#il1erc20bridge) que vimos acima.
Existem duas diferenças significativas:

1. Na l1 você inicia depósitos e finaliza saques.
   Aqui você inicia saques e finaliza depósitos.
2. Na l1 é necessário distinguir entre ETH e tokens ERC-20.
   Na l2 podemos usar as mesmas funções para ambos porque internamente os saldos de ETH no Optimism são tratados como um token ERC-20 com o endereço [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importações de Biblioteca */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importações de Contrato */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev A ponte Padrão da l2 é um contrato que trabalha em conjunto com a ponte Padrão da l1 para
 * permitir transições de ETH e ERC-20 entre a l1 e a l2.
 * Este contrato atua como um cunhador para novos tokens quando ouve sobre depósitos na ponte Padrão
 * da l1.
 * Este contrato também atua como um queimador dos tokens destinados a saque, informando a ponte
 * da l1 para liberar fundos da l1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Referências de Contratos Externos *
     ********************************/

    address public l1TokenBridge;
```

Acompanhe o endereço da ponte da l1.
Observe que, em contraste com o equivalente da l1, aqui nós _precisamos_ desta variável.
O endereço da ponte da l1 não é conhecido com antecedência.

```solidity

    /***************
     * Construtor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mensageiro de domínio cruzado usado por este contrato.
     * @param _l1TokenBridge Endereço da ponte da l1 implantada na cadeia principal.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Sacando *
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

Estas duas funções iniciam saques.
Observe que não há necessidade de especificar o endereço do token da l1.
Espera-se que os tokens da l2 nos digam o endereço do equivalente da l1.

```solidity

    /**
     * @dev Executa a lógica para saques queimando o token e informando
     *      o Gateway de token da l1 sobre o saque.
     * @param _l2Token Endereço do token da l2 onde o saque é iniciado.
     * @param _from Conta de onde retirar o saque na l2.
     * @param _to Conta para a qual dar o saque na l1.
     * @param _amount Quantia do token a sacar.
     * @param _l1Gas Não utilizado, mas incluído para potenciais considerações de compatibilidade futura.
     * @param _data Dados opcionais para encaminhar para a l1. Estes dados são fornecidos
     *        exclusivamente como uma conveniência para contratos externos. Além de exigir um
     *        comprimento máximo, estes contratos não fornecem garantias sobre seu conteúdo.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Quando um saque é iniciado, nós queimamos os fundos do sacador para evitar o uso
        // subsequente na l2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Observe que _não_ estamos confiando no parâmetro `_from`, mas em `msg.sender`, que é muito mais difícil de falsificar (impossível, até onde eu sei).

```solidity

        // Constrói dados de chamada para l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na l1 é necessário distinguir entre ETH e ERC-20.

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

        // Envia mensagem para a ponte da l1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Função Cross-chain: Depositando *
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

Esta função é chamada por `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Certifique-se de que a fonte da mensagem seja legítima.
Isso é importante porque esta função chama `_mint` e pode ser usada para dar tokens que não são cobertos por tokens que a ponte possui na l1.

```solidity
        // Verifica se o token alvo é compatível e
        // verifica se o token depositado na l1 corresponde à representação do token depositado na l2 aqui
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Verificações de sanidade:

1. A interface correta é suportada
2. O endereço da l1 do contrato ERC-20 da l2 corresponde à fonte da l1 dos tokens

```solidity
        ) {
            // Quando um depósito é finalizado, nós creditamos a conta na l2 com a mesma quantia de
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Se as verificações de sanidade passarem, finalize o depósito:

1. Cunhe os tokens
2. Emita o evento apropriado

```solidity
        } else {
            // Ou o token da l2 no qual está sendo depositado discorda sobre o endereço correto
            // de seu token da l1, ou não suporta a interface correta.
            // Isso só deve acontecer se houver um token da l2 malicioso, ou se um usuário de alguma forma
            // especificou o endereço errado do token da l2 para depositar.
            // Em ambos os casos, nós paramos o processo aqui e construímos uma mensagem
            // de saque para que os usuários possam retirar seus fundos em alguns casos.
            // Não há como evitar contratos de token maliciosos totalmente, mas isso limita
            // o erro do usuário e mitiga algumas formas de comportamento malicioso de contrato.
```

Se um usuário cometeu um erro detectável usando o endereço de token da l2 errado, queremos cancelar o depósito e devolver os tokens na l1.
A única maneira de fazermos isso a partir da l2 é enviar uma mensagem que terá que esperar o período de desafio de falha, mas isso é muito melhor para o usuário do que perder os tokens permanentemente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // trocou o _to e _from aqui para devolver o depósito ao remetente
                _from,
                _amount,
                _data
            );

            // Envia mensagem para a ponte da l1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusão {#conclusion}

A ponte padrão é o mecanismo mais flexível para transferências de ativos.
No entanto, por ser tão genérica, nem sempre é o mecanismo mais fácil de usar.
Especialmente para saques, a maioria dos usuários prefere usar [pontes de terceiros](https://optimism.io/apps#bridge) que não esperam o período de desafio e não exigem uma prova de Merkle para finalizar o saque.

Essas pontes normalmente funcionam tendo ativos na l1, que elas fornecem imediatamente por uma pequena taxa (muitas vezes menor que o custo do gás para um saque de ponte padrão).
Quando a ponte (ou as pessoas que a administram) antecipa a falta de ativos na l1, ela transfere ativos suficientes da l2. Como esses são saques muito grandes, o custo do saque é amortizado sobre uma grande quantia e é uma porcentagem muito menor.

Esperamos que este artigo tenha ajudado você a entender mais sobre como a camada 2 (l2) funciona e como escrever código em Solidity que seja claro e seguro.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).