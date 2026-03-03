---
title: "NFT మింటర్ ట్యుటోరియల్"
description: "ఈ ట్యుటోరియల్‌లో, మీరు ఒక NFT మింటర్‌ను నిర్మిస్తారు మరియు మీ స్మార్ట్ కాంట్రాక్ట్‌ను MetaMask మరియు Web3 సాధనాలను ఉపయోగించి ఒక React ఫ్రంటెండ్‌కు కనెక్ట్ చేయడం ద్వారా పూర్తి స్టాక్ డాప్‌ను ఎలా సృష్టించాలో నేర్చుకుంటారు."
author: "smudgil"
tags:
  [
    "దృఢత్వం",
    "నాన్-ఫంగబుల్ టోకెన్",
    "alchemy",
    "స్మార్ట్ కాంట్రాక్టులు",
    "frontend",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "NFT మింటర్ dapp"
lang: te
published: 2021-10-06
---

Web2 నేపథ్యం నుండి వచ్చే డెవలపర్‌లకు ఎదురయ్యే అతిపెద్ద సవాళ్లలో ఒకటి, మీ స్మార్ట్ కాంట్రాక్ట్‌ను ఫ్రంటెండ్ ప్రాజెక్ట్‌కు ఎలా కనెక్ట్ చేయాలో మరియు దానితో ఎలా సంభాషించాలో గుర్తించడం.

ఒక NFT మింటర్‌ను నిర్మించడం ద్వారా — మీ డిజిటల్ ఆస్తికి ఒక లింక్, ఒక శీర్షిక మరియు ఒక వివరణను మీరు ఇన్‌పుట్ చేయగల ఒక సులభమైన UI — మీరు ఎలాగో నేర్చుకుంటారు:

- మీ ఫ్రంటెండ్ ప్రాజెక్ట్ ద్వారా MetaMaskకు కనెక్ట్ అవ్వండి
- మీ ఫ్రంటెండ్ నుండి స్మార్ట్ కాంట్రాక్ట్ పద్ధతులను కాల్ చేయండి
- MetaMask ఉపయోగించి లావాదేవీలపై సంతకం చేయండి

ఈ ట్యుటోరియల్‌లో, మేము మా ఫ్రంటెండ్ ఫ్రేమ్‌వర్క్‌గా [React](https://react.dev/) ను ఉపయోగిస్తాము. ఈ ట్యుటోరియల్ ప్రధానంగా Web3 అభివృద్ధిపై దృష్టి సారించినందున, మేము React ప్రాథమిక అంశాలను విడమరచి చెప్పడానికి ఎక్కువ సమయం వెచ్చించము. బదులుగా, మేము మా ప్రాజెక్ట్‌కు కార్యాచరణను తీసుకురావడంపై దృష్టి పెడతాము.

ఒక ముందస్తు అవసరంగా, మీకు React గురించి ప్రాథమిక స్థాయి అవగాహన ఉండాలి—కాంపోనెంట్లు, ప్రాప్స్, useState/useEffect, మరియు ప్రాథమిక ఫంక్షన్ కాలింగ్ ఎలా పనిచేస్తాయో తెలిసి ఉండాలి. మీరు ఇంతకు ముందు ఆ పదాలలో దేనినీ విని ఉండకపోతే, మీరు ఈ [React ట్యుటోరియల్‌కు పరిచయం](https://react.dev/learn/tutorial-tic-tac-toe) ను చూడాలనుకోవచ్చు. దృశ్య అభ్యాసకుల కోసం, మేము Net Ninja ద్వారా రూపొందించబడిన ఈ అద్భుతమైన [పూర్తి ఆధునిక React ట్యుటోరియల్](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) వీడియో సిరీస్‌ను గట్టిగా సిఫార్సు చేస్తున్నాము.

మరియు మీరు ఇప్పటికే చేయకపోతే, ఈ ట్యుటోరియల్‌ను పూర్తి చేయడానికి అలాగే బ్లాక్‌చైన్‌లో ఏదైనా నిర్మించడానికి మీకు ఖచ్చితంగా ఒక Alchemy ఖాతా అవసరం. [ఇక్కడ](https://alchemy.com/) ఒక ఉచిత ఖాతా కోసం సైన్ అప్ చేయండి.

ఇంకా ఆలస్యం చేయకుండా, ప్రారంభిద్దాం!

## NFTలను తయారు చేయడం 101 {#making-nfts-101}

మేము ఏదైనా కోడ్‌ను చూడటం ప్రారంభించడానికి ముందు, ఒక NFTని తయారు చేయడం ఎలా పనిచేస్తుందో అర్థం చేసుకోవడం ముఖ్యం. ఇందులో రెండు దశలు ఉంటాయి:

### Ethereum బ్లాక్‌చైన్‌పై ఒక NFT స్మార్ట్ కాంట్రాక్ట్‌ను ప్రచురించండి {#publish-nft}

రెండు NFT స్మార్ట్ కాంట్రాక్ట్ ప్రమాణాల మధ్య అతిపెద్ద వ్యత్యాసం ఏమిటంటే, ERC-1155 ఒక మల్టీ-టోకెన్ ప్రమాణం మరియు బ్యాచ్ కార్యాచరణను కలిగి ఉంటుంది, అయితే ERC-721 ఒక సింగిల్-టోకెన్ ప్రమాణం మరియు అందువల్ల ఒకేసారి ఒక టోకెన్‌ను మాత్రమే బదిలీ చేయడానికి మద్దతు ఇస్తుంది.

### మింటింగ్ ఫంక్షన్‌ను కాల్ చేయండి {#minting-function}

సాధారణంగా, ఈ మింటింగ్ ఫంక్షన్‌కు మీరు రెండు వేరియబుల్స్‌ను పారామీటర్‌లుగా పాస్ చేయవలసి ఉంటుంది, మొదట `recipient`, ఇది మీ తాజాగా ముద్రించబడిన NFTని స్వీకరించే చిరునామాను నిర్దేశిస్తుంది, మరియు రెండవది NFT యొక్క `tokenURI`, ఇది NFT యొక్క మెటాడేటాను వివరించే ఒక JSON డాక్యుమెంట్‌కు పరిష్కరించే ఒక స్ట్రింగ్.

ఒక NFT యొక్క మెటాడేటా నిజంగా దానికి జీవం పోస్తుంది, దానిని ఒక పేరు, వివరణ, చిత్రం (లేదా విభిన్న డిజిటల్ ఆస్తి), మరియు ఇతర గుణాలను కలిగి ఉండటానికి అనుమతిస్తుంది. ఇక్కడ [ఒక tokenURI ఉదాహరణ](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) ఉంది, ఇందులో ఒక NFT యొక్క మెటాడేటా ఉంటుంది.

ఈ ట్యుటోరియల్‌లో, మేము రెండవ భాగంపై దృష్టి పెట్టబోతున్నాము, మా React UIని ఉపయోగించి ఇప్పటికే ఉన్న NFT యొక్క స్మార్ట్ కాంట్రాక్ట్ మింటింగ్ ఫంక్షన్‌ను కాల్ చేయడం.

ఈ ట్యుటోరియల్‌లో మేము కాల్ చేయబోయే ERC-721 NFT స్మార్ట్ కాంట్రాక్ట్‌కి [ఇక్కడ ఒక లింక్](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ఉంది. మేము దానిని ఎలా తయారు చేశామో మీరు తెలుసుకోవాలనుకుంటే, మా ఇతర ట్యుటోరియల్, ["ఒక NFTని ఎలా సృష్టించాలి"](https://www.alchemy.com/docs/how-to-create-an-nft) ను చూడమని మేము గట్టిగా సిఫార్సు చేస్తున్నాము.

బాగుంది, ఇప్పుడు ఒక NFTని తయారు చేయడం ఎలా పనిచేస్తుందో మనకు అర్థమైంది, మా స్టార్టర్ ఫైల్‌లను క్లోన్ చేద్దాం!

## స్టార్టర్ ఫైల్‌లను క్లోన్ చేయండి {#clone-the-starter-files}

మొదట, ఈ ప్రాజెక్ట్ కోసం స్టార్టర్ ఫైల్‌లను పొందడానికి [nft-minter-tutorial GitHub రిపోజిటరీ](https://github.com/alchemyplatform/nft-minter-tutorial) కి వెళ్ళండి. ఈ రిపోజిటరీని మీ స్థానిక వాతావరణంలోకి క్లోన్ చేయండి.

మీరు ఈ క్లోన్ చేయబడిన `nft-minter-tutorial` రిపోజిటరీని తెరిచినప్పుడు, అందులో రెండు ఫోల్డర్‌లు ఉన్నాయని మీరు గమనిస్తారు: `minter-starter-files` మరియు `nft-minter`.

- `minter-starter-files` లో ఈ ప్రాజెక్ట్ కోసం స్టార్టర్ ఫైల్‌లు (ముఖ్యంగా React UI) ఉన్నాయి. ఈ ట్యుటోరియల్‌లో, **మేము ఈ డైరెక్టరీలో పని చేస్తాము**, మీరు ఈ UIని మీ Ethereum వాలెట్ మరియు ఒక NFT స్మార్ట్ కాంట్రాక్ట్‌కు కనెక్ట్ చేయడం ద్వారా దానికి జీవం పోయడం ఎలాగో నేర్చుకుంటారు.
- `nft-minter` పూర్తి ట్యుటోరియల్‌ను కలిగి ఉంది మరియు **మీరు ఇరుక్కుపోయినట్లయితే** **సూచనగా** మీ కోసం అక్కడ ఉంది.

తరువాత, మీ కోడ్ ఎడిటర్‌లో మీ `minter-starter-files` కాపీని తెరిచి, ఆపై మీ `src` ఫోల్డర్‌లోకి నావిగేట్ చేయండి.

మేము వ్రాసే కోడ్ అంతా `src` ఫోల్డర్ కింద ఉంటుంది. మేము `Minter.js` కాంపోనెంట్‌ను సవరించడం మరియు మా ప్రాజెక్ట్‌కు Web3 కార్యాచరణను అందించడానికి అదనపు జావాస్క్రిప్ట్ ఫైల్‌లను వ్రాయడం చేస్తాము.

## దశ 2: మా స్టార్టర్ ఫైల్‌లను చూడండి {#step-2-check-out-our-starter-files}

మేము కోడింగ్ ప్రారంభించడానికి ముందు, స్టార్టర్ ఫైల్‌లలో మాకు ఇప్పటికే ఏమి అందించబడిందో చూడటం ముఖ్యం.

### మీ react ప్రాజెక్ట్‌ను రన్ చేయండి {#get-your-react-project-running}

మా బ్రౌజర్‌లో React ప్రాజెక్ట్‌ను రన్ చేయడం ద్వారా ప్రారంభిద్దాం. React యొక్క అందం ఏమిటంటే, మా బ్రౌజర్‌లో మా ప్రాజెక్ట్ రన్ అవుతున్నప్పుడు, మేము సేవ్ చేసే ఏవైనా మార్పులు మా బ్రౌజర్‌లో ప్రత్యక్షంగా అప్‌డేట్ చేయబడతాయి.

ప్రాజెక్ట్‌ను రన్ చేయడానికి, `minter-starter-files` ఫోల్డర్ యొక్క రూట్ డైరెక్టరీకి నావిగేట్ చేయండి, మరియు ప్రాజెక్ట్ యొక్క డిపెండెన్సీలను ఇన్‌స్టాల్ చేయడానికి మీ టెర్మినల్‌లో `npm install` రన్ చేయండి:

```bash
cd minter-starter-files
npm install
```

అవి ఇన్‌స్టాల్ చేయడం పూర్తయిన తర్వాత, మీ టెర్మినల్‌లో `npm start` రన్ చేయండి:

```bash
npm start
```

అలా చేయడం వలన మీ బ్రౌజర్‌లో http://localhost:3000/ తెరుచుకోవాలి, అక్కడ మీరు మా ప్రాజెక్ట్ కోసం ఫ్రంటెండ్‌ను చూస్తారు. ఇది 3 ఫీల్డ్‌లను కలిగి ఉండాలి: మీ NFT యొక్క ఆస్తికి ఒక లింక్‌ను ఇన్‌పుట్ చేయడానికి ఒక స్థలం, మీ NFT పేరును నమోదు చేయండి మరియు ఒక వివరణను అందించండి.

మీరు "వాలెట్‌ను కనెక్ట్ చేయండి" లేదా "NFTని ముద్రించండి" బటన్‌లను క్లిక్ చేయడానికి ప్రయత్నిస్తే, అవి పనిచేయవని మీరు గమనిస్తారు—అందుకు కారణం మేము ఇంకా వాటి కార్యాచరణను ప్రోగ్రామ్ చేయాలి! :\)

### Minter.js కాంపోనెంట్ {#minter-js}

**గమనిక:** మీరు `minter-starter-files` ఫోల్డర్‌లో ఉన్నారని మరియు `nft-minter` ఫోల్డర్‌లో లేరని నిర్ధారించుకోండి!

మా ఎడిటర్‌లోని `src` ఫోల్డర్‌లోకి తిరిగి వెళ్లి, `Minter.js` ఫైల్‌ను తెరుద్దాం. ఈ ఫైల్‌లోని ప్రతిదాన్ని మనం అర్థం చేసుకోవడం చాలా ముఖ్యం, ఎందుకంటే ఇది మనం పని చేయబోయే ప్రాథమిక React కాంపోనెంట్.

ఈ ఫైల్ పైన, మా స్టేట్ వేరియబుల్స్ ఉన్నాయి, వాటిని మేము నిర్దిష్ట ఈవెంట్‌ల తర్వాత అప్‌డేట్ చేస్తాము.

```javascript
//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React స్టేట్ వేరియబుల్స్ లేదా స్టేట్ హుక్స్ గురించి ఎప్పుడూ వినలేదా? [ఈ](https://legacy.reactjs.org/docs/hooks-state.html) డాక్స్‌ను చూడండి.

ప్రతి వేరియబుల్ దేనిని సూచిస్తుందో ఇక్కడ ఉంది:

- `walletAddress` - వినియోగదారుడి వాలెట్ చిరునామాను నిల్వ చేసే ఒక స్ట్రింగ్
- `status` - UI దిగువన ప్రదర్శించడానికి ఒక సందేశాన్ని కలిగి ఉన్న ఒక స్ట్రింగ్
- `name` - NFT పేరును నిల్వ చేసే ఒక స్ట్రింగ్
- `description` - NFT వివరణను నిల్వ చేసే ఒక స్ట్రింగ్
- `url` - NFT యొక్క డిజిటల్ ఆస్తికి ఒక లింక్ అయిన ఒక స్ట్రింగ్

స్టేట్ వేరియబుల్స్ తర్వాత, మీరు మూడు అమలు చేయని ఫంక్షన్లను చూస్తారు: `useEffect`, `connectWalletPressed`, మరియు `onMintPressed`. ఈ ఫంక్షన్లన్నీ `async` అని మీరు గమనిస్తారు, అందుకు కారణం మేము వాటిలో అసమకాలిక API కాల్స్ చేస్తాము! వాటి పేర్లు వాటి కార్యాచరణలకు పర్యాయపదాలుగా ఉన్నాయి:

```javascript
useEffect(async () => {
  //TODO: implement
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - ఇది మీ కాంపోనెంట్ రెండర్ అయిన తర్వాత కాల్ చేయబడే ఒక React హుక్. దీనికి ఒక ఖాళీ శ్రేణి `[]` ప్రాప్ పాస్ చేయబడినందున (3వ పంక్తిని చూడండి), ఇది కాంపోనెంట్ యొక్క _మొదటి_ రెండర్‌లో మాత్రమే కాల్ చేయబడుతుంది. ఒక వాలెట్ ఇప్పటికే కనెక్ట్ చేయబడిందో లేదో ప్రతిబింబించేలా మా UIని అప్‌డేట్ చేయడానికి ఇక్కడ మేము మా వాలెట్ లిజనర్ మరియు మరొక వాలెట్ ఫంక్షన్‌ను కాల్ చేస్తాము.
- `connectWalletPressed` - ఈ ఫంక్షన్ వినియోగదారుడి MetaMask వాలెట్‌ను మా డాప్‌కు కనెక్ట్ చేయడానికి కాల్ చేయబడుతుంది.
- `onMintPressed` - ఈ ఫంక్షన్ వినియోగదారుడి NFTని ముద్రించడానికి కాల్ చేయబడుతుంది.

ఈ ఫైల్ చివరిలో, మా కాంపోనెంట్ యొక్క UI ఉంది. మీరు ఈ కోడ్‌ను జాగ్రత్తగా స్కాన్ చేస్తే, వాటి సంబంధిత టెక్స్ట్ ఫీల్డ్‌లలోని ఇన్‌పుట్ మారినప్పుడు మేము మా `url`, `name`, మరియు `description` స్టేట్ వేరియబుల్స్‌ను అప్‌డేట్ చేస్తామని మీరు గమనిస్తారు.

మీరు `mintButton` మరియు `walletButton` ఐడీలతో ఉన్న బటన్‌లను వరుసగా క్లిక్ చేసినప్పుడు `connectWalletPressed` మరియు `onMintPressed` కాల్ చేయబడతాయని కూడా మీరు చూస్తారు.

```javascript
//the UI of our component
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

మీరు `App.js` ఫైల్‌కు వెళితే, ఇది React లోని ప్రధాన కాంపోనెంట్, ఇది అన్ని ఇతర కాంపోనెంట్‌లకు ఒక కంటైనర్‌గా పనిచేస్తుంది, మా Minter కాంపోనెంట్ 7వ పంక్తిలో ఇంజెక్ట్ చేయబడిందని మీరు చూస్తారు.

**ఈ ట్యుటోరియల్‌లో, మేము కేవలం `Minter.js ఫైల్‌`ను సవరించడం మరియు మా `src` ఫోల్డర్‌లో ఫైల్‌లను జోడించడం మాత్రమే చేస్తాము.**

ఇప్పుడు మనం దేనితో పనిచేస్తున్నామో అర్థమైంది, మా Ethereum వాలెట్‌ను సెటప్ చేద్దాం!

## మీ Ethereum వాలెట్‌ను సెటప్ చేయండి {#set-up-your-ethereum-wallet}

వినియోగదారులు మీ స్మార్ట్ కాంట్రాక్ట్‌తో సంభాషించగలగడానికి, వారు తమ Ethereum వాలెట్‌ను మీ డాప్‌కు కనెక్ట్ చేయవలసి ఉంటుంది.

### MetaMaskను డౌన్‌లోడ్ చేయండి {#download-metamask}

ఈ ట్యుటోరియల్ కోసం, మేము MetaMaskను ఉపయోగిస్తాము, ఇది మీ ఇతీరియము అకౌంట్ చిరునామాను నిర్వహించడానికి ఉపయోగించే బ్రౌజర్‌లోని వర్చువల్ వాలెట్. Ethereum పై లావాదేవీలు ఎలా పనిచేస్తాయో మీరు మరింత అర్థం చేసుకోవాలనుకుంటే, [ఈ పేజీ](/developers/docs/transactions/)ని చూడండి.

మీరు [ఇక్కడ](https://metamask.io/download) ఉచితంగా MetaMask అకౌంట్‌ను డౌన్‌లోడ్ చేసి, సృష్టించవచ్చు. మీరు ఒక ఖాతాను సృష్టిస్తున్నప్పుడు, లేదా మీకు ఇప్పటికే ఒక ఖాతా ఉన్నట్లయితే, కుడి ఎగువన ఉన్న “Ropsten టెస్టునెట్” కు మారారని నిర్ధారించుకోండి \(తద్వారా మనం నిజమైన డబ్బుతో వ్యవహరించడం లేదు\).

### ఫాసెట్ నుండి ఈథర్ జోడించండి {#add-ether-from-faucet}

మా NFTలను ముద్రించడానికి (లేదా Ethereum బ్లాక్‌చైన్‌లో ఏవైనా లావాదేవీలపై సంతకం చేయడానికి), మాకు కొంత నకిలీ Eth అవసరం. Eth పొందడానికి మీరు [Ropsten ఫాసెట్](https://faucet.ropsten.be/) కు వెళ్లి, మీ Ropsten ఖాతా చిరునామాను నమోదు చేసి, ఆపై “Ropsten Eth పంపించు.” క్లిక్ చేయవచ్చు. త్వరలోనే మీ MetaMask ఖాతాలో Eth కనిపించాలి!

### మీ బ్యాలెన్స్‌ను తనిఖీ చేయండి {#check-your-balance}

మా బ్యాలెన్స్ అక్కడ ఉందని నిర్ధారించుకోవడానికి, [Alchemy యొక్క కంపోజర్ సాధనాన్ని](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ఉపయోగించి ఒక [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) అభ్యర్థన చేద్దాం. ఇది మా వాలెట్‌లోని Eth మొత్తాన్ని తిరిగి ఇస్తుంది. మీరు మీ MetaMask అకౌంట్ చిరునామాను ఇన్‌పుట్ చేసి, “అభ్యర్థన పంపు” క్లిక్ చేసిన తర్వాత, మీరు ఇలాంటి ప్రతిస్పందనను చూడాలి:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**గమనిక:** ఈ ఫలితం weiలో ఉంది, ethలో కాదు. ఈథర్ యొక్క అతి చిన్న ప్రమాణంగా వీని ఉపయోగిస్తారు. wei నుండి ethకి మార్పిడి: 1 eth = 10¹⁸ wei. కాబట్టి మనం 0xde0b6b3a7640000 ను దశాంశానికి మార్చితే మనకు 1\*10¹⁸ వస్తుంది, ఇది 1 ethకి సమానం.

అమ్మయ్య! మా నకిలీ డబ్బు అంతా అక్కడే ఉంది! <Emoji text=":money_mouth_face:" size={1} />

## మీ UIకి MetaMaskని కనెక్ట్ చేయండి {#connect-metamask-to-your-UI}

ఇప్పుడు మా MetaMask వాలెట్ సెటప్ చేయబడింది, మా డాప్‌ను దానికి కనెక్ట్ చేద్దాం!

మేము [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) పారడైమ్‌కు కట్టుబడి ఉండాలని కోరుకుంటున్నందున, మా డాప్ యొక్క లాజిక్, డేటా మరియు నియమాలను నిర్వహించడానికి మా ఫంక్షన్లను కలిగి ఉన్న ఒక ప్రత్యేక ఫైల్‌ను సృష్టించి, ఆపై ఆ ఫంక్షన్లను మా ఫ్రంటెండ్ (మా Minter.js కాంపోనెంట్) కు పాస్ చేయబోతున్నాము.

### `connectWallet` ఫంక్షన్ {#connect-wallet-function}

అలా చేయడానికి, మీ `src` డైరెక్టరీలో `utils` అనే కొత్త ఫోల్డర్‌ను సృష్టించి, దాని లోపల `interact.js` అనే ఫైల్‌ను జోడిద్దాం, ఇందులో మా వాలెట్ మరియు స్మార్ట్ కాంట్రాక్ట్ ఇంటరాక్షన్ ఫంక్షన్లు అన్నీ ఉంటాయి.

మా `interact.js` ఫైల్‌లో, మేము ఒక `connectWallet` ఫంక్షన్‌ను వ్రాస్తాము, దానిని మేము మా `Minter.js` కాంపోనెంట్‌లో దిగుమతి చేసుకుని కాల్ చేస్తాము.

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

ఈ కోడ్ ఏమి చేస్తుందో విడమరచి చూద్దాం:

మొదట, మా ఫంక్షన్ మీ బ్రౌజర్‌లో `window.ethereum` ప్రారంభించబడిందో లేదో తనిఖీ చేస్తుంది.

`window.ethereum` అనేది MetaMask మరియు ఇతర వాలెట్ ప్రొవైడర్‌ల ద్వారా ఇంజెక్ట్ చేయబడిన గ్లోబల్ API, ఇది వెబ్‌సైట్‌లు వినియోగదారుల Ethereum ఖాతాలను అభ్యర్థించడానికి అనుమతిస్తుంది. ఆమోదించబడితే, ఇది వినియోగదారుడు కనెక్ట్ చేయబడిన బ్లాక్‌చైన్‌ల నుండి డేటాను చదవగలదు మరియు వినియోగదారుడు సందేశాలు మరియు లావాదేవీలపై సంతకం చేయమని సూచించగలదు. మరింత సమాచారం కోసం [MetaMask డాక్స్](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) చూడండి!

`window.ethereum` _ఉండకపోతే_, అప్పుడు MetaMask ఇన్‌స్టాల్ చేయబడలేదని అర్థం. దీని ఫలితంగా ఒక JSON వస్తువు తిరిగి వస్తుంది, ఇక్కడ `address` తిరిగి వచ్చినది ఖాళీ స్ట్రింగ్, మరియు `status` JSX వస్తువు వినియోగదారుడు MetaMaskను ఇన్‌స్టాల్ చేయాలని తెలియజేస్తుంది.

**మేము వ్రాసే చాలా ఫంక్షన్లు JSON వస్తువులను తిరిగి ఇస్తాయి, వాటిని మేము మా స్టేట్ వేరియబుల్స్ మరియు UIని అప్‌డేట్ చేయడానికి ఉపయోగించవచ్చు.**

ఇప్పుడు `window.ethereum` _ఉంటే_, అప్పుడు విషయాలు ఆసక్తికరంగా మారతాయి.

ఒక try/catch లూప్‌ను ఉపయోగించి, మేము [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) కాల్ చేయడం ద్వారా MetaMaskకు కనెక్ట్ చేయడానికి ప్రయత్నిస్తాము. ఈ ఫంక్షన్‌ను కాల్ చేయడం వలన బ్రౌజర్‌లో MetaMask తెరుచుకుంటుంది, దీని ద్వారా వినియోగదారుడు తమ వాలెట్‌ను మీ డాప్‌కు కనెక్ట్ చేయమని ప్రాంప్ట్ చేయబడతారు.

- వినియోగదారుడు కనెక్ట్ చేయడానికి ఎంచుకుంటే, `method: "eth_requestAccounts"` డాప్‌కు కనెక్ట్ చేయబడిన వినియోగదారుడి అన్ని ఖాతా చిరునామాలను కలిగి ఉన్న ఒక శ్రేణిని తిరిగి ఇస్తుంది. మొత్తం మీద, మా `connectWallet` ఫంక్షన్ ఈ శ్రేణిలోని _మొదటి_ `address` (9వ పంక్తిని చూడండి) మరియు స్మార్ట్ కాంట్రాక్ట్‌కు ఒక సందేశం వ్రాయమని వినియోగదారుడిని ప్రాంప్ట్ చేసే ఒక `status` సందేశాన్ని కలిగి ఉన్న ఒక JSON వస్తువును తిరిగి ఇస్తుంది.
- వినియోగదారుడు కనెక్షన్‌ను తిరస్కరిస్తే, అప్పుడు JSON వస్తువు తిరిగి వచ్చిన `address` కోసం ఖాళీ స్ట్రింగ్‌ను మరియు వినియోగదారుడు కనెక్షన్‌ను తిరస్కరించినట్లు ప్రతిబింబించే ఒక `status` సందేశాన్ని కలిగి ఉంటుంది.

### మీ Minter.js UI కాంపోనెంట్‌కు connectWallet ఫంక్షన్‌ను జోడించండి {#add-connect-wallet}

ఇప్పుడు మేము ఈ `connectWallet` ఫంక్షన్‌ను వ్రాశాము, దానిని మా `Minter.js.` కాంపోనెంట్‌కు కనెక్ట్ చేద్దాం.

మొదట, మేము మా ఫంక్షన్‌ను మా `Minter.js` ఫైల్‌లోకి `import { connectWallet } from "./utils/interact.js";` ను `Minter.js` ఫైల్ పైభాగానికి జోడించడం ద్వారా దిగుమతి చేసుకోవాలి. `Minter.js` యొక్క మీ మొదటి 11 పంక్తులు ఇప్పుడు ఇలా కనిపించాలి:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

అప్పుడు, మా `connectWalletPressed` ఫంక్షన్ లోపల, మేము మా దిగుమతి చేసుకున్న `connectWallet` ఫంక్షన్‌ను ఇలా కాల్ చేస్తాము:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

మా `Minter.js` కాంపోనెంట్ నుండి `interact.js` ఫైల్ నుండి మా కార్యాచరణలో చాలా వరకు ఎలా సంగ్రహించబడిందో గమనించండి? ఇది మేము M-V-C పారడైమ్‌కు కట్టుబడి ఉండటానికి!

`connectWalletPressed`లో, మేము కేవలం మా దిగుమతి చేసుకున్న `connectWallet` ఫంక్షన్‌కు ఒక await కాల్ చేస్తాము, మరియు దాని ప్రతిస్పందనను ఉపయోగించి, మేము మా `status` మరియు `walletAddress` వేరియబుల్స్‌ను వాటి స్టేట్ హుక్స్ ద్వారా అప్‌డేట్ చేస్తాము.

ఇప్పుడు, `Minter.js` మరియు `interact.js` రెండు ఫైల్‌లను సేవ్ చేసి, ఇప్పటివరకు మా UIని పరీక్షిద్దాం.

localhost:3000లో మీ బ్రౌజర్‌ను తెరిచి, పేజీ యొక్క కుడి ఎగువన ఉన్న "వాలెట్‌ను కనెక్ట్ చేయండి" బటన్‌ను నొక్కండి.

మీరు MetaMaskను ఇన్‌స్టాల్ చేసి ఉంటే, మీ వాలెట్‌ను మీ డాప్‌కు కనెక్ట్ చేయమని మిమ్మల్ని ప్రాంప్ట్ చేయాలి. కనెక్ట్ చేయడానికి ఆహ్వానాన్ని అంగీకరించండి.

వాలెట్ బటన్ ఇప్పుడు మీ చిరునామా కనెక్ట్ చేయబడిందని ప్రతిబింబిస్తుందని మీరు చూడాలి.

తరువాత, పేజీని రిఫ్రెష్ చేయడానికి ప్రయత్నించండి... ఇది వింతగా ఉంది. మా వాలెట్ బటన్ MetaMaskను కనెక్ట్ చేయమని మమ్మల్ని ప్రాంప్ట్ చేస్తోంది, అది ఇప్పటికే కనెక్ట్ చేయబడి ఉన్నప్పటికీ...

అయినప్పటికీ చింతించకండి! `getCurrentWalletConnected` అనే ఫంక్షన్‌ను అమలు చేయడం ద్వారా మేము దానిని సులభంగా పరిష్కరించవచ్చు, ఇది మా డాప్‌కు ఒక చిరునామా ఇప్పటికే కనెక్ట్ చేయబడిందో లేదో తనిఖీ చేస్తుంది మరియు తదనుగుణంగా మా UIని అప్‌డేట్ చేస్తుంది!

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

ఈ కోడ్ మేము ఇందాక వ్రాసిన `connectWallet` ఫంక్షన్‌కు _చాలా_ సారూప్యంగా ఉంటుంది.

ప్రధాన వ్యత్యాసం ఏమిటంటే, ఇక్కడ మేము `eth_requestAccounts` పద్ధతిని కాల్ చేయడానికి బదులుగా, ఇది వినియోగదారుడు తమ వాలెట్‌ను కనెక్ట్ చేయడానికి MetaMaskను తెరుస్తుంది, ఇక్కడ మేము `eth_accounts` పద్ధతిని కాల్ చేస్తాము, ఇది కేవలం మా డాప్‌కు ప్రస్తుతం కనెక్ట్ చేయబడిన MetaMask చిరునామాలను కలిగి ఉన్న ఒక శ్రేణిని తిరిగి ఇస్తుంది.

ఈ ఫంక్షన్‌ను చర్యలో చూడటానికి, మా `Minter.js` కాంపోనెంట్ యొక్క `useEffect` ఫంక్షన్‌లో దానిని కాల్ చేద్దాం.

మేము `connectWallet` కోసం చేసినట్లే, మేము ఈ ఫంక్షన్‌ను మా `interact.js` ఫైల్ నుండి మా `Minter.js` ఫైల్‌లోకి ఇలా దిగుమతి చేసుకోవాలి:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here
} from "./utils/interact.js"
```

ఇప్పుడు, మేము దానిని మా `useEffect` ఫంక్షన్‌లో కేవలం కాల్ చేస్తాము:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

గమనించండి, మేము మా `walletAddress` మరియు `status` స్టేట్ వేరియబుల్స్‌ను అప్‌డేట్ చేయడానికి మా `getCurrentWalletConnected` కాల్ యొక్క ప్రతిస్పందనను ఉపయోగిస్తాము.

మీరు ఈ కోడ్‌ను జోడించిన తర్వాత, మా బ్రౌజర్ విండోను రిఫ్రెష్ చేయడానికి ప్రయత్నించండి. బటన్ మీరు కనెక్ట్ అయ్యారని చెప్పాలి, మరియు మీరు రిఫ్రెష్ చేసిన తర్వాత కూడా మీ కనెక్ట్ చేయబడిన వాలెట్ చిరునామా యొక్క ప్రివ్యూను చూపాలి!

### addWalletListenerని అమలు చేయండి {#implement-add-wallet-listener}

మా డాప్ వాలెట్ సెటప్‌లో చివరి దశ వాలెట్ లిజనర్‌ను అమలు చేయడం, తద్వారా మా వాలెట్ స్టేట్ మారినప్పుడు, ఉదాహరణకు వినియోగదారుడు డిస్‌కనెక్ట్ చేసినప్పుడు లేదా ఖాతాలను మార్చినప్పుడు మా UI అప్‌డేట్ అవుతుంది.

మీ `Minter.js` ఫైల్‌లో, కింది విధంగా కనిపించే `addWalletListener` అనే ఫంక్షన్‌ను జోడించండి:

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

ఇక్కడ ఏమి జరుగుతుందో త్వరగా విడమరచి చూద్దాం:

- మొదట, మా ఫంక్షన్ `window.ethereum` ప్రారంభించబడిందో లేదో తనిఖీ చేస్తుంది (అనగా, MetaMask ఇన్‌స్టాల్ చేయబడింది).
  - అది కాకపోతే, మేము కేవలం మా `status` స్టేట్ వేరియబుల్‌ను వినియోగదారుడిని MetaMaskను ఇన్‌స్టాల్ చేయమని ప్రాంప్ట్ చేసే ఒక JSX స్ట్రింగ్‌కు సెట్ చేస్తాము.
  - అది ప్రారంభించబడితే, మేము 3వ పంక్తిలో `window.ethereum.on("accountsChanged")` లిజనర్‌ను సెట్ చేస్తాము, ఇది MetaMask వాలెట్‌లోని స్టేట్ మార్పులను వింటుంది, ఇందులో వినియోగదారుడు డాప్‌కు అదనపు ఖాతాను కనెక్ట్ చేసినప్పుడు, ఖాతాలను మార్చినప్పుడు, లేదా ఒక ఖాతాను డిస్‌కనెక్ట్ చేసినప్పుడు ఉంటాయి. కనీసం ఒక ఖాతా కనెక్ట్ చేయబడి ఉంటే, `walletAddress` స్టేట్ వేరియబుల్ లిజనర్ ద్వారా తిరిగి వచ్చిన `accounts` శ్రేణిలోని మొదటి ఖాతాగా అప్‌డేట్ చేయబడుతుంది. లేకపోతే, `walletAddress` ఖాళీ స్ట్రింగ్‌గా సెట్ చేయబడుతుంది.

చివరగా, మేము దానిని మా `useEffect` ఫంక్షన్‌లో కాల్ చేయాలి:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

మరియు ఇదుగో! మేము మా వాలెట్ కార్యాచరణ అంతా ప్రోగ్రామింగ్ పూర్తి చేసాము! ఇప్పుడు మా వాలెట్ సెటప్ చేయబడింది, మా NFTని ఎలా ముద్రించాలో కనుగొందాం!

## NFT మెటాడేటా 101 {#nft-metadata-101}

కాబట్టి ఈ ట్యుటోరియల్ యొక్క 0వ దశలో మనం మాట్లాడిన NFT మెటాడేటా గుర్తుందా—ఇది ఒక NFTకి జీవం పోస్తుంది, దానికి డిజిటల్ ఆస్తి, పేరు, వివరణ మరియు ఇతర గుణాలు వంటి లక్షణాలను కలిగి ఉండటానికి అనుమతిస్తుంది.

మేము ఈ మెటాడేటాను ఒక JSON వస్తువుగా కాన్ఫిగర్ చేసి, దానిని నిల్వ చేయవలసి ఉంటుంది, తద్వారా మా స్మార్ట్ కాంట్రాక్ట్ యొక్క `mintNFT` ఫంక్షన్‌ను కాల్ చేసేటప్పుడు దానిని `tokenURI` పారామీటర్‌గా పాస్ చేయవచ్చు.

"ఆస్తికి లింక్", "పేరు", "వివరణ" ఫీల్డ్‌లలోని టెక్స్ట్ మా NFT యొక్క మెటాడేటా యొక్క విభిన్న లక్షణాలను కలిగి ఉంటుంది. మేము ఈ మెటాడేటాను ఒక JSON వస్తువుగా ఫార్మాట్ చేస్తాము, కానీ ఈ JSON వస్తువును ఎక్కడ నిల్వ చేయవచ్చో కొన్ని ఎంపికలు ఉన్నాయి:

- మేము దానిని Ethereum బ్లాక్‌చైన్‌లో నిల్వ చేయవచ్చు; అయితే, అలా చేయడం చాలా ఖరీదైనది.
- మేము దానిని AWS లేదా Firebase వంటి కేంద్రీకృత సర్వర్‌లో నిల్వ చేయవచ్చు. కానీ అది మా వికేంద్రీకరణ నీతిని ఓడిస్తుంది.
- మేము IPFS, ఒక వికేంద్రీకృత ప్రోటోకాల్ మరియు ఒక పంపిణీ చేయబడిన ఫైల్ సిస్టమ్‌లో డేటాను నిల్వ చేయడానికి మరియు పంచుకోవడానికి పీర్-టు-పీర్ నెట్‌వర్క్‌ను ఉపయోగించవచ్చు. ఈ ప్రోటోకాల్ వికేంద్రీకృతం మరియు ఉచితం కాబట్టి, ఇది మా ఉత్తమ ఎంపిక!

IPFSలో మా మెటాడేటాను నిల్వ చేయడానికి, మేము [Pinata](https://pinata.cloud/), ఒక సౌకర్యవంతమైన IPFS API మరియు టూల్‌కిట్‌ను ఉపయోగిస్తాము. తదుపరి దశలో, దీన్ని ఖచ్చితంగా ఎలా చేయాలో మేము వివరిస్తాము!

## మీ మెటాడేటాను IPFSకి పిన్ చేయడానికి Pinataను ఉపయోగించండి {#use-pinata-to-pin-your-metadata-to-IPFS}

మీకు [Pinata](https://pinata.cloud/) ఖాతా లేకపోతే, [ఇక్కడ](https://app.pinata.cloud/auth/signup) ఒక ఉచిత ఖాతా కోసం సైన్ అప్ చేయండి మరియు మీ ఇమెయిల్ మరియు ఖాతాను ధృవీకరించడానికి దశలను పూర్తి చేయండి.

### మీ Pinata API కీని సృష్టించండి {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) పేజీకి నావిగేట్ చేయండి, ఆపై పైన ఉన్న "కొత్త కీ" బటన్‌ను ఎంచుకోండి, అడ్మిన్ విడ్జెట్‌ను ప్రారంభించబడినట్లు సెట్ చేయండి మరియు మీ కీకి పేరు పెట్టండి.

అప్పుడు మీకు మీ API సమాచారంతో ఒక పాపప్ చూపబడుతుంది. దీన్ని ఎక్కడైనా భద్రంగా ఉంచారని నిర్ధారించుకోండి.

ఇప్పుడు మా కీ సెట్ చేయబడింది, దాన్ని మా ప్రాజెక్ట్‌కు జోడిద్దాం, తద్వారా దాన్ని ఉపయోగించవచ్చు.

### ఒక .env ఫైల్‌ను సృష్టించండి {#create-a-env}

మేము మా Pinata కీ మరియు రహస్యాన్ని ఒక పర్యావరణ ఫైల్‌లో సురక్షితంగా నిల్వ చేయవచ్చు. మీ ప్రాజెక్ట్ డైరెక్టరీలో [dotenv ప్యాకేజీని](https://www.npmjs.com/package/dotenv) ఇన్‌స్టాల్ చేద్దాం.

మీ టెర్మినల్‌లో కొత్త ట్యాబ్‌ను తెరవండి \(లోకల్ హోస్ట్‌ను నడుపుతున్న దాని నుండి వేరుగా\) మరియు మీరు `minter-starter-files` ఫోల్డర్‌లో ఉన్నారని నిర్ధారించుకోండి, ఆపై మీ టెర్మినల్‌లో కింది ఆదేశాన్ని అమలు చేయండి:

```text
npm install dotenv --save
```

తరువాత, మీ కమాండ్ లైన్‌లో కింది వాటిని నమోదు చేయడం ద్వారా మీ `minter-starter-files` యొక్క రూట్ డైరెక్టరీలో ఒక `.env` ఫైల్‌ను సృష్టించండి:

```javascript
vim.env
```

ఇది vim (ఒక టెక్స్ట్ ఎడిటర్)లో మీ `.env` ఫైల్‌ను పాప్ అప్ చేస్తుంది. దాన్ని సేవ్ చేయడానికి మీ కీబోర్డ్‌లో "esc" + ":" + "q" ను ఆ క్రమంలో నొక్కండి.

తరువాత, VSCodeలో, మీ `.env` ఫైల్‌కు నావిగేట్ చేయండి మరియు మీ Pinata API కీ మరియు API రహస్యాన్ని దానికి జోడించండి, ఇలా:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ఫైల్‌ను సేవ్ చేయండి, ఆపై మీరు మీ JSON మెటాడేటాను IPFSకి అప్‌లోడ్ చేయడానికి ఫంక్షన్‌ను వ్రాయడానికి సిద్ధంగా ఉన్నారు!

### pinJSONToIPFSని అమలు చేయండి {#pin-json-to-ipfs}

అదృష్టవశాత్తు మాకు, Pinata కు [IPFSకి JSON డేటాను అప్‌లోడ్ చేయడానికి ప్రత్యేకంగా ఒక API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) మరియు కొన్ని స్వల్ప మార్పులతో మేము ఉపయోగించగల ఒక అనుకూలమైన JavaScript తో axios ఉదాహరణ ఉంది.

మీ `utils` ఫోల్డర్‌లో, `pinata.js` అనే మరొక ఫైల్‌ను సృష్టించి, ఆపై మా Pinata రహస్యం మరియు కీని .env ఫైల్ నుండి ఇలా దిగుమతి చేసుకుందాం:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

తరువాత, కింద నుండి అదనపు కోడ్‌ను మీ `pinata.js` ఫైల్‌లో అతికించండి. చింతించకండి, ప్రతిదీ ఏమిటో మేము విడమరచి చెబుతాము!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
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

మొదట, ఇది [axios](https://www.npmjs.com/package/axios), బ్రౌజర్ మరియు node.js కోసం ఒక ప్రామిస్ ఆధారిత HTTP క్లయింట్‌ను దిగుమతి చేసుకుంటుంది, దీనిని మేము Pinata కు ఒక అభ్యర్థన చేయడానికి ఉపయోగిస్తాము.

అప్పుడు మాకు మా అసమకాలిక ఫంక్షన్ `pinJSONToIPFS` ఉంది, ఇది ఒక `JSONBody`ని దాని ఇన్‌పుట్‌గా మరియు దాని హెడర్‌లో Pinata api కీ మరియు రహస్యాన్ని తీసుకుంటుంది, అన్నీ వారి `pinJSONToIPFS` APIకి ఒక POST అభ్యర్థన చేయడానికి.

- ఈ POST అభ్యర్థన విజయవంతమైతే, అప్పుడు మా ఫంక్షన్ `success` బూలియన్ నిజంగా మరియు మా మెటాడేటా పిన్ చేయబడిన `pinataUrl` తో ఒక JSON వస్తువును తిరిగి ఇస్తుంది. మేము ఈ `pinataUrl` ను మా స్మార్ట్ కాంట్రాక్ట్ మింట్ ఫంక్షన్‌కు `tokenURI` ఇన్‌పుట్‌గా ఉపయోగిస్తాము.
- ఈ పోస్ట్ అభ్యర్థన విఫలమైతే, అప్పుడు మా ఫంక్షన్ `success` బూలియన్ తప్పుగా మరియు మా లోపాన్ని తెలియజేసే ఒక `message` స్ట్రింగ్‌తో ఒక JSON వస్తువును తిరిగి ఇస్తుంది.

మా `connectWallet` ఫంక్షన్ రిటర్న్ రకాలతో పాటు, మేము JSON వస్తువులను తిరిగి ఇస్తున్నాము, తద్వారా వాటి పారామీటర్లను మా స్టేట్ వేరియబుల్స్ మరియు UIని అప్‌డేట్ చేయడానికి ఉపయోగించవచ్చు.

## మీ స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయండి {#load-your-smart-contract}

ఇప్పుడు మా `pinJSONToIPFS` ఫంక్షన్ ద్వారా IPFSకి మా NFT మెటాడేటాను అప్‌లోడ్ చేయడానికి ఒక మార్గం ఉంది, దాని `mintNFT` ఫంక్షన్‌ను కాల్ చేయడానికి మా స్మార్ట్ కాంట్రాక్ట్ యొక్క ఒక ఉదాహరణను లోడ్ చేయడానికి ఒక మార్గం అవసరం.

మేము ఇందాక చెప్పినట్లు, ఈ ట్యుటోరియల్‌లో మేము [ఈ ఇప్పటికే ఉన్న NFT స్మార్ట్ కాంట్రాక్ట్‌](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)ను ఉపయోగిస్తాము; అయితే, మేము దాన్ని ఎలా తయారు చేశామో తెలుసుకోవాలనుకుంటే, లేదా మీరే ఒకటి తయారు చేసుకోవాలనుకుంటే, మా ఇతర ట్యుటోరియల్, ["ఒక NFTని ఎలా సృష్టించాలి."](https://www.alchemy.com/docs/how-to-create-an-nft)ని చూడమని మేము గట్టిగా సిఫార్సు చేస్తున్నాము.

### కాంట్రాక్ట్ ABI {#contract-abi}

మీరు మా ఫైల్‌లను జాగ్రత్తగా పరిశీలిస్తే, మా `src` డైరెక్టరీలో, ఒక `contract-abi.json` ఫైల్ ఉందని మీరు గమనించి ఉంటారు. ఒక కాంట్రాక్ట్ ఏ ఫంక్షన్‌ను పిలుస్తుందో నిర్దేశించడానికి అలాగే ఫంక్షన్ మీరు ఆశించే ఫార్మాట్‌లో డేటాను తిరిగి ఇస్తుందని నిర్ధారించడానికి ఒక ABI అవసరం.

Ethereum బ్లాక్‌చైన్‌కు కనెక్ట్ అవ్వడానికి మరియు మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి మాకు ఒక Alchemy API కీ మరియు Alchemy Web3 API కూడా అవసరం.

### మీ Alchemy API కీని సృష్టించండి {#create-alchemy-api}

మీకు ఇప్పటికే Alchemy ఖాతా లేకపోతే, [ఇక్కడ ఉచితంగా సైన్ అప్ చేసుకోండి.](https://alchemy.com/?a=eth-org-nft-minter)

మీరు ఆల్కెమీ అకౌంట్‌ను సృష్టించిన తర్వాత, యాప్‌ను సృష్టించడం ద్వారా మీరు API కీని రూపొందించవచ్చు. ఇది Ropsten టెస్టునెట్‌కు అభ్యర్థనలు చేయడానికి మాకు అనుమతిస్తుంది.

మీ Alchemy డాష్‌బోర్డ్‌లో నావ్ బార్‌లో “Apps” పై హోవర్ చేసి “Create App” క్లిక్ చేయడం ద్వారా “Create App” పేజీకి నావిగేట్ చేయండి.

మీ అనువర్తనానికి పేరు పెట్టండి మేము "నా మొదటి NFT!"ని ఎంచుకున్నాము, ఒక చిన్న వివరణను అందించండి, మీ అనువర్తన బుక్‌కీపింగ్ కోసం ఉపయోగించే పర్యావరణం కోసం “స్టేజింగ్”ని ఎంచుకోండి, మరియు మీ నెట్‌వర్క్ కోసం “Ropsten”ని ఎంచుకోండి.

“యాప్‌ను సృష్టించు” క్లిక్ చేయండి, అంతే! మీ యాప్ దిగువ పట్టికలో కనిపించాలి.

అద్భుతం, ఇప్పుడు మేము మా HTTP Alchemy API URLని సృష్టించాము, దాన్ని మీ క్లిప్‌బోర్డ్‌కు కాపీ చేయండి...

… ఆపై దానిని మా `.env` ఫైల్‌కు జోడిద్దాం. మొత్తం మీద, మీ .env ఫైల్ ఇలా కనిపించాలి:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

ఇప్పుడు మా కాంట్రాక్ట్ ABI మరియు మా Alchemy API కీ ఉన్నాయి, మేము [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ఉపయోగించి మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి సిద్ధంగా ఉన్నాము.

### మీ Alchemy Web3 ఎండ్‌పాయింట్ మరియు కాంట్రాక్ట్‌ను సెటప్ చేయండి {#setup-alchemy-endpoint}

మొదట, మీకు ఇప్పటికే లేకపోతే, టెర్మినల్‌లో హోమ్ డైరెక్టరీ: `nft-minter-tutorial` కి నావిగేట్ చేయడం ద్వారా మీరు [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)ని ఇన్‌స్టాల్ చేయాలి:

```text
cd ..
npm install @alch/alchemy-web3
```

తరువాత మా `interact.js` ఫైల్‌కు తిరిగి వెళ్దాం. ఫైల్ పైభాగంలో, మీ .env ఫైల్ నుండి మీ Alchemy కీని దిగుమతి చేసుకోవడానికి మరియు మీ Alchemy Web3 ఎండ్‌పాయింట్‌ను సెటప్ చేయడానికి కింది కోడ్‌ను జోడించండి:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) అనేది [Web3.js](https://docs.web3js.org/) చుట్టూ ఉన్న ఒక చుట్టు, ఇది వెబ్3 డెవలపర్‌గా మీ జీవితాన్ని సులభతరం చేయడానికి మెరుగైన API పద్ధతులు మరియు ఇతర కీలక ప్రయోజనాలను అందిస్తుంది. ఇది కనిష్ట కాన్ఫిగరేషన్ అవసరం అయ్యేలా రూపొందించబడింది, తద్వారా మీరు వెంటనే మీ అనువర్తనంలో దాన్ని ఉపయోగించడం ప్రారంభించవచ్చు!

తరువాత, మా కాంట్రాక్ట్ ABI మరియు కాంట్రాక్ట్ చిరునామాను మా ఫైల్‌కు జోడిద్దాం.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

మాకు రెండూ ఉన్న తర్వాత, మేము మా మింట్ ఫంక్షన్‌ను కోడింగ్ చేయడం ప్రారంభించడానికి సిద్ధంగా ఉన్నాము!

## మింట్‌ఎన్‌ఎఫ్‌టి ఫంక్షన్‌ను అమలు చేయండి {#implement-the-mintnft-function}

మీ `interact.js` ఫైల్ లోపల, మా ఫంక్షన్, `mintNFT`ని నిర్వచిద్దాం, ఇది దాని పేరుకు తగినట్లుగా మా NFTని ముద్రిస్తుంది.

మేము అనేక అసమకాలిక కాల్స్ చేయబోతున్నందున (మా మెటాడేటాను IPFSకి పిన్ చేయడానికి Pinataకు, మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి Alchemy Web3కు, మరియు మా లావాదేవీలపై సంతకం చేయడానికి MetaMaskకు), మా ఫంక్షన్ కూడా అసమకాలికంగా ఉంటుంది.

మా ఫంక్షన్‌కు మూడు ఇన్‌పుట్‌లు మా డిజిటల్ ఆస్తి యొక్క `url`, `name`, మరియు `description`. `connectWallet` ఫంక్షన్ కింద కింది ఫంక్షన్ సంతకాన్ని జోడించండి:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### ఇన్‌పుట్ దోష నిర్వహణ {#input-error-handling}

సహజంగానే, ఫంక్షన్ ప్రారంభంలో కొంత ఇన్‌పుట్ దోష నిర్వహణ ఉండటం అర్ధవంతంగా ఉంటుంది, తద్వారా మా ఇన్‌పుట్ పారామీటర్లు సరిగ్గా లేకపోతే మేము ఈ ఫంక్షన్ నుండి నిష్క్రమిస్తాము. మా ఫంక్షన్ లోపల, కింది కోడ్‌ను జోడిద్దాం:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

ముఖ్యంగా, ఇన్‌పుట్ పారామీటర్లలో ఏదైనా ఖాళీ స్ట్రింగ్ అయితే, అప్పుడు మేము `success` బూలియన్ తప్పుగా మరియు మా UIలోని అన్ని ఫీల్డ్‌లు పూర్తి చేయాలని తెలియజేసే `status` స్ట్రింగ్‌తో ఒక JSON వస్తువును తిరిగి ఇస్తాము.

### మెటాడేటాను IPFSకి అప్‌లోడ్ చేయండి {#upload-metadata-to-ipfs}

మా మెటాడేటా సరిగ్గా ఫార్మాట్ చేయబడిందని మాకు తెలిసిన తర్వాత, తదుపరి దశ దానిని ఒక JSON వస్తువులో చుట్టి, మేము వ్రాసిన `pinJSONToIPFS` ద్వారా IPFSకి అప్‌లోడ్ చేయడం!

అలా చేయడానికి, మేము మొదట `pinJSONToIPFS` ఫంక్షన్‌ను మా `interact.js` ఫైల్‌లోకి దిగుమతి చేసుకోవాలి. `interact.js` పైభాగాన, ఇలా జోడిద్దాం:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS` ఒక JSON బాడీని తీసుకుంటుందని గుర్తుంచుకోండి. కాబట్టి దానికి కాల్ చేయడానికి ముందు, మేము మా `url`, `name`, మరియు `description` పారామీటర్లను ఒక JSON వస్తువుగా ఫార్మాట్ చేయాలి.

`metadata` అనే JSON వస్తువును సృష్టించడానికి మా కోడ్‌ను అప్‌డేట్ చేసి, ఆపై ఈ `metadata` పారామీటర్‌తో `pinJSONToIPFS`కు కాల్ చేద్దాం:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call
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

గమనించండి, మేము `pinJSONToIPFS(metadata)`కు మా కాల్ యొక్క ప్రతిస్పందనను `pinataResponse` వస్తువులో నిల్వ చేస్తాము. అప్పుడు, మేము ఏవైనా దోషాల కోసం ఈ వస్తువును పార్స్ చేస్తాము.

దోషం ఉంటే, మేము `success` బూలియన్ తప్పుగా మరియు మా `status` స్ట్రింగ్ మా కాల్ విఫలమైందని తెలియజేసే ఒక JSON వస్తువును తిరిగి ఇస్తాము. లేకపోతే, మేము `pinataResponse` నుండి `pinataURL`ను సంగ్రహించి, దానిని మా `tokenURI` వేరియబుల్‌గా నిల్వ చేస్తాము.

ఇప్పుడు మేము మా ఫైల్ పైభాగంలో ప్రారంభించిన Alchemy Web3 APIని ఉపయోగించి మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేసే సమయం వచ్చింది. `mintNFT` ఫంక్షన్ దిగువన `window.contract` గ్లోబల్ వేరియబుల్‌లో కాంట్రాక్ట్‌ను సెట్ చేయడానికి కింది కోడ్ పంక్తిని జోడించండి:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

మా `mintNFT` ఫంక్షన్‌లో జోడించాల్సిన చివరి విషయం మా Ethereum లావాదేవీ:

```javascript
//set up your Ethereum transaction
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract
}

//sign the transaction via MetaMask
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

మీకు ఇప్పటికే Ethereum లావాదేవీలతో పరిచయం ఉంటే, మీరు చూసిన దానితో నిర్మాణం చాలా సారూప్యంగా ఉందని మీరు గమనిస్తారు.

- మొదట, మేము మా లావాదేవీల పారామీటర్లను సెటప్ చేస్తాము.
  - `to` గ్రహీత చిరునామాను నిర్దేశిస్తుంది (మా స్మార్ట్ కాంట్రాక్ట్)
  - `from` లావాదేవీ యొక్క సంతకం చేసేవారిని నిర్దేశిస్తుంది (వినియోగదారుడి కనెక్ట్ చేయబడిన చిరునామా MetaMaskకు: `window.ethereum.selectedAddress`)
  - `data` మా స్మార్ట్ కాంట్రాక్ట్ `mintNFT` పద్ధతికి కాల్‌ను కలిగి ఉంటుంది, ఇది మా `tokenURI` మరియు వినియోగదారుడి వాలెట్ చిరునామా, `window.ethereum.selectedAddress`ను ఇన్‌పుట్‌లుగా స్వీకరిస్తుంది
- అప్పుడు, మేము ఒక await కాల్, `window.ethereum.request,` చేస్తాము, ఇక్కడ మేము లావాదేవీపై సంతకం చేయమని MetaMaskను అడుగుతాము. గమనించండి, ఈ అభ్యర్థనలో, మేము మా eth పద్ధతిని (eth_SentTransaction) నిర్దేశిస్తున్నాము మరియు మా `transactionParameters`ను పాస్ చేస్తున్నాము. ఈ సమయంలో, MetaMask బ్రౌజర్‌లో తెరుచుకుంటుంది మరియు లావాదేవీపై సంతకం చేయమని లేదా తిరస్కరించమని వినియోగదారుడిని ప్రాంప్ట్ చేస్తుంది.
  - లావాదేవీ విజయవంతమైతే, ఫంక్షన్ `success` బూలియన్ నిజంగా సెట్ చేయబడిన ఒక JSON వస్తువును మరియు `status` స్ట్రింగ్ వినియోగదారుడిని వారి లావాదేవీ గురించి మరింత సమాచారం కోసం Etherscanను చూడమని ప్రాంప్ట్ చేసే ఒక JSON వస్తువును తిరిగి ఇస్తుంది.
  - లావాదేవీ విఫలమైతే, ఫంక్షన్ `success` బూలియన్ తప్పుగా సెట్ చేయబడిన ఒక JSON వస్తువును మరియు `status` స్ట్రింగ్ దోష సందేశాన్ని తెలియజేసే ఒక JSON వస్తువును తిరిగి ఇస్తుంది.

మొత్తం మీద, మా `mintNFT` ఫంక్షన్ ఇలా కనిపించాలి:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  }

  //sign transaction via MetaMask
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

అది ఒక పెద్ద ఫంక్షన్! ఇప్పుడు, మేము మా `mintNFT` ఫంక్షన్‌ను మా `Minter.js` కాంపోనెంట్‌కు కనెక్ట్ చేయాలి...

## mintNFTని మా Minter.js ఫ్రంటెండ్‌కు కనెక్ట్ చేయండి {#connect-our-frontend}

మీ `Minter.js` ఫైల్‌ను తెరిచి, పైభాగంలో ఉన్న `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` పంక్తిని ఇలా అప్‌డేట్ చేయండి:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

చివరగా, మీ దిగుమతి చేసుకున్న `mintNFT` ఫంక్షన్‌కు await కాల్ చేయడానికి మరియు మా లావాదేవీ విజయవంతమైందో లేదా విఫలమైందో ప్రతిబింబించేలా `status` స్టేట్ వేరియబుల్‌ను అప్‌డేట్ చేయడానికి `onMintPressed` ఫంక్షన్‌ను అమలు చేయండి:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## మీ NFTని ప్రత్యక్ష వెబ్‌సైట్‌కు అమలు చేయండి {#deploy-your-NFT}

వినియోగదారులు సంభాషించడానికి మీ ప్రాజెక్ట్‌ను ప్రత్యక్షంగా తీసుకెళ్లడానికి సిద్ధంగా ఉన్నారా? మీ మింటర్‌ను ప్రత్యక్ష వెబ్‌సైట్‌కు అమలు చేయడానికి [ఈ ట్యుటోరియల్](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)ని చూడండి.

ఒక చివరి దశ...

## బ్లాక్‌చైన్ ప్రపంచాన్ని తుఫానులా ముంచెత్తండి {#take-the-blockchain-world-by-storm}

కేవలం సరదాకి, మీరు ట్యుటోరియల్ చివరికి చేరుకున్నారు!

సంక్షిప్తంగా, ఒక NFT మింటర్‌ను నిర్మించడం ద్వారా, మీరు విజయవంతంగా ఎలాగో నేర్చుకున్నారు:

- మీ ఫ్రంటెండ్ ప్రాజెక్ట్ ద్వారా MetaMaskకు కనెక్ట్ అవ్వండి
- మీ ఫ్రంటెండ్ నుండి స్మార్ట్ కాంట్రాక్ట్ పద్ధతులను కాల్ చేయండి
- MetaMask ఉపయోగించి లావాదేవీలపై సంతకం చేయండి

బహుశా, మీరు మీ వాలెట్‌లో మీ డాప్ ద్వారా ముద్రించబడిన NFTలను చూపించాలనుకుంటారు — కాబట్టి మా శీఘ్ర ట్యుటోరియల్ [మీ వాలెట్‌లో మీ NFTని ఎలా చూడాలి](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)ని తప్పకుండా చూడండి!

మరియు, ఎప్పటిలాగే, మీకు ఏవైనా ప్రశ్నలు ఉంటే, మేము [Alchemy Discord](https://discord.gg/gWuC7zB)లో సహాయం చేయడానికి ఇక్కడ ఉన్నాము. ఈ ట్యుటోరియల్ నుండి మీరు నేర్చుకున్న భావనలను మీ భవిష్యత్ ప్రాజెక్ట్‌లకు ఎలా వర్తింపజేస్తారో చూడటానికి మేము వేచి ఉండలేము!
