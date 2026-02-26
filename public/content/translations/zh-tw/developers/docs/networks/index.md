---
title: "網路"
description: "以太坊網路及何處獲取測試網以太幣 (ETH) 測試應用程式之概觀。"
lang: zh-tw
---

以太坊網路是使用以太坊協議進行通訊的互聯計算機群組。 只存在一個以太坊主網，但可以建立符合相同協議規則的獨立網路以作為測試及開發用途。 有許多獨立的「網路」符合協議但不互相影響。 你甚至可以在自己的電腦本地建立一個網路，測試你的智慧型合約和 Web3 應用程式。

你的以太坊帳戶可以跨不同網路使用，但你的帳戶餘額及交易歷史記錄並不會跟著從以太坊主網轉移過去。 進行測試時，知道哪些網路可用及如何取得要試用的測試網以太幣是非常有用的。 一般來說，出於安全考量，並不推薦在測試網上再次使用主網帳戶，反之亦然。

## 先決條件 {#prerequisites}

在深入閱讀不同網路的相關內容前，你應先了解[以太坊的基礎知識](/developers/docs/intro-to-ethereum/)，因為測試網會給你提供實惠、安全的以太坊版本以供測試。

## 公共網路 {#public-networks}

公共網路可供世界上任何有網際網路連線的人訪問。 任何人都能在公共區塊鏈上讀取或創建交易並驗證被執行的交易。 對等節點間的共識決定了交易的打包和網路的狀態。

### 以太坊主網 {#ethereum-mainnet}

主網為以太坊的主要公共生產區塊鏈，也為實際交易發生於分佈式帳本之所在。

當人們和交易所討論以太幣價格時，討論的是主網以太幣。

### 以太坊測試網 {#ethereum-testnets}

除主網外，還有一些公共測試網。 應用程式開發者或智慧型合約開發者使用測試網來測試協議升級，也用於在部署到主網之前在一個類生產環境中測試潛在的智慧型合約。 可將主網與測試網類比於生產伺服器與暫置伺服器。

部署至主網前，應在測試網上測試你編寫的所有合約程式碼。 在整合了智慧型合約的去中心化應用程式中，大部分專案都有部署到測試網的版本。

大部分測試網一開使都使用權威證明共識機制。 這表示將挑選出一小部分節點驗證交易並創建新區塊 – 並在此過程中質押其身分。 或者，有些測試網採用開放的權益證明共識機制，任何人都可以測試驗證者的運行狀況，就像在以太坊主網上一樣。

測試網上的以太幣原本應該是沒有實際價值的；然而，已經有為取得一些稀少或難以獲得的測試網以太幣而建立的市場。 因為要和以太坊（即使在測試網上）實際互動需要以太幣，多數人透過水龍頭免費獲得測試網以太幣。 多數水龍頭為 Web 應用程式，你可以在其中輸入你請求發送以太幣的地址。

#### 我該使用哪個測試網？

目前用戶端開發者維護的兩個公共測試網分別為 Sepolia 及 Hoodi。 Sepolia 是合約和應用程式開發者用來測試其應用程式的網路。 在 Hoodi 網路上，協議開發者測試網路升級，質押者測試驗證者的運行狀況。

#### Sepolia {#sepolia}

**Sepolia 是推薦用於應用程式開發的預設測試網**。 Sepolia 網路使用許可制的驗證程式集合，由用戶端和測試團隊控制。

##### 資源

- [網站](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### 水龍頭

- [Alchemy Sepolia 水龍頭](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia 水龍頭](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia 水龍頭](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [以太坊生態系水龍頭](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia 水龍頭](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia 水龍頭](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia 水龍頭](https://www.infura.io/faucet)
- [PoW 水龍頭](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia 水龍頭](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi 是測試驗證和質押的測試網。 Hoodi 測試網對想要運行測試網驗證者的使用者開放。 因此，想測試協議升級的質押者，應在部署至主網前先使用 Hoodi 測試。

- 開放的驗證者集合，質押者可以測試網路升級
- 龐大的狀態，對於測試複雜的智能合約互動很有幫助
- 同步時間更長，運行節點需要更多存儲

##### 資源

- [網站](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [瀏覽器](https://explorer.hoodi.ethpandaops.io/)
- [檢查點同步](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### 水龍頭

- [Chain Platform Hoodi 水龍頭](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi 水龍頭](https://hoodi.ethpandaops.io/)
- [PoW 水龍頭](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery 是一個獨特的測試網，每個月都會完全重置。 執行和共識狀態每 28 天回滾至創世區塊，這意味著在測試網上發生的任何事情都是短暫的 (ephemeral)。 這使其非常適合短期測試，快速節點引導以及不需要持久性的「hello world」類應用程式。

- 不斷刷新狀態，適用於驗證者和應用程式的短期測試
- 只包含基本的合約集合
- 開放驗證者集合，能夠輕鬆訪問大量資金
- 最低的節點要求和最快的同步速度，平均小於 5GB

##### 資源

- [網站](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [社群聊天室](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [信標瀏覽器](https://beaconlight.ephemery.dev/)
- [檢查點同步](https://checkpoint-sync.ephemery.ethpandaops.io)
- [啟動面板](https://launchpad.ephemery.dev/)

#### 水龍頭

- [Bordel 水龍頭](https://faucet.bordel.wtf/)
- [Pk910 PoW 水龍頭](https://ephemery-faucet.pk910.de/)

#### Holesky (已棄用) {#holesky}

Holesky 測試網將在 2025 年 9 月棄用。 質押營運者和基礎設施提供者應該使用 Hoodi 進行驗證者測試。

- [Holesky 測試網關閉公告](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _以太坊基金會部落格，2025 年 9 月 1 日_
- [Holesky 與 Hoodi 測試網更新](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _以太坊基金會部落格，2025 年 3 月 18 日_

### 二層測試網 {#layer-2-testnets}

[第二層 (L2)](/layer-2/) 是個統稱，描述一組特定的以太坊擴容方案。 二層網路是獨立的區塊鏈，拓展了以太坊並繼承了以太坊的安全保證。 二層網路測試網通常與以太坊公共測試網緊密相關。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) 的一個測試網。

##### 資源

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### 水龍頭

- [Alchemy Arbitrum Sepolia 水龍頭](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia 水龍頭](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia 水龍頭](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia 水龍頭](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) 的一個測試網。

##### 資源

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### 水龍頭

- [Alchemy 水龍頭](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink 水龍頭](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia 水龍頭](https://ethfaucet.com/networks/optimism)
- [測試網水龍頭](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) 的一個測試網。

##### 資源

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### 水龍頭

- [Alchemy 水龍頭](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia 水龍頭](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet 水龍頭](https://starknet-faucet.vercel.app/)

## 私有網路 {#private-networks}

如果一個以太坊網路的節點未連線至公共網路 (即主網或測試網)，則該網路為私有網路。 在此情況下，私人僅表示保留或隔離，而非受保護或安全。

### 開發網路 {#development-networks}

開發以太坊應用程式時，最好在部署前先在私人網路上執行，瞭解其運作情況。 類似於進行網頁開發時，在自己的電腦上建立本機伺服器，你可以建立本機區塊鏈實例來測試你的去中心化應用程式。 與公共測試網相比，這可以大幅提升迭代速度。

有些專門輔助專案和工具可以使用。 深入了解[開發網路](/developers/docs/development-networks/)。

### 聯盟網路 {#consortium-networks}

共識過程由預先定義的一組受信任節點控制。 舉例來說，在知名學術機構組成的私人網路中，每個機構管理單節點，區塊由網路中達到閾值數量的簽署人驗證。

如果說公共以太坊網路是公共網際網路，那麼聯盟網路就是私有內部網路。

## <Emoji text="🚉" /> 為何以太坊測試網會以地鐵站命名？ {#why-naming}

許多以太坊測試網都以真實世界的地鐵站或火車站命名。 這個命名傳統很早就開始了，它反映了貢獻者曾經生活或工作過的全球城市。 它既具象徵意義、好記，又很實用。 就像測試網獨立於以太坊主網一樣，地鐵線路也與地面交通分開運行。

### <Emoji text="🚧" /> 常用與舊版測試網 {#common-and-legacy-testnets}

- **Sepolia** - 希臘雅典一個有地鐵相連的社區。 目前用於智慧合約和去中心化應用程式的測試。
- **Hoodi** - 以印度班加羅爾的 Hoodi 地鐵站命名。 用於驗證程式與協定升級測試。
- **Goerli** _(已棄用)_ - 以德國柏林的 Görlitzer Bahnhof 站命名。
- **Rinkeby** _(已棄用)_ - 以斯德哥爾摩一個有地鐵站的郊區命名。
- **Ropsten** _(已棄用)_ - 指斯德哥爾摩的一個地區及過去的渡輪/地鐵總站。
- **Kovan** _(已棄用)_ - 以新加坡的一個地鐵站命名。
- **Morden** _(已棄用)_ - 以倫敦的一個地鐵站命名。 以太坊的第一個公共測試網。

### <Emoji text="🧪" /> 其他專用測試網 {#other-testnets}

有些測試網是為短期或特定升級測試而建立，不一定以地鐵為主題：

- **Holesky** _(已棄用)_ - 以布拉格的 Holešovice 站命名。 用於驗證程式測試；於 2025 年棄用。
- **Kiln**、**Zhejiang**、**Shandong**、**Prater**、**Pyrmont**、**Olympic** _(皆已棄用)_ 與 **Ephemery** - 為合併、上海升級等升級模擬，或驗證程式實驗而專門打造。 有些名稱是地域性或主題性的，而非以地鐵為基礎。

使用地鐵站名有助於開發者快速識別及記住測試網，而無需依賴數字鏈 ID。 這也反映了以太坊的文化：實用、全球化與以人為本。

## 相關工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _以太坊虛擬機網路清單，用於將錢包和提供者連接到對應的鏈 ID 和網路 ID_
- [基於 EVM 的鏈](https://github.com/ethereum-lists/chains) _為 Chainlist 提供支援的鏈元資料 GitHub 存放庫_

## 延伸閱讀 {#further-reading}

- [提案：可預測的以太坊測試網生命週期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊測試網的演變](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
