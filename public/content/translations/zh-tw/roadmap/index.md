---
title: 以太坊開發藍圖
description: 以太坊實現更高可擴容性、安全性和永續性的路徑。
lang: zh-tw
template: roadmap
image: /roadmap/roadmap-main.png
alt: "以太坊開發藍圖"
summaryPoints:
buttons:
  - label: 進一步升級
    toId: 即將發生的變化
  - label: 過往的升級
    to: /history/
    variant: 概述
---

雖然以太坊已經是強大的全球協調平台，但仍在不斷改進當中。 一系列雄心勃勃的改進將把以太坊從本來的型態升級為一個全面擴容、韌性最大的平台。 這些升級已在以太坊開發藍圖中列出。

**若要進一步瞭解過往的以太坊升級，請造訪我們的[歷史](/history/)頁面**

## 以太坊將發生哪些變化？ {#what-changes-are-coming}

以太坊開發藍圖概述了未來將對協定進行的具體改進。 整體而言，開發藍圖會給以太坊使用者帶來以下好處：

<CardGrid>
  <RoadmapActionCard
    to="/roadmap/scaling"
    title="更便宜的交易"
    image="scaling"
    description="Rollups are too expensive and rely on centralized components, causing users to place too much trust in their operators. The roadmap includes fixes for both of these problems."
    buttonText="More on reducing fees"
  />
  <RoadmapActionCard
    to="/roadmap/security"
    title="額外的安全性"
    image="security"
    description="Ethereum is already very secure but it can be made even stronger, ready to withstand all kinds of attack far into the future."
    buttonText="More on security"
  />
  <RoadmapActionCard
    to="/roadmap/user-experience"
    title="更好的使用者體驗"
    image="userExperience"
    description="More support for smart contract wallets and light-weight nodes will make using Ethereum simpler and safer."
    buttonText="More on user experience"
  />
  <RoadmapActionCard
    to="/roadmap/future-proofing"
    title="面向未來"
    image="futureProofing"
    description="Ethereum researchers and developers are solving tomorrow's problems today, readying the network for future generations."
    buttonText="More on future proofing"
  />
</CardGrid>

## 以太坊為何需要開發藍圖？ {#why-does-ethereum-need-a-roadmap}

以太坊會定期升級，以提高其可擴容性、安全性或永續性。 以太坊的核心優勢之一是適應研發中出現的新想法。 以太坊具備出色的適應力，能夠靈活地應對新出現的挑戰並跟上最先進的技術突破。

<RoadmapImageContent title="開發藍圖的定義方式">

以太坊的開發藍圖主要是研發人員多年努力的成果，因為協定的技術性非常強，不過任何有想法與動力的人皆可參與。 理念通常始於論壇上的討論，比如 [ethresear.ch](https://ethresear.ch/)、[以太坊魔術師](https://www.figma.com/exit?url=https%3A%2F%2Fethereum-magicians.org%2F) 或以太坊研發 Discord 伺服器。 它們可能是對新發現的漏洞的回應、在應用層工作的組織提出的意見（比如去中心化應用程式和交易所），或是對最終使用者已知問題的解決辦法（比如成本或交易速度）。 當這些理念成熟之後，可以作為 [以太坊改進提案] 提出 (https://eips.ethereum.org/)。 這一切都是公開進行的，因此社群中的每個人都可以隨時發表意見。

[有關以太坊管理體系的更多資訊]（/管理體系/）

</RoadmapImageContent>

<InfoBanner mb={8}>
  <h4 style={{ marginTop: 0 }}>ETH2 是什麼？</h4>

  <p>在轉向權益證明之前，「Eth2」一詞通常用於描述以太坊的未來，但現在<strong>已被逐步淘汰，取而代之的是更精確的術語</strong>。它最初用來區分轉換到權益證明之前和之後的以太坊網路，有時指不同的以太坊用戶端（執行用戶端有時稱為 ETH1 用戶端，共識用戶端有時稱為 ETH2 用戶端）。</p>

</InfoBanner>

## 以太坊的開發藍圖會隨時間而變更嗎？ {#will-ethereums-roadmap-change-over-time}

是的，幾乎可以肯定會。 開發藍圖是最新的以太坊升級計劃，涵蓋近期和未來的計劃。 我們預計隨著新資訊和技術的出現，開發藍圖也會變更。

將以太坊的開發藍圖視為改進以太坊的一系列意圖；這是核心研究者和開發者對以太坊最優前進路徑的最佳假設。

## 開發藍圖將於何時完成？ {#when-will-the-roadmap-be-finished}

以太坊會在接下來的六個月實作部分升級（比如質押提款）；其他的優先級較低，未來 5-10 年內可能不會實作（比如抗量子性）。 給出每次升級的精確時間很難預測，因為許多開發藍圖上的事項是並行處理的，並以不同速度開發。 升級的緊迫性也會隨著時間的推移而變化，這取決於外部因素（例如，量子電腦的效能和可用性突然提升可能導致抗量子密碼學的實作更加緊急）。

可以將以太坊的發展類比為生物進化。 相較於抗拒改變的網路，能夠適應新挑戰及維持健康的網路更可能成功，不過隨著網路的效能、可擴容性和安全性越來越高，需要對協定進行的變更也會減少。

## 升級時我需要做什麼嗎？ {#do-i-have-to-do-anything-when-there-is-an-upgrade}

升級往往不會影響最終使用者，除了提供更好的使用者體驗和更安全的協定，或許還提供更多與以太坊互動的<i>選項</i>。 最終使用者並不需要主動參與升級，也不需要做任何事來保護資產。 節點營運者需要更新他們的用戶端，為升級做好準備。 有些升級可能帶來適用於應用程式開發者的變更。 舉例來說，完成歷史記錄到期升級之後，應用程式開發者可從新來源取得歷史資料。

## The Verge、The Splurge 等等將如何？ {#what-about-the-verge-splurge-etc}

[Vitalik Buterin 提出了以太坊發展藍圖的願景](https://twitter.com/VitalikButerin/status/1588669782471368704)，發展藍圖上的事項被分為多個類別，根據各自對以太坊架構的影響相互關聯。 其中包括：

- 合併 (The Merge)：從工作量證明過渡到權益證明的相關升級
- 激增 (The Surge)：透過卷軸和資料分片進行與可擴容性相關的升級
- 災厄 (The Scourge)：與最大可提取價值的抗審查性、去中心化和協定風險相關的升級
- 邊際 (The Verge)：使得驗證區塊更容易的升級
- 淨化 (The Purge)：有助降低運行節點的運算成本和簡化協定的升級
- 誇耀 (The Splurge)：不屬於上述類別的其他升級

我們決定不使用這些術語，因為想使用更簡單、更以使用者為中心的模型。 雖然我們使用以使用者為中心的語言，但願景仍然與 Vitalik 提出的願景相同。

## 分片會如何？ {#what-about-sharding}

分片是指將以太坊區塊鏈分割，使部分驗證者只需負責所有資料中的一小部分。 這原本是以太坊的擴容方式。 然而，二層網路卷軸的發展速度比預期快得多，並且已經提供大量擴容，並且 Proto-Danksharding 實作後將提供更多功能。 這意味著已不再需要「分片鏈」，並且已將其從開發藍圖中刪除。

## 在尋找特定的技術更新嗎？ {#looking-for-specific-technical-upgrades}

- [Danksharding](/roadmap/danksharding) - Danksharding 透過新增資料的 blob（註：二進位大型物件）到以太坊區塊中，使二層網路卷軸的成本大大降低。
- [質押提款](/staking/withdrawals) - 上海/卡佩拉在以太坊上升級啟用了質押提款，允許人們解套質押的以太幣。
- [單一時隙最終確定性](/roadmap/single-slot-finality) - 無需等待十五分鐘，就可以在同一時隙內提出並最終確定區塊。 這對於應用程式來說更方便，也更難被攻擊。
- [提交者-建置者分離](/roadmap/pbs) - 讓不同的驗證者承擔區塊建置和區塊提交任務，為以太坊達成共識建立了一種更公平、更抗審查且更有效的方式。
- [秘密領導者選舉](/roadmap/secret-leader-election) - 可以使用巧妙的密碼學來確保目前區塊提交者的身分不被公開，從而保護他們免遭某些類型的攻擊。
- [帳戶抽象](/roadmap/account-abstraction) - 帳戶抽像是一類升級，支援以太坊上原生的智慧型合約錢包，而不必使用複雜的中間件。
- [Verkle 樹](/roadmap/verkle-trees) - Verkle 樹是一種資料結構，可用於在以太坊上啟用無狀態用戶端。 這些「無狀態」用戶端只需少量的儲存空間，但仍然能夠驗證新區塊。
- [無狀態](/roadmap/statelessness) - 無狀態用戶端可以驗證新區塊，不必儲存大量資料。 這將提供運行節點的所有好處，而成本僅為目前的一小部分。
