---
title: 以太坊治理簡介
metaTitle: 以太坊治理
description: 介紹以太坊如何進行決策。
lang: zh-tw
---

_如果沒有人擁有[以太坊](/)，那麼關於以太坊過去和未來變更的決策是如何制定的？以太坊治理就是指允許制定這些決策的過程。_

<Divider />

## 什麼是治理？ {#what-is-governance}

治理是允許制定決策的既有系統。在典型的組織結構中，執行團隊或董事會可能在決策中擁有最終決定權。或者，也許股東會對提案進行投票以實施變更。在政治體系中，民選官員可能會制定試圖代表其選民意願的立法。

## 去中心化治理 {#decentralized-governance}

沒有任何一個人擁有或控制以太坊協定，但仍然需要就實施變更做出決策，以最好地確保網路的長遠發展與繁榮。這種缺乏所有權的特性，使得傳統的組織治理成為一種不相容的解決方案。

## 以太坊治理 {#ethereum-governance}

以太坊治理是制定協定變更的過程。必須指出的是，這個過程與人們和應用程式如何使用該協定無關——以太坊是無需許可的。世界上任何地方的任何人都可以參與鏈上活動。對於誰可以或不可以建立應用程式或發送交易，並沒有設定任何規則。然而，對於去中心化應用程式 (dapp) 運行其上的核心協定，確實存在一個提出變更的過程。由於有這麼多人依賴以太坊的穩定性，核心變更（包括社會和技術過程）的協調門檻非常高，以確保對以太坊的任何變更都是安全的，並得到社群的廣泛支持。

<VideoWatch slug="ethereum-core-governance-explained" />

### 鏈上與鏈下治理 {#onchain-vs-offchain}

區塊鏈技術帶來了新的治理能力，稱為鏈上治理。鏈上治理是指提議的協定變更由利益相關者投票決定，通常由治理代幣的持有者進行，且投票發生在區塊鏈上。在某些形式的鏈上治理中，提議的協定變更已經寫入程式碼中，如果利益相關者透過簽署交易來授權這些變更，就會自動實施。

相反的方法是鏈下治理，其中任何協定變更決策都是透過社會討論的非正式過程進行的，如果獲得批准，將在程式碼中實施。

**以太坊治理在鏈下進行**，並有各種各樣的利益相關者參與此過程。

_雖然在協定層面，以太坊治理是鏈下的，但許多建立在以太坊之上的使用案例（例如 DAO）都使用鏈上治理。_

<ButtonLink href="/dao/">
  更多關於 DAO 的資訊
</ButtonLink>

<Divider />

## 誰參與其中？ {#who-is-involved}

[以太坊社群](/community/)中有各種利益相關者，每個人都在治理過程中扮演著一個角色。從距離協定最遠的利益相關者開始，逐步深入，我們有：

- **以太幣持有者**：這些人持有任意數量的 ETH。[更多關於 ETH 的資訊](/what-is-ether/)。
- **應用程式使用者**：這些人與以太坊區塊鏈上的應用程式進行互動。
- **應用程式/工具開發者**：這些人編寫在以太坊區塊鏈上運行的應用程式（例如去中心化金融 (DeFi)、NFT 等），或建立與以太坊互動的工具（例如錢包、測試套件等）。[更多關於去中心化應用程式 (dapp) 的資訊](/apps/)。
- **節點營運者**：這些人運行傳播區塊和交易的節點，拒絕他們遇到的任何無效交易或區塊。[更多關於節點的資訊](/developers/docs/nodes-and-clients/)。
- **EIP 作者**：這些人以以太坊改進提案 (EIP) 的形式提出對以太坊協定的變更。[更多關於 EIP 的資訊](/eips/)。
- **驗證者**：這些人運行可以將新區塊新增至以太坊區塊鏈的節點。
- **協定開發者**（又稱「核心開發者」）：這些人維護各種以太坊實作（例如執行層的 go-ethereum、奈瑟邁 (Nethermind)、貝蘇 (Besu)、艾瑞貢 (Erigon)、瑞斯 (Reth)，或共識層的普萊斯姆 (Prysm)、萊特豪斯 (Lighthouse)、寧布斯 (Nimbus)、泰庫 (Teku)、洛德斯塔 (Lodestar)、Grandine）。[更多關於以太坊客戶端的資訊](/developers/docs/nodes-and-clients/)。

_注意：任何個人都可以同時屬於這些群體中的多個（例如，協定開發者可以倡導 EIP，運行信標鏈驗證者，並使用去中心化金融 (DeFi) 應用程式）。不過，為了概念上的清晰，區分它們是最容易的。_

<Divider />

## 什麼是 EIP？ {#what-is-an-eip}

以太坊治理中使用的一個重要過程是提出**以太坊改進提案 (EIP)**。EIP 是為以太坊指定潛在新功能或過程的標準。以太坊社群內的任何人都可以建立 EIP。如果您有興趣編寫 EIP 或參與同儕審查和/或治理，請參閱：

<ButtonLink href="/eips/">
  更多關於 EIP 的資訊
</ButtonLink>

<Divider />

## 正式過程 {#formal-process}

對以太坊協定引入變更的正式過程如下：

1. **提出核心 EIP**：如 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) 中所述，正式提議對以太坊進行變更的第一步是在核心 EIP 中詳細說明。這將作為 EIP 的官方規範，如果被接受，協定開發者將實施它。

2. **向協定開發者展示您的 EIP**：一旦您有了一個已經收集了社群意見的核心 EIP，您應該將其展示給協定開發者。您可以透過在 [AllCoreDevs 電話會議](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status)上提議討論來做到這一點。很可能一些討論已經在 [Ethereum Magicians 論壇](https://ethereum-magicians.org/)或 [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw) 中非同步進行了。

> 此階段的潛在結果是：

> - 該 EIP 將被考慮用於未來的網路升級
> - 將被要求進行技術變更
> - 如果它不是優先事項，或者相對於開發工作量而言改進不夠大，則可能會被拒絕

3. **反覆運算以達成最終提案：** 在收到所有相關利益相關者的回饋後，您可能需要對初始提案進行變更，以提高其安全性或更好地滿足各種使用者的需求。一旦您的 EIP 納入了您認為必要的所有變更，您將需要再次將其展示給協定開發者。然後，您將進入此過程的下一步，或者會出現新的疑慮，需要對您的提案進行新一輪的反覆運算。

4. **EIP 包含在網路升級中**：假設 EIP 獲得批准、測試和實施，它將被安排為網路升級的一部分。鑑於網路升級的協調成本很高（每個人都需要同時升級），EIP 通常會捆綁在一起進行升級。

5. **網路升級啟動**：網路升級啟動後，EIP 將在以太坊網路上線。_注意：網路升級通常在測試網上啟動，然後才在以太坊主網上啟動。_

這個流程雖然非常簡化，但概述了在以太坊上啟動協定變更的重要階段。現在，讓我們來看看在此過程中發揮作用的非正式因素。

## 非正式過程 {#informal-process}

### 了解先前的工作 {#prior-work}

EIP 倡導者在建立可以被認真考慮部署在以太坊主網上的 EIP 之前，應該熟悉先前的工作和提案。這樣一來，EIP 有望帶來一些以前未被拒絕過的新東西。研究此問題的三個主要地方是 [EIP 儲存庫](https://github.com/ethereum/EIPs)、[Ethereum Magicians](https://ethereum-magicians.org/) 和 [ethresear.ch](https://ethresear.ch/)。

### 工作小組 {#working-groups}

EIP 的初稿不太可能在沒有編輯或變更的情況下在以太坊主網上實施。通常，EIP 倡導者將與一部分協定開發者合作，以指定、實施、測試、反覆運算並最終確定他們的提案。從歷史上看，這些工作小組需要幾個月（有時甚至幾年！）的工作。同樣，此類變更的 EIP 倡導者應在早期讓相關的應用程式/工具開發者參與進來，以收集終端使用者的回饋並減輕任何部署風險。

### 社群共識 {#community-consensus}

雖然有些 EIP 是直接的技術改進，細微差別很小，但有些則更為複雜，並帶有權衡取捨，這將以不同方式影響不同的利益相關者。這意味著某些 EIP 在社群中比其他 EIP 更具爭議性。

關於如何處理具爭議性的提案，並沒有明確的劇本。這是以太坊去中心化設計的結果，在這種設計中，沒有任何一個利益相關者群體可以透過蠻力脅迫另一個群體：協定開發者可以選擇不實施程式碼變更；節點營運者可以選擇不運行最新的以太坊客戶端；應用程式團隊和使用者可以選擇不在鏈上進行交易。由於協定開發者無法強迫人們採用網路升級，因此他們通常會避免實施爭議性大於對更廣泛社群利益的 EIP。

EIP 倡導者應徵求所有相關利益相關者的回饋。如果您發現自己是一個具爭議性 EIP 的倡導者，您應該嘗試解決反對意見，以圍繞您的 EIP 建立共識。鑑於以太坊社群的規模和多樣性，沒有單一的指標（例如代幣投票）可以用來衡量社群共識，EIP 倡導者應適應其提案的具體情況。

除了以太坊網路的安全性之外，從歷史上看，協定開發者非常重視應用程式/工具開發者和應用程式使用者所看重的東西，因為他們在以太坊上的使用和開發正是使生態系統對其他利益相關者具有吸引力的原因。此外，EIP 需要在所有客戶端實作中實施，而這些實作由不同的團隊管理。這個過程的一部分通常意味著說服多個協定開發者團隊，讓他們相信特定的變更是有價值的，並且它有助於終端使用者或解決安全問題。

<Divider />

## 處理分歧 {#disagreements}

擁有許多具有不同動機和信念的利益相關者，意味著分歧並不罕見。

通常，分歧會在公共論壇上透過長篇討論來處理，以了解問題的根源並允許任何人發表意見。通常，一個群體會讓步，或者達成一個折衷方案。如果一個群體的態度足夠強硬，強行通過特定的變更可能會導致鏈分裂。鏈分裂是指一些利益相關者抗議實施協定變更，導致運行不同且不相容的協定版本，從而產生兩條不同的區塊鏈。

### DAO 分叉 {#dao-fork}

分叉是指需要對網路進行重大技術升級或變更，並改變協定的「規則」。[以太坊客戶端](/developers/docs/nodes-and-clients/)必須更新其軟體以實施新的分叉規則。

DAO 分叉是為了回應 [2016 年的 DAO 攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack)，當時一個不安全的 [DAO](/glossary/#dao) 合約在一次駭客攻擊中被抽乾了超過 360 萬個 ETH。該分叉將資金從有缺陷的合約轉移到一個新合約中，允許任何在駭客攻擊中損失資金的人收回資金。

這項行動方針由以太坊社群投票表決。任何 ETH 持有者都可以透過在[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易進行投票。分叉的決定獲得了超過 85% 的選票。

需要注意的是，雖然協定確實進行了分叉以回滾駭客攻擊，但投票在決定分叉中所佔的權重是值得商榷的，原因有幾個：

- 投票率極低
- 大多數人不知道正在進行投票
- 投票僅代表 ETH 持有者，不代表系統中的任何其他參與者

社群中的一部分人拒絕分叉，主要是因為他們認為 DAO 事件不是協定中的缺陷。他們繼續組成了[以太坊經典](https://ethereumclassic.org/)。

如今，以太坊社群在合約錯誤或資金遺失的情況下採取了不干預政策，以維持系統的可靠中立性。

觀看更多關於 DAO 駭客攻擊的資訊：

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### 分叉的效用 {#forking-utility}

以太坊/以太坊經典分叉是健康分叉的一個極佳範例。我們有兩個群體在某些核心價值觀上存在強烈分歧，以至於他們認為值得冒險去追求他們特定的行動方針。

在面臨重大的政治、哲學或經濟分歧時進行分叉的能力，在以太坊治理的成功中發揮了很大作用。如果沒有分叉的能力，替代方案將是持續的內鬥、迫使那些最終組成以太坊經典的人勉強參與，以及對以太坊成功樣貌的願景日益分歧。

<Divider />

## 信標鏈治理 {#beacon-chain}

以太坊治理過程通常會為了開放性和包容性而犧牲速度和效率。為了加速信標鏈的開發，它是與工作量證明 (PoW) 以太坊網路分開啟動的，並遵循其自身的治理實踐。

雖然規範和開發實作一直都是完全開源的，但並沒有使用上述用於提議更新的正式過程。這使得研究人員和實作者能夠更快地指定和同意變更。

當信標鏈於 2022 年 9 月 15 日與以太坊執行層合併時，合併作為 [Paris 網路升級](/ethereum-forks/#paris)的一部分宣告完成。提案 [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) 從「最後呼叫 (Last Call)」變更為「最終 (Final)」，完成了向權益證明 (PoS) 的過渡。

<ButtonLink href="/roadmap/merge/">
  更多關於合併的資訊
</ButtonLink>

<Divider />

## 我該如何參與？ {#get-involved}

- [提出 EIP](/eips/#participate)
- [討論當前的提案](https://ethereum-magicians.org/)
- [參與研發討論](https://ethresear.ch/)
- [加入 Ethereum R&D Discord](https://discord.gg/mncqtgVSVw)
- [運行節點](/developers/docs/nodes-and-clients/run-a-node/)
- [貢獻客戶端開發](/developers/docs/nodes-and-clients/#execution-clients)
- [核心開發者學徒計畫](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## 進一步閱讀 {#further-reading}

以太坊的治理並沒有嚴格的定義。各種社群參與者對此有不同的觀點。以下是其中幾個：

- [關於區塊鏈治理的筆記](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [以太坊治理如何運作？](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [以太坊治理如何運作](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [什麼是以太坊核心開發者？](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [治理，第 2 部分：財閥統治仍然很糟糕](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [超越代幣投票治理](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [了解區塊鏈治理](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [以太坊政府](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_