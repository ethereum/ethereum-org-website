---
title: "बैकएंड API लाइब्रेरी"
description: "इथेरियम क्लाइंट API का परिचय जो आपको अपने एप्लिकेशन से ब्लॉकचेन के साथ इंटरैक्ट करने की सुविधा देते हैं।"
lang: hi
---

किसी सॉफ़्टवेयर एप्लिकेशन को [इथेरियम](/) ब्लॉकचेन के साथ इंटरैक्ट करने (यानी, ब्लॉकचेन डेटा पढ़ने और/या नेटवर्क पर लेन-देन भेजने) के लिए, उसे एक इथेरियम नोड से कनेक्ट होना चाहिए।

इस उद्देश्य के लिए, हर इथेरियम क्लाइंट [जेसन-आरपीसी](/developers/docs/apis/json-rpc/) विनिर्देश को लागू करता है, ताकि [तरीकों (methods)](/developers/docs/apis/json-rpc/#json-rpc-methods) का एक समान सेट हो जिस पर एप्लिकेशन भरोसा कर सकें।

यदि आप इथेरियम नोड से जुड़ने के लिए किसी विशिष्ट प्रोग्रामिंग भाषा का उपयोग करना चाहते हैं, तो इकोसिस्टम के भीतर कई सुविधाजनक लाइब्रेरी हैं जो इसे बहुत आसान बनाती हैं। इन लाइब्रेरी के साथ, डेवलपर्स इथेरियम के साथ इंटरैक्ट करने वाले जेसन-आरपीसी अनुरोधों (आंतरिक रूप से) को शुरू करने के लिए सहज, एक-पंक्ति वाले तरीके लिख सकते हैं।

## पूर्वापेक्षाएँ {#prerequisites}

[इथेरियम स्टैक](/developers/docs/ethereum-stack/) और [इथेरियम क्लाइंट](/developers/docs/nodes-and-clients/) को समझना मददगार हो सकता है।

## लाइब्रेरी का उपयोग क्यों करें? {#why-use-a-library}

ये लाइब्रेरी सीधे इथेरियम नोड के साथ इंटरैक्ट करने की अधिकांश जटिलता को दूर कर देती हैं। वे उपयोगिता फ़ंक्शन (जैसे, ETH को Gwei में बदलना) भी प्रदान करती हैं ताकि एक डेवलपर के रूप में आप इथेरियम क्लाइंट की पेचीदगियों से निपटने में कम समय बिताएं और अपने एप्लिकेशन की अनूठी कार्यक्षमता पर अधिक ध्यान केंद्रित कर सकें।

## उपलब्ध लाइब्रेरी {#available-libraries}

### इन्फ्रास्ट्रक्चर और नोड सेवाएं {#infrastructure-and-node-services}

**Alchemy -** **_इथेरियम डेवलपमेंट प्लेटफ़ॉर्म।_**

- [alchemy.com](https://www.alchemy.com/)
- [दस्तावेज़ीकरण](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [डिस्कॉर्ड](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_नोड-एज़-ए-सर्विस (Node-as-a-Service)।_**

- [All That Node.com](https://www.allthatnode.com/)
- [दस्तावेज़ीकरण](https://docs.allthatnode.com)
- [डिस्कॉर्ड](https://discord.gg/GmcdVEUbJM)

**Bware Labs द्वारा Blast -** **_इथेरियम मेननेट और टेस्टनेट के लिए विकेंद्रीकृत API।_**

- [blastapi.io](https://blastapi.io/)
- [दस्तावेज़ीकरण](https://docs.blastapi.io)
- [डिस्कॉर्ड](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_अधिक कुशल और तेज़ RPC सेवाएं प्रदान करता है_**

- [blockpi.io](https://blockpi.io/)
- [दस्तावेज़ीकरण](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [डिस्कॉर्ड](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ब्लॉक एक्सप्लोरर और लेन-देन API**
- [दस्तावेज़ीकरण](https://docs.etherscan.io/)

**Blockscout - ओपन सोर्स ब्लॉक एक्सप्लोरर**
- [दस्तावेज़ीकरण](https://docs.blockscout.com/)

**GetBlock-** **_Web3 विकास के लिए ब्लॉकचेन-एज़-ए-सर्विस (Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [दस्तावेज़ीकरण](https://docs.getblock.io/)

**Infura -** **_एक सेवा के रूप में इथेरियम API।_**

- [infura.io](https://infura.io)
- [दस्तावेज़ीकरण](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _किफायती EVM जेसन-आरपीसी प्रदाता_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [दस्तावेज़ीकरण](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _फुल नोड और ब्लॉक एक्सप्लोरर।_**

- [NOWNodes.io](https://nownodes.io/)
- [दस्तावेज़ीकरण](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_ब्लॉकचेन इन्फ्रास्ट्रक्चर-एज़-ए-सर्विस (Blockchain Infrastructure as a Service)।_**

- [quicknode.com](https://quicknode.com)
- [दस्तावेज़ीकरण](https://www.quicknode.com/docs/welcome)
- [डिस्कॉर्ड](https://discord.gg/quicknode)

**Rivet -** **_ओपन सोर्स सॉफ़्टवेयर द्वारा संचालित एक सेवा के रूप में इथेरियम और इथेरियम क्लासिक API।_**

- [rivet.cloud](https://rivet.cloud)
- [दस्तावेज़ीकरण](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_जेसन-आरपीसी/WebSockets API के रूप में गति-उन्मुख इथेरियम नोड।_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [दस्तावेज़ीकरण](https://docs.zmok.io/)
- [डिस्कॉर्ड](https://discord.gg/fAHeh3ka6s)

### विकास उपकरण {#development-tools}

**ethers-kt -** **_EVM-आधारित ब्लॉकचेन के लिए एसिंक (Async), उच्च-प्रदर्शन वाली Kotlin/Java/Android लाइब्रेरी।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरण](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [डिस्कॉर्ड](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ब्लॉकचेन के लिए एक ओपन सोर्स .NET इंटीग्रेशन लाइब्रेरी।_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [दस्तावेज़ीकरण](https://docs.nethereum.com/docs/getting-started/welcome/)
- [डिस्कॉर्ड](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Python के माध्यम से इथेरियम इंटरैक्शन के लिए विभिन्न प्रकार की लाइब्रेरी।_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py चैट](https://gitter.im/ethereum/web3.py)

**Tatum -** **_सर्वश्रेष्ठ ब्लॉकचेन डेवलपमेंट प्लेटफ़ॉर्म।_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [दस्तावेज़ीकरण](https://docs.tatum.io/)
- [डिस्कॉर्ड](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_इथेरियम के लिए एक Java/Android/Kotlin/Scala इंटीग्रेशन लाइब्रेरी।_**

- [GitHub](https://github.com/web3j/web3j)
- [दस्तावेज़](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ब्लॉकचेन सेवाएं {#blockchain-services}

**BlockCypher -** **_इथेरियम वेब API।_**

- [blockcypher.com](https://www.blockcypher.com/)
- [दस्तावेज़ीकरण](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_इथेरियम के लिए ऑल-इन-वन Web3 डेटा इन्फ्रास्ट्रक्चर।_**

- [chainbase.com](https://chainbase.com/)
- [दस्तावेज़ीकरण](https://docs.chainbase.com/)
- [डिस्कॉर्ड](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_एक सेवा के रूप में इलास्टिक और समर्पित इथेरियम नोड।_**

- [chainstack.com](https://chainstack.com)
- [दस्तावेज़ीकरण](https://docs.chainstack.com/)
- [इथेरियम API संदर्भ](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_ब्लॉकचेन इन्फ्रास्ट्रक्चर API।_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [दस्तावेज़ीकरण](https://docs.cdp.coinbase.com/)

**Figment द्वारा DataHub -** **_इथेरियम मेननेट और टेस्टनेट के साथ Web3 API सेवाएं।_**

- [DataHub](https://www.figment.io/)
- [दस्तावेज़ीकरण](https://docs.figment.io/)

**Moralis -** **_एंटरप्राइज़-ग्रेड EVM API प्रदाता।_**

- [moralis.io](https://moralis.io)
- [दस्तावेज़ीकरण](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [डिस्कॉर्ड](https://moralis.io/joindiscord/)
- [फ़ोरम](https://forum.moralis.io/)

**NFTPort -** **_इथेरियम डेटा और मिंट API।_**

- [nftport.xyz](https://www.nftport.xyz/)
- [दस्तावेज़ीकरण](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [डिस्कॉर्ड](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_सामान्य मल्टी-क्रिप्टो ब्लॉकचेन API प्लेटफ़ॉर्म।_**

- [services.tokenview.io](https://services.tokenview.io/)
- [दस्तावेज़ीकरण](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_इथेरियम ब्लॉकचेन तक सरल और विश्वसनीय API पहुंच प्रदान करता है।_**

- [Watchdata](https://watchdata.io/)
- [दस्तावेज़ीकरण](https://docs.watchdata.io/)
- [डिस्कॉर्ड](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_दर्जनों चेन में रीयल-टाइम, समृद्ध ब्लॉकचेन डेटा API।_**

- [codex.io](https://www.codex.io/)
- [दस्तावेज़ीकरण](https://docs.codex.io)
- [एक्सप्लोरर](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [डिस्कॉर्ड](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200+ चेन के लिए समृद्ध ब्लॉकचेन API।_**

- [covalenthq.com](https://www.covalenthq.com/)
- [दस्तावेज़ीकरण](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [डिस्कॉर्ड](https://www.covalenthq.com/discord/)


## आगे की जानकारी {#further-reading}

_क्या आप किसी ऐसे सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की हो? इस पेज को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [नोड और क्लाइंट](/developers/docs/nodes-and-clients/)
- [डेवलपमेंट फ्रेमवर्क](/developers/docs/frameworks/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [JavaScript में इथेरियम ब्लॉकचेन का उपयोग करने के लिए Web3.js सेट अप करें](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– अपने प्रोजेक्ट में Web3.js सेट अप करने के निर्देश।_
- [JavaScript से स्मार्ट अनुबंध को कॉल करना](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन का उपयोग करके, देखें कि JavaScript का उपयोग करके अनुबंध फ़ंक्शन को कैसे कॉल किया जाए।_