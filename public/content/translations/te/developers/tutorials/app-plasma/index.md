---
title: "గోప్యతను కాపాడే యాప్-నిర్దిష్ట ప్లాస్మాను వ్రాయండి"
description: "ఈ ట్యుటోరియల్‌లో, మేము డిపాజిట్ల కోసం పాక్షిక-రహస్య బ్యాంకును నిర్మిస్తాము. బ్యాంకు ఒక కేంద్రీకృత భాగం; దానికి ప్రతి వినియోగదారుడి బ్యాలెన్స్ తెలుసు. అయితే, ఈ సమాచారం ఆన్‌చైన్‌లో నిల్వ చేయబడదు. బదులుగా, బ్యాంకు స్థితి యొక్క హాష్‌ను పోస్ట్ చేస్తుంది. ప్రతిసారీ ఒక లావాదేవీ జరిగినప్పుడు, బ్యాంకు కొత్త హాష్‌ను పోస్ట్ చేస్తుంది, దానితో పాటు హాష్ స్థితిని కొత్తదానికి మార్చే సంతకం చేసిన లావాదేవీ ఉందని రుజువు చేసే జీరో-కనౌలెడ్జి రుజువు కూడా ఉంటుంది. ఈ ట్యుటోరియల్ చదివిన తర్వాత, మీరు జీరో-కనౌలెడ్జి రుజువులను ఎలా ఉపయోగించాలో మాత్రమే కాకుండా, వాటిని ఎందుకు ఉపయోగిస్తారో మరియు సురక్షితంగా ఎలా చేయాలో కూడా అర్థం చేసుకుంటారు."
author: Ori Pomerantz
tags: [ "జీరో-కనౌలెడ్జి", "సర్వర్", "ఆఫ్‌చైన్", "గోప్యత" ]
skill: advanced
lang: te
published: 2025-10-15
---

## పరిచయం {#introduction}

[రోలప్‌లు](/developers/docs/scaling/zk-rollups/)కు భిన్నంగా, [ప్లాస్మాలు](/developers/docs/scaling/plasma) సమగ్రత కోసం ఇతీరియము మెయిన్‌నెట్‌ను ఉపయోగిస్తాయి, కానీ లభ్యత కోసం కాదు. ఈ వ్యాసంలో, మేము ప్లాస్మా లాగా ప్రవర్తించే ఒక అప్లికేషన్‌ను వ్రాస్తాము, ఇతీరియము సమగ్రతకు (అనధికార మార్పులు లేవు) హామీ ఇస్తుంది కానీ లభ్యతకు కాదు (ఒక కేంద్రీకృత భాగం డౌన్ అయి మొత్తం వ్యవస్థను నిలిపివేయవచ్చు).

మేము ఇక్కడ వ్రాసే అప్లికేషన్ ఒక గోప్యతను కాపాడే బ్యాంకు. వివిధ చిరునామాలకు బ్యాలెన్స్‌లతో ఖాతాలు ఉన్నాయి, మరియు వారు ఇతర ఖాతాలకు డబ్బు (ETH) పంపవచ్చు. బ్యాంకు స్థితి (ఖాతాలు మరియు వాటి బ్యాలెన్స్‌లు) మరియు లావాదేవీల హాష్‌లను పోస్ట్ చేస్తుంది, కానీ అసలు బ్యాలెన్స్‌లను ఆఫ్‌చైన్‌లో ఉంచుతుంది, అక్కడ అవి ప్రైవేట్‌గా ఉండగలవు.

## డిజైన్ {#design}

ఇది ఉత్పత్తికి-సిద్ధమైన వ్యవస్థ కాదు, కానీ ఒక బోధనా సాధనం. అందువల్ల, ఇది అనేక సరళీకరణ అంచనాలతో వ్రాయబడింది.

- స్థిర ఖాతా పూల్. నిర్దిష్ట సంఖ్యలో ఖాతాలు ఉన్నాయి, మరియు ప్రతి ఖాతా ముందుగా నిర్ణయించిన చిరునామాకు చెందినది. ఇది చాలా సరళమైన వ్యవస్థను చేస్తుంది ఎందుకంటే జీరో-కనౌలెడ్జి రుజువులలో వేరియబుల్-సైజ్ డేటా నిర్మాణాలను నిర్వహించడం కష్టం. ఉత్పత్తికి-సిద్ధమైన వ్యవస్థ కోసం, మనం స్థితి హాష్‌గా [మెర్కిల్ రూట్‌ను](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) ఉపయోగించవచ్చు మరియు అవసరమైన బ్యాలెన్స్‌ల కోసం మెర్కిల్ రుజువులను అందించవచ్చు.

- మెమరీ నిల్వ. ఒక ఉత్పత్తి వ్యవస్థలో, పునఃప్రారంభం అయినప్పుడు వాటిని భద్రపరచడానికి మనం అన్ని ఖాతా బ్యాలెన్స్‌లను డిస్క్‌కు వ్రాయాలి. ఇక్కడ, సమాచారం కేవలం పోయినా పర్వాలేదు.

- బదిలీలు మాత్రమే. ఒక ఉత్పత్తి వ్యవస్థకు బ్యాంకులోకి ఆస్తులను డిపాజిట్ చేయడానికి మరియు వాటిని విత్‌డ్రా చేయడానికి ఒక మార్గం అవసరం. కానీ ఇక్కడ ఉద్దేశ్యం కేవలం భావనను వివరించడం, కాబట్టి ఈ బ్యాంకు బదిలీలకు పరిమితం చేయబడింది.

### జీరో-కనౌలెడ్జి రుజువులు {#zero-knowledge-proofs}

ప్రాథమిక స్థాయిలో, ఒక జీరో-కనౌలెడ్జి రుజువు ప్రూవర్‌కు కొన్ని డేటా, _Data<sub>private</sub>_ తెలుసని చూపిస్తుంది, అలాంటి డేటాకు పబ్లిక్ డేటా, _Data<sub>public</sub>_ మరియు _Data<sub>private</sub>_ మధ్య ఒక సంబంధం _Relationship_ ఉంటుంది. వెరిఫైయర్‌కు _Relationship_ మరియు _Data<sub>public</sub>_ తెలుసు.

గోప్యతను కాపాడటానికి, మనకు స్థితులు మరియు లావాదేవీలు ప్రైవేట్‌గా ఉండాలి. కానీ సమగ్రతను నిర్ధారించడానికి, మనకు స్థితుల [క్రిప్టోగ్రాఫిక్ హాష్](https://en.wikipedia.org/wiki/Cryptographic_hash_function) పబ్లిక్‌గా ఉండాలి. లావాదేవీలను సమర్పించే వ్యక్తులకు ఆ లావాదేవీలు నిజంగా జరిగాయని నిరూపించడానికి, మనం లావాదేవీ హాష్‌లను కూడా పోస్ట్ చేయాలి.

చాలా సందర్భాలలో, _Data<sub>private</sub>_ జీరో-కనౌలెడ్జి రుజువు ప్రోగ్రామ్‌కు ఇన్‌పుట్, మరియు _Data<sub>public</sub>_ అవుట్‌పుట్.

_Data<sub>private</sub>_లో ఈ ఫీల్డులు:

- _State<sub>n</sub>_, పాత స్థితి
- _State<sub>n+1</sub>_, కొత్త స్థితి
- _Transaction_, పాత స్థితి నుండి కొత్త స్థితికి మార్చే ఒక లావాదేవీ. ఈ లావాదేవీలో ఈ ఫీల్డులను చేర్చాలి:
  - బదిలీని స్వీకరించే _గమ్యస్థాన చిరునామా_
  - బదిలీ చేయబడుతున్న _మొత్తం_
  - ప్రతి లావాదేవీ ఒకసారి మాత్రమే ప్రాసెస్ చేయబడుతుందని నిర్ధారించడానికి _నాన్స్_.
    మూల చిరునామా లావాదేవీలో ఉండవలసిన అవసరం లేదు, ఎందుకంటే దానిని సంతకం నుండి తిరిగి పొందవచ్చు.
- _సంతకం_, లావాదేవీని నిర్వహించడానికి అధికారం పొందిన ఒక సంతకం. మా విషయంలో, లావాదేవీని నిర్వహించడానికి అధికారం పొందిన ఏకైక చిరునామా మూల చిరునామా. మా జీరో-కనౌలెడ్జి వ్యవస్థ పనిచేసే విధానం కారణంగా, ఇతీరియము సంతకంతో పాటు మాకు ఖాతా యొక్క పబ్లిక్ కీ కూడా అవసరం.

_Data<sub>public</sub>_లో ఇవి ఫీల్డులు:

- _Hash(State<sub>n</sub>)_ పాత స్థితి యొక్క హాష్
- _Hash(State<sub>n+1</sub>)_ కొత్త స్థితి యొక్క హాష్
- _Hash(Transaction)_ _State<sub>n</sub>_ నుండి _State<sub>n+1</sub>_కి స్థితిని మార్చే లావాదేవీ యొక్క హాష్.

ఈ సంబంధం అనేక పరిస్థితులను తనిఖీ చేస్తుంది:

- పబ్లిక్ హాష్‌లు నిజంగా ప్రైవేట్ ఫీల్డులకు సరైన హాష్‌లు.
- లావాదేవీ, పాత స్థితికి వర్తింపజేసినప్పుడు, కొత్త స్థితికి దారితీస్తుంది.
- సంతకం లావాదేవీ యొక్క మూల చిరునామా నుండి వస్తుంది.

క్రిప్టోగ్రాఫిక్ హాష్ ఫంక్షన్ల లక్షణాల కారణంగా, ఈ పరిస్థితులను నిరూపించడం సమగ్రతను నిర్ధారించడానికి సరిపోతుంది.

### డేటా స్ట్రక్చర్‌లు {#data-structures}

ప్రాథమిక డేటా నిర్మాణం సర్వర్ ద్వారా నిర్వహించబడే స్థితి. ప్రతి ఖాతా కోసం, సర్వర్ ఖాతా బ్యాలెన్స్ మరియు [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce)ను ట్రాక్ చేస్తుంది, ఇది [రీప్లే దాడులను](https://en.wikipedia.org/wiki/Replay_attack) నివారించడానికి ఉపయోగించబడుతుంది.

### భాగాలు {#components}

ఈ వ్యవస్థకు రెండు భాగాలు అవసరం:

- లావాదేవీలను స్వీకరించి, వాటిని ప్రాసెస్ చేసి, జీరో-కనౌలెడ్జి రుజువులతో పాటు చైన్‌కు హాష్‌లను పోస్ట్ చేసే _సర్వర్_.
- హాష్‌లను నిల్వ చేసే మరియు స్థితి మార్పులు చట్టబద్ధమైనవని నిర్ధారించడానికి జీరో-కనౌలెడ్జి రుజువులను ధృవీకరించే _స్మార్ట్ కాంట్రాక్ట్_.

### డేటా మరియు నియంత్రణ ప్రవాహం {#flows}

ఒక ఖాతా నుండి మరొక ఖాతాకు బదిలీ చేయడానికి వివిధ భాగాలు సంభాషించే మార్గాలు ఇవి.

1. ఒక వెబ్ బ్రౌజర్, సంతకం చేసినవారి ఖాతా నుండి వేరొక ఖాతాకు బదిలీ కోసం అడుగుతూ సంతకం చేసిన లావాదేవీని సమర్పిస్తుంది.

2. సర్వర్ లావాదేవీ చెల్లుబాటు అయ్యేదని ధృవీకరిస్తుంది:

   - సంతకం చేసినవారికి బ్యాంకులో తగినంత బ్యాలెన్సుతో ఒక ఖాతా ఉంది.
   - స్వీకర్తకు బ్యాంకులో ఒక ఖాతా ఉంది.

3. సర్వర్, సంతకం చేసినవారి బ్యాలెన్స్ నుండి బదిలీ చేయబడిన మొత్తాన్ని తీసివేసి, స్వీకర్త బ్యాలెన్సుకు జోడించడం ద్వారా కొత్త స్థితిని గణిస్తుంది.

4. సర్వర్, స్థితి మార్పు చెల్లుబాటు అయ్యేదని రుజువు చేసే జీరో-కనౌలెడ్జి రుజువును గణిస్తుంది.

5. సర్వర్ ఇతీరియముకు ఒక లావాదేవీని సమర్పిస్తుంది, అందులో ఇవి ఉంటాయి:

   - కొత్త స్థితి హాష్
   - లావాదేవీ హాష్ (కాబట్టి లావాదేవీ పంపినవారు అది ప్రాసెస్ చేయబడిందని తెలుసుకోవచ్చు)
   - కొత్త స్థితికి మార్పు చెల్లుబాటు అయ్యేదని నిరూపించే జీరో-కనౌలెడ్జి రుజువు

6. స్మార్ట్ కాంట్రాక్ట్ జీరో-కనౌలెడ్జి రుజువును ధృవీకరిస్తుంది.

7. జీరో-కనౌలెడ్జి రుజువు సరిపోలితే, స్మార్ట్ కాంట్రాక్ట్ ఈ చర్యలను చేస్తుంది:
   - ప్రస్తుత స్థితి హాష్‌ను కొత్త స్థితి హాష్‌కి నవీకరించండి
   - కొత్త స్థితి హాష్ మరియు లావాదేవీ హాష్‌తో ఒక లాగ్ ఎంట్రీని జారీ చేయండి

### ఉపకరణాలు {#tools}

క్లయింట్-సైడ్ కోడ్ కోసం, మేము [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), మరియు [Wagmi](https://wagmi.sh/)ని ఉపయోగించబోతున్నాము. ఇవి పరిశ్రమ-ప్రామాణిక ఉపకరణాలు; మీకు వాటితో పరిచయం లేకపోతే, మీరు [ఈ ట్యుటోరియల్](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)ను ఉపయోగించవచ్చు.

సర్వర్‌లో అధిక భాగం జావాస్క్రిప్ట్‌లో [Node](https://nodejs.org/en) ఉపయోగించి వ్రాయబడింది. జీరో-కనౌలెడ్జి భాగం [Noir](https://noir-lang.org/)లో వ్రాయబడింది. మాకు వెర్షన్ `1.0.0-beta.10` అవసరం, కాబట్టి మీరు [Noirని సూచించిన విధంగా ఇన్‌స్టాల్ చేసిన](https://noir-lang.org/docs/getting_started/quick_start) తర్వాత, రన్ చేయండి:

```
noirup -v 1.0.0-beta.10
```

మనం ఉపయోగించే బ్లాక్ చైను `anvil`, ఇది [Foundry](https://getfoundry.sh/introduction/installation)లో భాగమైన ఒక స్థానిక పరీక్ష బ్లాక్ చైను.

## అమలు {#implementation}

ఇది ఒక సంక్లిష్టమైన వ్యవస్థ కాబట్టి, మేము దానిని దశలవారీగా అమలు చేస్తాము.

### దశ 1 - మాన్యువల్ జీరో కనౌలెడ్జి {#stage-1}

మొదటి దశ కోసం, మేము బ్రౌజర్‌లో ఒక లావాదేవీకి సంతకం చేసి, ఆపై మాన్యువల్‌గా జీరో-కనౌలెడ్జి రుజువుకు సమాచారాన్ని అందిస్తాము. జీరో-కనౌలెడ్జి కోడ్ ఆ సమాచారాన్ని `server/noir/Prover.toml`లో పొందాలని ఆశిస్తుంది (ఇక్కడ డాక్యుమెంట్ చేయబడింది [here](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

చర్యలో చూడటానికి:

1. మీరు [నోడ్స్](https://nodejs.org/en/download) మరియు [Noir](https://noir-lang.org/install) ఇన్‌స్టాల్ చేసుకున్నారని నిర్ధారించుకోండి. [Node](https://nodejs.org/en/download) మరియు [Noir](https://noir-lang.org/install) ఇన్‌స్టాల్ చేయబడిందని నిర్ధారించుకోండి. ప్రాధాన్యంగా, వాటిని macOS, Linux, లేదా [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) వంటి UNIX సిస్టమ్‌లో ఇన్‌స్టాల్ చేయండి.

2. దశ 1 కోడ్‌ను డౌన్‌లోడ్ చేసి, క్లయింట్ కోడ్‌ను అందించడానికి వెబ్ సర్వర్‌ను ప్రారంభించండి.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   మీకు ఇక్కడ ఒక వెబ్ సర్వర్ అవసరం కావడానికి కారణం, కొన్ని రకాల మోసాలను నివారించడానికి, అనేక వాలెట్‌లు (MetaMask వంటివి) డిస్క్ నుండి నేరుగా అందించబడిన ఫైల్‌లను అంగీకరించవు

3. వాలెట్‌తో ఒక బ్రౌజర్‌ను తెరవండి.

4. వాలెట్‌లో, కొత్త పాస్‌ఫ్రేజ్‌ను నమోదు చేయండి. గమనించండి ఇది మీ ప్రస్తుత పాస్‌ఫ్రేజ్‌ను తొలగిస్తుంది, కాబట్టి _మీకు బ్యాకప్ ఉందని నిర్ధారించుకోండి_.

   పాస్‌ఫ్రేజ్ `test test test test test test test test test test test junk`, ఇది ఆన్విల్ కోసం డిఫాల్ట్ పరీక్ష పాస్‌ఫ్రేజ్.

5. [క్లయింట్-సైడ్ కోడ్‌కు](http://localhost:5173/) బ్రౌజ్ చేయండి.

6. వాలెట్‌కు కనెక్ట్ అవ్వండి మరియు మీ గమ్యస్థాన ఖాతా మరియు మొత్తాన్ని ఎంచుకోండి.

7. **Sign** క్లిక్ చేసి, లావాదేవీపై సంతకం చేయండి.

8. **Prover.toml** శీర్షిక క్రింద, మీరు టెక్స్ట్ కనుగొంటారు. `server/noir/Prover.toml`ను ఆ టెక్స్ట్‌తో భర్తీ చేయండి.

9. జీరో-కనౌలెడ్జి రుజువును అమలు చేయండి.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   అవుట్‌పుట్ ఇలా ఉండాలి

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. సందేశం సరిగ్గా హాష్ చేయబడిందో లేదో చూడటానికి వెబ్ బ్రౌజర్‌లో మీరు చూసే హాష్‌తో చివరి రెండు విలువలను పోల్చండి.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir ఆశించే సమాచార ఫార్మాట్‌ను చూపిస్తుంది.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

సందేశం టెక్స్ట్ ఫార్మాట్‌లో ఉంది, ఇది వినియోగదారుకు అర్థం చేసుకోవడానికి సులభం చేస్తుంది (ఇది సంతకం చేసేటప్పుడు అవసరం) మరియు Noir కోడ్ పార్స్ చేయడానికి సులభం చేస్తుంది. మొత్తం ఒక వైపు భిన్న బదిలీలను ప్రారంభించడానికి మరియు మరోవైపు సులభంగా చదవడానికి వీలుగా ఫిన్నీలలో కోట్ చేయబడింది. చివరి సంఖ్య [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce).

స్ట్రింగ్ 100 అక్షరాల పొడవు ఉంటుంది. జీరో-కనౌలెడ్జి రుజువులు వేరియబుల్-సైజ్ డేటాను సరిగ్గా నిర్వహించవు, కాబట్టి తరచుగా డేటాను ప్యాడ్ చేయడం అవసరం.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

ఈ మూడు పారామితులు స్థిర-పరిమాణ బైట్ శ్రేణులు.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

నిర్మాణాల శ్రేణిని పేర్కొనడానికి ఇది మార్గం. ప్రతి ఎంట్రీ కోసం, మేము చిరునామా, బ్యాలెన్స్ (మిల్లీఈటీహెచ్‌లో, అంటే, [ఫిన్నీ](https://cryptovalleyjournal.com/glossary/finney/)), మరియు తదుపరి నాన్స్ విలువను పేర్కొంటాము.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) క్లయింట్-సైడ్ ప్రాసెసింగ్‌ను అమలు చేస్తుంది మరియు `server/noir/Prover.toml` ఫైల్‌ను ఉత్పత్తి చేస్తుంది (జీరో-కనౌలెడ్జి పారామితులను కలిగి ఉన్నది).

మరింత ఆసక్తికరమైన భాగాల వివరణ ఇక్కడ ఉంది.

```tsx
export default attrs =>  {
```

ఈ ఫంక్షన్ `Transfer` React కాంపోనెంట్‌ను సృష్టిస్తుంది, దీనిని ఇతర ఫైళ్లు దిగుమతి చేసుకోవచ్చు.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

ఇవి ఖాతా చిరునామాలు, `test ...` ద్వారా సృష్టించబడిన చిరునామాలు. test junk` పాస్‌ఫ్రేజ్. మీరు మీ స్వంత చిరునామాలను ఉపయోగించాలనుకుంటే, ఈ నిర్వచనాన్ని సవరించండి.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

ఈ [Wagmi hooks](https://wagmi.sh/react/api/hooks) మాకు [viem](https://viem.sh/) లైబ్రరీ మరియు వాలెట్‌ను యాక్సెస్ చేయడానికి అనుమతిస్తాయి.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

ఇది సందేశం, ఖాళీలతో ప్యాడ్ చేయబడింది. ప్రతిసారీ [`useState`](https://react.dev/reference/react/useState) వేరియబుల్స్ ఒకటి మారినప్పుడు, కాంపోనెంట్ తిరిగి గీయబడుతుంది మరియు `message` నవీకరించబడుతుంది.

```tsx
  const sign = async () => {
```

వినియోగదారు **Sign** బటన్‌ను క్లిక్ చేసినప్పుడు ఈ ఫంక్షన్ కాల్ చేయబడుతుంది. సందేశం స్వయంచాలకంగా నవీకరించబడుతుంది, కానీ సంతకానికి వాలెట్‌లో వినియోగదారు ఆమోదం అవసరం, మరియు అవసరం లేకపోతే మేము దానిని అడగాలనుకోవడం లేదు.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

వాలెట్‌ను [సందేశానికి సంతకం చేయమని](https://viem.sh/docs/accounts/local/signMessage) అడగండి.

```tsx
    const hash = hashMessage(message)
```

సందేశం హాష్ పొందండి. వినియోగదారుకు డీబగ్గింగ్ (Noir కోడ్ యొక్క) కోసం దీనిని అందించడం సహాయకరంగా ఉంటుంది.

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[పబ్లిక్ కీ పొందండి](https://viem.sh/docs/utilities/recoverPublicKey). ఇది [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) ఫంక్షన్ కోసం అవసరం.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

స్థితి వేరియబుల్స్‌ను సెట్ చేయండి. ఇది చేయడం వల్ల కాంపోనెంట్ తిరిగి గీయబడుతుంది (`sign` ఫంక్షన్ నిష్క్రమించిన తర్వాత) మరియు వినియోగదారుకు నవీకరించబడిన విలువలను చూపుతుంది.

```tsx
    let proverToml = `
```

`Prover.toml` కోసం టెక్స్ట్.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem మాకు పబ్లిక్ కీని 65-బైట్ హెక్సాడెసిమల్ స్ట్రింగ్‌గా అందిస్తుంది. మొదటి బైట్ `0x04`, ఒక వెర్షన్ మార్కర్. దీని తర్వాత పబ్లిక్ కీ యొక్క `x` కోసం 32 బైట్లు మరియు తర్వాత పబ్లిక్ కీ యొక్క `y` కోసం 32 బైట్లు ఉంటాయి.

అయితే, Noir ఈ సమాచారాన్ని రెండు బైట్ శ్రేణులుగా పొందాలని ఆశిస్తుంది, ఒకటి `x` కోసం మరియు మరొకటి `y` కోసం. జీరో-కనౌలెడ్జి రుజువులో భాగంగా కాకుండా ఇక్కడ క్లయింట్‌లో పార్స్ చేయడం సులభం.

గమనించండి ఇది సాధారణంగా జీరో-కనౌలెడ్జిలో మంచి పద్ధతి. జీరో-కనౌలెడ్జి రుజువులోని కోడ్ ఖరీదైనది, కాబట్టి జీరో-కనౌలెడ్జి రుజువు వెలుపల చేయగల ఏ ప్రాసెసింగ్ అయినా జీరో-కనౌలెడ్జి రుజువు వెలుపల _చేయాలి_.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

సంతకం కూడా 65-బైట్ హెక్సాడెసిమల్ స్ట్రింగ్‌గా అందించబడుతుంది. అయితే, పబ్లిక్ కీని తిరిగి పొందడానికి చివరి బైట్ మాత్రమే అవసరం. పబ్లిక్ కీ ఇప్పటికే Noir కోడ్‌కు అందించబడుతుంది కాబట్టి, సంతకాన్ని ధృవీకరించడానికి మాకు ఇది అవసరం లేదు, మరియు Noir కోడ్‌కు ఇది అవసరం లేదు.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

ఖాతాలను అందించండి.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

ఇది కాంపోనెంట్ యొక్క HTML (మరింత కచ్చితంగా, [JSX](https://react.dev/learn/writing-markup-with-jsx)) ఫార్మాట్.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) అసలు జీరో-కనౌలెడ్జి కోడ్.

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir స్టాండర్డ్ లైబ్రరీ](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)తో అందించబడుతుంది. జీరో-కనౌలెడ్జి రుజువులు సాధారణంగా ఈ హాష్ ఫంక్షన్‌ను ఉపయోగిస్తాయి. స్టాండర్డ్ హాష్ ఫంక్షన్లతో పోలిస్తే [అంకగణిత సర్క్యూట్‌లలో](https://rareskills.io/post/arithmetic-circuit) గణించడం చాలా సులభం.

```
use keccak256::keccak256;
use dep::ecrecover;
```

ఈ రెండు ఫంక్షన్లు బాహ్య లైబ్రరీలు, ఇవి [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml)లో నిర్వచించబడ్డాయి. అవి ఖచ్చితంగా వాటి పేరుకు తగ్గట్టుగా ఉంటాయి, [keccak256 హాష్](https://emn178.github.io/online-tools/keccak_256.html)ను గణించే ఒక ఫంక్షన్ మరియు ఇతీరియము సంతకాలను ధృవీకరించి, సంతకం చేసినవారి ఇతీరియము చిరునామాను తిరిగి పొందే ఒక ఫంక్షన్.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) నుండి ప్రేరణ పొందింది. వేరియబుల్స్, డిఫాల్ట్‌గా, స్థిరాంకాలు. గ్లోబల్ కాన్ఫిగరేషన్ స్థిరాంకాలను మనం ఇలా నిర్వచిస్తాము. ప్రత్యేకంగా, `ACCOUNT_NUMBER` అనేది మనం నిల్వ చేసే ఖాతాల సంఖ్య.

`u<number>` అని పేరు పెట్టబడిన డేటా రకాలు ఆ సంఖ్య బిట్స్, సంతకం చేయనివి. మద్దతు ఉన్న ఏకైక రకాలు `u8`, `u16`, `u32`, `u64`, మరియు `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

ఈ వేరియబుల్ ఖాతాల పెడెర్సెన్ హాష్ కోసం ఉపయోగించబడుతుంది, క్రింద వివరించిన విధంగా.

```
global MESSAGE_LENGTH : u32 = 100;
```

పైన వివరించినట్లుగా, సందేశం పొడవు స్థిరంగా ఉంటుంది. ఇది ఇక్కడ పేర్కొనబడింది.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 సంతకాలకు](https://eips.ethereum.org/EIPS/eip-191) 26-బైట్ ఉపసర్గతో ఒక బఫర్ అవసరం, దాని తర్వాత ASCIIలో సందేశం పొడవు, మరియు చివరగా సందేశం ఉంటుంది.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

ఖాతా గురించి మనం నిల్వ చేసే సమాచారం. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) అనేది ఒక సంఖ్య, సాధారణంగా 253 బిట్ల వరకు ఉంటుంది, దీనిని జీరో-కనౌలెడ్జి రుజువును అమలు చేసే [అంకగణిత సర్క్యూట్‌లో](https://rareskills.io/post/arithmetic-circuit) నేరుగా ఉపయోగించవచ్చు. ఇక్కడ మనం `Field`ను 160-బిట్ ఇతీరియము చిరునామాను నిల్వ చేయడానికి ఉపయోగిస్తాము.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

బదిలీ లావాదేవీ కోసం మనం నిల్వ చేసే సమాచారం.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

ఒక ఫంక్షన్ నిర్వచనం. పారామితి `Account` సమాచారం. ఫలితం `Field` వేరియబుల్స్ యొక్క శ్రేణి, దీని పొడవు `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

శ్రేణిలోని మొదటి విలువ ఖాతా చిరునామా. రెండవది బ్యాలెన్స్ మరియు నాన్స్ రెండింటినీ కలిగి ఉంటుంది. `.into()` కాల్స్ ఒక సంఖ్యను దాని అవసరమైన డేటా రకానికి మారుస్తాయి. `account.nonce` ఒక `u32` విలువ, కానీ దానిని `account.balance « 32`కు, ఒక `u128` విలువకు, జోడించడానికి అది `u128`గా ఉండాలి. అది మొదటి `.into()`. రెండవది `u128` ఫలితాన్ని `Field`గా మారుస్తుంది, తద్వారా అది శ్రేణిలో సరిపోతుంది.

```
    flat
}
```

Noirలో, ఫంక్షన్లు చివరలో మాత్రమే ఒక విలువను తిరిగి ఇవ్వగలవు (ప్రారంభ రిటర్న్ లేదు). రిటర్న్ విలువను పేర్కొనడానికి, మీరు దానిని ఫంక్షన్ యొక్క ముగింపు బ్రాకెట్‌కు ముందు అంచనా వేస్తారు.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

ఈ ఫంక్షన్ ఖాతాల శ్రేణిని `Field` శ్రేణిగా మారుస్తుంది, దీనిని పీటర్సన్ హాష్‌కు ఇన్‌పుట్‌గా ఉపయోగించవచ్చు.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

మార్చదగిన వేరియబుల్‌ను పేర్కొనడానికి ఇది మార్గం, అంటే _కాదు_ ఒక స్థిరాంకం. Noirలోని వేరియబుల్స్ ఎల్లప్పుడూ ఒక విలువను కలిగి ఉండాలి, కాబట్టి మనం ఈ వేరియబుల్‌ను అన్ని సున్నాలకు ప్రారంభీకరిస్తాము.

```
    for i in 0..ACCOUNT_NUMBER {
```

ఇది `for` లూప్. గమనించండి సరిహద్దులు స్థిరాంకాలు. Noir లూప్‌లు వాటి సరిహద్దులను కంపైల్ సమయంలో తెలిసి ఉండాలి. కారణం అంకగణిత సర్క్యూట్‌లు ప్రవాహ నియంత్రణకు మద్దతు ఇవ్వవు. `for` లూప్‌ను ప్రాసెస్ చేసేటప్పుడు, కంపైలర్ దానిలోని కోడ్‌ను అనేక సార్లు ఉంచుతుంది, ప్రతి పునరావృత్తికి ఒకటి.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

చివరగా, మనం ఖాతాల శ్రేణిని హాష్ చేసే ఫంక్షన్‌కు వచ్చాము.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
}
```

ఈ ఫంక్షన్ నిర్దిష్ట చిరునామాతో ఉన్న ఖాతాను కనుగొంటుంది. ఈ ఫంక్షన్ ప్రామాణిక కోడ్‌లో చాలా అసమర్థంగా ఉంటుంది ఎందుకంటే ఇది చిరునామాను కనుగొన్న తర్వాత కూడా అన్ని ఖాతాల మీద పునరావృతమవుతుంది.

అయితే, జీరో-కనౌలెడ్జి రుజువులలో, ప్రవాహ నియంత్రణ లేదు. మనం ఎప్పుడైనా ఒక షరతును తనిఖీ చేయవలసి వస్తే, మనం దానిని ప్రతిసారీ తనిఖీ చేయాలి.

`if` స్టేట్‌మెంట్లతో ఇలాంటిదే జరుగుతుంది. పైన ఉన్న లూప్‌లోని `if` స్టేట్‌మెంట్ ఈ గణిత స్టేట్‌మెంట్‌లకు అనువదించబడింది.

_condition<sub>result</sub> = accounts[i].address == address_ // అవి సమానంగా ఉంటే ఒకటి, లేకపోతే సున్నా

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) ఫంక్షన్, నిర్ధారణ తప్పు అయితే జీరో-కనౌలెడ్జి రుజువును క్రాష్ చేస్తుంది. ఈ సందర్భంలో, సంబంధిత చిరునామాతో ఖాతాను కనుగొనలేకపోతే. చిరునామాను నివేదించడానికి, మనం [ఫార్మాట్ స్ట్రింగ్](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)ను ఉపయోగిస్తాము.

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

ఈ ఫంక్షన్ ఒక బదిలీ లావాదేవీని వర్తింపజేసి, కొత్త ఖాతాల శ్రేణిని తిరిగి ఇస్తుంది.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

మనం Noirలోని ఫార్మాట్ స్ట్రింగ్‌లో నిర్మాణ మూలకాలను యాక్సెస్ చేయలేము, కాబట్టి మనం ఉపయోగపడే కాపీని సృష్టిస్తాము.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

ఇవి ఒక లావాదేవీని చెల్లనివిగా చేసే రెండు షరతులు.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
```

కొత్త ఖాతాల శ్రేణిని సృష్టించి, ఆపై దానిని తిరిగి ఇవ్వండి.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

ఈ ఫంక్షన్ సందేశం నుండి చిరునామాను చదువుతుంది.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

చిరునామా ఎల్లప్పుడూ 20 బైట్లు (అంటే, 40 హెక్సాడెసిమల్ అంకెలు) పొడవు ఉంటుంది, మరియు అక్షరం #7 వద్ద ప్రారంభమవుతుంది.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

సందేశం నుండి మొత్తం మరియు నాన్స్‌ను చదవండి.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

సందేశంలో, చిరునామా తర్వాత మొదటి సంఖ్య బదిలీ చేయాల్సిన ఫిన్నీ మొత్తం (అంటే, ETHలో వెయ్యవ వంతు). రెండవ సంఖ్య నాన్స్. వాటి మధ్య ఉన్న ఏ టెక్స్ట్ అయినా విస్మరించబడుతుంది.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

ఒక [ట్యూపుల్](https://noir-lang.org/docs/noir/concepts/data_types/tuples)ను తిరిగి ఇవ్వడం అనేది ఒక ఫంక్షన్ నుండి బహుళ విలువలను తిరిగి ఇవ్వడానికి Noir మార్గం.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

ఈ ఫంక్షన్ సందేశాన్ని బైట్‌లుగా మారుస్తుంది, ఆపై మొత్తాలను `TransferTxn`గా మారుస్తుంది.

```rust
// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

మనం ఖాతాల కోసం పెడెర్సెన్ హాష్‌ను ఉపయోగించగలిగాము ఎందుకంటే అవి జీరో-కనౌలెడ్జి రుజువులో మాత్రమే హాష్ చేయబడతాయి. అయితే, ఈ కోడ్‌లో మనం సందేశం యొక్క సంతకాన్ని తనిఖీ చేయాలి, ఇది బ్రౌజర్ ద్వారా ఉత్పత్తి చేయబడుతుంది. దాని కోసం, మనం [EIP 191](https://eips.ethereum.org/EIPS/eip-191)లో ఇతీరియము సంతకం ఫార్మాట్‌ను అనుసరించాలి. అంటే మనం ఒక ప్రామాణిక ఉపసర్గ, ASCIIలో సందేశం పొడవు, మరియు సందేశాన్ని కలిగి ఉన్న ఒక మిశ్రమ బఫర్‌ను సృష్టించి, దానిని హాష్ చేయడానికి ఇతీరియము ప్రామాణిక keccak256ను ఉపయోగించాలి.

```rust
    // ASCII prefix
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

ఒక అప్లికేషన్ వినియోగదారుని ఒక లావాదేవీగా లేదా మరేదైనా ప్రయోజనం కోసం ఉపయోగించగల సందేశానికి సంతకం చేయమని అడిగే సందర్భాలను నివారించడానికి, EIP 191 అన్ని సంతకం చేసిన సందేశాలు అక్షరం 0x19 (చెల్లుబాటు అయ్యే ASCII అక్షరం కాదు) తర్వాత `Ethereum Signed Message:` మరియు ఒక కొత్త లైన్‌తో ప్రారంభం కావాలని నిర్దేశిస్తుంది.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

999 వరకు సందేశం పొడవులను నిర్వహించి, అది ఎక్కువ ఉంటే విఫలమవండి. సందేశం పొడవు ఒక స్థిరాంకం అయినప్పటికీ, నేను ఈ కోడ్‌ను జోడించాను ఎందుకంటే ఇది దానిని మార్చడం సులభం చేస్తుంది. ఒక ఉత్పత్తి వ్యవస్థలో, మీరు బహుశా మెరుగైన పనితీరు కోసం `MESSAGE_LENGTH` మారదని ఊహించుకుంటారు.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

ఇతీరియము ప్రామాణిక `keccak256` ఫంక్షన్‌ను ఉపయోగించండి.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

ఈ ఫంక్షన్ సంతకాన్ని ధృవీకరిస్తుంది, దీనికి సందేశం హాష్ అవసరం. ఆపై అది సంతకం చేసిన చిరునామా మరియు సందేశం హాష్‌ను మాకు అందిస్తుంది. సందేశం హాష్ రెండు `Field` విలువలుగా అందించబడుతుంది ఎందుకంటే అవి ప్రోగ్రామ్‌లోని మిగిలిన భాగంలో ఒక బైట్ శ్రేణి కంటే ఉపయోగించడం సులభం.

ఫీల్డ్ గణనలు ఒక పెద్ద సంఖ్యకు [మాడ్యూలో](https://en.wikipedia.org/wiki/Modulo) చేయబడతాయి కాబట్టి మనం రెండు `Field` విలువలను ఉపయోగించాలి, కానీ ఆ సంఖ్య సాధారణంగా 256 బిట్ల కంటే తక్కువగా ఉంటుంది (లేకపోతే EVMలో ఆ గణనలను చేయడం కష్టం).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` మరియు `hash2`లను మార్చదగిన వేరియబుల్స్‌గా పేర్కొనండి, మరియు హాష్‌ను వాటిలో బైట్ బైట్‌గా వ్రాయండి.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

ఇది [Solidity యొక్క `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)తో సమానంగా ఉంటుంది, రెండు ముఖ్యమైన తేడాలతో:

- సంతకం చెల్లనిది అయితే, కాల్ `assert`ను విఫలం చేస్తుంది మరియు ప్రోగ్రామ్ రద్దు చేయబడుతుంది.
- పబ్లిక్ కీ సంతకం మరియు హాష్ నుండి తిరిగి పొందగలిగినప్పటికీ, ఇది బాహ్యంగా చేయగల ప్రాసెసింగ్ మరియు అందువల్ల జీరో-కనౌలెడ్జి రుజువులో చేయడం విలువైనది కాదు. ఎవరైనా ఇక్కడ మమ్మల్ని మోసం చేయడానికి ప్రయత్నిస్తే, సంతకం ధృవీకరణ విఫలమవుతుంది.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

చివరగా, మనం `main` ఫంక్షన్‌కు చేరుకున్నాము. ఖాతాల హాష్‌ను పాత విలువ నుండి కొత్తదానికి చెల్లుబాటు అయ్యే విధంగా మార్చే ఒక లావాదేవీ మా వద్ద ఉందని మేము నిరూపించాలి. దీనికి ఈ నిర్దిష్ట లావాదేవీ హాష్ ఉందని కూడా మేము నిరూపించాలి, తద్వారా దానిని పంపిన వ్యక్తికి వారి లావాదేవీ ప్రాసెస్ చేయబడిందని తెలుస్తుంది.

```rust
{
    let mut txn = readTransferTxn(message);
```

`txn` మార్చదగినదిగా ఉండాలి ఎందుకంటే మనం సందేశం నుండి చిరునామాను చదవము, సంతకం నుండి చదువుతాము.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### దశ 2 - ఒక సర్వర్‌ను జోడించడం {#stage-2}

రెండవ దశలో, మేము బ్రౌజర్ నుండి బదిలీ లావాదేవీలను స్వీకరించి, అమలు చేసే ఒక సర్వర్‌ను జోడిస్తాము.

చర్యలో చూడటానికి:

1. Vite నడుస్తుంటే దాన్ని ఆపండి.

2. సర్వర్‌ను కలిగి ఉన్న శాఖను డౌన్‌లోడ్ చేయండి మరియు మీకు అవసరమైన అన్ని మాడ్యూల్స్ ఉన్నాయని నిర్ధారించుకోండి.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir కోడ్‌ను కంపైల్ చేయాల్సిన అవసరం లేదు, ఇది మీరు దశ 1 కోసం ఉపయోగించిన కోడ్‌తో సమానంగా ఉంటుంది.

3. సర్వర్‌ను ప్రారంభించండి.

   ```sh
   npm run start
   ```

4. వేరే కమాండ్-లైన్ విండోలో, బ్రౌజర్ కోడ్‌ను అందించడానికి Viteని రన్ చేయండి.

   ```sh
   cd client
   npm run dev
   ```

5. క్లయింట్ కోడ్‌కు [http://localhost:5173](http://localhost:5173) వద్ద బ్రౌజ్ చేయండి

6. మీరు ఒక లావాదేవీ జారీ చేసే ముందు, మీరు నాన్స్‌ను, అలాగే మీరు పంపగల మొత్తాన్ని తెలుసుకోవాలి. ఈ సమాచారం పొందడానికి, **Update account data** క్లిక్ చేసి, సందేశానికి సంతకం చేయండి.

   ఇక్కడ మనకు ఒక సందిగ్ధత ఉంది. ఒక వైపు, మేము తిరిగి ఉపయోగించగల సందేశానికి సంతకం చేయకూడదు (ఒక [రీప్లే దాడి](https://en.wikipedia.org/wiki/Replay_attack)), అందుకే మాకు ముందుగా నాన్స్ కావాలి. అయితే, మాకు ఇంకా నాన్స్ లేదు. పరిష్కారం ఒకసారి మాత్రమే ఉపయోగించగల మరియు రెండు వైపులా ఇప్పటికే ఉన్న ఒక నాన్స్‌ను ఎంచుకోవడం, ఉదాహరణకు ప్రస్తుత సమయం.

   ఈ పరిష్కారంతో సమస్య ఏమిటంటే, సమయం సంపూర్ణంగా సమకాలీకరించబడకపోవచ్చు. కాబట్టి బదులుగా, మేము ప్రతి నిమిషానికి మారే ఒక విలువకు సంతకం చేస్తాము. అంటే రీప్లే దాడులకు మా దుర్బలత్వం యొక్క విండో గరిష్టంగా ఒక నిమిషం ఉంటుంది. ఉత్పత్తిలో సంతకం చేసిన అభ్యర్థన TLS ద్వారా రక్షించబడుతుందని మరియు టన్నెల్ యొక్క మరొక వైపు---సర్వర్---బ్యాలెన్స్ మరియు నాన్స్‌ను ఇప్పటికే వెల్లడించగలదని (పని చేయడానికి అవి దానికి తెలిసి ఉండాలి) పరిగణలోకి తీసుకుంటే, ఇది ఒక ఆమోదయోగ్యమైన ప్రమాదం.

7. బ్రౌజర్ బ్యాలెన్స్ మరియు నాన్స్‌ను తిరిగి పొందిన తర్వాత, అది బదిలీ ఫారమ్‌ను చూపుతుంది. గమ్యస్థాన చిరునామా మరియు మొత్తాన్ని ఎంచుకుని, **Transfer** క్లిక్ చేయండి. ఈ అభ్యర్థనకు సంతకం చేయండి.

8. బదిలీని చూడటానికి, **Update account data** చేయండి లేదా మీరు సర్వర్‌ను రన్ చేసే విండోలో చూడండి. సర్వర్ ప్రతిసారి మారినప్పుడు స్థితిని లాగ్ చేస్తుంది.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) సర్వర్ ప్రాసెస్‌ను కలిగి ఉంది, మరియు [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) వద్ద Noir కోడ్‌తో సంకర్షణ చెందుతుంది. ఆసక్తికరమైన భాగాల వివరణ ఇక్కడ ఉంది.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) లైబ్రరీ జావాస్క్రిప్ట్ కోడ్ మరియు Noir కోడ్ మధ్య ఇంటర్ఫేస్ చేస్తుంది.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

అంకగణిత సర్క్యూట్‌ను లోడ్ చేయండి---మునుపటి దశలో మనం సృష్టించిన కంపైల్ చేయబడిన Noir ప్రోగ్రామ్---మరియు దానిని అమలు చేయడానికి సిద్ధం చేయండి.

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

ఖాతా సమాచారాన్ని అందించడానికి, మాకు సంతకం మాత్రమే అవసరం. కారణం, సందేశం ఏమి కాబోతోందో మాకు ఇప్పటికే తెలుసు, మరియు అందువల్ల సందేశం హాష్ కూడా.

```js
const processMessage = async (message, signature) => {
```

ఒక సందేశాన్ని ప్రాసెస్ చేసి, అది ఎన్కోడ్ చేసే లావాదేవీని అమలు చేయండి.

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

ఇప్పుడు మేము సర్వర్‌లో జావాస్క్రిప్ట్‌ను రన్ చేస్తున్నాము కాబట్టి, మేము పబ్లిక్ కీని క్లయింట్‌లో కాకుండా అక్కడ తిరిగి పొందవచ్చు.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` Noir ప్రోగ్రామ్‌ను రన్ చేస్తుంది. పారామితులు [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)లో అందించిన వాటికి సమానంగా ఉంటాయి. గమనించండి పొడవైన విలువలు హెక్సాడెసిమల్ స్ట్రింగ్‌ల శ్రేణిగా అందించబడతాయి (`["0x60", "0xA7"]`), ఒకే హెక్సాడెసిమల్ విలువగా కాదు (`0x60A7`), Viem చేసే విధంగా.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

ఒకవేళ లోపం ఉంటే, దాన్ని పట్టుకుని, ఆపై ఒక సరళీకృత వెర్షన్‌ను క్లయింట్‌కు పంపండి.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

లావాదేవీని వర్తించండి. మేము ఇప్పటికే దానిని Noir కోడ్‌లో చేసాము, కానీ ఫలితాన్ని అక్కడ నుండి సంగ్రహించడం కంటే ఇక్కడ మళ్ళీ చేయడం సులభం.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

ప్రారంభ `Accounts` నిర్మాణం.

### దశ 3 - ఇతీరియము స్మార్ట్ కాంట్రాక్టులు {#stage-3}

1. సర్వర్ మరియు క్లయింట్ ప్రక్రియలను ఆపండి.

2. స్మార్ట్ కాంట్రాక్టులతో ఉన్న శాఖను డౌన్‌లోడ్ చేయండి మరియు మీకు అవసరమైన అన్ని మాడ్యూల్స్ ఉన్నాయని నిర్ధారించుకోండి.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. `anvil`ను వేరే కమాండ్-లైన్ విండోలో రన్ చేయండి.

4. ధృవీకరణ కీ మరియు సాలిడిటీ వెరిఫైయర్‌ను ఉత్పత్తి చేయండి, ఆపై వెరిఫైయర్ కోడ్‌ను Solidity ప్రాజెక్ట్‌కు కాపీ చేయండి.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. స్మార్ట్ కాంట్రాక్టులకు వెళ్లి, `anvil` బ్లాక్ చైనును ఉపయోగించడానికి పర్యావరణ వేరియబుల్స్‌ను సెట్ చేయండి.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol`ను అమలు చేయండి మరియు చిరునామాను పర్యావరణ వేరియబుల్‌లో నిల్వ చేయండి.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` కాంట్రాక్టును అమలు చేయండి.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` విలువ `Accounts` యొక్క ప్రారంభ స్థితి యొక్క పెడెర్సెన్ హాష్. మీరు `server/index.mjs`లో ఈ ప్రారంభ స్థితిని సవరించినట్లయితే, జీరో-కనౌలెడ్జి రుజువు ద్వారా నివేదించబడిన ప్రారంభ హాష్‌ను చూడటానికి ఒక లావాదేవీని రన్ చేయవచ్చు.

8. సర్వర్‌ను రన్ చేయండి.

   ```sh
   cd ../server
   npm run start
   ```

9. క్లయింట్‌ను వేరే కమాండ్-లైన్ విండోలో రన్ చేయండి.

   ```sh
   cd client
   npm run dev
   ```

10. కొన్ని లావాదేవీలను రన్ చేయండి.

11. స్థితి ఆన్‌చైన్‌లో మారిందని ధృవీకరించడానికి, సర్వర్ ప్రాసెస్‌ను పునఃప్రారంభించండి. లావాదేవీలలోని అసలు హాష్ విలువ ఆన్‌చైన్‌లో నిల్వ చేయబడిన హాష్ విలువకు భిన్నంగా ఉన్నందున, `ZkBank` ఇకపై లావాదేవీలను అంగీకరించదని చూడండి.

    ఇది ఊహించిన రకమైన లోపం.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

ఈ ఫైల్‌లోని మార్పులు ఎక్కువగా అసలు రుజువును సృష్టించి, దానిని ఆన్‌చైన్‌లో సమర్పించడానికి సంబంధించినవి.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

ఆన్‌చైన్‌కు పంపడానికి అసలు రుజువును సృష్టించడానికి మేము [బారెటెన్‌బెర్గ్ ప్యాకేజీని](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ఉపయోగించాలి. మేము ఈ ప్యాకేజీని కమాండ్-లైన్ ఇంటర్‌ఫేస్ (`bb`)ని రన్ చేయడం ద్వారా లేదా [జావాస్క్రిప్ట్ లైబ్రరీ, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js)ని ఉపయోగించడం ద్వారా ఉపయోగించవచ్చు. జావాస్క్రిప్ట్ లైబ్రరీ కోడ్‌ను దేశీయంగా రన్ చేయడం కంటే చాలా నెమ్మదిగా ఉంటుంది, కాబట్టి మేము కమాండ్-లైన్‌ను ఉపయోగించడానికి ఇక్కడ [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)ని ఉపయోగిస్తాము.

గమనించండి మీరు `bb.js`ని ఉపయోగించాలని నిర్ణయించుకుంటే, మీరు ఉపయోగిస్తున్న Noir వెర్షన్‌తో అనుకూలమైన వెర్షన్‌ను ఉపయోగించాలి. వ్రాసే సమయంలో, ప్రస్తుత Noir వెర్షన్ (1.0.0-beta.11) `bb.js` వెర్షన్ 0.87ను ఉపయోగిస్తుంది.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

ఇక్కడి చిరునామా, మీరు శుభ్రమైన `anvil`తో ప్రారంభించి, పైన ఉన్న ఆదేశాలను అనుసరించినప్పుడు పొందేది.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

ఈ ప్రైవేట్ కీ `anvil`లోని డిఫాల్ట్ ప్రీ-ఫండెడ్ ఖాతాలలో ఒకటి.

```js
const generateProof = async (witness, fileID) => {
```

`bb` ఎగ్జిక్యూటబుల్ ఉపయోగించి ఒక రుజువును రూపొందించండి.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

సాక్షిని ఒక ఫైల్‌కు వ్రాయండి.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

నిజానికి రుజువును సృష్టించండి. ఈ దశ పబ్లిక్ వేరియబుల్స్‌తో ఒక ఫైల్‌ను కూడా సృష్టిస్తుంది, కానీ మాకు అది అవసరం లేదు. మేము ఆ వేరియబుల్స్‌ను `noir.execute` నుండి ఇప్పటికే పొందాము.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

రుజువు `Field` విలువల యొక్క JSON శ్రేణి, ప్రతిదీ ఒక హెక్సాడెసిమల్ విలువగా సూచించబడుతుంది. అయితే, మేము దానిని లావాదేవీలో ఒకే `bytes` విలువగా పంపాలి, దీనిని Viem ఒక పెద్ద హెక్సాడెసిమల్ స్ట్రింగ్‌తో సూచిస్తుంది. ఇక్కడ మేము అన్ని విలువలను కలిపి, అన్ని `0x`లను తీసివేసి, ఆపై చివరలో ఒకటి జోడించడం ద్వారా ఫార్మాట్‌ను మారుస్తాము.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

శుభ్రపరిచి, రుజువును తిరిగి ఇవ్వండి.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

పబ్లిక్ ఫీల్డ్‌లు 32-బైట్ విలువల శ్రేణిగా ఉండాలి. అయితే, లావాదేవీ హాష్‌ను రెండు `Field` విలువల మధ్య విభజించవలసి వచ్చినందున, ఇది 16-బైట్ విలువగా కనిపిస్తుంది. ఇక్కడ మేము సున్నాలను జోడిస్తాము, తద్వారా Viem అది నిజానికి 32 బైట్లు అని అర్థం చేసుకుంటుంది.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

ప్రతి చిరునామా ప్రతి నాన్స్‌ను ఒకసారి మాత్రమే ఉపయోగిస్తుంది, తద్వారా మేము `fromAddress` మరియు `nonce` కలయికను సాక్షి ఫైల్ మరియు అవుట్‌పుట్ డైరెక్టరీ కోసం ఒక ప్రత్యేక ఐడెంటిఫైయర్‌గా ఉపయోగించవచ్చు.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

లావాదేవీని చైన్‌కు పంపండి.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

ఇది లావాదేవీని స్వీకరించే ఆన్‌చైన్ కోడ్.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

ఆన్‌చైన్ కోడ్ రెండు వేరియబుల్స్‌ను ట్రాక్ చేయాలి: వెరిఫైయర్ (`nargo` ద్వారా సృష్టించబడిన ఒక ప్రత్యేక కాంట్రాక్ట్) మరియు ప్రస్తుత స్థితి హాష్.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

ప్రతిసారి స్థితి మారినప్పుడు, మేము `TransactionProcessed` ఈవెంట్‌ను విడుదల చేస్తాము.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

ఈ ఫంక్షన్ లావాదేవీలను ప్రాసెస్ చేస్తుంది. ఇది రుజువును (`bytes`గా) మరియు పబ్లిక్ ఇన్‌పుట్‌లను (`bytes32` శ్రేణిగా), వెరిఫైయర్ అవసరమైన ఫార్మాట్‌లో (ఆన్‌చైన్ ప్రాసెసింగ్‌ను మరియు అందువల్ల గ్యాస్ ఖర్చులను తగ్గించడానికి) పొందుతుంది.

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

జీరో-కనౌలెడ్జి రుజువు లావాదేవీ మన ప్రస్తుత హాష్ నుండి కొత్తదానికి మారుతుందని ఉండాలి.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

జీరో-కనౌలెడ్జి రుజువును ధృవీకరించడానికి వెరిఫైయర్ కాంట్రాక్టును కాల్ చేయండి. జీరో-కనౌలెడ్జి రుజువు తప్పు అయితే ఈ దశ లావాదేవీని తిరిగి తీసుకుంటుంది.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

అన్నీ సరిగ్గా ఉంటే, స్థితి హాష్‌ను కొత్త విలువకు నవీకరించి, `TransactionProcessed` ఈవెంట్‌ను విడుదల చేయండి.

## కేంద్రీకృత భాగం ద్వారా దుర్వినియోగాలు {#abuses}

సమాచార భద్రత మూడు గుణాలను కలిగి ఉంటుంది:

- _గోప్యత_, వినియోగదారులు వారు చదవడానికి అధికారం లేని సమాచారాన్ని చదవలేరు.
- _సమగ్రత_, అధీకృత వినియోగదారులు అధీకృత పద్ధతిలో తప్ప సమాచారాన్ని మార్చలేరు.
- _లభ్యత_, అధీకృత వినియోగదారులు వ్యవస్థను ఉపయోగించగలరు.

ఈ వ్యవస్థలో, సమగ్రత జీరో-కనౌలెడ్జి రుజువుల ద్వారా అందించబడుతుంది. లభ్యతను హామీ ఇవ్వడం చాలా కష్టం, మరియు గోప్యత అసాధ్యం, ఎందుకంటే బ్యాంకు ప్రతి ఖాతా యొక్క బ్యాలెన్స్ మరియు అన్ని లావాదేవీలను తెలుసుకోవాలి. సమాచారం ఉన్న ఒక సంస్థ ఆ సమాచారాన్ని పంచుకోకుండా నిరోధించడానికి మార్గం లేదు.

[స్టీల్త్ చిరునామాలను](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ఉపయోగించి నిజంగా గోప్యమైన బ్యాంకును సృష్టించడం సాధ్యం కావచ్చు, కానీ అది ఈ వ్యాసం పరిధికి మించినది.

### తప్పుడు సమాచారం {#false-info}

[డేటాను అభ్యర్థించినప్పుడు](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) తప్పుడు సమాచారాన్ని అందించడం ద్వారా సర్వర్ సమగ్రతను ఉల్లంఘించగల ఒక మార్గం.

దీన్ని పరిష్కరించడానికి, మేము ఖాతాలను ఒక ప్రైవేట్ ఇన్‌పుట్‌గా మరియు సమాచారం అభ్యర్థించబడిన చిరునామాను ఒక పబ్లిక్ ఇన్‌పుట్‌గా స్వీకరించే రెండవ Noir ప్రోగ్రామ్‌ను వ్రాయవచ్చు. అవుట్‌పుట్ ఆ చిరునామా యొక్క బ్యాలెన్స్ మరియు నాన్స్, మరియు ఖాతాల హాష్.

అయితే, ఈ రుజువును ఆన్‌చైన్‌లో ధృవీకరించలేము, ఎందుకంటే మేము నాన్స్‌లు మరియు బ్యాలెన్స్‌లను ఆన్‌చైన్‌లో పోస్ట్ చేయాలనుకోవడం లేదు. అయితే, దీనిని బ్రౌజర్‌లో నడుస్తున్న క్లయింట్ కోడ్ ద్వారా ధృవీకరించవచ్చు.

### బలవంతపు లావాదేవీలు {#forced-txns}

L2లలో లభ్యతను నిర్ధారించడానికి మరియు సెన్సార్‌షిప్‌ను నివారించడానికి సాధారణ యంత్రాంగం [బలవంతపు లావాదేవీలు](https://docs.optimism.io/stack/transactions/forced-transaction). కానీ బలవంతపు లావాదేవీలు జీరో-కనౌలెడ్జి రుజువులతో కలపబడవు. సర్వర్ మాత్రమే లావాదేవీలను ధృవీకరించగల ఏకైక సంస్థ.

బలవంతపు లావాదేవీలను అంగీకరించడానికి మరియు అవి ప్రాసెస్ అయ్యే వరకు స్థితిని మార్చకుండా సర్వర్‌ను నిరోధించడానికి మేము `smart-contracts/src/ZkBank.sol`ను సవరించవచ్చు. అయితే, ఇది మాకు ఒక సాధారణ తిరస్కరణ-సేవ దాడికి గురి చేస్తుంది. ఒక బలవంతపు లావాదేవీ చెల్లనిది మరియు అందువల్ల ప్రాసెస్ చేయడం అసాధ్యం అయితే?

పరిష్కారం ఒక బలవంతపు లావాదేవీ చెల్లనిదని జీరో-కనౌలెడ్జి రుజువు కలిగి ఉండటం. ఇది సర్వర్‌కు మూడు ఎంపికలను ఇస్తుంది:

- బలవంతపు లావాదేవీని ప్రాసెస్ చేయడం, అది ప్రాసెస్ చేయబడిందని మరియు కొత్త స్థితి హాష్ ఉందని జీరో-కనౌలెడ్జి రుజువును అందించడం.
- బలవంతపు లావాదేవీని తిరస్కరించడం, మరియు లావాదేవీ చెల్లనిదని (తెలియని చిరునామా, చెడ్డ నాన్స్, లేదా తగినంత బ్యాలెన్స్ లేకపోవడం) కాంట్రాక్టుకు జీరో-కనౌలెడ్జి రుజువును అందించడం.
- బలవంతపు లావాదేవీని విస్మరించడం. సర్వర్‌ను లావాదేవీని నిజంగా ప్రాసెస్ చేయమని బలవంతం చేయడానికి మార్గం లేదు, కానీ దీని అర్థం మొత్తం వ్యవస్థ అందుబాటులో లేదు.

#### లభ్యత బాండ్లు {#avail-bonds}

నిజ-జీవిత అమలులో, సర్వర్‌ను నడుపుతూ ఉండటానికి బహుశా ఏదో ఒక రకమైన లాభ ప్రేరణ ఉంటుంది. నిర్దిష్ట కాలంలో బలవంతపు లావాదేవీ ప్రాసెస్ చేయబడకపోతే ఎవరైనా కాల్చగల లభ్యత బాండ్‌ను సర్వర్ పోస్ట్ చేయడం ద్వారా మేము ఈ ప్రోత్సాహాన్ని బలోపేతం చేయవచ్చు.

### చెడ్డ Noir కోడ్ {#bad-noir-code}

సాధారణంగా, ప్రజలు ఒక స్మార్ట్ కాంట్రాక్టును విశ్వసించేలా చేయడానికి మేము సోర్స్ కోడ్‌ను ఒక [బ్లాక్ ఎక్స్‌ప్లోరర్‌కు](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) అప్‌లోడ్ చేస్తాము. అయితే, జీరో-కనౌలెడ్జి రుజువుల విషయంలో, అది సరిపోదు.

`Verifier.sol` ధృవీకరణ కీని కలిగి ఉంటుంది, ఇది Noir ప్రోగ్రామ్ యొక్క ఫంక్షన్. అయితే, ఆ కీ మాకు Noir ప్రోగ్రామ్ ఏమిటో చెప్పదు. నిజంగా విశ్వసనీయ పరిష్కారం కలిగి ఉండటానికి, మీరు Noir ప్రోగ్రామ్ (మరియు దానిని సృష్టించిన వెర్షన్)ను అప్‌లోడ్ చేయాలి. లేకపోతే, జీరో-కనౌలెడ్జి రుజువులు వేరే ప్రోగ్రామ్‌ను ప్రతిబింబించవచ్చు, ఒక వెనుక ద్వారం ఉన్నది.

బ్లాక్ ఎక్స్‌ప్లోరర్లు మాకు Noir ప్రోగ్రామ్‌లను అప్‌లోడ్ చేయడానికి మరియు ధృవీకరించడానికి అనుమతించే వరకు, మీరు దానిని మీరే చేయాలి (ప్రాధాన్యంగా [IPFS](/developers/tutorials/ipfs-decentralized-ui/)కి). అప్పుడు అధునాతన వినియోగదారులు సోర్స్ కోడ్‌ను డౌన్‌లోడ్ చేసుకోగలరు, దానిని స్వయంగా కంపైల్ చేయగలరు, `Verifier.sol`ని సృష్టించగలరు మరియు అది ఆన్‌చైన్‌లో ఉన్న దానికి సమానంగా ఉందని ధృవీకరించగలరు.

## ముగింపు {#conclusion}

ప్లాస్మా-రకం అప్లికేషన్లకు సమాచార నిల్వగా ఒక కేంద్రీకృత భాగం అవసరం. ఇది సంభావ్య దుర్బలత్వాలను తెరుస్తుంది కానీ, ప్రతిఫలంగా, బ్లాక్ చైనులో అందుబాటులో లేని మార్గాలలో గోప్యతను కాపాడటానికి మనకు అనుమతిస్తుంది. జీరో-కనౌలెడ్జి రుజువులతో మనం సమగ్రతను నిర్ధారించవచ్చు మరియు కేంద్రీకృత భాగాన్ని నడుపుతున్న ఎవరికైనా లభ్యతను నిర్వహించడానికి ఆర్థికంగా ప్రయోజనకరంగా చేయవచ్చు.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

## ధన్యవాదాలు {#acknowledgements}

- జోష్ క్రైట్స్ ఈ వ్యాసం యొక్క డ్రాఫ్ట్‌ను చదివి, ఒక ముళ్లలాంటి Noir సమస్యతో నాకు సహాయం చేశారు.

మిగిలిన ఏవైనా లోపాలు నా బాధ్యత.
