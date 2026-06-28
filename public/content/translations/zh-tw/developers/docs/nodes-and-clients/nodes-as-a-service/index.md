---
title: "節點即服務"
description: "節點服務的入門概述、優缺點以及熱門的提供商。"
lang: zh-tw
sidebarDepth: 2
---

## 簡介 {#introduction}

運行你自己的[以太坊節點](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients)可能具有挑戰性，尤其是在剛入門或快速擴展時。有[許多服務](#popular-node-services)可以為你運行最佳化的節點基礎設施，讓你能夠專注於開發應用程式或產品。我們將解釋節點服務的運作方式、使用它們的優缺點，並列出提供商，以供有興趣入門的你參考。

## 先決條件 {#prerequisites}

如果你還不了解什麼是節點和客戶端，請查看[節點與客戶端](/developers/docs/nodes-and-clients/)。

## 質押者 {#stakoooooooooooooors}

獨立質押者必須運行自己的基礎設施，而不是依賴第三方提供商。這意味著要運行一個執行客戶端並搭配一個共識客戶端。在[合併](/roadmap/merge)之前，可以只運行共識客戶端並使用中心化提供商來獲取執行數據；這現在已經不可能了——獨立質押者必須同時運行這兩個客戶端。然而，有一些服務可以簡化這個過程。

[閱讀更多關於運行節點的資訊](/developers/docs/nodes-and-clients/run-a-node/)。

本頁面描述的服務適用於非質押節點。

## 節點服務如何運作？ {#how-do-node-services-work}

節點服務提供商在幕後為你運行分散式節點客戶端，因此你無需親自運行。

這些服務通常提供一個 API 金鑰，你可以使用它來寫入和讀取區塊鏈。除了主網之外，它們通常還包含對[以太坊測試網](/developers/docs/networks/#ethereum-testnets)的存取權限。

有些服務為你提供由他們管理的專屬節點，而其他服務則使用負載平衡器將活動分配到各個節點。

幾乎所有的節點服務都非常容易整合，只需在程式碼中更改一行即可替換自託管節點，甚至在不同服務之間切換。

通常，節點服務會運行各種[節點客戶端](/developers/docs/nodes-and-clients/#execution-clients)和[類型](/developers/docs/nodes-and-clients/#node-types)，讓你除了能使用特定客戶端的方法外，還能在一個 API 中存取全節點和歸檔節點。

需要注意的是，節點服務不會也不應該儲存你的私鑰或資訊。

## 使用節點服務有什麼好處？ {#benefits-of-using-a-node-service}

使用節點服務的主要好處是無需花費工程時間親自維護和管理節點。這讓你能夠專注於建構產品，而不必擔心基礎設施的維護。

運行自己的節點可能非常昂貴，從儲存空間、頻寬到寶貴的工程時間都是如此。在擴展時啟動更多節點、將節點升級到最新版本以及確保狀態一致性等工作，可能會分散你的注意力，讓你無法將資源投入到你想要的 Web3 產品建構上。

## 使用節點服務有什麼缺點？ {#cons-of-using-a-node-service}

使用節點服務會使你產品的基礎設施層面中心化。因此，將去中心化視為重中之重的專案可能更傾向於自託管節點，而不是外包給第三方。

閱讀更多關於[運行自己節點的好處](/developers/docs/nodes-and-clients/#benefits-to-you)。

## 熱門的節點服務 {#popular-node-services}

以下是一些最受歡迎的以太坊節點提供商列表，歡迎補充任何遺漏的提供商！除了免費或付費方案外，每個節點服務都提供不同的好處和功能，在做出決定之前，你應該調查哪些服務最適合你的需求。

- [**Alchemy**](https://alchemy.com/)
  - [文件](https://www.alchemy.com/docs/)
  - 功能
    - 最大的免費方案，每月 3 億個運算單元（約 3000 萬次 getLatestBlock 請求）
    - 支援 Polygon、Starknet、Optimism、Arbitrum 等多鏈
    - 為約 70% 的大型以太坊去中心化應用程式 (dapp) 和去中心化金融 (DeFi) 交易量提供動力
    - 透過 Alchemy Notify 提供即時 Webhook 警報
    - 一流的支援和可靠性/穩定性
    - Alchemy 的 NFT API
    - 包含請求瀏覽器、記憶體池觀察器和編寫器的儀表板
    - 整合的測試網水龍頭存取權限
    - 擁有 1.8 萬名使用者的活躍 Discord 建構者社群

- [**Allnodes**](https://www.allnodes.com/)
  - [文件](https://docs.allnodes.com/)
  - 功能
    - 在 Allnodes 投資組合頁面上建立 PublicNode 代幣即可享受無速率限制。
    - 在 [PublicNode](https://www.publicnode.com) 上提供注重隱私的免費 RPC 端點（100 多個區塊鏈）
    - 適用於 90 多個區塊鏈的無速率限制專屬節點
    - 適用於 30 多個區塊鏈的專屬歸檔節點
    - 在 3 個地區（美國、歐盟、亞洲）可用
    - 在 [PublicNode](https://www.publicnode.com/snapshots) 上提供 100 多個區塊鏈的快照
    - 24/7 全天候技術支援，正常運行時間 SLA 為 99.90%-99.98%（取決於方案）。
    - 按小時計費
    - 支援信用卡、PayPal 或加密貨幣付款

- [**All That Node**](https://allthatnode.com/)
  - [文件](https://docs.allthatnode.com/)
  - 功能
    - 免費方案每天 50,000 次請求
    - 支援超過 40 種協定
    - 支援 JSON-RPC (EVM, Tendermint)、REST 和 Websocket API
    - 無限制存取歸檔資料
    - 24/7 全天候技術支援和超過 99.9% 的正常運行時間
    - 多鏈可用的水龍頭
    - 無限制的端點存取權限和無限數量的 API 金鑰
    - 支援 Trace/Debug API
    - 自動更新

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [文件](https://aws.amazon.com/managed-blockchain/resources/)
  - 功能
    - 全託管的以太坊節點
    - 在六個地區可用
    - 透過 HTTP 和安全 WebSockets 的 JSON-RPC
    - 支援 3 條鏈
    - SLA，AWS 24/7 全天候支援
    - Go-ethereum 和萊特豪斯

- [**Ankr**](https://www.ankr.com/)
  - [文件](https://docs.ankr.com/)
  - 功能
    - Ankr 協定 - 開放存取 8 條以上鏈的公共 RPC API 端點
    - 負載平衡和節點健康監控，提供快速可靠的閘道器以連接最近的可用節點
    - 啟用 WSS 端點和無上限速率限制的高級方案
    - 適用於 40 多條鏈的一鍵式全節點和驗證者節點部署
    - 隨需擴展
    - 分析工具
    - 儀表板
    - RPC、HTTPS 和 WSS 端點
    - 直接支援

- [**Blast**](https://blastapi.io/)
  - [文件](https://docs.blastapi.io/)
  - 功能
    - 支援 RPC 和 WSS
    - 多區域節點託管
    - 去中心化基礎設施
    - 公共 API
    - 專屬免費方案
    - 多鏈支援（17 個以上區塊鏈）
    - 歸檔節點
    - 24/7 全天候 Discord 支援
    - 24/7 全天候監控和警報
    - 整體 SLA 為 99.9%
    - 支援加密貨幣付款

- [**BlockDaemon**](https://blockdaemon.com/)
  - [文件](https://ubiquity.docs.blockdaemon.com/)
  - 好處
    - 儀表板
    - 按節點計費
    - 分析

- [**BlockPI**](https://blockpi.io/)
  - [文件](https://docs.blockpi.io/)
  - 功能
    - 穩健且分散式的節點結構
    - 多達 40 個 HTTPS 和 WSS 端點
    - 免費註冊套件和月費套件
    - 支援 Trace 方法 + 歸檔資料
    - 套件有效期長達 90 天
    - 自訂方案和隨需付費
    - 支援加密貨幣付款
    - 直接支援和技術支援

- [**Chainbase**](https://www.chainbase.com/)
  - [文件](https://docs.chainbase.com)
  - 功能
    - 高可用性、快速且可擴展的 RPC 服務
    - 多鏈支援
    - 免費費率
    - 使用者友善的儀表板
    - 提供 RPC 之外的區塊鏈資料服務

- [**Chainstack**](https://chainstack.com/)
  - [文件](https://docs.chainstack.com/)
  - 功能
    - 免費共享節點
    - 共享歸檔節點
    - 支援 GraphQL
    - RPC 和 WSS 端點
    - 專屬全節點和歸檔節點
    - 專屬部署的快速同步時間
    - 自帶雲端
    - 按小時計費
    - 24/7 全天候直接支援

- [**dRPC**](https://drpc.org/)
  - [文件](https://drpc.org/docs)
  - NodeCloud：隨插即用的 RPC 基礎設施，起價 10 美元——全速，無限制
  - NodeCloud 功能：
    - 支援 185 個網路的 API
    - 由 40 多個提供商組成的分散式資源池
    - 覆蓋全球的九 (9) 個地理叢集
    - AI 驅動的負載平衡系統
    - 隨需付費的統一定價——不漲價、不過期、無鎖定期
    - 無限金鑰、精細的金鑰調整、團隊角色、前端保護
    - 方法統一費率為每個方法 20 個運算單元 (CU)
    - [公共端點鏈列表](https://drpc.org/chainlist)
    - [定價計算機](https://drpc.org/pricing#calculator)
  - NodeCore：適合希望擁有完全控制權的組織的開源堆疊

- [**GetBlock**](https://getblock.io/)
  - [文件](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 功能
    - 存取 40 多個區塊鏈節點
    - 每天 4 萬次免費請求
    - 無限數量的 API 金鑰
    - 1GB/秒的高連線速度
    - Trace+歸檔
    - 進階分析
    - 自動更新
    - 技術支援

- [**InfStones**](https://infstones.com/)
  - 功能
    - 免費方案選項
    - 隨需擴展
    - 分析
    - 儀表板
    - 獨特的 API 端點
    - 專屬全節點
    - 專屬部署的快速同步時間
    - 24/7 全天候直接支援
    - 存取 50 多個區塊鏈節點

- [**Infura**](https://infura.io/)
  - [文件](https://infura.io/docs)
  - 功能
    - 免費方案選項
    - 隨需擴展
    - 付費歸檔資料
    - 直接支援
    - 儀表板

- [**Kaleido**](https://kaleido.io/)
  - [文件](https://docs.kaleido.io/)
  - 功能
    - 免費入門方案
    - 一鍵式以太坊節點部署
    - 可自訂的客戶端和演算法（Geth、Quorum 和貝蘇 || 權威證明 (PoA)、IBFT 和 Raft）
    - 500 多個管理和服務 API
    - 用於提交以太坊交易的 RESTful 介面（由 Apache Kafka 支援）
    - 用於事件傳遞的輸出串流（由 Apache Kafka 支援）
    - 豐富的「鏈下」和輔助服務集合（例如，雙邊加密訊息傳輸）
    - 透過治理和基於角色的存取控制實現直接的網路入門引導
    - 適用於管理員和終端使用者的精密使用者管理
    - 高度可擴展、具備彈性的企業級基礎設施
    - 雲端 HSM 私鑰管理
    - 以太坊主網綁定
    - ISO 27k 和 SOC 2 Type 2 認證
    - 動態執行階段設定（例如，新增雲端整合、更改節點入口等）
    - 支援多雲、多區域和混合部署編排
    - 簡單的基於 SaaS 的按小時計費
    - SLA 和 24x7 全天候支援

- [**Lava Network**](https://www.lavanet.xyz/)
  - [文件](https://docs.lavanet.xyz/)
  - 功能
    - 免費測試網使用
    - 實現高正常運行時間的去中心化備援
    - 開源
    - 完全去中心化的 SDK
    - Ethers.js 整合
    - 直覺的專案管理介面
    - 基於共識的資料完整性
    - 多鏈支援

- [**Moralis**](https://moralis.io/)
  - [文件](https://docs.moralis.io/)
  - 功能
    - 免費共享節點
    - 免費共享歸檔節點
    - 注重隱私（無日誌政策）
    - 跨鏈支援
    - 隨需擴展
    - 儀表板
    - 獨特的以太坊 SDK
    - 獨特的 API 端點
    - 直接的技術支援

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [文件](https://docs.nodereal.io/docs/introduction)
  - 功能
    - 可靠、快速且可擴展的 RPC API 服務
    - 為 Web3 開發者提供的增強型 API
    - 多鏈支援
    - 免費入門

- [**NodeFlare**](https://nodeflare.app/)
  - [文件](https://nodeflare.app/docs/quick-start)
  - 功能
    - 8 條 EVM 鏈，包含以太坊、Base、Arbitrum One 和 Optimism
    - 4 個地區（歐洲、亞洲、北美），具備自動容錯移轉至最近健康節點的功能
    - 免費公共端點（無 API 金鑰）+ 每月 300 萬個運算單元的免費方案
    - 運算單元計費 — 僅為你使用的部分付費，較繁重的呼叫成本較高
    - 付費方案無節流限制

- [**NOWNodes**](https://nownodes.io/)
  - 功能
    - 存取 50 多個區塊鏈節點
    - 免費 API 金鑰
    - 區塊瀏覽器
    - API 回應時間 ⩽ 1 秒
    - 24/7 全天候支援團隊
    - 個人帳戶經理
    - 共享、歸檔、備份和專屬節點

- [**Pocket Network**](https://www.pokt.network/)
  - [文件](https://docs.pokt.network/)
  - 功能
    - 去中心化 RPC 協定和市場
    - 每天 100 萬次請求的免費方案（每個端點，最多 2 個）
    - Pre-Stake+ 計畫（如果你每天需要超過 100 萬次請求）
    - 支援 15 個以上的區塊鏈
    - 6400 多個節點透過為應用程式提供服務來賺取 POKT
    - 支援歸檔節點、帶有 Tracing 的歸檔節點和測試網節點
    - 以太坊主網節點客戶端多樣性
    - 無單點故障
    - 零停機時間
    - 具成本效益的近乎零代幣經濟學（質押一次 POKT 即可獲得網路頻寬）
    - 無每月沉沒成本，將你的基礎設施轉化為資產
    - 協定內建負載平衡
    - 隨需無限擴展每天的請求數量和每小時的節點數量
    - 最私密、抗審查的選項
    - 實用的開發者支援
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 儀表板和分析

- [**QuickNode**](https://www.quicknode.com)
  - [文件](https://www.quicknode.com/docs/)
  - 功能
    - 24/7 全天候技術支援和開發者 Discord 社群
    - 地理平衡、多雲/裸機、低延遲網路
    - 多鏈支援（Optimism、Arbitrum、Polygon + 其他 11 個）
    - 提升速度和穩定性的中介層（呼叫路由、快取、索引）
    - 透過 Webhooks 進行智能合約監控
    - 直覺的儀表板、分析套件、RPC 編寫器
    - 進階安全功能（JWT、遮罩、白名單）
    - NFT 資料和分析 API
    - [SOC2 認證](https://www.quicknode.com/security)
    - 適合開發者到企業

- [**Rivet**](https://rivet.cloud/)
  - [文件](https://rivet.readthedocs.io/en/latest/)
  - 功能
    - 免費方案選項
    - 隨需擴展

- [**SenseiNode**](https://senseinode.com)
  - [文件](https://docs.senseinode.com/)
  - 功能
    - 專屬和共享節點
    - 儀表板
    - 在拉丁美洲不同地點的多個託管提供商上進行非 AWS 託管
    - 普萊斯姆和萊特豪斯客戶端

- [**SettleMint**](https://console.settlemint.com/)
  - [文件](https://docs.settlemint.com/)
  - 功能
    - 免費試用
    - 隨需擴展
    - 支援 GraphQL
    - RPC 和 WSS 端點
    - 專屬全節點
    - 自帶雲端
    - 分析工具
    - 儀表板
    - 按小時計費
    - 直接支援

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [文件](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - 功能
    - 免費方案包含每月 2500 萬個 Tenderly 單元
    - 免費存取歷史資料
    - 讀取密集型工作負載速度提升高達 8 倍
    - 100% 一致的讀取存取
    - JSON-RPC 端點
    - 基於 UI 的 RPC 請求編寫器和請求預覽
    - 與 Tenderly 的開發、除錯和測試工具緊密整合
    - 交易模擬
    - 使用量分析和過濾
    - 輕鬆的存取金鑰管理
    - 透過聊天、電子郵件和 Discord 提供專屬工程支援

- [**Tokenview**](https://services.tokenview.io/)
  - [文件](https://services.tokenview.io/docs?type=nodeService)
  - 功能
    - 24/7 全天候技術支援和開發者 Telegram 社群
    - 多鏈支援（比特幣、以太坊、Tron、BNB Smart Chain、以太坊經典）
    - RPC 和 WSS 端點均開放使用
    - 無限制存取歸檔資料 API
    - 包含請求瀏覽器和記憶體池觀察器的儀表板
    - NFT 資料 API 和 Webhook 通知
    - 支援加密貨幣付款
    - 針對額外行為需求的外部支援

- [**Watchdata**](https://watchdata.io/)
  - [文件](https://docs.watchdata.io/)
  - 功能
    - 資料可靠性
    - 不間斷連線，無停機時間
    - 流程自動化
    - 免費費率
    - 適合任何使用者的高限制
    - 支援各種節點
    - 資源擴展
    - 高處理速度

- [**ZMOK**](https://zmok.io/)
  - [文件](https://docs.zmok.io/)
  - 功能
    - 搶跑即服務
    - 具備搜尋/過濾方法的全球交易記憶體池
    - 發送交易的無限交易費用和無限燃料
    - 最快獲取新區塊和讀取區塊鏈
    - 保證每次 API 呼叫的最佳價格

- [**Zeeve**](https://www.zeeve.io/)
  - [文件](https://www.zeeve.io/docs/)
  - 功能
    - 企業級無程式碼自動化平台，提供區塊鏈節點和網路的部署、監控和管理
    - 支援 30 多種協定和整合，並持續增加中
    - 針對現實世界用例的增值 Web3 基礎設施服務，如去中心化儲存、去中心化身分 (DID) 和區塊鏈帳本資料 API
    - 24/7 全天候支援和主動監控，確保節點始終保持健康。
    - RPC 端點提供對 API 的驗證存取，透過直覺的儀表板和分析實現無憂管理。
    - 提供託管雲端和自帶雲端選項供選擇，並支援所有主要雲端提供商，如 AWS、Azure、Google Cloud、Digital Ocean 和本地部署。
    - 我們使用智慧路由，每次都能連接到離你使用者最近的節點


## 進一步閱讀 {#further-reading}

- [以太坊節點服務列表](https://ethereumnodes.com/)

## 相關主題 {#related-topics}

- [節點與客戶端](/developers/docs/nodes-and-clients/)

## 相關教學 {#related-tutorials}

- [使用 Alchemy 開始以太坊開發](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [使用 Web3 和 Alchemy 發送交易指南](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)