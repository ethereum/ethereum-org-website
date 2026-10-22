---
title: "WebSockets वापरणे"
description: "कोणत्याही इथेरियम नोड प्रोव्हायडरसह जेसॉन-आरपीसी (JSON-RPC) विनंत्या करण्यासाठी आणि घटना सबस्क्राइब करण्यासाठी WebSockets वापरण्याविषयी मार्गदर्शक."
author: "एलन हॅल्पर्न"
lang: mr
tags: ["Alchemy", "websockets", "क्वेरी करणे", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

इथेरियम ब्लॉकचेनला विनंत्या करण्यासाठी WebSockets वापरण्याविषयी हे एक प्राथमिक स्तरावरील मार्गदर्शक आहे. उदाहरणांमध्ये प्रमाणित जेसॉन-आरपीसी पद्धती वापरल्या आहेत, त्यामुळे ते Alchemy सह WebSocket एंडपॉइंट ऑफर करणाऱ्या कोणत्याही नोड किंवा नोड प्रोव्हायडरसोबत काम करतात.

## WebSockets विरुद्ध HTTP {#websockets-vs-http}

HTTP च्या विपरीत, WebSockets सह, जेव्हा तुम्हाला विशिष्ट माहिती हवी असते तेव्हा तुम्हाला सतत विनंत्या करण्याची आवश्यकता नसते. WebSockets तुमच्यासाठी नेटवर्क कनेक्शन राखतात (जर योग्यरित्या केले असेल) आणि बदलांसाठी ऐकतात.

कोणत्याही नेटवर्क कनेक्शनप्रमाणे, तुम्ही असे गृहीत धरू नये की WebSocket कोणत्याही व्यत्ययाशिवाय कायमचे उघडे राहील, परंतु ड्रॉप झालेले कनेक्शन आणि मॅन्युअली पुन्हा कनेक्ट करणे योग्यरित्या हाताळणे आव्हानात्मक असू शकते. WebSockets चा आणखी एक तोटा असा आहे की तुम्हाला प्रतिसादात HTTP स्टेटस कोड मिळत नाहीत, तर फक्त त्रुटी संदेश मिळतो.

क्लायंट लायब्ररी तुमच्यासाठी हे हाताळू शकतात. उदाहरणार्थ, [viem चे WebSocket ट्रान्सपोर्ट](https://viem.sh/docs/clients/transports/websocket) सॉकेट निकामी झाल्यावर पुन्हा कनेक्ट होते आणि डीफॉल्टनुसार कीप-अलाइव्ह पिंग पाठवते.

## हे वापरून पहा {#try-it-out}

तुम्हाला इथेरियम नोडसाठी WebSocket URL ची आवश्यकता आहे. जेव्हा तुम्ही ॲप्लिकेशन प्रोग्रामिंग इंटरफेस (API) की तयार करता तेव्हा नोड प्रोव्हायडर तुम्हाला एक देतात, जे सहसा `wss://<provider-host>/<your-api-key>` या स्वरूपात असते. उदाहरणार्थ, Alchemy इथरियम मेननेट URL `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` सारखी दिसते ([मोफत Alchemy खात्यासाठी साइन अप करा](https://auth.alchemy.com/signup)). इतर प्रोव्हायडर्ससाठी [सेवा म्हणून नोड्स](/developers/docs/nodes-and-clients/nodes-as-a-service/) पहा, किंवा [तुमच्या स्वतःच्या नोडचा](/developers/docs/nodes-and-clients/run-a-node/) WebSocket एंडपॉइंट वापरा. `wss://ethereum-rpc.publicnode.com` सारखे सार्वजनिक एंडपॉइंट्स देखील जलद प्रयोगांसाठी काम करतात, परंतु ते रेट-लिमिटेड आहेत आणि प्रत्येक सबस्क्रिप्शन प्रकाराला सपोर्ट करू शकत नाहीत.

WebSockets ची चाचणी करण्याचा सर्वात सोपा मार्ग म्हणजे WebSocket विनंत्या करण्यासाठी कमांड लाइन टूल इन्स्टॉल करणे जसे की [wscat](https://github.com/websockets/wscat). wscat वापरून, तुम्ही खालीलप्रमाणे विनंत्या पाठवू शकता:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>` ने सुरू होणाऱ्या ओळी तुम्ही टाईप केलेल्या असतात आणि `<` ने सुरू होणाऱ्या ओळी नोड परत पाठवतो.

## WebSockets कसे वापरावे {#how-to-use-websockets}

सुरुवात करण्यासाठी, तुमच्या प्रोव्हायडरचा WebSocket URL वापरून WebSocket उघडा. Alchemy सह, तुम्ही तुमचे ॲप [डॅशबोर्डमध्ये](https://dashboard.alchemy.com/) उघडून आणि त्याची ॲप्लिकेशन प्रोग्रामिंग इंटरफेस (API) की पाहून ते शोधू शकता. लक्षात घ्या की WebSockets साठी URL (`wss://`) HTTP विनंत्यांसाठी असलेल्या URL (`https://`) पेक्षा वेगळी आहे, जरी बहुतांश प्रोव्हायडर्स दोन्हीसाठी समान API की वापरतात.

![तुमच्या Alchemy डॅशबोर्डमध्ये तुमचा WebSocket URL कुठे शोधायचा](./use-websockets.mp4#602x280)

तुमचा प्रोव्हायडर सपोर्ट करत असलेल्या कोणत्याही [जेसॉन-आरपीसी पद्धती](/developers/docs/apis/json-rpc/) WebSocket द्वारे वापरल्या जाऊ शकतात. असे करण्यासाठी, HTTP POST विनंतीच्या मुख्य भागाच्या रूपात पाठवला जाणारा पेलोड वापरा, परंतु त्याऐवजी तो पेलोड WebSocket द्वारे पाठवा.

## Web3 सह {#with-web3}

[Viem](https://viem.sh/) सारखी क्लायंट लायब्ररी वापरताना WebSockets वर जाणे सोपे आहे. `http` ट्रान्सपोर्ट ऐवजी तुमच्या WebSocket URL सह `webSocket` ट्रान्सपोर्ट वापरा. उदाहरणार्थ, `npm install viem` नंतर, हे `index.mjs` म्हणून सेव्ह करा आणि `node index.mjs` रन करा:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// त्याच वेबसॉकेटवरून नवीन ब्लॉक्सना सबस्क्राईब करा
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## सबस्क्रिप्शन API {#subscription-api}

WebSocket द्वारे कनेक्ट केलेले असताना, तुम्ही दोन अतिरिक्त पद्धती वापरू शकता: `eth_subscribe` आणि `eth_unsubscribe`. या पद्धती तुम्हाला विशिष्ट घटना ऐकण्याची आणि त्वरित सूचित करण्याची अनुमती देतील.

### `eth_subscribe` {#eth-subscribe}

निर्दिष्ट केलेल्या घटनांसाठी नवीन सबस्क्रिप्शन तयार करते. [`eth_subscribe` बद्दल अधिक जाणून घ्या](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### पॅरामीटर्स {#parameters}

1. सबस्क्रिप्शनचे प्रकार
2. पर्यायी पॅरामीटर्स

पहिला आर्ग्युमेंट कोणत्या प्रकारच्या घटनेसाठी ऐकायचे ते निर्दिष्ट करतो. दुसऱ्या आर्ग्युमेंटमध्ये अतिरिक्त पर्याय असतात जे पहिल्या आर्ग्युमेंटवर अवलंबून असतात. विविध वर्णन प्रकार, त्यांचे पर्याय आणि त्यांचे घटना पेलोड खाली वर्णन केले आहेत.

#### रिटर्न्स {#returns}

सबस्क्रिप्शन ID: हा ID प्राप्त झालेल्या कोणत्याही घटनांना जोडला जाईल, आणि `eth_unsubscribe` वापरून सबस्क्रिप्शन रद्द करण्यासाठी देखील वापरला जाऊ शकतो.

#### सबस्क्रिप्शन घटना {#subscription-events}

सबस्क्रिप्शन सक्रिय असताना, तुम्हाला घटना प्राप्त होतील जे खालील फील्ड्स असलेले ऑब्जेक्ट्स आहेत:

- `jsonrpc`: नेहमी "2.0"
- `method`: नेहमी "eth_subscription"
- `params`: खालील फील्ड्स असलेला एक ऑब्जेक्ट:
  - `subscription`: हे सबस्क्रिप्शन तयार करणाऱ्या `eth_subscribe` कॉलद्वारे परत केलेला सबस्क्रिप्शन ID.
  - `result`: एक ऑब्जेक्ट ज्याची सामग्री सबस्क्रिप्शनच्या प्रकारानुसार बदलते.

#### सबस्क्रिप्शनचे प्रकार {#subscription-types}

1. `newHeads`

चेन पुनर्रचना दरम्यानसह, जेव्हाही चेनमध्ये नवीन हेडर जोडले जाते तेव्हा एक घटना उत्सर्जित करते.

जेव्हा चेन पुनर्रचना होते, तेव्हा हे सबस्क्रिप्शन नवीन चेनसाठी सर्व नवीन हेडर्स असलेली एक घटना उत्सर्जित करेल. विशेषतः, याचा अर्थ असा की तुम्हाला समान उंचीसह उत्सर्जित झालेले अनेक हेडर्स दिसू शकतात, आणि जेव्हा असे घडते तेव्हा पुनर्रचना झाल्यानंतर नंतरचे हेडर योग्य मानले जावे.

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

निर्दिष्ट फिल्टर निकषांशी जुळणाऱ्या नव्याने जोडलेल्या ब्लॉक्सचा भाग असलेले लॉग्स उत्सर्जित करते.

जेव्हा चेन पुनर्रचना होते, तेव्हा जुन्या चेनवरील ब्लॉक्सचा भाग असलेले लॉग्स `removed` प्रॉपर्टी `true` वर सेट करून पुन्हा उत्सर्जित केले जातील. पुढे, नवीन चेनवरील ब्लॉक्सचा भाग असलेले लॉग्स उत्सर्जित केले जातात, याचा अर्थ पुनर्रचना झाल्यास एकाच व्यवहारासाठी अनेक वेळा लॉग्स पाहणे शक्य आहे.

पॅरामीटर्स

1. खालील फील्ड्स असलेला एक ऑब्जेक्ट:
   - `address` (पर्यायी): एकतर पत्ता दर्शवणारी स्ट्रिंग किंवा अशा स्ट्रिंग्सचा ॲरे.
     - फक्त यापैकी एका पत्त्यावरून तयार केलेले लॉग्स उत्सर्जित केले जातील.
   - `topics`: टॉपिक स्पेसिफायर्सचा ॲरे.
     - प्रत्येक टॉपिक स्पेसिफायर एकतर `null`, टॉपिक दर्शवणारी स्ट्रिंग किंवा स्ट्रिंग्सचा ॲरे असतो.
     - ॲरेमधील प्रत्येक स्थान जे `null` नाही ते उत्सर्जित लॉग्सना फक्त त्या स्थानावर दिलेल्या टॉपिक्सपैकी एक असलेल्यांपुरते मर्यादित करते.

टॉपिक स्पेसिफिकेशन्सची काही उदाहरणे:

- `[]`: कोणतेही टॉपिक्स अनुमत आहेत.
- `[A]`: पहिल्या स्थानावर A (आणि त्यानंतर काहीही).
- `[null, B]`: पहिल्या स्थानावर काहीही आणि दुसऱ्या स्थानावर B (आणि त्यानंतर काहीही).
- `[A, B]`: पहिल्या स्थानावर A आणि दुसऱ्या स्थानावर B (आणि त्यानंतर काहीही).
- `[[A, B], [A, B]]`: पहिल्या स्थानावर (A किंवा B) आणि दुसऱ्या स्थानावर (A किंवा B) (आणि त्यानंतर काहीही).

उदाहरण:

हे उदाहरण इथरियम मेननेटवरील [रॅप्ड इथर (WETH) कॉन्ट्रॅक्ट](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) मधून `Deposit` घटना ऐकते:

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

नोडच्या प्रलंबित स्थितीमध्ये (त्याच्या मेमपूलमध्ये) जोडल्या गेलेल्या प्रत्येक व्यवहाराचा हॅश उत्सर्जित करते.

उदाहरण:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

काही प्रोव्हायडर्स त्यांचे स्वतःचे सबस्क्रिप्शन प्रकार देखील देतात. उदाहरणार्थ, Alchemy चे [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) फक्त हॅश ऐवजी _पूर्ण व्यवहार ऑब्जेक्ट्स_ उत्सर्जित करते, आणि पर्यायी `fromAddress`, `toAddress` आणि `hashesOnly` फिल्टर्स स्वीकारते. हे प्रमाणित जेसॉन-आरपीसी ॲप्लिकेशन प्रोग्रामिंग इंटरफेस (API) चा भाग नाहीत, त्यामुळे ते फक्त त्या प्रोव्हायडरसोबत काम करतात.

### `eth_unsubscribe` {#eth-unsubscribe}

विद्यमान सबस्क्रिप्शन रद्द करते जेणेकरून पुढील कोणत्याही घटना पाठवल्या जाणार नाहीत.

पॅरामीटर्स

1. सबस्क्रिप्शन ID, जसा पूर्वी `eth_subscribe` कॉलवरून परत केला होता.

रिटर्न्स

जर सबस्क्रिप्शन यशस्वीरित्या रद्द केले गेले असेल तर `true`, किंवा दिलेल्या ID सह कोणतेही सबस्क्रिप्शन अस्तित्वात नसेल तर `false`.

सबस्क्रिप्शन फक्त ते तयार केलेल्या WebSocket कनेक्शनवर अस्तित्वात असते, त्यामुळे `eth_unsubscribe` त्याच कनेक्शनवरून पाठवले जाणे आवश्यक आहे. ते स्वतंत्र HTTP विनंती म्हणून पाठवले जाऊ शकत नाही. कनेक्शन बंद केल्याने त्याचे सर्व सबस्क्रिप्शन्स देखील रद्द होतात.

उदाहरण:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

मोफत [Alchemy सह साइन अप करा](https://auth.alchemy.com), [Alchemy चे दस्तऐवजीकरण](https://www.alchemy.com/docs/) तपासा, आणि ताज्या बातम्यांसाठी, [ट्विटर्](https://x.com/Alchemy) वर Alchemy ला फॉलो करा.
