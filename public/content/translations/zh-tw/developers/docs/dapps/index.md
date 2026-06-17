---
title: 去中心化應用程式 (dapp) 技術簡介
description:
lang: zh-tw
---

去中心化應用程式 (dapp) 是建立在去中心化網路上的應用程式，結合了[智能合約](/developers/docs/smart-contracts/)和前端使用者介面。在[以太坊](/)上，智能合約是公開且透明的（就像開放的 API），因此你的 dapp 甚至可以包含其他人編寫的智能合約。

## 先決條件 {#prerequisites}

在學習 dapp 之前，你應該先了解[區塊鏈基礎知識](/developers/docs/intro-to-ethereum/)，並閱讀有關以太坊網路及其如何去中心化的內容。

## dapp 的定義 {#definition-of-a-dapp}

dapp 的後端程式碼運行在去中心化的點對點網路上。相較之下，一般應用程式的後端程式碼則是運行在中心化伺服器上。

dapp 可以使用任何語言編寫前端程式碼和使用者介面（就像一般應用程式一樣），以呼叫其後端。此外，它的前端可以託管在如 [IPFS](https://ipfs.io/) 等去中心化儲存系統上。

- **去中心化** - dapp 運行在以太坊上，這是一個開放、公開的去中心化平台，沒有任何個人或團體擁有控制權。
- **確定性** - 無論在何種環境下執行，dapp 都會執行相同的功能。
- **圖靈完備** - 只要有足夠的資源，dapp 可以執行任何操作。
- **隔離性** - dapp 在稱為以太坊虛擬機 (EVM) 的虛擬環境中執行，因此如果智能合約存在錯誤，也不會妨礙區塊鏈網路的正常運作。

### 關於智能合約 {#on-smart-contracts}

為了介紹 dapp，我們需要介紹智能合約——姑且稱之為 dapp 的後端。如需詳細概述，請前往我們的[智能合約](/developers/docs/smart-contracts/)章節。

智能合約是存在於以太坊區塊鏈上的程式碼，並完全按照程式設定運行。一旦智能合約部署到網路上，你就無法更改它們。dapp 之所以能去中心化，是因為它們由寫入合約的邏輯控制，而不是由個人或公司控制。這也意味著你需要非常仔細地設計合約並進行徹底的測試。

## dapp 開發的優勢 {#benefits-of-dapp-development}

- **零停機時間** – 一旦智能合約部署在區塊鏈上，整個網路將始終能夠為希望與合約互動的客戶端提供服務。因此，惡意行為者無法針對個別 dapp 發起阻斷服務攻擊。
- **隱私** – 你不需要提供真實世界的身份即可部署 dapp 或與之互動。
- **抗審查性** – 網路上的任何單一實體都無法阻止使用者提交交易、部署 dapp 或從區塊鏈讀取資料。
- **完整的資料完整性** – 由於密碼學原語，儲存在區塊鏈上的資料是不可變的且無可爭議的。惡意行為者無法偽造已經公開的交易或其他資料。
- **無須信任的運算/可驗證的行為** – 智能合約可以被分析，並保證以可預測的方式執行，而無須信任中央權威機構。這在傳統模型中是不可能的；例如，當我們使用線上銀行系統時，我們必須信任金融機構不會濫用我們的財務資料、篡改記錄或遭到駭客攻擊。

## dapp 開發的缺點 {#drawbacks-of-dapp-development}

- **維護** – dapp 可能更難維護，因為發布到區塊鏈上的程式碼和資料較難修改。一旦部署，開發人員很難對其 dapp（或 dapp 儲存的底層資料）進行更新，即使在舊版本中發現了錯誤或安全風險。
- **效能開銷** – 存在巨大的效能開銷，且擴展非常困難。為了達到以太坊所追求的安全性、完整性、透明度和可靠性水準，每個節點都會運行並儲存每筆交易。除此之外，權益證明 (PoS) 共識也需要時間。
- **網路壅塞** – 當一個 dapp 使用過多運算資源時，整個網路都會受到影響。目前，網路每秒只能處理約 10-15 筆交易；如果發送交易的速度快於此速度，未確認交易池可能會迅速膨脹。
- **使用者體驗** – 設計使用者友善的體驗可能更加困難，因為一般終端使用者可能會覺得設定以真正安全的方式與區塊鏈互動所需的工具堆疊太過困難。
- **中心化** – 建立在以太坊基礎層之上的使用者友善和開發人員友善解決方案，最終可能看起來還是像中心化服務。例如，此類服務可能會在伺服器端儲存金鑰或其他敏感資訊、使用中心化伺服器提供前端服務，或在寫入區塊鏈之前在中心化伺服器上運行重要的業務邏輯。中心化消除了區塊鏈相對於傳統模型的許多（如果不是全部）優勢。

## 比較喜歡視覺學習？ {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## 建立 dapp 的工具 {#dapp-tools}

**Scaffold-ETH _- 使用適應你智能合約的前端快速試驗 Solidity。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [dapp 範例](https://punkwallet.io/)

**Create Eth App _- 使用一個指令建立由以太坊驅動的應用程式。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- 從 [ABI](/glossary/#abi) 產生 dapp 前端的自由開源軟體 (FOSS) 工具。_**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- 供以太坊開發人員測試其節點，並從瀏覽器編寫和除錯 RPC 呼叫的自由開源軟體 (FOSS) 工具。_**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- 適用於 Web3 開發的各種語言 SDK、智能合約、工具和基礎設施。_**

- [首頁](https://thirdweb.com/)
- [文件](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- 企業級 Web3 開發平台，用於部署智能合約、啟用信用卡和跨鏈支付，並使用 API 建立、分發、銷售、儲存和編輯 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文件](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## 延伸閱讀 {#further-reading}

- [探索 dapp](/apps)
- [Web 3.0 應用程式的架構](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [2021 年去中心化應用程式指南](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [什麼是去中心化應用程式？](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [熱門 dapp](https://www.alchemy.com/dapps) - _Alchemy_

_知道有幫助過你的社群資源嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [以太坊堆疊簡介](/developers/docs/ethereum-stack/)
- [開發框架](/developers/docs/frameworks/)

## 教學：在以太坊上建立應用程式和前端 {#tutorials}

- [尤尼斯瓦普 v2 合約演練](/developers/tutorials/uniswap-v2-annotated-code/) _– 尤尼斯瓦普 v2 核心合約的註解演練，解釋自動做市商 (AMM) 的運作方式。_
- [為你的合約建立使用者介面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– 如何建立一個連接到你智能合約的現代 React + Wagmi 前端。_
- [適合初學者的 Hello World 智能合約 – 全端](/developers/tutorials/hello-world-smart-contract-fullstack/) _– 端到端教學：為一個簡單的智能合約編寫、部署並建立前端。_
- [Web3 應用程式的伺服器元件和代理](/developers/tutorials/server-components/) _– 如何編寫監聽區塊鏈事件並以交易回應的 TypeScript 伺服器元件。_
- [用於去中心化使用者介面的 IPFS](/developers/tutorials/ipfs-decentralized-ui/) _– 如何將 dapp 的前端託管在 IPFS 上以實現抗審查性。_