---
title: "如何使用埃奇德納測試智能合約"
description: "如何使用埃奇德納自動測試智能合約"
author: "Trailofbits"
lang: zh-tw
tags: ["Solidity", "智能合約", "安全", "測試", "模糊測試"]
skill: advanced
breadcrumb: "埃奇德納"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 安裝 {#installation}

可以透過 Docker 或使用預先編譯的二進位檔案來安裝埃奇德納。

### 透過 Docker 安裝埃奇德納 {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後一個指令會在可存取你目前目錄的 Docker 中執行 eth-security-toolbox。你可以從主機更改檔案，並在 Docker 中對這些檔案執行工具_

在 Docker 內部執行：

```bash
solc-select 0.5.11
cd /home/training
```

### 二進位檔案 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 基於屬性的模糊測試簡介 {#introduction-to-property-based-fuzzing}

埃奇德納是一個基於屬性的模糊測試工具，我們在之前的部落格文章中已有描述 ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))。

### 模糊測試 {#fuzzing}

[模糊測試 (Fuzzing)](https://wikipedia.org/wiki/Fuzzing) 是安全社群中眾所周知的技術。它透過產生或多或少隨機的輸入來尋找程式中的錯誤。用於傳統軟體的模糊測試工具（例如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)）被認為是尋找錯誤的高效工具。

除了純粹隨機產生輸入之外，還有許多技術和策略可以產生良好的輸入，包括：

- 從每次執行中獲取回饋並利用它來引導產生過程。例如，如果新產生的輸入導致發現了新路徑，那麼產生與其相近的新輸入是有意義的。
- 遵循結構約束來產生輸入。例如，如果你的輸入包含帶有校驗和的標頭，讓模糊測試工具產生能通過校驗和驗證的輸入是有意義的。
- 使用已知輸入來產生新輸入：如果你可以存取大量有效輸入的資料集，你的模糊測試工具可以從中產生新輸入，而不是從頭開始產生。這些通常被稱為_種子 (seeds)_。

### 基於屬性的模糊測試 {#property-based-fuzzing}

埃奇德納屬於一個特定的模糊測試工具家族：深受 [QuickCheck](https://wikipedia.org/wiki/QuickCheck) 啟發的基於屬性的模糊測試。與試圖尋找崩潰的經典模糊測試工具相反，埃奇德納將試圖打破使用者定義的不變數 (invariants)。

在智能合約中，不變數是 Solidity 函式，可以代表合約可能達到的任何不正確或無效的狀態，包括：

- 不正確的存取控制：攻擊者成為了合約的擁有者。
- 不正確的狀態機：在合約暫停時可以轉移代幣。
- 不正確的算術：使用者的餘額可能發生下溢，從而獲得無限的免費代幣。

### 使用埃奇德納測試屬性 {#testing-a-property-with-echidna}

我們將了解如何使用埃奇德納測試智能合約。目標是以下智能合約 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

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
- 該代幣無法轉移（它不是 ERC-20 代幣）

### 撰寫屬性 {#write-a-property}

埃奇德納屬性是 Solidity 函式。一個屬性必須：

- 沒有引數
- 如果成功則回傳 `true`
- 名稱以 `echidna` 開頭

埃奇德納將會：

- 自動產生任意交易來測試該屬性。
- 報告任何導致屬性回傳 `false` 或拋出錯誤的交易。
- 在呼叫屬性時捨棄副作用（即，如果屬性更改了狀態變數，則在測試後將其捨棄）

以下屬性檢查呼叫者擁有的代幣不超過 1000 個：

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

使用繼承將你的合約與屬性分開：

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) 實作了該屬性並繼承自代幣合約。

### 初始化合約 {#initiate-a-contract}

埃奇德納需要一個沒有引數的[建構函式](/developers/docs/smart-contracts/anatomy/#constructor-functions)。如果你的合約需要特定的初始化，你需要在建構函式中進行。

埃奇德納中有一些特定的地址：

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` 呼叫建構函式。
- `0x10000`、`0x20000` 和 `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` 隨機呼叫其他函式。

在我們目前的範例中，我們不需要任何特定的初始化，因此我們的建構函式是空的。

### 執行埃奇德納 {#run-echidna}

使用以下指令啟動埃奇德納：

```bash
echidna-test contract.sol
```

如果 contract.sol 包含多個合約，你可以指定目標：

```bash
echidna-test contract.sol --contract MyContract
```

### 總結：測試屬性 {#summary-testing-a-property}

以下總結了在我們的範例中執行埃奇德納的結果：

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

埃奇德納發現如果呼叫 `backdoor`，該屬性就會被違反。

## 在模糊測試活動期間過濾要呼叫的函式 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我們將了解如何過濾要進行模糊測試的函式。
目標是以下智能合約：

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

這個小範例迫使埃奇德納尋找特定的交易序列來更改狀態變數。
這對模糊測試工具來說很困難（建議使用像 [曼蒂科爾 (Manticore)](https://github.com/trailofbits/manticore) 這樣的符號執行工具）。
我們可以執行埃奇德納來驗證這一點：

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 過濾函式 {#filtering-functions}

埃奇德納很難找到正確的序列來測試此合約，因為兩個重設函式（`reset1` 和 `reset2`）會將所有狀態變數設定為 `false`。
然而，我們可以使用特殊的埃奇德納功能將重設函式列入黑名單，或者僅將 `f`、`g`、
`h` 和 `i` 函式列入白名單。

要將函式列入黑名單，我們可以使用此設定檔：

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

另一種過濾函式的方法是列出白名單函式。為此，我們可以使用此設定檔：

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` 預設為 `true`。
- 過濾將僅按名稱執行（不含參數）。如果你有 `f()` 和 `f(uint256)`，過濾器 `"f"` 將符合這兩個函式。

### 執行埃奇德納 {#run-echidna-1}

要使用設定檔 `blacklist.yaml` 執行埃奇德納：

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

埃奇德納幾乎會立即找到證偽該屬性的交易序列。

### 總結：過濾函式 {#summary-filtering-functions}

埃奇德納可以使用以下方式在模糊測試活動期間將要呼叫的函式列入黑名單或白名單：

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

根據 `filterBlacklist` 布林值，埃奇德納會啟動模糊測試活動，將 `f1`、`f2` 和 `f3` 列入黑名單，或者僅呼叫這些函式。

## 如何使用埃奇德納測試 Solidity 的斷言 {#how-to-test-soliditys-assert-with-echidna}

在這個簡短的教學中，我們將展示如何使用埃奇德納來測試合約中的斷言檢查。假設我們有這樣一個合約：

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

我們想要確保在回傳差值後，`tmp` 小於或等於 `counter`。我們可以撰寫一個埃奇德納屬性，但我們需要將 `tmp` 的值儲存在某個地方。相反地，我們可以使用像這樣的斷言：

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

### 執行埃奇德納 {#run-echidna-2}

要啟用斷言失敗測試，請建立一個[埃奇德納設定檔](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
checkAsserts: true
```

當我們在埃奇德納中執行此合約時，我們獲得了預期的結果：

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

如你所見，埃奇德納報告了 `inc` 函式中的一些斷言失敗。每個函式可以新增多個斷言，但埃奇德納無法分辨是哪個斷言失敗了。

### 何時以及如何使用斷言 {#when-and-how-use-assertions}

斷言可以作為明確屬性的替代方案，特別是當要檢查的條件與某些操作 `f` 的正確使用直接相關時。在某些程式碼之後新增斷言將強制在執行後立即進行檢查：

```solidity
function f(..) public {
    // 一些複雜的程式碼
    ...
    assert (condition);
    ...
}

```

相反地，使用明確的埃奇德納屬性將隨機執行交易，並且沒有簡單的方法可以強制確切的檢查時間。仍然可以透過這種變通方法來實現：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

然而，存在一些問題：

- 如果 `f` 被宣告為 `internal` 或 `external`，它將會失敗。
- 不清楚應該使用哪些引數來呼叫 `f`。
- 如果 `f` 回滾，該屬性將會失敗。

一般來說，我們建議遵循 [John Regehr 關於如何使用斷言的建議](https://blog.regehr.org/archives/1091)：

- 在斷言檢查期間不要強制產生任何副作用。例如：`assert(ChangeStateAndReturn() == 1)`
- 不要斷言明顯的陳述。例如 `assert(var >= 0)`，其中 `var` 被宣告為 `uint`。

最後，請**不要使用** `require` 來代替 `assert`，因為埃奇德納將無法偵測到它（但合約無論如何都會回滾）。

### 總結：斷言檢查 {#summary-assertion-checking}

以下總結了在我們的範例中執行埃奇德納的結果：

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

埃奇德納發現，如果使用大引數多次呼叫此函式，`inc` 中的斷言可能會失敗。

## 收集和修改埃奇德納語料庫 {#collecting-and-modifying-an-echidna-corpus}

我們將了解如何使用埃奇德納收集和使用交易語料庫。目標是以下智能合約 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

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

這個小範例迫使埃奇德納尋找特定值來更改狀態變數。這對模糊測試工具來說很困難
（建議使用像 [曼蒂科爾 (Manticore)](https://github.com/trailofbits/manticore) 這樣的符號執行工具）。
我們可以執行埃奇德納來驗證這一點：

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

然而，在執行此模糊測試活動時，我們仍然可以使用埃奇德納來收集語料庫。

### 收集語料庫 {#collecting-a-corpus}

要啟用語料庫收集，請建立一個語料庫目錄：

```bash
mkdir corpus-magic
```

以及一個[埃奇德納設定檔](https://github.com/crytic/echidna/wiki/Config) `config.yaml`：

```yaml
coverage: true
corpusDir: "corpus-magic"
```

現在我們可以執行我們的工具並檢查收集到的語料庫：

```bash
echidna-test magic.sol --config config.yaml
```

埃奇德納仍然無法找到正確的魔術值 (magic values)，但我們可以查看它收集的語料庫。
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

顯然，這個輸入不會觸發我們屬性中的失敗。然而，在下一步中，我們將了解如何為此修改它。

### 播種語料庫 {#seeding-a-corpus}

埃奇德納需要一些幫助才能處理 `magic` 函式。我們將複製並修改輸入，為其使用合適的參數：

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

我們將修改 `new.txt` 以呼叫 `magic(42,129,333,0)`。現在，我們可以重新執行埃奇德納：

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

這一次，它立即發現該屬性被違反了。

## 尋找高燃料消耗的交易 {#finding-transactions-with-high-gas-consumption}

我們將了解如何使用埃奇德納尋找高燃料消耗的交易。目標是以下智能合約：

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

這裡 `expensive` 可能會有很大的燃料消耗。

目前，埃奇德納總是需要一個屬性來測試：這裡 `echidna_test` 總是回傳 `true`。
我們可以執行埃奇德納來驗證這一點：

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 測量燃料消耗 {#measuring-gas-consumption}

要使用埃奇德納啟用燃料消耗測量，請建立一個設定檔 `config.yaml`：

```yaml
estimateGas: true
```

在這個範例中，我們還將減少交易序列的大小，使結果更容易理解：

```yaml
seqLen: 2
estimateGas: true
```

### 執行埃奇德納 {#run-echidna-3}

建立設定檔後，我們可以像這樣執行埃奇德納：

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

- 顯示的燃料是由 [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) 提供的估算值。

### 過濾掉減少燃料的呼叫 {#filtering-out-gas-reducing-calls}

上面關於**在模糊測試活動期間過濾要呼叫的函式**的教學展示了如何從測試中移除某些函式。  
這對於獲得準確的燃料估算可能至關重要。
考慮以下範例：

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

如果埃奇德納可以呼叫所有函式，它將不容易找到高燃料成本的交易：

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

這是因為成本取決於 `addrs` 的大小，而隨機呼叫往往會使陣列幾乎為空。
然而，將 `pop` 和 `clear` 列入黑名單會給我們帶來更好的結果：

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

### 總結：尋找高燃料消耗的交易 {#summary-finding-transactions-with-high-gas-consumption}

埃奇德納可以使用 `estimateGas` 設定選項來尋找高燃料消耗的交易：

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

一旦模糊測試活動結束，埃奇德納將報告每個函式具有最大燃料消耗的序列。