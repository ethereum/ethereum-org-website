---
title: 給 Python 開發者的以太坊介紹，第一部分
description: 以太坊開發介紹，特別適合了解 Python 程式語言的開發人員。
author: Marc Garreau
lang: zh-tw
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

所以，您已經聽說過以太坊，並準備好要深入探索了嗎？ 本文將快速介紹一些區塊鏈基礎知識，然後讓您與一個模擬的以太坊節點互動——讀取區塊資料、檢查帳戶餘額以及傳送交易。 在此過程中，我們將強調傳統的應用程式建置方式與這種新的去中心化範式之間的差異。

## （非強制）先決條件 {#soft-prerequisites}

本文旨在讓廣大開發人員都能輕鬆理解。 [Python 工具](/developers/docs/programming-languages/python/)將會被使用，但它們只是用來傳達概念的載體——如果您不是 Python 開發人員也沒問題。 不過，我會先假設您已經具備一些基礎知識，這樣我們就可以快速進入以太坊專屬的部分。

假設：

- 您能夠操作終端機，
- 您寫過幾行 Python 程式碼，
- 您的電腦上已安裝 Python 3.6 或更高版本（強烈建議使用[虛擬環境](https://realpython.com/effective-python-environment/#virtual-environments)），以及
- 您使用過 `pip`，Python 的套件安裝程式。
  再次強調，即使您不符合上述任何條件，或者不打算重現本文中的程式碼，您仍然可以順利地跟上進度。

## 區塊鏈簡介 {#blockchains-briefly}

描述以太坊的方式有很多種，但其核心是一個區塊鏈。 區塊鏈由一系列的區塊組成，所以讓我們從這裡開始。 簡單來說，以太坊區塊鏈上的每個區塊只包含一些元資料和一個交易列表。 在 JSON 格式中，它看起來像這樣：

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

每個[區塊](/developers/docs/blocks/)都包含對前一個區塊的引用；`parentHash` 就是前一個區塊的哈希。

<FeaturedText>注意：以太坊經常使用<a href="https://wikipedia.org/wiki/Hash_function">哈希函數</a>來產生固定大小的值（「哈希」）。 哈希在以太坊中扮演著重要角色，但目前您可以放心地將它們視為唯一的識別碼。</FeaturedText>

![一個描述區塊鏈的圖表，包含每個區塊內的資料](./blockchain-diagram.png)

_區塊鏈本質上是一個鏈結串列；每個區塊都包含對前一個區塊的引用。_

這種資料結構本身並不是什麼新奇的東西，但管理網路的規則（即點對點協定）卻是全新的。 沒有中心化的權威機構；網路中的對等節點必須合作以維持網路運作，並透過競爭來決定下一個區塊要包含哪些交易。 所以，當您想寄錢給朋友時，您需要將該交易廣播到網路上，然後等待它被包含在即將產生的區塊中。

區塊鏈要驗證金錢確實從一位使用者傳送給另一位使用者，唯一的方法是使用該區塊鏈的原生貨幣（即由該區塊鏈創造和管理的貨幣）。 在以太坊中，這種貨幣稱為以太幣 (ether)，而以太坊區塊鏈是唯一包含帳戶餘額官方記錄的地方。

## 新範式 {#a-new-paradigm}

這個新的去中心化技術堆疊催生了新的開發者工具。 這類工具存在於許多程式語言中，但我們將從 Python 的角度來探討。 重申一次：即使 Python 不是您偏好的語言，跟上本文的內容應該也不會太困難。

想要與以太坊互動的 Python 開發人員很可能會使用 [Web3.py](https://web3py.readthedocs.io/)。 Web3.py 是一個函式庫，它能大幅簡化您連接到以太坊節點，以及從節點傳送和接收資料的方式。

<FeaturedText>注意：「以太坊節點」和「以太坊用戶端」這兩個詞可以互換使用。 無論是哪個詞，指的都是以太坊網路參與者執行的軟體。 這個軟體可以讀取區塊資料、在新區塊加入鏈上時接收更新、廣播新交易等等。 技術上來說，用戶端是軟體，節點是執行軟體的電腦。</FeaturedText>

[以太坊用戶端](/developers/docs/nodes-and-clients/)可以設定為透過 [IPC](https://wikipedia.org/wiki/Inter-process_communication)、HTTP 或 Websocket 進行連線，因此 Web3.py 需要對應此設定。 Web3.py 將這些連線選項稱為**提供者**。 您需要從這三種提供者中選擇一種，將 Web3.py 執行個體與您的節點連結。

![一個圖表，顯示 web3.py 如何使用 IPC 將您的應用程式連接到以太坊節點](./web3py-and-nodes.png)

_設定以太坊節點和 Web3.py 使用相同的協定進行通訊，例如此圖中的 IPC。_

一旦 Web3.py 設定正確，您就可以開始與區塊鏈互動。 以下是一些 Web3.py 的使用範例，作為後續內容的預覽：

```python
# 讀取區塊資料：
w3.eth.get_block('latest')

# 傳送一筆交易：
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## 安裝 {#installation}

在這份逐步教學中，我們只會在 Python 直譯器中操作。 我們不會建立任何目錄、檔案、類別或函式。

<FeaturedText>注意：在下面的範例中，以 `$` 開頭的指令是用於在終端機中執行的。 （請勿輸入 `$`，它只是表示一行的開始。）</FeaturedText>

首先，安裝 [IPython](https://ipython.org/)，這是一個方便探索的使用者友好環境。 IPython 提供了 tab 鍵自動完成等功能，讓您更容易了解 Web3.py 的各種可能性。

```bash
pip install ipython
```

Web3.py 是以 `web3` 的名稱發布的。 安裝方式如下：

```bash
pip install web3
```

還有一件事——我們稍後將模擬一個區塊鏈，這需要額外安裝幾個相依套件。 您可以透過以下方式安裝：

```bash
pip install 'web3[tester]'
```

您已準備就緒！

注意：`web3[tester]` 套件支援到 Python 3.10.xx 版本。

## 啟動沙箱 {#spin-up-a-sandbox}

在終端機中執行 `ipython` 來開啟一個新的 Python 環境。 這和執行 `python` 類似，但提供了更多附加功能。

```bash
ipython
```

這會印出您正在執行的 Python 和 IPython 版本資訊，然後您會看到一個等待輸入的提示符號：

```python
In [1]:
```

您現在看到的是一個互動式 Python shell。 基本上，這是一個可以讓您盡情實驗的沙箱。 如果您已經進行到這一步，是時候匯入 Web3.py 了：

```python
In [1]: from web3 import Web3
```

## Web3 模組介紹 {#introducing-the-web3-module}

除了作為通往以太坊的閘道，[Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) 模組還提供了一些便捷函式。 讓我們來探索其中幾個。

在以太坊應用程式中，您通常需要轉換貨幣單位。 Web3 模組為此提供了幾個輔助方法：[from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) 和 [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei)。

<FeaturedText>
注意：眾所周知，電腦不擅長處理小數運算。 為了解決這個問題，開發人員通常以「分」為單位來儲存美元金額。 例如，價格為 5.99 美元的商品在資料庫中可能會被儲存為 599。

在處理<b>以太幣</b>交易時也使用類似的模式。 然而，以太幣不是兩位小數點，而是 18 位！ 以太幣的最小單位稱為 <b>wei</b>，因此在傳送交易時指定的是這個數值。

1 以太幣 = 1000000000000000000 wei

1 wei = 0.000000000000000001 以太幣

</FeaturedText>

試著在 wei 與其他單位之間轉換一些數值。 請注意，在以太幣和 wei 之間[還有許多單位的名稱](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations)。 其中比較有名的是 **gwei**，因為交易費用通常用它來表示。

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 模組上的其他工具方法包括資料格式轉換器（例如 [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)）、位址輔助工具（例如 [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)）和哈希函數（例如 [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)）。 本系列文章的後續部分將會介紹其中許多內容。 若要查看所有可用的方法和屬性，可以輸入 `Web3` 來利用 IPython 的自動完成功能。 並在句點後按兩次 tab 鍵。

## 與鏈互動 {#talk-to-the-chain}

便捷方法很棒，但讓我們繼續來談談區塊鏈。 下一步是設定 Web3.py 與以太坊節點進行通訊。 在這裡，我們可以選擇使用 IPC、HTTP 或 Websocket 提供者。

我們不會走這條路，但使用 HTTP 提供者的完整工作流程範例如下：

- 下載一個以太坊節點，例如 [Geth](https://geth.ethereum.org/)。
- 在一個終端機視窗中啟動 Geth，並等待它同步網路。 預設的 HTTP 連接埠是 `8545`，但可以自行設定。
- 讓 Web3.py 透過 HTTP 連接到 `localhost:8545` 上的節點。
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- 使用 `w3` 執行個體與節點互動。

雖然這是一種「真實」的作法，但同步過程需要數小時，而且如果您只想要一個開發環境，這並非必要。 為此，Web3.py 提供了第四種提供者：**EthereumTesterProvider**。 這個測試提供者會連結到一個模擬的以太坊節點，它有較寬鬆的權限和可供使用的假貨幣。

![一個圖表，顯示 EthereumTesterProvider 將您的 web3.py 應用程式連結到一個模擬的以太坊節點](./ethereumtesterprovider.png)

_EthereumTesterProvider 會連接到一個模擬節點，對於快速建立開發環境來說非常方便。_

那個模擬節點稱為 [eth-tester](https://github.com/ethereum/eth-tester)，我們在執行 `pip install web3[tester]` 指令時已經將它安裝。 設定 Web3.py 使用此測試提供者非常簡單：

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

現在您準備好在鏈上遨遊了！ 這不是大家會說的話。 我剛才亂編的。 讓我們快速導覽一下。

## 快速導覽 {#the-quick-tour}

首先，做個基本功能檢查：

```python
In [5]: w3.is_connected()
Out[5]: True
```

因為我們使用的是測試提供者，這個測試不是很有價值，但如果它失敗了，很可能是您在實例化 `w3` 變數時打錯了字。 再次檢查您是否包含了內層的括號，即 `Web3.EthereumTesterProvider()`。

## 導覽第一站：[帳戶](/developers/docs/accounts/) {#tour-stop-1-accounts}

為了方便，測試提供者建立了一些帳戶，並預先存入了測試以太幣。

首先，讓我們看看這些帳戶的列表：

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

如果您執行這個指令，您應該會看到一個包含十個以 `0x` 開頭的字串列表。 每個都是一個**公開位址**，在某些方面，類似於支票帳戶的帳號。 您可以將此位址提供給想傳送以太幣給您的人。

如前所述，測試提供者已為每個帳戶預先存入一些測試以太幣。 讓我們來看看第一個帳戶裡有多少錢：

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

好多個零！ 在您笑著把錢存入假銀行之前，回想一下前面關於貨幣單位的課程。 以太幣的數值是以最小單位 wei 來表示的。 將它轉換成以太幣：

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

一百萬測試以太幣——還不賴。

## 導覽第二站：區塊資料 {#tour-stop-2-block-data}

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

一個區塊會傳回很多資訊，但這裡只指出幾點：

- 區塊編號是零——無論您多久之前設定測試提供者都一樣。 與真實的以太坊網路每 12 秒新增一個新區塊不同，這個模擬會等到您給它一些工作才會有動作。
- `transactions` 是一個空列表，原因相同：我們還沒有做任何事。 第一個區塊是**空區塊**，只是為了啟動這條鏈。
- 請注意，`parentHash` 只是一堆空位元組。 這表示它是鏈中的第一個區塊，也稱為**創世區塊**。

## 導覽第三站：[交易](/developers/docs/transactions/) {#tour-stop-3-transactions}

在有待處理的交易之前，我們會一直停在區塊 0，所以讓我們來建立一筆交易。 從一個帳戶傳送幾枚測試以太幣到另一個帳戶：

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

通常這時候您需要等待幾秒鐘，讓您的交易被包含在新區塊中。 完整的過程大致如下：

1. 提交一筆交易並保留交易哈希。 在包含該交易的區塊被建立和廣播之前，該交易是「待處理」狀態。
   `tx_hash = w3.eth.send_transaction({ … })`
2. 等待交易被包含在一個區塊中：
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. 繼續執行應用程式邏輯。 查看成功的交易：
   `w3.eth.get_transaction(tx_hash)`

我們的模擬環境會立即將交易新增到新區塊中，因此我們可以立即查看該交易：

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

您會在這裡看到一些熟悉的詳細資訊：`from`、`to` 和 `value` 欄位應與我們 `send_transaction` 呼叫的輸入相符。 另一個讓人安心的地方是，這筆交易被包含在區塊編號 1 中，作為第一筆交易 (`'transactionIndex': 0`)。

我們也可以透過檢查兩個相關帳戶的餘額來輕鬆驗證這筆交易是否成功。 三枚以太幣應該已經從一個帳戶轉移到另一個帳戶。

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

後者看起來沒錯！ 餘額從 1,000,000 以太幣增加到 1,000,003 以太幣。 但第一個帳戶發生了什麼事？ 它似乎損失了比三枚以太幣多一點的金額。 唉，天下沒有白吃的午餐，使用以太坊公有網路需要您補償其他對等節點所提供的支援。 提交交易的帳戶被扣除了一筆小額交易費用——這筆費用是消耗的 gas 量（一次 ETH 轉帳為 21000 單位 gas）乘以根據網路活動變動的基本費用，再加上給予將交易包含在區塊中的驗證者的小費。

更多關於 [gas](/developers/docs/gas/#post-london) 的資訊

<FeaturedText>注意：在公有網路上，交易費用會根據網路需求以及您希望交易處理的速度而變動。 如果您對費用計算的詳細說明感興趣，請參閱我之前關於<a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">交易如何被包含在區塊中</a>的文章。</FeaturedText>

## 喘口氣 {#and-breathe}

我們已經進行了一段時間，這裡似乎是個休息的好時機。 兔子洞還很深，我們將在本系列的第二部分繼續探索。 即將介紹的概念：連接到真實節點、智慧合約和代幣。 還有其他問題嗎？ 讓我知道！ 您的回饋將影響我們接下來的方向。 歡迎透過 [Twitter](https://twitter.com/wolovim) 提出請求。
