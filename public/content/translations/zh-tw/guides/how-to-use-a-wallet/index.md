---
title: 如何使用錢包
metaTitle: 如何使用以太坊錢包 | 逐步指南
description: 說明如何發送、接收代幣以及連接至 Web3 專案的指南。
lang: zh-tw
---

了解如何操作錢包的所有基本功能。如果你還沒有錢包，請查看我們的[如何建立以太坊帳戶](/guides/how-to-create-an-ethereum-account/)。

## 開啟你的錢包 {#open-your-wallet}

你應該會看到一個儀表板，上面可能會顯示你的餘額，並包含發送和接收代幣的按鈕。

## 接收加密貨幣 {#receive-cryptocurrency}

你想在錢包中接收加密貨幣嗎？

每個以太坊帳戶都有自己的接收地址，這是一串獨特的數字和字母序列。該地址的功能類似於銀行帳號。以太坊地址始終以「0x」開頭。你可以與任何人分享這個地址：這樣做是安全的。

你的地址就像你的住家地址：你需要告訴別人地址是什麼，他們才能找到你。這樣做是安全的，因為你仍然可以用只有你控制的另一把金鑰鎖上前門，這樣即使別人知道你住在哪裡，也無法進入。

你需要向任何想匯款給你的人提供你的公開地址。許多錢包應用程式允許你複製地址或顯示 QR 碼供掃描，以便更輕鬆地使用。避免手動輸入任何以太坊地址。這很容易導致筆誤並遺失資金。

不同的應用程式可能會有所不同或使用不同的語言，但如果你嘗試轉帳，它們應該會引導你完成類似的流程。

1. 開啟你的錢包應用程式。
2. 點擊「接收」（或類似字眼的選項）。
3. 將你的以太坊地址複製到剪貼簿。
4. 向發送者提供你的接收以太坊地址。

## 發送加密貨幣 {#send-cryptocurrency}

你想發送 ETH 到另一個錢包嗎？

1. 開啟你的錢包應用程式。
2. 取得接收地址，並確保你連接到與接收者相同的網路。
3. 輸入接收地址或用相機掃描 QR 碼，這樣你就不必手動輸入地址。
4. 點擊錢包中的「發送」按鈕（或類似字眼的替代選項）。

![Send field for crypto address](./send.png)
<br/>

5. 許多資產（如 DAI 或 USDC）存在於多個網路上。轉帳加密貨幣代幣時，請確保接收者使用的網路與你相同，因為它們不可互換。
6. 確保你的錢包有足夠的 ETH 來支付交易手續費，該費用會根據網路狀況而有所不同。大多數錢包會自動將建議的費用添加到交易中，然後你可以進行確認。
7. 一旦你的交易被處理，相應的加密貨幣金額將顯示在接收者的帳戶中。這可能需要幾秒鐘到幾分鐘的時間，具體取決於目前網路的使用量。

## 連接至專案 {#connecting-to-projects}

你的地址在所有以太坊專案中都會是相同的。你不需要在任何專案上單獨註冊。一旦你擁有錢包，你就可以連接到任何以太坊專案，而無需任何額外資訊。不需要電子郵件或任何其他個人資訊。

1. 造訪任何專案的網站。
2. 如果專案的登陸頁面只是專案的靜態描述，你應該能夠點擊選單中的「開啟應用程式」按鈕，這將引導你進入實際的網路應用程式。
3. 進入應用程式後，點擊「連接」。

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. 從提供的選項清單中選擇你的錢包。如果你看不到你的錢包，它可能隱藏在「WalletConnect」選項下。

![Selecting from a list of wallets to connect with](./connect2.png)

5. 在你的錢包中確認簽章請求以建立連接。**簽署此訊息不應要求花費任何 ETH**。
6. 就是這樣！開始使用應用程式吧。你可以在我們的[去中心化應用程式 (dapp) 頁面](/apps/#explore)上找到一些有趣的專案。
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>想了解更多嗎？</div>
  <ButtonLink href="/guides/">
    查看我們的其他指南
  </ButtonLink>
</AlertContent>
</Alert>

## 常見問題 {#frequently-asked-questions}

### 如果我擁有一個 ETH 地址，我在其他區塊鏈上也擁有相同的地址嗎？ {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

你可以在所有與 EVM 相容的區塊鏈上使用相同的地址（如果你擁有帶有助記詞的錢包類型）。這份[清單](https://chainlist.org/)將向你顯示哪些區塊鏈可以使用相同的地址。某些區塊鏈（如比特幣）實作了一套完全獨立的網路規則，你將需要一個不同格式的不同地址。如果你擁有智能合約錢包，你應該查看其產品網站，以獲取有關支援哪些區塊鏈的更多資訊。

### 我可以在多個裝置上使用相同的地址嗎？ {#can-i-use-the-same-address-on-multiple-devices}

是的，你可以在多個裝置上使用相同的地址。從技術上講，錢包只是一個向你顯示餘額和進行交易的介面，你的帳戶並非儲存在錢包內，而是儲存在區塊鏈上。

### 我還沒有收到加密貨幣，我可以在哪裡查看交易狀態？ {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

你可以使用[區塊鏈瀏覽器](/developers/docs/data-and-analytics/block-explorers/)即時查看任何交易的狀態。你只需要搜尋你的錢包地址或交易 ID。

### 我可以取消或退回交易嗎？ {#can-i-cancel-or-return-transactions}

不行，一旦交易被確認，你就無法取消交易。