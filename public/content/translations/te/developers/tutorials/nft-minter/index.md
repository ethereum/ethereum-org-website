---
title: NFT ముద్రించే ట్యుటోరియల్
description: ఈ ట్యుటోరియల్‌లో, మీరు ఒక NFT ముద్రించే అప్లికేషన్‌ను నిర్మిస్తారు మరియు మెటామాస్క్ మరియు Web3 సాధనాలను ఉపయోగించి మీ స్మార్ట్ కాంట్రాక్ట్‌ను React ఫ్రంటెండ్‌కు కనెక్ట్ చేయడం ద్వారా పూర్తి స్టాక్ వికేంద్రీకృత అప్లికేషన్ (dapp)ను ఎలా సృష్టించాలో నేర్చుకుంటారు.
author: "smudgil"
tags: ["solidity", "NFT", "alchemy", "స్మార్ట్ కాంట్రాక్ట్‌లు", "ఫ్రంటెండ్", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: NFT ముద్రించే dapp
lang: te
published: 2021-10-06
---

వెబ్2 నేపథ్యం నుండి వచ్చే డెవలపర్‌లకు ఎదురయ్యే అతిపెద్ద సవాళ్లలో ఒకటి, మీ స్మార్ట్ కాంట్రాక్ట్‌ను ఫ్రంటెండ్ ప్రాజెక్ట్‌కి ఎలా కనెక్ట్ చేయాలి మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలి అని తెలుసుకోవడం.

ఒక NFT ముద్రించే అప్లికేషన్‌ను నిర్మించడం ద్వారా — మీ డిజిటల్ ఆస్తికి లింక్, శీర్షిక మరియు వివరణను ఇన్‌పుట్ చేయగల ఒక సాధారణ UI — మీరు వీటిని ఎలా చేయాలో నేర్చుకుంటారు:

- మీ ఫ్రంటెండ్ ప్రాజెక్ట్ ద్వారా మెటామాస్క్‌కి కనెక్ట్ చేయడం
- మీ ఫ్రంటెండ్ నుండి స్మార్ట్ కాంట్రాక్ట్ పద్ధతులను కాల్ చేయడం
- మెటామాస్క్ ఉపయోగించి లావాదేవీలపై సంతకం చేయడం

ఈ ట్యుటోరియల్‌లో, మేము మా ఫ్రంటెండ్ ఫ్రేమ్‌వర్క్‌గా [React](https://react.dev/)ని ఉపయోగిస్తాము. ఈ ట్యుటోరియల్ ప్రధానంగా Web3 డెవలప్‌మెంట్‌పై దృష్టి సారించినందున, మేము React ప్రాథమికాలను విచ్ఛిన్నం చేయడానికి ఎక్కువ సమయం వెచ్చించము. బదులుగా, మా ప్రాజెక్ట్‌కి కార్యాచరణను తీసుకురావడంపై మేము దృష్టి పెడతాము.

ముందస్తు అవసరంగా, మీకు React గురించి ప్రారంభ-స్థాయి అవగాహన ఉండాలి—కాంపోనెంట్‌లు, ప్రాప్స్, useState/useEffect మరియు ప్రాథమిక ఫంక్షన్ కాలింగ్ ఎలా పనిచేస్తుందో తెలుసుకోవాలి. మీరు ఇంతకు ముందు ఆ పదాలను ఎప్పుడూ వినకపోతే, మీరు ఈ [React పరిచయ ట్యుటోరియల్](https://react.dev/learn/tutorial-tic-tac-toe)ని తనిఖీ చేయవచ్చు. దృశ్యమానంగా నేర్చుకునే వారి కోసం, Net Ninja రూపొందించిన ఈ అద్భుతమైన [పూర్తి ఆధునిక React ట్యుటోరియల్](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) వీడియో సిరీస్‌ని మేము బాగా సిఫార్సు చేస్తున్నాము.

మరియు మీరు ఇప్పటికే అలా చేయకపోతే, ఈ ట్యుటోరియల్‌ని పూర్తి చేయడానికి అలాగే బ్లాక్‌చైన్‌లో దేనినైనా నిర్మించడానికి మీకు ఖచ్చితంగా Alchemy ఖాతా అవసరం. ఉచిత ఖాతా కోసం [ఇక్కడ](https://alchemy.com/) సైన్ అప్ చేయండి.

ఇక ఆలస్యం చేయకుండా, ప్రారంభిద్దాం!

## NFTలను తయారు చేయడం 101 {#making-nfts-101}

మనం ఏదైనా కోడ్‌ని చూడటం ప్రారంభించడానికి ముందే, NFTని తయారు చేయడం ఎలా పనిచేస్తుందో అర్థం చేసుకోవడం ముఖ్యం. ఇందులో రెండు దశలు ఉంటాయి:

### ఎథీరియం బ్లాక్‌చైన్‌లో NFT స్మార్ట్ కాంట్రాక్ట్‌ను ప్రచురించండి {#publish-nft}

రెండు NFT స్మార్ట్ కాంట్రాక్ట్ ప్రమాణాల మధ్య ఉన్న అతిపెద్ద వ్యత్యాసం ఏమిటంటే, ERC-1155 అనేది బహుళ-టోకెన్ ప్రమాణం మరియు బ్యాచ్ కార్యాచరణను కలిగి ఉంటుంది, అయితే ERC-721 అనేది సింగిల్-టోకెన్ ప్రమాణం మరియు అందువల్ల ఒకేసారి ఒక టోకెన్‌ను బదిలీ చేయడానికి మాత్రమే మద్దతు ఇస్తుంది.

### ముద్రించే ఫంక్షన్‌ను కాల్ చేయండి {#minting-function}

సాధారణంగా, ఈ ముద్రించే ఫంక్షన్‌కు మీరు రెండు వేరియబుల్స్‌ను పారామితులుగా పంపాలి, మొదటిది `recipient`, ఇది మీరు కొత్తగా ముద్రించిన NFTని స్వీకరించే చిరునామాను నిర్దేశిస్తుంది మరియు రెండవది NFT యొక్క `tokenURI`, ఇది NFT యొక్క మెటాడేటాను వివరించే JSON డాక్యుమెంట్‌కు పరిష్కరించబడే స్ట్రింగ్.

ఒక NFT యొక్క మెటాడేటా నిజంగా దానికి జీవం పోస్తుంది, దానికి పేరు, వివరణ, చిత్రం (లేదా విభిన్న డిజిటల్ ఆస్తి) మరియు ఇతర లక్షణాలను కలిగి ఉండటానికి అనుమతిస్తుంది. NFT యొక్క మెటాడేటాను కలిగి ఉన్న [tokenURI యొక్క ఉదాహరణ](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) ఇక్కడ ఉంది.

ఈ ట్యుటోరియల్‌లో, మేము మా React UIని ఉపయోగించి ఇప్పటికే ఉన్న NFT యొక్క స్మార్ట్ కాంట్రాక్ట్ ముద్రించే ఫంక్షన్‌ను కాల్ చేయడం అనే భాగం 2పై దృష్టి పెట్టబోతున్నాము.

ఈ ట్యుటోరియల్‌లో మేము కాల్ చేయబోయే ERC-721 NFT స్మార్ట్ కాంట్రాక్ట్‌కి [ఇక్కడ ఒక లింక్](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ఉంది. మేము దీన్ని ఎలా తయారు చేసామో మీరు తెలుసుకోవాలనుకుంటే, మా ఇతర ట్యుటోరియల్ ["NFTని ఎలా సృష్టించాలి"](https://www.alchemy.com/docs/how-to-create-an-nft)ని తనిఖీ చేయాలని మేము బాగా సిఫార్సు చేస్తున్నాము.

అద్భుతం, ఇప్పుడు NFTని తయారు చేయడం ఎలా పనిచేస్తుందో అర్థం చేసుకున్నాము కాబట్టి, మన స్టార్టర్ ఫైల్‌లను క్లోన్ చేద్దాం!

## స్టార్టర్ ఫైల్‌లను క్లోన్ చేయండి {#clone-the-starter-files}

ముందుగా, ఈ ప్రాజెక్ట్ కోసం స్టార్టర్ ఫైల్‌లను పొందడానికి [nft-minter-tutorial GitHub రిపోజిటరీ](https://github.com/alchemyplatform/nft-minter-tutorial)కి వెళ్లండి. ఈ రిపోజిటరీని మీ స్థానిక వాతావరణంలోకి క్లోన్ చేయండి.

మీరు ఈ క్లోన్ చేయబడిన `nft-minter-tutorial` రిపోజిటరీని తెరిచినప్పుడు, అందులో రెండు ఫోల్డర్‌లు ఉన్నాయని మీరు గమనించవచ్చు: `minter-starter-files` మరియు `nft-minter`.

- `minter-starter-files` ఈ ప్రాజెక్ట్ కోసం స్టార్టర్ ఫైల్‌లను (ముఖ్యంగా React UI) కలిగి ఉంటుంది. ఈ ట్యుటోరియల్‌లో, **మేము ఈ డైరెక్టరీలో పని చేస్తాము**, ఎందుకంటే ఈ UIని మీ ఎథీరియం వాలెట్ మరియు NFT స్మార్ట్ కాంట్రాక్ట్‌కి కనెక్ట్ చేయడం ద్వారా దానికి ఎలా జీవం పోయాలో మీరు నేర్చుకుంటారు.
- `nft-minter` మొత్తం పూర్తయిన ట్యుటోరియల్‌ను కలిగి ఉంటుంది మరియు **మీరు ఎక్కడైనా ఇరుక్కుపోతే** మీకు **సూచనగా** ఉంటుంది.

తరువాత, మీ కోడ్ ఎడిటర్‌లో `minter-starter-files` కాపీని తెరవండి, ఆపై మీ `src` ఫోల్డర్‌లోకి నావిగేట్ చేయండి.

మేము వ్రాసే కోడ్ అంతా `src` ఫోల్డర్ క్రింద ఉంటుంది. మా ప్రాజెక్ట్‌కి Web3 కార్యాచరణను అందించడానికి మేము `Minter.js` కాంపోనెంట్‌ను సవరిస్తాము మరియు అదనపు జావాస్క్రిప్ట్ ఫైల్‌లను వ్రాస్తాము.

## దశ 2: మా స్టార్టర్ ఫైల్‌లను తనిఖీ చేయండి {#step-2-check-out-our-starter-files}

మనం కోడింగ్ ప్రారంభించడానికి ముందు, స్టార్టర్ ఫైల్‌లలో మనకు ఇప్పటికే ఏమి అందించబడిందో తనిఖీ చేయడం ముఖ్యం.

### మీ react ప్రాజెక్ట్‌ను రన్ చేయండి {#get-your-react-project-running}

మన బ్రౌజర్‌లో React ప్రాజెక్ట్‌ను రన్ చేయడం ద్వారా ప్రారంభిద్దాం. React యొక్క అందం ఏమిటంటే, మన ప్రాజెక్ట్ మన బ్రౌజర్‌లో రన్ అయిన తర్వాత, మనం సేవ్ చేసే ఏవైనా మార్పులు మన బ్రౌజర్‌లో ప్రత్యక్షంగా నవీకరించబడతాయి.

ప్రాజెక్ట్‌ను రన్ చేయడానికి, `minter-starter-files` ఫోల్డర్ యొక్క రూట్ డైరెక్టరీకి నావిగేట్ చేయండి మరియు ప్రాజెక్ట్ యొక్క డిపెండెన్సీలను ఇన్‌స్టాల్ చేయడానికి మీ టెర్మినల్‌లో `npm install` ని రన్ చేయండి:

```bash
cd minter-starter-files
npm install
```

అవి ఇన్‌స్టాల్ చేయడం పూర్తయిన తర్వాత, మీ టెర్మినల్‌లో `npm start` ని రన్ చేయండి:

```bash
npm start
```

అలా చేయడం వల్ల మీ బ్రౌజర్‌లో http://localhost:3000/ తెరవబడుతుంది, ఇక్కడ మీరు మా ప్రాజెక్ట్ కోసం ఫ్రంటెండ్‌ను చూస్తారు. ఇది 3 ఫీల్డ్‌లను కలిగి ఉండాలి: మీ NFT ఆస్తికి లింక్‌ను ఇన్‌పుట్ చేయడానికి ఒక స్థలం, మీ NFT పేరును నమోదు చేయడం మరియు వివరణను అందించడం.

మీరు "Connect Wallet" లేదా "Mint NFT" బటన్‌లను క్లిక్ చేయడానికి ప్రయత్నిస్తే, అవి పని చేయవని మీరు గమనించవచ్చు—ఎందుకంటే మేము ఇంకా వాటి కార్యాచరణను ప్రోగ్రామ్ చేయాల్సి ఉంది! :\)

### Minter.js కాంపోనెంట్ {#minter-js}

**గమనిక:** మీరు `nft-minter` ఫోల్డర్‌లో కాకుండా `minter-starter-files` ఫోల్డర్‌లో ఉన్నారని నిర్ధారించుకోండి!

మన ఎడిటర్‌లోని `src` ఫోల్డర్‌కి తిరిగి వెళ్లి `Minter.js` ఫైల్‌ను తెరుద్దాం. ఈ ఫైల్‌లోని ప్రతిదీ మనం అర్థం చేసుకోవడం చాలా ముఖ్యం, ఎందుకంటే ఇది మనం పని చేసే ప్రాథమిక React కాంపోనెంట్.

ఈ ఫైల్ ఎగువన, నిర్దిష్ట ఈవెంట్‌ల తర్వాత మనం అప్‌డేట్ చేసే మన స్థితి వేరియబుల్స్ ఉన్నాయి.

```javascript
//స్థితి వేరియబుల్స్
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React స్థితి వేరియబుల్స్ లేదా స్థితి హుక్స్ గురించి ఎప్పుడూ వినలేదా? [ఈ](https://legacy.reactjs.org/docs/hooks-state.html) డాక్యుమెంట్‌లను తనిఖీ చేయండి.

ప్రతి వేరియబుల్ దేనిని సూచిస్తుందో ఇక్కడ ఉంది:

- `walletAddress` - వినియోగదారు వాలెట్ చిరునామాను నిల్వ చేసే స్ట్రింగ్
- `status` - UI దిగువన ప్రదర్శించడానికి సందేశాన్ని కలిగి ఉన్న స్ట్రింగ్
- `name` - NFT పేరును నిల్వ చేసే స్ట్రింగ్
- `description` - NFT వివరణను నిల్వ చేసే స్ట్రింగ్
- `url` - NFT యొక్క డిజిటల్ ఆస్తికి లింక్ అయిన స్ట్రింగ్

స్థితి వేరియబుల్స్ తర్వాత, మీరు అమలు చేయని మూడు ఫంక్షన్‌లను చూస్తారు: `useEffect`, `connectWalletPressed` మరియు `onMintPressed`. ఈ ఫంక్షన్‌లన్నీ `async` అని మీరు గమనించవచ్చు, ఎందుకంటే మేము వాటిలో అసమకాలిక API కాల్‌లను చేస్తాము! వాటి పేర్లు వాటి కార్యాచరణలకు అనుగుణంగా ఉంటాయి:

```javascript
useEffect(async () => {
  //TODO: అమలు చేయాలి
}, [])

const connectWalletPressed = async () => {
  //TODO: అమలు చేయాలి
}

const onMintPressed = async () => {
  //TODO: అమలు చేయాలి
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - ఇది మీ కాంపోనెంట్ రెండర్ చేయబడిన తర్వాత కాల్ చేయబడే React హుక్. దీనికి ఖాళీ శ్రేణి `[]` ప్రాప్ పంపబడినందున (లైన్ 3 చూడండి), ఇది కాంపోనెంట్ యొక్క _మొదటి_ రెండర్‌లో మాత్రమే కాల్ చేయబడుతుంది. వాలెట్ ఇప్పటికే కనెక్ట్ చేయబడిందో లేదో ప్రతిబింబించేలా మా UIని అప్‌డేట్ చేయడానికి ఇక్కడ మేము మా వాలెట్ లిజనర్‌ను మరియు మరొక వాలెట్ ఫంక్షన్‌ను కాల్ చేస్తాము.
- `connectWalletPressed` - వినియోగదారు మెటామాస్క్ వాలెట్‌ను మా dappకి కనెక్ట్ చేయడానికి ఈ ఫంక్షన్ కాల్ చేయబడుతుంది.
- `onMintPressed` - వినియోగదారు NFTని ముద్రించడానికి ఈ ఫంక్షన్ కాల్ చేయబడుతుంది.

ఈ ఫైల్ ముగింపుకు సమీపంలో, మా కాంపోనెంట్ యొక్క UI ఉంది. మీరు ఈ కోడ్‌ను జాగ్రత్తగా స్కాన్ చేస్తే, వాటి సంబంధిత టెక్స్ట్ ఫీల్డ్‌లలో ఇన్‌పుట్ మారినప్పుడు మేము మా `url`, `name` మరియు `description` స్థితి వేరియబుల్స్‌ను అప్‌డేట్ చేస్తామని మీరు గమనించవచ్చు.

`mintButton` మరియు `walletButton` IDలు ఉన్న బటన్‌లను క్లిక్ చేసినప్పుడు వరుసగా `connectWalletPressed` మరియు `onMintPressed` కాల్ చేయబడతాయని కూడా మీరు చూస్తారు.

```javascript
//మన కాంపోనెంట్ యొక్క UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

చివరగా, ఈ Minter కాంపోనెంట్ ఎక్కడ జోడించబడిందో చూద్దాం.

మీరు `App.js` ఫైల్‌కి వెళితే, ఇది ఇతర కాంపోనెంట్‌లన్నింటికీ కంటైనర్‌గా పనిచేసే Reactలోని ప్రధాన కాంపోనెంట్, మా Minter కాంపోనెంట్ లైన్ 7లో ఇంజెక్ట్ చేయబడిందని మీరు చూస్తారు.

**ఈ ట్యుటోరియల్‌లో, మేము `Minter.js file` ని మాత్రమే సవరిస్తాము మరియు మా `src` ఫోల్డర్‌లో ఫైల్‌లను జోడిస్తాము.**

ఇప్పుడు మనం దేనితో పని చేస్తున్నామో అర్థం చేసుకున్నాము కాబట్టి, మన ఎథీరియం వాలెట్‌ను సెటప్ చేద్దాం!

## మీ ఎథీరియం వాలెట్‌ను సెటప్ చేయండి {#set-up-your-ethereum-wallet}

వినియోగదారులు మీ స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వాలంటే వారు తమ ఎథీరియం వాలెట్‌ను మీ dappకి కనెక్ట్ చేయాలి.

### మెటామాస్క్ డౌన్‌లోడ్ చేయండి {#download-metamask}

ఈ ట్యుటోరియల్ కోసం, మేము మెటామాస్క్‌ని ఉపయోగిస్తాము, ఇది మీ ఎథీరియం ఖాతా చిరునామాను నిర్వహించడానికి ఉపయోగించే బ్రౌజర్‌లోని వర్చువల్ వాలెట్. ఎథీరియంలో లావాదేవీలు ఎలా పనిచేస్తాయో మీరు మరింత అర్థం చేసుకోవాలనుకుంటే, [ఈ పేజీని](/developers/docs/transactions/) తనిఖీ చేయండి.

మీరు [ఇక్కడ](https://metamask.io/download) ఉచితంగా మెటామాస్క్ ఖాతాను డౌన్‌లోడ్ చేసి సృష్టించవచ్చు. మీరు ఖాతాను సృష్టిస్తున్నప్పుడు లేదా మీకు ఇప్పటికే ఖాతా ఉంటే, ఎగువ కుడివైపున ఉన్న “Ropsten Test Network”కి మారాలని నిర్ధారించుకోండి \(తద్వారా మేము నిజమైన డబ్బుతో వ్యవహరించము\).

### ఫాసెట్ నుండి ఈథర్‌ను జోడించండి {#add-ether-from-faucet}

మా NFTలను ముద్రించడానికి (లేదా ఎథీరియం బ్లాక్‌చైన్‌లో ఏవైనా లావాదేవీలపై సంతకం చేయడానికి), మాకు కొంత నకిలీ Eth అవసరం. Eth పొందడానికి మీరు [Ropsten ఫాసెట్](https://faucet.ropsten.be/)కి వెళ్లి మీ Ropsten ఖాతా చిరునామాను నమోదు చేయవచ్చు, ఆపై “Send Ropsten Eth” క్లిక్ చేయండి. ఆ తర్వాత కొద్దిసేపటికే మీ మెటామాస్క్ ఖాతాలో Ethని మీరు చూడాలి!

### మీ బ్యాలెన్స్‌ని తనిఖీ చేయండి {#check-your-balance}

మా బ్యాలెన్స్ అక్కడ ఉందో లేదో ఒకటికి రెండుసార్లు తనిఖీ చేయడానికి, [Alchemy యొక్క కంపోజర్ సాధనాన్ని](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ఉపయోగించి [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) అభ్యర్థనను చేద్దాం. ఇది మా వాలెట్‌లోని Eth మొత్తాన్ని అందిస్తుంది. మీరు మీ మెటామాస్క్ ఖాతా చిరునామాను ఇన్‌పుట్ చేసి, “Send Request” క్లిక్ చేసిన తర్వాత, మీరు ఇలాంటి ప్రతిస్పందనను చూడాలి:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**గమనిక:** ఈ ఫలితం Weiలో ఉంది ethలో కాదు. ఈథర్ యొక్క అతిచిన్న విలువగా Wei ఉపయోగించబడుతుంది. Wei నుండి ethకి మార్పిడి: 1 eth = 10¹⁸ Wei. కాబట్టి మనం 0xde0b6b3a7640000 ని దశాంశానికి మార్చినట్లయితే మనకు 1\*10¹⁸ వస్తుంది, ఇది 1 ethకి సమానం.

హమ్మయ్య! మన నకిలీ డబ్బు అంతా అక్కడే ఉంది! <Emoji text=":money_mouth_face:" size={1} />

## మీ UIకి మెటామాస్క్‌ని కనెక్ట్ చేయండి {#connect-metamask-to-your-ui}

ఇప్పుడు మన మెటామాస్క్ వాలెట్ సెటప్ చేయబడింది కాబట్టి, మన dappని దానికి కనెక్ట్ చేద్దాం!

మేము [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) నమూనాను సూచించాలనుకుంటున్నందున, మా dapp యొక్క లాజిక్, డేటా మరియు నియమాలను నిర్వహించడానికి మా ఫంక్షన్‌లను కలిగి ఉన్న ప్రత్యేక ఫైల్‌ను సృష్టించబోతున్నాము, ఆపై ఆ ఫంక్షన్‌లను మా ఫ్రంటెండ్‌కు (మా Minter.js కాంపోనెంట్) పంపుతాము.

### `connectWallet` ఫంక్షన్ {#connect-wallet-function}

అలా చేయడానికి, మీ `src` డైరెక్టరీలో `utils` అనే కొత్త ఫోల్డర్‌ను సృష్టిద్దాం మరియు దాని లోపల `interact.js` అనే ఫైల్‌ను జోడిద్దాం, ఇది మా వాలెట్ మరియు స్మార్ట్ కాంట్రాక్ట్ ఇంటరాక్షన్ ఫంక్షన్‌లన్నింటినీ కలిగి ఉంటుంది.

మా `interact.js` ఫైల్‌లో, మేము `connectWallet` ఫంక్షన్‌ను వ్రాస్తాము, దానిని మేము మా `Minter.js` కాంపోనెంట్‌లో దిగుమతి చేసి కాల్ చేస్తాము.

మీ `interact.js` ఫైల్‌లో, కింది వాటిని జోడించండి

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

ఈ కోడ్ ఏమి చేస్తుందో విచ్ఛిన్నం చేద్దాం:

ముందుగా, మా ఫంక్షన్ మీ బ్రౌజర్‌లో `window.ethereum` ప్రారంభించబడిందో లేదో తనిఖీ చేస్తుంది.

`window.ethereum` అనేది మెటామాస్క్ మరియు ఇతర వాలెట్ ప్రొవైడర్‌ల ద్వారా ఇంజెక్ట్ చేయబడిన గ్లోబల్ API, ఇది వినియోగదారుల ఎథీరియం ఖాతాలను అభ్యర్థించడానికి వెబ్‌సైట్‌లను అనుమతిస్తుంది. ఆమోదించబడితే, ఇది వినియోగదారు కనెక్ట్ చేయబడిన బ్లాక్‌చైన్‌ల నుండి డేటాను చదవగలదు మరియు వినియోగదారు సందేశాలు మరియు లావాదేవీలపై సంతకం చేయాలని సూచించగలదు. మరింత సమాచారం కోసం [మెటామాస్క్ డాక్యుమెంట్‌లను](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) తనిఖీ చేయండి!

`window.ethereum` _లేకపోతే_, మెటామాస్క్ ఇన్‌స్టాల్ చేయబడలేదని అర్థం. దీని ఫలితంగా JSON ఆబ్జెక్ట్ అందించబడుతుంది, ఇక్కడ అందించబడిన `address` ఖాళీ స్ట్రింగ్, మరియు `status` JSX ఆబ్జెక్ట్ వినియోగదారు తప్పనిసరిగా మెటామాస్క్‌ని ఇన్‌స్టాల్ చేయాలని తెలియజేస్తుంది.

**మేము వ్రాసే చాలా ఫంక్షన్‌లు మా స్థితి వేరియబుల్స్ మరియు UIని అప్‌డేట్ చేయడానికి ఉపయోగించగల JSON ఆబ్జెక్ట్‌లను అందిస్తాయి.**

ఇప్పుడు `window.ethereum` _ఉంటే_, అప్పుడే విషయాలు ఆసక్తికరంగా మారుతాయి.

try/catch లూప్‌ని ఉపయోగించి, [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) ని కాల్ చేయడం ద్వారా మెటామాస్క్‌కి కనెక్ట్ చేయడానికి ప్రయత్నిస్తాము. ఈ ఫంక్షన్‌ను కాల్ చేయడం వల్ల బ్రౌజర్‌లో మెటామాస్క్ తెరవబడుతుంది, తద్వారా వినియోగదారు తమ వాలెట్‌ను మీ dappకి కనెక్ట్ చేయమని ప్రాంప్ట్ చేయబడతారు.

- వినియోగదారు కనెక్ట్ చేయడానికి ఎంచుకుంటే, `method: "eth_requestAccounts"` dappకి కనెక్ట్ చేయబడిన వినియోగదారు ఖాతా చిరునామాలన్నింటినీ కలిగి ఉన్న శ్రేణిని అందిస్తుంది. మొత్తంగా, మా `connectWallet` ఫంక్షన్ ఈ శ్రేణిలోని _మొదటి_ `address` ని కలిగి ఉన్న JSON ఆబ్జెక్ట్‌ను \(లైన్ 9 చూడండి\) మరియు స్మార్ట్ కాంట్రాక్ట్‌కు సందేశాన్ని వ్రాయమని వినియోగదారుని ప్రాంప్ట్ చేసే `status` సందేశాన్ని అందిస్తుంది.
- వినియోగదారు కనెక్షన్‌ను తిరస్కరిస్తే, JSON ఆబ్జెక్ట్ అందించబడిన `address` కోసం ఖాళీ స్ట్రింగ్‌ను మరియు వినియోగదారు కనెక్షన్‌ను తిరస్కరించారని ప్రతిబింబించే `status` సందేశాన్ని కలిగి ఉంటుంది.

### మీ Minter.js UI కాంపోనెంట్‌కి connectWallet ఫంక్షన్‌ను జోడించండి {#add-connect-wallet}

ఇప్పుడు మనం ఈ `connectWallet` ఫంక్షన్‌ను వ్రాసాము కాబట్టి, దాన్ని మన `Minter.js.` కాంపోనెంట్‌కి కనెక్ట్ చేద్దాం.

ముందుగా, `Minter.js` ఫైల్ ఎగువన `import { connectWallet } from "./utils/interact.js";` ని జోడించడం ద్వారా మన ఫంక్షన్‌ను మన `Minter.js` ఫైల్‌లోకి దిగుమతి చేసుకోవాలి. మీ `Minter.js` యొక్క మొదటి 11 పంక్తులు ఇప్పుడు ఇలా ఉండాలి:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //స్థితి వేరియబుల్స్
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

అప్పుడు, మా `connectWalletPressed` ఫంక్షన్ లోపల, మేము దిగుమతి చేసుకున్న `connectWallet` ఫంక్షన్‌ను ఇలా కాల్ చేస్తాము:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

`interact.js` ఫైల్ నుండి మా `Minter.js` కాంపోనెంట్ నుండి మా కార్యాచరణలో ఎక్కువ భాగం ఎలా సంగ్రహించబడిందో గమనించారా? మేము M-V-C నమూనాకు కట్టుబడి ఉండటమే దీనికి కారణం!

`connectWalletPressed` లో, మేము దిగుమతి చేసుకున్న `connectWallet` ఫంక్షన్‌కి కేవలం await కాల్ చేస్తాము మరియు దాని ప్రతిస్పందనను ఉపయోగించి, వాటి స్థితి హుక్స్ ద్వారా మా `status` మరియు `walletAddress` వేరియబుల్స్‌ను అప్‌డేట్ చేస్తాము.

ఇప్పుడు, `Minter.js` మరియు `interact.js` ఫైల్‌ల రెండింటినీ సేవ్ చేద్దాం మరియు ఇప్పటివరకు మా UIని పరీక్షిద్దాం.

మీ బ్రౌజర్‌ను localhost:3000లో తెరవండి మరియు పేజీ ఎగువ కుడివైపున ఉన్న "Connect Wallet" బటన్‌ను నొక్కండి.

మీరు మెటామాస్క్‌ని ఇన్‌స్టాల్ చేసి ఉంటే, మీ వాలెట్‌ను మీ dappకి కనెక్ట్ చేయమని మిమ్మల్ని ప్రాంప్ట్ చేయాలి. కనెక్ట్ చేయడానికి ఆహ్వానాన్ని అంగీకరించండి.

వాలెట్ బటన్ ఇప్పుడు మీ చిరునామా కనెక్ట్ చేయబడిందని ప్రతిబింబించడాన్ని మీరు చూడాలి.

తరువాత, పేజీని రిఫ్రెష్ చేయడానికి ప్రయత్నించండి... ఇది వింతగా ఉంది. మా వాలెట్ బటన్ ఇప్పటికే కనెక్ట్ చేయబడినప్పటికీ, మెటామాస్క్‌ని కనెక్ట్ చేయమని మమ్మల్ని ప్రాంప్ట్ చేస్తోంది...

అయితే చింతించకండి! `getCurrentWalletConnected` అనే ఫంక్షన్‌ను అమలు చేయడం ద్వారా మేము దాన్ని సులభంగా పరిష్కరించగలము, ఇది మా dappకి చిరునామా ఇప్పటికే కనెక్ట్ చేయబడిందో లేదో తనిఖీ చేస్తుంది మరియు తదనుగుణంగా మా UIని అప్‌డేట్ చేస్తుంది!

### getCurrentWalletConnected ఫంక్షన్ {#get-current-wallet}

మీ `interact.js` ఫైల్‌లో, కింది `getCurrentWalletConnected` ఫంక్షన్‌ను జోడించండి:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

ఈ కోడ్ మనం ఇంతకు ముందు వ్రాసిన `connectWallet` ఫంక్షన్‌కి _చాలా_ పోలి ఉంటుంది.

ప్రధాన వ్యత్యాసం ఏమిటంటే, వినియోగదారు తమ వాలెట్‌ను కనెక్ట్ చేయడానికి మెటామాస్క్‌ను తెరిచే `eth_requestAccounts` పద్ధతిని కాల్ చేయడానికి బదులుగా, ఇక్కడ మేము `eth_accounts` పద్ధతిని కాల్ చేస్తాము, ఇది ప్రస్తుతం మా dappకి కనెక్ట్ చేయబడిన మెటామాస్క్ చిరునామాలను కలిగి ఉన్న శ్రేణిని అందిస్తుంది.

ఈ ఫంక్షన్ పని చేయడాన్ని చూడటానికి, మా `Minter.js` కాంపోనెంట్ యొక్క `useEffect` ఫంక్షన్‌లో దాన్ని కాల్ చేద్దాం.

మేము `connectWallet` కోసం చేసినట్లుగా, మేము ఈ ఫంక్షన్‌ను మా `interact.js` ఫైల్ నుండి మా `Minter.js` ఫైల్‌లోకి ఇలా దిగుమతి చేసుకోవాలి:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //ఇక్కడ దిగుమతి చేయండి
} from "./utils/interact.js"
```

ఇప్పుడు, మేము దానిని మా `useEffect` ఫంక్షన్‌లో కాల్ చేస్తాము:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

గమనించండి, మా `walletAddress` మరియు `status` స్థితి వేరియబుల్స్‌ను అప్‌డేట్ చేయడానికి మేము `getCurrentWalletConnected` కి మా కాల్ యొక్క ప్రతిస్పందనను ఉపయోగిస్తాము.

మీరు ఈ కోడ్‌ని జోడించిన తర్వాత, మా బ్రౌజర్ విండోను రిఫ్రెష్ చేయడానికి ప్రయత్నించండి. బటన్ మీరు కనెక్ట్ చేయబడ్డారని చెప్పాలి మరియు మీరు రిఫ్రెష్ చేసిన తర్వాత కూడా - మీ కనెక్ట్ చేయబడిన వాలెట్ చిరునామా యొక్క ప్రివ్యూను చూపాలి!

### addWalletListener ని అమలు చేయండి {#implement-add-wallet-listener}

మా dapp వాలెట్ సెటప్‌లో చివరి దశ వాలెట్ లిజనర్‌ను అమలు చేయడం, తద్వారా వినియోగదారు డిస్‌కనెక్ట్ చేసినప్పుడు లేదా ఖాతాలను మార్చినప్పుడు వంటి మా వాలెట్ స్థితి మారినప్పుడు మా UI అప్‌డేట్ అవుతుంది.

మీ `Minter.js` ఫైల్‌లో, కింది విధంగా కనిపించే `addWalletListener` ఫంక్షన్‌ను జోడించండి:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

ఇక్కడ ఏమి జరుగుతుందో త్వరగా విచ్ఛిన్నం చేద్దాం:

- ముందుగా, మా ఫంక్షన్ `window.ethereum` ప్రారంభించబడిందో లేదో తనిఖీ చేస్తుంది \(అంటే, మెటామాస్క్ ఇన్‌స్టాల్ చేయబడింది\).
  - లేకపోతే, మేము మా `status` స్థితి వేరియబుల్‌ను మెటామాస్క్‌ని ఇన్‌స్టాల్ చేయమని వినియోగదారుని ప్రాంప్ట్ చేసే JSX స్ట్రింగ్‌కి సెట్ చేస్తాము.
  - ఇది ప్రారంభించబడితే, మేము లైన్ 3లో `window.ethereum.on("accountsChanged")` లిజనర్‌ను సెటప్ చేస్తాము, ఇది మెటామాస్క్ వాలెట్‌లోని స్థితి మార్పులను వింటుంది, ఇందులో వినియోగదారు dappకి అదనపు ఖాతాను కనెక్ట్ చేసినప్పుడు, ఖాతాలను మార్చినప్పుడు లేదా ఖాతాను డిస్‌కనెక్ట్ చేసినప్పుడు ఉంటాయి. కనీసం ఒక ఖాతా కనెక్ట్ చేయబడి ఉంటే, `walletAddress` స్థితి వేరియబుల్ లిజనర్ అందించిన `accounts` శ్రేణిలోని మొదటి ఖాతాగా అప్‌డేట్ చేయబడుతుంది. లేకపోతే, `walletAddress` ఖాళీ స్ట్రింగ్‌గా సెట్ చేయబడుతుంది.

చివరగా, మేము దానిని మా `useEffect` ఫంక్షన్‌లో కాల్ చేయాలి:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

మరియు అంతే! మేము మా వాలెట్ కార్యాచరణ అంతటినీ ప్రోగ్రామింగ్ చేయడం పూర్తి చేసాము! ఇప్పుడు మా వాలెట్ సెటప్ చేయబడింది కాబట్టి, మా NFTని ఎలా ముద్రించాలో తెలుసుకుందాం!

## NFT మెటాడేటా 101 {#nft-metadata-101}

కాబట్టి ఈ ట్యుటోరియల్ యొక్క దశ 0లో మనం మాట్లాడుకున్న NFT మెటాడేటాను గుర్తుంచుకోండి—ఇది NFTకి జీవం పోస్తుంది, డిజిటల్ ఆస్తి, పేరు, వివరణ మరియు ఇతర లక్షణాల వంటి లక్షణాలను కలిగి ఉండటానికి అనుమతిస్తుంది.

మేము ఈ మెటాడేటాను JSON ఆబ్జెక్ట్‌గా కాన్ఫిగర్ చేసి నిల్వ చేయాలి, తద్వారా మా స్మార్ట్ కాంట్రాక్ట్ యొక్క `mintNFT` ఫంక్షన్‌ను కాల్ చేస్తున్నప్పుడు మేము దానిని `tokenURI` పరామితిగా పంపగలము.

"Link to Asset", "Name", "Description" ఫీల్డ్‌లలోని వచనం మా NFT మెటాడేటా యొక్క విభిన్న లక్షణాలను కలిగి ఉంటుంది. మేము ఈ మెటాడేటాను JSON ఆబ్జెక్ట్‌గా ఫార్మాట్ చేస్తాము, అయితే ఈ JSON ఆబ్జెక్ట్‌ను మనం ఎక్కడ నిల్వ చేయవచ్చో దానికి రెండు ఎంపికలు ఉన్నాయి:

- మేము దానిని ఎథీరియం బ్లాక్‌చైన్‌లో నిల్వ చేయవచ్చు; అయితే, అలా చేయడం చాలా ఖరీదైనది.
- మేము దానిని AWS లేదా Firebase వంటి కేంద్రీకృత సర్వర్‌లో నిల్వ చేయవచ్చు. కానీ అది మన వికేంద్రీకరణ నైతికతను దెబ్బతీస్తుంది.
- పంపిణీ చేయబడిన ఫైల్ సిస్టమ్‌లో డేటాను నిల్వ చేయడానికి మరియు భాగస్వామ్యం చేయడానికి వికేంద్రీకృత ప్రోటోకాల్ మరియు పీర్-టు-పీర్ నెట్‌వర్క్ అయిన IPFSని మేము ఉపయోగించవచ్చు. ఈ ప్రోటోకాల్ వికేంద్రీకృతమైనది మరియు ఉచితం కాబట్టి, ఇది మా ఉత్తమ ఎంపిక!

మా మెటాడేటాను IPFSలో నిల్వ చేయడానికి, మేము అనుకూలమైన IPFS API మరియు టూల్‌కిట్ అయిన [Pinata](https://pinata.cloud/)ని ఉపయోగిస్తాము. తదుపరి దశలో, దీన్ని ఖచ్చితంగా ఎలా చేయాలో మేము వివరిస్తాము!

## మీ మెటాడేటాను IPFSకి పిన్ చేయడానికి Pinataని ఉపయోగించండి {#use-pinata-to-pin-your-metadata-to-ipfs}

మీకు [Pinata](https://pinata.cloud/) ఖాతా లేకపోతే, ఉచిత ఖాతా కోసం [ఇక్కడ](https://app.pinata.cloud/auth/signup) సైన్ అప్ చేయండి మరియు మీ ఇమెయిల్ మరియు ఖాతాను ధృవీకరించడానికి దశలను పూర్తి చేయండి.

### మీ Pinata API కీని సృష్టించండి {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) పేజీకి నావిగేట్ చేయండి, ఆపై ఎగువన ఉన్న "New Key" బటన్‌ను ఎంచుకోండి, అడ్మిన్ విడ్జెట్‌ను ప్రారంభించబడినట్లుగా సెట్ చేయండి మరియు మీ కీకి పేరు పెట్టండి.

అప్పుడు మీకు మీ API సమాచారంతో కూడిన పాపప్ చూపబడుతుంది. దీన్ని సురక్షితమైన చోట ఉంచారని నిర్ధారించుకోండి.

ఇప్పుడు మా కీ సెటప్ చేయబడింది కాబట్టి, దాన్ని మా ప్రాజెక్ట్‌కి జోడిద్దాం, తద్వారా మేము దాన్ని ఉపయోగించవచ్చు.

### .env ఫైల్‌ను సృష్టించండి {#create-a-env}

మేము మా Pinata కీ మరియు రహస్యాన్ని పర్యావరణ ఫైల్‌లో సురక్షితంగా నిల్వ చేయవచ్చు. మీ ప్రాజెక్ట్ డైరెక్టరీలో [dotenv ప్యాకేజీని](https://www.npmjs.com/package/dotenv) ఇన్‌స్టాల్ చేద్దాం.

మీ టెర్మినల్‌లో కొత్త ట్యాబ్‌ను తెరవండి \(లోకల్ హోస్ట్‌ను రన్ చేస్తున్న దాని నుండి వేరుగా\) మరియు మీరు `minter-starter-files` ఫోల్డర్‌లో ఉన్నారని నిర్ధారించుకోండి, ఆపై మీ టెర్మినల్‌లో కింది ఆదేశాన్ని రన్ చేయండి:

```text
npm install dotenv --save
```

తరువాత, మీ కమాండ్ లైన్‌లో కింది వాటిని నమోదు చేయడం ద్వారా మీ `minter-starter-files` యొక్క రూట్ డైరెక్టరీలో `.env` ఫైల్‌ను సృష్టించండి:

```javascript
vim.env
```

ఇది vim \(టెక్స్ట్ ఎడిటర్\)లో మీ `.env` ఫైల్‌ను తెరుస్తుంది. దాన్ని సేవ్ చేయడానికి మీ కీబోర్డ్‌లో అదే క్రమంలో "esc" + ":" + "q" నొక్కండి.

తరువాత, VSCodeలో, మీ `.env` ఫైల్‌కి నావిగేట్ చేయండి మరియు దానికి మీ Pinata API కీ మరియు API రహస్యాన్ని ఇలా జోడించండి:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ఫైల్‌ను సేవ్ చేయండి, ఆపై మీ JSON మెటాడేటాను IPFSకి అప్‌లోడ్ చేయడానికి ఫంక్షన్‌ను వ్రాయడం ప్రారంభించడానికి మీరు సిద్ధంగా ఉన్నారు!

### pinJSONToIPFS ని అమలు చేయండి {#pin-json-to-ipfs}

అదృష్టవశాత్తూ, Pinata [IPFSకి JSON డేటాను అప్‌లోడ్ చేయడానికి ప్రత్యేకంగా ఒక APIని](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) మరియు కొన్ని స్వల్ప మార్పులతో మనం ఉపయోగించగల axios ఉదాహరణతో అనుకూలమైన JavaScriptని కలిగి ఉంది.

మీ `utils` ఫోల్డర్‌లో, `pinata.js` అనే మరొక ఫైల్‌ను సృష్టిద్దాం, ఆపై .env ఫైల్ నుండి మా Pinata రహస్యం మరియు కీని ఇలా దిగుమతి చేద్దాం:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

తరువాత, దిగువ నుండి అదనపు కోడ్‌ను మీ `pinata.js` ఫైల్‌లో అతికించండి. చింతించకండి, ప్రతిదాని అర్థం ఏమిటో మేము విచ్ఛిన్నం చేస్తాము!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinata కు axios POST అభ్యర్థన చేయడం ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

కాబట్టి ఈ కోడ్ ఖచ్చితంగా ఏమి చేస్తుంది?

ముందుగా, ఇది బ్రౌజర్ మరియు node.js కోసం ప్రామిస్ ఆధారిత HTTP క్లయింట్ అయిన [axios](https://www.npmjs.com/package/axios)ని దిగుమతి చేస్తుంది, దీనిని మేము Pinataకి అభ్యర్థన చేయడానికి ఉపయోగిస్తాము.

అప్పుడు మాకు మా అసమకాలిక ఫంక్షన్ `pinJSONToIPFS` ఉంది, ఇది `JSONBody` ని దాని ఇన్‌పుట్‌గా మరియు Pinata api కీ మరియు రహస్యాన్ని దాని హెడర్‌లో తీసుకుంటుంది, ఇవన్నీ వారి `pinJSONToIPFS` APIకి POST అభ్యర్థన చేయడానికి.

- ఈ POST అభ్యర్థన విజయవంతమైతే, మా ఫంక్షన్ `success` బూలియన్‌ను trueగా మరియు మా మెటాడేటా పిన్ చేయబడిన `pinataUrl` తో JSON ఆబ్జెక్ట్‌ను అందిస్తుంది. మేము అందించబడిన ఈ `pinataUrl` ని మా స్మార్ట్ కాంట్రాక్ట్ యొక్క ముద్రించే ఫంక్షన్‌కు `tokenURI` ఇన్‌పుట్‌గా ఉపయోగిస్తాము.
- ఈ పోస్ట్ అభ్యర్థన విఫలమైతే, మా ఫంక్షన్ `success` బూలియన్‌ను falseగా మరియు మా లోపాన్ని తెలియజేసే `message` స్ట్రింగ్‌తో JSON ఆబ్జెక్ట్‌ను అందిస్తుంది.

మా `connectWallet` ఫంక్షన్ రిటర్న్ రకాల మాదిరిగానే, మేము JSON ఆబ్జెక్ట్‌లను అందిస్తున్నాము, తద్వారా మా స్థితి వేరియబుల్స్ మరియు UIని అప్‌డేట్ చేయడానికి మేము వాటి పారామితులను ఉపయోగించవచ్చు.

## మీ స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయండి {#load-your-smart-contract}

ఇప్పుడు మా `pinJSONToIPFS` ఫంక్షన్ ద్వారా మా NFT మెటాడేటాను IPFSకి అప్‌లోడ్ చేయడానికి మాకు ఒక మార్గం ఉంది కాబట్టి, మా స్మార్ట్ కాంట్రాక్ట్ యొక్క ఉదాహరణను లోడ్ చేయడానికి మాకు ఒక మార్గం అవసరం, తద్వారా మేము దాని `mintNFT` ఫంక్షన్‌ను కాల్ చేయవచ్చు.

మేము ఇంతకు ముందు చెప్పినట్లుగా, ఈ ట్యుటోరియల్‌లో మేము [ఇప్పటికే ఉన్న ఈ NFT స్మార్ట్ కాంట్రాక్ట్‌ను](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ఉపయోగిస్తాము; అయితే, మేము దీన్ని ఎలా తయారు చేసామో మీరు తెలుసుకోవాలనుకుంటే లేదా మీరే స్వయంగా తయారు చేయాలనుకుంటే, మా ఇతర ట్యుటోరియల్ ["NFTని ఎలా సృష్టించాలి"](https://www.alchemy.com/docs/how-to-create-an-nft)ని తనిఖీ చేయాలని మేము బాగా సిఫార్సు చేస్తున్నాము.

### కాంట్రాక్ట్ ABI {#contract-abi}

మీరు మా ఫైల్‌లను నిశితంగా పరిశీలిస్తే, మా `src` డైరెక్టరీలో `contract-abi.json` ఫైల్ ఉందని మీరు గమనించి ఉంటారు. కాంట్రాక్ట్ ఏ ఫంక్షన్‌ను అమలు చేస్తుందో పేర్కొనడానికి అలాగే ఫంక్షన్ మీరు ఆశించే ఆకృతిలో డేటాను అందిస్తుందని నిర్ధారించడానికి ABI అవసరం.

ఎథీరియం బ్లాక్‌చైన్‌కి కనెక్ట్ చేయడానికి మరియు మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి మాకు Alchemy API కీ మరియు Alchemy Web3 API కూడా అవసరం.

### మీ Alchemy API కీని సృష్టించండి {#create-alchemy-api}

మీకు ఇప్పటికే Alchemy ఖాతా లేకపోతే, [ఇక్కడ ఉచితంగా సైన్ అప్ చేయండి.](https://alchemy.com/?a=eth-org-nft-minter)

మీరు Alchemy ఖాతాను సృష్టించిన తర్వాత, మీరు యాప్‌ను సృష్టించడం ద్వారా API కీని రూపొందించవచ్చు. ఇది Ropsten టెస్ట్ నెట్‌వర్క్‌కి అభ్యర్థనలు చేయడానికి మమ్మల్ని అనుమతిస్తుంది.

నావ్ బార్‌లోని “Apps”పై హోవర్ చేసి, “Create App” క్లిక్ చేయడం ద్వారా మీ Alchemy డ్యాష్‌బోర్డ్‌లోని “Create App” పేజీకి నావిగేట్ చేయండి.

మీ యాప్‌కి పేరు పెట్టండి మేము "My First NFT!"ని ఎంచుకున్నాము, చిన్న వివరణను అందించండి, మీ యాప్ బుక్‌కీపింగ్ కోసం ఉపయోగించే పర్యావరణం కోసం “Staging”ని ఎంచుకోండి మరియు మీ నెట్‌వర్క్ కోసం “Ropsten”ని ఎంచుకోండి.

“Create app” క్లిక్ చేయండి మరియు అంతే! మీ యాప్ దిగువ పట్టికలో కనిపించాలి.

అద్భుతం కాబట్టి ఇప్పుడు మేము మా HTTP Alchemy API URLని సృష్టించాము, దాన్ని మీ క్లిప్‌బోర్డ్‌కి కాపీ చేయండి...

…ఆపై దాన్ని మా `.env` ఫైల్‌కి జోడిద్దాం. మొత్తంగా, మీ .env ఫైల్ ఇలా ఉండాలి:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

ఇప్పుడు మా వద్ద మా కాంట్రాక్ట్ ABI మరియు మా Alchemy API కీ ఉన్నాయి కాబట్టి, [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)ని ఉపయోగించి మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి మేము సిద్ధంగా ఉన్నాము.

### మీ Alchemy Web3 ఎండ్‌పాయింట్ మరియు కాంట్రాక్ట్‌ను సెటప్ చేయండి {#setup-alchemy-endpoint}

ముందుగా, మీ వద్ద ఇది ఇప్పటికే లేకపోతే, టెర్మినల్‌లోని హోమ్ డైరెక్టరీ: `nft-minter-tutorial` కి నావిగేట్ చేయడం ద్వారా మీరు [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)ని ఇన్‌స్టాల్ చేయాలి:

```text
cd ..
npm install @alch/alchemy-web3
```

తరువాత మన `interact.js` ఫైల్‌కి తిరిగి వెళ్దాం. ఫైల్ ఎగువన, మీ .env ఫైల్ నుండి మీ Alchemy కీని దిగుమతి చేయడానికి మరియు మీ Alchemy Web3 ఎండ్‌పాయింట్‌ను సెటప్ చేయడానికి కింది కోడ్‌ను జోడించండి:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) అనేది [Web3.js](https://docs.web3js.org/) చుట్టూ ఉన్న ఒక రాపర్, ఇది web3 డెవలపర్‌గా మీ జీవితాన్ని సులభతరం చేయడానికి మెరుగైన API పద్ధతులను మరియు ఇతర కీలక ప్రయోజనాలను అందిస్తుంది. ఇది కనీస కాన్ఫిగరేషన్ అవసరమయ్యేలా రూపొందించబడింది, తద్వారా మీరు దీన్ని మీ యాప్‌లో వెంటనే ఉపయోగించడం ప్రారంభించవచ్చు!

తరువాత, మా ఫైల్‌కి మా కాంట్రాక్ట్ ABI మరియు కాంట్రాక్ట్ చిరునామాను జోడిద్దాం.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

మా వద్ద ఆ రెండూ ఉన్న తర్వాత, మా ముద్రించే ఫంక్షన్‌ను కోడింగ్ చేయడం ప్రారంభించడానికి మేము సిద్ధంగా ఉన్నాము!

## mintNFT ఫంక్షన్‌ను అమలు చేయండి {#implement-the-mintnft-function}

మీ `interact.js` ఫైల్ లోపల, మా ఫంక్షన్ `mintNFT` ని నిర్వచిద్దాం, ఇది పేరుకు తగ్గట్టుగానే మా NFTని ముద్రిస్తుంది.

మేము అనేక అసమకాలిక కాల్‌లను \(మా మెటాడేటాను IPFSకి పిన్ చేయడానికి Pinataకి, మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి Alchemy Web3కి మరియు మా లావాదేవీలపై సంతకం చేయడానికి మెటామాస్క్‌కి\) చేస్తాము కాబట్టి, మా ఫంక్షన్ కూడా అసమకాలికంగా ఉంటుంది.

మా ఫంక్షన్‌కి మూడు ఇన్‌పుట్‌లు మా డిజిటల్ ఆస్తి యొక్క `url`, `name` మరియు `description`. `connectWallet` ఫంక్షన్ క్రింద కింది ఫంక్షన్ సంతకాన్ని జోడించండి:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్ {#input-error-handling}

సహజంగానే, ఫంక్షన్ ప్రారంభంలో ఒక రకమైన ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్ ఉండటం సమంజసం, కాబట్టి మా ఇన్‌పుట్ పారామితులు సరిగ్గా లేకుంటే మేము ఈ ఫంక్షన్ నుండి నిష్క్రమిస్తాము. మా ఫంక్షన్ లోపల, కింది కోడ్‌ను జోడిద్దాం:

```javascript
export const mintNFT = async (url, name, description) => {
  //లోపం నిర్వహణ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

ముఖ్యంగా, ఇన్‌పుట్ పారామితులలో ఏదైనా ఖాళీ స్ట్రింగ్ అయితే, మేము `success` బూలియన్ falseగా ఉన్న JSON ఆబ్జెక్ట్‌ను అందిస్తాము మరియు మా UIలోని అన్ని ఫీల్డ్‌లు తప్పనిసరిగా పూర్తి కావాలని `status` స్ట్రింగ్ తెలియజేస్తుంది.

### మెటాడేటాను IPFSకి అప్‌లోడ్ చేయండి {#upload-metadata-to-ipfs}

మా మెటాడేటా సరిగ్గా ఫార్మాట్ చేయబడిందని మాకు తెలిసిన తర్వాత, తదుపరి దశ దానిని JSON ఆబ్జెక్ట్‌గా చుట్టి, మేము వ్రాసిన `pinJSONToIPFS` ద్వారా IPFSకి అప్‌లోడ్ చేయడం!

అలా చేయడానికి, ముందుగా మనం `pinJSONToIPFS` ఫంక్షన్‌ను మన `interact.js` ఫైల్‌లోకి దిగుమతి చేసుకోవాలి. `interact.js` ఎగువన, దీన్ని జోడిద్దాం:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS` JSON బాడీని తీసుకుంటుందని గుర్తుంచుకోండి. కాబట్టి దానికి కాల్ చేయడానికి ముందు, మేము మా `url`, `name` మరియు `description` పారామితులను JSON ఆబ్జెక్ట్‌గా ఫార్మాట్ చేయాలి.

`metadata` అనే JSON ఆబ్జెక్ట్‌ను సృష్టించడానికి మా కోడ్‌ను అప్‌డేట్ చేద్దాం, ఆపై ఈ `metadata` పరామితితో `pinJSONToIPFS` కి కాల్ చేద్దాం:

```javascript
export const mintNFT = async (url, name, description) => {
  //లోపం నిర్వహణ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //మెటాడేటాను సృష్టించండి
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata కాల్ చేయండి
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

గమనించండి, మేము `pinJSONToIPFS(metadata)` కి మా కాల్ యొక్క ప్రతిస్పందనను `pinataResponse` ఆబ్జెక్ట్‌లో నిల్వ చేస్తాము. అప్పుడు, ఏవైనా లోపాల కోసం మేము ఈ ఆబ్జెక్ట్‌ను పార్స్ చేస్తాము.

లోపం ఉంటే, మేము `success` బూలియన్ falseగా ఉన్న JSON ఆబ్జెక్ట్‌ను అందిస్తాము మరియు మా కాల్ విఫలమైందని మా `status` స్ట్రింగ్ తెలియజేస్తుంది. లేకపోతే, మేము `pinataResponse` నుండి `pinataURL` ని సంగ్రహిస్తాము మరియు దానిని మా `tokenURI` వేరియబుల్‌గా నిల్వ చేస్తాము.

ఇప్పుడు మా ఫైల్ ఎగువన మేము ప్రారంభించిన Alchemy Web3 APIని ఉపయోగించి మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి సమయం ఆసన్నమైంది. `window.contract` గ్లోబల్ వేరియబుల్ వద్ద కాంట్రాక్ట్‌ను సెట్ చేయడానికి `mintNFT` ఫంక్షన్ దిగువన కింది కోడ్ లైన్‌ను జోడించండి:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

మా `mintNFT` ఫంక్షన్‌లో జోడించాల్సిన చివరి విషయం మా ఎథీరియం లావాదేవీ:

```javascript
//మీ ఎథీరియం లావాదేవీని సెటప్ చేయండి
const transactionParameters = {
  to: contractAddress, // కాంట్రాక్ట్ ప్రచురణల సమయంలో మినహా అవసరం.
  from: window.ethereum.selectedAddress, // వినియోగదారుని క్రియాశీల చిరునామాతో సరిపోలాలి.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT స్మార్ట్ కాంట్రాక్ట్ కు కాల్ చేయండి
}

//మెటామాస్క్ ద్వారా లావాదేవీపై సంతకం చేయండి
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

మీకు ఇప్పటికే ఎథీరియం లావాదేవీల గురించి తెలిసి ఉంటే, నిర్మాణం మీరు చూసిన దానికి చాలా పోలి ఉంటుందని మీరు గమనించవచ్చు.

- ముందుగా, మేము మా లావాదేవీల పారామితులను సెటప్ చేస్తాము.
  - `to` స్వీకర్త చిరునామాను నిర్దేశిస్తుంది \(మా స్మార్ట్ కాంట్రాక్ట్\)
  - `from` లావాదేవీపై సంతకం చేసేవారిని నిర్దేశిస్తుంది \(మెటామాస్క్‌కి వినియోగదారు కనెక్ట్ చేయబడిన చిరునామా: `window.ethereum.selectedAddress`\)
  - `data` మా స్మార్ట్ కాంట్రాక్ట్ `mintNFT` పద్ధతికి కాల్‌ను కలిగి ఉంటుంది, ఇది మా `tokenURI` మరియు వినియోగదారు వాలెట్ చిరునామా `window.ethereum.selectedAddress` ని ఇన్‌పుట్‌లుగా స్వీకరిస్తుంది
- అప్పుడు, మేము await కాల్ `window.ethereum.request,` చేస్తాము, ఇక్కడ లావాదేవీపై సంతకం చేయమని మేము మెటామాస్క్‌ని అడుగుతాము. గమనించండి, ఈ అభ్యర్థనలో, మేము మా eth పద్ధతిని \(eth_SentTransaction\) నిర్దేశిస్తున్నాము మరియు మా `transactionParameters` ని పంపుతున్నాము. ఈ సమయంలో, బ్రౌజర్‌లో మెటామాస్క్ తెరవబడుతుంది మరియు లావాదేవీపై సంతకం చేయడానికి లేదా తిరస్కరించడానికి వినియోగదారుని ప్రాంప్ట్ చేస్తుంది.
  - లావాదేవీ విజయవంతమైతే, ఫంక్షన్ JSON ఆబ్జెక్ట్‌ను అందిస్తుంది, ఇక్కడ బూలియన్ `success` trueకి సెట్ చేయబడుతుంది మరియు `status` స్ట్రింగ్ వారి లావాదేవీ గురించి మరింత సమాచారం కోసం Etherscanని తనిఖీ చేయమని వినియోగదారుని ప్రాంప్ట్ చేస్తుంది.
  - లావాదేవీ విఫలమైతే, ఫంక్షన్ JSON ఆబ్జెక్ట్‌ను అందిస్తుంది, ఇక్కడ `success` బూలియన్ falseకి సెట్ చేయబడుతుంది మరియు `status` స్ట్రింగ్ దోష సందేశాన్ని తెలియజేస్తుంది.

మొత్తంగా, మా `mintNFT` ఫంక్షన్ ఇలా ఉండాలి:

```javascript
export const mintNFT = async (url, name, description) => {
  //లోపం నిర్వహణ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //మెటాడేటాను సృష్టించండి
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata పిన్ అభ్యర్థన
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //స్మార్ట్ కాంట్రాక్ట్ లోడ్ చేయండి
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //మీ ఎథీరియం లావాదేవీని సెటప్ చేయండి
  const transactionParameters = {
    to: contractAddress, // కాంట్రాక్ట్ ప్రచురణల సమయంలో మినహా అవసరం.
    from: window.ethereum.selectedAddress, // వినియోగదారుని క్రియాశీల చిరునామాతో సరిపోలాలి.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT స్మార్ట్ కాంట్రాక్ట్ కు కాల్ చేయండి
  }

  //మెటామాస్క్ ద్వారా లావాదేవీపై సంతకం చేయండి
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

అది ఒక పెద్ద ఫంక్షన్! ఇప్పుడు, మేము మా `mintNFT` ఫంక్షన్‌ను మా `Minter.js` కాంపోనెంట్‌కి కనెక్ట్ చేయాలి...

## మా Minter.js ఫ్రంటెండ్‌కి mintNFTని కనెక్ట్ చేయండి {#connect-our-frontend}

మీ `Minter.js` ఫైల్‌ను తెరిచి, ఎగువన ఉన్న `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` లైన్‌ను ఇలా అప్‌డేట్ చేయండి:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

చివరగా, మీరు దిగుమతి చేసుకున్న `mintNFT` ఫంక్షన్‌కి await కాల్ చేయడానికి `onMintPressed` ఫంక్షన్‌ను అమలు చేయండి మరియు మా లావాదేవీ విజయవంతమైందో లేదో ప్రతిబింబించేలా `status` స్థితి వేరియబుల్‌ను అప్‌డేట్ చేయండి:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## మీ NFTని లైవ్ వెబ్‌సైట్‌కి డిప్లాయ్ చేయండి {#deploy-your-nft}

వినియోగదారులు ఇంటరాక్ట్ అవ్వడానికి మీ ప్రాజెక్ట్‌ను లైవ్‌లోకి తీసుకెళ్లడానికి సిద్ధంగా ఉన్నారా? మీ Minterని లైవ్ వెబ్‌సైట్‌కి డిప్లాయ్ చేయడం కోసం [ఈ ట్యుటోరియల్‌ని](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) తనిఖీ చేయండి.

చివరిగా ఒక అడుగు...

## బ్లాక్‌చైన్ ప్రపంచాన్ని తుఫానులా చుట్టేయండి {#take-the-blockchain-world-by-storm}

ఊరికే అన్నాను, మీరు ట్యుటోరియల్ ముగింపుకు చేరుకున్నారు!

సంగ్రహంగా చెప్పాలంటే, NFT ముద్రించే అప్లికేషన్‌ను నిర్మించడం ద్వారా, మీరు వీటిని ఎలా చేయాలో విజయవంతంగా నేర్చుకున్నారు:

- మీ ఫ్రంటెండ్ ప్రాజెక్ట్ ద్వారా మెటామాస్క్‌కి కనెక్ట్ చేయడం
- మీ ఫ్రంటెండ్ నుండి స్మార్ట్ కాంట్రాక్ట్ పద్ధతులను కాల్ చేయడం
- మెటామాస్క్ ఉపయోగించి లావాదేవీలపై సంతకం చేయడం

బహుశా, మీ dapp ద్వారా ముద్రించబడిన NFTలను మీ వాలెట్‌లో ప్రదర్శించగలగాలని మీరు కోరుకుంటారు — కాబట్టి మా శీఘ్ర ట్యుటోరియల్ [మీ వాలెట్‌లో మీ NFTని ఎలా చూడాలి](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)ని తప్పకుండా తనిఖీ చేయండి!

మరియు, ఎప్పటిలాగే, మీకు ఏవైనా ప్రశ్నలు ఉంటే, [Alchemy డిస్కార్డ్](https://discord.gg/gWuC7zB)లో సహాయం చేయడానికి మేము ఇక్కడ ఉన్నాము. ఈ ట్యుటోరియల్ నుండి కాన్సెప్ట్‌లను మీ భవిష్యత్ ప్రాజెక్ట్‌లకు మీరు ఎలా వర్తింపజేస్తారో చూడటానికి మేము వేచి ఉండలేము!