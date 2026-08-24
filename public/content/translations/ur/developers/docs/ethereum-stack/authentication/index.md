---
title: ایتھیریم پر توثیق
description: جانیں کہ ایتھیریم ایپلی کیشنز میں صارف کی توثیق کیسے کام کرتی ہے—کوئی پاس ورڈ نہیں، صرف والیٹس اور دستخط۔
lang: ur
---

اگر آپ روایتی ویب ڈیولپمنٹ کے پس منظر سے آ رہے ہیں، تو آپ یوزر نیم/پاس ورڈ لاگ ان، <span dir="ltr">OAuth</span> فلو، اور سیشن کوکیز کے عادی ہوں گے۔ ایتھیریم پر توثیق مختلف طریقے سے کام کرتی ہے—اور کئی لحاظ سے، زیادہ سادگی سے۔

ایتھیریم پر، ایک صارف **اپنے والیٹ کے ساتھ ایک پیغام پر دستخط کر کے** اپنی شناخت ثابت کرتا ہے۔ محفوظ کرنے کے لیے کوئی پاس ورڈ نہیں۔ لیک ہونے کے لیے اسناد کا کوئی ڈیٹا بیس نہیں۔ صرف علمِ تشفیر۔

## یہ ویب۲ سے کیسے مختلف ہے؟ {#how-is-it-different}

| ویب۲ | ایتھیریم |
| --- | --- |
| یوزر نیم + پاس ورڈ | والیٹ کا پتہ + دستخط |
| سرور اسناد محفوظ کرتا ہے | صارف کے پاس نجی کلید ہوتی ہے |
| سیشنز کوکیز / <span dir="ltr">JWT</span> کے ذریعے منظم ہوتے ہیں | سیشنز کا آغاز آف چین والیٹ کے دستخط سے ہوتا ہے |
| "گوگل کے ساتھ سائن ان کریں" | "ایتھیریم کے ساتھ سائن ان کریں" |
| پاس ورڈ ری سیٹ کے طریقے | سیڈ فریز کی بحالی |

بنیادی تبدیلی: ویب۲ میں، ایک مرکزی سرور آپ کی توثیق کرتا ہے۔ ایتھیریم پر، **آپ خود اپنی توثیق کرتے ہیں** یہ ثابت کر کے کہ آپ ایک مخصوص پتے کو کنٹرول کرتے ہیں—اور کوئی بھی اسے آزادانہ طور پر تصدیق کر سکتا ہے۔

## پیشگی شرائط {#prerequisites}

یقینی بنائیں کہ آپ سمجھتے ہیں:

- [ایتھیریم اکاؤنٹس اور وہ کیسے کام کرتے ہیں](/developers/docs/accounts/)
- [والیٹ کیا ہے اور اسے کیسے منسلک کیا جائے](/wallets/)
- [پبلک-پرائیویٹ کلید کے علمِ تشفیر کی بنیادی باتیں](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## والیٹ پر مبنی توثیق کیسے کام کرتی ہے {#how-wallet-auth-works}

بنیادی طریقہ کار سادہ ہے:

1. **آپ کی غیر مرکزی ایپلی کیشن (dapp) صارف سے اپنا والیٹ منسلک کرنے کا کہتی ہے** (میٹاماسک، <span dir="ltr">Rainbow</span>، WalletConnect وغیرہ کے ذریعے)
2. **والیٹ صارف کا ایتھیریم پتہ شیئر کرتا ہے** - یہ ان کی عوامی شناخت ہے
3. **آپ کی dapp ایک منفرد پیغام تیار کرتی ہے** (ایک نانس یا چیلنج)
4. **صارف پیغام پر دستخط کرتا ہے** اپنی نجی کلید کے ساتھ (یہ والیٹ کے اندر ہوتا ہے)
5. **آپ کا بیک اینڈ دستخط کی تصدیق کرتا ہے** دعویٰ کردہ پتے کے خلاف
6. **اگر درست ہو، تو صارف کی توثیق ہو جاتی ہے**

کوئی پاس ورڈ کبھی ٹائپ، محفوظ، یا منتقل نہیں کیا گیا۔

## ایتھیریم کے ساتھ سائن ان کریں (<span dir="ltr">EIP-4361</span>) {#sign-in-with-ethereum}

[<span dir="ltr">EIP-4361</span>](https://eips.ethereum.org/EIPS/eip-4361) ایتھیریم سائن ان کے لیے ایک معیاری پیغام کا فارمیٹ متعین کرتا ہے، جسے عام طور پر **SIWE** (ایتھیریم کے ساتھ سائن ان) کہا جاتا ہے۔ یہ غیر منظم پیغام پر دستخط کرنے کے طریقے کو ایک منظم اور محفوظ معیار سے بدل دیتا ہے۔

ایک SIWE پیغام کچھ اس طرح لگتا ہے:

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

SIWE کی اہم خصوصیات:

- **ڈومین بائنڈنگ** - پیغام میں ڈومین شامل ہوتا ہے، جو فشنگ کو روکتا ہے
- **چین آئی ڈی (<span dir="ltr">Chain ID</span>)** - یہ بتاتا ہے کہ دستخط کس نیٹ ورک کے لیے کارآمد ہے
- **نانس** - ری پلے حملوں کو روکتا ہے
- **میعاد کا اختتام** - اختیاری ٹائم اسٹیمپ جو کارآمد ہونے کے وقت کو محدود کرتا ہے
- **وسائل** - محدود رسائی کے لیے اختیاری <span dir="ltr">URIs</span>

### SIWE لائبریریاں {#siwe-libraries}

- **[<span dir="ltr">siwe</span>](https://github.com/spruceid/siwe)** - <span dir="ltr">Spruce</span> کی جانب سے باضابطہ TypeScript عمل درآمد
- **[<span dir="ltr">siwe-rs</span>](https://github.com/spruceid/siwe-rs)** - Rust عمل درآمد
- **[<span dir="ltr">siwe-go</span>](https://github.com/spruceid/siwe-go)** - Go عمل درآمد

### مثال: <span dir="ltr">siwe</span> کے ساتھ کلائنٹ سائیڈ سائن ان {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. اپنے بیک اینڈ سے ایک نانس حاصل کریں
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE پیغام بنائیں اور اس پر دستخط کریں
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

  // 3. تصدیق کے لیے بیک اینڈ کو بھیجیں
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### مثال: سرور سائیڈ تصدیق (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// ایک نانس جاری کریں اور اسے سیشن میں محفوظ کریں تاکہ /verify بعد میں اس کی جانچ کر سکے
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
      // data.address تصدیق شدہ ایتھیریم پتہ ہے
      // صارف کے لیے ایک سیشن یا JWT بنائیں
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## والیٹ کنکشن لائبریریاں {#wallet-connection-libraries}

توثیق کرنے سے پہلے، آپ کو صارف کا والیٹ منسلک کروانے کی ضرورت ہوتی ہے۔ یہ لائبریریاں اسے آسان بناتی ہیں:

- **[RainbowKit](https://www.rainbowkit.com/)** - خوبصورت <span dir="ltr">UI</span> کے ساتھ استعمال کے لیے تیار React جزو
- **[<span dir="ltr">ConnectKit</span>](https://docs.family.co/connectkit)** - ڈراپ ان والیٹ کنکشن موڈل
- **[<span dir="ltr">AppKit</span> (WalletConnect)](https://reown.com/appkit)** - بلٹ ان SIWE کے ساتھ ملٹی چین والیٹ کنکشن
- **[Wagmi](https://wagmi.sh)** - `useAccount` اور `useConnect` کے ساتھ React ہکس لائبریری

## دستی طور پر دستخطوں کی تصدیق کرنا {#verifying-manually}

اگر آپ SIWE استعمال نہیں کرنا چاہتے، تو آپ براہ راست دستخطوں کی تصدیق کر سکتے ہیں:

```ts
import { verifyMessage } from 'ethers'

// وہ پیغام جس پر صارف نے دستخط کیے
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// دستخط سے دستخط کنندہ کا پتہ بازیافت کریں
const recoveredAddress = verifyMessage(message, signature)

// دعویٰ کردہ پتے کے ساتھ موازنہ کریں
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // توثیق کامیاب
}
```

### اہم حفاظتی نوٹس {#security-notes}

- **ہمیشہ ایک نانس استعمال کریں** - یہ ری پلے حملوں کو روکتا ہے جہاں پرانے دستخط کو دوبارہ استعمال کیا جاتا ہے
- **ڈومین شامل کریں** - یہ دستخطوں کو مختلف سائٹس پر کارآمد ہونے سے روکتا ہے
- **میعاد کا اختتام چیک کریں** - دستخطوں کے کارآمد ہونے کا وقت محدود ہونا چاہیے
- **جب ممکن ہو SIWE (<span dir="ltr">EIP-4361</span>) استعمال کریں** - یہ آپ کے لیے مندرجہ بالا تمام چیزوں کو سنبھالتا ہے
- **کبھی بھی نجی کلیدوں کو ظاہر نہ کریں** - دستخط والیٹ کے اندر ہوتا ہے؛ آپ کی ایپ صرف نتیجہ دیکھتی ہے

## سیشن مینجمنٹ {#session-management}

ایک بار توثیق ہو جانے کے بعد، آپ کو اب بھی سیشنز کی ضرورت ہوتی ہے—بالکل ویب۲ کی طرح۔ عام طریقے:

- **<span dir="ltr">JWT</span> ٹوکنز** - دستخط کی تصدیق کے بعد ایک <span dir="ltr">JWT</span> جاری کریں، اسے API درخواستوں کے لیے استعمال کریں
- **سرور سائیڈ سیشنز** - تصدیق شدہ پتے کو سیشن کوکی میں محفوظ کریں
- **وسائل کے ساتھ SIWE** - مخصوص <span dir="ltr">URIs</span> سے منسلک محدود رسائی والے ٹوکنز کی وضاحت کریں

ویب۲ سے کلیدی فرق: صارف کا ایتھیریم پتہ ان کی مستقل شناخت ہے۔ وہ نیا اکاؤنٹ بنائے بغیر اسے کسی بھی غیر مرکزی ایپلی کیشن (dapp) پر استعمال کر سکتے ہیں۔

## غیر مرکزی شناخت {#decentralized-identity}

ایتھیریم کی توثیق خود مختار شناخت کی جانب ایک وسیع تر تحریک کا حصہ ہے۔ اس شعبے میں معیارات اور پروجیکٹس میں شامل ہیں:

- **[ایتھیریم نیم سروس (<span dir="ltr">ENS</span>)](https://ens.domains/)** - انسانوں کے پڑھنے کے قابل نام (جیسے، `vitalik.eth`) جو پتوں میں تبدیل ہوتے ہیں
- **[ایتھیریم اٹیسٹیشن سروس (<span dir="ltr">EAS</span>)](https://attest.org/)** - شناخت اور اسناد کے بارے میں آن چین تصدیق
- **[<span dir="ltr">W3C</span> غیر مرکزی شناخت کار (<span dir="ltr">DIDs</span>)](https://www.w3.org/TR/did-core/)** - قابل تصدیق غیر مرکزی شناخت کے لیے عالمی معیار
- **[سیرامک نیٹ ورک (<span dir="ltr">Ceramic Network</span>)](https://ceramic.network/)** - ایک ڈی آئی ڈی (<span dir="ltr">DID</span>) سے منسلک غیر مرکزی ڈیٹا اسٹریمز

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-4361</span>: ایتھیریم کے ساتھ سائن ان کریں](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE کی دستاویزات](https://docs.login.xyz/)
- [<span dir="ltr">Auth0</span> پر ایتھیریم کے ساتھ سائن ان کریں](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [<span dir="ltr">Reown AppKit</span> توثیق کی دستاویزات](https://docs.reown.com/appkit/authentication)
- [<span dir="ltr">ENS</span> کی دستاویزات](https://docs.ens.domains/)

## متعلقہ موضوعات {#related-topics}

- [ایتھیریم اکاؤنٹس](/developers/docs/accounts/)
- [JavaScript API لائبریریاں](/developers/docs/apis/javascript/)
- [بیک اینڈ API لائبریریاں](/developers/docs/apis/backend/)
- [والیٹس](/wallets/)