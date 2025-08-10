---
title: 如何翻譯
lang: zh-tw
description: 使用 Crowdin 翻譯 ethereum.org 的說明
---

# 如何翻譯 {#how-to-translate}

## 影片指南 {#visual-guide}

對於喜歡從影片學習者，請觀看 Luka 演示逐步完成設定 Crowdin。 此外，你可以在下一節的書面格式中找到相同步驟。

<YouTube id="Ii7bYhanLs4" />

## 書寫指南 {#written-guide}

### 在 Crowdin 中加入我們的專案 {#join-project}

你需要登入 Crowdin 帳戶，如果你還沒有則請註冊帳戶。 只需要電子郵件帳戶和密碼便可註冊。

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  參與專案
</ButtonLink>

### 選擇語言 {#open-language}

登入 Crowdin 後，你將看到專案描述和所有可用語言的清單。 每種語言還包含有關可翻譯單字總數的資訊，以及特定語言已翻譯和核准的內容數量的概述。

打開你要翻譯的語言，查看可進行翻譯的檔案清單。

![Crowdin 的語言列表](./list-of-languages.png)

### 尋找要翻譯的文件 {#find-document}

網站內容分為許多文件和內容門類。 你可以在右邊查看每份文件的進度—如果翻譯進程低過100%，請你不吝作出貢獻吧！

找不到你的語言？ [開啟一個議題](https://github.com/ethereum/ethereum-org-website/issues/new/choose) 或在我們的 [Discord](/discord/) 頻道內提問。

![Crowdin 中已翻譯和未翻譯的檔案](./crowdin-files.png)

關於內容門類的說明：我們在 Crowdin 內用「內容門類」來先釋出最高優先順序的內容。 當你查看一種語言時，例如，[菲律賓語](https://crowdin.com/project/ethereum-org/fil#) ，你將會看見「內容門類」的一些文件夾（「1. Homepage」、「2. Essentials」、「3. Exploring」等）。

我們建議你按照數字順序來翻譯 (1 → 2 → 3 → ⋯)，以確保影響力最大的頁面最先翻譯。

[瞭解有關 ethereum.org 內容門類的更多資訊](/contributing/translation-program/content-buckets/)

### 翻譯 {#translate}

當你選擇想翻譯的檔案後，它將在線上編輯器內開啟。 如果你從未使用過 Crowdin，可使用這份快速指南來瞭解基礎知識。

![Crowdin 線上編輯器](./online-editor.png)

**_1 — 左側邊欄_**

- 未翻譯（紅色）— 尚未翻譯的文字。 這些是你應該翻譯的語句。
- 翻譯完成（綠色）— 已翻譯但尚未審核的文字。 歡迎你提出其他翻譯建議，或使用加號「+」和減號「-」按鈕在編輯器內對現有翻譯投票。
- 已核准（核取記號）— 已審核並且已經在網站上使用的文字。

你也可以使用頂部的按鈕來搜尋一些特定字串，透過狀態篩選或變更視圖。

**_2 — 編輯區域_**

主要的翻譯區域 — 原文顯示在頂部，如果有的話，還有上下文和螢幕擷取畫面可提供。 要提議新翻譯，請在「Enter translation here」欄位輸入你的翻譯並按一下「Save」。

你還可以在此區段找到語句的現有翻譯和其他語言的翻譯、翻譯記憶匹配項和機器翻譯建議。

**_3 — 右側邊欄_**

在這裡你可以找到評論、翻譯記憶和詞彙表條目。 預設視圖會顯示評論，讓譯者能夠互相溝通，提出問題或報告錯誤的翻譯。

透過使用頂部的按鈕，你還可以切換到翻譯記憶。在那裡，你可以搜尋現有的翻譯，或者切換到「詞彙表」，其中包含關鍵術語的描述和標準翻譯。

想瞭解更多嗎？ 請隨時查看[有關使用 Crowdin 線上編輯器的文件](https://support.crowdin.com/online-editor/)

### 審核過程 {#review-process}

一旦你已經完成了翻譯（即內容門類中的所有檔案都顯示為 100%），我們的專業翻譯服務將會審核（並可能會編輯）這些內容。 一旦審核完成（如：審核進度為 100%），我們將把內容新增到網站上。

<InfoBanner shouldCenter emoji=":warning:">
  請不要使用機器翻譯來翻譯這個專案。 所有翻譯將會在新增到網站之前進行審核。 如果你建議的翻譯被發現是機器翻譯的，它們將不被考慮採用，而經常使用機器翻譯的貢獻者將從專案中被移除。
</InfoBanner>

### 聯絡我們 {#get-in-touch}

還有其他問題嗎？ 或是想要跟我們的團隊和其他譯者合作？ 請在我們的 [ethereum.org Discord 伺服器](/discord/)的 #translations 頻道中發布帖子

也可以透過 translations@ethereum.org 聯絡我們

感謝你參與 ethereum.org 翻譯計劃！
