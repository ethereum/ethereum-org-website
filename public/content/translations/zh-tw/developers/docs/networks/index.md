---
title: 網路
description: 以太坊網路及何處獲取測試網以太幣 (ETH) 測試應用程式之概觀。
lang: zh-tw
---

以太坊網路是使用以太坊協議進行通訊的互聯計算機群組。 只存在一個以太坊主網，但可以建立符合相同協議規則的獨立網路以作為測試及開發用途。 有許多獨立的「網路」符合協議但不互相影響。 你甚至可以在自己的電腦本地建立一個網路，測試你的智慧型合約和 Web3 應用程式。

你的以太坊帳戶可以跨不同網路使用，但你的帳戶餘額及交易歷史記錄並不會跟著從以太坊主網轉移過去。 進行測試時，知道哪些網路可用及如何取得要試用的測試網以太幣是非常有用的。 一般來說，出於安全考量，並不推薦在測試網上再次使用主網帳戶，反之亦然。

## 基本資訊 {#prerequisites}

在深入閱讀不同網路相關內容前，你應先了解[以太坊的基礎知識](/developers/docs/intro-to-ethereum/)，因為測試網路會給你提供實惠、安全的以太坊版本以供測試。

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

目前用戶端開發者維護的兩個公共測試網分別為 Sepolia 及 Goerli。 Sepolia 是合約和應用程式開發者用來測試其應用程式的網路。 在 Goerli 網路上，協議開發者測試網路升級，質押者測試驗證者的運行狀況。

#### Sepolia {#sepolia}

**Sepolia 是推薦的針對應用程式開發的預設測試網**。 Sepolia 網路使用經許可的驗證者集合。 此網路還很新，表示它的狀態和歷史記錄都非常小。 這表示網路可以快速完成同步，且在它上面運行節點需要的空間較少。 這對想要快速啟動節點並直接與網路互動的使用者來說非常有用。

- 封閉的驗證者集合，由用戶端和測試團隊控制
- 新測試網，已部署的應用程式比其他測試網上少
- 快速同步和運行節點所需硬碟空間極小

##### 資源

- [官網](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [以太掃瞄器（Etherscan）](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### 水龍頭

- [QuickNode 的 Sepolia 水龍頭](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [工作量證明水龍頭](https://sepolia-faucet.pk910.de/)
- [Coinbase 錢包水龍頭 | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia 水龍頭](https://sepoliafaucet.com/)
- [Infura Sepolia 水龍頭](https://www.infura.io/faucet)
- [Chainstack Sepolia 水龍頭](https://faucet.chainstack.com/sepolia-faucet)
- [以太坊生態系統水龍頭](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Goerli_（長期支援）_ {#goerli}

_注意：[Goerli 測試網已被棄用](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)且將在 2023 年被 [Holesovice](https://github.com/eth-clients/holesovice) 取代。 請考慮將你的應用程式遷移到 Sepolia。_

Goerli 是測試驗證和質押的測試網。 Goerli 測試網對想要運行測試網驗證者的使用者開放。 因此，想測試協議升級的質押者，應在部署至主網前先使用 Goerli 測試。

- 開放的驗證者集合，質押者可以測試網路升級
- 龐大的狀態，對於測試複雜智慧型合約的互動很有用
- 同步時間更長，且需要更多儲存空間運行節點

##### 相關資源

- [官網](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)
- [Blockscout](https://eth-goerli.blockscout.com/)

##### 水龍頭

- [QuickNode 的 Goerli 水龍頭](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [工作量證明水龍頭](https://goerli-faucet.pk910.de/)
- [Paradigm 水龍頭](https://faucet.paradigm.xyz/)
- [Alchemy Goerli 水龍頭](https://goerlifaucet.com/)
- [All That Node Goerli 水龍頭](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase 錢包水龍頭 | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Chainstack Goerli 水龍頭](https://faucet.chainstack.com/goerli-faucet)

在 Holesky 測試網上啟動驗證者時，需要使用 Ethstaker 的[「廉價 Holesky 驗證者」啟動面板](https://holesky.launchpad.ethstaker.cc/en/)。

### 二層網路測試網 {#layer-2-testnets}

[二層網路 (L2)](/layer-2/) 是個統稱，描述一組特定的以太坊擴容方案。 二層網路是獨立的區塊鏈，拓展了以太坊並繼承了以太坊的安全保證。 二層網路測試網通常與以太坊公共測試網緊密相關。

#### Arbitrum Goerli {#arbitrum-goerli}

[Arbitrum](https://arbitrum.io/) 的測試網。

##### 水龍頭

- [Chainlink 水龍頭](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

[Optimism](https://www.optimism.io/) 的測試網。

##### 水龍頭

- [Paradigm 水龍頭](https://faucet.paradigm.xyz/)
- [Coinbase 錢包水龍頭 | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

[Starknet](https://www.starknet.io) 的測試網。

##### 水龍頭

- [Starknet 水龍頭](https://faucet.goerli.starknet.io)

## 私人網路 {#private-networks}

若節點未連接到公共網路 (即主網或測試網)，則以太坊網路就是一個 私人網路。 在此情況下，私人僅表示保留或隔離，而非受保護或安全。

### 發展網路 {#development-networks}

開發以太坊應用程式時，最好在部署前先在私人網路上執行，瞭解其運作情況。 類似於進行網頁開發時，在自己的電腦上建立本機伺服器，你可以建立本機區塊鏈實例來測試你的去中心化應用程式。 與公共測試網相比，這可以大幅提升迭代速度。

有些專門輔助專案和工具可以使用。 深入瞭解[開發網路](/developers/docs/development-networks/)的資訊。

### 聯盟網路 {#consortium-networks}

共識過程由預先定義的一組受信任節點控制。 舉例來說，在知名學術機構組成的私人網路中，每個機構管理單節點，區塊由網路中達到閾值數量的簽署人驗證。

如果說公共以太坊網路是公共網際網路，那麼聯盟網路就是私有內部網路。

## 相關工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _是將錢包與提供者連結到適當鏈 ID 與網路 ID 的以太坊虛擬機網路的清單_
- [採用以太坊虛擬機 (EVM) 的鏈](https://github.com/ethereum-lists/chains) _Github 鏈中繼資料存放庫，支援 Chainlist_

## 衍生閱讀 {#further-reading}

- [提案：可預測的以太坊測試網生命週期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊測試網的演進](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
