---
title: Uwierzytelnianie w Ethereum
description: Dowiedz się, jak działa uwierzytelnianie użytkowników w aplikacjach Ethereum — bez haseł, tylko portfele i podpisy.
lang: pl
---

Jeśli wywodzisz się z tradycyjnego tworzenia stron internetowych, jesteś przyzwyczajony do logowania za pomocą nazwy użytkownika i hasła, przepływów OAuth oraz plików cookie sesji. Uwierzytelnianie w Ethereum działa inaczej — i pod wieloma względami prościej.

W Ethereum użytkownik udowadnia swoją tożsamość poprzez **podpisanie wiadomości swoim portfelem**. Nie ma hasła do przechowywania. Nie ma bazy danych z danymi uwierzytelniającymi, która mogłaby wyciec. Tylko kryptografia.

## Czym różni się to od Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Nazwa użytkownika + hasło         | Adres portfela + podpis                          |
| Serwer przechowuje dane logowania | Użytkownik posiada klucz prywatny                |
| Sesje zarządzane przez cookies / JWT | Sesje rozpoczynają się od pozałańcuchowego podpisu portfela |
| „Zaloguj się przez Google”        | „Zaloguj się przez Ethereum”                     |
| Procedury resetowania hasła       | Odzyskiwanie przez frazę odzyskiwania            |

Zasadnicza zmiana: w Web2 uwierzytelnia Cię scentralizowany serwer. W Ethereum **uwierzytelniasz się sam**, udowadniając, że kontrolujesz określony adres — i każdy może to niezależnie zweryfikować.

## Wymagania wstępne {#prerequisites}

Upewnij się, że rozumiesz:

- [Konta Ethereum i jak one działają](/developers/docs/accounts/)
- [Czym jest portfel i jak go podłączyć](/wallets/)
- [Podstawy kryptografii klucza publicznego i prywatnego](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Jak działa uwierzytelnianie oparte na portfelu {#how-wallet-auth-works}

Główny przepływ jest prosty:

1. **Twoja zdecentralizowana aplikacja (dapp) prosi użytkownika o podłączenie portfela** (przez MetaMask, Rainbow, WalletConnect itp.)
2. **Portfel udostępnia adres Ethereum użytkownika** - jest to jego publiczny identyfikator
3. **Twoja dapp generuje unikalną wiadomość** (nonce lub wyzwanie)
4. **Użytkownik podpisuje wiadomość** swoim kluczem prywatnym (dzieje się to wewnątrz portfela)
5. **Twój backend weryfikuje podpis** względem zadeklarowanego adresu
6. **Jeśli jest prawidłowy, użytkownik zostaje uwierzytelniony**

Żadne hasło nie zostało wpisane, zapisane ani przesłane.

## Logowanie przez Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) definiuje standardowy format wiadomości do logowania w Ethereum, powszechnie nazywany **SIWE** (Sign-In with Ethereum). Zastępuje on doraźne podpisywanie wiadomości ustrukturyzowanym, bezpiecznym standardem.

Wiadomość SIWE wygląda następująco:

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

Kluczowe cechy SIWE:

- **Powiązanie z domeną** - wiadomość zawiera domenę, co zapobiega phishingowi
- **ID łańcucha (Chain ID)** - określa, dla której sieci podpis jest ważny
- **Nonce** - zapobiega atakom typu replay
- **Wygaśnięcie** - opcjonalny znacznik czasu ograniczający okno ważności
- **Zasoby** - opcjonalne identyfikatory URI dla dostępu o określonym zakresie

### Biblioteki SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Oficjalna implementacja w języku TypeScript autorstwa Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Implementacja w języku Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Implementacja w języku Go

### Przykład: logowanie po stronie klienta za pomocą siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Pobierz nonce z backendu
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Utwórz i podpisz wiadomość SIWE
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

  // 3. Wyślij do backendu do weryfikacji
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Przykład: weryfikacja po stronie serwera (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Wygeneruj nonce i zapisz go w sesji, aby /verify mogło go później sprawdzić
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
      // data.address to zweryfikowany adres Ethereum
      // Utwórz sesję lub JWT dla użytkownika
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Biblioteki do łączenia portfeli {#wallet-connection-libraries}

Przed uwierzytelnieniem użytkownik musi podłączyć swój portfel. Te biblioteki to ułatwiają:

- **[RainbowKit](https://www.rainbowkit.com/)** - Gotowy do użycia komponent React z pięknym interfejsem użytkownika
- **[ConnectKit](https://docs.family.co/connectkit)** - Gotowy modal do łączenia portfela
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Wielosieciowe łączenie portfela z wbudowanym SIWE
- **[wagmi](https://wagmi.sh)** - Biblioteka React Hooks z `useAccount`, `useConnect`

## Ręczna weryfikacja podpisów {#verifying-manually}

Jeśli wolisz nie używać SIWE, możesz weryfikować podpisy bezpośrednio:

```ts
import { verifyMessage } from 'ethers'

// Wiadomość, którą podpisał użytkownik
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Odzyskaj adres podpisującego z podpisu
const recoveredAddress = verifyMessage(message, signature)

// Porównaj z zadeklarowanym adresem
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Uwierzytelnienie powiodło się
}
```

### Ważne uwagi dotyczące bezpieczeństwa {#security-notes}

- **Zawsze używaj nonce** - zapobiega atakom typu replay, w których ponownie wykorzystywany jest stary podpis
- **Uwzględnij domenę** - zapobiega ważności podpisów na różnych stronach
- **Sprawdzaj wygaśnięcie** - podpisy powinny mieć ograniczone okno ważności
- **Używaj SIWE (EIP-4361), gdy to możliwe** - obsługuje to wszystko za Ciebie
- **Nigdy nie ujawniaj kluczy prywatnych** - podpis następuje wewnątrz portfela; Twoja aplikacja widzi tylko wynik

## Zarządzanie sesją {#session-management}

Po uwierzytelnieniu nadal potrzebujesz sesji — tak jak w Web2. Typowe wzorce:

- **Tokeny JWT** - wydaj JWT po zweryfikowaniu podpisu, używaj do żądań API
- **Sesje po stronie serwera** - przechowuj zweryfikowany adres w pliku cookie sesji
- **SIWE z zasobami** - definiuj tokeny dostępu o określonym zakresie powiązane z konkretnymi identyfikatorami URI

Kluczowa różnica w stosunku do Web2: adres Ethereum użytkownika jest jego trwałą tożsamością. Może go używać w dowolnej dapp bez tworzenia nowego konta.

## Zdecentralizowana tożsamość {#decentralized-identity}

Uwierzytelnianie w Ethereum jest częścią szerszego ruchu w kierunku **suwerennej tożsamości (self-sovereign identity)**. Standardy i projekty w tej przestrzeni obejmują:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Czytelne dla człowieka nazwy (np. `vitalik.eth`), które rozwiązują się na adresy
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Poświadczenia onchain dotyczące tożsamości i danych uwierzytelniających
- **[Zdecentralizowane identyfikatory W3C (DIDs)](https://www.w3.org/TR/did-core/)** - Globalny standard dla weryfikowalnej zdecentralizowanej tożsamości
- **[Ceramic Network](https://ceramic.network/)** - Zdecentralizowane strumienie danych powiązane z DID

## Dalsza lektura {#further-reading}

- [EIP-4361: Logowanie przez Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Dokumentacja SIWE](https://docs.login.xyz/)
- [Logowanie przez Ethereum w Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Dokumentacja uwierzytelniania Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Dokumentacja ENS](https://docs.ens.domains/)

## Powiązane tematy {#related-topics}

- [Konta Ethereum](/developers/docs/accounts/)
- [Biblioteki API JavaScript](/developers/docs/apis/javascript/)
- [Biblioteki API backendu](/developers/docs/apis/backend/)
- [Portfele](/wallets/)