---
title: اسمارٹ کنٹریکٹس کی تعیناتی
description: ایتھریم نیٹ ورکس پر اسمارٹ کنٹریکٹس کو تعینات کرنے کا طریقہ سیکھیں، جس میں شرائط، ٹولز، اور تعیناتی کے مراحل شامل ہیں۔
lang: ur-in
---

آپ کو اپنے اسمارٹ کنٹریکٹ کو تعینات کرنے کی ضرورت ہے تاکہ یہ ایتھریم نیٹ ورک کے صارفین کے لیے دستیاب ہو سکے۔

اسمارٹ کنٹریکٹ کو تعینات کرنے کے لیے، آپ صرف ایک ایتھریم ٹرانزیکشن بھیجتے ہیں جس میں اسمارٹ کنٹریکٹ کا کمپائل شدہ کوڈ شامل ہوتا ہے، بغیر کسی وصول کنندہ کی وضاحت کیے۔

## شرائط {#prerequisites}

اسمارٹ کنٹریکٹس کو تعینات کرنے سے پہلے آپ کو [ایتھریم نیٹ ورکس](/developers/docs/networks/)، [ٹرانزیکشنز](/developers/docs/transactions/) اور [اسمارٹ کنٹریکٹس کی اناٹومی](/developers/docs/smart-contracts/anatomy/) کو سمجھنا چاہیے۔

کنٹریکٹ کی تعیناتی میں ایتھر (ETH) بھی خرچ ہوتا ہے کیونکہ وہ بلاک چین پر محفوظ ہوتے ہیں، لہذا آپ کو ایتھریم پر [گیس اور فیس](/developers/docs/gas/) سے واقف ہونا چاہیے۔

آخر میں، آپ کو اپنے کنٹریکٹ کو تعینات کرنے سے پہلے اسے کمپائل کرنے کی ضرورت ہوگی، لہذا یقینی بنائیں کہ آپ نے [اسمارٹ کنٹریکٹس کی کمپائلنگ](/developers/docs/smart-contracts/compiling/) کے بارے میں پڑھا ہے۔

## اسمارٹ کنٹریکٹ کو کیسے تعینات کریں {#how-to-deploy-a-smart-contract}

### آپ کو کن چیزوں کی ضرورت ہوگی {#what-youll-need}

- آپ کے کنٹریکٹ کا بائٹ کوڈ – یہ [کمپائلیشن](/developers/docs/smart-contracts/compiling/) کے ذریعے تیار کیا جاتا ہے
- گیس کے لیے ETH – آپ دیگر ٹرانزیکشنز کی طرح اپنی گیس کی حد مقرر کریں گے، لہذا آگاہ رہیں کہ کنٹریکٹ کی تعیناتی میں ایک سادہ ETH ٹرانسفر کے مقابلے بہت زیادہ گیس کی ضرورت ہوتی ہے۔
- ایک تعیناتی اسکرپٹ یا پلگ ان
- [ایتھریم نوڈ](/developers/docs/nodes-and-clients/) تک رسائی، یا تو اپنا خود چلا کر، عوامی نوڈ سے جڑ کر، یا [نوڈ سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) کا استعمال کرتے ہوئے API کلید کے ذریعے۔

### اسمارٹ کنٹریکٹ تعینات کرنے کے مراحل {#steps-to-deploy}

شامل مخصوص مراحل زیر بحث ڈیولپمنٹ فریم ورک پر منحصر ہوں گے۔ مثال کے طور پر، آپ [اپنے کنٹریکٹس کو تعینات کرنے سے متعلق Hardhat کی دستاویزات](https://hardhat.org/docs/tutorial/deploying) یا [اسمارٹ کنٹریکٹ کو تعینات کرنے اور اس کی تصدیق کرنے سے متعلق Foundry کی دستاویزات](https://book.getfoundry.sh/forge/deploying) دیکھ سکتے ہیں۔ ایک بار تعینات ہونے کے بعد، آپ کے کنٹریکٹ کا دیگر [اکاؤنٹس](/developers/docs/accounts/) کی طرح ایک ایتھریم پتہ ہوگا اور اس کی تصدیق [سورس کوڈ کی تصدیق کے ٹولز](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) کا استعمال کرکے کی جاسکتی ہے۔

## متعلقہ ٹولز {#related-tools}

**Remix - _Remix IDE ایتھریم جیسے بلاک چینز کے لیے اسمارٹ کنٹریکٹس کو ڈیولپ کرنے، تعینات کرنے اور ان کا انتظام کرنے کی اجازت دیتا ہے_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 ڈیولپمنٹ پلیٹ فارم جو اسمارٹ کنٹریکٹس کو ڈیولپ کرنے، ٹیسٹ کرنے، مانیٹر کرنے اور چلانے کے لیے ڈیبگنگ، آبزرویبلٹی اور انفراسٹرکچر بلڈنگ بلاکس فراہم کرتا ہے_**

- [tenderly.co](https://tenderly.co/)
- [دستاویزات](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _آپ کے ایتھریم سافٹ ویئر کو کمپائل کرنے، تعینات کرنے، ٹیسٹ کرنے اور ڈیبگ کرنے کا ایک ڈیولپمنٹ ماحول_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [اپنے کنٹریکٹس کو تعینات کرنے سے متعلق دستاویزات](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _ایک ہی کمانڈ کا استعمال کرکے کسی بھی EVM ہم آہنگ چین پر کسی بھی کنٹریکٹ کو آسانی سے تعینات کریں_**

- [دستاویزات](https://portal.thirdweb.com/deploy/)

**Crossmint - _اسمارٹ کنٹریکٹس کو تعینات کرنے، کریڈٹ کارڈ اور کراس چین ادائیگیوں کو فعال کرنے، اور NFTs بنانے, تقسیم کرنے, بیچنے, اسٹور کرنے اور ان میں ترمیم کرنے کے لیے APIs کا استعمال کرنے کا انٹرپرائز-گریڈ web3 ڈیولپمنٹ پلیٹ فارم۔_**

- [crossmint.com](https://www.crossmint.com)
- [ڈاکومینٹیشن](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [بلاگ](https://blog.crossmint.com)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [اپنا پہلا اسمارٹ کنٹریکٹ تعینات کرنا](/developers/tutorials/deploying-your-first-smart-contract/) _– ایتھریم ٹیسٹ نیٹ ورک پر اپنا پہلا اسمارٹ کنٹریکٹ تعینات کرنے کا تعارف۔_
- [ہیلو ورلڈ | اسمارٹ کنٹریکٹ ٹیوٹوریل](/developers/tutorials/hello-world-smart-contract/) _– ایتھریم پر ایک بنیادی اسمارٹ کنٹریکٹ بنانے اور اسے تعینات کرنے کا ایک آسان ٹیوٹوریل۔_
- [Solidity سے دوسرے کنٹریکٹس کے ساتھ تعامل کریں](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– موجودہ کنٹریکٹ سے اسمارٹ کنٹریکٹ کو کیسے تعینات کریں اور اس کے ساتھ تعامل کریں۔_
- [اپنے کنٹریکٹ کا سائز کیسے گھٹائیں](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- اپنے کنٹریکٹ کا سائز کیسے گھٹائیں تاکہ اسے حد کے اندر رکھا جا سکے اور گیس کی بچت کی جا سکے_

## مزید پڑھیں {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat کے ساتھ اپنے کنٹریکٹس کی تعیناتی](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_کسی کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحہ میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)
- [ایک ایتھریم نوڈ چلائیں](/developers/docs/nodes-and-clients/run-a-node/)
- [نوڈز-بطور-سروس](/developers/docs/nodes-and-clients/nodes-as-a-service)
