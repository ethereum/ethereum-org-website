---
title: జేసన్-ఆర్‌పీసీ API
description: ఎథీరియం క్లయింట్‌ల కోసం ఒక స్టేట్‌లెస్, తేలికపాటి రిమోట్ ప్రొసీజర్ కాల్ (RPC) ప్రోటోకాల్.
lang: te
---

ఒక సాఫ్ట్‌వేర్ అప్లికేషన్ [ఎథీరియం](/) బ్లాక్‌చైన్‌తో ఇంటరాక్ట్ అవ్వాలంటే - బ్లాక్‌చైన్ డేటాను చదవడం ద్వారా లేదా నెట్‌వర్క్‌కు లావాదేవీలను పంపడం ద్వారా - అది తప్పనిసరిగా ఒక ఎథీరియం నోడ్‌కు కనెక్ట్ అవ్వాలి.

ఈ ప్రయోజనం కోసం, ప్రతి [ఎథీరియం క్లయింట్](/developers/docs/nodes-and-clients/#execution-clients) ఒక [జేసన్-ఆర్‌పీసీ స్పెసిఫికేషన్‌ను](https://github.com/ethereum/execution-apis) అమలు చేస్తుంది, కాబట్టి నిర్దిష్ట నోడ్ లేదా క్లయింట్ అమలుతో సంబంధం లేకుండా అప్లికేషన్‌లు ఆధారపడగల ఏకరీతి పద్ధతుల సమితి ఉంటుంది.

[జేసన్-ఆర్‌పీసీ](https://www.jsonrpc.org/specification) అనేది ఒక స్టేట్‌లెస్, తేలికపాటి రిమోట్ ప్రొసీజర్ కాల్ (RPC) ప్రోటోకాల్. ఇది అనేక డేటా నిర్మాణాలను మరియు వాటి ప్రాసెసింగ్ చుట్టూ ఉన్న నియమాలను నిర్వచిస్తుంది. ఈ కాన్సెప్ట్‌లను ఒకే ప్రాసెస్‌లో, సాకెట్‌ల ద్వారా, HTTP ద్వారా లేదా అనేక విభిన్న సందేశ పంపే వాతావరణాలలో ఉపయోగించవచ్చు కాబట్టి ఇది ట్రాన్స్‌పోర్ట్ అజ్ఞేయవాది (transport agnostic). ఇది JSON (RFC 4627)ను డేటా ఫార్మాట్‌గా ఉపయోగిస్తుంది.

## క్లయింట్ అమలులు {#client-implementations}

జేసన్-ఆర్‌పీసీ స్పెసిఫికేషన్‌ను అమలు చేస్తున్నప్పుడు ఎథీరియం క్లయింట్‌లు ఒక్కొక్కటి వివిధ ప్రోగ్రామింగ్ భాషలను ఉపయోగించవచ్చు. నిర్దిష్ట ప్రోగ్రామింగ్ భాషలకు సంబంధించిన మరిన్ని వివరాల కోసం సంబంధిత [క్లయింట్ డాక్యుమెంటేషన్‌ను](/developers/docs/nodes-and-clients/#execution-clients) చూడండి. తాజా API మద్దతు సమాచారం కోసం ప్రతి క్లయింట్ యొక్క డాక్యుమెంటేషన్‌ను తనిఖీ చేయాలని మేము సిఫార్సు చేస్తున్నాము.

## సౌకర్యవంతమైన లైబ్రరీలు {#convenience-libraries}

మీరు జేసన్-ఆర్‌పీసీ API ద్వారా ఎథీరియం క్లయింట్‌లతో నేరుగా ఇంటరాక్ట్ అవ్వాలని ఎంచుకోగలిగినప్పటికీ, వికేంద్రీకృత అప్లికేషన్ (dapp) డెవలపర్‌లకు తరచుగా సులభమైన ఎంపికలు అందుబాటులో ఉంటాయి. జేసన్-ఆర్‌పీసీ API పైన ర్యాపర్‌లను అందించడానికి అనేక [JavaScript](/developers/docs/apis/javascript/#available-libraries) మరియు [బ్యాకెండ్ API](/developers/docs/apis/backend/#available-libraries) లైబ్రరీలు ఉన్నాయి. ఈ లైబ్రరీలతో, డెవలపర్‌లు ఎథీరియంతో ఇంటరాక్ట్ అయ్యే జేసన్-ఆర్‌పీసీ అభ్యర్థనలను (అంతర్గతంగా) ప్రారంభించడానికి తమకు నచ్చిన ప్రోగ్రామింగ్ భాషలో సహజమైన, ఒక-వరుస పద్ధతులను వ్రాయగలరు.

## ఏకాభిప్రాయ క్లయింట్ APIలు {#consensus-clients}

ఈ పేజీ ప్రధానంగా ఎథీరియం అమలు క్లయింట్‌లు ఉపయోగించే జేసన్-ఆర్‌పీసీ API గురించి వివరిస్తుంది. అయితే, ఏకాభిప్రాయ క్లయింట్‌లు కూడా ఒక RPC APIని కలిగి ఉంటాయి, ఇది నోడ్ గురించి సమాచారాన్ని అడగడానికి, బీకన్ బ్లాక్‌లు, బీకన్ స్థితి మరియు ఇతర ఏకాభిప్రాయ సంబంధిత సమాచారాన్ని నేరుగా నోడ్ నుండి అభ్యర్థించడానికి వినియోగదారులను అనుమతిస్తుంది. ఈ API [బీకన్ API వెబ్‌పేజీ](https://ethereum.github.io/beacon-APIs/#/)లో డాక్యుమెంట్ చేయబడింది.

నోడ్ లోపల క్లయింట్‌ల మధ్య కమ్యూనికేషన్ కోసం ఒక అంతర్గత API కూడా ఉపయోగించబడుతుంది - అంటే, ఇది ఏకాభిప్రాయ క్లయింట్ మరియు అమలు క్లయింట్ డేటాను మార్పిడి చేసుకోవడానికి వీలు కల్పిస్తుంది. దీనిని 'ఇంజిన్ API' అని పిలుస్తారు మరియు దీని స్పెసిఫికేషన్‌లు [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)లో అందుబాటులో ఉన్నాయి.

## అమలు క్లయింట్ స్పెసిఫికేషన్ {#spec}

[GitHubలో పూర్తి జేసన్-ఆర్‌పీసీ API స్పెసిఫికేషన్‌ను చదవండి](https://github.com/ethereum/execution-apis). ఈ API [అమలు API వెబ్‌పేజీ](https://ethereum.github.io/execution-apis/)లో డాక్యుమెంట్ చేయబడింది మరియు అందుబాటులో ఉన్న అన్ని పద్ధతులను ప్రయత్నించడానికి ఒక ఇన్‌స్పెక్టర్‌ను కలిగి ఉంటుంది.

## సంప్రదాయాలు {#conventions}

### హెక్స్ విలువల ఎన్‌కోడింగ్ {#hex-encoding}

JSON ద్వారా రెండు కీలక డేటా రకాలు పంపబడతాయి: ఫార్మాట్ చేయని బైట్ శ్రేణులు మరియు పరిమాణాలు. రెండూ హెక్స్ ఎన్‌కోడింగ్‌తో పంపబడతాయి కానీ ఫార్మాటింగ్ కోసం వేర్వేరు అవసరాలను కలిగి ఉంటాయి.

#### పరిమాణాలు {#quantities-encoding}

పరిమాణాలను (పూర్ణాంకాలు, సంఖ్యలు) ఎన్‌కోడింగ్ చేస్తున్నప్పుడు: హెక్స్‌గా ఎన్‌కోడ్ చేయండి, "0x"ను ముందు చేర్చండి, ఇది అత్యంత కాంపాక్ట్ ప్రాతినిధ్యం (చిన్న మినహాయింపు: సున్నాను "0x0"గా సూచించాలి).

ఇక్కడ కొన్ని ఉదాహరణలు ఉన్నాయి:

- 0x41 (దశాంశంలో 65)
- 0x400 (దశాంశంలో 1024)
- తప్పు: 0x (ఎల్లప్పుడూ కనీసం ఒక అంకెను కలిగి ఉండాలి - సున్నా అంటే "0x0")
- తప్పు: 0x0400 (ముందు సున్నాలు అనుమతించబడవు)
- తప్పు: ff (తప్పనిసరిగా 0x ముందు చేర్చాలి)

### ఫార్మాట్ చేయని డేటా {#unformatted-data-encoding}

ఫార్మాట్ చేయని డేటాను (బైట్ శ్రేణులు, ఖాతా చిరునామాలు, హాష్‌లు, బైట్‌కోడ్ శ్రేణులు) ఎన్‌కోడింగ్ చేస్తున్నప్పుడు: హెక్స్‌గా ఎన్‌కోడ్ చేయండి, "0x"ను ముందు చేర్చండి, ప్రతి బైట్‌కు రెండు హెక్స్ అంకెలు ఉండాలి.

ఇక్కడ కొన్ని ఉదాహరణలు ఉన్నాయి:

- 0x41 (పరిమాణం 1, "A")
- 0x004200 (పరిమాణం 3, "0B0")
- 0x (పరిమాణం 0, "")
- తప్పు: 0xf0f0f (తప్పనిసరిగా సరి సంఖ్యలో అంకెలు ఉండాలి)
- తప్పు: 004200 (తప్పనిసరిగా 0x ముందు చేర్చాలి)

### బ్లాక్ పారామితి {#block-parameter}

కింది పద్ధతులు బ్లాక్ పారామితిని కలిగి ఉంటాయి:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

ఎథీరియం స్థితిని ప్రశ్నించే అభ్యర్థనలు చేసినప్పుడు, అందించిన బ్లాక్ పారామితి బ్లాక్ యొక్క ఎత్తును నిర్ణయిస్తుంది.

బ్లాక్ పారామితి కోసం కింది ఎంపికలు సాధ్యమవుతాయి:

- `HEX String` - ఒక పూర్ణాంక బ్లాక్ సంఖ్య
- `String "earliest"` అత్యంత ప్రారంభ/ప్రారంభ బ్లాక్ కోసం
- `String "latest"` - ప్రతిపాదించిన తాజా బ్లాక్ కోసం
- `String "safe"` - తాజా సురక్షిత హెడ్ బ్లాక్ కోసం
- `String "finalized"` - తాజా ఖరారైన బ్లాక్ కోసం
- `String "pending"` - పెండింగ్‌లో ఉన్న స్థితి/లావాదేవీల కోసం

## ఉదాహరణలు {#examples}

కమాండ్ లైన్ టూల్, [curl](https://curl.se)ని ఉపయోగించి వ్యక్తిగత జేసన్-ఆర్‌పీసీ API ఎండ్‌పాయింట్‌లను ఎలా ఉపయోగించాలో ఈ పేజీలో మేము ఉదాహరణలను అందిస్తున్నాము. ఈ వ్యక్తిగత ఎండ్‌పాయింట్ ఉదాహరణలు క్రింద ఉన్న [Curl ఉదాహరణలు](#curl-examples) విభాగంలో ఉన్నాయి. పేజీలో మరింత క్రింద, Geth నోడ్, జేసన్-ఆర్‌పీసీ API మరియు curl ఉపయోగించి స్మార్ట్ కాంట్రాక్ట్‌ను కంపైలింగ్ మరియు డిప్లాయ్ చేయడానికి మేము ఒక [ఎండ్-టు-ఎండ్ ఉదాహరణ](#usage-example)ను కూడా అందిస్తున్నాము.

## Curl ఉదాహరణలు {#curl-examples}

ఒక ఎథీరియం నోడ్‌కు [curl](https://curl.se) అభ్యర్థనలను చేయడం ద్వారా జేసన్-ఆర్‌పీసీ APIని ఉపయోగించే ఉదాహరణలు క్రింద అందించబడ్డాయి. ప్రతి ఉదాహరణలో నిర్దిష్ట ఎండ్‌పాయింట్ యొక్క వివరణ, దాని పారామితులు, రిటర్న్ రకం మరియు దానిని ఎలా ఉపయోగించాలో తెలిపే ఒక ఆచరణాత్మక ఉదాహరణ ఉంటాయి.

curl అభ్యర్థనలు కంటెంట్ రకానికి సంబంధించిన ఎర్రర్ సందేశాన్ని అందించవచ్చు. ఎందుకంటే `--data` ఎంపిక కంటెంట్ రకాన్ని `application/x-www-form-urlencoded`కి సెట్ చేస్తుంది. మీ నోడ్ దీని గురించి ఫిర్యాదు చేస్తే, కాల్ ప్రారంభంలో `-H "Content-Type: application/json"` ఉంచడం ద్వారా హెడర్‌ను మాన్యువల్‌గా సెట్ చేయండి. ఉదాహరణలలో URL/IP & పోర్ట్ కలయిక కూడా చేర్చబడలేదు, ఇది curlకి ఇవ్వబడిన చివరి ఆర్గ్యుమెంట్ అయి ఉండాలి (ఉదా., `127.0.0.1:8545`). ఈ అదనపు డేటాతో కూడిన పూర్తి curl అభ్యర్థన క్రింది రూపాన్ని తీసుకుంటుంది:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## గాసిప్, స్థితి, చరిత్ర {#gossip-state-history}

కొన్ని ప్రధాన జేసన్-ఆర్‌పీసీ పద్ధతులకు ఎథీరియం నెట్‌వర్క్ నుండి డేటా అవసరం, మరియు ఇవి చక్కగా మూడు ప్రధాన వర్గాలుగా విభజించబడ్డాయి: _గాసిప్, స్థితి మరియు చరిత్ర_. ప్రతి పద్ధతికి వెళ్లడానికి ఈ విభాగాలలోని లింక్‌లను ఉపయోగించండి లేదా పద్ధతుల మొత్తం జాబితాను అన్వేషించడానికి విషయ సూచికను ఉపయోగించండి.

### గాసిప్ పద్ధతులు {#gossip-methods}

> ఈ పద్ధతులు చైన్ యొక్క హెడ్‌ను ట్రాక్ చేస్తాయి. లావాదేవీలు నెట్‌వర్క్ అంతటా ఎలా ప్రయాణిస్తాయి, బ్లాక్‌లలోకి ఎలా చేరుకుంటాయి మరియు కొత్త బ్లాక్‌ల గురించి క్లయింట్లు ఎలా తెలుసుకుంటారు అనేది దీని ద్వారానే జరుగుతుంది.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### స్థితి పద్ధతులు {#state-methods}

> నిల్వ చేయబడిన మొత్తం డేటా యొక్క ప్రస్తుత స్థితిని నివేదించే పద్ధతులు. "స్థితి" అనేది పంచుకోబడిన ఒక పెద్ద RAM లాంటిది, మరియు ఇందులో ఖాతా బ్యాలెన్స్‌లు, కాంట్రాక్ట్ డేటా మరియు గ్యాస్ అంచనాలు ఉంటాయి.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### చరిత్ర పద్ధతులు {#history-methods}

> ప్రారంభం (genesis) వరకు ఉన్న ప్రతి బ్లాక్ యొక్క చారిత్రక రికార్డులను పొందుతుంది. ఇది కేవలం జోడించడానికి మాత్రమే (append-only) వీలున్న ఒక పెద్ద ఫైల్ లాంటిది, మరియు ఇందులో అన్ని బ్లాక్ హెడర్‌లు, బ్లాక్ బాడీలు, అంకుల్ బ్లాక్‌లు మరియు లావాదేవీ రశీదులు ఉంటాయి.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## జేసన్-ఆర్‌పీసీ API ప్లేగ్రౌండ్ {#json-rpc-api-playground}

API పద్ధతులను కనుగొనడానికి మరియు ప్రయత్నించడానికి మీరు [ప్లేగ్రౌండ్ సాధనాన్ని](https://ethereum-json-rpc.com) ఉపయోగించవచ్చు. వివిధ నోడ్ ప్రొవైడర్లు ఏ పద్ధతులు మరియు నెట్‌వర్క్‌లకు మద్దతు ఇస్తారో కూడా ఇది మీకు చూపుతుంది.

## జేసన్-ఆర్‌పీసీ API మెథడ్స్ {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

ప్రస్తుత క్లయింట్ వెర్షన్‌ను తిరిగి ఇస్తుంది.

**పారామితులు**

ఏమీ లేవు

**రిటర్న్స్**

`String` - ప్రస్తుత క్లయింట్ వెర్షన్

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

### web3_sha3 {#web3-sha3}

ఇచ్చిన డేటా యొక్క కేకాక్-256 (ప్రామాణిక SHA3-256 _కాదు_) ను అందిస్తుంది.

**పారామితులు**

1. `DATA` - SHA3 హాష్‌గా మార్చాల్సిన డేటా

```js
params: ["0x68656c6c6f20776f726c64"]
```

**రిటర్న్‌లు**

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

### net_version {#net-version}

ప్రస్తుత నెట్‌వర్క్ idని తిరిగి ఇస్తుంది.

**పారామితులు**

ఏమీ లేవు

**రిటర్న్స్**

`String` - ప్రస్తుత నెట్‌వర్క్ id.

ప్రస్తుత నెట్‌వర్క్ IDల పూర్తి జాబితా [chainlist.org](https://chainlist.org) వద్ద అందుబాటులో ఉంది. కొన్ని సాధారణమైనవి:

- `1`: ఎథీరియం మెయిన్‌నెట్
- `11155111`: Sepolia టెస్ట్‌నెట్
- `560048` : Hoodi టెస్ట్‌నెట్

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

### net_listening {#net-listening}

క్లయింట్ నెట్‌వర్క్ కనెక్షన్‌ల కోసం చురుకుగా వింటున్నట్లయితే `true`ని అందిస్తుంది.

**పారామితులు**

ఏదీ లేదు

**రిటర్న్స్**

`Boolean` - వింటున్నప్పుడు `true`, లేకపోతే `false`.

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

### net_peerCount {#net-peercount}

ప్రస్తుతం క్లయింట్‌కు కనెక్ట్ చేయబడిన పీర్‌ల సంఖ్యను తిరిగి ఇస్తుంది.

**పారామితులు**

ఏమీ లేవు

**తిరిగి ఇచ్చేవి**

`QUANTITY` - కనెక్ట్ చేయబడిన పీర్‌ల సంఖ్యను సూచించే పూర్ణాంకం.

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

### eth_protocolVersion {#eth-protocolversion}

ప్రస్తుత ఎథీరియం ప్రోటోకాల్ వెర్షన్‌ను అందిస్తుంది. ఈ పద్ధతి [Geth‌లో అందుబాటులో లేదు](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) అని గమనించండి.

**పారామితులు**

ఏమీ లేవు

**రిటర్న్స్**

`String` - ప్రస్తుత ఎథీరియం ప్రోటోకాల్ వెర్షన్

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

### eth_syncing {#eth-syncing}

సమకాలీకరణ స్థితి గురించి డేటాతో కూడిన ఆబ్జెక్ట్‌ను లేదా `false`ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**అందించేవి**

ఖచ్చితమైన రిటర్న్ డేటా క్లయింట్ అమలుల మధ్య మారుతూ ఉంటుంది. నోడ్ సమకాలీకరణలో లేనప్పుడు అన్ని క్లయింట్‌లు `False`ని అందిస్తాయి మరియు అన్ని క్లయింట్‌లు కింది ఫీల్డ్‌లను అందిస్తాయి.

`Object|Boolean`, సమకాలీకరణ స్థితి డేటాతో కూడిన ఆబ్జెక్ట్ లేదా సమకాలీకరణలో లేనప్పుడు `FALSE`:

- `startingBlock`: `QUANTITY` - దిగుమతి ప్రారంభమైన బ్లాక్ (సమకాలీకరణ దాని హెడ్‌కు చేరుకున్న తర్వాత మాత్రమే రీసెట్ చేయబడుతుంది)
- `currentBlock`: `QUANTITY` - ప్రస్తుత బ్లాక్, eth_blockNumber వలె ఉంటుంది
- `highestBlock`: `QUANTITY` - అంచనా వేయబడిన అత్యధిక బ్లాక్

అయితే, వ్యక్తిగత క్లయింట్‌లు అదనపు డేటాను కూడా అందించవచ్చు. ఉదాహరణకు గెత్ కింది వాటిని అందిస్తుంది:

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

అదే బేసు కింది వాటిని అందిస్తుంది:

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

మరిన్ని వివరాల కోసం మీ నిర్దిష్ట క్లయింట్ డాక్యుమెంటేషన్‌ను చూడండి.

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
// లేదా సమకాలీకరణ చేయనప్పుడు
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

క్లయింట్ కాయిన్‌బేస్ చిరునామాను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

> **గమనిక:** ఈ పద్ధతి **v1.14.0** నుండి ఉపసంహరించబడింది మరియు దీనికి ఇకపై మద్దతు లేదు. ఈ పద్ధతిని ఉపయోగించడానికి ప్రయత్నిస్తే "Method not supported" ఎర్రర్ వస్తుంది.

**పారామితులు**

ఏమీ లేవు

**తిరిగి ఇచ్చేవి**

`DATA`, 20 బైట్‌లు - ప్రస్తుత కాయిన్‌బేస్ చిరునామా.

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

### eth_chainId {#eth-chainid}

రీప్లే-రక్షిత లావాదేవీలపై సంతకం చేయడానికి ఉపయోగించే చైన్ ID ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**రిటర్న్స్**

`chainId`, ప్రస్తుత చైన్ id యొక్క పూర్ణాంకాన్ని సూచించే స్ట్రింగ్‌గా హెక్సాడెసిమల్ విలువ.

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

### eth_mining {#eth-mining}

క్లయింట్ చురుకుగా కొత్త బ్లాక్‌లను మైనింగ్ చేస్తుంటే `true`ని అందిస్తుంది. ఇది ప్రూఫ్-ఆఫ్-వర్క్ నెట్‌వర్క్‌ల కోసం మాత్రమే `true`ని అందించగలదు మరియు [ది మెర్జ్](/roadmap/merge/) తర్వాత కొన్ని క్లయింట్‌లలో అందుబాటులో ఉండకపోవచ్చు.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**అందించేవి**

`Boolean` - క్లయింట్ మైనింగ్ చేస్తుంటే `true`ని అందిస్తుంది, లేకపోతే `false`ని అందిస్తుంది.

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

### eth_hashrate {#eth-hashrate}

నోడ్ మైనింగ్ చేస్తున్న సెకనుకు హాష్‌ల సంఖ్యను అందిస్తుంది. ఇది ప్రూఫ్-ఆఫ్-వర్క్ (PoW) నెట్‌వర్క్‌ల కోసం మాత్రమే `true`ని అందించగలదు మరియు [ది మెర్జ్](/roadmap/merge/) జరిగినప్పటి నుండి కొన్ని క్లయింట్‌లలో అందుబాటులో ఉండకపోవచ్చు.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**అందించేవి**

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

### eth_gasPrice {#eth-gasprice}

Wei లో ప్రస్తుత గ్యాస్ ధర యొక్క అంచనాను తిరిగి ఇస్తుంది. ఉదాహరణకు, బేసు క్లయింట్ గత 100 బ్లాక్‌లను పరిశీలిస్తుంది మరియు అప్రమేయంగా మధ్యగత గ్యాస్ యూనిట్ ధరను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**రిటర్న్స్**

`QUANTITY` - Wei లో ప్రస్తుత గ్యాస్ ధర యొక్క పూర్ణాంకం.

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

### eth_accounts {#eth-accounts}

క్లయింట్ స్వంతమైన చిరునామాల జాబితాను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**రిటర్న్స్**

`Array of DATA`, 20 బైట్‌లు - క్లయింట్ స్వంతమైన చిరునామాలు.

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

### eth_blockNumber {#eth-blocknumber}

అత్యంత తాజా బ్లాక్ సంఖ్యను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

ఏమీ లేవు

**తిరిగి ఇచ్చేవి**

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

### eth_getBalance {#eth-getbalance}

ఇచ్చిన చిరునామా వద్ద ఉన్న ఖాతా యొక్క బ్యాలెన్స్‌ను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్‌లు - బ్యాలెన్స్ కోసం తనిఖీ చేయాల్సిన చిరునామా.
2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా స్ట్రింగ్ `"latest"`, `"earliest"`, `"pending"`, `"safe"`, లేదా `"finalized"`, [బ్లాక్ పారామితిని](/developers/docs/apis/json-rpc/#block-parameter) చూడండి

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**రిటర్న్స్**

`QUANTITY` - Wei లో ప్రస్తుత బ్యాలెన్స్ యొక్క పూర్ణాంకం.

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

### eth_getStorageAt {#eth-getstorageat}

ఇచ్చిన చిరునామాలోని నిల్వ స్థానం నుండి విలువను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్‌లు - నిల్వ యొక్క చిరునామా.
2. `QUANTITY` - నిల్వలోని స్థానం యొక్క పూర్ణాంకం (integer).
3. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా స్ట్రింగ్ `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)ని చూడండి

**రిటర్న్స్**

`DATA` - ఈ నిల్వ స్థానం వద్ద ఉన్న విలువ.

**ఉదాహరణ**
సరైన స్థానాన్ని లెక్కించడం అనేది తిరిగి పొందాల్సిన నిల్వపై ఆధారపడి ఉంటుంది. `0x391694e7e0b0cce554cb130d723a9d27458f9298` చిరునామా ద్వారా `0x295a70b2de5e3953354a6a8344e616ed314d7251` వద్ద డిప్లాయ్ చేయబడిన కింది కాంట్రాక్ట్‌ను పరిశీలించండి.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

pos0 యొక్క విలువను తిరిగి పొందడం చాలా సులభం:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

మ్యాప్‌లోని ఒక మూలకాన్ని (element) తిరిగి పొందడం కష్టం. మ్యాప్‌లోని మూలకం యొక్క స్థానం దీనితో లెక్కించబడుతుంది:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

దీని అర్థం pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] పై నిల్వను తిరిగి పొందడానికి, మనం స్థానాన్ని దీనితో లెక్కించాలి:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

ఈ లెక్కింపు చేయడానికి Web3 లైబ్రరీతో వచ్చే గెత్ (geth) కన్సోల్‌ను ఉపయోగించవచ్చు:

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

### eth_getTransactionCount {#eth-gettransactioncount}

ఒక చిరునామా నుండి _పంపబడిన_ లావాదేవీల సంఖ్యను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పరామితులు**

1. `DATA`, 20 బైట్‌లు - చిరునామా.
2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా స్ట్రింగ్ `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"`, [బ్లాక్ పరామితి](/developers/docs/apis/json-rpc/#block-parameter)ని చూడండి

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // తాజా బ్లాక్ వద్ద స్థితి
]
```

**రిటర్న్స్**

`QUANTITY` - ఈ చిరునామా నుండి పంపబడిన లావాదేవీల సంఖ్య యొక్క పూర్ణాంకం.

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

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

ఇచ్చిన బ్లాక్ హాష్‌కి సరిపోలే బ్లాక్ నుండి లావాదేవీల సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క హాష్

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**అందించేవి**

`QUANTITY` - ఈ బ్లాక్‌లోని లావాదేవీల సంఖ్యను సూచించే పూర్ణాంకం.

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

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

ఇచ్చిన బ్లాక్ సంఖ్యకు సరిపోలే బ్లాక్‌లోని లావాదేవీల సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - బ్లాక్ సంఖ్య యొక్క పూర్ణాంకం, లేదా [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)లో ఉన్నట్లుగా `"earliest"`, `"latest"`, `"pending"`, `"safe"` లేదా `"finalized"` అనే స్ట్రింగ్.

```js
params: [
  "0x13738ca", // 20396234
]
```

**అందించేవి**

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

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

ఇచ్చిన బ్లాక్ హాష్‌కు సరిపోలే బ్లాక్ నుండి, ఆ బ్లాక్‌లోని అంకుల్స్ సంఖ్యను అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క హాష్

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**రిటర్న్స్**

`QUANTITY` - ఈ బ్లాక్‌లోని అంకుల్స్ సంఖ్యను సూచించే పూర్ణాంకం.

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

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

ఇచ్చిన బ్లాక్ సంఖ్యకు సరిపోలే బ్లాక్‌లోని అంకుల్స్ సంఖ్యను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పరామితులు**

1. `QUANTITY|TAG` - బ్లాక్ సంఖ్య యొక్క పూర్ణాంకం, లేదా `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"` అనే స్ట్రింగ్, [బ్లాక్ పరామితి](/developers/docs/apis/json-rpc/#block-parameter)ని చూడండి

```js
params: [
  "0xe8", // 232
]
```

**రిటర్న్స్**

`QUANTITY` - ఈ బ్లాక్‌లోని అంకుల్స్ సంఖ్యను సూచించే పూర్ణాంకం.

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

### eth_getCode {#eth-getcode}

ఇచ్చిన చిరునామా వద్ద ఉన్న కోడ్‌ను తిరిగి ఇస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 20 బైట్‌లు - చిరునామా
2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా స్ట్రింగ్ `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"`, [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)ని చూడండి

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**తిరిగి ఇచ్చేవి**

`DATA` - ఇచ్చిన చిరునామా నుండి కోడ్.

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

### eth_sign {#eth-sign}

sign పద్ధతి ఎథీరియం-నిర్దిష్ట సంతకాన్ని దీనితో లెక్కిస్తుంది: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

సందేశానికి ప్రిఫిక్స్‌ను జోడించడం ద్వారా లెక్కించిన సంతకాన్ని ఎథీరియం-నిర్దిష్ట సంతకంగా గుర్తించేలా చేస్తుంది. హానికరమైన వికేంద్రీకృత అప్లికేషన్ (dapp) ఏకపక్ష డేటాపై (ఉదా., లావాదేవీ) సంతకం చేసి, బాధితుడిలా నటించడానికి ఆ సంతకాన్ని ఉపయోగించే దుర్వినియోగాన్ని ఇది నిరోధిస్తుంది.

గమనిక: సంతకం చేయడానికి ఉపయోగించే చిరునామా తప్పనిసరిగా అన్‌లాక్ చేయబడి ఉండాలి.

**పారామితులు**

1. `DATA`, 20 బైట్‌లు - చిరునామా
2. `DATA`, N బైట్‌లు - సంతకం చేయాల్సిన సందేశం

**రిటర్న్‌లు**

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

### eth_signTransaction {#eth-signtransaction}

[eth_sendRawTransaction](#eth-sendrawtransaction) ఉపయోగించి తర్వాత నెట్‌వర్క్‌కు సమర్పించగల లావాదేవీపై సంతకం చేస్తుంది.

**పారామితులు**

1. `Object` - లావాదేవీ ఆబ్జెక్ట్

- `type`:
- `from`: `DATA`, 20 బైట్‌లు - లావాదేవీ పంపబడే చిరునామా.
- `to`: `DATA`, 20 బైట్‌లు - (కొత్త కాంట్రాక్ట్ సృష్టిస్తున్నప్పుడు ఐచ్ఛికం) లావాదేవీ నిర్దేశించబడిన చిరునామా.
- `gas`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: 90000) లావాదేవీ అమలు కోసం అందించబడిన గ్యాస్ యొక్క పూర్ణాంకం. ఇది ఉపయోగించని గ్యాస్‌ను తిరిగి ఇస్తుంది.
- `gasPrice`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: నిర్ణయించబడాలి) చెల్లించిన ప్రతి గ్యాస్‌కు ఉపయోగించే గ్యాస్ ధర (gasPrice) యొక్క పూర్ణాంకం, Wei లో.
- `value`: `QUANTITY` - (ఐచ్ఛికం) ఈ లావాదేవీతో పంపబడిన విలువ యొక్క పూర్ణాంకం, Wei లో.
- `data`: `DATA` - కాంట్రాక్ట్ యొక్క కంపైల్ చేయబడిన కోడ్ లేదా ప్రారంభించబడిన పద్ధతి సంతకం మరియు ఎన్‌కోడ్ చేయబడిన పారామితుల హాష్.
- `nonce`: `QUANTITY` - (ఐచ్ఛికం) నాన్స్ యొక్క పూర్ణాంకం. ఇదే నాన్స్‌ను ఉపయోగించే మీ స్వంత పెండింగ్ లావాదేవీలను ఓవర్‌రైట్ చేయడానికి ఇది అనుమతిస్తుంది.

**రిటర్న్‌లు**

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

### eth_sendTransaction {#eth-sendtransaction}

డేటా ఫీల్డ్‌లో కోడ్ ఉంటే, ఇది కొత్త సందేశ పిలుపు లావాదేవీని లేదా కాంట్రాక్ట్ సృష్టిని సృష్టిస్తుంది మరియు `from` లో పేర్కొన్న ఖాతాను ఉపయోగించి దానిపై సంతకం చేస్తుంది.

**పారామితులు**

1. `Object` - లావాదేవీ ఆబ్జెక్ట్

- `from`: `DATA`, 20 బైట్‌లు - లావాదేవీ పంపబడే చిరునామా.
- `to`: `DATA`, 20 బైట్‌లు - (కొత్త కాంట్రాక్ట్‌ను సృష్టిస్తున్నప్పుడు ఐచ్ఛికం) లావాదేవీ నిర్దేశించబడిన చిరునామా.
- `gas`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: 90000) లావాదేవీ అమలు కోసం అందించబడిన గ్యాస్ యొక్క పూర్ణాంకం. ఇది ఉపయోగించని గ్యాస్‌ను తిరిగి ఇస్తుంది.
- `gasPrice`: `QUANTITY` - (ఐచ్ఛికం, డిఫాల్ట్: నిర్ణయించబడాలి) చెల్లించిన ప్రతి గ్యాస్‌కు ఉపయోగించే గ్యాస్ ధర యొక్క పూర్ణాంకం.
- `value`: `QUANTITY` - (ఐచ్ఛికం) ఈ లావాదేవీతో పంపబడిన విలువ యొక్క పూర్ణాంకం.
- `input`: `DATA` - కాంట్రాక్ట్ యొక్క కంపైల్ చేసిన కోడ్ లేదా ప్రారంభించిన పద్ధతి సంతకం మరియు ఎన్‌కోడ్ చేసిన పారామితుల హాష్.
- `nonce`: `QUANTITY` - (ఐచ్ఛికం) నాన్స్ యొక్క పూర్ణాంకం. అదే నాన్స్‌ను ఉపయోగించే మీ స్వంత పెండింగ్ లావాదేవీలను ఓవర్‌రైట్ చేయడానికి ఇది అనుమతిస్తుంది.

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

**రిటర్న్‌లు**

`DATA`, 32 బైట్‌లు - లావాదేవీ హాష్, లేదా లావాదేవీ ఇంకా అందుబాటులో లేకపోతే జీరో హాష్.

మీరు కాంట్రాక్ట్‌ను సృష్టించినప్పుడు, లావాదేవీ ఒక బ్లాక్‌లో ప్రతిపాదించబడిన తర్వాత, కాంట్రాక్ట్ చిరునామాను పొందడానికి [eth_getTransactionReceipt](#eth-gettransactionreceipt) ని ఉపయోగించండి.

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

### eth_sendRawTransaction {#eth-sendrawtransaction}

సంతకం చేసిన లావాదేవీల కోసం కొత్త సందేశ పిలుపు లావాదేవీని లేదా కాంట్రాక్ట్ సృష్టిని సృష్టిస్తుంది.

**పారామితులు**

1. `DATA`, సంతకం చేసిన లావాదేవీ డేటా.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**రిటర్న్‌లు**

`DATA`, 32 బైట్‌లు - లావాదేవీ హాష్, లేదా లావాదేవీ ఇంకా అందుబాటులో లేకపోతే జీరో హాష్.

మీరు కాంట్రాక్ట్‌ను సృష్టించినప్పుడు, లావాదేవీ ఒక బ్లాక్‌లో ప్రతిపాదించబడిన తర్వాత కాంట్రాక్ట్ చిరునామాను పొందడానికి [eth_getTransactionReceipt](#eth-gettransactionreceipt) ని ఉపయోగించండి.

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

### eth_call {#eth-call}

బ్లాక్‌చైన్‌పై లావాదేవీని సృష్టించకుండా వెంటనే కొత్త సందేశ పిలుపును అమలు చేస్తుంది. చదవడానికి మాత్రమే (read-only) ఉండే స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లను అమలు చేయడానికి తరచుగా ఉపయోగించబడుతుంది, ఉదాహరణకు ERC-20 కాంట్రాక్ట్ కోసం `balanceOf`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ను ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `Object` - లావాదేవీ పిలుపు ఆబ్జెక్ట్

- `from`: `DATA`, 20 బైట్‌లు - (ఐచ్ఛికం) లావాదేవీ పంపబడే చిరునామా.
- `to`: `DATA`, 20 బైట్‌లు - లావాదేవీ నిర్దేశించబడిన చిరునామా.
- `gas`: `QUANTITY` - (ఐచ్ఛికం) లావాదేవీ అమలు కోసం అందించబడిన గ్యాస్ యొక్క పూర్ణాంకం (Integer). eth_call సున్నా గ్యాస్‌ను వినియోగిస్తుంది, కానీ కొన్ని అమలులకు ఈ పారామితి అవసరం కావచ్చు.
- `gasPrice`: `QUANTITY` - (ఐచ్ఛికం) చెల్లించిన ప్రతి గ్యాస్ కోసం ఉపయోగించే gasPrice యొక్క పూర్ణాంకం
- `value`: `QUANTITY` - (ఐచ్ఛికం) ఈ లావాదేవీతో పంపబడిన విలువ యొక్క పూర్ణాంకం
- `input`: `DATA` - (ఐచ్ఛికం) పద్ధతి సంతకం మరియు ఎన్‌కోడ్ చేయబడిన పారామితుల హాష్. వివరాల కోసం [Solidity డాక్యుమెంటేషన్‌లోని ఎథీరియం కాంట్రాక్ట్ ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)ని చూడండి.

2. `QUANTITY|TAG` - పూర్ణాంక బ్లాక్ సంఖ్య, లేదా స్ట్రింగ్ `"latest"`, `"earliest"`, `"pending"`, `"safe"` లేదా `"finalized"`, [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)ని చూడండి

**రిటర్న్‌లు**

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

### eth_estimateGas {#eth-estimategas}

లావాదేవీని పూర్తి చేయడానికి ఎంత గ్యాస్ అవసరమో అంచనాను రూపొందించి తిరిగి ఇస్తుంది. ఈ లావాదేవీ బ్లాక్‌చైన్‌కు జోడించబడదు. EVM మెకానిక్స్ మరియు నోడ్ పనితీరుతో సహా వివిధ కారణాల వల్ల, లావాదేవీ వాస్తవానికి ఉపయోగించే గ్యాస్ మొత్తం కంటే ఈ అంచనా గణనీయంగా ఎక్కువగా ఉండవచ్చని గమనించండి.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

అన్ని లక్షణాలు ఐచ్ఛికం అనే మినహాయింపుతో, [eth_call](#eth-call) పారామితులను చూడండి. గ్యాస్ పరిమితిని పేర్కొనకపోతే, పెండింగ్‌లో ఉన్న బ్లాక్ నుండి బ్లాక్ గ్యాస్ పరిమితిని geth ఎగువ పరిమితిగా ఉపయోగిస్తుంది. ఫలితంగా, గ్యాస్ మొత్తం పెండింగ్‌లో ఉన్న బ్లాక్ గ్యాస్ పరిమితి కంటే ఎక్కువగా ఉన్నప్పుడు, కాల్/లావాదేవీని అమలు చేయడానికి తిరిగి వచ్చిన అంచనా సరిపోకపోవచ్చు.

**తిరిగి ఇచ్చేవి**

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

### eth_getBlockByHash {#eth-getblockbyhash}

హాష్ ద్వారా బ్లాక్ గురించిన సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క హాష్.
2. `Boolean` - `true` అయితే ఇది పూర్తి లావాదేవీ ఆబ్జెక్ట్‌లను అందిస్తుంది, `false` అయితే లావాదేవీల హాష్‌లను మాత్రమే అందిస్తుంది.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**రిటర్న్స్**

`Object` - ఒక బ్లాక్ ఆబ్జెక్ట్, లేదా బ్లాక్ కనుగొనబడనప్పుడు `null`:

- `number`: `QUANTITY` - బ్లాక్ సంఖ్య. ఇది పెండింగ్ బ్లాక్ అయినప్పుడు `null`.
- `hash`: `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క హాష్. ఇది పెండింగ్ బ్లాక్ అయినప్పుడు `null`.
- `parentHash`: `DATA`, 32 బైట్‌లు - మాతృ (పేరెంట్) బ్లాక్ యొక్క హాష్.
- `nonce`: `DATA`, 8 బైట్‌లు - రూపొందించబడిన ప్రూఫ్-ఆఫ్-వర్క్ (PoW) యొక్క హాష్. ఇది పెండింగ్ బ్లాక్ అయినప్పుడు `null`, ప్రూఫ్-ఆఫ్-స్టేక్ (PoS) బ్లాక్‌ల కోసం (ది మెర్జ్ నుండి) `0x0`
- `sha3Uncles`: `DATA`, 32 బైట్‌లు - బ్లాక్‌లోని అంకుల్స్ (uncles) డేటా యొక్క SHA3.
- `logsBloom`: `DATA`, 256 బైట్‌లు - బ్లాక్ యొక్క లాగ్‌ల కోసం బ్లూమ్ ఫిల్టర్. ఇది పెండింగ్ బ్లాక్ అయినప్పుడు `null`.
- `transactionsRoot`: `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క లావాదేవీ ట్రై (trie) యొక్క రూట్.
- `stateRoot`: `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క తుది స్థితి ట్రై యొక్క రూట్.
- `receiptsRoot`: `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క రశీదుల ట్రై యొక్క రూట్.
- `miner`: `DATA`, 20 బైట్‌లు - బ్లాక్ రివార్డ్‌లు ఇవ్వబడిన లబ్ధిదారుని చిరునామా.
- `difficulty`: `QUANTITY` - ఈ బ్లాక్ యొక్క క్లిష్టతను సూచించే పూర్ణాంకం.
- `totalDifficulty`: `QUANTITY` - ఈ బ్లాక్ వరకు చైన్ యొక్క మొత్తం క్లిష్టతను సూచించే పూర్ణాంకం.
- `extraData`: `DATA` - ఈ బ్లాక్ యొక్క "అదనపు డేటా" ఫీల్డ్.
- `size`: `QUANTITY` - ఈ బ్లాక్ పరిమాణాన్ని బైట్‌లలో సూచించే పూర్ణాంకం.
- `gasLimit`: `QUANTITY` - ఈ బ్లాక్‌లో అనుమతించబడిన గరిష్ట గ్యాస్.
- `gasUsed`: `QUANTITY` - ఈ బ్లాక్‌లోని అన్ని లావాదేవీల ద్వారా ఉపయోగించబడిన మొత్తం గ్యాస్.
- `timestamp`: `QUANTITY` - బ్లాక్ క్రోడీకరించబడిన సమయానికి సంబంధించిన unix టైమ్‌స్టాంప్.
- `transactions`: `Array` - చివరగా ఇచ్చిన పారామితి ఆధారంగా లావాదేవీ ఆబ్జెక్ట్‌ల శ్రేణి (Array), లేదా 32 బైట్‌ల లావాదేవీ హాష్‌లు.
- `uncles`: `Array` - అంకుల్ (uncle) హాష్‌ల శ్రేణి.

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

### eth_getBlockByNumber {#eth-getblockbynumber}

బ్లాక్ నంబర్ ద్వారా బ్లాక్ గురించిన సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - బ్లాక్ నంబర్ యొక్క పూర్ణాంకం, లేదా [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)లో ఉన్నట్లుగా `"earliest"`, `"latest"`, `"pending"`, `"safe"` లేదా `"finalized"` అనే స్ట్రింగ్.
2. `Boolean` - `true` అయితే ఇది పూర్తి లావాదేవీ ఆబ్జెక్ట్‌లను అందిస్తుంది, `false` అయితే లావాదేవీల హాష్‌లను మాత్రమే అందిస్తుంది.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**రిటర్న్స్**
[eth_getBlockByHash](#eth-getblockbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

ఫలితం కోసం [eth_getBlockByHash](#eth-getblockbyhash) చూడండి

### eth_getTransactionByHash {#eth-gettransactionbyhash}

లావాదేవీ హాష్ ద్వారా అభ్యర్థించిన లావాదేవీ గురించిన సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - లావాదేవీ యొక్క హాష్

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**రిటర్న్‌లు**

`Object` - ఒక లావాదేవీ ఆబ్జెక్ట్, లేదా లావాదేవీ కనుగొనబడనప్పుడు `null`:

- `blockHash`: `DATA`, 32 బైట్‌లు - ఈ లావాదేవీ ఉన్న బ్లాక్ యొక్క హాష్. ఇది పెండింగ్‌లో ఉన్నప్పుడు `null`.
- `blockNumber`: `QUANTITY` - ఈ లావాదేవీ ఉన్న బ్లాక్ నంబర్. ఇది పెండింగ్‌లో ఉన్నప్పుడు `null`.
- `from`: `DATA`, 20 బైట్‌లు - పంపినవారి చిరునామా.
- `gas`: `QUANTITY` - పంపినవారు అందించిన గ్యాస్.
- `gasPrice`: `QUANTITY` - పంపినవారు Weiలో అందించిన గ్యాస్ ధర.
- `hash`: `DATA`, 32 బైట్‌లు - లావాదేవీ యొక్క హాష్.
- `input`: `DATA` - లావాదేవీతో పాటు పంపబడిన డేటా.
- `nonce`: `QUANTITY` - దీనికి ముందు పంపినవారు చేసిన లావాదేవీల సంఖ్య.
- `to`: `DATA`, 20 బైట్‌లు - స్వీకరించే వారి చిరునామా. ఇది కాంట్రాక్ట్ సృష్టి లావాదేవీ అయినప్పుడు `null`.
- `transactionIndex`: `QUANTITY` - బ్లాక్‌లో లావాదేవీల సూచిక స్థానం యొక్క పూర్ణాంకం. ఇది పెండింగ్‌లో ఉన్నప్పుడు `null`.
- `value`: `QUANTITY` - Weiలో బదిలీ చేయబడిన విలువ.
- `v`: `QUANTITY` - ECDSA రికవరీ id
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

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

బ్లాక్ హాష్ మరియు లావాదేవీ సూచిక స్థానం ద్వారా ఒక లావాదేవీ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క హాష్.
2. `QUANTITY` - లావాదేవీ సూచిక స్థానం యొక్క పూర్ణాంకం.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**రిటర్న్స్**
[eth_getTransactionByHash](#eth-gettransactionbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ఫలితం కోసం [eth_getTransactionByHash](#eth-gettransactionbyhash) చూడండి

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

బ్లాక్ సంఖ్య మరియు లావాదేవీ సూచిక స్థానాన్ని బట్టి ఒక లావాదేవీ గురించిన సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ సంఖ్య, లేదా [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)లో ఉన్నట్లుగా `"earliest"`, `"latest"`, `"pending"`, `"safe"` లేదా `"finalized"` అనే స్ట్రింగ్.
2. `QUANTITY` - లావాదేవీ సూచిక స్థానం.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**రిటర్న్స్**
[eth_getTransactionByHash](#eth-gettransactionbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

ఫలితం కోసం [eth_getTransactionByHash](#eth-gettransactionbyhash) చూడండి

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

లావాదేవీ హాష్ ద్వారా లావాదేవీ యొక్క రశీదును అందిస్తుంది.

**గమనిక** పెండింగ్‌లో ఉన్న లావాదేవీలకు రశీదు అందుబాటులో ఉండదు.

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - లావాదేవీ యొక్క హాష్

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**అందించేవి**
`Object` - లావాదేవీ రశీదు ఆబ్జెక్ట్, లేదా రశీదు కనుగొనబడనప్పుడు `null`:

- `transactionHash `: `DATA`, 32 బైట్‌లు - లావాదేవీ యొక్క హాష్.
- `transactionIndex`: `QUANTITY` - బ్లాక్‌లో లావాదేవీల సూచిక స్థానం యొక్క పూర్ణాంకం.
- `blockHash`: `DATA`, 32 బైట్‌లు - ఈ లావాదేవీ ఉన్న బ్లాక్ యొక్క హాష్.
- `blockNumber`: `QUANTITY` - ఈ లావాదేవీ ఉన్న బ్లాక్ నంబర్.
- `from`: `DATA`, 20 బైట్‌లు - పంపినవారి చిరునామా.
- `to`: `DATA`, 20 బైట్‌లు - స్వీకరించే వారి చిరునామా. ఇది కాంట్రాక్ట్ సృష్టి లావాదేవీ అయినప్పుడు null అవుతుంది.
- `cumulativeGasUsed` : `QUANTITY ` - బ్లాక్‌లో ఈ లావాదేవీ అమలు చేయబడినప్పుడు ఉపయోగించిన మొత్తం గ్యాస్.
- `effectiveGasPrice` : `QUANTITY` - గ్యాస్ యూనిట్‌కు చెల్లించిన ప్రాథమిక రుసుము మరియు టిప్ మొత్తం.
- `gasUsed `: `QUANTITY ` - ఈ నిర్దిష్ట లావాదేవీ ద్వారా మాత్రమే ఉపయోగించబడిన గ్యాస్ మొత్తం.
- `contractAddress `: `DATA`, 20 బైట్‌లు - లావాదేవీ కాంట్రాక్ట్ సృష్టి అయితే, సృష్టించబడిన కాంట్రాక్ట్ చిరునామా, లేకపోతే `null`.
- `logs`: `Array` - ఈ లావాదేవీ ద్వారా రూపొందించబడిన లాగ్ ఆబ్జెక్ట్‌ల శ్రేణి.
- `logsBloom`: `DATA`, 256 బైట్‌లు - సంబంధిత లాగ్‌లను త్వరగా తిరిగి పొందడానికి లైట్ క్లయింట్‌ల కోసం బ్లూమ్ ఫిల్టర్.
- `type`: `QUANTITY` - లావాదేవీ రకం యొక్క పూర్ణాంకం, లెగసీ లావాదేవీల కోసం `0x0`, యాక్సెస్ జాబితా రకాల కోసం `0x1`, డైనమిక్ ఫీజుల కోసం `0x2`.

ఇది వీటిలో _ఏదో ఒకదాన్ని_ కూడా అందిస్తుంది:

- `root` : `DATA` లావాదేవీ అనంతర స్థితి రూట్ యొక్క 32 బైట్‌లు (బైజాంటియమ్‌కు ముందు)
- `status`: `QUANTITY` `1` (విజయం) లేదా `0` (వైఫల్యం)

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
    "contractAddress": null, // అది సృష్టించబడితే చిరునామా యొక్క స్ట్రింగ్
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs, మొదలైన వాటి ద్వారా అందించబడిన లాగ్‌లు
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

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

హాష్ మరియు అంకుల్ సూచిక స్థానం ఆధారంగా ఒక బ్లాక్ యొక్క అంకుల్ గురించిన సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `DATA`, 32 బైట్‌లు - బ్లాక్ యొక్క హాష్.
2. `QUANTITY` - అంకుల్ యొక్క సూచిక స్థానం.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**రిటర్న్స్**
[eth_getBlockByHash](#eth-getblockbyhash) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ఫలితం కోసం [eth_getBlockByHash](#eth-getblockbyhash) చూడండి

**గమనిక**: అంకుల్ వ్యక్తిగత లావాదేవీలను కలిగి ఉండదు.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

బ్లాక్ నంబర్ మరియు అంకుల్ సూచిక స్థానం ఆధారంగా ఒక బ్లాక్ యొక్క అంకుల్ గురించి సమాచారాన్ని అందిస్తుంది.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  ప్లేగ్రౌండ్‌లో ఎండ్‌పాయింట్‌ని ప్రయత్నించండి
</ButtonLink>

**పారామితులు**

1. `QUANTITY|TAG` - ఒక బ్లాక్ నంబర్, లేదా [బ్లాక్ పారామితి](/developers/docs/apis/json-rpc/#block-parameter)లో ఉన్నట్లుగా `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"` అనే స్ట్రింగ్.
2. `QUANTITY` - అంకుల్ యొక్క సూచిక స్థానం.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**రిటర్న్స్**
[eth_getBlockByHash](#eth-getblockbyhash) చూడండి

**గమనిక**: ఒక అంకుల్ వ్యక్తిగత లావాదేవీలను కలిగి ఉండదు.

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

ఫలితం కోసం [eth_getBlockByHash](#eth-getblockbyhash) చూడండి

### eth_newFilter {#eth-newfilter}

స్థితి మారినప్పుడు (లాగ్‌లు) తెలియజేయడానికి, ఫిల్టర్ ఎంపికల ఆధారంగా ఫిల్టర్ ఆబ్జెక్ట్‌ను సృష్టిస్తుంది.
స్థితి మారిందో లేదో తనిఖీ చేయడానికి, [eth_getFilterChanges](#eth-getfilterchanges)కి కాల్ చేయండి.

**టాపిక్ ఫిల్టర్‌లను పేర్కొనడంపై ఒక గమనిక:**
టాపిక్‌లు క్రమంపై ఆధారపడి ఉంటాయి. [A, B] టాపిక్‌లతో లాగ్ ఉన్న లావాదేవీ కింది టాపిక్ ఫిల్టర్‌లతో సరిపోలుతుంది:

- `[]` "ఏదైనా"
- `[A]` "మొదటి స్థానంలో A (మరియు ఆ తర్వాత ఏదైనా)"
- `[null, B]` "మొదటి స్థానంలో ఏదైనా మరియు రెండవ స్థానంలో B (మరియు ఆ తర్వాత ఏదైనా)"
- `[A, B]` "మొదటి స్థానంలో A మరియు రెండవ స్థానంలో B (మరియు ఆ తర్వాత ఏదైనా)"
- `[[A, B], [A, B]]` "మొదటి స్థానంలో (A లేదా B) మరియు రెండవ స్థానంలో (A లేదా B) (మరియు ఆ తర్వాత ఏదైనా)"
- **పారామితులు**

1. `Object` - ఫిల్టర్ ఎంపికలు:

- `fromBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా ప్రతిపాదించిన చివరి బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారైన బ్లాక్ కోసం `"finalized"`, లేదా ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా ప్రతిపాదించిన చివరి బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారైన బ్లాక్ కోసం `"finalized"`, లేదా ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 బైట్‌లు - (ఐచ్ఛికం) లాగ్‌లు ఉద్భవించాల్సిన కాంట్రాక్ట్ చిరునామా లేదా చిరునామాల జాబితా.
- `topics`: `Array of DATA`, - (ఐచ్ఛికం) 32 బైట్‌ల `DATA` టాపిక్‌ల శ్రేణి. టాపిక్‌లు క్రమంపై ఆధారపడి ఉంటాయి. ప్రతి టాపిక్ "లేదా" ఎంపికలతో కూడిన డేటా శ్రేణి కూడా కావచ్చు.

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

**రిటర్న్స్**
`QUANTITY` - ఫిల్టర్ ఐడి.

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

### eth_newBlockFilter {#eth-newblockfilter}

కొత్త బ్లాక్ వచ్చినప్పుడు తెలియజేయడానికి, నోడ్‌లో ఫిల్టర్‌ను సృష్టిస్తుంది.
స్థితి మారిందో లేదో తనిఖీ చేయడానికి, [eth_getFilterChanges](#eth-getfilterchanges)ని కాల్ చేయండి.

**పారామితులు**
ఏమీ లేవు

**రిటర్న్స్**
`QUANTITY` - ఫిల్టర్ ఐడీ.

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

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

కొత్త పెండింగ్ లావాదేవీలు వచ్చినప్పుడు తెలియజేయడానికి, నోడ్‌లో ఒక ఫిల్టర్‌ను సృష్టిస్తుంది.
స్థితి మారిందో లేదో తనిఖీ చేయడానికి, [eth_getFilterChanges](#eth-getfilterchanges)కి కాల్ చేయండి.

**పారామితులు**
ఏమీ లేవు

**రిటర్న్స్**
`QUANTITY` - ఒక ఫిల్టర్ ID.

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

### eth_uninstallFilter {#eth-uninstallfilter}

ఇచ్చిన ఐడీ గల ఫిల్టర్‌ను అన్‌ఇన్‌స్టాల్ చేస్తుంది. వాచ్ (watch) ఇకపై అవసరం లేనప్పుడు దీనిని ఎల్లప్పుడూ కాల్ చేయాలి.
అదనంగా, కొంత సమయం పాటు [eth_getFilterChanges](#eth-getfilterchanges) తో అభ్యర్థించబడనప్పుడు ఫిల్టర్‌లు టైమ్‌అవుట్ అవుతాయి.

**పారామితులు**

1. `QUANTITY` - ఫిల్టర్ ఐడీ.

```js
params: [
  "0xb", // 11
]
```

**రిటర్న్‌లు**
`Boolean` - ఫిల్టర్ విజయవంతంగా అన్‌ఇన్‌స్టాల్ చేయబడితే `true`, లేకపోతే `false`.

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

### eth_getFilterChanges {#eth-getfilterchanges}

ఫిల్టర్ కోసం పోలింగ్ పద్ధతి, ఇది గత పోల్ నుండి సంభవించిన లాగ్‌ల శ్రేణిని అందిస్తుంది.

**పారామితులు**

1. `QUANTITY` - ఫిల్టర్ ఐడి.

```js
params: [
  "0x16", // 22
]
```

**రిటర్న్స్**
`Array` - లాగ్ ఆబ్జెక్ట్‌ల శ్రేణి, లేదా గత పోల్ నుండి ఏమీ మారకపోతే ఖాళీ శ్రేణి.

- `eth_newBlockFilter` తో సృష్టించబడిన ఫిల్టర్‌ల కోసం అందించేవి బ్లాక్ హాష్‌లు (`DATA`, 32 బైట్‌లు), ఉదా., `["0x3454645634534..."]`.
- `eth_newPendingTransactionFilter ` తో సృష్టించబడిన ఫిల్టర్‌ల కోసం అందించేవి లావాదేవీ హాష్‌లు (`DATA`, 32 బైట్‌లు), ఉదా., `["0x6345343454645..."]`.
- `eth_newFilter` తో సృష్టించబడిన ఫిల్టర్‌ల కోసం లాగ్‌లు కింది పారామితులతో కూడిన ఆబ్జెక్ట్‌లు:
  - `removed`: `TAG` - చైన్ పునర్‌వ్యవస్థీకరణ కారణంగా లాగ్ తీసివేయబడినప్పుడు `true`. ఇది చెల్లుబాటు అయ్యే లాగ్ అయితే `false`.
  - `logIndex`: `QUANTITY` - బ్లాక్‌లోని లాగ్ సూచిక స్థానం యొక్క పూర్ణాంకం. ఇది పెండింగ్ లాగ్ అయినప్పుడు `null`.
  - `transactionIndex`: `QUANTITY` - లాగ్ సృష్టించబడిన లావాదేవీల సూచిక స్థానం యొక్క పూర్ణాంకం. ఇది పెండింగ్ లాగ్ అయినప్పుడు `null`.
  - `transactionHash`: `DATA`, 32 బైట్‌లు - ఈ లాగ్ సృష్టించబడిన లావాదేవీల హాష్. ఇది పెండింగ్ లాగ్ అయినప్పుడు `null`.
  - `blockHash`: `DATA`, 32 బైట్‌లు - ఈ లాగ్ ఉన్న బ్లాక్ యొక్క హాష్. ఇది పెండింగ్‌లో ఉన్నప్పుడు `null`. ఇది పెండింగ్ లాగ్ అయినప్పుడు `null`.
  - `blockNumber`: `QUANTITY` - ఈ లాగ్ ఉన్న బ్లాక్ నంబర్. ఇది పెండింగ్‌లో ఉన్నప్పుడు `null`. ఇది పెండింగ్ లాగ్ అయినప్పుడు `null`.
  - `address`: `DATA`, 20 బైట్‌లు - ఈ లాగ్ ఉద్భవించిన చిరునామా.
  - `data`: `DATA` - వేరియబుల్-పొడవు నాన్-ఇండెక్స్డ్ లాగ్ డేటా. (_solidity_ లో: సున్నా లేదా అంతకంటే ఎక్కువ 32 బైట్‌ల నాన్-ఇండెక్స్డ్ లాగ్ ఆర్గ్యుమెంట్‌లు.)
  - `topics`: `Array of DATA` - ఇండెక్స్ చేయబడిన లాగ్ ఆర్గ్యుమెంట్‌ల యొక్క 0 నుండి 4 వరకు 32 బైట్‌ల `DATA` శ్రేణి. (_solidity_ లో: మీరు ఈవెంట్‌ను `anonymous` స్పెసిఫైయర్‌తో డిక్లేర్ చేస్తే తప్ప, మొదటి టాపిక్ అనేది ఈవెంట్ యొక్క సంతకం యొక్క _హాష్_ (ఉదా., `Deposit(address,bytes32,uint256)`).)

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

### eth_getFilterLogs {#eth-getfilterlogs}

ఇచ్చిన id తో ఫిల్టర్‌కు సరిపోలే అన్ని లాగ్‌ల శ్రేణిని తిరిగి ఇస్తుంది.

**పారామితులు**

1. `QUANTITY` - ఫిల్టర్ id.

```js
params: [
  "0x16", // 22
]
```

**రిటర్న్స్**
[eth_getFilterChanges](#eth-getfilterchanges) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

ఫలితం కోసం [eth_getFilterChanges](#eth-getfilterchanges) చూడండి

### eth_getLogs {#eth-getlogs}

ఇచ్చిన ఫిల్టర్ ఆబ్జెక్ట్‌కు సరిపోలే అన్ని లాగ్‌ల శ్రేణిని అందిస్తుంది.

**పారామితులు**

1. `Object` - ఫిల్టర్ ఎంపికలు:

- `fromBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా ప్రతిపాదించిన చివరి బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారైన బ్లాక్ కోసం `"finalized"`, లేదా ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (ఐచ్ఛికం, డిఫాల్ట్: `"latest"`) పూర్ణాంక బ్లాక్ సంఖ్య, లేదా ప్రతిపాదించిన చివరి బ్లాక్ కోసం `"latest"`, తాజా సురక్షిత బ్లాక్ కోసం `"safe"`, తాజా ఖరారైన బ్లాక్ కోసం `"finalized"`, లేదా ఇంకా బ్లాక్‌లో లేని లావాదేవీల కోసం `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 బైట్‌లు - (ఐచ్ఛికం) కాంట్రాక్ట్ చిరునామా లేదా లాగ్‌లు ఉద్భవించాల్సిన చిరునామాల జాబితా.
- `topics`: `Array of DATA`, - (ఐచ్ఛికం) 32 బైట్‌ల `DATA` అంశాల శ్రేణి. అంశాలు క్రమంపై ఆధారపడి ఉంటాయి. ప్రతి అంశం "or" ఎంపికలతో కూడిన DATA శ్రేణి కూడా కావచ్చు.
- `blockHash`: `DATA`, 32 బైట్‌లు - (ఐచ్ఛికం, **భవిష్యత్తులో**) EIP-234 చేరికతో, `blockHash` అనేది ఒక కొత్త ఫిల్టర్ ఎంపిక అవుతుంది, ఇది అందించబడే లాగ్‌లను 32-బైట్ హాష్ `blockHash` ఉన్న ఒకే బ్లాక్‌కు పరిమితం చేస్తుంది. `blockHash` ఉపయోగించడం అనేది `fromBlock` = `toBlock` = హాష్ `blockHash` ఉన్న బ్లాక్ సంఖ్యకు సమానం. ఫిల్టర్ ప్రమాణాలలో `blockHash` ఉంటే, అప్పుడు `fromBlock` లేదా `toBlock` రెండూ అనుమతించబడవు.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**అందించేవి**
[eth_getFilterChanges](#eth-getfilterchanges) చూడండి

**ఉదాహరణ**

```js
// అభ్యర్థన
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

ఫలితం కోసం [eth_getFilterChanges](#eth-getfilterchanges) చూడండి

## వాడుక ఉదాహరణ {#usage-example}

### జేసన్-ఆర్‌పీసీని ఉపయోగించి కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడం {#deploying-contract}

ఈ విభాగం కేవలం RPC ఇంటర్‌ఫేస్‌ను మాత్రమే ఉపయోగించి కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలో చూపే ప్రదర్శనను కలిగి ఉంటుంది. ఈ సంక్లిష్టతను దాచిపెట్టి కాంట్రాక్ట్‌లను డిప్లాయ్ చేయడానికి ప్రత్యామ్నాయ మార్గాలు ఉన్నాయి—ఉదాహరణకు, RPC ఇంటర్‌ఫేస్ పైన నిర్మించబడిన [Web3.js](https://web3js.readthedocs.io/) మరియు [Web3.py](https://github.com/ethereum/web3.py) వంటి లైబ్రరీలను ఉపయోగించడం. ఈ అబ్‌స్ట్రాక్షన్‌లు సాధారణంగా అర్థం చేసుకోవడానికి సులభంగా ఉంటాయి మరియు తక్కువ లోపాలకు దారితీస్తాయి, కానీ అంతర్గతంగా (under the hood) ఏమి జరుగుతుందో అర్థం చేసుకోవడం ఇప్పటికీ సహాయకరంగా ఉంటుంది.

కిందిది `Multiply7` అని పిలువబడే ఒక సరళమైన స్మార్ట్ కాంట్రాక్ట్, ఇది జేసన్-ఆర్‌పీసీ ఇంటర్‌ఫేస్‌ను ఉపయోగించి ఎథీరియం నోడ్‌కు డిప్లాయ్ చేయబడుతుంది. చదివేవారు ఇప్పటికే Geth నోడ్‌ను రన్ చేస్తున్నారని ఈ ట్యుటోరియల్ భావిస్తుంది. నోడ్‌లు మరియు క్లయింట్‌ల గురించి మరింత సమాచారం [ఇక్కడ](/developers/docs/nodes-and-clients/run-a-node) అందుబాటులో ఉంది. Geth కాని క్లయింట్‌ల కోసం HTTP జేసన్-ఆర్‌పీసీని ఎలా ప్రారంభించాలో చూడటానికి దయచేసి వ్యక్తిగత [క్లయింట్](/developers/docs/nodes-and-clients/) డాక్యుమెంటేషన్‌ను చూడండి. చాలా క్లయింట్‌లు అప్రమేయంగా `localhost:8545` పై సేవలందిస్తాయి.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

ముందుగా చేయవలసినది HTTP RPC ఇంటర్‌ఫేస్ ప్రారంభించబడిందని నిర్ధారించుకోవడం. అంటే మనం ప్రారంభించేటప్పుడు Gethకి `--http` ఫ్లాగ్‌ను అందిస్తాము. ఈ ఉదాహరణలో మనం ప్రైవేట్ డెవలప్‌మెంట్ చైన్‌లో Geth నోడ్‌ను ఉపయోగిస్తాము. ఈ విధానాన్ని ఉపయోగించడం ద్వారా మనకు నిజమైన నెట్‌వర్క్‌లో ఈథర్ అవసరం లేదు.

```bash
geth --http --dev console 2>>geth.log
```

ఇది `http://localhost:8545` పై HTTP RPC ఇంటర్‌ఫేస్‌ను ప్రారంభిస్తుంది.

[curl](https://curl.se) ఉపయోగించి కాయిన్‌బేస్ చిరునామాను (ఖాతాల శ్రేణి నుండి మొదటి చిరునామాను పొందడం ద్వారా) మరియు బ్యాలెన్స్‌ను తిరిగి పొందడం ద్వారా ఇంటర్‌ఫేస్ రన్ అవుతోందని మనం ధృవీకరించవచ్చు. ఈ ఉదాహరణలలోని డేటా మీ స్థానిక నోడ్‌లో భిన్నంగా ఉంటుందని దయచేసి గమనించండి. మీరు ఈ ఆదేశాలను ప్రయత్నించాలనుకుంటే, రెండవ curl అభ్యర్థనలోని అభ్యర్థన పారామితులను మొదటి దాని నుండి వచ్చిన ఫలితంతో భర్తీ చేయండి.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

సంఖ్యలు హెక్స్ ఎన్‌కోడ్ చేయబడినందున, బ్యాలెన్స్ హెక్స్ స్ట్రింగ్‌గా Weiలో తిరిగి ఇవ్వబడుతుంది. మనం బ్యాలెన్స్‌ను ఈథర్‌లో ఒక సంఖ్యగా పొందాలనుకుంటే, Geth కన్సోల్ నుండి web3ని ఉపయోగించవచ్చు.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

ఇప్పుడు మన ప్రైవేట్ డెవలప్‌మెంట్ చైన్‌లో కొంత ఈథర్ ఉన్నందున, మనం కాంట్రాక్ట్‌ను డిప్లాయ్ చేయవచ్చు. EVMకి పంపగల బైట్‌కోడ్‌గా Multiply7 కాంట్రాక్ట్‌ను కంపైలింగ్ చేయడం మొదటి దశ. Solidity కంపైలర్ అయిన solcని ఇన్‌స్టాల్ చేయడానికి, [Solidity డాక్యుమెంటేషన్](https://docs.soliditylang.org/en/latest/installing-solidity.html)ను అనుసరించండి. ([మన ఉదాహరణ కోసం ఉపయోగించిన కంపైలర్ వెర్షన్](https://github.com/ethereum/solidity/releases/tag/v0.4.20)తో సరిపోలడానికి మీరు పాత `solc` విడుదలను ఉపయోగించాలనుకోవచ్చు.)

తదుపరి దశ Multiply7 కాంట్రాక్ట్‌ను EVMకి పంపగల బైట్‌కోడ్‌గా కంపైలింగ్ చేయడం.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

ఇప్పుడు మన వద్ద కంపైల్ చేయబడిన కోడ్ ఉన్నందున, దాన్ని డిప్లాయ్ చేయడానికి ఎంత గ్యాస్ ఖర్చవుతుందో మనం నిర్ణయించాలి. RPC ఇంటర్‌ఫేస్‌లో `eth_estimateGas` పద్ధతి ఉంది, అది మనకు అంచనాను ఇస్తుంది.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

మరియు చివరగా కాంట్రాక్ట్‌ను డిప్లాయ్ చేయండి.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

లావాదేవీ నోడ్ ద్వారా అంగీకరించబడుతుంది మరియు లావాదేవీ హాష్ తిరిగి ఇవ్వబడుతుంది. లావాదేవీని ట్రాక్ చేయడానికి ఈ హాష్‌ను ఉపయోగించవచ్చు. మన కాంట్రాక్ట్ ఎక్కడ డిప్లాయ్ చేయబడిందో ఆ చిరునామాను నిర్ణయించడం తదుపరి దశ. అమలు చేయబడిన ప్రతి లావాదేవీ ఒక రశీదును సృష్టిస్తుంది. ఈ రశీదులో లావాదేవీ ఏ బ్లాక్‌లో చేర్చబడింది మరియు EVM ద్వారా ఎంత గ్యాస్ ఉపయోగించబడింది వంటి లావాదేవీకి సంబంధించిన వివిధ సమాచారం ఉంటుంది. ఒక లావాదేవీ కాంట్రాక్ట్‌ను సృష్టిస్తే, అది కాంట్రాక్ట్ చిరునామాను కూడా కలిగి ఉంటుంది. మనం `eth_getTransactionReceipt` RPC పద్ధతితో రశీదును తిరిగి పొందవచ్చు.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

మన కాంట్రాక్ట్ `0x4d03d617d700cf81935d7f797f4e2ae719648262` పై సృష్టించబడింది. రశీదుకు బదులుగా శూన్య (null) ఫలితం వస్తే, లావాదేవీ ఇంకా బ్లాక్‌లో చేర్చబడలేదని అర్థం. కాసేపు వేచి ఉండి, మీ ఏకాభిప్రాయ క్లయింట్ రన్ అవుతోందో లేదో తనిఖీ చేసి, మళ్లీ ప్రయత్నించండి.

#### స్మార్ట్ కాంట్రాక్ట్‌లతో పరస్పర చర్య చేయడం {#interacting-with-smart-contract}

ఈ ఉదాహరణలో మనం కాంట్రాక్ట్ యొక్క `multiply` పద్ధతికి `eth_sendTransaction` ఉపయోగించి లావాదేవీని పంపుతాము.

`eth_sendTransaction` కి అనేక ఆర్గ్యుమెంట్‌లు అవసరం, ప్రత్యేకంగా `from`, `to` మరియు `data`. `From` అనేది మన ఖాతా యొక్క పబ్లిక్ చిరునామా, మరియు `to` అనేది కాంట్రాక్ట్ చిరునామా. `data` ఆర్గ్యుమెంట్ ఏ పద్ధతిని పిలవాలి మరియు ఏ ఆర్గ్యుమెంట్‌లతో పిలవాలి అని నిర్వచించే పేలోడ్‌ను కలిగి ఉంటుంది. ఇక్కడే [ABI (అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్)](https://docs.soliditylang.org/en/latest/abi-spec.html) తెరపైకి వస్తుంది. ABI అనేది EVM కోసం డేటాను ఎలా నిర్వచించాలి మరియు ఎన్‌కోడ్ చేయాలో నిర్వచించే JSON ఫైల్.

పేలోడ్ యొక్క బైట్‌లు కాంట్రాక్ట్‌లో ఏ పద్ధతిని పిలుస్తాయో నిర్వచిస్తాయి. ఇది ఫంక్షన్ పేరు మరియు దాని ఆర్గ్యుమెంట్ రకాలపై కేకాక్ హాష్ (Keccak hash) నుండి మొదటి 4 బైట్‌లు, హెక్స్ ఎన్‌కోడ్ చేయబడింది. మల్టిప్లై (multiply) ఫంక్షన్ uintని అంగీకరిస్తుంది, ఇది uint256కి మారుపేరు. ఇది మనకు దీన్ని ఇస్తుంది:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

తదుపరి దశ ఆర్గ్యుమెంట్‌లను ఎన్‌కోడ్ చేయడం. కేవలం ఒక uint256 మాత్రమే ఉంది, ఉదాహరణకు, విలువ 6. uint256 రకాలను ఎలా ఎన్‌కోడ్ చేయాలో పేర్కొనే విభాగం ABIలో ఉంది.

`int<M>: enc(X)` అనేది X యొక్క బిగ్-ఎండియన్ టూస్ కాంప్లిమెంట్ ఎన్‌కోడింగ్, ఇది ప్రతికూల X కోసం 0xffతో మరియు సానుకూల X కోసం సున్నా బైట్‌లతో అధిక-క్రమం (ఎడమ) వైపున ప్యాడ్ చేయబడుతుంది, తద్వారా పొడవు 32 బైట్‌ల గుణకం అవుతుంది.

ఇది `0000000000000000000000000000000000000000000000000000000000000006` కి ఎన్‌కోడ్ అవుతుంది.

ఫంక్షన్ సెలెక్టర్ మరియు ఎన్‌కోడ్ చేయబడిన ఆర్గ్యుమెంట్‌ను కలపడం ద్వారా మన డేటా `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` అవుతుంది.

దీన్ని ఇప్పుడు నోడ్‌కు పంపవచ్చు:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

లావాదేవీ పంపబడినందున, లావాదేవీ హాష్ తిరిగి ఇవ్వబడింది. రశీదును తిరిగి పొందడం ద్వారా ఇది వస్తుంది:

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

రశీదులో ఒక లాగ్ ఉంటుంది. ఈ లాగ్ లావాదేవీ అమలు సమయంలో EVM ద్వారా రూపొందించబడింది మరియు రశీదులో చేర్చబడింది. `multiply` ఫంక్షన్ ఇన్‌పుట్‌ను 7తో గుణించి `Print` ఈవెంట్ లేవనెత్తబడిందని చూపుతుంది. `Print` ఈవెంట్ కోసం ఆర్గ్యుమెంట్ uint256 అయినందున, మనం దానిని ABI నిబంధనల ప్రకారం డీకోడ్ చేయవచ్చు, ఇది మనకు ఆశించిన దశాంశం 42ని ఇస్తుంది. డేటాతో పాటు, ఏ ఈవెంట్ లాగ్‌ను సృష్టించిందో నిర్ణయించడానికి టాపిక్‌లను ఉపయోగించవచ్చని గమనించాలి:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

ఇది జేసన్-ఆర్‌పీసీ యొక్క ప్రత్యక్ష వినియోగాన్ని ప్రదర్శిస్తూ, అత్యంత సాధారణమైన కొన్ని పనులకు సంబంధించిన సంక్షిప్త పరిచయం మాత్రమే.

## సంబంధిత అంశాలు {#related-topics}

- [జేసన్-ఆర్‌పీసీ స్పెసిఫికేషన్](http://www.jsonrpc.org/specification)
- [నోడ్‌లు మరియు క్లయింట్‌లు](/developers/docs/nodes-and-clients/)
- [JavaScript APIలు](/developers/docs/apis/javascript/)
- [బ్యాకెండ్ APIలు](/developers/docs/apis/backend/)
- [అమలు క్లయింట్‌లు](/developers/docs/nodes-and-clients/#execution-clients)