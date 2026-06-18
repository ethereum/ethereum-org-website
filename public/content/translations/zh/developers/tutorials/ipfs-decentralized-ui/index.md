---
title: 用于去中心化用户界面的 IPFS
description: 本教程向读者介绍如何使用 IPFS 存储去中心化应用 (dapp) 的用户界面。尽管应用的数据和业务逻辑是去中心化的，但如果没有抗审查的用户界面，用户仍然可能失去对它的访问权限。
author: 奥里·波梅兰茨
tags:
  - ipfs
  - dapps
  - 前端
skill: beginner
breadcrumb: 用于 dapp UI 的 IPFS
lang: zh
published: 2024-06-29
---

你编写了一个出色的全新去中心化应用 (dapp)。你甚至为它编写了[用户界面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。但现在你担心有人会试图通过关闭你的用户界面（它只是云端的一台服务器）来审查它。在本教程中，你将学习如何通过将用户界面部署到**[星际文件系统 (IPFS)](https://ipfs.tech/developers/)** 上来避免审查，这样任何感兴趣的人都可以将其固定在服务器上以供将来访问。

你可以使用像 [Fleek](https://resources.fleek.xyz/docs/) 这样的第三方服务来完成所有工作。本教程面向那些希望通过亲自动手来充分理解其工作原理的人，即使这需要做更多的工作。

## 在本地开始 {#getting-started-locally}

有多个[第三方 IPFS 提供商](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)，但最好从在本地运行 IPFS 进行测试开始。

1. 安装 [IPFS 用户界面](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)。

2. 创建一个包含你网站的目录。如果你使用的是 [Vite](https://vite.dev/)，请使用以下命令：

   ```sh
   pnpm vite build
   ```

3. 在 IPFS Desktop 中，点击 **Import > Folder**（导入 > 文件夹），然后选择你在上一步中创建的目录。

4. 选择你刚刚上传的文件夹，然后点击 **Rename**（重命名）。给它起一个更有意义的名字。

5. 再次选择它并点击 **Share link**（分享链接）。将 URL 复制到剪贴板。该链接类似于 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。

6. 点击 **Status**（状态）。展开 **Advanced**（高级）选项卡以查看网关地址。例如，在我的系统上，该地址是 `http://127.0.0.1:8080`。

7. 将链接步骤中的路径与网关地址结合起来，找到你的地址。例如，对于上面的示例，URL 是 `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`。在浏览器中打开该 URL 即可查看你的网站。

## 上传 {#uploading}

现在你可以使用 IPFS 在本地提供文件服务了，但这并不怎么令人兴奋。下一步是让你在离线时，全世界也能访问这些文件。

有许多知名的[固定服务](https://docs.ipfs.tech/concepts/persistence/#pinning-services)。选择其中一个。无论你使用哪种服务，你都需要创建一个账户，并向其提供 IPFS Desktop 中的**内容标识符 (CID)**。

就我个人而言，我发现 [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) 是最容易使用的。以下是它的使用说明：

1. 浏览至[仪表板](https://dashboard.4everland.org/overview)并使用你的钱包登录。

2. 在左侧边栏中点击 **Storage > 4EVER Pin**。

3. 点击 **Upload > Selected CID**。为你的内容命名，并提供来自 IPFS Desktop 的 CID。目前，CID 是一个以 `Qm` 开头的字符串，后跟 44 个字母和数字，代表一个[经过 base-58 编码的](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)哈希，例如 `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`，但[这很可能会发生变化](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1)。

4. 初始状态为 **Queued**（排队中）。重新加载页面，直到它变为 **Pinned**（已固定）。

5. 点击你的 CID 以获取链接。你可以[在这里](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/)查看我的应用。

6. 你可能需要激活你的账户才能将其固定超过一个月。账户激活费用约为 1 美元。如果你关闭了激活提示，请退出并重新登录，系统会再次要求你激活。

## 从 IPFS 使用 {#using-from-ipfs}

此时，你拥有了一个指向提供 IPFS 内容的中心化网关的链接。简而言之，你的用户界面可能更安全了一些，但它仍然不具备抗审查性。为了实现真正的抗审查，用户需要[直接从浏览器](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites)使用 IPFS。

一旦你安装了它（并且桌面版 IPFS 正在运行），你就可以在任何网站上访问 [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)，你将以去中心化的方式获取该内容。

## 缺点 {#drawbacks}

你无法可靠地删除 IPFS 文件，因此只要你还在修改用户界面，最好还是保持其中心化，或者使用[星际名称系统 (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)，这是一个在 IPFS 之上提供可变性的系统。当然，任何可变的东西都可能被审查，在 IPNS 的情况下，可以通过向持有对应私钥的人施压来实现。

此外，一些包在 IPFS 上存在问题，因此如果你的网站非常复杂，这可能不是一个好的解决方案。当然，任何依赖服务器集成的应用都不能仅仅通过将客户端放在 IPFS 上来实现去中心化。

## 通过 ENS 提高可发现性 {#discoverability}

如果你将一个 ENS 名称（如 vitalik.eth）指向你的网站，它将被视为一个完全去中心化的网页，并会被 [dweb3.wtf](https://dweb3.wtf) 服务自动固定，同时可以通过 [web3compass.net](https://web3compass.net) 搜索引擎进行搜索，就像 DuckDuckGo、Brave Search 或 Google 对传统网络所做的那样。

## 结论 {#conclusion}

正如以太坊让你能够去中心化 dapp 的数据库和业务逻辑方面一样，IPFS 让你能够去中心化用户界面。这让你能够切断针对你 dapp 的又一个攻击向量。

[在这里查看我的更多作品](https://cryptodocguy.pro/)。