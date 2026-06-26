---
title: "⁦JSON-RPC API⁩"
description: "بروتوكول استدعاء الإجراء عن بُعد (⁦RPC⁩) خفيف الوزن وعديم الحالة لعملاء إيثيريوم."
lang: ar
---

لكي يتفاعل تطبيق برمجي مع سلسلة كتل [إيثيريوم](/) - إما عن طريق قراءة بيانات سلسلة الكتل أو إرسال معاملات إلى الشبكة - يجب أن يتصل بعقدة إيثيريوم.

لهذا الغرض، ينفذ كل [عميل إيثيريوم](/developers/docs/nodes-and-clients/#execution-clients) [مواصفات <span dir="ltr">JSON-RPC</span>](https://github.com/ethereum/execution-apis)، بحيث تكون هناك مجموعة موحدة من الطرق التي يمكن للتطبيقات الاعتماد عليها بغض النظر عن العقدة المحددة أو تنفيذ العميل.

[<span dir="ltr">JSON-RPC</span>](https://www.jsonrpc.org/specification) هو بروتوكول استدعاء الإجراء عن بُعد (<span dir="ltr">RPC</span>) خفيف الوزن وعديم الحالة. يحدد العديد من هياكل البيانات والقواعد المتعلقة بمعالجتها. وهو مستقل عن وسيلة النقل، حيث يمكن استخدام المفاهيم داخل نفس العملية، أو عبر مآخذ التوصيل، أو عبر <span dir="ltr">HTTP</span>، أو في العديد من بيئات تمرير الرسائل المختلفة. يستخدم <span dir="ltr">JSON</span> (<span dir="ltr">RFC 4627</span>) كتنسيق للبيانات.

## تنفيذات العميل {#client-implementations}

قد يستخدم كل من عملاء إيثيريوم لغات برمجة مختلفة عند تنفيذ مواصفات <span dir="ltr">JSON-RPC</span>. راجع [وثائق كل عميل](/developers/docs/nodes-and-clients/#execution-clients) لمزيد من التفاصيل المتعلقة بلغات برمجة محددة. نوصي بالتحقق من وثائق كل عميل للحصول على أحدث معلومات دعم <span dir="ltr">API</span>.

## مكتبات التسهيل {#convenience-libraries}

على الرغم من أنه يمكنك اختيار التفاعل مباشرة مع عملاء إيثيريوم عبر <span dir="ltr">JSON-RPC API</span>، إلا أن هناك غالباً خيارات أسهل لمطوري التطبيقات اللامركزية (<span dir="ltr">dapp</span>). توجد العديد من مكتبات [JavaScript](/developers/docs/apis/javascript/#available-libraries) و[<span dir="ltr">API</span> للواجهة الخلفية](/developers/docs/apis/backend/#available-libraries) لتوفير واجهات تغليف أعلى <span dir="ltr">JSON-RPC API</span>. باستخدام هذه المكتبات، يمكن للمطورين كتابة دوال بديهية من سطر واحد بلغة البرمجة التي يختارونها لتهيئة طلبات <span dir="ltr">JSON-RPC</span> (داخلياً) والتي تتفاعل مع إيثيريوم.

## واجهات <span dir="ltr">API</span> لعميل الإجماع {#consensus-clients}

تتناول هذه الصفحة بشكل أساسي واجهة <span dir="ltr">API</span> الخاصة بـ <span dir="ltr">JSON-RPC</span> التي يستخدمها عملاء التنفيذ في إيثيريوم. ومع ذلك، يمتلك عملاء الإجماع أيضًا واجهة <span dir="ltr">RPC API</span> تتيح للمستخدمين الاستعلام عن معلومات حول العقدة، وطلب كتل <span dir="ltr">Beacon</span>، وحالة <span dir="ltr">Beacon</span>، وغيرها من المعلومات المتعلقة بالإجماع مباشرة من العقدة. تم توثيق واجهة <span dir="ltr">API</span> هذه في [صفحة الويب الخاصة بواجهة <span dir="ltr">Beacon API</span>](https://ethereum.github.io/beacon-APIs/#/).

تُستخدم أيضًا واجهة <span dir="ltr">API</span> داخلية للتواصل بين العملاء داخل العقدة - أي أنها تمكن عميل الإجماع وعميل التنفيذ من مبادلة البيانات. يُطلق على هذا اسم '<span dir="ltr">Engine API</span>' والمواصفات متاحة على [<span dir="ltr">GitHub</span>](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## مواصفات عميل التنفيذ {#spec}

[اقرأ مواصفات <span dir="ltr">JSON-RPC API</span> الكاملة على GitHub](https://github.com/ethereum/execution-apis). تم توثيق <span dir="ltr">API</span> هذه في [صفحة ويب <span dir="ltr">API</span> التنفيذ](https://ethereum.github.io/execution-apis/) وتتضمن أداة فحص لتجربة جميع الطرق المتاحة.

## الاصطلاحات {#conventions}

### ترميز القيم السداسية العشرية {#hex-encoding}

يتم تمرير نوعين رئيسيين من البيانات عبر JSON: مصفوفات البايت غير المنسقة والكميات. يتم تمرير كلاهما بترميز سداسي عشري ولكن بمتطلبات تنسيق مختلفة.

#### الكميات {#quantities-encoding}

عند ترميز الكميات (الأعداد الصحيحة، الأرقام): يتم ترميزها بالنظام السداسي العشري، وتُسبق بـ <span dir="ltr">"0x"</span>، بأكثر تمثيل مضغوط (استثناء بسيط: يجب تمثيل الصفر كـ <span dir="ltr">"0x0"</span>).

إليك بعض الأمثلة:

- <span dir="ltr">0x41</span> (65 بالنظام العشري)
- <span dir="ltr">0x400</span> (1024 بالنظام العشري)
- خطأ: <span dir="ltr">0x</span> (يجب أن يحتوي دائمًا على رقم واحد على الأقل - الصفر هو <span dir="ltr">"0x0"</span>)
- خطأ: <span dir="ltr">0x0400</span> (لا يُسمح بالأصفار البادئة)
- خطأ: <span dir="ltr">ff</span> (يجب أن يُسبق بـ <span dir="ltr">0x</span>)

### البيانات غير المنسقة {#unformatted-data-encoding}

عند ترميز البيانات غير المنسقة (مصفوفات البايت، عناوين الحسابات، التجزئات، مصفوفات رمز البايت): يتم ترميزها بالنظام السداسي العشري، وتُسبق بـ <span dir="ltr">"0x"</span>، مع رقمين سداسيين عشريين لكل بايت.

إليك بعض الأمثلة:

- <span dir="ltr">0x41</span> (الحجم 1، <span dir="ltr">"A"</span>)
- <span dir="ltr">0x004200</span> (الحجم 3، <span dir="ltr">"0B0"</span>)
- <span dir="ltr">0x</span> (الحجم 0، "")
- خطأ: <span dir="ltr">0xf0f0f</span> (يجب أن يكون عدد الأرقام زوجيًا)
- خطأ: <span dir="ltr">004200</span> (يجب أن يُسبق بـ <span dir="ltr">0x</span>)

### معلمة الكتلة {#block-parameter}

تحتوي الطرق التالية على معلمة الكتلة:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

عند إجراء طلبات تستعلم عن حالة إيثيريوم، تحدد معلمة الكتلة المقدمة ارتفاع الكتلة.

الخيارات التالية ممكنة لمعلمة الكتلة:

- `HEX String` - رقم كتلة صحيح
- `String "earliest"` للكتلة الأقدم/كتلة التكوين
- `String "latest"` - لأحدث كتلة مقترحة
- `String "safe"` - لأحدث كتلة رأس آمنة
- `String "finalized"` - لأحدث كتلة نهائية
- `String "pending"` - للحالة/المعاملات المعلقة

## أمثلة {#examples}

نقدم في هذه الصفحة أمثلة على كيفية استخدام نقاط نهاية <span dir="ltr">JSON_RPC API</span> الفردية باستخدام أداة سطر الأوامر، [<span dir="ltr">curl</span>](https://curl.se). توجد أمثلة نقاط النهاية الفردية هذه أدناه في قسم [أمثلة <span dir="ltr">Curl</span>](#curl-examples). وفي أسفل الصفحة، نقدم أيضًا [مثالًا شاملاً](#usage-example) لتصريف ونشر عقد ذكي باستخدام عقدة جو إيثريوم (<span dir="ltr">Geth</span>)، و<span dir="ltr">JSON_RPC API</span> و<span dir="ltr">curl</span>.

## أمثلة <span dir="ltr">Curl</span> {#curl-examples}

فيما يلي أمثلة على استخدام <span dir="ltr">JSON_RPC API</span> من خلال إجراء طلبات [curl](https://curl.se) إلى عقدة إيثيريوم. يتضمن كل مثال وصفًا لنقطة النهاية المحددة، ومعلماتها، ونوع الإرجاع، ومثالًا عمليًا لكيفية استخدامها.

قد تُرجع طلبات <span dir="ltr">curl</span> رسالة خطأ تتعلق بنوع المحتوى. يرجع ذلك إلى أن خيار `--data` يعين نوع المحتوى إلى `application/x-www-form-urlencoded`. إذا كانت عقدتك تشتكي من ذلك، فقم بتعيين الترويسة يدويًا عن طريق وضع `-H "Content-Type: application/json"` في بداية الاستدعاء. لا تتضمن الأمثلة أيضًا مجموعة عنوان <span dir="ltr">URL/IP</span> والمنفذ والتي يجب أن تكون الوسيطة الأخيرة المعطاة لـ <span dir="ltr">curl</span> (على سبيل المثال، `127.0.0.1:8545`). يأخذ طلب <span dir="ltr">curl</span> الكامل الذي يتضمن هذه البيانات الإضافية الشكل التالي:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## التناقل، الحالة، والتاريخ {#gossip-state-history}

تتطلب مجموعة من طرق <span dir="ltr">JSON-RPC</span> الأساسية بيانات من شبكة إيثيريوم، وتندرج بدقة تحت ثلاث فئات رئيسية: _التناقل، الحالة، والتاريخ_. استخدم الروابط في هذه الأقسام للانتقال إلى كل طريقة، أو استخدم جدول المحتويات لاستكشاف القائمة الكاملة للطرق.

### طرق التناقل {#gossip-methods}

> تتتبع هذه الطرق رأس السلسلة. هذه هي الطريقة التي تشق بها المعاملات طريقها عبر الشبكة، وتجد طريقها إلى الكتل، وكيف يكتشف العملاء الكتل الجديدة.

- [<span dir="ltr">eth_blockNumber</span>](#eth-blocknumber)
- [<span dir="ltr">eth_sendRawTransaction</span>](#eth-sendrawtransaction)

### طرق الحالة {#state-methods}

> الطرق التي تبلغ عن الحالة الحالية لجميع البيانات المخزنة. تشبه "الحالة" قطعة كبيرة مشتركة من ذاكرة الوصول العشوائي (<span dir="ltr">RAM</span>)، وتتضمن أرصدة الحسابات، وبيانات العقود، وتقديرات الغاز.

- [<span dir="ltr">eth_getBalance</span>](#eth-getbalance)
- [<span dir="ltr">eth_getStorageAt</span>](#eth-getstorageat)
- [<span dir="ltr">eth_getTransactionCount</span>](#eth-gettransactioncount)
- [<span dir="ltr">eth_getCode</span>](#eth-getcode)
- [<span dir="ltr">eth_call</span>](#eth-call)
- [<span dir="ltr">eth_estimateGas</span>](#eth-estimategas)

### طرق التاريخ {#history-methods}

> تجلب السجلات التاريخية لكل كتلة رجوعاً إلى التكوين. يشبه هذا ملفاً كبيراً للإلحاق فقط، ويتضمن جميع رؤوس الكتل، وأجسام الكتل، والكتل العمّة، وإيصالات المعاملات.

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

## ساحة تجربة <span dir="ltr">JSON-RPC API</span> {#json-rpc-api-playground}

يمكنك استخدام [أداة ساحة التجربة](https://ethereum-json-rpc.com) لاكتشاف وتجربة طرق <span dir="ltr">API</span>. كما توضح لك الطرق والشبكات التي يدعمها مختلف مزودي العقد.

## طرق <span dir="ltr">JSON-RPC API</span> {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

يُرجع إصدار العميل الحالي.

**المعلمات**

لا يوجد

**المرتجعات**

`String` - إصدار العميل الحالي

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// نتيجة
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### <span dir="ltr">web3_sha3</span> {#web3-sha3}

يُرجع <span dir="ltr">Keccak-256</span> (_وليس_ <span dir="ltr">SHA3-256</span> القياسي) للبيانات المحددة.

**المعلمات**

1. `DATA` - البيانات المراد تحويلها إلى تجزئة <span dir="ltr">SHA3</span>

```js
params: ["0x68656c6c6f20776f726c64"]
```

**المرتجعات**

`DATA` - نتيجة <span dir="ltr">SHA3</span> للسلسلة المحددة.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// نتيجة
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### <span dir="ltr">net_version</span> {#net-version}

يعيد معرف الشبكة الحالي.

**المعلمات**

لا يوجد

**المرتجعات**

`String` - معرف الشبكة الحالي.

القائمة الكاملة لمعرفات الشبكة الحالية متاحة على [<span dir="ltr">chainlist.org</span>](https://chainlist.org). بعض المعرفات الشائعة هي:

- `1`: شبكة إيثيريوم الرئيسية
- `11155111`: شبكة اختبار <span dir="ltr">Sepolia</span>
- `560048`: شبكة اختبار <span dir="ltr">Hoodi</span>

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// نتيجة
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

يُرجع `true` إذا كان العميل يستمع بنشاط لاتصالات الشبكة.

**المعلمات**

لا يوجد

**المرتجعات**

`Boolean` - `true` عند الاستماع، وإلا `false`.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// نتيجة
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

يُرجع عدد الأقران المتصلين حاليًا بالعميل.

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد صحيح يمثل عدد الأقران المتصلين.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// نتيجة
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

يعيد إصدار بروتوكول إيثيريوم الحالي. لاحظ أن هذه الطريقة [غير متوفرة في جو إيثريوم (Geth)](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**المعلمات**

لا يوجد

**المرتجعات**

`String` - إصدار بروتوكول إيثيريوم الحالي

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// نتيجة
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### <span dir="ltr">eth_syncing</span> {#eth-syncing}

يُرجع كائنًا يحتوي على بيانات حول حالة المزامنة أو `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**القيم المرجعة**

تختلف بيانات الإرجاع الدقيقة بين تطبيقات العميل. يُرجع جميع العملاء `False` عندما لا تقوم العقدة بالمزامنة، ويُرجع جميع العملاء الحقول التالية.

`Object|Boolean`، كائن يحتوي على بيانات حالة المزامنة أو `FALSE`، عند عدم المزامنة:

- `startingBlock`: `QUANTITY` - الكتلة التي بدأ عندها الاستيراد (سيتم إعادة تعيينها فقط بعد أن تصل المزامنة إلى رأسها)
- `currentBlock`: `QUANTITY` - الكتلة الحالية، تمامًا مثل <span dir="ltr">eth_blockNumber</span>
- `highestBlock`: `QUANTITY` - أعلى كتلة مُقدرة

ومع ذلك، قد يوفر العملاء الفرديون أيضًا بيانات إضافية. على سبيل المثال، يُرجع <span dir="ltr">Geth</span> ما يلي:

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

بينما يُرجع بيسو (<span dir="ltr">Besu</span>):

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

راجع الوثائق الخاصة بعميلك لمزيد من التفاصيل.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// أو عند عدم المزامنة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

يُرجع عنوان كوين بيس الخاص بالعميل.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  جرب نقطة النهاية في بيئة اللعب
</ButtonLink>

> **ملاحظة:** تم إيقاف هذه الطريقة اعتبارًا من **<span dir="ltr">v1.14.0</span>** ولم تعد مدعومة. ستؤدي محاولة استخدام هذه الطريقة إلى ظهور خطأ <span dir="ltr">"Method not supported"</span>.

**المعلمات**

لا يوجد

**المرتجعات**

`DATA`، 20 بايت - عنوان كوين بيس الحالي.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// نتيجة
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### <span dir="ltr">eth_chainId</span> {#eth-chainid}

يُرجع معرف السلسلة المستخدم في توقيع المعاملات المحمية من إعادة الإرسال.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**القيم المرجعة**

`chainId`، قيمة سداسية عشرية في شكل سلسلة نصية تمثل العدد الصحيح لمعرف السلسلة الحالي.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// نتيجة
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

يُرجع `true` إذا كان العميل يقوم بتعدين كتل جديدة بنشاط. يمكن أن يُرجع هذا `true` فقط لشبكات إثبات العمل (PoW) وقد لا يكون متاحًا في بعض العملاء منذ [الدمج](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`Boolean` - يُرجع `true` إذا كان العميل يقوم بالتعدين، وإلا `false`.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### <span dir="ltr">eth_hashrate</span> {#eth-hashrate}

يُرجع عدد التجزئات في الثانية التي تقوم العقدة بالتعدين بها. يمكن أن يُرجع هذا فقط `true` لشبكات إثبات العمل (PoW) وقد لا يكون متاحًا في بعض العملاء منذ [الدمج](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  تجربة نقطة النهاية في بيئة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**القيم المرجعة**

`QUANTITY` - عدد التجزئات في الثانية.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// نتيجة
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### <span dir="ltr">eth_gasPrice</span> {#eth-gasprice}

يعيد تقديراً للسعر الحالي لكل غاز بوحدة <span dir="ltr">Wei</span>. على سبيل المثال، يفحص عميل بيسو آخر 100 كتلة ويعيد وسيط سعر وحدة الغاز افتراضيًا.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد صحيح يمثل سعر الغاز الحالي بوحدة <span dir="ltr">Wei</span>.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// نتيجة
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### <span dir="ltr">eth_accounts</span> {#eth-accounts}

يعيد قائمة بالعناوين المملوكة للعميل.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**القيم المعادة**

`Array of DATA`، <span dir="ltr">20 Bytes</span> - العناوين المملوكة للعميل.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### <span dir="ltr">eth_blockNumber</span> {#eth-blocknumber}

يُرجع رقم أحدث كتلة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد صحيح لرقم الكتلة الحالية التي يوجد عليها العميل.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// نتيجة
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

يعيد رصيد الحساب في عنوان معين.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  جرب نقطة النهاية في بيئة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">20 Bytes</span> - العنوان المراد التحقق من رصيده.
2. `QUANTITY|TAG` - رقم كتلة صحيح، أو السلسلة `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، راجع [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**القيم المعادة**

`QUANTITY` - عدد صحيح يمثل الرصيد الحالي بوحدة Wei.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

يُرجع القيمة من موضع تخزين في عنوان محدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">20 Bytes</span> - عنوان التخزين.
2. `QUANTITY` - عدد صحيح لموضع التخزين.
3. `QUANTITY|TAG` - عدد صحيح لرقم الكتلة، أو السلسلة `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، راجع [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

**القيم المرجعة**

`DATA` - القيمة في موضع التخزين هذا.

**مثال**
يعتمد حساب الموضع الصحيح على التخزين المراد استرداده. ضع في اعتبارك العقد التالي المنشور في `0x295a70b2de5e3953354a6a8344e616ed314d7251` بواسطة العنوان `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

استرداد قيمة <span dir="ltr">pos0</span> أمر مباشر:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

استرداد عنصر من الخريطة أصعب. يتم حساب موضع عنصر في الخريطة باستخدام:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

هذا يعني أنه لاسترداد التخزين في <span dir="ltr">pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]</span> نحتاج إلى حساب الموضع باستخدام:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

يمكن استخدام وحدة تحكم جو إيثريوم (geth) التي تأتي مع مكتبة Web3 لإجراء الحساب:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

الآن لجلب التخزين:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### <span dir="ltr">eth_getTransactionCount</span> {#eth-gettransactioncount}

يعيد عدد المعاملات _المرسلة_ من عنوان.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">20 Bytes</span> - عنوان.
2. `QUANTITY|TAG` - رقم كتلة صحيح، أو السلسلة `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، راجع [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // حالة عند أحدث كتلة
]
```

**القيم المعادة**

`QUANTITY` - عدد صحيح يمثل عدد المعاملات المرسلة من هذا العنوان.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

يُرجع عدد المعاملات في كتلة من كتلة تطابق تجزئة الكتلة المحددة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة كتلة

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**المرتجعات**

`QUANTITY` - عدد صحيح يمثل عدد المعاملات في هذه الكتلة.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

يُرجع عدد المعاملات في كتلة تطابق رقم الكتلة المحدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  جرب نقطة النهاية في بيئة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - عدد صحيح لرقم كتلة، أو السلسلة النصية `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، كما هو الحال في [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**القيم المرجعة**

`QUANTITY` - عدد صحيح يمثل عدد المعاملات في هذه الكتلة.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### <span dir="ltr">eth_getUncleCountByBlockHash</span> {#eth-getunclecountbyblockhash}

يُرجع عدد الأعمام في كتلة من كتلة تطابق تجزئة الكتلة المحددة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة كتلة

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**المرتجعات**

`QUANTITY` - عدد صحيح يمثل عدد الأعمام في هذه الكتلة.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### <span dir="ltr">eth_getUncleCountByBlockNumber</span> {#eth-getunclecountbyblocknumber}

يُرجع عدد الأعمام في كتلة من كتلة تطابق رقم الكتلة المحدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - عدد صحيح لرقم كتلة، أو السلسلة `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، راجع [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد الأعمام في هذه الكتلة.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

يعيد الرمز الموجود في عنوان معين.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  جرب نقطة النهاية في بيئة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">20 Bytes</span> - العنوان
2. `QUANTITY|TAG` - رقم كتلة صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، راجع [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**المرتجعات**

`DATA` - الرمز من العنوان المحدد.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

تحسب طريقة sign توقيعًا خاصًا بشبكة إيثيريوم باستخدام: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

تؤدي إضافة بادئة إلى الرسالة إلى جعل التوقيع المحسوب مميزًا كتوقيع خاص بشبكة إيثيريوم. يمنع هذا سوء الاستخدام حيث يمكن لتطبيق لامركزي (dapp) ضار توقيع بيانات عشوائية (مثل معاملة) واستخدام التوقيع لانتحال شخصية الضحية.

ملاحظة: يجب أن يكون العنوان المراد التوقيع به غير مقفل.

**المعلمات**

1. `DATA`، <span dir="ltr">20 Bytes</span> - العنوان
2. `DATA`، <span dir="ltr">N Bytes</span> - الرسالة المراد توقيعها

**المرتجعات**

`DATA`: التوقيع

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### <span dir="ltr">eth_signTransaction</span> {#eth-signtransaction}

يوقع معاملة يمكن إرسالها إلى الشبكة في وقت لاحق باستخدام [<span dir="ltr">eth_sendRawTransaction</span>](#eth-sendrawtransaction).

**المعلمات**

1. `Object` - كائن المعاملة

- `type`:
- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - العنوان الذي تُرسل منه المعاملة.
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - (اختياري عند إنشاء عقد جديد) العنوان الذي تُوجه إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري، الافتراضي: <span dir="ltr">90000</span>) عدد صحيح للغاز المقدم لتنفيذ المعاملة. سيعيد الغاز غير المستخدم.
- `gasPrice`: `QUANTITY` - (اختياري، الافتراضي: <span dir="ltr">To-Be-Determined</span>) عدد صحيح لسعر الغاز المستخدم لكل غاز مدفوع، بوحدة <span dir="ltr">Wei</span>.
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة، بوحدة <span dir="ltr">Wei</span>.
- `data`: `DATA` - الرمز المصرّف لعقد أو تجزئة توقيع الطريقة المستدعاة والمعلمات المشفرة.
- `nonce`: `QUANTITY` - (اختياري) عدد صحيح لرقم فريد. يسمح هذا بالكتابة فوق معاملاتك المعلقة التي تستخدم نفس الرقم الفريد.

**المرتجعات**

`DATA`، كائن المعاملة المشفر بـ <span dir="ltr">RLP</span> والموقع من قبل الحساب المحدد.

**مثال**

```js
// طلب
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// نتيجة
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

ينشئ معاملة استدعاء رسالة جديدة أو إنشاء عقد، إذا كان حقل البيانات يحتوي على رمز، ويوقعها باستخدام الحساب المحدد في `from`.

**المعلمات**

1. `Object` - كائن المعاملة

- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - العنوان الذي تُرسل منه المعاملة.
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - (اختياري عند إنشاء عقد جديد) العنوان الذي تُوجه إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري، الافتراضي: <span dir="ltr">90000</span>) عدد صحيح للغاز المقدم لتنفيذ المعاملة. سيعيد الغاز غير المستخدم.
- `gasPrice`: `QUANTITY` - (اختياري، الافتراضي: يُحدد لاحقًا) عدد صحيح يمثل سعر الغاز (gasPrice) المستخدم لكل غاز مدفوع.
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة.
- `input`: `DATA` - الرمز المُصرف لعقد أو تجزئة توقيع الطريقة المستدعاة والمعلمات المشفرة.
- `nonce`: `QUANTITY` - (اختياري) عدد صحيح يمثل رقمًا فريدًا (nonce). يتيح لك هذا الكتابة فوق معاملاتك المعلقة التي تستخدم نفس الرقم الفريد.

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

**القيم المعادة**

`DATA`، <span dir="ltr">32 Bytes</span> - تجزئة المعاملة، أو التجزئة الصفرية إذا لم تكن المعاملة متاحة بعد.

استخدم [eth_getTransactionReceipt](#eth-gettransactionreceipt) للحصول على عنوان العقد، بعد اقتراح المعاملة في كتلة، عند إنشائك لعقد.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

ينشئ معاملة استدعاء رسالة جديدة أو إنشاء عقد للمعاملات الموقعة.

**المعلمات**

1. `DATA`، بيانات المعاملة الموقعة.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**القيم المرجعة**

`DATA`، <span dir="ltr">32 Bytes</span> - تجزئة المعاملة، أو التجزئة الصفرية إذا لم تكن المعاملة متاحة بعد.

استخدم [eth_getTransactionReceipt](#eth-gettransactionreceipt) للحصول على عنوان العقد، بعد اقتراح المعاملة في كتلة، عندما قمت بإنشاء عقد.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

ينفذ استدعاء رسالة جديدًا على الفور دون إنشاء معاملة على سلسلة الكتل. يُستخدم غالبًا لتنفيذ وظائف العقد الذكي للقراءة فقط، على سبيل المثال `balanceOf` لعقد <span dir="ltr">ERC-20</span>.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `Object` - كائن استدعاء المعاملة

- `from`: `DATA`، 20 بايت - (اختياري) العنوان الذي تُرسل منه المعاملة.
- `to`: `DATA`، 20 بايت - العنوان الذي تُوجه إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري) عدد صحيح للغاز المقدم لتنفيذ المعاملة. يستهلك <span dir="ltr">eth_call</span> صفر غاز، ولكن قد تكون هذه المعلمة مطلوبة لبعض عمليات التنفيذ.
- `gasPrice`: `QUANTITY` - (اختياري) عدد صحيح لـ <span dir="ltr">gasPrice</span> المستخدم لكل غاز مدفوع
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة
- `input`: `DATA` - (اختياري) تجزئة توقيع الطريقة والمعلمات المشفرة. للحصول على التفاصيل، راجع [<span dir="ltr">ABI</span> لعقد إيثيريوم في وثائق Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - رقم كتلة صحيح، أو السلسلة `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، راجع [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

**القيم المرجعة**

`DATA` - القيمة المرجعة للعقد المنفذ.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

يُنشئ ويُرجع تقديرًا لمقدار الغاز اللازم للسماح للمعاملة بالاكتمال. لن تتم إضافة المعاملة إلى سلسلة الكتل. لاحظ أن التقدير قد يكون أكثر بكثير من كمية الغاز التي تستخدمها المعاملة فعليًا، لمجموعة متنوعة من الأسباب بما في ذلك آليات EVM وأداء العقدة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

راجع معلمات [eth_call](#eth-call)، باستثناء أن جميع الخصائص اختيارية. إذا لم يتم تحديد حد الغاز، يستخدم جو إيثريوم (geth) حد الغاز للكتلة من الكتلة المعلقة كحد أقصى. ونتيجة لذلك، قد لا يكون التقدير المُرجع كافيًا لتنفيذ الاستدعاء/المعاملة عندما تكون كمية الغاز أعلى من حد الغاز للكتلة المعلقة.

**القيم المرجعة**

`QUANTITY` - كمية الغاز المستخدمة.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

يعيد معلومات حول كتلة بناءً على التجزئة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة.
2. `Boolean` - إذا كان `true` فإنه يعيد كائنات المعاملة الكاملة، وإذا كان `false` فإنه يعيد تجزئات المعاملات فقط.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**القيم المعادة**

`Object` - كائن كتلة، أو `null` عندما لا يتم العثور على كتلة:

- `number`: `QUANTITY` - رقم الكتلة. `null` عندما تكون كتلة معلقة.
- `hash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة. `null` عندما تكون كتلة معلقة.
- `parentHash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة الأصلية.
- `nonce`: `DATA`، <span dir="ltr">8 Bytes</span> - تجزئة إثبات العمل (PoW) المُنشأ. `null` عندما تكون كتلة معلقة، `0x0` لكتل إثبات الحصة (PoS) (منذ الدمج)
- `sha3Uncles`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة <span dir="ltr">SHA3</span> لبيانات الكتل الشقيقة (uncles) في الكتلة.
- `logsBloom`: `DATA`، <span dir="ltr">256 Bytes</span> - مرشح بلوم (bloom filter) لسجلات الكتلة. `null` عندما تكون كتلة معلقة.
- `transactionsRoot`: `DATA`، <span dir="ltr">32 Bytes</span> - جذر شجرة المعاملات للكتلة.
- `stateRoot`: `DATA`، <span dir="ltr">32 Bytes</span> - جذر شجرة الحالة النهائية للكتلة.
- `receiptsRoot`: `DATA`، <span dir="ltr">32 Bytes</span> - جذر شجرة الإيصالات للكتلة.
- `miner`: `DATA`، <span dir="ltr">20 Bytes</span> - عنوان المستفيد الذي مُنحت له مكافآت الكتلة.
- `difficulty`: `QUANTITY` - عدد صحيح يمثل صعوبة هذه الكتلة.
- `totalDifficulty`: `QUANTITY` - عدد صحيح يمثل الصعوبة الإجمالية للسلسلة حتى هذه الكتلة.
- `extraData`: `DATA` - حقل "البيانات الإضافية" لهذه الكتلة.
- `size`: `QUANTITY` - عدد صحيح يمثل حجم هذه الكتلة بالبايت.
- `gasLimit`: `QUANTITY` - الحد الأقصى للغاز المسموح به في هذه الكتلة.
- `gasUsed`: `QUANTITY` - إجمالي الغاز المستخدم بواسطة جميع المعاملات في هذه الكتلة.
- `timestamp`: `QUANTITY` - الطابع الزمني لنظام <span dir="ltr">Unix</span> لوقت تجميع الكتلة.
- `transactions`: `Array` - مصفوفة من كائنات المعاملات، أو تجزئات معاملات بحجم <span dir="ltr">32 Bytes</span> اعتمادًا على المعلمة الأخيرة المعطاة.
- `uncles`: `Array` - مصفوفة من تجزئات الكتل الشقيقة (uncles).

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// نتيجة
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

يُرجع معلومات حول كتلة بناءً على رقم الكتلة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  جرب نقطة النهاية في بيئة الاختبار
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - عدد صحيح لرقم الكتلة، أو السلسلة النصية `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، كما هو موضح في [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - إذا كانت `true` فإنها تُرجع كائنات المعاملة الكاملة، وإذا كانت `false` فإنها تُرجع تجزئات المعاملات فقط.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**القيم المرجعة**
راجع [eth_getBlockByHash](#eth-getblockbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

للنتيجة راجع [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

يعيد المعلومات حول معاملة مطلوبة بواسطة تجزئة المعاملة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  جرب نقطة النهاية في ساحة التجربة
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة المعاملة

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**القيم المعادة**

`Object` - كائن معاملة، أو `null` عند عدم العثور على معاملة:

- `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة التي كانت هذه المعاملة فيها. `null` عندما تكون معلقة.
- `blockNumber`: `QUANTITY` - رقم الكتلة التي كانت هذه المعاملة فيها. `null` عندما تكون معلقة.
- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - عنوان المرسل.
- `gas`: `QUANTITY` - الغاز المقدم من المرسل.
- `gasPrice`: `QUANTITY` - سعر الغاز المقدم من المرسل بوحدة <span dir="ltr">Wei</span>.
- `hash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة المعاملة.
- `input`: `DATA` - البيانات المرسلة مع المعاملة.
- `nonce`: `QUANTITY` - عدد المعاملات التي أجراها المرسل قبل هذه المعاملة.
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - عنوان المستلم. `null` عندما تكون معاملة إنشاء عقد.
- `transactionIndex`: `QUANTITY` - عدد صحيح لموضع مؤشر المعاملة في الكتلة. `null` عندما تكون معلقة.
- `value`: `QUANTITY` - القيمة المحولة بوحدة <span dir="ltr">Wei</span>.
- `v`: `QUANTITY` - معرف استرداد <span dir="ltr">ECDSA</span>
- `r`: `QUANTITY` - توقيع <span dir="ltr">ECDSA r</span>
- `s`: `QUANTITY` - توقيع <span dir="ltr">ECDSA s</span>

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// نتيجة
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

يُرجع معلومات حول معاملة حسب تجزئة الكتلة وموضع مؤشر المعاملة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة.
2. `QUANTITY` - عدد صحيح لموضع مؤشر المعاملة.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**المرتجعات**
انظر [<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

للنتيجة انظر [<span dir="ltr">eth_getTransactionByHash</span>](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

يُرجع معلومات حول معاملة بناءً على رقم الكتلة وموضع مؤشر المعاملة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  جرب نقطة النهاية في بيئة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - رقم كتلة، أو السلسلة `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، كما هو موضح في [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - موضع مؤشر المعاملة.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**المرتجعات**
راجع [eth_getTransactionByHash](#eth-gettransactionbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

للنتيجة راجع [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

يعيد إيصال معاملة بواسطة تجزئة المعاملة.

**ملاحظة** أن الإيصال غير متاح للمعاملات المعلقة.

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة معاملة

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**القيم المعادة**
`Object` - كائن إيصال معاملة، أو `null` عند عدم العثور على إيصال:

- `transactionHash `: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة المعاملة.
- `transactionIndex`: `QUANTITY` - عدد صحيح يمثل موضع مؤشر المعاملة في الكتلة.
- `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة التي كانت هذه المعاملة فيها.
- `blockNumber`: `QUANTITY` - رقم الكتلة التي كانت هذه المعاملة فيها.
- `from`: `DATA`، <span dir="ltr">20 Bytes</span> - عنوان المرسل.
- `to`: `DATA`، <span dir="ltr">20 Bytes</span> - عنوان المستلم. يكون <span dir="ltr">null</span> عندما تكون معاملة إنشاء عقد.
- `cumulativeGasUsed` : `QUANTITY ` - إجمالي كمية الغاز المستخدمة عند تنفيذ هذه المعاملة في الكتلة.
- `effectiveGasPrice` : `QUANTITY` - مجموع الرسم الأساسي والإكرامية المدفوعة لكل وحدة غاز.
- `gasUsed `: `QUANTITY ` - كمية الغاز المستخدمة بواسطة هذه المعاملة المحددة وحدها.
- `contractAddress `: `DATA`، <span dir="ltr">20 Bytes</span> - عنوان العقد الذي تم إنشاؤه، إذا كانت المعاملة عبارة عن إنشاء عقد، وإلا `null`.
- `logs`: `Array` - مصفوفة من كائنات السجل التي أنشأتها هذه المعاملة.
- `logsBloom`: `DATA`، <span dir="ltr">256 Bytes</span> - مرشح بلوم للعملاء الخفيفين لاسترداد السجلات ذات الصلة بسرعة.
- `type`: `QUANTITY` - عدد صحيح يمثل نوع المعاملة، `0x0` للمعاملات القديمة، `0x1` لأنواع قوائم الوصول، `0x2` للرسوم الديناميكية.

كما يعيد _إما_ :

- `root` : `DATA` <span dir="ltr">32 bytes</span> من جذر الحالة بعد المعاملة (قبل بيزنطيوم)
- `status`: `QUANTITY` إما `1` (نجاح) أو `0` (فشل)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// نتيجة
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // سلسلة نصية للعنوان إذا تم إنشاؤه
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // سجلات كما تم إرجاعها بواسطة getFilterLogs، إلخ.
    }],
    "logsBloom": "0x00...0", // مرشح بلوم 256 بايت
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

يُرجع معلومات حول عم لكتلة بناءً على التجزئة وموضع مؤشر العم.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  جرب نقطة النهاية في ساحة التجربة
</ButtonLink>

**المعلمات**

1. `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة.
2. `QUANTITY` - موضع مؤشر العم.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**المرتجعات**
انظر [eth_getBlockByHash](#eth-getblockbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

للنتيجة انظر [eth_getBlockByHash](#eth-getblockbyhash)

**ملاحظة**: لا يحتوي العم على معاملات فردية.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

يُرجع معلومات حول عم لكتلة بناءً على الرقم وموضع مؤشر العم.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - رقم كتلة، أو السلسلة `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، كما هو الحال في [معلمة الكتلة](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - موضع مؤشر العم.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**المرتجعات**
راجع [eth_getBlockByHash](#eth-getblockbyhash)

**ملاحظة**: لا يحتوي العم على معاملات فردية.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

للنتيجة راجع [eth_getBlockByHash](#eth-getblockbyhash)

### <span dir="ltr">eth_newFilter</span> {#eth-newfilter}

ينشئ كائن مرشح، بناءً على خيارات الترشيح، للإشعار عند تغير الحالة (السجلات).
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges).

**ملاحظة حول تحديد مرشحات المواضيع:**
المواضيع تعتمد على الترتيب. المعاملة التي تحتوي على سجل بمواضيع <span dir="ltr">[A, B]</span> ستتطابق مع مرشحات المواضيع التالية:

- `[]` "أي شيء"
- `[A]` "<span dir="ltr">A</span> في الموضع الأول (وأي شيء بعده)"
- `[null, B]` "أي شيء في الموضع الأول و <span dir="ltr">B</span> في الموضع الثاني (وأي شيء بعده)"
- `[A, B]` "<span dir="ltr">A</span> في الموضع الأول و <span dir="ltr">B</span> في الموضع الثاني (وأي شيء بعده)"
- `[[A, B], [A, B]]` "(<span dir="ltr">A</span> أو <span dir="ltr">B</span>) في الموضع الأول و (<span dir="ltr">A</span> أو <span dir="ltr">B</span>) في الموضع الثاني (وأي شيء بعده)"
- **المعلمات**

1. `Object` - خيارات المرشح:

- `fromBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) رقم كتلة صحيح، أو `"latest"` لآخر كتلة مقترحة، أو `"safe"` لأحدث كتلة آمنة، أو `"finalized"` لأحدث كتلة نهائية، أو `"pending"`، `"earliest"` للمعاملات التي لم تُدرج في كتلة بعد.
- `toBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) رقم كتلة صحيح، أو `"latest"` لآخر كتلة مقترحة، أو `"safe"` لأحدث كتلة آمنة، أو `"finalized"` لأحدث كتلة نهائية، أو `"pending"`، `"earliest"` للمعاملات التي لم تُدرج في كتلة بعد.
- `address`: `DATA|Array`، <span dir="ltr">20 Bytes</span> - (اختياري) عنوان عقد أو قائمة عناوين يجب أن تصدر منها السجلات.
- `topics`: `Array of DATA`، - (اختياري) مصفوفة من مواضيع `DATA` بحجم <span dir="ltr">32 Bytes</span>. المواضيع تعتمد على الترتيب. يمكن أن يكون كل موضوع أيضًا مصفوفة من البيانات مع خيارات "أو" (<span dir="ltr">or</span>).

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

**المرتجعات**
`QUANTITY` - معرف المرشح.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### <span dir="ltr">eth_newBlockFilter</span> {#eth-newblockfilter}

ينشئ مرشحًا في العقدة، للإشعار عند وصول كتلة جديدة.
للتحقق مما إذا كانت الحالة قد تغيرت، قم باستدعاء [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges).

**المعلمات**
لا يوجد

**المرتجعات**
`QUANTITY` - معرف المرشح.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// نتيجة
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### <span dir="ltr">eth_newPendingTransactionFilter</span> {#eth-newpendingtransactionfilter}

ينشئ مرشحًا في العقدة، للإشعار عند وصول معاملات معلقة جديدة.
للتحقق مما إذا كانت الحالة قد تغيرت، قم باستدعاء [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges).

**المعلمات**
لا يوجد

**المرتجعات**
`QUANTITY` - معرف المرشح.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// نتيجة
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### <span dir="ltr">eth_uninstallFilter</span> {#eth-uninstallfilter}

يقوم بإلغاء تثبيت مرشح بمعرف محدد. يجب استدعاؤه دائمًا عندما لا تعود هناك حاجة للمراقبة.
بالإضافة إلى ذلك، تنتهي مهلة المرشحات عندما لا يتم طلبها باستخدام [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges) لفترة من الوقت.

**المعلمات**

1. `QUANTITY` - معرف المرشح.

```js
params: [
  "0xb", // 11
]
```

**القيم المرجعة**
`Boolean` - `true` إذا تم إلغاء تثبيت المرشح بنجاح، وإلا `false`.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// نتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

طريقة استطلاع لمرشح، والتي تُرجع مصفوفة من السجلات التي حدثت منذ آخر استطلاع.

**المعلمات**

1. `QUANTITY` - معرف المرشح.

```js
params: [
  "0x16", // 22
]
```

**القيم المرجعة**
`Array` - مصفوفة من كائنات السجل، أو مصفوفة فارغة إذا لم يتغير شيء منذ آخر استطلاع.

- بالنسبة للمرشحات التي تم إنشاؤها باستخدام `eth_newBlockFilter` تكون القيم المرجعة عبارة عن تجزئات الكتل (`DATA`، <span dir="ltr">32 Bytes</span>)، على سبيل المثال، `["0x3454645634534..."]`.
- بالنسبة للمرشحات التي تم إنشاؤها باستخدام `eth_newPendingTransactionFilter ` تكون القيم المرجعة عبارة عن تجزئات المعاملات (`DATA`، <span dir="ltr">32 Bytes</span>)، على سبيل المثال، `["0x6345343454645..."]`.
- بالنسبة للمرشحات التي تم إنشاؤها باستخدام `eth_newFilter` تكون السجلات عبارة عن كائنات تحتوي على المعلمات التالية:
  - `removed`: `TAG` - `true` عندما تتم إزالة السجل، بسبب إعادة التنظيم للسلسلة. `false` إذا كان سجلاً صالحًا.
  - `logIndex`: `QUANTITY` - عدد صحيح لموضع مؤشر السجل في الكتلة. `null` عندما يكون سجلاً معلقًا.
  - `transactionIndex`: `QUANTITY` - عدد صحيح لموضع مؤشر المعاملة التي تم إنشاء السجل منها. `null` عندما يكون سجلاً معلقًا.
  - `transactionHash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة المعاملة التي تم إنشاء هذا السجل منها. `null` عندما يكون سجلاً معلقًا.
  - `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - تجزئة الكتلة التي كان هذا السجل موجودًا فيها. `null` عندما يكون معلقًا. `null` عندما يكون سجلاً معلقًا.
  - `blockNumber`: `QUANTITY` - رقم الكتلة التي كان هذا السجل موجودًا فيها. `null` عندما يكون معلقًا. `null` عندما يكون سجلاً معلقًا.
  - `address`: `DATA`، <span dir="ltr">20 Bytes</span> - العنوان الذي نشأ منه هذا السجل.
  - `data`: `DATA` - بيانات سجل غير مفهرسة متغيرة الطول. (في _Solidity_: صفر أو أكثر من وسيطات السجل غير المفهرسة بحجم <span dir="ltr">32 Bytes</span>.)
  - `topics`: `Array of DATA` - مصفوفة من 0 إلى 4 `DATA` بحجم <span dir="ltr">32 Bytes</span> من وسيطات السجل المفهرسة. (في _Solidity_: الموضوع الأول هو _تجزئة_ توقيع الحدث (على سبيل المثال، `Deposit(address,bytes32,uint256)`)، إلا إذا قمت بتعريف الحدث باستخدام المحدد `anonymous`.)

- **مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// نتيجة
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

يعيد مصفوفة بجميع السجلات التي تطابق عامل التصفية بالمعرف المحدد.

**المعلمات**

1. `QUANTITY` - معرف عامل التصفية.

```js
params: [
  "0x16", // 22
]
```

**القيم المعادة**
راجع [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

للنتيجة راجع [<span dir="ltr">eth_getFilterChanges</span>](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

يعيد مصفوفة بجميع السجلات التي تطابق كائن تصفية معين.

**المعلمات**

1. `Object` - خيارات التصفية:

- `fromBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) رقم الكتلة كعدد صحيح، أو `"latest"` لآخر كتلة مقترحة، أو `"safe"` لأحدث كتلة آمنة، أو `"finalized"` لأحدث كتلة نهائية، أو `"pending"`، `"earliest"` للمعاملات التي لم تُدرج في كتلة بعد.
- `toBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) رقم الكتلة كعدد صحيح، أو `"latest"` لآخر كتلة مقترحة، أو `"safe"` لأحدث كتلة آمنة، أو `"finalized"` لأحدث كتلة نهائية، أو `"pending"`، `"earliest"` للمعاملات التي لم تُدرج في كتلة بعد.
- `address`: `DATA|Array`، <span dir="ltr">20 Bytes</span> - (اختياري) عنوان العقد أو قائمة بالعناوين التي يجب أن تصدر منها السجلات.
- `topics`: `Array of DATA`، - (اختياري) مصفوفة من مواضيع `DATA` بحجم <span dir="ltr">32 Bytes</span>. المواضيع تعتمد على الترتيب. يمكن أن يكون كل موضوع أيضًا مصفوفة من البيانات (DATA) مع خيارات "أو" (or).
- `blockHash`: `DATA`، <span dir="ltr">32 Bytes</span> - (اختياري، **مستقبلي**) مع إضافة <span dir="ltr">EIP-234</span>، سيكون `blockHash` خيار تصفية جديدًا يقصر السجلات المعادة على الكتلة الفردية ذات التجزئة بحجم <span dir="ltr">32-byte</span> `blockHash`. استخدام `blockHash` يعادل `fromBlock` = `toBlock` = رقم الكتلة ذات التجزئة `blockHash`. إذا كان `blockHash` موجودًا في معايير التصفية، فلن يُسمح باستخدام `fromBlock` ولا `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**القيم المعادة**
انظر [eth_getFilterChanges](#eth-getfilterchanges)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

للنتيجة انظر [eth_getFilterChanges](#eth-getfilterchanges)

## مثال على الاستخدام {#usage-example}

### نشر عقد باستخدام <span dir="ltr">JSON_RPC</span> {#deploying-contract}

يتضمن هذا القسم عرضًا توضيحيًا لكيفية نشر عقد باستخدام واجهة <span dir="ltr">RPC</span> فقط. هناك طرق بديلة لنشر العقود حيث يتم تجريد هذا التعقيد — على سبيل المثال، باستخدام مكتبات مبنية فوق واجهة <span dir="ltr">RPC</span> مثل [Web3.js](https://web3js.readthedocs.io/) و[Web3.py](https://github.com/ethereum/web3.py). هذه التجريدات بشكل عام أسهل في الفهم وأقل عرضة للخطأ، ولكن لا يزال من المفيد فهم ما يحدث داخليًا.

فيما يلي عقد ذكي بسيط يسمى `Multiply7` سيتم نشره باستخدام واجهة <span dir="ltr">JSON-RPC</span> إلى عقدة إيثيريوم. يفترض هذا البرنامج التعليمي أن القارئ يقوم بالفعل بتشغيل عقدة جو إيثريوم (geth). يتوفر المزيد من المعلومات حول العقد والعملاء [هنا](/developers/docs/nodes-and-clients/run-a-node). يُرجى الرجوع إلى وثائق [العميل](/developers/docs/nodes-and-clients/) الفردية لمعرفة كيفية بدء <span dir="ltr">HTTP JSON-RPC</span> للعملاء غير Geth. يعمل معظم العملاء افتراضيًا على `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

أول شيء يجب فعله هو التأكد من تمكين واجهة <span dir="ltr">HTTP RPC</span>. هذا يعني أننا نزود جو إيثريوم (geth) بعلامة `--http` عند بدء التشغيل. في هذا المثال، نستخدم عقدة جو إيثريوم (geth) على سلسلة تطوير خاصة. باستخدام هذا النهج، لا نحتاج إلى إيثر على الشبكة الحقيقية.

```bash
geth --http --dev console 2>>geth.log
```

سيؤدي هذا إلى بدء واجهة <span dir="ltr">HTTP RPC</span> على `http://localhost:8545`.

يمكننا التحقق من تشغيل الواجهة عن طريق استرداد عنوان كوين بيس (عن طريق الحصول على العنوان الأول من مصفوفة الحسابات) والرصيد باستخدام [curl](https://curl.se). يُرجى ملاحظة أن البيانات في هذه الأمثلة ستختلف على عقدتك المحلية. إذا كنت ترغب في تجربة هذه الأوامر، فاستبدل معلمات الطلب في طلب curl الثاني بالنتيجة التي تم إرجاعها من الطلب الأول.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

نظرًا لأن الأرقام مشفرة بالنظام السداسي العشري، يتم إرجاع الرصيد بوحدة <span dir="ltr">Wei</span> كسلسلة سداسية عشرية. إذا أردنا الحصول على الرصيد بوحدة إيثر كرقم، يمكننا استخدام Web3 من وحدة تحكم جو إيثريوم (geth).

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

الآن بعد أن أصبح هناك بعض الإيثر على سلسلة التطوير الخاصة بنا، يمكننا نشر العقد. الخطوة الأولى هي تصريف عقد Multiply7 إلى رمز البايت الذي يمكن إرساله إلى جهاز إيثيريوم الظاهري (EVM). لتثبيت solc، مُصرّف Solidity، اتبع [وثائق Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (قد ترغب في استخدام إصدار `solc` أقدم لمطابقة [إصدار المُصرّف المستخدم في مثالنا](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

الخطوة التالية هي تصريف عقد Multiply7 إلى رمز البايت الذي يمكن إرساله إلى جهاز إيثيريوم الظاهري (EVM).

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

الآن بعد أن أصبح لدينا الرمز المُصرّف، نحتاج إلى تحديد مقدار الغاز الذي يكلفه نشره. تحتوي واجهة <span dir="ltr">RPC</span> على طريقة `eth_estimateGas` التي ستعطينا تقديرًا.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

وأخيرًا نشر العقد.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

يتم قبول المعاملة بواسطة العقدة ويتم إرجاع تجزئة المعاملة. يمكن استخدام هذه التجزئة لتتبع المعاملة. الخطوة التالية هي تحديد العنوان الذي تم نشر عقدنا فيه. ستؤدي كل معاملة يتم تنفيذها إلى إنشاء إيصال. يحتوي هذا الإيصال على معلومات مختلفة حول المعاملة مثل الكتلة التي تم تضمين المعاملة فيها ومقدار الغاز الذي استخدمه جهاز إيثيريوم الظاهري (EVM). إذا أنشأت المعاملة عقدًا، فستحتوي أيضًا على عنوان العقد. يمكننا استرداد الإيصال باستخدام طريقة <span dir="ltr">RPC</span> `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

تم إنشاء عقدنا على `0x4d03d617d700cf81935d7f797f4e2ae719648262`. النتيجة الفارغة (null) بدلاً من الإيصال تعني أن المعاملة لم يتم تضمينها في كتلة بعد. انتظر لحظة وتحقق مما إذا كان عميل الإجماع الخاص بك قيد التشغيل وحاول مرة أخرى.

#### التفاعل مع العقود الذكية {#interacting-with-smart-contract}

في هذا المثال، سنرسل معاملة باستخدام `eth_sendTransaction` إلى طريقة `multiply` الخاصة بالعقد.

يتطلب `eth_sendTransaction` عدة وسائط، وتحديدًا `from` و`to` و`data`. `From` هو العنوان العام لحسابنا، و`to` هو عنوان العقد. تحتوي وسيطة `data` على حمولة تحدد الطريقة التي يجب استدعاؤها وبأي وسائط. هنا يأتي دور [واجهة التطبيق الثنائية (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html). واجهة التطبيق الثنائية (ABI) هي ملف JSON يحدد كيفية تعريف وتشفير البيانات لجهاز إيثيريوم الظاهري (EVM).

تحدد بايتات الحمولة الطريقة التي يتم استدعاؤها في العقد. هذه هي أول <span dir="ltr">4</span> بايتات من تجزئة كيكاك (Keccak) لاسم الدالة وأنواع وسائطها، مشفرة بالنظام السداسي العشري. تقبل دالة multiply نوع uint وهو اسم مستعار لـ uint256. هذا يتركنا مع:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

الخطوة التالية هي تشفير الوسائط. يوجد uint256 واحد فقط، لنقل، القيمة <span dir="ltr">6</span>. تحتوي واجهة التطبيق الثنائية (ABI) على قسم يحدد كيفية تشفير أنواع uint256.

`int<M>: enc(X)` هو تشفير المتمم الثنائي بنظام النهاية الكبرى لـ X، مبطن على الجانب ذي الترتيب الأعلى (الأيسر) بـ 0xff لـ X السالبة وببايتات صفرية لـ X الموجبة بحيث يكون الطول مضاعفًا لـ <span dir="ltr">32</span> بايت.

يتم تشفير هذا إلى `0000000000000000000000000000000000000000000000000000000000000006`.

من خلال الجمع بين محدد الدالة والوسيطة المشفرة، ستكون بياناتنا `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

يمكن الآن إرسال هذا إلى العقدة:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

نظرًا لأنه تم إرسال معاملة، تم إرجاع تجزئة المعاملة. يؤدي استرداد الإيصال إلى إعطاء:

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

يحتوي الإيصال على سجل. تم إنشاء هذا السجل بواسطة جهاز إيثيريوم الظاهري (EVM) عند تنفيذ المعاملة وتم تضمينه في الإيصال. تُظهر دالة `multiply` أنه تم إطلاق حدث `Print` مع المدخلات مضروبة في <span dir="ltr">7</span>. نظرًا لأن وسيطة حدث `Print` كانت uint256، يمكننا فك تشفيرها وفقًا لقواعد واجهة التطبيق الثنائية (ABI) مما سيتركنا مع الرقم العشري المتوقع <span dir="ltr">42</span>. بصرف النظر عن البيانات، تجدر الإشارة إلى أنه يمكن استخدام المواضيع لتحديد الحدث الذي أنشأ السجل:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

كانت هذه مجرد مقدمة موجزة لبعض المهام الأكثر شيوعًا، والتي توضح الاستخدام المباشر لـ <span dir="ltr">JSON-RPC</span>.

## مواضيع ذات صلة {#related-topics}

- [مواصفات <span dir="ltr">JSON-RPC</span>](http://www.jsonrpc.org/specification)
- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [واجهات برمجة تطبيقات (<span dir="ltr">APIs</span>) لـ <span dir="ltr">JavaScript</span>](/developers/docs/apis/javascript/)
- [واجهات برمجة تطبيقات (<span dir="ltr">APIs</span>) للواجهة الخلفية](/developers/docs/apis/backend/)
- [عملاء التنفيذ](/developers/docs/nodes-and-clients/#execution-clients)