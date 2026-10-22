---
title: "Wysyłanie transakcji przy użyciu Viem"
description: "To przyjazny dla początkujących przewodnik po wysyłaniu transakcji Ethereum przy użyciu biblioteki Viem. Istnieją trzy główne kroki, aby wysłać transakcję do blockchaina Ethereum: utworzenie, podpisanie i rozgłoszenie. Przejdziemy przez wszystkie trzy."
author: "Elan Halpern"
tags: ["transakcje", "viem", "Alchemy"]
skill: beginner
breadcrumb: "Wysyłanie transakcji"
lang: pl
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

To przyjazny dla początkujących przewodnik po wysyłaniu transakcji Ethereum przy użyciu biblioteki [Viem](https://viem.sh/). Istnieją trzy główne kroki, aby wysłać transakcję do blockchaina Ethereum: utworzenie, podpisanie i rozgłoszenie. Przejdziemy przez wszystkie trzy, mając nadzieję, że odpowiemy na wszelkie Twoje pytania! W tym samouczku użyjemy [Alchemy](https://www.alchemy.com/) do wysyłania naszych transakcji do łańcucha Ethereum. Możesz [utworzyć darmowe konto Alchemy tutaj](https://auth.alchemy.com/signup).

**UWAGA:** Ten przewodnik dotyczy podpisywania transakcji na _backendzie_ Twojej aplikacji. Jeśli chcesz zintegrować podpisywanie transakcji na frontendzie, sprawdź [API dostawcy MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Podstawy {#the-basics}

Podobnie jak większość programistów blockchain na początku swojej drogi, mogłeś szukać informacji o tym, jak wysłać transakcję (coś, co powinno być dość proste) i natknąć się na mnóstwo przewodników, z których każdy mówił co innego, pozostawiając Cię nieco przytłoczonym i zdezorientowanym. Jeśli jesteś w takiej sytuacji, nie martw się; wszyscy kiedyś w niej byliśmy! Zanim więc zaczniemy, wyjaśnijmy kilka kwestii:

### 1\. Alchemy nie przechowuje Twoich kluczy prywatnych {#alchemy-does-not-store-your-private-keys}

- Oznacza to, że Alchemy nie może podpisywać i wysyłać transakcji w Twoim imieniu. Powodem tego są względy bezpieczeństwa. Alchemy nigdy nie poprosi Cię o udostępnienie klucza prywatnego i nigdy nie powinieneś udostępniać swojego klucza prywatnego hostowanemu węzłowi (ani nikomu innemu).
- Możesz odczytywać dane z blockchaina za pomocą głównego API Alchemy, ale aby do niego zapisywać, będziesz musiał użyć czegoś innego do podpisania swoich transakcji przed wysłaniem ich przez Alchemy (dotyczy to również każdej innej [usługi węzła](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Czym jest „signer”? {#what-is-a-signer}

- Signery podpisują transakcje za Ciebie przy użyciu Twojego klucza prywatnego. W tym samouczku użyjemy [Viem](https://viem.sh/) do podpisania naszej transakcji, ale możesz również użyć dowolnej innej biblioteki Web3.
- Na frontendzie dobrym przykładem signera jest [MetaMask](https://metamask.io/), który podpisuje i wysyła transakcje w Twoim imieniu.

### 3\. Dlaczego muszę podpisywać swoje transakcje? {#why-do-i-need-to-sign-my-transactions}

- Każdy użytkownik, który chce wysłać transakcję w sieci Ethereum, musi ją podpisać (przy użyciu swojego klucza prywatnego), aby potwierdzić, że nadawca transakcji jest tym, za kogo się podaje.
- Niezwykle ważne jest, aby chronić ten klucz prywatny, ponieważ dostęp do niego daje pełną kontrolę nad Twoim kontem Ethereum, pozwalając Tobie (lub komukolwiek z dostępem) na wykonywanie transakcji w Twoim imieniu.

### 4\. Jak chronić mój klucz prywatny? {#how-do-i-protect-my-private-key}

- Istnieje wiele sposobów na ochronę klucza prywatnego i używanie go do wysyłania transakcji. W tym samouczku użyjemy pliku `.env`. Możesz jednak również użyć oddzielnego dostawcy, który przechowuje klucze prywatne, użyć pliku magazynu kluczy (keystore) lub innych opcji.

### 5\. Jaka jest różnica między `eth_sendTransaction` a `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` i `eth_sendRawTransaction` to funkcje API Ethereum, które rozgłaszają transakcję w sieci Ethereum, aby została dodana do przyszłego bloku. Różnią się one sposobem obsługi podpisywania transakcji.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) służy do wysyłania _niepodpisanych_ transakcji, co oznacza, że węzeł, do którego wysyłasz, musi zarządzać Twoim kluczem prywatnym, aby mógł podpisać transakcję przed rozgłoszeniem jej w łańcuchu. Ponieważ Alchemy nie przechowuje kluczy prywatnych użytkowników, nie obsługuje tej metody.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) służy do rozgłaszania transakcji, które zostały już podpisane. Oznacza to, że najpierw musisz podpisać transakcję swoim kluczem prywatnym (w Viem, używając [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) z [kontem lokalnym](https://viem.sh/docs/accounts/local/privateKeyToAccount)), a następnie przekazać wynik do `eth_sendRawTransaction`.

Podczas korzystania z Viem, dostęp do `eth_sendRawTransaction` uzyskuje się poprzez wywołanie funkcji [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

To właśnie tego będziemy używać w tym samouczku.

### 6\. Czym jest biblioteka Web3? {#what-is-the-web3-library}

- Biblioteka Web3 to wrapper (nakładka) na standardowe wywołania [JSON-RPC](/developers/docs/apis/json-rpc/), który jest dość powszechnie używany w programowaniu na Ethereum.
- Istnieje wiele bibliotek Web3 dla różnych języków. W tym samouczku użyjemy [Viem](https://viem.sh/), która jest napisana w TypeScript i działa w każdym projekcie JavaScript. Możesz sprawdzić inne opcje [tutaj](/developers/docs/apis/javascript/), takie jak [Ethers.js](https://docs.ethers.org/v6/).

Dobra, skoro mamy już za sobą kilka z tych pytań, przejdźmy do samouczka. Śmiało zadawaj pytania w dowolnym momencie na [Discordzie](https://discord.gg/gWuC7zB) Alchemy!

### 7\. Jak wysyłać bezpieczne, zoptymalizowane pod kątem gazu i prywatne transakcje? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy posiada zestaw zasobów dotyczących transakcji](https://www.alchemy.com/docs/sending-transactions). Możesz ich użyć do wysyłania transakcji, symulowania transakcji przed ich wykonaniem, wysyłania prywatnych transakcji oraz wysyłania transakcji zoptymalizowanych pod kątem gazu.
- Możesz również użyć [webhooków Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview), aby otrzymywać powiadomienia, gdy Twoja transakcja zostanie pobrana z mempoola i dodana do łańcucha.

**UWAGA:** Ten przewodnik wymaga konta Alchemy, adresu Ethereum lub portfela MetaMask, a także zainstalowanych Node.js i npm. Jeśli ich nie masz, wykonaj następujące kroki:

1.  [Utwórz darmowe konto Alchemy](https://auth.alchemy.com/signup)
2.  [Utwórz konto MetaMask](https://metamask.io/) (lub zdobądź adres Ethereum)
3.  [Zainstaluj Node.js i npm](https://nodejs.org/en/download/)
## Kroki do wysłania Twojej transakcji {#steps-to-sending-your-transaction}

### 1\. Utwórz aplikację Alchemy w sieci testowej Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Przejdź do swojego [pulpitu nawigacyjnego Alchemy](https://dashboard.alchemy.com/) i utwórz nową aplikację, wybierając Sepolia (lub dowolną inną sieć testową) jako swoją sieć.

### 2\. Poproś o ETH z kranika Sepolia {#request-eth-from-sepolia-faucet}

Postępuj zgodnie z instrukcjami na [kraniku Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia), aby otrzymać ETH, lub użyj jednego z innych [kraników Sepolia](/developers/docs/networks/#sepolia). Kraniki rozdają małe kwoty (kranik Alchemy daje 0,1 ETH dziennie), co w zupełności wystarczy do tego samouczka. Upewnij się, że podajesz swój adres Ethereum w sieci **Sepolia** (z MetaMask), a nie w innej sieci. Po wykonaniu instrukcji sprawdź dwukrotnie, czy otrzymałeś ETH w swoim portfelu.

### 3\. Utwórz nowy katalog projektu i przejdź do niego za pomocą `cd` {#create-a-new-project-direction}

Utwórz nowy katalog projektu z wiersza poleceń (terminal na Macach) i przejdź do niego:

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Zainstaluj Viem (lub dowolną bibliotekę Web3) {#install-alchemy-web3}

Uruchom następujące polecenie w katalogu swojego projektu, aby zainstalować [Viem](https://viem.sh/):

Uwaga, jeśli wolisz użyć biblioteki Ethers.js, [postępuj zgodnie z instrukcjami tutaj](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Zainstaluj dotenv {#install-dotenv}

Użyjemy pliku `.env`, aby bezpiecznie przechowywać nasz klucz API i klucz prywatny.

```sh
npm install dotenv
```

### 6\. Utwórz plik `.env` {#create-the-dotenv-file}

Utwórz plik `.env` w katalogu swojego projektu i dodaj następujące dane (zastępując „`your-api-url`” i „`your-private-key`”)

- Aby znaleźć swój adres URL API Alchemy, przejdź do strony szczegółów aplikacji, którą właśnie utworzyłeś w swoim panelu, kliknij „View Key” w prawym górnym rogu i skopiuj adres URL HTTP.
- Aby znaleźć swój klucz prywatny za pomocą MetaMask, zapoznaj się z tym [przewodnikiem](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Użyj konta, które przechowuje tylko ETH z sieci testowej.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nie commituj pliku <code>.env</code>! Upewnij się, że nigdy nie udostępniasz ani nie ujawniasz swojego pliku <code>.env</code> nikomu, ponieważ w ten sposób narażasz swoje sekrety. Jeśli używasz systemu kontroli wersji, dodaj swój plik <code>.env</code> do pliku <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Utwórz plik `sendTx.js` {#create-sendtx-js}

Świetnie, teraz, gdy nasze wrażliwe dane są chronione w pliku `.env`, zacznijmy kodować. W naszym przykładzie wysyłania transakcji wyślemy 0,001 ETH na inny kontrolowany przez Ciebie adres, taki jak drugie konto w MetaMask.

Utwórz plik `sendTx.js`, w którym skonfigurujemy i wyślemy naszą przykładową transakcję, i dodaj do niego następujące wiersze kodu:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce zaczyna liczyć od 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: zastąp adresem, na który chcesz wysłać ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // opcjonalne pole danych do wysłania wiadomości lub wykonania inteligentnego kontraktu
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Pamiętaj, aby zastąpić `0xYourSecondAddress` adresem, na który chcesz wysłać ETH. Skrypt wyprowadza Twój własny adres (wysyłający) z `PRIVATE_KEY`, więc nie musisz go wprowadzać.

Zanim przejdziemy do uruchomienia tego kodu, pomówmy o niektórych jego elementach.

- `account`: Konto lokalne utworzone z Twojego klucza prywatnego za pomocą [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). Podpisywanie odbywa się na Twoim komputerze, a klucz prywatny nigdy nie jest wysyłany do Alchemy.
- `publicClient` i `walletClient`: Klienci Viem, którzy wysyłają żądania JSON-RPC do Twojego adresu URL Alchemy. Klient publiczny odczytuje dane z łańcucha, a klient portfela przygotowuje i podpisuje transakcje dla Twojego konta.
- `nonce`: Specyfikacja nonce służy do śledzenia liczby transakcji wysłanych z Twojego adresu. Potrzebujemy tego ze względów bezpieczeństwa i aby zapobiec atakom typu replay. Aby uzyskać liczbę transakcji wysłanych z Twojego adresu, używamy [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). Viem również by to za Ciebie wypełnił, ale pobieramy to tutaj jawnie, aby pokazać, skąd to się bierze.
- `transaction`: Obiekt transakcji ma kilka aspektów, które musimy określić. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) wypełnia za nas resztę, w tym `chainId` oraz pola opłat [EIP-1559](/developers/docs/gas/) `maxFeePerGas` i `maxPriorityFeePerGas`, w oparciu o bieżące warunki sieciowe.
  - `to`: To jest adres, na który chcemy wysłać ETH.
  - `value`: To jest kwota, którą chcemy wysłać, określona w wei, gdzie 10^18 wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) konwertuje dla nas kwotę ETH na wei. Twoje konto potrzebuje nieco więcej, ponieważ płaci również za gaz.
  - `gas`: Istnieje wiele sposobów na określenie odpowiedniej ilości gazu do dołączenia do transakcji. Alchemy obsługuje [webhooki](https://www.alchemy.com/docs/reference/webhooks-overview), które mogą powiadamiać Cię o aktywności onchain. W przypadku transakcji w Sieci głównej dobrą praktyką jest sprawdzanie bieżących warunków gazu, aby określić odpowiednią jego ilość. Zwykły transfer ETH na zwykły adres zawsze zużywa dokładnie 21000 gazu, co jest minimum dla każdej transakcji, więc wpisujemy tutaj 21000. Jeśli pominiesz `gas`, Viem oszacuje go za Ciebie.
  - `nonce`: Zobacz definicję nonce powyżej. Nonce zaczyna liczyć od zera.
  - [OPCJONALNIE] data: Używane do wysyłania dodatkowych informacji wraz z transferem lub wywoływania inteligentnego kontraktu, niewymagane w przypadku transferów salda, sprawdź uwagę poniżej.
- `signedTx`: Do podpisania naszego obiektu transakcji użyjemy metody `signTransaction`, która podpisuje go lokalnie za pomocą konta utworzonego z naszego `PRIVATE_KEY`.
- `sendRawTransaction`: Gdy mamy już podpisaną transakcję, możemy ją wysłać, aby została uwzględniona w kolejnym bloku, używając `sendRawTransaction`, co wywołuje `eth_sendRawTransaction`.
- `waitForTransactionReceipt`: Czeka, aż transakcja zostanie uwzględniona w bloku i zwraca jej pokwitowanie.

**Uwaga dotycząca danych (data)**
Istnieją dwa główne typy transakcji, które można wysłać w Ethereum.

- Transfer salda: Wysyłanie ETH z jednego adresu na drugi. Pole danych nie jest wymagane, jednak jeśli chcesz wysłać dodatkowe informacje wraz z transakcją, możesz dołączyć te informacje w formacie HEX w tym polu.
  - Na przykład, powiedzmy, że chcieliśmy zapisać hash dokumentu IPFS w łańcuchu Ethereum, aby nadać mu niezmienny znacznik czasu. Nasze pole danych powinno wtedy wyglądać tak: `data: toHex("IPFS hash")`, używając funkcji [`toHex`](https://viem.sh/docs/utilities/toHex) z Viem. I teraz każdy może odpytać łańcuch i zobaczyć, kiedy ten dokument został dodany.
- Transakcja inteligentnego kontraktu: Wykonanie kodu inteligentnego kontraktu w łańcuchu. W tym przypadku pole danych powinno zawierać funkcję inteligentnego kontraktu, którą chcesz wykonać, wraz z wszelkimi parametrami.
  - Praktyczny przykład znajdziesz w [samouczku Hello World Smart Contract](/developers/tutorials/hello-world-smart-contract/).

### 8\. Uruchom kod używając `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Wróć do swojego terminala lub wiersza poleceń i uruchom:

```sh
node sendTx.js
```

### 9\. Zobacz swoją transakcję w eksploratorze bloków {#see-your-transaction-in-the-mempool}

Skrypt drukuje hash transakcji, gdy tylko węzeł zaakceptuje transakcję, a następnie czeka, aż zostanie ona uwzględniona w bloku (zazwyczaj w ciągu kilku sekund) i drukuje wynik. Aby zobaczyć szczegóły, wklej hash do eksploratora bloków Sepolia, takiego jak [Sepolia Etherscan](https://sepolia.etherscan.io/) lub [Blockscout](https://eth-sepolia.blockscout.com/). Tam możesz obserwować, jak transakcja przechodzi ze stanu oczekującej do uwzględnionej, i zobaczyć kwotę, opłaty oraz blok, w którym się znalazła.

Jeśli zamiast tego zobaczysz błąd `insufficient funds` (niewystarczające środki), Twoje konto nie ma wystarczającej ilości Sepolia ETH, aby pokryć wartość plus gaz. Wróć do kroku 2 i poproś o więcej z kranika.

**Hura! Właśnie wysłałeś swoją pierwszą transakcję Ethereum przy użyciu Alchemy 🎉**

_Aby przekazać opinie i sugestie dotyczące tego przewodnika, napisz do Elana na [Discordzie](https://discord.gg/gWuC7zB) Alchemy!_

_Pierwotnie opublikowane przez Alchemy._
