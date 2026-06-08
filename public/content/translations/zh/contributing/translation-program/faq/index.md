---
title: 翻译 ethereum.org 指南
metaTitle: 翻译项目常见问题解答 (FAQ)
lang: zh
description: 关于 ethereum.org 翻译项目的常见问题解答
---

如果你是翻译项目的新手并且对加入犹豫不决，这里有一些常见问题解答可以帮助你开始。使用本指南查找最常见问题的答案。

## 翻译 ethereum.org 可以获得报酬吗？ {#compensation}

Ethereum.org 是一个开源网站，这意味着任何人都可以参与并做出贡献。

ethereum.org 翻译项目是该理念的延伸，并以类似的理念组织。

翻译项目的目标是让所有人都能访问以太坊内容，无论他们使用何种语言。它还允许任何双语人士参与以太坊生态系统，并以一种无障碍的方式做出贡献。

出于这个原因，翻译项目是开放和自愿的，参与没有报酬。如果我们根据翻译的字数向译者支付报酬，我们将只能邀请那些具有足够翻译经验的人（专业译者）加入翻译项目。这将使翻译项目具有排他性，并阻碍我们实现既定目标，即：让每个人都能参与并融入生态系统。

我们尽一切努力使我们的贡献者在以太坊生态系统中取得成功；我们提供了许多非金钱激励措施，例如：[提供 POAP](/contributing/translation-program/acknowledgements/#poap) 和[译者证书](/contributing/translation-program/acknowledgements/#certificate)，以及组织[翻译排行榜](/contributing/translation-program/acknowledgements/)并[在网站上列出我们所有的译者](/contributing/translation-program/contributors/)。

## 如何翻译带有 `<HTML tags>` 的字符串？ {#tags}

并非每个字符串都是以纯文本形式编写的。有些字符串由混合脚本组成，例如 HTML 标签（`<0>`、`</0>`）。这通常用于句子中间的超链接或替代样式。

- 翻译标签内的文本，但不要翻译标签本身。`<` 和 `>` 中的任何内容都不得翻译或删除。
- 为了保证字符串的安全，我们建议你点击左下角的“复制源文本 (Copy Source)”按钮。这将复制原始字符串并将其粘贴到文本框中。这可以让你清楚标签的位置，并帮助你避免错误。

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

你可以移动字符串中标签的位置，使其在你的语言中更自然——只需确保移动整个标签即可。

有关处理标签和代码片段的更深入信息，请参阅 [ethereum.org 翻译风格指南](/contributing/translation-program/translators-guide/#dealing-with-tags)。

## 字符串位于何处？ {#strings}

通常，仅靠源字符串可能不足以让你提供准确的翻译。

- 查看“屏幕截图 (screenshots)”和“上下文 (context)”以获取更多信息。在源字符串部分，你将看到附加的屏幕截图，它将向你展示我们在上下文中如何使用该字符串。
- 如果你仍然不确定，请在“评论区 (comment section)”中提出问题。[不知道如何发表评论？](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## 我该如何发表评论或提出问题？我想标记一个问题或错别字…… {#comment}

如果你想对需要注意的特定字符串提出问题，请随时提交评论。

- 点击右上角栏的第二个按钮。隐藏的选项卡将出现在你的右侧。留下新评论并勾选底部的“问题 (Issue)”复选框。你可以通过从下拉菜单中选择一个选项来指定问题的类型。
- 提交后，它将被报告给我们的团队。我们将修复该问题，并通过回复你的评论和关闭该问题来通知你。
- 如果你报告了不正确的翻译，母语人士将在下一次审校期间审查该翻译和你建议的替代方案。

![Showing how to make comments and issues](./comment-issue.png)

## 什么是翻译记忆库 (TM)？ {#translation-memory}

翻译记忆库 (TM) 是 Crowdin 的一项功能，它存储了 ethereum.org 上所有以前翻译过的字符串。当一个字符串被翻译时，它会自动保存到我们的项目 TM 中。这可能是一个帮助你节省时间的有用工具！

- 查看“TM 和 MT 建议 (TM and MT Suggestions)”部分，你将看到其他译者如何翻译相同或相似的字符串。如果你找到匹配率很高的建议，请随时点击它以参考该翻译。
- 如果列表中没有任何内容，你可以在 TM 中搜索以前的翻译并重复使用它们以保持一致性。

![A screenshot of the translation memory](./translation-memory.png)

## 如何使用 Crowdin 术语表？ {#glossary}

以太坊术语是我们翻译工作的另一个关键部分，因为通常新的技术术语尚未在许多语言中本地化。此外，有些术语在不同的上下文中具有不同的含义。[关于翻译以太坊术语的更多信息](#terminology)

Crowdin 术语表是澄清术语和定义的最佳位置。有两种方法可以参考术语表。

- 首先，当你在源字符串上找到带下划线的术语时，你可以将鼠标悬停在上面并查看其简短定义。

![An example glossary definition](./glossary-definition.png)

- 其次，如果你看到一个你不熟悉但没有下划线的术语，你可以在术语表选项卡（右侧列的第三个按钮）中搜索。你将找到特定术语和项目中常用术语的解释。

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- 如果你仍然找不到它，这就是你添加新术语的机会！我们鼓励你在搜索引擎上查找它，并将描述添加到术语表中。这将对其他译者更好地理解该术语有很大帮助。

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### 术语翻译政策 {#terminology}

_对于名称（品牌、公司、人物）和新技术术语（信标链、分片链等）_

以太坊提出了许多最近创造的新术语。有些术语会因译者而异，因为在他们各自的语言中没有官方翻译。这种不一致会导致误解并降低可读性。

由于语言的多样性和每种语言的不同标准化，几乎不可能提出一种适用于所有支持语言的统一术语翻译政策。

经过仔细考虑，我们决定将最常用的术语留给你们，即译者来决定。

当你发现一个你不熟悉的术语时，我们的建议如下：

- 参考[术语表](#glossary)，你可能会发现其他译者以前是如何翻译它的。如果你认为以前翻译的术语不合适，请随时通过向 Crowdin 术语表添加新术语来恢复你的翻译。
- 如果术语表中不存在以前的翻译，我们鼓励你在搜索引擎或媒体文章中查找，看看该术语在你的社区中是如何实际使用的。
- 如果你根本找不到任何参考资料，请相信你的直觉，并建议一个适合你语言的新翻译！
- 如果你对此不太自信，请保留该术语不翻译。有时，英语术语足以提供准确的定义。

我们建议你保留品牌、公司和人员的名称不翻译，因为翻译可能会导致不必要的混淆和 SEO 困难。

## 审校流程是如何运作的？ {#review-process}

为了确保我们翻译的一定质量和一致性，我们与全球最大的语言服务提供商之一 [Acolad](https://www.acolad.com/) 合作。Acolad 拥有 20,000 名专业语言学家，这意味着他们可以为我们需要的每种语言和内容类型提供专业的审校人员。

审校流程非常简单；一旦一组内容被 100% 翻译，我们就会为该内容块订购审校服务。审校流程直接在 Crowdin 中进行。审校完成后，我们将使用翻译后的内容更新网站。

## 如何添加我所用语言的内容？ {#adding-foreign-language-content}

目前，所有非英语内容都是直接从英语源内容翻译而来的，任何不存在于英语中的内容都不能添加到其他语言中。

要为 ethereum.org 建议新内容，你可以在 GitHub 上[创建一个问题 (issue)](https://github.com/ethereum/ethereum-org-website/issues)。如果被添加，该内容将用英语编写，并使用 Crowdin 翻译成其他语言。

我们计划在不久的将来增加对添加非英语内容的支持。

## 联系我们 {#contact}

感谢你阅读完所有这些内容。我们希望这能帮助你加入我们的项目。欢迎加入我们的 [Discord 翻译频道](https://discord.gg/ethereum-org)提问并与其他译者合作，或者通过 translations@ethereum.org 联系我们！