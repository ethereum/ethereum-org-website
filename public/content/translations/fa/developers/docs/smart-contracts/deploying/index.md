---
title: استقرار قرارداد هوشمند
description:
lang: fa
---

به منظور در دسترس بودن قرارداد هوشمند شما برای کاربران یک شبکه اتریوم، شما باید آن را پیاده‌سازی کنید.

برای استقرار یک قرارداد هوشمند، شما فقط یک تراکنش اتریوم حاوی کد کامپایل شده قرارداد هوشمند را بدون تعیین هیچ گیرنده ای ارسال می کنید.

## پیش‌نیازها {#prerequisites}

شما باید [شبکه‌ی اتریوم](/developers/docs/networks/)، [تراکنش‌ها](/developers/docs/transactions/) و [آناتومی قراردادهای هوشمند](/developers/docs/smart-contracts/anatomy/) را پیش از استقرار قرارداد هوشمند بدانید.

پیاده‌سازی یک قرارداد نیز همچنین دارای هزینه اتر (ETH) است زیرا آنها بر روی زنجیره‌‌ی بلوکی ذخیره شده اند، بنابراین بایستی با مفهوم [هزینه و کارمزد](/developers/docs/gas/) بر روی اتریوم آشنا باشید.

نهایتا نیاز به کامپایل کردن قرارداد خود پیش از استقرار آن دارید، پس مطمئن شوید که درباره‌ی [کامپایل کردن قرارداد هوشمند](/developers/docs/smart-contracts/compiling/) مطالعه کرده باشید.

## چگونه یک قرارداد هوشمند را مستقر کنیم {#how-to-deploy-a-smart-contract}

### آنچه نیاز خواهید داشت {#what-youll-need}

- بایت‌کد قراردادتان - این توسط [کامپایل کردن](/developers/docs/smart-contracts/compiling/) ساخته می‌شود
- اتر برای گاز - شما حد گاز خود را مانند سایر تراکنش‌ها تعیین می‌کنید، بنابراین توجه داشته باشید که استقرار قرارداد به گاز بسیار بیشتری نسبت به یک انتقال ساده اتر نیاز دارد
- یک اسکریپت یا افزونه استقرار
- دسترسی به یک[گره اتریوم](/developers/docs/nodes-and-clients/)، با اجرای خودتان، یا اتصال به یک گره عمومی، و یا با استفاده از یک[سرویس گره](/developers/docs/nodes-and-clients/nodes-as-a-service/) از طریق یک API

### گام‌های استقرار یک قرارداد هوشمند {#steps-to-deploy}

مراحل خاص مربوط به چارچوب توسعه مورد نظر بستگی دارد. برای مثال، می‌توانید [ مستندات یا همان اسناد هاردهت در مورد استقرار قراردادهای خود](https://hardhat.org/guides/deploying.html) یا [ مستندات فاندری در مورد استقرار و تأیید قرارداد هوشمند را بررسی کنید](https://book.getfoundry.sh/forge/deploying). پس از استقرار، قرارداد شما مانند سایر [حساب‌ها](/developers/docs/accounts/) دارای یک آدرس اتریوم خواهد بود و می‌توان آن را با استفاده از ابزار تأیید کد منبع[](/developers/docs/smart-contracts/ تأیید کرد. verifying/#source-code-verification-tools).

## ابزارهای مرتبط {#related-tools}

**Remix - _Remix IDE امکان توسعه، استقرار و مدیریت قراردادهای هوشمند برای اتریوم مانند بلاک چین را فراهم می کند._**

- [Remix](https://remix.ethereum.org)

**Tenderly - _پلتفرم توسعه دهندگی در Web3 که با ارائه سرویس هایی چون دیباگ، نظارت و زیرساخت های توسعه قرارداد هوشمند توسعه، تست، نظارت، و اجرا قراردادهای هوشمند را میسر میسازد_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [گیت‌هاب](https://github.com/Tenderly)
- [دیسکورد](https://discord.gg/eCWjuvt)

**Hardhat - _یک محیط توسعه برای کامپایل، استقرار، آزمایش و اشکال زدایی نرم‌افزار اتریوم شما_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [مستنداتی بر استقرار قرارداد خودتان](https://hardhat.org/guides/deploying.html)
- [گیت هاب](https://github.com/nomiclabs/hardhat)
- [دیسکورد](https://discord.com/invite/TETZs2KK4k)

**thirwenb - _با یک دستور، هر قرارداد هوشمندی را بر هر شبکه سازگار با ماشین مجازی اتریوم (EVM) به راحتی پیاده کنید_**

- [اسناد](https://portal.thirdweb.com/deploy/)

**کراس مینت- _پلتفرم توسعه Web3 درجه سازمانی برای استقرار قراردادهای هوشمند، فعال کردن پرداخت‌های کارت اعتباری و زنجیره‌ای متقابل و استفاده از API برای ایجاد، توزیع، فروش، ذخیره و ویرایش ان‌اف‌تی است._**

- [crossmint.com](https://www.crossmint.com)
- [اسناد](https://docs.crossmint.com)
- [دیسکورد](https://discord.com/invite/crossmint)
- [بلاگ](https://blog.crossmint.com)

## آموزش های مرتبط {#related-tutorials}

- [استقرار اولین قرارداد هوشمندتان](/developers/tutorials/deploying-your-first-smart-contract/) _- مقدمه ای برای استقرار اولین قرارداد هوشمندتان در یک شبکه آزمایشی اتریوم._
- [ سلام دنیا! | آموزش قرارداد هوشمند](/developers/tutorials/hello-world-smart-contract/)_–آموزشی ساده برای ساخت و& پیاده کردن یک قرارداد هوشمند ابتدایی روی اتریوم._
- [تعامل با سایر قراردادهای Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– نحوه استقرار هوشمند قرارداد از یک قرارداد موجود و تعامل با آن._
- [چگونه اندازه قرارداد خود را کوچک کنیم](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- چگونه اندازه قرارداد خود را کاهش دهید تا آن را زیر حد مجاز نگه دارید و در مصرف گاز صرفه جویی کنید_

## بیشتر بخوانید {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [استقرار قراردادتان با Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_می‌خواهید در مورد منابع جامعه که به شما کمک کرده بدانید؟ این صفحه را ویرایش و اضافه کنید!_

## موضوعات مرتبط {#related-topics}

- [چارچوب‌های توسعه](/developers/docs/frameworks/)
- [اجرای یک گره‌ی اتریوم](/developers/docs/nodes-and-clients/run-a-node/)
- [گره‌-به‌عنوان-خدمت](/developers/docs/nodes-and-clients/nodes-as-a-service)
