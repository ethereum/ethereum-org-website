---
title: "智慧型合約的程式語言"
description: "Solidity 及 Vyper：兩種智慧型合約常用語言的概觀與比較。"
lang: zh-tw
---

以太坊一大好處是，對開發者而言，編寫智慧型合約的語言相對簡單。 若您有 Python 或任何[花括號語言](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)的使用經驗，您就能找到語法熟悉的語言。

兩種最熱門、最受管理的語言為：

- Solidity
- Vyper

Remix 整合開發環境提供一個全面的開發環境，用於透過 Solidity 和 Vyper 語言建立和測試合約。 [試用瀏覽器內的 Remix IDE](https://remix.ethereum.org) 開始編寫程式。

經驗更豐富的開發者可能也會想使用 Yul (一種 [Ethereum Virtual Machine](/developers/docs/evm/) 的中介語言)，或 Yul+ (Yul 的擴充)。

若你有興趣，且想協助測試還處於大力開發階段的新語言，可以實驗仍在發展初期的新興智慧型合約語言 Fe。

## 先決條件 {#prerequisites}

如果已經有編程語言的知識，特別是 JavaScript 或 Python，可以幫助你瞭解智慧型合約語言的差異。 同時，我們建議你在深入理解語言差異之前，先理解智慧型合約的概念。 [智能合約簡介](/developers/docs/smart-contracts/)。

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
- [Solidity 範例](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter 聊天室](https://gitter.im/ethereum/solidity)橋接到 [Solidity Matrix 聊天室](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [快捷手冊](https://reference.auditless.com/cheatsheet)
- [Solidity 部落格](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### 合約範例 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 「public」關鍵字使變數
    // 可從其他合約存取
    address public minter;
    mapping (address => uint) public balances;

    // 事件讓用戶端對您宣告的
    // 特定合約變更做出反應
    event Sent(address from, address to, uint amount);

    // 建構函式程式碼只會在合約
    // 建立時執行
    constructor() {
        minter = msg.sender;
    }

    // 傳送一定數量的新代幣到某個地址
    // 只能由合約建立者呼叫
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 從任何呼叫者傳送一定數量的現有代幣
    // 到某個地址
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "餘額不足。");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

這個範例應該能讓你瞭解 Solidity 的合約語法。 關於函式和變數的詳細說明，[請參閱文件](https://docs.soliditylang.org/en/latest/contracts.html)。

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

更多資訊，[請閱讀 Vyper 設計理念](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要連結 {#important-links-1}

- [文件](https://vyper.readthedocs.io)
- [Vyper 範例](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [更多 Vyper 範例](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper 社群 Discord 聊天室](https://discord.gg/SdvKC79cJk)
- [快捷手冊](https://reference.auditless.com/cheatsheet)
- [Vyper 智能合約開發框架與工具](/developers/docs/programming-languages/python/)
- [VyperPunk - 學習如何保護與攻擊 Vyper 智能合約](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper 開發中心](https://github.com/zcor/vyper-dev)
- [Vyper 精選智能合約範例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper 精選資源](https://github.com/spadebuilders/awesome-vyper)

### 範例 {#example}

```python
# 公開拍賣

# 拍賣參數

# 受益人從最高出價者收到款項

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# 目前拍賣狀態

highestBidder: public(address)
highestBid: public(uint256)

# 結束時設為 true，不允許任何變更

ended: public(bool)

# 追蹤已退款的出價，以便遵循提款模式

pendingReturns: public(HashMap[address, uint256])

# 建立一個簡單的拍賣，競標時間為 `_bidding_time`

# 秒，代表受益人地址 `_beneficiary`。

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# 以與此交易一起傳送的價值

# 參與競標。

# 只有在未贏得拍賣時，

# 價值才會被退還。

@external
@payable
def bid():
    # 檢查競標期是否結束。
    assert block.timestamp < self.auctionEnd
    # 檢查出價是否夠高
    assert msg.value > self.highestBid
    # 追蹤前一個最高出價者的退款
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 追蹤新的最高出價
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 提領先前已退款的出價。這裡使用提款模式

# 以避免安全問題。如果退款是直接

# 作為 bid() 的一部分傳送，惡意的競標合約可能會阻止

# 這些退款，從而阻止新的更高出價進入。

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# 結束拍賣並將最高出價

# 傳送給受益人。

@external
def endAuction():
    # 將與其他合約互動的函式 (即呼叫函式或傳送以太幣)
    # 分為三個階段是一個好的指導方針：
    # 1. 檢查條件
    # 2. 執行動作 (可能改變條件)
    # 3. 與其他合約互動
    # 如果這些階段混雜在一起，其他合約可能會
    # 回呼目前的合約，並修改狀態或導致
    # 效果 (以太幣支付) 被多次執行。
    # 如果內部呼叫的函式包含與外部
    # 合約的互動，它們也必須被視為與
    # 外部合約的互動。

    # 1. 條件
    # 檢查拍賣結束時間是否已到
    assert block.timestamp >= self.auctionEnd
    # 檢查此函式是否已被呼叫過
    assert not self.ended

    # 2. 效果
    self.ended = True

    # 3. 互動
    send(self.beneficiary, self.highestBid)
```

此範例應該能讓你瞭解 Solidity 的合約語法。 關於函式和變數的詳細說明，[請參閱文件](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## Yul 和 Yul+ {#yul}

如果你是以太坊新手並且尚未使用過智慧型合約語言編碼，建議你從 Solidity 或 Vyper 開始。 只有在你熟悉智慧型合約安全性最佳案例和使用以太坊虛擬機的具體細節後，才可投入 Yul 或 Yul+。

**Yul**

- 以太坊的中階語言。
- 支援 [EVM](/developers/docs/evm) 和 [Ewasm](https://github.com/ewasm) (一種以太坊風格的 WebAssembly)，其設計目標是成為這兩個平台可用的共同基準。
- 高級最佳化階段的優良目標，能使以太坊虛擬機和 eWASM 平台均等受益。

**Yul+**

- Yul 的低階高效延伸語言。
- 最初是為[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)合約所設計。
- Yul+ 可以被視為 Yul 的實驗性升級建議，為其添加新功能。

### 重要連結 {#important-links-2}

- [Yul 文件](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 文件](https://github.com/fuellabs/yulp)
- [Yul+ 介紹文章](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 合約範例 {#example-contract-2}

以下簡單範例採用冪函數。 可以使用 `solc --strict-assembly --bin input.yul` 進行編譯。 這個範例應該
儲存在 input.yul 檔案中。

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

如果您對智能合約已有豐富經驗，可以在[這裡](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)找到 Yul 的完整 ERC20 實作。

## Fe {#fe}

- 用於以太坊虛擬機 (EVM) 的靜態類型語言。
- 受 Python 和 Rust 所啟發。
- 目標是讓以太坊生態系統的新手開發者，都能輕鬆學習這門語言。
- Fe 還處於早期開發階段，其 Alpha 版本於 2021 年 1 月推出。

### 重要連結 {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe 公告](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
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

- 如果你是初學者，有不少使用教學和學習工具。 更多相關資訊，請參閱[透過編碼學習](/developers/learning-tools/)一節。
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

若要比較基本語法、合約生命週期、介面、運算子、資料結構、函式、控制流程等，請參閱這份 [Auditless 快捷手冊](https://reference.auditless.com/cheatsheet/)

## 延伸閱讀 {#further-reading}

- [OpenZeppelin 的 Solidity 合約庫](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity 範例](https://solidity-by-example.org)
