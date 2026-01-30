---
title: Wysyłanie transakcji za pomocą Web3
description: "To jest przyjazny dla początkujących przewodnik po wysyłaniu transakcji Ethereum za pomocą Web3. Istnieją trzy główne kroki, aby wysłać transakcję do blockchaina Ethereum: tworzenie, podpisywanie i rozgłaszanie. Omówimy wszystkie trzy."
author: "Elan Halpern"
tags: [ "transakcje", "web3.js", "alchemy" ]
skill: beginner
lang: pl
published: 2020-11-04
source: Dokumentacja Alchemy
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

To jest przyjazny dla początkujących przewodnik po wysyłaniu transakcji Ethereum za pomocą Web3. Istnieją trzy główne kroki, aby wysłać transakcję do blockchaina Ethereum: tworzenie, podpisywanie i rozgłaszanie. Omówimy wszystkie trzy, mając nadzieję, że odpowiemy na wszelkie pytania, jakie możesz mieć! W tym samouczku będziemy używać [Alchemy](https://www.alchemy.com/), aby wysyłać nasze transakcje do łańcucha Ethereum. Możesz [utworzyć darmowe konto Alchemy tutaj](https://auth.alchemyapi.io/signup).

**UWAGA:** Ten przewodnik dotyczy podpisywania transakcji w _backendzie_ aplikacji. Jeśli chcesz zintegrować podpisywanie transakcji we frontendzie, sprawdź integrację [Web3 z dostawcą przeglądarki](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Podstawy {#the-basics}

Podobnie jak większość deweloperów blockchain na początku swojej drogi, być może szukałeś informacji o tym, jak wysłać transakcję (coś, co powinno być całkiem proste) i natknąłeś się na mnóstwo przewodników, z których każdy mówił co innego, co sprawiło, że czułeś się nieco przytłoczony i zdezorientowany. Jeśli jesteś w takiej sytuacji, nie martw się; wszyscy kiedyś byliśmy! Zanim więc zaczniemy, wyjaśnijmy sobie kilka kwestii:

### 1. Alchemy nie przechowuje Twoich kluczy prywatnych {#alchemy-does-not-store-your-private-keys}

- Oznacza to, że Alchemy nie może podpisywać i wysyłać transakcji w Twoim imieniu. Dzieje się tak ze względów bezpieczeństwa. Alchemy nigdy nie poprosi Cię o udostępnienie Twojego klucza prywatnego i nigdy nie powinieneś go udostępniać hostowanemu węzłowi (ani nikomu innemu).
- Możesz odczytywać dane z blockchaina za pomocą podstawowego API Alchemy, ale aby do niego zapisywać, musisz użyć czegoś innego do podpisania swoich transakcji przed wysłaniem ich przez Alchemy (to samo dotyczy każdej innej [usługi węzłów](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. Czym jest „signer”? {#what-is-a-signer}

- Signerzy podpisują dla Ciebie transakcje, używając Twojego klucza prywatnego. W tym samouczku do podpisania naszej transakcji użyjemy [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), ale można również użyć dowolnej innej biblioteki web3.
- We frontendzie dobrym przykładem signera jest [MetaMask](https://metamask.io/), który podpisuje i wysyła transakcje w Twoim imieniu.

### 3. Dlaczego muszę podpisywać swoje transakcje? {#why-do-i-need-to-sign-my-transactions}

- Każdy użytkownik, który chce wysłać transakcję w sieci Ethereum, musi ją podpisać (używając swojego klucza prywatnego), aby zweryfikować, że pochodzenie transakcji jest zgodne z deklarowanym.
- Niezwykle ważne jest, aby chronić ten klucz prywatny, ponieważ posiadanie do niego dostępu daje pełną kontrolę nad kontem Ethereum, pozwalając Tobie (lub każdemu, kto ma dostęp) na wykonywanie transakcji w Twoim imieniu.

### 4. Jak chronić mój klucz prywatny? {#how-do-i-protect-my-private-key}

- Istnieje wiele sposobów na ochronę klucza prywatnego i używanie go do wysyłania transakcji. W tym samouczku będziemy używać pliku `.env`. Można jednak również skorzystać z osobnego dostawcy, który przechowuje klucze prywatne, użyć pliku keystore lub innych opcji.

### 5. Jaka jest różnica między `eth_sendTransaction` a `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` i `eth_sendRawTransaction` to funkcje API Ethereum, które rozgłaszają transakcję w sieci Ethereum, aby została ona dodana do przyszłego bloku. Różnią się one sposobem obsługi podpisywania transakcji.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) służy do wysyłania _niepodpisanych_ transakcji, co oznacza, że węzeł, do którego je wysyłasz, musi zarządzać Twoim kluczem prywatnym, aby mógł podpisać transakcję przed jej rozgłoszeniem w łańcuchu. Ponieważ Alchemy nie przechowuje kluczy prywatnych użytkowników, nie obsługuje tej metody.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) służy do rozgłaszania transakcji, które zostały już podpisane. Oznacza to, że najpierw musisz użyć [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), a następnie przekazać wynik do `eth_sendRawTransaction`.

Podczas korzystania z web3 dostęp do `eth_sendRawTransaction` uzyskuje się poprzez wywołanie funkcji [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Tego właśnie będziemy używać w tym samouczku.

### 6. Czym jest biblioteka web3? {#what-is-the-web3-library}

- Web3.js jest biblioteką opakowującą standardowe wywołania JSON-RPC, która jest dość często używana w deweloperce Ethereum.
- Istnieje wiele bibliotek web3 dla różnych języków. W tym samouczku będziemy używać [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), który jest napisany w języku JavaScript. Możesz sprawdzić inne opcje [tutaj](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), takie jak [ethers.js](https://docs.ethers.org/v5/).

OK, teraz, gdy odpowiedzieliśmy na kilka pytań, przejdźmy do samouczka. W każdej chwili możesz zadawać pytania na [discordzie](https://discord.gg/gWuC7zB) Alchemy!

### 7. Jak wysyłać bezpieczne, zoptymalizowane pod kątem opłat za gaz i prywatne transakcje? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ma zestaw interfejsów API Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Możesz ich używać do wysyłania wzmocnionych transakcji, symulowania transakcji przed ich wykonaniem, wysyłania transakcji prywatnych oraz wysyłania transakcji zoptymalizowanych pod względem opłat za gaz.
- Możesz również użyć [API Notify](https://docs.alchemy.com/docs/alchemy-notify), aby otrzymywać powiadomienia, gdy Twoja transakcja zostanie pobrana z mempoola i dodana do łańcucha.

**UWAGA:** Ten przewodnik wymaga posiadania konta Alchemy, adresu Ethereum lub portfela MetaMask oraz zainstalowanych NodeJs i npm. Jeśli nie, wykonaj następujące kroki:

1. [Utwórz darmowe konto Alchemy](https://auth.alchemyapi.io/signup)
2. [Utwórz konto MetaMask](https://metamask.io/) (lub uzyskaj adres Ethereum)
3. [Wykonaj te kroki, aby zainstalować NodeJs i NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Kroki wysyłania transakcji {#steps-to-sending-your-transaction}

### 1. Utwórz aplikację Alchemy w sieci testowej Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Przejdź do swojego [Panelu Alchemy](https://dashboard.alchemyapi.io/) i utwórz nową aplikację, wybierając Sepolia (lub dowolną inną sieć testową) jako swoją sieć.

### 2. Poproś o ETH z kranu Sepolia {#request-eth-from-sepolia-faucet}

Postępuj zgodnie z instrukcjami na stronie [kranu Sepolia od Alchemy](https://www.sepoliafaucet.com/), aby otrzymać ETH. Upewnij się, że podajesz swój adres Ethereum **Sepolia** (z MetaMask), a nie z innej sieci. Po wykonaniu instrukcji sprawdź, czy otrzymałeś ETH w swoim portfelu.

### 3. Utwórz nowy katalog projektu i przejdź do niego za pomocą `cd` {#create-a-new-project-direction}

Utwórz nowy katalog projektu z wiersza poleceń (terminal na komputerach Mac) i przejdź do niego:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Zainstaluj Alchemy Web3 (lub dowolną bibliotekę web3) {#install-alchemy-web3}

Uruchom następujące polecenie w katalogu projektu, aby zainstalować [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Uwaga, jeśli chcesz użyć biblioteki ethers.js, [postępuj zgodnie z instrukcjami podanymi tutaj](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Zainstaluj dotenv {#install-dotenv}

Użyjemy pliku `.env` do bezpiecznego przechowywania naszego klucza API i klucza prywatnego.

```
npm install dotenv --save
```

### 6. Utwórz plik `.env` {#create-the-dotenv-file}

Utwórz plik `.env` w katalogu projektu i dodaj następującą treść (zastępując „`your-api-url`” i „`your-private-key`”):

- Aby znaleźć adres URL interfejsu API Alchemy, przejdź do strony szczegółów aplikacji, którą właśnie utworzyłeś w panelu, kliknij „View Key” w prawym górnym rogu i pobierz adres URL HTTP.
- Aby znaleźć swój klucz prywatny za pomocą MetaMask, zapoznaj się z tym [przewodnikiem](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nie commituj pliku <code>.env</code>! Upewnij się, że nigdy nie udostępniasz ani nie ujawniasz nikomu swojego pliku <code>.env</code>, ponieważ w ten sposób narażasz swoje poufne dane. Jeśli używasz kontroli wersji, dodaj swój plik <code>.env</code> do pliku <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Utwórz plik `sendTx.js` {#create-sendtx-js}

Świetnie, teraz, gdy nasze poufne dane są chronione w pliku `.env`, zacznijmy kodować. W naszym przykładzie wysyłania transakcji będziemy odsyłać ETH z powrotem do kranu Sepolia.

Utwórz plik `sendTx.js`, w którym skonfigurujemy i wyślemy naszą przykładową transakcję, i dodaj do niego następujące linie kodu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: zastąp ten adres swoim własnym adresem publicznym

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce zaczyna liczyć od 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // adres kranu, na który ma być zwrócony eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // opcjonalne pole danych do wysłania wiadomości lub wykonania smart kontraktu
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 Hasz Twojej transakcji to: ", hash, "\n Sprawdź Mempool Alchemy, aby zobaczyć status swojej transakcji!");
    } else {
      console.log("❗Coś poszło nie tak podczas przesyłania transakcji:", error)
    }
   });
}

main();
```

Pamiętaj, aby zastąpić adres w **wierszu 6** swoim własnym adresem publicznym.

Zanim przejdziemy do uruchomienia tego kodu, omówmy kilka jego komponentów.

- `nonce`: Specyfikacja nonce służy do śledzenia liczby transakcji wysłanych z Twojego adresu. Potrzebujemy tego ze względów bezpieczeństwa i aby zapobiegać [atakom typu replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Aby uzyskać liczbę transakcji wysłanych z Twojego adresu, używamy [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Obiekt transakcji ma kilka aspektów, które musimy określić.
  - `to`: Jest to adres, na który chcemy wysłać ETH. W tym przypadku odsyłamy ETH z powrotem do [kranu Sepolia](https://sepoliafaucet.com/), z którego pierwotnie je pozyskaliśmy.
  - `value`: Jest to kwota, którą chcemy wysłać, określona w Wei, gdzie 10^18 Wei = 1 ETH.
  - `gas`: Istnieje wiele sposobów na określenie odpowiedniej ilości gazu do uwzględnienia w transakcji. Alchemy ma nawet [webhook ceny gazu](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1), który powiadamia, gdy cena gazu spadnie poniżej określonego progu. W przypadku transakcji w sieci głównej Mainnet dobrą praktyką jest sprawdzanie estymatora gazu, takiego jak [ETH Gas Station](https://ethgasstation.info/), w celu określenia właściwej ilości gazu do uwzględnienia. 21000 to minimalna ilość gazu, jaką zużyje operacja na Ethereum, więc aby zapewnić, że nasza transakcja zostanie wykonana, wpisujemy tutaj 30000.
  - `nonce`: patrz definicja nonce powyżej. Nonce zaczyna liczyć od zera.
  - [OPCJONALNE] dane: Służy do wysyłania dodatkowych informacji wraz z transferem lub wywoływania smart kontraktu. Nie jest wymagane w przypadku transferów salda. Sprawdź uwagę poniżej.
- `signedTx`: Aby podpisać nasz obiekt transakcji, użyjemy metody `signTransaction` z naszym `PRIVATE_KEY`.
- `sendSignedTransaction`: Gdy mamy już podpisaną transakcję, możemy ją wysłać, aby została uwzględniona w kolejnym bloku, używając `sendSignedTransaction`.

**Uwaga na temat danych**
Istnieją dwa główne typy transakcji, które można wysyłać w Ethereum.

- Transfer salda: Wyślij ETH z jednego adresu na drugi. Pole danych nie jest wymagane, jednak jeśli chcesz wysłać dodatkowe informacje wraz z transakcją, możesz je umieścić w tym polu w formacie HEX.
  - Załóżmy na przykład, że chcemy zapisać hasz dokumentu IPFS w łańcuchu Ethereum, aby nadać mu niezmienny znacznik czasu. Nasze pole danych powinno wtedy wyglądać następująco: `web3.utils.toHex(‘hasz IPFS‘)`. I teraz każdy może odpytać łańcuch i zobaczyć, kiedy ten dokument został dodany.
- Transakcja smart kontraktu: wykonanie kodu smart kontraktu w łańcuchu. W tym przypadku pole danych powinno zawierać inteligentną funkcję, którą chcesz wykonać, wraz z wszelkimi parametrami.
  - Praktyczny przykład znajdziesz w kroku 8 tego [samouczka „Witaj, świecie”](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Uruchom kod za pomocą `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Wróć do terminala lub wiersza poleceń i uruchom:

```
node sendTx.js
```

### 9. Zobacz swoją transakcję w Mempoolu {#see-your-transaction-in-the-mempool}

Otwórz [stronę Mempool](https://dashboard.alchemyapi.io/mempool) w panelu Alchemy i filtruj według utworzonej aplikacji, aby znaleźć swoją transakcję. Tutaj możemy obserwować przejście naszej transakcji ze stanu oczekującego do stanu wydobycia (jeśli się powiedzie) lub do stanu porzucenia, jeśli się nie powiedzie. Upewnij się, że opcja jest ustawiona na „Wszystkie”, aby przechwycić transakcje „wydobyte”, „oczekujące” i „porzucone”. Możesz również wyszukać swoją transakcję, szukając transakcji wysłanych na adres `0x31b98d14007bdee637298086988a0bbd31184523`.

Aby wyświetlić szczegóły transakcji po jej znalezieniu, wybierz jej hasz, co powinno przenieść Cię do widoku, który wygląda następująco:

![Zrzut ekranu obserwatora Mempool](./mempool.png)

Stamtąd możesz wyświetlić swoją transakcję w Etherscan, klikając ikonę zaznaczoną na czerwono!

**Huraaa! Właśnie wysłałeś swoją pierwszą transakcję Ethereum za pomocą Alchemy 🎉**

_Aby uzyskać opinie i sugestie dotyczące tego przewodnika, wyślij wiadomość do Elan na [Discordzie](https://discord.gg/A39JVCM) Alchemy!_

_Oryginalnie opublikowano na stronie [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
