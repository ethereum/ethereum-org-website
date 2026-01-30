---
title: Napisz specyficzną dla aplikacji plasmę, która zachowuje prywatność
description: W tym samouczku zbudujemy na wpół tajny bank na depozyty. Bank jest scentralizowanym komponentem; zna saldo każdego użytkownika. Jednakże informacje te nie są przechowywane w łańcuchu. Zamiast tego bank publikuje hasz stanu. Za każdym razem, gdy dochodzi do transakcji, bank publikuje nowy hasz wraz z dowodem o zerowej wiedzy, że posiada podpisaną transakcję, która zmienia stan hasza na nowy. Po przeczytaniu tego samouczka zrozumiesz nie tylko, jak używać dowodów o zerowej wiedzy, ale także dlaczego ich używać i jak robić to bezpiecznie.
author: Ori Pomerantz
tags: [ "zerowej-wiedzy", "serwer", "offchain", "prywatność" ]
skill: advanced
lang: pl
published: 2025-10-15
---

## Wprowadzenie {#introduction}

W przeciwieństwie do [rollupów](/developers/docs/scaling/zk-rollups/), [plasmy](/developers/docs/scaling/plasma) używają sieci głównej Ethereum do zapewnienia integralności, ale nie dostępności. W tym artykule napiszemy aplikację, która zachowuje się jak plasma, z Ethereum gwarantującym integralność (brak nieautoryzowanych zmian), ale nie dostępność (scentralizowany komponent może ulec awarii i wyłączyć cały system).

Aplikacja, którą tu napiszemy, to bank chroniący prywatność. Różne adresy mają konta z saldami i mogą wysyłać pieniądze (ETH) na inne konta. Bank publikuje hasze stanu (konta i ich salda) oraz transakcje, ale faktyczne salda przechowuje poza łańcuchem, gdzie mogą pozostać prywatne.

## Projekt {#design}

To nie jest system gotowy do produkcji, ale narzędzie dydaktyczne. W związku z tym został napisany z kilkoma upraszczającymi założeniami.

- Stała pula kont. Istnieje określona liczba kont, a każde konto należy do z góry określonego adresu. To sprawia, że system jest znacznie prostszy, ponieważ trudno jest obsługiwać struktury danych o zmiennym rozmiarze w dowodach o zerowej wiedzy. W przypadku systemu gotowego do produkcji możemy użyć [korzenia Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) jako hasza stanu i dostarczyć dowody Merkle'a dla wymaganych sald.

- Przechowywanie w pamięci. W systemie produkcyjnym musimy zapisywać wszystkie salda kont na dysku, aby zachować je w przypadku ponownego uruchomienia. Tutaj jest w porządku, jeśli informacje zostaną po prostu utracone.

- Tylko przelewy. System produkcyjny wymagałby sposobu na wpłacanie aktywów do banku i ich wypłacanie. Ale celem jest tu tylko zilustrowanie koncepcji, więc ten bank jest ograniczony do przelewów.

### Dowody o zerowej wiedzy {#zero-knowledge-proofs}

Na poziomie podstawowym dowód o zerowej wiedzy pokazuje, że dowodzący zna pewne dane, _Dane<sub>prywatne</sub>_ takie, że istnieje relacja _Relacja_ między pewnymi danymi publicznymi, _Dane<sub>publiczne</sub>_, a _Danymi<sub>prywatnymi</sub>_. Weryfikator zna _Relację_ i _Dane<sub>publiczne</sub>_.

Aby zachować prywatność, potrzebujemy, aby stany i transakcje były prywatne. Ale aby zapewnić integralność, potrzebujemy, aby [hasz kryptograficzny](https://en.wikipedia.org/wiki/Cryptographic_hash_function) stanów był publiczny. Aby udowodnić osobom przesyłającym transakcje, że te transakcje rzeczywiście miały miejsce, musimy również publikować hasze transakcji.

W większości przypadków _Dane<sub>prywatne</sub>_ są danymi wejściowymi do programu dowodu o zerowej wiedzy, a _Dane<sub>publiczne</sub>_ są danymi wyjściowymi.

Te pola w _Danych<sub>prywatnych</sub>_:

- _Stan<sub>n</sub>_, stary stan
- _Stan<sub>n+1</sub>_, nowy stan
- _Transakcja_, transakcja, która zmienia stary stan na nowy. Ta transakcja musi zawierać następujące pola:
  - _Adres docelowy_, który otrzymuje przelew
  - _Kwota_ przelewu
  - _Nonce_, aby zapewnić, że każda transakcja może zostać przetworzona tylko raz.
    Adres źródłowy nie musi znajdować się w transakcji, ponieważ można go odzyskać z podpisu.
- _Podpis_, podpis upoważniający do wykonania transakcji. W naszym przypadku jedynym adresem upoważnionym do wykonania transakcji jest adres źródłowy. Ponieważ nasz system o zerowej wiedzy działa w taki sposób, oprócz podpisu Ethereum potrzebujemy również klucza publicznego konta.

Oto pola w _Danych<sub>publicznych</sub>_:

- _Hasz(Stan<sub>n</sub>)_ hasz starego stanu
- _Hasz(Stan<sub>n+1</sub>)_ hasz nowego stanu
- _Hasz(Transakcja)_ hasz transakcji, która zmienia stan ze _Stanu<sub>n</sub>_ na _Stan<sub>n+1</sub>_.

Relacja sprawdza kilka warunków:

- Hasze publiczne są rzeczywiście poprawnymi haszami dla pól prywatnych.
- Transakcja, po zastosowaniu do starego stanu, skutkuje nowym stanem.
- Podpis pochodzi z adresu źródłowego transakcji.

Ze względu na właściwości funkcji haszujących kryptograficznie, udowodnienie tych warunków wystarczy, aby zapewnić integralność.

### Struktury danych {#data-structures}

Podstawową strukturą danych jest stan przechowywany przez serwer. Dla każdego konta serwer śledzi saldo konta i [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), używany do zapobiegania [atakom typu replay](https://en.wikipedia.org/wiki/Replay_attack).

### Komponenty {#components}

Ten system wymaga dwóch komponentów:

- _Serwer_, który odbiera transakcje, przetwarza je i publikuje hasze w łańcuchu wraz z dowodami o zerowej wiedzy.
- _Inteligentny kontrakt_, który przechowuje hasze i weryfikuje dowody o zerowej wiedzy, aby zapewnić, że przejścia stanów są prawidłowe.

### Przepływ danych i sterowania {#flows}

Są to sposoby, w jakie różne komponenty komunikują się w celu dokonania przelewu z jednego konta na drugie.

1. Przeglądarka internetowa przesyła podpisaną transakcję z prośbą o przelew z konta podpisującego na inne konto.

2. Serwer weryfikuje, czy transakcja jest prawidłowa:

   - Podpisujący ma konto w banku z wystarczającym saldem.
   - Odbiorca ma konto w banku.

3. Serwer oblicza nowy stan, odejmując przelaną kwotę od salda podpisującego i dodając ją do salda odbiorcy.

4. Serwer oblicza dowód o zerowej wiedzy, że zmiana stanu jest prawidłowa.

5. Serwer przesyła do Ethereum transakcję, która zawiera:

   - Nowy hasz stanu
   - Hasz transakcji (aby nadawca transakcji wiedział, że została przetworzona)
   - Dowód o zerowej wiedzy, który udowadnia, że przejście do nowego stanu jest prawidłowe

6. Inteligentny kontrakt weryfikuje dowód o zerowej wiedzy.

7. Jeśli dowód o zerowej wiedzy jest poprawny, inteligentny kontrakt wykonuje następujące czynności:
   - Zaktualizuj bieżący hasz stanu na nowy hasz stanu
   - Wyemituj wpis w dzienniku z nowym haszem stanu i haszem transakcji

### Narzędzia {#tools}

Do kodu po stronie klienta użyjemy [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) i [Wagmi](https://wagmi.sh/). Są to standardowe narzędzia branżowe; jeśli ich nie znasz, możesz skorzystać z [tego samouczka](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Większość serwera jest napisana w JavaScript przy użyciu [Node](https://nodejs.org/en). Część dotycząca zerowej wiedzy jest napisana w [Noir](https://noir-lang.org/). Potrzebujemy wersji `1.0.0-beta.10`, więc po [zainstalowaniu Noir zgodnie z instrukcją](https://noir-lang.org/docs/getting_started/quick_start), uruchom:

```
noirup -v 1.0.0-beta.10
```

Blockchain, którego używamy, to `anvil`, lokalny blockchain testowy, który jest częścią [Foundry](https://getfoundry.sh/introduction/installation).

## Implementacja {#implementation}

Ponieważ jest to złożony system, wdrożymy go etapami.

### Etap 1 - Ręczna zerowa wiedza {#stage-1}

W pierwszym etapie podpiszemy transakcję w przeglądarce, a następnie ręcznie podamy informacje do dowodu o zerowej wiedzy. Kod zerowej wiedzy oczekuje, że otrzyma te informacje w pliku `server/noir/Prover.toml` (udokumentowane [tutaj](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Aby zobaczyć to w działaniu:

1. Upewnij się, że masz zainstalowane [Node](https://nodejs.org/en/download) i [Noir](https://noir-lang.org/install). Najlepiej zainstalować je w systemie UNIX, takim jak macOS, Linux lub [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Pobierz kod etapu 1 i uruchom serwer WWW, aby obsługiwać kod klienta.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Powodem, dla którego potrzebujesz tutaj serwera WWW, jest to, że aby zapobiec niektórym rodzajom oszustw, wiele portfeli (takich jak MetaMask) nie akceptuje plików serwowanych bezpośrednio z dysku

3. Otwórz przeglądarkę z portfelem.

4. W portfelu wprowadź nową frazę dostępu. Pamiętaj, że spowoduje to usunięcie istniejącej frazy dostępu, więc _upewnij się, że masz kopię zapasową_.

   Fraza dostępu to `test test test test test test test test test test test junk`, domyślna fraza testowa dla anvil.

5. Przejdź do [kodu po stronie klienta](http://localhost:5173/).

6. Połącz się z portfelem i wybierz konto docelowe oraz kwotę.

7. Kliknij **Podpisz** i podpisz transakcję.

8. Pod nagłówkiem **Prover.toml** znajdziesz tekst. Zastąp `server/noir/Prover.toml` tym tekstem.

9. Wykonaj dowód o zerowej wiedzy.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Dane wyjściowe powinny być podobne do

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Porównaj dwie ostatnie wartości z haszem widocznym w przeglądarce internetowej, aby sprawdzić, czy komunikat jest poprawnie haszowany.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) pokazuje format informacji oczekiwany przez Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Komunikat jest w formacie tekstowym, co ułatwia użytkownikowi jego zrozumienie (co jest konieczne przy podpisywaniu) i parsowanie przez kod Noir. Kwota jest podawana w finneyach, aby z jednej strony umożliwić przelewy ułamkowe, a z drugiej strony być łatwo czytelna. Ostatnia liczba to [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Ciąg ma 100 znaków długości. Dowody o zerowej wiedzy nie radzą sobie dobrze z danymi o zmiennym rozmiarze, więc często konieczne jest uzupełnianie danych.

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

W ten sposób określa się tablicę struktur. Dla każdego wpisu określamy adres, saldo (w milliETH, czyli [finney](https://cryptovalleyjournal.com/glossary/finney/)) oraz następną wartość nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementuje przetwarzanie po stronie klienta i generuje plik `server/noir/Prover.toml` (ten, który zawiera parametry zerowej wiedzy).

Oto wyjaśnienie ciekawszych części.

```tsx
export default attrs =>  {
```

Ta funkcja tworzy komponent React `Transfer`, który inne pliki mogą importować.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Są to adresy kont, adresy utworzone przez `test ...` frazę dostępu `test junk`. Jeśli chcesz używać własnych adresów, po prostu zmodyfikuj tę definicję.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Te [hooki Wagmi](https://wagmi.sh/react/api/hooks) pozwalają nam uzyskać dostęp do biblioteki [viem](https://viem.sh/) i portfela.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

To jest komunikat, uzupełniony spacjami. Za każdym razem, gdy jedna ze zmiennych [`useState`](https://react.dev/reference/react/useState) się zmienia, komponent jest ponownie rysowany, a `message` jest aktualizowany.

```tsx
  const sign = async () => {
```

Ta funkcja jest wywoływana, gdy użytkownik kliknie przycisk **Podpisz**. Komunikat jest aktualizowany automatycznie, ale podpis wymaga zatwierdzenia przez użytkownika w portfelu i nie chcemy o to prosić, jeśli nie jest to konieczne.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Poproś portfel o [podpisanie komunikatu](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Pobierz hasz komunikatu. Pomocne jest dostarczenie go użytkownikowi do debugowania (kodu Noir).

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

Ustaw zmienne stanu. Zrobienie tego powoduje ponowne narysowanie komponentu (po wyjściu z funkcji `sign`) i pokazuje użytkownikowi zaktualizowane wartości.

```tsx
    let proverToml = `
```

Tekst dla `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem dostarcza nam klucz publiczny w postaci 65-bajtowego ciągu szesnastkowego. Pierwszy bajt to `0x04`, znacznik wersji. Następnie 32 bajty dla `x` klucza publicznego, a potem 32 bajty dla `y` klucza publicznego.

Jednak Noir oczekuje, że otrzyma te informacje jako dwie tablice bajtów, jedną dla `x` i jedną dla `y`. Łatwiej jest to parsować tutaj po stronie klienta, niż jako część dowodu o zerowej wiedzy.

Należy zauważyć, że jest to ogólnie dobra praktyka w dowodach o zerowej wiedzy. Kod wewnątrz dowodu o zerowej wiedzy jest kosztowny, więc każde przetwarzanie, które można wykonać poza dowodem o zerowej wiedzy, _powinno_ być wykonane poza nim.

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
        <h2>Przelew</h2>
```

To jest format HTML (a dokładniej [JSX](https://react.dev/learn/writing-markup-with-jsx)) komponentu.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) to faktyczny kod o zerowej wiedzy.

```
use std::hash::pedersen_hash;
```

[Hasz Pedersena](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) jest dostarczany ze [standardową biblioteką Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Dowody o zerowej wiedzy często używają tej funkcji haszującej. Jest znacznie łatwiejszy do obliczenia wewnątrz [obwodów arytmetycznych](https://rareskills.io/post/arithmetic-circuit) w porównaniu ze standardowymi funkcjami haszującymi.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Te dwie funkcje to biblioteki zewnętrzne, zdefiniowane w [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Są dokładnie tym, na co wskazują ich nazwy: funkcją, która oblicza [hasz keccak256](https://emn178.github.io/online-tools/keccak_256.html) oraz funkcją, która weryfikuje podpisy Ethereum i odzyskuje adres Ethereum osoby podpisującej.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir jest inspirowany językiem [Rust](https://www.rust-lang.org/). Zmienne domyślnie są stałymi. W ten sposób definiujemy globalne stałe konfiguracyjne. W szczególności `ACCOUNT_NUMBER` to liczba kont, które przechowujemy.

Typy danych o nazwie `u<liczba>` to ta liczba bitów, bez znaku. Jedyne obsługiwane typy to `u8`, `u16`, `u32`, `u64` i `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Ta zmienna jest używana do haszowania Pedersena kont, jak wyjaśniono poniżej.

```
global MESSAGE_LENGTH : u32 = 100;
```

Jak wyjaśniono powyżej, długość komunikatu jest stała. Jest ona określona tutaj.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Podpisy EIP-191](https://eips.ethereum.org/EIPS/eip-191) wymagają bufora z 26-bajtowym prefiksem, po którym następuje długość komunikatu w ASCII, a na końcu sam komunikat.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Informacje, które przechowujemy o koncie. [`Pole`](https://noir-lang.org/docs/noir/concepts/data_types/fields) to liczba, zazwyczaj do 253 bitów, która może być używana bezpośrednio w [obwodzie arytmetycznym](https://rareskills.io/post/arithmetic-circuit), który implementuje dowód o zerowej wiedzy. Tutaj używamy `Pola` do przechowywania 160-bitowego adresu Ethereum.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Informacje, które przechowujemy dla transakcji przelewu.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Definicja funkcji. Parametrem jest informacja o `Koncie`. Wynikiem jest tablica zmiennych `Pole`, której długość to `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Pierwszą wartością w tablicy jest adres konta. Druga zawiera zarówno saldo, jak i nonce. Wywołania `.into()` zmieniają liczbę na typ danych, którym musi być. `account.nonce` to wartość `u32`, ale aby dodać ją do `account.balance << 32`, wartości `u128`, musi to być `u128`. To jest pierwsze `.into()`. Drugi konwertuje wynik `u128` na `Pole`, aby zmieścił się w tablicy.

```
    flat
}
```

W Noir funkcje mogą zwracać wartość tylko na końcu (nie ma wcześniejszego zwrotu). Aby określić wartość zwracaną, należy ją obliczyć tuż przed nawiasem zamykającym funkcję.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Ta funkcja zamienia tablicę kont na tablicę `Pól`, która może być użyta jako dane wejściowe do hasza Petersena.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

W ten sposób określa się zmienną mutowalną, czyli _nie_ stałą. Zmienne w Noir muszą zawsze mieć wartość, więc inicjalizujemy tę zmienną samymi zerami.

```
    for i in 0..ACCOUNT_NUMBER {
```

To jest pętla `for`. Należy zauważyć, że granice są stałymi. Pętle w Noir muszą mieć granice znane w czasie kompilacji. Powodem jest to, że obwody arytmetyczne nie obsługują kontroli przepływu. Podczas przetwarzania pętli `for` kompilator po prostu umieszcza kod wewnątrz niej wielokrotnie, raz dla każdej iteracji.

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

Wreszcie doszliśmy do funkcji, która haszuje tablicę kont.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Ta funkcja znajduje konto o określonym adresie. Ta funkcja byłaby strasznie nieefektywna w standardowym kodzie, ponieważ iteruje po wszystkich kontach, nawet po znalezieniu adresu.

Jednak w dowodach o zerowej wiedzy nie ma kontroli przepływu. Jeśli kiedykolwiek będziemy musieli sprawdzić warunek, musimy go sprawdzać za każdym razem.

Podobna rzecz dzieje się z instrukcjami `if`. Instrukcja `if` w powyższej pętli jest tłumaczona na te instrukcje matematyczne.

_wynik<sub>warunku</sub> = konta[i].adres == adres_ // jeden, jeśli są równe, zero w przeciwnym razie

_konto<sub>nowe</sub> = wynik<sub>warunku</sub>\*i + (1-wynik<sub>warunku</sub>)\*konto<sub>stare</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} nie ma konta");

    account
}
```

Funkcja [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) powoduje awarię dowodu o zerowej wiedzy, jeśli asercja jest fałszywa. W tym przypadku, jeśli nie możemy znaleźć konta z odpowiednim adresem. Aby zgłosić adres, używamy [ciągu formatującego](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Ta funkcja stosuje transakcję przelewu i zwraca nową tablicę kont.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Nie możemy uzyskać dostępu do elementów struktury wewnątrz ciągu formatującego w Noir, więc tworzymy użyteczną kopię.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} nie ma {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transakcja ma nonce {txnNonce}, ale oczekuje się, że konto użyje {accountNonce}");
```

Są to dwa warunki, które mogą unieważnić transakcję.

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

Ta funkcja odczytuje adres z komunikatu.

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

Odczytaj kwotę i nonce z komunikatu.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

W komunikacie pierwsza liczba po adresie to kwota finney (czyli tysięczna ETH) do przelania. Druga liczba to nonce. Każdy tekst między nimi jest ignorowany.

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

Zwracanie [krotki](https://noir-lang.org/docs/noir/concepts/data_types/tuples) to sposób Noir na zwracanie wielu wartości z funkcji.

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

Ta funkcja konwertuje komunikat na bajty, a następnie konwertuje kwoty na `TransferTxn`.

```rust
// Odpowiednik hashMessage Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Mogliśmy użyć hasza Pedersena dla kont, ponieważ są one haszowane tylko wewnątrz dowodu o zerowej wiedzy. Jednak w tym kodzie musimy sprawdzić podpis komunikatu, który jest generowany przez przeglądarkę. W tym celu musimy postępować zgodnie z formatem podpisywania Ethereum w [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Oznacza to, że musimy utworzyć połączony bufor ze standardowym prefiksem, długością komunikatu w ASCII i samym komunikatem, a następnie użyć standardowego dla Ethereum keccak256 do jego haszowania.

```rust
    // prefiks ASCII
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

Aby uniknąć przypadków, w których aplikacja prosi użytkownika o podpisanie komunikatu, który może być użyty jako transakcja lub w innym celu, EIP 191 określa, że wszystkie podpisane komunikaty zaczynają się od znaku 0x19 (nie jest to prawidłowy znak ASCII), po którym następuje `Ethereum Signed Message:` i nowa linia.

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

    assert(MESSAGE_LENGTH < 1000, "Komunikaty, których długość przekracza trzy cyfry, nie są obsługiwane");
```

Obsługuj komunikaty o długości do 999 i zakończ niepowodzeniem, jeśli jest większa. Dodałem ten kod, mimo że długość komunikatu jest stała, ponieważ ułatwia to jego zmianę. W systemie produkcyjnym prawdopodobnie po prostu założyłbyś, że `MESSAGE_LENGTH` nie zmienia się ze względu na lepszą wydajność.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Użyj standardowej funkcji Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // adres, pierwsze 16 bajtów hasza, ostatnie 16 bajtów hasza        
{
```

Ta funkcja weryfikuje podpis, co wymaga hasza komunikatu. Następnie dostarcza nam adres, który go podpisał, oraz hasz komunikatu. Hasz komunikatu jest dostarczany w dwóch wartościach `Pole`, ponieważ są one łatwiejsze w użyciu w pozostałej części programu niż tablica bajtów.

Musimy użyć dwóch wartości `Pole`, ponieważ obliczenia na polach są wykonywane [modulo](https://en.wikipedia.org/wiki/Modulo) dużej liczby, ale ta liczba jest zwykle mniejsza niż 256 bitów (w przeciwnym razie trudno byłoby wykonać te obliczenia w EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Określ `hash1` i `hash2` jako zmienne mutowalne i zapisz w nich hasz bajt po bajcie.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Jest to podobne do [`ecrecover` w Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), z dwiema ważnymi różnicami:

- Jeśli podpis nie jest prawidłowy, wywołanie kończy się niepowodzeniem `assert`, a program jest przerywany.
- Chociaż klucz publiczny można odzyskać z podpisu i hasza, jest to przetwarzanie, które można wykonać zewnętrznie, a zatem nie warto go robić wewnątrz dowodu o zerowej wiedzy. Jeśli ktoś spróbuje nas tu oszukać, weryfikacja podpisu zakończy się niepowodzeniem.

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
        Field,  // Hasz starej tablicy kont
        Field,  // Hasz nowej tablicy kont
        Field,  // Pierwsze 16 bajtów hasza komunikatu
        Field,  // Ostatnie 16 bajtów hasza komunikatu
    )
```

Wreszcie dochodzimy do funkcji `main`. Musimy udowodnić, że mamy transakcję, która prawidłowo zmienia hasz kont ze starej wartości na nową. Musimy również udowodnić, że ma ona ten konkretny hasz transakcji, aby osoba, która ją wysłała, wiedziała, że jej transakcja została przetworzona.

```rust
{
    let mut txn = readTransferTxn(message);
```

Potrzebujemy, aby `txn` było mutowalne, ponieważ nie odczytujemy adresu nadawcy z komunikatu, ale z podpisu.

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

### Etap 2 - Dodawanie serwera {#stage-2}

W drugim etapie dodajemy serwer, który odbiera i implementuje transakcje przelewów z przeglądarki.

Aby zobaczyć to w działaniu:

1. Zatrzymaj Vite, jeśli jest uruchomiony.

2. Pobierz gałąź, która zawiera serwer i upewnij się, że masz wszystkie niezbędne moduły.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Nie ma potrzeby kompilowania kodu Noir, jest on taki sam jak kod, którego użyłeś w etapie 1.

3. Uruchom serwer.

   ```sh
   npm run start
   ```

4. W osobnym oknie wiersza poleceń uruchom Vite, aby obsługiwać kod przeglądarki.

   ```sh
   cd client
   npm run dev
   ```

5. Przejdź do kodu klienta pod adresem [http://localhost:5173](http://localhost:5173)

6. Zanim będziesz mógł wystawić transakcję, musisz znać nonce, a także kwotę, którą możesz wysłać. Aby uzyskać te informacje, kliknij **Aktualizuj dane konta** i podpisz komunikat.

   Mamy tu dylemat. Z jednej strony nie chcemy podpisywać komunikatu, który można ponownie wykorzystać ([atak typu replay](https://en.wikipedia.org/wiki/Replay_attack)), dlatego w ogóle chcemy nonce. Jednak nie mamy jeszcze nonce. Rozwiązaniem jest wybranie nonce, które można użyć tylko raz i które już mamy po obu stronach, na przykład bieżący czas.

   Problem z tym rozwiązaniem polega na tym, że czas może nie być idealnie zsynchronizowany. Zamiast tego podpisujemy wartość, która zmienia się co minutę. Oznacza to, że nasze okno podatności na ataki typu replay wynosi co najwyżej jedną minutę. Biorąc pod uwagę, że w środowisku produkcyjnym podpisane żądanie będzie chronione przez TLS, a druga strona tunelu — serwer — może już ujawnić saldo i nonce (musi je znać, aby działać), jest to akceptowalne ryzyko.

7. Gdy przeglądarka otrzyma z powrotem saldo i nonce, wyświetli formularz przelewu. Wybierz adres docelowy i kwotę, a następnie kliknij **Przelej**. Podpisz to żądanie.

8. Aby zobaczyć przelew, kliknij **Aktualizuj dane konta** lub spójrz w okno, w którym uruchamiasz serwer. Serwer rejestruje stan za każdym razem, gdy się zmienia.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Nasłuchiwanie na porcie 3000
    Transakcja send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 przetworzona
    Nowy stan:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ma 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 ma 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ma 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 ma 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 ma 100000 (0)
    Transakcja send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 przetworzona
    Nowy stan:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ma 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 ma 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ma 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 ma 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 ma 100000 (0)
    Transakcja send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 przetworzona
    Nowy stan:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ma 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 ma 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ma 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 ma 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 ma 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Ten plik](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) zawiera proces serwera i współdziała z kodem Noir w [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Oto wyjaśnienie ciekawszych części.

```js
import { Noir } from '@noir-lang/noir_js'
```

Biblioteka [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) stanowi interfejs między kodem JavaScript a kodem Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Załaduj obwód arytmetyczny — skompilowany program Noir, który stworzyliśmy w poprzednim etapie — i przygotuj go do wykonania.

```js
// Informacje o koncie udostępniamy tylko w odpowiedzi na podpisane żądanie
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Aby podać informacje o koncie, potrzebujemy tylko podpisu. Powodem jest to, że wiemy już, jaki będzie komunikat, a zatem znamy jego hasz.

```js
const processMessage = async (message, signature) => {
```

Przetwórz komunikat i wykonaj zakodowaną w nim transakcję.

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

`noir.execute` uruchamia program Noir. Parametry są równoważne z tymi podanymi w [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Zauważ, że długie wartości są podawane jako tablica ciągów szesnastkowych (`["0x60", "0xA7"]`), a nie jako pojedyncza wartość szesnastkowa (`0x60A7`), tak jak to robi Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Nieprawidłowa transakcja, nie przetworzono")
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

Początkowa struktura `Konta`.

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

4. Wygeneruj klucz weryfikacyjny i weryfikator solidity, a następnie skopiuj kod weryfikatora do projektu Solidity.

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

6. Wdróż `Verifier.sol` i przechowaj adres w zmiennej środowiskowej.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Wdróż kontrakt `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Wartość `0x199..67b` to hasz Pedersena początkowego stanu `Kont`. Jeśli zmodyfikujesz ten stan początkowy w pliku `server/index.mjs`, możesz uruchomić transakcję, aby zobaczyć początkowy hasz zgłoszony przez dowód o zerowej wiedzy.

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

11. Aby zweryfikować, czy stan zmienił się w łańcuchu, uruchom ponownie proces serwera. Zobaczysz, że `ZkBank` nie akceptuje już transakcji, ponieważ oryginalna wartość hasza w transakcjach różni się od wartości hasza przechowywanej w łańcuchu.

    Jest to oczekiwany typ błędu.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Nasłuchiwanie na porcie 3000
    Błąd weryfikacji: ContractFunctionExecutionError: Funkcja kontraktu "processTransaction" została cofnięta z następującego powodu:
    Zły stary hasz stanu

    Wywołanie kontraktu:
        adres:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        funkcja:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        argumenty:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Zmiany w tym pliku dotyczą głównie tworzenia faktycznego dowodu i przesyłania go do łańcucha.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Musimy użyć [pakietu Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg), aby utworzyć faktyczny dowód do wysłania w łańcuchu. Możemy użyć tego pakietu, uruchamiając interfejs wiersza poleceń (`bb`) lub używając [biblioteki JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Biblioteka JavaScript jest znacznie wolniejsza niż natywne uruchamianie kodu, więc używamy tutaj [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback), aby użyć wiersza poleceń.

Zauważ, że jeśli zdecydujesz się na użycie `bb.js`, musisz użyć wersji kompatybilnej z wersją Noir, której używasz. W chwili pisania tego tekstu obecna wersja Noir (1.0.0-beta.11) używa `bb.js` w wersji 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Adres tutaj jest tym, który otrzymujesz, gdy zaczynasz z czystym `anvil` i postępujesz zgodnie z powyższymi wskazówkami.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Ten klucz prywatny jest jednym z domyślnych, wstępnie zasilonych kont w `anvil`.

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

Faktycznie utwórz dowód. Ten krok tworzy również plik ze zmiennymi publicznymi, ale nie potrzebujemy go. Otrzymaliśmy już te zmienne z `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Dowód to tablica JSON wartości `Pole`, z których każda jest reprezentowana jako wartość szesnastkowa. Musimy jednak wysłać go w transakcji jako pojedynczą wartość `bajtów`, którą Viem reprezentuje za pomocą dużego ciągu szesnastkowego. Tutaj zmieniamy format, łącząc wszystkie wartości, usuwając wszystkie `0x`, a następnie dodając jedno na końcu.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Posprzątaj i zwróć dowód.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Pola publiczne muszą być tablicą 32-bajtowych wartości. Jednakże, ponieważ musieliśmy podzielić hasz transakcji na dwie wartości `Pole`, pojawia się on jako wartość 16-bajtowa. Tutaj dodajemy zera, aby Viem zrozumiał, że jest to w rzeczywistości 32 bajty.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Każdy adres używa każdego nonce tylko raz, więc możemy użyć kombinacji `fromAddress` i `nonce` jako unikalnego identyfikatora dla pliku świadka i katalogu wyjściowego.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Nie można zweryfikować transakcji w łańcuchu")
    }
    .
    .
    .
}
```

Wyślij transakcję do łańcucha.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

To jest kod w łańcuchu, który odbiera transakcję.

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

Kod w łańcuchu musi śledzić dwie zmienne: weryfikator (osobny kontrakt tworzony przez `nargo`) i bieżący hasz stanu.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Za każdym razem, gdy stan się zmienia, emitujemy zdarzenie `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Ta funkcja przetwarza transakcje. Otrzymuje dowód (jako `bajty`) i publiczne dane wejściowe (jako tablicę `bytes32`), w formacie wymaganym przez weryfikator (w celu zminimalizowania przetwarzania w łańcuchu, a tym samym kosztów gazu).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Zły stary hasz stanu");
```

Dowód o zerowej wiedzy musi polegać na tym, że transakcja zmienia nasz obecny hasz na nowy.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Wywołaj kontrakt weryfikatora, aby zweryfikować dowód o zerowej wiedzy. Ten krok cofa transakcję, jeśli dowód o zerowej wiedzy jest nieprawidłowy.

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

Jeśli wszystko się zgadza, zaktualizuj hasz stanu na nową wartość i wyemituj zdarzenie `TransactionProcessed`.

## Nadużycia przez scentralizowany komponent {#abuses}

Bezpieczeństwo informacji składa się z trzech atrybutów:

- _Poufność_, użytkownicy nie mogą czytać informacji, do których nie są upoważnieni.
- _Integralność_, informacje nie mogą być zmieniane, z wyjątkiem upoważnionych użytkowników w autoryzowany sposób.
- _Dostępność_, autoryzowani użytkownicy mogą korzystać z systemu.

W tym systemie integralność jest zapewniana poprzez dowody o zerowej wiedzy. Dostępność jest znacznie trudniejsza do zagwarantowania, a poufność jest niemożliwa, ponieważ bank musi znać saldo każdego konta i wszystkie transakcje. Nie ma sposobu, aby uniemożliwić podmiotowi, który posiada informacje, udostępnianie tych informacji.

Możliwe byłoby stworzenie prawdziwie poufnego banku przy użyciu [adresów stealth](https://vitalik.eth.limo/general/2023/01/20/stealth.html), ale to wykracza poza zakres tego artykułu.

### Fałszywe informacje {#false-info}

Jednym ze sposobów, w jaki serwer może naruszyć integralność, jest dostarczanie fałszywych informacji, gdy [żądane są dane](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Aby to rozwiązać, możemy napisać drugi program Noir, który otrzymuje konta jako prywatne dane wejściowe i adres, dla którego żądane są informacje, jako publiczne dane wejściowe. Danymi wyjściowymi są saldo i nonce tego adresu oraz hasz kont.

Oczywiście tego dowodu nie można zweryfikować w łańcuchu, ponieważ nie chcemy publikować nonce i sald w łańcuchu. Można go jednak zweryfikować za pomocą kodu klienta działającego w przeglądarce.

### Wymuszone transakcje {#forced-txns}

Zwykłym mechanizmem zapewniającym dostępność i zapobiegającym cenzurze na L2 są [wymuszone transakcje](https://docs.optimism.io/stack/transactions/forced-transaction). Ale wymuszone transakcje nie łączą się z dowodami o zerowej wiedzy. Serwer jest jedynym podmiotem, który może weryfikować transakcje.

Możemy zmodyfikować `smart-contracts/src/ZkBank.sol`, aby akceptować wymuszone transakcje i uniemożliwić serwerowi zmianę stanu do czasu ich przetworzenia. Jednak to naraża nas na prosty atak typu „odmowa usługi”. Co jeśli wymuszona transakcja jest nieprawidłowa i dlatego niemożliwa do przetworzenia?

Rozwiązaniem jest posiadanie dowodu o zerowej wiedzy, że wymuszona transakcja jest nieprawidłowa. Daje to serwerowi trzy opcje:

- Przetwórz wymuszoną transakcję, dostarczając dowód o zerowej wiedzy, że została przetworzona i nowy hasz stanu.
- Odrzuć wymuszoną transakcję i dostarcz do kontraktu dowód o zerowej wiedzy, że transakcja jest nieprawidłowa (nieznany adres, zły nonce lub niewystarczające saldo).
- Zignoruj wymuszoną transakcję. Nie ma sposobu, aby zmusić serwer do faktycznego przetworzenia transakcji, ale oznacza to, że cały system jest niedostępny.

#### Obligacje dostępności {#avail-bonds}

W rzeczywistej implementacji prawdopodobnie istniałby jakiś motyw zysku, aby serwer działał. Możemy wzmocnić tę zachętę, zmuszając serwer do opublikowania obligacji dostępności, którą każdy może spalić, jeśli wymuszona transakcja nie zostanie przetworzona w określonym czasie.

### Zły kod Noir {#bad-noir-code}

Zwykle, aby ludzie zaufali inteligentnemu kontraktowi, przesyłamy kod źródłowy do [eksploratora bloków](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Jednak w przypadku dowodów o zerowej wiedzy jest to niewystarczające.

`Verifier.sol` zawiera klucz weryfikacyjny, który jest funkcją programu Noir. Jednak ten klucz nie mówi nam, jaki był program Noir. Aby faktycznie mieć zaufane rozwiązanie, należy przesłać program Noir (i wersję, która go utworzyła). W przeciwnym razie dowody o zerowej wiedzy mogą odzwierciedlać inny program, z tylnymi drzwiami.

Dopóki eksploratory bloków nie zaczną pozwalać nam na przesyłanie i weryfikowanie programów Noir, powinieneś robić to samodzielnie (najlepiej do [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Wtedy zaawansowani użytkownicy będą mogli pobrać kod źródłowy, samodzielnie go skompilować, utworzyć `Verifier.sol` i zweryfikować, czy jest on identyczny z tym w łańcuchu.

## Wnioski {#conclusion}

Aplikacje typu plasma wymagają scentralizowanego komponentu do przechowywania informacji. To otwiera potencjalne luki w zabezpieczeniach, ale w zamian pozwala nam zachować prywatność w sposób niedostępny w samym blockchainie. Dzięki dowodom o zerowej wiedzy możemy zapewnić integralność i ewentualnie sprawić, że utrzymanie dostępności będzie ekonomicznie korzystne dla każdego, kto prowadzi scentralizowany komponent.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).

## Podziękowania {#acknowledgements}

- Josh Crites przeczytał szkic tego artykułu i pomógł mi w kłopotliwej kwestii związanej z Noir.

Wszelkie pozostałe błędy są moją odpowiedzialnością.
