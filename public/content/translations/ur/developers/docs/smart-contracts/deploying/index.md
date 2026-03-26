---
title: "اسمارٹ کانٹریکٹس کو ڈیپلائے کرنا"
description: "ایتھیریم نیٹ ورکس پر اسمارٹ کانٹریکٹس کو ڈیپلائے کرنے کا طریقہ سیکھیں، بشمول شرائط، ٹولز، اور ڈیپلائمنٹ کے اقدامات۔"
lang: ur
---

آپ کو اپنا اسمارٹ کانٹریکٹ ڈیپلائے کرنے کی ضرورت ہے تاکہ یہ ایتھیریم نیٹ ورک کے صارفین کے لیے دستیاب ہو سکے۔

اسمارٹ کانٹریکٹ کو ڈیپلائے کرنے کے لیے، آپ محض ایک ایتھیریم ٹرانزیکشن بھیجتے ہیں جس میں اسمارٹ کانٹریکٹ کا مرتب شدہ (compiled) کوڈ شامل ہوتا ہے، اور اس میں کسی وصول کنندہ کی وضاحت نہیں کی جاتی۔

## پیشگی شرائط {#prerequisites}

اسمارٹ کانٹریکٹس کو ڈیپلائے کرنے سے پہلے آپ کو [ایتھیریم نیٹ ورکس](/developers/docs/networks/)، [ٹرانزیکشنز](/developers/docs/transactions/) اور [اسمارٹ کانٹریکٹس کی ساخت](/developers/docs/smart-contracts/anatomy/) کو سمجھنا چاہیے۔

کانٹریکٹ کو ڈیپلائے کرنے پر ایتھر (ETH) کی لاگت بھی آتی ہے کیونکہ وہ بلاک چین پر اسٹور ہوتے ہیں، اس لیے آپ کو ایتھیریم پر [گیس اور فیس](/developers/docs/gas/) سے واقف ہونا چاہیے۔

آخر میں، آپ کو اپنے کانٹریکٹ کو ڈیپلائے کرنے سے پہلے اسے مرتب (compile) کرنے کی ضرورت ہوگی، لہذا یقینی بنائیں کہ آپ نے [اسمارٹ کانٹریکٹس کو مرتب کرنے](/developers/docs/smart-contracts/compiling/) کے بارے میں پڑھ لیا ہے۔

## اسمارٹ کانٹریکٹ کو کیسے ڈیپلائے کریں {#how-to-deploy-a-smart-contract}

### آپ کو کن چیزوں کی ضرورت ہوگی {#what-youll-need}

- آپ کے کانٹریکٹ کا بائٹ کوڈ – یہ [مرتب کرنے (compilation)](/developers/docs/smart-contracts/compiling/) کے ذریعے تیار کیا جاتا ہے
- گیس کے لیے ETH – آپ دیگر ٹرانزیکشنز کی طرح اپنی گیس کی حد مقرر کریں گے، لہذا آگاہ رہیں کہ کانٹریکٹ کی ڈیپلائمنٹ کے لیے سادہ ETH ٹرانسفر کی نسبت بہت زیادہ گیس درکار ہوتی ہے
- ایک ڈیپلائمنٹ اسکرپٹ یا پلگ ان
- ایک [ایتھیریم نوڈ](/developers/docs/nodes-and-clients/) تک رسائی، چاہے وہ اپنا نوڈ چلا کر ہو، کسی پبلک نوڈ سے منسلک ہو کر، یا [نوڈ سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) کا استعمال کرتے ہوئے API کلید کے ذریعے۔

### اسمارٹ کانٹریکٹ کو ڈیپلائے کرنے کے اقدامات {#steps-to-deploy}

اس میں شامل مخصوص اقدامات متعلقہ ڈیولپمنٹ فریم ورک پر منحصر ہوں گے۔ مثال کے طور پر، آپ [اپنے کانٹریکٹس کو ڈیپلائے کرنے کے حوالے سے Hardhat کی دستاویزات](https://hardhat.org/docs/tutorial/deploying) یا [اسمارٹ کانٹریکٹ کو ڈیپلائے اور تصدیق کرنے کے حوالے سے Foundry کی دستاویزات](https://book.getfoundry.sh/forge/deploying) دیکھ سکتے ہیں۔ ایک بار ڈیپلائے ہونے کے بعد، آپ کے کانٹریکٹ کا دیگر [اکاؤنٹس](/developers/docs/accounts/) کی طرح ایک ایتھیریم ایڈریس ہوگا اور اسے [سورس کوڈ کی تصدیق کے ٹولز](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) کا استعمال کرتے ہوئے تصدیق کیا جا سکتا ہے۔

## متعلقہ ٹولز {#related-tools}

**Remix - _Remix IDE ایتھیریم جیسی بلاک چینز کے لیے اسمارٹ کانٹریکٹس تیار کرنے، ڈیپلائے کرنے اور ان کا انتظام کرنے کی سہولت فراہم کرتا ہے_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 ڈیولپمنٹ پلیٹ فارم جو اسمارٹ کانٹریکٹس تیار کرنے، ٹیسٹ کرنے، نگرانی کرنے اور چلانے کے لیے ڈیبگنگ، مشاہدے کی صلاحیت، اور انفراسٹرکچر کے بنیادی بلاکس فراہم کرتا ہے_**

- [tenderly.co](https://tenderly.co/)
- [دستاویزات](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _آپ کے ایتھیریم سافٹ ویئر کو مرتب کرنے، ڈیپلائے کرنے، ٹیسٹ کرنے اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [اپنے کانٹریکٹس کو ڈیپلائے کرنے سے متعلق دستاویزات](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _ایک ہی کمانڈ کا استعمال کرتے ہوئے کسی بھی کانٹریکٹ کو کسی بھی EVM سے مطابقت رکھنے والی چین پر آسانی سے ڈیپلائے کریں_**

- [دستاویزات](https://portal.thirdweb.com/deploy/)

**Crossmint - _اسمارٹ کانٹریکٹس کو ڈیپلائے کرنے، کریڈٹ کارڈ اور کراس چین ادائیگیوں کو فعال کرنے، اور NFTs بنانے، تقسیم کرنے، فروخت کرنے، اسٹور کرنے اور ترمیم کرنے کے لیے APIs کا استعمال کرنے کے لیے انٹرپرائز گریڈ web3 ڈیولپمنٹ پلیٹ فارم۔_**

- [crossmint.com](https://www.crossmint.com)
- [دستاویزات](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [بلاگ](https://blog.crossmint.com)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [اپنا پہلا اسمارٹ کانٹریکٹ ڈیپلائے کرنا](/developers/tutorials/deploying-your-first-smart-contract/) _– ایتھیریم ٹیسٹ نیٹ ورک پر اپنا پہلا اسمارٹ کانٹریکٹ ڈیپلائے کرنے کا تعارف۔_
- [ہیلو ورلڈ | اسمارٹ کانٹریکٹ ٹیوٹوریل](/developers/tutorials/hello-world-smart-contract/) _– ایتھیریم پر ایک بنیادی اسمارٹ کانٹریکٹ بنانے اور ڈیپلائے کرنے کے لیے ایک آسان ٹیوٹوریل۔_
- [Solidity سے دیگر کانٹریکٹس کے ساتھ تعامل کریں](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– موجودہ کانٹریکٹ سے اسمارٹ کانٹریکٹ کو کیسے ڈیپلائے کریں اور اس کے ساتھ تعامل کریں۔_
- [اپنے کانٹریکٹ کا سائز کیسے کم کریں](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- اپنے کانٹریکٹ کے سائز کو حد کے اندر رکھنے اور گیس بچانے کے لیے اسے کیسے کم کریں_

## مزید مطالعہ {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat کے ساتھ اپنے کانٹریکٹس کو ڈیپلائے کرنا](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)
- [ایتھیریم نوڈ چلائیں](/developers/docs/nodes-and-clients/run-a-node/)
- [نوڈز بطور سروس (Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)