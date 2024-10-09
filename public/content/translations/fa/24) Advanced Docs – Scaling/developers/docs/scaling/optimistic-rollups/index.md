---
title: رول آپ های خوش بینانه
description: مقدمه ای بر رول آپ‌های خوش بینانه، یک راه حل مقیاس پذیری که توسط جامعه اتریوم استفاده می‌شود.
lang: fa
---

رول آپ‌های خوش بینانه، پروتکل‌های لایه دومی (L2) هستند که برای افزایش تعداد داده های ورودی لایه اصلی اتریوم طراحی شده اند. آن‌ها محاسبات زنجیره اصلی اتریوم را با پردازش تراکنش‌ها در خارج از زنجیره کاهش می‌دهند که باعث افزایش چشمگیر در سرعت پردازش می‌شوند. برخلاف سایر روش‌های مقیاس پذیری مانند [زنجیره‌های جانبی](/developers/docs/scaling/sidechains/)، رول آپ‌های خوش بینانه امنیت خود را از شبکه اصلی تأمین می‌کنند که این کار به وسیله انتشار نتیجه تراکنش‌ها بر روی شبکه اصلی یا [زنجیره‌های پلاسما](/developers/docs/scaling/plasma/) که تراکنش‌ها را با استفاده از مکانیسم اثبات تقلب، تائید می‌کنند اما تراکنش را در جایی دیگر ذخیره می‌کنند، انجام می‌گیرد.

از آنجایی که محسابات آهسته و پرهزینه ترین بخش از اتریوم می‌باشد، رول آپ‌های خوش بینانه می‌توانند بهبود 10 الی 100 برابری را برای مقیاس پذیری ارائه دهند. همچنین رول‌آپ خوش‌بینانه تراکنش‌ها را به صورت `calldata` یا [بلاب](/roadmap/danksharding/) در اتریوم وارد می‌کنند که باعث کاهش هزینه گاز مصرفی توسط کاربران می‌شود.

## موارد مورد نیاز {#prerequisites}

شما باید صفحات ما درباره‌ی [مقیاس پذیری اتریوم](/developers/docs/scaling/) و [لایه 2](/layer-2/) را خوانده باشید.

## رول‌آپ خوش‌بینانه چیست؟ {#what-is-an-optimistic-rollup}

رول‌آپ خوش‌بینانه رویکردی برای مقیاس پذیری اتریوم است که شامل انتقال محاسبات و ذخیره حالت (اطلاعات) به خارج از شبکه می‌شود. رول‌آپ خوش‌بینانه تراکنش‌ها را خارج از اتریوم اجرا می‌کنند اما اطلاعات تراکنش را به صورت `calldata` یا [بلاب](/roadmap/danksharding/) به اتریوم ارسال می‌کنند.

اپراتورهای رول‌آپ خوش‌بینانه، چندین تراکنش خارج زنجیره‌ای را در دسته‌های بزرگ دسته بندی می‌کند و سپس آن‌ها را به اتریوم ارسال می‌کنند. این رویکرد باعث می‌شود تا هزینه‌های ثابت در چندین تراکنش در هر دسته توزیع شود و هزینه‌ها برای کاربران کاهش یابد. همچنین رول‌آپ خوش‌بینانه از تکنیک‌های فشرده سازی برای کاهش حجم داده ارسالی به اتریوم استفاده می‌کند.

دلیل "خوش‌بین" رول‌آپ خوش‌بینانه این است که آن‌ها فرض را بر این میگذارند که تراکنش‌های خارج از زنجیره معتبر هستند و اثباتی را برای معتبر بودن دسته‌های تراکنش ارسالی بر روی شبکه منتشر نمی‌کنند. این امر باعث تمایز رول‌آپ خوش‌بینانه از [رول‌آپ دانش-صفر](/developers/docs/scaling/zk-rollups) که [اثبات اعتبار](/glossary/#validity-proof) را برای تراکنش‌های خارج شبکه به صورت رمزنگاری شده منتشر می‌کند، می‌شود.

در عوض، رول‌آپ خوش‌بینانه برای شناسائی مواردی که تراکنش‌ها به درستی محاسبه نشده‌اند، به یک طرح اثبات تقلب متکی است. پس از ارسال یک دسته رول‌آپ به اتریوم، یک بازه زمانی (به نام دوره چالش) وجود دارد که طی آن هرکسی می‌تواند با محاسبه [اثبات تقلب](/glossary/#fraud-proof)، نتایج یک رول‌آپ تراکنش‌ها را به چالش بکشد.

اگر اثبات تقلب با موفقیت انجام شود، پروتکل رول‌آپ، تراکنش(ها) را دوباره اجرا می‌کند و حالت رول‌آپ‌های مربوطه را بروز رسانی می‌کند. اثر دیگر موفقیت اثبات تقلب این می‌باشد که ترتیب‌دهنده‌ای که مسئول گنجاندن تراکنش نادرست اجرا شده در یک بلوک است، جریمه خواهد شد.

اگر یک رول‌آپ بدون چالش باقی بماند (برای مثال تمامی تراکنش‌ها به درستی اجرا شده باشند)، پس گذشت دوره چالش، معتبر محسوب می‌شود و در اتریوم پذیرفته می‌شود. دیگران می‌توانند بر روی یک بلوک رول‌آپ تائید نشده ادامه دهند اما باید این هشدار را در نظر بگیرند که: اگر براساس تراکنش نادرست اجرا شده از قبل منتشر شده باشند، نتایج آنها معکوس خواهد شد.

## چگونه رول‌آپ خوش‌بینانه با اتریوم تعامل دارند؟ {#optimistic-rollups-and-Ethereum}

رول‌آپ خوش‌بینانه، [راه حل‌های مقیاس پذیری خارج زنجیره‌ای](/developers/docs/scaling/#off-chain-scaling) هستند که برای انجام عملیات در اتریوم ساخته شدند. هر رول‌آپ خوش‌بینانه توسط مجموعه‌ای از قراردادهای هوشمند مستقر در شبکه اتریوم مدیریت می‌شود. رول‌آپ های خوش‌بینانه تراکنش‌ها را خارج از شبکه اصلی اتریوم پردازش می‌کنند ولی این تراکنش‌های خارج شبکه‌ای را (به طور دسته‌ای) به یک قرارداد رول‌آپ بر روی شبکه ارسال می‌کنند. همانند زنجیره اتریوم، این نتیجه ذخیره شده از تراکنش تغییرناپذیر است و "زنجیره رول‌آپ خوش‌بینانه" را شکل می‌دهد.

ساختار یک رول‌آپ خوش‌بینانه متشکل از بخش‌های زیر است:

**قراردادهای هوشمند روی زنجیره**: عملیات‌های رول‌آپ های خوش‌بینانه توسط قراردادهای هوشمندی که بر روی اتریوم در حال اجرا هستند، کنترل می‌شوند. این شامل قراردادهایی می‌شود که بلوک رول‌‌آپ را ذخیره می‌کنند، به‌روزرسانی‌های حالت را در رول‌‌آپ نظارت می‌کنند و سپرده‌های کاربران را ردیابی می‌کنند. به این شکل، اتریوم نقش لایه پایه یا "لایه 1" را برای رول‌آپ های خوش‌بینانه دارد.

**ماشین مجازی خارج از زنجیره (VM)**: اگرچه که قراردادهایی که پروتکل رول‌آپ خوش‌بینانه را مدیریت می‌کنند بر روی اتریوم اجرا می‌شوند، پروتکل رول‌‌آپ محاسبات و ذخیره‌سازی حالت را در ماشین مجازی دیگری جدا از [ماشین مجازی اتریوم](/developers/docs/evm/) انجام می‌دهد. ماشین مجازی خارج از زنجیره جایی است که برنامه‌ها در حال اجرا هستند و تغییرات حالت در آنجا رخ می‌دهند و این به عنوان لایه بالایی یا "لایه 2" برای یک رول‌آپ خوش‌بینانه عمل می‌کند.

از آنجایی که رول‌آپ های خوش‌بینانه برای اجرای برنامه‌های نوشته شده یا کامپایل شده مخصوص EVM طراحی شده‌اند، ماشین مجازی خارج زنجیره بسیاری از ارکان طراحی EVM را در خود به کار گرفته است. علاوه بر این، اجرا شدن مکانیسم اثبات تقلب بر روی شبکه به اتریوم اجازه می‌دهد تا موثق بودن تغییرات حالت محاسبه شده را در ماشین مجازی خارج از زنجیره اعمال کند.

رول‌آپ خوش‌بینانه به عنوان "راه حل‌های مقیاس پذیری ترکیبی" توصیف می‌شوند، زیرا در حالی که به عنوان پروتکل‌های جداگانه وجود دارند، ویژگی‌های امنیتی آن‌ها از اتریوم مشتق شده است. از جمله موارد دیگر، اتریوم صحت محاسبات خارج از زنجیره رول‌‌آپ و در دسترس بودن داده های پشت محاسبات را تضمین می‌کند. این امر باعث می‌شود که رول‌آپ های خوش‌بینانه نسبت به پروتکل‌های مقیاس پذیری کاملاً خارج از زنجیره (برای مثال [زنجیره‌های جانبی](/developers/docs/scaling/sidechains/)) که برای امنیت به اتریوم متکی نیستند، امن‌تر باشند.

رول‌آپ های خوش‌بینانه برای موارد زیر به پروتکل اصلی اتریوم متکی هستند:

### دسترسی به داده‌ها {#data-availability}

همان‌گونه که گفته شد، رول‌آپ های خوش‌بینانه داده‌های تراکنش را به عنوان `calldata` یا [blobs](/roadmap/danksharding/) به اتریوم میفرستند. از آنجایی که اجرای زنجیره‌ی رول‌‌آپ براساس تراکنش‌های ارسالی می‌باشد، هرکسی می‌تواند از این اطلاعات - که بر لایه پایه اتریوم لینک شده است - برای اجرای وضعیت جمع‌آوری و تایید صحت انتقال حالت استفاده کند.

[در دسترس بودن اطلاعات](/developers/docs/data-availability/) بسیار مهم است زیرا بدون دسترسی به داده‌های حالت، به چالش کشندگان نمی‌توانند اثبات تقلب را برای مخالفت با عملیات رول‌‌آپ نامعتبر ایجاد نمایند. با فراهم کردن دسترسی به اطلاعات توسط اتریوم، ریسک قسر در رفتن اپراتورهای رول‌آپ با اعمال کثیف (مانند ارسال بلوک‌های نامعتبر) کاهش میابد.

### مقاومت در برابر سانسور {#censorship-resistance}

همچنین، رول‌آپ های خوش‌بینانه برای مقاومت در برابر سانسور به اتریوم نیازمند هستند. در یک رول‌آپ خوش‌بینانه، یک نهاد متمرکز (اپراتور) مسئول پردازش تراکنش‌ها و ارسال بلوک‌های رول‌‌آپ به اتریوم است. این چندین پیامد احتمالی دارد:

- اپراتورهای رول‌‌آپ می‌توانند کاربران را با کاملاً آفلاین شدن یا با امتناع از تولید بلوک‌هایی که شامل تراکنش‌های خاصی در آن‌ها هستند، سانسور کنند.

- اپراتورهای رول‌‌آپ می‌توانند کاربران را از برداشتن وجوهی که در قرارداد رول‌‌آپ واریز کرده اند، با استفاده از نگه داشتن داده‌های لازم جهت تغییر حالت درخت مرکل مالکیت، جلوگیری کنند. نگه داشتن داده‌های حالت همچنین می‌تواند وضعیت رول‌‌آپ را از کاربران پنهان کند و مانع از تعامل آنان با رول‌‌آپ شود.

رول‌آپ های خوش‌بینانه این مشکل را با مجبور کردن اپراتورها به انتشار داده‌های مرتبط با بروز رسانی‌های حالت در اتریوم حل می‌کند. انتشار اطلاعات رول‌‌آپ بر روی زنجیره اتریوم مزایای زیر را دارد:

- اگر یک اپراتور رول‌آپ خوش‌بینانه آفلاین شود یا تولید دسته‌های تراکنش را متوقف کند، گره دیگری می‌تواند از داده‌های موجود برای بازتولید آخرین وضعیت رول‌‌آپ برای ادامه تولید بلوک استفاده کند.

- کاربران می‌توانند از داده‌های تراکنش برای ایجاد اثبات مالکیت دارایی در قالب درخت مرکل استفاده نمایند و دارایی‌های خود را از رول‌‌آپ برداشت کنند.

- کاربران همچنین می‌توانند تراکنش‌های خود را در لایه پایه یا L1، به جای ترتیب دهنده ارسال کنند که در این صورت ترتیب دهنده باید تراکنش را در یک محدوده زمانی مشخص برای ادامه تولید بلوک‌های معتبر لحاظ کند.

### توافق {#settlement}

نقش دیگری که اتریوم در زمینه گردآوری رول‌آپ های خوش‌بینانه ایفا می‌کند، لایه توافق است. لایه توافق تمامی اکوسیستم بلاک‌چین را به هم لینک می‌کند، امنیت را برقرار می‌کند و در صورت بروز تعارض در زنجیره‌ای دیگر (در این مورد رول‌آپ خوش‌بینانه) که نیاز به داوری دارد، رأی نهائی بی طرفانه را صادر می‌کند.

شبکه اصلی اتریوم مرکزی را برای رول‌آپ های خوش‌بینانه فراهم می‌کند تا اثبات‌های تقلب را تائید نمایند و تعارض‌ها را حل کنند. علاوه بر این، تراکنش‌های انجام شده در رول‌‌آپ، تنها _پس از_ پذیرش بلوک رول‌‌آپ در اتریوم نهائی می‌شوند. هنگامی که یک تراکنش رول‌‌آپ به لایه پایه اتریوم ارسال و متعهد شد، نمی‌توان آن را به عقب بازگرداند (به جز در مورد بسیار غیرمحتمل سازمان‌دهی مجدد زنجیره).

## طرز کار رول آپ‌های خوش بینانه چگونه است؟ {#how-optimistic-rollups-work}

### اجرای تراکنش وگردآوری {#transaction-execution-and-aggregation}

کاربران تراکنش‌ها را به "اپراتورها" ارسال می‌کنند، که گره‌هایی مسئول پردازش تراکنش‌ها در جمع‌بندی خوش‌بینانه هستند. همچنین این اپراتور که به‌عنوان "اعتبارسنج" یا "گردآورنده" نیز شناخته می‌شود، تراکنش‌ها را گردآوری می‌کند، داده‌های زیربنایی را فشرده سازی می‌کند و بلوک را در اتریوم منتشر می‌کند.

اگرچه که هر کسی می‌تواند اعتبارسنج شود، اعتبارسنج‌های رول‌آپ خوش‌بینانه، باید قبل از تولید بلوک‌ها مانند [سیستم اثبات سهام](/developers/docs/consensus-mechanisms/pos/)، وثیقه ای ارائه دهند. اگر اعتبارسنج یک بلوک نامعتبر ارسال کند یا روی یک بلوک قدیمی اما نامعتبر ساخته شود (حتی اگر بلوک آنها معتبر باشد)، این وثیقه میتواند کاهش یابد یا به اصطلاح slashed شود. بدین شکل رول‌آپ های خوش‌بینانه از مشوق‌های اقتصاد رمزارزی بهره می‌برند تا اطمینان حاصل شود که اعتبارسنجی‌ها صادقانه عمل می‌کنند.

انتظار می‌رود سایر اعتبارسنج‌ها در زنجیره رول‌آپ خوش‌بینانه، تراکنش‌های ارائه شده را با استفاده از کپی حالت (اطلاعات/داده) رول‌‌آپ خود اجرا کنند. اگر حالت نهائی اعتبارسنجی با حالت پیشنهادی اپراتور متفاوت باشد، آن‌ها می‌توانند یک چالش را شروع کنند و یک اثبات تقلب را محاسبه نمایند.

برخی رول‌آپ های خوش‌بینانه ممکن است از یک سیستم اعتبارسنجی بدون نیاز به اجازه صرف نظر کنند و از یک "ترتیب دهنده" واحد برای اجرای زنجیره استفاده کنند. مانند یک اعتبارسنج، ترتیب دهنده تراکنش‌ها را پردازش می‌نماید، بلوک‌های رول‌‌آپ را تولید می‌کند و تراکنش‌های رول‌‌آپ را به شبکه L1 (اتریوم) می‌فرستد.

ترتیب دهنده با یک اپراتور رول‌‌آپ معمولی تفاوت دارد، زیرا آن‌ها کنترل بیشتری بر ترتیب تراکنش‌ها دارند. همچنین، ترتیب دهنده اولویت دسترسی به زنجیره رول‌‌آپ را داراست و تنها نهاد مجاز برای ارسال تراکنش‌ها به قرارداد روی زنجیره اصلی اتریوم می‌باشد. تراکنش‌هایی که از طرف گره‌های غیر ترتیب دهنده یا کاربران عادی هستند، به سادگی در یک صندوق ورودی جداگانه در صف قرار می‌گیرند تا زمانی که ترتیب دهنده آن‌ها را در یک دسته جدید قرار دهد.

#### ثبت بلوک‌های رول‌آپ در اتریوم {#submitting-blocks-to-ethereum}

همان گونه که ذکر شد، اپراتور یک رول‌آپ خوش‌بینانه تراکنش‌های خارج از زنجیره را در یک دسته جمع می‌کند و آن را برای تائید نهائی به اتریوم می‌فرستد. این پروسه شامل فشرده‌سازی داده‌های مربوط به تراکنش و انتشار آن در اتریوم به عنوان `calldata` یا در داخل blobها می‌باشد.

`calldata`یک محل تغییر ناپذیر و غیر دائمی در یک قرارداد هوشمند است که بیشتر شبیه به [حافظه مموری](/developers/docs/smart-contracts/anatomy/#memory) عمل می‌کند. در حالی که `calldata` در زنجیره به عنوان بخشی از [گزارش‌های تاریخچه](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) بلاک‌چین باقی می‌ماند، به عنوان بخشی از حافظه حالت اتریوم ذخیره نمی‌شود. چون که `calldata` هیچ بخشی از حالت اتریوم را لمس نمی‌کند، برای ذخیره داده‌ها در زنجیره، ارزان‌تر از حافظه حالت است.

کلمه کلیدی `calldata` همچنین در زبان برنامه نویسی Solidity به منظور ارسال پارامترهای ورودی به یک تابع قرارداد هوشمند، در زمان آغاز اجرا، استفاده می‌شود. `calldata` تابعی را که در حین تراکنش فراخوانی می‌شود، شناسائی می‌کند و ورودی‌های تابع را به شکل یک دنباله دلخواه در قالب Bytes نگه می‌دارد.

در مبحث رول‌آپ های خوش‌بینانه، `calldata` برای ارسال داده‌های فشرده شده تراکنش به قرارداد مستقر در شبکه اصلی، استفاده می‌شود. اپراتور رول‌‌آپ با فراخوانی تابع مورد نیاز در قرارداد رول‌‌آپ و ارسال داده‌های فشرده شده به عنوان پارامتر ورودی تابع، یک دسته جدید تراکنش اضافه می‌کند. استفاده از `calldata` هزینه‌های کاربر را کاهش می‌دهد زیرا بیشتر هزینه‌هایی که رول‌آپ ها متحمل می‌شوند از ذخیره کردن داده‌ در شبکه اصلی اتریوم می‌باشد.

این هم [یک مثال](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) از ارسال دسته جمعی رول‌‌آپ برای نشان دادن نحوه عملکرد این مفهوم. ترتیب دهنده، تابع `appendSequencerBatch()` را فراخوانی کرد و داده‌های فشرده تراکنش را با استفاده از `calldata` به عنوان ورودی ارسال کرد.

برخی رول‌‌آپ‌ها اکنون از blobها برای دسته ای ارسال کردن تراکنش‌ها به اتریوم استفاده می‌کنند.

blobها تغییرناپذیر و موقت اند (درست مانند `calldata`) اما پس از حدود 18 روز از تاریخچه حذف می‌شوند. جهت کسب اطلاعات بیشتر درباره‌ی blobها، [Danksharding](/roadmap/danksharding) را ببینید.

### ثبت تعهد حالت {#state-commitments}

در هر مقطع زمانی، حالت رول‌آپ خوش‌بینانه (حساب‌ها، موجودی‌ها، کد قرارداد و غیره) در قالب [درخت مرکل](/whitepaper/#merkle-trees) مرتب می‌شود که به آن "درخت حالت" می‌گویند. ریشه این درخت مرکل (ریشه حالت)، که به آخرین و بروزترین حالت رول‌‌آپ اشاره می‌کند، هش شده و در قرارداد رول‌‌آپ ذخیره می‌شود. هر تغییر حالت در زنجیره، یک حالت رول‌‌آپ جدید ایجاد می‌کند، که اپراتور با محاسبه یک ریشه حالت جدید به آن متعهد می‌شود.

اپراتور موظف است که در هنگام ارسال دسته‌ها، هم ریشه‌های حالت قدیمی و هم ریشه‌های حالت جدید را ارسال کند. اگر ریشه حالت قدیمی با ریشه حالت موجود در قرارداد روی زنجیره مطابقت داشته باشد، ریشه موجود کنار گذاشته شده و با ریشه حالت جدید جایگزین می‌شود.

اپراتور رول‌‌آپ همچنین ملزم است که یک ریشه مرکل را برای خود دسته تراکنش تعهد دهد. این به هرکسی اجازه می‌دهد تا با ارائه [اثبات مرکل](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)، گنجانده شده بودن یک تراکنش در دسته (در L1) را ثابت کند.

تعهدات حالت، به ویژه ریشه‌های حالت، برای اثبات صحیح بودن تغییرات حالت در یک رول‌آپ خوش‌بینانه ضروری است. قرارداد رول‌‌آپ، ریشه‌های حالت جدید را از اپراتورها بلافاصله پس از ارسال می‌پذیرد، اما بعداً می‌تواند ریشه‌های حالت نامعتبر را حذف کند تا رول‌‌آپ به حالت صحیح خود بازگردد.

### اثبات کلاه برداری {#fraud-proving}

همانگونه که توضیح دادیم هر کسی اجازه دارد که بلاک را پخش کند بدون اینکه ارزش ان را اثبات کند. هر چند، برای اطمینان از ایمن ماندن زنجیره، رول‌آپ خوش‌بینانه یک بازه زمانی را تعریف می‌کنند که طی آن هر کسی میتواند در مورد انتقال حالت اعتراض کند و آن را به چالش بکشد. از این رو، بلوک‌های رول‌‌آپ "ادعا" نامیده می‌شوند، زیرا هر کسی می‌تواند ادعای آن‌ها را مورد مناقشه قرار دهد.

اگر کسی ادعایی را رد کند، پروتکل رول‌‌آپ محاسبات اثبات تقلب را آغاز می‌کند. هر نوع اثبات تقلبی تعاملی است - یک نفر باید قبل از اینکه شخص دیگری آن را به چالش بکشد، یک ادعا را ارسال کند. تفاوت در تعداد مرتبه تعامل برای محاسبه اثبات تقلب مورد نیاز نهفته است.

طرح‌های اثبات تعاملی تک مرتبه‌ای، تراکنش‌های مورد مناقشه را در L1 دوباره منتشر می‌کنند تا ادعاهای نامعتبر را شناسائی نمایند. پروتکل رول‌‌آپ اجرای مجدد تراکنش مورد مناقشه در L1 (اتریوم) را با استفاده از یک قرارداد تائید کننده، شبیه‌سازی می‌کند و ریشه حالت محاسبه شده تعیین می‌کند که چه کسی برنده چالش است. اگر ادعای رقیب در مورد وضعیت صحیح رول آپ درست باشد، اپراتور با قطع کردن باند خود جریمه می‌شود.

با این حال، اجرای مجدد تراکنش‌ها در لایه اول برای شناسایی تقلب مستلزم انتشار تعهدات استیت برای تراکنش‌های فردی است و رول آپ داده‌ها را افزایش می‌دهد که باید در زنجیره منتشر شوند. بازپخش تراکنش‌ها همچنین هزینه‌های گس قابل توجهی را به همراه دارد. به این دلایل، رول آپ‌های آپتیمیستیک به اثبات تعاملی چند دوره تغییر می‌کنند، که به همان هدف (یعنی تشخیص عملیات رول آپ نامعتبر) با کارایی بیشتر دست می‌یابد.

#### اثبات چند مسیره فعال {#multi-round-interactive-proving}

اثبات تعاملی چند دوره شامل یک پروتکل رفت و برگشت بین ادعا کننده و رقیب تحت نظارت یک قرارداد تأییدکننده لایه 1 است که در نهایت طرف دروغگو را تعیین می‌کند. پس از اینکه یک گره لایه دوم یک ادعا را به چالش می‌کشد، ادعا کننده باید ادعای مورد مناقشه را به دو نیمه مساوی تقسیم کند. هر ادعای منفرد در این مورد به اندازه دیگری شامل مراحل محاسباتی خواهد بود.

سپس رقیب انتخاب خواهد کرد که چه ادعایی را می‌خواهد به چالش بکشد. فرآیند تقسیم (که "پروتکل دوگانه" نامیده می‌شود) ادامه می‌یابد تا زمانی که هر دو طرف در مورد ادعایی در مورد یک مرحله _تک_ اجرا بحث کنند. در این مرحله، قرارداد لایه اول با ارزیابی دستورالعمل (و نتیجه آن) برای دستگیری طرف متقلب، اختلاف را حل می‌کند.

ادعاکننده ملزم به ارائه "اثبات یک مرحله‌ای" است که اعتبار محاسبات تک مرحله‌ای مورد مناقشه را تأیید می‌کند. اگر ادعاکننده نتواند اثبات یک مرحله‌ای را ارائه کند، یا تأییدکننده لایه ‌اول اثبات را نامعتبر بداند، چالش را از دست می‌دهد.

چند نکته در مورد این نوع اثبات تقلب:

1. اثبات تقلب تعاملی چند دور کارآمد در نظر گرفته می‌شود زیرا کاری که زنجیره لایه اول باید در داوری اختلاف انجام دهد را به حداقل می‌رساند. به جای پخش مجدد کل تراکنش، زنجیره لایه اول فقط باید یک مرحله از اجرای مجموعه را دوباره اجرا کند.

2. پروتکل های Bisection یا همان دو بخشی مقدار داده‌های ارسال شده در زنجیره را کاهش می‌دهند (نیازی به انتشار commitهای حالت برای هر تراکنش نیست). همچنین، تراکنش‌های رول آپ آپتیمیستیک با محدودیت گس اتریوم محدود نمی‌شوند. برعکس، رول آپ‌های آپتیمیستیک برای اجرای مجدد تراکنش‌ها باید اطمینان حاصل کنند که تراکنش لایه دو دارای محدودیت گس کمتری برای تقلید اجرای آن در یک تراکنش واحد اتریوم است.

3. بخشی از ضمانت‌کننده مخرب به رقیب تعلق می‌گیرد، در حالی که بخشی دیگر سوزانده می‌شود. سوزاندن از تبانی بین اعتبارسنج‌ها جلوگیری می‌کند. اگر دو اعتبارسنج‌ها با هم تبانی کنند تا چالش‌های جعلی را آغاز کنند، باز هم بخش قابل توجهی از کل استیک را از دست خواهند داد.

4. اثبات تعاملی چند دور به هر دو طرف (مدعی‌کننده و رقیب) نیاز دارد که در پنجره زمانی مشخص شده حرکت کنند. عدم اقدام قبل از انقضای مهلت مقرر باعث می‌شود که طرف متخلف از چالش منصرف شود.

#### چرا اثبات تبهکار برای رول اپهای بهینه مهم است {#fraud-proof-benefits}

اثبات تقلب مهم است، زیرا آنها _نهایی‌سازی بدون نیاز به اعتماد_ را در رول آپ‌های آپتیمیستیک تسهیل می‌کنند. نهایی‌بودن بدون اعتماد، کیفیتی از رول آپ‌های آپتیمیستیک است که تضمین می‌کند که یک تراکنش - تا زمانی که معتبر است - در نهایت تأیید شود.

گره‌های مخرب می‌توانند با شروع چالش‌های نادرست، تأیید یک بلوک رول آپ معتبر را به تأخیر بیندازند. با این حال، اثبات تقلب در نهایت اعتبار بلوک رول آپ را ثابت می‌کند و باعث تایید آن می‌شود.

این همچنین به یکی دیگر از ویژگی های امنیتی رول‌آپ خوش‌بینانه مربوط می شود: اعتبار زنجیره به وجود _یک_ گره صادق بستگی دارد. گره صادق می تواند با ارسال ادعاهای معتبر یا مخالفت با ادعاهای نامعتبر، زنجیره را به درستی پیش ببرد. در هر صورت، گره‌های مخربی که با گره صادق وارد اختلاف می‌شوند، در طول فرآیند اثبات تقلب، سهام خود را از دست خواهند داد.

### نسبت L1 به L2 ، عملیات داخلی {#l1-l2-interoperability}

رول‌آپ خوش‌بینانه برای قابلیت همکاری با شبکه اصلی اتریوم طراحی شده‌اند و به کاربران اجازه می‌دهند پیام‌ها و داده‌های دلخواه را بین L1 و L2 ارسال کنند. آنها همچنین با EVM سازگار هستند، بنابراین می‌توانید [دپ های](/developers/docs/dapps/) موجود را به رول‌آپ های خوش‌بینانه پورت کنید یا با استفاده از ابزارهای توسعه اتریوم، دپ های جدید ایجاد کنید.

#### 1. انتقال دارایی {#asset-movement}

##### ورود به رول اپ

To use an optimistic rollup, users deposit ETH, ERC-20 tokens, and other accepted assets in the rollup’s [bridge](/developers/docs/bridges/) contract on L1. The bridge contract will relay the transaction to L2, where an equivalent amount of assets is minted and sent to the user’s chosen address on the optimistic rollup.

User-generated transactions (like an L1 > L2 deposit) are usually queued until the sequencer re-submits them to the rollup contract. However, to preserve censorship resistance, optimistic rollups allow users to submit a transaction directly to the on-chain rollup contract if it has been delayed past the maximum time allowed.

Some optimistic rollups adopt a more straightforward approach to prevent sequencers from censoring users. Here, a block is defined by all transactions submitted to the L1 contract since the previous block (e.g., deposits) in addition to the transactions processed on the rollup chain. If a sequencer ignores an L1 transaction, it will publish the (provably) wrong state root; therefore, sequencers cannot delay user-generated messages once posted on L1.

##### خروج از رول اپ

Withdrawing from an optimistic rollup to Ethereum is more difficult owing to the fraud proving scheme. If a user initiates an L2 > L1 transaction to withdraw funds escrowed on L1, they must wait until the challenge period—lasting roughly seven days—elapses. Nevertheless, the withdrawal process itself is fairly straightforward.

After the withdrawal request is initiated on the L2 rollup, the transaction is included in the next batch, while the user’s assets on the rollup are burned. Once the batch is published on Ethereum, the user can compute a Merkle proof verifying the inclusion of their exit transaction in the block. Then it is a matter of waiting through the delay period to finalize the transaction on L1 and withdraw funds to Mainnet.

To avoid waiting a week before withdrawing funds to Ethereum, optimistic rollup users can employ a **liquidity provider** (LP). A liquidity provider assumes ownership of a pending L2 withdrawal and pays the user on L1 (in exchange for a fee).

Liquidity providers can check the validity of the user’s withdrawal request (by executing the chain themselves) before releasing funds. This way they have assurances that the transaction will be confirmed eventually (i.e., trustless finality).

#### 2. سازگاری با EVM {#evm-compatibility}

For developers, the advantage of optimistic rollups is their compatibility—or, better still, equivalence—with the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). EVM-compatible rollups comply with specifications in the [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) and support the EVM at the bytecode level.

EVM-compatibility in optimistic rollups has the following benefits:

i. Developers can migrate existing smart contracts on Ethereum to optimistic rollup chains without having to modify codebases extensively. This can save development teams time when deploying Ethereum smart contracts on L2.

ii. Developers and project teams using optimistic rollups can take advantage of Ethereum's infrastructure. This includes programming languages, code libraries, testing tools, client software, deployment infrastructure, and so on.

Using existing tooling is important because these tools have been extensively audited, debugged, and improved over the years. It also removes the need for Ethereum developers to learn how to build with an entirely new development stack.

#### 3. صدا زدن قرارداد از روی زنجیره های متقاطع {#cross-chain-contract-calls}

Users (externally owned accounts) interact with L2 contracts by submitting a transaction to the rollup contract or having a sequencer or validator do it for them. Optimistic rollups also allow contract accounts on Ethereum to interact with L2 contracts using bridging contracts to relay messages and pass data between L1 and L2. This means you can program an L1 contract on Ethereum Mainnet to invoke functions belonging to contracts on an L2 optimistic rollup.

Cross-chain contract calls happen asynchronously—meaning the call is initiated first, then executed at a later time. This is different from calls between the two contracts on Ethereum, where the call produces results immediately.

An example of a cross-chain contract call is the token deposit described earlier. A contract on L1 escrows the user's tokens and sends a message to a paired L2 contract to mint an equal amount of tokens on the rollup.

As cross-chain message calls result in contract execution, the sender is usually required to cover [gas costs](/developers/docs/gas/) for computation. It is advisable to set a high gas limit to prevent the transaction from failing on the target chain. The token bridging scenario is a good example; if the L1 side of the transaction (depositing the tokens) works, but the L2 side (minting new tokens) fails due to low gas, the deposit becomes irrecoverable.

Finally, we should note that L2 > L1 message calls between contracts need to account for delays (L1 > L2 calls are typically executed after some minutes). This is because messages sent to Mainnet from the optimistic rollup cannot be executed until the challenge window expires.

## هزینه رولاپ های بهینه چگونه کار می کند؟ {#how-do-optimistic-rollup-fees-work}

Optimistic rollups use a gas fee scheme, much like Ethereum, to denote how much users pay per transaction. Fees charged on optimistic rollups depends on the following components:

1. **State write**: Optimistic rollups publish transaction data and block headers (consisting of the previous block header hash, state root, batch root) to Ethereum as a `blob`, or "binary large object". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) introduced a cost-effective solution for including data on-chain. A `blob` is a new transaction field that allows rollups to post compressed state transition data to Ethereum L1. Unlike `calldata`, which remains permanently on-chain, blobs are short-lived and can be pruned from clients after [4096 epochs](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (approximately 18 days). By using blobs to post batches of compressed transactions, optimistic rollups can significantly reduce the cost of writing transactions to L1.

2. **Blob gas used**: Blob-carrying transactions employ a dynamic fee mechanism similar to the one introduced by [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). The gas fee for type-3 transactions takes into account the base fee for blobs, which is determined by the network based on blob-space demand and the blob-space usage of the transaction being sent.

3. **L2 operator fees**: This is the amount paid to the rollup nodes as compensation for computational costs incurred in processing transactions, much like gas fees on Ethereum. Rollup nodes charge lower transaction fees since L2s have higher processing capacities and aren't faced with the network congestions that force validators on Ethereum to prioritize transactions with higher fees.

Optimistic rollups apply several mechanisms to reducing fees for users, including batching transactions and compressing `calldata` to reduce data publication costs. You can check the [L2 fee tracker](https://l2fees.info/) for a real-time overview of how much it costs to use Ethereum-based optimistic rollups.

## چگونه رول اپهای بهینه سرعت و مقیاسپذیری را در اتریوم افزایش می دهند؟ {#scaling-ethereum-with-optimistic-rollups}

As explained, optimistic rollups publish compressed transaction data on Ethereum to guarantee data availability. The ability to compress data published on-chain is crucial to scaling throughput on Ethereum with optimistic rollups.

The main Ethereum chain places limits on how much data blocks can hold, denominated in gas units (the [average block size](/developers/docs/blocks/#block-size) is 15 million gas). While this restricts how much gas each transaction can use, it also means we can increase transactions processed per block by reducing transaction-related data—directly improving scalability.

Optimistic rollups use several techniques to achieve transaction data compression and improve TPS rates. For example, this [article](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compares the data a basic user transaction (sending ether) generates on Mainnet vs how much data the same transaction generates on a rollup:

| پارامتر  | Ethereum (L1)          | Rollup (L2)      |
| -------- | ---------------------- | ---------------- |
| Nonce    | ~3                     | 0                |
| Gasprice | ~8                     | 0-0.5            |
| گاز      | 3                      | 0-0.5            |
| To       | 21                     | 4                |
| Value    | 9                      | ~3               |
| امضا     | ~68 (2 + 33 + 33)      | ~0.5             |
| From     | 0 (recovered from sig) | 4                |
| **جمع**  | **حدود 112 بایت**      | **حدود 12 بایت** |

Doing some rough calculations on these figures can help show the scalability improvements afforded by an optimistic rollup:

1. The target size for every block is 15 million gas and it costs 16 gas to verify one byte of data. Dividing the average block size by 16 gas (15,000,000/16) shows the average block can hold **937,500 bytes of data**.
2. If a basic rollup transaction uses 12 bytes, then the average Ethereum block can process **78,125 rollup transactions** (937,5000/12) or **39 rollup batches** (if each batch holds an average of 2,000 transactions).
3. If a new block is produced on Ethereum every 15 seconds, then the rollup's processing speeds would amount to roughly **5,208 transactions per second**. This is done by dividing the number of basic rollup transactions an Ethereum block can hold (**78,125**) by the average block time (**15 seconds**).

This is a fairly optimistic estimate, given that optimistic rollup transactions cannot possibly comprise an entire block on Ethereum. However, it can give a rough idea of how much scalability gains that optimistic rollups can afford Ethereum users (current implementations offer up to 2,000 TPS).

The introduction of [data sharding](/roadmap/danksharding/) on Ethereum is expected to improve scalability in optimistic rollups. Because rollup transactions must share blockspace with other non-rollup transactions, their processing capacity is limited by data throughput on the main Ethereum chain. Danksharding will increase the space available to L2 chains to publish data per block, using cheaper, impermanent "blob" storage instead of expensive, permanent `CALLDATA`.

### مزایا و معایب رول اپ های بهینه {#optimistic-rollups-pros-and-cons}

| مزایا                                                                                                                                                 | معایب                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offers massive improvements in scalability without sacrificing security or trustlessness.                                                             | Delays in transaction finality due to potential fraud challenges.                                                                                   |
| Transaction data is stored on the layer 1 chain, improving transparency, security, censorship-resistance, and decentralization.                       | Centralized rollup operators (sequencers) can influence transaction ordering.                                                                       |
| Fraud proving guarantees trustless finality and allows honest minorities to secure the chain.                                                         | If there are no honest nodes a malicious operator can steal funds by posting invalid blocks and state commitments.                                  |
| Computing fraud proofs is open to regular L2 node, unlike validity proofs (used in ZK-rollups) that require special hardware.                         | Security model relies on at least one honest node executing rollup transactions and submitting fraud proofs to challenge invalid state transitions. |
| Rollups benefit from "trustless liveness" (anyone can force the chain to advance by executing transactions and posting assertions)                    | Users must wait for the one-week challenge period to expire before withdrawing funds back to Ethereum.                                              |
| Optimistic rollups rely on well-designed cryptoeconomic incentives to increase security on the chain.                                                 | Rollups must post all transaction data on-chain, which can increase costs.                                                                          |
| Compatibility with EVM and Solidity allows developers to port Ethereum-native smart contracts to rollups or use existing tooling to create new dapps. |                                                                                                                                                     |

### یک توضیح تصویری از رول اپهای بهینه {#optimistic-video}

با تصویر راحت‌تر یاد می‌گیرید؟ Watch Finematics explain optimistic rollups:

<YouTube id="7pWxCklcNsU" start="263" />

### استفاده ار رول اپهای بهینه {#use-optimistic-rollups}

Multiple implementations of Optimistic rollups exist that you can integrate into your dapps:

<RollupProductDevDoc rollupType="optimistic" />

## مطالعات تکمیلی در خصوص رول اپهای بهینه

- [How do optimistic rollups work (The Complete guide)](https://www.alchemy.com/overviews/optimistic-rollups)
- [What is a Blockchain Rollup? A Technical Introduction](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [The Essential Guide to Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [How does Optimism's Rollup really work?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [What is the Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
