---
title: "مكتبات واجهات برمجة التطبيقات بلغة JavaScript"
description: "مقدمة إلى مكتبات JavaScript العميلة التي تسمح لك بالتفاعل مع سلسلة الكتل من التطبيق الخاص بك."
lang: ar
---

لكي يتمكن تطبيق الويب من التفاعل مع بلوكتشين Ethereum (أي قراءة بيانات البلوكتشين و/أو إرسال المعاملات إلى الشبكة)، يجب أن يتصل بعقدة Ethereum.

لهذا الغرض، يقوم كل عميل Ethereum بتنفيذ مواصفات [JSON-RPC](/developers/docs/apis/json-rpc/)، لذلك هناك مجموعة موحدة من [الأساليب](/developers/docs/apis/json-rpc/#json-rpc-methods) التي يمكن للتطبيقات الاعتماد عليها.

إذا كنت ترغب في استخدام JavaScript للاتصال بعقدة Ethereum، يمكنك استعمال لغة JavaScript العادية، ولكن تتوفر داخل النظام عدة مكتبات ملائمة تسهّل هذه العملية بشكل كبير. مع هذه المكتبات، بوسع المطورين كتابة طرق ذكية من سطر واحد لتهيئة طلبات JSON RPC (في الخلفية) التي تتفاعل مع Ethereum.

يرجى ملاحظة أنه منذ [الدمج](/roadmap/merge/)، هناك حاجة إلى جزأين متصلين من برامج Ethereum - عميل تنفيذ وعميل إجماع - لتشغيل عقدة. يرجى التأكد من أن عقدتك تحتوي على كلٍّ من عميل التنفيذ وعميل الإجماع. إذا لم تكن عقدتك على جهازك المحلي (على سبيل المثال، تعمل عقدتك على مثيل AWS) فقم بتحديث عناوين IP في البرنامج التعليمي وفقًا لذلك. لمزيد من المعلومات، يرجى الاطلاع على صفحتنا حول [تشغيل عقدة](/developers/docs/nodes-and-clients/run-a-node/).

## المتطلبات الأساسية {#prerequisites}

بالإضافة إلى فهم JavaScript، قد يكون من المفيد فهم [حزمة Ethereum](/developers/docs/ethereum-stack/) و[عملاء Ethereum](/developers/docs/nodes-and-clients/).

## ما نفع المكتبة؟ {#why-use-a-library}

تخفف هذه المكتبات إلى حد كبير من تعقيد التفاعل المباشر مع عقدة Ethereum. كما أنها توفر وظائف مساعِدة (كتحويل ETH إلى Gwei) تتيح لك كمطوّر قضاء وقت أقل في التعامل مع تعقيدات عملاء إيثريوم والتركيز لوقت أطول على وظيفة تطبيقك الفريدة.

## ميزات المكتبة {#library-features}

### الاتصال بعقد Ethereum {#connect-to-ethereum-nodes}

تستخدم هذه المكتبات المزودين لتتيح لك بالاتصال بـ Ethereum وقراءة بياناته، سواء كان ذلك عبر JSON-RPC أو INFURA أو Etherscan أو Alchemy أو MetaMask.

> **تحذير:** تمت أرشفة Web3.js في 4 مارس 2025. [اقرأ الإعلان](https://blog.chainsafe.io/web3-js-sunset/). فكر في استخدام مكتبات بديلة مثل [ethers.js](https://ethers.org) أو [viem](https://viem.sh) للمشاريع الجديدة.

**مثال عن Ethers**

```js
// يغلف BrowserProvider مزود Web3 قياسي، وهو
// ما يضيفه MetaMask كـ window.ethereum في كل صفحة
const provider = new ethers.BrowserProvider(window.ethereum)

// يسمح المكون الإضافي MetaMask أيضًا بتوقيع المعاملات
// لإرسال الإيثر والدفع لتغيير الحالة داخل البلوكتشين.
// لهذا، نحن بحاجة إلى موقّع الحساب...
const signer = provider.getSigner()
```

**مثال عن Web3js**

```js
var web3 = new Web3("http://localhost:8545")
/ أو
var web3 = new Web3(New Web3.providers.HttpProvider("http://localhost:8545"))

// تغيير المزود
web3.setProvider("ws://localhost:8546")
// أو
web3.setProvider(new web3.providers.WebsocketProvider("ws://localhost:8546"))

// استخدام مزود خدمة الاتصال بين العمليات (IPC) في node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth. ipc", net) // مسار نظام التشغيل على mac
// أو
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // مسار نظام التشغيل على mac
// المسار على Windows هو: "\\\\.\\pipe\\geth.ipc"
/ المسار على linux هو: "/users/myuser/.ethereum/geth.ipc"
```

بعد الانتهاء من الإعداد، يصبح بإمكانك الاستعلام من سلسلة الكتل عن:

- أرقام الكتلة
- تقديرات الغاز
- أحداث العقود الذكية
- هوية الشبكة
- وغير ذلك...

### وظيفة المحفظة {#wallet-functionality}

تمنحك هذه المكتبات الوظائف اللازمة لإنشاء المحافظ وإدارة المفاتيح وتوقيع المعاملات.

إليك أمثلة من Ethers

```js
// إنشاء نسخة محفظة من عبارة استذكارية...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ... أو من مفتاح خاص
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// صحيح

// العنوان كوعد حسب واجهة برمجة تطبيقات الموقّع
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// عنوان المحفظة متاح أيضًا بشكل متزامن
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// مكونات التشفير الداخلية
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// عبارة المحفظة الاستذكارية
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// ملاحظة: المحفظة التي تم إنشاؤها بمفتاح خاص لا تحتوي على
//       عبارة استذكارية (الاشتقاق يمنع ذلك)
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

// تعيد طريقة الاتصال نسخة جديدة من
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

[اقرأ التوثيق الكامل](https://docs.ethers.io/v5/api/signer/#Wallet)

بعد الانتهاء من الإعداد، يمكنك:

- إنشاء حسابات
- إرسال المعاملات
- توقيع المعاملات
- وغير ذلك...

### التفاعل مع دوال العقود الذكية {#interact-with-smart-contract-functions}

تُتيح مكتبات JavaScript لتطبيقك استدعاء وظائف العقود الذكية من خلال قراءة واجهة التطبيق الثنائية (ABI) الخاصة بالعقد بعد عملية ترجمة (Compilation) العقد.

تشرح واجهة التطبيق الثنائية وظائف العقد بصيغة JSON وتتيح لك استخدامه كأي شيء عادي بلغة JavaScript.

لذا فإن عقد Solidity التالي:

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

ينتج JSON التالي:

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

وهذا يعني أنك تستطيع:

- إرسال معاملة إلى العقد الذكي وتنفيذ طريقته
- الاتصال لتقدير الغاز الذي يحتاجه تنفيذ الطريقة عند تنفيذها في آلة Ethereum الافتراضية
- نشر العقود
- وغير ذلك...

### الوظائف المساعدة {#utility-functions}

تمنحك الوظائف المساعِدة اختصارات مفيدة تسهّل بعض الشيء عملية البناء باستخدام Ethereum.

تأتي قيم ETH بفئة واي بشكل افتراضي. كل ETH واحد يعادل 1,000,000,000,000,000,000,000 WEI - هذا يعني أنك تتعامل مع الكثير من الأرقام! `web3.utils.toWei` يحول الإيثر إلى Wei من أجلك.

وتبدو القيمة بـether على الشكل التالي:

```js
// احصل على رصيد حساب (عن طريق العنوان أو اسم ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// ستحتاج غالبًا إلى تنسيق المُخرج للمستخدم
// الذي يفضل رؤية القيم بـ ether (بدلاً من wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [الوظائف المساعدة لـ Web3js](https://docs.web3js.org/api/web3-utils)
- [الوظائف المساعدة لـ Ethers](https://docs.ethers.org/v6/api/utils/)

## المكتبات المتاحة {#available-libraries}

**Web3.js -** **_واجهة برمجة تطبيقات Ethereum JavaScript._**

- [التوثيق](https://docs.web3js.org)
- [يجتبه](https://github.com/ethereum/web3.js)

**Ethers.js -** **_تنفيذ محفظة Ethereum بالكامل مع الأدوات المساعدة باستخدام JavaScript و TypeScript._**

- [الصفحة الرئيسية لـ Ethers.js](https://ethers.org/)
- [التوثيق](https://docs.ethers.io)
- [يجتبه](https://github.com/ethers-io/ethers.js)

**The Graph -** **_بروتوكول لفهرسة بيانات Ethereum و IPFS والاستعلام عنها باستخدام GraphQL._**

- [The Graph](https://thegraph.com)
- [مستكشف Graph](https://thegraph.com/explorer)
- [التوثيق](https://thegraph.com/docs)
- [يجتبه](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_غلاف حول Ethers.js مع واجهات برمجة تطبيقات محسّنة._**

- [التوثيق](https://www.alchemy.com/docs)
- [يجتبه](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_واجهة TypeScript لـ Ethereum._**

- [التوثيق](https://viem.sh)
- [يجتبه](https://github.com/wagmi-dev/viem)

**Drift -** **_مكتبة تعريفية بلغة TypeScript مع تخزين مؤقت مدمج وخطافات ومحاكاة اختبار._**

- [التوثيق](https://ryangoree.github.io/drift/)
- [يجتبه](https://github.com/ryangoree/drift/)

## قراءة إضافية{#further-reading}

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_

## المواضيع ذات الصلة {#related-topics}

- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [أطر التطوير](/developers/docs/frameworks/)

## دروس تعليمية ذات صلة {#related-tutorials}

- [إعداد Web3js لاستخدام سلسلة كتل الإيثريوم في JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– تعليمات لإعداد web3.js في مشروعك._
- [استدعاء عقد ذكي من JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– باستخدام رمز DAI، تعرّف على كيفية استدعاء وظيفة العقود بواسطة JavaScript._
- [إرسال المعاملات باستخدام web3 و Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– إرشادات تفصيلية خطوة بخطوة لإرسال المعاملات من الواجهة الخلفية._
