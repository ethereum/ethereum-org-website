---
title: "Python 開發者以太坊指南（第一部分）"
description: "以太坊開發簡介，特別適合具備 Python 程式語言知識的開發者"
author: "馬克·加羅"
lang: zh-tw
tags: ["Python", "web3.py"]
skill: beginner
breadcrumb: "使用 Python 開發以太坊"
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

所以，你聽說過以太坊，並準備好一探究竟了嗎？本文將快速介紹一些區塊鏈基礎知識，然後帶你與模擬的以太坊節點進行互動：讀取區塊資料、檢查帳戶餘額以及發送交易。在此過程中，我們將強調傳統應用程式建置方式與這種全新的去中心化典範之間的差異。

## （軟性）先決條件 {#soft-prerequisites}

本文希望能讓廣大開發者都能輕鬆理解。雖然會涉及 [Python 工具](/developers/docs/programming-languages/python/)，但它們只是傳達概念的媒介——如果你不是 Python 開發者也沒關係。不過，我會假設你已經具備一些基礎知識，這樣我們就能快速進入以太坊的特定內容。

假設條件：

- 你熟悉終端機的基本操作，
- 你寫過幾行 Python 程式碼，
- 你的電腦上已安裝 Python 3.6 或更高版本（強烈建議使用[虛擬環境](https://realpython.com/effective-python-environment/#virtual-environments)），並且
- 你使用過 Python 的套件安裝程式 `pip`。
  再說一次，如果上述條件不符，或者你不打算重現本文中的程式碼，你應該還是能順利跟上進度。

## 區塊鏈簡介 {#blockchains-briefly}

描述以太坊的方式有很多種，但其核心是一個區塊鏈。區塊鏈由一系列區塊組成，所以我們從這裡開始。簡單來說，以太坊區塊鏈上的每個區塊只是一些中繼資料和一份交易清單。以 JSON 格式表示，它看起來像這樣：

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

每個[區塊](/developers/docs/blocks/)都有一個指向前一個區塊的參考；`parentHash` 只是前一個區塊的雜湊值。

<FeaturedText>注意：以太坊經常使用<a href="https://wikipedia.org/wiki/Hash_function">雜湊函式</a>來產生固定大小的值（「雜湊」）。雜湊在以太坊中扮演著重要角色，但你現在可以放心地將它們視為唯一識別碼。</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_區塊鏈本質上是一個鏈結串列；每個區塊都有一個指向前一個區塊的參考。_

這種資料結構並不新奇，但管理網路的規則（即點對點協定）卻很新穎。這裡沒有中央權威機構；點對點網路必須協作以維持網路運作，並競爭決定將哪些交易納入下一個區塊。因此，當你想匯錢給朋友時，你需要將該交易廣播到網路，然後等待它被納入即將產生的區塊中。

區塊鏈驗證資金是否確實從一個使用者發送到另一個使用者的唯一方法，是使用該區塊鏈原生的（即由其創建和管理的）貨幣。在以太坊中，這種貨幣被稱為以太幣，而以太坊區塊鏈包含帳戶餘額的唯一官方紀錄。

## 全新典範 {#a-new-paradigm}

這個全新的去中心化技術堆疊催生了新的開發者工具。許多程式語言都有這類工具，但我們將從 Python 的角度來探討。重申一次：即使 Python 不是你首選的語言，跟上進度也不會有太大困難。

想要與以太坊互動的 Python 開發者很可能會使用 [Web3.py](https://web3py.readthedocs.io/)。Web3.py 是一個函式庫，它大幅簡化了連接以太坊節點以及從中發送和接收資料的方式。

<FeaturedText>注意：「以太坊節點」和「以太坊客戶端」通常交替使用。無論哪種情況，它都指的是以太坊網路參與者所執行的軟體。該軟體可以讀取區塊資料、在鏈上新增區塊時接收更新、廣播新交易等等。嚴格來說，客戶端是軟體，而節點是執行該軟體的電腦。</FeaturedText>

[以太坊客戶端](/developers/docs/nodes-and-clients/)可以設定為透過 [IPC](https://wikipedia.org/wiki/Inter-process_communication)、HTTP 或 Websockets 進行連線，因此 Web3.py 需要反映此設定。Web3.py 將這些連線選項稱為**提供者 (providers)**。你需要選擇這三個提供者之一，將 Web3.py 實例與你的節點連結。

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_設定以太坊節點和 Web3.py 透過相同的協定進行通訊，例如本圖中的 IPC。_

一旦 Web3.py 設定正確，你就可以開始與區塊鏈互動。以下是幾個 Web3.py 的使用範例，作為接下來內容的預覽：

```python
# 讀取區塊資料：
w3.eth.get_block('latest')

# 發送一筆交易：
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## 安裝 {#installation}

在本教學中，我們只會在 Python 直譯器中操作。我們不會建立任何目錄、檔案、類別或函式。

<FeaturedText>注意：在以下範例中，以 `$` 開頭的指令應在終端機中執行。（請勿輸入 `$`，它僅表示該行的開頭。）</FeaturedText>

首先，安裝 [IPython](https://ipython.org/) 以獲得一個易於探索的使用者友善環境。IPython 提供 Tab 鍵自動補齊等功能，讓你更容易了解 Web3.py 中可用的操作。

```bash
pip install ipython
```

Web3.py 以 `web3` 的名稱發布。請按如下方式安裝：

```bash
pip install web3
```

還有一件事——我們稍後將模擬一個區塊鏈，這需要幾個額外的相依套件。你可以透過以下方式安裝它們：

```bash
pip install 'web3[tester]'
```

一切準備就緒！

注意：`web3[tester]` 套件最高支援至 Python 3.10.xx 版本。

## 啟動沙盒 {#spin-up-a-sandbox}

在終端機中執行 `ipython` 來開啟一個新的 Python 環境。這類似於執行 `python`，但附帶了更多實用功能。

```bash
ipython
```

這將印出一些關於你正在執行的 Python 和 IPython 版本的資訊，然後你應該會看到一個等待輸入的提示字元：

```python
In [1]:
```

你現在看到的是一個互動式 Python shell。本質上，它是一個供你遊玩的沙盒。如果你已經進行到這一步，是時候匯入 Web3.py 了：

```python
In [1]: from web3 import Web3
```

## 介紹 Web3 模組 {#introducing-the-web3-module}

除了作為通往以太坊的閘道器之外，[Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) 模組還提供了一些便利的函式。讓我們來探索幾個。

在以太坊應用程式中，你通常需要轉換貨幣面額。Web3 模組為此提供了幾個輔助方法：[from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) 和 [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei)。

<FeaturedText>
注意：眾所周知，電腦在處理小數運算方面表現不佳。為了解決這個問題，開發者通常以美分來儲存美元金額。例如，價格為 5.99 美元的商品可能會在資料庫中儲存為 599。

在處理<b>以太幣</b>交易時也使用了類似的模式。然而，以太幣不是兩位小數，而是 18 位！以太幣的最小面額稱為 <b>Wei</b>，因此這是在發送交易時指定的值。

1 ether = 1000000000000000000 wei

1 wei = 0.000000000000000001 ether

</FeaturedText>

嘗試將一些值轉換為 Wei 或從 Wei 轉換回來。請注意，在以太幣和 Wei 之間[有許多面額的名稱](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations)。其中最著名的是 **Gwei**，因為交易手續費通常以它來表示。

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 模組上的其他公用程式方法包括資料格式轉換器（例如 [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)）、地址輔助工具（例如 [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)）和雜湊函式（例如 [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)）。其中許多內容將在本系列的後續部分中介紹。要檢視所有可用的方法和屬性，請利用 IPython 的自動補齊功能：輸入 `Web3`. 並在句點後按兩次 Tab 鍵。

## 與鏈對話 {#talk-to-the-chain}

這些便利的方法很棒，但讓我們繼續探討區塊鏈。下一步是設定 Web3.py 以與以太坊節點進行通訊。在這裡，我們可以選擇使用 IPC、HTTP 或 Websocket 提供者。

我們不會採用這種方式，但使用 HTTP 提供者的完整工作流程範例可能如下所示：

- 下載一個以太坊節點，例如 [Geth](https://geth.ethereum.org/)。
- 在一個終端機視窗中啟動 Geth，並等待它同步網路。預設的 HTTP 連接埠是 `8545`，但可以進行設定。
- 告訴 Web3.py 透過 HTTP 連接到 `localhost:8545` 上的節點。
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- 使用 `w3` 實例與節點互動。

雖然這是一種「真實」的作法，但同步過程需要數小時，如果你只是想要一個開發環境，這是不必要的。為此，Web3.py 提供了第四種提供者：**EthereumTesterProvider**。這個測試提供者連結到一個模擬的以太坊節點，具有寬鬆的權限和假貨幣供你遊玩。

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider 連接到模擬節點，對於快速建立開發環境非常方便。_

這個模擬節點稱為 [eth-tester](https://github.com/ethereum/eth-tester)，我們在執行 `pip install web3[tester]` 指令時已經安裝了它。設定 Web3.py 使用這個測試提供者非常簡單：

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

現在你準備好在鏈上衝浪了！其實沒人這麼說，這是我瞎編的。讓我們來快速瀏覽一下。

## 快速導覽 {#the-quick-tour}

首先，進行基本檢查：

```python
In [5]: w3.is_connected()
Out[5]: True
```

由於我們使用的是測試提供者，這不是一個非常有價值的測試，但如果它確實失敗了，很可能是你在實例化 `w3` 變數時輸入錯誤。請仔細檢查你是否包含了內層括號，即 `Web3.EthereumTesterProvider()`。

## 導覽站點 #1：[帳戶](/developers/docs/accounts/) {#tour-stop-1-accounts}

為了方便起見，測試提供者建立了一些帳戶，並預先載入了測試以太幣。

首先，讓我們看看這些帳戶的清單：

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

如果你執行這個指令，你應該會看到一個包含十個以 `0x` 開頭的字串清單。每一個都是一個**公開地址**，在某些方面類似於支票帳戶的帳號。你會將這個地址提供給想要發送以太幣給你的人。

如前所述，測試提供者已在每個帳戶中預先載入了一些測試以太幣。讓我們看看第一個帳戶裡有多少錢：

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

好多個零！在你開心地跑去假銀行之前，回想一下前面關於貨幣面額的課程。以太幣的值以最小面額 Wei 表示。將其轉換為以太幣：

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

一百萬個測試以太幣——還是相當不錯的。

## 導覽站點 #2：區塊資料 {#tour-stop-2-block-data}

讓我們來看看這個模擬區塊鏈的狀態：

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

關於區塊會回傳很多資訊，但這裡只指出幾點：

- 區塊編號為零——無論你多久前設定了測試提供者。與真實的以太坊網路每 12 秒新增一個新區塊不同，這個模擬環境會一直等待，直到你給它一些工作做。
- `transactions` 是一個空清單，原因相同：我們還沒有做任何事情。這第一個區塊是一個**空區塊**，只是為了啟動這條鏈。
- 請注意，`parentHash` 只是一堆空位元組。這表示它是鏈中的第一個區塊，也稱為**創世區塊**。

## 導覽站點 #3：[交易](/developers/docs/transactions/) {#tour-stop-3-transactions}

在有待處理交易之前，我們會一直停留在區塊零，所以讓我們給它一筆交易。將一些測試以太幣從一個帳戶發送到另一個帳戶：

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

通常在這個時候，你需要等待幾秒鐘，讓你的交易被納入新區塊中。完整的過程大致如下：

1. 提交交易並保留交易雜湊值。在包含該交易的區塊被建立並廣播之前，該交易處於「待處理」狀態。
   `tx_hash = w3.eth.send_transaction({ … })`
2. 等待交易被納入區塊中：
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. 繼續應用程式邏輯。要檢視成功的交易：
   `w3.eth.get_transaction(tx_hash)`

我們的模擬環境會立即將交易新增到新區塊中，因此我們可以立即檢視該交易：

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

你會在這裡看到一些熟悉的細節：`from`、`to` 和 `value` 欄位應該與我們呼叫 `send_transaction` 時的輸入相符。另一個令人安心的細節是，這筆交易作為第一筆交易（`'transactionIndex': 0`）被納入了第 1 號區塊中。

我們也可以透過檢查涉及的兩個帳戶的餘額，輕鬆驗證這筆交易是否成功。應該有三個以太幣從一個帳戶轉移到了另一個帳戶。

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

後者看起來不錯！餘額從 1,000,000 變成了 1,000,003 顆以太幣。但是第一個帳戶發生了什麼事？它似乎損失了略多於三顆以太幣。唉，天下沒有白吃的午餐，使用以太坊公共網路需要你補償同儕所提供的支援。提交交易的帳戶被扣除了一小筆交易手續費——這筆費用是消耗的燃料量（ETH 轉帳為 21000 單位燃料）乘以根據網路活動而變化的基礎費用，再加上支付給將交易納入區塊的驗證者的小費。

了解更多關於[燃料](/developers/docs/gas/#post-london)的資訊

<FeaturedText>注意：在公共網路上，交易手續費是可變的，取決於網路需求以及你希望交易被處理的速度。如果你對費用的計算方式感興趣，請參閱我之前關於<a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">交易如何被納入區塊</a>的文章。</FeaturedText>

## 喘口氣 {#and-breathe}

我們已經進行了一段時間，所以現在似乎是個休息的好時機。探索之旅還在繼續，我們將在本系列的第二部分繼續深入。接下來的一些概念包括：連接到真實節點、智能合約和代幣。有後續問題嗎？請讓我知道！你的回饋將影響我們接下來的方向。歡迎透過[推特](https://twitter.com/wolovim)提出請求。