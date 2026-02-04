---
title: "वेब3 ॲप्ससाठी सर्व्हर घटक आणि एजंट"
description: "हे ट्यूटोरियल वाचल्यानंतर, तुम्ही TypeScript सर्व्हर लिहिण्यास सक्षम व्हाल जे ब्लॉकचेनवरील इव्हेंट ऐकतात आणि त्यानुसार त्यांच्या स्वतःच्या व्यवहारांसह प्रतिसाद देतात. हे तुम्हाला केंद्रीकृत ॲप्लिकेशन्स (कारण सर्व्हर एक अयशस्वी होण्याचा बिंदू आहे) लिहिण्यास सक्षम करेल, परंतु ते वेब3 घटकांशी संवाद साधू शकतात. हेच तंत्र मानवी हस्तक्षेपाशिवाय ऑनचेन इव्हेंटला प्रतिसाद देणारा एजंट लिहिण्यासाठी देखील वापरले जाऊ शकते."

author: "ओरी पोमेरँट्झ"
lang: mr
tags: [ "एजंट", "सर्व्हर", "ऑफचेन" ]
skill: beginner
published: 2024-07-15
---

## प्रस्तावना {#introduction}

बहुतेक प्रकरणांमध्ये, विकेंद्रित ॲप सॉफ्टवेअर वितरित करण्यासाठी सर्व्हर वापरतो, परंतु सर्व वास्तविक संवाद क्लायंट (सामान्यतः, वेब ब्राउझर) आणि ब्लॉकचेन दरम्यान होतो.

![वेब सर्व्हर, क्लायंट आणि ब्लॉकचेनमधील सामान्य संवाद](./fig-1.svg)

तथापि, अशी काही प्रकरणे आहेत जिथे ॲप्लिकेशनला स्वतंत्रपणे चालणाऱ्या सर्व्हर घटकाचा फायदा होईल. असा सर्व्हर इव्हेंटला आणि API सारख्या इतर स्त्रोतांकडून येणाऱ्या विनंत्यांना व्यवहार जारी करून प्रतिसाद देण्यास सक्षम असेल.

![सर्व्हरच्या समावेशासह संवाद](./fig-2.svg)

अशी अनेक संभाव्य कार्ये आहेत जी असा सर्व्हर पूर्ण करू शकतो.

- गुप्त स्थितीचा धारक. गेमिंगमध्ये हे बऱ्याचदा उपयुक्त असते की गेमला माहित असलेली सर्व माहिती खेळाडूंसाठी उपलब्ध नसावी. तथापि, _ब्लॉकचेनवर कोणतीही रहस्ये नसतात_, ब्लॉकचेनमध्ये असलेली कोणतीही माहिती कोणालाही समजणे सोपे आहे. म्हणून, जर खेळाच्या स्थितीचा काही भाग गुप्त ठेवायचा असेल, तर तो इतरत्र संग्रहित करावा लागेल (आणि शक्यतो त्या स्थितीचे परिणाम [झिरो-नॉलेज प्रुफ्स](/zero-knowledge-proofs) वापरून सत्यापित करावे लागतील).

- केंद्रीकृत ओरॅकल. जर स्टेक (दाव) पुरेसा कमी असेल, तर ऑनलाइन काही माहिती वाचून ती चेनवर पोस्ट करणारा बाह्य सर्व्हर [ओरॅकल](/developers/docs/oracles/) म्हणून वापरण्यासाठी पुरेसा चांगला असू शकतो.

- एजंट. त्याला सक्रिय करण्यासाठी व्यवहाराशिवाय ब्लॉकचेनवर काहीही घडत नाही. जेव्हा संधी मिळेल तेव्हा एक सर्व्हर वापरकर्त्याच्या वतीने [आर्बिट्राज](/developers/docs/mev/#mev-examples-dex-arbitrage) सारख्या क्रिया करण्यासाठी कार्य करू शकतो.

## नमुना कार्यक्रम {#sample-program}

तुम्ही एक नमुना सर्व्हर [github वर](https://github.com/qbzzt/20240715-server-component) पाहू शकता. हा सर्व्हर [या करारावरून](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) येणारे इव्हेंट ऐकतो, जी Hardhat च्या Greeter ची सुधारित आवृत्ती आहे. जेव्हा ग्रीटिंग बदलले जाते, तेव्हा ते पुन्हा पूर्ववत करते.

ते चालवण्यासाठी:

1. रिपॉझिटरी क्लोन करा.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. आवश्यक पॅकेजेस इंस्टॉल करा. जर तुमच्याकडे आधीपासून नसेल, तर [प्रथम Node इन्स्टॉल करा](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Holesky टेस्टनेटवर ETH असलेल्या खात्याची खाजगी की निर्दिष्ट करण्यासाठी `.env` संपादित करा. जर तुमच्याकडे Holesky वर ETH नसेल, तर तुम्ही [हा फॉसेट वापरू शकता](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. सर्व्हर सुरू करा.

   ```sh copy
   npm start
   ```

5. [ब्लॉक एक्सप्लोररवर](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) जा, आणि खाजगी की असलेल्या पत्त्यापेक्षा वेगळा पत्ता वापरून ग्रीटिंगमध्ये बदल करा. पहा की ग्रीटिंग आपोआप पूर्ववत होते.

### हे कसे कार्य करते? {#how-it-works}

सर्व्हर घटक कसा लिहायचा हे समजून घेण्याचा सर्वात सोपा मार्ग म्हणजे नमुन्याचा ओळीनुसार अभ्यास करणे.

#### `src/app.ts` {#src-app-ts}

कार्यक्रमाचा बहुतांश भाग [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) मध्ये समाविष्ट आहे.

##### पूर्वापेक्षित ऑब्जेक्ट्स तयार करणे

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

हे आपल्याला आवश्यक असलेले [Viem](https://viem.sh/) घटक आहेत, फंक्शन्स आणि [`Address` प्रकार](https://viem.sh/docs/glossary/types#address). हा सर्व्हर [TypeScript](https://www.typescriptlang.org/) मध्ये लिहिला आहे, जो JavaScript चा एक विस्तार आहे आणि त्याला [स्ट्रॉंगली टाइप्ड](https://en.wikipedia.org/wiki/Strong_and_weak_typing) बनवतो.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[हे फंक्शन](https://viem.sh/docs/accounts/privateKey) आपल्याला खाजगी की शी संबंधित वॉलेट माहिती, पत्त्यासह, तयार करू देते.

```typescript
import { holesky } from "viem/chains"
```

Viem मध्ये ब्लॉकचेन वापरण्यासाठी, तुम्हाला त्याची व्याख्या आयात करणे आवश्यक आहे. या प्रकरणात, आम्हाला [Holesky](https://github.com/eth-clients/holesky) चाचणी ब्लॉकचेनशी कनेक्ट करायचे आहे.

```typescript
// .env मधील व्याख्या process.env मध्ये जोडण्याची ही पद्धत आहे.
import * as dotenv from "dotenv"
dotenv.config()
```

या प्रकारे आपण `.env` एन्व्हायरमेंटमध्ये वाचतो. खाजगी की साठी आपल्याला याची गरज आहे (पुढे पहा).

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

एखादा करार वापरण्यासाठी आपल्याला त्याचा पत्ता आणि त्यासाठी [ABI](/glossary/#abi) आवश्यक आहे. आम्ही येथे दोन्ही प्रदान करतो.

JavaScript (आणि त्यामुळे TypeScript) मध्ये, तुम्ही एका कॉन्स्टंटला नवीन मूल्य देऊ शकत नाही, परंतु तुम्ही त्यात संग्रहित ऑब्जेक्टमध्ये _बदल_ करू शकता. `as const` प्रत्यय वापरून, आपण TypeScript ला सांगत आहोत की ही यादी स्वतःच स्थिर आहे आणि ती बदलली जाऊ शकत नाही.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

एक Viem [पब्लिक क्लायंट](https://viem.sh/docs/clients/public.html) तयार करा. पब्लिक क्लायंटकडे संलग्न खाजगी की नसते, आणि म्हणून ते व्यवहार पाठवू शकत नाहीत. ते [`view` फंक्शन्स](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) कॉल करू शकतात, खात्यातील शिल्लक वाचू शकतात, इत्यादी.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

एन्व्हायरमेंट व्हेरिएबल्स [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) मध्ये उपलब्ध आहेत. तथापि, TypeScript स्ट्रॉंगली टाइप्ड आहे. एक एन्व्हायरमेंट व्हेरिएबल कोणतीही स्ट्रिंग किंवा रिक्त असू शकते, म्हणून एन्व्हायरमेंट व्हेरिएबलसाठी प्रकार `string | undefined` आहे. तथापि, Viem मध्ये की `0x${string}` (`0x` नंतर एक स्ट्रिंग) म्हणून परिभाषित केली आहे. येथे आपण TypeScript ला सांगतो की `PRIVATE_KEY` एन्व्हायरमेंट व्हेरिएबल त्या प्रकारचा असेल. जर तो तसा नसेल, तर आपल्याला रनटाइम त्रुटी मिळेल.

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) फंक्शन नंतर या खाजगी की चा वापर करून एक पूर्ण खाते ऑब्जेक्ट तयार करते.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

पुढे, आपण खाते ऑब्जेक्टचा वापर करून [वॉलेट क्लायंट](https://viem.sh/docs/clients/wallet) तयार करतो. या क्लायंटकडे एक खाजगी की आणि एक पत्ता आहे, म्हणून त्याचा उपयोग व्यवहार पाठवण्यासाठी केला जाऊ शकतो.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

आता आपल्याकडे सर्व पूर्वतयारी असल्याने, आपण अखेरीस [करार उदाहरण](https://viem.sh/docs/contract/getContract) तयार करू शकतो. आम्ही या करार उदाहरणाचा उपयोग ऑनचेन कराराशी संवाद साधण्यासाठी करू.

##### ब्लॉकचेनवरून वाचणे

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

फक्त वाचता येणारी करार फंक्शन्स ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) आणि [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` अंतर्गत उपलब्ध आहेत. या प्रकरणात, आम्ही ते [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) फंक्शनमध्ये प्रवेश करण्यासाठी वापरतो, जे ग्रीटिंग परत करते.

JavaScript सिंगल-थ्रेडेड आहे, म्हणून जेव्हा आपण एक दीर्घ चालणारी प्रक्रिया सुरू करतो, तेव्हा आपल्याला [ती एसिंक्रोनसपणे करत आहोत हे निर्दिष्ट करणे](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE) आवश्यक आहे. ब्लॉकचेनला कॉल करणे, जरी ते फक्त वाचन ऑपरेशनसाठी असले तरी, संगणक आणि ब्लॉकचेन नोड यांच्यात एक फेरी-ट्रिप आवश्यक असते. याच कारणास्तव आम्ही येथे निर्दिष्ट करतो की कोडला निकालाची `await` (प्रतीक्षा) करणे आवश्यक आहे.

जर तुम्हाला हे कसे कार्य करते यात स्वारस्य असेल तर तुम्ही [येथे त्याबद्दल वाचू शकता](https://www.w3schools.com/js/js_promise.asp), परंतु व्यावहारिकदृष्ट्या तुम्हाला फक्त एवढेच माहित असणे आवश्यक आहे की जर तुम्ही दीर्घकाळ चालणारी क्रिया सुरू केली तर तुम्ही परिणामांसाठी `await` करता, आणि असे करणारे कोणतेही फंक्शन `async` म्हणून घोषित केले पाहिजे.

##### व्यवहार जारी करणे

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

ग्रीटिंग बदलणाऱ्या व्यवहाराला जारी करण्यासाठी तुम्ही हे फंक्शन कॉल करता. कारण ही एक दीर्घ क्रिया आहे, त्यामुळे हे फंक्शन `async` म्हणून घोषित केले आहे. अंतर्गत अंमलबजावणीमुळे, कोणत्याही `async` फंक्शनला `Promise` ऑब्जेक्ट परत करणे आवश्यक आहे. या प्रकरणात, `Promise<any>` म्हणजे आपण `Promise` मध्ये नेमके काय परत येईल हे निर्दिष्ट करत नाही.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

करार उदाहरणाच्या `write` फील्डमध्ये ब्लॉकचेनच्या स्थितीमध्ये लिहिणारी सर्व फंक्शन्स आहेत (ज्यांना व्यवहार पाठवणे आवश्यक आहे), जसे की [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). पॅरामीटर्स, जर असतील तर, एका यादीच्या स्वरूपात प्रदान केले जातात, आणि फंक्शन व्यवहाराचा हॅश परत करते.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

व्यवहाराचा हॅश (तो पाहण्यासाठी ब्लॉक एक्सप्लोररच्या URL चा एक भाग म्हणून) कळवा आणि तो परत करा.

##### इव्हेंटला प्रतिसाद देणे

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` फंक्शन](https://viem.sh/docs/actions/public/watchEvent) तुम्हाला हे निर्दिष्ट करू देते की एखादा इव्हेंट उत्सर्जित झाल्यावर एक फंक्शन चालवले जाईल. जर तुम्हाला फक्त एकाच प्रकारच्या इव्हेंटची (या प्रकरणात, `SetGreeting`) काळजी असेल, तर तुम्ही स्वतःला त्या इव्हेंट प्रकारापुरते मर्यादित ठेवण्यासाठी या सिंटॅक्सचा वापर करू शकता.

```typescript
    onLogs: logs => {
```

जेव्हा लॉग नोंदी असतात तेव्हा `onLogs` फंक्शन कॉल केले जाते. Ethereum मध्ये 'लॉग' आणि 'इव्हेंट' सहसा एकमेकांऐवजी वापरले जातात.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

अनेक इव्हेंट असू शकतात, परंतु साधेपणासाठी आम्ही फक्त पहिल्याची काळजी घेतो. `logs[0].args` हे इव्हेंटचे आर्ग्युमेंट आहेत, या प्रकरणात `sender` आणि `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

जर प्रेषक _हा_ सर्व्हर नसेल, तर ग्रीटिंग बदलण्यासाठी `setGreeting` वापरा.

#### `package.json` {#package-json}

[ही फाइल](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) कॉन्फिगरेशन नियंत्रित करते. हा लेख फक्त महत्त्वाच्या व्याख्या स्पष्ट करतो.

```json
{
  "main": "dist/index.js",
```

ही व्याख्या कोणती JavaScript फाइल चालवायची हे निर्दिष्ट करते.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

स्क्रिप्ट्स विविध ॲप्लिकेशन क्रिया आहेत. या प्रकरणात, आपल्याकडे फक्त `start` आहे, जे सर्व्हरला संकलित करते आणि नंतर चालवते. `tsc` कमांड `typescript` पॅकेजचा भाग आहे आणि TypeScript ला JavaScript मध्ये संकलित करते. जर तुम्हाला ते मॅन्युअली चालवायचे असेल, तर ते `node_modules/.bin` मध्ये स्थित आहे. दुसरी कमांड सर्व्हर चालवते.

```json
  "type": "module",
```

JavaScript नोड ॲप्लिकेशन्सचे अनेक प्रकार आहेत. `module` प्रकार आपल्याला टॉप लेव्हल कोडमध्ये `await` वापरण्याची परवानगी देतो, जे तुम्ही धीम्या (आणि त्यामुळे एसिंक्रोनस) क्रिया करत असताना महत्त्वाचे असते.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

हे पॅकेजेस आहेत जे केवळ डेव्हलपमेंटसाठी आवश्यक आहेत. येथे आपल्याला `typescript` ची गरज आहे आणि कारण आपण ते Node.js सोबत वापरत आहोत, त्यामुळे आपल्याला नोड व्हेरिएबल्स आणि `process` सारख्या ऑब्जेक्ट्सचे प्रकार देखील मिळत आहेत. [`^<version>` नोटेशन](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) म्हणजे ती आवृत्ती किंवा त्याहून उच्च आवृत्ती ज्यात ब्रेकिंग बदल नाहीत. आवृत्ती क्रमांकांच्या अर्थाबद्दल अधिक माहितीसाठी [येथे](https://semver.org) पहा.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

हे पॅकेजेस आहेत जे रनटाइमवेळी, `dist/app.js` चालवताना आवश्यक आहेत.

## निष्कर्ष {#conclusion}

आम्ही येथे तयार केलेला केंद्रीकृत सर्व्हर त्याचे काम करतो, जे वापरकर्त्यासाठी एजंट म्हणून काम करणे आहे. इतर कोणीही ज्याला डॅप (dapp) कार्यरत ठेवायचे आहे आणि गॅस खर्च करण्यास इच्छुक आहे, तो सर्व्हरची नवीन इन्स्टन्स स्वतःच्या पत्त्यासह चालवू शकतो.

तथापि, हे तेव्हाच कार्य करते जेव्हा केंद्रीकृत सर्व्हरच्या क्रिया सहजपणे सत्यापित केल्या जाऊ शकतात. जर केंद्रीकृत सर्व्हरकडे कोणतीही गुप्त स्थिती माहिती असेल किंवा तो कठीण गणना करत असेल, तर तो एक केंद्रीकृत घटक आहे ज्यावर ॲप्लिकेशन वापरण्यासाठी तुम्हाला विश्वास ठेवण्याची गरज आहे, जे नेमके ब्लॉकचेन टाळण्याचा प्रयत्न करतात. भविष्यातील लेखात, मी या समस्येवर मात करण्यासाठी [झिरो-नॉलेज प्रुफ्स](/zero-knowledge-proofs) कसे वापरावे हे दाखवण्याची योजना आखत आहे.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).
