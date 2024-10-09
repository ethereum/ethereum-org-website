---
title: 去中心化應用程式簡介
description:
lang: zh-tw
---

去中心化應用程式 (dapp) 是建立在去中心化網路之上的應用程式，由[智慧型合約](/developers/docs/smart-contracts/)和前端使用者介面構成。 在以太坊上，如同開放式應用程式介面 (API) 一樣，智慧型合約具可存取性和透明性，因此你的去中心化應用程式甚至能包含他人已經編寫好的智慧型合約。

## 基本資訊 {#prerequisites}

在學習去中心化應用程序之前，應該先瞭解[區塊鏈基本知識](/developers/docs/intro-to-ethereum/)，並瞭解以太坊網路及其如何去中心化。

## 去中心化應用程式之定義 {#definition-of-a-dapp}

去中心化應用程序的後端程式碼在去中心化點對點網路上運行。 與之相比，普通應用程序的後端程式碼在中心化伺服器上運行。

去中心化應用程式的前端程式碼與使用者介面可以用任何語言編寫（就像普通應用程式一樣），以呼叫其後端。 此外，其前端能夠託管於任何去中心化儲存中，例如[星際檔案系統](https://ipfs.io/)。

- **去中心化** -- 去中心化應用程式運行於以太坊上。以太坊是一個開放式公共去中心化平台，不受任何個人或群組控制
- **確定性** - 去中心化應用程式總是執行相同函式，而與其執行環境無關
- **圖靈完備** - 只要有所需的資源，去中心化應用程式就能執行任何操作
- **隔離性** - 去中心化應用程式在稱為以太坊虛擬機的虛擬環境中執行，所以即使智慧型合約出現錯誤，也不會影響區塊鏈執行正常功能

### 關於智慧型合約 {#on-smart-contracts}

在介紹去中心化應用程式之前，我們需要先認識智慧型合約，由於沒有更好的術語，我們用它來表示去中心化應用程式的後端。 欲查看細節概要，請查閱我們的[智慧型合約](/developers/docs/smart-contracts/)一節。

智慧型合約是存在於以太坊區塊鏈上的程式，完全按照設定運行。 智慧型合約一旦部署於網路上後，你將無法更改它。 去中心化應用程式可以實現去中心化，因為控制它們的是編寫到合約內的邏輯，而不是任何個人或公司。 這也表示你必須非常謹慎地設計你的合約並進行全面測試。

## 去中心化應用程式的開發優勢 {#benefits-of-dapp-development}

- **零下線時間** -- 一旦智慧型合約部屬到區塊鏈上，整個網路將始終能夠為想要與此合約互動的客戶提供服務。 因此，惡意行為者無法發動針對單獨去中心化應用程式的拒絕服務攻擊。
- **隱私** -- 你無需提供真實身份，即可部署去中心化應用程式或與之互動。
- **抗審查** -- 網路上的任何單獨實體都無法阻止使用者提交交易、部署去中心化應用程式並讀取區塊鏈中的資料。
- **資料完整性** -- 藉由加密基元技術，儲存於區塊鏈上的資料具不可變性及無爭議性。 惡意行為者無法假造已公開的交易或其他資料。
- **無需信任的計算/可驗證的行為** – 可以對智慧型合約進行分析且可以保障其按照可預見的方式執行，而無需信任中心化管理機構。 在傳統模式下，情況並非如此；例如，在使用線上銀行系統時，我們必須信任此等金融機構不會濫用我們的財物資料，不會竄改紀錄或者不會受到駭客攻擊。

## 去中心化應用程式的開發弊端 {#drawbacks-of-dapp-development}

- **維護** -- 因為發佈到區塊鏈上的程式碼與資料更加難以修改，去中心化應用程式維護起來難度更大。 一旦部署去中心化應用程式後，開發者將難以更新去中心化應用程式（或其儲存的基礎資料），即便在舊版本中發現了錯誤或安全風險。
- **效能開銷** – 效能開銷非常之高，並且擴容極其困難。 為了達成以太坊追求的高水平安全性、完整性、透明性及可靠性，每個節點都運行並儲存每一筆交易。 除此之外，達成權益證明共識也需要時間。
- **網路壅塞** -- 當一個去中心化應用程式佔用過多計算資源時，整個網路會變得壅塞。 目前，以太坊網路能每秒處理大約 10-15 筆交易，但如果發送交易的速度快於處理速度，未確認的交易池將快速暴增。
- **使用者體驗** – 可能很難設計出方便使用的體驗，因為普通終端使用者可能會發現難以設定透過真正安全的方式與區塊鏈互動所需的工具棧。
- **中心化** -- 方便使用且方便開發的解決方案建立於以太坊基礎層上，最終它們可能在某些方面看起來像是中心化服務。 例如，此等服務可能在伺服器端儲存金鑰或其他敏感資訊，通過中心化伺服器支援前端，或者在將其寫入區塊鏈前在中心化伺服器上運行重要業務邏輯。 中心化會消除許多（如果不是全部）區塊鏈相較於傳統模式的優勢。

## 想透過實際視覺學習? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## 用於建立去中心化應用程式的工具 {#dapp-tools}

**Scaffold-ETH _- 透過可適應你的智慧型合約的前端，快速體驗 Solidity。_**

- [Github](https://github.com/scaffold-eth/scaffold-eth-2)
- [範例去中心化應用程式](https://punkwallet.io/)

**Create Eth App _- 通過一條指令建立以太坊支援的應用程式。_**

- [Github](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _ - FOSS 工具，用來透過[應用程式二進位介面](/glossary/#abi)生成去中心化應用程式前端。_**

- [oneclickdapp.com](https://oneclickdapp.com)
- [Github](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow_ -- FOSS 工具，以太坊開發者可用其測試節點，在瀏覽器中撰寫並偵錯遠端程序呼叫。_**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- 用於 Web3 開發的各種語言的軟體開發套件、智慧型合約、工具及基礎設施。_**

- [首頁](https://thirdweb.com/)
- [文件](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- 企業級 Web3 開發平台，可用於部署智慧型合約，支援信用卡和跨鏈支付，並使用應用程式介面來建立、分發、銷售、儲存和編輯非同質化代幣。_**

- [crossmint.com](https://www.crossmint.com)
- [文件](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## 衍生閱讀 {#further-reading}

- [探索去中心化應用程式](/dapps)
- [Web 3.0 應用程式的架構](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [-2021 版去中心化應用程式指南](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [去中心化應用程式為何?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [熱門去中心化應用程式](https://www.alchemy.com/dapps) - _Alchemy_

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_

## 相關主題 {#related-topics}

- [以太坊堆疊簡介](/developers/docs/ethereum-stack/)
- [開發架構](/developers/docs/frameworks/)
