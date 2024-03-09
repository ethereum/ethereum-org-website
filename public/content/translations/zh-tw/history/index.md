---
title: 以太坊的歷史與分叉
description: 以太坊區塊鏈的歷史，包括了主要的里程碑、版本發布和分叉。
lang: zh-tw
sidebarDepth: 1
---

# 以太坊的歷史 {#the-history-of-ethereum}

所有主要里程碑、分叉和更新以太坊區塊鏈的時間表

<ExpandableCard title=" 什麼是分叉？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

分叉是需要對網路進行重大技術升級或更改時的變化– 它們通常源自<a href="/eips/">以太坊改進建議(EIP)</a> 並更改了以太坊協議的「規則 」。

當傳統的中心化軟體需要升級時，公司會為終端用戶發布新版本。 因為沒有中心化所有權，區塊鏈以不同的方式運作。 <a href="/developers/docs/nodes-and-clients/">以太坊客戶端</a>必須更新他們的軟體以執行新的分叉規則。 直鏈區塊創造者（POW 中的礦工，POS 中的驗證者）和節點必須創造區塊和按照新規則進行驗證。 <a href="/developers/docs/consensus-mechanisms/">更多關於共識機制的資訊</a>

這些規則變更可能會在網路中造成暫時的分叉。 新區塊的產生，可以來自新規則，也可以來自舊規則。 分叉通常提前商定，以便讓客戶端能夠採用 Unison 的升級，升級後的分叉鏈成為主鏈。 然而，在極少數情況下，對分叉的不同意見可能導致網絡永久硬分叉 – 最為著名的是 <a href="#dao-fork">DAO 分叉</a> 產生了 Ethereum Classic。

</ExpandableCard>

直接查閱有關一些特別重要的以往升級的資訊：[信標鏈](/roadmap/beacon-chain/)、[合併](/roadmap/merge/)和 [EIP-1559](#london)

想了解未來的協議升級？ [了解以太坊路線圖上即將進行的升級](/roadmap/)。

<Divider />

## 2023 年 {#2023}

### 上海升級 {#shanghai}

<NetworkUpgradeSummary name="shanghai" />

#### 摘要 {#shanghai-summary}

上海升級將質押提款引入執行層。 上海升級與卡佩拉升級同時進行，使區塊能夠接受提款操作，因此質押人可以將以太幣從信標鏈提取到執行層。

<ExpandableCard title="以太坊改進提案 - 上海升級" contentPreview="Official improvements included in this upgrade.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>啟動<code>COINBASE</code> address warm</em ></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新<code>PUSH0</code> 指令</em> </li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>限制和計量 initcode</em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>信標鏈的提款推送操作</em></ li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>棄用<code>ELFDESTRUCT</code></em> </li>
</ul>

</ExpandableCard>

- [閱讀上海升級規格](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

---

### 卡佩拉升級 {#capella}

<NetworkUpgradeSummary name="capella" />

#### 摘要 {#capella-summary}

卡佩拉升級是共識層（信標鏈）的第三次重大升級，實現了質押提款。 卡佩拉與上海同步升級執行層並啟用了質押提款功能。

這次共識層升級讓未提供初始存款提款憑證的質押人能夠提供提款憑證，從而實現提款。

此升級還提供了自動帳戶掃描功能，可持續處理驗證者帳戶的任何可用獎勵支付或全額提款。

- [有關質押提款的更多資訊](/staking/withdrawals/)。
- [閱讀卡佩拉升級規格](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 年 {#2022}

### 巴黎升級（合併） {#paris}

<NetworkUpgradeSummary name="paris" />

#### 摘要 {#paris-summary}

巴黎升級是由於工作量證明區塊鏈超過了[終端總難度](/glossary/#terminal-total-difficulty) 58750000000000000000000 而觸發的。 這發生在 2022 年 9 月 15 日區塊 15537393 上，並在下一個區塊處觸發了巴黎升級。 巴黎升級就是[合併](/roadmap/merge/)過渡，以太坊的主要功能結束了[工作量證明](/developers/docs/consensus-mechanisms/pow)挖礦演算法及相關共識邏輯並啟動了[ 權益證明](/developers/docs/consensus-mechanisms/pos)。 巴黎升級本身是對[執行客戶端](/developers/docs/nodes-and-clients/#execution-clients)的升級（相當於共識層上的Bellatrix 升級），讓執行客戶端能夠從與其連接的[ 共識客戶端](/developers/docs/nodes-and-clients/#consensus-clients)接受指令。 這需要啟動一組新的內部應用程式介面方法，統稱為[引擎應用程式介面](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。 該升級可能是自[家園](#homestead)以來以太坊歷史上最重要的升級！

- [閱讀巴黎升級規格](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="以太坊改進提案 - 巴黎升級" contentPreview="Official improvements included in this upgrade.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>升級權益證明共識</em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>使用 PREVRANDAO 取代 DIFFICULTY 操作碼</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix 升級 {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 摘要 {#bellatrix-summary}

Bellatrix 升級是計畫的第二次[信標鏈](/roadmap/beacon-chain)升級，讓信標鏈為[合併](/roadmap/merge/)做好準備。 它將驗證者因怠惰及進行了可被罰沒的行為而受到的懲罰提高到其全部價值。 Bellatrix 升級還包括對分叉選擇規則的更新，讓信標鏈為合併以及從最後一個工作量證明區塊過渡到第一個權益證明區塊做好準備。 這包括讓共識客戶端意識到[終端總難度](/glossary/#terminal-total-difficulty) 58750000000000000000000。

- [閱讀 Bellatrix 升級規範](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### 灰色冰川升級 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 摘要 {#gray-glacier-summary}

灰色冰川網路升級將[難度炸彈](/glossary/#difficulty-bomb)延後了三個月。 這是此次升級中引入的唯一變更，本質上類似於[箭形冰川](#arrow-glacier)和[繆爾冰川](#muir-glacier)升級。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[倫敦](#london)網路升級也做了類似的變更。

- [以太坊基金會部落格 - 灰色冰川升級公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="以太坊改進提案 - 灰色冰河升級" contentPreview="Official improvements included in this upgrade.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>將難度炸彈延遲到2022 年9 月啟動</em> </li>
</ul>

</ExpandableCard>

<Divider />

## 2021 年 {#2021}

### 箭形冰川升級 {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 摘要 {#arrow-glacier-summary}

箭形冰川網升級將[難度炸彈](/glossary/#difficulty-bomb)延後了數月。 這是此次升級中引入的唯一變更，本質上類似於[繆爾冰川](#muir-glacier)升級。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[倫敦](#london)網路升級也做了類似的更改。

- [以太坊基金會部落格 - 箭形冰川升級公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [以太坊牧貓人組織 - 以太坊箭形冰川升級](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭形冰河升級以太坊改良提" contentPreview="Official improvements included in this upgrade.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>將難度炸彈延遲到2022 年6 月啟動</em> </li>
</ul>

</ExpandableCard>

---

### 天鷹座升級 {#altair}

<NetworkUpgradeSummary name="altair" />

#### 摘要 {#altair-summary}

天鷹座升級是計畫的第一次[信標鏈](/roadmap/beacon-chain)升級。 它增加了對「同步委員會」的支持—支援輕客戶端，在向合併進展的過程中，增加了對驗證者怠惰及可被罰沒行為的懲罰。

- [閱讀天鷹座升級規格](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} me="0.5rem" />有趣的事實！ {#altair-fun-fact}

天鷹座升級是第一個有確切發佈時間的重大網路升級。 先前的每一次升級均基於一個已經在工作量證明鏈上申報過的區塊編號，而該鏈上的區塊時間各不相同。 信標鏈不需要解析工作量證明，而是在一個基於時間、由 32 個 12 秒「時隙」組成的時段系統上運作。 在這個系統上，驗證者可以提出區塊。 這就是為什麼我們能準確知曉達到時段 74,240 以及天鷹座升級啟動的時間！

- [出塊時間](/developers/docs/blocks/#block-time)

---

### 倫敦升級 {#london}

<NetworkUpgradeSummary name="london" />

#### 摘要 {#london-summary}

倫敦升級引入了[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，對交易費市場進行了改革，同時也對燃料費的退款處理方式和[冰河世紀] (/glossary/#ice-age)日程表進行了修改。

- [你是去中心化應用程式的開發者嗎？ 請務必升級你的程式庫和工具。 ](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [請閱讀以太坊基金會公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [請閱讀以太坊牧貓人組織的解釋說明](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="以太坊改進提案 - 倫敦升級" contentPreview="Official improvements included in this upgrade.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>改善交易費市場</em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>從一個區塊回傳<code>BASEFEE</code>< /em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>減少用於EVM 營運的燃料退款</em>< /li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>防止部署以<code>0xEF</code> 開頭的合約 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>冰河世紀延後到2021 年12 月啟動</em> </li>
</ul>

</ExpandableCard>

---

### 柏林升級 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 摘要 {#berlin-summary}

柏林升級優化了某些以太坊虛擬機器操作的燃料成本，並增加了對多種交易類型的支援。

- [請閱讀以太坊基金會公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [請閱讀以太坊牧貓人組織的解釋說明](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="以太坊改進提案 - 柏林升級" contentPreview="Official improvements included in this upgrade.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>降低了 ModExp 燃料成本</em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>可以更容易支援多種交易類型</em>< /li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>提高狀態存取操作碼的燃料成本</em></ li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>增加了可選存取清單</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 年 {#2020}

### 信標鏈創世塊 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 摘要 {#beacon-chain-genesis-summary}

[信標鏈](/roadmap/beacon-chain/)需要 16384 個儲存了 32 個質押以太幣的帳戶，以確保安全上線。 這發生於 2020 年 11 月 27 日，意味著信標鏈在 2020 年 12 月 1 日開始生產區塊。 這是實現[以太坊願景](/roadmap/vision/)的第一步，十分重要。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/roadmap/beacon-chain/">
   信標鏈
</DocLink>

---

### 已部署質押存款合約 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 摘要 {#deposit-contract-summary}

質押存款合約將[質押](/glossary/#staking)引入以太坊生態系統。 雖然是一個[主網](/glossary/#mainnet)合約，但它直接影響到[信標鏈](/roadmap/beacon-chain/)的發佈時間線，而後者是[以太坊升級](/ roadmap/)的重要部分。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
   質押
</DocLink>

---

### 繆爾冰川升級 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 摘要 {#muir-glacier-summary}

繆爾冰川分叉使[難度炸彈](/glossary/#difficulty-bomb)延遲。 增加[工作量證明](/developers/docs/consensus-mechanisms/pow/)共識機制的區塊難度可能會增加發送交易和使用去中心化應用程式的等待時間，從而降低以太坊的可用性。

- [請閱讀以太坊基金會公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [請閱讀以太坊牧貓人組織的解釋說明](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="以太坊改進提案 - 繆爾冰河升級" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>將難度炸彈再延遲4,000,000 個區塊，大約是611 天 </em>。 </li>
</ul>

</ExpandableCard>

<Divider />

## 2019 年 {#2019}

### 伊斯坦堡分叉 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 摘要 {#istanbul-summary}

伊斯坦堡分叉：

- 優化了[以太坊虛擬機](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定操作的[燃料](/glossary/#gas)成本。
- 提高受到拒絕服務攻擊後的復原能力。
- 使基於「零知識簡潔非互動式知識論證」與「零知識可擴容透明知識論證」的[二層網路擴容](/developers/docs/scaling/#layer-2-scaling)解決方案具有更佳 的性能。
- 使以太坊和 Zcash 能夠互通。
- 讓合約能夠引入更多創意功能。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="以太坊改進提案 - 伊斯坦堡分叉" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>讓以太幣與Zcash 等受隱私保護的數位貨幣一起使用 。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>以更低廉的加密技術改善<a href="/glossary /#gas">燃料</a>成本。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>透過新增<code>CHAINID</code> <a href= "/developers/docs/ethereum-stack/#ethereum-virtual-machine">操作碼</a>，保護以太幣免受重播攻擊。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>優化消耗量為基礎的操作碼燃料價格。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>降低了CallData 的成本，從而允許更多資料儲放入 區塊中– 這對<a href="/developers/docs/scaling/#layer-2-scaling"> 二層擴容</a>很有幫助。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>其他操作碼的燃料價格變更。 </em></li>
</ul>

</ExpandableCard>

---

### 君士坦丁堡分叉 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 摘要 {#constantinople-summary}

君士坦丁堡分叉：

- 確保在[實現權益證明](#beacon-chain-genesis)之前，區塊鏈不會凍結。
- 優化了[以太坊虛擬機](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定操作的[燃料](/glossary/#gas)成本。
- 新增了與尚未建立的地址進行互動的能力。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="以太坊改進提案 - 君士坦丁堡分叉" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>優化某些鏈上操作的成本。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>允許你與尚未建立的位址互動。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>優化某些鏈上操作的成本。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>確保在實現權益證明之前，區塊鏈不會凍結。 </em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 年 {#2017}

### 拜占庭升級 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 摘要 {#byzantium-summary}

拜占庭分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 5 個以太幣減少到 3 個以太幣。
- 將[難度炸彈](/glossary/#difficulty-bomb)延後一年。
- 增加了呼叫其他合約而不更改狀態的能力。
- 增加了某些加密方法，以實現[二層網路擴容](/developers/docs/scaling/#layer-2-scaling)。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="以太坊改進提案 - 拜占庭升級" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>新增 <code>REVERT</code> 操作碼。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>在交易收據中新增狀態字段，以指示成功或失敗。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>增加了橢圓曲線和標量乘法以允許<a href=" /developers/docs/scaling/zk-rollups/">ZK-Snarks</a>。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>增加了橢圓曲線和標量乘法以允許<a href=" /developers/docs/scaling/zk-rollups/">ZK-Snarks</a>。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>啟用 RSA 簽章驗證。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>增加了對可變長度回傳值的支援。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>新增<code>STATICCALL</code> 操作碼，允許對 其他合約進行非狀態改變呼叫。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>更改難度調整公式。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>將<a href="/glossary/#difficulty-bomb" >難度炸彈</a>延遲1 年啟動，並將區塊獎勵從5 個以太幣減少到3 個以太幣。 </em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 年 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 摘要 {#spurious-dragon-summary}

偽龍分叉是對拒絕服務 (DoS) 網路攻擊（2016 年 9 月/10 月）的第二個回應，包括：

- 調整操作碼價格，以防網路未來再受攻擊。
- 啟用區塊鏈狀態的「區塊鏈減重」。
- 增加重播攻擊保護。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="以太坊改進提案 - 偽龍分叉" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>防止在一條以太坊鏈上的交易被重複廣播到另 一條鏈，例如測試網路交易在主以太坊鏈上重播。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>調整<code>EXP</code> 操作碼的價格– 使透過計算成本高昂的合約操作來降低網路速度變得更加困難。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>允許刪除透過 DOS 攻擊產生的空帳戶。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>將區塊鏈上合約可達到的最大程式碼大小改為 24576 位元組。 </em></li>
</ul>

</ExpandableCard>

---

### 橘子口哨分叉 {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 摘要 {#tangerine-whistle-summary}

橘子口哨分叉是對拒絕服務 (DoS) 網路攻擊（2016 年 9 月/10 月）的第一個回應，包括：

- 解決與作價低估的操作代碼相關的緊急網路健康問題。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="以太坊改進提案 - 橘子口哨分叉" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>增加可用於垃圾郵件攻擊的操作碼的燃料成本。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>移除大量空白帳戶來減少狀態大小。 由於早期版本的以太坊協議中存在缺陷，這些帳戶以非常低的成本置於相應狀態。 </em></li>
</ul>

</ExpandableCard>

---

### 去中心化自治組織分叉 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 摘要 {#dao-fork-summary}

去中心化自治組織分叉是為了回應[2016 DAO 攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack/)，當時一個不安全的[去中心化自治組織] (/glossary/#dao)合約被駭客偷走超過360 萬個以太幣了。 此分叉將資金從有問題的合約轉移到一個[新合約](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)，新合約只有一個功能：提款。 任何損失了資金的人都可以在他們的錢包中提取以太幣，每 100 個 DAO 代幣 1 個以太幣。

此操作是由以太坊社群投票決定的。 所有以太幣持有者都能透過[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易進行投票。 分叉的決定獲得了 85% 以上的投票。

一些礦工拒絕分叉，因為那次 DAO 事件並不是協議中的缺陷。 他們之後組建了[以太坊經典](https://ethereumclassic.org/)。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### 家園分叉 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 摘要 {#homestead-summary}

家園分叉展望未來， 包括若干協定修改和聯網變更，使以太坊能夠進一步進行網路升級。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="以太坊改進提案 - 家園分叉" contentPreview="Official improvements included in this fork.">

<ul>
   <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>對合約創建過程進行編輯。 </em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新增操作碼：<code>DELEGATECALL</code>< /em></li>
   <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>引入devp2p 向前相容性要求</em></li >
</ul>

</ExpandableCard>

<Divider />

## 2015 年 {#2015}

### 邊境解凍分叉 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 摘要 {#frontier-thawing-summary}

邊境解凍分叉提高了每個[區塊](/glossary/#block) 5,000 單位[燃料](/glossary/#gas)的限制，並將預設燃料價格設為51 [gwei](/glossary/# gwei)。 這樣便能進行交易 - 交易需要 21,000 單位燃料。 而引入[難度炸彈](/glossary/#difficulty-bomb)是為了確保未來硬分叉到[權益證明](/glossary/#pos)。

- [請閱讀以太坊基金會公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [閱讀以太坊協議更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### 邊境 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 摘要 {#frontier-summary}

邊境是以太坊最初的版本，但在上面能做的事情很少。 該版本在奧利匹克測試階段成功完成之後推出。 它面向的是技術用戶，特別是開發者。 [區塊](/glossary/#block)有 5,000 單位的[燃料](/glossary/#gas)限制。 此「解凍」期使礦工能夠開始操作，並使早期採用者能夠有足夠的時間來安裝客戶端。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 年 {#2014}

### 以太幣銷售 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

以太幣的預售期為 42 天， 可以使用比特幣購買。

[請閱讀以太坊基金會公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 黃皮書已發佈 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Gavin Wood 博士撰寫的黃皮書，關於以太坊協議的技術定義。

[看黃皮書](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 年 {#2013}

### 白皮書已發佈 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

以太坊計畫在 2015 年啟動。 但早在 2013 年，以太坊創辦人 Vitalik Buterin 就發表了這篇介紹文章。

<DocLink to="/whitepaper/">
   白皮書
</DocLink>
