---
title: اتریوم برای توسعه دهندگان Rust
description: یاد بگیرید چطور اتریوم را با پروژه ها و ابزارهای مبتنی بر rust توسعه دهید
lang: fa
incomplete: true
---

<FeaturedText>یاد بگیرید چطور اتریوم را با پروژه ها و ابزارهای مبتنی بر Rust توسعه دهید</FeaturedText>

از اتریوم برای ساخت برنامه های غیرمتمرکز (اصطلاحا dapps) ی که از مزایای فناوری مبتنی بر رمزراز و زنجیره بلوکی استفاده می کنند، استفاده کنید. این برنامه های غیرمتمرکز می توانند قابل اعتماد باشند،به این معنا که وقتی آنها در Ethereum مستقر شوند ، همیشه طبق برنامه اجرا می شوند. آنها با ایجاد انواع جدیدی از برنامه های کاربردی مالی، قادر به کنترل دارایی های دیجیتال خواهند بود. آنها می توانند غیرمتمرکز باشند ، به این معنی که هیچ نهاد یا شخص واحدی آنها را کنترل نمی کند و سانسور آنها تقریباً غیرممکن است.

## شروع به کار با قراردادهای هوشمند و زبان Solidity {#getting-started-with-smart-contracts-and-solidity}

**اولین قدم های خود را برای ادغام Rust با اتریوم بردارید**

آیا به توضیحات پایه‌ای بیشتری نیاز دارید؟ آدرس‌های زیر را بررسی کنید [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/).

- [زنجیره بلوکی توضیح داده شده است](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [درک قراردادهای هوشمند](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اولین قرارداد هوشمند خود را بنویسید](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [بیاموزید که چگونه رویه را گردآوری و استفاده کنید](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مقالات مبتدی {#beginner-articles}

- [انتخاب یک کلاینت اتریومی](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [کلاینت Rust Ethereum](https://openethereum.github.io/) \* **توجه داشته باشید که OpenEthereum [منسوخ شده است](https://medium.com/openethereum/gnosis-joins-erigon-forerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) و دیگر نگهداری نمی شود.** از آن با احتیاط استفاده کنید و ترجیحاً به پیاده سازی کلاینت دیگری بروید.
- [ارسال تراکنش به اتریوم با استفاده از Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [آموزش گام به گام نحوه نوشتن قراردادها در Rust Wasm برای Kovan](https://github.com/paritytech/pwasm-tutorial)

## مقالات سطح متوسط {#intermediate-articles}

## الگوهای مورد استفاده سطح پیشرفته {#advanced-use-patterns}

- [pwasm_ethereum کتابخانه خارجی برای تعامل با شبکه شبیه اتریوم](https://github.com/openethereum/pwasm-ethereum)
- [ایجاد یک چت غیرمتمرکز با استفاده از JavaScript و Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [با استفاده از Vue.js & Rust یک برنامه غیرمتمرکز Todo بسازید](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [یک بلاک چین در Rust بسازید](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## پروژه ها و ابزارهای Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _مجموعه‌ای از بخش‌های خارجی‌ برای تعامل با شبکه‌های شبه اتریوم</a> em></li>
- [Lighthouse](https://github.com/sigp/lighthouse) - _کلاینت لایه‌ی اجماع سریع اتریوم_
- [اتریوم وب اسمبلی](https://ewasm.readthedocs.io/en/mkdocs/) - _طراحی مجدد لایه اجرای قرارداد هوشمند اتریوم با استفاده از بخش قطعی زیر مجموعه را ارائه می‌دهد. WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _مرجع API OASIS_
- [سولاریس](https://github.com/paritytech/sol-rs) - _دستگاه تست واحد قراردادهای هوشمند سالیدیتی با استفاده از Parity Client EVM اصلی.< /em></li>
- [SputnikVM](https://github.com/rust-blockchain/evm) - _پیاده سازی ماشین مجازی Rust Ethereum_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _قرارداد هوشمند Wavelet در Rust_
- [فوندری](https://github.com/foundry-rs/foundry) - _ابزار توسعه برنامه اتریوم_
- [آلوی](https://alloy.rs) - _با عملکرد بالا، به خوبی آزمایش شده و amp; کتابخانه‌های مستند شده برای تعامل با اتریوم و سایر زنجیره‌های مبتنی بر ماشین مجازی اتریوم_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _اجرای کیف پول و کتابخانه اتریوم_
- [SewUp](https://github.com/second-state/SewUp) - _کتابخانه ای که به شما کمک می کند قرارداد وب اسمبلی اتریوم خود را با Rust بسازید و درست مانند توسعه در یک بک‌اند مشترک_
- [جریان‌های فرعی](https://github.com/streamingfast/substreams) - _فناوری نمایه‌سازی داده‌های بلاکچین موازی_
- [Reth](https://github.com/paradigmxyz/reth) Reth (مخفف راست اتریوم Rust) یک پیاده‌سازی تمام نود یا گره جدید اتریوم است
- [اتریوم Rust عالی](https://github.com/Vid201/awesome-ethereum-rust) - _مجموعه سرپرستی شده از پروژه‌ها در اکوسیستم اتریوم است. Rust_</ul>

به دنبال منابع بیشتری هستید؟ پس اینجا را ببینید [ethereum.org/developers.](/developers/)

## مشارکت کنندگان انجمن Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
