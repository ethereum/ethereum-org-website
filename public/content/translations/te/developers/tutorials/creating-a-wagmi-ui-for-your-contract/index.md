---
title: "మీ కాంట్రాక్ట్ కోసం యూజర్ ఇంటర్‌ఫేస్‌ను నిర్మించడం"
description: "TypeScript, React, Vite, మరియు Wagmi వంటి ఆధునిక కాంపోనెంట్లను ఉపయోగించి, మేము ఒక ఆధునిక, కానీ అతి తక్కువ, యూజర్ ఇంటర్‌ఫేస్‌ను పరిశీలిస్తాము మరియు యూజర్ ఇంటర్‌ఫేస్‌కు ఒక వాలెట్‌ను ఎలా కనెక్ట్ చేయాలో, సమాచారాన్ని చదవడానికి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా పిలవాలో, స్మార్ట్ కాంట్రాక్ట్‌కు ఒక లావాదేవీని ఎలా పంపాలో, మరియు మార్పులను గుర్తించడానికి స్మార్ట్ కాంట్రాక్ట్ నుండి ఈవెంట్‌లను ఎలా పర్యవేక్షించాలో నేర్చుకుంటాము."
author: Ori Pomerantz
tags: ["TypeScript", "react", "vite", "wagmi", "frontend"]
skill: beginner
published: 2023-11-01
lang: te
sidebarDepth: 3
---

Ethereum పర్యావరణ వ్యవస్థలో మాకు అవసరమైన ఒక ఫీచర్‌ను మీరు కనుగొన్నారు. దానిని అమలు చేయడానికి మీరు స్మార్ట్ కాంట్రాక్టులను వ్రాశారు, మరియు బహుశా ఆఫ్‌చెయిన్‌లో నడిచే కొన్ని సంబంధిత కోడ్‌ను కూడా వ్రాశారు. ఇది చాలా బాగుంది! దురదృష్టవశాత్తు, యూజర్ ఇంటర్‌ఫేస్ లేకుండా మీకు ఏ వినియోగదారులు ఉండరు, మరియు మీరు చివరిసారిగా వెబ్‌సైట్‌ను వ్రాసినప్పుడు ప్రజలు డయల్-అప్ మోడెమ్‌లను ఉపయోగించారు మరియు జావాస్క్రిప్ట్ కొత్తది.

ఈ వ్యాసం మీ కోసం. మీకు ప్రోగ్రామింగ్ తెలుసని, మరియు బహుశా కొద్దిగా జావాస్క్రిప్ట్ మరియు HTML కూడా తెలుసని నేను భావిస్తున్నాను, కానీ మీ యూజర్ ఇంటర్‌ఫేస్ నైపుణ్యాలు తుప్పుపట్టినవి మరియు కాలం చెల్లినవి. మనం కలిసి ఒక సాధారణ ఆధునిక అప్లికేషన్‌ను పరిశీలిద్దాం, తద్వారా ఈ రోజుల్లో ఇది ఎలా జరుగుతుందో మీరు చూస్తారు.

## ఇది ఎందుకు ముఖ్యం {#why-important}

సిద్ధాంతపరంగా, మీ కాంట్రాక్టులతో పరస్పర చర్య చేయడానికి మీరు ప్రజలను [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) లేదా [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) ఉపయోగించేలా చేయవచ్చు. అది అనుభవజ్ఞులైన Ethereans కోసం చాలా బాగుంటుంది. కానీ మేము [మరొక బిలియన్ ప్రజలకు](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) సేవ చేయడానికి ప్రయత్నిస్తున్నాము. గొప్ప వినియోగదారు అనుభవం లేకుండా ఇది జరగదు, మరియు స్నేహపూర్వక యూజర్ ఇంటర్‌ఫేస్ అందులో ఒక పెద్ద భాగం.

## గ్రీటర్ అప్లికేషన్ {#greeter-app}

ఆధునిక UI ఎలా పనిచేస్తుందనే దాని వెనుక చాలా సిద్ధాంతం ఉంది, మరియు [చాలా మంచి సైట్లు](https://react.dev/learn/thinking-in-react) [దానిని వివరిస్తాయి](https://wagmi.sh/core/getting-started). ఆ సైట్‌లు చేసిన మంచి పనిని పునరావృతం చేయడానికి బదులుగా, మీరు చేయడం ద్వారా నేర్చుకోవడానికి ఇష్టపడతారని నేను భావిస్తున్నాను మరియు మీరు ఆడగల అప్లికేషన్‌తో ప్రారంభిస్తున్నాను. విషయాలను పూర్తి చేయడానికి మీకు ఇంకా సిద్ధాంతం అవసరం, మరియు మేము దానిని చేరుకుంటాము - మేము సోర్స్ ఫైల్ ద్వారా సోర్స్ ఫైల్‌కు వెళ్తాము మరియు మేము వాటిని చేరుకున్నప్పుడు విషయాలను చర్చిస్తాము.

### సంస్థాపన {#installation}

1. అప్లికేషన్ [Sepolia](https://sepolia.dev/) టెస్ట్ నెట్‌వర్క్‌ను ఉపయోగిస్తుంది. అవసరమైతే, [Sepolia టెస్ట్ ETH పొందండి](/developers/docs/networks/#sepolia) మరియు [మీ వాలెట్‌కు Sepoliaను జోడించండి](https://chainlist.org/chain/11155111).

2. GitHub రిపోజిటరీని క్లోన్ చేసి అవసరమైన ప్యాకేజీలను ఇన్‌స్టాల్ చేయండి.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. అప్లికేషన్ ఉచిత యాక్సెస్ పాయింట్లను ఉపయోగిస్తుంది, వాటికి పనితీరు పరిమితులు ఉంటాయి. మీరు [నోడ్ యాజ్ ఎ సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service/) ప్రొవైడర్‌ను ఉపయోగించాలనుకుంటే, [`src/wagmi.ts`](#wagmi-ts) లో URLలను భర్తీ చేయండి.

4. అప్లికేషన్‌ను ప్రారంభించండి.

   ```sh
   npm run dev
   ```

5. అప్లికేషన్ చూపిన URLకు బ్రౌజ్ చేయండి. చాలా సందర్భాలలో, అది [http://localhost:5173/](http://localhost:5173/).

6. మీరు [ఒక బ్లాక్‌చైన్ ఎక్స్‌ప్లోరర్‌లో](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) కాంట్రాక్ట్ సోర్స్ కోడ్‌ను, Hardhat యొక్క గ్రీటర్ యొక్క కొద్దిగా సవరించిన సంస్కరణను చూడవచ్చు.

### ఫైల్ వాక్ త్రూ {#file-walk-through}

#### `index.html` {#index-html}

ఈ ఫైల్ ప్రామాణిక HTML బాయిలర్‌ప్లేట్, ఈ పంక్తి మినహా, ఇది స్క్రిప్ట్ ఫైల్‌ను దిగుమతి చేస్తుంది.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

ఫైల్ ఎక్స్‌టెన్షన్ ఈ ఫైల్ [TypeScript](https://www.typescriptlang.org/) లో వ్రాయబడిన [React కాంపోనెంట్](https://www.w3schools.com/react/react_components.asp) అని మనకు చెబుతుంది, ఇది [టైప్ చెకింగ్](https://en.wikipedia.org/wiki/Type_system#Type_checking)కు మద్దతు ఇచ్చే జావాస్క్రిప్ట్ యొక్క పొడిగింపు. TypeScript జావాస్క్రిప్ట్‌లోకి కంపైల్ చేయబడుతుంది, కాబట్టి మనం క్లయింట్ వైపు దీనిని ఉపయోగించవచ్చు.

ఈ ఫైల్ మీకు ఆసక్తి ఉంటే ఎక్కువగా వివరించబడింది. సాధారణంగా మీరు ఈ ఫైల్‌ను కాకుండా [`src/App.tsx`](#app-tsx) మరియు అది దిగుమతి చేసే ఫైల్‌లను సవరిస్తారు.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

మనకు అవసరమైన లైబ్రరీ కోడ్‌ను దిగుమతి చేసుకోండి.

```tsx
import App from './App.tsx'
```

అప్లికేషన్‌ను అమలు చేసే React కాంపోనెంట్‌ను దిగుమతి చేయండి (క్రింద చూడండి).

```tsx
import { config } from './wagmi.ts'
```

బ్లాక్‌చైన్ కాన్ఫిగరేషన్‌తో సహా [wagmi](https://wagmi.sh/) కాన్ఫిగరేషన్‌ను దిగుమతి చేయండి.

```tsx
const queryClient = new QueryClient()
```

[React Query యొక్క](https://tanstack.com/query/latest/docs/framework/react/overview) కాష్ మేనేజర్ యొక్క కొత్త ఉదాహరణను సృష్టిస్తుంది. ఈ ఆబ్జెక్ట్ ఇవి నిల్వ చేస్తుంది:

- కాష్ చేయబడిన RPC కాల్‌లు
- కాంట్రాక్ట్ రీడ్‌లు
- బ్యాక్‌గ్రౌండ్ రీఫెచింగ్ స్థితి

wagmi v3 అంతర్గతంగా React Queryని ఉపయోగిస్తుంది కాబట్టి మనకు కాష్ మేనేజర్ అవసరం.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

రూట్ React కాంపోనెంట్‌ను సృష్టించండి. `render` కు పరామితి [JSX](https://www.w3schools.com/react/react_jsx.asp), ఇది HTML మరియు జావాస్క్రిప్ట్/TypeScript రెండింటినీ ఉపయోగించే ఒక పొడిగింపు భాష. ఇక్కడ ఆశ్చర్యార్థకం గుర్తు TypeScript కాంపోనెంట్‌కు చెబుతుంది: "`document.getElementById('root')` `ReactDOM.createRoot`కు చెల్లుబాటు అయ్యే పరామితి అవుతుందని మీకు తెలియదు, కానీ చింతించకండి - నేను డెవలపర్‌ని మరియు అది అక్కడ ఉంటుందని నేను మీకు చెబుతున్నాను".

```tsx
  <React.StrictMode>
```

అప్లికేషన్ [`React.StrictMode` కాంపోనెంట్](https://react.dev/reference/react/StrictMode) లోపల వెళ్తోంది. ఈ కాంపోనెంట్ అదనపు డీబగ్గింగ్ తనిఖీలను చేర్చమని React లైబ్రరీకి చెబుతుంది, ఇది అభివృద్ధి సమయంలో ఉపయోగపడుతుంది.

```tsx
    <WagmiProvider config={config}>
```

అప్లికేషన్ [`WagmiProvider` కాంపోనెంట్](https://wagmi.sh/react/api/WagmiProvider) లోపల కూడా ఉంది. [wagmi (we are going to make it) లైబ్రరీ](https://wagmi.sh/) React UI నిర్వచనాలను Ethereum వికేంద్రీకృత అప్లికేషన్ వ్రాయడం కోసం [viem లైబ్రరీ](https://viem.sh/)తో కలుపుతుంది.

```tsx
      <QueryClientProvider client={queryClient}>
```

చివరగా, ఏ అప్లికేషన్ కాంపోనెంట్ అయినా కాష్ చేసిన క్వెరీలను ఉపయోగించగలిగేలా React Query ప్రొవైడర్‌ను జోడించండి.

```tsx
        <App />
```

ఇప్పుడు మనం అప్లికేషన్ కోసం కాంపోనెంట్‌ను కలిగి ఉండవచ్చు, ఇది వాస్తవానికి UIని అమలు చేస్తుంది. కాంపోనెంట్ చివరిలో ఉన్న `/>` XML ప్రమాణం ప్రకారం, ఈ కాంపోనెంట్‌లో ఎటువంటి నిర్వచనాలు లేవని Reactకు చెబుతుంది.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

అయితే, మనం ఇతర కాంపోనెంట్లను కూడా మూసివేయాలి.

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

ఇది React కాంపోనెంట్‌ను సృష్టించడానికి ప్రామాణిక మార్గం: రెండర్ చేయవలసిన ప్రతిసారీ పిలువబడే ఒక ఫంక్షన్‌ను నిర్వచించడం. ఈ ఫంక్షన్ సాధారణంగా TypeScript లేదా జావాస్క్రిప్ట్ కోడ్‌ను కలిగి ఉంటుంది, దాని తర్వాత JSX కోడ్‌ను తిరిగి ఇచ్చే `return` స్టేట్‌మెంట్ ఉంటుంది.

```tsx
  const connection = useConnection()
```

ప్రస్తుత కనెక్షన్‌కు సంబంధించిన సమాచారం, అడ్రసు మరియు `chainId` వంటివి పొందడానికి [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) ను ఉపయోగించండి.

సంప్రదాయం ప్రకారం, `use...` అని పిలువబడే React ఫంక్షన్లు [హుక్స్](https://www.w3schools.com/react/react_hooks.asp). ఈ ఫంక్షన్లు కాంపోనెంట్‌కు డేటాను తిరిగి ఇవ్వడమే కాకుండా; ఆ డేటా మారినప్పుడు అది రీ-రెండర్ చేయబడేలా (కాంపోనెంట్ ఫంక్షన్ మళ్లీ అమలు చేయబడుతుంది, మరియు దాని అవుట్‌పుట్ HTMLలో మునుపటిదాన్ని భర్తీ చేస్తుంది) నిర్ధారిస్తాయి.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

వాలెట్ కనెక్షన్ గురించి సమాచారం పొందడానికి [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) ను ఉపయోగించండి.

```tsx
  const { disconnect } = useDisconnect()
```

[ఈ హుక్](https://wagmi.sh/react/api/hooks/useDisconnect) వాలెట్ నుండి డిస్‌కనెక్ట్ చేయడానికి ఫంక్షన్‌ను మనకు ఇస్తుంది.

```tsx
  const { switchChain } = useSwitchChain()
```

[ఈ హుక్](https://wagmi.sh/react/api/hooks/useSwitchChain) చైన్‌లను మార్చడానికి అనుమతిస్తుంది.

```tsx
  useEffect(() => {
```

React హుక్ [`useEffect`](https://react.dev/reference/react/useEffect) ఒక వేరియబుల్ విలువ మారినప్పుడు బాహ్య వ్యవస్థను సమకాలీకరించడానికి ఒక ఫంక్షన్‌ను అమలు చేయడానికి అనుమతిస్తుంది.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

మనం కనెక్ట్ అయి ఉంటే, కానీ Sepolia బ్లాక్‌చైన్‌కు కాకపోతే, Sepoliaకు మారండి.

```tsx
  }, [connection.status, connection.chainId])
```

కనెక్షన్ స్థితి లేదా కనెక్షన్ chainId మారిన ప్రతిసారీ ఫంక్షన్‌ను మళ్లీ అమలు చేయండి.

```tsx
  return (
    <>
```

React కాంపోనెంట్ యొక్క JSX _ఒక_ HTML కాంపోనెంట్‌ను తిరిగి ఇవ్వాలి. మనకు బహుళ కాంపోనెంట్లు ఉన్నప్పుడు మరియు వాటన్నింటినీ చుట్టడానికి కంటైనర్ అవసరం లేనప్పుడు, మనం ఖాళీ కాంపోనెంట్‌ను (`<> ... </>`) ఒకే కాంపోనెంట్‌గా కలపడానికి ఉపయోగిస్తాము.

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

ప్రస్తుత కనెక్షన్ గురించి సమాచారాన్ని అందించండి. JSX లోపల, `{<expression>}` అంటే ఎక్స్‌ప్రెషన్‌ను జావాస్క్రిప్ట్‌గా మూల్యాంకనం చేయడం.

```tsx
      {connection.status === 'connected' && (
```

`{<condition> && <value>}` సింటాక్స్ అంటే "షరతు `true` అయితే, విలువకు మూల్యాంకనం చేయండి; కాకపోతే, `false`కు మూల్యాంకనం చేయండి".

JSX లోపల if స్టేట్‌మెంట్లను ఉంచడానికి ఇది ప్రామాణిక మార్గం.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX XML ప్రమాణాన్ని అనుసరిస్తుంది, ఇది HTML కంటే కఠినమైనది. ఒక ట్యాగ్‌కు సంబంధిత ముగింపు ట్యాగ్ లేకపోతే, అది ముగించడానికి చివరలో తప్పనిసరిగా స్లాష్ (`/`) కలిగి ఉండాలి.

ఇక్కడ మనకు రెండు అలాంటి ట్యాగ్‌లు ఉన్నాయి, `<Greeter />` (ఇది వాస్తవానికి కాంట్రాక్ట్‌తో మాట్లాడే HTML కోడ్‌ను కలిగి ఉంటుంది) మరియు [అడ్డు గీత కోసం `<hr />`](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
</div>
      )}
```

వినియోగదారుడు ఈ బటన్‌ను క్లిక్ చేస్తే, `disconnect` ఫంక్షన్‌ను కాల్ చేయండి.

```tsx
      {connection.status !== 'connected' && (
```

మనం కనెక్ట్ _కాకపోతే_, వాలెట్‌కు కనెక్ట్ అవడానికి అవసరమైన ఎంపికలను చూపించండి.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors`లో మనకు కనెక్టర్ల జాబితా ఉంది. ప్రదర్శించడానికి JSX బటన్‌ల జాబితాగా మార్చడానికి మనం [`map`](https://www.w3schools.com/jsref/jsref_map.asp)ను ఉపయోగిస్తాము.

```tsx
            <button
              key={connector.uid}
```

JSXలో "సోదర" ట్యాగ్‌లకు (ఒకే పేరెంట్ నుండి వచ్చిన ట్యాగ్‌లు) వేర్వేరు ఐడెంటిఫయర్‌లు ఉండటం అవసరం.

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

అదనపు సమాచారాన్ని అందించండి. `<variable>?.<field>` ఎక్స్‌ప్రెషన్ సింటాక్స్ జావాస్క్రిప్ట్‌కు చెబుతుంది, వేరియబుల్ నిర్వచించబడి ఉంటే, ఆ ఫీల్డ్‌కు మూల్యాంకనం చేయండి. వేరియబుల్ నిర్వచించబడకపోతే, ఈ ఎక్స్‌ప్రెషన్ `undefined`కు మూల్యాంకనం అవుతుంది.

ఎర్రర్ లేనప్పుడు `error.message` ఎక్స్‌ప్రెషన్ ఒక ఎక్సెప్షన్‌ను ఉత్పన్నం చేస్తుంది. `error?.message` ఉపయోగించడం ఈ సమస్యను నివారించడానికి అనుమతిస్తుంది.

#### `src/Greeter.tsx` {#greeter-tsx}

ఈ ఫైల్ చాలా UI కార్యాచరణను కలిగి ఉంది. ఇందులో సాధారణంగా బహుళ ఫైల్‌లలో ఉండే నిర్వచనాలు ఉన్నాయి, కానీ ఇది ఒక ట్యుటోరియల్ కాబట్టి ప్రోగ్రామ్ మొదటిసారి సులభంగా అర్థం చేసుకోవడానికి ఆప్టిమైజ్ చేయబడింది, పనితీరు లేదా నిర్వహణ సౌలభ్యం కోసం కాదు.

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

మనం ఈ లైబ్రరీ ఫంక్షన్‌లను ఉపయోగిస్తాము. మళ్ళీ, అవి ఉపయోగించే చోట క్రింద వివరించబడ్డాయి.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` లైబ్రరీ](https://abitype.dev/) [`AddressType`](https://abitype.dev/config#addresstype) వంటి వివిధ Ethereum డేటా రకాల కోసం TypeScript నిర్వచనాలను అందిస్తుంది.

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` కాంట్రాక్ట్ కోసం ABI. మీరు కాంట్రాక్టులను మరియు UIని ఒకే సమయంలో అభివృద్ధి చేస్తుంటే, సాధారణంగా వాటిని ఒకే రిపోజిటరీలో ఉంచి Solidity కంపైలర్ రూపొందించిన ABIని మీ అప్లికేషన్‌లో ఫైల్‌గా ఉపయోగిస్తారు. అయితే, కాంట్రాక్ట్ ఇప్పటికే అభివృద్ధి చేయబడింది మరియు మారదు కాబట్టి ఇక్కడ ఇది అవసరం లేదు.

TypeScriptకు ఇది _నిజమైన_ స్థిరాంకం అని చెప్పడానికి మనం [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)ను ఉపయోగిస్తాము. సాధారణంగా, జావాస్క్రిప్ట్‌లో `const x = {"a": 1}` అని పేర్కొన్నప్పుడు, మీరు `x`లోని విలువను మార్చవచ్చు, మీరు దానికి అసైన్ చేయలేరు మాత్రమే.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript బలంగా టైప్ చేయబడింది. వేర్వేరు చైన్‌లలో `Greeter` కాంట్రాక్ట్ డిప్లాయ్ చేయబడిన అడ్రసును పేర్కొనడానికి మనం ఈ నిర్వచనాన్ని ఉపయోగిస్తాము. కీ ఒక సంఖ్య (chainId), మరియు విలువ ఒక `AddressType` (అడ్రసు).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) లో కాంట్రాక్ట్ అడ్రసు.

##### `Timer` కాంపోనెంట్ {#timer-component}

`Timer` కాంపోనెంట్ ఇచ్చిన సమయం నుండి సెకన్ల సంఖ్యను చూపిస్తుంది. వినియోగ ప్రయోజనాల కోసం ఇది ముఖ్యమైనది. వినియోగదారులు ఏదైనా చేసినప్పుడు, వారు తక్షణ స్పందనను ఆశిస్తారు. బ్లాక్‌చైన్‌లలో, లావాదేవీ ఒక బ్లాక్‌లో ఉంచబడే వరకు ఏమీ జరగదు కాబట్టి ఇది తరచుగా అసాధ్యం. వినియోగదారుడు చర్య చేసి ఎంత సమయం అయిందో చూపించడం ఒక పరిష్కారం, తద్వారా అవసరమైన సమయం సహేతుకమా కాదా అని వినియోగదారుడు నిర్ణయించగలరు.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` కాంపోనెంట్ ఒక పరామితిని తీసుకుంటుంది, `lastUpdate`, ఇది చివరి చర్య సమయం.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

కాంపోనెంట్ సరిగ్గా పనిచేయడానికి మనకు స్టేట్ (కాంపోనెంట్‌తో ముడిపడిన వేరియబుల్) అవసరం మరియు దానిని అప్‌డేట్ చేయాలి. కానీ మనం దానిని చదవాల్సిన అవసరం ఎన్నడూ లేదు, కాబట్టి వేరియబుల్ కోసం ఇబ్బంది పడవద్దు.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) ఫంక్షన్ ఒక ఫంక్షన్‌ను ఆవర్తనంగా అమలు చేయడానికి షెడ్యూల్ చేయడానికి అనుమతిస్తుంది. ఈ సందర్భంలో, ప్రతి సెకను. ఫంక్షన్ స్టేట్‌ను అప్‌డేట్ చేయడానికి `setNow`ను కాల్ చేస్తుంది, కాబట్టి `Timer` కాంపోనెంట్ రీ-రెండర్ చేయబడుతుంది. ఇది ఒక్కసారి మాత్రమే జరిగేలా ఖాళీ డిపెండెన్సీ జాబితాతో [`useEffect`](https://react.dev/reference/react/useEffect) లోపల దీనిని చుట్టాము.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

చివరి అప్‌డేట్ నుండి సెకన్ల సంఖ్యను లెక్కించి తిరిగి ఇవ్వండి.

##### `Greeter` కాంపోనెంట్ {#greeter-component}

```tsx
const Greeter = () => {
```

చివరగా, మనం కాంపోనెంట్‌ను నిర్వచించగలుగుతున్నాము.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

[wagmi](https://wagmi.sh/) సౌజన్యంతో, మనం ఉపయోగిస్తున్న చైన్ మరియు ఖాతా గురించి సమాచారం. ఇది హుక్ (`use...`) కాబట్టి, ఈ సమాచారం మారినప్పుడు కాంపోనెంట్ రీ-రెండర్ చేయబడుతుంది.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId]
```

Greeter కాంట్రాక్ట్ అడ్రసు, మనకు చైన్ సమాచారం లేకపోతే లేదా ఆ కాంట్రాక్ట్ లేని చైన్‌లో ఉంటే `undefined` అవుతుంది.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // No arguments
  })
```

[`useReadContract` హుక్](https://wagmi.sh/react/api/hooks/useReadContract) [కాంట్రాక్ట్](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) యొక్క `greet` ఫంక్షన్‌ను కాల్ చేస్తుంది.

```tsx
  const [ currentGreeting, setCurrentGreeting ] =
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React యొక్క [`useState` హుక్](https://www.w3schools.com/react/react_usestate.asp) ఒక స్టేట్ వేరియబుల్‌ను పేర్కొనడానికి అనుమతిస్తుంది, దీని విలువ కాంపోనెంట్ యొక్క ఒక రెండరింగ్ నుండి మరొకదానికి కొనసాగుతుంది. ప్రారంభ విలువ పరామితి, ఈ సందర్భంలో ఖాళీ స్ట్రింగ్.

`useState` హుక్ రెండు విలువలతో జాబితాను తిరిగి ఇస్తుంది:

1. స్టేట్ వేరియబుల్ యొక్క ప్రస్తుత విలువ.
2. అవసరమైనప్పుడు స్టేట్ వేరియబుల్‌ను సవరించడానికి ఫంక్షన్. ఇది హుక్ కాబట్టి, ఇది కాల్ చేసిన ప్రతిసారీ కాంపోనెంట్ మళ్లీ రెండర్ చేయబడుతుంది.

ఈ సందర్భంలో, వినియోగదారుడు సెట్ చేయాలనుకునే కొత్త గ్రీటింగ్ కోసం మనం స్టేట్ వేరియబుల్‌ను ఉపయోగిస్తున్నాము.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

బహుళ వినియోగదారులు ఒకే సమయంలో ఒకే కాంట్రాక్ట్‌ను ఉపయోగిస్తుంటే, వారు ఒకరి గ్రీటింగ్‌లను మరొకరు ఓవర్‌రైట్ చేయవచ్చు. ఇది వినియోగదారులకు అప్లికేషన్ సరిగ్గా పనిచేయడం లేదని అనిపించేలా చేస్తుంది. గ్రీటింగ్‌ను చివరిగా ఎవరు సెట్ చేశారో అప్లికేషన్ చూపిస్తే, వినియోగదారుడికి అది ఎవరో ఇతరులు చేశారని తెలుస్తుంది.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

వినియోగదారులు తమ చర్యలకు తక్షణ ప్రభావం చూడాలనుకుంటారు. అయితే, బ్లాక్‌చైన్‌లో ఇది అలా జరగదు. ఈ స్టేట్ వేరియబుల్‌లు వినియోగదారులకు వారి చర్య ప్రగతిలో ఉందని తెలియజేయడానికి కనీసం ఏదైనా ప్రదర్శించడానికి అనుమతిస్తాయి.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

పైన ఉన్న `readResults` డేటాను మారిస్తే మరియు అది తప్పుడు విలువకు (`undefined`, ఉదాహరణకు) సెట్ చేయబడకపోతే, ప్రస్తుత గ్రీటింగ్‌ను బ్లాక్‌చైన్ నుండి చదివిన దానికి అప్‌డేట్ చేయండి. అలాగే, స్థితిని అప్‌డేట్ చేయండి.

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

`!!<value>` అంటే విలువ `false` అయితే, లేదా `undefined`, `0`, లేదా ఖాళీ స్ట్రింగ్ వంటి తప్పుగా మూల్యాంకనం చేయబడే విలువ అయితే, మొత్తం ఎక్స్‌ప్రెషన్ `false`. ఏ ఇతర విలువకైనా, ఇది `true`. విలువలను బూలియన్‌లుగా మార్చడానికి ఇది ఒక మార్గం, ఎందుకంటే `greeterAddr` లేకపోతే, మనం ఈవెంట్‌లను వినాలనుకోము.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

మనం లాగ్‌లను చూసినప్పుడు (ఇది కొత్త ఈవెంట్‌ను చూసినప్పుడు జరుగుతుంది), గ్రీటింగ్ సవరించబడిందని అర్థం. ఆ సందర్భంలో, `currentGreeting` మరియు `lastSetterAddress`ను కొత్త విలువలకు అప్‌డేట్ చేయవచ్చు. అలాగే, స్థితి ప్రదర్శనను అప్‌డేట్ చేయాలనుకుంటున్నాము.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

మనం స్థితిని అప్‌డేట్ చేసినప్పుడు రెండు పనులు చేయాలనుకుంటున్నాము:

1. స్థితి స్ట్రింగ్‌ను (`status`) అప్‌డేట్ చేయడం
2. చివరి స్థితి అప్‌డేట్ సమయాన్ని (`statusTime`) ఇప్పుడుకు అప్‌డేట్ చేయడం.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

కొత్త గ్రీటింగ్ ఇన్‌పుట్ ఫీల్డ్‌లో మార్పులకు ఈవెంట్ హ్యాండ్లర్. ఈ ఫంక్షన్ ఒక్కసారి మాత్రమే కాల్ చేయబడుతుంది కాబట్టి `evt` పరామితి రకాన్ని పేర్కొనడం అవసరం లేదని నేను భావిస్తున్నాను.

```tsx
  const { writeContractAsync } = useWriteContract()
```

కాంట్రాక్ట్‌కు వ్రాయడానికి ఫంక్షన్. ఇది [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)కు సమానం, కానీ మెరుగైన స్థితి అప్‌డేట్‌లను అనుమతిస్తుంది.

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
3. ప్రతిస్పందన అందినప్పుడు, వాలెట్ ద్వారా లావాదేవీపై సంతకం చేయమని వినియోగదారుడిని అడగండి. వినియోగదారుడికి సంతకం చేయడానికి ముందు లావాదేవీ యొక్క గ్యాస్ ఖర్చు చూపించబడుతుంది కాబట్టి ఈ దశ _తప్పనిసరిగా_ నోడ్ ప్రతిస్పందన అందిన తర్వాత జరగాలి.
4. వినియోగదారుడు ఆమోదించడానికి వేచి ఉండండి.
5. ఈసారి [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) ఉపయోగించి లావాదేవీని మళ్లీ పంపండి.

దశ 2 గుర్తించగల సమయం తీసుకునే అవకాశం ఉంది, ఈ సమయంలో వినియోగదారులు తమ ఆదేశం యూజర్ ఇంటర్‌ఫేస్ ద్వారా అందుకోబడిందా మరియు లావాదేవీపై సంతకం చేయమని ఎందుకు అడగడం లేదో ఆశ్చర్యపోవచ్చు. ఇది పేలవమైన వినియోగదారు అనుభవాన్ని (UX) సృష్టిస్తుంది.

ఒక పరిష్కారం ఏమిటంటే పరామితి మారిన ప్రతిసారీ `eth_estimateGas`ను పంపడం. అప్పుడు, వినియోగదారుడు వాస్తవంగా లావాదేవీని పంపాలనుకున్నప్పుడు (ఈ సందర్భంలో **Update greeting** నొక్కడం ద్వారా), గ్యాస్ ఖర్చు ఇప్పటికే తెలుసు, మరియు వినియోగదారుడు వెంటనే వాలెట్ పేజీని చూడగలరు.

```tsx
  return (
```

ఇప్పుడు మనం తిరిగి ఇవ్వడానికి వాస్తవ HTMLను సృష్టించవచ్చు.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

ప్రస్తుత గ్రీటింగ్‌ను చూపించండి.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

గ్రీటింగ్‌ను చివరిగా ఎవరు సెట్ చేశారో మనకు తెలిస్తే, ఆ సమాచారాన్ని ప్రదర్శించండి. `Greeter` ఈ సమాచారాన్ని ట్రాక్ చేయదు, మరియు `SetGreeting` ఈవెంట్‌లను వెనక్కి చూడాలనుకోము, కాబట్టి మనం నడుస్తున్నప్పుడు గ్రీటింగ్ మారిన తర్వాత మాత్రమే దానిని పొందుతాము.

```tsx
      <hr />
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
      <br />
```

ఇది వినియోగదారుడు కొత్త గ్రీటింగ్‌ను సెట్ చేయగల ఇన్‌పుట్ టెక్స్ట్ ఫీల్డ్. వినియోగదారుడు ఒక కీని నొక్కిన ప్రతిసారీ, మనం `greetingChange`ను కాల్ చేస్తాము, ఇది `setNewGreeting`ను కాల్ చేస్తుంది. `setNewGreeting` `useState` నుండి వచ్చినది కాబట్టి, ఇది `Greeter` కాంపోనెంట్‌ను రీ-రెండర్ చేస్తుంది. దీని అర్థం:

- కొత్త గ్రీటింగ్ విలువను ఉంచడానికి మనం `value`ను పేర్కొనాలి, లేకపోతే అది డిఫాల్ట్ ఖాళీ స్ట్రింగ్‌కు తిరిగి వెళ్ళిపోతుంది.
- `newGreeting` మారిన ప్రతిసారీ `simulation` కూడా అప్‌డేట్ చేయబడుతుంది, అంటే సరైన గ్రీటింగ్‌తో సిమ్యులేషన్ మనకు వస్తుంది.

```tsx
      <button disabled={!simulation.data}
```

లావాదేవీని పంపడానికి అవసరమైన సమాచారం మనకు వచ్చిన తర్వాత మాత్రమే బటన్‌ను ఎనేబుల్ చేయండి.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

స్థితిని అప్‌డేట్ చేయండి. ఈ సమయంలో, వినియోగదారుడు వాలెట్‌లో నిర్ధారించాలి.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` లావాదేవీ వాస్తవంగా పంపబడిన తర్వాత మాత్రమే తిరిగి వస్తుంది. ఇది బ్లాక్‌చైన్‌లో చేర్చబడటానికి లావాదేవీ ఎంతసేపు వేచి ఉందో వినియోగదారుడికి చూపించడానికి అనుమతిస్తుంది.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

స్థితిని మరియు చివరిగా అప్‌డేట్ చేసి ఎంత సమయం అయిందో చూపించండి.

```
export {Greeter}
```

కాంపోనెంట్‌ను ఎగుమతి చేయండి.

#### `src/wagmi.ts` {#wagmi-ts}

చివరగా, wagmiకి సంబంధించిన వివిధ నిర్వచనాలు `src/wagmi.ts`లో ఉన్నాయి. ఇక్కడ నేను ప్రతిదీ వివరించబోవడం లేదు, ఎందుకంటే చాలా వరకు మీరు మార్చవలసిన అవసరం లేని బాయిలర్‌ప్లేట్.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

wagmi కాన్ఫిగరేషన్‌లో ఈ అప్లికేషన్ మద్దతు ఇచ్చే చైన్‌లు ఉంటాయి. మీరు [అందుబాటులో ఉన్న చైన్‌ల జాబితా](https://wagmi.sh/core/api/chains)ను చూడవచ్చు.

```ts
  connectors: [
    injected(),
  ],
```

[ఈ కనెక్టర్](https://wagmi.sh/core/api/connectors/injected) బ్రౌజర్‌లో ఇన్‌స్టాల్ చేసిన వాలెట్‌తో మాట్లాడటానికి అనుమతిస్తుంది.

```ts
  transports: {
    [sepolia.id]: http()
```

viemతో వచ్చే డిఫాల్ట్ HTTP ఎండ్‌పాయింట్ సరిపోతుంది. మీకు వేరే URL కావాలంటే, `http("https:// hostname ")` లేదా `webSocket("wss:// hostname ")` ఉపయోగించవచ్చు.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## మరొక బ్లాక్‌చైన్‌ను జోడించడం {#add-blockchain}

ఈ రోజుల్లో చాలా [L2 స్కేలింగ్ సొల్యూషన్స్](https://ethereum.org/layer-2/) ఉన్నాయి, మరియు viem ఇంకా మద్దతు ఇవ్వని కొన్నింటికి మీరు మద్దతు ఇవ్వాలనుకోవచ్చు. అది చేయడానికి, మీరు `src/wagmi.ts`ను సవరించండి. ఈ సూచనలు [Optimism Sepolia](https://chainlist.org/chain/11155420)ని ఎలా జోడించాలో వివరిస్తాయి.

1.  `src/wagmi.ts`ను సవరించండి

    A. viem నుండి `defineChain` రకాన్ని దిగుమతి చేయండి.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. నెట్‌వర్క్ నిర్వచనాన్ని జోడించండి. Optimism Sepolia కోసం మీరు దీనిని చేయవలసిన అవసరం లేదు, [ఇది ఇప్పటికే `viem`లో ఉంది](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), కానీ ఈ విధంగా `viem`లో లేని బ్లాక్‌చైన్‌ను ఎలా జోడించాలో మీరు నేర్చుకుంటారు.

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

2.  ఆటోమేటిక్‌గా Sepoliaకు మారడాన్ని కామెంట్ అవుట్ చేయడానికి `src/App.tsx`ను సవరించండి. ఒక ఉత్పత్తి వ్యవస్థలో, మీరు బహుశా మీరు మద్దతు ఇచ్చే ప్రతి బ్లాక్‌చైన్‌కు లింకులతో బటన్‌లను చూపిస్తారు.

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

3.  కొత్త నెట్‌వర్క్‌లో మీ కాంట్రాక్టుల కోసం చిరునామా అప్లికేషన్‌కు తెలుసని నిర్ధారించడానికి `src/Greeter.tsx`ను సవరించండి.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  మీ బ్రౌజర్‌లో.

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true)కు బ్రౌజ్ చేసి, మీ వాలెట్‌కు చైన్‌ను జోడించడానికి టేబుల్ కుడి వైపు ఉన్న బటన్‌లలో ఒకదాన్ని క్లిక్ చేయండి.

    B. అప్లికేషన్‌లో, **Disconnect** చేసి, బ్లాక్‌చైన్‌ను మార్చడానికి మళ్లీ కనెక్ట్ అవ్వండి. దీన్ని నిర్వహించడానికి మెరుగైన మార్గాలు ఉన్నాయి, కానీ అవి అప్లికేషన్ మార్పులు అవసరం.

## ముగింపు {#conclusion}

అయితే, మీరు నిజంగా `Greeter` కోసం యూజర్ ఇంటర్‌ఫేస్ అందించడం గురించి పట్టించుకోరు. మీరు మీ స్వంత కాంట్రాక్టుల కోసం యూజర్ ఇంటర్‌ఫేస్‌ను సృష్టించాలనుకుంటున్నారు. మీ స్వంత అప్లికేషన్‌ను సృష్టించడానికి, ఈ దశలను అమలు చేయండి:

1. wagmi అప్లికేషన్‌ను సృష్టించమని పేర్కొనండి.

   ```sh copy
   npm create wagmi
   ```

2. కొనసాగడానికి `y` టైప్ చేయండి.

3. అప్లికేషన్‌కు పేరు పెట్టండి.

4. **React** ఫ్రేమ్‌వర్క్‌ను ఎంచుకోండి.

5. **Vite** వేరియంట్‌ను ఎంచుకోండి.

ఇప్పుడు వెళ్ళి మీ కాంట్రాక్టులను విస్తృత ప్రపంచానికి ఉపయోగపడేలా చేయండి.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
