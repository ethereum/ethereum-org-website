---
title: "網路"
description: "以太坊網路的概覽，以及在哪裡獲取測試網以太幣 (ETH) 來測試你的應用程式。"
lang: zh-tw
---

[以太坊](/)網路是使用以太坊協定進行通訊的互連電腦群組。只有一個以太坊主網，但可以為了測試和開發目的，建立符合相同協定規則的獨立網路。有許多符合該協定但不互相互動的獨立「網路」。你甚至可以在自己的電腦上啟動一個本地網路，用來測試你的智能合約和 Web3 應用程式。

你的以太坊帳戶可以在不同的網路中運作，但你的帳戶餘額和交易歷史紀錄不會從以太坊主網轉移過來。出於測試目的，了解有哪些可用的網路以及如何獲取測試網 ETH 來進行測試是非常有用的。一般來說，基於安全考量，不建議在測試網上重複使用主網帳戶，反之亦然。

## 先決條件 {#prerequisites}

在閱讀有關不同網路的資訊之前，你應該先了解[以太坊的基礎知識](/developers/docs/intro-to-ethereum/)，因為測試網路將為你提供一個廉價、安全的以太坊版本來進行測試。

## 公開網路 {#public-networks}

世界上任何有網際網路連線的人都可以存取公開網路。任何人都可以在公開區塊鏈上讀取或建立交易，並驗證正在執行的交易。節點之間的共識決定了交易的納入以及網路的狀態。

### 以太坊主網 {#ethereum-mainnet}

主網是主要的公開以太坊生產區塊鏈，具有實際價值的交易會發生在這個分散式帳本上。

當人們和交易所討論 ETH 價格時，他們談論的是主網 ETH。

### 以太坊測試網 {#ethereum-testnets}

除了主網之外，還有公開的測試網。這些是協定開發人員或智能合約開發人員使用的網路，用於在部署到主網之前，在類似生產的環境中測試協定升級以及潛在的智能合約。可以將其視為生產伺服器與預備伺服器 (staging servers) 的對比。

在部署到主網之前，你應該在測試網上測試你編寫的任何合約程式碼。在與現有智能合約整合的去中心化應用程式 (dapp) 中，大多數專案都有部署到測試網的副本。

大多數測試網一開始都使用許可制權威證明共識機制。這意味著會選擇少數節點來驗證交易並建立新區塊——在此過程中質押他們的身份。或者，有些測試網採用開放的權益證明 (PoS) 共識機制，每個人都可以像在以太坊主網上一樣測試執行驗證者。

測試網上的 ETH 應該沒有實際價值；然而，對於某些變得稀缺或難以獲得的測試網 ETH，已經出現了市場。由於你需要 ETH 才能實際與以太坊互動（即使在測試網上），大多數人會從水龍頭免費獲取測試網 ETH。大多數水龍頭都是網路應用程式，你可以輸入一個地址，並請求將 ETH 發送到該地址。

#### 我應該使用哪個測試網？ {#which-testnet-should-i-use}

客戶端開發人員目前維護的兩個公開測試網是 Sepolia 和 Hoodi。Sepolia 是一個供合約和應用程式開發人員測試其應用程式的網路。Hoodi 網路讓協定開發人員測試網路升級，並讓質押者測試執行驗證者。

#### Sepolia {#sepolia}

**Sepolia 是推薦用於應用程式開發的預設測試網**。Sepolia 網路使用由客戶端和測試團隊控制的許可制驗證者集。

##### 資源 {#} {#} {#} {#} {#}

- [網站](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### 水龍頭 {#} {#} {#} {#}

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

Hoodi 是一個用於測試驗證和質押的測試網。Hoodi 網路對想要執行測試網驗證者的使用者開放。因此，想要在協定升級部署到主網之前進行測試的質押者應該使用 Hoodi。

- 開放的驗證者集，質押者可以測試網路升級
- 龐大的狀態，有助於測試複雜的智能合約互動
- 同步時間較長，且執行節點需要更多儲存空間

##### 資源

- [網站](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [區塊鏈瀏覽器](https://explorer.hoodi.ethpandaops.io/)
- [檢查點同步](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### 水龍頭

- [Chain Platform Hoodi 水龍頭](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi 水龍頭](https://hoodi.ethpandaops.io/)
- [PoW 水龍頭](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery 是一種獨特的測試網，每個月都會完全重設。執行和共識狀態每 28 天會回復到創世狀態，這意味著在測試網上發生的任何事情都是短暫的。這使其成為短期測試、快速節點啟動以及不需要永久性的「hello world」類型應用程式的理想選擇。

- 始終保持全新狀態，適合驗證者和應用程式的短期測試
- 僅包含基本的合約集
- 開放的驗證者集，且容易獲取大量資金
- 最小的節點需求和最快的同步速度，平均小於 5GB

##### 資源

- [網站](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [社群聊天](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [信標鏈瀏覽器](https://beaconlight.ephemery.dev/)
- [檢查點同步](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### 水龍頭 {#faucets}

- [Bordel 水龍頭](https://faucet.bordel.wtf/)
- [Pk910 PoW 水龍頭](https://ephemery-faucet.pk910.de/)

#### Holesky（已棄用） {#holesky}

Holesky 測試網已於 2025 年 9 月棄用。質押營運商和基礎設施提供者應改用 Hoodi 進行驗證者測試。

- [Holesky 測試網關閉公告](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _以太坊基金會部落格，2025 年 9 月 1 日_
- [Holesky 與 Hoodi 測試網更新](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _以太坊基金會部落格，2025 年 3 月 18 日_

### 第二層 (L2) 測試網 {#layer-2-testnets}

[第二層 (L2)](/layer-2/) 是一個統稱，用來描述一組特定的以太坊擴容解決方案。第二層 (L2) 是一個獨立的區塊鏈，它擴展了以太坊並繼承了以太坊的安全保證。第二層 (L2) 測試網通常與公開的以太坊測試網緊密結合。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) 的測試網。

##### 資源

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### 水龍頭

- [Alchemy Arbitrum Sepolia 水龍頭](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [切林克 Arbitrum Sepolia 水龍頭](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia 水龍頭](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia 水龍頭](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) 的測試網。

##### 資源

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### 水龍頭

- [Alchemy 水龍頭](https://www.alchemy.com/faucets/optimism-sepolia)
- [切林克水龍頭](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia 水龍頭](https://ethfaucet.com/networks/optimism)
- [測試網水龍頭](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) 的測試網。

##### 資源

- [Voyager Sepolia 瀏覽器](https://sepolia.voyager.online/)

##### 水龍頭

- [Alchemy 水龍頭](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia 水龍頭](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet 水龍頭](https://starknet-faucet.vercel.app/)

## 私有網路 {#private-networks}

如果以太坊網路的節點未連接到公開網路（即主網或測試網），則該網路為私有網路。在這種情況下，私有僅表示保留或隔離，而不是受保護或安全。

### 開發網路 {#development-networks}

要開發以太坊應用程式，你會希望在部署之前先在私有網路上執行它，以查看其運作情況。就像你在電腦上建立本地伺服器進行網頁開發一樣，你可以建立一個本地區塊鏈實例來測試你的去中心化應用程式 (dapp)。這使得迭代速度比公開測試網快得多。

有專門協助處理此問題的專案和工具。了解更多關於[開發網路](/developers/docs/development-networks/)的資訊。

### 聯盟網路 {#consortium-networks}

共識過程由一組預先定義且受信任的節點控制。例如，由已知學術機構組成的私有網路，每個機構管理一個節點，並且區塊由網路內達到門檻數量的簽署者進行驗證。

如果公開的以太坊網路就像公共網際網路，那麼聯盟網路就像私有內部網路。

## <Emoji text="🚉" /> 為什麼以太坊測試網以地鐵站命名？ {#why-naming}

許多以太坊測試網都是以現實世界中的地鐵站或火車站命名。這個命名傳統很早就開始了，反映了貢獻者曾經生活或工作過的全球城市。它具有象徵意義、令人難忘且實用。就像測試網與以太坊主網隔離一樣，地鐵路線也與地面交通分開運作。

### <Emoji text="🚧" /> 常用與舊版測試網 {#common-and-legacy-testnets}

- **Sepolia** - 希臘雅典一個與地鐵相連的街區。目前用於智能合約和去中心化應用程式 (dapp) 測試。
- **Hoodi** - 以印度邦加羅爾的 Hoodi 地鐵站命名。用於驗證者和協定升級測試。
- **Goerli** _（已棄用）_ - 以德國柏林的 Görlitzer Bahnhof 命名。
- **Rinkeby** _（已棄用）_ - 以斯德哥爾摩一個有地鐵站的郊區命名。
- **Ropsten** _（已棄用）_ - 指斯德哥爾摩的一個地區和前渡輪/地鐵總站。
- **Kovan** _（已棄用）_ - 以新加坡的一個地鐵站命名。
- **Morden** _（已棄用）_ - 以倫敦地鐵站命名。以太坊的第一個公開測試網。

### <Emoji text="🧪" /> 其他專用測試網 {#other-testnets}

有些測試網是為了短期或特定升級測試而建立的，不一定以地鐵為主題：

- **Holesky** _（已棄用）_ - 以布拉格的 Holešovice 車站命名。用於驗證者測試；於 2025 年棄用。
- **Kiln**、**Zhejiang**、**Shandong**、**Prater**、**Pyrmont**、**Olympic** _（皆已棄用）_ 和 **Ephemery** - 專為合併、上海等升級模擬或驗證者實驗而建立。有些名稱是區域性或主題性的，而不是基於地鐵。

使用地鐵站名稱有助於開發人員快速識別和記住測試網，而無需依賴數字鏈 ID。這也反映了以太坊的文化：實用、全球化且以人為本。

## 相關工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _EVM 網路列表，用於將錢包和提供者連接到適當的鏈 ID 和網路 ID_
- [基於 EVM 的鏈](https://github.com/ethereum-lists/chains) _為 Chainlist 提供支援的鏈中繼資料 GitHub 儲存庫_

## 延伸閱讀 {#further-reading}

- [提案：可預測的以太坊測試網生命週期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊測試網的演進](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
