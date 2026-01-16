---
title: बैकएंड एपीआई लाइब्रेरी
description: एथेरियम क्लाइंट एपीआई का परिचय जो आपको अपने एप्लिकेशन से ब्लॉकचेन के साथ इंटरैक्ट करने देता है।
lang: hi
---

एक सॉफ्टवेयर एप्लिकेशन को Ethereum ब्लॉकचेन के साथ इंटरैक्ट करने के लिए (यानी, ब्लॉकचेन डेटा पढ़ना और/या नेटवर्क पर लेनदेन भेजना), उसे एक Ethereum नोड से कनेक्ट होना चाहिए।

इस उद्देश्य के लिए, प्रत्येक Ethereum क्लाइंट [JSON-RPC](/developers/docs/apis/json-rpc/) विनिर्देश को लागू करता है, इसलिए [विधियों](/developers/docs/apis/json-rpc/#json-rpc-methods) का एक समान सेट है जिस पर एप्लिकेशन भरोसा कर सकते हैं।

यदि आप एथेरियम नोड से जुड़ने के लिए एक विशिष्ट प्रोग्रामिंग भाषा का उपयोग करना चाहते हैं, तो पारिस्थितिकी तंत्र के भीतर कई सुविधा पुस्तकालय हैं जो इसे बहुत आसान बनाते हैं। इन पुस्तकालयों के साथ, डेवलपर्स एथेरियम के साथ बातचीत करने वाले JSON-RPC अनुरोधों (हुड के नीचे) को प्रारंभ करने के लिए सहज, एक-पंक्ति विधियां लिख सकते हैं।

## पूर्वापेक्षाएं {#prerequisites}

[Ethereum स्टैक](/developers/docs/ethereum-stack/) और [Ethereum क्लाइंट](/developers/docs/nodes-and-clients/) को समझना मददगार हो सकता है।

## पुस्तकालय का उपयोग क्यों करें? {#why-use-a-library}

ये पुस्तकालय एथेरियम नोड के साथ सीधे बातचीत करने की जटिलता को दूर करते हैं। वे यूटिलिटी फ़ंक्शन भी प्रदान करते हैं (जैसे, ETH को Gwei में बदलना) ताकि एक डेवलपर के रूप में आप Ethereum क्लाइंट की जटिलताओं से निपटने में कम समय बिता सकें और अपने एप्लिकेशन की अनूठी कार्यक्षमता पर अधिक समय केंद्रित कर सकें।

## उपलब्ध लाइब्रेरीज़ {#available-libraries}

### इंफ्रास्ट्रक्चर और नोड सेवाएं {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum डेवलपमेंट प्लेटफॉर्म।_**

- [alchemy.com](https://www.alchemy.com/)
- [प्रलेखन](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_नोड-एज़-अ-सर्विस।_**

- [All That Node.com](https://www.allthatnode.com/)
- [प्रलेखन](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_Ethereum मेननेट और टेस्टनेट के लिए विकेंद्रीकृत APIs।_**

- [blastapi.io](https://blastapi.io/)
- [प्रलेखन](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_अधिक कुशल और तेज RPC सेवाएं प्रदान करें_**

- [blockpi.io](https://blockpi.io/)
- [प्रलेखन](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare इथिरीयम द्वार.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**ईथरस्कैन - ब्लॉक एक्सप्लोरर और लेनदेन एपीआई**

- [प्रलेखन](https://docs.etherscan.io/)

**Blockscout - ओपन सोर्स ब्लॉक एक्सप्लोरर**

- [प्रलेखन](https://docs.blockscout.com/)

**GetBlock -** **_Web3 डेवलपमेंट के लिए ब्लॉकचेन-एज-अ-सर्विस_**

- [GetBlock.io](https://getblock.io/)
- [प्रलेखन](https://docs.getblock.io/)

**Infura -** **_एक सेवा के रूप में Ethereum API।_**

- [infura.io](https://infura.io)
- [प्रलेखन](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _लागत-प्रभावी EVM JSON-RPC प्रदाता_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [प्रलेखन](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _फुल नोड्स और ब्लॉक एक्सप्लोरर।_**

- [NOWNodes.io](https://nownodes.io/)
- [प्रलेखन](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_एक सेवा के रूप में ब्लॉकचेन इंफ्रास्ट्रक्चर।_**

- [quicknode.com](https://quicknode.com)
- [प्रलेखन](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_ओपन सोर्स सॉफ्टवेयर द्वारा संचालित एक सेवा के रूप में Ethereum और Ethereum क्लासिक APIs।_**

- [rivet.cloud](https://rivet.cloud)
- [प्रलेखन](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API के रूप में स्पीड-ओरिएंटेड Ethereum नोड्स।_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [प्रलेखन](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### डेवलपमेंट उपकरण {#development-tools}

**ethers-kt -** **_EVM-आधारित ब्लॉकचेन के लिए एसिंक, उच्च-प्रदर्शन Kotlin/Java/Android लाइब्रेरी।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरण](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ब्लॉकचेन के लिए एक ओपन सोर्स .NET इंटीग्रेशन लाइब्रेरी।_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [प्रलेखन](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**पाइथन टूलिंग -** **_पाइथन के माध्यम से Ethereum इंटरेक्शन के लिए विभिन्न प्रकार की लाइब्रेरी।_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py चैट](https://gitter.im/ethereum/web3.py)

**Tatum -** **_अंतिम ब्लॉकचेन डेवलपमेंट प्लेटफॉर्म।_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [प्रलेखन](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Ethereum के लिए एक Java/Android/Kotlin/Scala इंटीग्रेशन लाइब्रेरी।_**

- [GitHub](https://github.com/web3j/web3j)
- [डॉक्स](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ब्लॉकचेन सेवाएं {#blockchain-services}

**BlockCypher -** **_Ethereum वेब APIs।_**

- [blockcypher.com](https://www.blockcypher.com/)
- [प्रलेखन](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Ethereum के लिए ऑल-इन-वन वेब3 डेटा इंफ्रास्ट्रक्चर।_**

- [chainbase.com](https://chainbase.com/)
- [प्रलेखन](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_एक सेवा के रूप में इलास्टिक और समर्पित Ethereum नोड्स।_**

- [chainstack.com](https://chainstack.com)
- [प्रलेखन](https://docs.chainstack.com/)
- [Ethereum API संदर्भ](https://docs.chainstack.com/reference/ethereum-getting-started)

**कॉइनबेस क्लाउड नोड -** **_ब्लॉकचेन इंफ्रास्ट्रक्चर API।_**

- [कॉइनबेस क्लाउड नोड](https://www.coinbase.com/developer-platform)
- [प्रलेखन](https://docs.cdp.coinbase.com/)

**Figment द्वारा DataHub -** **_Ethereum मेननेट और टेस्टनेट के साथ Web3 API सेवाएं।_**

- [DataHub](https://www.figment.io/)
- [प्रलेखन](https://docs.figment.io/)

**Moralis -** **_एंटरप्राइज़-ग्रेड EVM API प्रदाता।_**

- [moralis.io](https://moralis.io)
- [प्रलेखन](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [फ़ोरम](https://forum.moralis.io/)

**NFTPort -** **_Ethereum डेटा और मिंट APIs।_**

- [nftport.xyz](https://www.nftport.xyz/)
- [प्रलेखन](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_सामान्य मल्टी-क्रिप्टो ब्लॉकचेन APIs प्लेटफॉर्म।_**

- [services.tokenview.io](https://services.tokenview.io/)
- [प्रलेखन](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Ethereum ब्लॉकचेन तक सरल और विश्वसनीय API एक्सेस प्रदान करें।_**

- [Watchdata](https://watchdata.io/)
- [प्रलेखन](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200+ चेन्स के लिए समृद्ध ब्लॉकचेन APIs।_**

- [covalenthq.com](https://www.covalenthq.com/)
- [प्रलेखन](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## आगे की रीडिंग {#further-reading}

_क्या आप किसी सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की हो? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [नोड्स और क्लाइंट्स](/developers/docs/nodes-and-clients/)
- [डेवलपमेंट फ्रेमवर्क](/developers/docs/frameworks/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [जावास्क्रिप्ट में Ethereum ब्लॉकचेन का उपयोग करने के लिए Web3js सेट अप करें](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– अपने प्रोजेक्ट में web3.js को सेट अप करने के निर्देश।_
- [जावास्क्रिप्ट से स्मार्ट अनुबंध को कॉल करना](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन का उपयोग करके, देखें कि जावास्क्रिप्ट का उपयोग करके अनुबंध फ़ंक्शन को कैसे कॉल किया जाए।_
