---
title: "नवशिक्यांसाठी Hello World स्मार्ट कॉन्ट्रॅक्ट"
description: "इथेरियमवर एक साधे स्मार्ट कॉन्ट्रॅक्ट लिहिण्यावर आणि प्रस्थापित करण्यावर परिचयात्मक ट्युटोरिअल."
author: "एलानएच"
tags: ["Solidity", "Hardhat", "Alchemy", "स्मार्ट कॉन्ट्रॅक्ट्स", "प्रस्थापित करणे"]
skill: beginner
breadcrumb: "Hello World कॉन्ट्रॅक्ट"
lang: mr
published: 2021-03-31
---

जर तुम्ही ब्लॉकचेन डेव्हलपमेंटमध्ये नवीन असाल आणि कुठून सुरुवात करावी हे तुम्हाला माहीत नसेल, किंवा तुम्हाला फक्त स्मार्ट कॉन्ट्रॅक्ट्स कसे प्रस्थापित करायचे आणि त्यांच्याशी कसा संवाद साधायचा हे समजून घ्यायचे असेल, तर हे मार्गदर्शक तुमच्यासाठी आहे. आम्ही व्हर्च्युअल वॉलेट [मेटामास्क](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), आणि [Alchemy](https://www.alchemy.com/eth) वापरून Sepolia टेस्ट नेटवर्कवर एक साधे स्मार्ट कॉन्ट्रॅक्ट तयार आणि प्रस्थापित करण्याच्या प्रक्रियेतून जाऊ (यापैकी कशाचाही अर्थ तुम्हाला अद्याप समजला नसेल तर काळजी करू नका, आम्ही ते स्पष्ट करू).

या ट्युटोरिअलच्या [भाग 2](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract) मध्ये, एकदा आपले स्मार्ट कॉन्ट्रॅक्ट येथे प्रस्थापित झाल्यानंतर आपण त्याच्याशी कसा संवाद साधू शकतो हे पाहू, आणि [भाग 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) मध्ये आपण ते Etherscan वर कसे प्रकाशित करायचे हे कव्हर करू.

तुम्हाला कोणत्याही टप्प्यावर प्रश्न असल्यास [Alchemy डिस्कॉर्ड्](https://discord.gg/gWuC7zB) मध्ये मोकळेपणाने संपर्क साधा!

## पायरी 1: इथेरियम नेटवर्कशी कनेक्ट करा {#step-1}

इथेरियम चेनला विनंत्या करण्याचे अनेक मार्ग आहेत. साधेपणासाठी, आम्ही Alchemy वर एक मोफत खाते वापरू, जे एक ब्लॉकचेन डेव्हलपर प्लॅटफॉर्म आणि API आहे जे आम्हाला आमचे स्वतःचे नोड न चालवता इथेरियम चेनशी संवाद साधण्याची परवानगी देते. या प्लॅटफॉर्मवर मॉनिटरिंग आणि ॲनालिटिक्ससाठी डेव्हलपर टूल्स देखील आहेत ज्यांचा फायदा आम्ही या ट्युटोरिअलमध्ये आमच्या स्मार्ट कॉन्ट्रॅक्ट प्रस्थापनेमध्ये तांत्रिकदृष्ट्या काय चालले आहे हे समजून घेण्यासाठी घेऊ. जर तुमच्याकडे आधीपासून Alchemy खाते नसेल, तर [तुम्ही येथे मोफत साइन अप करू शकता](https://dashboard.alchemy.com/signup).

## पायरी 2: तुमचे ॲप (आणि API की) तयार करा {#step-2}

एकदा तुम्ही Alchemy खाते तयार केले की, तुम्ही ॲप तयार करून API की जनरेट करू शकता. हे आम्हाला Sepolia टेस्ट नेटवर्कला विनंत्या करण्याची परवानगी देईल. जर तुम्हाला टेस्टनेट्सची माहिती नसेल, तर [हे पेज](/developers/docs/networks/) तपासा.

1.  नॅव्हिगेशन बारमध्ये "Select an app" निवडून आणि "Create new app" वर क्लिक करून तुमच्या Alchemy डॅशबोर्डमधील "Create new app" पेजवर जा.

![Hello world create app](./hello-world-create-app.png)

2. तुमच्या ॲपला “Hello World” नाव द्या, एक लहान वर्णन द्या, आणि एक युज केस निवडा, उदा., "Infra & Tooling." पुढे, "Ethereum" शोधा आणि नेटवर्क निवडा.

![create app view hello world](./create-app-view-hello-world.png)

3. पुढे जाण्यासाठी "Next" वर क्लिक करा, नंतर “Create app” आणि झाले! तुमचे ॲप नॅव्हिगेशन बार ड्रॉपडाउन मेनूमध्ये दिसले पाहिजे, ज्यामध्ये कॉपी करण्यासाठी API की उपलब्ध असेल.

## पायरी 3: इथेरियम खाते (पत्ता) तयार करा {#step-3}

व्यवहार पाठवण्यासाठी आणि प्राप्त करण्यासाठी आम्हाला इथेरियम खाते आवश्यक आहे. या ट्युटोरिअलसाठी, आम्ही मेटामास्क वापरू, जे तुमच्या इथेरियम खाते पत्त्याचे व्यवस्थापन करण्यासाठी ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे. [व्यवहारांबद्दल](/developers/docs/transactions/) अधिक माहिती.

तुम्ही मेटामास्क डाउनलोड करू शकता आणि [येथे](https://metamask.io/download) मोफत इथेरियम खाते तयार करू शकता. जेव्हा तुम्ही खाते तयार करत असाल, किंवा तुमच्याकडे आधीपासून खाते असेल, तेव्हा नेटवर्क ड्रॉपडाउन मेनू वापरून "Sepolia" टेस्ट नेटवर्कवर स्विच करण्याची खात्री करा (जेणेकरून आपण खऱ्या पैशांशी व्यवहार करत नाही).

जर तुम्हाला Sepolia सूचीबद्ध दिसत नसेल, तर मेनूमध्ये जा, नंतर Advanced आणि "Show test networks" चालू करण्यासाठी खाली स्क्रोल करा. नेटवर्क निवड मेनूमध्ये, टेस्टनेट्सची सूची शोधण्यासाठी "Custom" टॅब निवडा आणि "Sepolia" निवडा.

![metamask sepolia example](./metamask-sepolia-example.png)

## पायरी 4: फॉसेटमधून इथर जोडा {#step-4}

आमचे स्मार्ट कॉन्ट्रॅक्ट टेस्ट नेटवर्कवर प्रस्थापित करण्यासाठी, आम्हाला काही बनावट ETH ची आवश्यकता असेल. Sepolia ETH मिळवण्यासाठी तुम्ही विविध फॉसेट्सची सूची पाहण्यासाठी [Sepolia नेटवर्क तपशील](/developers/docs/networks/#sepolia) वर जाऊ शकता. जर एक काम करत नसेल, तर दुसरा वापरून पहा कारण ते कधीकधी कोरडे पडू शकतात. नेटवर्क ट्रॅफिकमुळे तुमचे बनावट ETH प्राप्त होण्यास थोडा वेळ लागू शकतो. तुम्हाला लवकरच तुमच्या मेटामास्क खात्यात ETH दिसले पाहिजे!

## पायरी 5: तुमची शिल्लक तपासा {#step-5}

आमची शिल्लक तिथे आहे हे पुन्हा तपासण्यासाठी, [Alchemy चे कंपोझर टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) वापरून [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) विनंती करूया. हे आमच्या वॉलेटमधील ETH ची रक्कम परत करेल. तुम्ही तुमचा मेटामास्क खाते पत्ता टाकल्यानंतर आणि “Send Request” वर क्लिक केल्यानंतर, तुम्हाला असा प्रतिसाद दिसेल:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **टीप:** हा निकाल Wei मध्ये आहे ETH मध्ये नाही. Wei हे इथरचे सर्वात लहान मूल्य म्हणून वापरले जाते. Wei मधून ETH मध्ये रूपांतरण असे आहे: 1 eth = 10<sup>18</sup> Wei. त्यामुळे जर आपण 0x2B5E3AF16B1880000 चे दशांश मध्ये रूपांतर केले तर आपल्याला 5\*10¹⁸ मिळते जे 5 ETH च्या बरोबरीचे आहे.
>
> हुश्श! आमचे बनावट पैसे तिथे आहेत <Emoji text=":money_mouth_face:" size={1} />.

## पायरी 6: आमचा प्रोजेक्ट इनिशियलाइझ करा {#step-6}

प्रथम, आम्हाला आमच्या प्रोजेक्टसाठी एक फोल्डर तयार करावे लागेल. तुमच्या कमांड लाइनवर जा आणि टाइप करा:

```
mkdir hello-world
cd hello-world
```

आता आपण आपल्या प्रोजेक्ट फोल्डरमध्ये आहोत, आपण प्रोजेक्ट इनिशियलाइझ करण्यासाठी `npm init` वापरू. जर तुमच्याकडे आधीपासून npm इन्स्टॉल केलेले नसेल, तर [Node.js इन्स्टॉलेशन सूचनांचे](https://nodejs.org/en/download/) अनुसरण करा (आम्हाला या ट्युटोरिअलसाठी Node.js आणि npm ची आवश्यकता असेल).

```
npm init
```

तुम्ही इन्स्टॉलेशनच्या प्रश्नांची उत्तरे कशी देता याने फारसा फरक पडत नाही, संदर्भासाठी आम्ही ते कसे केले ते येथे दिले आहे:

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

package.json मंजूर करा आणि आपण पुढे जाण्यासाठी तयार आहोत!
## पायरी 7: [Hardhat](https://hardhat.org/getting-started/#overview) डाउनलोड करा {#step-7}

Hardhat हे तुमचे इथेरियम सॉफ्टवेअर कंपाईल, प्रस्थापित, टेस्ट आणि डीबग करण्यासाठी एक डेव्हलपमेंट एन्व्हायरन्मेंट आहे. लाइव्ह चेनवर प्रस्थापित करण्यापूर्वी स्थानिक पातळीवर स्मार्ट कॉन्ट्रॅक्ट्स आणि विकेंद्रित ॲप्लिकेशन्स (dapps) तयार करताना हे डेव्हलपर्सना मदत करते.

आमच्या `hello-world` प्रोजेक्टमध्ये रन करा:

```
npm install --save-dev hardhat
```

[इन्स्टॉलेशन सूचनांबद्दल](https://hardhat.org/getting-started/#overview) अधिक तपशीलांसाठी हे पेज तपासा.

## पायरी 8: Hardhat प्रोजेक्ट तयार करा {#step-8}

आमच्या प्रोजेक्ट फोल्डरमध्ये रन करा:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

हे आमच्यासाठी एक `hardhat.config.js` फाईल जनरेट करेल जिथे आम्ही आमच्या प्रोजेक्टसाठी सर्व सेटअप निर्दिष्ट करू (पायरी 13 वर).

## पायरी 9: प्रोजेक्ट फोल्डर्स जोडा {#step-9}

आमचा प्रोजेक्ट व्यवस्थित ठेवण्यासाठी आम्ही दोन नवीन फोल्डर्स तयार करू. तुमच्या कमांड लाइनमध्ये तुमच्या प्रोजेक्टच्या रूट डिरेक्टरीवर जा आणि टाइप करा:

```
mkdir contracts
mkdir scripts
```

- `contracts/` येथे आम्ही आमची hello world स्मार्ट कॉन्ट्रॅक्ट कोड फाईल ठेवू
- `scripts/` येथे आम्ही आमचे कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठी आणि त्याच्याशी संवाद साधण्यासाठी स्क्रिप्ट्स ठेवू

## पायरी 10: आमचे कॉन्ट्रॅक्ट लिहा {#step-10}

तुम्ही स्वतःला विचारत असाल, आपण कोड कधी लिहिणार आहोत?? बरं, आपण इथे आहोत, पायरी 10 वर.

तुमच्या आवडत्या एडिटरमध्ये hello-world प्रोजेक्ट उघडा (आम्हाला [VSCode](https://code.visualstudio.com/) आवडते). स्मार्ट कॉन्ट्रॅक्ट्स Solidity नावाच्या भाषेत लिहिलेले असतात ज्याचा वापर आम्ही आमचे HelloWorld.sol स्मार्ट कॉन्ट्रॅक्ट लिहिण्यासाठी करू.‌

1.  “contracts” फोल्डरवर जा आणि HelloWorld.sol नावाची नवीन फाईल तयार करा
2.  खाली इथेरियम फाउंडेशनचे एक नमुना Hello World स्मार्ट कॉन्ट्रॅक्ट आहे जे आम्ही या ट्युटोरिअलसाठी वापरणार आहोत. खालील मजकूर कॉपी करा आणि तुमच्या HelloWorld.sol फाईलमध्ये पेस्ट करा, आणि हे कॉन्ट्रॅक्ट काय करते हे समजून घेण्यासाठी कमेंट्स नक्की वाचा:

```solidity
// सिमेंटिक व्हर्जनिंग वापरून, Solidity ची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` नावाचे कॉन्ट्रॅक्ट परिभाषित करते.
// कॉन्ट्रॅक्ट हे फंक्शन्स आणि डेटा (त्याची स्थिती) यांचा संग्रह आहे. एकदा प्रस्थापित केल्यावर, कॉन्ट्रॅक्ट इथेरियम ब्लॉकचेनवरील एका विशिष्ट पत्त्यावर राहते. अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` प्रकाराचे `message` हे स्टेट व्हेरिएबल घोषित करते.
   // स्टेट व्हेरिएबल्स हे असे व्हेरिएबल्स आहेत ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमस्वरूपी साठवली जातात. `public` कीवर्ड व्हेरिएबल्सना कॉन्ट्रॅक्टच्या बाहेरून प्रवेश करण्यायोग्य बनवतो आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट्स मूल्य मिळवण्यासाठी कॉल करू शकतात.
   string public message;

   // अनेक क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणेच, कन्स्ट्रक्टर हे एक विशेष फंक्शन आहे जे केवळ कॉन्ट्रॅक्ट तयार करताना कार्यान्वित केले जाते.
   // कॉन्ट्रॅक्टचा डेटा इनिशियलाइझ करण्यासाठी कन्स्ट्रक्टर्सचा वापर केला जातो. अधिक जाणून घ्या:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // `initMessage` हा स्ट्रिंग आर्ग्युमेंट स्वीकारतो आणि कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये मूल्य सेट करतो).
      message = initMessage;
   }

   // एक पब्लिक फंक्शन जे स्ट्रिंग आर्ग्युमेंट स्वीकारते आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

हे एक अतिशय साधे स्मार्ट कॉन्ट्रॅक्ट आहे जे तयार केल्यावर एक संदेश स्टोअर करते आणि `update` फंक्शन कॉल करून अपडेट केले जाऊ शकते.

## पायरी 11: मेटामास्क आणि Alchemy तुमच्या प्रोजेक्टशी कनेक्ट करा {#step-11}

आम्ही मेटामास्क वॉलेट, Alchemy खाते तयार केले आहे आणि आमचे स्मार्ट कॉन्ट्रॅक्ट लिहिले आहे, आता या तिन्हींना जोडण्याची वेळ आली आहे.

तुमच्या व्हर्च्युअल वॉलेटमधून पाठवलेल्या प्रत्येक व्यवहारासाठी तुमच्या युनिक खाजगी की चा वापर करून स्वाक्षरी आवश्यक असते. आमच्या प्रोग्रामला ही परवानगी देण्यासाठी, आम्ही आमची खाजगी की (आणि Alchemy API की) एका एन्व्हायरन्मेंट फाईलमध्ये सुरक्षितपणे स्टोअर करू शकतो.

> व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, Web3 वापरून व्यवहार पाठवण्यावरील [हे ट्युटोरिअल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) तपासा.

प्रथम, तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये dotenv पॅकेज इन्स्टॉल करा:

```
npm install dotenv --save
```

त्यानंतर, आमच्या प्रोजेक्टच्या रूट डिरेक्टरीमध्ये एक `.env` फाईल तयार करा, आणि त्यात तुमची मेटामास्क खाजगी की आणि HTTP Alchemy API URL जोडा.

- तुमची खाजगी की एक्सपोर्ट करण्यासाठी [या सूचनांचे](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) अनुसरण करा
- HTTP Alchemy API URL मिळवण्यासाठी खाली पहा

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL कॉपी करा

तुमची `.env` अशी दिसली पाहिजे:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

यांना प्रत्यक्षात आमच्या कोडशी जोडण्यासाठी, आम्ही पायरी 13 वर आमच्या `hardhat.config.js` फाईलमध्ये या व्हेरिएबल्सचा संदर्भ देऊ.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> कमिट करू नका! कृपया तुमची <code>.env</code> फाईल कधीही कोणाशीही शेअर किंवा उघड न करण्याची खात्री करा, कारण असे केल्याने तुम्ही तुमची गुपिते धोक्यात आणत आहात. जर तुम्ही व्हर्जन कंट्रोल वापरत असाल, तर तुमची <code>.env</code> एका <a href="https://git-scm.com/docs/gitignore">gitignore</a> फाईलमध्ये जोडा.
</AlertDescription>
</AlertContent>
</Alert>

## पायरी 12: Ethers.js इन्स्टॉल करा {#step-12-install-ethersjs}

Ethers.js ही एक लायब्ररी आहे जी [प्रमाणित जेसॉन-आरपीसी पद्धतींना](/developers/docs/apis/json-rpc/) अधिक युजर फ्रेंडली पद्धतींसह रॅप करून इथेरियमशी संवाद साधणे आणि विनंत्या करणे सोपे करते.

Hardhat अतिरिक्त टूलिंग आणि विस्तारित कार्यक्षमतेसाठी [प्लगइन्स](https://hardhat.org/plugins/) इंटिग्रेट करणे अतिशय सोपे करते. आम्ही कॉन्ट्रॅक्ट प्रस्थापनेसाठी [Ethers प्लगइनचा](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) फायदा घेणार आहोत ([Ethers.js](https://github.com/ethers-io/ethers.js/) मध्ये काही अतिशय स्वच्छ कॉन्ट्रॅक्ट प्रस्थापना पद्धती आहेत).

तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये टाइप करा:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

पुढील पायरीमध्ये आम्हाला आमच्या `hardhat.config.js` मध्ये ethers ची देखील आवश्यकता असेल.

## पायरी 13: hardhat.config.js अपडेट करा {#step-13-update-hardhatconfigjs}

आम्ही आतापर्यंत अनेक डिपेंडन्सीज आणि प्लगइन्स जोडले आहेत, आता आम्हाला `hardhat.config.js` अपडेट करणे आवश्यक आहे जेणेकरून आमच्या प्रोजेक्टला त्या सर्वांबद्दल माहिती असेल.

तुमची `hardhat.config.js` अशी दिसण्यासाठी अपडेट करा:

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

## पायरी 14: आमचे कॉन्ट्रॅक्ट कंपाईल करा {#step-14-compile-our-contracts}

आतापर्यंत सर्वकाही काम करत आहे याची खात्री करण्यासाठी, चला आमचे कॉन्ट्रॅक्ट कंपाईल करूया. `compile` टास्क हे अंगभूत hardhat टास्क्सपैकी एक आहे.

कमांड लाइनवरून रन करा:

```
npx hardhat compile
```

तुम्हाला `SPDX license identifier not provided in source file` बद्दल चेतावणी मिळू शकते, परंतु त्याबद्दल काळजी करण्याची गरज नाही — आशा आहे की बाकी सर्वकाही चांगले दिसत आहे! नसल्यास, तुम्ही नेहमी [Alchemy डिस्कॉर्ड्](https://discord.gg/u72VCg3) मध्ये मेसेज करू शकता.

## पायरी 15: आमची प्रस्थापना स्क्रिप्ट लिहा {#step-15-write-our-deploy-scripts}

आता आमचे कॉन्ट्रॅक्ट लिहिले गेले आहे आणि आमची कॉन्फिगरेशन फाईल तयार आहे, आता आमची कॉन्ट्रॅक्ट प्रस्थापना स्क्रिप्ट लिहिण्याची वेळ आली आहे.

`scripts/` फोल्डरवर जा आणि `deploy.js` नावाची नवीन फाईल तयार करा, त्यात खालील मजकूर जोडा:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat त्यांच्या [कॉन्ट्रॅक्ट्स ट्युटोरिअलमध्ये](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) यापैकी प्रत्येक कोडची ओळ काय करते हे स्पष्ट करण्याचे आश्चर्यकारक काम करते, आम्ही त्यांचे स्पष्टीकरण येथे स्वीकारले आहे.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js मधील `ContractFactory` हे नवीन स्मार्ट कॉन्ट्रॅक्ट्स प्रस्थापित करण्यासाठी वापरले जाणारे एक ॲब्स्ट्रॅक्शन आहे, त्यामुळे येथील `HelloWorld` ही आमच्या hello world कॉन्ट्रॅक्टच्या इन्स्टन्सेससाठी एक फॅक्टरी आहे. `hardhat-ethers` प्लगइन वापरताना `ContractFactory` आणि `Contract` इन्स्टन्सेस डीफॉल्टनुसार पहिल्या स्वाक्षरीकर्त्याशी जोडलेले असतात.

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory` वर `deploy()` कॉल केल्याने प्रस्थापना सुरू होईल, आणि एक `Promise` परत करेल जे `Contract` मध्ये रिझॉल्व्ह होते. हा तो ऑब्जेक्ट आहे ज्यामध्ये आमच्या प्रत्येक स्मार्ट कॉन्ट्रॅक्ट फंक्शनसाठी एक पद्धत आहे.

## पायरी 16: आमचे कॉन्ट्रॅक्ट प्रस्थापित करा {#step-16-deploy-our-contract}

आम्ही शेवटी आमचे स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठी तयार आहोत! कमांड लाइनवर जा आणि रन करा:

```
npx hardhat run scripts/deploy.js --network sepolia
```

त्यानंतर तुम्हाला असे काहीतरी दिसेल:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

जर आपण [Sepolia Etherscan](https://sepolia.etherscan.io/) वर गेलो आणि आमचा कॉन्ट्रॅक्ट पत्ता शोधला तर आपल्याला दिसेल की ते यशस्वीरित्या प्रस्थापित झाले आहे. व्यवहार काहीसा असा दिसेल:

![etherscan contract](./etherscan-contract.png)

`From` पत्ता तुमच्या मेटामास्क खाते पत्त्याशी जुळला पाहिजे आणि To पत्ता “Contract Creation” म्हणेल परंतु जर आपण व्यवहारामध्ये क्लिक केले तर आपल्याला `To` फील्डमध्ये आमचा कॉन्ट्रॅक्ट पत्ता दिसेल:

![etherscan transaction](./etherscan-transaction.png)

अभिनंदन! तुम्ही नुकतेच इथेरियम चेनवर एक स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित केले आहे 🎉

तांत्रिकदृष्ट्या काय चालले आहे हे समजून घेण्यासाठी, चला आमच्या [Alchemy डॅशबोर्डमधील](https://dashboard.alchemy.com/explorer) Explorer टॅबवर जाऊया. जर तुमच्याकडे एकाधिक Alchemy ॲप्स असतील तर ॲपनुसार फिल्टर करण्याची आणि “Hello World” निवडण्याची खात्री करा.
![hello world explorer](./hello-world-explorer.png)

येथे तुम्हाला काही जेसॉन-आरपीसी कॉल्स दिसतील जे Hardhat/Ethers ने आमच्यासाठी तांत्रिकदृष्ट्या केले जेव्हा आम्ही `.deploy()` फंक्शन कॉल केले. येथे नमूद करण्यासारखे दोन महत्त्वाचे कॉल्स म्हणजे [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), जी प्रत्यक्षात आमचे कॉन्ट्रॅक्ट Sepolia चेनवर लिहिण्याची विनंती आहे, आणि [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash) जी हॅश दिल्यावर आमच्या व्यवहाराबद्दल माहिती वाचण्याची विनंती आहे (व्यवहार करताना एक सामान्य पॅटर्न). व्यवहार पाठवण्याबद्दल अधिक जाणून घेण्यासाठी, [Web3 वापरून व्यवहार पाठवण्यावरील](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) हे ट्युटोरिअल तपासा.

या ट्युटोरिअलच्या भाग 1 साठी एवढेच, भाग 2 मध्ये आम्ही आमचा प्रारंभिक संदेश अपडेट करून प्रत्यक्षात [आमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधू](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract), आणि भाग 3 मध्ये आम्ही [आमचे स्मार्ट कॉन्ट्रॅक्ट Etherscan वर प्रकाशित करू](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) जेणेकरून प्रत्येकाला त्याच्याशी कसा संवाद साधायचा हे कळेल.

**Alchemy बद्दल अधिक जाणून घ्यायचे आहे? आमची [वेबसाईट](https://www.alchemy.com/eth) तपासा. कधीही अपडेट चुकवू इच्छित नाही? आमच्या न्यूजलेटरची [येथे](https://www.alchemy.com/newsletter) सदस्यता घ्या! आमच्या [डिस्कॉर्ड्](https://discord.gg/u72VCg3) मध्ये देखील नक्की सामील व्हा.**.
