---
title: "Optimism 標準跨鏈橋合約深入解析"
description: "Optimism 的標準跨鏈橋如何運作？ 為什麼它會這樣運作？"
author: Ori Pomerantz
tags: [ "solidity", "bridge", "layer 2" ]
skill: intermediate
published: 2022-03-30
lang: zh-tw
---

[Optimism](https://www.optimism.io/) 是一種[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)。
樂觀卷軸能以遠低於以太坊主網 (又稱為第一層或 L1) 的價格處理交易，因為交易只由少數節點處理，而非網路上每個節點都處理。
同時，所有資料都會寫入 L1，因此所有內容都能以主網的完整性和可用性保證來證明和重建。

若要在 Optimism (或任何其他 L2) 上使用 L1 資產，這些資產需要被[橋接](/bridges/#prerequisites)。
達成此目的的其中一種方法是讓使用者在 L1 鎖定資產 (最常見的是 ETH 和 [ERC-20 代幣](/developers/docs/standards/tokens/erc-20/))，並在 L2 收到等值的資產來使用。
最後，無論是誰持有這些資產，都可能會想把它們橋接回 L1。
這麼做的時候，資產會在 L2 被銷毀，然後在 L1 釋放給使用者。

這就是 [Optimism 標準跨鏈橋](https://docs.optimism.io/app-developers/bridging/standard-bridge)的運作方式。
在本文中，我們將檢視該跨鏈橋的原始程式碼，以了解其運作方式，並將其作為編寫精良的 Solidity 程式碼範例來研究。

## 控制流程 {#control-flows}

該跨鏈橋有兩個主要流程：

- 存款 (從 L1 到 L2)
- 提款 (從 L2 到 L1)

### 存款流程 {#deposit-flow}

#### 第一層 {#deposit-flow-layer-1}

1. 如果存入 ERC-20，存款人會給予跨鏈橋一筆額度，以花費正在存入的金額
2. 存款人呼叫 L1 跨鏈橋 (`depositERC20`、`depositERC20To`、`depositETH` 或 `depositETHTo`)
3. L1 跨鏈橋取得橋接資產的所有權
   - ETH：資產由存款人作為呼叫的一部分進行轉移
   - ERC-20：跨鏈橋使用存款人提供的額度將資產轉移給自己
4. L1 跨鏈橋使用跨網域訊息機制在 L2 跨鏈橋上呼叫 `finalizeDeposit`

#### 第二層 {#deposit-flow-layer-2}

5. L2 跨鏈橋驗證對 `finalizeDeposit` 的呼叫是合法的：
   - 來自跨網域訊息合約
   - 最初來自 L1 上的跨鏈橋
6. L2 跨鏈橋檢查 L2 上的 ERC-20 代幣合約是否正確：
   - L2 合約回報其 L1 對應合約與代幣在 L1 上的來源合約相同
   - L2 合約回報其支援正確的介面 ([使用 ERC-165](https://eips.ethereum.org/EIPS/eip-165))。
7. 如果 L2 合約是正確的，則呼叫它以鑄造適當數量的代幣到適當的地址。 若否，則啟動提款程序，讓使用者可以在 L1 上取回代幣。

### 提款流程 {#withdrawal-flow}

#### 第二層 {#withdrawal-flow-layer-2}

1. 提款人呼叫 L2 跨鏈橋 (`withdraw` 或 `withdrawTo`)
2. L2 跨鏈橋銷毀屬於 `msg.sender` 的適當數量的代幣
3. L2 跨鏈橋使用跨網域訊息機制在 L1 跨鏈橋上呼叫 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal`

#### 第一層 {#withdrawal-flow-layer-1}

4. L1 跨鏈橋驗證對 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal` 的呼叫是合法的：
   - 來自跨網域訊息機制
   - 最初來自 L2 上的跨鏈橋
5. L1 跨鏈橋將適當的資產 (ETH 或 ERC-20) 轉移到適當的地址

## 第一層程式碼 {#layer-1-code}

這是在 L1 (以太坊主網) 上執行的程式碼。

### IL1ERC20Bridge {#IL1ERC20Bridge}

[此介面定義在此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。
它包含橋接 ERC-20 代幣所需的功能和定義。

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism 的大部分程式碼都是在 MIT 授權條款下釋出](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

在撰寫本文時，Solidity 的最新版本為 0.8.12。
在 0.9.0 版本釋出前，我們不知道此程式碼是否與其相容。

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

在 Optimism 跨鏈橋的術語中，_deposit_ 指從 L1 到 L2 的轉移，而 _withdrawal_ 則指從 L2 到 L1 的轉移。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

在大多數情況下，L1 上的 ERC-20 地址與 L2 上對等的 ERC-20 地址不同。
[您可以在此處查看代幣地址清單](https://static.optimism.io/optimism.tokenlist.json)。
`chainId` 為 1 的地址在 L1 (主網) 上，`chainId` 為 10 的地址在 L2 (Optimism) 上。
另外兩個 `chainId` 值分別用於 Kovan 測試網 (42) 和 Optimistic Kovan 測試網 (69)。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

可以為轉移新增註記，在這種情況下，它們會被新增到回報它們的事件中。

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

同一個跨鏈橋合約處理雙向的轉移。
在 L1 跨鏈橋的情況下，這表示存款的初始化和提款的最終確定。

```solidity

    /********************
     * 公用函式 *
     ********************/

    /**
     * @dev 取得相應 L2 跨鏈橋合約的地址。
     * @return 相應 L2 跨鏈橋合約的地址。
     */
    function l2TokenBridge() external returns (address);
```

這個函式並非真正必要，因為在 L2 上它是一個預先部署的合約，所以地址永遠是 `0x4200000000000000000000000000000000000010`。
它在這裡是為了與 L2 跨鏈橋對稱，因為 L1 跨鏈橋的地址並不容易知道。

```solidity
    /**
     * @dev 將一定數量的 ERC20 存入呼叫者在 L2 上的餘額。
     * @param _l1Token 我們正在存入的 L1 ERC20 的地址
     * @param _l2Token L1 各自在 L2 的 ERC20 地址
     * @param _amount 要存入的 ERC20 數量
     * @param _l2Gas 在 L2 上完成存款所需的 Gas 限制。
     * @param _data 可選資料，轉發到 L2。此資料僅為方便外部合約而提供。
     *        除了強制執行最大長度外，這些合約對其內容不提供任何保證。
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 參數是交易允許花費的 L2 Gas 數量。
[在某個 (高) 限制內，這是免費的](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)，所以除非 ERC-20 合約在鑄造時做了非常奇怪的事情，否則應該不成問題。
這個函式處理常見的情境，即使用者將資產橋接到不同區塊鏈上的同一個地址。

```solidity
    /**
     * @dev 將一定數量的 ERC20 存入收款人在 L2 上的餘額。
     * @param _l1Token 我們正在存入的 L1 ERC20 的地址
     * @param _l2Token L1 各自在 L2 的 ERC20 地址
     * @param _to 將提款記入的 L2 地址。
     * @param _amount 要存入的 ERC20 數量。
     * @param _l2Gas 在 L2 上完成存款所需的 Gas 限制。
     * @param _data 可選資料，轉發到 L2。此資料僅為方便外部合約而提供。
     *        除了強制執行最大長度外，這些合約對其內容不提供任何保證。
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

這個函式與 `depositERC20` 幾乎相同，但它允許您將 ERC-20 傳送到不同的地址。

```solidity
    /*************************
     * 跨鏈函式 *
     *************************/

    /**
     * @dev 完成從 L2 到 L1 的提款，並將資金記入收款人在
     * L1 ERC20 代幣的餘額。
     * 如果從 L2 初始化的提款尚未最終確定，此呼叫將會失敗。
     *
     * @param _l1Token 要為其 finalizeWithdrawal 的 L1 代幣地址。
     * @param _l2Token 提款初始化的 L2 代幣地址。
     * @param _from 啟動轉移的 L2 地址。
     * @param _to 將提款記入的 L1 地址。
     * @param _amount 要存入的 ERC20 數量。
     * @param _data 由傳送者在 L2 上提供的資料。此資料僅為方便外部合約而提供。
     *   除了強制執行最大長度外，這些合約對其內容不提供任何保證。
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

在 Optimism 中，提款 (以及其他從 L2 到 L1 的訊息) 是一個兩步驟的過程：

1. 在 L2 上進行一筆啟動交易。
2. 在 L1 上進行一筆最終確定或領取的交易。
   此交易需要在 L2 交易的[錯誤挑戰期](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)結束後進行。

### IL1StandardBridge {#il1standardbridge}

[此介面定義在此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。
此檔案包含 ETH 的事件和函式定義。
這些定義與上面在 `IL1ERC20Bridge` 中為 ERC-20 定義的非常相似。

跨鏈橋介面被分成兩個檔案，因為一些 ERC-20 代幣需要自訂處理，無法由標準跨鏈橋處理。
這樣，處理此類代幣的自訂跨鏈橋可以實作 `IL1ERC20Bridge`，而無需同時橋接 ETH。

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

此事件與 ERC-20 版本 (`ERC20DepositInitiated`) 幾乎相同，只是沒有 L1 和 L2 的代幣地址。
其他事件和函式也是如此。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * 公用函式 *
     ********************/

    /**
     * @dev 將一定數量的 ETH 存入呼叫者在 L2 上的餘額。
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev 將一定數量的 ETH 存入收款人在 L2 上的餘額。
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
     * @dev 完成從 L2 到 L1 的提款，並將資金記入收款人在 L1 ETH 代幣的餘額。
     * 由於只有 xDomainMessenger 可以呼叫此函式，因此在提款最終確定之前，它永遠不會被呼叫。
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

[此合約](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)由兩個跨鏈橋 ([L1](#the-l1-bridge-contract) 和 [L2](#the-l2-bridge-contract)) 繼承，用於向另一層傳送訊息。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* 介面匯入 */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[此介面](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) 告訴合約如何使用跨網域信使向另一層傳送訊息。
這個跨網域信使是另一個完整的系統，值得單獨寫一篇文章，我希望將來能寫。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev 執行跨網域通訊合約的輔助合約
 *
 * 使用的編譯器：由繼承合約定義
 */
contract CrossDomainEnabled {
    /*************
     * 變數 *
     *************/

    // 用於從其他網域傳送和接收訊息的信使合約。
    address public messenger;

    /***************
     * 建構函式 *
     ***************/

    /**
     * @param _messenger 當前層上 CrossDomainMessenger 的地址。
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

合約需要知道的一個參數是此層上跨網域信使的地址。
這個參數在建構函式中只設定一次，永不改變。

```solidity

    /**********************
     * 函式修飾符 *
     **********************/

    /**
     * 強制被修改的函式只能由特定的跨網域帳戶呼叫。
     * @param _sourceDomainAccount 原始網域上唯一被授權呼叫此函式的帳戶。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

跨網域訊息傳遞可由其執行所在的區塊鏈 (以太坊主網或 Optimism) 上的任何合約存取。
但我們需要每一側的跨鏈橋都_只_信任來自另一側跨鏈橋的特定訊息。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

只有來自適當的跨網域信使 (`messenger`，如下所示) 的訊息才能被信任。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

跨網域信使提供傳送訊息至另一層地址的方式是透過 [`.xDomainMessageSender()` 函式](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)。
只要它在由該訊息啟動的交易中被呼叫，它就可以提供此資訊。

我們需要確保我們收到的訊息來自另一個跨鏈橋。

```solidity

        _;
    }

    /**********************
     * 內部函式 *
     **********************/

    /**
     * 通常從儲存中取得信使。公開此函式是為了以防子合約需要覆寫。
     * @return 應該使用的跨網域信使合約的地址。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

此函式回傳跨網域信使。
我們使用函式而不是變數 `messenger`，以允許繼承自此合約的合約使用演算法來指定要使用哪個跨網域信使。

```solidity

    /**
     * 向另一個網域上的帳戶傳送訊息
     * @param _crossDomainTarget 目標網域上的預期收款人
     * @param _message 要傳送給目標的資料 (通常是傳給帶有 `onlyFromCrossDomainAccount()` 函式的 calldata)
     * @param _gasLimit 在目標網域上接收訊息的 gasLimit。
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最後，是傳送訊息到另一層的函式。

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) 是一個靜態分析器，Optimism 在每個合約上執行它以尋找漏洞和其他潛在問題。
在這種情況下，下面這一行會觸發兩個漏洞：

1. [重入事件](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性重入](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

在這種情況下，我們不擔心重入，我們知道 `getCrossDomainMessenger()` 會回傳一個可信的地址，即使 Slither 無法知道這一點。

### L1 跨鏈橋合約 {#the-l1-bridge-contract}

[此合約的原始程式碼在此](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

介面可以是其他合約的一部分，所以它們必須支援多種 Solidity 版本。
但跨鏈橋本身是我們的合約，我們可以嚴格規定它使用的 Solidity 版本。

```solidity
/* 介面匯入 */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) 和 [IL1StandardBridge](#IL1StandardBridge) 已在上面解釋。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[此介面](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 讓我們能夠建立訊息來控制 L2 上的標準跨鏈橋。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[此介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 讓我們能夠控制 ERC-20 合約。
[您可以在此處閱讀更多相關資訊](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* 函式庫匯入 */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[如上所述](#crossdomainenabled)，此合約用於層間訊息傳遞。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) 包含 L2 合約的地址，這些合約的地址永遠相同。 這包括 L2 上的標準跨鏈橋。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin 的 Address 公用程式](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。 它用於區分合約地址和屬於外部擁有帳戶 (EOA) 的地址。

請注意，這不是一個完美的解決方案，因為無法區分直接呼叫和從合約建構函式中進行的呼叫，但至少這讓我們能夠識別並防止一些常見的使用者錯誤。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 標準](https://eips.ethereum.org/EIPS/eip-20) 支援兩種合約回報失敗的方式：

1. 還原
2. 回傳 `false`

處理這兩種情況會讓我們的程式碼更複雜，所以我們改用 [OpenZeppelin 的 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)，它能確保[所有失敗都會導致還原](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)。

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH 和 ERC20 跨鏈橋是一個合約，用於儲存存入的 L1 資金和在 L2 上使用的標準代幣。
 * 它同步一個對應的 L2 跨鏈橋，通知其存款並監聽新最終確定的提款。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

這一行指定了每次使用 `IERC20` 介面時都要使用 `SafeERC20` 包裝器。

```solidity

    /********************************
     * 外部合約參考 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) 的地址。

```solidity

    // 將 L1 代幣對應到 L2 代幣，再對應到存入的 L1 代幣餘額
    mapping(address => mapping(address => uint256)) public deposits;
```

像這樣的雙重[對應](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)是定義[二維稀疏陣列](https://en.wikipedia.org/wiki/Sparse_matrix)的方式。
此資料結構中的值被識別為 `deposit[L1 token addr][L2 token addr]`。
預設值為零。
只有設定為不同值的儲存單元會被寫入儲存空間。

```solidity

    /***************
     * 建構函式 *
     ***************/

    // 此合約位於代理之後，因此建構函式參數將不會被使用。
    constructor() CrossDomainEnabled(address(0)) {}
```

為了能夠升級此合約而無需複製儲存空間中的所有變數。
為此，我們使用 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)，這是一個使用 [`delegatecall`](https://solidity-by-example.org/delegatecall/) 將呼叫轉移到另一個獨立合約的合約，該合約的地址由代理合約儲存 (當您升級時，您會告訴代理合約更改該地址)。
當您使用 `delegatecall` 時，儲存空間仍然是_呼叫_合約的儲存空間，因此所有合約狀態變數的值都不會受到影響。

這種模式的一個影響是 `delegatecall` 的_被呼叫_合約的儲存空間不會被使用，因此傳遞給它的建構函式值並不重要。
這就是我們可以向 `CrossDomainEnabled` 建構函式提供一個無意義值的原因。
這也是下面的初始化與建構函式分開的原因。

```solidity
    /******************
     * 初始化 *
     ******************/

    /**
     * @param _l1messenger 用於跨鏈通訊的 L1 信使地址。
     * @param _l2TokenBridge L2 標準跨鏈橋地址。
     */
    // slither-disable-next-line external-function
```

這個 [Slither 測試](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) 會找出未從合約程式碼中呼叫的函式，因此可以宣告為 `external` 而非 `public`。
`external` 函式的 Gas 成本可能較低，因為它們可以在 calldata 中提供參數。
宣告為 `public` 的函式必須能從合約內部存取。
合約無法修改自己的 calldata，所以參數必須在記憶體中。
當此類函式從外部被呼叫時，需要將 calldata 複製到記憶體，這會消耗 Gas。
在這種情況下，函式只被呼叫一次，所以效率低下的問題對我們不重要。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` 函式應該只被呼叫一次。
如果 L1 跨網域信使或 L2 代幣跨鏈橋的地址發生變化，我們會建立一個新的代理和一個新的跨鏈橋來呼叫它。
除非整個系統升級，否則這種情況不太可能發生，這是一個非常罕見的事件。

請注意，此函式沒有任何限制_誰_可以呼叫它的機制。
這意味著理論上，攻擊者可以等到我們部署代理和第一個版本的跨鏈橋後，然後[搶先交易 (front-run)](https://solidity-by-example.org/hacks/front-running/)，在合法使用者之前執行 `initialize` 函式。 但有兩種方法可以防止這種情況：

1. 如果合約不是直接由 EOA 部署，而是[在一個由另一個合約建立它們的交易中部署](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)，整個過程可以是原子性的，並在任何其他交易執行之前完成。
2. 如果對 `initialize` 的合法呼叫失敗，總是可以忽略新建立的代理和跨鏈橋，並建立新的。

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

    /** @dev 修飾符，要求傳送者為 EOA。此檢查可被惡意合約透過 initcode 繞過，
     * 但它能處理我們想要避免的使用者錯誤。
     */
    modifier onlyEOA() {
        // 用於阻止來自合約的存款 (避免意外遺失代幣)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

這就是我們需要 OpenZeppelin 的 `Address` 公用程式的原因。

```solidity
    /**
     * @dev 此函式可以在沒有資料的情況下被呼叫，
     * 以將一定數量的 ETH 存入呼叫者在 L2 上的餘額。
     * 由於 receive 函式不接受資料，一個保守的預設數量會被轉發到 L2。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

此函式用於測試目的。
請注意，它並未出現在介面定義中——它不是為正常使用而設計的。

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

這兩個函式是 `_initiateETHDeposit` 的包裝器，後者處理實際的 ETH 存款。

```solidity
    /**
     * @dev 透過儲存 ETH 並通知 L2 ETH 閘道存款的邏輯。
     * @param _from 從 L1 提取存款的帳戶。
     * @param _to 在 L2 上給予存款的帳戶。
     * @param _l2Gas 在 L2 上完成存款所需的 Gas 限制。
     * @param _data 可選資料，轉發到 L2。此資料僅為方便外部合約而提供。
     *        除了強制執行最大長度外，這些合約對其內容不提供任何保證。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // 為 finalizeDeposit 呼叫建構 calldata
        bytes memory message = abi.encodeWithSelector(
```

跨網域訊息的運作方式是，目標合約被呼叫時，會將訊息作為其 calldata。
Solidity 合約始終根據 [ABI 規範](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)來解釋其 calldata。
Solidity 函式 [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) 建立該 calldata。

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

這裡的訊息是使用這些參數呼叫 [`finalizeDeposit` 函式](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)：

| 參數                              | 數值                                                                                       | 意義                                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | 用於代表 L1 上 ETH (它不是 ERC-20 代幣) 的特殊值                                                            |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | 在 Optimism 上管理 ETH 的 L2 合約，`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (此合約僅供 Optimism 內部使用) |
| \_from    | \_from                                                             | 在 L1 上傳送 ETH 的地址                                                                                                 |
| \_to      | \_to                                                               | 在 L2 上接收 ETH 的地址                                                                                                 |
| 數量                              | msg.value                                                                | 傳送的 wei 數量 (已經傳送到跨鏈橋)                                                                         |
| \_data    | \_data                                                             | 附加到存款的額外資料                                                                                                       |

```solidity
        // 將 calldata 傳送到 L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

透過跨網域信使傳送訊息。

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

發出一個事件，以通知任何監聽此轉移的去中心化應用程式。

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

這兩個函式是 `_initiateERC20Deposit` 的包裝器，後者處理實際的 ERC-20 存款。

```solidity
    /**
     * @dev 透過通知 L2 存款代幣合約存款並呼叫處理程序來鎖定 L1 資金 (例如，transferFrom) 來執行存款的邏輯。
     *
     * @param _l1Token 我們正在存入的 L1 ERC20 的地址
     * @param _l2Token L1 各自在 L2 的 ERC20 地址
     * @param _from 從 L1 提取存款的帳戶
     * @param _to 在 L2 上給予存款的帳戶
     * @param _amount 要存入的 ERC20 數量。
     * @param _l2Gas 在 L2 上完成存款所需的 Gas 限制。
     * @param _data 可選資料，轉發到 L2。此資料僅為方便外部合約而提供。
     *        除了強制執行最大長度外，這些合約對其內容不提供任何保證。
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

這個函式與上面的 `_initiateETHDeposit` 相似，但有幾個重要的差異。
第一個差異是此函式接收代幣地址和要轉移的金額作為參數。
在 ETH 的情況下，對跨鏈橋的呼叫已經包含了將資產轉移到跨鏈橋帳戶 (`msg.value`)。

```solidity
        // 當存款在 L1 上啟動時，L1 跨鏈橋會將資金轉移給自己以供未來提款。safeTransferFrom 也會檢查合約是否有程式碼，
        // 所以如果 _from 是 EOA 或 address(0)，這將會失敗。
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 代幣轉移遵循與 ETH 不同的流程：

1. 使用者 (`_from`) 給予跨鏈橋一筆額度以轉移適當的代幣。
2. 使用者以代幣合約地址、金額等呼叫跨鏈橋。
3. 跨鏈橋作為存款過程的一部分，將代幣轉移 (給自己)。

第一步可能與後兩步在不同的交易中發生。
然而，搶先交易不是問題，因為呼叫 `_initiateERC20Deposit` 的兩個函式 (`depositERC20` 和 `depositERC20To`) 只會以 `msg.sender` 作為 `_from` 參數來呼叫此函式。

```solidity
        // 建構 _l2Token.finalizeDeposit(_to, _amount) 的 calldata
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // 將 calldata 傳送到 L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

將存入的代幣數量新增到 `deposits` 資料結構中。
在 L2 上可能有多個地址對應到同一個 L1 ERC-20 代幣，因此僅使用跨鏈橋的 L1 ERC-20 代幣餘額來追蹤存款是不夠的。

```solidity

        // slither-disable-next-line reentrancy-events
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

L2 跨鏈橋向 L2 跨網域信使傳送一則訊息，這會導致 L1 跨網域信使呼叫此函式 (當然，前提是在 L1 上提交了[最終確定該訊息的交易](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions))。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

確保這是一則_合法_的訊息，來自跨網域信使，並源自 L2 代幣跨鏈橋。
此函式用於從跨鏈橋提取 ETH，因此我們必須確保它只由授權的呼叫者呼叫。

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

轉移 ETH 的方法是呼叫收款人，並在 `msg.value` 中附上 wei 的數量。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

發出一個關於提款的事件。

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

這個函式與上面的 `finalizeETHWithdrawal` 相似，但針對 ERC-20 代幣做了必要的修改。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

更新 `deposits` 資料結構。

```solidity

        // 當提款在 L1 上最終確定時，L1 跨鏈橋會將資金轉移給提款人
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 臨時 - 遷移 ETH *
     *****************************/

    /**
     * @dev 將 ETH 餘額新增到帳戶。這是為了允許將 ETH
     * 從舊的閘道遷移到新的閘道。
     * 注意：這只保留一次升級，以便我們能夠從舊合約接收遷移的 ETH
     */
    function donateETH() external payable {}
}
```

之前有一個較早的跨鏈橋實作。
當我們從那個實作轉移到這個實作時，我們必須移動所有資產。
ERC-20 代幣可以直接移動。
然而，要將 ETH 轉移到一個合約，你需要該合約的批准，這正是 `donateETH` 提供給我們的。

## L2 上的 ERC-20 代幣 {#erc-20-tokens-on-l2}

要讓一個 ERC-20 代幣適用於標準跨鏈橋，它需要允許標準跨鏈橋，且_只_允許標準跨鏈橋，來鑄造代幣。
這是必要的，因為跨鏈橋需要確保在 Optimism 上流通的代幣數量等於鎖在 L1 跨鏈橋合約內的代幣數量。
如果 L2 上的代幣太多，一些使用者將無法將他們的資產橋接回 L1。
這樣一來，我們實質上會重新創造出[部分準備金銀行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)，而不是一個可信的跨鏈橋。
如果 L1 上的代幣太多，其中一些代幣將永遠被鎖在跨鏈橋合約內，因為沒有辦法在不銷毀 L2 代幣的情況下釋放它們。

### IL2StandardERC20 {#il2standarderc20}

在 L2 上使用標準跨鏈橋的每個 ERC-20 代幣都需要提供[這個介面](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)，其中包含標準跨鏈橋所需的函式和事件。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[標準 ERC-20 介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 不包含 `mint` 和 `burn` 函式。
這些方法並非 [ERC-20 標準](https://eips.ethereum.org/EIPS/eip-20)所要求的，該標準未指定建立和銷毀代幣的機制。

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) 用於指定合約提供的函式。
[您可以在此處閱讀該標準](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

此函式提供橋接到此合約的 L1 代幣的地址。
請注意，我們沒有一個反向的類似函式。
我們需要能夠橋接任何 L1 代幣，無論在其實作時是否已規劃 L2 支援。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

鑄造 (建立) 和銷毀 (摧毀) 代幣的函式和事件。
跨鏈橋應該是唯一可以執行這些函式的實體，以確保代幣數量是正確的 (等於鎖在 L1 上的代幣數量)。

### L2StandardERC20 {#L2StandardERC20}

[這是我們對 `IL2StandardERC20` 介面的實作](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。
除非您需要某種自訂邏輯，否則您應該使用這個。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 合約](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
Optimism 不相信重新發明輪子，尤其是當這個輪子經過良好審核且需要足夠可信以持有資產時。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

這是我們需要而 ERC-20 通常不需要的兩個額外設定參數。

```solidity

    /**
     * @param _l2Bridge L2 標準跨鏈橋的地址。
     * @param _l1Token 相應 L1 代幣的地址。
     * @param _name ERC20 名稱。
     * @param _symbol ERC20 符號。
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

首先呼叫我們繼承的合約的建構函式 (`ERC20(_name, _symbol)`)，然後設定我們自己的變數。

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

這就是 [ERC-165](https://eips.ethereum.org/EIPS/eip-165) 的運作方式。
每個介面都有一系列支援的函式，並被識別為這些函式的[ABI 函式選擇器](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)的[互斥或](https://en.wikipedia.org/wiki/Exclusive_or)。

L2 跨鏈橋使用 ERC-165 作為健全性檢查，以確保其傳送資產的 ERC-20 合約是一個 `IL2StandardERC20`。

**注意：** 沒有任何東西可以阻止惡意合約對 `supportsInterface` 提供虛假答案，所以這是一個健全性檢查機制，_不是_一個安全機制。

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

只有 L2 跨鏈橋被允許鑄造和銷毀資產。

`_mint` 和 `_burn` 實際上是在 [OpenZeppelin ERC-20 合約](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) 中定義的。
該合約只是沒有將它們公開，因為鑄造和銷毀代幣的條件與使用 ERC-20 的方式一樣多種多樣。

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

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 介面與我們上面看到的 [L1 對應版本](#IL1ERC20Bridge) 非常相似。
有兩個顯著的差異：

1. 在 L1 上，您啟動存款並最終確定提款。
   在這裡，您啟動提款並最終確定存款。
2. 在 L1 上，有必要區分 ETH 和 ERC-20 代幣。
   在 L2 上，我們可以對兩者使用相同的函式，因為在 Optimism 內部，ETH 餘額被當作一個地址為 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) 的 ERC-20 代幣來處理。

```solidity
/* 函式庫匯入 */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* 合約匯入 */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 標準跨鏈橋是一個與 L1 標準跨鏈橋協同工作的合約，
 * 用於在 L1 和 L2 之間進行 ETH 和 ERC20 的轉換。
 * 當此合約聽到 L1 標準跨鏈橋有存款時，它會作為新代幣的鑄造者。
 * 此合約也作為預計提款代幣的銷毀者，通知 L1 跨鏈橋釋放 L1 資金。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 外部合約參考 *
     ********************************/

    address public l1TokenBridge;
```

追蹤 L1 跨鏈橋的地址。
請注意，與 L1 的對應版本相反，我們在這裡_需要_這個變數。
L1 跨鏈橋的地址不是預先知道的。

```solidity

    /***************
     * 建構函式 *
     ***************/

    /**
     * @param _l2CrossDomainMessenger 此合約使用的跨網域信使。
     * @param _l1TokenBridge 部署在主鏈上的 L1 跨鏈橋地址。
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

這兩個函式啟動提款。
請注意，無需指定 L1 代幣地址。
L2 代幣應該會告訴我們 L1 對應的地址。

```solidity

    /**
     * @dev 透過銷毀代幣並通知 L1 代幣閘道提款來執行提款的邏輯。
     * @param _l2Token 提款啟動的 L2 代幣地址。
     * @param _from 從 L2 提取提款的帳戶。
     * @param _to 在 L1 上給予提款的帳戶。
     * @param _amount 要提取的代幣數量。
     * @param _l1Gas 未使用，但為潛在的前向相容性考量而包含。
     * @param _data 可選資料，轉發到 L1。此資料僅為方便外部合約而提供。
     *        除了強制執行最大長度外，這些合約對其內容不提供任何保證。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 當提款啟動時，我們銷毀提款人的資金以防止後續的 L2 使用
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

請注意，我們_不_依賴 `_from` 參數，而是依賴 `msg.sender`，後者更難偽造 (就我所知，是不可能的)。

```solidity

        // 建構 l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) 的 calldata
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

在 L1 上有必要區分 ETH 和 ERC-20。

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

        // 將訊息傳送到 L1 跨鏈橋
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
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
這很重要，因為此函式會呼叫 `_mint`，且可能被用來發放不受 L1 跨鏈橋所擁有代幣覆蓋的代幣。

```solidity
        // 檢查目標代幣是否合規，並驗證 L1 上存入的代幣與此處的 L2 存款代幣表示相符
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

健全性檢查：

1. 支援正確的介面
2. L2 ERC-20 合約的 L1 地址與代幣的 L1 來源相符

```solidity
        ) {
            // 當存款最終確定時，我們在 L2 上將相同數量的代幣記入帳戶。
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

如果健全性檢查通過，則最終確定存款：

1. 鑄造代幣
2. 發出適當的事件

```solidity
        } else {
            // 存入的 L2 代幣對其 L1 代幣的正確地址有異議，或者不支援正確的介面。
            // 這只應該在有惡意的 L2 代幣，或者使用者以某種方式指定了錯誤的 L2 代幣地址存入時發生。
            // 無論哪種情況，我們都在此處停止流程並建構一個提款訊息，
            // 以便使用者在某些情況下可以取回他們的資金。
            // 完全防止惡意代幣合約是不可能的，但這確實限制了使用者錯誤並減輕了某些形式的惡意合約行為。
```

如果使用者因為使用錯誤的 L2 代幣地址而犯了一個可被偵測的錯誤，我們希望取消存款並在 L1 上歸還代幣。
我們能從 L2 做到這一點的唯一方法是傳送一則需要等待錯誤挑戰期的訊息，但對使用者來說，這比永久失去代幣要好得多。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 在這裡交換了 _to 和 _from 以將存款退回給傳送者
                _from,
                _amount,
                _data
            );

            // 將訊息傳送到 L1 跨鏈橋
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 結論 {#conclusion}

標準跨鏈橋是資產轉移最靈活的機制。
然而，正因為它如此通用，它不總是最好用的機制。
特別是對於提款，大多數使用者更喜歡使用[第三方跨鏈橋](https://optimism.io/apps#bridge)，這些跨鏈橋不等待挑戰期，也不需要梅克爾證明來最終確定提款。

這些跨鏈橋通常透過在 L1 上持有資產來運作，它們會立即提供資產並收取少量費用 (通常低於標準跨鏈橋提款的 Gas 成本)。
當跨鏈橋 (或其運營者) 預期 L1 資產不足時，它會從 L2 轉移足夠的資產。 由於這些都是非常大的提款，提款成本會攤銷到大量金額上，因此所佔的百分比要小得多。

希望這篇文章能幫助您更了解第二層如何運作，以及如何撰寫清晰且安全的 Solidity 程式碼。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
