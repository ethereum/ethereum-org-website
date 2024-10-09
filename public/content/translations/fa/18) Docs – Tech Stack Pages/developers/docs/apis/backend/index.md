---
title: کتابخانه‌های وب سرویس بک اند
description: معرفی وب سرویس کاربرهای اتریوم که به شما اجازه میدهند از برنامه های کاربردی خود با زنجیره بلوکی تعامل داشته باشید.
lang: fa
---

برای این‎‌که برنامه با زنجیره بلوکی اتریوم کار کند (مثال: زنجیره بلوکی را بخواند و به شبکه تراکنش بفرستد)، باید به یک گره اتریوم متصل شود.

برای این منظور، هر کاربر اتریوم مشخصات [JSON-RPC](/developers/docs/apis/json-rpc/) را پیاده‌سازی می‌کند، بنابراین مجموعه یکنواختی از [روش‌ها](/developers/docs/apis/json-rpc/#json-rpc-methods) وجود دارد که برنامه‌ها می‌توانند به آن تکیه کنند.

اگر می‌خواهید از یک زبان برنامه نویسی خاص برای اتصال به گره اتریوم استفاده کنید، راه‌حل خود را انجام دهید اما کتابخانه ها و محیط های متعددی وجود دارند که می‌توانند آن را برای شما بسیار ساده کنند. با استفاده از این کتابخانه ها توسعه‌دهندگان می‌توانند بدون دانستن برنامه نویسی پپشرفته و با استفاده از کد یک خطی درخواست های JSON-RPC بدهند که با اتریوم تعامل داشته باشد.

## پیش‌نیازها {#prerequisites}

[پشته‌ اتریوم](/developers/docs/ethereum-stack/) و [کاربر اتریوم](/developers/docs/nodes-and-clients/) می‌توانند مطالب مفیدی باشند.

## چرا از کتابخانه استفاده کنیم؟ {#why-use-a-library}

این کتابخانه ها بسیاری از سختی های ازتباط مستقیم با گره اتریوم را از بین می‌برند. هم‌چنین توابع کاربردی فراهم می‌کنند (مثلا تبدیل اتر به GWEI) بنابراین به عنوان یک توسعه دهنده شما زمان کمتری صرف کارکردن با پیچیدگی های کاربر اتریوم، و زمان بیشتری صرف عملکرد برنامه خود می‌کنید.

## کتابخانه‌های در دسترس {#available-libraries}

### زیرساحت و خدمات گره {#infrastructure-and-node-services}

**Alchemy** **_پلتفرم توسعه‌ اتریوم_**

- [alchemy.com](https://www.alchemy.com/)
- [اسناد](https://docs.alchemy.com/)
- [گیت‌هاب](https://github.com/alchemyplatform)
- [دیسکورد](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Node-as-a-Service._**

- [AllThatNode.com](https://www.allthatnode.com/)
- [اسناد](https://docs.allthatnode.com)
- [دیسکورد](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_ سرویس APIهای غیرمتمرکز برای شبکه اصلی اتریوم و شبکه های آزمایشی._**

- [blastapi.io](https://blastapi.io/)
- [اسناد](https://docs.blastapi.io)
- [دیسکورد](https://discord.gg/bwarelabs)

**BlockPi -** **_ ارائه خدمات RPC کارآمدتر و سریعتر_**

- [blockpi.io](https://blockpi.io/)
- [مستندات](https://docs.blockpi.io/)
- [گیت هاب](https://github.com/BlockPILabs)
- [دیسکورد](https://discord.com/invite/xTvGVrGVZv)

**دروازه‌ اتریوم Cloudflare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**اتراسکن - کاوشگر بلوک و APIهای تراکنش**
- [اسناد](https://docs.etherscan.io/)

**GetBlock-** **_بلاکچین به عنوان سرویس برای توسعه Web3 _ **

- [GetBlock.io](https://getblock.io/)
- [مستندات](https://getblock.io/docs/)

**Infura -** **_وب سرویس اتریوم به عنوان سرویس._**

- [infura.io](https://infura.io)
- [اسناد](https://docs.infura.io/api)
- [گیت‌هاب](https://github.com/INFURA)

**Node RPC - _ارائه دهنده مقرون به صرفه ماشین مجازی اتریوم JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [مستندات](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _گره‌های کامل و کاوشگرهای بلوک._**

- [NOWNodes.io](https://nownodes.io/)
- [اسناد](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_زیرساخت بلاکچین به عنوان سرویس._**

- [quicknode.com](https://quicknode.com)
- [مستندات](https://www.quicknode.com/docs/welcome)
- [دیسکورد](https://discord.gg/quicknode)

**Rivet****_ وب‌ سرویس‌های اتریوم و اتریوم کلاسیک به عنوان یک خدمت قدرت گرفته از نرم‌افزار متن باز._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [گیت‌هاب](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_گره های اتریوم سرعت گرا به عنوان رابط برنامه‌نویسی کاربردی JSON-RPC/WebSockets _**

- [zmok.io](https://zmok.io/)
- [گیت‌هاب](https://github.com/zmok-io)
- [مستندات](https://docs.zmok.io/)
- [دیسکورد](https://discord.gg/fAHeh3ka6s)

### ابزارهای توسعه {#development-tools}

**ethers-kt -** **_Async، کتابخانه کاتلین/جاوا/اندروید با عملکرد بالا برای بلاک چین‌های مبتنی بر ماشین مجازی اتریوم_**

- [گیت‌هاب](https://github.com/Kr1ptal/ethers-kt)
- [مثال‌ها](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [دیسکورد](https://discord.gg/rx35NzQGSb)

**نتریوم****یک کتابخانه متن باز متحد با زنجیره بلوکی</em>**

- [گیت‌هاب](https://github.com/Nethereum/Nethereum)
- [مستندات](http://docs.nethereum.com/en/latest/)
- [دیسکورد](https://discord.com/invite/jQPrR58FxX)

**ابزارسازی پایتون****_کتابخانه های متعدد برای تعامل با اتریوم به وسیله پایتون._**

- [py.ethereum.org](https://python.ethereum.org/)
- [گیت‌هاب web3.py](https://github.com/ethereum/web3.py)
- [چت web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_پلتفرم نهایی توسعه زنجیره بلوکی._**

- [Tatum](https://tatum.io/)
- [گیت هاب](https://github.com/tatumio/)
- [مستندات](https://docs.tatum.io/)
- [دیسکورد](https://discord.gg/EDmW3kjTC9)

**web3j****_یک کتابخانه متحد جاوا/اندروید/کاتلین/اسکالا برای اتریوم_**

- [گیت‌هاب](https://github.com/web3j/web3j)
- [مستندات](https://docs.web3j.io/)
- [گیتر](https://gitter.im/web3j/web3j)

### خدمات بلاک چین {#blockchain-services}

**BlockCypher -** **_APIهای وب اتریوم._**

- [blockcypher.com](https://www.blockcypher.com/)
- [اسناد](https://www.blockcypher.com/dev/ethereum/)

** -Chainbase** **_زیرساخت داده Web3 همه در یک مورد برای اتریوم.</strong></p>

- [chainbase.com](https://chainbase.com/)
- [اسناد](https://docs.chainbase.com/)
- [دیسکورد](https://discord.gg/Wx6qpqz4AF)

**چِین استک****_گره مشترک و اختصاصی اتریوم به عنوان یک سرویس._**

- [chainstack.com](https://chainstack.com)
- [مستندات](https://docs.chainbase.com/docs)
- [مرجع API اتریوم](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_زیرساخت ای‌پی‌آی بلاکچین._**

- [گره ابری کوین بیس](https://www.coinbase.com/cloud)
- [مستندات](https://docs.cloud.coinbase.com/)

**DataHub توسط Figment -** **_سرویس‌های مبتنی بر وب سرویس Web3 با شبکه اصلی و شبکه‌های تستی اتریوم._**

- [DataHub](https://www.figment.io/)
- [اسناد](https://docs.figment.io/)

**مورالیس-** **_ارائه‌دهنده API EVM گرید سازمانی._**

- [moralis.io](https://moralis.io)
- [اسناد](https://docs.moralis.io/)
- [گیت هاب](https://github.com/MoralisWeb3)
- [دیسکورد](https://moralis.io/joindiscord/)
- [تالار گفتگو](https://forum.moralis.io/)

**NFTPport -** **_API داده‌های اتریوم و ضرب._**

- [nftport.xyz](https://www.nftport.xyz/)
- [اسناد](https://docs.nftport.xyz/)
- [گیت هاب](https://github.com/nftport/)
- [دیسکورد](https://discord.com/invite/K8nNrEgqhE)

**توکن ویو-** **_پلتفرم عمومی APIهای رمزنگاری چندگانه بلاک چین.</strong>_</p>

- [services.tokenview.io](https://services.tokenview.io/)
- [اسناد](https://services.tokenview.io/docs?type=api)
- [گیت هاب](https://github.com/Tokenview)

**Watchdata -** **_دسترسی آسان و قابل اتکای وب‌سرویس به زنجیره بلوکی اتریوم._**

- [Watchdata](https://watchdata.io/)
- [اسناد](https://docs.watchdata.io/)
- [دیسکورد](https://discord.com/invite/TZRJbZ6bdn)

**Covalent-** **_APIهای بلاک چین غنی شده برای بیش از 200 زنجیره._**

- [covalenthq.com](https://www.covalenthq.com/)
- [اسناد](https://www.covalenthq.com/docs/api/)
- [گیت هاب](https://github.com/covalenthq)
- [دیسکورد](https://www.covalenthq.com/discord/)


## بیشتر بخوانید {#further-reading}

_می‌خواهید در مورد منابع جامعه که به شما کمک کرده بدانید؟ این صفحه را ویرایش و اضافه کنید!_

## موضوعات مرتبط {#related-topics}

- [گره‌ها و کاربرها](/developers/docs/nodes-and-clients/)
- [چارچوب‌های توسعه](/developers/docs/frameworks/)

## آموزش های مرتبط {#related-tutorials}

- [Web3js را برای استفاده از بلاک چین اتریوم در جاوا اسکریپت راه اندازی کنید](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) *– دستورالعمل هایی برای راه اندازی web3.js در پروژه شما.*
- [فراخوانی قرارداد هوشمند در جاوا اسکریپت](/developers/tutorials/calling-a-smart-contract-from-javascript/)_- با استفاده از توکن Dai، ببینید چگونه می‌شود با استفاده از توابع قراردادها را فراخوانی کرد._
