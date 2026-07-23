---
title: Autenticazione su Ethereum
description: "Scopri come funziona l'autenticazione degli utenti nelle applicazioni Ethereum: niente password, solo portafogli e firme."
lang: it
---

Se provieni dallo sviluppo web tradizionale, sei abituato all'accesso con nome utente/password, ai flussi OAuth e ai cookie di sessione. L'autenticazione su Ethereum funziona diversamente e, per molti versi, in modo più semplice.

Su Ethereum, un utente dimostra la propria identità tramite la **firma di un messaggio con il proprio portafoglio**. Nessuna password da memorizzare. Nessun database di credenziali da cui possano trapelare dati. Solo crittografia.

## In cosa differisce dal Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Nome utente + password            | Indirizzo del portafoglio + firma                |
| Il server memorizza le credenziali| L'utente detiene la chiave privata               |
| Sessioni gestite da cookie / JWT  | Le sessioni iniziano con una firma del portafoglio offchain |
| "Accedi con Google"               | "Accedi con Ethereum"                            |
| Flussi di ripristino della password| Recupero tramite frase seme                     |

Il cambiamento fondamentale: nel Web2, un server centralizzato ti autentica. Su Ethereum, **sei tu ad autenticarti** dimostrando di controllare un indirizzo specifico, e chiunque può verificarlo in modo indipendente.

## Prerequisiti {#prerequisites}

Assicurati di aver compreso:

- [Gli account di Ethereum e come funzionano](/developers/docs/accounts/)
- [Cos'è un portafoglio e come connetterne uno](/wallets/)
- [Le basi della crittografia a chiave pubblica-privata](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Come funziona l'autenticazione basata sul portafoglio {#how-wallet-auth-works}

Il flusso principale è semplice:

1. **La tua applicazione decentralizzata (dapp) chiede all'utente di connettere il proprio portafoglio** (tramite MetaMask, Rainbow, WalletConnect, ecc.)
2. **Il portafoglio condivide l'indirizzo Ethereum dell'utente**: questo è il suo identificatore pubblico
3. **La tua dapp genera un messaggio univoco** (un nonce o una sfida)
4. **L'utente firma il messaggio** con la propria chiave privata (avviene all'interno del portafoglio)
5. **Il tuo backend verifica la firma** rispetto all'indirizzo dichiarato
6. **Se valida, l'utente è autenticato**

Nessuna password è mai stata digitata, memorizzata o trasmessa.

## Accedi con Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) definisce un formato di messaggio standard per l'accesso a Ethereum, comunemente chiamato **SIWE** (Sign-In with Ethereum). Sostituisce la firma di messaggi ad-hoc con uno standard strutturato e sicuro.

Un messaggio SIWE si presenta così:

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

Caratteristiche principali di SIWE:

- **Vincolo di dominio** - il messaggio include il dominio, prevenendo il phishing
- **ID della catena** - specifica per quale rete è valida la firma
- **Nonce** - previene gli attacchi di replay
- **Scadenza** - marca temporale opzionale che limita la finestra di validità
- **Risorse** - URI opzionali per l'accesso con ambito limitato

### Librerie SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Implementazione ufficiale in TypeScript di Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Implementazione in Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Implementazione in Go

### Esempio: accesso lato client con siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Ottieni un nonce dal tuo backend
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Crea e firma il messaggio SIWE
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

  // 3. Invia al backend per la verifica
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Esempio: verifica lato server (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Emetti un nonce e memorizzalo nella sessione in modo che /verify possa controllarlo in seguito
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
      // data.address è l'indirizzo Ethereum verificato
      // Crea una sessione o un JWT per l'utente
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Librerie di connessione del portafoglio {#wallet-connection-libraries}

Prima dell'autenticazione, è necessario che l'utente connetta il proprio portafoglio. Queste librerie semplificano l'operazione:

- **[RainbowKit](https://www.rainbowkit.com/)** - Componente React pronto all'uso con una bellissima interfaccia utente
- **[ConnectKit](https://docs.family.co/connectkit)** - Modale di connessione del portafoglio pronto all'uso
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Connessione del portafoglio multicatena con SIWE integrato
- **[Wagmi](https://wagmi.sh)** - Libreria di React Hooks con `useAccount`, `useConnect`

## Verificare le firme manualmente {#verifying-manually}

Se preferisci non usare SIWE, puoi verificare le firme direttamente:

```ts
import { verifyMessage } from 'ethers'

// Il messaggio che l'utente ha firmato
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Recupera l'indirizzo del firmatario dalla firma
const recoveredAddress = verifyMessage(message, signature)

// Confronta con l'indirizzo dichiarato
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Autenticazione riuscita
}
```

### Note importanti sulla sicurezza {#security-notes}

- **Usa sempre un nonce** - previene gli attacchi di replay in cui viene riutilizzata una vecchia firma
- **Includi il dominio** - impedisce che le firme siano valide su siti diversi
- **Controlla la scadenza** - le firme dovrebbero avere una finestra di validità limitata
- **Usa SIWE (EIP-4361) quando possibile** - gestisce tutto quanto sopra per te
- **Non esporre mai le chiavi private** - la firma avviene all'interno del portafoglio; la tua app vede solo il risultato

## Gestione delle sessioni {#session-management}

Una volta autenticato, hai ancora bisogno delle sessioni, proprio come nel Web2. Modelli comuni:

- **Token JWT** - emetti un JWT dopo aver verificato la firma, da usare per le richieste API
- **Sessioni lato server** - memorizza l'indirizzo verificato in un cookie di sessione
- **SIWE con risorse** - definisci token di accesso con ambito limitato collegati a URI specifici

La differenza chiave rispetto al Web2: l'indirizzo Ethereum dell'utente è la sua identità persistente. Può usarlo in qualsiasi dapp senza creare un nuovo account.

## Identità decentralizzata {#decentralized-identity}

L'autenticazione di Ethereum fa parte di un movimento più ampio verso l'**identità auto-sovrana**. Gli standard e i progetti in questo spazio includono:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Nomi leggibili dall'uomo (es. `vitalik.eth`) che si risolvono in indirizzi
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Attestazioni onchain su identità e credenziali
- **[Identificatori decentralizzati (DID) del W3C](https://www.w3.org/TR/did-core/)** - Standard globale per l'identità decentralizzata verificabile
- **[Ceramic Network](https://ceramic.network/)** - Flussi di dati decentralizzati legati a un DID

## Letture di approfondimento {#further-reading}

- [EIP-4361: Accedi con Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Documentazione di SIWE](https://docs.login.xyz/)
- [Accedi con Ethereum su Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Documentazione sull'autenticazione di Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Documentazione di ENS](https://docs.ens.domains/)

## Argomenti correlati {#related-topics}

- [Account di Ethereum](/developers/docs/accounts/)
- [Librerie API JavaScript](/developers/docs/apis/javascript/)
- [Librerie API di backend](/developers/docs/apis/backend/)
- [Portafogli](/wallets/)