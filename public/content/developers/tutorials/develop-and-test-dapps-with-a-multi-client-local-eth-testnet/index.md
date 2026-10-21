---
title: How to develop and test a dApp on a local, multi-client testnet
description: This guide will first walk you through how to instantiate and configure a multi-client local Ethereum testnet before using the testnet to deploy & test a dApp.
author: "Tedi Mitiku"
tags:
  [
    "clients",
    "nodes",
    "smart contracts",
    "composability",
    "consensus layer",
    "execution layer",
    "testing",
  ]
skill: intermediate
breadcrumb: Multi-client testnet
lang: en
published: 2023-04-11
---

## Introduction {#introduction}

This guide walks you through the process of instantiating a configurable local Ethereum testnet, deploying a smart contract to it, and using the testnet to run tests against your dApp. This guide is designed for dApp developers who want to develop and test their dApps locally against different network configurations before deploying to a live testnet or the mainnet.

In this guide, you will:

- Instantiate a local Ethereum testnet with the [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) using [Kurtosis](https://www.kurtosis.com/),
- Connect your Hardhat dApp development environment to the local testnet to compile, deploy, and test a dApp, and
- Configure the local testnet, including parameters like number of nodes and specific EL/CL client pairings, to enable development and testing workflows against various network configurations.

### What is Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) is a composable build system designed for configuring multi-container test environments. It specifically enables developers to create reproducible environments that require dynamic setup logic, such as blockchain testnets.

In this guide, the Kurtosis `ethereum-package`, maintained by [ethPandaOps](https://ethpandaops.io/), spins up a local Ethereum testnet. It supports all the major Execution Layer (EL) clients, such as [`geth`](https://geth.ethereum.org/), and Consensus Layer (CL) clients, such as [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), and [`lodestar`](https://lodestar.chainsafe.io/). This package serves as a configurable and composable alternative to networks in frameworks like Hardhat Network and Anvil. Kurtosis offers developers greater control and flexibility over the testnets they use, which is a major reason why Ethereum client teams use it for testing network upgrades.

## Setting up Kurtosis {#setting-up-kurtosis}

Before you proceed, make sure you have:

- [Installed and started the Docker engine](https://docs.kurtosis.com/install/#i-install--start-docker) on your local machine
- [Installed the Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (or upgraded it to the latest release, if you already have the CLI installed)
- Installed [Node.js](https://nodejs.org/en) (for your dApp environment)

## Instantiating a local Ethereum testnet {#instantiate-testnet}

To spin up a local Ethereum testnet, run:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Note: This command names your network "local-eth-testnet" using the `--enclave` flag.

Kurtosis will print the steps it's taking under the hood as it works to interpret, validate, and then execute the instructions. At the end, it prints a summary of the enclave it created. The summary includes a list of **files artifacts** and a list of **user services**. With the default configuration, the user services include a single node:

- `el-1-geth-lighthouse`, the `geth` execution client
- `cl-1-lighthouse-geth`, the `lighthouse` beacon node
- `vc-1-geth-lighthouse`, the `lighthouse` validator client

Each service is listed with the ports it exposes and the local port each one is mapped to. For example, the `rpc` port of the `el-1-geth-lighthouse` service is the JSON-RPC endpoint your dApp tools will use. The exact services and port numbers will be different on your machine.

You can view this summary again at any time by running:

```sh
kurtosis enclave inspect local-eth-testnet
```

Congratulations! You used Kurtosis to instantiate a local Ethereum testnet, with a CL (`lighthouse`) and EL client (`geth`), over Docker.

### Review {#review-instantiate-testnet}

In this section, you executed a command that directed Kurtosis to use the [`ethereum-package` hosted remotely on GitHub](https://github.com/ethpandaops/ethereum-package) to spin up a local Ethereum testnet within a Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/). Inside your enclave, you will find both "files artifacts" and "user services".

The [Files Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) in your enclave include all the data generated and utilized to bootstrap the EL and CL clients, such as the genesis files and validator keys. The genesis data was created using the [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

User services display all the containerized services operating in your enclave. You will notice that a single node, featuring both an EL client and a CL client, has been created.

## Connect your dApp development environment to the local Ethereum testnet {#connect-your-dapp}

### Setup the dApp development environment {#set-up-dapp-env}

Now that you have a running local testnet, you can connect your dApp development environment to use your local testnet. The Hardhat framework will be used in this guide to deploy a blackjack dApp to your local testnet.

To set up your dApp development environment, clone the repository that contains our sample dApp and install its dependencies, run:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install
```

The [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) folder used here contains the typical setup for a dApp developer using the [Hardhat](https://hardhat.org/) framework:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contains a few simple smart contracts for a Blackjack dApp
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contains a script to deploy a token contract to your local Ethereum network
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contains a simple .js test for your token contract to confirm each player in our Blackjack dApp has 1000 minted for them
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configures your Hardhat setup

### Configure Hardhat to use the local testnet {#configure-hardhat}

With your dApp development environment set up, you will now connect Hardhat to use the local Ethereum testnet generated using Kurtosis. First, find the local address of the JSON-RPC endpoint of the execution client:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

The output is a URL such as `http://127.0.0.1:32769`. Your port will be different. Replace `<PORT>` in the `localnet` struct in your `hardhat.config.ts` config file with this port.

Example in `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: REPLACE <PORT> WITH THE PORT OF A NODE URI PRODUCED BY THE ETH NETWORK KURTOSIS PACKAGE
  // These are private keys associated with prefunded test accounts created by the eth-network-package
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

These private keys are publicly known test keys. Never use them on mainnet or any public network.

Once you save your file, your Hardhat dApp development environment is now connected to your local Ethereum testnet! You can verify that your testnet is working by running:

```sh
npx hardhat balances --network localnet
```

The output lists the address and balance of each of the accounts above. For example, the first line should look like this:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

This confirms that Hardhat is using your local testnet and detects the pre-funded accounts created by the `ethereum-package`.

### Deploy and test your dApp locally {#deploy-and-test-dapp}

With the dApp development environment fully connected to the local Ethereum testnet, you can now run development and testing workflows against your dApp using the local testnet.

To compile and deploy the `ChipToken.sol` smart contract for local prototyping and development, run:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

The output should look something like:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Now try running the `ChipToken.js` test against your local dApp to confirm each player in our Blackjack dApp has 1000 minted for them:

```sh
npx hardhat test --network localnet
```

The output should look something like this:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Review {#review-dapp-workflows}

At this point, you’ve now set up a dApp development environment, connected it to a local Ethereum network created by Kurtosis, and have compiled, deployed, and ran a simple test against your dApp.

Now let’s explore how you can configure the underlying network for testing our dApps under varying network configurations.

## Configuring the local Ethereum testnet {#configure-testnet}

### Changing the client configurations and number of nodes {#configure-client-config-and-num-nodes}

Your local Ethereum testnet can be configured to use different EL and CL client pairs, as well as a varying number of nodes, depending on the scenario and specific network configuration you want to develop or test. This means that, once set up, you can spin up a customized local testnet and use it to run the same workflows (deployment, tests, etc.) under various network configurations to ensure everything works as expected. To learn more about the other parameters you can modify, see [the `ethereum-package` configuration documentation](https://github.com/ethpandaops/ethereum-package#configuration).

Give it a try! You can pass various configuration options to the `ethereum-package` via a YAML file. This network params file provides the specific configurations that Kurtosis will use to set up the local Ethereum network.

Create a file called `network_params.yaml` that spins up three nodes with different EL/CL pairs:

- Node 1 with `geth`/`lighthouse`
- Node 2 with `geth`/`lodestar`
- Node 3 with `geth`/`teku`

This configuration creates a heterogeneous network of Ethereum node implementations for testing your dApp. Your configuration file should look like:

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

Each entry in `participants` maps to a node in the network, so 3 `participants` entries will tell Kurtosis to spin up 3 nodes in your network. Each entry allows you to specify the EL and CL pair used for that specific node. Any parameters you do not specify keep their default values.

The `network_params` struct configures the network settings that are used to create the genesis files for each node as well as other settings like the seconds per slot of the network.

Save your params file and then use it to run your Kurtosis package by running:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Note: the `kurtosis clean -a` command is used here to instruct Kurtosis to destroy the old testnet and its contents before starting a new one up.

Again, Kurtosis will work for a bit and print out the individual steps that are taking place. Eventually, it prints the enclave summary. This time, the user services include three nodes, for example `el-1-geth-lighthouse`, `el-2-geth-lodestar`, and `el-3-geth-teku` for the execution clients, along with the matching consensus and validator clients.

Congratulations! You’ve successfully configured your local testnet to have 3 nodes instead of 1. To run the same workflows you did before against your dApp (deploy & test), perform the same operations we did before by replacing the `<PORT>` in the `localnet` struct in your `hardhat.config.ts` config file with the `rpc` port of any `el-<num>-...` service in your new, 3-node local testnet.

## Conclusion {#conclusion}

And that's it! To recap this short guide, you:

- Created a local Ethereum testnet over Docker using Kurtosis
- Connected your local dApp development environment to the local Ethereum network
- Deployed a dApp and ran a simple test against it on the local Ethereum network
- Configured the underlying Ethereum network to have 3 nodes

We’d love to hear from you on what went well for you, what could be improved, or to answer any of your questions. Don’t hesitate to reach out via [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Other examples and guides {#other-examples-guides}

We encourage you to check out our [quickstart](https://docs.kurtosis.com/quickstart) and our other examples in our [awesome-kurtosis repository](https://github.com/kurtosis-tech/awesome-kurtosis).

The `ethereum-package` can also start additional services alongside your network, such as a transaction spammer (to simulate transactions), a block explorer, and connected Grafana and Prometheus instances. To enable them, list them under `additional_services` in your params file, as described in [the package documentation](https://github.com/ethpandaops/ethereum-package#configuration).
