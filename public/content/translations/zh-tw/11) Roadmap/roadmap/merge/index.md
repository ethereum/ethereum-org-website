---
title: 合併
description: 瞭解「合併 - 當以太坊主網採用權益證明時」的相關資訊。
lang: zh-tw
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: 以太坊主網使用權益證明，但以前並非總是如此。
summaryPoint2: 從原本的工作量證明機制到權益證明的升級稱為「合併」。
summaryPoint3: 合併指原本的以太坊主網與稱為信標鏈的獨立權益證明區塊鏈合併，現在作為一條鏈存在。
summaryPoint4: 合併將以太坊的能源消耗降低了約 99.95%。
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  「合併」已於 2022 年 9 月 15 日執行。 這使得以太坊完全過渡到權益證明共識，正式棄用工作量證明並將能耗降低大約 99.95%。
</UpgradeStatus>

## 什麼是「合併」？ {#what-is-the-merge}

合併指將以太坊的原始執行層（自[創世](/history/#frontier)以來就存在的主網）與其新的權益證明共識層「信標鏈」結合在一起。 它減少了對能源密集型挖礦的需求，而是藉由質押的以太幣來確保網路安全。 這是實現以太坊「更高的可擴容性、安全性和永續性」願景的真正令人興奮的一步。

<MergeInfographic />

一開始，[信標鏈](/roadmap/beacon-chain/)與[主網](/glossary/#mainnet)是分別上線的。 以太坊主網及其所有帳戶、餘額、智慧型合約以及區塊練狀態繼續受到[工作量證明](/developers/docs/consensus-mechanisms/pow/)的保護，即使信標鏈使用[權益證明](/developers/docs/consensus-mechanisms/pos/)並行運作。 合併完成即表示這兩個系統最終結合在一起，權益證明永久取代工作量證明。

將以太坊想像成一艘宇宙飛船，還未完全準備好星際旅行就已經升空。 以太坊社群藉由信標鏈打造全新的引擎與堅固的外殼。 經過大量的測試後，是時候在飛行旅途中以熱插拔的方式將舊引擎更換為新引擎了。 全新且更高效的引擎合併到現有的飛船中，使之能夠進行長達數光年的太空之旅。

## 與主網合併 {#merging-with-mainnet}

從創世到合併之前，工作量證明一直保護著以太坊主網的安全。 這使得我們都習慣的以太坊區塊鏈於 2015 年 7 月誕生，並具備所有熟悉的功能——交易、智慧型合約、帳戶等。

在以太坊整個發展歷程中，開發者們一直在為最終從工作量證明過渡到權益證明努力準備著。 2020 年 12 月 1 日，信標鏈作為獨立於主網的區塊鏈建立，與主網並行運行。

信標鏈原本並沒有處理主網的交易， 而是透過商定活躍的驗證者及其帳戶的餘額就其自己的狀態達成共識。 廣泛的測試完成後，就是讓信標鏈就真實資料達成共識的時候了。 合併之後，信標鏈會成為所有網路資料的共識引擎，包含執行層的交易以及帳戶餘額。

合併代表正式轉用信標鏈作為區塊生產引擎。 挖礦不再是生產有效區塊的方式。 相反，權益證明驗證者已擔任這個角色，現在負責處理所有交易的有效性及提出區塊。

合併中，歷史記錄不會丟失。 隨著主網與信標鏈合併，以太坊的所有交易記錄也已一併整合。

<InfoBanner>
這種向權益證明的過渡改變了以太幣的發行方式。 瞭解<a href="/roadmap/merge/issuance/">合併前後的以太幣發行</a>的更多相關資訊。
</InfoBanner>

### 使用者及持有者 {#users-holders}

**合併並不會對持有者或使用者造成任何影響。**

_再次提醒：_作為以太幣或其他以太坊數位資產的使用者或持有者，以及非節點運行質押者，**在合併前，你並不需要針對自己的資金或錢包採取任何行動**。以太幣還是原本的以太幣。 並沒有所謂的「舊以太幣」/「新以太幣」或「以太坊 1」/「以太坊 2」，而且合併前後錢包的使用方式也完全一樣。若有人告訴你其他的說法，那他很可能是個騙子。

儘管不再使用工作量證明，以太坊自從創世以來的完整歷史記錄將完整保留，不會因為過渡到權益證明而有所改變。 合併前即存在於錢包的所有資金，合併之後一樣可用。 **無須採取任何行動即可升級。**

[更多以太坊安全性相關更多資訊](/security/#eth2-token-scam)

### 節點營運商與去中心化應用程式開發者 {#node-operators-dapp-developers}

<ExpandableCard
title="質押節點營運者和提供者"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

主要行動事項包括：

1. 同時運行共識用戶端及執行用戶端；合併之後，無法再使用取得執行資料的第三方端點。
2. 使用共用的 JWT 金鑰來驗證執行與共識用戶端，以便他們能夠安全地通訊。
3 設定「費用接收」地址以接收賺取的交易費小費/最大可提取價值 (MEV)。

在完成上述兩點以前，你的節點會顯示為「離線」，直到兩個層皆同步且通過驗證為止。

若未設定「費用接收」地址，驗證者仍舊可以如常行事，但你將無法賺取未銷毀費用小費，以及原本可以在驗證者提出的區塊中賺取的最大可提取價值。
</ExpandableCard>

<ExpandableCard
title="非驗證節點營運商和基礎設施提供商"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

合併以前，執行用戶端（例如 Geth、Erigon、Besu 或 Nevermind）可以接收、正確驗證以及廣播藉由網路傳播的區塊。 _合併之後_，執行有效負載中包含的交易之有效性現在也取決於其所在的「共識區塊」的有效性。

因此，以太坊全節點現在同時需要執行用戶端與共識用戶端。 這兩個用戶端使用新的引擎應用程式介面協同運作。 引擎應用程式介面需要使用 JWT 金鑰進行驗證，該金鑰會提供給兩個用戶端來支援安全通訊。

主要行動事項包括：

- 除共識用戶端之外，還要安裝執行用戶端
- 利用共用的 JWT 金鑰來驗證執行用戶端和共識用戶端，這樣它們就可以安全地同彼此通訊。

若未完成上述事項，你的節點將會顯示為「離線」狀態，直到兩個層皆同步且通過驗證為止。

</ExpandableCard>

<ExpandableCard
title="去中心化應用程式和智慧型合約開發者"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

合併過程中共識機制亦發生變更，包括以下方面的相關變更：<

<ul>
  <li>區塊結構</li>
  <li>時隙/區塊時間</li>
  <li>操作碼變更</li>
  <li>鏈上隨機性來源</li>
  <li><em>安全標頭</em>和<em>定案區塊</em>的概念</li>
</ul>

更多資訊請閱讀 Tim Beiko 的部落格文章：<a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">合併如何影響以太坊的應用程式層</a>。

</ExpandableCard>

## 合併與能耗 {#merge-and-energy}

合併標誌著以太坊工作量證明的結束，並開啟了更具可持續性和環保的以太坊紀元。 以太坊的能耗預計下降了 99.95%，使得以太坊成為綠色區塊鏈。 瞭解關於[以太坊能耗](/energy-consumption/)的更多資訊。

## 合併與擴容 {#merge-and-scaling}

合併也為工作量證明之下無法實現的進一步擴容升級奠定了基礎，使得以太坊更接近實現[以太坊願景](/roadmap/vision/)中所描繪的全面擴容、安全性與永續性。

## 關於合併的誤解 {#misconceptions}

<ExpandableCard
title="誤解：「執行節點需要質押 32 以太幣。」"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

以太坊的節點有兩種類型：可以提出區塊；無法提出區塊。

提出區塊的節點僅佔以太坊節點總數的一小部分。 這一類別中包含工作量證明 (PoW) 下的挖礦節點及權益證明 (PoS) 下的驗證者節點。 這一類別必須要付出經濟資源（例如工作量證明下 GPU 的雜湊算力，或是權益證明下的質押以太幣）來換取不時提出下一個區塊並贏取協定獎勵的能力。

除了具有 1-2 TB 可用儲存空間和網際網路連線的消費級電腦之外，網路上的其他節點（即其他大多數）不需要付出任何經濟資源。 這些節點並不會提出區塊，但仍然會在保護網路安全中扮演很重要的角色，它們透過偵聽新區塊並根據網路共識規則在其到達時驗證其有效性，讓所有區塊提議者負責。 如果區塊有效，節點會繼續將其廣播到網路上。 如果區塊無效，無論什麼樣的原因，節點軟體會將其視為無效並停止其傳播。

在任一共識機制（工作量證明或權益證明）下，任何人都可以執行非區塊生產節點；如果可以，<em>強烈推薦</em>所有使用者都這麼做。 運行節點不只對以太坊非常有價值，還可以為運行節點的個人帶來額外的好處，例如提高安全性、隱私性和抗審查能力。

任何人都能夠執行自己的節點對於維持以太坊網路的去中心化<em>絕對至關重要</em>。

<a href="/run-a-node/">執行自己節點的更多相關資訊</a>

</ExpandableCard>

<ExpandableCard
title="誤解：「合併無法降低燃料費用。」"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

燃料費用是網路需求相對於網路容量的產物。 合併後，我們棄用了工作量證明，轉而採用權益證明共識機制，但並沒有顯著改變任何直接影響網路容量或吞吐量的參數。

根據<a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">以卷軸為中心的開發藍圖</a>，我們主要專注於擴展<a href="/layer-2/">二層網路</a>上的使用者活動，同時讓一層網路主網成為針對卷軸資料儲存進行最佳化的安全去中心化結算層，以協助使卷軸交易成本呈指數級下降。 轉用權益證明是實現這點的關鍵前導步驟。 <a href="/developers/docs/gas/">更多燃料和費用相關資訊。</a>

</ExpandableCard>

<ExpandableCard
title="誤解：「交易速度在合併後大幅加快。」"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
交易的「速度」可以透過多種方式衡量，包括添加到區塊中的時間和最終確定的時間。 兩者的改變都非常細微，使用者不太會注意到。

過往採用工作量證明時，目標是約每 13.3 秒產生一個新區塊。 採用權益證明時，時隙恰好每 12 秒發生一次，每個時隙都是驗證者發佈區塊的機會。 多數時隙都有區塊，但不一定全部都是這樣（如驗證者離線）。 採用權益證明時，區塊的產生頻率比工作量證明高出約 10%。 這是非常細微的改變，使用者不太可能注意到。

權益證明引入了先前不存在的交易最終確定性的概念。 在工作量證明中，交易後經過的每個區塊會讓區塊逆轉的難度指數型加大，但機率並不完全為零。 在權益證明下，區塊會捆綁進驗證者投票的時期（每 6.4 分鐘含有 32 個提出區塊的機會）。 當一個時期結束時，驗證者投票決定該時期是否「已證明」。 如果驗證者們同意該時期已證明，它會在下個時期最終確定。 取消最終確定的交易在經濟上不可行，因為需要取得和銷毀超過三分之一的質押以太幣總量。

</ExpandableCard>

<ExpandableCard
title="誤解：「合併啟用了質押提款功能。」"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

合併初期，質押者僅能賺取提出區塊的費用小費和最大可提取價值。 這些獎勵被計入驗證者控制的非質押帳戶（稱為<em>費用接收</em>地址），且立即可用。 這些獎勵與執行驗證者職責的協定獎勵是分開的。

自從上海/卡佩拉網路升級後，質押者現在可以指定<em>提款地址</em>，以開始接收自動支付的額外質押餘額（原本質押的 32 以太幣以外的協定獎勵）。 此升級也使驗證者可以在退出網路時解鎖和收回其全部餘額。

<a href="/staking/withdrawals/">更多質押提款相關資訊</a>

</ExpandableCard>

<ExpandableCard
title="誤解：「目前合併完成了，且質押提款已啟用，質押者可以一次全部退出。」"
contentPreview="False. Validator exits are rate limited for security reasons.">
由於上海/卡佩拉升級啟用了提款功能，我們鼓勵驗證者提取其質押的 32 個以太幣以外的餘額，因為這些資金不會增加收益率，不提取會被鎖定。 根據年化報酬率（取決於質押的以太幣總量），他們可能激勵驗證者退出，以回收其全部餘額，或者用其質押獲得的獎勵繼續質押，賺取更多以太幣。

這裡有個重要的限制：協定限制了驗證者完全退出的速率，每個時期（每 6.4 分鐘）只有一定數量的驗證者可以退出。 此限制會根據活躍驗證者數量波動，但單日可退出網路的驗證者總數約為全部驗證者的 0.33%。

這可以防止質押資金大規模外流。 此外，這也可以阻止可存取很大一部分質押以太幣總量的潛在攻擊者實施可被罰沒的違規行為，並在協定執行罰沒懲處之前，在同一時期退出/提取所有違規的驗證者餘額。

年化報酬率也是特意設計成動態的，使得市場上的質押者可以權衡他們願意付出多少成本來協助維護網路安全。 如果速率太低，驗證者將以協定限制的速率退出。 這將逐漸提高留下的所有人的年利率，吸引新的質押者或讓老質押者迴歸。
</ExpandableCard>

## 「以太坊 2.0」怎麼了? {#eth2}

「以太坊 2」這個術語已被棄用。 將「以太坊 1」和「以太坊 2」合併為單一的區塊鏈後，已不需要區分這兩個以太坊網路；現在只有以太坊。

為了減少混亂，社區更新了這些條款：

- 「以太坊 1.0」現在是處理交易和執行的「執行層」。
- 「以太坊 2.0」現在是處理權益證明共識的「共識層」。

這些術語更新只是改變了命名慣例；這並沒有改變以太坊的目標或開發藍圖。

[瞭解更多關於「以太坊 2.0」重命名的資訊](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## 不同升級之間的關聯 {#relationship-between-upgrades}

所有以太坊升級都有某種程度上的關聯。 我們來重新回顧合併與其他升級之間的關係。

### 合併與信標鏈 {#merge-and-beacon-chain}

合併代表著信標鏈作為原始主網執行層的新共識層被正式採用。 合併後，驗證者需負責維護以太坊安全，且[工作量證明](/developers/docs/consensus-mechanisms/pow/)挖礦已不再是有效的區塊生產方式。

相反，區塊是由質押了以太幣的驗證節點提出，以換取參與共識的權利。 這為包括分片在內的未來擴容升級奠定了基礎。

<ButtonLink href="/roadmap/beacon-chain/">
  信標鏈
</ButtonLink>

### 合並與上海升級 {#merge-and-shanghai}

為了簡化流程並最大限度地專注於成功過渡到權益證明，合併升級不包括某些預期的功能，例如提取質押以太幣的能力。 此功能是在上海/卡佩拉升級時單獨啟用的。

歡迎感興趣人士詳細瞭解 Vitalik 在 2021 年 4 月的 ETHGlobal 活動上介紹的[合併後會發生什麼](https://youtu.be/7ggwLccuN5s?t=101)的更多資訊。

### 合併與分片 {#merge-and-data-sharding}

原本的計劃是，在合併前進行分片以處理擴容問題。 然而，鑑於[二層網路擴容解決方案](/layer-2/)的蓬勃發展，優先事務就是摒棄工作量證明，轉用權益證明。

分片計劃正在迅速發展，但考慮到用於擴展交易執行的二層網路技術的興起和成功，分片計劃已轉向尋找最佳方式來分配儲存來自卷軸合約的壓縮 calldata 的負擔，從而實現網路容量的指數級增長。 如果不過渡到權益證明，這是不可能的。

<ButtonLink href="/roadmap/danksharding/">
  分片
</ButtonLink>

## 延伸閱讀 {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
