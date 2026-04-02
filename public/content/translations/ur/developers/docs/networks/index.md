---
title: "نیٹ ورکس"
description: "ایتھریم کے نیٹ ورکس کا ایک جائزہ اور اپنی ایپلیکیشن کی ٹیسٹنگ کے لیے ٹیسٹ نیٹ ایتھر (ETH) کہاں سے حاصل کریں۔"
lang: ur
---

[Ethereum](/) نیٹ ورکس جڑے ہوئے کمپیوٹرز کے گروپس ہیں جو ایتھریم پروٹوکول کا استعمال کرتے ہوئے بات چیت کرتے ہیں۔ صرف ایک ایتھریم مین نیٹ (Mainnet) ہے، لیکن ٹیسٹنگ اور ڈیولپمنٹ کے مقاصد کے لیے اسی پروٹوکول کے اصولوں کے مطابق آزاد نیٹ ورکس بنائے جا سکتے ہیں۔ بہت سے آزاد "نیٹ ورکس" ہیں جو ایک دوسرے کے ساتھ تعامل کیے بغیر پروٹوکول کی تعمیل کرتے ہیں۔ آپ اپنے سمارٹ کانٹریکٹس اور web3 ایپس کی ٹیسٹنگ کے لیے اپنے کمپیوٹر پر مقامی طور پر بھی ایک نیٹ ورک شروع کر سکتے ہیں۔

آپ کا ایتھریم اکاؤنٹ مختلف نیٹ ورکس پر کام کرے گا، لیکن آپ کے اکاؤنٹ کا بیلنس اور ٹرانزیکشن کی ہسٹری مرکزی ایتھریم نیٹ ورک سے منتقل نہیں ہوگی۔ ٹیسٹنگ کے مقاصد کے لیے، یہ جاننا مفید ہے کہ کون سے نیٹ ورکس دستیاب ہیں اور تجربات کرنے کے لیے ٹیسٹ نیٹ ETH کیسے حاصل کیا جائے۔ عام طور پر، سیکیورٹی وجوہات کی بنا پر، مین نیٹ اکاؤنٹس کو ٹیسٹ نیٹس پر یا اس کے برعکس دوبارہ استعمال کرنے کی سفارش نہیں کی جاتی ہے۔

## پیشگی شرائط {#prerequisites}

مختلف نیٹ ورکس کے بارے میں پڑھنے سے پہلے آپ کو [ایتھریم کی بنیادی باتیں](/developers/docs/intro-to-ethereum/) سمجھ لینی چاہئیں، کیونکہ ٹیسٹ نیٹ ورکس آپ کو تجربات کرنے کے لیے ایتھریم کا ایک سستا اور محفوظ ورژن فراہم کریں گے۔

## پبلک نیٹ ورکس {#public-networks}

پبلک نیٹ ورکس دنیا میں انٹرنیٹ کنکشن رکھنے والے کسی بھی شخص کے لیے قابل رسائی ہیں۔ کوئی بھی پبلک بلاک چین پر ٹرانزیکشنز پڑھ سکتا ہے یا بنا سکتا ہے اور عمل میں لائی جانے والی ٹرانزیکشنز کی توثیق کر سکتا ہے۔ پیئرز (peers) کے درمیان اتفاق رائے ٹرانزیکشنز کی شمولیت اور نیٹ ورک کی اسٹیٹ (state) کا فیصلہ کرتا ہے۔

### ایتھریم مین نیٹ {#ethereum-mainnet}

مین نیٹ (Mainnet) بنیادی پبلک ایتھریم پروڈکشن بلاک چین ہے، جہاں ڈسٹری بیوٹڈ لیجر پر اصل مالیت کی ٹرانزیکشنز ہوتی ہیں۔

جب لوگ اور ایکسچینجز ETH کی قیمتوں پر بات کرتے ہیں، تو وہ مین نیٹ ETH کے بارے میں بات کر رہے ہوتے ہیں۔

### ایتھریم ٹیسٹ نیٹس {#ethereum-testnets}

مین نیٹ کے علاوہ، پبلک ٹیسٹ نیٹس بھی موجود ہیں۔ یہ وہ نیٹ ورکس ہیں جو پروٹوکول ڈیولپرز یا سمارٹ کانٹریکٹ ڈیولپرز مین نیٹ پر تعینات کرنے سے پہلے پروڈکشن جیسے ماحول میں پروٹوکول اپ گریڈز اور ممکنہ سمارٹ کانٹریکٹس دونوں کو ٹیسٹ کرنے کے لیے استعمال کرتے ہیں۔ اسے پروڈکشن بمقابلہ اسٹیجنگ سرورز کی طرح سمجھیں۔

آپ کو مین نیٹ پر تعینات کرنے سے پہلے اپنے لکھے ہوئے کسی بھی کانٹریکٹ کوڈ کو ٹیسٹ نیٹ پر ٹیسٹ کرنا چاہیے۔ موجودہ سمارٹ کانٹریکٹس کے ساتھ مربوط ہونے والی dapps میں سے، زیادہ تر پروجیکٹس کی کاپیاں ٹیسٹ نیٹس پر تعینات ہوتی ہیں۔

زیادہ تر ٹیسٹ نیٹس نے پرمیشنڈ پروف آف اتھارٹی (proof-of-authority) کنسینسس میکانزم کا استعمال کرتے ہوئے آغاز کیا۔ اس کا مطلب ہے کہ ٹرانزیکشنز کی توثیق کرنے اور نئے بلاکس بنانے کے لیے تھوڑی تعداد میں نوڈز کا انتخاب کیا جاتا ہے – اس عمل میں ان کی شناخت داؤ پر لگی ہوتی ہے۔ متبادل کے طور پر، کچھ ٹیسٹ نیٹس میں ایک اوپن پروف آف اسٹیک (proof-of-stake) کنسینسس میکانزم ہوتا ہے جہاں ہر کوئی ایتھریم مین نیٹ کی طرح ویلیڈیٹر چلانے کا ٹیسٹ کر سکتا ہے۔

ٹیسٹ نیٹس پر ETH کی کوئی حقیقی قیمت نہیں ہونی چاہیے؛ تاہم، کچھ خاص قسم کے ٹیسٹ نیٹ ETH کے لیے مارکیٹس بن گئی ہیں جو نایاب یا حاصل کرنے میں مشکل ہو گئے ہیں۔ چونکہ آپ کو ایتھریم کے ساتھ حقیقت میں تعامل کرنے کے لیے ETH کی ضرورت ہوتی ہے (یہاں تک کہ ٹیسٹ نیٹس پر بھی)، زیادہ تر لوگ فوسٹس (faucets) سے مفت میں ٹیسٹ نیٹ ETH حاصل کرتے ہیں۔ زیادہ تر فوسٹس ویب ایپس ہیں جہاں آپ ایک ایڈریس درج کر سکتے ہیں جس پر آپ ETH بھیجنے کی درخواست کرتے ہیں۔

#### مجھے کون سا ٹیسٹ نیٹ استعمال کرنا چاہیے؟

کلائنٹ ڈیولپرز فی الحال جن دو پبلک ٹیسٹ نیٹس کو برقرار رکھ رہے ہیں وہ Sepolia اور Hoodi ہیں۔ Sepolia کانٹریکٹ اور ایپلیکیشن ڈیولپرز کے لیے اپنی ایپلیکیشنز کو ٹیسٹ کرنے کا ایک نیٹ ورک ہے۔ Hoodi نیٹ ورک پروٹوکول ڈیولپرز کو نیٹ ورک اپ گریڈز ٹیسٹ کرنے دیتا ہے، اور اسٹیکرز کو ویلیڈیٹرز چلانے کا ٹیسٹ کرنے دیتا ہے۔

#### Sepolia {#sepolia}

**ایپلیکیشن ڈیولپمنٹ کے لیے Sepolia تجویز کردہ ڈیفالٹ ٹیسٹ نیٹ ہے**۔ Sepolia نیٹ ورک کلائنٹ اور ٹیسٹنگ ٹیموں کے زیر کنٹرول ایک پرمیشنڈ ویلیڈیٹر سیٹ استعمال کرتا ہے۔

##### وسائل

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### فوسٹس

- [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia Faucet](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ecosystem Faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia Faucet](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi ویلیڈیٹنگ اور اسٹیکنگ کی ٹیسٹنگ کے لیے ایک ٹیسٹ نیٹ ہے۔ Hoodi نیٹ ورک ان صارفین کے لیے کھلا ہے جو ٹیسٹ نیٹ ویلیڈیٹر چلانا چاہتے ہیں۔ اس لیے وہ اسٹیکرز جو مین نیٹ پر تعینات ہونے سے پہلے پروٹوکول اپ گریڈز کو ٹیسٹ کرنا چاہتے ہیں انہیں Hoodi استعمال کرنا چاہیے۔

- اوپن ویلیڈیٹر سیٹ، اسٹیکرز نیٹ ورک اپ گریڈز کو ٹیسٹ کر سکتے ہیں
- بڑی اسٹیٹ، پیچیدہ سمارٹ کانٹریکٹ کے تعاملات کو ٹیسٹ کرنے کے لیے مفید ہے
- سنک (sync) ہونے میں زیادہ وقت لگتا ہے اور نوڈ چلانے کے لیے زیادہ اسٹوریج کی ضرورت ہوتی ہے

##### وسائل

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### فوسٹس

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery ایک منفرد قسم کا ٹیسٹ نیٹ ہے جو ہر ماہ مکمل طور پر ری سیٹ ہو جاتا ہے۔ ایگزیکیوشن اور کنسینسس اسٹیٹ ہر 28 دن بعد واپس جینیسس (genesis) پر چلی جاتی ہے، جس کا مطلب ہے کہ ٹیسٹ نیٹ پر ہونے والی کوئی بھی چیز عارضی (ephemeral) ہے۔ یہ اسے قلیل مدتی ٹیسٹنگ، تیز نوڈ بوٹ اسٹریپ اور 'hello world' قسم کی ایپلیکیشنز کے لیے مثالی بناتا ہے جنہیں مستقل مزاجی کی ضرورت نہیں ہوتی۔

- ہمیشہ تازہ اسٹیٹ، ویلیڈیٹرز اور ایپس کی قلیل مدتی ٹیسٹنگ
- صرف کانٹریکٹس کا بنیادی سیٹ شامل ہے
- اوپن ویلیڈیٹر سیٹ اور بڑی مقدار میں فنڈز تک رسائی آسان ہے
- نوڈ کی سب سے کم ضروریات اور تیز ترین سنک، اوسطاً &lt;5GB

##### وسائل

- [Website](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Community chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beacon explorer](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### فوسٹس

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (متروک) {#holesky}

Holesky ٹیسٹ نیٹ ستمبر 2025 سے متروک (deprecated) ہو گیا ہے۔ اسٹیکنگ آپریٹرز اور انفراسٹرکچر فراہم کرنے والوں کو ویلیڈیٹر ٹیسٹنگ کے لیے اس کے بجائے Hoodi کا استعمال کرنا چاہیے۔

- [Holesky Testnet Shutdown Announcement](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF Blog, 1 ستمبر 2025_
- [Holesky and Hoodi Testnet Updates](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EF Blog, 18 مارچ 2025_

### لیئر 2 ٹیسٹ نیٹس {#layer-2-testnets}

[لیئر 2 (L2)](/layer-2/) ایتھریم اسکیلنگ سلوشنز کے ایک مخصوص سیٹ کو بیان کرنے کے لیے ایک اجتماعی اصطلاح ہے۔ لیئر 2 ایک الگ بلاک چین ہے جو ایتھریم کو وسعت دیتی ہے اور ایتھریم کی سیکیورٹی کی ضمانتیں وراثت میں حاصل کرتی ہے۔ لیئر 2 ٹیسٹ نیٹس عام طور پر پبلک ایتھریم ٹیسٹ نیٹس کے ساتھ مضبوطی سے جڑے ہوتے ہیں۔

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) کے لیے ایک ٹیسٹ نیٹ۔

##### وسائل

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### فوسٹس

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) کے لیے ایک ٹیسٹ نیٹ۔

##### وسائل

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### فوسٹس

- [Alchemy Faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Faucet](https://ethfaucet.com/networks/optimism)
- [Testnet Faucet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) کے لیے ایک ٹیسٹ نیٹ۔

##### وسائل

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### فوسٹس

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## پرائیویٹ نیٹ ورکس {#private-networks}

ایک ایتھریم نیٹ ورک پرائیویٹ نیٹ ورک ہوتا ہے اگر اس کے نوڈز کسی پبلک نیٹ ورک (یعنی مین نیٹ یا ٹیسٹ نیٹ) سے جڑے نہ ہوں۔ اس تناظر میں، پرائیویٹ کا مطلب صرف مخصوص یا الگ تھلگ ہے، نہ کہ محفوظ یا سیکیور۔

### ڈیولپمنٹ نیٹ ورکس {#development-networks}

ایتھریم ایپلیکیشن تیار کرنے کے لیے، آپ اسے تعینات کرنے سے پہلے یہ دیکھنے کے لیے پرائیویٹ نیٹ ورک پر چلانا چاہیں گے کہ یہ کیسے کام کرتی ہے۔ جس طرح آپ ویب ڈیولپمنٹ کے لیے اپنے کمپیوٹر پر لوکل سرور بناتے ہیں، اسی طرح آپ اپنی dapp کو ٹیسٹ کرنے کے لیے ایک لوکل بلاک چین انسٹینس (instance) بنا سکتے ہیں۔ یہ پبلک ٹیسٹ نیٹ کی نسبت بہت تیز ایٹریشن (iteration) کی اجازت دیتا ہے۔

اس میں مدد کے لیے مخصوص پروجیکٹس اور ٹولز موجود ہیں۔ [ڈیولپمنٹ نیٹ ورکس](/developers/docs/development-networks/) کے بارے میں مزید جانیں۔

### کنسورشیم نیٹ ورکس {#consortium-networks}

کنسینسس کا عمل پہلے سے طے شدہ نوڈز کے ایک سیٹ کے ذریعے کنٹرول کیا جاتا ہے جن پر بھروسہ کیا جاتا ہے۔ مثال کے طور پر، معروف تعلیمی اداروں کا ایک پرائیویٹ نیٹ ورک جو ہر ایک سنگل نوڈ کو کنٹرول کرتا ہے، اور بلاکس کی توثیق نیٹ ورک کے اندر دستخط کنندگان کی ایک حد (threshold) کے ذریعے کی جاتی ہے۔

اگر پبلک ایتھریم نیٹ ورک پبلک انٹرنیٹ کی طرح ہے، تو کنسورشیم نیٹ ورک ایک پرائیویٹ انٹرانیٹ کی طرح ہے۔

## <Emoji text="🚉" /> ایتھریم ٹیسٹ نیٹس کے نام میٹرو اسٹیشنز کے نام پر کیوں رکھے گئے ہیں؟ {#why-naming}

بہت سے ایتھریم ٹیسٹ نیٹس کے نام حقیقی دنیا کے میٹرو یا ٹرین اسٹیشنز کے نام پر رکھے گئے ہیں۔ نام رکھنے کی یہ روایت شروع میں ہی پڑ گئی تھی اور یہ ان عالمی شہروں کی عکاسی کرتی ہے جہاں تعاون کنندگان (contributors) رہے ہیں یا کام کیا ہے۔ یہ علامتی، یادگار اور عملی ہے۔ جس طرح ٹیسٹ نیٹس ایتھریم مین نیٹ سے الگ تھلگ ہوتے ہیں، اسی طرح میٹرو لائنز سطح کی ٹریفک سے الگ چلتی ہیں۔

### <Emoji text="🚧" /> عام طور پر استعمال ہونے والے اور پرانے ٹیسٹ نیٹس {#common-and-legacy-testnets}

- **Sepolia** - ایتھنز، یونان میں میٹرو سے منسلک ایک پڑوس۔ فی الحال سمارٹ کانٹریکٹ اور dApp ٹیسٹنگ کے لیے استعمال ہوتا ہے۔
- **Hoodi** - اس کا نام بنگلورو، بھارت کے Hoodi میٹرو اسٹیشن کے نام پر رکھا گیا ہے۔ ویلیڈیٹر اور پروٹوکول اپ گریڈ ٹیسٹنگ کے لیے استعمال ہوتا ہے۔
- **Goerli** _(متروک)_ - اس کا نام برلن، جرمنی کے Görlitzer Bahnhof کے نام پر رکھا گیا ہے۔
- **Rinkeby** _(متروک)_ - اس کا نام اسٹاک ہوم کے ایک مضافاتی علاقے کے نام پر رکھا گیا ہے جہاں ایک میٹرو اسٹیشن ہے۔
- **Ropsten** _(متروک)_ - اس سے مراد اسٹاک ہوم کا ایک علاقہ اور سابقہ فیری/میٹرو ٹرمینل ہے۔
- **Kovan** _(متروک)_ - اس کا نام سنگاپور کے ایک MRT اسٹیشن کے نام پر رکھا گیا ہے۔
- **Morden** _(متروک)_ - اس کا نام لندن انڈر گراؤنڈ اسٹیشن کے نام پر رکھا گیا ہے۔ ایتھریم کا پہلا پبلک ٹیسٹ نیٹ۔

### <Emoji text="🧪" /> دیگر مخصوص ٹیسٹ نیٹس {#other-testnets}

کچھ ٹیسٹ نیٹس قلیل مدتی یا اپ گریڈ کے لیے مخصوص ٹیسٹنگ کے لیے بنائے گئے تھے اور ضروری نہیں کہ ان کی تھیم میٹرو پر مبنی ہو:

- **Holesky** _(متروک)_ - اس کا نام پراگ کے Holešovice اسٹیشن کے نام پر رکھا گیا ہے۔ ویلیڈیٹر ٹیسٹنگ کے لیے استعمال ہوتا ہے؛ 2025 میں متروک ہو گیا۔
- **Kiln**، **Zhejiang**، **Shandong**، **Prater**، **Pyrmont**، **Olympic** _(تمام متروک)_ اور **Ephemery** - دی مرج (The Merge)، شنگھائی (Shanghai)، یا ویلیڈیٹر کے تجربات جیسی اپ گریڈ سمیلیشنز کے لیے خاص طور پر بنائے گئے ہیں۔ کچھ نام میٹرو پر مبنی ہونے کے بجائے علاقائی یا موضوعاتی ہیں۔

میٹرو اسٹیشن کے ناموں کا استعمال ڈیولپرز کو عددی چین آئی ڈیز (chain IDs) پر انحصار کیے بغیر ٹیسٹ نیٹس کو تیزی سے پہچاننے اور یاد رکھنے میں مدد کرتا ہے۔ یہ ایتھریم کی ثقافت کی بھی عکاسی کرتا ہے: عملی، عالمی، اور انسان پر مرکوز۔

## متعلقہ ٹولز {#related-tools}

- [Chainlist](https://chainlist.org/) _EVM نیٹ ورکس کی فہرست تاکہ والٹس اور پرووائیڈرز کو مناسب Chain ID اور Network ID سے منسلک کیا جا سکے_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _چین میٹا ڈیٹا کی GitHub ریپو جو Chainlist کو چلاتی ہے_

## مزید مطالعہ {#further-reading}

- [Proposal: Predictable Ethereum Testnet Lifecycle](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [The Evolution of Ethereum Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)