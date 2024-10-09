---
title: اتریوم برای توسعه دهندگان جاوا
description: یاد بگیرید چطور اتریوم را با پروژه ها و ابزارهای مبتنی بر جاوا توسعه دهید
lang: fa
incomplete: true
---

<FeaturedText>یاد بگیرید چطور اتریوم را با پروژه ها و ابزارهای مبتنی بر جاوا توسعه دهید</FeaturedText>

از اتریوم برای ساخت برنامه های غیرمتمرکز (اصطلاحا dapps) ی که از مزایای فناوری مبتنی بر رمزراز و زنجیره بلوکی استفاده می کنند، استفاده کنید. این برنامه های غیرمتمرکز می توانند قابل اعتماد باشند،به این معنا که وقتی آنها در اتریوم مستقر شوند ، همیشه طبق برنامه اجرا می شوند. آنها با ایجاد انواع جدیدی از برنامه های کاربردی مالی، قادر به کنترل دارایی های دیجیتال خواهند بود. آنها می توانند غیرمتمرکز باشند ، به این معنی که هیچ نهاد یا شخص واحدی آنها را کنترل نمی کند و سانسور آنها تقریباً غیرممکن است.

## شروع کار با قراردادهای هوشمند و زبان Solidity {#getting-started-with-smart-contracts-and-solidity}

**اولین قدم های خود را برای ادغام جاوا با اتریوم بردارید**

آیا به توضیحات پایه‌ای بیشتری نیاز دارید؟ آدرس‌های زیر را بررسی کنید [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/)

- [زنجیره بلوکی توضیح داده شده است](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [درک قراردادهای هوشمند](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اولین هوش پیمان خود را بنویسید](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [نحوه کامپایل و استقرار Solidity را بیاموزید](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## کار با کلاینت های اتریوم {#working-with-ethereum-clients}

نحوه استفاده از [Web3J](https://github.com/web3j/web3j) و Hyperledger Besu، دو کلاینت پیشرو جاوا اتریوم را بیاموزید

- [اتصال به کلاینت اتریوم با Java، Eclipse و Web3J](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [یک حساب اتریوم را با Java و Web3j مدیریت کنید](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [از قرارداد هوشمند خود یک Java Wrapper ایجاد کنید](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [تعامل با یک قرارداد هوشمند اتریومی](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [گوش دادن به رویدادهای قرارداد هوشمند اتریومی](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [استفاده از Besu (Pantheon)، کلاینت Java اتریوم با لینوکس](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [اجرای یک گره Hyperledger (Pantheon) در آزمون‌های ادغام Java](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [برگه Cheat Web3j](https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c)

نحوه استفاده از [ethers-kt](https://github.com/Kr1ptal/ethers-kt) را بیاموزید که یک کتابخانه همگام و با کارایی بالا کاتلین برای تعامل با بلاکچین‌های مبتنی بر ماشین مجازی اتریوم است. هدف قرار دادن پلتفرم‌های JVM و اندروید.
- [انتقال توکن‌های ERC20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [سواپ Uniswap ورژن 2 با گوش دادن به رویداد (event listening)](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ردیاب تعادل ETH / ERC20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## مقالات سطح متوسط {#intermediate-articles}

- [مدیریت فضای ذخیره سازی در برنامه Java با IPFS](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [مدیریت توکن های ERC20 در Java با Web3j](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [مدیران تراکنش Web3j](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## الگوهای استفاده پیشرفته {#advanced-use-patterns}

- [استفاده از اتریوم برای ساخت داده حافظه پنهان از یک قرارداد هوشمند جاوایی](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## پروژه ها و ابزارهای جاوا {#java-projects-and-tools}

- [Hyperledger Besu (Pantheon) (کلاینت اتریوم)](https://docs.pantheon.pegasys.tech/en/stable/)
- [Web3J (کتابخانه ای برای تعامل با کلاینت های اتریوم)](https://github.com/web3j/web3j)
- [ethers-kt (Async، کتابخانه کاتلین/جاوا/اندروید با کارایی بالا برای بلاک چین‌های مبتنی بر ماشین مجازی اتریوم.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (شنونده رویداد)](https://github.com/ConsenSys/eventeum)
- [Mahuta (ابزار توسعه دهنده IPFS)](https://github.com/ConsenSys/mahuta)

به دنبال منابع بیشتری هستید؟ پس اینجا را ببینید [ethereum.org/developers.](/developers/)

## مشارکت کنندگان انجمن جاوا {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
- [Besu HL chat](https://chat.hyperledger.org/channel/besu)
