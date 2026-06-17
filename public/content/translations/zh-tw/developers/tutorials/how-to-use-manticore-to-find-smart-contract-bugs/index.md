---
title: 如何使用曼蒂科爾尋找智能合約中的錯誤
description: 如何使用曼蒂科爾自動尋找智能合約中的錯誤
author: Trailofbits
lang: zh-tw
tags:
  - solidity
  - 智能合約
  - 安全性
  - 測試
  - 形式化驗證
skill: advanced
breadcrumb: 曼蒂科爾
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

本教學的目的是展示如何使用曼蒂科爾自動尋找智能合約中的錯誤。

## 安裝 {#installation}

曼蒂科爾需要 >= Python 3.6。可以透過 pip 或使用 Docker 安裝。

### 透過 Docker 安裝曼蒂科爾 {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後一個指令會在可以存取您目前目錄的 Docker 中執行 eth-security-toolbox。您可以從主機更改檔案，並在 Docker 中對這些檔案執行工具_

在 Docker 內部，執行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 透過 pip 安裝曼蒂科爾 {#manticore-through-pip}

```bash
pip3 install --user manticore
```

建議使用 solc 0.5.11。

### 執行腳本 {#running-a-script}

若要使用 Python 3 執行 Python 腳本：

```bash
python3 script.py
```

## 動態符號執行簡介 {#introduction-to-dynamic-symbolic-execution}

### 動態符號執行簡述 {#dynamic-symbolic-execution-in-a-nutshell}

動態符號執行 (DSE) 是一種程式分析技術，它以高度的語義感知來探索狀態空間。這項技術基於「程式路徑」的發現，這些路徑以稱為 `path predicates` 的數學公式表示。在概念上，這項技術分兩個步驟對路徑謂詞進行操作：

1. 它們是使用對程式輸入的約束條件建構而成的。
2. 它們被用來產生會導致相關路徑執行的程式輸入。

這種方法不會產生誤報，因為所有識別出的程式狀態都可以在具體執行期間被觸發。例如，如果分析發現整數溢位，則保證它是可重現的。

### 路徑謂詞範例 {#path-predicate-example}

為了深入了解 DSE 的運作方式，請考慮以下範例：

```solidity
function f(uint a){

  if (a == 65) {
      // 存在錯誤
  }

}
```

由於 `f()` 包含兩條路徑，DSE 將建構兩個不同的路徑謂詞：

- 路徑 1：`a == 65`
- 路徑 2：`Not (a == 65)`

每個路徑謂詞都是一個數學公式，可以交給所謂的 [SMT 求解器](https://wikipedia.org/wiki/Satisfiability_modulo_theories)，它將嘗試求解該方程式。對於 `Path 1`，求解器會說可以使用 `a = 65` 來探索該路徑。對於 `Path 2`，求解器可以賦予 `a` 任何非 65 的值，例如 `a = 0`。

### 驗證屬性 {#verifying-properties}

曼蒂科爾允許完全控制每條路徑的所有執行過程。因此，它允許您對幾乎任何事物添加任意約束條件。這種控制能力允許在合約上建立屬性。

考慮以下範例：

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // 沒有溢位保護
  return c;
}
```

這裡在函式中只有一條路徑可以探索：

- 路徑 1：`c = a + b`

使用曼蒂科爾，您可以檢查溢位，並將約束條件添加到路徑謂詞中：

- `c = a + b AND (c < a OR c < b)`

如果可以找到 `a` 和 `b` 的賦值，使得上述路徑謂詞可行，這意味著您發現了一個溢位。例如，求解器可以產生輸入 `a = 10 , b = MAXUINT256`。

如果您考慮一個已修復的版本：

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

帶有溢位檢查的相關公式將會是：

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

這個公式無法求解；換句話說，這是一個**證明**，證明在 `safe_add` 中，`c` 將始終增加。

因此，DSE 是一個強大的工具，可以驗證程式碼上的任意約束條件。

## 在曼蒂科爾下執行 {#running-under-manticore}

我們將了解如何使用曼蒂科爾 API 探索智能合約。目標是以下智能合約 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 執行獨立探索 {#run-a-standalone-exploration}

您可以透過以下指令直接在智能合約上執行曼蒂科爾（`project` 可以是 Solidity 檔案或專案目錄）：

```bash
$ manticore project
```

您將獲得類似以下的測試案例輸出（順序可能會改變）：

```
...
... m.c.manticore:INFO: 已產生測試案例第 0 號 - STOP
... m.c.manticore:INFO: 已產生測試案例第 1 號 - REVERT
... m.c.manticore:INFO: 已產生測試案例第 2 號 - RETURN
... m.c.manticore:INFO: 已產生測試案例第 3 號 - REVERT
... m.c.manticore:INFO: 已產生測試案例第 4 號 - STOP
... m.c.manticore:INFO: 已產生測試案例第 5 號 - REVERT
... m.c.manticore:INFO: 已產生測試案例第 6 號 - REVERT
... m.c.manticore:INFO: 結果位於 /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

在沒有額外資訊的情況下，曼蒂科爾將使用新的符號交易來探索合約，直到它無法在合約上探索出新路徑為止。曼蒂科爾不會在失敗的交易（例如：回滾之後）之後執行新的交易。

曼蒂科爾會將資訊輸出到 `mcore_*` 目錄中。除此之外，您會在這個目錄中找到：

- `global.summary`：覆蓋率與編譯器警告
- `test_XXXXX.summary`：每個測試案例的覆蓋率、最後一個指令、帳戶餘額
- `test_XXXXX.tx`：每個測試案例的詳細交易列表

曼蒂科爾在這裡找到了 7 個測試案例，分別對應於（檔案名稱順序可能會改變）：

|                      |   交易 0   |   交易 1   | 交易 2     | 結果 |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | 建立合約 |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | 建立合約 | 回退函式 |                   | REVERT |
| **test_00000002.tx** | 建立合約 |                   |                   | RETURN |
| **test_00000003.tx** | 建立合約 |       f(65)       |                   | REVERT |
| **test_00000004.tx** | 建立合約 |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | 建立合約 |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | 建立合約 |      f(!=65)      | 回退函式 | REVERT |

_探索摘要 f(!=65) 表示使用任何非 65 的值呼叫 f。_

如您所見，曼蒂科爾會為每個成功或回滾的交易產生一個獨特的測試案例。

如果您想要快速探索程式碼，請使用 `--quick-mode` 標誌（它會停用錯誤偵測器、燃料計算等）

### 透過 API 操作智能合約 {#manipulate-a-smart-contract-through-the-api}

本節詳細說明如何透過曼蒂科爾 Python API 操作智能合約。您可以建立一個副檔名為 Python 的新檔案 `*.py`，並透過將 API 指令（其基礎將在下面說明）加入此檔案中來編寫必要的程式碼，然後使用指令 `$ python3 *.py` 執行它。您也可以直接在 Python 主控台中執行以下指令，若要執行主控台，請使用指令 `$ python3`。

### 建立帳戶 {#creating-accounts}

您應該做的第一件事是使用以下指令初始化一個新的區塊鏈：

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 建立非合約帳戶：

```python
user_account = m.create_account(balance=1000)
```

可以使用 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 部署 Solidity 合約：

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### 摘要 {#summary}

- 您可以使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 和 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 建立使用者與合約帳戶。

### 執行交易 {#executing-transactions}

曼蒂科爾支援兩種類型的交易：

- 原始交易：探索所有函式
- 具名交易：僅探索一個函式

#### 原始交易 {#raw-transaction}

使用 [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) 執行原始交易：

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

交易的呼叫者、地址、資料或值可以是具體的或符號的：

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) 建立一個符號值。
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) 建立一個符號位元組陣列。

例如：

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

如果資料是符號的，曼蒂科爾將在交易執行期間探索合約的所有函式。查看 [Ethernaut CTF 實戰](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) 文章中的回退函式說明，將有助於了解函式選擇的運作方式。

#### 具名交易 {#named-transaction}

可以透過函式名稱來執行函式。
若要從 user_account 以 0 顆以太幣和一個符號值執行 `f(uint var)`，請使用：

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

如果未指定交易的 `value`，則預設為 0。

#### 摘要 {#summary-1}

- 交易的參數可以是具體的或符號的
- 原始交易將探索所有函式
- 可以透過名稱呼叫函式

### 工作區 {#workspace}

`m.workspace` 是用作所有產生檔案的輸出目錄：

```python
print("Results are in {}".format(m.workspace))
```

### 終止探索 {#terminate-the-exploration}

若要停止探索，請使用 [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)。一旦呼叫此方法，就不應發送進一步的交易，並且曼蒂科爾會為每個探索過的路徑產生測試案例。

### 摘要：在曼蒂科爾下執行 {#summary-running-under-manticore}

將前面所有步驟放在一起，我們得到：

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # 停止探索
```

您可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到上述所有程式碼

## 取得拋出異常的路徑 {#getting-throwing-paths}

我們現在將為在 `f()` 中引發異常的路徑產生特定的輸入。目標仍然是以下智能合約 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 使用狀態資訊 {#using-state-information}

執行的每條路徑都有其區塊鏈狀態。狀態要麼是就緒 (ready)，要麼是被終止 (killed)，這意味著它到達了 THROW 或 REVERT 指令：

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing)：就緒狀態的列表（它們沒有執行 REVERT/INVALID）
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：被終止狀態的列表
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：所有狀態

```python
for state in m.all_states:
    # 對狀態進行操作
```

您可以存取狀態資訊。例如：

- `state.platform.get_balance(account.address)`：帳戶的餘額
- `state.platform.transactions`：交易列表
- `state.platform.transactions[-1].return_data`：最後一筆交易回傳的資料

最後一筆交易回傳的資料是一個陣列，可以使用 ABI.deserialize 將其轉換為一個值，例如：

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### 如何產生測試案例 {#how-to-generate-testcase}

使用 [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) 產生測試案例：

```python
m.generate_testcase(state, 'BugFound')
```

### 摘要 {#summary-2}

- 您可以使用 m.all_states 迭代狀態
- `state.platform.get_balance(account.address)` 回傳帳戶的餘額
- `state.platform.transactions` 回傳交易列表
- `transaction.return_data` 是回傳的資料
- `m.generate_testcase(state, name)` 為狀態產生輸入

### 摘要：取得拋出異常的路徑 {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## 檢查執行是否以回滾或無效結束
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

您可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到上述所有程式碼

_請注意，我們本可以產生一個簡單得多的腳本，因為 terminated_state 回傳的所有狀態在其結果中都有 REVERT 或 INVALID：這個範例只是為了示範如何操作 API。_

## 加入約束條件 {#adding-constraints}

我們將了解如何約束探索。我們將假設 `f()` 的文件指出該函式永遠不會以 `a == 65` 呼叫，因此任何帶有 `a == 65` 的錯誤都不是真正的錯誤。目標仍然是以下智能合約 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 運算子 {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) 模組有助於操作約束條件，除此之外它還提供：

- Operators.AND,
- Operators.OR,
- Operators.UGT（無號大於）,
- Operators.UGE（無號大於或等於）,
- Operators.ULT（無號小於）,
- Operators.ULE（無號小於或等於）。

若要匯入該模組，請使用以下指令：

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` 用於將陣列串接到一個值。例如，交易的 return_data 需要更改為一個值，以便與另一個值進行檢查：

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 約束條件 {#state-constraint}

您可以在全域或針對特定狀態使用約束條件。

#### 全域約束條件 {#state-constraint-2}

使用 `m.constrain(constraint)` 加入全域約束條件。
例如，您可以從一個符號地址呼叫合約，並將此地址限制為特定值：

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 狀態約束條件 {#state-constraint-3}

使用 [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) 將約束條件加入特定狀態。
它可用於在探索狀態後對其進行約束，以檢查其上的某些屬性。

### 檢查約束條件 {#checking-constraint}

使用 `solver.check(state.constraints)` 來了解約束條件是否仍然可行。
例如，以下內容將約束 symbolic_value 不等於 65，並檢查狀態是否仍然可行：

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 狀態是可行的
```

### 摘要：加入約束條件 {#summary-adding-constraints}

將約束條件加入先前的程式碼中，我們得到：

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## 檢查執行是否以回滾或無效結束
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # 我們不考慮 a == 65 的路徑
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

您可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到上述所有程式碼