---
title: "உங்கள் ஒப்பந்தத்திற்கு ஒரு பயனர் இடைமுகத்தை உருவாக்குதல்"
description: "TypeScript, React, Vite, மற்றும் Wagmi போன்ற நவீன கூறுகளைப் பயன்படுத்தி, ஒரு நவீன, ஆனால் குறைந்தபட்ச, பயனர் இடைமுகத்தைப் பற்றிப் பார்ப்போம், மேலும் பணப்பையை பயனர் இடைமுகத்துடன் எவ்வாறு இணைப்பது, தகவல்களைப் படிக்க ஸ்மார்ட் ஒப்பந்தத்தை அழைப்பது, ஸ்மார்ட் ஒப்பந்தத்திற்கு ஒரு பரிவர்த்தனையை அனுப்புவது, மற்றும் மாற்றங்களைக் கண்டறிய ஸ்மார்ட் ஒப்பந்தத்திலிருந்து நிகழ்வுகளைக் கண்காணிப்பது எப்படி என்பதைக் கற்றுக்கொள்வோம்."
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: ta
sidebarDepth: 3
---

எத்தேரியம் சூழலமைப்பில் எங்களுக்குத் தேவையான ஒரு அம்சத்தை நீங்கள் கண்டுபிடித்தீர்கள். அதை செயல்படுத்த நீங்கள் ஸ்மார்ட் ஒப்பந்தங்களை எழுதினீர்கள், மேலும் ஆஃப்செயினில் இயங்கும் சில தொடர்புடைய குறியீடுகளையும் கூட எழுதியிருக்கலாம். இது அருமை! துரதிர்ஷ்டவசமாக, ஒரு பயனர் இடைமுகம் இல்லாமல் உங்களுக்கு பயனர்கள் யாரும் இருக்க மாட்டார்கள், மேலும் நீங்கள் கடைசியாக ஒரு வலைத்தளத்தை எழுதியபோது மக்கள் டயல்-அப் மோடம்களைப் பயன்படுத்தினர் மற்றும் ஜாவாஸ்கிரிப்ட் புதியதாக இருந்தது.

இந்தக் கட்டுரை உங்களுக்கானது. உங்களுக்கு நிரலாக்கம் தெரியும், மேலும் ஜாவாஸ்கிரிப்ட் மற்றும் HTML பற்றி கொஞ்சம் தெரிந்திருக்கலாம் என்று நான் கருதுகிறேன், ஆனால் உங்கள் பயனர் இடைமுகத் திறன்கள் துருப்பிடித்தவை மற்றும் காலாவதியானவை. இந்த நாட்களில் இது எப்படி செய்யப்படுகிறது என்பதை நீங்கள் காண, ஒரு எளிய நவீன பயன்பாட்டை நாம் ஒன்றாகப் பார்ப்போம்.

## இது ஏன் முக்கியம் {#why-important}

கோட்பாட்டளவில், உங்கள் ஒப்பந்தங்களுடன் தொடர்பு கொள்ள மக்கள் [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) அல்லது [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) ஐப் பயன்படுத்த வைக்கலாம். அனுபவம் வாய்ந்த எத்தேரியர்களுக்கு இது சிறந்ததாக இருக்கும். ஆனால் நாங்கள் [இன்னொரு பில்லியன் மக்களுக்கு](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) சேவை செய்ய முயற்சிக்கிறோம். ஒரு சிறந்த பயனர் அனுபவம் இல்லாமல் இது நடக்காது, மேலும் ஒரு நட்பான பயனர் இடைமுகம் அதன் ஒரு பெரிய பகுதியாகும்.

## Greeter பயன்பாடு {#greeter-app}

ஒரு நவீன UI வேலைகளுக்குப் பின்னால் நிறைய கோட்பாடுகள் உள்ளன, மேலும் [அதை விளக்கும்](https://wagmi.sh/core/getting-started) [நிறைய நல்ல தளங்கள்](https://react.dev/learn/thinking-in-react) உள்ளன. அந்தத் தளங்களால் செய்யப்பட்ட சிறந்த வேலையை மீண்டும் செய்வதற்குப் பதிலாக, நீங்கள் செய்வதன் மூலம் கற்றுக்கொள்ள விரும்புகிறீர்கள் என்று நான் கருதுகிறேன், மேலும் நீங்கள் விளையாடக்கூடிய ஒரு பயன்பாட்டுடன் தொடங்குகிறேன். காரியங்களைச் செய்து முடிக்க உங்களுக்கு இன்னும் கோட்பாடு தேவை, நாங்கள் அதைப் பெறுவோம் - நாங்கள் மூலக் கோப்பு மூலம் மூலக் கோப்புக்குச் சென்று, அவற்றைப் பெறும்போது விஷயங்களைப் பற்றி விவாதிப்போம்.

### நிறுவல் {#installation}

1. தேவைப்பட்டால், உங்கள் பணப்பையில் [Holesky பிளாக்செயினை](https://chainlist.org/?search=holesky&testnets=true) சேர்த்து [சோதனை ETH](https://www.holeskyfaucet.io/) ஐப் பெறுங்கள்.

2. github களஞ்சியத்தை க்ளோன் செய்யவும்.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. தேவையான தொகுப்புகளை நிறுவவும்.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. பயன்பாட்டைத் தொடங்கவும்.

   ```sh
   pnpm dev
   ```

5. பயன்பாட்டால் காட்டப்படும் URLக்கு உலாவவும். பெரும்பாலான சந்தர்ப்பங்களில், அது [http://localhost:5173/](http://localhost:5173/) ஆகும்.

6. ஒப்பந்த மூலக் குறியீட்டை, Hardhat இன் Greeter இன் சற்று மாற்றியமைக்கப்பட்ட பதிப்பை, [ஒரு பிளாக்செயின் எக்ஸ்ப்ளோரரில்](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) நீங்கள் காணலாம்.

### கோப்பு வழிகாட்டி {#file-walk-through}

#### `index.html` {#index-html}

இந்தக் கோப்பு ஒரு நிலையான HTML கொதிகலன் ஆகும், இந்த வரியைத் தவிர, இது ஸ்கிரிப்ட் கோப்பை இறக்குமதி செய்கிறது.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

கோப்பு நீட்டிப்பு இந்த கோப்பு [TypeScript](https://www.typescriptlang.org/) இல் எழுதப்பட்ட ஒரு [React கூறு](https://www.w3schools.com/react/react_components.asp) என்று கூறுகிறது, இது [வகை சரிபார்ப்பை](https://en.wikipedia.org/wiki/Type_system#Type_checking) ஆதரிக்கும் ஜாவாஸ்கிரிப்டின் நீட்டிப்பு ஆகும். TypeScript ஜாவாஸ்கிரிப்டில் தொகுக்கப்படுகிறது, எனவே வாடிக்கையாளர் பக்க செயலாக்கத்திற்கு இதைப் பயன்படுத்தலாம்.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

நமக்குத் தேவையான நூலகக் குறியீட்டை இறக்குமதி செய்யவும்.

```tsx
import { App } from './App'
```

பயன்பாட்டை செயல்படுத்தும் React கூறுகளை இறக்குமதி செய்யவும் (கீழே காண்க).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

ரூட் React கூறுகளை உருவாக்கவும். `render` க்கான அளவுரு [JSX](https://www.w3schools.com/react/react_jsx.asp) ஆகும், இது HTML மற்றும் JavaScript/TypeScript இரண்டையும் பயன்படுத்தும் ஒரு நீட்டிப்பு மொழியாகும். இங்கே உள்ள ஆச்சரியக்குறி TypeScript கூறுக்கு சொல்கிறது: "`document.getElementById('root')` என்பது `ReactDOM.createRoot` க்கு சரியான அளவுருவாக இருக்குமா என்பது உங்களுக்குத் தெரியாது, ஆனால் கவலைப்பட வேண்டாம் - நான் தான் உருவாக்குநர், அது இருக்கும் என்று நான் உங்களுக்குச் சொல்கிறேன்".

```tsx
  <React.StrictMode>
```

பயன்பாடு [ஒரு `React.StrictMode` கூறுக்குள்](https://react.dev/reference/react/StrictMode) செல்கிறது. இந்த கூறு கூடுதல் பிழைத்திருத்த சோதனைகளைச் செருகுமாறு React நூலகத்திற்குக் கூறுகிறது, இது உருவாக்கத்தின் போது பயனுள்ளதாக இருக்கும்.

```tsx
    <WagmiConfig config={config}>
```

பயன்பாடு [ஒரு `WagmiConfig` கூறுக்குள்ளும்](https://wagmi.sh/react/api/WagmiProvider) உள்ளது. wagmi (we are going to make it) நூலகம், ஒரு எத்தேரியம் பரவலாக்கப்பட்ட பயன்பாட்டை எழுதுவதற்காக React UI வரையறைகளை viem நூலகத்துடன் இணைக்கிறது.

```tsx
      <RainbowKitProvider chains={chains}>
```

இறுதியாக, [ஒரு `RainbowKitProvider` கூறு](https://www.rainbowkit.com/). இந்த கூறு உள்நுழைவு மற்றும் பணப்பைக்கும் பயன்பாட்டிற்கும் இடையிலான தொடர்பைக் கையாளுகிறது.

```tsx
        <App />
```

இப்போது பயன்பாட்டிற்கான கூறுகளை நாம் வைத்திருக்கலாம், இது உண்மையில் UI ஐ செயல்படுத்துகிறது. கூறுகளின் முடிவில் உள்ள `/>`, XML தரநிலையின்படி, இந்தக் கூறுக்குள் எந்த வரையறைகளும் இல்லை என்று React-க்குச் சொல்கிறது.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

நிச்சயமாக, நாம் மற்ற கூறுகளை மூட வேண்டும்.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

ஒரு React கூறுகளை உருவாக்குவதற்கான நிலையான வழி இதுதான் - அது ஒவ்வொரு முறையும் ரெண்டர் செய்யப்பட வேண்டியிருக்கும் போது அழைக்கப்படும் ஒரு செயல்பாட்டை வரையறுப்பது. இந்தச் செயல்பாடு பொதுவாக மேலே சில TypeScript அல்லது JavaScript குறியீட்டைக் கொண்டிருக்கும், அதைத் தொடர்ந்து JSX குறியீட்டை வழங்கும் ஒரு `return` அறிக்கை இருக்கும்.

```tsx
  const { isConnected } = useAccount()
```

ஒரு பணப்பை மூலம் பிளாக்செயினுடன் இணைக்கப்பட்டுள்ளோமா இல்லையா என்பதைச் சரிபார்க்க இங்கே [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) ஐப் பயன்படுத்துகிறோம்.

மரபுப்படி, React-ல் `use...` என்று அழைக்கப்படும் செயல்பாடுகள் சில வகையான தரவைத் தரும் [ஹூக்குகள்](https://www.w3schools.com/react/react_hooks.asp) ஆகும். நீங்கள் அத்தகைய ஹூக்குகளைப் பயன்படுத்தும்போது, ​​உங்கள் கூறு தரவைப் பெறுவது மட்டுமல்லாமல், அந்தத் தரவு மாறும்போது, ​​கூறு புதுப்பிக்கப்பட்ட தகவலுடன் மீண்டும் ரெண்டர் செய்யப்படுகிறது.

```tsx
  return (
    <>
```

ஒரு React கூறின் JSX ஆனது ஒரு கூறினைத் _தருவதாக_ இருக்க வேண்டும். நம்மிடம் பல கூறுகள் இருக்கும்போது மற்றும் "இயற்கையாக" எதையும் போர்த்துவதற்கு எதுவும் இல்லாதபோது, நாம் ஒரு வெற்று கூறினைப் பயன்படுத்துகிறோம் (`<> ...` </>`) அவற்றை ஒரே கூறாக மாற்ற.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

RainbowKit-இலிருந்து [`ConnectButton` கூறு](https://www.rainbowkit.com/docs/connect-button) ஐப் பெறுகிறோம். நாம் இணைக்கப்படாதபோது, அது நமக்கு ஒரு `Connect Wallet` பொத்தானைக் கொடுக்கிறது, இது பணப்பைகளை விளக்கும் ஒரு மாதிரிப் பெட்டியைத் திறந்து, நீங்கள் எதைப் பயன்படுத்துகிறீர்கள் என்பதைத் தேர்வுசெய்ய அனுமதிக்கிறது. நாம் இணைக்கப்பட்டிருக்கும் போது, நாம் பயன்படுத்தும் பிளாக்செயின், நமது கணக்கு முகவரி மற்றும் நமது ETH இருப்பு ஆகியவற்றைக் காட்டுகிறது. நெட்வொர்க்கை மாற்ற அல்லது துண்டிக்க இந்த காட்சிகளை நாம் பயன்படுத்தலாம்.

```tsx
      {isConnected && (
```

நாம் உண்மையான ஜாவாஸ்கிரிப்டை (அல்லது ஜாவாஸ்கிரிப்டில் தொகுக்கப்படும் TypeScript) ஒரு JSX-ல் செருக வேண்டியிருக்கும் போது, நாம் பிராக்கெட்டுகளை (`{}`) பயன்படுத்துகிறோம்.

`a && b` என்ற தொடரியல் [`a ?` என்பதன் சுருக்கமாகும். `b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). அதாவது, `a` உண்மையாக இருந்தால் அது `b` ஆக மதிப்பிடப்படுகிறது, இல்லையெனில் அது `a` ஆக மதிப்பிடப்படுகிறது (`false`, `0`, போன்றவை இருக்கலாம்). ஒரு குறிப்பிட்ட நிபந்தனை பூர்த்தி செய்யப்பட்டால் மட்டுமே ஒரு கூறு காட்டப்பட வேண்டும் என்று React-க்குச் சொல்வதற்கான ஒரு எளிய வழி இது.

இந்த நிலையில், பயனர் ஒரு பிளாக்செயினுடன் இணைக்கப்பட்டிருந்தால் மட்டுமே பயனருக்கு `Greeter` ஐக் காட்ட விரும்புகிறோம்.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

இந்தக் கோப்பு பெரும்பாலான UI செயல்பாடுகளைக் கொண்டுள்ளது. இது பொதுவாக பல கோப்புகளில் இருக்கும் வரையறைகளை உள்ளடக்கியது, ஆனால் இது ஒரு பயிற்சி என்பதால், செயல்திறன் அல்லது பராமரிப்பின் எளிமையை விட, முதல் முறையாக எளிதாகப் புரிந்துகொள்வதற்காக நிரல் உகந்ததாக்கப்பட்டுள்ளது.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

இந்த நூலக செயல்பாடுகளை நாம் பயன்படுத்துகிறோம். மீண்டும், அவை பயன்படுத்தப்படும் இடத்தில் கீழே விளக்கப்பட்டுள்ளன.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` நூலகம்](https://abitype.dev/) [`AddressType`](https://abitype.dev/config#addresstype) போன்ற பல்வேறு எத்தேரியம் தரவு வகைகளுக்கான TypeScript வரையறைகளை நமக்கு வழங்குகிறது.

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` ஒப்பந்தத்திற்கான ABI.
நீங்கள் ஒப்பந்தங்களையும் UI-ஐயும் ஒரே நேரத்தில் உருவாக்குகிறீர்கள் என்றால், நீங்கள் பொதுவாக அவற்றை ஒரே களஞ்சியத்தில் வைத்து, Solidity கம்பைலரால் உருவாக்கப்பட்ட ABI-ஐ உங்கள் பயன்பாட்டில் ஒரு கோப்பாகப் பயன்படுத்துவீர்கள். இருப்பினும், இது இங்கே அவசியமில்லை, ஏனெனில் ஒப்பந்தம் ஏற்கனவே உருவாக்கப்பட்டுவிட்டது, அது மாறப்போவதில்லை.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript வலுவாக தட்டச்சு செய்யப்பட்டுள்ளது. வெவ்வேறு சங்கிலிகளில் `Greeter` ஒப்பந்தம் பயன்படுத்தப்பட்டுள்ள முகவரியைக் குறிப்பிட இந்த வரையறையைப் பயன்படுத்துகிறோம். விசை ஒரு எண் (the chainId), மற்றும் மதிப்பு ஒரு `AddressType` (ஒரு முகவரி).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // ஹோல்ஸ்கை
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // செபோலியா
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

ஆதரிக்கப்படும் இரண்டு நெட்வொர்க்குகளில் உள்ள ஒப்பந்தத்தின் முகவரி: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) மற்றும் [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

குறிப்பு: உண்மையில் Redstone Holesky-க்கு ஒரு மூன்றாவது வரையறை உள்ளது, அது கீழே விளக்கப்படும்.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

இந்த வகை `ShowObject` கூறுக்கு (பின்னர் விளக்கப்பட்டுள்ளது) ஒரு அளவுருவாகப் பயன்படுத்தப்படுகிறது. இது பொருளின் பெயர் மற்றும் அதன் மதிப்பை உள்ளடக்கியது, அவை பிழைத்திருத்த நோக்கங்களுக்காகக் காட்டப்படுகின்றன.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

எந்த நேரத்திலும், வாழ்த்து என்னவென்று நமக்குத் தெரிந்திருக்கலாம் (ஏனென்றால் நாம் அதை பிளாக்செயினிலிருந்து படிக்கிறோம்) அல்லது தெரியாமல் இருக்கலாம் (ஏனென்றால் நாம் அதை இன்னும் பெறவில்லை). எனவே ஒரு சரம் அல்லது எதுவும் இல்லாத ஒரு வகையைக் கொண்டிருப்பது பயனுள்ளதாக இருக்கும்.

##### `Greeter` கூறு {#greeter-component}

```tsx
const Greeter = () => {
```

இறுதியாக, நாம் கூறுகளை வரையறுக்கிறோம்.

```tsx
  const { chain } = useNetwork()
```

நாம் பயன்படுத்தும் சங்கிலியைப் பற்றிய தகவல், [wagmi](https://wagmi.sh/react/hooks/useNetwork) உபயத்தில்.
இது ஒரு ஹூக் (`use...`) என்பதால், ஒவ்வொரு முறையும் இந்தத் தகவல் மாறும்போது, கூறு மீண்டும் வரையப்படுகிறது.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter ஒப்பந்தத்தின் முகவரி, இது சங்கிலியைப் பொறுத்து மாறுபடும் (மேலும் நம்மிடம் சங்கிலித் தகவல் இல்லையென்றால் அல்லது அந்த ஒப்பந்தம் இல்லாத ஒரு சங்கிலியில் இருந்தால் அது `undefined` ஆகும்).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // வாதங்கள் இல்லை
    watch: true
  })
```

[`useReadContract` ஹூக்](https://wagmi.sh/react/api/hooks/useReadContract) ஒரு ஒப்பந்தத்திலிருந்து தகவலைப் படிக்கிறது. அது என்ன தகவலைத் தருகிறது என்பதை நீங்கள் UI-ல் `readResults` ஐ விரிவுபடுத்துவதன் மூலம் துல்லியமாகக் காணலாம். இந்த நிலையில், வாழ்த்து மாறும்போது எங்களுக்குத் தெரிவிக்கப்படுவதற்காக அது தொடர்ந்து பார்க்க வேண்டும் என்று நாங்கள் விரும்புகிறோம்.

**குறிப்பு:** வாழ்த்து எப்போது மாறுகிறது என்பதை அறியவும், அந்த வழியில் புதுப்பிக்கவும் [`setGreeting` நிகழ்வுகளை](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) நாம் கேட்கலாம். இருப்பினும், இது அதிக செயல்திறன் கொண்டதாக இருந்தாலும், இது எல்லா சந்தர்ப்பங்களிலும் பொருந்தாது. பயனர் வேறு சங்கிலிக்கு மாறும்போது வாழ்த்தும் மாறுகிறது, ஆனால் அந்த மாற்றத்துடன் ஒரு நிகழ்வு இணைக்கப்படவில்லை. குறியீட்டின் ஒரு பகுதி நிகழ்வுகளைக் கேட்பதற்கும், மற்றொன்று சங்கிலி மாற்றங்களைக் கண்டறிவதற்கும் நாம் வைத்திருக்கலாம், ஆனால் அது [`watch` அளவுருவை](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) அமைப்பதை விட சிக்கலானதாக இருக்கும்.

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React-ன் [`useState` ஹூக்](https://www.w3schools.com/react/react_usestate.asp) ஒரு நிலை மாறியை குறிப்பிட அனுமதிக்கிறது, அதன் மதிப்பு ஒரு கூறின் ஒரு ரெண்டரிங்கிலிருந்து மற்றொன்றுக்கு நீடிக்கிறது. தொடக்க மதிப்பு அளவுருவாகும், இந்த நிலையில் அது வெற்றுச் சரம்.

`useState` ஹூக் இரண்டு மதிப்புகளுடன் ஒரு பட்டியலை வழங்குகிறது:

1. நிலை மாறியின் தற்போதைய மதிப்பு.
2. தேவைப்படும்போது நிலை மாறியை மாற்றுவதற்கான ஒரு செயல்பாடு. இது ஒரு ஹூக் என்பதால், ஒவ்வொரு முறையும் அது அழைக்கப்படும்போது, கூறு மீண்டும் ரெண்டர் செய்யப்படுகிறது.

இந்த நிலையில், பயனர் அமைக்க விரும்பும் புதிய வாழ்த்துக்கு ஒரு நிலை மாறியைப் பயன்படுத்துகிறோம்.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

புதிய வாழ்த்து உள்ளீட்டு புலம் மாறும்போது இது நிகழ்வு கையாளுபவர் ஆகும். வகை, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), இது ஒரு HTML உள்ளீட்டு உறுப்பின் மதிப்பு மாற்றத்திற்கான கையாளுபவர் என்பதைக் குறிப்பிடுகிறது. `<HTMLInputElement>` பகுதி பயன்படுத்தப்படுகிறது, ஏனெனில் இது ஒரு [பொதுவான வகை](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

வாடிக்கையாளர் கண்ணோட்டத்தில் இருந்து ஒரு பிளாக்செயின் பரிவர்த்தனையைச் சமர்ப்பிக்கும் செயல்முறை இது:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) ஐப் பயன்படுத்தி பிளாக்செயினில் உள்ள ஒரு முனைக்கு பரிவர்த்தனையை அனுப்பவும்.
2. முனையிலிருந்து ஒரு பதிலுக்காகக் காத்திருக்கவும்.
3. பதில் பெறப்பட்டதும், பணப்பை மூலம் பரிவர்த்தனையில் கையொப்பமிட பயனரைக் கேட்கவும். இந்த படிநிலை முனையிலிருந்து பதில் பெறப்பட்ட பிறகு _நடந்தாக_ வேண்டும், ஏனெனில் பயனர் கையொப்பமிடுவதற்கு முன் பரிவர்த்தனையின் gas செலவு காட்டப்படுகிறது.
4. பயனர் அங்கீகரிப்பதற்காகக் காத்திருக்கவும்.
5. இந்த முறை [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) ஐப் பயன்படுத்தி பரிவர்த்தனையை மீண்டும் அனுப்பவும்.

படி 2 ஒரு குறிப்பிடத்தக்க அளவு நேரத்தை எடுக்கும், இதன் போது பயனர்கள் தங்கள் கட்டளை உண்மையில் பயனர் இடைமுகத்தால் பெறப்பட்டதா என்றும், ஏன் அவர்கள் ஏற்கனவே பரிவர்த்தனையில் கையொப்பமிடக் கேட்கப்படவில்லை என்றும் யோசிப்பார்கள். அது ஒரு மோசமான பயனர் அனுபவத்தை (UX) ஏற்படுத்துகிறது.

இதற்குத் தீர்வு [ஹூக்குகளைத் தயாரிப்பதைப்](https://wagmi.sh/react/prepare-hooks) பயன்படுத்துவதாகும். ஒவ்வொரு முறையும் ஒரு அளவுரு மாறும்போது, உடனடியாக முனைக்கு `eth_estimateGas` கோரிக்கையை அனுப்பவும். பின்னர், பயனர் உண்மையில் பரிவர்த்தனையை அனுப்ப விரும்பும்போது (**வாழ்த்தைப் புதுப்பி** என்பதை அழுத்துவதன் மூலம்), gas செலவு அறியப்பட்டு, பயனர் உடனடியாக பணப்பை பக்கத்தைக் காணலாம்.

```tsx
  return (
```

இப்போது நாம் இறுதியாக திரும்பப் பெற வேண்டிய உண்மையான HTML-ஐ உருவாக்கலாம்.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

ஒரு `ShowGreeting` கூறுகளை உருவாக்கவும் (கீழே விளக்கப்பட்டுள்ளது), ஆனால் வாழ்த்து பிளாக்செயினிலிருந்து வெற்றிகரமாகப் படிக்கப்பட்டால் மட்டுமே.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

இது பயனர் ஒரு புதிய வாழ்த்தை அமைக்கக்கூடிய உள்ளீட்டு உரை புலம் ஆகும். ஒவ்வொரு முறையும் பயனர் ஒரு விசையை அழுத்தும் போது, நாம் `greetingChange`-ஐ அழைக்கிறோம், அது `setNewGreeting`-ஐ அழைக்கிறது. `setNewGreeting` ஆனது `useState` ஹூக்கிலிருந்து வருவதால், அது `Greeter` கூறுகளை மீண்டும் ரெண்டர் செய்ய வைக்கிறது. இதன் பொருள்:

- புதிய வாழ்த்தின் மதிப்பை வைத்திருக்க நாம் `value`-ஐக் குறிப்பிட வேண்டும், இல்லையெனில் அது இயல்புநிலைக்கு, அதாவது வெற்றுச் சரத்திற்குத் திரும்பிவிடும்.
- `usePrepareContractWrite` ஒவ்வொரு முறையும் `newGreeting` மாறும்போது அழைக்கப்படுகிறது, அதாவது தயாரிக்கப்பட்ட பரிவர்த்தனையில் அது எப்போதும் சமீபத்திய `newGreeting`-ஐக் கொண்டிருக்கும்.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        வாழ்த்தைப் புதுப்பிக்கவும்
      </button>
```

`workingTx.write` இல்லை என்றால், வாழ்த்துப் புதுப்பிப்பை அனுப்புவதற்குத் தேவையான தகவலுக்காக நாங்கள் இன்னும் காத்திருக்கிறோம், எனவே பொத்தான் முடக்கப்பட்டுள்ளது. `workingTx.write` மதிப்பு இருந்தால், அது பரிவர்த்தனையை அனுப்ப அழைக்க வேண்டிய செயல்பாடு ஆகும்.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

இறுதியாக, நாங்கள் என்ன செய்கிறோம் என்பதை நீங்கள் பார்க்க உதவ, நாங்கள் பயன்படுத்தும் மூன்று பொருட்களைக் காட்டுங்கள்:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` கூறு {#showgreeting-component}

இந்த கூறு காட்டுகிறது

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

ஒரு கூறு செயல்பாடு கூறின் அனைத்து பண்புகளுடன் ஒரு அளவுருவைப் பெறுகிறது.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` கூறு {#showobject-component}

தகவல் நோக்கங்களுக்காக, முக்கியமான பொருட்களை (`readResults` வாழ்த்தைப் படிப்பதற்கும், `preparedTx` மற்றும் `workingTx` நாம் உருவாக்கும் பரிவர்த்தனைகளுக்கும்) காட்ட `ShowObject` கூறினைப் பயன்படுத்துகிறோம்.

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

எல்லாத் தகவல்களையும் கொண்டு UI-ஐக் குழப்ப விரும்பவில்லை, எனவே அவற்றைப் பார்க்க அல்லது மூட சாத்தியமாக்க, நாங்கள் ஒரு [`details`](https://www.w3schools.com/tags/tag_details.asp) டேக்கைப் பயன்படுத்துகிறோம்.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

பெரும்பாலான புலங்கள் [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) ஐப் பயன்படுத்தி காட்டப்படுகின்றன.

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          செயல்பாடுகள்:
          <ul>
```

விதிவிலக்கு செயல்பாடுகள், அவை [JSON தரநிலையின்](https://www.json.org/json-en.html) பகுதியாக இல்லை, எனவே அவை தனித்தனியாகக் காட்டப்பட வேண்டும்.

```tsx
          {funs.map((f, i) =>
```

JSX-க்குள், `{` சுருள் பிராக்கெட்டுகளுக்குள் `}` உள்ள குறியீடு ஜாவாஸ்கிரிப்டாக விளக்கப்படுகிறது. பின்னர், `(` வழக்கமான பிராக்கெட்டுகளுக்குள் `)` உள்ள குறியீடு, மீண்டும் JSX ஆக விளக்கப்படுகிறது.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React-க்கு [DOM மரம்](https://www.w3schools.com/js/js_htmldom.asp)-ல் உள்ள டேக்குகள் தனித்துவமான அடையாளங்காட்டிகளைக் கொண்டிருக்க வேண்டும். இதன் பொருள், ஒரே டேக்கின் பிள்ளைகளுக்கு (இந்த நிலையில், [வரிசைப்படுத்தப்படாத பட்டியல்](https://www.w3schools.com/tags/tag_ul.asp)), வெவ்வேறு `key` பண்புக்கூறுகள் தேவை.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

பல்வேறு HTML டேக்குகளை முடிக்கவும்.

##### இறுதி `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` கூறுதான் பயன்பாட்டிற்காக நாம் ஏற்றுமதி செய்ய வேண்டிய ஒன்று.

#### `src/wagmi.ts` {#wagmi-ts}

இறுதியாக, WAGMI தொடர்பான பல்வேறு வரையறைகள் `src/wagmi.ts`-ல் உள்ளன. நான் இங்கே எல்லாவற்றையும் விளக்கப் போவதில்லை, ஏனெனில் அதில் பெரும்பாலானவை நீங்கள் மாற்ற வேண்டியிருக்க வாய்ப்பில்லாத கொதிகலன்.

இங்கே உள்ள குறியீடு [github-ல்](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) உள்ளதைப் போலவே இல்லை, ஏனெனில் பின்னர் கட்டுரையில் நாங்கள் மற்றொரு சங்கிலியை ([Redstone Holesky](https://redstone.xyz/docs/network-info)) சேர்க்கிறோம்.

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

பயன்பாடு ஆதரிக்கும் பிளாக்செயின்களை இறக்குமதி செய்யவும். ஆதரிக்கப்படும் சங்கிலிகளின் பட்டியலை [viem github-ல்](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) நீங்கள் காணலாம்.

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/) ஐப் பயன்படுத்த, உங்கள் பயன்பாட்டிற்கு ஒரு திட்ட ID தேவை. அதை [cloud.walletconnect.com-ல்](https://cloud.walletconnect.com/sign-in) பெறலாம்.

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

### மற்றொரு பிளாக்செயினைச் சேர்த்தல் {#add-blockchain}

இந்த நாட்களில் நிறைய [L2 அளவிடுதல் தீர்வுகள்](/layer-2/) உள்ளன, மேலும் viem இன்னும் ஆதரிக்காத சிலவற்றை நீங்கள் ஆதரிக்க விரும்பலாம். அதைச் செய்ய, நீங்கள் `src/wagmi.ts`-ஐ மாற்றியமைக்கிறீர்கள். இந்த அறிவுறுத்தல்கள் [Redstone Holesky](https://redstone.xyz/docs/network-info)-ஐ எவ்வாறு சேர்ப்பது என்பதை விளக்குகின்றன.

1. Viem-லிருந்து `defineChain` வகையை இறக்குமதி செய்யவும்.

   ```ts
   import { defineChain } from 'viem'
   ```

2. நெட்வொர்க் வரையறையைச் சேர்க்கவும்.

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

3. புதிய சங்கிலியை `configureChains` அழைப்பில் சேர்க்கவும்.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. புதிய நெட்வொர்க்கில் உங்கள் ஒப்பந்தங்களுக்கான முகவரியை பயன்பாடு அறிந்திருப்பதை உறுதிப்படுத்தவும். இந்த நிலையில், நாங்கள் `src/components/Greeter.tsx`-ஐ மாற்றியமைக்கிறோம்:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // ஹோல்ஸ்கை
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // ரெட்ஸ்டோன் ஹோல்ஸ்கை
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // செபோலியா
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## முடிவுரை {#conclusion}

நிச்சயமாக, `Greeter`-க்கு ஒரு பயனர் இடைமுகத்தை வழங்குவதில் நீங்கள் உண்மையில் அக்கறை காட்டவில்லை. உங்கள் சொந்த ஒப்பந்தங்களுக்காக ஒரு பயனர் இடைமுகத்தை உருவாக்க விரும்புகிறீர்கள். உங்கள் சொந்த பயன்பாட்டை உருவாக்க, இந்த படிகளை இயக்கவும்:

1. ஒரு wagmi பயன்பாட்டை உருவாக்க குறிப்பிடவும்.

   ```sh copy
   pnpm create wagmi
   ```

2. பயன்பாட்டிற்கு பெயரிடுங்கள்.

3. **React** கட்டமைப்பைத் தேர்ந்தெடுக்கவும்.

4. **Vite** வகையைத் தேர்ந்தெடுக்கவும்.

5. நீங்கள் [Rainbow kit-ஐச் சேர்க்கலாம்](https://www.rainbowkit.com/docs/installation#manual-setup).

இப்போது சென்று உங்கள் ஒப்பந்தங்களை பரந்த உலகிற்குப் பயன்படுத்தக்கூடியதாக ஆக்குங்கள்.

[எனது மேலும் பணிகளை இங்கே பார்க்கவும்](https://cryptodocguy.pro/).

