---
title: "ఆఫ్‌లైన్ డేటా సమగ్రత కొరకు మెర్కిల్ ప్రూఫ్‌లు"
description: "ఎక్కువగా ఆఫ్‌చెయిన్‌లో నిల్వ చేయబడిన డేటా కోసం ఆన్‌చెయిన్‌లో డేటా సమగ్రతను నిర్ధారించడం"
author: Ori Pomerantz
tags: [ "స్టోరేజ్" ]
skill: advanced
lang: te
published: 2021-12-30
---

## పరిచయం {#introduction}

ఆదర్శప్రాయంగా మనం ప్రతిదాన్నీ ఇథీరియం నిల్వలో నిల్వ చేయాలనుకుంటున్నాం, ఇది వేలాది కంప్యూటర్‌లలో నిల్వ చేయబడి, అత్యంత అధిక లభ్యతను (డేటాను సెన్సార్ చేయలేరు) మరియు సమగ్రతను (డేటాను అనధికారిక పద్ధతిలో సవరించలేరు) కలిగి ఉంది, కానీ ఒక 32-బైట్ పదాన్ని నిల్వ చేయడానికి సాధారణంగా 20,000 గ్యాస్ ఖర్చు అవుతుంది. నేను ఇది వ్రాస్తున్నప్పుడు, ఆ ఖర్చు $6.60కి సమానం. ఒక బైట్‌కు 21 సెంట్లతో ఇది అనేక ఉపయోగాలకు చాలా ఖరీదైనది.

ఈ సమస్యను పరిష్కరించడానికి ఇథీరియం పర్యావరణ వ్యవస్థ వికేంద్రీకృత పద్ధతిలో డేటాను నిల్వ చేయడానికి [అనేక ప్రత్యామ్నాయ మార్గాలను](/developers/docs/storage/) అభివృద్ధి చేసింది. సాధారణంగా అవి లభ్యత మరియు ధర మధ్య రాజీని కలిగి ఉంటాయి. అయితే, సమగ్రత సాధారణంగా హామీ ఇవ్వబడుతుంది.

ఈ వ్యాసంలో మీరు డేటాను బ్లాక్‌చెయిన్‌లో నిల్వ చేయకుండా డేటా సమగ్రతను ఎలా నిర్ధారించుకోవాలో [మెర్కిల్ ప్రూఫ్స్](https://computersciencewiki.org/index.php/Merkle_proof) ఉపయోగించి నేర్చుకుంటారు.

## ఇది ఎలా పనిచేస్తుంది? {#how-does-it-work}

సిద్ధాంతపరంగా మనం డేటా యొక్క హాష్‌ను ఆన్‌చెయిన్‌లో నిల్వ చేసి, అవసరమైన లావాదేవీలలో మొత్తం డేటాను పంపవచ్చు. అయితే, ఇది ఇప్పటికీ చాలా ఖరీదైనది. ఒక లావాదేవీకి ఒక బైట్ డేటాకు సుమారు 16 గ్యాస్ ఖర్చు అవుతుంది, ప్రస్తుతం అది సుమారు అర సెంట్, లేదా ఒక కిలోబైట్‌కు సుమారు $5. మెగాబైట్‌కు $5000 వద్ద, డేటాను హాష్ చేసే అదనపు ఖర్చు లేకుండా కూడా ఇది అనేక ఉపయోగాలకు చాలా ఖరీదైనది.

పరిష్కారం ఏమిటంటే, డేటా యొక్క వివిధ ఉపసమితులను పదేపదే హాష్ చేయడం, కాబట్టి మీరు పంపాల్సిన అవసరం లేని డేటా కోసం మీరు కేవలం ఒక హాష్‌ను పంపవచ్చు. మీరు దీన్ని ఒక మెర్కిల్ ట్రీ ఉపయోగించి చేస్తారు, ఇది ఒక ట్రీ డేటా నిర్మాణం, ఇక్కడ ప్రతి నోడ్ దాని క్రింద ఉన్న నోడ్‌ల యొక్క హాష్:

![మెర్కిల్ ట్రీ](tree.png)

రూట్ హాష్ మాత్రమే ఆన్‌చెయిన్‌లో నిల్వ చేయవలసిన భాగం. ఒక నిర్దిష్ట విలువను నిరూపించడానికి, రూట్‌ను పొందడానికి దానితో కలపాల్సిన అన్ని హాష్‌లను మీరు అందిస్తారు. ఉదాహరణకు, `C`ని నిరూపించడానికి మీరు `D`, `H(A-B)`, మరియు `H(E-H)`లను అందిస్తారు.

![C విలువ యొక్క రుజువు](proof-c.png)

## అమలు {#implementation}

[నమూనా కోడ్ ఇక్కడ అందించబడింది](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### ఆఫ్‌చెయిన్ కోడ్ {#offchain-code}

ఈ వ్యాసంలో మనం ఆఫ్‌చెయిన్ గణనల కోసం జావాస్క్రిప్ట్‌ను ఉపయోగిస్తాము. చాలా వికేంద్రీకృత అప్లికేషన్‌లు వాటి ఆఫ్‌చెయిన్ భాగాన్ని జావాస్క్రిప్ట్‌లో కలిగి ఉంటాయి.

#### మెర్కిల్ రూట్‌ను సృష్టించడం {#creating-the-merkle-root}

మొదట మనం మెర్కిల్ రూట్‌ను చైన్‌కు అందించాలి.

```javascript
const ethers = require("ethers")
```

[మేము ఈథర్స్ ప్యాకేజీ నుండి హాష్ ఫంక్షన్‌ను ఉపయోగిస్తాము](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

ఉదాహరణకు, JSON ఉపయోగించడం కంటే ప్రతి ఎంట్రీని ఒకే 256-బిట్ పూర్ణాంకంలోకి ఎన్‌కోడ్ చేయడం వల్ల తక్కువ చదవగలిగే కోడ్ వస్తుంది. అయితే, దీని అర్థం కాంట్రాక్ట్‌లో డేటాను తిరిగి పొందడానికి చాలా తక్కువ ప్రాసెసింగ్, కాబట్టి చాలా తక్కువ గ్యాస్ ఖర్చులు. [మీరు ఆన్‌చెయిన్‌లో JSON చదవవచ్చు](https://github.com/chrisdotn/jsmnSol), వీలైతే అది ఒక చెడ్డ ఆలోచన.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

ఈ సందర్భంలో మన డేటా ప్రారంభంలో 256-బిట్ విలువలు, కాబట్టి ప్రాసెసింగ్ అవసరం లేదు. మనం స్ట్రింగ్‌ల వంటి మరింత సంక్లిష్టమైన డేటా నిర్మాణాన్ని ఉపయోగిస్తే, హాష్‌ల శ్రేణిని పొందడానికి ముందుగా డేటాను హాష్ చేశామని నిర్ధారించుకోవాలి. వినియోగదారులకు ఇతర వినియోగదారుల సమాచారం తెలిసినా మేము పట్టించుకోము అనే కారణం కూడా ఇది అని గమనించండి. లేకపోతే మేము హాష్ చేయవలసి వచ్చేది, తద్వారా వినియోగదారు 1కి వినియోగదారు 0 విలువ తెలియదు, వినియోగదారు 2కి వినియోగదారు 3 విలువ తెలియదు, మొదలైనవి.

```javascript
// Convert between the string the hash function expects and the
// BigInt we use everywhere else.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ఈథర్స్ హాష్ ఫంక్షన్ `0x60A7` వంటి హెక్సాడెసిమల్ సంఖ్యతో కూడిన జావాస్క్రిప్ట్ స్ట్రింగ్‌ను పొందాలని ఆశిస్తుంది మరియు అదే నిర్మాణంతో మరో స్ట్రింగ్‌తో ప్రతిస్పందిస్తుంది. అయితే, మిగిలిన కోడ్ కోసం `BigInt`ని ఉపయోగించడం సులభం, కాబట్టి మేము హెక్సాడెసిమల్ స్ట్రింగ్‌కి మరియు మళ్లీ వెనక్కి మారుస్తాము.

```javascript
// Symmetrical hash of a pair so we won't care if the order is reversed.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

ఈ ఫంక్షన్ సౌష్టవమైనది (ఒక [xor](https://en.wikipedia.org/wiki/Exclusive_or) బి యొక్క హాష్). దీని అర్థం, మనం మెర్కిల్ ప్రూఫ్‌ను తనిఖీ చేసినప్పుడు, ప్రూఫ్ నుండి వచ్చిన విలువను లెక్కించిన విలువకు ముందు లేదా తర్వాత ఉంచాలా అనే దాని గురించి మనం ఆందోళన చెందాల్సిన అవసరం లేదు. మెర్కిల్ ప్రూఫ్ తనిఖీ ఆన్‌చెయిన్‌లో జరుగుతుంది, కాబట్టి అక్కడ మనం ఎంత తక్కువ చేయవలసి వస్తే అంత మంచిది.

హెచ్చరిక:
క్రిప్టోగ్రఫీ కనిపించే దానికంటే కష్టం.
ఈ వ్యాసం యొక్క ప్రారంభ వెర్షన్‌లో హాష్ ఫంక్షన్ `hash(a^b)` ఉంది.
అది ఒక **చెడ్డ** ఆలోచన, ఎందుకంటే మీరు `a` మరియు `b` యొక్క చట్టబద్ధమైన విలువలను తెలిస్తే, మీరు ఏ కావలసిన `a'` విలువనైనా నిరూపించడానికి `b' = a^b^a'` ని ఉపయోగించగలరని దాని అర్థం.
ఈ ఫంక్షన్‌తో మీరు `b'`ను లెక్కించాలి, తద్వారా `hash(a') ^ hash(b')` ఒక తెలిసిన విలువకు (రూట్‌కు వెళ్లే మార్గంలో తదుపరి శాఖ) సమానంగా ఉంటుంది, ఇది చాలా కష్టం.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

విలువల సంఖ్య రెండు యొక్క పూర్ణాంక ఘాతం కానప్పుడు మనం ఖాళీ శాఖలను నిర్వహించాలి. ఈ ప్రోగ్రామ్ చేసే విధానం ఏమిటంటే, సున్నాను ప్లేస్‌హోల్డర్‌గా ఉంచడం.

![కొమ్మలు లేని మెర్కిల్ ట్రీ](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input // Add an empty value if necessary (we need all the leaves to be // paired)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

ఈ ఫంక్షన్ ప్రస్తుత లేయర్‌లోని విలువల జతలను హాష్ చేయడం ద్వారా మెర్కిల్ ట్రీలో ఒక స్థాయి "ఎక్కుతుంది". ఇది అత్యంత సమర్థవంతమైన అమలు కాదని గమనించండి, మేము ఇన్‌పుట్‌ను కాపీ చేయకుండా మరియు లూప్‌లో సముచితమైనప్పుడు `hashEmpty`ని జోడించి ఉండవచ్చు, కానీ ఈ కోడ్ చదవడానికి వీలుగా ఆప్టిమైజ్ చేయబడింది.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

రూట్‌ను పొందడానికి, ఒకే ఒక విలువ మిగిలి ఉండే వరకు ఎక్కండి.

#### మెర్కిల్ ప్రూఫ్‌ను సృష్టించడం {#creating-a-merkle-proof}

మెర్కిల్ ప్రూఫ్ అనేది మెర్కిల్ రూట్‌ను తిరిగి పొందడానికి నిరూపించబడుతున్న విలువతో పాటు కలిసి హాష్ చేయవలసిన విలువలు. నిరూపించాల్సిన విలువ తరచుగా ఇతర డేటా నుండి అందుబాటులో ఉంటుంది, కాబట్టి నేను దానిని కోడ్‌లో భాగంగా కాకుండా విడిగా అందించడానికి ఇష్టపడతాను.

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

మేము `(v[0],v[1])`, `(v[2],v[3])`, మొదలైన వాటిని హాష్ చేస్తాము. కాబట్టి సరి విలువల కోసం మనకు తదుపరిది అవసరం, బేసి విలువల కోసం మునుపటిది అవసరం.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### ఆన్‌చెయిన్ కోడ్ {#onchain-code}

చివరగా మనకు ప్రూఫ్‌ను తనిఖీ చేసే కోడ్ ఉంది. ఆన్‌చెయిన్ కోడ్ [Solidity](https://docs.soliditylang.org/en/v0.8.11/)లో వ్రాయబడింది. ఇక్కడ ఆప్టిమైజేషన్ చాలా ముఖ్యం ఎందుకంటే గ్యాస్ చాలా ఖరీదైనది.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

నేను దీనిని [హార్డ్‌హ్యాట్ డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్](https://hardhat.org/)ని ఉపయోగించి వ్రాశాను, ఇది అభివృద్ధి చేస్తున్నప్పుడు [Solidity నుండి కన్సోల్ అవుట్‌పుట్](https://hardhat.org/docs/cookbook/debug-logs)ను కలిగి ఉండటానికి అనుమతిస్తుంది.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

మెర్కిల్ రూట్ కోసం సెట్ మరియు గెట్ ఫంక్షన్‌లు. ప్రొడక్షన్ సిస్టమ్‌లో ప్రతి ఒక్కరినీ మెర్కిల్ రూట్‌ను అప్‌డేట్ చేయడానికి అనుమతించడం _అత్యంత చెడ్డ ఆలోచన_. నమూనా కోడ్ కోసం సరళత కొరకు నేను ఇక్కడ చేస్తున్నాను. **డేటా సమగ్రత నిజంగా ముఖ్యమైన సిస్టమ్‌లో దీన్ని చేయవద్దు**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

ఈ ఫంక్షన్ ఒక జత హాష్‌ను ఉత్పత్తి చేస్తుంది. ఇది `hash` మరియు `pairHash` కోసం జావాస్క్రిప్ట్ కోడ్ యొక్క సాలిడిటీ అనువాదం మాత్రమే.

**గమనిక:** ఇది చదవడానికి వీలుగా ఆప్టిమైజేషన్ యొక్క మరో సందర్భం. [ఫంక్షన్ నిర్వచనం](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) ఆధారంగా, డేటాను [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) విలువగా నిల్వ చేయడం మరియు మార్పిడులను నివారించడం సాధ్యం కావచ్చు.

```solidity
    // Verify a Merkle proof
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

గణిత సంజ్ఞామానంలో మెర్కిల్ ప్రూఫ్ ధృవీకరణ ఇలా కనిపిస్తుంది: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))`. ఈ కోడ్ దీనిని అమలు చేస్తుంది.

## మెర్కిల్ ప్రూఫ్‌లు మరియు రోలప్‌లు కలవవు {#merkle-proofs-and-rollups}

మెర్కిల్ ప్రూఫ్‌లు [రోలప్‌లతో](/developers/docs/scaling/#rollups) సరిగ్గా పనిచేయవు. కారణం ఏమిటంటే, రోలప్‌లు మొత్తం లావాదేవీల డేటాను L1లో వ్రాస్తాయి, కానీ L2లో ప్రాసెస్ చేస్తాయి. ఒక లావాదేవీతో మెర్కిల్ ప్రూఫ్‌ను పంపడానికి అయ్యే ఖర్చు సగటున ఒక లేయర్‌కు 638 గ్యాస్ (ప్రస్తుతం కాల్ డేటాలో ఒక బైట్ సున్నా కాకపోతే 16 గ్యాస్, మరియు సున్నా అయితే 4 ఖర్చు అవుతుంది). మనకు 1024 పదాల డేటా ఉంటే, ఒక మెర్కిల్ ప్రూఫ్‌కు పది లేయర్లు లేదా మొత్తం 6380 గ్యాస్ అవసరం.

ఉదాహరణకు [ఆప్టిమిజం](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)లో చూస్తే, L1 గ్యాస్ రాయడానికి సుమారు 100 gwei మరియు L2 గ్యాస్ 0.001 gwei ఖర్చు అవుతుంది (ఇది సాధారణ ధర, రద్దీతో ఇది పెరగవచ్చు). కాబట్టి ఒక L1 గ్యాస్ ఖర్చుతో మనం L2 ప్రాసెసింగ్‌పై లక్ష గ్యాస్ ఖర్చు చేయవచ్చు. మనం నిల్వను ఓవర్‌రైట్ చేయలేదని ఊహిస్తే, ఒక L1 గ్యాస్ ధరకు L2లోని నిల్వకు సుమారు ఐదు పదాలు వ్రాయగలమని దీని అర్థం. ఒకే మెర్కిల్ ప్రూఫ్ కోసం మనం మొత్తం 1024 పదాలను నిల్వకు వ్రాయవచ్చు (అవి లావాదేవీలో అందించబడకుండా, ప్రారంభంలో ఆన్‌చెయిన్‌లో లెక్కించబడతాయని ఊహిస్తే) మరియు ఇంకా చాలా గ్యాస్ మిగిలి ఉంటుంది.

## ముగింపు {#conclusion}

నిజ జీవితంలో మీరు మీ స్వంతంగా మెర్కిల్ ట్రీలను ఎప్పటికీ అమలు చేయకపోవచ్చు. మీరు ఉపయోగించగల బాగా తెలిసిన మరియు ఆడిట్ చేయబడిన లైబ్రరీలు ఉన్నాయి మరియు సాధారణంగా చెప్పాలంటే, క్రిప్టోగ్రాఫిక్ ప్రిమిటివ్‌లను మీ స్వంతంగా అమలు చేయకపోవడమే మంచిది. కానీ ఇప్పుడు మీరు మెర్కిల్ ప్రూఫ్‌లను బాగా అర్థం చేసుకున్నారని మరియు అవి ఎప్పుడు ఉపయోగించడం విలువైనవో నిర్ణయించుకోగలరని నేను ఆశిస్తున్నాను.

మెర్కిల్ ప్రూఫ్‌లు _సమగ్రత_ను కాపాడతాయి, కానీ అవి _లభ్యత_ను కాపాడవు అని గమనించండి. డేటా నిల్వ యాక్సెస్‌ను నిరాకరించాలని నిర్ణయించుకుంటే మరియు మీరు వాటిని యాక్సెస్ చేయడానికి మెర్కిల్ ట్రీని నిర్మించలేకపోతే, మీ ఆస్తులను మరెవరూ తీసుకోలేరని తెలుసుకోవడం చిన్న ఓదార్పు. కాబట్టి మెర్కిల్ ట్రీలను IPFS వంటి వికేంద్రీకృత నిల్వతో ఉత్తమంగా ఉపయోగిస్తారు.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
