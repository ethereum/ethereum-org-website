---
title: JSON-RPC API
description: "Ethereum क्लायंटसाठी एक स्टेटलेस, हलके रिमोट प्रोसिजर कॉल (RPC) प्रोटोकॉल."
lang: mr
---

सॉफ्टवेअर ॲप्लिकेशनला Ethereum ब्लॉकचेनशी संवाद साधण्यासाठी - एकतर ब्लॉकचेन डेटा वाचून किंवा नेटवर्कवर व्यवहार पाठवून - त्याला Ethereum नोडशी कनेक्ट करणे आवश्यक आहे.

या उद्देशासाठी, प्रत्येक [Ethereum क्लायंट](/developers/docs/nodes-and-clients/#execution-clients) [JSON-RPC स्पेसिफिकेशन](https://github.com/ethereum/execution-apis) लागू करतो, त्यामुळे विशिष्ट नोड किंवा क्लायंट अंमलबजावणीची पर्वा न करता ॲप्लिकेशन्स अवलंबून राहू शकतील अशा पद्धतींचा एकसमान संच आहे.

[JSON-RPC](https://www.jsonrpc.org/specification) हे एक स्टेटलेस, हलके रिमोट प्रोसिजर कॉल (RPC) प्रोटोकॉल आहे. हे अनेक डेटा स्ट्रक्चर्स आणि त्यांच्या प्रक्रियेसंबंधीचे नियम परिभाषित करते. हे ट्रान्सपोर्ट ॲग्नोस्टिक आहे, कारण या संकल्पना एकाच प्रक्रियेत, सॉकेट्सवर, HTTP वर किंवा अनेक विविध मेसेज पासिंग वातावरणात वापरल्या जाऊ शकतात. हे डेटा फॉरमॅट म्हणून JSON (RFC 4627) वापरते.

## क्लायंटची अंमलबजावणी {#client-implementations}

JSON-RPC स्पेसिफिकेशन लागू करताना प्रत्येक Ethereum क्लायंट वेगवेगळ्या प्रोग्रामिंग भाषांचा वापर करू शकतो. विशिष्ट प्रोग्रामिंग भाषांशी संबंधित अधिक तपशीलांसाठी वैयक्तिक [क्लायंट डॉक्युमेंटेशन](/developers/docs/nodes-and-clients/#execution-clients) पहा. नवीनतम API सपोर्ट माहितीसाठी प्रत्येक क्लायंटचे डॉक्युमेंटेशन तपासण्याची आम्ही शिफारस करतो.

## सुविधेसाठी लायब्ररीज {#convenience-libraries}

तुम्ही JSON-RPC API द्वारे थेट Ethereum क्लायंटशी संवाद साधणे निवडू शकता, परंतु dapp डेव्हलपर्ससाठी अनेकदा सोपे पर्याय उपलब्ध असतात. JSON-RPC API च्या वर रॅपर्स प्रदान करण्यासाठी अनेक [JavaScript](/developers/docs/apis/javascript/#available-libraries) आणि [बॅकएंड API](/developers/docs/apis/backend/#available-libraries) लायब्ररीज अस्तित्वात आहेत. या लायब्ररीजसह, डेव्हलपर्स Ethereum शी संवाद साधणाऱ्या JSON-RPC रिक्वेस्ट्स (अंतर्गत) सुरू करण्यासाठी त्यांच्या आवडीच्या प्रोग्रामिंग भाषेत सहज, एक-ओळीच्या पद्धती लिहू शकतात.

## कन्सेन्सस क्लायंट APIs {#consensus-clients}

हे पृष्ठ प्रामुख्याने Ethereum एक्झिक्युशन क्लायंटद्वारे वापरल्या जाणार्‍या JSON-RPC API शी संबंधित आहे. तथापि, कन्सेन्सस क्लायंटकडे एक RPC API देखील आहे जे वापरकर्त्यांना नोडबद्दल माहिती विचारण्याची, बीकन ब्लॉक्स, बीकन स्टेट आणि इतर कन्सेन्सस-संबंधित माहिती थेट नोडवरून विनंती करण्याची परवानगी देते. हे API [बीकन API वेबपेज](https://ethereum.github.io/beacon-APIs/#/) वर डॉक्युमेंट केलेले आहे.

नोडमधील इंटर-क्लायंट कम्युनिकेशनसाठी अंतर्गत API चा देखील वापर केला जातो - म्हणजेच, ते कन्सेन्सस क्लायंट आणि एक्झिक्युशन क्लायंटला डेटा स्वॅप करण्यास सक्षम करते. याला 'इंजिन API' म्हणतात आणि त्याचे स्पेक्स [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) वर उपलब्ध आहेत.

## एक्झिक्युशन क्लायंट स्पेक {#spec}

[GitHub वर संपूर्ण JSON-RPC API स्पेक वाचा](https://github.com/ethereum/execution-apis). हे API [एक्झिक्युशन API वेबपेज](https://ethereum.github.io/execution-apis/) वर डॉक्युमेंट केलेले आहे आणि त्यात सर्व उपलब्ध पद्धती वापरून पाहण्यासाठी एक इन्स्पेक्टर समाविष्ट आहे.

## संकेत {#conventions}

### हेक्स व्हॅल्यू एन्कोडिंग {#hex-encoding}

JSON वर दोन प्रमुख डेटा प्रकार पाठवले जातात: अनफॉर्मेटेड बाइट ॲरे आणि क्वांटिटीज. दोन्ही हेक्स एन्कोडिंगसह पाठवले जातात परंतु फॉरमॅटिंगसाठी वेगवेगळ्या आवश्यकतांसह.

#### क्वांटिटीज {#quantities-encoding}

क्वांटिटीज (पूर्णांक, संख्या) एन्कोड करताना: हेक्स म्हणून एन्कोड करा, "0x" सह उपसर्ग लावा, सर्वात कॉम्पॅक्ट रिप्रेझेंटेशन (थोडा अपवाद: शून्य "0x0" म्हणून दर्शविले पाहिजे).

येथे काही उदाहरणे आहेत:

- 0x41 (दशमान पद्धतीत 65)
- 0x400 (दशमान पद्धतीत 1024)
- चुकीचे: 0x (नेहमी किमान एक अंक असावा - शून्य म्हणजे "0x0")
- चुकीचे: 0x0400 (सुरुवातीला शून्य अनुमत नाही)
- चुकीचे: ff (0x ने उपसर्ग लावलेला असणे आवश्यक आहे)

### अनफॉर्मेटेड डेटा {#unformatted-data-encoding}

अनफॉर्मेटेड डेटा (बाइट ॲरे, अकाउंट ॲड्रेस, हॅश, बायकोड ॲरे) एन्कोड करताना: हेक्स म्हणून एन्कोड करा, "0x" सह उपसर्ग लावा, प्रत्येक बाईटसाठी दोन हेक्स अंक.

येथे काही उदाहरणे आहेत:

- 0x41 (आकार 1, "A")
- 0x004200 (आकार 3, "0B0")
- 0x (आकार 0, "")
- चुकीचे: 0xf0f0f (सम संख्येचे अंक असणे आवश्यक आहे)
- चुकीचे: 004200 (0x ने उपसर्ग लावलेला असणे आवश्यक आहे)

### ब्लॉक पॅरामीटर {#block-parameter}

खालील पद्धतींमध्ये ब्लॉक पॅरामीटर आहे:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

जेव्हा Ethereum च्या स्टेटची क्वेरी करणाऱ्या रिक्वेस्ट्स केल्या जातात, तेव्हा प्रदान केलेला ब्लॉक पॅरामीटर ब्लॉकची उंची ठरवतो.

ब्लॉक पॅरामीटरसाठी खालील पर्याय शक्य आहेत:

- `HEX स्ट्रिंग` - एक पूर्णांक ब्लॉक क्रमांक
- सर्वात आधीच्या/जेनेसिस ब्लॉकसाठी `स्ट्रिंग "earliest"`
- नवीनतम प्रस्तावित ब्लॉकसाठी `स्ट्रिंग "latest"`
- नवीनतम सुरक्षित हेड ब्लॉकसाठी `स्ट्रिंग "safe"`
- नवीनतम फायनलाइज्ड ब्लॉकसाठी `स्ट्रिंग "finalized"`
- प्रलंबित स्टेट/व्यवहारांसाठी `स्ट्रिंग "pending"`

## उदाहरणे

या पृष्ठावर आम्ही कमांड लाइन टूल, [curl](https://curl.se) वापरून वैयक्तिक JSON_RPC API एंडपॉइंट्स कसे वापरावे याची उदाहरणे देतो. हे वैयक्तिक एंडपॉइंट उदाहरणे खाली [Curl उदाहरणे](#curl-examples) विभागात आढळतील. पृष्ठावर पुढे, आम्ही Geth नोड, JSON_RPC API आणि curl वापरून स्मार्ट कॉन्ट्रॅक्ट कंपाईल आणि डिप्लॉय करण्यासाठी [एंड-टू-एंड उदाहरण](#usage-example) देखील प्रदान करतो.

## Curl उदाहरणे {#curl-examples}

Ethereum नोडवर [curl](https://curl.se) रिक्वेस्ट करून JSON_RPC API वापरण्याची उदाहरणे खाली दिली आहेत. प्रत्येक उदाहरणात विशिष्ट एंडपॉइंटचे वर्णन, त्याचे पॅरामीटर्स, रिटर्न प्रकार आणि ते कसे वापरावे याचे एक सविस्तर उदाहरण समाविष्ट आहे.

curl रिक्वेस्ट्स कंटेंट प्रकाराशी संबंधित एरर मेसेज परत करू शकतात. हे असे आहे कारण `--data` पर्याय कंटेंट प्रकार `application/x-www-form-urlencoded` वर सेट करतो. जर तुमचा नोड याबद्दल तक्रार करत असेल, तर कॉलच्या सुरुवातीला `-H "Content-Type: application/json"` ठेवून हेडर मॅन्युअली सेट करा. उदाहरणांमध्ये URL/IP आणि पोर्ट यांचे संयोजन समाविष्ट नाही, जे curl ला दिलेले शेवटचे आर्ग्युमेंट असणे आवश्यक आहे (उदा., `127.0.0.1:8545`). या अतिरिक्त डेटासह एक संपूर्ण curl रिक्वेस्ट खालीलप्रमाणे असते:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## गॉसिप, स्टेट, हिस्ट्री {#gossip-state-history}

काही मूळ JSON-RPC पद्धतींना Ethereum नेटवर्कमधून डेटा आवश्यक असतो आणि त्या मुख्यत्वे तीन श्रेणींमध्ये येतात: _गॉसिप, स्टेट आणि हिस्ट्री_. प्रत्येक पद्धतीवर जाण्यासाठी या विभागांमधील लिंक वापरा, किंवा पद्धतींची संपूर्ण यादी पाहण्यासाठी अनुक्रमणिका वापरा.

### गॉसिप पद्धती {#gossip-methods}

> या पद्धती चेनच्या हेडचा मागोवा ठेवतात. याद्वारे व्यवहार नेटवर्कमध्ये फिरतात, ब्लॉक्समध्ये त्यांचा मार्ग शोधतात आणि क्लायंटला नवीन ब्लॉक्सबद्दल माहिती मिळते.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### स्टेट पद्धती {#state_methods}

> सर्व संग्रहित डेटाची सद्यस्थिती नोंदवणाऱ्या पद्धती. "स्टेट" म्हणजे RAM चा एक मोठा सामायिक तुकडा, आणि त्यात अकाउंट बॅलन्स, कॉन्ट्रॅक्ट डेटा आणि गॅस अंदाज यांचा समावेश असतो.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### हिस्ट्री पद्धती {#history_methods}

> जेनेसिसपर्यंत प्रत्येक ब्लॉकचे ऐतिहासिक रेकॉर्ड मिळवते. हे एका मोठ्या ॲपेंड-ओन्ली फाईलसारखे आहे, आणि त्यात सर्व ब्लॉक हेडर्स, ब्लॉक बॉडीज, अंकल ब्लॉक्स आणि व्यवहार पावती यांचा समावेश असतो.

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

## JSON-RPC API प्लेग्राउंड

API पद्धती शोधण्यासाठी आणि वापरून पाहण्यासाठी तुम्ही [प्लेग्राउंड टूल](https://ethereum-json-rpc.com) वापरू शकता. हे तुम्हाला हे देखील दर्शवते की विविध नोड प्रदात्यांद्वारे कोणत्या पद्धती आणि नेटवर्क समर्थित आहेत.

## JSON-RPC API पद्धती {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

सध्याची क्लायंट आवृत्ती परत करते.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`स्ट्रिंग` - सध्याची क्लायंट आवृत्ती

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// रिझल्ट
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

दिलेल्या डेटाचे Keccak-256 (_प्रमाणित SHA3-256 नाही_) परत करते.

**पॅरामीटर्स**

1. `DATA` - SHA3 हॅशमध्ये रूपांतरित करण्यासाठी डेटा

```js
params: ["0x68656c6c6f20776f726c64"]
```

**रिटर्न्स**

`DATA` - दिलेल्या स्ट्रिंगचा SHA3 परिणाम.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// परिणाम
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

सध्याचा नेटवर्क आयडी परत करतो.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`स्ट्रिंग` - सध्याचा नेटवर्क आयडी.

सध्याच्या नेटवर्क आयडींची संपूर्ण यादी [chainlist.org](https://chainlist.org) येथे उपलब्ध आहे. काही सामान्य आयडी खालीलप्रमाणे आहेत:

- `1`: Ethereum Mainnet
- `11155111`: Sepolia testnet
- `560048` : Hoodi Testnet

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

जर क्लायंट नेटवर्क कनेक्शनसाठी सक्रियपणे ऐकत असेल तर `true` परत करते.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`बूलियन` - ऐकत असताना `true`, अन्यथा `false`.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

सध्या क्लायंटशी कनेक्टेड असलेल्या पीअर्सची संख्या परत करते.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`QUANTITY` - कनेक्टेड पीअर्सच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// परिणाम
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

सध्याची Ethereum प्रोटोकॉल आवृत्ती परत करते. लक्षात घ्या की ही मेथड [Geth मध्ये उपलब्ध नाही](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`स्ट्रिंग` - सध्याची Ethereum प्रोटोकॉल आवृत्ती

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

सिंक स्थितीबद्दल डेटा असलेले ऑब्जेक्ट किंवा `false` परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

अचूक रिटर्न डेटा क्लायंट अंमलबजावणीनुसार बदलतो. जेव्हा नोड सिंक होत नाही तेव्हा सर्व क्लायंट `False` परत करतात आणि सर्व क्लायंट खालील फील्ड्स परत करतात.

`ऑब्जेक्ट|बूलियन`, सिंक स्थिती डेटा असलेले ऑब्जेक्ट किंवा सिंक होत नसताना `FALSE`:

- `startingBlock`: `QUANTITY` - ज्या ब्लॉकवर आयात सुरू झाली (सिंक त्याच्या हेडवर पोहोचल्यानंतरच रीसेट होईल)
- `currentBlock`: `QUANTITY` - सध्याचा ब्लॉक, eth_blockNumber प्रमाणेच
- `highestBlock`: `QUANTITY` - अंदाजे सर्वोच्च ब्लॉक

तथापि, वैयक्तिक क्लायंट अतिरिक्त डेटा देखील प्रदान करू शकतात. उदाहरणार्थ, Geth खालीलप्रमाणे परत करते:

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

तर Besu परत करते:

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

अधिक तपशिलांसाठी तुमच्या विशिष्ट क्लायंटच्या डॉक्युमेंटेशनचा संदर्भ घ्या.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// किंवा सिंक होत नसताना
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

क्लायंटचा कॉईनबेस ॲड्रेस परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

> **टीप:** ही मेथड **v1.14.0** पासून नापसंत केली आहे आणि आता समर्थित नाही. ही मेथड वापरण्याचा प्रयत्न केल्यास "Method not supported" अशी त्रुटी येईल.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`DATA`, 20 बाईट्स - सध्याचा कॉईनबेस ॲड्रेस.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// परिणाम
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

रिप्ले-प्रोटेक्टेड व्यवहारांवर स्वाक्षरी करण्यासाठी वापरलेला चेन आयडी परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`chainId`, सध्याच्या चेन आयडीचा पूर्णांक दर्शवणारी स्ट्रिंग म्हणून हेक्साडेसिमल मूल्य.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

जर क्लायंट सक्रियपणे नवीन ब्लॉक्स माइन करत असेल तर `true` परत करते. हे फक्त प्रूफ-ऑफ-वर्क नेटवर्क्ससाठी `true` परत करू शकते आणि [The Merge](/roadmap/merge/) पासून काही क्लायंट्समध्ये उपलब्ध नसू शकते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`बूलियन` - जर क्लायंट माइनिंग करत असेल तर `true` परत करते, अन्यथा `false`.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

नोड ज्या दराने माइनिंग करत आहे, त्या दरातील हॅश प्रति सेकंद संख्या परत करते. हे फक्त प्रूफ-ऑफ-वर्क नेटवर्क्ससाठी `true` परत करू शकते आणि [The Merge](/roadmap/merge/) पासून काही क्लायंट्समध्ये उपलब्ध नसू शकते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`क्वांटिटी` - प्रति सेकंद हॅशची संख्या.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// रिझल्ट
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

wei मध्ये प्रति गॅस सध्याच्या किंमतीचा अंदाज परत करते. उदाहरणार्थ, बेसू क्लायंट शेवटच्या 100 ब्लॉक्सची तपासणी करतो आणि डीफॉल्टनुसार गॅस युनिटची सरासरी किंमत परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`क्वांटिटी` - wei मधील सध्याच्या गॅस किंमतीचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// रिझल्ट
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

क्लायंटच्या मालकीच्या ॲड्रेसची यादी परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`डेटाची ॲरे`, 20 बाइट्स - क्लायंटच्या मालकीचे ॲड्रेस.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

सर्वात अलीकडील ब्लॉकचा क्रमांक परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`क्वांटिटी` - क्लायंट ज्या वर्तमान ब्लॉक नंबरवर आहे त्याचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// रिझल्ट
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

दिलेल्या ॲड्रेसवरील अकाउंटची बॅलन्स परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 20 बाइट्स - बॅलन्स तपासण्यासाठीचा ॲड्रेस.
2. `क्वांटिटी|टॅग` - पूर्णांक ब्लॉक नंबर, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, किंवा `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा.

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**रिटर्न्स**

`क्वांटिटी` - wei मध्ये वर्तमान बॅलन्सचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

दिलेल्या ॲड्रेसवर स्टोरेज पोझिशनवरून व्हॅल्यू परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 20 बाइट्स - स्टोरेजचा ॲड्रेस.
2. `क्वांटिटी` - स्टोरेजमधील पोझिशनचा पूर्णांक.
3. `क्वांटिटी|टॅग` - पूर्णांक ब्लॉक नंबर, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा.

**रिटर्न्स**

`डेटा` - या स्टोरेज पोझिशनवरील व्हॅल्यू.

**उदाहरण**
योग्य पोझिशनची गणना करणे मिळवल्या जाणाऱ्या स्टोरेजवर अवलंबून असते. `0x391694e7e0b0cce554cb130d723a9d27458f9298` या ॲड्रेसद्वारे `0x295a70b2de5e3953354a6a8344e616ed314d7251` येथे डिप्लॉय केलेला खालील कॉन्ट्रॅक्ट विचारात घ्या.

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

pos0 चे मूल्य मिळवणे सोपे आहे:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

मॅपचा एक घटक मिळवणे अधिक कठीण आहे. मॅपमधील घटकाची स्थिती यासह मोजली जाते:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

याचा अर्थ pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] वरील स्टोरेज मिळवण्यासाठी आपल्याला यासह पोझिशनची गणना करणे आवश्यक आहे:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Geth कन्सोल, जो web3 लायब्ररीसह येतो, गणना करण्यासाठी वापरला जाऊ शकतो:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

आता स्टोरेज मिळवण्यासाठी:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

एका ॲड्रेसवरून _पाठवलेल्या_ व्यवहारांची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 20 बाइट्स - ॲड्रेस.
2. `क्वांटिटी|टॅग` - पूर्णांक ब्लॉक नंबर, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा.

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // नवीनतम ब्लॉकवरील स्टेट
]
```

**रिटर्न्स**

`QUANTITY` - या ॲड्रेसवरून पाठवलेल्या ट्रान्झॅक्शन्सची संख्या (पूर्णांक).

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

दिलेल्या ब्लॉक हॅशशी जुळणाऱ्या ब्लॉकमधील व्यवहारांची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - ब्लॉकचा हॅश

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**रिटर्न्स**

`क्वांटिटी` - या ब्लॉकमधील व्यवहारांच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

दिलेल्या ब्लॉक नंबरशी जुळणाऱ्या ब्लॉकमधील व्यवहारांची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `क्वांटिटी|टॅग` - ब्लॉक नंबरचा पूर्णांक, किंवा स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` किंवा `"finalized"`, जसे की [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) मध्ये.

```js
params: [
  "0x13738ca", // 20396234
]
```

**रिटर्न्स**

`क्वांटिटी` - या ब्लॉकमधील व्यवहारांच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

दिलेल्या ब्लॉक हॅशशी जुळणाऱ्या ब्लॉकमधील अंकलची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - ब्लॉकचा हॅश

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**रिटर्न्स**

`क्वांटिटी` - या ब्लॉकमधील अंकलच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

दिलेल्या ब्लॉक नंबरशी जुळणाऱ्या ब्लॉकमधील अंकलची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `क्वांटिटी|टॅग` - ब्लॉक नंबरचा पूर्णांक, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा.

```js
params: [
  "0xe8", // 232
]
```

**रिटर्न्स**

`क्वांटिटी` - या ब्लॉकमधील अंकलच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

दिलेल्या ॲड्रेसवरील कोड परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 20 बाइट्स - ॲड्रेस
2. `क्वांटिटी|टॅग` - पूर्णांक ब्लॉक नंबर, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा.

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**रिटर्न्स**

`डेटा` - दिलेल्या ॲड्रेसवरून कोड.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

साइन पद्धत `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))` सह एक Ethereum विशिष्ट स्वाक्षरी मोजते.

मेसेजमध्ये उपसर्ग जोडल्याने मोजलेली स्वाक्षरी Ethereum विशिष्ट स्वाक्षरी म्हणून ओळखण्यायोग्य बनते. हे गैरवापर टाळते, जिथे एक दुर्भावनायुक्त dapp कोणताही डेटा (उदा. ट्रान्झॅक्शन) साइन करू शकते आणि पीडिताचे सोंग घेण्यासाठी त्या सहीचा वापर करू शकते.

टीप: स्वाक्षरी करण्यासाठी ॲड्रेस अनलॉक केलेला असणे आवश्यक आहे.

**पॅरामीटर्स**

1. `डेटा`, 20 बाइट्स - ॲड्रेस
2. `डेटा`, N बाइट्स - स्वाक्षरी करण्यासाठी मेसेज

**रिटर्न्स**

`डेटा`: स्वाक्षरी

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

नेटवर्कवर नंतर [eth_sendRawTransaction](#eth_sendrawtransaction) सह सबमिट करता येईल अशा व्यवहारावर स्वाक्षरी करते.

**पॅरामीटर्स**

1. `ऑब्जेक्ट` - व्यवहार ऑब्जेक्ट

- `प्रकार`:
- `from`: `डेटा`, 20 बाइट्स - ज्या ॲड्रेसवरून व्यवहार पाठवला आहे.
- `to`: `डेटा`, 20 बाइट्स - (नवीन कॉन्ट्रॅक्ट तयार करताना पर्यायी) ज्या ॲड्रेसवर व्यवहार पाठवला आहे.
- `gas`: `क्वांटिटी` - (पर्यायी, डीफॉल्ट: 90000) व्यवहार अंमलबजावणीसाठी प्रदान केलेल्या गॅसचा पूर्णांक. हे न वापरलेला गॅस परत करेल.
- `gasPrice`: `क्वांटिटी` - (पर्यायी, डीफॉल्ट: ठरवले जाईल) प्रत्येक भरलेल्या गॅससाठी वापरल्या जाणार्‍या gasPrice चा पूर्णांक, Wei मध्ये.
- `value`: `क्वांटिटी` - (पर्यायी) या व्यवहारासह पाठवलेल्या व्हॅल्यूचा पूर्णांक, Wei मध्ये.
- `data`: `डेटा` - कॉन्ट्रॅक्टचा कंपाईल केलेला कोड किंवा लागू केलेल्या पद्धतीच्या स्वाक्षरीचा हॅश आणि एन्कोड केलेले पॅरामीटर्स.
- `nonce`: `क्वांटिटी` - (पर्यायी) नॉन्सचा पूर्णांक. हे तुम्हाला समान नॉन्स वापरणाऱ्या तुमच्या स्वतःच्या प्रलंबित व्यवहारांना ओव्हरराईट करण्याची परवानगी देते.

**रिटर्न्स**

`डेटा`, निर्दिष्ट खात्याद्वारे स्वाक्षरी केलेला RLP-एन्कोडेड व्यवहार ऑब्जेक्ट.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// रिझल्ट
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

नवीन मेसेज कॉल व्यवहार किंवा कॉन्ट्रॅक्ट निर्मिती तयार करते, जर डेटा फील्डमध्ये कोड असेल आणि `from` मध्ये निर्दिष्ट केलेल्या अकाउंटचा वापर करून त्यावर स्वाक्षरी करते.

**पॅरामीटर्स**

1. `ऑब्जेक्ट` - व्यवहार ऑब्जेक्ट

- `from`: `डेटा`, 20 बाइट्स - ज्या ॲड्रेसवरून व्यवहार पाठवला आहे.
- `to`: `डेटा`, 20 बाइट्स - (नवीन कॉन्ट्रॅक्ट तयार करताना पर्यायी) ज्या ॲड्रेसवर व्यवहार पाठवला आहे.
- `gas`: `क्वांटिटी` - (पर्यायी, डीफॉल्ट: 90000) व्यवहार अंमलबजावणीसाठी प्रदान केलेल्या गॅसचा पूर्णांक. हे न वापरलेला गॅस परत करेल.
- `gasPrice`: `क्वांटिटी` - (पर्यायी, डीफॉल्ट: ठरवले जाईल) प्रत्येक भरलेल्या गॅससाठी वापरल्या जाणार्‍या gasPrice चा पूर्णांक.
- `value`: `क्वांटिटी` - (पर्यायी) या व्यवहारासह पाठवलेल्या व्हॅल्यूचा पूर्णांक.
- `input`: `डेटा` - कॉन्ट्रॅक्टचा कंपाईल केलेला कोड किंवा लागू केलेल्या पद्धतीच्या स्वाक्षरीचा हॅश आणि एन्कोड केलेले पॅरामीटर्स.
- `nonce`: `क्वांटिटी` - (पर्यायी) नॉन्सचा पूर्णांक. हे तुम्हाला समान नॉन्स वापरणाऱ्या तुमच्या स्वतःच्या प्रलंबित व्यवहारांना ओव्हरराईट करण्याची परवानगी देते.

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

**रिटर्न्स**

`डेटा`, 32 बाइट्स - व्यवहार हॅश, किंवा व्यवहार अद्याप उपलब्ध नसल्यास शून्य हॅश.

तुम्ही कॉन्ट्रॅक्ट तयार केल्यावर, व्यवहार ब्लॉकमध्ये प्रस्तावित झाल्यानंतर, कॉन्ट्रॅक्ट ॲड्रेस मिळवण्यासाठी [eth_getTransactionReceipt](#eth_gettransactionreceipt) वापरा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

स्वाक्षरी केलेल्या व्यवहारांसाठी नवीन मेसेज कॉल व्यवहार किंवा कॉन्ट्रॅक्ट निर्मिती तयार करते.

**पॅरामीटर्स**

1. `डेटा`, स्वाक्षरी केलेला व्यवहार डेटा.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**रिटर्न्स**

`डेटा`, 32 बाइट्स - व्यवहार हॅश, किंवा व्यवहार अद्याप उपलब्ध नसल्यास शून्य हॅश.

तुम्ही कॉन्ट्रॅक्ट तयार केल्यावर, व्यवहार ब्लॉकमध्ये प्रस्तावित झाल्यानंतर, कॉन्ट्रॅक्ट ॲड्रेस मिळवण्यासाठी [eth_getTransactionReceipt](#eth_gettransactionreceipt) वापरा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

ब्लॉकचेनवर व्यवहार तयार न करता त्वरित एक नवीन मेसेज कॉल कार्यान्वित करते. बर्‍याचदा केवळ-वाचनीय स्मार्ट कॉन्ट्रॅक्ट फंक्शन्स कार्यान्वित करण्यासाठी वापरले जाते, उदाहरणार्थ ERC-20 कॉन्ट्रॅक्टसाठी `balanceOf`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `ऑब्जेक्ट` - व्यवहार कॉल ऑब्जेक्ट

- `from`: `डेटा`, 20 बाइट्स - (पर्यायी) ज्या ॲड्रेसवरून व्यवहार पाठवला आहे.
- `to`: `डेटा`, 20 बाइट्स - ज्या ॲड्रेसवर व्यवहार पाठवला आहे.
- `gas`: `क्वांटिटी` - (पर्यायी) व्यवहार अंमलबजावणीसाठी प्रदान केलेल्या गॅसचा पूर्णांक. eth_call शून्य गॅस वापरतो, परंतु काही अंमलबजावणीसाठी या पॅरामीटरची आवश्यकता असू शकते.
- `gasPrice`: `क्वांटिटी` - (पर्यायी) प्रत्येक भरलेल्या गॅससाठी वापरल्या जाणार्‍या gasPrice चा पूर्णांक.
- `value`: `क्वांटिटी` - (पर्यायी) या व्यवहारासह पाठवलेल्या व्हॅल्यूचा पूर्णांक.
- `input`: `डेटा` - (पर्यायी) पद्धतीच्या स्वाक्षरीचा हॅश आणि एन्कोड केलेले पॅरामीटर्स. तपशीलांसाठी सॉलिडिटी डॉक्युमेंटेशनमधील [Ethereum Contract ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) पहा.

2. `क्वांटिटी|टॅग` - पूर्णांक ब्लॉक नंबर, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा.

**रिटर्न्स**

`डेटा` - कार्यान्वित केलेल्या कॉन्ट्रॅक्टची रिटर्न व्हॅल्यू.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

व्यवहार पूर्ण होण्यासाठी किती गॅस आवश्यक आहे याचा अंदाज तयार करते आणि परत करते. व्यवहार ब्लॉकचेनमध्ये जोडला जाणार नाही. लक्षात घ्या की EVM मेकॅनिक्स आणि नोड परफॉर्मन्ससह विविध कारणांमुळे अंदाज व्यवहाराद्वारे प्रत्यक्षात वापरल्या गेलेल्या गॅसच्या रकमेपेक्षा लक्षणीयरीत्या जास्त असू शकतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

[eth_call](#eth_call) पॅरामीटर्स पहा, वगळता सर्व प्रॉपर्टीज पर्यायी आहेत. जर कोणतीही गॅस मर्यादा निर्दिष्ट केली नसेल तर geth प्रलंबित ब्लॉकमधून ब्लॉक गॅस मर्यादा वरची मर्यादा म्हणून वापरते. परिणामी, जेव्हा गॅसची रक्कम प्रलंबित ब्लॉक गॅस मर्यादेपेक्षा जास्त असते, तेव्हा परत केलेला अंदाज कॉल/ट्रान्झॅक्शन कार्यान्वित करण्यासाठी पुरेसा नसू शकतो.

**रिटर्न्स**

`क्वांटिटी` - वापरलेल्या गॅसची रक्कम.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

हॅशद्वारे ब्लॉकबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - ब्लॉकचा हॅश.
2. `बुलियन` - `true` असल्यास ते संपूर्ण व्यवहार ऑब्जेक्ट परत करते, `false` असल्यास केवळ व्यवहारांचे हॅश.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**रिटर्न्स**

`ऑब्जेक्ट` - एक ब्लॉक ऑब्जेक्ट, किंवा कोणताही ब्लॉक न सापडल्यास `null`:

- `number`: `क्वांटिटी` - ब्लॉक क्रमांक. प्रलंबित ब्लॉक असल्यास `null`.
- `hash`: `डेटा`, 32 बाइट्स - ब्लॉकचा हॅश. प्रलंबित ब्लॉक असल्यास `null`.
- `parentHash`: `डेटा`, 32 बाइट्स - पॅरेंट ब्लॉकचा हॅश.
- `nonce`: `डेटा`, 8 बाइट्स - व्युत्पन्न प्रूफ-ऑफ-वर्कचा हॅश. प्रलंबित ब्लॉक असल्यास `null`, प्रूफ-ऑफ-स्टेक ब्लॉक्ससाठी `0x0` (द मर्ज पासून)
- `sha3Uncles`: `डेटा`, 32 बाइट्स - ब्लॉकमधील अंकल डेटाचा SHA3.
- `logsBloom`: `डेटा`, 256 बाइट्स - ब्लॉकच्या लॉगसाठी ब्लूम फिल्टर. प्रलंबित ब्लॉक असल्यास `null`.
- `transactionsRoot`: `डेटा`, 32 बाइट्स - ब्लॉकच्या व्यवहार ट्रीचे रूट.
- `stateRoot`: `डेटा`, 32 बाइट्स - ब्लॉकच्या अंतिम स्टेट ट्रीचे रूट.
- `receiptsRoot`: `डेटा`, 32 बाइट्स - ब्लॉकच्या रिसीट्स ट्रीचे रूट.
- `miner`: `डेटा`, 20 बाइट्स - लाभार्थीचा ॲड्रेस ज्याला ब्लॉक रिवॉर्ड्स दिले गेले.
- `difficulty`: `क्वांटिटी` - या ब्लॉकसाठी डिफिकल्टीचा पूर्णांक.
- `totalDifficulty`: `क्वांटिटी` - या ब्लॉकपर्यंतच्या चेनच्या एकूण डिफिकल्टीचा पूर्णांक.
- `extraData`: `डेटा` - या ब्लॉकचे "अतिरिक्त डेटा" फील्ड.
- `size`: `क्वांटिटी` - या ब्लॉकचा बाइट्समधील आकाराचा पूर्णांक.
- `gasLimit`: `क्वांटिटी` - या ब्लॉकमध्ये अनुमत कमाल गॅस.
- `gasUsed`: `क्वांटिटी` - या ब्लॉकमधील सर्व व्यवहारांद्वारे वापरलेला एकूण गॅस.
- `timestamp`: `क्वांटिटी` - ब्लॉक कधी एकत्रित केला गेला याचा युनिक्स टाइमस्टॅम्प.
- `transactions`: `ॲरे` - व्यवहार ऑब्जेक्ट्सची ॲरे, किंवा शेवटच्या दिलेल्या पॅरामीटरवर अवलंबून 32 बाइट्स व्यवहार हॅश.
- `uncles`: `ॲरे` - अंकल हॅशची ॲरे.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// निकाल
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

ब्लॉक नंबरद्वारे ब्लॉकबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `क्वांटिटी|टॅग` - ब्लॉक नंबरचा पूर्णांक, किंवा स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` किंवा `"finalized"`, जसे की [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) मध्ये.
2. `बुलियन` - `true` असल्यास ते संपूर्ण व्यवहार ऑब्जेक्ट परत करते, `false` असल्यास केवळ व्यवहारांचे हॅश.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**रिटर्न्स**
[eth_getBlockByHash](#eth_getblockbyhash) पहा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

[eth_getBlockByHash](#eth_getblockbyhash) चा रिझल्ट पहा.

### eth_getTransactionByHash {#eth_gettransactionbyhash}

व्यवहार हॅशद्वारे विनंती केलेल्या व्यवहाराबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - व्यवहाराचा हॅश

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**रिटर्न्स**

`ऑब्जेक्ट` - एक व्यवहार ऑब्जेक्ट, किंवा कोणताही व्यवहार न सापडल्यास `null`:

- `blockHash`: `डेटा`, 32 बाइट्स - ज्या ब्लॉकमध्ये हा व्यवहार होता त्याचा हॅश. प्रलंबित असल्यास `null`.
- `blockNumber`: `क्वांटिटी` - ज्या ब्लॉक नंबरमध्ये हा व्यवहार होता. प्रलंबित असल्यास `null`.
- `from`: `डेटा`, 20 बाइट्स - प्रेषकाचा ॲड्रेस.
- `gas`: `क्वांटिटी` - प्रेषकाने प्रदान केलेला गॅस.
- `gasPrice`: `क्वांटिटी` - प्रेषकाने Wei मध्ये प्रदान केलेली गॅस किंमत.
- `hash`: `डेटा`, 32 बाइट्स - व्यवहाराचा हॅश.
- `input`: `डेटा` - व्यवहारासह पाठवलेला डेटा.
- `nonce`: `क्वांटिटी` - यापूर्वी प्रेषकाने केलेल्या व्यवहारांची संख्या.
- `to`: `डेटा`, 20 बाइट्स - प्राप्तकर्त्याचा ॲड्रेस. कॉन्ट्रॅक्ट निर्मिती व्यवहार असल्यास `null`.
- `transactionIndex`: `क्वांटिटी` - ब्लॉकमधील व्यवहारांच्या निर्देशांक स्थितीचा पूर्णांक. प्रलंबित असल्यास `null`.
- `value`: `क्वांटिटी` - Wei मध्ये हस्तांतरित केलेली व्हॅल्यू.
- `v`: `क्वांटिटी` - ECDSA रिकव्हरी आयडी
- `r`: `क्वांटिटी` - ECDSA स्वाक्षरी r
- `s`: `क्वांटिटी` - ECDSA स्वाक्षरी s

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// रिझल्ट
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

ब्लॉक हॅश आणि व्यवहार निर्देशांक स्थितीद्वारे व्यवहाराबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - ब्लॉकचा हॅश.
2. `क्वांटिटी` - व्यवहार निर्देशांक स्थितीचा पूर्णांक.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न्स**
[eth_getTransactionByHash](#eth_gettransactionbyhash) पहा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

[eth_getTransactionByHash](#eth_gettransactionbyhash) चा रिझल्ट पहा.

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

ब्लॉक नंबर आणि व्यवहार निर्देशांक स्थितीद्वारे व्यवहाराबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `क्वांटिटी|टॅग` - एक ब्लॉक नंबर, किंवा स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` किंवा `"finalized"`, जसे की [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) मध्ये.
2. `क्वांटिटी` - व्यवहार निर्देशांक स्थिती.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**रिटर्न्स**
[eth_getTransactionByHash](#eth_gettransactionbyhash) पहा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

[eth_getTransactionByHash](#eth_gettransactionbyhash) चा रिझल्ट पहा.

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

व्यवहार हॅशद्वारे व्यवहाराची पावती परत करते.

**टीप** ती पावती प्रलंबित व्यवहारांसाठी उपलब्ध नाही.

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - व्यवहाराचा हॅश

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**रिटर्न्स**
`ऑब्जेक्ट` - एक व्यवहार पावती ऑब्जेक्ट, किंवा कोणतीही पावती न सापडल्यास `null`:

- `transactionHash `: `डेटा`, 32 बाइट्स - व्यवहाराचा हॅश.
- `transactionIndex`: `क्वांटिटी` - ब्लॉकमधील व्यवहारांच्या निर्देशांक स्थितीचा पूर्णांक.
- `blockHash`: `डेटा`, 32 बाइट्स - ज्या ब्लॉकमध्ये हा व्यवहार होता त्याचा हॅश.
- `blockNumber`: `क्वांटिटी` - ज्या ब्लॉक नंबरमध्ये हा व्यवहार होता.
- `from`: `डेटा`, 20 बाइट्स - प्रेषकाचा ॲड्रेस.
- `to`: `डेटा`, 20 बाइट्स - प्राप्तकर्त्याचा ॲड्रेस. कॉन्ट्रॅक्ट निर्मिती व्यवहार असल्यास null.
- `cumulativeGasUsed` : `क्वांटिटी ` - ब्लॉकमध्ये हा व्यवहार कार्यान्वित झाल्यावर वापरलेल्या गॅसची एकूण रक्कम.
- `effectiveGasPrice` : `क्वांटिटी` - प्रति गॅस युनिट भरलेल्या बेस फी आणि टिपची बेरीज.
- `gasUsed `: `क्वांटिटी ` - केवळ या विशिष्ट व्यवहाराद्वारे वापरलेल्या गॅसची रक्कम.
- `contractAddress `: `डेटा`, 20 बाइट्स - तयार केलेला कॉन्ट्रॅक्ट ॲड्रेस, जर व्यवहार कॉन्ट्रॅक्ट निर्मितीचा असेल, अन्यथा `null`.
- `logs`: `ॲरे` - लॉग ऑब्जेक्ट्सची ॲरे, जी या व्यवहाराने तयार केली.
- `logsBloom`: `डेटा`, 256 बाइट्स - लाईट क्लायंटसाठी संबंधित लॉग्स त्वरीत पुनर्प्राप्त करण्यासाठी ब्लूम फिल्टर.
- `प्रकार`: `क्वांटिटी` - व्यवहार प्रकाराचा पूर्णांक, लेगसी व्यवहारांसाठी `0x0`, ॲक्सेस लिस्ट प्रकारांसाठी `0x1`, डायनॅमिक फीसाठी `0x2`.

ते _एकतर_ परत करते:

- `root` : `DATA` ट्रान्झॅक्शननंतरच्या स्टेट रूटचे 32 बाइट्स (बायझँटियमपूर्व)
- `status`: `क्वांटिटी` एकतर `1` (यशस्वी) किंवा `0` (अयशस्वी)

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// रिझल्ट
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // तयार झाल्यास ॲड्रेसची स्ट्रिंग
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs, इत्यादीद्वारे परत केलेले लॉग.
    }],
    "logsBloom": "0x00...0", // 256 बाइट ब्लूम फिल्टर
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

हॅश आणि अंकल इंडेक्स पोझिशनद्वारे ब्लॉकच्या अंकलची माहिती परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `डेटा`, 32 बाइट्स - ब्लॉकचा हॅश.
2. `क्वांटिटी` - अंकलची निर्देशांक स्थिती.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न्स**
[eth_getBlockByHash](#eth_getblockbyhash) पहा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

[eth_getBlockByHash](#eth_getblockbyhash) चा रिझल्ट पहा.

**टीप**: अंकलमध्ये वैयक्तिक व्यवहार नसतात.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

क्रमांक आणि अंकल इंडेक्स पोझिशनद्वारे ब्लॉकच्या अंकलची माहिती परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  प्लेग्राउंडमध्ये एंडपॉईंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `क्वांटिटी|टॅग` - एक ब्लॉक नंबर, किंवा स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, जसे की [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) मध्ये.
2. `क्वांटिटी` - अंकलची निर्देशांक स्थिती.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**रिटर्न्स**
[eth_getBlockByHash](#eth_getblockbyhash) पहा.

**टीप**: अंकलमध्ये वैयक्तिक व्यवहार नसतात.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

[eth_getBlockByHash](#eth_getblockbyhash) चा रिझल्ट पहा.

### eth_newFilter {#eth_newfilter}

स्टेट बदलल्यावर (लॉग) सूचित करण्यासाठी, फिल्टर पर्यायांवर आधारित फिल्टर ऑब्जेक्ट तयार करते.
स्टेट बदलले आहे की नाही हे तपासण्यासाठी, [eth_getFilterChanges](#eth_getfilterchanges) कॉल करा.

**विषय फिल्टर निर्दिष्ट करण्यावर एक टीप:**
विषय क्रम-अवलंबून आहेत. [A, B] विषयांसह लॉग असलेल्या व्यवहारास खालील विषय फिल्टरद्वारे जुळवले जाईल:

- `[]` "काहीही"
- `[A]` "पहिल्या स्थानावर A (आणि नंतर काहीही)"
- `[null, B]` "पहिल्या स्थानावर काहीही आणि दुसऱ्या स्थानावर B (आणि नंतर काहीही)"
- `[A, B]` "पहिल्या स्थानावर A आणि दुसऱ्या स्थानावर B (आणि नंतर काहीही)"
- `[[A, B], [A, B]]` "पहिल्या स्थानावर (A किंवा B) आणि दुसऱ्या स्थानावर (A किंवा B) (आणि नंतर काहीही)"
- **पॅरामीटर्स**

1. `ऑब्जेक्ट` - फिल्टर पर्याय:

- `fromBlock`: `क्वांटिटी|टॅग` - (पर्यायी, डीफॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम फायनलाइज्ड ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `toBlock`: `क्वांटिटी|टॅग` - (पर्यायी, डीफॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम फायनलाइज्ड ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `address`: `डेटा|ॲरे`, 20 बाइट्स - (पर्यायी) कॉन्ट्रॅक्ट ॲड्रेस किंवा ॲड्रेसची यादी ज्यातून लॉग्स उत्पन्न व्हावेत.
- `topics`: `डेटाची ॲरे`, - (पर्यायी) 32 बाइट्स `डेटा` विषयांची ॲरे. विषय क्रम-अवलंबून आहेत. प्रत्येक विषय "or" पर्यायांसह डेटाची एक ॲरे देखील असू शकतो.

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

**रिटर्न्स**
`क्वांटिटी` - एक फिल्टर आयडी.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

नोडमध्ये एक फिल्टर तयार करते, जेव्हा नवीन ब्लॉक येतो तेव्हा सूचित करण्यासाठी.
स्टेट बदलले आहे की नाही हे तपासण्यासाठी, [eth_getFilterChanges](#eth_getfilterchanges) कॉल करा.

**पॅरामीटर्स**
काहीही नाही

**रिटर्न्स**
`क्वांटिटी` - एक फिल्टर आयडी.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// रिझल्ट
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

नोडमध्ये एक फिल्टर तयार करते, जेव्हा नवीन प्रलंबित व्यवहार येतात तेव्हा सूचित करण्यासाठी.
स्टेट बदलले आहे की नाही हे तपासण्यासाठी, [eth_getFilterChanges](#eth_getfilterchanges) कॉल करा.

**पॅरामीटर्स**
काहीही नाही

**रिटर्न्स**
`क्वांटिटी` - एक फिल्टर आयडी.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// रिझल्ट
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

दिलेल्या आयडीसह एक फिल्टर अनइन्स्टॉल करते. जेव्हा पाहण्याची गरज नसते तेव्हा नेहमी कॉल केला पाहिजे.
याव्यतिरिक्त, जेव्हा काही काळासाठी [eth_getFilterChanges](#eth_getfilterchanges) सह विनंती केली जात नाही तेव्हा फिल्टर्स टाइमआउट होतात.

**पॅरामीटर्स**

1. `क्वांटिटी` - फिल्टर आयडी.

```js
params: [
  "0xb", // 11
]
```

**रिटर्न्स**
`बुलियन` - फिल्टर यशस्वीरित्या अनइन्स्टॉल झाला असल्यास `true`, अन्यथा `false`.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// रिझल्ट
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

फिल्टरसाठी पोलिंग पद्धत, जी शेवटच्या पोलपासून झालेल्या लॉगची एक ॲरे परत करते.

**पॅरामीटर्स**

1. `क्वांटिटी` - फिल्टर आयडी.

```js
params: [
  "0x16", // 22
]
```

**रिटर्न्स**
`ॲरे` - लॉग ऑब्जेक्ट्सची ॲरे, किंवा शेवटच्या पोलपासून काहीही बदलले नसल्यास रिकामी ॲरे.

- `eth_newBlockFilter` सह तयार केलेल्या फिल्टरसाठी, परतावा ब्लॉक हॅशेस (`DATA`, 32 बाइट्स) असतो, उदा. `["0x3454645634534..."]`.

- `eth_newPendingTransactionFilter` सह तयार केलेल्या फिल्टरसाठी, परतावा ट्रान्झॅक्शन हॅशेस (`DATA`, 32 बाइट्स) असतो, उदा. `["0x6345343454645..."]`.

- `eth_newFilter` सह तयार केलेल्या फिल्टर्ससाठी लॉग्स खालील पॅरामीटर्ससह ऑब्जेक्ट्स असतात:
  - `removed`: `टॅग` - चेन पुनर्रचनेमुळे लॉग काढला गेल्यास `true`. वैध लॉग असल्यास `false`.
  - `logIndex`: `क्वांटिटी` - ब्लॉकमधील लॉग निर्देशांक स्थितीचा पूर्णांक. प्रलंबित लॉग असल्यास `null`.
  - `transactionIndex`: `क्वांटिटी` - ज्या व्यवहारांच्या निर्देशांक स्थितीवरून लॉग तयार केला गेला त्याचा पूर्णांक. प्रलंबित लॉग असल्यास `null`.
  - `transactionHash`: `डेटा`, 32 बाइट्स - ज्या व्यवहारांमधून हा लॉग तयार केला गेला त्यांचा हॅश. प्रलंबित लॉग असल्यास `null`.
  - `blockHash`: `डेटा`, 32 बाइट्स - ज्या ब्लॉकमध्ये हा लॉग होता त्याचा हॅश. प्रलंबित असल्यास `null`. प्रलंबित लॉग असल्यास `null`.
  - `blockNumber`: `क्वांटिटी` - ज्या ब्लॉक नंबरमध्ये हा लॉग होता. प्रलंबित असल्यास `null`. प्रलंबित लॉग असल्यास `null`.
  - `address`: `डेटा`, 20 बाइट्स - ज्या ॲड्रेसवरून हा लॉग उत्पन्न झाला.
  - `data`: `DATA` - व्हेरिएबल-लेंग्थ नॉन-इंडेक्स्ड लॉग डेटा. ( _solidity_ मध्ये: शून्य किंवा अधिक 32 बाइट्सचे नॉन-इंडेक्स्ड लॉग आर्ग्युमेंट्स.)
  - `topics`: `डेटाची ॲरे` - 0 ते 4 32 बाइट्स `डेटा` च्या अनुक्रमित लॉग आर्ग्युमेंट्सची ॲरे. ( _solidity_ मध्ये: पहिला टॉपिक हा इव्हेंटच्या सहीचा _हॅश_ असतो (उदा., `Deposit(address,bytes32,uint256)`), जोपर्यंत तुम्ही `anonymous` स्पेसिफायरसह इव्हेंट घोषित केला नसेल.)

- **उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// रिझल्ट
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

दिलेल्या आयडीसह फिल्टरशी जुळणाऱ्या सर्व लॉगची एक ॲरे परत करते.

**पॅरामीटर्स**

1. `क्वांटिटी` - फिल्टर आयडी.

```js
params: [
  "0x16", // 22
]
```

**रिटर्न्स**
[eth_getFilterChanges](#eth_getfilterchanges) पहा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

[eth_getFilterChanges](#eth_getfilterchanges) चा रिझल्ट पहा.

### eth_getLogs {#eth_getlogs}

दिलेल्या फिल्टर ऑब्जेक्टशी जुळणाऱ्या सर्व लॉगची एक ॲरे परत करते.

**पॅरामीटर्स**

1. `ऑब्जेक्ट` - फिल्टर पर्याय:

- `fromBlock`: `क्वांटिटी|टॅग` - (पर्यायी, डीफॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम फायनलाइज्ड ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `toBlock`: `क्वांटिटी|टॅग` - (पर्यायी, डीफॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम फायनलाइज्ड ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `address`: `डेटा|ॲरे`, 20 बाइट्स - (पर्यायी) कॉन्ट्रॅक्ट ॲड्रेस किंवा ॲड्रेसची यादी ज्यातून लॉग्स उत्पन्न व्हावेत.
- `topics`: `डेटाची ॲरे`, - (पर्यायी) 32 बाइट्स `डेटा` विषयांची ॲरे. विषय क्रम-अवलंबून आहेत. प्रत्येक विषय "or" पर्यायांसह डेटाची एक ॲरे देखील असू शकतो.
- `blockHash`: `डेटा`, 32 बाइट्स - (पर्यायी, **भविष्यात**) EIP-234 च्या जोडणीसह, `blockHash` एक नवीन फिल्टर पर्याय असेल जो परत केलेले लॉग 32-बाइट हॅश `blockHash` असलेल्या एकाच ब्लॉकपुरते मर्यादित करेल. `blockHash` वापरणे `fromBlock` = `toBlock` = हॅश `blockHash` असलेल्या ब्लॉक नंबरच्या बरोबरीचे आहे. जर फिल्टर निकषांमध्ये `blockHash` उपस्थित असेल, तर `fromBlock` किंवा `toBlock` दोन्ही अनुमत नाहीत.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**रिटर्न्स**
[eth_getFilterChanges](#eth_getfilterchanges) पहा.

**उदाहरण**

```js
// रिक्वेस्ट
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

[eth_getFilterChanges](#eth_getfilterchanges) चा रिझल्ट पहा.

## वापराचे उदाहरण {#usage-example}

### JSON_RPC वापरून कॉन्ट्रॅक्ट डिप्लॉय करणे {#deploying-contract}

या विभागात फक्त RPC इंटरफेस वापरून कॉन्ट्रॅक्ट कसे डिप्लॉय करायचे याचे प्रात्यक्षिक समाविष्ट आहे. कॉन्ट्रॅक्ट डिप्लॉय करण्यासाठी पर्यायी मार्ग आहेत जिथे ही गुंतागुंत दूर केली जाते—उदाहरणार्थ, RPC इंटरफेसवर तयार केलेल्या लायब्ररीज वापरणे जसे की [web3.js](https://web3js.readthedocs.io/) आणि [web3.py](https://github.com/ethereum/web3.py). हे ॲबस्ट्रॅक्शन्स सामान्यतः समजण्यास सोपे आणि कमी त्रुटी-प्रवण असतात, परंतु पडद्यामागे काय घडत आहे हे समजून घेणे तरीही उपयुक्त आहे.

खाली `Multiply7` नावाचा एक सरळ स्मार्ट कॉन्ट्रॅक्ट आहे जो Ethereum नोडवर JSON-RPC इंटरफेस वापरून डिप्लॉय केला जाईल. हा ट्यूटोरियल असे गृहीत धरतो की वाचक आधीच एक Geth नोड चालवत आहे. नोड्स आणि क्लायंटबद्दल अधिक माहिती [येथे](/developers/docs/nodes-and-clients/run-a-node) उपलब्ध आहे. नॉन-Geth क्लायंटसाठी HTTP JSON-RPC कसे सुरू करावे हे पाहण्यासाठी कृपया वैयक्तिक [क्लायंट](/developers/docs/nodes-and-clients/) डॉक्युमेंटेशनचा संदर्भ घ्या. बहुतेक क्लायंट `localhost:8545` वर सर्व्ह करण्यासाठी डीफॉल्ट असतात.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

पहिली गोष्ट म्हणजे HTTP RPC इंटरफेस सक्षम असल्याची खात्री करणे. याचा अर्थ आम्ही स्टार्टअपवेळी Geth ला `--http` फ्लॅग पुरवतो. या उदाहरणात आम्ही एका खाजगी डेव्हलपमेंट चेनवर Geth नोड वापरतो. हा दृष्टिकोन वापरल्याने आम्हाला वास्तविक नेटवर्कवर इथरची आवश्यकता नाही.

```bash
geth --http --dev console 2>>geth.log
```

हे `http://localhost:8545` वर HTTP RPC इंटरफेस सुरू करेल.

[curl](https://curl.se) वापरून कॉईनबेस ॲड्रेस (अकाउंट्सच्या ॲरेमधून पहिला ॲड्रेस मिळवून) आणि बॅलन्स मिळवून इंटरफेस चालू आहे की नाही हे आम्ही तपासू शकतो. कृपया लक्षात घ्या की या उदाहरणांमधील डेटा तुमच्या स्थानिक नोडवर भिन्न असेल. तुम्हाला हे कमांड्स वापरायचे असल्यास, दुसऱ्या curl रिक्वेस्टमधील रिक्वेस्ट पॅरामीटर्स पहिल्या रिक्वेस्टमधून परत आलेल्या परिणामाने बदला.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

संख्या हेक्स एन्कोडेड असल्यामुळे, बॅलन्स wei मध्ये हेक्स स्ट्रिंग म्हणून परत केला जातो. जर आपल्याला बॅलन्स इथरमध्ये संख्या म्हणून हवा असेल तर आपण Geth कन्सोलमधून web3 वापरू शकतो.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

आता आमच्या खाजगी डेव्हलपमेंट चेनवर काही इथर आहे, तर आम्ही कॉन्ट्रॅक्ट डिप्लॉय करू शकतो. पहिली पायरी म्हणजे Multiply7 कॉन्ट्रॅक्टला बाईट कोडमध्ये कंपाईल करणे जो EVM ला पाठवला जाऊ शकतो. solc, सॉलिडिटी कंपायलर, इन्स्टॉल करण्यासाठी, [सॉलिडिटी डॉक्युमेंटेशन](https://docs.soliditylang.org/en/latest/installing-solidity.html) चे अनुसरण करा. ([आमच्या उदाहरणासाठी वापरलेल्या कंपायलरच्या आवृत्तीशी](https://github.com/ethereum/solidity/releases/tag/v0.4.20) जुळण्यासाठी तुम्ही जुनी `solc` रीलिझ वापरू शकता.)

पुढची पायरी म्हणजे Multiply7 कॉन्ट्रॅक्टला बाइट कोडमध्ये कंपाईल करणे, जे EVM ला पाठवले जाऊ शकते.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

आता आमच्याकडे कंपाईल केलेला कोड आहे, तर तो डिप्लॉय करण्यासाठी किती गॅस लागेल हे ठरवणे आवश्यक आहे. RPC इंटरफेसमध्ये एक `eth_estimateGas` पद्धत आहे जी आपल्याला एक अंदाज देईल.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

आणि शेवटी कॉन्ट्रॅक्ट डिप्लॉय करा.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

व्यवहार नोडद्वारे स्वीकारला जातो आणि एक व्यवहार हॅश परत केला जातो. हा हॅश ट्रान्झॅक्शनचा माग काढण्यासाठी वापरला जाऊ शकतो. पुढची पायरी म्हणजे आपला कॉन्ट्रॅक्ट कुठे डिप्लॉय केला आहे, तो ॲड्रेस ठरवणे. प्रत्येक कार्यान्वित केलेला ट्रान्झॅक्शन एक पावती (receipt) तयार करेल. या पावतीमध्ये (receipt) ट्रान्झॅक्शनबद्दल विविध माहिती असते, जसे की ट्रान्झॅक्शन कोणत्या ब्लॉकमध्ये समाविष्ट होता आणि EVM ने किती गॅस वापरला. जर एखादा ट्रान्झॅक्शन
कॉन्ट्रॅक्ट तयार करत असेल तर त्यात कॉन्ट्रॅक्टचा ॲड्रेस देखील असेल. आपण `eth_getTransactionReceipt` RPC पद्धतीचा वापर करून पावती (receipt) मिळवू शकतो.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

आपला कॉन्ट्रॅक्ट `0x4d03d617d700cf81935d7f797f4e2ae719648262` वर तयार झाला. पावतीऐवजी (receipt) null निकाल मिळाल्यास याचा अर्थ ट्रान्झॅक्शन अद्याप ब्लॉकमध्ये समाविष्ट केलेला नाही. क्षणभर थांबा आणि तुमचा कन्सेन्सस क्लायंट चालू आहे की नाही ते तपासा आणि पुन्हा प्रयत्न करा.

#### स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधणे {#interacting-with-smart-contract}

या उदाहरणात, आपण कॉन्ट्रॅक्टच्या `multiply` पद्धतीला `eth_sendTransaction` वापरून एक ट्रान्झॅक्शन पाठवू.

`eth_sendTransaction` ला अनेक आर्ग्युमेंट्सची आवश्यकता असते, विशेषतः `from`, `to` आणि `data`. `From` हा आपल्या अकाउंटचा सार्वजनिक ॲड्रेस आहे आणि `to` हा कॉन्ट्रॅक्टचा ॲड्रेस आहे. `data` आर्ग्युमेंटमध्ये एक पेलोड असतो जो कोणती पद्धत कॉल करायची आणि कोणत्या आर्ग्युमेंट्ससह कॉल करायची हे परिभाषित करतो. येथे [ABI (ॲप्लिकेशन बायनरी इंटरफेस)](https://docs.soliditylang.org/en/latest/abi-spec.html) वापरले जाते. ABI ही एक JSON फाईल आहे जी EVM साठी डेटा कसा परिभाषित आणि एन्कोड करायचा हे ठरवते.

पेलोडमधील बाइट्स हे ठरवतात की कॉन्ट्रॅक्टमधील कोणती पद्धत कॉल केली जाईल. हे फंक्शनचे नाव आणि त्याच्या आर्ग्युमेंट प्रकारांवरून Keccak हॅशमधील पहिले 4 बाइट्स आहेत, जे हेक्स एन्कोड केलेले आहेत. मल्टिप्लाय फंक्शन एक uint स्वीकारते जे uint256 साठी एक उर्फ (alias) आहे. यामुळे आपल्याला मिळते:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

पुढची पायरी आर्ग्युमेंट्स एन्कोड करणे आहे. फक्त एक uint256 आहे, समजा, मूल्य 6. ABI मध्ये एक विभाग आहे जो uint256 प्रकार कसे एन्कोड करायचे हे निर्दिष्ट करतो.

`int<M>: enc(X)` हे X चे बिग-एंडियन टूज कॉम्प्लिमेंट एन्कोडिंग आहे, जे ऋण X साठी उच्च-ऑर्डर (डाव्या) बाजूला 0xff ने पॅड केलेले असते आणि धन X साठी शून्य बाइट्सने पॅड केलेले असते जेणेकरून लांबी 32 बाइट्सच्या पटीत असेल.

हे `0000000000000000000000000000000000000000000000000000000000000006` मध्ये एन्कोड होते.

फंक्शन सिलेक्टर आणि एन्कोड केलेले आर्ग्युमेंट एकत्र केल्यावर आपला डेटा `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` असेल.

हे आता नोडला पाठवले जाऊ शकते:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

एक ट्रान्झॅक्शन पाठवला गेल्यामुळे, एक ट्रान्झॅक्शन हॅश परत आला. पावती (receipt) मिळवल्यावर हे मिळते:

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

पावतीमध्ये (receipt) एक लॉग आहे. हा लॉग EVM द्वारे ट्रान्झॅक्शन एक्झिक्यूशनवर तयार केला गेला आणि पावतीमध्ये (receipt) समाविष्ट केला गेला. `multiply` फंक्शन दाखवते की इनपुटच्या 7 पट मूल्याने `Print` इव्हेंट तयार झाला. `Print` इव्हेंटसाठी आर्ग्युमेंट uint256 असल्याने आपण ते ABI नियमांनुसार डीकोड करू शकतो, ज्यामुळे आपल्याला अपेक्षित दशांश मूल्य 42 मिळेल. डेटा व्यतिरिक्त हे लक्षात घेण्यासारखे आहे की कोणता इव्हेंटने लॉग तयार केला हे निर्धारित करण्यासाठी टॉपिक्स वापरले जाऊ शकतात:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

JSON-RPC चा थेट वापर दर्शविणाऱ्या काही सामान्य कामांची ही एक छोटी ओळख होती.

## संबंधित विषय {#related-topics}

- [JSON-RPC स्पेसिफिकेशन](http://www.jsonrpc.org/specification)
- [नोड्स आणि क्लायंट](/developers/docs/nodes-and-clients/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [बॅकएंड APIs](/developers/docs/apis/backend/)
- [एक्झिक्यूशन क्लायंट्स](/developers/docs/nodes-and-clients/#execution-clients)
