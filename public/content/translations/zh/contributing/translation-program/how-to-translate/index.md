---
title: 如何翻译
lang: zh
description: 使用 Crowdin 翻译 ethereum.org 的说明
---

## 视频指南 {#visual-guide}

对于更喜欢通过视频学习的人，请观看 Luka 演示如何设置 Crowdin。或者，您也可以在下一节中找到相同步骤的文字说明。

<VideoWatch slug="crowdin-translation-guide" />

## 文字指南 {#written-guide}

### 在 Crowdin 上加入我们的项目 {#join-project}

您需要登录您的 Crowdin 账户，如果您还没有账户，请先注册。注册只需要一个电子邮件账户和密码。

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  加入项目
</ButtonLink>

### 打开您的语言 {#open-language}

登录 Crowdin 后，您将看到项目描述和所有可用语言的列表。
每种语言还包含有关可翻译字数总计的信息，以及特定语言中已翻译和已批准内容的概览。

打开您想要翻译成的语言，查看可供翻译的文件列表。

![List of languages in Crowdin](./list-of-languages.png)

### 寻找要翻译的文档 {#find-document}

网站内容分为多个文档和内容存储桶 (content buckets)。您可以在右侧查看每个文档的进度——如果翻译进度低于 100%，请贡献您的力量！

没有看到您使用的语言？[开启一个议题 (issue)](https://github.com/ethereum/ethereum-org-website/issues/new/choose) 或在我们的 [Discord](https://discord.gg/ethereum-org) 中提问

![Translated and untranslated files in Crowdin](./crowdin-files.png)

关于内容存储桶的说明：我们在 Crowdin 中使用“内容存储桶”来优先发布优先级最高的内容。当您查看一种语言时，例如[菲律宾语](https://crowdin.com/project/ethereum-org/fil#)，您会看到内容存储桶的文件夹（“1. Homepage”、“2. Essentials”、“3. Exploring”等）。

我们鼓励您按照此数字顺序（1 → 2 → 3 → ⋯）进行翻译，以确保首先翻译影响力最大的页面。

### 翻译 {#translate}

选择要翻译的文件后，它将在在线编辑器中打开。如果您以前从未使用过 Crowdin，可以使用本快速指南了解基础知识。

![Crowdin online editor](./online-editor.png)

**_1 – 左侧边栏_**

- 未翻译（红色）——尚未处理的文本。这些是您应该翻译的字符串。
- 已翻译（绿色）——已经翻译但尚未审核的文本。欢迎您提出其他翻译建议，或使用编辑器中的“+”和“-”按钮对现有翻译进行投票。
- 已批准（复选标记）——已经过审核且目前已在网站上线的文本。

您还可以使用顶部的按钮搜索特定字符串、按状态过滤或更改视图。

**_2 – 编辑区_**

主要翻译区域——源文本显示在顶部，如果可用，还会提供额外的上下文和屏幕截图。
要建议新的翻译，请在“在此处输入翻译 (Enter translation here)”字段中输入您的翻译，然后点击保存。

您还可以在此部分找到该字符串的现有翻译和其他语言的翻译，以及翻译记忆库匹配项和机器翻译建议。

**_3 – 右侧边栏_**

在这里您可以找到评论、翻译记忆库条目和词汇表条目。默认视图显示评论，并允许翻译人员进行交流、提出问题或报告不正确的翻译。

通过使用顶部的按钮，您还可以切换到翻译记忆库（您可以在其中搜索现有翻译），或切换到词汇表（其中包含关键术语的描述和标准翻译）。

想了解更多？欢迎查看[有关使用 Crowdin 在线编辑器的文档](https://support.crowdin.com/online-editor/)

### 审核流程 {#review-process}

完成翻译后（即内容存储桶的所有文件均显示 100%），我们的专业翻译服务将审核（并可能编辑）内容。审核完成后（即审核进度为 100%），我们会将其添加到网站中。

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  请勿使用机器翻译来翻译本项目。所有翻译在添加到网站之前都会经过审核。如果发现您建议的翻译是机器翻译的，它们将被驳回，并且经常使用机器翻译的贡献者将被移出项目。
</AlertContent>
</Alert>

### 联系我们 {#get-in-touch}

您有任何问题吗？或者想与我们的团队和其他翻译人员合作？请在我们的 [ethereum.org Discord 服务器](https://discord.gg/ethereum-org)的 #translations 频道中发帖

您也可以通过 translations@ethereum.org 联系我们

感谢您参与 ethereum.org 翻译计划！