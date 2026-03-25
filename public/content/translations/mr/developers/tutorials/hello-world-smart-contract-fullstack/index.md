---
title: "नवशिक्यांसाठी हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट - फुलस्टॅक"
description: "Ethereum वर एक साधे स्मार्ट कॉन्ट्रॅक्ट लिहिण्यावर आणि उपयोजित करण्यावर एक प्रास्ताविक ट्युटोरियल."
author: "nstrike2"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "डिप्लॉयिंग",
    "ब्लॉक एक्सप्लोरर",
    "frontend",
    "व्यवहार"
  ]
skill: beginner
lang: mr
published: 2021-10-25
---

तुम्ही ब्लॉकचेन डेव्हलपमेंटसाठी नवीन असाल आणि तुम्हाला कोठून सुरुवात करावी किंवा स्मार्ट कॉन्ट्रॅक्ट कसे तैनात करावे आणि त्यांच्याशी संवाद कसा साधावा हे माहित नसेल, तर हे मार्गदर्शक तुमच्यासाठी आहे. आम्ही [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), आणि [Alchemy](https://alchemy.com/eth) वापरून Goerli टेस्ट नेटवर्कवर एक साधे, स्मार्ट कॉन्ट्रॅक्ट तयार करणे आणि तैनात करण्याच्या प्रक्रियेतून जाऊ.

हे ट्युटोरियल पूर्ण करण्यासाठी तुम्हाला Alchemy खात्याची आवश्यकता असेल. [विनामूल्य खात्यासाठी साइन अप करा](https://www.alchemy.com/).

तुम्हाला कोणत्याही क्षणी प्रश्न असल्यास, [Alchemy Discord](https://discord.gg/gWuC7zB) मध्ये संपर्क साधा!

## भाग १ - Hardhat वापरून तुमचे स्मार्ट कॉन्ट्रॅक्ट तयार करा आणि तैनात करा {#part-1}

### Ethereum नेटवर्कशी कनेक्ट करा {#connect-to-the-ethereum-network}

Ethereum चेनला विनंत्या करण्याचे अनेक मार्ग आहेत. साधेपणासाठी, आम्ही Alchemy वर एक विनामूल्य खाते वापरू, जे एक ब्लॉकचेन डेव्हलपर प्लॅटफॉर्म आणि API आहे, जे आम्हाला स्वतः नोड न चालवता Ethereum चेनशी संवाद साधण्याची परवानगी देते. Alchemy मध्ये देखरेख आणि विश्लेषणासाठी डेव्हलपर टूल्स देखील आहेत; आम्ही या ट्युटोरियलमध्ये आमच्या स्मार्ट कॉन्ट्रॅक्ट तैनातीमध्ये काय चालले आहे हे समजून घेण्यासाठी त्यांचा फायदा घेऊ.

### तुमचे ॲप आणि API की तयार करा {#create-your-app-and-api-key}

एकदा तुम्ही Alchemy खाते तयार केल्यावर, तुम्ही ॲप तयार करून API की तयार करू शकता. यामुळे तुम्हाला Goerli टेस्टनेटवर विनंत्या करण्याची परवानगी मिळेल. तुम्ही टेस्टनेटशी परिचित नसल्यास, तुम्ही [नेटवर्क निवडण्याबाबत Alchemy चे मार्गदर्शक](https://www.alchemy.com/docs/choosing-a-web3-network) वाचू शकता.

Alchemy डॅशबोर्डवर, नेव्हिगेशन बारमधील **ॲप्स** ड्रॉपडाउन शोधा आणि **ॲप तयार करा** वर क्लिक करा.

![हॅलो वर्ल्ड ॲप तयार करा](./hello-world-create-app.png)

तुमच्या ॲपला '_Hello World_' असे नाव द्या आणि एक लहान वर्णन लिहा. तुमचे पर्यावरण म्हणून **स्टेजिंग** आणि तुमचे नेटवर्क म्हणून **Goerli** निवडा.

![ॲप व्ह्यू हॅलो वर्ल्ड तयार करा](./create-app-view-hello-world.png)

_टीप: **Goerli** निवडण्याची खात्री करा, अन्यथा हे ट्युटोरियल कार्य करणार नाही._

**ॲप तयार करा** वर क्लिक करा. तुमचे ॲप खालील टेबलमध्ये दिसेल.

### एक Ethereum खाते तयार करा {#create-an-ethereum-account}

तुम्हाला व्यवहार पाठवण्यासाठी आणि प्राप्त करण्यासाठी Ethereum खात्याची आवश्यकता आहे. आम्ही MetaMask वापरू, जो ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे, जो वापरकर्त्यांना त्यांच्या Ethereum खात्याचा पत्ता व्यवस्थापित करू देतो.

तुम्ही [येथे](https://metamask.io/download) विनामूल्य MetaMask खाते डाउनलोड आणि तयार करू शकता. तुम्ही खाते तयार करत असताना, किंवा तुमच्याकडे आधीपासूनच खाते असल्यास, वरच्या उजवीकडील “Goerli टेस्ट नेटवर्क” वर स्विच करण्याची खात्री करा (जेणेकरून आपण खऱ्या पैशांशी व्यवहार करत नाही आहोत).

### पायरी ४: फॉसेटमधून इथर जोडा {#step-4-add-ether-from-a-faucet}

तुमचे स्मार्ट कॉन्ट्रॅक्ट टेस्ट नेटवर्कवर तैनात करण्यासाठी, तुम्हाला काही बनावट ETH ची आवश्यकता असेल. Goerli नेटवर्कवर ETH मिळवण्यासाठी, Goerli फॉसेटवर जा आणि तुमच्या Goerli खात्याचा पत्ता प्रविष्ट करा. लक्षात ठेवा की Goerli फॉसेट अलीकडे थोडे अविश्वसनीय असू शकतात - प्रयत्न करण्यासाठी पर्यायांची सूची पाहण्यासाठी [टेस्ट नेटवर्क पृष्ठ](/developers/docs/networks/#goerli) पहा:

_टीप: नेटवर्कमधील गर्दीमुळे, यास थोडा वेळ लागू शकतो._
``

### पायरी 5: तुमची शिल्लक तपासा {#step-5-check-your-balance}

तुमच्या वॉलेटमध्ये ETH आहे की नाही हे पुन्हा तपासण्यासाठी, चला [Alchemy च्या कंपोझर टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) वापरून [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) विनंती करूया. हे आमच्या वॉलेटमधील ETH ची रक्कम परत करेल. अधिक जाणून घेण्यासाठी [कंपोझर टूल कसे वापरावे यावरील Alchemy चे छोटे ट्युटोरियल](https://youtu.be/r6sjRxBZJuU) पहा.

तुमचा MetaMask खात्याचा पत्ता इनपुट करा आणि **विनंती पाठवा** वर क्लिक करा. तुम्हाला खालील कोड स्निपेटसारखा प्रतिसाद दिसेल.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _टीप: हा निकाल ETH मध्ये नाही, तर wei मध्ये आहे. Wei चा वापर इथरच्या सर्वात लहान मूल्यांकनासाठी केला जातो._

हुश्श! आपले बनावट पैसे तिथे आहेत.

### पायरी 6: आपला प्रकल्प सुरू करा {#step-6-initialize-our-project}

प्रथम, आपल्याला आपल्या प्रकल्पासाठी एक फोल्डर तयार करण्याची आवश्यकता असेल. तुमच्या कमांड लाइनवर नेव्हिगेट करा आणि खालील इनपुट करा.

```
mkdir hello-world
cd hello-world
```

आता आपण आपल्या प्रोजेक्ट फोल्डरमध्ये आहोत, आपण प्रोजेक्ट सुरू करण्यासाठी `npm init` वापरू.

> तुमच्याकडे अद्याप npm इंस्टॉल केलेले नसल्यास, [Node.js आणि npm इंस्टॉल करण्यासाठी या सूचनांचे](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) पालन करा.

या ट्युटोरियलच्या उद्देशासाठी, तुम्ही आरंभीकरणाच्या प्रश्नांची उत्तरे कशी देता याने काही फरक पडत नाही. संदर्भासाठी आम्ही ते कसे केले ते येथे आहे:

```
पॅकेजचे नाव: (hello-world)
आवृत्ती: (1.0.0)
वर्णन: हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट
एंट्री पॉइंट: (index.js)
चाचणी कमांड:
git रेपॉजिटरी:
कीवर्ड:
लेखक:
परवाना: (ISC)

/Users/.../.../.../hello-world/package.json मध्ये लिहिणार आहात:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json ला मंजूर करा आणि आपण पुढे जाण्यास तयार आहोत!

### पायरी 7: Hardhat डाउनलोड करा {#step-7-download-hardhat}

Hardhat हे तुमचे Ethereum सॉफ्टवेअर संकलित (compile), उपयोजित (deploy), चाचणी (test) आणि डीबग (debug) करण्यासाठी एक विकास वातावरण आहे. हे डेव्हलपर्सना थेट चेनवर उपयोजित करण्यापूर्वी स्थानिक पातळीवर स्मार्ट कॉन्ट्रॅक्ट्स आणि dApps तयार करताना मदत करते.

आपल्या `hello-world` प्रोजेक्टमध्ये चालवा:

```
npm install --save-dev hardhat
```

[इन्स्टॉलेशन सूचनांविषयी](https://hardhat.org/getting-started/#overview) अधिक तपशीलांसाठी हे पेज पहा.

### पायरी 8: Hardhat प्रकल्प तयार करा {#step-8-create-hardhat-project}

आमच्या `hello-world` प्रकल्प फोल्डरमध्ये, चालवा:

```
npx hardhat
```

त्यानंतर तुम्हाला एक स्वागत संदेश आणि तुम्हाला काय करायचे आहे यासाठी पर्याय दिसेल. “create an empty hardhat.config.js” निवडा:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.11 मध्ये आपले स्वागत आहे 👷‍

तुम्ही काय करू इच्छिता? …
एक नमुना प्रकल्प तयार करा
❯ एक रिक्त hardhat.config.js तयार करा
बाहेर पडा
```

हे प्रकल्पात `hardhat.config.js` फाइल तयार करेल. आपण हे नंतर ट्युटोरियलमध्ये आपल्या प्रकल्पासाठी सेटअप निर्दिष्ट करण्यासाठी वापरू.

### पायरी 9: प्रकल्प फोल्डर जोडा {#step-9-add-project-folders}

प्रकल्प संघटित ठेवण्यासाठी, चला दोन नवीन फोल्डर तयार करूया. कमांड लाइनमध्ये, तुमच्या `hello-world` प्रकल्पाच्या रूट डिरेक्टरीमध्ये नेव्हिगेट करा आणि टाइप करा:

```
mkdir contracts
mkdir scripts
```

- `contracts/` मध्ये आपण आपली हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट कोड फाईल ठेवू
- `scripts/` मध्ये आपण आपले कॉन्ट्रॅक्ट उपयोजित करण्यासाठी आणि त्याच्याशी संवाद साधण्यासाठी स्क्रिप्ट्स ठेवू

### पायरी 10: आमचे कॉन्ट्रॅक्ट लिहा {#step-10-write-our-contract}

तुम्ही स्वतःला विचारत असाल की, आपण कोड कधी लिहिणार आहोत? वेळ झाली आहे!

तुमच्या आवडत्या एडिटरमध्ये हॅलो-वर्ल्ड प्रकल्प उघडा. स्मार्ट कॉन्ट्रॅक्ट सामान्यतः Solidity मध्ये लिहिले जातात, जे आपण आपले स्मार्ट कॉन्ट्रॅक्ट लिहिण्यासाठी वापरू.‌

1. `contracts` फोल्डरवर नेव्हिगेट करा आणि `HelloWorld.sol` नावाची नवीन फाइल तयार करा
2. खाली एक नमुना हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट आहे जो आपण या ट्युटोरियलसाठी वापरणार आहोत. खालील मजकूर `HelloWorld.sol` फाइलमध्ये कॉपी करा.

_टीप: हे कॉन्ट्रॅक्ट काय करते हे समजून घेण्यासाठी टिप्पण्या वाचण्याची खात्री करा._

```
// सिमेंटिक व्हर्जनिंग वापरून, Solidity ची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` नावाचे एक कॉन्ट्रॅक्ट परिभाषित करते.
// एक कॉन्ट्रॅक्ट म्हणजे फंक्शन्स आणि डेटा (त्याची स्थिती) यांचा संग्रह. एकदा तैनात झाल्यावर, एक कॉन्ट्रॅक्ट Ethereum ब्लॉकचेनवर एका विशिष्ट पत्त्यावर राहते. अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //जेव्हा अपडेट फंक्शन कॉल केले जाते तेव्हा उत्सर्जित होते
   //स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स हे तुमच्या कॉन्ट्रॅक्टसाठी तुमच्या ॲपच्या फ्रंट-एंडला ब्लॉकचेनवर काहीतरी घडल्याचे कळवण्याचा एक मार्ग आहे, जे काही विशिष्ट इव्हेंट्ससाठी 'ऐकत' असू शकते आणि ते घडल्यावर कारवाई करू शकते.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` प्रकारचा `message` नावाचा एक स्टेट व्हेरिएबल घोषित करते.
   // स्टेट व्हेरिएबल्स असे व्हेरिएबल्स आहेत ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमस्वरूपी संग्रहित केली जातात. `public` कीवर्ड व्हेरिएबल्सला कॉन्ट्रॅक्टच्या बाहेरून प्रवेशयोग्य बनवतो आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट मूल्यामध्ये प्रवेश करण्यासाठी कॉल करू शकतात.
   string public message;

   // अनेक वर्ग-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणे, कंस्ट्रक्टर एक विशेष फंक्शन आहे जे फक्त कॉन्ट्रॅक्ट निर्मितीवर कार्यान्वित होते.
   // कंस्ट्रक्टरचा वापर कॉन्ट्रॅक्टचा डेटा सुरू करण्यासाठी केला जातो. अधिक जाणून घ्या:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग युक्तिवाद `initMessage` स्वीकारते आणि कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये मूल्य सेट करते).
      message = initMessage;
   }

   // एक सार्वजनिक फंक्शन जे स्ट्रिंग युक्तिवाद स्वीकारते आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

हे एक मूलभूत स्मार्ट कॉन्ट्रॅक्ट आहे जे निर्मितीच्या वेळी एक संदेश संग्रहित करते. `update` फंक्शनला कॉल करून ते अपडेट केले जाऊ शकते.

### पायरी 11: MetaMask आणि Alchemy ला तुमच्या प्रकल्पाशी कनेक्ट करा {#step-11-connect-metamask-alchemy-to-your-project}

आपण MetaMask वॉलेट, Alchemy खाते तयार केले आहे आणि आपले स्मार्ट कॉन्ट्रॅक्ट लिहिले आहे, आता या तिन्हीना जोडण्याची वेळ आली आहे.

तुमच्या वॉलेटमधून पाठवलेल्या प्रत्येक व्यवहारासाठी तुमच्या युनिक खाजगी की वापरून स्वाक्षरी आवश्यक असते. आमच्या प्रोग्रामला ही परवानगी देण्यासाठी, आम्ही आमची खाजगी की एका पर्यावरण फाइलमध्ये सुरक्षितपणे संग्रहित करू शकतो. आम्ही येथे Alchemy साठी एक API की देखील संग्रहित करू.

> व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, वेब3 वापरून व्यवहार पाठवण्यावरील [हे ट्युटोरियल](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) पहा.

प्रथम, तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये dotenv पॅकेज इंस्टॉल करा:

```
npm install dotenv --save
```

मग, प्रकल्पाच्या रूट डिरेक्टरीमध्ये `.env` फाइल तयार करा. तुमची MetaMask खाजगी की आणि HTTP Alchemy API URL त्यात जोडा.

तुमच्या पर्यावरण फाइलचे नाव `.env` असणे आवश्यक आहे अन्यथा ती पर्यावरण फाइल म्हणून ओळखली जाणार नाही.

त्याला `process.env` किंवा `.env-custom` किंवा दुसरे काहीही नाव देऊ नका.

- तुमची खाजगी की निर्यात करण्यासाठी [या सूचनांचे](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) पालन करा
- HTTP Alchemy API URL मिळवण्यासाठी खाली पहा

![](./get-alchemy-api-key.gif)

तुमचे `.env` असे दिसले पाहिजे:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

हे प्रत्यक्षात आपल्या कोडशी जोडण्यासाठी, आपण या व्हेरिएबल्सचा संदर्भ आपल्या `hardhat.config.js` फाईलमध्ये पायरी १३ वर देऊ.

### पायरी १२: Ethers.js इंस्टॉल करा {#step-12-install-ethersjs}

Ethers.js ही एक लायब्ररी आहे जी अधिक वापरकर्ता-अनुकूल पद्धतींसह [मानक JSON-RPC पद्धती](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) रॅप करून Ethereum शी संवाद साधणे आणि विनंत्या करणे सोपे करते.

Hardhat आम्हाला अतिरिक्त टूलिंग आणि विस्तारित कार्यक्षमतेसाठी [प्लगइन्स](https://hardhat.org/plugins/) समाकलित करण्याची परवानगी देतो. आम्ही कॉन्ट्रॅक्ट उपयोजनासाठी [Ethers प्लगइन](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) चा फायदा घेऊ.

आपल्या प्रोजेक्ट डिरेक्टरीमध्ये टाइप करा:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### पायरी 13: hardhat.config.js अपडेट करा {#step-13-update-hardhat-configjs}

आतापर्यंत आपण अनेक डिपेंडेंसी आणि प्लगइन जोडले आहेत, आता आपल्याला `hardhat.config.js` अद्यतनित करण्याची आवश्यकता आहे जेणेकरून आपल्या प्रोजेक्टला त्या सर्वांबद्दल माहिती मिळेल.

तुमचे `hardhat.config.js` याप्रमाणे दिसण्यासाठी अद्यतनित करा:

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

### पायरी 14: आमचे कॉन्ट्रॅक्ट कंपाईल करा {#step-14-compile-our-contract}

आतापर्यंत सर्व काही कार्यरत आहे याची खात्री करण्यासाठी, चला आमचा कॉन्ट्रॅक्ट संकलित करूया. `compile` कार्य हे बिल्ट-इन हार्डहॅट कार्यांपैकी एक आहे.

कमांड लाइनमधून चालवा:

```bash
npx hardhat compile
```

तुम्हाला `SPDX license identifier not provided in source file` बद्दल चेतावणी मिळू शकते, परंतु त्याबद्दल काळजी करण्याची गरज नाही — आशा आहे की इतर सर्व काही चांगले दिसेल! नसल्यास, तुम्ही नेहमी [Alchemy discord](https://discord.gg/u72VCg3) मध्ये संदेश पाठवू शकता.

### पायरी 15: आमची उपयोजन स्क्रिप्ट लिहा {#step-15-write-our-deploy-script}

आता आमचा कॉन्ट्रॅक्ट लिहिला आहे आणि आमची कॉन्फिगरेशन फाइल तयार आहे, आता आमच्या कॉन्ट्रॅक्टची उपयोजन स्क्रिप्ट लिहिण्याची वेळ आली आहे.

`scripts/` फोल्डरवर नेव्हिगेट करा आणि `deploy.js` नावाची एक नवीन फाइल तयार करा, त्यात खालील सामग्री जोडा:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // उपयोजन सुरू करा, एक प्रॉमिस परत करा जे कॉन्ट्रॅक्ट ऑब्जेक्टमध्ये निराकरण करते
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

Hardhat त्यांच्या [कॉन्ट्रॅक्ट्स ट्यूटोरियल](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) मध्ये या प्रत्येक कोड ओळी काय करते हे आश्चर्यकारकपणे स्पष्ट करते, आम्ही त्यांचे स्पष्टीकरण येथे स्वीकारले आहे.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js मधील `ContractFactory` हे नवीन स्मार्ट कॉन्ट्रॅक्ट्स तैनात करण्यासाठी वापरले जाणारे एक ॲबस्ट्रॅक्शन आहे, म्हणून येथे `HelloWorld` हे आमच्या हॅलो वर्ल्ड कॉन्ट्रॅक्टच्या उदाहरणांसाठी एक [फॅक्टरी](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) आहे. `hardhat-ethers` प्लगइन वापरताना `ContractFactory` आणि `Contract`, उदाहरणे डीफॉल्टनुसार पहिल्या स्वाक्षरीकर्त्याशी (मालक) जोडलेली असतात.

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory` वर `deploy()` कॉल केल्याने उपयोजन सुरू होईल आणि एक `Promise` परत येईल जो `Contract` ऑब्जेक्टमध्ये निराकरण करतो. हे ते ऑब्जेक्ट आहे ज्यामध्ये आमच्या प्रत्येक स्मार्ट कॉन्ट्रॅक्ट फंक्शनसाठी एक पद्धत आहे.

### पायरी १६: आपले कॉन्ट्रॅक्ट उपयोजित करा {#step-16-deploy-our-contract}

आम्ही अखेरीस आमचा स्मार्ट कॉन्ट्रॅक्ट उपयोजित करण्यास तयार आहोत! कमांड लाइनवर नेव्हिगेट करा आणि चालवा:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

तुम्हाला त्यानंतर असे काहीतरी दिसेल:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**कृपया हा पत्ता सेव्ह करा**. आम्ही ट्युटोरियलमध्ये नंतर याचा वापर करू.

जर आपण [Goerli etherscan](https://goerli.etherscan.io) वर गेलो आणि आपला कॉन्ट्रॅक्ट पत्ता शोधला तर आपण पाहू शकू की ते यशस्वीरित्या तैनात केले गेले आहे. व्यवहार असा काहीतरी दिसेल:

![](./etherscan-contract.png)

`From` पत्ता तुमच्या MetaMask खात्याच्या पत्त्याशी जुळला पाहिजे आणि `To` पत्त्यावर **कॉन्ट्रॅक्ट निर्मिती** असे लिहिलेले असेल. जर आपण व्यवहारात क्लिक केले तर आपल्याला `To` फील्डमध्ये आपला कॉन्ट्रॅक्ट पत्ता दिसेल.

![](./etherscan-transaction.png)

अभिनंदन! तुम्ही नुकतेच Ethereum टेस्टनेटवर एक स्मार्ट कॉन्ट्रॅक्ट तैनात केले आहे.

पडद्यामागे काय चालले आहे हे समजून घेण्यासाठी, चला आपल्या [Alchemy डॅशबोर्ड](https://dashboard.alchemy.com/explorer) मधील एक्सप्लोरर टॅबवर नेव्हिगेट करूया. तुमच्याकडे एकापेक्षा जास्त Alchemy ॲप्स असल्यास ॲपनुसार फिल्टर करा आणि **Hello World** निवडा.

![](./hello-world-explorer.png)

येथे तुम्हाला काही JSON-RPC पद्धती दिसतील ज्या Hardhat/Ethers ने `.deploy()` फंक्शन कॉल केल्यावर आपल्यासाठी पडद्यामागे बनवल्या आहेत. येथे दोन महत्त्वाच्या पद्धती आहेत [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), जे आमचे कॉन्ट्रॅक्ट Goerli चेनवर लिहिण्याची विनंती आहे, आणि [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), जे हॅश दिल्यावर आमच्या व्यवहाराबद्दल माहिती वाचण्याची विनंती आहे. व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, [Web3 वापरून व्यवहार पाठवण्यावरील आमचे ट्युटोरियल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) पहा.

## भाग २: तुमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधा {#part-2-interact-with-your-smart-contract}

आता आपण यशस्वीरित्या Goerli नेटवर्कवर एक स्मार्ट कॉन्ट्रॅक्ट तैनात केले आहे, चला त्याच्याशी संवाद कसा साधायचा हे शिकूया.

### एक interact.js फाइल तयार करा {#create-a-interactjs-file}

ही ती फाईल आहे जिथे आपण आपली संवाद स्क्रिप्ट लिहू. आम्ही Ethers.js लायब्ररी वापरणार आहोत जी तुम्ही आधी भाग १ मध्ये इन्स्टॉल केली होती.

`scripts/` फोल्डरमध्ये, `interact.js` नावाची नवीन फाइल तयार करा आणि खालील कोड जोडा:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### तुमची .env फाईल अपडेट करा {#update-your-env-file}

आम्ही नवीन पर्यावरण व्हेरिएबल्स वापरणार आहोत, म्हणून आम्हाला त्यांना `.env` फाइलमध्ये परिभाषित करणे आवश्यक आहे जी [आम्ही आधी तयार केली होती](#step-11-connect-metamask-&-alchemy-to-your-project).

आम्हाला आमच्या Alchemy `API_KEY` आणि `CONTRACT_ADDRESS` साठी एक परिभाषा जोडावी लागेल जिथे तुमचे स्मार्ट कॉन्ट्रॅक्ट तैनात केले होते.

तुमची `.env` फाइल अशी काहीतरी दिसली पाहिजे:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### तुमचे कॉन्ट्रॅक्ट ABI मिळवा {#grab-your-contract-ABI}

आमचे कॉन्ट्रॅक्ट [ABI (ॲप्लिकेशन बायनरी इंटरफेस)](/glossary/#abi) आमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठी इंटरफेस आहे. Hardhat आपोआप एक ABI तयार करतो आणि ते `HelloWorld.json` मध्ये सेव्ह करतो. ABI वापरण्यासाठी, आम्हाला आमच्या `interact.js` फाइलमध्ये खालील कोडच्या ओळी जोडून सामग्री पार्स करणे आवश्यक आहे:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

जर तुम्हाला ABI पाहायचा असेल तर तुम्ही ते तुमच्या कन्सोलवर प्रिंट करू शकता:

```javascript
console.log(JSON.stringify(contract.abi))
```

तुमचे ABI कन्सोलवर छापलेले पाहण्यासाठी, तुमच्या टर्मिनलवर नेव्हिगेट करा आणि चालवा:

```bash
npx hardhat run scripts/interact.js
```

### तुमच्या कॉन्ट्रॅक्टचे एक उदाहरण तयार करा {#create-an-instance-of-your-contract}

आमच्या कॉन्ट्रॅक्टशी संवाद साधण्यासाठी, आम्हाला आमच्या कोडमध्ये एक कॉन्ट्रॅक्ट उदाहरण तयार करणे आवश्यक आहे. Ethers.js सह असे करण्यासाठी, आम्हाला तीन संकल्पनांवर काम करावे लागेल:

1. प्रदाता - एक नोड प्रदाता जो तुम्हाला ब्लॉकचेनवर वाचण्याचा आणि लिहिण्याचा प्रवेश देतो
2. स्वाक्षरीकर्ता - एक Ethereum खाते जे व्यवहारांवर स्वाक्षरी करू शकते
3. कॉन्ट्रॅक्ट - ऑनचेन तैनात केलेल्या विशिष्ट कॉन्ट्रॅक्टचे प्रतिनिधित्व करणारा एक Ethers.js ऑब्जेक्ट

आम्ही कॉन्ट्रॅक्टचे उदाहरण तयार करण्यासाठी मागील पायरीमधील कॉन्ट्रॅक्ट ABI वापरू:

```javascript
// interact.js

// प्रदाता
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// स्वाक्षरीकर्ता
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// कॉन्ट्रॅक्ट
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

[ethers.js माहिती](https://docs.ethers.io/v5/) मध्ये प्रदाते, स्वाक्षरीकर्ते आणि कॉन्ट्रॅक्ट्सबद्दल अधिक जाणून घ्या.

### आरंभिक संदेश वाचा {#read-the-init-message}

लक्षात आहे का आपण आपले कॉन्ट्रॅक्ट `initMessage = "Hello world!"` सह तैनात केले होते? आम्ही आता आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला तो संदेश वाचणार आहोत आणि तो कन्सोलवर प्रिंट करणार आहोत.

जावास्क्रिप्टमध्ये, नेटवर्कशी संवाद साधताना असिंक्रोनस फंक्शन्स वापरली जातात. असिंक्रोनस फंक्शन्सबद्दल अधिक जाणून घेण्यासाठी, [हा मीडियम लेख](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff) वाचा.

आमच्या स्मार्ट कॉन्ट्रॅक्टमधील `message` फंक्शनला कॉल करण्यासाठी आणि आरंभिक संदेश वाचण्यासाठी खालील कोड वापरा:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

टर्मिनलमध्ये `npx hardhat run scripts/interact.js` वापरून फाइल चालवल्यानंतर आम्हाला हा प्रतिसाद दिसला पाहिजे:

```
The message is: Hello world!
```

अभिनंदन! तुम्ही नुकतेच Ethereum ब्लॉकचेनवरून स्मार्ट कॉन्ट्रॅक्ट डेटा यशस्वीरित्या वाचला आहे, छान काम!

### संदेश अपडेट करा {#update-the-message}

फक्त संदेश वाचण्याऐवजी, आम्ही `update` फंक्शन वापरून आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये सेव्ह केलेला संदेश देखील अपडेट करू शकतो! छान आहे, नाही का?

संदेश अपडेट करण्यासाठी, आम्ही थेट आमच्या इन्स्टँटिएटेड कॉन्ट्रॅक्ट ऑब्जेक्टवर `update` फंक्शन कॉल करू शकतो:

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

लक्षात घ्या की ओळ ११ वर, आम्ही परत आलेल्या व्यवहार ऑब्जेक्टवर `.wait()` ला कॉल करतो. हे सुनिश्चित करते की आमची स्क्रिप्ट फंक्शनमधून बाहेर पडण्यापूर्वी ब्लॉकचेनवर व्यवहार माइन होण्याची वाट पाहते. जर `.wait()` कॉल समाविष्ट नसेल, तर स्क्रिप्टला कॉन्ट्रॅक्टमधील अपडेट केलेले `message` मूल्य दिसणार नाही.

### नवीन संदेश वाचा {#read-the-new-message}

अपडेट केलेले `message` मूल्य वाचण्यासाठी तुम्ही [मागील पायरी](#read-the-init-message) पुन्हा करू शकाल. थोडा वेळ घ्या आणि बघा की तुम्ही ते नवीन मूल्य प्रिंट करण्यासाठी आवश्यक बदल करू शकता का!

तुम्हाला इशारा हवा असल्यास, तुमची `interact.js` फाइल या टप्प्यावर कशी दिसली पाहिजे ते येथे आहे:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// प्रदाता - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// स्वाक्षरीकर्ता - तुम्ही
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// कॉन्ट्रॅक्ट उदाहरण
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

आता फक्त स्क्रिप्ट चालवा आणि तुम्हाला जुना संदेश, अपडेटिंग स्थिती आणि नवीन संदेश तुमच्या टर्मिनलवर छापलेला दिसेल!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

ती स्क्रिप्ट चालवताना, तुम्हाला कदाचित लक्षात येईल की नवीन संदेश लोड होण्यापूर्वी `Updating the message...` पायरी लोड होण्यास थोडा वेळ लागतो. हे मायनिंग प्रक्रियेमुळे आहे; जर तुम्हाला व्यवहार माइन होत असताना त्यांचा मागोवा घेण्यास उत्सुकता असेल, तर व्यवहाराची स्थिती पाहण्यासाठी [Alchemy मेमपूल](https://dashboard.alchemyapi.io/mempool) ला भेट द्या. जर व्यवहार ड्रॉप झाला, तर [Goerli Etherscan](https://goerli.etherscan.io) तपासणे आणि तुमच्या व्यवहार हॅशसाठी शोधणे देखील उपयुक्त आहे.

## भाग ३: तुमचे स्मार्ट कॉन्ट्रॅक्ट Etherscan वर प्रकाशित करा {#part-3-publish-your-smart-contract-to-etherscan}

तुम्ही तुमच्या स्मार्ट कॉन्ट्रॅक्टला जीवदान देण्यासाठी सर्व कठोर परिश्रम केले; आता ते जगासोबत शेअर करण्याची वेळ आली आहे!

Etherscan वर तुमचे स्मार्ट कॉन्ट्रॅक्ट सत्यापित करून, कोणीही तुमचा सोर्स कोड पाहू शकतो आणि तुमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधू शकतो. चला सुरू करूया!

### पायरी १: तुमच्या Etherscan खात्यावर एक API की तयार करा {#step-1-generate-an-api-key-on-your-etherscan-account}

तुम्ही जे स्मार्ट कॉन्ट्रॅक्ट प्रकाशित करण्याचा प्रयत्न करत आहात त्याचे तुम्ही मालक आहात हे सत्यापित करण्यासाठी Etherscan API की आवश्यक आहे.

तुमच्याकडे आधीपासून Etherscan खाते नसल्यास, [खात्यासाठी साइन अप करा](https://etherscan.io/register).

एकदा लॉग इन केल्यावर, नेव्हिगेशन बारमध्ये तुमचे वापरकर्तानाव शोधा, त्यावर होव्हर करा आणि **माझे प्रोफाइल** बटण निवडा.

तुमच्या प्रोफाइल पेजवर, तुम्हाला एक साइड नेव्हिगेशन बार दिसेल. साइड नेव्हिगेशन बारमधून, **API की** निवडा. पुढे, नवीन API की तयार करण्यासाठी "जोडा" बटण दाबा, तुमच्या ॲपला **hello-world** नाव द्या आणि **नवीन API की तयार करा** बटण दाबा.

तुमची नवीन API की API की टेबलमध्ये दिसेल. API की तुमच्या क्लिपबोर्डवर कॉपी करा.

पुढे, आम्हाला आमच्या `.env` फाइलमध्ये Etherscan API की जोडण्याची आवश्यकता आहे.

ते जोडल्यानंतर, तुमची `.env` फाइल अशी दिसेल:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat-तैनात स्मार्ट कॉन्ट्रॅक्ट {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan इन्स्टॉल करा {#install-hardhat-etherscan}

Hardhat वापरून तुमचे कॉन्ट्रॅक्ट Etherscan वर प्रकाशित करणे सोपे आहे. सुरुवात करण्यासाठी तुम्हाला प्रथम `hardhat-etherscan` प्लगइन इन्स्टॉल करावे लागेल. `hardhat-etherscan` आपोआप स्मार्ट कॉन्ट्रॅक्टचा सोर्स कोड आणि ABI Etherscan वर सत्यापित करेल. हे जोडण्यासाठी, `hello-world` डिरेक्टरीमध्ये चालवा:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

एकदा इन्स्टॉल झाल्यावर, तुमच्या `hardhat.config.js` च्या शीर्षस्थानी खालील विधान समाविष्ट करा, आणि Etherscan कॉन्फिग पर्याय जोडा:

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
    // https://etherscan.io/ वर एक मिळवा
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan वर तुमचे स्मार्ट कॉन्ट्रॅक्ट सत्यापित करा {#verify-your-smart-contract-on-etherscan}

सर्व फायली सेव्ह झाल्या आहेत आणि सर्व `.env` व्हेरिएबल्स योग्यरित्या कॉन्फिगर केले आहेत याची खात्री करा.

`verify` टास्क चालवा, कॉन्ट्रॅक्ट पत्ता आणि ज्या नेटवर्कवर ते तैनात आहे ते पास करा:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

खात्री करा की `DEPLOYED_CONTRACT_ADDRESS` हे Goerli टेस्ट नेटवर्कवर तुमच्या तैनात केलेल्या स्मार्ट कॉन्ट्रॅक्टचा पत्ता आहे. तसेच, अंतिम युक्तिवाद (`'Hello World!'`) हा भाग १ मधील [तैनाती पायरी दरम्यान](#write-our-deploy-script) वापरलेल्या समान स्ट्रिंग मूल्याचा असावा.

जर सर्व काही ठीक झाले, तर तुम्हाला तुमच्या टर्मिनलमध्ये खालील संदेश दिसेल:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

अभिनंदन! तुमचा स्मार्ट कॉन्ट्रॅक्ट कोड Etherscan वर आहे!

### Etherscan वर तुमचे स्मार्ट कॉन्ट्रॅक्ट तपासा! {#check-out-your-smart-contract-on-etherscan}

जेव्हा तुम्ही तुमच्या टर्मिनलमध्ये दिलेल्या लिंकवर नेव्हिगेट करता, तेव्हा तुम्हाला तुमचा स्मार्ट कॉन्ट्रॅक्ट कोड आणि ABI Etherscan वर प्रकाशित केलेला दिसेल!

**व्वा - तुम्ही ते केले चॅम्प! आता कोणीही तुमच्या स्मार्ट कॉन्ट्रॅक्टला कॉल किंवा लिहू शकतो! तुम्ही पुढे काय तयार करता हे पाहण्यासाठी आम्ही उत्सुक आहोत!**

## भाग ४ - तुमचे स्मार्ट कॉन्ट्रॅक्ट फ्रंटएंडसह एकत्रित करणे {#part-4-integrating-your-smart-contract-with-the-frontend}

या ट्युटोरियलच्या अखेरीस, तुम्हाला कळेल की कसे:

- तुमच्या डॅपला MetaMask वॉलेट कनेक्ट करा
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API वापरून तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून डेटा वाचा
- MetaMask वापरून Ethereum व्यवहारांवर स्वाक्षरी करा

या डॅपसाठी, आम्ही आमच्या फ्रंटएंड फ्रेमवर्क म्हणून [React](https://react.dev/) वापरणार आहोत; तथापि, हे लक्षात घेणे महत्त्वाचे आहे की आम्ही त्याच्या मूलभूत गोष्टींचे विश्लेषण करण्यात जास्त वेळ घालवणार नाही, कारण आम्ही मुख्यतः आमच्या प्रकल्पात Web3 कार्यक्षमता आणण्यावर लक्ष केंद्रित करणार आहोत.

एक पूर्वअट म्हणून, तुम्हाला React चे नवशिक्या-स्तराचे ज्ञान असले पाहिजे. नसल्यास, आम्ही अधिकृत [React चा परिचय ट्युटोरियल](https://react.dev/learn) पूर्ण करण्याची शिफारस करतो.

### स्टार्टर फाइल्स क्लोन करा {#clone-the-starter-files}

प्रथम, या प्रकल्पासाठी स्टार्टर फायली मिळवण्यासाठी [hello-world-part-four GitHub रेपॉजिटरी](https://github.com/alchemyplatform/hello-world-part-four-tutorial) वर जा आणि ही रेपॉजिटरी तुमच्या स्थानिक मशीनवर क्लोन करा.

क्लोन केलेली रेपॉजिटरी स्थानिकरित्या उघडा. लक्षात घ्या की त्यात दोन फोल्डर आहेत: `starter-files` आणि `completed`.

- `starter-files`- **आम्ही या डिरेक्टरीमध्ये काम करणार आहोत**, आम्ही UI ला तुमच्या Ethereum वॉलेटशी आणि आम्ही [भाग ३](#part-3) मध्ये Etherscan वर प्रकाशित केलेल्या स्मार्ट कॉन्ट्रॅक्टशी कनेक्ट करू.
- `completed` मध्ये संपूर्ण पूर्ण ट्युटोरियल आहे आणि तुम्ही अडकल्यास केवळ संदर्भ म्हणून वापरले पाहिजे.

पुढे, तुमची `starter-files` ची प्रत तुमच्या आवडत्या कोड एडिटरमध्ये उघडा आणि नंतर `src` फोल्डरमध्ये नेव्हिगेट करा.

आपण लिहिणार असलेला सर्व कोड `src` फोल्डरखाली असेल. आमच्या प्रकल्पाला Web3 कार्यक्षमता देण्यासाठी आम्ही `HelloWorld.js` घटक आणि `util/interact.js` जावास्क्रिप्ट फायली संपादित करणार आहोत.

### स्टार्टर फायली तपासा {#check-out-the-starter-files}

आम्ही कोडिंग सुरू करण्यापूर्वी, चला स्टार्टर फायलींमध्ये आम्हाला काय प्रदान केले आहे ते पाहूया.

#### तुमचा react प्रोजेक्ट चालू करा {#get-your-react-project-running}

चला आपल्या ब्राउझरमध्ये React प्रोजेक्ट चालवून सुरुवात करूया. React चे सौंदर्य हे आहे की एकदा आपला प्रोजेक्ट आपल्या ब्राउझरमध्ये चालू झाला की, आपण केलेले कोणतेही बदल आपल्या ब्राउझरमध्ये थेट अपडेट केले जातील.

प्रकल्प चालू करण्यासाठी, `starter-files` फोल्डरच्या रूट डिरेक्टरीवर नेव्हिगेट करा, आणि प्रकल्पाच्या अवलंबित्वे स्थापित करण्यासाठी तुमच्या टर्मिनलमध्ये `npm install` चालवा:

```bash
cd starter-files
npm install
```

एकदा ते इन्स्टॉल झाल्यावर, तुमच्या टर्मिनलमध्ये `npm start` चालवा:

```bash
npm start
```

असे केल्याने तुमच्या ब्राउझरमध्ये [http://localhost:3000/](http://localhost:3000/) उघडले पाहिजे, जिथे तुम्हाला आमच्या प्रकल्पासाठी फ्रंटएंड दिसेल. त्यात एक फील्ड (तुमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश अपडेट करण्यासाठी एक जागा), एक "वॉलेट कनेक्ट करा" बटण आणि एक "अपडेट करा" बटण असले पाहिजे.

तुम्ही कोणतेही बटण क्लिक करण्याचा प्रयत्न केल्यास, तुम्हाला लक्षात येईल की ते कार्य करत नाहीत—कारण आम्हाला अजूनही त्यांची कार्यक्षमता प्रोग्राम करायची आहे.

#### `HelloWorld.js` घटक {#the-helloworld-js-component}

चला आमच्या एडिटरमधील `src` फोल्डरमध्ये परत जाऊया आणि `HelloWorld.js` फाइल उघडूया. या फाईलमधील सर्व काही समजून घेणे खूप महत्त्वाचे आहे, कारण हा प्राथमिक React घटक आहे ज्यावर आपण काम करणार आहोत.

या फाइलच्या शीर्षस्थानी, तुम्हाला दिसेल की आमच्याकडे अनेक आयात विधाने आहेत जी आमचा प्रकल्प चालू करण्यासाठी आवश्यक आहेत, ज्यात React लायब्ररी, useEffect आणि useState हुक्स, `./util/interact.js` मधील काही आयटम (आम्ही त्यांना लवकरच अधिक तपशीलवार वर्णन करू!) आणि Alchemy लोगो समाविष्ट आहेत.

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

पुढे, आमच्याकडे आमचे स्टेट व्हेरिएबल्स आहेत जे आम्ही विशिष्ट इव्हेंटनंतर अपडेट करू.

```javascript
// HelloWorld.js

//स्टेट व्हेरिएबल्स
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("नेटवर्कशी कोणतेही कनेक्शन नाही.")
const [newMessage, setNewMessage] = useState("")
```

प्रत्येक व्हेरिएबल काय दर्शवते ते येथे आहे:

- `walletAddress` - वापरकर्त्याचा वॉलेट ॲड्रेस साठवणारी एक स्ट्रिंग
- `status`- एक स्ट्रिंग जी वापरकर्त्याला डॅपशी कसे संवाद साधावा याबद्दल मार्गदर्शन करणारा उपयुक्त संदेश संग्रहित करते
- `message` - एक स्ट्रिंग जी स्मार्ट कॉन्ट्रॅक्टमधील सध्याचा संदेश संग्रहित करते
- `newMessage` - एक स्ट्रिंग जी स्मार्ट कॉन्ट्रॅक्टमध्ये लिहिला जाणारा नवीन संदेश संग्रहित करते

स्टेट व्हेरिएबल्सनंतर, तुम्हाला पाच अंमलबजावणी न केलेली फंक्शन्स दिसतील: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed`, आणि `onUpdatePressed`. ते काय करतात ते आम्ही खाली स्पष्ट करू:

```javascript
// HelloWorld.js

//केवळ एकदाच कॉल केले जाते
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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- हा एक React हुक आहे जो तुमचा घटक प्रस्तुत झाल्यानंतर कॉल केला जातो. कारण त्यात एक रिकामा ॲरे `[]` प्रॉप पास केला आहे (ओळ ४ पहा), तो फक्त घटकाच्या _पहिल्या_ रेंडरवर कॉल केला जाईल. येथे आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला सध्याचा संदेश लोड करू, आमचे स्मार्ट कॉन्ट्रॅक्ट आणि वॉलेट श्रोत्यांना कॉल करू, आणि वॉलेट आधीच कनेक्ट केलेले आहे की नाही हे दर्शविण्यासाठी आमचे UI अपडेट करू.
- `addSmartContractListener`- हे फंक्शन एक श्रोता सेट करते जो आमच्या HelloWorld कॉन्ट्रॅक्टच्या `UpdatedMessages` इव्हेंटवर लक्ष ठेवेल आणि आमच्या स्मार्ट कॉन्ट्रॅक्टमधील संदेश बदलल्यावर आमचे UI अपडेट करेल.
- `addWalletListener`- हे फंक्शन एक श्रोता सेट करते जो वापरकर्त्याच्या MetaMask वॉलेटच्या स्थितीत बदल ओळखतो, जसे की वापरकर्ता त्यांचे वॉलेट डिस्कनेक्ट करतो किंवा पत्ते बदलतो.
- `connectWalletPressed`- हे फंक्शन वापरकर्त्याचे MetaMask वॉलेट आमच्या डॅपशी कनेक्ट करण्यासाठी कॉल केले जाईल.
- `onUpdatePressed` - हे फंक्शन तेव्हा कॉल केले जाईल जेव्हा वापरकर्त्याला स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश अपडेट करायचा असेल.

या फाइलच्या शेवटी, आमच्याकडे आमच्या घटकाचा UI आहे.

```javascript
// HelloWorld.js

//आमच्या घटकाचे UI
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

तुम्ही हा कोड काळजीपूर्वक स्कॅन केल्यास, तुम्हाला दिसेल की आम्ही आमच्या UI मध्ये आमचे विविध स्टेट व्हेरिएबल्स कुठे वापरतो:

- ओळी ६-१२ वर, जर वापरकर्त्याचे वॉलेट कनेक्ट केलेले असेल (म्हणजे, `walletAddress.length > 0`), तर आम्ही "walletButton" आयडी असलेल्या बटणामध्ये वापरकर्त्याच्या `walletAddress` ची एक संक्षिप्त आवृत्ती प्रदर्शित करतो; अन्यथा ते फक्त "वॉलेट कनेक्ट करा" असे म्हणते.
- ओळ १७ वर, आम्ही स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला सध्याचा संदेश प्रदर्शित करतो, जो `message` स्ट्रिंगमध्ये कॅप्चर केला जातो.
- ओळी २३-२६ वर, टेक्स्ट फील्डमधील इनपुट बदलल्यावर आमचे `newMessage` स्टेट व्हेरिएबल अपडेट करण्यासाठी आम्ही [नियंत्रित घटक](https://legacy.reactjs.org/docs/forms.html#controlled-components) वापरतो.

आमच्या स्टेट व्हेरिएबल्स व्यतिरिक्त, तुम्हाला दिसेल की `publishButton` आणि `walletButton` आयडी असलेली बटणे क्लिक केल्यावर अनुक्रमे `connectWalletPressed` आणि `onUpdatePressed` फंक्शन्स कॉल केली जातात.

शेवटी, चला पाहूया की हा `HelloWorld.js` घटक कुठे जोडला आहे.

तुम्ही `App.js` फाइलवर गेल्यास, जी React मधील मुख्य घटक आहे जी इतर सर्व घटकांसाठी कंटेनर म्हणून काम करते, तुम्हाला दिसेल की आमचा `HelloWorld.js` घटक ओळ ७ वर इंजेक्ट केला आहे.

शेवटचे पण महत्त्वाचे, चला तुमच्यासाठी प्रदान केलेली आणखी एक फाइल पाहूया, `interact.js` फाइल.

#### `interact.js` फाइल {#the-interact-js-file}

कारण आम्हाला [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) पॅराडाइमचे पालन करायचे आहे, आम्हाला एक वेगळी फाइल हवी आहे ज्यात आमच्या डॅपच्या तर्कशास्त्र, डेटा आणि नियमांचे व्यवस्थापन करण्यासाठी आमची सर्व फंक्शन्स असतील, आणि नंतर ती फंक्शन्स आमच्या फ्रंटएंडवर (आमचा `HelloWorld.js` घटक) निर्यात करता येतील.

👆🏽हाच आमच्या `interact.js` फाइलचा नेमका उद्देश आहे!

तुमच्या `src` डिरेक्टरीमधील `util` फोल्डरवर नेव्हिगेट करा, आणि तुम्हाला दिसेल की आम्ही `interact.js` नावाची फाइल समाविष्ट केली आहे ज्यात आमची सर्व स्मार्ट कॉन्ट्रॅक्ट संवाद आणि वॉलेट फंक्शन्स आणि व्हेरिएबल्स असतील.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

तुम्हाला फाइलच्या शीर्षस्थानी दिसेल की आम्ही `helloWorldContract` ऑब्जेक्टवर टिप्पणी केली आहे. नंतर या ट्युटोरियलमध्ये, आम्ही या ऑब्जेक्टवरील टिप्पणी काढून टाकू आणि या व्हेरिएबलमध्ये आमचे स्मार्ट कॉन्ट्रॅक्ट इन्स्टँटिएट करू, जे आम्ही नंतर आमच्या `HelloWorld.js` घटकामध्ये निर्यात करू.

आमच्या `helloWorldContract` ऑब्जेक्टनंतरची चार अंमलबजावणी न केलेली फंक्शन्स खालीलप्रमाणे करतात:

- `loadCurrentMessage` - हे फंक्शन स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला सध्याचा संदेश लोड करण्याच्या तर्कशास्त्राचे व्यवस्थापन करते. ते [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) वापरून हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्टला _वाचण्याचा_ कॉल करेल.
- `connectWallet` - हे फंक्शन वापरकर्त्याचे MetaMask आमच्या डॅपशी कनेक्ट करेल.
- `getCurrentWalletConnected` - हे फंक्शन तपासेल की Ethereum खाते आधीपासूनच आमच्या डॅपशी पेज लोडवर कनेक्ट केलेले आहे की नाही आणि त्यानुसार आमचे UI अपडेट करेल.
- `updateMessage` - हे फंक्शन स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश अपडेट करेल. हे हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्टला _लिहिण्याचा_ कॉल करेल, त्यामुळे वापरकर्त्याच्या MetaMask वॉलेटला संदेश अपडेट करण्यासाठी Ethereum व्यवहारावर स्वाक्षरी करावी लागेल.

आता आम्हाला समजले आहे की आम्ही कशावर काम करत आहोत, चला पाहूया की आमच्या स्मार्ट कॉन्ट्रॅक्टमधून कसे वाचायचे!

### पायरी ३: तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचा {#step-3-read-from-your-smart-contract}

तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचण्यासाठी, तुम्हाला यशस्वीरित्या सेट अप करावे लागेल:

- Ethereum चेनशी एक API कनेक्शन
- तुमच्या स्मार्ट कॉन्ट्रॅक्टचे एक लोड केलेले उदाहरण
- तुमच्या स्मार्ट कॉन्ट्रॅक्ट फंक्शनला कॉल करण्यासाठी एक फंक्शन
- तुम्ही स्मार्ट कॉन्ट्रॅक्टमधून वाचत असलेल्या डेटामध्ये बदल झाल्यावर अपडेट्ससाठी पाहण्यासाठी एक श्रोता

हे खूप पायऱ्या वाटू शकतात, पण काळजी करू नका! आम्ही तुम्हाला त्या प्रत्येक पायरीतून कसे जायचे हे टप्प्याटप्प्याने सांगू! :\)

#### Ethereum चेनशी एक API कनेक्शन स्थापित करा {#establish-an-api-connection-to-the-ethereum-chain}

तर लक्षात आहे का, या ट्युटोरियलच्या भाग २ मध्ये, आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचण्यासाठी आमची [Alchemy Web3 की वापरली होती](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? तुमच्या डॅपमध्ये चेनवरून वाचण्यासाठी तुम्हाला Alchemy Web3 की ची देखील आवश्यकता असेल.

तुमच्याकडे आधीपासून नसल्यास, प्रथम [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) इन्स्टॉल करा, तुमच्या `starter-files` च्या रूट डिरेक्टरीवर नेव्हिगेट करून आणि तुमच्या टर्मिनलमध्ये खालील चालवून:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) हे [Web3.js](https://docs.web3js.org/) च्या सभोवतालचे एक रॅपर आहे, जे एक वेब3 डेव्हलपर म्हणून तुमचे जीवन सोपे करण्यासाठी वर्धित API पद्धती आणि इतर महत्त्वपूर्ण फायदे प्रदान करते. हे कमीत कमी कॉन्फिगरेशन आवश्यक करण्यासाठी डिझाइन केलेले आहे जेणेकरून आपण आपल्या ॲपमध्ये लगेचच त्याचा वापर सुरू करू शकता!

मग, तुमच्या प्रकल्प डिरेक्टरीमध्ये [dotenv](https://www.npmjs.com/package/dotenv) पॅकेज इन्स्टॉल करा, जेणेकरून आम्ही आमची API की मिळवल्यानंतर ती संग्रहित करण्यासाठी आमच्याकडे एक सुरक्षित जागा असेल.

```text
npm install dotenv --save
```

आमच्या डॅपसाठी, **आम्ही आमची HTTP API की ऐवजी आमची Websockets API की वापरणार आहोत**, कारण ते आम्हाला एक श्रोता सेट करण्याची परवानगी देईल जो स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश बदलल्यावर ओळखतो.

एकदा तुमच्याकडे तुमची API की आल्यावर, तुमच्या रूट डिरेक्टरीमध्ये `.env` फाइल तयार करा आणि त्यात तुमची Alchemy Websockets url जोडा. त्यानंतर, तुमची `.env` फाइल अशी दिसेल:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

आता, आम्ही आमच्या डॅपमध्ये आमचा Alchemy Web3 एंडपॉइंट सेट करण्यासाठी तयार आहोत! चला आमच्या `util` फोल्डरमध्ये असलेल्या आमच्या `interact.js` फाइलवर परत जाऊया आणि फाइलच्या शीर्षस्थानी खालील कोड जोडूया:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

वर, आम्ही प्रथम आमच्या `.env` फाइलमधून Alchemy की आयात केली आणि नंतर आमचा Alchemy Web3 एंडपॉइंट स्थापित करण्यासाठी आमची `alchemyKey` `createAlchemyWeb3` ला पास केली.

हा एंडपॉइंट तयार झाल्यावर, आमचे स्मार्ट कॉन्ट्रॅक्ट लोड करण्याची वेळ आली आहे!

#### तुमचे हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट लोड करत आहे {#loading-your-hello-world-smart-contract}

तुमचे हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट लोड करण्यासाठी, तुम्हाला त्याचा कॉन्ट्रॅक्ट पत्ता आणि ABI आवश्यक असेल, जे दोन्ही Etherscan वर आढळू शकतात जर तुम्ही [या ट्युटोरियलचा भाग ३ पूर्ण केला असेल.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Etherscan वरून तुमचे कॉन्ट्रॅक्ट ABI कसे मिळवायचे {#how-to-get-your-contract-abi-from-etherscan}

तुम्ही या ट्युटोरियलचा भाग ३ वगळल्यास, तुम्ही [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) पत्त्यासह HelloWorld कॉन्ट्रॅक्ट वापरू शकता. त्याचे ABI [येथे](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) आढळू शकते.

एक कॉन्ट्रॅक्ट ABI हे निर्दिष्ट करण्यासाठी आवश्यक आहे की कॉन्ट्रॅक्ट कोणते फंक्शन कॉल करेल तसेच फंक्शन तुमच्या अपेक्षित स्वरूपात डेटा परत करेल याची खात्री करण्यासाठी. एकदा आम्ही आमचे कॉन्ट्रॅक्ट ABI कॉपी केल्यावर, चला ते तुमच्या `src` डिरेक्टरीमध्ये `contract-abi.json` नावाची JSON फाइल म्हणून सेव्ह करूया.

तुमची contract-abi.json तुमच्या src फोल्डरमध्ये संग्रहित केली पाहिजे.

आमच्या कॉन्ट्रॅक्ट पत्ता, ABI, आणि Alchemy Web3 एंडपॉइंटसह सज्ज, आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टचे एक उदाहरण लोड करण्यासाठी [कॉन्ट्रॅक्ट पद्धत](https://docs.web3js.org/api/web3-eth-contract/class/Contract) वापरू शकतो. तुमचे कॉन्ट्रॅक्ट ABI `interact.js` फाइलमध्ये आयात करा आणि तुमचा कॉन्ट्रॅक्ट पत्ता जोडा.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

आम्ही आता अखेरीस आमच्या `helloWorldContract` व्हेरिएबलवरील टिप्पणी काढून टाकू शकतो, आणि आमचा AlchemyWeb3 एंडपॉइंट वापरून स्मार्ट कॉन्ट्रॅक्ट लोड करू शकतो:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

रिकॅप करण्यासाठी, तुमच्या `interact.js` च्या पहिल्या १२ ओळी आता अशा दिसल्या पाहिजेत:

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

आता आमचे कॉन्ट्रॅक्ट लोड झाले आहे, आम्ही आमचे `loadCurrentMessage` फंक्शन अंमलात आणू शकतो!

#### तुमच्या `interact.js` फाइलमध्ये `loadCurrentMessage` अंमलात आणणे {#implementing-loadCurrentMessage-in-your-interact-js-file}

हे फंक्शन खूप सोपे आहे. आम्ही आमच्या कॉन्ट्रॅक्टमधून वाचण्यासाठी एक साधा असिंक वेब3 कॉल करणार आहोत. आमचे फंक्शन स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश परत करेल:

तुमच्या `interact.js` फाइलमधील `loadCurrentMessage` खालीलप्रमाणे अपडेट करा:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

आम्हाला हा स्मार्ट कॉन्ट्रॅक्ट आमच्या UI मध्ये प्रदर्शित करायचा असल्याने, चला आमच्या `HelloWorld.js` घटकामधील `useEffect` फंक्शन खालीलप्रमाणे अपडेट करूया:

```javascript
// HelloWorld.js

//केवळ एकदाच कॉल केले जाते
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

लक्षात घ्या, आम्हाला आमचे `loadCurrentMessage` फक्त घटकाच्या पहिल्या रेंडर दरम्यान एकदाच कॉल करायचे आहे. स्मार्ट कॉन्ट्रॅक्टमधील संदेश बदलल्यानंतर UI आपोआप अपडेट करण्यासाठी आम्ही लवकरच `addSmartContractListener` अंमलात आणू.

आमच्या श्रोत्यामध्ये जाण्यापूर्वी, चला पाहूया की आतापर्यंत आमच्याकडे काय आहे! तुमच्या `HelloWorld.js` आणि `interact.js` फायली सेव्ह करा, आणि नंतर [http://localhost:3000/](http://localhost:3000/) वर जा

तुम्हाला दिसेल की सध्याचा संदेश आता "नेटवर्कशी कोणतेही कनेक्शन नाही" असे म्हणत नाही. त्याऐवजी ते स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश दर्शवते. छान!

#### तुमचे UI आता स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश दर्शवला पाहिजे {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

आता त्या श्रोत्याबद्दल बोलूया...

#### `addSmartContractListener` अंमलात आणा {#implement-addsmartcontractlistener}

जर तुम्ही या ट्युटोरियल मालिकेच्या [भाग १](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) मध्ये लिहिलेली `HelloWorld.sol` फाइल आठवत असाल, तर तुम्हाला आठवेल की `UpdatedMessages` नावाचा एक स्मार्ट कॉन्ट्रॅक्ट इव्हेंट आहे जो आमच्या स्मार्ट कॉन्ट्रॅक्टच्या `update` फंक्शनला कॉल केल्यानंतर उत्सर्जित होतो (ओळी ९ आणि २७ पहा):

```javascript
// HelloWorld.sol

// सिमेंटिक व्हर्जनिंग वापरून, Solidity ची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` नावाचे एक कॉन्ट्रॅक्ट परिभाषित करते.
// एक कॉन्ट्रॅक्ट म्हणजे फंक्शन्स आणि डेटा (त्याची स्थिती) यांचा संग्रह. एकदा तैनात झाल्यावर, एक कॉन्ट्रॅक्ट Ethereum ब्लॉकचेनवर एका विशिष्ट पत्त्यावर राहते. अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //जेव्हा अपडेट फंक्शन कॉल केले जाते तेव्हा उत्सर्जित होते
   //स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स हे तुमच्या कॉन्ट्रॅक्टसाठी तुमच्या ॲपच्या फ्रंट-एंडला ब्लॉकचेनवर काहीतरी घडल्याचे कळवण्याचा एक मार्ग आहे, जे काही विशिष्ट इव्हेंट्ससाठी 'ऐकत' असू शकते आणि ते घडल्यावर कारवाई करू शकते.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` प्रकारचा `message` नावाचा एक स्टेट व्हेरिएबल घोषित करते.
   // स्टेट व्हेरिएबल्स असे व्हेरिएबल्स आहेत ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमस्वरूपी संग्रहित केली जातात. `public` कीवर्ड व्हेरिएबल्सला कॉन्ट्रॅक्टच्या बाहेरून प्रवेशयोग्य बनवतो आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट मूल्यामध्ये प्रवेश करण्यासाठी कॉल करू शकतात.
   string public message;

   // अनेक वर्ग-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणे, कंस्ट्रक्टर एक विशेष फंक्शन आहे जे फक्त कॉन्ट्रॅक्ट निर्मितीवर कार्यान्वित होते.
   // कंस्ट्रक्टरचा वापर कॉन्ट्रॅक्टचा डेटा सुरू करण्यासाठी केला जातो. अधिक जाणून घ्या:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग युक्तिवाद `initMessage` स्वीकारते आणि कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये मूल्य सेट करते).
      message = initMessage;
   }

   // एक सार्वजनिक फंक्शन जे स्ट्रिंग युक्तिवाद स्वीकारते आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स हे तुमच्या कॉन्ट्रॅक्टसाठी तुमच्या फ्रंट-एंड ॲप्लिकेशनला ब्लॉकचेनवर काहीतरी घडल्याचे (म्हणजे, एक _इव्हेंट_ होता) कळवण्याचा एक मार्ग आहे, जे विशिष्ट इव्हेंटसाठी 'ऐकत' असू शकते आणि ते घडल्यावर कारवाई करू शकते.

`addSmartContractListener` फंक्शन विशेषतः आमच्या हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्टच्या `UpdatedMessages` इव्हेंटसाठी ऐकेल, आणि नवीन संदेश प्रदर्शित करण्यासाठी आमचे UI अपडेट करेल.

`addSmartContractListener` खालीलप्रमाणे सुधारित करा:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 तुमचा संदेश अपडेट झाला आहे!")
    }
  })
}
```

चला पाहूया की श्रोता इव्हेंट ओळखल्यावर काय होते:

- इव्हेंट उत्सर्जित झाल्यावर त्रुटी आढळल्यास, ते आमच्या `status` स्टेट व्हेरिएबलद्वारे UI मध्ये दिसेल.
- अन्यथा, आम्ही परत आलेला `data` ऑब्जेक्ट वापरू. `data.returnValues` हा एक ॲरे आहे जो शून्यावर अनुक्रमित आहे जिथे ॲरेमधील पहिला घटक मागील संदेश आणि दुसरा घटक अपडेट केलेला संदेश संग्रहित करतो. एकत्रितपणे, यशस्वी इव्हेंटवर आम्ही आमची `message` स्ट्रिंग अपडेट केलेल्या संदेशावर सेट करू, `newMessage` स्ट्रिंग साफ करू, आणि आमच्या स्मार्ट कॉन्ट्रॅक्टवर नवीन संदेश प्रकाशित झाला आहे हे दर्शविण्यासाठी आमची `status` स्टेट व्हेरिएबल अपडेट करू.

शेवटी, चला आमच्या `useEffect` फंक्शनमध्ये आमच्या श्रोत्याला कॉल करूया जेणेकरून ते `HelloWorld.js` घटकाच्या पहिल्या रेंडरवर सुरू होईल. एकत्रितपणे, तुमचे `useEffect` फंक्शन असे दिसले पाहिजे:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

आता आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टमधून वाचू शकतो, त्यावर कसे लिहायचे हे शोधणे छान होईल! तथापि, आमच्या डॅपवर लिहिण्यासाठी, आमच्याकडे प्रथम एक Ethereum वॉलेट कनेक्ट केलेले असणे आवश्यक आहे.

तर, पुढे आम्ही आमचे Ethereum वॉलेट (MetaMask) सेट अप करू आणि नंतर ते आमच्या डॅपशी कनेक्ट करू!

### पायरी ४: तुमचे Ethereum वॉलेट सेट करा {#step-4-set-up-your-ethereum-wallet}

Ethereum चेनवर काहीही लिहिण्यासाठी, वापरकर्त्यांना त्यांच्या व्हर्च्युअल वॉलेटच्या खाजगी की वापरून व्यवहारांवर स्वाक्षरी करावी लागेल. या ट्युटोरियलसाठी, आम्ही [MetaMask](https://metamask.io/) वापरू, जो ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे जो तुमच्या Ethereum खात्याचा पत्ता व्यवस्थापित करण्यासाठी वापरला जातो, कारण तो अंतिम-वापरकर्त्यासाठी हे व्यवहार स्वाक्षरी करणे खूप सोपे करतो.

तुम्हाला Ethereum वरील व्यवहार कसे कार्य करतात याबद्दल अधिक समजून घ्यायचे असल्यास, Ethereum फाउंडेशनचे [हे पेज](/developers/docs/transactions/) पहा.

#### MetaMask डाउनलोड करा {#download-metamask}

तुम्ही [येथे](https://metamask.io/download) विनामूल्य MetaMask खाते डाउनलोड आणि तयार करू शकता. तुम्ही खाते तयार करत असताना, किंवा तुमच्याकडे आधीपासूनच खाते असल्यास, वरच्या उजवीकडील “Goerli टेस्ट नेटवर्क” वर स्विच करण्याची खात्री करा (जेणेकरून आपण खऱ्या पैशांशी व्यवहार करत नाही आहोत).

#### फॉसेटमधून इथर जोडा {#add-ether-from-a-faucet}

Ethereum ब्लॉकचेनवर व्यवहारावर स्वाक्षरी करण्यासाठी, आम्हाला काही बनावट Eth ची आवश्यकता असेल. Eth मिळवण्यासाठी तुम्ही [FaucETH](https://fauceth.komputing.org) वर जाऊन तुमचा Goerli खात्याचा पत्ता प्रविष्ट करू शकता, “निधीची विनंती करा” वर क्लिक करा, नंतर ड्रॉपडाउनमध्ये “Ethereum टेस्टनेट Goerli” निवडा आणि शेवटी पुन्हा “निधीची विनंती करा” बटणावर क्लिक करा. त्यानंतर लगेचच तुम्हाला तुमच्या MetaMask खात्यात Eth दिसेल!

#### तुमची शिल्लक तपासा {#check-your-balance}

आमची शिल्लक आहे की नाही हे पुन्हा तपासण्यासाठी, चला [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) वापरून एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) विनंती करूया. हे आमच्या वॉलेटमधील Eth ची रक्कम परत करेल. तुम्ही तुमच्या MetaMask खात्याचा पत्ता इनपुट केल्यानंतर आणि “Send Request” वर क्लिक केल्यानंतर, तुम्हाला असा प्रतिसाद दिसेल:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**सूचना:** हा निकाल eth मध्ये नसून wei मध्ये आहे. Wei हे इथरचे सर्वात लहान एकक म्हणून वापरले जाते. wei चे eth मध्ये रूपांतर: 1 eth = 10¹⁸ wei. म्हणून जर आपण 0xde0b6b3a7640000 ला दशांश मध्ये रूपांतरित केले तर आपल्याला 1\*10¹⁸ मिळते, जे 1 eth च्या बरोबर आहे.

हुश्श! आपले बनावट पैसे तिथेच आहेत! 🤑

### पायरी ५: MetaMask ला तुमच्या UI शी कनेक्ट करा {#step-5-connect-metamask-to-your-UI}

आता आपले MetaMask वॉलेट सेट झाले आहे, चला आपला dapp त्याच्याशी कनेक्ट करूया!

#### `connectWallet` फंक्शन {#the-connectWallet-function}

आमच्या `interact.js` फाइलमध्ये, चला `connectWallet` फंक्शन अंमलात आणूया, जे आम्ही नंतर आमच्या `HelloWorld.js` घटकामध्ये कॉल करू शकतो.

चला `connectWallet` खालीलप्रमाणे सुधारित करूया:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 वरील टेक्स्ट-फील्डमध्ये एक संदेश लिहा.",
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
              तुम्ही तुमच्या ब्राउझरमध्ये MetaMask, एक व्हर्च्युअल Ethereum वॉलेट, इंस्टॉल करणे आवश्यक आहे.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

तर या मोठ्या कोड ब्लॉकचा नेमका काय उपयोग आहे?

बरं, प्रथम, ते तुमच्या ब्राउझरमध्ये `window.ethereum` सक्षम आहे की नाही हे तपासते.

`window.ethereum` हे MetaMask आणि इतर वॉलेट प्रदात्यांद्वारे इंजेक्ट केलेले एक ग्लोबल API आहे जे वेबसाइट्सना वापरकर्त्यांच्या Ethereum खात्यांची विनंती करण्याची परवानगी देते. मंजूर झाल्यास, ते वापरकर्ता कनेक्ट केलेल्या ब्लॉकचेनमधून डेटा वाचू शकते, आणि वापरकर्त्याला संदेश आणि व्यवहारांवर स्वाक्षरी करण्याचे सुचवू शकते. अधिक माहितीसाठी [MetaMask डॉक्स](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) तपासा!

जर `window.ethereum` उपस्थित _नसेल_, तर याचा अर्थ MetaMask स्थापित नाही. यामुळे एक JSON ऑब्जेक्ट परत येतो, जिथे परत केलेला `address` एक रिकामा स्ट्रिंग असतो आणि `status` JSX ऑब्जेक्ट वापरकर्त्याला MetaMask स्थापित करणे आवश्यक असल्याचे सांगतो.

आता जर `window.ethereum` उपस्थित _असेल_, तर गोष्टी मनोरंजक होतात.

try/catch लूप वापरून, आम्ही [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) कॉल करून MetaMask शी कनेक्ट करण्याचा प्रयत्न करू. हे फंक्शन कॉल केल्याने ब्राउझरमध्ये MetaMask उघडेल, जिथे वापरकर्त्याला त्यांचे वॉलेट तुमच्या dapp शी कनेक्ट करण्यास सांगितले जाईल.

- जर वापरकर्त्याने कनेक्ट करणे निवडले, तर `method: "eth_requestAccounts"` एक ॲरे परत करेल ज्यात डॅपशी कनेक्ट केलेल्या वापरकर्त्याच्या सर्व खात्यांचे पत्ते असतील. एकूणच, आमचे `connectWallet` फंक्शन एक JSON ऑब्जेक्ट परत करेल ज्यात या ॲरेमधील _पहिला_ `address` (ओळ 9 पहा) आणि एक `status` संदेश असेल जो वापरकर्त्याला स्मार्ट कॉन्ट्रॅक्टला संदेश लिहिण्यास सांगेल.
- जर वापरकर्त्याने कनेक्शन नाकारले, तर JSON ऑब्जेक्टमध्ये परत केलेल्या `address` साठी एक रिकामा स्ट्रिंग आणि एक `status` संदेश असेल जो वापरकर्त्याने कनेक्शन नाकारले असल्याचे दर्शवेल.

आता आम्ही हे `connectWallet` फंक्शन लिहिले आहे, पुढची पायरी म्हणजे ते आमच्या `HelloWorld.js` घटकामध्ये कॉल करणे.

#### `connectWallet` फंक्शन तुमच्या `HelloWorld.js` UI घटकामध्ये जोडा {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js` मधील `connectWalletPressed` फंक्शनवर नेव्हिगेट करा, आणि ते खालीलप्रमाणे अपडेट करा:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

आमच्या `HelloWorld.js` घटकामधून `interact.js` फाइलमधून आमची बहुतेक कार्यक्षमता कशी दूर केली जाते हे लक्षात घ्या? हे असे आहे की आम्ही M-V-C पॅराडाइमचे पालन करतो!

`connectWalletPressed` मध्ये, आम्ही फक्त आमच्या आयात केलेल्या `connectWallet` फंक्शनला एक await कॉल करतो आणि त्याच्या प्रतिसादाचा वापर करून, आम्ही आमचे `status` आणि `walletAddress` व्हेरिएबल्स त्यांच्या स्टेट हुक्सद्वारे अपडेट करतो.

आता, चला दोन्ही फायली (`HelloWorld.js` आणि `interact.js`) सेव्ह करूया आणि आतापर्यंत आमच्या UI ची चाचणी घेऊया.

तुमचा ब्राउझर [http://localhost:3000/](http://localhost:3000/) पेजवर उघडा, आणि पेजच्या वरच्या उजवीकडील "वॉलेट कनेक्ट करा" बटण दाबा.

तुमच्याकडे MetaMask स्थापित असल्यास, तुम्हाला तुमचे वॉलेट तुमच्या dapp शी जोडण्यास सांगितले जाईल. कनेक्ट करण्याची आमंत्रणे स्वीकारा.

तुम्हाला दिसेल की वॉलेट बटण आता तुमचा पत्ता कनेक्ट झाला आहे हे दर्शवते! व्वा 🔥

पुढे, पृष्ठ रिफ्रेश करण्याचा प्रयत्न करा... हे विचित्र आहे. आमचे वॉलेट बटण आम्हाला MetaMask कनेक्ट करण्यास सांगत आहे, जरी ते आधीच कनेक्ट केलेले असले तरी...

तथापि, घाबरू नका! आम्ही ते सहजपणे सोडवू शकतो (समजले?) `getCurrentWalletConnected` अंमलात आणून, जे तपासेल की पत्ता आधीपासूनच आमच्या डॅपशी कनेक्ट केलेला आहे की नाही आणि त्यानुसार आमचे UI अपडेट करेल!

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
          status: "👆🏽 वरील टेक्स्ट-फील्डमध्ये एक संदेश लिहा.",
        }
      } else {
        return {
          address: "",
          status: "🦊 वरच्या उजव्या बटणाचा वापर करून MetaMask शी कनेक्ट करा.",
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
              तुम्ही तुमच्या ब्राउझरमध्ये MetaMask, एक व्हर्च्युअल Ethereum वॉलेट, इंस्टॉल करणे आवश्यक आहे.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

हा कोड आम्ही मागील पायरीमध्ये लिहिलेल्या `connectWallet` फंक्शनसारखाच _खूप_ आहे.

मुख्य फरक असा आहे की `eth_requestAccounts` या पद्धतीला कॉल करण्याऐवजी, जे वापरकर्त्याला त्यांचे वॉलेट कनेक्ट करण्यासाठी MetaMask उघडते, येथे आपण `eth_accounts` ही पद्धत कॉल करतो, जी सध्या आपल्या dapp शी कनेक्ट केलेल्या MetaMask ॲड्रेसची एक ॲरे परत करते.

हे फंक्शन कृतीत पाहण्यासाठी, चला ते आमच्या `HelloWorld.js` घटकाच्या `useEffect` फंक्शनमध्ये कॉल करूया:

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

लक्षात घ्या, आम्ही आमच्या `getCurrentWalletConnected` च्या कॉलच्या प्रतिसादाचा वापर आमचे `walletAddress` आणि `status` स्टेट व्हेरिएबल्स अपडेट करण्यासाठी करतो.

आता तुम्ही हा कोड जोडला आहे, चला आमचे ब्राउझर विंडो रिफ्रेश करून पाहूया.

छान! बटण तुम्हाला कनेक्ट झाल्याचे सांगेल आणि तुमच्या कनेक्ट केलेल्या वॉलेटच्या ॲड्रेसचे पूर्वावलोकन दाखवेल - जरी तुम्ही रिफ्रेश केले तरी!

#### `addWalletListener` अंमलात आणा {#implement-addwalletlistener}

आमच्या dapp वॉलेट सेटअपमधील शेवटची पायरी म्हणजे वॉलेट लिसनर लागू करणे जेणेकरून आमच्या वॉलेटची स्थिती बदलल्यावर आमचे UI अपडेट होईल, जसे की वापरकर्ता डिस्कनेक्ट झाल्यावर किंवा खाती बदलल्यावर.

तुमच्या `HelloWorld.js` फाइलमध्ये, तुमचे `addWalletListener` फंक्शन खालीलप्रमाणे सुधारित करा:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 वरील टेक्स्ट-फील्डमध्ये एक संदेश लिहा.")
      } else {
        setWallet("")
        setStatus("🦊 वरच्या उजव्या बटणाचा वापर करून MetaMask शी कनेक्ट करा.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          तुम्ही तुमच्या ब्राउझरमध्ये MetaMask, एक व्हर्च्युअल Ethereum वॉलेट, इंस्टॉल करणे आवश्यक आहे.
        </a>
      </p>
    )
  }
}
```

मला खात्री आहे की तुम्हाला या टप्प्यावर काय चालले आहे हे समजून घेण्यासाठी आमच्या मदतीची गरज नाही, परंतु संपूर्णतेच्या उद्देशाने, चला ते पटकन पाहूया:

- प्रथम, आमचे फंक्शन तपासते की `window.ethereum` सक्षम आहे का (म्हणजे MetaMask स्थापित आहे का).
  - जर ते नसेल, तर आम्ही फक्त आमचे `status` स्टेट व्हेरिएबल एका JSX स्ट्रिंगवर सेट करतो जे वापरकर्त्याला MetaMask स्थापित करण्यास सांगते.
  - जर ते सक्षम असेल, तर आम्ही ओळ 3 वर `window.ethereum.on("accountsChanged")` हा लिसनर सेट करतो जो MetaMask वॉलेटमधील स्टेट बदलांसाठी ऐकतो, ज्यात वापरकर्ता dapp शी अतिरिक्त खाते जोडतो, खाती बदलतो किंवा खाते डिस्कनेक्ट करतो. जर किमान एक खाते कनेक्ट केलेले असेल, तर `walletAddress` स्टेट व्हेरिएबल लिसनरद्वारे परत केलेल्या `accounts` ॲरेमधील पहिले खाते म्हणून अपडेट केले जाते. अन्यथा, `walletAddress` एक रिकामा स्ट्रिंग म्हणून सेट केला जातो.

शेवटचे पण महत्त्वाचे, आम्ही ते आमच्या `useEffect` फंक्शनमध्ये कॉल करणे आवश्यक आहे:

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

आणि झाले! आम्ही आमच्या सर्व वॉलेट कार्यक्षमतेचे प्रोग्रामिंग यशस्वीरित्या पूर्ण केले आहे! आता आमच्या शेवटच्या कार्याकडे: आमच्या स्मार्ट कॉन्ट्रॅक्टमध्ये संग्रहित केलेला संदेश अपडेट करणे!

### पायरी ६: `updateMessage` फंक्शन अंमलात आणा {#step-6-implement-the-updateMessage-function}

ठीक आहे मित्रांनो, आपण अंतिम टप्प्यात आलो आहोत! तुमच्या `interact.js` फाइलच्या `updateMessage` मध्ये, आम्ही खालील गोष्टी करणार आहोत:

1. आम्हाला आमच्या स्मार्ट संपर्कात प्रकाशित करायचा असलेला संदेश वैध असल्याची खात्री करा
2. MetaMask वापरून आमच्या व्यवहारावर स्वाक्षरी करा
3. या फंक्शनला आमच्या `HelloWorld.js` फ्रंटएंड घटकामधून कॉल करा

याला जास्त वेळ लागणार नाही; चला हा डॅप पूर्ण करूया!

#### इनपुट एरर हाताळणी {#input-error-handling}

स्वाभाविकच, फंक्शनच्या सुरुवातीला काही प्रकारचे इनपुट त्रुटी हाताळणी असणे अर्थपूर्ण आहे.

आम्ही इच्छितो की जर MetaMask विस्तार स्थापित नसेल, कोणतेही वॉलेट कनेक्ट केलेले नसेल (म्हणजे, पास केलेला `address` एक रिकामा स्ट्रिंग आहे), किंवा `message` एक रिकामा स्ट्रिंग असेल तर आमचे फंक्शन लवकर परत यावे. चला `updateMessage` मध्ये खालील त्रुटी हाताळणी जोडूया:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 ब्लॉकचेनवरील संदेश अपडेट करण्यासाठी तुमचे MetaMask वॉलेट कनेक्ट करा.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ तुमचा संदेश रिकामा स्ट्रिंग असू शकत नाही.",
    }
  }
}
```

आता त्यात योग्य इनपुट त्रुटी हाताळणी आहे, MetaMask द्वारे व्यवहारावर स्वाक्षरी करण्याची वेळ आली आहे!

#### आमच्या व्यवहारावर स्वाक्षरी करणे {#signing-our-transaction}

तुम्ही आधीपासूनच पारंपरिक वेब3 Ethereum व्यवहारांशी परिचित असाल, तर आम्ही पुढे लिहिणारा कोड खूप परिचित असेल. तुमच्या इनपुट त्रुटी हाताळणी कोडच्या खाली, `updateMessage` मध्ये खालील जोडा:

```javascript
// interact.js

//व्यवहार पॅरामीटर्स सेट करा
const transactionParameters = {
  to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनांशिवाय आवश्यक.
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
          Etherscan वर तुमच्या व्यवहाराची स्थिती पहा!
        </a>
        <br />
        ℹ️ एकदा नेटवर्कद्वारे व्यवहाराची पडताळणी झाल्यावर, संदेश आपोआप अपडेट होईल.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

चला पाहूया की काय चालले आहे. प्रथम, आम्ही आमचे व्यवहार पॅरामीटर्स सेट करतो, जिथे:

- `to` प्राप्तकर्ता ॲड्रेस (आमचा स्मार्ट कॉन्ट्रॅक्ट) निर्दिष्ट करतो
- `from` व्यवहाराच्या स्वाक्षरीकर्त्याला निर्दिष्ट करते, आम्ही आमच्या फंक्शनमध्ये पास केलेला `address` व्हेरिएबल
- `data` मध्ये आमच्या हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्टच्या `update` पद्धतीचा कॉल आहे, जो आमचा `message` स्ट्रिंग व्हेरिएबल इनपुट म्हणून घेतो

मग, आम्ही एक await कॉल करतो, `window.ethereum.request`, जिथे आम्ही MetaMask ला व्यवहारावर स्वाक्षरी करण्यास सांगतो. लक्षात घ्या, ओळी ११ आणि १२ वर, आम्ही आमची eth पद्धत, `eth_sendTransaction` निर्दिष्ट करत आहोत आणि आमचे `transactionParameters` पास करत आहोत.

या टप्प्यावर, MetaMask ब्राउझरमध्ये उघडेल आणि वापरकर्त्याला व्यवहारावर सही करण्यास किंवा नाकारण्यास सांगेल.

- जर व्यवहार यशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `status` JSX स्ट्रिंग वापरकर्त्याला त्यांच्या व्यवहाराबद्दल अधिक माहितीसाठी Etherscan तपासण्यास सांगते.
- जर व्यवहार अयशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `status` स्ट्रिंग त्रुटी संदेश प्रसारित करते.

एकत्रितपणे, आमचे `updateMessage` फंक्शन असे दिसले पाहिजे:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //इनपुट त्रुटी हाताळणी
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 ब्लॉकचेनवरील संदेश अपडेट करण्यासाठी तुमचे MetaMask वॉलेट कनेक्ट करा.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ तुमचा संदेश रिकामा स्ट्रिंग असू शकत नाही.",
    }
  }

  //व्यवहार पॅरामीटर्स सेट करा
  const transactionParameters = {
    to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनांशिवाय आवश्यक.
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
            Etherscan वर तुमच्या व्यवहाराची स्थिती पहा!
          </a>
          <br />
          ℹ️ एकदा नेटवर्कद्वारे व्यवहाराची पडताळणी झाल्यावर, संदेश आपोआप अपडेट होईल.
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

शेवटचे पण महत्त्वाचे, आम्हाला आमचे `updateMessage` फंक्शन आमच्या `HelloWorld.js` घटकाशी कनेक्ट करणे आवश्यक आहे.

#### `updateMessage` ला `HelloWorld.js` फ्रंटएंडशी कनेक्ट करा {#connect-updatemessage-to-the-helloworld-js-frontend}

आमच्या `onUpdatePressed` फंक्शनने आयात केलेल्या `updateMessage` फंक्शनला एक await कॉल करावा आणि आमचा व्यवहार यशस्वी झाला की अयशस्वी हे दर्शविण्यासाठी `status` स्टेट व्हेरिएबल सुधारित करावे:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

हे खूप स्वच्छ आणि सोपे आहे. आणि अंदाज लावा... तुमचा डॅप पूर्ण झाला आहे!!!

पुढे जा आणि **अपडेट** बटणाची चाचणी घ्या!

### तुमचा स्वतःचा सानुकूल डॅप बनवा {#make-your-own-custom-dapp}

व्वा, तुम्ही ट्युटोरियलच्या शेवटपर्यंत पोहोचलात! रिकॅप करण्यासाठी, तुम्ही शिकलात की कसे:

- तुमच्या डॅप प्रकल्पाला MetaMask वॉलेट कनेक्ट करा
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API वापरून तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून डेटा वाचा
- MetaMask वापरून Ethereum व्यवहारांवर स्वाक्षरी करा

आता तुम्ही तुमचा स्वतःचा सानुकूल डॅप प्रकल्प तयार करण्यासाठी या ट्युटोरियलमधील कौशल्ये लागू करण्यासाठी पूर्णपणे सुसज्ज आहात! नेहमीप्रमाणे, तुम्हाला काही प्रश्न असल्यास, [Alchemy Discord](https://discord.gg/gWuC7zB) मध्ये मदतीसाठी आमच्याशी संपर्क साधण्यास अजिबात संकोच करू नका. 🧙‍♂️

एकदा तुम्ही हे ट्युटोरियल पूर्ण केल्यावर, आम्हाला Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform) वर टॅग करून तुमचा अनुभव कसा होता किंवा तुमचा काही अभिप्राय असल्यास आम्हाला कळवा!
