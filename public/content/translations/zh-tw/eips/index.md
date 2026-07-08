---
title: 以太坊改善提案 (EIP) 簡介
metaTitle: 以太坊改善提案 (EIP)
description: 了解 EIP 所需的基本資訊
lang: zh-tw
---

## 什麼是 EIP？ {#what-are-eips}

[以太坊改善提案 (EIP)](https://eips.ethereum.org/) 是為以太坊指定潛在新功能或流程的標準。EIP 包含擬議變更的技術規範，並作為社群的「事實來源」。[以太坊](/)的網路升級和應用程式標準都是透過 EIP 流程進行討論和開發的。

以太坊社群內的任何人都可以建立 EIP。編寫 EIP 的指南包含在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中。EIP 主要應提供簡潔的技術規範以及少量的動機說明。EIP 作者負責在社群內達成共識並記錄替代意見。由於提交格式良好的 EIP 的技術門檻很高，從歷史上看，大多數 EIP 作者通常是應用程式或協定開發人員。

## 為什麼 EIP 很重要？ {#why-do-eips-matter}

EIP 在以太坊上如何發生變更以及如何記錄變更方面扮演著核心角色。它們是人們提出、辯論和採用變更的方式。有[不同類型的 EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)，包括針對影響共識並要求網路升級的底層協定變更的核心 EIP（例如 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)），以及針對應用程式標準的 ERC（例如 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 和 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)）。

每次網路升級都包含一組需要由網路上每個[以太坊用戶端](/learn/#clients-and-nodes)實作的 EIP。這意味著，為了與以太坊主網上的其他用戶端保持共識，用戶端開發人員需要確保他們都實作了要求的 EIP。

除了為變更提供技術規範外，EIP 也是以太坊治理發生的核心單位：任何人都可以自由提出提案，然後社群中的各個利害關係人將進行辯論，以決定是否應將其採納為標準或包含在網路升級中。因為非核心 EIP 不必被所有應用程式採用（例如，可以建立一個不實作 EIP-20 的同質化代幣），但核心 EIP 必須被廣泛採用（因為所有節點都必須升級才能繼續作為同一個網路的一部分），所以核心 EIP 需要比非核心 EIP 在社群內達成更廣泛的共識。

## EIP 的歷史 {#history-of-eips}

[以太坊改善提案 (EIP) GitHub 儲存庫](https://github.com/ethereum/EIPs)建立於 2015 年 10 月。EIP 流程基於[比特幣改善提案 (BIP)](https://github.com/bitcoin/bips) 流程，而後者本身又基於[Python 增強提案 (PEP)](https://www.python.org/dev/peps/) 流程。

EIP 編輯的任務是審查 EIP 的技術合理性、格式問題，並糾正拼寫、文法和程式碼風格。Martin Becze、維塔利克·布特林、加文·伍德以及其他幾位是 2015 年至 2016 年底的最初 EIP 編輯。

目前的 EIP 編輯有：

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

名譽 EIP 編輯有：

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- 維塔利克·布特林 (@vbuterin)

如果您想成為 EIP 編輯，請查看 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)。

EIP 編輯決定提案何時準備好成為 EIP，並協助 EIP 作者推進他們的提案。[Ethereum Cat Herders](https://www.ethereumcatherders.com/) 協助組織 EIP 編輯與社群之間的會議（請參閱 [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)）。

完整的標準化流程以及圖表在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中有詳細說明。

## 了解更多 {#learn-more}

如果您有興趣閱讀更多關於 EIP 的資訊，請查看 [EIP 網站](https://eips.ethereum.org/)和 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)。以下是一些實用的連結：

- [所有以太坊改善提案的清單](https://eips.ethereum.org/all)
- [所有 EIP 類型的說明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [所有 EIP 狀態的說明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 社群教育專案 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP 是一個教育影片系列，探討以太坊改善提案 (EIP) 以及即將到來的升級的關鍵功能。*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf 提供以太坊改善提案 (EIP) 的額外資訊，包括其狀態、實作細節、相關的拉取請求以及社群回饋。* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun 提供關於以太坊改善提案 (EIP) 的最新消息、EIP 會議的更新等資訊。*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight 根據從不同資源收集的資訊，呈現以太坊改善提案 (EIP) 流程的狀態與統計數據。*

## 參與 {#participate}

任何人都可以建立 EIP。在提交提案之前，必須閱讀 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)，其中概述了 EIP 流程以及如何編寫 EIP，並在 [Ethereum Magicians](https://ethereum-magicians.org/) 上徵求回饋，在提交草案之前，提案會先在該處與社群進行討論。

## 參考文獻 {#references}

<cite class="citation">

頁面內容部分取自 Hudson Jameson 的 [以太坊協定開發治理與網路升級協調](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)

</cite>