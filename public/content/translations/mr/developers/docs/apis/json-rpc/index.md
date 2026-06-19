---
title: "जेसॉन-आरपीसी API"
description: "इथेरियम क्लायंट्ससाठी एक स्टेटलेस, हलका रिमोट प्रोसिजर कॉल (RPC) प्रोटोकॉल."
lang: mr
---

एखाद्या सॉफ्टवेअर ॲप्लिकेशनला [इथेरियम](/) ब्लॉकचेनशी संवाद साधण्यासाठी - एकतर ब्लॉकचेन डेटा वाचून किंवा नेटवर्कवर व्यवहार पाठवून - त्याला इथेरियम नोडशी कनेक्ट करणे आवश्यक आहे.

या उद्देशासाठी, प्रत्येक [इथेरियम क्लायंट](/developers/docs/nodes-and-clients/#execution-clients) [जेसॉन-आरपीसी स्पेसिफिकेशन](https://github.com/ethereum/execution-apis) लागू करतो, जेणेकरून विशिष्ट नोड किंवा क्लायंट अंमलबजावणीची पर्वा न करता ॲप्लिकेशन्स अवलंबून राहू शकतील अशा पद्धतींचा एक समान संच उपलब्ध असतो.

[जेसॉन-आरपीसी](https://www.jsonrpc.org/specification) हा एक स्टेटलेस, हलका रिमोट प्रोसिजर कॉल (RPC) प्रोटोकॉल आहे. तो अनेक डेटा स्ट्रक्चर्स आणि त्यांच्या प्रक्रियेभोवतीचे नियम परिभाषित करतो. तो ट्रान्सपोर्ट ॲग्नोस्टिक आहे, म्हणजेच या संकल्पना एकाच प्रक्रियेत, सॉकेट्सवर, HTTP वर किंवा अनेक विविध मेसेज पासिंग वातावरणात वापरल्या जाऊ शकतात. तो डेटा फॉरमॅट म्हणून JSON (RFC 4627) वापरतो.

## क्लायंट अंमलबजावणी {#client-implementations}

इथेरियम क्लायंट्स जेसॉन-आरपीसी तपशीलाची अंमलबजावणी करताना विविध प्रोग्रामिंग भाषा वापरू शकतात. विशिष्ट प्रोग्रामिंग भाषांशी संबंधित पुढील तपशीलांसाठी वैयक्तिक [क्लायंट दस्तऐवजीकरण](/developers/docs/nodes-and-clients/#execution-clients) पहा. नवीनतम API समर्थन माहितीसाठी आम्ही प्रत्येक क्लायंटचे दस्तऐवजीकरण तपासण्याची शिफारस करतो.

## सोयीस्कर लायब्ररीज {#convenience-libraries}

जरी तुम्ही जेसॉन-आरपीसी API द्वारे थेट इथेरियम क्लायंट्सशी संवाद साधणे निवडू शकत असलात, तरी विकेंद्रित ॲप्लिकेशन (dapp) डेव्हलपर्ससाठी अनेकदा सोपे पर्याय उपलब्ध असतात. जेसॉन-आरपीसी API च्या वर रॅपर्स् प्रदान करण्यासाठी अनेक [JavaScript](/developers/docs/apis/javascript/#available-libraries) आणि [बॅकएंड API](/developers/docs/apis/backend/#available-libraries) लायब्ररीज अस्तित्वात आहेत. या लायब्ररीजच्या मदतीने, डेव्हलपर्स इथेरियमशी संवाद साधणाऱ्या जेसॉन-आरपीसी विनंत्या (अंतर्गतरीत्या) सुरू करण्यासाठी त्यांच्या आवडीच्या प्रोग्रामिंग भाषेत सहज समजण्याजोग्या, एका ओळीच्या पद्धती लिहू शकतात.

## सहमती क्लायंट APIs {#consensus-clients}

हे पृष्ठ प्रामुख्याने इथेरियम अंमलबजावणी क्लायंट्सद्वारे वापरल्या जाणाऱ्या जेसॉन-आरपीसी API बद्दल माहिती देते. तथापि, सहमती क्लायंट्सकडे देखील एक RPC API असते जे वापरकर्त्यांना नोडबद्दल माहिती विचारण्याची, बीकन ब्लॉक्स, बीकन स्थिती आणि इतर सहमती-संबंधित माहिती थेट नोडकून विनंती करण्याची अनुमती देते. या API चे दस्तऐवजीकरण [बीकन API वेबपृष्ठावर](https://ethereum.github.io/beacon-APIs/#/) केले आहे.

नोडमधील आंतर-क्लायंट संवादासाठी एक अंतर्गत API देखील वापरले जाते - म्हणजेच, ते सहमती क्लायंट आणि अंमलबजावणी क्लायंटला डेटाची अदलाबदल करण्यास सक्षम करते. याला 'Engine API' म्हटले जाते आणि त्याचे तपशील [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) वर उपलब्ध आहेत.

## अंमलबजावणी क्लायंट तपशील {#spec}

[GitHub वर संपूर्ण जेसॉन-आरपीसी API तपशील वाचा](https://github.com/ethereum/execution-apis). या API चे दस्तऐवजीकरण [अंमलबजावणी API वेबपेजवर](https://ethereum.github.io/execution-apis/) केले आहे आणि उपलब्ध असलेल्या सर्व पद्धती वापरून पाहण्यासाठी यामध्ये इन्स्पेक्टर (Inspector) समाविष्ट आहे.

## संकेत {#conventions}

### हेक्स मूल्य एन्कोडिंग {#hex-encoding}

JSON वर दोन प्रमुख डेटा प्रकार पाठवले जातात: फॉरमॅट न केलेले बाइट ॲरे आणि परिमाणे. दोन्ही हेक्स एन्कोडिंगसह पाठवले जातात परंतु फॉरमॅटिंगसाठी त्यांच्या आवश्यकता भिन्न असतात.

#### परिमाणे {#quantities-encoding}

परिमाणे (पूर्णांक, संख्या) एन्कोड करताना: हेक्स म्हणून एन्कोड करा, "0x" ने सुरुवात करा, सर्वात संक्षिप्त सादरीकरण वापरा (किरकोळ अपवाद: शून्य "0x0" म्हणून दर्शवले जावे).

येथे काही उदाहरणे आहेत:

- 0x41 (दशांश मध्ये 65)
- 0x400 (दशांश मध्ये 1024)
- चुकीचे: 0x (नेहमी किमान एक अंक असावा - शून्य म्हणजे "0x0" आहे)
- चुकीचे: 0x0400 (सुरुवातीला शून्य असण्याची परवानगी नाही)
- चुकीचे: ff (सुरुवातीला 0x असणे आवश्यक आहे)

### फॉरमॅट न केलेला डेटा {#unformatted-data-encoding}

फॉरमॅट न केलेला डेटा (बाइट ॲरे, खाते पत्ते, हॅशेस, बाइटकोड ॲरे) एन्कोड करताना: हेक्स म्हणून एन्कोड करा, "0x" ने सुरुवात करा, प्रति बाइट दोन हेक्स अंक वापरा.

येथे काही उदाहरणे आहेत:

- 0x41 (आकार 1, "A")
- 0x004200 (आकार 3, "0B0")
- 0x (आकार 0, "")
- चुकीचे: 0xf0f0f (अंकांची संख्या सम असणे आवश्यक आहे)
- चुकीचे: 004200 (सुरुवातीला 0x असणे आवश्यक आहे)

### ब्लॉक पॅरामीटर {#block-parameter}

खालील पद्धतींमध्ये ब्लॉक पॅरामीटर असतो:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

जेव्हा इथेरियमच्या स्थितीची चौकशी करणाऱ्या विनंत्या केल्या जातात, तेव्हा दिलेला ब्लॉक पॅरामीटर ब्लॉकची उंची निश्चित करतो.

ब्लॉक पॅरामीटरसाठी खालील पर्याय शक्य आहेत:

- `HEX String` - एक पूर्णांक ब्लॉक क्रमांक
- `String "earliest"` सर्वात जुन्या/उत्पत्ती ब्लॉकसाठी
- `String "latest"` - नवीनतम प्रस्तावित ब्लॉकसाठी
- `String "safe"` - नवीनतम सुरक्षित हेड ब्लॉकसाठी
- `String "finalized"` - नवीनतम अंतिम झालेल्या ब्लॉकसाठी
- `String "pending"` - प्रलंबित स्थिती/व्यवहारांसाठी

## उदाहरणे {#examples}

या पृष्ठावर आम्ही कमांड लाइन टूल, [curl](https://curl.se) वापरून वैयक्तिक जेसॉन-आरपीसी API एंडपॉइंट्स कसे वापरावे याची उदाहरणे देतो. ही वैयक्तिक एंडपॉइंट उदाहरणे खालील [Curl उदाहरणे](#curl-examples) विभागात दिलेली आहेत. पृष्ठावर आणखी खाली, आम्ही गेथ (Geth) नोड, जेसॉन-आरपीसी API आणि curl वापरून स्मार्ट कॉन्ट्रॅक्ट संकलित आणि प्रस्थापित करण्यासाठी एक [एंड-टू-एंड उदाहरण](#usage-example) देखील देतो.

## Curl उदाहरणे {#curl-examples}

इथेरियम नोडला [curl](https://curl.se) विनंत्या करून जेसॉन-आरपीसी API वापरण्याची उदाहरणे खाली दिली आहेत. प्रत्येक उदाहरणामध्ये विशिष्ट एंडपॉइंटचे वर्णन, त्याचे पॅरामीटर्स, रिटर्न प्रकार आणि ते कसे वापरले जावे याचे एक प्रत्यक्ष उदाहरण समाविष्ट आहे.

curl विनंत्या कंटेंट प्रकाराशी संबंधित त्रुटी संदेश देऊ शकतात. याचे कारण असे की `--data` पर्याय कंटेंट प्रकार `application/x-www-form-urlencoded` वर सेट करतो. जर तुमच्या नोडने याबद्दल तक्रार केली, तर कॉलच्या सुरुवातीला `-H "Content-Type: application/json"` ठेवून मॅन्युअली हेडर सेट करा. उदाहरणांमध्ये URL/IP आणि पोर्ट संयोजन देखील समाविष्ट नाही जे curl ला दिलेले शेवटचे आर्ग्युमेंट असणे आवश्यक आहे (उदा., `127.0.0.1:8545`). या अतिरिक्त डेटासह संपूर्ण curl विनंती खालीलप्रमाणे असते:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## गॉसिप, स्थिती, इतिहास {#gossip-state-history}

काही मुख्य जेसॉन-आरपीसी (JSON-RPC) पद्धतींना इथेरियम नेटवर्कवरील डेटाची आवश्यकता असते आणि त्या तीन मुख्य श्रेणींमध्ये विभागल्या जातात: _गॉसिप, स्थिती आणि इतिहास_. प्रत्येक पद्धतीवर जाण्यासाठी या विभागांमधील लिंक्स वापरा, किंवा पद्धतींची संपूर्ण यादी पाहण्यासाठी अनुक्रमणिकेचा वापर करा.

### गॉसिप पद्धती {#gossip-methods}

> या पद्धती चेनच्या हेडचा मागोवा घेतात. अशा प्रकारे व्यवहार नेटवर्कमध्ये फिरतात, ब्लॉकमध्ये जागा मिळवतात आणि क्लायंट्सना नवीन ब्लॉकबद्दल माहिती मिळते.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### स्थिती पद्धती {#state-methods}

> साठवलेल्या सर्व डेटाची सद्यस्थिती नोंदवणाऱ्या पद्धती. "स्थिती" ही एका मोठ्या सामायिक रॅम (RAM) सारखी असते आणि त्यामध्ये खाते शिल्लक, कॉन्ट्रॅक्ट डेटा आणि गॅस अंदाजांचा समावेश असतो.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### इतिहास पद्धती {#history-methods}

> उत्पत्ती (genesis) पर्यंतच्या प्रत्येक ब्लॉकच्या ऐतिहासिक नोंदी मिळवते. ही एका मोठ्या 'फक्त-जोडण्यायोग्य' (append-only) फाईलसारखी असते आणि त्यामध्ये सर्व ब्लॉक हेडर्स, ब्लॉक बॉडीज, अंकल ब्लॉक्स आणि व्यवहार पावत्या समाविष्ट असतात.

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

## जेसॉन-आरपीसी API प्लेग्राउंड {#json-rpc-api-playground}

API पद्धती शोधण्यासाठी आणि वापरून पाहण्यासाठी तुम्ही [प्लेग्राउंड टूल](https://ethereum-json-rpc.com) वापरू शकता. विविध नोड प्रदात्यांद्वारे कोणत्या पद्धती आणि नेटवर्क समर्थित आहेत हे देखील ते तुम्हाला दाखवते.

## जेसॉन-आरपीसी API पद्धती {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

सध्याची क्लायंट आवृत्ती परत करते.

**पॅरामीटर्स**

काहीही नाही

**परत करते**

`String` - सध्याची क्लायंट आवृत्ती

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// निकाल
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

दिलेल्या डेटाचे केकाक-256 (प्रमाणित SHA3-256 _नाही_) परत करते.

**पॅरामीटर्स**

1. `DATA` - SHA3 हॅशमध्ये रूपांतरित करण्यासाठीचा डेटा

```js
params: ["0x68656c6c6f20776f726c64"]
```

**परत करते**

`DATA` - दिलेल्या स्ट्रिंगचा SHA3 निकाल.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// निकाल
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

सध्याचा नेटवर्क आयडी परत करते.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`String` - सध्याचा नेटवर्क आयडी.

सध्याच्या नेटवर्क आयडींची संपूर्ण यादी [chainlist.org](https://chainlist.org) येथे उपलब्ध आहे. काही सामान्य खालीलप्रमाणे आहेत:

- `1`: इथरियम मेननेट
- `11155111`: Sepolia टेस्टनेट
- `560048` : Hoodi टेस्टनेट

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// निकाल
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

जर क्लायंट नेटवर्क कनेक्शनसाठी सक्रियपणे ऐकत असेल तर `true` परत करते.

**पॅरामीटर्स**

काहीही नाही

**परत करते**

`Boolean` - ऐकत असताना `true`, अन्यथा `false`.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// निकाल
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

सध्या क्लायंटशी जोडलेल्या पीअर्सची संख्या परत करते.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`QUANTITY` - जोडलेल्या पीअर्सच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// निकाल
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

सध्याची इथेरियम प्रोटोकॉल आवृत्ती परत करते. लक्षात घ्या की ही पद्धत [Geth मध्ये उपलब्ध नाही](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`String` - सध्याची इथेरियम प्रोटोकॉल आवृत्ती

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// निकाल
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

समक्रमण स्थितीबद्दल डेटा असलेला ऑब्जेक्ट किंवा `false` परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

अचूक रिटर्न डेटा क्लायंट अंमलबजावणीनुसार बदलतो. जेव्हा नोड समक्रमण करत नसतो तेव्हा सर्व क्लायंट `False` परत करतात आणि सर्व क्लायंट खालील फील्ड्स परत करतात.

`Object|Boolean`, समक्रमण स्थिती डेटा असलेला ऑब्जेक्ट किंवा समक्रमण करत नसताना `FALSE`:

- `startingBlock`: `QUANTITY` - ज्या ब्लॉकवर आयात सुरू झाली (समक्रमण त्याच्या टोकापर्यंत पोहोचल्यानंतरच रीसेट केले जाईल)
- `currentBlock`: `QUANTITY` - वर्तमान ब्लॉक, eth_blockNumber प्रमाणेच
- `highestBlock`: `QUANTITY` - अंदाजित सर्वोच्च ब्लॉक

तथापि, वैयक्तिक क्लायंट अतिरिक्त डेटा देखील देऊ शकतात. उदाहरणार्थ गेथ खालील गोष्टी परत करते:

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

तर बेसू खालील गोष्टी परत करते:

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

अधिक तपशीलांसाठी तुमच्या विशिष्ट क्लायंटचे दस्तऐवजीकरण पहा.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// किंवा समक्रमण होत नसताना
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

क्लायंटचा कॉइनबेस् पत्ता परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

> **टीप:** ही पद्धत **v1.14.0** पासून कालबाह्य करण्यात आली आहे आणि यापुढे समर्थित नाही. ही पद्धत वापरण्याचा प्रयत्न केल्यास "Method not supported" त्रुटी येईल.

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`DATA`, 20 बाइट्स - सध्याचा कॉइनबेस् पत्ता.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// निकाल
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

रिप्ले-संरक्षित व्यवहारांवर स्वाक्षरी करण्यासाठी वापरला जाणारा चेन आयडी परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`chainId`, सध्याच्या चेन आयडीचा पूर्णांक दर्शवणारी स्ट्रिंगच्या स्वरूपातील हेक्साडेसिमल व्हॅल्यू.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// निकाल
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

जर क्लायंट सक्रियपणे नवीन ब्लॉकचे खनन करत असेल तर `true` परत करते. हे केवळ प्रूफ-ऑफ-वर्क नेटवर्कसाठी `true` परत करू शकते आणि [द मर्ज](/roadmap/merge/) नंतर काही क्लायंट्समध्ये उपलब्ध नसू शकते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`Boolean` - जर क्लायंट खनन करत असेल तर `true` परत करते, अन्यथा `false`.

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

### eth_hashrate {#eth-hashrate}

नोड ज्या वेगाने खनन करत आहे, त्या प्रति सेकंद हॅशची संख्या परत करते. हे केवळ प्रूफ-ऑफ-वर्क (PoW) नेटवर्कसाठी `true` परत करू शकते आणि [द मर्ज](/roadmap/merge/) नंतर काही क्लायंट्समध्ये उपलब्ध नसू शकते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`QUANTITY` - प्रति सेकंद हॅशची संख्या.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// निकाल
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Wei मध्ये प्रति गॅसच्या सध्याच्या किमतीचा अंदाज परत करते. उदाहरणार्थ, बेसू क्लायंट मागील 100 ब्लॉक्स तपासतो आणि पूर्वनिर्धारितपणे मध्यक गॅस युनिट किंमत परत करतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`QUANTITY` - Wei मधील सध्याच्या गॅसच्या किमतीचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// निकाल
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

क्लायंटच्या मालकीच्या पत्त्यांची यादी परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`Array of DATA`, 20 बाइट्स - क्लायंटच्या मालकीचे पत्ते.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

सर्वात अलीकडील ब्लॉकचा क्रमांक परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

काहीही नाही

**रिटर्न्स**

`QUANTITY` - क्लायंट सध्या ज्या ब्लॉकवर आहे त्याचा पूर्णांक क्रमांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// निकाल
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

दिलेल्या पत्त्यावरील खात्याची शिल्लक परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 20 बाइट्स - शिल्लक तपासण्यासाठीचा पत्ता.
2. `QUANTITY|TAG` - पूर्णांक ब्लॉक क्रमांक, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, किंवा `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**रिटर्न्स**

`QUANTITY` - Wei मधील वर्तमान शिल्लक दर्शवणारा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

दिलेल्या पत्त्यावरील स्टोरेज स्थानावरून मूल्य परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 20 Bytes - स्टोरेजचा पत्ता.
2. `QUANTITY` - स्टोरेजमधील स्थानाचा पूर्णांक (integer).
3. `QUANTITY|TAG` - पूर्णांक ब्लॉक क्रमांक, किंवा स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा

**रिटर्न्स**

`DATA` - या स्टोरेज स्थानावरील मूल्य.

**उदाहरण**
योग्य स्थानाची गणना करणे हे प्राप्त करायच्या स्टोरेजवर अवलंबून असते. `0x391694e7e0b0cce554cb130d723a9d27458f9298` या पत्त्याद्वारे `0x295a70b2de5e3953354a6a8344e616ed314d7251` वर प्रस्थापित केलेल्या खालील कॉन्ट्रॅक्टचा विचार करा.

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

pos0 चे मूल्य प्राप्त करणे सोपे आहे:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

मॅपमधील घटक प्राप्त करणे अधिक कठीण आहे. मॅपमधील घटकाच्या स्थानाची गणना याद्वारे केली जाते:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

याचा अर्थ pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] वरील स्टोरेज प्राप्त करण्यासाठी आपल्याला याद्वारे स्थानाची गणना करणे आवश्यक आहे:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

ही गणना करण्यासाठी Web3 लायब्ररीसोबत येणाऱ्या geth कन्सोलचा वापर केला जाऊ शकतो:

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

### eth_getTransactionCount {#eth-gettransactioncount}

एखाद्या पत्त्यावरून _पाठवलेल्या_ व्यवहारांची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 20 बाइट्स - पत्ता.
2. `QUANTITY|TAG` - पूर्णांक ब्लॉक क्रमांक, किंवा `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // नवीनतम ब्लॉकवरील स्थिती
]
```

**परत करते**

`QUANTITY` - या पत्त्यावरून पाठवलेल्या व्यवहारांच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

दिलेल्या ब्लॉक हॅशशी जुळणाऱ्या ब्लॉकमधील व्यवहारांची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - ब्लॉकचा हॅश

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**रिटर्न्स**

`QUANTITY` - या ब्लॉकमधील व्यवहारांच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

दिलेल्या ब्लॉक क्रमांकाशी जुळणाऱ्या ब्लॉकमधील व्यवहारांची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `QUANTITY|TAG` - ब्लॉक क्रमांकाचा पूर्णांक (integer), किंवा [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) प्रमाणे `"earliest"`, `"latest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग.

```js
params: [
  "0x13738ca", // 20396234
]
```

**रिटर्न्स**

`QUANTITY` - या ब्लॉकमधील व्यवहारांच्या संख्येचा पूर्णांक (integer).

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

दिलेल्या ब्लॉक हॅशशी जुळणाऱ्या ब्लॉकमधील अंकल्सची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - ब्लॉकचा हॅश

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**रिटर्न्स**

`QUANTITY` - या ब्लॉकमधील अंकल्सच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

दिलेल्या ब्लॉक क्रमांकाशी जुळणाऱ्या ब्लॉकमधील अंकलची संख्या परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `QUANTITY|TAG` - ब्लॉक क्रमांकाचा पूर्णांक, किंवा `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा

```js
params: [
  "0xe8", // 232
]
```

**रिटर्न्स**

`QUANTITY` - या ब्लॉकमधील अंकलच्या संख्येचा पूर्णांक.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

दिलेल्या पत्त्यावरील कोड परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 20 बाइट्स - पत्ता
2. `QUANTITY|TAG` - पूर्णांक ब्लॉक क्रमांक, किंवा `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**रिटर्न्स**

`DATA` - दिलेल्या पत्त्यावरील कोड.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

sign पद्धत `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))` वापरून इथेरियम विशिष्ट स्वाक्षरीची गणना करते.

संदेशाला उपसर्ग (prefix) जोडल्याने गणना केलेली स्वाक्षरी इथेरियम विशिष्ट स्वाक्षरी म्हणून ओळखण्यायोग्य बनते. हे असा गैरवापर टाळते जिथे एखादे दुर्भावनापूर्ण विकेंद्रित ॲप्लिकेशन (dapp) अनियंत्रित डेटावर (उदा. व्यवहार) स्वाक्षरी करू शकते आणि बळी पडलेल्या व्यक्तीचे रूप धारण करण्यासाठी त्या स्वाक्षरीचा वापर करू शकते.

टीप: ज्या पत्त्यावरून स्वाक्षरी करायची आहे तो पत्ता अनलॉक केलेला असणे आवश्यक आहे.

**पॅरामीटर्स**

1. `DATA`, 20 Bytes - पत्ता
2. `DATA`, N Bytes - स्वाक्षरी करण्यासाठी संदेश

**रिटर्न्स**

`DATA`: स्वाक्षरी

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

एका व्यवहारावर स्वाक्षरी करतो जो नंतर [eth_sendRawTransaction](#eth-sendrawtransaction) वापरून नेटवर्कवर सबमिट केला जाऊ शकतो.

**पॅरामीटर्स**

1. `Object` - व्यवहार ऑब्जेक्ट

- `type`:
- `from`: `DATA`, 20 Bytes - ज्या पत्त्यावरून व्यवहार पाठवला जातो तो पत्ता.
- `to`: `DATA`, 20 Bytes - (नवीन कॉन्ट्रॅक्ट तयार करताना ऐच्छिक) ज्या पत्त्यावर व्यवहार निर्देशित केला आहे तो पत्ता.
- `gas`: `QUANTITY` - (ऐच्छिक, डीफॉल्ट: 90000) व्यवहार अंमलबजावणीसाठी प्रदान केलेल्या गॅसचा पूर्णांक. हे न वापरलेला गॅस परत करेल.
- `gasPrice`: `QUANTITY` - (ऐच्छिक, डीफॉल्ट: To-Be-Determined) प्रत्येक सशुल्क गॅससाठी वापरल्या जाणाऱ्या गॅसच्या किंमतीचा पूर्णांक, Wei मध्ये.
- `value`: `QUANTITY` - (ऐच्छिक) या व्यवहारासोबत पाठवलेल्या मूल्याचा पूर्णांक, Wei मध्ये.
- `data`: `DATA` - कॉन्ट्रॅक्टचा संकलित केलेला कोड किंवा कॉल केलेल्या पद्धतीच्या स्वाक्षरीचा आणि एन्कोड केलेल्या पॅरामीटर्सचा हॅश.
- `nonce`: `QUANTITY` - (ऐच्छिक) नॉन्सचा पूर्णांक. हे तुम्हाला समान नॉन्स वापरणारे तुमचे स्वतःचे प्रलंबित व्यवहार ओव्हरराइट करण्याची अनुमती देते.

**रिटर्न्स**

`DATA`, निर्दिष्ट खात्याद्वारे स्वाक्षरी केलेला RLP-एन्कोड केलेला व्यवहार ऑब्जेक्ट.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// निकाल
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

जर डेटा फील्डमध्ये कोड असेल, तर नवीन संदेश कॉल व्यवहार किंवा कॉन्ट्रॅक्ट निर्मिती तयार करते आणि `from` मध्ये नमूद केलेले खाते वापरून त्यावर स्वाक्षरी करते.

**पॅरामीटर्स**

1. `Object` - व्यवहार ऑब्जेक्ट

- `from`: `DATA`, 20 बाइट्स - ज्या पत्त्यावरून व्यवहार पाठवला जातो तो पत्ता.
- `to`: `DATA`, 20 बाइट्स - (नवीन कॉन्ट्रॅक्ट तयार करताना ऐच्छिक) ज्या पत्त्यावर व्यवहार निर्देशित केला आहे तो पत्ता.
- `gas`: `QUANTITY` - (ऐच्छिक, डीफॉल्ट: 90000) व्यवहार अंमलबजावणीसाठी प्रदान केलेल्या गॅसचा पूर्णांक. हे न वापरलेला गॅस परत करेल.
- `gasPrice`: `QUANTITY` - (ऐच्छिक, डीफॉल्ट: निश्चित-करायचे-आहे) प्रत्येक सशुल्क गॅससाठी वापरलेल्या gasPrice चा पूर्णांक.
- `value`: `QUANTITY` - (ऐच्छिक) या व्यवहारासोबत पाठवलेल्या मूल्याचा पूर्णांक.
- `input`: `DATA` - कॉन्ट्रॅक्टचा संकलित कोड किंवा कॉल केलेल्या पद्धतीच्या स्वाक्षरीचा आणि एन्कोड केलेल्या पॅरामीटर्सचा हॅश.
- `nonce`: `QUANTITY` - (ऐच्छिक) नॉन्सचा पूर्णांक. हे तुम्हाला समान नॉन्स वापरणारे तुमचे स्वतःचे प्रलंबित व्यवहार ओव्हरराइट करण्याची अनुमती देते.

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

`DATA`, 32 बाइट्स - व्यवहार हॅश, किंवा व्यवहार अद्याप उपलब्ध नसल्यास शून्य हॅश.

जेव्हा तुम्ही कॉन्ट्रॅक्ट तयार करता, तेव्हा व्यवहार ब्लॉकमध्ये प्रस्तावित झाल्यानंतर कॉन्ट्रॅक्टचा पत्ता मिळवण्यासाठी [eth_getTransactionReceipt](#eth-gettransactionreceipt) वापरा.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

स्वाक्षरी केलेल्या व्यवहारांसाठी नवीन संदेश कॉल व्यवहार किंवा कॉन्ट्रॅक्ट निर्मिती तयार करते.

**पॅरामीटर्स**

1. `DATA`, स्वाक्षरी केलेला व्यवहार डेटा.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**परतावा**

`DATA`, 32 बाइट्स - व्यवहार हॅश, किंवा व्यवहार अद्याप उपलब्ध नसल्यास शून्य हॅश.

जेव्हा तुम्ही कॉन्ट्रॅक्ट तयार करता, तेव्हा व्यवहार ब्लॉकमध्ये प्रस्तावित झाल्यानंतर, कॉन्ट्रॅक्टचा पत्ता मिळवण्यासाठी [eth_getTransactionReceipt](#eth-gettransactionreceipt) वापरा.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

ब्लॉकचेनवर व्यवहार न बनवता त्वरित नवीन संदेश कॉल कार्यान्वित करते. बहुतेकदा केवळ-वाचनीय (read-only) स्मार्ट कॉन्ट्रॅक्ट फंक्शन्स कार्यान्वित करण्यासाठी वापरले जाते, उदाहरणार्थ ERC-20 कॉन्ट्रॅक्टसाठी `balanceOf`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `Object` - व्यवहार कॉल ऑब्जेक्ट

- `from`: `DATA`, 20 Bytes - (पर्यायी) ज्या पत्त्यावरून व्यवहार पाठवला जातो तो पत्ता.
- `to`: `DATA`, 20 Bytes - ज्या पत्त्यावर व्यवहार निर्देशित केला आहे तो पत्ता.
- `gas`: `QUANTITY` - (पर्यायी) व्यवहार अंमलबजावणीसाठी प्रदान केलेल्या गॅसचा पूर्णांक. eth_call शून्य गॅस वापरते, परंतु काही अंमलबजावणीसाठी या पॅरामीटरची आवश्यकता असू शकते.
- `gasPrice`: `QUANTITY` - (पर्यायी) प्रत्येक सशुल्क गॅससाठी वापरल्या जाणाऱ्या gasPrice चा पूर्णांक
- `value`: `QUANTITY` - (पर्यायी) या व्यवहारासोबत पाठवलेल्या मूल्याचा पूर्णांक
- `input`: `DATA` - (पर्यायी) पद्धत स्वाक्षरी (method signature) आणि एन्कोड केलेल्या पॅरामीटर्सचा हॅश. तपशीलांसाठी [Solidity दस्तऐवजीकरणामधील Ethereum Contract ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) पहा.

2. `QUANTITY|TAG` - पूर्णांक ब्लॉक क्रमांक, किंवा `"latest"`, `"earliest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग, [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) पहा

**रिटर्न्स**

`DATA` - कार्यान्वित केलेल्या कॉन्ट्रॅक्टचे रिटर्न मूल्य.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

व्यवहार पूर्ण होण्यासाठी किती गॅस आवश्यक आहे याचा अंदाज तयार करते आणि परत करते. हा व्यवहार ब्लॉकचेनमध्ये जोडला जाणार नाही. लक्षात घ्या की EVM मेकॅनिक्स आणि नोडच्या कामगिरीसह विविध कारणांमुळे, हा अंदाज व्यवहाराद्वारे प्रत्यक्षात वापरल्या गेलेल्या गॅसच्या प्रमाणापेक्षा लक्षणीयरीत्या जास्त असू शकतो.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

[eth_call](#eth-call) चे पॅरामीटर्स पहा, फक्त एवढाच फरक आहे की सर्व गुणधर्म ऐच्छिक आहेत. जर कोणतीही गॅस मर्यादा निर्दिष्ट केलेली नसेल, तर गेथ प्रलंबित ब्लॉकमधील ब्लॉक गॅस मर्यादेचा वरची मर्यादा म्हणून वापर करते. परिणामी, जेव्हा गॅसचे प्रमाण प्रलंबित ब्लॉक गॅस मर्यादेपेक्षा जास्त असते, तेव्हा परत केलेला अंदाज कॉल/व्यवहार कार्यान्वित करण्यासाठी पुरेसा नसू शकतो.

**रिटर्न्स**

`QUANTITY` - वापरलेल्या गॅसचे प्रमाण.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

हॅशद्वारे ब्लॉकबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - ब्लॉकचा हॅश.
2. `Boolean` - जर `true` असेल तर ते संपूर्ण व्यवहार ऑब्जेक्ट्स परत करते, जर `false` असेल तर फक्त व्यवहारांचे हॅश परत करते.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**रिटर्न्स**

`Object` - एक ब्लॉक ऑब्जेक्ट, किंवा जेव्हा कोणताही ब्लॉक सापडत नाही तेव्हा `null`:

- `number`: `QUANTITY` - ब्लॉक क्रमांक. जेव्हा तो प्रलंबित (pending) ब्लॉक असतो तेव्हा `null`.
- `hash`: `DATA`, 32 बाइट्स - ब्लॉकचा हॅश. जेव्हा तो प्रलंबित ब्लॉक असतो तेव्हा `null`.
- `parentHash`: `DATA`, 32 बाइट्स - मूळ (parent) ब्लॉकचा हॅश.
- `nonce`: `DATA`, 8 बाइट्स - व्युत्पन्न केलेल्या प्रूफ-ऑफ-वर्क चा हॅश. जेव्हा तो प्रलंबित ब्लॉक असतो तेव्हा `null`, प्रूफ-ऑफ-स्टेक ब्लॉक्ससाठी `0x0` (द मर्ज पासून)
- `sha3Uncles`: `DATA`, 32 बाइट्स - ब्लॉकमधील अंकल्स (uncles) डेटाचा SHA3.
- `logsBloom`: `DATA`, 256 बाइट्स - ब्लॉकच्या नोंदींसाठी ब्लूम फिल्टर. जेव्हा तो प्रलंबित ब्लॉक असतो तेव्हा `null`.
- `transactionsRoot`: `DATA`, 32 बाइट्स - ब्लॉकच्या व्यवहार ट्रायचे (trie) मूळ (root).
- `stateRoot`: `DATA`, 32 बाइट्स - ब्लॉकच्या अंतिम स्टेट ट्रायचे मूळ.
- `receiptsRoot`: `DATA`, 32 बाइट्स - ब्लॉकच्या पावत्यांच्या (receipts) ट्रायचे मूळ.
- `miner`: `DATA`, 20 बाइट्स - ज्या लाभार्थ्याला ब्लॉक रिवॉर्ड्स दिले गेले त्याचा पत्ता.
- `difficulty`: `QUANTITY` - या ब्लॉकच्या काठिण्याचा पूर्णांक.
- `totalDifficulty`: `QUANTITY` - या ब्लॉकपर्यंतच्या चेनच्या एकूण काठिण्याचा पूर्णांक.
- `extraData`: `DATA` - या ब्लॉकचे "अतिरिक्त डेटा" (extra data) क्षेत्र.
- `size`: `QUANTITY` - या ब्लॉकच्या आकाराचा बाइट्समधील पूर्णांक.
- `gasLimit`: `QUANTITY` - या ब्लॉकमध्ये अनुमत असलेला कमाल गॅस.
- `gasUsed`: `QUANTITY` - या ब्लॉकमधील सर्व व्यवहारांद्वारे वापरलेला एकूण गॅस.
- `timestamp`: `QUANTITY` - ब्लॉक कधी संकलित (collated) केला गेला यासाठी युनिक्स टाइमस्टॅम्प.
- `transactions`: `Array` - दिलेल्या शेवटच्या पॅरामीटरवर अवलंबून, व्यवहार ऑब्जेक्ट्सचा ॲरे (Array), किंवा 32 बाइट्सचे व्यवहार हॅश.
- `uncles`: `Array` - अंकल हॅशचा ॲरे.

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

### eth_getBlockByNumber {#eth-getblockbynumber}

ब्लॉक क्रमांकानुसार ब्लॉकबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `QUANTITY|TAG` - ब्लॉक क्रमांकाचा पूर्णांक (integer), किंवा [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) प्रमाणे `"earliest"`, `"latest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग.
2. `Boolean` - जर `true` असेल तर ते संपूर्ण व्यवहार ऑब्जेक्ट्स परत करते, जर `false` असेल तर फक्त व्यवहारांचे हॅश परत करते.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**रिटर्न्स**
[eth_getBlockByHash](#eth-getblockbyhash) पहा

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

निकालासाठी [eth_getBlockByHash](#eth-getblockbyhash) पहा

### eth_getTransactionByHash {#eth-gettransactionbyhash}

व्यवहार हॅशद्वारे विनंती केलेल्या व्यवहाराची माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - व्यवहाराचा हॅश

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**रिटर्न्स**

`Object` - एक व्यवहार ऑब्जेक्ट, किंवा जेव्हा कोणताही व्यवहार सापडत नाही तेव्हा `null`:

- `blockHash`: `DATA`, 32 बाइट्स - ज्या ब्लॉकमध्ये हा व्यवहार होता त्याचा हॅश. जेव्हा तो प्रलंबित असतो तेव्हा `null`.
- `blockNumber`: `QUANTITY` - ज्या ब्लॉकमध्ये हा व्यवहार होता त्याचा ब्लॉक क्रमांक. जेव्हा तो प्रलंबित असतो तेव्हा `null`.
- `from`: `DATA`, 20 बाइट्स - प्रेषकाचा पत्ता.
- `gas`: `QUANTITY` - प्रेषकाने प्रदान केलेला गॅस.
- `gasPrice`: `QUANTITY` - प्रेषकाने Wei मध्ये प्रदान केलेली गॅसची किंमत.
- `hash`: `DATA`, 32 बाइट्स - व्यवहाराचा हॅश.
- `input`: `DATA` - व्यवहारासोबत पाठवलेला डेटा.
- `nonce`: `QUANTITY` - यापूर्वी प्रेषकाने केलेल्या व्यवहारांची संख्या.
- `to`: `DATA`, 20 बाइट्स - प्राप्तकर्त्याचा पत्ता. जेव्हा हा करार निर्मिती व्यवहार असतो तेव्हा `null`.
- `transactionIndex`: `QUANTITY` - ब्लॉकमधील व्यवहारांच्या निर्देशांक स्थानाचा पूर्णांक. जेव्हा तो प्रलंबित असतो तेव्हा `null`.
- `value`: `QUANTITY` - Wei मध्ये हस्तांतरित केलेले मूल्य.
- `v`: `QUANTITY` - ECDSA रिकव्हरी आयडी
- `r`: `QUANTITY` - ECDSA स्वाक्षरी r
- `s`: `QUANTITY` - ECDSA स्वाक्षरी s

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// निकाल
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

ब्लॉक हॅश आणि व्यवहार निर्देशांक स्थानानुसार व्यवहाराबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - ब्लॉकचा हॅश.
2. `QUANTITY` - व्यवहार निर्देशांक स्थानाचा पूर्णांक.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न्स**
[eth_getTransactionByHash](#eth-gettransactionbyhash) पहा

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

निकालासाठी [eth_getTransactionByHash](#eth-gettransactionbyhash) पहा

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

ब्लॉक क्रमांक आणि व्यवहार निर्देशांक स्थानानुसार व्यवहाराबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `QUANTITY|TAG` - एक ब्लॉक क्रमांक, किंवा [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) प्रमाणे `"earliest"`, `"latest"`, `"pending"`, `"safe"` किंवा `"finalized"` ही स्ट्रिंग.
2. `QUANTITY` - व्यवहार निर्देशांक स्थान.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**रिटर्न्स**
[eth_getTransactionByHash](#eth-gettransactionbyhash) पहा

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

निकालासाठी [eth_getTransactionByHash](#eth-gettransactionbyhash) पहा

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

व्यवहार हॅशद्वारे व्यवहाराची पावती परत करते.

**टीप** प्रलंबित व्यवहारांसाठी पावती उपलब्ध नसते.

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - व्यवहाराचा हॅश

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**रिटर्न्स**
`Object` - व्यवहार पावती ऑब्जेक्ट, किंवा जेव्हा कोणतीही पावती सापडत नाही तेव्हा `null`:

- `transactionHash `: `DATA`, 32 बाइट्स - व्यवहाराचा हॅश.
- `transactionIndex`: `QUANTITY` - ब्लॉकमधील व्यवहाराच्या निर्देशांक स्थानाचा पूर्णांक.
- `blockHash`: `DATA`, 32 बाइट्स - ज्या ब्लॉकमध्ये हा व्यवहार होता त्याचा हॅश.
- `blockNumber`: `QUANTITY` - ज्या ब्लॉकमध्ये हा व्यवहार होता त्याचा ब्लॉक क्रमांक.
- `from`: `DATA`, 20 बाइट्स - पाठवणाऱ्याचा पत्ता.
- `to`: `DATA`, 20 बाइट्स - प्राप्तकर्त्याचा पत्ता. जेव्हा हा करार निर्मिती व्यवहार असतो तेव्हा null.
- `cumulativeGasUsed` : `QUANTITY ` - जेव्हा हा व्यवहार ब्लॉकमध्ये कार्यान्वित केला गेला तेव्हा वापरलेल्या गॅसची एकूण रक्कम.
- `effectiveGasPrice` : `QUANTITY` - प्रति युनिट गॅससाठी भरलेले पायाभूत शुल्क आणि टिप यांची बेरीज.
- `gasUsed `: `QUANTITY ` - केवळ या विशिष्ट व्यवहाराद्वारे वापरलेल्या गॅसची रक्कम.
- `contractAddress `: `DATA`, 20 बाइट्स - जर व्यवहार करार निर्मिती असेल तर तयार केलेला कॉन्ट्रॅक्ट पत्ता, अन्यथा `null`.
- `logs`: `Array` - या व्यवहाराने व्युत्पन्न केलेल्या नोंद ऑब्जेक्ट्सचा ॲरे.
- `logsBloom`: `DATA`, 256 बाइट्स - संबंधित नोंदी त्वरित पुनर्प्राप्त करण्यासाठी लाइट क्लायंट्ससाठी ब्लूम फिल्टर.
- `type`: `QUANTITY` - व्यवहार प्रकाराचा पूर्णांक, लेगसी व्यवहारांसाठी `0x0`, ॲक्सेस लिस्ट प्रकारांसाठी `0x1`, डायनॅमिक शुल्कासाठी `0x2`.

हे _यापैकी एक_ देखील परत करते:

- `root` : `DATA` व्यवहारानंतरच्या स्थिती रूटचे 32 बाइट्स (बायझँटियम पूर्वीचे)
- `status`: `QUANTITY` एकतर `1` (यशस्वी) किंवा `0` (अयशस्वी)

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// निकाल
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // पत्ता तयार केला असल्यास त्याची स्ट्रिंग
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs, इत्यादींद्वारे परत केलेल्या नोंदी
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

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

हॅश आणि अंकल निर्देशांक स्थानानुसार ब्लॉकच्या अंकलबद्दल माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `DATA`, 32 बाइट्स - ब्लॉकचा हॅश.
2. `QUANTITY` - अंकलचे निर्देशांक स्थान.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न्स**
[eth_getBlockByHash](#eth-getblockbyhash) पहा

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

निकालासाठी [eth_getBlockByHash](#eth-getblockbyhash) पहा

**टीप**: अंकलमध्ये वैयक्तिक व्यवहार नसतात.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

ब्लॉक क्रमांक आणि अंकल निर्देशांक स्थानानुसार ब्लॉकच्या अंकलविषयी माहिती परत करते.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  प्लेग्राउंडमध्ये एंडपॉइंट वापरून पहा
</ButtonLink>

**पॅरामीटर्स**

1. `QUANTITY|TAG` - एक ब्लॉक क्रमांक, किंवा [ब्लॉक पॅरामीटर](/developers/docs/apis/json-rpc/#block-parameter) मधील प्रमाणे `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"` ही स्ट्रिंग.
2. `QUANTITY` - अंकलचे निर्देशांक स्थान.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**रिटर्न्स**
[eth_getBlockByHash](#eth-getblockbyhash) पहा

**टीप**: अंकलमध्ये वैयक्तिक व्यवहार नसतात.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

निकाल [eth_getBlockByHash](#eth-getblockbyhash) पहा

### eth_newFilter {#eth-newfilter}

जेव्हा स्थिती बदलते (नोंदी) तेव्हा सूचित करण्यासाठी, फिल्टर पर्यायांवर आधारित एक फिल्टर ऑब्जेक्ट तयार करते.
स्थिती बदलली आहे की नाही हे तपासण्यासाठी, [eth_getFilterChanges](#eth-getfilterchanges) ला कॉल करा.

**विषय (topic) फिल्टर्स निर्दिष्ट करण्याबाबत एक नोंद:**
विषय (Topics) क्रमानुसार अवलंबून असतात. [A, B] विषय असलेल्या नोंदीसह असलेला व्यवहार खालील विषय फिल्टर्सद्वारे जुळवला जाईल:

- `[]` "काहीही"
- `[A]` "पहिल्या स्थानावर A (आणि त्यानंतर काहीही)"
- `[null, B]` "पहिल्या स्थानावर काहीही आणि दुसऱ्या स्थानावर B (आणि त्यानंतर काहीही)"
- `[A, B]` "पहिल्या स्थानावर A आणि दुसऱ्या स्थानावर B (आणि त्यानंतर काहीही)"
- `[[A, B], [A, B]]` "पहिल्या स्थानावर (A किंवा B) आणि दुसऱ्या स्थानावर (A किंवा B) (आणि त्यानंतर काहीही)"
- **पॅरामीटर्स**

1. `Object` - फिल्टर पर्याय:

- `fromBlock`: `QUANTITY|TAG` - (पर्यायी, डीफॉल्ट: `"latest"`) पूर्णांक ब्लॉक क्रमांक, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम अंतिम झालेल्या ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (पर्यायी, डीफॉल्ट: `"latest"`) पूर्णांक ब्लॉक क्रमांक, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम अंतिम झालेल्या ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 Bytes - (पर्यायी) कॉन्ट्रॅक्ट पत्ता किंवा पत्त्यांची सूची जिथून नोंदी तयार झाल्या पाहिजेत.
- `topics`: `Array of DATA`, - (पर्यायी) 32 Bytes `DATA` विषयांचा (topics) ॲरे. विषय क्रमानुसार अवलंबून असतात. प्रत्येक विषय "किंवा" (or) पर्यायांसह DATA चा ॲरे देखील असू शकतो.

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
`QUANTITY` - एक फिल्टर आयडी.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

नवीन ब्लॉक आल्यावर सूचित करण्यासाठी, नोडमध्ये एक फिल्टर तयार करते.
स्थिती बदलली आहे की नाही हे तपासण्यासाठी, [eth_getFilterChanges](#eth-getfilterchanges) ला कॉल करा.

**पॅरामीटर्स**
काहीही नाही

**रिटर्न्स**
`QUANTITY` - एक फिल्टर आयडी.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// निकाल
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

नवीन प्रलंबित व्यवहार आल्यावर सूचित करण्यासाठी, नोडमध्ये एक फिल्टर तयार करते.
स्थिती बदलली आहे की नाही हे तपासण्यासाठी, [eth_getFilterChanges](#eth-getfilterchanges) ला कॉल करा.

**पॅरामीटर्स**
काहीही नाही

**रिटर्न्स**
`QUANTITY` - एक फिल्टर आयडी.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// निकाल
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

दिलेल्या आयडीचा फिल्टर अनइन्स्टॉल करते. जेव्हा वॉचची (watch) यापुढे आवश्यकता नसते तेव्हा याला नेहमी कॉल केले जावे.
याव्यतिरिक्त, जेव्हा काही काळासाठी [eth_getFilterChanges](#eth-getfilterchanges) सह फिल्टरची विनंती केली जात नाही, तेव्हा ते कालबाह्य (timeout) होतात.

**पॅरामीटर्स**

1. `QUANTITY` - फिल्टर आयडी.

```js
params: [
  "0xb", // 11
]
```

**रिटर्न्स**
`Boolean` - जर फिल्टर यशस्वीरित्या अनइन्स्टॉल झाला असेल तर `true`, अन्यथा `false`.

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// निकाल
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

फिल्टरसाठी पोलिंग पद्धत, जी मागील पोलपासून घडलेल्या नोंदींचा ॲरे परत करते.

**पॅरामीटर्स**

1. `QUANTITY` - फिल्टर आयडी.

```js
params: [
  "0x16", // 22
]
```

**रिटर्न्स**
`Array` - नोंद ऑब्जेक्ट्सचा ॲरे, किंवा मागील पोलपासून काहीही बदलले नसल्यास रिक्त ॲरे.

- `eth_newBlockFilter` सह तयार केलेल्या फिल्टर्ससाठी ब्लॉक हॅशेस (`DATA`, 32 Bytes) परत मिळतात, उदा., `["0x3454645634534..."]`.
- `eth_newPendingTransactionFilter ` सह तयार केलेल्या फिल्टर्ससाठी व्यवहार हॅशेस (`DATA`, 32 Bytes) परत मिळतात, उदा., `["0x6345343454645..."]`.
- `eth_newFilter` सह तयार केलेल्या फिल्टर्ससाठी नोंदी खालील पॅरामीटर्ससह ऑब्जेक्ट्स असतात:
  - `removed`: `TAG` - चेन पुनर्रचनेमुळे नोंद काढली गेली असल्यास `true`. ती वैध नोंद असल्यास `false`.
  - `logIndex`: `QUANTITY` - ब्लॉकमधील नोंद निर्देशांक स्थानाचा पूर्णांक. ती प्रलंबित नोंद असल्यास `null`.
  - `transactionIndex`: `QUANTITY` - ज्या व्यवहारातून नोंद तयार केली गेली त्याच्या निर्देशांक स्थानाचा पूर्णांक. ती प्रलंबित नोंद असल्यास `null`.
  - `transactionHash`: `DATA`, 32 Bytes - ज्या व्यवहारातून ही नोंद तयार केली गेली त्याचा हॅश. ती प्रलंबित नोंद असल्यास `null`.
  - `blockHash`: `DATA`, 32 Bytes - ज्या ब्लॉकमध्ये ही नोंद होती त्याचा हॅश. ती प्रलंबित असल्यास `null`. ती प्रलंबित नोंद असल्यास `null`.
  - `blockNumber`: `QUANTITY` - ज्या ब्लॉकमध्ये ही नोंद होती त्याचा ब्लॉक क्रमांक. ती प्रलंबित असल्यास `null`. ती प्रलंबित नोंद असल्यास `null`.
  - `address`: `DATA`, 20 Bytes - ज्या पत्त्यावरून ही नोंद उद्भवली तो पत्ता.
  - `data`: `DATA` - व्हेरिएबल-लेंग्थ नॉन-इंडेक्स्ड नोंद डेटा. (_Solidity_ मध्ये: शून्य किंवा अधिक 32 Bytes नॉन-इंडेक्स्ड नोंद आर्ग्युमेंट्स.)
  - `topics`: `Array of DATA` - इंडेक्स्ड नोंद आर्ग्युमेंट्सच्या 0 ते 4 32 Bytes `DATA` चा ॲरे. (_Solidity_ मध्ये: पहिला विषय हा घटनेच्या स्वाक्षरीचा _हॅश_ असतो (उदा., `Deposit(address,bytes32,uint256)`), अपवाद वगळता जर तुम्ही घटना `anonymous` स्पेसिफायरसह घोषित केली असेल.)

- **उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// निकाल
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

दिलेल्या आयडीसह फिल्टरशी जुळणाऱ्या सर्व नोंदींचा ॲरे परत करतो.

**पॅरामीटर्स**

1. `QUANTITY` - फिल्टर आयडी.

```js
params: [
  "0x16", // 22
]
```

**रिटर्न्स**
[eth_getFilterChanges](#eth-getfilterchanges) पहा

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

निकालासाठी [eth_getFilterChanges](#eth-getfilterchanges) पहा

### eth_getLogs {#eth-getlogs}

दिलेल्या फिल्टर ऑब्जेक्टशी जुळणाऱ्या सर्व नोंदींचा ॲरे (array) परत करतो.

**पॅरामीटर्स**

1. `Object` - फिल्टर पर्याय:

- `fromBlock`: `QUANTITY|TAG` - (पर्यायी, डीफॉल्ट: `"latest"`) इंटिजर ब्लॉक क्रमांक, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम अंतिम झालेल्या ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (पर्यायी, डीफॉल्ट: `"latest"`) इंटिजर ब्लॉक क्रमांक, किंवा शेवटच्या प्रस्तावित ब्लॉकसाठी `"latest"`, नवीनतम सुरक्षित ब्लॉकसाठी `"safe"`, नवीनतम अंतिम झालेल्या ब्लॉकसाठी `"finalized"`, किंवा अद्याप ब्लॉकमध्ये नसलेल्या व्यवहारांसाठी `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 Bytes - (पर्यायी) कॉन्ट्रॅक्ट पत्ता किंवा पत्त्यांची सूची जिथून नोंदी तयार झाल्या पाहिजेत.
- `topics`: `Array of DATA`, - (पर्यायी) 32 Bytes `DATA` विषयांचा (topics) ॲरे. विषय क्रमावर अवलंबून असतात. प्रत्येक विषय "or" पर्यायांसह DATA चा ॲरे देखील असू शकतो.
- `blockHash`: `DATA`, 32 Bytes - (पर्यायी, **भविष्य**) EIP-234 च्या समावेशासह, `blockHash` हा एक नवीन फिल्टर पर्याय असेल जो परत केलेल्या नोंदींना 32-byte हॅश `blockHash` असलेल्या एकाच ब्लॉकपुरते मर्यादित करेल. `blockHash` वापरणे हे `fromBlock` = `toBlock` = `blockHash` हॅश असलेल्या ब्लॉक क्रमांकाच्या समतुल्य आहे. जर फिल्टर निकषांमध्ये `blockHash` उपस्थित असेल, तर `fromBlock` आणि `toBlock` या दोन्हीला परवानगी नाही.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**परतावा**
[eth_getFilterChanges](#eth-getfilterchanges) पहा

**उदाहरण**

```js
// विनंती
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

निकालासाठी [eth_getFilterChanges](#eth-getfilterchanges) पहा

## वापराचे उदाहरण {#usage-example}

### जेसॉन-आरपीसी वापरून कॉन्ट्रॅक्ट प्रस्थापित करणे {#deploying-contract}

या विभागात केवळ RPC इंटरफेस वापरून कॉन्ट्रॅक्ट कसे प्रस्थापित करायचे याचे प्रात्यक्षिक समाविष्ट आहे. कॉन्ट्रॅक्ट प्रस्थापित करण्याचे इतरही मार्ग आहेत जिथे ही गुंतागुंत लपवली जाते—उदाहरणार्थ, RPC इंटरफेसवर तयार केलेल्या [web3.js](https://web3js.readthedocs.io/) आणि [web3.py](https://github.com/ethereum/web3.py) सारख्या लायब्ररी वापरणे. हे ॲब्स्ट्रॅक्शन्स सामान्यतः समजण्यास सोपे असतात आणि त्यात चुका होण्याची शक्यता कमी असते, परंतु अंतर्गत तांत्रिकदृष्ट्या काय घडत आहे हे समजून घेणे अद्याप उपयुक्त आहे.

खालील एक सोपे स्मार्ट कॉन्ट्रॅक्ट आहे ज्याला `Multiply7` म्हटले जाते, जे जेसॉन-आरपीसी इंटरफेस वापरून इथेरियम नोडवर प्रस्थापित केले जाईल. हे ट्युटोरियल असे गृहीत धरते की वाचक आधीपासूनच गेथ नोड चालवत आहे. नोड्स आणि क्लायंट्सबद्दल अधिक माहिती [येथे](/developers/docs/nodes-and-clients/run-a-node) उपलब्ध आहे. नॉन-गेथ क्लायंट्ससाठी HTTP जेसॉन-आरपीसी कसे सुरू करावे हे पाहण्यासाठी कृपया वैयक्तिक [क्लायंट](/developers/docs/nodes-and-clients/) दस्तऐवजीकरण पहा. बहुतेक क्लायंट्स डीफॉल्टनुसार `localhost:8545` वर सर्व्ह करतात.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

पहिली गोष्ट म्हणजे HTTP RPC इंटरफेस सक्षम आहे याची खात्री करणे. याचा अर्थ आपण स्टार्टअपच्या वेळी गेथला `--http` फ्लॅग पुरवतो. या उदाहरणात आपण खाजगी डेव्हलपमेंट चेनवर गेथ नोड वापरतो. हा दृष्टिकोन वापरल्याने आपल्याला खऱ्या नेटवर्कवर इथरची आवश्यकता नसते.

```bash
geth --http --dev console 2>>geth.log
```

हे `http://localhost:8545` वर HTTP RPC इंटरफेस सुरू करेल.

आपण [curl](https://curl.se) वापरून कॉइनबेस् पत्ता (खात्यांच्या ॲरेमधून पहिला पत्ता मिळवून) आणि शिल्लक मिळवून इंटरफेस चालू असल्याची पडताळणी करू शकतो. कृपया लक्षात घ्या की या उदाहरणांमधील डेटा तुमच्या स्थानिक नोडवर भिन्न असेल. जर तुम्हाला या कमांड्स वापरायच्या असतील, तर दुसऱ्या curl विनंतीमधील विनंती पॅरामीटर्स पहिल्या विनंतीतून परत आलेल्या निकालाने बदला.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

कारण संख्या हेक्स एन्कोड केलेल्या आहेत, शिल्लक Wei मध्ये हेक्स स्ट्रिंग म्हणून परत केली जाते. जर आपल्याला इथरमधील शिल्लक संख्या म्हणून हवी असेल तर आपण गेथ कन्सोलमधून web3 वापरू शकतो.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

आता आपल्या खाजगी डेव्हलपमेंट चेनवर काही इथर असल्याने, आपण कॉन्ट्रॅक्ट प्रस्थापित करू शकतो. पहिली पायरी म्हणजे Multiply7 कॉन्ट्रॅक्टचे बाइटकोडमध्ये संकलन करणे जे EVM ला पाठवले जाऊ शकते. solc, Solidity कंपायलर स्थापित करण्यासाठी, [Solidity दस्तऐवजीकरण](https://docs.soliditylang.org/en/latest/installing-solidity.html) फॉलो करा. (तुम्हाला [आमच्या उदाहरणासाठी वापरलेल्या कंपायलरच्या आवृत्तीशी](https://github.com/ethereum/solidity/releases/tag/v0.4.20) जुळण्यासाठी जुने `solc` रिलीज वापरायचे असू शकते.)

पुढची पायरी म्हणजे Multiply7 कॉन्ट्रॅक्टचे बाइटकोडमध्ये संकलन करणे जे EVM ला पाठवले जाऊ शकते.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

आता आपल्याकडे संकलित केलेला कोड असल्याने, तो प्रस्थापित करण्यासाठी किती गॅस लागेल हे आपल्याला ठरवावे लागेल. RPC इंटरफेसमध्ये `eth_estimateGas` पद्धत आहे जी आपल्याला अंदाज देईल.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

आणि शेवटी कॉन्ट्रॅक्ट प्रस्थापित करा.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

व्यवहार नोडद्वारे स्वीकारला जातो आणि व्यवहार हॅश परत केला जातो. हा हॅश व्यवहाराचा मागोवा घेण्यासाठी वापरला जाऊ शकतो. पुढची पायरी म्हणजे आपला कॉन्ट्रॅक्ट ज्या पत्त्यावर प्रस्थापित केला आहे तो पत्ता निश्चित करणे. प्रत्येक अंमलात आणलेला व्यवहार एक पावती तयार करेल. या पावतीमध्ये व्यवहाराबद्दल विविध माहिती असते जसे की व्यवहार कोणत्या ब्लॉकमध्ये समाविष्ट केला गेला आणि EVM द्वारे किती गॅस वापरला गेला. जर एखादा व्यवहार कॉन्ट्रॅक्ट तयार करत असेल तर त्यात कॉन्ट्रॅक्टचा पत्ता देखील असेल. आपण `eth_getTransactionReceipt` RPC पद्धतीसह पावती मिळवू शकतो.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

आपले कॉन्ट्रॅक्ट `0x4d03d617d700cf81935d7f797f4e2ae719648262` वर तयार केले गेले. पावतीऐवजी शून्य (null) निकाल मिळणे याचा अर्थ असा की व्यवहार अद्याप ब्लॉकमध्ये समाविष्ट केलेला नाही. थोड्या वेळ थांबा आणि तुमचा सहमती क्लायंट चालू आहे का ते तपासा आणि पुन्हा प्रयत्न करा.

#### स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधणे {#interacting-with-smart-contract}

या उदाहरणात आपण कॉन्ट्रॅक्टच्या `multiply` पद्धतीला `eth_sendTransaction` वापरून व्यवहार पाठवणार आहोत.

`eth_sendTransaction` ला अनेक आर्ग्युमेंट्स आवश्यक आहेत, विशेषतः `from`, `to` आणि `data`. `From` हा आपल्या खात्याचा सार्वजनिक पत्ता आहे, आणि `to` हा कॉन्ट्रॅक्टचा पत्ता आहे. `data` आर्ग्युमेंटमध्ये एक पेलोड असतो जो परिभाषित करतो की कोणती पद्धत कॉल केली जावी आणि कोणत्या आर्ग्युमेंट्ससह. येथेच [ABI (ॲप्लिकेशन बायनरी इंटरफेस)](https://docs.soliditylang.org/en/latest/abi-spec.html) ची भूमिका येते. ABI ही एक JSON फाईल आहे जी EVM साठी डेटा कसा परिभाषित आणि एन्कोड करायचा हे ठरवते.

पेलोडचे बाइट्स कॉन्ट्रॅक्टमधील कोणती पद्धत कॉल केली जाते हे परिभाषित करतात. हे फंक्शनचे नाव आणि त्याच्या आर्ग्युमेंट प्रकारांवरील केकाक हॅशमधील पहिले 4 बाइट्स आहेत, जे हेक्स एन्कोड केलेले आहेत. मल्टिप्लाय (multiply) फंक्शन uint स्वीकारते जे uint256 चे टोपणनाव (alias) आहे. यामुळे आपल्याला मिळते:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

पुढची पायरी म्हणजे आर्ग्युमेंट्स एन्कोड करणे. येथे फक्त एक uint256 आहे, समजा, मूल्य 6. ABI मध्ये एक विभाग आहे जो uint256 प्रकार कसे एन्कोड करायचे हे निर्दिष्ट करतो.

`int<M>: enc(X)` हे X चे बिग-एन्डियन टूज कॉम्प्लिमेंट (two’s complement) एन्कोडिंग आहे, जे नकारात्मक X साठी उच्च-क्रम (डाव्या) बाजूला 0xff ने आणि सकारात्मक X साठी शून्य बाइट्सने पॅड केलेले असते जेणेकरून लांबी 32 बाइट्सच्या पटीत असेल.

हे `0000000000000000000000000000000000000000000000000000000000000006` मध्ये एन्कोड होते.

फंक्शन सिलेक्टर आणि एन्कोड केलेले आर्ग्युमेंट एकत्र केल्यावर आपला डेटा `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` असेल.

हे आता नोडला पाठवले जाऊ शकते:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

व्यवहार पाठवला गेल्यामुळे, व्यवहार हॅश परत केला गेला. पावती मिळवल्यास हे मिळते:

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

पावतीमध्ये एक नोंद असते. ही नोंद EVM द्वारे व्यवहार अंमलबजावणीवर तयार केली गेली आणि पावतीमध्ये समाविष्ट केली गेली. `multiply` फंक्शन दर्शविते की `Print` घटना इनपुटच्या 7 पट मूल्याने उपस्थित केली गेली. `Print` घटनेसाठी आर्ग्युमेंट uint256 असल्याने आपण ते ABI नियमांनुसार डीकोड करू शकतो ज्यामुळे आपल्याला अपेक्षित दशांश 42 मिळेल. डेटा व्यतिरिक्त हे लक्षात घेण्यासारखे आहे की कोणती घटना नोंद तयार करते हे निर्धारित करण्यासाठी टॉपिक्स (topics) वापरले जाऊ शकतात:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

हे काही सर्वात सामान्य कार्यांची फक्त एक संक्षिप्त ओळख होती, जी जेसॉन-आरपीसी चा थेट वापर दर्शवते.

## संबंधित विषय {#related-topics}

- [जेसॉन-आरपीसी तपशील](http://www.jsonrpc.org/specification)
- [नोड्स आणि क्लायंट्स](/developers/docs/nodes-and-clients/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [बॅकएंड APIs](/developers/docs/apis/backend/)
- [अंमलबजावणी क्लायंट्स](/developers/docs/nodes-and-clients/#execution-clients)