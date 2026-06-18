---
title: "మీ గ్యాస్‌లెస్ వినియోగదారులను టోకెన్‌లను కలిగి ఉండటానికి మరియు కాంట్రాక్ట్‌లను కాల్ చేయడానికి అనుమతించడం"
description: "ఖాతా నైరూప్యతను ఉపయోగించి, నిర్దిష్ట EOA ద్వారా పంపబడిన లేదా ఆ EOA ద్వారా సంతకం చేయబడిన లావాదేవీలను అంగీకరించే స్మార్ట్ కాంట్రాక్ట్ వాలెట్‌లను మనం సృష్టించవచ్చు. ఈ స్మార్ట్ కాంట్రాక్ట్‌లు అప్పుడు టోకెన్‌లను కలిగి ఉండగలవు, ఇవి EOA నియంత్రణలో ఉంటాయి."
author: "ఓరి పోమెరాంట్జ్"
tags: ["గ్యాస్‌లెస్", "ERC-20", "ఖాతా నైరూప్యత"]
skill: intermediate
breadcrumb: "గ్యాస్‌లెస్ టోకెన్"
lang: te
published: 2026-04-01
---

## పరిచయం {#introduction}

[మునుపటి కథనం](/developers/tutorials/gasless/) EIP-712 సంతకాలను ఉపయోగించి మీ స్వంత అప్లికేషన్‌కు గ్యాస్‌లెస్ యాక్సెస్‌ను ఉపయోగించడం గురించి చర్చించింది, కానీ ఇది మీ స్వంత స్మార్ట్ కాంట్రాక్ట్‌లకు మాత్రమే పరిమితం చేయబడింది. [ఖాతా నైరూప్యత](/roadmap/account-abstraction/)ను ఉపయోగించి, మనం రెండు రకాల లావాదేవీలను అంగీకరించి, వాటిని అభ్యర్థించిన గమ్యస్థానానికి రిలే చేసే స్మార్ట్ కాంట్రాక్ట్ వాలెట్‌లను సృష్టించవచ్చు:

- నిర్దిష్ట EOA ద్వారా పంపబడిన లావాదేవీలు (దీనికి ఆ EOA వద్ద ETH ఉండటం అవసరం)
- ఎక్కడి నుండైనా పంపబడిన, కానీ అదే EOA ద్వారా సంతకం చేయబడిన లావాదేవీలు.

ఈ విధంగా, ఒక ఖాతా ఆస్తులను (టోకెన్‌లు మొదలైనవి) కలిగి ఉండటానికి మరియు గ్యాస్ ఉన్న EOA చేయగల అన్ని విధులను నిర్వహించడానికి మనం గ్యాస్‌లెస్ మార్గాన్ని అందించవచ్చు.

### మనం అభ్యర్థనను ఎందుకు రిలే చేయలేము? {#why-no-tx-origin}

ERC-20 మరియు సంబంధిత ప్రమాణాలలో, ఖాతా యజమాని [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), అంటే టోకెన్ కాంట్రాక్ట్‌ను కాల్ చేసిన చిరునామా, ఇది లావాదేవీని ప్రారంభించిన [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) కానవసరం లేదు. [భద్రతా కారణాల](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) దృష్ట్యా ఇది అవసరం. దీని అర్థం మనం టోకెన్ బదిలీ అభ్యర్థనలను రిలే చేస్తే, అవి వినియోగదారు నియంత్రణలో ఉన్న చిరునామాకు బదులుగా రిలేయర్ చిరునామా నుండి టోకెన్‌లను బదిలీ చేయడానికి ప్రయత్నిస్తాయి.

[EIP-7702](https://eip7702.io/) ద్వారా EOA చిరునామాను ఉపయోగించడానికి మిమ్మల్ని అనుమతించే ఒక పరిష్కారం ఉంది, కానీ దీనికి ప్రమాదకరమైన ప్రాతినిధ్యం అప్పగింతపై సంతకం చేయడం అవసరం, కాబట్టి వాలెట్ ప్రొవైడర్ ఆమోదించే స్మార్ట్ కాంట్రాక్ట్‌కు ప్రతినిధిగా చేయడానికి మాత్రమే మీరు దీన్ని ఉపయోగించగలరు. ఈ ట్యుటోరియల్ కోసం నేను వినియోగదారుకు ప్రాక్సీగా స్మార్ట్ కాంట్రాక్ట్‌ను సృష్టించే చాలా సులభమైన పద్ధతిని ఇష్టపడతాను.

## దీన్ని ఆచరణలో చూడటం {#in-action}

1. మీ వద్ద [Node](https://nodejs.org/en/download) మరియు [Foundry](https://www.getfoundry.sh/introduction/installation) రెండూ ఉన్నాయని నిర్ధారించుకోండి.

2. అప్లికేషన్‌ను క్లోన్ చేయండి మరియు అవసరమైన సాఫ్ట్‌వేర్‌ను ఇన్‌స్టాల్ చేయండి.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Sepoliaలో ETH ఉన్న వాలెట్‌కు `SEPOLIA_PRIVATE_KEY`ని సెట్ చేయడానికి `.env`ని సవరించండి. మీకు Sepolia ETH అవసరమైతే, దాన్ని పొందడానికి [ఫాసెట్‌ను ఉపయోగించండి](/developers/docs/networks/#sepolia). ఆదర్శవంతంగా, ఈ ప్రైవేట్ కీ మీ బ్రౌజర్ వాలెట్‌లో ఉన్నదాని కంటే భిన్నంగా ఉండాలి.

4. సర్వర్‌ను ప్రారంభించండి.

   ```sh
   npm run dev
   ```

5. URL [`http://localhost:5173`](http://localhost:5173) వద్ద అప్లికేషన్‌ను బ్రౌజ్ చేయండి.

6. వాలెట్‌కు కనెక్ట్ చేయడానికి **Connect with Injected**పై క్లిక్ చేయండి. వాలెట్‌లో ఆమోదించండి మరియు అవసరమైతే Sepoliaకి మార్పును ఆమోదించండి.

7. క్రిందికి స్క్రోల్ చేసి, **Deploy UserProxy (slow process)**పై క్లిక్ చేయండి.

8. **UserProxy access** పక్కన ఒక చిరునామా ఉన్నందున వినియోగదారు ప్రాక్సీ ఎప్పుడు డిప్లాయ్ చేయబడిందో మీరు చూడవచ్చు. మీరు 24 సెకన్లు (2 బ్లాక్‌లు) వేచి ఉండి, అది ఇంకా జరగకపోతే, మార్పులను గుర్తించడంలో సమస్య ఉండవచ్చు.

   అలా అయితే, [Sepolia Explorer](https://eth-sepolia.blockscout.com/)కి వెళ్లి, `npm run dev` వద్ద సర్వర్ అవుట్‌పుట్‌లో మీరు చూసే డిప్లాయ్‌మెంట్ లావాదేవీ హాష్‌ను నమోదు చేయండి. సృష్టించబడిన కాంట్రాక్ట్ చిరునామాను వీక్షించడానికి దానిపై క్లిక్ చేసి, ఆపై దాన్ని కాపీ చేయండి. _Or enter existing proxy address_ ఫీల్డ్‌లో చిరునామాను అతికించి, ఆపై **Set proxy address**పై క్లిక్ చేయండి.

9. టోకెన్‌లను పొందడానికి ERC-20 కాంట్రాక్ట్ యొక్క [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) ఫంక్షన్‌కు కాల్‌ను సమర్పించడానికి **Request more tokens for proxy**పై క్లిక్ చేయండి. వాలెట్‌లో సంతకాన్ని **Confirm** చేయండి. వాస్తవానికి, టోకెన్‌లు ప్రాక్సీ చిరునామాకు చేరుకుంటాయి, వినియోగదారు చిరునామాకు కాదు.

10. క్రిందికి స్క్రోల్ చేసి, _Last transaction:_ కింద ఉన్న లింక్‌పై క్లిక్ చేయండి. ఇది మీకు `faucet` లావాదేవీని చూపించడానికి బ్రౌజర్‌ను తెరుస్తుంది.

11. _amount to transfer_ లో, ఒకటి మరియు వెయ్యి మధ్య సంఖ్యను నమోదు చేయండి. టోకెన్‌లను మీ స్వంత చిరునామాకు బదిలీ చేయడానికి **Transfer**పై క్లిక్ చేయండి. అభ్యర్థన కోసం మీరు **Confirm** క్లిక్ చేయడానికి ముందు, సంతకం చేయబడుతున్న డేటా అపారదర్శకంగా ఉందని గమనించండి. వినియోగదారులు తాము దేనిపై సంతకం చేస్తున్నారో అర్థం చేసుకోవడం కష్టంగా ఉంటుంది. మనం దీని గురించి [క్రింద](#vulnerabilities) చర్చిస్తామని గుర్తుంచుకోండి.

12. లావాదేవీ నిర్ధారించబడిన తర్వాత, _your balance_ మరియు _proxy balance_ రెండింటిలోనూ మార్పును చూడటానికి వేచి ఉండండి. Sepolia 12 సెకన్ల బ్లాక్ సమయాన్ని కలిగి ఉన్నందున దీనికి కూడా కొంత సమయం పడుతుందని గమనించండి.

## ఇది ఎలా పనిచేస్తుంది {#how-work}

గ్యాస్‌లెస్ అనుభవం కోసం, మనకు వినియోగదారు కోసం ఒక వినియోగదారు ఇంటర్‌ఫేస్, వినియోగదారు ఇంటర్‌ఫేస్ నుండి చైన్‌కు సందేశాలను రూట్ చేయడానికి ఒక సర్వర్ మరియు వాటిని స్వీకరించడానికి మరియు ధృవీకరించడానికి ఒక స్మార్ట్ కాంట్రాక్ట్ అవసరం.

### వాలెట్ స్మార్ట్ కాంట్రాక్ట్ {#wallet-smart-contract}

ఇది [స్మార్ట్ కాంట్రాక్ట్](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). దీని ఉద్దేశ్యం నిజమైన యజమాని అభ్యర్థించినది చేయడం, దాన్ని అభ్యర్థించడానికి ఉపయోగించిన ఛానెల్‌తో సంబంధం లేకుండా, మరియు మిగతా వాటిని విస్మరించడం. దీన్ని చేయడానికి, దీని ఫంక్షన్‌లు కాల్ చేయడానికి లక్ష్య చిరునామాను మరియు దాన్ని కాల్ చేయడానికి ఉపయోగించాల్సిన డేటాను స్వీకరిస్తాయి.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

యజమాని గుర్తింపు మరియు సందేశాలు పునరావృతం కాకుండా నిరోధించడానికి ఒక [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce). నాన్స్ అనేది `public` వేరియబుల్ అయినందున, Solidity కంపైలర్ ఒక వ్యూ ఫంక్షన్, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0)ని కూడా సృష్టిస్తుంది, ఇది ఆఫ్‌చైన్ కోడ్‌ను దాని విలువను చదవడానికి అనుమతిస్తుంది.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 సంతకాలను](https://eips.ethereum.org/EIPS/eip-712) ధృవీకరించడానికి అవసరమైన సమాచారం.

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

ఒక `UserProxy` ఒకే యజమాని చిరునామాకు ముడిపడి ఉంటుంది. ఇది ఆస్తులను (ERC-20 టోకెన్‌లు, NFTలు మొదలైనవి) కలిగి ఉండగలదు కాబట్టి ఇది అవసరం. వేర్వేరు యజమానులకు చెందిన ఆస్తులను మనం కలపకూడదనుకుంటున్నాము.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[డొమైన్ సెపరేటర్](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). ఇది కంపైల్ సమయంలో లెక్కించబడదు, ఎందుకంటే ఇది చైన్ ID మరియు కాంట్రాక్ట్ చిరునామాపై ఆధారపడి ఉంటుంది. ఇది మరొకదాని కోసం సిద్ధం చేసిన సందేశం ద్వారా UserProxy మోసపోవడాన్ని అసాధ్యం చేస్తుంది.

```solidity
    event CallResult(address target, bytes returnData);
```

కాల్ ఫలితాలను లాగ్ చేయండి.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

ఈ ఫంక్షన్‌ను యజమాని నేరుగా కాల్ చేయవచ్చు. రిలేలు ఏవీ అందుబాటులో లేకపోతే, యజమాని ఇప్పటికీ బ్లాక్‌చైన్‌లో నేరుగా ఆస్తులను యాక్సెస్ చేయవచ్చు (వినియోగదారు వద్ద ETH ఉంటే).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

మనం యజమాని ద్వారా _నేరుగా_ కాల్ చేయబడితే, అందించిన కాల్ డేటాతో లక్ష్యాన్ని కాల్ చేయండి.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

ఇది `UserProxy` యొక్క ప్రధాన ఫంక్షన్. ఇది `target` మరియు `data`తో పాటు సంతకాన్ని పొందుతుంది.

```solidity
    external returns (bytes memory) {
        // EIP-712 డైజెస్ట్‌ను లెక్కించండి
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

డైజెస్ట్‌లో నాన్స్ కూడా ఉంటుంది, కానీ మనం దాన్ని లావాదేవీ నుండి స్వీకరించాల్సిన అవసరం లేదు; సరైన విలువ మనకు ఇప్పటికే తెలుసు. తప్పు నాన్స్‌తో ఉన్న సంతకం తిరస్కరించబడుతుంది.

```solidity

    // సంతకం చేసినవారిని తిరిగి పొందండి
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

సంతకం చెల్లనిదైతే, `ecrecover` సాధారణంగా వేరే చిరునామాను అందిస్తుంది మరియు అది అంగీకరించబడదు.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

వినియోగదారు మనకు కాల్ చేయమని చెప్పిన కాంట్రాక్ట్‌ను కాల్ చేయండి మరియు విజయవంతం కాకపోతే రివర్ట్ చేయండి.

```solidity
    emit CallResult(target, returnData);

    nonce++; // రీప్లేను నిరోధించడానికి నాన్స్‌ను పెంచండి

    return returnData;
}
```

విజయవంతమైతే, లాగ్ ఈవెంట్‌ను విడుదల చేయండి మరియు నాన్స్‌ను పెంచండి.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

ఇవి దాదాపు ఒకేలా ఉండే వేరియంట్‌లు, ఇవి కాంట్రాక్ట్ నుండి ETHని బదిలీ చేయడానికి కూడా మిమ్మల్ని అనుమతిస్తాయి.

### రిలేయర్ {#relayer}

రిలేయర్ అనేది ఒక [సర్వర్ కాంపోనెంట్](/developers/tutorials/server-components/). ఇది JavaScriptలో వ్రాయబడింది; మీరు సోర్స్ కోడ్‌ను [ఇక్కడ](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) చూడవచ్చు.

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

మనకు అవసరమైన లైబ్రరీలు. ఇది ఒక [Express](https://expressjs.com/) సర్వర్, ఇది వినియోగదారు ఇంటర్‌ఫేస్ కోడ్‌ను అందించడానికి [Vite](https://vite.dev/)ని ఉపయోగిస్తుంది. బ్లాక్‌చైన్‌తో కమ్యూనికేట్ చేయడానికి మనం [Viem](https://viem.sh/)ని ఉపయోగిస్తాము మరియు లావాదేవీని పంపే చిరునామా కోసం ప్రైవేట్ కీని చదవడానికి [dotenv](https://www.dotenv.org/)ని ఉపయోగిస్తాము.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

కంపైల్ చేయబడిన `UserProxy`ని చదవడానికి ఇది ఒక సులభమైన మార్గం. `UserProxy`ని కాల్ చేయడానికి మనకు ABI అవసరం మరియు వినియోగదారు కోసం దాన్ని డిప్లాయ్ చేయడానికి కంపైల్ చేయబడిన కోడ్ అవసరం.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` ఫైల్‌ను చదవండి, చిరునామాను సంగ్రహించండి మరియు దాన్ని కన్సోల్‌కు ప్రింట్ చేయండి.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

బ్లాక్‌చైన్‌తో మాట్లాడే Viem క్లయింట్‌లు.

```js
const start = async () => {
  const app = express()
```

Express సర్వర్‌ను రన్ చేయండి.

```js
  app.use(express.json())
```

అభ్యర్థన బాడీని చదవమని మరియు అది JSON అయితే దాన్ని పార్స్ చేయమని Expressకి చెప్పండి.

```js
  app.post("/server/deploy", async (req, res) => {
```

ప్రాక్సీని డిప్లాయ్ చేయడానికి అభ్యర్థనలను నిర్వహించే కోడ్ ఇది. ఇక్కడ మనం [డినియల్-ఆఫ్-సర్వీస్](https://en.wikipedia.org/wiki/Denial-of-service_attack) దాడులకు గురయ్యే అవకాశం ఉందని గమనించండి, ఎందుకంటే మన ETH అయిపోయే వరకు ప్రాక్సీని డిప్లాయ్ చేయమని అభ్యర్థనలతో దాడి చేసే వ్యక్తి మనకు స్పామ్ చేయవచ్చు. ప్రొడక్షన్ సిస్టమ్‌లో, ప్రాక్సీని డిప్లాయ్ చేయాలనే అభ్యర్థనపై సంతకం చేయబడాలని మరియు సంతకం చేసే వ్యక్తి ఇప్పటికే ఉన్న కస్టమర్ అయి ఉండాలని మనం బహుశా కోరుతాము.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

అభ్యర్థన నుండి యజమాని చిరునామాను పొందండి.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[కాంట్రాక్ట్‌ను డిప్లాయ్ చేయండి](https://viem.sh/docs/contract/deployContract#deploycontract) మరియు [అది డిప్లాయ్ అయ్యే వరకు వేచి ఉండండి](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

అంతా బాగానే ఉంటే, ప్రాక్సీ చిరునామాను వినియోగదారు ఇంటర్‌ఫేస్‌కు తిరిగి ఇవ్వండి.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

సమస్య ఉంటే, దాన్ని నివేదించండి.

```js
  app.post("/server/message", async (req, res) => {
```

`UserProxy` కాంట్రాక్ట్ కోసం వినియోగదారు సందేశాలను ప్రాసెస్ చేసే కోడ్ ఇది. డినియల్-ఆఫ్-సర్వీస్ దాడికి గురయ్యే అవకాశం ఉన్న మరొక పాయింట్ ఇది.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

అభ్యర్థన డేటాను పొందండి మరియు ప్రాక్సీలో `signedAccess`ని కాల్ చేయడానికి దాన్ని ఉపయోగించండి.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

లావాదేవీ హాష్‌ను తిరిగి నివేదించండి. ఇది వినియోగదారు లావాదేవీని తనిఖీ చేయడానికి UI ఒక URLని ప్రదర్శించడానికి అనుమతిస్తుంది.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

మళ్ళీ, సమస్య ఉంటే, దాన్ని నివేదించండి.

```js
  // మిగతావన్నీ Vite నిర్వహించనివ్వండి
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

మిగతా వాటన్నింటికీ, మన కోసం వినియోగదారు ఇంటర్‌ఫేస్‌ను అందించడాన్ని నిర్వహించే Viteని ఉపయోగించండి.

### వినియోగదారు ఇంటర్‌ఫేస్ {#user-interface}

[ఇది వినియోగదారు ఇంటర్‌ఫేస్ కోడ్](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) మినహా, చాలా కోడ్ [ఈ కథనంలో](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) డాక్యుమెంట్ చేయబడిన దానికి దాదాపు ఒకేలా ఉంటుంది.

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) లోని భాగాలు [ఈ కథనంలోని](/developers/tutorials/gasless/#ui-changes) [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)ని పోలి ఉంటాయి. ఇక్కడ కొత్త భాగాలు ఉన్నాయి.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[ఈ ఫంక్షన్](https://viem.sh/docs/contract/encodeFunctionData) EVM ఫంక్షన్ కాల్ కోసం కాల్ డేటాను సృష్టిస్తుంది. వినియోగదారు కాల్ డేటాపై సంతకం చేయడానికి ఇది అవసరం.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

పైన వివరించిన `UserProxy`.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[ఈ కాంట్రాక్ట్](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) ఎక్కువగా సాధారణ ERC-20 కాంట్రాక్ట్, దీనికి ఒక ముఖ్యమైన ఫంక్షన్ `faucet()` జోడించబడింది. ఈ ఫంక్షన్ పరీక్ష ప్రయోజనాల కోసం టోకెన్‌లను అడిగే ఎవరికైనా వాటిని మంజూరు చేస్తుంది.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken` కోసం చిరునామా.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

ఈ కాంపోనెంట్ బ్లాక్ ఎక్స్‌ప్లోరర్‌లో కాంట్రాక్ట్‌కు లింక్‌తో కూడిన చిరునామాను అవుట్‌పుట్ చేస్తుంది.

```js
const Token = () => {
    ...
```

చాలా పని చేసే ప్రధాన కాంపోనెంట్ ఇది.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

వినియోగదారు చిరునామా యొక్క టోకెన్ బ్యాలెన్స్.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

వినియోగదారు స్వంతమైన ప్రాక్సీ చిరునామా.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

ప్రాక్సీ యొక్క టోకెన్ బ్యాలెన్స్.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

వినియోగదారు ప్రాక్సీ చిరునామాను మాన్యువల్‌గా సెట్ చేసినప్పుడు ఈ ఫీల్డ్ ఉపయోగించబడుతుంది. ప్రాక్సీ చిరునామాను మాన్యువల్‌గా సెట్ చేయగల సామర్థ్యం ఉండటం వలన వినియోగదారు ప్రతిసారీ కొత్తదాన్ని డిప్లాయ్ చేయడానికి బదులుగా (మరియు పాత ప్రాక్సీ స్వంతమైన అన్ని టోకెన్‌లను కోల్పోకుండా) ఇప్పటికే ఉన్న ప్రాక్సీని ఉపయోగించడానికి అనుమతిస్తుంది.

```js
  const [ txHash, setTxHash ] = useState(null)
```

చివరి లావాదేవీ యొక్క హాష్, వినియోగదారు ఆ లావాదేవీని తనిఖీ చేయడానికి ఎక్స్‌ప్లోరర్‌కు లింక్‌ను చూపించడానికి ఉపయోగించబడుతుంది.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

ఈ ఫీల్డ్‌లన్నీ ERC-20 కాంట్రాక్ట్‌కు టోకెన్ బదిలీ ఆదేశాలను పంపడానికి ఉపయోగించబడతాయి. ఇది `FaucetToken` కావచ్చు, కానీ అలా ఉండవలసిన అవసరం లేదు. [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) ఫంక్షన్ ERC-20 ప్రమాణంలో భాగం.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

మనకు ఆసక్తి ఉన్న రెండు టోకెన్ బ్యాలెన్స్‌లను చదవండి, వినియోగదారు ఎంత కలిగి ఉన్నారు మరియు ప్రాక్సీ ఎంత కలిగి ఉంది.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

రీప్లే దాడులను నిరోధించడానికి (ఉదాహరణకు, విక్రేత తమకు డబ్బు ఇచ్చే లావాదేవీని రీప్లే చేయడం), మనం ఒక [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce)ని ఉపయోగిస్తాము. మనం సంతకం చేసే డేటాకు దాన్ని జోడించడానికి ప్రస్తుత విలువను తెలుసుకోవాలి.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

బ్లాక్‌చైన్ నుండి చదివిన సమాచారం మారినప్పుడు వినియోగదారుకు ప్రదర్శించబడే బ్యాలెన్స్‌ను అప్‌డేట్ చేయడానికి [`useEffect`](https://react.dev/reference/react/useEffect)ని ఉపయోగించండి.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

డిఫాల్ట్‌గా `FaucetToken` టోకెన్‌లను వినియోగదారు స్వంత ఖాతాకు బదిలీ చేయడం. ఇక్కడ మనం వాటిని Viem నుండి స్వీకరించినప్పుడు ఈ విలువలను సెట్ చేస్తాము.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

టెక్స్ట్ ఫీల్డ్‌లు మారినప్పుడు ఈవెంట్ హ్యాండ్లర్‌లు.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

ఈ వినియోగదారు కోసం ప్రాక్సీని డిప్లాయ్ చేయమని సర్వర్‌ను అడగండి.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

ఆన్‌చైన్‌లో `UserProxy`కి పంపడానికి సర్వర్‌కు పంపే ముందు సందేశంపై సంతకం చేయండి. ఇది [ఇక్కడ](/developers/tutorials/gasless/#ui-changes) వివరించబడింది. మనం లక్ష్య చిరునామా (మనం కాల్ చేస్తున్న టోకెన్ చిరునామా) మరియు పంపాల్సిన కాల్ డేటా రెండింటితో కూడిన సందేశంపై సంతకం చేయాలి.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

సంతకం చేసిన సందేశాన్ని `UserProxy`కి పంపండి, ఇది సంతకాన్ని ధృవీకరిస్తుంది మరియు ఆపై దాన్ని `target`కి పంపుతుంది.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // రెండు చిరునామాలు
          data,           // లక్ష్యానికి పంపడానికి కాల్ డేటా
          v, r, s         // సంతకం
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

సర్వర్‌కు అభ్యర్థనను పంపండి మరియు మీరు ప్రతిస్పందనను స్వీకరించినప్పుడు, లావాదేవీ హాష్‌ను పొందండి.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` ఫంక్షన్‌ను కాల్ చేయడాన్ని అనుకరించండి. ఇది విజయవంతమైతే మాత్రమే మనం ఫాసెట్ బటన్‌ను ఎనేబుల్ చేస్తాము.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

సర్వర్ మరియు `UserProxy` ద్వారా ఫంక్షన్‌ను కాల్ చేయడానికి, మనం మూడు దశలను అనుసరిస్తాము:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData)ని ఉపయోగించి సంతకం చేయడానికి మరియు పంపడానికి కాల్ డేటాను సృష్టించండి.

2. సందేశంపై సంతకం చేయండి (లక్ష్య చిరునామా, కాల్ డేటా మరియు నాన్స్).

3. సర్వర్‌కు సందేశాన్ని పంపండి.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

కాంపోనెంట్ యొక్క ఈ భాగం బ్రౌజర్ నుండి నేరుగా `FaucetToken`ని ఉపయోగించడానికి మిమ్మల్ని అనుమతిస్తుంది. దీని ప్రధాన ఉద్దేశ్యం డీబగ్గింగ్‌ను సులభతరం చేయడం.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

వినియోగదారుని కొత్త `UserProxy`ని డిప్లాయ్ చేయనివ్వండి.

```js
         <br /><br />
         <input type="text" placeholder="లేదా ఇప్పటికే ఉన్న ప్రాక్సీ చిరునామాను నమోదు చేయండి" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

వినియోగదారులు చట్టబద్ధమైన చిరునామాను నమోదు చేసినప్పుడు మాత్రమే **Set proxy address**పై క్లిక్ చేయడానికి వారిని అనుమతించండి. సందేహాస్పద చిరునామా నిజంగా `UserProxy` కాంట్రాక్ట్ అని ఇది నిర్ధారించదని గమనించండి. అటువంటి తనిఖీని జోడించడం సాధ్యమే, కానీ ఇది చాలా నెమ్మదిగా ఉంటుంది (చెత్త వినియోగదారు అనుభవం) మరియు భద్రతను మెరుగుపరచదు (దాడి చేసేవారు వినియోగదారు ఇంటర్‌ఫేస్ కోసం ఎల్లప్పుడూ వారి స్వంత కోడ్‌ను ఉపయోగించవచ్చు).

```js
         <br /><br />
         { proxyAddr && (
```

చట్టబద్ధమైన ప్రాక్సీ చిరునామా ఉంటే _మాత్రమే_ మిగిలిన వాటిని చూపండి.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

వినియోగదారు నాన్స్‌ను తెలుసుకోవలసిన అవసరం లేదు; ఇది కేవలం డీబగ్గింగ్ ప్రయోజనాల కోసం మాత్రమే.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

మనం ప్రాక్సీ ద్వారా `faucet()`కి కాల్‌ను అనుకరించలేము. అయితే, మనకు ప్రాక్సీ ఉందని మరియు ప్రాక్సీ మనకు నాన్స్‌ను నివేదించిందని మనం కనీసం నిర్ధారించుకోవచ్చు.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

వినియోగదారుని ERC-20 బదిలీ లావాదేవీలను జారీ చేయనివ్వండి.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

చివరి లావాదేవీ హాష్ ఉంటే, వినియోగదారు దాన్ని బ్లాక్ ఎక్స్‌ప్లోరర్‌లో వీక్షించడానికి ఒక లింక్‌ను చూపండి.

```js
      </div>
    </>
  )
}

export {Token}
```

ఇది కేవలం React బాయిలర్‌ప్లేట్.

## దుర్బలత్వాలు {#vulnerabilities}

మన సర్వర్ డినియల్-ఆఫ్-సర్వీస్ దాడులకు గురయ్యే అవకాశం ఉంది. ఈ దాడి [సిరీస్ యొక్క మునుపటి కథనంలో](/developers/tutorials/gasless/#dos-on-server) వివరించబడింది.

అదనంగా, మనం చెడు వినియోగదారు ప్రవర్తనను ప్రోత్సహిస్తున్నాము. వినియోగదారుని సంతకం చేయమని మనం అడిగేది ఇదే:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

వినియోగదారు బదిలీ చేయాలనుకుంటున్న టోకెన్, మొత్తం మరియు గమ్యస్థాన చిరునామా కోసం ఇది చట్టబద్ధమైన ERC-20 బదిలీ అని _మనకు_ తెలుసు. కానీ చాలా మంది వినియోగదారులకు కాల్ డేటాను ఎలా అర్థం చేసుకోవాలో తెలియదు మరియు వారు దేనిపై సంతకం చేస్తున్నారో వారికి తెలియదు. ఇది రెండు కారణాల వల్ల చెడ్డ డిజైన్:

- కొంతమంది వినియోగదారులు మనల్ని ఉపయోగించరు ఎందుకంటే సంతకం చేయమని మనం చెప్పే డేటాను వారు విశ్వసించరు.
- ఇతర వినియోగదారులు మనల్ని విశ్వసిస్తారు _మరియు_ కాల్ డేటా అంటే ఏమిటో అర్థం చేసుకోకుండానే దానిపై సంతకం చేయాలని నేర్చుకుంటారు. దీని అర్థం ఆడమ్ అటాకర్ వారిని తన వెబ్‌సైట్‌కు దారి మళ్లించగలిగితే, వినియోగదారు స్వంతమైన మొత్తం USDC (లేదా DAI, లేదా ఏదైనా ఇతర ERC-20)ని అతనికి మంజూరు చేసే లావాదేవీపై అతను వారితో సంతకం చేయించగలడు.

బదిలీ వంటి సాధారణంగా ఉపయోగించే ఫంక్షన్‌ల కోసం `UserProxy`లో ప్రత్యేక ఫంక్షన్‌లను కలిగి ఉండటమే దీనికి పరిష్కారం. అప్పుడు వినియోగదారులు తమకు అర్థమయ్యే దానిపై సంతకం చేయవచ్చు.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**గమనిక:** వినియోగదారులు తమకు కావలసిన ఏ వాలెట్‌నైనా ఉపయోగించగలిగినప్పటికీ, EIP-712ని ఉపయోగించే అప్లికేషన్‌లు [మొత్తం సంతకం డేటాను చూపే](https://rabby.io/) వాలెట్‌ను ఉపయోగించమని వారిని ప్రోత్సహించడం బాగా సిఫార్సు చేయబడింది. కొన్ని వాలెట్‌లు చిరునామాను కత్తిరిస్తాయి, ఇది అసురక్షితమైనది. దాడి చేసే వ్యక్తి ఒకే ప్రారంభ మరియు ముగింపు అక్షరాలను కలిగి ఉండి, మధ్యలో భిన్నంగా ఉండే చిరునామాను సృష్టించగలడు.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## ముగింపు {#conclusion}

పై దుర్బలత్వాలతో పాటు, ఈ ట్యుటోరియల్‌లోని పరిష్కారం ఎథీరియం మనకు పరిష్కరించడంలో సహాయపడే అనేక లోపాలను కలిగి ఉంది.

- _సెన్సార్‌షిప్ నిరోధకత_. ప్రస్తుతం, వినియోగదారులు మీ సర్వర్‌ను, మరొకరు సెటప్ చేసిన పోటీ సర్వర్‌ను ఉపయోగించవచ్చు లేదా నేరుగా ఎథీరియంకి కనెక్ట్ చేయవచ్చు, దీనికి గ్యాస్ ఖర్చులు అవుతాయి. [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337)ని ఉపయోగించడం వలన వినియోగదారులు తమ లావాదేవీని పెద్ద సర్వర్‌ల పూల్‌కు అందించడానికి అనుమతిస్తుంది, తద్వారా వారి లావాదేవీలు సెన్సార్ చేయబడే అవకాశాన్ని తగ్గిస్తుంది.
- _EOA స్వంత ఆస్తులు_. పైన గమనించినట్లుగా, EOA చిరునామాకు ఇప్పటికే స్వంతమైన ఆస్తులను నిర్వహించడానికి [EIP-7702](https://eip7702.io/)ని ఉపయోగించవచ్చు. దీనికి దాని కష్టాలు ఉన్నాయి, కానీ కొన్నిసార్లు ఇది అవసరం.

సమీప భవిష్యత్తులో ఈ ఫీచర్‌లను జోడించడం గురించి ట్యుటోరియల్‌లను ప్రచురించాలని నేను ఆశిస్తున్నాను.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).