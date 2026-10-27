---
title: "如何在钱包中查看你的 NFT（NFT 教程系列第 3/3 部分）"
description: "本教程介绍如何在梅塔马斯克上查看现有的 NFT！"
author: "苏米·穆吉尔"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "在钱包中查看 NFT"
lang: zh
published: 2021-04-22
---

本教程是非同质化代币 (NFT) 教程系列的第 3/3 部分，我们将在此查看新铸造的 NFT。不过，你可以将本通用教程用于任何使用梅塔马斯克的 ERC-721 代币，包括在主网或任何测试网上。如果你想了解如何在以太坊上铸造自己的 NFT，请查看[第 1 部分：如何编写和部署 NFT 智能合约](/developers/tutorials/how-to-write-and-deploy-an-nft)！

恭喜！你已经来到了我们 NFT 教程系列中最短、最简单的部分——如何在虚拟钱包中查看你刚刚铸造的 NFT。在本例中，我们将使用梅塔马斯克，因为它是我们在前两部分中使用的工具。

作为前提条件，你应该已经安装了梅塔马斯克（浏览器扩展程序或移动应用），并且其中应包含你铸造 NFT 时使用的账户。你可以从[梅塔马斯克下载页面](https://metamask.io/download)免费获取梅塔马斯克。

## 第 1 步：将你的网络设置为 Sepolia {#set-network-to-sepolia}

由于我们的非同质化代币 (NFT) 是在 Sepolia 测试网上铸造的，你需要选择 Sepolia 作为你的网络。梅塔马斯克默认隐藏测试网，因此请先将它们开启：

1. 打开右上角的菜单，然后选择“Networks”（网络）。
2. 向下滚动到网络列表底部，然后开启“Show test networks”（显示测试网）。
3. 从网络列表中选择“Sepolia”。

如果你的梅塔马斯克版本中的菜单看起来不同，请参阅[梅塔马斯克关于查看测试网的指南](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)。

## 第 2 步：将你的收藏品添加到梅塔马斯克 {#add-nft-to-metamask}

梅塔马斯克仅在某些网络（不包括 Sepolia）上自动检测非同质化代币 (NFT)，因此你需要手动导入你的 NFT。为此，你需要 NFT 智能合约地址和你的 NFT 的 ERC-721 代币 ID——你应该能够根据我们在教程第二部分中铸造 NFT 时的交易哈希在 Etherscan 上找到它们。如果你使用了第 1 部分中的合约，你的第一个 NFT 的代币 ID 为 1。

![如何找到你的交易哈希和 ERC-721 代币 ID](./findNFTEtherscan.png)

然后，在梅塔马斯克（扩展程序或移动端）中：

1. 转到主屏幕的“NFTs”部分，然后选择“Import NFT”（导入 NFT）。
2. 选择 Sepolia 作为网络，并将你的 NFT 智能合约地址粘贴到“Address”（地址）框中。
3. 将你的代币 ID 输入“Token ID”（代币 ID）框，然后选择“Import”（导入）。

你可能需要刷新几次才能查看到你的 NFT——但它一定会在那里 <Emoji text="😄" size={1} />！如果梅塔马斯克提示你不是该 NFT 的所有者，请检查你是否选择了铸造该 NFT 时使用的账户。如需更多帮助，请参阅[梅塔马斯克的 NFT 指南](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/)。

恭喜！你已成功铸造了一个 NFT，现在你可以查看它了！我们迫不及待地想看到你将如何在 NFT 世界中大展身手！
