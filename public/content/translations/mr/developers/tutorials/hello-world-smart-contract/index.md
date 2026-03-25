---
title: "नवशिक्यांसाठी हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट"
description: "Ethereum वर एक साधे स्मार्ट कॉन्ट्रॅक्ट लिहिण्यावर आणि उपयोजित करण्यावर एक प्रास्ताविक ट्युटोरियल."
author: "elanh"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "डिप्लॉयिंग"
  ]
skill: beginner
lang: mr
published: 2021-03-31
---

जर तुम्ही ब्लॉकचेन डेव्हलपमेंटमध्ये नवीन असाल आणि कुठून सुरुवात करावी हे माहित नसेल, किंवा जर तुम्हाला फक्त स्मार्ट कॉन्ट्रॅक्ट कसे उपयोजित करायचे आणि त्यांच्याशी संवाद कसा साधायचा हे समजून घ्यायचे असेल, तर हा मार्गदर्शक तुमच्यासाठी आहे. आपण व्हर्च्युअल वॉलेट [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), आणि [Alchemy](https://www.alchemy.com/eth) वापरून सेपोलिया टेस्ट नेटवर्कवर एक साधे स्मार्ट कॉन्ट्रॅक्ट तयार करण्याची आणि उपयोजित करण्याची प्रक्रिया पाहू (यापैकी कशाचाही अर्थ तुम्हाला अजून समजत नसेल, तर काळजी करू नका, आम्ही ते स्पष्ट करू).

या ट्युटोरियलच्या [भाग २](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) मध्ये, एकदा आपले स्मार्ट कॉन्ट्रॅक्ट येथे उपयोजित झाल्यावर आपण त्याच्याशी संवाद कसा साधू शकतो हे पाहू, आणि [भाग ३](https.www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) मध्ये आपण ते Etherscan वर कसे प्रकाशित करायचे हे पाहू.

तुम्हाला कोणत्याही वेळी प्रश्न पडल्यास [Alchemy Discord](https://discord.gg/gWuC7zB) मध्ये मोकळेपणाने संपर्क साधा!

## पायरी १: Ethereum नेटवर्कशी कनेक्ट करा {#step-1}

Ethereum चेनला विनंत्या करण्याचे अनेक मार्ग आहेत. सोपेपणासाठी, आपण Alchemy वर एक विनामूल्य खाते वापरू, जो एक ब्लॉकचेन डेव्हलपर प्लॅटफॉर्म आणि API आहे, ज्यामुळे आपल्याला आपले स्वतःचे नोड्स चालवल्याशिवाय Ethereum चेनशी संवाद साधता येतो. या प्लॅटफॉर्ममध्ये मॉनिटरिंग आणि ॲनालिटिक्ससाठी डेव्हलपर साधने देखील आहेत, ज्यांचा आपण या ट्युटोरियलमध्ये फायदा घेऊ, जेणेकरून आपल्या स्मार्ट कॉन्ट्रॅक्टच्या उपयोजनात पडद्यामागे काय चालले आहे हे समजेल. जर तुमचे आधीच Alchemy खाते नसेल, तर [तुम्ही येथे विनामूल्य साइन अप करू शकता](https://dashboard.alchemy.com/signup).

## पायरी २: तुमचे ॲप (आणि API की) तयार करा {#step-2}

एकदा तुम्ही Alchemy खाते तयार केल्यावर, तुम्ही ॲप तयार करून API की तयार करू शकता. हे आम्हाला Sepolia चाचणी नेटवर्कवर विनंत्या करण्याची परवानगी देईल. जर तुम्ही टेस्टनेटशी परिचित नसाल, तर [हे पृष्ठ](/developers/docs/networks/) पहा.

1. तुमच्या Alchemy डॅशबोर्डमधील "Create new app" पृष्ठावर जाण्यासाठी नेव्ह बारमध्ये "Select an app" निवडा आणि "Create new app" वर क्लिक करा.

![हॅलो वर्ल्ड ॲप तयार करा](./hello-world-create-app.png)

2. तुमच्या ॲपला “Hello World” असे नाव द्या, एक छोटे वर्णन द्या, आणि एक उपयोग-केस निवडा, उदा., "Infra & Tooling." पुढे, "Ethereum" साठी शोधा आणि नेटवर्क निवडा.

![ॲप व्ह्यू हॅलो वर्ल्ड तयार करा](./create-app-view-hello-world.png)

3. पुढे जाण्यासाठी "Next" वर क्लिक करा, नंतर “Create app” आणि बस्स! तुमचे ॲप नेव्ह बार ड्रॉपडाउन मेन्यूमध्ये दिसले पाहिजे, जिथे कॉपी करण्यासाठी API की उपलब्ध असेल.

## पायरी ३: एक Ethereum खाते (पत्ता) तयार करा {#step-3}

आम्हाला व्यवहार पाठवण्यासाठी आणि प्राप्त करण्यासाठी Ethereum खात्याची आवश्यकता आहे. या ट्यूटोरियलसाठी, आम्ही MetaMask वापरू, जे ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे, जे तुमचा Ethereum खाते पत्ता व्यवस्थापित करण्यासाठी वापरले जाते. [व्यवहारांविषयी](/developers/docs/transactions/) अधिक.

तुम्ही MetaMask डाउनलोड करू शकता आणि [येथे](https://metamask.io/download) विनामूल्य Ethereum खाते तयार करू शकता. तुम्ही खाते तयार करत असताना, किंवा तुमचे खाते आधीच असल्यास, नेटवर्क ड्रॉपडाउन मेनू वापरून "Sepolia" टेस्ट नेटवर्कवर स्विच केल्याची खात्री करा (जेणेकरून आपण खऱ्या पैशांशी व्यवहार करणार नाही).

जर तुम्हाला Sepolia सूचीबद्ध दिसत नसेल, तर मेन्यूमध्ये जा, नंतर Advanced मध्ये जाऊन खाली स्क्रोल करा आणि "Show test networks" चालू करण्यासाठी टॉगल करा. नेटवर्क निवड मेन्यूमध्ये, टेस्टनेटची सूची शोधण्यासाठी "Custom" टॅब निवडा आणि "Sepolia" निवडा.

![metamask sepolia उदाहरण](./metamask-sepolia-example.png)

## पायरी ४: फॉसेटमधून इथर मिळवा {#step-4}

आपले स्मार्ट कॉन्ट्रॅक्ट टेस्ट नेटवर्कवर उपयोजित करण्यासाठी, आपल्याला काही बनावट Eth ची आवश्यकता असेल. Sepolia ETH मिळवण्यासाठी, विविध फॉसेटची सूची पाहण्यासाठी तुम्ही [Sepolia नेटवर्क तपशील](/developers/docs/networks/#sepolia) वर जाऊ शकता. एक काम करत नसल्यास, दुसरा प्रयत्न करा, कारण ते कधीकधी रिकामे होऊ शकतात. नेटवर्क ट्रॅफिकमुळे तुमचा बनावट ETH मिळण्यास थोडा वेळ लागू शकतो. त्यानंतर लवकरच तुमच्या MetaMask खात्यात ETH दिसेल!

## पायरी ५: तुमची शिल्लक तपासा {#step-5}

आपली शिल्लक आहे की नाही, हे पुन्हा तपासण्यासाठी, चला [Alchemy च्या कंपोझर टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) वापरून एक [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) विनंती करूया. हे आमच्या वॉलेटमधील ETH ची रक्कम परत करेल. तुम्ही तुमच्या MetaMask खात्याचा पत्ता इनपुट केल्यानंतर आणि “Send Request” वर क्लिक केल्यानंतर, तुम्हाला असा प्रतिसाद दिसेल:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **टीप:** हा निकाल ETH मध्ये नसून wei मध्ये आहे. Wei हे इथरचे सर्वात लहान एकक म्हणून वापरले जाते. wei चे ETH मध्ये रूपांतर असे आहे: 1 eth = 10<sup>18</sup> wei. म्हणून जर आपण 0x2B5E3AF16B1880000 चे दशांश मध्ये रूपांतर केले, तर आपल्याला 5\*10¹⁸ मिळतात जे 5 ETH च्या बरोबर आहे.
>
> हुश्श! आपले बनावट पैसे पूर्णपणे तिथे आहेत <Emoji text=":money_mouth_face:" size={1} />.

## पायरी ६: आपला प्रकल्प सुरू करा {#step-6}

प्रथम, आपल्याला आपल्या प्रोजेक्टसाठी एक फोल्डर तयार करण्याची आवश्यकता असेल. तुमच्या कमांड लाइनवर नेव्हिगेट करा आणि टाइप करा:

```
mkdir hello-world
cd hello-world
```

आता आपण आपल्या प्रोजेक्ट फोल्डरमध्ये आहोत, आपण प्रोजेक्ट सुरू करण्यासाठी `npm init` वापरू. जर तुमच्याकडे आधीपासून npm इंस्टॉल केलेले नसेल, तर [या सूचनांचे](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) पालन करा (आपल्याला Node.js ची देखील आवश्यकता असेल, म्हणून ते देखील डाउनलोड करा!).

```
npm init
```

तुम्ही इन्स्टॉलेशनच्या प्रश्नांची उत्तरे कशी देता हे खरोखर महत्त्वाचे नाही, संदर्भासाठी आम्ही ते कसे केले ते येथे आहे:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json ला मंजूर करा आणि आपण पुढे जाण्यास तयार आहोत!

## पायरी ७: [Hardhat](https://hardhat.org/getting-started/#overview) डाउनलोड करा {#step-7}

Hardhat हे तुमचे Ethereum सॉफ्टवेअर संकलित (compile), उपयोजित (deploy), चाचणी (test) आणि डीबग (debug) करण्यासाठी एक विकास वातावरण आहे. हे डेव्हलपर्सना थेट चेनवर उपयोजित करण्यापूर्वी स्थानिक पातळीवर स्मार्ट कॉन्ट्रॅक्ट्स आणि dApps तयार करताना मदत करते.

आपल्या `hello-world` प्रोजेक्टमध्ये चालवा:

```
npm install --save-dev hardhat
```

[इन्स्टॉलेशन सूचनांविषयी](https://hardhat.org/getting-started/#overview) अधिक तपशीलांसाठी हे पेज पहा.

## पायरी ८: Hardhat प्रोजेक्ट तयार करा {#step-8}

आपल्या प्रोजेक्ट फोल्डरमध्ये चालवा:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

यामुळे आपल्यासाठी `hardhat.config.js` फाईल तयार होईल, जिथे आपण आपल्या प्रोजेक्टसाठी सर्व सेटअप निर्दिष्ट करू (पायरी १३ वर).

## पायरी ९: प्रोजेक्ट फोल्डर्स जोडा {#step-9}

आपला प्रोजेक्ट सुव्यवस्थित ठेवण्यासाठी आपण दोन नवीन फोल्डर्स तयार करू. तुमच्या कमांड लाइनमधील प्रोजेक्टच्या मूळ डिरेक्टरीवर नेव्हिगेट करा आणि टाइप करा:

```
mkdir contracts
mkdir scripts
```

- `contracts/` मध्ये आपण आपली हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट कोड फाईल ठेवू
- `scripts/` मध्ये आपण आपले कॉन्ट्रॅक्ट उपयोजित करण्यासाठी आणि त्याच्याशी संवाद साधण्यासाठी स्क्रिप्ट्स ठेवू

## पायरी १०: आपले कॉन्ट्रॅक्ट लिहा {#step-10}

तुम्ही स्वतःला विचारत असाल, की आपण कोड कधी लिहिणार आहोत?? तर, आपण पायरी १० वर आलो आहोत.

hello-world प्रोजेक्ट तुमच्या आवडत्या एडिटरमध्ये उघडा (आम्हाला [VSCode](https://code.visualstudio.com/) आवडते). स्मार्ट कॉन्ट्रॅक्ट्स Solidity नावाच्या भाषेत लिहिले जातात, जी आपण आपले HelloWorld.sol स्मार्ट कॉन्ट्रॅक्ट लिहिण्यासाठी वापरू.‌

1. "contracts" फोल्डरमध्ये नेव्हिगेट करा आणि HelloWorld.sol नावाची नवीन फाईल तयार करा
2. खाली Ethereum फाउंडेशनकडून एक नमुना Hello World स्मार्ट कॉन्ट्रॅक्ट आहे, जो आपण या ट्युटोरियलसाठी वापरणार आहोत. खालील मजकूर तुमच्या HelloWorld.sol फाईलमध्ये कॉपी आणि पेस्ट करा, आणि हे कॉन्ट्रॅक्ट काय करते हे समजून घेण्यासाठी कमेंट्स नक्की वाचा:

```solidity
// सिमेंटिक व्हर्जनिंग वापरून सॉलिडिटीची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` नावाचे एक कॉन्ट्रॅक्ट परिभाषित करते.
// कॉन्ट्रॅक्ट हे फंक्शन्स आणि डेटा (त्याची स्थिती) यांचा संग्रह आहे. एकदा उपयोजित झाल्यावर, कॉन्ट्रॅक्ट Ethereum ब्लॉकचेनवर एका विशिष्ट पत्त्यावर राहते. अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` प्रकाराचे एक स्टेट व्हेरिएबल `message` घोषित करते.
   // स्टेट व्हेरिएबल्स असे व्हेरिएबल्स आहेत ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमची संग्रहित केली जातात. `public` कीवर्ड व्हेरिएबल्सना कॉन्ट्रॅक्टच्या बाहेरून ॲक्सेस करण्यायोग्य बनवतो आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट्स मूल्य ॲक्सेस करण्यासाठी कॉल करू शकतात.
   string public message;

   // अनेक क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणे, कन्स्ट्रक्टर हे एक विशेष फंक्शन आहे जे फक्त कॉन्ट्रॅक्ट तयार झाल्यावर कार्यान्वित होते.
   // कन्स्ट्रक्टरचा वापर कॉन्ट्रॅक्टचा डेटा सुरू करण्यासाठी केला जातो. अधिक जाणून घ्या:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग युक्तिवाद `initMessage` स्वीकारतो आणि कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये मूल्य सेट करतो).
      message = initMessage;
   }

   // एक पब्लिक फंक्शन जे एक स्ट्रिंग युक्तिवाद स्वीकारते आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

हे एक अत्यंत सोपे स्मार्ट कॉन्ट्रॅक्ट आहे जे तयार झाल्यावर एक संदेश संग्रहित करते आणि `update` फंक्शनला कॉल करून अपडेट केले जाऊ शकते.

## पायरी ११: तुमच्या प्रोजेक्टला MetaMask आणि Alchemy कनेक्ट करा {#step-11}

आपण MetaMask वॉलेट, Alchemy खाते तयार केले आहे आणि आपले स्मार्ट कॉन्ट्रॅक्ट लिहिले आहे, आता या तिन्हीना जोडण्याची वेळ आली आहे.

तुमच्या व्हर्च्युअल वॉलेटमधून पाठवलेल्या प्रत्येक व्यवहारासाठी तुमच्या युनिक प्रायव्हेट की वापरून स्वाक्षरी आवश्यक आहे. आमच्या प्रोग्रामला ही परवानगी देण्यासाठी, आम्ही आमची प्रायव्हेट की (आणि Alchemy API की) एका एन्व्हायर्नमेंट फाइलमध्ये सुरक्षितपणे संग्रहित करू शकतो.

> व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, वेब3 वापरून व्यवहार पाठवण्यावरील [हे ट्यूटोरियल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) पहा.

प्रथम, तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये dotenv पॅकेज इंस्टॉल करा:

```
npm install dotenv --save
```

त्यानंतर, आमच्या प्रोजेक्टच्या रूट डिरेक्टरीमध्ये एक `.env` फाइल तयार करा आणि त्यात तुमची MetaMask प्रायव्हेट की आणि HTTP Alchemy API URL जोडा.

- तुमची प्रायव्हेट की एक्सपोर्ट करण्यासाठी [या सूचनांचे](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) पालन करा
- HTTP Alchemy API URL मिळवण्यासाठी खाली पहा

![अल्केमी एपीआय की मिळवा](./get-alchemy-api-key.png)

Alchemy API URL कॉपी करा

तुमचे `.env` असे दिसले पाहिजे:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

हे प्रत्यक्षात आपल्या कोडशी जोडण्यासाठी, आपण या व्हेरिएबल्सचा संदर्भ आपल्या `hardhat.config.js` फाईलमध्ये पायरी १३ वर देऊ.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> कमिट करू नका! कृपया तुमची <code>.env</code> फाईल कोणासोबतही शेअर किंवा उघड करू नका, कारण असे केल्याने तुम्ही तुमची गुपिते धोक्यात आणत आहात याची खात्री करा. जर तुम्ही व्हर्जन कंट्रोल वापरत असाल, तर तुमची <code>.env</code> फाईल <a href="https://git-scm.com/docs/gitignore">gitignore</a> फाईलमध्ये जोडा.
</AlertDescription>
</AlertContent>
</Alert>

## पायरी १२: Ethers.js इंस्टॉल करा {#step-12-install-ethersjs}

Ethers.js ही एक लायब्ररी आहे जी अधिक वापरकर्ता-अनुकूल पद्धतींसह [प्रमाणित JSON-RPC पद्धती](/developers/docs/apis/json-rpc/) गुंडाळून Ethereum शी संवाद साधणे आणि विनंत्या करणे सोपे करते.

Hardhat अतिरिक्त टूलिंग आणि विस्तारित कार्यक्षमतेसाठी [प्लगइन्स](https://hardhat.org/plugins/) समाकलित करणे खूप सोपे करते. आम्ही कॉन्ट्रॅक्ट डिप्लॉयमेंटसाठी [Ethers प्लगइन](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) चा फायदा घेणार आहोत ([Ethers.js](https://github.com/ethers-io/ethers.js/) मध्ये काही अत्यंत स्वच्छ कॉन्ट्रॅक्ट डिप्लॉयमेंट पद्धती आहेत).

आपल्या प्रोजेक्ट डिरेक्टरीमध्ये टाइप करा:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

आपण पुढील पायरीमध्ये आपल्या `hardhat.config.js` मध्ये ethers ची आवश्यकता देखील दर्शवू.

## पायरी १३: hardhat.config.js अद्ययावत करा {#step-13-update-hardhatconfigjs}

आतापर्यंत आपण अनेक डिपेंडेंसी आणि प्लगइन जोडले आहेत, आता आपल्याला `hardhat.config.js` अद्यतनित करण्याची आवश्यकता आहे जेणेकरून आपल्या प्रोजेक्टला त्या सर्वांबद्दल माहिती मिळेल.

तुमचे `hardhat.config.js` याप्रमाणे दिसण्यासाठी अद्यतनित करा:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## पायरी १४: आपले कॉन्ट्रॅक्ट कंपाईल करा {#step-14-compile-our-contracts}

आतापर्यंत सर्व काही कार्यरत आहे याची खात्री करण्यासाठी, चला आमचा कॉन्ट्रॅक्ट संकलित करूया. `compile` कार्य हे बिल्ट-इन हार्डहॅट कार्यांपैकी एक आहे.

कमांड लाइनमधून चालवा:

```
npx hardhat compile
```

तुम्हाला `SPDX license identifier not provided in source file` बद्दल एक चेतावणी मिळू शकते, परंतु त्याबद्दल काळजी करण्याची गरज नाही — आशा आहे की इतर सर्व काही ठीक दिसेल! नसल्यास, तुम्ही नेहमी [Alchemy discord](https://discord.gg/u72VCg3) मध्ये संदेश पाठवू शकता.

## पायरी १५: आमची डिप्लॉय स्क्रिप्ट लिहा {#step-15-write-our-deploy-scripts}

आता आमचा कॉन्ट्रॅक्ट लिहिला आहे आणि आमची कॉन्फिगरेशन फाइल तयार आहे, आता आमच्या कॉन्ट्रॅक्टची उपयोजन स्क्रिप्ट लिहिण्याची वेळ आली आहे.

`scripts/` फोल्डरवर नेव्हिगेट करा आणि `deploy.js` नावाची एक नवीन फाइल तयार करा, त्यात खालील सामग्री जोडा:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // उपयोजन सुरू करा, जे एक प्रॉमिस परत करते जे कॉन्ट्रॅक्ट ऑब्जेक्टमध्ये रूपांतरित होते
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat त्यांच्या [कॉन्ट्रॅक्ट्स ट्यूटोरियल](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) मध्ये या प्रत्येक कोड ओळी काय करते हे आश्चर्यकारकपणे स्पष्ट करते, आम्ही त्यांचे स्पष्टीकरण येथे स्वीकारले आहे.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js मधील `ContractFactory` हे नवीन स्मार्ट कॉन्ट्रॅक्ट उपयोजित करण्यासाठी वापरले जाणारे एक ॲब्स्ट्रॅक्शन आहे, म्हणून येथे `HelloWorld` हे आपल्या हॅलो वर्ल्ड कॉन्ट्रॅक्टच्या इन्स्टन्ससाठी एक फॅक्टरी आहे. `hardhat-ethers` प्लगइन वापरताना `ContractFactory` आणि `Contract` इन्स्टन्स डीफॉल्टनुसार पहिल्या स्वाक्षरीकर्त्याशी जोडलेले असतात.

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory` वर `deploy()` कॉल केल्याने उपयोजन सुरू होईल, आणि एक `Promise` परत येईल जो `Contract` मध्ये रिझॉल्व्ह होईल. हे ते ऑब्जेक्ट आहे ज्यामध्ये आमच्या प्रत्येक स्मार्ट कॉन्ट्रॅक्ट फंक्शनसाठी एक पद्धत आहे.

## पायरी १६: आपले कॉन्ट्रॅक्ट उपयोजित करा {#step-16-deploy-our-contract}

आम्ही अखेरीस आमचा स्मार्ट कॉन्ट्रॅक्ट उपयोजित करण्यास तयार आहोत! कमांड लाइनवर नेव्हिगेट करा आणि चालवा:

```
npx hardhat run scripts/deploy.js --network sepolia
```

तुम्हाला त्यानंतर असे काहीतरी दिसेल:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

जर आपण [Sepolia etherscan](https://sepolia.etherscan.io/) वर गेलो आणि आपल्या कॉन्ट्रॅक्ट पत्त्यासाठी शोधले तर ते यशस्वीरित्या उपयोजित झाले आहे हे आपण पाहू शकू. व्यवहार असा काहीतरी दिसेल:

![etherscan कॉन्ट्रॅक्ट](./etherscan-contract.png)

`From` पत्ता तुमच्या MetaMask खात्याच्या पत्त्याशी जुळला पाहिजे आणि To पत्त्यावर “Contract Creation” असे दिसेल, परंतु जर आपण व्यवहारात क्लिक केले तर आपल्याला `To` फील्डमध्ये आपला कॉन्ट्रॅक्ट पत्ता दिसेल:

![एथरस्कॅन व्यवहार](./etherscan-transaction.png)

अभिनंदन! तुम्ही नुकतेच Ethereum चेनवर एक स्मार्ट कॉन्ट्रॅक्ट उपयोजित केले आहे 🎉

पडद्यामागे काय चालले आहे हे समजून घेण्यासाठी, चला आमच्या [Alchemy dashboard](https://dashboard.alchemyapi.io/explorer) मधील Explorer टॅबवर नेव्हिगेट करूया. तुमच्याकडे अनेक Alchemy ॲप्स असल्यास, ॲपनुसार फिल्टर केल्याची खात्री करा आणि “Hello World” निवडा.
![हॅलो वर्ल्ड एक्सप्लोरर](./hello-world-explorer.png)

येथे तुम्हाला मुठभर JSON-RPC कॉल्स दिसतील जे Hardhat/Ethers ने `.deploy()` फंक्शन कॉल केल्यावर पडद्याआड आपल्यासाठी केले. येथे दोन महत्त्वाचे मुद्दे म्हणजे [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), जे प्रत्यक्षात सेपोलिया चेनवर आपले कॉन्ट्रॅक्ट लिहिण्याची विनंती आहे, आणि [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) जे हॅश दिल्यावर आपल्या व्यवहाराबद्दल माहिती वाचण्याची विनंती आहे (व्यवहार करताना एक सामान्य नमुना). व्यवहार पाठविण्याबद्दल अधिक जाणून घेण्यासाठी, [Web3 आणि Alchemy वापरून व्यवहार पाठविण्यावरील](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) हे ट्युटोरियल पहा.

या ट्युटोरियलच्या भाग १ साठी एवढेच, भाग २ मध्ये आपण आपला सुरुवातीचा संदेश अपडेट करून [आपल्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधू](https://www.alchemy.com/docs/interacting-with-a-smart-contract) आणि भाग ३ मध्ये आपण [आपले स्मार्ट कॉन्ट्रॅक्ट Etherscan वर प्रकाशित करू](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) जेणेकरून प्रत्येकाला त्याच्याशी संवाद कसा साधायचा हे कळेल.

**Alchemy बद्दल अधिक जाणून घ्यायचे आहे? आमची [वेबसाइट](https://www.alchemy.com/eth) तपासा. एकही अपडेट चुकवायचे नाही? [येथे](https://www.alchemy.com/newsletter) आमच्या वृत्तपत्राची सदस्यता घ्या! आमच्या [Discord](https://discord.gg/u72VCg3) मध्ये सामील होण्याची खात्री करा. **
