---
title: इथेरियमवरील प्रमाणीकरण
description: इथेरियम ॲप्लिकेशन्समध्ये वापरकर्ता प्रमाणीकरण कसे कार्य करते ते जाणून घ्या—कोणतेही पासवर्ड नाहीत, फक्त वॉलेट्स आणि स्वाक्षऱ्या.
lang: mr
---

जर तुम्ही पारंपारिक वेब डेव्हलपमेंटमधून येत असाल, तर तुम्हाला युझरनेम/पासवर्ड लॉगिन, OAuth फ्लो आणि सेशन कुकीजची सवय असेल. इथेरियमवरील प्रमाणीकरण वेगळ्या प्रकारे कार्य करते—आणि अनेक प्रकारे, अधिक सोपे आहे.

इथेरियमवर, वापरकर्ता **त्यांच्या वॉलेटने संदेशावर स्वाक्षरी करून** त्यांची ओळख सिद्ध करतो. संचयित करण्यासाठी कोणताही पासवर्ड नाही. लीक होण्यासाठी क्रेडेन्शियल्सचा कोणताही डेटाबेस नाही. फक्त गूढलेखन.

## हे वेब2 पेक्षा वेगळे कसे आहे? {#how-is-it-different}

| वेब2                              | इथेरियम                                         |
| --------------------------------- | ------------------------------------------------ |
| युझरनेम + पासवर्ड               | वॉलेट पत्ता + स्वाक्षरी                       |
| सर्व्हर क्रेडेन्शियल्स संचयित करतो         | वापरकर्त्याकडे खाजगी की असते                           |
| कुकीज / JWT द्वारे व्यवस्थापित सेशन्स | सेशन्स साखळीबाह्य वॉलेट स्वाक्षरीने सुरू होतात |
| "Google ने साइन इन करा"             | "इथेरियमने साइन इन करा"                          |
| पासवर्ड रीसेट फ्लो              | बीज वाक्य पुनर्प्राप्ती                             |

मूलभूत बदल: वेब2 मध्ये, एक केंद्रित सर्व्हर तुम्हाला प्रमाणित करतो. इथेरियमवर, तुम्ही एका विशिष्ट पत्त्यावर तुमचे नियंत्रण असल्याचे सिद्ध करून **स्वतःला प्रमाणित करता**—आणि कोणीही त्याची स्वतंत्रपणे पडताळणी करू शकते.

## पूर्वतयारी {#prerequisites}

तुम्हाला खालील गोष्टी समजल्या आहेत याची खात्री करा:

- [इथेरियम खाती आणि ती कशी कार्य करतात](/developers/docs/accounts/)
- [वॉलेट म्हणजे काय आणि ते कसे कनेक्ट करावे](/wallets/)
- [सार्वजनिक-खाजगी की गूढलेखनाच्या मूलभूत गोष्टी](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## वॉलेट-आधारित प्रमाणीकरण कसे कार्य करते {#how-wallet-auth-works}

मुख्य फ्लो सोपा आहे:

1. **तुमचे विकेंद्रित ॲप्लिकेशन (dapp) वापरकर्त्याला त्यांचे वॉलेट कनेक्ट करण्यास सांगते** (मेटामास्क, Rainbow, WalletConnect, इत्यादीद्वारे)
2. **वॉलेट वापरकर्त्याचा इथेरियम पत्ता शेअर करते** - हा त्यांचा सार्वजनिक आयडेंटिफायर आहे
3. **तुमचे dapp एक युनिक संदेश तयार करते** (एक नॉन्स किंवा चॅलेंज)
4. **वापरकर्ता त्यांच्या खाजगी की ने संदेशावर स्वाक्षरी करतो** (हे वॉलेटच्या आत होते)
5. **तुमचा बॅकएंड दाव्याच्या पत्त्यावर स्वाक्षरीची पडताळणी करतो**
6. **जर वैध असेल, तर वापरकर्ता प्रमाणित होतो**

कोणताही पासवर्ड कधीही टाइप केला गेला नाही, संचयित केला गेला नाही किंवा प्रसारित केला गेला नाही.

## इथेरियमने साइन-इन करा (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) इथेरियम साइन-इनसाठी एक मानक संदेश फॉरमॅट परिभाषित करते, ज्याला सामान्यतः **SIWE** (Sign-In with Ethereum) म्हटले जाते. हे ॲड-हॉक संदेश स्वाक्षरीला एका संरचित, सुरक्षित मानकाने बदलते.

SIWE संदेश असा दिसतो:

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

SIWE ची प्रमुख वैशिष्ट्ये:

- **डोमेन बाइंडिंग** - संदेशामध्ये डोमेन समाविष्ट असते, ज्यामुळे फिशिंगला प्रतिबंध होतो
- **चेन आयडी (Chain ID)** - स्वाक्षरी कोणत्या नेटवर्कसाठी वैध आहे हे निर्दिष्ट करते
- **नॉन्स** - रिप्ले हल्ल्यांना प्रतिबंध करते
- **एक्सपायरेशन** - वैधतेची वेळ मर्यादित करणारा पर्यायी टाइमस्टॅम्प
- **संसाधने (Resources)** - स्कोप्ड ॲक्सेससाठी पर्यायी URIs

### SIWE लायब्ररी {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruce द्वारे अधिकृत TypeScript अंमलबजावणी
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust अंमलबजावणी
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go अंमलबजावणी

### उदाहरण: siwe सह क्लायंट-साइड साइन-इन {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. तुमच्या बॅकएंडकडून नॉन्स मिळवा
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE संदेश तयार करा आणि त्यावर स्वाक्षरी करा
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

  // 3. पडताळणीसाठी बॅकएंडला पाठवा
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### उदाहरण: सर्व्हर-साइड पडताळणी (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// नॉन्स जारी करा आणि ते सेशनमध्ये साठवा जेणेकरून /verify नंतर त्याची तपासणी करू शकेल
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
      // data.address हा पडताळलेला इथेरियम पत्ता आहे
      // वापरकर्त्यासाठी सेशन किंवा JWT तयार करा
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## वॉलेट कनेक्शन लायब्ररी {#wallet-connection-libraries}

प्रमाणीकरण करण्यापूर्वी, तुम्हाला वापरकर्त्याने त्यांचे वॉलेट कनेक्ट करणे आवश्यक आहे. या लायब्ररी हे सोपे करतात:

- **[RainbowKit](https://www.rainbowkit.com/)** - सुंदर UI सह वापरण्यासाठी तयार असलेला React घटक
- **[ConnectKit](https://docs.family.co/connectkit)** - ड्रॉप-इन वॉलेट कनेक्शन मोडल
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - अंगभूत SIWE सह मल्टीचेन वॉलेट कनेक्शन
- **[Wagmi](https://wagmi.sh)** - `useAccount`, `useConnect` सह React Hooks लायब्ररी

## स्वाक्षऱ्यांची मॅन्युअली पडताळणी करणे {#verifying-manually}

जर तुम्हाला SIWE वापरायचे नसेल, तर तुम्ही थेट स्वाक्षऱ्यांची पडताळणी करू शकता:

```ts
import { verifyMessage } from 'ethers'

// वापरकर्त्याने स्वाक्षरी केलेला संदेश
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// स्वाक्षरीवरून स्वाक्षरीकर्त्याचा पत्ता पुनर्प्राप्त करा
const recoveredAddress = verifyMessage(message, signature)

// दावा केलेल्या पत्त्याशी तुलना करा
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // प्रमाणीकरण यशस्वी
}
```

### महत्त्वाच्या सुरक्षा नोंदी {#security-notes}

- **नेहमी नॉन्स वापरा** - रिप्ले हल्ल्यांना प्रतिबंध करते जिथे जुनी स्वाक्षरी पुन्हा वापरली जाते
- **डोमेन समाविष्ट करा** - स्वाक्षऱ्यांना वेगवेगळ्या साइट्सवर वैध होण्यापासून प्रतिबंधित करते
- **एक्सपायरेशन तपासा** - स्वाक्षऱ्यांची वैधता वेळ मर्यादित असावी
- **शक्य असेल तेव्हा SIWE (EIP-4361) वापरा** - हे तुमच्यासाठी वरील सर्व गोष्टी हाताळते
- **खाजगी की कधीही उघड करू नका** - स्वाक्षरी वॉलेटच्या आत होते; तुमचे ॲप फक्त परिणाम पाहते

## सेशन व्यवस्थापन {#session-management}

एकदा प्रमाणित झाल्यानंतर, तुम्हाला अजूनही सेशन्सची आवश्यकता असते—अगदी वेब2 प्रमाणे. सामान्य पॅटर्न:

- **JWT टोकन्स** - स्वाक्षरीची पडताळणी केल्यानंतर JWT जारी करा, API विनंत्यांसाठी वापरा
- **सर्व्हर-साइड सेशन्स** - पडताळणी केलेला पत्ता सेशन कुकीमध्ये संचयित करा
- **संसाधनांसह SIWE** - विशिष्ट URIs शी लिंक केलेले स्कोप्ड ॲक्सेस टोकन्स परिभाषित करा

वेब2 मधील मुख्य फरक: वापरकर्त्याचा इथेरियम पत्ता ही त्यांची कायमस्वरूपी ओळख असते. ते नवीन खाते न बनवता कोणत्याही dapp वर त्याचा वापर करू शकतात.

## विकेंद्रित ओळख {#decentralized-identity}

इथेरियम प्रमाणीकरण हे **स्वयं-सार्वभौम ओळख (self-sovereign identity)** च्या दिशेने एका व्यापक चळवळीचा भाग आहे. या क्षेत्रातील मानके आणि प्रकल्पांमध्ये हे समाविष्ट आहे:

- **[इथेरियम नेम सर्व्हिस (ENS)](https://ens.domains/)** - मानवांना वाचता येणारी नावे (उदा., `vitalik.eth`) जी पत्त्यांवर रिझॉल्व्ह होतात
- **[इथेरियम ॲटेस्टेशन सर्व्हिस (EAS)](https://attest.org/)** - ओळख आणि क्रेडेन्शियल्सबद्दल ऑनचेन साक्षांकन
- **[W3C विकेंद्रित आयडेंटिफायर्स (DIDs)](https://www.w3.org/TR/did-core/)** - पडताळणी करण्यायोग्य विकेंद्रित ओळखीसाठी जागतिक मानक
- **[Ceramic नेटवर्क](https://ceramic.network/)** - DID शी जोडलेले विकेंद्रित डेटा स्ट्रीम्स

## पुढील वाचन {#further-reading}

- [EIP-4361: इथेरियमने साइन-इन करा](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE दस्तऐवजीकरण](https://docs.login.xyz/)
- [Auth0 वर इथेरियमने साइन-इन करा](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit प्रमाणीकरण दस्तऐवजीकरण](https://docs.reown.com/appkit/authentication)
- [ENS दस्तऐवजीकरण](https://docs.ens.domains/)

## संबंधित विषय {#related-topics}

- [इथेरियम खाती](/developers/docs/accounts/)
- [JavaScript API लायब्ररी](/developers/docs/apis/javascript/)
- [बॅकएंड API लायब्ररी](/developers/docs/apis/backend/)
- [वॉलेट्स](/wallets/)