---
title: "वेब3 ॲप्ससाठी सर्व्हर घटक आणि एजंट्स"
description: "हे ट्युटोरियल वाचल्यानंतर, तुम्ही असे TypeScript सर्व्हर्स लिहू शकाल जे ब्लॉकचेनवरील घटना ऐकतात आणि त्यानुसार त्यांच्या स्वतःच्या व्यवहारांसह प्रतिसाद देतात. यामुळे तुम्हाला केंद्रीकृत ॲप्लिकेशन्स (कारण सर्व्हर हा एक निकामी होण्याचा बिंदू आहे) लिहिण्यास सक्षम करेल, परंतु ते वेब3 घटकांशी संवाद साधू शकतात. याच तंत्रांचा वापर करून तुम्ही असा एजंट देखील लिहू शकता जो मानवी हस्तक्षेपाशिवाय ऑनचेन घटनांना प्रतिसाद देतो."

author: "ओरी पोमेरँट्झ"
lang: mr
tags: ["एजंट", "सर्व्हर", "ऑफचेन", "dapps"]
skill: beginner
breadcrumb: "सर्व्हर घटक"
published: 2024-07-15
---

## परिचय {#introduction}

बहुतेक प्रकरणांमध्ये, विकेंद्रित ॲप्लिकेशन (dapp) सॉफ्टवेअर वितरित करण्यासाठी सर्व्हरचा वापर करते, परंतु सर्व प्रत्यक्ष संवाद क्लायंट (सामान्यतः, वेब ब्राउझर) आणि ब्लॉकचेन दरम्यान होतो.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

तथापि, काही प्रकरणांमध्ये ॲप्लिकेशनला स्वतंत्रपणे चालणाऱ्या सर्व्हर घटकाचा फायदा होऊ शकतो. असा सर्व्हर घटनांना आणि API सारख्या इतर स्रोतांकडून येणाऱ्या विनंत्यांना व्यवहार जारी करून प्रतिसाद देण्यास सक्षम असेल.

![The interaction with the addition of a server](./fig-2.svg)

असा सर्व्हर पूर्ण करू शकेल अशी अनेक संभाव्य कार्ये आहेत.

- गुप्त स्थितीचा धारक. गेमिंगमध्ये अनेकदा गेमला माहीत असलेली सर्व माहिती खेळाडूंना उपलब्ध नसणे उपयुक्त ठरते. तथापि, _ब्लॉकचेनवर कोणतीही गुपिते नसतात_, ब्लॉकचेनमध्ये असलेली कोणतीही माहिती कोणालाही शोधणे सोपे असते. म्हणून, जर गेमच्या स्थितीचा काही भाग गुप्त ठेवायचा असेल, तर तो इतरत्र संग्रहित केला पाहिजे (आणि शक्यतो त्या स्थितीचे परिणाम [झिरो-नॉलेज प्रुफ्स](/zero-knowledge-proofs) वापरून सत्यापित केले जावेत).

- केंद्रीकृत ओरॅकल. जर धोके पुरेसे कमी असतील, तर एक बाह्य सर्व्हर जो ऑनलाइन काही माहिती वाचतो आणि नंतर ती चेनवर पोस्ट करतो, तो [ओरॅकल](/developers/docs/oracles/) म्हणून वापरण्यासाठी पुरेसा चांगला असू शकतो.

- एजंट. ब्लॉकचेनवर सक्रिय करण्यासाठी व्यवहाराशिवाय काहीही होत नाही. जेव्हा संधी मिळते तेव्हा [आर्बिट्रेज](/developers/docs/mev/#mev-examples-dex-arbitrage) सारख्या क्रिया करण्यासाठी सर्व्हर वापरकर्त्याच्या वतीने कार्य करू शकतो.

## नमुना प्रोग्राम {#sample-program}

तुम्ही [GitHub वर](https://github.com/qbzzt/20240715-server-component) एक नमुना सर्व्हर पाहू शकता. हा सर्व्हर [या कॉन्ट्रॅक्टमधून](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) येणाऱ्या घटना ऐकतो, जे Hardhat च्या Greeter ची सुधारित आवृत्ती आहे. जेव्हा ग्रीटिंग (अभिवादन) बदलले जाते, तेव्हा तो ते परत बदलतो.

ते चालवण्यासाठी:

1. रिपॉझिटरी क्लोन करा.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. आवश्यक पॅकेजेस इन्स्टॉल करा. जर तुमच्याकडे ते आधीपासून नसेल, तर [प्रथम Node इन्स्टॉल करा](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. होल्स्की टेस्टनेटवर ETH असलेल्या खात्याची खाजगी की निर्दिष्ट करण्यासाठी `.env` संपादित करा. जर तुमच्याकडे होल्स्कीवर ETH नसेल, तर तुम्ही [हा फॉसेट वापरू शकता](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. सर्व्हर सुरू करा.

   ```sh copy
   npm start
   ```

5. [ब्लॉक एक्सप्लोररवर](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) जा, आणि खाजगी की असलेल्या पत्त्यापेक्षा वेगळा पत्ता वापरून ग्रीटिंग सुधारा. ग्रीटिंग आपोआप परत सुधारले जाते हे पहा.

### हे कसे काम करते? {#how-it-works}

सर्व्हर घटक कसा लिहायचा हे समजून घेण्याचा सर्वात सोपा मार्ग म्हणजे नमुना ओळीनुसार तपासणे.

#### `src/app.ts` {#src-app-ts}

प्रोग्रामचा बहुतांश भाग [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) मध्ये समाविष्ट आहे.

##### आवश्यक ऑब्जेक्ट्स तयार करणे {#}

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

हे आपल्याला आवश्यक असलेले [Viem](https://viem.sh/) घटक, फंक्शन्स आणि [`Address` प्रकार](https://viem.sh/docs/glossary/types#address) आहेत. हा सर्व्हर [TypeScript](https://www.typescriptlang.org/) मध्ये लिहिला आहे, जो JavaScript चा एक विस्तार आहे ज्यामुळे तो [स्ट्रॉंगली टाईप्ड (strongly typed)](https://en.wikipedia.org/wiki/Strong_and_weak_typing) बनतो.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[हे फंक्शन](https://viem.sh/docs/accounts/privateKey) आपल्याला खाजगी कीशी संबंधित पत्त्यासह वॉलेट माहिती तयार करू देते.

```typescript
import { holesky } from "viem/chains"
```

Viem मध्ये ब्लॉकचेन वापरण्यासाठी तुम्हाला त्याची व्याख्या (definition) इम्पोर्ट करणे आवश्यक आहे. या प्रकरणात, आपल्याला [होल्स्की](https://github.com/eth-clients/holesky) टेस्ट ब्लॉकचेनशी कनेक्ट करायचे आहे.

```typescript
// अशा प्रकारे आपण .env मधील व्याख्या process.env मध्ये जोडतो.
import * as dotenv from "dotenv"
dotenv.config()
```

अशा प्रकारे आपण `.env` ला एन्व्हायरन्मेंटमध्ये वाचतो. आपल्याला खाजगी कीसाठी याची आवश्यकता आहे (पुढे पहा).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

कॉन्ट्रॅक्ट वापरण्यासाठी आपल्याला त्याचा पत्ता आणि त्यासाठी [ABI](/glossary/#abi) आवश्यक आहे. आपण येथे दोन्ही प्रदान करतो.

JavaScript मध्ये (आणि त्यामुळे TypeScript मध्ये) तुम्ही कॉन्स्टंटला (constant) नवीन मूल्य नियुक्त करू शकत नाही, परंतु तुम्ही त्यात संग्रहित केलेला ऑब्जेक्ट सुधारू _शकता_. `as const` प्रत्यय वापरून आपण TypeScript ला सांगत आहोत की यादी स्वतःच कॉन्स्टंट आहे आणि ती बदलली जाऊ शकत नाही.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Viem [पब्लिक क्लायंट](https://viem.sh/docs/clients/public.html) तयार करा. पब्लिक क्लायंट्सना खाजगी की जोडलेली नसते, आणि त्यामुळे ते व्यवहार पाठवू शकत नाहीत. ते [`view` फंक्शन्स](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) कॉल करू शकतात, खात्यातील शिल्लक वाचू शकतात, इ.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

एन्व्हायरन्मेंट व्हेरिएबल्स [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) मध्ये उपलब्ध आहेत. तथापि, TypeScript स्ट्रॉंगली टाईप्ड आहे. एन्व्हायरन्मेंट व्हेरिएबल कोणतीही स्ट्रिंग असू शकते, किंवा रिक्त असू शकते, त्यामुळे एन्व्हायरन्मेंट व्हेरिएबलचा प्रकार `string | undefined` आहे. तथापि, Viem मध्ये की `0x${string}` (`0x` आणि त्यानंतर स्ट्रिंग) म्हणून परिभाषित केली आहे. येथे आपण TypeScript ला सांगतो की `PRIVATE_KEY` एन्व्हायरन्मेंट व्हेरिएबल त्या प्रकारचा असेल. जर तसे नसेल, तर आपल्याला रनटाइम एरर मिळेल.

त्यानंतर [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) फंक्शन संपूर्ण खाते ऑब्जेक्ट तयार करण्यासाठी या खाजगी कीचा वापर करते.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

पुढे, आपण [वॉलेट क्लायंट](https://viem.sh/docs/clients/wallet) तयार करण्यासाठी खाते ऑब्जेक्ट वापरतो. या क्लायंटकडे खाजगी की आणि पत्ता असतो, त्यामुळे त्याचा वापर व्यवहार पाठवण्यासाठी केला जाऊ शकतो.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

आता आपल्याकडे सर्व पूर्वअटी असल्याने, आपण शेवटी [कॉन्ट्रॅक्ट इन्स्टन्स](https://viem.sh/docs/contract/getContract) तयार करू शकतो. आपण या कॉन्ट्रॅक्ट इन्स्टन्सचा वापर ऑनचेन कॉन्ट्रॅक्टशी संवाद साधण्यासाठी करू.

##### ब्लॉकचेनवरून वाचणे {#}

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

केवळ वाचण्यायोग्य (read only) असलेली कॉन्ट्रॅक्ट फंक्शन्स ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) आणि [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` अंतर्गत उपलब्ध आहेत. या प्रकरणात, आपण त्याचा वापर [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) फंक्शन ॲक्सेस करण्यासाठी करतो, जे ग्रीटिंग परत करते.

JavaScript सिंगल-थ्रेडेड आहे, त्यामुळे जेव्हा आपण दीर्घकाळ चालणारी प्रक्रिया सुरू करतो तेव्हा आपल्याला [ती असिंक्रोनसपणे (asynchronously) करत असल्याचे निर्दिष्ट करणे](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE) आवश्यक असते. ब्लॉकचेनला कॉल करण्यासाठी, अगदी केवळ वाचण्यायोग्य ऑपरेशनसाठीही, संगणक आणि ब्लॉकचेन नोड दरम्यान राऊंड-ट्रिप आवश्यक असते. याच कारणामुळे आपण येथे निर्दिष्ट करतो की कोडला परिणामासाठी `await` करणे आवश्यक आहे.

जर तुम्हाला हे कसे काम करते यात स्वारस्य असेल तर तुम्ही [त्याबद्दल येथे वाचू शकता](https://www.w3schools.com/js/js_promise.asp), परंतु व्यावहारिकदृष्ट्या तुम्हाला फक्त एवढेच माहीत असणे आवश्यक आहे की जर तुम्ही जास्त वेळ घेणारे ऑपरेशन सुरू केले तर तुम्ही परिणामांची `await` करता, आणि असे करणाऱ्या कोणत्याही फंक्शनला `async` म्हणून घोषित करणे आवश्यक आहे.

##### व्यवहार जारी करणे {#}

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

ग्रीटिंग बदलणारा व्यवहार जारी करण्यासाठी तुम्ही हे फंक्शन कॉल करता. हे एक दीर्घ ऑपरेशन असल्याने, फंक्शन `async` म्हणून घोषित केले आहे. अंतर्गत अंमलबजावणीमुळे, कोणत्याही `async` फंक्शनला `Promise` ऑब्जेक्ट परत करणे आवश्यक असते. या प्रकरणात, `Promise<any>` चा अर्थ असा आहे की आपण `Promise` मध्ये नेमके काय परत केले जाईल हे निर्दिष्ट करत नाही.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

कॉन्ट्रॅक्ट इन्स्टन्सच्या `write` फील्डमध्ये ब्लॉकचेन स्थितीवर लिहिणारी सर्व फंक्शन्स (ज्यांसाठी व्यवहार पाठवणे आवश्यक आहे) असतात, जसे की [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). पॅरामीटर्स, जर काही असतील तर, यादी म्हणून प्रदान केले जातात, आणि फंक्शन व्यवहाराचा हॅश परत करते.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

व्यवहाराचा हॅश नोंदवा (तो पाहण्यासाठी ब्लॉक एक्सप्लोररच्या URL चा भाग म्हणून) आणि तो परत करा.

##### घटनांना प्रतिसाद देणे {#}

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` फंक्शन](https://viem.sh/docs/actions/public/watchEvent) तुम्हाला एखादी घटना उत्सर्जित झाल्यावर कोणते फंक्शन चालवायचे हे निर्दिष्ट करू देते. जर तुम्हाला फक्त एका प्रकारच्या घटनेची काळजी असेल (या प्रकरणात, `SetGreeting`), तर तुम्ही स्वतःला त्या घटना प्रकारापुरते मर्यादित ठेवण्यासाठी या सिंटॅक्सचा वापर करू शकता.

```typescript
    onLogs: logs => {
```

जेव्हा नोंद (log) एंट्रीज असतात तेव्हा `onLogs` फंक्शन कॉल केले जाते. इथेरियममध्ये "नोंद" आणि "घटना" सामान्यतः अदलाबदल करण्यायोग्य असतात.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

अनेक घटना असू शकतात, परंतु सोपेपणासाठी आपण फक्त पहिल्या घटनेची काळजी घेतो. `logs[0].args` हे घटनेचे आर्ग्युमेंट्स आहेत, या प्रकरणात `sender` आणि `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

जर प्रेषक हा सर्व्हर _नसेल_, तर ग्रीटिंग बदलण्यासाठी `setGreeting` वापरा.

#### `package.json` {#package-json}

[ही फाईल](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) कॉन्फिगरेशन नियंत्रित करते. हा लेख फक्त महत्त्वाच्या व्याख्या स्पष्ट करतो.

```json
{
  "main": "dist/index.js",
```

ही व्याख्या कोणती JavaScript फाईल चालवायची हे निर्दिष्ट करते.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

स्क्रिप्ट्स या विविध ॲप्लिकेशन क्रिया आहेत. या प्रकरणात, आपल्याकडे फक्त `start` आहे, जे सर्व्हर संकलित (compile) करते आणि नंतर चालवते. `tsc` कमांड `typescript` पॅकेजचा भाग आहे आणि TypeScript ला JavaScript मध्ये संकलित करते. जर तुम्हाला ते मॅन्युअली चालवायचे असेल, तर ते `node_modules/.bin` मध्ये स्थित आहे. दुसरी कमांड सर्व्हर चालवते.

```json
  "type": "module",
```

JavaScript नोड ॲप्लिकेशन्सचे अनेक प्रकार आहेत. `module` प्रकार आपल्याला टॉप लेव्हल कोडमध्ये `await` ठेवू देतो, जे तुम्ही संथ (आणि त्यामुळे असिंक्रोनस) ऑपरेशन्स करता तेव्हा महत्त्वाचे असते.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

ही अशी पॅकेजेस आहेत जी फक्त डेव्हलपमेंटसाठी आवश्यक आहेत. येथे आपल्याला `typescript` ची आवश्यकता आहे आणि आपण ते Node.js सोबत वापरत असल्यामुळे, आपल्याला नोड व्हेरिएबल्स आणि ऑब्जेक्ट्सचे प्रकार देखील मिळत आहेत, जसे की `process`. [`^<version>` नोटेशनचा](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) अर्थ ती आवृत्ती किंवा त्याहून उच्च आवृत्ती ज्यामध्ये ब्रेकिंग बदल नाहीत असा होतो. आवृत्ती क्रमांकांच्या अर्थाबद्दल अधिक माहितीसाठी [येथे](https://semver.org) पहा.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

ही अशी पॅकेजेस आहेत जी रनटाइमच्या वेळी, `dist/app.js` चालवताना आवश्यक असतात.

## निष्कर्ष {#conclusion}

आपण येथे तयार केलेला केंद्रीकृत सर्व्हर त्याचे काम करतो, जे वापरकर्त्यासाठी एजंट म्हणून कार्य करणे हे आहे. इतर कोणीही ज्याला विकेंद्रित ॲप्लिकेशन (dapp) कार्य करत राहावे असे वाटते आणि जो गॅस खर्च करण्यास तयार आहे, तो स्वतःच्या पत्त्यासह सर्व्हरचा नवीन इन्स्टन्स चालवू शकतो.

तथापि, हे तेव्हाच काम करते जेव्हा केंद्रीकृत सर्व्हरच्या क्रिया सहजपणे सत्यापित केल्या जाऊ शकतात. जर केंद्रीकृत सर्व्हरकडे कोणतीही गुप्त स्थिती माहिती असेल, किंवा तो कठीण आकडेमोड करत असेल, तर ती एक केंद्रीकृत संस्था आहे ज्यावर तुम्हाला ॲप्लिकेशन वापरण्यासाठी विश्वास ठेवणे आवश्यक आहे, जे नेमके ब्लॉकचेन टाळण्याचा प्रयत्न करतात. भविष्यातील लेखात मी या समस्येवर मात करण्यासाठी [झिरो-नॉलेज प्रुफ्स](/zero-knowledge-proofs) कसे वापरावे हे दाखवण्याची योजना आखत आहे.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).