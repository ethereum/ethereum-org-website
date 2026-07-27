---
title: Authentifizierung auf Ethereum
description: Erfahre, wie die Benutzerauthentifizierung in Ethereum-Anwendungen funktioniert – keine Passwörter, nur Wallets und Signaturen.
lang: de
---

Wenn du aus der traditionellen Webentwicklung kommst, bist du an die Anmeldung mit Benutzername/Passwort, OAuth-Abläufe und Sitzungscookies gewöhnt. Die Authentifizierung auf Ethereum funktioniert anders – und in vielerlei Hinsicht einfacher.

Auf Ethereum beweist ein Benutzer seine Identität durch das **Signieren einer Nachricht mit seiner Wallet**. Kein Passwort, das gespeichert werden muss. Keine Datenbank mit Zugangsdaten, die geleakt werden kann. Nur Kryptographie.

## Wie unterscheidet es sich von Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Benutzername + Passwort           | Wallet-Adresse + Signatur                        |
| Server speichert Zugangsdaten     | Benutzer besitzt privaten Schlüssel              |
| Sitzungen über Cookies / JWT verwaltet | Sitzungen beginnen mit einer offchain Wallet-Signatur |
| "Mit Google anmelden"             | "Mit Ethereum anmelden"                          |
| Passwort-Zurücksetzungsprozesse   | Wiederherstellung per Seed-Phrase                |

Der grundlegende Wandel: Im Web2 authentifiziert dich ein zentraler Server. Auf Ethereum **authentifizierst du dich selbst**, indem du beweist, dass du eine bestimmte Adresse kontrollierst – und jeder kann dies unabhängig verifizieren.

## Voraussetzungen {#prerequisites}

Stelle sicher, dass du Folgendes verstehst:

- [Ethereum-Konten und wie sie funktionieren](/developers/docs/accounts/)
- [Was eine Wallet ist und wie man sie verbindet](/wallets/)
- [Grundlagen der Public-Key-Kryptographie](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Wie die Wallet-basierte Authentifizierung funktioniert {#how-wallet-auth-works}

Der grundlegende Ablauf ist einfach:

1. **Deine dezentrale Anwendung (Dapp) bittet den Benutzer, seine Wallet zu verbinden** (über MetaMask, Rainbow, WalletConnect usw.)
2. **Die Wallet teilt die Ethereum-Adresse des Benutzers** – dies ist seine öffentliche Kennung
3. **Deine Dapp generiert eine eindeutige Nachricht** (eine Nonce oder Challenge)
4. **Der Benutzer signiert die Nachricht** mit seinem privaten Schlüssel (geschieht innerhalb der Wallet)
5. **Dein Backend verifiziert die Signatur** anhand der angegebenen Adresse
6. **Wenn sie gültig ist, ist der Benutzer authentifiziert**

Es wurde nie ein Passwort eingegeben, gespeichert oder übertragen.

## Sign-In with Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) definiert ein Standard-Nachrichtenformat für die Anmeldung mit Ethereum, das allgemein als **SIWE** (Sign-In with Ethereum) bezeichnet wird. Es ersetzt das Ad-hoc-Signieren von Nachrichten durch einen strukturierten, sicheren Standard.

Eine SIWE-Nachricht sieht so aus:

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

Hauptmerkmale von SIWE:

- **Domain-Bindung** – die Nachricht enthält die Domain, was Phishing verhindert
- **Chain-ID** – gibt an, für welches Netzwerk die Signatur gültig ist
- **Nonce** – verhindert Replay-Angriffe
- **Ablaufdatum** – optionaler Zeitstempel, der das Gültigkeitsfenster begrenzt
- **Ressourcen** – optionale URIs für bereichsbezogenen Zugriff

### SIWE-Bibliotheken {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** – Offizielle TypeScript-Implementierung von Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** – Rust-Implementierung
- **[siwe-go](https://github.com/spruceid/siwe-go)** – Go-Implementierung

### Beispiel: Clientseitige Anmeldung mit siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Hole eine Nonce von deinem Backend
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Erstelle und signiere die SIWE-Nachricht
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

  // 3. Sende zur Verifizierung an das Backend
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Beispiel: Serverseitige Verifizierung (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Stelle eine Nonce aus und speichere sie in der Session, damit /verify sie später überprüfen kann
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
      // data.address ist die verifizierte Ethereum-Adresse
      // Erstelle eine Session oder ein JWT für den Benutzer
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Bibliotheken für die Wallet-Verbindung {#wallet-connection-libraries}

Vor der Authentifizierung muss der Benutzer seine Wallet verbinden. Diese Bibliotheken machen es einfach:

- **[RainbowKit](https://www.rainbowkit.com/)** – Sofort einsatzbereite React-Komponente mit schöner Benutzeroberfläche
- **[ConnectKit](https://docs.family.co/connectkit)** – Drop-in-Modal für die Wallet-Verbindung
- **[AppKit (WalletConnect)](https://reown.com/appkit)** – Multichain-Wallet-Verbindung mit integriertem SIWE
- **[Wagmi](https://wagmi.sh)** – React-Hooks-Bibliothek mit `useAccount`, `useConnect`

## Signaturen manuell verifizieren {#verifying-manually}

Wenn du SIWE lieber nicht verwenden möchtest, kannst du Signaturen auch direkt verifizieren:

```ts
import { verifyMessage } from 'ethers'

// Die Nachricht, die der Benutzer signiert hat
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Ermittle die Adresse des Signierers aus der Signatur
const recoveredAddress = verifyMessage(message, signature)

// Vergleiche mit der angegebenen Adresse
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Authentifizierung erfolgreich
}
```

### Wichtige Sicherheitshinweise {#security-notes}

- **Verwende immer eine Nonce** – verhindert Replay-Angriffe, bei denen eine alte Signatur wiederverwendet wird
- **Schließe die Domain ein** – verhindert, dass Signaturen über verschiedene Websites hinweg gültig sind
- **Überprüfe das Ablaufdatum** – Signaturen sollten ein begrenztes Gültigkeitsfenster haben
- **Verwende SIWE (EIP-4361), wenn möglich** – es übernimmt all das für dich
- **Lege niemals private Schlüssel offen** – das Signieren geschieht innerhalb der Wallet; deine App sieht nur das Ergebnis

## Sitzungsverwaltung {#session-management}

Sobald du authentifiziert bist, benötigst du weiterhin Sitzungen – genau wie im Web2. Gängige Muster:

- **JWT-Token** – stelle nach der Verifizierung der Signatur ein JWT aus und verwende es für API-Anfragen
- **Serverseitige Sitzungen** – speichere die verifizierte Adresse in einem Sitzungscookie
- **SIWE mit Ressourcen** – definiere bereichsbezogene Zugriffstoken, die mit bestimmten URIs verknüpft sind

Der Hauptunterschied zum Web2: Die Ethereum-Adresse des Benutzers ist seine dauerhafte Identität. Er kann sie in jeder Dapp verwenden, ohne ein neues Konto erstellen zu müssen.

## Dezentrale Identität {#decentralized-identity}

Die Ethereum-Authentifizierung ist Teil einer breiteren Bewegung hin zu einer **selbstsouveränen Identität**. Zu den Standards und Projekten in diesem Bereich gehören:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** – Für Menschen lesbare Namen (z. B. `vitalik.eth`), die in Adressen aufgelöst werden
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** – Onchain-Attestierungen über Identität und Zugangsdaten
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** – Globaler Standard für verifizierbare dezentrale Identität (DID)
- **[Ceramic Network](https://ceramic.network/)** – Dezentrale Datenströme, die an eine DID gebunden sind

## Weiterführende Literatur {#further-reading}

- [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE-Dokumentation](https://docs.login.xyz/)
- [Sign-In with Ethereum auf Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit-Authentifizierungsdokumentation](https://docs.reown.com/appkit/authentication)
- [ENS-Dokumentation](https://docs.ens.domains/)

## Verwandte Themen {#related-topics}

- [Ethereum-Konten](/developers/docs/accounts/)
- [JavaScript-API-Bibliotheken](/developers/docs/apis/javascript/)
- [Backend-API-Bibliotheken](/developers/docs/apis/backend/)
- [Wallets](/wallets/)