---
title: Uthibitishaji kwenye Ethereum
description: Jifunze jinsi uthibitishaji wa mtumiaji unavyofanya kazi katika programu za Ethereum—hakuna nywila, mikoba na sahihi tu.
lang: sw
---

Ikiwa unatoka kwenye uundaji wa wavuti wa kitamaduni, umezoea kuingia kwa kutumia jina la mtumiaji/nywila, mtiririko wa OAuth, na vidakuzi vya kipindi. Uthibitishaji kwenye Ethereum hufanya kazi tofauti—na kwa njia nyingi, kwa urahisi zaidi.

Kwenye Ethereum, mtumiaji huthibitisha utambulisho wake kwa **kusaini ujumbe kwa kutumia mkoba wake**. Hakuna nywila ya kuhifadhi. Hakuna hifadhidata ya vitambulisho inayoweza kuvuja. Kriptografia tu.

## Inatofautiana vipi na Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Jina la mtumiaji + nywila               | Anwani ya mkoba + sahihi                       |
| Seva huhifadhi vitambulisho         | Mtumiaji anashikilia ufunguo wa siri                           |
| Vipindi vinasimamiwa na vidakuzi / JWT | Vipindi huanza na sahihi ya mkoba nje ya mnyororo |
| "Ingia kwa kutumia Google"             | "Ingia kwa kutumia Ethereum"                          |
| Mtiririko wa kuweka upya nywila              | Urejeshaji wa kirai cha mbegu                             |

Mabadiliko ya kimsingi: katika Web2, seva kuu inakuthibitisha. Kwenye Ethereum, **unajithibitisha mwenyewe** kwa kuthibitisha kuwa unadhibiti anwani maalum—na mtu yeyote anaweza kuithibitisha kwa kujitegemea.

## Mahitaji ya awali {#prerequisites}

Hakikisha unaelewa:

- [Akaunti za Ethereum na jinsi zinavyofanya kazi](/developers/docs/accounts/)
- [Mkoba ni nini na jinsi ya kuuunganisha](/wallets/)
- [Misingi ya kriptografia ya ufunguo wa umma na ufunguo wa siri](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Jinsi uthibitishaji unaotegemea mkoba unavyofanya kazi {#how-wallet-auth-works}

Mtiririko wa msingi ni rahisi:

1. **Programu tumizi iliyogatuliwa (dapp) yako inamwomba mtumiaji kuunganisha mkoba wake** (kupitia MetaMask, Rainbow, WalletConnect, n.k.)
2. **Mkoba unashiriki anwani ya Ethereum ya mtumiaji** - hiki ndicho kitambulisho chake cha umma
3. **Dapp yako inazalisha ujumbe wa kipekee** (nonsi au changamoto)
4. **Mtumiaji anasaini ujumbe** kwa kutumia ufunguo wa siri wake (hufanyika ndani ya mkoba)
5. **Mazingira yako ya nyuma (backend) yanathibitisha sahihi** dhidi ya anwani iliyodaiwa
6. **Ikiwa ni halali, mtumiaji anathibitishwa**

Hakuna nywila iliyowahi kuchapwa, kuhifadhiwa, au kusambazwa.

## Kuingia kwa kutumia Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) inafafanua muundo wa ujumbe wa kawaida wa kuingia kwenye Ethereum, unaojulikana sana kama **SIWE** (Sign-In with Ethereum). Inachukua nafasi ya kusaini ujumbe kwa dharura na kiwango kilichopangwa na salama.

Ujumbe wa SIWE unaonekana hivi:

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

Vipengele muhimu vya SIWE:

- **Kufunga kikoa** - ujumbe unajumuisha kikoa, kuzuia hadaa (phishing)
- **Kitambulisho cha Mnyororo (Chain ID)** - inabainisha ni mtandao upi sahihi ni halali kwake
- **Nonsi** - inazuia mashambulizi ya kurudia (replay attacks)
- **Muda wa kuisha** - muhuri wa muda wa hiari unaopunguza dirisha la uhalali
- **Rasilimali** - URI za hiari kwa ufikiaji wenye upeo

### Maktaba za SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Utekelezaji rasmi wa TypeScript na Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Utekelezaji wa Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Utekelezaji wa Go

### Mfano: kuingia upande wa mteja kwa kutumia siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Pata nonsi kutoka kwenye mfumo wako wa nyuma
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Unda na usaini ujumbe wa SIWE
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

  // 3. Tuma kwenye mfumo wa nyuma kwa uthibitishaji
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Mfano: uthibitishaji upande wa seva (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Toa nonsi na uihifadhi kwenye kipindi ili /verify iweze kuikagua baadaye
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
      // data.address ni anwani ya Ethereum iliyothibitishwa
      // Unda kipindi au JWT kwa mtumiaji
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Maktaba za kuunganisha mkoba {#wallet-connection-libraries}

Kabla ya kuthibitisha, unahitaji mtumiaji aunganishe mkoba wake. Maktaba hizi hurahisisha:

- **[RainbowKit](https://www.rainbowkit.com/)** - Kijenzi cha React kilicho tayari kutumika chenye kiolesura kizuri cha mtumiaji (UI)
- **[ConnectKit](https://docs.family.co/connectkit)** - Modali ya kuunganisha mkoba ya kuweka moja kwa moja
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Muunganisho wa mkoba wa minyororo mingi wenye SIWE iliyojengewa ndani
- **[Wagmi](https://wagmi.sh)** - Maktaba ya React Hooks yenye `useAccount`, `useConnect`

## Kuthibitisha sahihi kwa mikono {#verifying-manually}

Ikiwa unapendelea kutotumia SIWE, unaweza kuthibitisha sahihi moja kwa moja:

```ts
import { verifyMessage } from 'ethers'

// Ujumbe ambao mtumiaji alisaini
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Rejesha anwani ya msaini kutoka kwenye sahihi
const recoveredAddress = verifyMessage(message, signature)

// Linganisha na anwani inayodaiwa
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Uthibitishaji umefanikiwa
}
```

### Vidokezo muhimu vya usalama {#security-notes}

- **Daima tumia nonsi** - inazuia mashambulizi ya kurudia ambapo sahihi ya zamani inatumiwa tena
- **Jumuisha kikoa** - inazuia sahihi kuwa halali kwenye tovuti tofauti
- **Angalia muda wa kuisha** - sahihi zinapaswa kuwa na dirisha dogo la uhalali
- **Tumia SIWE (EIP-4361) inapowezekana** - inashughulikia yote hapo juu kwa ajili yako
- **Kamwe usifichue funguo za siri** - kusaini hufanyika ndani ya mkoba; programu yako inaona tu matokeo

## Usimamizi wa kipindi {#session-management}

Baada ya kuthibitishwa, bado unahitaji vipindi—kama tu Web2. Mitindo ya kawaida:

- **Tokeni za JWT** - toa JWT baada ya kuthibitisha sahihi, tumia kwa maombi ya API
- **Vipindi vya upande wa seva** - hifadhi anwani iliyothibitishwa kwenye kidakuzi cha kipindi
- **SIWE yenye rasilimali** - fafanua tokeni za ufikiaji zenye upeo zilizounganishwa na URI maalum

Tofauti kuu kutoka kwa Web2: anwani ya Ethereum ya mtumiaji ni utambulisho wake wa kudumu. Wanaweza kuitumia kwenye dapp yoyote bila kuunda akaunti mpya.

## Utambulisho uliogatuliwa {#decentralized-identity}

Uthibitishaji wa Ethereum ni sehemu ya harakati pana kuelekea **utambulisho wa kujitawala**. Viwango na miradi katika nafasi hii ni pamoja na:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Majina yanayosomeka na binadamu (k.m., `vitalik.eth`) yanayotatua kwa anwani
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Uthibitisho mnyororoni kuhusu utambulisho na vitambulisho
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** - Kiwango cha kimataifa cha utambulisho uliogatuliwa (DID) unaoweza kuthibitishwa
- **[Ceramic Network](https://ceramic.network/)** - Mitiririko ya data iliyogatuliwa iliyofungwa na DID

## Usomaji zaidi {#further-reading}

- [EIP-4361: Kuingia kwa kutumia Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Nyaraka za SIWE](https://docs.login.xyz/)
- [Kuingia kwa kutumia Ethereum kwenye Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Nyaraka za uthibitishaji za Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Nyaraka za ENS](https://docs.ens.domains/)

## Mada zinazohusiana {#related-topics}

- [Akaunti za Ethereum](/developers/docs/accounts/)
- [Maktaba za API za JavaScript](/developers/docs/apis/javascript/)
- [Maktaba za API za mazingira ya nyuma (backend)](/developers/docs/apis/backend/)
- [Mikoba](/wallets/)