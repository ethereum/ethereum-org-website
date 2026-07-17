---
title: "如何使用斯立瑟尋找智能合約錯誤"
description: "如何使用斯立瑟自動尋找智能合約中的錯誤"
author: Trailofbits
lang: zh-tw
tags: ["Solidity", "智能合約", "安全性", "測試"]
skill: advanced
breadcrumb: "斯立瑟"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## 如何使用斯立瑟 {#how-to-use-slither}

本教學旨在展示如何使用斯立瑟自動尋找智能合約中的錯誤。

- [安裝](#installation)
- [命令列用法](#command-line)
- [靜態分析簡介](#static-analysis)：靜態分析的簡要介紹
- [API](#api-basics)：Python API 說明

## 安裝 {#installation}

斯立瑟需要 Python >= 3.6。可以透過 pip 或使用 Docker 安裝。

透過 pip 安裝斯立瑟：

```bash
pip3 install --user slither-analyzer
```

透過 Docker 安裝斯立瑟：

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最後一個命令會在可存取您目前目錄的 Docker 中執行 eth-security-toolbox。您可以從主機變更檔案，並從 Docker 對檔案執行工具_

在 Docker 內部執行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 執行腳本 {#running-a-script}

若要使用 Python 3 執行 Python 腳本：

```bash
python3 script.py
```

### 命令列 {#command-line}

**命令列與使用者定義腳本的比較。** 斯立瑟內建了一組預先定義的偵測器，可尋找許多常見的錯誤。從命令列呼叫斯立瑟將執行所有偵測器，不需要具備靜態分析的詳細知識：

```bash
slither project_paths
```

除了偵測器之外，斯立瑟還透過其[列印程式 (printers)](https://github.com/crytic/slither#printers)和[工具](https://github.com/crytic/slither#tools)提供程式碼審查功能。

使用 [crytic.io](https://github.com/crytic) 來存取私人偵測器和 GitHub 整合。

## 靜態分析 {#static-analysis}

斯立瑟靜態分析框架的功能與設計已在部落格文章 ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)、[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) 和一篇[學術論文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)中進行了說明。

靜態分析有不同的類型。您可能已經了解到，像 [clang](https://clang-analyzer.llvm.org/) 和 [gcc](https://lwn.net/Articles/806099/) 這樣的編譯器依賴於這些研究技術，但它也是 ([Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](https://findbugs.sourceforge.net/) 以及基於形式化方法的工具，如 [Frama-C](https://frama-c.com/) 和 [Polyspace](https://www.mathworks.com/products/polyspace.html)) 的基礎。

我們不會在此詳盡地回顧靜態分析技術和研究。相反地，我們將專注於了解斯立瑟運作方式所需的知識，以便您能更有效地使用它來尋找錯誤並理解程式碼。

- [程式碼表示法](#code-representation)
- [程式碼分析](#analysis)
- [中間表示法](#intermediate-representation)

### 程式碼表示法 {#code-representation}

與推論單一執行路徑的動態分析相反，靜態分析會同時推論所有路徑。為此，它依賴於不同的程式碼表示法。最常見的兩種是抽象語法樹 (AST) 和控制流程圖 (CFG)。

### 抽象語法樹 (AST) {#abstract-syntax-trees-ast}

每次編譯器解析程式碼時都會使用 AST。它可能是執行靜態分析最基本的結構。

簡而言之，AST 是一棵結構化樹，通常每個葉節點包含一個變數或常數，而內部節點則是運算元或控制流程操作。考慮以下程式碼：

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

對應的 AST 顯示如下：

![AST](./ast.png)

斯立瑟使用 solc 匯出的 AST。

雖然易於建構，但 AST 是一種巢狀結構。有時候，這並不是最直接的分析方式。例如，要識別表達式 `a + b <= a` 使用的操作，您必須先分析 `<=`，然後再分析 `+`。常見的方法是使用所謂的存取者模式 (visitor pattern)，它會遞迴地瀏覽樹狀結構。斯立瑟在 [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) 中包含了一個通用的存取者。

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

第二種最常見的程式碼表示法是控制流程圖 (CFG)。顧名思義，它是一種基於圖形的表示法，揭露了所有的執行路徑。每個節點包含一個或多個指令。圖中的邊緣代表控制流程操作 (if/then/else、迴圈等)。我們前面範例的 CFG 如下：

![CFG](./cfg.png)

CFG 是大多數分析建立其上的表示法。

還存在許多其他的程式碼表示法。根據您想要執行的分析，每種表示法都有其優缺點。

### 分析 {#analysis}

您可以使用斯立瑟執行的最簡單分析類型是語法分析。

### 語法分析 {#syntax-analysis}

斯立瑟可以瀏覽程式碼的不同元件及其表示法，使用類似模式比對的方法來尋找不一致和缺陷。

例如，以下偵測器會尋找與語法相關的問題：

- [狀態變數遮蔽](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing)：迭代所有狀態變數，並檢查是否有任何變數遮蔽了繼承合約中的變數 ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [不正確的 ERC-20 介面](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface)：尋找不正確的 ERC-20 函式簽章 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### 語意分析 {#semantic-analysis}

與語法分析相反，語意分析會更深入地分析程式碼的「意義」。這個系列包含了一些廣泛的分析類型。它們能產生更強大且有用的結果，但編寫起來也更複雜。

語意分析用於最進階的漏洞偵測。

#### 資料相依性分析 {#fixed-point-computation}

如果存在一條路徑，使得 `variable_a` 的值受到 `variable_b` 的影響，則稱變數 `variable_a` 資料相依於 `variable_b`。

在以下程式碼中，`variable_a` 相依於 `variable_b`：

```solidity
// ...
variable_a = variable_b + 1;
```

由於其中間表示法 (將在後面的章節中討論)，斯立瑟內建了[資料相依性](https://github.com/crytic/slither/wiki/data-dependency)功能。

資料相依性用法的範例可以在[危險的嚴格相等偵測器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)中找到。在這裡，斯立瑟將尋找與危險值的嚴格相等比較 ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))，並會通知使用者應該使用 `>=` 或 `<=` 而不是 `==`，以防止攻擊者困住合約。除此之外，偵測器會將呼叫 `balanceOf(address)` 的回傳值視為危險 ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))，並將使用資料相依性引擎來追蹤其使用情況。

#### 不動點計算 {#fixed-point-computation-2}

如果您的分析瀏覽 CFG 並沿著邊緣前進，您很可能會看到已經造訪過的節點。例如，如果出現如下所示的迴圈：

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

您的分析將需要知道何時停止。這裡有兩個主要策略：(1) 對每個節點迭代有限次數，(2) 計算所謂的_不動點 (fixpoint)_。不動點基本上意味著分析此節點不會提供任何有意義的資訊。

使用不動點的範例可以在重入偵測器中找到：斯立瑟探索節點，並尋找外部呼叫、對儲存的寫入和讀取。一旦達到不動點 ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))，它就會停止探索，並透過不同的重入模式 ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)、[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)、[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) 分析結果以查看是否存在重入。

使用有效率的不動點計算來編寫分析，需要充分了解分析如何傳播其資訊。

### 中間表示法 {#intermediate-representation}

中間表示法 (IR) 是一種旨在比原始語言更適合靜態分析的語言。斯立瑟將 Solidity 轉換為其專屬的 IR：[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)。

如果您只想編寫基本檢查，則不需要了解 SlithIR。然而，如果您計畫編寫進階的語意分析，它將會派上用場。[SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) 和 [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) 列印程式將幫助您了解程式碼是如何轉換的。

## API 基礎知識 {#api-basics}

斯立瑟有一個 API，可讓您探索合約及其函式的基本屬性。

若要載入程式碼庫：

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### 探索合約與函式 {#exploring-contracts-and-functions}

`Slither` 物件具有：

- `contracts (list(Contract)`：合約清單
- `contracts_derived (list(Contract)`：未被其他合約繼承的合約清單 (合約的子集)
- `get_contract_from_name (str)`：從名稱回傳合約

`Contract` 物件具有：

- `name (str)`：合約名稱
- `functions (list(Function))`：函式清單
- `modifiers (list(Modifier))`：函式清單
- `all_functions_called (list(Function/Modifier))`：合約可觸及的所有內部函式清單
- `inheritance (list(Contract))`：繼承的合約清單
- `get_function_from_signature (str)`：從簽章回傳函式
- `get_modifier_from_signature (str)`：從簽章回傳修飾符 (Modifier)
- `get_state_variable_from_name (str)`：從名稱回傳狀態變數 (StateVariable)

`Function` 或 `Modifier` 物件具有：

- `name (str)`：函式名稱
- `contract (contract)`：宣告該函式的合約
- `nodes (list(Node))`：組成函式/修飾符 CFG 的節點清單
- `entry_point (Node)`：CFG 的進入點
- `variables_read (list(Variable))`：讀取的變數清單
- `variables_written (list(Variable))`：寫入的變數清單
- `state_variables_read (list(StateVariable))`：讀取的狀態變數清單 (variables`read 的子集)
- `state_variables_written (list(StateVariable))`：寫入的狀態變數清單 (variables`written 的子集)
