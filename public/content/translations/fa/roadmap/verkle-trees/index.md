---
title: درختان ورکل
description: شرح تخصصی درختان ورکل و نقش کاربردی آن در ارتقای شبکه اتریوم
lang: fa
summaryPoints:
  - درباره ماهیت درختان ورکل بیشتر بدانید
  - درباره دلیل اهمیت درختان ورکل به عنوان یک ارتقای سودمند برای اتریوم بخوانید
---

# درختان ورکل {#verkle-trees}

درختان ورکل (ترکیب دو واژۀ «تعهد وکتور» و «درختان مرکل») نوعی ساختار داده‌ها است که در ارتقای گره‌های اتریوم مورد استفاده قرار می‌گیرد. بر مبنای این ارتقا گره‌ها می‌توانند بدون ذخیره کردن حجم وسیعی از داده‌های حالت، همچنان بلوک‌ها را تأیید کنند.

## بی‌وضعیتی {#statelessness}

درختان ورکل یک گام بنیادی در مسیر رسیدن به کلاینت‌های بی‌حالت اتریوم است. کلاینت‌های بی‌حالت آنهایی هستند که نیاز نیست برای تأیید و اعتباربخشی به بلوک‌های ورودی، کل پایگاه دادۀ حالت‌ها را ذخیره کنند. کلاینت‌های بی‌حالت به جای ذخیره‌سازی یک کپی محلی از حالت اتریوم جهت تأیید بلوک‌ها، از یک «شاهد» برای داده‌های حالت که همراه با بلوک از راه می‌رسد استفاده می‌کنند. شاهد عبارت است از مجموعه‌‌ای از قطعه‌های مجزای داده‌های حالت که برای اجرایی شدن برخی از مجموعه تراکنش‌ها لازم است، و اثبات رمزنگاری‌شده که شاهد به واقع بخشی از یک مجموعه کامل از داده‌ها است. شاهد _به جای_ پایگاه دادۀ حالت‌ها مورد استفاده قرار می‌گیرد. برای اینکه این مکانیزم کارا باشد، شاهدها باید حجم بسیار اندکی داشته باشند تا بتوانند به‌طور ایمن و به موقع در سرتاسر شبکه پخش شوند و اعتبارسنج‌ها بتوانند آنها را در داخل یک اسلات 12 ثانیه‌ای پردازش کنند. ساختار فعلی داده‌های حالت مناسب نیست، چرا که حجم شاهدها بسیار زیاد است. درختان ورکل با کوچک کردن حجم شاهدها این مسئله را حل می‌کنند تا یکی از موانع اصلی سد راه کلاینت‌های بی‌حالت برداشته شود.

<ExpandableCard title="چرا به دنبال کلاینت‌های بی‌حالت هستیم؟" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

کلاینت‌های اتریوم درحال حاضر از یک ساختار داده به نام Patricia Merkle Trie جهت ذخیره‌سازی داده‌های حالت استفاده می‌کنند. اطلاعات حساب‌های فردی در قالب برگ‌های درخت پیشوندی (ترای) ذخیره می‌شوند و جفت‌های برگ‌ها به طور مکرر هش می‌شوند تا وقتی که تنها یک هش منفرد باقی بماند. این هش آخر به عنوان «ریشه» شناخته می‌شود. کلاینت‌های اتریوم برای تأیید کردن بلوک‌ها، تمام تراکنش‌ها را در یک بلوک پیاده‌سازی می‌کنند و ترای حالت محلی خودشان را به‌روزرسانی می‌کنند. اگر ریشه درخت محلی با آن درختی که پیشنهاددهندۀ بلوک ارائه کرده است یکی باشد، اعتبار بلوک تأیید می‌شود، چون هرگونه تفاوتی میان محاسبات صورت‌گرفته توسط پیشنهاددهندۀ بلوک و گرۀ اعتبارسنج باعث می‌شود هش نهایی ریشه کاملاً متفاوت باشد. در این روش، مشکل اساسی این است که برای تأیید اعتبار زنجیره بلوکی، هر کلاینت باید کل ترای حالت را برای بلوک صدر و چند بلوک قبلی ذخیره کند (پیش‌فرض Geth این است که داده‌های حالت برای 128 بلوک قبل از بلوک صدر نگهداری شود). این موضوع نیازمند این است که کلاینت‌ها به فضای ذخیره‌سازی بزرگی دسترسی داشته باشند، و این مسئله مانعی است برایاجرای گره‌ها با هزینه کم و سخت‌افزار کم‌مصرف. راه حل این مشکل به‌روزرسانی ترای حالت و ساختاری بهینه‌تر (درختان ورکل) است که بتوان آن را با استفاده از یک «شاهد» کوچک برای داده‌هایی که به جای کل داده‌های حالت قابل اشتراک‌گذاری باشد خلاصه کرد. تغییر شکل ساختار داده‌های حالت به درختان ورکل یک گام بنیادی و بزرگ در مسیر رسیدن به کلاینت‌های بی‌حالت است.

</ExpandableCard>

## شاهد چیست و چرا به آن نیاز داریم؟ {#what-is-a-witness}

تأیید اعتبار یک بلوک به معنای دوباره اجرا کردن تراکنش‌های موجود در آن، اعمال تغییرات در ترای حالت اتریوم، و محاسبات هش ریشۀ جدید است. بلوک تأییدشده در واقع بلوکی است که هش ریشۀ حالت آن پس از محاسبه با هشی که همراه بلوک ارائه شده است یکی باشد (این نشان می‌دهد که پیشنهاددهندۀ بلوک محاسبات مورد ادعایش را واقعاً انجام داده است). درحال حاضر کلاینت‌های اتریوم برای بروزرسانی حالت نیازمند دسترسی به کل ترای حالت هستند. این ترای نوع بزرگی از ساختار داده‌هاست که باید به‌صورت محلی ذخیره‌سازی شود. شاهد تنها شامل قطعاتی از کل داده‌های حالت را که برای اجرای تراکنش‌ها در یک بلوک نیاز است دربر دارد. سپس، اعتبارسنج می‌تواند فقط با همان قطعات، تأیید کند که پیشنهاددهندۀ بلوک تراکنش‌های بلوک را اجرا و حالت را به‌درستی به‌روزرسانی کرده است. با این حال، این روند مستلزم انتقال سریع شاهدها بین همتایان موجود در شبکه اتریوم است به طوری که توسط هر کدام از گره‌ها در یک اسلات 12 ثانیه‌ای به روشی امن دریافت و پردازش شوند. اگر شاهد حجم زیادی داشته باشد، ممکن است دانلود آن و همپا شدن با زنجیره برای بعضی از گره‌ها خیلی زمان ببرد. این روند یک عامل متمرکزسازی محسوب می‌شود، چون فقط گره‌هایی که به اینترنت پرسرعت‌تر دسترسی دارند می‌توانند در اعتبارسنجی بلوک‌ها سهیم شوند. با استفاده از مکانیزم درختان ورکل دیگر نیازی نیست داده‌های حالت را بر روی هارد خود ذخیره کنید؛ _هر چیزی_ که برای تأیید اعتبار بلوک نیاز دارید در خود بلوک قرار گرفته است. متأسفانه، شاهدهایی که توسط ترای‌های مرکل قابل تولید هستند حجم بالایی دارند و به همین خاطر از کلاینت‌های بی‌حالت پشتیبانی نمی‌کنند.

## چرا مکانیزم درختان ورکل شاهدهای کم‌حجم‌تری ایجاد می‌کنند؟ {#why-do-verkle-trees-enable-smaller-witnesses}

ساختار ترای مرکل شاهدهای بسیار بزرگی ایجاد می‌کند، آنقدر بزرگ که پخش امن آنها بین همتایان در داخل یک اسلات 12 ثانیه‌ای میسر نمی‌شود. این بدان خاطر است که شاهد درواقع مسیری رابط بین داده‌ها (که در برگ‌ها نگه داشته می‌شود) به هش ریشه است. تأیید اعتبار داده‌ها نه تنها مستلزم داشتن تمام هش‌های واسط است که هر برگ را به ریشه متصل می‌کنند، بلکه داشتن تمام گره‌های «هم‌خانواده» نیز ضروری است. هر گره در روند اثبات دارای گره‌های هم‌خانواده‌ای است که با آن هش می‌شود تا هش بعدی را در بالای ترای ایجاد کند. حجم این اطلاعات بسیار زیاد است. درختان ورکل با کاهش فاصله میان برگ‌های درخت و ریشه آن و همچنین مرتفع کردن نیاز به ارائه گره‌های هم‌خانوده برای تأیید هش ریشه، حجم شاهدها را کاهش می‌دهند. حتی با استفاده از طرح تعهد چندجمله‌ای قدرتمند به جای تعهد وکتوری هش‌محور، می‌توان فضای مورد نیاز برای ذخیره‌سازی را بهینه‌تر کرد. تعهد چندجمله‌ای این امکان را فراهم می‌کند که شاهد، فارغ از تعداد برگ‌هایی که ثابت می‌کند، اندازه ثابتی داشته باشند.

بر مبنای طرح تعهد چندجمله‌ای، حجم شاهدها مدیریت می‌شود و به راحتی در شبکه همتا به همتا قابل انتقال است. این امر به کلاینت‌ها اجازه می‌دهد تا تغییرات در حالت هر بلوک را با کمترین میزان داده‌ها تأیید کنند.

<ExpandableCard title="درختان ورکل دقیقاً چقدر حجم شاهدها را می‌توانند کاهش دهند؟" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

حجم هر شاهد به تعداد برگ‌هایی که دربر دارد وابسته است. تصور کنید یک شاهد 1000 برگ را پوشش دهد. حجم یک شاهد برای یک ترای مرکل در حدود 3.5 مگابایت می‌شود (با فرض وجود 7 سطح تا رسیدن به ترای). حجم یک شاهد برای همان داده‌ها در درختان ورکل (با فرض وجود 4 سطح تا رسیدن به درخت)، در حدود 150 کیلوبایت خواهد بود، یعنی تقریباً **23 برابر کوچکتر**. این کاهش حجم در شاهدها به شاهدهای کلاینت‌های بی‌حالت این امکان را می‌دهد که در حد قابل قبولی کوچک شوند. شاهد‌های چند جمله ای بسته به اینکه کدام تعهد چند جمله ای خاص استفاده می شود بین 0.128 تا 1 کیلوبایت هستند.

</ExpandableCard>

## ساختار درخت ورکل چیست؟ {#what-is-the-structure-of-a-verkle-tree}

درختان ورکل جفت‌های `(کلید،ارزش)` هستند که در آنها کلیدها عبارتند از عناصری با حجم 32 بایت که از یک _ساقه_ 31 بایتی و یک _پسوند_ تک‌بایتی تشکیل شده‌‌اند. این کلیدها به گره‌های _افزونه_ و گره‌های _داخلی_ طبقه‌بندی می‌شوند. گره‌های افزونه بازنمای یک ساقه منفرد 256 فرزندی با پسوندهای متمایز است. گره‌های داخلی هم 256 فرزند دارند، اما آنها می‌توانند جزء سایر گره‌های افزونه باشند. تفاوت اصلی میان ساختار درخت ورکل و درخت مرکل این است که درخت ورکل مسطح‌تر است، یعنی تعداد گره‌های واسط که یک برگ را به ریشه وصل می‌کنند کمتر است، و بنابراین به داده‌های کمتری برای ایجاد یک اثبات نیاز است.

![](./verkle.png)

[درباره ساختار درختان ورکل بیشتر بخوانید](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## پیشرفت فعلی {#current-progress}

در حال حاضر شبکه‌های تست درختان ورکل هم‌اکنون برقرار و درحال اجراست، اما هنوز هم جای به‌روزرسانی‌هایی اساسی روی کلاینت‌ها دارد که برای پشتیبانی از درختان ورکل نیاز است. می‌توانید با به‌کارگیری قراردادها در شبکه‌های تست یا اجرای کلاینت‌های شبکه تست، پیشرفت آن را سرعت دهید.

[شبکه آزمایشی Verkle Gen Devnet 2 را کاوش کنید](https://verkle-gen-devnet-2.ethpandaops.io/)

[ Condrieu Verkle Guillaume Ballet را تماشا کنید شبکه آزمایشی Condrieu Verkle را توضیح دهید](https://www.youtube.com/watch?v=cPLHFBeC0Vg)(توجه داشته باشید که شبکه آزمایشی Condrieu اثبات کار بود و اکنون توسط Verkle Gen Devnet 2 testnet جایگزین شده است).

## بیشتر بخوانید {#further-reading}

- [درختان Verkle برای بی‌تابعیتی](https://verkle.info/)
- [Dankrad Feist درباره درختان ورکل روی PEEPanEIP توضیح می‌دهد](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet درباره درختان ورکل در ETHGlobal توضیح می‌دهد](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [«چگونه درختان ورکل اتریوم را مختصر و مفید می‌کنند» از Guillaume Ballet در دِوکان 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam از ETHDenver 2020 درباره کلاینت‌های بی‌حالت می‌گوید](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [دانکارد فیست در پادکست Zero Knowledge درختان ورکل و بی‌حالتی را توضیح می‌دهد](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin درباره درختان ورکل می‌گوید](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist درباره درختان ورکل می‌گوید](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [مستندات مربوط به EIP درختان ورکل](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
