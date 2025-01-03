---
title: "Passo a passo do contrato de ponte padrão da Optimism"
description: Como funciona a ponte padrão para a Optimism? Porque funciona desta maneira?
author: Ori Pomerantz
tags:
  - "solidity"
  - "ponte"
  - "camada 2"
skill: intermediate
published: 2022-03-30
lang: pt-br
---

[Optimism](https://www.optimism.io/) é uma [ Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/). Optimistic rollups podem processar transações por um preço muito inferior ao Ethereum Mainnet (também conhecido como layer 1 ou L1) porque as transações são processadas apenas por alguns nós, em vez de cada nó na rede. Ao mesmo tempo, os dados são todos escritos em L1, de modo que tudo pode ser provado e reconstruído com todas as garantias de integridade e disponibilidade da rede principal.

Para usar ativos L1 na Optimism (ou qualquer outra L2), os ativos precisam ser [enviados pela ponte](/bridges/#prerequisites). Uma maneira de conseguir isso é os usuários bloquearem ativos (ETH e [tokens ERC-20](/developers/docs/standards/tokens/erc-20/) são os mais comuns) na L1, e receber ativos equivalentes para usar na L2. Por fim, quem for que acabe com eles, talvez queira enviá-los de volta para a L1. Ao fazer isso, os ativos são queimados na L2 e, em seguida, liberados para o usuário na L1.

É assim que a [ponte padrão Optimism](https://community.optimism.io/docs/developers/bridge/standard-bridge) funciona. Neste artigo, passamos pelo código-fonte para essa ponte para ver como ele funciona e estudá-lo como um exemplo de código Solidity bem escrito.

## Fluxo de controle {#control-flows}

A ponte tem dois fluxos principais:

- Depósito (de L1 a L2)
- Saque de (L2 para L1)

### Fluxo de depósitos {#deposit-flow}

#### Camada 1 {#deposit-flow-layer-1}

1. Se depositar um ERC-20, o depositante dá à ponte uma permissão para gastar o valor que está sendo depositado
2. O depositor chama a ponte L1(`depositERC20`, `depositERC20To`, `depositETH`, ou `depositETHTo`)
3. A ponte L1 toma posse do ativo que está na ponte
   - ETH: O ativo é transferido pelo depositante como parte da chamada
   - ERC-20: O ativo é transferido pela ponte para si mesmo usando a permissão fornecida pelo depositante
4. A ponte L1 usa o mecanismo de mensagem entre domínios para chamar `finalizeDeposit` na ponte L2

#### Camada 2 {#deposit-flow-layer-2}

5. A ponte L2 verifica que a chamada do `finalizeDeposit` é legítima:
   - Se veio do contrato de mensagem entre domínios
   - Era originalmente da ponte em L1
6. A ponte L2 checa se o contrato do token ERC-20 na L2 é o correto:
   - O contrato L2 reporta que sua contraparte L1 é a mesma de onde vieram os tokens da L1
   - O contrato L2 reporta que suporta a interface correta ([usando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Se o contrato L2 é o correto, chame-o para cunhar o número apropriado de tokens para o endereço apropriado. Se não, comece o processo de retirada para permitir o usuário reclamar os tokens no L1.

### Fluxo de retirada {#withdrawal-flow}

#### Camada 2 {#withdrawl-flow-layer-2}

1. O sacador chama a ponte L2 (`withdraw` ou `withdrawTo`)
2. A ponte L2 queima o número apropriado de tokens pertencentes a `msg.sender`
3. A ponte L2 usa o mecanismo de mensagens entre domínios para chamar `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` na ponte L1

#### Camada 1 {#withdrawl-flow-layer-1}

4. A ponte L1 verifica a chamada a `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` é legitima:
   - Veio de um mecanismo de mensagens entre domínios
   - Foi originada da ponte no L2
5. A ponte L1 transfere o ativo apropriado (ETH ou ERC-20) para o endereço apropriado

## Código Camada 1 {#layer-1-code}

Este é o código que roda na L1, a Rede Principal do Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Esta interface é definida aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol). Ela inclui funções e definições exigidas para realizar a ponte de tokens ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[Maioria do código da Optimism é lançada sob a licença MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Neste momento, a última versão do Solidity é 0.8.12. Até versão 0.9.0 ser lançada, nós não sabemos se este código é compatível com ele ou não.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Na terminologia de ponte Optimism _deposit_ significa transferência de L2 para L2, e _withdrawal_ significa uma transferência de L2 para L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Na maioria dos casos o endereço de um ERC-20 na L1 não é o mesmo endereço do equivalente ERC-20 na L2. [Você pode ver a lista de endereços de tokens aqui](https://static.optimism.io/optimism.tokenlist.json). O endereço com `chainId` 1 está na L1 (Mainnet) e o endereço com `chainId` 10 está na L2 (Optimism). Os outros dois valores `chainId` são para a rede de testes Kovan (42) e a rede de testes Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

É possível adicionar notas para transferências, caso no qual elas são adicionadas para os eventos que as reportam.

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

O mesmo contrato de ponte manipula transferências em ambas as direções. No caso da ponte L1, isto significa inicialização de depósitos e finalização de retiradas.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

Esta função não é realmente necessária, porque na L2 ela é um contrato pré-implantado, então ela está sempre no endereço `0x4200000000000000000000000000000000000010`. Ela está aqui por simetria com a ponte L2, porque o endereço da ponte L1 _não_ é trivial de saber.

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

O parâmetro `_l2Gas` é a quantidade de gas L2 que a transação tem permissão de gastar. [Até um certo (alto) limite, isto é grátis](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), portanto a menos que o contrato ERC-20 faça algo realmente estranho quando cunhando, isto não deveria ser um problema. Esta função cuida do cenário comum, onde um usuário faz a ponte dos ativos para o mesmo endereço em uma blockchain diferente.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

Esta função é quase idêntica a `depositERC20`, mas ela deixa você enviar o ERC-20 para diferentes endereços.

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

Saques (e outras mensagens de L2 para L1) na Optimism é um processo em duas etapas:

1. Uma transação inicial no L2.
2. Uma transação de finalização ou de reclamação na L1. Esta transação precisa acontecer depois do [período de desafio de falha](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) para a transação L2 terminar.

### IL1StandardBridge {#il1standardbridge}

[Esta interface é definida aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol). Este arquivo contém definições de evento e função para ETH. Estas definições são muito similares com aquelas definidas em `IL1ERC20Bridge` acima para ERC-20.

A ponte interface é dividida entre dois arquivos, porque alguns tokens ERC-20 requerem processamento customizado e não podem ser manipulados pela ponte padrão. Dessa maneira a ponte customizada que manipula este token pode implementar `IL1ERC20Bridge` e não ter que também fazer a ponte ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Este evento é praticamente idêntico à versão ERC-20 (`ERC20DepositInitiated`), exceto por não ter os endereços de token L1 e L2. O mesmo é verdade para outros eventos e funções.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[Este contrato](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) é herdado por ambas pontes ([L1](#the-l1-bridge-contract) e [L2](#the-l2-bridge-contract)) para enviar mensagens para a outra camada.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) mostra ao contrato como enviar mensagens para a outra camada, usando o mensageiro entre domínios. Este mensageiro entre domínios é todo um outro sistema, e merece um artigo próprio, que espero escrever no futuro.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

O único parâmetro que o contrato precisa saber é o endereço do mensageiro entre domínios nessa camada. Este parâmetro é configurado uma vez, no construtor, e nunca muda.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

O mensageiro entre domínios é acessível por qualquer contrato na blockchain onde estiver rodando (seja Ethereum mainnet ou Optimism). Mas nós precisamos da ponte em cada lado para _apenas_ confiar em certas mensagens se eles vierem da ponte do outro lado.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Somente mensagens do mensageiro entre domínios apropriado (`messenger`, como você vê abaixo) pode ser confiado.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

A maneira que o mensageiro entre domínios fornece o endereço que enviou uma mensagem com a outra camada é [a função `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128). Enquanto ele for chamado na transação que foi iniciada pela mensagem, ele pode fornecer esta informação.

Nós precisamos nos certificar que a mensagem que nós recebemos veio da outra ponte.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Esta função retorna o mensageiro entre domínios. Nós usamos uma função ao invés da variável `messenger` para permitir contratos que herdam deste para usar um algoritmo para especificar qual mensageiro entre domínios usar.

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Finalmente, a função que envia a mensagem para a outra camada.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither)é um analisador estático que a Optimism roda em cada contrato para procurar por vulnerabilidades e outros problemas em potencial. Nesse caso, as seguintes linhas disparam duas vulnerabilidades:

1. [Eventos de reentrância](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrância Benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Neste caso nós não estamos preocupados sobre reentrância. Nós sabemos que `getCrossDomainMessenger()` returna um endereço confiável, mesmo se Slither não tem como saber isso.

### O contrato da ponte L1 {#the-l1-bridge-contract}

[O código-fonte para este contrato está aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

A interface pode ser parte de outros contratos, então eles têm de suportar uma larga faixa de versões de Solidity. Mas a ponte por ela mesma é o nosso contrato, e nós podemos ser estritos sobre qual versão Solidity ela usa.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) e [IL1StandardBridge](#IL1StandardBridge) são explicados acima.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nos deixa criar mensagens para controlar a ponte padrão em L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Esta interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nos deixa controlar contratos ERC-20. [Você pode ler mais sobre ela aqui](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Como explicado acima](#crossdomainenabled), este contrato é usado para mensageria entre camadas.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) tem os endereços dos contratos L2 que sempre tem o mesmo endereço. Isto inclui a ponte padrão em L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitários de endereços OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Ele é usado para distinguir entre endereços de contrato e aqueles pertencentes a contas de propriedade externa (EOA).

Note que isto não é a solução perfeita, porque não há como distinguir entre chamadas diretas e chamadas feitas de um construtor de contrato, mas pelo menos isto nos deixa identificar e evitar alguns erros comuns de usuário.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[O padrão ERC-20 ](https://eips.ethereum.org/EIPS/eip-20) suporta duas maneiras para um contrato reportar falha:

1. Revert
2. Return `false`

Gerenciar ambos casos faria nosso código mais complicado, então ao invés disso, usamos [OpenZeppelin `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), que garante [ que todas as falhas resultem num revert](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Esta linha é como especificamos para usar o wrapper `SafeERC20` cada vez que nós usamos a interface `IERC20`.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

O endereço de [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

Um [mapeamento](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) em dobro como este é a maneira de você definir uma [array esparsa bi-dimensional](https://en.wikipedia.org/wiki/Sparse_matrix). Valores nesta estrutura de dados são identificados como `deposit[L1 token addr][L2 token addr]`. O valor padrão é zero. Somente células que são configuradas para um valor diferente são escritas no storage.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

Para querer ser capaz de atualizar este contrato sem ter que copiar todas as variáveis no storage. Para fazer isso, nós usamos um [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), um contrato que usa [`delegatecall`](https://solidity-by-example.org/delegatecall/) para transferir chamadas para um contato separado cujo endereço é armazenado pelo contrato proxy (quando você atualiza, você diz ao proxy para mudar o endereço). Quando você usa `delegatecall` o storage permanece com o valor do contrato _chamador_, então os valores de todas as variáveis de estado do contrato não são afetadas.

Um efeito deste padrão é que o storage do contrato que é _chamado_ pelo `delegatecall` não é usado, e portanto os valores do construtor passados para ele não importam. Esta é a razão pela qual nós podemos fornecer um valor sem sentido para o construtor `CrossDomainEnabled`. É também a razão que a inicialização abaixo é separada do construtor.

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

Este [teste Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica funções que não são chamadas do código do contrato e poderiam portanto serem declaradas `external` ao invés de `public`. As funções de custo de gas `external` podem ser menores, porque elas podem ser fornecidas com parâmetros no calldata. Funções declaradas `public` têm de ser acessíveis de dentro do contrato. Contratos não podem modificar seus próprios calldata, então os parâmetros têm que estar na memória. Quando esta função é chamada externamente, é necessário copiar o calldata para a memória, que custa gas. Nesse caso a função é chamada somente uma vez, então a ineficiência não importa para nós.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

A função `initialize` deve ser chamada só uma vez. Se o endereço do mensageiro entre domínios L1 ou se a ponte do token L2 mudam, nós criamos um novo proxy e uma nova ponte que chama ele. Isto é improvável de acontecer, exceto quando o sistema inteiro é atualizado, uma ocorrência muito rara.

Note que esta função não tem nenhum mecanismo que restringe _quem_ pode chamá-la. Isto significa que em teoria um atacante poderia esperar até que nós implantassemos o proxy e a primeira versão da ponte e então [front-run](https://solidity-by-example.org/hacks/front-running/)para pegar a função `initialize` antes que o usuário legítimo o faça. Mas há dois métodos para evitar isso:

1. Se o contrato for implantado não diretamente por um EOA mas [em uma transação que tem outro contrato criando eles,](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) o processo inteiro pode ser atômico, e finalizar antes que qualquer outra transação seja executada.
2. Se a chamada legítima para `initialize` falhar, é sempre possível ignorar o proxy recém-criado e fazer a ponte para criar outros novos.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Estes são dois parâmetros que a ponte precisa conhecer.

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

É por essa razão que precisamos de utilitários de `Address` do OpenZeppelin.

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

A função existe para finalidade de testes. Note que ela não aparece nas definições de interface - não é para uso corrente.

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

Estas duas funções são wrappers em volta do `_initiateETHDeposit`, a função que manipula o depósito do ETH real.

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

A maneira que mensagens entre domínios trabalham é que o contrato de destino é chamado com a mensagem como o seu calldata. Contratos Solidity sempre interpretam seu calldata de acordo com [a especificação ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html). A função Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) cria este calldata.

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

A mensagem aqui é chamar [a função `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) com estes parâmetros:

| Parâmetro   | Valores                          | Significado                                                                                                                                    |
| ----------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                       | Valor especial para o ETH (que não é um token ERC-20) na L1                                                                                    |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | O contrato L2 que gerencia ETH na Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (este contrato é apenas para uso interno da Optimism) |
| \_from    | \_from                         | Os endereços na L1 que enviam o ETH                                                                                                            |
| \_to      | \_to                           | O endereço na L2 que recebe o ETH                                                                                                              |
| amount      | msg.value                        | Quantidade de wei enviado (que já foi enviado para a ponte)                                                                                    |
| \_data    | \_data                         | Dados adicionais para anexar ao depósito                                                                                                       |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Enviar a mensagem através de mensageiro entre domínios.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emitir um evento para informar qualquer aplicação descentralizada que escuta esta transferência.

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
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

Esta função é similiar a `_initiateETHDeposit` acima, com algumas poucas diferenças importantes. A primeira diferença é que esta função recebe o endereço de token e a quantia a transferir como parâmetros. No caso do ETH, a chamada para a ponte já inclui a transferência do ativo para a conta da ponte (`msg.value`).

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Transferências de tokens ERC-20 seguem um processo diferente do ETH:

1. O usuário (`_from`) dá uma permissão para a ponte para transferir os tokens apropriados.
2. O usuário chama a ponte com o endereço do contrato do token, a quantia, etc.
3. A ponte transfere os tokens (para ela mesmo) como parte do processo de depósito.

O primeiro passo pode acontecer em uma transação separada das últimas duas. Entretanto, front-running não é um problema porque as duas funções que chamam `_initiateERC20Deposit` (`depositERC20` e `depositERC20To`) somente chamam essa função com `msg.sender` como parâmetro `_from`.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Adicione a quantia depositada de tokens para a estrutura de dados `deposits`. Pode haver múltiplos endereços em L2 que correspondam ao mesmo token ERC-20 L1, portanto não é suficiente usar saldo de ponte de token ERC-20 L1 para rastrear os depósitos.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

A ponte L2 envia uma mensagem para o mensageiro entre domínios L2 que causa o mensageiro entre domínios L1 chamar esta função (uma vez que a [transação que finaliza a mensagem](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) é submetida no L1, claro).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Certifique-se que isto é uma mensagem _legítima_, vinda do mensageiro entre domínios e originada com o token da ponte L2. Esta função é usada para retirar ETH da ponte, então nós temos que nos certificar que é somente chamada pelo chamador autorizado.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

A maneira de transferir ETH é chamar o recebedor com a quantia de wei no `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emitir um evento sobre o saque.

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

Esta função é similar a `finalizeETHWithdrawal` acima, com as mudanças necessárias para os tokens ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Atualiza a estrutura de dados`deposits`.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

Houve uma implementação anterior dessa ponte. Quando nos movemos da implementação para esta ponte, tivemos que mover todos os ativos. Tokens ERC-20 podem serem simplesmente movidos. Entretanto, para transferir ETH para um contrato, você precisa da aprovação do contrato, que é o que `donateETH` nos fornece.

## Tokens ERC-20 na L2 {#erc-20-tokens-on-l2}

Para um token ERC-20 servir na ponte padrão, ele precisa permitir que a ponte padrão, e _somente_ a ponte padrão, cunhe token. Isto é necessário porque as pontes precisam garantir que o número de tokens circulando na Optimism é igual ao número de tokens travados dentro do contrato da ponte L1. Se houver tokens demais na L2, alguns usuários ficarão incapazes de usar a ponte de volta para os seus ativos para a L1. Ao invés de uma ponte confiável, nós iriamos essencialmente recriar [reserva fracionária bancária](https://www.investopedia.com/terms/f/fractionalreservebanking.asp). Se houver tokens demais em L1, alguns desses tokens estaria travados dentro do contrato da ponte para sempre, porque não há maneira de liberá-los sem queimar tokens L2.

### IL2StandardERC20 {#il2standarderc20}

Cada token ERC-20 na L2 que usa a ponte padrão precisa fornecer [esta interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), que tem as funções e eventos que a ponte padrão necessita.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[A interface padrão ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) não inclui as funções `mint` e `burn`. Estes métodos não são necessários pelo [padrão ERC-20](https://eips.ethereum.org/EIPS/eip-20), que não deixa especificado os mecanismos para criar e destruir tokens.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[A interface ERC-165 ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)é usada para especificar que funções um contrato fornece. [Você pode ler o padrão aqui](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Esta função fornece o endereço do token L1 que usa a ponte para este contrato. Note que nós não temos uma função similar na direção oposta. Nós precisamos ser capazes de usar a ponte para qualquer token L1, independente se o suporte L2 foi planejado quando foi implementado ou não.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funções e eventos para cunhar (criar) e queimar (destruir) tokens. A ponte deveria ser a única entidade que pode rodar estas funções para garantir que o número de tokens esteja correto (igual ao número de tokens travados na L1).

### L2StandardERC20 {#L2StandardERC20}

[Essa é a nossa implementação da interface `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol). A não ser que você precise de algum tipo de lógica customizada, você deveria usar esta.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[O contrato ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). A Optimism não acredita em reinventar a roda, especialmente quando a roda é bem auditada e precisa ser estimada o suficiente para manter ativos.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Há dois parâmetros de configuração adicionais que nós precisamos, e um ERC-20 normalmente não precisa.

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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

Primeiro chame o construtor do contrato que nós herdamos (`ERC20(_name, _symbol)`) e então configure suas próprias variáveis.

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

Essa é a maneira que o[ERC-165](https://eips.ethereum.org/EIPS/eip-165) funciona. Cada interface é um número de funções suportadas, como identificadas no [ou exclusivo](https://en.wikipedia.org/wiki/Exclusive_or) dos [seletores de funções ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) destas funções.

A ponte L2 usa ERC-165 como checagem de sanidade para garantir que o contrato ERC-20 para o qual ela envia ativos é um `IL2StandardERC20`.

**Note:** Não há nada para evitar contratos trapaceiros de fornecer falsas respostas para `supportsInterface`, portanto isto é um mecanismo de checagem de sanidade, _não_ um mecanismo de segurança.

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

Somente a ponte L2 pode cunhar e queimar ativos.

`_mint` e `_burn` são na verdade definidos no [contrato ERC-20 OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn). Este contrato só não os expõem externamente, porque as condições para cunhar e queimar tokens são tão variadas como o número de maneiras de usar ERC-20.

## Código da ponte L2 {#l2-bridge-code}

Este é o código que roda na ponte na Optimism. [A fonte deste contrato é aqui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

A interface [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) é muito similar ao [equivalente L1](#IL1ERC20Bridge) que nós vimos acima. Há duas diferenças significantes:

1. Na L1 você inicia depósitos e finaliza retiradas. Aqui você inicia retiradas e finaliza depósitos.
2. Na L1 é necessário distinguir entre ETH e tokens ERC-20. Na L2 nós podemos usar as mesmas funções para ambos os casos porque internamente saldos ETH na Optimism são manipulados por um token ERC-20 com o endereço [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

Acompanhe o endereço da ponte L1. Observe que, em contraste com o equivalente L1, aqui _precisamos_ desta variável. O endereço da ponte L1 não é conhecido antecipadamente.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

Estas duas funções iniciam retiradas. Observe que não há necessidade de especificar o endereço do token L1. Espera-se que os tokens L2 nos digam o endereço do equivalente L1.

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Observe que _não_ estamos contando com o parâmetro `_from`, mas com o `msg.sender` que é muito mais difícil de falsificar (impossível, até onde eu sei).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na L1 é necessário distinguir entre ETH e ERC-20.

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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

Certifique-se que a origem da mensagem é legítima. Isso é importante porque a função chama `_mint` e poderia ser usada para dar tokens que não foram cobertos pelos tokens que a ponte tem na L1.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Verificações de sanidade:

1. A interface correta é suportada
2. O endereço L1 do contrato ERC-20 L2 bate com a fonte L1 dos tokens

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Se a checagem de sanidade passar, finalize o depósito:

1. Cunhe os tokens
2. Emita o evento apropriado

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

Se um usuário fez um erro detectável usando o endereço de token L2 errado, nós queremos cancelar o depósito e retornar os tokens na L1. A única maneira que nós podemos fazer isso de L2 é enviar uma mensagem que irá ter que esperar pelo período de desafio de falha, mas isto é muito melhor para o usuário que perder seus tokens permanentemente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusão {#conclusion}

A ponte padrão é o mecanismo mais flexível para transferência de ativos. Porém, por ser genérico não é sempre o mecanismo mais fácil de usar. Especialmente para retiradas, a maioria dos usuários prefere usar [pontes de terceiros](https://www.optimism.io/apps/bridges) a esperar o período de desafio e também não precisar de uma prova de Merkle para finalizar a retirada.

Estas pontes tipicamente funcionam tendo ativos na L1, que elas fornecem imediatamente por uma taxa pequena (geralmente menor que o custo de gas para uma retirada de uma ponte padrão). Quando a ponte (ou as pessoas que a administram) antecipa a falta de ativos L1, ela transfere ativos suficientes da L2. Como estes são saques muito grandes, o custo do saque é amortizado por uma larga quantia e é um percentual muito menor.

Esperamos que este artigo tenha ajudado você a entender mais sobre como a camada 2 funciona, e como escrever um código Solidity claro e seguro.
