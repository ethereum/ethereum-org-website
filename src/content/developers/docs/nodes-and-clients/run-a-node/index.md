---
title: Spin up your own Ethereum node
description: General introduction to running your own instance of an Ethereum client.
lang: en
sidebar: true
sidebarDepth: 2
preMergeBanner: true
---

Running your own node provides you various benefits, opens new possibilities, and helps to support the ecosystem. This page will guide you through spinning up your own node and taking part in validating Ethereum transactions.

Note that after [The Merge](/upgrades/merge), two clients are required to run an Ethereum node. These are an execution client and a consensus client. This page will show how to install, configure and connect these two clients to form an Ethereum node.

## Prerequisites {#prerequisites}

You should understand what an Ethereum node is and why you might want to run a client. This is covered in [Nodes and clients](/developers/docs/nodes-and-clients/).

If you're new to the topic of running a node, or looking for a less technical path, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## Choosing an approach {#choosing-approach}

The first step in spinning up your node is choosing your approach. Based on requirements and various possibilities, you have to choose the client implementation (of both execution and consensus client), the environment (hardware, system), and the parameters for client settings.

This page will guide you trough these decisions and help you to find the most suitable way for running your own Ethereum instance. 

To choose from client implementations, see all the available Mainnet ready [execution clients](/developers/docs/nodes-and-clients/#execution-clients), [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients) and learn about [client diversity](/developers/docs/client-diversity). 

Decide whether to run the software at your own [hardware or in the cloud](#local-vs-cloud), considering clients' [requirements](#requirements). 

After preparing the enviroment, install chosen clients either with [beginner friendly interface](#automatized-setup) or [manually](#manual-setup) using terminal with advanced options. 

When the node is running and syncing, you are ready to [use it](#using-the-node) but make sure to keep an eye on its [maintanance](#operating-the-node). 

### Environment and hardware {#environment-and-hardware}

#### Local or cloud {#local-vs-cloud}

Ethereum clients are able to run on consumer grade computers and don't require any special hardware, like mining machines for example. Therefore, you have various options for deploying the node based on your needs.
To simplify, let's think about running a node on both a local physical machine and a cloud server:

- Cloud
  - Providers offer high server uptime, static public IP addresses
  - Getting dedicated or virtual server can be more comfortable than building your own
  - Trade off is trusting a third party - server provider
  - Because of required storage size for full node, price of a rented server might get high
- Own hardware
  - More trustless and sovereign approach
  - One time investment
  - An option to buy preconfigured machines
  - You have to physically prepare, maintain, and potentially troubleshoot the machine and networking

Both options have different advantages summed up above. If you are looking for a cloud solution, in addition to many traditional cloud computing providers, there are also services focused on deploying nodes. For example:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [Alchemy](https://www.alchemy.com/)

Check out also [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) for more options on hosted nodes. 

#### Hardware {#hardware}

However, a censorship-resistant, decentralized network should not rely on cloud providers. It's healthier for the ecosystem if you run your own node on your local hardware. [Estimations](https://www.ethernodes.org/networkType/Hosting) show around 40-60% of nodes is running on cloud which could become a single point of failure. 

Depending on your needs and wants, Ethereum clients can run on your computer, laptop, server or a single-board computer. Even if it's possible to run clients on your personal computer, having a dedicated machine just for your node can greatly enhance its performance and security while minimizing the impact on your primary computer.

Using your own hardware can be very easy and escalates from simple to more advanced options. Let's look into requirements and means for running Ethereum clients on your own machine. 

#### Requirements {#requirements}

Hardware requirements differ by client but generally are not that high since the node just needs to stay synced. Don't confuse it with mining which requires much more computing power. Sync time and performance do improve with more powerful hardware however. 

Before installing any client, please ensure your computer has enough resources to run it. Minimum and recommended requirements can be found below. 

Hardware bottleneck is mostly a disk. Syncing the Ethereum blockchain is very input/output intensive and requires a lot of space. It is best to have a solid-state drive (SSD) with hundreds of GBs of free space to spare even after the synchronization. To run an Ethereum client on HDD, you will need at least 8GB of RAM to use as a cache.

Size of the database and speed of the initial synchronization depends on chosen client, its configuration and [sync strategy](/developers/docs/nodes-and-clients/#sync-modes). 

Also make sure your internet connection is not limited by a [bandwidth cap](https://wikipedia.org/wiki/Data_cap). It's recommended to use an unmetered connection since initial sync and data broadcasted to the network could exceed your limit.

##### Operating system {#operating-system}

All clients support major operating systems - Linux, MacOS, Windows. This means you can run nodes on regular desktop or server machines with the operating system (OS) that suits you the best. Make sure your OS is up to date to avoid potential issues and security vulnerabilities.

##### Minimum requirements {#recommended-specifications}

- CPU with 2+ cores
- 4 GB RAM or 8GB with HDD 
- 500GB disk space, SSD prefered 
- 8 MBit/s bandwidth

##### Recommended specifications {#recommended-hardware}

- Fast CPU with 4+ cores
- 16 GB+ RAM
- Fast SSD with 1+TB
- 25+ MBit/s bandwidth

The sync mode and client you choose will affect space requirements but we've estimated the disk space you'll need for each client below. 

| Client       | Disk size (snap sync) | Disk size (full archive) |
| ------------ | --------------------- | ------------------------ |
| Geth         | 400GB+                | 11TB+                    |
| Nethermind   | 400GB+                | 11TB+                    |
| Besu         | 800GB+                | 11TB+                    |
| Erigon       | N/A                   | 2.5TB+                   |

- Note: Erigon does not Fast Sync, but Full Pruning is possible (~500GB)

For consensus clients, space requirement also depends on client implementation and enabled features (e.g. validator slasher) but generally count with another 200GB needed for beacon data. With large number of validators, bandwidth load grows as well. Details on conensus client requirements can be found in [this analysis](https://medium.com/@migalabs/analysis-of-ethereum-2-consensus-clients-dfede8e0145e). 

#### Plug-and-play solutions {#plug-and-play}

The easiest option for running a node with own hardware is using plug-and-play boxes. Preconfigured machine from a vendors offer the simplest user experience. Just order the machine and connect it at home. Everything is preconfigured and runs automatically with an intuitive guide and dashboard for monitoring and controlling the software. 

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum on a single-board computer {#ethereum-on-a-single-board-computer}

Easy and cheap way of running Ethereum node is to use a single board computer with ARM architecture like Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) provides easy to run RPi image with multiple execution and consensus client. 

Small, affordable and efficient devices like these are ideal for running a node at home but keep in mind their limited performence.

## Spinning up the node {#spinning-up-node}

The actual client setup can be done either with automatized launchers or manually, setting up client software directly. 

For less advanced users, recommended approach is to use a launcher, software which guides you trough the whole installation and automates the client setup process. However if you are not afraid of using terminal, steps for manual setup should be easy to follow. 

### Guided setup {#automatized-setup}

There are multiple user friendly projects which aim to improve the experience of clients setup. These launchers provides automatic client installation, configuration and some offer a graphical interface for guided setup and monitoring clients. 
Here are few projects which can help you install and control clients just with few clicks: 

- [Stereum](https://stereum.net/ethereum-node-setup/)
    - Launcher for installing clients via SSH connection with GUI setup guide, control center and many features, e.g. app for monitoring nodes from your phone. 
- [NiceNode](https://www.nicenode.xyz/)
    - Launcher with easiest user experience, choose clients and start them with few clicks. Still in development. 
- [DappNode](https://docs.dappnode.io/get-started/installation/custom-hardware/installation/overview/)
    - DappNode doesn't come only with a machine from vendor. The software, actuall node launcher and control center with many features can be used on arbitrary hardware. 
- [eth-docker](https://eth-docker.net/docs/About/Overview/)
    - Automatized setup using docker focused on easy and secure staking. Requires basic terminal and docker knowledge, recommended for bit more advanced users. 

### Manual clients setup {#manual-setup}

The other option is to manually download, verify and configure the client software. This requires basic skills with terminal but offers much more versatility. 

As explained before, setting up own Ethereum node will require running a pair of consensus and execution client. Some clients might include a light client of the other kind and sync without another software needed, however full trustless verification requires both implementations. 

#### Getting the execution client {#getting-the-client}

First, download your preferred [client software](/developers/docs/nodes-and-clients/#execution-clients). 

You can simply download an executable application or installation package which suits your operating system and architecture. Always verify signatures and checksums of downloaded packages. Some clients also offer repositories or Docker images for easier installation and updates.
All of the clients are open source so you can also build them from source. This is more advanced method but in some cases, it might be required. 

Executable binaries for stable Mainnet client implementations can be downloaded from their release pages:

- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon) (Doesn't provide binary, has to be compiled)


It is also worth noting that client diversity is an [issue on the execution layer](https://clientdiversity.org/),
with Geth being run on a supermajority (>66%) of all Ethereum nodes. It is recommended that readers on this page consider running a minority execution client.

##### Verifying the software {#verifying-software}

When downloading software from the internet, it's recommended to verify its integrity. This step is optional but especially with crucial infrastracture piece like Ethereum client, it's good to keep potential attack vectors in mind. 
If you just downloaded pre-built binary, you need to trust it and risk that attacker could swap the executable for mallicious one.

Developers sign released binaries with their PGP keys so you can cryptographically verify you are running exactly the software they created. You just need to obtain public keys used by developers, these can be found at client release pages. After downloading client release and its signature, you can use for example [GnuPG](https://gnupg.org/download/index.html) to easily verify them.  

#### Setup in client {#client-setup}

After installing - downloading or compiling the client software, you are ready to run it. It only needs to be executed with proper configuration.
Clients offer rich configuration options which can enable various features. 

Let's start with options which can influence the client performence and data usage significantly. [Sync modes](/developers/docs/nodes-and-clients/#sync-modes) represent different methods of downloading and validating blockchain data. Before starting the node, you should decide what network and sync mode to use. The most important things to consider is the disk space and sync time client will need. Pay attention to the client's docs to find out which sync mode is the default. If that doesn't suit you, pick another one based on the level of security, available data, and cost. Apart from the synchronization algorithm, you can also set pruning of different kinds of old data. Pruning enables deleting outdated data, e.g. removing state trie nodes that are unreachable from recent blocks.

Other basic configuration options are e.g. choosing a network - mainnet or testnets, enabling HTTP endpoint for RPC or WebSockets, etc. All features and options can be found in the client's documentation. Various client configurations can be set by executing the client with the corresponding flags directly in cli or in config file. Each client is a bit different, please always refer to its official documentation or help page for details on config options. 

For testing purposes, you might prefer running a client on one of testnet networks. [See overview of supported networks](/developers/docs/nodes-and-clients/#execution-clients).

Examples of running execution clients with basic configuration can be found in next section. 

#### Starting the execution client {#starting-the-execution-client}

Before starting Ethereum client software, perform a last check that your environment is ready. For example, make sure:

- There is enough disk space considering chosen network and sync mode.
- Memory and CPU is not halted by other programs.
- Operating system is updated to latest version.
- System has correct time and date.
- Your router and firewall accept connections on listening ports. By default Ethereum clients use a listener (TCP) port and a discovery (UDP) port, both on 30303 by default.

Run your client on a testnet first to help make sure everything is working correctly. [Running a Geth light node](/developers/tutorials/run-light-node-geth/) should help.

You need to declare any client settings that aren't default at the start. You can use flags or the config file to declare your preferred configuration. Check out your client's documentation for the specifics. 

Execution and conensus client communicate via authenticated endpoint specified in [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). In order to connect to a consensus client the execution client must generate a `jwtsecret` at a known path. This path must be known by both clients as it is used to authenticate a local RPC connection between them. The execution client must also define a listening port for authenticated APIs.

**Note that it is recommended to connect an execution and consensus client on a testnet only for now (e.g. Kiln) and await merge-ready client releases before replicating the process on Mainnet.**

#### Running an execution client

This section provides basic usage for starting clients. It enables RPC connection and defines `jwtsecret` path so it can connect with consensus client. For more features and options for example for running validators, monitoring, etc, please refer to documentation of specific client. 

<details>
  <summary>Running Geth</summary>

```
geth --mainnet \
     --datadir "/data/ethereum" \
     --http --http.api="eth,web3,net" \
     --ws --ws.api="eth,web3,net" \
     --authrpc.jwtsecret=/path/to/jwtsecret --authrpc.vhosts="*" 
```
</details>

<details>
  <summary>Running Nethermind</summary>

```
Nethermind.Runner --config mainnet --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```
Nethermind enables HTTP API by default. 
</details>


<details>
  <summary>Running Besu</summary>

```
besu --network=mainnet          \
  --rpc-http-enabled=true       \
  --rpc-ws-enabled=true         \
  --Xmerge-support=true         \
  --engine-rpc-enabled=true     \
  --engine-host-allowlist="*"   \
  --engine-jwt-enabled=true     \
  --engine-jwt-secret=/path/to/jwtsecret
```
</details>


<details>
  <summary>Running Erigon</summary>

```
erigon --datadir /data/ethereum --http --http.api=engine,net,eth --authrpc.jwtsecret=/tmp/jwtsecret 
```
Erigon serves HTTP RPC and WS at the same port. 
</details>


Client execution will initiate its core functions, chosen endpoints, and start looking for peers. After successfully discovering peers, the client starts synchronization. After the Merge, it awaits the connection from consensus client. Current blockchain data will be available once the client is successfully synced to the current state.

#### Getting the consensus client {#getting-the-consensus-client}

After succesfully setting up the execution client, let's download and run one of [consensus clients](developers/docs/nodes-and-clients/#consensus-clients). 

There is currently a [client diversity](/developers/docs/nodes-and-clients/client-diversity/) issue where a large dominance of Prysm clients poses a risk
to the health of the network. In response to the initial drive to even out the client diversity many Prysm nodes switched to Lighthouse to the extent that it now also has a problematic market share. It is therefore recommended to consider choosing a minority client. [See the latest network client usage](https://clientdiversity.org/) and learn more about [client diversity](/developers/docs/client-diversity). 

There are several ways to download and install the consensus clients including prebuilt binaries, docker containers or building from source. Instructions for each client are provided in the documentation linked in the client list above.
Users can choose the method that is right for them.

#### Starting the consensus client {#starting-the-consensus-client}

The consensus client must be started with the right port configuration to establish a local RPC connection to the execution client. The consensus clients have to be run with the exposed execution client port as configuration argument. 

The consensus client also needs the path to the execution client's `jwt-secret` in order to authenticate the RPC connection between them. Each consensus client has a command similar to `--jwt-secret` that takes the file path as an argument. This must be consistent with the `jwtsecret` path provided to the execution client.

**Note that we recommend waiting for merge-ready client releases before doing this on Ethereum Mainnet—for now just practice on a testnet such as Kiln**

#### Running a consensus client 

<details>
  <summary>Running Lighthouse</summary>

```
lighthouse beacon_node
          --spec mainnet \
          --datadir /data/ethereum \
          --eth1 \
          --http \
          --http-allow-sync-stalled \
          --merge \
          --execution-endpoints http://127.0.0.1:8551 \
          --enr-udp-port=9000 \
          --enr-tcp-port=9000 \
          --discovery-port=9000 \
          --jwt-secrets="/pat/to/jwtsecret" \
```
</details>

<details>
  <summary>Running Prysm</summary>

```
./prysm.sh beacon-chain --config-file=/path/to/file.yaml \
--datadir /data  \
--http-web3provider=http://localhost:8551  \
--jwt-secret=/path/to/jwtsecret
```
</details>


<details>
  <summary>Running Teku</summary>

```
teku --network mainnet \
  --data-path "/data/ethereum" \
  --ee-endpoint http://localhost:8551 \
  --ee-jwt-secret-file "/path/to/jwtsecret" \
```
</details>

<details>
  <summary>Running Nimbus</summary>

```
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```
</details>

<details>
  <summary>Running Lodestar</summary>

```
lodestar beacon \
--rootDir="/data/ethereum" \
--network=ropsten \
--eth1.enabled=true \
--execution.urls="http://127.0.0.1:8551" \
--jwt-secret="/path/to/jwtsecret"
```
</details>

### Adding Validators {#adding-validators}

Each of the consensus clients have their own validator software that is described in detail in their respective documentation. The easiest way to get started with
staking and validator key generation is to use the [Prater Testnet Staking Launchpad](https://prater.launchpad.ethereum.org/), allowing you to test your setup. When you're ready for Mainnet, you can repeat these steps using the [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).


### Using the node {#using-the-node}

Execution clients offer RPC API endpoints that you can use to submit transactions, interact with or deploy smart contracts on the Ethereum network in various ways:

- Manually calling them with a suitable protocol (e.g. using `curl`)
- Attaching a provided console (e.g. `geth attach`)
- Implementing them in applications using web3 libraries, e.g. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Different clients have different implementations of the RPC endpoints. But there is a standard JSON-RPC which you can use with every client. For an overview [read the JSON-RPC docs](https://eth.wiki/json-rpc/API). Applications that need information from the Ethereum network can use this RPC. For example, popular wallet MetaMask lets you [run a local blockchain instance and connect to it](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

The consensus clients all expose a [Beacon API](https://ethereum.github.io/beacon-APIs) that can be used to check the status of the consensus client or download blocks and consensus data by sending requests using tools such as [Curl](https://curl.se). More information on this can be found in the documentation for each consensus client.

#### Reaching RPC {#reaching-rpc}

The default port for the execution client JSON-RPC is `8545` but you can modify the ports of local endpoints in the config file. By default, the RPC interface is only reachable on the localhost of your computer. To make it remotely accessible, you might want to expose it to the public by changing the address to `0.0.0.0`. This will make it reachable over local and public IP addresses. In most cases you'll also need to set up port forwarding on your router.

You should do this with caution as this will let anyone on the internet control your node. Malicious actors could access your node to bring down your system or steal your funds if you're using your client as a wallet.

A way around this is to prevent potentially harmful RPC methods from being modifiable. For example, with Geth, you can declare modifiable methods with a flag: `--http.api web3,eth,txpool`.

You can also host access to your RPC interface by pointing service of web server, like Nginx, to your client's local address and port.

The most privacy-preserving and simple way to set up a publicly reachable endpoint, you can host it on your own [Tor](https://www.torproject.org/) onion service. This will let you reach the RPC outside your local network without a static public IP address or opened ports.
To do this:

- Install `tor`
- Edit `torrc` config to enable hidden service with address of your client's RPC address and port
- Restart `tor` service

Once you restart Tor, you'll get hidden service keys and a hostname in your desired directory. From then, your RPC will be reachable on a `.onion` hostname.

### Operating the node {#operating-the-node}

You should regularly monitor your node to make sure it's running properly. You may need to do occasional maintenance.

#### Keeping node online {#keeping-node-online}

Your node doesn't have to be online nonstop but you should keep it online as much as possible to keep it in sync with the network. You can shut it down to restart it but keep in mind that:

- Shutting down can take up to a few minutes if the recent state is still being written on disk.
- Forced shut downs can damage the database.
- Your client will go out of sync with the network and will need to resync when you restart it.

_This doesn't apply on consensus layer validator nodes._ Taking your node offline will affect all services dependent on it. If you are running a node for _staking_ purposes you should try to minimize downtime as much as possible.

#### Creating client services {#creating-client-services}

Consider creating a service to run your clients automatically on startup. For example on Linux servers, good practice would be creating a service that executes the client with proper config, under user with limited privileges and automatically restarts.

#### Updating clients {#updating-clients}

You need to keep your client software up-to-date with the latest security patches, features, and [EIPs](/eips/). Especially before [hard forks](/history/), make sure you are running the correct client versions. Updating clients is very simple. Each client has specific instructions in their documentation but the process is generally just to stop the client, download the latest version and restart. The client should pick up where it left off but with the updates applied.

Each client implementation has a human-readable version string used in the peer-to-peer protocol but is also accessible from the command line. This version string lets users check they are running the correct version and allows block explorers and other analytical tools interested in quantifying the distribution of specific clients over the network. Please refer to the individual client documentation for more information about version strings.

#### Running additional services {#running-additional-services}

Running your own node lets you use services that require direct access to Ethereum client RPC. These are services built on top of Ethereum like [layer 2 solutions](/developers/docs/scaling/#layer-2-scaling), [consensus clients](/upgrades/get-involved/#clients), and other Ethereum infrastructure.

#### Monitoring the node {#monitoring-the-node}

"To properly monitor your node, consider collecting metrics. Clients provide metrics endpoints so you can get comprehensive data about your node. Use tools like [InfluxDB](https://www.influxdata.com/get-influxdb/) or [Prometheus](https://prometheus.io/) to create databases which you can turn into visualizations and charts in software like [Grafana](https://grafana.com/). There are many setups for using this software and different Grafana dashboards for you to visualise your node and the network as a whole.
As part of your monitoring, make sure to keep an eye on your machine's performance. During your node's initial sync, the client software may be very heavy on CPU and RAM. In addition to Grafana, you can use the tools your OS offers like `htop` or `uptime` to do this.

## Further reading {#further-reading}

- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, updated often_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 May 2020_
- [Deploying Nethermind Ethereum Client with Monitoring Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 July 2020_

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)
- [Blocks](/developers/docs/blocks/)
- [Networks](/developers/docs/networks/)
