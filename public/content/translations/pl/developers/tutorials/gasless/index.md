---
title: "Sponsorowanie opłat za gaz: Jak pokryć koszty transakcji dla swoich użytkowników"
description: Łatwo jest utworzyć klucz prywatny i adres; to tylko kwestia uruchomienia odpowiedniego oprogramowania. Jednak w wielu miejscach na świecie zdobycie ETH do wysyłania transakcji jest znacznie trudniejsze. W tym samouczku dowiesz się, jak pokryć koszty gazu onchain za wykonanie podpisanych przez użytkownika, ustrukturyzowanych danych offchain w Twoim inteligentnym kontrakcie. Użytkownik podpisuje strukturę zawierającą informacje o transakcji, którą Twój kod offchain następnie przesyła do blockchaina jako transakcję.
author: Ori Pomerantz
tags: ["bez gazu", "Solidity", "EIP-712", "metatransakcje"]
skill: intermediate
breadcrumb: Sponsorowanie gazu
lang: pl
published: 2026-02-27
---

## Wprowadzenie {#introduction}

Jeśli chcemy, aby Ethereum służyło [kolejnemu miliardowi ludzi](https://blog.ethereum.org/category/next-billion), musimy usunąć przeszkody i uczynić je tak łatwym w użyciu, jak to tylko możliwe. Jednym ze źródeł tych trudności jest konieczność posiadania ETH do uiszczania opłat za gaz.

Jeśli masz zdecentralizowaną aplikację (dapp), która zarabia na użytkownikach, sensowne może być umożliwienie im przesyłania transakcji przez Twój serwer i samodzielne opłacanie kosztów transakcji. Ponieważ użytkownicy nadal podpisują [wiadomość autoryzacyjną EIP-712](https://eips.ethereum.org/EIPS/eip-712) w swoich portfelach, zachowują gwarancje integralności Ethereum. Dostępność zależy od serwera przekazującego transakcje, więc jest bardziej ograniczona. Możesz jednak skonfigurować wszystko tak, aby użytkownicy mogli również uzyskiwać bezpośredni dostęp do inteligentnego kontraktu (jeśli zdobędą ETH), a inni mogli konfigurować własne serwery, jeśli chcą sponsorować transakcje.

Technika opisana w tym samouczku działa tylko wtedy, gdy kontrolujesz inteligentny kontrakt. Istnieją inne techniki, w tym [abstrakcja konta](https://eips.ethereum.org/EIPS/eip-4337), które pozwalają sponsorować transakcje do innych inteligentnych kontraktów, co mam nadzieję omówić w przyszłym samouczku.

Uwaga: To _nie_ jest kod gotowy do wdrożenia na produkcję. Jest podatny na poważne ataki i brakuje mu kluczowych funkcji. Dowiedz się więcej w [sekcji dotyczącej luk w zabezpieczeniach tego przewodnika](#vulnerabilities).

### Wymagania wstępne {#prerequisites}

Aby zrozumieć ten samouczek, musisz już znać:

- Solidity
- JavaScript
- React i WAGMI. Jeśli nie znasz tych narzędzi interfejsu użytkownika, [mamy do tego samouczek](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Przykładowa aplikacja {#sample-app}

Przykładowa aplikacja jest wariantem kontraktu `Greeter` narzędzia Hardhat. Możesz ją zobaczyć [na GitHubie](https://github.com/qbzzt/260301-gasless). Inteligentny kontrakt jest już wdrożony w sieci [Sepolia](https://sepolia.dev/), pod adresem [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Aby zobaczyć ją w akcji, wykonaj następujące kroki.

1. Sklonuj repozytorium i zainstaluj niezbędne oprogramowanie.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Edytuj plik `.env`, aby ustawić `PRIVATE_KEY` na portfel, który posiada ETH w sieci Sepolia. Jeśli potrzebujesz Sepolia ETH, [użyj kranika](/developers/docs/networks/#sepolia). W idealnym przypadku ten klucz prywatny powinien być inny niż ten, który masz w portfelu w przeglądarce.

3. Uruchom serwer.

   ```sh
   npm run dev
   ```

4. Przejdź do aplikacji pod adresem URL [`http://localhost:5173`](http://localhost:5173).

5. Kliknij **Connect with Injected**, aby połączyć się z portfelem. Zatwierdź w portfelu i w razie potrzeby zatwierdź zmianę sieci na Sepolia.

6. Wpisz nowe powitanie i kliknij **Update greeting via sponsor**.

7. Podpisz wiadomość.

8. Poczekaj około 12 sekund (czas bloku w sieci Sepolia). W trakcie oczekiwania możesz spojrzeć na adres URL w konsoli serwera, aby zobaczyć transakcję.

9. Zobacz, że powitanie uległo zmianie, a wartość adresu ostatniej aktualizacji to teraz adres Twojego portfela w przeglądarce.

Aby zrozumieć, jak to działa, musimy przyjrzeć się, jak wiadomość jest tworzona w interfejsie użytkownika, jak jest przekazywana przez serwer i jak przetwarza ją inteligentny kontrakt.

### Interfejs użytkownika {#ui-changes}

Interfejs użytkownika oparty jest na [WAGMI](https://wagmi.sh/); możesz o nim przeczytać [w tym samouczku](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Oto jak podpisujemy wiadomość:

```js
const signGreeting = useCallback(
```

Hook Reacta [`useCallback`](https://react.dev/reference/react/useCallback) pozwala nam poprawić wydajność poprzez ponowne użycie tej samej funkcji podczas ponownego renderowania komponentu.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Jeśli nie ma konta, zgłoś błąd. To nigdy nie powinno się zdarzyć, ponieważ przycisk interfejsu użytkownika, który uruchamia proces wywołujący `signGreeting`, jest w takim przypadku wyłączony. Jednak przyszli programiści mogą usunąć to zabezpieczenie, więc dobrym pomysłem jest sprawdzenie tego warunku również tutaj.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parametry dla [separatora domeny](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Ta wartość jest stała, więc w lepiej zoptymalizowanej implementacji moglibyśmy obliczyć ją raz, zamiast przeliczać za każdym razem, gdy funkcja jest wywoływana.

- `name` to czytelna dla użytkownika nazwa, taka jak nazwa zdecentralizowanej aplikacji (dapp), dla której generujemy podpisy.
- `version` to wersja. Różne wersje nie są ze sobą kompatybilne.
- `chainId` to łańcuch, którego używamy, dostarczony [przez WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` to adres kontraktu, który zweryfikuje ten podpis. Nie chcemy, aby ten sam podpis miał zastosowanie do wielu kontraktów, na wypadek gdyby istniało kilka kontraktów `Greeter` i chcielibyśmy, aby miały różne powitania.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Typ danych, który podpisujemy. Tutaj mamy pojedynczy parametr, `greeting`, ale systemy w świecie rzeczywistym zazwyczaj mają ich więcej.

```js
        const message = { greeting }
```

Właściwa wiadomość, którą chcemy podpisać i wysłać. `greeting` to zarówno nazwa pola, jak i nazwa zmiennej, która je wypełnia.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Właściwe pobranie podpisu. Ta funkcja jest asynchroniczna, ponieważ użytkownikom zajmuje dużo czasu (z perspektywy komputera) podpisanie danych.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

Funkcja zwraca pojedynczą wartość szesnastkową. Tutaj dzielimy ją na pola.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Jeśli którakolwiek z tych zmiennych ulegnie zmianie, utwórz nową instancję funkcji. Parametry `account` i `chainId` mogą zostać zmienione przez użytkownika w portfelu. `contractAddr` jest funkcją identyfikatora łańcucha (chain Id). `signTypedDataAsync` nie powinno się zmieniać, ale importujemy je z [hooka](https://wagmi.sh/react/api/hooks/useSignTypedData), więc nie możemy być pewni i najlepiej dodać je tutaj.

Teraz, gdy nowe powitanie jest podpisane, musimy wysłać je do serwera.

```js
  const sponsoredGreeting = async () => {
    try {
```

Ta funkcja przyjmuje podpis i wysyła go do serwera.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Wyślij na ścieżkę `/server/sponsor` na serwerze, z którego przyszliśmy.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Użyj `POST`, aby wysłać informacje zakodowane w formacie JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Wypisz odpowiedź. W systemie produkcyjnym pokazalibyśmy również odpowiedź użytkownikowi.

### Serwer {#server}

Lubię używać [Vite](https://vite.dev/) jako mojego front-endu. Automatycznie serwuje biblioteki Reacta i aktualizuje przeglądarkę, gdy zmienia się kod front-endu. Jednak Vite nie zawiera narzędzi backendowych.

Rozwiązanie znajduje się w [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Niech Vite zajmie się całą resztą
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Najpierw rejestrujemy procedurę obsługi (handler) dla żądań, które obsługujemy sami (`POST` do `/server/sponsor`). Następnie tworzymy i używamy serwera Vite do obsługi wszystkich innych adresów URL.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

To tylko standardowe wywołanie blockchaina za pomocą [viem](https://viem.sh/).

### Inteligentny kontrakt {#smart-contract}

Na koniec, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) musi zweryfikować podpis.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Konstruktor tworzy [separator domeny](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), podobnie jak w powyższym kodzie interfejsu użytkownika. Wykonywanie operacji na blockchainie jest znacznie droższe, więc obliczamy go tylko raz.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

To jest struktura, która zostaje podpisana. Tutaj mamy tylko jedno pole.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

To jest [identyfikator struktury](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Jest on obliczany za każdym razem w interfejsie użytkownika.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Ta funkcja odbiera podpisane żądanie i aktualizuje powitanie.

```solidity
        // Oblicz skrót EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Utwórz skrót (digest) zgodnie z [EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Odzyskaj podpisującego
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Użyj [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01), aby uzyskać adres podpisującego. Zauważ, że zły podpis nadal może skutkować prawidłowym adresem, po prostu losowym.

```solidity
        // Zastosuj powitanie, tak jakby wywołał je podpisujący
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Zaktualizuj powitanie.

## Luki w zabezpieczeniach {#vulnerabilities}

To _nie_ jest kod gotowy do wdrożenia na produkcję. Jest podatny na poważne ataki i brakuje mu kluczowych funkcji. Oto niektóre z nich, wraz ze sposobami ich rozwiązania.

Aby zobaczyć niektóre z tych ataków, kliknij przyciski pod nagłówkiem _Attacks_ i zobacz, co się stanie. W przypadku przycisku **Invalid signature**, sprawdź konsolę serwera, aby zobaczyć odpowiedź transakcji.

### Odmowa usługi (Denial of Service) na serwerze {#dos-on-server}

Najprostszym atakiem jest atak typu [odmowa usługi (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) na serwer. Serwer odbiera żądania z dowolnego miejsca w Internecie i na ich podstawie wysyła transakcje. Absolutnie nic nie powstrzymuje atakującego przed wygenerowaniem mnóstwa podpisów, ważnych lub nieważnych. Każdy z nich spowoduje transakcję. W końcu serwerowi zabraknie ETH na opłacenie gazu.

Jednym z rozwiązań tego problemu jest ograniczenie częstotliwości do jednej transakcji na blok. Jeśli celem jest pokazywanie powitań [kontom zewnętrznym (externally owned accounts)](/developers/docs/accounts/#key-differences), i tak nie ma znaczenia, jakie jest powitanie w środku bloku.

Innym rozwiązaniem jest śledzenie adresów i zezwalanie na podpisy tylko od zweryfikowanych klientów.

### Podpisy dla niewłaściwego powitania {#wrong-greeting-sigs}

Kiedy klikniesz **Signature for wrong greeting**, przesyłasz ważny podpis dla określonego adresu (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) i powitania (`Hello`). Ale przesyła go z innym powitaniem. To dezorientuje `ecrecover`, co zmienia powitanie, ale ma niewłaściwy adres.

Aby rozwiązać ten problem, dodaj adres do [podpisanej struktury](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). W ten sposób losowy adres z `ecrecover` nie będzie pasował do adresu w podpisie, a inteligentny kontrakt odrzuci wiadomość.

### Ataki typu replay (powtórzenia) {#replay-attack}

Kiedy klikniesz **Replay attack**, przesyłasz ten sam podpis „Jestem 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e i chciałbym, aby powitanie brzmiało `Hello`”, ale z poprawnym powitaniem. W rezultacie inteligentny kontrakt uważa, że adres (który nie jest Twój) zmienił powitanie z powrotem na `Hello`. Informacje potrzebne do zrobienia tego są publicznie dostępne w [informacjach o transakcji](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Jeśli stanowi to problem, jednym z rozwiązań jest dodanie [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Utwórz [mapowanie](https://docs.soliditylang.org/en/latest/types.html#mapping-types) między adresami a liczbami i dodaj pole nonce do podpisu. Jeśli pole nonce pasuje do mapowania dla danego adresu, zaakceptuj podpis i zwiększ wartość w mapowaniu na następny raz. Jeśli nie, odrzuć transakcję.

Innym rozwiązaniem jest dodanie znacznika czasu (timestamp) do podpisanych danych i akceptowanie podpisu jako ważnego tylko przez kilka sekund po tym znaczniku czasu. Jest to prostsze i tańsze, ale ryzykujemy atakami typu replay w tym oknie czasowym oraz niepowodzeniem legalnych transakcji, jeśli okno czasowe zostanie przekroczone.

## Inne brakujące funkcje {#other-missing-features}

Istnieją dodatkowe funkcje, które dodalibyśmy w środowisku produkcyjnym.

### Dostęp z innych serwerów {#other-servers}

Obecnie pozwalamy dowolnemu adresowi na przesłanie `sponsorSetGreeting`. Może to być dokładnie to, czego chcemy w interesie decentralizacji. A może chcemy mieć pewność, że sponsorowane transakcje przechodzą przez _nasz_ serwer, w którym to przypadku sprawdzalibyśmy `msg.sender` w inteligentnym kontrakcie.

Tak czy inaczej, powinna to być świadoma decyzja projektowa, a nie tylko wynik nieprzemyślenia tej kwestii.

### Obsługa błędów {#error-handling}

Użytkownik przesyła powitanie. Może zostanie ono zaktualizowane w następnym bloku. A może nie. Błędy są niewidoczne. W systemie produkcyjnym użytkownik powinien być w stanie rozróżnić te przypadki:

- Nowe powitanie nie zostało jeszcze przesłane
- Nowe powitanie zostało przesłane i jest w trakcie przetwarzania
- Nowe powitanie zostało odrzucone

## Podsumowanie {#conclusion}

W tym momencie powinieneś być w stanie stworzyć doświadczenie bez gazu dla użytkowników Twojej zdecentralizowanej aplikacji (dapp), kosztem pewnej centralizacji.

Jednak działa to tylko z inteligentnymi kontraktami, które obsługują ERC-712. Aby na przykład przetransferować token ERC-20, konieczne jest, aby transakcja została podpisana przez właściciela, a nie tylko wiadomość. Rozwiązaniem jest [abstrakcja konta (ERC-4337)](https://docs.erc4337.io/index.html). Mam nadzieję napisać o tym przyszły samouczek.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).