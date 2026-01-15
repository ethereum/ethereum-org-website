---
title: 用于去中心化用户界面的 IPFS
description: 本教程将教读者如何使用 IPFS 来存储去中心化应用程序的用户界面。 尽管应用程序的数据和业务逻辑是去中心化的，但如果没有一个抗审查的用户界面，用户仍有可能失去对它的访问权限。
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: zh
published: 2024-06-29
---

你编写了一个令人难以置信的全新去中心化应用程序。 你甚至为它编写了一个[用户界面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。 但现在你担心有人会试图通过关闭你的用户界面来审查它，而这个界面只是云端的一台服务器。 在本教程中，你将学习如何通过将用户界面上传到 **[星际文件系统 (IPFS)](https://ipfs.tech/developers/)** 来避免审查，这样任何感兴趣的人都能够将其固定到服务器上以供将来访问。

你可以使用像 [Fleek](https://resources.fleek.xyz/docs/) 这样的第三方服务来完成所有工作。 本教程适用于那些即使需要更多工作也想充分了解自己在做什么的人。

## 在本地开始 {#getting-started-locally}

有多个[第三方 IPFS 提供商](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)，但最好从本地运行 IPFS 开始进行测试。

1. 安装 [IPFS 用户界面](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)。

2. 创建一个包含你的网站的目录。 如果你正在使用 [Vite](https://vite.dev/)，请使用此命令：

   ```sh
   pnpm vite build
   ```

3. 在 IPFS Desktop 中，点击**导入 > 文件夹**，然后选择上一步中创建的目录。

4. 选择你刚刚上传的文件夹，然后点击**重命名**。 给它一个更有意义的名称。

5. 再次选择它，然后点击**分享链接**。 将 URL 复制到剪贴板。 该链接将类似于 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。

6. 点击**状态**。 展开**高级**选项卡以查看网关地址。 例如，在我的系统上，地址是 `http://127.0.0.1:8080`。

7. 将链接步骤中的路径与网关地址结合起来，找到你的地址。 例如，对于上面的示例，URL 是 `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。 在浏览器中打开该 URL 以查看你的网站。

## 上传 {#uploading}

所以现在你可以使用 IPFS 在本地提供文件，这并不是很令人兴奋。 下一步是在你离线时让全世界都可以访问它们。

有许多知名的[固定服务](https://docs.ipfs.tech/concepts/persistence/#pinning-services)。 选择其中一个。 无论你使用哪种服务，都需要创建一个帐户，并向其提供 IPFS 桌面版中的**内容标识符 (CID)**。

就我个人而言，我发现 [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) 是最容易使用的。 以下是相关说明：

1. 浏览到[仪表板](https://dashboard.4everland.org/overview)并用你的钱包登录。

2. 在左侧边栏中，点击 **Storage > 4EVER Pin**。

3. 点击**上传 > 选定的 CID**。 为你的内容命名，并提供来自 IPFS 桌面版的 CID。 目前，CID 是一个以 `Qm` 开头的字符串，后面跟着 44 个字母和数字，代表一个 [base-58 编码的](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)哈希，例如 `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`，但[这很可能会改变](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1)。

4. 初始状态为**排队中**。 重新加载，直到它变为**已固定**。

5. 点击你的 CID 以获取链接。 你可以在[这里](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/)看到我的应用程序。

6. 你可能需要激活你的帐户，才能将其固定超过一个月。 帐户激活费用约为 1 美元。 如果你关闭了它，请注销并重新登录，系统会再次要求你激活。

## 从 IPFS 使用 {#using-from-ipfs}

此时，你拥有一个指向中心化网关的链接，该网关为你的 IPFS 内容提供服务。 简而言之，你的用户界面可能更安全一些，但仍然不具备抗审查能力。 要实现真正的抗审查能力，用户需要[直接从浏览器](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites)使用 IPFS。

一旦你安装了它（并且桌面版 IPFS 正常工作），你可以在任何网站上访问 [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)，你将以去中心化的方式获得该内容。

## 缺点 {#drawbacks}

你无法可靠地删除 IPFS 文件，因此，只要你在修改用户界面，最好要么保持其中心化，要么使用[星际名称系统 (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)，这是一个在 IPFS 之上提供可变性的系统。 当然，任何可变的东西都可能被审查，就 IPNS 而言，可以通过向持有其对应私钥的人施压来实现。

此外，某些软件包与 IPFS 存在兼容性问题，因此如果你的网站非常复杂，这可能不是一个好的解决方案。 当然，任何依赖于服务器集成的东西都不能仅仅通过将客户端放在 IPFS 上来实现去中心化。

## 结论 {#conclusion}

正如以太坊让你能够将去中心化应用程序的数据库和业务逻辑方面去中心化一样，IPFS 也能让你将用户界面去中心化。 这可以让你关闭针对你的去中心化应用程序的又一个攻击向量。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
