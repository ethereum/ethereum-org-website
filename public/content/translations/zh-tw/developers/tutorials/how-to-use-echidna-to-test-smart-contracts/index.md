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

埃奇德納可以透過 Docker、Homebrew 或使用預先編譯的二進制檔案來安裝。本教學中的範例已使用埃奇德納 2.3.3 和 solc 0.8.37 進行測試。

### 透過 Docker 安裝埃奇德納 {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_最後一個指令會在 Docker 中執行埃奇德納映像檔，並允許其存取您目前的目錄。您可以從主機修改檔案，並在 Docker 中對這些檔案執行工具。該映像檔還內建了 [斯立瑟 (Slither)](https://github.com/crytic/slither)、[crytic-compile](https://github.com/crytic/crytic-compile) 和 [solc-select](https://github.com/crytic/solc-select)。_

在 Docker 內部，執行：

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### 二進制檔案 {#binary}

從 [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) 下載適用於您平台的最新版本。在 macOS 或 Linux 上，您也可以執行 `brew install echidna`，這會一併安裝斯立瑟與 crytic-compile。

使用發行版二進制檔案時，請自行安裝 [斯立瑟](https://github.com/crytic/slither) 和 [solc-select](https://github.com/crytic/solc-select)（例如在 Python 虛擬環境中執行 `pip3 install slither-analyzer solc-select`），並選擇編譯器版本：

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

埃奇德納可以在沒有斯立瑟的情況下執行，但斯立瑟會提取常數（例如 `require` 敘述中使用的魔術數字），且以下幾個範例都依賴它來快速尋找錯誤。

## 基於屬性的模糊測試簡介 {#introduction-to-property-based-fuzzing}

埃奇德納是一個基於屬性的模糊測試工具，我們在之前的部落格文章中曾介紹過 ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))。

### 模糊測試 {#fuzzing}

[模糊測試 (Fuzzing)](https://wikipedia.org/wiki/Fuzzing) 是安全社群中廣為人知的技術。它透過產生或多或少隨機的輸入來尋找程式中的錯誤。用於傳統軟體的模糊測試工具（例如 [AFL](http://lcamtuf.coredump.cx/afl/) 或 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)）被公認為是尋找錯誤的高效工具。

除了純粹隨機產生輸入之外，還有許多技術和策略可以產生良好的輸入，包括：

- 從每次執行中獲取回饋，並利用它來引導輸入的產生。例如，如果新產生的輸入導致發現了新路徑，那麼產生與其相近的新輸入是合理的。
- 在遵守結構限制的情況下產生輸入。例如，如果您的輸入包含帶有校驗和的標頭，讓模糊測試工具產生能通過校驗和驗證的輸入是合理的。
- 使用已知輸入來產生新輸入：如果您可以存取大量有效輸入的資料集，您的模糊測試工具可以從中產生新輸入，而不是從頭開始產生。這些通常被稱為*種子 (seeds)*。

### 基於屬性的模糊測試 {#property-based-fuzzing}

埃奇德納屬於特定系列的模糊測試工具：深受 [QuickCheck](https://wikipedia.org/wiki/QuickCheck) 啟發的基於屬性的模糊測試。與試圖尋找崩潰的傳統模糊測試工具不同，埃奇德納會試圖破壞使用者定義的不變數 (invariants)。

在智能合約中，不變數是 Solidity 函式，可以代表合約可能達到的任何不正確或無效狀態，包括：

- 不正確的存取控制：攻擊者成為了合約的擁有者。
- 不正確的狀態機：在合約暫停時可以轉移代幣。
- 不正確的算術：使用者的餘額可能發生向下溢位，從而獲得無限的免費代幣。

### 使用埃奇德納測試屬性 {#testing-a-property-with-echidna}

我們將了解如何使用埃奇德納測試智能合約。目標是以下智能合約 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

我們將假設此代幣必須具備以下屬性：

- 任何人最多只能擁有 1000 個代幣
- 該代幣無法轉移（它不是 ERC-20 代幣）

### 撰寫屬性 {#write-a-property}

埃奇德納屬性是 Solidity 函式。一個屬性必須：

- 沒有引數
- 如果成功，則回傳 `true`
- 名稱以 `echidna` 開頭

埃奇德納將會：

- 自動產生任意交易來測試該屬性。
- 報告任何導致屬性回傳 `false` 或拋出錯誤的交易。
- 在呼叫屬性時捨棄副作用（亦即，如果屬性改變了狀態變數，該改變會在測試後被捨棄）

以下屬性會檢查呼叫者擁有的代幣是否不超過 1000 個：

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

使用繼承將您的合約與屬性分開：

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) 實作了該屬性並繼承自代幣合約。

### 初始化合約 {#initiate-a-contract}

埃奇德納需要一個沒有引數的[建構函式](/developers/docs/smart-contracts/anatomy/#constructor-functions)。如果您的合約需要特定的初始化，您必須在建構函式中完成。

埃奇德納中有一些特定的地址：

- `0x30000` 呼叫建構函式。
- `0x10000`、`0x20000` 和 `0x30000` 隨機呼叫其他函式。
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` 是受測合約部署的位置。

在目前的範例中，我們不需要任何特定的初始化，因此我們的建構函式是空的。

### 執行埃奇德納 {#run-echidna}

透過以下指令啟動埃奇德納：

```sh
echidna contract.sol
```

如果 contract.sol 包含多個合約，您可以指定目標：

```sh
echidna contract.sol --contract MyContract
```

在終端機中執行時，埃奇德納會顯示互動式使用者介面。加入 `--format text` 以獲得如下方範例所示的純文字輸出。

### 總結：測試屬性 {#summary-testing-a-property}

以下總結了埃奇德納在我們範例中的執行情況：

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

埃奇德納發現，如果呼叫 `backdoor`，該屬性就會被破壞。

## 在模糊測試活動期間過濾要呼叫的函式 {#filtering-functions-to-call-during-a-fuzzing-campaign}

我們將了解如何過濾要進行模糊測試的函式。
目標是以下智能合約：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

這個小範例迫使埃奇德納尋找特定的交易序列來改變狀態變數。
這對模糊測試工具來說很困難。
我們可以執行埃奇德納來驗證這一點：

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### 過濾函式 {#filtering-functions}

埃奇德納難以找到正確的序列來測試此合約，因為兩個重設函式（`reset1` 和 `reset2`）會將所有狀態變數設為 `false`。
然而，我們可以使用埃奇德納的特殊功能，將重設函式列入黑名單，或者僅將 `f`、`g`、
`h` 和 `i` 函式列入白名單。

要將函式列入黑名單，我們可以使用此設定檔：

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

另一種過濾函式的方法是列出白名單函式。為此，我們可以使用此設定檔：

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` 預設為 `true`。
- 過濾是針對完整的函式名稱進行的：合約名稱、`.` 以及應用程式二進制介面 (ABI) 簽章（例如 `C.f(uint256)`）。如果您有 `f()` 和 `f(uint256)`，您可以精確選擇要過濾哪一個。單純的名稱（如 `"reset1"`）不會匹配任何內容。

### 執行埃奇德納 {#run-echidna-1}

要使用設定檔 `blacklist.yaml` 執行埃奇德納：

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

埃奇德納幾乎會立即找到能證偽該屬性的交易序列。

### 總結：過濾函式 {#summary-filtering-functions}

埃奇德納可以使用以下方式，在模糊測試活動期間將要呼叫的函式列入黑名單或白名單：

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

根據 `filterBlacklist` 布林值，埃奇德納會啟動模糊測試活動，將 `C.f1()`、`C.f2()` 和 `C.f3()` 列入黑名單，或者僅呼叫這些函式。

## 如何使用埃奇德納測試 Solidity 的斷言 {#how-to-test-soliditys-assert-with-echidna}

在這個簡短的教學中，我們將展示如何使用埃奇德納來測試合約中的斷言檢查。假設我們有如下合約：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

自 Solidity 0.8 起，算術溢位預設會回滾。而 `unchecked` 區塊恢復了環繞 (wrapping) 行為，使得 `counter` 可能發生溢位，這正是我們希望埃奇德納找到的錯誤。

### 撰寫斷言 {#write-an-assertion}

我們希望確保在回傳差值後，`tmp` 小於或等於 `counter`。我們可以撰寫一個
埃奇德納屬性，但我們需要將 `tmp` 的值儲存在某處。相反地，我們可以使用像這樣的斷言：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### 執行埃奇德納 {#run-echidna-2}

要啟用斷言失敗測試，請在命令列上傳遞 `--test-mode assertion`，或建立一個[埃奇德納設定檔](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`：

```yaml
testMode: assertion
```

當我們在埃奇德納中執行此合約時，會得到預期的結果：

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

如您所見，埃奇德納報告了 `inc` 函式中的一些斷言失敗。每個函式可以加入多個斷言，但埃奇德納無法分辨是哪一個斷言失敗了。

### 何時以及如何使用斷言 {#when-and-how-use-assertions}

斷言可以作為明確屬性的替代方案，特別是當要檢查的條件與某些操作 `f` 的正確使用直接相關時。在某些程式碼之後加入斷言，將強制在執行後立即進行檢查：

```solidity
function f(..) public {
    // 一些複雜的程式碼
    ...
    assert (condition);
    ...
}

```

相反地，使用明確的埃奇德納屬性會隨機執行交易，並且沒有簡單的方法可以強制精確控制何時進行檢查。不過仍然可以採用這種變通方法：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

然而，這存在一些問題：

- 如果 `f` 被宣告為 `internal` 或 `external`，它就會失敗。
- 不清楚應該使用哪些引數來呼叫 `f`。
- 如果 `f` 回滾，該屬性就會失敗。

一般來說，我們建議遵循 [John Regehr 的建議](https://blog.regehr.org/archives/1091)來使用斷言：

- 在斷言檢查期間不要強制產生任何副作用。例如：`assert(ChangeStateAndReturn() == 1)`
- 不要斷言顯而易見的陳述。例如 `assert(var >= 0)`，其中 `var` 被宣告為 `uint`。

最後，請**不要使用** `require` 來代替 `assert`，因為埃奇德納將無法偵測到它（但合約無論如何都會回滾）。

### 總結：斷言檢查 {#summary-assertion-checking}

以下總結了埃奇德納在我們範例中的執行情況：

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

埃奇德納發現，如果使用較大的引數多次呼叫此函式，`inc` 中的斷言可能會失敗。

## 收集與修改埃奇德納語料庫 {#collecting-and-modifying-an-echidna-corpus}

我們將了解如何使用埃奇德納收集和使用交易語料庫。目標是以下智能合約 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

這個小範例迫使埃奇德納尋找特定數值來改變狀態變數。這對模糊測試工具來說很困難。
我們可以執行埃奇德納來驗證這一點：

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

然而，在執行此模糊測試活動時，我們仍然可以使用埃奇德納來收集語料庫。

### 收集語料庫 {#collecting-a-corpus}

要啟用語料庫收集，請建立一個語料庫目錄：

```sh
mkdir corpus-magic
```

以及一個[埃奇德納設定檔](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`：

```yaml
corpusDir: "corpus-magic"
```

現在我們可以執行我們的工具並檢查收集到的語料庫：

```sh
echidna magic.sol --config config.yaml
```

埃奇德納仍然無法找到正確的魔術數值。要查看它卡在哪裡，請查看 `corpus-magic/covered.*.txt` 覆蓋率報告：

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` 標籤表示埃奇德納到達了該行，但執行在那裡回滾了，且最後一個 `require` 之後的行從未被執行。

埃奇德納收集的交易序列以 JSON 檔案格式儲存在 `corpus-magic/coverage/` 中。例如，其中一個檔案的第一筆交易是：

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

顯然，這個輸入不會觸發我們屬性中的失敗。然而，在下一步中，我們將了解如何修改它以達到此目的。

### 播種語料庫 {#seeding-a-corpus}

埃奇德納需要一些幫助才能處理 `magic` 函式。我們將複製並修改輸入，為其使用合適的
參數（檔案名稱是隨機的，因此請使用您自己 `corpus-magic/coverage/` 目錄中的檔案）：

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

我們將修改 `new.txt`，使其包含呼叫 `magic(42,129,333,0)` 的單一交易。現在，我們可以重新執行埃奇德納：

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

這一次，它立即發現該屬性被破壞了。

## 尋找高燃料消耗的交易 {#finding-transactions-with-high-gas-consumption}

我們將了解如何使用埃奇德納尋找高燃料消耗的交易。舊版的埃奇德納為此提供了一個 `estimateGas` 選項；該選項在埃奇德納 2.3.0 中被移除了。取而代之的是，我們使用 `gasleft()` 來測量燃料，並讓埃奇德納的[最佳化模式](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html)將其最大化。目標是以下智能合約：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

在這裡，`expensive` 可能會有很大的燃料消耗。

### 測量燃料消耗 {#measuring-gas-consumption}

在最佳化模式下，埃奇德納會尋找以 `echidna_` 開頭、不帶引數且回傳 `int256` 的函式，並試圖找到能使回傳值最大化的交易序列。我們加入一個測試合約，它會呼叫 `f`，記錄其使用的燃料，並公開最大值（將兩個合約儲存在 `gas.sol` 中）：

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

要啟用最佳化模式，請建立一個設定檔 `config.yaml`。在這個範例中，我們還將減少交易序列的大小，使結果更容易理解：

```yaml
testMode: optimization
seqLen: 2
```

### 執行埃奇德納 {#run-echidna-3}

建立設定檔後，我們可以像這樣執行埃奇德納：

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- 顯示的燃料是由埃奇德納執行的以太坊虛擬機 (EVM) 實作 [hevm](https://github.com/argotorg/hevm) 所測量的，並包含來自 `measureF` 內部呼叫的額外開銷。
- 最大值不是唯一的：每次活動都是隨機的，較長的活動（例如 `--test-limit 200000`）往往能找到更大的數值。

### 過濾掉減少燃料的呼叫 {#filtering-out-gas-reducing-calls}

上面關於**在模糊測試活動期間過濾要呼叫的函式**的教學展示了如何
從測試中移除某些函式。
這對於獲得準確的燃料估算至關重要。
考慮以下範例：

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` 呼叫 `check` 並回傳其燃料成本。就像每個埃奇德納測試函式一樣，它的狀態改變隨後會被捨棄。

如果埃奇德納可以呼叫所有函式，它就不容易找到高燃料成本的交易：

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

這是因為成本取決於 `addrs` 的大小，而隨機呼叫往往會使陣列幾乎為空。
然而，將 `pop` 和 `clear` 列入黑名單，能為我們帶來更好的結果：

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

縮減此結果的呼叫序列需要幾分鐘的時間，因為每次重播都會呼叫昂貴的 `check` 函式。

### 總結：尋找高燃料消耗的交易 {#summary-finding-transactions-with-high-gas-consumption}

埃奇德納可以透過在回傳 `int256` 的 `echidna_` 函式中使用 `gasleft()` 測量燃料，並在最佳化模式下執行，來尋找高燃料消耗的交易：

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

一旦模糊測試活動結束，埃奇德納將報告找到的最大值以及產生該值的交易序列。
