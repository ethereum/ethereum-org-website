---
title: "बॅकएंड API लायब्ररीज"
description: "इथेरियम क्लायंट APIs ची ओळख, जी तुम्हाला तुमच्या ॲप्लिकेशनमधून ब्लॉकचेनसोबत संवाद साधू देते."
lang: mr
---

एखाद्या सॉफ्टवेअर ॲप्लिकेशनला इथेरियम ब्लॉकचेनशी संवाद साधण्यासाठी (म्हणजे, ब्लॉकचेन डेटा वाचणे आणि/किंवा नेटवर्कवर व्यवहार पाठवणे), त्याला इथेरियम नोडशी कनेक्ट करणे आवश्यक आहे.

या उद्देशासाठी, प्रत्येक इथेरियम क्लायंट [JSON-RPC](/developers/docs/apis/json-rpc/) तपशीलाची अंमलबजावणी करतो, त्यामुळे [पद्धतींचा](/developers/docs/apis/json-rpc/#json-rpc-methods) एकसमान संच उपलब्ध आहे ज्यावर ॲप्लिकेशन्स अवलंबून राहू शकतात.

जर तुम्हाला इथेरियम नोडशी कनेक्ट करण्यासाठी विशिष्ट प्रोग्रामिंग भाषा वापरायची असेल, तर इकोसिस्टममध्ये अनेक सोयीस्कर लायब्ररीज आहेत ज्या हे खूप सोपे करतात. या लायब्ररीजच्या मदतीने, डेव्हलपर इथेरियमशी संवाद साधणाऱ्या JSON-RPC विनंत्या (पडद्याआड) सुरू करण्यासाठी सहज, एका ओळीच्या पद्धती लिहू शकतात.

## पूर्वतयारी {#prerequisites}

[इथेरियम स्टॅक](/developers/docs/ethereum-stack/) आणि [इथेरियम क्लायंट](/developers/docs/nodes-and-clients/) समजून घेणे उपयुक्त ठरू शकते.

## लायब्ररी का वापरावी? {#why-use-a-library}

या लायब्ररीज इथेरियम नोडशी थेट संवाद साधण्यातील बरीचशी गुंतागुंत दूर करतात. त्या उपयुक्तता कार्ये (utility functions) देखील प्रदान करतात (उदा. ETH चे Gwei मध्ये रूपांतर करणे), त्यामुळे एक डेव्हलपर म्हणून तुम्ही इथेरियम क्लायंटच्या गुंतागुंतीमध्ये कमी वेळ घालवून तुमच्या ॲप्लिकेशनच्या अद्वितीय कार्यक्षमतेवर अधिक लक्ष केंद्रित करू शकता.

## उपलब्ध लायब्ररीज {#available-libraries}

### पायाभूत सुविधा आणि नोड सेवा {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum डेव्हलपमेंट प्लॅटफॉर्म._**

- [alchemy.com](https://www.alchemy.com/)
- [दस्तऐवजीकरण](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [दस्तऐवजीकरण](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_इथेरियम मेननेट आणि टेस्टनेटसाठी विकेंद्रित APIs._**

- [blastapi.io](https://blastapi.io/)
- [दस्तऐवजीकरण](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_अधिक कार्यक्षम आणि जलद RPC सेवा प्रदान करते_**

- [blockpi.io](https://blockpi.io/)
- [दस्तऐवजीकरण](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare इथेरियम गेटवे.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ब्लॉक एक्सप्लोरर आणि ट्रान्झॅक्शन APIs**

- [दस्तऐवजीकरण](https://docs.etherscan.io/)

**Blockscout - ओपन सोर्स ब्लॉक एक्सप्लोरर**

- [दस्तऐवजीकरण](https://docs.blockscout.com/)

**GetBlock-** **_Web3 विकासासाठी सेवा म्हणून ब्लॉकचेन_**

- [GetBlock.io](https://getblock.io/)
- [दस्तऐवजीकरण](https://docs.getblock.io/)

**Infura -** **_सेवा म्हणून इथेरियम API._**

- [infura.io](https://infura.io)
- [दस्तऐवजीकरण](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _किफायतशीर EVM JSON-RPC प्रदाता_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [दस्तऐवजीकरण](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _पूर्ण नोड्स आणि ब्लॉक एक्सप्लोरर्स._**

- [NOWNodes.io](https://nownodes.io/)
- [दस्तऐवजीकरण](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_सेवा म्हणून ब्लॉकचेन पायाभूत सुविधा._**

- [quicknode.com](https://quicknode.com)
- [दस्तऐवजीकरण](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_ओपन-सोर्स सॉफ्टवेअरद्वारे समर्थित सेवा म्हणून इथेरियम आणि इथेरियम क्लासिक APIs._**

- [rivet.cloud](https://rivet.cloud)
- [दस्तऐवजीकरण](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API म्हणून वेग-केंद्रित इथेरियम नोड्स._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [दस्तऐवजीकरण](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### विकास साधने {#development-tools}

**ethers-kt -** **_EVM-आधारित ब्लॉकचेनसाठी Async, उच्च-कार्यक्षमता असलेली Kotlin/Java/Android लायब्ररी._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरणे](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ब्लॉकचेनसाठी एक ओपन सोर्स .NET इंटिग्रेशन लायब्ररी._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [दस्तऐवजीकरण](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python टूलिंग -** **_Python द्वारे इथेरियमशी संवाद साधण्यासाठी विविध लायब्ररीज._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py चॅट](https://gitter.im/ethereum/web3.py)

**Tatum -** **_अंतिम ब्लॉकचेन विकास प्लॅटफॉर्म._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [दस्तऐवजीकरण](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_इथेरियमसाठी एक Java/Android/Kotlin/Scala इंटिग्रेशन लायब्ररी._**

- [GitHub](https://github.com/web3j/web3j)
- [डॉक्स](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ब्लॉकचेन सेवा {#blockchain-services}

**BlockCypher -** **_इथेरियम वेब APIs._**

- [blockcypher.com](https://www.blockcypher.com/)
- [दस्तऐवजीकरण](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_इथेरियमसाठी सर्व-समावेशक वेब3 डेटा पायाभूत सुविधा._**

- [chainbase.com](https://chainbase.com/)
- [दस्तऐवजीकरण](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_सेवा म्हणून लवचिक आणि समर्पित इथेरियम नोड्स._**

- [chainstack.com](https://chainstack.com)
- [दस्तऐवजीकरण](https://docs.chainstack.com/)
- [इथेरियम API संदर्भ](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_ब्लॉकचेन पायाभूत सुविधा API._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [दस्तऐवजीकरण](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_इथेरियम मेननेट आणि टेस्टनेटसह वेब3 API सेवा._**

- [DataHub](https://www.figment.io/)
- [दस्तऐवजीकरण](https://docs.figment.io/)

**Moralis -** **_एंटरप्राइझ-ग्रेड EVM API प्रदाता._**

- [moralis.io](https://moralis.io)
- [दस्तऐवजीकरण](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [फोरम](https://forum.moralis.io/)

**NFTPort -** **_इथेरियम डेटा आणि मिंट APIs._**

- [nftport.xyz](https://www.nftport.xyz/)
- [दस्तऐवजीकरण](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_सर्वसाधारण मल्टी-क्रिप्टो ब्लॉकचेन APIs प्लॅटफॉर्म._**

- [services.tokenview.io](https://services.tokenview.io/)
- [दस्तऐवजीकरण](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_इथेरियम ब्लॉकचेनवर साधा आणि विश्वासार्ह API ॲक्सेस प्रदान करते._**

- [Watchdata](https://watchdata.io/)
- [दस्तऐवजीकरण](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_२००+ चेन्ससाठी समृद्ध ब्लॉकचेन APIs._**

- [covalenthq.com](https://www.covalenthq.com/)
- [दस्तऐवजीकरण](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या सामुदायिक संसाधनाबद्दल माहिती आहे का?_ हे पृष्ठ संपादित करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [नोड्स आणि क्लायंट](/developers/docs/nodes-and-clients/)
- [डेव्हलपमेंट फ्रेमवर्क्स](/developers/docs/frameworks/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [JavaScript मध्ये इथेरियम ब्लॉकचेन वापरण्यासाठी Web3js सेट अप करा](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– तुमच्या प्रोजेक्टमध्ये web3.js सेट अप करण्याच्या सूचना._
- [JavaScript मधून स्मार्ट कराराला कॉल करणे](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन वापरून, JavaScript वापरून कॉन्ट्रॅक्ट्स फंक्शन कसे कॉल करायचे ते पहा._
