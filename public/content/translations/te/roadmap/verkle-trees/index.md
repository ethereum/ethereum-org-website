---
title: వెర్కిల్ ట్రీస్
description: Verkle చెట్ల యొక్క ఉన్నత స్థాయి వివరణ మరియు Ethereumను అప్‌గ్రేడ్ చేయడానికి అవి ఎలా ఉపయోగించబడతాయి
lang: te
summaryPoints:
  - Verkle చెట్లు ఏమిటో కనుగొనండి
  - Ethereum కోసం Verkle ట్రీస్ ఎందుకు ఉపయోగకరమైన అప్‌గ్రేడ్ అని చదవండి
---

# వెర్కిల్ ట్రీస్ {#verkle-trees}

Verkle ట్రీస్ ("వెక్టార్ కమిట్‌మెంట్" మరియు "Merkle ట్రీస్" యొక్క పోర్ట్‌మాంటియో) అనేది Ethereum నోడ్‌లను అప్‌గ్రేడ్ చేయడానికి ఉపయోగించే డేటా స్ట్రక్చర్, తద్వారా బ్లాక్‌లను ధృవీకరించే సామర్థ్యాన్ని కోల్పోకుండా పెద్ద మొత్తంలో స్టేట్ డేటాను నిల్వ చేయడం ఆపివేయవచ్చు.

## స్థితిలేనితనం {#statelessness}

స్టేట్‌లెస్ Ethereum క్లయింట్‌ల మార్గంలో Verkle ట్రీస్ కీలకమైన దశ. స్టేట్‌లెస్ క్లయింట్‌లు ఇన్‌కమింగ్ బ్లాక్‌లను ధృవీకరించడానికి మొత్తం స్టేట్ డేటాబేస్‌ను నిల్వ చేయనవసరం లేదు. బ్లాక్‌లను ధృవీకరించడానికి Ethereum స్థితి యొక్క వారి స్వంత స్థానిక కాపీని ఉపయోగించకుండా, స్టేట్‌లెస్ క్లయింట్లు బ్లాక్‌తో వచ్చే రాష్ట్ర డేటాకు "సాక్షి"ని ఉపయోగిస్తారు. సాక్షి అనేది నిర్దిష్ట లావాదేవీల సెట్‌ను అమలు చేయడానికి అవసరమైన రాష్ట్ర డేటా యొక్క వ్యక్తిగత భాగాల సేకరణ మరియు సాక్షి నిజంగా పూర్తి డేటాలో భాగమని క్రిప్టోగ్రాఫిక్ రుజువు. సాక్షి రాష్ట్ర డేటాబేస్ యొక్క _బదులుగా_ ఉపయోగించబడింది. ఇది పని చేయడానికి, సాక్షులు చాలా తక్కువగా ఉండాలి, తద్వారా వాటిని 12 సెకన్ల స్లాట్‌లో ప్రాసెస్ చేయడానికి వాలిడేటర్‌ల కోసం వాటిని నెట్‌వర్క్ అంతటా సురక్షితంగా ప్రసారం చేయవచ్చు. సాక్షులు చాలా పెద్దగా ఉన్నందున ప్రస్తుత రాష్ట్ర డేటా నిర్మాణం తగినది కాదు. Verkle ట్రీస్ చిన్న సాక్షులను ప్రారంభించడం ద్వారా ఈ సమస్యను పరిష్కరిస్తాయి, స్టేట్‌లెస్ క్లయింట్‌లకు ప్రధాన అడ్డంకులలో ఒకదాన్ని తొలగిస్తాయి.

<ExpandableCard title="మనకు స్టేట్‌లెస్ క్లయింట్లు ఎందుకు కావాలి?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum క్లయింట్లు ప్రస్తుతం దాని స్టేట్ డేటాను నిల్వ చేయడానికి Patricia Merkle Trie అని పిలువబడే డేటా నిర్మాణాన్ని ఉపయోగిస్తున్నారు. వ్యక్తిగత ఖాతాల గురించిన సమాచారం ట్రైలో ఆకులుగా నిల్వ చేయబడుతుంది మరియు ఒకే హాష్ మాత్రమే మిగిలిపోయే వరకు ఆకుల జతలను పదేపదే హాష్ చేస్తారు. ఈ చివరి హాష్‌ను "రూట్" అని పిలుస్తారు. బ్లాక్‌లను ధృవీకరించడానికి, Ethereum క్లయింట్లు ఒక బ్లాక్‌లో అన్ని లావాదేవీలను అమలు చేస్తారు మరియు వారి స్థానిక స్థితిని నవీకరించండి. బ్లాక్ ప్రపోజర్ అందించిన దానితో స్థానిక చెట్టు యొక్క మూలం ఒకేలా ఉంటే బ్లాక్ చెల్లుబాటు అయ్యేదిగా పరిగణించబడుతుంది, ఎందుకంటే బ్లాక్ ప్రపోజర్ మరియు ధృవీకరించే నోడ్ చేసిన గణనలో ఏవైనా తేడాలు ఉంటే రూట్ హాష్ పూర్తిగా భిన్నంగా ఉంటుంది. దీనితో సమస్య ఏమిటంటే, బ్లాక్‌చెయిన్‌ను ధృవీకరించడానికి ప్రతి క్లయింట్ హెడ్ బ్లాక్ మరియు అనేక హిస్టారికల్ బ్లాక్‌ల కోసం మొత్తం స్టేట్ ట్రయ్‌ను నిల్వ చేయవలసి ఉంటుంది (గెత్‌లో డిఫాల్ట్ 128 బ్లాక్‌ల కోసం స్టేట్ డేటాను హెడ్ వెనుక ఉంచడం). దీనికి క్లయింట్‌లు పెద్ద మొత్తంలో డిస్క్ స్థలానికి ప్రాప్యత కలిగి ఉండాలి, ఇది చౌకైన, తక్కువ పవర్ హార్డ్‌వేర్‌పై పూర్తి నోడ్‌లను అమలు చేయడానికి అవరోధంగా ఉంటుంది. పూర్తి స్టేట్ డేటాకు బదులుగా భాగస్వామ్యం చేయగల డేటాకు చిన్న "సాక్షి"ని ఉపయోగించి సంగ్రహించబడే మరింత సమర్థవంతమైన నిర్మాణానికి (Verkle ట్రీ) స్టేట్ ట్రైను అప్‌డేట్ చేయడం దీనికి పరిష్కారం. స్టేట్ డేటాను Verkle ట్రీగా ఫార్మాట్ చేయడం స్టేట్‌లెస్ క్లయింట్‌లకు తరలించడానికి ఒక మెట్టు.

</ExpandableCard>

## సాక్షి అంటే ఏమిటి మరియు మనకు అవి ఎందుకు అవసరం? {#what-is-a-witness}

బ్లాక్‌ను ధృవీకరించడం అంటే బ్లాక్‌లో ఉన్న లావాదేవీలను మళ్ళీ అమలు చేయడం, మార్పులను Ethereum యొక్క స్థితి ప్రయత్నానికి వర్తింపజేయడం మరియు కొత్త రూట్ హాష్‌ను లెక్కించడం. వెరిఫైడ్ బ్లాక్ అంటే బ్లాక్‌తో అందించబడిన గణిత స్టేట్ రూట్ హాష్ అదే విధంగా ఉంటుంది (ఎందుకంటే బ్లాక్ ప్రపోజర్ వారు చెప్పిన గణనను నిజంగా చేసారని దీని అర్థం). నేటి Ethereum క్లయింట్‌లలో, రాష్ట్రాన్ని అప్‌డేట్ చేయడానికి మొత్తం స్టేట్ ట్రైకు యాక్సెస్ అవసరం, ఇది స్థానికంగా నిల్వ చేయబడే పెద్ద డేటా నిర్మాణం. సాక్షి బ్లాక్‌లో లావాదేవీలను అమలు చేయడానికి అవసరమైన రాష్ట్ర డేటా యొక్క శకలాలు మాత్రమే కలిగి ఉంటుంది. బ్లాక్ ప్రపోజర్ బ్లాక్ లావాదేవీలను అమలు చేసారని మరియు స్థితిని సరిగ్గా అప్‌డేట్ చేశారని ధృవీకరించడానికి ఒక వాలిడేటర్ ఆ శకలాలను మాత్రమే ఉపయోగించగలరు. ఏదేమైనప్పటికీ, ప్రతి నోడ్ ద్వారా 12 సెకనుల స్లాట్‌లో సురక్షితంగా స్వీకరించడానికి మరియు ప్రాసెస్ చేయడానికి తగినంత వేగంగా Ethereum నెట్‌వర్క్‌లోని పీర్‌ల మధ్య సాక్షి బదిలీ చేయబడాలని దీని అర్థం. సాక్షి చాలా పెద్దదైతే, కొన్ని నోడ్‌లను డౌన్‌లోడ్ చేయడానికి మరియు చెయిన్‌ను కొనసాగించడానికి చాలా సమయం పట్టవచ్చు. ఇది కేంద్రీకృత శక్తి, ఎందుకంటే వేగవంతమైన ఇంటర్నెట్ కనెక్షన్‌లు ఉన్న నోడ్‌లు మాత్రమే బ్లాక్‌లను ధృవీకరించడంలో పాల్గొనగలవు. Verkle ట్రీస్‌తో మీ హార్డ్ డ్రైవ్‌లో స్టేట్‌ను స్టోర్ చేయాల్సిన అవసరం లేదు; _ప్రతిదీ_ మీరు బ్లాక్‌లోనే బ్లాక్‌ను కలిగి ఉందని ధృవీకరించాలి. దురదృష్టవశాత్తూ, Merkle ట్రైస్ నుండి ఉత్పత్తి చేయగల సాక్షులు స్టేట్‌లెస్ క్లయింట్‌లకు మద్దతు ఇవ్వడానికి చాలా పెద్దవి.

## Verkle ట్రీస్‌ చిన్న సాక్షులను ఎందుకు ఎనేబుల్ చేస్తాయి? {#why-do-verkle-trees-enable-smaller-witnesses}

Merkle ట్రై యొక్క నిర్మాణం సాక్షి పరిమాణాలను చాలా పెద్దదిగా చేస్తుంది - 12 సెకన్ల స్లాట్‌లో సహచరుల మధ్య సురక్షితంగా ప్రసారం చేయడానికి చాలా పెద్దది. సాక్షి అనేది ఆకులలో ఉంచబడిన డేటాను రూట్ హాష్‌కు కనెక్ట్ చేసే మార్గం. డేటాను ధృవీకరించడానికి ప్రతి ఆకును రూట్‌కు కనెక్ట్ చేసే అన్ని ఇంటర్మీడియట్ హాష్‌లను మాత్రమే కాకుండా, అన్ని "సిబ్లింగ్" నోడ్‌లను కూడా కలిగి ఉండటం అవసరం. ప్రూఫ్‌లోని ప్రతి నోడ్‌కు ఒక సిబ్లింగ్ ఉంది, అది ట్రై అప్ తదుపరి హ్యాష్‌ను సృష్టించడానికి హ్యాష్ చేయబడింది. ఇది చాలా డేటా. Verkle ట్రీస్, ట్రీ యొక్క ఆకులు మరియు దాని మూలాల మధ్య దూరాన్ని తగ్గించడం ద్వారా సాక్షి పరిమాణాన్ని తగ్గిస్తాయి మరియు రూట్ హాష్‌ను ధృవీకరించడానికి తోబుట్టువుల నోడ్‌లను అందించాల్సిన అవసరాన్ని కూడా తొలగిస్తాయి. హాష్-శైలి వెక్టర్ కమిట్‌మెంట్‌కు బదులుగా శక్తివంతమైన బహుపది కమిట్‌మెంట్ స్కీమ్‌ను ఉపయోగించడం ద్వారా మరింత స్థల సామర్థ్యం పొందబడుతుంది. బహుపది నిబద్ధత సాక్షిని నిరూపించే ఆకుల సంఖ్యతో సంబంధం లేకుండా స్థిర పరిమాణాన్ని కలిగి ఉండటానికి అనుమతిస్తుంది.

బహుపది నిబద్ధత పథకం క్రింద, సాక్షులు నిర్వహించదగిన పరిమాణాలను కలిగి ఉంటారు, వాటిని పీర్-టు-పీర్ నెట్‌వర్క్‌లో సులభంగా బదిలీ చేయవచ్చు. ఇది క్లయింట్‌లు ప్రతి బ్లాక్‌లోని రాష్ట్ర మార్పులను కనీస మొత్తంలో డేటాతో ధృవీకరించడానికి అనుమతిస్తుంది.

<ExpandableCard title="Verkle ట్రీస్ సాక్షి పరిమాణాన్ని ఖచ్చితంగా ఎంత తగ్గించగలవు?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

సాక్షి పరిమాణం అది కలిగి ఉన్న ఆకుల సంఖ్యపై ఆధారపడి ఉంటుంది. సాక్షి 1000 ఆకులలను కవర్ చేస్తుందని ఊహిస్తే, Merkle ట్రై కోసం సాక్షి దాదాపు 3.5MB ఉంటుంది (ట్రైకు 7 లెవెల్స్ అని ఊహిస్తే). Verkle ట్రీలో (ట్రీకి 4 స్థాయిలు అని ఊహిస్తే) అదే డేటా కోసం సాక్షి 150 kB - **దాదాపు 23x చిన్నది** ఉంటుంది. సాక్షి పరిమాణంలో ఈ తగ్గింపు స్థితిలేని క్లయింట్ సాక్షులు ఆమోదయోగ్యంగా తక్కువగా ఉండటానికి అనుమతిస్తుంది. బహుపది సాక్షులు 0.128 -1 kB నిర్దిష్ట బహుపది నిబద్ధత ఉపయోగించబడుతుంది.

</ExpandableCard>

## మెర్కిల్ చెట్టు యొక్క నిర్మాణం ఏమిటి? {#what-is-the-structure-of-a-verkle-tree}

వెర్కిల్ ట్రీలు `(కీ,విలువ)` జతలుగా ఉంటాయి, ఇక్కడ కీలు 31-బైట్ _స్టెమ్_ మరియు ఒకే బైట్ _ప్రత్యయం_తో కూడిన 32-బైట్ మూలకాలు. ఈ కీలు _పొడిగింపు_ నోడ్‌లు మరియు _లోపలి_ నోడ్‌లుగా నిర్వహించబడతాయి. ఎక్స్‌టెన్షన్ నోడ్‌లు వేర్వేరు ప్రత్యయాలతో 256 మంది పిల్లలకు ఒకే కాండంను సూచిస్తాయి. ఇన్నర్ నోడ్‌లలో కూడా 256 మంది పిల్లలు ఉన్నారు, కానీ అవి ఇతర ఎక్స్‌టెన్షన్ నోడ్‌లు కావచ్చు. Verkle ట్రీ మరియు Merkle ట్రీ స్ట్రక్చర్ మధ్య ఉన్న ప్రధాన వ్యత్యాసం ఏమిటంటే, Verkle ట్రీ చాలా చదునుగా ఉంటుంది, అంటే ఆకును రూట్‌కు లింక్ చేసే ఇంటర్మీడియట్ నోడ్‌లు తక్కువగా ఉంటాయి మరియు అందువల్ల రుజువును రూపొందించడానికి తక్కువ డేటా అవసరం.

![](./verkle.png)

[Verkle ట్రీ నిర్మాణం గురించి మరింత చదవండి](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## ప్రస్తుత పురోగతి {#current-progress}

Verkle ట్రీ టెస్ట్‌నెట్‌లు ఇప్పటికే అందుబాటులో ఉన్నాయి మరియు అమలులో ఉన్నాయి, అయితే Verkle ట్రీలకు మద్దతు ఇవ్వడానికి అవసరమైన క్లయింట్‌లకు ఇంకా గణనీయమైన అత్యుత్తమ అప్‌డేట్‌లు ఉన్నాయి. You can help accelerate progress by deploying contracts to the testnets or running testnet clients.

[Verkle Gen Devnet 2 testnetను అన్వేషించండి](https://verkle-gen-devnet-2.ethpandaops.io/)

[Guillaume Ballet Condrieu Verkle testnet వివరిస్తున్నట్లు చూడండి](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (Condrieu testnet ప్రూఫ్-ఆఫ్-వర్క్ మరియు ఇప్పుడు Verkle Gen Devnet 2 testnet ద్వారా భర్తీ చేయబడిందని గమనించండి).

## Further reading {#further-reading}

- [స్థితిలేనితనం కోసం Verkle ట్రీస్](https://verkle.info/)
- [Dankrad Feist PEEPanEIPలో Verkle ట్రీస్ వివరిస్తుంది](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume బ్యాలెట్ ETHGlobal వద్ద Verkle ట్రీస్ వివరిస్తుంది](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [డెవ్‌కాన్ 6లో గుయిలౌమ్ బ్యాలెట్ ద్వారా "Verkle ట్రీస్ మేక్ Ethereum లీన్ అండ్ మీన్"](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [ETHDenver 2020 నుండి స్టేట్‌లెస్ క్లయింట్‌లపై Piper Merriam](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [జీరో నాలెడ్జ్ పాడ్‌క్యాస్ట్‌లో Verkle ట్రీస్ మరియు స్టేట్‌లెస్‌నెస్‌ను Dankrad Fiest వివరిస్తుంది](https://zeroknowledge.fm/podcast/202/)
- [Verkle ట్రీస్‌పై Vitalik Buterin](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Verkle ట్రీస్‌పై Dankrad Feist](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Verkle ట్రీ EIP డాక్యుమెంటేషన్](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
