---
title: "如何在本地多客户端测试网上开发和测试去中心化应用程序"
description: "本指南将首先引导你完成实例化和配置多客户端本地以太坊测试网，然后使用该测试网部署和测试去中心化应用程序。"
author: "Tedi Mitiku"
tags: [ "客户端", "节点", "智能合同", "可组合性", "共识层", "执行层", "测试" ]
skill: intermediate
lang: zh
published: 2023-04-11
---

## 简介 {#introduction}

本指南将引导你完成实例化可配置的本地以太坊测试网、向其部署智能合约，以及使用该测试网对你的去中心化应用程序运行测试的整个过程。 本指南专为希望在部署到实时测试网或主网之前，根据不同的网络配置在本地开发和测试其去中心化应用程序的开发者而设计。

在本指南中，你将：

- 使用 [Kurtosis](https://www.kurtosis.com/) 和 [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) 实例化本地以太坊测试网，
- 将 Hardhat 去中心化应用程序开发环境连接到本地测试网，以编译、部署和测试去中心化应用程序，以及
- 配置本地测试网，包括节点数量和特定 EL/CL 客户端配对等参数，以便能够根据各种网络配置进行开发和测试工作。

### 什么是 Kurtosis？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) 是一个可组合的构建系统，专为配置多容器测试环境而设计。 它专门帮助开发者创建需要动态设置逻辑的可复现环境，例如区块链测试网。

在本指南中，Kurtosis eth-network-package 启动一个本地以太坊测试网，支持 [`geth`](https://geth.ethereum.org/) 执行层 (EL) 客户端，以及 [`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/) 和 [`lodestar`](https://lodestar.chainsafe.io/) 共识层 (CL) 客户端。 此软件包可作为 Hardhat Network、Ganache 和 Anvil 等框架中网络的可配置和可组合替代方案。 Kurtosis 为开发者提供了对其使用的测试网的更强控制力和灵活性，这也是 [以太坊基金会使用 Kurtosis 测试合并](https://www.kurtosis.com/blog/testing-the-ethereum-merge) 并继续使用它来测试网络升级的一个主要原因。

## 设置 Kurtosis {#setting-up-kurtosis}

在继续之前，请确保你已：

- 在本地计算机上[安装并启动 Docker 引擎](https://docs.kurtosis.com/install/#i-install--start-docker)
- [安装 Kurtosis 命令行界面](https://docs.kurtosis.com/install#ii-install-the-cli)（如果已安装命令行界面，则将其升级到最新版本）
- 安装 [Node.js](https://nodejs.org/en)、[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) 和 [npx](https://www.npmjs.com/package/npx)（用于你的去中心化应用程序环境）

## 实例化本地以太坊测试网 {#instantiate-testnet}

要启动本地以太坊测试网，请运行：

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

注意：此命令使用 `--enclave` 标志将你的网络命名为： "local-eth-testnet"。

Kurtosis 会在后台打印出它为解析、验证和执行指令而采取的步骤。 最后，你应该会看到类似如下的输出：

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

恭喜！ 你使用 Kurtosis 通过 Docker 实例化了一个本地以太坊测试网，其中包含一个 CL（`lighthouse`）和一个 EL 客户端（`geth`）。

### 回顾 {#review-instantiate-testnet}

在本节中，你执行了一个命令，指示 Kurtosis 使用[托管在 GitHub 上的 `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) 在 Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) 中启动一个本地以太坊测试网。 在你的 enclave 中，你会找到“文件工件”和“用户服务”。

你的 enclave 中的[文件工件](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)包含用于引导 EL 和 CL 客户端的所有生成和使用的数据。 这些数据是使用 `prelaunch-data-generator` 服务创建的，该服务基于此 [Docker 镜像](https://github.com/ethpandaops/ethereum-genesis-generator)构建。

用户服务显示在你的 enclave 中运行的所有容器化服务。 你会注意到，一个同时具有 EL 客户端和 CL 客户端的节点已被创建。

## 将你的去中心化应用程序开发环境连接到本地以太坊测试网 {#connect-your-dapp}

### 设置去中心化应用程序开发环境 {#set-up-dapp-env}

现在你已经有了一个正在运行的本地测试网，你可以连接你的去中心化应用程序开发环境来使用你的本地测试网。 本指南将使用 Hardhat 框架将一个二十一点 (blackjack) 去中心化应用程序部署到你的本地测试网。

要设置你的去中心化应用程序开发环境，克隆包含我们的示例去中心化应用程序的代码库并安装其依赖项，请运行：

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

这里使用的 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 文件夹包含使用 [Hardhat](https://hardhat.org/) 框架的去中心化应用程序开发者的典型设置：

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) 包含一些用于二十一点 (Blackjack) 去中心化应用程序的简单智能合约
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) 包含一个脚本，用于将代币合约部署到你的本地以太坊网络
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) 包含一个针对你的代币合约的简单 .js 测试，用于确认我们的二十一点 (Blackjack) 去中心化应用程序中的每个玩家都已铸造了 1000 枚代币
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) 用于配置你的 Hardhat 设置

### 配置 Hardhat 以使用本地测试网 {#configure-hardhat}

设置好去中心化应用程序开发环境后，你现在将连接 Hardhat 以使用 Kurtosis 生成的本地以太坊测试网。 为此，请将你的 `hardhat.config.ts` 配置文件中 `localnet` 结构里的 `<$YOUR_PORT>` 替换为任何 `el-client-<num>` 服务的 RPC URI 输出端口。 在本示例案例中，端口为 `64248`。 你的端口会有所不同。

`hardhat.config.ts` 中的示例：

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO：将 $YOUR_PORT 替换为以太坊网络 Kurtosis 包生成的节点 URI 的端口

// 这些是与 eth-network-package 创建的预置资金的测试帐户关联的私钥
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

保存文件后，你的 Hardhat 去中心化应用程序开发环境就已连接到你的本地以太坊测试网！ 你可以通过运行以下命令来验证你的测试网是否正常工作：

```python
npx hardhat balances --network localnet
```

输出应如下所示：

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

这证实了 Hardhat 正在使用你的本地测试网，并检测到由 `eth-network-package` 创建的预置资金的帐户。

### 在本地部署和测试你的去中心化应用程序 {#deploy-and-test-dapp}

在去中心化应用程序开发环境完全连接到本地以太坊测试网后，你现在可以使用本地测试网对你的去中心化应用程序运行开发和测试工作流。

要编译和部署 `ChipToken.sol` 智能合约以进行本地原型设计和开发，请运行：

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

输出应如下所示：

```python
ChipToken 已部署到： 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

现在尝试对你的本地去中心化应用程序运行 `simple.js` 测试，以确认我们的二十一点 (Blackjack) 去中心化应用程序中的每个玩家都铸造了 1000 枚代币：

输出应如下所示：

```python
npx hardhat test --network localnet
```

输出应如下所示：

```python
ChipToken
    mint
      ✔ 应该为 PLAYER ONE 铸造 1000 个筹码

  1 个通过 (654ms)
```

### 回顾 {#review-dapp-workflows}

至此，你已经设置好一个去中心化应用程序开发环境，将其连接到由 Kurtosis 创建的本地以太坊网络，并已对你的去中心化应用程序进行了编译、部署和简单测试。

现在，让我们探讨如何配置底层网络，以便在不同的网络配置下测试我们的去中心化应用程序。

## 配置本地以太坊测试网 {#configure-testnet}

### 更改客户端配置和节点数量 {#configure-client-config-and-num-nodes}

你的本地以太坊测试网可以配置为使用不同的 EL 和 CL 客户端对，以及不同数量的节点，具体取决于你想要开发或测试的场景和特定网络配置。 这意味着，一旦设置好，你就可以启动一个自定义的本地测试网，并用它来运行相同的工作流（部署、测试等）。 在各种网络配置下，以确保一切都按预期工作。 要了解有关可以修改的其他参数的更多信息，请访问此链接。

试试看！ 你可以通过 JSON 文件将各种配置选项传递给 `eth-network-package`。 此网络参数 JSON 文件提供了 Kurtosis 将用于设置本地以太坊网络的具体配置。

获取默认配置文件并对其进行编辑，以启动具有不同 EL/CL 对的三个节点：

- 节点 1：`geth`/`lighthouse`
- 节点 2：`geth`/`lodestar`
- 节点 3：`geth`/`teku`

此配置创建了一个由以太坊节点实现组成的异构网络，用于测试你的去中心化应用程序。 你的配置文件现在应如下所示：

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

每个 `participants` 结构都映射到网络中的一个节点，因此 3 个 `participants` 结构将告诉 Kurtosis 在你的网络中启动 3 个节点。 每个 `participants` 结构都允许你指定用于该特定节点的 EL 和 CL 对。

`network_params` 结构配置网络设置，这些设置用于为每个节点创建创世文件，以及网络的每时隙秒数等其他设置。

将编辑后的参数文件保存在你希望的任何目录中（在下面的示例中，它保存在桌面上），然后通过运行以下命令来使用它运行你的 Kurtosis 包：

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

注意：此处使用 `kurtosis clean -a` 命令来指示 Kurtosis 在启动新测试网之前销毁旧测试网及其内容。

同样，Kurtosis 会运行一会并打印出正在执行的各个步骤。 最终，输出应如下所示：

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

恭喜！ 你已成功将本地测试网配置为 3 个节点，而不是 1 个。 要对你的去中心化应用程序运行与之前相同的工作流（部署和测试），请执行与之前相同的操作，将你的 `hardhat.config.ts` 配置文件中 `localnet` 结构里的 `<$YOUR_PORT>` 替换为新的 3 节点本地测试网中任何 `el-client-<num>` 服务的 RPC URI 输出端口。

## 结论 {#conclusion}

就这些！ 回顾这篇简短的指南，你：

- 使用 Kurtosis 通过 Docker 创建了一个本地以太坊测试网
- 将你的本地去中心化应用程序开发环境连接到本地以太坊网络
- 在本地以太坊网络上部署了一个去中心化应用程序并对其进行了简单测试
- 将底层以太坊网络配置为 3 个节点

我们很乐意听取你的意见，哪些方面做得好，哪些方面可以改进，或者回答你的任何问题。 请随时通过 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) 或[发送电子邮件](mailto:feedback@kurtosistech.com)与我们联系！

### 其他示例和指南 {#other-examples-guides}

我们鼓励你查看我们的[快速入门](https://docs.kurtosis.com/quickstart)（你将在其中构建一个 Postgres 数据库和 API）以及我们 [awesome-kurtosis 代码库](https://github.com/kurtosis-tech/awesome-kurtosis)中的其他示例，你将在其中找到一些很棒的示例，包括用于以下用途的包：

- [启动同一个本地以太坊测试网](https://github.com/kurtosis-tech/eth2-package)，但连接了额外的服务，例如交易垃圾信息发送器（用于模拟交易）、分叉监控器以及连接的 Grafana 和 Prometheus 实例
- 对同一个本地以太坊网络执行[子网络测试](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test)
