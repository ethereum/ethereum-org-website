---
title: "质押即服务"
description: "了解质押即服务"
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "犀牛 Leslie 漂浮在云端。"
sidebarDepth: 2
summaryPoints:
  - 第三方节点运营商负责运行你的验证者客户端
  - 对于拥有 32 个 ETH 但不愿应对运行节点的技术复杂性的人来说，这是一个绝佳的选择
  - 减少信任假设，并保留对提款密钥的保管权
---

## 什么是质押即服务？ {#what-is-staking-as-a-service}

质押即服务（SaaS）代表一类质押服务，你为验证者存入自己的 32 个 ETH，但将节点操作委托给第三方运营商。这个过程通常包括在指导下完成初始设置（包括密钥生成和存款），然后将你的签名密钥上传给运营商。这使得该服务能够代表你运行验证者，通常需要支付月费。

## 为什么要使用服务进行质押？ {#why-stake-with-a-service}

[以太坊](/)协议原生不支持质押委托，因此这些服务的建立是为了满足这一需求。如果你有 32 个 ETH 用于质押，但不愿处理硬件问题，SaaS 服务允许你将困难的部分委托出去，同时赚取原生的区块奖励。

<Grid>
  <Card title="你自己的验证者" emoji=":desktop_computer:" description="存入你自己的 32 ETH 以激活你自己的签名密钥，这些密钥将参与以太坊共识。通过仪表板监控你的进度，看着那些 ETH 奖励不断累积。" />
  <Card title="易于上手" emoji="🏁" description="忘记硬件规格、设置、节点维护和升级吧。SaaS 提供商让你通过上传自己的签名凭证来外包困难的部分，允许他们代你运行验证者，只需支付少量费用。" />
  <Card title="降低你的风险" emoji=":shield:" description="在许多情况下，用户不必放弃对允许提款或转账质押资金的密钥的访问权限。这些密钥不同于签名密钥，可以分开存储，以限制（但不能消除）你作为质押者的风险。" />
</Grid>

<StakingComparison page="saas" />

## 注意事项 {#what-to-consider}

越来越多的 SaaS 提供商可以帮助你质押 ETH，但它们都有各自的优势和风险。与在家质押相比，所有 SaaS 选项都需要额外的信任假设。SaaS 选项可能包含包装以太坊客户端的额外代码，这些代码既不开源也无法审计。SaaS 也会对网络去中心化产生不利影响。根据设置的不同，你可能无法控制你的验证者——运营商可能会使用你的 ETH 进行不诚实的操作。

下面使用属性指标来标明列出的 SaaS 提供商可能具有的显著优势或劣势。在选择服务来帮助你进行质押之旅时，请将本节作为我们如何定义这些属性的参考。

<StakingConsiderations page="saas" />

## 探索质押服务提供商 {#saas-providers}

以下是一些可用的 SaaS 提供商。使用上述指标来帮助你了解这些服务。

<ProductDisclaimer />

### SaaS 提供商 {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

请注意支持[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因为它能提高网络的安全性并限制你的风险。有证据表明限制多数客户端使用的服务会标有<em style={{ textTransform: "uppercase" }}>“执行客户端多样性”</em>和<em style={{ textTransform: "uppercase" }}>“共识客户端多样性”</em>。

### 密钥生成器 {#key-generators}

<StakingProductsCardGrid category="keyGen" />

对我们遗漏的质押即服务提供商有建议吗？请查看我们的[产品上架政策](/contributing/adding-staking-products/)，看看它是否合适，并提交给我们进行审核。

## 常见问题 {#faq}

<ExpandableCard title="谁持有我的密钥？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
不同提供商的安排会有所不同，但通常你会在指导下设置所需的任何签名密钥（每 32 个 ETH 一个），并将这些密钥上传给你的提供商，以允许他们代表你进行验证。仅凭签名密钥无法提取、转账或花费你的资金。然而，它们确实提供了对共识进行投票的能力，如果操作不当，可能会导致离线惩罚或罚没。
</ExpandableCard>

<ExpandableCard title="所以有两套密钥？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
是的。每个账户都由 BLS <em>签名</em>密钥和 BLS <em>提款</em>密钥组成。为了让验证者能够证明链的状态、参与同步委员会并提议区块，验证者客户端必须能够随时访问签名密钥。这些密钥必须以某种形式连接到互联网，因此本质上被视为“热”密钥。这是你的验证者能够进行证明的要求，因此出于安全原因，用于转账或提取资金的密钥是分开的。

BLS 提款密钥用于签名一条一次性消息，该消息声明质押奖励和退出资金应流向哪个执行层账户。一旦广播了此消息，就不再需要 <em>BLS 提款</em>密钥了。相反，对提取资金的控制权将永久委托给你提供的地址。这允许你设置一个通过你自己的冷存储保护的提款地址，从而将验证者资金的风险降至最低，即使其他人控制了你的验证者签名密钥。

更新提款凭证是启用提款的必要步骤\*。此过程涉及使用你的助记词生成提款密钥。

<strong>请务必安全地备份此助记词，否则到时候你将无法生成提款密钥。</strong>

\*在初始存款时提供了提款地址的质押者不需要设置此项。请咨询你的 SaaS 提供商，以获取有关如何准备验证者的支持。
</ExpandableCard>

<ExpandableCard title="我什么时候可以提款？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
质押者需要提供一个提款地址（如果在初始存款时未提供），奖励支付将每隔几天定期自动开始分配。

验证者也可以作为验证者完全退出，这将解锁其剩余的 ETH 余额以供提款。已提供执行层提款地址并完成退出过程的账户，将在下一次验证者扫描期间将其全部余额接收到所提供的提款地址。

<ButtonLink href="/staking/withdrawals/">更多关于质押提款的信息</ButtonLink>
</ExpandableCard>

<ExpandableCard title="如果我被罚没会怎样？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
通过使用 SaaS 提供商，你将节点的运行委托给了其他人。这伴随着节点性能不佳的风险，而这不在你的控制范围内。如果你的验证者被罚没，你的验证者余额将受到惩罚，并被强制从验证者池中移除。

在完成罚没/退出过程后，这些资金将被转账到分配给该验证者的提款地址。这需要提供一个提款地址才能启用。这可能在初始存款时已经提供。如果没有，则需要使用验证者提款密钥来签名一条声明提款地址的消息。如果未提供提款地址，资金将保持锁定状态，直到提供为止。

请联系各个 SaaS 提供商，了解有关任何保证或保险选项的更多详细信息，以及有关如何提供提款地址的说明。如果你更希望完全控制你的验证者设置，请[了解更多关于如何单独质押你的 ETH 的信息](/staking/solo/)。
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊质押目录](https://www.staking.directory/) - _Eridian 与 Spacesider_
- [评估质押服务](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_