---
title: "अपने कॉन्ट्रैक्ट के लिए एक यूजर इंटरफेस बनाना"
description: "TypeScript, React, Vite, और Wagmi जैसे आधुनिक घटकों का उपयोग करते हुए, हम एक आधुनिक, लेकिन न्यूनतम, यूजर इंटरफेस पर चर्चा करेंगे और सीखेंगे कि वॉलेट को यूजर इंटरफेस से कैसे जोड़ा जाए, जानकारी पढ़ने के लिए स्मार्ट कॉन्ट्रैक्ट को कैसे कॉल किया जाए, स्मार्ट कॉन्ट्रैक्ट में लेनदेन कैसे भेजा जाए, और परिवर्तनों की पहचान करने के लिए स्मार्ट कॉन्ट्रैक्ट से इवेंट्स की निगरानी कैसे की जाए।"
author: "ओरी पोमेरेंट्ज़"
tags: ["TypeScript", "React", "Vite", "Wagmi", "फ्रंटएंड"]
skill: beginner
breadcrumb: "WAGMI के साथ UI"
published: 2023-11-01
lang: hi
sidebarDepth: 3
---

आपको इथेरियम इकोसिस्टम में एक ऐसी सुविधा मिली है जिसकी हमें आवश्यकता है। आपने इसे लागू करने के लिए स्मार्ट कॉन्ट्रैक्ट लिखे हैं, और शायद कुछ संबंधित कोड भी जो ऑफचेन चलता है। यह बहुत बढ़िया है! दुर्भाग्य से, एक यूजर इंटरफेस के बिना आपके पास कोई उपयोगकर्ता नहीं होगा, और पिछली बार जब आपने कोई वेबसाइट लिखी थी तब लोग डायल-अप मोडेम का उपयोग करते थे और JavaScript नया था।

यह लेख आपके लिए है। मैं मानकर चलता हूँ कि आप प्रोग्रामिंग जानते हैं, और शायद थोड़ी बहुत JavaScript और HTML भी, लेकिन आपके यूजर इंटरफेस कौशल पुराने और आउटडेटेड हो चुके हैं। हम एक साथ एक सरल आधुनिक एप्लिकेशन पर चर्चा करेंगे ताकि आप देख सकें कि आजकल यह कैसे किया जाता है।

## यह महत्वपूर्ण क्यों है {#why-important}

सिद्धांत रूप में, आप लोगों से अपने कॉन्ट्रैक्ट के साथ इंटरैक्ट करने के लिए केवल [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) या [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) का उपयोग करवा सकते हैं। यह अनुभवी इथेरियम उपयोगकर्ताओं के लिए बहुत अच्छा है। लेकिन हम [एक अरब और लोगों](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) की सेवा करने का प्रयास कर रहे हैं। यह एक बेहतरीन यूजर एक्सपीरियंस के बिना नहीं होगा, और एक अनुकूल यूजर इंटरफेस इसका एक बड़ा हिस्सा है।

## Greeter एप्लिकेशन {#greeter-app}

आधुनिक UI कैसे काम करता है, इसके पीछे बहुत सारे सिद्धांत हैं, और [कई अच्छी साइटें हैं](https://react.dev/learn/thinking-in-react) [जो इसे समझाती हैं](https://wagmi.sh/core/getting-started)। उन साइटों द्वारा किए गए अच्छे काम को दोहराने के बजाय, मैं यह मानकर चलूँगा कि आप करके सीखना पसंद करते हैं और एक ऐसे एप्लिकेशन के साथ शुरुआत करेंगे जिसके साथ आप प्रयोग कर सकते हैं। काम पूरा करने के लिए आपको अभी भी सिद्धांत की आवश्यकता है, और हम उस पर भी आएँगे - हम बस सोर्स फ़ाइल दर सोर्स फ़ाइल आगे बढ़ेंगे, और जैसे-जैसे चीज़ें सामने आएँगी, उन पर चर्चा करेंगे।

### इंस्टॉलेशन {#installation}

1. एप्लिकेशन [Sepolia](https://sepolia.dev/) टेस्ट नेटवर्क का उपयोग करता है। यदि आवश्यक हो, तो [Sepolia टेस्ट ETH प्राप्त करें](/developers/docs/networks/#sepolia) और [अपने वॉलेट में Sepolia जोड़ें](https://chainlist.org/chain/11155111)।

2. GitHub रिपॉजिटरी को क्लोन करें और आवश्यक पैकेज इंस्टॉल करें।

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. एप्लिकेशन मुफ्त एक्सेस पॉइंट का उपयोग करता है, जिनकी प्रदर्शन सीमाएँ होती हैं। यदि आप [नोड एज़ ए सर्विस (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) प्रदाता का उपयोग करना चाहते हैं, तो [`src/wagmi.ts`](#wagmi-ts) में URL बदलें।

4. एप्लिकेशन शुरू करें।

   ```sh
   npm run dev
   ```

5. एप्लिकेशन द्वारा दिखाए गए URL पर ब्राउज़ करें। अधिकांश मामलों में, यह [http://localhost:5173/](http://localhost:5173/) होता है।

6. आप कॉन्ट्रैक्ट का सोर्स कोड, जो Hardhat के Greeter का एक संशोधित संस्करण है, [ब्लॉकचेन एक्सप्लोरर पर](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) देख सकते हैं।

### फ़ाइल वॉकथ्रू {#file-walk-through}

#### `index.html` {#index-html}

यह फ़ाइल इस लाइन को छोड़कर एक मानक HTML बॉयलरप्लेट है, जो स्क्रिप्ट फ़ाइल को इंपोर्ट करती है।

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

फ़ाइल एक्सटेंशन इंगित करता है कि यह [TypeScript](https://www.typescriptlang.org/) में लिखा गया एक [React घटक (component)](https://www.w3schools.com/react/react_components.asp) है, जो JavaScript का एक एक्सटेंशन है और [टाइप चेकिंग](https://en.wikipedia.org/wiki/Type_system#Type_checking) का समर्थन करता है। TypeScript को JavaScript में संकलित (compile) किया जाता है, इसलिए हम इसे क्लाइंट साइड पर उपयोग कर सकते हैं।

यह फ़ाइल मुख्य रूप से इसलिए समझाई गई है यदि आपकी इसमें रुचि हो। आमतौर पर आप इस फ़ाइल को संशोधित नहीं करते हैं, बल्कि [`src/App.tsx`](#app-tsx) और इसके द्वारा इंपोर्ट की जाने वाली फ़ाइलों को संशोधित करते हैं।

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

हमें जिस लाइब्रेरी कोड की आवश्यकता है उसे इंपोर्ट करें।

```tsx
import App from './App.tsx'
```

उस React घटक को इंपोर्ट करें जो एप्लिकेशन को लागू करता है (नीचे देखें)।

```tsx
import { config } from './wagmi.ts'
```

[Wagmi](https://wagmi.sh/) कॉन्फ़िगरेशन इंपोर्ट करें, जिसमें ब्लॉकचेन कॉन्फ़िगरेशन शामिल है।

```tsx
const queryClient = new QueryClient()
```

[React Query के](https://tanstack.com/query/latest/docs/framework/react/overview) कैश मैनेजर का एक नया इंस्टेंस बनाता है। यह ऑब्जेक्ट स्टोर करेगा:

- कैश किए गए RPC कॉल्स
- कॉन्ट्रैक्ट रीड्स
- बैकग्राउंड रीफेचिंग स्थिति (state)

हमें कैश मैनेजर की आवश्यकता है क्योंकि Wagmi v3 आंतरिक रूप से React Query का उपयोग करता है।

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

रूट React घटक बनाएँ। `render` का पैरामीटर [JSX](https://www.w3schools.com/react/react_jsx.asp) है, जो एक एक्सटेंशन भाषा है और HTML और JavaScript/TypeScript दोनों का उपयोग करती है। यहाँ विस्मयादिबोधक चिह्न (exclamation point) TypeScript घटक को बताता है: "आप नहीं जानते कि `document.getElementById('root')`, `ReactDOM.createRoot` के लिए एक वैध पैरामीटर होगा, लेकिन चिंता न करें - मैं डेवलपर हूँ और मैं आपको बता रहा हूँ कि यह होगा"।

```tsx
  <React.StrictMode>
```

एप्लिकेशन [एक `React.StrictMode` घटक](https://react.dev/reference/react/StrictMode) के अंदर जा रहा है। यह घटक React लाइब्रेरी को अतिरिक्त डिबगिंग चेक डालने के लिए कहता है, जो विकास के दौरान उपयोगी होता है।

```tsx
    <WagmiProvider config={config}>
```

एप्लिकेशन [एक `WagmiProvider` घटक](https://wagmi.sh/react/api/WagmiProvider) के अंदर भी है। [Wagmi (हम इसे बनाने जा रहे हैं) लाइब्रेरी](https://wagmi.sh/) एक इथेरियम विकेंद्रीकृत एप्लिकेशन (dapp) लिखने के लिए React UI परिभाषाओं को [Viem लाइब्रेरी](https://viem.sh/) के साथ जोड़ती है।

```tsx
      <QueryClientProvider client={queryClient}>
```

और अंत में, एक React Query प्रदाता (provider) जोड़ें ताकि कोई भी एप्लिकेशन घटक कैश की गई क्वेरीज़ का उपयोग कर सके।

```tsx
        <App />
```

अब हमारे पास एप्लिकेशन के लिए घटक हो सकता है, जो वास्तव में UI को लागू करता है। घटक के अंत में `/>` React को बताता है कि XML मानक के अनुसार, इस घटक के अंदर कोई परिभाषा नहीं है।

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

बेशक, हमें अन्य घटकों को बंद करना होगा।

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

हमें जिन लाइब्रेरीज़ की आवश्यकता है, साथ ही [`Greeter` घटक](#greeter-tsx) को इंपोर्ट करें।

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia चेन ID।

```
function App() {
```

React घटक बनाने का यह मानक तरीका है: एक फ़ंक्शन परिभाषित करें जिसे जब भी रेंडर करने की आवश्यकता हो, कॉल किया जाए। इस फ़ंक्शन में आमतौर पर TypeScript या JavaScript कोड होता है, जिसके बाद एक `return` स्टेटमेंट होता है जो JSX कोड लौटाता है।

```tsx
  const connection = useConnection()
```

वर्तमान कनेक्शन से संबंधित जानकारी प्राप्त करने के लिए [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) का उपयोग करें, जैसे कि पता और `chainId`।

परंपरा के अनुसार, React में `use...` कहलाने वाले फ़ंक्शन [हुक्स (hooks)](https://www.w3schools.com/react/react_hooks.asp) होते हैं। ये फ़ंक्शन केवल घटक को डेटा नहीं लौटाते हैं; वे यह भी सुनिश्चित करते हैं कि जब वह डेटा बदलता है तो इसे फिर से रेंडर किया जाए (घटक फ़ंक्शन फिर से निष्पादित होता है, और इसका आउटपुट HTML में पिछले वाले को बदल देता है)।

```tsx
  const { connectors, connect, status, error } = useConnect()
```

वॉलेट कनेक्शन के बारे में जानकारी प्राप्त करने के लिए [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) का उपयोग करें।

```tsx
  const { disconnect } = useDisconnect()
```

[यह हुक](https://wagmi.sh/react/api/hooks/useDisconnect) हमें वॉलेट से डिस्कनेक्ट करने का फ़ंक्शन देता है।

```tsx
  const { switchChain } = useSwitchChain()
```

[यह हुक](https://wagmi.sh/react/api/hooks/useSwitchChain) हमें चेन स्विच करने की सुविधा देता है।

```tsx
  useEffect(() => {
```

React हुक [`useEffect`](https://react.dev/reference/react/useEffect) आपको किसी बाहरी सिस्टम को सिंक्रोनाइज़ करने के लिए किसी वेरिएबल का मान बदलने पर फ़ंक्शन चलाने की सुविधा देता है।

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

यदि हम कनेक्टेड हैं, लेकिन Sepolia ब्लॉकचेन से नहीं, तो Sepolia पर स्विच करें।

```tsx
  }, [connection.status, connection.chainId])
```

हर बार जब कनेक्शन स्थिति या कनेक्शन chainId बदलता है, तो फ़ंक्शन को फिर से चलाएँ।

```tsx
  return (
    <>
```

React घटक का JSX _अवश्य_ एक एकल HTML घटक लौटाना चाहिए। जब हमारे पास कई घटक होते हैं और उन सभी को लपेटने के लिए किसी कंटेनर की आवश्यकता नहीं होती है, तो हम उन्हें एक एकल घटक में संयोजित करने के लिए एक खाली घटक (`<> ... </>`) का उपयोग करते हैं।

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

वर्तमान कनेक्शन के बारे में जानकारी प्रदान करें। JSX के भीतर, `{<expression>}` का अर्थ है अभिव्यक्ति (expression) का JavaScript के रूप में मूल्यांकन करना।

```tsx
      {connection.status === 'connected' && (
```

सिंटैक्स `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`"।

JSX के अंदर if स्टेटमेंट रखने का यह मानक तरीका है।

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX XML मानक का पालन करता है, जो HTML से अधिक सख्त है। यदि किसी टैग का कोई संबंधित एंड टैग नहीं है, तो उसे समाप्त करने के लिए उसके अंत में एक स्लैश (`/`) _अवश्य_ होना चाहिए।

यहाँ हमारे पास ऐसे दो टैग हैं, `<Greeter />` (जिसमें वास्तव में वह HTML कोड होता है जो कॉन्ट्रैक्ट से बात करता है) और [एक क्षैतिज रेखा (horizontal line) के लिए `<hr />`](https://www.w3schools.com/tags/tag_hr.asp)।

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

यदि उपयोगकर्ता इस बटन पर क्लिक करता है, तो `disconnect` फ़ंक्शन को कॉल करें।

```tsx
      {connection.status !== 'connected' && (
```

यदि हम कनेक्टेड _नहीं_ हैं, तो वॉलेट से कनेक्ट करने के लिए आवश्यक विकल्प दिखाएँ।

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors` में हमारे पास कनेक्टर्स की एक सूची है। हम इसे प्रदर्शित करने के लिए JSX बटनों की सूची में बदलने के लिए [`map`](https://www.w3schools.com/jsref/jsref_map.asp) का उपयोग करते हैं।

```tsx
            <button
              key={connector.uid}
```

JSX में "सिबलिंग" टैग्स (वे टैग जो एक ही पैरेंट से आते हैं) के लिए अलग-अलग पहचानकर्ता (identifiers) होना आवश्यक है।

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

कनेक्टर बटन।

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

अतिरिक्त जानकारी प्रदान करें। अभिव्यक्ति सिंटैक्स `<variable>?.<field>` JavaScript को बताता है कि यदि वेरिएबल परिभाषित है, तो उस फ़ील्ड का मूल्यांकन करें। यदि वेरिएबल परिभाषित नहीं है, तो यह अभिव्यक्ति `undefined` का मूल्यांकन करती है।

अभिव्यक्ति `error.message`, जब कोई त्रुटि नहीं होती है, तो एक अपवाद (exception) उत्पन्न करेगी। `error?.message` का उपयोग करने से हम इस समस्या से बच सकते हैं।

#### `src/Greeter.tsx` {#greeter-tsx}

इस फ़ाइल में अधिकांश UI कार्यक्षमता शामिल है। इसमें वे परिभाषाएँ शामिल हैं जो सामान्य रूप से कई फ़ाइलों में होती हैं, लेकिन चूँकि यह एक ट्यूटोरियल है, इसलिए प्रोग्राम को प्रदर्शन या रखरखाव में आसानी के बजाय पहली बार समझने में आसान होने के लिए अनुकूलित किया गया है।

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

हम इन लाइब्रेरी फ़ंक्शंस का उपयोग करते हैं। फिर से, उन्हें नीचे समझाया गया है जहाँ उनका उपयोग किया जाता है।

```tsx
import { AddressType } from 'abitype'
```

[`abitype` लाइब्रेरी](https://abitype.dev/) हमें विभिन्न इथेरियम डेटा प्रकारों के लिए TypeScript परिभाषाएँ प्रदान करती है, जैसे कि [`AddressType`](https://abitype.dev/config#addresstype)।

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` कॉन्ट्रैक्ट के लिए ABI।
यदि आप एक ही समय में कॉन्ट्रैक्ट और UI विकसित कर रहे हैं, तो आप सामान्य रूप से उन्हें एक ही रिपॉजिटरी में रखेंगे और Solidity कंपाइलर द्वारा उत्पन्न ABI का उपयोग अपने एप्लिकेशन में एक फ़ाइल के रूप में करेंगे। हालाँकि, यहाँ यह आवश्यक नहीं है क्योंकि कॉन्ट्रैक्ट पहले से ही विकसित है और नहीं बदलेगा।

हम TypeScript को यह बताने के लिए [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) का उपयोग करते हैं कि यह एक _वास्तविक_ स्थिरांक (constant) है। आम तौर पर, जब आप JavaScript में `const x = {"a": 1}` निर्दिष्ट करते हैं, तो आप `x` में मान बदल सकते हैं, आप बस इसे असाइन नहीं कर सकते।

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript दृढ़ता से टाइप (strongly typed) किया गया है। हम इस परिभाषा का उपयोग उस पते को निर्दिष्ट करने के लिए करते हैं जहाँ `Greeter` कॉन्ट्रैक्ट विभिन्न चेनों पर डिप्लॉय किया गया है। कुंजी एक संख्या (chainId) है, और मान एक `AddressType` (एक पता) है।

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) पर कॉन्ट्रैक्ट का पता।

##### ``Timer`` घटक {#timer-component}

`Timer` घटक किसी दिए गए समय के बाद से सेकंड की संख्या दिखाता है। यह उपयोगिता (usability) के उद्देश्यों के लिए महत्वपूर्ण है। जब उपयोगकर्ता कुछ करते हैं, तो वे तत्काल प्रतिक्रिया की उम्मीद करते हैं। ब्लॉकचेन में, यह अक्सर असंभव होता है क्योंकि जब तक किसी ब्लॉक में लेनदेन नहीं रखा जाता तब तक कुछ नहीं होता है। एक समाधान यह दिखाना है कि उपयोगकर्ता द्वारा कार्रवाई किए हुए कितना समय हो गया है, ताकि उपयोगकर्ता यह तय कर सके कि आवश्यक समय उचित है या नहीं।

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` घटक एक पैरामीटर लेता है, `lastUpdate`, जो अंतिम कार्रवाई का समय है।

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

घटक को सही ढंग से काम करने के लिए हमारे पास स्थिति (घटक से जुड़ा एक वेरिएबल) होनी चाहिए और इसे अपडेट करना चाहिए। लेकिन हमें इसे कभी पढ़ने की आवश्यकता नहीं होती है, इसलिए वेरिएबल बनाने की जहमत न उठाएँ।

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) फ़ंक्शन हमें समय-समय पर चलने के लिए एक फ़ंक्शन शेड्यूल करने देता है। इस मामले में, हर सेकंड। फ़ंक्शन स्थिति को अपडेट करने के लिए `setNow` को कॉल करता है, इसलिए `Timer` घटक फिर से रेंडर हो जाएगा। हम इसे एक खाली निर्भरता सूची (dependency list) के साथ [`useEffect`](https://react.dev/reference/react/useEffect) के अंदर लपेटते हैं ताकि यह हर बार घटक के रेंडर होने के बजाय केवल एक बार हो।

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

अंतिम अपडेट के बाद से सेकंड की संख्या की गणना करें और इसे लौटाएँ।

##### ``Greeter`` घटक {#greeter-component}

```tsx
const Greeter = () => {
```

अंत में, हम घटक को परिभाषित करते हैं।

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

हम जिस चेन और खाते का उपयोग कर रहे हैं उसके बारे में जानकारी, [Wagmi](https://wagmi.sh/) के सौजन्य से। चूँकि यह एक हुक (`use...`) है, इसलिए जब भी यह जानकारी बदलती है तो घटक फिर से रेंडर हो जाता है।

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter कॉन्ट्रैक्ट का पता, जो `undefined` है यदि हमारे पास चेन की जानकारी नहीं है, या हम उस कॉन्ट्रैक्ट के बिना किसी चेन पर हैं।

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // कोई आर्गुमेंट नहीं
  })
```

[`useReadContract` हुक](https://wagmi.sh/react/api/hooks/useReadContract) [कॉन्ट्रैक्ट](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) के `greet` फ़ंक्शन को कॉल करता है।

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React का [`useState` हुक](https://www.w3schools.com/react/react_usestate.asp) हमें एक स्थिति वेरिएबल निर्दिष्ट करने देता है, जिसका मान घटक के एक रेंडरिंग से दूसरे रेंडरिंग तक बना रहता है। प्रारंभिक मान पैरामीटर है, इस मामले में खाली स्ट्रिंग।

`useState` हुक दो मानों वाली एक सूची लौटाता है:

1. स्थिति वेरिएबल का वर्तमान मान।
2. आवश्यकता पड़ने पर स्थिति वेरिएबल को संशोधित करने के लिए एक फ़ंक्शन। चूँकि यह एक हुक है, हर बार जब इसे कॉल किया जाता है तो घटक फिर से रेंडर होता है।

इस मामले में, हम उस नए अभिवादन (greeting) के लिए एक स्थिति वेरिएबल का उपयोग कर रहे हैं जिसे उपयोगकर्ता सेट करना चाहता है।

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

यदि कई उपयोगकर्ता एक ही समय में एक ही कॉन्ट्रैक्ट का उपयोग कर रहे हैं, तो वे एक-दूसरे के अभिवादन को ओवरराइट कर सकते हैं। यह उपयोगकर्ताओं को ऐसा लगेगा जैसे एप्लिकेशन खराब हो रहा है। यदि एप्लिकेशन दिखाता है कि अंतिम बार अभिवादन किसने सेट किया था, तो उपयोगकर्ता को पता चल जाएगा कि यह कोई और था और एप्लिकेशन सही ढंग से काम कर रहा है।

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

उपयोगकर्ता यह देखना पसंद करते हैं कि उनके कार्यों का तत्काल प्रभाव हो। हालाँकि, ब्लॉकचेन पर ऐसा नहीं है। ये स्थिति वेरिएबल हमें कम से कम उपयोगकर्ताओं को कुछ प्रदर्शित करने देते हैं ताकि उन्हें पता चले कि उनकी कार्रवाई प्रगति पर है।

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

यदि ऊपर दिया गया `readResults` डेटा बदलता है और यह किसी गलत मान (उदाहरण के लिए, `undefined`) पर सेट नहीं है, तो वर्तमान अभिवादन को ब्लॉकचेन से पढ़े गए अभिवादन में अपडेट करें। साथ ही, स्थिति को अपडेट करें।

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` इवेंट्स को सुनें।

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` का अर्थ है कि यदि मान `false` है, या ऐसा मान है जिसका मूल्यांकन गलत (false) के रूप में होता है, जैसे कि `undefined`, `0`, या एक खाली स्ट्रिंग, तो समग्र रूप से अभिव्यक्ति `false` है। किसी भी अन्य मान के लिए, यह `true` है। यह मानों को बूलियन में बदलने का एक तरीका है, क्योंकि यदि कोई `greeterAddr` नहीं है, तो हम इवेंट्स को नहीं सुनना चाहते हैं।

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

जब हम लॉग देखते हैं (जो तब होता है जब हम एक नया इवेंट देखते हैं), तो इसका मतलब है कि अभिवादन को संशोधित किया गया है। उस स्थिति में, हम `currentGreeting` और `lastSetterAddress` को नए मानों में अपडेट कर सकते हैं। साथ ही, हम स्थिति प्रदर्शन को अपडेट करना चाहते हैं।

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

जब हम स्थिति को अपडेट करते हैं तो हम दो काम करना चाहते हैं:

1. स्थिति स्ट्रिंग (`status`) को अपडेट करें
2. अंतिम स्थिति अपडेट के समय (`statusTime`) को अभी (now) में अपडेट करें।

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

यह नए अभिवादन इनपुट फ़ील्ड में परिवर्तनों के लिए इवेंट हैंडलर है। हम `evt` पैरामीटर का प्रकार निर्दिष्ट कर सकते हैं, लेकिन TypeScript एक प्रकार वैकल्पिक (type optional) भाषा है। चूँकि इस फ़ंक्शन को केवल एक बार HTML इवेंट हैंडलर में कॉल किया जाता है, मुझे नहीं लगता कि यह आवश्यक है।

```tsx
  const { writeContractAsync } = useWriteContract()
```

कॉन्ट्रैक्ट में लिखने का फ़ंक्शन। यह [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts) के समान है, लेकिन बेहतर स्थिति अपडेट सक्षम करता है।

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

क्लाइंट के दृष्टिकोण से ब्लॉकचेन लेनदेन सबमिट करने की यह प्रक्रिया है:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) का उपयोग करके ब्लॉकचेन में एक नोड को लेनदेन भेजें।
2. नोड से प्रतिक्रिया की प्रतीक्षा करें।
3. जब प्रतिक्रिया प्राप्त हो जाती है, तो उपयोगकर्ता को वॉलेट के माध्यम से लेनदेन पर हस्ताक्षर करने के लिए कहें। यह कदम नोड प्रतिक्रिया प्राप्त होने के बाद _होना ही चाहिए_ क्योंकि उपयोगकर्ता को हस्ताक्षर करने से पहले लेनदेन की गैस लागत दिखाई जाती है।
4. उपयोगकर्ता द्वारा स्वीकृत करने की प्रतीक्षा करें।
5. इस बार [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) का उपयोग करके लेनदेन को फिर से भेजें।

चरण 2 में एक बोधगम्य (perceptible) समय लगने की संभावना है, जिसके दौरान उपयोगकर्ता सोच सकते हैं कि क्या उनका कमांड यूजर इंटरफेस द्वारा प्राप्त किया गया था और उन्हें अभी तक लेनदेन पर हस्ताक्षर करने के लिए क्यों नहीं कहा जा रहा है। यह एक खराब यूजर एक्सपीरियंस (UX) बनाता है।

एक समाधान यह है कि हर बार जब कोई पैरामीटर बदलता है तो `eth_estimateGas` भेजा जाए। फिर, जब उपयोगकर्ता वास्तव में लेनदेन भेजना चाहता है (इस मामले में **Update greeting** दबाकर), तो गैस लागत ज्ञात होती है, और उपयोगकर्ता तुरंत वॉलेट पृष्ठ देख सकता है।

```tsx
  return (
```

अब हम अंततः वापस करने के लिए वास्तविक HTML बना सकते हैं।

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

वर्तमान अभिवादन दिखाएँ।

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

यदि हम जानते हैं कि अंतिम बार अभिवादन किसने सेट किया था, तो वह जानकारी प्रदर्शित करें। `Greeter` इस जानकारी का ट्रैक नहीं रखता है, और हम `SetGreeting` इवेंट्स के लिए पीछे मुड़कर नहीं देखना चाहते हैं, इसलिए हम इसे केवल तभी प्राप्त करते हैं जब हमारे चलने के दौरान अभिवादन बदल जाता है।

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

यह इनपुट टेक्स्ट फ़ील्ड है जहाँ उपयोगकर्ता एक नया अभिवादन सेट कर सकता है। हर बार जब उपयोगकर्ता कोई कुंजी दबाता है, तो हम `greetingChange` को कॉल करते हैं, जो `setNewGreeting` को कॉल करता है। चूँकि `setNewGreeting`, `useState` से आता है, यह `Greeter` घटक को फिर से रेंडर करने का कारण बनता है। इसका मतलब है कि:

- हमें नए अभिवादन का मान रखने के लिए `value` निर्दिष्ट करने की आवश्यकता है, क्योंकि अन्यथा यह वापस डिफ़ॉल्ट, खाली स्ट्रिंग में बदल जाएगा।
- हर बार `newGreeting` बदलने पर `simulation` भी अपडेट होता है, जिसका अर्थ है कि हमें सही अभिवादन के साथ एक सिमुलेशन मिलेगा। यह प्रासंगिक हो सकता है क्योंकि गैस लागत कॉल डेटा के आकार पर निर्भर करती है, जो स्ट्रिंग की लंबाई पर निर्भर करती है।

```tsx
      <button disabled={!simulation.data}
```

लेनदेन भेजने के लिए आवश्यक जानकारी प्राप्त होने के बाद ही बटन को सक्षम करें।

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

स्थिति अपडेट करें। इस बिंदु पर, उपयोगकर्ता को वॉलेट में पुष्टि करने की आवश्यकता है।

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` केवल लेनदेन वास्तव में भेजे जाने के बाद ही वापस आता है। यह हमें उपयोगकर्ता को यह दिखाने देता है कि लेनदेन को ब्लॉकचेन में शामिल होने के लिए कितने समय से प्रतीक्षा करनी पड़ रही है।

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

स्थिति दिखाएँ और इसे अपडेट हुए कितना समय हो गया है।

```
export {Greeter}
```

घटक को एक्सपोर्ट करें।

#### `src/wagmi.ts` {#wagmi-ts}

अंत में, Wagmi से संबंधित विभिन्न परिभाषाएँ `src/wagmi.ts` में हैं। मैं यहाँ सब कुछ नहीं समझाने जा रहा हूँ, क्योंकि इसमें से अधिकांश बॉयलरप्लेट है जिसे आपको बदलने की आवश्यकता नहीं होगी।

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi कॉन्फ़िगरेशन में इस एप्लिकेशन द्वारा समर्थित चेन शामिल हैं। आप [उपलब्ध चेनों की सूची](https://wagmi.sh/core/api/chains) देख सकते हैं।

```ts
  connectors: [
    injected(),
  ],
```

[यह कनेक्टर](https://wagmi.sh/core/api/connectors/injected) हमें ब्राउज़र में इंस्टॉल किए गए वॉलेट से बात करने देता है।

```ts
  transports: {
    [sepolia.id]: http()
```

Viem के साथ आने वाला डिफ़ॉल्ट HTTP एंडपॉइंट काफी अच्छा है। यदि हम एक अलग URL चाहते हैं, तो हम `http("https:// hostname ")` या `webSocket("wss:// hostname ")` का उपयोग कर सकते हैं।

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## एक और ब्लॉकचेन जोड़ना {#add-blockchain}

इन दिनों बहुत सारे [L2 स्केलिंग समाधान](https://ethereum.org/layer-2/) हैं, और आप कुछ ऐसे समाधानों का समर्थन करना चाह सकते हैं जिनका Viem अभी तक समर्थन नहीं करता है। ऐसा करने के लिए, आप `src/wagmi.ts` को संशोधित करते हैं। ये निर्देश बताते हैं कि [Optimism Sepolia](https://chainlist.org/chain/11155420) को कैसे जोड़ा जाए।

1.  `src/wagmi.ts` को संपादित करें

    A. Viem से `defineChain` प्रकार को इंपोर्ट करें।

          ```ts
          import { defineChain } from 'viem'
          ```

    B. नेटवर्क परिभाषा जोड़ें। आपको वास्तव में Optimism Sepolia के लिए ऐसा करने की आवश्यकता नहीं है, [यह पहले से ही `viem` में है](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), लेकिन इस तरह आप सीखते हैं कि एक ऐसा ब्लॉकचेन कैसे जोड़ा जाए जो `viem` में नहीं है।

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. `createConfig` कॉल में नई चेन जोड़ें।

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Sepolia पर स्वचालित स्विच को कमेंट आउट करने के लिए `src/App.tsx` को संपादित करें। एक उत्पादन (production) सिस्टम पर, आप शायद आपके द्वारा समर्थित प्रत्येक ब्लॉकचेन के लिंक के साथ बटन दिखाएँगे।

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  यह सुनिश्चित करने के लिए `src/Greeter.tsx` को संपादित करें कि एप्लिकेशन नए नेटवर्क पर आपके कॉन्ट्रैक्ट्स का पता जानता है।

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  अपने ब्राउज़र में।

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true) पर ब्राउज़ करें और चेन को अपने वॉलेट में जोड़ने के लिए तालिका के दाईं ओर स्थित बटनों में से किसी एक पर क्लिक करें।

    B. एप्लिकेशन में, ब्लॉकचेन को बदलने के लिए **Disconnect** करें और फिर से कनेक्ट करें। इसे संभालने के और भी अच्छे तरीके हैं, लेकिन उनके लिए एप्लिकेशन में बदलाव की आवश्यकता होगी।

## निष्कर्ष {#conclusion}

बेशक, आप वास्तव में `Greeter` के लिए एक यूजर इंटरफेस प्रदान करने की परवाह नहीं करते हैं। आप अपने स्वयं के कॉन्ट्रैक्ट्स के लिए एक यूजर इंटरफेस बनाना चाहते हैं। अपना खुद का एप्लिकेशन बनाने के लिए, इन चरणों को चलाएँ:

1. एक Wagmi एप्लिकेशन बनाने के लिए निर्दिष्ट करें।

   ```sh copy
   npm create wagmi
   ```

2. आगे बढ़ने के लिए `y` टाइप करें।

3. एप्लिकेशन को नाम दें।

4. **React** फ्रेमवर्क चुनें।

5. **Vite** संस्करण (variant) चुनें।

अब जाएँ और अपने कॉन्ट्रैक्ट्स को पूरी दुनिया के लिए उपयोग करने योग्य बनाएँ।

[मेरे और काम यहाँ देखें](https://cryptodocguy.pro/)।