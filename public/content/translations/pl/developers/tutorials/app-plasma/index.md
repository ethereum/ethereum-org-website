---
title: Napisz aplikację typu Plasma chroniącą prywatność
description: W tym samouczku budujemy na wpół tajny bank dla depozytów. Bank jest scentralizowanym komponentem; zna saldo każdego użytkownika. Jednak te informacje nie są przechowywane onchain. Zamiast tego bank publikuje hash stanu. Za każdym razem, gdy ma miejsce transakcja, bank publikuje nowy hash wraz z dowodem z wiedzą zerową, że posiada podpisaną transakcję, która zmienia stan hasha na nowy. Po przeczytaniu tego samouczka zrozumiesz nie tylko, jak używać dowodów z wiedzą zerową, ale także dlaczego się ich używa i jak robić to bezpiecznie.
author: Ori Pomerantz
tags: ["wiedza zerowa", "serwer", "pozałańcuchowy", "prywatność"]
skill: advanced
breadcrumb: Aplikacja typu Plasma
lang: pl
published: 2025-10-15
---
## Wprowadzenie {#introduction}

W przeciwieństwie do [rollupów](/developers/docs/scaling/zk-rollups/), [sieci Plasma](/developers/docs/scaling/plasma) wykorzystują sieć główną Ethereum do zapewnienia integralności, ale nie dostępności. W tym artykule napiszemy aplikację, która zachowuje się jak Plasma, gdzie Ethereum gwarantuje integralność (brak nieautoryzowanych zmian), ale nie dostępność (scentralizowany komponent może ulec awarii i wyłączyć cały system).

Aplikacja, którą tu napiszemy, to bank chroniący prywatność. Różne adresy mają konta z saldami i mogą wysyłać pieniądze (ETH) na inne konta. Bank publikuje hashe stanu (kont i ich sald) oraz transakcji, ale przechowuje rzeczywiste salda pozałańcuchowo, gdzie mogą pozostać prywatne.

## Projekt {#design}

Nie jest to system gotowy do wdrożenia produkcyjnego, lecz narzędzie edukacyjne. W związku z tym został napisany z kilkoma upraszczającymi założeniami.

- Stała pula kont. Istnieje określona liczba kont, a każde konto należy do z góry określonego adresu. Znacznie upraszcza to system, ponieważ w dowodach z wiedzą zerową trudno jest obsługiwać struktury danych o zmiennym rozmiarze. W systemie gotowym do wdrożenia produkcyjnego możemy użyć [korzenia drzewa Merklego](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) jako hasha stanu i dostarczyć dowody Merklego dla wymaganych sald.

- Przechowywanie w pamięci. W systemie produkcyjnym musimy zapisywać wszystkie salda kont na dysku, aby zachować je w przypadku restartu. Tutaj nie ma problemu, jeśli informacje po prostu zostaną utracone.

- Tylko transfery. System produkcyjny wymagałby sposobu na deponowanie aktywów w banku i ich wypłacanie. Jednak celem tutaj jest jedynie zilustrowanie koncepcji, więc ten bank ogranicza się do transferów.

### Dowody z wiedzą zerową {#zero-knowledge-proofs}

Na podstawowym poziomie dowód z wiedzą zerową pokazuje, że prover zna pewne dane, _Data<sub>private</sub>_, takie że istnieje relacja _Relationship_ między pewnymi danymi publicznymi, _Data<sub>public</sub>_, a _Data<sub>private</sub>_. Weryfikator zna _Relationship_ oraz _Data<sub>public</sub>_.

Aby zachować prywatność, stany i transakcje muszą być prywatne. Jednak aby zapewnić integralność, potrzebujemy, aby [kryptograficzny hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) stanów był publiczny. Aby udowodnić osobom przesyłającym transakcje, że te transakcje rzeczywiście miały miejsce, musimy również publikować hashe transakcji.

W większości przypadków _Data<sub>private</sub>_ to dane wejściowe do programu dowodu z wiedzą zerową, a _Data<sub>public</sub>_ to dane wyjściowe.

Te pola w _Data<sub>private</sub>_ to:

- _State<sub>n</sub>_, stary stan
- _State<sub>n+1</sub>_, nowy stan
- _Transaction_, transakcja, która zmienia stary stan na nowy. Ta transakcja musi zawierać następujące pola:
  - _Destination address_ (adres docelowy), który otrzymuje transfer
  - _Amount_ (kwota), która jest transferowana
  - _Nonce_, aby upewnić się, że każda transakcja może zostać przetworzona tylko raz.
    Adres źródłowy nie musi znajdować się w transakcji, ponieważ można go odzyskać z podpisu.
- _Signature_ (podpis), podpis upoważniony do wykonania transakcji. W naszym przypadku jedynym adresem upoważnionym do wykonania transakcji jest adres źródłowy. Ponieważ nasz system z wiedzą zerową działa w określony sposób, oprócz podpisu Ethereum potrzebujemy również klucza publicznego konta.

Oto pola w _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_, hash starego stanu
- _Hash(State<sub>n+1</sub>)_, hash nowego stanu
- _Hash(Transaction)_, hash transakcji, która zmienia stan z _State<sub>n</sub>_ na _State<sub>n+1</sub>_.

Relacja sprawdza kilka warunków:

- Publiczne hashe są rzeczywiście poprawnymi hashami dla pól prywatnych.
- Transakcja, po zastosowaniu do starego stanu, skutkuje nowym stanem.
- Podpis pochodzi z adresu źródłowego transakcji.

Ze względu na właściwości kryptograficznych funkcji skrótu, udowodnienie tych warunków wystarczy do zapewnienia integralności.

### Struktury danych {#data-structures}

Podstawową strukturą danych jest stan przechowywany przez serwer. Dla każdego konta serwer śledzi saldo konta oraz [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), używany do zapobiegania [atakom typu replay](https://en.wikipedia.org/wiki/Replay_attack).

### Komponenty {#components}

Ten system wymaga dwóch komponentów:

- _Serwera_, który odbiera transakcje, przetwarza je i publikuje hashe w łańcuchu wraz z dowodami z wiedzą zerową.
- _Inteligentnego kontraktu_, który przechowuje hashe i weryfikuje dowody z wiedzą zerową, aby upewnić się, że przejścia stanów są prawidłowe.

### Przepływ danych i sterowania {#flows}

Oto sposoby, w jakie różne komponenty komunikują się w celu wykonania transferu z jednego konta na drugie.

1. Przeglądarka internetowa przesyła podpisaną transakcję z prośbą o transfer z konta podpisującego na inne konto.

2. Serwer weryfikuje, czy transakcja jest ważna:

   - Podpisujący ma konto w banku z wystarczającym saldem.
   - Odbiorca ma konto w banku.

3. Serwer oblicza nowy stan, odejmując transferowaną kwotę od salda podpisującego i dodając ją do salda odbiorcy.

4. Serwer oblicza dowód z wiedzą zerową, że zmiana stanu jest prawidłowa.

5. Serwer przesyła do Ethereum transakcję, która zawiera:

   - Hash nowego stanu
   - Hash transakcji (aby nadawca transakcji wiedział, że została przetworzona)
   - Dowód z wiedzą zerową, który udowadnia, że przejście do nowego stanu jest prawidłowe

6. Inteligentny kontrakt weryfikuje dowód z wiedzą zerową.

7. Jeśli dowód z wiedzą zerową zostanie pomyślnie zweryfikowany, inteligentny kontrakt wykonuje następujące akcje:
   - Aktualizuje hash obecnego stanu na hash nowego stanu
   - Emituje wpis w logach z hashem nowego stanu i hashem transakcji

### Narzędzia {#tools}

Do kodu po stronie klienta użyjemy [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) oraz [Wagmi](https://wagmi.sh/). Są to standardowe narzędzia w branży; jeśli ich nie znasz, możesz skorzystać z [tego samouczka](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Większość serwera jest napisana w języku JavaScript przy użyciu [Node](https://nodejs.org/en). Część dotycząca wiedzy zerowej jest napisana w języku [Noir](https://noir-lang.org/). Potrzebujemy wersji `1.0.0-beta.10`, więc po [zainstalowaniu Noir zgodnie z instrukcjami](https://noir-lang.org/docs/getting_started/quick_start), uruchom:

```
noirup -v 1.0.0-beta.10
```

Blockchain, którego używamy, to `anvil`, lokalny testowy blockchain będący częścią [Foundry](https://getfoundry.sh/introduction/installation).

## Implementacja {#implementation}

Ponieważ jest to złożony system, wdrożymy go etapami.

### Etap 1 - Ręczna wiedza zerowa {#stage-1}

W pierwszym etapie podpiszemy transakcję w przeglądarce, a następnie ręcznie przekażemy informacje do dowodu z wiedzą zerową. Kod wiedzy zerowej oczekuje otrzymania tych informacji w pliku `server/noir/Prover.toml` (udokumentowanym [tutaj](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Aby zobaczyć to w akcji:

1. Upewnij się, że masz zainstalowane [Node](https://nodejs.org/en/download) i [Noir](https://noir-lang.org/install). Najlepiej zainstalować je w systemie UNIX, takim jak macOS, Linux lub [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Pobierz kod etapu 1 i uruchom serwer WWW, aby udostępnić kod klienta.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Powodem, dla którego potrzebujesz tutaj serwera WWW, jest to, że aby zapobiec pewnym rodzajom oszustw, wiele portfeli (takich jak MetaMask) nie akceptuje plików serwowanych bezpośrednio z dysku.

3. Otwórz przeglądarkę z portfelem.

4. W portfelu wprowadź nową frazę odzyskiwania (passphrase). Pamiętaj, że spowoduje to usunięcie istniejącej frazy, więc _upewnij się, że masz kopię zapasową_.

   Fraza odzyskiwania to `test test test test test test test test test test test junk`, domyślna testowa fraza dla anvil.

5. Przejdź do [kodu po stronie klienta](http://localhost:5173/).

6. Połącz się z portfelem i wybierz konto docelowe oraz kwotę.

7. Kliknij **Sign** (Podpisz) i podpisz transakcję.

8. Pod nagłówkiem **Prover.toml** znajdziesz tekst. Zastąp zawartość pliku `server/noir/Prover.toml` tym tekstem.

9. Wykonaj dowód z wiedzą zerową.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Wynik powinien być podobny do:

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Porównaj dwie ostatnie wartości z hashem widocznym w przeglądarce internetowej, aby sprawdzić, czy wiadomość została poprawnie zhashowana.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) pokazuje format informacji oczekiwany przez Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Wiadomość jest w formacie tekstowym, co ułatwia użytkownikowi jej zrozumienie (co jest konieczne podczas podpisywania), a kodowi Noir jej parsowanie. Kwota jest podana w finneyach, aby z jednej strony umożliwić ułamkowe transfery, a z drugiej być łatwo czytelną. Ostatnia liczba to [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Ciąg znaków ma długość 100 znaków. Dowody z wiedzą zerową nie radzą sobie dobrze z danymi o zmiennej wielkości, dlatego często konieczne jest dopełnianie (padding) danych.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Te trzy parametry to tablice bajtów o stałym rozmiarze.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

W ten sposób określa się tablicę struktur. Dla każdego wpisu podajemy adres, saldo (w milliETH, czyli [finney](https://cryptovalleyjournal.com/glossary/finney/)) oraz następną wartość nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementuje przetwarzanie po stronie klienta i generuje plik `server/noir/Prover.toml` (ten, który zawiera parametry wiedzy zerowej).

Oto wyjaśnienie ciekawszych części.

```tsx
export default attrs =>  {
```

Ta funkcja tworzy komponent React `Transfer`, który mogą importować inne pliki.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Są to adresy kont, adresy utworzone przez frazę odzyskiwania `test ... test junk`. Jeśli chcesz użyć własnych adresów, po prostu zmodyfikuj tę definicję.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Te [hooki Wagmi](https://wagmi.sh/react/api/hooks) pozwalają nam na dostęp do biblioteki [Viem](https://viem.sh/) i portfela.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

To jest wiadomość, dopełniona spacjami. Za każdym razem, gdy zmienia się jedna ze zmiennych [`useState`](https://react.dev/reference/react/useState), komponent jest rysowany ponownie, a `message` jest aktualizowany.

```tsx
  const sign = async () => {
```

Ta funkcja jest wywoływana, gdy użytkownik kliknie przycisk **Sign** (Podpisz). Wiadomość jest automatycznie aktualizowana, ale podpis wymaga zatwierdzenia przez użytkownika w portfelu, a my nie chcemy o to prosić, chyba że jest to konieczne.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Poproś portfel o [podpisanie wiadomości](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

Pobierz hash wiadomości. Warto udostępnić go użytkownikowi w celu debugowania (kodu Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Pobierz klucz publiczny](https://viem.sh/docs/utilities/recoverPublicKey). Jest to wymagane dla funkcji [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Ustaw zmienne stanu. Zrobienie tego powoduje ponowne narysowanie komponentu (po zakończeniu funkcji `sign`) i pokazuje użytkownikowi zaktualizowane wartości.

```tsx
    let proverToml = `
```

Tekst dla `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem dostarcza nam klucz publiczny jako 65-bajtowy ciąg szesnastkowy. Pierwszy bajt to `0x04`, znacznik wersji. Następnie znajduje się 32 bajtów dla `x` klucza publicznego, a potem 32 bajty dla `y` klucza publicznego.

Jednak Noir oczekuje otrzymania tych informacji jako dwóch tablic bajtów, jednej dla `x` i jednej dla `y`. Łatwiej jest to sparsować tutaj, po stronie klienta, niż jako część dowodu z wiedzą zerową.

Zauważ, że jest to ogólnie dobra praktyka w przypadku wiedzy zerowej. Kod wewnątrz dowodu z wiedzą zerową jest kosztowny, więc każde przetwarzanie, które można wykonać poza dowodem z wiedzą zerową, _powinno_ zostać wykonane poza nim.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Podpis jest również dostarczany jako 65-bajtowy ciąg szesnastkowy. Jednak ostatni bajt jest potrzebny tylko do odzyskania klucza publicznego. Ponieważ klucz publiczny zostanie już dostarczony do kodu Noir, nie potrzebujemy go do weryfikacji podpisu, a kod Noir go nie wymaga.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Podaj konta.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

To jest format HTML (a dokładniej [JSX](https://react.dev/learn/writing-markup-with-jsx)) komponentu.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) to właściwy kod wiedzy zerowej.

```
use std::hash::pedersen_hash;
```

[Hash Pedersena](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) jest dostarczany z [biblioteką standardową Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Dowody z wiedzą zerową powszechnie używają tej funkcji skrótu. Jest ona znacznie łatwiejsza do obliczenia wewnątrz [obwodów arytmetycznych](https://rareskills.io/post/arithmetic-circuit) w porównaniu do standardowych funkcji skrótu.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Te dwie funkcje to zewnętrzne biblioteki, zdefiniowane w [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Robią dokładnie to, na co wskazują ich nazwy: funkcja obliczająca [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) oraz funkcja weryfikująca podpisy Ethereum i odzyskująca adres Ethereum podpisującego.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir jest inspirowany językiem [Rust](https://www.rust-lang.org/). Zmienne domyślnie są stałymi. W ten sposób definiujemy globalne stałe konfiguracyjne. W szczególności `ACCOUNT_NUMBER` to liczba kont, które przechowujemy.

Typy danych o nazwie `u<number>` to bez znaku (unsigned) liczby o podanej liczbie bitów. Jedyne obsługiwane typy to `u8`, `u16`, `u32`, `u64` i `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Ta zmienna jest używana do hasha Pedersena kont, jak wyjaśniono poniżej.

```
global MESSAGE_LENGTH : u32 = 100;
```

Jak wyjaśniono powyżej, długość wiadomości jest stała. Jest ona określona tutaj.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Podpisy EIP-191](https://eips.ethereum.org/EIPS/eip-191) wymagają bufora z 26-bajtowym prefiksem, po którym następuje długość wiadomości w ASCII, a na końcu sama wiadomość.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Informacje, które przechowujemy o koncie. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) to liczba, zazwyczaj do 253 bitów, która może być użyta bezpośrednio w [obwodzie arytmetycznym](https://rareskills.io/post/arithmetic-circuit) implementującym dowód z wiedzą zerową. Tutaj używamy `Field` do przechowywania 160-bitowego adresu Ethereum.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Informacje, które przechowujemy dla transakcji transferu.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Definicja funkcji. Parametrem są informacje o `Account`. Wynikiem jest tablica zmiennych `Field`, której długość wynosi `FLAT_ACCOUNT_FIELDS`.

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Pierwsza wartość w tablicy to adres konta. Druga zawiera zarówno saldo, jak i nonce. Wywołania `.into()` zmieniają liczbę na wymagany typ danych. `account.nonce` to wartość `u32`, ale aby dodać ją do `account.balance << 32`, wartości `u128`, musi ona być typu `u128`. To jest pierwsze `.into()`. Drugie konwertuje wynik `u128` na `Field`, aby pasował do tablicy.

```
flat
}
```

W Noir funkcje mogą zwracać wartość tylko na końcu (nie ma wczesnego powrotu - early return). Aby określić zwracaną wartość, ewaluujesz ją tuż przed nawiasem zamykającym funkcję.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Ta funkcja zamienia tablicę kont w tablicę `Field`, która może być użyta jako wejście do hasha Pedersena.

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

W ten sposób określa się zmienną mutowalną, czyli _nie_ stałą. Zmienne w Noir muszą zawsze mieć wartość, więc inicjujemy tę zmienną samymi zerami.

```
for i in 0..ACCOUNT_NUMBER {
```

To jest pętla `for`. Zauważ, że granice są stałymi. Pętle w Noir muszą mieć granice znane w czasie kompilacji. Powodem jest to, że obwody arytmetyczne nie obsługują sterowania przepływem. Podczas przetwarzania pętli `for` kompilator po prostu umieszcza kod wewnątrz niej wielokrotnie, po jednym razie dla każdej iteracji.

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Wreszcie dotarliśmy do funkcji, która hashuje tablicę kont.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Ta funkcja znajduje konto o określonym adresie. Funkcja ta byłaby strasznie nieefektywna w standardowym kodzie, ponieważ iteruje po wszystkich kontach, nawet po znalezieniu adresu.

Jednak w dowodach z wiedzą zerową nie ma sterowania przepływem. Jeśli kiedykolwiek musimy sprawdzić warunek, musimy to robić za każdym razem.

Podobna sytuacja ma miejsce w przypadku instrukcji `if`. Instrukcja `if` w powyższej pętli jest tłumaczona na te matematyczne wyrażenia.

_condition<sub>result</sub> = accounts[i].address == address_ // jeden, jeśli są równe, zero w przeciwnym razie

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Funkcja [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) powoduje awarię dowodu z wiedzą zerową, jeśli asercja jest fałszywa. W tym przypadku, jeśli nie możemy znaleźć konta z odpowiednim adresem. Aby zgłosić adres, używamy [ciągu formatującego](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Ta funkcja stosuje transakcję transferu i zwraca nową tablicę kont.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

W Noir nie możemy uzyskać dostępu do elementów struktury wewnątrz ciągu formatującego, więc tworzymy użyteczną kopię.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Są to dwa warunki, które mogłyby sprawić, że transakcja będzie nieważna.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Utwórz nową tablicę kont, a następnie ją zwróć.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Ta funkcja odczytuje adres z wiadomości. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Adres ma zawsze 20 bajtów (czyli 40 cyfr szesnastkowych) długości i zaczyna się od znaku nr 7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Odczytaj kwotę i nonce z wiadomości. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

W wiadomości pierwsza liczba po adresie to kwota finneyów (czyli tysięcznych części ETH) do przetransferowania. Druga liczba to nonce. Dowolny tekst między nimi jest ignorowany.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Właśnie to znaleźliśmy
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Zwracanie [krotki (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) to sposób Noir na zwrócenie wielu wartości z funkcji.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Ta funkcja konwertuje wiadomość na bajty, a następnie konwertuje kwoty na `TransferTxn`.

```rust
// Odpowiednik hashMessage z Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Mogliśmy użyć hasha Pedersena dla kont, ponieważ są one hashowane tylko wewnątrz dowodu z wiedzą zerową. Jednak w tym kodzie musimy sprawdzić podpis wiadomości, który jest generowany przez przeglądarkę. W tym celu musimy postępować zgodnie z formatem podpisywania Ethereum w [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Oznacza to, że musimy utworzyć połączony bufor ze standardowym prefiksem, długością wiadomości w ASCII i samą wiadomością, a następnie użyć standardowego dla Ethereum keccak256 do jego zhashowania.

```rust
    // Prefiks ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Aby uniknąć przypadków, w których aplikacja prosi użytkownika o podpisanie wiadomości, która może zostać użyta jako transakcja lub w innym celu, EIP-191 określa, że wszystkie podpisane wiadomości zaczynają się od znaku 0x19 (nie jest to prawidłowy znak ASCII), po którym następuje `Ethereum Signed Message:` i znak nowej linii.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Obsługuj długości wiadomości do 999 i zgłaszaj błąd, jeśli jest większa. Dodałem ten kod, mimo że długość wiadomości jest stałą, ponieważ ułatwia to jej zmianę. W systemie produkcyjnym prawdopodobnie po prostu założyłbyś, że `MESSAGE_LENGTH` się nie zmienia, w celu uzyskania lepszej wydajności.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Użyj standardowej dla Ethereum funkcji `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // adres, pierwsze 16 bajtów hasha, ostatnie 16 bajtów hasha        
{
```

Ta funkcja weryfikuje podpis, co wymaga hasha wiadomości. Następnie dostarcza nam adres, który go podpisał, oraz hash wiadomości. Hash wiadomości jest dostarczany w dwóch wartościach `Field`, ponieważ są one łatwiejsze do użycia w reszcie programu niż tablica bajtów.

Musimy użyć dwóch wartości `Field`, ponieważ obliczenia na ciałach (fields) są wykonywane [modulo](https://en.wikipedia.org/wiki/Modulo) duża liczba, ale ta liczba jest zazwyczaj mniejsza niż 256 bitów (w przeciwnym razie trudno byłoby wykonać te obliczenia w EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Określ `hash1` i `hash2` jako zmienne mutowalne i zapisz w nich hash bajt po bajcie.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Jest to podobne do [`ecrecover` w Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), z dwiema ważnymi różnicami:

- Jeśli podpis jest nieważny, wywołanie nie przechodzi `assert` i program zostaje przerwany.
- Chociaż klucz publiczny można odzyskać z podpisu i hasha, jest to przetwarzanie, które można wykonać zewnętrznie, a zatem nie warto go robić wewnątrz dowodu z wiedzą zerową. Jeśli ktoś spróbuje nas tutaj oszukać, weryfikacja podpisu się nie powiedzie.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash starej tablicy kont
        Field,  // Hash nowej tablicy kont
        Field,  // Pierwsze 16 bajtów hasha wiadomości
        Field,  // Ostatnie 16 bajtów hasha wiadomości
    )
```

Wreszcie docieramy do funkcji `main`. Musimy udowodnić, że mamy transakcję, która w prawidłowy sposób zmienia hash kont ze starej wartości na nową. Musimy również udowodnić, że ma ona ten konkretny hash transakcji, aby osoba, która ją wysłała, wiedziała, że jej transakcja została przetworzona.

```rust
{
    let mut txn = readTransferTxn(message);
```

Potrzebujemy, aby `txn` było mutowalne, ponieważ nie odczytujemy adresu nadawcy z wiadomości, odczytujemy go z podpisu. 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Etap 2 - Dodanie serwera {#stage-2}

W drugim etapie dodajemy serwer, który odbiera i implementuje transakcje transferu z przeglądarki.

Aby zobaczyć to w akcji:

1. Zatrzymaj Vite, jeśli jest uruchomione.

2. Pobierz gałąź, która zawiera serwer i upewnij się, że masz wszystkie niezbędne moduły.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Nie ma potrzeby kompilowania kodu Noir, jest to ten sam kod, którego użyłeś w etapie 1.

3. Uruchom serwer.

   ```sh
   npm run start
   ```

4. W osobnym oknie wiersza poleceń uruchom Vite, aby udostępnić kod przeglądarki.

   ```sh
   cd client
   npm run dev
   ```

5. Przejdź do kodu klienta pod adresem [http://localhost:5173](http://localhost:5173)

6. Zanim będziesz mógł wydać transakcję, musisz znać nonce, a także kwotę, którą możesz wysłać. Aby uzyskać te informacje, kliknij **Update account data** (Aktualizuj dane konta) i podpisz wiadomość.

   Mamy tu dylemat. Z jednej strony nie chcemy podpisywać wiadomości, która może zostać użyta ponownie ([atak powtórzeniowy - replay attack](https://en.wikipedia.org/wiki/Replay_attack)), dlatego w ogóle chcemy nonce. Jednak nie mamy jeszcze nonce. Rozwiązaniem jest wybranie nonce, które może być użyte tylko raz i które już mamy po obu stronach, na przykład aktualny czas.

   Problem z tym rozwiązaniem polega na tym, że czas może nie być idealnie zsynchronizowany. Zamiast tego podpisujemy wartość, która zmienia się co minutę. Oznacza to, że nasze okno podatności na ataki powtórzeniowe wynosi co najwyżej jedną minutę. Biorąc pod uwagę, że w środowisku produkcyjnym podpisane żądanie będzie chronione przez TLS, a druga strona tunelu — serwer — może już ujawnić saldo i nonce (musi je znać, aby działać), jest to akceptowalne ryzyko.

7. Gdy przeglądarka otrzyma z powrotem saldo i nonce, wyświetli formularz transferu. Wybierz adres docelowy oraz kwotę i kliknij **Transfer**. Podpisz to żądanie.

8. Aby zobaczyć transfer, kliknij **Update account data** (Aktualizuj dane konta) lub spójrz w okno, w którym uruchomiłeś serwer. Serwer loguje stan za każdym razem, gdy ulega on zmianie.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) zawiera proces serwera i wchodzi w interakcję z kodem Noir w [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Oto wyjaśnienie ciekawych części.

```js
import { Noir } from '@noir-lang/noir_js'
```

Biblioteka [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) stanowi interfejs między kodem JavaScript a kodem Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Załaduj obwód arytmetyczny — skompilowany program Noir, który utworzyliśmy w poprzednim etapie — i przygotuj się do jego wykonania.

```js
// Udostępniamy informacje o koncie tylko w odpowiedzi na podpisane żądanie
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Aby podać informacje o koncie, potrzebujemy tylko podpisu. Powodem jest to, że już wiemy, jaka będzie wiadomość, a co za tym idzie, hash wiadomości.

```js
const processMessage = async (message, signature) => {
```

Przetwórz wiadomość i wykonaj transakcję, którą koduje.

```js
    // Pobierz klucz publiczny
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Teraz, gdy uruchamiamy JavaScript na serwerze, możemy pobrać klucz publiczny tam, a nie na kliencie.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` uruchamia program Noir. Parametry są równoważne tym podanym w [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Zauważ, że długie wartości są podawane jako tablica ciągów szesnastkowych (`["0x60", "0xA7"]`), a nie jako pojedyncza wartość szesnastkowa (`0x60A7`), jak robi to Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Jeśli wystąpi błąd, przechwyć go, a następnie przekaż uproszczoną wersję do klienta.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Zastosuj transakcję. Zrobiliśmy to już w kodzie Noir, ale łatwiej jest to zrobić ponownie tutaj, niż wyodrębniać stamtąd wynik.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Początkowa struktura `Accounts`.

### Etap 3 - Inteligentne kontrakty Ethereum {#stage-3}

1. Zatrzymaj procesy serwera i klienta.

2. Pobierz gałąź z inteligentnymi kontraktami i upewnij się, że masz wszystkie niezbędne moduły.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Uruchom `anvil` w osobnym oknie wiersza poleceń.

4. Wygeneruj klucz weryfikacyjny i weryfikator Solidity, a następnie skopiuj kod weryfikatora do projektu Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Przejdź do inteligentnych kontraktów i ustaw zmienne środowiskowe, aby używać blockchaina `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Wdróż `Verifier.sol` i zapisz adres w zmiennej środowiskowej.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Wdróż kontrakt `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Wartość `0x199..67b` to hash Pedersena początkowego stanu `Accounts`. Jeśli zmodyfikujesz ten stan początkowy w `server/index.mjs`, możesz uruchomić transakcję, aby zobaczyć początkowy hash zgłoszony przez dowód z wiedzą zerową.

8. Uruchom serwer.

   ```sh
   cd ../server
   npm run start
   ```

9. Uruchom klienta w innym oknie wiersza poleceń.

   ```sh
   cd client
   npm run dev
   ```

10. Uruchom kilka transakcji.

11. Aby zweryfikować, czy stan zmienił się onchain, zrestartuj proces serwera. Zobaczysz, że `ZkBank` nie akceptuje już transakcji, ponieważ oryginalna wartość hasha w transakcjach różni się od wartości hasha przechowywanej onchain.

    Jest to oczekiwany rodzaj błędu.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Zmiany w tym pliku dotyczą głównie tworzenia właściwego dowodu i przesyłania go onchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Musimy użyć [pakietu Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg), aby utworzyć właściwy dowód do wysłania onchain. Możemy użyć tego pakietu, uruchamiając interfejs wiersza poleceń (`bb`) lub używając [biblioteki JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Biblioteka JavaScript jest znacznie wolniejsza niż natywne uruchamianie kodu, więc używamy tutaj [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback), aby skorzystać z wiersza poleceń.

Zauważ, że jeśli zdecydujesz się użyć `bb.js`, musisz użyć wersji zgodnej z używaną wersją Noir. W momencie pisania tego tekstu obecna wersja Noir (1.0.0-beta.11) używa `bb.js` w wersji 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Adres tutaj to ten, który otrzymujesz, gdy zaczynasz z czystym `anvil` i postępujesz zgodnie z powyższymi wskazówkami.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Ten klucz prywatny to jedno z domyślnych, wstępnie zasilonych kont w `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Wygeneruj dowód za pomocą pliku wykonywalnego `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Zapisz świadka do pliku.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Właściwe utworzenie dowodu. Ten krok tworzy również plik ze zmiennymi publicznymi, ale nie potrzebujemy go. Otrzymaliśmy już te zmienne z `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Dowód to tablica JSON wartości `Field`, z których każda jest reprezentowana jako wartość szesnastkowa. Musimy jednak wysłać go w transakcji jako pojedynczą wartość `bytes`, którą Viem reprezentuje jako duży ciąg szesnastkowy. Tutaj zmieniamy format, łącząc wszystkie wartości, usuwając wszystkie `0x`, a następnie dodając jedno na końcu.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Wyczyść i zwróć dowód.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Pola publiczne muszą być tablicą 32-bajtowych wartości. Ponieważ jednak musieliśmy podzielić hash transakcji między dwie wartości `Field`, pojawia się on jako wartość 16-bajtowa. Tutaj dodajemy zera, aby Viem zrozumiał, że w rzeczywistości jest to 32 bajty.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Każdy adres używa każdego nonce tylko raz, dzięki czemu możemy użyć kombinacji `fromAddress` i `nonce` jako unikalnego identyfikatora dla pliku świadka i katalogu wyjściowego.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Wyślij transakcję do łańcucha.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

To jest kod onchain, który odbiera transakcję.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Kod onchain musi śledzić dwie zmienne: weryfikator (osobny kontrakt tworzony przez `nargo`) oraz aktualny hash stanu.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Za każdym razem, gdy stan ulega zmianie, emitujemy zdarzenie `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Ta funkcja przetwarza transakcje. Pobiera dowód (jako `bytes`) i wejścia publiczne (jako tablicę `bytes32`) w formacie wymaganym przez weryfikator (aby zminimalizować przetwarzanie onchain, a tym samym koszty gazu).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Dowód z wiedzą zerową musi potwierdzać, że transakcja zmienia nasz obecny hash na nowy.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Wywołaj kontrakt weryfikatora, aby zweryfikować dowód z wiedzą zerową. Ten krok cofa transakcję, jeśli dowód z wiedzą zerową jest błędny.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Jeśli wszystko się zgadza, zaktualizuj hash stanu do nowej wartości i wyemituj zdarzenie `TransactionProcessed`.

## Nadużycia ze strony scentralizowanego komponentu {#abuses}

Bezpieczeństwo informacji składa się z trzech atrybutów:

- _Poufność_ – użytkownicy nie mogą czytać informacji, do których nie mają uprawnień.
- _Integralność_ – informacje nie mogą być zmieniane, z wyjątkiem autoryzowanych użytkowników w autoryzowany sposób.
- _Dostępność_ – autoryzowani użytkownicy mogą korzystać z systemu.

W tym systemie integralność jest zapewniana poprzez dowody z wiedzą zerową. Dostępność jest znacznie trudniejsza do zagwarantowania, a poufność jest niemożliwa, ponieważ bank musi znać saldo każdego konta i wszystkie transakcje. Nie ma sposobu, aby zapobiec udostępnianiu informacji przez podmiot, który je posiada.

Stworzenie prawdziwie poufnego banku mogłoby być możliwe przy użyciu [ukrytych adresów](https://vitalik.eth.limo/general/2023/01/20/stealth.html), ale wykracza to poza zakres tego artykułu.

### Fałszywe informacje {#false-info}

Jednym ze sposobów, w jaki serwer może naruszyć integralność, jest dostarczenie fałszywych informacji, gdy [żądane są dane](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Aby to rozwiązać, możemy napisać drugi program w języku Noir, który otrzymuje konta jako prywatne dane wejściowe oraz adres, dla którego żądane są informacje, jako publiczne dane wejściowe. Wynikiem jest saldo i nonce tego adresu oraz hash kont.

Oczywiście ten dowód nie może zostać zweryfikowany onchain, ponieważ nie chcemy publikować wartości nonce i sald onchain. Może on jednak zostać zweryfikowany przez kod klienta działający w przeglądarce.

### Wymuszone transakcje {#forced-txns}

Zwykłym mechanizmem zapewniającym dostępność i zapobiegającym cenzurze w sieciach L2 są [wymuszone transakcje](https://docs.optimism.io/stack/transactions/forced-transaction). Jednak wymuszone transakcje nie łączą się z dowodami z wiedzą zerową. Serwer jest jedynym podmiotem, który może weryfikować transakcje.

Możemy zmodyfikować `smart-contracts/src/ZkBank.sol`, aby akceptował wymuszone transakcje i zapobiegał zmianie stanu przez serwer, dopóki nie zostaną one przetworzone. Otwiera to jednak drogę do prostego ataku typu odmowa usługi (DoS). Co jeśli wymuszona transakcja jest nieprawidłowa i w związku z tym niemożliwa do przetworzenia?

Rozwiązaniem jest posiadanie dowodu z wiedzą zerową na to, że wymuszona transakcja jest nieprawidłowa. Daje to serwerowi trzy opcje:

- Przetworzyć wymuszoną transakcję, dostarczając dowód z wiedzą zerową, że została ona przetworzona, oraz nowy hash stanu.
- Odrzucić wymuszoną transakcję i dostarczyć kontraktowi dowód z wiedzą zerową, że transakcja jest nieprawidłowa (nieznany adres, zły nonce lub niewystarczające saldo).
- Zignorować wymuszoną transakcję. Nie ma sposobu, aby zmusić serwer do faktycznego przetworzenia transakcji, ale oznacza to, że cały system jest niedostępny.

#### Kaucje dostępności {#avail-bonds}

W rzeczywistej implementacji prawdopodobnie istniałby jakiś motyw zysku za utrzymanie działania serwera. Możemy wzmocnić tę zachętę, wymagając od serwera wpłacenia kaucji dostępności, którą każdy może spalić, jeśli wymuszona transakcja nie zostanie przetworzona w określonym czasie.

### Zły kod Noir {#bad-noir-code}

Zazwyczaj, aby wzbudzić zaufanie ludzi do inteligentnego kontraktu, przesyłamy kod źródłowy do [eksploratora bloków](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Jednak w przypadku dowodów z wiedzą zerową jest to niewystarczające.

`Verifier.sol` zawiera klucz weryfikacyjny, który jest funkcją programu Noir. Jednak ten klucz nie mówi nam, czym był program Noir. Aby faktycznie mieć zaufane rozwiązanie, należy przesłać program Noir (oraz wersję, która go utworzyła). W przeciwnym razie dowody z wiedzą zerową mogą odzwierciedlać inny program, taki z tylną furtką (backdoorem).

Dopóki eksploratory bloków nie zaczną pozwalać nam na przesyłanie i weryfikację programów Noir, powinieneś robić to sam (najlepiej do [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Wtedy zaawansowani użytkownicy będą mogli pobrać kod źródłowy, skompilować go samodzielnie, utworzyć `Verifier.sol` i zweryfikować, czy jest on identyczny z tym onchain.

## Podsumowanie {#conclusion}

Aplikacje typu Plasma wymagają scentralizowanego komponentu do przechowywania informacji. Stwarza to potencjalne luki w zabezpieczeniach, ale w zamian pozwala nam zachować prywatność w sposób niedostępny na samym blockchainie. Dzięki dowodom z wiedzą zerową możemy zapewnić integralność i potencjalnie sprawić, że utrzymanie dostępności będzie opłacalne ekonomicznie dla każdego, kto obsługuje scentralizowany komponent.

[Więcej moich prac znajdziesz tutaj](https://cryptodocguy.pro/).

## Podziękowania {#acknowledgements}

- Josh Crites przeczytał wersję roboczą tego artykułu i pomógł mi z trudnym problemem w Noir.

Za wszelkie pozostałe błędy ponoszę odpowiedzialność.