---
title: 如何使用 Slither 來尋找智能合約漏洞
description: 如何使用 Slither 自動尋找智能合約中的漏洞
author: Trailofbits
lang: zh-tw
tags: [ "穩固", "智能合約", "安全性", "測試" ]
skill: advanced
published: 2020-06-09
source: 建立安全合約
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## 如何使用 Slither {#how-to-use-slither}

本教學旨在說明如何使用 Slither 自動尋找智能合約中的漏洞。

- [安裝](#installation)
- [命令列用法](#command-line)
- [靜態分析簡介](#static-analysis)：靜態分析簡介
- [API](#api-basics)：Python API 說明

## 安裝 {#installation}

Slither 需要 Python >= 3.6。 可以透過 pip 或使用 docker 安裝。

透過 pip 安裝 Slither：

```bash
pip3 install --user slither-analyzer
```

透過 docker 安裝 Slither：

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最後一個指令會在可存取您目前目錄的 docker 容器中執行 eth-security-toolbox。 您可以從主機變更檔案，並從 docker 在檔案上執行工具_

在 docker 中，執行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 執行腳本 {#running-a-script}

若要使用 python 3 執行 python 腳本：

```bash
python3 script.py
```

### 命令列 {#command-line}

**命令列與使用者定義的腳本。** Slither 內建一組預先定義的偵測器，可尋找許多常見漏洞。 從命令列呼叫 Slither 將會執行所有偵測器，無需具備靜態分析的詳細知識：

```bash
slither project_paths
```

除了偵測器之外，Slither 還透過其 [printers](https://github.com/crytic/slither#printers) 和 [tools](https://github.com/crytic/slither#tools) 具備程式碼審查功能。

使用 [crytic.io](https://github.com/crytic) 來存取私有偵測器和 GitHub 整合功能。

## 靜態分析{#static-analysis}

Slither 靜態分析框架的功能與設計，已在部落格文章 ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)、[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) 與一篇 [學術論文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) 中有所說明。

靜態分析存在多種類型。 您很可能知道，像 [clang](https://clang-analyzer.llvm.org/) 和 [gcc](https://lwn.net/Articles/806099/) 這類的編譯器都依賴這些研究技術，但它同時也是 ([Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](http://findbugs.sourceforge.net/) 以及像 [Frama-C](https://frama-c.com/) 和 [Polyspace](https://www.mathworks.com/products/polyspace.html) 這類基於形式化方法的工具的基礎。

在此我們不會詳盡地探討靜態分析技術與研究者。 反之，我們將著重於了解 Slither 的運作原理，以便您能更有效地利用它來尋找漏洞並理解程式碼。

- [程式碼表示法](#code-representation)
- [程式碼分析](#analysis)
- [中介表示法](#intermediate-representation)

### 程式碼表示法 {#code-representation}

動態分析推論單一執行路徑，與之相對的是，靜態分析一次推論所有路徑。 為此，它依賴於一種不同的程式碼表示法。 兩種最常見的是抽象語法樹 (AST) 以及控制流程圖 (CFG)。

### 抽象語法樹 (AST) {#abstract-syntax-trees-ast}

每當編譯器解析程式碼時，都會使用 AST。 這或許是執行靜態分析所能依據的最基本結構。

簡而言之，AST 是一種結構化樹，其中通常每個葉節點包含一個變數或一個常數，而內部節點則是運算元或控制流程操作。 請看以下程式碼：

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

對應的 AST 如下圖所示：

![AST](./ast.png)

Slither 使用由 solc 匯出的 AST。

雖然 AST 建構簡單，但它是一個巢狀結構。 有時，這並非最直接易於分析的結構。 例如，要識別表達式 `a + b <= a` 中使用的操作，您必須先分析 `<=`，然後再分析 `+`。 常見的方法是使用所謂的「訪問者模式」，此模式會遞迴地遍歷樹狀結構。 Slither 在 [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) 中包含一個通用的訪問者。

以下程式碼使用 `ExpressionVisitor` 來偵測表達式是否包含加法：

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression 是要測試的表達式
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### 控制流程圖 (CFG) {#control-flow-graph-cfg}

第二種最常見的程式碼表示法是控制流程圖 (CFG)。 顧名思義，這是一種以圖形為基礎的表示法，它揭示了所有的執行路徑。 每個節點包含一個或多個指令。 圖中的邊代表控制流程操作 (if/then/else、迴圈等)。 我們前述範例的 CFG 如下：

![CFG](./cfg.png)

CFG 是大多數分析所建構於其上的表示法。

還存在許多其他的程式碼表示法。 根據您想要執行的分析，每種表示法各有其優缺點。

### 分析 {#analysis}

您可以使用 Slither 執行的最簡單的分析類型是語法分析。

### 語法分析 {#syntax-analysis}

Slither 可以遍歷程式碼的不同元件及其表示法，以使用類似模式比對的方法來尋找不一致之處和缺陷。

例如，下列偵測器會尋找與語法相關的問題：

- [狀態變數遮蔽](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing)：疊代所有狀態變數，並檢查是否有任何變數遮蔽了繼承合約中的變數 ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [不正確的 ERC20 介面](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface)：尋找不正確的 ERC20 函式簽章 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### 語意分析 {#semantic-analysis}

與語法分析相比，語意分析會更深入地分析程式碼的「意義」。 這個類別包含一些廣泛的分析類型。 它們能產生更強大和有用的結果，但撰寫起來也更複雜。

語意分析被用於最進階的漏洞偵測。

#### 資料相依性分析 {#fixed-point-computation}

如果存在一條路徑，其中 `variable_a` 的值受到 `variable_b` 的影響，則稱變數 `variable_a` 與 `variable_b` 具有資料相依性。

在以下程式碼中，`variable_a` 相依於 `variable_b`：

```solidity
// ...
variable_a = variable_b + 1;
```

歸功於它的中介表示法 (將在後續章節討論)，Slither 具備內建的 [資料相依性](https://github.com/crytic/slither/wiki/data-dependency) 分析功能。

資料相依性用法的一個範例可以在 [危險的嚴格相等偵測器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) 中找到。 在這裡，Slither 會尋找與危險值進行的嚴格相等比較 ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))，並通知使用者應該使用 `>=` 或 `<=` 而不是 `==`，以防止攻擊者困住合約。 此外，偵測器會將對 `balanceOf(address)` 的呼叫的傳回值視為危險 ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))，並使用資料相依性引擎來追蹤其用法。

#### 不動點運算 {#fixed-point-computation}

如果您的分析遍歷 CFG 並沿著邊緣進行，您很可能會看到已經訪問過的節點。 例如，如果一個迴圈如下所示：

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

您的分析將需要知道何時停止。 這裡有兩種主要策略：(1) 在每個節點上疊代有限次數，(2) 計算所謂的「不動點」。 不動點基本上意味著分析此節點不再提供任何有意義的資訊。

不動點使用的一個範例可以在重入偵測器中找到：Slither 探索節點，尋找外部呼叫、寫入和讀取存儲。 一旦達到不動點 ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))，它會停止探索，並分析結果，透過不同的重入模式 ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)、[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)、[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) 來查看是否存在重入。

使用有效率的不動點運算來撰寫分析，需要充分了解分析如何傳播其資訊。

### 中介表示法 {#intermediate-representation}

中介表示法 (IR) 是一種語言，意在使其比原始語言更適合進行靜態分析。 Slither 將 Solidity 轉譯為其自己的 IR：[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)。

如果您只想撰寫基本的檢查，則無需了解 SlithIR。 然而，如果您計劃撰寫進階的語意分析，它將會非常方便。 [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) 和 [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) 列印器將幫助您了解程式碼是如何被轉譯的。

## 應用程式介面 (API) 基礎 {#api-basics}

Slither 有一個 API，可讓您探索合約及其函式的基本屬性。

若要載入程式碼庫：

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### 探索合約與函式 {#exploring-contracts-and-functions}

一個 `Slither` 物件具有：

- `contracts (list(Contract)`：合約清單
- `contracts_derived (list(Contract)`：未被其他合約繼承的合約清單 (合約的子集)
- `get_contract_from_name (str)`：從名稱傳回一個合約

一個 `Contract` 物件具有：

- `name (str)`：合約的名稱
- `functions (list(Function))`：函式清單
- `modifiers (list(Modifier))`：修飾符清單
- `all_functions_called (list(Function/Modifier))`：合約可觸及的所有內部函式清單
- `inheritance (list(Contract))`：繼承的合約清單
- `get_function_from_signature (str)`：從簽章傳回一個函式
- `get_modifier_from_signature (str)`：從簽章傳回一個修飾符
- `get_state_variable_from_name (str)`：從名稱傳回一個 StateVariable

一個 `Function` 或 `Modifier` 物件具有：

- `name (str)`：函式的名稱
- `contract (contract)`：宣告函式的合約
- `nodes (list(Node))`：構成函式/修飾符 CFG 的節點清單
- `entry_point (Node)`：CFG 的進入點
- `variables_read (list(Variable))`：已讀取變數的清單
- `variables_written (list(Variable))`：已寫入變數的清單
- `state_variables_read (list(StateVariable))`：已讀取狀態變數的清單 (variables\`read 的子集)
- `state_variables_written (list(StateVariable))`：已寫入狀態變數的清單 (variables\`written 的子集)
