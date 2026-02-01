---
title: مقامی، ملٹی کلائنٹ ٹیسٹ نیٹ پر ایک dApp کو کیسے تیار اور ٹیسٹ کیا جائے
description: یہ گائیڈ پہلے آپ کو اس بارے میں بتائے گا کہ کسی dApp کو ڈیپلائے اور ٹیسٹ کرنے کے لیے ٹیسٹ نیٹ کا استعمال کرنے سے پہلے ملٹی کلائنٹ مقامی Ethereum ٹیسٹ نیٹ کو کیسے انسٹینٹیٹ اور کنفیگر کیا جائے۔
author: "Tedi Mitiku"
tags:
  [
    "کلائنٹس",
    "نوڈز",
    "اسمارٹ معاہدات",
    "مرکبیت",
    "کنسینسس لیئر",
    "ایگزیکیوشن لیئر",
    "testing"
  ]
skill: intermediate
lang: ur-in
published: 2023-04-11
---

## تعارف {#introduction}

یہ گائیڈ آپ کو ایک قابل ترتیب مقامی Ethereum ٹیسٹ نیٹ کو انسٹینٹیٹ کرنے، اس پر ایک اسمارٹ کنٹریکٹ ڈیپلائے کرنے، اور آپ کے dApp کے خلاف ٹیسٹ چلانے کے لیے ٹیسٹ نیٹ کا استعمال کرنے کے عمل کے بارے میں بتاتا ہے۔ یہ گائیڈ ان dApp ڈیولپرز کے لیے ڈیزائن کیا گیا ہے جو لائیو ٹیسٹ نیٹ یا مین نیٹ پر ڈیپلائے کرنے سے پہلے اپنے dApps کو مقامی طور پر مختلف نیٹ ورک کنفیگریشنز کے خلاف تیار اور ٹیسٹ کرنا چاہتے ہیں۔

اس گائیڈ میں، آپ:

- [Kurtosis](https://www.kurtosis.com/) کا استعمال کرتے ہوئے [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) کے ساتھ ایک مقامی Ethereum ٹیسٹ نیٹ کو انسٹینٹیٹ کریں،
- اپنے Hardhat dApp ڈیولپمنٹ ماحول کو مقامی ٹیسٹ نیٹ سے جوڑیں تاکہ dApp کو کمپائل، ڈیپلائے اور ٹیسٹ کیا جا سکے، اور
- مقامی ٹیسٹ نیٹ کو کنفیگر کریں، بشمول نوڈس کی تعداد اور مخصوص EL/CL کلائنٹ جوڑی جیسے پیرامیٹرز، تاکہ مختلف نیٹ ورک کنفیگریشنز کے خلاف ڈیولپمنٹ اور ٹیسٹنگ ورک فلوز کو فعال کیا جا سکے۔

### Kurtosis کیا ہے؟ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ایک کمپوزیبل بلڈ سسٹم ہے جو ملٹی کنٹینر ٹیسٹ ماحول کو کنفیگر کرنے کے لیے ڈیزائن کیا گیا ہے۔ یہ خاص طور پر ڈیولپرز کو قابل تولید ماحول بنانے کے قابل بناتا ہے جس کے لیے ڈائنامک سیٹ اپ لاجک کی ضرورت ہوتی ہے، جیسے کہ بلاک چین ٹیسٹ نیٹس۔

اس گائیڈ میں، Kurtosis eth-network-package [`geth`](https://geth.ethereum.org/) ایگزیکیوشن لیئر (EL) کلائنٹ، نیز [`teku`](https://consensys.io/teku)، [`lighthouse`](https://lighthouse.sigmaprime.io/)، اور [`lodestar`](https://lodestar.chainsafe.io/) کنسینسس لیئر (CL) کلائنٹس کے لیے سپورٹ کے ساتھ ایک مقامی Ethereum ٹیسٹ نیٹ اسپن اپ کرتا ہے۔ یہ پیکیج Hardhat Network، Ganache، اور Anvil جیسے فریم ورکس میں نیٹ ورکس کے لیے ایک قابل ترتیب اور کمپوزیبل متبادل کے طور پر کام کرتا ہے۔ Kurtosis ڈیولپرز کو ان کے استعمال کردہ ٹیسٹ نیٹس پر زیادہ کنٹرول اور لچک فراہم کرتا ہے، جو ایک بڑی وجہ ہے کہ [Ethereum فاؤنڈیشن نے The Merge کو ٹیسٹ کرنے کے لیے Kurtosis کا استعمال کیا](https://www.kurtosis.com/blog/testing-the-ethereum-merge) اور نیٹ ورک اپ گریڈ کی جانچ کے لیے اس کا استعمال جاری رکھے ہوئے ہے۔

## Kurtosis سیٹ اپ کرنا {#setting-up-kurtosis}

آگے بڑھنے سے پہلے، یقینی بنائیں کہ آپ کے پاس ہے:

- اپنی مقامی مشین پر [ڈاکر انجن انسٹال اور شروع کیا](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI انسٹال کیا](https://docs.kurtosis.com/install#ii-install-the-cli) (یا اگر آپ کے پاس پہلے سے ہی CLI انسٹال ہے تو اسے تازہ ترین ریلیز میں اپ گریڈ کیا)
- [Node.js](https://nodejs.org/en)، [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)، اور [npx](https://www.npmjs.com/package/npx) انسٹال کیا (آپ کے dApp ماحول کے لیے)

## ایک مقامی Ethereum ٹیسٹ نیٹ کو انسٹینٹیٹ کرنا {#instantiate-testnet}

مقامی Ethereum ٹیسٹ نیٹ کو اسپن اپ کرنے کے لیے، چلائیں:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

نوٹ: یہ کمانڈ `--enclave` فلیگ کا استعمال کرتے ہوئے آپ کے نیٹ ورک کا نام: \"local-eth-testnet\" رکھتا ہے۔

Kurtosis ان اقدامات کو پرنٹ کرے گا جو وہ ہدایات کی تشریح، توثیق، اور پھر عمل درآمد کے لیے پس پردہ اٹھا رہا ہے۔ آخر میں، آپ کو ایک آؤٹ پٹ نظر آنا چاہیے جو درج ذیل سے ملتا جلتا ہو:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

مبارک ہو! آپ نے Docker پر ایک مقامی Ethereum ٹیسٹ نیٹ کو انسٹینٹیٹ کرنے کے لیے Kurtosis کا استعمال کیا، جس میں ایک CL (`lighthouse`) اور EL کلائنٹ (`geth`) ہے۔

### جائزہ {#review-instantiate-testnet}

اس سیکشن میں، آپ نے ایک کمانڈ چلائی جس نے Kurtosis کو ہدایت دی کہ وہ Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) کے اندر ایک مقامی Ethereum ٹیسٹ نیٹ کو اسپن اپ کرنے کے لیے GitHub پر دور سے میزبان [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) کا استعمال کرے۔ اپنے انکلیو کے اندر، آپ کو \"فائل آرٹفیکٹس\" اور \"یوزر سروسز\" دونوں ملیں گے۔

آپ کے انکلیو میں موجود [فائل آرٹفیکٹس](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) میں EL اور CL کلائنٹس کو بوٹسٹریپ کرنے کے لیے تیار اور استعمال ہونے والا تمام ڈیٹا شامل ہے۔ یہ ڈیٹا `prelaunch-data-generator` سروس کا استعمال کرتے ہوئے بنایا گیا تھا جو اس [ڈاکر امیج](https://github.com/ethpandaops/ethereum-genesis-generator) سے بنائی گئی ہے۔

یوزر سروسز آپ کے انکلیو میں کام کرنے والی تمام کنٹینرائزڈ سروسز کو ظاہر کرتی ہیں۔ آپ دیکھیں گے کہ ایک واحد نوڈ بنایا گیا ہے، جس میں ایک EL کلائنٹ اور ایک CL کلائنٹ دونوں شامل ہیں۔

## اپنے dApp ڈیولپمنٹ ماحول کو مقامی Ethereum ٹیسٹ نیٹ سے جوڑیں {#connect-your-dapp}

### dApp ڈیولپمنٹ ماحول سیٹ اپ کریں {#set-up-dapp-env}

اب جب کہ آپ کے پاس ایک چلتا ہوا مقامی ٹیسٹ نیٹ ہے، آپ اپنے dApp ڈیولپمنٹ ماحول کو اپنے مقامی ٹیسٹ نیٹ کو استعمال کرنے کے لیے جوڑ سکتے ہیں۔ اس گائیڈ میں آپ کے مقامی ٹیسٹ نیٹ پر بلیک جیک dApp کو ڈیپلائے کرنے کے لیے Hardhat فریم ورک کا استعمال کیا جائے گا۔

اپنے dApp ڈیولپمنٹ ماحول کو سیٹ اپ کرنے کے لیے، اس ریپوزٹری کو کلون کریں جس میں ہمارا نمونہ dApp ہے اور اس کی انحصاریوں کو انسٹال کریں، چلائیں:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

یہاں استعمال ہونے والا [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) فولڈر [Hardhat](https://hardhat.org/) فریم ورک استعمال کرنے والے dApp ڈیولپر کے لیے عام سیٹ اپ پر مشتمل ہے:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) میں بلیک جیک dApp کے لیے کچھ سادہ اسمارٹ کنٹریکٹس شامل ہیں۔
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) میں آپ کے مقامی Ethereum نیٹ ورک پر ٹوکن کنٹریکٹ ڈیپلائے کرنے کے لیے ایک اسکرپٹ شامل ہے۔
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) میں آپ کے ٹوکن کنٹریکٹ کے لیے ایک سادہ .js ٹیسٹ شامل ہے تاکہ اس بات کی تصدیق کی جا سکے کہ ہمارے بلیک جیک dApp میں ہر کھلاڑی کے لیے 1000 منٹ کیے گئے ہیں۔
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) آپ کے Hardhat سیٹ اپ کو کنفیگر کرتا ہے

### مقامی ٹیسٹ نیٹ استعمال کرنے کے لیے Hardhat کو کنفیگر کریں {#configure-hardhat}

اپنے dApp ڈیولپمنٹ ماحول کے سیٹ اپ کے ساتھ، اب آپ Kurtosis کا استعمال کرتے ہوئے تیار کردہ مقامی Ethereum ٹیسٹ نیٹ کو استعمال کرنے کے لیے Hardhat کو جوڑیں گے۔ اسے پورا کرنے کے لیے، اپنی `hardhat.config.ts` کنفیگ فائل میں `localnet` سٹرکٹ میں `<$YOUR_PORT>` کو کسی بھی `el-client-<num>` سروس سے rpc uri آؤٹ پٹ کے پورٹ سے بدل دیں۔ اس نمونہ کیس میں، پورٹ `64248` ہوگا۔ آپ کا پورٹ مختلف ہوگا۔

`hardhat.config.ts` میں مثال:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT کو ETH نیٹ ورک KURTOSIS پیکیج کے ذریعہ تیار کردہ نوڈ URI کے پورٹ سے تبدیل کریں

// یہ eth-network-package کے ذریعہ بنائے گئے پہلے سے فنڈ شدہ ٹیسٹ اکاؤنٹس سے وابستہ پرائیویٹ کیز ہیں
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

ایک بار جب آپ اپنی فائل محفوظ کر لیتے ہیں، تو آپ کا Hardhat dApp ڈیولپمنٹ ماحول اب آپ کے مقامی Ethereum ٹیسٹ نیٹ سے جڑ جاتا ہے! آپ یہ چلا کر تصدیق کر سکتے ہیں کہ آپ کا ٹیسٹ نیٹ کام کر رہا ہے:

```python
npx hardhat balances --network localnet
```

آؤٹ پٹ کچھ اس طرح نظر آنا چاہئے:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

اس سے تصدیق ہوتی ہے کہ Hardhat آپ کے مقامی ٹیسٹ نیٹ کا استعمال کر رہا ہے اور `eth-network-package` کے ذریعہ بنائے گئے پہلے سے فنڈ شدہ اکاؤنٹس کا پتہ لگاتا ہے۔

### مقامی طور پر اپنے dApp کو ڈیپلائے اور ٹیسٹ کریں {#deploy-and-test-dapp}

dApp ڈیولپمنٹ ماحول کے مقامی Ethereum ٹیسٹ نیٹ سے مکمل طور پر منسلک ہونے کے ساتھ، اب آپ مقامی ٹیسٹ نیٹ کا استعمال کرتے ہوئے اپنے dApp کے خلاف ڈیولپمنٹ اور ٹیسٹنگ ورک فلو چلا سکتے ہیں۔

`ChipToken.sol` اسمارٹ کنٹریکٹ کو مقامی پروٹو ٹائپنگ اور ڈیولپمنٹ کے لیے کمپائل اور ڈیپلائے کرنے کے لیے، چلائیں:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

آؤٹ پٹ کچھ اس طرح نظر آنا چاہئے:

```python
ChipToken ڈیپلائے کیا گیا: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

اب اپنے مقامی dApp کے خلاف `simple.js` ٹیسٹ چلانے کی کوشش کریں تاکہ اس بات کی تصدیق کی جا سکے کہ ہمارے بلیک جیک dApp میں ہر کھلاڑی کے لیے 1000 منٹ کیے گئے ہیں:

آؤٹ پٹ کچھ اس طرح نظر آنا چاہئے:

```python
npx hardhat test --network localnet
```

آؤٹ پٹ کچھ اس طرح نظر آنا چاہئے:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### جائزہ {#review-dapp-workflows}

اس مقام پر، آپ نے اب ایک dApp ڈیولپمنٹ ماحول سیٹ اپ کیا ہے، اسے Kurtosis کے ذریعہ بنائے گئے مقامی Ethereum نیٹ ورک سے جوڑا ہے، اور اپنے dApp کے خلاف ایک سادہ ٹیسٹ کمپائل، ڈیپلائے، اور چلایا ہے۔

اب آئیے دریافت کریں کہ آپ مختلف نیٹ ورک کنفیگریشنز کے تحت ہمارے dApps کی جانچ کے لیے بنیادی نیٹ ورک کو کیسے کنفیگر کر سکتے ہیں۔

## مقامی Ethereum ٹیسٹ نیٹ کو کنفیگر کرنا {#configure-testnet}

### کلائنٹ کنفیگریشنز اور نوڈس کی تعداد کو تبدیل کرنا {#configure-client-config-and-num-nodes}

آپ کا مقامی Ethereum ٹیسٹ نیٹ مختلف EL اور CL کلائنٹ جوڑوں کے ساتھ ساتھ نوڈس کی مختلف تعداد کو استعمال کرنے کے لیے کنفیگر کیا جا سکتا ہے، اس منظر نامے اور مخصوص نیٹ ورک کنفیگریشن پر منحصر ہے جسے آپ تیار یا ٹیسٹ کرنا چاہتے ہیں۔ اس کا مطلب ہے کہ، ایک بار سیٹ اپ ہونے کے بعد، آپ ایک حسب ضرورت مقامی ٹیسٹ نیٹ کو اسپن اپ کر سکتے ہیں اور اسے وہی ورک فلو (ڈیپلائمنٹ، ٹیسٹ، وغیرہ) چلانے کے لیے استعمال کر سکتے ہیں۔ مختلف نیٹ ورک کنفیگریشنز کے تحت یہ یقینی بنانے کے لیے کہ سب کچھ توقع کے مطابق کام کرتا ہے۔ دیگر پیرامیٹرز کے بارے میں مزید جاننے کے لیے جن میں آپ ترمیم کر سکتے ہیں، اس لنک پر جائیں۔

اسے آزمائیں! آپ JSON فائل کے ذریعے `eth-network-package` کو مختلف کنفیگریشن آپشنز پاس کر سکتے ہیں۔ یہ نیٹ ورک پیرامیٹرز JSON فائل وہ مخصوص کنفیگریشنز فراہم کرتی ہے جو Kurtosis مقامی Ethereum نیٹ ورک کو سیٹ اپ کرنے کے لیے استعمال کرے گا۔

ڈیفالٹ کنفیگریشن فائل لیں اور اسے مختلف EL/CL جوڑوں کے ساتھ دو نوڈس کو اسپن اپ کرنے کے لیے ترمیم کریں:

- نوڈ 1 `geth`/`lighthouse` کے ساتھ
- نوڈ 2 `geth`/`lodestar` کے ساتھ
- نوڈ 3 `geth`/`teku` کے ساتھ

یہ کنفیگریشن آپ کے dApp کی جانچ کے لیے Ethereum نوڈ کے نفاذ کا ایک متضاد نیٹ ورک بناتی ہے۔ آپ کی کنفیگریشن فائل اب اس طرح نظر آنی چاہئے:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

ہر `participants` سٹرکٹ نیٹ ورک میں ایک نوڈ سے مطابقت رکھتا ہے، لہذا 3 `participants` سٹرکٹس Kurtosis کو آپ کے نیٹ ورک میں 3 نوڈس کو اسپن اپ کرنے کے لیے کہیں گے۔ ہر `participants` سٹرکٹ آپ کو اس مخصوص نوڈ کے لیے استعمال ہونے والے EL اور CL جوڑے کی وضاحت کرنے کی اجازت دے گا۔

`network_params` سٹرکٹ نیٹ ورک کی ترتیبات کو کنفیگر کرتا ہے جو ہر نوڈ کے لیے جینیسس فائلیں بنانے کے ساتھ ساتھ دیگر ترتیبات جیسے نیٹ ورک کے فی سلاٹ سیکنڈز کے لیے استعمال ہوتی ہیں۔

اپنی ترمیم شدہ پیرامیٹرز فائل کو کسی بھی ڈائرکٹری میں محفوظ کریں جس میں آپ چاہیں (نیچے دی گئی مثال میں، اسے ڈیسک ٹاپ پر محفوظ کیا گیا ہے) اور پھر اسے چلا کر اپنا Kurtosis پیکیج چلائیں:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

نوٹ: `kurtosis clean -a` کمانڈ یہاں Kurtosis کو ہدایت دینے کے لیے استعمال کی جاتی ہے کہ وہ پرانے ٹیسٹ نیٹ اور اس کے مواد کو نیا شروع کرنے سے پہلے تباہ کر دے۔

ایک بار پھر، Kurtosis تھوڑی دیر کے لیے کام کرے گا اور انفرادی اقدامات کو پرنٹ کرے گا جو ہو رہے ہیں۔ آخر کار، آؤٹ پٹ کچھ اس طرح نظر آنا چاہئے:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

مبارک ہو! آپ نے کامیابی سے اپنے مقامی ٹیسٹ نیٹ کو 1 کے بجائے 3 نوڈس رکھنے کے لیے کنفیگر کر لیا ہے۔ اپنے dApp (ڈیپلائے اور ٹیسٹ) کے خلاف وہی ورک فلو چلانے کے لیے جو آپ نے پہلے کیے تھے، وہی آپریشنز انجام دیں جو ہم نے پہلے `<$YOUR_PORT>` کو اپنی `hardhat.config.ts` کنفیگ فائل میں `localnet` سٹرکٹ میں اپنے نئے، 3-نوڈ مقامی ٹیسٹ نیٹ میں کسی بھی `el-client-<num>` سروس سے rpc uri آؤٹ پٹ کے پورٹ سے تبدیل کر کے کیے تھے۔

## نتیجہ {#conclusion}

اور بس! اس مختصر گائیڈ کا خلاصہ کرنے کے لیے، آپ نے:

- Kurtosis کا استعمال کرتے ہوئے Docker پر ایک مقامی Ethereum ٹیسٹ نیٹ بنایا
- اپنے مقامی dApp ڈیولپمنٹ ماحول کو مقامی Ethereum نیٹ ورک سے جوڑا
- مقامی Ethereum نیٹ ورک پر ایک dApp ڈیپلائے کیا اور اس کے خلاف ایک سادہ ٹیسٹ چلایا
- بنیادی Ethereum نیٹ ورک کو 3 نوڈس رکھنے کے لیے کنفیگر کیا

ہم آپ سے یہ سننا پسند کریں گے کہ آپ کے لیے کیا اچھا رہا، کیا بہتر کیا جا سکتا ہے، یا آپ کے کسی بھی سوال کا جواب دینا۔ [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) کے ذریعے رابطہ کرنے یا [ہمیں ای میل](mailto:feedback@kurtosistech.com) کرنے میں ہچکچاہٹ محسوس نہ کریں!

### دیگر مثالیں اور گائیڈز {#other-examples-guides}

ہم آپ کو ہمارے [کوئیک اسٹارٹ](https://docs.kurtosis.com/quickstart) (جہاں آپ سب سے اوپر ایک Postgres ڈیٹا بیس اور API بنائیں گے) اور ہماری [awesome-kurtosis ریپوزٹری](https://github.com/kurtosis-tech/awesome-kurtosis) میں ہماری دیگر مثالیں دیکھنے کی ترغیب دیتے ہیں جہاں آپ کو کچھ بہترین مثالیں ملیں گی، بشمول ان کے لیے پیکیجز:

- [اسی مقامی Ethereum ٹیسٹ نیٹ کو اسپن اپ کرنا](https://github.com/kurtosis-tech/eth2-package)، لیکن اضافی خدمات کے ساتھ جیسے ٹرانزیکشن اسپامر (ٹرانزیکشنز کی تقلید کے لیے)، ایک فورک مانیٹر، اور ایک منسلک Grafana اور Prometheus مثال۔
- اسی مقامی Ethereum نیٹ ورک کے خلاف [سب-نیٹ ورکنگ ٹیسٹ](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) انجام دینا۔
