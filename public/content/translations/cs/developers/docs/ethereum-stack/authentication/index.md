---
title: Autentizace na Ethereu
description: Zjistěte, jak funguje autentizace uživatelů v aplikacích na Ethereu – žádná hesla, jen peněženky a podpisy.
lang: cs
---

Pokud přicházíte z tradičního vývoje webu, jste zvyklí na přihlašování pomocí uživatelského jména a hesla, toky OAuth a relační cookies. Autentizace na Ethereu funguje jinak – a v mnoha ohledech jednodušeji.

Na Ethereu uživatel prokazuje svou identitu **podepsáním zprávy pomocí své peněženky**. Žádné heslo k ukládání. Žádná databáze přihlašovacích údajů, která by mohla uniknout. Jen kryptografie.

## Jak se to liší od Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Uživatelské jméno + heslo         | Adresa peněženky + podpis                        |
| Server ukládá přihlašovací údaje  | Uživatel drží soukromý klíč                      |
| Relace spravované pomocí cookies / JWT | Relace začínají offchain podpisem peněženky |
| „Přihlásit se přes Google“        | „Přihlásit se přes Ethereum“                     |
| Procesy obnovy hesla              | Obnova pomocí seed fráze                         |

Zásadní posun: ve Web2 vás autentizuje centralizovaný server. Na Ethereu **autentizujete sami sebe** tím, že prokážete kontrolu nad konkrétní adresou – a kdokoli to může nezávisle ověřit.

## Předpoklady {#prerequisites}

Ujistěte se, že rozumíte následujícím konceptům:

- [Účty na Ethereu a jak fungují](/developers/docs/accounts/)
- [Co je to peněženka a jak ji připojit](/wallets/)
- [Základy kryptografie veřejného a soukromého klíče](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Jak funguje autentizace založená na peněžence {#how-wallet-auth-works}

Základní postup je jednoduchý:

1. **Vaše decentralizovaná aplikace (dapp) požádá uživatele o připojení peněženky** (přes MetaMask, Rainbow, WalletConnect atd.)
2. **Peněženka sdílí uživatelovu adresu na Ethereu** – to je jeho veřejný identifikátor
3. **Vaše dapp vygeneruje unikátní zprávu** (nonce nebo výzvu)
4. **Uživatel podepíše zprávu** svým soukromým klíčem (probíhá uvnitř peněženky)
5. **Váš backend ověří podpis** vůči deklarované adrese
6. **Pokud je platný, uživatel je autentizován**

Žádné heslo nebylo nikdy zadáno, uloženo ani přeneseno.

## Přihlášení pomocí Etherea (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) definuje standardní formát zprávy pro přihlášení pomocí Etherea, běžně nazývaný **SIWE** (Sign-In with Ethereum). Nahrazuje ad-hoc podepisování zpráv strukturovaným a bezpečným standardem.

Zpráva SIWE vypadá takto:

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

Klíčové vlastnosti SIWE:

- **Vazba na doménu** – zpráva obsahuje doménu, což zabraňuje phishingu
- **ID řetězce (Chain ID)** – určuje, pro kterou síť je podpis platný
- **Nonce** – zabraňuje útokům typu replay (opakování)
- **Expirace** – volitelné časové razítko omezující okno platnosti
- **Zdroje** – volitelné URI pro omezený přístup

### Knihovny pro SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** – Oficiální implementace v TypeScriptu od Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** – Implementace v jazyce Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** – Implementace v jazyce Go

### Příklad: přihlášení na straně klienta pomocí siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Získejte nonce ze svého backendu
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Vytvořte a podepište SIWE zprávu
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

  // 3. Odešlete na backend k ověření
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Příklad: ověření na straně serveru (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Vydejte nonce a uložte ji do relace, aby ji /verify mohl později zkontrolovat
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
      // data.address je ověřená Ethereum adresa
      // Vytvořte relaci nebo JWT pro uživatele
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Knihovny pro připojení peněženky {#wallet-connection-libraries}

Před autentizací potřebujete, aby uživatel připojil svou peněženku. Tyto knihovny to usnadňují:

- **[RainbowKit](https://www.rainbowkit.com/)** – Komponenta pro React připravená k použití s krásným uživatelským rozhraním
- **[ConnectKit](https://docs.family.co/connectkit)** – Modální okno pro připojení peněženky typu drop-in
- **[AppKit (WalletConnect)](https://reown.com/appkit)** – Multichainové připojení peněženky se zabudovaným SIWE
- **[wagmi](https://wagmi.sh)** – Knihovna React Hooks s `useAccount`, `useConnect`

## Manuální ověřování podpisů {#verifying-manually}

Pokud dáváte přednost nepoužívat SIWE, můžete podpisy ověřovat přímo:

```ts
import { verifyMessage } from 'ethers'

// Zpráva, kterou uživatel podepsal
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Obnovte adresu podepisujícího z podpisu
const recoveredAddress = verifyMessage(message, signature)

// Porovnejte s deklarovanou adresou
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Autentizace úspěšná
}
```

### Důležité bezpečnostní poznámky {#security-notes}

- **Vždy používejte nonce** – zabraňuje útokům typu replay, kdy je znovu použit starý podpis
- **Zahrňte doménu** – zabraňuje tomu, aby byly podpisy platné napříč různými weby
- **Kontrolujte expiraci** – podpisy by měly mít omezené okno platnosti
- **Kdykoli je to možné, použijte SIWE (EIP-4361)** – řeší za vás vše výše uvedené
- **Nikdy neodhalujte soukromé klíče** – podepisování probíhá uvnitř peněženky; vaše aplikace vidí pouze výsledek

## Správa relací {#session-management}

Po autentizaci stále potřebujete relace – stejně jako ve Web2. Běžné vzory:

- **Tokeny JWT** – po ověření podpisu vydejte JWT a použijte jej pro požadavky na API
- **Relace na straně serveru** – uložte ověřenou adresu do relační cookie
- **SIWE se zdroji** – definujte přístupové tokeny s omezeným rozsahem spojené s konkrétními URI

Klíčový rozdíl oproti Web2: adresa uživatele na Ethereu je jeho trvalou identitou. Může ji používat napříč jakoukoli dapp bez vytváření nového účtu.

## Decentralizovaná identita {#decentralized-identity}

Autentizace na Ethereu je součástí širšího hnutí směrem k **sebeurčující identitě (self-sovereign identity)**. Standardy a projekty v této oblasti zahrnují:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** – Lidsky čitelná jména (např. `vitalik.eth`), která se překládají na adresy
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** – Onchain atestace o identitě a pověřeních
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** – Globální standard pro ověřitelnou decentralizovanou identitu (DID)
- **[Ceramic Network](https://ceramic.network/)** – Decentralizované datové toky vázané na DID

## Další čtení {#further-reading}

- [EIP-4361: Přihlášení pomocí Etherea](https://eips.ethereum.org/EIPS/eip-4361)
- [Dokumentace SIWE](https://docs.login.xyz/)
- [Přihlášení pomocí Etherea na Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Dokumentace k autentizaci Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Dokumentace ENS](https://docs.ens.domains/)

## Související témata {#related-topics}

- [Účty na Ethereu](/developers/docs/accounts/)
- [Knihovny JavaScript API](/developers/docs/apis/javascript/)
- [Knihovny backend API](/developers/docs/apis/backend/)
- [Peněženky](/wallets/)