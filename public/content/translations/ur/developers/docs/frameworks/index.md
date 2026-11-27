---
title: "Dapp ڈیولپمنٹ فریم ورکس"
description: "ایتھیریم ڈیولپمنٹ فریم ورکس جیسے ⁦Foundry⁩ اور ⁦Hardhat⁩ کا موازنہ کریں۔ جانیں کہ ایک فریم ورک آپ کو سمارٹ کنٹریکٹس کو مرتب کرنے، ٹیسٹ کرنے اور تعینات کرنے کے لیے کیا فراہم کرتا ہے۔"
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

**<span dir="ltr">Foundry</span>** - **_<span dir="ltr">Foundry</span> ایتھیریم ایپلی کیشن ڈیولپمنٹ کے لیے ایک انتہائی تیز، پورٹیبل اور ماڈیولر ٹول کٹ ہے_**

- [<span dir="ltr">Foundry</span> انسٹال کریں](https://book.getfoundry.sh/)
- [<span dir="ltr">Foundry</span> بک](https://book.getfoundry.sh/)
- [ٹیلی گرام پر <span dir="ltr">Foundry</span> کمیونٹی چیٹ](https://t.me/foundry_support)
- [Awesome <span dir="ltr">Foundry</span>](https://github.com/crisgarner/awesome-foundry)

**<span dir="ltr">Hardhat</span> -** **_پیشہ ور افراد کے لیے ایتھیریم ڈیولپمنٹ کا ماحول۔_**

- [<span dir="ltr">hardhat.org</span>](https://hardhat.org)
- [<span dir="ltr">GitHub</span>](https://github.com/nomiclabs/hardhat)

**<span dir="ltr">Ape</span> -** **_<span dir="ltr">Python</span> کے ماہرین، ڈیٹا سائنسدانوں، اور سیکیورٹی کے پیشہ ور افراد کے لیے سمارٹ کنٹریکٹ ڈیولپمنٹ ٹول۔_**

- [دستاویزات](https://docs.apeworx.io/ape/stable/)
- [<span dir="ltr">GitHub</span>](https://github.com/ApeWorX/ape)

**<span dir="ltr">Web3j</span> -** **_<span dir="ltr">JVM</span> پر بلاک چین ایپلی کیشنز تیار کرنے کا ایک پلیٹ فارم۔_**

- [ہوم پیج](https://www.web3labs.com/web3j-sdk)
- [دستاویزات](https://docs.web3j.io)
- [<span dir="ltr">GitHub</span>](https://github.com/web3j/web3j)

**<span dir="ltr">ethers-kt</span> -** **_<span dir="ltr">EVM</span> پر مبنی بلاک چینز کے لیے <span dir="ltr">Async</span>، اعلی کارکردگی والی <span dir="ltr">Kotlin/Java/Android</span> لائبریری۔_**

- [<span dir="ltr">GitHub</span>](https://github.com/Kr1ptal/ethers-kt)
- [مثالیں](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ڈسکارڈ](https://discord.gg/rx35NzQGSb)

**<span dir="ltr">Create Eth App</span> -** **_ایک کمانڈ کے ساتھ ایتھیریم سے چلنے والی ایپس بنائیں۔ انتخاب کرنے کے لیے <span dir="ltr">UI</span> فریم ورکس اور <span dir="ltr">DeFi</span> ٹیمپلیٹس کی وسیع پیشکش کے ساتھ آتا ہے۔_**

- [<span dir="ltr">GitHub</span>](https://github.com/paulrberg/create-eth-app)
- [ٹیمپلیٹس](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**<span dir="ltr">Scaffold-ETH 2</span> -** **_<span dir="ltr">Hardhat</span> یا <span dir="ltr">Foundry</span> کے آپ کے انتخاب کے ساتھ <span dir="ltr">Next.js</span>، <span dir="ltr">Wagmi</span>، <span dir="ltr">Viem</span> اور <span dir="ltr">RainbowKit</span>: کنٹریکٹ ہاٹ ری لوڈ، کسٹم <span dir="ltr">React</span> ہکس، ایک برنر والیٹ اور مقامی فوسٹ، اور فل اسٹیک <span dir="ltr">dapp</span> ڈیولپمنٹ کے لیے ایکسٹینشن ماڈیولز۔_**

- [ویب سائٹ](https://scaffoldeth.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/scaffold-eth/scaffold-eth-2)

**<span dir="ltr">Tenderly</span> -** **_<span dir="ltr">Web3</span> ڈیولپمنٹ پلیٹ فارم جو بلاک چین ڈیولپرز کو سمارٹ کنٹریکٹس بنانے، ٹیسٹ کرنے، ڈیبگ کرنے، مانیٹر کرنے اور چلانے اور <span dir="ltr">dapp</span> کے <span dir="ltr">UX</span> کو بہتر بنانے کے قابل بناتا ہے۔_**

- [ویب سائٹ](https://tenderly.co/)
- [دستاویزات](https://docs.tenderly.co/)

**<span dir="ltr">The Graph</span> -** **_بلاک چین ڈیٹا کو مؤثر طریقے سے استفسار کرنے کے لیے <span dir="ltr">The Graph</span>۔_**

- [ویب سائٹ](https://thegraph.com/)
- [دستاویزات](https://thegraph.com/docs/en/)

**<span dir="ltr">Alchemy</span> -** **_ایتھیریم ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">alchemy.com</span>](https://www.alchemy.com/)
- [<span dir="ltr">GitHub</span>](https://github.com/alchemyplatform)
- [ڈسکارڈ](https://discord.com/invite/alchemyplatform)

**<span dir="ltr">NodeReal</span> -** **_ایتھیریم ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">Nodereal.io</span>](https://nodereal.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/node-real)
- [ڈسکارڈ](https://discord.gg/V5k5gsuE)

**<span dir="ltr">thirdweb SDK</span> -** **_ایسی <span dir="ltr">Web3</span> ایپلی کیشنز بنائیں جو ہمارے طاقتور <span dir="ltr">SDKs</span> اور <span dir="ltr">CLI</span> کا استعمال کرتے ہوئے آپ کے سمارٹ کنٹریکٹس کے ساتھ تعامل کر سکیں۔_**

- [دستاویزات](https://portal.thirdweb.com/sdk/)
- [<span dir="ltr">GitHub</span>](https://github.com/thirdweb-dev/)

**<span dir="ltr">Chainstack</span> -** **_<span dir="ltr">Web3</span> (ایتھیریم اور دیگر) ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">chainstack.com</span>](https://www.chainstack.com/)
- [<span dir="ltr">GitHub</span>](https://github.com/chainstack)
- [ڈسکارڈ](https://discord.gg/BSb5zfp9AT)

**<span dir="ltr">Crossmint</span> -** **_انٹرپرائز گریڈ <span dir="ltr">Web3</span> ڈیولپمنٹ پلیٹ فارم، جو آپ کو تمام بڑی چینز، <span dir="ltr">EVM</span> چینز (اور دیگر) پر <span dir="ltr">NFT</span> ایپلی کیشنز بنانے کی اجازت دیتا ہے۔_**

- [ویب سائٹ](https://www.crossmint.com)
- [دستاویزات](https://docs.crossmint.com)
- [ڈسکارڈ](https://discord.com/invite/crossmint)

**<span dir="ltr">Brownie</span> -** **_<span dir="ltr">Python</span> پر مبنی ڈیولپمنٹ کا ماحول اور ٹیسٹنگ فریم ورک۔_**

- [دستاویزات](https://eth-brownie.readthedocs.io/en/latest/)
- [<span dir="ltr">GitHub</span>](https://github.com/eth-brownie/brownie)
- **<span dir="ltr">Brownie</span> فی الحال غیر زیرِ انتظام (unmaintained) ہے**

**<span dir="ltr">OpenZeppelin SDK</span> -** **_حتمی سمارٹ کنٹریکٹ ٹول کٹ: سمارٹ کنٹریکٹس کو تیار کرنے، مرتب کرنے، اپ گریڈ کرنے، تعینات کرنے اور ان کے ساتھ تعامل کرنے میں آپ کی مدد کرنے کے لیے ٹولز کا ایک مجموعہ۔_**

- [<span dir="ltr">GitHub</span>](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [کمیونٹی فورم](https://forum.openzeppelin.com/c/support/17)
- **اوپن زیپلن <span dir="ltr">SDK</span> کی ڈیولپمنٹ ختم ہو چکی ہے**

**<span dir="ltr">Catapulta</span> -** **_ملٹی چین سمارٹ کنٹریکٹس تعیناتی ٹول، بلاک ایکسپلوررز میں تصدیق کو خودکار بنائیں، تعینات کردہ سمارٹ کنٹریکٹس کا ٹریک رکھیں اور تعیناتی کی رپورٹس شیئر کریں، <span dir="ltr">Foundry</span> اور <span dir="ltr">Hardhat</span> پروجیکٹس کے لیے پلگ اینڈ پلے۔_**

- [<span dir="ltr">GitHub</span>](https://github.com/catapulta-sh)

**<span dir="ltr">GoldRush</span> (<span dir="ltr">Covalent</span> کے ذریعے تقویت یافتہ) -** **_<span dir="ltr">GoldRush</span> ڈیولپرز، تجزیہ کاروں، اور انٹرپرائزز کے لیے سب سے جامع بلاک چین ڈیٹا <span dir="ltr">API</span> سویٹ پیش کرتا ہے۔ چاہے آپ <span dir="ltr">DeFi</span> ڈیش بورڈ، والیٹ، ٹریڈنگ بوٹ، مصنوعی ذہانت کا ایجنٹ یا تعمیل کا پلیٹ فارم بنا رہے ہوں، ڈیٹا <span dir="ltr">APIs</span> آپ کو درکار ضروری آن چین ڈیٹا تک تیز، درست، اور ڈیولپر کے موافق رسائی فراہم کرتے ہیں_**

- [ویب سائٹ](https://goldrush.dev/)
- [دستاویزات](https://goldrush.dev/docs/chains/ethereum)
- [<span dir="ltr">GitHub</span>](https://github.com/covalenthq)
- [ڈسکارڈ](https://www.covalenthq.com/discord/)

**<span dir="ltr">Wake</span> -** **_کنٹریکٹس کی ٹیسٹنگ، فزنگ، تعیناتی، کمزوری کی اسکیننگ اور کوڈ نیویگیشن کے لیے آل ان ون <span dir="ltr">Python</span> فریم ورک۔_**

- [ہوم پیج](https://getwake.io/)
- [دستاویزات](https://ackeeblockchain.com/wake/docs/latest/)
- [<span dir="ltr">GitHub</span>](https://github.com/Ackee-Blockchain/wake)
- [<span dir="ltr">VS Code</span> ایکسٹینشن](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**<span dir="ltr">Veramo</span> -** **_اوپن سورس، ماڈیولر اور ایگنوسٹک فریم ورک جو غیر مرکزی ایپلی کیشن ڈیولپرز کے لیے اپنی ایپلی کیشنز میں لامركزی شناخت اور قابل تصدیق اسناد بنانا آسان بناتا ہے۔_**

- [ہوم پیج](https://veramo.io/)
- [دستاویزات](https://veramo.io/docs/basics/introduction)
- [<span dir="ltr">GitHub</span>](https://github.com/uport-project/veramo)
- [ڈسکارڈ](https://discord.com/invite/FRRBdjemHV)
- [<span dir="ltr">NPM</span> پیکیج](https://www.npmjs.com/package/@veramo/core)

**<span dir="ltr">Moccasin</span> -** **_<span dir="ltr">Titanoboa</span> پر بنایا گیا، <span dir="ltr">Vyper</span> کے لیے ایک تیز، <span dir="ltr">Pythonic</span> سمارٹ کنٹریکٹ ڈیولپمنٹ اور ٹیسٹنگ فریم ورک۔_**

- [دستاویزات](https://cyfrin.github.io/moccasin/)
- [<span dir="ltr">GitHub</span>](https://github.com/Cyfrin/moccasin)

## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [مقامی ڈیولپمنٹ کا ماحول ترتیب دیں](/developers/local-environment/)

## ٹیوٹوریلز: ایتھیریم پر ڈیولپمنٹ فریم ورکس {#tutorials}

- [ابتدائی افراد کے لیے ہیلو ورلڈ سمارٹ کنٹریکٹ](/developers/tutorials/hello-world-smart-contract/) _– <span dir="ltr">Hardhat</span> کا استعمال کرتے ہوئے ایک ہیلو ورلڈ سمارٹ کنٹریکٹ بنائیں اور تعینات کریں۔_
