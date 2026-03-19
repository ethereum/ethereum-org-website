---
title: واجهة برمجة تطبيقات JSON-RPC
description: بروتوكول استدعاء الإجراء عن بُعد (RPC) خفيف الوزن وعديم الحالة لعملاء إيثريوم.
lang: ar
---

لكي يتفاعل تطبيق برمجي مع البلوك تشين الخاص بـ [إيثريوم](/) - إما عن طريق قراءة بيانات البلوك تشين أو إرسال المعاملات إلى شبكة - يجب أن يتصل بـ عقدة إيثريوم.

لهذا الغرض، يطبق كل [عميل إيثريوم](/developers/docs/nodes-and-clients/#execution-clients) [مواصفات JSON-RPC](https://github.com/ethereum/execution-apis)، بحيث تكون هناك مجموعة موحدة من الطرق التي يمكن للتطبيقات الاعتماد عليها بغض النظر عن العقدة المحددة أو تنفيذ العميل.

[JSON-RPC](https://www.jsonrpc.org/specification) هو بروتوكول استدعاء الإجراء عن بُعد (RPC) خفيف الوزن وعديم الحالة. يحدد العديد من هياكل البيانات والقواعد المتعلقة بمعالجتها. وهو مستقل عن وسيلة النقل حيث يمكن استخدام المفاهيم داخل نفس العملية، أو عبر مآخذ التوصيل (sockets)، أو عبر HTTP، أو في العديد من بيئات تمرير الرسائل المختلفة. يستخدم JSON (RFC 4627) كتنسيق للبيانات.

## تنفيذات العميل {#client-implementations}

قد يستخدم كل من عملاء إيثريوم لغات برمجة مختلفة عند تنفيذ مواصفات JSON-RPC. راجع [وثائق كل عميل](/developers/docs/nodes-and-clients/#execution-clients) لمزيد من التفاصيل المتعلقة بلغات برمجة محددة. نوصي بمراجعة وثائق كل عميل للحصول على أحدث المعلومات حول دعم واجهة برمجة التطبيقات (API).

## مكتبات التسهيل {#convenience-libraries}

بينما يمكنك اختيار التفاعل مباشرة مع عملاء إيثريوم عبر واجهة برمجة تطبيقات JSON-RPC، غالبًا ما تكون هناك خيارات أسهل لمطوري التطبيقات اللامركزية. توجد العديد من مكتبات [JavaScript](/developers/docs/apis/javascript/#available-libraries) و[واجهة برمجة تطبيقات الواجهة الخلفية](/developers/docs/apis/backend/#available-libraries) التي توفر واجهات تغليف (wrappers) مبنية على واجهة برمجة تطبيقات JSON-RPC. باستخدام هذه المكتبات، يمكن للمطورين كتابة دوال بديهية من سطر واحد بلغة البرمجة التي يختارونها لتهيئة طلبات JSON-RPC (في الخلفية) والتي تتفاعل مع إيثريوم.

## واجهات برمجة تطبيقات عميل الإجماع {#consensus-clients}

تتناول هذه الصفحة بشكل أساسي واجهة برمجة تطبيقات JSON-RPC التي يستخدمها عملاء التنفيذ في إيثريوم. ومع ذلك، يمتلك عملاء الإجماع أيضًا واجهة برمجة تطبيقات RPC تسمح للمستخدمين بالاستعلام عن معلومات حول العقدة، وطلب كتل المنارة، وحالة المنارة، وغيرها من المعلومات المتعلقة بالإجماع مباشرة من العقدة. تم توثيق واجهة برمجة التطبيقات هذه على [صفحة واجهة برمجة تطبيقات المنارة (Beacon API)](https://ethereum.github.io/beacon-APIs/#/).

تُستخدم أيضًا واجهة برمجة تطبيقات داخلية للتواصل بين العملاء داخل العقدة - أي أنها تمكّن عميل الإجماع وعميل التنفيذ من تبادل البيانات. يُطلق على هذا اسم 'Engine API' والمواصفات متاحة على [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## مواصفات عميل التنفيذ {#spec}

[اقرأ مواصفات واجهة برمجة تطبيقات JSON-RPC الكاملة على GitHub](https://github.com/ethereum/execution-apis). تم توثيق واجهة برمجة التطبيقات هذه على [صفحة الويب الخاصة بواجهة برمجة تطبيقات التنفيذ](https://ethereum.github.io/execution-apis/) وتتضمن أداة فحص (Inspector) لتجربة جميع الطرق المتاحة.

## الاصطلاحات {#conventions}

### ترميز القيمة السداسية العشرية {#hex-encoding}

يتم تمرير نوعين رئيسيين من البيانات عبر JSON: مصفوفات البايت غير المنسقة والكميات. يتم تمرير كلاهما بترميز سداسي عشري ولكن بمتطلبات تنسيق مختلفة.

#### الكميات {#quantities-encoding}

عند ترميز الكميات (الأعداد الصحيحة، الأرقام): قم بترميزها بالنظام السداسي العشري، مع إضافة البادئة "0x"، وهو التمثيل الأكثر إيجازًا (استثناء بسيط: يجب تمثيل الصفر كـ "0x0").

إليك بعض الأمثلة:

- 0x41 (65 بالنظام العشري)
- 0x400 (1024 بالنظام العشري)
- خطأ: 0x (يجب أن يحتوي دائمًا على رقم واحد على الأقل - الصفر هو "0x0")
- خطأ: 0x0400 (لا يُسمح بالأصفار البادئة)
- خطأ: ff (يجب أن يسبقه 0x)

### البيانات غير المنسقة {#unformatted-data-encoding}

عند ترميز البيانات غير المنسقة (مصفوفات البايت، عناوين الحسابات، التجزئة (هاش)، مصفوفات الرمز الثانوي (bytecode)): قم بترميزها بالنظام السداسي العشري، مع إضافة البادئة "0x"، ورقمين سداسيين عشريين لكل بايت.

إليك بعض الأمثلة:

- 0x41 (الحجم 1، "A")
- 0x004200 (الحجم 3، "0B0")
- 0x (الحجم 0، "")
- خطأ: 0xf0f0f (يجب أن يكون عدد الأرقام زوجيًا)
- خطأ: 004200 (يجب أن يسبقه 0x)

### معلمة البلوك {#block-parameter}

تحتوي الطرق التالية على معلمة بلوك:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

عند إجراء طلبات تستعلم عن حالة إيثريوم، تحدد معلمة البلوك المقدمة ارتفاع البلوك.

الخيارات التالية ممكنة لمعلمة البلوك:

- `HEX String` - رقم بلوك صحيح
- `String "earliest"` للبلوك الأقدم/التكويني
- `String "latest"` - لأحدث بلوك مقترح
- `String "safe"` - لأحدث بلوك رأس آمن
- `String "finalized"` - لأحدث بلوك نهائي
- `String "pending"` - للحالة/المعاملات المعلقة

## أمثلة

نقدم في هذه الصفحة أمثلة على كيفية استخدام نقاط نهاية واجهة برمجة تطبيقات JSON_RPC الفردية باستخدام أداة سطر الأوامر، [curl](https://curl.se). توجد أمثلة نقاط النهاية الفردية هذه أدناه في قسم [أمثلة Curl](#curl-examples). وفي أسفل الصفحة، نقدم أيضًا [مثالاً شاملاً](#usage-example) لتجميع ونشر عقد ذكي باستخدام عقدة Geth، وواجهة برمجة تطبيقات JSON_RPC، وcurl.

## أمثلة Curl {#curl-examples}

تتوفر أدناه أمثلة على استخدام واجهة برمجة تطبيقات JSON_RPC من خلال إجراء طلبات [curl](https://curl.se) إلى عقدة إيثريوم. يتضمن كل مثال وصفًا لنقطة النهاية المحددة، ومعلماتها، ونوع الإرجاع، ومثالًا عمليًا لكيفية استخدامها.

قد تُرجع طلبات curl رسالة خطأ تتعلق بنوع المحتوى. ويرجع ذلك إلى أن خيار `--data` يعين نوع المحتوى إلى `application/x-www-form-urlencoded`. إذا كانت عقدتك تبلغ عن خطأ بخصوص هذا، فقم بتعيين الترويسة يدويًا عن طريق وضع `-H "Content-Type: application/json"` في بداية الاستدعاء. لا تتضمن الأمثلة أيضًا مجموعة عنوان URL/IP والمنفذ والتي يجب أن تكون الوسيطة الأخيرة المعطاة لـ curl (على سبيل المثال، `127.0.0.1:8545`). يأخذ طلب curl الكامل الذي يتضمن هذه البيانات الإضافية الشكل التالي:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## النشر (Gossip)، الحالة، التاريخ {#gossip-state-history}

تتطلب مجموعة من طرق JSON-RPC الأساسية بيانات من شبكة إيثريوم، وتندرج بدقة في ثلاث فئات رئيسية: _النشر (Gossip)، والحالة، والتاريخ_. استخدم الروابط في هذه الأقسام للانتقال إلى كل طريقة، أو استخدم جدول المحتويات لاستكشاف القائمة الكاملة للطرق.

### طرق النشر (Gossip) {#gossip-methods}

> تتتبع هذه الطرق رأس السلسلة. هذه هي الطريقة التي تشق بها المعاملات طريقها عبر الشبكة، وتجد طريقها إلى الكتل، وكيف يكتشف العملاء الكتل الجديدة.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### طرق الحالة {#state_methods}

> الطرق التي تبلغ عن الحالة الحالية لجميع البيانات المخزنة. تشبه "الحالة" قطعة كبيرة مشتركة من ذاكرة الوصول العشوائي (RAM)، وتتضمن أرصدة الحسابات، وبيانات العقود، وتقديرات الغاز.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### طرق التاريخ {#history_methods}

> تجلب السجلات التاريخية لكل كتلة وصولاً إلى كتلة التكوين (genesis). يشبه هذا ملفًا كبيرًا للإلحاق فقط، ويتضمن جميع ترويسات الكتل، وأجسام الكتل، وكتل العم (uncle blocks)، وإيصالات المعاملات.

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

## ساحة تجارب واجهة برمجة تطبيقات JSON-RPC

يمكنك استخدام [أداة ساحة التجارب](https://ethereum-json-rpc.com) لاكتشاف وتجربة طرق واجهة برمجة التطبيقات (API). كما توضح لك الطرق والشبكات المدعومة من قِبل مختلف مزودي العقد.

## طرق واجهة برمجة تطبيقات JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

يُرجع إصدار العميل الحالي.

**المعلمات**

لا يوجد

**المرتجعات**

`String` - إصدار العميل الحالي

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result // النتيجة
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

يُرجع Keccak-256 (_وليس_ SHA3-256 القياسي) للبيانات المحددة.

**المعلمات**

1. `DATA` - البيانات المراد تحويلها إلى التجزئة (هاش) SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**المرتجعات**

`DATA` - نتيجة SHA3 للسلسلة المحددة.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result // النتيجة
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

يُرجع مُعرّف الشبكة الحالي.

**المعلمات**

لا يوجد

**المرتجعات**

`String` - مُعرّف الشبكة الحالي.

القائمة الكاملة لمُعرّفات الشبكة الحالية متاحة على [chainlist.org](https://chainlist.org). بعض المُعرّفات الشائعة هي:

- `1`: الشبكة الرئيسية لإيثريوم (Ethereum Mainnet)
- `11155111`: شبكة الاختبار Sepolia
- `560048` : شبكة الاختبار Hoodi

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result // النتيجة
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

يُرجع `true` إذا كان العميل يستمع بنشاط لاتصالات الشبكة.

**المعلمات**

لا يوجد

**المرتجعات**

`Boolean` - `true` عند الاستماع، وإلا `false`.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result // النتيجة
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

يُرجع عدد الأقران المتصلين حاليًا بالعميل.

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد الأقران المتصلين.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result // النتيجة
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2 // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

يُرجع إصدار بروتوكول إيثريوم الحالي. لاحظ أن هذه الطريقة [غير متوفرة في Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**المعلمات**

لا يوجد

**المرتجعات**

`String` - إصدار بروتوكول إيثريوم الحالي

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result // النتيجة
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

يُرجع كائنًا يحتوي على بيانات حول حالة المزامنة أو `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

تختلف بيانات الإرجاع الدقيقة بين تطبيقات العميل. تُرجع جميع العملاء `False` عندما لا تقوم العقدة بالمزامنة، وتُرجع جميع العملاء الحقول التالية.

`Object|Boolean`، كائن يحتوي على بيانات حالة المزامنة أو `FALSE`، عند عدم المزامنة:

- `startingBlock`: `QUANTITY` - البلوك الذي بدأ عنده الاستيراد (سيتم إعادة تعيينه فقط، بعد أن تصل المزامنة إلى رأسها)
- `currentBlock`: `QUANTITY` - البلوك الحالي، نفس eth_blockNumber
- `highestBlock`: `QUANTITY` - أعلى بلوك مُقدّر

ومع ذلك، قد توفر العملاء الفردية أيضًا بيانات إضافية. على سبيل المثال، يُرجع Geth ما يلي:

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

بينما يُرجع Besu:

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
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing // أو عند عدم المزامنة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

يُرجع عنوان coinbase للعميل.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

> **ملاحظة:** تم إيقاف هذه الطريقة اعتبارًا من الإصدار **v1.14.0** ولم تعد مدعومة. ستؤدي محاولة استخدام هذه الطريقة إلى ظهور خطأ "الطريقة غير مدعومة".

**المعلمات**

لا يوجد

**المرتجعات**

`DATA`، 20 بايت - عنوان coinbase الحالي.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result // النتيجة
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

يُرجع مُعرّف السلسلة المستخدم لتوقيع المعاملات المحمية من إعادة التشغيل.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`chainId`، قيمة سداسية عشرية كسلسلة تمثل العدد الصحيح لمُعرّف السلسلة الحالي.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result // النتيجة
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

يُرجع `true` إذا كان العميل يقوم بتعدين كتل جديدة بنشاط. يمكن أن يُرجع هذا `true` فقط لشبكات إثبات العمل وقد لا يكون متاحًا في بعض العملاء منذ [الدمج](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`Boolean` - يُرجع `true` إذا كان العميل يقوم بالتعدين، وإلا `false`.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

يُرجع عدد التجزئات في الثانية التي تقوم العقدة بالتعدين بها. يمكن أن يُرجع هذا `true` فقط لشبكات إثبات العمل وقد لا يكون متاحًا في بعض العملاء منذ [الدمج](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد التجزئات في الثانية.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result // النتيجة
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

يُرجع تقديرًا لسعر الغاز الحالي بوحدة wei. على سبيل المثال، يفحص عميل Besu آخر 100 بلوك ويُرجع متوسط سعر وحدة الغاز افتراضيًا.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد صحيح لسعر الغاز الحالي بوحدة wei.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result // النتيجة
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

يُرجع قائمة بالعناوين المملوكة للعميل.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`Array of DATA`، 20 بايت - العناوين المملوكة للعميل.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

يُرجع رقم أحدث بلوك.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

لا يوجد

**المرتجعات**

`QUANTITY` - عدد صحيح لرقم البلوك الحالي الذي يتواجد عليه العميل.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result // النتيجة
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207 // 1207
}
```

### eth_getBalance {#eth_getbalance}

يُرجع رصيد الحساب في عنوان محدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 20 بايت - العنوان للتحقق من الرصيد.
2. `QUANTITY|TAG` - عدد صحيح لرقم البلوك، أو السلسلة `"latest"`، `"earliest"`، `"pending"`، `"safe"`، أو `"finalized"`، راجع [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**المرتجعات**

`QUANTITY` - عدد صحيح للرصيد الحالي بوحدة wei.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000 // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

يُرجع القيمة من موضع تخزين في عنوان محدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 20 بايت - عنوان التخزين.
2. `QUANTITY` - عدد صحيح للموضع في التخزين.
3. `QUANTITY|TAG` - عدد صحيح لرقم البلوك، أو السلسلة `"latest"`، `"earliest"`، `"pending"`، `"safe"`، `"finalized"`، راجع [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter)

**المرتجعات**

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

استرداد قيمة pos0 أمر مباشر:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

استرداد عنصر من الخريطة (map) أصعب. يتم حساب موضع عنصر في الخريطة باستخدام:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

هذا يعني أنه لاسترداد التخزين في pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] نحتاج إلى حساب الموضع باستخدام:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

يمكن استخدام وحدة تحكم geth التي تأتي مع مكتبة web3 لإجراء الحساب:

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

### eth_getTransactionCount {#eth_gettransactioncount}

يُرجع عدد المعاملات _المرسلة_ من عنوان.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 20 بايت - العنوان.
2. `QUANTITY|TAG` - عدد صحيح لرقم البلوك، أو السلسلة `"latest"`، `"earliest"`، `"pending"`، `"safe"` أو `"finalized"`، راجع [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block // الحالة عند أحدث كتلة
]
```

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد المعاملات المرسلة من هذا العنوان.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1 // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

يُرجع عدد المعاملات في بلوك من بلوك يطابق تجزئة (هاش) البلوك المحددة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لبلوك

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد المعاملات في هذا البلوك.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139 // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

يُرجع عدد المعاملات في بلوك يطابق رقم البلوك المحدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - عدد صحيح لرقم بلوك، أو السلسلة `"earliest"`، `"latest"`، `"pending"`، `"safe"` أو `"finalized"`، كما في [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234 // 20396234
]
```

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد المعاملات في هذا البلوك.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139 // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

يُرجع عدد كتل العم (uncles) في بلوك من بلوك يطابق تجزئة (هاش) البلوك المحددة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لبلوك

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد كتل العم في هذا البلوك.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1 // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

يُرجع عدد كتل العم (uncles) في بلوك من بلوك يطابق رقم البلوك المحدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - عدد صحيح لرقم بلوك، أو السلسلة `"latest"`، `"earliest"`، `"pending"`، `"safe"` أو `"finalized"`، راجع [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232 // 232
]
```

**المرتجعات**

`QUANTITY` - عدد صحيح لعدد كتل العم في هذا البلوك.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0 // 0
}
```

### eth_getCode {#eth_getcode}

يُرجع الكود في عنوان محدد.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 20 بايت - العنوان
2. `QUANTITY|TAG` - عدد صحيح لرقم البلوك، أو السلسلة `"latest"`، `"earliest"`، `"pending"`، `"safe"` أو `"finalized"`، راجع [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707 // 6139707
]
```

**المرتجعات**

`DATA` - الكود من العنوان المحدد.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

تحسب طريقة sign توقيعًا خاصًا بإيثريوم باستخدام: <span dir="ltr">`sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`</span>.

من خلال إضافة بادئة إلى الرسالة، يصبح التوقيع المحسوب قابلاً للتعرف عليه كتوقيع خاص بإيثريوم. يمنع هذا سوء الاستخدام حيث يمكن لتطبيق لامركزي خبيث توقيع بيانات عشوائية (مثل معاملة) واستخدام التوقيع لانتحال شخصية الضحية.

ملاحظة: يجب أن يكون العنوان المراد التوقيع به غير مقفل.

**المعلمات**

1. `DATA`، 20 بايت - العنوان
2. `DATA`، N بايت - الرسالة المراد توقيعها

**المرتجعات**

`DATA`: التوقيع

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

يوقع معاملة يمكن إرسالها إلى الشبكة في وقت لاحق باستخدام [eth_sendRawTransaction](#eth_sendrawtransaction).

**المعلمات**

1. `Object` - كائن المعاملة

- `type`:
- `from`: `DATA`، 20 بايت - العنوان الذي تُرسل منه المعاملة.
- `to`: `DATA`، 20 بايت - (اختياري عند إنشاء عقد جديد) العنوان الموجهة إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري، الافتراضي: 90000) عدد صحيح للغاز المقدم لتنفيذ المعاملة. سيُرجع الغاز غير المستخدم.
- `gasPrice`: `QUANTITY` - (اختياري، الافتراضي: سيتم تحديده) عدد صحيح لسعر الغاز (gasPrice) المستخدم لكل غاز مدفوع، بوحدة Wei.
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة، بوحدة Wei.
- `data`: `DATA` - الكود المترجم لعقد أو التجزئة (هاش) لتوقيع الطريقة المستدعاة والمعلمات المشفرة.
- `nonce`: `QUANTITY` - (اختياري) عدد صحيح لرقم عشوائي (nonce). يسمح هذا بالكتابة فوق معاملاتك المعلقة التي تستخدم نفس الرقم العشوائي.

**المرتجعات**

`DATA`، كائن المعاملة المشفر بـ RLP والموقع بواسطة الحساب المحدد.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result // النتيجة
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

ينشئ معاملة استدعاء رسالة جديدة أو إنشاء عقد، إذا كان حقل البيانات يحتوي على كود، ويوقعه باستخدام الحساب المحدد في `from`.

**المعلمات**

1. `Object` - كائن المعاملة

- `from`: `DATA`، 20 بايت - العنوان الذي تُرسل منه المعاملة.
- `to`: `DATA`، 20 بايت - (اختياري عند إنشاء عقد جديد) العنوان الموجهة إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري، الافتراضي: 90000) عدد صحيح للغاز المقدم لتنفيذ المعاملة. سيُرجع الغاز غير المستخدم.
- `gasPrice`: `QUANTITY` - (اختياري، الافتراضي: سيتم تحديده) عدد صحيح لسعر الغاز (gasPrice) المستخدم لكل غاز مدفوع.
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة.
- `input`: `DATA` - الكود المترجم لعقد أو التجزئة (هاش) لتوقيع الطريقة المستدعاة والمعلمات المشفرة.
- `nonce`: `QUANTITY` - (اختياري) عدد صحيح لرقم عشوائي (nonce). يسمح هذا بالكتابة فوق معاملاتك المعلقة التي تستخدم نفس الرقم العشوائي.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400 // 30400
    gasPrice: "0x9184e72a000", // 10000000000000 // 10000000000000
    value: "0x9184e72a", // 2441406250 // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**المرتجعات**

`DATA`، 32 بايت - التجزئة (هاش) للمعاملة، أو تجزئة الصفر إذا لم تكن المعاملة متاحة بعد.

استخدم [eth_getTransactionReceipt](#eth_gettransactionreceipt) للحصول على عنوان العقد، بعد اقتراح المعاملة في بلوك، عند إنشاء عقد.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

ينشئ معاملة استدعاء رسالة جديدة أو إنشاء عقد للمعاملات الموقعة.

**المعلمات**

1. `DATA`، بيانات المعاملة الموقعة.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**المرتجعات**

`DATA`، 32 بايت - التجزئة (هاش) للمعاملة، أو تجزئة الصفر إذا لم تكن المعاملة متاحة بعد.

استخدم [eth_getTransactionReceipt](#eth_gettransactionreceipt) للحصول على عنوان العقد، بعد اقتراح المعاملة في بلوك، عند إنشاء عقد.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

ينفذ استدعاء رسالة جديدًا على الفور دون إنشاء معاملة على البلوك تشين. يُستخدم غالبًا لتنفيذ وظائف العقد الذكي للقراءة فقط، على سبيل المثال `balanceOf` لعقد ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `Object` - كائن استدعاء المعاملة

- `from`: `DATA`، 20 بايت - (اختياري) العنوان الذي تُرسل منه المعاملة.
- `to`: `DATA`، 20 بايت - العنوان الموجهة إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري) عدد صحيح للغاز المقدم لتنفيذ المعاملة. يستهلك eth_call صفر غاز، ولكن قد تكون هذه المعلمة مطلوبة لبعض عمليات التنفيذ.
- `gasPrice`: `QUANTITY` - (اختياري) عدد صحيح لسعر الغاز (gasPrice) المستخدم لكل غاز مدفوع
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة
- `input`: `DATA` - (اختياري) التجزئة (هاش) لتوقيع الطريقة والمعلمات المشفرة. للحصول على التفاصيل، راجع [واجهة التطبيق الثنائية (ABI) لعقد إيثريوم في وثائق Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - عدد صحيح لرقم البلوك، أو السلسلة `"latest"`، `"earliest"`، `"pending"`، `"safe"` أو `"finalized"`، راجع [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter)

**المرتجعات**

`DATA` - القيمة المرجعة للعقد المنفذ.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

يُنشئ ويُرجع تقديرًا لمقدار الغاز اللازم للسماح باكتمال المعاملة. لن تتم إضافة المعاملة إلى البلوك تشين. لاحظ أن التقدير قد يكون أكثر بكثير من كمية الغاز المستخدمة فعليًا بواسطة المعاملة، لمجموعة متنوعة من الأسباب بما في ذلك آليات آلة إيثريوم الافتراضية (EVM) وأداء العقدة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

راجع معلمات [eth_call](#eth_call)، باستثناء أن جميع الخصائص اختيارية. إذا لم يتم تحديد حد الغاز، يستخدم geth حد الغاز للبلوك من البلوك المعلق كحد أقصى. نتيجة لذلك، قد لا يكون التقدير المرجع كافيًا لتنفيذ الاستدعاء/المعاملة عندما تكون كمية الغاز أعلى من حد الغاز للبلوك المعلق.

**المرتجعات**

`QUANTITY` - كمية الغاز المستخدمة.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000 // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

يُرجع معلومات حول بلوك بواسطة التجزئة (هاش).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لبلوك.
2. `Boolean` - إذا كان `true` فإنه يُرجع كائنات المعاملة الكاملة، وإذا كان `false` فإنه يُرجع فقط تجزئات المعاملات.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**المرتجعات**

`Object` - كائن بلوك، أو `null` عند عدم العثور على بلوك:

- `number`: `QUANTITY` - رقم البلوك. `null` عندما يكون بلوك معلقًا.
- `hash`: `DATA`، 32 بايت - التجزئة (هاش) للبلوك. `null` عندما يكون بلوك معلقًا.
- `parentHash`: `DATA`، 32 بايت - التجزئة (هاش) للبلوك الأصل.
- `nonce`: `DATA`، 8 بايت - التجزئة (هاش) لإثبات العمل المُنشأ. `null` عندما يكون بلوك معلقًا، `0x0` لكتل إثبات الحصة (منذ الدمج)
- `sha3Uncles`: `DATA`، 32 بايت - SHA3 لبيانات كتل العم (uncles) في البلوك.
- `logsBloom`: `DATA`، 256 بايت - مرشح بلوم (bloom filter) لسجلات البلوك. `null` عندما يكون بلوك معلقًا.
- `transactionsRoot`: `DATA`، 32 بايت - جذر شجرة المعاملات (transaction trie) للبلوك.
- `stateRoot`: `DATA`، 32 بايت - جذر شجرة الحالة (state trie) النهائية للبلوك.
- `receiptsRoot`: `DATA`، 32 بايت - جذر شجرة الإيصالات (receipts trie) للبلوك.
- `miner`: `DATA`، 20 بايت - عنوان المستفيد الذي أُعطيت له مكافآت البلوك.
- `difficulty`: `QUANTITY` - عدد صحيح لصعوبة هذا البلوك.
- `totalDifficulty`: `QUANTITY` - عدد صحيح للصعوبة الإجمالية للسلسلة حتى هذا البلوك.
- `extraData`: `DATA` - حقل "البيانات الإضافية" لهذا البلوك.
- `size`: `QUANTITY` - عدد صحيح لحجم هذا البلوك بالبايت.
- `gasLimit`: `QUANTITY` - الحد الأقصى للغاز المسموح به في هذا البلوك.
- `gasUsed`: `QUANTITY` - إجمالي الغاز المستخدم بواسطة جميع المعاملات في هذا البلوك.
- `timestamp`: `QUANTITY` - الطابع الزمني لـ unix لوقت تجميع البلوك.
- `transactions`: `Array` - مصفوفة من كائنات المعاملة، أو تجزئات معاملات بحجم 32 بايت اعتمادًا على المعلمة الأخيرة المحددة.
- `uncles`: `Array` - مصفوفة من تجزئات كتل العم (uncles).

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result // النتيجة
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

يُرجع معلومات حول بلوك بواسطة رقم البلوك.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - عدد صحيح لرقم بلوك، أو السلسلة `"earliest"`، `"latest"`، `"pending"`، `"safe"` أو `"finalized"`، كما في [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - إذا كان `true` فإنه يُرجع كائنات المعاملة الكاملة، وإذا كان `false` فإنه يُرجع فقط تجزئات المعاملات.

```js
params: [
  "0x1b4", // 436 // 436
  true,
]
```

**المرتجعات**
راجع [eth_getBlockByHash](#eth_getblockbyhash)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

النتيجة راجع [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

يُرجع المعلومات حول معاملة مطلوبة بواسطة التجزئة (هاش) للمعاملة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لمعاملة

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**المرتجعات**

`Object` - كائن معاملة، أو `null` عند عدم العثور على معاملة:

- `blockHash`: `DATA`، 32 بايت - التجزئة (هاش) للبلوك الذي كانت فيه هذه المعاملة. `null` عندما تكون معلقة.
- `blockNumber`: `QUANTITY` - رقم البلوك الذي كانت فيه هذه المعاملة. `null` عندما تكون معلقة.
- `from`: `DATA`، 20 بايت - عنوان المرسل.
- `gas`: `QUANTITY` - الغاز المقدم من المرسل.
- `gasPrice`: `QUANTITY` - سعر الغاز المقدم من المرسل بوحدة Wei.
- `hash`: `DATA`، 32 بايت - التجزئة (هاش) للمعاملة.
- `input`: `DATA` - البيانات المرسلة مع المعاملة.
- `nonce`: `QUANTITY` - عدد المعاملات التي أجراها المرسل قبل هذه المعاملة.
- `to`: `DATA`، 20 بايت - عنوان المستلم. `null` عندما تكون معاملة إنشاء عقد.
- `transactionIndex`: `QUANTITY` - عدد صحيح لموضع فهرس المعاملات في البلوك. `null` عندما تكون معلقة.
- `value`: `QUANTITY` - القيمة المحولة بوحدة Wei.
- `v`: `QUANTITY` - مُعرّف استرداد ECDSA
- `r`: `QUANTITY` - توقيع ECDSA r
- `s`: `QUANTITY` - توقيع ECDSA s

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result // النتيجة
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707 // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000 // 50000
    "gasPrice":"0x4a817c800", // 20000000000 // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21 // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65 // 65
    "value":"0xf3dbb76162000", // 4290000000000000 // 4290000000000000
    "v":"0x25", // 37 // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

يُرجع معلومات حول معاملة بواسطة التجزئة (هاش) للبلوك وموضع فهرس المعاملة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لبلوك.
2. `QUANTITY` - عدد صحيح لموضع فهرس المعاملة.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0 // 0
]
```

**المرتجعات**
راجع [eth_getTransactionByHash](#eth_gettransactionbyhash)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

النتيجة راجع [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

يُرجع معلومات حول معاملة بواسطة رقم البلوك وموضع فهرس المعاملة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - رقم بلوك، أو السلسلة `"earliest"`، `"latest"`، `"pending"`، `"safe"` أو `"finalized"`، كما في [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - موضع فهرس المعاملة.

```js
params: [
  "0x9c47cf", // 10241999 // 10241999
  "0x24", // 36 // 36
]
```

**المرتجعات**
راجع [eth_getTransactionByHash](#eth_gettransactionbyhash)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

النتيجة راجع [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

يُرجع إيصال معاملة بواسطة التجزئة (هاش) للمعاملة.

**ملاحظة** الإيصال غير متاح للمعاملات المعلقة.

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لمعاملة

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**المرتجعات**
`Object` - كائن إيصال معاملة، أو `null` عند عدم العثور على إيصال:

- `transactionHash `: `DATA`، 32 بايت - التجزئة (هاش) للمعاملة.
- `transactionIndex`: `QUANTITY` - عدد صحيح لموضع فهرس المعاملات في البلوك.
- `blockHash`: `DATA`، 32 بايت - التجزئة (هاش) للبلوك الذي كانت فيه هذه المعاملة.
- `blockNumber`: `QUANTITY` - رقم البلوك الذي كانت فيه هذه المعاملة.
- `from`: `DATA`، 20 بايت - عنوان المرسل.
- `to`: `DATA`، 20 بايت - عنوان المستلم. null عندما تكون معاملة إنشاء عقد.
- `cumulativeGasUsed ` : `QUANTITY ` - إجمالي كمية الغاز المستخدمة عند تنفيذ هذه المعاملة في البلوك.
- `effectiveGasPrice ` : `QUANTITY` - مجموع الرسوم الأساسية والإكرامية المدفوعة لكل وحدة غاز.
- `gasUsed `: `QUANTITY ` - كمية الغاز المستخدمة بواسطة هذه المعاملة المحددة وحدها.
- `contractAddress `: `DATA`، 20 بايت - عنوان العقد المُنشأ، إذا كانت المعاملة عبارة عن إنشاء عقد، وإلا `null`.
- `logs`: `Array` - مصفوفة من كائنات السجل، التي أنشأتها هذه المعاملة.
- `logsBloom`: `DATA`، 256 بايت - مرشح بلوم (Bloom filter) للعملاء الخفيفين لاسترداد السجلات ذات الصلة بسرعة.
- `type`: `QUANTITY` - عدد صحيح لنوع المعاملة، `0x0` للمعاملات القديمة، `0x1` لأنواع قائمة الوصول، `0x2` للرسوم الديناميكية.

كما أنه يُرجع _إما_ :

- `root` : `DATA` 32 بايت لجذر الحالة (state root) بعد المعاملة (قبل بيزنطة)
- `status`: `QUANTITY` إما `1` (نجاح) أو `0` (فشل)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result // النتيجة
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created // سلسلة نصية للعنوان إذا تم إنشاؤه
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc. // السجلات كما يتم إرجاعها بواسطة getFilterLogs، وما إلى ذلك.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter // مرشح بلوم بحجم 256 بايت
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

يُرجع معلومات حول كتلة عم (uncle) لبلوك بواسطة التجزئة (هاش) وموضع فهرس كتلة العم.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `DATA`، 32 بايت - التجزئة (هاش) لبلوك.
2. `QUANTITY` - موضع فهرس كتلة العم.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0 // 0
]
```

**المرتجعات**
راجع [eth_getBlockByHash](#eth_getblockbyhash)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

النتيجة راجع [eth_getBlockByHash](#eth_getblockbyhash)

**ملاحظة**: لا تحتوي كتلة العم على معاملات فردية.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

يُرجع معلومات حول كتلة عم (uncle) لبلوك بواسطة الرقم وموضع فهرس كتلة العم.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعلمات**

1. `QUANTITY|TAG` - رقم بلوك، أو السلسلة `"earliest"`، `"latest"`، `"pending"`، `"safe"`، `"finalized"`، كما في [معلمة البلوك](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - موضع فهرس كتلة العم.

```js
params: [
  "0x29c", // 668 // 668
  "0x0", // 0 // 0
]
```

**المرتجعات**
راجع [eth_getBlockByHash](#eth_getblockbyhash)

**ملاحظة**: لا تحتوي كتلة العم على معاملات فردية.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

النتيجة راجع [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

ينشئ كائن مرشح (filter)، بناءً على خيارات المرشح، للإشعار عند تغير الحالة (السجلات).
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [eth_getFilterChanges](#eth_getfilterchanges).

**ملاحظة حول تحديد مرشحات المواضيع:**
المواضيع تعتمد على الترتيب. المعاملة التي تحتوي على سجل بمواضيع [A, B] ستتطابق مع مرشحات المواضيع التالية:

- `[]` "أي شيء"
- `[A]` "A في الموضع الأول (وأي شيء بعده)"
- `[null, B]` "أي شيء في الموضع الأول و B في الموضع الثاني (وأي شيء بعده)"
- `[A, B]` "A في الموضع الأول و B في الموضع الثاني (وأي شيء بعده)"
- `[[A, B], [A, B]]` "(A أو B) في الموضع الأول و (A أو B) في الموضع الثاني (وأي شيء بعده)"
- **المعلمات**

1. `Object` - خيارات المرشح:

- `fromBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) عدد صحيح لرقم البلوك، أو `"latest"` لآخر بلوك مقترح، `"safe"` لأحدث بلوك آمن، `"finalized"` لأحدث بلوك نهائي، أو `"pending"`، `"earliest"` للمعاملات التي لم تدرج في بلوك بعد.
- `toBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) عدد صحيح لرقم البلوك، أو `"latest"` لآخر بلوك مقترح، `"safe"` لأحدث بلوك آمن، `"finalized"` لأحدث بلوك نهائي، أو `"pending"`، `"earliest"` للمعاملات التي لم تدرج في بلوك بعد.
- `address`: `DATA|Array`، 20 بايت - (اختياري) عنوان العقد أو قائمة بالعناوين التي يجب أن تصدر منها السجلات.
- `topics`: `Array of DATA`، - (اختياري) مصفوفة من مواضيع `DATA` بحجم 32 بايت. المواضيع تعتمد على الترتيب. يمكن أن يكون كل موضوع أيضًا مصفوفة من DATA مع خيارات "أو".

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
`QUANTITY` - مُعرّف المرشح.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1 // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

ينشئ مرشحًا في العقدة، للإشعار عند وصول بلوك جديد.
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [eth_getFilterChanges](#eth_getfilterchanges).

**المعلمات**
لا يوجد

**المرتجعات**
`QUANTITY` - مُعرّف المرشح.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1 // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

ينشئ مرشحًا في العقدة، للإشعار عند وصول معاملات معلقة جديدة.
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [eth_getFilterChanges](#eth_getfilterchanges).

**المعلمات**
لا يوجد

**المرتجعات**
`QUANTITY` - مُعرّف المرشح.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1 // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

يلغي تثبيت مرشح بالمعرّف المحدد. يجب استدعاؤه دائمًا عندما لا تعد هناك حاجة للمراقبة.
بالإضافة إلى ذلك، تنتهي مهلة المرشحات عندما لا يتم طلبها باستخدام [eth_getFilterChanges](#eth_getfilterchanges) لفترة من الوقت.

**المعلمات**

1. `QUANTITY` - مُعرّف المرشح.

```js
params: [
  "0xb", // 11 // 11
]
```

**المرتجعات**
`Boolean` - `true` إذا تم إلغاء تثبيت المرشح بنجاح، وإلا `false`.

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

طريقة استطلاع لمرشح، والتي تُرجع مصفوفة من السجلات التي حدثت منذ آخر استطلاع.

**المعلمات**

1. `QUANTITY` - مُعرّف المرشح.

```js
params: [
  "0x16", // 22 // 22
]
```

**المرتجعات**
`Array` - مصفوفة من كائنات السجل، أو مصفوفة فارغة إذا لم يتغير شيء منذ آخر استطلاع.

- بالنسبة للمرشحات المنشأة باستخدام `eth_newBlockFilter`، تكون المرتجعات عبارة عن تجزئات كتل (`DATA`، 32 بايت)، على سبيل المثال، `["0x3454645634534..."]`.
- بالنسبة للمرشحات المنشأة باستخدام `eth_newPendingTransactionFilter `، تكون المرتجعات عبارة عن تجزئات معاملات (`DATA`، 32 بايت)، على سبيل المثال، `["0x6345343454645..."]`.
- بالنسبة للمرشحات المنشأة باستخدام `eth_newFilter`، تكون السجلات عبارة عن كائنات بالمعلمات التالية:
  - `removed`: `TAG` - `true` عند إزالة السجل، بسبب إعادة تنظيم السلسلة. `false` إذا كان سجلاً صالحًا.
  - `logIndex`: `QUANTITY` - عدد صحيح لموضع فهرس السجل في البلوك. `null` عندما يكون سجلاً معلقًا.
  - `transactionIndex`: `QUANTITY` - عدد صحيح لموضع فهرس المعاملات الذي تم إنشاء السجل منه. `null` عندما يكون سجلاً معلقًا.
  - `transactionHash`: `DATA`، 32 بايت - التجزئة (هاش) للمعاملات التي تم إنشاء هذا السجل منها. `null` عندما يكون سجلاً معلقًا.
  - `blockHash`: `DATA`، 32 بايت - التجزئة (هاش) للبلوك الذي كان فيه هذا السجل. `null` عندما يكون معلقًا. `null` عندما يكون سجلاً معلقًا.
  - `blockNumber`: `QUANTITY` - رقم البلوك الذي كان فيه هذا السجل. `null` عندما يكون معلقًا. `null` عندما يكون سجلاً معلقًا.
  - `address`: `DATA`، 20 بايت - العنوان الذي صدر منه هذا السجل.
  - `data`: `DATA` - بيانات سجل غير مفهرسة متغيرة الطول. (في _Solidity_: صفر أو أكثر من وسيطات السجل غير المفهرسة بحجم 32 بايت.)
  - `topics`: `Array of DATA` - مصفوفة من 0 إلى 4 `DATA` بحجم 32 بايت لوسيطات السجل المفهرسة. (في _Solidity_: الموضوع الأول هو _التجزئة (هاش)_ لتوقيع الحدث (على سبيل المثال، `Deposit(address,bytes32,uint256)`)، إلا إذا قمت بتعريف الحدث باستخدام المحدد `anonymous`.)

- **مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result // النتيجة
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1 // 1
    "blockNumber":"0x1b4", // 436 // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0 // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

يُرجع مصفوفة بجميع السجلات المطابقة للمرشح بالمعرّف المحدد.

**المعلمات**

1. `QUANTITY` - مُعرّف المرشح.

```js
params: [
  "0x16", // 22 // 22
]
```

**المرتجعات**
راجع [eth_getFilterChanges](#eth_getfilterchanges)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

النتيجة راجع [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

يُرجع مصفوفة بجميع السجلات المطابقة لكائن مرشح محدد.

**المعلمات**

1. `Object` - خيارات المرشح:

- `fromBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) عدد صحيح لرقم البلوك، أو `"latest"` لآخر بلوك مقترح، `"safe"` لأحدث بلوك آمن، `"finalized"` لأحدث بلوك نهائي، أو `"pending"`، `"earliest"` للمعاملات التي لم تدرج في بلوك بعد.
- `toBlock`: `QUANTITY|TAG` - (اختياري، الافتراضي: `"latest"`) عدد صحيح لرقم البلوك، أو `"latest"` لآخر بلوك مقترح، `"safe"` لأحدث بلوك آمن، `"finalized"` لأحدث بلوك نهائي، أو `"pending"`، `"earliest"` للمعاملات التي لم تدرج في بلوك بعد.
- `address`: `DATA|Array`، 20 بايت - (اختياري) عنوان العقد أو قائمة بالعناوين التي يجب أن تصدر منها السجلات.
- `topics`: `Array of DATA`، - (اختياري) مصفوفة من مواضيع `DATA` بحجم 32 بايت. المواضيع تعتمد على الترتيب. يمكن أن يكون كل موضوع أيضًا مصفوفة من DATA مع خيارات "أو".
- `blockHash`: `DATA`، 32 بايت - (اختياري، **مستقبلي**) مع إضافة EIP-234، سيكون `blockHash` خيار مرشح جديدًا يقيد السجلات المرجعة بالبلوك الفردي الذي يحتوي على التجزئة (هاش) `blockHash` بحجم 32 بايت. استخدام `blockHash` يعادل `fromBlock` = `toBlock` = رقم البلوك الذي يحتوي على التجزئة (هاش) `blockHash`. إذا كان `blockHash` موجودًا في معايير المرشح، فلن يُسمح باستخدام `fromBlock` ولا `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**المرتجعات**
راجع [eth_getFilterChanges](#eth_getfilterchanges)

**مثال**

```js
// Request // الطلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

النتيجة راجع [eth_getFilterChanges](#eth_getfilterchanges)

## مثال على الاستخدام {#usage-example}

### نشر عقد باستخدام JSON_RPC {#deploying-contract}

يتضمن هذا القسم عرضًا توضيحيًا لكيفية نشر عقد باستخدام واجهة RPC فقط. هناك طرق بديلة لنشر العقود حيث يتم تجريد هذا التعقيد — على سبيل المثال، باستخدام المكتبات المبنية فوق واجهة RPC مثل [web3.js](https://web3js.readthedocs.io/) و [web3.py](https://github.com/ethereum/web3.py). هذه التجريدات بشكل عام أسهل في الفهم وأقل عرضة للخطأ، ولكن لا يزال من المفيد فهم ما يحدث خلف الكواليس.

فيما يلي عقد ذكي بسيط يسمى `Multiply7` سيتم نشره باستخدام واجهة JSON-RPC إلى عقدة إيثريوم. يفترض هذا البرنامج التعليمي أن القارئ يقوم بالفعل بتشغيل عقدة Geth. يتوفر المزيد من المعلومات حول العقد والعملاء [هنا](/developers/docs/nodes-and-clients/run-a-node). يُرجى الرجوع إلى وثائق كل [عميل](/developers/docs/nodes-and-clients/) على حدة لمعرفة كيفية بدء HTTP JSON-RPC للعملاء غير Geth. يعمل معظم العملاء افتراضيًا على `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

أول شيء يجب القيام به هو التأكد من تمكين واجهة HTTP RPC. هذا يعني أننا نزود Geth بعلامة `--http` عند بدء التشغيل. في هذا المثال، نستخدم عقدة Geth على سلسلة تطوير خاصة. باستخدام هذا النهج، لا نحتاج إلى الإيثر (ether) على الشبكة الحقيقية.

```bash
geth --http --dev console 2>>geth.log
```

سيؤدي هذا إلى بدء واجهة HTTP RPC على `http://localhost:8545`.

يمكننا التحقق من أن الواجهة قيد التشغيل عن طريق استرداد عنوان coinbase (عن طريق الحصول على العنوان الأول من مصفوفة الحسابات) والرصيد باستخدام [curl](https://curl.se). يُرجى ملاحظة أن البيانات في هذه الأمثلة ستختلف على عقدتك المحلية. إذا كنت ترغب في تجربة هذه الأوامر، فاستبدل معلمات الطلب في طلب curl الثاني بالنتيجة التي تم إرجاعها من الطلب الأول.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

نظرًا لأن الأرقام مشفرة بالنظام السداسي عشري (hex)، يتم إرجاع الرصيد بوحدة wei كسلسلة سداسية عشرية. إذا أردنا الحصول على الرصيد بوحدة الإيثر (ether) كرقم، يمكننا استخدام web3 من وحدة تحكم Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410" // "410"
```

الآن بعد أن أصبح هناك بعض الإيثر على سلسلة التطوير الخاصة بنا، يمكننا نشر العقد. الخطوة الأولى هي تجميع عقد Multiply7 إلى كود بايت (byte code) يمكن إرساله إلى آلة إيثريوم الافتراضية (EVM). لتثبيت solc، مترجم Solidity، اتبع [وثائق Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (قد ترغب في استخدام إصدار `solc` أقدم ليتطابق مع [إصدار المترجم المستخدم في مثالنا](https://github.com/ethereum/solidity/releases/tag/v0.4.20)).

الخطوة التالية هي تجميع عقد Multiply7 إلى كود بايت يمكن إرساله إلى آلة إيثريوم الافتراضية (EVM).

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

الآن بعد أن أصبح لدينا الكود المجمع، نحتاج إلى تحديد مقدار الغاز الذي سيكلفه نشره. تحتوي واجهة RPC على طريقة `eth_estimateGas` التي ستعطينا تقديرًا.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

وأخيرًا نشر العقد.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

يتم قبول المعاملة بواسطة العقدة ويتم إرجاع التجزئة (هاش) للمعاملة. يمكن استخدام هذه التجزئة لتتبع المعاملة. الخطوة التالية هي تحديد العنوان الذي تم نشر عقدنا فيه. ستنشئ كل معاملة منفذة إيصالًا. يحتوي هذا الإيصال على معلومات مختلفة حول المعاملة مثل أي بلوك تم تضمين المعاملة فيه ومقدار الغاز الذي استخدمته آلة إيثريوم الافتراضية (EVM). إذا أنشأت المعاملة عقدًا، فستحتوي أيضًا على عنوان العقد. يمكننا استرداد الإيصال باستخدام طريقة RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

تم إنشاء عقدنا على `0x4d03d617d700cf81935d7f797f4e2ae719648262`. النتيجة الفارغة (null) بدلاً من الإيصال تعني أن المعاملة لم يتم تضمينها في بلوك بعد. انتظر لحظة وتحقق مما إذا كان عميل الإجماع الخاص بك قيد التشغيل وحاول مرة أخرى.

#### التفاعل مع العقود الذكية {#interacting-with-smart-contract}

في هذا المثال، سنقوم بإرسال معاملة باستخدام `eth_sendTransaction` إلى طريقة `multiply` الخاصة بالعقد.

تتطلب `eth_sendTransaction` عدة وسيطات، وتحديدًا `from` و `to` و `data`. `From` هو العنوان العام لحسابنا، و `to` هو عنوان العقد. تحتوي وسيطة `data` على حمولة تحدد الطريقة التي يجب استدعاؤها وبأي وسيطات. هنا يأتي دور [ABI (واجهة التطبيق الثنائية)](https://docs.soliditylang.org/en/latest/abi-spec.html). إن ABI هو ملف JSON يحدد كيفية تعريف وتشفير البيانات لآلة إيثريوم الافتراضية (EVM).

تحدد بايتات الحمولة الطريقة التي يتم استدعاؤها في العقد. هذه هي أول 4 بايتات من التجزئة (هاش) Keccak لاسم الدالة وأنواع وسيطاتها، مشفرة بالنظام السداسي عشري. تقبل دالة multiply نوع uint وهو اسم مستعار لـ uint256. هذا يتركنا مع:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1" // "0xc6888fa1"
```

الخطوة التالية هي تشفير الوسيطات. يوجد uint256 واحد فقط، لنقل، القيمة 6. يحتوي ABI على قسم يحدد كيفية تشفير أنواع uint256.

`int<M>: enc(X)` هو تشفير المكمل الثنائي (two’s complement) ذو النهاية الكبرى (big-endian) لـ X، مبطنًا على الجانب ذي الترتيب الأعلى (الأيسر) بـ 0xff لـ X السالبة وببايتات صفرية لـ X الموجبة بحيث يكون الطول من مضاعفات 32 بايت.

يتم تشفير هذا إلى `0000000000000000000000000000000000000000000000000000000000000006`.

من خلال الجمع بين محدد الدالة والوسيطة المشفرة، ستكون بياناتنا `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

يمكن الآن إرسال هذا إلى العقدة:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

نظرًا لأنه تم إرسال معاملة، تم إرجاع التجزئة (هاش) للمعاملة. استرداد الإيصال يعطي:

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

يحتوي الإيصال على سجل (log). تم إنشاء هذا السجل بواسطة آلة إيثريوم الافتراضية (EVM) عند تنفيذ المعاملة وتم تضمينه في الإيصال. تُظهر دالة `multiply` أنه تم إطلاق حدث `Print` مع المدخلات مضروبة في 7. نظرًا لأن وسيطة حدث `Print` كانت uint256، يمكننا فك تشفيرها وفقًا لقواعد ABI مما سيتركنا مع الرقم العشري المتوقع 42. بصرف النظر عن البيانات، تجدر الإشارة إلى أنه يمكن استخدام المواضيع (topics) لتحديد الحدث الذي أنشأ السجل:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da" // "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

كانت هذه مجرد مقدمة موجزة لبعض المهام الأكثر شيوعًا، والتي توضح الاستخدام المباشر لـ JSON-RPC.

## مواضيع ذات صلة {#related-topics}

- [مواصفات JSON-RPC](http://www.jsonrpc.org/specification)
- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [واجهات برمجة تطبيقات JavaScript](/developers/docs/apis/javascript/)
- [واجهات برمجة تطبيقات الواجهة الخلفية](/developers/docs/apis/backend/)
- [عملاء التنفيذ](/developers/docs/nodes-and-clients/#execution-clients)