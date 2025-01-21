---
title: 如何翻译
lang: zh
description: 使用 Crowdin 翻译 ethereum.org 的操作指南
---

# 如何翻译 {#how-to-translate}

## 视频指南 {#visual-guide}

更喜欢视频学习的人员请观看 Luka 演示如何设置 Crowdin。 或者，你可以在下一节找到书面形式的相同步骤。

<YouTube id="Ii7bYhanLs4" />

## 书面指南 {#written-guide}

### 在 Crowdin 中参与我们的项目 {#join-project}

需要登录你的 Crowdin 帐户，如果还没有 Crowdin 帐户，你需要注册一个。 只需要提供电子邮件帐户和密码即可注册。

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  参与项目
</ButtonLink>

### 选择语言 {#open-language}

登录 Crowdin 后，你会看见项目描述和所有可用语言的列表。 每种语言还包含关于可翻译总字数的信息，并提供了特定语言中有多少内容已经翻译并获得批准的概况。

打开你想要翻译的目标语言，查看可翻译的文件列表。

![Crowdin 中的语言列表](./list-of-languages.png)

### 查找要翻译的文件 {#find-document}

网站内容分为多个文档和内容存储桶。 可以在右边查看每个文档的进度 - 如果翻译进度低于 100%，请贡献你的力量！

找不到你的语言？ [创建一个问题](https://github.com/ethereum/ethereum-org-website/issues/new/choose)或者在 [Discord](/discord/) 中联系我们。

![Crowdin 中已翻译和未翻译的文件](./crowdin-files.png)

关于内容存储桶的说明：我们使用 Crowdin 中的“内容存储桶”功能最先发布最高优先级内容。 当你查看一种语言时（例如[菲律宾语](https://crowdin.com/project/ethereum-org/fil#)），会看到内容存储桶对应的文件夹，例如（“1. 首页”、“2. 基础知识”、“3. 探究”等）。

我们建议按照数字顺序进行翻译 (1 → 2 → 3 → ⋯)，以保证影响最大的页面最先得到翻译。

[了解关于 ethereum.org 内容存储桶的更多信息](/contributing/translation-program/content-buckets/)

### 翻译 {#translate}

当你选择想翻译的文件后，文件将在在线编辑器内打开。 如果你从未使用过 Crowdin，你可以通过这个快速指南来了解基础知识。

![Crowdin 在线编辑器](./online-editor.png)

**_1 - 左侧边栏_**

- 未翻译（红色）– 尚未翻译的文本。 这些是你应该翻译的文本。
- 已翻译（绿色）– 已翻译但尚未审核的文本。 欢迎你提出其他翻译建议，或使用编辑器中的“+”和“-”按钮对现有翻译投票。
- 已核准（勾号）– 已审核并且目前已经在网站上展示的文本。

你也可以使用顶部的按钮搜索特定文本，按状态筛选或更改视图。

**_2 – 编辑区域_**

主要翻译区域 – 源文本显示在顶部，还有更多上下文和屏幕截图（如果有）。 要添加新翻译，请在“Enter translation here”字段中输入你的翻译，然后点击“Save”。

还可以在此区域找到现有文本翻译和其他语言的翻译，以及翻译记忆库的匹配项和机器翻译建议。

**_3 – 右侧边栏_**

可以在这里找到评论、翻译记忆库和词汇表条目。 默认视图会显示评论，允许翻译人员相互交流、提出问题或报告错误翻译。

通过使用上面的按钮，你还可以切换到翻译记忆库，在其中搜索现有翻译，或者切换到词汇表，其中包含关键术语的描述和标准翻译。

想了解更多信息？ 可随时查看[关于使用 Crowdin 在线编辑器的文档](https://support.crowdin.com/online-editor/)

### 审核过程 {#review-process}

一旦你完成翻译（即内容存储桶的所有文件均显示 100%），我们的专业翻译服务机构将审核（并可能编辑）你完成的内容。 一旦审核完成（即审核进度为 100%），我们会将内容添加到网站上。

<InfoBanner shouldCenter emoji=":warning:">
  请不要使用机器翻译来翻译项目。 所有译文在添加到网站之前均会进行审核。 如果发现你提供的译文是机器翻译的，你的译文将不会被应用，经常使用机器翻译的贡献者将被从项目中移除。
</InfoBanner>

### 联系我们 {#get-in-touch}

还有其他问题吗？ 或者想与我们的团队和其他翻译人员合作？ 请在我们的 [ethereum.org Discord 服务器](/discord/)的 #translations 频道中发帖

也可以通过向 translations@ethereum.org 发送邮件联系我们

感谢你参与 ethereum.org 翻译计划！
