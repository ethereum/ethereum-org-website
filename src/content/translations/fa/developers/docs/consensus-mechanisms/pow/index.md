---
title: اثبات کار (PoW)
description: توضیحی درباره‌ی پروتکل اجماع اثبات کار و نقشش در اتریوم.
lang: fa
---

The Ethereum network began by using a consensus mechanism that involved **[Proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow)**. This allowed the nodes of the Ethereum network to agree on the state of all information recorded on the Ethereum blockchain and prevented certain kinds of economic attacks. However, Ethereum switched off proof-of-work in 2022 and started using [proof-of-stake](/developers/docs/consensus-mechanisms/pos) instead.

<InfoBanner emoji=":wave:">
    Proof-of-work has now been deprecated. Ethereum no longer uses proof-of-work as part of its consensus mechanism. Instead, it uses proof-of-stake. Read more on <a href="/developers/docs/consensus-mechanisms/pos/">proof-of-stake</a> and <a href="/staking/">staking</a>.    
</InfoBanner>

## پیش‌نیازها {#prerequisites}

برای درک بهتر این صفحه، توصیه می‌کنیم ابتدا [تراکنش‌ها](/developers/docs/transactions/)‏، [بلوک‌ها](/developers/docs/blocks/) و [مکانیزم‌های اجماع](/developers/docs/consensus-mechanisms/) را مطالعه کنید.

## اثبات کار (PoW) چیست؟ {#what-is-pow}

Nakamoto consensus, which utilizes proof-of-work, is the mechanism that once allowed the decentralized Ethereum network to come to consensus (i.e. all nodes agree) on things like account balances and the order of transactions. This prevented users from "double spending" their coins and ensured that the Ethereum chain was tremendously difficult to attack or manipulate. These security properties now come from proof-of-stake instead using the consensus mechanism known as [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## اثبات کار و استخراج {#pow-and-mining}

Proof-of-work is the underlying algorithm that sets the difficulty and rules for the work miners do on proof-of-work blockchains. استخراج خودِ «کار» است. این همان عمل اضافه کردن بلوک‌های معتبر به زنجیره است. This is important because the chain's length helps the network follow the correct fork of the blockchain. هر چه «کار» بیشتری انجام شود، زنجیره طولانی‌تر می‌شود و هر چه شماره‌ی بلوک بیشتر شود، شبکه از وضعیت فعلی مطمئن‌تر می‌شود.

[اطلاعات بیشتر درباره‌ی استخراج](/developers/docs/consensus-mechanisms/pow/mining/)

## How did Ethereum's proof-of-work work? {#how-it-works}

تراکنش‌های اتریوم در بلوک‌ها پردازش می‌شوند. In the now-deprecated proof-of-work Ethereum, each block contained:

- سختی بلوک - برای مثال: 3,324,092,183,262,715
- mixHash - برای مثال: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- نانس (Nonce) - برای مثال: `0xd3ee432b4fb3d26b`

This block data was directly related to proof-of-work.

### کار در اثبات کار {#the-work}

The proof-of-work protocol, Ethash, required miners to go through an intense race of trial and error to find the nonce for a block. Only blocks with a valid nonce could be added to the chain.

When racing to create a block, a miner repeatedly put a dataset, that could only be obtained by downloading and running the full chain (as a miner does), through a mathematical function. The dataset was used to generate a mixHash below a target that is dictated by the block difficulty. بهترین راه برای انجام این کار آزمون و خطاست.

The difficulty determined the target for the hash. هر چه هدف کمتر باشد، مجموعه‌ی هش‌های معتبر کوچک‌تر است. Once generated, this was incredibly easy for other miners and clients to verify. حتی اگر یک تراکش تغییر کند، هش کاملاً متفاوت خواهد بود و سیگنال تقلب خواهد داد.

هش کردن باعث می‌شود که بسیار ساده بتوان تقلب‌ها را کشف کرد. But proof-of-work as a process was also a big deterrent to attacking the chain.

### اثبات کار و امنیت {#security}

Miners were incentivized to do this work on the main Ethereum chain. There was little incentive for a subset of miners to start their own chain—it undermines the system. زنجیره‌های بلوکی بر یک وضعیت به‌عنوان منبع حقیقت متکی هستند.

The objective of proof-of-work was to extend the chain. The longest chain was most believable as the valid one because it had the most computational work done to generate it. Within Ethereum's PoW system, it was nearly impossible to create new blocks that erase transactions, create fake ones, or maintain a second chain. That's because a malicious miner would have needed to always solve the block nonce faster than everyone else.

To consistently create malicious yet valid blocks, a malicious miner would have needed over 51% of the network mining power to beat everyone else. That amount of "work" requires a lot of expensive computing power and the energy spent might even have outweighed the gains made in an attack.

### اقتصاد اثبات کار {#economics}

Proof-of-work was also responsible for issuing new currency into the system and incentivizing miners to do the work.

Since the [Constantinople upgrade](/history/#constantinople), miners who successfully create a block were rewarded with two freshly minted ETH and part of the transaction fees. Ommer blocks also compensated 1.75 ETH. Ommer blocks were valid blocks created by a miner practically at the same time as another miner created the canonical block, which was ultimately determined by which chain was built on top of first. Ommer blocks usually happened due to network latency.

## قطعیت {#finality}

یک تراکنش روی اتریوم زمانی «قطعیت» دارد که عضوی از بلوکی باشد که نتواند عوض شود.

Because miners worked in a decentralized way, two valid blocks could be mined at the same time. این کار یک فورک موقت ایجاد می‌کند. Eventually, one of these chains became the accepted chain after subsequent blocks were mined and added to it, making it longer.

To complicate things further, transactions rejected on the temporary fork may not have been included in the accepted chain. این به این معنا است که شرایط می‌تواند معکوس شود. پس قطعیت به زمانی گفته می‌شود که یک تراکنش غیرقابل معکوس شدن باشد. Under the previous proof-of-work Ethereum, the more blocks were mined on top of a specific block `N`, the higher confidence that the transactions in `N` were successful and would not be reverted. Now, with proof-of-stake, finalization is an explicit, rather than probabilistic, property of a block.

## استفاده از انرژی اثبات کار {#energy}

یکی از بزرگترین انتقادها به اثبات کار، میزان مصرف انرژی مورد نیاز برای ایمن نگه داشتن شبکه است. To maintain security and decentralization, Ethereum on proof-of-work consumed large amounts of energy. Shortly before switching to proof-of-stake, Ethereum miners were collectively consuming about 70 TWh/yr (about the same as the Czech Republic - according to [digiconomist](digiconomist.net) on 18-July-2022).

## نقاط مثبت و منفی {#pros-and-cons}

| نقاط مثبت                                                                                                                                                                                                  | نقاط منفی                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| اثبات کار خنثی است. شما برای شروع و گرفتن پاداش بلوک‌ها و حرکت از 0 اتر به موجودی مثبت، نیازی به اتر ندارید. با [اثبات سهام](/developers/docs/consensus-mechanisms/pos/)، شما برای شروع نیاز به اتر دارید. | اثبات کار به حدی انرژی مصرف می‌کند که برای محیط زیست بد است.                                                                                           |
| اثبات کار یک مکانیزم اجماع آزموده‌شده است که بیت‌کوین و اتریوم را برای سال‌ها ایمن و غیرمتمرکز نگه داشته است.                                                                                              | اگر می‌خواهید استخراج کنید، نیاز به دستگاه‌های مخصوصی دارید که برای شروع، سرمایه‌گذاری گرانی است.                                                      |
| در مقایسه با اثبات سهام، پیاده‌سازی راحت‌تری دارد.                                                                                                                                                         | با توجه به پردازش موردنیاز روزافزون، استخرهای استخراج احتمالاً تبدیل به غول‌های بازی استخراج می‌شوند و این به ریسک متمرکز شدن و عدم امنیت منجر می‌شود. |

## در مقایسه با اثبات سهام {#compared-to-pos}

در سطح بالا، اثبات سهام همان هدفی را دارد که اثبات کار دارد: کمک به شبکه‌ی غیرمتمرکز برای رسیدن به اجماع به‌طور امن. اما تفاوت‌هایی در فرایند و شمایل دارد:

- اثبات سهام به‌جای توان پردازشی به اتر سهام‌گذاری شده اهمیت می‌دهد.
- اثبات سهام استخراج‌گرها را با اعتبارسنج‌ها جایگزین می‌کند. اعتبارسنج‌ها اتر خود را سهام‌گذاری می‌کنند تا توانایی ساختن بلوک جدید را فعال کنند.
- اعتبارسنج‌ها برای ساختن بلوک با هم مسابقه ندارند و به‌جای آن به‌صورت تصادفی توسط یک الگوریتم انتخاب می‌شوند.
- قطعیت واضح‌تر است: در برخی نقاط زمان، اگر 2/3 اعتبارسنج‌ها بر سر وضعیت بلوک به توافق برسند، این بلوک قطعی در نظر گرفته می‌شود. اعتبارسنج‌ها باید تمام سهام خود را شرط‌بندی کنند و اگر بخواهند تبانی کنند تمام سهام خود را از دست می‌دهند.

[اطلاعات بیشتر درباره‌ی اثبات سهام](/developers/docs/consensus-mechanisms/pos/)

## با تصویر راحت‌تر یاد می‌گیرید؟ {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## اطلاعات بیشتر {#further-reading}

- [حمله‌ی اکثریت](https://en.bitcoin.it/wiki/Majority_attack)
- [درباره‌ی قطعیت تسویه](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### ویدیوها {#videos}

- [توضیح فنی پروتکل اثبات کار](https://youtu.be/9V1bipPkCTU)

## موضوعات مرتبط {#related-topics}

- [استخراج](/developers/docs/consensus-mechanisms/pow/mining/)
- [اثبات سهام](/developers/docs/consensus-mechanisms/pos/)
