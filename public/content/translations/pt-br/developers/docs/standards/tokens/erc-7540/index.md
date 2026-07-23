---
title: Padrão de Cofre Tokenizado Assíncrono ERC-7540
description: Uma extensão do ERC-4626 que adiciona fluxos assíncronos de depósito e resgate para cofres tokenizados.
lang: pt-br
---

## Introdução {#introduction}

O ERC-7540 estende o [Padrão de Cofre Tokenizado ERC-4626](/developers/docs/standards/tokens/erc-4626/) adicionando suporte para fluxos assíncronos de depósito e resgate. Ele introduz um padrão de solicitar-e-reivindicar (request-then-claim): os usuários primeiro enviam uma solicitação (bloqueando seus ativos ou cotas) e, em seguida, reivindicam o resultado após o cofre tê-lo processado.

Isso é necessário quando um cofre não pode realizar a liquidação instantaneamente em uma única transação, por exemplo:

- Protocolos de ativos do mundo real (RWA), como tesourarias tokenizadas, crédito privado e outros ativos com ciclos de liquidação T+1 ou T+2
- Empréstimo subcolateralizado onde as avaliações de crédito ocorrem offchain
- Estratégias de cofre cross-chain onde as pontes (bridges) introduzem atrasos
- Tokens de staking líquido (LST) com períodos de desvinculação (unbonding)

Os cofres podem escolher ser assíncronos apenas em depósitos, apenas em resgates ou em ambos. Essa flexibilidade permite que os desenvolvedores de cofres adicionem fluxos assíncronos apenas onde a estratégia subjacente exigir, mantendo o outro lado síncrono.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [padrões de token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 vs ERC-7540 {#comparison}

No ERC-4626, um depósito é liquidado atomicamente: o investidor envia ativos e recebe cotas de volta em uma única transação.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

O ERC-7540 divide isso em duas etapas. O investidor primeiro chama `requestDeposit()` para bloquear ativos e, em seguida, aguarda o gerente do cofre processar a solicitação. Uma vez atendida, o investidor chama `deposit()` para reivindicar suas cotas. As taxas de câmbio são determinadas no momento do atendimento, não no momento da solicitação.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

O fluxo de resgate funciona da mesma maneira: `requestRedeem()` bloqueia as cotas e, uma vez atendido, o investidor chama `redeem()` para reivindicar os ativos.

## Funções e Recursos do ERC-7540 {#body}

O ERC-7540 herda a interface completa do ERC-4626, mas reaproveita `deposit`/`mint`/`withdraw`/`redeem` como funções de reivindicação. As novas funções `requestDeposit` e `requestRedeem` lidam com a etapa inicial de solicitação.

Cada solicitação passa por três estados: pendente (enviada, aguardando processamento), reivindicável (atendida e precificada) e reivindicada (o investidor coletou suas cotas ou ativos).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Fluxo de solicitação de depósito {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Transfere `assets` de `owner` para o cofre e envia uma solicitação de depósito. O endereço `controller` recebe o controle da solicitação. Retorna um `requestId` identificando o lote da solicitação.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Retorna a quantidade de `assets` em uma solicitação de depósito pendente (ainda não reivindicável) para o `controller` e `requestId` fornecidos.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Retorna a quantidade de `assets` em uma solicitação de depósito reivindicável (atendida, mas ainda não reivindicada) para o `controller` e `requestId` fornecidos.

#### Reivindicando depósitos {#claiming-deposits}

Uma vez que uma solicitação de depósito se torna reivindicável, o usuário chama a função padrão do ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) ou [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) para reivindicar suas cotas. No ERC-7540, essas funções não transferem mais ativos (isso já aconteceu no momento da solicitação). Elas apenas cunham cotas para o recebedor.

### Fluxo de solicitação de resgate {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Bloqueia `shares` de `owner` e envia uma solicitação de resgate. O endereço `controller` recebe o controle da solicitação.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Retorna a quantidade de `shares` em uma solicitação de resgate pendente para o `controller` e `requestId` fornecidos.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Retorna a quantidade de `shares` em uma solicitação de resgate reivindicável para o `controller` e `requestId` fornecidos.

#### Reivindicando resgates {#claiming-redemptions}

Uma vez que uma solicitação de resgate se torna reivindicável, o usuário chama a função padrão do ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) ou [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) para reivindicar seus ativos.

### Gerenciamento de operador {#operator-management}

O ERC-7540 inclui um padrão de operador (do [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) que permite que terceiros gerenciem solicitações em nome de um usuário.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Aprova ou revoga `operator` para agir em nome de `msg.sender` para solicitações de depósito/resgate e reivindicações.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Retorna se `operator` está aprovado para agir em nome de `controller`.

### IDs de Solicitação {#request-ids}

Os IDs de solicitação diferenciam entre diferentes lotes de solicitações. Todas as solicitações que compartilham o mesmo `requestId` são fungíveis: elas transitam entre estados juntas e recebem a mesma taxa de câmbio.

Quando um cofre retorna `requestId = 0` para todas as solicitações, apenas o endereço `controller` diferencia o estado da solicitação. Múltiplas solicitações do mesmo controlador são agregadas.

### Eventos {#events}

#### Evento DepositRequest {#depositrequest-event}

DEVE ser emitido quando uma solicitação de depósito é enviada via [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Evento RedeemRequest {#redeemrequest-event}

DEVE ser emitido quando uma solicitação de resgate é enviada via [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Evento OperatorSet {#operatorset-event}

DEVE ser emitido quando um operador é aprovado ou revogado via [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Funções de visualização (Preview) {#preview-functions}

As funções de visualização (preview) devem reverter apenas para os fluxos que são assíncronos, porque a taxa de câmbio não é conhecida até que a solicitação seja atendida. Em um cofre de depósito assíncrono, `previewDeposit` e `previewMint` DEVEM reverter, enquanto `previewRedeem` e `previewWithdraw` continuam funcionando como no ERC-4626 (e vice-versa para um cofre de resgate assíncrono). Esta é uma diferença comportamental fundamental em relação ao ERC-4626.

## Leitura adicional {#further-reading}

- [EIP-7540: Cofres Tokenizados ERC-4626 Assíncronos](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Padrão de Cofre Tokenizado](https://eips.ethereum.org/EIPS/eip-4626)
- [Implementação do ERC-7540 pela OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)