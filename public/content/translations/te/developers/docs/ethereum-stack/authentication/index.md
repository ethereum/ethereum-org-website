---
title: ఎథీరియంపై ప్రామాణీకరణ
description: ఎథీరియం అప్లికేషన్‌లలో వినియోగదారు ప్రామాణీకరణ ఎలా పనిచేస్తుందో తెలుసుకోండి—పాస్‌వర్డ్‌లు లేవు, కేవలం వాలెట్‌లు మరియు సంతకాలు మాత్రమే.
lang: te
---

మీరు సాంప్రదాయ వెబ్ డెవలప్‌మెంట్ నుండి వస్తున్నట్లయితే, మీరు యూజర్‌నేమ్/పాస్‌వర్డ్ లాగిన్, OAuth ఫ్లోలు మరియు సెషన్ కుక్కీలకు అలవాటు పడి ఉంటారు. ఎథీరియంపై ప్రామాణీకరణ భిన్నంగా పనిచేస్తుంది—మరియు అనేక విధాలుగా, మరింత సులభంగా ఉంటుంది.

ఎథీరియంపై, ఒక వినియోగదారు **తమ వాలెట్‌తో ఒక సందేశంపై సంతకం చేయడం** ద్వారా తమ గుర్తింపును నిరూపించుకుంటారు. నిల్వ చేయడానికి పాస్‌వర్డ్ లేదు. లీక్ కావడానికి ఆధారాల డేటాబేస్ లేదు. కేవలం గూఢలిపి శాస్త్రం మాత్రమే.

## ఇది వెబ్2కి ఎలా భిన్నంగా ఉంటుంది? {#how-is-it-different}

| వెబ్2                              | ఎథీరియం                                         |
| --------------------------------- | ------------------------------------------------ |
| యూజర్‌నేమ్ + పాస్‌వర్డ్               | వాలెట్ చిరునామా + సంతకం                       |
| సర్వర్ ఆధారాలను నిల్వ చేస్తుంది         | వినియోగదారు ప్రైవేట్ కీని కలిగి ఉంటారు                           |
| కుక్కీలు / JWT ద్వారా సెషన్‌లు నిర్వహించబడతాయి | ఆఫ్‌చైన్ వాలెట్ సంతకంతో సెషన్‌లు ప్రారంభమవుతాయి |
| "Googleతో సైన్ ఇన్ చేయండి"             | "ఎథీరియంతో సైన్ ఇన్ చేయండి"                          |
| పాస్‌వర్డ్ రీసెట్ ఫ్లోలు              | బీజ పదబంధం రికవరీ                             |

ప్రాథమిక మార్పు: వెబ్2లో, కేంద్రీకృత సర్వర్ మిమ్మల్ని ప్రామాణీకరిస్తుంది. ఎథీరియంపై, మీరు ఒక నిర్దిష్ట చిరునామాను నియంత్రిస్తున్నారని నిరూపించడం ద్వారా **మిమ్మల్ని మీరే ప్రామాణీకరించుకుంటారు**—మరియు ఎవరైనా దానిని స్వతంత్రంగా ధృవీకరించవచ్చు.

## ముందస్తు అవసరాలు {#prerequisites}

మీరు వీటిని అర్థం చేసుకున్నారని నిర్ధారించుకోండి:

- [ఎథీరియం ఖాతాలు మరియు అవి ఎలా పనిచేస్తాయి](/developers/docs/accounts/)
- [వాలెట్ అంటే ఏమిటి మరియు దానిని ఎలా కనెక్ట్ చేయాలి](/wallets/)
- [పబ్లిక్-ప్రైవేట్ కీ గూఢలిపి శాస్త్రం ప్రాథమిక అంశాలు](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## వాలెట్ ఆధారిత ప్రామాణీకరణ ఎలా పనిచేస్తుంది {#how-wallet-auth-works}

ప్రధాన ఫ్లో సులభం:

1. **మీ వికేంద్రీకృత అప్లికేషన్ (dapp) వినియోగదారుని వారి వాలెట్‌ను కనెక్ట్ చేయమని అడుగుతుంది** (మెటామాస్క్, Rainbow, WalletConnect మొదలైన వాటి ద్వారా)
2. **వాలెట్ వినియోగదారు ఎథీరియం చిరునామాను పంచుకుంటుంది** - ఇది వారి పబ్లిక్ ఐడెంటిఫైయర్
3. **మీ dapp ఒక ప్రత్యేకమైన సందేశాన్ని రూపొందిస్తుంది** (ఒక నాన్స్ లేదా ఛాలెంజ్)
4. **వినియోగదారు తమ ప్రైవేట్ కీతో సందేశంపై సంతకం చేస్తారు** (ఇది వాలెట్ లోపల జరుగుతుంది)
5. **మీ బ్యాకెండ్ క్లెయిమ్ చేసిన చిరునామాకు వ్యతిరేకంగా సంతకాన్ని ధృవీకరిస్తుంది**
6. **చెల్లుబాటు అయితే, వినియోగదారు ప్రామాణీకరించబడతారు**

ఎటువంటి పాస్‌వర్డ్ టైప్ చేయబడలేదు, నిల్వ చేయబడలేదు లేదా ప్రసారం చేయబడలేదు.

## ఎథీరియంతో సైన్ ఇన్ చేయండి (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) ఎథీరియం సైన్-ఇన్ కోసం ఒక ప్రామాణిక సందేశ ఆకృతిని నిర్వచిస్తుంది, దీనిని సాధారణంగా **SIWE** (Sign-In with Ethereum) అని పిలుస్తారు. ఇది తాత్కాలిక సందేశంపై సంతకం చేయడాన్ని నిర్మాణాత్మక, సురక్షితమైన ప్రమాణంతో భర్తీ చేస్తుంది.

SIWE సందేశం ఈ విధంగా కనిపిస్తుంది:

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

SIWE యొక్క ముఖ్య లక్షణాలు:

- **డొమైన్ బైండింగ్** - సందేశంలో డొమైన్ ఉంటుంది, ఇది ఫిషింగ్‌ను నిరోధిస్తుంది
- **చైన్ ID** - సంతకం ఏ నెట్‌వర్క్‌కు చెల్లుబాటు అవుతుందో నిర్దేశిస్తుంది
- **నాన్స్** - రీప్లే దాడులను నిరోధిస్తుంది
- **గడువు ముగింపు** - చెల్లుబాటు విండోను పరిమితం చేసే ఐచ్ఛిక టైమ్‌స్టాంప్
- **వనరులు** - స్కోప్డ్ యాక్సెస్ కోసం ఐచ్ఛిక URIలు

### SIWE లైబ్రరీలు {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruce ద్వారా అధికారిక TypeScript అమలు
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust అమలు
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go అమలు

### ఉదాహరణ: siweతో క్లయింట్-సైడ్ సైన్-ఇన్ {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. మీ బ్యాకెండ్ నుండి నాన్స్ పొందండి
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE సందేశాన్ని సృష్టించి, సంతకం చేయండి
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

  // 3. ధృవీకరణ కోసం బ్యాకెండ్‌కు పంపండి
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### ఉదాహరణ: సర్వర్-సైడ్ ధృవీకరణ (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// నాన్స్‌ను జారీ చేసి, సెషన్‌లో నిల్వ చేయండి, తద్వారా /verify తర్వాత దాన్ని తనిఖీ చేయగలదు
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
      // data.address అనేది ధృవీకరించబడిన ఎథీరియం చిరునామా
      // వినియోగదారు కోసం సెషన్ లేదా JWTని సృష్టించండి
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## వాలెట్ కనెక్షన్ లైబ్రరీలు {#wallet-connection-libraries}

ప్రామాణీకరించడానికి ముందు, వినియోగదారు తమ వాలెట్‌ను కనెక్ట్ చేయాలి. ఈ లైబ్రరీలు దీన్ని సులభతరం చేస్తాయి:

- **[RainbowKit](https://www.rainbowkit.com/)** - అందమైన UIతో ఉపయోగించడానికి సిద్ధంగా ఉన్న React కాంపోనెంట్
- **[ConnectKit](https://docs.family.co/connectkit)** - డ్రాప్-ఇన్ వాలెట్ కనెక్షన్ మోడల్
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - అంతర్నిర్మిత SIWEతో మల్టీచైన్ వాలెట్ కనెక్షన్
- **[Wagmi](https://wagmi.sh)** - `useAccount`, `useConnect`తో React హుక్స్ లైబ్రరీ

## సంతకాలను మాన్యువల్‌గా ధృవీకరించడం {#verifying-manually}

మీరు SIWEని ఉపయోగించకూడదనుకుంటే, మీరు సంతకాలను నేరుగా ధృవీకరించవచ్చు:

```ts
import { verifyMessage } from 'ethers'

// వినియోగదారు సంతకం చేసిన సందేశం
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// సంతకం నుండి సంతకం చేసినవారి చిరునామాను తిరిగి పొందండి
const recoveredAddress = verifyMessage(message, signature)

// క్లెయిమ్ చేసిన చిరునామాతో సరిపోల్చండి
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // ప్రామాణీకరణ విజయవంతమైంది
}
```

### ముఖ్యమైన భద్రతా గమనికలు {#security-notes}

- **ఎల్లప్పుడూ నాన్స్‌ని ఉపయోగించండి** - పాత సంతకాన్ని తిరిగి ఉపయోగించే రీప్లే దాడులను నిరోధిస్తుంది
- **డొమైన్‌ను చేర్చండి** - వేర్వేరు సైట్‌లలో సంతకాలు చెల్లుబాటు కాకుండా నిరోధిస్తుంది
- **గడువు ముగింపును తనిఖీ చేయండి** - సంతకాలకు పరిమిత చెల్లుబాటు విండో ఉండాలి
- **సాధ్యమైనప్పుడు SIWE (EIP-4361)ని ఉపయోగించండి** - ఇది మీ కోసం పైన పేర్కొన్న వాటన్నింటినీ నిర్వహిస్తుంది
- **ప్రైవేట్ కీలను ఎప్పుడూ బహిర్గతం చేయవద్దు** - సంతకం చేయడం వాలెట్ లోపల జరుగుతుంది; మీ యాప్ ఫలితాన్ని మాత్రమే చూస్తుంది

## సెషన్ నిర్వహణ {#session-management}

ప్రామాణీకరించబడిన తర్వాత, వెబ్2 లాగానే మీకు ఇప్పటికీ సెషన్‌లు అవసరం. సాధారణ పద్ధతులు:

- **JWT టోకెన్‌లు** - సంతకాన్ని ధృవీకరించిన తర్వాత JWTని జారీ చేయండి, API అభ్యర్థనల కోసం ఉపయోగించండి
- **సర్వర్-సైడ్ సెషన్‌లు** - ధృవీకరించబడిన చిరునామాను సెషన్ కుక్కీలో నిల్వ చేయండి
- **వనరులతో SIWE** - నిర్దిష్ట URIలకు లింక్ చేయబడిన స్కోప్డ్ యాక్సెస్ టోకెన్‌లను నిర్వచించండి

వెబ్2 నుండి ముఖ్యమైన వ్యత్యాసం: వినియోగదారు ఎథీరియం చిరునామా వారి శాశ్వత గుర్తింపు. వారు కొత్త ఖాతాను సృష్టించకుండానే ఏ dappలోనైనా దీనిని ఉపయోగించవచ్చు.

## వికేంద్రీకృత గుర్తింపు {#decentralized-identity}

ఎథీరియం ప్రామాణీకరణ అనేది **స్వీయ-సార్వభౌమ గుర్తింపు** వైపు విస్తృత ఉద్యమంలో భాగం. ఈ రంగంలోని ప్రమాణాలు మరియు ప్రాజెక్ట్‌లు ఇవి:

- **[ఎథీరియం నేమ్ సర్వీస్ (ENS)](https://ens.domains/)** - చిరునామాలకు పరిష్కరించబడే మానవులు చదవగలిగే పేర్లు (ఉదా., `vitalik.eth`)
- **[ఎథీరియం అటెస్టేషన్ సర్వీస్ (EAS)](https://attest.org/)** - గుర్తింపు మరియు ఆధారాల గురించి ఆన్‌చైన్ ధృవీకరణలు
- **[W3C వికేంద్రీకృత ఐడెంటిఫైయర్‌లు (DIDs)](https://www.w3.org/TR/did-core/)** - ధృవీకరించదగిన వికేంద్రీకృత గుర్తింపు (did) కోసం గ్లోబల్ ప్రమాణం
- **[Ceramic నెట్‌వర్క్](https://ceramic.network/)** - DIDకి కనెక్ట్ చేయబడిన వికేంద్రీకృత డేటా స్ట్రీమ్‌లు

## మరింత చదవడానికి {#further-reading}

- [EIP-4361: ఎథీరియంతో సైన్ ఇన్ చేయండి](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE డాక్యుమెంటేషన్](https://docs.login.xyz/)
- [Auth0లో ఎథీరియంతో సైన్ ఇన్ చేయండి](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit ప్రామాణీకరణ డాక్స్](https://docs.reown.com/appkit/authentication)
- [ENS డాక్యుమెంటేషన్](https://docs.ens.domains/)

## సంబంధిత అంశాలు {#related-topics}

- [ఎథీరియం ఖాతాలు](/developers/docs/accounts/)
- [JavaScript API లైబ్రరీలు](/developers/docs/apis/javascript/)
- [బ్యాకెండ్ API లైబ్రరీలు](/developers/docs/apis/backend/)
- [వాలెట్‌లు](/wallets/)