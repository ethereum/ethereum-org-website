---
title: "سٹیلتھ ایڈریسز کا استعمال"
description: "سٹیلتھ ایڈریسز صارفین کو گمنام طور پر اثاثے منتقل کرنے کی اجازت دیتے ہیں۔ اس مضمون کو پڑھنے کے بعد، آپ اس قابل ہو جائیں گے: وضاحت کریں کہ سٹیلتھ ایڈریسز کیا ہیں اور وہ کیسے کام کرتے ہیں، سمجھیں کہ سٹیلتھ ایڈریسز کو اس طرح کیسے استعمال کیا جائے جس سے گمنامی برقرار رہے، اور ایک ویب پر مبنی ایپلی کیشن لکھیں جو سٹیلتھ ایڈریسز کا استعمال کرتی ہو۔"
author: "اوری پومرانٹز"
tags: ["سٹیلتھ ایڈریس", "پرائیویسی", "کرپٹوگرافی", "Rust", "wasm"]
skill: intermediate
breadcrumb: "سٹیلتھ ایڈریسز"
published: 2025-11-30
lang: ur
sidebarDepth: 3
---

آپ بل ہیں۔ کچھ وجوہات کی بنا پر جن پر ہم بات نہیں کریں گے، آپ "ایلس فار کوئین آف دی ورلڈ" مہم میں عطیہ دینا چاہتے ہیں اور چاہتے ہیں کہ ایلس کو معلوم ہو کہ آپ نے عطیہ دیا ہے تاکہ اگر وہ جیت جائے تو وہ آپ کو انعام دے سکے۔ بدقسمتی سے، اس کی جیت کی ضمانت نہیں ہے۔ ایک مسابقتی مہم ہے، "کیرول فار ایمپریس آف دی سولر سسٹم"۔ اگر کیرول جیت جاتی ہے، اور اسے پتہ چلتا ہے کہ آپ نے ایلس کو عطیہ دیا ہے، تو آپ مشکل میں پڑ جائیں گے۔ لہذا آپ صرف اپنے اکاؤنٹ سے ایلس کے اکاؤنٹ میں 200 ETH منتقل نہیں کر سکتے۔

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) کے پاس اس کا حل ہے۔ یہ ERC بتاتا ہے کہ گمنام منتقلی کے لیے [سٹیلتھ ایڈریسز](https://nerolation.github.io/stealth-utils) کا استعمال کیسے کیا جائے۔

**انتباہ**: سٹیلتھ ایڈریسز کے پیچھے موجود کرپٹوگرافی، جہاں تک ہم جانتے ہیں، محفوظ ہے۔ تاہم، ممکنہ سائیڈ چینل حملے ہو سکتے ہیں۔ [نیچے](#go-wrong)، آپ دیکھیں گے کہ آپ اس خطرے کو کم کرنے کے لیے کیا کر سکتے ہیں۔

## سٹیلتھ ایڈریسز کیسے کام کرتے ہیں {#how}

یہ مضمون سٹیلتھ ایڈریسز کو دو طریقوں سے سمجھانے کی کوشش کرے گا۔ پہلا یہ ہے کہ [انہیں کیسے استعمال کیا جائے](#how-use)۔ یہ حصہ باقی مضمون کو سمجھنے کے لیے کافی ہے۔ پھر، [اس کے پیچھے موجود ریاضی کی وضاحت](#how-math) ہے۔ اگر آپ کرپٹوگرافی میں دلچسپی رکھتے ہیں، تو اس حصے کو بھی پڑھیں۔ 

### سادہ ورژن (سٹیلتھ ایڈریسز کا استعمال کیسے کریں) {#how-use}

ایلس دو پرائیویٹ کیز (private keys) بناتی ہے اور متعلقہ پبلک کیز (public keys) شائع کرتی ہے (جنہیں ملا کر ایک سنگل ڈبل لینتھ میٹا ایڈریس بنایا جا سکتا ہے)۔ بل بھی ایک پرائیویٹ کی بناتا ہے اور متعلقہ پبلک کی شائع کرتا ہے۔

ایک فریق کی پبلک کی اور دوسرے کی پرائیویٹ کی کا استعمال کرتے ہوئے، آپ ایک مشترکہ راز (shared secret) اخذ کر سکتے ہیں جو صرف ایلس اور بل کو معلوم ہوتا ہے (اسے صرف پبلک کیز سے اخذ نہیں کیا جا سکتا)۔ اس مشترکہ راز کا استعمال کرتے ہوئے، بل سٹیلتھ ایڈریس حاصل کرتا ہے اور اس پر اثاثے بھیج سکتا ہے۔

ایلس بھی مشترکہ راز سے ایڈریس حاصل کرتی ہے، لیکن چونکہ وہ اپنی شائع کردہ پبلک کیز کی پرائیویٹ کیز جانتی ہے، اس لیے وہ وہ پرائیویٹ کی بھی حاصل کر سکتی ہے جو اسے اس ایڈریس سے رقم نکالنے کی اجازت دیتی ہے۔

### ریاضی (سٹیلتھ ایڈریسز اس طرح کیوں کام کرتے ہیں) {#how-math}

معیاری سٹیلتھ ایڈریسز [ایلپٹک-کرو کرپٹوگرافی (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) کا استعمال کرتے ہیں تاکہ کم کی بٹس (key bits) کے ساتھ بہتر کارکردگی حاصل کی جا سکے، جبکہ سیکیورٹی کی سطح وہی برقرار رہے۔ لیکن زیادہ تر حصے کے لیے ہم اسے نظر انداز کر سکتے ہیں اور یہ فرض کر سکتے ہیں کہ ہم عام ریاضی کا استعمال کر رہے ہیں۔

ایک نمبر ہے جو سب جانتے ہیں، *G*۔ آپ *G* سے ضرب دے سکتے ہیں۔ لیکن ECC کی نوعیت کی وجہ سے، *G* سے تقسیم کرنا عملی طور پر ناممکن ہے۔ ایتھریم میں پبلک کی کرپٹوگرافی عام طور پر اس طرح کام کرتی ہے کہ آپ ٹرانزیکشنز پر دستخط کرنے کے لیے ایک پرائیویٹ کی، *P<sub>priv</sub>*، استعمال کر سکتے ہیں جن کی تصدیق پھر ایک پبلک کی، <span dir="ltr">*P<sub>pub</sub> = GP<sub>priv</sub>*</span>، کے ذریعے کی جاتی ہے۔ 

ایلس دو پرائیویٹ کیز، *K<sub>priv</sub>* اور *V<sub>priv</sub>* بناتی ہے۔ *K<sub>priv</sub>* کا استعمال سٹیلتھ ایڈریس سے رقم خرچ کرنے کے لیے کیا جائے گا، اور *V<sub>priv</sub>* کا استعمال ایلس کے ایڈریسز دیکھنے کے لیے کیا جائے گا۔ ایلس پھر پبلک کیز شائع کرتی ہے: <span dir="ltr">*K<sub>pub</sub> = GK<sub>priv</sub>*</span> اور <span dir="ltr">*V<sub>pub</sub> = GV<sub>priv</sub>*</span>

بل ایک تیسری پرائیویٹ کی، *R<sub>priv</sub>* بناتا ہے، اور ایک مرکزی رجسٹری میں <span dir="ltr">*R<sub>pub</sub> = GR<sub>priv</sub>*</span> شائع کرتا ہے (بل اسے ایلس کو بھی بھیج سکتا تھا، لیکن ہم فرض کرتے ہیں کہ کیرول سن رہی ہے)۔

بل <span dir="ltr">*R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*</span> کا حساب لگاتا ہے، جس کے بارے میں اسے توقع ہے کہ ایلس بھی جانتی ہوگی (نیچے وضاحت کی گئی ہے)۔ اس قدر کو *S*، یعنی مشترکہ راز کہا جاتا ہے۔ اس سے بل کو ایک پبلک کی، <span dir="ltr">*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*</span> ملتی ہے۔ اس پبلک کی سے، وہ ایک ایڈریس کا حساب لگا سکتا ہے اور اس پر جو بھی وسائل چاہے بھیج سکتا ہے۔ مستقبل میں، اگر ایلس جیت جاتی ہے، تو بل اسے *R<sub>priv</sub>* بتا سکتا ہے تاکہ یہ ثابت ہو سکے کہ وسائل اس کی طرف سے آئے تھے۔

ایلس <span dir="ltr">*R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*</span> کا حساب لگاتی ہے۔ اس سے اسے وہی مشترکہ راز، *S* ملتا ہے۔ چونکہ وہ پرائیویٹ کی، *K<sub>priv</sub>* جانتی ہے، اس لیے وہ <span dir="ltr">*P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*</span> کا حساب لگا سکتی ہے۔ یہ کی اسے اس ایڈریس میں موجود اثاثوں تک رسائی دیتی ہے جو <span dir="ltr">*P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*</span> سے بنتا ہے۔

ہمارے پاس ایک الگ ویونگ کی (viewing key) ہے تاکہ ایلس ڈیو کی ورلڈ ڈومینیشن کیمپین سروسز کو ذیلی معاہدہ (subcontract) دے سکے۔ ایلس ڈیو کو پبلک ایڈریسز بتانے اور مزید رقم دستیاب ہونے پر اسے مطلع کرنے کی اجازت دینے کے لیے تیار ہے، لیکن وہ نہیں چاہتی کہ وہ اس کی مہم کی رقم خرچ کرے۔

چونکہ دیکھنے اور خرچ کرنے کے لیے الگ الگ کیز استعمال ہوتی ہیں، اس لیے ایلس ڈیو کو *V<sub>priv</sub>* دے سکتی ہے۔ پھر ڈیو <span dir="ltr">*S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*</span> کا حساب لگا سکتا ہے اور اس طرح پبلک کیز (<span dir="ltr">*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*</span>) حاصل کر سکتا ہے۔ لیکن *K<sub>priv</sub>* کے بغیر ڈیو پرائیویٹ کی حاصل نہیں کر سکتا۔

خلاصہ یہ کہ، یہ وہ اقدار ہیں جو مختلف شرکاء کو معلوم ہیں۔

| ایلس | شائع شدہ | بل | ڈیو |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| <span dir="ltr">*K<sub>pub</sub> = GK<sub>priv</sub>*</span> | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| <span dir="ltr">*V<sub>pub</sub> = GV<sub>priv</sub>*</span> | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | <span dir="ltr">*R<sub>pub</sub> = GR<sub>priv</sub>*</span> | *R<sub>pub</sub>* |
| <span dir="ltr">*S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*</span> | - | <span dir="ltr">*S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*</span> | <span dir="ltr">*S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>*</span> |
| <span dir="ltr">*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*</span> | - | <span dir="ltr">*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*</span> | <span dir="ltr">*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*</span> |
| <span dir="ltr">*Address=f(P<sub>pub</sub>)*</span> | - | <span dir="ltr">*Address=f(P<sub>pub</sub>)*</span> | <span dir="ltr">*Address=f(P<sub>pub</sub>)*</span> | <span dir="ltr">*Address=f(P<sub>pub</sub>)*</span>
| <span dir="ltr">*P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*</span> | - | - | - |

## جب سٹیلتھ ایڈریسز غلط ہو جاتے ہیں {#go-wrong}

*بلاک چین پر کوئی راز نہیں ہوتے*۔ اگرچہ سٹیلتھ ایڈریسز آپ کو پرائیویسی فراہم کر سکتے ہیں، لیکن یہ پرائیویسی ٹریفک کے تجزیے (traffic analysis) سے متاثر ہو سکتی ہے۔ ایک معمولی مثال کے طور پر، تصور کریں کہ بل ایک ایڈریس کو فنڈ کرتا ہے اور فوری طور پر ایک *R<sub>pub</sub>* ویلیو شائع کرنے کے لیے ٹرانزیکشن بھیجتا ہے۔ ایلس کے *V<sub>priv</sub>* کے بغیر، ہم یقین سے نہیں کہہ سکتے کہ یہ ایک سٹیلتھ ایڈریس ہے، لیکن اندازہ یہی لگایا جا سکتا ہے۔ پھر، ہم ایک اور ٹرانزیکشن دیکھتے ہیں جو اس ایڈریس سے تمام ETH ایلس کے کیمپین فنڈ ایڈریس میں منتقل کرتی ہے۔ ہم شاید اسے ثابت نہ کر سکیں، لیکن امکان ہے کہ بل نے ابھی ایلس کی مہم میں عطیہ دیا ہے۔ کیرول یقیناً ایسا ہی سوچے گی۔

بل کے لیے *R<sub>pub</sub>* کی اشاعت کو سٹیلتھ ایڈریس کی فنڈنگ سے الگ کرنا آسان ہے (انہیں مختلف اوقات میں، مختلف ایڈریسز سے کریں)۔ تاہم، یہ ناکافی ہے۔ کیرول جس پیٹرن کی تلاش میں ہے وہ یہ ہے کہ بل ایک ایڈریس کو فنڈ کرتا ہے، اور پھر ایلس کا کیمپین فنڈ اس سے رقم نکالتا ہے۔ 

ایک حل یہ ہے کہ ایلس کی مہم براہ راست رقم نہ نکالے، بلکہ اسے کسی تیسرے فریق کو ادائیگی کے لیے استعمال کرے۔ اگر ایلس کی مہم ڈیو کی ورلڈ ڈومینیشن کیمپین سروسز کو 10 ETH بھیجتی ہے، تو کیرول کو صرف یہ معلوم ہوگا کہ بل نے ڈیو کے کسی ایک گاہک کو عطیہ دیا ہے۔ اگر ڈیو کے پاس کافی گاہک ہیں، تو کیرول یہ نہیں جان پائے گی کہ آیا بل نے ایلس کو عطیہ دیا ہے جو اس کا مقابلہ کر رہی ہے، یا ایڈم، البرٹ، یا ابیگیل کو جن کی کیرول کو پرواہ نہیں ہے۔ ایلس ادائیگی کے ساتھ ایک ہیشڈ ویلیو (hashed value) شامل کر سکتی ہے، اور پھر ڈیو کو پری امیج (preimage) فراہم کر سکتی ہے، تاکہ یہ ثابت ہو سکے کہ یہ اس کا عطیہ تھا۔ متبادل کے طور پر، جیسا کہ اوپر بتایا گیا ہے، اگر ایلس ڈیو کو اپنا *V<sub>priv</sub>* دیتی ہے، تو وہ پہلے ہی جانتا ہے کہ ادائیگی کس کی طرف سے آئی ہے۔

اس حل کے ساتھ بنیادی مسئلہ یہ ہے کہ اس کے لیے ایلس کو رازداری کا خیال رکھنا پڑتا ہے جب کہ اس رازداری سے بل کو فائدہ ہوتا ہے۔ ایلس اپنی ساکھ برقرار رکھنا چاہ سکتی ہے تاکہ بل کا دوست باب بھی اسے عطیہ دے۔ لیکن یہ بھی ممکن ہے کہ اسے بل کو بے نقاب کرنے میں کوئی اعتراض نہ ہو، کیونکہ تب وہ اس بات سے ڈرے گا کہ اگر کیرول جیت گئی تو کیا ہوگا۔ بل آخر کار ایلس کو اور بھی زیادہ مدد فراہم کر سکتا ہے۔

### متعدد سٹیلتھ لیئرز کا استعمال {#multi-layer}

بل کی پرائیویسی کو برقرار رکھنے کے لیے ایلس پر انحصار کرنے کے بجائے، بل یہ خود کر سکتا ہے۔ وہ فرضی لوگوں، باب اور بیلا کے لیے متعدد میٹا ایڈریسز بنا سکتا ہے۔ بل پھر باب کو ETH بھیجتا ہے، اور "باب" (جو دراصل بل ہے) اسے بیلا کو بھیجتا ہے۔ "بیلا" (وہ بھی بل ہے) اسے ایلس کو بھیجتی ہے۔

کیرول اب بھی ٹریفک کا تجزیہ کر سکتی ہے اور بل-سے-باب-سے-بیلا-سے-ایلس کی پائپ لائن دیکھ سکتی ہے۔ تاہم، اگر "باب" اور "بیلا" بھی دیگر مقاصد کے لیے ETH استعمال کرتے ہیں، تو ایسا نہیں لگے گا کہ بل نے ایلس کو کچھ منتقل کیا ہے، یہاں تک کہ اگر ایلس فوری طور پر سٹیلتھ ایڈریس سے اپنے معلوم کیمپین ایڈریس میں رقم نکال لیتی ہے۔

## سٹیلتھ ایڈریس ایپلی کیشن لکھنا {#write-app}

یہ مضمون ایک سٹیلتھ ایڈریس ایپلی کیشن کی وضاحت کرتا ہے جو [GitHub پر دستیاب ہے](https://github.com/qbzzt/251022-stealth-addresses.git)۔ 

### ٹولز {#tools}

ایک [ٹائپ سکرپٹ سٹیلتھ ایڈریس لائبریری](https://github.com/ScopeLift/stealth-address-sdk) ہے جسے ہم استعمال کر سکتے ہیں۔ تاہم، کرپٹوگرافک آپریشنز CPU-intensive ہو سکتے ہیں۔ میں انہیں ایک کمپائلڈ زبان، جیسے [Rust](https://rust-lang.org/) میں لاگو کرنے، اور براؤزر میں کوڈ چلانے کے لیے [WASM](https://webassembly.org/) استعمال کرنے کو ترجیح دیتا ہوں۔

ہم [Vite](https://vite.dev/) اور [React](https://react.dev/) استعمال کرنے جا رہے ہیں۔ یہ انڈسٹری کے معیاری ٹولز ہیں؛ اگر آپ ان سے واقف نہیں ہیں، تو آپ [یہ ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) استعمال کر سکتے ہیں۔ Vite استعمال کرنے کے لیے، ہمیں Node کی ضرورت ہے۔

### سٹیلتھ ایڈریسز کو عملی شکل میں دیکھیں {#in-action}

1. ضروری ٹولز انسٹال کریں: [Rust](https://rust-lang.org/tools/install/) اور [Node](https://nodejs.org/en/download)۔

2. GitHub ریپوزٹری کو کلون کریں۔

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. ضروریات (prerequisites) انسٹال کریں اور Rust کوڈ کو کمپائل کریں۔

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. ویب سرور شروع کریں۔

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [ایپلی کیشن](http://localhost:5173/) پر براؤز کریں۔ اس ایپلی کیشن پیج میں دو فریم ہیں: ایک ایلس کے یوزر انٹرفیس کے لیے اور دوسرا بل کے لیے۔ دونوں فریم آپس میں بات چیت نہیں کرتے؛ وہ صرف سہولت کے لیے ایک ہی صفحے پر ہیں۔

6. ایلس کے طور پر، **Generate a Stealth Meta-Address** پر کلک کریں۔ یہ نیا سٹیلتھ ایڈریس اور متعلقہ پرائیویٹ کیز دکھائے گا۔ سٹیلتھ میٹا ایڈریس کو کلپ بورڈ پر کاپی کریں۔

7. بل کے طور پر، نیا سٹیلتھ میٹا ایڈریس پیسٹ کریں اور **Generate an address** پر کلک کریں۔ یہ آپ کو ایلس کے لیے فنڈ کرنے کا ایڈریس دیتا ہے۔ 

8. ایڈریس اور بل کی پبلک کی کاپی کریں اور انہیں ایلس کے یوزر انٹرفیس کے "Private key for address generated by Bill" ایریا میں پیسٹ کریں۔ ایک بار جب وہ فیلڈز بھر جائیں گی، تو آپ کو اس ایڈریس پر موجود اثاثوں تک رسائی کے لیے پرائیویٹ کی نظر آئے گی۔

9. آپ یہ یقینی بنانے کے لیے [ایک آن لائن کیلکولیٹر](https://iancoleman.net/ethereum-private-key-to-address/) استعمال کر سکتے ہیں کہ پرائیویٹ کی ایڈریس سے مطابقت رکھتی ہے۔

### پروگرام کیسے کام کرتا ہے {#how-the-program-works}

#### WASM جزو {#wasm}

وہ سورس کوڈ جو WASM میں کمپائل ہوتا ہے [Rust](https://rust-lang.org/) میں لکھا گیا ہے۔ آپ اسے [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) میں دیکھ سکتے ہیں۔ یہ کوڈ بنیادی طور پر جاوا سکرپٹ کوڈ اور [`eth-stealth-addresses` لائبریری](https://github.com/kassandraoftroy/eth-stealth-addresses) کے درمیان ایک انٹرفیس ہے۔

**`Cargo.toml`**

Rust میں [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) جاوا سکرپٹ میں [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) کے مترادف ہے۔ اس میں پیکیج کی معلومات، انحصار (dependency) کے اعلانات وغیرہ شامل ہیں۔

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) پیکیج کو بے ترتیب (random) اقدار پیدا کرنے کی ضرورت ہوتی ہے۔ یہ خالصتاً الگورتھمک ذرائع سے نہیں کیا جا سکتا؛ اس کے لیے اینٹروپی (entropy) کے ذریعہ کے طور پر کسی جسمانی عمل تک رسائی کی ضرورت ہوتی ہے۔ یہ تعریف بتاتی ہے کہ ہم وہ اینٹروپی اس براؤزر سے پوچھ کر حاصل کریں گے جس میں ہم چل رہے ہیں۔

```toml
console_error_panic_hook = "0.1.7"
```

[یہ لائبریری](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) ہمیں زیادہ بامعنی ایرر میسجز دیتی ہے جب WASM کوڈ پینک (panic) ہو جاتا ہے اور جاری نہیں رہ سکتا۔

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM کوڈ تیار کرنے کے لیے درکار آؤٹ پٹ کی قسم۔

**`lib.rs`**

یہ اصل Rust کوڈ ہے۔

```rust
use wasm_bindgen::prelude::*;
```

Rust سے WASM پیکیج بنانے کی تعریفیں۔ ان کی دستاویزات [یہاں](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) موجود ہیں۔

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

وہ فنکشنز جن کی ہمیں [`eth-stealth-addresses` لائبریری](https://github.com/kassandraoftroy/eth-stealth-addresses) سے ضرورت ہے۔

```rust
use hex::{decode,encode};
```

Rust عام طور پر اقدار کے لیے بائٹ [ایریز (arrays)](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) استعمال کرتا ہے۔ لیکن جاوا سکرپٹ میں، ہم عام طور پر ہیکسا ڈیسیمل سٹرنگز استعمال کرتے ہیں۔ [`hex` لائبریری](https://docs.rs/hex/latest/hex/) ہمارے لیے ایک نمائندگی سے دوسری میں ترجمہ کرتی ہے۔

```rust
#[wasm_bindgen]
```

جاوا سکرپٹ سے اس فنکشن کو کال کرنے کے قابل ہونے کے لیے WASM بائنڈنگز بنائیں۔

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

متعدد فیلڈز کے ساتھ ایک آبجیکٹ واپس کرنے کا سب سے آسان طریقہ JSON سٹرنگ واپس کرنا ہے۔ 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) تین فیلڈز واپس کرتا ہے:

- میٹا ایڈریس (*K<sub>pub</sub>* اور *V<sub>pub</sub>*)
- ویونگ پرائیویٹ کی (*V<sub>priv</sub>*)
- سپینڈنگ پرائیویٹ کی (*K<sub>priv</sub>*)

[ٹپل (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) سنٹیکس ہمیں ان اقدار کو دوبارہ الگ کرنے دیتا ہے۔

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

JSON-انکوڈ شدہ سٹرنگ بنانے کے لیے [`format!`](https://doc.rust-lang.org/std/fmt/index.html) میکرو استعمال کریں۔ ایریز کو ہیکس سٹرنگز میں تبدیل کرنے کے لیے [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) استعمال کریں۔

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

یہ فنکشن ایک ہیکس سٹرنگ (جو جاوا سکرپٹ کے ذریعے فراہم کی گئی ہے) کو بائٹ ایرے میں تبدیل کرتا ہے۔ ہم اسے جاوا سکرپٹ کوڈ کے ذریعے فراہم کردہ اقدار کو پارس (parse) کرنے کے لیے استعمال کرتے ہیں۔ یہ فنکشن اس وجہ سے پیچیدہ ہے کہ Rust ایریز اور ویکٹرز کو کیسے ہینڈل کرتا ہے۔

`<const N: usize>` ایکسپریشن کو [جینرک (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html) کہا جاتا ہے۔ `N` ایک پیرامیٹر ہے جو واپس کی گئی ایرے کی لمبائی کو کنٹرول کرتا ہے۔ فنکشن کو دراصل `str_to_array::<n>` کہا جاتا ہے، جہاں `n` ایرے کی لمبائی ہے۔

ریٹرن ویلیو `Option<[u8; N]>` ہے، جس کا مطلب ہے کہ واپس کی گئی ایرے [اختیاری (optional)](https://doc.rust-lang.org/std/option/) ہے۔ یہ Rust میں ان فنکشنز کے لیے ایک عام پیٹرن ہے جو ناکام ہو سکتے ہیں۔

مثال کے طور پر، اگر ہم `str_to_array::10("bad060a7")` کو کال کرتے ہیں، تو فنکشن کو دس ویلیو والی ایرے واپس کرنی چاہیے، لیکن ان پٹ صرف چار بائٹس ہے۔ فنکشن کو ناکام ہونے کی ضرورت ہے، اور یہ `None` واپس کر کے ایسا کرتا ہے۔ `str_to_array::4("bad060a7")` کے لیے ریٹرن ویلیو `Some<[0xba, 0xd0, 0x60, 0xa7]>` ہوگی۔

```rust
    // decode Result<Vec<u8>, _> واپس کرتا ہے
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) فنکشن ایک `Result<Vec<u8>, FromHexError>` واپس کرتا ہے۔ [`Result`](https://doc.rust-lang.org/std/result/) ٹائپ میں یا تو ایک کامیاب نتیجہ (`Ok(value)`) یا ایک ایرر (`Err(error)`) ہو سکتا ہے۔

`.ok()` میتھڈ `Result` کو ایک `Option` میں تبدیل کرتا ہے، جس کی قدر یا تو کامیاب ہونے پر `Ok()` ویلیو ہوتی ہے یا بصورت دیگر `None` ہوتی ہے۔ آخر میں، [سوالیہ نشان آپریٹر (question mark operator)](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) موجودہ فنکشنز کو ختم کر دیتا ہے اور اگر `Option` خالی ہو تو `None` واپس کرتا ہے۔ بصورت دیگر، یہ ویلیو کو ان ریپ (unwrap) کرتا ہے اور اسے واپس کرتا ہے (اس صورت میں، `vec` کو ایک ویلیو تفویض کرنے کے لیے)۔

یہ ایررز کو ہینڈل کرنے کا ایک عجیب و غریب پیچیدہ طریقہ لگتا ہے، لیکن `Result` اور `Option` اس بات کو یقینی بناتے ہیں کہ تمام ایررز کو کسی نہ کسی طرح ہینڈل کیا جائے۔

```rust
    if vec.len() != N { return None; }
```

اگر بائٹس کی تعداد غلط ہے، تو یہ ایک ناکامی ہے، اور ہم `None` واپس کرتے ہیں۔

```rust
    // try_into vec کو کنزیوم کرتا ہے اور [u8; N] بنانے کی کوشش کرتا ہے
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust میں دو ایرے ٹائپس ہیں۔ [ایریز (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) کا سائز مقرر ہوتا ہے۔ [ویکٹرز (Vectors)](https://doc.rust-lang.org/std/vec/index.html) بڑھ اور سکڑ سکتے ہیں۔ `hex::decode` ایک ویکٹر واپس کرتا ہے، لیکن `eth_stealth_addresses` لائبریری ایریز وصول کرنا چاہتی ہے۔ [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) ایک ویلیو کو دوسری ٹائپ میں تبدیل کرتا ہے، مثال کے طور پر، ایک ویکٹر کو ایرے میں۔

```rust
    Some(array)
}
```

فنکشن کے آخر میں ویلیو واپس کرتے وقت Rust آپ کو [`return`](https://doc.rust-lang.org/std/keyword.return.html) کی ورڈ استعمال کرنے کا پابند نہیں کرتا۔

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

یہ فنکشن ایک پبلک میٹا ایڈریس وصول کرتا ہے، جس میں *V<sub>pub</sub>* اور *K<sub>pub</sub>* دونوں شامل ہوتے ہیں۔ یہ سٹیلتھ ایڈریس، شائع کرنے کے لیے پبلک کی (*R<sub>pub</sub>*)، اور ایک بائٹ کی سکین ویلیو واپس کرتا ہے جو اس بات کی شناخت کو تیز کرتی ہے کہ کون سے شائع شدہ ایڈریسز ایلس کے ہو سکتے ہیں۔

سکین ویلیو مشترکہ راز کا حصہ ہے (<span dir="ltr">*S = GR<sub>priv</sub>V<sub>priv</sub>*</span>)۔ یہ ویلیو ایلس کو دستیاب ہے، اور اسے چیک کرنا اس بات کو چیک کرنے سے کہیں زیادہ تیز ہے کہ آیا <span dir="ltr">*f(K<sub>pub</sub>+G\*hash(S))*</span> شائع شدہ ایڈریس کے برابر ہے یا نہیں۔

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

ہم لائبریری کا [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) استعمال کرتے ہیں۔

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSON-انکوڈ شدہ آؤٹ پٹ سٹرنگ تیار کریں۔

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

یہ فنکشن ایڈریس سے رقم نکالنے کے لیے پرائیویٹ کی (*R<sub>priv</sub>*) کا حساب لگانے کے لیے لائبریری کا [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) استعمال کرتا ہے۔ اس حساب کتاب کے لیے ان اقدار کی ضرورت ہوتی ہے:

- ایڈریس (<span dir="ltr">*Address=f(P<sub>pub</sub>)*</span>)
- بل کے ذریعے تیار کردہ پبلک کی (*R<sub>pub</sub>*)
- ویو پرائیویٹ کی (*V<sub>priv</sub>*)
- سپینڈ پرائیویٹ کی (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) بتاتا ہے کہ جب WASM کوڈ شروع (initialize) ہوتا ہے تو فنکشن کو عمل میں لایا جاتا ہے۔

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

یہ کوڈ بتاتا ہے کہ پینک آؤٹ پٹ کو جاوا سکرپٹ کنسول میں بھیجا جائے۔ اسے عملی شکل میں دیکھنے کے لیے، ایپلی کیشن استعمال کریں اور بل کو ایک غلط میٹا ایڈریس دیں (صرف ایک ہیکسا ڈیسیمل ہندسہ تبدیل کریں)۔ آپ کو جاوا سکرپٹ کنسول میں یہ ایرر نظر آئے گا:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

اس کے بعد ایک سٹیک ٹریس (stack trace) ہوگا۔ پھر بل کو درست میٹا ایڈریس دیں، اور ایلس کو یا تو غلط ایڈریس دیں یا غلط پبلک کی دیں۔ آپ کو یہ ایرر نظر آئے گا:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

ایک بار پھر، اس کے بعد ایک سٹیک ٹریس ہوگا۔

#### یوزر انٹرفیس {#ui}

یوزر انٹرفیس [React](https://react.dev/) کا استعمال کرتے ہوئے لکھا گیا ہے اور [Vite](https://vite.dev/) کے ذریعے پیش کیا گیا ہے۔ آپ [اس ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) کا استعمال کرتے ہوئے ان کے بارے میں جان سکتے ہیں۔ یہاں [WAGMI](https://wagmi.sh/) کی کوئی ضرورت نہیں ہے کیونکہ ہم براہ راست کسی بلاک چین یا والیٹ کے ساتھ تعامل نہیں کرتے ہیں۔

یوزر انٹرفیس کا واحد غیر واضح حصہ WASM کنیکٹیویٹی ہے۔ یہ اس طرح کام کرتا ہے۔

**`vite.config.js`**

اس فائل میں [Vite کنفیگریشن](https://vite.dev/config/) شامل ہے۔

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

ہمیں دو Vite پلگ انز کی ضرورت ہے: [react](https://www.npmjs.com/package/@vitejs/plugin-react) اور [wasm](https://github.com/Menci/vite-plugin-wasm#readme)۔

**`App.jsx`**

یہ فائل ایپلی کیشن کا مرکزی جزو ہے۔ یہ ایک کنٹینر ہے جس میں دو اجزاء شامل ہیں: `Alice` اور `Bill`، جو ان صارفین کے لیے یوزر انٹرفیس ہیں۔ WASM کے لیے متعلقہ حصہ انیشلائزیشن کوڈ ہے۔

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

جب ہم [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) استعمال کرتے ہیں، تو یہ دو فائلیں بناتا ہے جو ہم یہاں استعمال کرتے ہیں: ایک wasm فائل جس میں اصل کوڈ ہوتا ہے (یہاں، `src/rust-wasm/pkg/rust_wasm_bg.wasm`) اور ایک جاوا سکرپٹ فائل جس میں اسے استعمال کرنے کی تعریفیں ہوتی ہیں (یہاں، `src/rust_wasm/pkg/rust_wasm.js`)۔ اس جاوا سکرپٹ فائل کا ڈیفالٹ ایکسپورٹ وہ کوڈ ہے جسے WASM شروع کرنے کے لیے چلانے کی ضرورت ہوتی ہے۔

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect` ہک (hook)](https://react.dev/reference/react/useEffect) آپ کو ایک ایسا فنکشن بتانے دیتا ہے جو سٹیٹ ویری ایبلز (state variables) کے تبدیل ہونے پر عمل میں لایا جاتا ہے۔ یہاں، سٹیٹ ویری ایبلز کی فہرست خالی (`[]`) ہے، لہذا یہ فنکشن صفحہ لوڈ ہونے پر صرف ایک بار عمل میں لایا جاتا ہے۔

ایفیکٹ فنکشن کو فوری طور پر واپس آنا ہوتا ہے۔ غیر مطابقت پذیر (asynchronous) کوڈ استعمال کرنے کے لیے، جیسے کہ WASM `init` (جسے `.wasm` فائل لوڈ کرنی ہوتی ہے اور اس لیے وقت لگتا ہے) ہم ایک اندرونی [`async`](https://en.wikipedia.org/wiki/Async/await) فنکشن کی تعریف کرتے ہیں اور اسے `await` کے بغیر چلاتے ہیں۔

**`Bill.jsx`**

یہ بل کے لیے یوزر انٹرفیس ہے۔ اس کا ایک ہی ایکشن ہے، ایلس کے فراہم کردہ سٹیلتھ میٹا ایڈریس کی بنیاد پر ایک ایڈریس بنانا۔

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

ڈیفالٹ ایکسپورٹ کے علاوہ، `wasm-pack` کے ذریعے تیار کردہ جاوا سکرپٹ کوڈ WASM کوڈ میں موجود ہر فنکشن کے لیے ایک فنکشن ایکسپورٹ کرتا ہے۔

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM فنکشنز کو کال کرنے کے لیے، ہم صرف `wasm-pack` کے ذریعے بنائی گئی جاوا سکرپٹ فائل کے ذریعے ایکسپورٹ کیے گئے فنکشن کو کال کرتے ہیں۔

**`Alice.jsx`**

`Alice.jsx` میں کوڈ یکساں ہے، سوائے اس کے کہ ایلس کے دو ایکشنز ہیں:

- ایک میٹا ایڈریس بنائیں
- بل کے ذریعے شائع کردہ ایڈریس کے لیے پرائیویٹ کی حاصل کریں

## نتیجہ {#conclusion}

سٹیلتھ ایڈریسز ہر مرض کا علاج نہیں ہیں؛ انہیں [درست طریقے سے استعمال](#go-wrong) کرنا پڑتا ہے۔ لیکن جب انہیں درست طریقے سے استعمال کیا جائے، تو وہ پبلک بلاک چین پر پرائیویسی کو فعال کر سکتے ہیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔