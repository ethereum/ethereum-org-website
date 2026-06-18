---
title: "web3 ऐप्स के लिए सर्वर कंपोनेंट्स और एजेंट्स"
description: "इस ट्यूटोरियल को पढ़ने के बाद, आप ऐसे TypeScript सर्वर लिखने में सक्षम होंगे जो ब्लॉकचेन पर घटनाओं को सुनते हैं और अपने स्वयं के लेन-देन के साथ तदनुसार प्रतिक्रिया देते हैं। यह आपको केंद्रीकृत एप्लिकेशन लिखने में सक्षम करेगा (क्योंकि सर्वर विफलता का एक बिंदु है), लेकिन web3 संस्थाओं के साथ इंटरैक्ट कर सकता है। इन्हीं तकनीकों का उपयोग एक ऐसा एजेंट लिखने के लिए भी किया जा सकता है जो बिना किसी मानवीय हस्तक्षेप के ऑनचेन घटनाओं पर प्रतिक्रिया करता है।"
author: "ओरी पोमेरेंट्ज़"
lang: hi
tags:
  - "एजेंट"
  - "सर्वर"
  - "ऑफ़चेन"
  - "dapps"
skill: beginner
breadcrumb: "सर्वर कंपोनेंट्स"
published: 2024-07-15
---

## परिचय {#introduction}

ज्यादातर मामलों में, एक विकेंद्रीकृत एप्लिकेशन (dapp) सॉफ़्टवेयर वितरित करने के लिए एक सर्वर का उपयोग करता है, लेकिन सभी वास्तविक इंटरैक्शन क्लाइंट (आमतौर पर, वेब ब्राउज़र) और ब्लॉकचेन के बीच होते हैं।

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

हालाँकि, कुछ ऐसे मामले हैं जहाँ किसी एप्लिकेशन को स्वतंत्र रूप से चलने वाले सर्वर कंपोनेंट से लाभ होगा। ऐसा सर्वर लेन-देन जारी करके घटनाओं (events) और API जैसे अन्य स्रोतों से आने वाले अनुरोधों का जवाब देने में सक्षम होगा।

![The interaction with the addition of a server](./fig-2.svg)

ऐसे सर्वर के लिए कई संभावित कार्य हो सकते हैं जिन्हें वह पूरा कर सकता है।

- गुप्त स्थिति का धारक। गेमिंग में अक्सर यह उपयोगी होता है कि गेम को पता सारी जानकारी खिलाड़ियों के लिए उपलब्ध न हो। हालाँकि, _ब्लॉकचेन पर कोई रहस्य नहीं होते हैं_, ब्लॉकचेन में मौजूद किसी भी जानकारी का पता लगाना किसी के लिए भी आसान है। इसलिए, यदि गेम की स्थिति के किसी हिस्से को गुप्त रखा जाना है, तो इसे कहीं और संग्रहीत किया जाना चाहिए (और संभवतः [शून्य-ज्ञान प्रमाणों](/zero-knowledge-proofs) का उपयोग करके उस स्थिति के प्रभावों को सत्यापित किया जाना चाहिए)।

- केंद्रीकृत ऑरेकल। यदि दांव पर्याप्त रूप से कम हैं, तो एक बाहरी सर्वर जो ऑनलाइन कुछ जानकारी पढ़ता है और फिर उसे चेन पर पोस्ट करता है, उसे [ऑरेकल](/developers/docs/oracles/) के रूप में उपयोग करने के लिए पर्याप्त माना जा सकता है।

- एजेंट। ब्लॉकचेन पर इसे सक्रिय करने के लिए लेन-देन के बिना कुछ नहीं होता है। अवसर मिलने पर एक सर्वर उपयोगकर्ता की ओर से [आर्बिट्रेज (arbitrage)](/developers/docs/mev/#mev-examples-dex-arbitrage) जैसी क्रियाएं करने के लिए कार्य कर सकता है।

## नमूना प्रोग्राम {#sample-program}

आप GitHub पर एक नमूना सर्वर [देख सकते हैं](https://github.com/qbzzt/20240715-server-component)। यह सर्वर [इस अनुबंध](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) से आने वाली घटनाओं को सुनता है, जो Hardhat के Greeter का एक संशोधित संस्करण है। जब अभिवादन बदला जाता है, तो यह उसे वापस बदल देता है।

इसे चलाने के लिए:

1. रिपॉजिटरी को क्लोन करें।

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. आवश्यक पैकेज इंस्टॉल करें। यदि आपके पास यह पहले से नहीं है, तो [पहले Node इंस्टॉल करें](https://nodejs.org/en/download/package-manager)।

   ```sh copy
   npm install
   ```

3. होलेस्की टेस्टनेट पर ETH वाले खाते की निजी कुंजी निर्दिष्ट करने के लिए `.env` को संपादित करें। यदि आपके पास होलेस्की पर ETH नहीं है, तो आप [इस फॉसेट का उपयोग कर सकते हैं](https://holesky-faucet.pk910.de/)।

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. सर्वर प्रारंभ करें।

   ```sh copy
   npm start
   ```

5. [एक ब्लॉक एक्सप्लोरर](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) पर जाएं, और निजी कुंजी वाले पते से भिन्न पते का उपयोग करके अभिवादन को संशोधित करें। देखें कि अभिवादन स्वचालित रूप से वापस संशोधित हो जाता है।

### यह कैसे काम करता है? {#how-it-works}

सर्वर कंपोनेंट कैसे लिखना है, यह समझने का सबसे आसान तरीका नमूने को पंक्ति दर पंक्ति देखना है।

#### `src/app.ts` {#src-app-ts}

प्रोग्राम का अधिकांश भाग [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) में समाहित है।

##### पूर्वापेक्षित ऑब्जेक्ट्स बनाना {#}

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

ये वे [Viem](https://viem.sh/) संस्थाएं हैं जिनकी हमें आवश्यकता है, फ़ंक्शंस और [`Address` प्रकार](https://viem.sh/docs/glossary/types#address)। यह सर्वर [TypeScript](https://www.typescriptlang.org/) में लिखा गया है, जो JavaScript का एक एक्सटेंशन है जो इसे [स्ट्रॉन्गली टाइप्ड](https://en.wikipedia.org/wiki/Strong_and_weak_typing) बनाता है।

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[यह फ़ंक्शन](https://viem.sh/docs/accounts/privateKey) हमें एक निजी कुंजी के अनुरूप पते सहित वॉलेट जानकारी उत्पन्न करने देता है।

```typescript
import { holesky } from "viem/chains"
```

Viem में ब्लॉकचेन का उपयोग करने के लिए आपको इसकी परिभाषा आयात करनी होगी। इस मामले में, हम [होलेस्की](https://github.com/eth-clients/holesky) टेस्ट ब्लॉकचेन से जुड़ना चाहते हैं।

```typescript
// इस तरह हम .env में परिभाषाओं को process.env में जोड़ते हैं।
import * as dotenv from "dotenv"
dotenv.config()
```

इस तरह हम पर्यावरण में `.env` पढ़ते हैं। हमें निजी कुंजी के लिए इसकी आवश्यकता है (बाद में देखें)।

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

किसी अनुबंध का उपयोग करने के लिए हमें उसके पते और उसके लिए [ABI](/glossary/#abi) की आवश्यकता होती है। हम यहाँ दोनों प्रदान करते हैं।

JavaScript (और इसलिए TypeScript) में आप किसी स्थिरांक को नया मान नहीं दे सकते, लेकिन आप उसमें संग्रहीत ऑब्जेक्ट को संशोधित _कर सकते हैं_। `as const` प्रत्यय का उपयोग करके हम TypeScript को बता रहे हैं कि सूची स्वयं स्थिर है और इसे बदला नहीं जा सकता है।

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

एक Viem [सार्वजनिक क्लाइंट](https://viem.sh/docs/clients/public.html) बनाएँ। सार्वजनिक क्लाइंट्स के पास कोई संलग्न निजी कुंजी नहीं होती है, और इसलिए वे लेन-देन नहीं भेज सकते हैं। वे [`view` फ़ंक्शंस](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) को कॉल कर सकते हैं, खाते का बैलेंस पढ़ सकते हैं, आदि।

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

पर्यावरण चर [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) में उपलब्ध हैं। हालाँकि, TypeScript स्ट्रॉन्गली टाइप्ड है। एक पर्यावरण चर कोई भी स्ट्रिंग हो सकता है, या खाली हो सकता है, इसलिए पर्यावरण चर के लिए प्रकार `string | undefined` है। हालाँकि, Viem में एक कुंजी को `0x${string}` (`0x` के बाद एक स्ट्रिंग) के रूप में परिभाषित किया गया है। यहाँ हम TypeScript को बताते हैं कि `PRIVATE_KEY` पर्यावरण चर उस प्रकार का होगा। यदि ऐसा नहीं है, तो हमें रनटाइम त्रुटि मिलेगी।

फिर [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) फ़ंक्शन एक पूर्ण खाता ऑब्जेक्ट बनाने के लिए इस निजी कुंजी का उपयोग करता है।

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

इसके बाद, हम [वॉलेट क्लाइंट](https://viem.sh/docs/clients/wallet) बनाने के लिए खाता ऑब्जेक्ट का उपयोग करते हैं। इस क्लाइंट के पास एक निजी कुंजी और एक पता होता है, इसलिए इसका उपयोग लेन-देन भेजने के लिए किया जा सकता है।

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

अब जब हमारे पास सभी पूर्वापेक्षाएँ हैं, तो हम अंततः एक [अनुबंध इंस्टेंस](https://viem.sh/docs/contract/getContract) बना सकते हैं। हम ऑनचेन अनुबंध के साथ संवाद करने के लिए इस अनुबंध इंस्टेंस का उपयोग करेंगे।

##### ब्लॉकचेन से पढ़ना {#}

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

अनुबंध फ़ंक्शंस जो केवल पढ़ने के लिए हैं ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) और [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` के अंतर्गत उपलब्ध हैं। इस मामले में, हम इसका उपयोग [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) फ़ंक्शन तक पहुँचने के लिए करते हैं, जो अभिवादन लौटाता है।

JavaScript सिंगल-थ्रेडेड है, इसलिए जब हम एक लंबी चलने वाली प्रक्रिया शुरू करते हैं तो हमें [यह निर्दिष्ट करने की आवश्यकता होती है कि हम इसे एसिंक्रोनस रूप से करते हैं](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)। ब्लॉकचेन को कॉल करने के लिए, यहाँ तक कि केवल पढ़ने के संचालन के लिए भी, कंप्यूटर और ब्लॉकचेन नोड के बीच एक राउंड-ट्रिप की आवश्यकता होती है। यही कारण है कि हम यहाँ निर्दिष्ट करते हैं कि कोड को परिणाम के लिए `await` करने की आवश्यकता है।

यदि आप इसमें रुचि रखते हैं कि यह कैसे काम करता है तो आप [इसके बारे में यहाँ पढ़ सकते हैं](https://www.w3schools.com/js/js_promise.asp), लेकिन व्यावहारिक रूप से आपको बस इतना जानने की आवश्यकता है कि यदि आप कोई ऐसा ऑपरेशन शुरू करते हैं जिसमें लंबा समय लगता है तो आप परिणामों की `await` करते हैं, और ऐसा करने वाले किसी भी फ़ंक्शन को `async` के रूप में घोषित किया जाना चाहिए।

##### लेन-देन जारी करना {#}

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

यह वह फ़ंक्शन है जिसे आप अभिवादन बदलने वाले लेन-देन को जारी करने के लिए कॉल करते हैं। चूँकि यह एक लंबा ऑपरेशन है, इसलिए फ़ंक्शन को `async` के रूप में घोषित किया गया है। आंतरिक कार्यान्वयन के कारण, किसी भी `async` फ़ंक्शन को `Promise` ऑब्जेक्ट वापस करने की आवश्यकता होती है। इस मामले में, `Promise<any>` का अर्थ है कि हम यह निर्दिष्ट नहीं करते हैं कि `Promise` में वास्तव में क्या वापस किया जाएगा।

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

अनुबंध इंस्टेंस के `write` फ़ील्ड में वे सभी फ़ंक्शंस होते हैं जो ब्लॉकचेन स्थिति में लिखते हैं (जिनके लिए लेन-देन भेजने की आवश्यकता होती है), जैसे कि [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)। पैरामीटर, यदि कोई हों, एक सूची के रूप में प्रदान किए जाते हैं, और फ़ंक्शन लेन-देन का हैश लौटाता है।

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

लेन-देन के हैश की रिपोर्ट करें (इसे देखने के लिए ब्लॉक एक्सप्लोरर के URL के भाग के रूप में) और इसे वापस करें।

##### घटनाओं पर प्रतिक्रिया देना {#}

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` फ़ंक्शन](https://viem.sh/docs/actions/public/watchEvent) आपको यह निर्दिष्ट करने देता है कि जब कोई घटना उत्सर्जित होती है तो एक फ़ंक्शन चलना चाहिए। यदि आप केवल एक प्रकार की घटना (इस मामले में, `SetGreeting`) की परवाह करते हैं, तो आप खुद को उस घटना प्रकार तक सीमित करने के लिए इस सिंटैक्स का उपयोग कर सकते हैं।

```typescript
    onLogs: logs => {
```

लॉग प्रविष्टियाँ होने पर `onLogs` फ़ंक्शन को कॉल किया जाता है। इथेरियम में "लॉग" और "घटना" आमतौर पर विनिमेय होते हैं।

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

कई घटनाएँ हो सकती हैं, लेकिन सरलता के लिए हम केवल पहली घटना की परवाह करते हैं। `logs[0].args` घटना के तर्क हैं, इस मामले में `sender` और `greeting`।

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

यदि प्रेषक यह सर्वर _नहीं_ है, तो अभिवादन बदलने के लिए `setGreeting` का उपयोग करें।

#### `package.json` {#package-json}

[यह फ़ाइल](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) कॉन्फ़िगरेशन को नियंत्रित करती है। यह लेख केवल महत्वपूर्ण परिभाषाओं की व्याख्या करता है।

```json
{
  "main": "dist/index.js",
```

यह परिभाषा निर्दिष्ट करती है कि कौन सी JavaScript फ़ाइल चलानी है।

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

स्क्रिप्ट विभिन्न एप्लिकेशन क्रियाएं हैं। इस मामले में, हमारे पास केवल `start` है, जो संकलित करता है और फिर सर्वर चलाता है। `tsc` कमांड `typescript` पैकेज का हिस्सा है और TypeScript को JavaScript में संकलित करता है। यदि आप इसे मैन्युअल रूप से चलाना चाहते हैं, तो यह `node_modules/.bin` में स्थित है। दूसरा कमांड सर्वर चलाता है।

```json
  "type": "module",
```

JavaScript नोड एप्लिकेशन कई प्रकार के होते हैं। `module` प्रकार हमें शीर्ष स्तर के कोड में `await` रखने देता है, जो तब महत्वपूर्ण होता है जब आप धीमे (और इसलिए एसिंक्रोनस) संचालन करते हैं।

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

ये वे पैकेज हैं जो केवल विकास के लिए आवश्यक हैं। यहाँ हमें `typescript` की आवश्यकता है और क्योंकि हम इसे Node.js के साथ उपयोग कर रहे हैं, हमें नोड चर और ऑब्जेक्ट्स के प्रकार भी मिल रहे हैं, जैसे कि `process`। [`^<version>` नोटेशन](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) का अर्थ है वह संस्करण या उच्चतर संस्करण जिसमें ब्रेकिंग परिवर्तन नहीं हैं। संस्करण संख्याओं के अर्थ के बारे में अधिक जानकारी के लिए [यहाँ](https://semver.org) देखें।

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

ये वे पैकेज हैं जो रनटाइम पर आवश्यक होते हैं, जब `dist/app.js` चलाया जाता है।

## निष्कर्ष {#conclusion}

हमने यहाँ जो केंद्रीकृत सर्वर बनाया है वह अपना काम करता है, जो कि उपयोगकर्ता के लिए एक एजेंट के रूप में कार्य करना है। कोई भी अन्य व्यक्ति जो चाहता है कि विकेंद्रीकृत एप्लिकेशन (dapp) काम करना जारी रखे और गैस खर्च करने को तैयार है, वह अपने स्वयं के पते के साथ सर्वर का एक नया इंस्टेंस चला सकता है।

हालाँकि, यह केवल तभी काम करता है जब केंद्रीकृत सर्वर की क्रियाओं को आसानी से सत्यापित किया जा सके। यदि केंद्रीकृत सर्वर के पास कोई गुप्त स्थिति की जानकारी है, या वह कठिन गणनाएँ चलाता है, तो यह एक केंद्रीकृत इकाई है जिस पर आपको एप्लिकेशन का उपयोग करने के लिए भरोसा करने की आवश्यकता है, जो कि ठीक वही है जिससे ब्लॉकचेन बचने की कोशिश करते हैं। भविष्य के एक लेख में मैं यह दिखाने की योजना बना रहा हूँ कि इस समस्या से बचने के लिए [शून्य-ज्ञान प्रमाणों](/zero-knowledge-proofs) का उपयोग कैसे करें।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।