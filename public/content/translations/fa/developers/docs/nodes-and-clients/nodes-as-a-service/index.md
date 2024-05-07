---
title: گره‌ها به‌عنوان سرویس
description: مرور کلی خدمات گره، مزایا و معایب آنها و ارائه‌دهندگان محبوب برای تازه‌واردان.
lang: fa
sidebarDepth: 2
---

## مقدمه {#Introduction}

اجرای [گره اتریوم](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) می‌تواند چالش برانگیز باشد، به خصوص زمانی که به سرعت شروع می‌شود یا هنگامی که به سرعت مقیاس‌پذیر می‌شود. [سرویس‌های متعددی](#popular-node-services) وجود دارند که زیرساخت‌های گره‌ی بهینه‌سازی‌شده‌ای را برای شما اجرا می‌کنند، بنابراین می‌توانید به جای آن بر توسعه‌ی برنامه یا محصول خود تمرکز کنید. ما نحوه‌ی عملکرد سرویس‌های گره، مزایا و معایب استفاده از آن‌ها را توضیح می‌دهیم و در صورت تمایل به شروع، ارائه‌دهندگان آن‌ها را فهرست خواهیم کرد.

## پیش‌نیازها {#prerequisites}

اگر از قبل درک درستی از گره‌ها و کلاینت‌ها ندارید، به [گره‌ها و کلاینت‌ها](/developers/docs/nodes-and-clients/) مراجعه کنید.

## سرویس‌های گره چگونه کار می‌کنند؟ {#how-do-node-services-work}

ارائه‌دهندگان خدمات گره، کلاینت‌های گره‌ی توزیع شده را در پشت‌صحنه برای شما اجرا می‌کنند، بنابراین نیازی ندارید که خودتان آن‌ها را انجام دهید.

این سرویس‌ها معمولاً یک کلید API ارائه می‌کنند که می‌توانید از آن برای نوشتن و خواندن از زنجیره‌ی بلوکی استفاده کنید. آن‌ها اغلب علاوه بر شبکه‌ی اصلی به [شبکه‌های تست اتریوم](/developers/docs/networks/#ethereum-testnets) نیز دسترسی دارند.

برخی از سرویس‌ها گره‌ی اختصاصی خودشان را به شما ارائه می‌دهند و آن‌ها را برای شما مدیریت می‌کنند، در حالی که برخی دیگر از متعادل‌کننده‌های بار برای توزیع فعالیت در گره‌ها استفاده می‌کنند.

ادغام با اغلب سرویس‌های گره به‌شدت آسان است، که معمولاً شامل یک خط تغییر در کد خود برای تعویض گره‌ای که خودتان میزبانی می‌کنید یا حتی جابجایی آن‌ها بین خودشان می‌شود.

اغلب اوقات سرویس‌های گره انواع مختلفی از [کلاینت های گره](/developers/docs/nodes-and-clients/#execution-clients) و [نوع ها](/developers/docs/nodes-and-clients/#node-types) را اجرا می‌کنند که به شما این امکان را می‌دهد تا علاوه بر روش‌های خاص کلاینت در یک وب سرویس به گره‌های کامل و بایگانی‌شده نیز دسترسی داشته باشید.

خاطرنشان می‌شود که سرویس‌های گرهْ کلیدهای خصوصی یا اطلاعات شما را نباید و نمی‌توانند ذخیره کنند.

## مزایای استفاده از یک سرویس گره چیست؟ {#benefits-of-using-a-node-service}

مزیت اصلی استفاده از سرویس گره این است که نیازی به صرف زمان مهندسی برای نگهداری و مدیریت گره‌ها ندارید. این کار به شما امکان می‌دهد به‌جای نگرانی در مورد تعمیر و نگهداری زیرساخت، روی ساخت محصول خود تمرکز کنید.

اجرای گره‌های شخصی شما از ذخیره‌سازی تا پهنای باند و زمان مهندسی ارزشمند شما، می‌تواند بسیار هزینه‌بر باشد. Things like spinning up more nodes when scaling, upgrading nodes to the latest versions, and ensuring state consistency, can distract from building and spending resources on your desired web3 product.

## معایب استفاده از یک سرویس گره چیست؟ {#cons-of-using-a-node-service}

با استفاده از یک سرویس گره، وضعیت زیرساختی محصول خود را متمرکز می‌کنید. به همین دلیل، پروژه‌هایی که در آنها تمرکززدایی از اهمیت بالایی برخوردار است، ممکن است گره‌های خود میزبان را به برون‌سپاری به طرف ثالث ترجیح دهند.

درباره [مزایای اجرای گره‌ی خودتان](/developers/docs/nodes-and-clients/#benefits-to-you) بیشتر بخوانید.

## سرویس‌های گره محبوب {#popular-node-services}

در اینجا فهرستی از محبوب ترین ارائه‌دهندگان گره‌ی اتریوم آورده شده است، به‌راحتی می‌توانید مواردی که درج نشده‌اند را اضافه کنید! هر سرویس گره علاوه بر سطوح رایگان یا پولی، مزایا و ویژگی‌های مختلفی را ارائه می‌کند، شما باید قبل از تصمیم‌گیری، بررسی کنید که کدامیک به بهترین شکل با نیازهای شما مطابقت دارند.

- [**Alchemy**](https://www.alchemy.com/)
  - [مستندات](https://docs.alchemyapi.io/)
  - ویژگی‌ها
    - دارای سطح رایگان
    - مقیاس‌پذیری در حین استفاده
    - داده‌های آرشیوی رایگان
    - ابزار تجزیه و تحلیل
    - پیشخان
    - نقاط پایانی منحصربه‌فرد وب سرویس
    - قلاب‌های وب
    - پشتیبانی مستقیم
- [**Ankr**](https://www.ankr.com/)
  - [مستندات](https://docs.ankr.com/)
  - ویژگی‌ها
    - پروتکل Ankr - دسترسی به نقاط پایانی وب سرویس RPC عمومی را برای بیش از 8 زنجیره باز می‌کند
    - تعادل بار و نظارت بر سلامت گره برای یک گذرگاه سریع و قابل‌اعتماد به نزدیکترین گره موجود
    - سطح ممتاز که نقطه پایانی WSS و محدودیت نرخ بدون سقف را فعال می‌کند
    - استقرار گره‌ی کامل و اعتبارسنج با یک کلیک برای بیش از 40 زنجیره
    - مقیاس‌پذیری دلخواه
    - ابزار تجزیه و تحلیل
    - پیشخان
    - نقاط پایانی RPC،‏ HTTPS و WSS
    - پشتیبانی مستقیم
- [**BlockDaemon**](https://blockdaemon.com/)
  - [مستندات](https://ubiquity.docs.blockdaemon.com/)
  - مزایا
    - پیشخان
    - پایه‌ی گره‌مبنا
    - تجزیه و تحلیل
- [**Chainstack**](https://chainstack.com/)
  - [مستندات](https://docs.chainstack.com/)
  - ویژگی‌ها
    - گره‌های اشتراکی رایگان
    - گره‌های اشتراکی آرشیو
    - پشتیبانی از GraphQL
    - نقاط پایانی RPC،‏ HTTPS و WSS
    - گره‌های کامل و بایگانی اختصاصی
    - زمان همگام‌سازی سریع برای بکارگیری‌های اختصاصی
    - اتصال به سرویس‌های ابری شما
    - هزینه‌ی ساعتی
    - پشتیبانی مستقیم شبانه‌روزی در تمام ایام هفته
- [**GetBlock**](https://getblock.io/)
  - [مستندات](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - ویژگی‌ها
    - دسترسی به بیش از 40 گره‌ی زنجیره‌ی بلوکی
    - 40 هزار درخواست رایگان روزانه
    - کلیدهای وب سرویس نامحدود
    - سرعت اتصال بالا 1 گیگابایت بر ثانیه
    - ردیابی+آرشیو
    - تجزیه و تحلیل پیشرفته
    - به‌روزرسانی‌های خودکار
    - پشتیبانی فنی
- [**InfStones**](https://infstones.com/)
  - ویژگی‌ها
    - دارای سطح رایگان
    - مقیاس‌پذیری در حین استفاده
    - تجزیه و تحلیل
    - پیشخان
    - نقاط پایانی منحصربه‌فرد وب سرویس
    - گره‌های کامل اختصاصی
    - زمان همگام‌سازی سریع برای بکارگیری‌های اختصاصی
    - پشتیبانی مستقیم شبانه‌روزی در تمام ایام هفته
    - دسترسی به بیش از 50 گره زنجیره‌ی بلوکی
- [**Infura**](https://infura.io/)
  - [مستندات](https://infura.io/docs)
  - ویژگی‌ها
    - دارای سطح رایگان
    - مقیاس‌پذیری در حین استفاده
    - داده‌های آرشیوی پولی
    - پشتیبانی مستقیم
    - پیشخان
- [**Kaleido**](https://kaleido.io/)
  - [مستندات](https://docs.kaleido.io/)
  - ویژگی‌ها
    - Free startier tier
    - One-click Ethereum node deployment
    - Customizable clients and algorithms (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ administrative and service APIs
    - RESTful interface for Ethereum transaction submission (Apache Kafka backed)
    - Outbound streams for event delivery (Apache Kafka backed)
    - Deep collection of "off-chain" and ancillary services (e.g. bilateral encrypted messaging transport)
    - Straightforward network onboarding with governance and role-based access control
    - Sophisticated user management for both administrators and end users
    - Highly scalable, resilient, enterprise-grade infrastructure
    - Cloud HSM private key management
    - Ethereum Mainnet Tethering
    - ISO 27k and SOC 2, Type 2 certifications
    - Dynamic runtime configuration (e.g. adding cloud integrations, altering node ingresses, etc.)
    - Support for multi-cloud, multi-region and hybrid deployment orchestrations
    - Simple hourly SaaS-based pricing
    - SLAs and 24x7 support
- [**Moralis**](https://moralis.io/)
  - [مستندات](https://docs.moralis.io/)
  - ویژگی‌ها
    - گره‌های اشتراکی رایگان
    - گره‌های آرشیو اشتراکی رایگان
    - تمرکز بر حفظ حریم خصوصی (سیاست عدم حفظ سوابق کار)
    - پشتیبانی از زنجیره‌ی متقاطع
    - مقیاس‌پذیری در حین استفاده
    - پیشخان
    - SDK اتریوم منحصربه‌فرد
    - نقاط پایانی منحصربه‌فرد وب سرویس
    - پشتیبانی فنی مستقیم
- [**Pocket Network**](https://www.pokt.network/)
  - [مستندات](https://docs.pokt.network/home/)
  - ویژگی‌ها
    - پروتکل و بازار RPC غیرمتمرکز
    - 1 میلیون درخواست در روز در سطح رایگان (به ازای هر نقطه‌ی پایانی، حداکثر 2)
    - [نقاط پایانی عمومی](https://docs.pokt.network/developers/public-endpoints)
    - برنامه‌ی +Pre-Stake (اگر به بیش از 1 میلیون درخواست در روز نیاز دارید)
    - پشتیبانی از بیش از 15 زنجیره‌ی بلوکی
    - بیش از 6400 گره که برای خدمت‌رسانی به برنامه‌های کاربردی POKT کسب می‌کنند
    - گره‌ی آرشیو، گره‌ی آرشیو با ردیابی و پشتیبانی از گره‌ی شبکه‌ی تست
    - تنوع در کلاینت گره شبکه‌ی اصلی اتریوم
    - هیچ نقطه شکستی وجود ندارد
    - زمان خاموشی صفر
    - اقتصاد توکنی نزدیک به صفر و مقرون‌به‌صرفه (برای پهنای باند شبکه، یک بار POKT را سهام‌گذاری کنید)
    - بدون هزینه‌های ماهانه، زیرساخت‌های خود را به یک دارایی تبدیل کنید
    - تعادل بار در پروتکل تعبیه شده است
    - تعداد درخواست‌ها در روز و تعداد گره‌ها را در هر ساعت به‌طور بی‌نهایت مقیاس‌پذیر کنید
    - خصوصی‌ترین و مقاوم‌ترین گزینه در برابر سانسور
    - پشتیبانی عملی از توسعه‌دهندگان
    - پیشخان و تجزیه و تحلیل [پورتال Pocket](https://bit.ly/ETHorg_POKTportal)
- [**QuikNode**](https://www.quiknode.io/)
  - ویژگی‌ها
    - ۷ - روز امتحان رایگان
    - پشتیبانی متنوع
    - قلاب‌های وب
    - پیشخان
    - تجزیه و تحلیل
- [**Rivet**](https://rivet.cloud/)
  - [مستندات](https://rivet.readthedocs.io/en/latest/)
  - ویژگی‌ها
    - دارای سطح رایگان
    - مقیاس‌پذیری در حین استفاده
- [**SettleMint**](https://console.settlemint.com/)
  - [مستندات](https://docs.settlemint.com/)
  - ویژگی‌ها
    - دوره‌ی آزمایشی رایگان
    - مقیاس‌پذیری در حین استفاده
    - پشتیبانی از GraphQL
    - نقاط پایانی RPC،‏ HTTPS و WSS
    - گره‌های کامل اختصاصی
    - اتصال به سرویس‌های ابری خود
    - ابزار تجزیه و تحلیل
    - پیشخان
    - هزینه‌ی ساعتی
    - پشتیبانی مستقیم
- [**Watchdata**](https://watchdata.io/)
  - [مستندات](https://docs.watchdata.io/)
  - ویژگی‌ها
    - Data reliability
    - Uninterrupted connection with no downtime
    - Process automation
    - Free tariffs
    - High limits that suit any user
    - Support for various nodes
    - Resource scaling
    - High processing speeds

## بیشتر بخوانید {#further-reading}

- [فهرست خدمات گره اتریوم](https://ethereumnodes.com/)

## موضوعات مرتبط {#related-topics}

- [گره‌ها و کلاینت‌ها](/developers/docs/nodes-and-clients/)

## آموزش‌های مرتبط {#related-tutorials}

- [شروع توسعه‌ی اتریوم با استفاده از Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [راهنمای ارسال تراکنش‌ها با استفاده از web3 و Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
