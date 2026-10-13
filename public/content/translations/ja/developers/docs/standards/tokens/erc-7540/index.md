---
title: ERC-7540 非同期トークン化ヴォールト標準
description: トークン化ヴォールトに非同期の預入れおよび償還フローを追加するERC-4626の拡張機能です。
lang: ja
---

## はじめに {#introduction}

ERC-7540は、非同期の預入れ (deposit) および償還 (redemption) フローのサポートを追加することで、[ERC-4626 トークン化ヴォールト標準](/developers/docs/standards/tokens/erc-4626/)を拡張します。この標準では、リクエスト後に請求 (claim) するパターンが導入されています。ユーザーはまずリクエストを送信して資産やシェアをロックし、ヴォールトがそれを処理した後に結果を請求します。

これは、ヴォールトが1つのトランザクションで即座にセトルメントできない場合に必要となります。例えば以下の通りです。

- トークン化された米国債、プライベートクレジット、その他T+1やT+2のセトルメントサイクルを持つ資産などのリアル・ワールド・アセット (RWA) プロトコル
- 信用評価がオフチェーンで行われる無担保レンディング
- ブリッジングによって遅延が生じるクロスチェーンのヴォールトストラテジー
- アンボンディング期間があるリキッド・ステーキング・トークン (LST)

ヴォールトは、預入れのみ、償還のみ、またはその両方で非同期にすることを選択できます。この柔軟性により、ヴォールト開発者は、基盤となるストラテジーが要求する部分にのみ非同期フローを追加し、もう一方を同期的なままに保つことができます。

## 前提知識 {#prerequisites}

このページをより深く理解するために、まずは[トークン標準](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/)、および[ERC-4626](/developers/docs/standards/tokens/erc-4626/)について読むことをお勧めします。

## ERC-4626とERC-7540の比較 {#comparison}

ERC-4626では、預入れはアトミックにセトルメントされます。つまり、投資家は1つのトランザクションで資産を送金し、シェアを受け取ります。

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540はこれを2つのステップに分割します。投資家はまず`requestDeposit()`を呼び出して資産をロックし、ヴォールト管理者がリクエストを処理するのを待ちます。処理が完了すると、投資家は`deposit()`を呼び出してシェアを請求します。交換レートはリクエスト時ではなく、処理完了時に決定されます。

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

償還フローも同様に機能します。`requestRedeem()`でシェアをロックし、処理が完了すると投資家は`redeem()`を呼び出して資産を請求します。

## ERC-7540の関数と機能 {#body}

ERC-7540はERC-4626のインターフェースを完全に継承していますが、`deposit` / `mint` / `withdraw` / `redeem`を請求関数として再利用します。新しい`requestDeposit`および`requestRedeem`関数は、最初のリクエストステップを処理します。

各リクエストは3つの状態を遷移します。保留中 (pending: 送信済みで処理待ち)、請求可能 (claimable: 処理完了および価格決定済み)、および請求済み (claimed: 投資家がシェアまたは資産を回収済み) です。

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### 預入れリクエストフロー {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner`からヴォールトへ`assets`を送金し、預入れリクエストを送信します。`controller`アドレスがリクエストの制御権を受け取ります。リクエストバッチを識別する`requestId`を返します。

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

指定された`controller`および`requestId`に対する、保留中 (まだ請求可能ではない) の預入れリクエストにおける`assets`の量を返します。

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

指定された`controller`および`requestId`に対する、請求可能 (処理完了済みだがまだ請求されていない) な預入れリクエストにおける`assets`の量を返します。

#### 預入れの請求 {#claiming-deposits}

預入れリクエストが請求可能になると、ユーザーは標準のERC-4626の[`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit)または[`mint`](/developers/docs/standards/tokens/erc-4626/#mint)関数を呼び出してシェアを請求します。ERC-7540では、これらの関数はもはや資産を送金しません (それはリクエスト時にすでに完了しています)。受信者に対してシェアをミントするだけです。

### 償還リクエストフロー {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner`から`shares`をロックし、償還リクエストを送信します。`controller`アドレスがリクエストの制御権を受け取ります。

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

指定された`controller`および`requestId`に対する、保留中の償還リクエストにおける`shares`の量を返します。

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

指定された`controller`および`requestId`に対する、請求可能な償還リクエストにおける`shares`の量を返します。

#### 償還の請求 {#claiming-redemptions}

償還リクエストが請求可能になると、ユーザーは標準のERC-4626の[`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem)または[`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw)関数を呼び出して資産を請求します。

### オペレーター管理 {#operator-management}

ERC-7540には、サードパーティがユーザーに代わってリクエストを管理できるようにするオペレーターパターン ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)由来) が含まれています。

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

預入れ/償還リクエストおよび請求に関して、`msg.sender`の代理として行動する`operator`を承認または取り消します。

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`operator`が`controller`の代理として行動することを承認されているかどうかを返します。

### リクエストID {#request-ids}

リクエストIDは、異なるリクエストバッチを区別します。同じ`requestId`を共有するすべてのリクエストは代替可能 (fungible) であり、一緒に状態を遷移し、同じ交換レートを受け取ります。

ヴォールトがすべてのリクエストに対して`requestId = 0`を返す場合、`controller`アドレスのみがリクエストの状態を区別します。同じコントローラーからの複数のリクエストは集約されます。

### イベント {#events}

#### DepositRequestイベント {#depositrequest-event}

預入れリクエストが[`requestDeposit`](#requestdeposit)経由で送信されたときに発行されなければなりません (MUST)。

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequestイベント {#redeemrequest-event}

償還リクエストが[`requestRedeem`](#requestredeem)経由で送信されたときに発行されなければなりません (MUST)。

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSetイベント {#operatorset-event}

オペレーターが[`setOperator`](#setoperator)経由で承認または取り消されたときに発行されなければなりません (MUST)。

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### プレビュー関数 {#preview-functions}

プレビュー関数は、非同期のフローに対してのみリバートしなければなりません。なぜなら、リクエストが処理されるまで交換レートが不明だからです。非同期預入れヴォールトでは、`previewDeposit`および`previewMint`はリバートしなければならず (MUST)、一方で`previewRedeem`および`previewWithdraw`はERC-4626と同様に機能し続けます (非同期償還ヴォールトの場合はその逆になります)。これはERC-4626との重要な動作上の違いです。

## 参考文献 {#further-reading}

- [EIP-7540: 非同期ERC-4626トークン化ヴォールト](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: トークン化ヴォールト標準](https://eips.ethereum.org/EIPS/eip-4626)
- [オープンツェッペリンのERC-7540実装](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)