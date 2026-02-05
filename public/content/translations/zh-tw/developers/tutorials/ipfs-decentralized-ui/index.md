---
title: "用於去中心化使用者介面的 IPFS"
description: "本使用教學會教讀者如何使用 IPFS 來儲存去中心化應用程式的使用者介面。 儘管應用程式的資料和商業邏輯是去中心化的，但如果沒有抗審查的使用者介面，使用者還是可能會失去存取權限。"
author: "作者：Ori Pomerantz"
tags: [ "ipfs" ]
skill: beginner
lang: zh-tw
published: 2024-06-29
---

您寫了一個很棒的全新去中心化應用程式。 您甚至還為它寫了一個[使用者介面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。 但現在您擔心有人會透過讓您的使用者介面下線來審查它，而它只是雲端上的一台伺服器。 在本使用教學中，您會學習如何將使用者介面放到\*\*[星際檔案系統 (IPFS)](https://ipfs.tech/developers/)\*\* 上以避免審查，如此一來任何感興趣的人都能將它釘選在伺服器上供未來存取。

您可以使用第三方服務 (例如 [Fleek](https://resources.fleek.xyz/docs/)) 來完成所有工作。 本使用教學適合想要深入了解自己在做什麼的人，即使這代表更多的工作。

## 從本機開始 {#getting-started-locally}

有多個[第三方 IPFS 供應商](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)，但最好從在本機執行 IPFS 開始測試。

1. 安裝 [IPFS 使用者介面](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)。

2. 建立一個包含您網站的目錄。 如果您正在使用 [Vite](https://vite.dev/)，請使用此命令：

   ```sh
   pnpm vite build
   ```

3. 在 IPFS Desktop 中，按一下 **Import > Folder**，然後選擇您在上一步驟中建立的目錄。

4. 選擇您剛上傳的資料夾，然後按一下 **Rename**。 為它取一個更有意義的名稱。

5. 再次選取它，然後按一下 **Share link**。 將 URL 複製到剪貼簿。 連結會與 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` 相似。

6. 按一下 **Status**。 展開 **Advanced** 索引標籤以查看閘道器地址。 例如，在我的系統上，地址是 `http://127.0.0.1:8080`。

7. 將連結步驟中的路徑與閘道器地址組合起來，即可找到您的地址。 例如，對於上述範例，URL 為 `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。 在瀏覽器中開啟該 URL 以查看您的網站。

## 上傳 {#uploading}

現在您可以使用 IPFS 在本機提供檔案服務，這不是非常令人興奮。 下一步是在您離線時，讓全世界都能使用這些檔案。

有許多知名的[釘選服務](https://docs.ipfs.tech/concepts/persistence/#pinning-services)。 選擇其中一個。 無論您使用哪種服務，都需要建立一個帳戶，並在 IPFS desktop 中提供**內容識別碼 (CID)**。

就我個人而言，我發現 [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) 是最容易使用的。 以下是其使用說明：

1. 瀏覽至[儀表板](https://dashboard.4everland.org/overview)並使用您的錢包登入。

2. 在左側邊欄中，按一下 **Storage > 4EVER Pin**。

3. 按一下 **Upload > Selected CID**。 為您的內容命名，並提供 IPFS desktop 的 CID。 目前 CID 是一個以 `Qm` 開頭的字串，後面跟著 44 個字母和數字，代表一個 [base-58 編碼](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)的哈希，例如 `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`，但[這很可能會改變](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1)。

4. 初始狀態為 **Queued**。 重新載入，直到狀態變為 **Pinned**。

5. 按一下您的 CID 以取得連結。 您可以在[這裡](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/)看到我的應用程式。

6. 您可能需要啟用您的帳戶，才能將其釘選超過一個月。 啟用帳戶的費用約為 1 美元。 如果您關閉了它，請登出再重新登入，系統會再次要求您啟用。

## 從 IPFS 使用 {#using-from-ipfs}

此時，您已擁有一個指向中心化閘道器的連結，該閘道器為您的 IPFS 內容提供服務。 簡言之，您的使用者介面可能更安全一些，但它仍然不是抗審查的。 要實現真正的抗審查，使用者需要[直接從瀏覽器](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites)使用 IPFS。

一旦您安裝了它 (並且桌面版 IPFS 正常運作)，您就可以在任何網站上前往 [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)，您將以去中心化的方式獲得該內容。

## 缺點 {#drawbacks}

您無法可靠地刪除 IPFS 檔案，因此只要您在修改使用者介面，最好還是將其保持中心化，或使用[星際名稱系統 (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)，這是一個在 IPFS 之上提供可變性的系統。 當然，任何可變的東西都可以被審查，在 IPNS 的情況下，可以透過向擁有其對應私密金鑰的人施壓來達成。

此外，某些套件在 IPFS 上會出現問題，因此如果您的網站非常複雜，這可能不是一個好的解決方案。 當然，任何依賴伺服器整合的東西都無法僅僅透過將用戶端放在 IPFS 上來去中心化。

## 結論 {#conclusion}

就像以太坊讓您能夠將去中心化應用程式的資料庫和商業邏輯層面去中心化一樣，IPFS 也能讓您將使用者介面去中心化。 這能讓您阻斷針對您的去中心化應用程式的另一個攻擊媒介。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
