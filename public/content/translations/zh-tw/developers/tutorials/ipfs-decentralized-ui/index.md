---
title: "用於去中心化使用者介面的 IPFS"
description: "本教學教導讀者如何使用 IPFS 儲存去中心化應用程式 (dapp) 的使用者介面。雖然應用程式的資料和業務邏輯是去中心化的，但如果沒有抗審查的使用者介面，使用者可能還是會失去存取權限。"
author: "奧里·波梅蘭茨"
tags:
  - ipfs
  - 去中心化應用程式 (dapp)
  - 前端
skill: beginner
breadcrumb: "用於 dapp 使用者介面的 IPFS"
lang: zh-tw
published: 2024-06-29
---

你寫了一個超棒的全新去中心化應用程式 (dapp)。你甚至為它寫了一個[使用者介面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。但現在你擔心有人會試圖審查它，方法是關閉你的使用者介面（它只不過是雲端中的一台伺服器）。在本教學中，你將學習如何透過將使用者介面放上**[星際檔案系統 (IPFS)](https://ipfs.tech/developers/)** 來避免審查，這樣任何有興趣的人都能將其固定 (pin) 在伺服器上，以便未來存取。

你可以使用像 [Fleek](https://resources.fleek.xyz/docs/) 這樣的第三方服務來完成所有工作。本教學是為那些想要深入了解自己在做什麼的人準備的，即使這需要花費更多心力。

## 在本機開始 {#getting-started-locally}

有許多[第三方 IPFS 供應商](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)，但最好先從在本機執行 IPFS 進行測試開始。

1. 安裝 [IPFS 使用者介面](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)。

2. 建立一個包含你網站的目錄。如果你使用的是 [Vite](https://vite.dev/)，請使用此指令：

   ```sh
   pnpm vite build
   ```

3. 在 IPFS Desktop 中，點擊 **Import > Folder**（匯入 > 資料夾），然後選擇你在上一個步驟中建立的目錄。

4. 選擇你剛剛上傳的資料夾，然後點擊 **Rename**（重新命名）。給它一個更有意義的名稱。

5. 再次選擇它並點擊 **Share link**（分享連結）。將 URL 複製到剪貼簿。該連結會類似於 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。

6. 點擊 **Status**（狀態）。展開 **Advanced**（進階）分頁以查看閘道地址。例如，在我的系統上，地址是 `http://127.0.0.1:8080`。

7. 將連結步驟中的路徑與閘道地址結合，以找到你的地址。例如，對於上面的範例，URL 是 `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。在瀏覽器中開啟該 URL 以查看你的網站。

## 上傳 {#uploading}

現在你可以使用 IPFS 在本機提供檔案，但這並不怎麼令人興奮。下一步是讓這些檔案在你離線時也能供全世界存取。

有許多知名的[固定服務 (pinning services)](https://docs.ipfs.tech/concepts/persistence/#pinning-services)。選擇其中一個。無論你使用哪種服務，你都需要建立一個帳戶，並向其提供 IPFS Desktop 中的**內容識別碼 (CID)**。

就我個人而言，我發現 [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) 是最容易使用的。以下是它的使用說明：

1. 瀏覽至[儀表板](https://dashboard.4everland.org/overview)並使用你的錢包登入。

2. 在左側側邊欄中點擊 **Storage > 4EVER Pin**。

3. 點擊 **Upload > Selected CID**。為你的內容命名，並提供來自 IPFS Desktop 的 CID。目前，CID 是一個以 `Qm` 開頭的字串，後面跟著 44 個字母和數字，代表一個[以 base-58 編碼](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)的雜湊，例如 `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`，但[這很可能會改變](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1)。

4. 初始狀態為 **Queued**（排隊中）。重新載入頁面，直到狀態變為 **Pinned**（已固定）。

5. 點擊你的 CID 以取得連結。你可以[在此處](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/)查看我的應用程式。

6. 你可能需要啟用你的帳戶，才能將其固定超過一個月。帳戶啟用費用約為 1 美元。如果你關閉了提示，請登出再重新登入，系統會再次要求你啟用。

## 從 IPFS 使用 {#using-from-ipfs}

此時，你有一個連結指向提供你 IPFS 內容的中心化閘道。簡而言之，你的使用者介面可能稍微安全了一些，但它仍然不具備抗審查能力。為了實現真正的抗審查，使用者需要[直接從瀏覽器](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites)使用 IPFS。

一旦你安裝了它（並且桌面版 IPFS 正常運作），你可以在任何網站上前往 [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)，你將以去中心化的方式取得該內容。

## 缺點 {#drawbacks}

你無法可靠地刪除 IPFS 檔案，因此只要你還在修改使用者介面，最好還是讓它保持中心化，或者使用[星際名稱系統 (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)，這是一個在 IPFS 之上提供可變性的系統。當然，任何可變的東西都可能被審查，在 IPNS 的情況下，可以透過向持有對應私鑰的人施壓來達成。

此外，某些套件在 IPFS 上會有問題，因此如果你的網站非常複雜，這可能不是一個好解決方案。當然，任何依賴伺服器整合的東西，都無法僅僅透過將用戶端放在 IPFS 上來實現去中心化。

## 透過 ENS 的可發現性 {#discoverability}

如果你將一個 ENS 名稱（例如 vitalik.eth）指向你的網站，它將被視為一個完全去中心化的網頁，並會被 [dweb3.wtf](https://dweb3.wtf) 服務自動固定，同時也能透過 [web3compass.net](https://web3compass.net) 搜尋引擎進行搜尋，就像 DuckDuckGo、Brave Search 或 Google 對傳統網路所做的那樣。

## 結論 {#conclusion}

就像以太坊讓你能夠將 dapp 的資料庫和業務邏輯方面去中心化一樣，IPFS 讓你能夠將使用者介面去中心化。這讓你能夠關閉另一個針對你 dapp 的攻擊向量。

[點此查看更多我的作品](https://cryptodocguy.pro/)。