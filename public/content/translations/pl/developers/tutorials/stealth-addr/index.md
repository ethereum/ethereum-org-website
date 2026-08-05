---
title: "Korzystanie z ukrytych adresów"
description: "Ukryte adresy pozwalają użytkownikom na anonimowy transfer aktywów. Po przeczytaniu tego artykułu będziesz w stanie: wyjaśnić, czym są ukryte adresy i jak działają, zrozumieć, jak z nich korzystać w sposób zachowujący prywatność, oraz napisać aplikację internetową wykorzystującą ukryte adresy."
author: Ori Pomerantz
tags: ["ukryty adres", "prywatność", "kryptografia", "Rust", "wasm"]
skill: intermediate
breadcrumb: Ukryte adresy
published: 2025-11-30
lang: pl
sidebarDepth: 3
---

Jesteś Billem. Z powodów, w które nie będziemy wnikać, chcesz przekazać darowiznę na kampanię „Alicja na Królową Świata” i chcesz, aby Alicja wiedziała, że to Ty wpłaciłeś pieniądze, by mogła Cię nagrodzić, jeśli wygra. Niestety, jej zwycięstwo nie jest gwarantowane. Istnieje konkurencyjna kampania: „Carol na Cesarzową Układu Słonecznego”. Jeśli Carol wygra i dowie się, że wsparłeś Alicję, będziesz miał kłopoty. Nie możesz więc po prostu przelać 200 ETH ze swojego konta na konto Alicji.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) ma na to rozwiązanie. Ten standard ERC wyjaśnia, jak używać [ukrytych adresów](https://nerolation.github.io/stealth-utils) do anonimowego transferu.

**Ostrzeżenie**: Kryptografia stojąca za ukrytymi adresami jest, o ile nam wiadomo, solidna. Istnieją jednak potencjalne ataki typu side-channel (ataki z kanałem bocznym). [Poniżej](#go-wrong) dowiesz się, co możesz zrobić, aby zmniejszyć to ryzyko.

## Jak działają ukryte adresy {#how}

Ten artykuł spróbuje wyjaśnić ukryte adresy na dwa sposoby. Pierwszy to [jak z nich korzystać](#how-use). Ta część wystarczy, aby zrozumieć resztę artykułu. Następnie znajduje się [wyjaśnienie stojącej za nimi matematyki](#how-math). Jeśli interesuje Cię kryptografia, przeczytaj również tę część. 

### Prosta wersja (jak korzystać z ukrytych adresów) {#how-use}

Alicja tworzy dwa klucze prywatne i publikuje odpowiadające im klucze publiczne (które można połączyć w jeden meta-adres o podwójnej długości). Bill również tworzy klucz prywatny i publikuje odpowiadający mu klucz publiczny.

Używając klucza publicznego jednej strony i klucza prywatnego drugiej, można wyprowadzić współdzielony sekret znany tylko Alicji i Billowi (nie można go wyprowadzić z samych kluczy publicznych). Używając tego współdzielonego sekretu, Bill uzyskuje ukryty adres i może wysyłać na niego aktywa.

Alicja również uzyskuje adres ze współdzielonego sekretu, ale ponieważ zna klucze prywatne do opublikowanych przez siebie kluczy publicznych, może również uzyskać klucz prywatny, który pozwala jej na wypłatę z tego adresu.

### Matematyka (dlaczego ukryte adresy tak działają) {#how-math}

Standardowe ukryte adresy wykorzystują [kryptografię krzywych eliptycznych (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor), aby uzyskać lepszą wydajność przy mniejszej liczbie bitów klucza, zachowując ten sam poziom bezpieczeństwa. W większości przypadków możemy to jednak zignorować i udawać, że używamy zwykłej arytmetyki.

Istnieje liczba, którą wszyscy znają, *G*. Możesz mnożyć przez *G*. Ale ze względu na naturę ECC, dzielenie przez *G* jest praktycznie niemożliwe. Sposób, w jaki kryptografia klucza publicznego ogólnie działa w Ethereum, polega na tym, że możesz użyć klucza prywatnego, *P<sub>priv</sub>*, do podpisywania transakcji, które są następnie weryfikowane przez klucz publiczny, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alicja tworzy dwa klucze prywatne, *K<sub>priv</sub>* i *V<sub>priv</sub>*. *K<sub>priv</sub>* posłuży do wydawania pieniędzy z ukrytego adresu, a *V<sub>priv</sub>* do przeglądania adresów należących do Alicji. Następnie Alicja publikuje klucze publiczne: *K<sub>pub</sub> = GK<sub>priv</sub>* i *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill tworzy trzeci klucz prywatny, *R<sub>priv</sub>*, i publikuje *R<sub>pub</sub> = GR<sub>priv</sub>* w centralnym rejestrze (Bill mógłby również wysłać go do Alicji, ale zakładamy, że Carol podsłuchuje).

Bill oblicza *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, co, jak zakłada, Alicja również będzie znać (wyjaśnione poniżej). Ta wartość nazywa się *S*, czyli współdzielony sekret. Daje to Billowi klucz publiczny, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Z tego klucza publicznego może on obliczyć adres i wysłać na niego dowolne zasoby. W przyszłości, jeśli Alicja wygra, Bill może podać jej *R<sub>priv</sub>*, aby udowodnić, że zasoby pochodziły od niego.

Alicja oblicza *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Daje jej to ten sam współdzielony sekret, *S*. Ponieważ zna klucz prywatny, *K<sub>priv</sub>*, może obliczyć *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Ten klucz pozwala jej na dostęp do aktywów pod adresem, który wynika z *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Mamy osobny klucz podglądu (viewing key), aby umożliwić Alicji zlecenie usług firmie Dave's World Domination Campaign Services. Alicja jest skłonna pozwolić Dave'owi poznać adresy publiczne i informować ją, gdy dostępne będą kolejne środki, ale nie chce, aby wydawał pieniądze z jej kampanii.

Ponieważ podgląd i wydawanie używają oddzielnych kluczy, Alicja może przekazać Dave'owi *V<sub>priv</sub>*. Wtedy Dave może obliczyć *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* i w ten sposób uzyskać klucze publiczne (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Ale bez *K<sub>priv</sub>* Dave nie może uzyskać klucza prywatnego.

Podsumowując, oto wartości znane poszczególnym uczestnikom.

| Alicja | Opublikowane | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Address=f(P<sub>pub</sub>)* | - | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Kiedy ukryte adresy zawodzą {#go-wrong}

*Na blockchainie nie ma tajemnic*. Chociaż ukryte adresy mogą zapewnić Ci prywatność, jest ona podatna na analizę ruchu. Aby podać trywialny przykład, wyobraź sobie, że Bill zasila adres i natychmiast wysyła transakcję, aby opublikować wartość *R<sub>pub</sub>*. Bez *V<sub>priv</sub>* Alicji nie możemy być pewni, że jest to ukryty adres, ale można tak założyć. Następnie widzimy kolejną transakcję, która transferuje całe ETH z tego adresu na adres funduszu kampanii Alicji. Możemy nie być w stanie tego udowodnić, ale jest wysoce prawdopodobne, że Bill właśnie przekazał darowiznę na kampanię Alicji. Carol z pewnością by tak pomyślała.

Billowi łatwo jest oddzielić publikację *R<sub>pub</sub>* od zasilenia ukrytego adresu (zrobić to w różnym czasie, z różnych adresów). To jednak nie wystarczy. Wzorzec, którego szuka Carol, polega na tym, że Bill zasila adres, a następnie fundusz kampanii Alicji wypłaca z niego środki. 

Jednym z rozwiązań jest to, aby kampania Alicji nie wypłacała pieniędzy bezpośrednio, ale użyła ich do zapłacenia stronie trzeciej. Jeśli kampania Alicji wyśle 10 ETH do Dave's World Domination Campaign Services, Carol będzie wiedziała tylko, że Bill przekazał darowiznę jednemu z klientów Dave'a. Jeśli Dave ma wystarczająco dużo klientów, Carol nie będzie w stanie dowiedzieć się, czy Bill wsparł Alicję, która z nią konkuruje, czy Adama, Alberta lub Abigail, którymi Carol się nie przejmuje. Alicja może dołączyć do płatności wartość hash, a następnie dostarczyć Dave'owi pre-image (obraz pierwotny), aby udowodnić, że to była jej darowizna. Alternatywnie, jak zauważono powyżej, jeśli Alicja przekaże Dave'owi swoje *V<sub>priv</sub>*, on już będzie wiedział, od kogo pochodzi płatność.

Głównym problemem z tym rozwiązaniem jest to, że wymaga ono od Alicji dbania o tajemnicę, podczas gdy ta tajemnica przynosi korzyści Billowi. Alicja może chcieć utrzymać swoją reputację, aby przyjaciel Billa, Bob, również przekazał jej darowiznę. Ale możliwe jest również, że nie miałaby nic przeciwko zdemaskowaniu Billa, ponieważ wtedy będzie się on bał tego, co się stanie, jeśli Carol wygra. Bill mógłby w rezultacie zapewnić Alicji jeszcze większe wsparcie.

### Używanie wielu warstw ukrycia {#multi-layer}

Zamiast polegać na Alicji w kwestii zachowania prywatności Billa, Bill może zrobić to sam. Może wygenerować wiele meta-adresów dla fikcyjnych osób, Boba i Belli. Następnie Bill wysyła ETH do Boba, a „Bob” (którym w rzeczywistości jest Bill) wysyła je do Belli. „Bella” (również Bill) wysyła je do Alicji.

Carol nadal może przeprowadzić analizę ruchu i zobaczyć ścieżkę Bill-Bob-Bella-Alicja. Jeśli jednak „Bob” i „Bella” używają ETH również do innych celów, nie będzie to wyglądało tak, jakby Bill przetransferował cokolwiek do Alicji, nawet jeśli Alicja natychmiast wypłaci środki z ukrytego adresu na swój znany adres kampanii.

## Pisanie aplikacji wykorzystującej ukryte adresy {#write-app}

Ten artykuł wyjaśnia aplikację wykorzystującą ukryte adresy, [dostępną na GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Narzędzia {#tools}

Istnieje [biblioteka ukrytych adresów w TypeScript](https://github.com/ScopeLift/stealth-address-sdk), której moglibyśmy użyć. Jednak operacje kryptograficzne mogą mocno obciążać procesor. Wolę zaimplementować je w języku kompilowanym, takim jak [Rust](https://rust-lang.org/), i użyć [WASM](https://webassembly.org/) do uruchomienia kodu w przeglądarce.

Użyjemy [Vite](https://vite.dev/) i [React](https://react.dev/). Są to standardowe narzędzia w branży; jeśli ich nie znasz, możesz skorzystać z [tego samouczka](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Aby używać Vite, potrzebujemy Node.

### Zobacz ukryte adresy w akcji {#in-action}

1. Zainstaluj niezbędne narzędzia: [Rust](https://rust-lang.org/tools/install/) i [Node](https://nodejs.org/en/download).

2. Sklonuj repozytorium GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Zainstaluj wymagania wstępne i skompiluj kod Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Uruchom serwer WWW.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Przejdź do [aplikacji](http://localhost:5173/). Ta strona aplikacji ma dwie ramki: jedną dla interfejsu użytkownika Alicji, a drugą dla Billa. Obie ramki nie komunikują się ze sobą; znajdują się na tej samej stronie tylko dla wygody.

6. Jako Alicja kliknij **Generate a Stealth Meta-Address** (Wygeneruj ukryty meta-adres). Spowoduje to wyświetlenie nowego ukrytego adresu i odpowiadających mu kluczy prywatnych. Skopiuj ukryty meta-adres do schowka.

7. Jako Bill wklej nowy ukryty meta-adres i kliknij **Generate an address** (Wygeneruj adres). Da ci to adres, który należy zasilić dla Alicji. 

8. Skopiuj adres oraz klucz publiczny Billa i wklej je w obszarze „Private key for address generated by Bill” (Klucz prywatny dla adresu wygenerowanego przez Billa) w interfejsie użytkownika Alicji. Po wypełnieniu tych pól zobaczysz klucz prywatny umożliwiający dostęp do aktywów pod tym adresem.

9. Możesz użyć [kalkulatora online](https://iancoleman.net/ethereum-private-key-to-address/), aby upewnić się, że klucz prywatny odpowiada adresowi.

### Jak działa program {#how-the-program-works}

#### Komponent WASM {#wasm}

Kod źródłowy, który kompiluje się do WASM, jest napisany w języku [Rust](https://rust-lang.org/). Możesz go zobaczyć w [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Ten kod jest przede wszystkim interfejsem między kodem JavaScript a [biblioteką `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) w języku Rust jest odpowiednikiem [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) w JavaScript. Zawiera informacje o pakiecie, deklaracje zależności itp.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

Pakiet [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) musi generować losowe wartości. Nie można tego zrobić za pomocą czysto algorytmicznych środków; wymaga to dostępu do procesu fizycznego jako źródła entropii. Ta definicja określa, że uzyskamy tę entropię, pytając przeglądarkę, w której jesteśmy uruchomieni.

```toml
console_error_panic_hook = "0.1.7"
```

[Ta biblioteka](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) daje nam bardziej sensowne komunikaty o błędach, gdy kod WASM wpada w panikę (panic) i nie może kontynuować działania.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Typ wyjściowy wymagany do wygenerowania kodu WASM.

**`lib.rs`**

To jest właściwy kod Rust.

```rust
use wasm_bindgen::prelude::*;
```

Definicje do utworzenia pakietu WASM z języka Rust. Są one udokumentowane [tutaj](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Funkcje, których potrzebujemy z [biblioteki `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust zazwyczaj używa [tablic](https://doc.rust-lang.org/std/primitive.array.html) bajtów (`[u8; <size>]`) dla wartości. Ale w JavaScript zazwyczaj używamy ciągów szesnastkowych. [Biblioteka `hex`](https://docs.rs/hex/latest/hex/) tłumaczy dla nas z jednej reprezentacji na drugą.

```rust
#[wasm_bindgen]
```

Wygeneruj powiązania (bindings) WASM, aby móc wywołać tę funkcję z JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Najprostszym sposobem na zwrócenie obiektu z wieloma polami jest zwrócenie ciągu JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) zwraca trzy pola:

- Meta-adres (*K<sub>pub</sub>* i *V<sub>pub</sub>*)
- Klucz prywatny podglądu (*V<sub>priv</sub>*)
- Klucz prywatny wydawania (*K<sub>priv</sub>*)

Składnia [krotki (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) pozwala nam ponownie rozdzielić te wartości.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Użyj makra [`format!`](https://doc.rust-lang.org/std/fmt/index.html), aby wygenerować ciąg zakodowany w formacie JSON. Użyj [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html), aby zmienić tablice na ciągi szesnastkowe.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Ta funkcja zamienia ciąg szesnastkowy (dostarczony przez JavaScript) na tablicę bajtów. Używamy jej do parsowania wartości dostarczonych przez kod JavaScript. Ta funkcja jest skomplikowana ze względu na to, jak Rust obsługuje tablice i wektory.

Wyrażenie `<const N: usize>` nazywa się [typem generycznym](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` to parametr, który kontroluje długość zwracanej tablicy. Funkcja w rzeczywistości nazywa się `str_to_array::<n>`, gdzie `n` to długość tablicy.

Wartość zwracana to `Option<[u8; N]>`, co oznacza, że zwracana tablica jest [opcjonalna](https://doc.rust-lang.org/std/option/). Jest to typowy wzorzec w języku Rust dla funkcji, które mogą zakończyć się niepowodzeniem.

Na przykład, jeśli wywołamy `str_to_array::10("bad060a7")`, funkcja powinna zwrócić tablicę o dziesięciu wartościach, ale wejście ma tylko cztery bajty. Funkcja musi zakończyć się niepowodzeniem i robi to, zwracając `None`. Wartością zwracaną dla `str_to_array::4("bad060a7")` byłoby `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode zwraca Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Funkcja [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) zwraca `Result<Vec<u8>, FromHexError>`. Typ [`Result`](https://doc.rust-lang.org/std/result/) może zawierać pomyślny wynik (`Ok(value)`) lub błąd (`Err(error)`).

Metoda `.ok()` zamienia `Result` w `Option`, którego wartością jest wartość `Ok()` w przypadku powodzenia lub `None` w przeciwnym razie. Na koniec [operator znaku zapytania](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) przerywa bieżącą funkcję i zwraca `None`, jeśli `Option` jest puste. W przeciwnym razie rozpakowuje wartość i ją zwraca (w tym przypadku, aby przypisać wartość do `vec`).

Wygląda to na dziwnie zawiłą metodę obsługi błędów, ale `Result` i `Option` zapewniają, że wszystkie błędy zostaną obsłużone w ten czy inny sposób.

```rust
    if vec.len() != N { return None; }
```

Jeśli liczba bajtów jest nieprawidłowa, oznacza to niepowodzenie i zwracamy `None`.

```rust
    // try_into konsumuje vec i próbuje utworzyć [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust ma dwa typy tablic. [Tablice (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) mają stały rozmiar. [Wektory (Vectors)](https://doc.rust-lang.org/std/vec/index.html) mogą rosnąć i kurczyć się. `hex::decode` zwraca wektor, ale biblioteka `eth_stealth_addresses` chce otrzymywać tablice. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) konwertuje wartość na inny typ, na przykład wektor na tablicę.

```rust
    Some(array)
}
```

Rust nie wymaga używania słowa kluczowego [`return`](https://doc.rust-lang.org/std/keyword.return.html) podczas zwracania wartości na końcu funkcji.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Ta funkcja otrzymuje publiczny meta-adres, który zawiera zarówno *V<sub>pub</sub>*, jak i *K<sub>pub</sub>*. Zwraca ukryty adres, klucz publiczny do opublikowania (*R<sub>pub</sub>*) oraz jednobajtową wartość skanowania, która przyspiesza identyfikację, które opublikowane adresy mogą należeć do Alicji.

Wartość skanowania jest częścią współdzielonego sekretu (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Ta wartość jest dostępna dla Alicji, a jej sprawdzenie jest znacznie szybsze niż sprawdzanie, czy *f(K<sub>pub</sub>+G\*hash(S))* równa się opublikowanemu adresowi.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Używamy funkcji biblioteki [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html).

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Przygotuj wyjściowy ciąg znaków zakodowany w formacie JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Ta funkcja używa funkcji biblioteki [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) do obliczenia klucza prywatnego w celu wypłaty z adresu (*R<sub>priv</sub>*). To obliczenie wymaga następujących wartości:

- Adres (*Address=f(P<sub>pub</sub>)*)
- Klucz publiczny wygenerowany przez Billa (*R<sub>pub</sub>*)
- Klucz prywatny podglądu (*V<sub>priv</sub>*)
- Klucz prywatny wydawania (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) określa, że funkcja jest wykonywana podczas inicjalizacji kodu WASM.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Ten kod określa, że wyjście błędu panic ma być wysyłane do konsoli JavaScript. Aby zobaczyć to w akcji, użyj aplikacji i podaj Billowi nieprawidłowy meta-adres (po prostu zmień jedną cyfrę szesnastkową). W konsoli JavaScript zobaczysz ten błąd:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Następnie pojawi się ślad stosu (stack trace). Następnie podaj Billowi prawidłowy meta-adres, a Alicji podaj nieprawidłowy adres lub nieprawidłowy klucz publiczny. Zobaczysz ten błąd:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Ponownie, po nim nastąpi ślad stosu.

#### Interfejs użytkownika {#ui}

Interfejs użytkownika jest napisany przy użyciu [React](https://react.dev/) i serwowany przez [Vite](https://vite.dev/). Możesz dowiedzieć się o nich z [tego samouczka](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Nie ma tu potrzeby używania [Wagmi](https://wagmi.sh/), ponieważ nie wchodzimy w bezpośrednią interakcję z blockchainem ani portfelem.

Jedyną nieoczywistą częścią interfejsu użytkownika jest łączność z WASM. Oto jak to działa.

**`vite.config.js`**

Ten plik zawiera [konfigurację Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Potrzebujemy dwóch wtyczek Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) i [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Ten plik jest głównym komponentem aplikacji. Jest to kontener, który zawiera dwa komponenty: `Alice` i `Bill`, czyli interfejsy dla tych użytkowników. Istotną częścią dla WASM jest kod inicjalizacyjny.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Kiedy używamy [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), tworzy on dwa pliki, których tutaj używamy: plik wasm z właściwym kodem (tutaj `src/rust-wasm/pkg/rust_wasm_bg.wasm`) oraz plik JavaScript z definicjami do jego użycia (tutaj `src/rust_wasm/pkg/rust_wasm.js`). Domyślnym eksportem tego pliku JavaScript jest kod, który musi zostać uruchomiony, aby zainicjować WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

Hook [`useEffect`](https://react.dev/reference/react/useEffect) pozwala określić funkcję, która jest wykonywana, gdy zmieniają się zmienne stanu. Tutaj lista zmiennych stanu jest pusta (`[]`), więc ta funkcja jest wykonywana tylko raz podczas ładowania strony.

Funkcja efektu musi zwrócić wynik natychmiast. Aby użyć kodu asynchronicznego, takiego jak `init` z WASM (który musi załadować plik `.wasm`, a to zajmuje trochę czasu), definiujemy wewnętrzną funkcję [`async`](https://en.wikipedia.org/wiki/Async/await) i uruchamiamy ją bez `await`.

**`Bill.jsx`**

To jest interfejs użytkownika dla Billa. Ma on jedną akcję: tworzenie adresu na podstawie ukrytego meta-adresu dostarczonego przez Alicję.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Oprócz domyślnego eksportu, kod JavaScript wygenerowany przez `wasm-pack` eksportuje funkcję dla każdej funkcji w kodzie WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Aby wywołać funkcje WASM, po prostu wywołujemy funkcję wyeksportowaną przez plik JavaScript utworzony przez `wasm-pack`.

**`Alice.jsx`**

Kod w `Alice.jsx` jest analogiczny, z tą różnicą, że Alicja ma dwie akcje:

- Wygenerowanie meta-adresu
- Pobranie klucza prywatnego dla adresu opublikowanego przez Billa

## Wnioski {#conclusion}

Ukryte adresy nie są panaceum; muszą być [używane poprawnie](#go-wrong). Ale gdy są używane prawidłowo, mogą zapewnić prywatność na publicznym blockchainie.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).