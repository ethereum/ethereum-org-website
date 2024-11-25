---
title: 節點做為一服務
description: 節點服務、優缺點及熱門提供者入門級概覽
lang: zh-tw
sidebarDepth: 2
---

## 簡介 {#Introduction}

運作自己的[以太坊節點](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients)可能比較困難，特別是初始階段或快速擴容時。 有[許多服務](#popular-node-services)可以為你運行最佳化的節點基礎設施，因此你可以專注於開發應用程式或產品。 我們將解釋節點服務的工作原理、使用節點服務的優缺點，並列出提供者（如果你有興趣開始使用）。

## 基本資訊 {#prerequisites}

如你還不太瞭解節點及用戶端，請查看[節點及用戶端](/developers/docs/nodes-and-clients/)。

## 質押者 {#stakoooooooooooooors}

單獨質押者必須運行自己的基礎設施，而非依賴第三方提供者。 這表示運行一個執行用戶端和一個關聯的共識用戶端。 在[合併](/roadmap/merge)前，只運行共識用戶端且使用中心化提供者以執行資料是可行的；但現在已不再可行 - 單獨質押者必須同時運行兩種用戶端。 然而，有些服務可以簡化這個流程。

[閱讀更多關於運行節點的相關資訊](/developers/docs/nodes-and-clients/run-a-node/)。

本頁說明的服務適用於非質押節點。

## 節點服務如何運作？ {#how-do-node-services-work}

節點服務提供者在幕後為你運行分散式節點用戶端，因此你無需再這麼做。

這些服務通常提供一個應用程式介面金鑰，你可以使用該金鑰在區塊鏈中寫入和讀取。 除了包含存取以太坊主網的權限外，它們通常還包含存取[測試網](/developers/docs/networks/#ethereum-testnets)的權限。

一些服務為你提供屬於你的專用節點並為你管理這些節點，而其他服務使用負載平衡器於各節點間分配活動。

幾乎所有節點服務極易整合，只需變更一行程式碼就能更換自託管節點，甚至可以在服務本身之間進行切換。

通常，節點服務運行多種[節點用戶端](/developers/docs/nodes-and-clients/#execution-clients)與[類型](/developers/docs/nodes-and-clients/#node-types)，讓你能在一個應用程式介面中除了存取特定於用戶端的方法外，還能存取全節點和歸檔節點。

值得關注的是，節點服務不會也不應儲存你的私密金鑰或個人資訊。

## 使用節點服務有何好處？ {#benefits-of-using-a-node-service}

使用節點服務的主要好處是不必花工程時間，來自行維護和管理節點。 這使你能專注於構建產品，而不必擔心基礎設施維護。

從存儲到頻寬再到昂貴的工程時間，運行你自己的節點可能非常昂貴。 諸如在擴容時啟動更多節點、將節點升級到最新版本，以及確保狀態一致性，都會讓你無法專心使用資源建立所需的 web3 產品。

## 使用節點服務有何缺點？ {#cons-of-using-a-node-service}

使用節點服務，意味著你在中心化產品的基礎設施。 因此，最重視去中心化的專案可能會傾向於自託管節點，而不是外包給第三方。

閱讀更多關於[運行你自己的節點之優點](/developers/docs/nodes-and-clients/#benefits-to-you)。

## 熱門節點服務 {#popular-node-services}

下方列出了最熱門的以太坊節點服務提供者，歡迎新增此處遺漏的提供者。 除了免費或付費方案，每個節點服務還提供不同的優點和功能，你應該在做出決定之前先調查哪些服務最符合你的需求。

- [**Alchemy**](https://alchemy.com/)
  - [文件](https://docs.alchemyapi.io/)
  - 功能
    - 最大的免費方案每個月提供了 3 億運算單元 (約 3000 萬次 getLatestBlock 請求)
    - 支援多鏈，如 Polygon、Starknet、Optimism、Arbitrum
    - 為約 70% 最大的以太坊去中心化應用程式和去中心化金融交易量提供支援
    - 透過 Alchemy Notify 的即時 webhook 通知
    - 一流的支援和可靠性/穩定性
    - Alchemy 的 NFT API
    - 包含 Request Explorer、Mempool Watcher 和 Composer 的儀表板
    - 整合測試網水龍頭存取
    - 超過 1.8 萬使用者的活躍 Discord 建構者社群

- [**All That Node**](https://allthatnode.com/)
  - [文件](https://docs.allthatnode.com/)
  - 特徵
    - 免費方案每天 50,000 個請求
    - 支援 40 多種協定
    - 支援 JSON-RPC（以太坊虛擬機、Tendermint）、具象狀態傳輸和 Websocket 應用程式介面
    - 無限制存取歸檔日期
    - 全年無休的技術支援和 99.9% 以上的正常運作時間
    - 支援多鏈的水龍頭
    - 使用不限數量的應用程式介面金鑰進行無限的端點存取
    - 支援追蹤/除錯應用程式介面
    - 自動更新

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [文件](https://aws.amazon.com/managed-blockchain/resources/)
  - 功能
    - 完全託管的以太坊節點
    - 在 6 個地區可用
    - 基於超文字傳輸協定的 JSON-RPC 和安全 WebSocket
    - 支援 3 條鏈
    - 服務等級協定，全年無休的 AWS 支援
    - Go-ethereum 及 Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [文件](https://docs.ankr.com/)
  - 特徵
    - Ankr 協定 - 開放對超過 8 個鏈的公共遠端程序呼叫應用程式介面端點的存取
    - 負載平衡與節點健康監控，以取得連結到最近可用節點的更快更可靠的閘道
    - 支援 WSS 端點與無上限速率限制的高級方案
    - 針對超過 40 個鏈的一鍵式全節點和驗證者節點部屬
    - 隨時擴容
    - 分析工具
    - 儀表板
    - 遠端程序呼叫、超文字安全傳輸通訊協定及 WSS 端點
    - 直接支援

- [**Blast**](https://blastapi.io/)
  - [文件](https://docs.blastapi.io/)
  - 功能
    - 支援遠端程序呼叫及 WSS
    - 多區域節點託管
    - 去中心化的基礎設施
    - 公共遠端程序呼叫
    - 專用的免費方案
    - 支援多鏈（超過 17 種區塊鏈）
    - 歸檔節點
    - 全年無休 Discord 支援
    - 全年無休監控及通知
    - 總 SLA 達到 99.9%
    - 可使用加密貨幣付款

- [**BlockDaemon**](https://blockdaemon.com/)
  - [文件](https://ubiquity.docs.blockdaemon.com/)
  - 優點
    - 控制面板
    - 基於節點
    - 分析

- [**BlockPI**](https://blockpi.io/)
  - [文件](https://docs.blockpi.io/)
  - 功能
    - 分散式的穩健節點結構
    - 多達 40 多種超文字安全傳輸通訊協定與 WSS 端點
    - 免費註冊方案及每月方案
    - 追蹤 method + 歸檔資料支援
    - 免費方案 90 天內有效
    - 自訂方案及隨用隨付方案
    - 可使用加密貨幣付款
    - 直接支援與技術支援

- [**Chainbase**](https://www.chainbase.com/)
  - [文件](https://docs.chainbase.com)
  - 功能
    - 高可用性、快速及可擴容的遠端程序呼叫服務
    - 多鏈支援
    - 免關稅
    - 使用者友善的儀表板
    - 提供遠端程序呼叫以外的區塊鏈資料服務

- [**Chainstack**](https://chainstack.com/)
  - [文件](https://docs.chainstack.com/)
  - 特徵
    - 免費共享節點
    - 共享歸檔節點
    - GraphQL 支援
    - 遠端程序呼叫和 WSS 端點
    - 專用全節點及歸檔節點
    - 針對專門部署的快速同步時間
    - 自攜雲端
    - 按小時付費定價
    - 全年無休直接支援

- [**DataHub**](https://datahub.figment.io)
  - [文件](https://docs.figment.io/)
  - 功能
    - 免費方案 3,000,000 次請求/月
    - RPC 及 WSS 末端
    - 專用之全及歸檔節點
    - 自動擴容（批量折扣）
    - 免費歸檔資料
    - 服務分析
    - 控制面板
    - 全年無休直接支援
    - 可用加密貨幣付款（企業）

- [**DRPC**](https://drpc.org/)
  - [文件](https://docs.drpc.org/)
  - 功能
    - 去中心化遠端程序呼叫節點
    - 超過 15 個節點提供者
    - 節點平衡
    - 免費方案每個月擁有無上限的運算單元
    - 資料驗證
    - 自訂端點
    - 超文字安全傳輸通訊協定與 WSS 端點
    - 不限數量的金鑰（免費和付費方案）
    - 彈性的備援選項
    - [公共端點](https://eth.drpc.org)
    - 免費共享歸檔節點

- [**GetBlock**](https://getblock.io/)
  - [文件](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 功能
    - 存取超過 40 個區塊鏈節點
    - 每天 40000 個免費請求
    - 不限數量的應用程式介面金鑰
    - 1GB/秒的高連線速度
    - 追蹤+歸檔
    - 進階分析
    - 自動更新
    - 技術支援

- [**InfStones**](https://infstones.com/)
  - 特色功能
    - 免費方案選項
    - 隨時擴容
    - 分析
    - 儀表板
    - 獨特應用程式介面端點
    - 專用全節點
    - 針對專門部署的快速同步時間
    - 全年無休直接支援
    - 存取超過 50 個區塊鏈節點

- [**Infura**](https://infura.io/)
  - [文件](https://infura.io/docs)
  - 特色功能
    - 免費方案選項
    - 隨時擴容
    - 付費歸檔資料
    - 直接支援
    - 儀表板

- [**Kaleido**](https://kaleido.io/)
  - [文件](https://docs.kaleido.io/)
  - 特徵
    - 免費新手方案
    - 一鍵部署以太坊節點
    - 可自訂的用戶端與演算法（Geth、 Quorum 和 Besu || PoA、IBFT 和 Raft）
    - 超過 500 個管理與服務應用程式介面
    - 用於以太坊交易提交的 RESTful 介面（Apache Kafka 支援）
    - 用於事件傳遞的出站串流（Apache Kafka 支援）
    - 「鏈下」與輔助服務（例如雙層加密訊息傳輸）的深度集合
    - 透過管理體系和基於角色的存取控制實現簡單的網路接入
    - 面向管理員與終端使用者的精細使用者管理
    - 高度可擴充、有彈性的企業級基礎設施
    - 雲端 HSM 私密金鑰管理
    - 以太坊主網繫連
    - ISO 27k 與 SOC 2、Type 2 驗證
    - 動態執行階段配置（例如新增雲端整合、變更節點入口等等）
    - 支援多雲端、多區域和混合部署編排
    - 單純按小時的基於 SaaS 的定價
    - SLA 與全年無休支援

- [**Lava Network**](https://www.lavanet.xyz/)
  - [文件](https://docs.lavanet.xyz/)
  - 特徵
    - 免費使用測試網
    - 支援高正常運行時間的去中心化冗餘
    - 開源
    - 完全去中心化的軟體開發套件
    - 與 Ether.js 整合
    - 直覺化的專案管理介面
    - 以共識為基礎的資料整合
    - 支援多鏈

- [**Moralis**](https://moralis.io/)
  - [文件](https://docs.moralis.io/)
  - 功能
    - 免費共享節點
    - 免費共享歸檔節點
    - 注重隱私（無日誌政策）
    - 跨鏈支援
    - 隨時擴容
    - 儀表板
    - 獨特的以太坊軟體開發套件
    - 獨特應用程式介面端點
    - 直接技術支援

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [文件](https://docs.nodereal.io/nodereal/meganode/introduction)
  - 功能
    - 可靠、快速和可擴充的遠端程序呼叫應用程式介面服務
    - 專為 Web3 開發者打造的增強版應用程式介面
    - 多鏈支援
    - 免費開始試用

- [**NOWNodes**](https://nownodes.io/)
  - [文件](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - 功能
    - 存取超過 50 個區塊鏈節點
    - 免費應用程式介面金鑰
    - 區塊瀏覽器
    - 應用程式介面回應時間 ⩽ 1 秒
    - 全年無休支援團隊
    - 個人帳戶管理器
    - 共享、歸檔、備份和專用節點

- [**Pocket Network**](https://www.pokt.network/)
  - [文件](https://docs.pokt.network/home/)
  - 功能
    - 去中央化遠端程序中呼叫協定與市場
    - 免費方案每天 100 萬個請求（每個端點，最大為 2）
    - [公共端點](https://docs.pokt.network/developers/public-endpoints)
    - Pre-Stake+ 計畫（如果你每天需要超過 100 萬個請求）
    - 支援超過 15 條區塊鏈
    - 6400+ 節點透過服務應用程式賺取 POKT 幣
    - 歸檔節點、具追蹤功能的歸檔節點和測試網節點支援
    - 以太坊主網節點用戶端多樣性
    - 無單點故障
    - 零停機時間
    - 成本效益幾乎近零之代幣經濟（質押 POKT 幣一次即可獲得網路帶寬）
    - 沒有每月的沉沒成本，將你的基礎設施變成資產
    - 協定內建負載平衡
    - 隨時無限擴充每天的請求數和每小時的節點數
    - 最私密、抗審查之選項
    - 實際開發者支援
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 儀表板和分析

- [**QuickNode**](https://www.quicknode.com)
  - [文件](https://www.quicknode.com/docs/)
  - 功能
    - 全年無休技術支援和 Discord 開發者社群
    - 平衡地理分佈、多雲端/伺服器的環境、低延遲的網路
    - 支援多鏈（Optimism、Arbitrum、Polygon 及另外 11 條鏈）
    - 快速穩定的中間層（呼叫路由、快取、索引）
    - 透過 Webhook 監控智慧型合約
    - 直覺化的儀表板、分析套件、遠端程序呼叫編寫器
    - 進階安全功能（JWT、遮罩、白名單）
    - 非同質化代幣資料及分析應用程式介面
    - [已獲得 SOC2 認證](https://www.quicknode.com/security)
    - 適合開發者和企業

- [**Rivet**](https://rivet.cloud/)
  - [文件](https://rivet.readthedocs.io/en/latest/)
  - 功能
    - 免費方案選項
    - 隨時擴容

- [**SenseiNode**](https://senseinode.com)
  - [文件](https://docs.senseinode.com/)
  - 功能
    - 專用及共享節點
    - 儀表板
    - 在拉丁美洲不同地點的多個託管商上託管 AWS
    - Prysm 和 Lighthouse 用戶端

- [**SettleMint**](https://console.settlemint.com/)
  - [文件](https://docs.settlemint.com/)
  - 功能
    - 免費試用
    - 隨時擴容
    - GraphQL 支援
    - 遠端程序呼叫和 WSS 端點
    - 專用全節點
    - 自攜雲端
    - 分析工具
    - 儀表板
    - 按小時付費定價
    - 直接支援

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [文件](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - 功能
    - 免費方案包含了每個月 2500 萬 Tenderly Units 的額度
    - 免費存取歷史資料
    - 讀取密集型工作負載速度高達 8 倍
    - 100% 一致的讀取存取
    - JSON-RPC 端點
    - 基於使用者介面的遠端程序呼叫請求建構器和請求預覽
    - 與 Tenderly 的開發、除錯及測試工具緊密整合
    - 模擬交易
    - 使用情況分析和過濾
    - 可輕鬆存取的金鑰管理
    - 透過聊天、電子郵件和 Discord 的專門工程支援

- [**Tokenview**](https://services.tokenview.io/)
  - [文件](https://services.tokenview.io/docs?type=nodeService)
  - 功能
    - 全年無休技術支援和 Telegram 開發者社群
    - 支援多鏈（比特幣、以太坊、波場、BNB 智能鏈、以太坊經典）
    - 遠端程序呼叫和 WSS 端點均開放使用
    - 無限制存取歸檔資料應用程式介面
    - 有 Request Explorer 和 Mempool Watcher 的儀表板
    - 非同質化代幣資料應用程式介面和 Webhook 通知
    - 使用加密貨幣付款
    - 對額外行為要求的外部支援

- [**Watchdata**](https://watchdata.io/)
  - [文件](https://docs.watchdata.io/)
  - 功能
    - 資料可靠性
    - 不間斷連線，無停機時間
    - 過程自動化
    - 免關稅
    - 適合任何使用者的高限制
    - 支援多種節點
    - 資源擴充
    - 高處理速度

- [**ZMOK**](https://zmok.io/)
  - [文件](https://docs.zmok.io/)
  - 功能
    - 預先交易即服務
    - 包含搜尋/過濾方法的全域交易内存池
    - 發送交易時，手續費和燃料費皆無限制
    - 可最快取得新區塊及讀取區塊鏈
    - 單個應用程序介面呼叫的最佳價格保證

- [**Zeeve**](https://www.zeeve.io/)
  - [文件](https://www.zeeve.io/docs/)
  - 功能
    - 企業級的無程式碼自動化平臺，提供了部署、監測和管理區塊鏈節點和網路的功能
    - 支援及整合超過 30 個以上協定，持續增加中
    - 增值 Web3 基礎設施服務，如去中心化儲存、去中心化身份和用於現實世界的區塊鏈帳本資料應用程度介面
    - 全年無休支援和主動監控以確保節點健康。
    - 遠端程序呼叫端點提供了經驗證的應用程式介面存取，透過直覺式的儀表板和分析輕鬆愉快地進行管理。
    - 提供託管雲端服務和使用自己的雲端服務兩種選項，支援所有主流的雲端提供商，如 AWS、Azure、Google Cloud、Digital Ocean 和本地部署雲端。
    - 我們總是使用智慧路由以連接最靠近你的使用者的節點


## 延伸閱讀 {#further-reading}

- [以太坊節點服務清單](https://ethereumnodes.com/)

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)

## 相關教程 {#related-tutorials}

- [使用 Alchemy 開始以太坊開發](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [使用 web3 和 Alchemy 發送交易的指南](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
