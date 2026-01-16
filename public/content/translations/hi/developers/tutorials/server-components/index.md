---
title: "वेब3 ऐप्स के लिए सर्वर कंपोनेंट्स और एजेंट"
description: इस ट्यूटोरियल को पढ़ने के बाद, आप TypeScript सर्वर लिखने में सक्षम होंगे जो एक ब्लॉकचेन पर इवेंट्स को सुनते हैं और तदनुसार अपने स्वयं के ट्रांज़ैक्शन के साथ प्रतिक्रिया करते हैं। यह आपको केंद्रीकृत एप्लिकेशन लिखने में सक्षम करेगा (क्योंकि सर्वर विफलता का एक बिंदु है), लेकिन वेब3 एंटिटीज़ के साथ इंटरैक्ट कर सकता है। इन्हीं तकनीकों का उपयोग एक ऐसा एजेंट लिखने के लिए भी किया जा सकता है जो बिना किसी मानवीय हस्तक्षेप के ऑन-चेन इवेंट्स पर प्रतिक्रिया देता है।

author: ओरी पोमेरेन्ट्ज़
lang: hi
tags: [ "एजेंट", "सर्वर", "ऑफ-चेन" ]
skill: beginner
published: 2024-07-15
---

## परिचय {#introduction}

अधिकांश मामलों में, एक विकेंद्रीकृत ऐप सॉफ़्टवेयर को वितरित करने के लिए एक सर्वर का उपयोग करता है, लेकिन सभी वास्तविक इंटरैक्शन क्लाइंट (आमतौर पर, वेब ब्राउज़र) और ब्लॉकचेन के बीच होती है।

![वेब सर्वर, क्लाइंट और ब्लॉकचेन के बीच सामान्य इंटरैक्शन](./fig-1.svg)

हालांकि, कुछ ऐसे मामले हैं जहां एक एप्लिकेशन को स्वतंत्र रूप से चलने वाले सर्वर कंपोनेंट से लाभ होगा। ऐसा सर्वर ट्रांज़ैक्शन जारी करके इवेंट्स और अन्य स्रोतों, जैसे कि API, से आने वाले अनुरोधों का जवाब देने में सक्षम होगा।

![सर्वर के जुड़ने के साथ इंटरैक्शन](./fig-2.svg)

ऐसे सर्वर द्वारा पूरे किए जा सकने वाले कई संभावित कार्य हैं।

- गुप्त स्टेट का धारक। गेमिंग में यह अक्सर उपयोगी होता है कि गेम को ज्ञात सभी जानकारी खिलाड़ियों के लिए उपलब्ध न हो। हालांकि, _ब्लॉकचेन पर कोई रहस्य नहीं होते हैं_, ब्लॉकचेन में मौजूद कोई भी जानकारी किसी के लिए भी पता लगाना आसान है। इसलिए, यदि गेम स्टेट के किसी हिस्से को गुप्त रखा जाना है, तो इसे कहीं और संग्रहीत किया जाना चाहिए (और संभवतः उस स्टेट के प्रभावों को [शून्य-ज्ञान प्रमाण](/zero-knowledge-proofs) का उपयोग करके सत्यापित किया जाना चाहिए)।

- केंद्रीकृत ओरेकल। यदि स्टेक पर्याप्त रूप से कम हैं, तो एक बाहरी सर्वर जो ऑनलाइन कुछ जानकारी पढ़ता है और फिर उसे चेन पर पोस्ट करता है, [ओरेकल](/developers/docs/oracles/) के रूप में उपयोग करने के लिए पर्याप्त हो सकता है।

- एजेंट। ब्लॉकचेन पर इसे सक्रिय करने के लिए ट्रांज़ैक्शन के बिना कुछ भी नहीं होता है। एक सर्वर किसी यूज़र की ओर से [आर्बिट्रेज](/developers/docs/mev/#mev-examples-dex-arbitrage) जैसे कार्य करने के लिए कार्य कर सकता है जब अवसर स्वयं प्रस्तुत होता है।

## नमूना प्रोग्राम {#sample-program}

आप [github](https://github.com/qbzzt/20240715-server-component) पर एक नमूना सर्वर देख सकते हैं। यह सर्वर Hardhat के Greeter के एक संशोधित संस्करण, [इस कॉन्ट्रैक्ट](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) से आने वाले इवेंट्स को सुनता है। जब ग्रीटिंग बदल दी जाती है, तो यह उसे वापस बदल देता है।

इसे चलाने के लिए:

1. रिपॉजिटरी को क्लोन करें।

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. आवश्यक पैकेज इंस्टॉल करें। यदि आपके पास यह पहले से नहीं है, तो [पहले नोड इंस्टॉल करें](https://nodejs.org/en/download/package-manager)।

   ```sh copy
   npm install
   ```

3. Holesky टेस्टनेट पर ETH वाले खाते की निजी चाबी को निर्दिष्ट करने के लिए `.env` को संपादित करें। यदि आपके पास Holesky पर ETH नहीं है, तो आप [इस फोसेट का उपयोग](https://holesky-faucet.pk910.de/) कर सकते हैं।

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. सर्वर शुरू करें।

   ```sh copy
   npm start
   ```

5. [एक ब्लॉक खोजकर्ता](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) पर जाएं, और निजी चाबी वाले पते से भिन्न पते का उपयोग करके ग्रीटिंग को संशोधित करें। देखें कि ग्रीटिंग स्वचालित रूप से वापस संशोधित हो जाती है।

### यह कैसे काम करता है? {#how-it-works}

सर्वर कंपोनेंट कैसे लिखना है, यह समझने का सबसे आसान तरीका नमूने को एक-एक लाइन करके देखना है।

#### `src/app.ts` {#src-app-ts}

प्रोग्राम का अधिकांश हिस्सा [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) में निहित है।

##### आवश्यक ऑब्जेक्ट बनाना

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

ये वे [Viem](https://viem.sh/) एंटिटीज़ हैं जिनकी हमें आवश्यकता है, फ़ंक्शन और [`Address` टाइप](https://viem.sh/docs/glossary/types#address)। यह सर्वर [TypeScript](https://www.typescriptlang.org/) में लिखा गया है, जो JavaScript का एक एक्सटेंशन है जो इसे [स्ट्रॉन्गली टाइप्ड](https://en.wikipedia.org/wiki/Strong_and_weak_typing) बनाता है।

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[यह फ़ंक्शन](https://viem.sh/docs/accounts/privateKey) हमें एक निजी चाबी के अनुरूप वॉलेट जानकारी, जिसमें पता भी शामिल है, उत्पन्न करने देता है।

```typescript
import { holesky } from "viem/chains"
```

Viem में ब्लॉकचेन का उपयोग करने के लिए आपको इसकी परिभाषा आयात करनी होगी। इस मामले में, हम [Holesky](https://github.com/eth-clients/holesky) टेस्ट ब्लॉकचेन से कनेक्ट करना चाहते हैं।

```typescript
// इस तरह हम .env में परिभाषाओं को process.env में जोड़ते हैं।
import * as dotenv from "dotenv"
dotenv.config()
```

इस तरह हम `.env` को एनवायरनमेंट में पढ़ते हैं। हमें इसकी निजी चाबी के लिए आवश्यकता है (बाद में देखें)।

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

किसी कॉन्ट्रैक्ट का उपयोग करने के लिए हमें उसके पते और उसके लिए [ABI](/glossary/#abi) की आवश्यकता होती है। हम यहां दोनों प्रदान करते हैं।

JavaScript (और इसलिए TypeScript) में आप किसी कॉन्सटेंट को एक नया मान असाइन नहीं कर सकते, लेकिन आप उसमें संग्रहीत ऑब्जेक्ट को _संशोधित_ कर सकते हैं। `as const` प्रत्यय का उपयोग करके हम TypeScript को बता रहे हैं कि सूची स्वयं कॉन्सटेंट है और इसे बदला नहीं जा सकता है।

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

एक Viem [पब्लिक क्लाइंट](https://viem.sh/docs/clients/public.html) बनाएँ। पब्लिक क्लाइंट के पास संलग्न निजी चाबी नहीं होती है, और इसलिए वे ट्रांज़ैक्शन नहीं भेज सकते। वे [`view` फ़ंक्शन](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) को कॉल कर सकते हैं, खाते की शेष राशि पढ़ सकते हैं, आदि।

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

एनवायरनमेंट वैरिएबल [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) में उपलब्ध हैं। हालांकि, TypeScript स्ट्रॉन्गली टाइप्ड है। एक एनवायरनमेंट वैरिएबल कोई भी स्ट्रिंग, या खाली हो सकता है, इसलिए एक एनवायरनमेंट वैरिएबल का टाइप `string | undefined` होता है। हालांकि, Viem में एक की को `0x${string}` (`0x` के बाद एक स्ट्रिंग) के रूप में परिभाषित किया गया है। यहां हम TypeScript को बताते हैं कि `PRIVATE_KEY` एनवायरनमेंट वैरिएबल उस टाइप का होगा। यदि ऐसा नहीं है, तो हमें एक रनटाइम एरर मिलेगा।

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) फ़ंक्शन तब इस निजी चाबी का उपयोग करके एक पूर्ण खाता ऑब्जेक्ट बनाता है।

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

इसके बाद, हम एक [वॉलेट क्लाइंट](https://viem.sh/docs/clients/wallet) बनाने के लिए खाता ऑब्जेक्ट का उपयोग करते हैं। इस क्लाइंट के पास एक निजी चाबी और एक पता होता है, इसलिए इसका उपयोग ट्रांज़ैक्शन भेजने के लिए किया जा सकता है।

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

अब जब हमारे पास सभी पूर्वापेक्षाएँ हैं, तो हम अंततः एक [कॉन्ट्रैक्ट इंस्टेंस](https://viem.sh/docs/contract/getContract) बना सकते हैं। हम ऑन-चेन कॉन्ट्रैक्ट के साथ संवाद करने के लिए इस कॉन्ट्रैक्ट इंस्टेंस का उपयोग करेंगे।

##### ब्लॉकचेन से पढ़ना

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

जो कॉन्ट्रैक्ट फ़ंक्शन केवल पढ़ने के लिए हैं ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) और [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) वे `read` के अंतर्गत उपलब्ध हैं। इस मामले में, हम इसका उपयोग [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) फ़ंक्शन तक पहुँचने के लिए करते हैं, जो ग्रीटिंग लौटाता है।

JavaScript सिंगल-थ्रेडेड है, इसलिए जब हम एक लंबे समय तक चलने वाली प्रक्रिया शुरू करते हैं तो हमें यह [निर्दिष्ट करने की आवश्यकता होती है कि हम इसे एसिंक्रोनस रूप से करते हैं](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)। ब्लॉकचेन को कॉल करने के लिए, यहां तक कि केवल पढ़ने के ऑपरेशन के लिए भी, कंप्यूटर और ब्लॉकचेन नोड के बीच एक राउंड-ट्रिप की आवश्यकता होती है। यही कारण है कि हम यहां निर्दिष्ट करते हैं कि कोड को परिणाम के लिए `await` करने की आवश्यकता है।

यदि आप इस काम के तरीके में रुचि रखते हैं तो आप [इसके बारे में यहां पढ़ सकते हैं](https://www.w3schools.com/js/js_promise.asp), लेकिन व्यावहारिक रूप से आपको बस यह जानना है कि यदि आप एक ऐसा ऑपरेशन शुरू करते हैं जिसमें लंबा समय लगता है, तो आप परिणामों का `await` करते हैं, और ऐसा करने वाले किसी भी फ़ंक्शन को `async` के रूप में घोषित किया जाना चाहिए।

##### ट्रांज़ैक्शन जारी करना

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

यह वह फ़ंक्शन है जिसे आप ग्रीटिंग बदलने वाले ट्रांज़ैक्शन को जारी करने के लिए कॉल करते हैं। चूंकि यह एक लंबा ऑपरेशन है, फ़ंक्शन को `async` के रूप में घोषित किया गया है। आंतरिक कार्यान्वयन के कारण, किसी भी `async` फ़ंक्शन को एक `Promise` ऑब्जेक्ट लौटाना होता है। इस मामले में, `Promise<any>` का मतलब है कि हम यह निर्दिष्ट नहीं करते हैं कि `Promise` में वास्तव में क्या लौटाया जाएगा।

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

कॉन्ट्रैक्ट इंस्टेंस के `write` फ़ील्ड में वे सभी फ़ंक्शन होते हैं जो ब्लॉकचेन स्टेट में लिखते हैं (वे जिन्हें ट्रांज़ैक्शन भेजने की आवश्यकता होती है), जैसे कि [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)। पैरामीटर, यदि कोई हों, एक सूची के रूप में प्रदान किए जाते हैं, और फ़ंक्शन ट्रांज़ैक्शन का हैश लौटाता है।

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

ट्रांज़ैक्शन के हैश की रिपोर्ट करें (इसे देखने के लिए ब्लॉक खोजकर्ता के URL के हिस्से के रूप में) और इसे लौटाएँ।

##### इवेंट्स का जवाब देना

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` फ़ंक्शन](https://viem.sh/docs/actions/public/watchEvent) आपको यह निर्दिष्ट करने देता है कि जब कोई इवेंट उत्सर्जित होता है तो एक फ़ंक्शन चलाना है। यदि आप केवल एक प्रकार के इवेंट (इस मामले में, `SetGreeting`) की परवाह करते हैं, तो आप खुद को उस इवेंट प्रकार तक सीमित करने के लिए इस सिंटैक्स का उपयोग कर सकते हैं।

```typescript
    onLogs: logs => {
```

`onLogs` फ़ंक्शन को तब कॉल किया जाता है जब लॉग एंट्री होती हैं। एथेरियम में "लॉग" और "इवेंट" आमतौर पर विनिमेय होते हैं।

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

कई इवेंट्स हो सकते हैं, लेकिन सरलता के लिए हम केवल पहले वाले की परवाह करते हैं। `logs[0].args` इवेंट के तर्क हैं, इस मामले में `sender` और `greeting`।

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

यदि प्रेषक यह सर्वर _नहीं_ है, तो ग्रीटिंग बदलने के लिए `setGreeting` का उपयोग करें।

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

स्क्रिप्ट विभिन्न एप्लिकेशन एक्शन हैं। इस मामले में, हमारे पास केवल `start` है, जो सर्वर को कंपाइल करता है और फिर चलाता है। `tsc` कमांड `typescript` पैकेज का हिस्सा है और TypeScript को JavaScript में कंपाइल करता है। यदि आप इसे मैन्युअल रूप से चलाना चाहते हैं, तो यह `node_modules/.bin` में स्थित है। दूसरा कमांड सर्वर चलाता है।

```json
  "type": "module",
```

JavaScript नोड एप्लिकेशन कई प्रकार के होते हैं। `module` प्रकार हमें शीर्ष स्तर के कोड में `await` रखने की अनुमति देता है, जो तब महत्वपूर्ण होता है जब आप धीमे (और इसलिए एसिंक्रोनस) ऑपरेशन करते हैं।

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

ये वे पैकेज हैं जो केवल डेवलपमेंट के लिए आवश्यक हैं। यहां हमें `typescript` की आवश्यकता है और क्योंकि हम इसे Node.js के साथ उपयोग कर रहे हैं, हम नोड वैरिएबल और ऑब्जेक्ट, जैसे `process`, के लिए भी टाइप प्राप्त कर रहे हैं। [`^<version>` नोटेशन](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) का अर्थ है वह संस्करण या एक उच्च संस्करण जिसमें ब्रेकिंग परिवर्तन नहीं हैं। संस्करण संख्याओं के अर्थ के बारे में अधिक जानकारी के लिए [यहां](https://semver.org) देखें।

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

ये वे पैकेज हैं जो रनटाइम पर, `dist/app.js` चलाते समय आवश्यक होते हैं।

## निष्कर्ष {#conclusion}

हमारे द्वारा यहां बनाया गया केंद्रीकृत सर्वर अपना काम करता है, जो एक यूज़र के लिए एजेंट के रूप में कार्य करना है। कोई भी और जो चाहता है कि डैप काम करता रहे और गैस खर्च करने को तैयार हो, वह अपने पते के साथ सर्वर का एक नया इंस्टेंस चला सकता है।

हालांकि, यह केवल तभी काम करता है जब केंद्रीकृत सर्वर के कार्यों को आसानी से सत्यापित किया जा सके। यदि केंद्रीकृत सर्वर के पास कोई गुप्त स्टेट जानकारी है, या कठिन गणनाएँ चलाता है, तो यह एक केंद्रीकृत इकाई है जिस पर आपको एप्लिकेशन का उपयोग करने के लिए भरोसा करने की आवश्यकता है, जो कि ठीक वही है जिससे ब्लॉकचेन बचने की कोशिश करते हैं। भविष्य के एक लेख में मैं यह दिखाने की योजना बना रहा हूं कि इस समस्या से निपटने के लिए [शून्य-ज्ञान प्रमाण](/zero-knowledge-proofs) का उपयोग कैसे करें।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।
