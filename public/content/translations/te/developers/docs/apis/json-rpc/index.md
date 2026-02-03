---
title: JSON-RPC ఎపిఐ
description: ఇతీరియము క్లయింట్ల కోసం ఒక స్టేట్‌లెస్, తేలికైన రిమోట్ ప్రొసీజర్ కాల్ (RPC) ప్రోటోకాల్.
lang: te
---

ఒక సాఫ్ట్‌వేర్ అప్లికేషన్ ఇతీరియము బ్లాక్‌చెయిన్‌తో పరస్పరం చర్య జరపడానికి - బ్లాక్‌చెయిన్ డేటాను చదవడం ద్వారా లేదా నెట్‌వర్క్‌కు లావాదేవీలను పంపడం ద్వారా - ఇది తప్పనిసరిగా ఇతీరియము నోడ్‌కు కనెక్ట్ అవ్వాలి.

ఈ ప్రయోజనం కోసం, ప్రతి [ఇతీరియము క్లయింట్](/developers/docs/nodes-and-clients/#execution-clients) ఒక [JSON-RPC స్పెసిఫికేషన్‌ను](https://github.com/ethereum/execution-apis) అమలు చేస్తుంది, కాబట్టి నిర్దిష్ట నోడ్ లేదా క్లయింట్ అమలుతో సంబంధం లేకుండా అప్లికేషన్‌లు ఆధారపడగల పద్ధతుల యొక్క ఏకరీతి సెట్ ఉంది.

[JSON-RPC](https://www.jsonrpc.org/specification) ఒక స్టేట్‌లెస్, తేలికైన రిమోట్ ప్రొసీజర్ కాల్ (RPC) ప్రోటోకాల్. ఇది అనేక డేటా స్ట్రక్చర్‌లను మరియు వాటి ప్రాసెసింగ్ చుట్టూ ఉన్న నియమాలను నిర్వచిస్తుంది. ఇది ట్రాన్స్‌పోర్ట్ అజ్ఞేయవాది, దీనిలో భావనలను ఒకే ప్రక్రియలో, సాకెట్‌ల ద్వారా, HTTP ద్వారా లేదా అనేక రకాల మెసేజ్ పాసింగ్ వాతావరణాలలో ఉపయోగించవచ్చు. ఇది JSON (RFC 4627)ని డేటా ఫార్మాట్‌గా ఉపయోగిస్తుంది.

## క్లయింట్ అమలులు {#client-implementations}

JSON-RPC స్పెసిఫికేషన్‌ను అమలు చేసేటప్పుడు ఇతీరియము క్లయింట్లు ప్రతి ఒక్కరూ విభిన్న ప్రోగ్రామింగ్ భాషలను ఉపయోగించుకోవచ్చు. నిర్దిష్ట ప్రోగ్రామింగ్ భాషలకు సంబంధించిన మరిన్ని వివరాల కోసం వ్యక్తిగత [క్లయింట్ డాక్యుమెంటేషన్‌ను](/developers/docs/nodes-and-clients/#execution-clients) చూడండి. తాజా ఎపిఐ మద్దతు సమాచారం కోసం ప్రతి క్లయింట్ యొక్క డాక్యుమెంటేషన్‌ను తనిఖీ చేయాలని మేము సిఫార్సు చేస్తున్నాము.

## సౌకర్యవంతమైన లైబ్రరీలు {#convenience-libraries}

మీరు JSON-RPC ఎపిఐ ద్వారా నేరుగా ఇతీరియము క్లయింట్లతో ఇంటరాక్ట్ అవ్వాలని ఎంచుకోవచ్చు, కానీ డాప్ డెవలపర్‌లకు తరచుగా సులభమైన ఎంపికలు ఉన్నాయి. JSON-RPC ఎపిఐ పైన వ్రాపర్‌లను అందించడానికి అనేక [JavaScript](/developers/docs/apis/javascript/#available-libraries) మరియు [బ్యాకెండ్ API](/developers/docs/apis/backend/#available-libraries) లైబ్రరీలు ఉన్నాయి. ఈ లైబ్రరీలతో, డెవలపర్‌లు ఇతీరియముతో పరస్పర చర్య జరిపే JSON-RPC అభ్యర్థనలను (తెర వెనుక) ప్రారంభించడానికి వారు ఎంచుకున్న ప్రోగ్రామింగ్ భాషలో సహజమైన, ఒక-లైన్ పద్ధతులను వ్రాయగలరు.

## ఏకాభిప్రాయం క్లయింట్ ఎపిఐలు {#consensus-clients}

ఈ పేజీ ప్రధానంగా ఇతీరియము ఎగ్జిక్యూషన్ క్లయింట్లు ఉపయోగించే JSON-RPC ఎపిఐతో వ్యవహరిస్తుంది. అయితే, ఏకాభిప్రాయం క్లయింట్లకు RPC ఎపిఐ కూడా ఉంది, ఇది వినియోగదారులను నోడ్ గురించి సమాచారాన్ని ప్రశ్నించడానికి, బీకాన్ బ్లాక్‌లు, బీకాన్ స్థితి మరియు ఇతర ఏకాభిప్రాయం-సంబంధిత సమాచారాన్ని నేరుగా నోడ్ నుండి అభ్యర్థించడానికి అనుమతిస్తుంది. ఈ ఎపిఐ [బీకాన్ ఎపిఐ వెబ్‌పేజీ](https://ethereum.github.io/beacon-APIs/#/)లో డాక్యుమెంట్ చేయబడింది.

ఒక నోడ్‌లోని ఇంటర్-క్లయింట్ కమ్యూనికేషన్ కోసం అంతర్గత ఎపిఐ కూడా ఉపయోగించబడుతుంది - అంటే, ఇది ఏకాభిప్రాయం క్లయింట్ మరియు ఎగ్జిక్యూషన్ క్లయింట్ డేటాను మార్పిడి చేయడానికి వీలు కల్పిస్తుంది. దీనిని 'ఇంజిన్ ఎపిఐ' అని పిలుస్తారు మరియు స్పెక్స్ [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)లో అందుబాటులో ఉన్నాయి.

## ఎగ్జిక్యూషన్ క్లయింట్ స్పెక్ {#spec}

[GitHubలో పూర్తి JSON-RPC ఎపిఐ స్పెక్ చదవండి](https://github.com/ethereum/execution-apis). ఈ ఎపిఐ [ఎగ్జిక్యూషన్ ఎపిఐ వెబ్‌పేజీ](https://ethereum.github.io/execution-apis/)లో డాక్యుమెంట్ చేయబడింది మరియు అందుబాటులో ఉన్న అన్ని పద్ధతులను ప్రయత్నించడానికి ఒక ఇన్‌స్పెక్టర్‌ను కలిగి ఉంటుంది.

## నియమాలు {#conventions}

### హెక్స్ విలువ ఎన్‌కోడింగ్ {#hex-encoding}

రెండు కీ డేటా రకాలు JSON ద్వారా పంపబడతాయి: ఫార్మాట్ చేయని బైట్ శ్రేణులు మరియు పరిమాణాలు. రెండూ హెక్స్ ఎన్‌కోడింగ్‌తో పంపబడతాయి కానీ ఫార్మాటింగ్ కోసం విభిన్న అవసరాలతో ఉంటాయి.

#### పరిమాణాలు {#quantities-encoding}

పరిమాణాలను (పూర్ణాంకాలు, సంఖ్యలు) ఎన్‌కోడ్ చేస్తున్నప్పుడు: హెక్స్‌గా ఎన్‌కోడ్ చేయండి, "0x"తో ప్రిఫిక్స్ చేయండి, అత్యంత కాంపాక్ట్ ప్రాతినిధ్యం (చిన్న మినహాయింపు: సున్నాని "0x0"గా సూచించాలి).

ఇక్కడ కొన్ని ఉదాహరణలు ఉన్నాయి:

- 0x41 (దశాంశంలో 65)
- 0x400 (దశాంశంలో 1024)
- తప్పు: 0x (ఎల్లప్పుడూ కనీసం ఒక అంకె ఉండాలి - సున్నా "0x0")
- తప్పు: 0x0400 (ముందు సున్నాలు అనుమతించబడవు)
- తప్పు: ff (0x ప్రిఫిక్స్ చేయాలి)

### ఫార్మాట్ చేయని డేటా {#unformatted-data-encoding}

ఫార్మాట్ చేయని డేటాను (బైట్ శ్రేణులు, ఖాతా చిరునామాలు, హాష్‌లు, బైట్‌కోడ్ శ్రేణులు) ఎన్‌కోడ్ చేస్తున్నప్పుడు: హెక్స్‌గా ఎన్‌కోడ్ చేయండి, "0x"తో ప్రిఫిక్స్ చేయండి, ప్రతి బైట్‌కు రెండు హెక్స్ అంకెలు.

ఇక్కడ కొన్ని ఉదాహరణలు ఉన్నాయి:

- 0x41 (పరిమాణం 1, "A")
- 0x004200 (పరిమాణం 3, "0B0")
- 0x (పరిమాణం 0, "")
- తప్పు: 0xf0f0f (సరి సంఖ్యలో అంకెలు ఉండాలి)
- తప్పు: 004200 (0x ప్రిఫిక్స్ చేయాలి)

### బ్లాక్ పారామీటర్ {#block-parameter}

కింది పద్ధతులు బ్లాక్ పారామీటర్‌ను కలిగి ఉంటాయి:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

ఇతీరియము స్థితిని ప్రశ్నించే అభ్యర్థనలు చేసినప్పుడు, అందించిన బ్లాక్ పారామీటర్ బ్లాక్ యొక్క ఎత్తును నిర్ధారిస్తుంది.

బ్లాక్ పారామీటర్ కోసం కింది ఎంపికలు సాధ్యమవుతాయి:

- `HEX స్ట్రింగ్` - ఒక పూర్ణాంక బ్లాక్ సంఖ్య
- తొలి/జన్మ బ్లాక్ కోసం `స్ట్రింగ్ "earliest"`
- తాజా ప్రతిపాదిత బ్లాక్ కోసం `స్ట్రింగ్ "latest"`
- తాజా సురక్షిత హెడ్ బ్లాక్ కోసం `స్ట్రింగ్ "safe"`
- తాజా ఖరారు చేయబడిన బ్లాక్ కోసం `స్ట్రింగ్ "finalized"`
- పెండింగ్‌లో ఉన్న స్థితి/లావాదేవీల కోసం `స్ట్రింగ్ "pending"`

## ఉదాహరణలు

ఈ పేజీలో మేము కమాండ్ లైన్ ఉపకరణం, [curl](https://curl.se) ఉపయోగించి వ్యక్తిగత JSON_RPC ఎపిఐ ఎండ్‌పాయింట్‌లను ఎలా ఉపయోగించాలో ఉదాహరణలు అందిస్తాము. ఈ వ్యక్తిగత ఎండ్‌పాయింట్ ఉదాహరణలు కింద [Curl ఉదాహరణలు](#curl-examples) విభాగంలో కనుగొనబడ్డాయి. పేజీలో మరింత కింద, గెత్ నోడ్, JSON_RPC ఎపిఐ మరియు curl ఉపయోగించి ఒక స్మార్ట్ కాంట్రాక్ట్‌ను కంపైల్ చేయడం మరియు డిప్లాయ్ చేయడం కోసం మేము ఒక [ఎండ్-టు-ఎండ్ ఉదాహరణను](#usage-example) కూడా అందిస్తాము.

## Curl ఉదాహరణలు {#curl-examples}

ఒక ఇతీరియము నోడ్‌కు [curl](https://curl.se) అభ్యర్థనలు చేయడం ద్వారా JSON_RPC ఎపిఐని ఉపయోగించడం యొక్క ఉదాహరణలు కింద అందించబడ్డాయి. ప్రతి ఉదాహరణ
నిర్దిష్ట ఎండ్‌పాయింట్ యొక్క వివరణ, దాని పారామీటర్లు, రిటర్న్ రకం మరియు దానిని ఎలా ఉపయోగించాలో ఒక పని చేసిన ఉదాహరణను కలిగి ఉంటుంది.

curl అభ్యర్థనలు కంటెంట్ రకానికి సంబంధించి ఒక దోష మెసేజ్‌ను తిరిగి ఇవ్వవచ్చు. ఎందుకంటే `--data` ఎంపిక కంటెంట్ రకాన్ని `application/x-www-form-urlencoded`కి సెట్ చేస్తుంది. మీ నోడ్ దీని గురించి ఫిర్యాదు చేస్తే, కాల్ ప్రారంభంలో `-H "Content-Type: application/json"` ఉంచడం ద్వారా హెడర్‌ను మాన్యువల్‌గా సెట్ చేయండి. ఉదాహరణలలో URL/IP & పోర్ట్ కలయిక కూడా ఉండదు, ఇది curlకి ఇవ్వవలసిన చివరి ఆర్గ్యుమెంట్ అయి ఉండాలి (ఉదాహరణకు, `127.0.0.1:8545`). ఈ అదనపు డేటాను కలిగి ఉన్న పూర్తి curl అభ్యర్థన కింది రూపాన్ని తీసుకుంటుంది:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## గాసిప్, స్థితి, చరిత్ర {#gossip-state-history}

కొన్ని ప్రధాన JSON-RPC పద్ధతులకు ఇతీరియము నెట్‌వర్క్ నుండి డేటా అవసరం, మరియు అవి మూడు ప్రధాన వర్గాలుగా చక్కగా విభజించబడ్డాయి: _గాసిప్, స్థితి, మరియు చరిత్ర_. ప్రతి పద్ధతికి వెళ్లడానికి ఈ విభాగాల్లోని లింక్‌లను ఉపయోగించండి, లేదా పద్ధతుల పూర్తి జాబితాను అన్వేషించడానికి విషయ సూచికను ఉపయోగించండి.

### గాసిప్ పద్ధతులు {#gossip-methods}

> ఈ పద్ధతులు చైన్ యొక్క హెడ్‌ను ట్రాక్ చేస్తాయి. ఈ విధంగా లావాదేవీలు నెట్‌వర్క్ చుట్టూ తిరుగుతాయి, బ్లాక్‌లలోకి తమ మార్గాన్ని కనుగొంటాయి మరియు కొత్త బ్లాక్‌ల గురించి క్లయింట్లు ఎలా తెలుసుకుంటారో ఇది చూపిస్తుంది.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### స్థితి పద్ధతులు {#state_methods}

> నిల్వ చేయబడిన మొత్తం డేటా యొక్క ప్రస్తుత స్థితిని నివేదించే పద్ధతులు. "స్థితి" అనేది ఒక పెద్ద షేర్డ్ RAM ముక్క లాంటిది, మరియు ఖాతా బ్యాలెన్స్‌లు, కాంట్రాక్ట్ డేటా మరియు గ్యాస్ అంచనాలను కలిగి ఉంటుంది.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### చరిత్ర పద్ధతులు {#history_methods}

> జన్మ వరకు ప్రతి బ్లాక్ యొక్క చారిత్రక రికార్డులను పొందుతుంది. ఇది ఒక పెద్ద అనుబంధ-మాత్రమే ఫైల్ లాంటిది, మరియు అన్ని బ్లాక్ హెడర్‌లు, బ్లాక్ బాడీలు, అంకుల్ బ్లాక్‌లు మరియు లావాదేవీల రశీదులను కలిగి ఉంటుంది.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC ఎపిఐ ప్లేగ్రౌండ్

మీరు ఎపిఐ పద్ధతులను కనుగొనడానికి మరియు ప్రయత్నించడానికి [ప్లేగ్రౌండ్ ఉపకరణం](https://ethereum-json-rpc.com) ఉపయోగించవచ్చు. వివిధ నోడ్ ప్రొవైడర్ల ద్వారా ఏ పద్ధతులు మరియు నెట్‌వర్క్‌లకు మద్దతు ఉందో కూడా ఇది మీకు చూపిస్తుంది.

## JSON-RPC ఎపిఐ పద్ధతులు {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

ప్రస్తుత క్లయింట్ వెర్షన్‌ను తిరిగి ఇస్తుంది.

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`స్ట్రింగ్` - ప్రస్తుత క్లయింట్ వెర్షన్

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// ఫలితం
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

ఇచ్చిన డేటా యొక్క కెకాక్-256 (ప్రమాణీకరించబడిన SHA3-256 _కాదు_) ని తిరిగి ఇస్తుంది.

**పారామితులు**

1. `DATA` - SHA3 హాష్‌గా మార్చవలసిన డేటా

```js
params: ["0x68656c6c6f20776f726c64"]
```

**తిరిగి ఇస్తుంది**

`DATA` - ఇచ్చిన స్ట్రింగ్ యొక్క SHA3 ఫలితం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// ఫలితం
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

ప్రస్తుత నెట్‌వర్క్ ఐడిని తిరిగి ఇస్తుంది.

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`స్ట్రింగ్` - ప్రస్తుత నెట్‌వర్క్ ఐడి.

ప్రస్తుత నెట్‌వర్క్ IDల పూర్తి జాబితా [chainlist.org](https://chainlist.org)లో అందుబాటులో ఉంది. కొన్ని సాధారణమైనవి:

- `1`: ఇతీరియము మెయిన్‌నెట్
- `11155111`: సెపోలియా టెస్టునెట్
- `560048` : Hoodi టెస్టునెట్

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// ఫలితం
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

క్లయింట్ నెట్‌వర్క్ కనెక్షన్‌ల కోసం చురుకుగా వింటున్నట్లయితే `true`ని తిరిగి ఇస్తుంది.

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`బూలియన్` - వింటున్నప్పుడు `true`, లేకపోతే `false`.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// ఫలితం
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

ప్రస్తుతం క్లయింట్‌కు కనెక్ట్ చేయబడిన పీర్‌ల సంఖ్యను తిరిగి ఇస్తుంది.

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`QUANTITY` - కనెక్ట్ చేయబడిన పీర్‌ల సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// ఫలితం
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

ప్రస్తుత ఇతీరియము ప్రోటోకాల్ వెర్షన్‌ను తిరిగి ఇస్తుంది. ఈ పద్ధతి [Gethలో అందుబాటులో లేదని](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) గమనించండి.

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`స్ట్రింగ్` - ప్రస్తుత ఇతీరియము ప్రోటోకాల్ వెర్షన్

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// ఫలితం
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

సమకాలీకరణ స్థితి లేదా `false` గురించి డేటాతో ఒక ఆబ్జెక్ట్‌ను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

ఖచ్చితమైన రిటర్న్ డేటా క్లయింట్ అమలుల మధ్య మారుతుంది. నోడ్ సింక్ కానప్పుడు అన్ని క్లయింట్లు `False`ని తిరిగి ఇస్తాయి మరియు అన్ని క్లయింట్లు కింది ఫీల్డ్‌లను తిరిగి ఇస్తాయి.

`ఆబ్జెక్ట్|బూలియన్`, సింక్ స్థితి డేటాతో కూడిన ఆబ్జెక్ట్ లేదా సింక్ కానప్పుడు `FALSE`:

- `startingBlock`: `QUANTITY` - దిగుమతి ప్రారంభమైన బ్లాక్ (సింక్ దాని తలకి చేరుకున్న తర్వాత మాత్రమే రీసెట్ చేయబడుతుంది)
- `currentBlock`: `QUANTITY` - ప్రస్తుత బ్లాక్, eth_blockNumber వలె ఉంటుంది
- `highestBlock`: `QUANTITY` - అంచనా వేయబడిన అత్యధిక బ్లాక్

అయితే, వ్యక్తిగత క్లయింట్లు అదనపు డేటాను కూడా అందించవచ్చు. ఉదాహరణకు గెత్ కింది వాటిని తిరిగి ఇస్తుంది:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

అయితే బేసు ఇలా అందిస్తుంది:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

మరిన్ని వివరాల కోసం మీ నిర్దిష్ట క్లయింట్ యొక్క డాక్యుమెంటేషన్‌ను చూడండి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// లేదా సింక్ కానప్పుడు
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

క్లయింట్ కాయిన్‌బేస్ చిరునామాను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

> **గమనిక:** ఈ పద్ధతి **v1.14.0** నాటికి నిలిపివేయబడింది మరియు ఇకపై మద్దతు ఇవ్వబడదు. ఈ పద్ధతిని ఉపయోగించడానికి ప్రయత్నిస్తే "పద్ధతికి మద్దతు లేదు" అనే లోపం వస్తుంది.

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`DATA`, 20 బైట్లు - ప్రస్తుత కాయిన్‌బేస్ చిరునామా.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// ఫలితం
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

రీప్లే-రక్షిత లావాదేవీలపై సంతకం చేయడానికి ఉపయోగించే చైన్ IDని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`chainId`, ప్రస్తుత చైన్ ఐడి యొక్క పూర్ణాంకాన్ని సూచించే స్ట్రింగ్‌గా హెక్సాడెసిమల్ విలువ.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// ఫలితం
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

క్లయింట్ చురుకుగా కొత్త బ్లాక్‌లను మైనింగ్ చేస్తుంటే `true` అని ఇస్తుంది. ఇది ప్రూఫ్-ఆఫ్-వర్క్ నెట్‌వర్క్‌ల కోసం మాత్రమే `true`ని అందించగలదు మరియు [ది మెర్జ్](/roadmap/merge/) నుండి కొన్ని క్లయింట్‌లలో అందుబాటులో ఉండకపోవచ్చు.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`బూలియన్` - క్లయింట్ మైనింగ్ చేస్తుంటే `true` అని, లేకపోతే `false` అని అందిస్తుంది.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

నోడ్ మైనింగ్ చేస్తున్న సెకనుకు హాష్‌ల సంఖ్యను అందిస్తుంది. ఇది ప్రూఫ్-ఆఫ్-వర్క్ నెట్‌వర్క్‌ల కోసం మాత్రమే `true`ని అందించగలదు మరియు [ది మెర్జ్](/roadmap/merge/) నుండి కొన్ని క్లయింట్‌లలో అందుబాటులో ఉండకపోవచ్చు.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`QUANTITY` - సెకనుకు హాష్‌ల సంఖ్య.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// ఫలితం
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

వైలో ప్రతి గ్యాస్‌కు ప్రస్తుత ధర యొక్క అంచనాను అందిస్తుంది. ఉదాహరణకు, Besu క్లయింట్ చివరి 100 బ్లాక్‌లను పరిశీలిస్తుంది మరియు డిఫాల్ట్‌గా మధ్యస్థ గ్యాస్ యూనిట్ ధరను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`QUANTITY` - వైలో ప్రస్తుత గ్యాస్ ధర యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// ఫలితం
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

క్లయింట్ యాజమాన్యంలోని చిరునామాల జాబితాను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`డేటా శ్రేణి`, 20 బైట్లు - క్లయింట్ యాజమాన్యంలోని చిరునామాలు.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

అత్యంత ఇటీవలి బ్లాక్ యొక్క సంఖ్యను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏదీ లేదు

**తిరిగి ఇస్తుంది**

`QUANTITY` - క్లయింట్ ఉన్న ప్రస్తుత బ్లాక్ సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// ఫలితం
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

ఇచ్చిన చిరునామాలోని ఖాతా యొక్క బ్యాలెన్స్‌ను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్లు - బ్యాలెన్స్ కోసం తనిఖీ చేయవలసిన చిరునామా.
2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"`, లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**తిరిగి ఇస్తుంది**

`QUANTITY` - వైలో ప్రస్తుత బ్యాలెన్స్ యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

ఇచ్చిన చిరునామా వద్ద నిల్వ స్థానం నుండి విలువను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్లు - నిల్వ యొక్క చిరునామా.
2. `QUANTITY` - నిల్వలోని స్థానం యొక్క పూర్ణాంకం.
3. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

**తిరిగి ఇస్తుంది**

`DATA` - ఈ నిల్వ స్థానంలోని విలువ.

**ఉదాహరణ**
సరైన స్థానాన్ని గణించడం తిరిగి పొందవలసిన నిల్వపై ఆధారపడి ఉంటుంది. చిరునామా `0x391694e7e0b0cce554cb130d723a9d27458f9298` ద్వారా `0x295a70b2de5e3953354a6a8344e616ed314d7251` వద్ద డిప్లాయ్ చేయబడిన కింది కాంట్రాక్ట్‌ను పరిగణించండి.

```
కాంట్రాక్ట్ నిల్వ {
    uint pos0;
    మ్యాపింగ్(చిరునామా => uint) pos1;
    నిర్మాత() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

pos0 విలువను తిరిగి పొందడం చాలా సులభం:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

మ్యాప్ యొక్క మూలకాన్ని తిరిగి పొందడం కష్టం. మ్యాప్‌లోని ఒక మూలకం యొక్క స్థానం దీనితో లెక్కించబడుతుంది:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]లో నిల్వను తిరిగి పొందడానికి మనం స్థానాన్ని దీనితో లెక్కించాలి:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

గణన చేయడానికి వెబ్3 లైబ్రరీతో వచ్చే గెత్ కన్సోల్‌ను ఉపయోగించవచ్చు:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

ఇప్పుడు నిల్వను పొందడానికి:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

ఒక చిరునామా నుండి _పంపిన_ లావాదేవీల సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్లు - చిరునామా.
2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // తాజా బ్లాక్‌ వద్ద స్థితి
]
```

**తిరిగి ఇస్తుంది**

`QUANTITY` - ఈ చిరునామా నుండి పంపిన లావాదేవీల సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

ఇచ్చిన బ్లాక్ హాష్‌తో సరిపోలే బ్లాక్ నుండి ఒక బ్లాక్‌లోని లావాదేవీల సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక బ్లాక్ యొక్క హాష్

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**తిరిగి ఇస్తుంది**

`QUANTITY` - ఈ బ్లాక్‌లోని లావాదేవీల సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

ఇచ్చిన బ్లాక్ సంఖ్యతో సరిపోలే బ్లాక్‌లోని లావాదేవీల సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ సంఖ్య యొక్క పూర్ణాంకం, లేదా `"earliest"`, `"latest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter)లో వలె.

```js
params: [
  "0x13738ca", // 20396234
]
```

**తిరిగి ఇస్తుంది**

`QUANTITY` - ఈ బ్లాక్‌లోని లావాదేవీల సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

ఇచ్చిన బ్లాక్ హాష్‌తో సరిపోలే బ్లాక్ నుండి ఒక బ్లాక్‌లోని అంకుల్స్ సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక బ్లాక్ యొక్క హాష్

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**తిరిగి ఇస్తుంది**

`QUANTITY` - ఈ బ్లాక్‌లోని అంకుల్స్ సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

ఇచ్చిన బ్లాక్ సంఖ్యతో సరిపోలే బ్లాక్ నుండి ఒక బ్లాక్‌లోని అంకుల్స్ సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ సంఖ్య యొక్క పూర్ణాంకం, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

```js
params: [
  "0xe8", // 232
]
```

**తిరిగి ఇస్తుంది**

`QUANTITY` - ఈ బ్లాక్‌లోని అంకుల్స్ సంఖ్య యొక్క పూర్ణాంకం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

ఇచ్చిన చిరునామా వద్ద సంకేత భాషను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్లు - చిరునామా
2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**తిరిగి ఇస్తుంది**

`DATA` - ఇచ్చిన చిరునామా నుండి సంకేత భాష.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

సైన్ పద్ధతి `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`తో ఒక ఇతీరియము నిర్దిష్ట సంతకాన్ని లెక్కిస్తుంది.

మెసేజ్‌కు ఒక ప్రిఫిక్స్‌ను జోడించడం ద్వారా, లెక్కించబడిన సంతకం ఒక ఇతీరియము నిర్దిష్ట సంతకంగా గుర్తించబడుతుంది. ఇది దుర్వినియోగాన్ని నివారిస్తుంది, ఇక్కడ ఒక హానికరమైన డాప్ ఏకపక్ష డేటాను (ఉదా., లావాదేవీ) సంతకం చేసి, బాధితుడిని అనుకరించడానికి ఆ సంతకాన్ని ఉపయోగించవచ్చు.

గమనిక: సంతకం చేయవలసిన చిరునామా అన్‌లాక్ చేయబడి ఉండాలి.

**పారామితులు**

1. `DATA`, 20 బైట్లు - చిరునామా
2. `DATA`, N బైట్లు - సంతకం చేయవలసిన మెసేజ్

**తిరిగి ఇస్తుంది**

`DATA`: సంతకం

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

[eth_sendRawTransaction](#eth_sendrawtransaction) ఉపయోగించి నెట్‌వర్క్‌కు తరువాత సమర్పించగల ఒక లావాదేవీపై సంతకం చేస్తుంది.

**పారామితులు**

1. `ఆబ్జెక్ట్` - లావాదేవీ ఆబ్జెక్ట్

- `రకం`:
- `from`: `DATA`, 20 బైట్లు - లావాదేవీ పంపబడిన చిరునామా.
- `to`: `DATA`, 20 బైట్లు - (కొత్త కాంట్రాక్ట్ సృష్టిస్తున్నప్పుడు ఐచ్ఛికం) లావాదేవీ పంపబడిన చిరునామా.
- `gas`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: 90000) లావాదేవీ అమలు కోసం అందించిన గ్యాస్ యొక్క పూర్ణాంకం. ఇది ఉపయోగించని గ్యాస్‌ను తిరిగి ఇస్తుంది.
- `gasPrice`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: నిర్ధారించవలసి ఉంది) ప్రతి చెల్లించిన గ్యాస్ కోసం ఉపయోగించే గ్యాస్‌ప్రైస్ యొక్క పూర్ణాంకం, వైలో.
- `value`: `QUANTITY` - (ఐచ్ఛికం) ఈ లావాదేవీతో పంపిన విలువ యొక్క పూర్ణాంకం, వైలో.
- `data`: `DATA` - ఒక కాంట్రాక్ట్ యొక్క కంపైల్ చేయబడిన సంకేత భాష లేదా ప్రారంభించబడిన పద్ధతి సంతకం మరియు ఎన్‌కోడ్ చేయబడిన పారామీటర్ల హాష్.
- `nonce`: `QUANTITY` - (ఐచ్ఛికం) ఒక నాన్స్ యొక్క పూర్ణాంకం. అదే నాన్స్‌ను ఉపయోగించే మీ స్వంత పెండింగ్ లావాదేవీలను భర్తీ చేయడానికి ఇది అనుమతిస్తుంది.

**తిరిగి ఇస్తుంది**

`DATA`, పేర్కొన్న ఖాతా ద్వారా సంతకం చేయబడిన RLP-ఎన్‌కోడ్ చేయబడిన లావాదేవీ ఆబ్జెక్ట్.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// ఫలితం
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

కొత్త మెసేజ్ కాల్ లావాదేవీ లేదా కాంట్రాక్ట్ క్రియేషన్‌ను సృష్టిస్తుంది, డేటా ఫీల్డ్‌లో కోడ్ ఉంటే, మరియు `from`లో పేర్కొన్న ఖాతాను ఉపయోగించి దానిపై సంతకం చేస్తుంది.

**పారామితులు**

1. `ఆబ్జెక్ట్` - లావాదేవీ ఆబ్జెక్ట్

- `from`: `DATA`, 20 బైట్లు - లావాదేవీ పంపబడిన చిరునామా.
- `to`: `DATA`, 20 బైట్లు - (కొత్త కాంట్రాక్ట్ సృష్టిస్తున్నప్పుడు ఐచ్ఛికం) లావాదేవీ పంపబడిన చిరునామా.
- `gas`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: 90000) లావాదేవీ అమలు కోసం అందించిన గ్యాస్ యొక్క పూర్ణాంకం. ఇది ఉపయోగించని గ్యాస్‌ను తిరిగి ఇస్తుంది.
- `gasPrice`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: నిర్ధారించవలసి ఉంది) ప్రతి చెల్లించిన గ్యాస్ కోసం ఉపయోగించే గ్యాస్‌ప్రైస్ యొక్క పూర్ణాంకం.
- `value`: `QUANTITY` - (ఐచ్ఛికం) ఈ లావాదేవీతో పంపిన విలువ యొక్క పూర్ణాంకం.
- `input`: `DATA` - ఒక కాంట్రాక్ట్ యొక్క కంపైల్ చేయబడిన సంకేత భాష లేదా ప్రారంభించబడిన పద్ధతి సంతకం మరియు ఎన్‌కోడ్ చేయబడిన పారామీటర్ల హాష్.
- `nonce`: `QUANTITY` - (ఐచ్ఛికం) ఒక నాన్స్ యొక్క పూర్ణాంకం. అదే నాన్స్‌ను ఉపయోగించే మీ స్వంత పెండింగ్ లావాదేవీలను భర్తీ చేయడానికి ఇది అనుమతిస్తుంది.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**తిరిగి ఇస్తుంది**

`DATA`, 32 బైట్లు - లావాదేవీ హాష్, లేదా లావాదేవీ ఇంకా అందుబాటులో లేకపోతే సున్నా హాష్.

మీరు ఒక కాంట్రాక్ట్‌ను సృష్టించినప్పుడు, లావాదేవీ ఒక బ్లాక్‌లో ప్రతిపాదించబడిన తర్వాత, కాంట్రాక్ట్ చిరునామాను పొందడానికి [eth_getTransactionReceipt](#eth_gettransactionreceipt) ఉపయోగించండి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

సంతకం చేసిన లావాదేవీల కోసం కొత్త మెసేజ్ కాల్ లావాదేవీ లేదా కాంట్రాక్ట్ క్రియేషన్‌ను సృష్టిస్తుంది.

**పారామితులు**

1. `DATA`, సంతకం చేసిన లావాదేవీ డేటా.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**తిరిగి ఇస్తుంది**

`DATA`, 32 బైట్లు - లావాదేవీ హాష్, లేదా లావాదేవీ ఇంకా అందుబాటులో లేకపోతే సున్నా హాష్.

మీరు ఒక కాంట్రాక్ట్‌ను సృష్టించినప్పుడు, లావాదేవీ ఒక బ్లాక్‌లో ప్రతిపాదించబడిన తర్వాత, కాంట్రాక్ట్ చిరునామాను పొందడానికి [eth_getTransactionReceipt](#eth_gettransactionreceipt) ఉపయోగించండి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

బ్లాక్‌చెయిన్‌లో ఒక లావాదేవీని సృష్టించకుండా వెంటనే ఒక కొత్త మెసేజ్ కాల్‌ను అమలు చేస్తుంది. తరచుగా చదవడానికి-మాత్రమే స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లను అమలు చేయడానికి ఉపయోగిస్తారు, ఉదాహరణకు ఒక ERC-20 కాంట్రాక్ట్ కోసం `balanceOf`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `ఆబ్జెక్ట్` - లావాదేవీ కాల్ ఆబ్జెక్ట్

- `from`: `DATA`, 20 బైట్లు - (ఐచ్ఛికం) లావాదేవీ పంపబడిన చిరునామా.
- `to`: `DATA`, 20 బైట్లు - లావాదేవీ పంపబడిన చిరునామా.
- `gas`: `QUANTITY` - (ఐచ్ఛికం) లావాదేవీ అమలు కోసం అందించిన గ్యాస్ యొక్క పూర్ణాంకం. eth_call సున్నా గ్యాస్‌ను వినియోగిస్తుంది, కానీ కొన్ని అమలులకు ఈ పారామీటర్ అవసరం కావచ్చు.
- `gasPrice`: `QUANTITY` - (ఐచ్ఛికం) ప్రతి చెల్లించిన గ్యాస్ కోసం ఉపయోగించే గ్యాస్‌ప్రైస్ యొక్క పూర్ణాంకం
- `value`: `QUANTITY` - (ఐచ్ఛికం) ఈ లావాదేవీతో పంపిన విలువ యొక్క పూర్ణాంకం
- `input`: `DATA` - (ఐచ్ఛికం) పద్ధతి సంతకం మరియు ఎన్‌కోడ్ చేయబడిన పారామీటర్ల హాష్. వివరాల కోసం సాలిడిటీ డాక్యుమెంటేషన్‌లో [ఇతీరియము కాంట్రాక్ట్ ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) చూడండి.

2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

**తిరిగి ఇస్తుంది**

`DATA` - అమలు చేయబడిన కాంట్రాక్ట్ యొక్క రిటర్న్ విలువ.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

లావాదేవీ పూర్తి కావడానికి ఎంత గ్యాస్ అవసరమో అంచనా వేసి అందిస్తుంది. లావాదేవీ బ్లాక్‌చెయిన్‌కు జోడించబడదు. EVM మెకానిక్స్ మరియు నోడ్ పనితీరుతో సహా వివిధ కారణాల వల్ల అంచనా వాస్తవానికి లావాదేవీ ద్వారా ఉపయోగించిన గ్యాస్ మొత్తం కంటే గణనీయంగా ఎక్కువగా ఉండవచ్చని గమనించండి.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

[eth_call](#eth_call) పారామీటర్లను చూడండి, అన్ని లక్షణాలు ఐచ్ఛికం అనేవి తప్ప. గ్యాస్ పరిమితి పేర్కొనకపోతే, గెత్ పెండింగ్ బ్లాక్ నుండి బ్లాక్ గ్యాస్ పరిమితిని ఎగువ సరిహద్దుగా ఉపయోగిస్తుంది. ఫలితంగా, పెండింగ్‌లో ఉన్న బ్లాక్ గ్యాస్ పరిమితి కంటే గ్యాస్ మొత్తం ఎక్కువగా ఉన్నప్పుడు, తిరిగి ఇవ్వబడిన అంచనా కాల్/లావాదేవీని అమలు చేయడానికి సరిపోకపోవచ్చు.

**తిరిగి ఇస్తుంది**

`QUANTITY` - ఉపయోగించిన గ్యాస్ మొత్తం.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

హాష్ ద్వారా ఒక బ్లాక్ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక బ్లాక్ యొక్క హాష్.
2. `బూలియన్` - `true` అయితే పూర్తి లావాదేవీ ఆబ్జెక్ట్‌లను అందిస్తుంది, `false` అయితే లావాదేవీల హాష్‌లను మాత్రమే అందిస్తుంది.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**తిరిగి ఇస్తుంది**

`ఆబ్జెక్ట్` - ఒక బ్లాక్ ఆబ్జెక్ట్, లేదా బ్లాక్ కనుగొనబడనప్పుడు `null`:

- `number`: `QUANTITY` - బ్లాక్ సంఖ్య. పెండింగ్ బ్లాక్ అయితే `null`.
- `hash`: `DATA`, 32 బైట్లు - బ్లాక్ యొక్క హాష్. పెండింగ్ బ్లాక్ అయితే `null`.
- `parentHash`: `DATA`, 32 బైట్లు - పేరెంట్ బ్లాక్ యొక్క హాష్.
- `nonce`: `DATA`, 8 బైట్లు - రూపొందించబడిన ప్రూఫ్-ఆఫ్-వర్క్ యొక్క హాష్. పెండింగ్ బ్లాక్ అయితే `null`, ప్రూఫ్-ఆఫ్-స్టేక్ బ్లాక్‌లకు `0x0` (ది మెర్జ్ నుండి)
- `sha3Uncles`: `DATA`, 32 బైట్లు - బ్లాక్‌లోని అంకుల్స్ డేటా యొక్క SHA3.
- `logsBloom`: `DATA`, 256 బైట్లు - బ్లాక్ యొక్క లాగ్‌ల కోసం బ్లూమ్ ఫిల్టర్. పెండింగ్ బ్లాక్ అయితే `null`.
- `transactionsRoot`: `DATA`, 32 బైట్లు - బ్లాక్ యొక్క లావాదేవీ ట్రీ యొక్క రూట్.
- `stateRoot`: `DATA`, 32 బైట్లు - బ్లాక్ యొక్క తుది స్థితి ట్రీ యొక్క రూట్.
- `receiptsRoot`: `DATA`, 32 బైట్లు - బ్లాక్ యొక్క రశీదుల ట్రీ యొక్క రూట్.
- `miner`: `DATA`, 20 బైట్లు - బ్లాక్ బహుమతులు ఇవ్వబడిన లబ్ధిదారుని చిరునామా.
- `difficulty`: `QUANTITY` - ఈ బ్లాక్ కోసం కష్టతరమైన పూర్ణాంకం.
- `totalDifficulty`: `QUANTITY` - ఈ బ్లాక్ వరకు చైన్ యొక్క మొత్తం కష్టతరమైన పూర్ణాంకం.
- `extraData`: `DATA` - ఈ బ్లాక్ యొక్క "అదనపు డేటా" ఫీల్డ్.
- `size`: `QUANTITY` - బైట్లలో ఈ బ్లాక్ యొక్క పరిమాణం పూర్ణాంకం.
- `gasLimit`: `QUANTITY` - ఈ బ్లాక్‌లో అనుమతించబడిన గరిష్ట గ్యాస్.
- `gasUsed`: `QUANTITY` - ఈ బ్లాక్‌లోని అన్ని లావాదేవీల ద్వారా ఉపయోగించిన మొత్తం గ్యాస్.
- `timestamp`: `QUANTITY` - బ్లాక్ సమీకరించబడినప్పుడు యూనిక్స్ టైమ్‌స్టాంప్.
- `transactions`: `శ్రేణి` - లావాదేవీ ఆబ్జెక్ట్‌ల శ్రేణి, లేదా చివరిగా ఇవ్వబడిన పారామీటర్‌పై ఆధారపడి 32 బైట్ల లావాదేవీ హాష్‌లు.
- `uncles`: `శ్రేణి` - అంకుల్ హాష్‌ల శ్రేణి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// ఫలితం
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

బ్లాక్ నంబర్ ద్వారా ఒక బ్లాక్ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ సంఖ్య యొక్క పూర్ణాంకం, లేదా `"earliest"`, `"latest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter)లో వలె.
2. `బూలియన్` - `true` అయితే పూర్తి లావాదేవీ ఆబ్జెక్ట్‌లను అందిస్తుంది, `false` అయితే లావాదేవీల హాష్‌లను మాత్రమే అందిస్తుంది.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**తిరిగి ఇస్తుంది**
[eth_getBlockByHash](#eth_getblockbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

ఫలితం కోసం [eth_getBlockByHash](#eth_getblockbyhash) చూడండి

### eth_getTransactionByHash {#eth_gettransactionbyhash}

లావాదేవీ హాష్ ద్వారా అభ్యర్థించబడిన ఒక లావాదేవీ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక లావాదేవీ యొక్క హాష్

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**తిరిగి ఇస్తుంది**

`ఆబ్జెక్ట్` - ఒక లావాదేవీ ఆబ్జెక్ట్, లేదా లావాదేవీ కనుగొనబడనప్పుడు `null`:

- `blockHash`: `DATA`, 32 బైట్లు - ఈ లావాదేవీ ఉన్న బ్లాక్ యొక్క హాష్. పెండింగ్‌లో ఉంటే `null`.
- `blockNumber`: `QUANTITY` - ఈ లావాదేవీ ఉన్న బ్లాక్ సంఖ్య. పెండింగ్‌లో ఉంటే `null`.
- `from`: `DATA`, 20 బైట్లు - పంపినవారి చిరునామా.
- `gas`: `QUANTITY` - పంపినవారు అందించిన గ్యాస్.
- `gasPrice`: `QUANTITY` - పంపినవారు అందించిన గ్యాస్ ధర, వైలో.
- `hash`: `DATA`, 32 బైట్లు - లావాదేవీ యొక్క హాష్.
- `input`: `DATA` - లావాదేవీతో పాటు పంపిన డేటా.
- `nonce`: `QUANTITY` - పంపినవారు దీనికి ముందు చేసిన లావాదేవీల సంఖ్య.
- `to`: `DATA`, 20 బైట్లు - స్వీకర్త చిరునామా. కాంట్రాక్ట్ క్రియేషన్ లావాదేవీ అయితే `null`.
- `transactionIndex`: `QUANTITY` - బ్లాక్‌లోని లావాదేవీల సూచిక స్థానం యొక్క పూర్ణాంకం. పెండింగ్‌లో ఉంటే `null`.
- `value`: `QUANTITY` - వైలో బదిలీ చేయబడిన విలువ.
- `v`: `QUANTITY` - ECDSA రికవరీ ఐడి
- `r`: `QUANTITY` - ECDSA సంతకం r
- `s`: `QUANTITY` - ECDSA సంతకం s

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// ఫలితం
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

బ్లాక్ హాష్ మరియు లావాదేవీ సూచిక స్థానం ద్వారా ఒక లావాదేవీ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక బ్లాక్ యొక్క హాష్.
2. `QUANTITY` - లావాదేవీ సూచిక స్థానం యొక్క పూర్ణాంకం.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**తిరిగి ఇస్తుంది**
[eth_getTransactionByHash](#eth_gettransactionbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ఫలితం కోసం [eth_getTransactionByHash](#eth_gettransactionbyhash) చూడండి

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

బ్లాక్ నంబర్ మరియు లావాదేవీ సూచిక స్థానం ద్వారా ఒక లావాదేవీ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ సంఖ్య, లేదా `"earliest"`, `"latest"`, `"pending"`, `"safe"` లేదా `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter)లో వలె.
2. `QUANTITY` - లావాదేవీ సూచిక స్థానం.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**తిరిగి ఇస్తుంది**
[eth_getTransactionByHash](#eth_gettransactionbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

ఫలితం కోసం [eth_getTransactionByHash](#eth_gettransactionbyhash) చూడండి

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

లావాదేవీ హాష్ ద్వారా ఒక లావాదేవీ యొక్క రశీదును అందిస్తుంది.

**గమనిక** పెండింగ్ లావాదేవీలకు రశీదు అందుబాటులో లేదు.

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక లావాదేవీ యొక్క హాష్

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**తిరిగి ఇస్తుంది**
`ఆబ్జెక్ట్` - ఒక లావాదేవీ రశీదు ఆబ్జెక్ట్, లేదా రశీదు కనుగొనబడనప్పుడు `null`:

- `transactionHash `: `DATA`, 32 బైట్లు - లావాదేవీ యొక్క హాష్.
- `transactionIndex`: `QUANTITY` - బ్లాక్‌లోని లావాదేవీల సూచిక స్థానం యొక్క పూర్ణాంకం.
- `blockHash`: `DATA`, 32 బైట్లు - ఈ లావాదేవీ ఉన్న బ్లాక్ యొక్క హాష్.
- `blockNumber`: `QUANTITY` - ఈ లావాదేవీ ఉన్న బ్లాక్ సంఖ్య.
- `from`: `DATA`, 20 బైట్లు - పంపినవారి చిరునామా.
- `to`: `DATA`, 20 బైట్లు - స్వీకర్త చిరునామా. కాంట్రాక్ట్ క్రియేషన్ లావాదేవీ అయితే null.
- `cumulativeGasUsed` : `QUANTITY ` - ఈ లావాదేవీ బ్లాక్‌లో అమలు చేయబడినప్పుడు ఉపయోగించిన మొత్తం గ్యాస్ మొత్తం.
- `effectiveGasPrice` : `QUANTITY` - గ్యాస్ యూనిట్‌కు చెల్లించిన మూల రుసుము మరియు చిట్కా మొత్తం.
- `gasUsed `: `QUANTITY ` - ఈ నిర్దిష్ట లావాదేవీ ద్వారా మాత్రమే ఉపయోగించిన గ్యాస్ మొత్తం.
- `contractAddress `: `DATA`, 20 బైట్లు - సృష్టించబడిన కాంట్రాక్ట్ చిరునామా, లావాదేవీ ఒక కాంట్రాక్ట్ సృష్టి అయితే, లేకపోతే `null`.
- `logs`: `శ్రేణి` - ఈ లావాదేవీ ద్వారా రూపొందించబడిన లాగ్ ఆబ్జెక్ట్‌ల శ్రేణి.
- `logsBloom`: `DATA`, 256 బైట్లు - లైట్ క్లయింట్లు సంబంధిత లాగ్‌లను త్వరగా తిరిగి పొందడానికి బ్లూమ్ ఫిల్టర్.
- `type`: `QUANTITY` - లావాదేవీ రకం యొక్క పూర్ణాంకం, లెగసీ లావాదేవీల కోసం `0x0`, యాక్సెస్ జాబితా రకాల కోసం `0x1`, డైనమిక్ ఫీజుల కోసం `0x2`.

ఇది కూడా _ఒకటి_ అందిస్తుంది:

- `root` : `DATA` లావాదేవీ అనంతర స్థితి రూట్ యొక్క 32 బైట్‌లు (బైజాంటియంకు ముందు)
- `status`: `QUANTITY` ఒకటి `1` (విజయం) లేదా `0` (వైఫల్యం)

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// ఫలితం
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // చిరునామా యొక్క స్ట్రింగ్ సృష్టించబడితే
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs, మొదలైనవి ద్వారా తిరిగి ఇవ్వబడిన లాగ్‌లు.
    }],
    "logsBloom": "0x00...0", // 256 బైట్ బ్లూమ్ ఫిల్టర్
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

హాష్ మరియు అంకిల్ ఇండెక్స్ స్థానం ద్వారా ఒక బ్లాక్ యొక్క అంకిల్ గురించి సమాచారాన్ని తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్లు - ఒక బ్లాక్ యొక్క హాష్.
2. `QUANTITY` - అంకుల్ యొక్క సూచిక స్థానం.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**తిరిగి ఇస్తుంది**
[eth_getBlockByHash](#eth_getblockbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ఫలితం కోసం [eth_getBlockByHash](#eth_getblockbyhash) చూడండి

**గమనిక**: ఒక అంకుల్ వ్యక్తిగత లావాదేవీలను కలిగి ఉండదు.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

సంఖ్య మరియు అంకిల్ ఇండెక్స్ స్థానం ద్వారా ఒక బ్లాక్ యొక్క అంకిల్ గురించి సమాచారాన్ని తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ సంఖ్య, లేదా `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"` స్ట్రింగ్, [బ్లాక్ పారామీటర్](/developers/docs/apis/json-rpc/#block-parameter)లో వలె.
2. `QUANTITY` - అంకుల్ యొక్క సూచిక స్థానం.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**తిరిగి ఇస్తుంది**
[eth_getBlockByHash](#eth_getblockbyhash) చూడండి

**గమనిక**: ఒక అంకుల్ వ్యక్తిగత లావాదేవీలను కలిగి ఉండదు.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

ఫలితం కోసం [eth_getBlockByHash](#eth_getblockbyhash) చూడండి

### eth_newFilter {#eth_newfilter}

స్థితి మారినప్పుడు (లాగ్‌లు) తెలియజేయడానికి, ఫిల్టర్ ఎంపికల ఆధారంగా ఒక ఫిల్టర్ ఆబ్జెక్ట్‌ను సృష్టిస్తుంది.
స్థితి మారిందో లేదో తనిఖీ చేయడానికి, [eth_getFilterChanges](#eth_getfilterchanges)ని కాల్ చేయండి.

**టాపిక్ ఫిల్టర్‌లను పేర్కొనడంపై ఒక గమనిక:**
టాపిక్‌లు ఆర్డర్-ఆధారితమైనవి. టాపిక్‌లు [A, B]తో ఉన్న లాగ్‌తో కూడిన లావాదేవీ కింది టాపిక్ ఫిల్టర్‌ల ద్వారా సరిపోలుతుంది:

- `[]` "ఏదైనా"
- `[A]` "మొదటి స్థానంలో A (మరియు తరువాత ఏదైనా)"
- `[null, B]` "మొదటి స్థానంలో ఏదైనా మరియు రెండవ స్థానంలో B (మరియు తరువాత ఏదైనా)"
- `[A, B]` "మొదటి స్థానంలో A మరియు రెండవ స్థానంలో B (మరియు తరువాత ఏదైనా)"
- `[[A, B], [A, B]]` "మొదటి స్థానంలో (A లేదా B) మరియు రెండవ స్థానంలో (A లేదా B) (మరియు తరువాత ఏదైనా)"
- **పారామితులు**

1. `ఆబ్జెక్ట్` - ఫిల్టర్ ఎంపికలు:

- `fromBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా చివరి ప్రతిపాదిత బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారు చేయబడిన బ్లాక్ కోసం `"finalized"`, లేదా `"pending"`, ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా చివరి ప్రతిపాదిత బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారు చేయబడిన బ్లాక్ కోసం `"finalized"`, లేదా `"pending"`, ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"earliest"`.
- `address`: `DATA|శ్రేణి`, 20 బైట్లు - (ఐచ్ఛికం) కాంట్రాక్ట్ చిరునామా లేదా లాగ్‌లు ప్రారంభం కావలసిన చిరునామాల జాబితా.
- `topics`: `DATA శ్రేణి`, - (ఐచ్ఛికం) 32 బైట్ల `DATA` టాపిక్‌ల శ్రేణి. టాపిక్‌లు ఆర్డర్-ఆధారితమైనవి. ప్రతి టాపిక్ "లేదా" ఎంపికలతో DATA శ్రేణి కూడా కావచ్చు.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**తిరిగి ఇస్తుంది**
`QUANTITY` - ఒక ఫిల్టర్ ఐడి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

కొత్త బ్లాక్ వచ్చినప్పుడు తెలియజేయడానికి, నోడ్‌లో ఒక ఫిల్టర్‌ను సృష్టిస్తుంది.
స్థితి మారిందో లేదో తనిఖీ చేయడానికి, [eth_getFilterChanges](#eth_getfilterchanges)ని కాల్ చేయండి.

**పారామితులు**
ఏమీ లేవు

**తిరిగి ఇస్తుంది**
`QUANTITY` - ఒక ఫిల్టర్ ఐడి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// ఫలితం
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

కొత్త పెండింగ్ లావాదేవీలు వచ్చినప్పుడు తెలియజేయడానికి, నోడ్‌లో ఒక ఫిల్టర్‌ను సృష్టిస్తుంది.
స్థితి మారిందో లేదో తనిఖీ చేయడానికి, [eth_getFilterChanges](#eth_getfilterchanges)ని కాల్ చేయండి.

**పారామితులు**
ఏమీ లేవు

**తిరిగి ఇస్తుంది**
`QUANTITY` - ఒక ఫిల్టర్ ఐడి.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// ఫలితం
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

ఇచ్చిన ఐడితో ఒక ఫిల్టర్‌ను అన్‌ఇన్‌స్టాల్ చేస్తుంది. వాచ్ ఇకపై అవసరం లేనప్పుడు ఎల్లప్పుడూ కాల్ చేయాలి.
అదనంగా, ఫిల్టర్‌లు కొంత సమయం పాటు [eth_getFilterChanges](#eth_getfilterchanges)తో అభ్యర్థించబడనప్పుడు టైమ్‌అవుట్ అవుతాయి.

**పారామితులు**

1. `QUANTITY` - ఫిల్టర్ ఐడి.

```js
params: [
  "0xb", // 11
]
```

**తిరిగి ఇస్తుంది**
`బూలియన్` - ఫిల్టర్ విజయవంతంగా అన్‌ఇన్‌స్టాల్ చేయబడితే `true`, లేకపోతే `false`.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// ఫలితం
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

ఒక ఫిల్టర్ కోసం పోలింగ్ పద్ధతి, ఇది చివరి పోల్ నుండి జరిగిన లాగ్‌ల శ్రేణిని అందిస్తుంది.

**పారామితులు**

1. `QUANTITY` - ఫిల్టర్ ఐడి.

```js
params: [
  "0x16", // 22
]
```

**తిరిగి ఇస్తుంది**
`శ్రేణి` - లాగ్ ఆబ్జెక్ట్‌ల శ్రేణి, లేదా చివరి పోల్ నుండి ఏమీ మారకపోతే ఖాళీ శ్రేణి.

- `eth_newBlockFilter`తో సృష్టించబడిన ఫిల్టర్ల కోసం, తిరిగి వచ్చేవి బ్లాక్ హాష్‌లు (`DATA`, 32 బైట్‌లు), ఉదా., `["0x3454645634534..."]`.

- `eth_newPendingTransactionFilter`తో సృష్టించబడిన ఫిల్టర్ల కోసం, తిరిగి వచ్చేవి లావాదేవీ హాష్‌లు (`DATA`, 32 బైట్‌లు), ఉదా., `["0x6345343454645..."]`.

- `eth_newFilter`తో సృష్టించబడిన ఫిల్టర్‌ల కోసం, లాగ్‌లు కింది పారామీటర్లతో కూడిన ఆబ్జెక్ట్‌లు:
  - `removed`: `TAG` - చైన్ పునర్వ్యవస్థీకరణ కారణంగా లాగ్ తీసివేయబడినప్పుడు `true`. చెల్లుబాటు అయ్యే లాగ్ అయితే `false`.
  - `logIndex`: `QUANTITY` - బ్లాక్‌లోని లాగ్ సూచిక స్థానం యొక్క పూర్ణాంకం. పెండింగ్ లాగ్ అయితే `null`.
  - `transactionIndex`: `QUANTITY` - లాగ్ సృష్టించబడిన లావాదేవీల సూచిక స్థానం యొక్క పూర్ణాంకం. పెండింగ్ లాగ్ అయితే `null`.
  - `transactionHash`: `DATA`, 32 బైట్లు - ఈ లాగ్ సృష్టించబడిన లావాదేవీల హాష్. పెండింగ్ లాగ్ అయితే `null`.
  - `blockHash`: `DATA`, 32 బైట్లు - ఈ లాగ్ ఉన్న బ్లాక్ యొక్క హాష్. పెండింగ్‌లో ఉంటే `null`. పెండింగ్ లాగ్ అయితే `null`.
  - `blockNumber`: `QUANTITY` - ఈ లాగ్ ఉన్న బ్లాక్ సంఖ్య. పెండింగ్‌లో ఉంటే `null`. పెండింగ్ లాగ్ అయితే `null`.
  - `address`: `DATA`, 20 బైట్లు - ఈ లాగ్ ప్రారంభమైన చిరునామా.
  - `data`: `DATA` - వేరియబుల్-పొడవు ఇండెక్స్ చేయని లాగ్ డేటా. (_solidity_లో: సున్నా లేదా అంతకంటే ఎక్కువ 32 బైట్‌ల ఇండెక్స్ చేయని లాగ్ ఆర్గ్యుమెంట్‌లు.)
  - `topics`: `DATA శ్రేణి` - సూచిక చేయబడిన లాగ్ ఆర్గ్యుమెంట్ల యొక్క 0 నుండి 4 32 బైట్ల `DATA` శ్రేణి. (_solidity_లో: మీరు `anonymous` స్పెసిఫైయర్‌తో ఈవెంట్‌ను ప్రకటించినప్పుడు తప్ప, మొదటి టాపిక్ ఈవెంట్ యొక్క సంతకం యొక్క _hash_ (ఉదా., `Deposit(address,bytes32,uint256)`).)

- **ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// ఫలితం
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

ఇచ్చిన ఐడితో ఫిల్టర్‌కు సరిపోయే అన్ని లాగ్‌ల శ్రేణిని అందిస్తుంది.

**పారామితులు**

1. `QUANTITY` - ఫిల్టర్ ఐడి.

```js
params: [
  "0x16", // 22
]
```

**తిరిగి ఇస్తుంది**
[eth_getFilterChanges](#eth_getfilterchanges) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

ఫలితం కోసం [eth_getFilterChanges](#eth_getfilterchanges) చూడండి

### eth_getLogs {#eth_getlogs}

ఇచ్చిన ఫిల్టర్ ఆబ్జెక్ట్‌కు సరిపోయే అన్ని లాగ్‌ల శ్రేణిని అందిస్తుంది.

**పారామితులు**

1. `ఆబ్జెక్ట్` - ఫిల్టర్ ఎంపికలు:

- `fromBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా చివరి ప్రతిపాదిత బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారు చేయబడిన బ్లాక్ కోసం `"finalized"`, లేదా `"pending"`, ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా చివరి ప్రతిపాదిత బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారు చేయబడిన బ్లాక్ కోసం `"finalized"`, లేదా `"pending"`, ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"earliest"`.
- `address`: `DATA|శ్రేణి`, 20 బైట్లు - (ఐచ్ఛికం) కాంట్రాక్ట్ చిరునామా లేదా లాగ్‌లు ప్రారంభం కావలసిన చిరునామాల జాబితా.
- `topics`: `DATA శ్రేణి`, - (ఐచ్ఛికం) 32 బైట్ల `DATA` టాపిక్‌ల శ్రేణి. టాపిక్‌లు ఆర్డర్-ఆధారితమైనవి. ప్రతి టాపిక్ "లేదా" ఎంపికలతో DATA శ్రేణి కూడా కావచ్చు.
- `blockHash`: `DATA`, 32 బైట్లు - (ఐచ్ఛికం, **భవిష్యత్తు**) EIP-234 జోడింపుతో, `blockHash` ఒక కొత్త ఫిల్టర్ ఎంపిక అవుతుంది, ఇది తిరిగి ఇవ్వబడిన లాగ్‌లను 32-బైట్ల హాష్ `blockHash`తో ఉన్న ఒకే బ్లాక్‌కు పరిమితం చేస్తుంది. `blockHash` ఉపయోగించడం `fromBlock` = `toBlock` = హాష్ `blockHash`తో ఉన్న బ్లాక్ నంబర్‌కు సమానం. ఫిల్టర్ ప్రమాణాలలో `blockHash` ఉంటే, `fromBlock` లేదా `toBlock` అనుమతించబడవు.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**తిరిగి ఇస్తుంది**
[eth_getFilterChanges](#eth_getfilterchanges) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

ఫలితం కోసం [eth_getFilterChanges](#eth_getfilterchanges) చూడండి

## వినియోగ ఉదాహరణ {#usage-example}

### JSON_RPC ఉపయోగించి ఒక కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడం {#deploying-contract}

ఈ విభాగం కేవలం RPC ఇంటర్‌ఫేస్‌ను ఉపయోగించి ఒక కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలో ప్రదర్శనను కలిగి ఉంటుంది. కాంట్రాక్ట్‌లను డిప్లాయ్ చేయడానికి ప్రత్యామ్నాయ మార్గాలు ఉన్నాయి, ఇక్కడ ఈ సంక్లిష్టత తొలగించబడుతుంది—ఉదాహరణకు, [web3.js](https://web3js.readthedocs.io/) మరియు [web3.py](https://github.com/ethereum/web3.py) వంటి RPC ఇంటర్‌ఫేస్‌పై నిర్మించిన లైబ్రరీలను ఉపయోగించడం. ఈ నైరూప్యతలు సాధారణంగా అర్థం చేసుకోవడానికి సులభంగా ఉంటాయి మరియు తక్కువ దోష-ప్రవణత కలిగి ఉంటాయి, కానీ తెర వెనుక ఏమి జరుగుతుందో అర్థం చేసుకోవడం ఇప్పటికీ సహాయకరంగా ఉంటుంది.

కిందిది `Multiply7` అనే ఒక సూటియైన స్మార్ట్ కాంట్రాక్ట్, ఇది JSON-RPC ఇంటర్‌ఫేస్‌ను ఉపయోగించి ఒక ఇతీరియము నోడ్‌కు డిప్లాయ్ చేయబడుతుంది. ఈ ట్యుటోరియల్ చదువరి ఇప్పటికే ఒక గెత్ నోడ్‌ను నడుపుతున్నారని ఊహిస్తుంది. నోడ్‌లు మరియు క్లయింట్ల గురించి మరింత సమాచారం [ఇక్కడ](/developers/docs/nodes-and-clients/run-a-node) అందుబాటులో ఉంది. గెత్-కాని క్లయింట్ల కోసం HTTP JSON-RPCని ఎలా ప్రారంభించాలో చూడటానికి దయచేసి వ్యక్తిగత [క్లయింట్](/developers/docs/nodes-and-clients/) డాక్యుమెంటేషన్‌ను చూడండి. చాలా క్లయింట్లు `localhost:8545`లో సర్వ్ చేయడానికి డిఫాల్ట్ అవుతాయి.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

చేయవలసిన మొదటి పని HTTP RPC ఇంటర్‌ఫేస్ ప్రారంభించబడిందని నిర్ధారించుకోవడం. అంటే మేము ప్రారంభంలో గెత్‌కు `--http` ఫ్లాగ్‌ను సరఫరా చేస్తాము. ఈ ఉదాహరణలో మేము ఒక ప్రైవేట్ డెవలప్‌మెంట్ చైన్‌లో గెత్ నోడ్‌ను ఉపయోగిస్తాము. ఈ విధానాన్ని ఉపయోగించి మాకు నిజమైన నెట్‌వర్క్‌లో ఈథర్ అవసరం లేదు.

```bash
geth --http --dev console 2>>geth.log
```

ఇది HTTP RPC ఇంటర్‌ఫేస్‌ను `http://localhost:8545`లో ప్రారంభిస్తుంది.

[curl](https://curl.se) ఉపయోగించి కాయిన్‌బేస్ చిరునామాను (ఖాతాల శ్రేణి నుండి మొదటి చిరునామాను పొందడం ద్వారా) మరియు బ్యాలెన్స్‌ను తిరిగి పొందడం ద్వారా ఇంటర్‌ఫేస్ నడుస్తోందని మేము ధృవీకరించుకోవచ్చు. దయచేసి గమనించండి, ఈ ఉదాహరణలలోని డేటా మీ స్థానిక నోడ్‌లో భిన్నంగా ఉంటుంది. మీరు ఈ ఆదేశాలను ప్రయత్నించాలనుకుంటే, రెండవ curl అభ్యర్థనలోని అభ్యర్థన పారామీటర్లను మొదటిదాని నుండి తిరిగి వచ్చిన ఫలితంతో భర్తీ చేయండి.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

సంఖ్యలు హెక్స్ ఎన్‌కోడ్ చేయబడినందున, బ్యాలెన్స్ వైలో హెక్స్ స్ట్రింగ్‌గా తిరిగి ఇవ్వబడుతుంది. మాకు ఈథర్‌లో సంఖ్యగా బ్యాలెన్స్ కావాలంటే, మేము గెత్ కన్సోల్ నుండి వెబ్3ని ఉపయోగించవచ్చు.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

ఇప్పుడు మా ప్రైవేట్ డెవలప్‌మెంట్ చైన్‌లో కొంత ఈథర్ ఉంది కాబట్టి, మేము కాంట్రాక్ట్‌ను డిప్లాయ్ చేయవచ్చు. మొదటి దశ Multiply7 కాంట్రాక్ట్‌ను EVMకి పంపగల బైట్ కోడ్‌గా కంపైల్ చేయడం. solc, సాలిడిటీ కంపైలర్‌ను ఇన్‌స్టాల్ చేయడానికి, [సాలిడిటీ డాక్యుమెంటేషన్‌ను](https://docs.soliditylang.org/en/latest/installing-solidity.html) అనుసరించండి. (మా ఉదాహరణకు ఉపయోగించిన కంపైలర్ వెర్షన్‌కు సరిపోయేలా మీరు పాత `solc` విడుదలను ఉపయోగించాలనుకోవచ్చు (https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

తదుపరి దశ, Multiply7 కాంట్రాక్టును EVMకి పంపగలిగే బైట్ కోడ్‌కి కంపైల్ చేయడం.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

ఇప్పుడు మనకు కంపైల్ చేయబడిన కోడ్ ఉంది కాబట్టి దానిని డిప్లాయ్ చేయడానికి ఎంత గ్యాస్ ఖర్చవుతుందో మనం నిర్ధారించుకోవాలి. RPC ఇంటర్‌ఫేస్‌లో `eth_estimateGas` పద్ధతి ఉంది, ఇది మాకు ఒక అంచనాను ఇస్తుంది.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

చివరగా కాంట్రాక్ట్‌ను డిప్లాయ్ చేయండి.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

లావాదేవీ నోడ్ ద్వారా అంగీకరించబడింది మరియు ఒక లావాదేవీ హాష్ తిరిగి ఇవ్వబడుతుంది. ఈ హాష్‌ను లావాదేవీని ట్రాక్ చేయడానికి ఉపయోగించవచ్చు. తదుపరి దశ మన కాంట్రాక్ట్ డిప్లాయ్ చేయబడిన చిరునామాను నిర్ధారించడం. ప్రతి అమలు చేయబడిన లావాదేవీ ఒక రసీదును సృష్టిస్తుంది. ఈ రసీదు లావాదేవీకి సంబంధించిన వివిధ సమాచారాన్ని కలిగి ఉంటుంది, ఉదాహరణకు లావాదేవీ ఏ బ్లాక్‌లో చేర్చబడింది మరియు EVM ద్వారా ఎంత గ్యాస్ ఉపయోగించబడింది. ఒక లావాదేవీ
ఒక కాంట్రాక్ట్‌ను సృష్టిస్తే అది కాంట్రాక్ట్ చిరునామాను కూడా కలిగి ఉంటుంది. మనం `eth_getTransactionReceipt` RPC పద్ధతితో రసీదును తిరిగి పొందవచ్చు.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

మన కాంట్రాక్ట్ `0x4d03d617d700cf81935d7f797f4e2ae719648262`పై సృష్టించబడింది. రసీదుకు బదులుగా శూన్య ఫలితం అంటే లావాదేవీ ఇంకా ఒక బ్లాక్‌లో చేర్చబడలేదు. కొంతసేపు వేచి ఉండి, మీ ఏకాభిప్రాయం క్లయింట్ నడుస్తుందో లేదో తనిఖీ చేసి, మళ్లీ ప్రయత్నించండి.

#### స్మార్ట్ కాంట్రాక్టులతో పరస్పర చర్య {#interacting-with-smart-contract}

ఈ ఉదాహరణలో మనం కాంట్రాక్ట్ యొక్క `multiply` పద్ధతికి `eth_sendTransaction` ఉపయోగించి ఒక లావాదేవీని పంపుతాము.

`eth_sendTransaction`కి అనేక ఆర్గ్యుమెంట్‌లు అవసరం, ప్రత్యేకంగా `from`, `to` మరియు `data`. `From` అనేది మన ఖాతా యొక్క పబ్లిక్ చిరునామా, మరియు `to` అనేది కాంట్రాక్ట్ చిరునామా. `data` ఆర్గ్యుమెంట్ ఏ పద్ధతిని మరియు ఏ ఆర్గ్యుమెంట్‌లతో పిలవాలి అని నిర్వచించే పేలోడ్‌ను కలిగి ఉంటుంది. [ఎబిఐ (అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్)](https://docs.soliditylang.org/en/latest/abi-spec.html) ఇక్కడే ఉపయోగంలోకి వస్తుంది. ఎబిఐ అనేది EVM కోసం డేటాను ఎలా నిర్వచించాలి మరియు ఎన్కోడ్ చేయాలో నిర్వచించే ఒక JSON ఫైల్.

పేలోడ్ యొక్క బైట్‌లు కాంట్రాక్టులోని ఏ పద్ధతిని పిలవాలో నిర్వచిస్తాయి. ఇది ఫంక్షన్ పేరు మరియు దాని ఆర్గ్యుమెంట్ రకాలపై కెకాక్ హాష్ నుండి మొదటి 4 బైట్‌లు, హెక్స్ ఎన్కోడ్ చేయబడింది. మల్టిప్లై ఫంక్షన్ ఒక uintని అంగీకరిస్తుంది, ఇది uint256కి అలియాస్. ఇది మనకు దీనిని ఇస్తుంది:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

తదుపరి దశ ఆర్గ్యుమెంట్‌లను ఎన్కోడ్ చేయడం. కేవలం ఒకే ఒక్క uint256 ఉంది, ఉదాహరణకు, 6 అనే విలువ. ఎబిఐలో uint256 రకాలను ఎలా ఎన్కోడ్ చేయాలో నిర్దేశించే ఒక విభాగం ఉంది.

`int<M>: enc(X)` అనేది X యొక్క బిగ్-ఎండియన్ టూస్ కాంప్లిమెంట్ ఎన్కోడింగ్, ప్రతికూల X కోసం 0xffతో, మరియు సానుకూల X కోసం సున్నా బైట్లతో హైయ్యర్-ఆర్డర్ (ఎడమ) వైపు ప్యాడ్ చేయబడి ఉంటుంది, తద్వారా దాని పొడవు 32 బైట్‌ల గుణకం అవుతుంది.

ఇది `0000000000000000000000000000000000000000000000000000000000000006`గా ఎన్కోడ్ అవుతుంది.

ఫంక్షన్ సెలెక్టర్ మరియు ఎన్కోడ్ చేయబడిన ఆర్గ్యుమెంట్‌ను కలిపితే మన డేటా `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` అవుతుంది.

ఇది ఇప్పుడు నోడ్‌కు పంపబడుతుంది:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

ఒక లావాదేవీ పంపబడినందున, ఒక లావాదేవీ హాష్ తిరిగి ఇవ్వబడింది. రసీదును తిరిగి పొందితే లభించేది:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

రసీదులో ఒక లాగ్ ఉంటుంది. ఈ లాగ్ లావాదేవీ అమలుపై EVM ద్వారా ఉత్పత్తి చేయబడింది మరియు రసీదులో చేర్చబడింది. `multiply` ఫంక్షన్, ఇన్‌పుట్‌ని 7తో గుణించగా `Print` ఈవెంట్ జరిగిందని చూపుతుంది. `Print` ఈవెంట్ కోసం ఆర్గ్యుమెంట్ ఒక uint256 అయినందున, మనం దానిని ఎబిఐ నిబంధనల ప్రకారం డీకోడ్ చేయవచ్చు, ఇది మనకు ఆశించిన దశాంశం 42ను ఇస్తుంది. డేటాతో పాటు, లాగ్‌ను ఏ ఈవెంట్ సృష్టించిందో నిర్ధారించడానికి టాపిక్స్‌ని ఉపయోగించవచ్చని గమనించడం ముఖ్యం:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

ఇది JSON-RPC యొక్క ప్రత్యక్ష వినియోగాన్ని ప్రదర్శిస్తూ, అత్యంత సాధారణ పనులలో కొన్నింటికి కేవలం ఒక సంక్షిప్త పరిచయం.

## సంబంధిత అంశాలు {#related-topics}

- [JSON-RPC స్పెసిఫికేషన్](http://www.jsonrpc.org/specification)
- [నోడ్‌లు మరియు క్లయింట్లు](/developers/docs/nodes-and-clients/)
- [జావాస్క్రిప్ట్ ఎపిఐలు](/developers/docs/apis/javascript/)
- [బ్యాకెండ్ ఎపిఐలు](/developers/docs/apis/backend/)
- [ఎగ్జిక్యూషన్ క్లయింట్‌లు](/developers/docs/nodes-and-clients/#execution-clients)
