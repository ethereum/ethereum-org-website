---
title: "Uniswap-v2 合約逐步詳解"
description: "Uniswap-v2 合約如何運作？ 為何要這樣編寫？"
author: "作者：Ori Pomerantz"
tags: [ "穩固" ]
skill: intermediate
published: 2021-05-01
lang: zh-tw
---

## 介紹 {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) 可在任何兩種 ERC-20 代幣之間建立交易市場。 在本文中，我們將探討實作此協定的合約原始碼，並了解其編寫方式。

### Uniswap 的功能是什麼？ {#what-does-uniswap-do}

基本上有兩種類型使用者：流動性提供者和交易者。

_流動性提供者_為資金池提供兩種可交易的代幣（我們稱之為 **Token0** 和 **Token1**）。 作為回報，他們會收到第三種代幣，稱為_流動性代幣_，代表資金池的部分所有權。

_交易者_將一種代幣發送到資金池，並從流動性提供者提供的資金池中接收另一種代幣（例如，發送 **Token0** 並接收 **Token1**）。 匯率由資金池中 **Token0** 和 **Token1** 的相對數量決定。 此外，資金池會抽取一小部分百分比作為對流動性資金池的獎勵。

當流動性提供者想取回他們的資產時，他們可以銷毀資金池代幣，並取回他們的代幣，包括他們應得的獎勵份額。

[按此處查看更完整的說明](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)。

### 為何是 v2？ 為何不是 v3？ {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) 是一項升級，比 v2 複雜得多。 先學習 v2，再進階到 v3 會比較容易。

### 核心合約與周邊合約 {#contract-types}

Uniswap v2 分為兩個部分：核心與周邊。 這種劃分讓持有資產且_必須_安全的核心合約變得更簡單、更容易審核。 交易者需要的所有額外功能則可由周邊合約提供。

## 資料與控制流程 {#flows}

以下是執行 Uniswap 三個主要動作時的資料與控制流程：

1. 在不同代幣之間交換
2. 為市場增加流動性，並獲得成對交易的 ERC-20 流動性代幣作為獎勵
3. 銷毀 ERC-20 流動性代幣，並取回成對交易所允許交易者交易的 ERC-20 代幣

### 交換 {#swap-flow}

這是交易者最常使用的流程：

#### 呼叫者 {#caller}

1. 為周邊帳戶提供一筆待交換數量的額度。
2. 呼叫周邊合約的眾多交換函式之一（呼叫哪個函式取決於是否涉及 ETH、交易者是指定存入的代幣數量還是取回的代幣數量等）。
   每個交換函式都接受一個 `path`，這是一個要經過的交易所陣列。

#### 在周邊合約 (UniswapV2Router02.sol) 中 {#in-the-periphery-contract-uniswapv2router02-sol}

3. 確定路徑上每個交易所需要交易的數量。
4. 遍歷路徑。 對於路徑上的每個交易所，它會發送輸入代幣，然後呼叫交易所的 `swap` 函式。
   在大多數情況下，代幣的目標地址是路徑中的下一個成對交易所。 在最終的交易所，目標地址是交易者提供的地址。

#### 在核心合約 (UniswapV2Pair.sol) 中 {#in-the-core-contract-uniswapv2pairsol-2}

5. 驗證核心合約未被欺騙，且在交換後能維持足夠的流動性。
6. 查看除了已知的儲備金外，我們還擁有多少額外的代幣。 該數量是我們收到用於交換的輸入代幣數量。
7. 將輸出代幣發送到目標地址。
8. 呼叫 `_update` 來更新儲備金數量

#### 回到周邊合約 (UniswapV2Router02.sol) 中 {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 執行任何必要的清理工作（例如，銷毀 WETH 代幣以取回 ETH 並發送給交易者）

### 增加流動性 {#add-liquidity-flow}

#### 呼叫者 {#caller-2}

1. 為周邊帳戶提供一筆要添加到流動性資金池的額度。
2. 呼叫周邊合約的 `addLiquidity` 函式之一。

#### 在周邊合約 (UniswapV2Router02.sol) 中 {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 如有需要，建立一個新的成對交易所
4. 如果已有成對交易所，計算要添加的代幣數量。 這兩種代幣的價值理應相同，因此新代幣與現有代幣的比例應保持一致。
5. 檢查数量是否可接受（呼叫者可以指定一个最低数量，低于此数量他们宁愿不增加流动性）
6. 呼叫核心合約。

#### 在核心合約 (UniswapV2Pair.sol) 中 {#in-the-core-contract-uniswapv2pairsol-2}

7. 鑄造流動性代幣並將其發送給呼叫者
8. 呼叫 `_update` 來更新儲備金數量

### 移除流動性 {#remove-liquidity-flow}

#### 呼叫者 {#caller-3}

1. 為周邊帳戶提供一筆流動性代幣額度，以便銷毀來換取基礎代幣。
2. 呼叫周邊合約的 `removeLiquidity` 函式之一。

#### 在周邊合約 (UniswapV2Router02.sol) 中 {#in-the-periphery-contract-uniswapv2router02sol-3}

3. 將流動性代幣發送到成對交易所

#### 在核心合約 (UniswapV2Pair.sol) 中 {#in-the-core-contract-uniswapv2pairsol-3}

4. 根據銷毀的代幣比例，將基礎代幣發送到目標地址。 例如，如果資金池中有 1000 個 A 代幣、500 個 B 代幣和 90 個流動性代幣，而我們收到 9 個要銷毀的代幣，這表示我們正在銷毀 10% 的流動性代幣，因此我們將返還給使用者 100 個 A 代幣和 50 個 B 代幣。
5. 銷毀流動性代幣
6. 呼叫 `_update` 來更新儲備金數量

## 核心合約 {#core-contracts}

這些是持有流動性的安全合約。

### UniswapV2Pair.sol {#UniswapV2Pair}

[此合約](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) 實作了交換代幣的實際資金池。 這是 Uniswap 的核心功能。

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

這些是合約需要了解的所有介面，無論是因為合約實作了它們（`IUniswapV2Pair` 和 `UniswapV2ERC20`），還是因為它呼叫了實作這些介面的合約。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

此合約繼承自 `UniswapV2ERC20`，後者為流動性代幣提供 ERC-20 函式。

```solidity
    using SafeMath  for uint;
```

[SafeMath 函式庫](https://docs.openzeppelin.com/contracts/2.x/api/math) 用於避免溢位和下溢。 這點很重要，因為否則我們可能會遇到一個情況，其中一個值應該是 `-1`，但卻變成了 `2^256-1`。

```solidity
    using UQ112x112 for uint224;
```

資金池合約中的許多計算都需要分數。 然而，以太坊虛擬機 (EVM) 不支援分數。
Uniswap 找到的解決方案是使用 224 位元的值，其中 112 位元用於整數部分，112 位元用於分數部分。 因此，`1.0` 表示為 `2^112`，`1.5` 表示為 `2^112 + 2^111`，依此類推。

關於此函式庫的更多詳細資訊，請參閱[文件稍後部分](#FixedPoint)。

#### 變數 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

為避免除以零的情況，存在一個最小數量的流動性代幣，它們總是存在（但由零號帳戶擁有）。 該數字是 **MINIMUM_LIQUIDITY**，即一千。

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

這是 ERC-20 轉帳函式的 ABI 選擇器。 它用於在兩個代幣帳戶中轉移 ERC-20 代幣。

```solidity
    address public factory;
```

這是建立此資金池的工廠合約。 每個資金池都是兩種 ERC-20 代幣之間的交易所，工廠是連接所有這些資金池的中心點。

```solidity
    address public token0;
    address public token1;
```

這些是此資金池可交換的兩種 ERC-20 代幣的合約地址。

```solidity
    uint112 private reserve0;           // 使用單一儲存槽，可透過 getReserves 存取
    uint112 private reserve1;           // 使用單一儲存槽，可透過 getReserves 存取
```

資金池為每種代幣類型所擁有的儲備金。 我們假設兩者代表相同的價值，因此每個 token0 的價值相當於 reserve1/reserve0 個 token1。

```solidity
    uint32  private blockTimestampLast; // 使用單一儲存槽，可透過 getReserves 存取
```

發生交易的最後一個區塊的時間戳，用於追蹤一段時間內的匯率。

以太坊合約最大的 gas 開銷之一是儲存，它會從一次合約呼叫持續到下一次。 每個儲存單元長度為 256 位元。 因此，三個變數 `reserve0`、`reserve1` 和 `blockTimestampLast` 的分配方式使得單一儲存值可以包含所有這三個變數（112+112+32=256）。

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

這些變數持有每種代幣的累計成本（每種代幣的成本都以另一種代幣計價）。 它們可用於計算一段時間內的平均匯率。

```solidity
    uint public kLast; // reserve0 * reserve1，截至最近一次流動性事件發生後
```

成對交易所決定 token0 和 token1 之間匯率的方式，是在交易過程中保持兩個儲備金的乘積不變。 `kLast` 就是這個值。 當流動性提供者存入或提取代幣時，它會發生變化，並因 0.3% 的市場費用而略有增加。

以下是一個簡單的範例。 請注意，為簡化起見，表格中小數點後只有三位數，並且我們忽略了 0.3% 的交易費用，因此數字並不精確。

| 事件                                                      |                     儲備金 0 |                     儲備金 1 | 儲備金 0 \* 儲備金 1 | 平均匯率 (token1 / token0) |
| ------------------------------------------------------- | ------------------------: | ------------------------: | -------------: | ----------------------------------------- |
| 初始設定                                                    | 1,000.000 | 1,000.000 |      1,000,000 |                                           |
| 交易者 A 用 50 個 token0 交換 47.619 個 token1  | 1,050.000 |   952.381 |      1,000,000 | 0.952                     |
| 交易者 B 用 10 個 token0 交換 8.984 個 token1   | 1,060.000 |   943.396 |      1,000,000 | 0.898                     |
| 交易者 C 用 40 個 token0 交換 34.305 個 token1  | 1,100.000 |   909.090 |      1,000,000 | 0.858                     |
| 交易者 D 用 100 個 token1 交換 109.01 個 token0 |   990.990 | 1,009.090 |      1,000,000 | 0.917                     |
| 交易者 E 用 10 個 token0 交換 10.079 個 token1  | 1,000.990 |   999.010 |      1,000,000 | 1.008                     |

隨著交易者提供更多的 token0，token1 的相對價值會增加，反之亦然，這取決於供需關係。

#### 鎖定 {#pair-lock}

```solidity
    uint private unlocked = 1;
```

有一類安全漏洞是基於[重入攻擊濫用](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)。 Uniswap 需要轉移任意的 ERC-20 代幣，這意味著要呼叫可能會試圖濫用呼叫它們的 Uniswap 市場的 ERC-20 合約。
透過在合約中包含一個 `unlocked` 變數，我們可以防止函式在執行時（在同一筆交易中）被再次呼叫。

```solidity
    modifier lock() {
```

這個函式是一個[修飾器](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)，它是一個包裝在普通函式周圍以某種方式改變其行為的函式。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

如果 `unlocked` 等於一，將其設為零。 如果它已經是零，則還原呼叫，使其失敗。

```solidity
        _;
```

在修飾器中，`_;` 是原始的函式呼叫（包含所有參數）。 在這裡，這表示只有當 `unlocked` 在被呼叫時為一時，函式呼叫才會發生，並且在函式執行期間，`unlocked` 的值為零。

```solidity
        unlocked = 1;
    }
```

主函式返回後，釋放鎖。

#### 雜項 函式 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

此函式向呼叫者提供交易所的目前狀態。 請注意，Solidity 函式[可以返回多個值](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)。

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

這個內部函式將一定數量的 ERC20 代幣從交易所轉移給其他人。 `SELECTOR` 指定我們正在呼叫的函式是 `transfer(address,uint)`（請參閱上面的定義）。

為避免必須為代幣函式匯入介面，我們使用[ABI 函式](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)之一來「手動」建立呼叫。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20 轉帳呼叫可以透過兩種方式報告失敗：

1. 還原。 如果對外部合約的呼叫還原，則布林傳回值為 `false`
2. 正常結束但報告失敗。 在這種情況下，傳回值緩衝區的長度不為零，並且當解碼為布林值時為 `false`

如果發生這兩種情況中的任何一種，則還原。

#### 事件 {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

當流動性提供者存入流動性（`Mint`）或提取流動性（`Burn`）時，會發出這兩個事件。 無論哪種情況，存入或提取的 token0 和 token1 的數量都是事件的一部分，呼叫我們的帳戶身分（`sender`）也是。 在提取的情況下，事件還包括接收代幣的目標（`to`），該目標可能與發送者不同。

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

當交易者將一種代幣交換為另一種代幣時，會發出此事件。 同樣，發送者和目標地址可能不同。
每種代幣既可以發送到交易所，也可以從交易所接收。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最後，無論原因為何，每當代幣被添加或提取時，都會發出 `Sync` 事件，以提供最新的儲備金資訊（以及匯率）。

#### 設定函式 {#pair-setup}

這些函式應在新成對交易所設定時呼叫一次。

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

建構函式確保我們會追蹤建立該交易對的工廠地址。 `initialize` 和工廠費用（如果存在）都需要此資訊

```solidity
    // 在部署時由工廠呼叫一次
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // 充分的檢查
        token0 = _token0;
        token1 = _token1;
    }
```

此函式允許工廠（且僅限工廠）指定此交易對將交換的兩種 ERC-20 代幣。

#### 內部更新函式 {#pair-update-internal}

##### \_update

```solidity
    // 更新儲備金，以及在每個區塊的第一次呼叫時更新價格累加器
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

每當代幣存入或提取時，都會呼叫此函式。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

如果 balance0 或 balance1 (uint256) 高於 uint112(-1) (=2^112-1)（因此在轉換為 uint112 時會溢位並回繞到 0），則拒絕繼續執行 \_update 以防止溢位。 對於可以細分為 10^18 個單位的普通代幣，這意味著每個交易所每種代幣的上限約為 5.1\*10^15。 到目前為止，這還不是問題。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // 期望溢位
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

如果經過的時間不為零，表示這是此區塊上的第一筆交易。 在這種情況下，我們需要更新成本累加器。

```solidity
            // * 永不溢位，而 + 期望溢位
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

每個成本累加器都會以最新的成本（另一種代幣的儲備金/此種代幣的儲備金）乘以經過的時間（以秒為單位）進行更新。 要獲得平均價格，您需要讀取兩個時間點的累計價格，然後除以它們之間的時間差。 例如，假設有以下一系列事件：

| 事件                                                       |                     儲備金 0 |                     儲備金 1 | 時間戳   | 邊際匯率 (儲備金 1 / 儲備金 0) |                                                       price0CumulativeLast |
| -------------------------------------------------------- | ------------------------: | ------------------------: | ----- | --------------------------------------: | -------------------------------------------------------------------------: |
| 初始設定                                                     | 1,000.000 | 1,000.000 | 5,000 |                   1.000 |                                                                          0 |
| 交易者 A 存入 50 個 token0，取回 47.619 個 token1  | 1,050.000 |   952.381 | 5,020 |                   0.907 |                                                                         20 |
| 交易者 B 存入 10 個 token0，取回 8.984 個 token1   | 1,060.000 |   943.396 | 5,030 |                   0.890 |                       20+10\*0.907 = 29.07 |
| 交易者 C 存入 40 個 token0，取回 34.305 個 token1  | 1,100.000 |   909.090 | 5,100 |                   0.826 |    29.07+70\*0.890 = 91.37 |
| 交易者 D 存入 100 個 token1，取回 109.01 個 token0 |   990.990 | 1,009.090 | 5,110 |                   1.018 |    91.37+10\*0.826 = 99.63 |
| 交易者 E 存入 10 個 token0，取回 10.079 個 token1  | 1,000.990 |   999.010 | 5,150 |                   0.998 | 99.63+40\*1.1018 = 143.702 |

假設我們想要計算在時間戳 5,030 和 5,150 之間 **Token0** 的平均價格。 `price0Cumulative` 值的差異為 143.702-29.07=114.632。 這是兩分鐘（120 秒）內的平均值。 因此平均價格為 114.632/120 = 0.955。

這個價格計算是我們需要知道舊儲備金規模的原因。

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

最後，更新全域變數並發出一個 `Sync` 事件。

##### \_mintFee

```solidity
    // 如果費用開啟，則鑄造相當於 sqrt(k) 增長量 1/6 的流動性
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

在 Uniswap 2.0 中，交易者需支付 0.30% 的費用來使用市場。 大部分費用（交易額的 0.25%）總是支付給流動性提供者。 剩餘的 0.05% 可以支付給流動性提供者，或支付給工廠指定的地址作為協定費用，以回報 Uniswap 的開發貢獻。

為減少計算（從而降低 gas 成本），此費用僅在向資金池添加或移除流動性時計算，而不是在每筆交易中計算。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

讀取工廠的費用目標地址。 如果為零，則沒有協定費用，也無需計算該費用。

```solidity
        uint _kLast = kLast; // 節省 gas
```

`kLast` 狀態變數位於儲存空間中，因此在對合約的不同呼叫之間會有一個值。
存取儲存空間的成本遠高於存取在合約函式呼叫結束時釋放的揮發性記憶體，因此我們使用內部變數來節省 gas。

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

流動性提供者僅透過其流動性代幣的增值即可獲得分潤。 但協定費用需要鑄造新的流動性代幣並提供給 `feeTo` 地址。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

如果有新的流動性可以收取協定費用。 您可以在[本文稍後](#Math)看到平方根函式

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

這個複雜的費用計算在[白皮書](https://app.uniswap.org/whitepaper.pdf)第 5 頁有解釋。 我們知道在 `kLast` 計算時與現在之間，沒有添加或移除流動性（因為我們在每次添加或移除流動性時，在它實際改變之前都會執行此計算），因此 `reserve0 * reserve1` 的任何變化都必須來自交易費用（若沒有交易費用，我們會保持 `reserve0 * reserve1` 不變）。

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

使用 `UniswapV2ERC20._mint` 函式來實際建立額外的流動性代幣，並將它們分配給 `feeTo`。

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

如果沒有費用，則將 `kLast` 設為零（如果它還不是零的話）。 在撰寫此合約時，有一個[gas 退款功能](https://eips.ethereum.org/EIPS/eip-3298)，鼓勵合約透過清零不需要的儲存空間來減少以太坊狀態的整體大小。
此程式碼在可能的情況下會獲得該退款。

#### 外部可存取函式 {#pair-external}

請注意，雖然任何交易或合約_都_可以呼叫這些函式，但它們是設計為從周邊合約呼叫的。 如果您直接呼叫它們，您將無法欺騙成對交易所，但可能會因錯誤而損失價值。

##### mint

```solidity
    // 這個低階函式應由執行重要安全檢查的合約呼叫
    function mint(address to) external lock returns (uint liquidity) {
```

當流動性提供者向資金池增加流動性時，會呼叫此函式。 它會鑄造額外的流動性代幣作為獎勵。 它應由[周邊合約](#UniswapV2Router02)呼叫，該合約在同一筆交易中增加流動性後呼叫它（這樣就沒有其他人能在合法擁有者之前提交交易來領取新的流動性）。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 節省 gas
```

這是讀取返回多個值的 Solidity 函式結果的方法。 我們捨棄最後的傳回值，即區塊時間戳，因為我們不需要它。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

取得目前的餘額，並查看每種代幣類型增加了多少。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

計算要收取的協定費用（如果有的話），並相應地鑄造流動性代幣。 由於 `_mintFee` 的參數是舊的儲備金值，費用僅根據因費用而產生的資金池變化來精確計算。

```solidity
        uint _totalSupply = totalSupply; // 節省 gas，必須在此處定義，因為 totalSupply 可能在 _mintFee 中更新
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // 永久鎖定最初的 MINIMUM_LIQUIDITY 代幣
```

如果這是第一筆存款，則建立 `MINIMUM_LIQUIDITY` 代幣並將它們發送到零地址以鎖定它們。 它們永遠無法被贖回，這意味著資金池永遠不會被完全清空（這使我們在某些地方避免了除以零的情況）。 `MINIMUM_LIQUIDITY` 的值是一千，考慮到大多數 ERC-20 代幣被細分為 10^-18 個單位的代幣，就像 ETH 被分為 wei 一樣，這相當於單個代幣價值的 10^-15。 成本不高。

在首次存款時，我們不知道兩種代幣的相對價值，所以我們只是將數量相乘並取平方根，假設存款為我們提供了兩種價值相等的代幣。

我們可以相信這一點，因為提供相等價值符合存款人的利益，可以避免因套利而損失價值。
假設兩種代幣的價值相同，但我們的存款人存入的 **Token1** 數量是 **Token0** 的四倍。 交易者可以利用成對交易所認為 **Token0** 更有價值這一事實從中提取價值。

| 事件                                         | 儲備金 0 | 儲備金 1 | 儲備金 0 \* 儲備金 1 | 資金池價值 (儲備金 0 + 儲備金 1) |
| ------------------------------------------ | ----: | ----: | -------------: | ---------------------------------------: |
| 初始設定                                       |     8 |    32 |            256 |                                       40 |
| 交易者存入 8 個 **Token0** 代幣，取回 16 個 **Token1** |    16 |    16 |            256 |                                       32 |

如您所見，交易者額外賺取了 8 個代幣，這些代幣來自資金池價值的減少，損害了擁有該資金池的存款人的利益。

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

對於隨後的每筆存款，我們已經知道兩種資產之間的匯率，我們期望流動性提供者提供兩種價值相等的資產。 如果他們不這樣做，我們會根據他們提供的較低價值給予他們流動性代幣作為懲罰。

無論是初始存款還是後續存款，我們提供的流動性代幣數量等於 `reserve0*reserve1` 變化的平方根，並且流動性代幣的價值不變（除非我們收到一筆兩種代幣價值不等的存款，在這種情況下，「罰款」將被分配）。 這是另一個例子，其中兩種代幣價值相同，有三筆好的存款和一筆壞的存款（只存入一種代幣類型，因此不產生任何流動性代幣）。

| 事件       |                                   儲備金 0 |                                   儲備金 1 | 儲備金 0 \* 儲備金 1 | 資金池價值 (儲備金 0 + 儲備金 1) | 為此存款鑄造的流動性代幣 | 總流動性代幣 |                             每個流動性代幣的價值 |
| -------- | --------------------------------------: | --------------------------------------: | -------------: | ---------------------------------------: | -----------: | -----: | -------------------------------------: |
| 初始設定     |                   8.000 |                   8.000 |             64 |                   16.000 |            8 |      8 |                  2.000 |
| 每種類型存入四個 |                  12.000 |                  12.000 |            144 |                   24.000 |            4 |     12 |                  2.000 |
| 每種類型存入兩個 |                  14.000 |                  14.000 |            196 |                   28.000 |            2 |     14 |                  2.000 |
| 不等值存款    |                  18.000 |                  14.000 |            252 |                   32.000 |            0 |     14 | ~2.286 |
| 套利後      | ~15.874 | ~15.874 |            252 |  ~31.748 |            0 |     14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

使用 `UniswapV2ERC20._mint` 函式實際建立額外的流動性代幣，並將它們交給正確的帳戶。

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 和 reserve1 是最新的
        emit Mint(msg.sender, amount0, amount1);
    }
```

更新狀態變數（`reserve0`、`reserve1`，以及需要時的 `kLast`），並發出適當的事件。

##### burn

```solidity
    // 這個低階函式應由執行重要安全檢查的合約呼叫
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

當流動性被提取且需要銷毀相應的流動性代幣時，會呼叫此函式。
它也應該[從周邊帳戶](#UniswapV2Router02)呼叫。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 節省 gas
        address _token0 = token0;                                // 節省 gas
        address _token1 = token1;                                // 節省 gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

周邊合約在呼叫之前已將待銷毀的流動性轉移到此合約。 這樣我們就知道要銷毀多少流動性，並且可以確保它被銷毀。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // 節省 gas，必須在此處定義，因為 totalSupply 可能在 _mintFee 中更新
        amount0 = liquidity.mul(balance0) / _totalSupply; // 使用餘額確保按比例分配
        amount1 = liquidity.mul(balance1) / _totalSupply; // 使用餘額確保按比例分配
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流動性提供者收到兩種價值相等的代幣。 這樣我們就不會改變匯率。

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 和 reserve1 是最新的
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn` 函式的其餘部分是上述 `mint` 函式的鏡像。

##### swap

```solidity
    // 這個低階函式應由執行重要安全檢查的合約呼叫
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

此函式也應由[周邊合約](#UniswapV2Router02)呼叫。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 節省 gas
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1} 的作用域，避免堆疊太深錯誤
```

局部變數可以儲存在記憶體中，或者如果數量不多，可以直接儲存在堆疊上。
如果我們可以限制數量，那麼使用堆疊可以節省更多的 gas。 更多詳細資訊請參閱[黃皮書，以太坊形式化規格](https://ethereum.github.io/yellowpaper/paper.pdf)，第 26 頁，公式 298。

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // 樂觀地轉移代幣
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // 樂觀地轉移代幣
```

這種轉移是樂觀的，因為我們在確定所有條件都滿足之前就進行轉移。 這在以太坊中是可行的，因為如果條件在稍後的呼叫中未滿足，我們會還原它以及它所做的任何更改。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

如果需要，通知接收方關於交換的資訊。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

取得目前的餘額。 周邊合約在呼叫我們進行交換之前會將代幣發送給我們。 這使得合約很容易檢查自己是否被欺騙，這個檢查_必須_在核心合約中進行（因為我們可能被周邊合約以外的其他實體呼叫）。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjusted 的作用域，避免堆疊太深錯誤
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

這是一個健全性檢查，以確保我們不會因交換而虧損。 在任何情況下，交換都不應減少 `reserve0*reserve1`。 這也是我們確保在交換中收取 0.3% 費用的地方；在對 K 值進行健全性檢查之前，我們將兩個餘額乘以 1000，然後減去數量乘以 3 的結果，這意味著在將其 K 值與當前儲備金 K 值進行比較之前，從餘額中扣除 0.3%（3/1000 = 0.003 = 0.3%）。

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

更新 `reserve0` 和 `reserve1`，並在必要時更新價格累加器和時間戳，並發出事件。

##### 同步或略過

實際餘額可能會與成對交易所認為自己擁有的儲備金不同步。
沒有合約的同意，無法提取代幣，但存款是另一回事。 帳戶可以在不呼叫 `mint` 或 `swap` 的情況下將代幣轉移到交易所。

在這種情況下，有兩種解決方案：

- `sync`，將儲備金更新為目前的餘額
- `skim`，提取多餘的金額。 請注意，任何帳戶都可以呼叫 `skim`，因為我們不知道是誰存入的代幣。 此資訊在事件中發出，但事件無法從區塊鏈存取。

```solidity
    // 強制餘額與儲備金匹配
    function skim(address to) external lock {
        address _token0 = token0; // 節省 gas
        address _token1 = token1; // 節省 gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // 強制儲備金與餘額匹配
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[此合約](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) 會建立成對交易所。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

這些狀態變數是實作協定費用所必需的（請參閱[白皮書](https://app.uniswap.org/whitepaper.pdf)，第 5 頁）。
`feeTo` 地址會累積協定費用的流動性代幣，而 `feeToSetter` 則是允許將 `feeTo` 變更為不同地址的地址。

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

這些變數追蹤交易對，即兩種代幣類型之間的交易所。

第一個 `getPair` 是一個對應，它根據兩種 ERC-20 代幣的交換來識別成對交易所合約。 ERC-20 代幣由實作它們的合約地址來識別，因此索引鍵和值都是地址。 要取得讓您從 `tokenA` 轉換為 `tokenB` 的成對交易所地址，您可以使用 `getPair[<tokenA address>][<tokenB address>]`（或反之亦然）。

第二個變數 `allPairs` 是一個陣列，其中包含此工廠建立的所有成對交易所的地址。 在以太坊中，您無法迭代對應的內容，也無法取得所有索引鍵的清單，因此這個變數是了解此工廠管理哪些交易所的唯一方法。

註：無法迭代對應的所有索引鍵的原因是合約資料儲存_成本高昂_，因此我們使用的儲存空間越少越好，變更的頻率也越少越好。 您可以建立[支援迭代的對應](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)，但它們需要額外的儲存空間來存放索引鍵清單。 在大多數應用程式中，您並不需要它。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

建立新的成對交易所時，會發出此事件。 它包含代幣地址、成對交易所地址以及工廠管理的交易所總數。

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

建構函式唯一的作用是指定 `feeToSetter`。 工廠開始時沒有費用，只有 `feeSetter` 可以變更。

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

此函式會傳回交易所對的數量。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

這是工廠的主要功能，用於在兩種 ERC-20 代幣之間建立成對交易所。 請注意，任何人都可以呼叫此函式。 您不需要 Uniswap 的許可即可建立新的成對交易所。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

我們希望新交易所的地址是確定性的，這樣就可以在鏈下預先計算（這對於[第二層交易](/developers/docs/scaling/)很有用）。
為此，我們需要有一個一致的代幣地址順序，無論我們收到它們的順序如何，所以我們在這裡對它們進行排序。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // 單一檢查即足夠
```

大型流動性資金池優於小型流動性資金池，因為它們的價格更穩定。 我們不希望每對代幣擁有超過一個流動性資金池。 如果已經存在交易所，則無需為同一對代幣建立另一個交易所。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

要建立新合約，我們需要建立它的程式碼（包括建構函式和將實際合約的 EVM 位元組碼寫入記憶體的程式碼）。 通常在 Solidity 中，我們只使用 `addr = new <name of contract>(<constructor parameters>)`，編譯器會為我們處理一切，但要有一個確定性的合約地址，我們需要使用 [CREATE2 操作碼](https://eips.ethereum.org/EIPS/eip-1014)。
撰寫此程式碼時，Solidity 尚不支援該操作碼，因此需要手動取得程式碼。 這不再是問題，因為 [Solidity 現在支援 CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

當 Solidity 尚不支援某個操作碼時，我們可以使用[內嵌組合語言](https://docs.soliditylang.org/en/v0.8.3/assembly.html)來呼叫它。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

呼叫 `initialize` 函式，告知新交易所它交換哪兩種代幣。

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // 以相反方向填入對應
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

將新的交易對資訊儲存在狀態變數中，並發出事件，告知全世界新的成對交易所。

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

這兩個函式允許 `feeSetter` 控制費用接收方（如果有的話），並將 `feeSetter` 變更為新的地址。

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[此合約](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) 實作 ERC-20 流動性代幣。 它與 [OpenZeppelin ERC-20 合約](/developers/tutorials/erc20-annotated-code) 類似，因此我只解釋不同的部分，即 `permit` 功能。

以太坊上的交易需要花費以太幣 (ETH)，這相當於真實貨幣。 如果您有 ERC-20 代幣但沒有 ETH，您就無法發送交易，因此您無法對它們進行任何操作。 避免此問題的一種解決方案是[元交易](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)。
代幣所有者簽署一筆交易，允許其他人離線提取代幣，並透過網際網路將其發送給接收方。 擁有 ETH 的接收方隨後代表所有者提交許可。

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

此雜湊值是[交易類型的識別碼](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)。 我們在這裡唯一支援的是帶有這些參數的 `Permit`。

```solidity
    mapping(address => uint) public nonces;
```

接收方偽造數位簽章是不可行的。 然而，發送同一筆交易兩次是輕而易舉的事（這是一種[重放攻擊](https://wikipedia.org/wiki/Replay_attack)）。 為防止這種情況，我們使用[隨機數](https://wikipedia.org/wiki/Cryptographic_nonce)。 如果新 `Permit` 的隨機數不是比上次使用的隨機數多一，我們就認為它是無效的。

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

這是檢索[鏈識別碼](https://chainid.network/)的程式碼。 它使用一種稱為 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) 的 EVM 組合語言方言。 請注意，在目前版本的 Yul 中，您必須使用 `chainid()`，而不是 `chainid`。

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

計算 EIP-712 的[網域分隔符](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)。

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

這是實作許可的函式。 它接收相關欄位作為參數，以及[簽章](https://yos.io/2018/11/16/ethereum-signatures/)的三個純量值（v、r 和 s）。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

過期後不接受交易。

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` 是我們預期會收到的訊息。 我們知道隨機數應該是多少，所以我們不需要將它作為參數來取得。

以太坊簽章演算法預期會取得 256 位元進行簽章，因此我們使用 `keccak256` 雜湊函式。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

從摘要和簽章中，我們可以使用 [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) 取得簽署它的地址。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

如果一切正常，將此視為[ERC-20 批准](https://eips.ethereum.org/EIPS/eip-20#approve)。

## 周邊合約 {#periphery-contracts}

周邊合約是 Uniswap 的 API（應用程式介面）。 它們可供外部呼叫，無論是來自其他合約還是去中心化應用程式。 您可以直接呼叫核心合約，但這更複雜，如果您犯錯，可能會損失價值。 核心合約只包含確保它們不被欺騙的測試，而不是為其他任何人進行的健全性檢查。 這些測試在周邊合約中，因此可以根據需要進行更新。

### UniswapV2Router01.sol {#UniswapV2Router01}

[此合約](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) 有問題，[不應再使用](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。 幸運的是，周邊合約是無狀態的，不持有任何資產，因此很容易棄用它，並建議人們改用替代品 `UniswapV2Router02`。

### UniswapV2Router02.sol {#UniswapV2Router02}

在大多數情況下，您會透過[此合約](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)使用 Uniswap。
您可以在[這裡](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)看到如何使用它。

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

這些大部分我們之前都遇到過，或者相當明顯。 唯一的例外是 `IWETH.sol`。 Uniswap v2 允許任何一對 ERC-20 代幣的交換，但以太幣 (ETH) 本身並不是 ERC-20 代幣。 它早於標準存在，並由獨特的機制轉移。 為使適用於 ERC-20 代幣的合約能夠使用 ETH，人們想出了[包裝以太幣 (WETH)](https://weth.tkn.eth.limo/) 合約。 您將 ETH 發送到此合約，它會為您鑄造等量的 WETH。 或者您可以銷毀 WETH，然後取回 ETH。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

路由器需要知道使用哪個工廠，以及對於需要 WETH 的交易，使用哪個 WETH 合約。 這些值是[不可變的](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)，這意味著它們只能在建構函式中設定。 這讓使用者相信，沒有人能夠將它們變更為指向不那麼誠實的合約。

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

此修飾器確保有時間限制的交易（「如果可以，在時間 Y 之前執行 X」）不會在時間限制後發生。

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

建構函式只設定不可變的狀態變數。

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // 只接受透過 WETH 合約的回退函式傳入的 ETH
    }
```

當我們將 WETH 合約中的代幣贖回為 ETH 時，會呼叫此函式。 只有我們使用的 WETH 合約有權這樣做。

#### 增加流動性 {#add-liquidity}

這些函式會向成對交易所增加代幣，從而增加流動性資金池。

```solidity

    // **** 增加流動性 ****
    function _addLiquidity(
```

此函式用於計算應存入成對交易所的 A 代幣和 B 代幣的數量。

```solidity
        address tokenA,
        address tokenB,
```

這些是 ERC-20 代幣合約的地址。

```solidity
        uint amountADesired,
        uint amountBDesired,
```

這些是流動性提供者想要存入的數量。 它們也是要存入的 A 和 B 的最大數量。

```solidity
        uint amountAMin,
        uint amountBMin
```

這些是可接受的最低存款數量。 如果交易無法以這些數量或更多數量進行，則還原交易。 如果您不想要此功能，只需指定零。

流動性提供者通常會指定一個最小值，因為他們希望將交易限制在接近目前匯率的範圍內。 如果匯率波動太大，可能意味著有改變基礎價值的新聞，他們希望手動決定該怎麼做。

例如，想像一個匯率為一比一，且流動性提供者指定以下值的案例：

| 參數             |   數值 |
| -------------- | ---: |
| amountADesired | 1000 |
| amountBDesired | 1000 |
| amountAMin     |  900 |
| amountBMin     |  800 |

只要匯率維持在 0.9 到 1.25 之間，交易就會進行。 如果匯率超出該範圍，交易將被取消。

採取此預防措施的原因是交易並非即時的，您提交它們後，最終會有驗證者將它們包含在一個區塊中（除非您的 gas 價格非常低，在這種情況下，您需要提交另一筆具有相同隨機數和更高 gas 價格的交易來覆蓋它）。 您無法控制提交和包含之間的間隔期間發生的事情。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

此函式傳回流動性提供者應存入的數量，以使儲備金之間的比例與目前比例相等。

```solidity
        // 如果交易對尚不存在，則建立它
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

如果此代幣對尚無交易所，則建立它。

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

取得交易對中的目前儲備金。

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

如果目前儲備金為空，則這是一個新的成對交易所。 要存入的數量應與流動性提供者想要提供的數量完全相同。

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

如果我們需要查看數量會是多少，我們可以使用[此函式](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)取得最佳數量。 我們希望比例與目前儲備金相同。

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

如果 `amountBOptimal` 小於流動性提供者想要存入的數量，這意味著目前代幣 B 的價值高於流動性存款人所想的，因此需要較少的數量。

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

如果最佳 B 數量大於所需 B 數量，這意味著目前 B 代幣的價值低於流動性存款人所想的，因此需要較高的數量。 然而，所需數量是最大值，因此我們不能這樣做。 相反地，我們計算所需 B 代幣數量的最佳 A 代幣數量。

將所有內容放在一起，我們得到此圖。 假設您正在嘗試存入一千個 A 代幣（藍線）和一千個 B 代幣（紅線）。 x 軸是匯率 A/B。 如果 x=1，它們的價值相等，您各存入一千個。 如果 x=2，A 的價值是 B 的兩倍（每個 A 代幣可以換兩個 B 代幣），所以您存入一千個 B 代幣，但只存入 500 個 A 代幣。 如果 x=0.5，情況相反，一千個 A 代幣和五百個 B 代幣。

![圖表](liquidityProviderDeposit.png)

您可以直接將流動性存入核心合約（使用[UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)），但核心合約只會檢查自己是否被欺騙，因此如果匯率在您提交交易和交易執行之間發生變化，您將面臨損失價值的風險。 如果您使用周邊合約，它會計算您應存入的金額並立即存入，因此匯率不會改變，您也不會損失任何東西。

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

此函式可由交易呼叫以存入流動性。 大多數參數與上面的 `_addLiquidity` 相同，但有兩個例外：

。 `to` 是取得新鑄造的流動性代幣的地址，以顯示流動性提供者在資金池中的份額
。 `deadline` 是交易的時間限制

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

我們計算實際要存入的數量，然後找到流動性資金池的地址。 為了節省 gas，我們不透過詢問工廠來做到這一點，而是使用函式庫函式 `pairFor`（請參閱下面的函式庫）

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

將正確數量的代幣從使用者轉移到成對交易所。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
```

作為回報，將流動性代幣提供給 `to` 地址，以表示資金池的部分所有權。 核心合約的 `mint` 函式會查看它有多少額外的代幣（與上次流動性改變時相比），並相應地鑄造流動性。

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

當流動性提供者想要為代幣/ETH 成對交易所提供流動性時，會有一些差異。 合約會為流動性提供者處理 ETH 的包裝。 無需指定使用者想要存入多少 ETH，因為使用者只需將它們與交易一起發送（數量可在 `msg.value` 中取得）。

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

要存入 ETH，合約首先將其包裝成 WETH，然後將 WETH 轉移到交易對中。 請注意，轉移被包裝在 `assert` 中。 這意味著如果轉移失敗，此合約呼叫也會失敗，因此包裝實際上不會發生。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

使用者已經將 ETH 發送給我們，因此如果還有多餘的（因為其他代幣的價值低於使用者的預期），我們需要退款。

#### 移除流動性 {#remove-liquidity}

這些函式將移除流動性並向流動性提供者退款。

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

移除流動性的最簡單案例。 流動性提供者同意接受每種代幣的最低數量，且必須在截止日期前完成。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // 將流動性發送到交易對
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

核心合約的 `burn` 函式負責將代幣退還給使用者。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

當函式傳回多個值，但我們只對其中一些感興趣時，這就是我們只取得那些值的方法。 從 gas 角度來看，這比讀取一個從未使用過的值要便宜一些。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

將核心合約傳回的數量（地址較低的代幣優先）轉換為使用者預期的方式（對應於 `tokenA` 和 `tokenB`）。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

先轉移然後再驗證其合法性是可以的，因為如果不合法，我們將還原所有狀態變更。

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

移除 ETH 的流動性幾乎相同，只是我們接收 WETH 代幣，然後將它們贖回為 ETH 以退還給流動性提供者。

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

這些函式轉發元交易，允許沒有以太幣的使用者使用[許可機制](#UniswapV2ERC20)從資金池中提取。

```solidity

    // **** 移除流動性（支援轉帳收費代幣）****
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

此函式可用於具有轉帳或儲存費用的代幣。 當代幣有此類費用時，我們不能依賴 `removeLiquidity` 函式來告訴我們能取回多少代幣，因此我們需要先提取，然後再取得餘額。

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

最終函式將儲存費用與元交易結合起來。

#### 交易 {#trade}

```solidity
    // **** 交換 ****
    // 要求初始金額已發送至第一個交易對
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

此函式會執行內部處理，這對於向交易者公開的函式是必要的。

```solidity
        for (uint i; i < path.length - 1; i++) {
```

在我撰寫本文時，共有 [388,160 個 ERC-20 代幣](https://eth.blockscout.com/tokens)。 如果每個代幣對都有一個交易對交易所，那麼將會有超過 1500 億個交易對交易所。 目前，整條鏈的 [帳戶數量僅為該數字的 0.1%](https://eth.blockscout.com/stats/accountsGrowth)。 取而代之的是，交換函式支援路徑的概念。 交易者可以將 A 兌換為 B、將 B 兌換為 C、將 C 兌換為 D，因此不需要直接的 A-D 交易對。

這些市場的價格往往是同步的，因為當它們不同步時，就會產生套利機會。 舉例來說，假設有 A、B、C 三種代幣。每個幣對都有一個交易對，因此共有三個交易對。

1. 初始情況
2. 一位交易者賣出 24.695 個 A 代幣，得到 25.305 個 B 代幣。
3. 該交易者賣出 24.695 個 B 代幣換取 25.305 個 C 代幣，保留約 0.61 個 B 代幣作為利潤。
4. 然後該交易者賣出 24.695 個 C 代幣換取 25.305 個 A 代幣，保留約 0.61 個 C 代幣作為利潤。 該交易者還額外擁有 0.61 個 A 代幣（交易者最終得到的 25.305 個減去最初投資的 24.695 個）。

| 步驟 | A-B 交易對                                                                                     | B-C 交易對                                                                                     | A-C 交易對                                                                                     |
| -- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1  | A:1000 B:1050 A/B=1.05                      | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 2  | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 3  | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05                      |
| 4  | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

取得我們目前正在處理的交易對，將其排序（以便與該交易對一起使用），並取得預期的輸出金額。

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

取得預期的輸出金額，並按照交易對期望的方式進行排序。

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

這是最後一次交換嗎？ 如果是，則將交易收到的代幣發送到目的地。 如果不是，則將其發送到下一個交易對。

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

實際呼叫交易對以交換代幣。 我們不需要回呼來獲知關於交換的資訊，所以我們不在該欄位中發送任何位元組。

```solidity
    function swapExactTokensForTokens(
```

交易者直接使用此函式將一種代幣交換為另一種代幣。

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

此參數包含 ERC-20 合約的地址。 如上所述，這是一個陣列，因為您可能需要經過幾個交易對才能從您擁有的資產換成您想要的資產。

Solidity 中的函式參數可以儲存在 `memory` 或 `calldata` 中。 如果函式是合約的進入點，由使用者（透過交易）或由不同的合約直接呼叫，那麼參數的值可以直接從呼叫資料中取得。 如果函式是內部呼叫的，如上面的 `_swap`，那麼參數必須儲存在 `memory` 中。 從被呼叫合約的角度來看，`calldata` 是唯讀的。

對於像 `uint` 或 `address` 這樣的純量類型，編譯器會為我們處理儲存的選擇，但對於陣列這種更長、更昂貴的類型，我們需要指定要使用的儲存類型。

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

傳回值一律在 memory 中傳回。

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

計算每次交換中要購買的金額。 如果結果小於交易者願意接受的最低金額，則還原交易。

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

最後，將初始的 ERC-20 代幣轉移到第一個交易對的帳戶，並呼叫 `_swap`。 這一切都發生在同一個交易中，所以交易對知道任何非預期的代幣都是這次轉帳的一部分。

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

上一個函式 `swapTokensForTokens` 允許交易者指定他願意付出的確切輸入代幣數量，以及他願意收到的最低輸出代幣數量。 此函式執行反向交換，它讓交易者指定他想要的輸出代幣數量，以及他願意為此支付的最高輸入代幣數量。

在這兩種情況下，交易者都必須先給予這個周邊合約一個授權額度，以允許它轉移代幣。

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
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

這四種變體都涉及 ETH 和代幣之間的交易。 唯一的區別是，我們要麼從交易者那裡接收 ETH 並用它來鑄造 WETH，要麼從路徑中的最後一個交易所接收 WETH 並將其銷毀，然後將產生的 ETH 發回給交易者。

```solidity
    // **** 交換（支援轉帳收費代幣） ****
    // 要求初始金額已發送至第一個交易對
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

這是用於交換具有轉帳或儲存費用的代幣的內部函式，以解決（[此問題](https://github.com/Uniswap/uniswap-interface/issues/835)）。

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // 作用域以避免堆疊過深錯誤
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

由於轉帳費用的關係，我們不能依賴 `getAmountsOut` 函式來告訴我們每次轉帳能得到多少（就像我們在呼叫原始 `_swap` 之前那樣）。 我們必須先進行轉帳，然後再查看我們收回了多少代幣。

注意：理論上，我們可以直接使用此函式來代替 `_swap`，但在某些情況下（例如，如果轉帳因為最終金額不足以滿足最低要求而被還原），這會導致消耗更多 Gas。 收取轉帳費用的代幣非常罕見，所以儘管我們需要兼容它們，但沒有必要假設所有交換都會至少經過其中一個。

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

這些是用於普通代幣的相同變體，但它們會改為呼叫 `_swapSupportingFeeOnTransferTokens`。

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

這些函式只是呼叫 [UniswapV2Library 函式](#uniswapV2library) 的代理。

### UniswapV2Migrator.sol {#UniswapV2Migrator}

此合約曾用於將交易所從舊的 v1 遷移到 v2。 現在它們已經遷移完畢，所以不再相關。

## 函式庫 {#libraries}

[SafeMath 函式庫](https://docs.openzeppelin.com/contracts/2.x/api/math) 的文件非常完善，所以此處無需贅述。

### Math {#Math}

此函式庫包含一些在 Solidity 程式碼中通常不需要的數學函式，因此它們不屬於該語言的一部分。

```solidity
pragma solidity =0.5.16;

// 用於執行各種數學運算的函式庫

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // 巴比倫法 (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

以一個比平方根大的估計值 x 開始（這就是我們需要將 1-3 作為特殊情況處理的原因）。

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

求得一個更接近的估計值，即前一個估計值與「我們要找平方根的數除以前一個估計值」的平均值。 重複此過程，直到新的估計值不低於現有值。 欲了解更多詳情，請[參閱此處](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)。

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

我們應該永遠不需要計算零的平方根。 一、二和三的平方根約為一（我們使用整數，因此忽略小數部分）。

```solidity
        }
    }
}
```

### 定點小數 (UQ112x112) {#FixedPoint}

此函式庫處理小數，這通常不是以太坊算術的一部分。 它透過將數字 _x_ 編碼為 _x\*2^112_ 來實現此功能。 這讓我們無需更改即可使用原始的加法和減法操作碼。

```solidity
pragma solidity =0.5.16;

// 用於處理二進位定點數的函式庫 (https://wikipedia.org/wiki/Q_(number_format))

// 範圍： [0, 2**112 - 1]
// 解析度： 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` 是 1 的編碼。

```solidity
    // 將 uint112 編碼為 UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // 絕不溢位
    }
```

因為 y 是 `uint112`，所以它的最大值可以是 2^112-1。 該數字仍然可以編碼為 `UQ112x112`。

```solidity
    // 將一個 UQ112x112 除以一個 uint112，傳回一個 UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

如果我們將兩個 `UQ112x112` 值相除，結果將不再乘以 2^112。 因此，我們改為使用一個整數作為分母。 我們本來需要使用類似的技巧來進行乘法，但我們不需要進行 `UQ112x112` 值的乘法。

### UniswapV2Library {#uniswapV2library}

此函式庫僅由周邊合約使用

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // 傳回排序後的代幣地址，用於處理以此順序排序的交易對的傳回值
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

依地址對兩個代幣進行排序，這樣我們就能取得它們的交易對地址。 這是必要的，否則我們將會有兩種可能性，一種用於參數 A,B，另一種用於參數 B,A，這將導致產生兩個交易所，而不是一個。

```solidity
    // 計算交易對的 CREATE2 地址，無需進行任何外部呼叫
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init 程式碼哈希
            ))));
    }
```

此函式計算兩個代幣的交易對地址。 此合約是使用 [CREATE2 操作碼](https://eips.ethereum.org/EIPS/eip-1014) 建立的，所以如果我們知道它使用的參數，我們就可以使用相同的演算法計算地址。 這比詢問工廠要便宜得多，而且

```solidity
    // 取得並排序交易對的儲備金
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

此函式傳回交易對擁有的兩種代幣的儲備金。 請注意，它可以按任一順序接收代幣，並為內部使用對它們進行排序。

```solidity
    // 給定某資產的數量和交易對儲備金，傳回另一資產的等值數量
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

如果沒有涉及費用，此函式會告訴您用代幣 A 可以換取多少代幣 B。 此計算考慮到轉帳會改變匯率。

```solidity
    // 給定某資產的輸入數量和交易對儲備金，傳回另一資產的最大輸出數量
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

如果使用交易對不收取任何費用，上面的 `quote` 函式會運作得很好。 然而，如果有 0.3% 的交易費，您實際得到的金額會更低。 此函式計算扣除交易費後的金額。

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity 本身不處理小數，所以我們不能直接將輸出金額乘以 0.997。 取而代之的是，我們將分子乘以 997，分母乘以 1000，以達到相同的效果。

```solidity
    // 給定某資產的輸出數量和交易對儲備金，傳回另一資產所需的輸入數量
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

此函式的作用大致相同，但它是取得輸出金額並提供輸入金額。

```solidity

    // 對任意數量的交易對執行鏈式 getAmountOut 計算
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // 對任意數量的交易對執行鏈式 getAmountIn 計算
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

這兩個函式處理在需要經過多個交易對時識別數值。

### 轉帳協助工具 {#transfer-helper}

[此函式庫](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) 在 ERC-20 和以太坊轉帳周圍增加了成功檢查，以相同的方式處理還原和 `false` 值的傳回。

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// 與 ERC20 代幣互動和發送 ETH 的協助工具方法，這些方法不會一致地傳回 true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

我們可以用以下兩種方式之一呼叫不同的合約：

- 使用介面定義來建立函式呼叫
- 「手動」使用 [應用程式二進位介面 (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) 來建立呼叫。 這就是程式碼作者決定要做的事。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

為了與 ERC-20 標準之前建立的代幣向後相容，ERC-20 呼叫可能會因為還原（此時 `success` 為 `false`）而失敗，或者成功但傳回 `false` 值（此時有輸出資料，如果將其解碼為布林值，會得到 `false`）而失敗。

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

此函式實作 [ERC-20 的 transfer 功能](https://eips.ethereum.org/EIPS/eip-20#transfer)，允許一個帳戶花費由另一個不同帳戶提供的額度。

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

此函式實作 [ERC-20 的 transferFrom 功能](https://eips.ethereum.org/EIPS/eip-20#transferfrom)，允許一個帳戶花費由另一個不同帳戶提供的額度。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

此函式將以太幣轉帳到一個帳戶。 任何對不同合約的呼叫都可以嘗試發送以太幣。 因為我們不需要實際呼叫任何函式，所以我們不在呼叫中發送任何資料。

## 結論 {#conclusion}

這是一篇長約 50 頁的長文。 如果您讀到這裡，恭喜您！ 希望您現在已經了解撰寫真實應用程式（相對於簡短的範例程式）時的考量，並且能更得心應手地為您自己的使用案例撰寫合約。

現在去寫一些有用的東西，讓我們大開眼界吧。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
