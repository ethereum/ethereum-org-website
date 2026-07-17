---
title: 如何翻譯
lang: zh-tw
description: 使用 Crowdin 翻譯 ethereum.org 的說明
---

## 視覺指南 {#visual-guide}

對於偏好視覺學習的人，可以觀看 Luka 示範如何設定 Crowdin。或者，您也可以在下一節找到相同步驟的文字說明。

<VideoWatch slug="crowdin-translation-guide" />

## 文字指南 {#written-guide}

### 加入我們在 Crowdin 上的專案 {#join-project}

您需要登入您的 Crowdin 帳戶，如果您還沒有帳戶，請先註冊。註冊只需要電子郵件帳戶和密碼。

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  加入專案
</ButtonLink>

### 開啟您的語言 {#open-language}

登入 Crowdin 後，您會看到專案描述以及所有可用語言的清單。
每種語言還包含可翻譯字數總計的資訊，以及特定語言中已翻譯和已核准內容的概覽。

開啟您想要翻譯的語言，以查看可供翻譯的檔案清單。

![List of languages in Crowdin](./list-of-languages.png)

### 尋找要翻譯的文件 {#find-document}

網站內容分為多個文件和內容儲存區 (content buckets)。您可以在右側查看每個文件的進度，如果翻譯進度低於 100%，歡迎您貢獻心力！

沒有看到您的語言嗎？請[建立 Issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) 或在我們的 [Discord](https://discord.gg/ethereum-org) 中詢問。

![Translated and untranslated files in Crowdin](./crowdin-files.png)

關於內容儲存區的注意事項：我們在 Crowdin 中使用「內容儲存區」來優先發布最重要內容。當您查看某種語言時，例如[菲律賓語](https://crowdin.com/project/ethereum-org/fil#)，您會看到內容儲存區的資料夾（「1. Homepage」、「2. Essentials」、「3. Exploring」等）。

我們鼓勵您按照此數字順序（1 → 2 → 3 → ⋯）進行翻譯，以確保優先翻譯影響力最大的頁面。

### 翻譯 {#translate}

選擇您要翻譯的檔案後，它會在線上編輯器中開啟。如果您以前從未使用過 Crowdin，可以使用這份快速指南來了解基本操作。

![Crowdin online editor](./online-editor.png)

**_1 – 左側邊欄_**

- 未翻譯（紅色）– 尚未處理的文字。這些是您應該翻譯的字串。
- 已翻譯（綠色）– 已經翻譯但尚未審查的文字。歡迎您提供其他翻譯建議，或使用編輯器中的「+」和「-」按鈕對現有翻譯進行投票。
- 已核准（打勾標記）– 已經過審查且目前已在網站上線的文字。

您也可以使用頂部的按鈕來搜尋特定字串、依狀態篩選或變更檢視畫面。

**_2 – 編輯區_**

主要翻譯區域 – 來源文字顯示在頂部，如果有額外的上下文和螢幕截圖，也會一併顯示。
若要建議新的翻譯，請在「Enter translation here」欄位中輸入您的翻譯，然後點擊儲存。

您也可以在此區塊找到該字串的現有翻譯和其他語言的翻譯，以及翻譯記憶庫的相符結果和機器翻譯建議。

**_3 – 右側邊欄_**

您可以在這裡找到留言、翻譯記憶庫條目和詞彙表條目。預設檢視畫面會顯示留言，並允許翻譯人員進行交流、提出問題或回報錯誤的翻譯。

透過使用頂部的按鈕，您也可以切換到翻譯記憶庫（您可以在其中搜尋現有的翻譯），或切換到詞彙表（其中包含關鍵術語的描述和標準翻譯）。

想了解更多嗎？歡迎查看[使用 Crowdin 線上編輯器的文件](https://support.crowdin.com/online-editor/)

### 審查流程 {#review-process}

當您完成翻譯後（即某個內容儲存區的所有檔案皆顯示 100%），我們的專業翻譯服務團隊將會審查（並可能編輯）該內容。審查完成後（即審查進度為 100%），我們就會將其新增至網站。

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  請勿使用機器翻譯來翻譯專案。所有翻譯在新增至網站之前都會經過審查。如果發現您建議的翻譯是機器翻譯，它們將會被拒絕，且經常使用機器翻譯的貢獻者將會從專案中移除。
</AlertContent>
</Alert>

### 聯絡我們 {#get-in-touch}

您有任何問題嗎？或者想與我們的團隊和其他翻譯人員合作？請在我們的 [ethereum.org Discord 伺服器](https://discord.gg/ethereum-org)的 #translations 頻道中發文。

您也可以透過 translations@ethereum.org 聯絡我們。

感謝您參與 ethereum.org 翻譯計畫！