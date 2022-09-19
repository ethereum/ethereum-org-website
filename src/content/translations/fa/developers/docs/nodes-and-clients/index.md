---
title: گره‌ها و کلاینت‌ها
description: نگاهی اجمالی بر گره‌ها و نرم‌افزار کلاینت اتریوم، به علاوه‌ی نحوه‌ی راه‌اندازی یک گره و علت انجام آن.
lang: fa
sidebar: true
sidebarDepth: 2
---

اتریوم یک شبکه توزیع‌شده از رایانه‌ها (معروف به گره‌ها) است که نرم‌افزاری را اجرا می‌کنند که می‌تواند بلوک‌ها و داده‌های تراکنش را تأیید کند. برنامه‌ی کاربردی نرم افزاری که به‌عنوان کلاینت شناخته می‌شود، باید بر روی رایانه‌ی شما اجرا شود تا آن را به یک گره‌ی اتریوم تبدیل کند.

**توجه: هنوز هم می‌توان یک کلاینت اجرا را به‌تنهایی اجرا کرد. با این حال، این کار پس از [ادغام](/upgrades/merge) دیگر امکان‌ذیر نخواهد بود. پس از ادغام، کلاینت‌های اجرا و اجماع باید با هم اجرا شوند تا کاربر به شبکه‌ی اتریوم دسترسی پیدا کند. برخی از شبکه‌های تست (مثلاً Kiln‏، Ropsten) قبلاً نسخه‌های ادغام خود را داشته‌اند، به این معنی که کلاینت‌های اجرایی به‌تنهایی برای دسترسی به آن شبکه‌ها کافی نیستند، مگر اینکه با کلاینت اجماعی همراه شوند که بتواند سر زنجیره را دنبال کند.**

## پیش‌نیازها {#prerequisites}

پیش از آن که نمونه‌ی کلاینت اتریوم خود را اجرا کنید و در این موضوع عمیق شوید باید [مبانی ماشین مجازی اتریوم](/developers/docs/evm/) و شبکه‌ی همتا‌به‌همتا را بدانید و متوجه شوید. به [معرفی اتریوم](/developers/docs/intro-to-ethereum/) ما نگاهی بیاندازید.

اگر تازه با موضوع گره‌ها آشنا شده‌اید، توصیه می‌کنیم ابتدا مقدمه‌ی کاربرپسند ما درباره‌ی [اجرای یک گره‌ی اتریوم](/run-a-node) را مطالعه کنید.

## کلاینت‌ها و گره‌ها چه هستند؟ {#what-are-nodes-and-clients}

A "node" is any instance of Ethereum client software that is connected to other computers also running Ethereum software, forming a network. A client is an implementation of Ethereum that verifies data against the protocol rules and keeps the network secure.

Post-Merge Ethereum consists of two parts: the execution layer and the consensus layer. Both layers are run by different client software. On this page, we'll refer to them as the execution client and consensus client.

- The execution client (also known as the Execution Engine, EL client or formerly the Eth1 client) listens to new transactions broadcasted in the network, executes them in EVM, and holds the latest state and database of all current Ethereum data.
- The consensus client (also known as the Beacon Node, CL client or formerly the Eth2 client) implements the proof-of-stake consensus algorithm, which enables the network to achieve agreement based on validated data from the execution client.

Before [The Merge](/upgrades/merge/), consensus and execution layer were separate networks, with all transactions and user activity on the Ethereum happening at what is now the execution layer. One client software provided both execution environment and consensus verification of blocks produced by miners. The consensus layer, [the Beacon Chain](/upgrades/beacon-chain/), has been running separately since December 2020. It introduced proof-of-stake and coordinated the network of validators based on data from the Ethereum network.

With the Merge, Ethereum transitions to proof-of-stake by connecting these networks. Execution and consensus clients work together to verify Ethereum's state.

Modular design with various software pieces working together is called [encapsulated complexity](https://vitalik.ca/general/2022/02/28/complexity.html). This approach makes it easier to execute The Merge seamlessly and enables the reuse of individual clients, for example, in the [layer 2 ecosystem](/layer-2/).

![کلاینت اجرا و اجماع کنار هم](./eth1eth2client.png) نمودار ساده‌شده‌ی کلاینت اجرا و اجماع کنار هم.

### تنوع کلاینت‌ها {#client-diversity}

Both [execution clients](/developers/docs/nodes-and-clients/#execution-clients) and [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients) exist in a variety of programming languages developed by different teams.

Multiple client implementations can make the network stronger by reducing its dependency on a single codebase. The ideal goal is to achieve diversity without any client dominating the network, thereby eliminating a potential single point of failure. The variety of languages also invites a broader developer community and allows them to create integrations in their preferred language.

Learn more about [client diversity](/developers/docs/nodes-and-clients/client-diversity/).

What these implementations have in common is they all follow a single specification. Specifications dictate how the Ethereum network and blockchain functions. Every technical detail is defined and specifications can be found as:

- Originally, the [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Execution specs](https://github.com/ethereum/execution-specs/)
- [Consensus specs](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) implemented in various [network upgrades](/history/)

### Tracking nodes in the network {#network-overview}

Multiple trackers offer a real-time overview of nodes in the Ethereum network. Note that due to the nature of decentralized networks, these crawlers can only provide a limited view of the network and might report different results.

- [Map of nodes](https://etherscan.io/nodetracker) by Etherscan
- [Ethernodes](https://ethernodes.org/) by Bitfly
- [Ethereum Node Crawler](https://crawler.ethereum.org/)
- [Nodewatch](https://www.nodewatch.io/) by Chainsafe, crawling consensus nodes

## انواع گره {#node-types}

اگر می‌خواهید [گره‌ی خودتان را اجرا کنید](/developers/docs/nodes-and-clients/run-a-node/)، باید بدانید که گره‌های مختلفی وجود دارند که داده‌های مختلفی را استفاده می‌کنند. In fact, clients can run three different types of nodes: light, full and archive. There are also options of different sync strategies which enable faster synchronization time. همگام‌سازی به این اشاره دارد که با چه سرعتی می‌توان به‌روزترین اطلاعات را در مورد وضعیت اتریوم دریافت کرد.

### گره‌ی کامل {#full-node}

- داده‌های زنجیره‌ی بلوکی کامل را به‌طور کامل ذخیره می‌کند (اگرچه حشو و زواید این داده‌ها به صورت دوره‌ای حذف می‌شود، بنابراین یک گره‌ی کامل تمام داده‌های حالت را از زمان پیدایش تاکنون ذخیره نمی‌کند)
- در اعتبارسنجی بلوک‌ها شرکت می‌کند و همه‌ی وضعیت‌ها و بلوک‌ها را تأیید می‌کند.
- همه حالت‌ها را می‌توان از یک گره‌ی کامل مشتق کرد (گرچه حالت‌های بسیار قدیمی از درخواست‌های ارسال شده به گره‌های آرشیو بازسازی می‌شوند).
- در خدمت شبکه است و داده‌ها را در زمان درخواست ارائه می‌دهد.

### گره‌ی سبک {#light-node}

گره‌های سبک به جای بارگیری کردن هر بلوک، هدر بلوک را بارگیری می‌کنند. این هدرها فقط حاوی اطلاعات خلاصه در مورد محتویات بلوک‌ها هستند. هرگونه اطلاعات دیگر مورد نیاز گره‌ی سبک، از یک گره‌ی کامل درخواست می‌شود. سپس گره‌ی سبک می‌تواند به طور مستقل داده‌هایی را که دریافت می‌کند با توجه به ریشه‌های حالت در هدرهای بلوک تأیید کند. گره‌های سبک به کاربران امکان می‌دهند بدون سخت‌افزار قدرتمند یا پهنای باند بالا که برای اجرای گره‌های کامل لازم است، در شبکه‌ی اتریوم مشارکت کنند. در نهایت، گره‌های سبک ممکن است روی تلفن‌های همراه یا دستگاه‌های تعبیه‌شده اجرا شوند. گره‌های سبک در اجماع شرکت نمی‌کنند (یعنی نمی‌توانند استخراج‌گر/اعتبارسنج باشند)، اما می‌توانند با همان عملکرد یک گره‌ی کامل به زنجیره‌‌ی بلوکی اتریوم دسترسی داشته باشند.

کلاینت اجرای Geth شامل یک گزینه‌ی [همگام‌سازی سبک](https://github.com/ethereum/devp2p/blob/master/caps/les.md) است. با این حال، یک گره‌ی سبک Geth متکی به گره‌های کاملی است که داده‌های گره‌ی سبک را ارائه می‌دهند. تعداد کمی از گره‌های کامل انتخاب می‌کنند که داده‌های گره‌ی سبک را ارائه کنند، به این معنی که گره‌های سبک اغلب نمی‌توانند همتایان را پیدا کنند. در حال حاضر هیچ کلاینت سبک آماده‌ی تولیدی در لایه‌ی اجماع وجود ندارد. با این حال، چندین کلاینت از این نوع در حال توسعه هستند.

همچنین مسیرهای بالقوه‌ای برای ارائه‌ی داده‌های کلاینت سبک از طریق [شبکه‌ی شایعه](https://www.ethportal.net/) وجود دارد. این خودش مزیت است، زیرا شبکه‌ی شایعه می‌تواند شبکه‌ای از گره‌های سبک را بدون نیاز به گره‌های کامل برای ارائه‌ی درخواست‌ها پشتیبانی کند.

اتریوم هنوز از گره‌های سبک پرتعدادی پشتیبانی نمی‌کند، اما پشتیبانی از گره‌های سبک حوزه‌ای است که انتظار می‌رود در آینده‌ی نزدیک به‌سرعت توسعه یابد.

### گره‌‌ی آرشیو {#archive-node}

- هر چیزی که در گره کامل نگهداری می‌شود را ذخیره می‌کند و یک آرشیو کامل از حالت‌های تاریخی می‌سازد. It is needed if you want to query something like an account balance at block #4,000,000, or simply and reliably test your own transactions set without mining them using tracing.
- This data represents units of terabytes, which makes archive nodes less attractive for average users but can be handy for services like block explorers, wallet vendors, and chain analytics.

همگام‌سازی کلاینت‌ها در هر حالتی غیر از آرشیو منجر به کاهش داده‌های زنجیره‌ی بلوکی می‌شود. این بدان معناست که هیچ آرشیوی از تمام حالت‌های تاریخی وجود ندارد اما گره‌ی کامل قادر است آن‌ها را بنا به تقاضا بسازد.

## چرا باید یک گره‌ی اتریوم را اجرا کنم؟ {#why-should-i-run-an-ethereum-node}

Running a node allows you to directly, trustlessly and privately use Ethereum while supporting the network by keeping it more robust and decentralized.

### مزایا برای شما {#benefits-to-you}

Running your own node enables you to use Ethereum in a private, self-sufficient and trustless manner. نیازی نیست به شبکه اعتماد کنید زیرا می‌توانید داده‌ها را خودتان با کلاینت خود تأیید کنید. «اعتماد نکنید، اعتبارسنجی کنید» یکی از شعارهای اصلی زنجیره‌ی بلوکی است.

- گره‌ی شما تمام تراکنش‌ها و بلوک‌ها را با توجه به قوانین اجماع به تنهایی اعتبارسنجی می‌کند. این نکته به این معنی است که شما نیازی به اتکا به هیچ گره‌ی دیگری در شبکه یا اعتماد تام به آن‌ها ندارید.
- You can use an Ethereum wallet with your own node. You can use dapps more securely and privately because you won't have to leak your addresses and balances to random nodes. همه‌چیز می‌تواند با کلاینت خودتان بررسی شود. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), and [many other wallets](/wallets/find-wallet/) offer RPC-importing, allowing them to use your node.
- You can run and self-host other services which depend on data from Ethereum. For example, this might be a Beacon Chain validator, software like layer 2, infrastructure, block explorers, payment processors, etc.
- You can provide your own custom [RPC endpoints](https://ethereum.org/en/developers/docs/apis/json-rpc/). Publicly for the community or even privately hosted Ethereum endpoint enables people to use your node and avoid big centralized providers.
- شما می‌توانید با استفاده از **ارتباط بین پردازشی (IPC)** گره‌ی خود را متصل کنید یا برای بارگذاری برنامه‌ی خود به‌عنوان افزونه آن را بازنویسی کنید. This grants low latency, which helps a lot, e.g. when processing a lot of data using web3 libraries or when you need to replace your transactions as fast as possible (i.e. frontrunning).
- You can directly stake ETH to secure the network and earn rewards. See [solo staking](https://ethereum.org/en/staking/solo/) to get started.

![چگونه با استفاده از برنامه‌های کاربردی و گره‌ها به اتریوم دسترسی داشته باشید](./nodes.png)

### مزایای شبکه {#network-benefits}

داشتن مجموعه‌ی متنوعی از گره‌ها برای سلامت، امنیت و انعطاف‌پذیری عملیاتی اتریوم حائظ اهمیت است.

- Full nodes enforce the consensus rules so they can’t be tricked into accepting blocks that don't follow them. This provides extra security in the network because if all the nodes were light nodes, which don't do full verification, validators could attack the network.
- In case of an attack which overcomes the crypto-economic defenses of [proof-of-stake](/developers/docs/consensus-mechanisms/pos/#what-is-pos), a social recovery can be performed by full nodes choosing to follow the honest chain.
- More nodes in the network result in a more diverse and robust network, the ultimate goal of decentralization, which enables a censorship-resistant and reliable system.
- آن‌ها دسترسی به داده‌های زنجیره‌ی بلوکی را برای کلاینت‌های سبکی که به آن وابسته هستند فراهم می‌کنند. در پیک‌های استفاده‌ی زیاد، باید گره‌های کامل کافی برای همگام‌سازی گره‌های سبک وجود داشته باشد. گره‌های سبک همه‌ی زنجیره بلوکی را ذخیره نمی‌کنند و به جای آن داده‌ها را با [ریشه‌ی حالت درون هدر بلوک‌ها](/developers/docs/blocks/#block-anatomy) اعتبارسنجی می‌کنند. آن‌ها می‌توانند در صورت نیاز اطلاعات بیشتری را از بلوک‌ها درخواست کنند.

اگر یک گره‌ی کامل را اجرا کنید، کل شبکه‌ی اتریوم از آن سود می‌برد.

## اجرای گره‌ی خودتان {#running-your-own-node}

دوست دارید کلاینت اتریوم خودتان را اجرا کنید؟

جهت مطالعه‌ی مقدمه‌ای ویژه‌ی مبتدیان، از صفحه‌ی [اجرای یک گره](/run-a-node)‌ی ما دیدن کنید تا بیشتر بدانید.

If you're more of a technical user, dive into more details and options on how to [spin up your own node](/developers/docs/nodes-and-clients/run-a-node/).

## جایگزین‌ها {#alternatives}

Setting up your own node can cost you time and resources but you don’t always need to run your own instance. در این مورد شما می‌توانید از وب سرویس‌ طرف ثالث مثل [Infura](https://infura.io)،‏ [Alchemy](https://alchemyapi.io) یا [QuikNode](https://www.quiknode.io) استتفاده کنید. Alternatively, [ArchiveNode](https://archivenode.io/) is a community-funded Archive node that hopes to bring archive data on the Ethereum blockchain to independent developers who otherwise couldn't afford it. برای مروری بر استفاده از این سرویس‌ها، [گره‌ها به‌عنوان سرویس](/developers/docs/nodes-and-clients/nodes-as-a-service/) را مطالعه کنید.

اگر شخصی یک گره‌ی اتریوم را با یک API عمومی در اجتماع شما اجرا می‌کند، می‌توانید کیف پول‌های سبک خود (مانند MetaMask) را [از طریق RPC سفارشی](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) به یک گره‌ی اجتماعی هدایت کنید و نسبت به طرف ثالث مورد اعتماد تصادفی، حریم خصوصی بیشتری را حفظ کنید.

از طرف دیگر، اگر کلاینت را اجرا می‌کنید، می‌توانید آن را با دوستان خود که ممکن است به آن نیاز داشته باشند به اشتراک بگذارید.

## کلاینت‌های اجرا (پیشتر «کلاینت‌های Eth1») {#execution-clients}

جامعه‌ی اتریوم چندین کلاینت اجرای منبع‌باز (که قبلاً به عنوان «کلاینت‌های Eth1» یا صرفاً «کلاینت‌های اتریوم» شناخته می‌شدند) را نگهداری می‌کند که توسط تیم‌های مختلف با استفاده از زبان‌های برنامه نویسی مختلف توسعه یافته‌اند. این کار باعث می‌شود شبکه قوی‌تر و متنوع‌تر شود. هدف ایده‌آل، دستیابی به تنوع بدون تسلط هیچ کلاینتی برای کاهش هر نقطه‌ی شکستی است.

This table summarizes the different clients in alphabetical order. All of them are actively maintained to stay updated with network upgrades, follow current specifications and pass [client tests](https://github.com/ethereum/tests).

| کلاینت                                                   | زبان            | سیستم‌عامل              | شبکه‌ها                                              | راهبرد همگام‌سازی            | هرس کردن وضعیت          |
| -------------------------------------------------------- | --------------- | ----------------------- | ---------------------------------------------------- | ---------------------------- | ----------------------- |
| [Akula](https://akula.app)                               | Rust            | لینوکس                  | شبکه‌ی اصلی، Görli،‏ Rinkeby،‏ Ropsten، و موارد دیگر | کامل                         | آرشیو، هرس‌شده (Pruned) |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/) | جاوا            | لینوکس، ویندوز، مک‌اواس | شبکه‌ی اصلی، Rinkeby‏، Ropsten‏، Görli، و موارد دیگر | Fast, Full, Snap, Checkpoint | آرشیو، هرس‌شده (Pruned) |
| [Erigon](https://github.com/ledgerwatch/erigon)          | Go              | لینوکس، ویندوز، مک‌اواس | شبکه‌ی اصلی، Görli‏، Rinkeby‏، Ropsten               | Full, Snap                   | آرشیو، هرس‌شده (Pruned) |
| [Geth](https://geth.ethereum.org/)                       | Go              | لینوکس، ویندوز، مک‌اواس | شبکه‌ی اصلی، Görli‏، Rinkeby‏، Ropsten               | اسنپ، کامل                   | آرشیو، هرس‌شده (Pruned) |
| [Nethermind](http://nethermind.io/)                      | سی‌شارپ، دات‌نت | لینوکس، ویندوز، مک‌اواس | شبکه‌ی اصلی، Görli‏، Rinkeby‏، Ropsten و موارد دیگر  | Snap, Fast                   | آرشیو، هرس‌شده (Pruned) |

جهت کسب اطلاعات بیشتر درباره‌ی شبکه‌های پشتیبانی‌شده [شبکه‌های اتریوم](/developers/docs/networks/) را بخوانید.

هر کلاینت دارای موارد استفاده و مزایای منحصربه‌فردی است، بنابراین شما باید یکی را بر اساس ترجیحات خود انتخاب کنید. تنوع اجازه می‌دهد تا پیاده‌سازی‌ها بر روی ویژگی‌های مختلف و مخاطبان کاربر متمرکز شوند. ممکن است بخواهید کلاینت را بر اساس ویژگی‌ها، پشتیبانی، زبان برنامه‌نویسی یا مجوزها انتخاب کنید.

### Besu {#besu}

هایپرلجر Besu یک کلاینت اتریوم در رده‌ی سازمانی برای شبکه‌های عمومی و مجوزدار است. این کلاینت تمام ویژگی‌های اصلی اتریوم، از ردیابی گرفته تا GraphQL را اجرا می‌کند، نظارت گسترده‌ای دارد و توسط ConsenSys، هم در کانال‌های جامعه باز و هم از طریق SLAهای تجاری برای شرکت‌ها، پشتیبانی می‌شود. این کلاینت به زبان جاوا نوشته شده است و دارای مجوز Apache 2.0 است.

Besu's extensive [documentation](https://besu.hyperledger.org/en/stable/) will guide you trough all details on its features and setups.

### Erigon {#erigon}

Erigon, formerly known as Turbo‐Geth, started as a fork of Go Ethereum oriented toward speed and disk‐space efficiency. Erigon is a completely re-architected implementation of Ethereum, currently written in Go but with implementations in other languages under development, e.g. [Akula](https://medium.com/@vorot93/meet-akula-the-fastest-ethereum-implementation-ever-built-58eaca244c39). هدف Erigon ارائه‌ی پیاده‌سازی سریع‌تر، ماژولارتر و بهینه‌تر اتریوم است. It can perform a full archive node sync using around 2TB of disk space, in under 3 days.

### Go Ethereum {#geth}

Go Ethereum (به طور خلاصه geth) یکی از پیاده‌سازی‌های اصلی برای پروتکل اتریوم است. در حال حاضر، geth رایج‌ترین کلاینت با بزرگترین پایگاه کاربران و ابزارهای متنوع برای کاربران و توسعه‌دهندگان است. این کلاینت به زبان Go نوشته شده است، کاملاً منبع‌باز است و مجوز آن تحت GNU LGPL v3 است.

Learn more about Geth in its [documentation](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind is an Ethereum implementation created with the C# .NET tech stack, licensed with LGPL-3.0, running on all major platforms including ARM. این پیاده‌سازی در رابطه با موارد زیر، کارکردی عالی دارد:

- یک ماشین مجازی بهینه
- دسترسی به حالت
- شبکه و ویژگی‌های غنی مانند داشبوردهای Prometheus/Grafana، پشتیبانی از گزارش سازمانی seq، ردیابی JSON RPC، و افزونه‌های تجزیه و تحلیل.

Nethermind همچنین از [مستندات مشروح](https://docs.nethermind.io)، پشتیبانی توسعه‌ی قوی، یک جامعه‌ی آنلاین و پشتیبانی 24 ساعته در 7 روز هفته برای کاربران پرمیوم دارد.

## کلاینت‌های اجماع («کلاینت‌های Eth2» سابق) {#consensus-clients}

چندین کلاینت اجماع (که قبلاً به‌عنوان کلاینت‌های «Eth2» شناخته می‌شدند) وجود دارد که از [ارتقاهای اجماع](/upgrades/beacon-chain/) پشتیبانی می‌کنند. They are running the Beacon Chain and will provide a proof-of-stake consensus mechanism to execution clients after [The Merge](/upgrades/merge/).

[کلاینت‌های اجماع را مشاهده کنید](/upgrades/get-involved/#clients).

| کلاینت                                                        | زبان       | سیستم‌عامل              | شبکه‌ها                               |
| ------------------------------------------------------------- | ---------- | ----------------------- | ------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | لینوکس، ویندوز، مک‌اواس | Beacon Chain, Goerli, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | لینوکس، ویندوز، مک‌اواس | Beacon Chain, Goerli                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | لینوکس، ویندوز، مک‌اواس | Beacon Chain, Goerli                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go         | لینوکس، ویندوز، مک‌اواس | Beacon Chain, Gnosis, Goerli, Pyrmont |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | جاوا       | لینوکس، ویندوز، مک‌اواس | Beacon Chain, Gnosis, Goerli, Sepolia |

### Lighthouse {#lighthouse}

Lighthouse is a consensus client implementation written in Rust under the Apache-2.0 license. It is maintained by Sigma Prime and has been stable and production-ready since Beacon Chain genesis. It is relied upon by various enterprises, staking pools and individuals. It aims to be secure, performant and interoperable in a wide range of environments, from desktop PCs to sophisticated automated deployments.

Documentation can be found in [Lighthouse Book](https://lighthouse-book.sigmaprime.io/).

### Lodestar {#lodestar}

Lodestar is a production-ready consensus client implementation written in Typescript under the LGPL-3.0 license. It is maintained by ChainSafe Systems and is the newest of the consensus clients for solo-stakers, developers and researchers. Lodestar consists of a beacon node and validator client powered by JavaScript implementations of Ethereum protocols. Lodestar aims to improve Ethereum usability with light clients, expand accessibility to a larger group of developers and further contribute to ecosystem diversity.

More information can be found on our [Lodestar website](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus is a consensus client implementation written in Nim under the Apache-2.0 license. It is a production-ready client in use by solo-stakers and staking pools. Nimbus is designed for resource efficiency, making it easy to run on resource-restricted devices and enterprise infrastructure with equal ease, without compromising stability or reward performance. A lighter resource footprint means the client has a greater margin of safety when the network is under stress.

Documentation can be found in the [Nimbus Guide](https://nimbus.guide/).

### Prysm {#prysm}

Prysm is a full-featured, open source consensus client written in Go under the GPL-3.0 license. It features an optional webapp UI and prioritizes user experience, documentation, and configurability for both stake-at-home and institutional users.

Visit [Prysm docs](https://docs.prylabs.network/docs/getting-started/) to learn more.

### Teku {#teku}

Teku is one of the original Beacon Chain genesis clients. Alongside the usual goals (security, robustness, stability, usability, performance), Teku specifically aims to comply fully with all the various consensus client standards.

Teku offers very flexible deployment options. The beacon node and validator client can be run together as a single process, which is extremely convenient for solo stakers, or nodes can be run separately for sophisticated staking operations. In addition, Teku is fully interoperable with [Web3Signer](https://github.com/ConsenSys/web3signer/) for signing key security and slashing protection.

Teku is written in Java and is Apache 2.0 licensed. It is developed by the Protocols team at ConsenSys that is also responsible for Besu and Web3Signer. Learn more in [Teku docs](https://docs.teku.consensys.net/en/latest/).

## حالات همگام‌سازی {#sync-modes}

برای پیگیری و تأیید داده‌های جاری در شبکه، کلاینت اتریوم باید با آخرین حالت شبکه همگام شود. این کار با بارگیری کردن داده‌ها از همتایان، تأیید رمزنگاری یکپارچگی آن‌ها و ایجاد یک پایگاه داده‌ی محلی زنجیره‌ی بلوکی انجام می‌شود.

حالت‌های همگام‌سازی رویکردهای متفاوتی را برای این فرایند با بده‌بستان‌های مختلف نشان می‌دهند. کلاینت‌ها همچنین در پیاده‌سازی‌های الگوریتم‌های همگام‌سازی تفاوت دارند. برای اطلاع از جزئیات پیاده‌سازی، همیشه به مستندات رسمی کلاینت انتخابی خود مراجعه کنید.

### Execution layer sync modes {#execution-layer-sync-modes}

#### همگام‌سازی کامل {#full-sync}

همگام‌سازی کامل، همه‌ی بلوک‌ها (از جمله هدرها، تراکنش‌ها و رسیدها) را بارگیری می‌کند و با اجرای هر بلوک از پیدایش، وضعیت زنجیره‌ی بلوکی را به‌صورت تدریجی ایجاد می‌کند.

- اعتماد را به حداقل می‌رساند و با تأیید هر تراکنش، بالاترین امنیت را ارائه می‌دهد.
- ٰبا افزایش تعداد تراکنش‌ها، پردازش همه تراکنش‌ها ممکن است روزها تا هفته‌ها طول بکشد.

#### همگام‌سازی سریع {#fast-sync}

همگام‌سازی سریع همه بلوک‌ها (از جمله هدرها، تراکنش‌ها و رسیدها) را بارگیری می‌کند، همه هدرها را تأیید می‌کند، حالت را بارگیری می‌کند و آن را نسبت به هدرها تأیید می‌کند.

- بر امنیت مکانیزم اجماع اتکا دارد.
- همگام‌سازی تنها چند ساعت زمان می‌برد.

#### همگام‌سازی سبک {#light-sync}

حالت کلاینت سبک همه‌ی هدرهای بلوک و داده‌های‌ بلوک را بارگیری می‌کند و برخی را به‌طور تصادفی تأیید می‌کند. فقط نوک زنجیره را از نقاط بررسی مطمئن همگام‌سازی می‌کند.

- با تکیه بر اعتماد به توسعه‌دهندگان و مکانیزم اجماع، تنها آخرین وضعیت را دریافت می‌کند.
- کلاینت ظرف چند دقیقه با وضعیت فعلی شبکه آماده استفاده است.

[اطلاعات بیشتر درباره‌ی کلاینت‌های سبک](https://www.parity.io/blog/what-is-a-light-client/)

#### همگام‌سازی فوری {#snap-sync}

Snap sync is the latest approach to syncing a client, pioneered by the Geth team. با استفاده از عکس‌های فوری پویا که توسط همتایان ارائه می‌شوند، تمام داده‌های حساب و ذخیره‌سازی را بدون بارگیری کردن گره‌های درخت میانی بازیابی می‌کند و سپس درخت مرکل را به‌صورت محلی بازسازی می‌کند.

- Fastest sync strategy, currently default in Ethereum mainnet
- صرفه‌جویی در مصرف حافظه و پهنای باند شبکه بدون به خطر انداختن امنیت

[More on snap sync](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

### Consensus layer sync modes {#consensus-layer-sync-modes}

#### Optimistic sync {#optimistic-sync}

Optimistic sync is a post-merge synchronization strategy designed to be opt-in and backwards compatible, allowing execution nodes to sync via established methods. The execution engine can _optimistically_ import beacon blocks without fully verifying them, find the latest head, and then start syncing the chain with the above methods. Then, after the execution client has caught up, it will inform the consensus client of the validity of the transactions in the Beacon Chain.

[More on optimistic sync](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Checkpoint sync {#checkpoint-sync}

Checkpoint sync, also known as weak subjectivity sync, creates a superior user experience for syncing Beacon Node. It's based on assumptions of [weak subjectivity](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) which enables syncing Beacon Chain from a recent weak subjectivity checkpoint instead of genesis. Checkpoint sync makes the initial sync time significantly faster with similar trust assumptions as syncing from [genesis](/glossary/#genesis-block).

In practice, this means your node connects to a remote service to download recent finalized states and continues verifying data from that point. Third party providing the data is trusted and should be picked carefully.

More on [checkpoint sync](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## بیشتر بخوانید {#further-reading}

اطلاعات بسیاری درباره‌ی کلاینت‌های اتریوم روی اینترنت وجود دارد. این‌ها چند منبع هستند که می‌توانند مفید باشند.

- [اتریوم مقدماتی - بخش دوم - فهم گره‌ها](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- ویل بارنز، 13 فوریه 2019_
- [اجرای گره‌های کامل اتریوم: راهنمایی برای افراد کم‌انگیزه](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– جاستین لروکس، 7 نوامبر 2019_
- [اجرای یک گره‌ی اتریوم](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub، به‌طور مرتب به‌روزرسانی می‌شود_

## موضوعات مرتبط {#related-topics}

- [بلاک‌ها](/developers/docs/blocks/)
- [شبکه‌ها](/developers/docs/networks/)

## آموزش‌های مرتبط {#related-tutorials}

- [اجرای یک گره با geth‏](/developers/tutorials/run-light-node-geth/) _– چگونه Geth را بارگیری کنیم، نصب کنیم و اجرا کنیم. اطلاعاتی درباره‌ی حالات همگام‌سازی، کنسول جاوا اسکریپت و موارد دیگر ارائه می‌دهد._
- [Raspberry Pi 4 خود را فقط با اتصال کارت MicroSD به یک گره‌ی اعتبارسنج تبدیل کنید – راهنمای نصب](/developers/tutorials/run-node-raspberry-pi/) _‏– Raspberry Pi 4 خود را فلش کنید، یک کابل اترنت به آن وصل کنید، دیسک SSD را وصل کنید و دستگاه را روشن کنید تا Raspberry Pi 4 را به یک گره‌ی کامل اتریوم که لایه‌ی اجرا (شبکه‌ی اصلی) و / یا لایه‌ی اجماع (زنجیره‌ی بیکن / اعتبارسنج) را اجرا می‌کند، تبدیل کنید._
