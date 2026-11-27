---
title: "⁨WebSockets⁩ ఉపయోగించడం"
description: "ఏదైనా ఎథీరియం నోడ్ ప్రొవైడర్‌తో జేసన్-ఆర్‌పీసీ అభ్యర్థనలు చేయడానికి మరియు ఘటనలకు సబ్‌స్క్రైబ్ చేయడానికి WebSockets ఉపయోగించడం కోసం గైడ్."
author: "ఎలాన్ హాల్పెర్న్"
lang: te
tags: ["Alchemy", "websockets", "క్వెరీ చేయడం", "JavaScript"]
skill: beginner
breadcrumb: "⁨WebSockets⁩"
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

ఎథీరియం బ్లాక్‌చైన్‌కు అభ్యర్థనలు చేయడానికి WebSockets ఉపయోగించడం కోసం ఇది ఒక ప్రాథమిక స్థాయి గైడ్. ఉదాహరణలు ప్రామాణిక జేసన్-ఆర్‌పీసీ పద్ధతులను ఉపయోగిస్తాయి, కాబట్టి అవి Alchemyతో సహా WebSocket ఎండ్‌పాయింట్‌ను అందించే ఏదైనా నోడ్ లేదా నోడ్ ప్రొవైడర్‌తో పని చేస్తాయి.

## WebSockets వర్సెస్ HTTP {#websockets-vs-http}

HTTP వలె కాకుండా, WebSocketsతో, మీకు నిర్దిష్ట సమాచారం కావాల్సినప్పుడు మీరు నిరంతరం అభ్యర్థనలు చేయాల్సిన అవసరం లేదు. WebSockets మీ కోసం నెట్‌వర్క్ కనెక్షన్‌ను నిర్వహిస్తాయి (సరిగ్గా చేస్తే) మరియు మార్పుల కోసం వింటాయి.

ఏదైనా నెట్‌వర్క్ కనెక్షన్ మాదిరిగానే, WebSocket అంతరాయం లేకుండా ఎప్పటికీ తెరిచి ఉంటుందని మీరు అనుకోకూడదు, కానీ డ్రాప్ అయిన కనెక్షన్‌లను మరియు రీకనెక్షన్‌ను మాన్యువల్‌గా సరిగ్గా నిర్వహించడం సవాలుగా ఉంటుంది. WebSockets యొక్క మరొక ప్రతికూలత ఏమిటంటే, మీరు ప్రతిస్పందనలో HTTP స్టేటస్ కోడ్‌లను పొందలేరు, కేవలం ఎర్రర్ సందేశాన్ని మాత్రమే పొందుతారు.

క్లయింట్ లైబ్రరీలు మీ కోసం దీన్ని నిర్వహించగలవు. ఉదాహరణకు, [viem యొక్క WebSocket ట్రాన్స్‌పోర్ట్](https://viem.sh/docs/clients/transports/websocket) సాకెట్ వైఫల్యంపై మళ్లీ కనెక్ట్ అవుతుంది మరియు డిఫాల్ట్‌గా కీప్-అలైవ్ పింగ్‌లను పంపుతుంది.

## దీన్ని ప్రయత్నించండి {#try-it-out}

మీకు ఎథీరియం నోడ్ కోసం WebSocket URL అవసరం. మీరు అప్లికేషన్ ప్రోగ్రామింగ్ ఇంటర్‌ఫేస్ (API) కీని సృష్టించినప్పుడు నోడ్ ప్రొవైడర్లు మీకు ఒకదాన్ని ఇస్తారు, సాధారణంగా `wss://<provider-host>/<your-api-key>` రూపంలో ఉంటుంది. ఉదాహరణకు, Alchemy ఎథీరియం మెయిన్‌నెట్ URL `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` లాగా కనిపిస్తుంది ([ఉచిత Alchemy ఖాతా కోసం సైన్ అప్ చేయండి](https://auth.alchemy.com/signup)). ఇతర ప్రొవైడర్ల కోసం [నోడ్స్ యాజ్ ఎ సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service/) చూడండి లేదా [మీ స్వంత నోడ్](/developers/docs/nodes-and-clients/run-a-node/) యొక్క WebSocket ఎండ్‌పాయింట్‌ను ఉపయోగించండి. `wss://ethereum-rpc.publicnode.com` వంటి పబ్లిక్ ఎండ్‌పాయింట్‌లు కూడా శీఘ్ర ప్రయోగాల కోసం పని చేస్తాయి, కానీ అవి రేట్-పరిమితం చేయబడ్డాయి మరియు ప్రతి సబ్‌స్క్రిప్షన్ రకానికి మద్దతు ఇవ్వకపోవచ్చు.

WebSocketsని పరీక్షించడానికి సులభమైన మార్గం ఏమిటంటే, [wscat](https://github.com/websockets/wscat) వంటి WebSocket అభ్యర్థనలను చేయడానికి కమాండ్ లైన్ టూల్‌ను ఇన్‌స్టాల్ చేయడం. wscatని ఉపయోగించి, మీరు ఈ క్రింది విధంగా అభ్యర్థనలను పంపవచ్చు:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>` తో ప్రారంభమయ్యే పంక్తులు మీరు టైప్ చేసేవి, మరియు `<` తో ప్రారంభమయ్యే పంక్తులు నోడ్ తిరిగి పంపేవి.

## WebSockets ఎలా ఉపయోగించాలి {#how-to-use-websockets}

ప్రారంభించడానికి, మీ ప్రొవైడర్ యొక్క WebSocket URLని ఉపయోగించి WebSocketని తెరవండి. Alchemyతో, మీరు [డ్యాష్‌బోర్డ్](https://dashboard.alchemy.com/)లో మీ యాప్‌ను తెరవడం ద్వారా మరియు దాని API కీని చూడటం ద్వారా దాన్ని కనుగొనవచ్చు. చాలా మంది ప్రొవైడర్లు రెండింటికీ ఒకే API కీని ఉపయోగించినప్పటికీ, WebSockets కోసం URL (`wss://`) HTTP అభ్యర్థనల కోసం URL (`https://`)కి భిన్నంగా ఉంటుందని గమనించండి.

![మీ Alchemy డ్యాష్‌బోర్డ్‌లో మీ WebSocket URLని ఎక్కడ కనుగొనాలి](./use-websockets.mp4#602x280)

మీ ప్రొవైడర్ మద్దతు ఇచ్చే ఏదైనా [జేసన్-ఆర్‌పీసీ పద్ధతులను](/developers/docs/apis/json-rpc/) WebSocket ద్వారా ఉపయోగించవచ్చు. అలా చేయడానికి, HTTP POST అభ్యర్థన యొక్క బాడీగా పంపబడే అదే పేలోడ్‌ను ఉపయోగించండి, కానీ దానికి బదులుగా ఆ పేలోడ్‌ను WebSocket ద్వారా పంపండి.

## Web3 తో {#with-web3}

[viem](https://viem.sh/) వంటి క్లయింట్ లైబ్రరీని ఉపయోగిస్తున్నప్పుడు WebSocketsకి మారడం సులభం. `http` ట్రాన్స్‌పోర్ట్‌కు బదులుగా మీ WebSocket URLతో `webSocket` ట్రాన్స్‌పోర్ట్‌ను ఉపయోగించండి. ఉదాహరణకు, `npm install viem` తర్వాత, దీన్ని `index.mjs`గా సేవ్ చేసి, `node index.mjs`ని రన్ చేయండి:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// అదే WebSocket ద్వారా కొత్త బ్లాక్‌లకు సబ్‌స్క్రైబ్ చేయండి
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## సబ్‌స్క్రిప్షన్ API {#subscription-api}

WebSocket ద్వారా కనెక్ట్ అయినప్పుడు, మీరు రెండు అదనపు పద్ధతులను ఉపయోగించవచ్చు: `eth_subscribe` మరియు `eth_unsubscribe`. ఈ పద్ధతులు నిర్దిష్ట ఈవెంట్‌ల కోసం వినడానికి మరియు వెంటనే తెలియజేయబడటానికి మిమ్మల్ని అనుమతిస్తాయి.

### `eth_subscribe` {#eth-subscribe}

పేర్కొన్న ఈవెంట్‌ల కోసం కొత్త సబ్‌స్క్రిప్షన్‌ను సృష్టిస్తుంది. [`eth_subscribe` గురించి మరింత తెలుసుకోండి](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### పారామితులు {#parameters}

1. సబ్‌స్క్రిప్షన్ రకాలు
2. ఐచ్ఛిక పారామితులు

మొదటి ఆర్గ్యుమెంట్ దేని కోసం వినాలో ఆ ఈవెంట్ రకాన్ని నిర్దేశిస్తుంది. రెండవ ఆర్గ్యుమెంట్ మొదటి ఆర్గ్యుమెంట్‌పై ఆధారపడి ఉండే అదనపు ఎంపికలను కలిగి ఉంటుంది. విభిన్న వివరణ రకాలు, వాటి ఎంపికలు మరియు వాటి ఈవెంట్ పేలోడ్‌లు క్రింద వివరించబడ్డాయి.

#### రిటర్న్స్ {#returns}

సబ్‌స్క్రిప్షన్ ID: ఈ ID స్వీకరించిన ఏవైనా ఈవెంట్‌లకు జోడించబడుతుంది మరియు `eth_unsubscribe`ని ఉపయోగించి సబ్‌స్క్రిప్షన్‌ను రద్దు చేయడానికి కూడా ఉపయోగించవచ్చు.

#### సబ్‌స్క్రిప్షన్ ఈవెంట్‌లు {#subscription-events}

సబ్‌స్క్రిప్షన్ యాక్టివ్‌గా ఉన్నప్పుడు, మీరు ఈ క్రింది ఫీల్డ్‌లతో కూడిన ఆబ్జెక్ట్‌లైన ఈవెంట్‌లను స్వీకరిస్తారు:

- `jsonrpc`: ఎల్లప్పుడూ "2.0"
- `method`: ఎల్లప్పుడూ "eth_subscription"
- `params`: ఈ క్రింది ఫీల్డ్‌లతో కూడిన ఆబ్జెక్ట్:
  - `subscription`: ఈ సబ్‌స్క్రిప్షన్‌ను సృష్టించిన `eth_subscribe` కాల్ ద్వారా తిరిగి ఇవ్వబడిన సబ్‌స్క్రిప్షన్ ID.
  - `result`: సబ్‌స్క్రిప్షన్ రకాన్ని బట్టి కంటెంట్‌లు మారే ఆబ్జెక్ట్.

#### సబ్‌స్క్రిప్షన్ రకాలు {#subscription-types}

1. `newHeads`

చైన్ పునర్వ్యవస్థీకరణ సమయంలో సహా, చైన్‌కు కొత్త హెడర్ జోడించబడిన ప్రతిసారీ ఒక ఘటనను విడుదల చేస్తుంది.

చైన్ పునర్వ్యవస్థీకరణ జరిగినప్పుడు, ఈ సబ్‌స్క్రిప్షన్ కొత్త చైన్ కోసం అన్ని కొత్త హెడర్‌లను కలిగి ఉన్న ఘటనను విడుదల చేస్తుంది. ప్రత్యేకించి, దీని అర్థం మీరు ఒకే ఎత్తుతో బహుళ హెడర్‌లు విడుదల చేయబడటాన్ని చూడవచ్చు మరియు ఇది జరిగినప్పుడు పునర్వ్యవస్థీకరణ తర్వాత వచ్చిన హెడర్‌ను సరైనదిగా తీసుకోవాలి.

ఉదాహరణ:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

పేర్కొన్న ఫిల్టర్ ప్రమాణాలకు సరిపోలే కొత్తగా జోడించిన బ్లాక్‌లలో భాగమైన లాగ్‌లను విడుదల చేస్తుంది.

చైన్ పునర్వ్యవస్థీకరణ జరిగినప్పుడు, పాత చైన్‌లోని బ్లాక్‌లలో భాగమైన లాగ్‌లు `removed` ప్రాపర్టీని `true`కి సెట్ చేసి మళ్లీ విడుదల చేయబడతాయి. ఇంకా, కొత్త చైన్‌లోని బ్లాక్‌లలో భాగమైన లాగ్‌లు విడుదల చేయబడతాయి, అంటే పునర్వ్యవస్థీకరణ విషయంలో ఒకే లావాదేవీకి సంబంధించిన లాగ్‌లను బహుళ సార్లు చూడటం సాధ్యమవుతుంది.

పారామితులు

1. ఈ క్రింది ఫీల్డ్‌లతో కూడిన ఆబ్జెక్ట్:
   - `address` (ఐచ్ఛికం): చిరునామాను సూచించే స్ట్రింగ్ లేదా అటువంటి స్ట్రింగ్‌ల శ్రేణి.
     - ఈ చిరునామాలలో ఒకదాని నుండి సృష్టించబడిన లాగ్‌లు మాత్రమే విడుదల చేయబడతాయి.
   - `topics`: టాపిక్ స్పెసిఫైయర్‌ల శ్రేణి.
     - ప్రతి టాపిక్ స్పెసిఫైయర్ `null`, టాపిక్‌ను సూచించే స్ట్రింగ్ లేదా స్ట్రింగ్‌ల శ్రేణి కావచ్చు.
     - శ్రేణిలో `null` కాని ప్రతి స్థానం, ఆ స్థానంలో ఇచ్చిన టాపిక్‌లలో ఒకదాన్ని కలిగి ఉన్న లాగ్‌లను మాత్రమే విడుదల చేయడానికి పరిమితం చేస్తుంది.

టాపిక్ స్పెసిఫికేషన్‌ల యొక్క కొన్ని ఉదాహరణలు:

- `[]`: ఏవైనా టాపిక్‌లు అనుమతించబడతాయి.
- `[A]`: మొదటి స్థానంలో A (మరియు ఆ తర్వాత ఏదైనా).
- `[null, B]`: మొదటి స్థానంలో ఏదైనా మరియు రెండవ స్థానంలో B (మరియు ఆ తర్వాత ఏదైనా).
- `[A, B]`: మొదటి స్థానంలో A మరియు రెండవ స్థానంలో B (మరియు ఆ తర్వాత ఏదైనా).
- `[[A, B], [A, B]]`: మొదటి స్థానంలో (A లేదా B) మరియు రెండవ స్థానంలో (A లేదా B) (మరియు ఆ తర్వాత ఏదైనా).

ఉదాహరణ:

ఈ ఉదాహరణ ఎథీరియం మెయిన్‌నెట్‌లోని [WETH కాంట్రాక్ట్](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) నుండి `Deposit` ఘటనల కోసం వింటుంది:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

నోడ్ యొక్క పెండింగ్ స్థితికి (దాని మెంపూల్) జోడించబడిన ప్రతి లావాదేవీ యొక్క హాష్‌ను విడుదల చేస్తుంది.

ఉదాహరణ:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

కొంతమంది ప్రొవైడర్లు వారి స్వంత సబ్‌స్క్రిప్షన్ రకాలను కూడా అందిస్తారు. ఉదాహరణకు, Alchemy యొక్క [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) కేవలం హాష్‌లకు బదులుగా _పూర్తి లావాదేవీ ఆబ్జెక్ట్‌లను_ విడుదల చేస్తుంది మరియు ఐచ్ఛిక `fromAddress`, `toAddress` మరియు `hashesOnly` ఫిల్టర్‌లను అంగీకరిస్తుంది. ఇవి ప్రామాణిక జేసన్-ఆర్‌పీసీ APIలో భాగం కావు, కాబట్టి అవి ఆ ప్రొవైడర్‌తో మాత్రమే పని చేస్తాయి.

### `eth_unsubscribe` {#eth-unsubscribe}

ఇప్పటికే ఉన్న సబ్‌స్క్రిప్షన్‌ను రద్దు చేస్తుంది, తద్వారా తదుపరి ఘటనలు ఏవీ పంపబడవు.

పారామితులు

1. సబ్‌స్క్రిప్షన్ ID, గతంలో `eth_subscribe` కాల్ నుండి తిరిగి ఇవ్వబడినట్లుగా.

రిటర్న్స్

సబ్‌స్క్రిప్షన్ విజయవంతంగా రద్దు చేయబడితే `true`, లేదా ఇచ్చిన IDతో సబ్‌స్క్రిప్షన్ ఏదీ లేకపోతే `false`.

సబ్‌స్క్రిప్షన్ దాన్ని సృష్టించిన WebSocket కనెక్షన్‌లో మాత్రమే ఉంటుంది, కాబట్టి `eth_unsubscribe` అదే కనెక్షన్ ద్వారా పంపబడాలి. దీన్ని ప్రత్యేక HTTP అభ్యర్థనగా పంపలేము. కనెక్షన్‌ను మూసివేయడం వల్ల దాని సబ్‌స్క్రిప్షన్‌లన్నీ కూడా రద్దు చేయబడతాయి.

ఉదాహరణ:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

ఉచితంగా [Alchemyతో సైన్ అప్ చేయండి](https://auth.alchemy.com), [Alchemy యొక్క డాక్యుమెంటేషన్](https://www.alchemy.com/docs/)ను తనిఖీ చేయండి మరియు తాజా వార్తల కోసం, [ట్విట్టర్](https://x.com/Alchemy)లో Alchemyని అనుసరించండి.
