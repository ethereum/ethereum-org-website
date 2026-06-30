---
title: 所有以太坊分叉時間表（2014 年至今）
description: 以太坊區塊鏈的歷史，包含重要里程碑、版本發佈與分叉。
lang: zh-tw
sidebarDepth: 1
authors: ["尼克索"]
---

[以太坊](/)區塊鏈所有重要里程碑、分叉與更新的時間表。

<ExpandableCard title="什麼是分叉？" contentPreview="對以太坊協定規則的更改，通常包含計畫中的技術升級。">

當網路需要進行重大技術升級或變更時，就會發生分叉——它們通常源自[以太坊改善提案 (EIP)](/eips/)，並會改變協定的「規則」。

在傳統的集中控制軟體中，當需要升級時，公司只需為終端使用者發佈新版本即可。區塊鏈的運作方式不同，因為沒有中央所有權。[以太坊客戶端](/developers/docs/nodes-and-clients/)必須更新其軟體以實作新的分叉規則。此外，區塊建立者（在工作量證明 (PoW) 世界中為礦工，在權益證明 (PoS) 世界中為驗證者）與節點必須根據新規則建立區塊並進行驗證。[更多關於共識機制的資訊](/developers/docs/consensus-mechanisms/)

這些規則變更可能會在網路中造成暫時的分裂。新區塊可以根據新規則或舊規則產生。分叉通常會事先達成共識，以便客戶端一致採用變更，而帶有升級的分叉就會成為主鏈。然而，在極少數情況下，對分叉的意見分歧可能會導致網路永久分裂——最著名的例子就是因 <a href="#dao-fork">DAO 分叉</a>而誕生的以太坊經典。

</ExpandableCard>

<ExpandableCard title="為什麼有些升級有多個名稱？" contentPreview="升級名稱遵循一種模式">

構成以太坊底層的軟體由兩部分組成，稱為[執行層](/glossary/#execution-layer)與[共識層](/glossary/#consensus-layer)。

**執行層升級命名**

自 2021 年起，**執行層**的升級會根據[歷屆 Devcon 與 Devconnect 舉辦地點](https://devcon.org/en/past-events/)的城市名稱按時間順序命名：

| 升級名稱       | Devcon(nect) 年份 | Devcon 屆數   | 升級日期           |
| -------------- | ----------------- | ------------- | ------------------ |
| 柏林           | 2014              | 0             | 2021 年 4 月 15 日 |
| 倫敦           | 2015              | I             | 2021 年 8 月 5 日  |
| 上海           | 2016              | II            | 2023 年 4 月 12 日 |
| 坎昆           | 2017              | III           | 2024 年 3 月 13 日 |
| 布拉格         | 2018              | IV            | 2025 年 5 月 7 日  |
| 大阪           | 2019              | V             | 2025 年 12 月 3 日 |
| **阿姆斯特丹** | 2022              | Devconnect    | 待定 - 下一次      |
| _波哥大_       | 2022              | VI            | 待定               |
| _伊斯坦堡_     | 2023              | Devconnect    | 待定               |
| _曼谷_         | 2024              | VII           | 待定               |
| _布宜諾斯艾利斯_ | 2025              | Devconnect    | 待定               |
| _孟買_         | 2026              | VIII          | 待定               |

**共識層升級命名**

自[信標鏈](/glossary/#beacon-chain)推出以來，**共識層**的升級皆以恆星命名，其首字母按英文字母順序排列：

| 升級名稱                                                  | 升級日期           |
| --------------------------------------------------------- | ------------------ |
| 信標鏈創世                                                | 2020 年 12 月 1 日 |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 2021 年 10 月 27 日|
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 2022 年 9 月 6 日  |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 2023 年 4 月 12 日 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 2024 年 3 月 13 日 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 2025 年 5 月 7 日  |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 2025 年 12 月 3 日 |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | 待定 - 下一次      |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | 待定               |

**合併命名**

執行層與共識層的升級最初是在不同時間推出的，但在 2022 年[合併](/roadmap/merge/)之後，這些升級已改為同時部署。因此，出現了俗稱，使用單一的組合詞來簡化對這些升級的稱呼。這始於 _Shanghai-Capella_ 升級，通常被稱為「**沙佩拉**」，並在隨後的升級中延續。

| 執行層升級        | 共識層升級        | 簡稱          |
| ----------------- | ----------------- | ------------- |
| 上海              | Capella           | "沙佩拉"      |
| 坎昆              | Deneb             | "Dencun"      |
| 布拉格            | Electra           | "佩克特拉"    |
| 大阪              | Fulu              | "富薩卡"      |
| 阿姆斯特丹        | Gloas             | "格蘭斯特丹"  |
| 波哥大            | Heze              | "Hegotá"      |

</ExpandableCard>

直接跳至一些特別重要的過去升級資訊：[信標鏈](/roadmap/beacon-chain/)；[合併](/roadmap/merge/)；以及 [EIP-1559](#london)

正在尋找未來的協定升級嗎？[了解以太坊路線圖上即將推出的升級](/roadmap/)。

<Divider />

## 2025 {#2025}

### Fulu-Osaka (「富薩卡」) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[更多關於富薩卡的資訊](/roadmap/fusaka/)

### 布拉格-Electra (「佩克特拉」)
<NetworkUpgradeSummary name="pectra" />

布拉格-Electra (「佩克特拉」) 升級包含了對以太坊協定的幾項改進，旨在提升所有使用者、第二層 (L2) 網路、質押者與節點營運商的體驗。

質押功能獲得了升級，具備複利驗證者帳戶，並透過執行提款地址改善了對質押資金的控制。EIP-7251 將單一驗證者的最大有效餘額增加至 2048，提高了質押者的資金效率。EIP-7002 允許執行帳戶安全地觸發驗證者操作，包括退出或提取部分資金，從而改善了 ETH 質押者的體驗，同時有助於加強節點營運商的問責制。

升級的其他部分則著重於改善一般使用者的體驗。EIP-7702 為一般非智能合約帳戶（[外部擁有帳戶 (EOA)](/glossary/#eoa)）帶來了執行類似智能合約程式碼的能力。這為傳統以太坊帳戶解鎖了無限的新功能，例如交易批次處理、燃料贊助、替代身分驗證、可程式化支出控制、帳戶復原機制等。

<ExpandableCard title="佩克特拉 EIP" contentPreview="包含在此次升級中的官方改進。">

更好的使用者體驗：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>設定 EOA 帳戶程式碼</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>增加資料塊吞吐量</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>增加呼叫資料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>將資料塊排程新增至執行層 (EL) 設定檔</em></li>
</ul>

更好的質押體驗：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>增加 <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>執行層可觸發的退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>通用執行層請求</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>在鏈上提供驗證者存款</em></li>
</ul>

協定效率與安全性改進：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 曲線操作的預編譯合約</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>在狀態中儲存歷史區塊雜湊</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>將委員會索引移出證明</em></li>
</ul>

</ExpandableCard>

- [佩克特拉將如何提升質押體驗](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [閱讀 Electra 升級規格](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [布拉格-Electra (「佩克特拉」) 常見問題](/roadmap/pectra/)

<Divider />
## 2024 {#2024}

### 坎昆-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### 坎昆摘要 {#cancun-summary}

坎昆升級包含了一系列對以太坊_執行_的改進，旨在提高可擴展性，並與 Deneb 共識升級協同進行。

值得注意的是，這包含了 EIP-4844，即所謂的**原始 Danksharding**，它顯著降低了第二層 (L2) 匯總的資料儲存成本。這是透過引入「資料塊」來實現的，它允許匯總將資料發佈到主網並保留一小段時間。這為第二層 (L2) 匯總的使用者帶來了顯著降低的交易手續費。

<ExpandableCard title="坎昆 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>暫時儲存操作碼</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM 中的信標區塊根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片資料塊交易 (原始 Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - 記憶體複製指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> 僅在同一交易中</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> 操作碼</em></li>
</ul>

</ExpandableCard>

- [第二層 (L2) 匯總](/layer-2/)
- [原始 Danksharding](/roadmap/scaling/#proto-danksharding)
- [丹克分片](/roadmap/danksharding/)
- [閱讀坎昆升級規格](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb 摘要 {#deneb-summary}

Deneb 升級包含了一系列對以太坊_共識_的改進，旨在提高可擴展性。此升級與坎昆執行升級協同進行，以啟用原始 Danksharding (EIP-4844)，並包含對信標鏈的其他改進。

預先產生的已簽章「自願退出訊息」不再過期，從而讓將資金質押給第三方節點營運商的使用者擁有更多控制權。有了這個已簽章的退出訊息，質押者可以委託節點營運，同時保有隨時安全退出並提款的能力，而無需徵求任何人的許可。

EIP-7514 透過將驗證者加入網路的「流動」率限制為每個紀元八 (8) 個，從而緊縮了 ETH 的發行。由於 ETH 發行量與總質押的 ETH 成正比，限制加入的驗證者數量可以限制新發行 ETH 的_增長率_，同時也降低了節點營運商的硬體要求，有助於去中心化。

<ExpandableCard title="Deneb EIP" contentPreview="包含在此次升級中的官方改進">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM 中的信標區塊根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片資料塊交易</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永久有效的已簽章自願退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>增加最大證明包含時槽</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>新增最大紀元流動限制</em></li>
</ul>

</ExpandableCard>

- [閱讀 Deneb 升級規格](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [坎昆-Deneb ("Dencun") 常見問題](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### 上海-Capella（「沙佩拉」） {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 上海摘要 {#shanghai-summary}

上海升級將質押提款引入了執行層。結合 Capella 升級，這使得區塊能夠接受提款操作，從而允許質押者將他們的 ETH 從信標鏈提取到執行層。

<ExpandableCard title="上海 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>預熱 <code>COINBASE</code> 地址</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新增 <code>PUSH0</code> 指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>限制並計量 initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>信標鏈將提款作為操作推送</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>棄用 <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [閱讀上海升級規格](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella 摘要 {#capella-summary}

Capella 升級是共識層（信標鏈）的第三次重大升級，並啟用了質押提款。Capella 與執行層升級（上海）同步進行，並啟用了質押提款功能。

這次共識層升級讓在初始存款時未提供提款憑證的質押者能夠補交憑證，從而啟用提款功能。

該升級還提供了自動帳戶掃描功能，該功能會持續處理驗證者帳戶，以進行任何可用的獎勵支付或全額提款。

- [更多關於質押提款的資訊](/staking/withdrawals/)。
- [閱讀 Capella 升級規格](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### 巴黎 (合併) {#paris}

<NetworkUpgradeSummary name="paris" />

#### 摘要 {#paris-summary}

巴黎升級是由工作量證明 (PoW) 區塊鏈超過 58750000000000000000000 的[終端總難度](/glossary/#terminal-total-difficulty)所觸發。這發生在 2022 年 9 月 15 日的第 15537393 個區塊，並在下一個區塊觸發了巴黎升級。巴黎升級是[合併](/roadmap/merge/)過渡——其主要特徵是關閉[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow)挖礦演算法及相關的共識邏輯，並改為啟用[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)。巴黎升級本身是對[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)的升級（相當於共識層上的 Bellatrix 升級），使它們能夠接收來自其連接的[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)的指令。這需要啟用一組新的內部 API 方法，統稱為[引擎 API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。這可以說是以太坊歷史上自[霍姆斯特德](#homestead)以來最重要的升級！

- [閱讀巴黎升級規格](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="巴黎 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>將共識升級為權益證明 (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>使用 PREVRANDAO 取代 DIFFICULTY 操作碼</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 摘要 {#bellatrix-summary}

Bellatrix 升級是[信標鏈](/roadmap/beacon-chain)的第二次計畫升級，為該鏈的[合併](/roadmap/merge/)做準備。它將驗證者因不活躍和可罰沒違規行為所受的懲罰提高至最大值。Bellatrix 還包含對分叉選擇規則的更新，以使該鏈為合併以及從最後一個工作量證明 (PoW) 區塊到第一個權益證明 (PoS) 區塊的過渡做好準備。這包括讓共識用戶端意識到 58750000000000000000000 的[終端總難度](/glossary/#terminal-total-difficulty)。

- [閱讀 Bellatrix 升級規格](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### 灰冰川 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 摘要 {#gray-glacier-summary}

灰冰川網路升級將[難度炸彈](/glossary/#difficulty-bomb)推遲了三個月。這是本次升級中引入的唯一變更，其性質與[箭形冰川](#arrow-glacier)和[繆爾冰川](#muir-glacier)升級相似。在[拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[倫敦](#london)網路升級中也執行過類似的變更。

- [以太坊基金會部落格 - 灰冰川升級公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="灰冰川 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>將難度炸彈推遲至 2022 年 9 月</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 摘要 {#arrow-glacier-summary}

Arrow Glacier 網路升級將[難度炸彈](/glossary/#difficulty-bomb)推遲了幾個月。這是本次升級中引入的唯一變更，其性質與 [Muir Glacier](#muir-glacier) 升級相似。在[拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[倫敦](#london)網路升級中也進行過類似的變更。

- [以太坊基金會部落格 - Arrow Glacier 升級公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - 以太坊 Arrow Glacier 升級](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭形冰川 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>將難度炸彈推遲至 2022 年 6 月</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### 摘要 {#altair-summary}

Altair 升級是[信標鏈](/roadmap/beacon-chain)的首次排定升級。它新增了對「同步委員會」的支援（從而啟用輕客戶端），並隨著開發工作朝向合併 (The Merge) 邁進，增加了驗證者不活躍與罰沒的懲罰。

- [閱讀 Altair 升級規格](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> 有趣的事實！ {#altair-fun-fact}

Altair 是第一個具有確切推出時間的重大網路升級。在此之前的每次升級都是基於工作量證明 (PoW) 鏈上宣告的區塊號，而區塊時間是會變動的。信標鏈不需要解出工作量證明 (PoW)，而是基於時間的紀元系統運作，每個紀元包含 32 個 12 秒的「時槽」，驗證者可以在這些時槽中提案區塊。這就是為什麼我們能確切知道何時會達到第 74,240 個紀元，以及 Altair 何時上線！

- [區塊時間](/developers/docs/blocks/#block-time)

---

### 倫敦 {#london}

<NetworkUpgradeSummary name="london" />

#### 摘要 {#london-summary}

倫敦升級引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，改革了交易手續費市場，並改變了 Gas 退款的處理方式以及[冰河時期](/glossary/#ice-age)的時程。

#### 什麼是倫敦升級 / EIP-1559？ {#eip-1559}

在倫敦升級之前，以太坊的區塊大小是固定的。在網路需求高漲時，這些區塊會滿載運作。因此，使用者通常必須等待需求降低才能被納入區塊中，這導致了糟糕的使用者體驗。倫敦升級為以太坊引入了可變大小的區塊。

以太坊網路上交易手續費的計算方式隨著 2021 年 8 月的[倫敦升級](/ethereum-forks/#london)而改變。在倫敦升級之前，手續費的計算並未區分 `base` 和 `priority` 費用，計算方式如下：

假設 Alice 必須支付 Bob 1 ETH。在該筆交易中，Gas 限制為 21,000 單位，而 Gas 價格為 200 Gwei。

總手續費將會是：`Gas units (limit) * Gas price per unit`，即 `21,000 * 200 = 4,200,000 gwei` 或 0.0042 ETH

倫敦升級中實施的 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 讓交易手續費機制變得更複雜，但也讓 Gas 費用更具可預測性，從而形成更有效率的交易手續費市場。使用者可以提交帶有 `maxFeePerGas` 的交易，該值對應於他們願意為執行交易支付的最高金額，並且知道他們支付的 Gas 費用不會超過市場價格（`baseFeePerGas`），任何多餘的金額（扣除小費後）都會被退還。

這部影片解釋了 EIP-1559 及其帶來的好處：[EIP-1559 解釋](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [您是去中心化應用程式 (dapp) 開發者嗎？請務必升級您的函式庫和工具。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [閱讀以太坊基金會公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [閱讀 Ethereum Cat Herders 的解釋文章](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="倫敦 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>改善交易手續費市場</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>從區塊中回傳 <code>BASEFEE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>減少 EVM 操作的 Gas 退款</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>防止部署以 <code>0xEF</code> 開頭的合約</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>將冰河時期推遲至 2021 年 12 月</em></li>
</ul>

</ExpandableCard>

---

### 柏林 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 摘要 {#berlin-summary}

柏林升級最佳化了某些 EVM 操作的 Gas 成本，並增加了對多種交易類型的支援。

- [閱讀以太坊基金會公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [閱讀 Ethereum Cat Herders 的解釋文章](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="柏林 EIP" contentPreview="包含在此次升級中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>降低 MODEXP 的 Gas 成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>讓支援多種交易類型變得更容易</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>增加狀態存取操作碼的 Gas 成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>新增可選的存取列表</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### 信標鏈創世 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 摘要 {#beacon-chain-genesis-summary}

[信標鏈](/roadmap/beacon-chain/)需要 16384 筆 32 個質押的 ETH 存款才能安全上線。這發生在 11 月 27 日，信標鏈於 2020 年 12 月 1 日開始產生區塊。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  信標鏈
</DocLink>

---

### 質押存款合約部署 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 摘要 {#deposit-contract-summary}

質押存款合約將[質押](/glossary/#staking)引入了以太坊生態系。雖然這是一個[主網](/glossary/#mainnet)合約，但它對啟動[信標鏈](/roadmap/beacon-chain/)（一項重要的[以太坊升級](/roadmap/)）的時間表產生了直接影響。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  質押
</DocLink>

---

### 繆爾冰川 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 摘要 {#muir-glacier-summary}

繆爾冰川分叉延遲了[難度炸彈](/glossary/#difficulty-bomb)。[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/) 共識機制的區塊難度增加，會導致發送交易和使用去中心化應用程式 (dapp) 的等待時間變長，進而威脅到以太坊的可用性。

- [閱讀以太坊基金會公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [閱讀 Ethereum Cat Herders 的解釋文章](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="繆爾冰川 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>將難度炸彈再延遲 4,000,000 個區塊，約 611 天。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### 伊斯坦堡 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 摘要 {#istanbul-summary}

伊斯坦堡分叉：

- 最佳化了 [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 中某些操作的[燃料](/glossary/#gas)成本。
- 提高了對阻斷服務攻擊的防禦能力。
- 讓基於 SNARKs 和 STARKs 的[第二層 (L2) 擴容](/developers/docs/scaling/#layer-2-scaling)解決方案效能更好。
- 實現了以太坊與 Zcash 之間的互操作性。
- 允許合約引入更具創意的功能。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="伊斯坦堡 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>允許以太坊與 Zcash 等保護隱私的貨幣協同運作。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>更便宜的密碼學，以改善[燃料](/glossary/#gas)成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>透過新增 <code>CHAINID</code> [操作碼](/developers/docs/ethereum-stack/#ethereum-virtual-machine)，保護以太坊免受重放攻擊。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>根據消耗量最佳化操作碼的 Gas 價格。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>降低呼叫資料的成本，允許區塊中包含更多資料 – 這有利於[第二層 (L2) 擴容](/developers/docs/scaling/#layer-2-scaling)。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>其他操作碼 Gas 價格的變更。</em></li>
</ul>

</ExpandableCard>

---

### 君士坦丁堡 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 摘要 {#constantinople-summary}

君士坦丁堡分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 3 ETH 減少到 2 ETH。
- 確保區塊鏈在[實施權益證明 (PoS)](#beacon-chain-genesis) 之前不會凍結。
- 最佳化了 [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 中某些操作的[燃料](/glossary/#gas)成本。
- 新增了與尚未建立的地址進行互動的功能。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="君士坦丁堡 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>最佳化某些鏈上操作的成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>允許你與尚未建立的地址進行互動。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>引入 <code>EXTCODEHASH</code> 指令，以擷取另一個合約程式碼的雜湊。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>確保區塊鏈在權益證明 (PoS) 之前不會凍結，並將區塊獎勵從 3 ETH 減少到 2 ETH。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### 拜占庭 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 摘要 {#byzantium-summary}

拜占庭分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 5 ETH 減少到 3 ETH。
- 將[難度炸彈](/glossary/#difficulty-bomb)延遲了一年。
- 新增了對其他合約進行不改變狀態呼叫的功能。
- 新增了特定的密碼學方法，以允許[第二層 (L2) 擴容](/developers/docs/scaling/#layer-2-scaling)。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="拜占庭 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>新增 <code>REVERT</code> 操作碼。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>在交易收據中新增狀態欄位，以指示成功或失敗。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>新增橢圓曲線和純量乘法，以允許 [ZK-Snarks](/developers/docs/scaling/zk-rollups/)。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>新增橢圓曲線和純量乘法，以允許 [ZK-Snarks](/developers/docs/scaling/zk-rollups/)。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>啟用 RSA 簽章驗證。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>新增對可變長度回傳值的支援。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>新增 <code>STATICCALL</code> 操作碼，允許對其他合約進行不改變狀態的呼叫。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>更改難度調整公式。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>將[難度炸彈](/glossary/#difficulty-bomb)延遲 1 年，並將區塊獎勵從 5 ETH 減少到 3 ETH。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 摘要 {#spurious-dragon-summary}

Spurious Dragon 分叉是對網路遭受阻斷服務 (DoS) 攻擊（2016 年 9 月至 10 月）的第二次回應，包含：

- 調整操作碼定價，以防止未來對網路的攻擊。
- 啟用區塊鏈狀態的「去膨脹」。
- 新增重放攻擊保護。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="偽龍 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>防止來自一條以太坊鏈的交易在另一條替代鏈上被重新廣播，例如測試網交易在以太坊主網上被重放。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>調整 <code>EXP</code> 操作碼的價格，使得透過計算成本高昂的合約操作來減緩網路速度變得更加困難。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>允許移除透過 DOS 攻擊新增的空帳戶。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>將區塊鏈上合約可擁有的最大程式碼大小變更為 24576 位元組。</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 摘要 {#tangerine-whistle-summary}

Tangerine Whistle 分叉是對網路遭受阻斷服務 (DoS) 攻擊（2016 年 9 月至 10 月）的第一次回應，包含：

- 解決關於定價過低操作碼的緊急網路健康問題。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="橘子哨 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>增加可能被用於垃圾訊息攻擊的操作碼的燃料成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>透過移除大量空帳戶來減少狀態大小，這些帳戶是由於早期版本以太坊協定中的缺陷，以極低的成本被放入狀態中的。</em></li>
</ul>

</ExpandableCard>

---

### DAO 分叉 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 摘要 {#dao-fork-summary}

DAO 分叉是為了回應 [2016 年的 DAO 攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack/)，在該次駭客攻擊中，一個不安全的 [DAO](/glossary/#dao) 合約被抽乾了超過 360 萬個 ETH。該分叉將資金從有缺陷的合約轉移到一個只有單一功能（提款）的[新合約](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)中。任何損失資金的人都可以為其錢包中的每 100 個 DAO 代幣提取 1 個 ETH。

這項行動方案是由以太坊社群投票決定的。任何 ETH 持有者都能夠透過在[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易進行投票。分叉的決定獲得了超過 85% 的選票。

一些礦工拒絕分叉，因為 DAO 事件並非協定中的缺陷。他們隨後組成了[以太坊經典](https://ethereumclassic.org/)。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### 霍姆斯特德 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 摘要 {#homestead-summary}

著眼於未來的霍姆斯特德分叉。它包含了幾項協定變更以及一項網路變更，賦予了以太坊進行進一步網路升級的能力。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="霍姆斯特德 EIP" contentPreview="包含在此次分叉中的官方改進。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>對合約建立過程進行了修改。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新增操作碼：<code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>引入 devp2p 向前相容性要求</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### 邊境解凍 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 摘要 {#frontier-thawing-summary}

邊境解凍分叉解除了每個[區塊](/glossary/#block) 5,000 [Gas](/glossary/#gas) 的限制，並將預設 Gas 價格設定為 51 [Gwei](/glossary/#gwei)。這使得交易成為可能——每筆交易需要 21,000 燃料。引入了[難度炸彈](/glossary/#difficulty-bomb)，以確保未來能硬分叉至[權益證明 (PoS)](/glossary/#pos)。

- [閱讀以太坊基金會公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [閱讀以太坊協定更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### 邊境 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 摘要 {#frontier-summary}

邊境是以太坊專案已上線但僅具備基本功能的實作。它接續在成功的 Olympic 測試階段之後。它專為技術使用者（特別是開發人員）而設計。[區塊](/glossary/#block)的 [Gas](/glossary/#gas) 限制為 5,000。這個「解凍」期讓礦工能夠開始作業，也讓早期採用者有充裕的時間安裝他們的用戶端，而無需「倉促行事」。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### 以太幣發售 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

以太幣正式發售 42 天。你可以使用 BTC 購買。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### 黃皮書發布 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

由加文·伍德博士撰寫的黃皮書，是以太坊協定的技術定義。

[檢視黃皮書](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### 白皮書發布 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

這份介紹性文件由以太坊創辦人維塔利克·布特林於 2013 年發表，早於該專案在 2015 年的正式啟動。

<DocLink href="/whitepaper/">
  白皮書
</DocLink>
