---
title: "Používání skrytých adres"
description: "Skryté adresy umožňují uživatelům anonymní převod aktiv. Po přečtení tohoto článku budete schopni: vysvětlit, co jsou skryté adresy a jak fungují, pochopit, jak je používat způsobem, který zachovává anonymitu, a napsat webovou aplikaci, která skryté adresy využívá."
author: Ori Pomerantz
tags: ["Skrytá adresa", "soukromí", "kryptografie", "Rust", "wasm"]
skill: intermediate
breadcrumb: "Skryté adresy"
published: 2025-11-30
lang: cs
sidebarDepth: 3
---

Jste Bill. Z důvodů, do kterých nebudeme zabíhat, chcete přispět na kampaň „Alice královnou světa“ a chcete, aby Alice věděla, že jste přispěli, aby vás mohla odměnit, pokud vyhraje. Její vítězství bohužel není zaručeno. Existuje konkurenční kampaň „Carol císařovnou sluneční soustavy“. Pokud Carol vyhraje a zjistí, že jste přispěli Alici, budete mít potíže. Nemůžete tedy jen tak převést 200 ETH ze svého účtu na účet Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) má řešení. Tento ERC vysvětluje, jak používat [skryté adresy](https://nerolation.github.io/stealth-utils) pro anonymní převod.

**Varování**: Kryptografie, na které jsou skryté adresy založeny, je, pokud víme, spolehlivá. Existují však potenciální útoky postranními kanály (side-channel attacks). [Níže](#go-wrong) uvidíte, co můžete udělat pro snížení tohoto rizika.

## Jak fungují skryté adresy {#how}

Tento článek se pokusí vysvětlit skryté adresy dvěma způsoby. Prvním je, [jak je používat](#how-use). Tato část postačuje k pochopení zbytku článku. Následuje [vysvětlení matematiky, která za tím stojí](#how-math). Pokud se zajímáte o kryptografii, přečtěte si i tuto část. 

### Jednoduchá verze (jak používat skryté adresy) {#how-use}

Alice vytvoří dva soukromé klíče a zveřejní odpovídající veřejné klíče (které lze spojit do jedné meta-adresy s dvojnásobnou délkou). Bill také vytvoří soukromý klíč a zveřejní odpovídající veřejný klíč.

Pomocí veřejného klíče jedné strany a soukromého klíče druhé strany lze odvodit sdílené tajemství, které znají pouze Alice a Bill (nelze jej odvodit pouze z veřejných klíčů). Pomocí tohoto sdíleného tajemství Bill získá skrytou adresu a může na ni posílat aktiva.

Alice také získá adresu ze sdíleného tajemství, ale protože zná soukromé klíče k veřejným klíčům, které zveřejnila, může také získat soukromý klíč, který jí umožní z této adresy vybírat.

### Matematika (proč skryté adresy fungují takto) {#how-math}

Standardní skryté adresy používají [kryptografii eliptických křivek (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) k dosažení lepšího výkonu s menším počtem bitů klíče, přičemž si zachovávají stejnou úroveň zabezpečení. Většinou to ale můžeme ignorovat a předstírat, že používáme běžnou aritmetiku.

Existuje číslo, které všichni znají, *G*. Můžete jím násobit. Ale vzhledem k povaze ECC je prakticky nemožné jím dělit. Způsob, jakým kryptografie veřejného klíče v Ethereu obecně funguje, je ten, že můžete použít soukromý klíč, *P<sub>priv</sub>*, k podepisování transakcí, které jsou pak ověřeny veřejným klíčem, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice vytvoří dva soukromé klíče, *K<sub>priv</sub>* a *V<sub>priv</sub>*. *K<sub>priv</sub>* se použije k utrácení peněz ze skryté adresy a *V<sub>priv</sub>* k prohlížení adres, které patří Alici. Alice poté zveřejní veřejné klíče: *K<sub>pub</sub> = GK<sub>priv</sub>* a *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill vytvoří třetí soukromý klíč, *R<sub>priv</sub>*, a zveřejní *R<sub>pub</sub> = GR<sub>priv</sub>* v centrálním registru (Bill ho mohl poslat i Alici, ale předpokládáme, že Carol naslouchá).

Bill vypočítá *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, což očekává, že Alice také zná (vysvětleno níže). Tato hodnota se nazývá *S*, sdílené tajemství. To dává Billovi veřejný klíč, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Z tohoto veřejného klíče může vypočítat adresu a poslat na ni jakékoli prostředky, které chce. V budoucnu, pokud Alice vyhraje, jí Bill může sdělit *R<sub>priv</sub>*, aby dokázal, že prostředky pocházejí od něj.

Alice vypočítá *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. To jí dává stejné sdílené tajemství, *S*. Protože zná soukromý klíč, *K<sub>priv</sub>*, může vypočítat *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Tento klíč jí umožňuje přístup k aktivům na adrese, která vyplývá z *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Máme samostatný klíč pro prohlížení, abychom Alici umožnili zadat subdodávku službám Daveovy kampaně za ovládnutí světa. Alice je ochotná nechat Davea znát veřejné adresy a informovat ji, když bude k dispozici více peněz, ale nechce, aby utrácel peníze z její kampaně.

Protože prohlížení a utrácení používají oddělené klíče, může Alice dát Daveovi *V<sub>priv</sub>*. Pak může Dave vypočítat *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* a tímto způsobem získat veřejné klíče (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Ale bez *K<sub>priv</sub>* Dave nemůže získat soukromý klíč.

Shrnuto, toto jsou hodnoty, které znají různí účastníci.

| Alice | Zveřejněno | Bill | Dave |
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

## Když se skryté adresy pokazí {#go-wrong}

*Na blockchainu neexistují žádná tajemství*. Ačkoli vám skryté adresy mohou poskytnout soukromí, toto soukromí je náchylné k analýze provozu. Vezměme si triviální příklad: představte si, že Bill pošle prostředky na adresu a okamžitě odešle transakci, aby zveřejnil hodnotu *R<sub>pub</sub>*. Bez Alicina *V<sub>priv</sub>* si nemůžeme být jisti, že se jedná o skrytou adresu, ale je to velmi pravděpodobné. Pak vidíme další transakci, která převede všechny ETH z této adresy na adresu fondu Aliciny kampaně. Možná to nedokážeme dokázat, ale je pravděpodobné, že Bill právě přispěl na Alicinu kampaň. Carol by si to určitě myslela.

Pro Billa je snadné oddělit zveřejnění *R<sub>pub</sub>* od financování skryté adresy (udělat to v různou dobu, z různých adres). To však nestačí. Vzor, který Carol hledá, je ten, že Bill pošle prostředky na adresu a fond Aliciny kampaně z ní pak vybírá. 

Jedním z řešení je, aby Alicina kampaň nevybírala peníze přímo, ale použila je k zaplacení třetí straně. Pokud Alicina kampaň pošle 10 ETH Daveovým službám kampaně za ovládnutí světa, Carol ví jen to, že Bill přispěl jednomu z Daveových zákazníků. Pokud má Dave dostatek zákazníků, Carol by nemohla vědět, zda Bill přispěl Alici, která jí konkuruje, nebo Adamovi, Albertovi či Abigail, o které se Carol nezajímá. Alice může k platbě připojit hashovanou hodnotu a poté poskytnout Daveovi předobraz (preimage), aby dokázala, že to byl její dar. Alternativně, jak bylo uvedeno výše, pokud Alice dá Daveovi svůj *V<sub>priv</sub>*, on už ví, od koho platba přišla.

Hlavním problémem tohoto řešení je, že vyžaduje, aby se Alice starala o utajení, když z tohoto utajení těží Bill. Alice si možná bude chtít udržet svou pověst, aby jí přispěl i Billův přítel Bob. Ale je také možné, že by jí nevadilo Billa odhalit, protože pak se bude bát, co se stane, když Carol vyhraje. Bill by nakonec mohl Alici poskytnout ještě větší podporu.

### Použití více skrytých vrstev {#multi-layer}

Místo toho, aby se Bill spoléhal na Alici, že zachová jeho soukromí, může to udělat sám. Může vygenerovat více meta-adres pro fiktivní osoby, Boba a Bellu. Bill pak pošle ETH Bobovi a „Bob“ (což je ve skutečnosti Bill) je pošle Belle. „Bella“ (také Bill) je pošle Alici.

Carol může stále provádět analýzu provozu a vidět cestu Bill-Bob-Bella-Alice. Pokud však „Bob“ a „Bella“ používají ETH i k jiným účelům, nebude to vypadat, že Bill převedl něco Alici, i když Alice okamžitě vybere prostředky ze skryté adresy na svou známou adresu kampaně.

## Psaní aplikace se skrytými adresami {#write-app}

Tento článek vysvětluje aplikaci se skrytými adresami, která je [dostupná na GitHubu](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Nástroje {#tools}

Existuje [knihovna pro skryté adresy v TypeScriptu](https://github.com/ScopeLift/stealth-address-sdk), kterou bychom mohli použít. Kryptografické operace však mohou být náročné na procesor. Raději je implementuji v kompilovaném jazyce, jako je [Rust](https://rust-lang.org/), a používám [WASM](https://webassembly.org/) ke spuštění kódu v prohlížeči.

Budeme používat [Vite](https://vite.dev/) a [React](https://react.dev/). Jedná se o standardní oborové nástroje; pokud s nimi nejste obeznámeni, můžete použít [tento tutoriál](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). K použití Vite potřebujeme Node.

### Podívejte se na skryté adresy v akci {#in-action}

1. Nainstalujte potřebné nástroje: [Rust](https://rust-lang.org/tools/install/) a [Node](https://nodejs.org/en/download).

2. Naklonujte repozitář z GitHubu.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Nainstalujte prerekvizity a zkompilujte kód v Rustu.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Spusťte webový server.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Přejděte do [aplikace](http://localhost:5173/). Tato stránka aplikace má dva rámce: jeden pro uživatelské rozhraní Alice a druhý pro Billovo. Tyto dva rámce spolu nekomunikují; jsou na stejné stránce pouze pro pohodlí.

6. Jako Alice klikněte na **Generate a Stealth Meta-Address** (Vygenerovat skrytou meta-adresu). Zobrazí se nová skrytá adresa a odpovídající soukromé klíče. Zkopírujte skrytou meta-adresu do schránky.

7. Jako Bill vložte novou skrytou meta-adresu a klikněte na **Generate an address** (Vygenerovat adresu). Tím získáte adresu, na kterou můžete Alici poslat prostředky. 

8. Zkopírujte adresu a Billův veřejný klíč a vložte je do oblasti „Private key for address generated by Bill“ (Soukromý klíč pro adresu vygenerovanou Billem) v uživatelském rozhraní Alice. Jakmile jsou tato pole vyplněna, uvidíte soukromý klíč pro přístup k aktivům na této adrese.

9. Můžete použít [online kalkulačku](https://iancoleman.net/ethereum-private-key-to-address/), abyste se ujistili, že soukromý klíč odpovídá adrese.

### Jak program funguje {#how-the-program-works}

#### Komponenta WASM {#wasm}

Zdrojový kód, který se kompiluje do WASM, je napsán v [Rustu](https://rust-lang.org/). Můžete ho vidět v [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Tento kód je primárně rozhraním mezi kódem v JavaScriptu a [knihovnou `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) v Rustu je obdobou [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) v JavaScriptu. Obsahuje informace o balíčku, deklarace závislostí atd.

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

Balíček [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) potřebuje generovat náhodné hodnoty. To nelze provést čistě algoritmickými prostředky; vyžaduje to přístup k fyzikálnímu procesu jako zdroji entropie. Tato definice specifikuje, že tuto entropii získáme dotazem na prohlížeč, ve kterém běžíme.

```toml
console_error_panic_hook = "0.1.7"
```

[Tato knihovna](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) nám poskytuje smysluplnější chybové zprávy, když kód WASM zpanikaří (panic) a nemůže pokračovat.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Typ výstupu potřebný k vytvoření kódu WASM.

**`lib.rs`**

Toto je samotný kód v Rustu.

```rust
use wasm_bindgen::prelude::*;
```

Definice pro vytvoření balíčku WASM z Rustu. Jsou zdokumentovány [zde](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Funkce, které potřebujeme z [knihovny `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust pro hodnoty obvykle používá bajtová [pole](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`). Ale v JavaScriptu obvykle používáme hexadecimální řetězce. [Knihovna `hex`](https://docs.rs/hex/latest/hex/) za nás překládá z jedné reprezentace do druhé.

```rust
#[wasm_bindgen]
```

Vygenerování vazeb (bindings) WASM, abychom mohli tuto funkci volat z JavaScriptu.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Nejjednodušší způsob, jak vrátit objekt s více poli, je vrátit řetězec JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) vrací tři pole:

- Meta-adresu (*K<sub>pub</sub>* a *V<sub>pub</sub>*)
- Soukromý klíč pro prohlížení (*V<sub>priv</sub>*)
- Soukromý klíč pro utrácení (*K<sub>priv</sub>*)

Syntaxe [n-tice (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) nám umožňuje tyto hodnoty opět oddělit.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Použijte makro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) k vygenerování řetězce kódovaného v JSON. Použijte [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) ke změně polí na hexadecimální řetězce.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Tato funkce mění hexadecimální řetězec (poskytnutý JavaScriptem) na bajtové pole. Používáme ji k parsování hodnot poskytnutých kódem v JavaScriptu. Tato funkce je složitá kvůli tomu, jak Rust zachází s poli a vektory.

Výraz `<const N: usize>` se nazývá [generikum](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` je parametr, který řídí délku vráceného pole. Funkce se ve skutečnosti nazývá `str_to_array::<n>`, kde `n` je délka pole.

Návratová hodnota je `Option<[u8; N]>`, což znamená, že vrácené pole je [volitelné (optional)](https://doc.rust-lang.org/std/option/). Toto je v Rustu typický vzor pro funkce, které mohou selhat.

Pokud například zavoláme `str_to_array::10("bad060a7")`, funkce by měla vrátit pole o deseti hodnotách, ale vstup má pouze čtyři bajty. Funkce musí selhat a učiní tak vrácením `None`. Návratová hodnota pro `str_to_array::4("bad060a7")` by byla `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode vrací Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Funkce [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) vrací `Result<Vec<u8>, FromHexError>`. Typ [`Result`](https://doc.rust-lang.org/std/result/) může obsahovat buď úspěšný výsledek (`Ok(value)`), nebo chybu (`Err(error)`).

Metoda `.ok()` změní `Result` na `Option`, jehož hodnota je buď hodnota `Ok()` v případě úspěchu, nebo `None` v případě neúspěchu. Nakonec [operátor otazníku](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) přeruší aktuální funkci a vrátí `None`, pokud je `Option` prázdný. V opačném případě rozbalí (unwrap) hodnotu a vrátí ji (v tomto případě pro přiřazení hodnoty do `vec`).

Vypadá to jako podivně spletitá metoda pro zpracování chyb, ale `Result` a `Option` zajišťují, že všechny chyby jsou tak či onak ošetřeny.

```rust
    if vec.len() != N { return None; }
```

Pokud je počet bajtů nesprávný, jedná se o selhání a vrátíme `None`.

```rust
    // try_into spotřebuje vec a pokusí se vytvořit [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust má dva typy polí. [Pole (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) mají pevnou velikost. [Vektory (Vectors)](https://doc.rust-lang.org/std/vec/index.html) se mohou zvětšovat a zmenšovat. `hex::decode` vrací vektor, ale knihovna `eth_stealth_addresses` chce přijímat pole. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) převede hodnotu na jiný typ, například vektor na pole.

```rust
    Some(array)
}
```

Rust nevyžaduje použití klíčového slova [`return`](https://doc.rust-lang.org/std/keyword.return.html) při vracení hodnoty na konci funkce.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Tato funkce přijímá veřejnou meta-adresu, která zahrnuje jak *V<sub>pub</sub>*, tak *K<sub>pub</sub>*. Vrací skrytou adresu, veřejný klíč ke zveřejnění (*R<sub>pub</sub>*) a jednobajtovou hodnotu pro skenování, která urychluje identifikaci toho, které zveřejněné adresy mohou patřit Alici.

Hodnota pro skenování je součástí sdíleného tajemství (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Tato hodnota je dostupná Alici a její kontrola je mnohem rychlejší než kontrola, zda se *f(K<sub>pub</sub>+G\*hash(S))* rovná zveřejněné adrese.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Používáme [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) z knihovny.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Příprava výstupního řetězce kódovaného v JSON.

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

Tato funkce používá [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) z knihovny k výpočtu soukromého klíče pro výběr z adresy (*R<sub>priv</sub>*). Tento výpočet vyžaduje tyto hodnoty:

- Adresu (*Address=f(P<sub>pub</sub>)*)
- Veřejný klíč vygenerovaný Billem (*R<sub>pub</sub>*)
- Soukromý klíč pro prohlížení (*V<sub>priv</sub>*)
- Soukromý klíč pro utrácení (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) specifikuje, že se funkce provede při inicializaci kódu WASM.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Tento kód specifikuje, že výstup při panice (panic) se odešle do konzole JavaScriptu. Chcete-li to vidět v akci, použijte aplikaci a dejte Billovi neplatnou meta-adresu (stačí změnit jednu hexadecimální číslici). V konzoli JavaScriptu uvidíte tuto chybu:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Následováno trasováním zásobníku (stack trace). Poté dejte Billovi platnou meta-adresu a Alici dejte buď neplatnou adresu, nebo neplatný veřejný klíč. Uvidíte tuto chybu:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Opět následováno trasováním zásobníku.

#### Uživatelské rozhraní {#ui}

Uživatelské rozhraní je napsáno pomocí [React](https://react.dev/) a obsluhováno pomocí [Vite](https://vite.dev/). Můžete se o nich dozvědět pomocí [tohoto tutoriálu](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Není zde potřeba [Wagmi](https://wagmi.sh/), protože nekomunikujeme přímo s blockchainem ani peněženkou.

Jedinou ne zcela zřejmou částí uživatelského rozhraní je připojení WASM. Zde je návod, jak to funguje.

**`vite.config.js`**

Tento soubor obsahuje [konfiguraci Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Potřebujeme dva pluginy pro Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) a [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Tento soubor je hlavní komponentou aplikace. Je to kontejner, který obsahuje dvě komponenty: `Alice` a `Bill`, uživatelská rozhraní pro tyto uživatele. Relevantní částí pro WASM je inicializační kód.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Když použijeme [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), vytvoří to dva soubory, které zde používáme: soubor wasm se samotným kódem (zde `src/rust-wasm/pkg/rust_wasm_bg.wasm`) a soubor JavaScriptu s definicemi pro jeho použití (zde `src/rust_wasm/pkg/rust_wasm.js`). Výchozí export (default export) tohoto souboru JavaScriptu je kód, který je třeba spustit k inicializaci WASM.

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

Hook [`useEffect`](https://react.dev/reference/react/useEffect) umožňuje specifikovat funkci, která se provede při změně stavových proměnných. Zde je seznam stavových proměnných prázdný (`[]`), takže se tato funkce provede pouze jednou při načtení stránky.

Funkce efektu se musí vrátit okamžitě. Abychom mohli použít asynchronní kód, jako je WASM `init` (který musí načíst soubor `.wasm`, a proto to nějakou dobu trvá), definujeme interní [`async`](https://en.wikipedia.org/wiki/Async/await) funkci a spustíme ji bez `await`.

**`Bill.jsx`**

Toto je uživatelské rozhraní pro Billa. Má jedinou akci, vytvoření adresy na základě skryté meta-adresy poskytnuté Alicí.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Kromě výchozího exportu exportuje kód v JavaScriptu vygenerovaný pomocí `wasm-pack` funkci pro každou funkci v kódu WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Pro volání funkcí WASM jednoduše zavoláme funkci exportovanou souborem JavaScriptu vytvořeným pomocí `wasm-pack`.

**`Alice.jsx`**

Kód v `Alice.jsx` je analogický, s tím rozdílem, že Alice má dvě akce:

- Vygenerovat meta-adresu
- Získat soukromý klíč pro adresu zveřejněnou Billem

## Závěr {#conclusion}

Skryté adresy nejsou všelék; musí se [používat správně](#go-wrong). Ale při správném použití mohou umožnit soukromí na veřejném blockchainu.

[Zde najdete další mou práci](https://cryptodocguy.pro/).