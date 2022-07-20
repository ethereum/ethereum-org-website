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

The first step in spinning up your node is choosing your approach. Based on requirements and various possibilities, you have to choose the client implementation (of both execution and consensus clients), the environment (hardware, system), and the parameters for client settings.

This page will guide you through these decisions and help you to find the most suitable way for running your own Ethereum instance. 

To choose from client implementations, see all the available Mainnet ready [execution clients](/developers/docs/nodes-and-clients/#execution-clients), [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients) and learn about [client diversity](/developers/docs/client-diversity). 

Decide whether to run the software on your own [hardware or in the cloud](#local-vs-cloud), considering clients' [requirements](#requirements). 

After preparing the environment, install the chosen clients either with [beginner friendly interface](#automatized-setup) or [manually](#manual-setup) using a terminal with advanced options. 

When the node is running and syncing, you are ready to [use it](#using-the-node) but make sure to keep an eye on its [maintanance](#operating-the-node). 

### Environment and hardware {#environment-and-hardware}

#### Local or cloud {#local-vs-cloud}

Ethereum clients are able to run on consumer grade computers and don't require any special hardware, like mining machines for example. Therefore, you have various options for deploying the node based on your needs.
To simplify, let's think about running a node on both a local physical machine and a cloud server:

- Cloud
  - Providers offer high server uptime and static public IP addresses
  - Getting dedicated or virtual server can be more comfortable than building your own
  - Trade off is trusting a third party - server provider
  - Because of the required storage size for full node, the price of a rented server might get high
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

However, a censorship-resistant, decentralized network should not rely on cloud providers. It's healthier for the ecosystem if you run your own node on your local hardware. [Estimations](https://www.ethernodes.org/networkType/Hosting) show a large share of nodes are running on cloud, which could become a single point of failure. 

Depending on your needs and wants, Ethereum clients can run on your computer, laptop, server or single-board computer. While it is possible to run clients on your personal computer, having a dedicated machine just for your node can greatly enhance its performance and security while minimizing the impact on your primary computer.

Using your own hardware can be very easy and escalates from simple to more advanced options. Let's look into the requirements and means for running Ethereum clients on your own machine. 

#### Requirements {#requirements}

Hardware requirements differ by client but generally are not that high since the node just needs to stay synced. Don't confuse it with mining, which requires much more computing power. Sync time and performance do improve with more powerful hardware however. 

Before installing any client, please ensure your computer has enough resources to run it. Minimum and recommended requirements can be found below. 

The hardware bottleneck is mostly a disk space. Syncing the Ethereum blockchain is very input/output intensive and requires a lot of space. It is best to have a solid-state drive (SSD) with hundreds of GBs of free space to spare even after the synchronization. To run an Ethereum client on an HDD, you will need at least 8GB of RAM to use as a cache.

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

- Note: Erigon does not offer snap sync, but Full Pruning is possible (~500GB)

For consensus clients, space requirement also depends on client implementation and enabled features (e.g. validator slasher) but generally count with another 200GB needed for beacon data. With large number of validators, the bandwidth load grows as well. Details on conensus client requirements can be found in [this analysis](https://medium.com/@migalabs/analysis-of-ethereum-2-consensus-clients-dfede8e0145e). 

#### Plug-and-play solutions {#plug-and-play}

The easiest option for running a node with your own hardware is using plug-and-play boxes. Preconfigured machines from vendors offer the simplest user experience. Just order the machine and connect it at home. Everything is preconfigured and runs automatically with an intuitive guide and dashboard for monitoring and controlling the software. 

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum on a single-board computer {#ethereum-on-a-single-board-computer}

Easy and cheap way of running an Ethereum node is to use a single board computer, even with an ARM architecture like the Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) provides easy to run images for Raspberry and other boards with multiple execution and consensus client. 

Small, affordable and efficient devices like these are ideal for running a node at home but keep in mind their limited performence.

## Spinning up the node {#spinning-up-node}

The actual client setup can be done either with automated launchers or manually, setting up client software directly. 

For less advanced users, the recommended approach is to use a launcher, which is software that guides you through the whole installation and automates the client setup process. However, if you are not afraid of using a terminal, the steps for manual setup should be easy to follow. 

### Guided setup {#automatized-setup}

There are multiple user friendly projects which aim to improve the experience of clients setup. These launchers provides automatic client installation and configuration, some even offer a graphical interface for guided setup and monitoring of clients. 
Here are few projects which can help you install and control clients just with a few clicks: 

- [Stereum](https://stereum.net/ethereum-node-setup/)
    - Launcher for installing clients on a remote server via SSH connection with a GUI setup guide, control center and many features, e.g. app for monitoring nodes from your phone. 
- [NiceNode](https://www.nicenode.xyz/)
    - Launcher with the easiest user experience, choose clients and start them with a few clicks. Still in development. 
- [DappNode](https://docs.dappnode.io/get-started/installation/custom-hardware/installation/overview/)
    - DappNode doesn't come only with a machine from a vendor. The software, the actual node launcher and control center with many features can be used on arbitrary hardware. 
- [eth-docker](https://eth-docker.net/docs/About/Overview/)
    - Automatized setup using Docker focused on easy and secure staking. It requires basic terminal and docker knowledge, recommended for a bit more advanced users. 

### Manual clients setup {#manual-setup}

The other option is to manually download, verify, and configure the client software. Even if some clients might offer a graphical interface, manual setup still requires basic skills with the terminal but offers much more versatility.

As explained before, setting up your own Ethereum node will require running a pair of consensus and execution clients. Some clients might include a light client of the other kind and sync without any other software needed. However, full trustless verification requires both implementations. 

#### Getting the client software {#getting-the-client}

First, you need to obtain your preferred [execution client](/developers/docs/nodes-and-clients/#execution-clients) and [consensus client](developers/docs/nodes-and-clients/#consensus-clients) software. 

You can simply download an executable application or installation package that suits your operating system and architecture. Always verify the signatures and checksums of downloaded packages. Some clients also offer repositories or Docker images for easier installation and updates.All of the clients are open source, so you can also build them from source. This is a more advanced method, but in some cases, it might be required. 

Instructions for installing each client are provided in the documentation linked in the client lists above. 

Here are the release pages of clients where you can find their pre-built binaries or instructions on installation: 

##### Execution clients

- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon#usage) (Doesn't provide a pre-built binary, has to be compiled)

It is also worth noting that client diversity is an [issue on the execution layer](https://clientdiversity.org/),
with Geth being run on a supermajority (>66%) of all Ethereum nodes. It is recommended that readers on this page consider running a minority execution client.

##### Consensus clients

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/install/source/) (Doesn't provide a pre-built binary, only a Docker image or to be build from source)

There is currently a [client diversity](/developers/docs/nodes-and-clients/client-diversity/) issue where a large dominance of Prysm clients poses a risk to the health of the network. In response to the initial drive to even out the client diversity many Prysm nodes switched to Lighthouse to the extent that it now also has a problematic market share. It is therefore recommended to consider choosing a minority client. 

[See the latest network client usage](https://clientdiversity.org/) and learn more about [client diversity](/developers/docs/client-diversity). 

##### Verifying the software {#verifying-software}

When downloading software from the internet, it's recommended to verify its integrity. This step is optional but especially with crucial infrastracture piece like the Ethereum client, it's important to be aware of potential attack vectors and avoid them. If you just downloaded a pre-built binary, you need to trust it and risk that an attacker could swap the executable for a malicious one. 

Developers sign released binaries with their PGP keys so you can cryptographically verify you are running exactly the software they created. You just need to obtain public keys used by developers, which can be found on client release pages or in documentation. After downloading the client release and its signature, you can use a PGP implementation, e.g. [GnuPG](https://gnupg.org/download/index.html) to easily verify them. Check out a tutorial on veryifing open-source software using `gpg` on [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) or [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/). 

Another form of verification is making sure that the hash, a unique cryptographic fingerprint, of the software you downloaded matches the one provided by the developers. This is even easier than using PGP, and some clients offer only this option. Just run the hash function on the downloaded software and compare it to the one from the release page. For example: 
```
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Setup in client {#client-setup}

After installing, downloading, or compiling the client software, you are ready to run it. This only means it has to be executed with the proper configuration. Clients offer rich configuration options, which can enable various features.

Let's start with options which can influence the client performance and data usage significantly. [Sync modes](/developers/docs/nodes-and-clients/#sync-modes) represent different methods of downloading and validating blockchain data. Before starting the node, you should decide what network and sync mode to use. The most important things to consider are the disk space and sync time client will need. Pay attention to the client's docs to find out which sync mode is the default. If that doesn't suit you, pick another one based on the level of security, available data, and cost. Apart from the synchronization algorithm, you can also set pruning of different kinds of old data. Pruning enables deleting outdated data, e.g. removing state trie nodes that are unreachable from recent blocks.

Other basic configuration options are, e.g. choosing a network - mainnet or testnets, enabling HTTP endpoint for RPC or WebSockets, etc. All features and options can be found in the client's documentation. Various client configurations can be set by executing the client with the corresponding flags directly in the cli or in the config file. Each client is a bit different, please always refer to its official documentation or help page for details on config options. 

For testing purposes, you might prefer to run a client on one of the testnet networks. [See overview of supported networks](/developers/docs/nodes-and-clients/#execution-clients).

Examples of running execution clients with basic configuration can be found in next section. 

#### Starting the execution client {#starting-the-execution-client}

Before starting the Ethereum client software, perform a last check that your environment is ready. For example, make sure:

- There is enough disk space considering the chosen network and sync mode.
- Memory and CPU is not halted by other programs.
- Operating system is updated to the latest version.
- System has the correct time and date.
- Your router and firewall accept connections on listening ports. By default Ethereum clients use a listener (TCP) port and a discovery (UDP) port, both on 30303 by default.

Run your client on a testnet first to help make sure everything is working correctly. [Running a Geth light node](/developers/tutorials/run-light-node-geth/) should help.

You need to declare any client settings that aren't default at the start. You can use flags or the config file to declare your preferred configuration. Set of features and config syntax of each client differs. Check out your client's documentation for the specifics. 

Execution and consensus clients communicate via an authenticated endpoint specified in [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). In order to connect to a consensus client, the execution client must generate a [`jwtsecret`](https://jwt.io/
) at a known path. For security and stability reasons, clients should run on the same machine and this path must be known by both clients as it is used to authenticate a local RPC connection between them. The execution client must also define a listening port for authenticated APIs.

This token is generated automatically by the client software but in some cases, e.g. during pre-Merge testing, you might need to do it by yourself. You can generate it by running:
```
openssl rand -hex 32
```

**Note that it is recommended to connect an execution and consensus client on a testnet only for now (e.g. Kiln) and await merge-ready client releases before replicating the process on Mainnet.**

#### Running an execution client

This section will guide you through starting execution clients. It only serves as an example of a basic configuration, which will start the client with these settings:

- Specifies network to connect to, mainnet in our examples
  - You can instead choose [one of testnets](/developers/docs/networks/) for prelimenary testing of your setup
- Defines data directory, where all the data including blockchain will be stored
  - Make sure to subsitute the path with a real one, e.g. pointing to your external drive
- Enables interfaces for communicating with the client
  - Including JSON RPC and Engine API for communication with consensus client
- Defines path to `jwtsecret` for authenticated API
  - Make sure to substitute the example path with a real one which can be accessed by clients, e.g. `/tmp/jwtsecret`

Please keep in mind that this is just a basic example, all other settings will be set to default. Pay attention to the documentation of each client to learn about default values, settings, and features. For more features, for example for running validators, monitoring, etc., please refer to the documentation of the specific client. 

> Note that backslashes `\` in examples are only for formatting purposes; config flags can be defined in a single line. 

<details>
  <summary>Running Geth</summary>

This example starts Geth on mainnet, stores blockchain data at `/data/ethereum`, enables JSON RPC and defines which namespaces are allowed. It also enables authentication for connecting consensus client which requires path to `jwtsecret` and also option defining which connections are allowed, in our example only from `localhost`. 

```
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --http.api="engine,eth,web3,net" \
    --authrpc.vhosts="localhost" \
    --authrpc.jwtsecret=/path/to/jwtsecret 
```
Check [docs for all possible options](https://geth.ethereum.org/docs/interface/command-line-options) to run Geth with. 

</details>

<details>
  <summary>Running Nethermind</summary>

Nethermind package includes various binaries, including a Launcher with guided setup, which will help you to create the configuration interactively. Alternativally, you find Runner which is the executable itself and you can just run it with config glags. JSON RPC is enabled by default. 
```
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```
Nethermind docs offer a [complete guide](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge) on running Nethermind with consensus client. 
</details>


<details>
  <summary>Running Besu</summary>

This example starts Besu on mainnet, stores blockchain data in default format at `/data/ethereum`, enables JSON RPC and Engine RPC for connecting consensus client. Engine API is authenticated with token `jwtsecret` and only calls from `localhost` are allowed. 

```
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --Xmerge-support=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="localhost" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu also comes with a launcher option which will ask a series of questions and generate the config file. Run the interactive launcher using:

```
besu --Xlauncher
```

Besu's [documentation](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/) contains additional options and configuration details.

</details>


<details>
  <summary>Running Erigon</summary>

This example starts Erigon on mainnet, stores blockchain data at `/data/ethereum`, enables JSON RPC, defines which namespaces are allowed and enables authentication for connecting the consensus client which is defined by the `jwtsecret` path.

```
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret 
```

Erigon by default performs a full sync which will result in more than 2TB of archive data. Make sure `datadir` is pointing to disk with enough free space or look into `--prune` flag which can trim different kinds of data. Check the Erigon's `--help` to learn more. 

</details>

Execution client will initiate its core functions, chosen endpoints, and start looking for peers. After successfully discovering peers, the client starts synchronization. After the Merge, it awaits the connection from consensus client. Current blockchain data will be available once the client is successfully synced to the current state.

#### Starting the consensus client {#starting-the-consensus-client}

The consensus client must be started with the right port configuration to establish a local RPC connection to the execution client. The consensus clients have to be run with the exposed execution client port as configuration argument. 

The consensus client also needs the path to the execution client's `jwt-secret` in order to authenticate the RPC connection between them. Similar to execution examples above, each consensus client has a configuration flag which takes the jwt token file path as an argument. This must be consistent with the `jwtsecret` path provided to the execution client.

**Note that we recommend waiting for merge-ready client releases before doing this on Ethereum Mainnet—for now just practice on a testnet such as Kiln**

#### Running a consensus client 

<details>
  <summary>Running Lighthouse</summary>

Before running Lighthouse, learn more on how to install and configure it in [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html). 
```
lighthouse beacon_node
    --network mainnet \
    --datadir /data/ethereum \
    --eth1 \
    --http \
    --http-allow-sync-stalled \
    --merge \
    --execution-endpoints http://127.0.0.1:8551 \
    --jwt-secrets="/path/to/jwtsecret" \
```
</details>

<details>
  <summary>Running Prysm</summary>

Prysm comes with script which allows easy automatic installation. Details can be found in the [Prysm docs](https://docs.prylabs.network/docs/install/install-with-script). 

```
./prysm.sh beacon-chain \
    --mainnet
    --datadir /data/ethereum  \
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

Nimbus comes with both consensus and execution clients. It can be run on various devices even with very modest computing power. 
After [installing dependencies and Nimbus itself](https://nimbus.guide/quick-start.html), you can run its consensus client:

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

Prepare Lodestar software via compiling it or downloading the Docker image. Learn more in [docs](https://chainsafe.github.io/lodestar/) and more comprehensive [setup guide](https://hackmd.io/@philknows/rk5cDvKmK).  

```
lodestar beacon \
    --rootDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```
</details>

Consensus client connects to the execution client to read the deposit contract and identify validators. It also connects to other Beacon Node peers and syncs consensus slots from genesis. When it reaches the current epoch, the Beacon API becomes usable for your validators. 

### Adding Validators {#adding-validators}

Each of the consensus clients has their own validator software that is described in detail in their respective documentation. The easiest way to get started with staking and validator key generation is to use the [Prater Testnet Staking Launchpad](https://prater.launchpad.ethereum.org/), which allows you to test your setup. When you're ready for Mainnet, you can repeat these steps using the [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Running your own validator allows for [solo staking](https://ethereum.org/en/staking/solo/), the most impactful and trustless way. This requires deposit of 32ETH. For running a validator on your own node with a smaller amount, checkout decentralized pool with permissionless node operators, e.g. [Rocket Pool](https://rocketpool.net/node-operators).

### Using the node {#using-the-node}

Execution clients offer [RPC API endpoints](/developers/docs/apis/json-rpc/) that you can use to submit transactions, interact with or deploy smart contracts on the Ethereum network in various ways:

- Manually calling them with a suitable protocol (e.g. using `curl`)
- Attaching a provided console (e.g. `geth attach`)
- Implementing them in applications using web3 libraries, e.g. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Different clients have different implementations of the RPC endpoints. But there is a standard JSON-RPC which you can use with every client. For an overview [read the JSON-RPC docs](/developers/docs/apis/json-rpc/). Applications that need information from the Ethereum network can use this RPC. For example, popular wallet MetaMask lets you [connect to your own RPC endpoint](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) which has strong privacy and security benefits.

The consensus clients all expose a [Beacon API](https://ethereum.github.io/beacon-APIs) that can be used to check the status of the consensus client or download blocks and consensus data by sending requests using tools such as [Curl](https://curl.se). More information on this can be found in the documentation for each consensus client.

#### Reaching RPC {#reaching-rpc}

The default port for the execution client JSON-RPC is `8545` but you can modify the ports of local endpoints in the configuration. By default, the RPC interface is only reachable on the localhost of your computer. To make it remotely accessible, you might want to expose it to the public by changing the address to `0.0.0.0`. This will make it reachable over local and public IP addresses. In most cases you'll also need to set up port forwarding on your router.

You should do this with caution as this will let anyone on the internet control your node. Malicious actors could access your node to bring down your system or steal your funds if you're using your client as a wallet.

A way around this is to prevent potentially harmful RPC methods from being modifiable. For example, with Geth, you can declare modifiable methods with a flag: `--http.api web3,eth,txpool`.

You can also host access to your RPC interface by pointing the service of a web server, like Nginx, to your client's local address and port. This also enables you to setup a certificate for a secure `https` connection to your own RPC. 

The most privacy-preserving and also very simple way to set up a publicly reachable endpoint, you can host it on your own [Tor](https://www.torproject.org/) onion service. This will let you reach the RPC outside your local network without a static public IP address or opened ports. However, keep in mind the RPC is accessible only via the Tor network which is not supported by all the applications and might result in connection issues. 

To do this, you have to create your own [onion service](https://community.torproject.org/onion-services/). Checkout [the documentation](https://community.torproject.org/onion-services/setup/) on onion service setup to host your own. You can point it to a web server with proxy to the RPC port or just directly to the RPC. 

### Operating the node {#operating-the-node}

You should regularly monitor your node to make sure it's running properly. You may need to do occasional maintenance.

#### Keeping node online {#keeping-node-online}

Your node doesn't have to be online nonstop, but you should keep it online as much as possible to keep it in sync with the network. You can shut it down to restart it, but keep in mind that:

- Shutting down can take up to a few minutes if the recent state is still being written on disk.
- Forced shut downs can damage the database.
- Your client will go out of sync with the network and will need to resync when you restart it. This takes depending on how long it has been offline.

_This doesn't apply on consensus layer validator nodes._ Taking your node offline will affect all services dependent on it. If you are running a node for _staking_ purposes you should try to minimize downtime as much as possible.

#### Creating client services {#creating-client-services}

Consider creating a service to run your clients automatically on startup. For example, on Linux servers, good practice would be to create a service, e.g. with `systemd`, that executes the client with proper config, under a user with limited privileges and automatically restarts. 

#### Updating clients {#updating-clients}

You need to keep your client software up-to-date with the latest security patches, features, and [EIPs](/eips/). Especially before [hard forks](/history/), make sure you are running the correct client versions.

> Before important network updates, EF publishes a post on its [blog](blog.ethereum.org). You can [subscribe to these announcements](https://groups.google.com/a/ethereum.org/g/announcements) to get a notification to your mail when your node needs an update. 

Updating clients is very simple. Each client has specific instructions in their documentation, but the process is generally just to download the latest version and restart the client with the new executable. The client should pick up where it left off, but with the updates applied.

Each client implementation has a human-readable version string used in the peer-to-peer protocol but is also accessible from the command line. This version string lets users check they are running the correct version and allows block explorers and other analytical tools interested in quantifying the distribution of specific clients over the network. Please refer to the individual client documentation for more information about version strings.

#### Running additional services {#running-additional-services}

Running your own node lets you use services that require direct access to Ethereum client RPC. These are services built on top of Ethereum like [layer 2 solutions](/developers/docs/scaling/#layer-2-scaling), backend for wallets, block explorers, developer tools and other Ethereum infrastructure.

#### Monitoring the node {#monitoring-the-node}

To properly monitor your node, consider collecting metrics. Clients provide metrics endpoints so you can get comprehensive data about your node. Use tools like [InfluxDB](https://www.influxdata.com/get-influxdb/) or [Prometheus](https://prometheus.io/) to create databases which you can turn into visualizations and charts in software like [Grafana](https://grafana.com/). There are many setups for using this software and different Grafana dashboards for you to visualise your node and the network as a whole. For example, check out [tutorial on monitoring Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/). 

As part of your monitoring, make sure to keep an eye on your machine's performance. During your node's initial sync, the client software may be very heavy on CPU and RAM. In addition to Grafana, you can use the tools your OS offers like `htop` or `uptime` to do this.

## Further reading {#further-reading}

- [Guide | How to setup a validator for Ethereum staking on mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, updated regularly_
- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, updated often_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 May 2020_
- [Deploying Nethermind Ethereum Client with Monitoring Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 July 2020_


## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)
- [Blocks](/developers/docs/blocks/)
- [Networks](/developers/docs/networks/)
