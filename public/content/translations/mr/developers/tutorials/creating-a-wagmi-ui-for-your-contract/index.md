---
title: "तुमच्या कॉन्ट्रॅक्टसाठी युजर इंटरफेस तयार करणे"
description: "TypeScript, React, Vite आणि Wagmi सारख्या आधुनिक कॉम्पोनेंट्स वापरून, आम्ही एक आधुनिक परंतु किमान युजर इंटरफेस पाहू आणि वॉलेट युजर इंटरफेसशी कसे कनेक्ट करायचे, माहिती वाचण्यासाठी स्मार्ट कॉन्ट्रॅक्टला कसे कॉल करायचे, स्मार्ट कॉन्ट्रॅक्टवर ट्रॅन्सॅक्शन कसे पाठवायचे आणि बदल ओळखण्यासाठी स्मार्ट कॉन्ट्रॅक्टमधील इव्हेंट्स कसे मॉनिटर करायचे हे शिकू."
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "फ्रंटएंड"]
skill: beginner
breadcrumb: "WAGMI सोबत UI"
published: 2023-11-01
lang: mr
sidebarDepth: 3
---

तुम्हाला इथरियम इकोसिस्टममध्ये आवश्यक असलेले एक वैशिष्ट्य सापडले आहे. त्याची अंमलबजावणी करण्यासाठी तुम्ही स्मार्ट कॉन्ट्रॅक्ट्स लिहिले आहेत आणि कदाचित ऑफचेन चालणारा काही संबंधित कोडही लिहिला असेल. हे उत्तम आहे! दुर्दैवाने, युजर इंटरफेसशिवाय तुम्हाला कोणतेही युजर्स मिळणार नाहीत आणि तुम्ही शेवटची वेबसाईट बनवली तेव्हा लोक डायल-अप मॉडेम वापरत होते आणि JavaScript नवीन होते.

हा लेख तुमच्यासाठी आहे. मी असे गृहीत धरतो की तुम्हाला प्रोग्रामिंग येते आणि कदाचित थोडे JavaScript आणि HTML देखील येते, परंतु तुमचे युजर इंटरफेस कौशल्य जुने आणि कालबाह्य झाले आहे. आपण एकत्र एका साध्या आधुनिक ॲप्लिकेशनवर नजर टाकू जेणेकरून आजकाल हे कसे केले जाते हे तुम्हाला समजेल.

## हे महत्त्वाचे का आहे {#why-important}

सैद्धांतिकदृष्ट्या, तुम्ही लोकांना तुमच्या कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी फक्त [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) किंवा [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) वापरण्यास सांगू शकता. अनुभवी इथरियन्ससाठी हे उत्तम आहे. परंतु आम्ही [आणखी एक अब्ज लोकांना](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) सेवा देण्याचा प्रयत्न करत आहोत. एका उत्तम युजर एक्सपिरियन्सशिवाय हे शक्य होणार नाही आणि एक अनुकूल युजर इंटरफेस हा त्याचा एक मोठा भाग आहे.

## Greeter ॲप्लिकेशन {#greeter-app}

आधुनिक UI कसे कार्य करते यामागे बरेच सिद्धांत आहेत आणि [अनेक चांगल्या साईट्स](https://react.dev/learn/thinking-in-react) [ते स्पष्ट करतात](https://wagmi.sh/core/getting-started). त्या साईट्सनी केलेल्या उत्तम कामाची पुनरावृत्ती करण्याऐवजी, मी असे गृहीत धरणार आहे की तुम्हाला प्रत्यक्ष कृतीतून शिकायला आवडते आणि आपण एका ॲप्लिकेशनपासून सुरुवात करू ज्यासोबत तुम्ही प्रयोग करू शकता. गोष्टी पूर्ण करण्यासाठी तुम्हाला अजूनही सिद्धांताची आवश्यकता आहे आणि आपण त्याकडे वळू - आपण फक्त सोर्स फाईलनुसार पुढे जाऊ आणि जसे आपण त्यांच्यापर्यंत पोहोचू तशी गोष्टींवर चर्चा करू.

### इन्स्टॉलेशन {#installation}

1. हे ॲप्लिकेशन [Sepolia](https://sepolia.dev/) टेस्ट नेटवर्क वापरते. आवश्यक असल्यास, [Sepolia टेस्ट ETH मिळवा](/developers/docs/networks/#sepolia) आणि [तुमच्या वॉलेटमध्ये Sepolia जोडा](https://chainlist.org/chain/11155111).

2. GitHub रिपॉझिटरी क्लोन करा आणि आवश्यक पॅकेजेस इन्स्टॉल करा.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. हे ॲप्लिकेशन मोफत ॲक्सेस पॉईंट्स वापरते, ज्यांच्या परफॉर्मन्सवर मर्यादा आहेत. जर तुम्हाला [नोड ॲज अ सर्व्हिस](/developers/docs/nodes-and-clients/nodes-as-a-service/) प्रोव्हायडर वापरायचा असेल, तर [`src/wagmi.ts`](#wagmi-ts) मधील URLs बदला.

4. ॲप्लिकेशन सुरू करा.

   ```sh
   npm run dev
   ```

5. ॲप्लिकेशनद्वारे दर्शविलेल्या URL वर जा. बहुतांश प्रकरणांमध्ये, ते [http://localhost:5173/](http://localhost:5173/) असते.

6. तुम्ही कॉन्ट्रॅक्टचा सोर्स कोड, जो Hardhat च्या Greeter ची सुधारित आवृत्ती आहे, [ब्लॉकचेन एक्सप्लोररवर](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) पाहू शकता.

### फाईल वॉक थ्रू {#file-walk-through}

#### `index.html` {#index-html}

ही फाईल एक स्टँडर्ड HTML बॉयलरप्लेट आहे, फक्त या ओळीचा अपवाद वगळता, जी स्क्रिप्ट फाईल इम्पोर्ट करते.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

फाईल एक्स्टेंशन दर्शविते की हा एक [React कंपोनंट](https://www.w3schools.com/react/react_components.asp) आहे जो [TypeScript](https://www.typescriptlang.org/) मध्ये लिहिला आहे, जे JavaScript चे एक एक्स्टेंशन आहे आणि [टाईप चेकिंगला](https://en.wikipedia.org/wiki/Type_system#Type_checking) सपोर्ट करते. TypeScript हे JavaScript मध्ये कंपाईल केले जाते, त्यामुळे आपण ते क्लायंट साईडवर वापरू शकतो.

जर तुम्हाला स्वारस्य असेल तरच ही फाईल प्रामुख्याने स्पष्ट केली आहे. सहसा तुम्ही ही फाईल बदलत नाही, तर [`src/App.tsx`](#app-tsx) आणि ती इम्पोर्ट करत असलेल्या फाईल्स बदलता.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

आपल्याला आवश्यक असलेला लायब्ररी कोड इम्पोर्ट करा.

```tsx
import App from './App.tsx'
```

ॲप्लिकेशनची अंमलबजावणी करणारा React कंपोनंट इम्पोर्ट करा (खाली पहा).

```tsx
import { config } from './wagmi.ts'
```

[wagmi](https://wagmi.sh/) कॉन्फिगरेशन इम्पोर्ट करा, ज्यामध्ये ब्लॉकचेन कॉन्फिगरेशन समाविष्ट आहे.

```tsx
const queryClient = new QueryClient()
```

[React Query च्या](https://tanstack.com/query/latest/docs/framework/react/overview) कॅशे मॅनेजरचा एक नवीन इन्स्टन्स तयार करते. हा ऑब्जेक्ट खालील गोष्टी स्टोअर करेल:

- कॅशे केलेले RPC कॉल्स
- कॉन्ट्रॅक्ट रीड्स
- बॅकग्राउंड रिफेचिंग स्टेट

आपल्याला कॅशे मॅनेजरची आवश्यकता आहे कारण wagmi v3 अंतर्गतपणे React Query वापरते.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

रूट React कंपोनंट तयार करा. `render` चा पॅरामीटर [JSX](https://www.w3schools.com/react/react_jsx.asp) आहे, जी एक एक्स्टेंशन लँग्वेज आहे आणि HTML आणि JavaScript/TypeScript दोन्ही वापरते. येथील उद्गारवाचक चिन्ह TypeScript कंपोनंटला सांगते: "तुम्हाला माहित नाही की `document.getElementById('root')` हे `ReactDOM.createRoot` साठी एक वैध पॅरामीटर असेल, पण काळजी करू नका - मी डेव्हलपर आहे आणि मी तुम्हाला सांगत आहे की ते असेल".

```tsx
  <React.StrictMode>
```

हे ॲप्लिकेशन [एका `React.StrictMode` कंपोनंटच्या](https://react.dev/reference/react/StrictMode) आत जात आहे. हा कंपोनंट React लायब्ररीला अतिरिक्त डीबगिंग चेक्स समाविष्ट करण्यास सांगतो, जे डेव्हलपमेंट दरम्यान उपयुक्त ठरते.

```tsx
    <WagmiProvider config={config}>
```

हे ॲप्लिकेशन [एका `WagmiProvider` कंपोनंटच्या](https://wagmi.sh/react/api/WagmiProvider) आत देखील आहे. [wagmi (we are going to make it) लायब्ररी](https://wagmi.sh/) इथरियम डिसेंट्रलाईज्ड ॲप्लिकेशन लिहिण्यासाठी React UI डेफिनेशन्सना [viem लायब्ररीशी](https://viem.sh/) जोडते.

```tsx
      <QueryClientProvider client={queryClient}>
```

आणि शेवटी, एक React Query प्रोव्हायडर जोडा जेणेकरून कोणताही ॲप्लिकेशन कंपोनंट कॅशे केलेल्या क्वेरीज वापरू शकेल.

```tsx
        <App />
```

आता आपण ॲप्लिकेशनसाठी कंपोनंट घेऊ शकतो, जो प्रत्यक्षात UI ची अंमलबजावणी करतो. कंपोनंटच्या शेवटी असलेले `/>` React ला सांगते की XML स्टँडर्डनुसार या कंपोनंटच्या आत कोणत्याही डेफिनेशन्स नाहीत.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

अर्थात, आपल्याला इतर कंपोनंट्स बंद करावे लागतील.

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

आपल्याला आवश्यक असलेल्या लायब्ररीज, तसेच [`Greeter` कंपोनंट](#greeter-tsx) इम्पोर्ट करा.

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia चेन ID.

```
function App() {
```

React कंपोनंट तयार करण्याचा हा स्टँडर्ड मार्ग आहे: एक फंक्शन डिफाईन करा जे जेव्हा रेंडर करण्याची आवश्यकता असते तेव्हा कॉल केले जाते. या फंक्शनमध्ये सामान्यतः TypeScript किंवा JavaScript कोड असतो, त्यानंतर एक `return` स्टेटमेंट असते जे JSX कोड रिटर्न करते.

```tsx
  const connection = useConnection()
```

सध्याच्या कनेक्शनशी संबंधित माहिती मिळवण्यासाठी [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) वापरा, जसे की ॲड्रेस आणि `chainId`.

प्रथेनुसार, React मध्ये `use...` नावाच्या फंक्शन्सना [हुक्स (hooks)](https://www.w3schools.com/react/react_hooks.asp) म्हणतात. ही फंक्शन्स केवळ कंपोनंटला डेटा रिटर्न करत नाहीत; तर जेव्हा तो डेटा बदलतो तेव्हा ते पुन्हा रेंडर केले जाईल (कंपोनंट फंक्शन पुन्हा एक्झिक्युट केले जाते आणि त्याचे आऊटपुट HTML मधील मागील आऊटपुटची जागा घेते) याची देखील खात्री करतात.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

वॉलेट कनेक्शनबद्दल माहिती मिळवण्यासाठी [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) वापरा.

```tsx
  const { disconnect } = useDisconnect()
```

[हा हुक](https://wagmi.sh/react/api/hooks/useDisconnect) आपल्याला वॉलेटमधून डिस्कनेक्ट करण्यासाठी फंक्शन देतो.

```tsx
  const { switchChain } = useSwitchChain()
```

[हा हुक](https://wagmi.sh/react/api/hooks/useSwitchChain) आपल्याला चेन्स स्विच करू देतो.

```tsx
  useEffect(() => {
```

React हुक [`useEffect`](https://react.dev/reference/react/useEffect) तुम्हाला बाह्य सिस्टीम सिंक्रोनाईज करण्यासाठी जेव्हा एखाद्या व्हेरिएबलचे मूल्य बदलते तेव्हा फंक्शन रन करू देतो.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

जर आपण कनेक्टेड असू, पण Sepolia ब्लॉकचेनशी नसू, तर Sepolia वर स्विच करा.

```tsx
  }, [connection.status, connection.chainId])
```

प्रत्येक वेळी जेव्हा कनेक्शन स्टेटस किंवा कनेक्शन chainId बदलतो तेव्हा फंक्शन पुन्हा रन करा.

```tsx
  return (
    <>
```

React कंपोनंटच्या JSX ने एकच HTML कंपोनंट रिटर्न करणे _आवश्यक_ आहे. जेव्हा आपल्याकडे अनेक कंपोनंट्स असतात आणि त्या सर्वांना रॅप करण्यासाठी कंटेनरची आवश्यकता नसते, तेव्हा आपण त्यांना एकाच कंपोनंटमध्ये एकत्र करण्यासाठी एक रिकामा कंपोनंट (`<> ... </>`) वापरतो.

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

सध्याच्या कनेक्शनबद्दल माहिती द्या. JSX मध्ये, `{<expression>}` म्हणजे एक्स्प्रेशनचे JavaScript म्हणून मूल्यमापन करणे.

```tsx
      {connection.status === 'connected' && (
```

`{<condition> && <value>}` या सिंटॅक्सचा अर्थ असा आहे की "जर कंडिशन `true` असेल, तर व्हॅल्यूचे मूल्यमापन करा; जर नसेल, तर `false` चे मूल्यमापन करा".

JSX मध्ये if स्टेटमेंट्स टाकण्याचा हा स्टँडर्ड मार्ग आहे.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX हे XML स्टँडर्ड फॉलो करते, जे HTML पेक्षा अधिक कडक आहे. जर एखाद्या टॅगला संबंधित एंड टॅग नसेल, तर तो टर्मिनेट करण्यासाठी त्याच्या शेवटी स्लॅश (`/`) असणे _आवश्यक_ आहे.

येथे आपल्याकडे असे दोन टॅग्स आहेत, `<Greeter />` (ज्यामध्ये प्रत्यक्षात कॉन्ट्रॅक्टशी संवाद साधणारा HTML कोड असतो) आणि [आडव्या रेषेसाठी `<hr />`](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

जर युजरने या बटणावर क्लिक केले, तर `disconnect` फंक्शन कॉल करा.

```tsx
      {connection.status !== 'connected' && (
```

जर आपण कनेक्टेड _नसू_, तर वॉलेटशी कनेक्ट करण्यासाठी आवश्यक पर्याय दाखवा.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors` मध्ये आपल्याकडे कनेक्टर्सची यादी आहे. आपण ती प्रदर्शित करण्यासाठी JSX बटणांच्या यादीत बदलण्यासाठी [`map`](https://www.w3schools.com/jsref/jsref_map.asp) वापरतो.

```tsx
            <button
              key={connector.uid}
```

JSX मध्ये "सिबलिंग" टॅग्ससाठी (एकाच पॅरेंटपासून आलेले टॅग्स) वेगवेगळे आयडेंटिफायर्स असणे आवश्यक आहे.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

कनेक्टर बटणे.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

अतिरिक्त माहिती द्या. `<variable>?.<field>` हा एक्स्प्रेशन सिंटॅक्स JavaScript ला सांगतो की जर व्हेरिएबल डिफाईन केले असेल, तर त्या फील्डचे मूल्यमापन करा. जर व्हेरिएबल डिफाईन केले नसेल, तर हे एक्स्प्रेशन `undefined` चे मूल्यमापन करते.

जेव्हा कोणतीही एरर नसते, तेव्हा `error.message` हे एक्स्प्रेशन एक्सेप्शन निर्माण करेल. `error?.message` वापरल्याने आपल्याला ही समस्या टाळता येते.

#### `src/Greeter.tsx` {#greeter-tsx}

या फाईलमध्ये बहुतांश UI कार्यक्षमता आहे. यात अशा डेफिनेशन्स समाविष्ट आहेत ज्या सामान्यतः अनेक फाईल्समध्ये असतात, परंतु हे एक ट्युटोरिअल असल्याने, प्रोग्राम परफॉर्मन्स किंवा देखभालीच्या सुलभतेपेक्षा पहिल्यांदा समजण्यास सोपा असावा यासाठी ऑप्टिमाईज केला आहे.

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

आपण ही लायब्ररी फंक्शन्स वापरतो. पुन्हा, ती जिथे वापरली आहेत तिथे खाली स्पष्ट केली आहेत.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` लायब्ररी](https://abitype.dev/) आपल्याला विविध इथरियम डेटा टाईप्ससाठी TypeScript डेफिनेशन्स प्रदान करते, जसे की [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const // greeterABI
```

`Greeter` कॉन्ट्रॅक्टसाठी ABI.
जर तुम्ही कॉन्ट्रॅक्ट्स आणि UI एकाच वेळी डेव्हलप करत असाल, तर तुम्ही सामान्यतः त्यांना एकाच रिपॉझिटरीमध्ये ठेवाल आणि Solidity कंपायलरद्वारे जनरेट केलेला ABI तुमच्या ॲप्लिकेशनमध्ये फाईल म्हणून वापराल. तथापि, येथे हे आवश्यक नाही कारण कॉन्ट्रॅक्ट आधीच डेव्हलप केले आहे आणि ते बदलणार नाही.

आपण TypeScript ला हे सांगण्यासाठी [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) वापरतो की हा एक _खरा_ कॉन्स्टंट आहे. सामान्यतः, जेव्हा तुम्ही JavaScript मध्ये `const x = {"a": 1}` निर्दिष्ट करता, तेव्हा तुम्ही `x` मधील व्हॅल्यू बदलू शकता, तुम्ही फक्त त्याला असाईन करू शकत नाही.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript हे स्ट्रॉंगली टाईप्ड आहे. आपण या डेफिनेशनचा वापर वेगवेगळ्या चेन्सवर `Greeter` कॉन्ट्रॅक्ट जिथे डिप्लॉय केले आहे तो ॲड्रेस निर्दिष्ट करण्यासाठी करतो. की (key) हा एक नंबर (chainId) आहे आणि व्हॅल्यू ही एक `AddressType` (एक ॲड्रेस) आहे.

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // सेपोलिया
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) वरील कॉन्ट्रॅक्टचा ॲड्रेस.

##### `Timer` कंपोनंट {#timer-component}

`Timer` कंपोनंट दिलेल्या वेळेपासून किती सेकंद झाले हे दर्शवितो. युझेबिलिटीच्या उद्देशाने हे महत्त्वाचे आहे. जेव्हा युजर्स काहीतरी करतात, तेव्हा त्यांना त्वरित प्रतिक्रियेची अपेक्षा असते. ब्लॉकचेन्समध्ये, हे अनेकदा अशक्य असते कारण जोपर्यंत ट्रान्झॅक्शन ब्लॉकमध्ये ठेवले जात नाही तोपर्यंत काहीही होत नाही. यावर एक उपाय म्हणजे युजरने कृती केल्यापासून किती वेळ झाला आहे हे दाखवणे, जेणेकरून लागणारा वेळ योग्य आहे की नाही हे युजर ठरवू शकेल.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` कंपोनंट एक पॅरामीटर घेतो, `lastUpdate`, जी शेवटच्या कृतीची वेळ असते.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

कंपोनंट योग्यरित्या कार्य करण्यासाठी आपल्याकडे स्टेट (कंपोनंटशी जोडलेले व्हेरिएबल) असणे आणि ते अपडेट करणे आवश्यक आहे. परंतु आपल्याला ते कधीही वाचण्याची आवश्यकता नसते, त्यामुळे व्हेरिएबल तयार करण्याची तसदी घेऊ नका.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) फंक्शन आपल्याला वेळोवेळी रन करण्यासाठी फंक्शन शेड्युल करू देते. या प्रकरणात, दर सेकंदाला. हे फंक्शन स्टेट अपडेट करण्यासाठी `setNow` ला कॉल करते, त्यामुळे `Timer` कंपोनंट पुन्हा रेंडर होईल. आपण याला एका रिकाम्या डिपेंडन्सी लिस्टसह [`useEffect`](https://react.dev/reference/react/useEffect) च्या आत रॅप करतो जेणेकरून ते प्रत्येक वेळी कंपोनंट रेंडर झाल्यावर होण्याऐवजी फक्त एकदाच होईल.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

शेवटच्या अपडेटपासून किती सेकंद झाले याची गणना करा आणि ते रिटर्न करा.

##### `Greeter` कंपोनंट {#greeter-component}

```tsx
const Greeter = () => {
```

शेवटी, आपण कंपोनंट डिफाईन करतो.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

आपण वापरत असलेल्या चेन आणि अकाउंटबद्दलची माहिती, [wagmi](https://wagmi.sh/) च्या सौजन्याने. कारण हा एक हुक (`use...`) आहे, जेव्हा ही माहिती बदलते तेव्हा कंपोनंट पुन्हा रेंडर केला जातो.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter कॉन्ट्रॅक्टचा ॲड्रेस, जो `undefined` असतो जर आपल्याकडे चेनची माहिती नसेल, किंवा आपण त्या कॉन्ट्रॅक्टशिवाय असलेल्या चेनवर असू.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // कोणतेही आर्ग्युमेंट्स नाहीत
  })
```

[`useReadContract` हुक](https://wagmi.sh/react/api/hooks/useReadContract) [कॉन्ट्रॅक्टच्या](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) `greet` फंक्शनला कॉल करतो.

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React चा [`useState` हुक](https://www.w3schools.com/react/react_usestate.asp) आपल्याला एक स्टेट व्हेरिएबल निर्दिष्ट करू देतो, ज्याची व्हॅल्यू कंपोनंटच्या एका रेंडरिंगपासून दुसऱ्या रेंडरिंगपर्यंत टिकून राहते. प्रारंभिक व्हॅल्यू हे पॅरामीटर असते, या प्रकरणात रिकामी स्ट्रिंग.

`useState` हुक दोन व्हॅल्यूज असलेली यादी रिटर्न करतो:

1. स्टेट व्हेरिएबलची सध्याची व्हॅल्यू.
2. आवश्यकतेनुसार स्टेट व्हेरिएबलमध्ये बदल करण्यासाठी एक फंक्शन. हा एक हुक असल्याने, प्रत्येक वेळी जेव्हा त्याला कॉल केले जाते तेव्हा कंपोनंट पुन्हा रेंडर केला जातो.

या प्रकरणात, युजरला जे नवीन ग्रीटिंग सेट करायचे आहे त्यासाठी आपण स्टेट व्हेरिएबल वापरत आहोत.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

जर अनेक युजर्स एकाच वेळी एकच कॉन्ट्रॅक्ट वापरत असतील, तर ते एकमेकांचे ग्रीटिंग्ज ओव्हरराईट करू शकतात. यामुळे युजर्सना असे वाटेल की ॲप्लिकेशन खराब झाले आहे. जर ॲप्लिकेशनने दाखवले की शेवटचे ग्रीटिंग कोणी सेट केले आहे, तर युजरला समजेल की ते दुसरे कोणीतरी होते आणि ॲप्लिकेशन योग्यरित्या काम करत आहे.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

युजर्सना त्यांच्या कृतींचा त्वरित परिणाम झालेला पाहायला आवडते. तथापि, ब्लॉकचेनवर असे होत नाही. हे स्टेट व्हेरिएबल्स आपल्याला युजर्सना किमान काहीतरी प्रदर्शित करू देतात जेणेकरून त्यांना समजेल की त्यांची कृती प्रगतीपथावर आहे.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

जर वरील `readResults` ने डेटा बदलला आणि तो फॉल्स व्हॅल्यूवर (`undefined`, उदाहरणार्थ) सेट केलेला नसेल, तर सध्याचे ग्रीटिंग ब्लॉकचेनवरून वाचलेल्या ग्रीटिंगवर अपडेट करा. तसेच, स्टेटस अपडेट करा.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` इव्हेंट्स ऐका.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` चा अर्थ असा आहे की जर व्हॅल्यू `false` असेल, किंवा अशी व्हॅल्यू जिचे मूल्यमापन फॉल्स म्हणून होते, जसे की `undefined`, `0`, किंवा रिकामी स्ट्रिंग, तर एकूण एक्स्प्रेशन `false` असते. इतर कोणत्याही व्हॅल्यूसाठी, ते `true` असते. व्हॅल्यूजना बुलियन्समध्ये रूपांतरित करण्याचा हा एक मार्ग आहे, कारण जर `greeterAddr` नसेल, तर आपल्याला इव्हेंट्स ऐकायचे नाहीत.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

जेव्हा आपण लॉग्स पाहतो (जे नवीन इव्हेंट पाहिल्यावर घडते), तेव्हा त्याचा अर्थ असा होतो की ग्रीटिंग सुधारित केले गेले आहे. त्या प्रकरणात, आपण `currentGreeting` आणि `lastSetterAddress` नवीन व्हॅल्यूजवर अपडेट करू शकतो. तसेच, आपल्याला स्टेटस डिस्प्ले अपडेट करायचा आहे.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

जेव्हा आपण स्टेटस अपडेट करतो तेव्हा आपल्याला दोन गोष्टी करायच्या असतात:

1. स्टेटस स्ट्रिंग अपडेट करणे (`status`)
2. शेवटच्या स्टेटस अपडेटची वेळ (`statusTime`) आताच्या वेळेवर अपडेट करणे.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

नवीन ग्रीटिंग इनपुट फील्डमधील बदलांसाठी हा इव्हेंट हँडलर आहे. आपण `evt` पॅरामीटरचा प्रकार निर्दिष्ट करू शकलो असतो, परंतु TypeScript ही एक टाईप ऑप्शनल लँग्वेज आहे. हे फंक्शन HTML इव्हेंट हँडलरमध्ये फक्त एकदाच कॉल केले जात असल्याने, मला वाटत नाही की ते आवश्यक आहे.

```tsx
  const { writeContractAsync } = useWriteContract()
```

कॉन्ट्रॅक्टवर राईट करण्यासाठी फंक्शन. हे [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts) सारखेच आहे, परंतु अधिक चांगले स्टेटस अपडेट्स सक्षम करते.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

क्लायंटच्या दृष्टिकोनातून ब्लॉकचेन ट्रान्झॅक्शन सबमिट करण्याची ही प्रक्रिया आहे:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) वापरून ब्लॉकचेनमधील नोडला ट्रान्झॅक्शन पाठवा.
2. नोडकडून प्रतिसादाची प्रतीक्षा करा.
3. जेव्हा प्रतिसाद प्राप्त होतो, तेव्हा युजरला वॉलेटद्वारे ट्रान्झॅक्शन साईन करण्यास सांगा. ही पायरी नोडचा प्रतिसाद मिळाल्यानंतरच होणे _आवश्यक_ आहे कारण साईन करण्यापूर्वी युजरला ट्रान्झॅक्शनचा गॅस खर्च दाखवला जातो.
4. युजरच्या मंजुरीची प्रतीक्षा करा.
5. ट्रान्झॅक्शन पुन्हा पाठवा, यावेळी [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) वापरून.

पायरी 2 ला लक्षणीय वेळ लागण्याची शक्यता आहे, ज्या दरम्यान युजर्सना प्रश्न पडू शकतो की त्यांची कमांड युजर इंटरफेसद्वारे प्राप्त झाली आहे की नाही आणि त्यांना अद्याप ट्रान्झॅक्शन साईन करण्यास का विचारले जात नाही. यामुळे एक खराब युजर एक्सपिरियन्स (UX) तयार होतो.

यावर एक उपाय म्हणजे प्रत्येक वेळी पॅरामीटर बदलल्यावर `eth_estimateGas` पाठवणे. त्यानंतर, जेव्हा युजरला प्रत्यक्षात ट्रान्झॅक्शन पाठवायचे असते (या प्रकरणात **Update greeting** दाबून), तेव्हा गॅस खर्च माहित असतो आणि युजर लगेच वॉलेट पेज पाहू शकतो.

```tsx
  return (
```

आता आपण शेवटी रिटर्न करण्यासाठी प्रत्यक्ष HTML तयार करू शकतो.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

सध्याचे ग्रीटिंग दाखवा.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

जर आपल्याला माहित असेल की शेवटचे ग्रीटिंग कोणी सेट केले आहे, तर ती माहिती प्रदर्शित करा. `Greeter` या माहितीचा मागोवा ठेवत नाही, आणि आपल्याला `SetGreeting` इव्हेंट्ससाठी मागे वळून पाहायचे नाही, त्यामुळे आपण रन करत असताना ग्रीटिंग बदलल्यावरच आपल्याला ते मिळते.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

हे इनपुट टेक्स्ट फील्ड आहे जिथे युजर नवीन ग्रीटिंग सेट करू शकतो. प्रत्येक वेळी जेव्हा युजर की दाबतो, तेव्हा आपण `greetingChange` ला कॉल करतो, जे `setNewGreeting` ला कॉल करते. `setNewGreeting` हे `useState` मधून येत असल्याने, यामुळे `Greeter` कंपोनंट पुन्हा रेंडर होतो. याचा अर्थ असा की:

- नवीन ग्रीटिंगची व्हॅल्यू ठेवण्यासाठी आपल्याला `value` निर्दिष्ट करणे आवश्यक आहे, कारण अन्यथा ते परत डीफॉल्टमध्ये, म्हणजे रिकाम्या स्ट्रिंगमध्ये बदलेल.
- प्रत्येक वेळी `newGreeting` बदलल्यावर `simulation` देखील अपडेट केले जाते, याचा अर्थ असा की आपल्याला योग्य ग्रीटिंगसह सिम्युलेशन मिळेल. हे प्रासंगिक असू शकते कारण गॅस खर्च कॉल डेटाच्या आकारावर अवलंबून असतो, जो स्ट्रिंगच्या लांबीवर अवलंबून असतो.

```tsx
      <button disabled={!simulation.data}
```

ट्रान्झॅक्शन पाठवण्यासाठी आवश्यक असलेली माहिती मिळाल्यावरच बटण सक्षम करा.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

स्टेटस अपडेट करा. या टप्प्यावर, युजरने वॉलेटमध्ये पुष्टी करणे आवश्यक आहे.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

ट्रान्झॅक्शन प्रत्यक्षात पाठवल्यानंतरच `writeContractAsync` रिटर्न करते. यामुळे आपण युजरला दाखवू शकतो की ट्रान्झॅक्शन ब्लॉकचेनमध्ये समाविष्ट होण्यासाठी किती वेळ वाट पाहत आहे.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

स्टेटस आणि ते अपडेट केल्यापासून किती वेळ झाला आहे हे दाखवा.

```
export {Greeter}
```

कंपोनंट एक्सपोर्ट करा.

#### `src/wagmi.ts` {#wagmi-ts}

शेवटी, wagmi शी संबंधित विविध डेफिनेशन्स `src/wagmi.ts` मध्ये आहेत. मी येथे सर्वकाही स्पष्ट करणार नाही, कारण त्यातील बहुतांश बॉयलरप्लेट आहे जे तुम्हाला बदलण्याची शक्यता कमी आहे.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

wagmi कॉन्फिगरेशनमध्ये या ॲप्लिकेशनद्वारे समर्थित चेन्स समाविष्ट आहेत. तुम्ही [उपलब्ध चेन्सची यादी](https://wagmi.sh/core/api/chains) पाहू शकता.

```ts
  connectors: [
    injected(),
  ],
```

[हा कनेक्टर](https://wagmi.sh/core/api/connectors/injected) आपल्याला ब्राउझरमध्ये इन्स्टॉल केलेल्या वॉलेटशी संवाद साधू देतो.

```ts
  transports: {
    [sepolia.id]: http()
```

Viem सोबत येणारा डीफॉल्ट HTTP एंडपॉईंट पुरेसा चांगला आहे. जर आपल्याला वेगळी URL हवी असेल, तर आपण `http("https:// hostname ")` किंवा `webSocket("wss:// hostname ")` वापरू शकतो.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## दुसरी ब्लॉकचेन जोडणे {#add-blockchain}

आजकाल अनेक [L2 स्केलिंग सोल्युशन्स](https://ethereum.org/layer-2/) आहेत, आणि तुम्हाला अशा काहींना सपोर्ट करायचा असेल ज्यांना viem अद्याप सपोर्ट करत नाही. हे करण्यासाठी, तुम्ही `src/wagmi.ts` मध्ये बदल करता. या सूचना [Optimism Sepolia](https://chainlist.org/chain/11155420) कसे जोडायचे हे स्पष्ट करतात.

1.  `src/wagmi.ts` एडिट करा

    A. viem मधून `defineChain` टाईप इम्पोर्ट करा.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. नेटवर्क डेफिनेशन जोडा. तुम्हाला Optimism Sepolia साठी हे करण्याची खरोखर गरज नाही, [ते आधीपासूनच `viem` मध्ये आहे](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), परंतु या मार्गाने तुम्ही `viem` मध्ये नसलेली ब्लॉकचेन कशी जोडायची हे शिकता.

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

    C. `createConfig` कॉलमध्ये नवीन चेन जोडा.

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

2.  Sepolia वरील स्वयंचलित स्विच कमेंट आऊट करण्यासाठी `src/App.tsx` एडिट करा. प्रोडक्शन सिस्टीमवर, तुम्ही कदाचित तुम्ही सपोर्ट करत असलेल्या प्रत्येक ब्लॉकचेनच्या लिंक्ससह बटणे दाखवाल.

    ```ts
    /* useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId]) */
    ```

3.  ॲप्लिकेशनला नवीन नेटवर्कवरील तुमच्या कॉन्ट्रॅक्ट्सचा ॲड्रेस माहित आहे याची खात्री करण्यासाठी `src/Greeter.tsx` एडिट करा.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // ऑप्टिमिझम सेपोलिया
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // सेपोलिया
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  तुमच्या ब्राउझरमध्ये.

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true) वर जा आणि तुमच्या वॉलेटमध्ये चेन जोडण्यासाठी टेबलच्या उजव्या बाजूला असलेल्या बटणांपैकी एकावर क्लिक करा.

    B. ॲप्लिकेशनमध्ये, ब्लॉकचेन बदलण्यासाठी **Disconnect** करा आणि नंतर पुन्हा कनेक्ट करा. हे हाताळण्याचे अधिक चांगले मार्ग आहेत, परंतु त्यासाठी ॲप्लिकेशनमध्ये बदल करावे लागतील.

## निष्कर्ष {#conclusion}

अर्थात, तुम्हाला `Greeter` साठी युजर इंटरफेस प्रदान करण्याची खरोखर काळजी नाही. तुम्हाला तुमच्या स्वतःच्या कॉन्ट्रॅक्ट्ससाठी युजर इंटरफेस तयार करायचा आहे. तुमचे स्वतःचे ॲप्लिकेशन तयार करण्यासाठी, या पायऱ्या रन करा:

1. wagmi ॲप्लिकेशन तयार करण्यासाठी निर्दिष्ट करा.

   ```sh copy
   npm create wagmi
   ```

2. पुढे जाण्यासाठी `y` टाईप करा.

3. ॲप्लिकेशनला नाव द्या.

4. **React** फ्रेमवर्क निवडा.

5. **Vite** व्हेरिएंट निवडा.

आता जा आणि तुमचे कॉन्ट्रॅक्ट्स संपूर्ण जगासाठी वापरण्यायोग्य बनवा.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).