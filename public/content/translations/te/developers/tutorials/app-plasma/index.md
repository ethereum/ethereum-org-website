---
title: "గోప్యతను కాపాడే యాప్-నిర్దిష్ట ప్లాస్మాను వ్రాయండి"
description: "ఈ ట్యుటోరియల్‌లో, డిపాజిట్ల కోసం ఒక పాక్షిక-రహస్య బ్యాంకును నిర్మిస్తాము. బ్యాంక్ అనేది ఒక కేంద్రీకృత భాగం; దానికి ప్రతి వినియోగదారుడి బ్యాలెన్స్ తెలుసు. అయితే, ఈ సమాచారం ఆన్‌చైన్‌లో నిల్వ చేయబడదు. దానికి బదులుగా, బ్యాంక్ స్థితికి సంబంధించిన హాష్‌ను పోస్ట్ చేస్తుంది. ప్రతిసారీ ఒక లావాదేవీ జరిగినప్పుడు, కొత్త హాష్‌తో పాటుగా, హాష్ స్థితిని కొత్తదానికి మార్చే సంతకం చేసిన లావాదేవీని కలిగి ఉందనడానికి ఒక శూన్య-జ్ఞాన నిరూపణను కూడా బ్యాంక్ పోస్ట్ చేస్తుంది. ఈ ట్యుటోరియల్ చదివిన తర్వాత, శూన్య-జ్ఞాన నిరూపణలను ఎలా ఉపయోగించాలో మాత్రమే కాకుండా, వాటిని ఎందుకు ఉపయోగిస్తారో మరియు వాటిని సురక్షితంగా ఎలా చేయాలో కూడా మీరు అర్థం చేసుకుంటారు."
author: "ఓరి పొమెరాంట్జ్"
tags: ["శూన్య-జ్ఞాన", "సర్వర్", "ఆఫ్‌చైన్", "గోప్యత"]
skill: advanced
breadcrumb: "యాప్-నిర్దిష్ట ప్లాస్మా"
lang: te
published: 2025-10-15
---

## పరిచయం {#introduction}

[రోల్అప్‌లు](/developers/docs/scaling/zk-rollups/) కి భిన్నంగా, [ప్లాస్మాలు](/developers/docs/scaling/plasma) సమగ్రత (integrity) కోసం ఎథీరియం మెయిన్‌నెట్‌ను ఉపయోగిస్తాయి, కానీ లభ్యత (availability) కోసం కాదు. ఈ ఆర్టికల్‌లో, ఎథీరియం సమగ్రతను (అనధికార మార్పులు లేకుండా) హామీ ఇస్తూ కానీ లభ్యతకు హామీ ఇవ్వని (ఒక కేంద్రీకృత భాగం క్రాష్ అయి మొత్తం సిస్టమ్‌ను డిజేబుల్ చేయవచ్చు) ప్లాస్మాలాగా ప్రవర్తించే ఒక అప్లికేషన్‌ను మనం రాస్తాము.

మనం ఇక్కడ వ్రాస్తున్న అప్లికేషన్ గోప్యతను కాపాడే బ్యాంకు. వేర్వేరు చిరునామాలకు బ్యాలెన్స్‌లతో కూడిన ఖాతాలు ఉంటాయి మరియు అవి ఇతర ఖాతాలకు డబ్బును (ETH) బదిలీ చేయగలవు. బ్యాంక్ స్థితి (ఖాతాలు మరియు వాటి బ్యాలెన్స్‌లు) మరియు లావాదేవీల హాష్‌లను పోస్ట్ చేస్తుంది, కానీ అసలు బ్యాలెన్స్‌లను గోప్యంగా ఉంచేందుకు వాటిని ఆఫ్‌చైన్‌లో ఉంచుతుంది.

## రూపకల్పన (Design) {#design}

ఇది ఉత్పత్తికి-సిద్ధంగా (production-ready) ఉన్న సిస్టమ్ కాదు, ఒక బోధనా సాధనం. కాబట్టి, దీన్ని కొన్ని సులభమైన అంచనాలతో వ్రాయడం జరిగింది.

- స్థిరమైన ఖాతాల పూల్. ఒక నిర్దిష్ట సంఖ్యలో ఖాతాలు ఉంటాయి మరియు ప్రతి ఖాతా ముందుగా నిర్ణయించిన చిరునామాకు చెంది ఉంటుంది. శూన్య-జ్ఞాన నిరూపణలలో మారుతున్న-పరిమాణం గల డేటా నిర్మాణాలను నిర్వహించడం కష్టం కాబట్టి ఇది సిస్టమ్‌ను చాలా సులభతరం చేస్తుంది. ఉత్పత్తికి-సిద్ధంగా ఉన్న సిస్టమ్ కోసం, మనం స్థితి హాష్‌గా [మెర్కల్ రూట్](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)ను ఉపయోగించవచ్చు మరియు అవసరమైన బ్యాలెన్స్‌ల కోసం మెర్కల్ నిరూపణలను అందించవచ్చు.

- మెమరీ నిల్వ. ఒక ప్రొడక్షన్ సిస్టమ్‌లో, పునఃప్రారంభం (restart) అయినప్పుడు ఖాతా బ్యాలెన్స్‌లను సురక్షితంగా ఉంచడానికి మనం వాటన్నింటినీ డిస్క్‌లో వ్రాయాలి. ఇక్కడ, సమాచారం పోయినా పర్వాలేదు.

- బదిలీలు మాత్రమే. ప్రొడక్షన్ సిస్టమ్‌లో ఆస్తులను బ్యాంకులో డిపాజిట్ చేయడానికి మరియు ఉపసంహరించుకోవడానికి (withdraw) ఒక మార్గం అవసరం. కానీ ఇక్కడ ఉద్దేశ్యం కేవలం కాన్సెప్ట్‌ను వివరించడమే, కాబట్టి ఈ బ్యాంక్ బదిలీలకు మాత్రమే పరిమితం చేయబడింది.

### శూన్య-జ్ఞాన నిరూపణలు {#zero-knowledge-proofs}

ప్రాథమిక స్థాయిలో, ఒక శూన్య-జ్ఞాన నిరూపణ, ప్రూవర్ వద్ద కొంత డేటా (_Data<sub>private</sub>_) ఉందని, మరియు కొంత పబ్లిక్ డేటా (_Data<sub>public</sub>_)కి మరియు _Data<sub>private</sub>_కి మధ్య ఒక సంబంధం (_Relationship_) ఉందని చూపిస్తుంది. ధృవీకర్తకు _Relationship_ మరియు _Data<sub>public</sub>_ తెలుసు.

గోప్యతను కాపాడేందుకు, స్థితులు మరియు లావాదేవీలు ప్రైవేట్‌గా ఉండాలి. కానీ సమగ్రతను నిర్ధారించుకోవడానికి, స్థితుల [క్రిప్టోగ్రాఫిక్ హాష్](https://en.wikipedia.org/wiki/Cryptographic_hash_function) పబ్లిక్‌గా ఉండాలి. లావాదేవీలను సమర్పించే వ్యక్తులకు ఆ లావాదేవీలు నిజంగా జరిగాయని నిరూపించడానికి, మనం లావాదేవీల హాష్‌లను కూడా పోస్ట్ చేయాలి.

చాలా సందర్భాలలో, _Data<sub>private</sub>_ అనేది శూన్య-జ్ఞాన నిరూపణ ప్రోగ్రామ్‌కి ఇన్‌పుట్ అవుతుంది, మరియు _Data<sub>public</sub>_ అనేది అవుట్‌పుట్ అవుతుంది.

_Data<sub>private</sub>_ లోని ఫీల్డ్‌లు ఇవి:

- _State<sub>n</sub>_, పాత స్థితి
- _State<sub>n+1</sub>_, కొత్త స్థితి
- _Transaction_, పాత స్థితి నుండి కొత్త స్థితికి మార్పు చేసే లావాదేవీ. ఈ లావాదేవీలో ఈ ఫీల్డ్‌లు ఉండాలి:
  - బదిలీని స్వీకరించే _గమ్యస్థాన చిరునామా_
  - బదిలీ చేయబడుతున్న _మొత్తం_
  - ప్రతి లావాదేవీని ఒకసారి మాత్రమే ప్రాసెస్ చేయగలమని నిర్ధారించడానికి _నాన్స్_.
    సంతకం నుండి మూల (source) చిరునామాను తిరిగి పొందవచ్చు కాబట్టి అది లావాదేవీలో ఉండాల్సిన అవసరం లేదు.
- _Signature_, లావాదేవీని నిర్వహించడానికి అధికారం కలిగిన ఒక సంతకం. మన విషయంలో, లావాదేవీని నిర్వహించడానికి అధికారం కలిగిన ఒకేఒక చిరునామా మూల చిరునామా. మన శూన్య-జ్ఞాన సిస్టమ్ పని చేసే విధానం వల్ల, ఎథీరియం సంతకంతో పాటుగా ఖాతా పబ్లిక్ కీ కూడా మనకు అవసరం.

_Data<sub>public</sub>_ లోని ఫీల్డ్‌లు ఇవి:

- _Hash(State<sub>n</sub>)_ పాత స్థితి యొక్క హాష్
- _Hash(State<sub>n+1</sub>)_ కొత్త స్థితి యొక్క హాష్
- _Hash(Transaction)_ స్థితిని _State<sub>n</sub>_ నుండి _State<sub>n+1</sub>_ కి మార్చే లావాదేవీ హాష్.

ఈ సంబంధం అనేక షరతులను తనిఖీ చేస్తుంది:

- పబ్లిక్ హాష్‌లు నిజంగానే ప్రైవేట్ ఫీల్డ్‌ల కోసం సరైన హాష్‌లు.
- లావాదేవీని పాత స్థితికి అన్వయించినప్పుడు, అది కొత్త స్థితికి దారి తీస్తుంది.
- లావాదేవీ మూల చిరునామా నుండి సంతకం వచ్చింది.

క్రిప్టోగ్రాఫిక్ హాష్ ఫంక్షన్ల లక్షణాల కారణంగా, సమగ్రతను నిర్ధారించడానికి ఈ షరతులను నిరూపిస్తే సరిపోతుంది.

### డేటా నిర్మాణాలు {#data-structures}

ప్రధాన డేటా నిర్మాణం అనేది సర్వర్ కలిగి ఉండే స్థితి. ప్రతి ఖాతా కోసం, సర్వర్ ఖాతా బ్యాలెన్స్‌ను మరియు [రీప్లే దాడులను (replay attacks)](https://en.wikipedia.org/wiki/Replay_attack) నిరోధించడానికి ఉపయోగించే ఒక [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce)ను ట్రాక్ చేస్తుంది.

### భాగాలు {#components}

ఈ సిస్టమ్‌కు రెండు భాగాలు అవసరం:

- లావాదేవీలను స్వీకరించి, ప్రాసెస్ చేసి, శూన్య-జ్ఞాన నిరూపణలతో పాటు హాష్‌లను చైన్‌లో పోస్ట్ చేసే _సర్వర్_.
- హాష్‌లను నిల్వ చేసే మరియు స్థితి మార్పులు చట్టబద్ధమైనవని నిర్ధారించడానికి శూన్య-జ్ఞాన నిరూపణలను ధృవీకరించే ఒక _స్మార్ట్ కాంట్రాక్ట్_.

### డేటా మరియు కంట్రోల్ ఫ్లో {#flows}

ఒక ఖాతా నుండి మరొక ఖాతాకు బదిలీ చేయడానికి వివిధ భాగాలు కమ్యూనికేట్ చేసే విధానాలు ఇవి.

1. సంతకం చేసిన వ్యక్తి ఖాతా నుండి వేరే ఖాతాకు బదిలీ చేయమని అభ్యర్థిస్తూ వెబ్ బ్రౌజర్ ఒక సంతకం చేయబడిన లావాదేవీని సమర్పిస్తుంది.

2. సర్వర్ లావాదేవీ చెల్లుబాటు అయ్యేదో లేదో ధృవీకరిస్తుంది:

   - బ్యాంకులో సంతకం చేసిన వ్యక్తికి తగినంత బ్యాలెన్స్‌తో ఒక ఖాతా ఉంది.
   - బ్యాంకులో స్వీకర్తకు ఒక ఖాతా ఉంది.

3. సంతకం చేసిన వ్యక్తి బ్యాలెన్స్ నుండి బదిలీ చేయబడిన మొత్తాన్ని తీసివేసి, దానిని స్వీకర్త బ్యాలెన్స్‌కు జోడించడం ద్వారా సర్వర్ కొత్త స్థితిని లెక్కిస్తుంది.

4. స్థితి మార్పు చెల్లుబాటు అయ్యేదని సర్వర్ ఒక శూన్య-జ్ఞాన నిరూపణను లెక్కిస్తుంది.

5. సర్వర్ ఎథీరియంకు వీటిని కలిగి ఉన్న లావాదేవీని సమర్పిస్తుంది:

   - కొత్త స్థితి హాష్
   - లావాదేవీ హాష్ (తద్వారా లావాదేవీ పంపిన వ్యక్తి అది ప్రాసెస్ చేయబడిందని తెలుసుకోవచ్చు)
   - కొత్త స్థితికి మార్పు చెల్లుబాటు అవుతుందని నిరూపించే శూన్య-జ్ఞాన నిరూపణ

6. స్మార్ట్ కాంట్రాక్ట్ శూన్య-జ్ఞాన నిరూపణను ధృవీకరిస్తుంది.

7. శూన్య-జ్ఞాన నిరూపణ ధృవీకరించబడితే, స్మార్ట్ కాంట్రాక్ట్ ఈ చర్యలను చేస్తుంది:
   - ప్రస్తుత స్థితి హాష్‌ను కొత్త స్థితి హాష్‌గా అప్‌డేట్ చేస్తుంది
   - కొత్త స్థితి హాష్ మరియు లావాదేవీ హాష్‌తో కూడిన లాగ్ ఎంట్రీని విడుదల చేస్తుంది

### సాధనాలు {#tools}

క్లయింట్-సైడ్ కోడ్ కోసం, మనం [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), మరియు [Wagmi](https://wagmi.sh/) లను ఉపయోగించబోతున్నాము. ఇవి పరిశ్రమ-ప్రామాణిక సాధనాలు; మీకు వాటి గురించి తెలియకపోతే, మీరు [ఈ ట్యుటోరియల్](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) ను ఉపయోగించవచ్చు.

సర్వర్‌లో ఎక్కువ భాగం [Node](https://nodejs.org/en) ని ఉపయోగించి JavaScript లో వ్రాయబడింది. శూన్య-జ్ఞాన భాగం [Noir](https://noir-lang.org/) లో వ్రాయబడింది. మనకు `1.0.0-beta.10` వెర్షన్ అవసరం, కాబట్టి మీరు [సూచించిన విధంగా Noir ని ఇన్‌స్టాల్ చేసిన](https://noir-lang.org/docs/getting_started/quick_start) తర్వాత, దీన్ని రన్ చేయండి:

```sh
noirup -v 1.0.0-beta.10
```

ఆన్‌చైన్ లో (దశ 3 లో) ధృవీకరించబడే నిరూపణలను సృష్టించడానికి మనకు ఈ Noir విడుదలకు సరిపోయే వెర్షన్‌లో ప్రూవింగ్ బ్యాకెండ్ అయిన [Barretenberg](https://barretenberg.aztec.network/docs/getting_started) (`bb`) కూడా అవసరం. Barretenberg ఇన్‌స్టాలర్ అయిన `bbup` ని ఇన్‌స్టాల్ చేయండి, ఆపై `bb` వెర్షన్ `0.87.0` ని ఇన్‌స్టాల్ చేయడానికి దాన్ని ఉపయోగించండి (`bbup` కనుగొనబడకపోతే, అప్‌డేట్ చేయబడిన `PATH` అమలులోకి రావడానికి కొత్త టెర్మినల్‌ను తెరవండి):

```sh
curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/next/barretenberg/bbup/install | bash
bbup -v 0.87.0
```

ఈ ట్యుటోరియల్ `nargo` 1.0.0-beta.10, `bb` 0.87.0, మరియు (సర్వర్‌లో) `@noir-lang/noir_js` 1.0.0-beta.11 తో పరీక్షించబడింది. కొత్త వెర్షన్‌లను ఉపయోగించవద్దు: ప్రస్తుత 1.0 రిలీజ్ క్యాండిడేట్‌లతో Noir కోడ్ కంపైల్ అవ్వదు, మరియు `bb` యొక్క ప్రస్తుత వెర్షన్‌లు `nargo` 1.0.0-beta.10 ద్వారా కంపైల్ చేయబడిన సర్క్యూట్‌లను చదవలేవు మరియు ఇకపై `--oracle_hash` ఫ్లాగ్‌ను అంగీకరించవు.

మనం ఉపయోగించే బ్లాక్‌చైన్ `anvil`, ఇది [Foundry](https://getfoundry.sh/introduction/installation) లో భాగమైన స్థానిక టెస్టింగ్ బ్లాక్‌చైన్.

## అమలు {#implementation}

ఇది ఒక సంక్లిష్టమైన సిస్టమ్ కాబట్టి, దీన్ని మనం దశలవారీగా అమలు చేస్తాము.

### 1వ దశ - మాన్యువల్ శూన్య-జ్ఞానం {#stage-1}

మొదటి దశ కోసం, మనం బ్రౌజర్‌లో లావాదేవీపై సంతకం చేసి, ఆపై శూన్య-జ్ఞాన నిరూపణకు సమాచారాన్ని మాన్యువల్‌గా అందిస్తాము. శూన్య-జ్ఞాన కోడ్ ఆ సమాచారాన్ని `server/noir/Prover.toml` లో ఆశిస్తుంది ([ఇక్కడ](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) డాక్యుమెంట్ చేయబడింది).

ఇది ఎలా పనిచేస్తుందో చూడడానికి:

1. మీ దగ్గర [Node](https://nodejs.org/en/download) మరియు [Noir](https://noir-lang.org/docs/installation) ఇన్‌స్టాల్ చేయబడి ఉన్నాయని నిర్ధారించుకోండి. ప్రాధాన్యతగా, వాటిని macOS, Linux, లేదా [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) లాంటి UNIX సిస్టమ్‌లలో ఇన్‌స్టాల్ చేయండి.

2. దశ 1 కోడ్‌ను డౌన్‌లోడ్ చేయండి మరియు క్లయింట్ కోడ్‌ను అందించడానికి వెబ్ సర్వర్‌ను ప్రారంభించండి.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   మీకు ఇక్కడ వెబ్ సర్వర్ ఎందుకు అవసరం అంటే, కొన్ని రకాల మోసాలను నిరోధించడానికి, మెటామాస్క్ లాంటి అనేక వాలెట్లు డిస్క్ నుండి నేరుగా అందించబడిన ఫైళ్ళను అంగీకరించవు.

3. వాలెట్ ఉన్న ఒక బ్రౌజర్‌ను తెరవండి.

4. వాలెట్‌లో, కొత్త పాస్‌ఫ్రేజ్‌ను నమోదు చేయండి. ఇది మీ ప్రస్తుత పాస్‌ఫ్రేజ్‌ను తొలగిస్తుందని గమనించండి, కాబట్టి _మీ దగ్గర బ్యాకప్ ఉందో లేదో నిర్ధారించుకోండి_.

   పాస్‌ఫ్రేజ్ `test test test test test test test test test test test junk`, ఇది anvil కోసం డిఫాల్ట్ టెస్టింగ్ పాస్‌ఫ్రేజ్.

5. [క్లయింట్-సైడ్ కోడ్‌](http://localhost:5173/)కి వెళ్లండి.

6. వాలెట్‌కి కనెక్ట్ అవ్వండి మరియు మీ గమ్యస్థాన ఖాతాను మరియు మొత్తాన్ని ఎంచుకోండి.

7. **Sign** బటన్ క్లిక్ చేసి లావాదేవీపై సంతకం చేయండి.

8. **Prover.toml** హెడింగ్ కింద, మీకు టెక్స్ట్ కనిపిస్తుంది. `server/noir/Prover.toml` ని ఆ టెక్స్ట్‌తో భర్తీ చేయండి.

9. శూన్య-జ్ఞాన నిరూపణను అమలు చేయండి.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   అవుట్‌పుట్ దీనికి సమానంగా ఉండాలి

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. సందేశం సరిగ్గా హాష్ చేయబడిందో లేదో చూడటానికి చివరి రెండు విలువలను వెబ్ బ్రౌజర్‌లో మీరు చూసే హాష్‌తో పోల్చండి.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir ద్వారా ఆశించిన సమాచార ఆకృతిని (format) చూపుతుంది.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

సందేశం టెక్స్ట్ ఫార్మాట్‌లో ఉంటుంది, ఇది వినియోగదారుకు అర్థం చేసుకోవడానికి (సంతకం చేసేటప్పుడు ఇది అవసరం) మరియు Noir కోడ్ పార్స్ చేయడానికి సులభతరం చేస్తుంది. ఒక వైపు పాక్షిక బదిలీలను అనుమతించడానికి, మరొక వైపు సులభంగా చదవగలిగేలా మొత్తాన్ని ఫినీలలో ఉదహరించబడింది. చివరి సంఖ్య [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce).

స్ట్రింగ్ 100 క్యారెక్టర్ల పొడవు ఉంటుంది. శూన్య-జ్ఞాన నిరూపణలు మారుతున్న-పరిమాణమున్న డేటాను సరిగ్గా నిర్వహించలేవు, కాబట్టి డేటాను ప్యాడ్ (pad) చేయడం తరచుగా అవసరమవుతుంది.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

ఈ మూడు పారామితులు (parameters) స్థిర-పరిమాణ బైట్ శ్రేణులు (fixed-size byte arrays).

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

నిర్మాణాల శ్రేణిని (array of structures) పేర్కొనడానికి ఇది ఒక మార్గం. ప్రతి ఎంట్రీకి, మనం చిరునామా, బ్యాలెన్స్ (మిల్లీETH అంటే [ఫిన్ని](https://cryptovalleyjournal.com/glossary/finney/)లో), మరియు తదుపరి నాన్స్ విలువను పేర్కొంటాము.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) క్లయింట్-సైడ్ ప్రాసెసింగ్‌ని అమలు చేస్తుంది మరియు `server/noir/Prover.toml` ఫైల్‌ని (శూన్య-జ్ఞాన పారామితులను కలిగినది) జనరేట్ చేస్తుంది.

మరింత ఆసక్తికరమైన భాగాల వివరణ ఇక్కడ ఉంది.

```tsx
export default attrs =>  {
```

ఈ ఫంక్షన్ `Transfer` React కాంపోనెంట్‌ని సృష్టిస్తుంది, ఇతర ఫైల్‌లు దీన్ని ఇంపోర్ట్ చేసుకోవచ్చు.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

ఇవి ఖాతా చిరునామాలు, `test ... test junk` పాస్‌ఫ్రేజ్ ద్వారా సృష్టించబడిన చిరునామాలు. మీరు మీ స్వంత చిరునామాలను ఉపయోగించాలనుకుంటే, ఈ నిర్వచనాన్ని సవరించండి.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

ఈ [Wagmi హుక్స్](https://wagmi.sh/react/api/hooks) మనకు [Viem](https://viem.sh/) లైబ్రరీని మరియు వాలెట్‌ని యాక్సెస్ చేయడానికి అనుమతిస్తాయి.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

ఇది సందేశం, ఖాళీలతో ప్యాడ్ చేయబడింది. [`useState`](https://react.dev/reference/react/useState) వేరియబుల్స్‌లో ఏదైనా ఒకటి మారిన ప్రతిసారీ, కాంపోనెంట్ మళ్ళీ గీయబడుతుంది (redrawn) మరియు `message` అప్‌డేట్ అవుతుంది.

```tsx
  const sign = async () => {
```

వినియోగదారు **Sign** బటన్ క్లిక్ చేసినప్పుడు ఈ ఫంక్షన్ కాల్ చేయబడుతుంది. సందేశం ఆటోమాటిక్‌గా అప్‌డేట్ అవుతుంది, కానీ సంతకం చేయడానికి వాలెట్‌లో వినియోగదారు ఆమోదం అవసరం, మరియు అవసరమైతే తప్ప దాని కోసం మనం అడగకూడదు.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

[సందేశంపై సంతకం చేయమని](https://viem.sh/docs/accounts/local/signMessage) వాలెట్‌ని అడగండి. 

```tsx
    const hash = hashMessage(message)
```

సందేశ హాష్‌ను పొందండి. డిబగ్గింగ్ (Noir కోడ్ కోసం) చేయడానికి వినియోగదారుకు దానిని అందించడం సహాయకారిగా ఉంటుంది. 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[పబ్లిక్ కీని పొందండి](https://viem.sh/docs/utilities/recoverPublicKey). ఇది [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) ఫంక్షన్ కోసం అవసరం.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

స్టేట్ వేరియబుల్స్‌ను సెట్ చేయండి. ఇలా చేయడం ద్వారా కాంపోనెంట్ మళ్ళీ గీయబడుతుంది (redrawn) (`sign` ఫంక్షన్ ఎగ్జిట్ అయిన తర్వాత) మరియు వినియోగదారుకు అప్‌డేట్ చేసిన విలువలను చూపుతుంది.

```tsx
    let proverToml = `
```

`Prover.toml` కోసం టెక్స్ట్.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem పబ్లిక్ కీని 65-బైట్ల హెక్సాడెసిమల్ స్ట్రింగ్‌గా మనకు అందిస్తుంది. మొదటి బైట్ `0x04`, ఇది వెర్షన్ మార్కర్. దీని తర్వాత పబ్లిక్ కీ యొక్క `x` కోసం 32 బైట్లు మరియు తర్వాత పబ్లిక్ కీ యొక్క `y` కోసం 32 బైట్లు ఉంటాయి.

అయితే, ఈ సమాచారాన్ని Noir రెండు-బైట్ల శ్రేణులుగా (arrays), ఒకటి `x` కోసం మరియు మరొకటి `y` కోసం ఆశిస్తుంది. శూన్య-జ్ఞాన నిరూపణలో భాగం కంటే ఇక్కడ క్లయింట్‌లో దాన్ని పార్స్ (parse) చేయడం సులభం.

సాధారణంగా శూన్య-జ్ఞానంలో ఇది ఒక మంచి పద్ధతి అని గమనించండి. శూన్య-జ్ఞాన నిరూపణ లోపల కోడ్ ఖరీదైనది, కాబట్టి శూన్య-జ్ఞాన నిరూపణ వెలుపల చేయగలిగే ఏదైనా ప్రాసెసింగ్ శూన్య-జ్ఞాన నిరూపణ వెలుపల _చేయాలి_.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

సంతకం కూడా 65-బైట్ల హెక్సాడెసిమల్ స్ట్రింగ్‌గా అందించబడుతుంది. అయితే, పబ్లిక్ కీని తిరిగి పొందడానికి మాత్రమే చివరి బైట్ అవసరం. పబ్లిక్ కీ ఇప్పటికే Noir కోడ్‌కి అందించబడుతుంది కాబట్టి, సంతకమును తనిఖీ చేయడానికి మనకు అది అవసరం లేదు, మరియు Noir కోడ్‌కు అది అవసరం లేదు.

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

ఇది కాంపోనెంట్ యొక్క HTML (మరింత కచ్చితంగా చెప్పాలంటే, [JSX](https://react.dev/learn/writing-markup-with-jsx)) ఫార్మాట్.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) అసలైన శూన్య-జ్ఞాన కోడ్.

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) అనేది [Noir standard library](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) తో అందించబడింది. శూన్య-జ్ఞాన నిరూపణలు సాధారణంగా ఈ హాష్ ఫంక్షన్‌ను ఉపయోగిస్తాయి. ప్రామాణిక హాష్ ఫంక్షన్‌లతో పోలిస్తే [అంకగణిత సర్క్యూట్‌ల](https://rareskills.io/post/arithmetic-circuit) లోపల దీన్ని లెక్కించడం చాలా సులభం.

```
use keccak256::keccak256;
use dep::ecrecover;
```

ఈ రెండు ఫంక్షన్‌లు బాహ్య లైబ్రరీలు, ఇవి [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) లో నిర్వచించబడ్డాయి. వాటి పేరుకు తగ్గట్టుగానే, అవి [keccak256 హాష్](https://emn178.github.io/online-tools/keccak_256.html) ని లెక్కించే ఫంక్షన్ మరియు ఎథీరియం సంతకాలను ధృవీకరించి, సంతకం చేసిన వ్యక్తి ఎథీరియం చిరునామాను తిరిగి పొందే ఫంక్షన్.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir అనేది [Rust](https://www.rust-lang.org/) ద్వారా ప్రేరణ పొందింది. వేరియబుల్స్, డిఫాల్ట్‌గా, స్థిరాంకాలు (constants). ఈ విధంగా మనం గ్లోబల్ కాన్ఫిగరేషన్ స్థిరాంకాలను నిర్వచిస్తాము. ప్రత్యేకించి, `ACCOUNT_NUMBER` అనేది మనం నిల్వ చేసే ఖాతాల సంఖ్య.

`u<number>` అని పేరు పెట్టబడిన డేటా రకాలు ఆ సంఖ్యలోని బిట్‌లు, అన్‌సైన్డ్ (unsigned). మద్దతు ఉన్న ఏకైక రకాలు `u8`, `u16`, `u32`, `u64`, మరియు `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

క్రింద వివరించిన విధంగా, ఈ వేరియబుల్ ఖాతాల Pedersen హాష్ కోసం ఉపయోగించబడుతుంది.

```
global MESSAGE_LENGTH : u32 = 100;
```

పైన వివరించిన విధంగా, సందేశం పొడవు స్థిరంగా ఉంటుంది. ఇది ఇక్కడ పేర్కొనబడింది.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 సంతకాలకు](https://eips.ethereum.org/EIPS/eip-191) 26-బైట్ ప్రిఫిక్స్‌తో కూడిన బఫర్, ఆ తర్వాత ASCII లో సందేశం పొడవు, మరియు చివరగా సందేశం అవసరం.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

ఒక ఖాతా గురించి మనం నిల్వ చేసే సమాచారం. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) అనేది ఒక సంఖ్య, సాధారణంగా 253 బిట్‌ల వరకు ఉంటుంది, దీనిని శూన్య-జ్ఞాన నిరూపణను అమలు చేసే [అంకగణిత సర్క్యూట్](https://rareskills.io/post/arithmetic-circuit) లో నేరుగా ఉపయోగించవచ్చు. ఇక్కడ మనం 160-బిట్ ఎథీరియం చిరునామాను నిల్వ చేయడానికి `Field` ని ఉపయోగిస్తాము.

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

ఒక ఫంక్షన్ నిర్వచనం. పరామితి (parameter) అనేది `Account` సమాచారం. ఫలితం `Field` వేరియబుల్స్ యొక్క శ్రేణి (array), దీని పొడవు `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

శ్రేణిలోని మొదటి విలువ ఖాతా చిరునామా. రెండవది బ్యాలెన్స్ మరియు నాన్స్ రెండింటినీ కలిగి ఉంటుంది. `.into()` కాల్స్ ఒక సంఖ్యను దానికి అవసరమైన డేటా రకానికి మారుస్తాయి. `account.nonce` అనేది `u32` విలువ, కానీ దానిని `u128` విలువ అయిన `account.balance << 32` కి జోడించడానికి, అది `u128` అయి ఉండాలి. అది మొదటి `.into()`. రెండవది `u128` ఫలితాన్ని `Field` గా మారుస్తుంది, తద్వారా అది శ్రేణిలో సరిపోతుంది.

```
    flat
}
```

Noir లో, ఫంక్షన్‌లు చివరలో మాత్రమే విలువను తిరిగి ఇవ్వగలవు (ముందస్తు రిటర్న్ లేదు). రిటర్న్ విలువను పేర్కొనడానికి, మీరు ఫంక్షన్ యొక్క ముగింపు బ్రాకెట్‌కు ముందు దాన్ని మూల్యాంకనం చేస్తారు.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

ఈ ఫంక్షన్ ఖాతాల శ్రేణిని `Field` శ్రేణిగా మారుస్తుంది, దీనిని Pedersen హాష్‌కు ఇన్‌పుట్‌గా ఉపయోగించవచ్చు.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

మ్యూటబుల్ వేరియబుల్‌ను, అంటే స్థిరాంకం _కాని_ దానిని మీరు ఈ విధంగా పేర్కొంటారు. Noir లోని వేరియబుల్స్ ఎల్లప్పుడూ ఒక విలువను కలిగి ఉండాలి, కాబట్టి మనం ఈ వేరియబుల్‌ను అన్ని సున్నాలకు ఇనిషియలైజ్ చేస్తాము.

```
    for i in 0..ACCOUNT_NUMBER {
```

ఇది ఒక `for` లూప్. సరిహద్దులు స్థిరాంకాలు అని గమనించండి. Noir లూప్‌లు కంపైల్ సమయంలో వాటి సరిహద్దులను తెలుసుకోవాలి. దానికి కారణం అంకగణిత సర్క్యూట్‌లు ఫ్లో కంట్రోల్‌కు మద్దతు ఇవ్వవు. `for` లూప్‌ను ప్రాసెస్ చేస్తున్నప్పుడు, కంపైలర్ దాని లోపల ఉన్న కోడ్‌ను ప్రతి ఇటరేషన్‌కు ఒకటి చొప్పున బహుళ సార్లు ఉంచుతుంది.

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

చివరగా, ఖాతాల శ్రేణిని హాష్ చేసే ఫంక్షన్‌కు మనం చేరుకున్నాము.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

ఈ ఫంక్షన్ నిర్దిష్ట చిరునామాతో ఉన్న ఖాతాను కనుగొంటుంది. ప్రామాణిక కోడ్‌లో ఈ ఫంక్షన్ చాలా అసమర్థంగా ఉంటుంది ఎందుకంటే ఇది చిరునామాను కనుగొన్న తర్వాత కూడా అన్ని ఖాతాల గుండా ఇటరేట్ అవుతుంది.

అయితే, శూన్య-జ్ఞాన నిరూపణలలో, ఫ్లో కంట్రోల్ ఉండదు. మనం ఎప్పుడైనా ఒక షరతును తనిఖీ చేయవలసి వస్తే, మనం దానిని ప్రతిసారీ తనిఖీ చేయాలి.

`if` స్టేట్‌మెంట్‌లతో కూడా ఇలాంటిదే జరుగుతుంది. పై లూప్‌లోని `if` స్టేట్‌మెంట్ ఈ గణిత స్టేట్‌మెంట్‌లుగా అనువదించబడుతుంది.

_condition<sub>result</sub> = accounts[i].address == address_ // అవి సమానంగా ఉంటే ఒకటి, లేకపోతే సున్నా

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

అసెర్షన్ (assertion) తప్పు అయితే [`assert`](https://noir-lang.org/docs/language/assert) ఫంక్షన్ శూన్య-జ్ఞాన నిరూపణ క్రాష్ అయ్యేలా చేస్తుంది. ఈ సందర్భంలో, సంబంధిత చిరునామాతో మనం ఖాతాను కనుగొనలేకపోతే. చిరునామాను నివేదించడానికి, మనం [ఫార్మాట్ స్ట్రింగ్](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) ని ఉపయోగిస్తాము.

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

ఈ ఫంక్షన్ బదిలీ లావాదేవీని వర్తింపజేస్తుంది మరియు కొత్త ఖాతాల శ్రేణిని తిరిగి ఇస్తుంది.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

మనం Noir లోని ఫార్మాట్ స్ట్రింగ్ లోపల స్ట్రక్చర్ ఎలిమెంట్‌లను యాక్సెస్ చేయలేము, కాబట్టి మనం ఉపయోగించగల కాపీని సృష్టిస్తాము.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

లావాదేవీని చెల్లనిదిగా మార్చగల రెండు షరతులు ఇవి.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

కొత్త ఖాతాల శ్రేణిని సృష్టించి, ఆపై దాన్ని తిరిగి ఇవ్వండి.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

ఈ ఫంక్షన్ సందేశం నుండి చిరునామాను చదువుతుంది.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

చిరునామా ఎల్లప్పుడూ 20 బైట్‌ల (అంటే 40 హెక్సాడెసిమల్ అంకెలు) పొడవు ఉంటుంది మరియు క్యారెక్టర్ #7 వద్ద ప్రారంభమవుతుంది.

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

సందేశం నుండి మొత్తం మరియు నాన్స్ ని చదవండి.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

సందేశంలో, చిరునామా తర్వాత మొదటి సంఖ్య బదిలీ చేయవలసిన ఫిన్ని (అంటే ETH లో వెయ్యవ వంతు) మొత్తం. రెండవ సంఖ్య నాన్స్. వాటి మధ్య ఉన్న ఏదైనా టెక్స్ట్ విస్మరించబడుతుంది.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // మేము దానిని ఇప్పుడే కనుగొన్నాము
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

[టపుల్ (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) ని తిరిగి ఇవ్వడం అనేది ఫంక్షన్ నుండి బహుళ విలువలను తిరిగి ఇవ్వడానికి Noir పద్ధతి.

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

ఈ ఫంక్షన్ సందేశాన్ని బైట్‌లుగా మారుస్తుంది, ఆపై మొత్తాలను `TransferTxn` గా మారుస్తుంది.

```rust
// Viem యొక్క hashMessage కి సమానమైనది
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

ఖాతాలు శూన్య-జ్ఞాన నిరూపణ లోపల మాత్రమే హాష్ చేయబడతాయి కాబట్టి మనం వాటి కోసం Pedersen హాష్‌ను ఉపయోగించగలిగాము. అయితే, ఈ కోడ్‌లో మనం బ్రౌజర్ ద్వారా రూపొందించబడిన సందేశం యొక్క సంతకాన్ని తనిఖీ చేయాలి. దాని కోసం, మనం [EIP-191](https://eips.ethereum.org/EIPS/eip-191) లోని ఎథీరియం సంతకం చేసే ఫార్మాట్‌ను అనుసరించాలి. అంటే మనం ప్రామాణిక ప్రిఫిక్స్, ASCII లో సందేశం పొడవు మరియు సందేశంతో కలిపి ఒక బఫర్‌ను సృష్టించాలి మరియు దానిని హాష్ చేయడానికి ఎథీరియం ప్రామాణిక keccak256 ని ఉపయోగించాలి.

```rust
    // ASCII ఉపసర్గ
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

ఒక అప్లికేషన్ లావాదేవీగా లేదా మరేదైనా ప్రయోజనం కోసం ఉపయోగించగల సందేశంపై సంతకం చేయమని వినియోగదారుని అడిగే సందర్భాలను నివారించడానికి, సంతకం చేసిన అన్ని సందేశాలు 0x19 క్యారెక్టర్‌తో (చెల్లుబాటు అయ్యే ASCII క్యారెక్టర్ కాదు) ప్రారంభమై, ఆ తర్వాత `Ethereum Signed Message:` మరియు న్యూలైన్‌తో ఉండాలని EIP-191 నిర్దేశిస్తుంది.

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

999 వరకు సందేశ పొడవులను హ్యాండిల్ చేయండి మరియు అంతకంటే ఎక్కువ ఉంటే విఫలం చేయండి. సందేశం పొడవు స్థిరాంకం అయినప్పటికీ, దాన్ని మార్చడం సులభతరం చేయడానికి నేను ఈ కోడ్‌ని జోడించాను. ప్రొడక్షన్ సిస్టమ్‌లో, మెరుగైన పనితీరు కోసం `MESSAGE_LENGTH` మారదని మీరు బహుశా అనుకుంటారు.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

ఎథీరియం ప్రామాణిక `keccak256` ఫంక్షన్‌ను ఉపయోగించండి.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // చిరునామా, హాష్ యొక్క మొదటి 16 బైట్‌లు, హాష్ యొక్క చివరి 16 బైట్‌లు        
{
```

ఈ ఫంక్షన్ సంతకాన్ని ధృవీకరిస్తుంది, దీనికి సందేశం హాష్ అవసరం. ఆ తర్వాత ఇది సంతకం చేసిన చిరునామాను మరియు సందేశం హాష్‌ను మనకు అందిస్తుంది. సందేశం హాష్ రెండు `Field` విలువలలో సరఫరా చేయబడుతుంది ఎందుకంటే బైట్ శ్రేణి కంటే ప్రోగ్రామ్‌లోని మిగిలిన భాగంలో వాటిని ఉపయోగించడం సులభం.

మనం రెండు `Field` విలువలను ఉపయోగించాలి ఎందుకంటే ఫీల్డ్ లెక్కలు పెద్ద సంఖ్యలో [మాడ్యులో (modulo)](https://en.wikipedia.org/wiki/Modulo) చేయబడతాయి, కానీ ఆ సంఖ్య సాధారణంగా 256 బిట్‌ల కంటే తక్కువగా ఉంటుంది (లేకపోతే EVM లో ఆ లెక్కలను చేయడం కష్టంగా ఉంటుంది).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` మరియు `hash2` లను మ్యూటబుల్ వేరియబుల్స్‌గా పేర్కొనండి మరియు వాటిలోకి హాష్‌ను బైట్ బై బైట్‌గా వ్రాయండి.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
ఇది [Solidity యొక్క `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) కి సమానంగా ఉంటుంది, రెండు ముఖ్యమైన తేడాలతో:

- సంతకం చెల్లనిదైతే, కాల్ `assert` విఫలమవుతుంది మరియు ప్రోగ్రామ్ నిలిపివేయబడుతుంది.
- పబ్లిక్ కీని సంతకం మరియు హాష్ నుండి తిరిగి పొందగలిగినప్పటికీ, ఇది బాహ్యంగా చేయగల ప్రాసెసింగ్ మరియు అందువల్ల, శూన్య-జ్ఞాన నిరూపణ లోపల చేయడం విలువైనది కాదు. ఇక్కడ ఎవరైనా మనల్ని మోసం చేయడానికి ప్రయత్నిస్తే, సంతకం ధృవీకరణ విఫలమవుతుంది.

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
        Field,  // పాత ఖాతాల శ్రేణి యొక్క హాష్
        Field,  // కొత్త ఖాతాల శ్రేణి యొక్క హాష్
        Field,  // సందేశం హాష్ యొక్క మొదటి 16 బైట్‌లు
        Field,  // సందేశం హాష్ యొక్క చివరి 16 బైట్‌లు
    )
```

చివరగా, మనం `main` ఫంక్షన్‌కు చేరుకుంటాము. ఖాతాల హాష్‌ను పాత విలువ నుండి కొత్త దానికి చెల్లుబాటు అయ్యేలా మార్చే లావాదేవీ మన వద్ద ఉందని మనం నిరూపించాలి. పంపిన వ్యక్తికి వారి లావాదేవీ ప్రాసెస్ చేయబడిందని తెలుసుకోవడానికి ఇది ఈ నిర్దిష్ట లావాదేవీ హాష్‌ను కలిగి ఉందని కూడా మనం నిరూపించాలి.

```rust
{
    let mut txn = readTransferTxn(message);
```

మనం సందేశం నుండి పంపినవారి చిరునామాను చదవం కాబట్టి, మనం దానిని సంతకం నుండి చదువుతాము కాబట్టి `txn` మ్యూటబుల్‌గా ఉండాలి. 

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

### దశ 2 - సర్వర్‌ను జోడించడం {#stage-2}

రెండవ దశలో, బ్రౌజర్ నుండి బదిలీ లావాదేవీలను స్వీకరించి అమలు చేసే సర్వర్‌ను మనం జోడిస్తాము.

ఇది ఎలా పనిచేస్తుందో చూడటానికి:

1. Vite రన్ అవుతుంటే దాన్ని ఆపండి.

2. సర్వర్‌ను కలిగి ఉన్న బ్రాంచ్‌ను డౌన్‌లోడ్ చేయండి మరియు మీకు అవసరమైన అన్ని మాడ్యూల్స్ ఉన్నాయని నిర్ధారించుకోండి.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir కోడ్‌ను కంపైల్ చేయవలసిన అవసరం లేదు, ఇది మీరు దశ 1 కోసం ఉపయోగించిన కోడ్ లాగానే ఉంటుంది.

3. సర్వర్‌ను ప్రారంభించండి.

   ```sh
   npm run start
   ```

4. ప్రత్యేక కమాండ్-లైన్ విండోలో, రిపోజిటరీ రూట్ నుండి ప్రారంభించి, బ్రౌజర్ కోడ్‌ను అందించడానికి Vite ని రన్ చేయండి.

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) వద్ద క్లయింట్ కోడ్‌ను బ్రౌజ్ చేయండి

6. మీరు లావాదేవీని జారీ చేయడానికి ముందు, మీరు నాన్స్, అలాగే మీరు పంపగల మొత్తాన్ని తెలుసుకోవాలి. ఈ సమాచారాన్ని పొందడానికి, **Update account data** పై క్లిక్ చేసి, సందేశంపై సంతకం చేయండి.

   ఇక్కడ మనకు ఒక సందిగ్ధత ఉంది. ఒకవైపు, తిరిగి ఉపయోగించగల సందేశంపై సంతకం చేయడం మనకు ఇష్టం లేదు ([రీప్లే దాడి (replay attack)](https://en.wikipedia.org/wiki/Replay_attack)), అందుకే మనకు ముందుగా నాన్స్ కావాలి. అయితే, మనకు ఇంకా నాన్స్ లేదు. దీనికి పరిష్కారం ఏమిటంటే, ఒకసారి మాత్రమే ఉపయోగించగల మరియు ప్రస్తుత సమయం వంటి రెండు వైపులా మనకు ఇప్పటికే ఉన్న నాన్స్‌ను ఎంచుకోవడం.

   ఈ పరిష్కారంతో ఉన్న సమస్య ఏమిటంటే సమయం ఖచ్చితంగా సమకాలీకరించబడకపోవచ్చు. కాబట్టి దానికి బదులుగా, ప్రతి నిమిషం మారే విలువపై మనం సంతకం చేస్తాము. అంటే రీప్లే దాడులకు గురయ్యే అవకాశం మనకు గరిష్టంగా ఒక నిమిషం మాత్రమే ఉంటుంది. ప్రొడక్షన్‌లో సంతకం చేయబడిన అభ్యర్థన TLS ద్వారా రక్షించబడుతుందని మరియు టన్నెల్ యొక్క మరొక వైపు---సర్వర్---ఇప్పటికే బ్యాలెన్స్ మరియు నాన్స్‌ను బహిర్గతం చేయగలదని (పని చేయడానికి అది వాటిని తెలుసుకోవాలి) పరిగణనలోకి తీసుకుంటే, ఇది ఆమోదయోగ్యమైన ప్రమాదం.

7. బ్రౌజర్ బ్యాలెన్స్ మరియు నాన్స్‌ను తిరిగి పొందిన తర్వాత, అది బదిలీ ఫారమ్‌ను చూపుతుంది. గమ్యస్థాన చిరునామా మరియు మొత్తాన్ని ఎంచుకుని, **Transfer** పై క్లిక్ చేయండి. ఈ అభ్యర్థనపై సంతకం చేయండి.

8. బదిలీని చూడటానికి, **Update account data** చేయండి లేదా మీరు సర్వర్‌ను రన్ చేసే విండోలో చూడండి. సర్వర్ ప్రతిసారీ స్థితి మారినప్పుడు దాన్ని లాగ్ చేస్తుంది.

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

[ఈ ఫైల్](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) సర్వర్ ప్రాసెస్‌ను కలిగి ఉంటుంది మరియు [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) వద్ద ఉన్న Noir కోడ్‌తో ఇంటరాక్ట్ అవుతుంది. ఆసక్తికరమైన భాగాల వివరణ ఇక్కడ ఉంది.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) లైబ్రరీ JavaScript కోడ్ మరియు Noir కోడ్ మధ్య ఇంటర్‌ఫేస్‌గా పనిచేస్తుంది.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

అంకగణిత సర్క్యూట్‌ను లోడ్ చేసి---అంటే మునుపటి దశలో మనం సృష్టించిన కంపైల్ చేయబడిన Noir ప్రోగ్రామ్---దానిని అమలు చేయడానికి సిద్ధం కండి.

```js
// సంతకం చేసిన అభ్యర్థనకు ప్రతిస్పందనగా మాత్రమే మేము ఖాతా సమాచారాన్ని అందిస్తాము
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

ఖాతా సమాచారాన్ని అందించడానికి, మనకు సంతకం మాత్రమే అవసరం. దానికి కారణం సందేశం ఏమి కాబోతోందో మనకు ముందే తెలుసు, కాబట్టి సందేశ హాష్ కూడా తెలుస్తుంది.

```js
const processMessage = async (message, signature) => {
```

ఒక సందేశాన్ని ప్రాసెస్ చేసి, అది ఎన్‌కోడ్ చేసే లావాదేవీని అమలు చేయండి.

```js
    // పబ్లిక్ కీని పొందండి
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

ఇప్పుడు మనం సర్వర్‌లో JavaScript ని రన్ చేస్తున్నాం కాబట్టి, క్లయింట్‌లో కాకుండా పబ్లిక్ కీని అక్కడే పొందవచ్చు.

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

`noir.execute` Noir ప్రోగ్రామ్‌ను రన్ చేస్తుంది. పారామితులు [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) లో అందించిన వాటికి సమానంగా ఉంటాయి. పొడవైన విలువలు హెక్సాడెసిమల్ స్ట్రింగ్స్ శ్రేణిగా (`["0x60", "0xA7"]`) అందించబడతాయని గమనించండి, Viem చేసే విధంగా ఒకే హెక్సాడెసిమల్ విలువగా (`0x60A7`) కాదని గమనించండి.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

ఒకవేళ లోపం (error) ఉంటే, దాన్ని క్యాచ్ చేసి, సులభతరమైన వెర్షన్‌ను క్లయింట్‌కి రిలే చేయండి.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

లావాదేవీని వర్తింపజేయండి. మనం దీన్ని ఇప్పటికే Noir కోడ్‌లో చేసాము, కానీ ఫలితాన్ని అక్కడ నుండి తీయడం కంటే ఇక్కడ మళ్లీ చేయడం సులభం.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

ప్రారంభ `Accounts` నిర్మాణం (structure).

### దశ 3 - ఎథీరియం స్మార్ట్ కాంట్రాక్ట్‌లు {#stage-3}

1. సర్వర్ మరియు క్లయింట్ ప్రాసెస్‌లను ఆపండి.

2. స్మార్ట్ కాంట్రాక్ట్‌లతో ఉన్న బ్రాంచ్‌ను డౌన్‌లోడ్ చేయండి మరియు మీకు అవసరమైన అన్ని మాడ్యూల్స్ ఉన్నాయని నిర్ధారించుకోండి.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. ప్రత్యేక కమాండ్-లైన్ విండోలో `anvil` ని రన్ చేయండి.

4. ధృవీకరణ కీ మరియు Solidity ధృవీకర్తను రూపొందించండి, ఆపై ధృవీకర్త కోడ్‌ను Solidity ప్రాజెక్ట్‌కు కాపీ చేయండి.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. స్మార్ట్ కాంట్రాక్ట్‌లకు వెళ్లి, `anvil` బ్లాక్‌చైన్‌ను ఉపయోగించడానికి ఎన్విరాన్‌మెంట్ వేరియబుల్స్‌ను సెట్ చేయండి.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` ని డిప్లాయ్ చేయండి మరియు చిరునామాను ఎన్విరాన్‌మెంట్ వేరియబుల్‌లో నిల్వ చేయండి.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` కాంట్రాక్ట్‌ను డిప్లాయ్ చేయండి.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` విలువ అనేది `Accounts` యొక్క ప్రారంభ స్థితి యొక్క Pedersen హాష్. మీరు `server/index.mjs` లో ఈ ప్రారంభ స్థితిని సవరించినట్లయితే, శూన్య-జ్ఞాన నిరూపణ ద్వారా నివేదించబడిన ప్రారంభ హాష్‌ను చూడటానికి మీరు లావాదేవీని రన్ చేయవచ్చు.

8. సర్వర్‌ను రన్ చేయండి.

   ```sh
   cd ../server
   npm run start
   ```

9. రిపోజిటరీ రూట్ నుండి ప్రారంభించి, వేరొక కమాండ్-లైన్ విండోలో క్లయింట్‌ను రన్ చేయండి.

   ```sh
   cd client
   npm run dev
   ```

10. కొన్ని లావాదేవీలను రన్ చేయండి.

11. ఆన్‌చైన్‌లో స్థితి మారిందని ధృవీకరించడానికి, సర్వర్ ప్రాసెస్‌ను పునఃప్రారంభించండి. లావాదేవీలలోని అసలు హాష్ విలువ ఆన్‌చైన్‌లో నిల్వ చేయబడిన హాష్ విలువకు భిన్నంగా ఉన్నందున, `ZkBank` ఇకపై లావాదేవీలను అంగీకరించదని చూడండి.

    ఇది ఆశించిన రకమైన లోపం.

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

ఈ ఫైల్‌లోని మార్పులు ఎక్కువగా అసలు నిరూపణను సృష్టించడం మరియు దానిని ఆన్‌చైన్‌లో సమర్పించడానికి సంబంధించినవి.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

ఆన్‌చైన్‌లో పంపడానికి అసలు నిరూపణను సృష్టించడానికి మనం [Barretenberg ప్యాకేజీని](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ఉపయోగించాలి. కమాండ్-లైన్ ఇంటర్‌ఫేస్ (`bb`) ని రన్ చేయడం ద్వారా లేదా [JavaScript లైబ్రరీ, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) ని ఉపయోగించడం ద్వారా మనం ఈ ప్యాకేజీని ఉపయోగించవచ్చు. నేటివ్‌గా కోడ్‌ను రన్ చేయడం కంటే JavaScript లైబ్రరీ చాలా నెమ్మదిగా ఉంటుంది, కాబట్టి కమాండ్-లైన్‌ను ఉపయోగించడానికి మనం ఇక్కడ [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ని ఉపయోగిస్తాము.

మీరు `bb.js` ని ఉపయోగించాలని నిర్ణయించుకుంటే, మీరు ఉపయోగిస్తున్న Noir వెర్షన్‌కు అనుకూలంగా ఉండే వెర్షన్‌ను ఉపయోగించాలని గమనించండి. ఉదాహరణకు, Noir 1.0.0-beta.10 మరియు 1.0.0-beta.11 రెండూ `bb` మరియు `bb.js` వెర్షన్ 0.87 తో వెళ్తాయి.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

మీరు క్లీన్ `anvil` తో ప్రారంభించి, పై సూచనలను అనుసరించినప్పుడు మీకు లభించే చిరునామా ఇక్కడ ఉంది.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

ఈ ప్రైవేట్ కీ `anvil` లోని డిఫాల్ట్ ప్రీ-ఫండెడ్ ఖాతాలలో ఒకటి. 

```js
const generateProof = async (witness, fileID) => {
```

`bb` ఎక్జిక్యూటబుల్ ఉపయోగించి నిరూపణను రూపొందించండి.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

సాక్ష్యాన్ని ఫైల్‌లో వ్రాయండి.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

వాస్తవానికి నిరూపణను సృష్టించండి. ఈ దశ పబ్లిక్ వేరియబుల్స్‌తో కూడిన ఫైల్‌ను కూడా సృష్టిస్తుంది, కానీ మనకు అది అవసరం లేదు. మనం ఇప్పటికే ఆ వేరియబుల్స్‌ను `noir.execute` నుండి పొందాము.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

నిరూపణ అనేది `Field` విలువల యొక్క JSON శ్రేణి, ప్రతి ఒక్కటి హెక్సాడెసిమల్ విలువగా సూచించబడుతుంది. అయితే, మనం దానిని లావాదేవీలో ఒకే `bytes` విలువగా పంపాలి, దీనిని Viem పెద్ద హెక్సాడెసిమల్ స్ట్రింగ్ ద్వారా సూచిస్తుంది. ఇక్కడ మనం అన్ని విలువలను కలపడం ద్వారా, అన్ని `0x` లను తీసివేసి, ఆపై చివరలో ఒకదాన్ని జోడించడం ద్వారా ఫార్మాట్‌ను మారుస్తాము.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

క్లీనప్ చేసి, నిరూపణను తిరిగి ఇవ్వండి.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

పబ్లిక్ ఫీల్డ్‌లు 32-బైట్ విలువల శ్రేణిగా ఉండాలి. అయితే, మనం లావాదేవీ హాష్‌ను రెండు `Field` విలువల మధ్య విభజించవలసి ఉన్నందున, అది 16-బైట్ విలువగా కనిపిస్తుంది. ఇక్కడ మనం సున్నాలను జోడిస్తాము, తద్వారా ఇది వాస్తవానికి 32 బైట్‌లు అని Viem అర్థం చేసుకుంటుంది.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

ప్రతి చిరునామా ప్రతి నాన్స్‌ను ఒకసారి మాత్రమే ఉపయోగిస్తుంది, తద్వారా మనం సాక్ష్యం ఫైల్ మరియు అవుట్‌పుట్ డైరెక్టరీకి ప్రత్యేక ఐడెంటిఫైయర్‌గా `fromAddress` మరియు `nonce` కలయికను ఉపయోగించవచ్చు.

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

లావాదేవీని స్వీకరించే ఆన్‌చైన్ కోడ్ ఇది.

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

ఆన్‌చైన్ కోడ్ రెండు వేరియబుల్స్‌ను ట్రాక్ చేయాలి: ధృవీకర్త (Barretenberg యొక్క `bb write_solidity_verifier` ద్వారా రూపొందించబడిన ప్రత్యేక కాంట్రాక్ట్) మరియు ప్రస్తుత స్థితి హాష్.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

ప్రతిసారీ స్థితి మారినప్పుడు, మనం `TransactionProcessed` ఘటనను విడుదల చేస్తాము.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

ఈ ఫంక్షన్ లావాదేవీలను ప్రాసెస్ చేస్తుంది. ఇది ధృవీకర్తకు అవసరమైన ఫార్మాట్‌లో (ఆన్‌చైన్ ప్రాసెసింగ్‌ను మరియు తద్వారా గ్యాస్ ఖర్చులను తగ్గించడానికి) నిరూపణను (`bytes` గా) మరియు పబ్లిక్ ఇన్‌పుట్‌లను (`bytes32` శ్రేణిగా) పొందుతుంది.

```solidity
        require(_publicFields[0] == currentStateHash,
            "Wrong old state hash");
```

లావాదేవీ మన ప్రస్తుత హాష్ నుండి కొత్త దానికి మారుతుందని శూన్య-జ్ఞాన నిరూపణ ఉండాలి.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

శూన్య-జ్ఞాన నిరూపణను ధృవీకరించడానికి ధృవీకర్త కాంట్రాక్ట్‌ను కాల్ చేయండి. శూన్య-జ్ఞాన నిరూపణ తప్పు అయితే ఈ దశ లావాదేవీని రివర్ట్ చేస్తుంది.

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

అంతా సరిగ్గా ఉంటే, స్థితి హాష్‌ను కొత్త విలువకు అప్‌డేట్ చేయండి మరియు `TransactionProcessed` ఘటనను విడుదల చేయండి.

## కేంద్రీకృత భాగం ద్వారా దుర్వినియోగాలు (Abuses by the centralized component) {#abuses}

సమాచార భద్రతలో మూడు లక్షణాలు ఉంటాయి:

- _రహస్యత (Confidentiality)_, వినియోగదారులు చదవడానికి అధికారం లేని సమాచారాన్ని చదవలేరు.
- _సమగ్రత (Integrity)_, అధీకృత (authorized) పద్ధతిలో అధీకృత వినియోగదారులు తప్ప సమాచారాన్ని ఇతరులు మార్చలేరు.
- _లభ్యత (Availability)_, అధీకృత వినియోగదారులు సిస్టమ్‌ను ఉపయోగించగలరు.

ఈ సిస్టమ్‌లో, శూన్య-జ్ఞాన నిరూపణల ద్వారా సమగ్రత అందించబడుతుంది. లభ్యతకు హామీ ఇవ్వడం చాలా కష్టం, మరియు బ్యాంకు ప్రతి ఖాతా బ్యాలెన్స్‌ను మరియు అన్ని లావాదేవీలను తెలుసుకోవాలి కాబట్టి, రహస్యత అనేది అసాధ్యం. సమాచారాన్ని కలిగి ఉన్న ఎంటిటీ ఆ సమాచారాన్ని పంచుకోకుండా నిరోధించడానికి ఎటువంటి మార్గం లేదు.

[స్టెల్త్ చిరునామాలను (stealth addresses)](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ఉపయోగించి పూర్తిగా గోప్యమైన బ్యాంకును సృష్టించడం సాధ్యపడవచ్చు, కానీ అది ఈ ఆర్టికల్ పరిధిలో లేదు.

### తప్పుడు సమాచారం {#false-info}

సమగ్రతను సర్వర్ ఉల్లంఘించే ఒక మార్గం ఏమిటంటే, [డేటాను అభ్యర్థించినప్పుడు](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) తప్పుడు సమాచారాన్ని అందించడం.

దీన్ని పరిష్కరించడానికి, మనం ఖాతాలను ప్రైవేట్ ఇన్‌పుట్‌గా మరియు ఏ చిరునామాకైతే సమాచారం అభ్యర్థించబడిందో దాన్ని పబ్లిక్ ఇన్‌పుట్‌గా స్వీకరించే రెండవ Noir ప్రోగ్రామ్‌ను వ్రాయవచ్చు. ఆ చిరునామా యొక్క బ్యాలెన్స్ మరియు నాన్స్, అలాగే ఖాతాల హాష్ అనేది అవుట్‌పుట్ అవుతుంది.

వాస్తవానికి, ఈ నిరూపణ ఆన్‌చైన్‌లో ధృవీకరించబడదు, ఎందుకంటే మనం ఆన్‌చైన్‌లో నాన్స్‌లను మరియు బ్యాలెన్స్‌లను పోస్ట్ చేయాలనుకోవట్లేదు. అయితే, ఇది బ్రౌజర్‌లో రన్ అవుతున్న క్లయింట్ కోడ్ ద్వారా ధృవీకరించబడుతుంది.

### బలవంతపు లావాదేవీలు {#forced-txns}

L2ల మీద లభ్యతను నిర్ధారించడానికి మరియు సెన్సార్‌షిప్‌ను నిరోధించడానికి సాధారణ యంత్రాంగం [బలవంతపు లావాదేవీలు (forced transactions)](https://docs.optimism.io/stack/transactions/forced-transaction). కానీ బలవంతపు లావాదేవీలు శూన్య-జ్ఞాన నిరూపణలతో కలవవు. లావాదేవీలను ధృవీకరించగల ఏకైక ఎంటిటీ సర్వర్ మాత్రమే.

మనం బలవంతపు లావాదేవీలను అంగీకరించేందుకు `smart-contracts/src/ZkBank.sol` ని సవరించవచ్చు మరియు అవి ప్రాసెస్ అయ్యే వరకు స్థితిని మార్చకుండా సర్వర్‌ను నిరోధించవచ్చు. అయితే, ఇది డినయల్-ఆఫ్-సర్వీస్ దాడికి (denial-of-service attack) మనకు అవకాశం ఇస్తుంది. ఒకవేళ బలవంతపు లావాదేవీ చెల్లనిదైతే మరియు ప్రాసెస్ చేయడం అసాధ్యం అయితే ఏంటి పరిస్థితి?

దీనికి పరిష్కారం, బలవంతపు లావాదేవీ చెల్లదు అనడానికి శూన్య-జ్ఞాన నిరూపణ ఉండడం. ఇది సర్వర్‌కి మూడు ఆప్షన్‌లను ఇస్తుంది:

- బలవంతపు లావాదేవీని ప్రాసెస్ చేయడం, అది ప్రాసెస్ చేయబడిందని మరియు కొత్త స్థితి హాష్‌తో శూన్య-జ్ఞాన నిరూపణను అందించడం.
- బలవంతపు లావాదేవీని తిరస్కరించడం, మరియు ఆ లావాదేవీ చెల్లదు (తెలియని చిరునామా, తప్పు నాన్స్, లేదా తగినంత బ్యాలెన్స్ లేకపోవడం) అని కాంట్రాక్ట్‌కు శూన్య-జ్ఞాన నిరూపణను అందించడం.
- బలవంతపు లావాదేవీని విస్మరించడం. లావాదేవీని వాస్తవానికి ప్రాసెస్ చేసేలా సర్వర్‌ను బలవంతం చేయడానికి ఎటువంటి మార్గం లేదు, కానీ దీని అర్థం మొత్తం సిస్టమ్ అందుబాటులో ఉండదు.

#### లభ్యత బాండ్లు {#avail-bonds}

నిజ-జీవిత అమలులో, సర్వర్‌ను రన్ చేయడానికి బహుశా లాభాపేక్షతో కూడిన ఉద్దేశం ఏదైనా ఉండొచ్చు. ఒకవేళ బలవంతపు లావాదేవీ ఒక నిర్దిష్ట వ్యవధిలో ప్రాసెస్ చేయబడకపోతే ఎవరైనా దహనం (burn) చేయగల ఒక లభ్యత బాండ్‌ను సర్వర్ పోస్ట్ చేసేలా చేయడం ద్వారా మనం ఈ ప్రోత్సాహకాన్ని బలోపేతం చేయవచ్చు.

### చెడ్డ Noir కోడ్ {#bad-noir-code}

సాధారణంగా, ఒక స్మార్ట్ కాంట్రాక్ట్‌ను ప్రజలు విశ్వసించేలా చేయడానికి మనం ఒక [బ్లాక్ ఎక్స్‌ప్లోరర్‌](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)కు సోర్స్ కోడ్‌ను అప్‌లోడ్ చేస్తాము. అయితే, శూన్య-జ్ఞాన నిరూపణల విషయంలో అది సరిపోదు.

`Verifier.sol` లో వెరిఫికేషన్ కీ ఉంటుంది, ఇది Noir ప్రోగ్రామ్ యొక్క విధి (function). అయితే, ఆ కీ Noir ప్రోగ్రామ్ ఏమిటి అనే విషయాన్ని మనకు చెప్పదు. వాస్తవానికి విశ్వసనీయమైన పరిష్కారాన్ని కలిగి ఉండటానికి, మీరు Noir ప్రోగ్రామ్‌ను అప్‌లోడ్ చేయాలి (మరియు దాన్ని సృష్టించిన వెర్షన్‌ను కూడా). లేకపోతే, శూన్య-జ్ఞాన నిరూపణలు బ్యాక్ డోర్ ఉన్న వేరొక ప్రోగ్రామ్‌ను ప్రతిబింబించవచ్చు.

బ్లాక్ ఎక్స్‌ప్లోరర్‌లు Noir ప్రోగ్రామ్‌లను అప్‌లోడ్ చేయడానికి మరియు ధృవీకరించడానికి మనకు అనుమతినిచ్చే వరకు, మీరే స్వయంగా దీన్ని చేయాలి (ప్రాధాన్యతగా [IPFS](/developers/tutorials/ipfs-decentralized-ui/) కి). అప్పుడు అధునాతన వినియోగదారులు సోర్స్ కోడ్‌ను డౌన్‌లోడ్ చేసుకోగలరు, దాన్ని స్వయంగా కంపైల్ చేసుకోగలరు, `Verifier.sol` ని సృష్టించగలరు మరియు అది ఆన్‌చైన్‌లో ఉన్నదానికి సమానంగా ఉందని ధృవీకరించగలరు.

## ముగింపు {#conclusion}

ప్లాస్మా-రకం అప్లికేషన్‌లకు సమాచార నిల్వ కోసం ఒక కేంద్రీకృత భాగం అవసరం. ఇది సంభావ్య దుర్బలత్వాలకు దారి తీస్తుంది కానీ, దానికి బదులుగా, బ్లాక్‌చైన్‌లో అందుబాటులో లేని మార్గాల్లో గోప్యతను కాపాడటానికి మనకు అనుమతిస్తుంది. శూన్య-జ్ఞాన నిరూపణల ద్వారా మనం సమగ్రతను నిర్ధారించుకోవచ్చు మరియు కేంద్రీకృత భాగాన్ని ఎవరు నడుపుతున్నారో వారు లభ్యతను కొనసాగించడం ఆర్థికంగా ప్రయోజనకరంగా ఉండేలా చేయవచ్చు.

[నా ఇతర పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

## కృతజ్ఞతలు {#acknowledgements}

- జోష్ క్రైట్స్ (Josh Crites) ఈ ఆర్టికల్ డ్రాఫ్ట్‌ను చదివారు మరియు ఒక క్లిష్టమైన Noir సమస్యలో నాకు సహాయం చేసారు.

మిగిలిన ఏవైనా తప్పులకు నాదే బాధ్యత.
