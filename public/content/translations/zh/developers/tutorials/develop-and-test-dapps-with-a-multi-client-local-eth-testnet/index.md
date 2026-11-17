---
title: "如何在本地多客户端测试网上开发和测试去中心化应用 (dapp)"
description: "本指南将首先引导你如何实例化和配置一个多客户端本地以太坊测试网，然后再使用该测试网部署和测试去中心化应用 (dapp)。"
author: "特迪·米蒂库"
tags:
  - 客户端
  - 节点
  - 智能合约
  - 可组合性
  - 共识层
  - 执行层
  - 测试
skill: intermediate
breadcrumb: "多客户端测试网"
lang: zh
published: 2023-04-11
---

## 简介 {#introduction}

本指南将引导你完成实例化可配置的本地以太坊测试网、向其部署智能合约以及使用该测试网对你的去中心化应用 (dapp) 运行测试的过程。本指南专为希望在部署到实时测试网或主网之前，在本地针对不同网络配置开发和测试其 dapp 的 dapp 开发者而设计。

在本指南中，你将：

- 使用 [Kurtosis](https://www.kurtosis.com/) 通过 [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) 实例化一个本地以太坊测试网，
- 将你的 Hardhat dapp 开发环境连接到本地测试网，以编译、部署和测试 dapp，以及
- 配置本地测试网，包括节点数量和特定的执行层 (EL)/共识层 (CL) 客户端配对等参数，以支持针对各种网络配置的开发和测试工作流。

### 什么是 Kurtosis？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) 是一个可组合的构建系统，专为配置多容器测试环境而设计。它特别使开发者能够创建需要动态设置逻辑的可重现环境，例如区块链测试网。

在本指南中，由 [ethPandaOps](https://ethpandaops.io/) 维护的 Kurtosis `ethereum-package` 将启动一个本地以太坊测试网。它支持所有主要的执行层 (EL) 客户端（如 [`geth`](https://geth.ethereum.org/)）和共识层 (CL) 客户端（如 [`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/) 和 [`lodestar`](https://lodestar.chainsafe.io/)）。该包可作为 Hardhat Network 和 Anvil 等框架中网络的可配置且可组合的替代方案。Kurtosis 为开发者提供了对其所用测试网的更大控制权和灵活性，这也是以太坊客户端团队使用它来测试网络升级的主要原因。

## 设置 Kurtosis {#setting-up-kurtosis}

在继续之前，请确保你已：

- 在本地计算机上[安装并启动了 Docker 引擎](https://docs.kurtosis.com/install/#i-install--start-docker)
- [安装了 Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli)（如果你已经安装了 CLI，请将其升级到最新版本）
- 安装了 [Node.js](https://nodejs.org/en)（用于你的 dapp 环境）

## 实例化本地以太坊测试网 {#instantiate-testnet}

要启动本地以太坊测试网，请运行：

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

注意：此命令使用 `--enclave` 标志将你的网络命名为“local-eth-testnet”。

Kurtosis 将在后台解释、验证并执行指令时打印其正在采取的步骤。最后，它会打印其创建的飞地 (enclave) 的摘要。该摘要包括**文件工件 (files artifacts)** 列表和**用户服务 (user services)** 列表。在默认配置下，用户服务包括单个节点：

- `el-1-geth-lighthouse`，`geth` 执行客户端
- `cl-1-lighthouse-geth`，`lighthouse` 信标节点
- `vc-1-geth-lighthouse`，`lighthouse` 验证者客户端

每个服务都列出了它暴露的端口以及每个端口映射到的本地端口。例如，`el-1-geth-lighthouse` 服务的 `rpc` 端口是你的 dapp 工具将使用的 JSON-RPC 端点。你机器上的确切服务和端口号会有所不同。

你可以随时通过运行以下命令再次查看此摘要：

```sh
kurtosis enclave inspect local-eth-testnet
```

恭喜！你已使用 Kurtosis 在 Docker 上实例化了一个包含共识层客户端 (`lighthouse`) 和执行层客户端 (`geth`) 的本地以太坊测试网。

### 回顾 {#review-instantiate-testnet}

在本节中，你执行了一条命令，指示 Kurtosis 使用[远程托管在 GitHub 上的 `ethereum-package`](https://github.com/ethpandaops/ethereum-package) 在 Kurtosis [飞地 (Enclave)](https://docs.kurtosis.com/advanced-concepts/enclaves/) 内启动本地以太坊测试网。在你的飞地内，你会发现“文件工件”和“用户服务”。

飞地中的[文件工件](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)包括生成并用于引导执行层和共识层客户端的所有数据，例如创世文件和验证者密钥。创世数据是使用 [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator) 创建的。

用户服务显示在你的飞地中运行的所有容器化服务。你会注意到已经创建了一个包含执行层客户端和共识层客户端的单个节点。

## 将你的 dapp 开发环境连接到本地以太坊测试网 {#connect-your-dapp}

### 设置 dapp 开发环境 {#set-up-dapp-env}

现在你已经有了一个运行中的本地测试网，你可以连接你的 dapp 开发环境来使用你的本地测试网。本指南将使用 Hardhat 框架将一个二十一点 (blackjack) dapp 部署到你的本地测试网。

要设置你的 dapp 开发环境，请克隆包含我们示例 dapp 的仓库并安装其依赖项，运行：

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

需要 `--legacy-peer-deps` 标志，因为示例项目的一些 Hardhat 插件声明了冲突的对等依赖项版本。

此处使用的 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 文件夹包含使用 [Hardhat](https://hardhat.org/) 框架的 dapp 开发者的典型设置：

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) 包含用于二十一点 dapp 的几个简单智能合约
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) 包含将代币合约部署到本地以太坊网络的脚本
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) 包含针对你的代币合约的简单 .js 测试，以确认我们二十一点 dapp 中的每个玩家都铸造了 1000 个代币
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) 配置你的 Hardhat 设置

### 配置 Hardhat 以使用本地测试网 {#configure-hardhat}

设置好 dapp 开发环境后，你现在将连接 Hardhat 以使用通过 Kurtosis 生成的本地以太坊测试网。首先，找到执行客户端的 JSON-RPC 端点的本地地址：

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

输出是一个 URL，例如 `http://127.0.0.1:32769`。你的端口会有所不同。将 `hardhat.config.ts` 配置文件中 `localnet` 结构里的 `<PORT>` 替换为此端口。

`hardhat.config.ts` 中的示例：

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: 将 <PORT> 替换为由 ETH 网络 Kurtosis 包生成的节点 URI 的端口
  // 这些是与由 eth-network-package 创建的预充值测试账户相关联的私钥
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

这些私钥是公开已知的测试密钥。切勿在主网或任何公共网络上使用它们。

保存文件后，你的 Hardhat dapp 开发环境现在已连接到你的本地以太坊测试网！你可以通过运行以下命令来验证你的测试网是否正常工作：

```sh
npx hardhat balances --network localnet
```

输出列出了上述每个帐户的地址和余额。例如，第一行应如下所示：

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

这确认了 Hardhat 正在使用你的本地测试网，并检测到了由 `ethereum-package` 创建的预注资帐户。

### 在本地部署和测试你的 dapp {#deploy-and-test-dapp}

随着 dapp 开发环境完全连接到本地以太坊测试网，你现在可以使用本地测试网针对你的 dapp 运行开发和测试工作流。

要编译并部署 `ChipToken.sol` 智能合约以进行本地原型设计和开发，请运行：

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

输出应类似于：

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

现在尝试针对你的本地 dapp 运行 `ChipToken.js` 测试，以确认我们二十一点 dapp 中的每个玩家都铸造了 1000 个代币。示例测试仍使用 ethers v5 的 `deployed()` 函数，而 ethers v6 已将其替换为 `waitForDeployment()`，因此请先更新它：

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

然后运行测试：

```sh
npx hardhat test --network localnet
```

输出应如下所示：

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### 回顾 {#review-dapp-workflows}

至此，你已经设置了一个 dapp 开发环境，将其连接到由 Kurtosis 创建的本地以太坊网络，并针对你的 dapp 编译、部署和运行了一个简单的测试。

现在让我们探讨如何配置底层网络，以便在不同的网络配置下测试我们的 dapp。

## 配置本地以太坊测试网 {#configure-testnet}

### 更改客户端配置和节点数量 {#configure-client-config-and-num-nodes}

你的本地以太坊测试网可以配置为使用不同的执行层和共识层客户端对，以及不同数量的节点，具体取决于你想要开发或测试的场景和特定网络配置。这意味着，一旦设置完毕，你就可以启动一个定制的本地测试网，并使用它在各种网络配置下运行相同的工作流（部署、测试等），以确保一切按预期工作。要了解有关你可以修改的其他参数的更多信息，请参阅 [`ethereum-package` 配置文档](https://github.com/ethpandaops/ethereum-package#configuration)。

试一试吧！你可以通过 YAML 文件将各种配置选项传递给 `ethereum-package`。此网络参数文件提供了 Kurtosis 将用于设置本地以太坊网络的特定配置。

创建一个名为 `network_params.yaml` 的文件，该文件将启动具有不同执行层/共识层对的三个节点：

- 节点 1 使用 `geth`/`lighthouse`
- 节点 2 使用 `geth`/`lodestar`
- 节点 3 使用 `geth`/`teku`

此配置创建了一个以太坊节点实现的异构网络，用于测试你的 dapp。你的配置文件应如下所示：

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

`participants` 中的每个条目都映射到网络中的一个节点，因此 3 个 `participants` 条目将告诉 Kurtosis 在你的网络中启动 3 个节点。每个条目允许你指定用于该特定节点的执行层和共识层对。你未指定的任何参数都将保留其默认值。

`network_params` 结构配置用于为每个节点创建创世文件的网络设置，以及网络的每个时隙秒数等其他设置。

保存你的参数文件，然后通过运行以下命令使用它来运行你的 Kurtosis 包：

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

注意：此处使用 `kurtosis clean -a` 命令指示 Kurtosis 在启动新测试网之前销毁旧测试网及其内容。

同样，Kurtosis 将运行一段时间并打印出正在发生的各个步骤。最终，它会打印飞地摘要。这一次，用户服务包括三个节点，例如执行客户端的 `el-1-geth-lighthouse`、`el-2-geth-lodestar` 和 `el-3-geth-teku`，以及匹配的共识和验证者客户端。

恭喜！你已成功将本地测试网配置为具有 3 个节点而不是 1 个节点。要针对你的 dapp 运行与之前相同的工作流（部署和测试），请执行与之前相同的操作，将 `hardhat.config.ts` 配置文件中 `localnet` 结构里的 `<PORT>` 替换为新的 3 节点本地测试网中任何 `el-<num>-...` 服务的 `rpc` 端口。

## 结论 {#conclusion}

就是这样！回顾这篇简短的指南，你：

- 使用 Kurtosis 在 Docker 上创建了本地以太坊测试网
- 将你的本地 dapp 开发环境连接到了本地以太坊网络
- 在本地以太坊网络上部署了 dapp 并对其运行了简单的测试
- 将底层以太坊网络配置为具有 3 个节点

我们很乐意听取你的意见，了解哪些方面对你来说很顺利，哪些方面可以改进，或者回答你的任何问题。请随时通过 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) 与我们联系！

### 其他示例和指南 {#other-examples-guides}

我们鼓励你查看我们的[快速入门](https://docs.kurtosis.com/quickstart)以及我们 [awesome-kurtosis 仓库](https://github.com/kurtosis-tech/awesome-kurtosis)中的其他示例。

`ethereum-package` 还可以在你的网络旁边启动其他服务，例如垃圾交易发送器（用于模拟交易）、区块浏览器以及连接的 Grafana 和 Prometheus 实例。要启用它们，请将它们列在参数文件中的 `additional_services` 下，如[包文档](https://github.com/ethpandaops/ethereum-package#configuration)中所述。
