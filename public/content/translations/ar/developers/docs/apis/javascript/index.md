---
title: "مكتبات ⁦API⁩ لـ ⁦JavaScript⁩"
description: "مقدمة عن مكتبات عميل ⁦JavaScript⁩ التي تتيح لك التفاعل مع سلسلة الكتل من تطبيقك."
lang: ar
---

لكي يتفاعل تطبيق ويب مع سلسلة الكتل لإيثيريوم (أي قراءة بيانات سلسلة الكتل و/أو إرسال معاملات إلى الشبكة)، يجب أن يتصل بعقدة إيثيريوم.

لهذا الغرض، ينفذ كل عميل إيثيريوم مواصفات [<span dir="ltr">JSON-RPC</span>](/developers/docs/apis/json-rpc/)، لذلك هناك مجموعة موحدة من [الطرق](/developers/docs/apis/json-rpc/#json-rpc-methods) التي يمكن للتطبيقات الاعتماد عليها.

إذا كنت ترغب في استخدام <span dir="ltr">JavaScript</span> للاتصال بعقدة إيثيريوم، فمن الممكن استخدام <span dir="ltr">JavaScript</span> الأساسية ولكن توجد العديد من المكتبات المريحة داخل النظام البيئي التي تجعل هذا أسهل بكثير. باستخدام هذه المكتبات، يمكن للمطورين كتابة طرق بديهية من سطر واحد لتهيئة طلبات <span dir="ltr">JSON-RPC</span> (داخليًا) التي تتفاعل مع إيثيريوم.

يرجى ملاحظة أنه منذ [الدمج](/roadmap/merge/)، يلزم وجود قطعتين متصلتين من برامج إيثيريوم - عميل التنفيذ وعميل إجماع - لتشغيل عقدة. يرجى التأكد من أن عقدتك تتضمن كلاً من عميل التنفيذ وعميل الإجماع. إذا لم تكن عقدتك على جهازك المحلي (على سبيل المثال، تعمل عقدتك على مثيل <span dir="ltr">AWS</span>)، فقم بتحديث عناوين <span dir="ltr">IP</span> في البرنامج التعليمي وفقًا لذلك. لمزيد من المعلومات، يرجى الاطلاع على صفحتنا حول [تشغيل عقدة](/developers/docs/nodes-and-clients/run-a-node/).

## المتطلبات الأساسية {#prerequisites}

بالإضافة إلى فهم <span dir="ltr">JavaScript</span>، قد يكون من المفيد فهم [حزمة إيثيريوم](/developers/docs/ethereum-stack/) و[عملاء إيثيريوم](/developers/docs/nodes-and-clients/).

## لماذا تستخدم مكتبة؟ {#why-use-a-library}

تعمل هذه المكتبات على تجريد الكثير من تعقيدات التفاعل المباشر مع عقدة إيثيريوم. كما أنها توفر وظائف مساعدة (على سبيل المثال، تحويل <span dir="ltr">ETH</span> إلى <span dir="ltr">Gwei</span>) بحيث يمكنك كمطور قضاء وقت أقل في التعامل مع تعقيدات عملاء إيثيريوم ومزيد من الوقت في التركيز على الوظائف الفريدة لتطبيقك.

## ميزات المكتبة {#library-features}

### الاتصال بعقد إيثيريوم {#connect-to-ethereum-nodes}

باستخدام المزودين، تتيح لك هذه المكتبات الاتصال بإيثيريوم وقراءة بياناته، سواء كان ذلك عبر <span dir="ltr">JSON-RPC</span> أو <span dir="ltr">Infura</span> أو <span dir="ltr">Etherscan</span> أو <span dir="ltr">Alchemy</span> أو ميتاماسك.

> **تحذير:** تمت أرشفة <span dir="ltr">Web3.js</span> في <span dir="ltr">March 4, 2025</span>. [اقرأ الإعلان](https://blog.chainsafe.io/web3-js-sunset/). فكر في استخدام مكتبات بديلة مثل [<span dir="ltr">Ethers.js</span>](https://ethers.org) أو [<span dir="ltr">Viem</span>](https://viem.sh) للمشاريع الجديدة.

**مثال <span dir="ltr">Ethers</span>**

```js
// يغلف BrowserProvider مزود Web3 قياسي، وهو
// ما يحقنه ميتاماسك كـ window.ethereum في كل صفحة
const provider = new ethers.BrowserProvider(window.ethereum)

// تسمح إضافة ميتاماسك أيضًا بتوقيع المعاملات لـ
// إرسال الإيثر والدفع لتغيير الحالة داخل سلسلة الكتل.
// لهذا، نحتاج إلى موقع الحساب...
const signer = provider.getSigner()
```

**مثال <span dir="ltr">Web3js</span>**

```js
var web3 = new Web3("http://localhost:8545")
// أو
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// تغيير المزود
web3.setProvider("ws://localhost:8546")
// أو
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// استخدام مزود IPC في node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // مسار mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // مسار mac os
// في windows المسار هو: "\\\\.\\pipe\\geth.ipc"
// في linux المسار هو: "/users/myuser/.ethereum/geth.ipc"
```

بمجرد الإعداد، ستتمكن من الاستعلام من سلسلة الكتل عن:

- أرقام الكتل
- تقديرات الغاز
- أحداث العقد الذكي
- معرف الشبكة
- والمزيد...

### وظائف المحفظة {#wallet-functionality}

تمنحك هذه المكتبات وظائف لإنشاء محافظ وإدارة المفاتيح وتوقيع المعاملات.

إليك مثال من <span dir="ltr">Ethers</span>

```js
// إنشاء مثيل محفظة من عبارة تذكيرية...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...أو من مفتاح خاص
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// العنوان كـ Promise وفقًا لـ API الموقع
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// عنوان المحفظة متاح أيضًا بشكل متزامن
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// المكونات التشفيرية الداخلية
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// العبارة التذكيرية للمحفظة
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// ملاحظة: المحفظة المنشأة باستخدام مفتاح خاص لا
//       تحتوي على عبارة تذكيرية (الاشتقاق يمنع ذلك)
walletPrivateKey.mnemonic
// null

// توقيع رسالة
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// توقيع معاملة
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// تُرجع طريقة connect مثيلاً جديدًا من
// المحفظة المتصلة بمزود
wallet = walletMnemonic.connect(provider)

// الاستعلام من الشبكة
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// إرسال الإيثر
wallet.sendTransaction(tx)
```

[اقرأ المستندات الكاملة](https://docs.ethers.io/v5/api/signer/#Wallet)

بمجرد الإعداد ستتمكن من:

- إنشاء حسابات
- إرسال معاملات
- توقيع معاملات
- والمزيد...

### التفاعل مع وظائف العقد الذكي {#interact-with-smart-contract-functions}

تتيح مكتبات عميل <span dir="ltr">JavaScript</span> لتطبيقك استدعاء وظائف العقد الذكي من خلال قراءة واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) لعقد مجمع.

تشرح <span dir="ltr">ABI</span> بشكل أساسي وظائف العقد بتنسيق <span dir="ltr">JSON</span> وتسمح لك باستخدامها ككائن <span dir="ltr">JavaScript</span> عادي.

لذا فإن عقد <span dir="ltr">Solidity</span> التالي:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

سينتج عنه <span dir="ltr">JSON</span> التالي:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

هذا يعني أنه يمكنك:

- إرسال معاملة إلى العقد الذكي وتنفيذ طريقته
- الاستدعاء لتقدير الغاز الذي سيستغرقه تنفيذ الطريقة عند تنفيذها في جهاز إيثيريوم الظاهري (<span dir="ltr">EVM</span>)
- نشر عقد
- والمزيد...

### الوظائف المساعدة {#utility-functions}

تمنحك الوظائف المساعدة اختصارات مفيدة تجعل البناء باستخدام إيثيريوم أسهل قليلاً.

قيم <span dir="ltr">ETH</span> تكون بـ <span dir="ltr">Wei</span> افتراضيًا. <span dir="ltr">1 ETH = 1,000,000,000,000,000,000 WEI</span> – هذا يعني أنك تتعامل مع الكثير من الأرقام! `web3.utils.toWei` يحول الإيثر إلى <span dir="ltr">Wei</span> من أجلك.

وفي <span dir="ltr">Ethers</span> يبدو الأمر هكذا:

```js
// الحصول على رصيد حساب (عن طريق العنوان أو اسم ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// غالبًا ما ستحتاج إلى تنسيق المخرجات للمستخدم
// الذي يفضل رؤية القيم بالإيثر (بدلاً من Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [الوظائف المساعدة لـ <span dir="ltr">Web3js</span>](https://docs.web3js.org/api/web3-utils)
- [الوظائف المساعدة لـ <span dir="ltr">Ethers</span>](https://docs.ethers.org/v6/api/utils/)

## المكتبات المتاحة {#available-libraries}

**<span dir="ltr">Web3.js</span> -** **_واجهة برمجة تطبيقات <span dir="ltr">JavaScript</span> لإيثيريوم._**

- [المستندات](https://docs.web3js.org)
- [<span dir="ltr">GitHub</span>](https://github.com/ethereum/web3.js)

**<span dir="ltr">Ethers.js</span> -** **_تنفيذ كامل لمحفظة إيثيريوم وأدوات مساعدة في <span dir="ltr">JavaScript</span> و<span dir="ltr">TypeScript</span>._**

- [الصفحة الرئيسية لـ <span dir="ltr">Ethers.js</span>](https://ethers.org/)
- [المستندات](https://docs.ethers.io)
- [<span dir="ltr">GitHub</span>](https://github.com/ethers-io/ethers.js)

**<span dir="ltr">The Graph</span> -** **_بروتوكول لفهرسة بيانات إيثيريوم و<span dir="ltr">IPFS</span> والاستعلام عنها باستخدام <span dir="ltr">GraphQL</span>._**

- [<span dir="ltr">The Graph</span>](https://thegraph.com)
- [مستكشف <span dir="ltr">Graph</span>](https://thegraph.com/explorer)
- [المستندات](https://thegraph.com/docs)
- [<span dir="ltr">GitHub</span>](https://github.com/graphprotocol)
- [ديسكورد](https://thegraph.com/discord)

**<span dir="ltr">Alchemy SDK</span> -** **_غلاف حول <span dir="ltr">Ethers.js</span> مع واجهات برمجة تطبيقات محسنة._**

- [المستندات](https://www.alchemy.com/docs)
- [<span dir="ltr">GitHub</span>](https://github.com/alchemyplatform/alchemy-sdk-js)

**<span dir="ltr">Viem</span> -** **_واجهة <span dir="ltr">TypeScript</span> لإيثيريوم._**

- [المستندات](https://viem.sh)
- [<span dir="ltr">GitHub</span>](https://github.com/wagmi-dev/viem)

**<span dir="ltr">Codex</span> -** **_واجهة برمجة تطبيقات لبيانات سلسلة الكتل المثرية في الوقت الفعلي عبر عشرات السلاسل._**

- [المستندات](https://docs.codex.io)
- [المستكشف](https://docs.codex.io/explore)
- [<span dir="ltr">GitHub</span>](https://github.com/Codex-Data)
- [ديسكورد](https://discord.com/invite/mFpUhT3vAq)

**<span dir="ltr">Drift</span> -** **_مكتبة وصفية لـ <span dir="ltr">TypeScript</span> مع تخزين مؤقت مدمج، وخطافات، ونماذج اختبار وهمية._**

- [المستندات](https://ryangoree.github.io/drift/)
- [<span dir="ltr">GitHub</span>](https://github.com/ryangoree/drift/)

## قراءة إضافية {#further-reading}

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_

## مواضيع ذات صلة {#related-topics}

- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [أطر التطوير](/developers/docs/frameworks/)

## برامج تعليمية ذات صلة {#related-tutorials}

- [إعداد <span dir="ltr">Web3js</span> لاستخدام سلسلة الكتل لإيثيريوم في <span dir="ltr">JavaScript</span>](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– إرشادات لإعداد <span dir="ltr">Web3.js</span> في مشروعك._
- [استدعاء عقد ذكي من <span dir="ltr">JavaScript</span>](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– باستخدام الرمز المميز <span dir="ltr">DAI</span>، تعرف على كيفية استدعاء وظيفة العقود باستخدام <span dir="ltr">JavaScript</span>._
- [إرسال المعاملات باستخدام <span dir="ltr">Web3</span> و<span dir="ltr">Alchemy</span>](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– إرشادات خطوة بخطوة لإرسال المعاملات من الواجهة الخلفية._

## برامج تعليمية: واجهات برمجة تطبيقات <span dir="ltr">JavaScript</span> و<span dir="ltr">WebSockets</span> على إيثيريوم {#tutorials}

- [استخدام <span dir="ltr">WebSockets</span>](/developers/tutorials/using-websockets/) _– كيفية استخدام <span dir="ltr">WebSockets</span> مع <span dir="ltr">Alchemy</span> للاشتراك في أحداث إيثيريوم وإجراء طلبات <span dir="ltr">JSON-RPC</span> في الوقت الفعلي._