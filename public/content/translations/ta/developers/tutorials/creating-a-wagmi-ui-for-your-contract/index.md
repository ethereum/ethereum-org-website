---
title: "உங்கள் ஒப்பந்தத்திற்கான பயனர் இடைமுகத்தை உருவாக்குதல்"
description: "TypeScript, React, Vite மற்றும் Wagmi போன்ற நவீன கூறுகளைப் பயன்படுத்தி, நவீனமான, ஆனால் எளிமையான பயனர் இடைமுகத்தை நாங்கள் ஆராய்வோம். மேலும், பயனர் இடைமுகத்துடன் வாலட்டை எவ்வாறு இணைப்பது, தகவலைப் படிக்க ஸ்மார்ட் ஒப்பந்தத்தை அழைப்பது, ஸ்மார்ட் ஒப்பந்தத்திற்கு பரிவர்த்தனையை அனுப்புவது மற்றும் மாற்றங்களைக் கண்டறிய ஸ்மார்ட் ஒப்பந்தத்திலிருந்து நிகழ்வுகளைக் கண்காணிப்பது எப்படி என்பதைக் கற்றுக்கொள்வோம்."
author: "ஓரி பொமரன்ட்ஸ்"
tags: ["TypeScript", "React", "Vite", "Wagmi", "frontend"]
skill: beginner
breadcrumb: "WAGMI உடன் UI"
published: 2023-11-01
lang: ta
sidebarDepth: 3
---

Ethereum சுற்றுச்சூழல் அமைப்பில் நமக்குத் தேவையான ஒரு அம்சத்தை நீங்கள் கண்டறிந்துள்ளீர்கள். அதைச் செயல்படுத்துவதற்கான ஸ்மார்ட் ஒப்பந்தங்களை நீங்கள் எழுதியுள்ளீர்கள், மேலும் ஆஃப்செயினில் இயங்கும் சில தொடர்புடைய குறியீடுகளையும் எழுதியிருக்கலாம். இது மிகவும் சிறப்பானது! துரதிர்ஷ்டவசமாக, பயனர் இடைமுகம் இல்லாமல் உங்களுக்கு எந்தப் பயனர்களும் கிடைக்கப் போவதில்லை, மேலும் நீங்கள் கடைசியாக ஒரு இணையதளத்தை எழுதியபோது மக்கள் டயல்-அப் மோடம்களைப் பயன்படுத்தினர் மற்றும் JavaScript புதியதாக இருந்தது.

இந்தக் கட்டுரை உங்களுக்கானது. உங்களுக்கு நிரலாக்கம் தெரியும் என்றும், கொஞ்சம் JavaScript மற்றும் HTML தெரிந்திருக்கலாம் என்றும் நான் கருதுகிறேன், ஆனால் உங்கள் பயனர் இடைமுகத் திறன்கள் துருப்பிடித்தும் காலாவதியாகியும் இருக்கலாம். நாம் இணைந்து ஒரு எளிய நவீன பயன்பாட்டைப் பார்ப்போம், இதன் மூலம் இப்போதெல்லாம் இது எவ்வாறு செய்யப்படுகிறது என்பதை நீங்கள் காண்பீர்கள்.

## இது ஏன் முக்கியமானது {#why-important}

கோட்பாட்டளவில், உங்கள் ஒப்பந்தங்களுடன் தொடர்புகொள்ள மக்கள் [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) அல்லது [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) ஐப் பயன்படுத்தும்படி நீங்கள் செய்யலாம். அனுபவம் வாய்ந்த Etherean-களுக்கு இது சிறந்தது. ஆனால் நாங்கள் [இன்னொரு பில்லியன் மக்களுக்கு](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) சேவை செய்ய முயற்சிக்கிறோம். சிறந்த பயனர் அனுபவம் இல்லாமல் இது நடக்காது, மேலும் எளிமையான பயனர் இடைமுகம் அதில் ஒரு பெரிய பகுதியாகும்.

## Greeter பயன்பாடு {#greeter-app}

நவீன UI எவ்வாறு செயல்படுகிறது என்பதற்குப் பின்னால் நிறைய கோட்பாடுகள் உள்ளன, மேலும் [அதை விளக்கும்](https://wagmi.sh/core/getting-started) [பல நல்ல தளங்கள்](https://react.dev/learn/thinking-in-react) உள்ளன. அந்தத் தளங்கள் செய்த சிறந்த பணிகளைத் திரும்பச் செய்வதற்குப் பதிலாக, நீங்கள் செய்து கற்பதையே விரும்புவீர்கள் என்று கருதி, நீங்கள் விளையாடக்கூடிய ஒரு பயன்பாட்டுடன் தொடங்கப் போகிறேன். காரியங்களைச் செய்து முடிக்க உங்களுக்கு இன்னும் கோட்பாடு தேவை, அதை நாங்கள் அடைவோம் - நாங்கள் மூலக் கோப்பு வாரியாகச் சென்று, அவற்றைப் பார்க்கும்போது விஷயங்களைப் பற்றி விவாதிப்போம்.

### நிறுவல் {#installation}

1. பயன்பாடு [Sepolia](https://sepolia.dev/) சோதனை நெட்வொர்க்கைப் பயன்படுத்துகிறது. தேவைப்பட்டால், [Sepolia சோதனை ETH-ஐப் பெறுங்கள்](/developers/docs/networks/#sepolia) மற்றும் [உங்கள் வாலட்டில் Sepolia-வைச் சேர்க்கவும்](https://chainlist.org/chain/11155111).

2. GitHub களஞ்சியத்தை குளோன் செய்து தேவையான தொகுப்புகளை நிறுவவும்.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. பயன்பாடு இலவச அணுகல் புள்ளிகளைப் பயன்படுத்துகிறது, அவை செயல்திறன் வரம்புகளைக் கொண்டுள்ளன. நீங்கள் [சேவையாக நோடு (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) வழங்குநரைப் பயன்படுத்த விரும்பினால், [`src/wagmi.ts`](#wagmi-ts) இல் உள்ள URL-களை மாற்றவும்.

4. பயன்பாட்டைத் தொடங்கவும்.

   ```sh
   npm run dev
   ```

5. பயன்பாடு காட்டும் URL-க்குச் செல்லவும். பெரும்பாலான சந்தர்ப்பங்களில், அது [http://localhost:5173/](http://localhost:5173/) ஆகும்.

6. Hardhat-இன் Greeter-இன் மாற்றியமைக்கப்பட்ட பதிப்பான ஒப்பந்த மூலக் குறியீட்டை [பிளாக்செயின் எக்ஸ்ப்ளோரரில்](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) நீங்கள் காணலாம்.

### கோப்பு வழிகாட்டி {#file-walk-through}

#### `index.html` {#index-html}

ஸ்கிரிப்ட் கோப்பை இறக்குமதி செய்யும் இந்த வரியைத் தவிர, இந்தக் கோப்பு ஒரு நிலையான HTML பாய்லர்பிளேட் ஆகும்.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

கோப்பு நீட்டிப்பு இது [TypeScript](https://www.typescriptlang.org/)-இல் எழுதப்பட்ட [React கூறு](https://www.w3schools.com/react/react_components.asp) என்பதைக் குறிக்கிறது, இது [வகை சரிபார்ப்பை (type checking)](https://en.wikipedia.org/wiki/Type_system#Type_checking) ஆதரிக்கும் JavaScript-இன் நீட்டிப்பாகும். TypeScript ஆனது JavaScript-ஆக தொகுக்கப்படுகிறது, எனவே நாம் அதை கிளையன்ட் பக்கத்தில் பயன்படுத்தலாம்.

உங்களுக்கு ஆர்வமிருந்தால் இந்தக் கோப்பு பெரும்பாலும் விளக்கப்பட்டுள்ளது. வழக்கமாக நீங்கள் இந்தக் கோப்பை மாற்றியமைக்க மாட்டீர்கள், ஆனால் [`src/App.tsx`](#app-tsx) மற்றும் அது இறக்குமதி செய்யும் கோப்புகளை மாற்றுவீர்கள்.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

நமக்குத் தேவையான நூலகக் குறியீட்டை இறக்குமதி செய்யவும்.

```tsx
import App from './App.tsx'
```

பயன்பாட்டைச் செயல்படுத்தும் React கூறினை இறக்குமதி செய்யவும் (கீழே காண்க).

```tsx
import { config } from './wagmi.ts'
```

பிளாக்செயின் உள்ளமைவை உள்ளடக்கிய [wagmi](https://wagmi.sh/) உள்ளமைவை இறக்குமதி செய்யவும்.

```tsx
const queryClient = new QueryClient()
```

[React Query-இன்](https://tanstack.com/query/latest/docs/framework/react/overview) தற்காலிக சேமிப்பு மேலாளரின் (cache manager) புதிய நிகழ்வை உருவாக்குகிறது. இந்தப் பொருள் பின்வருவனவற்றைச் சேமிக்கும்:

- தற்காலிகமாக சேமிக்கப்பட்ட RPC அழைப்புகள்
- ஒப்பந்த வாசிப்புகள்
- பின்னணி மறுபெறுதல் நிலை (Background refetching state)

wagmi v3 உள்நாட்டில் React Query-ஐப் பயன்படுத்துவதால் நமக்கு தற்காலிக சேமிப்பு மேலாளர் தேவை.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

ரூட் React கூறினை உருவாக்கவும். `render`-க்கான அளவுரு [JSX](https://www.w3schools.com/react/react_jsx.asp) ஆகும், இது HTML மற்றும் JavaScript/TypeScript இரண்டையும் பயன்படுத்தும் நீட்டிப்பு மொழியாகும். இங்குள்ள ஆச்சரியக்குறி TypeScript கூறிற்குச் சொல்கிறது: "`document.getElementById('root')` என்பது `ReactDOM.createRoot`-க்கு சரியான அளவுருவாக இருக்கும் என்று உங்களுக்குத் தெரியாது, ஆனால் கவலைப்பட வேண்டாம் - நான் டெவலப்பர், அது இருக்கும் என்று நான் உங்களுக்குச் சொல்கிறேன்".

```tsx
  <React.StrictMode>
```

பயன்பாடு [ஒரு `React.StrictMode` கூறிற்குள்](https://react.dev/reference/react/StrictMode) செல்கிறது. இந்தக் கூறு React நூலகத்திடம் கூடுதல் பிழைத்திருத்தச் சரிபார்ப்புகளைச் செருகுமாறு கூறுகிறது, இது மேம்பாட்டின் போது பயனுள்ளதாக இருக்கும்.

```tsx
    <WagmiProvider config={config}>
```

பயன்பாடு [ஒரு `WagmiProvider` கூறிற்குள்ளும்](https://wagmi.sh/react/api/WagmiProvider) உள்ளது. [wagmi (we are going to make it) நூலகம்](https://wagmi.sh/) Ethereum பரவலாக்கப்பட்ட பயன்பாட்டை எழுதுவதற்காக React UI வரையறைகளை [viem நூலகத்துடன்](https://viem.sh/) இணைக்கிறது.

```tsx
      <QueryClientProvider client={queryClient}>
```

இறுதியாக, ஒரு React Query வழங்குநரைச் சேர்க்கவும், இதன் மூலம் எந்தவொரு பயன்பாட்டுக் கூறும் தற்காலிகமாக சேமிக்கப்பட்ட வினவல்களைப் பயன்படுத்த முடியும்.

```tsx
        <App />
```

இப்போது நாம் பயன்பாட்டிற்கான கூறினைக் கொண்டிருக்கலாம், இது உண்மையில் UI-ஐச் செயல்படுத்துகிறது. கூறின் முடிவில் உள்ள `/>` ஆனது, XML தரநிலையின்படி, இந்தக் கூறிற்குள் எந்த வரையறைகளும் இல்லை என்பதை React-க்குச் சொல்கிறது.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

நிச்சயமாக, நாம் மற்ற கூறுகளை மூட வேண்டும்.

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

நமக்குத் தேவையான நூலகங்களையும், [`Greeter` கூறினையும்](#greeter-tsx) இறக்குமதி செய்யவும்.

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia செயின் ID.

```
function App() {
```

React கூறினை உருவாக்குவதற்கான நிலையான வழி இதுதான்: அது ரெண்டர் செய்யப்பட வேண்டிய போதெல்லாம் அழைக்கப்படும் ஒரு சார்பை (function) வரையறுக்கவும். இந்தச் சார்பு பொதுவாக TypeScript அல்லது JavaScript குறியீட்டைக் கொண்டிருக்கும், அதைத் தொடர்ந்து JSX குறியீட்டை வழங்கும் `return` அறிக்கை இருக்கும்.

```tsx
  const connection = useConnection()
```

முகவரி மற்றும் `chainId` போன்ற தற்போதைய இணைப்பு தொடர்பான தகவல்களைப் பெற [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection)-ஐப் பயன்படுத்தவும்.

வழக்கமாக, React-இல் `use...` என்று அழைக்கப்படும் சார்புகள் [ஹூக்குகள் (hooks)](https://www.w3schools.com/react/react_hooks.asp) ஆகும். இந்தச் சார்புகள் கூறிற்குத் தரவை மட்டும் வழங்குவதில்லை; அந்தத் தரவு மாறும்போது அது மீண்டும் ரெண்டர் செய்யப்படுவதையும் (கூறு சார்பு மீண்டும் செயல்படுத்தப்பட்டு, அதன் வெளியீடு HTML-இல் முந்தையதை மாற்றுகிறது) அவை உறுதி செய்கின்றன.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

வாலட் இணைப்பு பற்றிய தகவலைப் பெற [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect)-ஐப் பயன்படுத்தவும்.

```tsx
  const { disconnect } = useDisconnect()
```

[இந்த ஹூக்](https://wagmi.sh/react/api/hooks/useDisconnect) வாலட்டிலிருந்து துண்டிப்பதற்கான சார்பை நமக்கு வழங்குகிறது.

```tsx
  const { switchChain } = useSwitchChain()
```

[இந்த ஹூக்](https://wagmi.sh/react/api/hooks/useSwitchChain) செயின்களை மாற்ற அனுமதிக்கிறது.

```tsx
  useEffect(() => {
```

React ஹூக் [`useEffect`](https://react.dev/reference/react/useEffect) ஆனது, வெளிப்புற அமைப்பை ஒத்திசைக்க ஒரு மாறியின் மதிப்பு மாறும்போதெல்லாம் ஒரு சார்பை இயக்க உங்களை அனுமதிக்கிறது.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

நாம் இணைக்கப்பட்டிருந்து, ஆனால் Sepolia பிளாக்செயினுடன் இணைக்கப்படவில்லை என்றால், Sepolia-க்கு மாறவும்.

```tsx
  }, [connection.status, connection.chainId])
```

இணைப்பு நிலை அல்லது இணைப்பு chainId மாறும் ஒவ்வொரு முறையும் சார்பை மீண்டும் இயக்கவும்.

```tsx
  return (
    <>
```

React கூறின் JSX _கட்டாயம்_ ஒரு ஒற்றை HTML கூறினை வழங்க வேண்டும். நம்மிடம் பல கூறுகள் இருக்கும்போது, அவை அனைத்தையும் மடிக்க ஒரு கொள்கலன் (container) தேவையில்லை என்றால், அவற்றை ஒரே கூறாக இணைக்க வெற்று கூறினை (`<> ... </>`) பயன்படுத்துகிறோம்.

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

தற்போதைய இணைப்பு பற்றிய தகவலை வழங்கவும். JSX-க்குள், `{<expression>}` என்பது கோவையை JavaScript-ஆக மதிப்பிடுவதைக் குறிக்கிறது.

```tsx
      {connection.status === 'connected' && (
```

`{<condition> && <value>}` என்ற தொடரியல் "நிபந்தனை `true` ஆக இருந்தால், மதிப்பிற்கு மதிப்பிடவும்; இல்லையென்றால், `false` என மதிப்பிடவும்" என்று பொருள்படும்.

JSX-க்குள் if அறிக்கைகளை வைப்பதற்கான நிலையான வழி இதுவாகும்.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX ஆனது HTML-ஐ விடக் கடுமையான XML தரநிலையைப் பின்பற்றுகிறது. ஒரு குறிச்சொல்லுக்கு (tag) தொடர்புடைய முடிவு குறிச்சொல் இல்லையென்றால், அதை முடிக்க அதன் முடிவில் _கட்டாயம்_ ஒரு சாய்வுக்கோடு (`/`) இருக்க வேண்டும்.

இங்கே நம்மிடம் அதுபோன்ற இரண்டு குறிச்சொற்கள் உள்ளன, `<Greeter />` (இது உண்மையில் ஒப்பந்தத்துடன் பேசும் HTML குறியீட்டைக் கொண்டுள்ளது) மற்றும் [கிடைமட்டக் கோட்டிற்கான `<hr />`](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

பயனர் இந்தப் பொத்தானைக் கிளிக் செய்தால், `disconnect` சார்பை அழைக்கவும்.

```tsx
      {connection.status !== 'connected' && (
```

நாம் இணைக்கப்பட_வில்லை_ என்றால், வாலட்டுடன் இணைக்கத் தேவையான விருப்பங்களைக் காட்டவும்.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors`-இல் நம்மிடம் இணைப்பிகளின் பட்டியல் உள்ளது. அதைக் காண்பிப்பதற்கான JSX பொத்தான்களின் பட்டியலாக மாற்ற [`map`](https://www.w3schools.com/jsref/jsref_map.asp)-ஐப் பயன்படுத்துகிறோம்.

```tsx
            <button
              key={connector.uid}
```

JSX-இல் "உடன்பிறப்பு" குறிச்சொற்கள் (ஒரே பெற்றோரிலிருந்து வரும் குறிச்சொற்கள்) வெவ்வேறு அடையாளங்காட்டிகளைக் கொண்டிருப்பது அவசியமாகும்.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

இணைப்பி பொத்தான்கள்.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

கூடுதல் தகவலை வழங்கவும். `<variable>?.<field>` என்ற கோவைத் தொடரியல் JavaScript-க்கு, மாறி வரையறுக்கப்பட்டிருந்தால், அந்தப் புலத்திற்கு மதிப்பிடுமாறு கூறுகிறது. மாறி வரையறுக்கப்படவில்லை என்றால், இந்தக் கோவை `undefined` என மதிப்பிடப்படும்.

பிழை இல்லாதபோது, `error.message` என்ற கோவை ஒரு விதிவிலக்கை (exception) எழுப்பும். `error?.message`-ஐப் பயன்படுத்துவது இந்தச் சிக்கலைத் தவிர்க்க அனுமதிக்கிறது.

#### `src/Greeter.tsx` {#greeter-tsx}

இந்தக் கோப்பு பெரும்பாலான UI செயல்பாடுகளைக் கொண்டுள்ளது. இது பொதுவாகப் பல கோப்புகளில் இருக்கும் வரையறைகளை உள்ளடக்கியது, ஆனால் இது ஒரு பயிற்சி என்பதால், நிரல் செயல்திறன் அல்லது பராமரிப்பின் எளிமையை விட, முதல் முறை புரிந்துகொள்வதற்கு எளிதாக இருக்கும் வகையில் உகந்ததாக்கப்பட்டுள்ளது.

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

நாங்கள் இந்த நூலகச் சார்புகளைப் பயன்படுத்துகிறோம். மீண்டும், அவை எங்குப் பயன்படுத்தப்படுகின்றன என்பது கீழே விளக்கப்பட்டுள்ளது.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` நூலகம்](https://abitype.dev/) [`AddressType`](https://abitype.dev/config#addresstype) போன்ற பல்வேறு Ethereum தரவு வகைகளுக்கான TypeScript வரையறைகளை நமக்கு வழங்குகிறது.

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const // greeterABI
```

`Greeter` ஒப்பந்தத்திற்கான ABI.
நீங்கள் ஒப்பந்தங்களையும் UI-யையும் ஒரே நேரத்தில் உருவாக்கினால், பொதுவாக அவற்றை ஒரே களஞ்சியத்தில் வைத்து, Solidity கம்பைலரால் உருவாக்கப்பட்ட ABI-ஐ உங்கள் பயன்பாட்டில் ஒரு கோப்பாகப் பயன்படுத்துவீர்கள். இருப்பினும், ஒப்பந்தம் ஏற்கனவே உருவாக்கப்பட்டுவிட்டதாலும், அது மாறாது என்பதாலும் இது இங்கே தேவையில்லை.

இது ஒரு _உண்மையான_ மாறிலி (constant) என்று TypeScript-க்குச் சொல்ல [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)-ஐப் பயன்படுத்துகிறோம். பொதுவாக, நீங்கள் JavaScript-இல் `const x = {"a": 1}` எனக் குறிப்பிடும்போது, `x`-இல் உள்ள மதிப்பை உங்களால் மாற்ற முடியும், ஆனால் அதற்கு நீங்கள் மதிப்பை ஒதுக்க முடியாது.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript வலுவாக தட்டச்சு செய்யப்பட்டது (strongly typed). வெவ்வேறு செயின்களில் `Greeter` ஒப்பந்தம் எங்குப் பயன்படுத்தப்படுகிறது என்பதைக் குறிப்பிட இந்த வரையறையைப் பயன்படுத்துகிறோம். விசை (key) ஒரு எண் (chainId), மற்றும் மதிப்பு ஒரு `AddressType` (ஒரு முகவரி) ஆகும்.

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // செபோலியா
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)-இல் உள்ள ஒப்பந்தத்தின் முகவரி.

##### Timer கூறு {#timer-component}

`Timer` கூறு ஒரு குறிப்பிட்ட நேரத்திலிருந்து எத்தனை வினாடிகள் கடந்துள்ளன என்பதைக் காட்டுகிறது. பயன்பாட்டினை எளிதாக்கும் நோக்கங்களுக்காக இது முக்கியமானது. பயனர்கள் ஏதாவது செய்யும்போது, அவர்கள் உடனடி எதிர்வினையை எதிர்பார்க்கிறார்கள். பிளாக்செயின்களில், இது பெரும்பாலும் சாத்தியமற்றது, ஏனெனில் ஒரு பரிவர்த்தனை ஒரு பிளாக்கில் வைக்கப்படும் வரை எதுவும் நடக்காது. பயனர் செயலைச் செய்து எவ்வளவு நேரம் ஆகிறது என்பதைக் காட்டுவது ஒரு தீர்வாகும், இதன் மூலம் தேவைப்படும் நேரம் நியாயமானதா என்பதைப் பயனர் தீர்மானிக்க முடியும்.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` கூறு `lastUpdate` என்ற ஒரு அளவுருவை எடுத்துக்கொள்கிறது, இது கடைசிச் செயலின் நேரமாகும்.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

கூறு சரியாக வேலை செய்ய நாம் நிலையை (கூறுடன் இணைக்கப்பட்ட ஒரு மாறி) கொண்டிருக்க வேண்டும் மற்றும் அதைப் புதுப்பிக்க வேண்டும். ஆனால் நாம் அதை ஒருபோதும் படிக்க வேண்டியதில்லை, எனவே ஒரு மாறியை உருவாக்க மெனக்கெட வேண்டாம்.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) சார்பு ஒரு சார்பை அவ்வப்போது இயங்குமாறு திட்டமிட அனுமதிக்கிறது. இந்த நிலையில், ஒவ்வொரு வினாடியும். நிலையைப் புதுப்பிக்க சார்பு `setNow`-ஐ அழைக்கிறது, எனவே `Timer` கூறு மீண்டும் ரெண்டர் செய்யப்படும். கூறு ரெண்டர் செய்யப்படும் ஒவ்வொரு முறையும் நடப்பதற்குப் பதிலாக, ஒரு முறை மட்டுமே நடக்கும்படி இதை வெற்று சார்புப் பட்டியலுடன் (dependency list) [`useEffect`](https://react.dev/reference/react/useEffect)-க்குள் மடிக்கிறோம்.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

கடைசிப் புதுப்பிப்பிலிருந்து எத்தனை வினாடிகள் கடந்துள்ளன என்பதைக் கணக்கிட்டு அதை வழங்கவும்.

##### Greeter கூறு {#greeter-component}

```tsx
const Greeter = () => {
```

இறுதியாக, நாம் கூறினை வரையறுக்கிறோம்.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

நாம் பயன்படுத்தும் செயின் மற்றும் கணக்கு பற்றிய தகவல், [wagmi](https://wagmi.sh/)-இன் உபயம். இது ஒரு ஹூக் (`use...`) என்பதால், இந்தத் தகவல் மாறும்போதெல்லாம் கூறு மீண்டும் ரெண்டர் செய்யப்படுகிறது.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter ஒப்பந்தத்தின் முகவரி, நம்மிடம் செயின் தகவல் இல்லையென்றால் அல்லது அந்த ஒப்பந்தம் இல்லாத செயினில் நாம் இருந்தால் இது `undefined` ஆக இருக்கும்.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // அளவுருக்கள் இல்லை
  })
```

[`useReadContract` ஹூக்](https://wagmi.sh/react/api/hooks/useReadContract) [ஒப்பந்தத்தின்](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) `greet` சார்பை அழைக்கிறது.

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React-இன் [`useState` ஹூக்](https://www.w3schools.com/react/react_usestate.asp) ஒரு நிலை மாறியைக் குறிப்பிட அனுமதிக்கிறது, அதன் மதிப்பு கூறின் ஒரு ரெண்டரிங்கிலிருந்து மற்றொன்றுக்குத் தொடர்கிறது. ஆரம்ப மதிப்பு அளவுருவாகும், இந்த நிலையில் இது வெற்று சரமாகும் (empty string).

`useState` ஹூக் இரண்டு மதிப்புகளைக் கொண்ட பட்டியலை வழங்குகிறது:

1. நிலை மாறியின் தற்போதைய மதிப்பு.
2. தேவைப்படும்போது நிலை மாறியை மாற்றுவதற்கான ஒரு சார்பு. இது ஒரு ஹூக் என்பதால், அது அழைக்கப்படும் ஒவ்வொரு முறையும் கூறு மீண்டும் ரெண்டர் செய்யப்படுகிறது.

இந்த நிலையில், பயனர் அமைக்க விரும்பும் புதிய வாழ்த்துக்காக ஒரு நிலை மாறியைப் பயன்படுத்துகிறோம்.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

பல பயனர்கள் ஒரே நேரத்தில் ஒரே ஒப்பந்தத்தைப் பயன்படுத்தினால், அவர்கள் ஒருவருக்கொருவர் வாழ்த்துகளை மேலெழுதலாம். இது பயனர்களுக்குப் பயன்பாடு செயலிழப்பது போல் தோன்றும். கடைசியாக வாழ்த்தை அமைத்தது யார் என்பதைப் பயன்பாடு காட்டினால், அது வேறு யாரோ என்பதைப் பயனர் அறிந்துகொள்வார், மேலும் பயன்பாடு சரியாக வேலை செய்கிறது என்பதையும் புரிந்துகொள்வார்.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

பயனர்கள் தங்கள் செயல்கள் உடனடி விளைவைக் கொண்டிருப்பதைக் காண விரும்புகிறார்கள். இருப்பினும், பிளாக்செயினில் இது அவ்வாறு இல்லை. இந்த நிலை மாறிகள் பயனர்களுக்குக் குறைந்தபட்சம் எதையாவது காண்பிக்க அனுமதிக்கின்றன, இதன் மூலம் அவர்களின் செயல் நடைபெற்றுக்கொண்டிருக்கிறது என்பதை அவர்கள் அறிந்துகொள்வார்கள்.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

மேலே உள்ள `readResults` தரவை மாற்றி, அது தவறான மதிப்பிற்கு (`undefined`, எடுத்துக்காட்டாக) அமைக்கப்படாமல் இருந்தால், தற்போதைய வாழ்த்தை பிளாக்செயினிலிருந்து படித்ததற்குப் புதுப்பிக்கவும். மேலும், நிலையைப் புதுப்பிக்கவும்.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` நிகழ்வுகளைக் கவனிக்கவும்.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` என்பது மதிப்பு `false` ஆக இருந்தால், அல்லது `undefined`, `0` அல்லது வெற்று சரம் போன்ற தவறானதாக மதிப்பிடப்படும் மதிப்பாக இருந்தால், ஒட்டுமொத்தக் கோவையும் `false` ஆகும். வேறு எந்த மதிப்பிற்கும், இது `true` ஆகும். இது மதிப்புகளை பூலியன்களாக மாற்றுவதற்கான ஒரு வழியாகும், ஏனெனில் `greeterAddr` இல்லையென்றால், நாம் நிகழ்வுகளைக் கவனிக்க விரும்பவில்லை.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

நாம் பதிவுகளைப் பார்க்கும்போது (புதிய நிகழ்வைப் பார்க்கும்போது இது நடக்கும்), வாழ்த்து மாற்றப்பட்டுள்ளது என்று அர்த்தம். அந்த நிலையில், நாம் `currentGreeting` மற்றும் `lastSetterAddress`-ஐ புதிய மதிப்புகளுக்குப் புதுப்பிக்கலாம். மேலும், நிலை காட்சியையும் புதுப்பிக்க விரும்புகிறோம்.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

நாம் நிலையைப் புதுப்பிக்கும்போது இரண்டு விஷயங்களைச் செய்ய விரும்புகிறோம்:

1. நிலை சரத்தைப் புதுப்பித்தல் (`status`)
2. கடைசி நிலை புதுப்பிப்பின் நேரத்தை (`statusTime`) இப்போது எனப் புதுப்பித்தல்.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

புதிய வாழ்த்து உள்ளீட்டுப் புலத்தில் ஏற்படும் மாற்றங்களுக்கான நிகழ்வு கையாளுபவர் (event handler) இதுவாகும். நாம் `evt` அளவுருவின் வகையைக் குறிப்பிடலாம், ஆனால் TypeScript ஒரு வகை விருப்ப மொழி (type optional language). இந்தச் சார்பு HTML நிகழ்வு கையாளுபவரில் ஒரு முறை மட்டுமே அழைக்கப்படுவதால், இது அவசியம் என்று நான் நினைக்கவில்லை.

```tsx
  const { writeContractAsync } = useWriteContract()
```

ஒப்பந்தத்தில் எழுதுவதற்கான சார்பு. இது [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)-ஐப் போன்றது, ஆனால் சிறந்த நிலை புதுப்பிப்புகளைச் செயல்படுத்துகிறது.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

கிளையன்ட் கண்ணோட்டத்தில் பிளாக்செயின் பரிவர்த்தனையைச் சமர்ப்பிப்பதற்கான செயல்முறை இதுவாகும்:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas)-ஐப் பயன்படுத்தி பிளாக்செயினில் உள்ள ஒரு நோடுக்கு பரிவர்த்தனையை அனுப்பவும்.
2. நோடிலிருந்து பதிலுக்காகக் காத்திருக்கவும்.
3. பதில் பெறப்பட்டதும், வாலட் மூலம் பரிவர்த்தனையில் கையொப்பமிடுமாறு பயனரைக் கேட்கவும். நோடின் பதில் பெறப்பட்ட பின்னரே இந்தப் படி _கட்டாயம்_ நடக்க வேண்டும், ஏனெனில் கையொப்பமிடுவதற்கு முன்பு பயனருக்குப் பரிவர்த்தனையின் கேஸ் செலவு காட்டப்படும்.
4. பயனர் ஒப்புதல் அளிக்கும் வரை காத்திருக்கவும்.
5. பரிவர்த்தனையை மீண்டும் அனுப்பவும், இந்த முறை [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)-ஐப் பயன்படுத்தவும்.

படி 2-க்குக் குறிப்பிடத்தக்க அளவு நேரம் ஆகலாம், அந்த நேரத்தில் பயனர்கள் தங்கள் கட்டளை பயனர் இடைமுகத்தால் பெறப்பட்டதா என்றும், பரிவர்த்தனையில் கையொப்பமிடுமாறு ஏன் இன்னும் கேட்கப்படவில்லை என்றும் ஆச்சரியப்படலாம். இது மோசமான பயனர் அனுபவத்தை (UX) உருவாக்குகிறது.

ஒரு அளவுரு மாறும் ஒவ்வொரு முறையும் `eth_estimateGas`-ஐ அனுப்புவது ஒரு தீர்வாகும். பின்னர், பயனர் உண்மையில் பரிவர்த்தனையை அனுப்ப விரும்பும்போது (இந்த நிலையில் **Update greeting**-ஐ அழுத்துவதன் மூலம்), கேஸ் செலவு அறியப்படும், மேலும் பயனர் உடனடியாக வாலட் பக்கத்தைக் காணலாம்.

```tsx
  return (
```

இப்போது நாம் இறுதியாக வழங்குவதற்கான உண்மையான HTML-ஐ உருவாக்கலாம்.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

தற்போதைய வாழ்த்தைக் காட்டவும்.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

கடைசியாக வாழ்த்தை அமைத்தது யார் என்று நமக்குத் தெரிந்தால், அந்தத் தகவலைக் காண்பிக்கவும். `Greeter` இந்தத் தகவலைக் கண்காணிப்பதில்லை, மேலும் `SetGreeting` நிகழ்வுகளுக்காக நாம் திரும்பிப் பார்க்க விரும்பவில்லை, எனவே நாம் இயங்கிக்கொண்டிருக்கும்போது வாழ்த்து மாற்றப்பட்டால் மட்டுமே அதைப் பெறுவோம்.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

பயனர் புதிய வாழ்த்தை அமைக்கக்கூடிய உள்ளீட்டு உரைப்புலம் இதுவாகும். பயனர் ஒரு விசையை அழுத்தும் ஒவ்வொரு முறையும், நாம் `greetingChange`-ஐ அழைக்கிறோம், அது `setNewGreeting`-ஐ அழைக்கிறது. `setNewGreeting` ஆனது `useState`-இலிருந்து வருவதால், அது `Greeter` கூறினை மீண்டும் ரெண்டர் செய்யச் செய்கிறது. இதன் பொருள்:

- புதிய வாழ்த்தின் மதிப்பை வைத்திருக்க நாம் `value`-ஐக் குறிப்பிட வேண்டும், இல்லையெனில் அது இயல்புநிலையான வெற்று சரத்திற்குத் திரும்பிவிடும்.
- `newGreeting` மாறும் ஒவ்வொரு முறையும் `simulation` புதுப்பிக்கப்படுகிறது, அதாவது சரியான வாழ்த்துடன் கூடிய உருவகப்படுத்துதலைப் (simulation) பெறுவோம். இது பொருத்தமானதாக இருக்கலாம், ஏனெனில் கேஸ் செலவு அழைப்புத் தரவின் அளவைப் பொறுத்தது, இது சரத்தின் நீளத்தைப் பொறுத்தது.

```tsx
      <button disabled={!simulation.data}
```

பரிவர்த்தனையை அனுப்பத் தேவையான தகவல் கிடைத்தவுடன் மட்டுமே பொத்தானைச் செயல்படுத்தவும்.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

நிலையைப் புதுப்பிக்கவும். இந்த கட்டத்தில், பயனர் வாலட்டில் உறுதிப்படுத்த வேண்டும்.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

பரிவர்த்தனை உண்மையில் அனுப்பப்பட்ட பின்னரே `writeContractAsync` திரும்பும். பிளாக்செயினில் சேர்க்கப்படுவதற்குப் பரிவர்த்தனை எவ்வளவு நேரம் காத்திருக்கிறது என்பதைப் பயனருக்குக் காட்ட இது அனுமதிக்கிறது.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

நிலையைக் காட்டவும் மற்றும் அது புதுப்பிக்கப்பட்டு எவ்வளவு நேரம் ஆகிறது என்பதைக் காட்டவும்.

```
export {Greeter}
```

கூறினை ஏற்றுமதி செய்யவும்.

#### `src/wagmi.ts` {#wagmi-ts}

இறுதியாக, wagmi தொடர்பான பல்வேறு வரையறைகள் `src/wagmi.ts`-இல் உள்ளன. நான் இங்கே எல்லாவற்றையும் விளக்கப் போவதில்லை, ஏனென்றால் இதில் பெரும்பாலானவை பாய்லர்பிளேட் ஆகும், அவற்றை நீங்கள் மாற்ற வேண்டியிருக்காது.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

wagmi உள்ளமைவில் இந்தப் பயன்பாட்டால் ஆதரிக்கப்படும் செயின்கள் அடங்கும். [கிடைக்கக்கூடிய செயின்களின் பட்டியலை](https://wagmi.sh/core/api/chains) நீங்கள் காணலாம்.

```ts
  connectors: [
    injected(),
  ],
```

[இந்த இணைப்பி](https://wagmi.sh/core/api/connectors/injected) உலாவியில் நிறுவப்பட்ட வாலட்டுடன் பேச அனுமதிக்கிறது.

```ts
  transports: {
    [sepolia.id]: http()
```

Viem உடன் வரும் இயல்புநிலை HTTP எண்ட்பாயிண்ட் போதுமானது. நமக்கு வேறு URL தேவைப்பட்டால், நாம் `http("https:// hostname ")` அல்லது `webSocket("wss:// hostname ")`-ஐப் பயன்படுத்தலாம்.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## மற்றொரு பிளாக்செயினைச் சேர்த்தல் {#add-blockchain}

இந்த நாட்களில் நிறைய [L2 அளவிடுதல் தீர்வுகள் (L2 scaling solutions)](https://ethereum.org/layer-2/) உள்ளன, மேலும் viem இன்னும் ஆதரிக்காத சிலவற்றை நீங்கள் ஆதரிக்க விரும்பலாம். அதைச் செய்ய, நீங்கள் `src/wagmi.ts`-ஐ மாற்றியமைக்க வேண்டும். [Optimism Sepolia](https://chainlist.org/chain/11155420)-ஐ எவ்வாறு சேர்ப்பது என்பதை இந்த வழிமுறைகள் விளக்குகின்றன.

1.  `src/wagmi.ts`-ஐத் திருத்தவும்

    A. viem-இலிருந்து `defineChain` வகையை இறக்குமதி செய்யவும்.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. நெட்வொர்க் வரையறையைச் சேர்க்கவும். Optimism Sepolia-க்கு நீங்கள் இதைச் செய்ய வேண்டியதில்லை, [அது ஏற்கனவே `viem`-இல் உள்ளது](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), ஆனால் இதன் மூலம் `viem`-இல் இல்லாத பிளாக்செயினை எவ்வாறு சேர்ப்பது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள்.

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

    C. `createConfig` அழைப்பில் புதிய செயினைச் சேர்க்கவும்.

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

2.  Sepolia-க்குத் தானாக மாறுவதைக் கருத்துரைக்க (comment out) `src/App.tsx`-ஐத் திருத்தவும். ஒரு தயாரிப்பு அமைப்பில் (production system), நீங்கள் ஆதரிக்கும் ஒவ்வொரு பிளாக்செயின்களுக்கான இணைப்புகளுடன் கூடிய பொத்தான்களை நீங்கள் காட்டலாம்.

    ```ts
    /* useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId]) */
    ```

3.  புதிய நெட்வொர்க்கில் உங்கள் ஒப்பந்தங்களுக்கான முகவரியைப் பயன்பாடு அறிந்திருப்பதை உறுதிசெய்ய `src/Greeter.tsx`-ஐத் திருத்தவும்.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // ஆப்டிமிசம் செபோலியா
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // செபோலியா
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  உங்கள் உலாவியில்.

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true)-க்குச் சென்று, உங்கள் வாலட்டில் செயினைச் சேர்க்க அட்டவணையின் வலது பக்கத்தில் உள்ள பொத்தான்களில் ஒன்றைக் கிளிக் செய்யவும்.

    B. பயன்பாட்டில், பிளாக்செயினை மாற்ற **Disconnect** செய்துவிட்டு மீண்டும் இணைக்கவும். இதைக் கையாளச் சிறந்த வழிகள் உள்ளன, ஆனால் அவற்றுக்குப் பயன்பாட்டு மாற்றங்கள் தேவைப்படும்.

## முடிவுரை {#conclusion}

நிச்சயமாக, `Greeter`-க்கு பயனர் இடைமுகத்தை வழங்குவது பற்றி நீங்கள் கவலைப்பட மாட்டீர்கள். உங்கள் சொந்த ஒப்பந்தங்களுக்குப் பயனர் இடைமுகத்தை உருவாக்க நீங்கள் விரும்புவீர்கள். உங்கள் சொந்த பயன்பாட்டை உருவாக்க, இந்தப் படிகளை இயக்கவும்:

1. wagmi பயன்பாட்டை உருவாக்கக் குறிப்பிடவும்.

   ```sh copy
   npm create wagmi
   ```

2. தொடர `y` எனத் தட்டச்சு செய்யவும்.

3. பயன்பாட்டிற்குப் பெயரிடவும்.

4. **React** கட்டமைப்பைத் தேர்ந்தெடுக்கவும்.

5. **Vite** மாறுபாட்டைத் தேர்ந்தெடுக்கவும்.

இப்போது சென்று உங்கள் ஒப்பந்தங்களை உலகெங்கிலும் பயன்படுத்தக்கூடியதாக மாற்றுங்கள்.

[எனது மேலும் பல பணிகளை இங்கே காணுங்கள்](https://cryptodocguy.pro/).