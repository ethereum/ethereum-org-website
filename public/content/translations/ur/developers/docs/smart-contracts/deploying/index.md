---
title: "سمارٹ کنٹریکٹس تعینات کرنا"
description: "ایتھیریم نیٹ ورکس پر سمارٹ کنٹریکٹس تعینات کرنے کا طریقہ سیکھیں، بشمول بنیادی شرائط، ٹولز، اور تعیناتی کے اقدامات۔"
lang: ur
---

آپ کو اپنا سمارٹ کنٹریکٹ تعینات کرنے کی ضرورت ہے تاکہ یہ ایتھیریم نیٹ ورک کے صارفین کے لیے دستیاب ہو سکے۔

سمارٹ کنٹریکٹ تعینات کرنے کے لیے، آپ محض ایک ایتھیریم ٹرانزیکشن بھیجتے ہیں جس میں سمارٹ کنٹریکٹ کا مرتب شدہ (compiled) کوڈ شامل ہوتا ہے، اور اس میں کسی وصول کنندہ کی وضاحت نہیں کی جاتی۔

## بنیادی شرائط {#prerequisites}

سمارٹ کنٹریکٹس تعینات کرنے سے پہلے آپ کو [ایتھیریم نیٹ ورکس](/developers/docs/networks/)، [ٹرانزیکشنز](/developers/docs/transactions/) اور [سمارٹ کنٹریکٹس کی ساخت](/developers/docs/smart-contracts/anatomy/) کو سمجھنا چاہیے۔

کنٹریکٹ تعینات کرنے پر ایتھر (<span dir="ltr">ETH</span>) کی لاگت بھی آتی ہے کیونکہ وہ بلاک چین پر محفوظ ہوتے ہیں، اس لیے آپ کو ایتھیریم پر [گیس اور فیس](/developers/docs/gas/) سے واقف ہونا چاہیے۔

آخر میں، آپ کو اپنا کنٹریکٹ تعینات کرنے سے پہلے اسے کمپائل کرنے کی ضرورت ہوگی، لہذا یقینی بنائیں کہ آپ نے [سمارٹ کنٹریکٹس کی کمپائلنگ](/developers/docs/smart-contracts/compiling/) کے بارے میں پڑھ لیا ہے۔

## سمارٹ کنٹریکٹ کیسے تعینات کریں {#how-to-deploy-a-smart-contract}

### آپ کو کن چیزوں کی ضرورت ہوگی {#what-youll-need}

- آپ کے کنٹریکٹ کا بائٹ کوڈ – یہ [کمپائلنگ](/developers/docs/smart-contracts/compiling/) کے ذریعے تیار کیا جاتا ہے
- گیس کے لیے <span dir="ltr">ETH</span> – آپ دیگر ٹرانزیکشنز کی طرح اپنی گیس کی حد مقرر کریں گے، لہذا آگاہ رہیں کہ کنٹریکٹ کی تعیناتی کے لیے ایک سادہ <span dir="ltr">ETH</span> منتقلی کی نسبت بہت زیادہ گیس کی ضرورت ہوتی ہے
- ایک تعیناتی اسکرپٹ یا پلگ ان
- ایک [ایتھیریم نوڈ](/developers/docs/nodes-and-clients/) تک رسائی، چاہے اپنا نوڈ چلا کر، کسی عوامی نوڈ سے منسلک ہو کر، یا [نوڈ سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) کا استعمال کرتے ہوئے <span dir="ltr">API</span> کلید کے ذریعے

### سمارٹ کنٹریکٹ تعینات کرنے کے اقدامات {#steps-to-deploy}

اس میں شامل مخصوص اقدامات متعلقہ ڈیولپمنٹ فریم ورک پر منحصر ہوں گے۔ مثال کے طور پر، آپ [اپنے کنٹریکٹس تعینات کرنے کے حوالے سے Hardhat کی دستاویزات](https://hardhat.org/docs/tutorial/deploying) یا [سمارٹ کنٹریکٹ تعینات کرنے اور اس کی تصدیق کرنے کے حوالے سے Foundry کی دستاویزات](https://book.getfoundry.sh/forge/deploying) دیکھ سکتے ہیں۔ ایک بار تعینات ہونے کے بعد، آپ کے کنٹریکٹ کا دیگر [اکاؤنٹس](/developers/docs/accounts/) کی طرح ایک ایتھیریم پتہ ہوگا اور اسے [سورس کوڈ کی تصدیق کے ٹولز](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) کا استعمال کرتے ہوئے تصدیق کیا جا سکتا ہے۔

## متعلقہ ٹولز {#related-tools}

**Remix - _Remix IDE ایتھیریم جیسی بلاک چینز کے لیے سمارٹ کنٹریکٹس تیار کرنے، تعینات کرنے اور ان کا انتظام کرنے کی سہولت دیتا ہے_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 ڈیولپمنٹ پلیٹ فارم جو سمارٹ کنٹریکٹس تیار کرنے، ٹیسٹ کرنے، نگرانی کرنے اور چلانے کے لیے ڈیبگنگ، مشاہدے کی صلاحیت، اور انفراسٹرکچر کے بنیادی بلاکس فراہم کرتا ہے_**

- [tenderly.co](https://tenderly.co/)
- [دستاویزات](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [ڈسکارڈ](https://discord.gg/eCWjuvt)

**Hardhat - _آپ کے ایتھیریم سافٹ ویئر کو کمپائل کرنے، تعینات کرنے، ٹیسٹ کرنے اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [اپنے کنٹریکٹس تعینات کرنے پر دستاویزات](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [ڈسکارڈ](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _ایک ہی کمانڈ کا استعمال کرتے ہوئے، کسی بھی <span dir="ltr">EVM</span> سے مطابقت رکھنے والی چین پر کوئی بھی کنٹریکٹ آسانی سے تعینات کریں_**

- [دستاویزات](https://portal.thirdweb.com/deploy/)

**Crossmint - _سمارٹ کنٹریکٹس تعینات کرنے، کریڈٹ کارڈ اور کراس چین ادائیگیوں کو فعال کرنے، اور <span dir="ltr">NFTs</span> بنانے، تقسیم کرنے، فروخت کرنے، ذخیرہ کرنے اور ان میں ترمیم کرنے کے لیے <span dir="ltr">APIs</span> کا استعمال کرنے کے لیے انٹرپرائز گریڈ Web3 ڈیولپمنٹ پلیٹ فارم۔_**

- [crossmint.com](https://www.crossmint.com)
- [دستاویزات](https://docs.crossmint.com)
- [ڈسکارڈ](https://discord.com/invite/crossmint)
- [بلاگ](https://blog.crossmint.com)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [اپنا پہلا سمارٹ کنٹریکٹ تعینات کرنا](/developers/tutorials/deploying-your-first-smart-contract/) _– ایتھیریم ٹیسٹ نیٹ ورک پر اپنا پہلا سمارٹ کنٹریکٹ تعینات کرنے کا تعارف۔_
- [Hello World | سمارٹ کنٹریکٹ ٹیوٹوریل](/developers/tutorials/hello-world-smart-contract/) _– ایتھیریم پر ایک بنیادی سمارٹ کنٹریکٹ بنانے اور تعینات کرنے کے لیے ایک آسان ٹیوٹوریل۔_
- [Solidity سے دیگر کنٹریکٹس کے ساتھ تعامل کریں](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– موجودہ کنٹریکٹ سے سمارٹ کنٹریکٹ کیسے تعینات کریں اور اس کے ساتھ کیسے تعامل کریں۔_
- [اپنے کنٹریکٹ کا سائز کیسے کم کریں](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- اپنے کنٹریکٹ کا سائز کیسے کم کریں تاکہ اسے حد کے اندر رکھا جا سکے اور گیس کی بچت کی جا سکے_

## مزید مطالعہ {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _اوپن زیپلن_
- [Hardhat کے ساتھ اپنے کنٹریکٹس تعینات کرنا](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)
- [ایک ایتھیریم نوڈ چلائیں](/developers/docs/nodes-and-clients/run-a-node/)
- [نوڈز بطور سروس (Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)