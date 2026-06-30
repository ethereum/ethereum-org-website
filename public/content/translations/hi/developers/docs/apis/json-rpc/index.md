---
title: "जेसन-आरपीसी API"
description: "इथेरियम क्लाइंट्स के लिए एक स्टेटलेस, लाइट-वेट रिमोट प्रोसीजर कॉल (RPC) प्रोटोकॉल।"
lang: hi
---

किसी सॉफ़्टवेयर एप्लिकेशन को [इथेरियम](/) ब्लॉकचेन के साथ इंटरैक्ट करने के लिए - चाहे ब्लॉकचेन डेटा पढ़ना हो या नेटवर्क पर लेन-देन भेजना हो - उसे एक इथेरियम नोड से कनेक्ट होना चाहिए।

इस उद्देश्य के लिए, हर [इथेरियम क्लाइंट](/developers/docs/nodes-and-clients/#execution-clients) एक [जेसन-आरपीसी विनिर्देश](https://github.com/ethereum/execution-apis) लागू करता है, ताकि विधियों (methods) का एक समान सेट हो जिस पर एप्लिकेशन निर्भर कर सकें, चाहे विशिष्ट नोड या क्लाइंट कार्यान्वयन कुछ भी हो।

[जेसन-आरपीसी](https://www.jsonrpc.org/specification) एक स्टेटलेस, लाइट-वेट रिमोट प्रोसीजर कॉल (RPC) प्रोटोकॉल है। यह कई डेटा संरचनाओं और उनके प्रसंस्करण के नियमों को परिभाषित करता है। यह ट्रांसपोर्ट एग्नॉस्टिक है, जिसका अर्थ है कि इन अवधारणाओं का उपयोग एक ही प्रक्रिया के भीतर, सॉकेट पर, HTTP पर, या कई विभिन्न संदेश पासिंग वातावरणों में किया जा सकता है। यह डेटा प्रारूप के रूप में JSON (RFC 4627) का उपयोग करता है।

## क्लाइंट कार्यान्वयन {#client-implementations}

इथेरियम क्लाइंट जेसन-आरपीसी विनिर्देश को लागू करते समय विभिन्न प्रोग्रामिंग भाषाओं का उपयोग कर सकते हैं। विशिष्ट प्रोग्रामिंग भाषाओं से संबंधित अधिक जानकारी के लिए व्यक्तिगत [क्लाइंट दस्तावेज़](/developers/docs/nodes-and-clients/#execution-clients) देखें। हम नवीनतम API समर्थन जानकारी के लिए प्रत्येक क्लाइंट के दस्तावेज़ों की जाँच करने की सलाह देते हैं।

## सुविधा लाइब्रेरियां {#convenience-libraries}

हालाँकि आप जेसन-आरपीसी API के माध्यम से सीधे इथेरियम क्लाइंट के साथ इंटरैक्ट करना चुन सकते हैं, लेकिन विकेंद्रीकृत एप्लिकेशन (dapp) डेवलपर्स के लिए अक्सर आसान विकल्प मौजूद होते हैं। कई [JavaScript](/developers/docs/apis/javascript/#available-libraries) और [बैकएंड API](/developers/docs/apis/backend/#available-libraries) लाइब्रेरियां मौजूद हैं जो जेसन-आरपीसी API के ऊपर रैपर प्रदान करती हैं। इन लाइब्रेरियों की मदद से, डेवलपर्स इथेरियम के साथ इंटरैक्ट करने वाले जेसन-आरपीसी अनुरोधों को (आंतरिक रूप से) प्रारंभ करने के लिए अपनी पसंद की प्रोग्रामिंग भाषा में सहज, एक-पंक्ति वाले मेथड्स लिख सकते हैं।

## सर्वसम्मति क्लाइंट APIs {#consensus-clients}

यह पृष्ठ मुख्य रूप से इथेरियम निष्पादन क्लाइंट द्वारा उपयोग किए जाने वाले जेसन-आरपीसी API से संबंधित है। हालाँकि, सर्वसम्मति क्लाइंट में एक RPC API भी होता है जो उपयोगकर्ताओं को सीधे एक नोड से नोड के बारे में जानकारी प्राप्त करने, बीकन ब्लॉक, बीकन स्थिति और अन्य सर्वसम्मति-संबंधित जानकारी का अनुरोध करने की अनुमति देता है। इस API का दस्तावेज़ीकरण [बीकन API वेबपेज](https://ethereum.github.io/beacon-APIs/#/) पर किया गया है।

एक नोड के भीतर अंतर-क्लाइंट संचार के लिए एक आंतरिक API का भी उपयोग किया जाता है - यानी, यह सर्वसम्मति क्लाइंट और निष्पादन क्लाइंट को डेटा स्वैप करने में सक्षम बनाता है। इसे 'इंजन API' कहा जाता है और इसके विनिर्देश [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) पर उपलब्ध हैं।

## निष्पादन क्लाइंट स्पेक {#spec}

[GitHub पर पूरा जेसन-आरपीसी API स्पेक पढ़ें](https://github.com/ethereum/execution-apis)। इस API को [निष्पादन API वेबपेज](https://ethereum.github.io/execution-apis/) पर प्रलेखित किया गया है और इसमें सभी उपलब्ध मेथड्स को आज़माने के लिए एक इंस्पेक्टर शामिल है।

## परंपराएँ {#conventions}

### हेक्स मान एन्कोडिंग {#hex-encoding}

JSON पर दो प्रमुख डेटा प्रकार पास किए जाते हैं: अनफ़ॉर्मेटेड बाइट एरे और मात्राएँ। दोनों को हेक्स एन्कोडिंग के साथ पास किया जाता है लेकिन फ़ॉर्मेटिंग के लिए अलग-अलग आवश्यकताओं के साथ।

#### मात्राएँ {#quantities-encoding}

मात्राओं (पूर्णांक, संख्याएँ) को एन्कोड करते समय: हेक्स के रूप में एन्कोड करें, "0x" के साथ उपसर्ग लगाएँ, जो सबसे कॉम्पैक्ट प्रतिनिधित्व है (थोड़ा अपवाद: शून्य को "0x0" के रूप में दर्शाया जाना चाहिए)।

यहाँ कुछ उदाहरण दिए गए हैं:

- 0x41 (दशमलव में 65)
- 0x400 (दशमलव में 1024)
- गलत: 0x (हमेशा कम से कम एक अंक होना चाहिए - शून्य "0x0" है)
- गलत: 0x0400 (शुरुआत में शून्य की अनुमति नहीं है)
- गलत: ff (0x उपसर्ग होना चाहिए)

### अनफ़ॉर्मेटेड डेटा {#unformatted-data-encoding}

अनफ़ॉर्मेटेड डेटा (बाइट एरे, खाता पते, हैश, बाइटकोड एरे) को एन्कोड करते समय: हेक्स के रूप में एन्कोड करें, "0x" के साथ उपसर्ग लगाएँ, प्रति बाइट दो हेक्स अंक।

यहाँ कुछ उदाहरण दिए गए हैं:

- 0x41 (आकार 1, "A")
- 0x004200 (आकार 3, "0B0")
- 0x (आकार 0, "")
- गलत: 0xf0f0f (अंकों की संख्या सम होनी चाहिए)
- गलत: 004200 (0x उपसर्ग होना चाहिए)

### ब्लॉक पैरामीटर {#block-parameter}

निम्नलिखित विधियों में एक ब्लॉक पैरामीटर होता है:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

जब ऐसे अनुरोध किए जाते हैं जो इथेरियम की स्थिति को क्वेरी करते हैं, तो प्रदान किया गया ब्लॉक पैरामीटर ब्लॉक की ऊंचाई निर्धारित करता है।

ब्लॉक पैरामीटर के लिए निम्नलिखित विकल्प संभव हैं:

- `HEX String` - एक पूर्णांक ब्लॉक संख्या
- `String "earliest"` सबसे शुरुआती/जेनेसिस ब्लॉक के लिए
- `String "latest"` - नवीनतम प्रस्तावित ब्लॉक के लिए
- `String "safe"` - नवीनतम सुरक्षित हेड ब्लॉक के लिए
- `String "finalized"` - नवीनतम अंतिम रूप दिए गए ब्लॉक के लिए
- `String "pending"` - लंबित स्थिति/लेन-देन के लिए

## उदाहरण {#examples}

इस पृष्ठ पर हम कमांड लाइन टूल, [curl](https://curl.se) का उपयोग करके व्यक्तिगत जेसन-आरपीसी API एंडपॉइंट्स का उपयोग करने के उदाहरण प्रदान करते हैं। ये व्यक्तिगत एंडपॉइंट उदाहरण नीचे [Curl उदाहरण](#curl-examples) अनुभाग में दिए गए हैं। पृष्ठ में आगे नीचे, हम एक Geth नोड, जेसन-आरपीसी API और curl का उपयोग करके एक स्मार्ट अनुबंध के संकलन और उसे तैनात करने के लिए एक [एंड-टू-एंड उदाहरण](#usage-example) भी प्रदान करते हैं।

## Curl के उदाहरण {#curl-examples}

एक इथेरियम नोड पर [curl](https://curl.se) अनुरोध करके जेसन-आरपीसी API का उपयोग करने के उदाहरण नीचे दिए गए हैं। प्रत्येक उदाहरण में विशिष्ट एंडपॉइंट का विवरण, इसके पैरामीटर, रिटर्न प्रकार और इसका उपयोग कैसे किया जाना चाहिए, इसका एक व्यावहारिक उदाहरण शामिल है।

curl अनुरोध सामग्री प्रकार (content type) से संबंधित एक त्रुटि संदेश लौटा सकते हैं। ऐसा इसलिए है क्योंकि `--data` विकल्प सामग्री प्रकार को `application/x-www-form-urlencoded` पर सेट करता है। यदि आपका नोड इसके बारे में शिकायत करता है, तो कॉल की शुरुआत में `-H "Content-Type: application/json"` रखकर हेडर को मैन्युअल रूप से सेट करें। उदाहरणों में URL/IP और पोर्ट संयोजन भी शामिल नहीं है जो curl को दिया जाने वाला अंतिम तर्क (argument) होना चाहिए (उदा., `127.0.0.1:8545`)। इन अतिरिक्त डेटा सहित एक पूर्ण curl अनुरोध निम्नलिखित रूप लेता है:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## गॉसिप, स्थिति, इतिहास {#gossip-state-history}

कुछ प्रमुख जेसन-आरपीसी विधियों को इथेरियम नेटवर्क से डेटा की आवश्यकता होती है, और वे स्पष्ट रूप से तीन मुख्य श्रेणियों में आते हैं: _गॉसिप, स्थिति, और इतिहास_। प्रत्येक विधि पर जाने के लिए इन अनुभागों में दिए गए लिंक का उपयोग करें, या विधियों की पूरी सूची देखने के लिए विषय सूची का उपयोग करें।

### गॉसिप विधियाँ {#gossip-methods}

> ये विधियाँ चेन के शीर्ष (head) को ट्रैक करती हैं। इसी तरह लेन-देन नेटवर्क में अपना रास्ता बनाते हैं, ब्लॉक में शामिल होते हैं, और क्लाइंट्स को नए ब्लॉक के बारे में पता चलता है।

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### स्थिति विधियाँ {#state-methods}

> वे विधियाँ जो संग्रहीत सभी डेटा की वर्तमान स्थिति की रिपोर्ट करती हैं। "स्थिति" एक बड़े साझा RAM के हिस्से की तरह है, और इसमें खाते का बैलेंस, अनुबंध डेटा और गैस का अनुमान शामिल होता है।

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### इतिहास विधियाँ {#history-methods}

> जेनेसिस ब्लॉक तक प्रत्येक ब्लॉक के ऐतिहासिक रिकॉर्ड प्राप्त करता है। यह एक बड़ी केवल-जोड़ने-योग्य (append-only) फ़ाइल की तरह है, और इसमें सभी ब्लॉक हेडर, ब्लॉक बॉडी, अंकल ब्लॉक और लेन-देन रसीदें शामिल होती हैं।

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

## जेसन-आरपीसी API प्लेग्राउंड {#json-rpc-api-playground}

आप API विधियों को खोजने और आज़माने के लिए [प्लेग्राउंड टूल](https://ethereum-json-rpc.com) का उपयोग कर सकते हैं। यह आपको यह भी दिखाता है कि विभिन्न नोड प्रदाताओं द्वारा कौन सी विधियाँ और नेटवर्क समर्थित हैं।

## जेसन-आरपीसी API विधियाँ {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

वर्तमान क्लाइंट संस्करण लौटाता है।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`String` - वर्तमान क्लाइंट संस्करण

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

दिए गए डेटा का केकाक-256 (_न कि_ मानकीकृत SHA3-256) लौटाता है।

**पैरामीटर**

1. `DATA` - SHA3 हैश में बदलने के लिए डेटा

```js
params: ["0x68656c6c6f20776f726c64"]
```

**रिटर्न**

`DATA` - दी गई स्ट्रिंग का SHA3 परिणाम।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// परिणाम
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

वर्तमान नेटवर्क आईडी लौटाता है।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`String` - वर्तमान नेटवर्क आईडी।

वर्तमान नेटवर्क आईडी की पूरी सूची [chainlist.org](https://chainlist.org) पर उपलब्ध है। कुछ सामान्य इस प्रकार हैं:

- `1`: इथेरियम मेननेट
- `11155111`: Sepolia टेस्टनेट
- `560048` : Hoodi टेस्टनेट

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

यदि क्लाइंट नेटवर्क कनेक्शन के लिए सक्रिय रूप से सुन रहा है तो `true` लौटाता है।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`Boolean` - सुनने पर `true`, अन्यथा `false`।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

क्लाइंट से वर्तमान में जुड़े पीयर्स की संख्या लौटाता है।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`QUANTITY` - जुड़े हुए पीयर्स की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// परिणाम
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

वर्तमान इथेरियम प्रोटोकॉल संस्करण लौटाता है। ध्यान दें कि यह विधि [Geth में उपलब्ध नहीं है](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`String` - वर्तमान इथेरियम प्रोटोकॉल संस्करण

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

सिंकिंग स्थिति के बारे में डेटा वाला एक ऑब्जेक्ट या `false` लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

सटीक रिटर्न डेटा क्लाइंट कार्यान्वयन के बीच भिन्न होता है। जब नोड सिंकिंग नहीं कर रहा होता है, तो सभी क्लाइंट `False` लौटाते हैं, और सभी क्लाइंट निम्नलिखित फ़ील्ड लौटाते हैं।

`Object|Boolean`, सिंकिंग स्थिति डेटा वाला एक ऑब्जेक्ट या `FALSE`, जब सिंकिंग नहीं हो रही हो:

- `startingBlock`: `QUANTITY` - वह ब्लॉक जहाँ से आयात शुरू हुआ था (सिंकिंग के अपने शीर्ष पर पहुँचने के बाद ही रीसेट किया जाएगा)
- `currentBlock`: `QUANTITY` - वर्तमान ब्लॉक, eth_blockNumber के समान
- `highestBlock`: `QUANTITY` - अनुमानित उच्चतम ब्लॉक

हालाँकि, व्यक्तिगत क्लाइंट अतिरिक्त डेटा भी प्रदान कर सकते हैं। उदाहरण के लिए Geth निम्नलिखित लौटाता है:

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

जबकि बेसु (Besu) लौटाता है:

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

अधिक जानकारी के लिए अपने विशिष्ट क्लाइंट के दस्तावेज़ देखें।

**उदाहरण**

```js
// अनुरोध
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
// या जब सिंकिंग नहीं हो रही हो
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

क्लाइंट का कॉइनबेस पता लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

> **नोट:** यह विधि **v1.14.0** से पदावनत (deprecated) कर दी गई है और अब समर्थित नहीं है। इस विधि का उपयोग करने का प्रयास करने पर "Method not supported" त्रुटि मिलेगी।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`DATA`, 20 बाइट्स - वर्तमान कॉइनबेस पता।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// परिणाम
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

यह रीप्ले-संरक्षित लेन-देन पर हस्ताक्षर करने के लिए उपयोग की जाने वाली चेन ID लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`chainId`, एक स्ट्रिंग के रूप में हेक्साडेसिमल मान जो वर्तमान चेन ID के पूर्णांक को दर्शाता है।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// परिणाम
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

यदि क्लाइंट सक्रिय रूप से नए ब्लॉक का खनन कर रहा है, तो यह `true` लौटाता है। यह केवल प्रूफ-ऑफ-वर्क नेटवर्क के लिए `true` लौटा सकता है और [द मर्ज](/roadmap/merge/) के बाद से कुछ क्लाइंट्स में उपलब्ध नहीं हो सकता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`Boolean` - यदि क्लाइंट खनन कर रहा है तो `true` लौटाता है, अन्यथा `false` लौटाता है।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

यह प्रति सेकंड हैश की वह संख्या लौटाता है जिसके साथ नोड खनन कर रहा है। यह केवल प्रूफ-ऑफ-वर्क (PoW) नेटवर्क के लिए `true` लौटा सकता है और [द मर्ज](/roadmap/merge/) के बाद से कुछ क्लाइंट में उपलब्ध नहीं हो सकता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`QUANTITY` - प्रति सेकंड हैश की संख्या।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// परिणाम
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Wei में प्रति गैस वर्तमान मूल्य का अनुमान लौटाता है। उदाहरण के लिए, बेसु क्लाइंट पिछले 100 ब्लॉकों की जांच करता है और डिफ़ॉल्ट रूप से माध्यिका गैस इकाई मूल्य लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`QUANTITY` - Wei में वर्तमान गैस मूल्य का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// परिणाम
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

क्लाइंट के स्वामित्व वाले पतों की एक सूची लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`Array of DATA`, 20 बाइट्स - क्लाइंट के स्वामित्व वाले पते।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

सबसे हालिया ब्लॉक की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  प्लेग्राउंड में एंडपॉइंट आजमाएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`QUANTITY` - वर्तमान ब्लॉक संख्या का पूर्णांक जिस पर क्लाइंट है।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// परिणाम
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

किसी दिए गए पते पर खाते का बैलेंस लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 20 बाइट्स - बैलेंस जांचने के लिए पता।
2. `QUANTITY|TAG` - पूर्णांक ब्लॉक संख्या, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**रिटर्न**

`QUANTITY` - Wei में वर्तमान बैलेंस का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

किसी दिए गए पते पर स्टोरेज स्थिति से मान लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 20 बाइट्स - स्टोरेज का पता।
2. `QUANTITY` - स्टोरेज में स्थिति का पूर्णांक।
3. `QUANTITY|TAG` - पूर्णांक ब्लॉक संख्या, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

**रिटर्न**

`DATA` - इस स्टोरेज स्थिति पर मान।

**उदाहरण**
सही स्थिति की गणना करना प्राप्त किए जाने वाले स्टोरेज पर निर्भर करता है। `0x391694e7e0b0cce554cb130d723a9d27458f9298` पते द्वारा `0x295a70b2de5e3953354a6a8344e616ed314d7251` पर तैनात किए गए निम्नलिखित अनुबंध पर विचार करें।

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

pos0 का मान प्राप्त करना सीधा है:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

मैप के किसी तत्व को प्राप्त करना कठिन है। मैप में किसी तत्व की स्थिति की गणना इसके साथ की जाती है:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

इसका मतलब है कि pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] पर स्टोरेज प्राप्त करने के लिए हमें इसके साथ स्थिति की गणना करने की आवश्यकता है:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

गणना करने के लिए geth कंसोल का उपयोग किया जा सकता है जो Web3 लाइब्रेरी के साथ आता है:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

अब स्टोरेज प्राप्त करने के लिए:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

किसी पते से _भेजे गए_ लेन-देन की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 20 बाइट्स - पता।
2. `QUANTITY|TAG` - पूर्णांक ब्लॉक संख्या, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // नवीनतम ब्लॉक पर स्थिति
]
```

**रिटर्न**

`QUANTITY` - इस पते से भेजे गए लेन-देन की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

दिए गए ब्लॉक हैश से मेल खाने वाले ब्लॉक में लेन-देन की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 32 बाइट्स - एक ब्लॉक का हैश

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**रिटर्न**

`QUANTITY` - इस ब्लॉक में लेन-देन की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

दिए गए ब्लॉक नंबर से मेल खाने वाले ब्लॉक में लेन-देन की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `QUANTITY|TAG` - एक ब्लॉक नंबर का पूर्णांक, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` या `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।

```js
params: [
  "0x13738ca", // 20396234
]
```

**रिटर्न**

`QUANTITY` - इस ब्लॉक में लेन-देन की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

दिए गए ब्लॉक हैश से मेल खाने वाले ब्लॉक से, एक ब्लॉक में अंकल्स की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 32 बाइट्स - एक ब्लॉक का हैश

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**रिटर्न**

`QUANTITY` - इस ब्लॉक में अंकल्स की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

दिए गए ब्लॉक नंबर से मेल खाने वाले ब्लॉक में अंकल्स की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `QUANTITY|TAG` - एक ब्लॉक नंबर का पूर्णांक, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: [
  "0xe8", // 232
]
```

**रिटर्न**

`QUANTITY` - इस ब्लॉक में अंकल्स की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

किसी दिए गए पते पर कोड लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 20 बाइट्स - पता
2. `QUANTITY|TAG` - पूर्णांक ब्लॉक संख्या, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**रिटर्न**

`DATA` - दिए गए पते से कोड।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

sign विधि `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))` के साथ एक इथेरियम-विशिष्ट हस्ताक्षर की गणना करती है।

संदेश में एक उपसर्ग जोड़ने से गणना किया गया हस्ताक्षर एक इथेरियम-विशिष्ट हस्ताक्षर के रूप में पहचाने जाने योग्य हो जाता है। यह उस दुरुपयोग को रोकता है जहाँ एक दुर्भावनापूर्ण विकेंद्रीकृत एप्लिकेशन (dapp) मनमाने डेटा (उदा., लेन-देन) पर हस्ताक्षर कर सकता है और पीड़ित का रूप धारण करने के लिए हस्ताक्षर का उपयोग कर सकता है।

नोट: जिस पते से हस्ताक्षर करना है, वह अनलॉक होना चाहिए।

**पैरामीटर**

1. `DATA`, 20 बाइट्स - पता
2. `DATA`, N बाइट्स - हस्ताक्षर करने के लिए संदेश

**रिटर्न**

`DATA`: हस्ताक्षर

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

एक लेनदेन पर हस्ताक्षर करता है जिसे बाद में [eth_sendRawTransaction](#eth-sendrawtransaction) का उपयोग करके नेटवर्क पर सबमिट किया जा सकता है।

**पैरामीटर**

1. `Object` - लेनदेन ऑब्जेक्ट

- `type`:
- `from`: `DATA`, 20 बाइट्स - वह पता जहाँ से लेनदेन भेजा जाता है।
- `to`: `DATA`, 20 बाइट्स - (नया अनुबंध बनाते समय वैकल्पिक) वह पता जिस पर लेनदेन निर्देशित है।
- `gas`: `QUANTITY` - (वैकल्पिक, डिफ़ॉल्ट: 90000) लेनदेन निष्पादन के लिए प्रदान की गई गैस का पूर्णांक। यह अप्रयुक्त गैस वापस कर देगा।
- `gasPrice`: `QUANTITY` - (वैकल्पिक, डिफ़ॉल्ट: निर्धारित किया जाना है) प्रत्येक भुगतान की गई गैस के लिए उपयोग किए जाने वाले गैस मूल्य का पूर्णांक, Wei में।
- `value`: `QUANTITY` - (वैकल्पिक) इस लेनदेन के साथ भेजे गए मूल्य का पूर्णांक, Wei में।
- `data`: `DATA` - किसी अनुबंध का संकलित कोड या आह्वान किए गए विधि हस्ताक्षर और एन्कोड किए गए पैरामीटर का हैश।
- `nonce`: `QUANTITY` - (वैकल्पिक) नॉन्स का पूर्णांक। यह आपके स्वयं के लंबित लेनदेन को अधिलेखित करने की अनुमति देता है जो उसी नॉन्स का उपयोग करते हैं।

**रिटर्न**

`DATA`, निर्दिष्ट खाते द्वारा हस्ताक्षरित RLP-एन्कोडेड लेनदेन ऑब्जेक्ट।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// परिणाम
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

यदि डेटा फ़ील्ड में कोड है, तो यह नया संदेश कॉल लेनदेन या अनुबंध निर्माण बनाता है, और `from` में निर्दिष्ट खाते का उपयोग करके इस पर हस्ताक्षर करता है।

**पैरामीटर**

1. `Object` - लेनदेन ऑब्जेक्ट

- `from`: `DATA`, 20 बाइट्स - वह पता जहाँ से लेनदेन भेजा जाता है।
- `to`: `DATA`, 20 बाइट्स - (नया अनुबंध बनाते समय वैकल्पिक) वह पता जिस पर लेनदेन निर्देशित है।
- `gas`: `QUANTITY` - (वैकल्पिक, डिफ़ॉल्ट: 90000) लेनदेन निष्पादन के लिए प्रदान की गई गैस का पूर्णांक। यह अप्रयुक्त गैस वापस कर देगा।
- `gasPrice`: `QUANTITY` - (वैकल्पिक, डिफ़ॉल्ट: निर्धारित किया जाना है) प्रत्येक भुगतान की गई गैस के लिए उपयोग किए गए गैस मूल्य का पूर्णांक।
- `value`: `QUANTITY` - (वैकल्पिक) इस लेनदेन के साथ भेजे गए मूल्य का पूर्णांक।
- `input`: `DATA` - किसी अनुबंध का संकलित कोड या लागू की गई विधि हस्ताक्षर और एन्कोड किए गए पैरामीटर का हैश।
- `nonce`: `QUANTITY` - (वैकल्पिक) नॉन्स का पूर्णांक। यह आपको अपने स्वयं के लंबित लेनदेन को अधिलेखित करने की अनुमति देता है जो उसी नॉन्स का उपयोग करते हैं।

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

**रिटर्न**

`DATA`, 32 बाइट्स - लेनदेन हैश, या शून्य हैश यदि लेनदेन अभी तक उपलब्ध नहीं है।

जब आपने कोई अनुबंध बनाया हो, तो लेनदेन को किसी ब्लॉक में प्रस्तावित किए जाने के बाद, अनुबंध का पता प्राप्त करने के लिए [eth_getTransactionReceipt](#eth-gettransactionreceipt) का उपयोग करें।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

हस्ताक्षरित लेनदेन के लिए नया संदेश कॉल लेनदेन या अनुबंध निर्माण बनाता है।

**पैरामीटर**

1. `DATA`, हस्ताक्षरित लेनदेन डेटा।

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**रिटर्न**

`DATA`, 32 बाइट्स - लेनदेन हैश, या शून्य हैश यदि लेनदेन अभी तक उपलब्ध नहीं है।

जब आपने एक अनुबंध बनाया हो, तो लेनदेन को एक ब्लॉक में प्रस्तावित किए जाने के बाद, अनुबंध पता प्राप्त करने के लिए [eth_getTransactionReceipt](#eth-gettransactionreceipt) का उपयोग करें।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

ब्लॉकचेन पर लेन-देन बनाए बिना तुरंत एक नया संदेश कॉल निष्पादित करता है। अक्सर केवल-पढ़ने योग्य स्मार्ट अनुबंध फ़ंक्शंस को निष्पादित करने के लिए उपयोग किया जाता है, उदाहरण के लिए ERC-20 अनुबंध के लिए `balanceOf`।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `Object` - लेन-देन कॉल ऑब्जेक्ट

- `from`: `DATA`, 20 बाइट्स - (वैकल्पिक) वह पता जहां से लेन-देन भेजा जाता है।
- `to`: `DATA`, 20 बाइट्स - वह पता जिस पर लेन-देन निर्देशित है।
- `gas`: `QUANTITY` - (वैकल्पिक) लेन-देन निष्पादन के लिए प्रदान की गई गैस का पूर्णांक। eth_call शून्य गैस की खपत करता है, लेकिन कुछ निष्पादनों द्वारा इस पैरामीटर की आवश्यकता हो सकती है।
- `gasPrice`: `QUANTITY` - (वैकल्पिक) प्रत्येक भुगतान की गई गैस के लिए उपयोग किए जाने वाले gasPrice का पूर्णांक
- `value`: `QUANTITY` - (वैकल्पिक) इस लेन-देन के साथ भेजे गए मूल्य का पूर्णांक
- `input`: `DATA` - (वैकल्पिक) विधि हस्ताक्षर और एन्कोड किए गए पैरामीटर का हैश। विवरण के लिए [Solidity दस्तावेज़ में इथेरियम अनुबंध ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) देखें।

2. `QUANTITY|TAG` - पूर्णांक ब्लॉक संख्या, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

**रिटर्न**

`DATA` - निष्पादित अनुबंध का वापसी मूल्य।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

यह इस बात का अनुमान उत्पन्न करता है और लौटाता है कि लेन-देन को पूरा करने के लिए कितनी गैस आवश्यक है। लेन-देन को ब्लॉकचेन में नहीं जोड़ा जाएगा। ध्यान दें कि EVM मैकेनिक्स और नोड के प्रदर्शन सहित विभिन्न कारणों से, यह अनुमान लेन-देन द्वारा वास्तव में उपयोग की गई गैस की मात्रा से काफी अधिक हो सकता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

[eth_call](#eth-call) पैरामीटर देखें, सिवाय इसके कि सभी प्रॉपर्टीज़ वैकल्पिक हैं। यदि कोई गैस सीमा निर्दिष्ट नहीं है, तो geth पेंडिंग ब्लॉक से ब्लॉक गैस सीमा का उपयोग ऊपरी सीमा के रूप में करता है। परिणामस्वरूप, जब गैस की मात्रा पेंडिंग ब्लॉक गैस सीमा से अधिक होती है, तो लौटाया गया अनुमान कॉल/लेन-देन को निष्पादित करने के लिए पर्याप्त नहीं हो सकता है।

**रिटर्न**

`QUANTITY` - उपयोग की गई गैस की मात्रा।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

हैश द्वारा किसी ब्लॉक के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 32 बाइट्स - किसी ब्लॉक का हैश।
2. `Boolean` - यदि `true` है तो यह पूर्ण लेनदेन ऑब्जेक्ट देता है, यदि `false` है तो केवल लेनदेन के हैश देता है।

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**रिटर्न**

`Object` - एक ब्लॉक ऑब्जेक्ट, या जब कोई ब्लॉक नहीं मिलता है तो `null`:

- `number`: `QUANTITY` - ब्लॉक संख्या। जब यह पेंडिंग ब्लॉक हो तो `null`।
- `hash`: `DATA`, 32 बाइट्स - ब्लॉक का हैश। जब यह पेंडिंग ब्लॉक हो तो `null`।
- `parentHash`: `DATA`, 32 बाइट्स - पैरेंट ब्लॉक का हैश।
- `nonce`: `DATA`, 8 बाइट्स - जनरेट किए गए प्रूफ-ऑफ-वर्क (PoW) का हैश। जब यह पेंडिंग ब्लॉक हो तो `null`, प्रूफ-ऑफ़-स्टेक (PoS) ब्लॉक के लिए `0x0` (द मर्ज के बाद से)
- `sha3Uncles`: `DATA`, 32 बाइट्स - ब्लॉक में अंकल डेटा का SHA3।
- `logsBloom`: `DATA`, 256 बाइट्स - ब्लॉक के लॉग के लिए ब्लूम फ़िल्टर। जब यह पेंडिंग ब्लॉक हो तो `null`।
- `transactionsRoot`: `DATA`, 32 बाइट्स - ब्लॉक के लेनदेन ट्राई का रूट।
- `stateRoot`: `DATA`, 32 बाइट्स - ब्लॉक के अंतिम स्टेट ट्राई का रूट।
- `receiptsRoot`: `DATA`, 32 बाइट्स - ब्लॉक के रसीद ट्राई का रूट।
- `miner`: `DATA`, 20 बाइट्स - उस लाभार्थी का पता जिसे ब्लॉक इनाम दिए गए थे।
- `difficulty`: `QUANTITY` - इस ब्लॉक के लिए कठिनाई का पूर्णांक।
- `totalDifficulty`: `QUANTITY` - इस ब्लॉक तक चेन की कुल कठिनाई का पूर्णांक।
- `extraData`: `DATA` - इस ब्लॉक का "अतिरिक्त डेटा" फ़ील्ड।
- `size`: `QUANTITY` - बाइट्स में इस ब्लॉक के आकार का पूर्णांक।
- `gasLimit`: `QUANTITY` - इस ब्लॉक में अनुमत अधिकतम गैस।
- `gasUsed`: `QUANTITY` - इस ब्लॉक में सभी लेनदेन द्वारा उपयोग की गई कुल गैस।
- `timestamp`: `QUANTITY` - ब्लॉक के संकलित होने का यूनिक्स टाइमस्टैम्प।
- `transactions`: `Array` - अंतिम दिए गए पैरामीटर के आधार पर लेनदेन ऑब्जेक्ट्स का ऐरे, या 32 बाइट्स के लेनदेन हैश।
- `uncles`: `Array` - अंकल हैश का ऐरे।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// परिणाम
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

ब्लॉक संख्या के आधार पर एक ब्लॉक के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `QUANTITY|TAG` - ब्लॉक संख्या का पूर्णांक, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` या `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।
2. `Boolean` - यदि `true` है तो यह पूर्ण लेन-देन ऑब्जेक्ट लौटाता है, यदि `false` है तो केवल लेन-देन के हैश।

```js
params: [
  "0x1b4", // 436
  true,
]
```

**रिटर्न**
[eth_getBlockByHash](#eth-getblockbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

परिणाम के लिए [eth_getBlockByHash](#eth-getblockbyhash) देखें

### eth_getTransactionByHash {#eth-gettransactionbyhash}

लेनदेन हैश द्वारा अनुरोधित लेनदेन के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 32 बाइट्स - एक लेनदेन का हैश

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**रिटर्न**

`Object` - एक लेनदेन ऑब्जेक्ट, या `null` जब कोई लेनदेन नहीं मिलता है:

- `blockHash`: `DATA`, 32 बाइट्स - उस ब्लॉक का हैश जिसमें यह लेनदेन था। जब यह लंबित हो तो `null`।
- `blockNumber`: `QUANTITY` - ब्लॉक संख्या जिसमें यह लेनदेन था। जब यह लंबित हो तो `null`।
- `from`: `DATA`, 20 बाइट्स - प्रेषक का पता।
- `gas`: `QUANTITY` - प्रेषक द्वारा प्रदान की गई गैस।
- `gasPrice`: `QUANTITY` - प्रेषक द्वारा Wei में प्रदान किया गया गैस मूल्य।
- `hash`: `DATA`, 32 बाइट्स - लेनदेन का हैश।
- `input`: `DATA` - लेनदेन के साथ भेजा गया डेटा।
- `nonce`: `QUANTITY` - इस लेनदेन से पहले प्रेषक द्वारा किए गए लेनदेन की संख्या।
- `to`: `DATA`, 20 बाइट्स - प्राप्तकर्ता का पता। जब यह अनुबंध निर्माण लेनदेन हो तो `null`।
- `transactionIndex`: `QUANTITY` - ब्लॉक में लेनदेन सूचकांक स्थिति का पूर्णांक। जब यह लंबित हो तो `null`।
- `value`: `QUANTITY` - Wei में स्थानांतरित मूल्य।
- `v`: `QUANTITY` - ECDSA रिकवरी आईडी
- `r`: `QUANTITY` - ECDSA हस्ताक्षर r
- `s`: `QUANTITY` - ECDSA हस्ताक्षर s

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// परिणाम
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

ब्लॉक हैश और लेन-देन सूचकांक स्थिति के आधार पर किसी लेन-देन के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 32 बाइट्स - किसी ब्लॉक का हैश।
2. `QUANTITY` - लेन-देन सूचकांक स्थिति का पूर्णांक।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न**
[eth_getTransactionByHash](#eth-gettransactionbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

परिणाम के लिए [eth_getTransactionByHash](#eth-gettransactionbyhash) देखें

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

ब्लॉक नंबर और लेन-देन सूचकांक स्थिति के आधार पर किसी लेन-देन के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `QUANTITY|TAG` - एक ब्लॉक नंबर, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` या `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।
2. `QUANTITY` - लेन-देन सूचकांक स्थिति।

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**रिटर्न**
[eth_getTransactionByHash](#eth-gettransactionbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

परिणाम के लिए [eth_getTransactionByHash](#eth-gettransactionbyhash) देखें

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

लेनदेन हैश द्वारा किसी लेनदेन की रसीद लौटाता है।

**नोट** लंबित लेनदेनों के लिए रसीद उपलब्ध नहीं है।

**पैरामीटर**

1. `DATA`, 32 बाइट्स - किसी लेनदेन का हैश

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**रिटर्न**
`Object` - एक लेनदेन रसीद ऑब्जेक्ट, या `null` जब कोई रसीद नहीं मिलती है:

- `transactionHash `: `DATA`, 32 बाइट्स - लेनदेन का हैश।
- `transactionIndex`: `QUANTITY` - ब्लॉक में लेनदेन की सूचकांक स्थिति का पूर्णांक।
- `blockHash`: `DATA`, 32 बाइट्स - उस ब्लॉक का हैश जिसमें यह लेनदेन था।
- `blockNumber`: `QUANTITY` - ब्लॉक संख्या जिसमें यह लेनदेन था।
- `from`: `DATA`, 20 बाइट्स - प्रेषक का पता।
- `to`: `DATA`, 20 बाइट्स - प्राप्तकर्ता का पता। जब यह अनुबंध निर्माण लेनदेन हो तो null।
- `cumulativeGasUsed` : `QUANTITY ` - ब्लॉक में इस लेनदेन के निष्पादित होने पर उपयोग की गई गैस की कुल मात्रा।
- `effectiveGasPrice` : `QUANTITY` - प्रति यूनिट गैस के लिए भुगतान किए गए आधार शुल्क और टिप का योग।
- `gasUsed `: `QUANTITY ` - केवल इस विशिष्ट लेनदेन द्वारा उपयोग की गई गैस की मात्रा।
- `contractAddress `: `DATA`, 20 बाइट्स - बनाया गया अनुबंध पता, यदि लेनदेन एक अनुबंध निर्माण था, अन्यथा `null`।
- `logs`: `Array` - लॉग ऑब्जेक्ट्स का ऐरे, जो इस लेनदेन ने उत्पन्न किया।
- `logsBloom`: `DATA`, 256 बाइट्स - लाइट क्लाइंट्स के लिए संबंधित लॉग को जल्दी से प्राप्त करने के लिए ब्लूम फ़िल्टर।
- `type`: `QUANTITY` - लेनदेन प्रकार का पूर्णांक, लिगेसी (legacy) लेनदेनों के लिए `0x0`, एक्सेस सूची प्रकारों के लिए `0x1`, डायनामिक शुल्क के लिए `0x2`।

यह _इनमें से कोई एक_ भी लौटाता है:

- `root` : `DATA` लेनदेन के बाद की स्थिति रूट के 32 बाइट्स (बाइज़ेंटियम से पहले)
- `status`: `QUANTITY` या तो `1` (सफलता) या `0` (विफलता)

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// परिणाम
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // यदि यह बनाया गया था तो पते की स्ट्रिंग
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs आदि द्वारा लौटाए गए लॉग
    }],
    "logsBloom": "0x00...0", // 256 बाइट ब्लूम फ़िल्टर
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

हैश और अंकल सूचकांक स्थिति के आधार पर किसी ब्लॉक के अंकल के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `DATA`, 32 बाइट्स - किसी ब्लॉक का हैश।
2. `QUANTITY` - अंकल की सूचकांक स्थिति।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न**
[eth_getBlockByHash](#eth-getblockbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

परिणाम के लिए [eth_getBlockByHash](#eth-getblockbyhash) देखें

**नोट**: एक अंकल में व्यक्तिगत लेन-देन शामिल नहीं होते हैं।

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

संख्या और अंकल सूचकांक स्थिति के आधार पर किसी ब्लॉक के अंकल के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `QUANTITY|TAG` - एक ब्लॉक संख्या, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।
2. `QUANTITY` - अंकल की सूचकांक स्थिति।

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**रिटर्न**
[eth_getBlockByHash](#eth-getblockbyhash) देखें

**नोट**: एक अंकल में व्यक्तिगत लेन-देन शामिल नहीं होते हैं।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

परिणाम के लिए [eth_getBlockByHash](#eth-getblockbyhash) देखें

### eth_newFilter {#eth-newfilter}

फ़िल्टर विकल्पों के आधार पर, स्थिति (लॉग) बदलने पर सूचित करने के लिए एक फ़िल्टर ऑब्जेक्ट बनाता है।
यह जांचने के लिए कि क्या स्थिति बदल गई है, [eth_getFilterChanges](#eth-getfilterchanges) को कॉल करें।

**विषय फ़िल्टर निर्दिष्ट करने पर एक नोट:**
विषय क्रम पर निर्भर होते हैं। [A, B] विषयों वाले लॉग के साथ एक लेन-देन निम्नलिखित विषय फ़िल्टर द्वारा मेल खाएगा:

- `[]` "कुछ भी"
- `[A]` "पहले स्थान पर A (और उसके बाद कुछ भी)"
- `[null, B]` "पहले स्थान पर कुछ भी और दूसरे स्थान पर B (और उसके बाद कुछ भी)"
- `[A, B]` "पहले स्थान पर A और दूसरे स्थान पर B (और उसके बाद कुछ भी)"
- `[[A, B], [A, B]]` "पहले स्थान पर (A या B) और दूसरे स्थान पर (A या B) (और उसके बाद कुछ भी)"
- **पैरामीटर**

1. `Object` - फ़िल्टर विकल्प:

- `fromBlock`: `QUANTITY|TAG` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक संख्या, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम रूप दिए गए ब्लॉक के लिए `"finalized"`, या उन लेन-देन के लिए `"pending"`, `"earliest"` जो अभी तक किसी ब्लॉक में नहीं हैं।
- `toBlock`: `QUANTITY|TAG` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक संख्या, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम रूप दिए गए ब्लॉक के लिए `"finalized"`, या उन लेन-देन के लिए `"pending"`, `"earliest"` जो अभी तक किसी ब्लॉक में नहीं हैं।
- `address`: `DATA|Array`, 20 बाइट्स - (वैकल्पिक) अनुबंध पता या उन पतों की सूची जहां से लॉग उत्पन्न होने चाहिए।
- `topics`: `Array of DATA`, - (वैकल्पिक) 32 बाइट्स `DATA` विषयों का ऐरे। विषय क्रम पर निर्भर होते हैं। प्रत्येक विषय "या" (or) विकल्पों के साथ DATA का एक ऐरे भी हो सकता है।

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

**रिटर्न**
`QUANTITY` - एक फ़िल्टर आईडी।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

नोड में एक फ़िल्टर बनाता है, ताकि नया ब्लॉक आने पर सूचित किया जा सके।
यह जांचने के लिए कि क्या स्थिति बदल गई है, [eth_getFilterChanges](#eth-getfilterchanges) को कॉल करें।

**पैरामीटर**
कोई नहीं

**रिटर्न**
`QUANTITY` - एक फ़िल्टर आईडी।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// परिणाम
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

नोड में एक फ़िल्टर बनाता है, ताकि नए लंबित लेन-देन आने पर सूचित किया जा सके।
यह जांचने के लिए कि क्या स्थिति बदल गई है, [eth_getFilterChanges](#eth-getfilterchanges) को कॉल करें।

**पैरामीटर**
कोई नहीं

**रिटर्न**
`QUANTITY` - एक फ़िल्टर आईडी।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// परिणाम
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

दिए गए आईडी वाले फ़िल्टर को अनइंस्टॉल करता है। जब वॉच की आवश्यकता न हो, तो इसे हमेशा कॉल किया जाना चाहिए।
इसके अतिरिक्त, जब एक निश्चित समय तक [eth_getFilterChanges](#eth-getfilterchanges) के साथ फ़िल्टर का अनुरोध नहीं किया जाता है, तो वे टाइमआउट हो जाते हैं।

**पैरामीटर**

1. `QUANTITY` - फ़िल्टर आईडी।

```js
params: [
  "0xb", // 11
]
```

**रिटर्न**
`Boolean` - `true` यदि फ़िल्टर सफलतापूर्वक अनइंस्टॉल हो गया था, अन्यथा `false`।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// परिणाम
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

एक फ़िल्टर के लिए पोलिंग विधि, जो पिछले पोल के बाद से हुए लॉग का एक ऐरे लौटाती है।

**पैरामीटर**

1. `QUANTITY` - फ़िल्टर आईडी।

```js
params: [
  "0x16", // 22
]
```

**रिटर्न**
`Array` - लॉग ऑब्जेक्ट्स का ऐरे, या यदि पिछले पोल के बाद से कुछ भी नहीं बदला है तो एक खाली ऐरे।

- `eth_newBlockFilter` के साथ बनाए गए फ़िल्टर के लिए रिटर्न ब्लॉक हैश (`DATA`, 32 बाइट्स) होते हैं, उदाहरण के लिए, `["0x3454645634534..."]`।
- `eth_newPendingTransactionFilter ` के साथ बनाए गए फ़िल्टर के लिए रिटर्न लेन-देन हैश (`DATA`, 32 बाइट्स) होते हैं, उदाहरण के लिए, `["0x6345343454645..."]`।
- `eth_newFilter` के साथ बनाए गए फ़िल्टर के लिए लॉग निम्नलिखित पैरामीटर वाले ऑब्जेक्ट होते हैं:
  - `removed`: `TAG` - `true` जब चेन पुनर्गठन के कारण लॉग हटा दिया गया था। `false` यदि यह एक वैध लॉग है।
  - `logIndex`: `QUANTITY` - ब्लॉक में लॉग सूचकांक स्थिति का पूर्णांक। `null` जब यह लंबित लॉग हो।
  - `transactionIndex`: `QUANTITY` - उस लेन-देन सूचकांक स्थिति का पूर्णांक जिससे लॉग बनाया गया था। `null` जब यह लंबित लॉग हो।
  - `transactionHash`: `DATA`, 32 बाइट्स - उस लेन-देन का हैश जिससे यह लॉग बनाया गया था। `null` जब यह लंबित लॉग हो।
  - `blockHash`: `DATA`, 32 बाइट्स - उस ब्लॉक का हैश जिसमें यह लॉग था। `null` जब यह लंबित हो। `null` जब यह लंबित लॉग हो।
  - `blockNumber`: `QUANTITY` - उस ब्लॉक की संख्या जिसमें यह लॉग था। `null` जब यह लंबित हो। `null` जब यह लंबित लॉग हो।
  - `address`: `DATA`, 20 बाइट्स - वह पता जहाँ से यह लॉग उत्पन्न हुआ था।
  - `data`: `DATA` - परिवर्तनीय-लंबाई वाला गैर-अनुक्रमित लॉग डेटा। (_solidity_ में: शून्य या अधिक 32 बाइट्स गैर-अनुक्रमित लॉग तर्क।)
  - `topics`: `Array of DATA` - अनुक्रमित लॉग तर्कों के 0 से 4 32 बाइट्स `DATA` का ऐरे। (_solidity_ में: पहला विषय घटना के हस्ताक्षर का _हैश_ है (उदाहरण के लिए, `Deposit(address,bytes32,uint256)`), सिवाय इसके कि आपने घटना को `anonymous` विनिर्देशक के साथ घोषित किया हो।)

- **उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// परिणाम
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

दिए गए id वाले फ़िल्टर से मेल खाने वाले सभी लॉग का एक ऐरे लौटाता है।

**पैरामीटर**

1. `QUANTITY` - फ़िल्टर id।

```js
params: [
  "0x16", // 22
]
```

**रिटर्न**
[eth_getFilterChanges](#eth-getfilterchanges) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

परिणाम के लिए [eth_getFilterChanges](#eth-getfilterchanges) देखें

### eth_getLogs {#eth-getlogs}

दिए गए फ़िल्टर ऑब्जेक्ट से मेल खाने वाले सभी लॉग का एक ऐरे लौटाता है।

**पैरामीटर**

1. `Object` - फ़िल्टर विकल्प:

- `fromBlock`: `QUANTITY|TAG` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक संख्या, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम रूप दिए गए ब्लॉक के लिए `"finalized"`, या उन लेन-देन के लिए `"pending"`, `"earliest"` जो अभी तक किसी ब्लॉक में नहीं हैं।
- `toBlock`: `QUANTITY|TAG` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक संख्या, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम रूप दिए गए ब्लॉक के लिए `"finalized"`, या उन लेन-देन के लिए `"pending"`, `"earliest"` जो अभी तक किसी ब्लॉक में नहीं हैं।
- `address`: `DATA|Array`, 20 बाइट्स - (वैकल्पिक) अनुबंध पता या उन पतों की सूची जहां से लॉग उत्पन्न होने चाहिए।
- `topics`: `Array of DATA`, - (वैकल्पिक) 32 बाइट्स `DATA` टॉपिक्स का ऐरे। टॉपिक्स क्रम-निर्भर होते हैं। प्रत्येक टॉपिक "or" विकल्पों के साथ डेटा (DATA) का एक ऐरे भी हो सकता है।
- `blockHash`: `DATA`, 32 बाइट्स - (वैकल्पिक, **भविष्य**) EIP-234 के जुड़ने के साथ, `blockHash` एक नया फ़िल्टर विकल्प होगा जो लौटाए गए लॉग को 32-बाइट हैश `blockHash` वाले एकल ब्लॉक तक सीमित करता है। `blockHash` का उपयोग करना `fromBlock` = `toBlock` = हैश `blockHash` वाले ब्लॉक संख्या के समतुल्य है। यदि फ़िल्टर मानदंडों में `blockHash` मौजूद है, तो न तो `fromBlock` और न ही `toBlock` की अनुमति है।

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**रिटर्न**
[eth_getFilterChanges](#eth-getfilterchanges) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

परिणाम के लिए [eth_getFilterChanges](#eth-getfilterchanges) देखें

## उपयोग का उदाहरण {#usage-example}

### जेसन-आरपीसी (JSON-RPC) का उपयोग करके अनुबंध तैनात करना {#deploying-contract}

इस अनुभाग में केवल RPC इंटरफ़ेस का उपयोग करके अनुबंध तैनात करने का प्रदर्शन शामिल है। अनुबंधों को तैनात करने के वैकल्पिक तरीके भी हैं जहाँ इस जटिलता को दूर कर दिया जाता है—उदाहरण के लिए, RPC इंटरफ़ेस के ऊपर बनी लाइब्रेरी जैसे [Web3.js](https://web3js.readthedocs.io/) और [Web3.py](https://github.com/ethereum/web3.py) का उपयोग करना। ये एब्स्ट्रैक्शन आमतौर पर समझने में आसान होते हैं और इनमें त्रुटि की संभावना कम होती है, लेकिन फिर भी यह समझना मददगार होता है कि आंतरिक रूप से यह कैसे काम करता है।

निम्नलिखित `Multiply7` नामक एक सीधा स्मार्ट अनुबंध है जिसे जेसन-आरपीसी इंटरफ़ेस का उपयोग करके इथेरियम नोड पर तैनात किया जाएगा। यह ट्यूटोरियल मानकर चलता है कि पाठक पहले से ही गो इथेरियम (geth) नोड चला रहा है। नोड्स और क्लाइंट्स के बारे में अधिक जानकारी [यहाँ](/developers/docs/nodes-and-clients/run-a-node) उपलब्ध है। गैर-Geth क्लाइंट्स के लिए HTTP जेसन-आरपीसी कैसे शुरू करें, यह देखने के लिए कृपया व्यक्तिगत [क्लाइंट](/developers/docs/nodes-and-clients/) दस्तावेज़ देखें। अधिकांश क्लाइंट डिफ़ॉल्ट रूप से `localhost:8545` पर सेवा देते हैं।

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

सबसे पहले यह सुनिश्चित करना है कि HTTP RPC इंटरफ़ेस सक्षम है। इसका मतलब है कि हम स्टार्टअप पर गो इथेरियम (geth) को `--http` फ़्लैग प्रदान करते हैं। इस उदाहरण में हम एक निजी विकास चेन पर गो इथेरियम (geth) नोड का उपयोग करते हैं। इस दृष्टिकोण का उपयोग करके हमें वास्तविक नेटवर्क पर ईथर की आवश्यकता नहीं है।

```bash
geth --http --dev console 2>>geth.log
```

यह `http://localhost:8545` पर HTTP RPC इंटरफ़ेस शुरू करेगा।

हम [curl](https://curl.se) का उपयोग करके कॉइनबेस पता (खातों के एरे से पहला पता प्राप्त करके) और शेष राशि प्राप्त करके यह सत्यापित कर सकते हैं कि इंटरफ़ेस चल रहा है। कृपया ध्यान दें कि इन उदाहरणों में डेटा आपके स्थानीय नोड पर भिन्न होगा। यदि आप इन कमांड्स को आज़माना चाहते हैं, तो दूसरे curl अनुरोध में अनुरोध पैरामीटर को पहले से प्राप्त परिणाम से बदलें।

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

चूँकि संख्याएँ हेक्स एन्कोडेड हैं, इसलिए शेष राशि Wei में हेक्स स्ट्रिंग के रूप में वापस की जाती है। यदि हम ईथर में शेष राशि को एक संख्या के रूप में प्राप्त करना चाहते हैं तो हम गो इथेरियम (geth) कंसोल से web3 का उपयोग कर सकते हैं।

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

अब जब हमारी निजी विकास चेन पर कुछ ईथर है, तो हम अनुबंध तैनात कर सकते हैं। पहला कदम Multiply7 अनुबंध को बाइटकोड में संकलित करना है जिसे EVM को भेजा जा सके। solc, जो कि Solidity कंपाइलर है, को स्थापित करने के लिए [Solidity दस्तावेज़](https://docs.soliditylang.org/en/latest/installing-solidity.html) का पालन करें। (आप [हमारे उदाहरण के लिए उपयोग किए गए कंपाइलर के संस्करण](https://github.com/ethereum/solidity/releases/tag/v0.4.20) से मेल खाने के लिए एक पुराने `solc` रिलीज़ का उपयोग करना चाह सकते हैं।)

अगला कदम Multiply7 अनुबंध को बाइटकोड में संकलित करना है जिसे EVM को भेजा जा सके।

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

अब जब हमारे पास संकलित कोड है, तो हमें यह निर्धारित करने की आवश्यकता है कि इसे तैनात करने में कितनी गैस लगती है। RPC इंटरफ़ेस में एक `eth_estimateGas` विधि है जो हमें एक अनुमान देगी।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

और अंत में अनुबंध तैनात करें।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

लेन-देन नोड द्वारा स्वीकार किया जाता है और एक लेनदेन हैश वापस किया जाता है। इस हैश का उपयोग लेन-देन को ट्रैक करने के लिए किया जा सकता है। अगला कदम उस पते को निर्धारित करना है जहाँ हमारा अनुबंध तैनात किया गया है। प्रत्येक निष्पादित लेन-देन एक रसीद बनाएगा। इस रसीद में लेन-देन के बारे में विभिन्न जानकारी होती है जैसे कि लेन-देन किस ब्लॉक में शामिल किया गया था और EVM द्वारा कितनी गैस का उपयोग किया गया था। यदि कोई लेन-देन एक अनुबंध बनाता है तो उसमें अनुबंध का पता भी होगा। हम `eth_getTransactionReceipt` RPC विधि से रसीद प्राप्त कर सकते हैं।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

हमारा अनुबंध `0x4d03d617d700cf81935d7f797f4e2ae719648262` पर बनाया गया था। रसीद के बजाय एक शून्य (null) परिणाम का मतलब है कि लेन-देन अभी तक किसी ब्लॉक में शामिल नहीं किया गया है। कुछ क्षण प्रतीक्षा करें और जाँचें कि क्या आपका सर्वसम्मति क्लाइंट चल रहा है और इसे पुनः प्रयास करें।

#### स्मार्ट अनुबंधों के साथ इंटरैक्ट करना {#interacting-with-smart-contract}

इस उदाहरण में हम अनुबंध की `multiply` विधि में `eth_sendTransaction` का उपयोग करके एक लेन-देन भेजेंगे।

`eth_sendTransaction` को कई तर्कों की आवश्यकता होती है, विशेष रूप से `from`, `to` और `data`। `From` हमारे खाते का सार्वजनिक पता है, और `to` अनुबंध का पता है। `data` तर्क में एक पेलोड होता है जो यह परिभाषित करता है कि किस विधि को कॉल किया जाना चाहिए और किन तर्कों के साथ। यहीं पर [ABI (एप्लिकेशन बाइनरी इंटरफ़ेस)](https://docs.soliditylang.org/en/latest/abi-spec.html) काम आता है। ABI एक JSON फ़ाइल है जो यह परिभाषित करती है कि EVM के लिए डेटा को कैसे परिभाषित और एन्कोड किया जाए।

पेलोड के बाइट्स यह परिभाषित करते हैं कि अनुबंध में किस विधि को कॉल किया गया है। यह फ़ंक्शन नाम और उसके तर्क प्रकारों पर केकाक (Keccak) हैश से पहले 4 बाइट्स हैं, जो हेक्स एन्कोडेड हैं। मल्टीप्लाई (multiply) फ़ंक्शन एक uint स्वीकार करता है जो uint256 का उपनाम (alias) है। इससे हमें यह मिलता है:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

अगला कदम तर्कों को एन्कोड करना है। केवल एक uint256 है, मान लीजिए, मान 6। ABI में एक अनुभाग है जो निर्दिष्ट करता है कि uint256 प्रकारों को कैसे एन्कोड किया जाए।

`int<M>: enc(X)` X का बिग-एंडियन टूज़ कॉम्प्लिमेंट (two's complement) एन्कोडिंग है, जिसे नकारात्मक X के लिए उच्च-क्रम (बाएँ) तरफ 0xff के साथ और सकारात्मक X के लिए शून्य > बाइट्स के साथ पैड किया गया है ताकि लंबाई 32 बाइट्स का गुणक हो।

यह `0000000000000000000000000000000000000000000000000000000000000006` में एन्कोड होता है।

फ़ंक्शन चयनकर्ता और एन्कोड किए गए तर्क को मिलाकर हमारा डेटा `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` होगा।

इसे अब नोड पर भेजा जा सकता है:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

चूँकि एक लेन-देन भेजा गया था, इसलिए एक लेनदेन हैश वापस किया गया था। रसीद प्राप्त करने पर यह मिलता है:

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

रसीद में एक लॉग होता है। यह लॉग लेन-देन निष्पादन पर EVM द्वारा उत्पन्न किया गया था और रसीद में शामिल किया गया था। `multiply` फ़ंक्शन दिखाता है कि `Print` घटना इनपुट के 7 गुना के साथ उत्पन्न हुई थी। चूँकि `Print` घटना के लिए तर्क एक uint256 था, इसलिए हम इसे ABI नियमों के अनुसार डिकोड कर सकते हैं जो हमें अपेक्षित दशमलव 42 देगा। डेटा के अलावा यह ध्यान देने योग्य है कि विषयों (topics) का उपयोग यह निर्धारित करने के लिए किया जा सकता है कि किस घटना ने लॉग बनाया:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

यह कुछ सबसे सामान्य कार्यों का एक संक्षिप्त परिचय था, जो जेसन-आरपीसी के सीधे उपयोग को प्रदर्शित करता है।

## संबंधित विषय {#related-topics}

- [जेसन-आरपीसी विनिर्देश](https://www.jsonrpc.org/specification)
- [नोड्स और क्लाइंट्स](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [बैकएंड API](/developers/docs/apis/backend/)
- [निष्पादन क्लाइंट](/developers/docs/nodes-and-clients/#execution-clients)
