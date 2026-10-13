---
title: التفاعل مع العقود الذكية
description: تعلم كيفية القراءة من والكتابة إلى العقود الذكية المنشورة بالفعل على إيثيريوم.
lang: ar
---

لا تحتاج دائمًا إلى كتابة ونشر عقدك الذكي الخاص. في معظم الأحيان كمطور، ستحتاج إلى التفاعل مع العقود الذكية التي نشرها آخرون بالفعل على شبكة إيثيريوم.

تغطي هذه الصفحة الطريقتين الأساسيتين للتفاعل مع العقد الذكي — **قراءة** البيانات و**كتابة** البيانات — والأدوات التي تحتاجها للقيام بكليهما.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم:

- [كيف تعمل العقود الذكية](/developers/docs/smart-contracts/)
- [حسابات إيثيريوم وكيفية توقيعها للمعاملات](/developers/docs/accounts/)
- [ما هي المعاملة](/developers/docs/transactions/)

## طريقتان للتفاعل مع العقد الذكي {#two-ways}

ينقسم التفاعل مع العقد الذكي إلى فئتين:

### القراءة من العقد {#reading-from-a-contract}

القراءة هي عملية **مجانية** لا تنشئ معاملة ولا تغير أي حالة على سلسلة الكتل.

عندما تقرأ من عقد، فأنت ببساطة تستعلم عن بيانات موجودة بالفعل. على سبيل المثال:

- التحقق من رصيد رمز مميز من نوع <span dir="ltr">ERC-20</span>
- قراءة السعر الحالي من منصة تداول لامركزية
- الحصول على مالك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)

نظرًا لأن عمليات القراءة لا تعدل الحالة، فإنها لا تكلف [غاز](/developers/docs/gas/) ويمكن لأي شخص إجراؤها دون الحاجة إلى <span dir="ltr">ETH</span>.

### الكتابة إلى العقد {#writing-to-a-contract}

الكتابة هي عملية **تغيير للحالة** تتطلب معاملة وتكلف غاز.

عندما تكتب إلى عقد، فأنت تقوم بتشغيل دالة تعدل حالة سلسلة الكتل. على سبيل المثال:

- تحويل الرموز المميزة
- مبادلة الرموز المميزة على منصة تداول لامركزية
- عملية سك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)

تتطلب الكتابة دائمًا:

1. [حساب مملوك خارجيًا (EOA)](/developers/docs/accounts/#types-of-account) يحتوي على ما يكفي من <span dir="ltr">ETH</span> للغاز
2. معاملة موقعة بواسطة مفتاح خاص للحساب
3. أن يتم تعدين المعاملة وتضمينها في كتلة

مع [تجريد الحساب](/roadmap/account-abstraction/)، يمكن لحساب العقد الذكي أيضًا بدء عمليات الكتابة، ويمكن لمدير الدفع تغطية الغاز نيابة عن المستخدم — لذلك لا يُشترط بالضرورة وجود حساب مملوك خارجيًا (<span dir="ltr">EOA</span>) يحتفظ بـ <span dir="ltr">ETH</span>.

## فهم واجهات التطبيق الثنائية (ABIs) للعقود {#understanding-contract-abis}

للتفاعل مع عقد ذكي، يحتاج تطبيقك إلى معرفة *ما* يمكن للعقد القيام به. وهنا يأتي دور **واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>)**.

واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) هي مستند <span dir="ltr">JSON</span> يصف:

- كل دالة يعرضها العقد (الاسم، المدخلات، المخرجات)
- كل حدث يمكن للعقد إصداره
- كيفية تشفير وفك تشفير البيانات عند التحدث إلى العقد

فكر في واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) كدليل تعليمات العقد — بدونها، لا يعرف تطبيقك الدوال الموجودة أو المعلمات التي تتوقعها.

### أين تجد واجهة التطبيق الثنائية (ABI) للعقد {#where-to-find-abis}

- **العقود الموثقة على Etherscan** - يعرض [Etherscan](https://etherscan.io) تلقائيًا واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) للكود المصدري الموثق
- **من المطور** - تنشر العديد من المشاريع واجهات التطبيق الثنائية (<span dir="ltr">ABIs</span>) الخاصة بها في وثائقها أو حزم <span dir="ltr">npm</span>
- **الإنشاء من المصدر** - إذا كان لديك الكود المصدري بلغة Solidity، فيمكنك [تصريفه](/developers/docs/smart-contracts/compiling/) لإنتاج واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>)

## أدوات ومكتبات للتفاعل مع العقود {#tools-and-libraries}

يستخدم المطورون عادةً مكتبة JavaScript/TypeScript للتفاعل مع العقود من تطبيق ويب أو واجهة خلفية أو برنامج نصي.

### مكتبات العميل (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - واجهة TypeScript حديثة وخفيفة الوزن لإيثيريوم مع أمان كتابة من الدرجة الأولى
- **[ethers.js](https://docs.ethers.org/)** - مكتبة مجربة ومختبرة للتفاعل مع سلسلة الكتل لإيثيريوم
- **[web3.js](https://web3js.org/)** - واجهة برمجة تطبيقات (<span dir="ltr">API</span>) الأصلية لإيثيريوم بلغة JavaScript

### مكتبات الواجهة الخلفية {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - تعمل أيضًا في Node.js للبرامج النصية والروبوتات من جانب الخادم
- **[web3.py](https://web3py.readthedocs.io/)** - مكتبة Python للتفاعل مع إيثيريوم
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - مكتبة Go الرسمية من فريق جو إيثريوم (geth)

### مثال: قراءة رصيد رمز مميز باستخدام Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// عنوان عقد USDC و ABI (جزئي، من أجل balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // يحتوي USDC على 6 منازل عشرية
```

### مثال: إرسال معاملة باستخدام Ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI لتحويل ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // انتظر حتى يتم تعدين المعاملة
console.log(`Transferred! TX: ${tx.hash}`)
```

## الأحداث والسجلات {#events-and-logs}

يمكن للعقود الذكية إصدار **أحداث** للإشارة إلى حدوث شيء ما. يمكن لتطبيقك الاستماع إلى هذه الأحداث للتفاعل في الوقت الفعلي.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// مراقبة أحداث تحويل USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## محاكاة المعاملات {#simulating}

قبل إرسال معاملة، يمكنك **محاكاتها** للتحقق مما إذا كانت ستنجح — ولرؤية القيمة المرجعة الخاصة بها — دون إنفاق غاز. هذا مفيد لاكتشاف الأخطاء مبكرًا ولمعاينة النتائج.

تدعم معظم مكتبات العميل ذلك من خلال `eth_call`:

```ts
// باستخدام Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## المحافظ والتوقيع {#wallets-and-signing}

في تطبيق لامركزي (dapp)، تتولى محفظة المستخدم (مثل ميتاماسك أو Rainbow أو WalletConnect) عملية التوقيع. أنت لا تدير مفاتيح خاصة بشكل مباشر.

تقوم [مكتبات المحافظ وأدوات الاتصال](/developers/docs/apis/javascript/) بتجريد ذلك حتى تتمكن من التركيز على بناء منطق تطبيقك.

## برامج تعليمية ذات صلة {#related-tutorials}

- [استدعاء عقد ذكي من JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [إرسال المعاملات باستخدام Web3.js وAlchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [كيفية عرض الرمز غير القابل للاستبدال (NFT) الخاص بك في محفظتك](/developers/tutorials/how-to-view-nft-in-metamask/)

## قراءة إضافية {#further-reading}

- [وثائق Viem: القراءة والكتابة إلى العقود](https://viem.sh/docs/contract/readContract)
- [وثائق Ethers.js: العقود](https://docs.ethers.org/v6/api/contract/)
- [مواصفات واجهة التطبيق الثنائية (ABI) للغة Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ما هي واجهة التطبيق الثنائية (ABI)؟ - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## مواضيع ذات صلة {#related-topics}

- [تصريف العقود الذكية](/developers/docs/smart-contracts/compiling/)
- [نشر العقود الذكية](/developers/docs/smart-contracts/deploying/)
- [واجهات برمجة تطبيقات (APIs) للغة JavaScript](/developers/docs/apis/javascript/)
- [واجهات برمجة تطبيقات (APIs) للواجهة الخلفية](/developers/docs/apis/backend/)