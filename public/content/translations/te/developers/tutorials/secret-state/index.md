---
title: రహస్య స్థితి కోసం శూన్య-జ్ఞానాన్ని ఉపయోగించడం
description: ఆన్‌చైన్ గేమ్‌లు పరిమితమైనవి ఎందుకంటే అవి ఎలాంటి దాచిన సమాచారాన్ని ఉంచలేవు. ఈ ట్యుటోరియల్ చదివిన తర్వాత, పాఠకులు శూన్య-జ్ఞాన నిరూపణలు మరియు సర్వర్ కాంపోనెంట్‌లను కలిపి రహస్య స్థితి, ఆఫ్‌చైన్, కాంపోనెంట్‌తో ధృవీకరించదగిన గేమ్‌లను సృష్టించగలరు. మైన్స్‌వీపర్ గేమ్‌ను సృష్టించడం ద్వారా దీన్ని చేయడానికి సాంకేతికత ప్రదర్శించబడుతుంది.
author: ఓరి పోమెరాంట్జ్
tags:
  - సర్వర్
  - ఆఫ్‌చైన్
  - కేంద్రీకృత
  - శూన్య-జ్ఞాన
  - Zokrates
  - MUD
  - గోప్యత
skill: advanced
breadcrumb: ZK రహస్య స్థితి
lang: te
published: 2025-03-15
---

_బ్లాక్‌చైన్‌లో ఎలాంటి రహస్యాలు ఉండవు_. బ్లాక్‌చైన్‌లో పోస్ట్ చేయబడిన ప్రతిదీ ఎవరైనా చదవడానికి బహిరంగంగా ఉంటుంది. ఇది అవసరం, ఎందుకంటే బ్లాక్‌చైన్ ఎవరైనా దానిని ధృవీకరించగలగడంపై ఆధారపడి ఉంటుంది. అయినప్పటికీ, గేమ్‌లు తరచుగా రహస్య స్థితిపై ఆధారపడతాయి. ఉదాహరణకు, మీరు కేవలం బ్లాక్ ఎక్స్‌ప్లోరర్‌కి వెళ్లి మ్యాప్‌ను చూడగలిగితే [మైన్స్‌వీపర్](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) గేమ్‌కు ఎలాంటి అర్థం ఉండదు.

రహస్య స్థితిని ఉంచడానికి [సర్వర్ కాంపోనెంట్‌ను](/developers/tutorials/server-components/) ఉపయోగించడం సరళమైన పరిష్కారం. అయినప్పటికీ, గేమ్ డెవలపర్ మోసం చేయకుండా నిరోధించడానికే మనం బ్లాక్‌చైన్‌ను ఉపయోగిస్తాము. మనం సర్వర్ కాంపోనెంట్ యొక్క నిజాయితీని నిర్ధారించుకోవాలి. సర్వర్ స్థితి యొక్క హాష్‌ను అందించగలదు మరియు కదలిక యొక్క ఫలితాన్ని లెక్కించడానికి ఉపయోగించిన స్థితి సరైనదేనని నిరూపించడానికి [శూన్య-జ్ఞాన నిరూపణలను](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) ఉపయోగించవచ్చు.

ఈ కథనాన్ని చదివిన తర్వాత, ఈ రకమైన రహస్య స్థితిని కలిగి ఉన్న సర్వర్‌ను, స్థితిని చూపించడానికి ఒక క్లయింట్‌ను మరియు ఆ రెండింటి మధ్య కమ్యూనికేషన్ కోసం ఆన్‌చైన్ కాంపోనెంట్‌ను ఎలా సృష్టించాలో మీకు తెలుస్తుంది. మనం ఉపయోగించే ప్రధాన సాధనాలు ఇవి:

| సాధనం                                          | ప్రయోజనం                                                 | ధృవీకరించబడిన వెర్షన్ |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | శూన్య-జ్ఞాన నిరూపణలు మరియు వాటి ధృవీకరణ            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | సర్వర్ మరియు క్లయింట్ రెండింటికీ ప్రోగ్రామింగ్ భాష |               5.4.2 |
| [Node](https://nodejs.org/en)                 | సర్వర్‌ను రన్ చేయడం                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | బ్లాక్‌చైన్‌తో కమ్యూనికేషన్                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | ఆన్‌చైన్ డేటా నిర్వహణ                                 |              2.0.12 |
| [React](https://react.dev/)                   | క్లయింట్ యూజర్ ఇంటర్‌ఫేస్                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | క్లయింట్ కోడ్‌ను అందించడం                                 |               4.2.1 |

## మైన్‌స్వీపర్ ఉదాహరణ {#minesweeper}

[మైన్‌స్వీపర్](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) అనేది మైన్‌ఫీల్డ్‌తో కూడిన రహస్య మ్యాప్‌ను కలిగి ఉండే గేమ్. ఆటగాడు ఒక నిర్దిష్ట ప్రదేశంలో తవ్వడానికి ఎంచుకుంటాడు. ఆ ప్రదేశంలో మైన్ ఉంటే, ఆట ముగుస్తుంది. లేకపోతే, ఆ ప్రదేశం చుట్టూ ఉన్న ఎనిమిది చతురస్రాల్లో ఎన్ని మైన్‌లు ఉన్నాయో ఆటగాడికి తెలుస్తుంది.

ఈ అప్లికేషన్ [MUD](https://mud.dev/) ఉపయోగించి వ్రాయబడింది, ఇది [కీ-వాల్యూ డేటాబేస్](https://aws.amazon.com/nosql/key-value/) ఉపయోగించి ఆన్‌చైన్‌లో డేటాను నిల్వ చేయడానికి మరియు ఆఫ్‌చైన్ కాంపోనెంట్‌లతో ఆ డేటాను స్వయంచాలకంగా సమకాలీకరించడానికి అనుమతించే ఫ్రేమ్‌వర్క్. సమకాలీకరణతో పాటు, యాక్సెస్ నియంత్రణను అందించడాన్ని మరియు ఇతర వినియోగదారులు మన అప్లికేషన్‌ను అనుమతిలేకుండా [విస్తరించడాన్ని](https://mud.dev/guides/extending-a-world) MUD సులభతరం చేస్తుంది.

### మైన్‌స్వీపర్ ఉదాహరణను రన్ చేయడం {#running-minesweeper-example}

మైన్‌స్వీపర్ ఉదాహరణను రన్ చేయడానికి:

1. మీరు [ముందస్తు అవసరాలను ఇన్‌స్టాల్ చేసుకున్నారని](https://mud.dev/quickstart#prerequisites) నిర్ధారించుకోండి: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), మరియు [`mprocs`](https://github.com/pvolok/mprocs).

2. రిపోజిటరీని క్లోన్ చేయండి.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. ప్యాకేజీలను ఇన్‌స్టాల్ చేయండి.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   ఒకవేళ Foundry అనేది `pnpm install` లో భాగంగా ఇన్‌స్టాల్ చేయబడితే, మీరు కమాండ్-లైన్ షెల్‌ను పునఃప్రారంభించాలి.

4. కాంట్రాక్ట్‌లను కంపైల్ చేయండి

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. ప్రోగ్రామ్‌ను ప్రారంభించి (ఒక [anvil](https://book.getfoundry.sh/anvil/) బ్లాక్‌చైన్‌తో సహా) వేచి ఉండండి.

   ```sh copy
   mprocs
   ```

   స్టార్టప్ అవ్వడానికి చాలా సమయం పడుతుందని గమనించండి. పురోగతిని చూడటానికి, ముందుగా డిప్లాయ్ చేయబడుతున్న MUD కాంట్రాక్ట్‌లను చూడటానికి _contracts_ ట్యాబ్‌కు స్క్రోల్ చేయడానికి డౌన్ బాణాన్ని ఉపయోగించండి. మీకు _Waiting for file changes…_ అనే సందేశం వచ్చినప్పుడు, కాంట్రాక్ట్‌లు డిప్లాయ్ చేయబడతాయి మరియు తదుపరి పురోగతి _server_ ట్యాబ్‌లో జరుగుతుంది. అక్కడ, మీకు _Verifier address: 0x...._ అనే సందేశం వచ్చే వరకు వేచి ఉండండి.

   ఈ దశ విజయవంతమైతే, మీరు ఎడమవైపున విభిన్న ప్రక్రియలతో మరియు కుడివైపున ప్రస్తుతం ఎంచుకున్న ప్రక్రియ కోసం కన్సోల్ అవుట్‌పుట్‌తో `mprocs` స్క్రీన్‌ను చూస్తారు.

   ![The mprocs screen](./mprocs.png)

   `mprocs` తో ఏదైనా సమస్య ఉంటే, మీరు నాలుగు ప్రక్రియలను మాన్యువల్‌గా రన్ చేయవచ్చు, ఒక్కొక్కటి దాని స్వంత కమాండ్ లైన్ విండోలో:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. ఇప్పుడు మీరు [క్లయింట్‌](http://localhost:3000)కు బ్రౌజ్ చేయవచ్చు, **New Game** పై క్లిక్ చేసి, ఆడటం ప్రారంభించవచ్చు.

### పట్టికలు {#tables}

మనకు ఆన్‌చైన్‌లో [అనేక పట్టికలు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) అవసరం.

- `Configuration`: ఈ పట్టిక ఒక సింగిల్‌టన్, దీనికి కీ లేదు మరియు ఒకే రికార్డ్ ఉంటుంది. ఇది గేమ్ కాన్ఫిగరేషన్ సమాచారాన్ని ఉంచడానికి ఉపయోగించబడుతుంది:
  - `height`: మైన్‌ఫీల్డ్ యొక్క ఎత్తు
  - `width`: మైన్‌ఫీల్డ్ యొక్క వెడల్పు
  - `numberOfBombs`: ప్రతి మైన్‌ఫీల్డ్‌లోని బాంబుల సంఖ్య
- `VerifierAddress`: ఈ పట్టిక కూడా ఒక సింగిల్‌టన్. ఇది కాన్ఫిగరేషన్‌లో ఒక భాగాన్ని, ధృవీకర్త కాంట్రాక్ట్ యొక్క చిరునామాను (`verifier`) ఉంచడానికి ఉపయోగించబడుతుంది. మనం ఈ సమాచారాన్ని `Configuration` పట్టికలో ఉంచవచ్చు, కానీ ఇది వేరొక కాంపోనెంట్ అయిన సర్వర్ ద్వారా సెట్ చేయబడుతుంది, కాబట్టి దీనిని ప్రత్యేక పట్టికలో ఉంచడం సులభం.

- `PlayerGame`: కీ అనేది ఆటగాడి చిరునామా. డేటా ఏమిటంటే:

  - `gameId`: ఆటగాడు ఆడుతున్న మ్యాప్ యొక్క హాష్ అయిన 32-బైట్ విలువ (గేమ్ ఐడెంటిఫైయర్).
  - `win`: ఆటగాడు గేమ్‌ను గెలిచాడా లేదా అని తెలిపే బూలియన్.
  - `lose`: ఆటగాడు గేమ్‌ను ఓడిపోయాడా లేదా అని తెలిపే బూలియన్.
  - `digNumber`: గేమ్‌లో విజయవంతమైన త్రవ్వకాల సంఖ్య.

- `GamePlayer`: ఈ పట్టిక `gameId` నుండి ఆటగాడి చిరునామాకు రివర్స్ మ్యాపింగ్‌ను కలిగి ఉంటుంది.

- `Map`: కీ అనేది మూడు విలువల టపుల్:

  - `gameId`: ఆటగాడు ఆడుతున్న మ్యాప్ యొక్క హాష్ అయిన 32-బైట్ విలువ (గేమ్ ఐడెంటిఫైయర్).
  - `x` కోఆర్డినేట్
  - `y` కోఆర్డినేట్

  విలువ ఒకే సంఖ్య. బాంబు కనుగొనబడితే అది 255 అవుతుంది. లేకపోతే, అది ఆ ప్రదేశం చుట్టూ ఉన్న బాంబుల సంఖ్య ప్లస్ ఒకటి. మనం కేవలం బాంబుల సంఖ్యను ఉపయోగించలేము, ఎందుకంటే డిఫాల్ట్‌గా EVM లోని మొత్తం నిల్వ మరియు MUD లోని అన్ని అడ్డు వరుసల విలువలు సున్నా. "ఆటగాడు ఇంకా ఇక్కడ తవ్వలేదు" మరియు "ఆటగాడు ఇక్కడ తవ్వాడు, మరియు చుట్టూ సున్నా బాంబులు ఉన్నాయని కనుగొన్నాడు" అనే వాటి మధ్య మనం తేడాను గుర్తించాలి.

అదనంగా, క్లయింట్ మరియు సర్వర్ మధ్య కమ్యూనికేషన్ ఆన్‌చైన్ కాంపోనెంట్ ద్వారా జరుగుతుంది. ఇది కూడా పట్టికలను ఉపయోగించి అమలు చేయబడుతుంది.

- `PendingGame`: కొత్త గేమ్‌ను ప్రారంభించడానికి సేవ చేయని అభ్యర్థనలు.
- `PendingDig`: ఒక నిర్దిష్ట గేమ్‌లో నిర్దిష్ట ప్రదేశంలో తవ్వడానికి సేవ చేయని అభ్యర్థనలు. ఇది ఒక [ఆఫ్‌చైన్ పట్టిక](https://mud.dev/store/tables#types-of-tables), అంటే ఇది EVM నిల్వకు వ్రాయబడదు, ఇది ఈవెంట్‌లను ఉపయోగించి ఆఫ్‌చైన్‌లో మాత్రమే చదవబడుతుంది.

### ఎగ్జిక్యూషన్ మరియు డేటా ఫ్లోలు {#execution-data-flows}

ఈ ఫ్లోలు క్లయింట్, ఆన్‌చైన్ కాంపోనెంట్ మరియు సర్వర్ మధ్య ఎగ్జిక్యూషన్‌ను సమన్వయం చేస్తాయి.

#### ఇనిషియలైజేషన్ {#initialization-flow}

మీరు `mprocs` ను రన్ చేసినప్పుడు, ఈ దశలు జరుగుతాయి:

1. [`mprocs`](https://github.com/pvolok/mprocs) నాలుగు కాంపోనెంట్‌లను రన్ చేస్తుంది:

   - [Anvil](https://book.getfoundry.sh/anvil/), ఇది స్థానిక బ్లాక్‌చైన్‌ను రన్ చేస్తుంది
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), ఇది MUD కోసం కాంట్రాక్ట్‌లను కంపైల్ చేస్తుంది (అవసరమైతే) మరియు డిప్లాయ్ చేస్తుంది
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), ఇది వెబ్ బ్రౌజర్‌లకు UI మరియు క్లయింట్ కోడ్‌ను అందించడానికి [Vite](https://vitejs.dev/) ను రన్ చేస్తుంది.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), ఇది సర్వర్ చర్యలను నిర్వహిస్తుంది

2. `contracts` ప్యాకేజీ MUD కాంట్రాక్ట్‌లను డిప్లాయ్ చేస్తుంది మరియు ఆపై [`PostDeploy.s.sol` స్క్రిప్ట్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) రన్ చేస్తుంది. ఈ స్క్రిప్ట్ కాన్ఫిగరేషన్‌ను సెట్ చేస్తుంది. github నుండి వచ్చిన కోడ్ [ఎనిమిది మైన్‌లతో కూడిన 10x5 మైన్‌ఫీల్డ్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) నిర్దేశిస్తుంది.

3. [సర్వర్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD ని సెటప్ చేయడం](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) ద్వారా ప్రారంభమవుతుంది. ఇతర విషయాలతోపాటు, ఇది డేటా సమకాలీకరణను సక్రియం చేస్తుంది, తద్వారా సంబంధిత పట్టికల కాపీ సర్వర్ మెమరీలో ఉంటుంది.

4. [`Configuration` పట్టిక మారినప్పుడు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) అమలు చేయడానికి సర్వర్ ఒక ఫంక్షన్‌ను సబ్‌స్క్రైబ్ చేస్తుంది. `PostDeploy.s.sol` అమలు చేయబడి, పట్టికను సవరించిన తర్వాత [ఈ ఫంక్షన్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) కాల్ చేయబడుతుంది.

5. సర్వర్ ఇనిషియలైజేషన్ ఫంక్షన్ కాన్ఫిగరేషన్‌ను కలిగి ఉన్నప్పుడు, [సర్వర్ యొక్క శూన్య-జ్ఞాన భాగాన్ని](#using-zokrates-from-typescript) ప్రారంభించడానికి [ఇది `zkFunctions` ని కాల్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35). మనకు కాన్ఫిగరేషన్ లభించే వరకు ఇది జరగదు ఎందుకంటే శూన్య-జ్ఞాన ఫంక్షన్‌లు మైన్‌ఫీల్డ్ యొక్క వెడల్పు మరియు ఎత్తును స్థిరాంకాలుగా కలిగి ఉండాలి.

6. సర్వర్ యొక్క శూన్య-జ్ఞాన భాగం ప్రారంభించబడిన తర్వాత, తదుపరి దశ [శూన్య-జ్ఞాన ధృవీకరణ కాంట్రాక్ట్‌ను బ్లాక్‌చైన్‌కు డిప్లాయ్ చేయడం](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) మరియు MUD లో ధృవీకరించబడే చిరునామాను సెట్ చేయడం.

7. చివరగా, మేము అప్‌డేట్‌లకు సబ్‌స్క్రైబ్ చేస్తాము, తద్వారా ఆటగాడు [కొత్త గేమ్‌ను ప్రారంభించమని](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) లేదా [ఇప్పటికే ఉన్న గేమ్‌లో తవ్వమని](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) అభ్యర్థించినప్పుడు మేము చూస్తాము.

#### కొత్త గేమ్ {#new-game-flow}

ఆటగాడు కొత్త గేమ్‌ను అభ్యర్థించినప్పుడు ఇది జరుగుతుంది.

1. ఈ ఆటగాడి కోసం ఏ గేమ్ పురోగతిలో లేకుంటే, లేదా ఒకటి ఉండి దాని gameId సున్నా అయితే, క్లయింట్ [కొత్త గేమ్ బటన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) ప్రదర్శిస్తుంది. వినియోగదారు ఈ బటన్‌ను నొక్కినప్పుడు, [React `newGame` ఫంక్షన్‌ను రన్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) అనేది ఒక `System` కాల్. MUD లో అన్ని కాల్‌లు `World` కాంట్రాక్ట్ ద్వారా మళ్లించబడతాయి మరియు చాలా సందర్భాలలో మీరు `<namespace>__<function name>` ని కాల్ చేస్తారు. ఈ సందర్భంలో, కాల్ `app__newGame` కి చేయబడుతుంది, దీనిని MUD ఆపై [`GameSystem` లోని `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) కి మళ్లిస్తుంది.

3. ఆటగాడికి పురోగతిలో ఉన్న గేమ్ లేదని ఆన్‌చైన్ ఫంక్షన్ తనిఖీ చేస్తుంది మరియు ఏదీ లేకపోతే [అభ్యర్థనను `PendingGame` పట్టికకు జోడిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. సర్వర్ `PendingGame` లో మార్పును గుర్తిస్తుంది మరియు [సబ్‌స్క్రైబ్ చేసిన ఫంక్షన్‌ను రన్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). ఈ ఫంక్షన్ [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) ని కాల్ చేస్తుంది, ఇది క్రమంగా [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) ని కాల్ చేస్తుంది.

5. `createGame` చేసే మొదటి పని [తగిన సంఖ్యలో మైన్‌లతో యాదృచ్ఛిక మ్యాప్‌ను సృష్టించడం](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). ఆపై, ఇది ఖాళీ సరిహద్దులతో మ్యాప్‌ను సృష్టించడానికి [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ని కాల్ చేస్తుంది, ఇది Zokrates కి అవసరం. చివరగా, మ్యాప్ యొక్క హాష్‌ను పొందడానికి `createGame` [`calculateMapHash`](#calculatemaphash) ని కాల్ చేస్తుంది, ఇది గేమ్ ID గా ఉపయోగించబడుతుంది.

6. `newGame` ఫంక్షన్ కొత్త గేమ్‌ను `gamesInProgress` కి జోడిస్తుంది.

7. సర్వర్ చేసే చివరి పని ఆన్‌చైన్‌లో ఉన్న [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) ని కాల్ చేయడం. యాక్సెస్ నియంత్రణను ప్రారంభించడానికి ఈ ఫంక్షన్ వేరొక `System` అయిన [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) లో ఉంది. యాక్సెస్ నియంత్రణ [MUD కాన్ఫిగరేషన్ ఫైల్](https://mud.dev/config) అయిన [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) లో నిర్వచించబడింది.

   యాక్సెస్ జాబితా ఒకే చిరునామాను మాత్రమే `System` ని కాల్ చేయడానికి అనుమతిస్తుంది. ఇది సర్వర్ ఫంక్షన్‌లకు యాక్సెస్‌ను ఒకే చిరునామాకు పరిమితం చేస్తుంది, కాబట్టి ఎవరూ సర్వర్‌గా నటించలేరు.

8. ఆన్‌చైన్ కాంపోనెంట్ సంబంధిత పట్టికలను అప్‌డేట్ చేస్తుంది:

   - `PlayerGame` లో గేమ్‌ను సృష్టించండి.
   - `GamePlayer` లో రివర్స్ మ్యాపింగ్‌ను సెట్ చేయండి.
   - `PendingGame` నుండి అభ్యర్థనను తీసివేయండి.

9. సర్వర్ `PendingGame` లో మార్పును గుర్తిస్తుంది, కానీ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) తప్పు (false) కాబట్టి ఏమీ చేయదు.

10. క్లయింట్‌లో [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) అనేది ఆటగాడి చిరునామా కోసం `PlayerGame` ఎంట్రీకి సెట్ చేయబడింది. `PlayerGame` మారినప్పుడు, `gameRecord` కూడా మారుతుంది.

11. `gameRecord` లో విలువ ఉంటే, మరియు గేమ్ గెలవకపోయినా లేదా ఓడిపోకపోయినా, క్లయింట్ [మ్యాప్‌ను ప్రదర్శిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### త్రవ్వడం {#dig-flow}

1. ఆటగాడు [మ్యాప్ సెల్ యొక్క బటన్‌ను క్లిక్ చేస్తాడు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), ఇది [`dig` ఫంక్షన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) కాల్ చేస్తుంది. ఈ ఫంక్షన్ [ఆన్‌చైన్‌లో `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) ని కాల్ చేస్తుంది.

2. ఆన్‌చైన్ కాంపోనెంట్ [అనేక శానిటీ తనిఖీలను నిర్వహిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), మరియు విజయవంతమైతే త్రవ్వకాల అభ్యర్థనను [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) కి జోడిస్తుంది.

3. సర్వర్ [`PendingDig` లో మార్పును గుర్తిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [ఇది చెల్లుబాటు అయ్యేది అయితే](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), ఫలితాన్ని మరియు అది చెల్లుబాటు అయ్యేదని నిరూపణను రెండింటినీ రూపొందించడానికి ఇది [శూన్య-జ్ఞాన కోడ్‌ను కాల్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (క్రింద వివరించబడింది).

4. [సర్వర్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ఆన్‌చైన్‌లో [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ని కాల్ చేస్తుంది.

5. `digResponse` రెండు పనులు చేస్తుంది. ముందుగా, ఇది [శూన్య జ్ఞాన నిరూపణను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) తనిఖీ చేస్తుంది. ఆపై, నిరూపణ సరిగ్గా ఉంటే, ఫలితాన్ని వాస్తవంగా ప్రాసెస్ చేయడానికి ఇది [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ని కాల్ చేస్తుంది.

6. `processDigResult` గేమ్ [ఓడిపోయిందా](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) లేదా [గెలిచిందా](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) అని తనిఖీ చేస్తుంది మరియు [ఆన్‌చైన్ మ్యాప్ అయిన `Map` ని అప్‌డేట్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. క్లయింట్ అప్‌డేట్‌లను స్వయంచాలకంగా తీసుకుంటుంది మరియు [ఆటగాడికి ప్రదర్శించబడే మ్యాప్‌ను అప్‌డేట్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), మరియు వర్తిస్తే అది గెలుపా లేదా ఓటమా అని ఆటగాడికి చెబుతుంది.

## Zokrates ఉపయోగించడం {#using-zokrates}

పైన వివరించిన ఫ్లోలలో, మేము శూన్య-జ్ఞాన భాగాలను ఒక బ్లాక్ బాక్స్‌గా పరిగణించి వాటిని దాటవేశాము. ఇప్పుడు దాన్ని తెరిచి, ఆ కోడ్ ఎలా వ్రాయబడిందో చూద్దాం.

### మ్యాప్‌ను హాషింగ్ చేయడం {#hashing-map}

మేము ఉపయోగించే Zokrates హాష్ ఫంక్షన్ అయిన [Poseidon](https://www.poseidon-hash.info)ను అమలు చేయడానికి [ఈ JavaScript కోడ్](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)ను ఉపయోగించవచ్చు. అయితే, ఇది వేగంగా ఉన్నప్పటికీ, దీన్ని చేయడానికి కేవలం Zokrates హాష్ ఫంక్షన్‌ను ఉపయోగించడం కంటే ఇది మరింత సంక్లిష్టంగా ఉంటుంది. ఇది ఒక ట్యుటోరియల్, కాబట్టి కోడ్ పనితీరు కోసం కాకుండా సరళత కోసం ఆప్టిమైజ్ చేయబడింది. అందువల్ల, మాకు రెండు వేర్వేరు Zokrates ప్రోగ్రామ్‌లు అవసరం, ఒకటి కేవలం మ్యాప్ యొక్క హాష్‌ను లెక్కించడానికి (`hash`) మరియు మరొకటి మ్యాప్‌లోని ఒక ప్రదేశంలో తవ్వకం ఫలితం యొక్క శూన్య-జ్ఞాన నిరూపణను వాస్తవంగా సృష్టించడానికి (`dig`).

### హాష్ ఫంక్షన్ {#hash-function}

ఇది మ్యాప్ యొక్క హాష్‌ను లెక్కించే ఫంక్షన్. మేము ఈ కోడ్‌ను లైన్ బై లైన్ పరిశీలిస్తాము.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

ఈ రెండు లైన్లు [Zokrates స్టాండర్డ్ లైబ్రరీ](https://zokrates.github.io/toolbox/stdlib.html) నుండి రెండు ఫంక్షన్‌లను దిగుమతి చేస్తాయి. [మొదటి ఫంక్షన్](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ఒక [Poseidon హాష్](https://www.poseidon-hash.info/). ఇది [`field` మూలకాల](https://zokrates.github.io/language/types.html#field) శ్రేణిని తీసుకుంటుంది మరియు `field`ను అందిస్తుంది.

Zokratesలోని ఫీల్డ్ మూలకం సాధారణంగా 256 బిట్‌ల కంటే తక్కువ పొడవు ఉంటుంది, కానీ మరీ అంత తక్కువ కాదు. కోడ్‌ను సులభతరం చేయడానికి, మేము మ్యాప్‌ను 512 బిట్‌ల వరకు పరిమితం చేస్తాము మరియు నాలుగు ఫీల్డ్‌ల శ్రేణిని హాష్ చేస్తాము, మరియు ప్రతి ఫీల్డ్‌లో మేము కేవలం 128 బిట్‌లను మాత్రమే ఉపయోగిస్తాము. [`pack128` ఫంక్షన్](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) ఈ ప్రయోజనం కోసం 128 బిట్‌ల శ్రేణిని `field`గా మారుస్తుంది.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

ఈ లైన్ ఫంక్షన్ నిర్వచనాన్ని ప్రారంభిస్తుంది. `hashMap` అనేది `map` అనే ఒకే పరామితిని పొందుతుంది, ఇది ద్విమితీయ `bool`(ean) శ్రేణి. [క్రింద వివరించిన](#why-map-border) కారణాల వల్ల మ్యాప్ పరిమాణం `width+2` బై `height+2`గా ఉంటుంది.

Zokrates ప్రోగ్రామ్‌లు ఈ అప్లికేషన్‌లో [టెంప్లేట్ స్ట్రింగ్‌లు](https://www.w3schools.com/js/js_string_templates.asp)గా నిల్వ చేయబడినందున మేము `${width+2}` మరియు `${height+2}`లను ఉపయోగించవచ్చు. `${` మరియు `}` మధ్య ఉన్న కోడ్ JavaScript ద్వారా మూల్యాంకనం చేయబడుతుంది మరియు ఈ విధంగా ప్రోగ్రామ్‌ను వివిధ మ్యాప్ పరిమాణాల కోసం ఉపయోగించవచ్చు. మ్యాప్ పరామితి చుట్టూ ఎటువంటి బాంబులు లేకుండా ఒక లొకేషన్ వెడల్పు గల సరిహద్దును కలిగి ఉంటుంది, అందుకే మేము వెడల్పు మరియు ఎత్తుకు రెండు జోడించాల్సి ఉంటుంది.

తిరిగి ఇచ్చే విలువ హాష్‌ను కలిగి ఉన్న `field`.

```
bool[512] mut map1d = [false; 512];
```

మ్యాప్ ద్విమితీయమైనది. అయితే, `pack128` ఫంక్షన్ ద్విమితీయ శ్రేణులతో పనిచేయదు. కాబట్టి మేము ముందుగా `map1d`ని ఉపయోగించి మ్యాప్‌ను 512-బైట్ శ్రేణిగా చదును చేస్తాము. అప్రమేయంగా Zokrates వేరియబుల్స్ స్థిరాంకాలు, కానీ మేము లూప్‌లో ఈ శ్రేణికి విలువలను కేటాయించాలి, కాబట్టి మేము దానిని [`mut`](https://zokrates.github.io/language/variables.html#mutability)గా నిర్వచిస్తాము.

Zokratesలో `undefined` లేనందున మేము శ్రేణిని ప్రారంభించాలి. `[false; 512]` ఎక్స్‌ప్రెషన్ అంటే [512 `false` విలువల శ్రేణి](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

మేము ఇప్పటికే `map1d`లో నింపిన బిట్‌లు మరియు నింపని వాటి మధ్య తేడాను గుర్తించడానికి మాకు కౌంటర్ కూడా అవసరం.

```
for u32 x in 0..${width+2} {
```

Zokratesలో [`for` లూప్](https://zokrates.github.io/language/control_flow.html#for-loops)ను మీరు ఈ విధంగా ప్రకటిస్తారు. Zokrates `for` లూప్ స్థిరమైన సరిహద్దులను కలిగి ఉండాలి, ఎందుకంటే ఇది లూప్‌లా కనిపించినప్పటికీ, కంపైలర్ వాస్తవానికి దానిని "అన్‌రోల్" చేస్తుంది. `${width+2}` ఎక్స్‌ప్రెషన్ అనేది కంపైల్ టైమ్ స్థిరాంకం ఎందుకంటే కంపైలర్‌ను కాల్ చేయడానికి ముందు TypeScript కోడ్ ద్వారా `width` సెట్ చేయబడుతుంది.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

మ్యాప్‌లోని ప్రతి లొకేషన్ కోసం, ఆ విలువను `map1d` శ్రేణిలో ఉంచండి మరియు కౌంటర్‌ను పెంచండి.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` నుండి నాలుగు `field` విలువల శ్రేణిని సృష్టించడానికి `pack128` ఉపయోగించబడుతుంది. Zokratesలో `array[a..b]` అంటే `a` వద్ద ప్రారంభమై `b-1` వద్ద ముగిసే శ్రేణి యొక్క స్లైస్.

```
return poseidon(hashMe);
}
```

ఈ శ్రేణిని హాష్‌గా మార్చడానికి `poseidon`ని ఉపయోగించండి.

### హాష్ ప్రోగ్రామ్ {#hash-program}

గేమ్ ఐడెంటిఫైయర్‌లను సృష్టించడానికి సర్వర్ నేరుగా `hashMap`ని కాల్ చేయాలి. అయితే, Zokrates ప్రారంభించడానికి ప్రోగ్రామ్‌లోని `main` ఫంక్షన్‌ను మాత్రమే కాల్ చేయగలదు, కాబట్టి మేము హాష్ ఫంక్షన్‌ను కాల్ చేసే `main`తో ఒక ప్రోగ్రామ్‌ను సృష్టిస్తాము.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### తవ్వకం ప్రోగ్రామ్ {#dig-program}

ఇది అప్లికేషన్ యొక్క శూన్య-జ్ఞాన భాగం యొక్క గుండెకాయ, ఇక్కడే మేము తవ్వకం ఫలితాలను ధృవీకరించడానికి ఉపయోగించే నిరూపణలను ఉత్పత్తి చేస్తాము.

```
${hashFragment}

// (x,y) స్థానంలో ఉన్న మైన్‌ల సంఖ్య
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### మ్యాప్ సరిహద్దు ఎందుకు {#why-map-border}

శూన్య-జ్ఞాన నిరూపణలు [అంకగణిత సర్క్యూట్‌లను](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) ఉపయోగిస్తాయి, ఇవి `if` స్టేట్‌మెంట్‌కు సులభమైన సమానమైనదాన్ని కలిగి ఉండవు. బదులుగా, అవి [షరతులతో కూడిన ఆపరేటర్](https://en.wikipedia.org/wiki/Ternary_conditional_operator)కు సమానమైనదాన్ని ఉపయోగిస్తాయి. `a` సున్నా లేదా ఒకటి కాగలిగితే, మీరు `if a { b } else { c }`ని `ab+(1-a)c`గా లెక్కించవచ్చు.

దీని కారణంగా, Zokrates `if` స్టేట్‌మెంట్ ఎల్లప్పుడూ రెండు శాఖలను మూల్యాంకనం చేస్తుంది. ఉదాహరణకు, మీకు ఈ కోడ్ ఉంటే:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

ఇది ఎర్రర్‌ను ఇస్తుంది, ఎందుకంటే ఆ విలువ తర్వాత సున్నాతో గుణించబడినప్పటికీ, ఇది `arr[10]`ని లెక్కించాల్సి ఉంటుంది.

మ్యాప్ చుట్టూ ఒక లొకేషన్ వెడల్పు గల సరిహద్దు మాకు అవసరం కావడానికి ఇదే కారణం. మేము ఒక లొకేషన్ చుట్టూ ఉన్న మొత్తం గనుల సంఖ్యను లెక్కించాలి, అంటే మేము తవ్వుతున్న లొకేషన్‌కు పైన మరియు క్రింద ఒక అడ్డు వరుస, ఎడమ మరియు కుడి వైపున ఉన్న లొకేషన్‌ను చూడాలి. అంటే Zokratesకు అందించబడిన మ్యాప్ శ్రేణిలో ఆ లొకేషన్‌లు ఉనికిలో ఉండాలి.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

అప్రమేయంగా Zokrates నిరూపణలు వాటి ఇన్‌పుట్‌లను కలిగి ఉంటాయి. అది ఏ ప్రదేశమో మీకు వాస్తవంగా తెలిస్తే తప్ప ఒక ప్రదేశం చుట్టూ ఐదు గనులు ఉన్నాయని తెలుసుకోవడం వల్ల ఎలాంటి ప్రయోజనం ఉండదు (మరియు మీరు దాన్ని మీ అభ్యర్థనకు సరిపోల్చలేరు, ఎందుకంటే అప్పుడు ప్రూవర్ వేర్వేరు విలువలను ఉపయోగించవచ్చు మరియు దాని గురించి మీకు చెప్పకపోవచ్చు). అయితే, మేము మ్యాప్‌ను Zokratesకు అందిస్తున్నప్పుడు, దానిని రహస్యంగా ఉంచాలి. దీనికి పరిష్కారం `private` పరామితిని ఉపయోగించడం, ఇది నిరూపణ ద్వారా వెల్లడి _కానిది_.

ఇది దుర్వినియోగానికి మరో మార్గాన్ని తెరుస్తుంది. ప్రూవర్ సరైన కోఆర్డినేట్‌లను ఉపయోగించవచ్చు, కానీ లొకేషన్ చుట్టూ మరియు బహుశా లొకేషన్ వద్దనే ఎన్ని గనులతోనైనా మ్యాప్‌ను సృష్టించవచ్చు. ఈ దుర్వినియోగాన్ని నిరోధించడానికి, మేము శూన్య-జ్ఞాన నిరూపణలో గేమ్ ఐడెంటిఫైయర్ అయిన మ్యాప్ యొక్క హాష్‌ను చేర్చుతాము.

```
return (hashMap(map),
```

ఇక్కడ తిరిగి ఇచ్చే విలువ మ్యాప్ హాష్ శ్రేణితో పాటు తవ్వకం ఫలితాన్ని కలిగి ఉన్న టపుల్.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

లొకేషన్‌లోనే బాంబు ఉన్నట్లయితే మేము 255ని ప్రత్యేక విలువగా ఉపయోగిస్తాము.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

ఆటగాడు గనిని తాకకపోతే, లొకేషన్ చుట్టూ ఉన్న ప్రాంతం కోసం గనుల సంఖ్యలను జోడించి, దాన్ని తిరిగి ఇవ్వండి.

### TypeScript నుండి Zokrates ఉపయోగించడం {#using-zokrates-from-typescript}

Zokrates కమాండ్ లైన్ ఇంటర్‌ఫేస్‌ను కలిగి ఉంది, కానీ ఈ ప్రోగ్రామ్‌లో మేము దానిని [TypeScript కోడ్](https://zokrates.github.io/toolbox/zokrates_js.html)లో ఉపయోగిస్తాము.

Zokrates నిర్వచనాలను కలిగి ఉన్న లైబ్రరీని [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) అని పిలుస్తారు.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript బైండింగ్‌లను](https://zokrates.github.io/toolbox/zokrates_js.html) దిగుమతి చేయండి. మాకు కేవలం [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) ఫంక్షన్ మాత్రమే అవసరం ఎందుకంటే ఇది అన్ని Zokrates నిర్వచనాలకు పరిష్కరించే ప్రామిస్‌ను అందిస్తుంది.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates మాదిరిగానే, మేము కూడా ఒకే ఫంక్షన్‌ను ఎగుమతి చేస్తాము, ఇది కూడా [అసమకాలికమైనది (asynchronous)](https://www.w3schools.com/js/js_async.asp). ఇది చివరికి తిరిగి వచ్చినప్పుడు, మనం క్రింద చూసే విధంగా ఇది అనేక ఫంక్షన్‌లను అందిస్తుంది.

```typescript
const zokrates = await zokratesInitialize()
```

Zokratesను ప్రారంభించండి, లైబ్రరీ నుండి మాకు అవసరమైన ప్రతిదాన్ని పొందండి.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

తరువాత మనం పైన చూసిన హాష్ ఫంక్షన్ మరియు రెండు Zokrates ప్రోగ్రామ్‌లను కలిగి ఉన్నాము.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

ఇక్కడ మేము ఆ ప్రోగ్రామ్‌లను కంపైల్ చేస్తాము.

```typescript
// శూన్య-జ్ఞాన ధృవీకరణ కోసం కీలను సృష్టించండి.
// ప్రొడక్షన్ సిస్టమ్‌లో మీరు సెటప్ సెర్మనీని ఉపయోగించాలనుకుంటారు.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

ప్రొడక్షన్ సిస్టమ్‌లో మేము మరింత సంక్లిష్టమైన [సెటప్ వేడుకను](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ఉపయోగించవచ్చు, కానీ ప్రదర్శన కోసం ఇది సరిపోతుంది. వినియోగదారులు ప్రూవర్ కీని తెలుసుకోవడం సమస్య కాదు - అవి నిజమైతే తప్ప వారు విషయాలను నిరూపించడానికి దానిని ఉపయోగించలేరు. మేము ఎంట్రోపీని (రెండవ పరామితి, `""`) పేర్కొన్నందున, ఫలితాలు ఎల్లప్పుడూ ఒకే విధంగా ఉంటాయి.

**గమనిక:** Zokrates ప్రోగ్రామ్‌ల కంపైలేషన్ మరియు కీ సృష్టి నెమ్మదిగా జరిగే ప్రక్రియలు. వాటిని ప్రతిసారీ పునరావృతం చేయవలసిన అవసరం లేదు, మ్యాప్ పరిమాణం మారినప్పుడు మాత్రమే చేయాలి. ప్రొడక్షన్ సిస్టమ్‌లో మీరు వాటిని ఒకసారి చేస్తారు, ఆపై అవుట్‌పుట్‌ను నిల్వ చేస్తారు. నేను ఇక్కడ అలా చేయకపోవడానికి ఏకైక కారణం సరళత కోసమే.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) ఫంక్షన్ వాస్తవానికి Zokrates ప్రోగ్రామ్‌ను రన్ చేస్తుంది. ఇది రెండు ఫీల్డ్‌లతో కూడిన నిర్మాణాన్ని అందిస్తుంది: `output`, ఇది JSON స్ట్రింగ్‌గా ప్రోగ్రామ్ యొక్క అవుట్‌పుట్, మరియు `witness`, ఇది ఫలితం యొక్క శూన్య-జ్ఞాన నిరూపణను సృష్టించడానికి అవసరమైన సమాచారం. ఇక్కడ మాకు కేవలం అవుట్‌పుట్ మాత్రమే అవసరం.

అవుట్‌పుట్ అనేది `"31337"` రూపంలో ఉన్న స్ట్రింగ్, ఇది కొటేషన్ మార్కులలో జతచేయబడిన దశాంశ సంఖ్య. కానీ `viem` కోసం మాకు అవసరమైన అవుట్‌పుట్ `0x60A7` రూపంలో ఉన్న హెక్సాడెసిమల్ సంఖ్య. కాబట్టి మేము కొటేషన్ మార్కులను తీసివేయడానికి `.slice(1,-1)`ని ఉపయోగిస్తాము మరియు మిగిలిన స్ట్రింగ్‌ను, అంటే దశాంశ సంఖ్యను [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)కి రన్ చేయడానికి `BigInt`ని ఉపయోగిస్తాము. `.toString(16)` ఈ `BigInt`ని హెక్సాడెసిమల్ స్ట్రింగ్‌గా మారుస్తుంది మరియు `"0x"+` హెక్సాడెసిమల్ సంఖ్యల కోసం మార్కర్‌ను జోడిస్తుంది.

```typescript
// తవ్వి, ఫలితం యొక్క శూన్య-జ్ఞాన నిరూపణను తిరిగి ఇవ్వండి
// (సర్వర్-సైడ్ కోడ్)
```

శూన్య-జ్ఞాన నిరూపణలో పబ్లిక్ ఇన్‌పుట్‌లు (`x` మరియు `y`) మరియు ఫలితాలు (మ్యాప్ యొక్క హాష్ మరియు బాంబుల సంఖ్య) ఉంటాయి.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokratesలో సూచిక హద్దులు దాటి ఉందో లేదో తనిఖీ చేయడం ఒక సమస్య, కాబట్టి మేము దానిని ఇక్కడ చేస్తాము.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

తవ్వకం ప్రోగ్రామ్‌ను అమలు చేయండి.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy)ని ఉపయోగించండి మరియు నిరూపణను తిరిగి ఇవ్వండి.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ఒక Solidity ధృవీకర్త, ఇది మేము బ్లాక్‌చైన్‌కు డిప్లాయ్ చేయగల మరియు `digCompiled.program` ద్వారా రూపొందించబడిన నిరూపణలను ధృవీకరించడానికి ఉపయోగించగల స్మార్ట్ కాంట్రాక్ట్.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

చివరగా, ఇతర కోడ్‌కు అవసరమైన ప్రతిదాన్ని తిరిగి ఇవ్వండి.

## భద్రతా పరీక్షలు {#security-tests}

భద్రతా పరీక్షలు చాలా ముఖ్యమైనవి ఎందుకంటే ఫంక్షనాలిటీ బగ్ ఏదో ఒక సమయంలో బయటపడుతుంది. కానీ అప్లికేషన్ సురక్షితంగా లేకపోతే, ఎవరైనా మోసం చేసి ఇతరులకు చెందిన వనరులతో తప్పించుకునే వరకు అది చాలా కాలం పాటు దాగి ఉండే అవకాశం ఉంది.

### అనుమతులు {#permissions}

ఈ గేమ్‌లో ఒక ప్రత్యేక హక్కు కలిగిన ఎంటిటీ ఉంది, అదే సర్వర్. [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) లోని ఫంక్షన్‌లను కాల్ చేయడానికి అనుమతించబడిన ఏకైక వినియోగదారు ఇది మాత్రమే. అనుమతిగల ఫంక్షన్‌లకు కాల్‌లు సర్వర్ ఖాతాగా మాత్రమే అనుమతించబడతాయని ధృవీకరించడానికి మనం [`cast`](https://book.getfoundry.sh/cast/) ని ఉపయోగించవచ్చు.

[సర్వర్ యొక్క ప్రైవేట్ కీ `setupNetwork.ts` లో ఉంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil` (బ్లాక్‌చైన్) రన్ అయ్యే కంప్యూటర్‌లో, ఈ ఎన్విరాన్‌మెంట్ వేరియబుల్స్‌ను సెట్ చేయండి.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. ధృవీకర్త చిరునామాను అనధికారిక చిరునామాగా సెట్ చేయడానికి ప్రయత్నించడానికి `cast` ని ఉపయోగించండి.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` వైఫల్యాన్ని నివేదించడమే కాకుండా, మీరు బ్రౌజర్‌లోని గేమ్‌లో **MUD Dev Tools** ని తెరిచి, **Tables** పై క్లిక్ చేసి, **app\_\_VerifierAddress** ని ఎంచుకోవచ్చు. చిరునామా సున్నా కాదని చూడండి.

3. ధృవీకర్త చిరునామాను సర్వర్ చిరునామాగా సెట్ చేయండి.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** లోని చిరునామా ఇప్పుడు సున్నాగా ఉండాలి.

ఒకే `System` లోని అన్ని MUD ఫంక్షన్‌లు ఒకే యాక్సెస్ కంట్రోల్ ద్వారా వెళ్తాయి, కాబట్టి నేను ఈ పరీక్ష సరిపోతుందని భావిస్తున్నాను. మీకు అలా అనిపించకపోతే, మీరు [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) లోని ఇతర ఫంక్షన్‌లను తనిఖీ చేయవచ్చు.

### శూన్య-జ్ఞాన దుర్వినియోగాలు {#zero-knowledge-abuses}

Zokrates ని ధృవీకరించడానికి అవసరమైన గణితం ఈ ట్యుటోరియల్ పరిధికి (మరియు నా సామర్థ్యాలకు) మించినది. అయినప్పటికీ, శూన్య-జ్ఞాన కోడ్ సరిగ్గా చేయకపోతే అది విఫలమవుతుందని ధృవీకరించడానికి మనం దానిపై వివిధ తనిఖీలను అమలు చేయవచ్చు. ఈ పరీక్షలన్నింటికీ మనం [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) ని మార్చాలి మరియు మొత్తం అప్లికేషన్‌ను పునఃప్రారంభించాలి. సర్వర్ ప్రాసెస్‌ను పునఃప్రారంభించడం సరిపోదు, ఎందుకంటే ఇది అప్లికేషన్‌ను అసాధ్యమైన స్థితిలో ఉంచుతుంది (ఆటగాడికి గేమ్ ప్రోగ్రెస్‌లో ఉంటుంది, కానీ గేమ్ ఇకపై సర్వర్‌కు అందుబాటులో ఉండదు).

#### తప్పు సమాధానం {#wrong-answer}

శూన్య-జ్ఞాన నిరూపణలో తప్పు సమాధానం ఇవ్వడం అనేది అత్యంత సులభమైన అవకాశం. అలా చేయడానికి, మనం `zkDig` లోపలికి వెళ్లి [లైన్ 91 ని సవరించాలి](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

దీని అర్థం సరైన సమాధానంతో సంబంధం లేకుండా, ఒక బాంబు ఉందని మనం ఎల్లప్పుడూ క్లెయిమ్ చేస్తాము. ఈ వెర్షన్‌తో ఆడేందుకు ప్రయత్నించండి, మరియు మీరు `pnpm dev` స్క్రీన్ యొక్క **server** ట్యాబ్‌లో ఈ లోపాన్ని చూస్తారు:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

కాబట్టి ఈ రకమైన మోసం విఫలమవుతుంది.

#### తప్పు నిరూపణ {#wrong-proof}

మనం సరైన సమాచారాన్ని అందించి, తప్పు నిరూపణ డేటాను కలిగి ఉంటే ఏమి జరుగుతుంది? ఇప్పుడు, లైన్ 91 ని దీనితో భర్తీ చేయండి:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

ఇది ఇప్పటికీ విఫలమవుతుంది, కానీ ఇప్పుడు ఇది ఎటువంటి కారణం లేకుండా విఫలమవుతుంది ఎందుకంటే ఇది ధృవీకర్త కాల్ సమయంలో జరుగుతుంది.

### వినియోగదారు జీరో ట్రస్ట్ కోడ్‌ను ఎలా ధృవీకరించగలరు? {#user-verify-zero-trust}

స్మార్ట్ కాంట్రాక్ట్‌లను ధృవీకరించడం చాలా సులభం. సాధారణంగా, డెవలపర్ సోర్స్ కోడ్‌ను బ్లాక్ ఎక్స్‌ప్లోరర్‌కు ప్రచురిస్తారు, మరియు బ్లాక్ ఎక్స్‌ప్లోరర్ సోర్స్ కోడ్ [కాంట్రాక్ట్ డిప్లాయ్‌మెంట్ లావాదేవీ](/developers/docs/smart-contracts/deploying/) లోని కోడ్‌కు కంపైల్ అవుతుందని ధృవీకరిస్తుంది. MUD `System` ల విషయంలో ఇది [కొంచెం క్లిష్టంగా ఉంటుంది](https://mud.dev/cli/verify), కానీ మరీ అంత కాదు.

శూన్య-జ్ఞానంతో ఇది కష్టం. ధృవీకర్త కొన్ని స్థిరాంకాలను కలిగి ఉంటుంది మరియు వాటిపై కొన్ని లెక్కలను అమలు చేస్తుంది. ఏమి నిరూపించబడుతుందో ఇది మీకు చెప్పదు.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

దీనికి పరిష్కారం, కనీసం బ్లాక్ ఎక్స్‌ప్లోరర్‌లు తమ యూజర్ ఇంటర్‌ఫేస్‌లకు Zokrates ధృవీకరణను జోడించే వరకు, అప్లికేషన్ డెవలపర్‌లు Zokrates ప్రోగ్రామ్‌లను అందుబాటులో ఉంచడం మరియు కనీసం కొంతమంది వినియోగదారులు తగిన ధృవీకరణ కీతో వాటిని స్వయంగా కంపైల్ చేయడం.

అలా చేయడానికి:

1. [Zokrates ని ఇన్‌స్టాల్ చేయండి](https://zokrates.github.io/gettingstarted.html).
2. Zokrates ప్రోగ్రామ్‌తో `dig.zok` అనే ఫైల్‌ను సృష్టించండి. మీరు అసలు మ్యాప్ పరిమాణం 10x5 ని ఉంచారని దిగువ కోడ్ ఊహిస్తుంది.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // The number of mines in location (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokrates కోడ్‌ను కంపైల్ చేయండి మరియు ధృవీకరణ కీని సృష్టించండి. అసలు సర్వర్‌లో ఉపయోగించిన అదే ఎంట్రోపీతో ధృవీకరణ కీని సృష్టించాలి, [ఈ సందర్భంలో ఖాళీ స్ట్రింగ్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. మీ స్వంతంగా Solidity ధృవీకర్తను సృష్టించండి మరియు ఇది బ్లాక్‌చైన్‌లోని దానికి ఫంక్షనల్‌గా సమానంగా ఉందని ధృవీకరించండి (సర్వర్ ఒక వ్యాఖ్యను జోడిస్తుంది, కానీ అది ముఖ్యం కాదు).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## డిజైన్ నిర్ణయాలు {#design}

తగినంత సంక్లిష్టమైన ఏ అప్లికేషన్‌లోనైనా పోటీపడే డిజైన్ లక్ష్యాలు ఉంటాయి, వాటికి రాజీలు (trade-offs) అవసరం. కొన్ని రాజీలను మరియు ఇతర ఎంపికల కంటే ప్రస్తుత పరిష్కారం ఎందుకు ఉత్తమమైనదో చూద్దాం.

### శూన్య-జ్ఞాన ఎందుకు {#why-zero-knowledge}

మైన్‌స్వీపర్ కోసం మీకు నిజంగా శూన్య-జ్ఞాన అవసరం లేదు. సర్వర్ ఎల్లప్పుడూ మ్యాప్‌ను ఉంచుకోగలదు, ఆపై ఆట ముగిసినప్పుడు దానంతటినీ బహిర్గతం చేయవచ్చు. ఆపై, ఆట ముగింపులో, స్మార్ట్ కాంట్రాక్ట్ మ్యాప్ హాష్‌ను లెక్కించగలదు, అది సరిపోలుతుందో లేదో ధృవీకరించగలదు మరియు అది సరిపోలకపోతే సర్వర్‌కు జరిమానా విధించవచ్చు లేదా ఆటను పూర్తిగా విస్మరించవచ్చు.

నేను ఈ సరళమైన పరిష్కారాన్ని ఉపయోగించలేదు ఎందుకంటే ఇది స్పష్టంగా నిర్వచించబడిన ముగింపు స్థితి ఉన్న చిన్న ఆటలకు మాత్రమే పనిచేస్తుంది. ఒక ఆట అనంతంగా ఉండే అవకాశం ఉన్నప్పుడు ([స్వయంప్రతిపత్త ప్రపంచాల](https://0xparc.org/blog/autonomous-worlds) విషయంలో వలె), స్థితిని బహిర్గతం _చేయకుండా_ నిరూపించే పరిష్కారం మీకు అవసరం.

ఒక ట్యుటోరియల్‌గా ఈ కథనానికి అర్థం చేసుకోవడానికి సులభమైన చిన్న ఆట అవసరం, కానీ ఈ సాంకేతికత సుదీర్ఘ ఆటలకు అత్యంత ఉపయోగకరంగా ఉంటుంది.

### Zokrates ఎందుకు? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) మాత్రమే అందుబాటులో ఉన్న ఏకైక శూన్య-జ్ఞాన లైబ్రరీ కాదు, కానీ ఇది సాధారణ, [ఇంపెరేటివ్](https://en.wikipedia.org/wiki/Imperative_programming) ప్రోగ్రామింగ్ భాషను పోలి ఉంటుంది మరియు బూలియన్ వేరియబుల్స్‌కు మద్దతు ఇస్తుంది.

విభిన్న అవసరాలు ఉన్న మీ అప్లికేషన్ కోసం, మీరు [Circum](https://docs.circom.io/getting-started/installation/) లేదా [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ఉపయోగించడానికి ఇష్టపడవచ్చు.

### Zokratesను ఎప్పుడు కంపైల్ చేయాలి {#when-compile-zokrates}

ఈ ప్రోగ్రామ్‌లో మేము [సర్వర్ ప్రారంభమైన ప్రతిసారీ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates ప్రోగ్రామ్‌లను కంపైల్ చేస్తాము. ఇది స్పష్టంగా వనరుల వృధా, కానీ ఇది సరళత కోసం ఆప్టిమైజ్ చేయబడిన ట్యుటోరియల్.

నేను ప్రొడక్షన్-స్థాయి అప్లికేషన్‌ను వ్రాస్తున్నట్లయితే, ఈ మైన్‌ఫీల్డ్ పరిమాణంలో కంపైల్ చేయబడిన Zokrates ప్రోగ్రామ్‌లతో కూడిన ఫైల్ నా వద్ద ఉందో లేదో తనిఖీ చేస్తాను మరియు అలా ఉంటే దాన్ని ఉపయోగిస్తాను. ఆన్‌చైన్‌లో ధృవీకర్త కాంట్రాక్ట్‌ను డిప్లాయ్ చేయు విషయంలో కూడా ఇదే వర్తిస్తుంది.

### ధృవీకర్త మరియు ప్రూవర్ కీలను సృష్టించడం {#key-creation}

[కీ సృష్టి](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) అనేది ఇచ్చిన మైన్‌ఫీల్డ్ పరిమాణం కోసం ఒకసారి కంటే ఎక్కువ చేయవలసిన అవసరం లేని మరొక స్వచ్ఛమైన గణన. మళ్ళీ, ఇది సరళత కోసం ఒకసారి మాత్రమే చేయబడుతుంది.

అదనంగా, మనం [సెటప్ వేడుకను](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ఉపయోగించవచ్చు. సెటప్ వేడుక యొక్క ప్రయోజనం ఏమిటంటే, శూన్య-జ్ఞాన నిరూపణలో మోసం చేయడానికి మీకు ప్రతి పాల్గొనేవారి నుండి ఎంట్రోపీ లేదా కొంత మధ్యంతర ఫలితం అవసరం. కనీసం ఒక వేడుకలో పాల్గొనే వ్యక్తి నిజాయితీగా ఉండి, ఆ సమాచారాన్ని తొలగిస్తే, శూన్య-జ్ఞాన నిరూపణలు కొన్ని దాడుల నుండి సురక్షితంగా ఉంటాయి. అయితే, సమాచారం ప్రతిచోటా తొలగించబడిందని ధృవీకరించడానికి _ఎలాంటి యంత్రాంగం లేదు_. శూన్య-జ్ఞాన నిరూపణలు చాలా ముఖ్యమైనవి అయితే, మీరు సెటప్ వేడుకలో పాల్గొనాలి.

ఇక్కడ మేము డజన్ల కొద్దీ పాల్గొనేవారిని కలిగి ఉన్న [పెర్పెచువల్ పవర్స్ ఆఫ్ టౌ (perpetual powers of tau)](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) పై ఆధారపడతాము. ఇది బహుశా తగినంత సురక్షితమైనది మరియు చాలా సులభం. కీ సృష్టి సమయంలో మేము ఎంట్రోపీని కూడా జోడించము, ఇది వినియోగదారులు [శూన్య-జ్ఞాన కాన్ఫిగరేషన్‌ను ధృవీకరించడాన్ని](#user-verify-zero-trust) సులభతరం చేస్తుంది.

### ఎక్కడ ధృవీకరించాలి {#where-verification}

మనం శూన్య-జ్ఞాన నిరూపణలను ఆన్‌చైన్‌లో (దీనికి గ్యాస్ ఖర్చవుతుంది) లేదా క్లయింట్‌లో ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) ఉపయోగించి) ధృవీకరించవచ్చు. నేను మొదటిదాన్ని ఎంచుకున్నాను, ఎందుకంటే ఇది మిమ్మల్ని ఒకసారి [ధృవీకర్తను ధృవీకరించడానికి](#user-verify-zero-trust) అనుమతిస్తుంది మరియు దాని కాంట్రాక్ట్ చిరునామా అలాగే ఉన్నంత కాలం అది మారదని విశ్వసించడానికి అనుమతిస్తుంది. క్లయింట్‌లో ధృవీకరణ జరిగితే, మీరు క్లయింట్‌ను డౌన్‌లోడ్ చేసిన ప్రతిసారీ మీరు స్వీకరించే కోడ్‌ను ధృవీకరించాలి.

అలాగే, ఈ ఆట సింగిల్ ప్లేయర్ అయినప్పటికీ, చాలా బ్లాక్‌చైన్ ఆటలు మల్టీ-ప్లేయర్. ఆన్‌చైన్ ధృవీకరణ అంటే మీరు శూన్య-జ్ఞాన నిరూపణను ఒకసారి మాత్రమే ధృవీకరిస్తారు. క్లయింట్‌లో చేయడం వల్ల ప్రతి క్లయింట్ స్వతంత్రంగా ధృవీకరించాల్సి ఉంటుంది.

### మ్యాప్‌ను TypeScript లేదా Zokratesలో ఫ్లాటెన్ చేయాలా? {#where-flatten}

సాధారణంగా, ప్రాసెసింగ్ TypeScript లేదా Zokratesలో చేయగలిగినప్పుడు, దాన్ని TypeScriptలో చేయడం మంచిది, ఇది చాలా వేగంగా ఉంటుంది మరియు శూన్య-జ్ఞాన నిరూపణలు అవసరం లేదు. ఉదాహరణకు, మేము Zokratesకు హాష్‌ను అందించకపోవడానికి మరియు అది సరైనదో కాదో ధృవీకరించేలా చేయకపోవడానికి ఇదే కారణం. హాషింగ్ Zokrates లోపల చేయాలి, కానీ తిరిగి వచ్చిన హాష్ మరియు ఆన్‌చైన్‌లోని హాష్ మధ్య సరిపోలిక దాని వెలుపల జరగవచ్చు.

అయినప్పటికీ, మనం దాన్ని TypeScriptలో చేయగలిగినప్పటికీ, మనం ఇప్పటికీ [Zokratesలో మ్యాప్‌ను ఫ్లాటెన్ చేస్తాము](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20). కారణం ఏమిటంటే, నా అభిప్రాయం ప్రకారం ఇతర ఎంపికలు అధ్వాన్నంగా ఉన్నాయి.

- Zokrates కోడ్‌కు బూలియన్ యొక్క ఏక-పరిమాణ (one dimensional) శ్రేణిని అందించండి మరియు ద్వి-పరిమాణ (two dimensional) మ్యాప్‌ను పొందడానికి `x*(height+2)
+y` వంటి వ్యక్తీకరణను ఉపయోగించండి. ఇది [కోడ్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) కొంత క్లిష్టతరం చేస్తుంది, కాబట్టి ట్యుటోరియల్ కోసం పనితీరు లాభం విలువైనది కాదని నేను నిర్ణయించుకున్నాను.

- Zokratesకు ఏక-పరిమాణ శ్రేణి మరియు ద్వి-పరిమాణ శ్రేణి రెండింటినీ పంపండి. అయితే, ఈ పరిష్కారం మనకు ఎలాంటి ప్రయోజనాన్ని ఇవ్వదు. అందించబడిన ఏక-పరిమాణ శ్రేణి నిజంగా ద్వి-పరిమాణ శ్రేణికి సరైన ప్రాతినిధ్యం అని Zokrates కోడ్ ధృవీకరించాలి. కాబట్టి పనితీరులో ఎలాంటి లాభం ఉండదు.

- Zokratesలో ద్వి-పరిమాణ శ్రేణిని ఫ్లాటెన్ చేయండి. ఇది అత్యంత సరళమైన ఎంపిక, కాబట్టి నేను దీన్ని ఎంచుకున్నాను.

### మ్యాప్‌లను ఎక్కడ నిల్వ చేయాలి {#where-store-maps}

ఈ అప్లికేషన్‌లో [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) అనేది మెమరీలోని ఒక వేరియబుల్ మాత్రమే. దీని అర్థం మీ సర్వర్ ఆగిపోయి, పునఃప్రారంభించవలసి వస్తే, అది నిల్వ చేసిన మొత్తం సమాచారం పోతుంది. ఆటగాళ్ళు తమ ఆటను కొనసాగించలేకపోవడమే కాకుండా, ఆన్‌చైన్ కాంపోనెంట్ వారి ఆట ఇంకా పురోగతిలో ఉందని భావించడం వల్ల వారు కొత్త ఆటను కూడా ప్రారంభించలేరు.

ప్రొడక్షన్ సిస్టమ్ కోసం ఇది స్పష్టంగా చెడ్డ డిజైన్, దీనిలో మీరు ఈ సమాచారాన్ని డేటాబేస్‌లో నిల్వ చేస్తారు. నేను ఇక్కడ వేరియబుల్‌ను ఉపయోగించడానికి ఏకైక కారణం ఇది ఒక ట్యుటోరియల్ మరియు సరళత ప్రధాన పరిగణన.

## ముగింపు: ఏ పరిస్థితులలో ఇది సరైన సాంకేతికత? {#conclusion}

కాబట్టి, ఆన్‌చైన్‌కు చెందని రహస్య స్థితిని నిల్వ చేసే సర్వర్‌తో గేమ్‌ను ఎలా రాయాలో ఇప్పుడు మీకు తెలుసు. కానీ మీరు దీన్ని ఏ సందర్భాలలో చేయాలి? ఇక్కడ రెండు ప్రధాన అంశాలు ఉన్నాయి.

- _ఎక్కువ కాలం నడిచే గేమ్_: [పైన పేర్కొన్న విధంగా](#why-zero-knowledge), ఒక చిన్న గేమ్‌లో గేమ్ ముగిసిన తర్వాత మీరు స్థితిని ప్రచురించవచ్చు మరియు అప్పుడు ప్రతిదీ ధృవీకరించబడేలా చేయవచ్చు. కానీ గేమ్ ఎక్కువ లేదా నిరవధిక సమయం తీసుకున్నప్పుడు మరియు స్థితి రహస్యంగా ఉండాల్సిన అవసరం ఉన్నప్పుడు అది సాధ్యం కాదు.

- _కొంత కేంద్రీకరణ ఆమోదయోగ్యమైనది_: శూన్య-జ్ఞాన నిరూపణలు సమగ్రతను ధృవీకరించగలవు, అంటే ఒక ఎంటిటీ ఫలితాలను నకిలీ చేయడం లేదని నిర్ధారించగలవు. కానీ ఆ ఎంటిటీ అందుబాటులో ఉంటుందని మరియు సందేశాలకు సమాధానం ఇస్తుందని అవి నిర్ధారించలేవు. లభ్యత కూడా వికేంద్రీకృతం కావాల్సిన పరిస్థితులలో, శూన్య-జ్ఞాన నిరూపణలు తగిన పరిష్కారం కాదు, మరియు మీకు [మల్టీ-పార్టీ కంప్యూటేషన్](https://en.wikipedia.org/wiki/Secure_multi-party_computation) అవసరం.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

### కృతజ్ఞతలు {#acknowledgements}

- అల్వారో అలోన్సో ఈ వ్యాసం యొక్క ముసాయిదాను చదివారు మరియు Zokrates గురించి నాకున్న కొన్ని అపార్థాలను తొలగించారు.

మిగిలి ఉన్న ఏవైనా లోపాలకు నేనే బాధ్యుడిని.