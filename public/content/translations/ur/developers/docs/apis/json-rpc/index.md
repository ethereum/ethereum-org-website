---
title: JSON-RPC API
description: "ایتھیریم کلائنٹس کے لیے ایک اسٹیٹ لیس، ہلکا پھلکا ریموٹ پروسیجر کال (RPC) پروٹوکول۔"
lang: ur-in
---

کسی سافٹ ویئر ایپلیکیشن کو ایتھیریم بلاک چین کے ساتھ تعامل کرنے کے لیے - یا تو بلاک چین ڈیٹا پڑھ کر یا نیٹ ورک پر ٹرانزیکشنز بھیج کر - اسے ایتھیریم نوڈ سے منسلک ہونا چاہیے۔

اس مقصد کے لیے، ہر [ایتھیریم کلائنٹ](/developers/docs/nodes-and-clients/#execution-clients) [JSON-RPC اسپیسیفکیشن](https://github.com/ethereum/execution-apis) کو نافذ کرتا ہے، لہذا طریقوں کا ایک یکساں سیٹ ہے جس پر ایپلیکیشنز مخصوص نوڈ یا کلائنٹ کے نفاذ سے قطع نظر انحصار کر سکتی ہیں۔

[JSON-RPC](https://www.jsonrpc.org/specification) ایک اسٹیٹ لیس، ہلکا پھلکا ریموٹ پروسیجر کال (RPC) پروٹوکول ہے۔ یہ کئی ڈیٹا ڈھانچوں اور ان کی پروسیسنگ کے ارد گرد کے اصولوں کی وضاحت کرتا ہے۔ یہ ٹرانسپورٹ ایگنوسٹک ہے اس لحاظ سے کہ تصورات کو اسی عمل کے اندر، ساکٹ پر، HTTP پر، یا بہت سے مختلف پیغام بھیجنے والے ماحول میں استعمال کیا جا سکتا ہے۔ یہ JSON (RFC 4627) کو ڈیٹا فارمیٹ کے طور پر استعمال کرتا ہے۔

## کلائنٹ کے نفاذ {#client-implementations}

JSON-RPC اسپیسیفکیشن کو نافذ کرتے وقت ایتھیریم کلائنٹس ہر ایک مختلف پروگرامنگ زبانوں کا استعمال کر سکتے ہیں۔ مخصوص پروگرامنگ زبانوں سے متعلق مزید تفصیلات کے لیے انفرادی [کلائنٹ کی دستاویزات](/developers/docs/nodes-and-clients/#execution-clients) دیکھیں۔ ہم تازہ ترین API سپورٹ کی معلومات کے لیے ہر کلائنٹ کی دستاویزات کو چیک کرنے کی تجویز کرتے ہیں۔

## سہولت کی لائبریریاں {#convenience-libraries}

جبکہ آپ JSON-RPC API کے ذریعے ایتھیریم کلائنٹس کے ساتھ براہ راست تعامل کا انتخاب کر سکتے ہیں، dapp ڈویلپرز کے لیے اکثر آسان آپشنز ہوتے ہیں۔ JSON-RPC API کے اوپر ریپرز فراہم کرنے کے لیے بہت سی [JavaScript](/developers/docs/apis/javascript/#available-libraries) اور [بیک اینڈ API](/developers/docs/apis/backend/#available-libraries) لائبریریاں موجود ہیں۔ ان لائبریریوں کے ساتھ، ڈویلپرز اپنی پسند کی پروگرامنگ زبان میں JSON-RPC درخواستوں کو شروع کرنے کے لیے بدیہی، یک سطری طریقے لکھ سکتے ہیں (ہڈ کے نیچے) جو ایتھیریم کے ساتھ تعامل کرتی ہیں۔

## اتفاق رائے کلائنٹ APIs {#consensus-clients}

یہ صفحہ بنیادی طور پر ایتھیریم کے ایگزیکیوشن کلائنٹس کے ذریعے استعمال ہونے والے JSON-RPC API سے متعلق ہے۔ تاہم، کنسنسس کلائنٹس کے پاس ایک RPC API بھی ہے جو صارفین کو نوڈ کے بارے میں معلومات کی استفسار کرنے، بیکن بلاکس، بیکن کی حالت، اور دیگر کنسنسس سے متعلق معلومات کو براہ راست نوڈ سے درخواست کرنے کی اجازت دیتا ہے۔ یہ API [بیکن API ویب پیج](https://ethereum.github.io/beacon-APIs/#/) پر دستاویز کی گئی ہے۔

ایک اندرونی API بھی ایک نوڈ کے اندر انٹر-کلائنٹ مواصلات کے لیے استعمال ہوتا ہے - یعنی یہ کنسنسس کلائنٹ اور ایگزیکیوشن کلائنٹ کو ڈیٹا کی تبادلہ کرنے کے قابل بناتا ہے۔ اسے 'انجن API' کہا جاتا ہے اور اس کی تفصیلات [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) پر دستیاب ہیں۔

## ایگزیکیوشن کلائنٹ کی تفصیلات {#spec}

[GitHub پر مکمل JSON-RPC API کی تفصیلات پڑھیں](https://github.com/ethereum/execution-apis)۔ یہ API [ایگزیکیوشن API ویب پیج](https://ethereum.github.io/execution-apis/) پر دستاویز کی گئی ہے اور اس میں تمام دستیاب طریقوں کو آزمانے کے لیے ایک انسپکٹر شامل ہے۔

## روایات {#conventions}

### ہیکس ویلیو انکوڈنگ {#hex-encoding}

JSON پر دو کلیدی ڈیٹا کی اقسام منتقل کی جاتی ہیں: غیر فارمیٹ شدہ بائٹ ارے اور مقداریں۔ دونوں کو ہیکس انکوڈنگ کے ساتھ پاس کیا جاتا ہے لیکن فارمیٹنگ کے لیے مختلف ضروریات کے ساتھ۔

#### مقداریں {#quantities-encoding}

مقداروں (انٹیجرز، نمبرز) کو انکوڈ کرتے وقت: ہیکس کے طور پر انکوڈ کریں، "0x" کے ساتھ پریفکس کریں، سب سے زیادہ کمپیکٹ نمائندگی (معمولی استثناء: صفر کو "0x0" کے طور پر نمائندگی کیا جانا چاہئے)۔

یہاں کچھ مثالیں ہیں:

- 0x41 (اعشاریہ میں 65)
- 0x400 (اعشاریہ میں 1024)
- غلط: 0x (کم از کم ایک ہندسہ ہونا چاہئے - صفر "0x0" ہے)
- غلط: 0x0400 (آگے صفر کی اجازت نہیں ہے)
- غلط: ff (0x سے شروع ہونا چاہئے)

### غیر فارمیٹ شدہ ڈیٹا {#unformatted-data-encoding}

غیر فارمیٹ شدہ ڈیٹا (بائٹ ارے، اکاؤنٹ کے پتے، ہیشز، بائٹ کوڈ ارے) کو انکوڈ کرتے وقت: ہیکس کے طور پر انکوڈ کریں، "0x" کے ساتھ پریفکس کریں، فی بائٹ دو ہیکس ہندسے۔

یہاں کچھ مثالیں ہیں:

- 0x41 (سائز 1, "A")
- 0x004200 (سائز 3, "0B0")
- 0x (سائز 0, "")
- غلط: 0xf0f0f (ہندسوں کی تعداد جفت ہونی چاہئے)
- غلط: 004200 (0x سے شروع ہونا چاہئے)

### بلاک پیرامیٹر {#block-parameter}

مندرجہ ذیل طریقوں میں ایک بلاک پیرامیٹر ہے:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

جب ایتھیریم کی حالت کی استفسار کرنے والی درخواستیں کی جاتی ہیں، تو فراہم کردہ بلاک پیرامیٹر بلاک کی اونچائی کا تعین کرتا ہے۔

بلاک پیرامیٹر کے لیے مندرجہ ذیل آپشنز ممکن ہیں:

- `HEX String` - ایک انٹیجر بلاک نمبر
- سب سے ابتدائی/جینیسس بلاک کے لیے `String "earliest"`
- `String "latest"` - تازہ ترین مجوزہ بلاک کے لیے
- `String "safe"` - تازہ ترین محفوظ ہیڈ بلاک کے لیے
- `String "finalized"` - تازہ ترین حتمی بلاک کے لیے
- `String "pending"` - زیر التواء حالت/ٹرانزیکشنز کے لیے

## مثالیں

اس صفحہ پر ہم کمانڈ لائن ٹول، [curl](https://curl.se) کا استعمال کرتے ہوئے انفرادی JSON_RPC API اینڈ پوائنٹس کو استعمال کرنے کی مثالیں فراہم کرتے ہیں۔ یہ انفرادی اینڈ پوائنٹ مثالیں نیچے [Curl مثالیں](#curl-examples) سیکشن میں ملیں گی۔ صفحے پر مزید نیچے، ہم Geth نوڈ، JSON_RPC API اور curl کا استعمال کرتے ہوئے ایک سمارٹ کنٹریکٹ کو مرتب کرنے اور تعینات کرنے کے لیے ایک [اینڈ ٹو اینڈ مثال](#usage-example) بھی فراہم کرتے ہیں۔

## Curl مثالیں {#curl-examples}

ایتھیریم نوڈ پر [curl](https://curl.se) درخواستیں دے کر JSON_RPC API کا استعمال کرنے کی مثالیں نیچے دی گئی ہیں۔ ہر مثال میں مخصوص اینڈ پوائنٹ کی تفصیل، اس کے پیرامیٹرز، واپسی کی قسم، اور اسے کیسے استعمال کیا جانا چاہئے کی ایک عملی مثال شامل ہے۔

curl درخواستیں مواد کی قسم سے متعلق ایک غلطی کا پیغام واپس کر سکتی ہیں۔ ایسا اس لیے ہے کیونکہ `--data` آپشن مواد کی قسم کو `application/x-www-form-urlencoded` پر سیٹ کرتا ہے۔ اگر آپ کا نوڈ اس کے بارے میں شکایت کرتا ہے، تو کال کے آغاز میں `-H "Content-Type: application/json"` رکھ کر ہیڈر کو دستی طور پر سیٹ کریں۔ مثالوں میں URL/IP اور پورٹ کا امتزاج بھی شامل نہیں ہے جو curl کو دیا جانے والا آخری آرگیومنٹ ہونا چاہیے (مثلاً، `127.0.0.1:8545`)۔ ان اضافی ڈیٹا سمیت ایک مکمل curl درخواست مندرجہ ذیل شکل اختیار کرتی ہے:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## گپ شپ، حالت، تاریخ {#gossip-state-history}

چند بنیادی JSON-RPC طریقوں کو ایتھیریم نیٹ ورک سے ڈیٹا کی ضرورت ہوتی ہے، اور یہ صاف طور پر تین اہم زمروں میں آتے ہیں: _گپ شپ، حالت، اور تاریخ_۔ ہر طریقے پر جانے کے لیے ان سیکشنز میں لنکس کا استعمال کریں، یا طریقوں کی پوری فہرست کو دریافت کرنے کے لیے مندرجات کا جدول استعمال کریں۔

### گپ شپ کے طریقے {#gossip-methods}

> یہ طریقے زنجیر کے سر کو ٹریک کرتے ہیں۔ یہ ہے کہ کس طرح ٹرانزیکشنز نیٹ ورک کے گرد اپنا راستہ بناتی ہیں، بلاکس میں اپنا راستہ تلاش کرتی ہیں، اور کلائنٹس نئے بلاکس کے بارے میں کیسے جانتے ہیں۔

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### اسٹیٹ کے طریقے {#state_methods}

> وہ طریقے جو ذخیرہ شدہ تمام ڈیٹا کی موجودہ حالت کی اطلاع دیتے ہیں۔ "حالت" RAM کے ایک بڑے مشترکہ ٹکڑے کی طرح ہے، اور اس میں اکاؤنٹ بیلنس، کنٹریکٹ ڈیٹا، اور گیس کا تخمینہ شامل ہے۔

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### تاریخ کے طریقے {#history_methods}

> جینیسس تک ہر بلاک کے تاریخی ریکارڈز کو حاصل کرتا ہے۔ یہ ایک بڑی صرف شامل کرنے والی فائل کی طرح ہے، اور اس میں تمام بلاک ہیڈرز، بلاک باڈیز، انکل بلاکس، اور ٹرانزیکشن کی رسیدیں شامل ہیں۔

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

## JSON-RPC API پلے گراؤنڈ

آپ API طریقوں کو دریافت کرنے اور آزمانے کے لیے [پلے گراؤنڈ ٹول](https://ethereum-json-rpc.com) کا استعمال کر سکتے ہیں۔ یہ آپ کو یہ بھی دکھاتا ہے کہ کون سے طریقے اور نیٹ ورکس مختلف نوڈ فراہم کنندگان کے ذریعہ معاونت یافتہ ہیں۔

## JSON-RPC API کے طریقے {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

موجودہ کلائنٹ ورژن واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`String` - موجودہ کلائنٹ ورژن

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// نتیجہ
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

دیئے گئے ڈیٹا کا Keccak-256 (_نہ کہ_ معیاری SHA3-256) واپس کرتا ہے۔

**پیرامیٹرز**

1. `DATA` - SHA3 ہیش میں تبدیل کرنے کے لیے ڈیٹا

```js
params: ["0x68656c6c6f20776f726c64"]
```

**واپسی**

`DATA` - دیئے گئے سٹرنگ کا SHA3 نتیجہ۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// نتیجہ
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

موجودہ نیٹ ورک آئی ڈی واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`String` - موجودہ نیٹ ورک آئی ڈی۔

موجودہ نیٹ ورک IDs کی مکمل فہرست [chainlist.org](https://chainlist.org) پر دستیاب ہے۔ کچھ عام یہ ہیں:

- `1`: ایتھیریم مین نیٹ
- `11155111`: Sepolia ٹیسٹ نیٹ
- `560048` : Hoodi ٹیسٹ نیٹ

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// نتیجہ
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

اگر کلائنٹ فعال طور پر نیٹ ورک کنکشنز کے لیے سن رہا ہے تو `true` واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`Boolean` - سنتے وقت `true`، ورنہ `false`۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// نتیجہ
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

اس وقت کلائنٹ سے منسلک پیئرز کی تعداد واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`QUANTITY` - منسلک پیئرز کی تعداد کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// نتیجہ
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

موجودہ ایتھیریم پروٹوکول ورژن واپس کرتا ہے۔ نوٹ کریں کہ یہ طریقہ [Geth میں دستیاب نہیں ہے](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`String` - موجودہ ایتھیریم پروٹوکول ورژن

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// نتیجہ
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

سنک کی حیثیت کے بارے میں ڈیٹا کے ساتھ ایک آبجیکٹ یا `false` واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

درست واپسی کا ڈیٹا کلائنٹ کے نفاذ کے درمیان مختلف ہوتا ہے۔ جب نوڈ سنک نہیں ہو رہا ہوتا ہے تو تمام کلائنٹس `False` واپس کرتے ہیں، اور تمام کلائنٹس مندرجہ ذیل فیلڈز واپس کرتے ہیں۔

`Object|Boolean`، سنک اسٹیٹس ڈیٹا کے ساتھ ایک آبجیکٹ یا `FALSE`، جب سنک نہ ہو رہا ہو:

- `startingBlock`: `QUANTITY` - وہ بلاک جس پر امپورٹ شروع ہوا (صرف ری سیٹ کیا جائے گا، جب سنک اس کے ہیڈ تک پہنچ جائے)
- `currentBlock`: `QUANTITY` - موجودہ بلاک، eth_blockNumber کی طرح
- `highestBlock`: `QUANTITY` - تخمینہ شدہ سب سے اونچا بلاک

تاہم، انفرادی کلائنٹس اضافی ڈیٹا بھی فراہم کر سکتے ہیں۔ مثال کے طور پر Geth مندرجہ ذیل واپس کرتا ہے:

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

جبکہ Besu واپس کرتا ہے:

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

مزید تفصیلات کے لیے اپنے مخصوص کلائنٹ کی دستاویزات سے رجوع کریں۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// یا جب سنک نہ ہو رہا ہو
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

کلائنٹ کوائن بیس ایڈریس واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

> **نوٹ:** یہ طریقہ **v1.14.0** سے متروک ہو گیا ہے اور اب اس کی حمایت نہیں کی جاتی ہے۔ اس طریقے کو استعمال کرنے کی کوشش کے نتیجے میں "طریقہ معاونت یافتہ نہیں" کی خرابی ہوگی۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`DATA`، 20 بائٹس - موجودہ کوائن بیس ایڈریس۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// نتیجہ
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

ری پلے سے محفوظ ٹرانزیکشنز پر دستخط کرنے کے لیے استعمال ہونے والی چین آئی ڈی واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`chainId`، ایک سٹرنگ کے طور پر ہیکساڈیسیمل ویلیو جو موجودہ چین آئی ڈی کے انٹیجر کی نمائندگی کرتی ہے۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// نتیجہ
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

اگر کلائنٹ فعال طور پر نئے بلاکس کی مائننگ کر رہا ہے تو `true` واپس کرتا ہے۔ یہ صرف پروف-آف-ورک نیٹ ورکس کے لیے `true` واپس کر سکتا ہے اور [The Merge](/roadmap/merge/) کے بعد سے کچھ کلائنٹس میں دستیاب نہیں ہو سکتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`Boolean` - اگر کلائنٹ مائننگ کر رہا ہے تو `true` واپس کرتا ہے، ورنہ `false`۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

نوڈ فی سیکنڈ جتنے ہیشز کے ساتھ مائننگ کر رہا ہے ان کی تعداد واپس کرتا ہے۔ یہ صرف پروف-آف-ورک نیٹ ورکس کے لیے `true` واپس کر سکتا ہے اور [The Merge](/roadmap/merge/) کے بعد سے کچھ کلائنٹس میں دستیاب نہیں ہو سکتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`QUANTITY` - فی سیکنڈ ہیشز کی تعداد۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// نتیجہ
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

wei میں فی گیس کی موجودہ قیمت کا تخمینہ واپس کرتا ہے۔ مثال کے طور پر، Besu کلائنٹ آخری 100 بلاکس کا معائنہ کرتا ہے اور بطور ڈیفالٹ میڈین گیس یونٹ کی قیمت واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`QUANTITY` - wei میں موجودہ گیس کی قیمت کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// نتیجہ
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

کلائنٹ کی ملکیت والے پتوں کی فہرست واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`DATA کا ارے`، 20 بائٹس - کلائنٹ کی ملکیت والے پتے۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

سب سے حالیہ بلاک کا نمبر واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`QUANTITY` - موجودہ بلاک نمبر کا انٹیجر جس پر کلائنٹ ہے۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// نتیجہ
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

دیے گئے ایڈریس پر اکاؤنٹ کا بیلنس واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 20 بائٹس - بیلنس چیک کرنے کے لیے پتہ۔
2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"`، یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**واپسی**

`QUANTITY` - wei میں موجودہ بیلنس کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

ایک دیئے گئے پتے پر اسٹوریج کی پوزیشن سے ویلیو واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 20 بائٹس - اسٹوریج کا پتہ۔
2. `QUANTITY` - اسٹوریج میں پوزیشن کا انٹیجر۔
3. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"`، `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

**واپسی**

`DATA` - اس اسٹوریج پوزیشن پر ویلیو۔

**مثال**
صحیح پوزیشن کا حساب لگانا بازیافت کرنے کے لیے اسٹوریج پر منحصر ہے۔ ایڈریس `0x391694e7e0b0cce554cb130d723a9d27458f9298` کے ذریعے `0x295a70b2de5e3953354a6a8344e616ed314d7251` پر تعینات مندرجہ ذیل کنٹریکٹ پر غور کریں۔

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

pos0 کی قدر بازیافت کرنا سیدھا ہے:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

نقشے کے ایک عنصر کو بازیافت کرنا زیادہ مشکل ہے۔ نقشے میں ایک عنصر کی پوزیشن کا حساب اس کے ساتھ کیا جاتا ہے:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

اس کا مطلب ہے کہ pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] پر اسٹوریج کو بازیافت کرنے کے لیے ہمیں پوزیشن کا حساب اس کے ساتھ کرنا ہوگا:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

web3 لائبریری کے ساتھ آنے والا geth کنسول حساب کتاب کرنے کے لیے استعمال کیا جا سکتا ہے:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

اب اسٹوریج کو حاصل کرنے کے لیے:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

ایک پتے سے _بھیجی گئی_ ٹرانزیکشنز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 20 بائٹس - پتہ۔
2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // تازہ ترین بلاک پر حالت
]
```

**واپسی**

`QUANTITY` - اس ایڈریس سے بھیجے گئے ٹرانزیکشنز کی تعداد کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

دیئے گئے بلاک ہیش سے مماثل بلاک سے ایک بلاک میں ٹرانزیکشنز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک بلاک کا ہیش

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**واپسی**

`QUANTITY` - اس بلاک میں ٹرانزیکشنز کی تعداد کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

دیئے گئے بلاک نمبر سے مماثل بلاک میں ٹرانزیکشنز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر کا انٹیجر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"` یا `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔

```js
params: [
  "0x13738ca", // 20396234
]
```

**واپسی**

`QUANTITY` - اس بلاک میں ٹرانزیکشنز کی تعداد کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

دیئے گئے بلاک ہیش سے مماثل بلاک سے ایک بلاک میں انکلز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک بلاک کا ہیش

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**واپسی**

`QUANTITY` - اس بلاک میں انکلز کی تعداد کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

دیئے گئے بلاک نمبر سے مماثل بلاک سے ایک بلاک میں انکلز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر کا انٹیجر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

```js
params: [
  "0xe8", // 232
]
```

**واپسی**

`QUANTITY` - اس بلاک میں انکلز کی تعداد کا انٹیجر۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

ایک دیئے گئے پتے پر کوڈ واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 20 بائٹس - پتہ
2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**واپسی**

`DATA` - دیئے گئے پتے سے کوڈ۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

سائن کا طریقہ ایک ایتھیریم مخصوص دستخط کا حساب لگاتا ہے: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`۔

پیغام میں ایک پریفکس شامل کرنے سے حساب کردہ دستخط کو ایک ایتھیریم مخصوص دستخط کے طور پر پہچانا جا سکتا ہے۔ یہ غلط استعمال کو روکتا ہے جہاں ایک نقصان دہ dapp صوابدیدی ڈیٹا (مثلاً، ٹرانزیکشن) پر دستخط کر سکتا ہے اور دستخط کا استعمال شکار کی نقالی کرنے کے لیے کر سکتا ہے۔

نوٹ: دستخط کرنے کے لیے پتہ غیر مقفل ہونا چاہیے۔

**پیرامیٹرز**

1. `DATA`، 20 بائٹس - پتہ
2. `DATA`، N بائٹس - دستخط کرنے کے لیے پیغام

**واپسی**

`DATA`: دستخط

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

ایک ٹرانزیکشن پر دستخط کرتا ہے جسے بعد میں [eth_sendRawTransaction](#eth_sendrawtransaction) کے ساتھ نیٹ ورک پر جمع کیا جا سکتا ہے۔

**پیرامیٹرز**

1. `Object` - ٹرانزیکشن آبجیکٹ

- `type`:
- `from`: `DATA`، 20 بائٹس - وہ پتہ جہاں سے ٹرانزیکشن بھیجی جاتی ہے۔
- `to`: `DATA`، 20 بائٹس - (اختیاری جب نیا کنٹریکٹ بنایا جائے) وہ پتہ جہاں ٹرانزیکشن بھیجی جاتی ہے۔
- `gas`: `QUANTITY` - (اختیاری، ڈیفالٹ: 90000) ٹرانزیکشن کے نفاذ کے لیے فراہم کردہ گیس کا انٹیجر۔ یہ غیر استعمال شدہ گیس واپس کرے گا۔
- `gasPrice`: `QUANTITY` - (اختیاری، ڈیفالٹ: طے کیا جائے گا) ہر ادا شدہ گیس کے لیے استعمال ہونے والی گیس کی قیمت کا انٹیجر، Wei میں۔
- `value`: `QUANTITY` - (اختیاری) اس ٹرانزیکشن کے ساتھ بھیجی گئی قیمت کا انٹیجر، Wei میں۔
- `data`: `DATA` - ایک کنٹریکٹ کا مرتب کردہ کوڈ یا طلب کردہ طریقہ دستخط کا ہیش اور انکوڈڈ پیرامیٹرز۔
- `nonce`: `QUANTITY` - (اختیاری) نونس کا انٹیجر۔ یہ آپ کو اپنی زیر التواء ٹرانزیکشنز کو اوور رائٹ کرنے کی اجازت دیتا ہے جو اسی نونس کا استعمال کرتی ہیں۔

**واپسی**

`DATA`، مخصوص اکاؤنٹ کے ذریعے دستخط شدہ RLP-انکوڈڈ ٹرانزیکشن آبجیکٹ۔

**مثال**

```js
// درخواست
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// نتیجہ
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

نیا پیغام کال ٹرانزیکشن یا کنٹریکٹ تخلیق کرتا ہے، اگر ڈیٹا فیلڈ میں کوڈ ہو، اور اسے `from` میں مخصوص اکاؤنٹ کا استعمال کرتے ہوئے دستخط کرتا ہے۔

**پیرامیٹرز**

1. `Object` - ٹرانزیکشن آبجیکٹ

- `from`: `DATA`، 20 بائٹس - وہ پتہ جہاں سے ٹرانزیکشن بھیجی جاتی ہے۔
- `to`: `DATA`، 20 بائٹس - (اختیاری جب نیا کنٹریکٹ بنایا جائے) وہ پتہ جہاں ٹرانزیکشن بھیجی جاتی ہے۔
- `gas`: `QUANTITY` - (اختیاری، ڈیفالٹ: 90000) ٹرانزیکشن کے نفاذ کے لیے فراہم کردہ گیس کا انٹیجر۔ یہ غیر استعمال شدہ گیس واپس کرے گا۔
- `gasPrice`: `QUANTITY` - (اختیاری، ڈیفالٹ: طے کیا جائے گا) ہر ادا شدہ گیس کے لیے استعمال ہونے والی گیس کی قیمت کا انٹیجر۔
- `value`: `QUANTITY` - (اختیاری) اس ٹرانزیکشن کے ساتھ بھیجی گئی قیمت کا انٹیجر۔
- `input`: `DATA` - ایک کنٹریکٹ کا مرتب کردہ کوڈ یا طلب کردہ طریقہ دستخط کا ہیش اور انکوڈڈ پیرامیٹرز۔
- `nonce`: `QUANTITY` - (اختیاری) نونس کا انٹیجر۔ یہ آپ کو اپنی زیر التواء ٹرانزیکشنز کو اوور رائٹ کرنے کی اجازت دیتا ہے جو اسی نونس کا استعمال کرتی ہیں۔

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

**واپسی**

`DATA`، 32 بائٹس - ٹرانزیکشن ہیش، یا صفر ہیش اگر ٹرانزیکشن ابھی تک دستیاب نہیں ہے۔

[eth_getTransactionReceipt](#eth_gettransactionreceipt) کا استعمال کریں تاکہ کنٹریکٹ کا پتہ حاصل کیا جا سکے، جب ٹرانزیکشن ایک بلاک میں تجویز کی گئی ہو، جب آپ نے ایک کنٹریکٹ بنایا ہو۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

دستخط شدہ ٹرانزیکشنز کے لیے نیا پیغام کال ٹرانزیکشن یا کنٹریکٹ تخلیق کرتا ہے۔

**پیرامیٹرز**

1. `DATA`، دستخط شدہ ٹرانزیکشن ڈیٹا۔

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**واپسی**

`DATA`، 32 بائٹس - ٹرانزیکشن ہیش، یا صفر ہیش اگر ٹرانزیکشن ابھی تک دستیاب نہیں ہے۔

[eth_getTransactionReceipt](#eth_gettransactionreceipt) کا استعمال کریں تاکہ کنٹریکٹ کا پتہ حاصل کیا جا سکے، جب ٹرانزیکشن ایک بلاک میں تجویز کی گئی ہو، جب آپ نے ایک کنٹریکٹ بنایا ہو۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

بلاک چین پر ٹرانزیکشن بنائے بغیر فوری طور پر ایک نیا پیغام کال نافذ کرتا ہے۔ اکثر صرف پڑھنے کے قابل سمارٹ کنٹریکٹ فنکشنز کو نافذ کرنے کے لیے استعمال کیا جاتا ہے، مثال کے طور پر ERC-20 کنٹریکٹ کے لیے `balanceOf`۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `Object` - ٹرانزیکشن کال آبجیکٹ

- `from`: `DATA`، 20 بائٹس - (اختیاری) وہ پتہ جہاں سے ٹرانزیکشن بھیجی جاتی ہے۔
- `to`: `DATA`، 20 بائٹس - وہ پتہ جہاں ٹرانزیکشن بھیجی جاتی ہے۔
- `gas`: `QUANTITY` - (اختیاری) ٹرانزیکشن کے نفاذ کے لیے فراہم کردہ گیس کا انٹیجر۔ eth_call صفر گیس استعمال کرتا ہے، لیکن کچھ نفاذ کے لیے اس پیرامیٹر کی ضرورت ہو سکتی ہے۔
- `gasPrice`: `QUANTITY` - (اختیاری) ہر ادا شدہ گیس کے لیے استعمال ہونے والی گیس کی قیمت کا انٹیجر
- `value`: `QUANTITY` - (اختیاری) اس ٹرانزیکشن کے ساتھ بھیجی گئی قیمت کا انٹیجر
- `input`: `DATA` - (اختیاری) طریقہ دستخط کا ہیش اور انکوڈڈ پیرامیٹرز۔ تفصیلات کے لیے [سولیڈیٹی دستاویزات میں ایتھیریم کنٹریکٹ ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) دیکھیں۔

2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

**واپسی**

`DATA` - نافذ کردہ کنٹریکٹ کی واپسی کی قیمت۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

ٹرانزیکشن کو مکمل کرنے کی اجازت دینے کے لیے کتنی گیس ضروری ہے اس کا تخمینہ تیار کرتا ہے اور واپس کرتا ہے۔ ٹرانزیکشن بلاک چین میں شامل نہیں کی جائے گی۔ نوٹ کریں کہ تخمینہ ٹرانزیکشن کے ذریعہ اصل میں استعمال ہونے والی گیس کی مقدار سے نمایاں طور پر زیادہ ہو سکتا ہے، جس کی مختلف وجوہات ہیں جن میں EVM میکانکس اور نوڈ کی کارکردگی شامل ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

[eth_call](#eth_call) پیرامیٹرز دیکھیں، سوائے اس کے کہ تمام خصوصیات اختیاری ہیں۔ اگر کوئی گیس کی حد متعین نہیں ہے تو geth زیر التواء بلاک سے بلاک گیس کی حد کو اوپری حد کے طور پر استعمال کرتا ہے۔ نتیجے کے طور پر، واپس کیا گیا تخمینہ کال/ٹرانزیکشن کو ایگزیکیوٹ کرنے کے لیے کافی نہیں ہو سکتا جب گیس کی مقدار پینڈنگ بلاک گیس کی حد سے زیادہ ہو۔

**واپسی**

`QUANTITY` - استعمال شدہ گیس کی مقدار۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

ہیش کے ذریعے ایک بلاک کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک بلاک کا ہیش۔
2. `Boolean` - اگر `true` ہے تو یہ مکمل ٹرانزیکشن آبجیکٹ واپس کرتا ہے، اگر `false` ہے تو صرف ٹرانزیکشنز کے ہیش۔

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**واپسی**

`Object` - ایک بلاک آبجیکٹ، یا `null` جب کوئی بلاک نہیں ملا:

- `number`: `QUANTITY` - بلاک نمبر۔ جب یہ زیر التواء بلاک ہو تو `null`۔
- `hash`: `DATA`، 32 بائٹس - بلاک کا ہیش۔ جب یہ زیر التواء بلاک ہو تو `null`۔
- `parentHash`: `DATA`، 32 بائٹس - پیرنٹ بلاک کا ہیش۔
- `nonce`: `DATA`، 8 بائٹس - پیدا کردہ پروف-آف-ورک کا ہیش۔ جب یہ زیر التواء بلاک ہو تو `null`، پروف-آف-اسٹیک بلاکس کے لیے `0x0` (The Merge کے بعد سے)
- `sha3Uncles`: `DATA`، 32 بائٹس - بلاک میں انکل ڈیٹا کا SHA3۔
- `logsBloom`: `DATA`، 256 بائٹس - بلاک کے لاگز کے لیے بلوم فلٹر۔ جب یہ زیر التواء بلاک ہو تو `null`۔
- `transactionsRoot`: `DATA`، 32 بائٹس - بلاک کے ٹرانزیکشن ٹرائی کی جڑ۔
- `stateRoot`: `DATA`، 32 بائٹس - بلاک کے حتمی اسٹیٹ ٹرائی کی جڑ۔
- `receiptsRoot`: `DATA`، 32 بائٹس - بلاک کے رسید ٹرائی کی جڑ۔
- `miner`: `DATA`، 20 بائٹس - مستفید ہونے والے کا پتہ جسے بلاک کے انعامات دیئے گئے تھے۔
- `difficulty`: `QUANTITY` - اس بلاک کے لیے مشکل کا انٹیجر۔
- `totalDifficulty`: `QUANTITY` - اس بلاک تک زنجیر کی کل مشکل کا انٹیجر۔
- `extraData`: `DATA` - اس بلاک کا "اضافی ڈیٹا" فیلڈ۔
- `size`: `QUANTITY` - اس بلاک کا سائز بائٹس میں انٹیجر۔
- `gasLimit`: `QUANTITY` - اس بلاک میں اجازت دی گئی زیادہ سے زیادہ گیس۔
- `gasUsed`: `QUANTITY` - اس بلاک میں تمام ٹرانزیکشنز کے ذریعہ استعمال ہونے والی کل گیس۔
- `timestamp`: `QUANTITY` - جب بلاک کو جمع کیا گیا تھا اس کا یونکس ٹائم اسٹیمپ۔
- `transactions`: `Array` - ٹرانزیکشن آبجیکٹ کا ارے، یا 32 بائٹس ٹرانزیکشن ہیش جو آخری دیئے گئے پیرامیٹر پر منحصر ہے۔
- `uncles`: `Array` - انکل ہیشز کا ارے۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// نتیجہ
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

بلاک نمبر کے ذریعے ایک بلاک کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر کا انٹیجر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"` یا `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔
2. `Boolean` - اگر `true` ہے تو یہ مکمل ٹرانزیکشن آبجیکٹ واپس کرتا ہے، اگر `false` ہے تو صرف ٹرانزیکشنز کے ہیش۔

```js
params: [
  "0x1b4", // 436
  true,
]
```

**واپسی**
[eth_getBlockByHash](#eth_getblockbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

نتیجہ [eth_getBlockByHash](#eth_getblockbyhash) دیکھیں

### eth_getTransactionByHash {#eth_gettransactionbyhash}

ٹرانزیکشن ہیش کے ذریعے درخواست کردہ ٹرانزیکشن کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک ٹرانزیکشن کا ہیش

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**واپسی**

`Object` - ایک ٹرانزیکشن آبجیکٹ، یا `null` جب کوئی ٹرانزیکشن نہیں ملا:

- `blockHash`: `DATA`، 32 بائٹس - اس بلاک کا ہیش جہاں یہ ٹرانزیکشن تھی۔ جب یہ زیر التواء ہو تو `null`۔
- `blockNumber`: `QUANTITY` - بلاک نمبر جہاں یہ ٹرانزیکشن تھی۔ جب یہ زیر التواء ہو تو `null`۔
- `from`: `DATA`، 20 بائٹس - بھیجنے والے کا پتہ۔
- `gas`: `QUANTITY` - بھیجنے والے کے ذریعہ فراہم کردہ گیس۔
- `gasPrice`: `QUANTITY` - بھیجنے والے کے ذریعہ فراہم کردہ گیس کی قیمت Wei میں۔
- `hash`: `DATA`، 32 بائٹس - ٹرانزیکشن کا ہیش۔
- `input`: `DATA` - ٹرانزیکشن کے ساتھ بھیجا گیا ڈیٹا۔
- `nonce`: `QUANTITY` - بھیجنے والے کے ذریعہ اس سے پہلے کی گئی ٹرانزیکشنز کی تعداد۔
- `to`: `DATA`، 20 بائٹس - وصول کنندہ کا پتہ۔ جب یہ ایک کنٹریکٹ تخلیق ٹرانزیکشن ہو تو `null`۔
- `transactionIndex`: `QUANTITY` - بلاک میں ٹرانزیکشنز انڈیکس پوزیشن کا انٹیجر۔ جب یہ زیر التواء ہو تو `null`۔
- `value`: `QUANTITY` - Wei میں منتقل کی گئی قیمت۔
- `v`: `QUANTITY` - ECDSA ریکوری آئی ڈی
- `r`: `QUANTITY` - ECDSA دستخط r
- `s`: `QUANTITY` - ECDSA دستخط s

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// نتیجہ
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

بلاک ہیش اور ٹرانزیکشن انڈیکس پوزیشن کے ذریعے ایک ٹرانزیکشن کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک بلاک کا ہیش۔
2. `QUANTITY` - ٹرانزیکشن انڈیکس پوزیشن کا انٹیجر۔

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**واپسی**
[eth_getTransactionByHash](#eth_gettransactionbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

نتیجہ [eth_getTransactionByHash](#eth_gettransactionbyhash) دیکھیں

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

بلاک نمبر اور ٹرانزیکشن انڈیکس پوزیشن کے ذریعے ایک ٹرانزیکشن کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"` یا `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔
2. `QUANTITY` - ٹرانزیکشن انڈیکس پوزیشن۔

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**واپسی**
[eth_getTransactionByHash](#eth_gettransactionbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

نتیجہ [eth_getTransactionByHash](#eth_gettransactionbyhash) دیکھیں

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

ٹرانزیکشن ہیش کے ذریعے ٹرانزیکشن کی رسید واپس کرتا ہے۔

**نوٹ** یہ کہ رسید زیر التواء ٹرانزیکشنز کے لیے دستیاب نہیں ہے۔

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک ٹرانزیکشن کا ہیش

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**واپسی**
`Object` - ایک ٹرانزیکشن رسید آبجیکٹ، یا `null` جب کوئی رسید نہیں ملی:

- `transactionHash `: `DATA`، 32 بائٹس - ٹرانزیکشن کا ہیش۔
- `transactionIndex`: `QUANTITY` - بلاک میں ٹرانزیکشنز انڈیکس پوزیشن کا انٹیجر۔
- `blockHash`: `DATA`، 32 بائٹس - اس بلاک کا ہیش جہاں یہ ٹرانزیکشن تھی۔
- `blockNumber`: `QUANTITY` - بلاک نمبر جہاں یہ ٹرانزیکشن تھی۔
- `from`: `DATA`، 20 بائٹس - بھیجنے والے کا پتہ۔
- `to`: `DATA`، 20 بائٹس - وصول کنندہ کا پتہ۔ جب یہ ایک کنٹریکٹ تخلیق ٹرانزیکشن ہو تو null۔
- `cumulativeGasUsed` : `QUANTITY ` - جب یہ ٹرانزیکشن بلاک میں نافذ کی گئی تھی تو استعمال ہونے والی گیس کی کل مقدار۔
- `effectiveGasPrice` : `QUANTITY` - بنیادی فیس اور فی یونٹ گیس ادا کی گئی ٹپ کا مجموعہ۔
- `gasUsed `: `QUANTITY ` - صرف اس مخصوص ٹرانزیکشن کے ذریعہ استعمال ہونے والی گیس کی مقدار۔
- `contractAddress `: `DATA`، 20 بائٹس - تخلیق کردہ کنٹریکٹ کا پتہ، اگر ٹرانزیکشن کنٹریکٹ تخلیق تھی، ورنہ `null`۔
- `logs`: `Array` - لاگ آبجیکٹ کا ارے، جو اس ٹرانزیکشن نے پیدا کیا۔
- `logsBloom`: `DATA`، 256 بائٹس - ہلکے کلائنٹس کے لیے متعلقہ لاگز کو تیزی سے بازیافت کرنے کے لیے بلوم فلٹر۔
- `type`: `QUANTITY` - ٹرانزیکشن کی قسم کا انٹیجر، میراثی ٹرانزیکشنز کے لیے `0x0`، رسائی فہرست کی اقسام کے لیے `0x1`، متحرک فیس کے لیے `0x2`۔

یہ _یا تو_ بھی واپس کرتا ہے:

- `root` : `DATA` پوسٹ ٹرانزیکشن اسٹیٹ روٹ کے 32 بائٹس (pre Byzantium)
- `status`: `QUANTITY` یا تو `1` (کامیابی) یا `0` (ناکامی)

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// نتیجہ
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // اگر اسے بنایا گیا تھا تو پتے کا سٹرنگ
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs، وغیرہ کے ذریعہ واپس کیے گئے لاگز۔
    }],
    "logsBloom": "0x00...0", // 256 بائٹ بلوم فلٹر
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

ہیش اور انکل انڈیکس پوزیشن کے ذریعے بلاک کے انکل کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، 32 بائٹس - ایک بلاک کا ہیش۔
2. `QUANTITY` - انکل کی انڈیکس پوزیشن۔

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**واپسی**
[eth_getBlockByHash](#eth_getblockbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

نتیجہ [eth_getBlockByHash](#eth_getblockbyhash) دیکھیں

**نوٹ**: ایک انکل میں انفرادی ٹرانزیکشنز نہیں ہوتیں۔

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

نمبر اور انکل انڈیکس پوزیشن کے ذریعے بلاک کے انکل کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"`، `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔
2. `QUANTITY` - انکل کی انڈیکس پوزیشن۔

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**واپسی**
[eth_getBlockByHash](#eth_getblockbyhash) دیکھیں

**نوٹ**: ایک انکل میں انفرادی ٹرانزیکشنز نہیں ہوتیں۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

نتیجہ [eth_getBlockByHash](#eth_getblockbyhash) دیکھیں

### eth_newFilter {#eth_newfilter}

فلٹر آپشنز کی بنیاد پر ایک فلٹر آبجیکٹ بناتا ہے، تاکہ حالت (لاگز) تبدیل ہونے پر مطلع کیا جا سکے۔
یہ چیک کرنے کے لیے کہ آیا حالت تبدیل ہوئی ہے، [eth_getFilterChanges](#eth_getfilterchanges) کو کال کریں۔

**ٹاپک فلٹرز کی وضاحت پر ایک نوٹ:**
ٹاپکس آرڈر پر منحصر ہیں۔ ٹاپکس [A, B] کے ساتھ ایک لاگ کے ساتھ ایک ٹرانزیکشن مندرجہ ذیل ٹاپک فلٹرز سے مماثل ہوگی:

- `[]` "کچھ بھی"
- `[A]` "پہلی پوزیشن میں A (اور اس کے بعد کچھ بھی)"
- `[null, B]` "پہلی پوزیشن میں کچھ بھی اور دوسری پوزیشن میں B (اور اس کے بعد کچھ بھی)"
- `[A, B]` "پہلی پوزیشن میں A اور دوسری پوزیشن میں B (اور اس کے بعد کچھ بھی)"
- `[[A, B], [A, B]]` "پہلی پوزیشن میں (A یا B) اور دوسری پوزیشن میں (A یا B) (اور اس کے بعد کچھ بھی)"
- **پیرامیٹرز**

1. `Object` - فلٹر آپشنز:

- `fromBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری مجوزہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا `"pending"`، ان ٹرانزیکشنز کے لیے `"earliest"` جو ابھی تک بلاک میں نہیں ہیں۔
- `toBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری مجوزہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا `"pending"`، ان ٹرانزیکشنز کے لیے `"earliest"` جو ابھی تک بلاک میں نہیں ہیں۔
- `address`: `DATA|Array`، 20 بائٹس - (اختیاری) کنٹریکٹ کا پتہ یا پتوں کی فہرست جہاں سے لاگز شروع ہونے چاہئیں۔
- `topics`: `Array of DATA`، - (اختیاری) 32 بائٹس `DATA` ٹاپکس کا ارے۔ ٹاپکس آرڈر پر منحصر ہیں۔ ہر ٹاپک "یا" آپشنز کے ساتھ DATA کا ایک ارے بھی ہو سکتا ہے۔

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

**واپسی**
`QUANTITY` - ایک فلٹر آئی ڈی۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

نوڈ میں ایک فلٹر بناتا ہے، تاکہ نیا بلاک آنے پر مطلع کیا جا سکے۔
یہ چیک کرنے کے لیے کہ آیا حالت تبدیل ہوئی ہے، [eth_getFilterChanges](#eth_getfilterchanges) کو کال کریں۔

**پیرامیٹرز**
کوئی نہیں

**واپسی**
`QUANTITY` - ایک فلٹر آئی ڈی۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// نتیجہ
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

نوڈ میں ایک فلٹر بناتا ہے، تاکہ نئی زیر التواء ٹرانزیکشنز آنے پر مطلع کیا جا سکے۔
یہ چیک کرنے کے لیے کہ آیا حالت تبدیل ہوئی ہے، [eth_getFilterChanges](#eth_getfilterchanges) کو کال کریں۔

**پیرامیٹرز**
کوئی نہیں

**واپسی**
`QUANTITY` - ایک فلٹر آئی ڈی۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// نتیجہ
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

دی گئی آئی ڈی کے ساتھ ایک فلٹر کو ان انسٹال کرتا ہے۔ جب واچ کی مزید ضرورت نہ ہو تو ہمیشہ کال کرنا چاہیے۔
اس کے علاوہ فلٹرز اس وقت ٹائم آؤٹ ہو جاتے ہیں جب انہیں کچھ وقت کے لیے [eth_getFilterChanges](#eth_getfilterchanges) کے ساتھ درخواست نہیں کی جاتی۔

**پیرامیٹرز**

1. `QUANTITY` - فلٹر آئی ڈی۔

```js
params: [
  "0xb", // 11
]
```

**واپسی**
`Boolean` - `true` اگر فلٹر کامیابی سے ان انسٹال ہو گیا، ورنہ `false`۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// نتیجہ
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

ایک فلٹر کے لیے پولنگ کا طریقہ، جو آخری پول کے بعد سے ہونے والے لاگز کا ایک ارے واپس کرتا ہے۔

**پیرامیٹرز**

1. `QUANTITY` - فلٹر آئی ڈی۔

```js
params: [
  "0x16", // 22
]
```

**واپسی**
`Array` - لاگ آبجیکٹ کا ارے، یا ایک خالی ارے اگر آخری پول کے بعد سے کچھ بھی تبدیل نہیں ہوا ہے۔

- `eth_newBlockFilter` کے ساتھ بنائے گئے فلٹرز کے لیے، واپسی بلاک ہیشز (`DATA`، 32 بائٹس) ہیں، مثلاً، `["0x3454645634534..."]`۔

- `eth_newPendingTransactionFilter` کے ساتھ بنائے گئے فلٹرز کے لیے، واپسی ٹرانزیکشن ہیشز (`DATA`، 32 بائٹس) ہیں، مثلاً، `["0x6345343454645..."]`۔

- `eth_newFilter` کے ساتھ بنائے گئے فلٹرز کے لیے لاگز مندرجہ ذیل پیرامیٹرز کے ساتھ آبجیکٹ ہیں:
  - `removed`: `TAG` - `true` جب لاگ ہٹا دیا گیا تھا، ایک زنجیر کی تنظیم نو کی وجہ سے۔ `false` اگر یہ ایک درست لاگ ہے۔
  - `logIndex`: `QUANTITY` - بلاک میں لاگ انڈیکس پوزیشن کا انٹیجر۔ جب یہ زیر التواء لاگ ہو تو `null`۔
  - `transactionIndex`: `QUANTITY` - ٹرانزیکشنز انڈیکس پوزیشن کا انٹیجر جس سے لاگ بنایا گیا تھا۔ جب یہ زیر التواء لاگ ہو تو `null`۔
  - `transactionHash`: `DATA`، 32 بائٹس - ان ٹرانزیکشنز کا ہیش جن سے یہ لاگ بنایا گیا تھا۔ جب یہ زیر التواء لاگ ہو تو `null`۔
  - `blockHash`: `DATA`، 32 بائٹس - اس بلاک کا ہیش جہاں یہ لاگ تھا۔ جب یہ زیر التواء ہو تو `null`۔ جب یہ زیر التواء لاگ ہو تو `null`۔
  - `blockNumber`: `QUANTITY` - وہ بلاک نمبر جہاں یہ لاگ تھا۔ جب یہ زیر التواء ہو تو `null`۔ جب یہ زیر التواء لاگ ہو تو `null`۔
  - `address`: `DATA`، 20 بائٹس - وہ پتہ جہاں سے یہ لاگ شروع ہوا۔
  - `data`: `DATA` - متغیر لمبائی والا غیر انڈیکس شدہ لاگ ڈیٹا۔ (_solidity_ میں: صفر یا زیادہ 32 بائٹس کے غیر انڈیکس شدہ لاگ آرگیومنٹس۔)
  - `topics`: `Array of DATA` - 0 سے 4 32 بائٹس `DATA` کے انڈیکس شدہ لاگ آرگیومنٹس کا ارے۔ (_solidity_ میں: پہلا ٹاپک ایونٹ کے دستخط کا _hash_ ہے (مثلاً، `Deposit(address,bytes32,uint256)`), سوائے اس کے کہ آپ نے `anonymous` اسپیسیفائر کے ساتھ ایونٹ کا اعلان کیا ہو۔)

- **مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// نتیجہ
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

دی گئی آئی ڈی کے ساتھ فلٹر سے مماثل تمام لاگز کا ایک ارے واپس کرتا ہے۔

**پیرامیٹرز**

1. `QUANTITY` - فلٹر آئی ڈی۔

```js
params: [
  "0x16", // 22
]
```

**واپسی**
[eth_getFilterChanges](#eth_getfilterchanges) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

نتیجہ [eth_getFilterChanges](#eth_getfilterchanges) دیکھیں

### eth_getLogs {#eth_getlogs}

ایک دیئے گئے فلٹر آبجیکٹ سے مماثل تمام لاگز کا ایک ارے واپس کرتا ہے۔

**پیرامیٹرز**

1. `Object` - فلٹر آپشنز:

- `fromBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری مجوزہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا `"pending"`، ان ٹرانزیکشنز کے لیے `"earliest"` جو ابھی تک بلاک میں نہیں ہیں۔
- `toBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری مجوزہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا `"pending"`، ان ٹرانزیکشنز کے لیے `"earliest"` جو ابھی تک بلاک میں نہیں ہیں۔
- `address`: `DATA|Array`، 20 بائٹس - (اختیاری) کنٹریکٹ کا پتہ یا پتوں کی فہرست جہاں سے لاگز شروع ہونے چاہئیں۔
- `topics`: `Array of DATA`، - (اختیاری) 32 بائٹس `DATA` ٹاپکس کا ارے۔ ٹاپکس آرڈر پر منحصر ہیں۔ ہر ٹاپک "یا" آپشنز کے ساتھ DATA کا ایک ارے بھی ہو سکتا ہے۔
- `blockHash`: `DATA`, 32 Bytes - (اختیاری، **مستقبل میں**) EIP-234 کے اضافے کے ساتھ، `blockHash` ایک نیا فلٹر آپشن ہوگا جو واپس کیے گئے لاگز کو 32-بائٹ ہیش `blockHash` کے ساتھ واحد بلاک تک محدود کر دے گا۔ `blockHash` کا استعمال `fromBlock` = `toBlock` = `blockHash` ہیش والے بلاک نمبر کے برابر ہے۔ اگر فلٹر کے معیار میں `blockHash` موجود ہے، تو نہ `fromBlock` اور نہ ہی `toBlock` کی اجازت ہے۔

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**واپسی**
[eth_getFilterChanges](#eth_getfilterchanges) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

نتیجہ [eth_getFilterChanges](#eth_getfilterchanges) دیکھیں

## استعمال کی مثال {#usage-example}

### JSON_RPC کا استعمال کرتے ہوئے کانٹریکٹ کو ڈیپلائے کرنا {#deploying-contract}

اس سیکشن میں یہ دکھایا گیا ہے کہ صرف RPC انٹرفیس کا استعمال کرتے ہوئے کانٹریکٹ کو کیسے ڈیپلائے کیا جائے۔ کانٹریکٹس کو ڈیپلائے کرنے کے متبادل راستے بھی ہیں جہاں اس پیچیدگی کو دور کر دیا جاتا ہے—مثال کے طور پر، RPC انٹرفیس کے اوپر بنی لائبریریوں کا استعمال کرتے ہوئے جیسے [web3.js](https://web3js.readthedocs.io/) اور [web3.py](https://github.com/ethereum/web3.py)۔ یہ ایبسٹریکشنز عام طور پر سمجھنے میں آسان اور کم غلطی کے امکان والی ہوتی ہیں، لیکن یہ سمجھنا اب بھی مددگار ہے کہ پس پردہ کیا ہو رہا ہے۔

درج ذیل ایک سیدھا سادا اسمارٹ کانٹریکٹ ہے جسے `Multiply7` کہا جاتا ہے جسے JSON-RPC انٹرفیس کا استعمال کرتے ہوئے ایک Ethereum نوڈ پر ڈیپلائے کیا جائے گا۔ یہ ٹیوٹوریل یہ فرض کرتا ہے کہ پڑھنے والا پہلے سے ہی Geth نوڈ چلا رہا ہے۔ نوڈز اور کلائنٹس کے بارے میں مزید معلومات [یہاں](/developers/docs/nodes-and-clients/run-a-node) دستیاب ہیں۔ براہ کرم غیر-Geth کلائنٹس کے لیے HTTP JSON-RPC شروع کرنے کا طریقہ دیکھنے کے لیے انفرادی [کلائنٹ](/developers/docs/nodes-and-clients/) کی دستاویزات دیکھیں۔ زیادہ تر کلائنٹس `localhost:8545` پر سروس فراہم کرنے کے لیے ڈیفالٹ ہوتے ہیں۔

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

سب سے پہلا کام یہ یقینی بنانا ہے کہ HTTP RPC انٹرفیس فعال ہے۔ اس کا مطلب ہے کہ ہم Geth کو اسٹارٹ اپ پر `--http` فلیگ فراہم کرتے ہیں۔ اس مثال میں ہم ایک پرائیویٹ ڈیولپمنٹ چین پر Geth نوڈ کا استعمال کرتے ہیں۔ اس طریقے کا استعمال کرتے ہوئے ہمیں حقیقی نیٹ ورک پر ایتھر کی ضرورت نہیں ہے۔

```bash
geth --http --dev console 2>>geth.log
```

یہ HTTP RPC انٹرفیس کو `http://localhost:8545` پر شروع کر دے گا۔

ہم اس بات کی تصدیق کر سکتے ہیں کہ انٹرفیس چل رہا ہے، اس کے لیے ہم کوئن بیس ایڈریس (اکاؤنٹس کی صف سے پہلا ایڈریس حاصل کر کے) اور [curl](https://curl.se) کا استعمال کرتے ہوئے بیلنس حاصل کریں گے۔ براہ کرم نوٹ کریں کہ ان مثالوں میں ڈیٹا آپ کے مقامی نوڈ پر مختلف ہوگا۔ اگر آپ ان کمانڈز کو آزمانا چاہتے ہیں، تو دوسری curl درخواست میں موجود درخواست کے پیرامیٹرز کو پہلی سے واپس آنے والے نتیجے سے بدل دیں۔

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

چونکہ نمبرز ہیکس انکوڈڈ ہوتے ہیں، اس لیے بیلنس کو wei میں ہیکس اسٹرنگ کے طور پر واپس کیا جاتا ہے۔ اگر ہم بیلنس کو ایتھر میں ایک نمبر کے طور پر چاہتے ہیں تو ہم Geth کنسول سے web3 استعمال کر سکتے ہیں۔

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

اب جب کہ ہماری پرائیویٹ ڈیولپمنٹ چین پر کچھ ایتھر موجود ہے، ہم کانٹریکٹ کو ڈیپلائے کر سکتے ہیں۔ پہلا قدم Multiply7 کانٹریکٹ کو بائٹ کوڈ میں کمپائل کرنا ہے جسے EVM کو بھیجا جا سکتا ہے۔ solc، Solidity کمپائلر کو انسٹال کرنے کے لیے، [Solidity کی دستاویزات](https://docs.soliditylang.org/en/latest/installing-solidity.html) پر عمل کریں۔ (ہو سکتا ہے آپ [ہماری مثال کے لیے استعمال ہونے والے کمپائلر کے ورژن](https://github.com/ethereum/solidity/releases/tag/v0.4.20) سے مطابقت کے لیے ایک پرانا `solc` ریلیز استعمال کرنا چاہیں۔)

اگلا قدم Multiply7 کنٹریکٹ کو بائٹ کوڈ میں کمپائل کرنا ہے جسے EVM کو بھیجا جا سکتا ہے۔

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

اب جب کہ ہمارے پاس کمپائل شدہ کوڈ ہے، ہمیں یہ تعین کرنے کی ضرورت ہے کہ اسے ڈیپلائے کرنے میں کتنی گیس لگے گی۔ RPC انٹرفیس میں ایک `eth_estimateGas` طریقہ ہے جو ہمیں ایک تخمینہ دے گا۔

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

اور آخر میں کانٹریکٹ کو ڈیپلائے کریں۔

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

ٹرانزیکشن کو نوڈ کے ذریعے قبول کر لیا جاتا ہے اور ایک ٹرانزیکشن ہیش واپس کر دیا جاتا ہے۔ اس ہیش کا استعمال ٹرانزیکشن کو ٹریک کرنے کے لیے کیا جا سکتا ہے۔ اگلا قدم اس ایڈریس کا تعین کرنا ہے جہاں ہمارا کنٹریکٹ ڈیپلائے کیا گیا ہے۔ ہر ایگزیکیوٹڈ ٹرانزیکشن ایک رسید بنائے گا۔ اس رسید میں ٹرانزیکشن کے بارے میں مختلف معلومات ہوتی ہیں جیسے کہ ٹرانزیکشن کس بلاک میں شامل تھا اور EVM نے کتنی گیس استعمال کی۔ اگر کوئی ٹرانزیکشن
ایک کنٹریکٹ بناتا ہے تو اس میں کنٹریکٹ کا ایڈریس بھی شامل ہوگا۔ ہم `eth_getTransactionReceipt` RPC میتھڈ سے رسید بازیافت کر سکتے ہیں۔

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

ہمارا کنٹریکٹ `0x4d03d617d700cf81935d7f797f4e2ae719648262` پر بنایا گیا تھا۔ رسید کے بجائے ایک null نتیجہ کا مطلب ہے کہ ٹرانزیکشن کو ابھی تک کسی بلاک میں شامل نہیں کیا گیا ہے۔ ایک لمحہ انتظار کریں اور چیک کریں کہ آیا آپ کا consensus client چل رہا ہے اور اسے دوبارہ آزمائیں۔

#### اسمارٹ کنٹریکٹس کے ساتھ انٹریکٹ کرنا {#interacting-with-smart-contract}

اس مثال میں ہم کنٹریکٹ کے `multiply` میتھڈ کو `eth_sendTransaction` کا استعمال کرتے ہوئے ایک ٹرانزیکشن بھیجیں گے۔

`eth_sendTransaction` کو کئی آرگیومنٹس کی ضرورت ہوتی ہے، خاص طور پر `from`، `to` اور `data`۔ `From` ہمارے اکاؤنٹ کا پبلک ایڈریس ہے، اور `to` کنٹریکٹ کا ایڈریس ہے۔ `data` آرگیومنٹ میں ایک پے لوڈ ہوتا ہے جو یہ بتاتا ہے کہ کس میتھڈ کو کال کرنا ہے اور کن آرگیومنٹس کے ساتھ۔ یہ وہ جگہ ہے جہاں [ABI (ایپلی کیشن بائنری انٹرفیس)](https://docs.soliditylang.org/en/latest/abi-spec.html) کام میں آتا ہے۔ ABI ایک JSON فائل ہے جو EVM کے لیے ڈیٹا کی تعریف اور انکوڈ کرنے کا طریقہ بتاتی ہے۔

پے لوڈ کے بائٹس یہ بتاتے ہیں کہ کنٹریکٹ میں کس میتھڈ کو کال کیا گیا ہے۔ یہ فنکشن کے نام اور اس کے آرگیومنٹ کی اقسام پر Keccak ہیش سے پہلے 4 بائٹس ہیں، جو ہیکس انکوڈڈ ہیں۔ ملٹی پلائی فنکشن ایک uint کو قبول کرتا ہے جو uint256 کے لیے ایک الیاس ہے۔ اس سے ہمارے پاس بچتا ہے:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

اگلا قدم آرگیومنٹس کو انکوڈ کرنا ہے۔ صرف ایک uint256 ہے، مثال کے طور پر، قدر 6۔ ABI میں ایک سیکشن ہے جو یہ بتاتا ہے کہ uint256 کی اقسام کو کیسے انکوڈ کیا جائے۔

`int<M>: enc(X)` X کی big-endian two’s complement انکوڈنگ ہے، جسے منفی X کے لیے ہائی آرڈر (بائیں) طرف 0xff کے ساتھ اور مثبت X کے لیے صفر > بائٹس کے ساتھ پیڈ کیا گیا ہے تاکہ لمبائی 32 بائٹس کا ضرب ہو۔

یہ `0000000000000000000000000000000000000000000000000000000000000006` میں انکوڈ ہوتا ہے۔

فنکشن سلیکٹر اور انکوڈڈ آرگیومنٹ کو ملا کر ہمارا ڈیٹا `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` ہوگا۔

اسے اب نوڈ کو بھیجا جا سکتا ہے:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

چونکہ ایک ٹرانزیکشن بھیجا گیا تھا، ایک ٹرانزیکشن ہیش واپس کیا گیا تھا۔ رسید بازیافت کرنے پر ملتا ہے:

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

رسید میں ایک لاگ ہوتا ہے۔ یہ لاگ EVM کے ذریعے ٹرانزیکشن کے ایگزیکیوشن پر بنایا گیا تھا اور رسید میں شامل کیا گیا تھا۔ `multiply` فنکشن دکھاتا ہے کہ `Print` ایونٹ ان پٹ کے 7 گنا کے ساتھ ریز کیا گیا تھا۔ چونکہ `Print` ایونٹ کے لیے آرگیومنٹ ایک uint256 تھا، ہم اسے ABI کے اصولوں کے مطابق ڈی کوڈ کر سکتے ہیں جو ہمیں متوقع ڈیسیمل 42 کے ساتھ چھوڑ دے گا۔ ڈیٹا کے علاوہ یہ بات قابل غور ہے کہ ٹاپکس کا استعمال یہ تعین کرنے کے لیے کیا جا سکتا ہے کہ کس ایونٹ نے لاگ بنایا:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

یہ کچھ سب سے عام کاموں کا ایک مختصر تعارف تھا، جو JSON-RPC کے براہ راست استعمال کو ظاہر کرتا ہے۔

## متعلقہ موضوعات {#related-topics}

- [JSON-RPC کی تفصیلات](http://www.jsonrpc.org/specification)
- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [بیک اینڈ APIs](/developers/docs/apis/backend/)
- [ایگزیکیوشن کلائنٹس](/developers/docs/nodes-and-clients/#execution-clients)
