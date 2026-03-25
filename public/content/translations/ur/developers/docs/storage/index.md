---
title: "غیر مرکزی اسٹوریج"
description: "غیر مرکزی اسٹوریج کیا ہے اور اسے ڈیپ (dapp) میں ضم کرنے کے لیے دستیاب ٹولز کا جائزہ۔"
lang: ur
---

کسی ایک کمپنی یا تنظیم کے زیر انتظام مرکزی سرور کے برعکس، غیر مرکزی اسٹوریج سسٹمز صارف آپریٹرز کے پیئر ٹو پیئر (peer-to-peer) نیٹ ورک پر مشتمل ہوتے ہیں جو مجموعی ڈیٹا کا ایک حصہ رکھتے ہیں، جس سے ایک لچکدار فائل اسٹوریج شیئرنگ سسٹم بنتا ہے۔ یہ کسی بلاک چین پر مبنی ایپلیکیشن یا کسی بھی پیئر ٹو پیئر پر مبنی نیٹ ورک میں ہو سکتے ہیں۔

Ethereum کو خود ایک غیر مرکزی اسٹوریج سسٹم کے طور پر استعمال کیا جا سکتا ہے، اور تمام اسمارٹ کانٹریکٹس میں کوڈ اسٹوریج کے معاملے میں ایسا ہی ہے۔ تاہم، جب بات بڑی مقدار میں ڈیٹا کی ہو، تو Ethereum کو اس کے لیے ڈیزائن نہیں کیا گیا تھا۔ چین مسلسل بڑھ رہی ہے، لیکن لکھتے وقت، Ethereum چین تقریباً 500GB - 1TB ہے ([کلائنٹ پر منحصر ہے](https://etherscan.io/chartsync/chaindefault))، اور نیٹ ورک پر موجود ہر نوڈ کو تمام ڈیٹا اسٹور کرنے کے قابل ہونا چاہیے۔ اگر چین کو بڑی مقدار میں ڈیٹا (مثلاً 5TBs) تک پھیلایا جائے تو تمام نوڈز کا چلتے رہنا ممکن نہیں ہوگا۔ اس کے علاوہ، اتنے زیادہ ڈیٹا کو مین نیٹ (Mainnet) پر تعینات کرنے کی لاگت [گیس (gas)](/developers/docs/gas) فیس کی وجہ سے بہت زیادہ مہنگی ہوگی۔

ان پابندیوں کی وجہ سے، ہمیں غیر مرکزی طریقے سے بڑی مقدار میں ڈیٹا اسٹور کرنے کے لیے ایک مختلف چین یا طریقہ کار کی ضرورت ہے۔

غیر مرکزی اسٹوریج (dStorage) کے اختیارات کو دیکھتے وقت، صارف کو چند باتوں کا خیال رکھنا چاہیے۔

- برقراری کا طریقہ کار (Persistence mechanism) / ترغیبی ڈھانچہ (incentive structure)
- ڈیٹا برقرار رکھنے کا نفاذ (Data retention enforcement)
- غیر مرکزیت (Decentrality)
- اتفاق رائے (Consensus)

## برقراری کا طریقہ کار / ترغیبی ڈھانچہ {#persistence-mechanism}

### بلاک چین پر مبنی {#blockchain-based}

کسی ڈیٹا کو ہمیشہ کے لیے برقرار رکھنے کے لیے، ہمیں برقراری کا طریقہ کار استعمال کرنے کی ضرورت ہے۔ مثال کے طور پر، Ethereum پر، برقراری کا طریقہ کار یہ ہے کہ نوڈ چلاتے وقت پوری چین کا حساب رکھنا ضروری ہے۔ ڈیٹا کے نئے ٹکڑے چین کے آخر میں جڑ جاتے ہیں، اور یہ بڑھتی رہتی ہے - جس کے لیے ہر نوڈ کو تمام شامل کردہ ڈیٹا کی نقل تیار کرنے کی ضرورت ہوتی ہے۔

اسے **بلاک چین پر مبنی** برقراری کہا جاتا ہے۔

بلاک چین پر مبنی برقراری کا مسئلہ یہ ہے کہ چین اتنی بڑی ہو سکتی ہے کہ تمام ڈیٹا کو آسانی سے برقرار رکھنا اور اسٹور کرنا مشکل ہو جائے (مثلاً، [بہت سے ذرائع](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) کا اندازہ ہے کہ انٹرنیٹ کو 40 زیٹابائٹس (Zetabytes) سے زیادہ اسٹوریج کی گنجائش درکار ہے)۔

بلاک چین میں کسی قسم کا ترغیبی ڈھانچہ بھی ہونا چاہیے۔ بلاک چین پر مبنی برقراری کے لیے، توثیق کار (validator) کو ادائیگی کی جاتی ہے۔ جب ڈیٹا کو چین میں شامل کیا جاتا ہے، تو توثیق کاروں کو ڈیٹا شامل کرنے کے لیے ادائیگی کی جاتی ہے۔

بلاک چین پر مبنی برقراری والے پلیٹ فارمز:

- Ethereum
- [Arweave](https://www.arweave.org/)

### کانٹریکٹ پر مبنی {#contract-based}

**کانٹریکٹ پر مبنی** برقراری کا تصور یہ ہے کہ ہر نوڈ کے ذریعے ڈیٹا کی نقل تیار نہیں کی جا سکتی اور اسے ہمیشہ کے لیے اسٹور نہیں کیا جا سکتا، بلکہ اسے کانٹریکٹ کے معاہدوں کے ساتھ برقرار رکھا جانا چاہیے۔ یہ متعدد نوڈز کے ساتھ کیے گئے معاہدے ہیں جنہوں نے ایک مدت کے لیے ڈیٹا کا ایک حصہ رکھنے کا وعدہ کیا ہے۔ ڈیٹا کو برقرار رکھنے کے لیے جب بھی ان کی میعاد ختم ہو جائے تو انہیں ریفنڈ یا تجدید کیا جانا چاہیے۔

زیادہ تر معاملات میں، تمام ڈیٹا کو آن چین (onchain) اسٹور کرنے کے بجائے، چین پر ڈیٹا کے مقام کا ہیش (hash) اسٹور کیا جاتا ہے۔ اس طرح، تمام ڈیٹا کو رکھنے کے لیے پوری چین کو اسکیل کرنے کی ضرورت نہیں ہوتی۔

کانٹریکٹ پر مبنی برقراری والے پلیٹ فارمز:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### اضافی تحفظات {#additional-consideration}

IPFS فائلوں، ویب سائٹس، ایپلیکیشنز اور ڈیٹا کو اسٹور کرنے اور ان تک رسائی کے لیے ایک تقسیم شدہ (distributed) سسٹم ہے۔ اس میں کوئی بلٹ ان ترغیبی اسکیم نہیں ہے، لیکن اس کے بجائے طویل مدتی برقراری کے لیے اوپر دیے گئے کسی بھی کانٹریکٹ پر مبنی ترغیبی حل کے ساتھ استعمال کیا جا سکتا ہے۔ IPFS پر ڈیٹا کو برقرار رکھنے کا ایک اور طریقہ پننگ سروس (pinning service) کے ساتھ کام کرنا ہے، جو آپ کے لیے آپ کا ڈیٹا "پن" کرے گی۔ آپ اپنا IPFS نوڈ بھی چلا سکتے ہیں اور اپنے اور/یا دوسروں کے ڈیٹا کو مفت میں برقرار رکھنے کے لیے نیٹ ورک میں حصہ ڈال سکتے ہیں!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS پننگ سروس)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin پننگ سروس)_
- [Infura](https://infura.io/product/ipfs) _(IPFS پننگ سروس)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS پننگ ایکسپلورر)_
- [4EVERLAND](https://www.4everland.org/) _(IPFS پننگ سروس)_
- [Filebase](https://filebase.com) _(IPFS پننگ سروس)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin پننگ سروس)_

SWARM ایک غیر مرکزی ڈیٹا اسٹوریج اور ڈسٹری بیوشن ٹیکنالوجی ہے جس میں اسٹوریج ترغیبی سسٹم اور اسٹوریج رینٹ پرائس اوریکل (oracle) شامل ہے۔

## ڈیٹا برقرار رکھنا {#data-retention}

ڈیٹا کو برقرار رکھنے کے لیے، سسٹمز کے پاس اس بات کو یقینی بنانے کے لیے کسی قسم کا طریقہ کار ہونا چاہیے کہ ڈیٹا برقرار رہے۔

### چیلنج کا طریقہ کار {#challenge-mechanism}

ڈیٹا کو برقرار رکھنے کو یقینی بنانے کے سب سے مقبول طریقوں میں سے ایک کسی قسم کا کرپٹوگرافک چیلنج استعمال کرنا ہے جو نوڈز کو جاری کیا جاتا ہے تاکہ یہ یقینی بنایا جا سکے کہ ان کے پاس اب بھی ڈیٹا موجود ہے۔ ایک سادہ مثال Arweave کا پروف آف ایکسیس (proof-of-access) ہے۔ وہ نوڈز کو یہ دیکھنے کے لیے ایک چیلنج جاری کرتے ہیں کہ آیا ان کے پاس حالیہ بلاک اور ماضی کے کسی بے ترتیب بلاک دونوں پر ڈیٹا موجود ہے۔ اگر نوڈ جواب نہیں دے پاتا، تو انہیں جرمانہ کیا جاتا ہے۔

چیلنج کے طریقہ کار کے ساتھ dStorage کی اقسام:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### غیر مرکزیت {#decentrality}

پلیٹ فارمز کی غیر مرکزیت کی سطح کی پیمائش کرنے کے لیے کوئی بہترین ٹولز نہیں ہیں، لیکن عام طور پر، آپ ایسے ٹولز استعمال کرنا چاہیں گے جن میں کسی قسم کا KYC نہ ہو تاکہ یہ ثبوت فراہم کیا جا سکے کہ وہ مرکزی نہیں ہیں۔

KYC کے بغیر غیر مرکزی ٹولز:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### اتفاق رائے {#consensus}

ان میں سے زیادہ تر ٹولز کا اپنا [اتفاق رائے کا طریقہ کار (consensus mechanism)](/developers/docs/consensus-mechanisms/) ہوتا ہے لیکن عام طور پر وہ یا تو [**پروف آف ورک (PoW)**](/developers/docs/consensus-mechanisms/pow/) یا [**پروف آف اسٹیک (PoS)**](/developers/docs/consensus-mechanisms/pos/) پر مبنی ہوتے ہیں۔

پروف آف ورک پر مبنی:

- Skynet
- Arweave

پروف آف اسٹیک پر مبنی:

- Ethereum
- Filecoin
- Züs
- Crust Network

## متعلقہ ٹولز {#related-tools}

**IPFS - _انٹرپلینیٹری فائل سسٹم (InterPlanetary File System) Ethereum کے لیے ایک غیر مرکزی اسٹوریج اور فائل ریفرنسنگ سسٹم ہے۔_**

- [Ipfs.io](https://ipfs.io/)
- [دستاویزات](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _ڈیولپرز کے لیے محفوظ، نجی، اور S3 سے مطابقت رکھنے والا غیر مرکزی کلاؤڈ آبجیکٹ اسٹوریج۔_**

- [Storj.io](https://storj.io/)
- [دستاویزات](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _ایک ٹرسٹ لیس (trustless) کلاؤڈ اسٹوریج مارکیٹ پلیس بنانے کے لیے کرپٹوگرافی کا استعمال کرتا ہے، جس سے خریداروں اور فروخت کنندگان کو براہ راست لین دین کرنے کی اجازت ملتی ہے۔_**

- [Skynet.net](https://sia.tech/)
- [دستاویزات](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin کو IPFS کے پیچھے موجود اسی ٹیم نے بنایا تھا۔ یہ IPFS کے نظریات کے اوپر ایک ترغیبی تہہ (incentive layer) ہے۔_**

- [Filecoin.io](https://filecoin.io/)
- [دستاویزات](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave ڈیٹا اسٹور کرنے کے لیے ایک dStorage پلیٹ فارم ہے۔_**

- [Arweave.org](https://www.arweave.org/)
- [دستاویزات](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs شارڈنگ (sharding) اور بلابرز (blobbers) کے ساتھ ایک پروف آف اسٹیک dStorage پلیٹ فارم ہے۔_**

- [zus.network](https://zus.network/)
- [دستاویزات](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust IPFS کے اوپر ایک dStorage پلیٹ فارم ہے۔_**

- [Crust.network](https://crust.network)
- [دستاویزات](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Ethereum ویب 3 (web3) اسٹیک کے لیے ایک تقسیم شدہ اسٹوریج پلیٹ فارم اور مواد کی تقسیم کی سروس ہے۔_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [دستاویزات](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS کے اوپر ایک غیر مرکزی پیئر ٹو پیئر ڈیٹا بیس۔_**

- [OrbitDB.org](https://orbitdb.org/)
- [دستاویزات](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _غیر مرکزی کلاؤڈ پروجیکٹ (ڈیٹا بیس، فائل اسٹوریج، کمپیوٹنگ اور DID)۔ آف چین (offchain) اور آن چین (onchain) پیئر ٹو پیئر ٹیکنالوجی کا ایک انوکھا امتزاج۔ IPFS اور ملٹی چین مطابقت۔_**

- [Aleph.im](https://aleph.cloud/)
- [دستاویزات](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _ڈیٹا سے بھرپور اور پرکشش ایپلیکیشنز کے لیے صارف کے زیر کنٹرول IPFS ڈیٹا بیس اسٹوریج۔_**

- [Ceramic.network](https://ceramic.network/)
- [دستاویزات](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3 سے مطابقت رکھنے والا غیر مرکزی اسٹوریج اور جیو ریڈنڈنٹ (geo-redundant) IPFS پننگ سروس۔ Filebase کے ذریعے IPFS پر اپ لوڈ کی گئی تمام فائلیں خود بخود Filebase انفراسٹرکچر پر دنیا بھر میں 3x ریپلیکیشن کے ساتھ پن ہو جاتی ہیں۔_**

- [Filebase.com](https://filebase.com/)
- [دستاویزات](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _ایک ویب 3.0 (Web 3.0) کلاؤڈ کمپیوٹنگ پلیٹ فارم جو اسٹوریج، کمپیوٹ اور نیٹ ورکنگ کی بنیادی صلاحیتوں کو مربوط کرتا ہے، S3 سے مطابقت رکھتا ہے اور IPFS اور Arweave جیسے غیر مرکزی اسٹوریج نیٹ ورکس پر ہم وقت ساز (synchronous) ڈیٹا اسٹوریج فراہم کرتا ہے۔_**

- [4everland.org](https://www.4everland.org/)
- [دستاویزات](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _کلک بٹن IPFS نوڈز کے ساتھ ایک بلاک چین ایز اے سروس (blockchain-as-a-service) پلیٹ فارم_**

- [Kaleido](https://kaleido.io/)
- [دستاویزات](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron ایک پلیٹ فارم ایز اے سروس (PaaS) ہے جسے ان ڈیپس (dApps) کے لیے ڈیزائن کیا گیا ہے جو بہترین کارکردگی کے ساتھ غیر مرکزی انفراسٹرکچر پر اپنی ایپلیکیشنز لانچ کرنا چاہتے ہیں۔ یہ آؤٹ آف دی باکس کمپیوٹ، غیر مرکزی اسٹوریج، CDN اور ویب ہوسٹنگ فراہم کرتا ہے۔_**

- [spheron.network](https://spheron.network/)
- [دستاویزات](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## مزید مطالعہ {#further-reading}

- [غیر مرکزی اسٹوریج کیا ہے؟](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [غیر مرکزی اسٹوریج کے بارے میں پانچ عام خرافات کا پردہ فاش کرنا](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحہ میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)