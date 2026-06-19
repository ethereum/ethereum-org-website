---
title: 合併
description: 了解合併——以太坊主網採用權益證明之時。
lang: zh-tw
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - 以太坊主網使用權益證明，但情況並非一直如此。
  - 從最初的工作量證明機制升級到權益證明的過程被稱為合併。
  - 合併是指最初的以太坊主網與一個名為信標鏈的獨立權益證明區塊鏈合併，現在作為一條鏈存在。
  - 合併使以太坊的能源消耗減少了約 99.95%。
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  合併於 2022 年 9 月 15 日執行。這完成了以太坊向權益證明共識的過渡，正式棄用工作量證明，並將能源消耗減少了約 99.95%。
</UpgradeStatus>

## 什麼是合併？ {#what-is-the-merge}

合併是以太坊最初的執行層（自[創世](/ethereum-forks/#frontier)以來一直存在的主網）與其新的權益證明共識層（信標鏈）的結合。它消除了對能源密集型挖礦的需求，轉而使用質押的 ETH 來保護網路安全。這是實現[以太坊](/)願景（更高的可擴展性、安全性和永續性）真正令人興奮的一步。

<MergeInfographic />

最初，[信標鏈](/roadmap/beacon-chain/)與[主網](/glossary/#mainnet)是分開發布的。以太坊主網——連同其所有的帳戶、餘額、智能合約和區塊鏈狀態——繼續由[工作量證明](/developers/docs/consensus-mechanisms/pow/)保護，即使信標鏈使用[權益證明](/developers/docs/consensus-mechanisms/pos/)平行運行。合併是這兩個系統最終結合在一起的時候，工作量證明被權益證明永久取代。

想像以太坊是一艘在尚未完全準備好進行星際航行之前就發射的太空船。透過信標鏈，社群建造了一個新引擎和堅固的船體。經過大量測試後，是時候在飛行中將舊引擎熱插拔為新引擎了。這將新的、更高效的引擎合併到現有的太空船中，使其能夠航行數光年並探索宇宙。

## 與主網合併 {#merging-with-mainnet}

從創世到合併，工作量證明一直保護著以太坊主網。這使得我們都習慣的以太坊區塊鏈在 2015 年 7 月誕生，並具有所有熟悉的功能——交易、智能合約、帳戶等。

在以太坊的整個歷史中，開發人員一直在為最終從工作量證明過渡到權益證明做準備。2020 年 12 月 1 日，信標鏈作為獨立於主網的區塊鏈被創建，並平行運行。

信標鏈最初並不處理主網交易。相反，它是透過就活躍驗證者及其帳戶餘額達成一致，來對其自身狀態達成共識。經過廣泛的測試，是時候讓信標鏈對現實世界的資料達成共識了。合併後，信標鏈成為所有網路資料（包括執行層交易和帳戶餘額）的共識引擎。

合併代表正式切換到使用信標鏈作為區塊生產的引擎。挖礦不再是生產有效區塊的手段。相反，權益證明驗證者承擔了這個角色，現在負責處理所有交易的有效性並提出區塊。

在合併中沒有遺失任何歷史記錄。當主網與信標鏈合併時，它也合併了以太坊的整個交易歷史。

<Alert variant="update">
<AlertContent>
<AlertDescription>
這種向權益證明的過渡改變了以太幣的發行方式。了解更多關於[合併前後的以太幣發行](/roadmap/merge/issuance/)的資訊。
</AlertDescription>
</AlertContent>
</Alert>

### 使用者和持有者 {#users-holders}

**合併沒有改變持有者/使用者的任何事情。**

_這值得重複_：作為 ETH 或以太坊上任何其他數位資產的使用者或持有者，以及非節點營運的質押者，**您不需要對您的資金或錢包進行任何操作來應對合併。** ETH 就是 ETH。沒有所謂的「舊 ETH」/「新 ETH」或「Eth1」/「Eth2」，錢包在合併後的工作方式與以前完全相同——告訴您其他情況的人很可能是騙子。

儘管替換了工作量證明，但自創世以來的整個以太坊歷史保持完好無損，並未因過渡到權益證明而改變。合併前您錢包中持有的任何資金在合併後仍然可以存取。**您無需採取任何行動進行升級。**

[更多關於以太坊安全性的資訊](/security/#eth2-token-scam)

### 節點營運者和 dapp 開發人員 {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

關鍵行動項目包括：

1. _同時_執行共識客戶端和執行客戶端；自合併以來，獲取執行資料的第三方端點已不再有效。
2. 使用共享的 JWT 密鑰對執行客戶端和共識客戶端進行身分驗證，以便它們可以安全地通訊。
3. 設定一個 `fee recipient` 地址以接收您賺取的交易手續費小費/MEV。

未完成上述前兩項將導致您的節點被視為「離線」，直到兩層都同步並通過身分驗證。

未設定 `fee recipient` 仍將允許您的驗證者照常運作，但您將錯過未銷毀的手續費小費以及您的驗證者在提出區塊時本應賺取的任何 MEV。
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

在合併之前，一個執行客戶端（例如 Go 以太坊 (Geth)、艾瑞貢、貝蘇或奈瑟邁）就足以接收、正確驗證和傳播網路中正在廣播的區塊。_合併後_，執行負載中包含的交易的有效性現在也取決於其所在的「共識區塊」的有效性。

因此，一個完整的以太坊節點現在需要同時具備執行客戶端和共識客戶端。這兩個客戶端使用新的 Engine API 協同工作。Engine API 需要使用 JWT 密鑰進行身分驗證，該密鑰提供給兩個客戶端以允許安全通訊。

關鍵行動項目包括：

- 除了執行客戶端之外，還要安裝共識客戶端
- 使用共享的 JWT 密鑰對執行客戶端和共識客戶端進行身分驗證，以便它們可以安全地相互通訊。

未完成上述項目將導致您的節點顯示為「離線」，直到兩層都同步並通過身分驗證。

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

合併帶來了共識的變化，其中也包括與以下相關的變化：

<ul>
  <li>區塊結構</li>
  <li>時槽/區塊時間</li>
  <li>操作碼變更</li>
  <li>鏈上隨機性來源</li>
  <li><em>安全區塊頭 (safe head)</em> 和<em>已定案區塊</em>的概念</li>
</ul>

如需更多資訊，請查看 Tim Beiko 的這篇部落格文章：<a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">合併如何影響以太坊的應用層</a>。

</ExpandableCard>

## 合併與能源消耗 {#merge-and-energy}

合併標誌著以太坊工作量證明的結束，並開啟了一個更具永續性、更環保的以太坊時代。以太坊的能源消耗估計下降了 99.95%，使以太坊成為一個綠色區塊鏈。了解更多關於[以太坊能源消耗](/energy-consumption/)的資訊。

## 合併與擴展 {#merge-and-scaling}

合併也為在工作量證明下不可能實現的進一步可擴展性升級奠定了基礎，使以太坊離實現[其路線圖](/roadmap/)所致力於的全面擴展、安全性和永續性又近了一步。

## 關於合併的誤解 {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

以太坊節點有兩種類型：可以提出區塊的節點和不能提出區塊的節點。

提出區塊的節點只佔以太坊總節點的一小部分。此類別包括工作量證明 (PoW) 下的挖礦節點和權益證明 (PoS) 下的驗證者節點。此類別需要投入經濟資源（例如工作量證明中的 GPU 雜湊算力或權益證明中質押的 ETH），以換取偶爾提出下一個區塊並賺取協定獎勵的能力。

網路上的其他節點（即大多數節點）除了具有 1-2 TB 可用儲存空間和網際網路連線的消費級電腦之外，不需要投入任何經濟資源。這些節點不提出區塊，但它們在保護網路安全方面仍然發揮著關鍵作用，透過監聽新區塊並在到達時根據網路共識規則驗證其有效性，讓所有區塊提議者承擔責任。如果區塊有效，節點將繼續在網路中傳播它。如果區塊因任何原因無效，節點軟體將忽略它並停止其傳播。

在任何一種共識機制（工作量證明或權益證明）下，任何人都可以執行非區塊生產節點；如果使用者有能力，我們<em>強烈鼓勵</em>所有使用者這樣做。執行節點對以太坊來說非常有價值，並為任何執行節點的個人帶來額外的好處，例如提高安全性、隱私和抗審查性。

任何人都能夠執行自己的節點對於維持以太坊網路的去中心化是<em>絕對必要的</em>。

[更多關於執行您自己的節點的資訊](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

燃料費用是網路需求相對於網路容量的產物。合併棄用了工作量證明，過渡到權益證明以達成共識，但並未顯著改變任何直接影響網路容量或吞吐量的參數。

透過<a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">以匯總為中心的路線圖</a>，目前的努力集中在擴展[第二層 (L2)](/layer-2/) 的使用者活動，同時將第一層 (L1) 主網啟用為安全的去中心化結算層，並針對匯總資料儲存進行最佳化，以幫助使匯總交易變得呈指數級便宜。向權益證明的過渡是實現這一目標的關鍵先決條件。[更多關於燃料和手續費的資訊。](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
交易的「速度」可以透過幾種方式來衡量，包括被包含在區塊中的時間和最終性時間。這兩者都有輕微的變化，但使用者不會注意到。

從歷史上看，在工作量證明中，目標是每約 13.3 秒產生一個新區塊。在權益證明下，時槽精確地每 12 秒發生一次，每個時槽都是驗證者發布區塊的機會。大多數時槽都有區塊，但不一定全部都有（例如，驗證者離線）。在權益證明中，區塊的產生頻率比工作量證明高約 10%。這是一個相當微不足道的變化，使用者不太可能注意到。

權益證明引入了以前不存在的交易最終性概念。在工作量證明中，隨著在交易之上開採的每一個區塊的增加，撤銷區塊的能力變得呈指數級困難，但它永遠不會完全達到零。在權益證明下，區塊被捆綁成紀元（6.4 分鐘的時間跨度，包含 32 次產生區塊的機會），驗證者對此進行投票。當一個紀元結束時，驗證者投票決定是否認為該紀元「已證明」。如果驗證者同意證明該紀元，它將在下一個紀元中已定案。撤銷已定案的交易在經濟上是不可行的，因為這需要獲得並銷毀超過總質押 ETH 的三分之一。

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

在合併後的最初階段，質押者只能存取因提出區塊而賺取的手續費小費和 MEV。這些獎勵會記入由驗證者控制的非質押帳戶（稱為<em>手續費接收者</em>），並且可以立即使用。這些獎勵與執行驗證者職責的協定獎勵是分開的。

自上海/Capella 網路升級以來，質押者現在可以指定一個<em>提款地址</em>，以開始接收任何多餘質押餘額（來自協定獎勵的超過 32 個 ETH）的自動支付。此升級還使驗證者能夠在從網路退出時解鎖並收回其全部餘額。

[更多關於質押提款的資訊](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
由於上海/Capella 升級啟用了提款，驗證者有動機提取其超過 32 ETH 的質押餘額，因為這些資金不會增加收益，否則將被鎖定。根據 APR（由總質押的 ETH 決定），他們可能有動機退出其驗證者以收回其全部餘額，或者可能使用其獎勵質押更多以賺取更多收益。

這裡有一個重要的注意事項，完整的驗證者退出受到協定的速率限制，每個紀元（每 6.4 分鐘）只能有這麼多驗證者退出。此限制根據活躍驗證者的數量而波動，但大約每天可以從網路中退出總質押 ETH 的 0.33%。

這可以防止質押資金的大量流失。此外，它可以防止能夠存取大部分總質押 ETH 的潛在攻擊者犯下可罰沒的罪行，並在協定執行罰沒懲罰之前，在同一個紀元內退出/提取所有違規驗證者的餘額。

APR 也是有意設計為動態的，允許質押者市場平衡他們願意獲得多少報酬來幫助保護網路安全。如果比率太低，那麼驗證者將以協定限制的速率退出。這將逐漸提高所有留下的人的 APR，再次吸引新的或回歸的質押者。
</ExpandableCard>

## 「Eth2」發生了什麼事？ {#eth2}

「Eth2」一詞已被棄用。在將「Eth1」和「Eth2」合併為一條鏈後，不再需要區分兩個以太坊網路；只有以太坊。

為了減少混淆，社群更新了這些術語：

- 「Eth1」現在是「執行層」，負責處理交易和執行。
- 「Eth2」現在是「共識層」，負責處理權益證明共識。

這些術語更新僅改變了命名約定；這不會改變以太坊的目標或路線圖。

[了解更多關於「Eth2」重新命名的資訊](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## 升級之間的關係 {#relationship-between-upgrades}

以太坊的升級都在某種程度上相互關聯。因此，讓我們回顧一下合併與其他升級的關係。

### 合併與信標鏈 {#merge-and-beacon-chain}

合併代表正式採用信標鏈作為最初主網執行層的新共識層。自合併以來，驗證者被指派來保護以太坊主網，而在[工作量證明](/developers/docs/consensus-mechanisms/pow/)上挖礦不再是有效的區塊生產手段。

相反，區塊由已質押 ETH 的驗證節點提出，以換取參與共識的權利。這些升級為未來的可擴展性升級（包括分片）奠定了基礎。

<ButtonLink href="/roadmap/beacon-chain/">
  信標鏈
</ButtonLink>

### 合併與上海升級 {#merge-and-shanghai}

為了簡化並最大限度地專注於成功過渡到權益證明，合併升級並未包含某些預期的功能，例如提取質押 ETH 的能力。此功能在上海/Capella 升級中單獨啟用。

對於好奇的人，請了解更多關於 Vitalik 在 2021 年 4 月 ETHGlobal 活動中發表的[合併後會發生什麼](https://youtu.be/7ggwLccuN5s?t=101)的資訊。

### 合併與分片 {#merge-and-data-sharding}

最初，計畫是在合併之前進行分片以解決可擴展性問題。然而，隨著[第二層 (L2) 擴展解決方案](/layer-2/)的蓬勃發展，優先事項轉向首先將工作量證明替換為權益證明。

分片的計畫正在迅速發展，但鑑於第二層 (L2) 技術在擴展交易執行方面的興起和成功，分片計畫已轉向尋找最理想的方法來分配儲存來自匯總合約的壓縮呼叫資料的負擔，從而允許網路容量呈指數級增長。如果不首先過渡到權益證明，這將是不可能的。

<ButtonLink href="/roadmap/danksharding/">
  分片
</ButtonLink>

## 進一步閱讀 {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />