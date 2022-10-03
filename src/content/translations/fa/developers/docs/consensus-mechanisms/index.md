---
title: مکانیزم‌های اجماع
description: توضیحی درباره پروتکل‌های اجماع در سیستم‌های توزیع‌شده و نقشی که در اتریوم ایفا می‌کنند.
lang: fa
---

The term 'consensus mechanism' is often used colloquially to refer to 'proof-of-stake', 'proof-of-work' or 'proof-of-authority' protocols. However, these are just components in consensus mechanisms that protect against Sybil attacks. Consensus mechanisms are the complete stack of ideas, protocols and incentives that enable a distributed set of nodes to agree on the state of a blockchain.

## پیش‌نیازها {#prerequisites}

برای درک بهتر این صفحه،‌ توصیه می‌شود که ابتدا [مقدمه‌ای بر اتریوم](/developers/docs/intro-to-ethereum/) مطالعه شود.

## اجماع چیست؟ {#what-is-consensus}

منظور از اجماع، یک توافقنامه‌ی کلی است که به آن دست یافته‌ایم. فرض کنید گروهی از افراد به سینما می‌روند. If there is no disagreement on a proposed choice of film, then a consensus is achieved. If there is disagreement, the group must have the means to decide which film to see. In extreme cases, the group will eventually split.

In regards to the Ethereum blockchain, the process is formalized, and reaching consensus means that at least 66% of the nodes on the network agree on the global state of the network.

## مکانیزم اجماع چیست؟ {#what-is-a-consensus-mechanism}

The term consensus mechanism refers to the entire stack of protocols, incentives and ideas that allow a network of nodes to agree on the state of a blockchain.

Ethereum uses a proof-of-stake-based consensus mechanism that derives its crypto-economic security from a set of rewards and penalties applied to capital locked by stakers. This incentive structure encourages individual stakers to operate honest validators, punishes those who don't, and creates an extremely high cost to attack the network.

Then, there is a protocol that governs how honest validators are selected to propose or validate blocks, process transactions and vote for their view of the head of the chain. In the rare situations where multiple blocks are in the same position near the head of the chain, there is a fork-choice mechanism that selects blocks that make up the 'heaviest' chain, measured by the number of validators that voted for the blocks weighted by their staked ether balance.

Some concepts are important to consensus that are not explicitly defined in code, such as the additional security offered by potential out-of-band social coordination as a last line of defense against attacks on the network.

These components together form the consensus mechanism.

## انواع مکانیزم‌های اجماع {#types-of-consensus-mechanisms}

### Proof-of-work based {#proof-of-work}

Like Bitcoin, Ethereum once used a **proof-of-work (PoW)** based consensus protocol.

#### ساختن بلوک {#pow-block-creation}

Validators create blocks. One validator is randomly selected in each slot to be the block proposer. Their consensus client requests a bundle of transactions as an 'execution payload' from their paired execution client. They wrap this in consensus data to form a block, which they send to other nodes on the Ethereum network. This block production is rewarded in ETH. In rare cases when multiple possible blocks exist for a single slot, or nodes hear about blocks at different times, the fork choice algorithm picks the block that forms the chain with the greatest weight of attestations (where weight is the number of validators attesting scaled by their ETH balance).

#### ایمنی {#pow-security}

شبکه با توجه به این حقیقت که برای فریب دادن زنجیره نیاز به ‎51%‏ توان پردازشی شبکه دارید، ایمن می‌ماند. این کار نیاز به چنان سرمایه‌گذاری زیادی برای تجهیزات و انرژی دارد که احتمالاً خرج شما از سودی که به دست خواهید آورد بیشتر خواهد بود.

اطلاعات بیشتر درباره‌ی [اثبات کار](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-stake based {#proof-of-stake}

Ethereum now uses a **proof-of-stake (PoS)** based consensus protocol.

#### ساختن بلوک {#pos-block-creation}

اثبات سهام توسط اعتبارسنج‌هایی که برای مشارکت در سیستم اتر سهام‌گذاری کرده‌اند انجام می‌شود. اعتبارسنج به شکل تصادفی برای ساخت بلوک جدید انتخاب می‌شود و آن را با بقیه‌ی شبکه به اشتراک گذاشته و پاداش دریافت می‌کند. به جای کار محاسباتی بسیار زیاد، کافی است که اتر خود را در شبکه سهام‌گذاری کنید. این مشوقی است که برای رفتار سالم در شبکه تعیین شده است.

#### ایمنی {#pos-security}

A proof-of-stake system is secure crypto-economically because an attacker attempting to take control of the chain must destroy a massive amount of ETH. A system of rewards incentivizes individual stakers to behave honestly, and penalties disincentivize stakers from acting maliciously.

اطلاعات بیشتر درباره‌ی [اثبات سهام](/developers/docs/consensus-mechanisms/pos/)

### یک راهنمای تصویری {#types-of-consensus-video}

برای کسب اطلاعات بیشتر درباره‌ی مکانیزم‌های اجماع مختلف استفاده‌شده در اتریوم تماشا کنید:

<YouTube id="ojxfbN78WFQ" />

### مقاومت سیبیل و انتخاب زنجیره {#sybil-chain}

Proof-of-work and proof-of-stake alone are not consensus protocols, but they are often referred to as such for simplicity. این‌ها در واقع مکانیزم‌های مقاومت سیبیل و انتخاب‌کننده‌ی نویسنده‌ی بلوک‌ هستند؛ روشی هستند برای انتخاب اینکه چه کسی آخرین بلوک را بنویسد. Another important component is the chain selection (aka fork choice) algorithm that enables nodes to pick one single correct block at the head of the chain in scenarios where multiple blocks exist in the same position.

**مقاومت سیبیل** میزان گذر یک پروتکل در مقابل یک [حمله‌ی سیبیل](https://wikipedia.org/wiki/Sybil_attack) را می‌سنجد. حملات سیبیل وقتی اتفاق می‌افتند که یک کاربر یا گروه تظاهر می‌کند چند کاربر مختلف است. مقاومت در برابر چنین حملاتی برای یک زنجیره‌ی بلوکی غیرمتمرکز بسیار ضروری است و به استخراج‌گرها و اعتبارسنج‌ها امکان می‌دهد بر اساس منابعی که در اختیار گذاشته‌اند به‌صورت مساوی پاداش دریافت کنند. اثبات سهام و اثبات کار با مجبور کردن کاربر به هزینه کردن انرژی بسیار یا گذاشتن وثیقه‌ی زیاد، جلوی این حمله را می‌گیرند. این تمهیدات محافظتی، مانعی به‌صرفه علیه حملات سیبیل هستند.

یک **قانون انتخاب زنجیره** برای تصمیم‌گیری در این باره که کدام زنجیره، زنجیره‌ی «درست» است، استفاده می‌شود. Bitcoin uses the "longest chain" rule, which means that whichever blockchain is the longest will be the one the rest of the nodes accept as valid and work with. برای زنجیره‌های اثبات کار، بلندترین زنجیره بر اساس سختی اثبات کار تجمیعی کل زنجیره مشخص می‌شود. Ethereum used to use the longest chain rule too; however, now that Etheruem runs on proof-of-stake it adopted an updated fork-choice algorithm that measures the 'weight' of the chain. The weight is the accumulated sum of validator votes, weighted by validator staked-ether balances.

Ethereum uses a consensus mechanism known as [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) that combines [Casper FFG proof-of-stake](https://arxiv.org/abs/1710.09437) with the [GHOST fork-choice rule](https://arxiv.org/abs/2003.03052).

## بیشتر بخوانید {#further-reading}

- [الگوریتم اجماع زنجیره‌ی بلوکی چیست؟](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [اجماع ناکاموتو چیست؟ راهنمای کامل مبتدی‌ها](https://blockonomi.com/nakamoto-consensus/)
- [Casper چگونه کار می‌کند؟](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [درباره‌ی ایمنی و کارایی زنجیره‌های بلوکی مبتنی بر اثبات کار](https://eprint.iacr.org/2016/555.pdf)
- [تحمل خطای بیزانس](https://en.wikipedia.org/wiki/Byzantine_fault)

_آیا منبعی اجتماعی می‌شناسید که به شما کمک کرده باشد؟ این صفحه را ویرایش کنید و به آن اضافه کنید!_

## موضوعات مرتبط {#related-topics}

- [اثبات کار](/developers/docs/consensus-mechanisms/pow/)
- [استخراج](/developers/docs/consensus-mechanisms/pow/mining/)
- [اثبات سهام](/developers/docs/consensus-mechanisms/pos/)
