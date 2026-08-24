---
title: इथेरियम पर प्रमाणीकरण
description: जानें कि इथेरियम एप्लिकेशन में उपयोगकर्ता प्रमाणीकरण कैसे काम करता है—कोई पासवर्ड नहीं, केवल वॉलेट और हस्ताक्षर।
lang: hi
---

यदि आप पारंपरिक वेब डेवलपमेंट से आ रहे हैं, तो आप यूज़रनेम/पासवर्ड लॉगिन, OAuth फ़्लो और सेशन कुकीज़ के अभ्यस्त होंगे। इथेरियम पर प्रमाणीकरण अलग तरीके से काम करता है—और कई मायनों में, अधिक सरलता से।

इथेरियम पर, एक उपयोगकर्ता **अपने वॉलेट से एक संदेश पर हस्ताक्षर करके** अपनी पहचान साबित करता है। स्टोर करने के लिए कोई पासवर्ड नहीं। लीक होने के लिए क्रेडेंशियल्स का कोई डेटाबेस नहीं। बस क्रिप्टोग्राफी।

## यह वेब2 से कैसे अलग है? {#how-is-it-different}

| वेब2 | इथेरियम |
| --------------------------------- | ------------------------------------------------ |
| यूज़रनेम + पासवर्ड | वॉलेट पता + हस्ताक्षर |
| सर्वर क्रेडेंशियल्स स्टोर करता है | उपयोगकर्ता के पास निजी कुंजी होती है |
| कुकीज़ / JWT द्वारा प्रबंधित सेशन | सेशन एक ऑफचेन वॉलेट हस्ताक्षर के साथ शुरू होते हैं |
| "Sign in with Google" | "Sign in with Ethereum" |
| पासवर्ड रीसेट फ़्लो | बीज वाक्यांश रिकवरी |

मूलभूत बदलाव: वेब2 में, एक केंद्रीकृत सर्वर आपको प्रमाणित करता है। इथेरियम पर, **आप स्वयं को प्रमाणित करते हैं** यह साबित करके कि आप एक विशिष्ट पते को नियंत्रित करते हैं—और कोई भी इसे स्वतंत्र रूप से सत्यापित कर सकता है।

## पूर्वापेक्षाएँ {#prerequisites}

सुनिश्चित करें कि आप समझते हैं:

- [इथेरियम खाते और वे कैसे काम करते हैं](/developers/docs/accounts/)
- [वॉलेट क्या है और इसे कैसे कनेक्ट करें](/wallets/)
- [सार्वजनिक-निजी कुंजी क्रिप्टोग्राफी की मूल बातें](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## वॉलेट-आधारित प्रमाणीकरण कैसे काम करता है {#how-wallet-auth-works}

मुख्य फ़्लो सरल है:

1. **आपका विकेंद्रीकृत एप्लिकेशन (dapp) उपयोगकर्ता को अपना वॉलेट कनेक्ट करने के लिए कहता है** (मेटामास्क, Rainbow, WalletConnect आदि के माध्यम से)
2. **वॉलेट उपयोगकर्ता का इथेरियम पता साझा करता है** - यह उनका सार्वजनिक पहचानकर्ता है
3. **आपका dapp एक अद्वितीय संदेश उत्पन्न करता है** (एक नॉन्स या चुनौती)
4. **उपयोगकर्ता अपनी निजी कुंजी के साथ संदेश पर हस्ताक्षर करता है** (यह वॉलेट के अंदर होता है)
5. **आपका बैकएंड दावा किए गए पते के विरुद्ध हस्ताक्षर को सत्यापित करता है**
6. **यदि यह मान्य है, तो उपयोगकर्ता प्रमाणित हो जाता है**

कोई पासवर्ड कभी टाइप, स्टोर या ट्रांसमिट नहीं किया गया।

## इथेरियम के साथ साइन-इन (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) इथेरियम साइन-इन के लिए एक मानक संदेश प्रारूप को परिभाषित करता है, जिसे आमतौर पर **SIWE** (Sign-In with Ethereum) कहा जाता है। यह तदर्थ (ad-hoc) संदेश हस्ताक्षर करने की प्रक्रिया को एक संरचित, सुरक्षित मानक से बदल देता है।

एक SIWE संदेश इस तरह दिखता है:

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

SIWE की मुख्य विशेषताएं:

- **डोमेन बाइंडिंग** - संदेश में डोमेन शामिल होता है, जो फ़िशिंग को रोकता है
- **चेन आईडी** - निर्दिष्ट करता है कि हस्ताक्षर किस नेटवर्क के लिए मान्य है
- **नॉन्स** - रीप्ले हमलों को रोकता है
- **समाप्ति (Expiration)** - वैधता विंडो को सीमित करने वाला वैकल्पिक टाइमस्टैम्प
- **संसाधन (Resources)** - स्कोप्ड एक्सेस के लिए वैकल्पिक URI

### SIWE लाइब्रेरी {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruce द्वारा आधिकारिक TypeScript कार्यान्वयन
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust कार्यान्वयन
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go कार्यान्वयन

### उदाहरण: siwe के साथ क्लाइंट-साइड साइन-इन {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. अपने बैकएंड से एक नॉन्स प्राप्त करें
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE संदेश बनाएं और उस पर हस्ताक्षर करें
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

  // 3. सत्यापन के लिए बैकएंड पर भेजें
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### उदाहरण: सर्वर-साइड सत्यापन (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// एक नॉन्स जारी करें और इसे सत्र में सहेजें ताकि /verify बाद में इसकी जांच कर सके
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
      // data.address सत्यापित इथेरियम पता है
      // उपयोगकर्ता के लिए एक सत्र या JWT बनाएं
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## वॉलेट कनेक्शन लाइब्रेरी {#wallet-connection-libraries}

प्रमाणित करने से पहले, आपको उपयोगकर्ता को अपना वॉलेट कनेक्ट करने की आवश्यकता होती है। ये लाइब्रेरी इसे आसान बनाती हैं:

- **[RainbowKit](https://www.rainbowkit.com/)** - सुंदर UI के साथ उपयोग के लिए तैयार React घटक
- **[ConnectKit](https://docs.family.co/connectkit)** - ड्रॉप-इन वॉलेट कनेक्शन मोडल
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - अंतर्निहित SIWE के साथ मल्टीचेन वॉलेट कनेक्शन
- **[wagmi](https://wagmi.sh)** - `useAccount`, `useConnect` के साथ React Hooks लाइब्रेरी

## मैन्युअल रूप से हस्ताक्षर सत्यापित करना {#verifying-manually}

यदि आप SIWE का उपयोग नहीं करना चाहते हैं, तो आप सीधे हस्ताक्षर सत्यापित कर सकते हैं:

```ts
import { verifyMessage } from 'ethers'

// वह संदेश जिस पर उपयोगकर्ता ने हस्ताक्षर किए
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// हस्ताक्षर से हस्ताक्षरकर्ता का पता पुनर्प्राप्त करें
const recoveredAddress = verifyMessage(message, signature)

// दावा किए गए पते के साथ तुलना करें
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // प्रमाणीकरण सफल
}
```

### महत्वपूर्ण सुरक्षा नोट्स {#security-notes}

- **हमेशा एक नॉन्स का उपयोग करें** - रीप्ले हमलों को रोकता है जहां एक पुराने हस्ताक्षर का पुन: उपयोग किया जाता है
- **डोमेन शामिल करें** - हस्ताक्षरों को विभिन्न साइटों पर मान्य होने से रोकता है
- **समाप्ति की जांच करें** - हस्ताक्षरों की एक सीमित वैधता विंडो होनी चाहिए
- **जब संभव हो SIWE (EIP-4361) का उपयोग करें** - यह आपके लिए उपरोक्त सभी को संभालता है
- **निजी कुंजी को कभी उजागर न करें** - हस्ताक्षर वॉलेट के अंदर होता है; आपका ऐप केवल परिणाम देखता है

## सेशन प्रबंधन {#session-management}

एक बार प्रमाणित होने के बाद, आपको अभी भी सेशन की आवश्यकता होती है—बिल्कुल वेब2 की तरह। सामान्य पैटर्न:

- **JWT टोकन** - हस्ताक्षर सत्यापित करने के बाद एक JWT जारी करें, API अनुरोधों के लिए उपयोग करें
- **सर्वर-साइड सेशन** - सत्यापित पते को सेशन कुकी में स्टोर करें
- **संसाधनों के साथ SIWE** - विशिष्ट URI से जुड़े स्कोप्ड एक्सेस टोकन परिभाषित करें

वेब2 से मुख्य अंतर: उपयोगकर्ता का इथेरियम पता उनकी स्थायी पहचान है। वे नया खाता बनाए बिना किसी भी dapp पर इसका उपयोग कर सकते हैं।

## विकेंद्रीकृत पहचान {#decentralized-identity}

इथेरियम प्रमाणीकरण **स्व-संप्रभु पहचान (self-sovereign identity)** की दिशा में एक व्यापक आंदोलन का हिस्सा है। इस क्षेत्र में मानक और प्रोजेक्ट शामिल हैं:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - मानव-पठनीय नाम (जैसे, `vitalik.eth`) जो पतों में रिज़ॉल्व होते हैं
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - पहचान और क्रेडेंशियल्स के बारे में ऑनचेन अनुप्रमाणन
- **[W3C विकेंद्रीकृत पहचानकर्ता (DIDs)](https://www.w3.org/TR/did-core/)** - सत्यापन योग्य विकेंद्रीकृत पहचान के लिए वैश्विक मानक
- **[Ceramic Network](https://ceramic.network/)** - एक DID से जुड़े विकेंद्रीकृत डेटा स्ट्रीम

## आगे की पढ़ाई {#further-reading}

- [EIP-4361: इथेरियम के साथ साइन-इन](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE दस्तावेज़](https://docs.login.xyz/)
- [Auth0 पर इथेरियम के साथ साइन-इन](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit प्रमाणीकरण दस्तावेज़](https://docs.reown.com/appkit/authentication)
- [ENS दस्तावेज़](https://docs.ens.domains/)

## संबंधित विषय {#related-topics}

- [इथेरियम खाते](/developers/docs/accounts/)
- [JavaScript API लाइब्रेरी](/developers/docs/apis/javascript/)
- [बैकएंड API लाइब्रेरी](/developers/docs/apis/backend/)
- [वॉलेट](/wallets/)