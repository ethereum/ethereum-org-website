---
title: "去中心化應用程式的技術性介紹"
description:
lang: zh-tw
---

去中心化應用程式 (dapp) 是建立在去中心化網路之上的應用程式，由 [智慧型合約](/developers/docs/smart-contracts/) 和前端使用者介面構成。 在以太坊上，如同開放式應用程式介面 (API) 一樣，智慧型合約具可存取性和透明性，因此你的去中心化應用程式甚至能包含他人已經編寫好的智慧型合約。

## 先決條件 {#prerequisites}

在學習去中心化應用程式之前，您應先了解 [區塊鏈基礎](/developers/docs/intro-to-ethereum/)，並閱讀有關以太坊網路及其去中心化方式的資訊。

## 去中心化應用程式的定義 {#definition-of-a-dapp}

去中心化應用程序的後端程式碼在去中心化點對點網路上運行。 與之相比，普通應用程序的後端程式碼在中心化伺服器上運行。

去中心化應用程式的前端程式碼與使用者介面可以用任何語言編寫（就像普通應用程式一樣），以呼叫其後端。 此外，其前端可以託管在去中心化儲存空間上，例如 [IPFS](https://ipfs.io/)。

- **去中心化** - 去中心化應用程式在以太坊上運行，以太坊是一個開放的公共去中心化平台，沒有任何人或團體可以控制
- **確定性** - 去中心化應用程式執行相同的功能，不受其執行環境影響
- **圖靈完備** - 只要有必要的資源，去中心化應用程式就能執行任何操作
- **隔離** - 去中心化應用程式在稱為以太坊虛擬機的虛擬環境中執行，如此一來，即使智慧型合約有錯誤，也不會妨礙區塊鏈網路的正常運作

### 關於智慧型合約 {#on-smart-contracts}

在介紹去中心化應用程式之前，我們需要先認識智慧型合約，由於沒有更好的術語，我們用它來表示去中心化應用程式的後端。 如需詳細總覽，請前往我們的 [智慧型合約](/developers/docs/smart-contracts/) 專區。

智慧型合約是存在於以太坊區塊鏈上的程式，完全按照設定運行。 智慧型合約一旦部署於網路上後，你將無法更改它。 去中心化應用程式可以實現去中心化，因為控制它們的是編寫到合約內的邏輯，而不是任何個人或公司。 這也表示你必須非常謹慎地設計你的合約並進行全面測試。

## 開發去中心化應用程式的優點 {#benefits-of-dapp-development}

- **零停機時間** – 智慧型合約一旦部署到區塊鏈上，整個網路將始終能夠為希望與合約互動的用戶端提供服務。 因此，惡意行為者無法發動針對單獨去中心化應用程式的拒絕服務攻擊。
- **隱私** – 您不需要提供真實世界的身分即可部署去中心化應用程式或與其互動。
- **抗審查** – 網路上的任何單一實體都無法阻止使用者提交交易、部署去中心化應用程式，或從區塊鏈讀取資料。
- **完整的資料完整性** – 歸功於密碼學基元，儲存在區塊鏈上的資料是不可變且無可爭議的。 惡意行為者無法假造已公開的交易或其他資料。
- **無需信任的運算/可驗證的行為** – 智慧型合約可以被分析，並保證以可預測的方式執行，無需信任中心化機構。 在傳統模式下，情況並非如此；例如，在使用線上銀行系統時，我們必須信任此等金融機構不會濫用我們的財物資料，不會竄改紀錄或者不會受到駭客攻擊。

## 開發去中心化應用程式的缺點 {#drawbacks-of-dapp-development}

- **維護** – 去中心化應用程式可能更難維護，因為發佈到區塊鏈上的程式碼和資料更難修改。 一旦部署去中心化應用程式後，開發者將難以更新去中心化應用程式（或其儲存的基礎資料），即便在舊版本中發現了錯誤或安全風險。
- **效能開銷** – 效能開銷龐大，且擴展非常困難。 為了達成以太坊追求的高水平安全性、完整性、透明性及可靠性，每個節點都運行並儲存每一筆交易。 除此之外，達成權益證明共識也需要時間。
- **網路壅塞** – 當一個去中心化應用程式使用過多運算資源時，整個網路都會堵塞。 目前，以太坊網路能每秒處理大約 10-15 筆交易，但如果發送交易的速度快於處理速度，未確認的交易池將快速暴增。
- **使用者體驗** – 可能比較難打造使用者友善的體驗，因為一般終端使用者可能會覺得，要以真正安全的方式與區塊鏈互動，所需設定的工具堆疊太過困難。
- **中心化** – 建構在以太坊底層之上、對使用者和開發者友善的解決方案，最終看起來可能還是像中心化服務。 例如，此等服務可能在伺服器端儲存金鑰或其他敏感資訊，通過中心化伺服器支援前端，或者在將其寫入區塊鏈前在中心化伺服器上運行重要業務邏輯。 中心化會消除許多（如果不是全部）區塊鏈相較於傳統模式的優勢。

## 想透過視覺方式學習？ {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## 用於建立去中心化應用程式的工具 {#dapp-tools}

**Scaffold-ETH _- 使用可適應您智慧型合約的前端，快速體驗 Solidity。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [去中心化應用程式範例](https://punkwallet.io/)

**Create Eth App _- 用一個指令建立以太坊應用程式。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- 從 [ABI](/glossary/#abi) 產生去中心化應用程式前端的 FOSS 工具。_**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- 供以太坊開發者測試其節點，以及從瀏覽器編寫與偵錯 RPC 呼叫的 FOSS 工具。_**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- 用於 web3 開發的各種語言 SDK、智慧型合約、工具和基礎設施。_**

- [首頁](https://thirdweb.com/)
- [文件](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- 企業級 web3 開發平台，可部署智慧型合約、啟用信用卡和跨鏈支付，並使用 API 建立、分發、銷售、儲存和編輯 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文件](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## 延伸閱讀 {#further-reading}

- [探索去中心化應用程式](/apps)
- [Web 3.0 應用程式的架構](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [2021 年去中心化應用程式指南](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [什麼是去中心化應用程式？](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [熱門的去中心化應用程式](https://www.alchemy.com/dapps) - _Alchemy_

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [以太坊技術堆疊介紹](/developers/docs/ethereum-stack/)
- [開發框架](/developers/docs/frameworks/)
