---
title: جے سن آر پی سی ⁦API⁩
description: ایتھیریم کلائنٹس کے لیے ایک سٹیٹ لیس، ہلکا پھلکا ریموٹ پروسیجر کال (⁦RPC⁩) پروٹوکول۔
lang: ur
---

کسی سافٹ ویئر ایپلی کیشن کو [ایتھیریم](/) بلاک چین کے ساتھ تعامل کرنے کے لیے - چاہے وہ بلاک چین کا ڈیٹا پڑھنا ہو یا نیٹ ورک پر ٹرانزیکشنز بھیجنا ہو - اسے ایک ایتھیریم نوڈ سے منسلک ہونا ضروری ہے۔

اس مقصد کے لیے، ہر [ایتھیریم کلائنٹ](/developers/docs/nodes-and-clients/#execution-clients) ایک [جے سن آر پی سی تصریح](https://github.com/ethereum/execution-apis) کو نافذ کرتا ہے، تاکہ طریقوں کا ایک یکساں مجموعہ موجود ہو جس پر ایپلی کیشنز انحصار کر سکیں، قطع نظر اس کے کہ مخصوص نوڈ یا کلائنٹ کا نفاذ کیا ہے۔

[جے سن آر پی سی](https://www.jsonrpc.org/specification) ایک سٹیٹ لیس، ہلکا پھلکا ریموٹ پروسیجر کال (<span dir="ltr">RPC</span>) پروٹوکول ہے۔ یہ کئی ڈیٹا سٹرکچرز اور ان کی پروسیسنگ کے اصولوں کی وضاحت کرتا ہے۔ یہ ٹرانسپورٹ کے لحاظ سے غیر جانبدار ہے، یعنی ان تصورات کو ایک ہی پروسیس کے اندر، ساکٹس پر، <span dir="ltr">HTTP</span> پر، یا پیغام رسانی کے مختلف ماحول میں استعمال کیا جا سکتا ہے۔ یہ ڈیٹا فارمیٹ کے طور پر <span dir="ltr">JSON (RFC 4627)</span> کا استعمال کرتا ہے۔

## کلائنٹ کے عمل درآمد {#client-implementations}

ایتھیریم کلائنٹس جے سن آر پی سی کی تفصیلات پر عمل درآمد کرتے وقت مختلف پروگرامنگ زبانیں استعمال کر سکتے ہیں۔ مخصوص پروگرامنگ زبانوں سے متعلق مزید تفصیلات کے لیے انفرادی [کلائنٹ کی دستاویزات](/developers/docs/nodes-and-clients/#execution-clients) دیکھیں۔ ہم تجویز کرتے ہیں کہ تازہ ترین <span dir="ltr">API</span> سپورٹ کی معلومات کے لیے ہر کلائنٹ کی دستاویزات چیک کریں۔

## سہولت کی لائبریریاں {#convenience-libraries}

اگرچہ آپ جے سن آر پی سی API کے ذریعے ایتھیریم کلائنٹس کے ساتھ براہ راست تعامل کرنے کا انتخاب کر سکتے ہیں، لیکن غیر مرکزی ایپلی کیشن (dapp) کے ڈیولپرز کے لیے اکثر آسان اختیارات موجود ہوتے ہیں۔ بہت سی [JavaScript](/developers/docs/apis/javascript/#available-libraries) اور [بیک اینڈ API](/developers/docs/apis/backend/#available-libraries) لائبریریاں موجود ہیں جو جے سن آر پی سی API کے اوپر ریپرز فراہم کرتی ہیں۔ ان لائبریریوں کی مدد سے، ڈیولپرز اپنی پسند کی پروگرامنگ زبان میں آسان اور ایک لائن کے طریقے (methods) لکھ سکتے ہیں تاکہ (اندرونی طور پر) جے سن آر پی سی درخواستیں شروع کی جا سکیں جو ایتھیریم کے ساتھ تعامل کرتی ہیں۔

## اتفاقِ رائے کے کلائنٹ کی APIs {#consensus-clients}

یہ صفحہ بنیادی طور پر جے سن آر پی سی API سے متعلق ہے جسے ایتھیریم ایگزیکیوشن کلائنٹس استعمال کرتے ہیں۔ تاہم، اتفاقِ رائے کے کلائنٹس میں ایک <span dir="ltr">RPC API</span> بھی ہوتی ہے جو صارفین کو اس بات کی اجازت دیتی ہے کہ وہ براہ راست کسی نوڈ سے نوڈ کے بارے میں معلومات طلب کریں، بیکن بلاکس، بیکن کی حالت، اور اتفاقِ رائے سے متعلق دیگر معلومات کی درخواست کریں۔ اس API کی دستاویزات [بیکن API کے ویب پیج](https://ethereum.github.io/beacon-APIs/#/) پر موجود ہیں۔

ایک نوڈ کے اندر کلائنٹس کے درمیان رابطے کے لیے ایک اندرونی API بھی استعمال ہوتی ہے - یعنی، یہ اتفاقِ رائے کے کلائنٹ اور ایگزیکیوشن کلائنٹ کو ڈیٹا کا تبادلہ کرنے کے قابل بناتی ہے۔ اسے '<span dir="ltr">Engine API</span>' کہا جاتا ہے اور اس کی تفصیلات [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) پر دستیاب ہیں۔

## ایگزیکیوشن کلائنٹ کی تفصیلات {#spec}

[<span dir="ltr">GitHub</span> پر مکمل جے سن آر پی سی <span dir="ltr">API</span> کی تفصیلات پڑھیں](https://github.com/ethereum/execution-apis)۔ اس <span dir="ltr">API</span> کی دستاویزات [ایگزیکیوشن <span dir="ltr">API</span> ویب پیج](https://ethereum.github.io/execution-apis/) پر موجود ہیں اور اس میں تمام دستیاب میتھڈز کو آزمانے کے لیے ایک انسپکٹر شامل ہے۔

## روایات {#conventions}

### ہیکس ویلیو انکوڈنگ {#hex-encoding}

<span dir="ltr">JSON</span> پر دو اہم ڈیٹا ٹائپس پاس کی جاتی ہیں: غیر فارمیٹ شدہ بائٹ ایریز اور مقداریں۔ دونوں کو ہیکس انکوڈنگ کے ساتھ پاس کیا جاتا ہے لیکن فارمیٹنگ کے لیے مختلف تقاضوں کے ساتھ۔

#### مقداریں {#quantities-encoding}

مقداروں (انٹیجرز، اعداد) کو انکوڈ کرتے وقت: ہیکس کے طور پر انکوڈ کریں، سابقہ <span dir="ltr">"0x"</span> لگائیں، جو کہ سب سے مختصر نمائندگی ہے (معمولی استثنیٰ: صفر کو <span dir="ltr">"0x0"</span> کے طور پر پیش کیا جانا چاہیے)۔

یہاں کچھ مثالیں ہیں:

- <span dir="ltr">0x41</span> (اعشاریہ میں 65)
- <span dir="ltr">0x400</span> (اعشاریہ میں 1024)
- غلط: <span dir="ltr">0x</span> (ہمیشہ کم از کم ایک ہندسہ ہونا چاہیے - صفر <span dir="ltr">"0x0"</span> ہے)
- غلط: <span dir="ltr">0x0400</span> (شروع میں صفر کی اجازت نہیں ہے)
- غلط: <span dir="ltr">ff</span> (سابقہ <span dir="ltr">0x</span> ہونا لازمی ہے)

### غیر فارمیٹ شدہ ڈیٹا {#unformatted-data-encoding}

غیر فارمیٹ شدہ ڈیٹا (بائٹ ایریز، اکاؤنٹ کے پتے، ہیشز، بائٹ کوڈ ایریز) کو انکوڈ کرتے وقت: ہیکس کے طور پر انکوڈ کریں، سابقہ <span dir="ltr">"0x"</span> لگائیں، فی بائٹ دو ہیکس ہندسے۔

یہاں کچھ مثالیں ہیں:

- <span dir="ltr">0x41</span> (سائز 1، <span dir="ltr">"A"</span>)
- <span dir="ltr">0x004200</span> (سائز 3، <span dir="ltr">"0B0"</span>)
- <span dir="ltr">0x</span> (سائز 0، "")
- غلط: <span dir="ltr">0xf0f0f</span> (ہندسوں کی تعداد جفت ہونی چاہیے)
- غلط: <span dir="ltr">004200</span> (سابقہ <span dir="ltr">0x</span> ہونا لازمی ہے)

### بلاک پیرامیٹر {#block-parameter}

مندرجہ ذیل طریقوں (methods) میں ایک بلاک پیرامیٹر ہوتا ہے:

- [<span dir="ltr">eth_getBalance</span>](#eth-getbalance)
- [<span dir="ltr">eth_getCode</span>](#eth-getcode)
- [<span dir="ltr">eth_getTransactionCount</span>](#eth-gettransactioncount)
- [<span dir="ltr">eth_getStorageAt</span>](#eth-getstorageat)
- [<span dir="ltr">eth_call</span>](#eth-call)

جب ایسی درخواستیں کی جاتی ہیں جو ایتھیریم کی حالت (state) کے بارے میں استفسار کرتی ہیں، تو فراہم کردہ بلاک پیرامیٹر بلاک کی اونچائی (height) کا تعین کرتا ہے۔

بلاک پیرامیٹر کے لیے مندرجہ ذیل اختیارات ممکن ہیں:

- `HEX String` - ایک انٹیجر بلاک نمبر
- `String "earliest"` سب سے پہلے/ابتدائی بلاک کے لیے
- `String "latest"` - تازہ ترین تجویز کردہ بلاک کے لیے
- `String "safe"` - تازہ ترین محفوظ ہیڈ بلاک کے لیے
- `String "finalized"` - تازہ ترین حتمی بلاک کے لیے
- `String "pending"` - زیر التواء حالت/ٹرانزیکشنز کے لیے

## مثالیں {#examples}

اس صفحے پر ہم کمانڈ لائن ٹول، [<span dir="ltr">curl</span>](https://curl.se) کا استعمال کرتے ہوئے انفرادی جے سن آر پی سی <span dir="ltr">API</span> اینڈ پوائنٹس کو استعمال کرنے کی مثالیں فراہم کرتے ہیں۔ یہ انفرادی اینڈ پوائنٹ کی مثالیں نیچے [<span dir="ltr">Curl</span> کی مثالیں](#curl-examples) کے سیکشن میں مل سکتی ہیں۔ صفحے میں مزید نیچے، ہم ایک <span dir="ltr">Geth</span> نوڈ، جے سن آر پی سی <span dir="ltr">API</span> اور <span dir="ltr">curl</span> کا استعمال کرتے ہوئے ایک سمارٹ کنٹریکٹ کی کمپائلنگ اور اسے تعینات کرنے کے لیے ایک [اینڈ ٹو اینڈ مثال](#usage-example) بھی فراہم کرتے ہیں۔

## <span dir="ltr">Curl</span> کی مثالیں {#curl-examples}

ایک ایتھیریم نوڈ کو [<span dir="ltr">curl</span>](https://curl.se) درخواستیں بھیج کر جے سن آر پی سی <span dir="ltr">API</span> استعمال کرنے کی مثالیں ذیل میں فراہم کی گئی ہیں۔ ہر مثال میں مخصوص اینڈ پوائنٹ کی تفصیل، اس کے پیرامیٹرز، واپسی کی قسم، اور اسے استعمال کرنے کے طریقے کی ایک عملی مثال شامل ہے۔

<span dir="ltr">curl</span> کی درخواستیں مواد کی قسم سے متعلق خرابی کا پیغام واپس کر سکتی ہیں۔ اس کی وجہ یہ ہے کہ `--data` آپشن مواد کی قسم کو `application/x-www-form-urlencoded` پر سیٹ کرتا ہے۔ اگر آپ کا نوڈ اس بارے میں ایرر دیتا ہے، تو کال کے آغاز میں `-H "Content-Type: application/json"` رکھ کر دستی طور پر ہیڈر سیٹ کریں۔ مثالوں میں <span dir="ltr">URL/IP</span> اور پورٹ کا امتزاج بھی شامل نہیں ہے جو <span dir="ltr">curl</span> کو دیا جانے والا آخری آرگومنٹ ہونا چاہیے (جیسے، `127.0.0.1:8545`)۔ ان اضافی ڈیٹا پر مشتمل ایک مکمل <span dir="ltr">curl</span> درخواست درج ذیل شکل اختیار کرتی ہے:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## گپ شپ، حالت، تاریخ {#gossip-state-history}

چند بنیادی جے سن آر پی سی طریقوں کو ایتھیریم نیٹ ورک سے ڈیٹا درکار ہوتا ہے، اور یہ صاف طور پر تین اہم زمروں میں آتے ہیں: _گپ شپ، حالت، اور تاریخ_۔ ہر طریقے پر جانے کے لیے ان حصوں میں موجود لنکس کا استعمال کریں، یا طریقوں کی پوری فہرست دریافت کرنے کے لیے فہرستِ مضامین کا استعمال کریں۔

### گپ شپ کے طریقے {#gossip-methods}

> یہ طریقے چین کے سرے کو ٹریک کرتے ہیں۔ اسی طرح ٹرانزیکشنز نیٹ ورک میں اپنا راستہ بناتی ہیں، بلاکس میں شامل ہوتی ہیں، اور کلائنٹس کو نئے بلاکس کے بارے میں پتہ چلتا ہے۔

- [<span dir="ltr">eth_blockNumber</span>](#eth-blocknumber)
- [<span dir="ltr">eth_sendRawTransaction</span>](#eth-sendrawtransaction)

### حالت کے طریقے {#state-methods}

> وہ طریقے جو تمام محفوظ کردہ ڈیٹا کی موجودہ حالت کی اطلاع دیتے ہیں۔ "حالت" ایک بڑے مشترکہ <span dir="ltr">RAM</span> کے ٹکڑے کی طرح ہے، اور اس میں اکاؤنٹ کے بیلنس، کنٹریکٹ کا ڈیٹا، اور گیس کے تخمینے شامل ہیں۔

- [<span dir="ltr">eth_getBalance</span>](#eth-getbalance)
- [<span dir="ltr">eth_getStorageAt</span>](#eth-getstorageat)
- [<span dir="ltr">eth_getTransactionCount</span>](#eth-gettransactioncount)
- [<span dir="ltr">eth_getCode</span>](#eth-getcode)
- [<span dir="ltr">eth_call</span>](#eth-call)
- [<span dir="ltr">eth_estimateGas</span>](#eth-estimategas)

### تاریخ کے طریقے {#history-methods}

> ابتدائی بلاک تک ہر بلاک کا تاریخی ریکارڈ حاصل کرتا ہے۔ یہ ایک بڑی ایسی فائل کی طرح ہے جس میں صرف اضافہ کیا جا سکتا ہے، اور اس میں تمام بلاک ہیڈرز، بلاک باڈیز، انکل بلاکس، اور ٹرانزیکشن کی رسیدیں شامل ہیں۔

- [<span dir="ltr">eth_getBlockTransactionCountByHash</span>](#eth-getblocktransactioncountbyhash)
- [<span dir="ltr">eth_getBlockTransactionCountByNumber</span>](#eth-getblocktransactioncountbynumber)
- [<span dir="ltr">eth_getUncleCountByBlockHash</span>](#eth-getunclecountbyblockhash)
- [<span dir="ltr">eth_getUncleCountByBlockNumber</span>](#eth-getunclecountbyblocknumber)
- [<span dir="ltr">eth_getBlockByHash</span>](#eth-getblockbyhash)
- [<span dir="ltr">eth_getBlockByNumber</span>](#eth-getblockbynumber)
- [<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash)
- [<span dir="ltr">eth_getTransactionByBlockHashAndIndex</span>](#eth-gettransactionbyblockhashandindex)
- [<span dir="ltr">eth_getTransactionByBlockNumberAndIndex</span>](#eth-gettransactionbyblocknumberandindex)
- [<span dir="ltr">eth_getTransactionReceipt</span>](#eth-gettransactionreceipt)
- [<span dir="ltr">eth_getUncleByBlockHashAndIndex</span>](#eth-getunclebyblockhashandindex)
- [<span dir="ltr">eth_getUncleByBlockNumberAndIndex</span>](#eth-getunclebyblocknumberandindex)

## جے سن آر پی سی <span dir="ltr">API</span> پلے گراؤنڈ {#json-rpc-api-playground}

آپ <span dir="ltr">API</span> کے طریقوں کو دریافت کرنے اور آزمانے کے لیے [پلے گراؤنڈ ٹول](https://ethereum-json-rpc.com) استعمال کر سکتے ہیں۔ یہ آپ کو یہ بھی دکھاتا ہے کہ مختلف نوڈ فراہم کنندگان کن طریقوں اور نیٹ ورکس کو سپورٹ کرتے ہیں۔

## جے سن آر پی سی API میتھڈز {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

موجودہ کلائنٹ کا ورژن واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

`String` - موجودہ کلائنٹ کا ورژن

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

### <span dir="ltr">web3_sha3</span> {#web3-sha3}

دیے گئے ڈیٹا کا کیچاک-۲۵۶ (_نہ کہ_ معیاری <span dir="ltr">SHA3-256</span>) واپس کرتا ہے۔

**پیرامیٹرز**

1. `DATA` - وہ ڈیٹا جسے <span dir="ltr">SHA3</span> ہیش میں تبدیل کرنا ہے

```js
params: ["0x68656c6c6f20776f726c64"]
```

**واپسی**

`DATA` - دی گئی سٹرنگ کا <span dir="ltr">SHA3</span> نتیجہ۔

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

### net_version {#net-version}

موجودہ نیٹ ورک کی آئی ڈی واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

`String` - موجودہ نیٹ ورک کی آئی ڈی۔

موجودہ نیٹ ورک آئی ڈیز کی مکمل فہرست [<span dir="ltr">chainlist.org</span>](https://chainlist.org) پر دستیاب ہے۔ کچھ عام یہ ہیں:

- `1`: ایتھیریم مین نیٹ
- `11155111`: <span dir="ltr">Sepolia</span> آزمائشی نیٹ ورک
- `560048` : <span dir="ltr">Hoodi</span> آزمائشی نیٹ ورک

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

### net_listening {#net-listening}

اگر کلائنٹ نیٹ ورک کنکشنز کے لیے فعال طور پر سن رہا ہے تو `true` واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`Boolean` - سنتے وقت `true`، بصورت دیگر `false`۔

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

### <span dir="ltr">net_peerCount</span> {#net-peercount}

کلائنٹ سے فی الحال منسلک پیئرز کی تعداد واپس کرتا ہے۔

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

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

### eth_protocolVersion {#eth-protocolversion}

موجودہ ایتھیریم پروٹوکول کا ورژن واپس کرتا ہے۔ نوٹ کریں کہ یہ میتھڈ [Geth میں دستیاب نہیں ہے](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)۔

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

`String` - موجودہ ایتھیریم پروٹوکول کا ورژن

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

### <span dir="ltr">eth_syncing</span> {#eth-syncing}

ہم آہنگی کی حیثیت کے بارے میں ڈیٹا کے ساتھ ایک آبجیکٹ یا `false` واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپس کرتا ہے**

درست واپسی کا ڈیٹا کلائنٹ کے نفاذ کے درمیان مختلف ہوتا ہے۔ جب نوڈ ہم آہنگ نہیں ہو رہا ہوتا ہے تو تمام کلائنٹس `False` واپس کرتے ہیں، اور تمام کلائنٹس درج ذیل فیلڈز واپس کرتے ہیں۔

`Object|Boolean`، ہم آہنگی کی حیثیت کے ڈیٹا کے ساتھ ایک آبجیکٹ یا `FALSE`، جب ہم آہنگ نہ ہو رہا ہو:

- `startingBlock`: `QUANTITY` - وہ بلاک جس پر امپورٹ شروع ہوا (صرف اسی وقت ری سیٹ ہوگا، جب ہم آہنگی اپنے ہیڈ تک پہنچ جائے گی)
- `currentBlock`: `QUANTITY` - موجودہ بلاک، بالکل <span dir="ltr">eth_blockNumber</span> کی طرح
- `highestBlock`: `QUANTITY` - تخمینہ شدہ سب سے اونچا بلاک

تاہم، انفرادی کلائنٹس اضافی ڈیٹا بھی فراہم کر سکتے ہیں۔ مثال کے طور پر Geth درج ذیل واپس کرتا ہے:

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

جبکہ بیسو (Besu) واپس کرتا ہے:

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
// یا جب ہم آہنگی نہیں ہو رہی ہو
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

کلائنٹ کا کوائن بیس پتہ واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

> **نوٹ:** یہ طریقہ **<span dir="ltr">v1.14.0</span>** سے متروک کر دیا گیا ہے اور اب اس کی معاونت نہیں کی جاتی۔ اس طریقے کو استعمال کرنے کی کوشش کے نتیجے میں <span dir="ltr">"Method not supported"</span> کی خرابی ظاہر ہوگی۔

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

`DATA`، 20 بائٹس - موجودہ کوائن بیس پتہ۔

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

### <span dir="ltr">eth_chainId</span> {#eth-chainid}

یہ ری پلے سے محفوظ ٹرانزیکشنز پر دستخط کرنے کے لیے استعمال ہونے والی چین کی <span dir="ltr">ID</span> واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`chainId`، ایک سٹرنگ کے طور پر ہیکسا ڈیسیمل قدر جو موجودہ چین کی <span dir="ltr">ID</span> کے انٹیجر کی نمائندگی کرتی ہے۔

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

### <span dir="ltr">eth_mining</span> {#eth-mining}

اگر کلائنٹ فعال طور پر نئے بلاکس کی کان کنی کر رہا ہے تو `true` لوٹاتا ہے۔ یہ صرف ثبوتِ کار (<span dir="ltr">PoW</span>) نیٹ ورکس کے لیے `true` لوٹا سکتا ہے اور [دی مرج](/roadmap/merge/) کے بعد سے کچھ کلائنٹس میں دستیاب نہیں ہو سکتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`Boolean` - اگر کلائنٹ کان کنی کر رہا ہے تو `true` لوٹاتا ہے، بصورت دیگر `false`۔

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

### eth_hashrate {#eth-hashrate}

یہ فی سیکنڈ ہیشز کی وہ تعداد لوٹاتا ہے جس کے ساتھ نوڈ کان کنی کر رہا ہے۔ یہ ثبوتِ کار (PoW) نیٹ ورکس کے لیے صرف `true` لوٹا سکتا ہے اور [دی مرج](/roadmap/merge/) کے بعد سے کچھ کلائنٹس میں دستیاب نہیں ہو سکتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

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

### <span dir="ltr">eth_gasPrice</span> {#eth-gasprice}

یہ <span dir="ltr">wei</span> میں فی گیس کی موجودہ قیمت کا تخمینہ لوٹاتا ہے۔ مثال کے طور پر، بیسو (<span dir="ltr">Besu</span>) کلائنٹ پچھلے <span dir="ltr">100</span> بلاکس کا جائزہ لیتا ہے اور پہلے سے طے شدہ طور پر گیس کی درمیانی اکائی کی قیمت لوٹاتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**ریٹرنز**

`QUANTITY` - <span dir="ltr">wei</span> میں موجودہ گیس کی قیمت کا انٹیجر۔

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

### eth_accounts {#eth-accounts}

کلائنٹ کی ملکیت والے پتوں کی ایک فہرست واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

کوئی نہیں

**واپسی**

`Array of DATA`، 20 بائٹس - کلائنٹ کی ملکیت والے پتے۔

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

### <span dir="ltr">eth_blockNumber</span> {#eth-blocknumber}

سب سے حالیہ بلاک کا نمبر لوٹاتا ہے۔

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

### eth_getBalance {#eth-getbalance}

کسی دیے گئے پتے پر اکاؤنٹ کا بیلنس واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">20 Bytes</span> - بیلنس چیک کرنے کے لیے پتہ۔
2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"`، یا `"finalized"`، دیکھیں [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**ریٹرنز**

`QUANTITY` - Wei میں موجودہ بیلنس کا انٹیجر۔

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

### <span dir="ltr">eth_getStorageAt</span> {#eth-getstorageat}

کسی دیے گئے پتے پر سٹوریج کی پوزیشن سے قدر واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">20 Bytes</span> - سٹوریج کا پتہ۔
2. `QUANTITY` - سٹوریج میں پوزیشن کا انٹیجر۔
3. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"`، `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

**ریٹرنز**

`DATA` - اس سٹوریج پوزیشن پر قدر۔

**مثال**
درست پوزیشن کا حساب لگانا بازیافت کیے جانے والے سٹوریج پر منحصر ہے۔ فرض کریں کہ درج ذیل کنٹریکٹ پتہ `0x391694e7e0b0cce554cb130d723a9d27458f9298` کے ذریعے `0x295a70b2de5e3953354a6a8344e616ed314d7251` پر تعینات کیا گیا ہے۔

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

<span dir="ltr">pos0</span> کی قدر بازیافت کرنا سیدھا اور آسان ہے:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

میپ کے کسی عنصر کو بازیافت کرنا قدرے مشکل ہے۔ میپ میں کسی عنصر کی پوزیشن کا حساب اس طرح لگایا جاتا ہے:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

اس کا مطلب ہے کہ <span dir="ltr">pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]</span> پر سٹوریج بازیافت کرنے کے لیے ہمیں اس کے ساتھ پوزیشن کا حساب لگانے کی ضرورت ہے:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Web3 لائبریری کے ساتھ آنے والا <span dir="ltr">geth</span> کنسول حساب لگانے کے لیے استعمال کیا جا سکتا ہے:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

اب سٹوریج لانے کے لیے:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

کسی پتہ سے _بھیجی گئی_ ٹرانزیکشنز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">20 Bytes</span> - پتہ۔
2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // تازہ ترین بلاک پر حالت
]
```

**واپسی**

`QUANTITY` - اس پتہ سے بھیجی گئی ٹرانزیکشنز کی تعداد کا انٹیجر۔

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

### <span dir="ltr">eth_getBlockTransactionCountByHash</span> {#eth-getblocktransactioncountbyhash}

دیے گئے بلاک ہیش سے مماثل بلاک میں موجود ٹرانزیکشنز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - ایک بلاک کا ہیش

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**ریٹرنز**

`QUANTITY` - اس بلاک میں موجود ٹرانزیکشنز کی تعداد کا انٹیجر۔

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

### <span dir="ltr">eth_getBlockTransactionCountByNumber</span> {#eth-getblocktransactioncountbynumber}

دیے گئے بلاک نمبر سے مماثل بلاک میں ٹرانزیکشنز کی تعداد واپس کرتا ہے۔

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

**ریٹرنز**

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

### <span dir="ltr">eth_getUncleCountByBlockHash</span> {#eth-getunclecountbyblockhash}

دیے گئے بلاک ہیش سے مماثل بلاک سے، ایک بلاک میں انکلز کی تعداد واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - ایک بلاک کا ہیش

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**واپس کرتا ہے**

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

### <span dir="ltr">eth_getUncleCountByBlockNumber</span> {#eth-getunclecountbyblocknumber}

دیے گئے بلاک نمبر سے مماثل بلاک میں انکلز کی تعداد لوٹاتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - بلاک نمبر کا انٹیجر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

```js
params: [
  "0xe8", // 232
]
```

**ریٹرنز**

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

### eth_getCode {#eth-getcode}

کسی دیے گئے پتے پر کوڈ واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">20 Bytes</span> - پتہ
2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، دیکھیں [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**واپسی**

`DATA` - دیے گئے پتے سے کوڈ۔

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

### <span dir="ltr">eth_sign</span> {#eth-sign}

<span dir="ltr">sign</span> میتھڈ ایک مخصوص ایتھیریم دستخط کا حساب اس کے ساتھ لگاتا ہے: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`۔

پیغام میں ایک سابقہ شامل کرنے سے حساب شدہ دستخط کو ایتھیریم کے مخصوص دستخط کے طور پر قابل شناخت بنایا جاتا ہے۔ یہ اس غلط استعمال کو روکتا ہے جہاں ایک بدنیتی پر مبنی غیر مرکزی ایپلی کیشن (dapp) من مانے ڈیٹا (جیسے، ٹرانزیکشن) پر دستخط کر سکتی ہے اور متاثرہ شخص کا روپ دھارنے کے لیے دستخط کا استعمال کر سکتی ہے۔

نوٹ: جس پتہ سے دستخط کرنا ہے اس کا ان لاک ہونا ضروری ہے۔

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">20 Bytes</span> - پتہ
2. `DATA`، <span dir="ltr">N Bytes</span> - دستخط کرنے کے لیے پیغام

**ریٹرنز**

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

### <span dir="ltr">eth_signTransaction</span> {#eth-signtransaction}

ایک ٹرانزیکشن پر دستخط کرتا ہے جسے بعد میں [<span dir="ltr">eth_sendRawTransaction</span>](#eth-sendrawtransaction) کا استعمال کرتے ہوئے نیٹ ورک پر جمع کرایا جا سکتا ہے۔

**پیرامیٹرز**

1. `Object` - ٹرانزیکشن آبجیکٹ

- `type`:
- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - وہ پتہ جہاں سے ٹرانزیکشن بھیجی گئی ہے۔
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - (نیا کنٹریکٹ بناتے وقت اختیاری) وہ پتہ جس پر ٹرانزیکشن بھیجی گئی ہے۔
- `gas`: `QUANTITY` - (اختیاری، ڈیفالٹ: <span dir="ltr">90000</span>) ٹرانزیکشن کے نفاذ کے لیے فراہم کردہ گیس کا انٹیجر۔ یہ غیر استعمال شدہ گیس واپس کر دے گا۔
- `gasPrice`: `QUANTITY` - (اختیاری، ڈیفالٹ: طے کیا جانا باقی ہے) ہر ادا شدہ گیس کے لیے استعمال ہونے والی <span dir="ltr">gasPrice</span> کا انٹیجر، <span dir="ltr">Wei</span> میں۔
- `value`: `QUANTITY` - (اختیاری) اس ٹرانزیکشن کے ساتھ بھیجی گئی ویلیو کا انٹیجر، <span dir="ltr">Wei</span> میں۔
- `data`: `DATA` - کسی کنٹریکٹ کا مرتب شدہ کوڈ یا کال کیے گئے میتھڈ کے دستخط اور انکوڈ شدہ پیرامیٹرز کا ہیش۔
- `nonce`: `QUANTITY` - (اختیاری) نانس کا انٹیجر۔ یہ آپ کو اپنی ان زیر التواء ٹرانزیکشنز کو اوور رائٹ کرنے کی اجازت دیتا ہے جو وہی نانس استعمال کرتی ہیں۔

**ریٹرنز**

`DATA`، مخصوص اکاؤنٹ کے ذریعے دستخط شدہ <span dir="ltr">RLP-encoded</span> ٹرانزیکشن آبجیکٹ۔

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

### eth_sendTransaction {#eth-sendtransaction}

نئی پیغام کی کال کی ٹرانزیکشن یا کنٹریکٹ کی تخلیق کرتا ہے، اگر ڈیٹا فیلڈ میں کوڈ شامل ہو، اور `from` میں بتائے گئے اکاؤنٹ کا استعمال کرتے ہوئے اس پر دستخط کرتا ہے۔

**پیرامیٹرز**

1. `Object` - ٹرانزیکشن آبجیکٹ

- `from`: `DATA`, <span dir="ltr">20 Bytes</span> - وہ پتہ جہاں سے ٹرانزیکشن بھیجی گئی ہے۔
- `to`: `DATA`, <span dir="ltr">20 Bytes</span> - (نیا کنٹریکٹ بناتے وقت اختیاری) وہ پتہ جس پر ٹرانزیکشن بھیجی گئی ہے۔
- `gas`: `QUANTITY` - (اختیاری، ڈیفالٹ: <span dir="ltr">90000</span>) ٹرانزیکشن کے نفاذ کے لیے فراہم کردہ گیس کا انٹیجر (Integer)۔ یہ غیر استعمال شدہ گیس واپس کر دے گا۔
- `gasPrice`: `QUANTITY` - (اختیاری، ڈیفالٹ: طے کیا جانا باقی ہے) ہر ادا شدہ گیس کے لیے استعمال ہونے والی گیس کی قیمت (gasPrice) کا انٹیجر۔
- `value`: `QUANTITY` - (اختیاری) اس ٹرانزیکشن کے ساتھ بھیجی گئی ویلیو (value) کا انٹیجر۔
- `input`: `DATA` - کسی کنٹریکٹ کا مرتب شدہ (compiled) کوڈ یا طلب کیے گئے طریقہ کار کے دستخط (method signature) اور انکوڈ شدہ پیرامیٹرز کا ہیش۔
- `nonce`: `QUANTITY` - (اختیاری) نانس کا انٹیجر۔ یہ آپ کو اپنی ان زیر التواء ٹرانزیکشنز کو اوور رائٹ کرنے کی اجازت دیتا ہے جو ایک ہی نانس استعمال کرتی ہیں۔

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

**ریٹرنز**

`DATA`, <span dir="ltr">32 Bytes</span> - ٹرانزیکشن ہیش، یا صفر ہیش اگر ٹرانزیکشن ابھی تک دستیاب نہیں ہے۔

جب آپ نے کوئی کنٹریکٹ بنایا ہو، تو ٹرانزیکشن کو کسی بلاک میں تجویز کیے جانے کے بعد کنٹریکٹ کا پتہ حاصل کرنے کے لیے [eth_getTransactionReceipt](#eth-gettransactionreceipt) کا استعمال کریں۔

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

### eth_sendRawTransaction {#eth-sendrawtransaction}

دستخط شدہ ٹرانزیکشنز کے لیے نئی پیغام کی کال کی ٹرانزیکشن یا کنٹریکٹ کی تخلیق کرتا ہے۔

**پیرامیٹرز**

1. `DATA`، دستخط شدہ ٹرانزیکشن کا ڈیٹا۔

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**ریٹرنز**

`DATA`، <span dir="ltr">32 Bytes</span> - ٹرانزیکشن ہیش، یا صفر ہیش اگر ٹرانزیکشن ابھی تک دستیاب نہیں ہے۔

جب آپ نے کوئی کنٹریکٹ بنایا ہو، تو ٹرانزیکشن کو ایک بلاک میں تجویز کیے جانے کے بعد، کنٹریکٹ کا پتہ حاصل کرنے کے لیے [eth_getTransactionReceipt](#eth-gettransactionreceipt) کا استعمال کریں۔

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

### eth_call {#eth-call}

بلاک چین پر ٹرانزیکشن بنائے بغیر فوری طور پر ایک نئی پیغام کی کال انجام دیتا ہے۔ اکثر صرف پڑھنے کے قابل سمارٹ کنٹریکٹ فنکشنز کو انجام دینے کے لیے استعمال ہوتا ہے، مثال کے طور پر <span dir="ltr">ERC-20</span> کنٹریکٹ کے لیے `balanceOf`۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `Object` - ٹرانزیکشن کال آبجیکٹ

- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - (اختیاری) وہ پتہ جہاں سے ٹرانزیکشن بھیجی گئی ہے۔
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - وہ پتہ جس پر ٹرانزیکشن بھیجی گئی ہے۔
- `gas`: `QUANTITY` - (اختیاری) ٹرانزیکشن کے نفاذ کے لیے فراہم کردہ گیس کا انٹیجر۔ <span dir="ltr">eth_call</span> صفر گیس استعمال کرتا ہے، لیکن کچھ ایگزیکیوشنز کو اس پیرامیٹر کی ضرورت ہو سکتی ہے۔
- `gasPrice`: `QUANTITY` - (اختیاری) ہر ادا شدہ گیس کے لیے استعمال ہونے والی <span dir="ltr">gasPrice</span> کا انٹیجر
- `value`: `QUANTITY` - (اختیاری) اس ٹرانزیکشن کے ساتھ بھیجی گئی ویلیو کا انٹیجر
- `input`: `DATA` - (اختیاری) میتھڈ کے دستخط اور انکوڈ شدہ پیرامیٹرز کا ہیش۔ تفصیلات کے لیے <span dir="ltr">Solidity</span> کی دستاویزات میں [ایتھیریم کنٹریکٹ <span dir="ltr">ABI</span>](https://docs.soliditylang.org/en/latest/abi-spec.html) دیکھیں۔

2. `QUANTITY|TAG` - انٹیجر بلاک نمبر، یا سٹرنگ `"latest"`، `"earliest"`، `"pending"`، `"safe"` یا `"finalized"`، [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) دیکھیں۔

**واپسی**

`DATA` - نفاذ شدہ کنٹریکٹ کی واپسی کی ویلیو۔

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

### eth_estimateGas {#eth-estimategas}

یہ اندازہ لگاتا ہے اور واپس کرتا ہے کہ ٹرانزیکشن کو مکمل ہونے کے لیے کتنی گیس درکار ہے۔ ٹرانزیکشن کو بلاک چین میں شامل نہیں کیا جائے گا۔ نوٹ کریں کہ یہ اندازہ ٹرانزیکشن کے ذریعے اصل میں استعمال ہونے والی گیس کی مقدار سے نمایاں طور پر زیادہ ہو سکتا ہے، جس کی مختلف وجوہات ہو سکتی ہیں جن میں <span dir="ltr">EVM</span> میکینکس اور نوڈ کی کارکردگی شامل ہیں۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

[eth_call](#eth-call) کے پیرامیٹرز دیکھیں، سوائے اس کے کہ تمام خصوصیات اختیاری ہیں۔ اگر گیس کی حد متعین نہیں کی گئی ہے تو <span dir="ltr">Geth</span> زیر التواء بلاک سے بلاک گیس کی حد کو بالائی حد کے طور پر استعمال کرتا ہے۔ نتیجے کے طور پر، جب گیس کی مقدار زیر التواء بلاک گیس کی حد سے زیادہ ہو تو واپس کیا گیا اندازہ کال/ٹرانزیکشن کو انجام دینے کے لیے کافی نہیں ہو سکتا۔

**واپسی**

`QUANTITY` - استعمال ہونے والی گیس کی مقدار۔

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

### <span dir="ltr">eth_getBlockByHash</span> {#eth-getblockbyhash}

ہیش کے ذریعے بلاک کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - بلاک کا ہیش۔
2. `Boolean` - اگر `true` ہو تو یہ مکمل ٹرانزیکشن آبجیکٹس واپس کرتا ہے، اگر `false` ہو تو صرف ٹرانزیکشنز کے ہیشز۔

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**نتائج**

`Object` - ایک بلاک آبجیکٹ، یا جب کوئی بلاک نہ ملے تو `null`:

- `number`: `QUANTITY` - بلاک کا نمبر۔ جب یہ زیر التوا بلاک ہو تو `null`۔
- `hash`: `DATA`، <span dir="ltr">32 Bytes</span> - بلاک کا ہیش۔ جب یہ زیر التوا بلاک ہو تو `null`۔
- `parentHash`: `DATA`، <span dir="ltr">32 Bytes</span> - پیرنٹ بلاک کا ہیش۔
- `nonce`: `DATA`، <span dir="ltr">8 Bytes</span> - تیار کردہ ثبوتِ کار (PoW) کا ہیش۔ جب یہ زیر التوا بلاک ہو تو `null`، حصہ داری کا ثبوت (PoS) بلاکس کے لیے `0x0` (دی مرج کے بعد سے)
- `sha3Uncles`: `DATA`، <span dir="ltr">32 Bytes</span> - بلاک میں انکلز کے ڈیٹا کا <span dir="ltr">SHA3</span>۔
- `logsBloom`: `DATA`، <span dir="ltr">256 Bytes</span> - بلاک کے لاگز کے لیے بلوم فلٹر۔ جب یہ زیر التوا بلاک ہو تو `null`۔
- `transactionsRoot`: `DATA`، <span dir="ltr">32 Bytes</span> - بلاک کی ٹرانزیکشن ٹرائی کا روٹ۔
- `stateRoot`: `DATA`، <span dir="ltr">32 Bytes</span> - بلاک کی حتمی حالت کی ٹرائی کا روٹ۔
- `receiptsRoot`: `DATA`، <span dir="ltr">32 Bytes</span> - بلاک کی رسیدوں کی ٹرائی کا روٹ۔
- `miner`: `DATA`، <span dir="ltr">20 Bytes</span> - اس مستفید کا پتہ جسے بلاک کے انعامات دیے گئے تھے۔
- `difficulty`: `QUANTITY` - اس بلاک کی دشواری کا انٹیجر۔
- `totalDifficulty`: `QUANTITY` - اس بلاک تک چین کی کل دشواری کا انٹیجر۔
- `extraData`: `DATA` - اس بلاک کا "اضافی ڈیٹا" فیلڈ۔
- `size`: `QUANTITY` - بائٹس میں اس بلاک کے سائز کا انٹیجر۔
- `gasLimit`: `QUANTITY` - اس بلاک میں زیادہ سے زیادہ اجازت یافتہ گیس۔
- `gasUsed`: `QUANTITY` - اس بلاک میں تمام ٹرانزیکشنز کے ذریعے استعمال شدہ کل گیس۔
- `timestamp`: `QUANTITY` - بلاک مرتب کیے جانے کے وقت کا یونکس ٹائم اسٹیمپ۔
- `transactions`: `Array` - آخری دیے گئے پیرامیٹر کی بنیاد پر، ٹرانزیکشن آبجیکٹس کی ایرے، یا <span dir="ltr">32 Bytes</span> کے ٹرانزیکشن ہیشز۔
- `uncles`: `Array` - انکل ہیشز کی ایرے۔

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

### eth_getBlockByNumber {#eth-getblockbynumber}

بلاک نمبر کے ذریعے کسی بلاک کے بارے میں معلومات فراہم کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - بلاک نمبر کا انٹیجر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"` یا `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔
2. `Boolean` - اگر `true` ہو تو یہ مکمل ٹرانزیکشن آبجیکٹس فراہم کرتا ہے، اگر `false` ہو تو صرف ٹرانزیکشنز کے ہیشز۔

```js
params: [
  "0x1b4", // 436
  true,
]
```

**واپسی**
[eth_getBlockByHash](#eth-getblockbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

نتیجہ کے لیے [eth_getBlockByHash](#eth-getblockbyhash) دیکھیں

### eth_getTransactionByHash {#eth-gettransactionbyhash}

ٹرانزیکشن ہیش کے ذریعے درخواست کردہ ٹرانزیکشن کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - ٹرانزیکشن کا ہیش

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**ریٹرنز**

`Object` - ایک ٹرانزیکشن آبجیکٹ، یا `null` جب کوئی ٹرانزیکشن نہ ملے:

- `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - اس بلاک کا ہیش جس میں یہ ٹرانزیکشن موجود تھی۔ `null` جب یہ زیر التوا ہو۔
- `blockNumber`: `QUANTITY` - بلاک نمبر جس میں یہ ٹرانزیکشن موجود تھی۔ `null` جب یہ زیر التوا ہو۔
- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - بھیجنے والے کا پتہ۔
- `gas`: `QUANTITY` - بھیجنے والے کی طرف سے فراہم کردہ گیس۔
- `gasPrice`: `QUANTITY` - بھیجنے والے کی طرف سے <span dir="ltr">Wei</span> میں فراہم کردہ گیس کی قیمت۔
- `hash`: `DATA`، <span dir="ltr">32 Bytes</span> - ٹرانزیکشن کا ہیش۔
- `input`: `DATA` - ٹرانزیکشن کے ساتھ بھیجا گیا ڈیٹا۔
- `nonce`: `QUANTITY` - اس سے پہلے بھیجنے والے کی طرف سے کی گئی ٹرانزیکشنز کی تعداد۔
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - وصول کنندہ کا پتہ۔ `null` جب یہ معاہدے کی تخلیق کی ٹرانزیکشن ہو۔
- `transactionIndex`: `QUANTITY` - بلاک میں ٹرانزیکشنز کی اشاریہ پوزیشن کا عدد (<span dir="ltr">integer</span>)۔ `null` جب یہ زیر التوا ہو۔
- `value`: `QUANTITY` - <span dir="ltr">Wei</span> میں منتقل کی گئی قدر۔
- `v`: `QUANTITY` - <span dir="ltr">ECDSA</span> ریکوری آئی ڈی
- `r`: `QUANTITY` - <span dir="ltr">ECDSA</span> دستخط <span dir="ltr">r</span>
- `s`: `QUANTITY` - <span dir="ltr">ECDSA</span> دستخط <span dir="ltr">s</span>

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

### <span dir="ltr">eth_getTransactionByBlockHashAndIndex</span> {#eth-gettransactionbyblockhashandindex}

بلاک ہیش اور ٹرانزیکشن کے اشاریہ کی پوزیشن کے لحاظ سے ٹرانزیکشن کے بارے میں معلومات لوٹاتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - ایک بلاک کا ہیش۔
2. `QUANTITY` - ٹرانزیکشن کے اشاریہ کی پوزیشن کا عدد۔

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**ریٹرنز**
[<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

نتیجہ کے لیے [<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash) دیکھیں

### <span dir="ltr">eth_getTransactionByBlockNumberAndIndex</span> {#eth-gettransactionbyblocknumberandindex}

یہ بلاک نمبر اور ٹرانزیکشن کے اشاریہ کی پوزیشن کے لحاظ سے ٹرانزیکشن کے بارے میں معلومات لوٹاتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"` یا `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔
2. `QUANTITY` - ٹرانزیکشن کے اشاریہ کی پوزیشن۔

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**ریٹرنز**
[<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

نتیجہ کے لیے [<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash) دیکھیں۔

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

ٹرانزیکشن ہیش کے ذریعے کسی ٹرانزیکشن کی رسید واپس کرتا ہے۔

**نوٹ** کہ زیر التوا ٹرانزیکشنز کے لیے رسید دستیاب نہیں ہے۔

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - کسی ٹرانزیکشن کا ہیش

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**واپسی**
`Object` - ایک ٹرانزیکشن کی رسید کا آبجیکٹ، یا `null` جب کوئی رسید نہ ملے:

- `transactionHash `: `DATA`، <span dir="ltr">32 Bytes</span> - ٹرانزیکشن کا ہیش۔
- `transactionIndex`: `QUANTITY` - بلاک میں ٹرانزیکشنز کی اشاریہ پوزیشن کا انٹیجر۔
- `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - اس بلاک کا ہیش جس میں یہ ٹرانزیکشن موجود تھی۔
- `blockNumber`: `QUANTITY` - اس بلاک کا نمبر جس میں یہ ٹرانزیکشن موجود تھی۔
- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - بھیجنے والے کا پتہ۔
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - وصول کنندہ کا پتہ۔ جب یہ معاہدے کی تخلیق کی ٹرانزیکشن ہو تو null ہوتا ہے۔
- `cumulativeGasUsed` : `QUANTITY ` - بلاک میں اس ٹرانزیکشن کے ایگزیکیوٹ ہونے پر استعمال ہونے والی گیس کی کل مقدار۔
- `effectiveGasPrice` : `QUANTITY` - گیس کی فی اکائی ادا کی گئی بنیادی فیس اور ٹپ کا مجموعہ۔
- `gasUsed `: `QUANTITY ` - صرف اس مخصوص ٹرانزیکشن کے ذریعے استعمال ہونے والی گیس کی مقدار۔
- `contractAddress `: `DATA`، <span dir="ltr">20 Bytes</span> - تخلیق کردہ کنٹریکٹ کا پتہ، اگر ٹرانزیکشن معاہدے کی تخلیق تھی، بصورت دیگر `null`۔
- `logs`: `Array` - لاگ آبجیکٹس کی ارے (Array)، جو اس ٹرانزیکشن نے تیار کی ہے۔
- `logsBloom`: `DATA`، <span dir="ltr">256 Bytes</span> - لائٹ کلائنٹس کے لیے متعلقہ لاگز کو تیزی سے بازیافت کرنے کے لیے بلوم فلٹر۔
- `type`: `QUANTITY` - ٹرانزیکشن کی قسم کا انٹیجر، لیگیسی ٹرانزیکشنز کے لیے `0x0`، ایکسیس لسٹ کی اقسام کے لیے `0x1`، ڈائنامک فیس کے لیے `0x2`۔

یہ ان میں سے _کوئی ایک_ بھی واپس کرتا ہے:

- `root` : `DATA` پوسٹ-ٹرانزیکشن حالت کے روٹ کے <span dir="ltr">32 bytes</span> (بازنطیم سے پہلے)
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
    "contractAddress": null, // پتہ کی سٹرنگ اگر یہ بنایا گیا تھا
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // لاگز جیسا کہ getFilterLogs وغیرہ کے ذریعے واپس کیے گئے ہیں
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

### <span dir="ltr">eth_getUncleByBlockHashAndIndex</span> {#eth-getunclebyblockhashandindex}

ہیش اور انکل کے اشاریہ کی پوزیشن کے ذریعے ایک بلاک کے انکل کے بارے میں معلومات واپس کرتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `DATA`، <span dir="ltr">32 Bytes</span> - ایک بلاک کا ہیش۔
2. `QUANTITY` - انکل کے اشاریہ کی پوزیشن۔

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**ریٹرنز**
[<span dir="ltr">eth_getBlockByHash</span>](#eth-getblockbyhash) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

نتیجہ کے لیے [<span dir="ltr">eth_getBlockByHash</span>](#eth-getblockbyhash) دیکھیں

**نوٹ**: ایک انکل میں انفرادی ٹرانزیکشنز شامل نہیں ہوتیں۔

### <span dir="ltr">eth_getUncleByBlockNumberAndIndex</span> {#eth-getunclebyblocknumberandindex}

نمبر اور انکل کی اشاریہ پوزیشن کے لحاظ سے کسی بلاک کے انکل کے بارے میں معلومات لوٹاتا ہے۔

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  پلے گراؤنڈ میں اینڈ پوائنٹ آزمائیں
</ButtonLink>

**پیرامیٹرز**

1. `QUANTITY|TAG` - ایک بلاک نمبر، یا سٹرنگ `"earliest"`، `"latest"`، `"pending"`، `"safe"`، `"finalized"`، جیسا کہ [بلاک پیرامیٹر](/developers/docs/apis/json-rpc/#block-parameter) میں ہے۔
2. `QUANTITY` - انکل کی اشاریہ پوزیشن۔

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**ریٹرنز**
دیکھیں [<span dir="ltr">eth_getBlockByHash</span>](#eth-getblockbyhash)

**نوٹ**: ایک انکل میں انفرادی ٹرانزیکشنز شامل نہیں ہوتیں۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

نتیجہ دیکھیں [<span dir="ltr">eth_getBlockByHash</span>](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

فلٹر کے اختیارات کی بنیاد پر ایک فلٹر آبجیکٹ بناتا ہے، تاکہ حالت تبدیل ہونے (لاگز) پر مطلع کیا جا سکے۔
یہ چیک کرنے کے لیے کہ آیا حالت تبدیل ہوئی ہے، [eth_getFilterChanges](#eth-getfilterchanges) کو کال کریں۔

**موضوع کے فلٹرز کی وضاحت پر ایک نوٹ:**
موضوعات ترتیب پر منحصر ہوتے ہیں۔ ایک ٹرانزیکشن جس کے لاگ میں موضوعات <span dir="ltr">[A, B]</span> ہوں، درج ذیل موضوع کے فلٹرز سے مماثل ہوگی:

- `[]` "کچھ بھی"
- `[A]` "پہلی پوزیشن پر <span dir="ltr">A</span> (اور اس کے بعد کچھ بھی)"
- `[null, B]` "پہلی پوزیشن پر کچھ بھی اور دوسری پوزیشن پر <span dir="ltr">B</span> (اور اس کے بعد کچھ بھی)"
- `[A, B]` "پہلی پوزیشن پر <span dir="ltr">A</span> اور دوسری پوزیشن پر <span dir="ltr">B</span> (اور اس کے بعد کچھ بھی)"
- `[[A, B], [A, B]]` "پہلی پوزیشن پر (<span dir="ltr">A</span> یا <span dir="ltr">B</span>) اور دوسری پوزیشن پر (<span dir="ltr">A</span> یا <span dir="ltr">B</span>) (اور اس کے بعد کچھ بھی)"
- **پیرامیٹرز**

1. `Object` - فلٹر کے اختیارات:

- `fromBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری تجویز کردہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا ان ٹرانزیکشنز کے لیے جو ابھی تک کسی بلاک میں نہیں ہیں `"pending"`، `"earliest"`۔
- `toBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری تجویز کردہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا ان ٹرانزیکشنز کے لیے جو ابھی تک کسی بلاک میں نہیں ہیں `"pending"`، `"earliest"`۔
- `address`: `DATA|Array`، <span dir="ltr">20 Bytes</span> - (اختیاری) کنٹریکٹ کا پتہ یا پتوں کی فہرست جہاں سے لاگز شروع ہونے چاہئیں۔
- `topics`: `Array of DATA`، - (اختیاری) <span dir="ltr">32 Bytes</span> کی ارے `DATA` موضوعات۔ موضوعات ترتیب پر منحصر ہوتے ہیں۔ ہر موضوع "یا" (or) کے اختیارات کے ساتھ ڈیٹا (DATA) کی ایک ارے بھی ہو سکتا ہے۔

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

### <span dir="ltr">eth_newBlockFilter</span> {#eth-newblockfilter}

نوڈ میں ایک فلٹر بناتا ہے، تاکہ جب کوئی نیا بلاک آئے تو مطلع کیا جا سکے۔
یہ چیک کرنے کے لیے کہ آیا حالت تبدیل ہوئی ہے، [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges) کو کال کریں۔

**پیرامیٹرز**
کوئی نہیں

**ریٹرنز**
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

### <span dir="ltr">eth_newPendingTransactionFilter</span> {#eth-newpendingtransactionfilter}

نوڈ میں ایک فلٹر بناتا ہے، تاکہ جب نئی زیر التواء ٹرانزیکشنز آئیں تو مطلع کیا جا سکے۔
یہ چیک کرنے کے لیے کہ آیا حالت تبدیل ہوئی ہے، [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges) کو کال کریں۔

**پیرامیٹرز**
کوئی نہیں

**ریٹرنز**
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

### <span dir="ltr">eth_uninstallFilter</span> {#eth-uninstallfilter}

دیے گئے <span dir="ltr">id</span> والے فلٹر کو اَن انسٹال کرتا ہے۔ جب مزید نگرانی کی ضرورت نہ ہو تو اسے ہمیشہ کال کیا جانا چاہیے۔
مزید برآں، جب ایک مخصوص مدت تک [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges) کے ساتھ فلٹرز کی درخواست نہیں کی جاتی ہے تو وہ ٹائم آؤٹ ہو جاتے ہیں۔

**پیرامیٹرز**

1. `QUANTITY` - فلٹر کی <span dir="ltr">id</span>۔

```js
params: [
  "0xb", // 11
]
```

**ریٹرنز**

`Boolean` - `true` اگر فلٹر کامیابی سے اَن انسٹال ہو گیا تھا، بصورت دیگر `false`۔

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

### eth_getFilterChanges {#eth-getfilterchanges}

ایک فلٹر کے لیے پولنگ کا طریقہ، جو پچھلے پول کے بعد سے ہونے والے لاگز کی ایک ایرے (array) واپس کرتا ہے۔

**پیرامیٹرز**

1. `QUANTITY` - فلٹر کی شناخت (id)۔

```js
params: [
  "0x16", // 22
]
```

**واپسی**
`Array` - لاگ آبجیکٹس کی ایرے، یا اگر پچھلے پول کے بعد سے کچھ نہیں بدلا ہے تو ایک خالی ایرے۔

- `eth_newBlockFilter` کے ساتھ بنائے گئے فلٹرز کے لیے واپسی بلاک ہیشز (`DATA`، <span dir="ltr">32 Bytes</span>) ہیں، مثال کے طور پر، `["0x3454645634534..."]`۔
- `eth_newPendingTransactionFilter ` کے ساتھ بنائے گئے فلٹرز کے لیے واپسی ٹرانزیکشن ہیشز (`DATA`، <span dir="ltr">32 Bytes</span>) ہیں، مثال کے طور پر، `["0x6345343454645..."]`۔
- `eth_newFilter` کے ساتھ بنائے گئے فلٹرز کے لیے لاگز درج ذیل پیرامیٹرز کے ساتھ آبجیکٹس ہیں:
  - `removed`: `TAG` - `true` جب چین کی تنظیمِ نو کی وجہ سے لاگ کو ہٹا دیا گیا ہو۔ `false` اگر یہ ایک درست لاگ ہے۔
  - `logIndex`: `QUANTITY` - بلاک میں لاگ کی اشاریہ پوزیشن کا انٹیجر۔ `null` جب یہ زیر التواء لاگ ہو۔
  - `transactionIndex`: `QUANTITY` - ٹرانزیکشنز کی اشاریہ پوزیشن کا انٹیجر جس سے لاگ بنایا گیا تھا۔ `null` جب یہ زیر التواء لاگ ہو۔
  - `transactionHash`: `DATA`، <span dir="ltr">32 Bytes</span> - ان ٹرانزیکشنز کا ہیش جن سے یہ لاگ بنایا گیا تھا۔ `null` جب یہ زیر التواء لاگ ہو۔
  - `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - اس بلاک کا ہیش جس میں یہ لاگ تھا۔ `null` جب یہ زیر التواء ہو۔ `null` جب یہ زیر التواء لاگ ہو۔
  - `blockNumber`: `QUANTITY` - اس بلاک کا نمبر جس میں یہ لاگ تھا۔ `null` جب یہ زیر التواء ہو۔ `null` جب یہ زیر التواء لاگ ہو۔
  - `address`: `DATA`، <span dir="ltr">20 Bytes</span> - وہ پتہ جہاں سے یہ لاگ شروع ہوا تھا۔
  - `data`: `DATA` - متغیر لمبائی (variable-length) کا نان انڈیکسڈ لاگ ڈیٹا۔ (_solidity_ میں: صفر یا اس سے زیادہ <span dir="ltr">32 Bytes</span> کے نان انڈیکسڈ لاگ آرگیومنٹس۔)
  - `topics`: `Array of DATA` - انڈیکسڈ لاگ آرگیومنٹس کے <span dir="ltr">0 to 4</span> <span dir="ltr">32 Bytes</span> `DATA` کی ایرے۔ (_solidity_ میں: پہلا ٹاپک ایونٹ کے دستخط کا _ہیش_ ہوتا ہے (مثال کے طور پر، `Deposit(address,bytes32,uint256)`)، سوائے اس کے کہ آپ نے ایونٹ کو `anonymous` کی تخصیص کے ساتھ ڈکلیئر کیا ہو۔)

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

### <span dir="ltr">eth_getFilterLogs</span> {#eth-getfilterlogs}

دی گئی <span dir="ltr">id</span> والے فلٹر سے مماثل تمام لاگز کی ایک ایرے واپس کرتا ہے۔

**پیرامیٹرز**

1. `QUANTITY` - فلٹر کی <span dir="ltr">id</span>۔

```js
params: [
  "0x16", // 22
]
```

**واپسی**
[<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges) دیکھیں۔

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

نتیجے کے لیے [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges) دیکھیں۔

### eth_getLogs {#eth-getlogs}

دیے گئے فلٹر آبجیکٹ سے مماثل تمام لاگز کی ایک صف (array) واپس کرتا ہے۔

**پیرامیٹرز**

1. `Object` - فلٹر کے اختیارات:

- `fromBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری تجویز کردہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا ان ٹرانزیکشنز کے لیے `"pending"`, `"earliest"` جو ابھی تک کسی بلاک میں نہیں ہیں۔
- `toBlock`: `QUANTITY|TAG` - (اختیاری، ڈیفالٹ: `"latest"`) انٹیجر بلاک نمبر، یا آخری تجویز کردہ بلاک کے لیے `"latest"`، تازہ ترین محفوظ بلاک کے لیے `"safe"`، تازہ ترین حتمی بلاک کے لیے `"finalized"`، یا ان ٹرانزیکشنز کے لیے `"pending"`, `"earliest"` جو ابھی تک کسی بلاک میں نہیں ہیں۔
- `address`: `DATA|Array`، <span dir="ltr">20 Bytes</span> - (اختیاری) کنٹریکٹ کا پتہ یا پتوں کی ایک فہرست جہاں سے لاگز شروع ہونے چاہئیں۔
- `topics`: `Array of DATA`، - (اختیاری) <span dir="ltr">32 Bytes</span> `DATA` کے موضوعات (topics) کی صف (array)۔ موضوعات ترتیب پر منحصر ہوتے ہیں۔ ہر موضوع "or" اختیارات کے ساتھ DATA کی ایک صف بھی ہو سکتا ہے۔
- `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - (اختیاری، **مستقبل**) <span dir="ltr">EIP-234</span> کے اضافے کے ساتھ، `blockHash` ایک نیا فلٹر آپشن ہوگا جو واپس کیے گئے لاگز کو <span dir="ltr">32-byte</span> ہیش `blockHash` والے واحد بلاک تک محدود کر دے گا۔ `blockHash` کا استعمال `fromBlock` = `toBlock` = ہیش `blockHash` والے بلاک نمبر کے برابر ہے۔ اگر فلٹر کے معیار میں `blockHash` موجود ہے، تو نہ تو `fromBlock` اور نہ ہی `toBlock` کی اجازت ہے۔

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
[eth_getFilterChanges](#eth-getfilterchanges) دیکھیں

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

نتیجہ کے لیے [eth_getFilterChanges](#eth-getfilterchanges) دیکھیں

## استعمال کی مثال {#usage-example}

### <span dir="ltr">JSON_RPC</span> کا استعمال کرتے ہوئے کنٹریکٹ تعینات کرنا {#deploying-contract}

اس حصے میں صرف RPC انٹرفیس کا استعمال کرتے ہوئے کنٹریکٹ تعینات کرنے کا طریقہ کار دکھایا گیا ہے۔ کنٹریکٹس تعینات کرنے کے متبادل طریقے بھی موجود ہیں جہاں اس پیچیدگی کو چھپا دیا جاتا ہے—مثال کے طور پر، RPC انٹرفیس کے اوپر بنی لائبریریوں کا استعمال کرتے ہوئے جیسے [web3.js](https://web3js.readthedocs.io/) اور [web3.py](https://github.com/ethereum/web3.py)۔ یہ تجریدات (abstractions) عام طور پر سمجھنے میں آسان اور کم غلطیوں کا باعث بنتی ہیں، لیکن پھر بھی یہ سمجھنا مفید ہے کہ اندرونی طور پر کیا ہو رہا ہے۔

درج ذیل ایک سیدھا سادا سمارٹ کنٹریکٹ ہے جسے `Multiply7` کہا جاتا ہے، جسے جے سن آر پی سی انٹرفیس کا استعمال کرتے ہوئے ایتھیریم نوڈ پر تعینات کیا جائے گا۔ یہ ٹیوٹوریل فرض کرتا ہے کہ قاری پہلے ہی Geth نوڈ چلا رہا ہے۔ نوڈز اور کلائنٹس کے بارے میں مزید معلومات [یہاں](/developers/docs/nodes-and-clients/run-a-node) دستیاب ہیں۔ غیر-Geth کلائنٹس کے لیے HTTP جے سن آر پی سی شروع کرنے کا طریقہ دیکھنے کے لیے براہ کرم انفرادی [کلائنٹ](/developers/docs/nodes-and-clients/) کی دستاویزات سے رجوع کریں۔ زیادہ تر کلائنٹس پہلے سے طے شدہ طور پر `localhost:8545` پر سروس فراہم کرتے ہیں۔

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

سب سے پہلا کام یہ یقینی بنانا ہے کہ HTTP RPC انٹرفیس فعال ہے۔ اس کا مطلب ہے کہ ہم اسٹارٹ اپ پر Geth کو `--http` فلیگ فراہم کرتے ہیں۔ اس مثال میں ہم ایک نجی ڈیولپمنٹ چین پر Geth نوڈ استعمال کرتے ہیں۔ اس طریقے کا استعمال کرتے ہوئے ہمیں اصلی نیٹ ورک پر ایتھر کی ضرورت نہیں ہوتی۔

```bash
geth --http --dev console 2>>geth.log
```

یہ `http://localhost:8545` پر HTTP RPC انٹرفیس شروع کر دے گا۔

ہم [curl](https://curl.se) کا استعمال کرتے ہوئے کوائن بیس پتہ (اکاؤنٹس کی صف سے پہلا پتہ حاصل کر کے) اور بیلنس بازیافت کر کے تصدیق کر سکتے ہیں کہ انٹرفیس چل رہا ہے۔ براہ کرم نوٹ کریں کہ ان مثالوں میں موجود ڈیٹا آپ کے مقامی نوڈ پر مختلف ہوگا۔ اگر آپ ان کمانڈز کو آزمانا چاہتے ہیں، تو دوسری curl درخواست میں موجود درخواست کے پیرامیٹرز کو پہلی درخواست سے واپس آنے والے نتیجے سے تبدیل کریں۔

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

چونکہ نمبرز ہیکس (hex) انکوڈڈ ہوتے ہیں، اس لیے بیلنس Wei میں ہیکس سٹرنگ کے طور پر واپس کیا جاتا ہے۔ اگر ہم بیلنس کو ایتھر میں ایک نمبر کے طور پر دیکھنا چاہتے ہیں تو ہم Geth کنسول سے web3 استعمال کر سکتے ہیں۔

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

اب چونکہ ہماری نجی ڈیولپمنٹ چین پر کچھ ایتھر موجود ہے، ہم کنٹریکٹ تعینات کر سکتے ہیں۔ پہلا قدم Multiply7 کنٹریکٹ کو بائٹ کوڈ میں کمپائلنگ کرنا ہے جسے EVM کو بھیجا جا سکے۔ solc، جو کہ Solidity کمپائلر ہے، کو انسٹال کرنے کے لیے [Solidity کی دستاویزات](https://docs.soliditylang.org/en/latest/installing-solidity.html) پر عمل کریں۔ (آپ شاید ایک پرانی `solc` ریلیز استعمال کرنا چاہیں تاکہ یہ [ہماری مثال کے لیے استعمال ہونے والے کمپائلر کے ورژن](https://github.com/ethereum/solidity/releases/tag/v0.4.20) سے مماثل ہو۔)

اگلا قدم Multiply7 کنٹریکٹ کو بائٹ کوڈ میں کمپائلنگ کرنا ہے جسے EVM کو بھیجا جا سکے۔

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

اب جب کہ ہمارے پاس کمپائل شدہ کوڈ موجود ہے، ہمیں یہ تعین کرنے کی ضرورت ہے کہ اسے تعینات کرنے پر کتنی گیس خرچ ہوگی۔ RPC انٹرفیس میں ایک `eth_estimateGas` طریقہ ہے جو ہمیں ایک تخمینہ دے گا۔

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

اور آخر کار کنٹریکٹ تعینات کریں۔

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

ٹرانزیکشن کو نوڈ کے ذریعے قبول کر لیا جاتا ہے اور ایک ٹرانزیکشن ہیش واپس کیا جاتا ہے۔ اس ہیش کو ٹرانزیکشن کو ٹریک کرنے کے لیے استعمال کیا جا سکتا ہے۔ اگلا قدم اس پتہ کا تعین کرنا ہے جہاں ہمارا کنٹریکٹ تعینات کیا گیا ہے۔ ہر عمل میں لائی گئی ٹرانزیکشن ایک رسید بنائے گی۔ اس رسید میں ٹرانزیکشن کے بارے میں مختلف معلومات شامل ہوتی ہیں جیسے کہ ٹرانزیکشن کس بلاک میں شامل کی گئی تھی اور EVM کے ذریعے کتنی گیس استعمال کی گئی تھی۔ اگر کوئی ٹرانزیکشن کنٹریکٹ بناتی ہے تو اس میں کنٹریکٹ کا پتہ بھی شامل ہوگا۔ ہم `eth_getTransactionReceipt` RPC طریقہ استعمال کر کے رسید بازیافت کر سکتے ہیں۔

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

ہمارا کنٹریکٹ `0x4d03d617d700cf81935d7f797f4e2ae719648262` پر بنایا گیا تھا۔ رسید کے بجائے null نتیجہ آنے کا مطلب ہے کہ ٹرانزیکشن ابھی تک کسی بلاک میں شامل نہیں ہوئی ہے۔ کچھ دیر انتظار کریں اور چیک کریں کہ آیا آپ کا اتفاقِ رائے کا کلائنٹ چل رہا ہے اور اسے دوبارہ آزمائیں۔

#### سمارٹ کنٹریکٹس کے ساتھ تعامل کرنا {#interacting-with-smart-contract}

اس مثال میں ہم `eth_sendTransaction` کا استعمال کرتے ہوئے کنٹریکٹ کے `multiply` طریقہ پر ایک ٹرانزیکشن بھیجیں گے۔

`eth_sendTransaction` کو کئی دلائل کی ضرورت ہوتی ہے، خاص طور پر `from`، `to` اور `data`۔ `From` ہمارے اکاؤنٹ کا عوامی پتہ ہے، اور `to` کنٹریکٹ کا پتہ ہے۔ `data` دلیل میں ایک پے لوڈ ہوتا ہے جو یہ طے کرتا ہے کہ کون سا طریقہ کال کیا جانا چاہیے اور کن دلائل کے ساتھ۔ یہاں [ABI (ایپلیکیشن بائنری انٹرفیس)](https://docs.soliditylang.org/en/latest/abi-spec.html) کا کردار آتا ہے۔ ABI ایک JSON فائل ہے جو یہ طے کرتی ہے کہ EVM کے لیے ڈیٹا کی وضاحت اور انکوڈنگ کیسے کی جائے۔

پے لوڈ کے بائٹس یہ طے کرتے ہیں کہ کنٹریکٹ میں کون سا طریقہ کال کیا گیا ہے۔ یہ فنکشن کے نام اور اس کی دلیل کی اقسام پر Keccak ہیش کے پہلے <span dir="ltr">4 bytes</span> ہیں، جو ہیکس انکوڈڈ ہوتے ہیں۔ multiply فنکشن ایک uint قبول کرتا ہے جو کہ <span dir="ltr">uint256</span> کا عرف ہے۔ اس سے ہمیں یہ حاصل ہوتا ہے:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

اگلا قدم دلائل کو انکوڈ کرنا ہے۔ یہاں صرف ایک <span dir="ltr">uint256</span> ہے، فرض کریں، ویلیو 6۔ ABI میں ایک حصہ ہوتا ہے جو یہ بتاتا ہے کہ <span dir="ltr">uint256</span> اقسام کو کیسے انکوڈ کیا جائے۔

`int<M>: enc(X)` X کی بگ اینڈِین ٹوز کمپلیمنٹ (two's complement) انکوڈنگ ہے، جسے منفی X کے لیے اعلیٰ درجے (بائیں) جانب <span dir="ltr">0xff</span> کے ساتھ اور مثبت X کے لیے صفر بائٹس کے ساتھ پیڈ کیا جاتا ہے تاکہ لمبائی <span dir="ltr">32 bytes</span> کا ضرب ہو۔

یہ `0000000000000000000000000000000000000000000000000000000000000006` میں انکوڈ ہوتا ہے۔

فنکشن سلیکٹر اور انکوڈ شدہ دلیل کو ملا کر ہمارا ڈیٹا `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` ہوگا۔

اسے اب نوڈ کو بھیجا جا سکتا ہے:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

چونکہ ایک ٹرانزیکشن بھیجی گئی تھی، اس لیے ایک ٹرانزیکشن ہیش واپس کیا گیا۔ رسید بازیافت کرنے سے یہ حاصل ہوتا ہے:

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

رسید میں ایک لاگ شامل ہوتا ہے۔ یہ لاگ ٹرانزیکشن کے عمل درآمد پر EVM کے ذریعے تیار کیا گیا تھا اور رسید میں شامل کیا گیا تھا۔ `multiply` فنکشن ظاہر کرتا ہے کہ `Print` ایونٹ ان پٹ کو 7 سے ضرب دے کر اٹھایا گیا تھا۔ چونکہ `Print` ایونٹ کی دلیل ایک <span dir="ltr">uint256</span> تھی، ہم اسے ABI کے قواعد کے مطابق ڈی کوڈ کر سکتے ہیں جس سے ہمیں متوقع ڈیسیمل 42 حاصل ہوگا۔ ڈیٹا کے علاوہ یہ بات قابل غور ہے کہ موضوعات (topics) کا استعمال یہ طے کرنے کے لیے کیا جا سکتا ہے کہ کس ایونٹ نے لاگ بنایا:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

یہ کچھ انتہائی عام کاموں کا صرف ایک مختصر تعارف تھا، جس میں جے سن آر پی سی کے براہ راست استعمال کا مظاہرہ کیا گیا ہے۔

## متعلقہ موضوعات {#related-topics}

- [جے سن آر پی سی کی تفصیلات](http://www.jsonrpc.org/specification)
- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [<span dir="ltr">JavaScript APIs</span>](/developers/docs/apis/javascript/)
- [بیک اینڈ <span dir="ltr">APIs</span>](/developers/docs/apis/backend/)
- [ایگزیکیوشن کلائنٹس](/developers/docs/nodes-and-clients/#execution-clients)