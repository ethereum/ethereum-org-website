---
title: "Optimism 標準跨鏈橋合約演練"
description: "Optimism 的標準跨鏈橋是如何運作的？為什麼它會這樣運作？"
author: "奧里·波梅蘭茨"
tags: ["Solidity", "跨鏈橋", "第二層 (L2)"]
skill: intermediate
breadcrumb: "Optimism 跨鏈橋"
published: 2022-03-30
lang: zh-tw
---

[Optimism](https://www.optimism.io/) 是一個[樂觀 Rollup](/developers/docs/scaling/optimistic-rollups/)。
樂觀 Rollup 處理交易的價格比以太坊主網（也稱為第一層 (L1)）低得多，因為交易僅由少數節點處理，而不是網路上的每個節點。
同時，所有資料都會寫入 L1，因此可以利用主網的所有完整性和可用性保證來證明和重建一切。

要在 Optimism（或任何其他 L2）上使用 L1 資產，這些資產需要被[橋接](/bridges/#prerequisites)。
實現此目的的一種方法是讓使用者在 L1 上鎖定資產（ETH 和 [ERC-20 代幣](/developers/docs/standards/tokens/erc-20/)是最常見的），並接收等值的資產以在 L2 上使用。
最終，無論誰獲得了這些資產，都可能希望將它們橋接回 L1。
執行此操作時，資產會在 L2 上被銷毀，然後在 L1 上釋放回給使用者。

這就是 [Optimism 標準跨鏈橋](https://docs.optimism.io/app-developers/bridging/standard-bridge)的運作方式。
在本文中，我們將檢視該跨鏈橋的原始碼以了解其運作方式，並將其作為編寫良好的 Solidity 程式碼範例進行研究。

## 控制流程 {#control-flows}

跨鏈橋有兩個主要流程：

- 存款（從 L1 到 L2）
- 提款（從 L2 到 L1）

### 存款流程 {#deposit-flow}

#### 第一層 (L1) {#deposit-flow-layer-1}

1. 如果存入 ERC-20，存款人會給予跨鏈橋花費所存入金額的授權額度
2. 存款人呼叫 L1 跨鏈橋（`depositERC20`、`depositERC20To`、`depositETH` 或 `depositETHTo`）
3. L1 跨鏈橋取得橋接資產的所有權
   - ETH：資產由存款人作為呼叫的一部分進行轉帳
   - ERC-20：跨鏈橋使用存款人提供的授權額度將資產轉帳給自己
4. L1 跨鏈橋使用跨域訊息機制呼叫 L2 跨鏈橋上的 `finalizeDeposit`

#### 第二層 (L2) {#deposit-flow-layer-2}

5. L2 跨鏈橋驗證對 `finalizeDeposit` 的呼叫是否合法：
   - 來自跨域訊息合約
   - 最初來自 L1 上的跨鏈橋
6. L2 跨鏈橋檢查 L2 上的 ERC-20 代幣合約是否正確：
   - L2 合約報告其 L1 對應合約與 L1 上代幣來源的合約相同
   - L2 合約報告它支援正確的介面（[使用 ERC-165](https://eips.ethereum.org/EIPS/eip-165)）。
7. 如果 L2 合約正確，則呼叫它以向適當的地址鑄造適當數量的代幣。如果不正確，則啟動提款流程，允許使用者在 L1 上申領代幣。

### 提款流程 {#withdrawal-flow}

#### 第二層 (L2) {#withdrawal-flow-layer-2}

1. 提款人呼叫 L2 跨鏈橋（`withdraw` 或 `withdrawTo`）
2. L2 跨鏈橋銷毀屬於 `msg.sender` 的適當數量的代幣
3. L2 跨鏈橋使用跨域訊息機制呼叫 L1 跨鏈橋上的 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal`

#### 第一層 (L1) {#withdrawal-flow-layer-1}

4. L1 跨鏈橋驗證對 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal` 的呼叫是否合法：
   - 來自跨域訊息機制
   - 最初來自 L2 上的跨鏈橋
5. L1 跨鏈橋將適當的資產（ETH 或 ERC-20）轉帳到適當的地址

## 第一層 (L1) 程式碼 {#layer-1-code}

這是執行在 L1（以太坊主網）上的程式碼。

### IL1ERC20Bridge {#il1erc20bridge}

[此介面定義於此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。
它包含橋接 ERC-20 代幣所需的函式和定義。

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism 的大部分程式碼都是在 MIT 授權條款下發布的](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

在撰寫本文時，Solidity 的最新版本是 0.8.12。
在 0.9.0 版本發布之前，我們不知道這段程式碼是否與其相容。

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * 事件 *
     **********/

    event ERC20DepositInitiated(
```

在 Optimism 跨鏈橋術語中，_存款 (deposit)_ 表示從 L1 轉帳到 L2，而 _提款 (withdrawal)_ 表示從 L2 轉帳到 L1。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

在大多數情況下，L1 上的 ERC-20 地址與 L2 上等效的 ERC-20 地址不同。
[您可以在此處查看代幣地址列表](https://static.optimism.io/optimism.tokenlist.json)。
`chainId` 為 1 的地址位於 L1（主網）上，而 `chainId` 為 10 的地址位於 L2（Optimism）上。
另外兩個 `chainId` 值用於 Kovan 測試網路 (42) 和 Optimistic Kovan 測試網路 (69)。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

可以為轉帳新增備註，在這種情況下，它們會被新增到報告這些轉帳的事件中。

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

同一個跨鏈橋合約處理雙向的轉帳。
對於 L1 跨鏈橋而言，這意味著初始化存款和完成提款。

```solidity

    /********************
     * 公開函式 *
     ********************/

    /**
     * @dev 取得對應的第二層 (L2) 跨鏈橋合約地址。
     * @return 對應的第二層 (L2) 跨鏈橋合約地址。
     */
    function l2TokenBridge() external returns (address);
```

這個函式並不是真正需要的，因為在 L2 上它是一個預先部署的合約，所以它始終位於地址 `0x4200000000000000000000000000000000000010`。
它在這裡是為了與 L2 跨鏈橋保持對稱，因為 L1 跨鏈橋的地址_並非_顯而易見。

```solidity
    /**
     * @dev 將一定數量的 ERC-20 存入呼叫者在第二層 (L2) 的餘額中。
     * @param _l1Token 我們正在存入的第一層 (L1) ERC-20 地址
     * @param _l2Token 第一層 (L1) 對應的第二層 (L2) ERC-20 地址
     * @param _amount 要存入的 ERC-20 數量
     * @param _l2Gas 在第二層 (L2) 完成存款所需的燃料限制。
     * @param _data 要轉發到第二層 (L2) 的可選資料。提供此資料
     *        純粹是為了外部合約的便利。除了強制執行最大
     *        長度外，這些合約對其內容不提供任何保證。
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 參數是交易允許花費的 L2 燃料數量。
[在達到某個（較高的）限制之前，這是免費的](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)，因此除非 ERC-20 合約在鑄造時執行了非常奇怪的操作，否則這不應該是個問題。
此函式處理常見的場景，即使用者將資產橋接到不同區塊鏈上的相同地址。

```solidity
    /**
     * @dev 將一定數量的 ERC-20 存入接收者在第二層 (L2) 的餘額中。
     * @param _l1Token 我們正在存入的第一層 (L1) ERC-20 地址
     * @param _l2Token 第一層 (L1) 對應的第二層 (L2) ERC-20 地址
     * @param _to 要將提款記入的第二層 (L2) 地址。
     * @param _amount 要存入的 ERC-20 數量。
     * @param _l2Gas 在第二層 (L2) 完成存款所需的燃料限制。
     * @param _data 要轉發到第二層 (L2) 的可選資料。提供此資料
     *        純粹是為了外部合約的便利。除了強制執行最大
     *        長度外，這些合約對其內容不提供任何保證。
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

此函式與 `depositERC20` 幾乎相同，但它允許您將 ERC-20 傳送到不同的地址。

```solidity
    /*************************
     * 跨鏈函式 *
     *************************/

    /**
     * @dev 完成從第二層 (L2) 到第一層 (L1) 的提款，並將資金記入接收者的
     * 第一層 (L1) ERC-20 代幣餘額中。
     * 如果從第二層 (L2) 初始化的提款尚未最終確定，此呼叫將會失敗。
     *
     * @param _l1Token 要為其 finalizeWithdrawal 的第一層 (L1) 代幣地址。
     * @param _l2Token 啟動提款的第二層 (L2) 代幣地址。
     * @param _from 啟動轉帳的第二層 (L2) 地址。
     * @param _to 要將提款記入的第一層 (L1) 地址。
     * @param _amount 要存入的 ERC-20 數量。
     * @param _data 發送者在第二層 (L2) 提供的資料。提供此資料
     *   純粹是為了外部合約的便利。除了強制執行最大
     *   長度外，這些合約對其內容不提供任何保證。
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

Optimism 中的提款（以及從 L2 到 L1 的其他訊息）是一個兩步流程：

1. 在 L2 上發起交易。
2. 在 L1 上完成或申領交易。
   此交易需要在 L2 交易的[錯誤挑戰期](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)結束後進行。

### IL1StandardBridge {#il1standardbridge}

[此介面定義於此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。
此檔案包含 ETH 的事件和函式定義。
這些定義與上面 `IL1ERC20Bridge` 中為 ERC-20 定義的內容非常相似。

跨鏈橋介面被劃分在兩個檔案中，因為某些 ERC-20 代幣需要自訂處理，無法由標準跨鏈橋處理。
這樣一來，處理此類代幣的自訂跨鏈橋就可以實作 `IL1ERC20Bridge`，而無需同時橋接 ETH。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * 事件 *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

此事件與 ERC-20 版本（`ERC20DepositInitiated`）幾乎相同，只是沒有 L1 和 L2 代幣地址。
其他事件和函式也是如此。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * 公開函式 *
     ********************/

    /**
     * @dev 將一定數量的 ETH 存入呼叫者在第二層 (L2) 的餘額中。
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev 將一定數量的 ETH 存入接收者在第二層 (L2) 的餘額中。
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
     * 跨鏈函式 *
     *************************/

    /**
     * @dev 完成從第二層 (L2) 到第一層 (L1) 的提款，並將資金記入接收者的
     * 第一層 (L1) ETH 代幣餘額中。由於只有 xDomainMessenger 可以呼叫此函式，因此在提款最終確定之前
     * 永遠不會呼叫它。
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

[此合約](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)由兩個跨鏈橋（[L1](#the-l1-bridge-contract) 和 [L2](#l2-bridge-code)）繼承，用於向另一層發送訊息。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* 介面匯入 */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[此介面](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)告訴合約如何使用跨域通訊器向另一層發送訊息。
這個跨域通訊器是另一個完整的系統，值得專門寫一篇文章，我希望將來能寫。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev 執行跨域通訊的合約的輔助合約
 *
 * 使用的編譯器：由繼承的合約定義
 */
contract CrossDomainEnabled {
    /*************
     * 變數 *
     *************/

    // 用於發送和接收來自其他網域訊息的 Messenger 合約。
    address public messenger;

    /***************
     * 建構函式 *
     ***************/

    /**
     * @param _messenger 當前層上的 CrossDomainMessenger 地址。
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

合約需要知道的一個參數是該層上跨域通訊器的地址。
此參數在建構函式中設定一次，並且永遠不會改變。

```solidity

    /**********************
     * 函式修飾符 *
     **********************/

    /**
     * 強制被修飾的函式只能由特定的跨域帳戶呼叫。
     * @param _sourceDomainAccount 來源網域上唯一被
     *  授權呼叫此函式的帳戶。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

跨域訊息傳遞可由其執行所在區塊鏈（以太坊主網或 Optimism）上的任何合約存取。
但我們需要兩側的跨鏈橋_僅_信任來自另一側跨鏈橋的特定訊息。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

只有來自適當跨域通訊器（`messenger`，如下所示）的訊息才是可信的。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

跨域通訊器提供向另一層發送訊息的地址的方式是透過 [`.xDomainMessageSender()` 函式](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)。
只要它在由訊息發起的交易中被呼叫，它就可以提供此資訊。

我們需要確保收到的訊息來自另一個跨鏈橋。

```solidity

        _;
    }

    /**********************
     * 內部函式 *
     **********************/

    /**
     * 取得 messenger，通常來自儲存空間。公開此函式是為了防止子合約
     * 需要覆寫。
     * @return 應使用的跨域 messenger 合約地址。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

此函式回傳跨域通訊器。
我們使用函式而不是變數 `messenger`，以允許繼承自此合約的合約使用演算法來指定要使用的跨域通訊器。

```solidity

    /**
     * 發送訊息到另一個網域上的帳戶
     * @param _crossDomainTarget 目標網域上的預期接收者
     * @param _message 要發送到目標的資料（通常是帶有
     *  `onlyFromCrossDomainAccount()` 函式的呼叫資料）
     * @param _gasLimit 在目標網域上接收訊息的燃料限制。
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最後，向另一層發送訊息的函式。

```solidity
    ) internal {
        // 斯立瑟-disable-next-line 重入-事件, 重入-benign
```

[斯立瑟](https://github.com/crytic/slither) 是 Optimism 在每個合約上執行的靜態分析器，用於尋找漏洞和其他潛在問題。
在這種情況下，以下程式碼行會觸發兩個漏洞：

1. [重入事件](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性重入](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

在這種情況下，我們不擔心重入，因為我們知道 `getCrossDomainMessenger()` 會回傳一個可信的地址，即使斯立瑟無法知道這一點。

### L1 跨鏈橋合約 {#the-l1-bridge-contract}

[此合約的原始碼在此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

介面可以是其他合約的一部分，因此它們必須支援廣泛的 Solidity 版本。
但跨鏈橋本身是我們的合約，我們可以嚴格規定它使用的 Solidity 版本。

```solidity
/* 介面匯入 */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) 和 [IL1StandardBridge](#il1standardbridge) 已在上面解釋過。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[此介面](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)讓我們建立訊息來控制 L2 上的標準跨鏈橋。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[此介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)讓我們控制 ERC-20 合約。
[您可以在此處閱讀更多相關資訊](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* 函式庫匯入 */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[如上所述](#crossdomainenabled)，此合約用於層間訊息傳遞。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) 包含始終具有相同地址的 L2 合約地址。這包括 L2 上的標準跨鏈橋。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[歐本齊柏林的 Address 實用程式](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。它用於區分合約地址和屬於外部擁有帳戶 (EOA) 的地址。

請注意，這不是一個完美的解決方案，因為無法區分直接呼叫和從合約建構函式發出的呼叫，但至少這讓我們能夠識別並防止一些常見的使用者錯誤。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 標準](https://eips.ethereum.org/EIPS/eip-20)支援合約報告失敗的兩種方式：

1. 回滾
2. 回傳 `false`

處理這兩種情況會使我們的程式碼變得更加複雜，因此我們改用 [歐本齊柏林的 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)，它確保[所有失敗都會導致回滾](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)。

```solidity
/**
 * @title L1StandardBridge
 * @dev 第一層 (L1) ETH 和 ERC-20 跨鏈橋是一個合約，用於儲存已存入的第一層 (L1) 資金和
 * 在第二層 (L2) 上使用的標準代幣。它會同步對應的第二層 (L2) 跨鏈橋，通知其存款
 * 並監聽其最新最終確定的提款。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

這行程式碼是我們指定每次使用 `IERC20` 介面時都要使用 `SafeERC20` 包裝器的方式。

```solidity

    /********************************
     * 外部合約參考 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) 的地址。

```solidity

    // 將第一層 (L1) 代幣映射到第二層 (L2) 代幣，再映射到已存入的第一層 (L1) 代幣餘額
    mapping(address => mapping(address => uint256)) public deposits;
```

像這樣的雙重[對應 (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)是定義[二維稀疏陣列](https://en.wikipedia.org/wiki/Sparse_matrix)的方式。
此資料結構中的值被標識為 `deposit[L1 token addr][L2 token addr]`。
預設值為零。
只有設定為不同值的儲存格才會寫入儲存空間。

```solidity

    /***************
     * 建構函式 *
     ***************/

    // 此合約位於代理之後，因此建構函式參數將不會被使用。
    constructor() CrossDomainEnabled(address(0)) {}
```

為了能夠升級此合約而無需複製儲存空間中的所有變數。
為此，我們使用 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)，這是一個使用 [`delegatecall`](https://solidity-by-example.org/delegatecall/) 將呼叫轉移到另一個獨立合約的代理合約，該獨立合約的地址由代理合約儲存（當您升級時，您會告訴代理合約更改該地址）。
當您使用 `delegatecall` 時，儲存空間仍然是_呼叫_合約的儲存空間，因此所有合約狀態變數的值都不受影響。

這種模式的一個影響是，作為 `delegatecall` _被呼叫方_的合約的儲存空間不會被使用，因此傳遞給它的建構函式值並不重要。
這就是我們可以向 `CrossDomainEnabled` 建構函式提供無意義值的原因。
這也是下面的初始化與建構函式分開的原因。

```solidity
    /******************
     * 初始化 *
     ******************/

    /**
     * @param _l1messenger 用於跨鏈通訊的第一層 (L1) Messenger 地址。
     * @param _l2TokenBridge 第二層 (L2) 標準跨鏈橋地址。
     */
    // 斯立瑟-disable-next-line external-function
```

此 [斯立瑟測試](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)識別出未從合約程式碼中呼叫的函式，因此可以將其宣告為 `external` 而不是 `public`。
`external` 函式的燃料成本可能較低，因為可以在呼叫資料中為它們提供參數。
宣告為 `public` 的函式必須可以從合約內部存取。
合約無法修改自己的呼叫資料，因此參數必須在記憶體中。
當從外部呼叫此類函式時，必須將呼叫資料複製到記憶體中，這會消耗燃料。
在這種情況下，該函式只被呼叫一次，因此效率低下對我們來說並不重要。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` 函式應該只被呼叫一次。
如果 L1 跨域通訊器或 L2 代幣跨鏈橋的地址發生變化，我們會建立一個新的代理合約和一個呼叫它的新跨鏈橋。
除非整個系統升級，否則這不太可能發生，這是一種非常罕見的情況。

請注意，此函式沒有任何機制來限制_誰_可以呼叫它。
這意味著在理論上，攻擊者可以等到我們部署代理合約和第一個版本的跨鏈橋，然後[搶跑](https://solidity-by-example.org/hacks/front-running/)，在合法使用者之前到達 `initialize` 函式。但有兩種方法可以防止這種情況：

1. 如果合約不是由 EOA 直接部署，而是[在由另一個合約建立它們的交易中部署](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)，則整個過程可以是原子性的，並在執行任何其他交易之前完成。
2. 如果對 `initialize` 的合法呼叫失敗，始終可以忽略新建立的代理合約和跨鏈橋，並建立新的。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

這是跨鏈橋需要知道的兩個參數。

```solidity

    /**************
     * 存款 *
     **************/

    /** @dev 要求發送者為 EOA 的修飾符。惡意合約可以透過 initcode 繞過此檢查，
     *  但它處理了我們想要避免的使用者錯誤。
     */
    modifier onlyEOA() {
        // 用於停止來自合約的存款（避免意外遺失代幣）
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

這就是我們需要歐本齊柏林的 `Address` 實用程式的原因。

```solidity
    /**
     * @dev 可以在沒有資料的情況下呼叫此函式
     * 以將一定數量的 ETH 存入呼叫者在第二層 (L2) 的餘額中。
     * 由於 receive 函式不接收資料，因此會將保守的
     * 預設數量轉發到第二層 (L2)。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

此函式為測試目的而存在。
請注意，它沒有出現在介面定義中——它不是供正常使用的。

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

這兩個函式是 `_initiateETHDeposit` 的包裝器，該函式處理實際的 ETH 存款。

```solidity
    /**
     * @dev 透過儲存 ETH 並通知第二層 (L2) ETH 閘道器存款，
     * 來執行存款邏輯。
     * @param _from 在第一層 (L1) 上提取存款的帳戶。
     * @param _to 在第二層 (L2) 上接收存款的帳戶。
     * @param _l2Gas 在第二層 (L2) 完成存款所需的燃料限制。
     * @param _data 要轉發到第二層 (L2) 的可選資料。提供此資料
     *        純粹是為了外部合約的便利。除了強制執行最大
     *        長度外，這些合約對其內容不提供任何保證。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // 為 finalizeDeposit 呼叫建構呼叫資料
        bytes memory message = abi.encodeWithSelector(
```

跨域訊息的運作方式是使用訊息作為其呼叫資料來呼叫目標合約。
Solidity 合約始終根據
[ABI 規範](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)來解釋其呼叫資料。
Solidity 函式 [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) 建立該呼叫資料。

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

這裡的訊息是使用以下參數呼叫 [`finalizeDeposit` 函式](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)：

| 參數 | 值 | 含義 |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | 代表 L1 上 ETH（它不是 ERC-20 代幣）的特殊值                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | 在 Optimism 上管理 ETH 的 L2 合約，`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`（此合約僅供 Optimism 內部使用） |
| \_from    | \_from                         | 在 L1 上發送 ETH 的地址                                                                                                         |
| \_to      | \_to                           | 在 L2 上接收 ETH 的地址                                                                                                      |
| amount    | msg.value                      | 發送的 Wei 數量（已經發送到跨鏈橋）                                                                               |
| \_data    | \_data                         | 附加到存款的額外資料                                                                                                     |

```solidity
        // 將呼叫資料發送到第二層 (L2)
        // 斯立瑟-disable-next-line 重入-事件
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

透過跨域通訊器發送訊息。

```solidity
        // 斯立瑟-disable-next-line 重入-事件
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

觸發一個事件，以通知任何監聽此轉帳的去中心化應用程式 (dapp)。

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

這兩個函式是 `_initiateERC20Deposit` 的包裝器，該函式處理實際的 ERC-20 存款。

```solidity
    /**
     * @dev 透過通知第二層 (L2) 存款代幣合約存款，
     * 並呼叫處理常式來鎖定第一層 (L1) 資金（例如 transferFrom），來執行存款邏輯。
     *
     * @param _l1Token 我們正在存入的第一層 (L1) ERC-20 地址
     * @param _l2Token 第一層 (L1) 對應的第二層 (L2) ERC-20 地址
     * @param _from 在第一層 (L1) 上提取存款的帳戶
     * @param _to 在第二層 (L2) 上接收存款的帳戶
     * @param _amount 要存入的 ERC-20 數量。
     * @param _l2Gas 在第二層 (L2) 完成存款所需的燃料限制。
     * @param _data 要轉發到第二層 (L2) 的可選資料。提供此資料
     *        純粹是為了外部合約的便利。除了強制執行最大
     *        長度外，這些合約對其內容不提供任何保證。
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

此函式與上面的 `_initiateETHDeposit` 類似，但有一些重要的區別。
第一個區別是此函式接收代幣地址和要轉帳的金額作為參數。
在 ETH 的情況下，對跨鏈橋的呼叫已經包含了將資產轉帳到跨鏈橋帳戶（`msg.value`）。

```solidity
        // 當在第一層 (L1) 上啟動存款時，第一層 (L1) 跨鏈橋會將資金轉帳給自己，以便未來
        // 提款。safeTransferFrom 也會檢查合約是否有程式碼，因此如果
        // _from 是 EOA 或 地址(0)，這將會失敗。
        // 斯立瑟-disable-next-line 重入-事件, 重入-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 代幣轉帳遵循與 ETH 不同的流程：

1. 使用者（`_from`）給予跨鏈橋轉帳適當代幣的授權額度。
2. 使用者使用代幣合約的地址、金額等呼叫跨鏈橋。
3. 跨鏈橋將代幣轉帳（給自己）作為存款流程的一部分。

第一步可能發生在與後兩步不同的獨立交易中。
然而，搶跑不是問題，因為呼叫 `_initiateERC20Deposit` 的兩個函式（`depositERC20` 和 `depositERC20To`）僅使用 `msg.sender` 作為 `_from` 參數來呼叫此函式。

```solidity
        // 為 _l2Token.finalizeDeposit(_to, _amount) 建構呼叫資料
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // 將呼叫資料發送到第二層 (L2)
        // 斯立瑟-disable-next-line 重入-事件, 重入-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // 斯立瑟-disable-next-line 重入-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

將存入的代幣數量新增到 `deposits` 資料結構中。
L2 上可能有多個地址對應於同一個 L1 ERC-20 代幣，因此僅使用跨鏈橋的 L1 ERC-20 代幣餘額來追蹤存款是不夠的。

```solidity

        // 斯立瑟-disable-next-line 重入-事件
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * 跨鏈函式 *
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

L2 跨鏈橋向 L2 跨域通訊器發送訊息，這會導致 L1 跨域通訊器呼叫此函式（當然，這是在 L1 上提交了[完成訊息的交易](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)之後）。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

確保這是一條_合法_的訊息，來自跨域通訊器並源自 L2 代幣跨鏈橋。
此函式用於從跨鏈橋提取 ETH，因此我們必須確保它僅由授權的呼叫者呼叫。

```solidity
        // 斯立瑟-disable-next-line 重入-事件
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

轉帳 ETH 的方式是使用 `msg.value` 中的 Wei 數量呼叫接收者。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // 斯立瑟-disable-next-line 重入-事件
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

觸發一個關於提款的事件。

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

此函式與上面的 `finalizeETHWithdrawal` 類似，並針對 ERC-20 代幣進行了必要的更改。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

更新 `deposits` 資料結構。

```solidity

        // 當提款在第一層 (L1) 上最終確定時，第一層 (L1) 跨鏈橋會將資金轉帳給提款人
        // 斯立瑟-disable-next-line 重入-事件
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // 斯立瑟-disable-next-line 重入-事件
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 暫時 - 遷移 ETH *
     *****************************/

    /**
     * @dev 將 ETH 餘額新增至帳戶。這是為了允許將 ETH
     * 從舊閘道器遷移到新閘道器。
     * 注意：這僅保留用於一次升級，以便我們能夠從
     * 舊合約接收遷移的 ETH
     */
    function donateETH() external payable {}
}
```

跨鏈橋有一個早期的實作版本。
當我們從那個實作版本轉移到這個版本時，我們必須轉移所有資產。
ERC-20 代幣可以直接轉移。
然而，要將 ETH 轉帳到合約，您需要該合約的批准，這正是 `donateETH` 提供給我們的。

## L2 上的 ERC-20 代幣 {#erc-20-tokens-on-l2}

為了讓 ERC-20 代幣適應標準跨鏈橋，它需要允許標準跨鏈橋，且_僅_允許標準跨鏈橋來鑄造代幣。
這是必要的，因為跨鏈橋需要確保在 Optimism 上流通的代幣數量等於鎖定在 L1 跨鏈橋合約內的代幣數量。
如果 L2 上的代幣過多，一些使用者將無法將其資產橋接回 L1。
我們將不再擁有一個可信的跨鏈橋，而是在本質上重建了[部分準備金銀行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)。
如果 L1 上的代幣過多，其中一些代幣將永遠鎖定在跨鏈橋合約內，因為如果不銷毀 L2 代幣，就無法釋放它們。

### IL2StandardERC20 {#il2standarderc20}

L2 上每個使用標準跨鏈橋的 ERC-20 代幣都需要提供[此介面](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)，其中包含標準跨鏈橋所需的函式和事件。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[標準 ERC-20 介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)不包含 `mint` 和 `burn` 函式。
[ERC-20 標準](https://eips.ethereum.org/EIPS/eip-20)不要求這些方法，該標準未指定建立和銷毀代幣的機制。

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)用於指定合約提供哪些函式。
[您可以在此處閱讀該標準](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

此函式提供橋接到此合約的 L1 代幣地址。
請注意，我們沒有相反方向的類似函式。
我們需要能夠橋接任何 L1 代幣，無論在實作時是否計劃了 L2 支援。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

用於鑄造（建立）和銷毀（摧毀）代幣的函式和事件。
跨鏈橋應該是唯一可以執行這些函式的實體，以確保代幣數量正確（等於鎖定在 L1 上的代幣數量）。

### L2StandardERC20 {#l2standarderc20}

[這是我們對 `IL2StandardERC20` 介面的實作](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。
除非您需要某種自訂邏輯，否則您應該使用這個。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[歐本齊柏林 ERC-20 合約](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
Optimism 不主張重新發明輪子，特別是當這個輪子經過了良好的稽核，並且需要足夠可信以持有資產時。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

這是我們需要的兩個額外配置參數，而 ERC-20 通常不需要。

```solidity

    /**
     * @param _l2Bridge 第二層 (L2) 標準跨鏈橋的地址。
     * @param _l1Token 對應的第一層 (L1) 代幣的地址。
     * @param _name ERC-20 名稱。
     * @param _symbol ERC-20 符號。
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

首先呼叫我們繼承的合約（`ERC20(_name, _symbol)`）的建構函式，然後設定我們自己的變數。

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // 斯立瑟-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

這就是 [ERC-165](https://eips.ethereum.org/EIPS/eip-165) 的運作方式。
每個介面都是一些受支援的函式，並被標識為這些函式的 [ABI 函式選擇器](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)的[互斥或 (XOR)](https://en.wikipedia.org/wiki/Exclusive_or)。

L2 跨鏈橋使用 ERC-165 作為健全性檢查，以確保它發送資產的 ERC-20 合約是一個 `IL2StandardERC20`。

**注意：**沒有任何機制可以防止惡意合約對 `supportsInterface` 提供錯誤的答案，因此這是一個健全性檢查機制，_不是_安全機制。

```solidity
    // 斯立瑟-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // 斯立瑟-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

只有 L2 跨鏈橋被允許鑄造和銷毀資產。

`_mint` 和 `_burn` 實際上定義在[歐本齊柏林 ERC-20 合約](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)中。
該合約只是沒有將它們暴露在外部，因為鑄造和銷毀代幣的條件與使用 ERC-20 的方式一樣多種多樣。

## L2 跨鏈橋程式碼 {#l2-bridge-code}

這是執行在 Optimism 上的跨鏈橋程式碼。
[此合約的原始碼在此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* 介面匯入 */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 介面與我們在上面看到的 [L1 等效介面](#il1erc20bridge)非常相似。
有兩個顯著的區別：

1. 在 L1 上，您發起存款並完成提款。
   在這裡，您發起提款並完成存款。
2. 在 L1 上，必須區分 ETH 和 ERC-20 代幣。
   在 L2 上，我們可以對兩者使用相同的函式，因為在內部，Optimism 上的 ETH 餘額被作為地址為 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) 的 ERC-20 代幣來處理。

```solidity
/* 函式庫匯入 */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* 合約匯入 */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev 第二層 (L2) 標準跨鏈橋是一個與第一層 (L1) 標準跨鏈橋協同工作的合約，
 * 以實現 ETH 和 ERC-20 在第一層 (L1) 和第二層 (L2) 之間的轉換。
 * 當此合約得知存入第一層 (L1) 標準跨鏈橋的存款時，它會充當新代幣的鑄造者。
 * 此合約也充當預定用於提款的代幣的銷毀者，通知第一層 (L1)
 * 跨鏈橋釋放第一層 (L1) 資金。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 外部合約參考 *
     ********************************/

    address public l1TokenBridge;
```

追蹤 L1 跨鏈橋的地址。
請注意，與 L1 等效合約相反，在這裡我們_需要_這個變數。
L1 跨鏈橋的地址無法事先得知。

```solidity

    /***************
     * 建構函式 *
     ***************/

    /**
     * @param _l2CrossDomainMessenger 此合約使用的跨域 messenger。
     * @param _l1TokenBridge 部署到主鏈的第一層 (L1) 跨鏈橋地址。
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * 提款 *
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

這兩個函式發起提款。
請注意，不需要指定 L1 代幣地址。
L2 代幣預計會告訴我們 L1 等效代幣的地址。

```solidity

    /**
     * @dev 透過銷毀代幣並通知
     *      第一層 (L1) 代幣閘道器提款，來執行提款邏輯。
     * @param _l2Token 啟動提款的第二層 (L2) 代幣地址。
     * @param _from 在第二層 (L2) 上提取提款的帳戶。
     * @param _to 在第一層 (L1) 上接收提款的帳戶。
     * @param _amount 要提款的代幣數量。
     * @param _l1Gas 未使用，但包含在內以供潛在的向前相容性考量。
     * @param _data 要轉發到第一層 (L1) 的可選資料。提供此資料
     *        純粹是為了外部合約的便利。除了強制執行最大
     *        長度外，這些合約對其內容不提供任何保證。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 當啟動提款時，我們會銷毀提款人的資金以防止後續的第二層 (L2)
        // 使用
        // 斯立瑟-disable-next-line 重入-事件
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

請注意，我們_不_依賴 `_from` 參數，而是依賴 `msg.sender`，這要難以偽造得多（據我所知，這是不可能的）。

```solidity

        // 為 l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) 建構呼叫資料
        // 斯立瑟-disable-next-line 重入-事件
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

在 L1 上，必須區分 ETH 和 ERC-20。

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

        // 將訊息發送至第一層 (L1) 跨鏈橋
        // 斯立瑟-disable-next-line 重入-事件
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // 斯立瑟-disable-next-line 重入-事件
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * 跨鏈函式：存款 *
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

此函式由 `L1StandardBridge` 呼叫。

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

確保訊息的來源是合法的。
這很重要，因為此函式呼叫 `_mint`，並且可能被用來給予跨鏈橋在 L1 上所擁有代幣未涵蓋的代幣。

```solidity
        // 檢查目標代幣是否合規且
        // 驗證在第一層 (L1) 上存入的代幣與此處的第二層 (L2) 存款代幣表示相符
        if (
            // 斯立瑟-disable-next-line 重入-事件
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

健全性檢查：

1. 支援正確的介面
2. L2 ERC-20 合約的 L1 地址與代幣的 L1 來源相符

```solidity
        ) {
            // 當存款最終確定時，我們會在第二層 (L2) 上的帳戶記入相同數量的
            // 代幣。
            // 斯立瑟-disable-next-line 重入-事件
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // 斯立瑟-disable-next-line 重入-事件
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

如果健全性檢查通過，則完成存款：

1. 鑄造代幣
2. 觸發適當的事件

```solidity
        } else {
            // 正在存入的第二層 (L2) 代幣對正確的地址認知不一致
            // （其第一層 (L1) 代幣的地址），或者不支援正確的介面。
            // 這只應在存在惡意的第二層 (L2) 代幣，或者使用者以某種方式
            // 指定了錯誤的第二層 (L2) 代幣地址進行存款時發生。
            // 在任何一種情況下，我們都會在此處停止該過程並建構一個提款
            // 訊息，以便使用者在某些情況下可以取出他們的資金。
            // 無法完全防止惡意代幣合約，但這確實限制了
            // 使用者錯誤並減輕了某些形式的惡意合約行為。
```

如果使用者因使用錯誤的 L2 代幣地址而犯了可檢測的錯誤，我們希望取消存款並在 L1 上退還代幣。
我們從 L2 執行此操作的唯一方法是發送一條必須等待錯誤挑戰期的訊息，但這對使用者來說比永久丟失代幣要好得多。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 在此處切換了 _to 和 _from 以將存款退回給發送者
                _from,
                _amount,
                _data
            );

            // 將訊息發送至第一層 (L1) 跨鏈橋
            // 斯立瑟-disable-next-line 重入-事件
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // 斯立瑟-disable-next-line 重入-事件
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 結論 {#conclusion}

標準跨鏈橋是資產轉移最靈活的機制。
然而，因為它非常通用，所以它並不總是最容易使用的機制。
特別是對於提款，大多數使用者更喜歡使用[第三方跨鏈橋](https://optimism.io/apps#bridge)，這些跨鏈橋不需要等待挑戰期，也不需要默克爾證明來完成提款。

這些跨鏈橋通常透過在 L1 上擁有資產來運作，它們會立即提供這些資產並收取少量費用（通常低於標準跨鏈橋提款的燃料成本）。
當跨鏈橋（或營運它的人）預計 L1 資產短缺時，它會從 L2 轉移足夠的資產。由於這些是非常大額的提款，提款成本會分攤到大量資產上，因此所佔比例要小得多。

希望本文能幫助您更深入地了解第二層 (L2) 的運作方式，以及如何編寫清晰且安全的 Solidity 程式碼。

[在此處查看我的更多作品](https://cryptodocguy.pro/)。