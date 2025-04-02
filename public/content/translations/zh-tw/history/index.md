---
title: 以太坊歷史及分叉
description: 以太坊區塊鏈的歷史，包含主要里程碑、更新及分叉。
lang: zh-tw
sidebarDepth: 1
---

# 以太坊歷史 {#the-history-of-ethereum}

關於以太坊區塊鏈的所有重要里程碑、分叉與升級的時間軸。

<ExpandableCard title="什麼是分叉？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

分叉是需要對網路進行重大技術升級或變更的時刻 – 分叉通常源自<a href="/eips/">以太坊改進提案 (EIP)</a> 並變更了以太坊協定的「規則」。

需要升級集中控制的傳統軟體時，公司只會為終端使用者發佈一個新版本。 而區塊鏈的運作則有所不同，因其並無所謂的集中所有權。 <a href="/developers/docs/nodes-and-clients/">以太坊用戶端</a>必須升級自己的軟體，以實作新分叉規則。 加上區塊生成者（在工作量證明世界中為礦工，在權益證明世界中為驗證者）和節點必須依據新規則生成區塊並作驗證。 <a href="/developers/docs/consensus-mechanisms/">關於共識機制的更多資訊</a>

這些規則變更可能會在網路中建立臨時分叉。 新區塊可以依據新規則或舊規則產生。 分叉通常會提前商定，以便用戶端能夠一致採用變更，並使升級後的分叉成為主鏈。 然而，在極少數情況下，對分叉的不同意見可能導致網路永久硬分叉 – 最爲著名的是<a href="#dao-fork">去中心化自治組織分叉</a>產生了以太坊經典。

</ExpandableCard>

<ExpandableCard title="為什麼有些升級有多個名稱？" contentPreview="Upgrades names follow a pattern">

以太坊底層的軟體由兩部分組成，稱為 [執行層](/glossary/#execution-layer) 和 [共識層](/glossary/#consensus-layer)。

**執行層升級命名**

自 2021 年以來，**執行層**的升級是依據 [前幾屆開發者大會舉辦地點](https://devcon.org/en/past-events/) 的城市名稱按時間順序命名的：

| 升級名稱 | 開發者大會年份 | 開發者大會編號 | 升級日期 |
| ------------ | ----------- | ------------- | ------------ |
| Berlin       | 2015        | 0             | 2021 年 4 月 15 日 |
| London       | 2016        | I             | 2021 年 8 月 5 日  |
| Shanghai     | 2017        | II            | 2023 年 4 月 12 日 |
| **Cancun**   | 2018        | III           | 2024 年 3 月 13 日 |
| _Prague_     | 2019        | IV            | 尚未決定          |
| _Osaka_      | 2020        | V             | 尚未決定          |
| _Bogota_     | 2022        | VI            | 尚未決定          |
| _Bangkok_    | 2024        | VII           | 尚未決定          |

**共識升級命名**

自 [信標鏈](/glossary/#beacon-chain) 推出以來，**共識層**的升級以天體恒星依照字母順序命名：

| 升級名稱                                                | 升級日期 |
| ----------------------------------------------------------- | ------------ |
| 信標鏈創世塊                                        | 2020 年 12 月 1 日  |
| [Altair](https://en.wikipedia.org/wiki/Altair)              | 2021 年 10 月 27 日 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)        | 2022 年 9 月 6 日  |
| [Capella](https://en.wikipedia.org/wiki/Capella)            | 2023 年 4 月 12 日 |
| [**Deneb**](https://en.wikipedia.org/wiki/Deneb)            | 2024 年 3 月 13 日 |
| [_Electra_](<https:>) | 尚未決定          |

**組合命名**

執行層和共識層升級最初是在不同時間推出的，但在 2022 年的 [合併](/roadmap/merge/) 之後，這些升級已同時部署。 因此，出現了使用單一組合詞的通俗術語來簡化對這些升級的引用。 這種做法始於 _Shanghai-Capella_ 升級，通常稱為「**Shapella**」，並在 _Cancun-Deneb_ 升級時沿用了這種做法，該升級稱為「**Dencun**」。

| 執行層升級 | 共識層升級 | 簡短名稱 |
| ----------------- | ----------------- | ---------- |
| Shanghai          | Capella           | 「Shapella」 |
| Cancun            | Deneb             | 「Dencun」   |

</ExpandableCard>

直接查閱一些特別重要的過往升級的資訊：[信標鏈](/roadmap/beacon-chain/)；[合併](/roadmap/merge/)；和 [EIP-1559](#london)

想瞭解未來的協定升級嗎？ [瞭解以太坊開發藍圖上即將進行的升級](/roadmap/)。

<Divider />

## 2024 年 {#2024}

### Cancun-Deneb（「Dencun」） {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancun 升級總結 {#cancun-summary}

Cancun 升級包含對以太坊_執行層_的一系列改進，旨在與 Deneb 共識層升級一起提高可擴展性。

值得注意的是，該升級包括稱為 **Proto-Danksharding** 的 EIP-4844，該提案顯著降低了二層網路卷軸的資料存儲成本。 這是透過引入資料「二進位大型物件」來實現的，二進位大型物件使卷軸能夠在短時間內將資料發佈到主網。 這顯著降低了二層網路卷軸使用者的交易費。

<ExpandableCard title="Cancun 升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>暫態存儲操作碼</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>以太坊虛擬機中的信標區塊根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片二進位大型物件交易 (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - 記憶體複製指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> 只能存在於相同交易中</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> 操作碼</em></li>
</ul>

</ExpandableCard>

- [二層網路卷軸](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [閱讀 Cancun 升級規範](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb 升級總結 {#deneb-summary}

Deneb 升級包含一系列對以太坊_共識層_的改進，旨在提升可擴展性。 此升級與 Cancun 執行升級同步進行，以啟用 Proto-Danksharding (EIP-4844)，並對信標鏈進行其他改進。

預先產生的已簽署「自願退出訊息」不再過期，因此可讓使用者在將資金質押到第三方節點營運商時擁有更多控制權。 透過這個已簽署的退出訊息，質押者可以委託節點運作，同時保持隨時安全退出和提取資金的能力，而不需要徵求任何人的許可。

EIP-7514 將驗證者加入網路的「流失」率限制在每個時期八 (8) 個，從而收緊了以太幣的發行。 由於以太幣發行量與質押的以太幣總量成正比，因此限制加入的驗證者數量會限制新發行以太幣的_成長率_，同時也降低了對節點營運商的硬體要求，有助於去中心化。

<ExpandableCard title="Deneb 升級以太坊改進提案" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>以太坊虛擬機中的信標區塊根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片二進位大型物件交易</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永久有效的已簽署自願退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>增加最大證明納入時隙</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>加入最大時期流失限制</em></li>
</ul>

</ExpandableCard>

- [閱讀 Deneb 升級規範](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [坎昆-Deneb（「Dencun」）升級常見問題](/roadmap/dencun/)

<Divider />

## 2023 年 {#2023}

### 上海-Capella（「Shapella」） {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 上海升級總結 {#shanghai-summary}

上海升級為執行層引入了質押提款的功能。 隨著與 Capella 升級同步進行，區塊能夠支援提款操作，使質押者可以將他們的以太幣從信標鏈提取到執行層。

<ExpandableCard title="上海升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>啟動 <code>COINBASE</code> 位址預熱</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新增 <code>PUSH0</code> 指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>限制和計量 initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>信標鏈推送提款操作</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>棄用 <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [閱讀上海升級規範](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella 升級總結 {#capella-summary}

Capella 升級是共識層（信標鏈）的第三次重大升級，實現了質押提款。 Capella 升級與執行層升級「上海升級」同步進行，並實現了質押提款的功能。

這次共識層升級讓未提供初始存款提款憑證的質押者能夠提供提款憑證，從而實現提款。

此升級還提供了自動帳戶掃描功能，可持續處理驗證者帳戶的任何可用獎勵支付或全額提款。

- [更多關於質押提款的資訊](/staking/withdrawals/)。
- [閱讀上海升級規範](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 年 {#2022}

### 巴黎升級（合併） {#paris}

<NetworkUpgradeSummary name="paris" />

#### 總結 {#paris-summary}

由於工作量證明區塊鏈超過了[終端總難度](/glossary/#terminal-total-difficulty) 58750000000000000000000，因而觸發了巴黎升級。 這發生在2022年9月15日的第15537393區塊上，觸發了下一個區塊的巴黎升級。 這發生在 2022 年 9 月 15 日區塊 15537393 上，並在下一個區塊處觸發了巴黎升級。 巴黎升級就是[合併](/roadmap/merge/)過渡，以太坊的主要功能結束了[工作量證明](/developers/docs/consensus-mechanisms/pow)挖礦演算法及相關共識邏輯並啟動了[權益證明](/developers/docs/consensus-mechanisms/pos)。 巴黎升級本身是對[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)的升級（相當於共識層上的 Bellatrix 升級），讓執行用戶端能夠從與其連線的[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)接受指令。 這需要啟動一組新的內部應用程式介面方法，統稱為[引擎應用程式介面](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。 這次升級可以說是自[家園](#homestead)以來以太坊歷史上最重要的升級！

- [閱讀 Paris 升級規範](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris 升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>將共識層升級為權益證明</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>以 PREVRANDAO 取代 DIFFICULTY 操作碼 </em></li>
</ul>

</ExpandableCard>

---

### Bellatrix 升級 {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 總結 {#bellatrix-summary}

Bellatrix 升級是[信標鏈](/roadmap/beacon-chain)的第二次預定升級，讓信標鏈為[合併](/roadmap/merge/)做準備。 它將驗證者因怠惰及進行了可被罰沒的行為而受到的懲罰提高到其全部價值。 Bellatrix 升級還包括對分叉選擇規則的更新，讓信標鏈為合併以及從最後一個工作量證明區塊過渡到第一個權益證明區塊做好準備。 這包括讓共識用戶端意識到[終端總難度](/glossary/#terminal-total-difficulty) 58750000000000000000000。

- [閱讀 Bellatrix 升級規範](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### 灰色冰川升級 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 總結 {#gray-glacier-summary}

灰色冰川網路升級將[難度炸彈](/glossary/#difficulty-bomb)推遲了三個月。 這是此次升級引入的唯一變更，本質上類似於[箭形冰川](#arrow-glacier)和[繆爾冰川](#muir-glacier)升級。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和 [London](#london) 網路升級也做了類似的變更。

- [以太坊基金會部落格 - 灰色冰川升級公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="灰色冰川升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>將難度炸彈推遲至 2022 年 9 月</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 年 {#2021}

### 箭形冰川升級 {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 總結 {#arrow-glacier-summary}

箭形冰川網路升級將[難度炸彈](/glossary/#difficulty-bomb)推遲數月。 這是此次升級引入的唯一變更，本質上類似於[謬爾冰川](#muir-glacier)升級。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[倫敦](#london)網絡升級也做了類似的更改。

- [以太坊基金會部落格 - 箭形冰川升級公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [以太坊牧貓人組織 - 以太坊箭形冰川升級](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭形冰川升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>將難度炸彈推遲至 2022 年 6 月</em></li>
</ul>

</ExpandableCard>

---

### Altair 升級 {#altair}

<NetworkUpgradeSummary name="altair" />

#### 總結 {#altair-summary}

Altair 升級是對[信標鏈](/roadmap/beacon-chain)進行的第一次預定升級。 此次升級增加了對「同步委員會」的支援—支援輕量用戶端，在向合併進展的過程中，增加了對驗證者怠惰及可被罰沒行為的懲罰。

- [閱讀 Altair 升級規範](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} classname="me-2" />趣聞！ {#altair-fun-fact}

Altair 升級是第一個有確切發佈時間的重大網路升級。 先前的每一次升級均基於一個已經在工作量證明鏈上申報過的區塊編號，而該鏈上的區塊時間各不相同。 信標鏈不需要解析工作量證明，而是在一個基於時間、由 32 個 12 秒「時隙」組成的時期系統上運作。在這個系統上，驗證者可以提出區塊。 這就是為什麼我們能準確知曉達到時期 74,240 以及 Altair 升級啟動的時間！

- [區塊時間](/developers/docs/blocks/#block-time)

---

### London 升級 {#london}

<NetworkUpgradeSummary name="london" />

#### 總結 {#london-summary}

London 升級引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，對交易費市場進行了改革，同時也對燃料費的退款處理方式和[冰河期](/glossary/#ice-age)日程進行了修改。

#### 什麼是 London 升級/EIP-1559？ {#eip-1559}

London 升級前，以太坊的區塊為固定大小。 當網路需求高時，這些區塊會滿載運作。 因此，使用者常需要等網路需求降低時，交易才會被添加進區塊，這導致了糟糕的使用者體驗。 London 升級將可變大小的區塊引入以太坊。

隨著 2021 年 8 月的 [London 升級](/history/#london)，以太坊網路上交易費的計算方式發生了變化。 在 London 升級之前，燃料費的計算不區分`基本費用`和`優先費`，如下：

假設 Alice 必須向 Bob 支付 1 以太幣。 在交易中，燃料限制是 21,000 單位，燃料價格為 200 gwei。

總費用將為：`Gas units (limit) * Gas price per unit` i.e `21,000 * 200 = 4,200,000 gwei` 或 0.0042 以太幣

London 升級中的 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 實作使交易費機制更加複雜，但也讓燃料費更加可預測，最終形成了更高效的交易費市場。 使用者可以透過 `maxFeePerGas` 提交交易，指明他們願意為要執行交易支付多少費用，並且使用者知道支付的費用不會超過燃料市價 (`baseFeePerGas`)，並且會得到任何剩餘費用（扣除小費）的退款。

解釋 EIP-1559 及其帶來的好處之影片：[EIP-1559 解釋](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [你是去中心化應用程式開發者嗎？ 記得要升級你的函式庫與工具。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [閱讀以太坊基金會公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [閱讀以太坊貓牧人組織的解釋](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="倫敦升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>改善交易費市場</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>從區塊傳回 <code>BASEFEE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>減少用於以太坊虛擬機器運作的燃料退款</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>防止部署以 <code>0xEF</code> 開頭的合約</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>將冰河期延遲至 2021 年 12 月</em></li>
</ul>

</ExpandableCard>

---

### 柏林升級 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 總結 {#berlin-summary}

柏林升級優化了某些以太坊虛擬機器動作的燃料成本，並增加了對多種交易類型的支援。

- [了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [了解更多關於Ethereum Cat Herder之解釋.](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="柏林升級以太坊改進提案" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>降低 ModExp 燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>更容易支援多種交易類型</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>增加狀態存取操作碼的燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>新增可選存取清單</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 年 {#2020}

### 信標鏈創世塊 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 總結 {#beacon-chain-genesis-summary}

[信標鏈](/roadmap/beacon-chain/)需要 16384 個存了 32 個質押以太幣的帳戶，以確保安全上線。 這發生於 2020 年 11 月 27 日，意味著信標鏈在 2020 年 12 月 1 日開始產生區塊。 這是實現[以太坊願景](/roadmap/vision/)的第一步，十分重要。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  信標鏈（Beacon Chain）
</DocLink>

---

### 部署質押存款合約 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 總結 {#deposit-contract-summary}

質押存款合約將[質押](/glossary/#staking)引入以太坊生態系統。 雖然是一個[主網](/glossary/#mainnet)合約，但它直接影響到[信標鏈](/roadmap/beacon-chain/)的發佈時間軸，而信標鏈是[以太坊升級](/roadmap/)的重要部分。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  質押
</DocLink>

---

### 繆爾冰川升級 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 總結 {#muir-glacier-summary}

繆爾冰川分叉使[難度炸彈](/glossary/#difficulty-bomb)推遲。 增加[工作量證明](/developers/docs/consensus-mechanisms/pow/)共識機制的區塊難度可能會增加發送交易和使用去中心化應用程式的等待時間，從而降低以太坊的可用性。

- [了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [了解更多關於Ethereum Cat Herder之解釋.](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="繆爾冰川升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>將難度炸彈再推遲 4,000,000 個區塊，或約 611 天。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 年 {#2019}

### 伊斯坦堡升級 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 總結 {#istanbul-summary}

伊斯坦堡分叉：

- 最佳化[以太坊虛擬機](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定動作的[燃料](/glossary/#gas)成本。
- 提高受到阻斷服務攻擊後的韌性。
- 使基於「簡潔非互動式知識論證」與「可擴充透明知識論證」的二層網路擴容解決方案具有更佳的效能。
- 使以太坊和 Zcash 能夠互通。
- 讓合約能夠引入更多創意功能。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="伊斯坦堡升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>允許以太幣與 Zcash 等受隱私保護的數位貨幣一起使用。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>以更低廉的加密技術改善<a href="/glossary/#gas">燃料</a>成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>透過新增 <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">操作碼</a>，保護以太坊免受重播攻擊。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>最佳化基於消耗量的操作碼燃料價格。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>降低了 CallData 的成本，從而允許更多資料放入區塊中 – 這對<a href="/developers/docs/scaling/#layer-2-scaling">二層網路擴容</a>很有幫助。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>其他操作碼的燃料價格變更。</em></li>
</ul>

</ExpandableCard>

---

### 君士坦丁堡升級 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 總結 {#constantinople-summary}

君士坦丁堡分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 3 以太幣減少至 2 以太幣。
- 確保在[實作權益證明](#beacon-chain-genesis)之前，區塊鏈不會凍結。
- 最佳化[以太坊虛擬機](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定動作的[燃料](/glossary/#gas)成本。
- 新增了與尚未建立的地址進行互動的能力。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="君士坦丁堡升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>最佳化特定鏈上操作的成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>讓你能夠與尚未建立的地址互動。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>引入 <code>EXTCODEHASH</code> 指令來擷取其他合約程式碼的雜湊值。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>確保在權益證明之前，區塊鏈不會凍結，並將區塊獎勵從 3 以太幣減少至 2 以太幣。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 年 {#2017}

### 拜占庭升級 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 總結 {#byzantium-summary}

拜占庭分叉：

- 將區塊[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)獎勵從 5 以太幣減少至 3 以太幣。
- 將[難度炸彈](/glossary/#difficulty-bomb)推遲一年。
- 新增了呼叫其他合約而不變更狀態的能力。
- 新增了某些加密方法，以實現[二層網路擴容](/developers/docs/scaling/#layer-2-scaling)。

[閱讀以太坊基金會公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="拜占庭升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>新增 <code>REVERT</code> 操作碼。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>在交易收據中新增了狀態欄位，以表示成功或失敗。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>為支援<a href="/developers/docs/scaling/zk-rollups/">零知識簡潔非互動式知識論證</a>新增橢圓曲線和純量乘法。</em></li>
  <li>使基於「簡潔非互動式知識論證」與「可擴容透明知識論證」的二層網路擴容解決方案具有更佳的效能。</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>啟用 RSA 簽名驗證。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>新增對可變長度傳回值的支援。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>新增 <code>STATICCALL</code> 作業碼，能夠呼叫其他合約而不變更狀態。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>變更難度調整公式。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>將<a href="/glossary/#difficulty-bomb">難度炸彈</a>延遲 1 年，並將區塊獎勵從 5 以太幣減至 3 以太幣。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 年 {#2016}

### Spurious Dragon（偽龍）升級 {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 總結 {#spurious-dragon-summary}

Spurious Dragon 分叉為對阻斷服務 (DoS) 攻擊（2016 年 9 月/10 月）的第二個回應，包括：

- 調整操作碼價格，以防網路未來再受攻擊。
- 啟用區塊鏈狀態的「區塊鏈減重」。
- 新增重播攻擊保護。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon 升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>防止在一條以太坊鏈上的交易被重複廣播到另一條鏈，例如測試網交易在以太坊主鏈上重播。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>調整 <code>EXP</code> 操作碼的價格 – 讓透過計算成本高昂的合約作業來降低網路速度變得更加困難。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>允許刪除透過阻斷服務攻擊產生的空帳戶。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>將區塊鏈上合約可達到的最大程式碼大小改為 24576 位元組。</em></li>
</ul>

</ExpandableCard>

---

### 橘子口哨升級 {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 總結 {#tangerine-whistle-summary}

橘子口哨分叉是對網路上阻斷服務 (DoS) 攻擊（2016 年 9 月/10 月）的第一個回應，包括：

- 解決與定價過低的操作程式碼有關的緊急網路健康問題。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="橘子口哨升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>增加可用於垃圾郵件攻擊的操作碼的燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>透過刪除大量空帳戶來減少狀態大小，這些空帳戶由於早期版本的以太坊協定中的缺陷而以非常低的成本置於狀態中。</em></li>
</ul>

</ExpandableCard>

---

### 去中心化自治組織分叉 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 總結 {#dao-fork-summary}

去中心化自治組織分叉是為了回應 [2016 去中心化自治組織攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack/)，當時一個不安全的[去中心化自治組織](/glossary/#dao)合約被駭客盜走了超過 360 萬個以太幣。 這個分叉將資金從有問題的合約轉移到一個新合約，新合約只有一個功能：提款。 任何損失了資金的人都可以在他們的錢包中提取以太幣，每 100 個去中心化自治組織代幣可以提取 1 個以太幣。

此行動由以太坊社群投票贊成. 所有以太幣持有者都能透過[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易進行投票。 此分叉決議獲得85%贊成.

一些礦工拒絕分叉，因為那次去中心化自治組織事件並不是協定中的缺陷。 其延續原始以太坊, 而其目前稱為[以太坊經典/Ethereum Classic](https://ethereumclassic.org/).

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### 家園升級 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 總結 {#homestead-summary}

家園分叉著眼於未來。 包括若干協定修改和網路變更，使以太坊能夠進一步進行網路升級。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="家園升級以太坊改進提案" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>對合約建立過程進行編輯。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新增操作碼：<code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>引入 devp2p 正向相容性要求</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 年 {#2015}

### 前沿解凍升級 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 總結 {#frontier-thawing-summary}

前沿解凍升級提高了每個[區塊](/glossary/#block) 5,000 單位[燃料](/glossary/#gas)的限制，並將預設燃料價格設為 51 [gwei](/glossary/#gwei)。 這樣便能進行交易 - 交易需要 21,000 單位燃料。 引入[難度炸彈](/glossary/#difficulty-bomb)是爲了保證未來硬分叉到[權益證明](/glossary/#pos)。

- [了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [閱讀以太坊協定更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### 前沿升級 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 總結 {#frontier-summary}

前沿升級是以太坊專案的已上線準系統實作。 該版本在奧利匹克測試階段成功完成之後推出。 它面向的是技術使用者，特別是開發者。 [區塊](/glossary/#block)有 5,000 單位的[燃料](/glossary/#gas)限制。 此「解凍」階段使礦工能夠開始作業，並使早期採用者能夠有足夠的時間來安裝用戶端。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 年 {#2014}

### 以太幣銷售 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

以太幣正式發售 42 天。 你可以使用比特幣購買以太幣。

[了解更多關於以太坊基金會的公告。](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 發佈黃皮書 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

黃皮書由 Gavin Wood 博士撰寫，介紹了以太坊協議之技術定義。

[檢視黃皮書](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 年 {#2013}

### 發佈白皮書 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

2015 年專案啟動之前，以太坊創辦人 Vitalik Buterin 於 2013 年發表了這篇介紹白皮書。

<DocLink href="/whitepaper/">
  白皮書
</DocLink>
