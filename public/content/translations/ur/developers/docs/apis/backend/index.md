---
title: "بیک اینڈ ⁦API⁩ لائبریریز"
description: "ایتھیریم کلائنٹ ⁦APIs⁩ کا تعارف جو آپ کو اپنی ایپلیکیشن سے بلاک چین کے ساتھ تعامل کرنے کی سہولت دیتے ہیں۔"
lang: ur
---

کسی سافٹ ویئر ایپلیکیشن کو [ایتھیریم](/) بلاک چین کے ساتھ تعامل کرنے (یعنی بلاک چین کا ڈیٹا پڑھنے اور/یا نیٹ ورک پر ٹرانزیکشنز بھیجنے) کے لیے، اسے ایک ایتھیریم نوڈ سے منسلک ہونا ضروری ہے۔

اس مقصد کے لیے، ہر ایتھیریم کلائنٹ [جے سن آر پی سی](/developers/docs/apis/json-rpc/) تصریح کو نافذ کرتا ہے، تاکہ [طریقہ کار (methods)](/developers/docs/apis/json-rpc/#json-rpc-methods) کا ایک یکساں مجموعہ موجود ہو جس پر ایپلیکیشنز انحصار کر سکیں۔

اگر آپ ایتھیریم نوڈ سے منسلک ہونے کے لیے کوئی مخصوص پروگرامنگ زبان استعمال کرنا چاہتے ہیں، تو ایکو سسٹم میں بہت سی سہولت بخش لائبریریاں موجود ہیں جو اسے بہت آسان بناتی ہیں۔ ان لائبریریوں کے ساتھ، ڈیولپرز جے سن آر پی سی درخواستوں کو (اندرونی طور پر) شروع کرنے کے لیے آسان، ایک سطری طریقہ کار لکھ سکتے ہیں جو ایتھیریم کے ساتھ تعامل کرتے ہیں۔

## شرائط {#prerequisites}

[ایتھیریم اسٹیک](/developers/docs/ethereum-stack/) اور [ایتھیریم کلائنٹس](/developers/docs/nodes-and-clients/) کو سمجھنا مددگار ثابت ہو سکتا ہے۔

## لائبریری کیوں استعمال کریں؟ {#why-use-a-library}

یہ لائبریریاں براہ راست ایتھیریم نوڈ کے ساتھ تعامل کرنے کی زیادہ تر پیچیدگی کو دور کر دیتی ہیں۔ یہ افادیت کے فنکشنز بھی فراہم کرتی ہیں (مثلاً، <span dir="ltr">ETH</span> کو <span dir="ltr">Gwei</span> میں تبدیل کرنا) تاکہ ایک ڈیولپر کے طور پر آپ ایتھیریم کلائنٹس کی پیچیدگیوں سے نمٹنے میں کم وقت صرف کریں اور اپنی ایپلیکیشن کی منفرد فعالیت پر زیادہ توجہ مرکوز کر سکیں۔

## دستیاب لائبریریاں {#available-libraries}

### انفراسٹرکچر اور نوڈ سروسز {#infrastructure-and-node-services}

**Alchemy -** **_ایتھیریم ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">alchemy.com</span>](https://www.alchemy.com/)
- [دستاویزات](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [ڈسکارڈ](https://discord.com/invite/alchemyplatform)
  
**<span dir="ltr">All That Node</span> -** **_نوڈ ایز اے سروس (<span dir="ltr">Node-as-a-Service</span>)۔_**

- [<span dir="ltr">All That Node.com</span>](https://www.allthatnode.com/)
- [دستاویزات](https://docs.allthatnode.com)
- [ڈسکارڈ](https://discord.gg/GmcdVEUbJM)

**<span dir="ltr">Bware Labs</span> کی جانب سے Blast -** **_ایتھیریم مین نیٹ اور ٹیسٹ نیٹس کے لیے غیر مرکزی ⁦APIs⁩۔_**

- [<span dir="ltr">blastapi.io</span>](https://blastapi.io/)
- [دستاویزات](https://docs.blastapi.io)
- [ڈسکارڈ](https://discord.gg/SaRqmRUjjQ)

**<span dir="ltr">BlockPi</span> -** **_زیادہ موثر اور تیز ⁦RPC⁩ سروسز فراہم کرتا ہے_**

- [<span dir="ltr">blockpi.io</span>](https://blockpi.io/)
- [دستاویزات](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [ڈسکارڈ](https://discord.com/invite/xTvGVrGVZv)

**<span dir="ltr">Cloudflare</span> ایتھیریم گیٹ وے۔**

- [<span dir="ltr">cloudflare-eth.com</span>](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - بلاک ایکسپلورر اور ٹرانزیکشن ⁦APIs⁩**
- [دستاویزات](https://docs.etherscan.io/)

**Blockscout - اوپن سورس بلاک ایکسپلورر**
- [دستاویزات](https://docs.blockscout.com/)

**<span dir="ltr">GetBlock</span>-** **_Web3 ڈیولپمنٹ کے لیے بلاک چین ایز اے سروس (<span dir="ltr">Blockchain-as-a-service</span>)_**

- [<span dir="ltr">GetBlock.io</span>](https://getblock.io/)
- [دستاویزات](https://docs.getblock.io/)

**Infura -** **_ایتھیریم ⁦API⁩ بطور سروس۔_**

- [<span dir="ltr">infura.io</span>](https://infura.io)
- [دستاویزات](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**<span dir="ltr">Node RPC</span> - _کم لاگت ⁦EVM⁩ جے سن آر پی سی پرووائیڈر_**

- [<span dir="ltr">noderpc.xyz</span>](https://www.noderpc.xyz/)
- [دستاویزات](https://docs.noderpc.xyz/node-rpc)

**<span dir="ltr">NOWNodes</span> - _فل نوڈز اور بلاک ایکسپلوررز۔_**

- [<span dir="ltr">NOWNodes.io</span>](https://nownodes.io/)
- [دستاویزات](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_بلاک چین انفراسٹرکچر بطور سروس۔_**

- [<span dir="ltr">quicknode.com</span>](https://quicknode.com)
- [دستاویزات](https://www.quicknode.com/docs/welcome)
- [ڈسکارڈ](https://discord.gg/quicknode)

**<span dir="ltr">Rivet</span> -** **_اوپن سورس سافٹ ویئر سے چلنے والی ایتھیریم اور ایتھیریم کلاسک ⁦APIs⁩ بطور سروس۔_**

- [<span dir="ltr">rivet.cloud</span>](https://rivet.cloud)
- [دستاویزات](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**<span dir="ltr">Zmok</span> -** **_رفتار پر مبنی ایتھیریم نوڈز بطور جے سن آر پی سی/ویب ساکٹس (<span dir="ltr">WebSockets</span>) ⁦API⁩۔_**

- [<span dir="ltr">zmok.io</span>](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [دستاویزات](https://docs.zmok.io/)
- [ڈسکارڈ](https://discord.gg/fAHeh3ka6s)

### ڈیولپمنٹ ٹولز {#development-tools}

**<span dir="ltr">ethers-kt</span> -** **_⁦EVM⁩ پر مبنی بلاک چینز کے لیے غیر مطابقت پذیر (<span dir="ltr">Async</span>)، اعلیٰ کارکردگی والی <span dir="ltr">Kotlin</span>/Java/Android لائبریری۔_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [مثالیں](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ڈسکارڈ](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_بلاک چین کے لیے ایک اوپن سورس <span dir="ltr">.NET</span> انضمام لائبریری۔_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [دستاویزات](https://docs.nethereum.com/docs/getting-started/welcome/)
- [ڈسکارڈ](https://discord.com/invite/jQPrR58FxX)

**Python ٹولنگ -** **_Python کے ذریعے ایتھیریم کے ساتھ تعامل کے لیے مختلف لائبریریاں۔_**

- [<span dir="ltr">py.ethereum.org</span>](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py چیٹ](https://gitter.im/ethereum/web3.py)

**<span dir="ltr">Tatum</span> -** **_حتمی بلاک چین ڈیولپمنٹ پلیٹ فارم۔_**

- [<span dir="ltr">Tatum</span>](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [دستاویزات](https://docs.tatum.io/)
- [ڈسکارڈ](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_ایتھیریم کے لیے ایک Java/Android/<span dir="ltr">Kotlin</span>/<span dir="ltr">Scala</span> انضمام لائبریری۔_**

- [GitHub](https://github.com/web3j/web3j)
- [دستاویزات](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### بلاک چین سروسز {#blockchain-services}

**<span dir="ltr">BlockCypher</span> -** **_ایتھیریم ویب ⁦APIs⁩۔_**

- [<span dir="ltr">blockcypher.com</span>](https://www.blockcypher.com/)
- [دستاویزات](https://www.blockcypher.com/dev/ethereum/)

**<span dir="ltr">Chainbase</span> -** **_ایتھیریم کے لیے ہمہ گیر (<span dir="ltr">All-in-one</span>) Web3 ڈیٹا انفراسٹرکچر۔_**

- [<span dir="ltr">chainbase.com</span>](https://chainbase.com/)
- [دستاویزات](https://docs.chainbase.com/)
- [ڈسکارڈ](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_لچکدار اور مخصوص ایتھیریم نوڈز بطور سروس۔_**

- [<span dir="ltr">chainstack.com</span>](https://chainstack.com)
- [دستاویزات](https://docs.chainstack.com/)
- [ایتھیریم ⁦API⁩ حوالہ](https://docs.chainstack.com/reference/ethereum-getting-started)

**کوائن بیس کلاؤڈ نوڈ -** **_بلاک چین انفراسٹرکچر ⁦API⁩۔_**

- [کوائن بیس کلاؤڈ نوڈ](https://www.coinbase.com/developer-platform)
- [دستاویزات](https://docs.cdp.coinbase.com/)

**<span dir="ltr">Figment</span> کی جانب سے <span dir="ltr">DataHub</span> -** **_ایتھیریم مین نیٹ اور ٹیسٹ نیٹس کے ساتھ Web3 ⁦API⁩ سروسز۔_**

- [<span dir="ltr">DataHub</span>](https://www.figment.io/)
- [دستاویزات](https://docs.figment.io/)

**Moralis -** **_انٹرپرائز گریڈ ⁦EVM API⁩ پرووائیڈر۔_**

- [<span dir="ltr">moralis.io</span>](https://moralis.io)
- [دستاویزات](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [ڈسکارڈ](https://moralis.io/joindiscord/)
- [فورم](https://forum.moralis.io/)

**<span dir="ltr">NFTPort</span> -** **_ایتھیریم ڈیٹا اور ڈھالنے (<span dir="ltr">Mint</span>) کی ⁦APIs⁩۔_**

- [<span dir="ltr">nftport.xyz</span>](https://www.nftport.xyz/)
- [دستاویزات](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [ڈسکارڈ](https://discord.com/invite/K8nNrEgqhE)

**<span dir="ltr">Tokenview</span> -** **_عام ملٹی کرپٹو بلاک چین ⁦APIs⁩ پلیٹ فارم۔_**

- [<span dir="ltr">services.tokenview.io</span>](https://services.tokenview.io/)
- [دستاویزات](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**<span dir="ltr">Watchdata</span> -** **_ایتھیریم بلاک چین تک سادہ اور قابل اعتماد ⁦API⁩ رسائی فراہم کرتا ہے۔_**

- [<span dir="ltr">Watchdata</span>](https://watchdata.io/)
- [دستاویزات](https://docs.watchdata.io/)
- [ڈسکارڈ](https://discord.com/invite/TZRJbZ6bdn)

**<span dir="ltr">Codex</span> -** **_درجنوں چینز پر ریئل ٹائم، افزودہ بلاک چین ڈیٹا ⁦API⁩۔_**

- [<span dir="ltr">codex.io</span>](https://www.codex.io/)
- [دستاویزات](https://docs.codex.io)
- [ایکسپلورر](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [ڈسکارڈ](https://discord.com/invite/mFpUhT3vAq)

**<span dir="ltr">Covalent</span> -** **_<span dir="ltr">200+</span> چینز کے لیے افزودہ بلاک چین ⁦APIs⁩۔_**

- [<span dir="ltr">covalenthq.com</span>](https://www.covalenthq.com/)
- [دستاویزات](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [ڈسکارڈ](https://www.covalenthq.com/discord/)


## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [JavaScript میں ایتھیریم بلاک چین استعمال کرنے کے لیے Web3.js سیٹ اپ کریں](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– اپنے پروجیکٹ میں Web3.js سیٹ اپ کرنے کی ہدایات۔_
- [JavaScript سے سمارٹ کنٹریکٹ کو کال کرنا](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI ٹوکن کا استعمال کرتے ہوئے، دیکھیں کہ JavaScript کا استعمال کر کے کنٹریکٹس فنکشن کو کیسے کال کیا جائے۔_