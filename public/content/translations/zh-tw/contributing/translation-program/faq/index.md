---
title: 翻譯 ethereum.org 指南
metaTitle: 翻譯計畫常見問題 (FAQ)
lang: zh-tw
description: 關於 ethereum.org 翻譯計畫的常見問題
---

如果您剛接觸翻譯計畫並對是否加入感到猶豫，這裡有一些常見問題可以幫助您開始。使用本指南尋找最常見問題的解答。

## 翻譯 ethereum.org 可以獲得報酬嗎？ {#compensation}

Ethereum.org 是一個開源網站，這意味著任何人都可以參與並做出貢獻。

ethereum.org 翻譯計畫是該理念的延伸，並以類似的哲學組織而成。

翻譯計畫的目標是讓所有人都能存取以太坊內容，無論他們使用何種語言。它也允許任何雙語人士參與以太坊生態系統，並以容易上手的方式做出貢獻。

基於這個原因，翻譯計畫是開放且自願的，參與該計畫不會獲得報酬。如果我們根據翻譯的字數向翻譯人員支付報酬，我們就只能邀請具有足夠翻譯經驗的人（專業翻譯人員）加入翻譯計畫。這將使翻譯計畫具有排他性，並阻礙我們實現既定目標，具體來說：讓每個人都能參與並融入生態系統。

我們盡一切努力讓我們的貢獻者在以太坊生態系統中取得成功；我們提供了許多非金錢的獎勵措施，例如：[提供 POAP](/contributing/translation-program/acknowledgements/#poap) 和[翻譯人員證書](/contributing/translation-program/acknowledgements/#certificate)，以及組織[翻譯排行榜](/contributing/translation-program/acknowledgements/)並[在網站上列出我們所有的翻譯人員](/contributing/translation-program/contributors/)。

## 我該如何翻譯帶有 `<HTML tags>` 的字串？ {#tags}

並非每個字串都是以純文字形式編寫的。有些字串包含混合語法，例如 HTML 標籤（`<0>`、`</0>`）。這通常用於句子中間的超連結或替代樣式。

- 翻譯標籤內的文字，但不要翻譯標籤本身。`<` 和 `>` 中的任何內容都不得翻譯或移除。
- 為了確保字串安全，我們建議您點擊左下角的「複製來源 (Copy Source)」按鈕。這將複製原始字串並將其貼到文字方塊中。這能讓您清楚標籤的位置，並幫助您避免犯錯。

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

您可以移動字串中標籤的位置，使其在您的語言中更自然——只需確保移動整個標籤即可。

有關處理標籤和程式碼片段的更深入資訊，請參閱 [ethereum.org 翻譯風格指南](/contributing/translation-program/translators-guide/#dealing-with-tags)。

## 這些字串在哪裡？ {#strings}

通常，僅靠來源字串可能不足以讓您提供準確的翻譯。

- 查看「螢幕截圖 (screenshots)」和「上下文 (context)」以獲取更多資訊。在來源字串部分，您會看到附加的螢幕截圖，這將向您展示我們如何在上下文中使用該字串。
- 如果您仍然不確定，請在「評論區 (comment section)」提出問題。[不知道如何留言？](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## 我該如何留言或提問？我想回報問題或錯字…… {#comment}

如果您想對需要注意的特定字串提出問題，請隨時提交評論。

- 點擊右上角列的第二個按鈕。隱藏的索引標籤將出現在您的右側。留下新評論並勾選底部的「問題 (Issue)」核取方塊。您可以從下拉式選單中選擇一個選項來指定問題的類型。
- 提交後，它將回報給我們的團隊。我們將修復該問題，並透過回覆您的評論和關閉問題來通知您。
- 如果您回報了不正確的翻譯，母語人士將在下次審查期間審查該翻譯和您建議的替代方案。

![Showing how to make comments and issues](./comment-issue.png)

## 什麼是翻譯記憶庫 (TM)？ {#translation-memory}

翻譯記憶庫 (TM) 是 Crowdin 的一項功能，它儲存了 ethereum.org 上所有先前翻譯過的字串。當一個字串被翻譯時，它會自動儲存到我們的專案 TM 中。這可能是一個幫助您節省時間的實用工具！

- 查看「TM 和 MT 建議 (TM and MT Suggestions)」部分，您將看到其他翻譯人員如何翻譯相同或相似的字串。如果您找到匹配率很高的建議，請隨時點擊它來參考該翻譯。
- 如果清單上沒有任何內容，您可以在 TM 中搜尋以前的翻譯並重複使用它們以保持一致性。

![A screenshot of the translation memory](./translation-memory.png)

## 我該如何使用 Crowdin 詞彙表？ {#glossary}

以太坊術語是我們翻譯工作的另一個關鍵部分，因為通常新的技術術語尚未在許多語言中在地化。此外，有些術語在不同的上下文中具有不同的含義。[更多關於翻譯以太坊術語的資訊](#terminology)

Crowdin 詞彙表是釐清術語和定義的最佳位置。有兩種方法可以參考詞彙表。

- 首先，當您在來源字串上找到帶有底線的術語時，您可以將滑鼠懸停在上面並查看其簡短定義。

![An example glossary definition](./glossary-definition.png)

- 其次，如果您看到一個您不熟悉但沒有底線的術語，您可以在詞彙表索引標籤（右欄的第三個按鈕）中搜尋。您將找到特定術語和專案中常用術語的解釋。

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- 如果您仍然找不到它，這就是您新增術語的機會！我們鼓勵您在搜尋引擎上尋找它，並將描述新增到詞彙表中。這將對其他翻譯人員更了解該術語有很大的幫助。

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### 術語翻譯政策 {#terminology}

_針對名稱（品牌、公司、人物）和新技術術語（信標鏈、分片鏈等）_

以太坊提出了許多最近創造的新術語。有些術語會因翻譯人員而異，因為在他們各自的語言中沒有官方翻譯。這種不一致可能會導致誤解並降低可讀性。

由於語言的多樣性和每種語言的不同標準化，幾乎不可能提出一個適用於所有支援語言的統一術語翻譯政策。

經過仔細考慮，我們決定將最常用的術語交由你們（翻譯人員）決定。

當您發現不熟悉的術語時，我們的建議如下：

- 參考[術語詞彙表](#glossary)，您可能會發現其他翻譯人員以前是如何翻譯它的。如果您認為以前翻譯的術語不合適，請隨時透過在 Crowdin 詞彙表中新增術語來恢復您的翻譯。
- 如果詞彙表中不存在此類先前的翻譯，我們鼓勵您在搜尋引擎或媒體文章中尋找，看看該術語在您的社群中實際是如何使用的。
- 如果您完全找不到任何參考資料，請相信您的直覺，並為您的語言建議一個新的翻譯！
- 如果您對此不太有信心，請保留該術語不翻譯。有時候，英文術語在傳達準確定義方面已經非常足夠。

我們建議您保留品牌、公司和人員的名稱不翻譯，因為翻譯可能會導致不必要的混淆和搜尋引擎最佳化 (SEO) 困難。

## 審查流程是如何運作的？ {#review-process}

為了確保我們翻譯的一定品質和一致性，我們與全球最大的語言服務供應商之一 [Acolad](https://www.acolad.com/) 合作。Acolad 擁有 20,000 名專業語言學家，這意味著他們可以為我們需要的每種語言和內容類型提供專業的審查人員。

審查流程非常簡單；一旦一組內容 100% 翻譯完成，我們就會要求對該內容區塊進行審查。審查流程直接在 Crowdin 中進行。審查完成後，我們將使用翻譯後的內容更新網站。

## 我該如何新增我的語言的內容？ {#adding-foreign-language-content}

目前，所有非英文內容都是直接從英文來源內容翻譯而來，任何不存在於英文的內容都無法新增到其他語言中。

若要為 ethereum.org 建議新內容，您可以在 GitHub 上[建立一個問題 (issue)](https://github.com/ethereum/ethereum-org-website/issues)。如果被採納，該內容將以英文編寫，並使用 Crowdin 翻譯成其他語言。

我們計畫在不久的將來增加對非英文內容新增的支援。

## 聯絡我們 {#contact}

感謝您閱讀完所有這些內容。我們希望這能幫助您加入我們的計畫。歡迎加入我們的 [Discord 翻譯頻道](https://discord.gg/ethereum-org)提問並與其他翻譯人員合作，或透過 translations@ethereum.org 聯絡我們！