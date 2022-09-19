---
title: چرخاندن گره‌ی اتریوم خودتان
description: مقدمه‌ای عمومی بر اجرای نمونه‌ی خودتان از کلاینت اتریوم.
lang: fa
sidebar: true
sidebarDepth: ۲
---

اجرای گره‌ی خودتان مزایای متنوعی برای شما دارد، امکانات جدیدی را در اختیارتان قرار می‌دهد و به پشتیبانی از اکوسیستم کمک می‌کند. این صفحه شما را برای چرخاندن گره‌ی خودتان و ایفای نقش برای اعتبارسنجی تراکنش‌های اتریوم راهنمایی می‌کند.

Note that after [The Merge](/upgrades/merge), two clients are required to run an Ethereum node; an **execution layer (EL)** client and a **consensus layer (CL)** client. This page will show how to install, configure and connect these two clients to run an Ethereum node.

## پیش‌نیازها {#prerequisites}

شما باید بدانید که گره‌ی اتریوم چیست و چرا ممکن است بخواهید یک کلاینت را اجرا کنید. این موضوع در [گره‌ها و کلاینت‌ها](/developers/docs/nodes-and-clients/) بررسی شده است.

اگر موضوع اجرای یک گره برایتان تازه است یا به دنبال راهی هستید که کمتر فنی باشد، توصیه می‌کنیم ابتدا به مقدمه‌ی کاربرپسند ما درباره‌ی [اجرای یک گره‌ی اتریوم](/run-a-node) نگاهی بیاندازید.

## انتخاب یک رویکرد {#choosing-approach}

اولین گام برای چرخاندن گره‌ی خودتان، انتخاب رویکردتان است. Based on requirements and various possibilities, you must select the client implementation (of both execution and consensus clients), the environment (hardware, system), and the parameters for client settings.

This page will guide you through these decisions and help you find the most suitable way to run your Ethereum instance.

To choose from client implementations, see all the available Mainnet ready [execution clients](/developers/docs/nodes-and-clients/#execution-clients), [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients) and learn about [client diversity](/developers/docs/client-diversity).

Decide whether to run the software on your own [hardware or in the cloud](#local-vs-cloud), considering clients' [requirements](#requirements).

After preparing the environment, install the chosen clients either with [beginner-friendly interface](#automatized-setup) or [manually](#manual-setup) using a terminal with advanced options.

When the node is running and syncing, you are ready to [use it](#using-the-node), but make sure to keep an eye on its [maintanance](#operating-the-node).

![Client setup](./diagram.png)

### محیط زیست و سخت‌افزار {#environment-and-hardware}

#### محلی یا ابری {#local-vs-cloud}

Ethereum clients are able to run on consumer grade computers and don't require any special hardware, like mining machines for example. Therefore, you have various options for deploying the node based on your needs. برای ساده‌سازی، بیایید اجرای یک گره را هم در یک ماشین فیزیکی محلی و هم در یک سرور ابری بررسی کنیم:

- ابر
  - Providers offer high server uptime and static public IP addresses
  - گرفتن سرور اختصاصی یا مجازی ممکن است راحت‌تر از ساختن سرور شخصی باشد
  - بده‌بستان بر سر این است که به یک شخص ثالث - ارائه‌دهده‌ی سرور اعتماد کنیم
  - Because of the required storage size for full node, the price of a rented server might get high
- سخت‌افزار شخصی
  - رویکرد بی‌اعتمادتر و حاکمیتی‌تر
  - سرمایه‌گذاری برای یک بار
  - امکان خرید ماشین‌های پیش‌پیکربندی‌شده
  - You have to physically prepare, maintain, and potentially troubleshoot the machine and networking

هر دو گزینه مزایای متفاوتی دارند که در بالا خلاصه شده است. اگر به دنبال راه‌حل ابری هستید، علاوه بر بسیاری از ارائه‌دهندگان سنتی پردازش ابری، سرویس‌هایی هم وجود دارند که بر روی به‌کارگیری گره‌ها تمرکز دارند. برای مثال:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [Alchemy](https://www.alchemy.com/)

Check out also [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) for more options on hosted nodes.

#### سخت‌افزار {#hardware}

با این حال، یک شبکه‌ی غیرمتمرکز و مقاوم در برابر سانسور نباید بر ارائه‌دهندگان ابری متکی باشد. Instead, running your node on your own local hardware is healthier for the ecosystem. [Estimations](https://www.ethernodes.org/networkType/Hosting) show a large share of nodes run on the cloud, which could become a single point of failure.

Ethereum clients can run on your computer, laptop, server, or even a single-board computer. While running clients on your personal computer is possible, having a dedicated machine just for your node can significantly enhance its performance and security while minimizing the impact on your primary computer.

Using your own hardware can be very easy. There are many simple options as well as advanced setups for more technical people. So let's look into the requirements and means for running Ethereum clients on your machine.

#### الزامات {#requirements}

نیازهای سخت‌افزاری برای هر کلاینت متفاوت است، اما معمولاً آن‌قدر زیاد نیست، چون گره فقط باید همگام بماند. Don't confuse it with mining, which requires much more computing power. با این حال، سخت‌افزار قدرتمندتر زمان همگام‌سازی و عملکرد را بهبود می‌بخشد.

پیش از نصب هر کلاینتی مطمئن شوید که رایانه‌ی شما منابع لازم را برای اجرای آن دارد. You can find the minimum and recommended requirements below.

The bottleneck for your hardware is mostly disk space. Syncing the Ethereum blockchain is very input/output intensive and requires a lot of space. It is best to have a **solid-state drive (SSD)** with hundreds of GBs of free space to spare even after the synchronization.

The size of the database and speed of the initial synchronization depends on the chosen client, its configuration and [sync strategy](/developers/docs/nodes-and-clients/#sync-modes).

همچنین مطمئن شوید که اتصال اینترنت شما دارای [محدودیت پهنای باند](https://wikipedia.org/wiki/Data_cap) نباشد. توصیه می‌شود از یک اتصال نامحدود به اینترنت استفاده کنید، چون حجم پهنای لازم برای همگام‌سازی اولیه و پخش داده‌ها در شبکه ممکن است از محدودیت حجمی پهنای باند شما بیشتر باشد.

##### سیستم‌عامل {#operating-system}

همه‌ی کلاینت‌ها از سیستم‌عامل‌های اصلی یعنی لینوکس، مک‌اواس و ویندوز پشتیبانی می‌کنند. این بدان معناست که می‌توانید گره‌ها را با سیستم‌عاملی (OS) که برای شما مناسب‌تر است، روی رایانه‌های رومیزی یا سرورهای معمولی اجرا کنید. مطمئن شوید که سیستم‌عامل شما به‌روز است تا از مشکلات احتمالی و آسیب‌پذیری‌های امنیتی جلوگیری شود.

##### الزامات حداقلی {#minimum-requirements}

- پردازنده‌ با حداقل 2 هسته
- 8 GB RAM
- 700GB free disk space
- پهنای باند حداقل 10 مگابیت بر ثانیه

##### مشخصات پیشنهادی {#recommended-hardware}

- پردازنده‌ی سریع با حداقل 4 هسته
- حداقل 16 گیگابایت رم
- Fast SSD with 1+TB
- پهنای باند حداقل 25 مگابیت بر ثانیه

The sync mode and client you choose will affect space requirements, but we've estimated the disk space you'll need for each client below.

| کلاینت     | Disk size (snap sync) | فضای حافظه (آرشیو کامل) |
| ---------- | --------------------- | ----------------------- |
| Geth       | بیش از 400 گیگابایت   | 12TB+                   |
| Nethermind | بیش از 400 گیگابایت   | 12TB+                   |
| Besu       | 800GB+                | 12TB+                   |
| Erigon     | اطلاق‌ناپذیر          | 2.5TB+                  |

- Note: Erigon does not offer snap sync, but Full Pruning is possible (~500GB)

For consensus clients, space requirement also depends on client implementation and enabled features (e.g. validator slasher) but generally count with another 200GB needed for beacon data. With a large number of validators, the bandwidth load grows as well. You can find [details on consensus client requirements in this analysis](https://medium.com/@migalabs/analysis-of-ethereum-2-consensus-clients-dfede8e0145e).

#### Plug-and-play solutions {#plug-and-play}

The easiest option for running a node with your own hardware is using plug-and-play boxes. Preconfigured machines from vendors offer the most straightforward experience: order, connect, run. Everything is preconfigured and runs automatically with an intuitive guide and dashboard for monitoring and controlling the software.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### اتریوم روی رایانه‌ی تک‌برد {#ethereum-on-a-single-board-computer}

An easy and cheap way of running an Ethereum node is to use a single board computer, even with an ARM architecture like the Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) provides easy-to-run images of multiple execution and consensus client for Raspberry Pi and other ARM boards.

Small, affordable and efficient devices like these are ideal for running a node at home but keep in mind their limited performence.

## چرخاندن گره {#spinning-up-node}

The actual client setup can be done either with automated launchers or manually, setting up client software directly.

For less advanced users, the recommended approach is to use a launcher, software that guides you through the installation and automates the client setup process. However, if you have some experience of using a terminal, the steps for manual setup should be simple to follow.

### Guided setup {#automatized-setup}

Multiple user-friendly projects aim to improve the experience of setting up a client. These launchers provide automatic client installation and configuration, with some even offering a graphical interface for guided setup and monitoring of clients.

Below are a few projects which can help you install and control clients just with a few clicks:

- [DappNode](https://docs.dappnode.io/get-started/installation/custom-hardware/installation/overview/) - DappNode doesn't come only with a machine from a vendor. The software, the actual node launcher and control center with many features can be used on arbitrary hardware.
- [eth-docker](https://eth-docker.net/docs/About/Overview/) - Automatized setup using Docker focused on easy and secure staking, requires basic terminal and Docker knowledge, recommended for a bit more advanced users.
- [Stereum](https://stereum.net/ethereum-node-setup/) - Launcher for installing clients on a remote server via SSH connection with a GUI setup guide, control center, and many other features.
- [NiceNode](https://www.nicenode.xyz/) - Launcher with a straightforward user experience to run a node on your computer. Just choose clients and start them with a few clicks. Still in development.

### Manual clients setup {#manual-setup}

The other option is to download, verify, and configure the client software manually. Even if some clients offer a graphical interface, a manual setup still requires basic skills with the terminal but offers much more versatility.

As explained before, setting up your own Ethereum node will require running a pair of consensus and execution clients. Some clients might include a light client of the other kind and sync without any other software needed. However, full trustless verification requires both implementations.

#### دریافت نرم‌افزار کلاینت {#getting-the-client}

First, you need to obtain your preferred [execution client](/developers/docs/nodes-and-clients/#execution-clients) and [consensus client](developers/docs/nodes-and-clients/#consensus-clients) software.

You can simply download an executable application or installation package that suits your operating system and architecture. Always verify the signatures and checksums of downloaded packages. Some clients also offer repositories or Docker images for easier installation and updates. All of the clients are open source, so you can also build them from source. This is a more advanced method, but in some cases, it might be required.

Instructions for installing each client are provided in the documentation linked in the client lists above.

Here are the release pages of clients where you can find their pre-built binaries or instructions on installation:

##### کلاینت‌های اجرا {#execution-clients}

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon#usage) (Doesn't provide a pre-built binary, has to be compiled)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)

It is also worth noting that client diversity is an [issue on the execution layer](/developers/docs/client-diversity/#execution-layer). It is recommended that readers consider running a minority execution client.

##### کلاینت‌های اجماع {#consensus-clients}

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/install/source/) (Doesn't provide a pre-built binary, only a Docker image or to be build from source)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Client diversity](/developers/docs/nodes-and-clients/client-diversity/) is critical for consensus nodes running validators. If majority of validators is running a single client implementation, network security is at risk. It is therefore recommended to consider choosing a minority client.

[See the latest network client usage](https://clientdiversity.org/) and learn more about [client diversity](/developers/docs/client-diversity).

##### Verifying the software {#verifying-the-software}

When downloading software from the internet, it's recommended to verify its integrity. This step is optional but especially with crucial infrastracture piece like the Ethereum client, it's important to be aware of potential attack vectors and avoid them. If you downloaded a pre-built binary, you need to trust it and risk that an attacker could swap the executable for a malicious one.

Developers sign released binaries with their PGP keys so you can cryptographically verify you are running exactly the software they created. You just need to obtain public keys used by developers, which can be found on client release pages or in documentation. After downloading the client release and its signature, you can use a PGP implementation, e.g. [GnuPG](https://gnupg.org/download/index.html) to easily verify them. Check out a tutorial on veryifing open-source software using `gpg` on [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) or [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Another form of verification is to make sure that the hash, a unique cryptographic fingerprint, of the software you downloaded matches the one provided by developers. This is even easier than using PGP, and some clients offer only this option. Just run the hash function on the downloaded software and compare it to the one from the release page. برای مثال:

```
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Client setup {#client-setup}

After installing, downloading, or compiling the client software, you are ready to run it. This only means it has to be executed with the proper configuration. Clients offer rich configuration options, which can enable various features.

Let's start with options that can significantly influence client performance and data usage. [حالت‌های همگام‌سازی](/developers/docs/nodes-and-clients/#sync-modes) روش‌های مختلف بارگیری و اعتبارسنجی داده‌های زنجیره‌ی بلوکی را نشان می‌دهند. پیش از آغاز گره، باید تصمیم بگیرید که از کدام شبکه و کدام حالت همگام‌سازی استفاده نمایید. The most important things to consider are the disk space, and sync time the client will need. Pay attention to the client's docs to determine which sync mode is the default. If that doesn't suit you, pick another one based on the level of security, available data, and cost. به غیر از الگوریتم همگام‌سازی، می‌توانید هرس (pruning) انواع مختلف داده‌های قدیمی را نیز تنظیم کنید. هرس امکان حذف داده‌های قدیمی را فراهم می‌کند، به‌عنوان مثال حذف گره‌های درخت وضعیت که از بلوک‌های اخیر غیرقابل‌دسترسی هستند.

Other basic configuration options are, e.g. choosing a network - Mainnet or testnets, enabling HTTP endpoint for RPC or WebSockets, etc. You can find all features and options in the client's documentation. Various client configurations can be set by executing the client with the corresponding flags directly in the CLI or config file. Each client is a bit different; please always refer to its official documentation or help page for details on config options.

For testing purposes, you might prefer to run a client on one of the testnet networks. [مشخصات کلی شبکه‌های پشتیبانی‌شده را مشاهده کنید](/developers/docs/nodes-and-clients/#execution-clients).

Examples of running execution clients with basic configuration can be found in next section.

#### آغاز به‌کار کلاینت اجرا {#starting-the-execution-client}

Before starting the Ethereum client software, perform a last check that your environment is ready. برای مثال، مطمئن شوید که:

- There is enough disk space considering the chosen network and sync mode.
- حافظه و پردازنده توسط برنامه‌های دیگر استفاده نمی‌شود.
- Operating system is updated to the latest version.
- System has the correct time and date.
- روتر و فایروال شما اتصالات را در پورت‌های شنونده (listening ports) می‌پذیرند. به طور پیش‌فرض کلاینت‌های اتریوم از یک پورت شنونده (TCP) و یک پورت یابنده (UDP) که هر دو به‌طور پیش‌فرض روی 30303 هستند استفاده می‌کنند.

کلاینت خود را ابتدا روی شبکه‌ی تست اجرا کنید تا مطمئن شوید که همه‌‌چیز به‌درستی کار می‌کند. [اجرای یک گره سبک geth‏](/developers/tutorials/run-light-node-geth/) باید کارگشا باشد.

شما باید هرگونه تنظیمات کلاینت که به صورت پیش‌‌فرض وجود ندارند را در ابتدا مشخص کنید. می‌توانید از پرچم‌ها و فایل‌های پیکربندی برای مشخص کردن پیکربندی موردنظر استفاده کنید. Set of features and config syntax of each client differs. Check out your client's documentation for the specifics.

Execution and consensus clients communicate via an authenticated endpoint specified in [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). In order to connect to a consensus client, the execution client must generate a [`jwtsecret`](https://jwt.io/) at a known path. For security and stability reasons, clients should run on the same machine, and both clients must know this path as it is used to authenticate a local RPC connection between them. کلاینت اجرا همچنین باید یک پورت شنونده (listening port) برای APIهای تایید شده تعریف کند.

This token is generated automatically by the client software, but in some cases, e.g. during pre-Merge testing, you might need to do it yourself. You can generate it by running:

```
openssl rand -hex 32 > jwtsecret
```

**Note that it is recommended to connect an execution and consensus client on a testnet only for now (e.g. Kiln, Ropsten, Sepolia, Goerli) and await merge-ready client releases before replicating the process on Mainnet.**

#### Running an execution client {#running-an-execution-client}

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

##### Running Besu

This example starts Besu on mainnet, stores blockchain data in default format at `/data/ethereum`, enables JSON RPC and Engine RPC for connecting consensus client. Engine API is authenticated with token `jwtsecret` and only calls from `localhost` are allowed.

```
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu also comes with a launcher option which will ask a series of questions and generate the config file. Run the interactive launcher using:

```
besu --Xlauncher
```

Besu's [documentation](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/) contains additional options and configuration details.

##### Running Erigon

This example starts Erigon on mainnet, stores blockchain data at `/data/ethereum`, enables JSON RPC, defines which namespaces are allowed and enables authentication for connecting the consensus client which is defined by the `jwtsecret` path.

```
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon by default performs a full sync with 8GB HDD which will result in more than 2TB of archive data. Make sure `datadir` is pointing to disk with enough free space or look into `--prune` flag which can trim different kinds of data. Check the Erigon's `--help` to learn more.

##### Running Geth

This example starts Geth on mainnet, stores blockchain data at `/data/ethereum`, enables JSON RPC and defines which namespaces are allowed. It also enables authentication for connecting consensus client which requires path to `jwtsecret` and also option defining which connections are allowed, in our example only from `localhost`.

```
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --http.api="eth,web3,net" \
    --authrpc.vhosts="localhost" \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Check [docs for all configuration options](https://geth.ethereum.org/docs/interface/command-line-options) and learn more about [running Geth with a consensus client](https://geth.ethereum.org/docs/interface/consensus-clients).

##### Running Nethermind

Nethermind offers various [installation options](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started). The package comes with various binaries, including a Launcher with a guided setup, which will help you to create the configuration interactively. Alternatively, you find Runner which is the executable itself and you can just run it with config flags. JSON RPC is enabled by default.

```
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nethermind docs offer a [complete guide](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge) on running Nethermind with consensus client.

Execution client will initiate its core functions, chosen endpoints, and start looking for peers. پس از یافتن موفق همتایان، کلاینت شروع به همگام‌سازی می‌کند. After the Merge, it awaits the connection from consensus client. داده‌های کنونی زنجیره‌ی بلوکی زمانی آماده خواهد بود که کلاینت به‌طور موفقیت‌آمیز با وضعیت فعلی همگام‌سازی کرده باشد.

#### آغاز به‌کار کلاینت اجماع {#starting-the-consensus-client}

The consensus client must be started with the right port configuration to establish a local RPC connection to the execution client. The consensus clients have to be run with the exposed execution client port as configuration argument.

The consensus client also needs the path to the execution client's `jwt-secret` in order to authenticate the RPC connection between them. Similar to execution examples above, each consensus client has a configuration flag which takes the jwt token file path as an argument. این مسیر باید با مسیر `jwtsecret` ارائه‌شده به کلاینت اجرا مطابقت داشته باشد.

If you plan to run a validator, make sure to add a configuration flag which specifies Ethereum address of the fee recipient. This is where ether rewards for your validator accumulates. Each consensus client has an option e.g. `--suggested-fee-recipient=0xabcd1` that takes an Ethereum address as an argument.

**Note that we recommend waiting for merge-ready client releases before doing this on Ethereum Mainnet—for now just practice on a testnet such as Kiln, Ropsten, Sepolia or Goerli**

When starting Beacon Node on testnet, you can significantly save syncing time by using public endpoint for [Checkpoint sync](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Running a consensus client

##### Running Lighthouse

Before running Lighthouse, learn more on how to install and configure it in [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```
lighthouse beacon_node
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution.urls http://127.0.0.1:8551 \
    --jwt-secret="/path/to/jwtsecret" \
```

##### Running Lodestar

Install Lodestar software by compiling it or downloading the Docker image. Learn more in [docs](https://chainsafe.github.io/lodestar/) and more comprehensive [setup guide](https://hackmd.io/@philknows/rk5cDvKmK).

```
lodestar beacon \
    --rootDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Running Nimbus

Nimbus comes with both consensus and execution clients. It can be run on various devices even with very modest computing power. After [installing dependencies and Nimbus itself](https://nimbus.guide/quick-start.html), you can run its consensus client:

```
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Running Prysm

Prysm comes with script which allows easy automatic installation. Details can be found in the [Prysm docs](https://docs.prylabs.network/docs/install/install-with-script).

```
./prysm.sh beacon-chain \
    --mainnet
    --datadir /data/ethereum  \
    --http-web3provider=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Running Teku

```
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret" \
```

Learn more about running Merge ready setup with Teku in [its documentation](https://docs.teku.consensys.net/en/22.8.0/HowTo/Prepare-for-The-Merge/).

Consensus client connects to the execution client to read the deposit contract and identify validators. It also connects to other Beacon Node peers and syncs consensus slots from genesis. When it reaches the current epoch, the Beacon API becomes usable for your validators. Learn more about [Beacon Node APIs](https://eth2docs.vercel.app/).

### افزودن اعتبارسنج‌ها {#adding-validators}

Consensus client serves as a Beacon Node to which validator client connects. Each consensus client has its own validator software described in detail in its respective documentation.

Running your own validator allows for [solo staking](https://ethereum.org/en/staking/solo/), the most impactful and trustless way. This requires a deposit of 32 ETH. For running a validator on your own node with a smaller amount, a decentralized pool with permissionless node operators, such as [Rocket Pool](https://rocketpool.net/node-operators), might interest you.

The easiest way to get started with staking and validator key generation is to use the [Prater Testnet Staking Launchpad](https://prater.launchpad.ethereum.org/), which allows you to test your setup by [running nodes on Goerli](https://notes.ethereum.org/@launchpad/goerli). وقتی برای شبکه‌ی اصلی آماده شدید، می‌توانید این مراحل را با استفاده از [سکوی پرتاب سهام‌گذاری شبکه‌ی اصلی](https://launchpad.ethereum.org/) تکرار کنید. Make sure to check [Mainnet readiness checklist](https://launchpad.ethereum.org/en/merge-readiness) to smoothly run your validator through the Merge.

### استفاده کردن از گره {#using-the-node}

Execution clients offer [RPC API endpoints](/developers/docs/apis/json-rpc/) that you can use to submit transactions, interact with or deploy smart contracts on the Ethereum network in various ways:

- فراخوانی دستی آن‌ها با یک پروتکل مناسب (مثلاً با استفاده از `curl`)
- ضمیمه کردن کنسول ارائه‌شده (مثلاً `geth attach`)
- Implementing them in applications using web3 libraries, e.g. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

کلاینت‌های مختلف پیاده‌سازی‌های مختلفی برای نقاط پایانی RPC دارند. اما برای JSON-RPC استانداردی وجود دارد که می‌توانید برای هر کلاینتی استفاده نمایید. برای مروری اجمالی، [مستندات JSON-RPC را بخوانید](/developers/docs/apis/json-rpc/). برنامه‌های کاربردی که نیاز به اطلاعات از شبکه‌ی اتریوم دارند می‌توانند از RPC استفاده کنند. For example, popular wallet MetaMask lets you [connect to your own RPC endpoint](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) which has strong privacy and security benefits.

کلاینت‌های اجماع همگی یک [API بیکن](https://ethereum.github.io/beacon-APIs) را در معرض نمایش می‌گذارند که می‌تواند با ارسال درخواست با استفاده از ابزارهایی مانند [Curl](https://curl.se) برای بررسی وضعیت کلاینت اجماع یا بارگیری کردن بلوک‌ها و داده‌های اجماع استفاده شود. اطلاعات بیشتر در این مورد را می‌توان در اسناد مربوط به هر کلاینت اجماع یافت.

#### دستیابی به RPC {#reaching-rpc}

The default port for the execution client JSON-RPC is `8545` but you can modify the ports of local endpoints in the configuration. در حالت پیش‌فرض، رابط RPC فقط در هاست محلی (localhost) رایانه‌ی شما قابل دسترسی است. برای اینکه بتوانید از راه دور به آن دسترسی داشته باشید، می‌توانید با تغییر آدرس به `0.0.0.0` آن را در معرض دید عموم قرار دهید. This will make it reachable over local network and public IP addresses. در بیشتر موارد، باید روی روتر خود بازارسالی پورت (port forwarding) را هم تنظیم کنید.

شما باید این کار را با احتیاط انجام دهید، چون هر کسی در اینترنت اجازه می‌دهد گره‌ی شما را کنترل کند. اگر از کلاینت خود به‌عنوان کیف پول استفاده می‌کنید، بازیگران بداندیش می‌توانند به گره‌ی شما دسترسی پیدا کنند تا سیستم شما را خراب کنند یا سرمایه‌های شما را بدزدند.

راه‌حل این مشکل، جلوگیری از تغییرپذیری روش‌های بالقوه خطرناک RPC است. برای مثال، با Geth، می‌توانید روش‌های اصلاح‌پذیر را با یک پرچم اعلام کنید: `‎--http.api web3,eth,txpool`.

You can also host access to your RPC interface by pointing the service of a web server, like Nginx, to your client's local address and port. This also enables you to setup a certificate for a secure `https` connection to your own RPC.

The most privacy-preserving and also very simple way to set up a publicly reachable endpoint, you can host it on your own [Tor](https://www.torproject.org/) onion service. بدین ترتیب می‌توانید به RPC خارج از شبکه‌ی محلی خود بدون آدرس آی‌پی (IP) عمومی ثابت یا پورت‌های باز شده دسترسی پیدا کنید. However, keep in mind the RPC is accessible only via the Tor network which is not supported by all the applications and might result in connection issues.

To do this, you have to create your own [onion service](https://community.torproject.org/onion-services/). Checkout [the documentation](https://community.torproject.org/onion-services/setup/) on onion service setup to host your own. You can point it to a web server with proxy to the RPC port or just directly to the RPC.

### گرداندن گره {#operating-the-node}

شما باید به‌طور مرتب گره خود را کنترل کنید تا مطمئن شوید که به درستی کار می‌کند. ممکن است نیاز به انجام تعمیرات گاه‌به‌گاه داشته باشید.

#### آنلاین نگه‌داشتن گره {#keeping-node-online}

Your node doesn't have to be online nonstop, but you should keep it online as much as possible to keep it in sync with the network. You can shut it down to restart it, but keep in mind that:

- اگر وضعیت اخیر همچنان روی دیسک نوشته می‌شود، خاموش شدن می‌تواند تا چند دقیقه طول بکشد.
- خاموش شدن اجباری می‌تواند به پایگاه داده آسیب برساند.
- کلاینت شما با شبکه همگام نخواهد شد و با راه‌اندازی مجدد باید دوباره همگام شود. This takes depending on how long it has been offline.

_این موضوع روی گره‌های اعتبار سنج لایه‌ی اجماع اعمال نمی‌شود._ آفلاین کردن گره‌ی شما بر تمام سرویس‌های وابسته به آن تأثیر می‌گذارد. اگر یک گره را برای _سهام‌گذاری_ اجرا می‌کنید، باید سعی کنید زمان خاموشی را تا حد امکان پایین آورید.

#### ساختن سرویس‌های کلاینت {#creating-client-services}

ساختن سرویسی را برای اجرای خودکار کلایتن‌های خود در هنگام راه‌اندازی در نظر بگیرید. For example, on Linux servers, good practice would be to create a service, e.g. with `systemd`, that executes the client with proper config, under a user with limited privileges and automatically restarts.

#### به‌روزرسانی کلاینت‌ها {#updating-clients}

شما باید نرم‌افزار کلاینت خود را با آخرین پچ‌های امنیتی، ویژگی‌ها و [EIPها](/eips/) به‌روز نگه‌دارید. به‌ویژه قبل از [فورک سخت](/history/)، مطمئن شوید که نسخه‌های کلاینت صحیح را اجرا می‌کنید.

> Before important network updates, EF publishes a post on its [blog](blog.ethereum.org). You can [subscribe to these announcements](https://groups.google.com/a/ethereum.org/g/announcements) to get a notification to your mail when your node needs an update.

به‌روزرسانی کردن کلاینت‌ها بسیار ساده است. Each client has specific instructions in their documentation, but the process is generally just to download the latest version and restart the client with the new executable. The client should pick up where it left off, but with the updates applied.

هر پیاده‌سازی کلاینت دارای یک رشته نسخه قابل‌خواندن توسط انسان است که در پروتکل همتا به همتا استفاده می‌شود، اما از طریق خط فرمان نیز قابل‌دسترسی است. این رشته نسخه به کاربران امکان می دهد بررسی کنند که آیا نسخه صحیح را اجرا می‌کنند یا نه و به جستجوگر‌های بلوک و سایر ابزارهای تحلیلی علاقه‌مند به تعیین کمیت توزیع مشتریان خاص اجازه‌ی دسترسی به شبکه را می‌دهد. لطفاً جهت کسب اطلاعات بیشتر در مورد رشته‌های نسخه به مستندات هر کلاینت مراجعه کنید.

#### اجرای سرویس‌های اضافه {#running-additional-services}

اجرای گره خودتان به شما امکان می‌دهد از خدماتی استفاده کنید که نیاز به دسترسی مستقیم به RPC کلاینت اتریوم دارند. These are services built on top of Ethereum like [layer 2 solutions](/developers/docs/scaling/#layer-2-scaling), backend for wallets, block explorers, developer tools and other Ethereum infrastructure.

#### نظارت بر گره {#monitoring-the-node}

To properly monitor your node, consider collecting metrics. کلاینت‌ها نقاط‌ پایانی‌های معیارها را ارائه می‌دهند که شما بتوانید داده‌های جامعی درباره‌ی گره‌ی خود دریافت کنید. از ابزارهایی مثل [InfluxDB](https://www.influxdata.com/get-influxdb/) یا [Prometheus](https://prometheus.io/) برای ساخت پایگاه داده‌هایی استفاده کنید که می‌توانید با استفاده از نرم‌افزارهایی مثل [Grafana](https://grafana.com/) آن‌ها را تبدیل به بازنمایی بصری و نمودار کنید. تنظیمات زیادی برای استفاده از این نرم‌افزار و داشبوردهای مختلف Grafana وجود دارد تا بتوانید گره‌ی خود و شبکه را کاملاً به شکل بصری بازنمایی کنید. For example, check out [tutorial on monitoring Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

به‌عنوان بخشی از نظارت خود، مطمئن شوید که عملکرد دستگاه خود را زیر نظر داشته باشید. در طول همگام‌‌سازی اولیه‌ی گره شما، ممکن است نرم‌افزار کلاینت برای پردازنده و رم بسیار سنگین باشد. علاوه بر Grafana می‌توانید از ابزارهایی که سیستم‌عاملتان به شما ارائه می‌دهد، مثل `htop` یا `uptime`، برای این کار استفاده کنید.

## بیشتر بخوانید {#further-reading}

- [Guide | How to setup a validator for Ethereum staking on mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, updated regularly_
- [ETHStaker guides on running validators on testnets](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, updated regularly_
- [Ethereum Staking Guides](https://github.com/SomerEsat/ethereum-staking-guides) _– Somer Esat, updated regularly_
- [The Merge FAQ for node operators](https://notes.ethereum.org/@launchpad/node-faq-merge) - _July 2022_
- [تحلیل نیازمندی‌های سخت‌افزاری برای تبدیل شدن به یک گره‌ی کامل معتبر اتریوم](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– آلبرت پالا، 24 سپتامبر 2018_
- [اجرای گره‌های کامل اتریوم: راهنمایی برای افراد کم‌انگیزه](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– جاستین لروکس، 7 نوامبر 2019_
- [اجرای یک گره‌ی اتریوم](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub، به‌طور مرتب به‌روزرسانی می‌شود_
- [اجرای یک گره‌ی هایپرلجر Besu روی شبکه‌ی اصلی اتریوم: مزایا، نیازمندی‌ها و راه‌اندازی](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– فلیپ فراگی، 7 مه 2020_
- [به‌کارگیری کلاینت اتریوم Nethermind با پشته‌ی نظارت](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _- Nethermind.eth،‏ 8 ژوئیه 2020_

## موضوعات مرتبط {#related-topics}

- [گره‌ها و کلاینت‌ها](/developers/docs/nodes-and-clients/)
- [بلاک‌ها](/developers/docs/blocks/)
- [شبکه‌ها](/developers/docs/networks/)
