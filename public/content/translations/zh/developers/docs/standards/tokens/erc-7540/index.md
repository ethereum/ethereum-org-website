---
title: ERC-7540 异步代币化金库标准
description: ERC-4626 的扩展，为代币化金库添加了异步存款和赎回流程。
lang: zh
---

## 简介 {#introduction}

ERC-7540 扩展了 [ERC-4626 代币化金库标准](/developers/docs/standards/tokens/erc-4626/)，添加了对异步存款和赎回流程的支持。它引入了“先请求后申领”的模式：用户首先提交请求（锁定其资产或份额），然后在金库处理完毕后申领结果。

当金库无法在单笔交易中立即结算时，就需要这种机制，例如：

- 真实世界资产 (RWA) 协议，如代币化国债、私募信贷以及其他具有 T+1 或 T+2 结算周期的资产
- 信用评估在链下发生的抵押不足借贷
- 跨链金库策略，其中桥接会引入延迟
- 具有解绑期的流动性质押代币 (LST)

金库可以选择仅在存款时异步、仅在赎回时异步，或两者皆异步。这种灵活性使金库开发者能够仅在底层策略需要时添加异步流程，同时保持另一侧同步。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议您先阅读有关[代币标准](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/)和[ERC-4626](/developers/docs/standards/tokens/erc-4626/)的内容。

## ERC-4626 与 ERC-7540 的对比 {#comparison}

在 ERC-4626 中，存款是原子化结算的：投资者发送资产并在单笔交易中收回份额。

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 将此分为两步。投资者首先调用 `requestDeposit()` 锁定资产，然后等待金库管理器处理请求。一旦完成，投资者调用 `deposit()` 申领其份额。汇率在完成时确定，而不是在请求时确定。

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

赎回流程的工作方式相同：`requestRedeem()` 锁定份额，一旦完成，投资者调用 `redeem()` 申领资产。

## ERC-7540 函数与特性 {#body}

ERC-7540 继承了完整的 ERC-4626 接口，但将 `deposit`/`mint`/`withdraw`/`redeem` 重新用作申领函数。新的 `requestDeposit` 和 `requestRedeem` 函数处理初始请求步骤。

每个请求都会经历三种状态：待处理（已提交，等待处理）、可申领（已完成并定价）和已申领（投资者已收集其份额或资产）。

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### 存款请求流程 {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

将 `assets` 从 `owner` 转账到金库并提交存款请求。`controller` 地址获得对该请求的控制权。返回一个标识请求批次的 `requestId`。

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

返回给定 `controller` 和 `requestId` 的待处理（尚未可申领）存款请求中的 `assets` 数量。

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

返回给定 `controller` 和 `requestId` 的可申领（已完成但尚未申领）存款请求中的 `assets` 数量。

#### 申领存款 {#claiming-deposits}

一旦存款请求变为可申领状态，用户即可调用标准的 ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) 或 [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) 函数来申领其份额。在 ERC-7540 中，这些函数不再转账资产（这在请求时已经发生）。它们仅向接收者铸造份额。

### 赎回请求流程 {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

锁定来自 `owner` 的 `shares` 并提交赎回请求。`controller` 地址获得对该请求的控制权。

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

返回给定 `controller` 和 `requestId` 的待处理赎回请求中的 `shares` 数量。

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

返回给定 `controller` 和 `requestId` 的可申领赎回请求中的 `shares` 数量。

#### 申领赎回 {#claiming-redemptions}

一旦赎回请求变为可申领状态，用户即可调用标准的 ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) 或 [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) 函数来申领其资产。

### 操作员管理 {#operator-management}

ERC-7540 包含一个操作员模式（源自 [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)），允许第三方代表用户管理请求。

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

批准或撤销 `operator` 代表 `msg.sender` 执行存款/赎回请求和申领。

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

返回 `operator` 是否被批准代表 `controller` 行事。

### 请求 ID {#request-ids}

请求 ID 用于区分不同批次的请求。共享相同 `requestId` 的所有请求都是同质化的：它们一起在状态之间转换，并获得相同的汇率。

当金库对所有请求返回 `requestId = 0` 时，只有 `controller` 地址区分请求状态。来自同一控制者的多个请求会被聚合。

### 事件 {#events}

#### DepositRequest 事件 {#depositrequest-event}

当通过 [`requestDeposit`](#requestdeposit) 提交存款请求时，必须触发此事件。

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest 事件 {#redeemrequest-event}

当通过 [`requestRedeem`](#requestredeem) 提交赎回请求时，必须触发此事件。

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet 事件 {#operatorset-event}

当通过 [`setOperator`](#setoperator) 批准或撤销操作员时，必须触发此事件。

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### 预览函数 {#preview-functions}

预览函数必须仅在异步流程中回退，因为在请求完成之前汇率是未知的。在异步存款金库中，`previewDeposit` 和 `previewMint` 必须回退，而 `previewRedeem` 和 `previewWithdraw` 保持与 ERC-4626 中相同的工作方式（对于异步赎回金库则反之亦然）。这是与 ERC-4626 的一个关键行为差异。

## 延伸阅读 {#further-reading}

- [EIP-7540：异步 ERC-4626 代币化金库](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626：代币化金库标准](https://eips.ethereum.org/EIPS/eip-4626)
- [欧本齐柏林 ERC-7540 实现](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)