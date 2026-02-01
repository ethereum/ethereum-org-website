---
title: "خفیہ پتوں کا استعمال"
description: "خفیہ پتے صارفین کو گمنام طور پر اثاثوں کی منتقلی کی اجازت دیتے ہیں۔ اس مضمون کو پڑھنے کے بعد، آپ اس قابل ہو جائیں گے: یہ بتانے کے کہ خفیہ پتے کیا ہیں اور وہ کیسے کام کرتے ہیں، خفیہ پتوں کو اس طرح استعمال کرنے کا طریقہ سمجھنے کے جو گمنامی کو برقرار رکھتا ہے، اور ایک ویب پر مبنی ایپلیکیشن لکھنے کے جو خفیہ پتوں کا استعمال کرتی ہے۔"
author: اوری پومیرانٹز
tags: [ "خفیہ پتہ", "رازداری", "کریپٹوگرافی", "rust", "wasm" ]
skill: intermediate
published: 2025-11-30
lang: ur-in
sidebarDepth: 3
---

آپ بل ہیں۔ ان وجوہات کی بنا پر جن میں ہم نہیں جائیں گے، آپ "دنیا کی ملکہ کے لیے ایلس" مہم کو عطیہ دینا چاہتے ہیں اور ایلس کو یہ معلوم کرانا چاہتے ہیں کہ آپ نے عطیہ دیا ہے تاکہ اگر وہ جیت جائے تو وہ آپ کو انعام دے۔ بدقسمتی سے، اس کی جیت کی ضمانت نہیں ہے۔ ایک مسابقتی مہم ہے، "کیرول نظام شمسی کی مہارانی کے لیے"۔ اگر کیرول جیت جاتی ہے، اور اسے پتہ چل جاتا ہے کہ آپ نے ایلس کو عطیہ دیا ہے، تو آپ مشکل میں پڑ جائیں گے۔ لہذا آپ صرف اپنے اکاؤنٹ سے ایلس کے اکاؤنٹ میں 200 ETH منتقل نہیں کر سکتے۔

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) کے پاس اس کا حل ہے۔ یہ ERC گمنام منتقلی کے لیے [خفیہ پتوں](https://nerolation.github.io/stealth-utils) کا استعمال کرنے کا طریقہ بتاتا ہے۔

**انتباہ**: خفیہ پتوں کے پیچھے کی کریپٹوگرافی، جہاں تک ہم جانتے ہیں، درست ہے۔ تاہم، ممکنہ سائیڈ چینل حملے ہو سکتے ہیں۔ [نیچے](#go-wrong)، آپ دیکھیں گے کہ آپ اس خطرے کو کم کرنے کے لیے کیا کر سکتے ہیں۔

## خفیہ پتے کیسے کام کرتے ہیں {#how}

یہ مضمون دو طریقوں سے خفیہ پتوں کی وضاحت کرنے کی کوشش کرے گا۔ پہلا یہ ہے کہ [ان کا استعمال کیسے کریں](#how-use)۔ یہ حصہ مضمون کے باقی حصے کو سمجھنے کے لیے کافی ہے۔ پھر، [اس کے پیچھے ریاضی کی وضاحت](#how-math) ہے۔ اگر آپ کریپٹوگرافی میں دلچسپی رکھتے ہیں، تو یہ حصہ بھی پڑھیں۔

### سادہ ورژن (خفیہ پتوں کا استعمال کیسے کریں) {#how-use}

ایلس دو پرائیویٹ کیز بناتی ہے اور متعلقہ پبلک کیز شائع کرتی ہے (جنہیں ایک ہی ڈبل لینتھ میٹا ایڈریس میں ملایا جا سکتا ہے)۔ بل بھی ایک پرائیویٹ کی بناتا ہے اور متعلقہ پبلک کی شائع کرتا ہے۔

ایک پارٹی کی پبلک کی اور دوسری کی پرائیویٹ کی کا استعمال کرتے ہوئے، آپ ایک مشترکہ راز حاصل کر سکتے ہیں جو صرف ایلس اور بل کو معلوم ہے (اسے صرف پبلک کیز سے حاصل نہیں کیا جا سکتا)۔ اس مشترکہ راز کا استعمال کرتے ہوئے، بل خفیہ پتہ حاصل کرتا ہے اور اس پر اثاثے بھیج سکتا ہے۔

ایلس کو بھی مشترکہ راز سے پتہ ملتا ہے، لیکن چونکہ وہ اپنی شائع کردہ پبلک کیز کی پرائیویٹ کیز جانتی ہے، اس لیے وہ وہ پرائیویٹ کی بھی حاصل کر سکتی ہے جو اسے اس پتے سے رقم نکالنے دیتی ہے۔

### ریاضی (خفیہ پتے اس طرح کیوں کام کرتے ہیں) {#how-math}

معیاری خفیہ پتے کم کی بٹس کے ساتھ بہتر کارکردگی حاصل کرنے کے لیے [الیپٹک کرو کریپٹوگرافی (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) کا استعمال کرتے ہیں، جبکہ سیکیورٹی کی سطح وہی رہتی ہے۔ لیکن زیادہ تر ہم اسے نظر انداز کر سکتے ہیں اور یہ دکھاوا کر سکتے ہیں کہ ہم باقاعدہ ریاضی کا استعمال کر رہے ہیں۔

ایک نمبر ہے جسے ہر کوئی جانتا ہے، _G_۔ آپ _G_ سے ضرب دے سکتے ہیں۔ لیکن ECC کی نوعیت کی وجہ سے، _G_ سے تقسیم کرنا عملی طور پر ناممکن ہے۔ Ethereum میں پبلک کی کریپٹوگرافی عام طور پر جس طرح کام کرتی ہے وہ یہ ہے کہ آپ ایک پرائیویٹ کی، _P<sub>priv</sub>_، کا استعمال لین دین پر دستخط کرنے کے لیے کر سکتے ہیں جن کی تصدیق پھر ایک پبلک کی، _P<sub>pub</sub> = GP<sub>priv</sub>_ سے ہوتی ہے۔

ایلس دو پرائیویٹ کیز بناتی ہے، _K<sub>priv</sub>_ اور _V<sub>priv</sub>_۔ _K<sub>priv</sub>_ کا استعمال خفیہ پتے سے رقم خرچ کرنے کے لیے کیا جائے گا، اور _V<sub>priv</sub>_ کا استعمال ایلس سے تعلق رکھنے والے پتوں کو دیکھنے کے لیے کیا جائے گا۔ ایلس پھر پبلک کیز شائع کرتی ہے: _K<sub>pub</sub> = GK<sub>priv</sub>_ اور _V<sub>pub</sub> = GV<sub>priv</sub>_

بل ایک تیسری پرائیویٹ کی، _R<sub>priv</sub>_ بناتا ہے، اور _R<sub>pub</sub> = GR<sub>priv</sub>_ کو ایک مرکزی رجسٹری میں شائع کرتا ہے (بل اسے ایلس کو بھی بھیج سکتا تھا، لیکن ہم فرض کرتے ہیں کہ کیرول سن رہی ہے)۔

بل _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ کا حساب لگاتا ہے، جس کی وہ توقع کرتا ہے کہ ایلس بھی جانتی ہے (نیچے وضاحت کی گئی ہے)۔ اس قدر کو _S_، یعنی مشترکہ راز کہا جاتا ہے۔ یہ بل کو ایک پبلک کی دیتا ہے، _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_۔ اس پبلک کی سے، وہ ایک پتہ کا حساب لگا سکتا ہے اور جو بھی وسائل وہ چاہے اسے بھیج سکتا ہے۔ مستقبل میں، اگر ایلس جیت جاتی ہے، تو بل اسے _R<sub>priv</sub>_ بتا سکتا ہے تاکہ یہ ثابت ہو سکے کہ وسائل اسی کی طرف سے آئے ہیں۔

ایلس _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ کا حساب لگاتی ہے۔ یہ اسے وہی مشترکہ راز، _S_ دیتا ہے۔ چونکہ وہ پرائیویٹ کی، _K<sub>priv</sub>_ جانتی ہے، وہ _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_ کا حساب لگا سکتی ہے۔ یہ کی اسے اس پتے میں موجود اثاثوں تک رسائی دیتی ہے جو _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_ سے حاصل ہوتا ہے۔

ہمارے پاس ایک علیحدہ ویونگ کی ہے تاکہ ایلس ڈیو کی ورلڈ ڈومینیشن کمپین سروسز کو سب کنٹریکٹ دے سکے۔ ایلس ڈیو کو عوامی پتے بتانے اور جب مزید رقم دستیاب ہو تو اسے مطلع کرنے کے لیے تیار ہے، لیکن وہ نہیں چاہتی کہ وہ اس کی مہم کی رقم خرچ کرے۔

چونکہ دیکھنے اور خرچ کرنے کے لیے علیحدہ کیز کا استعمال ہوتا ہے، ایلس ڈیو کو _V<sub>priv</sub>_ دے سکتی ہے۔ پھر ڈیو _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ کا حساب لگا سکتا ہے اور اس طرح پبلک کیز (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_) حاصل کر سکتا ہے۔ لیکن _K<sub>priv</sub>_ کے بغیر ڈیو پرائیویٹ کی حاصل نہیں کر سکتا۔

خلاصہ یہ کہ، یہ وہ اقدار ہیں جو مختلف شرکاء کو معلوم ہیں۔

| ایلس                                                                      | شائع شدہ          | بل                                                                        | ڈیو                                                                         |                                             |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                             |
| _K<sub>priv</sub>_                                                        | ۔                 | ۔                                                                         | ۔                                                                           |                                             |
| _V<sub>priv</sub>_                                                        | ۔                 | ۔                                                                         | _V<sub>priv</sub>_                                                          |                                             |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                             |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                             |
| ۔                                                                         | ۔                 | _R<sub>priv</sub>_                                                        | ۔                                                                           |                                             |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                             |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | ۔                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                             |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | ۔                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                             |
| _پتہ=f(P<sub>pub</sub>)_                               | ۔                 | _پتہ=f(P<sub>pub</sub>)_                               | _پتہ=f(P<sub>pub</sub>)_                                 | _پتہ=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | ۔                 | ۔                                                                         | ۔                                                                           |                                             |

## جب خفیہ پتے غلط ہو جاتے ہیں {#go-wrong}

_بلاک چین پر کوئی راز نہیں ہوتے_۔ جبکہ خفیہ پتے آپ کو رازداری فراہم کر سکتے ہیں، لیکن وہ رازداری ٹریفک کے تجزیے کے لیے حساس ہے۔ ایک معمولی مثال کے طور پر، تصور کریں کہ بل ایک پتے کو فنڈ کرتا ہے اور فوری طور پر _R<sub>pub</sub>_ قدر شائع کرنے کے لیے ایک لین دین بھیجتا ہے۔ ایلس کی _V<sub>priv</sub>_ کے بغیر، ہم یقینی طور پر نہیں کہہ سکتے کہ یہ ایک خفیہ پتہ ہے، لیکن شرط لگانے کا یہی طریقہ ہے۔ پھر، ہم ایک اور لین دین دیکھتے ہیں جو اس پتے سے تمام ETH کو ایلس کے مہم کے فنڈ کے پتے پر منتقل کرتا ہے۔ ہم شاید اسے ثابت نہ کر سکیں، لیکن امکان ہے کہ بل نے ابھی ایلس کی مہم کو عطیہ دیا ہے۔ کیرول یقینی طور پر ایسا ہی سوچے گی۔

بل کے لیے _R<sub>pub</sub>_ کی اشاعت کو خفیہ پتے کی فنڈنگ سے الگ کرنا آسان ہے (انہیں مختلف اوقات میں، مختلف پتوں سے کریں)۔ تاہم، یہ ناکافی ہے۔ کیرول جس پیٹرن کو تلاش کرتی ہے وہ یہ ہے کہ بل ایک پتے کو فنڈ کرتا ہے، اور پھر ایلس کا مہم فنڈ اس سے رقم نکالتا ہے۔

ایک حل یہ ہے کہ ایلس کی مہم براہ راست رقم نہ نکالے، بلکہ اسے کسی تیسرے فریق کو ادائیگی کے لیے استعمال کرے۔ اگر ایلس کی مہم ڈیو کی ورلڈ ڈومینیشن کمپین سروسز کو 10 ETH بھیجتی ہے، تو کیرول کو صرف یہ معلوم ہوتا ہے کہ بل نے ڈیو کے صارفین میں سے کسی ایک کو عطیہ دیا ہے۔ اگر ڈیو کے پاس کافی گاہک ہیں، تو کیرول یہ نہیں جان پائے گی کہ بل نے ایلس کو عطیہ دیا جو اس سے مقابلہ کرتی ہے، یا ایڈم، البرٹ، یا ابیگیل کو جن کی کیرول کو پرواہ نہیں ہے۔ ایلس ادائیگی کے ساتھ ایک ہیش شدہ قدر شامل کر سکتی ہے، اور پھر ڈیو کو پری امیج فراہم کر سکتی ہے، تاکہ یہ ثابت ہو سکے کہ یہ اس کا عطیہ تھا۔ متبادل کے طور پر، جیسا کہ اوپر بتایا گیا ہے، اگر ایلس ڈیو کو اپنی _V<sub>priv</sub>_ دیتی ہے، تو وہ پہلے ہی جانتا ہے کہ ادائیگی کس کی طرف سے آئی ہے۔

اس حل کے ساتھ بنیادی مسئلہ یہ ہے کہ اس میں ایلس کو رازداری کا خیال رکھنے کی ضرورت ہوتی ہے جبکہ اس رازداری سے بل کو فائدہ ہوتا ہے۔ ایلس اپنی ساکھ برقرار رکھنا چاہ سکتی ہے تاکہ بل کا دوست باب بھی اسے عطیہ دے۔ لیکن یہ بھی ممکن ہے کہ اسے بل کو بے نقاب کرنے میں کوئی اعتراض نہ ہو، کیونکہ پھر اسے ڈر ہوگا کہ اگر کیرول جیت گئی تو کیا ہوگا۔ بل شاید ایلس کو اور بھی زیادہ مدد فراہم کرے۔

### متعدد خفیہ پرتوں کا استعمال {#multi-layer}

بل کی رازداری کو برقرار رکھنے کے لیے ایلس پر انحصار کرنے کے بجائے، بل خود یہ کر سکتا ہے۔ وہ فرضی لوگوں، باب اور بیلا کے لیے متعدد میٹا پتے بنا سکتا ہے۔ بل پھر باب کو ETH بھیجتا ہے، اور "باب" (جو دراصل بل ہے) اسے بیلا کو بھیجتا ہے۔ "بیلا" (جو بھی بل ہے) اسے ایلس کو بھیجتی ہے۔

کیرول اب بھی ٹریفک کا تجزیہ کر سکتی ہے اور بل-ٹو-باب-ٹو-بیلا-ٹو-ایلس پائپ لائن دیکھ سکتی ہے۔ تاہم، اگر "باب" اور "بیلا" بھی دیگر مقاصد کے لیے ETH کا استعمال کرتے ہیں، تو یہ ظاہر نہیں ہوگا کہ بل نے ایلس کو کچھ بھی منتقل کیا ہے، چاہے ایلس فوری طور پر خفیہ پتے سے اپنے معلوم مہم کے پتے پر رقم نکال لے۔

## خفیہ پتے والی ایپلیکیشن لکھنا {#write-app}

یہ مضمون GitHub پر دستیاب ایک [خفیہ پتے والی ایپلیکیشن](https://github.com/qbzzt/251022-stealth-addresses.git) کی وضاحت کرتا ہے۔

### ٹولز {#tools}

ایک [ٹائپ اسکرپٹ خفیہ پتہ لائبریری](https://github.com/ScopeLift/stealth-address-sdk) ہے جسے ہم استعمال کر سکتے ہیں۔ تاہم، کریپٹوگرافک آپریشنز CPU-انٹینسیو ہو سکتے ہیں۔ میں انہیں ایک کمپائلڈ زبان، جیسے [Rust](https://rust-lang.org/) میں نافذ کرنے کو ترجیح دیتا ہوں، اور براؤزر میں کوڈ چلانے کے لیے [WASM](https://webassembly.org/) کا استعمال کرتا ہوں۔

ہم [Vite](https://vite.dev/) اور [React](https://react.dev/) کا استعمال کرنے جا رہے ہیں۔ یہ انڈسٹری کے معیاری ٹولز ہیں؛ اگر آپ ان سے واقف نہیں ہیں، تو آپ [یہ ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) استعمال کر سکتے ہیں۔ Vite استعمال کرنے کے لیے، ہمیں Node کی ضرورت ہے۔

### خفیہ پتوں کو عمل میں دیکھیں {#in-action}

1. ضروری ٹولز انسٹال کریں: [Rust](https://rust-lang.org/tools/install/) اور [Node](https://nodejs.org/en/download)۔

2. GitHub ریپوزٹری کو کلون کریں۔

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. پیشگی شرائط انسٹال کریں اور Rust کوڈ کو کمپائل کریں۔

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

5. [ایپلیکیشن](http://localhost:5173/) پر براؤز کریں۔ اس ایپلیکیشن پیج میں دو فریم ہیں: ایک ایلس کے یوزر انٹرفیس کے لیے اور دوسرا بل کے لیے۔ دونوں فریم آپس میں بات چیت نہیں کرتے؛ وہ صرف سہولت کے لیے ایک ہی صفحے پر ہیں۔

6. ایلس کے طور پر، **ایک خفیہ میٹا ایڈریس بنائیں** پر کلک کریں۔ یہ نیا خفیہ پتہ اور متعلقہ پرائیویٹ کیز دکھائے گا۔ خفیہ میٹا ایڈریس کو کلپ بورڈ پر کاپی کریں۔

7. بل کے طور پر، نیا خفیہ میٹا ایڈریس پیسٹ کریں اور **ایک پتہ بنائیں** پر کلک کریں۔ یہ آپ کو ایلس کے لیے فنڈ کرنے کا پتہ دیتا ہے۔

8. پتہ اور بل کی پبلک کی کاپی کریں اور انہیں ایلس کے یوزر انٹرفیس کے "بل کے ذریعے بنائے گئے پتے کے لیے پرائیویٹ کی" والے حصے میں پیسٹ کریں۔ ایک بار جب وہ فیلڈز بھر جائیں گے، تو آپ اس پتے پر اثاثوں تک رسائی کے لیے پرائیویٹ کی دیکھیں گے۔

9. آپ [ایک آن لائن کیلکولیٹر](https://iancoleman.net/ethereum-private-key-to-address/) کا استعمال کر سکتے ہیں تاکہ یہ یقینی بنایا جا سکے کہ پرائیویٹ کی پتے سے مطابقت رکھتی ہے۔

### پروگرام کیسے کام کرتا ہے {#how-the-program-works}

#### WASM جزو {#wasm}

وہ سورس کوڈ جو WASM میں کمپائل ہوتا ہے [Rust](https://rust-lang.org/) میں لکھا گیا ہے۔ آپ اسے [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) میں دیکھ سکتے ہیں۔ یہ کوڈ بنیادی طور پر جاوا اسکرپٹ کوڈ اور [`eth-stealth-addresses` لائبریری](https://github.com/kassandraoftroy/eth-stealth-addresses) کے درمیان ایک انٹرفیس ہے۔

**`Cargo.toml`**

Rust میں [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) جاوا اسکرپٹ میں [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) کے مترادف ہے۔ اس میں پیکیج کی معلومات، انحصاری اعلانات وغیرہ شامل ہیں۔

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) پیکیج کو بے ترتیب اقدار پیدا کرنے کی ضرورت ہے۔ یہ خالص الگورتھمک طریقوں سے نہیں کیا جا سکتا؛ اسے اینٹروپی کے منبع کے طور پر ایک طبعی عمل تک رسائی کی ضرورت ہوتی ہے۔ یہ تعریف بتاتی ہے کہ ہم اس اینٹروپی کو اس براؤزر سے پوچھ کر حاصل کریں گے جس میں ہم چل رہے ہیں۔

```toml
console_error_panic_hook = "0.1.7"
```

[یہ لائبریری](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) ہمیں مزید معنی خیز غلطی کے پیغامات دیتی ہے جب WASM کوڈ پینک کرتا ہے اور جاری نہیں رہ سکتا۔

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM کوڈ تیار کرنے کے لیے درکار آؤٹ پٹ قسم۔

**`lib.rs`**

یہ اصل Rust کوڈ ہے۔

```rust
use wasm_bindgen::prelude::*;
```

Rust سے WASM پیکیج بنانے کی تعریفیں۔ وہ [یہاں](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) دستاویزی ہیں۔

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

Rust عام طور پر اقدار کے لیے بائٹ [ایریز](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) کا استعمال کرتا ہے۔ لیکن جاوا اسکرپٹ میں، ہم عام طور پر ہیکسا ڈیسیمل اسٹرنگز کا استعمال کرتے ہیں۔ [`ہیکس` لائبریری](https://docs.rs/hex/latest/hex/) ہمارے لیے ایک نمائندگی سے دوسری میں ترجمہ کرتی ہے۔

```rust
#[wasm_bindgen]
```

جاوا اسکرپٹ سے اس فنکشن کو کال کرنے کے قابل ہونے کے لیے WASM بائنڈنگز بنائیں۔

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

متعدد فیلڈز والے آبجیکٹ کو واپس کرنے کا سب سے آسان طریقہ JSON اسٹرنگ واپس کرنا ہے۔

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) تین فیلڈز واپس کرتا ہے:

- میٹا ایڈریس (_K<sub>pub</sub>_ اور _V<sub>pub</sub>_)
- ویونگ پرائیویٹ کی (_V<sub>priv</sub>_)
- اسپینڈنگ پرائیویٹ کی (_K<sub>priv</sub>_)

[ٹیوپل](https://doc.rust-lang.org/std/primitive.tuple.html) سنٹیکس ہمیں ان اقدار کو دوبارہ الگ کرنے دیتا ہے۔

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

JSON-انکوڈڈ اسٹرنگ بنانے کے لیے [`format!`](https://doc.rust-lang.org/std/fmt/index.html) میکرو کا استعمال کریں۔ ایریز کو ہیکس اسٹرنگز میں تبدیل کرنے کے لیے [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) کا استعمال کریں۔

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

یہ فنکشن ایک ہیکس اسٹرنگ (جو جاوا اسکرپٹ کے ذریعے فراہم کی گئی ہے) کو بائٹ ایرے میں بدل دیتا ہے۔ ہم اسے جاوا اسکرپٹ کوڈ کے ذریعے فراہم کردہ اقدار کو پارس کرنے کے لیے استعمال کرتے ہیں۔ یہ فنکشن اس لیے پیچیدہ ہے کہ Rust ایریز اور ویکٹرز کو کیسے ہینڈل کرتا ہے۔

`<const N: usize>` ایکسپریشن کو [جینرک](https://doc.rust-lang.org/book/ch10-01-syntax.html) کہا جاتا ہے۔ `N` ایک پیرامیٹر ہے جو واپس آنے والی ایرے کی لمبائی کو کنٹرول کرتا ہے۔ فنکشن کو دراصل `str_to_array::<n>` کہا جاتا ہے، جہاں `n` ایرے کی لمبائی ہے۔

واپسی کی قدر `Option<[u8; N]>` ہے، جس کا مطلب ہے کہ واپس آنے والی ایرے [اختیاری](https://doc.rust-lang.org/std/option/) ہے۔ یہ Rust میں ان فنکشنز کے لیے ایک عام پیٹرن ہے جو ناکام ہو سکتے ہیں۔

مثال کے طور پر، اگر ہم `str_to_array::10("bad060a7")` کو کال کرتے ہیں، تو فنکشن کو دس-ویلیو ایرے واپس کرنا چاہیے، لیکن ان پٹ صرف چار بائٹس ہے۔ فنکشن کو ناکام ہونے کی ضرورت ہے، اور یہ `None` واپس کرکے ایسا کرتا ہے۔ `str_to_array::4("bad060a7")` کے لیے واپسی کی قدر `Some<[0xba, 0xd0, 0x60, 0xa7]>` ہوگی۔

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) فنکشن `Result<Vec<u8>, FromHexError>` واپس کرتا ہے۔ [`Result`](https://doc.rust-lang.org/std/result/) قسم میں یا تو ایک کامیاب نتیجہ (`Ok(value)`) یا ایک خرابی (`Err(error)`) ہو سکتی ہے۔

.ok()`طریقہ`Result`کو ایک`Option`میں بدل دیتا ہے، جس کی قدر یا تو کامیاب ہونے پر`Ok()`کی قدر ہوتی ہے یا`None`اگر نہیں۔ آخر میں، [سوالیہ نشان آپریٹر](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) موجودہ فنکشنز کو ختم کر دیتا ہے اور اگر`Option`خالی ہو تو`None`واپس کرتا ہے۔ بصورت دیگر، یہ قدر کو ان ریپ کرتا ہے اور اسے واپس کرتا ہے (اس صورت میں،`vec\` کو ایک قدر تفویض کرنے کے لیے)۔

یہ غلطیوں کو سنبھالنے کا ایک عجیب و غریب طریقہ لگتا ہے، لیکن `Result` اور `Option` اس بات کو یقینی بناتے ہیں کہ تمام غلطیوں کو کسی نہ کسی طریقے سے سنبھالا جائے۔

```rust
    if vec.len() != N { return None; }
```

اگر بائٹس کی تعداد غلط ہے، تو یہ ایک ناکامی ہے، اور ہم `None` واپس کرتے ہیں۔

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust میں دو ایرے کی قسمیں ہیں۔ [ایریز](https://doc.rust-lang.org/std/primitive.array.html) کا ایک مقررہ سائز ہوتا ہے۔ [ویکٹرز](https://doc.rust-lang.org/std/vec/index.html) بڑھ اور سکڑ سکتے ہیں۔ `hex::decode` ایک ویکٹر واپس کرتا ہے، لیکن `eth_stealth_addresses` لائبریری ایریز وصول کرنا چاہتی ہے۔ [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) ایک قدر کو دوسری قسم میں تبدیل کرتا ہے، مثال کے طور پر، ایک ویکٹر کو ایک ایرے میں۔

```rust
    Some(array)
}
```

Rust کو فنکشن کے آخر میں قدر واپس کرتے وقت [`return`](https://doc.rust-lang.org/std/keyword.return.html) کلیدی لفظ استعمال کرنے کی ضرورت نہیں ہوتی۔

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

یہ فنکشن ایک پبلک میٹا ایڈریس وصول کرتا ہے، جس میں _V<sub>pub</sub>_ اور _K<sub>pub</sub>_ دونوں شامل ہیں۔ یہ خفیہ پتہ، شائع کرنے کے لیے پبلک کی (_R<sub>pub</sub>_)، اور ایک بائٹ کی اسکین ویلیو واپس کرتا ہے جو اس شناخت کو تیز کرتی ہے کہ کون سے شائع شدہ پتے ایلس سے تعلق رکھتے ہیں۔

اسکین ویلیو مشترکہ راز (_S = GR<sub>priv</sub>V<sub>priv</sub>_) کا حصہ ہے۔ یہ قدر ایلس کو دستیاب ہے، اور اسے چیک کرنا اس بات کی جانچ سے بہت تیز ہے کہ آیا _f(K<sub>pub</sub>+G\*hash(S))_ شائع شدہ پتے کے برابر ہے۔

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

ہم لائبریری کے [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) کا استعمال کرتے ہیں۔

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSON-انکوڈڈ آؤٹ پٹ اسٹرنگ تیار کریں۔

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

یہ فنکشن لائبریری کے [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) کا استعمال کرتا ہے تاکہ پتے (_R<sub>priv</sub>_) سے رقم نکالنے کے لیے پرائیویٹ کی کا حساب لگایا جا سکے۔ اس حساب کے لیے ان اقدار کی ضرورت ہے:

- پتہ (_Address=f(P<sub>pub</sub>)_)
- بل کے ذریعے بنائی گئی پبلک کی (_R<sub>pub</sub>_)
- ویو پرائیویٹ کی (_V<sub>priv</sub>_)
- اسپینڈ پرائیویٹ کی (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) بتاتا ہے کہ فنکشن اس وقت عمل میں لایا جاتا ہے جب WASM کوڈ شروع ہوتا ہے۔

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

یہ کوڈ بتاتا ہے کہ پینک آؤٹ پٹ کو جاوا اسکرپٹ کنسول پر بھیجا جائے۔ اسے عمل میں دیکھنے کے لیے، ایپلیکیشن کا استعمال کریں اور بل کو ایک غلط میٹا ایڈریس دیں (صرف ایک ہیکسا ڈیسیمل ہندسہ تبدیل کریں)۔ آپ کو جاوا اسکرپٹ کنسول میں یہ خرابی نظر آئے گی:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

اس کے بعد ایک اسٹیک ٹریس ہوتا ہے۔ پھر بل کو درست میٹا ایڈریس دیں، اور ایلس کو یا تو غلط پتہ یا غلط پبلک کی دیں۔ آپ کو یہ خرابی نظر آئے گی:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

دوبارہ، اس کے بعد ایک اسٹیک ٹریس ہوتا ہے۔

#### یوزر انٹرفیس {#ui}

یوزر انٹرفیس [React](https://react.dev/) کا استعمال کرتے ہوئے لکھا گیا ہے اور [Vite](https://vite.dev/) کے ذریعے پیش کیا جاتا ہے۔ آپ [اس ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) کا استعمال کرتے ہوئے ان کے بارے میں جان سکتے ہیں۔ یہاں [WAGMI](https://wagmi.sh/) کی کوئی ضرورت نہیں ہے کیونکہ ہم براہ راست بلاک چین یا والیٹ کے ساتھ تعامل نہیں کرتے ہیں۔

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

یہ فائل ایپلیکیشن کا مرکزی جزو ہے۔ یہ ایک کنٹینر ہے جس میں دو اجزاء شامل ہیں: `Alice` اور `Bill`، ان صارفین کے لیے یوزر انٹرفیس۔ WASM کے لیے متعلقہ حصہ انیشیلائزیشن کوڈ ہے۔

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

جب ہم [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) استعمال کرتے ہیں، تو یہ دو فائلیں بناتا ہے جنہیں ہم یہاں استعمال کرتے ہیں: اصل کوڈ کے ساتھ ایک wasm فائل (یہاں، `src/rust-wasm/pkg/rust_wasm_bg.wasm`) اور اسے استعمال کرنے کی تعریفوں کے ساتھ ایک جاوا اسکرپٹ فائل (یہاں، `src/rust_wasm/pkg/rust_wasm.js`)۔ اس جاوا اسکرپٹ فائل کا ڈیفالٹ ایکسپورٹ وہ کوڈ ہے جسے WASM شروع کرنے کے لیے چلانے کی ضرورت ہے۔

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
        console.error('Wasm لوڈ کرنے میں خرابی:', err)
        alert("Wasm خرابی: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect` ہک](https://react.dev/reference/react/useEffect) آپ کو ایک فنکشن کی وضاحت کرنے دیتا ہے جو اس وقت عمل میں لایا جاتا ہے جب اسٹیٹ متغیرات تبدیل ہوتے ہیں۔ یہاں، اسٹیٹ متغیرات کی فہرست خالی ہے (`[]`)، لہذا یہ فنکشن صرف ایک بار عمل میں لایا جاتا ہے جب صفحہ لوڈ ہوتا ہے۔

اثر فنکشن کو فوری طور پر واپس آنا ہوتا ہے۔ غیر مطابقت پذیر کوڈ، جیسے WASM `init` (جسے `.wasm` فائل لوڈ کرنا پڑتا ہے اور اس لیے وقت لگتا ہے) استعمال کرنے کے لیے ہم ایک اندرونی [`async`](https://en.wikipedia.org/wiki/Async/await) فنکشن کی وضاحت کرتے ہیں اور اسے `await` کے بغیر چلاتے ہیں۔

**`Bill.jsx`**

یہ بل کے لیے یوزر انٹرفیس ہے۔ اس کا ایک ہی عمل ہے، ایلس کے ذریعے فراہم کردہ خفیہ میٹا ایڈریس کی بنیاد پر ایک پتہ بنانا۔

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

ڈیفالٹ ایکسپورٹ کے علاوہ، `wasm-pack` کے ذریعے تیار کردہ جاوا اسکرپٹ کوڈ WASM کوڈ میں ہر فنکشن کے لیے ایک فنکشن ایکسپورٹ کرتا ہے۔

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM فنکشنز کو کال کرنے کے لیے، ہم صرف `wasm-pack` کے ذریعے بنائی گئی جاوا اسکرپٹ فائل کے ذریعے ایکسپورٹ کردہ فنکشن کو کال کرتے ہیں۔

**`Alice.jsx`**

`Alice.jsx` میں کوڈ یکساں ہے، سوائے اس کے کہ ایلس کے دو اعمال ہیں:

- ایک میٹا ایڈریس بنائیں
- بل کے ذریعے شائع کردہ پتے کے لیے پرائیویٹ کی حاصل کریں

## نتیجہ {#conclusion}

خفیہ پتے کوئی تریاق نہیں ہیں؛ انہیں [صحیح طریقے سے استعمال](#go-wrong) کرنا پڑتا ہے۔ لیکن جب صحیح طریقے سے استعمال کیا جائے تو، وہ ایک عوامی بلاک چین پر رازداری کو فعال کر سکتے ہیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔