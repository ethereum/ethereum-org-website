---
title: "如何使用 Echidna 測試智能合約"
description: "如何使用 Echidna 自動測試智能合約"
author: "Trailofbits"
lang: zh-tw
tags: [ "穩固", "智能合約", "安全性", "測試", "模糊測試" ]
skill: advanced
published: 2020-04-10
source: "建立安全合約"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 安裝 {#installation}

Echidna 可透過 docker 或使用預先編譯的二進位檔進行安裝。

### 透過 docker 使用 Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後一個指令會在可存取您目前目錄的 docker 容器中執行 eth-security-toolbox。 您可以從主機變更檔案，並從 docker 在檔案上執行工具_

在 docker 中執行：

```bash
solc-select 0.5.11
cd /home/training
```

### 二進位檔 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 基於屬性的模糊測試簡介 {#introduction-to-property-based-fuzzing}

Echidna 是一款基於屬性的模糊測試器，我們在之前的部落格文章中介紹過 ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))。

### 模糊測試 {#fuzzing}

[模糊測試](https://wikipedia.org/wiki/Fuzzing) 是資安社群中一項眾所周知的技術。 它包含產生或多或少隨機的輸入，以尋找程式中的錯誤。 傳統軟體的模糊測試器 (例如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) 是眾所周知的有效尋找錯誤工具。

除了純粹隨機產生輸入之外，還有許多技術和策略可以產生良好的輸入，包括：

- 從每次執行中取得回饋，並利用它來引導產生過程。 例如，如果一個新產生的輸入導致發現一條新路徑，那麼在其附近產生新的輸入可能是有意義的。
- 產生符合結構性約束的輸入。 例如，如果您的輸入包含帶有校驗和的標頭，讓模糊測試器產生能驗證校驗和的輸入會更有意義。
- 使用已知的輸入來產生新的輸入：如果您可以存取大量的有效輸入資料集，您的模糊測試器可以從中產生新的輸入，而無需從頭開始。 這些通常被稱為 _種子_。

### 基於屬性的模糊測試 {#property-based-fuzzing}

Echidna 屬於一類特殊的模糊測試器：基於屬性的模糊測試，其靈感主要來自 [QuickCheck](https://wikipedia.org/wiki/QuickCheck)。 與試圖尋找當機的傳統模糊測試器不同，Echidna 會嘗試破壞使用者定義的不變量。

在智能合約中，不變量是 Solidity 函數，可以表示合約可能達到的任何不正確或無效的狀態，包括：

- 不正確的存取控制：攻擊者成為合約的擁有者。
- 不正確的狀態機器：在合約暫停時，代幣仍可被轉移。
- 不正確的算術：使用者可以讓其餘額下溢，並獲得無限的免費代幣。

### 使用 Echidna 測試屬性 {#testing-a-property-with-echidna}

我們將了解如何使用 Echidna 測試智能合約。 目標是以下的智能合約 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

我們將假設此代幣必須具有以下屬性：

- 任何人最多只能擁有 1000 個代幣
- 此代幣無法轉移 (它不是 ERC20 代幣)

### 撰寫屬性 {#write-a-property}

Echidna 屬性是 Solidity 函數。 一個屬性必須：

- 沒有參數
- 如果成功，則返回 `true`
- 其名稱以 `echidna` 開頭

Echidna 會：

- 自動產生任意交易來測試屬性。
- 回報任何導致屬性返回 `false` 或拋出錯誤的交易。
- 在呼叫屬性時捨棄副作用 (亦即，如果屬性改變了一個狀態變數，它會在測試後被捨棄)

以下屬性會檢查呼叫者擁有的代幣數量不超過 1000 個：

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

使用繼承將您的合約與您的屬性分開：

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) 實作了該屬性並繼承自該代幣。

### 初始化合約 {#initiate-a-contract}

Echidna 需要一個沒有參數的[建構函式](/developers/docs/smart-contracts/anatomy/#constructor-functions)。 如果您的合約需要特定的初始化，您需要在建構函式中進行。

在 Echidna 中有一些特定的地址：

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`，它會呼叫建構函式。
- `0x10000`、`0x20000` 和 `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`，它們會隨機呼叫其他函數。

在我們目前的範例中，我們不需要任何特定的初始化，因此我們的建構函式是空的。

### 執行 Echidna {#run-echidna}

Echidna 的啟動方式如下：

```bash
echidna-test contract.sol
```

如果 contract.sol 包含多個合約，您可以指定目標：

```bash
echidna-test contract.sol --contract MyContract
```

### 摘要：測試屬性 {#summary-testing-a-property}

以下總結了 echidna 在我們範例上的執行情況：

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna 發現如果呼叫了 `backdoor`，屬性就會被違反。

## 在模糊測試活動中過濾要呼叫的函數 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我們將了解如何過濾要進行模糊測試的函數。
目標是以下的智能合約：

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

這個小範例迫使 Echidna 尋找特定的交易序列來改變一個狀態變數。
這對於模糊測試器來說很困難 (建議使用像 [Manticore](https://github.com/trailofbits/manticore) 這樣的符號執行工具)。
我們可以執行 Echidna 來驗證這一點：

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 過濾函數 {#filtering-functions}

Echidna 很難找到正確的序列來測試此合約，因為兩個重設函數 (`reset1` 和 `reset2`) 會將所有狀態變數設為 `false`。
然而，我們可以使用一個特殊的 Echidna 功能，將重設函數列入黑名單，或只將 `f`、`g`、
`h` 和 `i` 函數列入白名單。

要將函數列入黑名單，我們可以使用此設定檔：

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

過濾函數的另一種方法是列出白名單中的函數。 為此，我們可以使用此設定檔：

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` 預設為 `true`。
- 過濾將只依名稱進行 (不含參數)。 如果您有 `f()` 和 `f(uint256)`，過濾器 `"f"` 將會匹配這兩個函數。

### 執行 Echidna {#run-echidna-1}

要使用設定檔 `blacklist.yaml` 執行 Echidna：

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna 將幾乎立即找到可證偽該屬性的交易序列。

### 摘要：過濾函數 {#summary-filtering-functions}

在模糊測試活動中，Echidna 可以使用以下方式將函數列入黑名單或白名單：

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna 會根據 `filterBlacklist` 布林值的值，開始一場模糊測試活動，將 `f1`、`f2` 和 `f3` 列入黑名單或只呼叫這些函數。

## 如何使用 Echidna 測試 Solidity 的 assert {#how-to-test-soliditys-assert-with-echidna}

在這個簡短的教學中，我們將展示如何使用 Echidna 來測試合約中的斷言檢查。 假設我們有這樣一個合約：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### 撰寫斷言 {#write-an-assertion}

我們希望確保在返回其差值後，`tmp` 小於或等於 `counter`。 我們可以撰寫一個
Echidna 屬性，但我們需要將 `tmp` 值儲存在某個地方。 相反地，我們可以使用像這樣的斷言：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### 執行 Echidna {#run-echidna-2}

要啟用斷言失敗測試，請建立一個 [Echidna 設定檔](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
checkAsserts: true
```

當我們在 Echidna 中執行此合約時，我們會得到預期的結果：

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

如您所見，Echidna 在 `inc` 函數中回報了一些斷言失敗。 每個函數可以新增多個斷言，但 Echidna 無法判斷是哪一個斷言失敗。

### 何時以及如何使用斷言 {#when-and-how-use-assertions}

斷言可以用作明確屬性的替代方案，特別是當要檢查的條件與某個操作 `f` 的正確使用直接相關時。 在一些程式碼之後加入斷言，將強制在它執行後立即進行檢查：

```solidity
function f(..) public {
    // 一些複雜的程式碼
    ...
    assert (condition);
    ...
}

```

相反地，使用明確的 echidna 屬性會隨機執行交易，並且沒有簡單的方法可以強制確切的檢查時機。 仍然可以透過這個變通方法來達成：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

然而，這會有一些問題：

- 如果 `f` 被宣告為 `internal` 或 `external`，它會失敗。
- 不清楚應該使用哪些參數來呼叫 `f`。
- 如果 `f` 回復，屬性將會失敗。

一般而言，我們建議遵循 [John Regehr 的建議](https://blog.regehr.org/archives/1091) 來使用斷言：

- 在斷言檢查期間不要強制產生任何副作用。 例如：`assert(ChangeStateAndReturn() == 1)`
- 不要斷言顯而易見的陳述。 例如 `assert(var >= 0)`，其中 `var` 被宣告為 `uint`。

最後，請**不要**使用 `require` 來代替 `assert`，因為 Echidna 將無法偵測到它 (但合約無論如何都會回復)。

### 摘要：斷言檢查 {#summary-assertion-checking}

以下總結了 echidna 在我們範例上的執行情況：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna 發現如果 `inc` 函數被多次以大參數呼叫，其中的斷言可能會失敗。

## 收集與修改 Echidna 語料庫 {#collecting-and-modifying-an-echidna-corpus}

我們將了解如何使用 Echidna 收集和使用交易語料庫。 目標是以下的智能合約 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

這個小範例迫使 Echidna 尋找特定值來改變狀態變數。 這對於模糊測試器來說很困難
(建議使用像 [Manticore](https://github.com/trailofbits/manticore) 這樣的符號執行工具)。
我們可以執行 Echidna 來驗證這一點：

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

然而，我們仍然可以在執行此模糊測試活動時使用 Echidna 來收集語料庫。

### 收集語料庫 {#collecting-a-corpus}

要啟用語料庫收集，請建立一個語料庫目錄：

```bash
mkdir corpus-magic
```

以及一個 [Echidna 設定檔](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
coverage: true
corpusDir: "corpus-magic"
```

現在我們可以執行我們的工具並檢查收集到的語料庫：

```bash
echidna-test magic.sol --config config.yaml
```

Echidna 仍然找不到正確的魔術值，但我們可以看看它收集的語料庫。
例如，其中一個檔案是：

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

顯然，這個輸入不會觸發我們屬性中的失敗。 然而，在下一步中，我們將看到如何為此修改它。

### 為語料庫提供種子 {#seeding-a-corpus}

Echidna 需要一些幫助才能處理 `magic` 函數。 我們將複製並修改輸入，為其使用合適的
參數：

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

我們將修改 `new.txt` 來呼叫 `magic(42,129,333,0)`。 現在，我們可以重新執行 Echidna：

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

這一次，它立即發現與該屬性發生了衝突。

## 尋找高 gas 消耗的交易 {#finding-transactions-with-high-gas-consumption}

我們將了解如何使用 Echidna 找到高 gas 消耗的交易。 目標是以下的智能合約：

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

這裡的 `expensive` 可能會有大量的 gas 消耗。

目前，Echidna 總是需要一個屬性來測試：這裡 `echidna_test` 總是返回 `true`。
我們可以執行 Echidna 來驗證這一點：

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 測量 Gas 消耗 {#measuring-gas-consumption}

要透過 Echidna 啟用 gas 消耗測量，請建立一個設定檔 `config.yaml`：

```yaml
estimateGas: true
```

在此範例中，我們還將縮小交易序列的大小，使結果更易於理解：

```yaml
seqLen: 2
estimateGas: true
```

### 執行 Echidna {#run-echidna-3}

建立設定檔後，我們可以像這樣執行 Echidna：

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- 顯示的 gas 是由 [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) 提供的估計值。

### 過濾掉減少 Gas 的呼叫 {#filtering-out-gas-reducing-calls}

上方關於**在模糊測試活動中過濾要呼叫的函數**的教學展示了如何
從您的測試中移除一些函數。  
這對於獲得準確的 gas 估計值至關重要。
請參考以下範例：

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

如果 Echidna 可以呼叫所有函數，它將不易找到高 gas 成本的交易：

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

這是因為成本取決於 `addrs` 的大小，且隨機呼叫往往會讓陣列幾乎是空的。
然而，將 `pop` 和 `clear` 列入黑名單，會給我們帶來好得多的結果：

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### 摘要：尋找高 gas 消耗的交易 {#summary-finding-transactions-with-high-gas-consumption}

Echidna 可以使用 `estimateGas` 設定選項來尋找高 gas 消耗的交易：

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

一旦模糊測試活動結束，Echidna 將回報每個函數具有最大 gas 消耗的序列。
