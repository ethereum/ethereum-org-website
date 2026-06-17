---
title: "మీ కాంట్రాక్ట్ కోసం యూజర్ ఇంటర్‌ఫేస్‌ను నిర్మించడం"
description: "TypeScript, React, Vite మరియు Wagmi వంటి ఆధునిక కాంపోనెంట్‌లను ఉపయోగించి, మేము ఆధునికమైన, కానీ కనీస యూజర్ ఇంటర్‌ఫేస్‌ను పరిశీలిస్తాము మరియు యూజర్ ఇంటర్‌ఫేస్‌కు వాలెట్‌ను ఎలా కనెక్ట్ చేయాలో, సమాచారాన్ని చదవడానికి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా కాల్ చేయాలో, స్మార్ట్ కాంట్రాక్ట్‌కు లావాదేవీని ఎలా పంపాలో మరియు మార్పులను గుర్తించడానికి స్మార్ట్ కాంట్రాక్ట్ నుండి ఈవెంట్‌లను ఎలా పర్యవేక్షించాలో నేర్చుకుంటాము."
author: ఓరి పోమెరాంట్జ్
tags: ["typescript", "react", "vite", "wagmi", "ఫ్రంటెండ్"]
skill: beginner
breadcrumb: "WAGMI తో UI"
published: 2023-11-01
lang: te
sidebarDepth: 3
---

ఎథీరియం ఎకోసిస్టమ్‌లో మనకు అవసరమైన ఒక ఫీచర్‌ను మీరు కనుగొన్నారు. దాన్ని అమలు చేయడానికి మీరు స్మార్ట్ కాంట్రాక్ట్‌లను రాశారు మరియు బహుశా ఆఫ్‌చైన్‌లో రన్ అయ్యే సంబంధిత కోడ్‌ను కూడా రాసి ఉండవచ్చు. ఇది చాలా బాగుంది! దురదృష్టవశాత్తూ, యూజర్ ఇంటర్‌ఫేస్ లేకుండా మీకు ఎవరూ యూజర్లు ఉండరు, మరియు మీరు చివరిసారిగా వెబ్‌సైట్ రాసినప్పుడు ప్రజలు డయల్-అప్ మోడెమ్‌లను ఉపయోగించేవారు మరియు JavaScript కొత్తగా ఉండేది.

ఈ ఆర్టికల్ మీ కోసమే. మీకు ప్రోగ్రామింగ్, మరియు బహుశా కొంచెం JavaScript మరియు HTML తెలుసని నేను అనుకుంటున్నాను, కానీ మీ యూజర్ ఇంటర్‌ఫేస్ నైపుణ్యాలు పాతబడిపోయాయని భావిస్తున్నాను. ఈ రోజుల్లో ఇది ఎలా జరుగుతుందో మీరు చూడటానికి మనం కలిసి ఒక సాధారణ ఆధునిక అప్లికేషన్‌ను పరిశీలిద్దాం.

## ఇది ఎందుకు ముఖ్యం {#why-important}

సిద్ధాంతపరంగా, మీ కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి మీరు ప్రజలను [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) లేదా [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) ఉపయోగించమని చెప్పవచ్చు. అనుభవజ్ఞులైన ఎథీరియన్లకు ఇది చాలా బాగుంటుంది. కానీ మేము [మరో బిలియన్ ప్రజలకు](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) సేవ చేయడానికి ప్రయత్నిస్తున్నాము. గొప్ప యూజర్ అనుభవం లేకుండా ఇది జరగదు, మరియు స్నేహపూర్వక యూజర్ ఇంటర్‌ఫేస్ అందులో పెద్ద భాగం.

## గ్రీటర్ అప్లికేషన్ {#greeter-app}

ఆధునిక UI ఎలా పనిచేస్తుందనే దాని వెనుక చాలా సిద్ధాంతం ఉంది, మరియు [దానిని వివరించే](https://wagmi.sh/core/getting-started) [చాలా మంచి సైట్‌లు](https://react.dev/learn/thinking-in-react) ఉన్నాయి. ఆ సైట్‌లు చేసిన మంచి పనిని పునరావృతం చేయడానికి బదులుగా, మీరు ప్రాక్టికల్‌గా చేయడం ద్వారా నేర్చుకోవడానికి ఇష్టపడతారని నేను భావిస్తున్నాను మరియు మీరు ఆడుకోగల అప్లికేషన్‌తో ప్రారంభిస్తాను. పనులు పూర్తి చేయడానికి మీకు ఇంకా సిద్ధాంతం అవసరం, మరియు మేము దాని గురించి తెలుసుకుంటాము - మేము కేవలం సోర్స్ ఫైల్ వారీగా వెళ్తాము మరియు వాటిని చేరుకున్నప్పుడు విషయాలను చర్చిస్తాము.

### ఇన్‌స్టాలేషన్ {#installation}

1. అప్లికేషన్ [Sepolia](https://sepolia.dev/) టెస్ట్ నెట్‌వర్క్‌ను ఉపయోగిస్తుంది. అవసరమైతే, [Sepolia టెస్ట్ ETH పొందండి](/developers/docs/networks/#sepolia) మరియు [మీ వాలెట్‌కు Sepoliaను జోడించండి](https://chainlist.org/chain/11155111).

2. GitHub రిపోజిటరీని క్లోన్ చేయండి మరియు అవసరమైన ప్యాకేజీలను ఇన్‌స్టాల్ చేయండి.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. అప్లికేషన్ ఉచిత యాక్సెస్ పాయింట్‌లను ఉపయోగిస్తుంది, వీటికి పనితీరు పరిమితులు ఉంటాయి. మీరు [నోడ్ యాజ్ ఎ సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service/) ప్రొవైడర్‌ను ఉపయోగించాలనుకుంటే, [`src/wagmi.ts`](#wagmi-ts) లోని URLలను భర్తీ చేయండి.

4. అప్లికేషన్‌ను ప్రారంభించండి.

   ```sh
   npm run dev
   ```

5. అప్లికేషన్ చూపిన URLకు బ్రౌజ్ చేయండి. చాలా సందర్భాలలో, అది [http://localhost:5173/](http://localhost:5173/).

6. మీరు కాంట్రాక్ట్ సోర్స్ కోడ్‌ను, Hardhat యొక్క గ్రీటర్ యొక్క సవరించిన వెర్షన్‌ను, [బ్లాక్‌చైన్ ఎక్స్‌ప్లోరర్‌లో](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) చూడవచ్చు.

### ఫైల్ వాక్ త్రూ {#file-walk-through}

#### `index.html` {#index-html}

స్క్రిప్ట్ ఫైల్‌ను దిగుమతి చేసే ఈ లైన్ మినహా ఈ ఫైల్ ఒక ప్రామాణిక HTML బాయిలర్‌ప్లేట్.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

ఫైల్ ఎక్స్‌టెన్షన్ ఇది [TypeScript](https://www.typescriptlang.org/) లో వ్రాయబడిన [React కాంపోనెంట్](https://www.w3schools.com/react/react_components.asp) అని సూచిస్తుంది, ఇది [టైప్ చెకింగ్](https://en.wikipedia.org/wiki/Type_system#Type_checking) కు మద్దతు ఇచ్చే JavaScript యొక్క పొడిగింపు. TypeScript JavaScript కు కంపైల్ చేయబడుతుంది, కాబట్టి మనం దానిని క్లయింట్ వైపు ఉపయోగించవచ్చు.

మీకు ఆసక్తి ఉంటే ఈ ఫైల్ ఎక్కువగా వివరించబడింది. సాధారణంగా మీరు ఈ ఫైల్‌ను సవరించరు, కానీ [`src/App.tsx`](#app-tsx) మరియు అది దిగుమతి చేసే ఫైల్‌లను సవరిస్తారు.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

మనకు అవసరమైన లైబ్రరీ కోడ్‌ను దిగుమతి చేయండి.

```tsx
import App from './App.tsx'
```

అప్లికేషన్‌ను అమలు చేసే React కాంపోనెంట్‌ను దిగుమతి చేయండి (క్రింద చూడండి).

```tsx
import { config } from './wagmi.ts'
```

బ్లాక్‌చైన్ కాన్ఫిగరేషన్‌ను కలిగి ఉన్న [Wagmi](https://wagmi.sh/) కాన్ఫిగరేషన్‌ను దిగుమతి చేయండి.

```tsx
const queryClient = new QueryClient()
```

[React Query యొక్క](https://tanstack.com/query/latest/docs/framework/react/overview) కాష్ మేనేజర్ యొక్క కొత్త ఇన్‌స్టాన్స్‌ను సృష్టిస్తుంది. ఈ ఆబ్జెక్ట్ వీటిని నిల్వ చేస్తుంది:

- కాష్ చేయబడిన RPC కాల్స్
- కాంట్రాక్ట్ రీడ్స్
- బ్యాక్‌గ్రౌండ్ రీఫెచింగ్ స్థితి

Wagmi v3 అంతర్గతంగా React Query ని ఉపయోగిస్తుంది కాబట్టి మనకు కాష్ మేనేజర్ అవసరం.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

రూట్ React కాంపోనెంట్‌ను సృష్టించండి. `render` కు పారామీటర్ [JSX](https://www.w3schools.com/react/react_jsx.asp), ఇది HTML మరియు JavaScript/TypeScript రెండింటినీ ఉపయోగించే ఎక్స్‌టెన్షన్ లాంగ్వేజ్. ఇక్కడ ఉన్న ఆశ్చర్యార్థకం గుర్తు TypeScript కాంపోనెంట్‌కు ఇలా చెబుతుంది: "`document.getElementById('root')` అనేది `ReactDOM.createRoot` కు చెల్లుబాటు అయ్యే పారామీటర్ అవుతుందని మీకు తెలియదు, కానీ చింతించకండి - నేను డెవలపర్‌ని మరియు అది ఉంటుందని నేను మీకు చెబుతున్నాను".

```tsx
  <React.StrictMode>
```

అప్లికేషన్ [ఒక `React.StrictMode` కాంపోనెంట్](https://react.dev/reference/react/StrictMode) లోపలికి వెళుతోంది. ఈ కాంపోనెంట్ అదనపు డీబగ్గింగ్ తనిఖీలను చొప్పించమని React లైబ్రరీకి చెబుతుంది, ఇది డెవలప్‌మెంట్ సమయంలో ఉపయోగకరంగా ఉంటుంది.

```tsx
    <WagmiProvider config={config}>
```

అప్లికేషన్ [ఒక `WagmiProvider` కాంపోనెంట్](https://wagmi.sh/react/api/WagmiProvider) లోపల కూడా ఉంది. [Wagmi (మనం దీన్ని తయారు చేయబోతున్నాం) లైబ్రరీ](https://wagmi.sh/) ఎథీరియం వికేంద్రీకృత అప్లికేషన్ (dapp) రాయడం కోసం React UI నిర్వచనాలను [Viem లైబ్రరీతో](https://viem.sh/) కలుపుతుంది.

```tsx
      <QueryClientProvider client={queryClient}>
```

మరియు చివరగా, React Query ప్రొవైడర్‌ను జోడించండి, తద్వారా ఏదైనా అప్లికేషన్ కాంపోనెంట్ కాష్ చేయబడిన క్వెరీలను ఉపయోగించగలదు.

```tsx
        <App />
```

ఇప్పుడు మనం అప్లికేషన్ కోసం కాంపోనెంట్‌ను కలిగి ఉండవచ్చు, ఇది వాస్తవానికి UIని అమలు చేస్తుంది. కాంపోనెంట్ చివర ఉన్న `/>` XML ప్రమాణం ప్రకారం, ఈ కాంపోనెంట్ లోపల ఎలాంటి నిర్వచనాలు లేవని React కు చెబుతుంది.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

వాస్తవానికి, మనం ఇతర కాంపోనెంట్‌లను మూసివేయాలి.

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

మనకు అవసరమైన లైబ్రరీలను, అలాగే [`Greeter` కాంపోనెంట్‌ను](#greeter-tsx) దిగుమతి చేయండి.

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia చైన్ ID.

```
function App() {
```

React కాంపోనెంట్‌ను సృష్టించడానికి ఇది ప్రామాణిక మార్గం: రెండర్ చేయాల్సిన అవసరం వచ్చినప్పుడల్లా కాల్ చేయబడే ఫంక్షన్‌ను నిర్వచించండి. ఈ ఫంక్షన్ సాధారణంగా TypeScript లేదా JavaScript కోడ్‌ను కలిగి ఉంటుంది, ఆ తర్వాత JSX కోడ్‌ను తిరిగి ఇచ్చే `return` స్టేట్‌మెంట్ ఉంటుంది.

```tsx
  const connection = useConnection()
```

చిరునామా మరియు `chainId` వంటి ప్రస్తుత కనెక్షన్‌కు సంబంధించిన సమాచారాన్ని పొందడానికి [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) ను ఉపయోగించండి.

సంప్రదాయం ప్రకారం, React లో `use...` అని పిలువబడే ఫంక్షన్‌లు [హుక్స్](https://www.w3schools.com/react/react_hooks.asp). ఈ ఫంక్షన్‌లు కాంపోనెంట్‌కు డేటాను తిరిగి ఇవ్వడమే కాకుండా; ఆ డేటా మారినప్పుడు అది మళ్లీ రెండర్ చేయబడుతుందని (కాంపోనెంట్ ఫంక్షన్ మళ్లీ అమలు చేయబడుతుంది మరియు దాని అవుట్‌పుట్ HTML లోని మునుపటి దాన్ని భర్తీ చేస్తుంది) కూడా నిర్ధారిస్తాయి.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

వాలెట్ కనెక్షన్ గురించి సమాచారాన్ని పొందడానికి [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) ను ఉపయోగించండి.

```tsx
  const { disconnect } = useDisconnect()
```

[ఈ హుక్](https://wagmi.sh/react/api/hooks/useDisconnect) వాలెట్ నుండి డిస్‌కనెక్ట్ చేయడానికి ఫంక్షన్‌ను ఇస్తుంది.

```tsx
  const { switchChain } = useSwitchChain()
```

[ఈ హుక్](https://wagmi.sh/react/api/hooks/useSwitchChain) చైన్‌లను మార్చడానికి అనుమతిస్తుంది.

```tsx
  useEffect(() => {
```

బాహ్య సిస్టమ్‌ను సింక్రొనైజ్ చేయడానికి వేరియబుల్ విలువ మారినప్పుడల్లా ఫంక్షన్‌ను రన్ చేయడానికి React హుక్ [`useEffect`](https://react.dev/reference/react/useEffect) మిమ్మల్ని అనుమతిస్తుంది.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

మనం కనెక్ట్ అయి ఉండి, కానీ Sepolia బ్లాక్‌చైన్‌కు కాకపోతే, Sepolia కు మారండి.

```tsx
  }, [connection.status, connection.chainId])
```

కనెక్షన్ స్థితి లేదా కనెక్షన్ chainId మారిన ప్రతిసారీ ఫంక్షన్‌ను మళ్లీ రన్ చేయండి.

```tsx
  return (
    <>
```

React కాంపోనెంట్ యొక్క JSX _తప్పనిసరిగా_ ఒకే HTML కాంపోనెంట్‌ను తిరిగి ఇవ్వాలి. మనకు బహుళ కాంపోనెంట్‌లు ఉన్నప్పుడు మరియు వాటన్నింటినీ చుట్టడానికి కంటైనర్ అవసరం లేనప్పుడు, వాటిని ఒకే కాంపోనెంట్‌గా కలపడానికి మనం ఖాళీ కాంపోనెంట్‌ను (`<> ... </>`) ఉపయోగిస్తాము.

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

ప్రస్తుత కనెక్షన్ గురించి సమాచారాన్ని అందించండి. JSX లోపల, `{<expression>}` అంటే ఎక్స్‌ప్రెషన్‌ను JavaScript గా మూల్యాంకనం చేయడం.

```tsx
      {connection.status === 'connected' && (
```

సింటాక్స్ `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

JSX లోపల if స్టేట్‌మెంట్‌లను ఉంచడానికి ఇది ప్రామాణిక మార్గం.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX XML ప్రమాణాన్ని అనుసరిస్తుంది, ఇది HTML కంటే కఠినమైనది. ట్యాగ్‌కు సంబంధిత ఎండ్ ట్యాగ్ లేకపోతే, దాన్ని ముగించడానికి చివరన _తప్పనిసరిగా_ స్లాష్ (`/`) ఉండాలి.

ఇక్కడ మనకు అలాంటి రెండు ట్యాగ్‌లు ఉన్నాయి, `<Greeter />` (ఇది వాస్తవానికి కాంట్రాక్ట్‌తో మాట్లాడే HTML కోడ్‌ను కలిగి ఉంటుంది) మరియు [క్షితిజ సమాంతర రేఖ కోసం `<HTML-PLACEHOLDER-HTMLTAG-8d9513 />`](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

యూజర్ ఈ బటన్‌ను క్లిక్ చేస్తే, `disconnect` ఫంక్షన్‌ను కాల్ చేయండి.

```tsx
      {connection.status !== 'connected' && (
```

మనం కనెక్ట్ _కాకపోతే_, వాలెట్‌కు కనెక్ట్ కావడానికి అవసరమైన ఎంపికలను చూపండి.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors` లో మనకు కనెక్టర్ల జాబితా ఉంది. ప్రదర్శించడానికి దాన్ని JSX బటన్‌ల జాబితాగా మార్చడానికి మనం [`map`](https://www.w3schools.com/jsref/jsref_map.asp) ను ఉపయోగిస్తాము.

```tsx
            <button
              key={connector.uid}
```

JSX లో "సిబ్లింగ్" ట్యాగ్‌లు (ఒకే పేరెంట్ నుండి వచ్చిన ట్యాగ్‌లు) వేర్వేరు ఐడెంటిఫైయర్‌లను కలిగి ఉండటం అవసరం.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

కనెక్టర్ బటన్‌లు.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

అదనపు సమాచారాన్ని అందించండి. ఎక్స్‌ప్రెషన్ సింటాక్స్ `<variable>?.<field>` JavaScript కు వేరియబుల్ నిర్వచించబడితే, ఆ ఫీల్డ్‌కు మూల్యాంకనం చేయమని చెబుతుంది. వేరియబుల్ నిర్వచించబడకపోతే, ఈ ఎక్స్‌ప్రెషన్ `undefined` కు మూల్యాంకనం చేయబడుతుంది.

ఎక్స్‌ప్రెషన్ `error.message`, ఎర్రర్ లేనప్పుడు, ఎక్సెప్షన్‌ను పెంచుతుంది. `error?.message` ను ఉపయోగించడం వల్ల ఈ సమస్యను నివారించవచ్చు.

#### `src/Greeter.tsx` {#greeter-tsx}

ఈ ఫైల్ చాలా వరకు UI కార్యాచరణను కలిగి ఉంటుంది. ఇది సాధారణంగా బహుళ ఫైల్‌లలో ఉండే నిర్వచనాలను కలిగి ఉంటుంది, కానీ ఇది ట్యుటోరియల్ కాబట్టి, ప్రోగ్రామ్ పనితీరు లేదా నిర్వహణ సౌలభ్యం కంటే మొదటిసారి అర్థం చేసుకోవడానికి సులభంగా ఉండేలా ఆప్టిమైజ్ చేయబడింది.

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

మనం ఈ లైబ్రరీ ఫంక్షన్‌లను ఉపయోగిస్తాము. మళ్లీ, అవి ఎక్కడ ఉపయోగించబడతాయో క్రింద వివరించబడ్డాయి.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` లైబ్రరీ](https://abitype.dev/) [`AddressType`](https://abitype.dev/config#addresstype) వంటి వివిధ ఎథీరియం డేటా రకాల కోసం TypeScript నిర్వచనాలను మనకు అందిస్తుంది.

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` కాంట్రాక్ట్ కోసం ABI.
మీరు కాంట్రాక్ట్‌లు మరియు UIని ఒకే సమయంలో డెవలప్ చేస్తుంటే, మీరు సాధారణంగా వాటిని ఒకే రిపోజిటరీలో ఉంచుతారు మరియు Solidity కంపైలర్ ద్వారా రూపొందించబడిన ABIని మీ అప్లికేషన్‌లో ఫైల్‌గా ఉపయోగిస్తారు. అయితే, కాంట్రాక్ట్ ఇప్పటికే డెవలప్ చేయబడినందున మరియు మారదు కాబట్టి ఇక్కడ ఇది అవసరం లేదు.

ఇది _నిజమైన_ స్థిరాంకం అని TypeScript కు చెప్పడానికి మనం [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ను ఉపయోగిస్తాము. సాధారణంగా, మీరు JavaScript లో `const x = {"a": 1}` అని పేర్కొన్నప్పుడు, మీరు `x` లోని విలువను మార్చవచ్చు, మీరు దానికి కేటాయించలేరు.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript స్ట్రాంగ్లీ టైప్ చేయబడింది. వివిధ చైన్‌లలో `Greeter` కాంట్రాక్ట్ ఎక్కడ డిప్లాయ్ చేయబడిందో ఆ చిరునామాను పేర్కొనడానికి మనం ఈ నిర్వచనాన్ని ఉపయోగిస్తాము. కీ అనేది ఒక సంఖ్య (chainId), మరియు విలువ ఒక `AddressType` (ఒక చిరునామా).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) లో కాంట్రాక్ట్ యొక్క చిరునామా.

##### `Timer` component {#timer-component}

`Timer` కాంపోనెంట్ ఇచ్చిన సమయం నుండి ఎన్ని సెకన్లు గడిచిందో చూపుతుంది. వినియోగ ప్రయోజనాల కోసం ఇది ముఖ్యం. యూజర్లు ఏదైనా చేసినప్పుడు, వారు తక్షణ ప్రతిచర్యను ఆశిస్తారు. బ్లాక్‌చైన్‌లలో, లావాదేవీని బ్లాక్‌లో ఉంచే వరకు ఏమీ జరగదు కాబట్టి ఇది తరచుగా అసాధ్యం. యూజర్ చర్యను నిర్వహించినప్పటి నుండి ఎంత సమయం గడిచిందో చూపించడం ఒక పరిష్కారం, తద్వారా అవసరమైన సమయం సహేతుకమైనదా కాదా అని యూజర్ నిర్ణయించుకోవచ్చు.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` కాంపోనెంట్ ఒక పారామీటర్‌ను తీసుకుంటుంది, `lastUpdate`, ఇది చివరి చర్య యొక్క సమయం.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

కాంపోనెంట్ సరిగ్గా పనిచేయడానికి మనం స్థితిని (కాంపోనెంట్‌తో ముడిపడి ఉన్న వేరియబుల్) కలిగి ఉండాలి మరియు దాన్ని అప్‌డేట్ చేయాలి. కానీ మనం దాన్ని ఎప్పుడూ చదవాల్సిన అవసరం లేదు, కాబట్టి వేరియబుల్ చేయడానికి ఇబ్బంది పడకండి.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) ఫంక్షన్ కాలానుగుణంగా రన్ అయ్యేలా ఫంక్షన్‌ను షెడ్యూల్ చేయడానికి అనుమతిస్తుంది. ఈ సందర్భంలో, ప్రతి సెకనుకు. స్థితిని అప్‌డేట్ చేయడానికి ఫంక్షన్ `setNow` ను కాల్ చేస్తుంది, కాబట్టి `Timer` కాంపోనెంట్ మళ్లీ రెండర్ చేయబడుతుంది. కాంపోనెంట్ రెండర్ చేయబడిన ప్రతిసారీ కాకుండా, ఇది ఒక్కసారి మాత్రమే జరిగేలా మనం దీన్ని ఖాళీ డిపెండెన్సీ జాబితాతో [`useEffect`](https://react.dev/reference/react/useEffect) లోపల చుడతాము.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

చివరి అప్‌డేట్ నుండి ఎన్ని సెకన్లు గడిచిందో లెక్కించండి మరియు దాన్ని తిరిగి ఇవ్వండి.

##### `Greeter` component {#greeter-component}

```tsx
const Greeter = () => {
```

చివరగా, మనం కాంపోనెంట్‌ను నిర్వచించగలుగుతాము.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

మనం ఉపయోగిస్తున్న చైన్ మరియు ఖాతా గురించిన సమాచారం, [Wagmi](https://wagmi.sh/) సౌజన్యంతో. ఇది ఒక హుక్ (`use...`) కాబట్టి, ఈ సమాచారం మారినప్పుడల్లా కాంపోనెంట్ మళ్లీ రెండర్ చేయబడుతుంది.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

గ్రీటర్ కాంట్రాక్ట్ యొక్క చిరునామా, మనకు చైన్ సమాచారం లేకపోతే లేదా ఆ కాంట్రాక్ట్ లేని చైన్‌లో మనం ఉంటే ఇది `undefined` అవుతుంది.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // ఆర్గ్యుమెంట్లు లేవు
  })
```

[`useReadContract` హుక్](https://wagmi.sh/react/api/hooks/useReadContract) [కాంట్రాక్ట్](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) యొక్క `greet` ఫంక్షన్‌ను కాల్ చేస్తుంది.

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React యొక్క [`useState` హుక్](https://www.w3schools.com/react/react_usestate.asp) స్థితి వేరియబుల్‌ను పేర్కొనడానికి అనుమతిస్తుంది, దీని విలువ కాంపోనెంట్ యొక్క ఒక రెండరింగ్ నుండి మరొక దానికి కొనసాగుతుంది. ప్రారంభ విలువ పారామీటర్, ఈ సందర్భంలో ఖాళీ స్ట్రింగ్.

`useState` హుక్ రెండు విలువల జాబితాను తిరిగి ఇస్తుంది:

1. స్థితి వేరియబుల్ యొక్క ప్రస్తుత విలువ.
2. అవసరమైనప్పుడు స్థితి వేరియబుల్‌ను సవరించడానికి ఒక ఫంక్షన్. ఇది ఒక హుక్ కాబట్టి, దీన్ని కాల్ చేసిన ప్రతిసారీ కాంపోనెంట్ మళ్లీ రెండర్ చేయబడుతుంది.

ఈ సందర్భంలో, యూజర్ సెట్ చేయాలనుకుంటున్న కొత్త గ్రీటింగ్ కోసం మనం స్థితి వేరియబుల్‌ను ఉపయోగిస్తున్నాము.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

బహుళ యూజర్లు ఒకే సమయంలో ఒకే కాంట్రాక్ట్‌ను ఉపయోగిస్తుంటే, వారు ఒకరి గ్రీటింగ్‌లను మరొకరు ఓవర్‌రైట్ చేయవచ్చు. ఇది అప్లికేషన్ సరిగ్గా పనిచేయడం లేదని యూజర్లకు అనిపించేలా చేస్తుంది. గ్రీటింగ్‌ను చివరిగా ఎవరు సెట్ చేశారో అప్లికేషన్ చూపిస్తే, అది వేరొకరు అని మరియు అప్లికేషన్ సరిగ్గా పనిచేస్తుందని యూజర్‌కు తెలుస్తుంది.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

యూజర్లు తమ చర్యలు తక్షణ ప్రభావాన్ని చూపాలని కోరుకుంటారు. అయితే, బ్లాక్‌చైన్‌లో ఇది జరగదు. ఈ స్థితి వేరియబుల్స్ కనీసం యూజర్లకు ఏదైనా ప్రదర్శించడానికి అనుమతిస్తాయి, తద్వారా వారి చర్య పురోగతిలో ఉందని వారికి తెలుస్తుంది.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

పైన ఉన్న `readResults` డేటాను మార్చినట్లయితే మరియు అది తప్పుడు విలువకు సెట్ చేయబడకపోతే (ఉదాహరణకు, `undefined`), ప్రస్తుత గ్రీటింగ్‌ను బ్లాక్‌చైన్ నుండి చదివిన దానికి అప్‌డేట్ చేయండి. అలాగే, స్థితిని అప్‌డేట్ చేయండి.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` ఈవెంట్‌లను వినండి.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` అంటే విలువ `false` అయితే, లేదా `undefined`, `0` లేదా ఖాళీ స్ట్రింగ్ వంటి తప్పుగా మూల్యాంకనం చేయబడే విలువ అయితే, మొత్తం ఎక్స్‌ప్రెషన్ `false` అవుతుంది. మరే ఇతర విలువకైనా, ఇది `true` అవుతుంది. ఇది విలువలను బూలియన్‌లుగా మార్చడానికి ఒక మార్గం, ఎందుకంటే `greeterAddr` లేకపోతే, మనం ఈవెంట్‌లను వినాలనుకోము.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

మనం లాగ్‌లను చూసినప్పుడు (మనం కొత్త ఈవెంట్‌ను చూసినప్పుడు ఇది జరుగుతుంది), గ్రీటింగ్ సవరించబడిందని అర్థం. ఆ సందర్భంలో, మనం `currentGreeting` మరియు `lastSetterAddress` లను కొత్త విలువలకు అప్‌డేట్ చేయవచ్చు. అలాగే, మనం స్టేటస్ డిస్‌ప్లేను అప్‌డేట్ చేయాలనుకుంటున్నాము.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

మనం స్థితిని అప్‌డేట్ చేసినప్పుడు మనం రెండు పనులు చేయాలనుకుంటున్నాము:

1. స్టేటస్ స్ట్రింగ్‌ను అప్‌డేట్ చేయండి (`status`)
2. చివరి స్టేటస్ అప్‌డేట్ సమయాన్ని (`statusTime`) ఇప్పటికి అప్‌డేట్ చేయండి.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

కొత్త గ్రీటింగ్ ఇన్‌పుట్ ఫీల్డ్‌లో మార్పుల కోసం ఇది ఈవెంట్ హ్యాండ్లర్. మనం `evt` పారామీటర్ రకాన్ని పేర్కొనవచ్చు, కానీ TypeScript అనేది టైప్ ఆప్షనల్ లాంగ్వేజ్. ఈ ఫంక్షన్ HTML ఈవెంట్ హ్యాండ్లర్‌లో ఒక్కసారి మాత్రమే కాల్ చేయబడుతుంది కాబట్టి, ఇది అవసరమని నేను అనుకోను.

```tsx
  const { writeContractAsync } = useWriteContract()
```

కాంట్రాక్ట్‌కు రాయడానికి ఫంక్షన్. ఇది [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts) కు సమానంగా ఉంటుంది, కానీ మెరుగైన స్టేటస్ అప్‌డేట్‌లను ఎనేబుల్ చేస్తుంది.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

క్లయింట్ కోణం నుండి బ్లాక్‌చైన్ లావాదేవీని సమర్పించే ప్రక్రియ ఇది:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) ఉపయోగించి బ్లాక్‌చైన్‌లోని నోడ్‌కు లావాదేవీని పంపండి.
2. నోడ్ నుండి ప్రతిస్పందన కోసం వేచి ఉండండి.
3. ప్రతిస్పందన వచ్చినప్పుడు, వాలెట్ ద్వారా లావాదేవీపై సంతకం చేయమని యూజర్‌ను అడగండి. నోడ్ ప్రతిస్పందన వచ్చిన తర్వాత ఈ దశ _తప్పనిసరిగా_ జరగాలి ఎందుకంటే సంతకం చేయడానికి ముందు యూజర్‌కు లావాదేవీ యొక్క గ్యాస్ ఖర్చు చూపబడుతుంది.
4. యూజర్ ఆమోదించే వరకు వేచి ఉండండి.
5. లావాదేవీని మళ్లీ పంపండి, ఈసారి [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) ఉపయోగించి.

దశ 2 గుర్తించదగినంత సమయం తీసుకునే అవకాశం ఉంది, ఈ సమయంలో యూజర్లు తమ కమాండ్ యూజర్ ఇంటర్‌ఫేస్ ద్వారా స్వీకరించబడిందా లేదా అని మరియు లావాదేవీపై సంతకం చేయమని వారిని ఇంకా ఎందుకు అడగడం లేదని ఆశ్చర్యపోవచ్చు. అది పేలవమైన యూజర్ అనుభవాన్ని (UX) సృష్టిస్తుంది.

పారామీటర్ మారిన ప్రతిసారీ `eth_estimateGas` పంపడం ఒక పరిష్కారం. అప్పుడు, యూజర్ వాస్తవానికి లావాదేవీని పంపాలనుకున్నప్పుడు (ఈ సందర్భంలో **Update greeting** నొక్కడం ద్వారా), గ్యాస్ ఖర్చు తెలుస్తుంది మరియు యూజర్ వెంటనే వాలెట్ పేజీని చూడగలరు.

```tsx
  return (
```

ఇప్పుడు మనం చివరగా తిరిగి ఇవ్వడానికి అసలు HTMLని సృష్టించవచ్చు.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

ప్రస్తుత గ్రీటింగ్‌ను చూపండి.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

గ్రీటింగ్‌ను చివరిగా ఎవరు సెట్ చేశారో మనకు తెలిస్తే, ఆ సమాచారాన్ని ప్రదర్శించండి. `Greeter` ఈ సమాచారాన్ని ట్రాక్ చేయదు, మరియు మనం `SetGreeting` ఈవెంట్‌ల కోసం వెనక్కి తిరిగి చూడాలనుకోవడం లేదు, కాబట్టి మనం రన్ అవుతున్నప్పుడు గ్రీటింగ్ మారిన తర్వాత మాత్రమే దాన్ని పొందుతాము.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

ఇది ఇన్‌పుట్ టెక్స్ట్ ఫీల్డ్, ఇక్కడ యూజర్ కొత్త గ్రీటింగ్‌ను సెట్ చేయవచ్చు. యూజర్ కీని నొక్కిన ప్రతిసారీ, మనం `greetingChange` ని కాల్ చేస్తాము, ఇది `setNewGreeting` ని కాల్ చేస్తుంది. `setNewGreeting` `useState` నుండి వస్తుంది కాబట్టి, ఇది `Greeter` కాంపోనెంట్‌ను మళ్లీ రెండర్ చేయడానికి కారణమవుతుంది. దీని అర్థం:

- కొత్త గ్రీటింగ్ విలువను ఉంచడానికి మనం `value` ని పేర్కొనాలి, ఎందుకంటే లేకపోతే అది డిఫాల్ట్‌గా, ఖాళీ స్ట్రింగ్‌గా మారుతుంది.
- `newGreeting` మారిన ప్రతిసారీ `simulation` కూడా అప్‌డేట్ చేయబడుతుంది, అంటే మనం సరైన గ్రీటింగ్‌తో సిమ్యులేషన్‌ను పొందుతాము. ఇది సంబంధితంగా ఉండవచ్చు ఎందుకంటే గ్యాస్ ఖర్చు కాల్ డేటా పరిమాణంపై ఆధారపడి ఉంటుంది, ఇది స్ట్రింగ్ పొడవుపై ఆధారపడి ఉంటుంది.

```tsx
      <button disabled={!simulation.data}
```

లావాదేవీని పంపడానికి అవసరమైన సమాచారం మనకు ఉన్న తర్వాత మాత్రమే బటన్‌ను ఎనేబుల్ చేయండి.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

స్థితిని అప్‌డేట్ చేయండి. ఈ సమయంలో, యూజర్ వాలెట్‌లో నిర్ధారించాలి.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

లావాదేవీ వాస్తవానికి పంపబడిన తర్వాత మాత్రమే `writeContractAsync` తిరిగి వస్తుంది. లావాదేవీ బ్లాక్‌చైన్‌లో చేర్చబడటానికి ఎంతకాలం వేచి ఉందో యూజర్‌కు చూపించడానికి ఇది అనుమతిస్తుంది.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

స్థితిని మరియు అది అప్‌డేట్ చేయబడినప్పటి నుండి ఎంత సమయం గడిచిందో చూపండి.

```
export {Greeter}
```

కాంపోనెంట్‌ను ఎగుమతి చేయండి.

#### `src/wagmi.ts` {#wagmi-ts}

చివరగా, Wagmi కి సంబంధించిన వివిధ నిర్వచనాలు `src/wagmi.ts` లో ఉన్నాయి. నేను ఇక్కడ ప్రతిదీ వివరించడం లేదు, ఎందుకంటే ఇందులో ఎక్కువ భాగం బాయిలర్‌ప్లేట్, మీరు మార్చాల్సిన అవసరం ఉండకపోవచ్చు.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi కాన్ఫిగరేషన్‌లో ఈ అప్లికేషన్ మద్దతు ఇచ్చే చైన్‌లు ఉంటాయి. మీరు [అందుబాటులో ఉన్న చైన్‌ల జాబితాను](https://wagmi.sh/core/api/chains) చూడవచ్చు.

```ts
  connectors: [
    injected(),
  ],
```

[ఈ కనెక్టర్](https://wagmi.sh/core/api/connectors/injected) బ్రౌజర్‌లో ఇన్‌స్టాల్ చేయబడిన వాలెట్‌తో మాట్లాడటానికి అనుమతిస్తుంది.

```ts
  transports: {
    [sepolia.id]: http()
```

Viem తో వచ్చే డిఫాల్ట్ HTTP ఎండ్‌పాయింట్ సరిపోతుంది. మనకు వేరే URL కావాలంటే, మనం `http("https:// hostname ")` లేదా `webSocket("wss:// hostname ")` ని ఉపయోగించవచ్చు.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## మరొక బ్లాక్‌చైన్‌ను జోడించడం {#add-blockchain}

ఈ రోజుల్లో చాలా [L2 స్కేలింగ్ పరిష్కారాలు](https://ethereum.org/layer-2/) ఉన్నాయి, మరియు Viem ఇంకా మద్దతు ఇవ్వని వాటికి మీరు మద్దతు ఇవ్వాలనుకోవచ్చు. దీన్ని చేయడానికి, మీరు `src/wagmi.ts` ని సవరిస్తారు. ఈ సూచనలు [Optimism Sepolia](https://chainlist.org/chain/11155420) ని ఎలా జోడించాలో వివరిస్తాయి.

1.  `src/wagmi.ts` ని సవరించండి

    A. Viem నుండి `defineChain` రకాన్ని దిగుమతి చేయండి.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. నెట్‌వర్క్ నిర్వచనాన్ని జోడించండి. Optimism Sepolia కోసం మీరు దీన్ని నిజంగా చేయాల్సిన అవసరం లేదు, [ఇది ఇప్పటికే `viem` లో ఉంది](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), కానీ ఈ విధంగా మీరు `viem` లో లేని బ్లాక్‌చైన్‌ను ఎలా జోడించాలో నేర్చుకుంటారు.

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

    C. `createConfig` కాల్‌కు కొత్త చైన్‌ను జోడించండి.

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

2.  Sepolia కు ఆటోమేటిక్ స్విచ్‌ను కామెంట్ చేయడానికి `src/App.tsx` ని సవరించండి. ప్రొడక్షన్ సిస్టమ్‌లో, మీరు బహుశా మీరు మద్దతు ఇచ్చే ప్రతి బ్లాక్‌చైన్‌లకు లింక్‌లతో కూడిన బటన్‌లను చూపుతారు.

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

3.  కొత్త నెట్‌వర్క్‌లో మీ కాంట్రాక్ట్‌ల చిరునామా అప్లికేషన్‌కు తెలుసని నిర్ధారించుకోవడానికి `src/Greeter.tsx` ని సవరించండి.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  మీ బ్రౌజర్‌లో.

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true) కు బ్రౌజ్ చేయండి మరియు మీ వాలెట్‌కు చైన్‌ను జోడించడానికి టేబుల్ కుడి వైపున ఉన్న బటన్‌లలో ఒకదాన్ని క్లిక్ చేయండి.

    B. అప్లికేషన్‌లో, బ్లాక్‌చైన్‌ను మార్చడానికి **Disconnect** చేసి, ఆపై మళ్లీ కనెక్ట్ చేయండి. దీన్ని నిర్వహించడానికి మంచి మార్గాలు ఉన్నాయి, కానీ వాటికి అప్లికేషన్ మార్పులు అవసరం.

## ముగింపు {#conclusion}

వాస్తవానికి, `Greeter` కోసం యూజర్ ఇంటర్‌ఫేస్‌ను అందించడం గురించి మీరు నిజంగా పట్టించుకోరు. మీరు మీ స్వంత కాంట్రాక్ట్‌ల కోసం యూజర్ ఇంటర్‌ఫేస్‌ను సృష్టించాలనుకుంటున్నారు. మీ స్వంత అప్లికేషన్‌ను సృష్టించడానికి, ఈ దశలను రన్ చేయండి:

1. Wagmi అప్లికేషన్‌ను సృష్టించడానికి పేర్కొనండి.

   ```sh copy
   npm create wagmi
   ```

2. కొనసాగడానికి `y` అని టైప్ చేయండి.

3. అప్లికేషన్‌కు పేరు పెట్టండి.

4. **React** ఫ్రేమ్‌వర్క్‌ను ఎంచుకోండి.

5. **Vite** వేరియంట్‌ను ఎంచుకోండి.

ఇప్పుడు వెళ్లి మీ కాంట్రాక్ట్‌లను విస్తృత ప్రపంచానికి ఉపయోగపడేలా చేయండి.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).