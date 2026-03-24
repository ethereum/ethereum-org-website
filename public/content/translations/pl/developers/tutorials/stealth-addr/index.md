---
title: "Korzystanie z ukrytych adresów"
description: "Ukryte adresy pozwalają użytkownikom na anonimowe przesyłanie aktywów. Po przeczytaniu tego artykułu będziesz w stanie: wyjaśnić, czym są ukryte adresy i jak działają, zrozumieć, jak używać ukrytych adresów w sposób zachowujący anonimowość, oraz napisać aplikację internetową, która używa ukrytych adresów."
author: Ori Pomerantz
tags:
  [
    "Ukryty adres",
    "prywatność",
    "kryptografia",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: pl
sidebarDepth: 3
---

Jesteś Billem. Z powodów, których nie będziemy tu omawiać, chcesz przekazać darowiznę na kampanię „Alicja na królową świata” i chcesz, aby Alicja wiedziała, że to Ty przekazałeś darowiznę, aby mogła Cię nagrodzić, jeśli wygra. Niestety, jej zwycięstwo nie jest gwarantowane. Istnieje konkurencyjna kampania „Karolina na cesarzową Układu Słonecznego”. Jeśli Karolina wygra i dowie się, że wsparłeś Alicję, będziesz w kłopotach. Więc nie możesz po prostu przelać 200 ETH ze swojego konta na konto Alicji.

Rozwiązaniem jest [ERC-5564](https://eips.ethereum.org/EIPS/eip-5564). Ten ERC wyjaśnia, jak używać [ukrytych adresów](https://nerolation.github.io/stealth-utils) do anonimowych transferów.

**Ostrzeżenie**: Kryptografia stojąca za ukrytymi adresami jest, o ile nam wiadomo, solidna. Istnieją jednak potencjalne ataki typu side-channel. [Poniżej](#go-wrong) zobaczysz, co możesz zrobić, aby zmniejszyć to ryzyko.

## Jak działają ukryte adresy {#how}

Ten artykuł spróbuje wyjaśnić działanie ukrytych adresów na dwa sposoby. Pierwszy to [jak z nich korzystać](#how-use). Ta część jest wystarczająca do zrozumienia reszty artykułu. Następnie znajduje się [wyjaśnienie matematyki stojącej za tym mechanizmem](#how-math). Jeśli interesujesz się kryptografią, przeczytaj również tę część.

### Wersja prosta (jak używać ukrytych adresów) {#how-use}

Alicja tworzy dwa klucze prywatne i publikuje odpowiadające im klucze publiczne (które można połączyć w jeden meta-adres o podwójnej długości). Bill również tworzy klucz prywatny i publikuje odpowiadający mu klucz publiczny.

Używając klucza publicznego jednej strony i klucza prywatnego drugiej, można uzyskać wspólny sekret znany tylko Alicji i Billowi (nie można go uzyskać z samych kluczy publicznych). Używając tego wspólnego sekretu, Bill uzyskuje ukryty adres i może na niego wysyłać aktywa.

Alicja również uzyskuje adres ze wspólnego sekretu, ale ponieważ zna klucze prywatne do opublikowanych przez siebie kluczy publicznych, może również uzyskać klucz prywatny, który pozwala jej wypłacić środki z tego adresu.

### Matematyka (dlaczego ukryte adresy działają w ten sposób) {#how-math}

Standardowe ukryte adresy używają [kryptografii krzywych eliptycznych (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor), aby uzyskać lepszą wydajność przy mniejszej liczbie bitów klucza, zachowując jednocześnie ten sam poziom bezpieczeństwa. Jednak w większości możemy to zignorować i udawać, że używamy zwykłej arytmetyki.

Istnieje liczba, którą wszyscy znają, _G_. Można mnożyć przez _G_. Ale ze względu na naturę ECC, praktycznie niemożliwe jest dzielenie przez _G_. Sposób, w jaki ogólnie działa kryptografia klucza publicznego w Ethereum, polega na tym, że można użyć klucza prywatnego, _P<sub>priv</sub>_, do podpisywania transakcji, które są następnie weryfikowane przez klucz publiczny, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alicja tworzy dwa klucze prywatne, _K<sub>priv</sub>_ i _V<sub>priv</sub>_. _K<sub>priv</sub>_ będzie używany do wydawania pieniędzy z ukrytego adresu, a _V<sub>priv</sub>_ do przeglądania adresów należących do Alicji. Alicja następnie publikuje klucze publiczne: _K<sub>pub</sub> = GK<sub>priv</sub>_ i _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill tworzy trzeci klucz prywatny, _R<sub>priv</sub>_, i publikuje _R<sub>pub</sub> = GR<sub>priv</sub>_ w centralnym rejestrze (Bill mógłby również wysłać go do Alicji, ale zakładamy, że Karolina podsłuchuje).

Bill oblicza _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, co, jak oczekuje, Alicja również zna (wyjaśniono poniżej). Ta wartość nazywana jest _S_, wspólnym sekretem. Daje to Billowi klucz publiczny, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hasz(S)_. Na podstawie tego klucza publicznego może obliczyć adres i wysłać na niego dowolne zasoby. W przyszłości, jeśli Alicja wygra, Bill może podać jej _R<sub>priv</sub>_, aby udowodnić, że zasoby pochodzą od niego.

Alicja oblicza _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Daje jej to ten sam wspólny sekret, _S_. Ponieważ zna klucz prywatny, _K<sub>priv</sub>_, może obliczyć _P<sub>priv</sub> = K<sub>priv</sub>+hasz(S)_. Ten klucz pozwala jej na dostęp do aktywów pod adresem wynikającym z _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hasz(S) = K<sub>pub</sub>+G\*hasz(S)_.

Mamy oddzielny klucz do przeglądania, aby umożliwić Alicji zlecenie usług firmie Dave's World Domination Campaign Services. Alicja jest skłonna pozwolić Dave'owi poznać adresy publiczne i informować ją, gdy dostępne będą kolejne pieniądze, ale nie chce, aby wydawał on pieniądze z jej kampanii.

Ponieważ przeglądanie i wydawanie używają oddzielnych kluczy, Alicja może dać Dave'owi _V<sub>priv</sub>_. Wtedy Dave może obliczyć _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ i w ten sposób uzyskać klucze publiczne (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hasz(S)_). Ale bez _K<sub>priv</sub>_ Dave nie może uzyskać klucza prywatnego.

Podsumowując, oto wartości znane przez różnych uczestników.

| Alicja                                                                    | Opublikowane      | Bill                                                                      | Dave                                                                        |                                               |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                               |
| _K<sub>priv</sub>_                                                        | –                 | –                                                                         | –                                                                           |                                               |
| _V<sub>priv</sub>_                                                        | –                 | –                                                                         | _V<sub>priv</sub>_                                                          |                                               |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                               |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                               |
| –                                                                         | –                 | _R<sub>priv</sub>_                                                        | –                                                                           |                                               |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                               |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | –                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                               |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hasz(S)_         | –                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hasz(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hasz(S)_           |                                               |
| _Adres=f(P<sub>pub</sub>)_                             | –                 | _Adres=f(P<sub>pub</sub>)_                             | _Adres=f(P<sub>pub</sub>)_                               | _Adres=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hasz(S)_          | –                 | –                                                                         | –                                                                           |                                               |

## Kiedy ukryte adresy zawodzą {#go-wrong}

_Na blockchainie nie ma żadnych tajemnic_. Chociaż ukryte adresy mogą zapewnić Ci prywatność, jest ona podatna na analizę ruchu. Jako trywialny przykład wyobraź sobie, że Bill zasila adres i natychmiast wysyła transakcję w celu opublikowania wartości _R<sub>pub</sub>_. Bez _V<sub>priv</sub>_ Alicji nie możemy być pewni, że jest to ukryty adres, ale tak należy zakładać. Następnie widzimy inną transakcję, która przenosi całe ETH z tego adresu na adres funduszu kampanii Alicji. Możemy nie być w stanie tego udowodnić, ale jest prawdopodobne, że Bill właśnie przekazał darowiznę na kampanię Alicji. Karolina z pewnością by tak pomyślała.

Bill może łatwo oddzielić publikację _R<sub>pub</sub>_ od zasilenia ukrytego adresu (wykonać je w różnym czasie, z różnych adresów). To jednak nie wystarczy. Wzorzec, którego szuka Karolina, polega na tym, że Bill zasila adres, a następnie fundusz kampanii Alicji wypłaca z niego środki.

Jednym z rozwiązań jest to, aby kampania Alicji nie wypłacała pieniędzy bezpośrednio, ale używała ich do zapłaty stronie trzeciej. Jeśli kampania Alicji wyśle 10 ETH do Dave's World Domination Campaign Services, Karolina będzie wiedziała tylko, że Bill przekazał darowiznę jednemu z klientów Dave'a. Jeśli Dave ma wystarczającą liczbę klientów, Karolina nie będzie w stanie stwierdzić, czy Bill przekazał darowiznę Alicji, która z nią konkuruje, czy Adamowi, Albertowi lub Abigail, na których Karolinie nie zależy. Alicja może dołączyć do płatności zahaszowaną wartość, a następnie dostarczyć Dave'owi jej preobraz, aby udowodnić, że była to jej darowizna. Alternatywnie, jak wspomniano powyżej, jeśli Alicja da Dave'owi swoje _V<sub>priv</sub>_, on już wie, od kogo pochodzi płatność.

Głównym problemem tego rozwiązania jest to, że wymaga ono od Alicji dbania o tajemnicę, gdy ta tajemnica przynosi korzyści Billowi. Alicja może chcieć utrzymać swoją reputację, aby przyjaciel Billa, Bob, również przekazał jej darowiznę. Ale możliwe jest również, że nie będzie jej przeszkadzało zdemaskowanie Billa, ponieważ wtedy będzie się on bał, co się stanie, jeśli Karolina wygra. Bill może w końcu udzielić Alicji jeszcze większego wsparcia.

### Używanie wielu warstw ukrytych {#multi-layer}

Zamiast polegać na Alicji w kwestii zachowania prywatności Billa, Bill może zrobić to sam. Może wygenerować wiele meta-adresów dla fikcyjnych osób, Boba i Belli. Następnie Bill wysyła ETH do Boba, a „Bob” (który w rzeczywistości jest Billem) wysyła je do Belli. „Bella” (również Bill) wysyła je do Alicji.

Karolina wciąż może przeprowadzić analizę ruchu i zobaczyć potok od Billa do Boba, do Belli, do Alicji. Jednakże, jeśli „Bob” i „Bella” również używają ETH do innych celów, nie będzie wyglądało na to, że Bill przekazał cokolwiek Alicji, nawet jeśli Alicja natychmiast wypłaci środki z ukrytego adresu na swój znany adres kampanii.

## Pisanie aplikacji z ukrytymi adresami {#write-app}

Ten artykuł wyjaśnia aplikację z ukrytymi adresami [dostępną na GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Narzędzia {#tools}

Istnieje [biblioteka ukrytych adresów w TypeScript](https://github.com/ScopeLift/stealth-address-sdk), której moglibyśmy użyć. Jednak operacje kryptograficzne mogą być intensywne dla procesora. Wolę je implementować w języku kompilowanym, takim jak [Rust](https://rust-lang.org/), i używać [WASM](https://webassembly.org/) do uruchamiania kodu w przeglądarce.

Będziemy używać [Vite](https://vite.dev/) i [React](https://react.dev/). Są to standardowe narzędzia branżowe; jeśli ich nie znasz, możesz skorzystać z [tego samouczka](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Aby używać Vite, potrzebujemy Node.

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

5. Przejdź do [aplikacji](http://localhost:5173/). Ta strona aplikacji ma dwie ramki: jedną dla interfejsu użytkownika Alicji, a drugą dla Billa. Te dwie ramki nie komunikują się ze sobą; znajdują się na tej samej stronie tylko dla wygody.

6. Jako Alicja kliknij **Wygeneruj ukryty meta-adres**. Wyświetli to nowy ukryty adres i odpowiadające mu klucze prywatne. Skopiuj ukryty meta-adres do schowka.

7. Jako Bill, wklej nowy ukryty meta-adres i kliknij **Wygeneruj adres**. Otrzymasz adres do zasilenia dla Alicji.

8. Skopiuj adres i klucz publiczny Billa i wklej je w polu „Klucz prywatny dla adresu wygenerowanego przez Billa” w interfejsie użytkownika Alicji. Po wypełnieniu tych pól zobaczysz klucz prywatny umożliwiający dostęp do aktywów pod tym adresem.

9. Możesz użyć [kalkulatora online](https://iancoleman.net/ethereum-private-key-to-address/), aby upewnić się, że klucz prywatny odpowiada adresowi.

### Jak działa program {#how-the-program-works}

#### Komponent WASM {#wasm}

Kod źródłowy, który kompiluje się do WASM, jest napisany w języku [Rust](https://rust-lang.org/). Możesz go zobaczyć w [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Ten kod jest przede wszystkim interfejsem między kodem JavaScript a [biblioteką `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) w Rust jest analogiczny do [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) w JavaScript. Zawiera informacje o pakiecie, deklaracje zależności itp.

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

Pakiet [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) musi generować wartości losowe. Nie można tego zrobić czysto algorytmicznymi środkami; wymaga to dostępu do procesu fizycznego jako źródła entropii. Ta definicja określa, że uzyskamy tę entropię, pytając przeglądarkę, w której działamy.

```toml
console_error_panic_hook = "0.1.7"
```

[Ta biblioteka](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) dostarcza nam bardziej znaczących komunikatów o błędach, gdy kod WASM wpadnie w panikę i nie może kontynuować.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Typ wyjściowy wymagany do wyprodukowania kodu WASM.

**`lib.rs`**

To jest właściwy kod Rust.

```rust
use wasm_bindgen::prelude::*;
```

Definicje do stworzenia pakietu WASM z Rusta. Są one udokumentowane [tutaj](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

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

Rust zazwyczaj używa tablic bajtów ([arrays](https://doc.rust-lang.org/std/primitive.array.html)) (`[u8; <rozmiar>]`) dla wartości. Ale w JavaScript zazwyczaj używamy ciągów szesnastkowych. [Biblioteka `hex`](https://docs.rs/hex/latest/hex/) tłumaczy dla nas z jednej reprezentacji na drugą.

```rust
#[wasm_bindgen]
```

Generuj powiązania WASM, aby móc wywołać tę funkcję z JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Najprostszym sposobem na zwrócenie obiektu z wieloma polami jest zwrócenie ciągu znaków JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

Funkcja [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) zwraca trzy pola:

- Meta-adres (_K<sub>pub</sub>_ i _V<sub>pub</sub>_)
- Klucz prywatny do przeglądania (_V<sub>priv</sub>_)
- Klucz prywatny do wydawania (_K<sub>priv</sub>_)

Składnia [tupli](https://doc.rust-lang.org/std/primitive.tuple.html) pozwala nam ponownie rozdzielić te wartości.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Użyj makra [`format!`](https://doc.rust-lang.org/std/fmt/index.html), aby wygenerować ciąg znaków w formacie JSON. Użyj [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html), aby zamienić tablice na ciągi szesnastkowe.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Ta funkcja zamienia ciąg szesnastkowy (dostarczony przez JavaScript) na tablicę bajtów. Używamy jej do parsowania wartości dostarczonych przez kod JavaScript. Ta funkcja jest skomplikowana ze względu na sposób, w jaki Rust obsługuje tablice i wektory.

Wyrażenie `<const N: usize>` nazywane jest [generykiem](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` jest parametrem, który kontroluje długość zwracanej tablicy. Funkcja jest w rzeczywistości wywoływana jako `str_to_array::<n>`, gdzie `n` to długość tablicy.

Wartość zwracana to `Option<[u8; N]>`, co oznacza, że zwracana tablica jest [opcjonalna](https://doc.rust-lang.org/std/option/). Jest to typowy wzorzec w Rust dla funkcji, które mogą zakończyć się niepowodzeniem.

Na przykład, jeśli wywołamy `str_to_array::10("bad060a7")`, funkcja ma zwrócić tablicę dziesięciu wartości, ale dane wejściowe mają tylko cztery bajty. Funkcja musi zakończyć się niepowodzeniem i robi to, zwracając `None`. Wartością zwrotną dla `str_to_array::4("bad060a7")` byłoby `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Funkcja [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) zwraca `Result<Vec<u8>, FromHexError>`. Typ [`Result`](https://doc.rust-lang.org/std/result/) może zawierać pomyślny wynik (`Ok(value)`) lub błąd (`Err(error)`).

Metoda `.ok()` zamienia `Result` na `Option`, której wartością jest albo wartość `Ok()`, jeśli operacja się powiedzie, albo `None`, jeśli nie. Na koniec, [operator znaku zapytania](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) przerywa bieżącą funkcję i zwraca `None`, jeśli `Option` jest puste. W przeciwnym razie odpakowuje wartość i zwraca ją (w tym przypadku, aby przypisać wartość do `vec`).

Wygląda to na dziwnie zawiłą metodę obsługi błędów, ale `Result` i `Option` zapewniają, że wszystkie błędy są obsługiwane, w ten czy inny sposób.

```rust
    if vec.len() != N { return None; }
```

Jeśli liczba bajtów jest nieprawidłowa, jest to błąd i zwracamy `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust ma dwa typy tablic. [Tablice](https://doc.rust-lang.org/std/primitive.array.html) mają stały rozmiar. [Wektory](https://doc.rust-lang.org/std/vec/index.html) mogą rosnąć i maleć. `hex::decode` zwraca wektor, ale biblioteka `eth_stealth_addresses` chce otrzymywać tablice. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) konwertuje wartość na inny typ, na przykład wektor na tablicę.

```rust
    Some(array)
}
```

Rust nie wymaga użycia słowa kluczowego [`return`](https://doc.rust-lang.org/std/keyword.return.html) przy zwracaniu wartości na końcu funkcji.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Ta funkcja otrzymuje publiczny meta-adres, który zawiera zarówno _V<sub>pub</sub>_, jak i _K<sub>pub</sub>_. Zwraca ukryty adres, klucz publiczny do opublikowania (_R<sub>pub</sub>_) oraz jednobajtową wartość skanowania, która przyspiesza identyfikację, które opublikowane adresy mogą należeć do Alicji.

Wartość skanowania jest częścią wspólnego sekretu (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Ta wartość jest dostępna dla Alicji, a jej sprawdzenie jest znacznie szybsze niż sprawdzenie, czy _f(K<sub>pub</sub>+G\*hasz(S))_ jest równe opublikowanemu adresowi.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Używamy biblioteki [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html).

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Przygotuj ciąg wyjściowy zakodowany w formacie JSON.

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

Ta funkcja używa biblioteki [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) do obliczenia klucza prywatnego do wypłaty z adresu (_R<sub>priv</sub>_). To obliczenie wymaga następujących wartości:

- Adres (_Adres=f(P<sub>pub</sub>)_)
- Klucz publiczny wygenerowany przez Billa (_R<sub>pub</sub>_)
- Klucz prywatny do przeglądania (_V<sub>priv</sub>_)
- Klucz prywatny do wydawania (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) określa, że funkcja jest wykonywana po zainicjowaniu kodu WASM.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Ten kod określa, że dane wyjściowe paniki są wysyłane do konsoli JavaScript. Aby zobaczyć to w działaniu, użyj aplikacji i podaj Billowi nieprawidłowy meta-adres (wystarczy zmienić jedną cyfrę szesnastkową). W konsoli JavaScript zobaczysz następujący błąd:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Po którym następuje ślad stosu. Następnie podaj Billowi prawidłowy meta-adres, a Alicji nieprawidłowy adres lub nieprawidłowy klucz publiczny. Zobaczysz następujący błąd:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
klucze nie generują ukrytego adresu
```

Ponownie, po którym następuje ślad stosu.

#### Interfejs użytkownika {#ui}

Interfejs użytkownika jest napisany przy użyciu [React](https://react.dev/) i serwowany przez [Vite](https://vite.dev/). Możesz dowiedzieć się o nich, korzystając z [tego samouczka](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Nie ma tu potrzeby używania [WAGMI](https://wagmi.sh/), ponieważ nie wchodzimy w bezpośrednią interakcję z blockchainem ani portfelem.

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

Ten plik jest głównym komponentem aplikacji. Jest to kontener, który zawiera dwa komponenty: `Alice` i `Bill`, interfejsy użytkownika dla tych użytkowników. Istotną częścią dla WASM jest kod inicjalizacyjny.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Gdy używamy [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), tworzy on dwa pliki, których tu używamy: plik wasm z właściwym kodem (tutaj, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) oraz plik JavaScript z definicjami do jego użycia (tutaj, `src/rust_wasm/pkg/rust_wasm.js`). Domyślny eksport tego pliku JavaScript to kod, który musi zostać uruchomiony, aby zainicjować WASM.

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

Hak [`useEffect`](https://react.dev/reference/react/useEffect) pozwala określić funkcję, która jest wykonywana, gdy zmieniają się zmienne stanu. Tutaj lista zmiennych stanu jest pusta (`[]`), więc ta funkcja jest wykonywana tylko raz, gdy strona się ładuje.

Funkcja efektu musi natychmiast zwrócić wartość. Aby użyć kodu asynchronicznego, takiego jak `init` WASM (który musi załadować plik `.wasm` i dlatego wymaga czasu), definiujemy wewnętrzną funkcję [`async`](https://en.wikipedia.org/wiki/Async/await) i uruchamiamy ją bez `await`.

**`Bill.jsx`**

To jest interfejs użytkownika dla Billa. Ma jedną akcję: tworzenie adresu na podstawie ukrytego meta-adresu dostarczonego przez Alicję.

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

Kod w `Alice.jsx` jest analogiczny, z wyjątkiem tego, że Alicja ma dwie akcje:

- Wygeneruj meta-adres
- Uzyskaj klucz prywatny dla adresu opublikowanego przez Billa

## Wnioski {#conclusion}

Ukryte adresy nie są panaceum; muszą być [używane poprawnie](#go-wrong). Ale gdy są używane poprawnie, mogą zapewnić prywatność na publicznym blockchainie.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).