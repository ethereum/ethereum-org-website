---
title: "نیٹ ورکس"
description: "ایتھیریم کے نیٹ ورکس کا جائزہ اور اپنی ایپلی کیشن کی جانچ کے لیے آزمائشی نیٹ ورک ایتھر (⁦ETH⁩) کہاں سے حاصل کریں۔"
lang: ur
---

[ایتھیریم](/) نیٹ ورکس جڑے ہوئے کمپیوٹرز کے گروپس ہیں جو ایتھیریم پروٹوکول کا استعمال کرتے ہوئے بات چیت کرتے ہیں۔ صرف ایک ایتھیریم مین نیٹ ہے، لیکن جانچ اور ترقی کے مقاصد کے لیے اسی پروٹوکول کے قواعد کے مطابق آزاد نیٹ ورکس بنائے جا سکتے ہیں۔ بہت سے آزاد "نیٹ ورکس" ہیں جو ایک دوسرے کے ساتھ بات چیت کیے بغیر پروٹوکول کی تعمیل کرتے ہیں۔ آپ اپنے سمارٹ کنٹریکٹس اور <span dir="ltr">Web3</span> ایپس کی جانچ کے لیے اپنے کمپیوٹر پر مقامی طور پر بھی ایک شروع کر سکتے ہیں۔

آپ کا ایتھیریم اکاؤنٹ مختلف نیٹ ورکس پر کام کرے گا، لیکن آپ کے اکاؤنٹ کا بیلنس اور ٹرانزیکشن کی تاریخ مرکزی ایتھیریم نیٹ ورک سے منتقل نہیں ہوگی۔ جانچ کے مقاصد کے لیے، یہ جاننا مفید ہے کہ کون سے نیٹ ورکس دستیاب ہیں اور تجربہ کرنے کے لیے آزمائشی نیٹ ورک <span dir="ltr">ETH</span> کیسے حاصل کیا جائے۔ عام طور پر، سیکیورٹی وجوہات کی بنا پر، مین نیٹ اکاؤنٹس کو آزمائشی نیٹ ورکس پر یا اس کے برعکس دوبارہ استعمال کرنے کی سفارش نہیں کی جاتی ہے۔

## پیشگی شرائط {#prerequisites}

مختلف نیٹ ورکس کے بارے میں پڑھنے سے پہلے آپ کو [ایتھیریم کی بنیادی باتوں](/developers/docs/intro-to-ethereum/) کو سمجھنا چاہیے، کیونکہ آزمائشی نیٹ ورکس آپ کو تجربہ کرنے کے لیے ایتھیریم کا ایک سستا اور محفوظ ورژن فراہم کریں گے۔

## عوامی نیٹ ورکس {#public-networks}

عوامی نیٹ ورکس دنیا میں انٹرنیٹ کنکشن رکھنے والے کسی بھی شخص کے لیے قابل رسائی ہیں۔ کوئی بھی عوامی بلاک چین پر ٹرانزیکشنز پڑھ یا بنا سکتا ہے اور عمل میں لائی جانے والی ٹرانزیکشنز کی توثیق کر سکتا ہے۔ ہم مرتبہ افراد کے درمیان اتفاق رائے ٹرانزیکشنز کی شمولیت اور نیٹ ورک کی حالت کا فیصلہ کرتا ہے۔

### ایتھیریم مین نیٹ {#ethereum-mainnet}

مین نیٹ بنیادی عوامی ایتھیریم پروڈکشن بلاک چین ہے، جہاں تقسیم شدہ لیجر پر اصل قیمت کی ٹرانزیکشنز ہوتی ہیں۔

جب لوگ اور ایکسچینجز <span dir="ltr">ETH</span> کی قیمتوں پر بات کرتے ہیں، تو وہ مین نیٹ <span dir="ltr">ETH</span> کے بارے میں بات کر رہے ہوتے ہیں۔

### ایتھیریم آزمائشی نیٹ ورکس {#ethereum-testnets}

مین نیٹ کے علاوہ، عوامی آزمائشی نیٹ ورکس بھی ہیں۔ یہ وہ نیٹ ورکس ہیں جو پروٹوکول ڈیولپرز یا سمارٹ کنٹریکٹ ڈیولپرز مین نیٹ پر تعیناتی سے پہلے پروڈکشن جیسے ماحول میں پروٹوکول اپ گریڈز اور ممکنہ سمارٹ کنٹریکٹس دونوں کی جانچ کرنے کے لیے استعمال کرتے ہیں۔ اسے پروڈکشن بمقابلہ اسٹیجنگ سرورز کے مترادف سمجھیں۔

آپ کو مین نیٹ پر تعینات کرنے سے پہلے کسی بھی کنٹریکٹ کوڈ کو آزمائشی نیٹ ورک پر جانچنا چاہیے۔ موجودہ سمارٹ کنٹریکٹس کے ساتھ مربوط ہونے والی غیر مرکزی ایپلی کیشنز (<span dir="ltr">dapps</span>) میں سے، زیادہ تر پروجیکٹس کی کاپیاں آزمائشی نیٹ ورکس پر تعینات ہوتی ہیں۔

زیادہ تر آزمائشی نیٹ ورکس ایک اجازت یافتہ ثبوتِ اختیار اتفاق رائے کا طریقہ کار استعمال کر کے شروع کیے گئے تھے۔ اس کا مطلب ہے کہ ٹرانزیکشنز کی توثیق کرنے اور نئے بلاکس بنانے کے لیے تھوڑی تعداد میں نوڈز کا انتخاب کیا جاتا ہے – اس عمل میں ان کی شناخت کی اسٹیکنگ ہوتی ہے۔ متبادل کے طور پر، کچھ آزمائشی نیٹ ورکس میں ایک کھلا حصہ داری کا ثبوت (<span dir="ltr">PoS</span>) اتفاق رائے کا طریقہ کار ہوتا ہے جہاں ہر کوئی ایتھیریم مین نیٹ کی طرح توثیق کار چلانے کی جانچ کر سکتا ہے۔

آزمائشی نیٹ ورکس پر <span dir="ltr">ETH</span> کی کوئی حقیقی قیمت نہیں ہونی چاہیے؛ تاہم، کچھ خاص قسم کے آزمائشی نیٹ ورک <span dir="ltr">ETH</span> کے لیے مارکیٹیں بنائی گئی ہیں جو نایاب یا حاصل کرنا مشکل ہو گئے ہیں۔ چونکہ آپ کو ایتھیریم کے ساتھ حقیقت میں بات چیت کرنے کے لیے <span dir="ltr">ETH</span> کی ضرورت ہوتی ہے (یہاں تک کہ آزمائشی نیٹ ورکس پر بھی)، زیادہ تر لوگ فوسٹس سے مفت میں آزمائشی نیٹ ورک <span dir="ltr">ETH</span> حاصل کرتے ہیں۔ زیادہ تر فوسٹس ویب ایپس ہیں جہاں آپ ایک پتہ درج کر سکتے ہیں جس پر آپ <span dir="ltr">ETH</span> بھیجنے کی درخواست کرتے ہیں۔

#### مجھے کون سا آزمائشی نیٹ ورک استعمال کرنا چاہیے؟ {#which-testnet-should-i-use}

کلائنٹ ڈیولپرز فی الحال جن دو عوامی آزمائشی نیٹ ورکس کو برقرار رکھ رہے ہیں وہ <span dir="ltr">Sepolia</span> اور <span dir="ltr">Hoodi</span> ہیں۔ <span dir="ltr">Sepolia</span> کنٹریکٹ اور ایپلی کیشن ڈیولپرز کے لیے اپنی ایپلی کیشنز کی جانچ کرنے کا ایک نیٹ ورک ہے۔ <span dir="ltr">Hoodi</span> نیٹ ورک پروٹوکول ڈیولپرز کو نیٹ ورک اپ گریڈز کی جانچ کرنے دیتا ہے، اور اسٹیکرز کو توثیق کار چلانے کی جانچ کرنے دیتا ہے۔

#### <span dir="ltr">Sepolia</span> {#sepolia}

**ایپلی کیشن کی ترقی کے لیے <span dir="ltr">Sepolia</span> تجویز کردہ ڈیفالٹ آزمائشی نیٹ ورک ہے**۔ <span dir="ltr">Sepolia</span> نیٹ ورک کلائنٹ اور ٹیسٹنگ ٹیموں کے زیر کنٹرول ایک اجازت یافتہ توثیق کار سیٹ استعمال کرتا ہے۔

##### وسائل

- [ویب سائٹ](https://sepolia.dev/)
- [<span dir="ltr">GitHub</span>](https://github.com/eth-clients/sepolia)
- [<span dir="ltr">Otterscan</span>](https://sepolia.otterscan.io/)
- [<span dir="ltr">Etherscan</span>](https://sepolia.etherscan.io)
- [<span dir="ltr">Blockscout</span>](https://eth-sepolia.blockscout.com/)

##### فوسٹس

- [<span dir="ltr">Alchemy Sepolia</span> فوسٹ](https://www.alchemy.com/faucets/ethereum-sepolia)
- [<span dir="ltr">Chain Platform Sepolia</span> فوسٹ](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [<span dir="ltr">Chainstack Sepolia</span> فوسٹ](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [<span dir="ltr">ethfaucet.com Sepolia</span> فوسٹ](https://ethfaucet.com/networks/ethereum)
- [<span dir="ltr">Google Cloud Web3 Sepolia</span> فوسٹ](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [<span dir="ltr">Grabteeth</span>](https://grabteeth.xyz/)
- [<span dir="ltr">Infura Sepolia</span> فوسٹ](https://www.infura.io/faucet)
- [<span dir="ltr">OpenFaucet.org Sepolia</span> فوسٹ](https://openfaucet.org/ethereum-sepolia)
- [<span dir="ltr">PoW</span> فوسٹ](https://sepolia-faucet.pk910.de/)
- [<span dir="ltr">QuickNode Sepolia</span> فوسٹ](https://faucet.quicknode.com/ethereum/sepolia)

#### <span dir="ltr">Hoodi</span> {#hoodi}

<span dir="ltr">Hoodi</span> توثیق اور اسٹیکنگ کی جانچ کے لیے ایک آزمائشی نیٹ ورک ہے۔ <span dir="ltr">Hoodi</span> نیٹ ورک ان صارفین کے لیے کھلا ہے جو آزمائشی نیٹ ورک توثیق کار چلانا چاہتے ہیں۔ اس لیے وہ اسٹیکرز جو مین نیٹ پر تعینات ہونے سے پہلے پروٹوکول اپ گریڈز کی جانچ کرنا چاہتے ہیں انہیں <span dir="ltr">Hoodi</span> استعمال کرنا چاہیے۔

- کھلا توثیق کار سیٹ، اسٹیکرز نیٹ ورک اپ گریڈز کی جانچ کر سکتے ہیں
- بڑی حالت، پیچیدہ سمارٹ کنٹریکٹ کے تعاملات کی جانچ کے لیے مفید ہے
- ہم آہنگی میں زیادہ وقت لگتا ہے اور نوڈ چلانے کے لیے زیادہ اسٹوریج کی ضرورت ہوتی ہے

##### وسائل

- [ویب سائٹ](https://hoodi.ethpandaops.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/eth-clients/hoodi)
- [ایکسپلورر](https://explorer.hoodi.ethpandaops.io/)
- [چیک پوائنٹ ہم آہنگی](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [<span dir="ltr">Otterscan</span>](https://hoodi.otterscan.io/)
- [<span dir="ltr">Etherscan</span>](https://hoodi.etherscan.io/)

##### فوسٹس

- [<span dir="ltr">Chain Platform Hoodi</span> فوسٹ](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [<span dir="ltr">Hoodi</span> فوسٹ](https://hoodi.ethpandaops.io/)
- [<span dir="ltr">OpenFaucet.org Hoodi</span> فوسٹ](https://openfaucet.org/ethereum-hoodi)
- [<span dir="ltr">PoW</span> فوسٹ](https://hoodi-faucet.pk910.de/)

#### <span dir="ltr">Ephemery</span> {#ephemery}

<span dir="ltr">Ephemery</span> ایک منفرد قسم کا آزمائشی نیٹ ورک ہے جو ہر ماہ مکمل طور پر ری سیٹ ہو جاتا ہے۔ عمل درآمد اور اتفاق رائے کی حالت ہر <span dir="ltr">28</span> دن بعد ابتدا (genesis) پر واپس آ جاتی ہے، جس کا مطلب ہے کہ آزمائشی نیٹ ورک پر جو کچھ بھی ہوتا ہے وہ عارضی ہوتا ہے۔ یہ اسے قلیل مدتی جانچ، تیز نوڈ بوٹ اسٹریپ اور 'ہیلو ورلڈ' قسم کی ایپلی کیشنز کے لیے مثالی بناتا ہے جنہیں مستقل مزاجی کی ضرورت نہیں ہوتی۔

- ہمیشہ تازہ حالت، توثیق کاروں اور ایپس کی قلیل مدتی جانچ
- صرف کنٹریکٹس کا بنیادی سیٹ شامل ہے
- کھلا توثیق کار سیٹ اور بڑی مقدار میں فنڈز تک رسائی میں آسانی
- نوڈ کی سب سے کم ضروریات اور تیز ترین ہم آہنگی، اوسطاً <span dir="ltr">&lt;5GB</span>

##### وسائل

- [ویب سائٹ](https://ephemery.dev/)
- [<span dir="ltr">GitHub</span>](https://github.com/ephemery-testnet/ephemery-resources)
- [کمیونٹی چیٹ](https://matrix.to/#/#staker-testnet:matrix.org)
- [<span dir="ltr">Blockscout</span>](https://explorer.ephemery.dev/)
- [<span dir="ltr">Otterscan</span>](https://otter.bordel.wtf/)
- [بیکن ایکسپلورر](https://beaconlight.ephemery.dev/)
- [چیک پوائنٹ ہم آہنگی](https://checkpoint-sync.ephemery.ethpandaops.io)
- [لانچ پیڈ](https://launchpad.ephemery.dev/)

#### فوسٹس {#faucets}

- [<span dir="ltr">Bordel</span> فوسٹ](https://faucet.bordel.wtf/)
- [<span dir="ltr">Pk910 PoW</span> فوسٹ](https://ephemery-faucet.pk910.de/)

#### ہولسکی (متروک) {#holesky}

ہولسکی آزمائشی نیٹ ورک ستمبر <span dir="ltr">2025</span> سے متروک ہو چکا ہے۔ اسٹیکنگ آپریٹرز اور انفراسٹرکچر فراہم کنندگان کو اس کے بجائے توثیق کار کی جانچ کے لیے <span dir="ltr">Hoodi</span> کا استعمال کرنا چاہیے۔

- [ہولسکی آزمائشی نیٹ ورک کی بندش کا اعلان](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF بلاگ، <span dir="ltr">1-September-2025</span>_
- [ہولسکی اور <span dir="ltr">Hoodi</span> آزمائشی نیٹ ورک کی اپ ڈیٹس](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EF بلاگ، <span dir="ltr">18-March-2025</span>_

### لیئر ۲ (l2) آزمائشی نیٹ ورکس {#layer-2-testnets}

[لیئر ۲ (l2)](/layer-2/) ایتھیریم اسکیلنگ سلوشنز کے ایک مخصوص سیٹ کو بیان کرنے کے لیے ایک اجتماعی اصطلاح ہے۔ لیئر ۲ ایک الگ بلاک چین ہے جو ایتھیریم کو وسعت دیتی ہے اور ایتھیریم کی سیکیورٹی کی ضمانتیں وراثت میں حاصل کرتی ہے۔ لیئر ۲ آزمائشی نیٹ ورکس عام طور پر عوامی ایتھیریم آزمائشی نیٹ ورکس کے ساتھ مضبوطی سے جڑے ہوتے ہیں۔

#### آربٹرم <span dir="ltr">Sepolia</span> {#arbitrum-sepolia}

[آربٹرم](https://arbitrum.io/) کے لیے ایک آزمائشی نیٹ ورک۔

##### وسائل

- [<span dir="ltr">Etherscan</span>](https://sepolia.arbiscan.io/)
- [<span dir="ltr">Blockscout</span>](https://sepolia-explorer.arbitrum.io/)

##### فوسٹس

- [<span dir="ltr">Alchemy</span> آربٹرم <span dir="ltr">Sepolia</span> فوسٹ](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [چین لنک آربٹرم <span dir="ltr">Sepolia</span> فوسٹ](https://faucets.chain.link/arbitrum-sepolia)
- [<span dir="ltr">ethfaucet.com</span> آربٹرم <span dir="ltr">Sepolia</span> فوسٹ](https://ethfaucet.com/networks/arbitrum)
- [<span dir="ltr">OpenFaucet.org</span> آربٹرم <span dir="ltr">Sepolia</span> فوسٹ](https://openfaucet.org/arbitrum-sepolia)
- [<span dir="ltr">QuickNode</span> آربٹرم <span dir="ltr">Sepolia</span> فوسٹ](https://faucet.quicknode.com/arbitrum/sepolia)

#### آپٹیمسٹک <span dir="ltr">Sepolia</span> {#optimistic-sepolia}

[آپٹیمزم](https://www.optimism.io/) کے لیے ایک آزمائشی نیٹ ورک۔

##### وسائل

- [<span dir="ltr">Etherscan</span>](https://sepolia-optimistic.etherscan.io/)
- [<span dir="ltr">Blockscout</span>](https://optimism-sepolia.blockscout.com/)

##### فوسٹس

- [<span dir="ltr">Alchemy</span> فوسٹ](https://www.alchemy.com/faucets/optimism-sepolia)
- [چین لنک فوسٹ](https://faucets.chain.link/optimism-sepolia)
- [<span dir="ltr">ethfaucet.com</span> آپٹیمزم <span dir="ltr">Sepolia</span> فوسٹ](https://ethfaucet.com/networks/optimism)
- [<span dir="ltr">OpenFaucet.org</span> آپٹیمزم <span dir="ltr">Sepolia</span> فوسٹ](https://openfaucet.org/optimism-sepolia)
- [ٹیسٹ نیٹ فوسٹ](https://docs.optimism.io/app-developers/tools/faucets)

#### سٹارک نیٹ <span dir="ltr">Sepolia</span> {#starknet-sepolia}

[سٹارک نیٹ](https://www.starknet.io) کے لیے ایک آزمائشی نیٹ ورک۔

##### وسائل

- [<span dir="ltr">Voyager Sepolia Scan</span>](https://sepolia.voyager.online/)

##### فوسٹس

- [<span dir="ltr">Alchemy</span> فوسٹ](https://www.alchemy.com/faucets/starknet-sepolia)
- [<span dir="ltr">Blast</span> سٹارک نیٹ <span dir="ltr">Sepolia</span> فوسٹ](https://blastapi.io/faucets/starknet-sepolia-eth)
- [سٹارک نیٹ فوسٹ](https://starknet-faucet.vercel.app/)

## نجی نیٹ ورکس {#private-networks}

ایک ایتھیریم نیٹ ورک نجی نیٹ ورک ہوتا ہے اگر اس کے نوڈز کسی عوامی نیٹ ورک (یعنی مین نیٹ یا آزمائشی نیٹ ورک) سے جڑے نہ ہوں۔ اس تناظر میں، نجی کا مطلب صرف مخصوص یا الگ تھلگ ہے، نہ کہ محفوظ یا سیکیور۔

### ڈیولپمنٹ نیٹ ورکس {#development-networks}

ایتھیریم ایپلی کیشن تیار کرنے کے لیے، آپ اسے تعینات کرنے سے پہلے یہ دیکھنے کے لیے ایک نجی نیٹ ورک پر چلانا چاہیں گے کہ یہ کیسے کام کرتی ہے۔ جس طرح آپ ویب ڈیولپمنٹ کے لیے اپنے کمپیوٹر پر ایک مقامی سرور بناتے ہیں، اسی طرح آپ اپنی غیر مرکزی ایپلی کیشن (<span dir="ltr">dapp</span>) کی جانچ کے لیے ایک مقامی بلاک چین مثال (instance) بنا سکتے ہیں۔ یہ عوامی آزمائشی نیٹ ورک کی نسبت بہت تیز تکرار (iteration) کی اجازت دیتا ہے۔

اس میں مدد کے لیے مخصوص پروجیکٹس اور ٹولز موجود ہیں۔ [ڈیولپمنٹ نیٹ ورکس](/developers/docs/development-networks/) کے بارے میں مزید جانیں۔

### کنسورشیم نیٹ ورکس {#consortium-networks}

اتفاق رائے کا عمل نوڈز کے پہلے سے طے شدہ سیٹ کے ذریعے کنٹرول کیا جاتا ہے جن پر بھروسہ کیا جاتا ہے۔ مثال کے طور پر، معروف تعلیمی اداروں کا ایک نجی نیٹ ورک جو ہر ایک نوڈ کو کنٹرول کرتا ہے، اور بلاکس کی توثیق نیٹ ورک کے اندر دستخط کنندگان کی ایک حد (threshold) کے ذریعے کی جاتی ہے۔

اگر ایک عوامی ایتھیریم نیٹ ورک عوامی انٹرنیٹ کی طرح ہے، تو ایک کنسورشیم نیٹ ورک ایک نجی انٹرانیٹ کی طرح ہے۔

## <Emoji text="🚉" /> ایتھیریم آزمائشی نیٹ ورکس کے نام میٹرو اسٹیشنوں کے نام پر کیوں رکھے گئے ہیں؟ {#why-naming}

بہت سے ایتھیریم آزمائشی نیٹ ورکس کے نام حقیقی دنیا کے میٹرو یا ٹرین اسٹیشنوں کے نام پر رکھے گئے ہیں۔ نام رکھنے کی یہ روایت شروع میں ہی پڑ گئی تھی اور یہ ان عالمی شہروں کی عکاسی کرتی ہے جہاں تعاون کنندگان رہے ہیں یا کام کیا ہے۔ یہ علامتی، یادگار اور عملی ہے۔ جس طرح آزمائشی نیٹ ورکس ایتھیریم مین نیٹ سے الگ تھلگ ہوتے ہیں، اسی طرح میٹرو لائنیں سطح کی ٹریفک سے الگ چلتی ہیں۔

### <Emoji text="🚧" /> عام طور پر استعمال ہونے والے اور پرانے آزمائشی نیٹ ورکس {#common-and-legacy-testnets}

- **<span dir="ltr">Sepolia</span>** - ایتھنز، یونان میں میٹرو سے جڑا ایک پڑوس۔ فی الحال سمارٹ کنٹریکٹ اور <span dir="ltr">dApp</span> کی جانچ کے لیے استعمال ہوتا ہے۔
- **<span dir="ltr">Hoodi</span>** - اس کا نام بنگلورو، بھارت کے <span dir="ltr">Hoodi</span> میٹرو اسٹیشن کے نام پر رکھا گیا ہے۔ توثیق کار اور پروٹوکول اپ گریڈ کی جانچ کے لیے استعمال ہوتا ہے۔
- **گورلی** _(متروک)_ - اس کا نام برلن، جرمنی کے <span dir="ltr">Görlitzer Bahnhof</span> کے نام پر رکھا گیا ہے۔
- **<span dir="ltr">Rinkeby</span>** _(متروک)_ - اس کا نام اسٹاک ہوم کے ایک مضافاتی علاقے کے نام پر رکھا گیا ہے جہاں ایک میٹرو اسٹیشن ہے۔
- **روپسٹن** _(متروک)_ - اسٹاک ہوم کے ایک علاقے اور سابقہ فیری/میٹرو ٹرمینل کی طرف اشارہ کرتا ہے۔
- **<span dir="ltr">Kovan</span>** _(متروک)_ - اس کا نام سنگاپور کے ایک <span dir="ltr">MRT</span> اسٹیشن کے نام پر رکھا گیا ہے۔
- **<span dir="ltr">Morden</span>** _(متروک)_ - اس کا نام لندن انڈر گراؤنڈ اسٹیشن کے نام پر رکھا گیا ہے۔ ایتھیریم کا پہلا عوامی آزمائشی نیٹ ورک۔

### <Emoji text="🧪" /> دیگر مخصوص آزمائشی نیٹ ورکس {#other-testnets}

کچھ آزمائشی نیٹ ورکس قلیل مدتی یا اپ گریڈ کے لیے مخصوص جانچ کے لیے بنائے گئے تھے اور ضروری نہیں کہ ان کی تھیم میٹرو پر مبنی ہو:

- **ہولسکی** _(متروک)_ - اس کا نام پراگ کے <span dir="ltr">Holešovice</span> اسٹیشن کے نام پر رکھا گیا ہے۔ توثیق کار کی جانچ کے لیے استعمال ہوتا ہے؛ <span dir="ltr">2025</span> میں متروک ہو گیا۔
- **<span dir="ltr">Kiln</span>**، **<span dir="ltr">Zhejiang</span>**، **<span dir="ltr">Shandong</span>**، **<span dir="ltr">Prater</span>**، **<span dir="ltr">Pyrmont</span>**، **<span dir="ltr">Olympic</span>** _(تمام متروک)_ اور **<span dir="ltr">Ephemery</span>** - دی مرج، شنگھائی، یا توثیق کار کے تجربات جیسے اپ گریڈ سمیلیشنز کے لیے خاص طور پر بنائے گئے ہیں۔ کچھ نام میٹرو پر مبنی ہونے کے بجائے علاقائی یا موضوعاتی ہیں۔

میٹرو اسٹیشن کے ناموں کا استعمال ڈیولپرز کو عددی چین <span dir="ltr">IDs</span> پر انحصار کیے بغیر آزمائشی نیٹ ورکس کو تیزی سے پہچاننے اور یاد رکھنے میں مدد کرتا ہے۔ یہ ایتھیریم کی ثقافت کی بھی عکاسی کرتا ہے: عملی، عالمی، اور انسان پر مرکوز۔

## متعلقہ ٹولز {#related-tools}

- [<span dir="ltr">Chainlist</span>](https://chainlist.org/) _والیٹس اور فراہم کنندگان کو مناسب چین <span dir="ltr">ID</span> اور نیٹ ورک <span dir="ltr">ID</span> سے جوڑنے کے لیے <span dir="ltr">EVM</span> نیٹ ورکس کی فہرست_
- [<span dir="ltr">EVM</span> پر مبنی چینز](https://github.com/ethereum-lists/chains) _چین میٹا ڈیٹا کی <span dir="ltr">GitHub</span> ریپو جو <span dir="ltr">Chainlist</span> کو طاقت دیتی ہے_

## مزید مطالعہ {#further-reading}

- [تجویز: متوقع ایتھیریم آزمائشی نیٹ ورک لائف سائیکل](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [ایتھیریم آزمائشی نیٹ ورکس کا ارتقاء](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
