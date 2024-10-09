---
title: اتریوم برای توسعه دهندگان Go
description: یاد بگیرید چطور اتریوم را با پروژه ها و ابزارهای مبتنی بر Go توسعه دهید
lang: fa
incomplete: true
---

<FeaturedText>یاد بگیرید چطور اتریوم را با پروژه ها و ابزارهای مبتنی بر Go توسعه دهید</FeaturedText>

از اتریوم برای ایجاد برنامه های غیرمتمرکز (یا "dapps") استفاده کنید. این برنامه های غیرمتمرکز می توانند قابل اعتماد باشند،به این معنا که وقتی آنها در اتریوم مستقر شوند ، همیشه طبق برنامه اجرا می شوند. آنها غیرمتمرکز هستند، به این معنی که آنها در یک شبکه همتا به همتا اجرا می شوند و هیچ نقطه شکست واحدی در آنها وجود ندارد. هیچ نهاد یا شخص واحدی آنها را کنترل نمی کند و سانسور آنها تقریبا غیرممکن است. آنها با ایجاد انواع جدیدی از برنامه های کاربردی مالی، قادر به کنترل دارایی های دیجیتال خواهند بود.

## شروع کار با قراردادهای هوشمند و زبان Solidity {#getting-started-with-smart-contracts-and-solidity}

**اولین قدم های خود را برای ادغام Go با اتریوم بردارید**

آیا به توضیحات پایه‌ای بیشتری نیاز دارید؟ آدرس زیر را بررسی کنید [ethereum.org/learn](/learn/) or [ethereum.org/developers](/developers/).

- [زنجیره بلوکی توضیح داده شده است](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [درک قراردادهای هوشمند](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اولین قرارداد هوشمند خود را بنویسید](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [بیاموزید که چگونه Solidity را کامپایل و به‌کارگیری کنید](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [آموزش قرارداد](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## مقاله ها و کتاب های مبتدی {#beginner-articles-and-books}

- [انتخاب یک کلاینت اتریومی](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [شروع به کار با Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [از Golang برای اتصال به اتریوم استفاده کنید](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [قراردادهای هوشمند اتریوم را با استفاده از Golang مستقر کنید](https://www.youtube.com/watch?v=pytGqQmDslE)
- [راهنمای گام به گام تست و استقرار قراردادهای هوشمند اتریوم در Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: توسعه اتریوم با Go](https://goethereumbook.org/) - _برنامه‌های اتریوم را با Go توسعه دهید_

## مقالات و مستندات سطح متوسط {#intermediate-articles-and-docs}

- [مستندات اتریومی Go](https://geth.ethereum.org/docs/) - _اسناد رسمی مربوط به اتریوم Golang _
- [راهنمای برنامه نویس اریگون](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _راهنمای مصور از جمله درخت حالت، چند اثبات و پردازش تراکنش_
- [Erigon و اتریوم بدون حالت](https://youtu.be/3-Mn7OckSus?t=394) - _کنفرانس انجمن اتریوم 2020 (EthCC 3)_
- [Erigon: بهینه سازی مشتریان اتریوم](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go اتریوم GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [ایجاد Dapp در Go با Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [با Golang و Geth با شبکه خصوصی اتریوم کار کنید](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [واحد تستی قراردادهای Solidity در اتریوم با Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [مرجعی سریع برای استفاده از Geth به عنوان یک کتابخانه](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## الگوهای مورد استفاده سطح پیشرفته {#advanced-use-patterns}

- [بک اند شبیه سازی شده GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [برنامه های زنجیره ی بلوکی به عنوان یک سرویس با استفاده از اتریوم و Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [ذخیره‌سازی توزیع شده IPFS و Swarm در برنامه های زنجیره بلوکی اتریومی](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [مشتریان موبایل: کتابخانه ها و گره های اتریوم Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Dapps بومی: به قراردادهای اتریوم متصل شوید](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## پروژه ها و ابزارهای Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _پیاده‌سازی رسمی پروتکل اتریوم با Go _
- [تجزیه و تحلیل کد اتریوم Go](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _بررسی و تجزیه و تحلیل منبع کد اتریومی Go _
- [Erigon](https://github.com/ledgerwatch/erigon) - _مشتق سریع‌تر Go Ethereum، با تمرکز بر گره‌های بایگانی_
- [Golem](https://github.com/golemfactory/golem) - _Golem در حال ایجاد یک بازار جهانی برای قدرت محاسباتی است_
- [Quorum](https://github.com/jpmorganchase/quorum) - _اجازه اجرای اتریوم با پشتیبانی از حریم خصوصی داده_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _اجرای اتریوم 'Serenity' 2.0 Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _ توئیتر غیرمتمرکز: یک سرویس میکروبلاگینگ در حال اجرا بر روی زنجیره بلوکی اتریوم_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _اجرای Golang و گسترش حداقل مشخصات پلاسمای قابل دوام_
- [استخر استخراج اتریوم باز](https://github.com/sammy007/open-ethereum-pool) - _یک استخر استخراج اتریوم منبع باز_
- [کیف پول اتریوم HD](https://github.com/miguelmota/go-ethereum-hdwallet) - _مشتقات کیف پول اتریوم HD در Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _پشتیبانی از بسیاری از گونه‌های شبکه‌های اتریوم_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _پیاده‌سازی پروتکل فرعی Light Ethereum Geth _
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _اجرای کیف پول اتریوم و ابزارهای کاربردی ساده در Golang_
- [کووالنت گولنگ SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _دسترسی کارآمد به داده‌های بلاک چین از طریق Go SDK برای بیش از 200 بلاک چین امکانپذیر است_

به دنبال منابع بیشتری هستید؟ پس اینجا را ببینید [ethereum.org/developers.](/developers/)

## مشارکت کنندگان انجمن Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [کانال ethereum#](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - اتریوم](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## سایر لیست های گردآوری شده {#other-aggregated-lists}

- [اتریوم فوق‌العاده](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: فهرستی قطعی از ابزارهای توسعه دهنده اتریوم](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [منبع GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
