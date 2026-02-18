---
title: "आपके अनुबंध के लिए एक यूज़र इंटरफ़ेस बनाना"
description: "TypeScript, React, Vite और Wagmi जैसे आधुनिक घटकों का उपयोग करके, हम एक आधुनिक, लेकिन न्यूनतम, यूज़र इंटरफ़ेस पर जाएँगे और सीखेंगे कि वॉलेट को यूज़र इंटरफ़ेस से कैसे कनेक्ट करें, जानकारी पढ़ने के लिए स्मार्ट अनुबंध को कॉल करें, स्मार्ट अनुबंध में लेनदेन भेजें, और परिवर्तनों की पहचान करने के लिए स्मार्ट अनुबंध से इवेंट्स की निगरानी करें।"
author: "ओरी पोमेरेन्ट्ज़"
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: hi
sidebarDepth: 3
---

आपको एथेरियम इकोसिस्टम में एक ऐसी सुविधा मिली जिसकी हमें आवश्यकता है। आपने इसे लागू करने के लिए स्मार्ट अनुबंध लिखे, और शायद कुछ संबंधित कोड भी जो ऑफ-चेन चलता है। यह बहुत बढ़िया है! दुर्भाग्य से, यूज़र इंटरफ़ेस के बिना आपके पास कोई यूज़र नहीं होगा, और पिछली बार जब आपने कोई वेबसाइट लिखी थी तो लोग डायल-अप मोडेम का उपयोग करते थे और JavaScript नया था।

यह लेख आपके लिए है। मैं मानता हूँ कि आप प्रोग्रामिंग जानते हैं, और शायद थोड़ी JavaScript और HTML भी, लेकिन आपके यूज़र इंटरफ़ेस कौशल पुराने और आउट ऑफ डेट हैं। हम साथ मिलकर एक सरल आधुनिक एप्लिकेशन पर काम करेंगे ताकि आप देख सकें कि इन दिनों यह कैसे किया जाता है।

## यह क्यों महत्वपूर्ण है {#why-important}

सिद्धांत रूप में, आप लोगों को अपने अनुबंधों के साथ इंटरैक्ट करने के लिए [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) या [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) का उपयोग करा सकते हैं। यह अनुभवी Ethereans के लिए बहुत अच्छा होगा। लेकिन हम [एक और अरब लोगों](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) की सेवा करने की कोशिश कर रहे हैं। यह एक बेहतरीन यूज़र अनुभव के बिना नहीं होगा, और एक अनुकूल यूज़र इंटरफ़ेस इसका एक बड़ा हिस्सा है।

## Greeter एप्लिकेशन {#greeter-app}

एक आधुनिक UI कैसे काम करता है इसके पीछे बहुत सारे सिद्धांत हैं, और [बहुत सारी अच्छी साइटें](https://react.dev/learn/thinking-in-react) हैं [जो इसे समझाती हैं](https://wagmi.sh/core/getting-started)। उन साइटों द्वारा किए गए अच्छे काम को दोहराने के बजाय, मैं यह मानूंगा कि आप करके सीखना पसंद करते हैं और एक ऐसे एप्लिकेशन से शुरू करना चाहते हैं जिसके साथ आप खेल सकते हैं। चीजों को पूरा करने के लिए आपको अभी भी सिद्धांत की आवश्यकता है, और हम उस पर पहुँचेंगे - हम बस स्रोत फ़ाइल दर स्रोत फ़ाइल जाएँगे, और जैसे-जैसे हम उन तक पहुँचेंगे, चीजों पर चर्चा करेंगे।

### इंस्टॉलेशन {#installation}

1. यदि आवश्यक हो, तो अपने वॉलेट में [Holesky ब्लॉकचेन](https://chainlist.org/?search=holesky&testnets=true) जोड़ें और [टेस्ट ETH](https://www.holeskyfaucet.io/) प्राप्त करें।

2. github रिपॉजिटरी को क्लोन करें।

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. आवश्यक पैकेज इंस्टॉल करें।

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. एप्लिकेशन शुरू करें।

   ```sh
   pnpm dev
   ```

5. एप्लिकेशन द्वारा दिखाए गए URL पर ब्राउज़ करें। अधिकांश मामलों में, वह [http://localhost:5173/](http://localhost:5173/) है।

6. आप अनुबंध स्रोत कोड, Hardhat के Greeter का थोड़ा संशोधित संस्करण, [एक ब्लॉकचेन एक्सप्लोरर पर](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) देख सकते हैं।

### फ़ाइल वॉक थ्रू {#file-walk-through}

#### `index.html` {#index-html}

यह फ़ाइल मानक HTML बॉयलरप्लेट है, सिवाय इस लाइन के, जो स्क्रिप्ट फ़ाइल को आयात करती है।

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

फ़ाइल एक्सटेंशन हमें बताता है कि यह फ़ाइल [TypeScript](https://www.typescriptlang.org/) में लिखा गया एक [React घटक](https://www.w3schools.com/react/react_components.asp) है, जो JavaScript का एक एक्सटेंशन है जो [टाइप चेकिंग](https://en.wikipedia.org/wiki/Type_system#Type_checking) का समर्थन करता है। TypeScript को JavaScript में संकलित किया जाता है, इसलिए हम इसे क्लाइंट-साइड निष्पादन के लिए उपयोग कर सकते हैं।

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

हमें जिस लाइब्रेरी कोड की आवश्यकता है उसे आयात करें।

```tsx
import { App } from './App'
```

उस React घटक को आयात करें जो एप्लिकेशन को लागू करता है (नीचे देखें)।

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

रूट React घटक बनाएँ। `render` का पैरामीटर [JSX](https://www.w3schools.com/react/react_jsx.asp) है, जो एक एक्सटेंशन भाषा है जो HTML और JavaScript/TypeScript दोनों का उपयोग करती है। यहाँ विस्मयादिबोधक बिंदु TypeScript घटक को बताता है: \"आप नहीं जानते कि `document.getElementById('root')` `ReactDOM.createRoot` के लिए एक वैध पैरामीटर होगा, लेकिन चिंता न करें - मैं डिवेलपर हूँ और मैं आपको बता रहा हूँ कि यह होगा\"।

```tsx
  <React.StrictMode>
```

एप्लिकेशन [एक `React.StrictMode` घटक](https://react.dev/reference/react/StrictMode) के अंदर जा रहा है। यह घटक React लाइब्रेरी को अतिरिक्त डिबगिंग जाँचें डालने के लिए कहता है, जो विकास के दौरान उपयोगी है।

```tsx
    <WagmiConfig config={config}>
```

एप्लिकेशन [एक `WagmiConfig` घटक](https://wagmi.sh/react/api/WagmiProvider) के अंदर भी है। [wagmi (we are going to make it) लाइब्रेरी](https://wagmi.sh/) React UI परिभाषाओं को एथेरियम विकेंद्रीकृत अनुप्रयोग लिखने के लिए [viem लाइब्रेरी](https://viem.sh/) से जोड़ती है।

```tsx
      <RainbowKitProvider chains={chains}>
```

और अंत में, [एक `RainbowKitProvider` घटक](https://www.rainbowkit.com/)। यह घटक लॉग ऑन करने और वॉलेट और एप्लिकेशन के बीच संचार को संभालता है।

```tsx
        <App />
```

अब हमारे पास एप्लिकेशन के लिए घटक हो सकता है, जो वास्तव में UI को लागू करता है। घटक के अंत में `/>` React को बताता है कि इस घटक के अंदर कोई परिभाषा नहीं है, जैसा कि XML मानक के अनुसार है।

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

बेशक, हमें अन्य घटकों को बंद करना होगा।

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

यह एक React घटक बनाने का मानक तरीका है - एक फ़ंक्शन को परिभाषित करें जिसे हर बार रेंडर करने की आवश्यकता होने पर कॉल किया जाता है। इस फ़ंक्शन में आम तौर पर शीर्ष पर कुछ TypeScript या JavaScript कोड होता है, जिसके बाद एक `return` कथन होता है जो JSX कोड लौटाता है।

```tsx
  const { isConnected } = useAccount()
```

यहां हम यह जांचने के लिए [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) का उपयोग करते हैं कि हम वॉलेट के माध्यम से ब्लॉकचेन से जुड़े हैं या नहीं।

परंपरा के अनुसार, React में `use...` नामक फ़ंक्शन [हुक](https://www.w3schools.com/react/react_hooks.asp) होते हैं जो किसी प्रकार का डेटा लौटाते हैं। जब आप ऐसे हुक का उपयोग करते हैं, तो न केवल आपके घटक को डेटा मिलता है, बल्कि जब वह डेटा बदलता है तो घटक को अद्यतन जानकारी के साथ फिर से प्रस्तुत किया जाता है।

```tsx
  return (
    <>
```

एक React घटक के JSX को एक घटक लौटाना _होता_ है। जब हमारे पास कई घटक होते हैं और हमारे पास कुछ भी नहीं होता है जो \"स्वाभाविक रूप से\" लपेटता है, तो हम एक खाली घटक (`<> ...` और `</>`) का उपयोग करते हैं उन्हें एक ही घटक में बनाने के लिए।

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

हम RainbowKit से [`ConnectButton` घटक](https://www.rainbowkit.com/docs/connect-button) प्राप्त करते हैं। जब हम कनेक्ट नहीं होते हैं, तो यह हमें एक `Connect Wallet` बटन देता है जो एक मोडल खोलता है जो वॉलेट के बारे में बताता है और आपको यह चुनने देता है कि आप किसका उपयोग करते हैं। जब हम कनेक्ट होते हैं, तो यह हमारे द्वारा उपयोग किए जाने वाले ब्लॉकचेन, हमारे खाते का पता और हमारा ETH बैलेंस प्रदर्शित करता है। हम इन डिस्प्ले का उपयोग नेटवर्क स्विच करने या डिस्कनेक्ट करने के लिए कर सकते हैं।

```tsx
      {isConnected && (
```

जब हमें JSX में वास्तविक JavaScript (या TypeScript जिसे JavaScript में संकलित किया जाएगा) डालने की आवश्यकता होती है, तो हम ब्रैकेट (`{}`) का उपयोग करते हैं।

`a && b` सिंटैक्स [`a ?` के लिए छोटा है `b : a`](https://www.w3schools.com/react/react_es6_ternary.asp) है। अर्थात्, यदि `a` सत्य है तो यह `b` का मूल्यांकन करता है और अन्यथा यह `a` का मूल्यांकन करता है (जो `false`, `0`, आदि हो सकता है)। यह React को यह बताने का एक आसान तरीका है कि एक घटक केवल तभी प्रदर्शित किया जाना चाहिए जब कोई निश्चित शर्त पूरी हो।

इस मामले में, हम केवल यूज़र को `Greeter` दिखाना चाहते हैं यदि यूज़र ब्लॉकचेन से जुड़ा है।

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

इस फ़ाइल में अधिकांश UI फ़ंक्शनैलिटी शामिल है। इसमें ऐसी परिभाषाएँ शामिल हैं जो सामान्य रूप से कई फ़ाइलों में होंगी, लेकिन चूँकि यह एक ट्यूटोरियल है, प्रोग्राम को पहली बार समझने में आसान होने के लिए अनुकूलित किया गया है, न कि प्रदर्शन या रखरखाव में आसानी के लिए।

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

हम इन लाइब्रेरी फ़ंक्शन का उपयोग करते हैं। फिर से, उन्हें नीचे समझाया गया है जहाँ उनका उपयोग किया जाता है।

```tsx
import { AddressType } from 'abitype'
```

[`abitype` लाइब्रेरी](https://abitype.dev/) हमें विभिन्न एथेरियम डेटा प्रकारों के लिए TypeScript परिभाषाएँ प्रदान करती है, जैसे कि [`AddressType`](https://abitype.dev/config#addresstype)।

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` अनुबंध के लिए ABI।
यदि आप एक ही समय में अनुबंध और UI विकसित कर रहे हैं, तो आप सामान्य रूप से उन्हें एक ही रिपॉजिटरी में रखेंगे और अपने एप्लिकेशन में एक फ़ाइल के रूप में Solidity कंपाइलर द्वारा उत्पन्न ABI का उपयोग करेंगे। हालाँकि, यहाँ यह आवश्यक नहीं है क्योंकि अनुबंध पहले ही विकसित हो चुका है और बदलने वाला नहीं है।

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript दृढ़ता से टाइप किया गया है। हम इस परिभाषा का उपयोग उस पते को निर्दिष्ट करने के लिए करते हैं जिसमें `Greeter` अनुबंध विभिन्न चेनों पर तैनात है। की एक संख्या (chainId) है, और मान एक `AddressType` (एक पता) है।

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

दो समर्थित नेटवर्कों पर अनुबंध का पता: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) और [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)।

नोट: वास्तव में एक तीसरी परिभाषा है, Redstone Holesky के लिए, इसे नीचे समझाया जाएगा।

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

इस प्रकार का उपयोग `ShowObject` घटक (बाद में समझाया गया) के पैरामीटर के रूप में किया जाता है। इसमें ऑब्जेक्ट का नाम और उसका मान शामिल है, जो डिबगिंग उद्देश्यों के लिए प्रदर्शित किए जाते हैं।

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

किसी भी समय हम या तो जान सकते हैं कि अभिवादन क्या है (क्योंकि हमने इसे ब्लॉकचेन से पढ़ा है) या नहीं जानते (क्योंकि हमें अभी तक यह प्राप्त नहीं हुआ है)। तो एक ऐसा प्रकार होना उपयोगी है जो या तो एक स्ट्रिंग हो सकता है या कुछ भी नहीं।

##### `Greeter` घटक {#greeter-component}

```tsx
const Greeter = () => {
```

अंत में, हम घटक को परिभाषित करते हैं।

```tsx
  const { chain } = useNetwork()
```

[wagmi](https://wagmi.sh/react/hooks/useNetwork) के सौजन्य से, हम जिस चेन का उपयोग कर रहे हैं उसके बारे में जानकारी।
क्योंकि यह एक हुक (`use...`) है, हर बार जब यह जानकारी बदलती है तो घटक फिर से तैयार हो जाता है।

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter अनुबंध का पता, जो चेन के अनुसार बदलता रहता है (और जो `undefined` होता है यदि हमारे पास चेन की जानकारी नहीं है या हम उस अनुबंध के बिना किसी चेन पर हैं)।

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // कोई तर्क नहीं
    watch: true
  })
```

[`useReadContract` हुक](https://wagmi.sh/react/api/hooks/useReadContract) एक अनुबंध से जानकारी पढ़ता है। आप देख सकते हैं कि यह वास्तव में UI में `readResults` का विस्तार करके कौन सी जानकारी लौटाता है। इस मामले में हम चाहते हैं कि यह देखता रहे ताकि जब अभिवादन बदले तो हमें सूचित किया जा सके।

**ध्यान दें:** हम यह जानने के लिए [`setGreeting` इवेंट्स](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) सुन सकते हैं कि अभिवादन कब बदलता है और उस तरह से अपडेट कर सकते हैं। हालाँकि, जबकि यह अधिक कुशल हो सकता है, यह सभी मामलों में लागू नहीं होगा। जब यूज़र एक अलग चेन पर स्विच करता है तो अभिवादन भी बदल जाता है, लेकिन उस बदलाव के साथ कोई इवेंट नहीं होता है। हमारे पास कोड का एक हिस्सा इवेंट्स के लिए सुन सकता है और दूसरा चेन परिवर्तनों की पहचान करने के लिए हो सकता है, लेकिन यह केवल [`watch` पैरामीटर](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) सेट करने से अधिक जटिल होगा।

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React का [`useState` हुक](https://www.w3schools.com/react/react_usestate.asp) हमें एक स्टेट वेरिएबल निर्दिष्ट करने देता है, जिसका मान घटक के एक रेंडरिंग से दूसरे में बना रहता है। प्रारंभिक मान पैरामीटर है, इस मामले में खाली स्ट्रिंग।

`useState` हुक दो मानों वाली एक सूची लौटाता है:

1. स्टेट वेरिएबल का वर्तमान मान।
2. आवश्यकता पड़ने पर स्टेट वेरिएबल को संशोधित करने के लिए एक फ़ंक्शन। चूँकि यह एक हुक है, हर बार जब इसे कॉल किया जाता है तो घटक फिर से रेंडर होता है।

इस मामले में, हम उस नए अभिवादन के लिए एक स्टेट वेरिएबल का उपयोग कर रहे हैं जिसे यूज़र सेट करना चाहता है।

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

यह नए अभिवादन इनपुट फ़ील्ड के बदलने पर इवेंट हैंडलर है। प्रकार, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), निर्दिष्ट करता है कि यह एक HTML इनपुट तत्व के मान परिवर्तन के लिए हैंडलर है। `<HTMLInputElement>` भाग का उपयोग किया जाता है क्योंकि यह एक [जेनेरिक प्रकार](https://www.w3schools.com/typescript/typescript_basic_generics.php) है।

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

क्लाइंट के दृष्टिकोण से ब्लॉकचेन लेनदेन जमा करने की यह प्रक्रिया है:

1. ब्लॉकचेन में एक नोड को [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) का उपयोग करके लेनदेन भेजें।
2. नोड से प्रतिक्रिया की प्रतीक्षा करें।
3. जब प्रतिक्रिया प्राप्त हो जाए, तो यूज़र से वॉलेट के माध्यम से लेनदेन पर हस्ताक्षर करने के लिए कहें। यह कदम नोड प्रतिक्रिया प्राप्त होने के _बाद_ होना चाहिए क्योंकि यूज़र को उस पर हस्ताक्षर करने से पहले लेनदेन की गैस लागत दिखाई जाती है।
4. यूज़र द्वारा स्वीकृति की प्रतीक्षा करें।
5. लेनदेन फिर से भेजें, इस बार [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) का उपयोग करके।

चरण 2 में संभवतः एक बोधगम्य समय लगेगा, जिसके दौरान यूज़र सोचेंगे कि क्या उनका कमांड वास्तव में यूज़र इंटरफ़ेस द्वारा प्राप्त किया गया था और उनसे पहले से ही लेनदेन पर हस्ताक्षर करने के लिए क्यों नहीं कहा जा रहा है। यह खराब यूज़र अनुभव (UX) बनाता है।

समाधान [तैयारी हुक](https://wagmi.sh/react/prepare-hooks) का उपयोग करना है। हर बार जब कोई पैरामीटर बदलता है, तो तुरंत नोड को `eth_estimateGas` अनुरोध भेजें। फिर, जब यूज़र वास्तव में लेनदेन भेजना चाहता है (**अभिवादन अपडेट करें** दबाकर), तो गैस लागत ज्ञात होती है और यूज़र तुरंत वॉलेट पेज देख सकता है।

```tsx
  return (
```

अब हम अंत में वापसी के लिए वास्तविक HTML बना सकते हैं।

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

एक `ShowGreeting` घटक बनाएँ (नीचे समझाया गया है), लेकिन केवल तभी जब अभिवादन ब्लॉकचेन से सफलतापूर्वक पढ़ा गया हो।

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

यह इनपुट टेक्स्ट फ़ील्ड है जहाँ यूज़र एक नया अभिवादन सेट कर सकता है। हर बार जब यूज़र कोई की दबाता है, तो हम `greetingChange` को कॉल करते हैं जो `setNewGreeting` को कॉल करता है। चूंकि `setNewGreeting` `useState` हुक से आता है, यह `Greeter` घटक को फिर से प्रस्तुत करने का कारण बनता है। इसका मतलब है कि:

- हमें नए अभिवादन का मान रखने के लिए `value` निर्दिष्ट करने की आवश्यकता है, क्योंकि अन्यथा यह डिफ़ॉल्ट, खाली स्ट्रिंग में वापस आ जाएगा।
- `usePrepareContractWrite` को हर बार `newGreeting` बदलने पर कॉल किया जाता है, जिसका अर्थ है कि तैयार लेनदेन में हमेशा नवीनतम `newGreeting` होगा।

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        अभिवादन अपडेट करें
      </button>
```

यदि कोई `workingTx.write` नहीं है तो हम अभी भी अभिवादन अपडेट भेजने के लिए आवश्यक जानकारी की प्रतीक्षा कर रहे हैं, इसलिए बटन अक्षम है। यदि कोई `workingTx.write` मान है तो वह लेनदेन भेजने के लिए कॉल करने वाला फ़ंक्शन है।

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

अंत में, यह देखने में आपकी मदद करने के लिए कि हम क्या कर रहे हैं, हमारे द्वारा उपयोग की जाने वाली तीन वस्तुओं को दिखाएँ:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` घटक {#showgreeting-component}

यह घटक दिखाता है

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

एक घटक फ़ंक्शन घटक के सभी विशेषताओं के साथ एक पैरामीटर प्राप्त करता है।

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` घटक {#showobject-component}

सूचना उद्देश्यों के लिए, हम महत्वपूर्ण वस्तुओं को दिखाने के लिए `ShowObject` घटक का उपयोग करते हैं (अभिवादन पढ़ने के लिए `readResults` और हमारे द्वारा बनाए गए लेनदेन के लिए `preparedTx` और `workingTx`)।

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

हम सभी जानकारी के साथ UI को अव्यवस्थित नहीं करना चाहते हैं, इसलिए उन्हें देखने या बंद करना संभव बनाने के लिए, हम एक [`details`](https://www.w3schools.com/tags/tag_details.asp) टैग का उपयोग करते हैं।

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

अधिकांश फ़ील्ड [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) का उपयोग करके प्रदर्शित किए जाते हैं।

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          फ़ंक्शन:
          <ul>
```

अपवाद फ़ंक्शन हैं, जो [JSON मानक](https://www.json.org/json-en.html) का हिस्सा नहीं हैं, इसलिए उन्हें अलग से प्रदर्शित करना होगा।

```tsx
          {funs.map((f, i) =>
```

JSX के भीतर, `{` घुंघराले कोष्ठक `}` के अंदर के कोड को JavaScript के रूप में व्याख्या किया जाता है। फिर, `(` नियमित कोष्ठक `)` के अंदर के कोड की फिर से JSX के रूप में व्याख्या की जाती है।

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React को [DOM ट्री](https://www.w3schools.com/js/js_htmldom.asp) में टैग के लिए अलग पहचानकर्ता की आवश्यकता होती है। इसका मतलब है कि एक ही टैग के बच्चों (इस मामले में, [अनऑर्डर्ड सूची](https://www.w3schools.com/tags/tag_ul.asp)), को अलग-अलग `key` विशेषताओं की आवश्यकता होती है।

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

विभिन्न HTML टैग समाप्त करें।

##### अंतिम `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` घटक वह है जिसे हमें एप्लिकेशन के लिए निर्यात करने की आवश्यकता है।

#### `src/wagmi.ts` {#wagmi-ts}

अंत में, WAGMI से संबंधित विभिन्न परिभाषाएँ `src/wagmi.ts` में हैं। मैं यहां सब कुछ समझाने नहीं जा रहा हूं, क्योंकि इसका अधिकांश हिस्सा बॉयलरप्लेट है जिसे आपको बदलने की संभावना नहीं है।

यहां का कोड [github पर](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) जैसा बिल्कुल नहीं है क्योंकि बाद में लेख में हम एक और चेन ([Redstone Holesky](https://redstone.xyz/docs/network-info)) जोड़ते हैं।

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

एप्लिकेशन द्वारा समर्थित ब्लॉकचेन आयात करें। आप समर्थित चेनों की सूची [viem github में](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) देख सकते हैं।

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/) का उपयोग करने में सक्षम होने के लिए आपको अपने एप्लिकेशन के लिए एक प्रोजेक्ट ID की आवश्यकता है। आप इसे [cloud.walletconnect.com पर](https://cloud.walletconnect.com/sign-in) प्राप्त कर सकते हैं।

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### एक और ब्लॉकचेन जोड़ना {#add-blockchain}

इन दिनों बहुत सारे [L2 स्केलिंग समाधान](/layer-2/) हैं, और आप कुछ ऐसे का समर्थन करना चाह सकते हैं जिन्हें viem अभी तक समर्थन नहीं करता है। ऐसा करने के लिए, आप `src/wagmi.ts` को संशोधित करते हैं। ये निर्देश बताते हैं कि [Redstone Holesky](https://redstone.xyz/docs/network-info) कैसे जोड़ा जाए।

1. viem से `defineChain` प्रकार आयात करें।

   ```ts
   import { defineChain } from 'viem'
   ```

2. नेटवर्क परिभाषा जोड़ें।

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. नई चेन को `configureChains` कॉल में जोड़ें।

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. सुनिश्चित करें कि एप्लिकेशन नए नेटवर्क पर आपके अनुबंधों के लिए पता जानता है। इस मामले में, हम `src/components/Greeter.tsx` को संशोधित करते हैं:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## निष्कर्ष {#conclusion}

बेशक, आप वास्तव में `Greeter` के लिए एक यूज़र इंटरफ़ेस प्रदान करने की परवाह नहीं करते हैं। आप अपने स्वयं के अनुबंधों के लिए एक यूज़र इंटरफ़ेस बनाना चाहते हैं। अपना स्वयं का एप्लिकेशन बनाने के लिए, इन चरणों को चलाएँ:

1. एक wagmi एप्लिकेशन बनाने के लिए निर्दिष्ट करें।

   ```sh copy
   pnpm create wagmi
   ```

2. एप्लिकेशन को नाम दें।

3. **React** फ्रेमवर्क चुनें।

4. **Vite** वैरिएंट चुनें।

5. आप [Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup) जोड़ सकते हैं।

अब जाएँ और अपने अनुबंधों को व्यापक दुनिया के लिए प्रयोग करने योग्य बनाएँ।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।

