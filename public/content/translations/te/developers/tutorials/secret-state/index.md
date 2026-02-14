---
title: "రహస్య స్థితి కోసం జీరో-కనౌలెడ్జిని ఉపయోగించడం"
description: "ఆన్‌చైన్ ఆటలు పరిమితంగా ఉంటాయి ఎందుకంటే అవి ఎలాంటి రహస్య సమాచారాన్ని ఉంచలేవు. ఈ ట్యుటోరియల్ చదివిన తర్వాత, ఒక రీడర్ రహస్య స్థితి, ఆఫ్‌చైన్, కాంపోనెంట్‌తో ధృవీకరించదగిన ఆటలను సృష్టించడానికి జీరో-కనౌలెడ్జి రుజువులు మరియు సర్వర్ కాంపోనెంట్‌లను కలపగలుగుతారు. ఇది చేయడానికి సాంకేతికత మైన్‌స్వీపర్ గేమ్ సృష్టించడం ద్వారా ప్రదర్శించబడుతుంది."
author: Ori Pomerantz
tags:
  [
    "సర్వర్",
    "ఆఫ్‌చైన్",
    "కేంద్రీకృతం",
    "జీరో-కనౌలెడ్జి",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: te
published: 2025-03-15
---

_బ్లాక్‌చెయిన్‌లో రహస్యాలు లేవు_. బ్లాక్‌చెయిన్‌లో పోస్ట్ చేయబడిన ప్రతిదీ అందరూ చదవడానికి తెరిచి ఉంటుంది. ఇది అవసరం, ఎందుకంటే బ్లాక్‌చెయిన్ ఎవరైనా ధృవీకరించగలిగే దానిపై ఆధారపడి ఉంటుంది. అయితే, ఆటలు తరచుగా రహస్య స్థితిపై ఆధారపడతాయి. ఉదాహరణకు, మీరు బ్లాక్‌చెయిన్ ఎక్స్‌ప్లోరర్‌కి వెళ్లి మ్యాప్‌ని చూడగలిగితే [మైన్‌స్వీపర్](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) గేమ్‌కి ఎటువంటి అర్థం ఉండదు.

రహస్య స్థితిని ఉంచడానికి [సర్వర్ కాంపోనెంట్‌ను](/developers/tutorials/server-components/) ఉపయోగించడం సులభమయిన పరిష్కారం. అయితే, గేమ్ డెవలపర్ చేత మోసాన్ని నివారించడానికి మేము బ్లాక్‌చెయిన్‌ను ఉపయోగిస్తాము. సర్వర్ కాంపోనెంట్ యొక్క నిజాయితీని మేము నిర్ధారించుకోవాలి. సర్వర్ స్థితి యొక్క హాష్‌ను అందిస్తుంది మరియు కదలిక ఫలితాన్ని లెక్కించడానికి ఉపయోగించే స్థితి సరైనదని రుజువు చేయడానికి [జీరో-కనౌలెడ్జి రుజువులను](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) ఉపయోగించవచ్చు.

ఈ ఆర్టికల్ చదివిన తర్వాత మీరు ఈ రకమైన రహస్య స్థితిని కలిగి ఉన్న సర్వర్‌ను, స్థితిని చూపించడానికి ఒక క్లయింట్‌ను మరియు రెండింటి మధ్య కమ్యూనికేషన్ కోసం ఆన్‌చైన్ కాంపోనెంట్‌ను ఎలా సృష్టించాలో తెలుసుకుంటారు. మేము ఉపయోగించే ప్రధాన సాధనాలు:

| సాధనం                                         | ఉద్దేశం                                            |              వెర్షన్‌లో ధృవీకరించబడింది |
| --------------------------------------------- | -------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | జీరో-కనౌలెడ్జి రుజువులు మరియు వాటి ధృవీకరణ         |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | సర్వర్ మరియు క్లయింట్ రెండింటికీ ప్రోగ్రామింగ్ భాష |   5.4.2 |
| [Node](https://nodejs.org/en)                 | సర్వర్‌ను నడుపుతోంది                               | 20.18.2 |
| [Viem](https://viem.sh/)                      | బ్లాక్‌చెయిన్‌తో కమ్యూనికేషన్                      |  2.9.20 |
| [MUD](https://mud.dev/)                       | ఆన్‌చైన్ డేటా నిర్వహణ                              |  2.0.12 |
| [React](https://react.dev/)                   | క్లయింట్ వినియోగదారు ఇంటర్‌ఫేస్                    |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | క్లయింట్ కోడ్‌ను అందిస్తోంది                       |   4.2.1 |

## మైన్‌స్వీపర్ ఉదాహరణ {#minesweeper}

[మైన్‌స్వీపర్](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) అనేది మైన్‌ఫీల్డ్‌తో కూడిన రహస్య మ్యాప్‌ను కలిగి ఉన్న గేమ్. ఆటగాడు ఒక నిర్దిష్ట ప్రదేశంలో తవ్వడానికి ఎంచుకుంటాడు. ఆ ప్రదేశంలో మైన్ ఉంటే, ఆట ముగిసింది. లేకపోతే, ఆ ప్రదేశం చుట్టూ ఉన్న ఎనిమిది చతురస్రాల్లోని మైన్‌ల సంఖ్యను ఆటగాడు పొందుతాడు.

ఈ అప్లికేషన్ [MUD](https://mud.dev/) ఉపయోగించి వ్రాయబడింది, ఇది [కీ-విలువ డేటాబేస్](https://aws.amazon.com/nosql/key-value/) ఉపయోగించి ఆన్‌చైన్‌లో డేటాను నిల్వ చేయడానికి మరియు ఆ డేటాను ఆఫ్‌చైన్ కాంపోనెంట్‌లతో స్వయంచాలకంగా సింక్రొనైజ్ చేయడానికి అనుమతిస్తుంది. సింక్రొనైజేషన్‌తో పాటు, యాక్సెస్ నియంత్రణను అందించడానికి మరియు ఇతర వినియోగదారులు మా అప్లికేషన్‌ను అనుమతి లేకుండా [విస్తరించడానికి](https://mud.dev/guides/extending-a-world) MUD సులభం చేస్తుంది.

### మైన్‌స్వీపర్ ఉదాహరణను నడుపుతోంది {#running-minesweeper-example}

మైన్‌స్వీపర్ ఉదాహరణను నడపడానికి:

1. మీరు [ముందస్తు అవసరాలను ఇన్‌స్టాల్ చేశారని](https://mud.dev/quickstart#prerequisites) నిర్ధారించుకోండి: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), మరియు [`mprocs`](https://github.com/pvolok/mprocs).

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

   `pnpm install`లో భాగంగా ఫౌండ్రీ ఇన్‌స్టాల్ చేయబడితే, మీరు కమాండ్-లైన్ షెల్‌ను పునఃప్రారంభించాలి.

4. ఒప్పందాలను కంపైల్ చేయండి

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. ప్రోగ్రామ్‌ను ప్రారంభించి ([యాన్విల్](https://book.getfoundry.sh/anvil/) బ్లాక్‌చెయిన్‌తో సహా) వేచి ఉండండి.

   ```sh copy
   mprocs
   ```

   స్టార్టప్ చాలా సమయం పడుతుందని గమనించండి. పురోగతిని చూడటానికి, ముందుగా MUD ఒప్పందాలు అమలు చేయబడుతున్నట్లు చూడటానికి _contracts_ ట్యాబ్‌కు స్క్రోల్ చేయడానికి డౌన్ బాణం ఉపయోగించండి. మీరు _Waiting for file changes…_ సందేశాన్ని పొందినప్పుడు, ఒప్పందాలు అమలు చేయబడతాయి మరియు తదుపరి పురోగతి _server_ ట్యాబ్‌లో జరుగుతుంది. అక్కడ, మీరు _Verifier address: 0x...._ సందేశాన్ని పొందే వరకు వేచి ఉండండి.

   ఈ దశ విజయవంతమైతే, మీరు `mprocs` స్క్రీన్‌ను చూస్తారు, ఎడమవైపున వివిధ ప్రక్రియలు మరియు కుడివైపున ప్రస్తుతం ఎంచుకున్న ప్రక్రియ కోసం కన్సోల్ అవుట్‌పుట్ ఉంటుంది.

   ![mprocs స్క్రీన్](./mprocs.png)

   `mprocs`తో సమస్య ఉంటే, మీరు నాలుగు ప్రక్రియలను మాన్యువల్‌గా అమలు చేయవచ్చు, ప్రతి ఒక్కటి దాని స్వంత కమాండ్ లైన్ విండోలో:

   - **యాన్విల్**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **ఒప్పందాలు**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **సర్వర్**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **క్లయింట్**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. ఇప్పుడు మీరు [క్లయింట్‌కి](http://localhost:3000) బ్రౌజ్ చేయవచ్చు, **కొత్త గేమ్** క్లిక్ చేసి, ఆడటం ప్రారంభించవచ్చు.

### పట్టికలు {#tables}

మాకు ఆన్‌చైన్‌లో [అనేక పట్టికలు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) అవసరం.

- `Configuration`: ఈ పట్టిక ఒక సింగిల్టన్, దీనికి కీ మరియు ఒకే రికార్డ్ లేదు. ఇది గేమ్ కాన్ఫిగరేషన్ సమాచారాన్ని ఉంచడానికి ఉపయోగించబడుతుంది:
  - `height`: ఒక మైన్‌ఫీల్డ్ ఎత్తు
  - `width`: ఒక మైన్‌ఫీల్డ్ వెడల్పు
  - `numberOfBombs`: ప్రతి మైన్‌ఫీల్డ్‌లోని బాంబుల సంఖ్య

- `VerifierAddress`: ఈ పట్టిక కూడా ఒక సింగిల్టన్. ఇది కాన్ఫిగరేషన్‌లోని ఒక భాగాన్ని, వెరిఫైయర్ కాంట్రాక్ట్ (`verifier`) చిరునామాను ఉంచడానికి ఉపయోగించబడుతుంది. మేము ఈ సమాచారాన్ని `Configuration` పట్టికలో ఉంచవచ్చు, కానీ ఇది సర్వర్ అనే వేరే కాంపోనెంట్ ద్వారా సెట్ చేయబడింది, కాబట్టి దానిని వేరే పట్టికలో ఉంచడం సులభం.

- `PlayerGame`: కీ అనేది ప్లేయర్ యొక్క చిరునామా. డేటా:

  - `gameId`: ప్లేయర్ ఆడుతున్న మ్యాప్ యొక్క హాష్ (గేమ్ ఐడెంటిఫైయర్) అయిన 32-బైట్ విలువ.
  - `win`: ప్లేయర్ గేమ్‌ను గెలిచాడా లేదా అనేది సూచించే బూలియన్.
  - `lose`: ప్లేయర్ గేమ్‌ను ఓడిపోయాడా లేదా అనేది సూచించే బూలియన్.
  - `digNumber`: గేమ్‌లో విజయవంతమైన తవ్వకాల సంఖ్య.

- `GamePlayer`: ఈ పట్టిక `gameId` నుండి ప్లేయర్ చిరునామాకు రివర్స్ మ్యాపింగ్‌ను కలిగి ఉంటుంది.

- `Map`: కీ అనేది మూడు విలువల టపుల్:

  - `gameId`: ప్లేయర్ ఆడుతున్న మ్యాప్ యొక్క హాష్ (గేమ్ ఐడెంటిఫైయర్) అయిన 32-బైట్ విలువ.
  - `x` కోఆర్డినేట్
  - `y` కోఆర్డినేట్

  విలువ ఒకే సంఖ్య. బాంబు గుర్తించబడితే అది 255. లేకపోతే, ఇది ఆ స్థానం చుట్టూ ఉన్న బాంబుల సంఖ్య ప్లస్ ఒకటి. మేము కేవలం బాంబుల సంఖ్యను ఉపయోగించలేము, ఎందుకంటే డిఫాల్ట్‌గా EVMలోని అన్ని నిల్వలు మరియు MUDలోని అన్ని వరుస విలువలు సున్నా. మేము "ప్లేయర్ ఇంకా ఇక్కడ తవ్వలేదు" మరియు "ప్లేయర్ ఇక్కడ తవ్వాడు, మరియు చుట్టూ సున్నా బాంబులు ఉన్నాయని కనుగొన్నాడు" మధ్య తేడాను గుర్తించాలి.

అదనంగా, క్లయింట్ మరియు సర్వర్ మధ్య కమ్యూనికేషన్ ఆన్‌చైన్ కాంపోనెంట్ ద్వారా జరుగుతుంది. ఇది పట్టికలను ఉపయోగించి కూడా అమలు చేయబడుతుంది.

- `PendingGame`: కొత్త గేమ్‌ను ప్రారంభించడానికి సేవ చేయని అభ్యర్థనలు.
- `PendingDig`: ఒక నిర్దిష్ట గేమ్‌లో ఒక నిర్దిష్ట ప్రదేశంలో తవ్వడానికి సేవ చేయని అభ్యర్థనలు. ఇది ఒక [ఆఫ్‌చైన్ టేబుల్](https://mud.dev/store/tables#types-of-tables), అంటే ఇది EVM నిల్వకు వ్రాయబడదు, ఇది ఈవెంట్‌లను ఉపయోగించి ఆఫ్‌చైన్‌లో మాత్రమే చదవబడుతుంది.

### అమలు మరియు డేటా ప్రవాహాలు {#execution-data-flows}

ఈ ప్రవాహాలు క్లయింట్, ఆన్‌చైన్ కాంపోనెంట్ మరియు సర్వర్ మధ్య అమలును సమన్వయం చేస్తాయి.

#### ప్రారంభీకరణ {#initialization-flow}

మీరు `mprocs` ను అమలు చేసినప్పుడు, ఈ దశలు జరుగుతాయి:

1. [`mprocs`](https://github.com/pvolok/mprocs) నాలుగు భాగాలను నడుపుతుంది:

   - [యాన్విల్](https://book.getfoundry.sh/anvil/), ఇది స్థానిక బ్లాక్‌చెయిన్‌ను నడుపుతుంది
   - [ఒప్పందాలు](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), ఇది MUD కోసం ఒప్పందాలను కంపైల్ చేస్తుంది (అవసరమైతే) మరియు అమలు చేస్తుంది
   - [క్లయింట్](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), ఇది UI మరియు క్లయింట్ కోడ్‌ను వెబ్ బ్రౌజర్‌లకు అందించడానికి [Vite](https://vitejs.dev/) ను నడుపుతుంది.
   - [సర్వర్](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), ఇది సర్వర్ చర్యలను నిర్వహిస్తుంది

2. `contracts` ప్యాకేజీ MUD ఒప్పందాలను అమలు చేస్తుంది మరియు ఆ తర్వాత [`PostDeploy.s.sol` స్క్రిప్ట్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) నడుపుతుంది. ఈ స్క్రిప్ట్ కాన్ఫిగరేషన్‌ను సెట్ చేస్తుంది. github నుండి కోడ్ [దానిలో ఎనిమిది మైన్‌లతో కూడిన 10x5 మైన్‌ఫీల్డ్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) నిర్దేశిస్తుంది.

3. [సర్వర్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUDని సెటప్ చేయడం](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) ద్వారా ప్రారంభమవుతుంది. ఇతర విషయాలతోపాటు, ఇది డేటా సింక్రొనైజేషన్‌ను సక్రియం చేస్తుంది, తద్వారా సంబంధిత పట్టికల కాపీ సర్వర్ మెమరీలో ఉంటుంది.

4. సర్వర్ [`Configuration` పట్టిక మారినప్పుడు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) అమలు చేయడానికి ఒక ఫంక్షన్‌ను సబ్‌స్క్రయిబ్ చేస్తుంది. `PostDeploy.s.sol` పట్టికను అమలు చేసి, సవరించిన తర్వాత [ఈ ఫంక్షన్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) పిలువబడుతుంది.

5. సర్వర్ ప్రారంభ ఫంక్షన్ కాన్ఫిగరేషన్‌ను కలిగి ఉన్నప్పుడు, [సర్వర్ యొక్క జీరో-కనౌలెడ్జి భాగాన్ని](#using-zokrates-from-typescript) ప్రారంభించడానికి [ఇది `zkFunctions` ను పిలుస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35). మేము కాన్ఫిగరేషన్ పొందే వరకు ఇది జరగదు ఎందుకంటే జీరో-కనౌలెడ్జి ఫంక్షన్లు మైన్‌ఫీల్డ్ యొక్క వెడల్పు మరియు ఎత్తును స్థిరాంకాలుగా కలిగి ఉండాలి.

6. సర్వర్ యొక్క జీరో-కనౌలెడ్జి భాగం ప్రారంభించబడిన తర్వాత, తదుపరి దశ [బ్లాక్‌చెయిన్‌కు జీరో-కనౌలెడ్జి వెరిఫికేషన్ కాంట్రాక్ట్‌ను అమలు చేయడం](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) మరియు MUDలో వెరిఫైయీ చిరునామాను సెట్ చేయడం.

7. చివరగా, మేము అప్‌డేట్‌లకు సబ్‌స్క్రయిబ్ చేస్తాము, తద్వారా ప్లేయర్ [కొత్త గేమ్‌ను ప్రారంభించమని](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) లేదా [ఇప్పటికే ఉన్న గేమ్‌లో తవ్వమని](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) అభ్యర్థించినప్పుడు మనం చూస్తాము.

#### కొత్త గేమ్ {#new-game-flow}

ప్లేయర్ కొత్త గేమ్ కోసం అభ్యర్థించినప్పుడు ఇది జరుగుతుంది.

1. ఈ ప్లేయర్ కోసం ప్రోగ్రెస్‌లో గేమ్ లేకపోతే, లేదా ఒకటి ఉండి కానీ సున్నా gameId తో ఉంటే, క్లయింట్ [కొత్త గేమ్ బటన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) ప్రదర్శిస్తుంది. వినియోగదారు ఈ బటన్‌ను నొక్కినప్పుడు, [React `newGame` ఫంక్షన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96) నడుపుతుంది.

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ఒక `System` కాల్. MUDలో అన్ని కాల్‌లు `World` కాంట్రాక్ట్ ద్వారా రూట్ చేయబడతాయి మరియు చాలా సందర్భాల్లో మీరు `<namespace>__<function name>` ను పిలుస్తారు. ఈ సందర్భంలో, కాల్ `app__newGame` కు, MUD తర్వాత [`GameSystem`లో `newGame`కు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) దారి మళ్లిస్తుంది.

3. ఆన్‌చైన్ ఫంక్షన్ ప్లేయర్‌కు ప్రోగ్రెస్‌లో గేమ్ లేదని తనిఖీ చేస్తుంది మరియు ఒకటి లేకపోతే [`PendingGame` పట్టికకు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21) అభ్యర్థనను జోడిస్తుంది.

4. సర్వర్ `PendingGame`లో మార్పును గుర్తించి, [సబ్‌స్క్రయిబ్ చేసిన ఫంక్షన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) నడుపుతుంది. ఈ ఫంక్షన్ [`newGame` ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) పిలుస్తుంది, ఇది [`createGame` ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) పిలుస్తుంది.

5. `createGame` చేసే మొదటి పని [తగిన సంఖ్యలో మైన్‌లతో యాదృచ్ఛిక మ్యాప్‌ను సృష్టించడం](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). ఆ తర్వాత, Zokrates కోసం అవసరమైన ఖాళీ అంచులతో కూడిన మ్యాప్‌ను సృష్టించడానికి [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ను పిలుస్తుంది. చివరగా, `createGame` మ్యాప్ యొక్క హాష్‌ను పొందడానికి [`calculateMapHash`](#calculateMapHash) ను పిలుస్తుంది, ఇది గేమ్ IDగా ఉపయోగించబడుతుంది.

6. `newGame` ఫంక్షన్ కొత్త గేమ్‌ను `gamesInProgress`కు జోడిస్తుంది.

7. సర్వర్ చేసే చివరి పని [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) ను పిలవడం, ఇది ఆన్‌చైన్‌లో ఉంటుంది. యాక్సెస్ నియంత్రణను ప్రారంభించడానికి ఈ ఫంక్షన్ [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) అనే వేరే `System`లో ఉంది. యాక్సెస్ నియంత్రణ [MUD కాన్ఫిగరేషన్ ఫైల్‌లో](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) నిర్వచించబడింది.

   యాక్సెస్ జాబితా `System`ను పిలవడానికి ఒకే చిరునామాను మాత్రమే అనుమతిస్తుంది. ఇది సర్వర్ ఫంక్షన్‌లకు యాక్సెస్‌ను ఒకే చిరునామాకు పరిమితం చేస్తుంది, కాబట్టి ఎవరూ సర్వర్‌ను అనుకరించలేరు.

8. ఆన్‌చైన్ కాంపోనెంట్ సంబంధిత పట్టికలను అప్‌డేట్ చేస్తుంది:

   - `PlayerGame`లో గేమ్‌ను సృష్టించండి.
   - `GamePlayer`లో రివర్స్ మ్యాపింగ్‌ను సెట్ చేయండి.
   - `PendingGame` నుండి అభ్యర్థనను తొలగించండి.

9. సర్వర్ `PendingGame` లో మార్పును గుర్తిస్తుంది, కానీ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) తప్పు కాబట్టి ఏమీ చేయదు.

10. క్లయింట్‌లో [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) ప్లేయర్ చిరునామా కోసం `PlayerGame` ఎంట్రీకి సెట్ చేయబడింది. `PlayerGame` మారినప్పుడు, `gameRecord` కూడా మారుతుంది.

11. `gameRecord` లో విలువ ఉండి, మరియు గేమ్ గెలవకపోయినా లేదా ఓడిపోకపోయినా, క్లయింట్ [మ్యాప్‌ను ప్రదర్శిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### తవ్వడం {#dig-flow}

1. ఆటగాడు [మ్యాప్ సెల్ యొక్క బటన్‌ను క్లిక్ చేస్తాడు](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), ఇది [`dig` ఫంక్షన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) పిలుస్తుంది. ఈ ఫంక్షన్ [`dig` ఆన్‌చైన్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) పిలుస్తుంది.

2. ఆన్‌చైన్ కాంపోనెంట్ [అనేక శానిటీ తనిఖీలను నిర్వహిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), మరియు విజయవంతమైతే తవ్వకం అభ్యర్థనను [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)కు జోడిస్తుంది.

3. సర్వర్ [`PendingDig`లో మార్పును గుర్తిస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [ఇది చెల్లుబాటు అయితే](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), ఇది ఫలితం మరియు అది చెల్లుబాటు అవుతుందని రుజువు రెండింటినీ ఉత్పత్తి చేయడానికి [జీరో-కనౌలెడ్జి కోడ్‌ను పిలుస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (క్రింద వివరించబడింది).

4. [సర్వర్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)ను ఆన్‌చైన్‌లో పిలుస్తుంది.

5. `digResponse` రెండు పనులు చేస్తుంది. మొదట, ఇది [జీరో కనౌలెడ్జి రుజువును](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) తనిఖీ చేస్తుంది. ఆ తర్వాత, రుజువు సరిపోలితే, ఇది ఫలితాన్ని వాస్తవంగా ప్రాసెస్ చేయడానికి [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ను పిలుస్తుంది.

6. `processDigResult` గేమ్ [ఓడిపోయిందా](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) లేదా [గెలిచిందా](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) అని తనిఖీ చేస్తుంది మరియు [`Map`ను, ఆన్‌చైన్ మ్యాప్‌ను అప్‌డేట్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. క్లయింట్ స్వయంచాలకంగా అప్‌డేట్‌లను తీసుకుంటుంది మరియు [ప్లేయర్‌కు ప్రదర్శించబడే మ్యాప్‌ను అప్‌డేట్ చేస్తుంది](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), మరియు వర్తిస్తే అది గెలుపు లేదా ఓటమి అని ప్లేయర్‌కు చెబుతుంది.

## Zokrates ను ఉపయోగించడం {#using-zokrates}

పైన వివరించిన ప్రవాహాలలో మేము జీరో-కనౌలెడ్జి భాగాలను దాటవేసి, వాటిని బ్లాక్ బాక్స్‌గా పరిగణించాము. ఇప్పుడు దానిని తెరిచి, ఆ కోడ్ ఎలా వ్రాయబడిందో చూద్దాం.

### మ్యాప్‌ను హ్యాష్ చేయడం {#hashing-map}

[Poseidon](https://www.poseidon-hash.info) ను అమలు చేయడానికి మేము [ఈ JavaScript కోడ్‌ను](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) ఉపయోగించవచ్చు, ఇది మేము ఉపయోగించే Zokrates హాష్ ఫంక్షన్. అయితే, ఇది వేగంగా ఉన్నప్పటికీ, దానిని చేయడానికి కేవలం Zokrates హాష్ ఫంక్షన్‌ను ఉపయోగించడం కంటే ఇది మరింత క్లిష్టంగా ఉంటుంది. ఇది ఒక ట్యుటోరియల్, అందువల్ల కోడ్ పనితీరు కోసం కాకుండా, సరళత కోసం ఆప్టిమైజ్ చేయబడింది. అందువల్ల, మాకు రెండు వేర్వేరు Zokrates ప్రోగ్రామ్‌లు అవసరం, ఒకటి మ్యాప్ యొక్క హాష్‌ను లెక్కించడానికి (`hash`) మరియు మరొకటి వాస్తవానికి మ్యాప్‌లోని ఒక ప్రదేశంలో తవ్వకం ఫలితం యొక్క జీరో-కనౌలెడ్జి రుజువును సృష్టించడానికి (`dig`).

### హాష్ ఫంక్షన్ {#hash-function}

ఇది మ్యాప్ యొక్క హాష్‌ను లెక్కించే ఫంక్షన్. మేము ఈ కోడ్‌ను లైన్ ద్వారా లైన్ చూస్తాము.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

ఈ రెండు లైన్లు [Zokrates స్టాండర్డ్ లైబ్రరీ](https://zokrates.github.io/toolbox/stdlib.html) నుండి రెండు ఫంక్షన్‌లను దిగుమతి చేసుకుంటాయి. [మొదటి ఫంక్షన్](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) [పోసిడాన్ హాష్](https://www.poseidon-hash.info/). ఇది [`field` ఎలిమెంట్స్](https://zokrates.github.io/language/types.html#field) యొక్క ఒక శ్రేణిని తీసుకుంటుంది మరియు ఒక `field` ను తిరిగి ఇస్తుంది.

Zokrates లో ఫీల్డ్ ఎలిమెంట్ సాధారణంగా 256 బిట్ల కంటే తక్కువ పొడవు ఉంటుంది, కానీ అంత ఎక్కువ కాదు. కోడ్‌ను సరళీకృతం చేయడానికి, మేము మ్యాప్‌ను 512 బిట్ల వరకు పరిమితం చేస్తాము మరియు నాలుగు ఫీల్డ్‌ల శ్రేణిని హాష్ చేస్తాము మరియు ప్రతి ఫీల్డ్‌లో మేము కేవలం 128 బిట్లను ఉపయోగిస్తాము. [`pack128` ఫంక్షన్](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) ఈ ప్రయోజనం కోసం 128 బిట్ల శ్రేణిని ఒక `field` గా మారుస్తుంది.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

ఈ లైన్ ఒక ఫంక్షన్ నిర్వచనాన్ని ప్రారంభిస్తుంది. `hashMap` `map` అని పిలువబడే ఒకే పరామితిని, రెండు డైమెన్షనల్ `bool`(ean) శ్రేణిని పొందుతుంది. [క్రింద వివరించిన](#why-map-border) కారణాల వల్ల మ్యాప్ పరిమాణం `width+2` by `height+2` ఉంటుంది.

మేము `${width+2}` మరియు `${height+2}` ను ఉపయోగించవచ్చు ఎందుకంటే Zokrates ప్రోగ్రామ్‌లు ఈ అప్లికేషన్‌లో [టెంప్లేట్ స్ట్రింగ్‌లుగా](https://www.w3schools.com/js/js_string_templates.asp) నిల్వ చేయబడతాయి. `${` మరియు `}` మధ్య కోడ్ JavaScript ద్వారా మూల్యాంకనం చేయబడుతుంది, మరియు ఈ విధంగా ప్రోగ్రామ్ విభిన్న మ్యాప్ పరిమాణాల కోసం ఉపయోగించబడుతుంది. మ్యాప్ పరామితి దాని చుట్టూ ఎలాంటి బాంబులు లేకుండా ఒక స్థానం వెడల్పు అంచుని కలిగి ఉంటుంది, అందుకే మనం వెడల్పు మరియు ఎత్తుకు రెండు జోడించాలి.

తిరిగి వచ్చే విలువ హాష్‌ను కలిగి ఉన్న ఒక `field`.

```
   bool[512] mut map1d = [false; 512];
```

మ్యాప్ రెండు-డైమెన్షనల్. అయితే, `pack128` ఫంక్షన్ రెండు-డైమెన్షనల్ శ్రేణులతో పనిచేయదు. కాబట్టి మేము మొదట `map1d` ను ఉపయోగించి మ్యాప్‌ను 512-బైట్ శ్రేణిగా ఫ్లాటెన్ చేస్తాము. డిఫాల్ట్‌గా Zokrates వేరియబుల్స్ స్థిరాంకాలు, కానీ మేము లూప్‌లో ఈ శ్రేణికి విలువలను కేటాయించాలి, కాబట్టి మేము దానిని [`mut`](https://zokrates.github.io/language/variables.html#mutability)గా నిర్వచిస్తాము.

మేము శ్రేణిని ప్రారంభించాలి ఎందుకంటే Zokrates `undefined` కలిగి లేదు. `[false; 512]` వ్యక్తీకరణ అంటే [512 `false` విలువల శ్రేణి](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

`map1d` లో మేము ఇప్పటికే నింపిన బిట్స్ మరియు మేము నింపని వాటి మధ్య తేడాను గుర్తించడానికి మాకు ఒక కౌంటర్ కూడా అవసరం.

```
   for u32 x in 0..${width+2} {
```

Zokrates లో [`for` loop](https://zokrates.github.io/language/control_flow.html#for-loops) ను మీరు ఇలా ప్రకటిస్తారు. ఒక Zokrates `for` loop స్థిర సరిహద్దులను కలిగి ఉండాలి, ఎందుకంటే ఇది లూప్‌గా కనిపించినప్పటికీ, కంపైలర్ వాస్తవానికి దానిని "విప్పుతుంది". వ్యక్తీకరణ `${width+2}` ఒక కంపైల్ టైమ్ స్థిరాంకం ఎందుకంటే కంపైలర్‌ను పిలవడానికి ముందు TypeScript కోడ్ ద్వారా `width` సెట్ చేయబడింది.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

మ్యాప్‌లోని ప్రతి స్థానానికి, ఆ విలువను `map1d` శ్రేణిలో ఉంచి, కౌంటర్‌ను పెంచండి.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` నుండి నాలుగు `field` విలువల శ్రేణిని సృష్టించడానికి `pack128`. Zokrates లో `array[a..b]` అంటే `a` వద్ద ప్రారంభమై `b-1` వద్ద ముగిసే శ్రేణి యొక్క స్లైస్.

```
    return poseidon(hashMe);
}
```

ఈ శ్రేణిని హాష్‌గా మార్చడానికి `poseidon` ఉపయోగించండి.

### హాష్ ప్రోగ్రామ్ {#hash-program}

గేమ్ ఐడెంటిఫైయర్‌లను సృష్టించడానికి సర్వర్ నేరుగా `hashMap` ను పిలవాలి. అయితే, Zokrates ప్రారంభించడానికి ఒక ప్రోగ్రామ్‌లో `main` ఫంక్షన్‌ను మాత్రమే పిలవగలదు, కాబట్టి మేము హాష్ ఫంక్షన్‌ను పిలిచే `main` తో ఒక ప్రోగ్రామ్‌ను సృష్టిస్తాము.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### తవ్వకం ప్రోగ్రామ్ {#dig-program}

ఇది అప్లికేషన్ యొక్క జీరో-కనౌలెడ్జి భాగం యొక్క హృదయం, ఇక్కడ మేము తవ్వకం ఫలితాలను ధృవీకరించడానికి ఉపయోగించే రుజువులను ఉత్పత్తి చేస్తాము.

```
${hashFragment}

// స్థానం (x,y) లో మైన్‌ల సంఖ్య
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### మ్యాప్ బార్డర్ ఎందుకు {#why-map-border}

జీరో-కనౌలెడ్జి రుజువులు [అంకగణిత సర్క్యూట్‌లను](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) ఉపయోగిస్తాయి, వీటికి `if` స్టేట్‌మెంట్‌కు సులభమైన సమానం లేదు. బదులుగా, వారు [షరతులతో కూడిన ఆపరేటర్](https://en.wikipedia.org/wiki/Ternary_conditional_operator)కు సమానమైనదాన్ని ఉపయోగిస్తారు. `a` సున్నా లేదా ఒకటి కాగలిగితే, మీరు `if a { b } else { c }`ను `ab+(1-a)c` గా లెక్కించవచ్చు.

ఈ కారణంగా, Zokrates `if` స్టేట్‌మెంట్ ఎల్లప్పుడూ రెండు శాఖలను మూల్యాంకనం చేస్తుంది. ఉదాహరణకు, మీకు ఈ కోడ్ ఉంటే:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

ఇది లోపం చూపుతుంది, ఎందుకంటే ఇది `arr[10]` ను లెక్కించాలి, ఆ విలువ తర్వాత సున్నాతో గుణించబడినప్పటికీ.

మ్యాప్ చుట్టూ ఒక స్థానం వెడల్పు సరిహద్దు అవసరం కావడానికి ఇదే కారణం. మేము ఒక స్థానం చుట్టూ ఉన్న మొత్తం మైన్‌ల సంఖ్యను లెక్కించాలి, మరియు దాని అర్థం మనం తవ్వుతున్న స్థానానికి ఒక వరుస పైన మరియు క్రింద, ఎడమ మరియు కుడివైపున ఉన్న స్థానాన్ని చూడాలి. అంటే Zokrates అందించిన మ్యాప్ శ్రేణిలో ఆ స్థానాలు ఉండాలి.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

డిఫాల్ట్‌గా Zokrates రుజువులు వాటి ఇన్‌పుట్‌లను కలిగి ఉంటాయి. ఒక ప్రదేశం చుట్టూ ఐదు మైన్‌లు ఉన్నాయని తెలుసుకోవడం వల్ల ప్రయోజనం లేదు, అది ఏ ప్రదేశం అని మీకు వాస్తవంగా తెలియనంత వరకు (మరియు మీరు దానిని మీ అభ్యర్థనతో సరిపోల్చలేరు, ఎందుకంటే అప్పుడు ప్రూవర్ విభిన్న విలువలను ఉపయోగించి దాని గురించి మీకు చెప్పకపోవచ్చు). అయితే, Zokrates కు అందిస్తూనే మనం మ్యాప్‌ను రహస్యంగా ఉంచాలి. రుజువు ద్వారా _బహిర్గతం_ కాని `private` పరామితిని ఉపయోగించడం పరిష్కారం.

ఇది దుర్వినియోగానికి మరొక మార్గాన్ని తెరుస్తుంది. ప్రూవర్ సరైన కోఆర్డినేట్‌లను ఉపయోగించవచ్చు, కానీ స్థానం చుట్టూ ఏదైనా సంఖ్యలో మైన్‌లతో ఒక మ్యాప్‌ను సృష్టించవచ్చు, మరియు బహుశా స్థానంలోనే. ఈ దుర్వినియోగాన్ని నివారించడానికి, మేము జీరో కనౌలెడ్జి రుజువులో మ్యాప్ యొక్క హాష్‌ను చేర్చుతాము, ఇది గేమ్ ఐడెంటిఫైయర్.

```
   return (hashMap(map),
```

ఇక్కడ రిటర్న్ విలువ మ్యాప్ హాష్ శ్రేణితో పాటు తవ్వకం ఫలితాన్ని కలిగి ఉన్న టపుల్.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

స్థానంలోనే బాంబు ఉంటే మేము 255 ను ప్రత్యేక విలువగా ఉపయోగిస్తాము.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

ప్లేయర్ మైన్‌ను తాకకపోతే, స్థానం చుట్టూ ఉన్న ప్రాంతానికి మైన్ గణనలను జోడించి, దానిని తిరిగి ఇవ్వండి.

### TypeScript నుండి Zokrates ను ఉపయోగించడం {#using-zokrates-from-typescript}

Zokrates కు కమాండ్ లైన్ ఇంటర్‌ఫేస్ ఉంది, కానీ ఈ ప్రోగ్రామ్‌లో మేము దానిని [TypeScript కోడ్‌లో](https://zokrates.github.io/toolbox/zokrates_js.html) ఉపయోగిస్తాము.

Zokrates నిర్వచనాలను కలిగి ఉన్న లైబ్రరీని [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) అంటారు.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript బైండింగ్‌లను](https://zokrates.github.io/toolbox/zokrates_js.html) దిగుమతి చేయండి. మాకు కేవలం [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) ఫంక్షన్ మాత్రమే అవసరం ఎందుకంటే ఇది అన్ని Zokrates నిర్వచనాలకు పరిష్కారమయ్యే వాగ్దానాన్ని తిరిగి ఇస్తుంది.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates వలె, మేము కూడా ఒకే ఒక ఫంక్షన్‌ను ఎగుమతి చేస్తాము, ఇది కూడా [అసింక్రోనస్](https://www.w3schools.com/js/js_async.asp). ఇది చివరకు తిరిగి వచ్చినప్పుడు, మేము క్రింద చూసే విధంగా ఇది అనేక ఫంక్షన్‌లను అందిస్తుంది.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates ను ప్రారంభించండి, లైబ్రరీ నుండి మాకు అవసరమైన ప్రతిదాన్ని పొందండి.

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

తరువాత మేము పైన చూసిన హాష్ ఫంక్షన్ మరియు రెండు Zokrates ప్రోగ్రామ్‌లను కలిగి ఉన్నాము.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

ఇక్కడ మేము ఆ ప్రోగ్రామ్‌లను కంపైల్ చేస్తాము.

```typescript
// జీరో కనౌలెడ్జి వెరిఫికేషన్ కోసం కీలను సృష్టించండి.
// ప్రొడక్షన్ సిస్టమ్‌లో మీరు సెటప్ వేడుకను ఉపయోగించాలనుకుంటారు.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

ప్రొడక్షన్ సిస్టమ్‌లో మేము మరింత క్లిష్టమైన [సెటప్ వేడుకను](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ఉపయోగించవచ్చు, కానీ ఇది ప్రదర్శన కోసం సరిపోతుంది. వినియోగదారులు ప్రూవర్ కీని తెలుసుకోవడం సమస్య కాదు - అవి నిజమైతే తప్ప వారు దానిని విషయాలను రుజువు చేయడానికి ఉపయోగించలేరు. మేము ఎంట్రోపీని పేర్కొన్నందున (రెండవ పరామితి, `""`), ఫలితాలు ఎల్లప్పుడూ ఒకే విధంగా ఉంటాయి.

**గమనిక:** Zokrates ప్రోగ్రామ్‌ల సంకలనం మరియు కీ సృష్టి నెమ్మదిగా జరిగే ప్రక్రియలు. ప్రతిసారీ వాటిని పునరావృతం చేయవలసిన అవసరం లేదు, మ్యాప్ పరిమాణం మారినప్పుడు మాత్రమే. ప్రొడక్షన్ సిస్టమ్‌లో మీరు వాటిని ఒకసారి చేసి, ఆపై అవుట్‌పుట్‌ను నిల్వ చేస్తారు. నేను ఇక్కడ చేయకపోవడానికి ఏకైక కారణం సరళత కోసం.

#### `calculateMapHash` {#calculateMapHash}

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) ఫంక్షన్ వాస్తవానికి Zokrates ప్రోగ్రామ్‌ను నడుపుతుంది. ఇది రెండు ఫీల్డ్‌లతో ఒక నిర్మాణాన్ని తిరిగి ఇస్తుంది: `output`, ఇది ప్రోగ్రామ్ యొక్క అవుట్‌పుట్‌ను JSON స్ట్రింగ్‌గా, మరియు `witness`, ఇది ఫలితం యొక్క జీరో కనౌలెడ్జి రుజువును సృష్టించడానికి అవసరమైన సమాచారం. ఇక్కడ మనకు అవుట్‌పుట్ మాత్రమే అవసరం.

అవుట్‌పుట్ `"31337"` రూపంలో ఒక స్ట్రింగ్, కొటేషన్ మార్కులలో ఉంచబడిన దశాంశ సంఖ్య. కానీ `viem` కోసం మనకు అవసరమైన అవుట్‌పుట్ `0x60A7` రూపంలో ఒక హెక్సాడెసిమల్ సంఖ్య. కాబట్టి మేము కొటేషన్ మార్కులను తొలగించడానికి `.slice(1,-1)` ఉపయోగిస్తాము మరియు ఆ తర్వాత మిగిలిన స్ట్రింగ్‌ను, ఇది దశాంశ సంఖ్య, [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)కు నడపడానికి `BigInt` ఉపయోగిస్తాము. `.toString(16)` ఈ `BigInt`ను హెక్సాడెసిమల్ స్ట్రింగ్‌గా మారుస్తుంది, మరియు `"0x"+` హెక్సాడెసిమల్ సంఖ్యల కోసం మార్కర్‌ను జోడిస్తుంది.

```typescript
// తవ్వి, ఫలితం యొక్క జీరో కనౌలెడ్జి రుజువును తిరిగి ఇవ్వండి
// (సర్వర్-సైడ్ కోడ్)
```

జీరో కనౌలెడ్జి రుజువులో పబ్లిక్ ఇన్‌పుట్‌లు (`x` మరియు `y`) మరియు ఫలితాలు (మ్యాప్ యొక్క హాష్ మరియు బాంబుల సంఖ్య) ఉంటాయి.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates లో ఒక సూచిక సరిహద్దుల వెలుపల ఉందో లేదో తనిఖీ చేయడం ఒక సమస్య, కాబట్టి మేము దానిని ఇక్కడ చేస్తాము.

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

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) ఉపయోగించి, రుజువును తిరిగి ఇవ్వండి.

```typescript
const solidityVerifier = `
        // మ్యాప్ పరిమాణం: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ఒక సోలిడిటీ వెరిఫైయర్, `digCompiled.program` ద్వారా ఉత్పత్తి చేయబడిన రుజువులను ధృవీకరించడానికి మేము బ్లాక్‌చెయిన్‌కు అమలు చేయగల మరియు ఉపయోగించగల స్మార్ట్ కాంట్రాక్ట్.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

చివరగా, ఇతర కోడ్‌కు అవసరమయ్యే ప్రతిదాన్ని తిరిగి ఇవ్వండి.

## భద్రతా పరీక్షలు {#security-tests}

భద్రతా పరీక్షలు ముఖ్యమైనవి ఎందుకంటే కార్యాచరణ బగ్ చివరికి తనను తాను బహిర్గతం చేస్తుంది. కానీ అప్లికేషన్ అభద్రంగా ఉంటే, ఇతరులకు చెందిన వనరులతో మోసం చేసి పారిపోయే వ్యక్తి ద్వారా బహిర్గతం కావడానికి ముందు అది చాలా కాలం పాటు రహస్యంగా ఉండే అవకాశం ఉంది.

### అనుమతులు {#permissions}

ఈ గేమ్‌లో ఒక ప్రత్యేక అధికారం ఉన్న సంస్థ ఉంది, సర్వర్. ఇది [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) లోని ఫంక్షన్‌లను పిలవడానికి అనుమతించబడిన ఏకైక వినియోగదారు. సర్వర్ ఖాతాగా మాత్రమే అనుమతించబడిన ఫంక్షన్‌లకు కాల్‌లను ధృవీకరించడానికి మేము [`cast`](https://book.getfoundry.sh/cast/) ను ఉపయోగించవచ్చు.

[సర్వర్ యొక్క ప్రైవేట్ కీ `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)లో ఉంది.

1. `anvil` (బ్లాక్‌చెయిన్) ను నడిపే కంప్యూటర్‌లో, ఈ పర్యావరణ వేరియబుల్స్‌ను సెట్ చేయండి.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. అనధికార చిరునామాగా వెరిఫైయర్ చిరునామాను సెట్ చేయడానికి `cast` ను ఉపయోగించండి.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` వైఫల్యాన్ని నివేదించడమే కాకుండా, బ్రౌజర్‌లో గేమ్‌లోని **MUD డెవ్ టూల్స్** ను తెరిచి, **పట్టికలు** క్లిక్ చేసి, **app\_\_VerifierAddress** ను ఎంచుకోవచ్చు. చిరునామా సున్నా కాదని చూడండి.

3. సర్వర్ చిరునామాగా వెరిఫైయర్ చిరునామాను సెట్ చేయండి.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** లోని చిరునామా ఇప్పుడు సున్నా అయి ఉండాలి.

అదే `System`లోని అన్ని MUD ఫంక్షన్లు ఒకే యాక్సెస్ నియంత్రణ ద్వారా వెళ్తాయి, కాబట్టి నేను ఈ పరీక్షను సరిపోతుందని భావిస్తున్నాను. మీకు నచ్చకపోతే, మీరు [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)లోని ఇతర ఫంక్షన్‌లను తనిఖీ చేయవచ్చు.

### జీరో-కనౌలెడ్జి దుర్వినియోగాలు {#zero-knowledge-abuses}

Zokrates ను ధృవీకరించడానికి గణితం ఈ ట్యుటోరియల్ యొక్క పరిధికి మించినది (మరియు నా సామర్థ్యాలకు). అయితే, జీరో-కనౌలెడ్జి కోడ్‌ను సరిగ్గా చేయకపోతే అది విఫలమవుతుందని ధృవీకరించడానికి మేము దానిపై వివిధ తనిఖీలను అమలు చేయవచ్చు. ఈ పరీక్షలన్నింటికీ మేము [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) ను మార్చాలి మరియు మొత్తం అప్లికేషన్‌ను పునఃప్రారంభించాలి. సర్వర్ ప్రక్రియను పునఃప్రారంభించడం సరిపోదు, ఎందుకంటే ఇది అప్లికేషన్‌ను అసాధ్యమైన స్థితిలో ఉంచుతుంది (ప్లేయర్‌కు ఒక గేమ్ ప్రోగ్రెస్‌లో ఉంది, కానీ ఆ గేమ్ సర్వర్‌కు అందుబాటులో లేదు).

#### తప్పు సమాధానం {#wrong-answer}

జీరో-కనౌలెడ్జి రుజువులో తప్పు సమాధానం అందించడం సరళమైన అవకాశం. అది చేయడానికి, మేము `zkDig` లోపలికి వెళ్లి [లైన్ 91 ను సవరించండి](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

దీని అర్థం సరైన సమాధానంతో సంబంధం లేకుండా మేము ఎల్లప్పుడూ ఒక బాంబు ఉందని క్లెయిమ్ చేస్తాము. ఈ వెర్షన్‌తో ఆడి ప్రయత్నించండి, మరియు మీరు `pnpm dev` స్క్రీన్ యొక్క **సర్వర్** ట్యాబ్‌లో ఈ లోపాన్ని చూస్తారు:

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

#### తప్పు రుజువు {#wrong-proof}

మేము సరైన సమాచారాన్ని అందించి, కానీ కేవలం తప్పు రుజువు డేటాను కలిగి ఉంటే ఏమి జరుగుతుంది? ఇప్పుడు, లైన్ 91 ను దీనితో భర్తీ చేయండి:

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

ఇది ఇంకా విఫలమవుతుంది, కానీ ఇప్పుడు ఇది వెరిఫైయర్ కాల్ సమయంలో జరుగుతుంది కాబట్టి కారణం లేకుండా విఫలమవుతుంది.

### ఒక వినియోగదారు జీరో ట్రస్ట్ కోడ్‌ను ఎలా ధృవీకరించగలరు? {#user-verify-zero-trust}

స్మార్ట్ కాంట్రాక్టులను ధృవీకరించడం సాపేక్షంగా సులభం. సాధారణంగా, డెవలపర్ సోర్స్ కోడ్‌ను బ్లాక్ ఎక్స్‌ప్లోరర్‌కు ప్రచురిస్తాడు, మరియు బ్లాక్ ఎక్స్‌ప్లోరర్ [ఒప్పందం అమలు లావాదేవీ](/developers/docs/smart-contracts/deploying/) లోని కోడ్‌కు సోర్స్ కోడ్ కంపైల్ అవుతుందని ధృవీకరిస్తుంది. MUD `System`s విషయంలో ఇది [కొద్దిగా క్లిష్టంగా](https://mud.dev/cli/verify) ఉంటుంది, కానీ అంతగా కాదు.

జీరో-కనౌలెడ్జితో ఇది కష్టం. వెరిఫైయర్ కొన్ని స్థిరాంకాలను కలిగి ఉంటుంది మరియు వాటిపై కొన్ని గణనలను నడుపుతుంది. ఏమి రుజువు చేయబడుతోందో ఇది మీకు చెప్పదు.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

బ్లాక్ ఎక్స్‌ప్లోరర్‌లు తమ వినియోగదారు ఇంటర్‌ఫేస్‌లకు Zokrates వెరిఫికేషన్‌ను జోడించే వరకు, పరిష్కారం, అప్లికేషన్ డెవలపర్లు Zokrates ప్రోగ్రామ్‌లను అందుబాటులో ఉంచడం, మరియు కనీసం కొంతమంది వినియోగదారులు వాటిని తగిన వెరిఫికేషన్ కీతో తమంతట తాము కంపైల్ చేయడం.

అలా చేయడానికి:

1. [Zokrates ను ఇన్‌స్టాల్ చేయండి](https://zokrates.github.io/gettingstarted.html).

2. Zokrates ప్రోగ్రామ్‌తో `dig.zok` అనే ఫైల్‌ను సృష్టించండి. క్రింది కోడ్ మీరు అసలు మ్యాప్ పరిమాణం, 10x5, ను ఉంచారని ఊహిస్తుంది.

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

3. Zokrates కోడ్‌ను కంపైల్ చేసి, వెరిఫికేషన్ కీని సృష్టించండి. అసలు సర్వర్‌లో ఉపయోగించిన అదే ఎంట్రోపీతో వెరిఫికేషన్ కీ సృష్టించబడాలి, [ఈ సందర్భంలో ఖాళీ స్ట్రింగ్](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. సోలిడిటీ వెరిఫైయర్‌ను మీ స్వంతంగా సృష్టించండి, మరియు అది బ్లాక్‌చెయిన్‌లో ఉన్న దానికి కార్యాచరణపరంగా ఒకేలా ఉందని ధృవీకరించండి (సర్వర్ ఒక వ్యాఖ్యను జోడిస్తుంది, కానీ అది ముఖ్యం కాదు).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## డిజైన్ నిర్ణయాలు {#design}

ఏదైనా తగినంత సంక్లిష్టమైన అప్లికేషన్‌లో పోటీ డిజైన్ లక్ష్యాలు ఉంటాయి, వాటికి ట్రేడ్-ఆఫ్‌లు అవసరం. కొన్ని ట్రేడ్-ఆఫ్‌లను మరియు ప్రస్తుత పరిష్కారం ఇతర ఎంపికల కంటే ఎందుకు ప్రాధాన్యత కలిగి ఉందో చూద్దాం.

### ఎందుకు జీరో-కనౌలెడ్జి {#why-zero-knowledge}

మైన్‌స్వీపర్ కోసం మీకు నిజంగా జీరో-కనౌలెడ్జి అవసరం లేదు. సర్వర్ ఎల్లప్పుడూ మ్యాప్‌ను ఉంచుకోవచ్చు, ఆపై గేమ్ ముగిసినప్పుడు దాని మొత్తాన్ని బహిర్గతం చేయవచ్చు. ఆ తర్వాత, గేమ్ చివరిలో, స్మార్ట్ కాంట్రాక్ట్ మ్యాప్ హాష్‌ను లెక్కించవచ్చు, అది సరిపోలుతుందని ధృవీకరించవచ్చు, మరియు అది సరిపోకపోతే సర్వర్‌ను శిక్షించవచ్చు లేదా గేమ్‌ను పూర్తిగా విస్మరించవచ్చు.

నేను ఈ సరళమైన పరిష్కారాన్ని ఉపయోగించలేదు ఎందుకంటే ఇది స్పష్టంగా నిర్వచించబడిన ముగింపు స్థితితో చిన్న ఆటలకు మాత్రమే పనిచేస్తుంది. ఒక గేమ్ సంభావ్యంగా అనంతంగా ఉన్నప్పుడు ([స్వయంప్రతిపత్త ప్రపంచాల](https://0xparc.org/blog/autonomous-worlds) విషయంలో వలె), మీకు స్థితిని _బహిర్గతం_ చేయకుండా రుజువు చేసే పరిష్కారం అవసరం.

ఒక ట్యుటోరియల్‌గా ఈ ఆర్టికల్‌కు అర్థం చేసుకోవడానికి సులభమైన చిన్న గేమ్ అవసరం, కానీ ఈ సాంకేతికత సుదీర్ఘ ఆటలకు చాలా ఉపయోగకరంగా ఉంటుంది.

### ఎందుకు Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) అందుబాటులో ఉన్న ఏకైక జీరో-కనౌలెడ్జి లైబ్రరీ కాదు, కానీ ఇది ఒక సాధారణ, [అవసరమైన](https://en.wikipedia.org/wiki/Imperative_programming) ప్రోగ్రామింగ్ భాష వలె ఉంటుంది మరియు బూలియన్ వేరియబుల్స్‌కు మద్దతు ఇస్తుంది.

మీ అప్లికేషన్ కోసం, విభిన్న అవసరాలతో, మీరు [Circum](https://docs.circom.io/getting-started/installation/) లేదా [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ఉపయోగించడానికి ఇష్టపడవచ్చు.

### Zokrates ను ఎప్పుడు కంపైల్ చేయాలి {#when-compile-zokrates}

ఈ ప్రోగ్రామ్‌లో మేము Zokrates ప్రోగ్రామ్‌లను [సర్వర్ ప్రారంభమైన ప్రతిసారీ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) కంపైల్ చేస్తాము. ఇది స్పష్టంగా వనరుల వృధా, కానీ ఇది సరళత కోసం ఆప్టిమైజ్ చేయబడిన ట్యుటోరియల్.

నేను ప్రొడక్షన్-స్థాయి అప్లికేషన్ వ్రాస్తుంటే, ఈ మైన్‌ఫీల్డ్ పరిమాణంలో కంపైల్ చేయబడిన Zokrates ప్రోగ్రామ్‌లతో నా దగ్గర ఒక ఫైల్ ఉందో లేదో తనిఖీ చేస్తాను, మరియు అలా అయితే దానిని ఉపయోగిస్తాను. ఆన్‌చైన్‌లో వెరిఫైయర్ కాంట్రాక్ట్‌ను అమలు చేయడం విషయంలో కూడా ఇదే నిజం.

### వెరిఫైయర్ మరియు ప్రూవర్ కీలను సృష్టించడం {#key-creation}

[కీ సృష్టి](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) అనేది ఇచ్చిన మైన్‌ఫీల్డ్ పరిమాణానికి ఒకటి కంటే ఎక్కువసార్లు చేయవలసిన అవసరం లేని మరొక స్వచ్ఛమైన గణన. మళ్ళీ, ఇది సరళత కోసం మాత్రమే ఒకసారి చేయబడుతుంది.

అదనంగా, మేము [ఒక సెటప్ వేడుకను](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ఉపయోగించవచ్చు. సెటప్ వేడుక యొక్క ప్రయోజనం ఏమిటంటే, జీరో-కనౌలెడ్జి రుజువుపై మోసం చేయడానికి మీకు ప్రతి పాల్గొనేవారి నుండి ఎంట్రోపీ లేదా ఏదైనా మధ్యంతర ఫలితం అవసరం. కనీసం ఒక వేడుక పాల్గొనేవాడు నిజాయితీగా ఉండి, ఆ సమాచారాన్ని తొలగిస్తే, జీరో-కనౌలెడ్జి రుజువులు కొన్ని దాడుల నుండి సురక్షితంగా ఉంటాయి. అయితే, సమాచారం ప్రతిచోటా నుండి తొలగించబడిందని ధృవీకరించడానికి _ఏ యంత్రాంగం_ లేదు. జీరో-కనౌలెడ్జి రుజువులు చాలా ముఖ్యమైనవి అయితే, మీరు సెటప్ వేడుకలో పాల్గొనాలని కోరుకుంటారు.

ఇక్కడ మేము [టౌ యొక్క శాశ్వత శక్తుల](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)పై ఆధారపడతాము, ఇందులో డజన్ల కొద్దీ పాల్గొనేవారు ఉన్నారు. ఇది బహుశా తగినంత సురక్షితమైనది మరియు చాలా సరళమైనది. కీ సృష్టి సమయంలో మేము ఎంట్రోపీని కూడా జోడించము, ఇది వినియోగదారులకు [జీరో-కనౌలెడ్జి కాన్ఫిగరేషన్‌ను ధృవీకరించడం](#user-verify-zero-trust) సులభం చేస్తుంది.

### ఎక్కడ ధృవీకరించాలి {#where-verification}

మేము జీరో-కనౌలెడ్జి రుజువులను ఆన్‌చైన్‌లో (దీనికి గ్యాస్ ఖర్చవుతుంది) లేదా క్లయింట్‌లో ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) ఉపయోగించి) ధృవీకరించవచ్చు. నేను మొదటిదాన్ని ఎంచుకున్నాను, ఎందుకంటే ఇది మిమ్మల్ని ఒకసారి [వెరిఫైయర్‌ను ధృవీకరించడానికి](#user-verify-zero-trust) అనుమతిస్తుంది మరియు ఆ తర్వాత దాని కాంట్రాక్ట్ చిరునామా ఒకేలా ఉన్నంత వరకు అది మారదని విశ్వసించవచ్చు. ధృవీకరణ క్లయింట్‌లో జరిగితే, మీరు క్లయింట్‌ను డౌన్‌లోడ్ చేసిన ప్రతిసారీ మీరు అందుకున్న కోడ్‌ను ధృవీకరించాలి.

అలాగే, ఈ గేమ్ సింగిల్ ప్లేయర్ అయినప్పటికీ, చాలా బ్లాక్‌చెయిన్ ఆటలు మల్టీ-ప్లేయర్. ఆన్‌చైన్ వెరిఫికేషన్ అంటే మీరు జీరో-కనౌలెడ్జి రుజువును ఒకసారి మాత్రమే ధృవీకరిస్తారు. క్లయింట్‌లో దీన్ని చేయడం వలన ప్రతి క్లయింట్ స్వతంత్రంగా ధృవీకరించవలసి ఉంటుంది.

### మ్యాప్‌ను TypeScript లో లేదా Zokrates లో ఫ్లాటెన్ చేయాలా? {#where-flatten}

సాధారణంగా, ప్రాసెసింగ్ TypeScript లో లేదా Zokrates లో చేయగలిగితే, దానిని TypeScript లో చేయడం మంచిది, ఇది చాలా వేగంగా ఉంటుంది మరియు జీరో-కనౌలెడ్జి రుజువులు అవసరం లేదు. ఉదాహరణకు, మేము Zokrates కు హాష్‌ను అందించి, అది సరైనదని ధృవీకరించమని చేయకపోవడానికి ఇదే కారణం. హ్యాషింగ్ Zokrates లోపల జరగాలి, కానీ తిరిగి వచ్చిన హాష్ మరియు ఆన్‌చైన్‌లోని హాష్ మధ్య సరిపోలిక దాని వెలుపల జరగవచ్చు.

అయితే, మేము ఇంకా [Zokrates లో మ్యాప్‌ను ఫ్లాటెన్ చేస్తాము](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), అయితే మేము దానిని TypeScript లో చేసి ఉండవచ్చు. కారణం ఏమిటంటే ఇతర ఎంపికలు, నా అభిప్రాయం ప్రకారం, అధ్వాన్నంగా ఉన్నాయి.

- Zokrates కోడ్‌కు ఒక డైమెన్షనల్ బూలియన్ శ్రేణిని అందించి, రెండు డైమెన్షనల్ మ్యాప్‌ను పొందడానికి `x*(height+2)
  +y` వంటి వ్యక్తీకరణను ఉపయోగించండి. ఇది [కోడ్‌ను](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) కొంత క్లిష్టంగా చేస్తుంది, కాబట్టి నేను ట్యుటోరియల్ కోసం పనితీరు లాభం విలువైనది కాదని నిర్ణయించుకున్నాను.

- Zokrates కు ఒక డైమెన్షనల్ శ్రేణి మరియు రెండు డైమెన్షనల్ శ్రేణి రెండింటినీ పంపండి. అయితే, ఈ పరిష్కారం మనకు ఏమీ లాభం చేయదు. Zokrates కోడ్ దానికి అందించబడిన ఒక డైమెన్షనల్ శ్రేణి వాస్తవానికి రెండు డైమెన్షనల్ శ్రేణి యొక్క సరైన ప్రాతినిధ్యం అని ధృవీకరించవలసి ఉంటుంది. కాబట్టి ఎలాంటి పనితీరు లాభం ఉండదు.

- Zokrates లో రెండు డైమెన్షనల్ శ్రేణిని ఫ్లాటెన్ చేయండి. ఇది సరళమైన ఎంపిక, కాబట్టి నేను దానిని ఎంచుకున్నాను.

### మ్యాప్‌లను ఎక్కడ నిల్వ చేయాలి {#where-store-maps}

ఈ అప్లికేషన్‌లో [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) కేవలం మెమరీలో ఒక వేరియబుల్. దీని అర్థం మీ సర్వర్ చనిపోయి, పునఃప్రారంభించవలసి వస్తే, అది నిల్వ చేసిన మొత్తం సమాచారం పోతుంది. ఆటగాళ్లు తమ గేమ్‌ను కొనసాగించలేకపోవడమే కాకుండా, ఆన్‌చైన్ కాంపోనెంట్ వారు ఇంకా ఒక గేమ్ ప్రోగ్రెస్‌లో ఉన్నారని భావించడం వల్ల వారు కొత్త గేమ్‌ను కూడా ప్రారంభించలేరు.

ప్రొడక్షన్ సిస్టమ్ కోసం ఇది స్పష్టంగా చెడ్డ డిజైన్, ఇందులో మీరు ఈ సమాచారాన్ని డేటాబేస్‌లో నిల్వ చేస్తారు. ఇక్కడ నేను ఒక వేరియబుల్ ఉపయోగించడానికి ఏకైక కారణం ఇది ట్యుటోరియల్ మరియు సరళత ప్రధాన పరిగణన.

## ముగింపు: ఏ పరిస్థితులలో ఇది తగిన టెక్నిక్? {#conclusion}

కాబట్టి, ఇప్పుడు మీకు ఆన్‌చైన్‌లో ఉండని రహస్య స్థితిని నిల్వ చేసే సర్వర్‌తో ఒక గేమ్ ఎలా వ్రాయాలో తెలుసు. కానీ ఏ సందర్భాల్లో మీరు దీన్ని చేయాలి? రెండు ప్రధాన పరిగణనలు ఉన్నాయి.

- _సుదీర్ఘంగా నడిచే గేమ్_: [పైన చెప్పినట్లుగా](#why-zero-knowledge), ఒక చిన్న గేమ్‌లో మీరు గేమ్ ముగిసిన తర్వాత స్థితిని ప్రచురించి, ఆ తర్వాత ప్రతిదీ ధృవీకరించవచ్చు. కానీ గేమ్ ఎక్కువ లేదా నిరవధిక సమయం తీసుకున్నప్పుడు మరియు స్థితి రహస్యంగా ఉండవలసి వచ్చినప్పుడు అది ఒక ఎంపిక కాదు.

- _కొంత కేంద్రీకరణ ఆమోదయోగ్యం_: జీరో-కనౌలెడ్జి రుజువులు సమగ్రతను ధృవీకరించగలవు, ఒక సంస్థ ఫలితాలను నకిలీ చేయడం లేదని. వారు చేయలేనిది ఏమిటంటే, ఆ సంస్థ ఇంకా అందుబాటులో ఉంటుందని మరియు సందేశాలకు సమాధానం ఇస్తుందని నిర్ధారించడం. అందుబాటు కూడా వికేంద్రీకరించవలసిన పరిస్థితులలో, జీరో-కనౌలెడ్జి రుజువులు తగిన పరిష్కారం కాదు, మరియు మీకు [బహు-పక్ష గణన](https://en.wikipedia.org/wiki/Secure_multi-party_computation) అవసరం.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

### ధన్యవాదాలు {#acknowledgements}

- అల్వారో అలోన్సో ఈ ఆర్టికల్ యొక్క డ్రాఫ్ట్‌ను చదివి, Zokrates గురించి నా కొన్ని అపార్థాలను తొలగించారు.

మిగిలిన ఏవైనా లోపాలు నా బాధ్యత.
