---
title: "بیک اینڈ API لائبریریاں"
description: "Ethereum کلائنٹ APIs کا ایک تعارف جو آپ کو اپنی ایپلیکیشن سے بلاک چین کے ساتھ تعامل کرنے دیتا ہے۔"
lang: ur-in
---

Ethereum بلاک چین کے ساتھ تعامل کرنے کے لیے (یعنی، بلاک چین ڈیٹا کو پڑھنا اور/یا نیٹ ورک پر ٹرانزیکشن بھیجنا)، ایک سافٹ ویئر ایپلیکیشن کو Ethereum نوڈ سے جڑنا ہوگا۔

اس مقصد کے لیے، ہر Ethereum کلائنٹ [JSON-RPC](/developers/docs/apis/json-rpc/) تفصیلات کو نافذ کرتا ہے، لہذا [طریقوں](/developers/docs/apis/json-rpc/#json-rpc-methods) کا ایک یکساں سیٹ موجود ہے جس پر ایپلیکیشنز بھروسہ کر سکتی ہیں۔

اگر آپ ایک Ethereum نوڈ سے جڑنے کے لیے کسی مخصوص پروگرامنگ زبان کا استعمال کرنا چاہتے ہیں، تو ایکو سسٹم کے اندر بہت سی سہولتی لائبریریاں ہیں جو اسے بہت آسان بناتی ہیں۔ ان لائبریریوں کے ساتھ، ڈیولپرز JSON-RPC درخواستوں کو شروع کرنے کے لیے بدیہی، ایک لائن والے طریقے لکھ سکتے ہیں (اندرونی طور پر) جو Ethereum کے ساتھ تعامل کرتی ہیں۔

## شرائط {#prerequisites}

[Ethereum stack](/developers/docs/ethereum-stack/) اور [Ethereum کلائنٹس](/developers/docs/nodes-and-clients/) کو سمجھنا مددگار ثابت ہو سکتا ہے۔

## لائبریری کا استعمال کیوں کریں؟ {#why-use-a-library}

یہ لائبریریاں ایک Ethereum نوڈ کے ساتھ براہ راست تعامل کرنے کی بہت سی پیچیدگیوں کو دور کرتی ہیں۔ وہ یوٹیلیٹی فنکشنز (مثلاً، ETH کو Gwei میں تبدیل کرنا) بھی فراہم کرتی ہیں تاکہ ایک ڈیولپر کے طور پر آپ Ethereum کلائنٹس کی پیچیدگیوں سے نمٹنے میں کم وقت گزار سکیں اور اپنی ایپلیکیشن کی منفرد فعالیت پر زیادہ وقت مرکوز کر سکیں۔

## دستیاب لائبریریاں {#available-libraries}

### انفراسٹرکچر اور نوڈ خدمات {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum ڈیولپمنٹ پلیٹ فارم۔_**

- [alchemy.com](https://www.alchemy.com/)
- [دستاویزات](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_نوڈ بطور سروس۔_**

- [All That Node.com](https://www.allthatnode.com/)
- [دستاویزات](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_Ethereum مین نیٹ اور ٹیسٹ نیٹس کے لیے विकेंद्रीकृत APIs۔_**

- [blastapi.io](https://blastapi.io/)
- [دستاویزات](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_زیادہ موثر اور تیز RPC خدمات فراہم کریں_**

- [blockpi.io](https://blockpi.io/)
- [دستاویزات](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum گیٹ وے۔**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - بلاک ایکسپلورر اور ٹرانزیکشن APIs**

- [دستاویزات](https://docs.etherscan.io/)

**Blockscout - اوپن سورس بلاک ایکسپلورر**

- [دستاویزات](https://docs.blockscout.com/)

**GetBlock-** **_Web3 ڈیولپمنٹ کے لیے بلاک چین بطور سروس_**

- [GetBlock.io](https://getblock.io/)
- [دستاویزات](https://docs.getblock.io/)

**Infura -** **_Ethereum API بطور سروس۔_**

- [infura.io](https://infura.io)
- [دستاویزات](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _کفایتی EVM JSON-RPC فراہم کنندہ_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [دستاویزات](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _مکمل نوڈز اور بلاک ایکسپلوررز۔_**

- [NOWNodes.io](https://nownodes.io/)
- [دستاویزات](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_بلاک چین انفراسٹرکچر بطور سروس۔_**

- [quicknode.com](https://quicknode.com)
- [دستاویزات](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_اوپن سورس سافٹ ویئر سے چلنے والی Ethereum اور Ethereum Classic APIs بطور سروس۔_**

- [rivet.cloud](https://rivet.cloud)
- [دستاویزات](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API کے طور پر رفتار پر مبنی Ethereum نوڈز۔_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [دستاویزات](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### ڈیولپمنٹ ٹولز {#development-tools}

**ethers-kt -** **_EVM پر مبنی بلاک چینز کے لیے غیر مطابقت پذیر، اعلی کارکردگی والی Kotlin/Java/Android لائبریری۔_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [مثالیں](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_بلاک چین کے لیے ایک اوپن سورس .NET انٹیگریشن لائبریری۔_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [دستاویزات](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python ٹولنگ -** **_پائیتھون کے ذریعے Ethereum کے ساتھ تعامل کے لیے مختلف لائبریریاں۔_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py چیٹ](https://gitter.im/ethereum/web3.py)

**Tatum -** **_حتمی بلاک چین ڈیولپمنٹ پلیٹ فارم۔_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [دستاویزات](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Ethereum کے لیے ایک Java/Android/Kotlin/Scala انٹیگریشن لائبریری۔_**

- [GitHub](https://github.com/web3j/web3j)
- [دستاویزات](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### بلاک چین خدمات {#blockchain-services}

**BlockCypher -** **_Ethereum ویب APIs۔_**

- [blockcypher.com](https://www.blockcypher.com/)
- [دستاویزات](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Ethereum کے لیے آل ان ون web3 ڈیٹا انفراسٹرکچر۔_**

- [chainbase.com](https://chainbase.com/)
- [دستاویزات](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_بطور سروس لچکدار اور وقف شدہ Ethereum نوڈز۔_**

- [chainstack.com](https://chainstack.com)
- [دستاویزات](https://docs.chainstack.com/)
- [Ethereum API حوالہ](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase کلاؤڈ نوڈ -** **_بلاک چین انفراسٹرکچر API۔_**

- [Coinbase کلاؤڈ نوڈ](https://www.coinbase.com/developer-platform)
- [دستاویزات](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Ethereum مین نیٹ اور ٹیسٹ نیٹس کے ساتھ Web3 API خدمات۔_**

- [DataHub](https://www.figment.io/)
- [دستاویزات](https://docs.figment.io/)

**Moralis -** **_انٹرپرائز-گریڈ EVM API فراہم کنندہ۔_**

- [moralis.io](https://moralis.io)
- [دستاویزات](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [فورم](https://forum.moralis.io/)

**NFTPort -** **_Ethereum ڈیٹا اور منٹ APIs۔_**

- [nftport.xyz](https://www.nftport.xyz/)
- [دستاویزات](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_جنرل ملٹی-کرپٹو بلاک چین APIs پلیٹ فارم۔_**

- [services.tokenview.io](https://services.tokenview.io/)
- [دستاویزات](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Ethereum بلاک چین تک سادہ اور قابل اعتماد API رسائی فراہم کریں۔_**

- [Watchdata](https://watchdata.io/)
- [دستاویزات](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200+ چینز کے لیے افزودہ بلاک چین APIs۔_**

- [covalenthq.com](https://www.covalenthq.com/)
- [دستاویزات](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## مزید پڑھیں {#further-reading}

_کسی کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحہ میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [JavaScript میں Ethereum بلاک چین استعمال کرنے کے لیے Web3js سیٹ اپ کریں](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– آپ کے پروجیکٹ میں web3.js سیٹ اپ کرنے کی ہدایات۔_
- [JavaScript سے ایک اسمارٹ معاہدے کو کال کرنا](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI ٹوکن کا استعمال کرتے ہوئے، دیکھیں کہ JavaScript کا استعمال کرتے ہوئے معاہدے کے فنکشن کو کیسے کال کیا جائے۔_
