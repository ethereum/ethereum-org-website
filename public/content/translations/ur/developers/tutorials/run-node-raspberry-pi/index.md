---
title: "⁦Raspberry Pi 5⁩ پر ایک ایتھیریم نوڈ چلائیں"
description: "اپنے ⁦Raspberry Pi 5⁩ کو فلیش کریں، ایتھرنیٹ کیبل لگائیں، ⁦NVMe⁩ ڈسک کو جوڑیں اور ڈیوائس کو آن کریں تاکہ ⁦Raspberry Pi 5⁩ کو ایک مکمل ایتھیریم نوڈ + توثیق کار میں تبدیل کیا جا سکے۔"
author: "ایتھیریم آن آرم"
tags: ["کلائنٹس", "ایگزیکیوشن لیئر", "اتفاق رائے کی لیئر", "نوڈز"]
lang: ur
skill: intermediate
breadcrumb: "⁦Rasp Pi⁩ نوڈ"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**<span dir="ltr">Ethereum on Arm</span> ایک کسٹم <span dir="ltr">Linux</span> امیج ہے جو <span dir="ltr">Raspberry Pi</span> کو ایتھیریم نوڈ میں تبدیل کر سکتا ہے۔**

<span dir="ltr">Ethereum on Arm</span> کا استعمال کرتے ہوئے <span dir="ltr">Raspberry Pi</span> کو ایتھیریم نوڈ میں تبدیل کرنے کے لیے، درج ذیل ہارڈویئر کی سفارش کی جاتی ہے:

- <span dir="ltr">16 GB RAM</span> کے ساتھ <span dir="ltr">Raspberry Pi 5</span>
- <span dir="ltr">Raspberry Pi 5</span> کے لیے ایک <span dir="ltr">NVMe HAT</span>، تاکہ <span dir="ltr">NVMe</span> ڈسک کو جوڑا جا سکے
- <span dir="ltr">NVMe SSD (M.2 2280)</span>، کم از کم <span dir="ltr">4 TB</span>۔ <span dir="ltr">Phison</span> کنٹرولر والی ڈسکس سے گریز کریں، جن میں مطابقت کے معلوم مسائل ہیں۔
- مائیکرو ایس ڈی کارڈ (کم از کم <span dir="ltr">16 GB Class 10</span>)
- پاور سپلائی
- ایتھرنیٹ کیبل
- پورٹ فارورڈنگ (مزید معلومات کے لیے کلائنٹس دیکھیں)
- ہیٹ سنک کے ساتھ ایک کیس
- <span dir="ltr">USB</span> کی بورڈ، مانیٹر اور <span dir="ltr">HDMI</span> کیبل (<span dir="ltr">micro-HDMI</span>) (اختیاری)

<span dir="ltr">Ethereum on Arm</span> دیگر <span dir="ltr">ARM</span> بورڈز کو بھی سپورٹ کرتا ہے، جیسے کہ <span dir="ltr">NanoPC T6</span>، <span dir="ltr">Rock 5B</span>، اور <span dir="ltr">Orange Pi 5 Plus</span>۔ ان بورڈز میں مقامی <span dir="ltr">NVMe</span> سپورٹ موجود ہے، اس لیے اگر آپ نیا ہارڈویئر خرید رہے ہیں تو <span dir="ltr">Ethereum on Arm</span> ٹیم انہیں <span dir="ltr">Raspberry Pi 5</span> پر ترجیح دیتی ہے۔ تفصیلات کے لیے [تجویز کردہ ہارڈویئر کی فہرست](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) دیکھیں۔ اس ٹیوٹوریل کا باقی حصہ تمام سپورٹڈ بورڈز کے لیے یکساں ہے، سوائے اس امیج فائل کے جو آپ ڈاؤن لوڈ کرتے ہیں۔

## <span dir="ltr">ARM</span> پر ایتھیریم کیوں چلائیں؟ {#why-run-ethereum-on-arm}

<span dir="ltr">ARM</span> بورڈز بہت سستے، لچکدار، اور چھوٹے کمپیوٹرز ہیں۔ یہ ایتھیریم نوڈز چلانے کے لیے بہترین انتخاب ہیں کیونکہ انہیں سستے داموں خریدا جا سکتا ہے، اس طرح کنفیگر کیا جا سکتا ہے کہ ان کے تمام وسائل صرف نوڈ پر مرکوز ہوں، جس سے وہ موثر بنتے ہیں، وہ کم بجلی استعمال کرتے ہیں اور جسمانی طور پر چھوٹے ہوتے ہیں اس لیے وہ کسی بھی گھر میں آسانی سے فٹ ہو سکتے ہیں۔ نوڈز کو شروع کرنا بھی بہت آسان ہے کیونکہ <span dir="ltr">Raspberry Pi</span> کے مائیکرو ایس ڈی کو آسانی سے پہلے سے بنے ہوئے امیج کے ساتھ فلیش کیا جا سکتا ہے، جس میں کوئی سافٹ ویئر ڈاؤن لوڈ کرنے یا بنانے کی ضرورت نہیں ہوتی۔

## یہ کیسے کام کرتا ہے؟ {#how-does-it-work}

<span dir="ltr">Raspberry Pi</span> کے میموری کارڈ کو پہلے سے بنے ہوئے امیج کے ساتھ فلیش کیا جاتا ہے۔ اس امیج میں ایتھیریم نوڈ چلانے کے لیے درکار ہر چیز موجود ہوتی ہے۔ فلیش شدہ کارڈ کے ساتھ، صارف کو صرف <span dir="ltr">Raspberry Pi</span> کو آن کرنا ہوتا ہے۔ نوڈ کو چلانے کے لیے درکار تمام پروسیسز خود بخود شروع ہو جاتے ہیں۔ یہ اس لیے کام کرتا ہے کیونکہ میموری کارڈ میں <span dir="ltr">Linux</span> پر مبنی آپریٹنگ سسٹم (<span dir="ltr">OS</span>) ہوتا ہے جس کے اوپر سسٹم لیول کے پروسیسز خود بخود چلتے ہیں جو یونٹ کو ایتھیریم نوڈ میں تبدیل کر دیتے ہیں۔

<span dir="ltr">Ethereum on Arm</span> امیجز ایک <span dir="ltr">64-bit Linux</span> ڈسٹری بیوشن پر مبنی ہیں جو ایتھیریم نوڈ چلانے کے لیے آپٹمائزڈ ہے، اور ان میں پہلے سے بنے ہوئے ایتھیریم کلائنٹس شامل ہیں۔

**امیجز تمام ضروری اقدامات کا خیال رکھتے ہیں**، ماحول کو ترتیب دینے اور <span dir="ltr">NVMe</span> ڈسک کو فارمیٹ کرنے سے لے کر ایتھیریم سافٹ ویئر انسٹال کرنے تک۔

## ایگزیکیوشن اور اتفاقِ رائے کے کلائنٹس پر نوٹ {#note-on-execution-and-consensus-clients}

<span dir="ltr">Ethereum on Arm</span> امیج میں پہلے سے بنے ہوئے ایگزیکیوشن کلائنٹ اور اتفاقِ رائے کا کلائنٹ بطور سروسز شامل ہیں۔ ایک ایتھیریم نوڈ کے لیے دونوں کلائنٹس کا ہم آہنگی میں ہونا اور چلنا ضروری ہے۔ آپ کو صرف امیج ڈاؤن لوڈ اور فلیش کرنے اور پھر سروسز شروع کرنے کی ضرورت ہے۔ امیج میں کئی ایگزیکیوشن کلائنٹس (جیسے <span dir="ltr">Geth</span>، <span dir="ltr">Nethermind</span>، <span dir="ltr">Besu</span>، <span dir="ltr">Erigon</span>، اور <span dir="ltr">Reth</span>) اور اتفاقِ رائے کے کلائنٹس (جیسے <span dir="ltr">Lighthouse</span>، <span dir="ltr">Prysm</span>، <span dir="ltr">Teku</span>، <span dir="ltr">Nimbus</span>، اور <span dir="ltr">Lodestar</span>) پہلے سے لوڈ ہوتے ہیں۔ موجودہ فہرست کے لیے [<span dir="ltr">Ethereum on Arm</span> کی دستاویزات](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) دیکھیں۔

آپ کو چلانے کے لیے ہر ایک میں سے ایک کا انتخاب کرنا چاہیے - تمام ایگزیکیوشن کلائنٹس تمام اتفاقِ رائے کے کلائنٹس کے ساتھ مطابقت رکھتے ہیں۔ یہ ٹیوٹوریل <span dir="ltr">Geth</span> اور <span dir="ltr">Lighthouse</span> کا استعمال کرتا ہے۔

## امیج ڈاؤن لوڈ کرنا {#downloading-the-image}

<span dir="ltr">Ethereum on Arm</span> امیج ایک "پلگ اینڈ پلے" امیج ہے جو خود بخود ایگزیکیوشن کلائنٹ اور اتفاقِ رائے کا کلائنٹ دونوں کو انسٹال اور سیٹ اپ کرتا ہے، انہیں ایک دوسرے سے بات کرنے اور ایتھیریم نیٹ ورک سے جڑنے کے لیے کنفیگر کرتا ہے۔ صارف کو صرف ایک سادہ کمانڈ کا استعمال کرتے ہوئے ان کے پروسیسز کو شروع کرنے کی ضرورت ہے۔

اپنے بورڈ کے لیے تازہ ترین امیج [<span dir="ltr">Ethereum on Arm</span> کے ڈاؤن لوڈ صفحہ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads) سے ڈاؤن لوڈ کریں۔ ڈاؤن لوڈ صفحہ ہر امیج کا <span dir="ltr">SHA256</span> چیک سم بھی درج کرتا ہے۔ ڈاؤن لوڈ کی گئی فائل کی اس سے تصدیق کریں:

```sh
# ڈاؤن لوڈ کی گئی امیج والی ڈائریکٹری سے
sha256sum ethonarm_rpi5_<version>.img.zip
# آؤٹ پٹ کا ڈاؤن لوڈ پیج پر موجود چیک سم سے موازنہ کریں
```

## مائیکرو ایس ڈی کو فلیش کرنا {#flashing-the-microsd}

<span dir="ltr">Raspberry Pi</span> کے لیے استعمال ہونے والے مائیکرو ایس ڈی کارڈ کو پہلے ڈیسک ٹاپ یا لیپ ٹاپ میں داخل کیا جانا چاہیے تاکہ اسے فلیش کیا جا سکے۔ پھر، درج ذیل ٹرمینل کمانڈز ڈاؤن لوڈ کیے گئے امیج کو ایس ڈی کارڈ پر فلیش کر دیں گی:

```shell
# MicroSD کارڈ کا نام چیک کریں
sudo fdisk -l

>> sdxxx
```

نام کو درست کرنا واقعی اہم ہے کیونکہ اگلی کمانڈ میں `dd` شامل ہے جو امیج کو اس پر پش کرنے سے پہلے کارڈ کے موجودہ مواد کو مکمل طور پر مٹا دیتا ہے۔ جاری رکھنے کے لیے، زپ شدہ امیج پر مشتمل ڈائرکٹری میں جائیں:

```shell
# امیج کو ان زپ اور فلیش کریں
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

کارڈ اب فلیش ہو چکا ہے، اس لیے اسے <span dir="ltr">Raspberry Pi</span> میں داخل کیا جا سکتا ہے۔

## نوڈ شروع کریں {#start-the-node}

<span dir="ltr">Raspberry Pi</span> میں ایس ڈی کارڈ داخل کرنے کے بعد، ایتھرنیٹ کیبل اور <span dir="ltr">NVMe</span> ڈسک کو جوڑیں اور پھر پاور آن کریں۔ <span dir="ltr">OS</span> بوٹ ہو جائے گا اور خود بخود پہلے سے کنفیگر کیے گئے کام انجام دینا شروع کر دے گا جو <span dir="ltr">Raspberry Pi</span> کو ایتھیریم نوڈ میں تبدیل کرتے ہیں، بشمول <span dir="ltr">NVMe</span> ڈسک کو فارمیٹ کرنا اور کلائنٹ سافٹ ویئر انسٹال کرنا۔ اس میں ممکنہ طور پر <span dir="ltr">10-15</span> منٹ لگیں گے، اور کام مکمل ہونے پر بورڈ خود بخود ریبوٹ ہو جاتا ہے۔ اس دوران پاور سپلائی میں خلل نہ ڈالیں۔

ایک بار جب سب کچھ انسٹال اور کنفیگر ہو جائے، تو <span dir="ltr">ssh</span> کنکشن کے ذریعے ڈیوائس میں لاگ ان کریں یا اگر بورڈ کے ساتھ مانیٹر اور کی بورڈ منسلک ہے تو براہ راست ٹرمینل کا استعمال کریں۔ لاگ ان کرنے کے لیے `ethereum` اکاؤنٹ کا استعمال کریں، کیونکہ اس کے پاس نوڈ شروع کرنے کے لیے درکار اجازتیں ہیں۔

```shell
User: ethereum
Password: ethereum
```

آپ کے پہلے لاگ ان پر آپ سے ڈیفالٹ پاس ورڈ تبدیل کرنے کو کہا جائے گا۔ اسے تبدیل کریں، کیونکہ بصورت دیگر کوئی بھی شخص جو آپ کے نوڈ تک پہنچ سکتا ہے وہ ڈیفالٹ پاس ورڈ کے ساتھ لاگ ان کر سکتا ہے۔ سسٹم فائر وال ڈیفالٹ طور پر غیر فعال ہے، لہذا اگر آپ کے نوڈ کا پبلک <span dir="ltr">IP</span> پتہ ہے، تو اسے فعال کرنے کے لیے [<span dir="ltr">Ethereum on Arm</span> کی سیکیورٹی گائیڈ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) دیکھیں۔

پہلے اتفاقِ رائے کا کلائنٹ شروع کریں۔ اپنے راؤٹر پر پورٹ <span dir="ltr">9000</span> (<span dir="ltr">TCP</span> اور <span dir="ltr">UDP</span>) کھولیں تاکہ <span dir="ltr">Lighthouse</span> ہم منصبوں کو تلاش کر سکے اور ان سے جڑ سکے۔ پھر <span dir="ltr">lighthouse</span> سروس کو فعال اور شروع کریں، تاکہ یہ ریبوٹ کے بعد بھی دوبارہ شروع ہو جائے:

```sh
sudo systemctl enable --now lighthouse-beacon
```

لاگز کا استعمال کرتے ہوئے کلائنٹ کو چیک کریں:

```sh
sudo journalctl -u lighthouse-beacon -f
```

اس کے بعد، ایگزیکیوشن کلائنٹ شروع کریں۔ اپنے راؤٹر پر پورٹ <span dir="ltr">30303</span> (<span dir="ltr">TCP</span> اور <span dir="ltr">UDP</span>) کھولیں تاکہ <span dir="ltr">Geth</span> ہم منصبوں کو تلاش کر سکے اور ان سے جڑ سکے۔ پھر <span dir="ltr">geth</span> سروس کو فعال اور شروع کریں:

```sh
sudo systemctl enable --now geth
```

آپ لاگز چیک کر کے اس کے چلنے کی تصدیق کر سکتے ہیں:

```sh
sudo journalctl -u geth -f
```

نوٹ کریں کہ اتفاقِ رائے کا کلائنٹ چند منٹوں میں ہم آہنگی پیدا کر لے گا کیونکہ یہ چیک پوائنٹ ہم آہنگی کا استعمال کرتا ہے۔ ایگزیکیوشن کلائنٹ میں زیادہ وقت لگے گا - ممکنہ طور پر کئی گھنٹے۔ دونوں کلائنٹس ایک ہی وقت میں چلتے ہیں: اتفاقِ رائے کا کلائنٹ ایگزیکیوشن کلائنٹ کو بتاتا ہے کہ کون سا بلاک چین کا ہیڈ ہے، اور ایگزیکیوشن کلائنٹ اس تک کے بلاکس کو ڈاؤن لوڈ اور تصدیق کرتا ہے۔

<span dir="ltr">Geth</span> اور <span dir="ltr">Lighthouse</span> سروسز کے چلنے اور ہم آہنگی کے ساتھ، آپ کا <span dir="ltr">Raspberry Pi</span> اب ایک ایتھیریم نوڈ ہے! ایتھیریم نیٹ ورک کے ساتھ تعامل کرنے کا سب سے عام طریقہ <span dir="ltr">Geth</span> کے <span dir="ltr">JavaScript</span> کنسول کا استعمال کرنا ہے، جسے پورٹ <span dir="ltr">8545</span> پر <span dir="ltr">Geth</span> کلائنٹ کے ساتھ منسلک کیا جا سکتا ہے۔ <span dir="ltr">Curl</span> جیسے ریکوئسٹ ٹول کا استعمال کرتے ہوئے <span dir="ltr">JSON</span> آبجیکٹس کے طور پر فارمیٹ کی گئی کمانڈز جمع کرانا بھی ممکن ہے۔ مزید معلومات کے لیے [<span dir="ltr">Geth</span> کی دستاویزات](https://geth.ethereum.org/) دیکھیں۔

امیج میں ایک <span dir="ltr">Grafana</span> ڈیش بورڈ بھی شامل ہے جسے زیادہ جدید صارفین براؤزر میں `ipaddress:3000` پر جا کر اپنے نوڈ کی صحت کی نگرانی کے لیے استعمال کر سکتے ہیں۔

## توثیق کار {#validators}

اتفاقِ رائے کے کلائنٹ میں اختیاری طور پر ایک توثیق کار بھی شامل کیا جا سکتا ہے۔ توثیق کار سافٹ ویئر آپ کے نوڈ کو اتفاق رائے میں فعال طور پر حصہ لینے کی اجازت دیتا ہے اور نیٹ ورک کو کرپٹو اکنامک سیکیورٹی فراہم کرتا ہے۔ آپ کو اس کام کے لیے <span dir="ltr">ETH</span> میں انعام دیا جاتا ہے۔ توثیق کار چلانے کے لیے، آپ کے پاس پہلے <span dir="ltr">32 ETH</span> ہونے چاہئیں، جنہیں ڈپازٹ کنٹریکٹ میں جمع کرانا ضروری ہے۔ ڈپازٹ [لانچ پیڈ](https://launchpad.ethereum.org/) پر مرحلہ وار گائیڈ پر عمل کر کے کیا جا سکتا ہے۔ یہ کام ڈیسک ٹاپ/لیپ ٹاپ پر کریں، لیکن کیز (keys) نہ بنائیں — یہ براہ راست <span dir="ltr">Raspberry Pi</span> پر کیا جا سکتا ہے۔

[<span dir="ltr">ethstaker-deposit-cli</span>](https://github.com/ethstaker/ethstaker-deposit-cli) ٹول توثیق کار کیز بناتا ہے۔ موجودہ امیجز میں یہ شامل ہے؛ اگر آپ پرانا امیج چلا رہے ہیں، تو پہلے اسے انسٹال کریں۔ پھر ڈپازٹ کیز بنائیں، `<YOUR_ETH_ADDRESS>` کو اس پتے سے تبدیل کریں جسے آپ کی رقوم کی واپسی (withdrawals) موصول ہونی چاہیے:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(یا ایئر گیپڈ مشین پر چلانے کے لیے [<span dir="ltr">ethstaker-deposit-cli</span>](https://github.com/ethstaker/ethstaker-deposit-cli) ڈاؤن لوڈ کریں، اور وہاں `deposit new-mnemonic` کمانڈ چلائیں)

میمونک فریز (mnemonic phrase) کو محفوظ رکھیں! مندرجہ بالا کمانڈ نے `validator_keys` ڈائرکٹری میں دو فائلیں بنائیں: توثیق کار کیز اور ایک ڈپازٹ ڈیٹا فائل۔ ڈپازٹ ڈیٹا کو لانچ پیڈ میں اپ لوڈ کرنے کی ضرورت ہے، اس لیے اسے <span dir="ltr">Raspberry Pi</span> سے ڈیسک ٹاپ/لیپ ٹاپ پر کاپی کرنا ضروری ہے۔ یہ <span dir="ltr">ssh</span> کنکشن یا کسی دوسرے کاپی/پیسٹ طریقہ کا استعمال کرتے ہوئے کیا جا سکتا ہے۔

ایک بار جب ڈپازٹ ڈیٹا فائل لانچ پیڈ چلانے والے کمپیوٹر پر دستیاب ہو جائے، تو اسے لانچ پیڈ اسکرین پر `+` پر ڈریگ اور ڈراپ کیا جا سکتا ہے۔ ڈپازٹ کنٹریکٹ میں ٹرانزیکشن بھیجنے کے لیے اسکرین پر دی گئی ہدایات پر عمل کریں۔

واپس <span dir="ltr">Raspberry Pi</span> پر، ایک توثیق کار شروع کیا جا سکتا ہے۔ اس کے لیے توثیق کار کیز کو امپورٹ کرنا، انعامات جمع کرنے کے لیے پتہ سیٹ کرنا، اور پھر پہلے سے کنفیگر شدہ توثیق کار پروسیس کو شروع کرنا ضروری ہے۔ ذیل کی مثال <span dir="ltr">Lighthouse</span> کے لیے ہے—دیگر اتفاقِ رائے کے کلائنٹس کے لیے ہدایات [<span dir="ltr">Ethereum on Arm</span> کی دستاویزات](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html) پر دستیاب ہیں:

```shell
# توثیق کار کی کیز امپورٹ کریں
lighthouse account validator import --directory=/home/ethereum/validator_keys

# انعام کا پتہ سیٹ کریں (<YOUR_ETH_ADDRESS> کو اپنے پتے سے تبدیل کریں)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# توثیق کار کو شروع کریں
sudo systemctl enable --now lighthouse-validator
```

مبارک ہو، اب آپ کے پاس <span dir="ltr">Raspberry Pi</span> پر ایک مکمل ایتھیریم نوڈ اور توثیق کار چل رہا ہے!

## مزید تفصیلات {#more-details}

اس صفحہ نے <span dir="ltr">Raspberry Pi</span> کا استعمال کرتے ہوئے گیتھ-لائٹ ہاؤس نوڈ اور توثیق کار کو ترتیب دینے کے طریقہ کار کا جائزہ پیش کیا۔ مزید تفصیلی ہدایات [ایتھیریم آن آرم ویب سائٹ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) پر دستیاب ہیں۔

## آراء کی تعریف کی جاتی ہے {#feedback-appreciated}

ہم جانتے ہیں کہ <span dir="ltr">Raspberry Pi</span> کا ایک بہت بڑا یوزر بیس ہے جو ایتھیریم نیٹ ورک کی صحت پر بہت مثبت اثر ڈال سکتا ہے۔
براہ کرم اس ٹیوٹوریل کی تفصیلات میں جائیں، ٹیسٹ نیٹس پر چلانے کی کوشش کریں، [<span dir="ltr">Ethereum on Arm GitHub</span>](https://github.com/EOA-Blockchain-Labs/ethereumonarm) کو چیک کریں، فیڈ بیک دیں، مسائل (issues) اور پل ریکوئسٹس (pull requests) اٹھائیں اور ٹیکنالوجی اور دستاویزات کو آگے بڑھانے میں مدد کریں!

## حوالہ جات {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
