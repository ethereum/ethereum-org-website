---
title: "మీ కాంట్రాక్ట్ కోసం యూజర్ ఇంటర్‌ఫేస్‌ను నిర్మించడం"
description: TypeScript, React, Vite, మరియు Wagmi వంటి ఆధునిక కాంపోనెంట్లను ఉపయోగించి, మేము ఒక ఆధునిక, కానీ అతి తక్కువ, యూజర్ ఇంటర్‌ఫేస్‌ను పరిశీలిస్తాము మరియు యూజర్ ఇంటర్‌ఫేస్‌కు ఒక వాలెట్‌ను ఎలా కనెక్ట్ చేయాలో, సమాచారాన్ని చదవడానికి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా పిలవాలో, స్మార్ట్ కాంట్రాక్ట్‌కు ఒక లావాదేవీని ఎలా పంపాలో, మరియు మార్పులను గుర్తించడానికి స్మార్ట్ కాంట్రాక్ట్ నుండి ఈవెంట్‌లను ఎలా పర్యవేక్షించాలో నేర్చుకుంటాము.
author: ఓరి పోమెరాంట్జ్
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: ఆరంభకులు
published: 2023-11-01
lang: te
sidebarDepth: 3
---

Ethereum పర్యావరణ వ్యవస్థలో మాకు అవసరమైన ఒక ఫీచర్‌ను మీరు కనుగొన్నారు. దానిని అమలు చేయడానికి మీరు స్మార్ట్ కాంట్రాక్టులను వ్రాశారు, మరియు బహుశా ఆఫ్‌చెయిన్‌లో నడిచే కొన్ని సంబంధిత కోడ్‌ను కూడా వ్రాశారు. ఇది చాలా బాగుంది! దురదృష్టవశాత్తు, యూజర్ ఇంటర్‌ఫేస్ లేకుండా మీకు ఏ వినియోగదారులు ఉండరు, మరియు మీరు చివరిసారిగా వెబ్‌సైట్‌ను వ్రాసినప్పుడు ప్రజలు డయల్-అప్ మోడెమ్‌లను ఉపయోగించారు మరియు జావాస్క్రిప్ట్ కొత్తది.

ఈ వ్యాసం మీ కోసం. మీకు ప్రోగ్రామింగ్ తెలుసని, మరియు బహుశా కొద్దిగా జావాస్క్రిప్ట్ మరియు HTML కూడా తెలుసని నేను భావిస్తున్నాను, కానీ మీ యూజర్ ఇంటర్‌ఫేస్ నైపుణ్యాలు తుప్పుపట్టినవి మరియు కాలం చెల్లినవి. మనం కలిసి ఒక సాధారణ ఆధునిక అప్లికేషన్‌ను పరిశీలిద్దాం, తద్వారా ఈ రోజుల్లో ఇది ఎలా జరుగుతుందో మీరు చూస్తారు.

## ఇది ఎందుకు ముఖ్యం {#why-important}

సిద్ధాంతపరంగా, మీ కాంట్రాక్టులతో పరస్పర చర్య చేయడానికి మీరు ప్రజలను [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) లేదా [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) ఉపయోగించేలా చేయవచ్చు. అది అనుభవజ్ఞులైన Ethereans కోసం చాలా బాగుంటుంది. కానీ మేము [మరొక బిలియన్ ప్రజలకు](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) సేవ చేయడానికి ప్రయత్నిస్తున్నాము. గొప్ప వినియోగదారు అనుభవం లేకుండా ఇది జరగదు, మరియు స్నేహపూర్వక యూజర్ ఇంటర్‌ఫేస్ అందులో ఒక పెద్ద భాగం.

## గ్రీటర్ అప్లికేషన్ {#greeter-app}

ఆధునిక UI ఎలా పనిచేస్తుందనే దాని వెనుక చాలా సిద్ధాంతం ఉంది, మరియు [చాలా మంచి సైట్లు](https://react.dev/learn/thinking-in-react) [దానిని వివరిస్తాయి](https://wagmi.sh/core/getting-started). ఆ సైట్‌లు చేసిన మంచి పనిని పునరావృతం చేయడానికి బదులుగా, మీరు చేయడం ద్వారా నేర్చుకోవడానికి ఇష్టపడతారని నేను భావిస్తున్నాను మరియు మీరు ఆడగల అప్లికేషన్‌తో ప్రారంభిస్తున్నాను. విషయాలను పూర్తి చేయడానికి మీకు ఇంకా సిద్ధాంతం అవసరం, మరియు మేము దానిని చేరుకుంటాము - మేము సోర్స్ ఫైల్ ద్వారా సోర్స్ ఫైల్‌కు వెళ్తాము మరియు మేము వాటిని చేరుకున్నప్పుడు విషయాలను చర్చిస్తాము.

### సంస్థాపన {#installation}

1. అవసరమైతే, మీ వాలెట్‌కు [Holesky బ్లాక్ చైనును](https://chainlist.org/?search=holesky&testnets=true) జోడించండి మరియు [టెస్ట్ ETH](https://www.holeskyfaucet.io/) పొందండి.

2. github రిపోజిటరీని క్లోన్ చేయండి.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. అవసరమైన ప్యాకేజీలను ఇన్‌స్టాల్ చేయండి.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. అప్లికేషన్‌ను ప్రారంభించండి.

   ```sh
   pnpm dev
   ```

5. అప్లికేషన్ చూపిన URLకు బ్రౌజ్ చేయండి. చాలా సందర్భాలలో, అది [http://localhost:5173/](http://localhost:5173/).

6. మీరు [ఒక బ్లాక్ చైను ఎక్స్‌ప్లోరర్‌లో](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) కాంట్రాక్ట్ సోర్స్ కోడ్‌ను, Hardhat యొక్క గ్రీటర్ యొక్క కొద్దిగా సవరించిన సంస్కరణను చూడవచ్చు.

### ఫైల్ వాక్ త్రూ {#file-walk-through}

#### `index.html` {#index-html}

ఈ ఫైల్ ప్రామాణిక HTML బాయిలర్‌ప్లేట్, ఈ పంక్తి మినహా, ఇది స్క్రిప్ట్ ఫైల్‌ను దిగుమతి చేస్తుంది.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

ఫైల్ ఎక్స్‌టెన్షన్ ఈ ఫైల్ [TypeScript](https://www.typescriptlang.org/) లో వ్రాయబడిన [React కాంపోనెంట్](https://www.w3schools.com/react/react_components.asp) అని మనకు చెబుతుంది, ఇది [టైప్ చెకింగ్](https://en.wikipedia.org/wiki/Type_system#Type_checking)కు మద్దతు ఇచ్చే జావాస్క్రిప్ట్ యొక్క పొడిగింపు. TypeScript జావాస్క్రిప్ట్‌లోకి కంపైల్ చేయబడింది, కాబట్టి మనం క్లయింట్-సైడ్ ఎగ్జిక్యూషన్ కోసం దీనిని ఉపయోగించవచ్చు.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

మనకు అవసరమైన లైబ్రరీ కోడ్‌ను దిగుమతి చేసుకోండి.

```tsx
import { App } from './App'
```

అప్లికేషన్‌ను అమలు చేసే React కాంపోనెంట్‌ను దిగుమతి చేయండి (క్రింద చూడండి).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

రూట్ React కాంపోనెంట్‌ను సృష్టించండి. `render` కు పరామితి [JSX](https://www.w3schools.com/react/react_jsx.asp), ఇది HTML మరియు జావాస్క్రిప్ట్/TypeScript రెండింటినీ ఉపయోగించే ఒక పొడిగింపు భాష. ఇక్కడ ఆశ్చర్యార్థకం గుర్తు TypeScript కాంపోనెంట్‌కు చెబుతుంది: "`document.getElementById('root')` `ReactDOM.createRoot`కు చెల్లుబాటు అయ్యే పరామితి అవుతుందని మీకు తెలియదు, కానీ చింతించకండి - నేను అభివృద్ధి చేసేవాడిని మరియు అది అక్కడ ఉంటుందని నేను మీకు చెబుతున్నాను".

```tsx
  <React.StrictMode>
```

అప్లికేషన్ [`React.StrictMode` కాంపోనెంట్](https://react.dev/reference/react/StrictMode) లోపల వెళ్తోంది. ఈ కాంపోనెంట్ అదనపు డీబగ్గింగ్ తనిఖీలను చేర్చమని React లైబ్రరీకి చెబుతుంది, ఇది అభివృద్ధి సమయంలో ఉపయోగపడుతుంది.

```tsx
    <WagmiConfig config={config}>
```

అప్లికేషన్ [`WagmiConfig` కాంపోనెంట్](https://wagmi.sh/react/api/WagmiProvider) లోపల కూడా ఉంది. [వాగ్మి (మేము దీనిని తయారు చేయబోతున్నాము) లైబ్రరీ](https://wagmi.sh/) React UI నిర్వచనాలను Ethereum వికేంద్రీకృత అప్లికేషన్ వ్రాయడం కోసం [viem లైబ్రరీ](https://viem.sh/)తో కలుపుతుంది.

```tsx
      <RainbowKitProvider chains={chains}>
```

మరియు చివరగా, [`RainbowKitProvider` కాంపోనెంట్](https://www.rainbowkit.com/). ఈ కాంపోనెంట్ లాగిన్ అవ్వడం మరియు వాలెట్ మరియు అప్లికేషన్ మధ్య కమ్యూనికేషన్‌ను నిర్వహిస్తుంది.

```tsx
        <App />
```

ఇప్పుడు మనం అప్లికేషన్ కోసం కాంపోనెంట్‌ను కలిగి ఉండవచ్చు, ఇది వాస్తవానికి UIని అమలు చేస్తుంది. కాంపోనెంట్ చివరిలో ఉన్న `/>` XML ప్రమాణం ప్రకారం, ఈ కాంపోనెంట్‌లో ఎటువంటి నిర్వచనాలు లేవని Reactకు చెబుతుంది.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

అయితే, మనం ఇతర కాంపోనెంట్లను కూడా మూసివేయాలి.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

ఇది React కాంపోనెంట్‌ను సృష్టించడానికి ప్రామాణిక మార్గం - రెండర్ చేయవలసిన ప్రతిసారీ పిలువబడే ఒక ఫంక్షన్‌ను నిర్వచించడం. ఈ ఫంక్షన్ సాధారణంగా పైన కొన్ని TypeScript లేదా జావాస్క్రిప్ట్ కోడ్‌ను కలిగి ఉంటుంది, దాని తర్వాత JSX కోడ్‌ను తిరిగి ఇచ్చే `return` స్టేట్‌మెంట్ ఉంటుంది.

```tsx
  const { isConnected } = useAccount()
```

ఇక్కడ మనం వాలెట్ ద్వారా బ్లాక్ చైనుకు కనెక్ట్ అయ్యామా లేదా అని తనిఖీ చేయడానికి [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount)ని ఉపయోగిస్తాము.

సంప్రదాయం ప్రకారం, `use...` అని పిలువబడే React ఫంక్షన్లు కొంత రకమైన డేటాను తిరిగి ఇచ్చే [హుక్స్](https://www.w3schools.com/react/react_hooks.asp). మీరు అటువంటి హుక్స్‌ను ఉపయోగించినప్పుడు, మీ కాంపోనెంట్ డేటాను పొందడమే కాకుండా, ఆ డేటా మారినప్పుడు కాంపోనెంట్ అప్‌డేట్ చేయబడిన సమాచారంతో మళ్లీ రెండర్ చేయబడుతుంది.

```tsx
  return (
    <>
```

React కాంపోనెంట్ యొక్క JSX _ఒక_ కాంపోనెంట్‌ను తిరిగి ఇవ్వాలి. మనకు బహుళ కాంపోనెంట్లు ఉన్నప్పుడు మరియు మనకు "సహజంగా" చుట్టేది ఏమీ లేనప్పుడు, మనం ఖాళీ కాంపోనెంట్‌ను (`<> ...`) ఉపయోగిస్తాము. </>) వాటిని ఒకే కాంపోనెంట్‌గా చేయడానికి.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

మేము RainbowKit నుండి [`ConnectButton` కాంపోనెంట్‌ను](https://www.rainbowkit.com/docs/connect-button) పొందుతాము. మేము కనెక్ట్ కానప్పుడు, అది మాకు `Connect Wallet` బటన్‌ను ఇస్తుంది, ఇది వాలెట్‌లను వివరించే మరియు మీరు ఏది ఉపయోగిస్తున్నారో ఎంచుకోవడానికి మిమ్మల్ని అనుమతించే ఒక మోడల్‌ను తెరుస్తుంది. మేము కనెక్ట్ అయినప్పుడు, అది మనం ఉపయోగించే బ్లాక్ చైను, మన ఖాతా చిరునామా మరియు మన ETH బ్యాలెన్స్‌ను ప్రదర్శిస్తుంది. నెట్‌వర్క్‌ను మార్చడానికి లేదా డిస్‌కనెక్ట్ చేయడానికి మనం ఈ డిస్‌ప్లేలను ఉపయోగించవచ్చు.

```tsx
      {isConnected && (
```

మనం JSXలోకి వాస్తవ జావాస్క్రిప్ట్ (లేదా జావాస్క్రిప్ట్‌కు కంపైల్ చేయబడే TypeScript) ను చేర్చవలసి వచ్చినప్పుడు, మనం బ్రాకెట్లను (`{}`) ఉపయోగిస్తాము.

`a && b` సింటాక్స్ [`a ?` కోసం సంక్షిప్త రూపం. b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). అంటే, `a`నిజమైతే అది`b`కు మదింపు చేయబడుతుంది మరియు లేకపోతే అది `a`కు మదింపు చేయబడుతుంది (ఇది `false`, `0\`, మొదలైనవి కావచ్చు). ఒక నిర్దిష్ట షరతు నెరవేరినప్పుడు మాత్రమే ఒక కాంపోనెంట్ ప్రదర్శించబడాలని Reactకు చెప్పడానికి ఇది ఒక సులభమైన మార్గం.

ఈ సందర్భంలో, వినియోగదారుడు బ్లాక్ చైనుకు కనెక్ట్ అయి ఉంటే మాత్రమే వినియోగదారునికి `గ్రీటర్` చూపించాలని మేము కోరుకుంటున్నాము.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

ఈ ఫైల్ చాలా UI కార్యాచరణను కలిగి ఉంది. ఇందులో సాధారణంగా బహుళ ఫైల్‌లలో ఉండే నిర్వచనాలు ఉన్నాయి, కానీ ఇది ఒక ట్యుటోరియల్ కాబట్టి ప్రోగ్రామ్ మొదటిసారి సులభంగా అర్థం చేసుకోవడానికి ఆప్టిమైజ్ చేయబడింది, పనితీరు లేదా నిర్వహణ సౌలభ్యం కోసం కాదు.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

మేము ఈ లైబ్రరీ ఫంక్షన్లను ఉపయోగిస్తాము. మళ్ళీ, అవి ఉపయోగించబడిన క్రింద వివరించబడ్డాయి.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` లైబ్రరీ](https://abitype.dev/) మనకు వివిధ Ethereum డేటా రకాల కోసం TypeScript నిర్వచనాలను అందిస్తుంది, ఉదాహరణకు [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` కాంట్రాక్ట్ కోసం ఎబిఐ.
మీరు ఒకే సమయంలో కాంట్రాక్టులు మరియు UIని అభివృద్ధి చేస్తుంటే, మీరు సాధారణంగా వాటిని ఒకే రిపోజిటరీలో ఉంచి, Solidity కంపైలర్ ద్వారా ఉత్పత్తి చేయబడిన ఎబిఐని మీ అప్లికేషన్‌లో ఫైల్‌గా ఉపయోగిస్తారు. అయితే, ఇక్కడ ఇది అవసరం లేదు ఎందుకంటే కాంట్రాక్ట్ ఇప్పటికే అభివృద్ధి చేయబడింది మరియు మారబోదు.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript బలంగా టైప్ చేయబడింది. విభిన్న చెయిన్‌లపై `గ్రీటర్` కాంట్రాక్ట్ డిప్లాయ్ చేయబడిన చిరునామాను పేర్కొనడానికి మేము ఈ నిర్వచనాన్ని ఉపయోగిస్తాము. కీ ఒక సంఖ్య (chainId), మరియు విలువ ఒక `AddressType` (ఒక చిరునామా).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

రెండు మద్దతు ఉన్న నెట్‌వర్క్‌లలో కాంట్రాక్ట్ యొక్క చిరునామా: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) మరియు [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

గమనిక: వాస్తవానికి మూడవ నిర్వచనం ఉంది, రెడ్‌స్టోన్ హోల్‌స్కీ కోసం, అది క్రింద వివరించబడుతుంది.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

ఈ రకం `ShowObject` కాంపోనెంట్‌కు పరామితిగా ఉపయోగించబడుతుంది (తరువాత వివరించబడింది). ఇందులో ఆబ్జెక్ట్ పేరు మరియు దాని విలువ ఉంటాయి, అవి డీబగ్గింగ్ ప్రయోజనాల కోసం ప్రదర్శించబడతాయి.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

ఏ సమయంలోనైనా మనం గ్రీటింగ్ ఏమిటో తెలుసుకోవచ్చు (ఎందుకంటే మనం దానిని బ్లాక్ చైను నుండి చదివాము) లేదా తెలియకపోవచ్చు (ఎందుకంటే మనం దానిని ఇంకా స్వీకరించలేదు). కాబట్టి ఒక స్ట్రింగ్ లేదా ఏమీ లేని రకాన్ని కలిగి ఉండటం ఉపయోగకరంగా ఉంటుంది.

##### `Greeter` కాంపోనెంట్ {#greeter-component}

```tsx
const Greeter = () => {
```

చివరగా, మేము కాంపోనెంట్‌ను నిర్వచిస్తాము.

```tsx
  const { chain } = useNetwork()
```

మనం ఉపయోగిస్తున్న చెయిన్ గురించి సమాచారం, [wagmi](https://wagmi.sh/react/hooks/useNetwork) సౌజన్యంతో.
ఇది ఒక హుక్ (`use...`) కాబట్టి, ఈ సమాచారం మారిన ప్రతిసారీ కాంపోనెంట్ మళ్లీ గీయబడుతుంది.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

గ్రీటర్ కాంట్రాక్ట్ యొక్క చిరునామా, ఇది చెయిన్‌ను బట్టి మారుతుంది (మరియు మనకు చెయిన్ సమాచారం లేకపోతే లేదా ఆ కాంట్రాక్ట్ లేని చెయిన్‌లో ఉంటే ఇది `undefined`గా ఉంటుంది).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` హుక్](https://wagmi.sh/react/api/hooks/useReadContract) ఒక కాంట్రాక్ట్ నుండి సమాచారాన్ని చదువుతుంది. UIలో `readResults`ను విస్తరించడం ద్వారా అది ఏ సమాచారాన్ని తిరిగి ఇస్తుందో మీరు సరిగ్గా చూడవచ్చు. ఈ సందర్భంలో మనం గ్రీటింగ్ మారినప్పుడు సమాచారం పొందడానికి అది చూస్తూ ఉండాలని కోరుకుంటున్నాము.

**గమనిక:** గ్రీటింగ్ ఎప్పుడు మారుతుందో తెలుసుకోవడానికి మరియు ఆ విధంగా అప్‌డేట్ చేయడానికి మనం [`setGreeting` ఈవెంట్‌లను](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) వినవచ్చు. అయితే, ఇది మరింత సమర్థవంతంగా ఉండవచ్చు, కానీ ఇది అన్ని సందర్భాలలో వర్తించదు. వినియోగదారుడు విభిన్న చెయిన్‌కు మారినప్పుడు గ్రీటింగ్ కూడా మారుతుంది, కానీ ఆ మార్పుతో పాటు ఏ ఈవెంట్ ఉండదు. ఈవెంట్‌ల కోసం వినే కోడ్ యొక్క ఒక భాగం మరియు చెయిన్ మార్పులను గుర్తించడానికి మరొక భాగం మనకు ఉండవచ్చు, కానీ [`watch` పరామితిని](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) సెట్ చేయడం కంటే అది మరింత సంక్లిష్టంగా ఉంటుంది.

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React యొక్క [`useState` హుక్](https://www.w3schools.com/react/react_usestate.asp) ఒక స్టేట్ వేరియబుల్‌ను పేర్కొనడానికి మనకు అనుమతిస్తుంది, దాని విలువ కాంపోనెంట్ యొక్క ఒక రెండరింగ్ నుండి మరొకదానికి కొనసాగుతుంది. ప్రారంభ విలువ పరామితి, ఈ సందర్భంలో ఖాళీ స్ట్రింగ్.

`useState` హుక్ రెండు విలువలతో కూడిన జాబితాను తిరిగి ఇస్తుంది:

1. స్టేట్ వేరియబుల్ యొక్క ప్రస్తుత విలువ.
2. అవసరమైనప్పుడు స్టేట్ వేరియబుల్‌ను సవరించడానికి ఒక ఫంక్షన్. ఇది ఒక హుక్ కాబట్టి, ఇది పిలువబడిన ప్రతిసారీ కాంపోనెంట్ మళ్లీ రెండర్ చేయబడుతుంది.

ఈ సందర్భంలో, వినియోగదారుడు సెట్ చేయాలనుకుంటున్న కొత్త గ్రీటింగ్ కోసం మేము ఒక స్టేట్ వేరియబుల్‌ను ఉపయోగిస్తున్నాము.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

కొత్త గ్రీటింగ్ ఇన్‌పుట్ ఫీల్డ్ మారినప్పుడు ఇది ఈవెంట్ హ్యాండ్లర్. రకం, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), ఇది ఒక HTML ఇన్‌పుట్ మూలకం యొక్క విలువ మార్పు కోసం హ్యాండ్లర్ అని నిర్దేశిస్తుంది. `<HTMLInputElement>` భాగం ఉపయోగించబడింది ఎందుకంటే ఇది ఒక [సాధారణ రకం](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

ఖాతాదారుల దృక్కోణం నుండి బ్లాక్ చైను లావాదేవీని సమర్పించే ప్రక్రియ ఇది:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) ఉపయోగించి బ్లాక్ చైనులోని ఒక నోడ్‌కు లావాదేవీని పంపండి.
2. నోడ్ నుండి ప్రతిస్పందన కోసం వేచి ఉండండి.
3. ప్రతిస్పందన వచ్చినప్పుడు, వాలెట్ ద్వారా లావాదేవీపై సంతకం చేయమని వినియోగదారుని అడగండి. ఈ దశ నోడ్ ప్రతిస్పందన వచ్చిన తర్వాతే జరగాలి ఎందుకంటే సంతకం చేయడానికి ముందు వినియోగదారునికి లావాదేవీ యొక్క గ్యాస్ ఖర్చు చూపబడుతుంది.
4. వినియోగదారు ఆమోదించే వరకు వేచి ఉండండి.
5. లావాదేవీని మళ్లీ పంపండి, ఈసారి [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) ఉపయోగించి.

దశ 2 గ్రహించదగినంత సమయం తీసుకునే అవకాశం ఉంది, ఈ సమయంలో వినియోగదారులు వారి ఆదేశం నిజంగా యూజర్ ఇంటర్‌ఫేస్ ద్వారా స్వీకరించబడిందా మరియు లావాదేవీపై సంతకం చేయమని వారిని ఎందుకు అడగడం లేదని ఆశ్చర్యపోతారు. అది చెడ్డ వినియోగదారు అనుభవానికి (UX) దారితీస్తుంది.

దీనికి పరిష్కారం [ప్రిపేర్ హుక్స్](https://wagmi.sh/react/prepare-hooks) ఉపయోగించడం. ఒక పరామితి మారిన ప్రతిసారీ, వెంటనే నోడ్‌కు `eth_estimateGas` అభ్యర్థనను పంపండి. అప్పుడు, వినియోగదారుడు వాస్తవానికి లావాదేవీని పంపాలనుకున్నప్పుడు (ఈ సందర్భంలో **గ్రీటింగ్‌ను అప్‌డేట్ చేయండి** నొక్కడం ద్వారా), గ్యాస్ ఖర్చు తెలుస్తుంది మరియు వినియోగదారుడు వెంటనే వాలెట్ పేజీని చూడగలడు.

```tsx
  return (
```

ఇప్పుడు మనం చివరగా తిరిగి ఇవ్వడానికి వాస్తవ HTMLని సృష్టించవచ్చు.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

ఒక `ShowGreeting` కాంపోనెంట్‌ను సృష్టించండి (క్రింద వివరించబడింది), కానీ గ్రీటింగ్ బ్లాక్ చైను నుండి విజయవంతంగా చదవబడితే మాత్రమే.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

ఇది ఇన్‌పుట్ టెక్స్ట్ ఫీల్డ్, ఇక్కడ వినియోగదారుడు కొత్త గ్రీటింగ్‌ను సెట్ చేయవచ్చు. వినియోగదారుడు ఒక కీని నొక్కిన ప్రతిసారీ, మేము `greetingChange`ను పిలుస్తాము, ఇది `setNewGreeting`ను పిలుస్తుంది. `setNewGreeting` `useState` హుక్ నుండి వచ్చినందున, ఇది `Greeter` కాంపోనెంట్‌ను మళ్లీ రెండర్ చేయడానికి కారణమవుతుంది. దీని అర్థం:

- కొత్త గ్రీటింగ్ యొక్క విలువను ఉంచడానికి మనం `విలువ`ను పేర్కొనాలి, ఎందుకంటే లేకపోతే అది డిఫాల్ట్‌గా, ఖాళీ స్ట్రింగ్‌గా మారుతుంది.
- `newGreeting` మారిన ప్రతిసారీ `usePrepareContractWrite` పిలువబడుతుంది, దీని అర్థం ఇది ఎల్లప్పుడూ సిద్ధం చేయబడిన లావాదేవీలో తాజా `newGreeting`ను కలిగి ఉంటుంది.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        గ్రీటింగ్‌ను అప్‌డేట్ చేయండి
      </button>
```

`workingTx.write` లేకపోతే, గ్రీటింగ్ అప్‌డేట్‌ను పంపడానికి అవసరమైన సమాచారం కోసం మేము ఇంకా వేచి ఉన్నాము, కాబట్టి బటన్ డిసేబుల్ చేయబడింది. `workingTx.write` విలువ ఉంటే, అది లావాదేవీని పంపడానికి పిలవవలసిన ఫంక్షన్.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

చివరగా, మేము ఏమి చేస్తున్నామో మీరు చూడటానికి సహాయపడటానికి, మేము ఉపయోగించే మూడు వస్తువులను చూపండి:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` కాంపోనెంట్ {#showgreeting-component}

ఈ కాంపోనెంట్ చూపిస్తుంది

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

ఒక కాంపోనెంట్ ఫంక్షన్ కాంపోనెంట్ యొక్క అన్ని లక్షణాలతో ఒక పరామితిని అందుకుంటుంది.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` కాంపోనెంట్ {#showobject-component}

సమాచార ప్రయోజనాల కోసం, ముఖ్యమైన వస్తువులను (`గ్రీటింగ్ చదవడానికి `readResults`మరియు మేము సృష్టించే లావాదేవీల కోసం`preparedTx`మరియు`workingTx`) చూపించడానికి మేము `ShowObject\` కాంపోనెంట్‌ను ఉపయోగిస్తాము.

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

మేము UIని మొత్తం సమాచారంతో నింపడం ఇష్టం లేదు, కాబట్టి వాటిని వీక్షించడానికి లేదా మూసివేయడానికి వీలుగా, మేము [`details`](https://www.w3schools.com/tags/tag_details.asp) ట్యాగ్‌ను ఉపయోగిస్తాము.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

చాలా ఫీల్డులు [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) ఉపయోగించి ప్రదర్శించబడతాయి.

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          ఫంక్షన్‌లు:
          <ul>
```

దీనికి మినహాయింపు ఫంక్షన్‌లు, అవి [JSON ప్రమాణం](https://www.json.org/json-en.html)లో భాగం కావు, కాబట్టి వాటిని విడిగా ప్రదర్శించాలి.

```tsx
          {funs.map((f, i) =>
```

JSX లోపల, `{` కర్లీ బ్రాకెట్ల `}` లోపల ఉన్న కోడ్ జావాస్క్రిప్ట్‌గా వ్యాఖ్యానించబడుతుంది. అప్పుడు, `(` సాధారణ బ్రాకెట్ల `)` లోపల ఉన్న కోడ్, మళ్ళీ JSXగా వ్యాఖ్యానించబడుతుంది.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

[DOM ట్రీ](https://www.w3schools.com/js/js_htmldom.asp)లోని ట్యాగ్‌లు విభిన్న ఐడెంటిఫైయర్‌లను కలిగి ఉండాలని Reactకు అవసరం. దీని అర్థం ఒకే ట్యాగ్ యొక్క పిల్లలకు (ఈ సందర్భంలో, [అన్‌ఆర్డర్డ్ జాబితా](https://www.w3schools.com/tags/tag_ul.asp)), విభిన్న `కీ` లక్షణాలు అవసరం.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

వివిధ HTML ట్యాగ్‌లను ముగించండి.

##### తుది `ఎగుమతి` {#the-final-export}

```tsx
export { Greeter }
```

అప్లికేషన్ కోసం మనం ఎగుమతి చేయవలసిన కాంపోనెంట్ `గ్రీటర్`.

#### `src/wagmi.ts` {#wagmi-ts}

చివరగా, WAGMIకి సంబంధించిన వివిధ నిర్వచనాలు `src/wagmi.ts`లో ఉన్నాయి. ఇక్కడ నేను ప్రతిదీ వివరించబోవడం లేదు, ఎందుకంటే చాలా వరకు మీరు మార్చవలసిన అవసరం లేని బాయిలర్‌ప్లేట్.

[githubలో](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) ఉన్న కోడ్ ఇక్కడ ఉన్న కోడ్ సరిగ్గా అదే కాదు, ఎందుకంటే వ్యాసంలో తరువాత మేము మరొక చెయిన్‌ను ([Redstone Holesky](https://redstone.xyz/docs/network-info)) జోడిస్తాము.

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

అప్లికేషన్ మద్దతు ఇచ్చే బ్లాక్ చైనులను దిగుమతి చేసుకోండి. మీరు [viem githubలో](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) మద్దతు ఉన్న చెయిన్‌ల జాబితాను చూడవచ్చు.

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/)ను ఉపయోగించడానికి మీకు మీ అప్లికేషన్ కోసం ఒక ప్రాజెక్ట్ ID అవసరం. మీరు దానిని [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in)లో పొందవచ్చు.

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

### మరొక బ్లాక్ చైనును జోడించడం {#add-blockchain}

ఈ రోజుల్లో చాలా [L2 స్కేలింగ్ సొల్యూషన్స్](/layer-2/) ఉన్నాయి, మరియు viem ఇంకా మద్దతు ఇవ్వని కొన్నింటికి మీరు మద్దతు ఇవ్వాలనుకోవచ్చు. అది చేయడానికి, మీరు `src/wagmi.ts`ను సవరించండి. ఈ సూచనలు [రెడ్‌స్టోన్ హోల్‌స్కీ](https://redstone.xyz/docs/network-info)ని ఎలా జోడించాలో వివరిస్తాయి.

1. viem నుండి `defineChain` రకాన్ని దిగుమతి చేయండి.

   ```ts
   import { defineChain } from 'viem'
   ```

2. నెట్‌వర్క్ నిర్వచనాన్ని జోడించండి.

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

3. `configureChains` కాల్‌కు కొత్త చెయిన్‌ను జోడించండి.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. అప్లికేషన్‌కు కొత్త నెట్‌వర్క్‌లో మీ కాంట్రాక్టుల కోసం చిరునామా తెలుసని నిర్ధారించుకోండి. ఈ సందర్భంలో, మేము `src/components/Greeter.tsx`ను సవరించాము:

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

## ముగింపు {#conclusion}

అయితే, మీరు నిజంగా `గ్రీటర్` కోసం ఒక యూజర్ ఇంటర్‌ఫేస్‌ను అందించడం గురించి పట్టించుకోరు. మీరు మీ స్వంత కాంట్రాక్టుల కోసం ఒక యూజర్ ఇంటర్‌ఫేస్‌ను సృష్టించాలనుకుంటున్నారు. మీ స్వంత అప్లికేషన్‌ను సృష్టించడానికి, ఈ దశలను అమలు చేయండి:

1. ఒక wagmi అప్లికేషన్‌ను సృష్టించడానికి పేర్కొనండి.

   ```sh copy
   pnpm create wagmi
   ```

2. అప్లికేషన్‌కు పేరు పెట్టండి.

3. **React** ఫ్రేమ్‌వర్క్‌ను ఎంచుకోండి.

4. **Vite** వేరియంట్‌ను ఎంచుకోండి.

5. మీరు [రెయిన్‌బో కిట్‌ను జోడించవచ్చు](https://www.rainbowkit.com/docs/installation#manual-setup).

ఇప్పుడు వెళ్లి మీ కాంట్రాక్టులను విస్తృత ప్రపంచానికి ఉపయోగపడేలా చేయండి.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

