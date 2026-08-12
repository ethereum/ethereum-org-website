---
title: المصادقة على إيثيريوم
description: تعرف على كيفية عمل مصادقة المستخدم في تطبيقات إيثيريوم — لا توجد كلمات مرور، فقط محافظ وتوقيعات.
lang: ar
---

إذا كنت قادمًا من تطوير الويب التقليدي، فأنت معتاد على تسجيل الدخول باستخدام اسم المستخدم/كلمة المرور، وتدفقات <span dir="ltr">OAuth</span>، وملفات تعريف ارتباط الجلسة. تعمل المصادقة على إيثيريوم بشكل مختلف — وبطرق عديدة، بشكل أبسط.

على إيثيريوم، يثبت المستخدم هويته من خلال **توقيع رسالة باستخدام محفظته**. لا توجد كلمة مرور لتخزينها. لا توجد قاعدة بيانات لبيانات الاعتماد يمكن تسريبها. فقط علم التشفير.

## كيف تختلف عن ويب 2؟ {#how-is-it-different}

| ويب 2 | إيثيريوم |
| --------------------------------- | ------------------------------------------------ |
| اسم المستخدم + كلمة المرور | عنوان المحفظة + توقيع |
| الخادم يخزن بيانات الاعتماد | المستخدم يحتفظ بمفتاح خاص |
| تدار الجلسات بواسطة ملفات تعريف الارتباط / <span dir="ltr">JWT</span> | تبدأ الجلسات بتوقيع محفظة خارج السلسلة |
| "تسجيل الدخول باستخدام <span dir="ltr">Google</span>" | "تسجيل الدخول باستخدام إيثيريوم" |
| تدفقات إعادة تعيين كلمة المرور | استعادة عبارة الاسترداد |

التحول الأساسي: في ويب 2، يقوم خادم مركزي بمصادقتك. على إيثيريوم، **أنت تصادق نفسك** من خلال إثبات أنك تتحكم في عنوان معين — ويمكن لأي شخص التحقق من ذلك بشكل مستقل.

## المتطلبات الأساسية {#prerequisites}

تأكد من فهمك لما يلي:

- [حسابات إيثيريوم وكيفية عملها](/developers/docs/accounts/)
- [ما هي المحفظة وكيفية توصيلها](/wallets/)
- [أساسيات علم التشفير بالمفتاح العام والخاص](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## كيف تعمل المصادقة القائمة على المحفظة {#how-wallet-auth-works}

التدفق الأساسي بسيط:

1. **يطلب تطبيقك اللامركزي (dapp) من المستخدم توصيل محفظته** (عبر ميتاماسك، <span dir="ltr">Rainbow</span>، <span dir="ltr">WalletConnect</span>، إلخ.)
2. **تشارك المحفظة عنوان إيثيريوم الخاص بالمستخدم** - هذا هو معرفهم العام
3. **ينشئ تطبيقك اللامركزي رسالة فريدة** (رقم فريد أو تحدي)
4. **يوقع المستخدم الرسالة** باستخدام مفتاحه الخاص (يحدث داخل المحفظة)
5. **تتحقق الواجهة الخلفية الخاصة بك من التوقيع** مقابل العنوان المطالب به
6. **إذا كان صالحًا، تتم مصادقة المستخدم**

لم يتم كتابة أو تخزين أو نقل أي كلمة مرور على الإطلاق.

## تسجيل الدخول باستخدام إيثيريوم (<span dir="ltr">EIP-4361</span>) {#sign-in-with-ethereum}

يحدد [<span dir="ltr">EIP-4361</span>](https://eips.ethereum.org/EIPS/eip-4361) تنسيق رسالة قياسي لتسجيل الدخول إلى إيثيريوم، والذي يُطلق عليه عادةً **<span dir="ltr">SIWE</span>** (تسجيل الدخول باستخدام إيثيريوم). إنه يستبدل توقيع الرسائل المخصص بمعيار منظم وآمن.

تبدو رسالة <span dir="ltr">SIWE</span> هكذا:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

الميزات الرئيسية لـ <span dir="ltr">SIWE</span>:

- **ربط النطاق** - تتضمن الرسالة النطاق، مما يمنع التصيد الاحتيالي
- **معرف السلسلة** - يحدد الشبكة التي يكون التوقيع صالحًا لها
- **رقم فريد** - يمنع هجمات إعادة التشغيل
- **انتهاء الصلاحية** - طابع زمني اختياري يحد من نافذة الصلاحية
- **الموارد** - معرفات موارد موحدة (<span dir="ltr">URIs</span>) اختيارية للوصول المحدد النطاق

### مكتبات <span dir="ltr">SIWE</span> {#siwe-libraries}

- **[<span dir="ltr">siwe</span>](https://github.com/spruceid/siwe)** - تطبيق <span dir="ltr">TypeScript</span> الرسمي بواسطة <span dir="ltr">Spruce</span>
- **[<span dir="ltr">siwe-rs</span>](https://github.com/spruceid/siwe-rs)** - تطبيق <span dir="ltr">Rust</span>
- **[<span dir="ltr">siwe-go</span>](https://github.com/spruceid/siwe-go)** - تطبيق <span dir="ltr">Go</span>

### مثال: تسجيل الدخول من جانب العميل باستخدام <span dir="ltr">siwe</span> {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. احصل على رقم فريد من الواجهة الخلفية
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. أنشئ ووقّع رسالة SIWE
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. أرسل إلى الواجهة الخلفية للتحقق
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### مثال: التحقق من جانب الخادم (<span dir="ltr">Node.js</span>) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// أصدر رقمًا فريدًا وخزنه في الجلسة حتى يتمكن /verify من التحقق منه لاحقًا
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address هو عنوان إيثيريوم الذي تم التحقق منه
      // أنشئ جلسة أو JWT للمستخدم
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## مكتبات توصيل المحفظة {#wallet-connection-libraries}

قبل المصادقة، تحتاج إلى أن يقوم المستخدم بتوصيل محفظته. هذه المكتبات تجعل الأمر سهلاً:

- **[<span dir="ltr">RainbowKit</span>](https://www.rainbowkit.com/)** - مكون <span dir="ltr">React</span> جاهز للاستخدام مع واجهة مستخدم جميلة
- **[<span dir="ltr">ConnectKit</span>](https://docs.family.co/connectkit)** - نافذة منبثقة جاهزة لتوصيل المحفظة
- **[<span dir="ltr">AppKit</span> (<span dir="ltr">WalletConnect</span>)](https://reown.com/appkit)** - توصيل محفظة متعددة السلاسل مع <span dir="ltr">SIWE</span> مدمج
- **[<span dir="ltr">Wagmi</span>](https://wagmi.sh)** - مكتبة <span dir="ltr">React Hooks</span> مع `useAccount`، `useConnect`

## التحقق من التوقيعات يدويًا {#verifying-manually}

إذا كنت تفضل عدم استخدام <span dir="ltr">SIWE</span>، يمكنك التحقق من التوقيعات مباشرة:

```ts
import { verifyMessage } from 'ethers'

// الرسالة التي وقّعها المستخدم
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// استرد عنوان الموقّع من التوقيع
const recoveredAddress = verifyMessage(message, signature)

// قارن مع العنوان المُدّعى
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // نجحت المصادقة
}
```

### ملاحظات أمنية هامة {#security-notes}

- **استخدم دائمًا رقم فريد** - يمنع هجمات إعادة التشغيل حيث يتم إعادة استخدام توقيع قديم
- **قم بتضمين النطاق** - يمنع التوقيعات من أن تكون صالحة عبر مواقع مختلفة
- **تحقق من انتهاء الصلاحية** - يجب أن يكون للتوقيعات نافذة صلاحية محدودة
- **استخدم <span dir="ltr">SIWE</span> (<span dir="ltr">EIP-4361</span>) كلما أمكن ذلك** - فهو يتعامل مع كل ما سبق نيابة عنك
- **لا تكشف أبدًا عن المفاتيح الخاصة** - يحدث التوقيع داخل المحفظة؛ تطبيقك يرى النتيجة فقط

## إدارة الجلسات {#session-management}

بمجرد المصادقة، لا تزال بحاجة إلى جلسات — تمامًا مثل ويب 2. الأنماط الشائعة:

- **رموز <span dir="ltr">JWT</span>** - إصدار <span dir="ltr">JWT</span> بعد التحقق من التوقيع، واستخدامه لطلبات <span dir="ltr">API</span>
- **جلسات من جانب الخادم** - تخزين العنوان الذي تم التحقق منه في ملف تعريف ارتباط الجلسة
- **<span dir="ltr">SIWE</span> مع الموارد** - تحديد رموز وصول محددة النطاق مرتبطة بمعرفات موارد موحدة (<span dir="ltr">URIs</span>) محددة

الاختلاف الرئيسي عن ويب 2: عنوان إيثيريوم الخاص بالمستخدم هو هويته الدائمة. يمكنهم استخدامه عبر أي تطبيق لامركزي (dapp) دون إنشاء حساب جديد.

## هوية لامركزية {#decentralized-identity}

تعد مصادقة إيثيريوم جزءًا من حركة أوسع نحو **الهوية السيادية الذاتية**. تشمل المعايير والمشاريع في هذا المجال:

- **[خدمة أسماء إيثيريوم (<span dir="ltr">ENS</span>)](https://ens.domains/)** - أسماء قابلة للقراءة بواسطة الإنسان (مثل، `vitalik.eth`) والتي تُترجم إلى عناوين
- **[خدمة تصديق إيثيريوم (<span dir="ltr">EAS</span>)](https://attest.org/)** - تصديقات على السلسلة حول الهوية وبيانات الاعتماد
- **[معرفات لامركزية من <span dir="ltr">W3C</span> (<span dir="ltr">DIDs</span>)](https://www.w3.org/TR/did-core/)** - معيار عالمي لهوية لامركزية قابلة للتحقق
- **[شبكة <span dir="ltr">Ceramic</span>](https://ceramic.network/)** - تدفقات بيانات لامركزية مرتبطة بهوية لامركزية (<span dir="ltr">DID</span>)

## قراءة إضافية {#further-reading}

- [<span dir="ltr">EIP-4361</span>: تسجيل الدخول باستخدام إيثيريوم](https://eips.ethereum.org/EIPS/eip-4361)
- [وثائق <span dir="ltr">SIWE</span>](https://docs.login.xyz/)
- [تسجيل الدخول باستخدام إيثيريوم على <span dir="ltr">Auth0</span>](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [وثائق مصادقة <span dir="ltr">Reown AppKit</span>](https://docs.reown.com/appkit/authentication)
- [وثائق <span dir="ltr">ENS</span>](https://docs.ens.domains/)

## مواضيع ذات صلة {#related-topics}

- [حسابات إيثيريوم](/developers/docs/accounts/)
- [مكتبات <span dir="ltr">API</span> لـ <span dir="ltr">JavaScript</span>](/developers/docs/apis/javascript/)
- [مكتبات <span dir="ltr">API</span> للواجهة الخلفية](/developers/docs/apis/backend/)
- [المحافظ](/wallets/)