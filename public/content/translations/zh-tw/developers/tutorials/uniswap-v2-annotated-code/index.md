---
title: "尤尼斯瓦普 v2 合約逐步解說"
description: "尤尼斯瓦普 v2 合約是如何運作的？為什麼要這樣編寫？"
author: "奧里·波梅蘭茨"
tags: ["Solidity", "去中心化應用程式"]
skill: intermediate
breadcrumb: "尤尼斯瓦普 v2 逐步解說"
published: 2021-05-01
lang: zh-tw
---
## 簡介 {#introduction}

[尤尼斯瓦普 v2](https://app.uniswap.org/whitepaper.pdf) 可以在任何兩種 ERC-20 代幣之間建立兌換市場。在本文中，我們將檢視實作此協定的合約原始碼，並了解為什麼它們會這樣編寫。

### 尤尼斯瓦普有什麼作用？ {#what-does-uniswap-do}

基本上，有兩種類型的使用者：流動性提供者和交易者。

<em>流動性提供者</em>向池中提供兩種可以兌換的代幣（我們將它們稱為 **Token0** 和 **Token1**）。作為回報，他們會收到第三種代幣，代表對該池的部分所有權，稱為_流動性代幣_。

<em>交易者</em>將一種代幣發送到池中，並從流動性提供者提供的池中接收另一種代幣（例如，發送 **Token0** 並接收 **Token1**）。兌換率由池中擁有的 **Token0** 和 **Token1** 的相對數量決定。此外，該池會抽取一小部分作為流動性池的獎勵。

當流動性提供者想要取回他們的資產時，他們可以銷毀池代幣並收回他們的代幣，包括他們應得的獎勵份額。

[點擊此處查看更完整的描述](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)。

### 為什麼是 v2？為什麼不是 v3？ {#why-v2}

[尤尼斯瓦普 v3](https://app.uniswap.org/whitepaper-v3.pdf) 是一個比 v2 複雜得多的升級版本。先學習 v2 然後再學習 v3 會比較容易。

### 核心合約與周邊合約 {#contract-types}

尤尼斯瓦普 v2 分為兩個元件：核心和周邊。這種劃分使得持有資產且因此_必須_安全的的核心合約變得更簡單、更容易稽核。交易者所需的所有額外功能則可以由周邊合約提供。

## 資料與控制流程 {#flows}

這是當你執行尤尼斯瓦普 (Uniswap) 的三個主要操作時，所發生的資料與控制流程：

1. 在不同代幣之間進行兌換
2. 為市場添加流動性，並獲得交易對的 ERC-20 流動性代幣作為獎勵
3. 銷毀 ERC-20 流動性代幣，並取回交易對允許交易者兌換的 ERC-20 代幣

### 兌換 {#swap-flow}

這是最常見的流程，由交易者使用：

#### 呼叫者 {#caller}

1. 提供周邊 (periphery) 帳戶要兌換數量的授權額度。
2. 呼叫周邊合約的眾多兌換函式之一（具體呼叫哪一個，取決於是否涉及 ETH、交易者是指定要存入的代幣數量還是要取回的代幣數量等）。
   每個兌換函式都接受一個 `path`，這是一個要經過的交易所陣列。

#### 在周邊合約中 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. 確定路徑上每個交易所需要交易的數量。
4. 遍歷該路徑。對於沿途的每個交易所，它會發送輸入代幣，然後呼叫該交易所的 `swap` 函式。
   在大多數情況下，代幣的目標地址是路徑中的下一個交易對。在最後一個交易所中，目標地址則是交易者提供的地址。

#### 在核心合約中 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. 驗證核心合約沒有被欺騙，並且在兌換後能維持足夠的流動性。
6. 查看除了已知儲備之外，我們還有多少額外的代幣。該數量就是我們收到用於兌換的輸入代幣數量。
7. 將輸出代幣發送到目標地址。
8. 呼叫 `_update` 以更新儲備數量

#### 回到周邊合約 (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 執行任何必要的清理工作（例如，銷毀 WETH 代幣以取回 ETH 並發送給交易者）

### 添加流動性 {#add-liquidity-flow}

#### 呼叫者 {#caller-2}

1. 提供周邊帳戶要添加到流動性池數量的授權額度。
2. 呼叫周邊合約的其中一個 `addLiquidity` 函式。

#### 在周邊合約中 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 如有必要，建立一個新的交易對
4. 如果存在現有的交易對，則計算要添加的代幣數量。這兩種代幣的價值應該是相同的，因此新代幣與現有代幣的比例相同。
5. 檢查數量是否可接受（呼叫者可以指定一個最小數量，低於該數量他們寧願不添加流動性）
6. 呼叫核心合約。

#### 在核心合約中 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. 鑄造流動性代幣並將其發送給呼叫者
8. 呼叫 `_update` 以更新儲備數量

### 移除流動性 {#remove-liquidity-flow}

#### 呼叫者 {#caller-3}

1. 提供周邊帳戶要銷毀以換取標的代幣的流動性代幣授權額度。
2. 呼叫周邊合約的其中一個 `removeLiquidity` 函式。

#### 在周邊合約中 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. 將流動性代幣發送到交易對

#### 在核心合約中 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. 按照銷毀代幣的比例，將標的代幣發送到目標地址。例如，如果池中有 1000 個 A 代幣、500 個 B 代幣和 90 個流動性代幣，而我們收到 9 個要銷毀的代幣，我們就是銷毀了 10% 的流動性代幣，因此我們向使用者發回 100 個 A 代幣和 50 個 B 代幣。
5. 銷毀流動性代幣
6. 呼叫 `_update` 以更新儲備數量

## 核心合約 {#core-contracts}

這些是持有流動性的安全合約。

### UniswapV2Pair.sol {#uniswapv2pair}

[這個合約](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)實作了實際兌換代幣的池子。這是尤尼斯瓦普的核心功能。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

這些是合約需要知道的所有介面，原因可能是合約實作了它們（`IUniswapV2Pair` 和 `UniswapV2ERC20`），或者是因為它呼叫了實作這些介面的合約。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

這個合約繼承自 `UniswapV2ERC20`，它為流動性代幣提供了 ERC-20 功能。

```solidity
    using SafeMath  for uint;
```

[SafeMath 函式庫](https://docs.openzeppelin.com/contracts/2.x/api/math)用於避免溢位和下溢。這很重要，因為否則我們可能會遇到一個值應該是 `-1`，但卻變成 `2^256-1` 的情況。

```solidity
    using UQ112x112 for uint224;
```

流動性池合約中的許多計算都需要分數。然而，EVM 不支援分數。
尤尼斯瓦普找到的解決方案是使用 224 位元的值，其中 112 位元用於整數部分，112 位元用於小數部分。因此 `1.0` 表示為 `2^112`，`1.5` 表示為 `2^112 + 2^111`，依此類推。

有關此函式庫的更多詳細資訊，請參閱[本文檔後面的內容](#fixedpoint)。

#### 變數 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

為了避免除以零的情況，始終存在最小數量的流動性代幣（但由零號帳戶擁有）。該數字是 **MINIMUM_LIQUIDITY**，即一千。

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

這是 ERC-20 轉帳功能的 ABI 選擇器。它用於在兩個代幣帳戶中轉帳 ERC-20 代幣。

```solidity
    address public factory;
```

這是建立此流動性池的工廠合約。每個流動性池都是兩個 ERC-20 代幣之間的兌換，工廠是連接所有這些流動性池的中心點。

```solidity
    address public token0;
    address public token1;
```

這裡有此流動性池可以兌換的兩種類型 ERC-20 代幣的合約地址。

```solidity
    uint112 private reserve0;           // 使用單一儲存槽，可透過 getReserves 存取
    uint112 private reserve1;           // 使用單一儲存槽，可透過 getReserves 存取
```

流動性池為每種代幣類型擁有的儲備量。我們假設兩者代表相同的價值量，因此每個 token0 的價值為 reserve1/reserve0 個 token1。

```solidity
    uint32  private blockTimestampLast; // 使用單一儲存槽，可透過 getReserves 存取
```

發生兌換的最後一個區塊的時間戳記，用於追蹤跨時間的匯率。

以太坊合約最大的燃料費用之一是儲存，它從合約的一次呼叫持續到下一次。每個儲存單元長 256 位元。因此，三個變數 `reserve0`、`reserve1` 和 `blockTimestampLast` 的分配方式使得單個儲存值可以包含所有這三個變數（112+112+32=256）。

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

這些變數保存每種代幣的累積成本（每種代幣以另一種代幣計算）。它們可用於計算一段時間內的平均匯率。

```solidity
    uint public kLast; // reserve0 * reserve1，截至最近一次流動性事件之後的狀態
```

交易對兌換決定 token0 和 token1 之間匯率的方式是在交易期間保持兩個儲備量的乘積不變。`kLast` 就是這個值。當流動性提供者存入或提取代幣時，它會發生變化，並且由於 0.3% 的市場費用，它會略微增加。

這是一個簡單的例子。請注意，為了簡單起見，該表在小數點後只有三位數字，並且我們忽略了 0.3% 的交易費用，因此數字並不準確。

| 事件 | reserve0 | reserve1 | reserve0 \* reserve1 | 平均匯率 (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| 初始設定 | 1,000.000 | 1,000.000 | 1,000,000 | |
| 交易者 A 將 50 個 token0 兌換為 47.619 個 token1 | 1,050.000 | 952.381 | 1,000,000 | 0.952 |
| 交易者 B 將 10 個 token0 兌換為 8.984 個 token1 | 1,060.000 | 943.396 | 1,000,000 | 0.898 |
| 交易者 C 將 40 個 token0 兌換為 34.305 個 token1 | 1,100.000 | 909.090 | 1,000,000 | 0.858 |
| 交易者 D 將 100 個 token1 兌換為 109.01 個 token0 | 990.990 | 1,009.090 | 1,000,000 | 0.917 |
| 交易者 E 將 10 個 token0 兌換為 10.079 個 token1 | 1,000.990 | 999.010 | 1,000,000 | 1.008 |

隨著交易者提供更多的 token0，token1 的相對價值會增加，反之亦然，這是基於供需關係。

#### 鎖定 {#pair-lock}

```solidity
    uint private unlocked = 1;
```

有一類安全漏洞是基於[重入濫用](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)。尤尼斯瓦普需要轉帳任意的 ERC-20 代幣，這意味著呼叫可能試圖濫用呼叫它們的尤尼斯瓦普市場的 ERC-20 合約。
透過將 `unlocked` 變數作為合約的一部分，我們可以防止函式在執行時（在同一筆交易內）被呼叫。

```solidity
    modifier lock() {
```

這個函式是一個[修飾符](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)，這是一種包裝在普通函式周圍以某種方式改變其行為的函式。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

如果 `unlocked` 等於一，則將其設為零。如果它已經是零，則回滾呼叫，使其失敗。

```solidity
        _;
```

在修飾符中，`_;` 是原始的函式呼叫（帶有所有參數）。在這裡，這意味著只有在呼叫時 `unlocked` 為一的情況下，函式呼叫才會發生，並且在它執行時 `unlocked` 的值為零。

```solidity
        unlocked = 1;
    }
```

在主函式返回後，釋放鎖定。

#### 雜項函式 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

此函式為呼叫者提供兌換的當前狀態。請注意，Solidity 函式[可以返回多個值](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)。

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

這個內部函式將一定數量的 ERC-20 代幣從兌換轉帳給其他人。`SELECTOR` 指定我們正在呼叫的函式是 `transfer(address,uint)`（請參見上面的定義）。

為了避免必須為代幣函式匯入介面，我們使用其中一個 [ABI 函式](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)「手動」建立呼叫。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20 轉帳呼叫報告失敗的方式有兩種：

1. 回滾。如果對外部合約的呼叫回滾，則布林返回值為 `false`
2. 正常結束但報告失敗。在這種情況下，返回值緩衝區具有非零長度，並且當解碼為布林值時，它是 `false`

如果發生這兩種情況中的任何一種，則回滾。

#### 事件 {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

當流動性提供者存入流動性（`Mint`）或提取流動性（`Burn`）時，會觸發這兩個事件。在任何一種情況下，存入或提取的 token0 和 token1 的數量都是事件的一部分，以及呼叫我們的帳戶身分（`sender`）。在提款的情況下，事件還包括接收代幣的目標（`to`），這可能與發送者不同。

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

當交易者將一種代幣兌換為另一種代幣時，會觸發此事件。同樣，發送者和目的地可能不同。
每種代幣可以發送到兌換，也可以從兌換接收。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最後，每次添加或提取代幣時（無論原因為何），都會觸發 `Sync`，以提供最新的儲備資訊（以及因此產生的匯率）。

#### 設定函式 {#pair-setup}

這些函式應該在設定新的交易對兌換時呼叫一次。

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

建構函式確保我們將追蹤建立該交易對的工廠地址。此資訊對於 `initialize` 和工廠費用（如果存在）是必需的。

```solidity
    // 在部署時由工廠呼叫一次
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // 充分的檢查
        token0 = _token0;
        token1 = _token1;
    }
```

此函式允許工廠（且僅限工廠）指定此交易對將兌換的兩個 ERC-20 代幣。

#### 內部更新函式 {#pair-update-internal}

##### \_update {#}

```solidity
    // 更新儲備，並在每個區塊的第一次呼叫時更新價格累加器
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

每次存入或提取代幣時都會呼叫此函式。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

如果 balance0 或 balance1 (uint256) 高於 uint112(-1) (=2^112-1)（因此在轉換為 uint112 時會溢位並回繞到 0），則拒絕繼續 \_update 以防止溢位。對於可以細分為 10^18 個單位的普通代幣，這意味著每次兌換限制為每種代幣約 5.1\*10^15 個。到目前為止，這還不是問題。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // 預期會發生溢位
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

如果經過的時間不為零，這意味著我們是該區塊上的第一筆兌換交易。在這種情況下，我們需要更新成本累加器。

```solidity
            // * 永遠不會溢位，而 + 預期會發生溢位
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

每個成本累加器都會使用最新成本（另一種代幣的儲備量/此代幣的儲備量）乘以經過的時間（以秒為單位）進行更新。要獲得平均價格，您可以讀取兩個時間點的累積價格，然後除以它們之間的時間差。例如，假設發生以下事件序列：

| 事件 | reserve0 | reserve1 | 時間戳記 | 邊際匯率 (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| 初始設定 | 1,000.000 | 1,000.000 | 5,000 | 1.000 | 0 |
| 交易者 A 存入 50 個 token0 並取回 47.619 個 token1 | 1,050.000 | 952.381 | 5,020 | 0.907 | 20 |
| 交易者 B 存入 10 個 token0 並取回 8.984 個 token1 | 1,060.000 | 943.396 | 5,030 | 0.890 | 20+10\*0.907 = 29.07 |
| 交易者 C 存入 40 個 token0 並取回 34.305 個 token1 | 1,100.000 | 909.090 | 5,100 | 0.826 | 29.07+70\*0.890 = 91.37 |
| 交易者 D 存入 100 個 token1 並取回 109.01 個 token0 | 990.990 | 1,009.090 | 5,110 | 1.018 | 91.37+10\*0.826 = 99.63 |
| 交易者 E 存入 10 個 token0 並取回 10.079 個 token1 | 1,000.990 | 999.010 | 5,150 | 0.998 | 99.63+40\*1.1018 = 143.702 |

假設我們想計算 **Token0** 在時間戳記 5,030 和 5,150 之間的平均價格。`price0Cumulative` 的值差為 143.702-29.07=114.632。這是兩分鐘（120 秒）內的平均值。因此平均價格為 114.632/120 = 0.955。

這種價格計算是我們需要知道舊儲備量大小的原因。

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

最後，更新全域變數並觸發 `Sync` 事件。

##### \_mintFee {#}

```solidity
    // 如果開啟手續費，則鑄造相當於 sqrt(k) 增長量 1/6 的流動性
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

在尤尼斯瓦普 2.0 中，交易者支付 0.30% 的費用來使用市場。其中大部分費用（交易的 0.25%）始終歸流動性提供者所有。剩餘的 0.05% 可以歸流動性提供者所有，也可以作為協定費用發送到工廠指定的地址，以支付尤尼斯瓦普的開發工作。

為了減少計算（從而降低燃料成本），此費用僅在向流動性池添加或移除流動性時計算，而不是在每筆交易時計算。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

讀取工廠的費用目的地。如果為零，則沒有協定費用，也無需計算該費用。

```solidity
        uint _kLast = kLast; // 節省燃料
```

`kLast` 狀態變數位於儲存中，因此在對合約的不同呼叫之間它將具有一個值。
存取儲存比存取在合約函式呼叫結束時釋放的揮發性記憶體要昂貴得多，因此我們使用內部變數來節省燃料。

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

流動性提供者只需透過其流動性代幣的升值即可獲得分成。但協定費用需要鑄造新的流動性代幣並將其提供給 `feeTo` 地址。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

如果有新的流動性可以收取協定費用。您可以在[本文稍後](#math)看到平方根函式

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

這種複雜的費用計算在[白皮書](https://app.uniswap.org/whitepaper.pdf)第 5 頁中進行了說明。我們知道，在計算 `kLast` 和現在之間，沒有添加或移除任何流動性（因為我們在每次添加或移除流動性時，在它實際改變之前執行此計算），因此 `reserve0 * reserve1` 的任何變化都必須來自交易費用（如果沒有它們，我們將保持 `reserve0 * reserve1` 不變）。

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

使用 `UniswapV2ERC20._mint` 函式實際建立額外的流動性代幣並將它們分配給 `feeTo`。

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

如果沒有設定費用，則將 `kLast` 設為零（如果它還不是零）。在編寫此合約時，有一個[燃料退款功能](https://eips.ethereum.org/EIPS/eip-3298)，鼓勵合約透過將不需要的儲存清零來減小以太坊狀態的整體大小。
此程式碼在可能的情況下獲得該退款。

#### 外部可存取函式 {#pair-external}

請注意，雖然任何交易或合約_可以_呼叫這些函式，但它們被設計為從周邊合約呼叫。如果您直接呼叫它們，您將無法欺騙交易對兌換，但您可能會因為錯誤而損失價值。

##### mint {#}

```solidity
    // 這個低階函式應該由執行重要安全檢查的合約來呼叫
    function mint(address to) external lock returns (uint liquidity) {
```

當流動性提供者向流動性池添加流動性時，會呼叫此函式。它鑄造額外的流動性代幣作為獎勵。它應該從[周邊合約](#uniswapv2router02)呼叫，該合約在同一筆交易中添加流動性後呼叫它（這樣就沒有其他人能夠在合法所有者之前提交聲明新流動性的交易）。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 節省燃料
```

這是讀取返回多個值的 Solidity 函式結果的方法。我們丟棄最後一個返回值，即區塊時間戳記，因為我們不需要它。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

獲取當前餘額並查看每種代幣類型添加了多少。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

計算要收取的協定費用（如果有），並相應地鑄造流動性代幣。因為 `_mintFee` 的參數是舊的儲備值，所以費用僅根據由於費用引起的流動性池變化來準確計算。

```solidity
        uint _totalSupply = totalSupply; // 節省燃料，必須在這裡定義，因為 totalSupply 可能在 _mintFee 中更新
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // 永久鎖定最初的 MINIMUM_LIQUIDITY 代幣
```

如果這是第一次存款，請建立 `MINIMUM_LIQUIDITY` 個代幣並將它們發送到零地址以鎖定它們。它們永遠無法被贖回，這意味著流動性池永遠不會被完全清空（這使我們在某些地方免於除以零）。`MINIMUM_LIQUIDITY` 的值是一千，考慮到大多數 ERC-20 被細分為代幣的 10^-18 單位（就像 ETH 被劃分為 Wei 一樣），這相當於單個代幣價值的 10^-15。成本並不高。

在第一次存款時，我們不知道兩種代幣的相對價值，因此我們只需將金額相乘並取平方根，假設存款為我們提供了兩種代幣的同等價值。

我們可以相信這一點，因為提供同等價值符合存款人的利益，以避免因套利而損失價值。
假設兩種代幣的價值相同，但我們的存款人存入的 **Token1** 數量是 **Token0** 的四倍。交易者可以利用交易對兌換認為 **Token0** 更有價值這一事實，從中提取價值。

| 事件 | reserve0 | reserve1 | reserve0 \* reserve1 | 流動性池的價值 (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| 初始設定 | 8 | 32 | 256 | 40 |
| 交易者存入 8 個 **Token0** 代幣，取回 16 個 **Token1** | 16 | 16 | 256 | 32 |

如您所見，交易者額外賺取了 8 個代幣，這來自於流動性池價值的減少，損害了擁有它的存款人。

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

在隨後的每次存款中，我們已經知道兩種資產之間的匯率，並且我們期望流動性提供者在兩者中提供同等的價值。如果他們不這樣做，我們將根據他們提供的較小價值給予他們流動性代幣作為懲罰。

無論是初始存款還是後續存款，我們提供的流動性代幣數量等於 `reserve0*reserve1` 變化的平方根，並且流動性代幣的價值不會改變（除非我們收到的存款中兩種類型的價值不相等，在這種情況下，「罰款」會被分配）。這是另一個具有相同價值的兩種代幣的範例，其中包含三筆好的存款和一筆壞的存款（僅存入一種代幣類型，因此不會產生任何流動性代幣）。

| 事件 | reserve0 | reserve1 | reserve0 \* reserve1 | 流動性池價值 (reserve0 + reserve1) | 為此存款鑄造的流動性代幣 | 總流動性代幣 | 每個流動性代幣的價值 |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| 初始設定 | 8.000 | 8.000 | 64 | 16.000 | 8 | 8 | 2.000 |
| 每種類型存入四個 | 12.000 | 12.000 | 144 | 24.000 | 4 | 12 | 2.000 |
| 每種類型存入兩個 | 14.000 | 14.000 | 196 | 28.000 | 2 | 14 | 2.000 |
| 不等值存款 | 18.000 | 14.000 | 252 | 32.000 | 0 | 14 | ~2.286 |
| 套利後 | ~15.874 | ~15.874 | 252 | ~31.748 | 0 | 14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

使用 `UniswapV2ERC20._mint` 函式實際建立額外的流動性代幣並將它們提供給正確的帳戶。

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 與 reserve1 是最新的
        emit Mint(msg.sender, amount0, amount1);
    }
```

更新狀態變數（`reserve0`、`reserve1`，如果需要還有 `kLast`）並觸發適當的事件。

##### burn {#}

```solidity
    // 這個低階函式應該由執行重要安全檢查的合約來呼叫
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

當提取流動性並且需要銷毀適當的流動性代幣時，會呼叫此函式。
它也應該[從周邊帳戶](#uniswapv2router02)呼叫。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 節省燃料
        address _token0 = token0;                                // 節省燃料
        address _token1 = token1;                                // 節省燃料
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

周邊合約在呼叫之前將要銷毀的流動性轉帳給了此合約。這樣我們就知道要銷毀多少流動性，並且我們可以確保它被銷毀。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // 節省燃料，必須在這裡定義，因為 totalSupply 可能在 _mintFee 中更新
        amount0 = liquidity.mul(balance0) / _totalSupply; // 使用餘額可確保按比例分配
        amount1 = liquidity.mul(balance1) / _totalSupply; // 使用餘額可確保按比例分配
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流動性提供者收到兩種代幣的同等價值。這樣我們就不會改變匯率。

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 與 reserve1 是最新的
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn` 函式的其餘部分是上面 `mint` 函式的鏡像。

##### swap {#}

```solidity
    // 這個低階函式應該由執行重要安全檢查的合約來呼叫
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

此函式也應該從[周邊合約](#uniswapv2router02)呼叫。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 節省燃料
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1} 的作用域，避免堆疊過深錯誤
```

區域變數可以儲存在記憶體中，或者如果數量不多，可以直接儲存在堆疊上。
如果我們可以限制數量以便使用堆疊，我們將使用更少的燃料。有關更多詳細資訊，請參閱[黃皮書，即正式的以太坊規範](https://ethereum.github.io/yellowpaper/paper.pdf)，第 26 頁，方程式 298。

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // 樂觀轉帳代幣
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // 樂觀轉帳代幣
```

這種轉帳是樂觀的，因為我們在確定滿足所有條件之前進行轉帳。這在以太坊中是可以的，因為如果在呼叫的後期未滿足條件，我們將回滾它及其建立的任何更改。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

如果需要，通知接收者有關兌換的資訊。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

獲取當前餘額。周邊合約在呼叫我們進行兌換之前將代幣發送給我們。這使得合約很容易檢查它是否被欺騙，這種檢查_必須_在核心合約中發生（因為我們可以被周邊合約以外的其他實體呼叫）。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjusted 的作用域，避免堆疊過深錯誤
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

這是一項合理性檢查，以確保我們不會在兌換中損失。在任何情況下，兌換都不應減少 `reserve0*reserve1`。這也是我們確保在兌換時發送 0.3% 費用的地方；在對 K 值進行合理性檢查之前，我們將兩個餘額乘以 1000 減去金額乘以 3，這意味著在將其 K 值與當前儲備 K 值進行比較之前，從餘額中扣除 0.3%（3/1000 = 0.003 = 0.3%）。

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

更新 `reserve0` 和 `reserve1`，並在必要時更新價格累加器和時間戳記，並觸發事件。

##### 同步或提取 (Sync or Skim) {#}

實際餘額可能會與交易對兌換認為其擁有的儲備量失去同步。
沒有合約的同意，無法提取代幣，但存款則是另一回事。帳戶可以將代幣轉帳到兌換，而無需呼叫 `mint` 或 `swap`。

在這種情況下，有兩種解決方案：

- `sync`，將儲備量更新為當前餘額
- `skim`，提取額外金額。請注意，允許任何帳戶呼叫 `skim`，因為我們不知道是誰存入了代幣。此資訊在事件中觸發，但無法從區塊鏈存取事件。

```solidity
    // 強制餘額與儲備相符
    function skim(address to) external lock {
        address _token0 = token0; // 節省燃料
        address _token1 = token1; // 節省燃料
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // 強制儲備與餘額相符
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[這個合約](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)建立交易對兌換。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

這些狀態變數對於實作協定費用是必要的（請參見[白皮書](https://app.uniswap.org/whitepaper.pdf)，第 5 頁）。
`feeTo` 地址累積協定費用的流動性代幣，而 `feeToSetter` 是允許將 `feeTo` 更改為不同地址的地址。

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

這些變數追蹤交易對，即兩種代幣類型之間的兌換。

第一個 `getPair` 是一個對映，它根據其兌換的兩個 ERC-20 代幣來識別交易對兌換合約。ERC-20 代幣由實作它們的合約地址識別，因此鍵和值都是地址。要獲取允許您從 `tokenA` 轉換為 `tokenB` 的交易對兌換地址，您可以使用 `getPair[<tokenA address>][<tokenB address>]`（反之亦然）。

第二個變數 `allPairs` 是一個陣列，其中包含此工廠建立的所有交易對兌換的地址。在以太坊中，您無法迭代對映的內容，也無法獲取所有鍵的列表，因此此變數是了解此工廠管理哪些兌換的唯一方法。

注意：您無法迭代對映的所有鍵的原因是合約資料儲存_很昂貴_，因此我們使用的越少越好，並且我們更改的頻率越低越好。您可以建立[支援迭代的對映](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)，但它們需要額外的儲存空間來存放鍵列表。在大多數應用程式中，您不需要這樣做。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

當建立新的交易對兌換時，會觸發此事件。它包括代幣的地址、交易對兌換的地址以及工廠管理的兌換總數。

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

建構函式唯一做的事情就是指定 `feeToSetter`。工廠開始時沒有費用，只有 `feeSetter` 可以改變這一點。

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

此函式返回兌換對的數量。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

這是工廠的主要函式，用於在兩個 ERC-20 代幣之間建立交易對兌換。請注意，任何人都可以呼叫此函式。您不需要尤尼斯瓦普的許可即可建立新的交易對兌換。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

我們希望新兌換的地址是確定性的，因此可以提前在鏈下計算（這對於[第二層 (L2) 交易](/developers/docs/scaling/)很有用）。
為此，我們需要有一個一致的代幣地址順序，無論我們收到它們的順序如何，因此我們在這裡對它們進行排序。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // 單一檢查就足夠了
```

大型流動性池比小型流動性池更好，因為它們的價格更穩定。我們不希望每對代幣有多個流動性池。如果已經有一個兌換，則無需為同一交易對建立另一個兌換。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

要建立一個新合約，我們需要建立它的程式碼（包括建構函式和將實際合約的 EVM 位元組碼寫入記憶體的程式碼）。通常在 Solidity 中，我們只使用 `addr = new <name of contract>(<constructor parameters>)`，編譯器會為我們處理一切，但要擁有確定性的合約地址，我們需要使用 [CREATE2 操作碼](https://eips.ethereum.org/EIPS/eip-1014)。
在編寫此程式碼時，Solidity 尚未支援該操作碼，因此必須手動獲取程式碼。這不再是問題，因為 [Solidity 現在支援 CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

當 Solidity 尚未支援某個操作碼時，我們可以使用[內聯組合語言](https://docs.soliditylang.org/en/v0.8.3/assembly.html)來呼叫它。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

呼叫 `initialize` 函式以告訴新兌換它兌換哪兩種代幣。

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // 反向填充映射
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

將新的交易對資訊保存在狀態變數中，並觸發事件以通知世界新的交易對兌換。

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

這兩個函式允許 `feeSetter` 控制費用接收者（如果有），並將 `feeSetter` 更改為新地址。

### UniswapV2ERC20.sol {#uniswapv2erc20}

[這個合約](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)實作了 ERC-20 流動性代幣。它類似於 [歐本齊柏林 ERC-20 合約](/developers/tutorials/erc20-annotated-code)，因此我將只解釋不同的部分，即 `permit` 功能。

以太坊上的交易需要花費以太幣 (ETH)，這相當於真金白銀。如果您有 ERC-20 代幣但沒有 ETH，您就無法發送交易，因此您無法對它們做任何事情。避免此問題的一種解決方案是[元交易](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)。
代幣的所有者簽署一筆交易，允許其他人在鏈下提取代幣，並透過網際網路將其發送給接收者。擁有 ETH 的接收者隨後代表所有者提交許可。

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

此雜湊是[交易類型的識別碼](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)。我們在這裡唯一支援的是帶有這些參數的 `Permit`。

```solidity
    mapping(address => uint) public nonces;
```

接收者偽造數位簽章是不可行的。然而，發送相同的交易兩次是輕而易舉的（這是一種[重放攻擊](https://wikipedia.org/wiki/Replay_attack)）。為了防止這種情況，我們使用[隨機數](https://wikipedia.org/wiki/Cryptographic_nonce)。如果新的 `Permit` 的隨機數不比上一個使用的隨機數多一，我們就假設它是無效的。

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

這是檢索[鏈識別碼](https://chainid.network/)的程式碼。它使用一種稱為 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) 的 EVM 組合語言方言。請注意，在當前版本的 Yul 中，您必須使用 `chainid()`，而不是 `chainid`。

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

計算 EIP-712 的[域分隔符](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)。

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

這是實作權限的函式。它接收相關欄位以及[簽章](https://yos.io/2018/11/16/ethereum-signatures/)的三個純量值（v、r 和 s）作為參數。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

不接受截止日期之後的交易。

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` 是我們期望獲得的訊息。我們知道隨機數應該是什麼，因此我們不需要將其作為參數獲取。

以太坊簽章演算法期望獲得 256 位元進行簽署，因此我們使用 `keccak256` 雜湊函數。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

從摘要和簽章中，我們可以使用 [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) 獲取簽署它的地址。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

如果一切正常，請將此視為[一次 ERC-20 授權](https://eips.ethereum.org/EIPS/eip-20#approve)。

## 周邊合約 {#periphery-contracts}

周邊合約是尤尼斯瓦普的 API（應用程式介面）。它們可供外部呼叫，無論是來自其他合約還是去中心化應用程式 (dapp)。你可以直接呼叫核心合約，但這會比較複雜，而且如果你犯了錯，可能會損失價值。核心合約只包含確保它們不被欺騙的測試，而不包含針對其他人的合理性檢查。這些檢查都在周邊合約中，因此可以根據需要進行更新。

### UniswapV2Router01.sol {#uniswapv2router01}

[這個合約](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol)存在問題，且[不應再被使用](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。幸運的是，周邊合約是無狀態的，並且不持有任何資產，因此很容易將其棄用並建議人們改用替代方案 `UniswapV2Router02`。

### UniswapV2Router02.sol {#uniswapv2router02}

在大多數情況下，你會透過[這個合約](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)來使用尤尼斯瓦普。
你可以[在此](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)查看如何使用它。

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

其中大部分我們以前都遇到過，或者非常顯而易見。唯一的例外是 `IWETH.sol`。尤尼斯瓦普 v2 允許兌換任何一對 ERC-20 代幣，但以太幣 (ETH) 本身並不是 ERC-20 代幣。它早於該標準出現，並透過獨特的機制進行轉帳。為了在適用於 ERC-20 代幣的合約中啟用 ETH，人們發明了[包裝以太幣 (wETH)](https://weth.tkn.eth.limo/) 合約。你向這個合約發送 ETH，它會為你鑄造等量的 WETH。或者你可以銷毀 WETH，並取回 ETH。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

路由器需要知道要使用哪個工廠合約，以及對於需要 WETH 的交易，要使用哪個 WETH 合約。這些值是[不可變的](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)，這意味著它們只能在建構函式中設定。這讓使用者有信心，沒有人能夠更改它們以指向不誠實的合約。

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

這個修飾符確保有時間限制的交易（「如果可以的話，在時間 Y 之前執行 X」）不會在其時間限制之後發生。

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

建構函式只是設定不可變的狀態變數。

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // 僅接受來自 WETH 合約的 fallback ETH
    }
```

當我們從 WETH 合約中將代幣贖回為 ETH 時，會呼叫此函式。只有我們使用的 WETH 合約被授權執行此操作。

#### 增加流動性 {#add-liquidity}

這些函式將代幣增加到交易對中，從而增加流動性池。

```solidity

    // **** 新增流動性 ****
    function _addLiquidity(
```

此函式用於計算應存入交易對的 A 和 B 代幣數量。

```solidity
        address tokenA,
        address tokenB,
```

這些是 ERC-20 代幣合約的地址。

```solidity
        uint amountADesired,
        uint amountBDesired,
```

這些是流動性提供者想要存入的數量。它們也是要存入的 A 和 B 的最大數量。

```solidity
        uint amountAMin,
        uint amountBMin
```

這些是可接受的最低存入數量。如果交易無法以這些數量或更多數量進行，則將其回滾。如果你不想要此功能，只需指定為零即可。

流動性提供者通常會指定一個最小值，因為他們希望將交易限制在接近當前匯率的範圍內。如果匯率波動太大，可能意味著有改變潛在價值的新聞，而他們希望手動決定該怎麼做。

例如，想像一個匯率為一比一的情況，流動性提供者指定了以下值：

| 參數 | 值 |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

只要匯率保持在 0.9 到 1.25 之間，交易就會進行。如果匯率超出該範圍，交易就會被取消。

採取這種預防措施的原因是交易不是立即發生的，你提交它們，最終驗證者會將它們包含在一個區塊中（除非你的 Gas 價格非常低，在這種情況下，你需要提交另一個具有相同隨機數和更高 Gas 價格的交易來覆寫它）。你無法控制在提交和包含之間的這段時間內會發生什麼。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

該函式會回傳流動性提供者應存入的數量，以使比例等於當前儲備之間的比例。

```solidity
        // 如果配對尚不存在則建立配對
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

如果這個代幣對還沒有交易對，則建立它。

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

取得交易對中的當前儲備。

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

如果當前儲備為空，則這是一個新的交易對。要存入的數量應與流動性提供者想要提供的數量完全相同。

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

如果我們需要查看數量將會是多少，我們可以使用[這個函式](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)來取得最佳數量。我們希望比例與當前儲備相同。

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

如果 `amountBOptimal` 小於流動性提供者想要存入的數量，這意味著代幣 B 目前的價值高於流動性存款人的預期，因此需要較小的數量。

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

如果最佳的 B 數量大於期望的 B 數量，這意味著 B 代幣目前的價值低於流動性存款人的預期，因此需要更高的數量。然而，期望的數量是一個最大值，所以我們不能這樣做。相反，我們計算期望的 B 代幣數量所對應的最佳 A 代幣數量。

綜合起來，我們得到這張圖。假設你試圖存入一千個 A 代幣（藍線）和一千個 B 代幣（紅線）。x 軸是匯率 A/B。如果 x=1，它們的價值相等，你各存入一千個。如果 x=2，A 的價值是 B 的兩倍（每個 A 代幣可以換兩個 B 代幣），所以你存入一千個 B 代幣，但只存入 500 個 A 代幣。如果 x=0.5，情況則相反，存入一千個 A 代幣和五百個 B 代幣。

![Graph](liquidityProviderDeposit.png)

你可以直接將流動性存入核心合約（使用 [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)），但核心合約只會檢查它本身是否被欺騙，因此如果在你提交交易和執行交易之間匯率發生變化，你將面臨損失價值的風險。如果你使用周邊合約，它會計算你應該存入的數量並立即存入，因此匯率不會改變，你也不會損失任何東西。

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

此函式可以由交易呼叫以存入流動性。大多數參數與上面的 `_addLiquidity` 相同，但有兩個例外：

. `to` 是獲得新鑄造的流動性代幣的地址，以顯示流動性提供者在池中的份額
. `deadline` 是交易的時間限制

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

我們計算實際要存入的數量，然後找到流動性池的地址。為了節省燃料，我們不透過詢問工廠合約來執行此操作，而是使用函式庫函式 `pairFor`（請參閱下方函式庫部分）。

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

將正確數量的代幣從使用者轉帳到交易對中。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

作為回報，給予 `to` 地址流動性代幣，以獲得該池的部分所有權。核心合約的 `mint` 函式會查看它有多少額外的代幣（與上次流動性改變時相比），並相應地鑄造流動性。

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

當流動性提供者想要為代幣/ETH 交易對提供流動性時，會有一些差異。合約會為流動性提供者處理 ETH 的包裝。不需要指定使用者想要存入多少 ETH，因為使用者只需在交易中發送它們（數量可在 `msg.value` 中取得）。

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

為了存入 ETH，合約首先將其包裝成 WETH，然後將 WETH 轉帳到交易對中。請注意，轉帳被包裝在 `assert` 中。這意味著如果轉帳失敗，此合約呼叫也會失敗，因此包裝實際上不會發生。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // 退還零星以太幣（如果有的話）
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

使用者已經向我們發送了 ETH，因此如果有任何剩餘（因為另一種代幣的價值低於使用者的預期），我們需要發放退款。

#### 移除流動性 {#remove-liquidity}

這些函式將移除流動性並向流動性提供者還款。

```solidity
    // **** 移除流動性 ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

移除流動性最簡單的情況。流動性提供者同意接受的每種代幣都有一個最低數量，並且必須在截止日期之前發生。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // 傳送流動性至配對
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

核心合約的 `burn` 函式負責將代幣退還給使用者。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

當一個函式回傳多個值，但我們只對其中一些感興趣時，這就是我們只取得這些值的方式。就燃料而言，這比讀取一個值卻從未使用它要便宜一些。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

將數量從核心合約回傳的方式（地址較低的代幣優先）轉換為使用者期望的方式（對應於 `tokenA` 和 `tokenB`）。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

先進行轉帳然後再驗證其是否合法是可以的，因為如果不合法，我們將回滾所有的狀態變更。

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

移除 ETH 的流動性幾乎相同，不同之處在於我們收到 WETH 代幣，然後將其贖回為 ETH 以退還給流動性提供者。

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

這些函式中繼元交易，允許沒有以太幣的使用者使用[許可機制](#uniswapv2erc20)從池中提款。

```solidity

    // **** 移除流動性（支援轉帳收費代幣） ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

此函式可用於具有轉帳或儲存費用的代幣。當代幣有此類費用時，我們不能依賴 `removeLiquidity` 函式來告訴我們能拿回多少代幣，因此我們需要先提款，然後再取得餘額。

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

最後一個函式結合了儲存費用和元交易。

#### 交易 {#trade}

```solidity
    // **** 兌換 ****
    // 要求初始金額已經傳送到第一個配對
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

此函式執行向交易者公開的函式所需的內部處理。

```solidity
        for (uint i; i < path.length - 1; i++) {
```

在我寫這篇文章時，有 [388,160 個 ERC-20 代幣](https://eth.blockscout.com/tokens)。如果每個代幣對都有一個交易對，那將會有超過 1500 億個交易對。目前，整條鏈[只有該數量 0.1% 的帳戶](https://eth.blockscout.com/stats/accountsGrowth)。相反，兌換函式支援路徑的概念。交易者可以將 A 兌換為 B，將 B 兌換為 C，將 C 兌換為 D，因此不需要直接的 A-D 交易對。

這些市場上的價格往往是同步的，因為當它們不同步時，就會創造套利的機會。例如，想像有三個代幣 A、B 和 C。有三個交易對，每對一個。

1. 初始情況
2. 交易者賣出 24.695 個 A 代幣並獲得 25.305 個 B 代幣。
3. 交易者賣出 24.695 個 B 代幣以換取 25.305 個 C 代幣，保留約 0.61 個 B 代幣作為利潤。
4. 然後交易者賣出 24.695 個 C 代幣以換取 25.305 個 A 代幣，保留約 0.61 個 C 代幣作為利潤。交易者還有 0.61 個額外的 A 代幣（交易者最終獲得的 25.305 減去最初投資的 24.695）。

| 步驟 | A-B 交易對                | B-C 交易對                | A-C 交易對                |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

取得我們目前正在處理的交易對，對其進行排序（供交易對使用）並取得預期的輸出數量。

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

取得預期的輸出數量，並按照交易對期望的方式進行排序。

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

這是最後一次兌換嗎？如果是，將交易收到的代幣發送到目的地。如果不是，將其發送到下一個交易對。

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

實際呼叫交易對來兌換代幣。我們不需要回呼來得知兌換情況，因此我們不會在該欄位中發送任何位元組。

```solidity
    function swapExactTokensForTokens(
```

此函式由交易者直接使用，以將一種代幣兌換為另一種代幣。

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

此參數包含 ERC-20 合約的地址。如上所述，這是一個陣列，因為你可能需要經過幾個交易對才能從你擁有的資產轉換為你想要的資產。

Solidity 中的函式參數可以儲存在 `memory` 或 `calldata` 中。如果該函式是合約的進入點，由使用者（使用交易）或從不同的合約直接呼叫，那麼參數的值可以直接從呼叫資料中取得。如果該函式是在內部呼叫的，如上面的 `_swap`，那麼參數必須儲存在 `memory` 中。從被呼叫合約的角度來看，`calldata` 是唯讀的。

對於純量型別（如 `uint` 或 `address`），編譯器會為我們處理儲存的選擇，但對於更長且更昂貴的陣列，我們需要指定要使用的儲存類型。

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

回傳值總是回傳在記憶體中。

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

計算每次兌換中要購買的數量。如果結果小於交易者願意接受的最小值，則回滾交易。

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

最後，將初始的 ERC-20 代幣轉帳到第一個交易對的帳戶並呼叫 `_swap`。這一切都發生在同一筆交易中，因此交易對知道任何意外的代幣都是此轉帳的一部分。

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

前一個函式 `swapTokensForTokens` 允許交易者指定他願意給予的確切輸入代幣數量，以及他願意作為回報接收的最小輸出代幣數量。此函式執行反向兌換，它讓交易者指定他想要的輸出代幣數量，以及他願意為此支付的最大輸入代幣數量。

在這兩種情況下，交易者必須首先給予此周邊合約授權額度，以允許其轉帳這些代幣。

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // 退還零星以太幣（如果有的話）
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

這四個變體都涉及 ETH 和代幣之間的交易。唯一的區別是，我們要么從交易者那裡收到 ETH 並用它來鑄造 WETH，要么從路徑中的最後一次兌換收到 WETH 並將其銷毀，然後將產生的 ETH 發送回給交易者。

```solidity
    // **** 兌換（支援轉帳收費代幣） ****
    // 要求初始金額已經傳送到第一個配對
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

這是用於兌換具有轉帳或儲存費用的代幣的內部函式，以解決（[這個問題](https://github.com/Uniswap/uniswap-interface/issues/835)）。

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // 限制作用域以避免堆疊過深錯誤
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

由於轉帳費用，我們不能依賴 `getAmountsOut` 函式來告訴我們每次轉帳能獲得多少（就像我們在呼叫原始的 `_swap` 之前所做的那樣）。相反，我們必須先轉帳，然後看看我們拿回了多少代幣。

注意：理論上我們可以直接使用此函式而不是 `_swap`，但在某些情況下（例如，如果轉帳最終因為最後沒有足夠的數量來滿足所需的最小值而被回滾），這最終會花費更多的燃料。收取轉帳費用的代幣非常罕見，因此雖然我們需要適應它們，但沒有必要讓所有兌換都假設它們至少會經過其中一個。

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

這些是與普通代幣相同的變體，但它們改為呼叫 `_swapSupportingFeeOnTransferTokens`。

```solidity
    // **** 函式庫函式 ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

這些函式只是呼叫 [UniswapV2Library 函式](#uniswapv2library)的代理。

### UniswapV2Migrator.sol {#uniswapv2migrator}

此合約用於將交易對從舊的 v1 遷移到 v2。既然它們已經被遷移，它就不再相關了。

## 函式庫 {#libraries}

[SafeMath 函式庫](https://docs.openzeppelin.com/contracts/2.x/api/math)已有完善的說明文件，因此不需要在此贅述。

### Math {#math}

這個函式庫包含了一些在 Solidity 程式碼中通常不需要的數學函數，因此它們不屬於該語言的一部分。

```solidity
pragma solidity =0.5.16;

// 用於執行各種數學運算的函式庫

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // 巴比倫方法 (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

從 x 開始作為高於平方根的估計值（這就是我們需要將 1-3 視為特殊情況的原因）。

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

取得更接近的估計值，即前一個估計值與我們要找平方根的數字除以前一個估計值的平均值。重複此步驟，直到新的估計值不低於現有估計值為止。如需更多詳細資訊，[請參閱此處](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)。

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

我們永遠不需要零的平方根。一、二和三的平方根大約是一（我們使用整數，因此忽略小數部分）。

```solidity
        }
    }
}
```

### 定點小數 (UQ112x112) {#fixedpoint}

這個函式庫處理小數，這通常不屬於以太坊算術的一部分。它透過將數字 _x_ 編碼為 _x\*2^112_ 來實現這一點。這讓我們可以不加修改地使用原始的加法和減法操作碼。

```solidity
pragma solidity =0.5.16;

// 用於處理二進位定點數的函式庫 (https://wikipedia.org/wiki/Q_(number_format))

// 範圍：[0, 2**112 - 1]
// 解析度：1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` 是一的編碼。

```solidity
    // 將 uint112 編碼為 UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // 永遠不會溢位
    }
```

因為 y 是 `uint112`，它的最大值為 2^112-1。該數字仍然可以編碼為 `UQ112x112`。

```solidity
    // 將 UQ112x112 除以 uint112，回傳 UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

如果我們將兩個 `UQ112x112` 值相除，結果將不再乘以 2^112。因此，我們改用整數作為分母。我們本來需要使用類似的技巧來進行乘法，但我們不需要對 `UQ112x112` 值進行乘法運算。

### UniswapV2Library {#uniswapv2library}

這個函式庫僅供周邊合約使用

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // 回傳排序後的代幣地址，用於處理按此順序排序的配對回傳值
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

按地址對兩個代幣進行排序，這樣我們就能夠取得它們的交易對地址。這是必要的，因為否則我們會有兩種可能性，一種是參數 A,B，另一種是參數 B,A，這會導致產生兩個交易對而不是一個。

```solidity
    // 在不進行任何外部呼叫的情況下計算配對的 CREATE2 地址
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // 初始程式碼雜湊
            ))));
    }
```

這個函數計算兩個代幣的交易對地址。這個合約是使用 [CREATE2 操作碼](https://eips.ethereum.org/EIPS/eip-1014)建立的，因此如果我們知道它使用的參數，我們就可以使用相同的演算法來計算地址。這比向工廠合約查詢要便宜得多，而且

```solidity
    // 獲取並排序配對的儲備
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

這個函數回傳交易對所擁有的兩個代幣的儲備量。請注意，它可以接收任意順序的代幣，並對它們進行排序以供內部使用。

```solidity
    // 給定某個數量的資產與配對儲備，回傳等量的另一種資產
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

這個函數提供在不涉及手續費的情況下，你用代幣 A 可以換得的代幣 B 數量。這個計算考慮到了轉帳會改變匯率。

```solidity
    // 給定資產的輸入數量與配對儲備，回傳另一種資產的最大輸出數量
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

如果使用交易對沒有手續費，上面的 `quote` 函數運作得非常好。然而，如果有 0.3% 的兌換手續費，你實際獲得的數量會較低。這個函數計算扣除兌換手續費後的數量。

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity 原生不處理小數，因此我們不能直接將數量乘以 0.997。相反地，我們將分子乘以 997，分母乘以 1000，以達到相同的效果。

```solidity
    // 給定資產的輸出數量與配對儲備，回傳另一種資產所需的輸入數量
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

這個函數的作用大致相同，但它是取得輸出數量並提供輸入數量。

```solidity

    // 對任意數量的配對執行連鎖的 getAmountOut 計算
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // 對任意數量的配對執行連鎖的 getAmountIn 計算
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

這兩個函數負責在需要經過多個交易對時識別數值。

### Transfer Helper {#transfer-helper}

[這個函式庫](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol)在 ERC-20 和以太坊轉帳周圍加入了成功檢查，以相同的方式處理回滾和回傳 `false` 值的情況。

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// 用於與 ERC20 代幣互動以及傳送 ETH 的輔助方法，這些方法不會一致地回傳 true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

我們可以透過以下兩種方式之一呼叫不同的合約：

- 使用介面定義來建立函數呼叫
- 「手動」使用[應用程式二進位介面 (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) 來建立呼叫。這就是程式碼作者決定採用的方式。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

為了與 ERC-20 標準建立之前的代幣保持向後相容性，ERC-20 呼叫可能會因為回滾而失敗（在這種情況下 `success` 為 `false`），或者成功並回傳 `false` 值（在這種情況下會有輸出資料，如果你將其解碼為布林值，你會得到 `false`）。

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

這個函數實作了 [ERC-20 的轉帳功能](https://eips.ethereum.org/EIPS/eip-20#transfer)，允許一個帳戶花費由另一個帳戶提供的授權額度。

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

這個函數實作了 [ERC-20 的 transferFrom 功能](https://eips.ethereum.org/EIPS/eip-20#transferfrom)，允許一個帳戶花費由另一個帳戶提供的授權額度。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

這個函數將以太幣轉帳到一個帳戶。任何對不同合約的呼叫都可以嘗試發送以太幣。因為我們不需要實際呼叫任何函數，所以我們在呼叫時不發送任何資料。

## 結論 {#conclusion}

這是一篇長達約 50 頁的長篇文章。如果您讀到了這裡，恭喜您！希望現在您已經了解編寫實際應用程式（相對於簡短的範例程式）時的注意事項，並且能夠更好地為您自己的使用案例編寫合約。

現在，去編寫一些有用的東西，讓我們大開眼界吧。

[點擊這裡查看我更多的作品](https://cryptodocguy.pro/)。