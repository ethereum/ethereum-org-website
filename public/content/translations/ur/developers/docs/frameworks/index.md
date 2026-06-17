---
title: "Dapp ڈیولپمنٹ فریم ورکس"
description: "فریم ورکس کے فوائد دریافت کریں اور دستیاب اختیارات کا موازنہ کریں۔"
lang: ur
---

## فریم ورکس کا تعارف {#introduction-to-frameworks}

ایک مکمل غیر مرکزی ایپلی کیشن (dapp) بنانے کے لیے ٹیکنالوجی کے مختلف حصوں کی ضرورت ہوتی ہے۔ سافٹ ویئر فریم ورکس میں بہت سی مطلوبہ خصوصیات شامل ہوتی ہیں یا وہ آپ کے مطلوبہ ٹولز کو منتخب کرنے کے لیے آسان پلگ ان سسٹمز فراہم کرتے ہیں۔

فریم ورکس بہت سی پہلے سے تیار شدہ (out-of-the-box) فعالیت کے ساتھ آتے ہیں، جیسے:

- ایک مقامی بلاک چین انسٹینس شروع کرنے کی خصوصیات۔
- آپ کے سمارٹ کنٹریکٹس کو مرتب (compile) اور ٹیسٹ کرنے کی سہولیات۔
- اسی پروجیکٹ/ریپوزٹری کے اندر آپ کی صارف کا سامنا کرنے والی ایپلی کیشن بنانے کے لیے کلائنٹ ڈیولپمنٹ ایڈ آنز۔
- ایتھیریم نیٹ ورکس سے جڑنے اور کنٹریکٹس تعینات کرنے کی کنفیگریشن، چاہے وہ مقامی طور پر چلنے والے انسٹینس پر ہو، یا ایتھیریم کے عوامی نیٹ ورکس میں سے کسی ایک پر۔
- لامركزی ایپ کی تقسیم - <span dir="ltr">IPFS</span> جیسے اسٹوریج کے اختیارات کے ساتھ انضمام۔

## پیشگی شرائط {#prerequisites}

فریم ورکس میں گہرائی سے جانے سے پہلے، ہم تجویز کرتے ہیں کہ آپ پہلے [dapps](/developers/docs/dapps/) اور [ایتھیریم اسٹیک](/developers/docs/ethereum-stack/) کا ہمارا تعارف پڑھیں۔

## دستیاب فریم ورکس {#available-frameworks}

**Foundry** - **_Foundry ایتھیریم ایپلی کیشن ڈیولپمنٹ کے لیے ایک انتہائی تیز، پورٹیبل اور ماڈیولر ٹول کٹ ہے_**

- [Foundry انسٹال کریں](https://book.getfoundry.sh/)
- [Foundry کی کتاب](https://book.getfoundry.sh/)
- [ٹیلی گرام پر Foundry کمیونٹی چیٹ](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_پیشہ ور افراد کے لیے ایتھیریم ڈیولپمنٹ کا ماحول۔_**

- [<span dir="ltr">hardhat.org</span>](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Python استعمال کرنے والوں، ڈیٹا سائنسدانوں، اور سیکیورٹی کے پیشہ ور افراد کے لیے سمارٹ کنٹریکٹ ڈیولپمنٹ ٹول۔_**

- [دستاویزات](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_<span dir="ltr">JVM</span> پر بلاک چین ایپلی کیشنز تیار کرنے کا ایک پلیٹ فارم۔_**

- [ہوم پیج](https://www.web3labs.com/web3j-sdk)
- [دستاویزات](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_<span dir="ltr">EVM</span> پر مبنی بلاک چینز کے لیے غیر ہم وقتی (Async)، اعلیٰ کارکردگی والی Kotlin/Java/Android لائبریری۔_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [مثالیں](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ڈسکارڈ](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_ایک کمانڈ کے ساتھ ایتھیریم سے چلنے والی ایپس بنائیں۔ انتخاب کرنے کے لیے <span dir="ltr">UI</span> فریم ورکس اور غیر مرکزی مالیات (DeFi) ٹیمپلیٹس کی وسیع پیشکش کے ساتھ آتا ہے۔_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [ٹیمپلیٹس](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Web3 کے لیے Ethers.js + Hardhat + React کے اجزاء اور ہکس: سمارٹ کنٹریکٹس سے چلنے والی لامركزی ایپلی کیشنز بنانا شروع کرنے کے لیے آپ کو درکار ہر چیز۔_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 ڈیولپمنٹ پلیٹ فارم جو بلاک چین ڈیولپرز کو سمارٹ کنٹریکٹس بنانے، ٹیسٹ کرنے، ڈیبگ کرنے، نگرانی کرنے اور چلانے کے ساتھ ساتھ dapp کے <span dir="ltr">UX</span> کو بہتر بنانے کے قابل بناتا ہے۔_**

- [ویب سائٹ](https://tenderly.co/)
- [دستاویزات](https://docs.tenderly.co/)

**The Graph -** **_بلاک چین ڈیٹا کو مؤثر طریقے سے دریافت (query) کرنے کے لیے The Graph۔_**

- [ویب سائٹ](https://thegraph.com/)
- [ٹیوٹوریل](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_ایتھیریم ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">alchemy.com</span>](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [ڈسکارڈ](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_ایتھیریم ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">Nodereal.io</span>](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [ڈسکارڈ](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_ہمارے طاقتور <span dir="ltr">SDKs</span> اور <span dir="ltr">CLI</span> کا استعمال کرتے ہوئے ایسی Web3 ایپلی کیشنز بنائیں جو آپ کے سمارٹ کنٹریکٹس کے ساتھ تعامل کر سکیں۔_**

- [دستاویزات](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (ایتھیریم اور دیگر) ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">chainstack.com</span>](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [ڈسکارڈ](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_انٹرپرائز گریڈ Web3 ڈیولپمنٹ پلیٹ فارم، جو آپ کو تمام بڑی چینز، <span dir="ltr">EVM</span> چینز (اور دیگر) پر <span dir="ltr">NFT</span> ایپلی کیشنز بنانے کی اجازت دیتا ہے۔_**

- [ویب سائٹ](https://www.crossmint.com)
- [دستاویزات](https://docs.crossmint.com)
- [ڈسکارڈ](https://discord.com/invite/crossmint)

**Brownie -** **_Python پر مبنی ڈیولپمنٹ کا ماحول اور ٹیسٹنگ فریم ورک۔_**

- [دستاویزات](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie فی الحال غیر زیرِ انتظام (unmaintained) ہے**

**اوپن زیپلن SDK -** **_حتمی سمارٹ کنٹریکٹ ٹول کٹ: ٹولز کا ایک مجموعہ جو آپ کو سمارٹ کنٹریکٹس تیار کرنے، مرتب کرنے، اپ گریڈ کرنے، تعینات کرنے اور ان کے ساتھ تعامل کرنے میں مدد کرتا ہے۔_**

- [اوپن زیپلن Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [کمیونٹی فورم](https://forum.openzeppelin.com/c/support/17)
- **اوپن زیپلن SDK کی ڈیولپمنٹ ختم ہو چکی ہے**

**Catapulta -** **_ملٹی چین سمارٹ کنٹریکٹس کی تعیناتی کا ٹول، بلاک ایکسپلوررز میں تصدیق کو خودکار بناتا ہے، تعینات کردہ سمارٹ کنٹریکٹس کا ٹریک رکھتا ہے اور تعیناتی کی رپورٹس شیئر کرتا ہے، Foundry اور Hardhat پروجیکٹس کے لیے پلگ اینڈ پلے (plug-n-play) ہے۔_**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (Covalent کے زیرِ انتظام) -** **_GoldRush ڈیولپرز، تجزیہ کاروں، اور انٹرپرائزز کے لیے سب سے جامع بلاک چین ڈیٹا API سوٹ پیش کرتا ہے۔ چاہے آپ غیر مرکزی مالیات (DeFi) ڈیش بورڈ، والیٹ، ٹریڈنگ بوٹ، مصنوعی ذہانت کا ایجنٹ یا کمپلائنس پلیٹ فارم بنا رہے ہوں، ڈیٹا APIs آپ کو درکار ضروری آن چین ڈیٹا تک تیز، درست، اور ڈیولپر کے لیے سازگار رسائی فراہم کرتے ہیں_**

- [ویب سائٹ](https://goldrush.dev/)
- [دستاویزات](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [ڈسکارڈ](https://www.covalenthq.com/discord/)

**Wake -** **_کنٹریکٹس کی ٹیسٹنگ، فزنگ (fuzzing)، تعیناتی، کمزوریوں کی اسکیننگ اور کوڈ نیویگیشن کے لیے آل ان ون (All-in-one) Python فریم ورک۔_**

- [ہوم پیج](https://getwake.io/)
- [دستاویزات](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [<span dir="ltr">VS Code</span> ایکسٹینشن](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_اوپن سورس، ماڈیولر اور ایگنوسٹک (agnostic) فریم ورک جو لامركزی ایپلی کیشن ڈیولپرز کے لیے اپنی ایپلی کیشنز میں لامركزی شناخت اور قابل تصدیق اسناد (verifiable credentials) بنانا آسان بناتا ہے۔_**

- [ہوم پیج](https://veramo.io/)
- [دستاویزات](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [ڈسکارڈ](https://discord.com/invite/FRRBdjemHV)
- [<span dir="ltr">NPM</span> پیکیج](https://www.npmjs.com/package/@veramo/core)

## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [مقامی ڈیولپمنٹ کا ماحول ترتیب دیں](/developers/local-environment/)

## ٹیوٹوریلز: ایتھیریم پر ڈیولپمنٹ فریم ورکس {#tutorials}

- [ابتدائی افراد کے لیے ہیلو ورلڈ سمارٹ کنٹریکٹ – فل اسٹیک](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhat کا استعمال کرتے ہوئے ایک ہیلو ورلڈ سمارٹ کنٹریکٹ بنائیں اور تعینات کریں، پھر اسے فرنٹ اینڈ سے جوڑیں۔_