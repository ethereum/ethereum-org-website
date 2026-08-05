---
title: "新增影片"
description: "在 ethereum.org 新增影片的政策"
lang: zh-tw
---

# 新增影片 {#adding-videos}

[ethereum.org 影片庫](/videos/)收錄了來自社群創作者與可信來源中，關於以太坊與以太坊生態系的影片。任何人都可以建議新增影片。

## 上架政策 {#listing-policy}

Ethereum.org 是一個中立的教育資源。影片庫的策展目的是：

- <strong>教育</strong>使用者了解以太坊技術、生態系與社群
- <strong>保持準確</strong>的技術內容
- **保持相關性**，與以太坊社群緊密連結

本網站不會上架主要用於推廣特定產品、代幣或商業服務的影片。


## 收錄標準 {#criteria-for-inclusion}

### 必備條件 {#must-haves}

- **以太坊為重點** – 影片必須主要關於以太坊、其技術、生態系或社群。只有在實質上支援或關聯到網站上的教育頁面，或提及以太坊時，才接受關於一般區塊鏈主題的影片。
- **教育價值** – 影片應教導觀眾關於以太坊的知識，或讚揚全球以太坊社群。不接受宣傳或行銷內容。
- **資訊準確** – 技術內容必須符合事實且為最新資訊。關於已棄用功能的過時影片可能會被移除。
- **製作水準** – 影片應具備合理清晰的音訊與畫質。
- **公開可用** – 影片必須託管在開放資源或如 YouTube 等可存取的平台上，且可免費觀看，無付費牆或註冊要求。

### 加分條件 {#nice-to-haves}

- **附有逐字稿** – 附有逐字稿的影片能改善無障礙體驗與搜尋引擎最佳化 (SEO)。如果你沒有逐字稿，ethereum.org 團隊可以協助產生。
- **來自可信來源** – 來自知名教育工作者、研究人員與來源的內容將獲優先考慮。
- **具時效性與長青** – 隨著時間推移仍具相關性的內容，優於具時效限制的素材。


## 如何新增影片 {#how-to-add-a-video}

### 選項 1：建立 Issue {#open-an-issue}

如果你想建議一部影片，但不希望自己建立檔案，請建立一個包含影片詳細資訊的 GitHub issue，貢獻者會協助你新增。

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  建議影片
</ButtonLink>

### 選項 2：建立拉取請求 (Pull Request) {#open-a-pull-request}

如果你想自己新增影片，請遵循以下步驟：

#### 步驟 1：建立影片檔案 {#step-1}

在以下路徑建立一個新目錄與 `index.md` 檔案：

```
public/content/videos/{your-video-slug}/index.md
```

代稱 (slug) 應為 URL 安全、小寫，並使用連字號（例如：`blockchain-101-visual-demo`）。

#### 步驟 2：新增 Frontmatter {#step-2}

將以下 YAML frontmatter 新增至你的 `index.md` 中：

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**欄位參考：**

| 欄位 | 必填 | 描述 |
|---|---|---|
| `title` | 是 | 影片標題 |
| `description` | 是 | 1–3 句的摘要 |
| `lang` | 是 | 目前一律為 `en` |
| `youtubeId` | 是 | YouTube 影片 ID（來自 URL 中 `v=` 之後的部分） |
| `uploadDate` | 是 | 原始上傳日期，格式為 `YYYY-MM-DD` |
| `duration` | 是 | 影片長度，格式為 `H:MM:SS` 或 `M:SS` |
| `educationLevel` | 是 | `beginner`、`intermediate` 或 `advanced` |
| `topic` | 是 | 用於影片庫篩選的主題標籤陣列 |
| `format` | 是 | `explainer`、`presentation`、`interview`、`tutorial` 或 `panel` |
| `author` | 是 | 創作者或頻道名稱 |
| `breadcrumb` | 否 | 用於導覽列 (breadcrumb) 的自訂簡短標籤 |
| `customThumbnailUrl` | 否 | 自訂縮圖 URL（預設為 YouTube 縮圖） |

#### 步驟 3：新增逐字稿（建議） {#step-3}

在 frontmatter 的 `---` 下方，以 markdown 格式新增影片逐字稿：

```markdown
---
title: "..."
# ... 其餘的 frontmatter
---

影片內容的簡短介紹。

### 段落標題 (0:00)

此段落的逐字稿文字...

### 下一個段落 (5:30)

更多逐字稿文字...
```

使用帶有時間戳記的 `###` 標題來標示主要段落。這能讓逐字稿易於瀏覽並改善 SEO。

如果你沒有逐字稿，可以將內文留空，團隊會協助產生。

#### 步驟 5：提交你的 PR {#step-5}

將你的變更建立一個拉取請求 (Pull Request) 到 `dev` 分支。團隊將會審查你的提交並提供回饋。


## 維護 {#maintenance}

已上架的影片會定期接受審查，以確保它們：

- 仍符合上架標準
- 包含準確、最新的資訊
- 具有可正常運作的託管/YouTube 連結

如果你發現已上架的影片有問題，請[建立一個 issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) 或發送電子郵件至 [website@ethereum.org](mailto:website@ethereum.org)。


## 使用條款 {#terms-of-use}

請參閱 ethereum.org 的[使用條款](/terms-of-use/)。ethereum.org 上的資訊僅供一般參考之用。
