---
title: "بیک اینڈ API لائبریریاں"
description: "ایتھیریم کلائنٹ APIs کا تعارف جو آپ کو اپنی ایپلیکیشن سے بلاک چین کے ساتھ تعامل کرنے کی سہولت دیتے ہیں۔"
lang: ur
---

کسی سافٹ ویئر ایپلیکیشن کو [Ethereum](/) بلاک چین کے ساتھ تعامل کرنے (یعنی بلاک چین کا ڈیٹا پڑھنے اور/یا نیٹ ورک پر ٹرانزیکشنز بھیجنے) کے لیے، اسے ایتھیریم نوڈ سے منسلک ہونا ضروری ہے۔

اس مقصد کے لیے، ہر ایتھیریم کلائنٹ [JSON-RPC](/developers/docs/apis/json-rpc/) کی تخصیص (specification) کو نافذ کرتا ہے، تاکہ [طریقہ کار (methods)](/developers/docs/apis/json-rpc/#json-rpc-methods) کا ایک یکساں مجموعہ موجود ہو جس پر ایپلیکیشنز انحصار کر سکیں۔

اگر آپ ایتھیریم نوڈ سے منسلک ہونے کے لیے کوئی مخصوص پروگرامنگ زبان استعمال کرنا چاہتے ہیں، تو ایکو سسٹم میں بہت سی سہولت بخش لائبریریاں موجود ہیں جو اسے بہت آسان بناتی ہیں۔ ان لائبریریوں کی مدد سے، ڈیولپرز JSON-RPC درخواستوں کو (پس پردہ) شروع کرنے کے لیے آسان اور ایک سطری طریقہ کار لکھ سکتے ہیں جو ایتھیریم کے ساتھ تعامل کرتے ہیں۔

## پیشگی شرائط {#prerequisites}

[ایتھیریم اسٹیک](/developers/docs/ethereum-stack/) اور [ایتھیریم کلائنٹس](/developers/docs/nodes-and-clients/) کو سمجھنا مددگار ثابت ہو سکتا ہے۔

## لائبریری کیوں استعمال کریں؟ {#why-use-a-library}

یہ لائبریریاں براہ راست ایتھیریم نوڈ کے ساتھ تعامل کی زیادہ تر پیچیدگی کو دور کر دیتی ہیں۔ یہ یوٹیلیٹی فنکشنز بھی فراہم کرتی ہیں (جیسے ETH کو Gwei میں تبدیل کرنا) تاکہ ایک ڈیولپر کے طور پر آپ ایتھیریم کلائنٹس کی پیچیدگیوں سے نمٹنے میں کم وقت صرف کریں اور اپنی ایپلیکیشن کی منفرد فعالیت پر زیادہ توجہ مرکوز کر سکیں۔

## دستیاب لائبریریاں {#available-libraries}

### انفراسٹرکچر اور نوڈ سروسز {#infrastructure-and-node-services}

**Alchemy -** **_ایتھیریم ڈیولپمنٹ پلیٹ فارم۔_**

- [alchemy.com](https://www.alchemy.com/)
- [دستاویزات](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_نوڈ ایز اے سروس (Node-as-a-Service)۔_**

- [All That Node.com](https://www.allthatnode.com/)
- [دستاویزات](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_ایتھیریم مین نیٹ اور ٹیسٹ نیٹس کے لیے ڈی سینٹرلائزڈ APIs۔_**

- [blastapi.io](https://blastapi.io/)
- [دستاویزات](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_زیادہ موثر اور تیز RPC سروسز فراہم کرتا ہے_**

- [blockpi.io](https://blockpi.io/)
- [دستاویزات](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - بلاک ایکسپلورر اور ٹرانزیکشن APIs**
- [دستاویزات](https://docs.etherscan.io/)

**Blockscout - اوپن سورس بلاک ایکسپلورر**
- [دستاویزات](https://docs.blockscout.com/)

**GetBlock-** **_ویب 3 ڈیولپمنٹ کے لیے بلاک چین ایز اے سروس (Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [دستاویزات](https://docs.getblock.io/)

**Infura -** **_ایتھیریم API بطور سروس۔_**

- [infura.io](https://infura.io)
- [دستاویزات](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _کم لاگت والا EVM JSON-RPC پرووائیڈر_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [دستاویزات](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _فل نوڈز اور بلاک ایکسپلوررز۔_**

- [NOWNodes.io](https://nownodes.io/)
- [دستاویزات](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_بلاک چین انفراسٹرکچر بطور سروس۔_**

- [quicknode.com](https://quicknode.com)
- [دستاویزات](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_اوپن سورس سافٹ ویئر کے ذریعے چلنے والی ایتھیریم اور ایتھیریم کلاسک APIs بطور سروس۔_**

- [rivet.cloud](https://rivet.cloud)
- [دستاویزات](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_رفتار پر مبنی ایتھیریم نوڈز بطور JSON-RPC/WebSockets API۔_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [دستاویزات](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### ڈیولپمنٹ ٹولز {#development-tools}

**ethers-kt -** **_EVM پر مبنی بلاک چینز کے لیے غیر ہم وقتی (Async)، اعلیٰ کارکردگی والی Kotlin/Java/Android لائبریری۔_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [مثالیں](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_بلاک چین کے لیے ایک اوپن سورس .NET انٹیگریشن لائبریری۔_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [دستاویزات](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Python کے ذریعے ایتھیریم کے ساتھ تعامل کے لیے مختلف لائبریریاں۔_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_بہترین بلاک چین ڈیولپمنٹ پلیٹ فارم۔_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [دستاویزات](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_ایتھیریم کے لیے ایک Java/Android/Kotlin/Scala انٹیگریشن لائبریری۔_**

- [GitHub](https://github.com/web3j/web3j)
- [دستاویزات](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### بلاک چین سروسز {#blockchain-services}

**BlockCypher -** **_ایتھیریم ویب APIs۔_**

- [blockcypher.com](https://www.blockcypher.com/)
- [دستاویزات](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_ایتھیریم کے لیے ہمہ گیر (All-in-one) ویب 3 ڈیٹا انفراسٹرکچر۔_**

- [chainbase.com](https://chainbase.com/)
- [دستاویزات](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_لچکدار اور مخصوص ایتھیریم نوڈز بطور سروس۔_**

- [chainstack.com](https://chainstack.com)
- [دستاویزات](https://docs.chainstack.com/)
- [ایتھیریم API کا حوالہ](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_بلاک چین انفراسٹرکچر API۔_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [دستاویزات](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_ایتھیریم مین نیٹ اور ٹیسٹ نیٹس کے ساتھ ویب 3 API سروسز۔_**

- [DataHub](https://www.figment.io/)
- [دستاویزات](https://docs.figment.io/)

**Moralis -** **_انٹرپرائز گریڈ EVM API پرووائیڈر۔_**

- [moralis.io](https://moralis.io)
- [دستاویزات](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [فورم](https://forum.moralis.io/)

**NFTPort -** **_ایتھیریم ڈیٹا اور منٹ (Mint) APIs۔_**

- [nftport.xyz](https://www.nftport.xyz/)
- [دستاویزات](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_عمومی ملٹی کرپٹو بلاک چین APIs پلیٹ فارم۔_**

- [services.tokenview.io](https://services.tokenview.io/)
- [دستاویزات](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_ایتھیریم بلاک چین تک سادہ اور قابل اعتماد API رسائی فراہم کرتا ہے۔_**

- [Watchdata](https://watchdata.io/)
- [دستاویزات](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_درجنوں چینز پر ریئل ٹائم، افزودہ بلاک چین ڈیٹا API۔_**

- [codex.io](https://www.codex.io/)
- [دستاویزات](https://docs.codex.io)
- [ایکسپلورر](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200 سے زیادہ چینز کے لیے افزودہ بلاک چین APIs۔_**

- [covalenthq.com](https://www.covalenthq.com/)
- [دستاویزات](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [JavaScript میں ایتھیریم بلاک چین استعمال کرنے کے لیے Web3js سیٹ اپ کریں](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– اپنے پروجیکٹ میں web3.js سیٹ اپ کرنے کی ہدایات۔_
- [JavaScript سے اسمارٹ کانٹریکٹ کو کال کرنا](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI ٹوکن کا استعمال کرتے ہوئے، دیکھیں کہ JavaScript کا استعمال کر کے کانٹریکٹس کے فنکشن کو کیسے کال کیا جاتا ہے۔_