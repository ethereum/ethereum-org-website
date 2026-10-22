---
title: "WebSockets का उपयोग करना"
description: "किसी भी इथेरियम नोड प्रदाता के साथ जेसन-आरपीसी (JSON-RPC) अनुरोध करने और इवेंट की सदस्यता लेने के लिए WebSockets का उपयोग करने की मार्गदर्शिका।"
author: "एलन हैल्पर्न"
lang: hi
tags:
  - alchemy
  - websockets
  - क्वेरी करना
  - javascript
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

यह इथेरियम ब्लॉकचेन से अनुरोध करने के लिए WebSockets का उपयोग करने के लिए एक प्रवेश स्तर की मार्गदर्शिका है। उदाहरण मानक जेसन-आरपीसी विधियों का उपयोग करते हैं, इसलिए वे किसी भी नोड या नोड प्रदाता के साथ काम करते हैं जो WebSocket एंडपॉइंट प्रदान करता है, जिसमें Alchemy भी शामिल है।

## WebSockets बनाम HTTP {#websockets-vs-http}

HTTP के विपरीत, WebSockets के साथ, जब आपको विशिष्ट जानकारी चाहिए होती है तो आपको लगातार अनुरोध करने की आवश्यकता नहीं होती है। WebSockets आपके लिए एक नेटवर्क कनेक्शन बनाए रखते हैं (यदि सही तरीके से किया जाए) और परिवर्तनों को सुनते हैं।

किसी भी नेटवर्क कनेक्शन की तरह, आपको यह नहीं मानना चाहिए कि एक WebSocket बिना किसी रुकावट के हमेशा खुला रहेगा, लेकिन ड्रॉप किए गए कनेक्शन और मैन्युअल रूप से पुन: कनेक्शन को सही ढंग से संभालना चुनौतीपूर्ण हो सकता है। WebSockets का एक और नुकसान यह है कि आपको प्रतिक्रिया में HTTP स्थिति कोड नहीं मिलते हैं, बल्कि केवल त्रुटि संदेश मिलता है।

क्लाइंट लाइब्रेरी आपके लिए इसे संभाल सकती हैं। उदाहरण के लिए, [Viem का WebSocket ट्रांसपोर्ट](https://viem.sh/docs/clients/transports/websocket) सॉकेट विफलता पर फिर से कनेक्ट होता है और डिफ़ॉल्ट रूप से कीप-अलाइव पिंग भेजता है।

## इसे आज़माएं {#try-it-out}

आपको एक इथेरियम नोड के लिए एक WebSocket URL की आवश्यकता है। जब आप एक एप्लिकेशन प्रोग्रामिंग इंटरफ़ेस (API) कुंजी बनाते हैं तो नोड प्रदाता आपको एक देते हैं, जो आमतौर पर `wss://<provider-host>/<your-api-key>` के रूप में होता है। उदाहरण के लिए, एक Alchemy इथेरियम मेननेट URL `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` जैसा दिखता है ([मुफ़्त Alchemy खाते के लिए साइन अप करें](https://auth.alchemy.com/signup))। अन्य प्रदाताओं के लिए [सेवा के रूप में नोड](/developers/docs/nodes-and-clients/nodes-as-a-service/) देखें, या [अपने स्वयं के नोड](/developers/docs/nodes-and-clients/run-a-node/) के WebSocket एंडपॉइंट का उपयोग करें। `wss://ethereum-rpc.publicnode.com` जैसे सार्वजनिक एंडपॉइंट भी त्वरित प्रयोगों के लिए काम करते हैं, लेकिन वे दर-सीमित (rate-limited) हैं और हो सकता है कि हर सदस्यता प्रकार का समर्थन न करें।

WebSockets का परीक्षण करने का सबसे आसान तरीका WebSocket अनुरोध करने के लिए एक कमांड लाइन टूल स्थापित करना है जैसे कि [wscat](https://github.com/websockets/wscat)। wscat का उपयोग करके, आप इस प्रकार अनुरोध भेज सकते हैं:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>` से शुरू होने वाली पंक्तियाँ वे हैं जो आप टाइप करते हैं, और `<` से शुरू होने वाली पंक्तियाँ वे हैं जो नोड वापस भेजता है।

## WebSockets का उपयोग कैसे करें {#how-to-use-websockets}

शुरू करने के लिए, अपने प्रदाता के WebSocket URL का उपयोग करके एक WebSocket खोलें। Alchemy के साथ, आप [डैशबोर्ड](https://dashboard.alchemy.com/) में अपना ऐप खोलकर और इसकी एप्लिकेशन प्रोग्रामिंग इंटरफ़ेस (API) कुंजी देखकर इसे पा सकते हैं। ध्यान दें कि WebSockets के लिए URL (`wss://`) HTTP अनुरोधों के लिए URL (`https://`) से अलग है, हालाँकि अधिकांश प्रदाता दोनों के लिए एक ही API कुंजी का उपयोग करते हैं।

![अपने Alchemy डैशबोर्ड में अपना WebSocket URL कहाँ खोजें](./use-websockets.mp4#602x280)

आपके प्रदाता द्वारा समर्थित किसी भी [जेसन-आरपीसी विधियों](/developers/docs/apis/json-rpc/) का उपयोग WebSocket के माध्यम से किया जा सकता है। ऐसा करने के लिए, उसी पेलोड का उपयोग करें जिसे HTTP POST अनुरोध के मुख्य भाग (body) के रूप में भेजा जाएगा, लेकिन इसके बजाय उस पेलोड को WebSocket के माध्यम से भेजें।

## Web3 के साथ {#with-web3}

[Viem](https://viem.sh/) जैसी क्लाइंट लाइब्रेरी का उपयोग करते समय WebSockets पर जाना सरल है। `http` ट्रांसपोर्ट के बजाय अपने WebSocket URL के साथ `webSocket` ट्रांसपोर्ट का उपयोग करें। उदाहरण के लिए, `npm install viem` के बाद, इसे `index.mjs` के रूप में सहेजें और `node index.mjs` चलाएँ:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// उसी वेबसॉकेट पर नए ब्लॉक्स को सब्सक्राइब करें
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## सदस्यता API {#subscription-api}

WebSocket के माध्यम से कनेक्ट होने पर, आप दो अतिरिक्त विधियों का उपयोग कर सकते हैं: `eth_subscribe` और `eth_unsubscribe`। ये विधियाँ आपको विशेष घटनाओं को सुनने और तुरंत सूचित किए जाने की अनुमति देंगी।

### `eth_subscribe` {#eth-subscribe}

निर्दिष्ट घटनाओं के लिए एक नई सदस्यता बनाता है। [`eth_subscribe` के बारे में अधिक जानें](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub)।

#### पैरामीटर {#parameters}

1. सदस्यता के प्रकार
2. वैकल्पिक पैरामीटर

पहला तर्क उस घटना के प्रकार को निर्दिष्ट करता है जिसे सुनना है। दूसरे तर्क में अतिरिक्त विकल्प होते हैं जो पहले तर्क पर निर्भर करते हैं। विभिन्न विवरण प्रकार, उनके विकल्प और उनके घटना पेलोड नीचे वर्णित हैं।

#### रिटर्न {#returns}

सदस्यता ID: यह ID किसी भी प्राप्त घटनाओं से जुड़ी होगी, और इसका उपयोग `eth_unsubscribe` का उपयोग करके सदस्यता रद्द करने के लिए भी किया जा सकता है।

#### सदस्यता घटनाएँ {#subscription-events}

जब तक सदस्यता सक्रिय है, आपको घटनाएँ प्राप्त होंगी जो निम्नलिखित फ़ील्ड वाले ऑब्जेक्ट हैं:

- `jsonrpc`: हमेशा "2.0"
- `method`: हमेशा "eth_subscription"
- `params`: निम्नलिखित फ़ील्ड वाला एक ऑब्जेक्ट:
  - `subscription`: `eth_subscribe` कॉल द्वारा लौटाई गई सदस्यता ID जिसने यह सदस्यता बनाई है।
  - `result`: एक ऑब्जेक्ट जिसकी सामग्री सदस्यता के प्रकार के आधार पर भिन्न होती है।

#### सदस्यता के प्रकार {#subscription-types}

1. `newHeads`

जब भी चेन में कोई नया हेडर जोड़ा जाता है, तो एक इवेंट उत्सर्जित (emit) करता है, जिसमें चेन पुनर्गठन के दौरान भी शामिल है।

जब कोई चेन पुनर्गठन होता है, तो यह सदस्यता नई चेन के लिए सभी नए हेडर वाला एक इवेंट उत्सर्जित करेगी। विशेष रूप से, इसका मतलब यह है कि आप एक ही ऊंचाई (height) के साथ कई हेडर उत्सर्जित होते हुए देख सकते हैं, और जब ऐसा होता है तो बाद वाले हेडर को पुनर्गठन के बाद सही माना जाना चाहिए।

उदाहरण:

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

उन लॉग को उत्सर्जित करता है जो नए जोड़े गए ब्लॉक का हिस्सा हैं जो निर्दिष्ट फ़िल्टर मानदंडों से मेल खाते हैं।

जब कोई चेन पुनर्गठन होता है, तो पुरानी चेन पर ब्लॉक का हिस्सा रहे लॉग फिर से उत्सर्जित किए जाएंगे, जिसमें `removed` प्रॉपर्टी `true` पर सेट होगी। इसके अलावा, नई चेन पर ब्लॉक का हिस्सा रहे लॉग उत्सर्जित किए जाते हैं, जिसका अर्थ है कि पुनर्गठन के मामले में एक ही लेन-देन के लिए कई बार लॉग देखना संभव है।

पैरामीटर

1. निम्नलिखित फ़ील्ड वाला एक ऑब्जेक्ट:
   - `address` (वैकल्पिक): या तो एक पता दर्शाने वाली स्ट्रिंग या ऐसी स्ट्रिंग का एक एरे (array)।
     - केवल इनमें से किसी एक पते से बनाए गए लॉग ही उत्सर्जित किए जाएंगे।
   - `topics`: विषय (topic) निर्दिष्टकर्ताओं का एक एरे।
     - प्रत्येक विषय निर्दिष्टकर्ता या तो `null`, एक विषय को दर्शाने वाली स्ट्रिंग, या स्ट्रिंग का एक एरे होता है।
     - एरे में प्रत्येक स्थिति जो `null` नहीं है, उत्सर्जित लॉग को केवल उन तक सीमित करती है जिनके पास उस स्थिति में दिए गए विषयों में से एक है।

विषय विनिर्देशों के कुछ उदाहरण:

- `[]`: किसी भी विषय की अनुमति है।
- `[A]`: पहली स्थिति में A (और उसके बाद कुछ भी)।
- `[null, B]`: पहली स्थिति में कुछ भी और दूसरी स्थिति में B (और उसके बाद कुछ भी)।
- `[A, B]`: पहली स्थिति में A और दूसरी स्थिति में B (और उसके बाद कुछ भी)।
- `[[A, B], [A, B]]`: पहली स्थिति में (A या B) और दूसरी स्थिति में (A या B) (और उसके बाद कुछ भी)।

उदाहरण:

यह उदाहरण इथेरियम मेननेट पर [रैप्ड ईथर (WETH) अनुबंध](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) से `Deposit` इवेंट को सुनता है:

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

प्रत्येक लेन-देन का हैश उत्सर्जित करता है जिसे नोड की लंबित स्थिति (इसके मेमपूल) में जोड़ा जाता है।

उदाहरण:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

कुछ प्रदाता अपने स्वयं के सदस्यता प्रकार भी प्रदान करते हैं। उदाहरण के लिए, Alchemy का [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) केवल हैश के बजाय _पूर्ण लेन-देन ऑब्जेक्ट_ उत्सर्जित करता है, और वैकल्पिक `fromAddress`, `toAddress` और `hashesOnly` फ़िल्टर स्वीकार करता है। ये मानक जेसन-आरपीसी एप्लिकेशन प्रोग्रामिंग इंटरफ़ेस (API) का हिस्सा नहीं हैं, इसलिए ये केवल उसी प्रदाता के साथ काम करते हैं।

### `eth_unsubscribe` {#eth-unsubscribe}

मौजूदा सदस्यता को रद्द करता है ताकि आगे कोई इवेंट न भेजा जाए।

पैरामीटर

1. सदस्यता ID, जैसा कि पहले `eth_subscribe` कॉल से लौटाया गया था।

रिटर्न

`true` यदि सदस्यता सफलतापूर्वक रद्द कर दी गई थी, या `false` यदि दिए गए ID के साथ कोई सदस्यता मौजूद नहीं थी।

एक सदस्यता केवल उसी WebSocket कनेक्शन पर मौजूद होती है जिसने इसे बनाया था, इसलिए `eth_unsubscribe` को उसी कनेक्शन पर भेजा जाना चाहिए। इसे एक अलग HTTP अनुरोध के रूप में नहीं भेजा जा सकता है। कनेक्शन बंद करने से उसकी सभी सदस्यताएँ भी रद्द हो जाती हैं।

उदाहरण:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

मुफ़्त में [Alchemy के साथ साइन अप करें](https://auth.alchemy.com), [Alchemy के दस्तावेज़](https://www.alchemy.com/docs/) देखें, और नवीनतम समाचारों के लिए, [ट्विटर](https://x.com/Alchemy) पर Alchemy को फ़ॉलो करें।
