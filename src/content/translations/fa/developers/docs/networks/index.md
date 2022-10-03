---
title: شبکه‌ها
description: مروری بر شبکه‌های اتریوم و محل دریافت اتر (ETH) شبکه‌ی تست برای آزمایش برنامه‌ی خود.
lang: fa
---

شبکه‌ها محیط‌های مختلف اتریوم هستند که می‌توانید برای توسعه، آزمایش یا تولید به آن‌ها دسترسی داشته باشید. از آنجایی که اتریوم یک پروتکل است، ممکن است چندین «شبکه» مستقل وجود داشته باشد که بدون تعامل با یکدیگر، با پروتکل مطابقت داشته باشند.

حساب اتریوم شما در شبکه های مختلف کار می کند، اما موجودی حساب و سابقه‌ی تراکنش شما از شبکه‌ی اصلی اتریوم منتقل نمی‌شود. برای مقاصد آزمایشی، دانستن اینکه کدام شبکه‌ها در دسترس هستند و چگونه می‌توان اتر شبکه آزمایشی را برای کار کردن با آن به دست آورد، مفید است.

## پیش‌نیازها {#prerequisites}

قبل از کسب اطلاعات در مورد شبکه‌های مختلف، باید [اصول اتریوم](/developers/docs/intro-to-ethereum/) را بدانید، زیرا شبکه‌های تست نسخه‌ای ارزان و ایمن از اتریوم را برای تجربه کردن در اختیار شما قرار می‌دهند.

## شبکه‌های عمومی {#public-networks}

شبکه‌های عمومی برای هر کسی در جهان با اتصال به اینترنت قابل‌دسترسی هستند. هر کسی می‌تواند تراکنش‌هایی را در یک زنجیره‌ی بلوکی عمومی بخواند یا ایجاد کند و تراکنش‌های در حال اجرا را تأیید کند. اجماع بین همتایان در مورد گنجاندن تراکنش‌ها و وضعیت شبکه تصمیم می‌گیرد.

### شبکه‌ی اصلی اتریوم {#ethereum-mainnet}

شبکه‌ی اصلی اولین زنجیره‌ی بلوکی عمومی تولید اتریوم است که تراکنش‌های توزیع شده با ارزش واقعی در دفتر کل روی آن انجام می‌شود.

وقتی مردم و صرافی‌ها درباره قیمت اتر صحبت می‌کنند، در مورد اتر روی شبکه‌ی اصلی صحبت می‌کنند.

### شبکه‌های تست اتریوم {#ethereum-testnets}

علاوه بر شبکه اصلی، شبکه‌های تست عمومی نیز وجود دارند. علاوه بر شبکه‌ی اصلی، شبکه‌های تست عمومی نیز وجود دارند. این را به‌عنوان یک آنالوگ برای تولید در مقابل سرورهای مرحله‌ای در نظر بگیرید.

قبل از استقرار در شبکه‌ی اصلی باید هر کد قراردادی را که روی یک شبکه‌ی تست می‌نویسید آزمایش کنید. قبل از استقرار در شبکه‌ی اصلی باید هر کد قراردادی را که روی یک شبکه‌ی تست می‌نویسید آزمایش کنید.

Most testnets started by using a proof-of-authority consensus mechanism. این بدان معناست که تعداد کمی از گره‌ها برای اعتبارسنجی تراکنش‌ها و ایجاد بلوک‌های جدید انتخاب می‌شوند و هویت آن‌ها در این فرایند سهام‌گذاری می‌شود. Alternatively, some testnets started off using a proof-of-work consensus mechanism with just a few permissioned miners. However, in preparation for [The Merge](/upgrades/merge), these testnets underwent their own transitions to proof-of-stake, offering the opportunity for multiple 'dress-rehearsals' before developers merged Ethereum Mainnet. The Ethereum testnets are now proof-of-stake, just like Ethereum Mainnet.

اتر شبکه‌ی تست ارزش واقعی ندارد، بنابراین هیچ بازاری برای اتر شبکه‌ی تست وجود ندارد. از آنجایی که برای تعامل واقعی با اتریوم به اتر نیاز دارید، اکثر مردم اتر شبکه‌ی تست را از فاست‌ها دریافت می‌کنند. بیشتر فاست‌ها برنامه‌های تحت وب هستند که می‌توانید آدرسی را که درخواست ارسال اتر به آن آدرس را دارید در آن‌ها وارد کنید.

#### Goerli {#goerli}

Goerli is a proof-of-stake testnet. It is expected to be maintained long-term as a stable testnet for application developers. Before its testnet merge, Goerli was a proof-of-authority testnet.

- [وب‌سایت](https://goerli.net/)
- [گیت‌هاب](https://github.com/goerli/testnet)
- [Etherscan](https://goerli.etherscan.io)

##### فاست‌های Goerli

- [فاست Goerli](https://faucet.goerli.mudit.blog/)
- [فاست Chainlink](https://faucets.chain.link/)
- [فاستAlchemy Goerli](https://goerlifaucet.com/)

#### Sepolia {#sepolia}

Sepolia is a proof-of-stake testnet. Although Sepolia is still running, it is not currently planned to be maintained long-term. Before undergoing The Merge in June 2022, Sepolia was a proof-of-work testnet.

- [وب‌سایت](https://sepolia.dev/)
- [گیت‌هاب](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### فاست‌های Sepolia

- [فاست Sepolia](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)

#### Ropsten _(منسوخ‌شده)_ {#ropsten}

_توجه داشته باشید، [شبکه‌ی تست Ropsten منسوخ شده است](https://github.com/ethereum/pm/issues/460) و دیگر ارتقای پروتکل را دریافت نخواهد کرد. لطفاً مهاجرت برنامه‌های کاربردی خود را به Sepolia یا Goerli در نظر بگیرید._

Ropsten is a proof-of-stake testnet. Ropsten will be deprecated in late 2022. Before undergoing The Merge in May 2022, Ropsten was a proof-of-work testnet.

##### فاست‌های Ropsten

- [FaucETH](https://fauceth.komputing.org) (فاست چند زنجیره‌ای بدون نیاز به حساب اجتماعی)
- [فاست Paradigm](https://faucet.paradigm.xyz/)

#### Rinkeby _(منسوخ‌شده)_ {#rinkeby}

_توجه: [شبکه‌ی تست Rinkeby منسوخ شده است](https://github.com/ethereum/pm/issues/460) و دیگر ارتقای پروتکل را دریافت نخواهد کرد. لطفاً مهاجرت برنامه‌های کاربردی خود را به Sepolia یا Goerli در نظر بگیرید._

یک شبکه‌ی تست اثبات صلاحیت برای کسانی که نسخه‌های قدیمی مشتری Geth را اجرا می‌کنند.

##### فاست‌های Rinkeby

- [FaucETH](https://fauceth.komputing.org) (فاست چندزنجیره‌ای بدون نیاز به داشتن حساب اجتماعی)
- [فاست Alchemy](https://RinkebyFaucet.com)
- [فاست Chainlink](https://faucets.chain.link/)
- [فاست Paradigm](https://faucet.paradigm.xyz/)
- [فاست Rinkeby](https://faucet.rinkeby.io/)

#### Kovan‏ _(منسوخ‌شده)_ {#kovan}

_توجه: [شبکه‌ی تست Kovan منسوخ شده است](https://github.com/ethereum/pm/issues/460) و دیگر ارتقای پروتکل را دریافت نخواهد کرد. لطفاً مهاجرت برنامه‌های کاربردی خود را به Sepolia یا Goerli در نظر بگیرید._

یک شبکه‌ی تست اثبات اعتبار بسیار قدیمی برای کسانی که هنوز از کلاینت‌های OpenEthereum استفاده می‌کنند.

##### فاست‌های Kovan

- [FaucETH](https://fauceth.komputing.org) (فاست چندزنجیره‌ای بدون نیاز به داشتن حساب اجتماعی)
- [فاست Chainlink](https://faucets.chain.link/)
- [فاست Paradigm](https://faucet.paradigm.xyz/)

### شبکه‌های تست لایه 2 {#layer-2-testnets}

[لایه 2 (L2)](/layer-2/) یک اصطلاح جمعی برای توصیف مجموعه خاصی از راه‌حل‌های مقیاس‌پذیری اتریوم است. لایه 2 یک زنجیره‌‌ی بلوکی جداگانه است که اتریوم را گسترش می‌دهد و تضمین‌های امنیتی اتریوم را به ارث می‌برد. شبکه‌های تست لایه 2 معمولاً به شبکه‌های تست عمومی اتریوم متصل می‌شوند.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

یک شبکه‌ی تست برای [‏Arbitrum](https://arbitrum.io/).

فاست‌های Arbitrum Rinkeby:

- [FaucETH](https://fauceth.komputing.org) (فاست چندزنجیره‌ای بدون نیاز به داشتن حساب اجتماعی)
- [فاست Chainlink](https://faucets.chain.link/)
- [فاست Paradigm](https://faucet.paradigm.xyz/)

#### Optimisic Kovan {#optimistic-kovan}

یک شبکه‌ی تست برای [Optimism](https://www.optimism.io/).

فاست‌های Optimistic Kovan:

- [FaucETH](https://fauceth.komputing.org) (فاست چند زنجیره‌ای بدون نیاز به حساب اجتماعی)
- [فاست Paradigm](https://faucet.paradigm.xyz/)

## شبکه‌های خصوصی {#private-networks}

یک شبکه‌ی اتریوم در صورتی که گره‌های آن به یک شبکه‌ی عمومی متصل نباشند یک شبکه‌ی خصوصی است (یعنی شبکه اصلی یا یک شبکه آزمایشی). در این زمینه، خصوصی فقط به معنای رزرو شده یا جدا شده است، نه محافظت‌شده یا امن.

### شبکه‌های توسعه {#development-networks}

برای اینکه یک برنامه‌ی کاربردی اتریوم را توسعه دهید، لازم است آن را در یک شبکه‌ی خصوصی اجرا کنید تا قبل از بکارگیری نحوه‌ی کارکرد آن را ببینید. مشابه نحوه‌ی ایجاد یک سرور محلی در رایانه خود برای توسعه‌ی وب، می‌توانید یک نمونه زنجیره‌ی بلوکی محلی برای آزمایش dapp خود ایجاد کنید. این موضوع امکان تکرار بسیار سریع‌تر را نسبت به یک شبکه‌ی تست عمومی فراهم می‌کند.

پروژه‌ها و ابزارهایی برای کمک به این امر اختصاص داده شده است. درباره‌ی [شبکه‌های توسعه](/developers/docs/development-networks/) بیشتر بدانید.

### شبکه‌های کنسرسیومی {#consortium-networks}

فرایند اجماع توسط مجموعه‌ای از گره‌های از پیش تعریف‌شده که قابل‌اعتماد هستند کنترل می‌شود. به‌عنوان مثال، یک شبکه‌ی خصوصی از مؤسسات دانشگاهی شناخته‌شده که هر یک گره‌ای واحد را حکمرانی می‌کنند، و بلوک‌ها توسط آستانه‌ای از امضاکنندگان در شبکه اعتبارسنجی می‌شوند.

اگر یک شبکه‌ی عمومی اتریوم مانند اینترنت عمومی است، یک شبکه‌ی کنسرسیومی مثل یک اینترانت خصوصی است.

## ابزارهای مرتبط {#related-tools}

- [فهرست زنجیره‌ای](https://chainlist.org/) _فهرست شبکه‌های EVM برای اتصال کیف پول‌ها و ارائه‌دهندگان به شناسه‌ی زنجیره و شناسه‌ی شبکه مناسب_
- [زنجیره‌های مبتنی بر EVM](https://github.com/ethereum-lists/chains) _مخزن فراداده‌های زنجیره در گیت‌هاب که به فهرست زنجیره‌ای از آن قدرت می‌گیرد_

## بیشتر بخوانید {#further-reading}

- [The Evolution of Ethereum Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
