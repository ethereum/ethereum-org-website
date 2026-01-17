---
title: واجهة برمجة تطبيقات JSON-RPC
description: بروتوكول استدعاء إجراء عن بعد (RPC) خفيف الوزن وعديم الجنسية لعملاء Ethereum.
lang: ar
---

لكي يتفاعل تطبيق برمجي مع blockchain Ethereum - إما عن طريق قراءة بيانات blockchain أو إرسال المعاملات إلى الشبكة - فيجب أن يتصل بعقدة Ethereum.

لهذا الغرض، يقوم كل [عميل إيثريوم](/developers/docs/nodes-and-clients/#execution-clients) بتنفيذ [مواصفات JSON-RPC](https://github.com/ethereum/execution-apis)، لذلك هناك مجموعة موحدة من الطرق التي يمكن للتطبيقات الاعتماد عليها بغض النظر عن العقدة أو تنفيذ العميل المحدد.

[JSON-RPC](https://www.jsonrpc.org/specification) هو بروتوكول استدعاء إجراء عن بعد (RPC) خفيف الوزن وعديم الحالة. إنه يحدد العديد من هياكل البيانات والقواعد حول معالجتها. إنه لا يعتمد على النقل حيث يمكن استخدام المفاهيم داخل نفس العملية، أو عبر المقابس، أو عبر HTTP، أو في العديد من بيئات تمرير الرسائل المختلفة. يستخدم JSON (RFC 4627) كتنسيق للبيانات.

## تنفيذات العميل {#client-implementations}

يمكن لكل عميل Ethereum استخدام لغات برمجة مختلفة عند تنفيذ مواصفات JSON-RPC. راجع [وثائق العميل](/developers/docs/nodes-and-clients/#execution-clients) الفردية لمزيد من التفاصيل المتعلقة بلغات البرمجة المحددة. نوصيك بالتحقق من وثائق كل عميل للحصول على أحدث معلومات دعم واجهة برمجة التطبيقات.

## المكتبات المساعدة {#convenience-libraries}

على الرغم من أنه يمكنك اختيار التفاعل مباشرة مع عملاء Ethereum عبر واجهة برمجة التطبيقات JSON-RPC، فغالبًا ما توجد خيارات أسهل لمطوري dapp. توجد العديد من مكتبات [JavaScript](/developers/docs/apis/javascript/#available-libraries) و[واجهات برمجة تطبيقات الواجهة الخلفية](/developers/docs/apis/backend/#available-libraries) لتوفير أغلفة فوق واجهة برمجة تطبيقات JSON-RPC. باستخدام هذه المكتبات، يمكن للمطورين كتابة طرق بديهية من سطر واحد بلغة البرمجة التي يختارونها لتهيئة طلبات JSON-RPC (تحت الغطاء) التي تتفاعل مع Ethereum.

## واجهات برمجة تطبيقات عميل الإجماع {#consensus-clients}

تتعامل هذه الصفحة بشكل أساسي مع واجهة برمجة التطبيقات JSON-RPC التي يستخدمها عملاء تنفيذ Ethereum. ومع ذلك، يتمتع عملاء الإجماع أيضًا بواجهة برمجة تطبيقات RPC تسمح للمستخدمين بالاستعلام عن معلومات حول العقدة، وطلب كتل Beacon، وحالة Beacon، وغيرها من المعلومات المتعلقة بالإجماع مباشرة من العقدة. تم توثيق واجهة برمجة التطبيقات هذه على [صفحة الويب الخاصة بواجهة برمجة تطبيقات Beacon](https://ethereum.github.io/beacon-APIs/#/).

تُستخدم أيضًا واجهة برمجة التطبيقات الداخلية للاتصال بين العملاء داخل العقدة - أي أنها تمكن عميل الإجماع وعميل التنفيذ من تبادل البيانات. يُطلق على هذا اسم 'واجهة برمجة تطبيقات المحرك' والمواصفات متاحة على [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## مواصفات عميل التنفيذ {#spec}

[اقرأ مواصفات واجهة برمجة تطبيقات JSON-RPC الكاملة على GitHub](https://github.com/ethereum/execution-apis). تم توثيق واجهة برمجة التطبيقات هذه على [صفحة الويب الخاصة بواجهة برمجة تطبيقات التنفيذ](https://ethereum.github.io/execution-apis/) وتتضمن مفتشًا لتجربة جميع الطرق المتاحة.

## الأعراف {#conventions}

### ترميز القيمة السداسية العشرية {#hex-encoding}

يتم تمرير نوعين رئيسيين من البيانات عبر JSON: المصفوفات البايتية غير المنسقة والكميات. يتم تمرير كل منهما باستخدام ترميز سداسي عشري ولكن مع متطلبات مختلفة للتنسيق.

#### الكميات {#quantities-encoding}

عند ترميز الكميات (الأعداد الصحيحة والأرقام): قم بالترميز على هيئة نظام سداسي عشري، مع البادئة "0x"، وهو التمثيل الأكثر إحكاما (استثناء بسيط: يجب تمثيل الصفر على هيئة "0x0").

وفيما يلي بعض الأمثلة:

- 0x41 (65 في النظام العشري)
- 0x400 (1024 في النظام العشري)
- خطأ: 0x (يجب أن يحتوي دائمًا على رقم واحد على الأقل - الصفر هو "0x0")
- خطأ: 0x0400 (لا يُسمح بالأصفار الأولية)
- خطأ: ff (يجب أن تكون البادئة 0x)

### البيانات غير المنسقة {#unformatted-data-encoding}

عند ترميز البيانات غير المنسقة (مصفوفات البايت، وعناوين الحسابات، والتجزئات، ومصفوفات البايت كود): قم بالترميز على هيئة نظام سداسي عشري، مع البادئة "0x"، ورقمين سداسيين عشريين لكل بايت.

وفيما يلي بعض الأمثلة:

- 0x41 (الحجم 1، "أ")
- 0x004200 (الحجم 3، "0B0")
- 0x (الحجم 0، "")
- خطأ: 0xf0f0f (يجب أن يكون عددًا زوجيًا من الأرقام)
- خطأ: 004200 (يجب أن يكون البادئة 0x)

### معامل الكتلة {#block-parameter}

الطرق التالية لها معلمة كتلة:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

عند تقديم طلبات الاستعلام عن حالة Ethereum، تحدد معلمة الكتلة المقدمة ارتفاع الكتلة.

الخيارات التالية ممكنة لمعلمة الكتلة:

- `سلسلة HEX` - رقم كتلة عدد صحيح
- `السلسلة "earliest"` للكتلة الأقدم/الأولى
- `السلسلة "latest"` - لأحدث كتلة مقترحة
- `السلسلة "safe"` - لأحدث كتلة رئيسية آمنة
- `السلسلة "finalized"` - لأحدث كتلة مكتملة
- `السلسلة "pending"` - للحالة/المعاملات المعلقة

## أمثلة

في هذه الصفحة، نقدم أمثلة لكيفية استخدام نقاط النهاية الفردية لواجهة برمجة تطبيقات JSON_RPC باستخدام أداة سطر الأوامر، [curl](https://curl.se). يمكن العثور على أمثلة نقاط النهاية الفردية هذه أدناه في قسم [أمثلة Curl](#curl-examples). في أسفل الصفحة، نقدم أيضًا [مثالًا شاملاً](#usage-example) لتجميع ونشر عقد ذكي باستخدام عقدة Geth وواجهة برمجة تطبيقات JSON_RPC وcurl.

## أمثلة Curl {#curl-examples}

فيما يلي أمثلة على استخدام واجهة برمجة تطبيقات JSON_RPC عن طريق تقديم طلبات [curl](https://curl.se) إلى عقدة إيثريوم. يتضمن كل مثال وصفًا لنقطة النهاية المحددة، ومعامِلاتها، ونوع الإرجاع، ومثالًا عمليًا لكيفية استخدامها.

قد تقوم طلبات curl بإرجاع رسالة خطأ تتعلق بنوع المحتوى. هذا لأن الخيار `--data` يضبط نوع المحتوى على `application/x-www-form-urlencoded`. إذا اشتكت عقدتك من هذا، فقم بتعيين الترويسة يدويًا عن طريق وضع `-H "Content-Type: application/json"` في بداية الاستدعاء. لا تتضمن الأمثلة أيضًا مجموعة URL/IP والمنفذ التي يجب أن تكون الوسيطة الأخيرة المعطاة لـ curl (على سبيل المثال، `127.0.0.1:8545`). يأخذ طلب التجعيد الكامل الذي يتضمن هذه البيانات الإضافية الشكل التالي:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## الانتشار، الحالة، التاريخ {#gossip-state-history}

تتطلب مجموعة من طرق JSON-RPC الأساسية بيانات من شبكة إيثريوم، وتنقسم بدقة إلى ثلاث فئات رئيسية: _الانتشار، الحالة، والتاريخ_. استخدم الروابط الموجودة في هذه الأقسام للانتقال إلى كل طريقة، أو استخدم جدول المحتويات لاستكشاف القائمة الكاملة للطرق.

### طرق الانتشار {#gossip-methods}

> تتبع هذه الطرق رأس السلسلة. هذه هي الطريقة التي تنتقل بها المعاملات عبر الشبكة، وتجد طريقها إلى الكتل، وكيف يتعرف العملاء على الكتل الجديدة.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### طرق الحالة {#state_methods}

> طرق الإبلاغ عن الحالة الحالية لجميع البيانات المخزنة. تعتبر "الحالة" بمثابة قطعة كبيرة مشتركة من ذاكرة الوصول العشوائي (RAM)، وتتضمن أرصدة الحسابات، وبيانات العقود، وتقديرات الغاز.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### طرق التاريخ {#history_methods}

> يقوم بجلب السجلات التاريخية لكل كتلة حتى التكوين. يشبه هذا ملفًا واحدًا كبيرًا مخصصًا للإضافة فقط، ويتضمن جميع رؤوس الكتل، وأجسام الكتل، وكتل العم، وإيصالات المعاملات.

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

## ملعب واجهة برمجة التطبيقات JSON-RPC

يمكنك استخدام [أداة ساحة اللعب](https://ethereum-json-rpc.com) لاكتشاف طرق واجهة برمجة التطبيقات وتجربتها. ويُظهر لك أيضًا الأساليب والشبكات التي يدعمها مزودو العقد المختلفة.

## طرق واجهة برمجة التطبيقات JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

إرجاع إصدار العميل الحالي.

**المعاملات**

لا شيء

**الإرجاع**

`سلسلة نصية` - إصدار العميل الحالي

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

### web3_sha3 {#web3_sha3}

يُرجع Keccak-256 (وليس SHA3-256 القياسي) للبيانات المحددة.

**المعاملات**

1. `DATA` - البيانات المراد تحويلها إلى تجزئة (هاش) SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**الإرجاع**

`DATA` - نتيجة SHA3 للسلسلة النصية المحددة.

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

### net_version {#net_version}

إرجاع معرف الشبكة الحالي.

**المعاملات**

لا شيء

**الإرجاع**

`سلسلة نصية` - معرف الشبكة الحالي.

القائمة الكاملة لمعرفات الشبكة الحالية متاحة على [chainlist.org](https://chainlist.org). بعض الأشياء الشائعة هي:

- `1`: شبكة إيثريوم الرئيسية
- `11155111`: شبكة الاختبار Sepolia
- `560048` : شبكة الاختبار Hoodi

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

### net_listening {#net_listening}

يُرجع `true` إذا كان العميل يستمع بفاعلية لاتصالات الشبكة.

**المعاملات**

لا شيء

**الإرجاع**

`قيمة منطقية` - `true` عند الاستماع، وإلا `false`.

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

### net_peerCount {#net_peercount}

إرجاع عدد النظراء المتصلين حاليًا بالعميل.

**المعاملات**

لا شيء

**الإرجاع**

`QUANTITY` - عدد صحيح لعدد النظراء المتصلين.

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

### eth_protocolVersion {#eth_protocolversion}

إرجاع إصدار بروتوكول Ethereum الحالي. لاحظ أن هذه الطريقة [غير متاحة في Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**المعاملات**

لا شيء

**الإرجاع**

`سلسلة نصية` - إصدار بروتوكول إيثريوم الحالي

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

### eth_syncing {#eth_syncing}

يُرجع كائنًا به بيانات حول حالة المزامنة أو `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

تختلف بيانات الإرجاع الدقيقة بين تنفيذات العميل. يعيد جميع العملاء `False` عندما لا تتم مزامنة العقدة، ويعيد جميع العملاء الحقول التالية.

`Object|Boolean`، كائن به بيانات حالة المزامنة أو `FALSE`، عندما لا تتم المزامنة:

- `startingBlock`: `QUANTITY` - الكتلة التي بدأ عندها الاستيراد (سيتم إعادة تعيينها فقط، بعد أن تصل المزامنة إلى نهايتها)
- `currentBlock`: `QUANTITY` - الكتلة الحالية، مثل eth_blockNumber
- `highestBlock`: `QUANTITY` - أعلى كتلة مقدرة

ومع ذلك، قد يقدم العملاء الأفراد أيضًا بيانات إضافية. على سبيل المثال، يقوم Geth بإرجاع ما يلي:

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

في حين يعود بيسو:

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

يرجى الرجوع إلى الوثائق الخاصة بعميلك المحدد للحصول على مزيد من التفاصيل.

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

### eth_coinbase {#eth_coinbase}

Returns the client coinbase address.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

> **ملاحظة:** تم إيقاف هذه الطريقة اعتبارًا من **v1.14.0** ولم تعد مدعومة. ستؤدي محاولة استخدام هذه الطريقة إلى ظهور خطأ "الطريقة غير مدعومة".

**المعاملات**

لا شيء

**الإرجاع**

`DATA`، 20 بايت - عنوان coinbase الحالي.

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

### eth_chainId {#eth_chainId}

إرجاع معرف السلسلة المستخدم لتوقيع المعاملات المحمية ضد إعادة التشغيل.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

`chainId`، قيمة سداسية عشرية كسلسلة نصية تمثل العدد الصحيح لمعرف السلسلة الحالي.

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

### eth_mining {#eth_mining}

تُرجع `true` إذا كان العميل يقوم بتعدين كتل جديدة بنشاط. يمكن أن تُرجع هذه القيمة `true` فقط لشبكات إثبات العمل وقد لا تكون متاحة في بعض العملاء منذ [الدمج](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

`قيمة منطقية` - تُرجع `true` إذا كان العميل يقوم بالتعدين، وإلا `false`.

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

### eth_hashrate {#eth_hashrate}

Returns the number of hashes per second that the node is mining with. يمكن أن تُرجع هذه القيمة `true` فقط لشبكات إثبات العمل وقد لا تكون متاحة في بعض العملاء منذ [الدمج](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

`QUANTITY` - عدد التجزئات (الهاشات) في الثانية.

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

### eth_gasPrice {#eth_gasprice}

يقوم بإرجاع تقدير للسعر الحالي للغاز بالوي. على سبيل المثال، يقوم عميل Besu بفحص آخر 100 كتلة ويعيد متوسط ​​سعر وحدة الغاز بشكل افتراضي.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

`QUANTITY` - عدد صحيح لسعر الغاز الحالي بالوي.

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

### eth_accounts {#eth_accounts}

Returns a list of addresses owned by client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

`مصفوفة من DATA`، 20 بايت - العناوين التي يملكها العميل.

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

### eth_blockNumber {#eth_blocknumber}

يُرجع رقم أحدث كتلة.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

لا شيء

**الإرجاع**

`QUANTITY` - عدد صحيح لرقم الكتلة الحالي الذي يوجد عليه العميل.

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

### eth_getBalance {#eth_getbalance}

يُرجع رصيد الحساب على عنوان معين.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 20 بايت - عنوان للتحقق من الرصيد.
2. `QUANTITY|TAG` - رقم كتلة عدد صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، انظر [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**الإرجاع**

`QUANTITY` - عدد صحيح للرصيد الحالي بالوي.

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

### eth_getStorageAt {#eth_getstorageat}

Returns the value from a storage position at a given address.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 20 بايت - عنوان التخزين.
2. `QUANTITY` - عدد صحيح للموضع في التخزين.
3. `QUANTITY|TAG` - رقم كتلة عدد صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، انظر [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

**الإرجاع**

`DATA` - القيمة في موضع التخزين هذا.

**مثال**
يعتمد حساب الموضع الصحيح على التخزين المراد استرداده. ضع في اعتبارك العقد التالي المنشور على `0x295a70b2de5e3953354a6a8344e616ed314d7251` بواسطة العنوان `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

يُعد استرداد قيمة pos0 أمرًا مباشرًا:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] we need to calculate the position with:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

The geth console which comes with the web3 library can be used to make the calculation:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Now to fetch the storage:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

يُرجع عدد المعاملات _المرسلة_ من عنوان.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 20 بايت - عنوان.
2. `QUANTITY|TAG` - رقم كتلة عدد صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، انظر [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // الحالة عند أحدث كتلة
]
```

**الإرجاع**

`QUANTITY` - عدد صحيح لعدد المعاملات المرسلة من هذا العنوان.

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

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Returns the number of transactions in a block from a block matching the given block hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) لكتلة

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**الإرجاع**

`QUANTITY` - عدد صحيح لعدد المعاملات في هذه الكتلة.

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

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Returns the number of transactions in a block matching the given block number.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `QUANTITY|TAG` - عدد صحيح لرقم كتلة، أو السلسلة النصية `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، كما في [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**الإرجاع**

`QUANTITY` - عدد صحيح لعدد المعاملات في هذه الكتلة.

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

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Returns the number of uncles in a block from a block matching the given block hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) لكتلة

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**الإرجاع**

`QUANTITY` - عدد صحيح لعدد الكتل العموم في هذه الكتلة.

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

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Returns the number of uncles in a block from a block matching the given block number.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `QUANTITY|TAG` - رقم كتلة عدد صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، انظر [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**الإرجاع**

`QUANTITY` - عدد صحيح لعدد الكتل العموم في هذه الكتلة.

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

### eth_getCode {#eth_getcode}

Returns code at a given address.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 20 بايت - عنوان
2. `QUANTITY|TAG` - رقم كتلة عدد صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، انظر [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**الإرجاع**

`DATA` - الكود من العنوان المحدد.

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

### eth_sign {#eth_sign}

تحسب طريقة التوقيع توقيعًا خاصًا بإيثريوم باستخدام: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

By adding a prefix to the message makes the calculated signature recognizable as an Ethereum specific signature. يمنع هذا إساءة الاستخدام حيث يمكن لتطبيق لامركزي ضار توقيع بيانات عشوائية (مثل معاملة) واستخدام التوقيع لانتحال شخصية الضحية.

Note: the address to sign with must be unlocked.

**المعاملات**

1. `DATA`، 20 بايت - عنوان
2. `DATA`، N بايت - رسالة للتوقيع

**الإرجاع**

`DATA`: توقيع

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

### eth_signTransaction {#eth_signtransaction}

يوقع معاملة يمكن إرسالها إلى الشبكة في وقت لاحق باستخدام [eth_sendRawTransaction](#eth_sendrawtransaction).

**المعاملات**

1. `كائن` - كائن المعاملة

- `النوع`:
- `from`: `DATA`، 20 بايت - العنوان الذي أُرسلت منه المعاملة.
- `to`: `DATA`، 20 بايت - (اختياري عند إنشاء عقد جديد) العنوان الذي توجّه إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري، افتراضي: 90000) عدد صحيح من الغاز المقدم لتنفيذ المعاملة. It will return unused gas.
- `gasPrice`: `QUANTITY` - (اختياري، افتراضي: سيُحدد لاحقًا) عدد صحيح لسعر الغاز المستخدم لكل وحدة غاز مدفوعة، بالوي.
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة، بالوي.
- `data`: `DATA` - الكود المترجم لعقد أو تجزئة (هاش) توقيع الطريقة المستدعاة والمعلمات المشفرة.
- `nonce`: `QUANTITY` - (اختياري) عدد صحيح لـ nonce. This allows to overwrite your own pending transactions that use the same nonce.

**الإرجاع**

`DATA`، كائن المعاملة المشفر بـ RLP والموقع من قبل الحساب المحدد.

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

### eth_sendTransaction {#eth_sendtransaction}

ينشئ معاملة استدعاء رسالة جديدة أو إنشاء عقد، إذا كان حقل البيانات يحتوي على كود، ويوقعه باستخدام الحساب المحدد في `from`.

**المعاملات**

1. `كائن` - كائن المعاملة

- `from`: `DATA`، 20 بايت - العنوان الذي أُرسلت منه المعاملة.
- `to`: `DATA`، 20 بايت - (اختياري عند إنشاء عقد جديد) العنوان الذي توجّه إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري، افتراضي: 90000) عدد صحيح من الغاز المقدم لتنفيذ المعاملة. It will return unused gas.
- `gasPrice`: `QUANTITY` - (اختياري، افتراضي: سيُحدد لاحقًا) عدد صحيح لسعر الغاز المستخدم لكل وحدة غاز مدفوعة.
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة.
- `input`: `DATA` - الكود المترجم للعقد أو تجزئة (هاش) توقيع الطريقة المستدعاة والمعلمات المشفرة.
- `nonce`: `QUANTITY` - (اختياري) عدد صحيح لـ nonce. This allows to overwrite your own pending transactions that use the same nonce.

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

**الإرجاع**

`DATA`، 32 بايت - تجزئة (هاش) المعاملة، أو التجزئة الصفرية إذا لم تكن المعاملة متاحة بعد.

استخدم [eth_getTransactionReceipt](#eth_gettransactionreceipt) للحصول على عنوان العقد، بعد اقتراح المعاملة في كتلة، عند إنشاء عقد.

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

### eth_sendRawTransaction {#eth_sendrawtransaction}

Creates new message call transaction or a contract creation for signed transactions.

**المعاملات**

1. `DATA`، بيانات المعاملة الموقعة.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**الإرجاع**

`DATA`، 32 بايت - تجزئة (هاش) المعاملة، أو التجزئة الصفرية إذا لم تكن المعاملة متاحة بعد.

استخدم [eth_getTransactionReceipt](#eth_gettransactionreceipt) للحصول على عنوان العقد، بعد اقتراح المعاملة في كتلة، عند إنشاء عقد.

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

### eth_call {#eth_call}

تنفيذ مكالمة رسالة جديدة على الفور دون إنشاء معاملة على blockchain. غالبًا ما يتم استخدامه لتنفيذ وظائف العقد الذكي للقراءة فقط، على سبيل المثال `balanceOf` لعقد ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `كائن` - كائن استدعاء المعاملة

- `from`: `DATA`، 20 بايت - (اختياري) العنوان الذي أُرسلت منه المعاملة.
- `to`: `DATA`، 20 بايت - العنوان الذي توجّه إليه المعاملة.
- `gas`: `QUANTITY` - (اختياري) عدد صحيح من الغاز المقدم لتنفيذ المعاملة. eth_call consumes zero gas, but this parameter may be needed by some executions.
- `gasPrice`: `QUANTITY` - (اختياري) عدد صحيح لسعر الغاز المستخدم لكل وحدة غاز مدفوعة
- `value`: `QUANTITY` - (اختياري) عدد صحيح للقيمة المرسلة مع هذه المعاملة
- `input`: `DATA` - (اختياري) تجزئة (هاش) توقيع الطريقة والمعلمات المشفرة. للحصول على تفاصيل، انظر [واجهة التطبيق الثنائية لعقد إيثريوم في وثائق سوليديتي](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - رقم كتلة عدد صحيح، أو السلسلة النصية `"latest"`، أو `"earliest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، انظر [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter)

**الإرجاع**

`DATA` - القيمة المُرجعة للعقد المُنفذ.

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

### eth_estimateGas {#eth_estimategas}

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

انظر معاملات [eth_call](#eth_call)، باستثناء أن جميع الخصائص اختيارية. If no gas limit is specified geth uses the block gas limit from the pending block as an upper bound. نتيجة لذلك، قد لا يكون التقدير المُرجع كافيًا لتنفيذ الاستدعاء/المعاملة عندما تكون كمية الغاز أعلى من حد الغاز للكتلة المعلقة.

**الإرجاع**

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

### eth_getBlockByHash {#eth_getblockbyhash}

Returns information about a block by hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) كتلة.
2. `Boolean` - إذا كانت `true`، فإنها تُرجع كائنات المعاملة الكاملة، وإذا كانت `false`، فإنها تُرجع تجزئات (هاشات) المعاملات فقط.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**الإرجاع**

`كائن` - كائن كتلة، أو `null` في حالة عدم العثور على كتلة:

- `number`: `QUANTITY` - رقم الكتلة. `null` عندما تكون كتلة معلقة.
- `hash`: `DATA`، 32 بايت - تجزئة (هاش) الكتلة. `null` عندما تكون كتلة معلقة.
- `parentHash`: `DATA`، 32 بايت - تجزئة (هاش) الكتلة الأصل.
- `nonce`: `DATA`، 8 بايت - تجزئة (هاش) إثبات العمل الذي تم إنشاؤه. `null` عندما تكون كتلة معلقة، `0x0` لكتل إثبات الحصة (منذ الدمج)
- `sha3Uncles`: `DATA`، 32 بايت - SHA3 لبيانات الكتل العموم في الكتلة.
- `logsBloom`: `DATA`، 256 بايت - مرشح بلوم لسجلات الكتلة. `null` عندما تكون كتلة معلقة.
- `transactionsRoot`: `DATA`، 32 بايت - جذر شجرة معاملات الكتلة.
- `stateRoot`: `DATA`، 32 بايت - جذر شجرة الحالة النهائية للكتلة.
- `receiptsRoot`: `DATA`، 32 بايت - جذر شجرة إيصالات الكتلة.
- `miner`: `DATA`، 20 بايت - عنوان المستفيد الذي تم منحه مكافآت الكتلة.
- `difficulty`: `QUANTITY` - عدد صحيح لصعوبة هذه الكتلة.
- `totalDifficulty`: `QUANTITY` - عدد صحيح للصعوبة الإجمالية للسلسلة حتى هذه الكتلة.
- `extraData`: `DATA` - حقل "البيانات الإضافية" لهذه الكتلة.
- `size`: `QUANTITY` - عدد صحيح لحجم هذه الكتلة بالبايت.
- `gasLimit`: `QUANTITY` - الحد الأقصى للغاز المسموح به في هذه الكتلة.
- `gasUsed`: `QUANTITY` - إجمالي الغاز المستخدم من قبل جميع المعاملات في هذه الكتلة.
- `timestamp`: `QUANTITY` - الطابع الزمني لنظام يونكس لوقت تجميع الكتلة.
- `transactions`: `مصفوفة` - مصفوفة من كائنات المعاملات، أو تجزئات (هاشات) معاملات بحجم 32 بايت اعتمادًا على المعامل الأخير المحدد.
- `uncles`: `مصفوفة` - مصفوفة من تجزئات (هاشات) الكتل العموم.

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

### eth_getBlockByNumber {#eth_getblockbynumber}

Returns information about a block by block number.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `QUANTITY|TAG` - عدد صحيح لرقم كتلة، أو السلسلة النصية `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"` أو `"finalized"`، كما في [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - إذا كانت `true`، فإنها تُرجع كائنات المعاملة الكاملة، وإذا كانت `false`، فإنها تُرجع تجزئات (هاشات) المعاملات فقط.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**الإرجاع**
انظر [eth_getBlockByHash](#eth_getblockbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

النتيجة انظر [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Returns the information about a transaction requested by transaction hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) المعاملة

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**الإرجاع**

`كائن` - كائن معاملة، أو `null` في حالة عدم العثور على معاملة:

- `blockHash`: `DATA`، 32 بايت - تجزئة (هاش) الكتلة التي كانت فيها هذه المعاملة. `null` عندما تكون معلقة.
- `blockNumber`: `QUANTITY` - رقم الكتلة التي كانت فيها هذه المعاملة. `null` عندما تكون معلقة.
- `from`: `DATA`، 20 بايت - عنوان المرسل.
- `gas`: `QUANTITY` - الغاز الذي قدمه المرسل.
- `gasPrice`: `QUANTITY` - سعر الغاز الذي قدمه المرسل بالوي.
- `hash`: `DATA`، 32 بايت - تجزئة (هاش) المعاملة.
- `input`: `DATA` - البيانات المرسلة مع المعاملة.
- `nonce`: `QUANTITY` - عدد المعاملات التي أجراها المرسل قبل هذه المعاملة.
- `to`: `DATA`، 20 بايت - عنوان المستلم. `null` عندما تكون معاملة إنشاء عقد.
- `transactionIndex`: `QUANTITY` - عدد صحيح لموضع فهرس المعاملات في الكتلة. `null` عندما تكون معلقة.
- `value`: `QUANTITY` - القيمة المنقولة بالوي.
- `v`: `QUANTITY` - معرف استرداد ECDSA
- `r`: `QUANTITY` - توقيع ECDSA r
- `s`: `QUANTITY` - توقيع ECDSA s

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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Returns information about a transaction by block hash and transaction index position.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) لكتلة.
2. `QUANTITY` - عدد صحيح لموضع فهرس المعاملة.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**الإرجاع**
انظر [eth_getTransactionByHash](#eth_gettransactionbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

النتيجة انظر [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Returns information about a transaction by block number and transaction index position.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `QUANTITY|TAG` - رقم كتلة، أو السلسلة النصية `"earliest"`، أو `"latest"`، أو `"pending"`، أو `"safe"`، أو `"finalized"`، كما في [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - موضع فهرس المعاملة.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**الإرجاع**
انظر [eth_getTransactionByHash](#eth_gettransactionbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

النتيجة انظر [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Returns the receipt of a transaction by transaction hash.

**ملاحظة** أن الإيصال غير متاح للمعاملات المعلقة.

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) المعاملة

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**الإرجاع**
`كائن` - كائن إيصال معاملة، أو `null` عند عدم العثور على إيصال:

- `transactionHash `: `DATA`، 32 بايت - تجزئة (هاش) المعاملة.
- `transactionIndex`: `QUANTITY` - عدد صحيح لموضع فهرس المعاملات في الكتلة.
- `blockHash`: `DATA`، 32 بايت - تجزئة (هاش) الكتلة التي كانت فيها هذه المعاملة.
- `blockNumber`: `QUANTITY` - رقم الكتلة التي كانت فيها هذه المعاملة.
- `from`: `DATA`، 20 بايت - عنوان المرسل.
- `to`: `DATA`، 20 بايت - عنوان المستلم. null when its a contract creation transaction.
- `cumulativeGasUsed` : `QUANTITY ` - المبلغ الإجمالي للغاز المستخدم عند تنفيذ هذه المعاملة في الكتلة.
- `effectiveGasPrice` : `QUANTITY` - مجموع الرسوم الأساسية والإكرامية المدفوعة لكل وحدة غاز.
- `gasUsed `: `QUANTITY ` - كمية الغاز التي استخدمتها هذه المعاملة المحددة وحدها.
- `contractAddress `: `DATA`، 20 بايت - عنوان العقد الذي تم إنشاؤه، إذا كانت المعاملة عبارة عن إنشاء عقد، وإلا `null`.
- `logs`: `مصفوفة` - مصفوفة من كائنات السجلات، التي أنشأتها هذه المعاملة.
- `logsBloom`: `DATA`، 256 بايت - مرشح بلوم للعملاء الخفيفين لاسترداد السجلات ذات الصلة بسرعة.
- `type`: `QUANTITY` - عدد صحيح لنوع المعاملة، `0x0` للمعاملات القديمة، `0x1` لأنواع قوائم الوصول، `0x2` للرسوم الديناميكية.

كما أنه يُرجع _إما_:

- `root` : `DATA` 32 بايت من جذر الحالة ما بعد المعاملة (قبل بيزنطة)
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
      // السجلات كما أعادها getFilterLogs، إلخ.
    }],
    "logsBloom": "0x00...0", // مرشح بلوم بحجم 256 بايت
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

يُرجع معلومات حول كتلة عم لكتلة حسب التجزئة (الهاش) وفهرس الكتلة العم.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `DATA`، 32 بايت - تجزئة (هاش) الكتلة.
2. `QUANTITY` - موضع فهرس الكتلة العم.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**الإرجاع**
انظر [eth_getBlockByHash](#eth_getblockbyhash)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

النتيجة انظر [eth_getBlockByHash](#eth_getblockbyhash)

**ملاحظة**: لا تحتوي الكتلة العم على معاملات فردية.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

يُرجع معلومات حول كتلة عم لكتلة حسب الرقم وفهرس الكتلة العم.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  جرب نقطة النهاية في ساحة اللعب
</ButtonLink>

**المعاملات**

1. `QUANTITY|TAG` - رقم كتلة، أو السلسلة النصية `"earliest"`، `"latest"`، `"pending"`، `"safe"`، `"finalized"`، كما في [معامل الكتلة](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - موضع فهرس الكتلة العم.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**الإرجاع**
انظر [eth_getBlockByHash](#eth_getblockbyhash)

**ملاحظة**: لا تحتوي الكتلة العم على معاملات فردية.

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

النتيجة انظر [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Creates a filter object, based on filter options, to notify when the state changes (logs).
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [eth_getFilterChanges](#eth_getfilterchanges).

**ملاحظة حول تحديد مرشحات المواضيع:**
المواضيع تعتمد على الترتيب. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- `[]` "أي شيء"
- `[A]` "A في الموضع الأول (وأي شيء بعده)"
- `[null, B]` "أي شيء في الموضع الأول وB في الموضع الثاني (وأي شيء بعده)"
- `[A, B]` "A في الموضع الأول وB في الموضع الثاني (وأي شيء بعده)"
- `[[A, B], [A, B]]` "(A أو B) في الموضع الأول و(A أو B) في الموضع الثاني (وأي شيء بعده)"
- **المعاملات**

1. `كائن` - خيارات المرشح:

- `fromBlock`: `QUANTITY|TAG` - (اختياري، افتراضي: `"latest"`) رقم كتلة عدد صحيح، أو `"latest"` لآخر كتلة مقترحة، `"safe"` لآخر كتلة آمنة، `"finalized"` لآخر كتلة مكتملة، أو `"pending"`، `"earliest"` للمعاملات التي لم يتم تضمينها بعد في كتلة.
- `toBlock`: `QUANTITY|TAG` - (اختياري، افتراضي: `"latest"`) رقم كتلة عدد صحيح، أو `"latest"` لآخر كتلة مقترحة، `"safe"` لآخر كتلة آمنة، `"finalized"` لآخر كتلة مكتملة، أو `"pending"`، `"earliest"` للمعاملات التي لم يتم تضمينها بعد في كتلة.
- `address`: `DATA|Array`، 20 بايت - (اختياري) عنوان العقد أو قائمة بالعناوين التي يجب أن تنشأ منها السجلات.
- `topics`: `مصفوفة من DATA` - (اختياري) مصفوفة من مواضيع `DATA` بحجم 32 بايت. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.

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

**الإرجاع**
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

### eth_newBlockFilter {#eth_newblockfilter}

Creates a filter in the node, to notify when a new block arrives.
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [eth_getFilterChanges](#eth_getfilterchanges).

**المعاملات**
لا يوجد

**الإرجاع**
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

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Creates a filter in the node, to notify when new pending transactions arrive.
للتحقق مما إذا كانت الحالة قد تغيرت، استدعِ [eth_getFilterChanges](#eth_getfilterchanges).

**المعاملات**
لا يوجد

**الإرجاع**
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

### eth_uninstallFilter {#eth_uninstallfilter}

Uninstalls a filter with given id. Should always be called when watch is no longer needed.
بالإضافة إلى ذلك، تنتهي مهلة المرشحات عندما لا يتم طلبها باستخدام [eth_getFilterChanges](#eth_getfilterchanges) لفترة من الزمن.

**المعاملات**

1. `QUANTITY` - معرف المرشح.

```js
params: [
  "0xb", // 11
]
```

**الإرجاع**
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

### eth_getFilterChanges {#eth_getfilterchanges}

Polling method for a filter, which returns an array of logs which occurred since last poll.

**المعاملات**

1. `QUANTITY` - معرف المرشح.

```js
params: [
  "0x16", // 22
]
```

**الإرجاع**
`مصفوفة` - مصفوفة من كائنات السجلات، أو مصفوفة فارغة إذا لم يتغير شيء منذ آخر استطلاع.

- بالنسبة للمرشحات التي تم إنشاؤها باستخدام `eth_newBlockFilter`، يكون الإرجاع هو تجزئات (هاشات) الكتلة (`DATA`، 32 بايت)، على سبيل المثال، `["0x3454645634534..."]`.

- بالنسبة للمرشحات التي تم إنشاؤها باستخدام `eth_newPendingTransactionFilter `، يكون الإرجاع هو تجزئات (هاشات) المعاملات (`DATA`، 32 بايت)، على سبيل المثال، `["0x6345343454645..."]`.

- بالنسبة للمرشحات التي تم إنشاؤها باستخدام `eth_newFilter`، تكون السجلات عبارة عن كائنات بالمعاملات التالية:
  - `removed`: `TAG` - `true` عند إزالة السجل، بسبب إعادة تنظيم السلسلة. `false` إذا كان سجلاً صالحًا.
  - `logIndex`: `QUANTITY` - عدد صحيح لموضع فهرس السجل في الكتلة. `null` عندما يكون سجلًا معلقًا.
  - `transactionIndex`: `QUANTITY` - عدد صحيح لموضع فهرس المعاملات الذي تم إنشاء السجل منه. `null` عندما يكون سجلًا معلقًا.
  - `transactionHash`: `DATA`، 32 بايت - تجزئة (هاش) المعاملات التي تم إنشاء هذا السجل منها. `null` عندما يكون سجلًا معلقًا.
  - `blockHash`: `DATA`، 32 بايت - تجزئة (هاش) الكتلة التي كان فيها هذا السجل. `null` عندما تكون معلقة. `null` عندما يكون سجلًا معلقًا.
  - `blockNumber`: `QUANTITY` - رقم الكتلة التي كان فيها هذا السجل. `null` عندما تكون معلقة. `null` عندما يكون سجلًا معلقًا.
  - `address`: `DATA`، 20 بايت - العنوان الذي نشأ منه هذا السجل.
  - `data`: `DATA` - بيانات سجل غير مفهرسة متغيرة الطول. (في _solidity_: صفر أو أكثر من وسائط السجل غير المفهرسة بحجم 32 بايت.)
  - `topics`: `مصفوفة من DATA` - مصفوفة من 0 إلى 4 من وسائط السجل المفهرسة `DATA` بحجم 32 بايت. (في _solidity_: الموضوع الأول هو _تجزئة (هاش)_ توقيع الحدث (على سبيل المثال، `Deposit(address,bytes32,uint256)`), إلا إذا قمت بتعريف الحدث باستخدام محدد `anonymous`.)

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

### eth_getFilterLogs {#eth_getfilterlogs}

Returns an array of all logs matching filter with given id.

**المعاملات**

1. `QUANTITY` - معرف المرشح.

```js
params: [
  "0x16", // 22
]
```

**الإرجاع**
انظر [eth_getFilterChanges](#eth_getfilterchanges)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

النتيجة انظر [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Returns an array of all logs matching a given filter object.

**المعاملات**

1. `كائن` - خيارات المرشح:

- `fromBlock`: `QUANTITY|TAG` - (اختياري، افتراضي: `"latest"`) رقم كتلة عدد صحيح، أو `"latest"` لآخر كتلة مقترحة، `"safe"` لآخر كتلة آمنة، `"finalized"` لآخر كتلة مكتملة، أو `"pending"`، `"earliest"` للمعاملات التي لم يتم تضمينها بعد في كتلة.
- `toBlock`: `QUANTITY|TAG` - (اختياري، افتراضي: `"latest"`) رقم كتلة عدد صحيح، أو `"latest"` لآخر كتلة مقترحة، `"safe"` لآخر كتلة آمنة، `"finalized"` لآخر كتلة مكتملة، أو `"pending"`، `"earliest"` للمعاملات التي لم يتم تضمينها بعد في كتلة.
- `address`: `DATA|Array`، 20 بايت - (اختياري) عنوان العقد أو قائمة بالعناوين التي يجب أن تنشأ منها السجلات.
- `topics`: `مصفوفة من DATA` - (اختياري) مصفوفة من مواضيع `DATA` بحجم 32 بايت. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.
- `blockHash`: `DATA`، 32 بايت - (اختياري، **مستقبلي**) مع إضافة EIP-234، سيكون `blockHash` خيار مرشح جديد يقيد السجلات التي يتم إرجاعها إلى الكتلة الفردية التي تحتوي على تجزئة (هاش) `blockHash` بحجم 32 بايت. استخدام `blockHash` يعادل `fromBlock` = `toBlock` = رقم الكتلة مع تجزئة (هاش) `blockHash`. إذا كان `blockHash` موجودًا في معايير المرشح، فلا يُسمح بـ `fromBlock` ولا `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**الإرجاع**
انظر [eth_getFilterChanges](#eth_getfilterchanges)

**مثال**

```js
// طلب
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

النتيجة انظر [eth_getFilterChanges](#eth_getfilterchanges)

## مثال على الاستخدام {#usage-example}

### نشر عقد باستخدام JSON_RPC {#deploying-contract}

This section includes a demonstration of how to deploy a contract using only the RPC interface. هناك طرق بديلة لنشر العقود حيث يتم تجريد هذا التعقيد بعيدًا - على سبيل المثال، استخدام المكتبات المبنية فوق واجهة RPC مثل [web3.js](https://web3js.readthedocs.io/) و[web3.py](https://github.com/ethereum/web3.py). These abstractions are generally easier to understand and less error-prone, but it is still helpful to understand what is happening under the hood.

فيما يلي عقد ذكي مباشر يسمى `Multiply7` سيتم نشره باستخدام واجهة JSON-RPC إلى عقدة إيثريوم. This tutorial assumes the reader is already running a Geth node. مزيد من المعلومات حول العقد والعملاء متاحة [هنا](/developers/docs/nodes-and-clients/run-a-node). يرجى الرجوع إلى وثائق [العميل](/developers/docs/nodes-and-clients/) الفردية لمعرفة كيفية بدء HTTP JSON-RPC للعملاء غير Geth. معظم العملاء يقدمون الخدمة افتراضيًا على `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

The first thing to do is make sure the HTTP RPC interface is enabled. هذا يعني أننا نوفر Geth مع علامة `--http` عند بدء التشغيل. In this example we use the Geth node on a private development chain. Using this approach we don't need ether on the real network.

```bash
geth --http --dev console 2>>geth.log
```

سيؤدي هذا إلى بدء واجهة HTTP RPC على `http://localhost:8545`.

يمكننا التحقق من تشغيل الواجهة عن طريق استرداد عنوان coinbase (عن طريق الحصول على العنوان الأول من مصفوفة الحسابات) والرصيد باستخدام [curl](https://curl.se). Please note that data in these examples will differ on your local node. If you want to try these commands, replace the request params in the second curl request with the result returned from the first.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Because numbers are hex encoded, the balance is returned in wei as a hex string. If we want to have the balance in ether as a number we can use web3 from the Geth console.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Now that there is some ether on our private development chain, we can deploy the contract. The first step is to compile the Multiply7 contract to byte code that can be sent to the EVM. لتثبيت solc، مترجم Solidity، اتبع [وثائق Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (قد ترغب في استخدام إصدار أقدم من `solc` ليتوافق مع [إصدار المترجم المستخدم في مثالنا](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

الخطوة التالية هي تجميع عقد Multiply7 إلى كود بايت يمكن إرساله إلى آلة إيثريوم الافتراضية.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Now that we have the compiled code we need to determine how much gas it costs to deploy it. تحتوي واجهة RPC على طريقة `eth_estimateGas` ستعطينا تقديرًا.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

And finally deploy the contract.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

The transaction is accepted by the node and a transaction hash is returned. This hash can be used to track the transaction. The next step is to determine the address where our contract is deployed. Each executed transaction will create a receipt. This receipt contains various information about the transaction such as in which block the transaction was included and how much gas was used by the EVM. If a transaction
creates a contract it will also contain the contract address. يمكننا استرداد الإيصال باستخدام طريقة RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

تم إنشاء عقدنا على `0x4d03d617d700cf81935d7f797f4e2ae719648262`. نتيجة فارغة بدلاً من إيصال تعني أن المعاملة لم يتم تضمينها في كتلة بعد. انتظر لحظة وتحقق مما إذا كان عميل الإجماع الخاص بك قيد التشغيل ثم أعد المحاولة.

#### التفاعل مع العقود الذكية {#interacting-with-smart-contract}

في هذا المثال، سنرسل معاملة باستخدام `eth_sendTransaction` إلى طريقة `multiply` في العقد.

تتطلب `eth_sendTransaction` عدة وسيطات، وتحديدًا `from` و`to` و`data`. `From` هو العنوان العام لحسابنا، و`to` هو عنوان العقد. تحتوي وسيطة `data` على حمولة تحدد الطريقة التي يجب استدعاؤها ومع أي وسيطات. هنا يأتي دور [واجهة التطبيق الثنائية (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html). The ABI is a JSON file that defines how to define and encode data for the EVM.

The bytes of the payload defines which method in the contract is called. This is the first 4 bytes from the Keccak hash over the function name and its argument types, hex encoded. The multiply function accepts an uint which is an alias for uint256. This leaves us with:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

The next step is to encode the arguments. There is only one uint256, say, the value 6. The ABI has a section which specifies how to encode uint256 types.

`int<M>: enc(X)` هو ترميز المكمل الثنائي ذو النهاية الكبرى لـ X، مبطن من الجانب الأعلى (الأيسر) بـ 0xff لـ X السالب وببايتات صفرية لـ X الموجب بحيث يكون الطول مضاعفًا لـ 32 بايت.

يتم ترميز هذا إلى `0000000000000000000000000000000000000000000000000000000000000006`.

بدمج محدد الوظيفة والوسيطة المشفرة، ستكون بياناتنا `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

This can now be sent to the node:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Since a transaction was sent, a transaction hash was returned. Retrieving the receipt gives:

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

The receipt contains a log. This log was generated by the EVM on transaction execution and included in the receipt. تظهر وظيفة `multiply` أن حدث `Print` قد تم إطلاقه مع المدخل مضروبًا في 7. نظرًا لأن وسيطة حدث `Print` كانت uint256، يمكننا فك تشفيرها وفقًا لقواعد واجهة التطبيق الثنائية مما سيتركنا مع العدد العشري المتوقع 42. Apart from the data it is worth noting that topics can be used to determine which event created the log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

This was just a brief introduction into some of the most common tasks, demonstrating direct usage of the JSON-RPC.

## المواضيع ذات الصلة {#related-topics}

- [مواصفات JSON-RPC](http://www.jsonrpc.org/specification)
- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [واجهات برمجة تطبيقات JavaScript](/developers/docs/apis/javascript/)
- [واجهات برمجة تطبيقات الواجهة الخلفية](/developers/docs/apis/backend/)
- [عملاء التنفيذ](/developers/docs/nodes-and-clients/#execution-clients)
