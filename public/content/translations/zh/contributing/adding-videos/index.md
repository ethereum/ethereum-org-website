---
title: "添加视频"
description: "ethereum.org 视频添加政策"
lang: zh
---

# 添加视频 {#adding-videos}

[ethereum.org 视频库](/videos/)收录了来自社区创作者和受信任来源的关于以太坊及以太坊生态系统的视频。任何人都可以建议添加视频。

## 收录政策 {#listing-policy}

Ethereum.org 是一个中立的教育资源。视频库的策划旨在：

- <strong>教育</strong>用户了解以太坊技术、生态系统和社区
- <strong>保持</strong>技术内容的准确性
- <strong>保持</strong>与以太坊社区的相关性

本网站不收录主要用于推广特定产品、代币或商业服务的视频。


## 收录标准 {#criteria-for-inclusion}

### 必备条件 {#must-haves}

- **以太坊为中心** – 视频必须主要关于以太坊及其技术、生态系统或社区。只有当关于一般区块链主题的视频实质性地支持或关联本网站的教育页面，或提及以太坊时，才可被接受。
- **教育价值** – 视频应向观众传授有关以太坊的知识，或赞颂全球以太坊社区。不接受宣传或营销内容。
- **信息准确** – 技术内容必须符合事实且是最新的。关于已弃用功能的过时视频可能会被移除。
- **制作精良** – 视频应具有相当清晰的音质和画质。
- **公开可用** – 视频必须托管在开放资源或可访问的平台（如 YouTube）上，并且可以免费访问，没有付费墙或注册要求。

### 加分条件 {#nice-to-haves}

- **附带文字稿** – 带有文字稿的视频可提高无障碍访问性和搜索引擎优化 (SEO)。如果你没有文字稿，ethereum.org 团队可以协助生成。
- **来源可靠** – 来自知名教育工作者、研究人员和可靠来源的内容将获优先考虑。
- **及时且长青** – 随着时间推移仍保持相关性的内容优先于时效性强的内容。


## 如何添加视频 {#how-to-add-a-video}

### 选项 1：开启议题 (Issue) {#open-an-issue}

如果你想建议添加一个视频，但不想自己创建文件，请开启一个包含视频详细信息的 GitHub 议题 (Issue)，贡献者可以协助你添加。

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  建议添加视频
</ButtonLink>

### 选项 2：开启拉取请求 (Pull request) {#open-a-pull-request}

如果你想自己添加视频，请遵循以下步骤：

#### 第 1 步：创建视频文件 {#step-1}

在以下位置创建一个新目录和 `index.md` 文件：

```
public/content/videos/{your-video-slug}/index.md
```

别名 (slug) 必须是 URL 安全的、小写字母，并使用连字符（例如，`blockchain-101-visual-demo`）。

#### 第 2 步：添加前言 (Frontmatter) {#step-2}

将以下 YAML 前言添加到你的 `index.md` 文件中：

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

**字段参考：**

| 字段 | 是否必填 | 描述 |
|---|---|---|
| `title` | 是 | 视频标题 |
| `description` | 是 | 1-3 句话的摘要 |
| `lang` | 是 | 目前始终为 `en` |
| `youtubeId` | 是 | YouTube 视频 ID（来自 URL 中 `v=` 之后的部分） |
| `uploadDate` | 是 | 原始上传日期，格式为 `YYYY-MM-DD` |
| `duration` | 是 | 视频长度，格式为 `H:MM:SS` 或 `M:SS` |
| `educationLevel` | 是 | `beginner`、`intermediate` 或 `advanced` |
| `topic` | 是 | 用于视频库过滤的主题标签数组 |
| `format` | 是 | `explainer`、`presentation`、`interview`、`tutorial` 或 `panel` |
| `author` | 是 | 创作者或频道名称 |
| `breadcrumb` | 否 | 用于面包屑导航的自定义简短标签 |
| `customThumbnailUrl` | 否 | 自定义缩略图 URL（默认为 YouTube 缩略图） |

#### 第 3 步：添加文字稿（推荐） {#step-3}

在前言 `---` 下方，以 Markdown 格式添加视频文字稿：

```markdown
---
title: "..."
# ... 其余前言内容
---

视频内容的简短介绍。

### 章节标题 (0:00)

本节的文字稿内容...

### 下一章节 (5:30)

更多文字稿内容...
```

使用带有时间戳的 `###` 标题来标记主要章节。这使得文字稿易于浏览并能改善 SEO。

如果你没有文字稿，可以将正文留空，团队会生成一份。

#### 第 4 步：选择主题标签
从下面的列表中选择主题标签。每个标签直接映射到视频库中的一个过滤类别——请完全按照显示的标签名称使用。

一个视频可以有多个标签，以出现在多个视频库过滤器中：

| 标签 | 视频库过滤器 |
|---|---|
| `how-ethereum-works` | 以太坊如何运作 |
| `network-upgrades` | 网络升级 |
| `roadmap-and-priorities` | 路线图与优先级 |
| `scaling-and-layer-2` | 扩容与二层网络 (l2) |
| `use-cases` | 用例 |
| `privacy` | 隐私 |
| `security` | 安全 |
| `community-stories` | 社区故事 |
| `events` | 活动 |

每个视频都应至少包含此列表中的一个标签。没有可识别标签的视频将仅出现在“全部”视图和搜索结果中。

`community-stories` 标签还会使视频出现在[故事页面](/stories/)上。
#### 第 5 步：提交你的拉取请求 (PR) {#step-5}

开启一个拉取请求，将你的更改提交到 `dev` 分支。团队将审核你的提交并提供反馈。


## 维护 {#maintenance}

我们会定期审查已收录的视频，以确保它们：

- 仍然符合收录标准
- 包含准确、最新的信息
- 具有有效的托管/YouTube 链接

如果你发现已收录的视频存在问题，请[开启一个议题](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml)或发送电子邮件至 [website@ethereum.org](mailto:website@ethereum.org)。


## 使用条款 {#terms-of-use}

请参阅 ethereum.org 的[使用条款](/terms-of-use/)。ethereum.org 上的信息仅供一般参考之用。
