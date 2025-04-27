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

公共網路可由全球任何人透過網際網路進行存取。 任何人都可以在公共區塊鏈上讀取或建立交易，並且可以驗證已經執行的交易。 網路中對等節點間的共識決定了交易的納入和網路的狀態。

### 主網 {#mainnet}

主網是指主要的以太坊生產區塊鏈，所有具有實際價值的交易都發生在主網的去中心化帳本上。

當人們和交易所討論 ETH 價格時，他們談論的是主網上的 ETH。

### 測試網 {#testnets}

除了主網外，還有公共測試網。 測試網由協議開發者或智慧型合約開發者使用，用於在將建議部署到主網之前，在模擬主網的環境中測試協議升級和潛在的智慧型合約。 將其視為生產與試運行伺服器的類比。

在將你的合約部署到主網前，你應該先在測試網上測試你編寫的任何合約程式碼。 在與現有智慧型合約整合的去中心化應用程式中，大多數專案會將副本部署在測試網上。

目前主要的測試網是 Sepolia 和 Hoodi。 Sepolia 是合約和應用程式開發者用來測試其應用程式的網路。 而在 Hoodi 網路上，協議開發者測試網路升級，質押者測試驗證者的運行狀況。

#### Sepolia {#sepolia}

Sepolia 是推薦供開發者測試其應用程式的測試網。 Sepolia 網路採用許可制的驗證者集。 這意味著此測試網不對外開放新的驗證者，因此不具高風險性不會分叉或遇到下線的問題。 相對而言，該網路也擁有較小的狀態，這意味著需同步的網路較小，運行節點和與網路交互會更加容易。

- 採許可制的驗證者集，由用戶端和測試團隊控制
- 新測試網，狀態資料較少
- 快速同步且建立節點容易
- 若需測試合約或去中心化應用程式，可使用此網路

##### 資源

- [網站](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### 水龍頭

- [工作量證明水龍頭](https://sepolia-faucet.pk910.de/)
- [Coinbase 錢包水龍頭 | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia 水龍頭](https://sepoliafaucet.com/)
- [QuickNode Sepolia 水龍頭](https://faucet.quicknode.com/drip)
- [Infura Sepolia 水龍頭](https://www.infura.io/faucet)
- [Chainstack Sepolia 水龍頭](https://faucet.chainstack.com/sepolia-faucet)
- [Alchemy Sepolia 水龍頭](https://sepoliafaucet.com/)

#### Hoodi {#hoodi}

Hoodi 是為測試驗證和質押而設計的測試網。 Hoodi 網路對於希望運行測試網驗證者的使用者開放。 因此，想測試協議升級的質押者，應在部署至主網前先使用 Hoodi 測試。

- 開放的驗證者集，質押者可測試網路升級
- 較大的狀態資料，適用於測試複雜的智慧合約互動
- 同步時間較長，運行節點需要更多儲存空間

##### 資源

- [網站](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [區塊瀏覽器](https://explorer.hoodi.ethpandaops.io/)
- [檢查點同步](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### 水龍頭

- [Hoodi 水龍頭](https://hoodi.ethpandaops.io/)

要在 Hoodi 測試網上啟動驗證者，請使用 [Hoodi 啟動面板](https://hoodi.launchpad.ethereum.org/en/)。

### 第 2 層測試網 {#layer-2-testnets}

[第 2 層 (L2)](/layer-2/) 是一個統稱，用於描述一系列特定的以太坊擴容解決方案。 第 2 層是一個單獨的區塊鏈，它擴展以太坊並繼承了以太坊的安全保障。 第 2 層測試網通常與公共以太坊測試網緊密結合。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) 的測試網。

##### 水龍頭

- [Chainlink 水龍頭](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy 水龍頭](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) 的測試網。

##### 水龍頭

- [Chainlink 水龍頭](https://faucets.chain.link/optimism-sepolia)
- [Coinbase 錢包水龍頭 | Optimism Sepolia](https://coinbase.com/faucets/optimism-sepolia-faucet)
- [Alchemy 水龍頭](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) 的測試網。

##### 水龍頭

- [Alchemy 水龍頭](https://www.alchemy.com/faucets/starknet-sepolia)

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
