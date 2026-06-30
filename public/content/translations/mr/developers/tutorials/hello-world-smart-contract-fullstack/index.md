---
title: "नवशिक्यांसाठी हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट - फुलस्टॅक"
description: "इथेरियमवर एक साधे स्मार्ट कॉन्ट्रॅक्ट लिहिण्यावर आणि प्रस्थापित करण्यावर परिचयात्मक ट्युटोरिअल."
author: "nstrike2"
breadcrumb: "हॅलो वर्ल्ड फुलस्टॅक"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "स्मार्ट कॉन्ट्रॅक्ट्स",
    "प्रस्थापित करणे",
    "ब्लॉक एक्सप्लोरर",
    "फ्रंटएंड",
    "व्यवहार",
    "फ्रेमवर्क",
  ]
skill: beginner
lang: mr
published: 2021-10-25
---

जर तुम्ही ब्लॉकचेन डेव्हलपमेंटमध्ये नवीन असाल आणि कुठून सुरुवात करावी किंवा स्मार्ट कॉन्ट्रॅक्ट्स कसे प्रस्थापित करावे आणि त्यांच्याशी कसा संवाद साधावा हे तुम्हाला माहीत नसेल, तर हे मार्गदर्शक तुमच्यासाठी आहे. आम्ही [मेटामास्क](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), आणि [Alchemy](https://alchemy.com/eth) वापरून गोर्ली टेस्ट नेटवर्कवर एक साधे स्मार्ट कॉन्ट्रॅक्ट तयार आणि प्रस्थापित करण्याबद्दल मार्गदर्शन करू.

हे ट्युटोरिअल पूर्ण करण्यासाठी तुम्हाला Alchemy खात्याची आवश्यकता असेल. [मोफत खात्यासाठी साइन अप करा](https://www.alchemy.com/).

तुम्हाला कोणत्याही टप्प्यावर प्रश्न असल्यास, [Alchemy डिस्कॉर्ड्](https://discord.gg/gWuC7zB) मध्ये मोकळेपणाने संपर्क साधा!

## भाग 1 - Hardhat वापरून तुमचे स्मार्ट कॉन्ट्रॅक्ट तयार आणि प्रस्थापित करा {#part-1}

### इथेरियम नेटवर्कशी कनेक्ट करा {#connect-to-the-ethereum-network}

इथेरियम चेनला विनंत्या करण्याचे अनेक मार्ग आहेत. सोपे जावे यासाठी, आम्ही Alchemy वरील मोफत खाते वापरू, जे एक ब्लॉकचेन डेव्हलपर प्लॅटफॉर्म आणि API आहे, ज्यामुळे आम्हाला स्वतः नोड न चालवता इथेरियम चेनशी संवाद साधता येतो. Alchemy कडे मॉनिटरिंग आणि ॲनालिटिक्ससाठी डेव्हलपर टूल्स देखील आहेत; आमच्या स्मार्ट कॉन्ट्रॅक्ट प्रस्थापनेमध्ये तांत्रिकदृष्ट्या काय चालले आहे हे समजून घेण्यासाठी आम्ही या ट्युटोरिअलमध्ये त्यांचा फायदा घेऊ.

### तुमचे ॲप आणि API की तयार करा {#create-your-app-and-api-key}

एकदा तुम्ही Alchemy खाते तयार केले की, तुम्ही ॲप तयार करून API की जनरेट करू शकता. हे तुम्हाला गोर्ली टेस्टनेटवर विनंत्या करण्याची अनुमती देईल. जर तुम्हाला टेस्टनेटची माहिती नसेल तर तुम्ही [नेटवर्क निवडण्याबाबतचे Alchemy चे मार्गदर्शक वाचू शकता](https://www.alchemy.com/docs/choosing-a-web3-network).

Alchemy डॅशबोर्डवर, नेव्हिगेशन बारमध्ये **Apps** ड्रॉपडाउन शोधा आणि **Create App** वर क्लिक करा.

![Hello world create app](./hello-world-create-app.png)

तुमच्या ॲपला '_Hello World_' असे नाव द्या आणि एक लहान वर्णन लिहा. तुमचे एन्व्हायरन्मेंट म्हणून **Staging** आणि तुमचे नेटवर्क म्हणून **Goerli** निवडा.

![create app view hello world](./create-app-view-hello-world.png)

_टीप: **Goerli** निवडल्याची खात्री करा, अन्यथा हे ट्युटोरिअल काम करणार नाही._

**Create app** वर क्लिक करा. तुमचे ॲप खालील टेबलमध्ये दिसेल.

### इथेरियम खाते तयार करा {#create-an-ethereum-account}

व्यवहार पाठवण्यासाठी आणि प्राप्त करण्यासाठी तुम्हाला इथेरियम खाते आवश्यक आहे. आम्ही मेटामास्क वापरू, जे ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे आणि वापरकर्त्यांना त्यांचा इथेरियम खाते पत्ता व्यवस्थापित करू देते.

तुम्ही [येथे](https://metamask.io/download) मोफत मेटामास्क खाते डाउनलोड आणि तयार करू शकता. जेव्हा तुम्ही खाते तयार करत असाल, किंवा तुमच्याकडे आधीपासूनच खाते असेल, तेव्हा वरच्या उजव्या बाजूला “Goerli Test Network” वर स्विच केल्याची खात्री करा (जेणेकरून आपण खऱ्या पैशांसोबत व्यवहार करत नाही).

### पायरी 4: फॉसेटमधून इथर जोडा {#step-4-add-ether-from-a-faucet}

तुमचे स्मार्ट कॉन्ट्रॅक्ट टेस्ट नेटवर्कवर प्रस्थापित करण्यासाठी, तुम्हाला काही बनावट ETH ची आवश्यकता असेल. गोर्ली नेटवर्कवर ETH मिळवण्यासाठी, गोर्ली फॉसेटवर जा आणि तुमचा गोर्ली खाते पत्ता प्रविष्ट करा. लक्षात घ्या की गोर्ली फॉसेट अलीकडे थोडे अविश्वसनीय असू शकतात - प्रयत्न करण्यासाठी पर्यायांच्या सूचीसाठी [टेस्ट नेटवर्क पृष्ठ](/developers/docs/networks/#goerli) पहा:

_टीप: नेटवर्कच्या गर्दीमुळे, यास थोडा वेळ लागू शकतो._
``

### पायरी 5: तुमची शिल्लक तपासा {#step-5-check-your-balance}

तुमच्या वॉलेटमध्ये ETH असल्याची खात्री करण्यासाठी, चला [Alchemy चे सँडबॉक्स टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) वापरून [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) विनंती करूया. हे आपल्या वॉलेटमधील ETH ची रक्कम परत करेल. अधिक जाणून घेण्यासाठी [कंपोझर टूल कसे वापरावे यावरील Alchemy चे छोटे ट्युटोरिअल](https://youtu.be/r6sjRxBZJuU) पहा.

तुमचा मेटामास्क खाते पत्ता प्रविष्ट करा आणि **Send Request** वर क्लिक करा. तुम्हाला खालील कोड स्निपेटसारखा प्रतिसाद दिसेल.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _टीप: हा निकाल wei मध्ये आहे, ETH मध्ये नाही. Wei हे इथरचे सर्वात लहान मूल्य म्हणून वापरले जाते._

हुश्श! आपले सर्व बनावट पैसे तिथे आहेत.
### पायरी 6: आपला प्रोजेक्ट इनिशियलाइझ करा {#step-6-initialize-our-project}

प्रथम, आपल्याला आपल्या प्रोजेक्टसाठी एक फोल्डर तयार करावे लागेल. तुमच्या कमांड लाइनवर जा आणि खालील इनपुट करा.

```
mkdir hello-world
cd hello-world
```

आता आपण आपल्या प्रोजेक्ट फोल्डरमध्ये असल्याने, आपण प्रोजेक्ट इनिशियलाइझ करण्यासाठी `npm init` वापरू.

> जर तुमच्याकडे अद्याप npm इन्स्टॉल केलेले नसेल, तर Node.js आणि npm इन्स्टॉल करण्यासाठी [Node.js इन्स्टॉलेशन सूचनांचे](https://nodejs.org/en/download/) अनुसरण करा.

या ट्युटोरिअलच्या उद्देशासाठी, तुम्ही इनिशियलायझेशन प्रश्नांची उत्तरे कशी देता याने काही फरक पडत नाही. संदर्भासाठी आम्ही ते कसे केले ते येथे दिले आहे:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json ला मंजुरी द्या आणि आपण पुढे जाण्यासाठी तयार आहोत!
### पायरी 7: Hardhat डाउनलोड करा {#step-7-download-hardhat}

Hardhat हे तुमचे इथेरियम सॉफ्टवेअर कंपाईल, प्रस्थापित, टेस्ट आणि डीबग करण्यासाठी एक डेव्हलपमेंट एन्व्हायरन्मेंट आहे. हे डेव्हलपर्सना लाईव्ह चेनवर प्रस्थापित करण्यापूर्वी लोकली स्मार्ट कॉन्ट्रॅक्ट आणि विकेंद्रित ॲप्लिकेशन (dapp) तयार करताना मदत करते.

आपल्या `hello-world` प्रोजेक्टमध्ये रन करा:

```
npm install --save-dev hardhat
```

[इन्स्टॉलेशन सूचनांवरील](https://hardhat.org/getting-started/#overview) अधिक तपशीलांसाठी हे पृष्ठ पहा.

### पायरी 8: Hardhat प्रोजेक्ट तयार करा {#step-8-create-hardhat-project}

आपल्या `hello-world` प्रोजेक्ट फोल्डरमध्ये, रन करा:

```
npx hardhat
```

त्यानंतर तुम्हाला एक स्वागत संदेश आणि तुम्हाला काय करायचे आहे ते निवडण्याचा पर्याय दिसेल. “create an empty hardhat.config.js” निवडा:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

हे प्रोजेक्टमध्ये `hardhat.config.js` फाईल जनरेट करेल. आपण या ट्युटोरिअलमध्ये नंतर आपल्या प्रोजेक्टसाठी सेटअप निर्दिष्ट करण्यासाठी याचा वापर करू.

### पायरी 9: प्रोजेक्ट फोल्डर्स जोडा {#step-9-add-project-folders}

प्रोजेक्ट व्यवस्थित ठेवण्यासाठी, चला दोन नवीन फोल्डर्स तयार करूया. कमांड लाइनमध्ये, तुमच्या `hello-world` प्रोजेक्टच्या रूट डिरेक्टरीवर जा आणि टाईप करा:

```
mkdir contracts
mkdir scripts
```

- `contracts/` येथे आपण आपली hello world स्मार्ट कॉन्ट्रॅक्ट कोड फाईल ठेवू
- `scripts/` येथे आपण आपल्या कॉन्ट्रॅक्टला प्रस्थापित करण्यासाठी आणि त्याच्याशी संवाद साधण्यासाठी स्क्रिप्ट्स ठेवू

### पायरी 10: आपले कॉन्ट्रॅक्ट लिहा {#step-10-write-our-contract}

तुम्ही स्वतःला विचारत असाल, आपण कोड कधी लिहिणार आहोत? आता वेळ आली आहे!

तुमच्या आवडत्या एडिटरमध्ये hello-world प्रोजेक्ट उघडा. स्मार्ट कॉन्ट्रॅक्ट्स बहुधा Solidity मध्ये लिहिली जातात, ज्याचा वापर आपण आपले स्मार्ट कॉन्ट्रॅक्ट लिहिण्यासाठी करू.‌

1. `contracts` फोल्डरवर जा आणि `HelloWorld.sol` नावाची नवीन फाईल तयार करा
2. खाली एक नमुना Hello World स्मार्ट कॉन्ट्रॅक्ट आहे जे आपण या ट्युटोरिअलसाठी वापरणार आहोत. खालील मजकूर `HelloWorld.sol` फाईलमध्ये कॉपी करा.

_टीप: हे कॉन्ट्रॅक्ट काय करते हे समजून घेण्यासाठी कॉमेंट्स नक्की वाचा._

```
// सिमेंटिक व्हर्जनिंग वापरून, Solidity ची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` नावाचे कॉन्ट्रॅक्ट परिभाषित करते.
// कॉन्ट्रॅक्ट हे फंक्शन्स आणि डेटाचा (त्याची स्थिती) संग्रह आहे. एकदा प्रस्थापित झाल्यानंतर, कॉन्ट्रॅक्ट इथेरियम ब्लॉकचेनवरील एका विशिष्ट पत्त्यावर राहते. अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //जेव्हा अपडेट फंक्शन कॉल केले जाते तेव्हा एमिट केले जाते
   //स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स हा तुमच्या कॉन्ट्रॅक्टसाठी ब्लॉकचेनवर काहीतरी घडल्याचे तुमच्या ॲप फ्रंट-एंडला कळवण्याचा एक मार्ग आहे, जे विशिष्ट इव्हेंट्ससाठी 'ऐकत' असू शकते आणि ते घडल्यावर कारवाई करू शकते.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` प्रकाराचे `message` हे स्थिती व्हेरिएबल घोषित करते.
   // स्थिती व्हेरिएबल्स हे असे व्हेरिएबल्स आहेत ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमस्वरूपी साठवली जातात. `public` कीवर्ड व्हेरिएबल्सना कॉन्ट्रॅक्टच्या बाहेरून ॲक्सेस करण्यायोग्य बनवतो आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट्स मूल्य ॲक्सेस करण्यासाठी कॉल करू शकतात.
   string public message;

   // अनेक क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणेच, कन्स्ट्रक्टर हे एक विशेष फंक्शन आहे जे केवळ कॉन्ट्रॅक्ट तयार केल्यावरच कार्यान्वित केले जाते.
   // कन्स्ट्रक्टर्सचा वापर कॉन्ट्रॅक्टचा डेटा इनिशियलाइझ करण्यासाठी केला जातो. अधिक जाणून घ्या:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // स्ट्रिंग आर्ग्युमेंट `initMessage` स्वीकारते आणि कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये मूल्य सेट करते).
      message = initMessage;
   }

   // एक पब्लिक फंक्शन जे स्ट्रिंग आर्ग्युमेंट स्वीकारते आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

हे एक मूलभूत स्मार्ट कॉन्ट्रॅक्ट आहे जे तयार केल्यावर संदेश साठवते. `update` फंक्शन कॉल करून ते अपडेट केले जाऊ शकते.

### पायरी 11: मेटामास्क आणि Alchemy ला तुमच्या प्रोजेक्टशी कनेक्ट करा {#step-11-connect-metamask-alchemy-to-your-project}

आपण मेटामास्क वॉलेट, Alchemy खाते तयार केले आहे आणि आपले स्मार्ट कॉन्ट्रॅक्ट लिहिले आहे, आता या तिन्हींना जोडण्याची वेळ आली आहे.

तुमच्या वॉलेटमधून पाठवलेल्या प्रत्येक व्यवहारासाठी तुमच्या युनिक प्रायव्हेट की चा वापर करून स्वाक्षरी आवश्यक असते. आपल्या प्रोग्रामला ही परवानगी देण्यासाठी, आपण आपली प्रायव्हेट की एका एन्व्हायरन्मेंट फाईलमध्ये सुरक्षितपणे साठवू शकतो. आपण येथे Alchemy साठी API की देखील साठवू.

> व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, Web3 वापरून व्यवहार पाठवण्यावरील [हे ट्युटोरिअल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) पहा.

प्रथम, तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये dotenv पॅकेज इन्स्टॉल करा:

```
npm install dotenv --save
```

त्यानंतर, प्रोजेक्टच्या रूट डिरेक्टरीमध्ये `.env` फाईल तयार करा. त्यात तुमची मेटामास्क प्रायव्हेट की आणि HTTP Alchemy API URL जोडा.

तुमच्या एन्व्हायरन्मेंट फाईलचे नाव `.env` असणे आवश्यक आहे अन्यथा ती एन्व्हायरन्मेंट फाईल म्हणून ओळखली जाणार नाही.

त्याला `process.env` किंवा `.env-custom` किंवा इतर कोणतेही नाव देऊ नका.

- तुमची प्रायव्हेट की एक्सपोर्ट करण्यासाठी [या सूचनांचे](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) अनुसरण करा
- HTTP Alchemy API URL मिळवण्यासाठी खाली पहा

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

तुमची `.env` यासारखी दिसली पाहिजे:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

यांना प्रत्यक्षात आपल्या कोडशी जोडण्यासाठी, आपण पायरी 13 वर आपल्या `hardhat.config.js` फाईलमध्ये या व्हेरिएबल्सचा संदर्भ देऊ.

### पायरी 12: Ethers.js इन्स्टॉल करा {#step-12-install-ethersjs}

Ethers.js ही एक लायब्ररी आहे जी [प्रमाणित JSON-RPC पद्धतींना](/developers/docs/apis/json-rpc/) अधिक वापरकर्ता-अनुकूल पद्धतींसह रॅप करून इथेरियमशी संवाद साधणे आणि विनंत्या करणे सोपे करते.

Hardhat आपल्याला अतिरिक्त टूलिंग आणि विस्तारित कार्यक्षमतेसाठी [प्लगइन्स](https://hardhat.org/plugins/) इंटिग्रेट करण्याची अनुमती देते. आपण कॉन्ट्रॅक्ट प्रस्थापनेसाठी [Ethers प्लगइनचा](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) फायदा घेऊ.

तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये टाईप करा:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### पायरी 13: hardhat.config.js अपडेट करा {#step-13-update-hardhat-configjs}

आपण आतापर्यंत अनेक डिपेंडन्सीज आणि प्लगइन्स जोडले आहेत, आता आपल्याला `hardhat.config.js` अपडेट करण्याची आवश्यकता आहे जेणेकरून आपल्या प्रोजेक्टला त्या सर्वांबद्दल माहिती मिळेल.

तुमची `hardhat.config.js` खालीलप्रमाणे दिसण्यासाठी अपडेट करा:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### पायरी 14: आपले कॉन्ट्रॅक्ट कंपाईल करा {#step-14-compile-our-contract}

आतापर्यंत सर्वकाही काम करत आहे याची खात्री करण्यासाठी, चला आपले कॉन्ट्रॅक्ट कंपाईल करूया. `compile` टास्क हे अंगभूत hardhat टास्क्सपैकी एक आहे.

कमांड लाइनवरून रन करा:

```bash
npx hardhat compile
```

तुम्हाला `SPDX license identifier not provided in source file` बद्दल चेतावणी मिळू शकते, परंतु त्याबद्दल काळजी करण्याची गरज नाही — आशा आहे की बाकी सर्वकाही चांगले दिसेल! तसे नसल्यास, तुम्ही नेहमी [Alchemy डिस्कॉर्ड्](https://discord.gg/u72VCg3) मध्ये संदेश पाठवू शकता.

### पायरी 15: आपली प्रस्थापना स्क्रिप्ट लिहा {#step-15-write-our-deploy-script}

आता आपले कॉन्ट्रॅक्ट लिहिले गेले आहे आणि आपली कॉन्फिगरेशन फाईल तयार आहे, आता आपली कॉन्ट्रॅक्ट प्रस्थापना स्क्रिप्ट लिहिण्याची वेळ आली आहे.

`scripts/` फोल्डरवर जा आणि `deploy.js` नावाची नवीन फाईल तयार करा, त्यात खालील मजकूर जोडा:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // प्रस्थापना सुरू करा, जे कॉन्ट्रॅक्ट ऑब्जेक्टमध्ये रिझॉल्व्ह होणारे प्रॉमिस परत करते
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat त्यांच्या [कॉन्ट्रॅक्ट्स ट्युटोरिअलमध्ये](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) यापैकी प्रत्येक कोडची ओळ काय करते हे स्पष्ट करण्याचे उत्तम काम करते, आम्ही त्यांचे स्पष्टीकरण येथे स्वीकारले आहे.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js मधील `ContractFactory` हे नवीन स्मार्ट कॉन्ट्रॅक्ट्स प्रस्थापित करण्यासाठी वापरले जाणारे ॲब्स्ट्रॅक्शन आहे, त्यामुळे येथील `HelloWorld` हे आपल्या hello world कॉन्ट्रॅक्टच्या इन्स्टन्सेससाठी एक [फॅक्टरी](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) आहे. `hardhat-ethers` प्लगइन `ContractFactory` आणि `Contract` वापरताना, इन्स्टन्सेस डीफॉल्टनुसार पहिल्या स्वाक्षरीकर्त्याशी (मालक) जोडलेले असतात.

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory` वर `deploy()` कॉल केल्याने प्रस्थापना सुरू होईल, आणि एक `Promise` परत करेल जे `Contract` ऑब्जेक्टमध्ये रिझॉल्व्ह होते. हा तो ऑब्जेक्ट आहे ज्यामध्ये आपल्या प्रत्येक स्मार्ट कॉन्ट्रॅक्ट फंक्शनसाठी एक पद्धत आहे.

### पायरी 16: आपले कॉन्ट्रॅक्ट प्रस्थापित करा {#step-16-deploy-our-contract}

आपण शेवटी आपले स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठी तयार आहोत! कमांड लाइनवर जा आणि रन करा:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

त्यानंतर तुम्हाला यासारखे काहीतरी दिसेल:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**कृपया हा पत्ता सेव्ह करा**. आपण या ट्युटोरिअलमध्ये नंतर त्याचा वापर करू.

जर आपण [गोर्ली Etherscan](https://goerli.etherscan.io) वर गेलो आणि आपला कॉन्ट्रॅक्ट पत्ता शोधला तर आपल्याला दिसेल की ते यशस्वीरित्या प्रस्थापित झाले आहे. व्यवहार यासारखा दिसेल:

![](./etherscan-contract.png)

`From` पत्ता तुमच्या मेटामास्क खाते पत्त्याशी जुळला पाहिजे आणि `To` पत्ता **Contract Creation** असे म्हणेल. जर आपण व्यवहारामध्ये क्लिक केले तर आपल्याला `To` फील्डमध्ये आपला कॉन्ट्रॅक्ट पत्ता दिसेल.

![](./etherscan-transaction.png)

अभिनंदन! तुम्ही नुकतेच इथेरियम टेस्टनेटवर एक स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित केले आहे.

तांत्रिकदृष्ट्या काय चालले आहे हे समजून घेण्यासाठी, आपल्या [Alchemy डॅशबोर्डमधील](https://dashboard.alchemy.com/explorer) Explorer टॅबवर जाऊया. जर तुमच्याकडे एकाधिक Alchemy ॲप्स असतील तर ॲपनुसार फिल्टर करा आणि **Hello World** निवडल्याची खात्री करा.

![](./hello-world-explorer.png)

येथे तुम्हाला काही JSON-RPC पद्धती दिसतील ज्या Hardhat/Ethers ने आपल्यासाठी अंतर्गत तयार केल्या आहेत जेव्हा आपण `.deploy()` फंक्शन कॉल केले. येथील दोन महत्त्वाच्या पद्धती म्हणजे [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), जी आपले कॉन्ट्रॅक्ट गोर्ली चेनवर लिहिण्याची विनंती आहे, आणि [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), जी हॅश दिल्यावर आपल्या व्यवहाराबद्दल माहिती वाचण्याची विनंती आहे. व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, [Web3 वापरून व्यवहार पाठवण्यावरील आमचे ट्युटोरिअल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) पहा.

## भाग 2: तुमच्या स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधा {#part-2-interact-with-your-smart-contract}

आता आपण गोर्ली नेटवर्कवर यशस्वीरित्या स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित केले आहे, तर चला त्याच्याशी संवाद कसा साधायचा ते शिकूया.

### interact.js फाईल तयार करा {#create-a-interactjs-file}

ही ती फाईल आहे जिथे आपण आपली संवादाची स्क्रिप्ट लिहू. आपण Ethers.js लायब्ररी वापरणार आहोत जी तुम्ही यापूर्वी भाग 1 मध्ये इन्स्टॉल केली होती.

`scripts/` फोल्डरमध्ये, `interact.js` नावाची नवीन फाईल तयार करा आणि खालील कोड जोडा:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### तुमची .env फाईल अपडेट करा {#update-your-env-file}

आपण नवीन एन्व्हायर्नमेंट व्हेरिएबल्स वापरणार आहोत, त्यामुळे आपल्याला ते `.env` फाईलमध्ये परिभाषित करावे लागतील जी [आपण आधी तयार केली होती](#step-11-connect-metamask-alchemy-to-your-project).

आपल्याला आपल्या Alchemy `API_KEY` आणि `CONTRACT_ADDRESS` साठी व्याख्या जोडावी लागेल जिथे तुमचे स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित केले गेले होते.

तुमची `.env` फाईल काहीशी अशी दिसायला हवी:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### तुमचा कॉन्ट्रॅक्ट ABI मिळवा {#grab-your-contract-abi}

आपला कॉन्ट्रॅक्ट [ABI (Application Binary Interface)](/glossary/#abi) हा आपल्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठीचा इंटरफेस आहे. Hardhat आपोआप एक ABI तयार करते आणि तो `HelloWorld.json` मध्ये सेव्ह करते. ABI वापरण्यासाठी, आपल्याला आपल्या `interact.js` फाईलमध्ये खालील कोडच्या ओळी जोडून त्यातील मजकूर पार्स करावा लागेल:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

जर तुम्हाला ABI पाहायचा असेल तर तुम्ही तो तुमच्या कन्सोलवर प्रिंट करू शकता:

```javascript
console.log(JSON.stringify(contract.abi))
```

तुमचा ABI कन्सोलवर प्रिंट झालेला पाहण्यासाठी, तुमच्या टर्मिनलवर जा आणि रन करा:

```bash
npx hardhat run scripts/interact.js
```

### तुमच्या कॉन्ट्रॅक्टचा इन्स्टन्स तयार करा {#create-an-instance-of-your-contract}

आपल्या कॉन्ट्रॅक्टशी संवाद साधण्यासाठी, आपल्याला आपल्या कोडमध्ये कॉन्ट्रॅक्टचा इन्स्टन्स तयार करावा लागेल. Ethers.js सह असे करण्यासाठी, आपल्याला तीन संकल्पनांवर काम करावे लागेल:

1. प्रोव्हायडर - एक नोड प्रोव्हायडर जो तुम्हाला ब्लॉकचेनवर वाचण्याचा आणि लिहिण्याचा ॲक्सेस देतो
2. साइनर - एका इथेरियम खात्याचे प्रतिनिधित्व करतो जे व्यवहारांवर स्वाक्षरी करू शकते
3. Contract - एक Ethers.js ऑब्जेक्ट जो ऑनचेन प्रस्थापित केलेल्या विशिष्ट कॉन्ट्रॅक्टचे प्रतिनिधित्व करतो

आपल्या कॉन्ट्रॅक्टचा इन्स्टन्स तयार करण्यासाठी आपण मागील पायरीतील कॉन्ट्रॅक्ट ABI वापरू:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Providers, Signers आणि Contracts बद्दल [ethers.js डॉक्युमेंटेशन](https://docs.ethers.io/v5/) मध्ये अधिक जाणून घ्या.

### init संदेश वाचा {#read-the-init-message}

आठवते जेव्हा आपण `initMessage = "Hello world!"` सह आपले कॉन्ट्रॅक्ट प्रस्थापित केले होते? आपण आता आपल्या स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला तो संदेश वाचणार आहोत आणि तो कन्सोलवर प्रिंट करणार आहोत.

JavaScript मध्ये, नेटवर्कशी संवाद साधताना asynchronous फंक्शन्स वापरले जातात. asynchronous फंक्शन्सबद्दल अधिक जाणून घेण्यासाठी, [हा medium लेख वाचा](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

आपल्या स्मार्ट कॉन्ट्रॅक्टमधील `message` फंक्शनला कॉल करण्यासाठी आणि init संदेश वाचण्यासाठी खालील कोड वापरा:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

टर्मिनलमध्ये `npx hardhat run scripts/interact.js` वापरून फाईल रन केल्यानंतर आपल्याला हा प्रतिसाद दिसायला हवा:

```
The message is: Hello world!
```

अभिनंदन! तुम्ही नुकताच इथेरियम ब्लॉकचेनवरून स्मार्ट कॉन्ट्रॅक्टचा डेटा यशस्वीरित्या वाचला आहे, खूप छान!

### संदेश अपडेट करा {#update-the-message}

फक्त संदेश वाचण्याऐवजी, आपण `update` फंक्शन वापरून आपल्या स्मार्ट कॉन्ट्रॅक्टमध्ये सेव्ह केलेला संदेश अपडेट देखील करू शकतो! खूप छान आहे, नाही का?

संदेश अपडेट करण्यासाठी, आपण आपल्या इन्स्टन्शिएट केलेल्या Contract ऑब्जेक्टवर थेट `update` फंक्शन कॉल करू शकतो:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

लक्षात घ्या की ओळ 11 वर, आपण परत आलेल्या व्यवहार ऑब्जेक्टवर `.wait()` ला कॉल करतो. हे सुनिश्चित करते की फंक्शनमधून बाहेर पडण्यापूर्वी आपली स्क्रिप्ट ब्लॉकचेनवर व्यवहार माइन होण्याची वाट पाहते. जर `.wait()` कॉल समाविष्ट केला नसेल, तर स्क्रिप्टला कॉन्ट्रॅक्टमधील अपडेट केलेले `message` मूल्य दिसणार नाही.

### नवीन संदेश वाचा {#read-the-new-message}

अपडेट केलेले `message` मूल्य वाचण्यासाठी तुम्ही [मागील पायरी](#read-the-init-message) पुन्हा करू शकता. थोडा वेळ घ्या आणि ते नवीन मूल्य प्रिंट करण्यासाठी तुम्ही आवश्यक बदल करू शकता का ते पहा!

जर तुम्हाला हिंट हवी असेल, तर या टप्प्यावर तुमची `interact.js` फाईल कशी दिसायला हवी ते येथे आहे:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// प्रोव्हायडर - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// साइनर - तुम्ही
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// कॉन्ट्रॅक्ट इन्स्टन्स
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

आता फक्त स्क्रिप्ट रन करा आणि तुम्हाला जुना संदेश, अपडेटिंग स्टेटस आणि नवीन संदेश तुमच्या टर्मिनलवर प्रिंट झालेला दिसेल!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

ती स्क्रिप्ट रन करताना, तुमच्या लक्षात येईल की नवीन संदेश लोड होण्यापूर्वी `Updating the message...` पायरी लोड होण्यासाठी थोडा वेळ घेते. हे मायनिंग प्रक्रियेमुळे होते; जर तुम्हाला व्यवहार माइन होत असताना ट्रॅक करण्याची उत्सुकता असेल, तर व्यवहाराची स्थिती पाहण्यासाठी [Alchemy mempool](https://dashboard.alchemy.com/mempool) ला भेट द्या. जर व्यवहार ड्रॉप झाला, तर [गोर्ली Etherscan](https://goerli.etherscan.io) तपासणे आणि तुमचा ट्रान्झॅक्शन हॅश शोधणे देखील उपयुक्त ठरते.

## भाग 3: तुमचे स्मार्ट कॉन्ट्रॅक्ट Etherscan वर प्रकाशित करा {#part-3-publish-your-smart-contract-to-etherscan}

तुम्ही तुमचे स्मार्ट कॉन्ट्रॅक्ट प्रत्यक्षात आणण्यासाठी खूप मेहनत घेतली आहे; आता ते जगासोबत शेअर करण्याची वेळ आली आहे!

Etherscan वर तुमचे स्मार्ट कॉन्ट्रॅक्ट पडताळून (verify करून), कोणीही तुमचा सोर्स कोड पाहू शकतो आणि तुमच्या स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधू शकतो. चला सुरुवात करूया!

### पायरी 1: तुमच्या Etherscan खात्यावर API की तयार करा {#step-1-generate-an-api-key-on-your-etherscan-account}

तुम्ही जे स्मार्ट कॉन्ट्रॅक्ट प्रकाशित करण्याचा प्रयत्न करत आहात, त्याची मालकी तुमचीच आहे हे पडताळण्यासाठी Etherscan API की आवश्यक आहे.

जर तुमच्याकडे आधीपासून Etherscan खाते नसेल, तर [खात्यासाठी साइन अप करा](https://etherscan.io/register).

एकदा लॉग इन केल्यानंतर, नेव्हिगेशन बारमध्ये तुमचे युझरनेम शोधा, त्यावर कर्सर न्या आणि **My profile** बटण निवडा.

तुमच्या प्रोफाईल पेजवर, तुम्हाला एक साईड नेव्हिगेशन बार दिसेल. साईड नेव्हिगेशन बारमधून, **API Keys** निवडा. त्यानंतर, नवीन API की तयार करण्यासाठी "Add" बटण दाबा, तुमच्या ॲपला **hello-world** नाव द्या आणि **Create New API Key** बटण दाबा.

तुमची नवीन API की API की टेबलमध्ये दिसायला हवी. API की तुमच्या क्लिपबोर्डवर कॉपी करा.

पुढे, आपल्याला Etherscan API की आपल्या `.env` फाईलमध्ये जोडण्याची आवश्यकता आहे.

ती जोडल्यानंतर, तुमची `.env` फाईल यासारखी दिसायला हवी:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat द्वारे प्रस्थापित केलेले स्मार्ट कॉन्ट्रॅक्ट्स {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan इन्स्टॉल करा {#install-hardhat-etherscan}

Hardhat वापरून तुमचे कॉन्ट्रॅक्ट Etherscan वर प्रकाशित करणे सोपे आहे. सुरुवात करण्यासाठी तुम्हाला प्रथम `hardhat-etherscan` प्लगइन इन्स्टॉल करावे लागेल. `hardhat-etherscan` Etherscan वर स्मार्ट कॉन्ट्रॅक्टचा सोर्स कोड आणि ABI आपोआप पडताळेल. हे जोडण्यासाठी, `hello-world` डिरेक्टरीमध्ये रन करा:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

एकदा इन्स्टॉल झाल्यानंतर, तुमच्या `hardhat.config.js` च्या शीर्षस्थानी खालील विधान समाविष्ट करा, आणि Etherscan कॉन्फिग पर्याय जोडा:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan साठी तुमची API की
    // https://etherscan.io/ वरून एक मिळवा
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan वर तुमचे स्मार्ट कॉन्ट्रॅक्ट पडताळा {#verify-your-smart-contract-on-etherscan}

सर्व फाईल्स सेव्ह केल्या आहेत आणि सर्व `.env` व्हेरिएबल्स योग्यरित्या कॉन्फिगर केले आहेत याची खात्री करा.

कॉन्ट्रॅक्टचा पत्ता आणि ते ज्या नेटवर्कवर प्रस्थापित केले आहे ते पास करून, `verify` टास्क रन करा:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS` हा गोर्ली टेस्टनेटवर प्रस्थापित केलेल्या तुमच्या स्मार्ट कॉन्ट्रॅक्टचा पत्ता असल्याची खात्री करा. तसेच, अंतिम आर्ग्युमेंट (`'Hello World!'`) हे [भाग 1 मधील प्रस्थापना (deploy) पायरीदरम्यान](#step-15-write-our-deploy-script) वापरलेले समान स्ट्रिंग मूल्य असणे आवश्यक आहे.

जर सर्व काही सुरळीत पार पडले, तर तुम्हाला तुमच्या टर्मिनलमध्ये खालील संदेश दिसेल:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

अभिनंदन! तुमचा स्मार्ट कॉन्ट्रॅक्ट कोड Etherscan वर आहे!

### Etherscan वर तुमचे स्मार्ट कॉन्ट्रॅक्ट तपासा! {#check-out-your-smart-contract-on-etherscan}

जेव्हा तुम्ही तुमच्या टर्मिनलमध्ये दिलेल्या लिंकवर जाल, तेव्हा तुम्हाला तुमचा स्मार्ट कॉन्ट्रॅक्ट कोड आणि ABI Etherscan वर प्रकाशित झालेले दिसतील!

**व्वा - तुम्ही हे करून दाखवले! आता कोणीही तुमच्या स्मार्ट कॉन्ट्रॅक्टला कॉल करू शकतो किंवा त्यावर लिहू शकतो! तुम्ही पुढे काय बनवता हे पाहण्यासाठी आम्ही उत्सुक आहोत!**

## भाग 4 - तुमचे स्मार्ट कॉन्ट्रॅक्ट फ्रंटएंडसोबत इंटिग्रेट करणे {#part-4-integrating-your-smart-contract-with-the-frontend}

या ट्युटोरिअलच्या शेवटी, तुम्हाला खालील गोष्टी कशा करायच्या हे समजेल:

- तुमच्या विकेंद्रित ॲप्लिकेशन (dapp) ला मेटामास्क वॉलेट कनेक्ट करणे
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API वापरून तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून डेटा वाचणे
- मेटामास्क वापरून इथेरियम व्यवहारांवर स्वाक्षरी करणे

या dapp साठी, आम्ही आमचे फ्रंटएंड फ्रेमवर्क म्हणून [React](https://react.dev/) वापरणार आहोत; तथापि, हे लक्षात घेणे महत्त्वाचे आहे की आम्ही त्याचे मूलभूत घटक समजून घेण्यात जास्त वेळ घालवणार नाही, कारण आम्ही प्रामुख्याने आमच्या प्रोजेक्टमध्ये Web3 कार्यक्षमता आणण्यावर लक्ष केंद्रित करणार आहोत.

पूर्वापेक्षित म्हणून, तुम्हाला React ची प्राथमिक स्तरावरील समज असावी. तसे नसल्यास, आम्ही अधिकृत [Intro to React ट्युटोरिअल](https://react.dev/learn) पूर्ण करण्याची शिफारस करतो.

### स्टार्टर फाइल्स क्लोन करा {#clone-the-starter-files}

प्रथम, या प्रोजेक्टसाठी स्टार्टर फाइल्स मिळवण्यासाठी [hello-world-part-four GitHub रिपॉझिटरी](https://github.com/alchemyplatform/hello-world-part-four-tutorial) वर जा आणि ही रिपॉझिटरी तुमच्या लोकल मशीनवर क्लोन करा.

क्लोन केलेली रिपॉझिटरी लोकली उघडा. लक्षात घ्या की यात दोन फोल्डर्स आहेत: `starter-files` आणि `completed`.

- `starter-files`- **आम्ही या डिरेक्टरीमध्ये काम करणार आहोत**, आम्ही UI ला तुमच्या इथेरियम वॉलेटशी आणि [भाग 3](#part-3-publish-your-smart-contract-to-etherscan) मध्ये Etherscan वर प्रकाशित केलेल्या स्मार्ट कॉन्ट्रॅक्टशी कनेक्ट करू.
- `completed` मध्ये संपूर्ण पूर्ण झालेले ट्युटोरिअल आहे आणि जर तुम्ही अडकलात तरच त्याचा संदर्भ म्हणून वापर केला पाहिजे.

पुढे, तुमच्या आवडत्या कोड एडिटरमध्ये `starter-files` ची तुमची कॉपी उघडा आणि नंतर `src` फोल्डरमध्ये जा.

आम्ही लिहिलेला सर्व कोड `src` फोल्डरच्या अंतर्गत असेल. आमच्या प्रोजेक्टला Web3 कार्यक्षमता देण्यासाठी आम्ही `HelloWorld.js` कंपोनंट आणि `util/interact.js` JavaScript फाइल्स संपादित करणार आहोत.

### स्टार्टर फाइल्स तपासा {#check-out-the-starter-files}

कोडिंग सुरू करण्यापूर्वी, स्टार्टर फाइल्समध्ये आपल्याला काय दिले आहे ते पाहूया.

#### तुमचा react प्रोजेक्ट रन करा {#get-your-react-project-running}

आपल्या ब्राउझरमध्ये React प्रोजेक्ट रन करून सुरुवात करूया. React चे सौंदर्य हे आहे की एकदा आपला प्रोजेक्ट ब्राउझरमध्ये रन झाला की, आपण सेव्ह केलेले कोणतेही बदल आपल्या ब्राउझरमध्ये लाइव्ह अपडेट केले जातील.

प्रोजेक्ट रन करण्यासाठी, `starter-files` फोल्डरच्या रूट डिरेक्टरीमध्ये जा आणि प्रोजेक्टच्या डिपेंडन्सीज इन्स्टॉल करण्यासाठी तुमच्या टर्मिनलमध्ये `npm install` रन करा:

```bash
cd starter-files
npm install
```

एकदा ते इन्स्टॉल झाल्यानंतर, तुमच्या टर्मिनलमध्ये `npm start` रन करा:

```bash
npm start
```

असे केल्याने तुमच्या ब्राउझरमध्ये [http://localhost:3000/](http://localhost:3000/) उघडले पाहिजे, जिथे तुम्हाला आमच्या प्रोजेक्टचे फ्रंटएंड दिसेल. यात एक फील्ड (तुमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश अपडेट करण्याची जागा), एक "Connect Wallet" बटण आणि एक "Update" बटण असावे.

जर तुम्ही कोणत्याही बटणावर क्लिक करण्याचा प्रयत्न केला, तर तुमच्या लक्षात येईल की ते काम करत नाहीत—कारण आम्हाला अद्याप त्यांची कार्यक्षमता प्रोग्राम करणे आवश्यक आहे.

#### `HelloWorld.js` कंपोनंट {#the-helloworld-js-component}

चला आपल्या एडिटरमधील `src` फोल्डरमध्ये परत जाऊया आणि `HelloWorld.js` फाइल उघडूया. या फाइलमधील सर्व काही समजून घेणे अत्यंत महत्त्वाचे आहे, कारण हा प्राथमिक React कंपोनंट आहे ज्यावर आपण काम करणार आहोत.

या फाइलच्या शीर्षस्थानी, तुमच्या लक्षात येईल की आमच्याकडे अनेक इम्पोर्ट स्टेटमेंट्स आहेत जे आमचा प्रोजेक्ट रन करण्यासाठी आवश्यक आहेत, ज्यामध्ये React लायब्ररी, useEffect आणि useState हुक्स, `./util/interact.js` मधील काही आयटम्स (आम्ही लवकरच त्यांचे अधिक तपशीलवार वर्णन करू!), आणि Alchemy लोगो समाविष्ट आहे.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

पुढे, आमच्याकडे आमचे स्थिती (state) व्हेरिएबल्स आहेत जे आम्ही विशिष्ट इव्हेंट्सनंतर अपडेट करू.

```javascript
// HelloWorld.js

//स्थिती व्हेरिएबल्स
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

प्रत्येक व्हेरिएबल काय दर्शवतो ते येथे दिले आहे:

- `walletAddress` - एक स्ट्रिंग जी वापरकर्त्याचा वॉलेट पत्ता स्टोअर करते
- `status`- एक स्ट्रिंग जी एक उपयुक्त संदेश स्टोअर करते जो वापरकर्त्याला dapp शी कसे संवाद साधायचे याबद्दल मार्गदर्शन करतो
- `message` - एक स्ट्रिंग जी स्मार्ट कॉन्ट्रॅक्टमधील वर्तमान संदेश स्टोअर करते
- `newMessage` - एक स्ट्रिंग जी नवीन संदेश स्टोअर करते जो स्मार्ट कॉन्ट्रॅक्टमध्ये लिहिला जाईल

स्थिती व्हेरिएबल्स नंतर, तुम्हाला पाच अन-इम्प्लिमेंटेड फंक्शन्स दिसतील: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, आणि `onUpdatePressed`. ते काय करतात ते आम्ही खाली स्पष्ट करू:

```javascript
// HelloWorld.js

//फक्त एकदाच कॉल केले जाते
useEffect(async () => {
  //TODO: अंमलबजावणी करा
}, [])

function addSmartContractListener() {
  //TODO: अंमलबजावणी करा
}

function addWalletListener() {
  //TODO: अंमलबजावणी करा
}

const connectWalletPressed = async () => {
  //TODO: अंमलबजावणी करा
}

const onUpdatePressed = async () => {
  //TODO: अंमलबजावणी करा
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- हा एक React हुक आहे जो तुमचा कंपोनंट रेंडर झाल्यानंतर कॉल केला जातो. कारण त्यात एक रिकामा ॲरे `[]` प्रॉप पास केला आहे (ओळ 4 पहा), तो फक्त कंपोनंटच्या _पहिल्या_ रेंडरवर कॉल केला जाईल. येथे आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला वर्तमान संदेश लोड करू, आमचे स्मार्ट कॉन्ट्रॅक्ट आणि वॉलेट लिसनर्स कॉल करू आणि वॉलेट आधीपासूनच कनेक्ट केलेले आहे की नाही हे दर्शवण्यासाठी आमचा UI अपडेट करू.
- `addSmartContractListener`- हे फंक्शन एक लिसनर सेट करते जे आमच्या HelloWorld कॉन्ट्रॅक्टच्या `UpdatedMessages` इव्हेंटवर लक्ष ठेवेल आणि जेव्हा आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये संदेश बदलला जाईल तेव्हा आमचा UI अपडेट करेल.
- `addWalletListener`- हे फंक्शन एक लिसनर सेट करते जे वापरकर्त्याच्या मेटामास्क वॉलेट स्थितीतील बदल शोधते, जसे की जेव्हा वापरकर्ता त्यांचे वॉलेट डिस्कनेक्ट करतो किंवा पत्ते बदलतो.
- `connectWalletPressed`- हे फंक्शन वापरकर्त्याचे मेटामास्क वॉलेट आमच्या dapp शी कनेक्ट करण्यासाठी कॉल केले जाईल.
- `onUpdatePressed` - जेव्हा वापरकर्त्याला स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश अपडेट करायचा असेल तेव्हा हे फंक्शन कॉल केले जाईल.

या फाइलच्या शेवटी, आमच्याकडे आमच्या कंपोनंटचा UI आहे.

```javascript
// HelloWorld.js

//आपल्या घटकाचा UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

जर तुम्ही हा कोड काळजीपूर्वक स्कॅन केला, तर तुमच्या लक्षात येईल की आम्ही आमच्या UI मध्ये आमचे विविध स्थिती व्हेरिएबल्स कुठे वापरतो:

- ओळी 6-12 वर, जर वापरकर्त्याचे वॉलेट कनेक्ट केलेले असेल (म्हणजेच, `walletAddress.length > 0`), तर आम्ही "walletButton" ID असलेल्या बटणामध्ये वापरकर्त्याच्या `walletAddress` ची ट्रंकेटेड आवृत्ती प्रदर्शित करतो; अन्यथा ते फक्त "Connect Wallet" असे म्हणते.
- ओळ 17 वर, आम्ही स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला वर्तमान संदेश प्रदर्शित करतो, जो `message` स्ट्रिंगमध्ये कॅप्चर केलेला आहे.
- ओळी 23-26 वर, जेव्हा टेक्स्ट फील्डमधील इनपुट बदलते तेव्हा आमचे `newMessage` स्थिती व्हेरिएबल अपडेट करण्यासाठी आम्ही [controlled component](https://legacy.reactjs.org/docs/forms.html#controlled-components) वापरतो.

आमच्या स्थिती व्हेरिएबल्स व्यतिरिक्त, तुम्हाला हे देखील दिसेल की जेव्हा अनुक्रमे `publishButton` आणि `walletButton` IDs असलेल्या बटणांवर क्लिक केले जाते तेव्हा `connectWalletPressed` आणि `onUpdatePressed` फंक्शन्स कॉल केली जातात.

शेवटी, हा `HelloWorld.js` कंपोनंट कुठे जोडला आहे ते पाहूया.

जर तुम्ही `App.js` फाइलवर गेलात, जो React मधील मुख्य कंपोनंट आहे जो इतर सर्व कंपोनंट्ससाठी कंटेनर म्हणून काम करतो, तर तुम्हाला दिसेल की आमचा `HelloWorld.js` कंपोनंट ओळ 7 वर इंजेक्ट केलेला आहे.

शेवटचे पण महत्त्वाचे, तुमच्यासाठी प्रदान केलेली आणखी एक फाइल तपासूया, `interact.js` फाइल.

#### `interact.js` फाइल {#the-interact-js-file}

कारण आम्हाला [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) पॅराडाइमचे पालन करायचे आहे, आम्हाला एक स्वतंत्र फाइल हवी असेल ज्यामध्ये आमच्या dapp चे लॉजिक, डेटा आणि नियम व्यवस्थापित करण्यासाठी आमची सर्व फंक्शन्स असतील आणि नंतर ती फंक्शन्स आमच्या फ्रंटएंडवर (आमचा `HelloWorld.js` कंपोनंट) एक्सपोर्ट करण्यास सक्षम असू.

👆🏽हाच आमच्या `interact.js` फाइलचा नेमका उद्देश आहे!

तुमच्या `src` डिरेक्टरीमधील `util` फोल्डरवर जा, आणि तुमच्या लक्षात येईल की आम्ही `interact.js` नावाची एक फाइल समाविष्ट केली आहे ज्यामध्ये आमचे सर्व स्मार्ट कॉन्ट्रॅक्ट इंटरॅक्शन आणि वॉलेट फंक्शन्स आणि व्हेरिएबल्स असतील.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

फाइलच्या शीर्षस्थानी तुमच्या लक्षात येईल की आम्ही `helloWorldContract` ऑब्जेक्ट कमेंट आउट केला आहे. या ट्युटोरिअलमध्ये नंतर, आम्ही हा ऑब्जेक्ट अनकमेंट करू आणि या व्हेरिएबलमध्ये आमचे स्मार्ट कॉन्ट्रॅक्ट इन्स्टॅन्शिएट करू, जे आम्ही नंतर आमच्या `HelloWorld.js` कंपोनंटमध्ये एक्सपोर्ट करू.

आमच्या `helloWorldContract` ऑब्जेक्ट नंतरची चार अन-इम्प्लिमेंटेड फंक्शन्स खालीलप्रमाणे काम करतात:

- `loadCurrentMessage` - हे फंक्शन स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला वर्तमान संदेश लोड करण्याचे लॉजिक हाताळते. हे [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) वापरून Hello World स्मार्ट कॉन्ट्रॅक्टला एक _read_ कॉल करेल.
- `connectWallet` - हे फंक्शन वापरकर्त्याचे मेटामास्क आमच्या dapp शी कनेक्ट करेल.
- `getCurrentWalletConnected` - हे फंक्शन पेज लोड झाल्यावर इथेरियम खाते आधीपासूनच आमच्या dapp शी कनेक्ट केलेले आहे की नाही हे तपासेल आणि त्यानुसार आमचा UI अपडेट करेल.
- `updateMessage` - हे फंक्शन स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश अपडेट करेल. हे Hello World स्मार्ट कॉन्ट्रॅक्टला एक _write_ कॉल करेल, त्यामुळे संदेश अपडेट करण्यासाठी वापरकर्त्याच्या मेटामास्क वॉलेटला इथेरियम व्यवहारावर स्वाक्षरी करावी लागेल.

आता आपल्याला समजले आहे की आपण कशावर काम करत आहोत, चला आपल्या स्मार्ट कॉन्ट्रॅक्टमधून कसे वाचायचे ते शोधूया!

### पायरी 3: तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचा {#step-3-read-from-your-smart-contract}

तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचण्यासाठी, तुम्हाला यशस्वीरित्या खालील गोष्टी सेट अप कराव्या लागतील:

- इथेरियम चेनशी एक API कनेक्शन
- तुमच्या स्मार्ट कॉन्ट्रॅक्टचा एक लोड केलेला इन्स्टन्स
- तुमच्या स्मार्ट कॉन्ट्रॅक्ट फंक्शनला कॉल करण्यासाठी एक फंक्शन
- तुम्ही स्मार्ट कॉन्ट्रॅक्टमधून वाचत असलेला डेटा बदलल्यावर अपडेट्सवर लक्ष ठेवण्यासाठी एक लिसनर

हे ऐकायला खूप पायऱ्यांसारखे वाटू शकते, पण काळजी करू नका! आम्ही तुम्हाला त्यापैकी प्रत्येक पायरी टप्प्याटप्प्याने कशी करायची ते सांगू! :)

#### इथेरियम चेनशी API कनेक्शन स्थापित करा {#establish-an-api-connection-to-the-ethereum-chain}

तर तुम्हाला आठवते का की या ट्युटोरिअलच्या भाग 2 मध्ये, आपण आपल्या स्मार्ट कॉन्ट्रॅक्टमधून वाचण्यासाठी आपली Alchemy Web3 की कशी वापरली होती? चेनमधून वाचण्यासाठी तुम्हाला तुमच्या विकेंद्रित ॲप्लिकेशन (dapp) मध्ये देखील Alchemy Web3 की ची आवश्यकता असेल.

जर तुमच्याकडे ती आधीपासून नसेल, तर प्रथम तुमच्या `starter-files` च्या रूट डिरेक्टरीमध्ये जाऊन आणि तुमच्या टर्मिनलमध्ये खालील रन करून [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) इन्स्टॉल करा:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) हे [Web3.js](https://docs.web3js.org/) भोवती एक रॅपर आहे, जे वर्धित API पद्धती आणि इतर महत्त्वपूर्ण फायदे प्रदान करते ज्यामुळे Web3 डेव्हलपर म्हणून तुमचे जीवन सोपे होते. हे अशा प्रकारे डिझाइन केले आहे की यास कमीत कमी कॉन्फिगरेशनची आवश्यकता असते जेणेकरून तुम्ही ते तुमच्या ॲपमध्ये लगेच वापरण्यास सुरुवात करू शकता!

त्यानंतर, तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये [dotenv](https://www.npmjs.com/package/dotenv) पॅकेज इन्स्टॉल करा, जेणेकरून आपली API की मिळवल्यानंतर ती स्टोअर करण्यासाठी आपल्याकडे एक सुरक्षित जागा असेल.

```text
npm install dotenv --save
```

आपल्या dapp साठी, **आपण आपल्या HTTP API की ऐवजी आपली Websockets API की वापरणार आहोत**, कारण हे आपल्याला एक लिसनर सेट करण्याची अनुमती देईल जो स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश बदलल्यावर शोधून काढेल.

एकदा तुमच्याकडे तुमची API की आली की, तुमच्या रूट डिरेक्टरीमध्ये `.env` फाईल तयार करा आणि त्यात तुमची Alchemy Websockets URL जोडा. त्यानंतर, तुमची `.env` फाईल यासारखी दिसायला हवी:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

आता, आपण आपल्या dapp मध्ये आपला Alchemy Web3 एंडपॉइंट सेट करण्यासाठी तयार आहोत! चला आपल्या `interact.js` वर परत जाऊया, जी आपल्या `util` फोल्डरमध्ये नेस्ट केलेली आहे आणि फाईलच्या शीर्षस्थानी खालील कोड जोडूया:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

वर, आपण प्रथम आपल्या `.env` फाईलमधून Alchemy की इम्पोर्ट केली आणि नंतर आपला Alchemy Web3 एंडपॉइंट स्थापित करण्यासाठी आपली `alchemyKey` `createAlchemyWeb3` ला पास केली.

हा एंडपॉइंट तयार झाल्यावर, आता आपले स्मार्ट कॉन्ट्रॅक्ट लोड करण्याची वेळ आली आहे!
#### तुमचे Hello World स्मार्ट कॉन्ट्रॅक्ट लोड करणे {#loading-your-hello-world-smart-contract}

तुमचे Hello World स्मार्ट कॉन्ट्रॅक्ट लोड करण्यासाठी, तुम्हाला त्याचा कॉन्ट्रॅक्ट पत्ता आणि ABI आवश्यक असेल, जर तुम्ही [या ट्युटोरिअलचा भाग 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) पूर्ण केला असेल तर हे दोन्ही Etherscan वर मिळू शकतात.

#### Etherscan वरून तुमचा कॉन्ट्रॅक्ट ABI कसा मिळवायचा {#how-to-get-your-contract-abi-from-etherscan}

जर तुम्ही या ट्युटोरिअलचा भाग 3 वगळला असेल, तर तुम्ही [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) पत्त्यासह HelloWorld कॉन्ट्रॅक्ट वापरू शकता. त्याचा ABI [येथे](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) मिळू शकतो.

कॉन्ट्रॅक्ट कोणते फंक्शन इन्व्होक करेल हे निर्दिष्ट करण्यासाठी तसेच फंक्शन तुम्ही अपेक्षित असलेल्या फॉरमॅटमध्ये डेटा परत करेल याची खात्री करण्यासाठी कॉन्ट्रॅक्ट ABI आवश्यक आहे. एकदा आम्ही आमचा कॉन्ट्रॅक्ट ABI कॉपी केल्यानंतर, चला तो तुमच्या `src` डिरेक्टरीमध्ये `contract-abi.json` नावाची JSON फाइल म्हणून सेव्ह करूया.

तुमची contract-abi.json तुमच्या src फोल्डरमध्ये स्टोअर केलेली असावी.

आमचा कॉन्ट्रॅक्ट पत्ता, ABI आणि Alchemy Web3 एंडपॉइंटसह सज्ज होऊन, आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टचा इन्स्टन्स लोड करण्यासाठी [contract पद्धत](https://docs.web3js.org/api/web3-eth-contract/class/Contract) वापरू शकतो. तुमचा कॉन्ट्रॅक्ट ABI `interact.js` फाइलमध्ये इम्पोर्ट करा आणि तुमचा कॉन्ट्रॅक्ट पत्ता जोडा.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

आता आम्ही शेवटी आमचे `helloWorldContract` व्हेरिएबल अनकमेंट करू शकतो आणि आमचा AlchemyWeb3 एंडपॉइंट वापरून स्मार्ट कॉन्ट्रॅक्ट लोड करू शकतो:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

थोडक्यात सांगायचे तर, तुमच्या `interact.js` च्या पहिल्या 12 ओळी आता अशा दिसल्या पाहिजेत:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

आता आमचे कॉन्ट्रॅक्ट लोड झाले आहे, आम्ही आमचे `loadCurrentMessage` फंक्शन इम्प्लिमेंट करू शकतो!

#### तुमच्या `interact.js` फाइलमध्ये `loadCurrentMessage` इम्प्लिमेंट करणे {#implementing-loadcurrentmessage-in-your-interact-js-file}

हे फंक्शन अतिशय सोपे आहे. आम्ही आमच्या कॉन्ट्रॅक्टमधून वाचण्यासाठी एक साधा async web3 कॉल करणार आहोत. आमचे फंक्शन स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश परत करेल:

तुमच्या `interact.js` फाइलमधील `loadCurrentMessage` खालीलप्रमाणे अपडेट करा:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

आम्हाला हे स्मार्ट कॉन्ट्रॅक्ट आमच्या UI मध्ये प्रदर्शित करायचे असल्याने, चला आमच्या `HelloWorld.js` कंपोनंटमधील `useEffect` फंक्शन खालीलप्रमाणे अपडेट करूया:

```javascript
// HelloWorld.js

//फक्त एकदाच कॉल केले जाते
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

लक्षात घ्या, आम्हाला आमचे `loadCurrentMessage` कंपोनंटच्या पहिल्या रेंडर दरम्यान फक्त एकदाच कॉल करायचे आहे. स्मार्ट कॉन्ट्रॅक्टमधील संदेश बदलल्यानंतर UI स्वयंचलितपणे अपडेट करण्यासाठी आम्ही लवकरच `addSmartContractListener` इम्प्लिमेंट करू.

आम्ही आमच्या लिसनरमध्ये जाण्यापूर्वी, आतापर्यंत आमच्याकडे काय आहे ते तपासूया! तुमच्या `HelloWorld.js` आणि `interact.js` फाइल्स सेव्ह करा आणि नंतर [http://localhost:3000/](http://localhost:3000/) वर जा

तुमच्या लक्षात येईल की वर्तमान संदेश आता "No connection to the network." असे म्हणत नाही. त्याऐवजी तो स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश प्रतिबिंबित करतो. भारी!

#### तुमचा UI आता स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश प्रतिबिंबित करेल {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

आता त्या लिसनरबद्दल बोलायचे तर...

#### `addSmartContractListener` इम्प्लिमेंट करा {#implement-addsmartcontractlistener}

जर तुम्ही [या ट्युटोरिअल सिरीजच्या भाग 1](#step-10-write-our-contract) मध्ये आम्ही लिहिलेल्या `HelloWorld.sol` फाइलचा विचार केला, तर तुम्हाला आठवेल की `UpdatedMessages` नावाचा एक स्मार्ट कॉन्ट्रॅक्ट इव्हेंट आहे जो आमच्या स्मार्ट कॉन्ट्रॅक्टचे `update` फंक्शन इन्व्होक झाल्यानंतर एमिट केला जातो (ओळी 9 आणि 27 पहा):

```javascript
// HelloWorld.sol

// सिमेंटिक व्हर्जनिंग वापरून, Solidity ची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` नावाचे कॉन्ट्रॅक्ट परिभाषित करते.
// कॉन्ट्रॅक्ट हे फंक्शन्स आणि डेटा (त्याची स्थिती) यांचा संग्रह आहे. एकदा प्रस्थापित केल्यानंतर, कॉन्ट्रॅक्ट इथेरियम ब्लॉकचेनवरील एका विशिष्ट पत्त्यावर राहते. अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //जेव्हा अपडेट फंक्शन कॉल केले जाते तेव्हा एमिट केले जाते
   //स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स हा तुमच्या कॉन्ट्रॅक्टसाठी ब्लॉकचेनवर काहीतरी घडल्याचे तुमच्या ॲप फ्रंट-एंडला कळवण्याचा एक मार्ग आहे, जे विशिष्ट इव्हेंट्ससाठी 'ऐकत' असू शकते आणि ते घडल्यावर कारवाई करू शकते.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` प्रकाराचे `message` स्थिती व्हेरिएबल घोषित करते.
   // स्थिती व्हेरिएबल्स असे व्हेरिएबल्स आहेत ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमस्वरूपी संग्रहित केली जातात. `public` कीवर्ड व्हेरिएबल्सना कॉन्ट्रॅक्टच्या बाहेरून प्रवेश करण्यायोग्य बनवतो आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट्स मूल्य ॲक्सेस करण्यासाठी कॉल करू शकतात.
   string public message;

   // अनेक क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणेच, कन्स्ट्रक्टर हे एक विशेष फंक्शन आहे जे केवळ कॉन्ट्रॅक्ट तयार करताना कार्यान्वित केले जाते.
   // कन्स्ट्रक्टर्सचा वापर कॉन्ट्रॅक्टचा डेटा इनिशियलाइझ करण्यासाठी केला जातो. अधिक जाणून घ्या:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // स्ट्रिंग आर्ग्युमेंट `initMessage` स्वीकारते आणि कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये मूल्य सेट करते).
      message = initMessage;
   }

   // एक पब्लिक फंक्शन जे स्ट्रिंग आर्ग्युमेंट स्वीकारते आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स हा तुमच्या कॉन्ट्रॅक्टसाठी ब्लॉकचेनवर काहीतरी घडले आहे (म्हणजेच, एक _इव्हेंट_ होता) हे तुमच्या फ्रंट-एंड ॲप्लिकेशनला कळवण्याचा एक मार्ग आहे, जे विशिष्ट इव्हेंट्ससाठी 'ऐकत' असू शकते आणि ते घडल्यावर कारवाई करू शकते.

`addSmartContractListener` फंक्शन विशेषतः आमच्या Hello World स्मार्ट कॉन्ट्रॅक्टच्या `UpdatedMessages` इव्हेंटसाठी ऐकणार आहे आणि नवीन संदेश प्रदर्शित करण्यासाठी आमचा UI अपडेट करणार आहे.

`addSmartContractListener` खालीलप्रमाणे सुधारा:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

जेव्हा लिसनर एखादा इव्हेंट शोधतो तेव्हा काय होते ते समजून घेऊया:

- जर इव्हेंट एमिट होताना एखादी त्रुटी आली, तर ती आमच्या `status` स्थिती व्हेरिएबलद्वारे UI मध्ये प्रतिबिंबित होईल.
- अन्यथा, आम्ही परत केलेला `data` ऑब्जेक्ट वापरू. `data.returnValues` हा शून्यावर इंडेक्स केलेला एक ॲरे आहे जिथे ॲरेमधील पहिला घटक मागील संदेश स्टोअर करतो आणि दुसरा घटक अपडेट केलेला संदेश स्टोअर करतो. एकूणच, यशस्वी इव्हेंटवर आम्ही आमची `message` स्ट्रिंग अपडेट केलेल्या संदेशावर सेट करू, `newMessage` स्ट्रिंग क्लिअर करू आणि आमच्या स्मार्ट कॉन्ट्रॅक्टवर नवीन संदेश प्रकाशित झाला आहे हे प्रतिबिंबित करण्यासाठी आमचे `status` स्थिती व्हेरिएबल अपडेट करू.

शेवटी, चला आमचा लिसनर आमच्या `useEffect` फंक्शनमध्ये कॉल करूया जेणेकरून तो `HelloWorld.js` कंपोनंटच्या पहिल्या रेंडरवर इनिशियलाइज होईल. एकूणच, तुमचे `useEffect` फंक्शन असे दिसले पाहिजे:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

आता आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचण्यास सक्षम आहोत, त्यात कसे लिहायचे हे शोधणे देखील उत्तम होईल! तथापि, आमच्या dapp मध्ये लिहिण्यासाठी, आमच्याकडे प्रथम एक इथेरियम वॉलेट कनेक्ट केलेले असणे आवश्यक आहे.

म्हणून, पुढे आम्ही आमचे इथेरियम वॉलेट (मेटामास्क) सेट करणे आणि नंतर ते आमच्या dapp शी कनेक्ट करणे हाताळू!

### पायरी 4: तुमचे इथेरियम वॉलेट सेट करा {#step-4-set-up-your-ethereum-wallet}

इथेरियम चेनवर काहीही लिहिण्यासाठी, वापरकर्त्यांनी त्यांच्या व्हर्च्युअल वॉलेटच्या खाजगी की वापरून व्यवहारांवर स्वाक्षरी करणे आवश्यक आहे. या ट्युटोरिअलसाठी, आम्ही [मेटामास्क](https://metamask.io/) वापरू, जे ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे जे तुमचा इथेरियम खाते पत्ता व्यवस्थापित करण्यासाठी वापरले जाते, कारण हे अंतिम वापरकर्त्यासाठी व्यवहारावर स्वाक्षरी करणे अतिशय सोपे करते.

जर तुम्हाला इथेरियमवरील व्यवहार कसे काम करतात याबद्दल अधिक समजून घ्यायचे असेल, तर इथेरियम फाउंडेशनचे [हे पेज](/developers/docs/transactions/) तपासा.

#### मेटामास्क डाउनलोड करा {#download-metamask}

तुम्ही [येथे](https://metamask.io/download) विनामूल्य मेटामास्क खाते डाउनलोड आणि तयार करू शकता. जेव्हा तुम्ही खाते तयार करत असाल, किंवा जर तुमच्याकडे आधीपासूनच खाते असेल, तर वरच्या उजव्या बाजूला "Goerli Test Network" वर स्विच करण्याची खात्री करा (जेणेकरून आम्ही खऱ्या पैशांशी व्यवहार करत नाही).

#### फॉसेटमधून इथर जोडा {#add-ether-from-a-faucet}

इथेरियम ब्लॉकचेनवरील व्यवहारावर स्वाक्षरी करण्यासाठी, आम्हाला काही बनावट Eth ची आवश्यकता असेल. Eth मिळवण्यासाठी तुम्ही [FaucETH](https://fauceth.komputing.org) वर जाऊ शकता आणि तुमचा गोर्ली खाते पत्ता प्रविष्ट करू शकता, "Request funds" वर क्लिक करा, नंतर ड्रॉपडाउनमध्ये "Ethereum Testnet Goerli" निवडा आणि शेवटी पुन्हा "Request funds" बटणावर क्लिक करा. तुम्हाला लवकरच तुमच्या मेटामास्क खात्यात Eth दिसेल!

#### तुमचे बॅलन्स तपासा {#check-your-balance}

आपले बॅलन्स तिथे आहे याची खात्री करण्यासाठी, चला [Alchemy च्या सँडबॉक्स टूलचा](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) वापर करून [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) विनंती करूया. हे आपल्या वॉलेटमधील Eth ची रक्कम परत करेल. तुम्ही तुमचा मेटामास्क खाते पत्ता प्रविष्ट केल्यानंतर आणि “Send Request” वर क्लिक केल्यानंतर, तुम्हाला यासारखा प्रतिसाद दिसेल:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**टीप:** हा निकाल wei मध्ये आहे, eth मध्ये नाही. Wei हे इथरचे सर्वात लहान मूल्य म्हणून वापरले जाते. wei मधून eth मध्ये रूपांतरण असे आहे: 1 eth = 10¹⁸ wei. म्हणून जर आपण 0xde0b6b3a7640000 ला डेसिमलमध्ये रूपांतरित केले तर आपल्याला 1\*10¹⁸ मिळते जे 1 eth च्या बरोबरीचे आहे.

हुश्श! आपले सर्व बनावट पैसे तिथे आहेत! 🤑
### पायरी 5: मेटामास्क तुमच्या UI शी कनेक्ट करा {#step-5-connect-metamask-to-your-ui}

आता आमचे मेटामास्क वॉलेट सेट झाले आहे, चला आमचे dapp त्याच्याशी कनेक्ट करूया!

#### `connectWallet` फंक्शन {#the-connectwallet-function}

आमच्या `interact.js` फाइलमध्ये, चला `connectWallet` फंक्शन इम्प्लिमेंट करूया, जे आम्ही नंतर आमच्या `HelloWorld.js` कंपोनंटमध्ये कॉल करू शकतो.

`connectWallet` खालीलप्रमाणे सुधारा:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

तर हा कोडचा मोठा ब्लॉक नक्की काय करतो?

बरं, प्रथम, तो तुमच्या ब्राउझरमध्ये `window.ethereum` सक्षम आहे की नाही हे तपासतो.

`window.ethereum` हा मेटामास्क आणि इतर वॉलेट प्रदात्यांद्वारे इंजेक्ट केलेला एक ग्लोबल API आहे जो वेबसाइट्सना वापरकर्त्यांच्या इथेरियम खात्यांची विनंती करण्याची अनुमती देतो. मंजूर झाल्यास, तो वापरकर्ता कनेक्ट केलेल्या ब्लॉकचेन्समधून डेटा वाचू शकतो आणि वापरकर्त्याला संदेश आणि व्यवहारांवर स्वाक्षरी करण्याचे सुचवू शकतो. अधिक माहितीसाठी [मेटामास्क डॉक्स](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) तपासा!

जर `window.ethereum` उपस्थित _नसेल_, तर याचा अर्थ मेटामास्क इन्स्टॉल केलेले नाही. याचा परिणाम म्हणून एक JSON ऑब्जेक्ट परत केला जातो, जिथे परत केलेला `address` एक रिकामी स्ट्रिंग असते आणि `status` JSX ऑब्जेक्ट वापरकर्त्याने मेटामास्क इन्स्टॉल केले पाहिजे असा संदेश देतो.

आता जर `window.ethereum` उपस्थित _असेल_, तर तेव्हा गोष्टी मनोरंजक होतात.

try/catch लूप वापरून, आम्ही [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) कॉल करून मेटामास्कशी कनेक्ट करण्याचा प्रयत्न करू. हे फंक्शन कॉल केल्याने ब्राउझरमध्ये मेटामास्क उघडेल, ज्याद्वारे वापरकर्त्याला त्यांचे वॉलेट तुमच्या dapp शी कनेक्ट करण्यास सांगितले जाईल.

- जर वापरकर्त्याने कनेक्ट करणे निवडले, तर `method: "eth_requestAccounts"` एक ॲरे परत करेल ज्यामध्ये dapp शी कनेक्ट केलेल्या वापरकर्त्याच्या सर्व खात्यांचे पत्ते असतील. एकूणच, आमचे `connectWallet` फंक्शन एक JSON ऑब्जेक्ट परत करेल ज्यामध्ये या ॲरेमधील _पहिला_ `address` (ओळ 9 पहा) आणि एक `status` संदेश असेल जो वापरकर्त्याला स्मार्ट कॉन्ट्रॅक्टमध्ये संदेश लिहिण्यास प्रवृत्त करेल.
- जर वापरकर्त्याने कनेक्शन नाकारले, तर JSON ऑब्जेक्टमध्ये परत केलेल्या `address` साठी एक रिकामी स्ट्रिंग असेल आणि एक `status` संदेश असेल जो वापरकर्त्याने कनेक्शन नाकारले हे प्रतिबिंबित करेल.

आता आम्ही हे `connectWallet` फंक्शन लिहिले आहे, पुढची पायरी म्हणजे ते आमच्या `HelloWorld.js` कंपोनंटमध्ये कॉल करणे.

#### तुमच्या `HelloWorld.js` UI कंपोनंटमध्ये `connectWallet` फंक्शन जोडा {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js` मधील `connectWalletPressed` फंक्शनवर जा, आणि ते खालीलप्रमाणे अपडेट करा:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

लक्षात घ्या की आमची बहुतांश कार्यक्षमता `interact.js` फाइलमधून आमच्या `HelloWorld.js` कंपोनंटपासून कशी ॲबस्ट्रॅक्ट केली आहे? हे यासाठी आहे जेणेकरून आम्ही M-V-C पॅराडाइमचे पालन करू!

`connectWalletPressed` मध्ये, आम्ही फक्त आमच्या इम्पोर्ट केलेल्या `connectWallet` फंक्शनला एक await कॉल करतो आणि त्याचा प्रतिसाद वापरून, आम्ही आमचे `status` आणि `walletAddress` व्हेरिएबल्स त्यांच्या स्थिती हुक्सद्वारे अपडेट करतो.

आता, दोन्ही फाइल्स (`HelloWorld.js` आणि `interact.js`) सेव्ह करूया आणि आतापर्यंतचा आमचा UI तपासूया.

तुमचा ब्राउझर [http://localhost:3000/](http://localhost:3000/) पेजवर उघडा आणि पेजच्या वरच्या उजव्या बाजूला असलेल्या "Connect Wallet" बटणावर दाबा.

जर तुमच्याकडे मेटामास्क इन्स्टॉल केलेले असेल, तर तुम्हाला तुमचे वॉलेट तुमच्या dapp शी कनेक्ट करण्यास सांगितले जाईल. कनेक्ट करण्याचे आमंत्रण स्वीकारा.

तुम्हाला दिसेल की वॉलेट बटण आता तुमचा पत्ता कनेक्ट केलेला आहे हे प्रतिबिंबित करते! भारी 🔥

पुढे, पेज रिफ्रेश करण्याचा प्रयत्न करा... हे विचित्र आहे. आमचे वॉलेट बटण आम्हाला मेटामास्क कनेक्ट करण्यास सांगत आहे, जरी ते आधीपासूनच कनेक्ट केलेले असले तरी...

तथापि, घाबरू नका! आम्ही `getCurrentWalletConnected` इम्प्लिमेंट करून ते सहजपणे सोडवू शकतो, जे एखादा पत्ता आधीपासूनच आमच्या dapp शी कनेक्ट केलेला आहे की नाही हे तपासेल आणि त्यानुसार आमचा UI अपडेट करेल!

#### `getCurrentWalletConnected` फंक्शन {#the-getcurrentwalletconnected-function}

`interact.js` फाइलमधील तुमचे `getCurrentWalletConnected` फंक्शन खालीलप्रमाणे अपडेट करा:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

हा कोड आम्ही मागील पायरीमध्ये लिहिलेल्या `connectWallet` फंक्शनसारखाच _खूप_ आहे.

मुख्य फरक हा आहे की `eth_requestAccounts` पद्धत कॉल करण्याऐवजी, जी वापरकर्त्याला त्यांचे वॉलेट कनेक्ट करण्यासाठी मेटामास्क उघडते, येथे आम्ही `eth_accounts` पद्धत कॉल करतो, जी फक्त सध्या आमच्या dapp शी कनेक्ट केलेले मेटामास्क पत्ते असलेला एक ॲरे परत करते.

हे फंक्शन कृतीत पाहण्यासाठी, चला ते आमच्या `HelloWorld.js` कंपोनंटच्या `useEffect` फंक्शनमध्ये कॉल करूया:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

लक्षात घ्या, आम्ही आमचे `walletAddress` आणि `status` स्थिती व्हेरिएबल्स अपडेट करण्यासाठी `getCurrentWalletConnected` ला केलेल्या कॉलचा प्रतिसाद वापरतो.

आता तुम्ही हा कोड जोडला आहे, चला आमची ब्राउझर विंडो रिफ्रेश करण्याचा प्रयत्न करूया.

छान! बटणाने तुम्ही कनेक्ट आहात असे म्हटले पाहिजे आणि तुमच्या कनेक्ट केलेल्या वॉलेटच्या पत्त्याचे पूर्वावलोकन दाखवले पाहिजे - तुम्ही रिफ्रेश केल्यानंतरही!

#### `addWalletListener` इम्प्लिमेंट करा {#implement-addwalletlistener}

आमच्या dapp वॉलेट सेटअपमधील अंतिम पायरी म्हणजे वॉलेट लिसनर इम्प्लिमेंट करणे जेणेकरून जेव्हा आमच्या वॉलेटची स्थिती बदलते, जसे की जेव्हा वापरकर्ता डिस्कनेक्ट करतो किंवा खाती बदलतो तेव्हा आमचा UI अपडेट होतो.

तुमच्या `HelloWorld.js` फाइलमध्ये, तुमचे `addWalletListener` फंक्शन खालीलप्रमाणे सुधारा:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

मला खात्री आहे की या टप्प्यावर येथे काय चालले आहे हे समजून घेण्यासाठी तुम्हाला आमच्या मदतीची देखील आवश्यकता नाही, परंतु पूर्णतेच्या उद्देशाने, चला ते पटकन समजून घेऊया:

- प्रथम, आमचे फंक्शन `window.ethereum` सक्षम आहे की नाही हे तपासते (म्हणजेच, मेटामास्क इन्स्टॉल केलेले आहे).
  - जर ते नसेल, तर आम्ही फक्त आमचे `status` स्थिती व्हेरिएबल एका JSX स्ट्रिंगवर सेट करतो जे वापरकर्त्याला मेटामास्क इन्स्टॉल करण्यास प्रवृत्त करते.
  - जर ते सक्षम असेल, तर आम्ही ओळ 3 वर `window.ethereum.on("accountsChanged")` लिसनर सेट करतो जो मेटामास्क वॉलेटमधील स्थिती बदलांसाठी ऐकतो, ज्यामध्ये वापरकर्ता dapp शी अतिरिक्त खाते कनेक्ट करतो, खाती बदलतो किंवा खाते डिस्कनेक्ट करतो याचा समावेश होतो. जर किमान एक खाते कनेक्ट केलेले असेल, तर `walletAddress` स्थिती व्हेरिएबल लिसनरने परत केलेल्या `accounts` ॲरेमधील पहिले खाते म्हणून अपडेट केले जाते. अन्यथा, `walletAddress` एक रिकामी स्ट्रिंग म्हणून सेट केले जाते.

शेवटचे पण महत्त्वाचे, आम्ही ते आमच्या `useEffect` फंक्शनमध्ये कॉल केले पाहिजे:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

आणि झाले! आम्ही आमच्या सर्व वॉलेट कार्यक्षमतेचे प्रोग्रामिंग यशस्वीरित्या पूर्ण केले आहे! आता आमच्या शेवटच्या कामाकडे: आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोअर केलेला संदेश अपडेट करणे!

### पायरी 6: `updateMessage` फंक्शन इम्प्लिमेंट करा {#step-6-implement-the-updatemessage-function}

ठीक आहे मित्रांनो, आपण अंतिम टप्प्यात पोहोचलो आहोत! तुमच्या `interact.js` फाइलच्या `updateMessage` मध्ये, आम्ही खालील गोष्टी करणार आहोत:

1. आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये जो संदेश प्रकाशित करू इच्छितो तो वैध असल्याची खात्री करा
2. मेटामास्क वापरून आमच्या व्यवहारावर स्वाक्षरी करा
3. हे फंक्शन आमच्या `HelloWorld.js` फ्रंटएंड कंपोनंटमधून कॉल करा

याला जास्त वेळ लागणार नाही; चला हे dapp पूर्ण करूया!

#### इनपुट त्रुटी हाताळणी {#input-error-handling}

साहजिकच, फंक्शनच्या सुरुवातीला काही प्रकारची इनपुट त्रुटी हाताळणी असणे अर्थपूर्ण आहे.

जर मेटामास्क एक्स्टेंशन इन्स्टॉल केलेले नसेल, कोणतेही वॉलेट कनेक्ट केलेले नसेल (म्हणजेच, पास केलेला `address` एक रिकामी स्ट्रिंग असेल), किंवा `message` एक रिकामी स्ट्रिंग असेल तर आमचे फंक्शन लवकर परत यावे असे आम्हाला वाटेल. चला `updateMessage` मध्ये खालील त्रुटी हाताळणी जोडूया:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

आता यात योग्य इनपुट त्रुटी हाताळणी असल्याने, मेटामास्कद्वारे व्यवहारावर स्वाक्षरी करण्याची वेळ आली आहे!

#### आमच्या व्यवहारावर स्वाक्षरी करणे {#signing-our-transaction}

जर तुम्ही पारंपारिक web3 इथेरियम व्यवहारांशी आधीच परिचित असाल, तर आम्ही पुढे लिहिणारा कोड खूप ओळखीचा वाटेल. तुमच्या इनपुट त्रुटी हाताळणी कोडच्या खाली, `updateMessage` मध्ये खालील जोडा:

```javascript
// interact.js

//व्यवहार पॅरामीटर्स सेट करा
const transactionParameters = {
  to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनांदरम्यान वगळता आवश्यक.
  from: address, // वापरकर्त्याच्या सक्रिय पत्त्याशी जुळले पाहिजे.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//व्यवहारावर स्वाक्षरी करा
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

काय होत आहे ते समजून घेऊया. प्रथम, आम्ही आमचे व्यवहार पॅरामीटर्स सेट करतो, जिथे:

- `to` प्राप्तकर्त्याचा पत्ता (आमचे स्मार्ट कॉन्ट्रॅक्ट) निर्दिष्ट करतो
- `from` व्यवहारावर स्वाक्षरी करणारा निर्दिष्ट करतो, `address` व्हेरिएबल जो आम्ही आमच्या फंक्शनमध्ये पास केला आहे
- `data` मध्ये आमच्या Hello World स्मार्ट कॉन्ट्रॅक्टच्या `update` पद्धतीचा कॉल आहे, जो आमचा `message` स्ट्रिंग व्हेरिएबल इनपुट म्हणून प्राप्त करतो

त्यानंतर, आम्ही एक await कॉल करतो, `window.ethereum.request`, जिथे आम्ही मेटामास्कला व्यवहारावर स्वाक्षरी करण्यास सांगतो. लक्षात घ्या, ओळी 11 आणि 12 वर, आम्ही आमची eth पद्धत, `eth_sendTransaction` निर्दिष्ट करत आहोत आणि आमचे `transactionParameters` पास करत आहोत.

या टप्प्यावर, ब्राउझरमध्ये मेटामास्क उघडेल आणि वापरकर्त्याला व्यवहारावर स्वाक्षरी करण्यास किंवा तो नाकारण्यास प्रवृत्त करेल.

- जर व्यवहार यशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `status` JSX स्ट्रिंग वापरकर्त्याला त्यांच्या व्यवहाराबद्दल अधिक माहितीसाठी Etherscan तपासण्यास प्रवृत्त करते.
- जर व्यवहार अयशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `status` स्ट्रिंग त्रुटी संदेश देते.

एकूणच, आमचे `updateMessage` फंक्शन असे दिसले पाहिजे:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //इनपुट त्रुटी हाताळणी
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //व्यवहार पॅरामीटर्स सेट करा
  const transactionParameters = {
    to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनांदरम्यान वगळता आवश्यक.
    from: address, // वापरकर्त्याच्या सक्रिय पत्त्याशी जुळले पाहिजे.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //व्यवहारावर स्वाक्षरी करा
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

शेवटचे पण महत्त्वाचे, आम्हाला आमचे `updateMessage` फंक्शन आमच्या `HelloWorld.js` कंपोनंटशी कनेक्ट करणे आवश्यक आहे.

#### `updateMessage` ला `HelloWorld.js` फ्रंटएंडशी कनेक्ट करा {#connect-updatemessage-to-the-helloworld-js-frontend}

आमच्या `onUpdatePressed` फंक्शनने इम्पोर्ट केलेल्या `updateMessage` फंक्शनला एक await कॉल केला पाहिजे आणि आमचा व्यवहार यशस्वी झाला की अयशस्वी हे प्रतिबिंबित करण्यासाठी `status` स्थिती व्हेरिएबल सुधारित केले पाहिजे:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

हे अतिशय स्वच्छ आणि सोपे आहे. आणि काय सांगू... तुमचे DAPP पूर्ण झाले आहे!!!

पुढे जा आणि **Update** बटण तपासा!

### तुमचे स्वतःचे कस्टम dapp बनवा {#make-your-own-custom-dapp}

व्वा, तुम्ही ट्युटोरिअलच्या शेवटी पोहोचलात! थोडक्यात सांगायचे तर, तुम्ही खालील गोष्टी कशा करायच्या हे शिकलात:

- तुमच्या dapp प्रोजेक्टला मेटामास्क वॉलेट कनेक्ट करणे
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API वापरून तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून डेटा वाचणे
- मेटामास्क वापरून इथेरियम व्यवहारांवर स्वाक्षरी करणे

आता तुम्ही तुमचा स्वतःचा कस्टम dapp प्रोजेक्ट तयार करण्यासाठी या ट्युटोरिअलमधील कौशल्ये लागू करण्यासाठी पूर्णपणे सज्ज आहात! नेहमीप्रमाणे, जर तुम्हाला काही प्रश्न असतील, तर मदतीसाठी [Alchemy डिस्कॉर्ड्](https://discord.gg/gWuC7zB) मध्ये आमच्याशी संपर्क साधण्यास अजिबात संकोच करू नका. 🧙‍♂️

एकदा तुम्ही हे ट्युटोरिअल पूर्ण केल्यानंतर, तुमचा अनुभव कसा होता किंवा तुमचा काही अभिप्राय असल्यास आम्हाला ट्विटर् वर [@alchemyplatform](https://twitter.com/AlchemyPlatform) टॅग करून कळवा!
