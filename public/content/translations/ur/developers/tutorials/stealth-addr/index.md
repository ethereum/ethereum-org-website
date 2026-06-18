---
title: "خفیہ پتے استعمال کرنا"
description: "خفیہ پتے صارفین کو گمنام طور پر اثاثوں کی منتقلی کی اجازت دیتے ہیں۔ اس مضمون کو پڑھنے کے بعد، آپ اس قابل ہو جائیں گے: وضاحت کریں کہ خفیہ پتے کیا ہیں اور وہ کیسے کام کرتے ہیں، سمجھیں کہ خفیہ پتوں کو اس طرح کیسے استعمال کیا جائے جس سے گمنامی برقرار رہے، اور ایک ویب پر مبنی ایپلیکیشن لکھیں جو خفیہ پتے استعمال کرتی ہو۔"
author: اوری پومرانٹز
tags:
  - خفیہ پتہ
  - رازداری
  - علمِ تشفیر
  - Rust
  - wasm
skill: intermediate
breadcrumb: خفیہ پتے
published: 2025-11-30
lang: ur
sidebarDepth: 3
---

آپ بِل ہیں۔ کچھ وجوہات کی بنا پر جن پر ہم بات نہیں کریں گے، آپ "ایلس برائے ملکہِ دنیا" مہم میں عطیہ دینا چاہتے ہیں اور چاہتے ہیں کہ ایلس کو معلوم ہو کہ آپ نے عطیہ دیا ہے تاکہ اگر وہ جیت جائے تو آپ کو انعام دے سکے۔ بدقسمتی سے، اس کی جیت یقینی نہیں ہے۔ ایک حریف مہم بھی ہے، "کیرول برائے ملکہِ نظامِ شمسی"۔ اگر کیرول جیت جاتی ہے، اور اسے پتہ چلتا ہے کہ آپ نے ایلس کو عطیہ دیا ہے، تو آپ مشکل میں پڑ جائیں گے۔ اس لیے آپ محض اپنے اکاؤنٹ سے ایلس کے اکاؤنٹ میں <span dir="ltr">200 ETH</span> کی منتقلی نہیں کر سکتے۔

[<span dir="ltr">ERC-5564</span>](https://eips.ethereum.org/EIPS/eip-5564) کے پاس اس کا حل ہے۔ یہ <span dir="ltr">ERC</span> بتاتا ہے کہ گمنام منتقلی کے لیے [خفیہ پتے](https://nerolation.github.io/stealth-utils) کیسے استعمال کیے جائیں۔

**انتباہ**: خفیہ پتوں کے پیچھے موجود علمِ تشفیر، جہاں تک ہم جانتے ہیں، محفوظ ہے۔ تاہم، ممکنہ سائیڈ چین حملے ہو سکتے ہیں۔ [نیچے](#go-wrong)، آپ دیکھیں گے کہ آپ اس خطرے کو کم کرنے کے لیے کیا کر سکتے ہیں۔

## خفیہ پتے کیسے کام کرتے ہیں {#how}

یہ مضمون خفیہ پتوں کو دو طریقوں سے سمجھانے کی کوشش کرے گا۔ پہلا یہ ہے کہ [انہیں کیسے استعمال کیا جائے](#how-use)۔ یہ حصہ بقیہ مضمون کو سمجھنے کے لیے کافی ہے۔ پھر، [اس کے پیچھے موجود ریاضی کی وضاحت](#how-math) ہے۔ اگر آپ علمِ تشفیر میں دلچسپی رکھتے ہیں، تو اس حصے کو بھی پڑھیں۔

### سادہ ورژن (خفیہ پتے کیسے استعمال کریں) {#how-use}

ایلس دو نجی کلیدیں بناتی ہے اور متعلقہ عوامی کلیدیں شائع کرتی ہے (جنہیں ملا کر ایک دوہری لمبائی کا میٹا-پتہ بنایا جا سکتا ہے)۔ بِل بھی ایک نجی کلید بناتا ہے اور متعلقہ عوامی کلید شائع کرتا ہے۔

ایک فریق کی عوامی کلید اور دوسرے کی نجی کلید کا استعمال کرتے ہوئے، آپ ایک مشترکہ راز اخذ کر سکتے ہیں جو صرف ایلس اور بِل کو معلوم ہوتا ہے (اسے صرف عوامی کلیدوں سے اخذ نہیں کیا جا سکتا)۔ اس مشترکہ راز کا استعمال کرتے ہوئے، بِل خفیہ پتہ حاصل کرتا ہے اور اس پر اثاثے بھیج سکتا ہے۔

ایلس بھی مشترکہ راز سے پتہ حاصل کرتی ہے، لیکن چونکہ وہ اپنی شائع کردہ عوامی کلیدوں کی نجی کلیدیں جانتی ہے، اس لیے وہ وہ نجی کلید بھی حاصل کر سکتی ہے جو اسے اس پتے سے رقم نکالنے کی اجازت دیتی ہے۔

### ریاضی (خفیہ پتے اس طرح کیوں کام کرتے ہیں) {#how-math}

معیاری خفیہ پتے کم کلیدی بٹس کے ساتھ بہتر کارکردگی حاصل کرنے کے لیے [ایلپٹک-کرو کرپٹوگرافی (<span dir="ltr">ECC</span>)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) کا استعمال کرتے ہیں، جبکہ سیکیورٹی کی سطح کو برقرار رکھتے ہیں۔ لیکن زیادہ تر حصے کے لیے ہم اسے نظر انداز کر سکتے ہیں اور یہ فرض کر سکتے ہیں کہ ہم عام ریاضی استعمال کر رہے ہیں۔

ایک عدد ہے جسے سب جانتے ہیں، *<span dir="ltr">G</span>*۔ آپ *<span dir="ltr">G</span>* سے ضرب دے سکتے ہیں۔ لیکن <span dir="ltr">ECC</span> کی نوعیت کی وجہ سے، *<span dir="ltr">G</span>* سے تقسیم کرنا عملی طور پر ناممکن ہے۔ ایتھیریم میں عوامی کلید کا علمِ تشفیر عام طور پر اس طرح کام کرتا ہے کہ آپ ایک نجی کلید، *<span dir="ltr">P<sub>priv</sub></span>*، کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کر سکتے ہیں جن کی تصدیق پھر ایک عوامی کلید، *<span dir="ltr">P<sub>pub</sub> = GP<sub>priv</sub></span>*، کے ذریعے کی جاتی ہے۔

ایلس دو نجی کلیدیں، *<span dir="ltr">K<sub>priv</sub></span>* اور *<span dir="ltr">V<sub>priv</sub></span>* بناتی ہے۔ *<span dir="ltr">K<sub>priv</sub></span>* کا استعمال خفیہ پتے سے رقم خرچ کرنے کے لیے کیا جائے گا، اور *<span dir="ltr">V<sub>priv</sub></span>* کا استعمال ایلس کے پتوں کو دیکھنے کے لیے کیا جائے گا۔ پھر ایلس عوامی کلیدیں شائع کرتی ہے: *<span dir="ltr">K<sub>pub</sub> = GK<sub>priv</sub></span>* اور *<span dir="ltr">V<sub>pub</sub> = GV<sub>priv</sub></span>*

بِل ایک تیسری نجی کلید، *<span dir="ltr">R<sub>priv</sub></span>* بناتا ہے، اور *<span dir="ltr">R<sub>pub</sub> = GR<sub>priv</sub></span>* کو ایک مرکزی رجسٹری میں شائع کرتا ہے (بِل اسے ایلس کو بھی بھیج سکتا تھا، لیکن ہم فرض کرتے ہیں کہ کیرول سن رہی ہے)۔

بِل *<span dir="ltr">R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* کا حساب لگاتا ہے، جس کے بارے میں اسے توقع ہے کہ ایلس بھی جانتی ہوگی (نیچے وضاحت کی گئی ہے)۔ اس قدر کو *<span dir="ltr">S</span>*، یعنی مشترکہ راز کہا جاتا ہے۔ اس سے بِل کو ایک عوامی کلید، *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* ملتی ہے۔ اس عوامی کلید سے، وہ ایک پتے کا حساب لگا سکتا ہے اور اس پر جو بھی وسائل چاہے بھیج سکتا ہے۔ مستقبل میں، اگر ایلس جیت جاتی ہے، تو بِل اسے *<span dir="ltr">R<sub>priv</sub></span>* بتا سکتا ہے تاکہ یہ ثابت کر سکے کہ وسائل اس کی طرف سے آئے تھے۔

ایلس *<span dir="ltr">R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* کا حساب لگاتی ہے۔ اس سے اسے وہی مشترکہ راز، *<span dir="ltr">S</span>* ملتا ہے۔ چونکہ وہ نجی کلید، *<span dir="ltr">K<sub>priv</sub></span>* جانتی ہے، اس لیے وہ *<span dir="ltr">P<sub>priv</sub> = K<sub>priv</sub>+hash(S)</span>* کا حساب لگا سکتی ہے۔ یہ کلید اسے اس پتے میں موجود اثاثوں تک رسائی دیتی ہے جو *<span dir="ltr">P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)</span>* کا نتیجہ ہے۔

ہمارے پاس ایک الگ دیکھنے کی کلید ہے تاکہ ایلس ڈیو کی ورلڈ ڈومینیشن کیمپین سروسز کو ذیلی معاہدہ دے سکے۔ ایلس ڈیو کو عوامی پتے بتانے اور مزید رقم دستیاب ہونے پر اسے مطلع کرنے کے لیے تیار ہے، لیکن وہ نہیں چاہتی کہ وہ اس کی مہم کی رقم خرچ کرے۔

چونکہ دیکھنے اور خرچ کرنے کے لیے الگ الگ کلیدیں استعمال ہوتی ہیں، اس لیے ایلس ڈیو کو *<span dir="ltr">V<sub>priv</sub></span>* دے سکتی ہے۔ پھر ڈیو *<span dir="ltr">S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* کا حساب لگا سکتا ہے اور اس طرح عوامی کلیدیں (*<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>*) حاصل کر سکتا ہے۔ لیکن *<span dir="ltr">K<sub>priv</sub></span>* کے بغیر ڈیو نجی کلید حاصل نہیں کر سکتا۔

خلاصہ یہ کہ، یہ وہ اقدار ہیں جو مختلف شرکاء کو معلوم ہیں۔

| ایلس | شائع شدہ | بِل | ڈیو |
| - | - | - | - |
| <span dir="ltr">G</span> | <span dir="ltr">G</span> | <span dir="ltr">G</span> | <span dir="ltr">G</span> |
| *<span dir="ltr">K<sub>priv</sub></span>* | - | - | - | 
| *<span dir="ltr">V<sub>priv</sub></span>* | - | - | *<span dir="ltr">V<sub>priv</sub></span>* |
| *<span dir="ltr">K<sub>pub</sub> = GK<sub>priv</sub></span>* | *<span dir="ltr">K<sub>pub</sub></span>* | *<span dir="ltr">K<sub>pub</sub></span>* | *<span dir="ltr">K<sub>pub</sub></span>* |
| *<span dir="ltr">V<sub>pub</sub> = GV<sub>priv</sub></span>* | *<span dir="ltr">V<sub>pub</sub></span>* | *<span dir="ltr">V<sub>pub</sub></span>* | *<span dir="ltr">V<sub>pub</sub></span>* |
| - | - | *<span dir="ltr">R<sub>priv</sub></span>* | - |
| *<span dir="ltr">R<sub>pub</sub></span>* | *<span dir="ltr">R<sub>pub</sub></span>* | *<span dir="ltr">R<sub>pub</sub> = GR<sub>priv</sub></span>* | *<span dir="ltr">R<sub>pub</sub></span>* |
| *<span dir="ltr">S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* | - | *<span dir="ltr">S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* | *<span dir="ltr">S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* |
| *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* | - | *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* | *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* |
| *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>* | - | *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>* | *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>* | *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>*
| *<span dir="ltr">P<sub>priv</sub> = K<sub>priv</sub>+hash(S)</span>* | - | - | - |

## جب خفیہ پتے غلط کام کرتے ہیں {#go-wrong}

*بلاک چین پر کوئی راز نہیں ہوتے*۔ اگرچہ خفیہ پتے آپ کو رازداری فراہم کر سکتے ہیں، لیکن یہ رازداری ٹریفک کے تجزیے سے متاثر ہو سکتی ہے۔ ایک معمولی مثال کے طور پر، تصور کریں کہ بِل ایک پتے کو فنڈ دیتا ہے اور فوری طور پر ایک *<span dir="ltr">R<sub>pub</sub></span>* قدر شائع کرنے کے لیے ایک ٹرانزیکشن بھیجتا ہے۔ ایلس کی *<span dir="ltr">V<sub>priv</sub></span>* کے بغیر، ہم یقین سے نہیں کہہ سکتے کہ یہ ایک خفیہ پتہ ہے، لیکن قرائن اسی طرف اشارہ کرتے ہیں۔ پھر، ہم ایک اور ٹرانزیکشن دیکھتے ہیں جو اس پتے سے تمام <span dir="ltr">ETH</span> ایلس کے مہم فنڈ کے پتے پر منتقل کرتی ہے۔ ہم شاید اسے ثابت نہ کر سکیں، لیکن امکان ہے کہ بِل نے ابھی ایلس کی مہم میں عطیہ دیا ہے۔ کیرول یقیناً ایسا ہی سوچے گی۔

بِل کے لیے *<span dir="ltr">R<sub>pub</sub></span>* کی اشاعت کو خفیہ پتے کی فنڈنگ سے الگ کرنا آسان ہے (انہیں مختلف اوقات میں، مختلف پتوں سے کریں)۔ تاہم، یہ ناکافی ہے۔ کیرول جس طرز کی تلاش میں ہے وہ یہ ہے کہ بِل ایک پتے کو فنڈ دیتا ہے، اور پھر ایلس کا مہم فنڈ اس سے رقم نکالتا ہے۔

ایک حل یہ ہے کہ ایلس کی مہم براہ راست رقم نہ نکالے، بلکہ اسے کسی تیسرے فریق کو ادائیگی کے لیے استعمال کرے۔ اگر ایلس کی مہم ڈیو کی ورلڈ ڈومینیشن کیمپین سروسز کو <span dir="ltr">10 ETH</span> بھیجتی ہے، تو کیرول کو صرف اتنا معلوم ہوگا کہ بِل نے ڈیو کے کسی گاہک کو عطیہ دیا ہے۔ اگر ڈیو کے پاس کافی گاہک ہیں، تو کیرول یہ نہیں جان پائے گی کہ آیا بِل نے ایلس کو عطیہ دیا ہے جو اس کی حریف ہے، یا ایڈم، البرٹ، یا ابیگیل کو جن کی کیرول کو پرواہ نہیں ہے۔ ایلس ادائیگی کے ساتھ ایک ہیش شدہ قدر شامل کر سکتی ہے، اور پھر ڈیو کو پری امیج فراہم کر سکتی ہے، تاکہ یہ ثابت کر سکے کہ یہ اس کا عطیہ تھا۔ متبادل کے طور پر، جیسا کہ اوپر بتایا گیا ہے، اگر ایلس ڈیو کو اپنی *<span dir="ltr">V<sub>priv</sub></span>* دیتی ہے، تو وہ پہلے ہی جانتا ہے کہ ادائیگی کس کی طرف سے آئی ہے۔

اس حل کے ساتھ بنیادی مسئلہ یہ ہے کہ اس کے لیے ایلس کو رازداری کا خیال رکھنا پڑتا ہے جب کہ اس رازداری سے بِل کو فائدہ ہوتا ہے۔ ایلس اپنی ساکھ برقرار رکھنا چاہ سکتی ہے تاکہ بِل کا دوست باب بھی اسے عطیہ دے۔ لیکن یہ بھی ممکن ہے کہ اسے بِل کو بے نقاب کرنے میں کوئی اعتراض نہ ہو، کیونکہ تب وہ اس بات سے ڈرے گا کہ اگر کیرول جیت گئی تو کیا ہوگا۔ بِل بالآخر ایلس کو اور بھی زیادہ تعاون فراہم کر سکتا ہے۔

### متعدد خفیہ تہوں کا استعمال {#multi-layer}

بِل کی رازداری کو برقرار رکھنے کے لیے ایلس پر انحصار کرنے کے بجائے، بِل خود یہ کر سکتا ہے۔ وہ فرضی لوگوں، باب اور بیلا کے لیے متعدد میٹا-پتے بنا سکتا ہے۔ بِل پھر باب کو <span dir="ltr">ETH</span> بھیجتا ہے، اور "باب" (جو دراصل بِل ہے) اسے بیلا کو بھیجتا ہے۔ "بیلا" (وہ بھی بِل ہے) اسے ایلس کو بھیجتی ہے۔

کیرول اب بھی ٹریفک کا تجزیہ کر سکتی ہے اور بِل-سے-باب-سے-بیلا-سے-ایلس کی پائپ لائن دیکھ سکتی ہے۔ تاہم، اگر "باب" اور "بیلا" بھی دیگر مقاصد کے لیے <span dir="ltr">ETH</span> استعمال کرتے ہیں، تو ایسا نہیں لگے گا کہ بِل نے ایلس کو کچھ منتقل کیا ہے، یہاں تک کہ اگر ایلس فوری طور پر خفیہ پتے سے اپنے معلوم مہم کے پتے پر رقم نکال لیتی ہے۔

## خفیہ پتے کی ایپلیکیشن لکھنا {#write-app}

یہ مضمون ایک خفیہ پتے کی ایپلیکیشن کی وضاحت کرتا ہے جو [GitHub پر دستیاب ہے](https://github.com/qbzzt/251022-stealth-addresses.git)۔

### ٹولز {#tools}

ایک [TypeScript خفیہ پتے کی لائبریری](https://github.com/ScopeLift/stealth-address-sdk) ہے جسے ہم استعمال کر سکتے ہیں۔ تاہم، علمِ تشفیر کے آپریشنز <span dir="ltr">CPU</span> پر بھاری ہو سکتے ہیں۔ میں انہیں ایک مرتب شدہ زبان، جیسے [Rust](https://rust-lang.org/) میں نافذ کرنے، اور براؤزر میں کوڈ چلانے کے لیے [<span dir="ltr">WASM</span>](https://webassembly.org/) استعمال کرنے کو ترجیح دیتا ہوں۔

ہم [Vite](https://vite.dev/) اور [React](https://react.dev/) استعمال کرنے جا رہے ہیں۔ یہ انڈسٹری کے معیاری ٹولز ہیں؛ اگر آپ ان سے واقف نہیں ہیں، تو آپ [یہ ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) استعمال کر سکتے ہیں۔ Vite استعمال کرنے کے لیے، ہمیں Node کی ضرورت ہے۔

### خفیہ پتوں کو عملی شکل میں دیکھیں {#in-action}

1. ضروری ٹولز انسٹال کریں: [Rust](https://rust-lang.org/tools/install/) اور [Node](https://nodejs.org/en/download)۔

2. GitHub ریپوزٹری کو کلون کریں۔

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. ضروریات انسٹال کریں اور Rust کوڈ کو مرتب کریں۔

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

5. [ایپلیکیشن](http://localhost:5173/) کو براؤز کریں۔ اس ایپلیکیشن کے صفحے میں دو فریم ہیں: ایک ایلس کے یوزر انٹرفیس کے لیے اور دوسرا بِل کے لیے۔ دونوں فریم آپس میں بات چیت نہیں کرتے؛ وہ صرف سہولت کے لیے ایک ہی صفحے پر ہیں۔

6. ایلس کے طور پر، **<span dir="ltr">Generate a Stealth Meta-Address</span>** پر کلک کریں۔ یہ نیا خفیہ پتہ اور متعلقہ نجی کلیدیں دکھائے گا۔ خفیہ میٹا-پتے کو کلپ بورڈ پر کاپی کریں۔

7. بِل کے طور پر، نیا خفیہ میٹا-پتہ پیسٹ کریں اور **<span dir="ltr">Generate an address</span>** پر کلک کریں۔ یہ آپ کو ایلس کے لیے فنڈ کرنے کا پتہ دیتا ہے۔

8. پتہ اور بِل کی عوامی کلید کاپی کریں اور انہیں ایلس کے یوزر انٹرفیس کے "<span dir="ltr">Private key for address generated by Bill</span>" والے حصے میں پیسٹ کریں۔ ایک بار جب وہ فیلڈز پُر ہو جائیں گی، تو آپ کو اس پتے پر موجود اثاثوں تک رسائی کے لیے نجی کلید نظر آئے گی۔

9. آپ یہ یقینی بنانے کے لیے کہ نجی کلید پتے سے مطابقت رکھتی ہے، [ایک آن لائن کیلکولیٹر](https://iancoleman.net/ethereum-private-key-to-address/) استعمال کر سکتے ہیں۔

### پروگرام کیسے کام کرتا ہے {#how-the-program-works}

#### <span dir="ltr">WASM</span> جزو {#wasm}

وہ سورس کوڈ جو <span dir="ltr">WASM</span> میں مرتب ہوتا ہے [Rust](https://rust-lang.org/) میں لکھا گیا ہے۔ آپ اسے [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) میں دیکھ سکتے ہیں۔ یہ کوڈ بنیادی طور پر JavaScript کوڈ اور [`eth-stealth-addresses` لائبریری](https://github.com/kassandraoftroy/eth-stealth-addresses) کے درمیان ایک انٹرفیس ہے۔

**`Cargo.toml`**

Rust میں [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) JavaScript میں [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) کے مترادف ہے۔ اس میں پیکیج کی معلومات، انحصاری کے اعلانات وغیرہ شامل ہیں۔

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) پیکیج کو بے ترتیب اقدار پیدا کرنے کی ضرورت ہوتی ہے۔ یہ خالصتاً الگورتھمک ذرائع سے نہیں کیا جا سکتا؛ اس کے لیے اینٹروپی کے ذریعہ کے طور پر کسی طبعی عمل تک رسائی درکار ہوتی ہے۔ یہ تعریف واضح کرتی ہے کہ ہم جس براؤزر میں چل رہے ہیں اس سے پوچھ کر وہ اینٹروپی حاصل کریں گے۔

```toml
console_error_panic_hook = "0.1.7"
```

[یہ لائبریری](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) ہمیں زیادہ بامعنی ایرر پیغامات دیتی ہے جب <span dir="ltr">WASM</span> کوڈ گھبراہٹ (panic) کا شکار ہوتا ہے اور جاری نہیں رہ سکتا۔

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

<span dir="ltr">WASM</span> کوڈ تیار کرنے کے لیے درکار آؤٹ پٹ کی قسم۔

**`lib.rs`**

یہ اصل Rust کوڈ ہے۔

```rust
use wasm_bindgen::prelude::*;
```

Rust سے <span dir="ltr">WASM</span> پیکیج بنانے کی تعریفیں۔ ان کی دستاویزات [یہاں](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) موجود ہیں۔

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

Rust عام طور پر اقدار کے لیے بائٹ [ایریز (arrays)](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) استعمال کرتا ہے۔ لیکن JavaScript میں، ہم عام طور پر ہیکساڈیسیمل سٹرنگز استعمال کرتے ہیں۔ [`hex` لائبریری](https://docs.rs/hex/latest/hex/) ہمارے لیے ایک نمائندگی سے دوسری میں ترجمہ کرتی ہے۔

```rust
#[wasm_bindgen]
```

JavaScript سے اس فنکشن کو کال کرنے کے قابل ہونے کے لیے <span dir="ltr">WASM</span> بائنڈنگز بنائیں۔

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

متعدد فیلڈز کے ساتھ کسی آبجیکٹ کو واپس کرنے کا سب سے آسان طریقہ <span dir="ltr">JSON</span> سٹرنگ واپس کرنا ہے۔

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) تین فیلڈز واپس کرتا ہے:

- میٹا-پتہ (*<span dir="ltr">K<sub>pub</sub></span>* اور *<span dir="ltr">V<sub>pub</sub></span>*)
- دیکھنے کی نجی کلید (*<span dir="ltr">V<sub>priv</sub></span>*)
- خرچ کرنے کی نجی کلید (*<span dir="ltr">K<sub>priv</sub></span>*)

[ٹیوپل (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) سنٹیکس ہمیں ان اقدار کو دوبارہ الگ کرنے دیتا ہے۔

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

<span dir="ltr">JSON</span>-انکوڈ شدہ سٹرنگ بنانے کے لیے [`format!`](https://doc.rust-lang.org/std/fmt/index.html) میکرو استعمال کریں۔ ایریز کو ہیکس سٹرنگز میں تبدیل کرنے کے لیے [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) استعمال کریں۔

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

یہ فنکشن ایک ہیکس سٹرنگ (جو JavaScript کی طرف سے فراہم کی گئی ہے) کو بائٹ ایرے میں تبدیل کرتا ہے۔ ہم اسے JavaScript کوڈ کی طرف سے فراہم کردہ اقدار کو پارس کرنے کے لیے استعمال کرتے ہیں۔ یہ فنکشن اس وجہ سے پیچیدہ ہے کہ Rust ایریز اور ویکٹرز کو کیسے ہینڈل کرتا ہے۔

`<const N: usize>` ایکسپریشن کو [جینرک (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html) کہا جاتا ہے۔ `N` ایک پیرامیٹر ہے جو واپس کی گئی ایرے کی لمبائی کو کنٹرول کرتا ہے۔ فنکشن کو دراصل `str_to_array::<n>` کہا جاتا ہے، جہاں `n` ایرے کی لمبائی ہے۔

واپسی کی قدر `Option<[u8; N]>` ہے، جس کا مطلب ہے کہ واپس کی گئی ایرے [اختیاری (optional)](https://doc.rust-lang.org/std/option/) ہے۔ یہ Rust میں ان فنکشنز کے لیے ایک عام پیٹرن ہے جو ناکام ہو سکتے ہیں۔

مثال کے طور پر، اگر ہم `str_to_array::10("bad060a7")` کو کال کرتے ہیں، تو فنکشن کو دس اقدار پر مشتمل ایرے واپس کرنی چاہیے، لیکن ان پٹ صرف چار بائٹس کا ہے۔ فنکشن کو ناکام ہونے کی ضرورت ہے، اور یہ `None` واپس کر کے ایسا کرتا ہے۔ `str_to_array::4("bad060a7")` کے لیے واپسی کی قدر `Some<[0xba, 0xd0, 0x60, 0xa7]>` ہوگی۔

```rust
    // decode Result<Vec<u8>, _> واپس کرتا ہے
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) فنکشن ایک `Result<Vec<u8>, FromHexError>` واپس کرتا ہے۔ [`Result`](https://doc.rust-lang.org/std/result/) قسم میں یا تو ایک کامیاب نتیجہ (`Ok(value)`) یا ایک ایرر (`Err(error)`) شامل ہو سکتا ہے۔

`.ok()` طریقہ `Result` کو ایک `Option` میں بدل دیتا ہے، جس کی قدر یا تو کامیاب ہونے پر `Ok()` قدر ہوتی ہے یا بصورت دیگر `None` ہوتی ہے۔ آخر میں، [سوالیہ نشان آپریٹر](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) موجودہ فنکشنز کو منسوخ کر دیتا ہے اور اگر `Option` خالی ہو تو `None` واپس کرتا ہے۔ بصورت دیگر، یہ قدر کو ان ریپ (unwrap) کرتا ہے اور اسے واپس کرتا ہے (اس صورت میں، `vec` کو ایک قدر تفویض کرنے کے لیے)۔

یہ ایررز کو ہینڈل کرنے کا ایک عجیب و غریب پیچیدہ طریقہ لگتا ہے، لیکن `Result` اور `Option` اس بات کو یقینی بناتے ہیں کہ تمام ایررز کو کسی نہ کسی طرح ہینڈل کیا جائے۔

```rust
    if vec.len() != N { return None; }
```

اگر بائٹس کی تعداد غلط ہے، تو یہ ایک ناکامی ہے، اور ہم `None` واپس کرتے ہیں۔

```rust
    // try_into vec کو استعمال کرتا ہے اور [u8; N] بنانے کی کوشش کرتا ہے
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust میں ایریز کی دو اقسام ہیں۔ [ایریز](https://doc.rust-lang.org/std/primitive.array.html) کا سائز مقرر ہوتا ہے۔ [ویکٹرز](https://doc.rust-lang.org/std/vec/index.html) بڑھ اور سکڑ سکتے ہیں۔ `hex::decode` ایک ویکٹر واپس کرتا ہے، لیکن `eth_stealth_addresses` لائبریری ایریز وصول کرنا چاہتی ہے۔ [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) ایک قدر کو دوسری قسم میں تبدیل کرتا ہے، مثال کے طور پر، ایک ویکٹر کو ایرے میں۔

```rust
    Some(array)
}
```

Rust میں آپ کو کسی فنکشن کے آخر میں قدر واپس کرتے وقت [`return`](https://doc.rust-lang.org/std/keyword.return.html) کلیدی لفظ استعمال کرنے کی ضرورت نہیں ہوتی۔

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

یہ فنکشن ایک عوامی میٹا-پتہ وصول کرتا ہے، جس میں *<span dir="ltr">V<sub>pub</sub></span>* اور *<span dir="ltr">K<sub>pub</sub></span>* دونوں شامل ہوتے ہیں۔ یہ خفیہ پتہ، شائع کرنے کے لیے عوامی کلید (*<span dir="ltr">R<sub>pub</sub></span>*)، اور ایک بائٹ کی اسکین قدر واپس کرتا ہے جو اس بات کی شناخت کو تیز کرتی ہے کہ کون سے شائع شدہ پتے ایلس کے ہو سکتے ہیں۔

اسکین قدر مشترکہ راز (*<span dir="ltr">S = GR<sub>priv</sub>V<sub>priv</sub></span>*) کا حصہ ہے۔ یہ قدر ایلس کو دستیاب ہے، اور اسے چیک کرنا اس بات کو چیک کرنے سے کہیں زیادہ تیز ہے کہ آیا *<span dir="ltr">f(K<sub>pub</sub>+G\*hash(S))</span>* شائع شدہ پتے کے برابر ہے یا نہیں۔

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

<span dir="ltr">JSON</span>-انکوڈ شدہ آؤٹ پٹ سٹرنگ تیار کریں۔

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

یہ فنکشن پتے سے رقم نکالنے کے لیے نجی کلید (*<span dir="ltr">R<sub>priv</sub></span>*) کا حساب لگانے کے لیے لائبریری کا [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) استعمال کرتا ہے۔ اس حساب کے لیے ان اقدار کی ضرورت ہوتی ہے:

- پتہ (*<span dir="ltr">Address=f(P<sub>pub</sub>)</span>*)
- بِل کی طرف سے تیار کردہ عوامی کلید (*<span dir="ltr">R<sub>pub</sub></span>*)
- دیکھنے کی نجی کلید (*<span dir="ltr">V<sub>priv</sub></span>*)
- خرچ کرنے کی نجی کلید (*<span dir="ltr">K<sub>priv</sub></span>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) یہ بتاتا ہے کہ جب <span dir="ltr">WASM</span> کوڈ شروع کیا جاتا ہے تو فنکشن کو عمل میں لایا جاتا ہے۔

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

یہ کوڈ بتاتا ہے کہ گھبراہٹ (panic) کا آؤٹ پٹ JavaScript کنسول کو بھیجا جائے۔ اسے عملی شکل میں دیکھنے کے لیے، ایپلیکیشن استعمال کریں اور بِل کو ایک غلط میٹا-پتہ دیں (صرف ایک ہیکساڈیسیمل ہندسہ تبدیل کریں)۔ آپ کو JavaScript کنسول میں یہ ایرر نظر آئے گا:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

اس کے بعد ایک اسٹیک ٹریس (stack trace) ہوگا۔ پھر بِل کو درست میٹا-پتہ دیں، اور ایلس کو یا تو ایک غلط پتہ یا ایک غلط عوامی کلید دیں۔ آپ کو یہ ایرر نظر آئے گا:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

ایک بار پھر، اس کے بعد ایک اسٹیک ٹریس ہوگا۔

#### یوزر انٹرفیس {#ui}

یوزر انٹرفیس [React](https://react.dev/) کا استعمال کرتے ہوئے لکھا گیا ہے اور [Vite](https://vite.dev/) کے ذریعے پیش کیا گیا ہے۔ آپ [اس ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) کا استعمال کرتے ہوئے ان کے بارے میں جان سکتے ہیں۔ یہاں [Wagmi](https://wagmi.sh/) کی کوئی ضرورت نہیں ہے کیونکہ ہم براہ راست کسی بلاک چین یا والیٹ کے ساتھ تعامل نہیں کرتے ہیں۔

یوزر انٹرفیس کا واحد غیر واضح حصہ <span dir="ltr">WASM</span> کنیکٹیویٹی ہے۔ یہ اس طرح کام کرتا ہے۔

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

یہ فائل ایپلیکیشن کا مرکزی جزو ہے۔ یہ ایک کنٹینر ہے جس میں دو اجزاء شامل ہیں: `Alice` اور `Bill`، جو ان صارفین کے لیے یوزر انٹرفیس ہیں۔ <span dir="ltr">WASM</span> کے لیے متعلقہ حصہ ابتدائیہ (initialization) کوڈ ہے۔

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

جب ہم [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) استعمال کرتے ہیں، تو یہ دو فائلیں بناتا ہے جو ہم یہاں استعمال کرتے ہیں: ایک wasm فائل جس میں اصل کوڈ ہوتا ہے (یہاں، `src/rust-wasm/pkg/rust_wasm_bg.wasm`) اور ایک JavaScript فائل جس میں اسے استعمال کرنے کی تعریفیں ہوتی ہیں (یہاں، `src/rust_wasm/pkg/rust_wasm.js`)۔ اس JavaScript فائل کا ڈیفالٹ ایکسپورٹ وہ کوڈ ہے جسے <span dir="ltr">WASM</span> شروع کرنے کے لیے چلانے کی ضرورت ہوتی ہے۔

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

[`useEffect` ہک](https://react.dev/reference/react/useEffect) آپ کو ایک ایسا فنکشن بتانے دیتا ہے جو حالت (state) کے متغیرات تبدیل ہونے پر عمل میں لایا جاتا ہے۔ یہاں، حالت کے متغیرات کی فہرست خالی ہے (`[]`)، اس لیے یہ فنکشن صفحہ لوڈ ہونے پر صرف ایک بار عمل میں لایا جاتا ہے۔

ایفیکٹ فنکشن کو فوری طور پر واپس آنا ہوتا ہے۔ غیر ہم وقتی (asynchronous) کوڈ استعمال کرنے کے لیے، جیسے کہ <span dir="ltr">WASM</span> کا `init` (جسے `.wasm` فائل لوڈ کرنی ہوتی ہے اور اس لیے وقت لگتا ہے) ہم ایک اندرونی [`async`](https://en.wikipedia.org/wiki/Async/await) فنکشن کی تعریف کرتے ہیں اور اسے `await` کے بغیر چلاتے ہیں۔

**`Bill.jsx`**

یہ بِل کے لیے یوزر انٹرفیس ہے۔ اس میں ایک ہی عمل ہے، ایلس کی طرف سے فراہم کردہ خفیہ میٹا-پتے کی بنیاد پر ایک پتہ بنانا۔

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

ڈیفالٹ ایکسپورٹ کے علاوہ، `wasm-pack` کے ذریعے تیار کردہ JavaScript کوڈ <span dir="ltr">WASM</span> کوڈ میں موجود ہر فنکشن کے لیے ایک فنکشن ایکسپورٹ کرتا ہے۔

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

<span dir="ltr">WASM</span> فنکشنز کو کال کرنے کے لیے، ہم صرف `wasm-pack` کے ذریعے بنائی گئی JavaScript فائل کے ذریعے ایکسپورٹ کردہ فنکشن کو کال کرتے ہیں۔

**`Alice.jsx`**

`Alice.jsx` میں موجود کوڈ اسی طرح کا ہے، سوائے اس کے کہ ایلس کے دو اعمال ہیں:

- ایک میٹا-پتہ بنانا
- بِل کے شائع کردہ پتے کے لیے نجی کلید حاصل کرنا

## نتیجہ {#conclusion}

خفیہ پتے ہر مرض کی دوا نہیں ہیں؛ انہیں [درست طریقے سے استعمال](#go-wrong) کرنا پڑتا ہے۔ لیکن جب انہیں درست طریقے سے استعمال کیا جائے، تو وہ ایک عوامی بلاک چین پر رازداری کو فعال کر سکتے ہیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔