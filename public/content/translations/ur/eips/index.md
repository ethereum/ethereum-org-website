---
title: "ایتھریم امپروومنٹ پروپوزلز (EIPs)"
description: "EIPs کو سمجھنے کے لیے درکار بنیادی معلومات"
lang: ur
---

# ایتھریم امپروومنٹ پروپوزلز (EIPs) کا تعارف {#introduction-to-ethereum-improvement-proposals}

## EIPs کیا ہیں؟ {#what-are-eips}

[ایتھریم امپروومنٹ پروپوزلز (EIPs)](https://eips.ethereum.org/) وہ معیارات ہیں جو ایتھریم کے لیے ممکنہ نئی خصوصیات یا عمل کی وضاحت کرتے ہیں۔ EIPs میں مجوزہ تبدیلیوں کے لیے تکنیکی تفصیلات شامل ہوتی ہیں اور یہ کمیونٹی کے لیے "سچائی کے ماخذ" (source of truth) کے طور پر کام کرتے ہیں۔ [ایتھریم](/) کے لیے نیٹ ورک اپ گریڈز اور ایپلیکیشن کے معیارات پر EIP کے عمل کے ذریعے تبادلہ خیال اور ترقی کی جاتی ہے۔

ایتھریم کمیونٹی میں کسی کو بھی EIP بنانے کا اختیار حاصل ہے۔ EIPs لکھنے کے لیے رہنما خطوط [EIP-1](https://eips.ethereum.org/EIPS/eip-1) میں شامل ہیں۔ ایک EIP کو بنیادی طور پر تھوڑی سی تحریک (motivation) کے ساتھ ایک جامع تکنیکی تفصیل فراہم کرنی چاہیے۔ EIP کے مصنف کی ذمہ داری ہے کہ وہ کمیونٹی کے اندر اتفاق رائے پیدا کرے اور متبادل آراء کو دستاویزی شکل دے۔ ایک درست اور مکمل EIP جمع کرانے کے لیے درکار اعلیٰ تکنیکی مہارت کے پیش نظر، تاریخی طور پر، زیادہ تر EIP مصنفین عام طور پر ایپلیکیشن یا پروٹوکول ڈیولپرز ہوتے ہیں۔

## EIPs کیوں اہم ہیں؟ {#why-do-eips-matter}

ایتھریم پر تبدیلیاں کیسے رونما ہوتی ہیں اور انہیں کیسے دستاویزی شکل دی جاتی ہے، اس میں EIPs مرکزی کردار ادا کرتے ہیں۔ یہ لوگوں کے لیے تبدیلیاں تجویز کرنے، ان پر بحث کرنے اور انہیں اپنانے کا طریقہ ہیں۔ [EIPs کی مختلف اقسام](https://eips.ethereum.org/EIPS/eip-1#eip-types) ہیں، جن میں نچلی سطح کی پروٹوکول تبدیلیوں کے لیے کور (core) EIPs شامل ہیں جو اتفاق رائے (consensus) کو متاثر کرتی ہیں اور جن کے لیے نیٹ ورک اپ گریڈ کی ضرورت ہوتی ہے جیسے [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)، اور ایپلیکیشن کے معیارات کے لیے ERCs جیسے [EIP-20](https://eips.ethereum.org/EIPS/eip-20) اور [EIP-721](https://eips.ethereum.org/EIPS/eip-721)۔

ہر نیٹ ورک اپ گریڈ EIPs کے ایک سیٹ پر مشتمل ہوتا ہے جسے نیٹ ورک پر موجود ہر [ایتھریم کلائنٹ](/learn/#clients-and-nodes) کے ذریعے لاگو کرنے کی ضرورت ہوتی ہے۔ اس کا مطلب یہ ہے کہ ایتھریم مین نیٹ (Mainnet) پر دیگر کلائنٹس کے ساتھ اتفاق رائے میں رہنے کے لیے، کلائنٹ ڈیولپرز کو یہ یقینی بنانا ہوگا کہ انہوں نے تمام مطلوبہ EIPs کو لاگو کر دیا ہے۔

تبدیلیوں کے لیے تکنیکی تفصیلات فراہم کرنے کے ساتھ ساتھ، EIPs وہ اکائی ہیں جس کے گرد ایتھریم میں گورننس ہوتی ہے: کوئی بھی اسے تجویز کرنے کے لیے آزاد ہے، اور پھر کمیونٹی کے مختلف اسٹیک ہولڈرز اس بات کا تعین کرنے کے لیے بحث کریں گے کہ آیا اسے ایک معیار کے طور پر اپنایا جانا چاہیے یا نیٹ ورک اپ گریڈ میں شامل کیا جانا چاہیے۔ چونکہ نان کور (non-core) EIPs کو تمام ایپلیکیشنز کے ذریعے اپنانا ضروری نہیں ہے (مثال کے طور پر، ایک ایسا فنجیبل ٹوکن بنانا ممکن ہے جو EIP-20 کو لاگو نہ کرے)، لیکن کور (core) EIPs کو وسیع پیمانے پر اپنایا جانا چاہیے (کیونکہ تمام نوڈز کو ایک ہی نیٹ ورک کا حصہ رہنے کے لیے اپ گریڈ کرنا ضروری ہے)، اس لیے کور EIPs کو نان کور EIPs کی نسبت کمیونٹی کے اندر وسیع تر اتفاق رائے کی ضرورت ہوتی ہے۔

## EIPs کی تاریخ {#history-of-eips}

[ایتھریم امپروومنٹ پروپوزلز (EIPs) گٹ ہب (GitHub) ریپوزٹری](https://github.com/ethereum/EIPs) اکتوبر ۲۰۱۵ میں بنائی گئی تھی۔ EIP کا عمل [بٹ کوائن امپروومنٹ پروپوزلز (BIPs)](https://github.com/bitcoin/bips) کے عمل پر مبنی ہے، جو خود [پائتھون انہانسمنٹ پروپوزلز (PEPs)](https://www.python.org/dev/peps/) کے عمل پر مبنی ہے۔

EIP ایڈیٹرز کو تکنیکی درستگی، فارمیٹنگ کے مسائل، اور ہجے، گرامر، اور کوڈ اسٹائل کو درست کرنے کے لیے EIPs کا جائزہ لینے کا کام سونپا گیا ہے۔ مارٹن بیکزے (Martin Becze)، وٹالک بوٹیرن (Vitalik Buterin)، گیون ووڈ (Gavin Wood)، اور کچھ دیگر افراد ۲۰۱۵ سے ۲۰۱۶ کے اواخر تک اصل EIP ایڈیٹرز تھے۔

موجودہ EIP ایڈیٹرز یہ ہیں:

- ایلکس بیریگسزازی (Alex Beregszaszi) (@axic)
- گیون جان (Gavin John) (@Pandapip1)
- گریگ کولون (Greg Colvin) (@gcolvin)
- میٹ گارنیٹ (Matt Garnett) (@lightclient)
- سیم ولسن (Sam Wilson) (@SamWilsn)

سابق (Emeritus) EIP ایڈیٹرز یہ ہیں:

- کیسی ڈیٹریو (Casey Detrio) (@cdetrio)
- ہڈسن جیمیسن (Hudson Jameson) (@Souptacular)
- مارٹن بیکزے (Martin Becze) (@wanderer)
- میکاہ زولٹو (Micah Zoltu) (@MicahZoltu)
- نک جانسن (Nick Johnson) (@arachnid)
- نک سیورز (Nick Savers) (@nicksavers)
- وٹالک بوٹیرن (Vitalik Buterin) (@vbuterin)

اگر آپ EIP ایڈیٹر بننا چاہتے ہیں، تو براہ کرم [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069) دیکھیں۔

EIP ایڈیٹرز یہ فیصلہ کرتے ہیں کہ کوئی تجویز کب EIP بننے کے لیے تیار ہے، اور EIP مصنفین کو اپنی تجاویز کو آگے بڑھانے میں مدد کرتے ہیں۔ [ایتھریم کیٹ ہرڈرز (Ethereum Cat Herders)](https://www.ethereumcatherders.com/) EIP ایڈیٹرز اور کمیونٹی کے درمیان میٹنگز منعقد کرنے میں مدد کرتے ہیں (دیکھیں [EIPIP](https://github.com/ethereum-cat-herders/EIPIP))۔

چارٹ کے ساتھ مکمل معیاری کاری (standardization) کا عمل [EIP-1](https://eips.ethereum.org/EIPS/eip-1) میں بیان کیا گیا ہے۔

## مزید جانیں {#learn-more}

اگر آپ EIPs کے بارے میں مزید پڑھنے میں دلچسپی رکھتے ہیں، تو [EIPs کی ویب سائٹ](https://eips.ethereum.org/) اور [EIP-1](https://eips.ethereum.org/EIPS/eip-1) دیکھیں۔ یہاں کچھ مفید لنکس ہیں:

- [ہر ایتھریم امپروومنٹ پروپوزل کی فہرست](https://eips.ethereum.org/all)
- [تمام EIP اقسام کی تفصیل](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [تمام EIP اسٹیٹس کی تفصیل](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### کمیونٹی کے تعلیمی پروجیکٹس {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP ایک تعلیمی ویڈیو سیریز ہے جو ایتھریم امپروومنٹ پروپوزلز (EIPs) اور آنے والے اپ گریڈز کی اہم خصوصیات پر بحث کرتی ہے۔*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf ایتھریم امپروومنٹ پروپوزلز (EIPs) کے لیے اضافی معلومات فراہم کرتا ہے، بشمول ان کا اسٹیٹس، نفاذ کی تفصیلات، متعلقہ پل ریکوئسٹس (pull requests)، اور کمیونٹی کی رائے۔* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun ایتھریم امپروومنٹ پروپوزلز (EIPs) پر تازہ ترین خبریں، EIP میٹنگز پر اپ ڈیٹس، اور بہت کچھ فراہم کرتا ہے۔*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight مختلف ذرائع سے جمع کی گئی معلومات کے مطابق ایتھریم امپروومنٹ پروپوزلز (EIPs) کے عمل اور اعداد و شمار کی حالت کی نمائندگی کرتا ہے۔*

## حصہ لیں {#participate}

کوئی بھی EIP بنا سکتا ہے۔ کوئی بھی تجویز جمع کرانے سے پہلے، [EIP-1](https://eips.ethereum.org/EIPS/eip-1) کو ضرور پڑھنا چاہیے جو EIP کے عمل اور EIP لکھنے کے طریقے کا خاکہ پیش کرتا ہے، اور [Ethereum Magicians](https://ethereum-magicians.org/) پر رائے طلب کرنی چاہیے، جہاں ڈرافٹ جمع کرانے سے پہلے کمیونٹی کے ساتھ تجاویز پر ابتدائی بحث کی جاتی ہے۔

## حوالہ جات {#references}

<cite class="citation">

صفحے کا کچھ مواد ہڈسن جیمیسن (Hudson Jameson) کے [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) سے فراہم کیا گیا ہے۔

</cite>