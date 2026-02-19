---
title: "जेएसओएन-आरपीसी एपीआई"
description: "एथेरियम ग्राहकों के लिए एक स्टेटलेस, लाइट-वेट रिमोट प्रोसीजर कॉल (RPC) प्रोटोकॉल।"
lang: hi
---

एथेरियम ब्लॉकचैन के साथ बातचीत करने के लिए एक सॉफ्टवेयर एप्लिकेशन के लिए - या तो ब्लॉकचेन डेटा पढ़कर या नेटवर्क पर लेनदेन भेजकर - इसे एथेरियम नोड से कनेक्ट करना होगा।

इस उद्देश्य के लिए, हर [एथेरियम क्लाइंट](/developers/docs/nodes-and-clients/#execution-clients) एक [JSON-RPC विनिर्देश](https://github.com/ethereum/execution-apis) लागू करता है, इसलिए विधियों का एक समान सेट है जिस पर एप्लिकेशन विशिष्ट नोड या क्लाइंट कार्यान्वयन की परवाह किए बिना भरोसा कर सकते हैं।

[JSON-RPC](https://www.jsonrpc.org/specification) एक स्टेटलेस, लाइट-वेट रिमोट प्रोसीजर कॉल (RPC) प्रोटोकॉल है। यह कई डेटा संरचनाओं और उनके प्रसंस्करण के आसपास के नियमों को परिभाषित करता है। यह परिवहन अज्ञेयवादी है कि अवधारणाओं का उपयोग एक ही प्रक्रिया के भीतर, सॉकेट पर, HTTP पर, या कई विभिन्न संदेश गुजरने वाले वातावरणों में किया जा सकता है। यह डेटा प्रारूप के रूप में JSON (RFC 4627) का उपयोग करता है।

## क्लाइंट कार्यान्वयन {#client-implementations}

एथेरियम क्लाइंट प्रत्येक JSON-RPC विनिर्देश को लागू करते समय विभिन्न प्रोग्रामिंग भाषाओं का उपयोग कर सकते हैं। विशिष्ट प्रोग्रामिंग भाषाओं से संबंधित अधिक विवरण के लिए व्यक्तिगत [क्लाइंट दस्तावेज़ीकरण](/developers/docs/nodes-and-clients/#execution-clients) देखें। हम नवीनतम एपीआई समर्थन जानकारी के लिए प्रत्येक क्लाइंट के दस्तावेज़ीकरण की जांच करने की सलाह देते हैं।

## सुविधा लाइब्रेरी {#convenience-libraries}

जबकि आप JSON-RPC API के माध्यम से Ethereum ग्राहकों के साथ सीधे बातचीत करना चुन सकते हैं, dapp डेवलपर्स के लिए अक्सर आसान विकल्प होते हैं। JSON-RPC API के शीर्ष पर रैपर प्रदान करने के लिए कई [जावास्क्रिप्ट](/developers/docs/apis/javascript/#available-libraries) और [बैकएंड API](/developers/docs/apis/backend/#available-libraries) लाइब्रेरी मौजूद हैं। इन पुस्तकालयों के साथ, डेवलपर्स JSON-RPC अनुरोधों (हुड के नीचे) को प्रारंभ करने के लिए अपनी पसंद की प्रोग्रामिंग भाषा में सहज, एक-पंक्ति विधियां लिख सकते हैं जो एथेरियम के साथ बातचीत करते हैं।

## सहमति क्लाइंट API {#consensus-clients}

यह पृष्ठ मुख्य रूप से एथेरियम निष्पादन ग्राहकों द्वारा उपयोग किए जाने वाले JSON-RPC API से संबंधित है। हालांकि, आम सहमति क्लाइंट भी उपयोगकर्ताओं को नोड के बारे में जानकारी क्वेरी करने के लिए अनुमति देता है एक RPC एपीआई, अनुरोध बीकन ब्लॉक, बीकन राज्य, और अन्य आम सहमति से संबंधित जानकारी सीधे नोड से है। यह API [बीकन API वेबपेज](https://ethereum.github.io/beacon-APIs/#/) पर प्रलेखित है।

एक आंतरिक एपीआई का उपयोग नोड के भीतर अंतर-ग्राहक संचार के लिए भी किया जाता है - अर्थात, यह सर्वसम्मति क्लाइंट और निष्पादन क्लाइंट को डेटा स्वैप करने में सक्षम बनाता है। इसे 'इंजन API' कहा जाता है और विनिर्देश [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) पर उपलब्ध हैं।

## निष्पादन क्लाइंट विनिर्देश {#spec}

[GitHub पर पूरा JSON-RPC API विनिर्देश पढ़ें](https://github.com/ethereum/execution-apis)। यह API [Execution API वेबपेज](https://ethereum.github.io/execution-apis/) पर प्रलेखित है और इसमें सभी उपलब्ध विधियों को आज़माने के लिए एक इंस्पेक्टर शामिल है।

## कन्वेंशन {#conventions}

### हेक्स मान एन्कोडिंग {#hex-encoding}

JSON पर दो प्रमुख डेटा प्रकार पारित हो जाते हैं: अस्वरूपित बाइट सरणियाँ और मात्राएँ। दोनों को हेक्स एन्कोडिंग के साथ पारित किया जाता है लेकिन स्वरूपण के लिए अलग-अलग आवश्यकताओं के साथ।

#### मात्राएँ {#quantities-encoding}

मात्रा (पूर्णांक, संख्या) को एन्कोड करते समय: हेक्स के रूप में एन्कोड करें, "0x" के साथ उपसर्ग, सबसे कॉम्पैक्ट प्रतिनिधित्व (मामूली अपवाद: शून्य को "0x0" के रूप में दर्शाया जाना चाहिए)।

यहां कुछ उदाहरण दिए गए हैं:

- 0x41 (65 in decimal)
- 0x400 (1024 in decimal)
- गलत: 0x (हमेशा कम से कम एक अंक होना चाहिए - शून्य "0x0" है)
- गलत: 0x0400 (कोई अग्रणी शून्य की अनुमति नहीं है)
- गलत: ff (उपसर्ग 0x होना चाहिए)

### अनफॉर्मेटेड डेटा {#unformatted-data-encoding}

अस्वरूपित डेटा (बाइट सरणियों, खाता पते, हैश, बाइटकोड सरणियों) को एन्कोड करते समय: हेक्स के रूप में एन्कोड करें, "0x" के साथ उपसर्ग, प्रति बाइट दो हेक्स अंक।

यहां कुछ उदाहरण दिए गए हैं:

- 0x41 (size 1, "A")
- 0x004200 (size 3, "0B0")
- 0x (size 0, "")
- गलत: 0xf0f0f (अंकों की सम संख्या होनी चाहिए)
- गलत: 004200 (0x उपसर्ग होना चाहिए)

### ब्लॉक पैरामीटर {#block-parameter}

निम्नलिखित विधियों में एक ब्लॉक पैरामीटर है:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

जब एथेरियम की स्टेट को क्वेरी करने वाले अनुरोध किए जाते हैं, तो प्रदान किया गया ब्लॉक पैरामीटर ब्लॉक की ऊंचाई निर्धारित करता है।

ब्लॉक पैरामीटर के लिए निम्नलिखित विकल्प संभव हैं:

- `HEX स्ट्रिंग` - एक पूर्णांक ब्लॉक संख्या
- `स्ट्रिंग "earliest"` सबसे पुराने/जेनेसिस ब्लॉक के लिए
- `स्ट्रिंग "latest"` - नवीनतम प्रस्तावित ब्लॉक के लिए
- `स्ट्रिंग "safe"` - नवीनतम सेफ हेड ब्लॉक के लिए
- `स्ट्रिंग "finalized"` - नवीनतम अंतिम रूप दिए गए ब्लॉक के लिए
- `स्ट्रिंग "pending"` - लंबित स्टेट/लेन-देन के लिए

## उदाहरण

इस पेज पर हम कमांड लाइन टूल, [curl](https://curl.se) का उपयोग करके अलग-अलग JSON_RPC API एंडपॉइंट का उपयोग करने के तरीके के उदाहरण प्रदान करते हैं। ये व्यक्तिगत एंडपॉइंट उदाहरण नीचे [Curl उदाहरण](#curl-examples) सेक्शन में दिए गए हैं। पेज में आगे, हम Geth नोड, JSON_RPC API और curl का उपयोग करके एक स्मार्ट अनुबंध को संकलित और तैनात करने के लिए एक [एंड-टू-एंड उदाहरण](#usage-example) भी प्रदान करते हैं।

## Curl उदाहरण {#curl-examples}

एथेरियम नोड पर [curl](https://curl.se) अनुरोध करके JSON_RPC API का उपयोग करने के उदाहरण नीचे दिए गए हैं। प्रत्येक उदाहरण
विशिष्ट समापन बिंदु का विवरण, इसके पैरामीटर, वापसी प्रकार और इसका उपयोग कैसे किया जाना चाहिए, इसका एक काम किया गया उदाहरण शामिल है।

कर्ल अनुरोध सामग्री प्रकार से संबंधित त्रुटि संदेश लौटा सकते हैं. ऐसा इसलिए है क्योंकि `--data` विकल्प सामग्री प्रकार को `application/x-www-form-urlencoded` पर सेट करता है। अगर आपका नोड इसके बारे में शिकायत करता है, तो कॉल की शुरुआत में `-H \"Content-Type: application/json\"` रखकर हेडर को मैन्युअल रूप से सेट करें। इन उदाहरणों में URL/IP और पोर्ट संयोजन भी शामिल नहीं है जो curl को दिया जाने वाला अंतिम तर्क होना चाहिए (जैसे, `127.0.0.1:8545`)। इन अतिरिक्त डेटा सहित एक पूर्ण कर्ल अनुरोध निम्नलिखित रूप लेता है:

```shell
curl -H "Content-Type: application/json" -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"web3_clientVersion\",\"params\":[],\"id\":67}' 127.0.0.1:8545
```

## गॉसिप, स्टेट, हिस्ट्री {#gossip-state-history}

कुछ मुख्य JSON-RPC विधियों को एथेरियम नेटवर्क से डेटा की आवश्यकता होती है, और ये तीन मुख्य श्रेणियों में आती हैं: _गॉसिप, स्टेट और हिस्ट्री_। प्रत्येक विधि पर जाने के लिए इन अनुभागों में लिंक्स का उपयोग करें, या विधियों की संपूर्ण सूची का अन्वेषण करने के लिए सामग्री तालिका का उपयोग करें.

### गॉसिप मेथड्स {#gossip-methods}

> ये विधियां श्रृंखला के सिर को ट्रैक करती हैं। इस तरह लेन-देन नेटवर्क के चारों ओर अपना रास्ता बनाते हैं, ब्लॉक में अपना रास्ता खोजते हैं, और ग्राहकों को नए ब्लॉक के बारे में कैसे पता चलता है।

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### स्टेट मेथड्स {#state_methods}

> विधियाँ जो संग्रहीत सभी डेटा की वर्तमान स्थिति की रिपोर्ट करती हैं. "राज्य" रैम के एक बड़े साझा टुकड़े की तरह है, और इसमें खाता शेष, अनुबंध डेटा और गैस अनुमान शामिल हैं।

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### हिस्ट्री मेथड्स {#history_methods}

> प्रत्येक ब्लॉक के ऐतिहासिक अभिलेखों को उत्पत्ति में वापस लाता है। यह एक बड़ी परिशिष्ट-केवल फ़ाइल की तरह है, और इसमें सभी ब्लॉक हेडर, ब्लॉक बॉडी, चाचा ब्लॉक और लेनदेन रसीदें शामिल हैं।

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

## JSON-RPC API खेल का मैदान

आप API विधियों को खोजने और आज़माने के लिए [प्लेग्राउंड टूल](https://ethereum-json-rpc.com) का उपयोग कर सकते हैं। यह आपको यह भी दिखाता है कि विभिन्न नोड प्रदाताओं द्वारा कौन से तरीके और नेटवर्क समर्थित हैं।

## JSON-RPC API मेथड्स {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

वर्तमान क्लाइंट संस्करण देता है.

**पैरामीटर**

कोई नहीं

**रिटर्न**

`स्ट्रिंग` - वर्तमान क्लाइंट संस्करण

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"web3_clientVersion\",\"params\":[],\"id\":67}'
// परिणाम
{
  \"id\":67,
  \"jsonrpc\":\"2.0\",
  \"result\": \"Geth/v1.12.1-stable/linux-amd64/go1.19.1\"
}
```

### web3_sha3 {#web3_sha3}

दिए गए डेटा का Keccak-256 (_मानकीकृत SHA3-256 नहीं_) लौटाता है।

**पैरामीटर**

1. `डेटा` - SHA3 हैश में बदलने के लिए डेटा

```js
params: ["0x68656c6c6f20776f726c64"]
```

**रिटर्न**

`डेटा` - दिए गए स्ट्रिंग का SHA3 परिणाम।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"web3_sha3\",\"params\":[\"0x68656c6c6f20776f726c64\"],\"id\":64}'
// परिणाम
{
  \"id\":64,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad\"
}
```

### net_version {#net_version}

वर्तमान नेटवर्क id लौटाता है.

**पैरामीटर**

कोई नहीं

**रिटर्न**

`स्ट्रिंग` - वर्तमान नेटवर्क आईडी।

वर्तमान नेटवर्क आईडी की पूरी सूची [chainlist.org](https://chainlist.org) पर उपलब्ध है। कुछ सामान्य हैं:

- `1`: एथेरियम मेननेट
- `11155111`: Sepolia टेस्टनेट
- `560048` : Hoodi टेस्टनेट

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"net_version\",\"params\":[],\"id\":67}'
// परिणाम
{
  \"id\":67,
  \"jsonrpc\": \"2.0\",
  \"result\": \"3\"
}
```

### net_listening {#net_listening}

यदि क्लाइंट नेटवर्क कनेक्शन के लिए सक्रिय रूप से सुन रहा है तो `true` लौटाता है।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`बूलियन` - सुनते समय `true`, अन्यथा `false`।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"net_listening\",\"params\":[],\"id\":67}'
// परिणाम
{
  \"id\":67,
  \"jsonrpc\":\"2.0\",
  \"result\":true
}
```

### net_peerCount {#net_peercount}

वर्तमान में क्लाइंट से जुड़े साथियों की संख्या देता है।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`मात्रा` - जुड़े हुए पीयर की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"net_peerCount\",\"params\":[],\"id\":74}'
// परिणाम
{
  \"id\":74,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x2\" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

वर्तमान Ethereum प्रोटोकॉल संस्करण लौटाता है। ध्यान दें कि यह तरीका [Geth में उपलब्ध नहीं है](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`स्ट्रिंग` - वर्तमान एथेरियम प्रोटोकॉल संस्करण

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_protocolVersion\",\"params\":[],\"id\":67}'
// परिणाम
{
  \"id\":67,
  \"jsonrpc\": \"2.0\",
  \"result\": \"54\"
}
```

### eth_syncing {#eth_syncing}

सिंक स्थिति या `false` के बारे में डेटा के साथ एक ऑब्जेक्ट लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

सटीक वापसी डेटा क्लाइंट कार्यान्वयन के बीच भिन्न होता है। जब नोड सिंक नहीं हो रहा हो तो सभी क्लाइंट `False` लौटाते हैं, और सभी क्लाइंट निम्नलिखित फ़ील्ड लौटाते हैं।

`ऑब्जेक्ट|बूलियन`, सिंक स्थिति डेटा या `FALSE` के साथ एक ऑब्जेक्ट, जब सिंक नहीं हो रहा हो:

- `startingBlock`: `मात्रा` - वह ब्लॉक जिस पर आयात शुरू हुआ (केवल सिंक के अपने हेड तक पहुंचने के बाद ही रीसेट किया जाएगा)
- `currentBlock`: `मात्रा` - वर्तमान ब्लॉक, eth_blockNumber के समान
- `highestBlock`: `मात्रा` - अनुमानित उच्चतम ब्लॉक

हालाँकि, व्यक्तिगत क्लाइंट अतिरिक्त डेटा भी प्रदान कर सकते हैं। उदाहरण के लिए, गेथ निम्नलिखित लौटाता है:

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

जबकि बेसु लौटता है:

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

अधिक विवरण के लिए अपने विशिष्ट ग्राहक के लिए दस्तावेज़ीकरण देखें।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_syncing\",\"params\":[],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// या जब सिंक नहीं हो रहा हो
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": false
}
```

### eth_coinbase {#eth_coinbase}

क्लाइंट कॉइनबेस पता देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

> **नोट:** इस पद्धति को **v1.14.0** से हटा दिया गया है और अब यह समर्थित नहीं है। इस पद्धति का उपयोग करने का प्रयास करने पर "विधि समर्थित नहीं" त्रुटि होगी।

**पैरामीटर**

कोई नहीं

**रिटर्न**

`डेटा`, 20 बाइट्स - वर्तमान कॉइनबेस पता।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_coinbase\",\"params\":[],\"id\":64}'
// परिणाम
{
  \"id\":64,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x407d73d8a49eeb85d32cf465507dd71d507100c1\"
}
```

### eth_chainId {#eth_chainId}

रीप्ले-सुरक्षित लेनदेन पर हस्ताक्षर करने के लिए उपयोग की गई चेन ID लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`chainId`, एक स्ट्रिंग के रूप में हेक्साडेसिमल मान जो वर्तमान चेन आईडी के पूर्णांक का प्रतिनिधित्व करता है।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_chainId\",\"params\":[],\"id\":67}'
// परिणाम
{
  \"id\":67,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x1\"
}
```

### eth_mining {#eth_mining}

यदि क्लाइंट सक्रिय रूप से नए ब्लॉकों का खनन कर रहा है तो `true` लौटाता है। यह केवल प्रूफ-ऑफ-वर्क नेटवर्क के लिए `true` लौटा सकता है और [द मर्ज](/roadmap/merge/) के बाद से कुछ क्लाइंट में उपलब्ध नहीं हो सकता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`बूलियन` - यदि क्लाइंट खनन कर रहा है तो `true` लौटाता है, अन्यथा `false`।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_mining\",\"params\":[],\"id\":71}'
//
{
  \"id\":71,
  \"jsonrpc\": \"2.0\",
  \"result\": true
}
```

### eth_hashrate {#eth_hashrate}

प्रति सेकंड हैश की संख्या देता है जिसके साथ नोड खनन कर रहा है. यह केवल प्रूफ-ऑफ-वर्क नेटवर्क के लिए `true` लौटा सकता है और [द मर्ज](/roadmap/merge/) के बाद से कुछ क्लाइंट में उपलब्ध नहीं हो सकता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`मात्रा` - प्रति सेकंड हैश की संख्या।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_hashrate\",\"params\":[],\"id\":71}'
// परिणाम
{
  \"id\":71,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x38a\"
}
```

### eth_gasPrice {#eth_gasprice}

वेई में प्रति गैस वर्तमान मूल्य का अनुमान देता है। उदाहरण के लिए, Besu क्लाइंट पिछले 100 ब्लॉकों की जांच करता है और डिफ़ॉल्ट रूप से औसत गैस इकाई मूल्य लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`मात्रा` - वेई में वर्तमान गैस मूल्य का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_gasPrice\",\"params\":[],\"id\":73}'
// परिणाम
{
  \"id\":73,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x1dfd14000\" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

क्लाइंट के स्वामित्व वाले पतों की एक सूची देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`डेटा की सारणी`, 20 बाइट्स - क्लाइंट के स्वामित्व वाले पते।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_accounts\",\"params\":[],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": [\"0x407d73d8a49eeb85d32cf465507dd71d507100c1\"]
}
```

### eth_blockNumber {#eth_blocknumber}

सबसे हाल के ब्लॉक की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

कोई नहीं

**रिटर्न**

`मात्रा` - क्लाइंट जिस वर्तमान ब्लॉक नंबर पर है, उसका पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_blockNumber\",\"params\":[],\"id\":83}'
// परिणाम
{
  \"id\":83,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x4b7\" // 1207
}
```

### eth_getBalance {#eth_getbalance}

दिए गए पते पर खाते की शेष राशि लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 20 बाइट्स - शेष राशि की जांच के लिए पता।
2. `मात्रा|टैग` - पूर्णांक ब्लॉक नंबर, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"`, या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**रिटर्न**

`मात्रा` - वेई में वर्तमान शेष राशि का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBalance\",\"params\":[\"0x407d73d8a49eeb85d32cf465507dd71d507100c1\", \"latest\"],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x0234c8a3397aab58\" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

किसी दिए गए पते पर संग्रहण स्थिति से मान लौटाता है.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 20 बाइट्स - भंडारण का पता।
2. `मात्रा` - भंडारण में स्थिति का पूर्णांक।
3. `मात्रा|टैग` - पूर्णांक ब्लॉक नंबर, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

**रिटर्न**

`डेटा` - इस भंडारण की स्थिति पर मान।

**उदाहरण**
सही स्थिति की गणना पुनर्प्राप्त करने के लिए भंडारण पर निर्भर करती है। पते `0x391694e7e0b0cce554cb130d723a9d27458f9298` द्वारा `0x295a70b2de5e3953354a6a8344e616ed314d7251` पर तैनात निम्नलिखित अनुबंध पर विचार करें।

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

pos0 का मान पुनर्प्राप्त करना सीधा है:

```js
curl -X POST --data '{\"jsonrpc\":\"2.0\", \"method\": \"eth_getStorageAt\", \"params\": [\"0x295a70b2de5e3953354a6a8344e616ed314d7251\", \"0x0\", \"latest\"], \"id\": 1}' localhost:8545
{\"jsonrpc\":\"2.0\",\"id\":1,\"result\":\"0x00000000000000000000000000000000000000000000000000000000000004d2\"}
```

मानचित्र के एक तत्व को पुनः प्राप्त करना कठिन है। मानचित्र में किसी तत्व की स्थिति की गणना निम्न के साथ की जाती है:

```js
keccak(LeftPad32(कुंजी, 0), LeftPad32(नक्शा स्थिति, 0))
```

इसका मतलब है कि pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] पर स्टोरेज को पुनः प्राप्त करने के लिए हमें स्थिति की गणना करने की आवश्यकता है:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Web3 लाइब्रेरी के साथ आने वाले गेथ कंसोल का उपयोग गणना करने के लिए किया जा सकता है:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

अब भंडारण लाने के लिए:

```js
curl -X POST --data '{\"jsonrpc\":\"2.0\", \"method\": \"eth_getStorageAt\", \"params\": [\"0x295a70b2de5e3953354a6a8344e616ed314d7251\", \"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9\", \"latest\"], \"id\": 1}' localhost:8545
{\"jsonrpc\":\"2.0\",\"id\":1,\"result\":\"0x000000000000000000000000000000000000000000000000000000000000162e\"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

किसी पते से _भेजे गए_ लेन-देन की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 20 बाइट्स - पता।
2. `मात्रा|टैग` - पूर्णांक ब्लॉक नंबर, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // नवीनतम ब्लॉक पर स्टेट
]
```

**रिटर्न**

`मात्रा` - इस पते से भेजे गए लेन-देन की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionCount\",\"params\":[\"0x407d73d8a49eeb85d32cf465507dd71d507100c1\",\"latest\"],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x1\" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

दिए गए ब्लॉक हैश से मेल खाने वाले ब्लॉक से ब्लॉक में लेनदेन की संख्या देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक ब्लॉक का हैश

```js
पैराम्स: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**रिटर्न**

`मात्रा` - इस ब्लॉक में लेन-देन की संख्या का पूर्णांक।

**उदाहरण**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

दिए गए ब्लॉक नंबर से मेल खाने वाले ब्लॉक में लेनदेन की संख्या देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `मात्रा|टैग` - एक ब्लॉक नंबर का पूर्णांक, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` या `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।

```js
params: [
  "0x13738ca", // 20396234
]
```

**रिटर्न**

`मात्रा` - इस ब्लॉक में लेन-देन की संख्या का पूर्णांक।

**उदाहरण**

```js
params: [
  "0x13738ca", // 20396234
]
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Params: [
"0x13738ca", // 20396234]

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक ब्लॉक का हैश

```js
params: [
 "0x13738ca", // 20396234]
```

**रिटर्न**

`मात्रा` - इस ब्लॉक में अंकल की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getUncleCountByBlockHash\",\"params\":[\"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2\"],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x1\" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

दिए गए ब्लॉक नंबर से मेल खाने वाले ब्लॉक से एक ब्लॉक में अंकल की संख्या लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `मात्रा|टैग` - पूर्णांक ब्लॉक नंबर, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: [
  "0xe8", // 232
]
```

**रिटर्न**

`मात्रा` - इस ब्लॉक में अंकल की संख्या का पूर्णांक।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getUncleCountByBlockNumber\",\"params\":[\"0xe8\"],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x0\" // 0
}
```

### eth_getCode {#eth_getcode}

दिए गए पते पर कोड लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 20 बाइट्स - पता
2. `मात्रा|टैग` - पूर्णांक ब्लॉक नंबर, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**रिटर्न**

`डेटा` - दिए गए पते से कोड।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getCode\",\"params\":[\"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2\", \"0x5daf3b\"],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029\"
```

### eth_sign {#eth_sign}

साइन विधि एथेरियम विशिष्ट हस्ताक्षर की गणना करती है: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`।

संदेश में एक उपसर्ग जोड़ने से गणना किए गए हस्ताक्षर को एक एथेरियम विशिष्ट हस्ताक्षर के रूप में पहचानने योग्य बनाता है। यह दुरुपयोग को रोकता है जहां एक दुर्भावनापूर्ण डैप मनमाने डेटा (जैसे, लेन-देन) पर हस्ताक्षर कर सकता है और पीड़ित का प्रतिरूपण करने के लिए हस्ताक्षर का उपयोग कर सकता है।

नोट: हस्ताक्षर करने के लिए पता अनलॉक होना चाहिए।

**पैरामीटर**

1. `डेटा`, 20 बाइट्स - पता
2. `डेटा`, N बाइट्स - हस्ताक्षर करने के लिए संदेश

**रिटर्न**

`डेटा`: हस्ताक्षर

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_sign\",\"params\":[\"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83\", \"0xdeadbeaf\"],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b\"
}
```

### eth_signTransaction {#eth_signtransaction}

एक लेन-देन पर हस्ताक्षर करता है जिसे बाद में [eth_sendRawTransaction](#eth_sendrawtransaction) का उपयोग करके नेटवर्क पर जमा किया जा सकता है।

**पैरामीटर**

1. `ऑब्जेक्ट` - लेन-देन ऑब्जेक्ट

- `प्रकार`:
- `from`: `डेटा`, 20 बाइट्स - वह पता जिससे लेन-देन भेजा जाता है।
- `to`: `डेटा`, 20 बाइट्स - (नया अनुबंध बनाते समय वैकल्पिक) वह पता जिस पर लेन-देन निर्देशित किया जाता है।
- `गैस`: `मात्रा` - (वैकल्पिक, डिफ़ॉल्ट: 90000) लेन-देन निष्पादन के लिए प्रदान की गई गैस का पूर्णांक। यह अप्रयुक्त गैस लौटाएगा।
- `gasPrice`: `मात्रा` - (वैकल्पिक, डिफ़ॉल्ट: निर्धारित किया जाना है) प्रत्येक भुगतान की गई गैस के लिए उपयोग किए जाने वाले गैस मूल्य का पूर्णांक, वेई में।
- `value`: `मात्रा` - (वैकल्पिक) इस लेन-देन के साथ भेजे गए मान का पूर्णांक, वेई में।
- `डेटा`: `डेटा` - किसी अनुबंध का संकलित कोड या लागू की गई विधि हस्ताक्षर का हैश और एन्कोड किए गए पैरामीटर।
- `nonce`: `मात्रा` - (वैकल्पिक) एक नॉन का पूर्णांक। यह आपको अपने स्वयं के लंबित लेन-देन को ओवरराइट करने की अनुमति देता है जो समान नॉन का उपयोग करते हैं।

**रिटर्न**

`डेटा`, निर्दिष्ट खाते द्वारा हस्ताक्षरित RLP-एन्कोडेड लेन-देन ऑब्जेक्ट।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"id\": 1,\"jsonrpc\": \"2.0\",\"method\": \"eth_signTransaction\",\"params\": [{\"data\":\"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675\",\"from\": \"0xb60e8dd61c5d32be8058bb8eb970870f07233155\",\"gas\": \"0x76c0\",\"gasPrice\": \"0x9184e72a000\",\"to\": \"0xd46e8dd67c5d32be8058bb8eb970870f07244567\",\"value\": \"0x9184e72a\"}]}'
// परिणाम
{
    \"id\": 1,
    \"jsonrpc\": \"2.0\",
    \"result\": \"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b\"
}
```

### eth_sendTransaction {#eth_sendtransaction}

यदि डेटा फ़ील्ड में कोड है, तो नया संदेश कॉल लेन-देन या एक अनुबंध निर्माण बनाता है, और `from` में निर्दिष्ट खाते का उपयोग करके इस पर हस्ताक्षर करता है।

**पैरामीटर**

1. `ऑब्जेक्ट` - लेन-देन ऑब्जेक्ट

- `from`: `डेटा`, 20 बाइट्स - वह पता जिससे लेन-देन भेजा जाता है।
- `to`: `डेटा`, 20 बाइट्स - (नया अनुबंध बनाते समय वैकल्पिक) वह पता जिस पर लेन-देन निर्देशित किया जाता है।
- `गैस`: `मात्रा` - (वैकल्पिक, डिफ़ॉल्ट: 90000) लेन-देन निष्पादन के लिए प्रदान की गई गैस का पूर्णांक। यह अप्रयुक्त गैस लौटाएगा।
- `gasPrice`: `मात्रा` - (वैकल्पिक, डिफ़ॉल्ट: निर्धारित किया जाना है) प्रत्येक भुगतान की गई गैस के लिए उपयोग किए जाने वाले गैस मूल्य का पूर्णांक।
- `value`: `मात्रा` - (वैकल्पिक) इस लेन-देन के साथ भेजे गए मान का पूर्णांक।
- `input`: `डेटा` - किसी अनुबंध का संकलित कोड या लागू की गई विधि हस्ताक्षर का हैश और एन्कोड किए गए पैरामीटर।
- `nonce`: `मात्रा` - (वैकल्पिक) एक नॉन का पूर्णांक। यह आपको अपने स्वयं के लंबित लेन-देन को ओवरराइट करने की अनुमति देता है जो समान नॉन का उपयोग करते हैं।

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

`डेटा`, 32 बाइट्स - लेन-देन का हैश, या शून्य हैश यदि लेन-देन अभी तक उपलब्ध नहीं है।

जब आपने एक अनुबंध बनाया है, तो लेन-देन के एक ब्लॉक में प्रस्तावित होने के बाद, अनुबंध का पता प्राप्त करने के लिए [eth_getTransactionReceipt](#eth_gettransactionreceipt) का उपयोग करें।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendTransaction\",\"params\":[{उपर्युक्त देखें}],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331\"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

हस्ताक्षरित लेन-देन के लिए नया संदेश कॉल लेन-देन या एक अनुबंध निर्माण बनाता है।

**पैरामीटर**

1. `डेटा`, हस्ताक्षरित लेन-देन डेटा।

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**रिटर्न**

`डेटा`, 32 बाइट्स - लेन-देन का हैश, या शून्य हैश यदि लेन-देन अभी तक उपलब्ध नहीं है।

जब आपने एक अनुबंध बनाया है, तो लेन-देन के एक ब्लॉक में प्रस्तावित होने के बाद, अनुबंध का पता प्राप्त करने के लिए [eth_getTransactionReceipt](#eth_gettransactionreceipt) का उपयोग करें।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[{उपर्युक्त देखें}],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331\"
}
```

### eth_call {#eth_call}

ब्लॉकचेन पर लेन-देन बनाए बिना तुरंत एक नया संदेश कॉल निष्पादित करता है। अक्सर केवल-पढ़ने योग्य स्मार्ट अनुबंध कार्यों को निष्पादित करने के लिए उपयोग किया जाता है, उदाहरण के लिए ERC-20 अनुबंध के लिए `balanceOf`।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `ऑब्जेक्ट` - लेन-देन कॉल ऑब्जेक्ट

- `from`: `डेटा`, 20 बाइट्स - (वैकल्पिक) वह पता जिससे लेन-देन भेजा जाता है।
- `to`: `डेटा`, 20 बाइट्स - वह पता जिस पर लेन-देन निर्देशित किया जाता है।
- `गैस`: `मात्रा` - (वैकल्पिक) लेन-देन निष्पादन के लिए प्रदान की गई गैस का पूर्णांक। eth_call शून्य गैस की खपत करता है, लेकिन इस पैरामीटर की कुछ निष्पादन के लिए आवश्यकता हो सकती है।
- `gasPrice`: `मात्रा` - (वैकल्पिक) प्रत्येक भुगतान की गई गैस के लिए उपयोग किए जाने वाले गैस मूल्य का पूर्णांक
- `value`: `मात्रा` - (वैकल्पिक) इस लेन-देन के साथ भेजे गए मान का पूर्णांक
- `input`: `डेटा` - (वैकल्पिक) विधि हस्ताक्षर और एन्कोड किए गए मापदंडों का हैश। विवरण के लिए [सॉलिडिटी दस्तावेज़ीकरण में एथेरियम अनुबंध ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) देखें।

2. `मात्रा|टैग` - पूर्णांक ब्लॉक नंबर, या स्ट्रिंग `"latest"`, `"earliest"`, `"pending"`, `"safe"` या `"finalized"`, [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) देखें

**रिटर्न**

`डेटा` - निष्पादित अनुबंध का वापसी मान।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_call\",\"params\":[{उपर्युक्त देखें}],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x\"
}
```

### eth_estimateGas {#eth_estimategas}

लेन-देन को पूरा करने के लिए कितनी गैस आवश्यक है, इसका एक अनुमान उत्पन्न करता है और लौटाता है। लेन-देन को ब्लॉकचेन में नहीं जोड़ा जाएगा। ध्यान दें कि अनुमान EVM यांत्रिकी और नोड प्रदर्शन सहित विभिन्न कारणों से लेन-देन द्वारा वास्तव में उपयोग की गई गैस की मात्रा से काफी अधिक हो सकता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

[eth_call](#eth_call) पैरामीटर देखें, सिवाय इसके कि सभी गुण वैकल्पिक हैं। यदि कोई गैस सीमा निर्दिष्ट नहीं है, तो geth लंबित ब्लॉक से ब्लॉक गैस सीमा को ऊपरी सीमा के रूप में उपयोग करता है। परिणामस्वरूप, लौटाया गया अनुमान कॉल/लेन-देन को निष्पादित करने के लिए पर्याप्त नहीं हो सकता है जब गैस की मात्रा लंबित ब्लॉक गैस सीमा से अधिक हो।

**रिटर्न**

`मात्रा` - उपयोग की गई गैस की मात्रा।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_estimateGas\",\"params\":[{उपर्युक्त देखें}],\"id\":1}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x5208\" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

हैश द्वारा ब्लॉक के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक ब्लॉक का हैश।
2. `बूलियन` - यदि `true` है तो यह पूर्ण लेन-देन ऑब्जेक्ट लौटाता है, यदि `false` है तो केवल लेन-देन के हैश लौटाता है।

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**रिटर्न**

`ऑब्जेक्ट` - एक ब्लॉक ऑब्जेक्ट, या `null` जब कोई ब्लॉक नहीं मिला:

- `number`: `मात्रा` - ब्लॉक नंबर। जब यह लंबित ब्लॉक हो तो `null`।
- `hash`: `डेटा`, 32 बाइट्स - ब्लॉक का हैश। जब यह लंबित ब्लॉक हो तो `null`।
- `parentHash`: `डेटा`, 32 बाइट्स - पैरेंट ब्लॉक का हैश।
- `nonce`: `डेटा`, 8 बाइट्स - उत्पन्न प्रूफ-ऑफ-वर्क का हैश। जब यह लंबित ब्लॉक हो तो `null`, प्रूफ-ऑफ-स्टेक ब्लॉक के लिए `0x0` (द मर्ज के बाद से)
- `sha3Uncles`: `डेटा`, 32 बाइट्स - ब्लॉक में अंकल डेटा का SHA3।
- `logsBloom`: `डेटा`, 256 बाइट्स - ब्लॉक के लॉग के लिए ब्लूम फ़िल्टर। जब यह लंबित ब्लॉक हो तो `null`।
- `transactionsRoot`: `डेटा`, 32 बाइट्स - ब्लॉक के लेन-देन ट्री का रूट।
- `stateRoot`: `डेटा`, 32 बाइट्स - ब्लॉक के अंतिम स्टेट ट्री का रूट।
- `receiptsRoot`: `डेटा`, 32 बाइट्स - ब्लॉक के रसीद ट्री का रूट।
- `miner`: `डेटा`, 20 बाइट्स - उस लाभार्थी का पता जिसे ब्लॉक पुरस्कार दिए गए थे।
- `difficulty`: `मात्रा` - इस ब्लॉक के लिए कठिनाई का पूर्णांक।
- `totalDifficulty`: `मात्रा` - इस ब्लॉक तक चेन की कुल कठिनाई का पूर्णांक।
- `extraData`: `डेटा` - इस ब्लॉक का "अतिरिक्त डेटा" फ़ील्ड।
- `size`: `मात्रा` - बाइट्स में इस ब्लॉक का आकार का पूर्णांक।
- `gasLimit`: `मात्रा` - इस ब्लॉक में अनुमत अधिकतम गैस।
- `gasUsed`: `मात्रा` - इस ब्लॉक में सभी लेन-देन द्वारा उपयोग की गई कुल गैस।
- `timestamp`: `मात्रा` - जब ब्लॉक को एकत्रित किया गया था तब का यूनिक्स टाइमस्टैम्प।
- `transactions`: `सारणी` - अंतिम दिए गए पैरामीटर के आधार पर लेन-देन ऑब्जेक्ट्स की सारणी, या 32 बाइट्स लेन-देन हैश।
- `uncles`: `सारणी` - अंकल हैश की सारणी।

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

### eth_getBlockByNumber {#eth_getblockbynumber}

ब्लॉक नंबर द्वारा ब्लॉक के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `मात्रा|टैग` - एक ब्लॉक नंबर का पूर्णांक, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` या `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।
2. `बूलियन` - यदि `true` है तो यह पूर्ण लेन-देन ऑब्जेक्ट लौटाता है, यदि `false` है तो केवल लेन-देन के हैश लौटाता है।

```js
params: [
  "0x1b4", // 436
  true,
]
```

**रिटर्न**
[eth_getBlockByHash](#eth_getblockbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBlockByNumber\",\"params\":[\"0x1b4\", true],\"id\":1}'
```

परिणाम के लिए [eth_getBlockByHash](#eth_getblockbyhash) देखें

### eth_getTransactionByHash {#eth_gettransactionbyhash}

लेन-देन हैश द्वारा अनुरोधित लेन-देन के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक लेन-देन का हैश

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**रिटर्न**

`ऑब्जेक्ट` - एक लेन-देन ऑब्जेक्ट, या `null` जब कोई लेन-देन नहीं मिला:

- `blockHash`: `डेटा`, 32 बाइट्स - उस ब्लॉक का हैश जहां यह लेन-देन था। लंबित होने पर `null`।
- `blockNumber`: `मात्रा` - ब्लॉक नंबर जहां यह लेन-देन था। लंबित होने पर `null`।
- `from`: `डेटा`, 20 बाइट्स - प्रेषक का पता।
- `गैस`: `मात्रा` - प्रेषक द्वारा प्रदान की गई गैस।
- `gasPrice`: `मात्रा` - प्रेषक द्वारा वेई में प्रदान की गई गैस की कीमत।
- `hash`: `डेटा`, 32 बाइट्स - लेन-देन का हैश।
- `input`: `डेटा` - लेन-देन के साथ भेजा गया डेटा।
- `nonce`: `मात्रा` - प्रेषक द्वारा इससे पहले किए गए लेन-देन की संख्या।
- `to`: `डेटा`, 20 बाइट्स - प्राप्तकर्ता का पता। जब यह एक अनुबंध निर्माण लेन-देन है तो `null`।
- `transactionIndex`: `मात्रा` - ब्लॉक में लेन-देन सूचकांक स्थिति का पूर्णांक। लंबित होने पर `null`।
- `value`: `मात्रा` - वेई में स्थानांतरित मान।
- `v`: `मात्रा` - ECDSA रिकवरी आईडी
- `r`: `मात्रा` - ECDSA हस्ताक्षर r
- `s`: `मात्रा` - ECDSA हस्ताक्षर s

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionByHash\",\"params\":[\"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b\"],\"id\":1}'
// परिणाम
{
  \"jsonrpc\":\"2.0\",
  \"id\":1,
  \"result\":{
    \"blockHash\":\"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2\",
    \"blockNumber\":\"0x5daf3b\", // 6139707
    \"from\":\"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d\",
    \"gas\":\"0xc350\", // 50000
    \"gasPrice\":\"0x4a817c800\", // 20000000000
    \"hash\":\"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b\",
    \"input\":\"0x68656c6c6f21\",
    \"nonce\":\"0x15\", // 21
    \"to\":\"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb\",
    \"transactionIndex\":\"0x41\", // 65
    \"value\":\"0xf3dbb76162000\", // 4290000000000000
    \"v\":\"0x25\", // 37
    \"r\":\"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea\",
    \"s\":\"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c\"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

ब्लॉक हैश और लेन-देन सूचकांक स्थिति द्वारा लेन-देन के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक ब्लॉक का हैश।
2. `मात्रा` - लेन-देन सूचकांक स्थिति का पूर्णांक।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न**
[eth_getTransactionByHash](#eth_gettransactionbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionByBlockHashAndIndex\",\"params\":[\"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2\", \"0x0\"],\"id\":1}'
```

परिणाम के लिए [eth_getTransactionByHash](#eth_gettransactionbyhash) देखें

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

ब्लॉक नंबर और लेन-देन सूचकांक स्थिति द्वारा लेन-देन के बारे में जानकारी लौटाता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `मात्रा|टैग` - एक ब्लॉक नंबर, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"` या `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।
2. `मात्रा` - लेन-देन सूचकांक स्थिति।

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**रिटर्न**
[eth_getTransactionByHash](#eth_gettransactionbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionByBlockNumberAndIndex\",\"params\":[\"0x9c47cf\", \"0x24\"],\"id\":1}'
```

परिणाम के लिए [eth_getTransactionByHash](#eth_gettransactionbyhash) देखें

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

लेन-देन हैश द्वारा लेन-देन की रसीद लौटाता है।

**नोट** कि रसीद लंबित लेन-देन के लिए उपलब्ध नहीं है।

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक लेन-देन का हैश

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**रिटर्न**
`ऑब्जेक्ट` - एक लेन-देन रसीद ऑब्जेक्ट, या `null` जब कोई रसीद नहीं मिली:

- `transactionHash `: `डेटा`, 32 बाइट्स - लेन-देन का हैश।
- `transactionIndex`: `मात्रा` - ब्लॉक में लेन-देन सूचकांक स्थिति का पूर्णांक।
- `blockHash`: `डेटा`, 32 बाइट्स - उस ब्लॉक का हैश जहां यह लेन-देन था।
- `blockNumber`: `मात्रा` - ब्लॉक नंबर जहां यह लेन-देन था।
- `from`: `डेटा`, 20 बाइट्स - प्रेषक का पता।
- `to`: `डेटा`, 20 बाइट्स - प्राप्तकर्ता का पता। जब यह एक अनुबंध निर्माण लेन-देन है तो `null`।
- `cumulativeGasUsed` : `मात्रा ` - जब यह लेन-देन ब्लॉक में निष्पादित किया गया था तब उपयोग की गई गैस की कुल राशि।
- `effectiveGasPrice` : `मात्रा` - प्रति यूनिट गैस के लिए भुगतान किए गए आधार शुल्क और टिप का योग।
- `gasUsed `: `मात्रा ` - अकेले इस विशिष्ट लेन-देन द्वारा उपयोग की गई गैस की मात्रा।
- `contractAddress `: `डेटा`, 20 बाइट्स - बनाया गया अनुबंध पता, यदि लेन-देन एक अनुबंध निर्माण था, अन्यथा `null`।
- `logs`: `सारणी` - लॉग ऑब्जेक्ट्स की सारणी, जो इस लेन-देन द्वारा उत्पन्न हुई।
- `logsBloom`: `डेटा`, 256 बाइट्स - लाइट क्लाइंट के लिए संबंधित लॉग को जल्दी से पुनर्प्राप्त करने के लिए ब्लूम फ़िल्टर।
- `type`: `मात्रा` - लेन-देन प्रकार का पूर्णांक, `0x0` लिगेसी लेन-देन के लिए, `0x1` एक्सेस सूची प्रकारों के लिए, `0x2` गतिशील शुल्क के लिए।

यह इनमें से कोई एक भी लौटाता है:

- `root` : `DATA` 32 बाइट्स का पोस्ट-ट्रांजेक्शन स्टेट रूट (प्री-Byzantium)
- `status`: `मात्रा` या तो `1` (सफलता) या `0` (विफलता)

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionReceipt\",\"params\":[\"0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5\"],\"id\":1}'
// परिणाम
{
  \"jsonrpc\": \"2.0\",
  \"id\": 1,
  \"result\": {
    \"blockHash\":
      \"0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3\",
    \"blockNumber\": \"0xeff35f\",
    \"contractAddress\": null, // पते की स्ट्रिंग यदि यह बनाया गया था
    \"cumulativeGasUsed\": \"0xa12515\",
    \"effectiveGasPrice\": \"0x5a9c688d4\",
    \"from\": \"0x6221a9c005f6e47eb398fd867784cacfdcfff4e7\",
    \"gasUsed\": \"0xb4c8\",
    \"logs\": [{
      // getFilterLogs, आदि द्वारा लौटाए गए लॉग।
    }],
    \"logsBloom\": \"0x00...0\", // 256 बाइट ब्लूम फ़िल्टर
    \"status\": \"0x1\",
    \"to\": \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\",
    \"transactionHash\":
      \"0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5\",
    \"transactionIndex\": \"0x66\",
    \"type\": \"0x2\"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

हैश और अंकल इंडेक्स की स्थिति के अनुसार ब्लॉक के अंकल के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `डेटा`, 32 बाइट्स - एक ब्लॉक का हैश।
2. `मात्रा` - अंकल की सूचकांक स्थिति।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**रिटर्न**
[eth_getBlockByHash](#eth_getblockbyhash) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getUncleByBlockHashAndIndex\",\"params\":[\"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2\", \"0x0\"],\"id\":1}'
```

परिणाम के लिए [eth_getBlockByHash](#eth_getblockbyhash) देखें

**नोट**: एक अंकल में व्यक्तिगत लेन-देन नहीं होते हैं।

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

नंबर और अंकल इंडेक्स की स्थिति के अनुसार ब्लॉक के अंकल के बारे में जानकारी देता है।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  प्लेग्राउंड में एंडपॉइंट आज़माएं
</ButtonLink>

**पैरामीटर**

1. `मात्रा|टैग` - एक ब्लॉक नंबर, या स्ट्रिंग `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, जैसा कि [ब्लॉक पैरामीटर](/developers/docs/apis/json-rpc/#block-parameter) में है।
2. `मात्रा` - अंकल की सूचकांक स्थिति।

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**रिटर्न**
[eth_getBlockByHash](#eth_getblockbyhash) देखें

**नोट**: एक अंकल में व्यक्तिगत लेन-देन नहीं होते हैं।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getUncleByBlockNumberAndIndex\",\"params\":[\"0x29c\", \"0x0\"],\"id\":1}'
```

परिणाम के लिए [eth_getBlockByHash](#eth_getblockbyhash) देखें

### eth_newFilter {#eth_newfilter}

फ़िल्टर विकल्पों के आधार पर, एक फ़िल्टर ऑब्जेक्ट बनाता है, ताकि जब स्टेट बदल जाए (लॉग) तो सूचित किया जा सके।
यह जांचने के लिए कि स्टेट बदला है या नहीं, [eth_getFilterChanges](#eth_getfilterchanges) को कॉल करें।

**विषय फ़िल्टर निर्दिष्ट करने पर एक नोट:**
विषय क्रम-निर्भर हैं। विषयों [A, B] के साथ लॉग वाला एक लेन-देन निम्नलिखित विषय फ़िल्टर द्वारा मेल खाएगा:

- `[]` "कुछ भी"
- `[A]` "पहली स्थिति में A (और बाद में कुछ भी)"
- `[null, B]` "पहली स्थिति में कुछ भी और दूसरी स्थिति में B (और बाद में कुछ भी)"
- `[A, B]` "पहली स्थिति में A और दूसरी स्थिति में B (और बाद में कुछ भी)"
- `[[A, B], [A, B]]` "(A या B) पहली स्थिति में और (A या B) दूसरी स्थिति में (और बाद में कुछ भी)"
- **पैरामीटर**

1. `ऑब्जेक्ट` - फ़िल्टर विकल्प:

- `fromBlock`: `मात्रा|टैग` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम ब्लॉक के लिए `"finalized"`, या `"pending"`, `"earliest"` अभी तक किसी ब्लॉक में नहीं लेन-देन के लिए।
- `toBlock`: `मात्रा|टैग` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम ब्लॉक के लिए `"finalized"`, या `"pending"`, `"earliest"` अभी तक किसी ब्लॉक में नहीं लेन-देन के लिए।
- `address`: `डेटा|सारणी`, 20 बाइट्स - (वैकल्पिक) अनुबंध पता या पतों की एक सूची जहां से लॉग उत्पन्न होने चाहिए।
- `topics`: `डेटा की सारणी`, - (वैकल्पिक) 32 बाइट्स `डेटा` विषयों की सारणी। विषय क्रम-निर्भर हैं। प्रत्येक विषय "या" विकल्पों के साथ डेटा की एक सरणी भी हो सकती है।

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
`मात्रा` - एक फ़िल्टर आईडी।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_newFilter\",\"params\":[{\"topics\":[\"0x12341234\"]}],\"id\":73}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": \"0x1\" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

नोड में एक फ़िल्टर बनाता है, ताकि जब कोई नया ब्लॉक आए तो सूचित किया जा सके।
यह जांचने के लिए कि स्टेट बदला है या नहीं, [eth_getFilterChanges](#eth_getfilterchanges) को कॉल करें।

**पैरामीटर**
कोई नहीं

**रिटर्न**
`मात्रा` - एक फ़िल्टर आईडी।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_newBlockFilter\",\"params\":[],\"id\":73}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\":  \"2.0\",
  \"result\": \"0x1\" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

नोड में एक फ़िल्टर बनाता है, ताकि जब नए लंबित लेन-देन आएं तो सूचित किया जा सके।
यह जांचने के लिए कि स्टेट बदला है या नहीं, [eth_getFilterChanges](#eth_getfilterchanges) को कॉल करें।

**पैरामीटर**
कोई नहीं

**रिटर्न**
`मात्रा` - एक फ़िल्टर आईडी।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_newPendingTransactionFilter\",\"params\":[],\"id\":73}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\":  \"2.0\",
  \"result\": \"0x1\" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

दी गई आईडी के साथ एक फ़िल्टर को अनइंस्टॉल करता है। जब घड़ी की अब आवश्यकता न हो तो हमेशा कॉल किया जाना चाहिए।
इसके अतिरिक्त, जब कुछ समय के लिए [eth_getFilterChanges](#eth_getfilterchanges) के साथ अनुरोध नहीं किया जाता है तो फ़िल्टर टाइमआउट हो जाते हैं।

**पैरामीटर**

1. `मात्रा` - फ़िल्टर आईडी।

```js
params: [
  "0xb", // 11
]
```

**रिटर्न**
`बूलियन` - यदि फ़िल्टर सफलतापूर्वक अनइंस्टॉल किया गया था तो `true`, अन्यथा `false`।

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_uninstallFilter\",\"params\":[\"0xb\"],\"id\":73}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\": \"2.0\",
  \"result\": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

एक फ़िल्टर के लिए पोलिंग विधि, जो अंतिम पोल के बाद हुए लॉग की एक सरणी लौटाती है।

**पैरामीटर**

1. `मात्रा` - फ़िल्टर आईडी।

```js
params: [
  "0x16", // 22
]
```

**रिटर्न**
`सारणी` - लॉग ऑब्जेक्ट्स की सारणी, या एक खाली सारणी यदि अंतिम पोल के बाद कुछ भी नहीं बदला है।

- `eth_newBlockFilter` के साथ बनाए गए फ़िल्टर के लिए, रिटर्न ब्लॉक हैश (`DATA`, 32 बाइट्स) होते हैं, उदाहरण के लिए, `["0x3454645634534..."]`।

- `eth_newPendingTransactionFilter` के साथ बनाए गए फ़िल्टर के लिए, रिटर्न लेनदेन हैश (`DATA`, 32 बाइट्स) होते हैं, उदाहरण के लिए, `["0x6345343454645..."]`।

- `eth_newFilter` के साथ बनाए गए फ़िल्टर के लिए लॉग निम्नलिखित मापदंडों के साथ ऑब्जेक्ट हैं:
  - `removed`: `टैग` - `true` जब लॉग हटा दिया गया था, एक चेन पुनर्गठन के कारण। यदि यह एक वैध लॉग है तो `false`।
  - `logIndex`: `मात्रा` - ब्लॉक में लॉग इंडेक्स स्थिति का पूर्णांक। जब यह लंबित लॉग हो तो `null`।
  - `transactionIndex`: `मात्रा` - लेन-देन सूचकांक स्थिति लॉग का पूर्णांक जहां से बनाया गया था। जब यह लंबित लॉग हो तो `null`।
  - `transactionHash`: `डेटा`, 32 बाइट्स - उन लेन-देन का हैश जिनसे यह लॉग बनाया गया था। जब यह लंबित लॉग हो तो `null`।
  - `blockHash`: `डेटा`, 32 बाइट्स - उस ब्लॉक का हैश जहां यह लॉग था। लंबित होने पर `null`। जब यह लंबित लॉग हो तो `null`।
  - `blockNumber`: `मात्रा` - वह ब्लॉक नंबर जहां यह लॉग था। लंबित होने पर `null`। जब यह लंबित लॉग हो तो `null`।
  - `address`: `डेटा`, 20 बाइट्स - वह पता जहां से यह लॉग उत्पन्न हुआ।
  - `data`: `DATA` - चर-लंबाई वाला गैर-अनुक्रमित लॉग डेटा। (_solidity_ में: शून्य या अधिक 32 बाइट्स के गैर-अनुक्रमित लॉग आर्ग्यूमेंट्स।)
  - `topics`: `डेटा की सारणी` - 0 से 4 32 बाइट्स `डेटा` की सारणी अनुक्रमित लॉग तर्कों की। (_solidity_ में: पहला विषय इवेंट के हस्ताक्षर का _हैश_ है (उदाहरण के लिए, `Deposit(address,bytes32,uint256)`), सिवाय इसके कि आपने `anonymous` स्पेसिफायर के साथ इवेंट की घोषणा की हो।)

- **उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getFilterChanges\",\"params\":[\"0x16\"],\"id\":73}'
// परिणाम
{
  \"id\":1,
  \"jsonrpc\":\"2.0\",
  \"result\": [{
    \"logIndex\": \"0x1\", // 1
    \"blockNumber\":\"0x1b4\", // 436
    \"blockHash\": \"0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d\",
    \"transactionHash\":  \"0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf\",
    \"transactionIndex\": \"0x0\", // 0
    \"address\": \"0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d\",
    \"data\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",
    \"topics\": [\"0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5\"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

दी गई आईडी के साथ फ़िल्टर से मेल खाने वाले सभी लॉग की एक सरणी लौटाता है।

**पैरामीटर**

1. `मात्रा` - फ़िल्टर आईडी।

```js
params: [
  "0x16", // 22
]
```

**रिटर्न**
[eth_getFilterChanges](#eth_getfilterchanges) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getFilterLogs\",\"params\":[\"0x16\"],\"id\":74}'
```

परिणाम के लिए [eth_getFilterChanges](#eth_getfilterchanges) देखें

### eth_getLogs {#eth_getlogs}

दिए गए फ़िल्टर ऑब्जेक्ट से मेल खाने वाले सभी लॉग की एक सरणी लौटाता है।

**पैरामीटर**

1. `ऑब्जेक्ट` - फ़िल्टर विकल्प:

- `fromBlock`: `मात्रा|टैग` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम ब्लॉक के लिए `"finalized"`, या `"pending"`, `"earliest"` अभी तक किसी ब्लॉक में नहीं लेन-देन के लिए।
- `toBlock`: `मात्रा|टैग` - (वैकल्पिक, डिफ़ॉल्ट: `"latest"`) पूर्णांक ब्लॉक नंबर, या अंतिम प्रस्तावित ब्लॉक के लिए `"latest"`, नवीनतम सुरक्षित ब्लॉक के लिए `"safe"`, नवीनतम अंतिम ब्लॉक के लिए `"finalized"`, या `"pending"`, `"earliest"` अभी तक किसी ब्लॉक में नहीं लेन-देन के लिए।
- `address`: `डेटा|सारणी`, 20 बाइट्स - (वैकल्पिक) अनुबंध पता या पतों की एक सूची जहां से लॉग उत्पन्न होने चाहिए।
- `topics`: `डेटा की सारणी`, - (वैकल्पिक) 32 बाइट्स `डेटा` विषयों की सारणी। विषय क्रम-निर्भर हैं। प्रत्येक विषय "या" विकल्पों के साथ डेटा की एक सरणी भी हो सकती है।
- `blockHash`: `डेटा`, 32 बाइट्स - (वैकल्पिक, **भविष्य**) EIP-234 के जुड़ने के साथ, `blockHash` एक नया फ़िल्टर विकल्प होगा जो लौटाए गए लॉग को 32-बाइट हैश `blockHash` वाले एकल ब्लॉक तक सीमित करता है। `blockHash` का उपयोग करना `fromBlock` = `toBlock` = हैश `blockHash` वाले ब्लॉक नंबर के बराबर है। यदि `blockHash` फ़िल्टर मानदंड में मौजूद है, तो न तो `fromBlock` और न ही `toBlock` की अनुमति है।

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
[eth_getFilterChanges](#eth_getfilterchanges) देखें

**उदाहरण**

```js
// अनुरोध
curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getLogs\",\"params\":[{\"topics\":[\"0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b\"]}],\"id\":74}'
```

परिणाम के लिए [eth_getFilterChanges](#eth_getfilterchanges) देखें

## उपयोग का उदाहरण {#usage-example}

### JSON_RPC का उपयोग करके अनुबंध को तैनात करना {#deploying-contract}

इस अनुभाग में केवल RPC इंटरफ़ेस का उपयोग करके अनुबंध को कैसे तैनात किया जाए, इसका एक प्रदर्शन शामिल है। अनुबंधों को तैनात करने के लिए वैकल्पिक मार्ग हैं जहां इस जटिलता को दूर किया जाता है - उदाहरण के लिए, RPC इंटरफ़ेस के शीर्ष पर बनी लाइब्रेरी का उपयोग करना जैसे [web3.js](https://web3js.readthedocs.io/) और [web3.py](https://github.com/ethereum/web3.py)। ये सारग्रहण आम तौर पर समझने में आसान और कम त्रुटि-प्रवण होते हैं, लेकिन यह समझना अभी भी सहायक है कि पर्दे के पीछे क्या हो रहा है।

निम्नलिखित एक सीधा-सादा स्मार्ट अनुबंध है जिसे `Multiply7` कहा जाता है जिसे एक एथेरियम नोड पर JSON-RPC इंटरफ़ेस का उपयोग करके तैनात किया जाएगा। यह ट्यूटोरियल मानता है कि पाठक पहले से ही एक Geth नोड चला रहा है। नोड और क्लाइंट के बारे में अधिक जानकारी [यहां](/developers/docs/nodes-and-clients/run-a-node) उपलब्ध है। गैर-Geth क्लाइंट के लिए HTTP JSON-RPC कैसे शुरू करें, यह देखने के लिए कृपया व्यक्तिगत [क्लाइंट](/developers/docs/nodes-and-clients/) दस्तावेज़ीकरण देखें। अधिकांश क्लाइंट `localhost:8545` पर सेवा देने के लिए डिफ़ॉल्ट होते हैं।

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

सबसे पहली बात यह सुनिश्चित करना है कि HTTP RPC इंटरफ़ेस सक्षम है। इसका मतलब है कि हम स्टार्टअप पर Geth को `--http` फ्लैग प्रदान करते हैं। इस उदाहरण में हम एक निजी विकास श्रृंखला पर Geth नोड का उपयोग करते हैं। इस दृष्टिकोण का उपयोग करके हमें वास्तविक नेटवर्क पर ईथर की आवश्यकता नहीं है।

```bash
geth --http --dev console 2>>geth.log
```

यह `http://localhost:8545` पर HTTP RPC इंटरफ़ेस शुरू करेगा।

हम यह सत्यापित कर सकते हैं कि इंटरफ़ेस [curl](https://curl.se) का उपयोग करके कॉइनबेस पता (खातों की सरणी से पहला पता प्राप्त करके) और शेष राशि प्राप्त करके चल रहा है। कृपया ध्यान दें कि इन उदाहरणों में डेटा आपके स्थानीय नोड पर भिन्न होगा। यदि आप इन आदेशों को आज़माना चाहते हैं, तो दूसरे कर्ल अनुरोध में अनुरोध पैरामीटर को पहले से लौटाए गए परिणाम से बदलें।

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

चूंकि संख्याएं हेक्स एन्कोडेड होती हैं, इसलिए शेष राशि को हेक्स स्ट्रिंग के रूप में वेई में लौटाया जाता है। यदि हम शेष राशि को ईथर में एक संख्या के रूप में चाहते हैं तो हम Geth कंसोल से web3 का उपयोग कर सकते हैं।

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

अब जब हमारी निजी विकास श्रृंखला पर कुछ ईथर है, तो हम अनुबंध को तैनात कर सकते हैं। पहला कदम Multiply7 अनुबंध को बाइट कोड में संकलित करना है जिसे EVM को भेजा जा सकता है। सॉलिडिटी कंपाइलर solc को स्थापित करने के लिए, [सॉलिडिटी दस्तावेज़ीकरण](https://docs.soliditylang.org/en/latest/installing-solidity.html) का पालन करें। (आप [हमारे उदाहरण के लिए उपयोग किए गए कंपाइलर के संस्करण](https://github.com/ethereum/solidity/releases/tag/v0.4.20) से मेल खाने के लिए एक पुराने `solc` रिलीज़ का उपयोग करना चाह सकते हैं।)

अगला कदम Multiply7 अनुबंध को बाइट कोड में संकलित करना है जिसे EVM में भेजा जा सकता है।

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

अब जब हमारे पास संकलित कोड है तो हमें यह निर्धारित करने की आवश्यकता है कि इसे तैनात करने में कितनी गैस लगती है। RPC इंटरफ़ेस में एक `eth_estimateGas` विधि है जो हमें एक अनुमान देगी।

```bash
curl --data '{\"jsonrpc\":\"2.0\",\"method\": \"eth_estimateGas\", \"params\": [{\"from\": \"0x9b1d35635cc34752ca54713bb99d38614f63c955\", \"data\": \"0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029\"}], \"id\": 5}' -H "Content-Type: application/json" localhost:8545
{\"jsonrpc\":\"2.0\",\"id\":5,\"result\":\"0x1c31e\"}
```

और अंत में अनुबंध को तैनात करें।

```bash
curl --data '{\"jsonrpc\":\"2.0\",\"method\": \"eth_sendTransaction\", \"params\": [{\"from\": \"0x9b1d35635cc34752ca54713bb99d38614f63c955\", \"gas\": \"0x1c31e\", \"data\": \"0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029\"}], \"id\": 6}' -H "Content-Type: application/json" localhost:8545
{\"id\":6,\"jsonrpc\":\"2.0\",\"result\":\"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf\"}
```

लेन-देन नोड द्वारा स्वीकार किया जाता है और एक लेन-देन हैश लौटाया जाता है। इस हैश का उपयोग लेन-देन को ट्रैक करने के लिए किया जा सकता है। अगला कदम यह निर्धारित करना है कि हमारा अनुबंध कहां तैनात है। प्रत्येक निष्पादित लेन-देन एक रसीद बनाएगा। इस रसीद में लेन-देन के बारे में विभिन्न जानकारी होती है जैसे कि लेन-देन किस ब्लॉक में शामिल था और EVM द्वारा कितनी गैस का उपयोग किया गया था। यदि कोई लेन-देन अनुबंध बनाता है तो उसमें अनुबंध का पता भी होगा। हम `eth_getTransactionReceipt` RPC विधि से रसीद प्राप्त कर सकते हैं।

```bash
curl --data '{\"jsonrpc\":\"2.0\",\"method\": \"eth_getTransactionReceipt\", \"params\": [\"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf\"], \"id\": 7}' -H "Content-Type: application/json" localhost:8545
{\"jsonrpc\":\"2.0\",\"id\":7,\"result\":{\"blockHash\":\"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f\",\"blockNumber\":\"0x1\",\"contractAddress\":\"0x4d03d617d700cf81935d7f797f4e2ae719648262\",\"cumulativeGasUsed\":\"0x1c31e\",\"from\":\"0x9b1d35635cc34752ca54713bb99d38614f63c955\",\"gasUsed\":\"0x1c31e\",\"logs\":[],\"logsBloom\":\"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"status\":\"0x1\",\"to\":null,\"transactionHash\":\"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf\",\"transactionIndex\":\"0x0\"}}
```

हमारा अनुबंध `0x4d03d617d700cf81935d7f797f4e2ae719648262` पर बनाया गया था। रसीद के बजाय एक शून्य परिणाम का मतलब है कि लेन-देन अभी तक एक ब्लॉक में शामिल नहीं किया गया है। एक पल प्रतीक्षा करें और जांचें कि क्या आपका सहमति क्लाइंट चल रहा है और इसे पुनः प्रयास करें।

#### स्मार्ट अनुबंधों के साथ सहभागिता {#interacting-with-smart-contract}

इस उदाहरण में हम अनुबंध की `multiply` विधि को `eth_sendTransaction` का उपयोग करके एक लेन-देन भेजेंगे।

`eth_sendTransaction` को कई तर्कों की आवश्यकता होती है, विशेष रूप से `from`, `to` और `data`। `From` हमारे खाते का सार्वजनिक पता है, और `to` अनुबंध का पता है। `data` तर्क में एक पेलोड होता है जो यह परिभाषित करता है कि किस विधि को कॉल किया जाना चाहिए और किन तर्कों के साथ। यहीं पर [ABI (एप्लिकेशन बाइनरी इंटरफ़ेस)](https://docs.soliditylang.org/en/latest/abi-spec.html) काम आता है। ABI एक JSON फ़ाइल है जो यह परिभाषित करती है कि EVM के लिए डेटा को कैसे परिभाषित और एन्कोड किया जाए।

पेलोड के बाइट्स यह परिभाषित करते हैं कि अनुबंध में किस विधि को कॉल किया गया है। यह फ़ंक्शन नाम और उसके तर्क प्रकारों पर केccak हैश से पहले 4 बाइट्स है, हेक्स एन्कोडेड। मल्टीप्लाई फ़ंक्शन एक uint स्वीकार करता है जो uint256 के लिए एक उपनाम है। यह हमें छोड़ देता है:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

अगला कदम तर्कों को एन्कोड करना है। केवल एक uint256 है, मान लीजिए, मान 6 है। ABI में एक अनुभाग है जो यह निर्दिष्ट करता है कि uint256 प्रकारों को कैसे एन्कोड किया जाए।

`int<M>: enc(X)` X का बिग-एंडियन टू का पूरक एन्कोडिंग है, जो ऋणात्मक X के लिए 0xff के साथ और धनात्मक X के लिए शून्य बाइट्स के साथ उच्च-क्रम (बाएं) तरफ गद्देदार है ताकि लंबाई 32 बाइट्स का एक गुणक हो।

यह `0000000000000000000000000000000000000000000000000000000000000006` को एन्कोड करता है।

फ़ंक्शन चयनकर्ता और एन्कोडेड तर्क को मिलाकर हमारा डेटा `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` होगा।

इसे अब नोड पर भेजा जा सकता है:

```bash
curl --data '{\"jsonrpc\":\"2.0\",\"method\": \"eth_sendTransaction\", \"params\": [{\"from\": \"0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a\", \"to\": \"0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d\", \"data\": \"0xc6888fa10000000000000000000000000000000000000000000000000000000000000006\"}], \"id\": 8}' -H "Content-Type: application/json" localhost:8545
{\"id\":8,\"jsonrpc\":\"2.0\",\"result\":\"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74\"}
```

चूंकि एक लेन-देन भेजा गया था, एक लेन-देन हैश लौटाया गया था। रसीद प्राप्त करने पर मिलता है:

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

रसीद में एक लॉग होता है। यह लॉग EVM द्वारा लेन-देन निष्पादन पर उत्पन्न किया गया था और रसीद में शामिल किया गया था। `multiply` फ़ंक्शन से पता चलता है कि `Print` इवेंट इनपुट गुणा 7 के साथ उठाया गया था। चूंकि `Print` इवेंट के लिए तर्क एक uint256 था, हम इसे ABI नियमों के अनुसार डीकोड कर सकते हैं जो हमें अपेक्षित दशमलव 42 के साथ छोड़ देगा। डेटा के अलावा यह ध्यान देने योग्य है कि विषयों का उपयोग यह निर्धारित करने के लिए किया जा सकता है कि किस इवेंट ने लॉग बनाया है:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

यह JSON-RPC के प्रत्यक्ष उपयोग का प्रदर्शन करते हुए, कुछ सबसे सामान्य कार्यों का एक संक्षिप्त परिचय था।

## संबंधित विषय {#related-topics}

- [JSON-RPC विनिर्देश](http://www.jsonrpc.org/specification)
- [नोड्स और क्लाइंट्स](/developers/docs/nodes-and-clients/)
- [जावास्क्रिप्ट API](/developers/docs/apis/javascript/)
- [बैकएंड API](/developers/docs/apis/backend/)
- [निष्पादन क्लाइंट](/developers/docs/nodes-and-clients/#execution-clients)
