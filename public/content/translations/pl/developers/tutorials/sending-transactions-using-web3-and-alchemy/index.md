---
title: "Wysyłanie transakcji przy użyciu Web3"
description: "To jest przyjazny dla początkujących przewodnik po wysyłaniu transakcji Ethereum przy użyciu Web3. Istnieją trzy główne kroki, aby wysłać transakcję do blockchaina Ethereum: utworzenie, podpisanie i rozgłoszenie. Przejdziemy przez wszystkie trzy."
author: "Elan Halpern"
tags: ["transakcje", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "Wysyłanie transakcji"
lang: pl
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

To jest przyjazny dla początkujących przewodnik po wysyłaniu transakcji Ethereum przy użyciu Web3. Istnieją trzy główne kroki, aby wysłać transakcję do blockchaina Ethereum: utworzenie, podpisanie i rozgłoszenie. Przejdziemy przez wszystkie trzy, mając nadzieję, że odpowiemy na wszelkie Twoje pytania! W tym samouczku użyjemy [Alchemy](https://www.alchemy.com/), aby wysłać nasze transakcje do łańcucha Ethereum. Możesz [utworzyć darmowe konto Alchemy tutaj](https://auth.alchemy.com/signup).

**UWAGA:** Ten przewodnik dotyczy podpisywania transakcji na _backendzie_ Twojej aplikacji. Jeśli chcesz zintegrować podpisywanie transakcji na frontendzie, sprawdź integrację [Web3 z dostawcą przeglądarkowym](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Podstawy {#the-basics}

Podobnie jak większość programistów blockchain na początku swojej drogi, mogłeś szukać informacji o tym, jak wysłać transakcję (coś, co powinno być dość proste) i natknąć się na mnóstwo przewodników, z których każdy mówił co innego, pozostawiając Cię nieco przytłoczonym i zdezorientowanym. Jeśli jesteś w takiej sytuacji, nie martw się; wszyscy kiedyś w niej byliśmy! Zanim więc zaczniemy, wyjaśnijmy kilka kwestii:

### 1\. Alchemy nie przechowuje Twoich kluczy prywatnych {#alchemy-does-not-store-your-private-keys}

- Oznacza to, że Alchemy nie może podpisywać i wysyłać transakcji w Twoim imieniu. Powodem tego są względy bezpieczeństwa. Alchemy nigdy nie poprosi Cię o udostępnienie klucza prywatnego i nigdy nie powinieneś udostępniać swojego klucza prywatnego hostowanemu węzłowi (ani nikomu innemu).
- Możesz odczytywać dane z blockchaina za pomocą głównego API Alchemy, ale aby do niego zapisywać, będziesz musiał użyć czegoś innego do podpisania swoich transakcji przed wysłaniem ich przez Alchemy (dotyczy to również każdej innej [usługi węzła](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Czym jest „signer”?
- Signery będą podpisywać transakcje za Ciebie przy użyciu Twojego klucza prywatnego. W tym samouczku użyjemy [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) do podpisania naszej transakcji, ale możesz również użyć dowolnej innej biblioteki Web3.
- Na frontendzie dobrym przykładem signera byłby [MetaMask](https://metamask.io/), który podpisze i wyśle transakcje w Twoim imieniu.
### 3\. Dlaczego muszę podpisywać swoje transakcje? {#why-do-i-need-to-sign-my-transactions}

- Każdy użytkownik, który chce wysłać transakcję w sieci Ethereum, musi ją podpisać (przy użyciu swojego klucza prywatnego), aby potwierdzić, że nadawca transakcji jest tym, za kogo się podaje.
- Niezwykle ważne jest, aby chronić ten klucz prywatny, ponieważ dostęp do niego daje pełną kontrolę nad Twoim kontem Ethereum, pozwalając Tobie (lub komukolwiek z dostępem) na wykonywanie transakcji w Twoim imieniu.

### 4\. Jak chronić mój klucz prywatny? {#how-do-i-protect-my-private-key}

- Istnieje wiele sposobów na ochronę klucza prywatnego i używanie go do wysyłania transakcji. W tym samouczku użyjemy pliku `.env`. Możesz jednak również użyć oddzielnego dostawcy, który przechowuje klucze prywatne, użyć pliku magazynu kluczy (keystore) lub innych opcji.

### 5\. Jaka jest różnica między `eth_sendTransaction` a `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` i `eth_sendRawTransaction` to funkcje API Ethereum, które rozgłaszają transakcję w sieci Ethereum, aby została dodana do przyszłego bloku. Różnią się one sposobem obsługi podpisywania transakcji.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) służy do wysyłania _niepodpisanych_ transakcji, co oznacza, że węzeł, do którego wysyłasz, musi zarządzać Twoim kluczem prywatnym, aby mógł podpisać transakcję przed rozgłoszeniem jej w łańcuchu. Ponieważ Alchemy nie przechowuje kluczy prywatnych użytkowników, nie obsługuje tej metody.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) służy do rozgłaszania transakcji, które zostały już podpisane. Oznacza to, że najpierw musisz użyć [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), a następnie przekazać wynik do `eth_sendRawTransaction`.

Podczas korzystania z Web3, dostęp do `eth_sendRawTransaction` uzyskuje się poprzez wywołanie funkcji [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Tego właśnie będziemy używać w tym samouczku.

### 6\. Czym jest biblioteka Web3? {#what-is-the-web3-library}

- Web3.js to biblioteka opakowująca standardowe wywołania JSON-RPC, która jest dość powszechnie używana w programowaniu na Ethereum.
- Istnieje wiele bibliotek Web3 dla różnych języków. W tym samouczku użyjemy [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), która jest napisana w języku JavaScript. Możesz sprawdzić inne opcje [tutaj](/developers/docs/apis/javascript/), takie jak [Ethers.js](https://docs.ethers.org/v5/).

Okej, skoro mamy już za sobą kilka z tych pytań, przejdźmy do samouczka. Śmiało zadawaj pytania w dowolnym momencie na [Discordzie](https://discord.gg/gWuC7zB) Alchemy!

### 7\. Jak wysyłać bezpieczne, zoptymalizowane pod kątem gazu i prywatne transakcje?
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

Postępuj zgodnie z instrukcjami na [kraniku Alchemy Sepolia](https://www.sepoliafaucet.com/), aby otrzymać ETH. Upewnij się, że podajesz swój adres Ethereum w sieci **Sepolia** (z MetaMask), a nie w innej sieci. Po wykonaniu instrukcji sprawdź dwukrotnie, czy otrzymałeś ETH w swoim portfelu.

### 3\. Utwórz nowy katalog projektu i przejdź do niego za pomocą `cd` {#create-a-new-project-direction}

Utwórz nowy katalog projektu z wiersza poleceń (terminal na Macach) i przejdź do niego:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Zainstaluj Alchemy Web3 (lub dowolną bibliotekę Web3) {#install-alchemy-web3}

Uruchom następujące polecenie w katalogu swojego projektu, aby zainstalować [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3):

Uwaga, jeśli wolisz użyć biblioteki Ethers.js, [postępuj zgodnie z instrukcjami tutaj](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Zainstaluj dotenv {#install-dotenv}

Użyjemy pliku `.env`, aby bezpiecznie przechowywać nasz klucz API i klucz prywatny.

```
npm install dotenv --save
```

### 6\. Utwórz plik `.env` {#create-the-dotenv-file}

Utwórz plik `.env` w katalogu swojego projektu i dodaj poniższy kod (zastępując „`your-api-url`” i „`your-private-key`”)

- Aby znaleźć swój adres URL API Alchemy, przejdź do strony szczegółów aplikacji, którą właśnie utworzyłeś na swoim pulpicie nawigacyjnym, kliknij „View Key” w prawym górnym rogu i skopiuj adres URL HTTP.
- Aby znaleźć swój klucz prywatny za pomocą MetaMask, sprawdź ten [przewodnik](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nie commituj pliku <code>.env</code>! Upewnij się, że nigdy nie udostępniasz ani nie ujawniasz swojego pliku <code>.env</code> nikomu, ponieważ w ten sposób narażasz swoje sekrety. Jeśli używasz systemu kontroli wersji, dodaj swój plik <code>.env</code> do pliku <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Utwórz plik `sendTx.js`
Świetnie, teraz gdy nasze wrażliwe dane są chronione w pliku `.env`, zacznijmy kodować. W naszym przykładzie wysyłania transakcji odeślemy ETH z powrotem do kranika Sepolia.

Utwórz plik `sendTx.js`, w którym skonfigurujemy i wyślemy naszą przykładową transakcję, a następnie dodaj do niego następujące wiersze kodu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: zastąp ten adres swoim własnym adresem publicznym

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce zaczyna liczyć od 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // adres kranika do zwrotu eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // opcjonalne pole danych do wysłania wiadomości lub wykonania inteligentnego kontraktu
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Pamiętaj, aby zastąpić adres w **linii 6** swoim własnym adresem publicznym.

Teraz, zanim przejdziemy do uruchomienia tego kodu, pomówmy o niektórych jego elementach.

- `nonce` : Specyfikacja nonce służy do śledzenia liczby transakcji wysłanych z Twojego adresu. Potrzebujemy tego ze względów bezpieczeństwa i aby zapobiec atakom typu replay. Aby uzyskać liczbę transakcji wysłanych z Twojego adresu, używamy [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: Obiekt transakcji ma kilka aspektów, które musimy określić
  - `to`: To jest adres, na który chcemy wysłać ETH. W tym przypadku odsyłamy ETH z powrotem do [kranika Sepolia](https://sepoliafaucet.com/), z którego początkowo o nie prosiliśmy.
  - `value`: To jest kwota, którą chcemy wysłać, określona w wei, gdzie 10^18 wei = 1 ETH.
  - `gas`: Istnieje wiele sposobów na określenie odpowiedniej ilości gazu, którą należy dołączyć do transakcji. Alchemy obsługuje [webhooki](https://www.alchemy.com/docs/reference/webhooks-overview), które mogą powiadamiać Cię o aktywności onchain. W przypadku transakcji w Sieci głównej dobrą praktyką jest sprawdzanie aktualnych warunków dotyczących gazu, aby określić odpowiednią jego ilość. 21000 to minimalna ilość gazu, jaką zużyje operacja na Ethereum, więc aby upewnić się, że nasza transakcja zostanie wykonana, wpisujemy tutaj 30000.
  - `nonce`: zobacz definicję nonce powyżej. Nonce zaczyna liczyć od zera.
  - [OPCJONALNIE] data: Używane do wysyłania dodatkowych informacji wraz z transferem lub wywoływania inteligentnego kontraktu, niewymagane w przypadku transferów salda, sprawdź poniższą uwagę.
- `signedTx`: Aby podpisać nasz obiekt transakcji, użyjemy metody `signTransaction` z naszym `PRIVATE_KEY`.
- `sendSignedTransaction`: Gdy mamy już podpisaną transakcję, możemy ją wysłać, aby została włączona do kolejnego bloku, używając `sendSignedTransaction`.

**Uwaga dotycząca danych (data)**
Istnieją dwa główne typy transakcji, które można wysłać w Ethereum.

- Transfer salda: Wysłanie ETH z jednego adresu na drugi. Pole danych nie jest wymagane, jednak jeśli chcesz wysłać dodatkowe informacje wraz z transakcją, możesz dołączyć te informacje w formacie HEX w tym polu.
  - Na przykład, powiedzmy, że chcieliśmy zapisać hash dokumentu IPFS w łańcuchu Ethereum, aby nadać mu niezmienny znacznik czasu. Nasze pole danych powinno wtedy wyglądać tak: data: `web3.utils.toHex(‘IPFS hash‘)`. I teraz każdy może odpytać łańcuch i zobaczyć, kiedy ten dokument został dodany.
- Transakcja inteligentnego kontraktu: Wykonanie pewnego kodu inteligentnego kontraktu w łańcuchu. W tym przypadku pole danych powinno zawierać inteligentną funkcję, którą chcesz wykonać, wraz z wszelkimi parametrami.
  - Praktyczny przykład znajdziesz w [samouczku Hello World Smart Contract](/developers/tutorials/hello-world-smart-contract/).
### 8\. Uruchom kod używając `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Wróć do swojego terminala lub wiersza poleceń i uruchom:

```
node sendTx.js
```

### 9\. Zobacz swoją transakcję w mempoolu
Otwórz [stronę Mempool](https://dashboard.alchemy.com/mempool) w swoim pulpicie nawigacyjnym Alchemy i przefiltruj według utworzonej aplikacji, aby znaleźć swoją transakcję. To tutaj możemy obserwować, jak nasza transakcja przechodzi ze stanu oczekującego (pending) do stanu wydobytego (mined) (jeśli się powiedzie) lub odrzuconego (dropped), jeśli się nie powiedzie. Upewnij się, że masz ustawione „All” (Wszystkie), aby uchwycić transakcje „mined”, „pending” i „dropped”. Możesz również wyszukać swoją transakcję, szukając transakcji wysłanych na adres `0x31b98d14007bdee637298086988a0bbd31184523` .

Aby wyświetlić szczegóły swojej transakcji po jej znalezieniu, wybierz hash transakcji, co powinno przenieść Cię do widoku wyglądającego tak:

![Zrzut ekranu obserwatora mempoola](./mempool.png)

Stamtąd możesz wyświetlić swoją transakcję w Etherscan, klikając ikonę zakreśloną na czerwono!

**Hura! Właśnie wysłałeś swoją pierwszą transakcję Ethereum przy użyciu Alchemy 🎉**

_Aby przekazać opinie i sugestie dotyczące tego przewodnika, napisz do Elana na [Discordzie](https://discord.gg/A39JVCM) Alchemy!_

_Pierwotnie opublikowane przez Alchemy._
