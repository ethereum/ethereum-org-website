---
title: 新增文章
description: 貢獻建構者文章至 ethereum.org 的指南
lang: zh-tw
---

## 發布建構者文章 {#publishing-a-builder-article}

建構者文章會顯示在 [ethereum.org/latest/](/latest/)，並在儲存庫中以 Markdown 檔案格式撰寫。這些是內部託管的長篇文章，涵蓋以太坊生態系統的概述與指南、開源技術領域，以及為建構者和研究人員提供的即時更新，主題包含協定升級、新工具模式、參考部署等。

### 上架政策 {#listing-policy}

Ethereum.org 是一個中立的教育資源。「最新」區塊的策展目的是：

- **教育**建構者與更廣泛的社群，讓他們了解以太坊技術、開源生態系統及最新發展
- **保持準確**的技術內容與參考資料
- **保持相關性**，符合以太坊建構者社群的需求

本網站不會列出主要用於推廣特定產品、代幣或商業服務的文章。所有提交的內容在發布前都會經過 ethereum.org 團隊的審核。

### 收錄標準 {#criteria-for-inclusion}

#### 必備條件 {#must-haves}

- **專注於以太坊與開源** - 文章必須主要探討以太坊、其協定、工具或建構者生態系統，或是支援它的開源與庇護所 (sanctuary) 技術。若內容為一般的區塊鏈或 Web3 主題，且未實質提及以太坊或其開源領域，將不予接受。
- **具備教育或領域價值** - 文章應教導建構者具體可行的操作（例如：如何使用新的 EIP、如何評估架構選擇、如何部署或貢獻開源基礎設施），或對以太坊的狀態及其周邊開源生態系統提供有意義的觀點。不接受針對特定產品、代幣或商業服務的推廣內容。
- **資訊準確** - 技術主張必須符合事實且為最新資訊。請盡可能引用 EIP、官方公告或鏈上數據。
- **原創作品** - 內容必須為原創或經授權使用。請參閱[抄襲政策](/contributing/#plagiarism)。
- **語言** - 文章可以使用任何[支援的語言](/contributing/translation-program/)提交。請設定 `lang` 欄位以符合文章撰寫的語言（例如：英文為 `en`，西班牙文為 `es`）。文章提交後，英文提交內容可翻譯為其他語言，非英文提交內容也可翻譯為英文。

#### 加分條件 {#nice-to-haves}

- **即時且長青** - 優先考慮在發布日期之後仍具實用價值的內容，而非純粹具時效性的素材。
- **作者可信度** - 來自資深建構者、研究人員或符合 CROPS 理念的貢獻者所撰寫的文章將獲優先考慮。
- **延伸閱讀** - 包含 `## Further reading` 區塊，提供相關 EIP、文件及主要來源的連結。

### 提案建構者文章 {#propose-a-builder-article}

如果您想為 ethereum.org 撰寫建構者文章且符合標準，請在 GitHub 上建立一個 issue。

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  建議文章
</ButtonLink>