---
title: 智慧型合約語言
description: Solidity 及 Vyper：兩種智慧型合約常用語言的概觀與比較。
lang: zh-tw
---

以太坊一大好處是，對開發者而言，編寫智慧型合約的語言相對簡單。 如你熟悉 Python 或任何[大括號語言](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)，會發現其實他們的語法非常相似。

兩種最熱門、最受管理的語言為：

- Solidity
- Vyper

Remix 整合開發環境提供一個全面的開發環境，用於透過 Solidity 和 Vyper 語言建立和測試合約。 [嘗試使用瀏覽器內的 Remix IDE](https://remix.ethereum.org) 開始編碼。

經驗更豐富的開發者可能也會想使用 Yul，這是[以太坊虛擬機](/developers/docs/evm/)的中階語言，或是使用 Yul 的延伸語言 Yul+。

若你有興趣，且想協助測試還處於大力開發階段的新語言，可以實驗仍在發展初期的新興智慧型合約語言 Fe。

## 基本資訊 {#prerequisites}

如果已經有編程語言的知識，特別是 JavaScript 或 Python，可以幫助你瞭解智慧型合約語言的差異。 同時，我們建議你在深入理解語言差異之前，先理解智慧型合約的概念。 [智慧型合約簡介](/developers/docs/smart-contracts/)。

## Solidity {#solidity}

- 實作智慧型合約的物件導向高階語言。
- 深受 C++ 語言影響的大括號語言。
- 靜態類型（編譯時已知變數類型）。
- 支援：
  - 繼承（你可以延展其他合約）。
  - 資料庫（你可以建立能從不同的合約調用的可重複使用代碼，如同其他物件導向程式語言中的靜態類別靜態函數）。
  - 複雜的使用者定義類型。

### 重要連結 {#important-links}

- [文件](https://docs.soliditylang.org/en/latest/)
- [Solidity 語言入口網站](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [Github](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) 橋接至 [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [懶人包](https://reference.auditless.com/cheatsheet)
- [Solidity 部落格](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### 合約範例 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 關鍵字 "public" 使變量可以被其它合約訪問
    address public minter;
    mapping (address => uint) public balances;

    // 事件Events允許客戶讀取你聲明的特定合約變更。
    event Sent(address from, address to, uint amount);

    // Constructor構造代碼僅在合約創建時執行一次。
    constructor() {
        minter = msg.sender;
    }

    // 發送一定數量新創建的代幣到某個地址。
    // 只有合約創建者可以調用。
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 發送一定量已經存在的代幣
    // 從調用者到任意地址
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

這個範例應該能讓你瞭解 Solidity 的合約語法。 關於函數和變數的詳細描述，[請參閱文件](https://docs.soliditylang.org/en/latest/contracts.html)。

## Vyper {#vyper}

- Python 程式語言
- 強輸入類型
- 精巧易懂的編譯器代碼
- 有效率的產生位元組碼
- 為了提升合約安全性並更容易審核，特意提供比 Solidity 更少功能。 Vyper 不支援：
  - 修飾符
  - 繼承
  - 行內組譯
  - 函數重載
  - 運算子重載
  - 遞迴調用
  - 無限長度迴圈
  - 二進制定點

如需更多資訊，[請參閱 Vyper 原理](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要鏈結 {#important-links-1}

- [文件](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [更多 Vyper by Example](https://vyper-by-example.org/)
- [Github](https://github.com/vyperlang/vyper)
- [Vyper 社群 Discord 聊天](https://discord.gg/SdvKC79cJk)
- [懶人包](https://reference.auditless.com/cheatsheet)
- [Vyper 的智慧型合約開發框架與工具](/developers/docs/programming-languages/python/)
- [VyperPunk：瞭解如何保障與駭客攻擊 Vyper 智慧型合約](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples：Vyper 漏洞範例](https://www.vyperexamples.com/reentrancy)
- [支援開發的 Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper 最熱門的智慧型合約範例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [出色的 Vyper 精選資源](https://github.com/spadebuilders/awesome-vyper)

### 範例 {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

此範例應該能讓你瞭解 Solidity 的合約語法。 關於函數和變數的詳細描述，[請參閱文件](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## Yul 和 Yul+ {#yul}

如果你是以太坊新手並且尚未使用過智慧型合約語言編碼，建議你從 Solidity 或 Vyper 開始。 只有在你熟悉智慧型合約安全性最佳案例和使用以太坊虛擬機的具體細節後，才可投入 Yul 或 Yul+。

**Yul**

- 以太坊的中階語言。
- 支援[以太坊虛擬機](/developers/docs/evm)和 [eWASM](https://github.com/ewasm)，一種以太坊風格的 WebAssembly，目的在於成為兩個平台均可使用的通用工具。
- 高級最佳化階段的優良目標，能使以太坊虛擬機和 eWASM 平台均等受益。

**Yul+**

- Yul 的低階高效延伸語言。
- 最初設計用於[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)合約。
- Yul+ 可以被視為 Yul 的實驗性升級建議，為其添加新功能。

### 重要鏈結 {#important-links-2}

- [Yul 文件](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 文件](https://github.com/fuellabs/yulp)
- [Yul+ 訓練場](https://yulp.fuel.sh/)
- [Yul+ 介紹文章](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 合約範例 {#example-contract-2}

以下簡單範例採用冪函數。 它可以使用 `solc --strict-assembly --bin input.yul` 編譯。 這個範例應該 儲存在 input.yul 檔案中。

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

如果你已經熟悉智慧型合約，可以在[此處](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)找到 Yul 言語的完整 ERC20 實作。

## Fe {#fe}

- 用於以太坊虛擬機 (EVM) 的靜態類型語言。
- 受 Python 和 Rust 所啟發。
- 目標是讓以太坊生態系統的新手開發者，都能輕鬆學習這門語言。
- Fe 還處於早期開發階段，其 Alpha 版本於 2021 年 1 月推出。

### 重要鏈結 {#important-links-3}

- [Github](https://github.com/ethereum/fe)
- [Fe 發布聲明](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 開發藍圖](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord 聊天室](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### 合約範例 {#example-contract-3}

以下為採用 Fe 的簡單合約。

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

與任何其他編程語言一樣，重點在於根據合適的工作與個人偏好選擇正確工具。

如果你還沒有嘗試過任何一種語言，請考慮以下幾點：

### Solidity 的優點是什麼？ {#solidity-advantages}

- 如果你是初學者，有不少使用教學和學習工具。 在[透過編碼學習](/developers/learning-tools/)部分瞭解更多相關資訊。
- 提供優良的開發者工具。
- Solidity 擁有龐大的開發者社群，這表示你很可能會很快找到問題的答案。

### Vyper 的優點是什麼？ {#vyper-advatages}

- 適合想要編寫智慧型合約的 Python 開發者入門。
- Vyper 的功能較少，因此非常適合快速製作創意原型。
- Vyper 的目的是容易審查並盡可能提高人類可讀性。

### Yul 和 Yul+ 的優點是什麼？ {#yul-advantages}

- 簡單而實用的低階語言。
- 允許更接近原始以太坊虛擬機，有助於最佳化合約的燃料使用量。

## 語言比較 {#language-comparisons}

如需瞭解基本語法比較、合約生命週期、介面、運算子、數據結構、功能、控制流程等資訊，請參閱[由 Auditless 編寫的懶人包](https://reference.auditless.com/cheatsheet/)

## 衍生閱讀 {#further-reading}

- [OpenZeppelin 的 Solidity 合約資料庫](https://docs.openzeppelin.com/contracts)
- [Solidity 範例](https://solidity-by-example.org)
