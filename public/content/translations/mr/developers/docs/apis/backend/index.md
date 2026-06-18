---
title: बॅकएंड API लायब्ररी
description: इथेरियम क्लायंट APIs ची ओळख जी तुम्हाला तुमच्या ॲप्लिकेशनमधून ब्लॉकचेनशी संवाद साधू देते.
lang: mr
---

सॉफ्टवेअर ॲप्लिकेशनला [इथेरियम](/) ब्लॉकचेनशी संवाद साधण्यासाठी (म्हणजेच, ब्लॉकचेन डेटा वाचण्यासाठी आणि/किंवा नेटवर्कवर व्यवहार पाठवण्यासाठी), ते इथेरियम नोडशी कनेक्ट केलेले असणे आवश्यक आहे.

या उद्देशासाठी, प्रत्येक इथेरियम क्लायंट [जेसॉन-आरपीसी](/developers/docs/apis/json-rpc/) स्पेसिफिकेशन लागू करतो, त्यामुळे [पद्धतींचा](/developers/docs/apis/json-rpc/#json-rpc-methods) एक समान संच आहे ज्यावर ॲप्लिकेशन्स अवलंबून राहू शकतात.

जर तुम्हाला इथेरियम नोडशी कनेक्ट करण्यासाठी विशिष्ट प्रोग्रामिंग भाषेचा वापर करायचा असेल, तर इकोसिस्टममध्ये अनेक सोयीस्कर लायब्ररी आहेत ज्या हे खूप सोपे करतात. या लायब्ररींच्या मदतीने, डेव्हलपर्स इथेरियमशी संवाद साधणाऱ्या जेसॉन-आरपीसी विनंत्या (अंतर्गतपणे) सुरू करण्यासाठी अंतर्ज्ञानी, एका ओळीच्या पद्धती लिहू शकतात.

## पूर्वअटी {#prerequisites}

[इथेरियम स्टॅक](/developers/docs/ethereum-stack/) आणि [इथेरियम क्लायंट्स](/developers/docs/nodes-and-clients/) समजून घेणे उपयुक्त ठरू शकते.

## लायब्ररी का वापरावी? {#why-use-a-library}

या लायब्ररी इथेरियम नोडशी थेट संवाद साधण्याची बरीचशी गुंतागुंत दूर करतात. त्या युटिलिटी फंक्शन्स देखील प्रदान करतात (उदा., ETH चे Gwei मध्ये रूपांतर करणे) जेणेकरून एक डेव्हलपर म्हणून तुम्ही इथेरियम क्लायंट्सच्या गुंतागुंती हाताळण्यात कमी वेळ घालवू शकता आणि तुमच्या ॲप्लिकेशनच्या अद्वितीय कार्यक्षमतेवर अधिक लक्ष केंद्रित करू शकता.

## उपलब्ध लायब्ररी {#available-libraries}

### पायाभूत सुविधा आणि नोड सेवा {#infrastructure-and-node-services}

**Alchemy -** **_इथेरियम डेव्हलपमेंट प्लॅटफॉर्म._**

- [alchemy.com](https://www.alchemy.com/)
- [डॉक्युमेंटेशन](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [डिस्कॉर्ड्](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_नोड-ॲज-अ-सर्व्हिस._**

- [All That Node.com](https://www.allthatnode.com/)
- [डॉक्युमेंटेशन](https://docs.allthatnode.com)
- [डिस्कॉर्ड्](https://discord.gg/GmcdVEUbJM)

**Bware Labs द्वारे Blast -** **_इथरियम मेननेट आणि टेस्टनेट्ससाठी विकेंद्रित APIs._**

- [blastapi.io](https://blastapi.io/)
- [डॉक्युमेंटेशन](https://docs.blastapi.io)
- [डिस्कॉर्ड्](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_अधिक कार्यक्षम आणि जलद RPC सेवा प्रदान करते_**

- [blockpi.io](https://blockpi.io/)
- [डॉक्युमेंटेशन](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [डिस्कॉर्ड्](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare इथेरियम गेटवे.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ब्लॉक एक्सप्लोरर आणि व्यवहार APIs**
- [डॉक्युमेंटेशन](https://docs.etherscan.io/)

**Blockscout - ओपन सोर्स ब्लॉक एक्सप्लोरर**
- [डॉक्युमेंटेशन](https://docs.blockscout.com/)

**GetBlock-** **_Web3 डेव्हलपमेंटसाठी ब्लॉकचेन-ॲज-अ-सर्व्हिस_**

- [GetBlock.io](https://getblock.io/)
- [डॉक्युमेंटेशन](https://docs.getblock.io/)

**Infura -** **_इथेरियम API ॲज अ सर्व्हिस._**

- [infura.io](https://infura.io)
- [डॉक्युमेंटेशन](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**नोड RPC - _किफायतशीर EVM जेसॉन-आरपीसी प्रोव्हायडर_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [डॉक्युमेंटेशन](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _फुल नोड्स आणि ब्लॉक एक्सप्लोरर्स._**

- [NOWNodes.io](https://nownodes.io/)
- [डॉक्युमेंटेशन](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_ब्लॉकचेन इन्फ्रास्ट्रक्चर ॲज अ सर्व्हिस._**

- [quicknode.com](https://quicknode.com)
- [डॉक्युमेंटेशन](https://www.quicknode.com/docs/welcome)
- [डिस्कॉर्ड्](https://discord.gg/quicknode)

**Rivet -** **_ओपन सोर्स सॉफ्टवेअरद्वारे समर्थित इथेरियम आणि इथेरियम क्लासिक APIs ॲज अ सर्व्हिस._**

- [rivet.cloud](https://rivet.cloud)
- [डॉक्युमेंटेशन](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_जेसॉन-आरपीसी/WebSockets API म्हणून गती-देणारे इथेरियम नोड्स._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [डॉक्युमेंटेशन](https://docs.zmok.io/)
- [डिस्कॉर्ड्](https://discord.gg/fAHeh3ka6s)

### डेव्हलपमेंट टूल्स {#development-tools}

**ethers-kt -** **_EVM-आधारित ब्लॉकचेनसाठी असिंक, उच्च-कार्यक्षमता असलेली Kotlin/Java/Android लायब्ररी._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरणे](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [डिस्कॉर्ड्](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ब्लॉकचेनसाठी एक ओपन सोर्स .NET इंटिग्रेशन लायब्ररी._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [डॉक्युमेंटेशन](https://docs.nethereum.com/docs/getting-started/welcome/)
- [डिस्कॉर्ड्](https://discord.com/invite/jQPrR58FxX)

**Python टूलिंग -** **_Python द्वारे इथेरियम संवादासाठी विविध लायब्ररी._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py चॅट](https://gitter.im/ethereum/web3.py)

**Tatum -** **_सर्वोत्तम ब्लॉकचेन डेव्हलपमेंट प्लॅटफॉर्म._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [डॉक्युमेंटेशन](https://docs.tatum.io/)
- [डिस्कॉर्ड्](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_इथेरियमसाठी एक Java/Android/Kotlin/Scala इंटिग्रेशन लायब्ररी._**

- [GitHub](https://github.com/web3j/web3j)
- [डॉक्युमेंट्स](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ब्लॉकचेन सेवा {#blockchain-services}

**BlockCypher -** **_इथेरियम वेब APIs._**

- [blockcypher.com](https://www.blockcypher.com/)
- [डॉक्युमेंटेशन](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_इथेरियमसाठी ऑल-इन-वन Web3 डेटा इन्फ्रास्ट्रक्चर._**

- [chainbase.com](https://chainbase.com/)
- [डॉक्युमेंटेशन](https://docs.chainbase.com/)
- [डिस्कॉर्ड्](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_इलास्टिक आणि समर्पित इथेरियम नोड्स ॲज अ सर्व्हिस._**

- [chainstack.com](https://chainstack.com)
- [डॉक्युमेंटेशन](https://docs.chainstack.com/)
- [इथेरियम API संदर्भ](https://docs.chainstack.com/reference/ethereum-getting-started)

**कॉइनबेस् क्लाउड नोड -** **_ब्लॉकचेन इन्फ्रास्ट्रक्चर API._**

- [कॉइनबेस् क्लाउड नोड](https://www.coinbase.com/developer-platform)
- [डॉक्युमेंटेशन](https://docs.cdp.coinbase.com/)

**Figment द्वारे DataHub -** **_इथरियम मेननेट आणि टेस्टनेट्ससह Web3 API सेवा._**

- [DataHub](https://www.figment.io/)
- [डॉक्युमेंटेशन](https://docs.figment.io/)

**Moralis -** **_एंटरप्राइझ-ग्रेड EVM API प्रोव्हायडर._**

- [moralis.io](https://moralis.io)
- [डॉक्युमेंटेशन](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [डिस्कॉर्ड्](https://moralis.io/joindiscord/)
- [फोरम](https://forum.moralis.io/)

**NFTPort -** **_इथेरियम डेटा आणि मिंट APIs._**

- [nftport.xyz](https://www.nftport.xyz/)
- [डॉक्युमेंटेशन](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [डिस्कॉर्ड्](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_सामान्य मल्टी-क्रिप्टो ब्लॉकचेन APIs प्लॅटफॉर्म._**

- [services.tokenview.io](https://services.tokenview.io/)
- [डॉक्युमेंटेशन](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_इथेरियम ब्लॉकचेनला सोपा आणि विश्वासार्ह API ॲक्सेस प्रदान करते._**

- [Watchdata](https://watchdata.io/)
- [डॉक्युमेंटेशन](https://docs.watchdata.io/)
- [डिस्कॉर्ड्](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_अनेक चेन्सवर रिअल-टाइम, समृद्ध ब्लॉकचेन डेटा API._**

- [codex.io](https://www.codex.io/)
- [डॉक्युमेंटेशन](https://docs.codex.io)
- [एक्सप्लोरर](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [डिस्कॉर्ड्](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200+ चेन्ससाठी समृद्ध ब्लॉकचेन APIs._**

- [covalenthq.com](https://www.covalenthq.com/)
- [डॉक्युमेंटेशन](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [डिस्कॉर्ड्](https://www.covalenthq.com/discord/)


## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या एखाद्या कम्युनिटी रिसोर्सबद्दल माहिती आहे का? हे पेज एडिट करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [नोड्स आणि क्लायंट्स](/developers/docs/nodes-and-clients/)
- [डेव्हलपमेंट फ्रेमवर्क्स](/developers/docs/frameworks/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [JavaScript मध्ये इथेरियम ब्लॉकचेन वापरण्यासाठी Web3.js सेट करा](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– तुमच्या प्रोजेक्टमध्ये Web3.js सेट करण्यासाठी सूचना._
- [JavaScript मधून स्मार्ट कॉन्ट्रॅक्ट कॉल करणे](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन वापरून, JavaScript चा वापर करून कॉन्ट्रॅक्ट्स फंक्शन कसे कॉल करायचे ते पहा._