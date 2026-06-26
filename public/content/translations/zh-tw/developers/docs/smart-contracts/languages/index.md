---
title: "智能合約語言"
description: "兩種主要智能合約語言（Solidity 與 Vyper）的概述與比較。"
lang: zh-tw
---

[以太坊](/)的一大優勢在於，可以使用對開發者相對友善的語言來編寫智能合約。如果你對 Python 或任何[大括號語言 (curly-bracket language)](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) 有經驗，你可以找到語法熟悉的語言。

兩個最活躍且持續維護的語言是：

- Solidity
- Vyper

Remix IDE 提供了一個全面的開發環境，用於建立和測試 Solidity 與 Vyper 合約。[嘗試使用瀏覽器中的 Remix IDE](https://remix.ethereum.org) 開始編寫程式碼。

更有經驗的開發者可能也會想使用 Yul（一種用於[以太坊虛擬機 (EVM)](/developers/docs/evm/) 的中介語言），或是 Yul 的擴充語言 Yul+。

如果你很好奇，並且喜歡協助測試仍在積極開發中的新語言，你可以嘗試使用 Fe，這是一種目前仍處於起步階段的新興智能合約語言。

## 先決條件 {#prerequisites}

具備程式語言（特別是 JavaScript 或 Python）的基礎知識，有助於你理解智能合約語言之間的差異。我們也建議你在深入探討語言比較之前，先了解智能合約的概念。[智能合約簡介](/developers/docs/smart-contracts/)。

## Solidity {#solidity}

- 用於實作智能合約的物件導向高階語言。
- 受 C++ 影響最深的大括號語言。
- 靜態型別（變數的型別在編譯時就已確定）。
- 支援：
  - 繼承（你可以擴充其他合約）。
  - 函式庫（你可以建立可重複使用的程式碼，並從不同的合約中呼叫——就像其他物件導向程式語言中靜態類別裡的靜態函式）。
  - 複雜的使用者自訂型別。

### 重要連結 {#important-links}

- [文件](https://docs.soliditylang.org/en/latest/)
- [Solidity 語言入口網站](https://soliditylang.org/)
- [Solidity 範例](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter 聊天室](https://gitter.im/ethereum/solidity)（橋接至 [Solidity Matrix 聊天室](https://matrix.to/#/#ethereum_solidity:gitter.im)）
- [備忘單](https://reference.auditless.com/cheatsheet)
- [Solidity 部落格](https://blog.soliditylang.org/)
- [Solidity 推特](https://twitter.com/solidity_lang)

### 範例合約 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 「public」關鍵字讓變數
    // 可以從其他合約存取
    address public minter;
    mapping (address => uint) public balances;

    // 事件允許客戶端對特定的
    // 您宣告的合約變更做出反應
    event Sent(address from, address to, uint amount);

    // 建構子程式碼只會在合約
    // 建立時執行
    constructor() {
        minter = msg.sender;
    }

    // 將一定數量的新建代幣發送到一個地址
    // 只能由合約建立者呼叫
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 發送一定數量的現有代幣
    // 從任何呼叫者到一個地址
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

這個範例應該能讓你對 Solidity 合約語法有初步的了解。如需函式與變數的更詳細說明，[請參閱文件](https://docs.soliditylang.org/en/latest/contracts.html)。

## Vyper {#vyper}

- 具備 Python 風格的程式語言
- 強型別
- 編譯器程式碼精簡且易於理解
- 高效的位元組碼生成
- 刻意減少功能（相較於 Solidity），旨在讓合約更安全且更容易稽核。Vyper 不支援：
  - 修飾符 (Modifiers)
  - 繼承
  - 行內組合語言 (Inline assembly)
  - 函式多載 (Function overloading)
  - 運算子多載 (Operator overloading)
  - 遞迴呼叫
  - 無限長度迴圈
  - 二進位定點數 (Binary fixed points)

如需更多資訊，[請閱讀 Vyper 的設計理念](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要連結 {#important-links-1}

- [文件](https://vyper.readthedocs.io)
- [Vyper 範例](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [更多 Vyper 範例](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper 社群 Discord 聊天室](https://discord.gg/SdvKC79cJk)
- [備忘單](https://reference.auditless.com/cheatsheet)
- [Vyper 的智能合約開發框架與工具](/developers/docs/programming-languages/python/)
- [VyperPunk - 學習保護與駭入 Vyper 智能合約](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper 開發中心](https://github.com/zcor/vyper-dev)
- [Vyper 精選智能合約範例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper 精選資源](https://github.com/spadebuilders/awesome-vyper)

### 範例 {#example}

```python
# 公開拍賣

# 拍賣參數
# 受益人從最高出價者那裡收到資金
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# 拍賣的當前狀態
highestBidder: public(address)
highestBid: public(uint256)

# 在結束時設為 true，不允許任何更改
ended: public(bool)

# 追蹤已退款的出價，以便我們可以遵循提款模式
pendingReturns: public(HashMap[address, uint256])

# 建立一個簡單的拍賣，競標時間為 `_bidding_time`
# 秒，代表
# 受益人地址 `_beneficiary`。
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# 使用與此交易一起發送的
# 價值對拍賣進行出價。
# 只有在未贏得拍賣的情況下
# 才會退還該價值。
@external
@payable
def bid():
    # 檢查競標期是否已結束。
    assert block.timestamp < self.auctionEnd
    # 檢查出價是否夠高
    assert msg.value > self.highestBid
    # 追蹤前一個最高出價者的退款
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 追蹤新的最高出價
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 提取先前退還的出價。這裡使用提款模式
# 是為了避免安全問題。如果退款直接
# 作為 bid() 的一部分發送，惡意出價合約可能會阻擋
# 這些退款，從而阻擋新的更高出價進入。
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# 結束拍賣並將最高出價發送
# 給受益人。
@external
def endAuction():
    # 這是一個很好的準則，將與
    # 其他合約互動的函式（即它們呼叫函式或發送以太幣）
    # 結構化為三個階段：
    # 1. 檢查條件
    # 2. 執行動作（可能會改變條件）
    # 3. 與其他合約互動
    # 如果這些階段混合在一起，另一個合約可能會回呼
    # 到當前合約中並修改狀態，或導致
    # 效果（以太幣支付）被執行多次。
    # 如果內部呼叫的函式包含與外部
    # 合約的互動，它們也必須被視為與
    # 外部合約的互動。

    # 1. 條件
    # 檢查是否已達到拍賣結束時間
    assert block.timestamp >= self.auctionEnd
    # 檢查此函式是否已被呼叫
    assert not self.ended

    # 2. 效果
    self.ended = True

    # 3. 互動
    send(self.beneficiary, self.highestBid)
```

這個範例應該能讓你對 Vyper 合約語法有初步的了解。如需函式與變數的更詳細說明，[請參閱文件](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## Yul 與 Yul+ {#yul}

如果你是以太坊的新手，且尚未用智能合約語言編寫過任何程式碼，我們建議從 Solidity 或 Vyper 開始。只有在你熟悉智能合約安全最佳實務以及使用 EVM 的具體細節後，再考慮研究 Yul 或 Yul+。

**Yul**

- 以太坊的中介語言。
- 支援 [EVM](/developers/docs/evm) 與 [Ewasm](https://github.com/ewasm)（一種以太坊風格的 WebAssembly），其設計目的是成為這兩個平台皆可使用的共同基礎。
- 適合用於高階最佳化階段，能同時為 EVM 與 Ewasm 平台帶來同等效益。

**Yul+**

- Yul 的低階、高效率擴充語言。
- 最初是為[樂觀 Rollup](/developers/docs/scaling/optimistic-rollups/) 合約所設計。
- Yul+ 可以被視為 Yul 的實驗性升級提案，為其新增了多項功能。

### 重要連結 {#important-links-2}

- [Yul 文件](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 文件](https://github.com/fuellabs/yulp)
- [Yul+ 介紹文章](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 範例合約 {#example-contract-2}

以下簡單範例實作了一個次方函式。可以使用 `solc --strict-assembly --bin input.yul` 進行編譯。該範例應儲存在 input.yul 檔案中。

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

如果你對智能合約已經非常有經驗，可以在[這裡](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)找到以 Yul 實作的完整 ERC-20 範例。

## Fe {#fe}

- 用於以太坊虛擬機 (EVM) 的靜態型別語言。
- 受到 Python 與 Rust 的啟發。
- 旨在易於學習——即使是對以太坊生態系不熟悉的開發者也能輕鬆上手。
- Fe 的開發仍處於早期階段，該語言於 2021 年 1 月發布了 Alpha 版本。

### 重要連結 {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe 發布公告](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 路線圖](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord 聊天室](https://discord.com/invite/ywpkAXFjZH)
- [Fe 推特](https://twitter.com/official_fe)

### 範例合約 {#example-contract-3}

以下是以 Fe 實作的簡單合約。

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## 如何選擇 {#how-to-choose}

就如同其他程式語言一樣，這主要取決於為合適的工作選擇合適的工具，以及個人的偏好。

如果你還沒有嘗試過任何一種語言，以下是一些可以考慮的因素：

### Solidity 有什麼優點？ {#solidity-advantages}

- 如果你是初學者，市面上有許多教學與學習工具。詳情請見[透過寫程式學習](/developers/learning-tools/)章節。
- 具備良好的開發者工具。
- Solidity 擁有龐大的開發者社群，這意味著你通常能很快找到問題的解答。

### Vyper 有什麼優點？ {#vyper-advatages}

- 對於想編寫智能合約的 Python 開發者來說，這是一個很好的入門方式。
- Vyper 的功能較少，非常適合用來快速建立想法的原型。
- Vyper 旨在易於稽核，並盡可能提高人類可讀性。

### Yul 與 Yul+ 有什麼優點？ {#yul-advantages}

- 簡單且功能強大的低階語言。
- 允許更接近原生的 EVM，這有助於最佳化合約的燃料 (gas) 使用量。

## 語言比較 {#language-comparisons}

關於基本語法、合約生命週期、介面、運算子、資料結構、函式、控制流程等方面的比較，請查看這份 [Auditless 備忘單](https://reference.auditless.com/cheatsheet/)。

## 延伸閱讀 {#further-reading}

- [歐本齊柏林 (OpenZeppelin) 的 Solidity 合約函式庫](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity 範例](https://solidity-by-example.org)