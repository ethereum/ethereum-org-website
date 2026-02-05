---
title: "所有以太坊分叉的時間軸 (2014 年至今)"
description: "以太坊區塊鏈的歷史，包含主要里程碑、更新及分叉。"
lang: zh-tw
sidebarDepth: 1
---

# 所有以太坊分叉的時間軸 (2014 年至今) {#the-history-of-ethereum}

關於以太坊區塊鏈的所有重要里程碑、分叉與升級的時間軸。

<ExpandableCard title="什麼是分叉？" contentPreview="對以太坊協定規則的變更，通常包含計畫性技術升級。">

分叉為網路需要做技術性升級或變化之程序 -- 此通常源於[以太坊改進提案(EIPs)](/eips/) 並嘗試更改協議之"規則".

需要升級集中控制的傳統軟體時，公司只會為終端使用者發佈一個新版本。 而區塊鏈的運作則有所不同，因其並無所謂的集中所有權。 [以太坊用戶](/developers/docs/nodes-and-clients/) 其所有必須全部升級其軟體來更新至新分叉規則. 加上區塊生成者（在工作量證明世界中為礦工，在權益證明世界中為驗證者）和節點必須依據新規則生成區塊並作驗證。 [更多關於共識機制](/developers/docs/consensus-mechanisms/)

這些規則變更可能會在網路上造成暫時的分叉。 新區塊可以依據新規則或舊規則產生。 分叉通常會提前商定，以便用戶端能夠一致採用變更，並使升級後的分叉成為主鏈。 然而，在極少數情況下，對分叉的不同意見可能導致網路永久硬分叉 – 最爲著名的是<a href="#dao-fork">去中心化自治組織分叉</a>產生了以太坊經典。
</ExpandableCard>

<ExpandableCard title="為什麼有些升級有多個名稱？" contentPreview="升級的命名有其規律">

以太坊底層的軟體由兩部分組成，稱為 [執行層](/glossary/#execution-layer) 和 [共識層](/glossary/#consensus-layer)。

**執行升級命名**

自 2021 年起，**執行層**的升級是按時間順序，根據[先前 Devcon 地點](https://devcon.org/en/past-events/)的城市名稱來命名：

| 升級名稱       | Devcon 年份 | Devcon 編號 | 升級日期            |
| ---------- | --------- | --------- | --------------- |
| 柏林升級       | 2014 年    | 0         | 2021 年 4 月 15 日 |
| London 升級  | 2015 年    | I         | 2021 年 8 月 5 日  |
| 上海升級       | 2016 年    | II        | 2023 年 4 月 12 日 |
| Cancun     | 2017 年    | III       | 2024 年 3 月 13 日 |
| **Prague** | 2018      | IV        | 待定 - 下一個        |
| _Osaka_    | 2019 年    | V         | 待定              |
| _Bogota_   | 2022 年    | VI        | 待定              |
| _Bangkok_  | 2024 年    | VII       | 待定              |

**共識升級命名**

自[信標鏈](/glossary/#beacon-chain)推出以來，**共識層**的升級是以按字母順序排列的天體恆星來命名：

| 升級名稱                                                          | 升級日期             |
| ------------------------------------------------------------- | ---------------- |
| 信標鏈創世塊                                                        | 2020 年 12 月 1 日  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 2021 年 10 月 27 日 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 2022 年 9 月 6 日   |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 2023 年 4 月 12 日  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 2024 年 3 月 13 日  |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | 待定 - 下一個         |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | 待定               |

**組合命名**

執行層和共識層升級最初是在不同時間推出的，但在 2022 年[合併](/roadmap/merge/)之後，這些升級已同時部署。 因此，出現了使用單一組合詞的通俗術語來簡化對這些升級的引用。 這種做法始於 _Shanghai-Capella_ 升級，通常稱為「**Shapella**」，並在 _Cancun-Deneb_ (**Dencun**) 升級和_ Prague-Electra_ (**Pectra**) 升級時沿用了這種做法。

| 執行升級   | 共識升級      | 簡稱         |
| ------ | --------- | ---------- |
| 上海升級   | Capella升級 | 「Shapella」 |
| Cancun | Deneb     | 「Dencun」   |
| Prague | Electra   | 「Pectra」   |
| Osaka  | Fulu      | 「Fusaka」   |
</ExpandableCard>

直接跳到一些特別重要的過去升級的資訊：[信標鏈](/roadmap/beacon-chain/)、[合併](/roadmap/merge/) 和 [EIP-1559](#london)

想瞭解未來的協定升級嗎？ [瞭解以太坊開發藍圖上即將到來的升級](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka (「Fusaka」) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[更多關於 Fusaka](/roadmap/fusaka/)

### Prague-Electra (「Pectra」) {#pectra}

<NetworkUpgradeSummary name="pectra" />

Prague-Electra（“Pectra”）升級包括對以太坊協議的幾項改進，旨在改善所有用戶、二層網路、質押者和節點運營者的體驗。

透過合并驗證者帳戶，質押得到升級，并且使用執行提款地址改善了對質押資金的控制。 EIP-7251 將單個驗證者的最大有效餘額增加到 2048，從而提高了質押者的資本效率。 EIP-7002 允許執行帳戶安全地觸發驗證者操作，包括提取全部或部分資金，從而改善 ETH 質押者的體驗，並幫助增强了節點運營者的問責制。

升級的另一部分專注於改善普通用戶的體驗。 EIP-7702 讓常規的非智能合約帳戶 ([EOA](/glossary/#eoa)) 能夠執行類似智能合約的程式碼。 這為傳統的以太坊帳戶解鎖了很多新功能，例如交易批處理、gas 贊助、可替代的身份驗證方法、可程式化花費控制、帳戶恢復機制等。

<ExpandableCard title="Pectra 相關 EIP" contentPreview="此升級所包含的官方改善。">

更好的使用者體驗:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>設置外部帳戶的帳戶代碼</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Blob 吞吐量提高</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>增加 calldata 費用</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>將 blob 計劃添加到執行層配置檔案中</em></li>
</ul>

更好的質押體驗：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>增加 <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>執行層可觸發退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>通用執行層請求</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>提供鏈上驗證者存款資訊</em></li>
</ul>

協議效率和安全性改進：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>預編譯 BLS12-381 曲綫操作</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>在狀態中保存歷史區塊哈希</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>將委員會索引移除出證明</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Pectra 將如何增強質押體驗](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [閱讀 Electra 升級規範](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Prague-Electra (「Pectra」) 常見問題](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb (「Dencun」) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancun 摘要 {#cancun-summary}

Cancun 升級包含一組針對以太坊_執行層_的改進，旨在與 Deneb 共識升級一起提高可擴展性。

值得注意的是，這包括 EIP-4844，又稱為 **Proto-Danksharding**，它顯著降低了 Layer 2 rollups 的資料儲存成本。 這是透過引入資料「二進位大型物件」來實現的，二進位大型物件使卷軸能夠在短時間內將資料發佈到主網。 這顯著降低了二層網路卷軸使用者的交易費。

<ExpandableCard title="Cancun 相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>暫態存儲操作碼</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>以太坊虛擬機中的信標區塊根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片二進位大型物件交易 (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - 記憶體複製指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> 只能存在於相同交易中</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> 操作碼</em></li>
</ul>
</ExpandableCard>

- [Layer 2 卷軸](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [閱讀 Cancun 升級規範](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb 摘要 {#deneb-summary}

Deneb 升級包含對以太坊_共識層_的一系列改進，旨在提升可擴展性。 此升級與 Cancun 執行升級同步進行，以啟用 Proto-Danksharding (EIP-4844)，並對信標鏈進行其他改進。

預先產生的已簽署「自願退出訊息」不再過期，因此可讓使用者在將資金質押到第三方節點營運商時擁有更多控制權。 透過這個已簽署的退出訊息，質押者可以委託節點運作，同時保持隨時安全退出和提取資金的能力，而不需要徵求任何人的許可。

EIP-7514 將驗證者加入網路的「流失」率限制在每個時期八 (8) 個，從而收緊了以太幣的發行。 由於 ETH 發行量與質押的 ETH 總量成正比，限制加入的驗證者數量可限制新發行 ETH 的_成長率_，同時也降低了節點營運商的硬體要求，有助於去中心化。

<ExpandableCard title="Deneb 相關 EIP" contentPreview="此升級所包含的官方改善">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>以太坊虛擬機中的信標區塊根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片二進位大型物件交易</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永久有效的已簽署自願退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>增加最大證明納入時隙</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>加入最大時期流失限制</em></li>
</ul>
</ExpandableCard>

- [閱讀 Deneb 升級規範](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb (「Dencun」) 常見問題](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella (「Shapella」) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghai 摘要 {#shanghai-summary}

上海升級為執行層引入了質押提款的功能。 隨著與 Capella 升級同步進行，區塊能夠支援提款操作，使質押者可以將他們的以太幣從信標鏈提取到執行層。

<ExpandableCard title="上海相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>啟動 <code>COINBASE</code> 位址預熱</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新增 <code>PUSH0</code> 指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>限制和計量 initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>信標鏈推送提款操作</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>棄用 <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [閱讀 Shanghai 升級規範](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella 摘要 {#capella-summary}

Capella 升級是共識層（信標鏈）的第三次重大升級，實現了質押提款。 Capella 升級與執行層升級「上海升級」同步進行，並實現了質押提款的功能。

這次共識層升級讓未提供初始存款提款憑證的質押者能夠提供提款憑證，從而實現提款。

此升級還提供了自動帳戶掃描功能，可持續處理驗證者帳戶的任何可用獎勵支付或全額提款。

- [深入了解質押提款](/staking/withdrawals/).
- [閱讀 Capella 升級規範](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (合併) {#paris}

<NetworkUpgradeSummary name="paris" />

#### 總結 {#paris-summary}

Paris 升級是由於工作量證明區塊鏈通過了 58750000000000000000000 的[終端總難度](/glossary/#terminal-total-difficulty)而觸發。 這發生在2022年9月15日的第15537393區塊上，觸發了下一個區塊的巴黎升級。
這發生在 2022 年 9 月 15 日區塊 15537393 上，並在下一個區塊處觸發了巴黎升級。 Paris 是[合併](/roadmap/merge/)的過渡 - 其主要功能是關閉[工作量證明](/developers/docs/consensus-mechanisms/pow)挖礦演算法及相關的共識邏輯，並轉而啟用[權益證明](/developers/docs/consensus-mechanisms/pos)。 Paris 本身是對[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)的升級 (相當於共識層上的 Bellatrix)，使它們能夠從其連接的[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)接收指令。 這需要啟用一組新的內部 API 方法，統稱為[引擎 API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。 這可以說是自[個人莊園](#homestead)以來，以太坊歷史上意義最重大的升級！

- [閱讀 Paris 升級規範](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="巴黎相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>將共識層升級為權益證明</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>以 PREVRANDAO 取代 DIFFICULTY 操作碼 </em></li>
</ul>
</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 總結 {#bellatrix-summary}

Bellatrix 升級是[信標鏈](/roadmap/beacon-chain)的第二次預定升級，為鏈準備[合併](/roadmap/merge/)。 它將驗證者因怠惰及進行了可被罰沒的行為而受到的懲罰提高到其全部價值。 Bellatrix 升級還包括對分叉選擇規則的更新，讓信標鏈為合併以及從最後一個工作量證明區塊過渡到第一個權益證明區塊做好準備。 這包括讓共識用戶端意識到 58750000000000000000000 的[終端總難度](/glossary/#terminal-total-difficulty)。

- [閱讀 Bellatrix 升級規範](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 總結 {#gray-glacier-summary}

Gray Glacier 網路升級將[難度炸彈](/glossary/#difficulty-bomb)推遲了三個月。 這是此次升級中引入的唯一變更，在本質上類似於 [Arrow Glacier](#arrow-glacier) 和 [Muir Glacier](#muir-glacier) 升級。 在 [Byzantium](#byzantium)、[Constantinople](#constantinople) 和 [London](#london) 網路升級中也執行了類似的變更。

- [以太坊基金會部落格 - Gray Glacier 升級公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="灰色冰川相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>將難度炸彈推遲至 2022 年 9 月</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 總結 {#arrow-glacier-summary}

Arrow Glacier 網路升級將[難度炸彈](/glossary/#difficulty-bomb)推遲了數個月。 這是此次升級中引入的唯一變更，在本質上類似於 [Muir Glacier](#muir-glacier) 升級。 在 [Byzantium](#byzantium)、[Constantinople](#constantinople) 和 [London](#london) 網路升級中也執行了類似的變更。

- [以太坊基金會部落格 - Arrow Glacier 升級公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - 以太坊 Arrow Glacier 升級](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭頭冰川相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>將難度炸彈推遲至 2022 年 6 月</em></li>
</ul>
</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### 總結 {#altair-summary}

Altair 升級是[信標鏈](/roadmap/beacon-chain)的第一次預定升級。 此次升級增加了對「同步委員會」的支援—支援輕量用戶端，在向合併進展的過程中，增加了對驗證者怠惰及可被罰沒行為的懲罰。

- [閱讀 Altair 升級規範](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />趣聞！ {#altair-fun-fact}

Altair 升級是第一個有確切發佈時間的重大網路升級。 先前的每一次升級均基於一個已經在工作量證明鏈上申報過的區塊編號，而該鏈上的區塊時間各不相同。 信標鏈不需要解析工作量證明，而是在一個基於時間、由 32 個 12 秒「時隙」組成的時期系統上運作。在這個系統上，驗證者可以提出區塊。 這就是為什麼我們能準確知曉達到時期 74,240 以及 Altair 升級啟動的時間！

- [區塊時間](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### 總結 {#london-summary}

London 升級引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，它改革了交易費市場，並變更了 Gas 退款的處理方式和[冰河期](/glossary/#ice-age)的時程。

#### 什麼是 London 升級/EIP-1559？ {#eip-1559}

London 升級前，以太坊的區塊為固定大小。 當網路需求高時，這些區塊會滿載運作。 因此，使用者常需要等網路需求降低時，交易才會被添加進區塊，這導致了糟糕的使用者體驗。 London 升級將可變大小的區塊引入以太坊。

隨著 2021 年 8 月的[London 升級](/ethereum-forks/#london)，以太坊網路上交易費的計算方式發生了改變。 在 London 升級之前，費用的計算沒有區分`基本`費用和`優先`費用，如下：

假設 Alice 必須向 Bob 支付 1 以太幣。 在交易中，燃料限制是 21,000 單位，燃料價格為 200 gwei。

總費用會是：`Gas 單位 (上限) * 每單位 Gas 價格`，亦即 `21,000 * 200 = 4,200,000 gwei` 或 0.0042 ETH

在 London 升級中實作 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 讓交易費機制變得更複雜，但也使 Gas 費更可預測，從而形成了一個更有效率的交易費市場。 使用者可以提交帶有 `maxFeePerGas` 的交易，該值對應他們願意為執行交易支付的金額，同時知道他們支付的費用不會超過 Gas 的市價 (`baseFeePerGas`)，且任何超額部分（減去小費）都將退還。

這支影片解釋了 EIP-1559 及其帶來的好處：[EIP-1559 解說](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [您是去中心化應用程式開發者嗎？ 請務必升級您的函式庫和工具。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [閱讀以太坊基金會公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [閱讀 Ethereum Cat Herder 的解說](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="倫敦相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>改善交易費市場</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>從區塊傳回 <code>BASEFEE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>減少用於以太坊虛擬機器運作的燃料退款</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>防止部署以 <code>0xEF</code> 開頭的合約</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>將冰河期延遲至 2021 年 12 月</em></li>
</ul>
</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 總結 {#berlin-summary}

柏林升級優化了某些以太坊虛擬機器動作的燃料成本，並增加了對多種交易類型的支援。

- [閱讀以太坊基金會公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [閱讀 Ethereum Cat Herder 的解說](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="柏林相關 EIP" contentPreview="此升級所包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>降低 ModExp 燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>更容易支援多種交易類型</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>增加狀態存取操作碼的燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>新增可選存取清單</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### 信標鏈創世 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 總結 {#beacon-chain-genesis-summary}

[信標鏈](/roadmap/beacon-chain/)需要 16384 筆 32 個已質押 ETH 的存款才能安全上線。 這發生在 11 月 27 日，信標鏈於 2020 年 12 月 1 日開始產生區塊。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  信標鏈
</DocLink>

---

### 質押存款合約已部署 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 總結 {#deposit-contract-summary}

質押存款合約將[質押](/glossary/#staking)引入以太坊生態系統。 雖然是一個[主網](/glossary/#mainnet)合約，但它對啟動[信標鏈](/roadmap/beacon-chain/)（一項重要的[以太坊升級](/roadmap/)）的時間軸有直接影響。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  質押
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 總結 {#muir-glacier-summary}

Muir Glacier 分叉延遲了[難度炸彈](/glossary/#difficulty-bomb)。 [工作量證明](/developers/docs/consensus-mechanisms/pow/)共識機制的區塊難度增加，會拉長發送交易和使用去中心化應用程式的等待時間，從而威脅到以太坊的可用性。

- [閱讀以太坊基金會公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [閱讀 Ethereum Cat Herder 的解說](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="繆爾冰川相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>將難度炸彈再推遲 4,000,000 個區塊，或約 611 天。</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 總結 {#istanbul-summary}

伊斯坦堡分叉：

- 最佳化了[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 中某些操作的 [Gas](/glossary/#gas) 成本。
- 提高受到阻斷服務攻擊後的韌性。
- 使基於 SNARKs 和 STARKs 的[Layer 2 擴展](/developers/docs/scaling/#layer-2-scaling)解決方案效能更高。
- 使以太坊和 Zcash 能夠互通。
- 讓合約能夠引入更多創意功能。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="伊斯坦堡相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>允許以太幣與 Zcash 等受隱私保護的數位貨幣一起使用。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>以更低廉的加密技術改善 [gas](/glossary/#gas)成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>保護以太坊免於重送攻擊透過新增<code>CHAINID</code>作業碼/developers/docs/ethereum-stack/#ethereum-virtual-machine</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>最佳化基於消耗量的操作碼燃料價格。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>降低了 CallData 的成本，從而允許更多資料放入區塊中 – 這對 [二層網路擴容](/developers/docs/scaling/#layer-2-scaling)很有幫助。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>其他操作碼的燃料價格變更。</em></li>
</ul>
</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 總結 {#constantinople-summary}

君士坦丁堡分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 3 ETH 降至 2 ETH。
- 確保在[實作權益證明](#beacon-chain-genesis)之前，區塊鏈不會凍結。
- 最佳化了[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 中某些操作的 [Gas](/glossary/#gas) 成本。
- 新增了與尚未建立的地址進行互動的能力。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="君士坦丁堡相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>最佳化特定鏈上操作的成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>讓你能夠與尚未建立的地址互動。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>引入 <code>EXTCODEHASH</code> 指令來擷取其他合約程式碼的雜湊值。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>確保在權益證明之前，區塊鏈不會凍結，並將區塊獎勵從 3 以太幣減少至 2 以太幣。</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 總結 {#byzantium-summary}

拜占庭分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 5 ETH 降至 3 ETH。
- 將[難度炸彈](/glossary/#difficulty-bomb)延遲一年。
- 新增了呼叫其他合約而不變更狀態的能力。
- 添加了某些密碼學方法以允許[Layer 2 擴展](/developers/docs/scaling/#layer-2-scaling)。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="拜占庭相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>新增 <code>REVERT</code> 操作碼。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>在交易收據中新增了狀態欄位，以表示成功或失敗。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> –<em>新增橢圓曲線與標準乘法以支援[ZK-Snarks]。/developers/docs/scaling/zk-rollups/</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> –<em>新增橢圓曲線與標準乘法以支援[ZK-Snarks]/developers/docs/scaling/zk-rollups/。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>啟用 RSA 簽名驗證。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>新增對可變長度傳回值的支援。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>新增 <code>STATICCALL</code> 作業碼，能夠呼叫其他合約而不變更狀態。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>變更難度調整公式。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>將[難度炸彈](/glossary/#difficulty-bomb)延遲 1 年，並將區塊獎勵從 5 以太幣減至 3 以太幣。</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 總結 {#spurious-dragon-summary}

Spurious Dragon 分叉為對阻斷服務 (DoS) 攻擊（2016 年 9 月/10 月）的第二個回應，包括：

- 調整操作碼價格，以防網路未來再受攻擊。
- 啟用區塊鏈狀態的「區塊鏈減重」。
- 新增重播攻擊保護。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="偽龍相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>防止在一條以太坊鏈上的交易被重複廣播到另一條鏈，例如測試網交易在以太坊主鏈上重播。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>調整 <code>EXP</code> 操作碼的價格 – 讓透過計算成本高昂的合約作業來降低網路速度變得更加困難。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>允許刪除透過阻斷服務攻擊產生的空帳戶。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>將區塊鏈上合約可達到的最大程式碼大小改為 24576 位元組。</em></li>
</ul>
</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 總結 {#tangerine-whistle-summary}

橘子口哨分叉是對網路上阻斷服務 (DoS) 攻擊（2016 年 9 月/10 月）的第一個回應，包括：

- 解決與定價過低的操作程式碼有關的緊急網路健康問題。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="橘哨相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>增加可用於垃圾郵件攻擊的操作碼的燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>透過刪除大量空帳戶來減少狀態大小，這些空帳戶由於早期版本的以太坊協定中的缺陷而以非常低的成本置於狀態中。</em></li>
</ul>
</ExpandableCard>

---

### DAO 分叉 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 總結 {#dao-fork-summary}

DAO 分叉是為了因應 [2016 年 DAO 攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack/)，當時一個不安全的 [DAO](/glossary/#dao) 合約被駭客盜取了超過 360 萬個 ETH。 該分叉將資金從有問題的合約中，移到一個只有單一提款功能的[新合約](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)中。 任何損失了資金的人都可以在他們的錢包中提取以太幣，每 100 個去中心化自治組織代幣可以提取 1 個以太幣。

這個做法是以太坊社群投票的結果。 任何 ETH 持有者都能夠透過在 [一個投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) 上的交易進行投票。 許多人支持分叉的決定，投票率超過 85%。

一些礦工拒絕分叉，因為那次去中心化自治組織事件並不是協定中的缺陷。 他們後來成立了 [Ethereum Classic](https://ethereumclassic.org/)。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### 個人莊園 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 總結 {#homestead-summary}

家園分叉著眼於未來。 包括若干協定修改和網路變更，使以太坊能夠進一步進行網路升級。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="家園相關 EIP" contentPreview="本次分叉包含的官方改善。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>對合約建立過程進行編輯。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新增操作碼：<code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>引入 devp2p 正向相容性要求</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier 解凍 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 總結 {#frontier-thawing-summary}

Frontier 解凍分叉取消了每個[區塊](/glossary/#block) 5,000 [Gas](/glossary/#gas) 的上限，並將預設 Gas 價格設為 51 [gwei](/glossary/#gwei)。 這樣便能進行交易 - 交易需要 21,000 單位燃料。 引入了[難度炸彈](/glossary/#difficulty-bomb)以確保未來能硬分叉到[權益證明](/glossary/#pos)。

- [閱讀以太坊基金會公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [閱讀以太坊協定更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 總結 {#frontier-summary}

前沿升級是以太坊專案的已上線準系統實作。 該版本在奧利匹克測試階段成功完成之後推出。 它面向的是技術使用者，特別是開發者。 [區塊](/glossary/#block)的 [Gas](/glossary/#gas) 上限為 5,000。 此「解凍」階段使礦工能夠開始作業，並使早期採用者能夠有足夠的時間來安裝用戶端。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### 以太幣銷售 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

以太幣正式發售 42 天。 你可以使用比特幣購買以太幣。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 黃皮書發布 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

黃皮書由 Gavin Wood 博士撰寫，介紹了以太坊協議之技術定義。

[查看黃皮書](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### 白皮書發布 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

2015 年專案啟動之前，以太坊創辦人 Vitalik Buterin 於 2013 年發表了這篇介紹白皮書。

<DocLink href="/whitepaper/">
  白皮書
</DocLink>
