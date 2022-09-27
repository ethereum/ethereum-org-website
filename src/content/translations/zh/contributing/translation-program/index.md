---
title: 翻译计划
lang: zh
description: 如何为 ethereum.org 的翻译计划贡献力量
---

# 翻译计划 {#translation-program}

翻译计划是一项将 ethereum.org 翻译成不同语言的协同工作计划，方便全球数十亿非英语人士更容易访问网站。

我们迄今取得的进展：

- [超过 **3,600** 名翻译者参与](/contributing/translation-program/contributors/)
- [网站支持 **46** 种语言](/languages/)
- [2021 年翻译了超过 **290** 万字](/contributing/translation-program/acknowledgements/)
- [2022 年到目前为止已翻译 **150 万**单词](/contributing/translation-program/acknowledgements/)

如果您想参与其中并帮助我们通过将网站翻译成您的语言来发展全球以太坊社区，请遵循下面的步骤！

<InfoBanner emoji=":tada:">
  查看我们的<Link to="/contributing/translation-program/acknowledgements/">致谢翻译人员</Link>页面，{" "}
然后领取您的 POAP 代币。 如果您在 2022 年翻译了 ethereum.org，我们会给您发放一枚独特的 POAP 徽章。{" "}
<Link to="/contributing/translation-program/acknowledgements/#poap">有关 POAP 徽章的详细信息</Link>
</InfoBanner>

## 使命和愿景 {#mission-and-vision}

以太坊社区旨在成为全球化和包容性的社区，但其大部分内容仅面向英语使用者，而忽略了全球 60 亿非英语使用者。 为了使 ethereum.org 成为全球社区进入以太坊的门户，我们认为很有必要为非英语国家人士按母语提供以太坊内容。

Ethereum.org 翻译计划旨在通过将 Ethereum.org 和其他以太坊内容翻译成尽可能多的语言，让所有人都能参与以太坊。

**我们的使命**

- 提供网站的翻译版本，支持世界各地的访问者通过母语了解以太坊
- 促进更多成员加入全球以太坊社区
- 允许以更易获得和更具包容性的方式分享以太坊的信息和知识
- 支持社区成员为以太坊贡献翻译，并在生态系统中留下自己的痕迹
- 寻找、联系希望参与生态系统的热情贡献者，并为其提供指导

**我们的愿景**

- 为来自世界上尽可能多的国家/地区的以太坊社区成员翻译基本内容
- 支持跨语言的知识共享，创建一个信息灵通、受过更好教育的以太坊社区
- 通过消除非英语人士加入生态系统的语言障碍，提高以太坊的包容性和可访问性

## 如何翻译 {#how-to-translate}

<InfoBanner shouldCenter emoji=":light_bulb:">
  我们建议您查看一下《ethereum.org 翻译风格指南》。 该指南包含一些最重要的准则、说明和翻译技巧，帮助翻译人员对网站进行本地化。
  {" "}<Link to="/contributing/translation-program/translators-guide/">查看翻译风格指南</Link>
</InfoBanner>

### 视觉指南 {#visual-guide}

更喜欢视频学习的人员请观看 Luka 演示如何设置 Crowdin。 或者，您可以在下一节找到以书面形式列出的相同步骤。

<YouTube id="Ii7bYhanLs4" />

### 书面指南 {#written-guide}

1. **[加入我们的 Crowdin 项目](https://crowdin.com/project/ethereum-org/invite)**  
   您需要登录 Crowdin 帐户，如果没有帐户，请注册。 只需要提供电子邮件帐户和密码。

2. **打开您想要翻译的语言并找到一个文档进行翻译**  
   网站内容被分成若干个文档和内容存储桶。 您可以在右边查看每份文档的进度 - 如果翻译进度低于 100%，请贡献您的力量！

   找不到您的语言列表？ [创建一个提议](https://github.com/ethereum/ethereum-org-website/issues/new/choose)或者在 [Discord](https://discord.gg/6WX7E97) 中联系我们。

   ![Crowdin 上已翻译和未翻译的文件](./crowdin-files.png)

   关于内容存储桶的说明：我们使用 Crowdin 中的“内容存储桶”功能来先发布最高优先级内容。 当您查看一种语言时（例如[菲律宾语](https://crowdin.com/project/ethereum-org/fil#)），您会看到内容存储桶对应的文件夹，例如（“1. 主页”，“2. 使用以太坊页面”，等等）。

   我们建议您按照数字顺序来进行翻译 (1 → 2 → 3 → ⋯)，以保证影响最大的页面优先得到翻译。

   [了解 ethereum.org 内容存储桶的更多信息](/contributing/translation-program/content-buckets/)

3. **翻译**  
   选择您要翻译的文件后，随即在线编辑器中打开。 如果您从未使用过 Crowdin，您可以通过这个快速指南来了解基础知识。

   ![Crowdin 在线编辑器](./online-editor.png)

   **_1 - 左侧边栏_**

   - 未翻译（红色）- 尚未翻译的文本。 这些是您应该翻译的文本。
   - 已翻译（绿色）- 已翻译但尚未审核的文本。 欢迎您提出其他翻译建议，或使用编辑器中的'“+'”和“-”按钮对现有翻译投票。
   - 已核准（勾号）- 已审核并且目前已经在网站上展示的文本。

   您也可以使用顶部的按钮搜索特定文本，按状态筛选或更改视图。

   **_2 - 编辑区域_**

   主要翻译区域 - 源文本显示在顶部，还有更多上下文和屏幕截图（如果有）。 要添加新翻译，请在“Enter translation here”字段中输入您的翻译，然后点击“Save”。

   您还可以在此部分找到现有文本翻译和其他语言的翻译，以及翻译记忆库的匹配和机器翻译建议。

   **_3 - 右侧边栏_**

   您可以在这里找到评论、翻译记忆库和词汇表条目。 默认视图会显示评论，允许翻译人员相互交流、提出问题或报告错误翻译。

   通过使用上面的按钮，您还可以切换到翻译记忆库，在其中搜索现有翻译，或者切换到词汇表，其中包含关键术语的描述和标准翻译。

   想了解更多信息？ 可随时查看文档：[关于使用 Crowdin 在线编辑器](https://support.crowdin.com/online-editor/)。

4. **审核过程**  
   一旦完成翻译（即一个内容存储桶的所有文件均显示 100%），将由我们的专业翻译服务提供者审核（并有可能编辑）内容。 一旦审核完成（即审核进度为 100%），我们会将其添加到网站上。

<InfoBanner shouldCenter emoji=":warning:">
  请不要使用机器翻译来翻译项目。 所有译文在被添加到网站之前均会进行审核。 如果您提供的译文被发现是机器翻译的，译文将不会被应用，经常使用机器翻译的贡献者将被从项目中移除。
</InfoBanner>

还有其他问题？ 或者想与我们的团队和其他翻译人员合作？ 请在我们的 [ethereum.org Discord 服务器的](https://discord.gg/6WX7E97) #translations 频道中发布

您也可以通过向 translations@ethereum.org 发送邮件联系我们

感谢您参与 ethereum.org 翻译计划！

**翻译人员官方互动时间**

每个月的第二个星期三是翻译人员的官方互动时间。 互动会在 [ethereum.org Discord](https://discord.gg/geKhWjtF) 上的 #office-hours 频道举行，您也可以在那里查看确切的举行时间和其他详细信息。

官方互动的目的是让我们的翻译人员有机会提出有关翻译过程的问题、对计划提供反馈、分享他们的想法，或者只是跟我们聊聊天。 参与者还可以了解有关翻译计划的更多信息，并获得有关如何成为 ethereum.org 翻译人员的一些信息。 最后，我们希望通过这些电话会议传达翻译计划取得的最新进展，并与我们的贡献者分享重要的技巧和说明。

如果您是 ethereum.org 翻译人员或想要成其中一员，欢迎加入我们这些会议中的任何一场。

<InfoBanner shouldCenter emoji=":information_source:">
  如果您在帮助我们进行翻译，您可能会在翻译常见问题中找到一些实用信息。
  {" "}<Link to="/contributing/translation-program/faq/">有关翻译 ethereum.org 的常见问题</Link>
</InfoBanner>

## 资源 {#resources}

### 指南 {#guides}

- [翻译风格指南](/contributing/translation-program/translators-guide/) _– 适用于 ethereum.org 翻译者的说明和技巧_
- [翻译常见问题](/contributing/translation-program/faq/) _– 有关 ethereum.org 翻译计划的一些常见问题_
- [Crowdin 在线编辑指南](https://support.crowdin.com/online-editor/) _- 使用 Crowdin 在线编辑器和 Crowdin 一些高级功能的深入指南_
- [内容存储桶](/contributing/translation-program/content-buckets/) _– ethereum.org 的每个内容存储桶中包含哪些页面_

### 工具 {#tools}

- [Microsoft 语言门户](https://www.microsoft.com/en-us/language) _- 对于查找和核对技术术语标准翻译非常有用_
- [Linguee](https://www.linguee.com/)。 _– 翻译和字典搜索引擎，可按词或短语搜索_
- [Proz 术语搜索](https://www.proz.com/search/)。 _– 专业术语的翻译字典和词汇表数据库_。
- [Eurotermbank](https://www.eurotermbank.com/) _ – 42 种语言的欧洲术语集_

### 社区 {#communities}

- [特定语言的 Discord 翻译组](https://discord.gg/6WX7E97)。 _- 让 ethereum.org 翻译人员与 Discord 翻译组建立联系的举措_
- [中文翻译组](https://www.notion.so/Ethereum-org-05375fe0a94c4214acaf90f42ba40171) _– 方便中文翻译人员之间协作的 Notion 页面_

### 内容存储桶概述 {#content-buckets-overview}

- [内容存储桶](/contributing/translation-program/content-buckets/) _– ethereum.org 的每个内容存储桶中包含哪些页面_

### 最近更新 {#latest-updates}

要了解翻译计划的最新进展，您可以关注[以太坊基金会博客](https://blog.ethereum.org/)：

- [2021 年 10 月里程碑更新](https://blog.ethereum.org/2021/10/04/translation-program-update/)
- [2020 年 12 月里程碑更新](https://blog.ethereum.org/2020/12/21/translation-program-milestones-updates-20/)
- [2020 年 7 月里程碑更新](https://blog.ethereum.org/2020/07/29/ethdotorg-translation-milestone/)
- [2019 年 8 月翻译计划启动](https://blog.ethereum.org/2019/08/20/translating-ethereum-for-our-global-community/)

## 以太坊质押启动板翻译 {#staking-launchpad}

我们的翻译社区也在进行[质押启动板](https://launchpad.ethereum.org/en/)的翻译工作。 这使得任何人都可以成为以太坊验证者，并帮助保护以太坊网络。 启动板目前支持 17 种语言。

如果您感兴趣，[请加入 Crowdin 的以太坊质押启动板翻译项目](https://crowdin.com/project/ethereum-staking-launchpad)。 如果 Crowdin 未提供您的语言，您可以在 GitHub 上[创建一个提议](https://github.com/ethereum/staking-launchpad/issues/new)，请求增加新语言。

## 开始您自己的翻译计划 {#starting-a-translation-program}

我们致力于将以太坊内容翻译成尽可能多的语言，并向所有人提供教育内容。 我们对翻译很重视，希望帮助其他以太坊项目组织、管理和改进他们自己的翻译工作。

出于这个原因，我们制作了一本[翻译计划手册](/contributing/translation-program/playbook/)，其中包含我们在翻译 ethereum.org 的过程中获得的一些技巧和最佳实践。

想要进一步合作或使用我们的一些翻译资源？ 对手册有任何反馈意见？ 我们很乐意通过 translations@ethereum.org 收到您的来信。
