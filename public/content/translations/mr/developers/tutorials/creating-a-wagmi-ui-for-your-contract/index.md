---
title: "तुमच्या काँट्रॅक्टसाठी युझर इंटरफेस तयार करणे"
description: "TypeScript, React, Vite आणि Wagmi सारख्या आधुनिक घटकांचा वापर करून, आम्ही एक आधुनिक, पण किमान, युझर इंटरफेस पाहणार आहोत आणि युझर इंटरफेसशी वॉलेट कसे कनेक्ट करावे, माहिती वाचण्यासाठी स्मार्ट काँट्रॅक्टला कॉल कसा करावा, स्मार्ट काँट्रॅक्टला व्यवहार कसा पाठवावा, आणि बदल ओळखण्यासाठी स्मार्ट काँट्रॅक्टमधील इव्हेंटचे निरीक्षण कसे करावे हे शिकणार आहोत."
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: mr
sidebarDepth: 3
---

तुम्हाला Ethereum इकोसिस्टीममध्ये एक आवश्यक वैशिष्ट्य आढळले आहे. तुम्ही ते लागू करण्यासाठी स्मार्ट काँट्रॅक्ट्स लिहिले आणि कदाचित ऑफचेन चालणारा काही संबंधित कोड देखील लिहिला असेल. हे उत्तम आहे! दुर्दैवाने, युझर इंटरफेसशिवाय तुम्हाला कोणतेही युझर मिळणार नाहीत, आणि मागच्या वेळी जेव्हा तुम्ही वेबसाइट लिहिली होती तेव्हा लोक डायल-अप मोडेम वापरत होते आणि JavaScript नवीन होते.

हा लेख तुमच्यासाठी आहे. मी गृहीत धरतो की तुम्हाला प्रोग्रामिंग माहित आहे, आणि कदाचित थोडे JavaScript आणि HTML देखील माहित आहे, परंतु तुमची युझर इंटरफेस कौशल्ये गंजलेली आणि कालबाह्य झाली आहेत. एकत्रितपणे आपण एका सोप्या आधुनिक ऍप्लिकेशनवर नजर टाकू जेणेकरून तुम्हाला दिसेल की आजकाल हे कसे केले जाते.

## हे महत्त्वाचे का आहे {#why-important}

सिद्धांतानुसार, तुम्ही लोकांना तुमच्या काँट्रॅक्ट्सशी संवाद साधण्यासाठी फक्त [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) किंवा [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) वापरण्यास सांगू शकता. अनुभवी Ethereans साठी ते उत्तम असेल. परंतु आम्ही [आणखी एक अब्ज लोकांना](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) सेवा देण्याचा प्रयत्न करत आहोत. एका उत्तम वापरकर्ता अनुभवाशिवाय हे घडणार नाही आणि एक अनुकूल वापरकर्ता इंटरफेस हा त्याचा एक मोठा भाग आहे.

## Greeter ऍप्लिकेशन {#greeter-app}

आधुनिक UI कसे कार्य करते यामागे बराच सिद्धांत आहे, आणि [बर्‍याच चांगल्या साइट्स](https://react.dev/learn/thinking-in-react) [आहेत ज्या ते स्पष्ट करतात](https://wagmi.sh/core/getting-started). त्या साइट्सनी केलेले उत्तम काम पुन्हा करण्याऐवजी, मी असे गृहीत धरणार आहे की तुम्ही करून शिकण्यास प्राधान्य देता आणि अशा ऍप्लिकेशनने सुरुवात करता ज्यासोबत तुम्ही खेळू शकता. गोष्टी पूर्ण करण्यासाठी तुम्हाला अजूनही सिद्धांताची आवश्यकता आहे, आणि आम्ही त्यावर येऊ - आम्ही फक्त सोर्स फाइलनुसार जाऊ, आणि गोष्टी जशा येतील तशा त्यावर चर्चा करू.

### इन्स्टॉलेशन {#installation}

1. आवश्यक असल्यास, तुमच्या वॉलेटमध्ये [Holesky ब्लॉकचेन](https://chainlist.org/?search=holesky&testnets=true) जोडा आणि [चाचणी ETH मिळवा](https://www.holeskyfaucet.io/).

2. github रेपॉजिटरी क्लोन करा.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. आवश्यक पॅकेजेस इंस्टॉल करा.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. ऍप्लिकेशन सुरू करा.

   ```sh
   pnpm dev
   ```

5. ऍप्लिकेशनने दाखवलेल्या URL वर ब्राउझ करा. बहुतेक प्रकरणांमध्ये, ते [http://localhost:5173/](http://localhost:5173/) आहे.

6. तुम्ही काँट्रॅक्ट सोर्स कोड, Hardhat च्या Greeter ची थोडी सुधारित आवृत्ती, [ब्लॉकचेन एक्सप्लोररवर](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) पाहू शकता.

### फाइल वॉक थ्रू {#file-walk-through}

#### `index.html` {#index-html}

ही फाईल मानक HTML बॉयलरप्लेट आहे, फक्त ही ओळ वगळता, जी स्क्रिप्ट फाइल आयात करते.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

फाइल एक्सटेंशन आम्हाला सांगते की ही फाईल [TypeScript](https://www.typescriptlang.org/) मध्ये लिहिलेला एक [React घटक](https://www.w3schools.com/react/react_components.asp) आहे, जो JavaScript चा एक विस्तार आहे जो [टाइप चेकिंग](https://en.wikipedia.org/wiki/Type_system#Type_checking) ला समर्थन देतो. TypeScript हे JavaScript मध्ये संकलित (compiled) केले जाते, म्हणून आम्ही ते क्लायंट-साइड एक्झिक्यूशनसाठी वापरू शकतो.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

आम्हाला आवश्यक असलेला लायब्ररी कोड आयात करा.

```tsx
import { App } from './App'
```

ऍप्लिकेशन लागू करणारा React घटक आयात करा (खाली पहा).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

रूट React घटक तयार करा. `render` चा पॅरामीटर [JSX](https://www.w3schools.com/react/react_jsx.asp) आहे, एक विस्तार भाषा जी HTML आणि JavaScript/TypeScript दोन्ही वापरते. येथील उद्गारवाचक चिन्ह TypeScript घटकाला सांगते: "तुम्हाला माहित नाही की `document.getElementById('root')` हे `ReactDOM.createRoot` साठी एक वैध पॅरामीटर असेल, पण काळजी करू नका - मी डेव्हलपर आहे आणि मी तुम्हाला सांगत आहे की ते असेल".

```tsx
  <React.StrictMode>
```

ऍप्लिकेशन [एका `React.StrictMode` घटकात](https://react.dev/reference/react/StrictMode) जात आहे. हा घटक React लायब्ररीला अतिरिक्त डीबगिंग तपासण्या घालण्यास सांगतो, जे डेव्हलपमेंट दरम्यान उपयुक्त आहे.

```tsx
    <WagmiConfig config={config}>
```

ऍप्लिकेशन [एका `WagmiConfig` घटकात](https://wagmi.sh/react/api/WagmiProvider) देखील आहे. [wagmi (we are going to make it) लायब्ररी](https://wagmi.sh/) Ethereum विकेंद्रित ऍप्लिकेशन लिहिण्यासाठी React UI व्याख्यांना [viem लायब्ररीसह](https://viem.sh/) जोडते.

```tsx
      <RainbowKitProvider chains={chains}>
```

आणि शेवटी, [एक `RainbowKitProvider` घटक](https://www.rainbowkit.com/). हा घटक लॉग ऑन करणे आणि वॉलेट आणि ऍप्लिकेशनमधील संवाद हाताळतो.

```tsx
        <App />
```

आता आमच्याकडे ऍप्लिकेशनसाठी घटक असू शकतो, जो प्रत्यक्षात UI लागू करतो. घटकाच्या शेवटी असलेले `/>` React ला सांगते की या घटकामध्ये XML मानकानुसार कोणतीही व्याख्या नाही.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

अर्थात, आम्हाला इतर घटक बंद करावे लागतील.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

React घटक तयार करण्याचा हा मानक मार्ग आहे - एक फंक्शन परिभाषित करा जे प्रत्येक वेळी रेंडर करण्याची आवश्यकता असताना कॉल केले जाते. या फंक्शनमध्ये सामान्यतः शीर्षस्थानी काही TypeScript किंवा JavaScript कोड असतो, त्यानंतर `return` स्टेटमेंट असते जे JSX कोड परत करते.

```tsx
  const { isConnected } = useAccount()
```

येथे आपण वॉलेटद्वारे ब्लॉकचेनशी कनेक्ट आहोत की नाही हे तपासण्यासाठी [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) वापरतो.

परंपरेनुसार, React मध्ये `use...` नावाची फंक्शन्स [hooks](https://www.w3schools.com/react/react_hooks.asp) असतात जी काही प्रकारचा डेटा परत करतात. जेव्हा तुम्ही असे हुक वापरता, तेव्हा तुमच्या घटकाला केवळ डेटा मिळत नाही, तर जेव्हा तो डेटा बदलतो तेव्हा घटक अद्यतनित माहितीसह पुन्हा रेंडर केला जातो.

```tsx
  return (
    <>
```

React घटकाच्या JSX ने एक घटक परत करणे _आवश्यक_ आहे. जेव्हा आमच्याकडे एकापेक्षा जास्त घटक असतात आणि आमच्याकडे "नैसर्गिकरित्या" गुंडाळण्यासाठी काहीही नसते, तेव्हा आम्ही एक रिकामा घटक (`<> ...` वापरतो </>`) त्यांना एकाच घटकात बनवण्यासाठी.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

आम्हाला RainbowKit कडून [`ConnectButton` घटक](https://www.rainbowkit.com/docs/connect-button) मिळतो. जेव्हा आम्ही कनेक्ट नसतो, तेव्हा ते आम्हाला `Connect Wallet` बटण देते जे एक मोडल उघडते जे वॉलेट्सबद्दल स्पष्ट करते आणि तुम्हाला कोणते वापरायचे आहे ते निवडू देते. जेव्हा आम्ही कनेक्ट असतो, तेव्हा ते आम्ही वापरत असलेले ब्लॉकचेन, आमचा खाते पत्ता आणि आमची ETH शिल्लक दर्शवते. आम्ही नेटवर्क स्विच करण्यासाठी किंवा डिस्कनेक्ट करण्यासाठी हे डिस्प्ले वापरू शकतो.

```tsx
      {isConnected && (
```

जेव्हा आम्हाला JSX मध्ये प्रत्यक्ष JavaScript (किंवा JavaScript मध्ये संकलित केले जाणारे TypeScript) घालण्याची आवश्यकता असते, तेव्हा आम्ही कंस (`{}`) वापरतो.

`a && b` हे सिंटॅक्स [`a ?` साठी लहान आहे. b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). म्हणजे, जर `a`सत्य असेल तर त्याचे मूल्य`b`होते आणि अन्यथा त्याचे मूल्य`a`होते (जे`false`, `0`, इत्यादी असू शकते). React ला हे सांगण्याचा हा एक सोपा मार्ग आहे की एखादा घटक केवळ तेव्हाच प्रदर्शित केला पाहिजे जेव्हा एखादी विशिष्ट अट पूर्ण होते.

या प्रकरणात, वापरकर्ता ब्लॉकचेनशी कनेक्ट असल्यास आम्ही फक्त वापरकर्त्याला `Greeter` दाखवू इच्छितो.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

या फाइलमध्ये बहुतेक UI कार्यक्षमता आहे. यात अशा व्याख्यांचा समावेश आहे ज्या सामान्यतः एकाधिक फाईल्समध्ये असतील, परंतु हे एक ट्यूटोरियल असल्याने, प्रोग्राम कामगिरी किंवा देखभालीच्या सुलभतेऐवजी पहिल्यांदा समजण्यास सोपे होण्यासाठी ऑप्टिमाइझ केला आहे.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

आम्ही ही लायब्ररी फंक्शन्स वापरतो. पुन्हा, ते कुठे वापरले जातात हे खाली स्पष्ट केले आहे.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` लायब्ररी](https://abitype.dev/) आम्हाला विविध Ethereum डेटा प्रकारांसाठी TypeScript व्याख्या प्रदान करते, जसे की [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` करारासाठी ABI.
जर तुम्ही काँट्रॅक्ट आणि UI एकाच वेळी विकसित करत असाल तर तुम्ही सामान्यतः त्यांना एकाच रेपॉजिटरीमध्ये ठेवाल आणि तुमच्या ऍप्लिकेशनमधील फाइल म्हणून Solidity कंपाइलरद्वारे व्युत्पन्न केलेला ABI वापराल. तथापि, येथे हे आवश्यक नाही कारण करार आधीच विकसित झाला आहे आणि बदलणार नाही.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript स्ट्राँगली टाईप आहे. आम्ही या व्याख्येचा वापर विविध चेन्सवर `Greeter` काँट्रॅक्ट तैनात केलेला पत्ता निर्दिष्ट करण्यासाठी करतो. की ही एक संख्या आहे (chainId), आणि मूल्य एक `AddressType` (एक पत्ता) आहे.

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

दोन समर्थित नेटवर्क्सवर कराराचा पत्ता: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) आणि [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

टीप: प्रत्यक्षात तिसरी व्याख्या आहे, Redstone Holesky साठी, ती खाली स्पष्ट केली जाईल.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

हा प्रकार `ShowObject` घटकासाठी पॅरामीटर म्हणून वापरला जातो (नंतर स्पष्ट केला आहे). यात ऑब्जेक्टचे नाव आणि त्याचे मूल्य समाविष्ट आहे, जे डीबगिंगच्या उद्देशाने प्रदर्शित केले जातात.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

कोणत्याही क्षणी आम्हाला एकतर अभिवादन काय आहे हे माहित असू शकते (कारण आम्ही ते ब्लॉकचेनवरून वाचले आहे) किंवा माहित नाही (कारण आम्हाला ते अद्याप मिळालेले नाही). म्हणून असा प्रकार असणे उपयुक्त आहे जो एकतर स्ट्रिंग किंवा काहीही असू शकतो.

##### `Greeter` घटक {#greeter-component}

```tsx
const Greeter = () => {
```

शेवटी, आम्ही घटक परिभाषित करतो.

```tsx
  const { chain } = useNetwork()
```

आपण वापरत असलेल्या चेनबद्दल माहिती, [wagmi](https://wagmi.sh/react/hooks/useNetwork) च्या सौजन्याने.
कारण हा एक हुक (`use...`) आहे, प्रत्येक वेळी ही माहिती बदलल्यावर घटक पुन्हा काढला जातो.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter काँट्रॅक्टचा पत्ता, जो चेननुसार बदलतो (आणि जर आमच्याकडे चेन माहिती नसेल किंवा आम्ही त्या काँट्रॅक्टशिवाय चेनवर असू तर तो `undefined` असतो).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` हुक](https://wagmi.sh/react/api/hooks/useReadContract) एका काँट्रॅक्टमधून माहिती वाचतो. UI मध्ये `readResults` विस्तारून ते नक्की कोणती माहिती परत करते हे तुम्ही पाहू शकता. या प्रकरणात आम्हाला ते शोधत रहायचे आहे जेणेकरून अभिवादन बदलल्यावर आम्हाला सूचित केले जाईल.

**टीप:** अभिवादन कधी बदलते हे जाणून घेण्यासाठी आणि त्या मार्गाने अपडेट करण्यासाठी आम्ही [`setGreeting` इव्हेंट](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) ऐकू शकतो. तथापि, ते अधिक कार्यक्षम असले तरी, ते सर्व बाबतीत लागू होणार नाही. जेव्हा वापरकर्ता वेगळ्या चेनवर स्विच करतो, तेव्हा अभिवादन देखील बदलते, परंतु त्या बदलासोबत इव्हेंट नसतो. आमच्याकडे कोडचा एक भाग इव्हेंट ऐकत असू शकतो आणि दुसरा चेन बदल ओळखण्यासाठी असू शकतो, परंतु ते फक्त [`watch` पॅरामीटर](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) सेट करण्यापेक्षा अधिक क्लिष्ट असेल.

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React चा [`useState` हुक](https://www.w3schools.com/react/react_usestate.asp) आम्हाला एक स्टेट व्हेरिएबल निर्दिष्ट करू देतो, ज्याचे मूल्य घटकाच्या एका रेंडरिंगपासून दुसऱ्या रेंडरिंगपर्यंत टिकून राहते. प्रारंभिक मूल्य हे पॅरामीटर आहे, या प्रकरणात रिक्त स्ट्रिंग.

`useState` हुक दोन मूल्यांसह एक सूची परत करतो:

1. स्टेट व्हेरिएबलचे वर्तमान मूल्य.
2. आवश्यकतेनुसार स्टेट व्हेरिएबलमध्ये बदल करण्यासाठी एक फंक्शन. हा एक हुक असल्याने, प्रत्येक वेळी तो कॉल केल्यावर घटक पुन्हा रेंडर होतो.

या प्रकरणात, आम्ही वापरकर्त्याने सेट करू इच्छित असलेल्या नवीन अभिवादनासाठी स्टेट व्हेरिएबल वापरत आहोत.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

नवीन अभिवादन इनपुट फील्ड बदलल्यावर हा इव्हेंट हँडलर आहे. प्रकार, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), निर्दिष्ट करतो की हा HTML इनपुट घटकाच्या मूल्याच्या बदलासाठी हँडलर आहे. `<HTMLInputElement>` भाग वापरला जातो कारण हा एक [जेनेरिक प्रकार](https://www.w3schools.com/typescript/typescript_basic_generics.php) आहे.

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

क्लायंटच्या दृष्टिकोनातून ब्लॉकचेन व्यवहार सबमिट करण्याची ही प्रक्रिया आहे:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) वापरून ब्लॉकचेनमधील नोडला व्यवहार पाठवा.
2. नोडकडून प्रतिसादाची प्रतीक्षा करा.
3. जेव्हा प्रतिसाद प्राप्त होतो, तेव्हा वापरकर्त्याला वॉलेटद्वारे व्यवहार साइन करण्यास सांगा. ही पायरी नोड प्रतिसाद मिळाल्यानंतर _घडायलाच हवी_ कारण वापरकर्त्याला साइन करण्यापूर्वी व्यवहाराची गॅस किंमत दर्शविली जाते.
4. वापरकर्त्याच्या मंजुरीची प्रतीक्षा करा.
5. यावेळी [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) वापरून व्यवहार पुन्हा पाठवा.

पायरी 2 मध्ये लक्षात येण्याजोगा वेळ लागण्याची शक्यता आहे, ज्या दरम्यान वापरकर्त्यांना आश्चर्य वाटेल की त्यांची कमांड खरोखरच युझर इंटरफेसद्वारे प्राप्त झाली आहे की नाही आणि त्यांना आधीच व्यवहार साइन करण्यास का सांगितले जात नाही. त्यामुळे वापरकर्ता अनुभव (UX) वाईट होतो.

यावरील उपाय म्हणजे [प्रिपेअर हुक्स](https://wagmi.sh/react/prepare-hooks) वापरणे. प्रत्येक वेळी जेव्हा पॅरामीटर बदलतो, तेव्हा लगेच नोडला `eth_estimateGas` विनंती पाठवा. मग, जेव्हा वापरकर्त्याला प्रत्यक्षात व्यवहार पाठवायचा असतो (या प्रकरणात **अपडेट ग्रीटिंग** दाबून), तेव्हा गॅसची किंमत ज्ञात असते आणि वापरकर्ता लगेच वॉलेट पृष्ठ पाहू शकतो.

```tsx
  return (
```

आता आपण शेवटी परत करण्यासाठी वास्तविक HTML तयार करू शकतो.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

`ShowGreeting` घटक तयार करा (खाली स्पष्ट केले आहे), परंतु फक्त जर अभिवादन ब्लॉकचेनमधून यशस्वीरित्या वाचले गेले असेल तरच.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

हे इनपुट टेक्स्ट फील्ड आहे जिथे वापरकर्ता नवीन अभिवादन सेट करू शकतो. प्रत्येक वेळी जेव्हा वापरकर्ता की दाबतो, तेव्हा आम्ही `greetingChange` ला कॉल करतो जे `setNewGreeting` ला कॉल करते. `setNewGreeting` हे `useState` हुक मधून येत असल्यामुळे, ते `Greeter` घटकाला पुन्हा रेंडर करण्यास प्रवृत्त करते. याचा अर्थ असा:

- आम्हाला नवीन अभिवादनाचे मूल्य ठेवण्यासाठी `value` निर्दिष्ट करणे आवश्यक आहे, कारण अन्यथा ते डीफॉल्ट, रिक्त स्ट्रिंगमध्ये परत येईल.
- `usePrepareContractWrite` प्रत्येक वेळी `newGreeting` बदलल्यावर कॉल केले जाते, याचा अर्थ असा की तयार केलेल्या व्यवहारामध्ये नेहमीच नवीनतम `newGreeting` असेल.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Update greeting
      </button>
```

जर `workingTx.write` नसेल तर आम्ही अद्याप अभिवादन अपडेट पाठवण्यासाठी आवश्यक असलेल्या माहितीची वाट पाहत आहोत, म्हणून बटण अक्षम आहे. जर `workingTx.write` मूल्य असेल तर ते व्यवहार पाठवण्यासाठी कॉल करण्याचे फंक्शन आहे.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

शेवटी, आम्ही काय करत आहोत हे पाहण्यात तुम्हाला मदत करण्यासाठी, आम्ही वापरत असलेल्या तीन वस्तू दाखवा:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` घटक {#showgreeting-component}

हा घटक दाखवतो

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

घटक फंक्शनला घटकाच्या सर्व गुणधर्मांसह एक पॅरामीटर मिळतो.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` घटक {#showobject-component}

माहितीच्या उद्देशांसाठी, आम्ही महत्त्वाच्या वस्तू (`readResults` अभिवादन वाचण्यासाठी आणि `preparedTx` आणि `workingTx` आपण तयार केलेल्या व्यवहारांसाठी) दाखवण्यासाठी `ShowObject` घटक वापरतो.

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

आम्हाला सर्व माहितीने UI ला अव्यवस्थित करायचे नाही, म्हणून त्यांना पाहणे किंवा बंद करणे शक्य करण्यासाठी, आम्ही [`details`](https://www.w3schools.com/tags/tag_details.asp) टॅग वापरतो.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

बहुतेक फील्ड [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) वापरून प्रदर्शित केले जातात.

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

अपवाद फंक्शन्स आहेत, जे [JSON मानकाचा](https://www.json.org/json-en.html) भाग नाहीत, म्हणून ते स्वतंत्रपणे प्रदर्शित करावे लागतील.

```tsx
          {funs.map((f, i) =>
```

JSX मध्ये, `{` कर्ली ब्रॅकेट्स `}` मधील कोड JavaScript म्हणून अर्थ लावला जातो. मग, `(` रेग्युलर ब्रॅकेट्स `)` मधील कोडचा पुन्हा JSX म्हणून अर्थ लावला जातो.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React ला [DOM ट्री](https://www.w3schools.com/js/js_htmldom.asp) मधील टॅगसाठी वेगळे आयडेंटिफायर असणे आवश्यक आहे. याचा अर्थ असा की एकाच टॅगच्या चाइल्ड्सना (या प्रकरणात, [अनऑर्डर्ड लिस्ट](https://www.w3schools.com/tags/tag_ul.asp)), वेगळ्या `key` अॅट्रिब्युट्सची आवश्यकता असते.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

विविध HTML टॅग्ज संपवा.

##### अंतिम `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` घटक हा आहे जो आम्हाला ऍप्लिकेशनसाठी निर्यात करणे आवश्यक आहे.

#### `src/wagmi.ts` {#wagmi-ts}

शेवटी, WAGMI शी संबंधित विविध व्याख्या `src/wagmi.ts` मध्ये आहेत. मी येथे सर्व काही स्पष्ट करणार नाही, कारण त्यातील बहुतेक बॉयलरप्लेट आहे जी तुम्हाला बदलण्याची शक्यता नाही.

येथील कोड [github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) वरील कोड सारखाच नाही कारण नंतर लेखात आम्ही आणखी एक चेन ([Redstone Holesky](https://redstone.xyz/docs/network-info)) जोडतो.

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

ऍप्लिकेशनला समर्थन देणारे ब्लॉकचेन आयात करा. तुम्ही [viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) मध्ये समर्थित चेन्सची सूची पाहू शकता.

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/) वापरण्यास सक्षम होण्यासाठी तुम्हाला तुमच्या ऍप्लिकेशनसाठी प्रोजेक्ट आयडी आवश्यक आहे. तुम्ही ते [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in) वर मिळवू शकता.

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

### दुसरे ब्लॉकचेन जोडणे {#add-blockchain}

आजकाल बरेच [L2 स्केलिंग सोल्यूशन](/layer-2/) आहेत, आणि तुम्ही काहींना समर्थन देऊ इच्छित असाल जे viem अद्याप समर्थन देत नाही. ते करण्यासाठी, तुम्ही `src/wagmi.ts` मध्ये बदल करा. या सूचना [Redstone Holesky](https://redstone.xyz/docs/network-info) कसे जोडायचे हे स्पष्ट करतात.

1. viem वरून `defineChain` प्रकार आयात करा.

   ```ts
   import { defineChain } from 'viem'
   ```

2. नेटवर्क व्याख्या जोडा.

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

3. `configureChains` कॉलमध्ये नवीन चेन जोडा.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. ऍप्लिकेशनला नवीन नेटवर्कवर तुमच्या काँट्रॅक्ट्सचा पत्ता माहित असल्याची खात्री करा. या प्रकरणात, आम्ही `src/components/Greeter.tsx` मध्ये बदल करतो:

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

अर्थात, तुम्हाला `Greeter` साठी युझर इंटरफेस प्रदान करण्याची खरोखर काळजी नाही. तुम्हाला तुमच्या स्वतःच्या काँट्रॅक्ट्ससाठी युझर इंटरफेस तयार करायचा आहे. तुमचे स्वतःचे ऍप्लिकेशन तयार करण्यासाठी, या पायऱ्या चालवा:

1. wagmi ऍप्लिकेशन तयार करण्यासाठी निर्दिष्ट करा.

   ```sh copy
   pnpm create wagmi
   ```

2. ऍप्लिकेशनला नाव द्या.

3. **React** फ्रेमवर्क निवडा.

4. **Vite** व्हेरिएंट निवडा.

5. तुम्ही [Rainbow kit जोडू शकता](https://www.rainbowkit.com/docs/installation#manual-setup).

आता जा आणि तुमचे काँट्रॅक्ट्स व्यापक जगासाठी वापरण्यायोग्य बनवा.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).

