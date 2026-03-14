---
title: "Použití skrytých adres"
description: "Skryté adresy umožňují uživatelům anonymně převádět aktiva. Po přečtení tohoto článku budete schopni: vysvětlit, co jsou skryté adresy a jak fungují, pochopit, jak používat skryté adresy způsobem, který zachovává anonymitu, a napsat webovou aplikaci, která používá skryté adresy."
author: Ori Pomerantz
tags:
  [
    "Skrytá adresa",
    "soukromí",
    "kryptografie",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: cs
sidebarDepth: 3
---

Jste Bill. Z důvodů, do kterých nebudeme zabíhat, chcete přispět na kampaň „Alice za královnu světa“ a chcete, aby Alice věděla, že jste přispěli, aby vás odměnila, pokud vyhraje. Její vítězství však bohužel není zaručeno. Existuje konkurenční kampaň „Carol za císařovnu Sluneční soustavy“. Pokud Carol vyhraje a zjistí, že jste přispěli Alici, budete mít potíže. Nemůžete tedy jen tak převést 200 ETH ze svého účtu na účet Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) nabízí řešení. Tento ERC vysvětluje, jak používat [skryté adresy](https://nerolation.github.io/stealth-utils) pro anonymní převody.

**Upozornění**: Kryptografie za skrytými adresami je, pokud víme, spolehlivá. Existují však potenciální útoky postranním kanálem. [Níže](#go-wrong) uvidíte, co můžete udělat pro snížení tohoto rizika.

## Jak fungují skryté adresy {#how}

Tento článek se pokusí vysvětlit skryté adresy dvěma způsoby. První je [jak je používat](#how-use). Tato část je dostatečná k pochopení zbytku článku. Dále je zde [vysvětlení matematiky, která za tím stojí](#how-math). Pokud se zajímáte o kryptografii, přečtěte si i tuto část.

### Zjednodušená verze (jak používat skryté adresy) {#how-use}

Alice vytvoří dva privátní klíče a zveřejní odpovídající veřejné klíče (které lze zkombinovat do jedné meta-adresy dvojnásobné délky). Bill také vytvoří privátní klíč a zveřejní odpovídající veřejný klíč.

Pomocí veřejného klíče jedné strany a privátního klíče druhé strany můžete odvodit sdílené tajemství známé pouze Alici a Billovi (nelze jej odvodit pouze z veřejných klíčů). Pomocí tohoto sdíleného tajemství získá Bill skrytou adresu a může na ni posílat aktiva.

Alice také získá adresu ze sdíleného tajemství, ale protože zná privátní klíče k veřejným klíčům, které zveřejnila, může také získat privátní klíč, který jí umožní vybírat z této adresy.

### Matematika (proč skryté adresy fungují takto) {#how-math}

Standardní skryté adresy používají [kryptografii na bázi eliptických křivek (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor), aby dosáhly lepšího výkonu s menším počtem bitů klíče a zároveň zachovaly stejnou úroveň zabezpečení. Ale z větší části to můžeme ignorovat a předstírat, že používáme běžnou aritmetiku.

Existuje číslo, které každý zná, _G_. Můžete násobit _G_. Ale vzhledem k povaze ECC je prakticky nemožné dělit _G_. Způsob, jakým kryptografie s veřejným klíčem v Ethereu obecně funguje, je, že můžete použít privátní klíč _P<sub>priv</sub>_ k podepisování transakcí, které jsou poté ověřeny veřejným klíčem _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice vytvoří dva privátní klíče, _K<sub>priv</sub>_ a _V<sub>priv</sub>_. _K<sub>priv</sub>_ se použije k utrácení peněz ze skryté adresy a _V<sub>priv</sub>_ k zobrazení adres, které patří Alici. Alice poté zveřejní veřejné klíče: _K<sub>pub</sub> = GK<sub>priv</sub>_ a _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill vytvoří třetí privátní klíč, _R<sub>priv</sub>_, a zveřejní _R<sub>pub</sub> = GR<sub>priv</sub>_ v centrálním registru (Bill ho mohl poslat také Alici, ale předpokládáme, že Carol poslouchá).

Bill vypočítá _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, o kterém předpokládá, že ho zná i Alice (vysvětleno níže). Tato hodnota se nazývá _S_, sdílené tajemství. Tím Bill získá veřejný klíč, _P<sub>pub</sub> = K<sub>pub</sub>+G\*haš(S)_. Z tohoto veřejného klíče může vypočítat adresu a poslat na ni jakékoli zdroje, které chce. V budoucnu, pokud Alice vyhraje, může jí Bill sdělit _R<sub>priv</sub>_, aby dokázal, že zdroje pocházejí od něj.

Alice vypočítá _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Tím získá stejné sdílené tajemství, _S_. Protože zná privátní klíč, _K<sub>priv</sub>_, může vypočítat _P<sub>priv</sub> = K<sub>priv</sub>+haš(S)_. Tento klíč jí umožňuje přístup k aktivům na adrese, která je výsledkem _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*haš(S) = K<sub>pub</sub>+G\*haš(S)_.

Máme samostatný zobrazovací klíč, který Alici umožňuje zadat subdodávku službám Dave's World Domination Campaign Services. Alice je ochotna dát Davovi vědět veřejné adresy a informovat ji, až bude k dispozici více peněz, ale nechce, aby utrácel peníze z její kampaně.

Protože prohlížení a utrácení používají samostatné klíče, může Alice dát Daveovi _V<sub>priv</sub>_. Potom může Dave vypočítat _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ a tímto způsobem získat veřejné klíče (_P<sub>pub</sub> = K<sub>pub</sub>+G\*haš(S)_). Ale bez _K<sub>priv</sub>_ nemůže Dave získat privátní klíč.

Abychom to shrnuli, toto jsou hodnoty známé různým účastníkům.

| Alice                                                                     | Zveřejněno        | Bill                                                                      | Dave                                                                        |                                                |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                |
| _K<sub>priv</sub>_                                                        | –                 | –                                                                         | –                                                                           |                                                |
| _V<sub>priv</sub>_                                                        | –                 | –                                                                         | _V<sub>priv</sub>_                                                          |                                                |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                |
| –                                                                         | –                 | _R<sub>priv</sub>_                                                        | –                                                                           |                                                |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | –                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*haš(S)_          | –                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*haš(S)_          | _P<sub>pub</sub> = K<sub>pub</sub>+G\*haš(S)_            |                                                |
| _Adresa=f(P<sub>pub</sub>)_                            | –                 | _Adresa=f(P<sub>pub</sub>)_                            | _Adresa=f(P<sub>pub</sub>)_                              | _Adresa=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+haš(S)_           | –                 | –                                                                         | –                                                                           |                                                |

## Když se skryté adresy pokazí {#go-wrong}

_Na blockchainu neexistují žádná tajemství_. Zatímco skryté adresy vám mohou poskytnout soukromí, toto soukromí je náchylné k analýze provozu. Jako triviální příklad si představte, že Bill financuje adresu a okamžitě pošle transakci ke zveřejnění hodnoty _R<sub>pub</sub>_. Bez Alicina _V<sub>priv</sub>_ si nemůžeme být jisti, že se jedná o skrytou adresu, ale je to nejpravděpodobnější. Potom vidíme další transakci, která převádí všechny ETH z této adresy na adresu fondu kampaně Alice. Možná to nebudeme schopni dokázat, ale je pravděpodobné, že Bill právě přispěl na kampaň Alice. Carol by si to určitě myslela.

Pro Billa je snadné oddělit zveřejnění _R<sub>pub</sub>_ od financování skryté adresy (udělat to v různých časech z různých adres). To je však nedostatečné. Vzor, který Carol hledá, je, že Bill financuje adresu a poté z ní fond kampaně Alice vybírá.

Jedním řešením je, aby kampaň Alice peníze nevybírala přímo, ale použila je k zaplacení třetí straně. Pokud kampaň Alice pošle 10 ETH společnosti Dave's World Domination Campaign Services, Carol ví jen to, že Bill přispěl jednomu z Daveových zákazníků. Pokud má Dave dostatek zákazníků, Carol by nemohla vědět, zda Bill přispěl Alici, která s ní soupeří, nebo Adamovi, Albertovi či Abigail, o které se Carol nezajímá. Alice může k platbě přiložit hašovanou hodnotu a poté poskytnout Daveovi předobraz, aby dokázala, že to byl její dar. Alternativně, jak je uvedeno výše, pokud Alice dá Daveovi svůj _V<sub>priv</sub>_, už ví, od koho platba přišla.

Hlavním problémem tohoto řešení je, že vyžaduje, aby Alice dbala na utajení, když toto utajení prospívá Billovi. Alice si možná bude chtít udržet svou pověst, aby jí přispěl i Billův přítel Bob. Ale je také možné, že by jí nevadilo Billa odhalit, protože by se pak bál, co se stane, když vyhraje Carol. Bill by mohl nakonec poskytnout Alici ještě větší podporu.

### Použití více skrytých vrstev {#multi-layer}

Místo spoléhání se na Alici, aby chránila Billovo soukromí, to může Bill udělat sám. Může generovat více meta-adres pro fiktivní osoby, Boba a Bellu. Bill poté pošle ETH Bobovi a „Bob“ (což je ve skutečnosti Bill) je pošle Belle. „Bella“ (také Bill) je pošle Alici.

Carol může stále provádět analýzu provozu a vidět řetězec Bill-Bob-Bella-Alice. Pokud však „Bob“ a „Bella“ také používají ETH pro jiné účely, nebude se zdát, že Bill cokoli převedl Alici, i když Alice okamžitě vybere peníze ze skryté adresy na svou známou adresu kampaně.

## Napsání aplikace se skrytými adresami {#write-app}

Tento článek vysvětluje aplikaci se skrytými adresami [dostupnou na GitHubu](https://github.com/qbzzt/251022-stealth-addresses.git).

### Nástroje {#tools}

Existuje [typescriptová knihovna pro skryté adresy](https://github.com/ScopeLift/stealth-address-sdk), kterou bychom mohli použít. Kryptografické operace však mohou být náročné na CPU. Dávám přednost jejich implementaci v kompilovaném jazyce, jako je [Rust](https://rust-lang.org/), a použití [WASM](https://webassembly.org/) ke spuštění kódu v prohlížeči.

Použijeme [Vite](https://vite.dev/) a [React](https://react.dev/). Jedná se o standardní nástroje v oboru; pokud je neznáte, můžete použít [tento tutoriál](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Pro použití Vite potřebujeme Node.

### Podívejte se na skryté adresy v akci {#in-action}

1. Nainstalujte si potřebné nástroje: [Rust](https://rust-lang.org/tools/install/) a [Node](https://nodejs.org/en/download).

2. Naklonujte repozitář na GitHubu.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Nainstalujte předpoklady a zkompilujte kód Rustu.

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

5. Přejděte do [aplikace](http://localhost:5173/). Tato stránka aplikace má dva rámce: jeden pro uživatelské rozhraní Alice a druhý pro Billa. Tyto dva rámce spolu nekomunikují; jsou na stejné stránce pouze pro pohodlí.

6. Jako Alice klikněte na **Generate a Stealth Meta-Address**. Zobrazí se nová skrytá adresa a odpovídající privátní klíče. Zkopírujte skrytou meta-adresu do schránky.

7. Jako Bill vložte novou skrytou meta-adresu a klikněte na **Generate an address**. Tím získáte adresu pro financování Alice.

8. Zkopírujte adresu a Billův veřejný klíč a vložte je do oblasti „Privátní klíč pro adresu generovanou Billem“ v uživatelském rozhraní Alice. Jakmile budou tato pole vyplněna, uvidíte privátní klíč pro přístup k aktivům na této adrese.

9. Můžete použít [online kalkulačku](https://iancoleman.net/ethereum-private-key-to-address/), abyste se ujistili, že privátní klíč odpovídá adrese.

### Jak program funguje {#how-the-program-works}

#### Komponenta WASM {#wasm}

Zdrojový kód, který se kompiluje do WASM, je napsán v [Rustu](https://rust-lang.org/). Můžete si ho prohlédnout v [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Tento kód je primárně rozhraním mezi JavaScriptovým kódem a [knihovnou `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

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

Balíček [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) potřebuje generovat náhodné hodnoty. Toho nelze dosáhnout čistě algoritmickými prostředky; vyžaduje to přístup k fyzickému procesu jako zdroji entropie. Tato definice určuje, že entropii získáme dotazem na prohlížeč, ve kterém běžíme.

```toml
console_error_panic_hook = "0.1.7"
```

[Tato knihovna](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) nám poskytuje smysluplnější chybové zprávy, když kód WASM zpanikaří a nemůže pokračovat.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Výstupní typ potřebný k vytvoření kódu WASM.

**`lib.rs`**

Toto je skutečný kód Rustu.

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

Rust typicky používá pro hodnoty bajtová [pole](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`). Ale v JavaScriptu obvykle používáme hexadecimální řetězce. [Knihovna `hex`](https://docs.rs/hex/latest/hex/) nám překládá z jedné reprezentace do druhé.

```rust
#[wasm_bindgen]
```

Vygenerujte vazby WASM, aby bylo možné tuto funkci volat z JavaScriptu.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Nejjednodušší způsob, jak vrátit objekt s více poli, je vrátit řetězec JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) vrací tři pole:

- Meta-adresa (_K<sub>pub</sub>_ a _V<sub>pub</sub>_)
- Zobrazovací privátní klíč (_V<sub>priv</sub>_)
- Privátní klíč pro útratu (_K<sub>priv</sub>_)

Syntaxe [n-tice](https://doc.rust-lang.org/std/primitive.tuple.html) nám umožňuje tyto hodnoty opět oddělit.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Použijte makro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) k vygenerování řetězce kódovaného ve formátu JSON. Použijte [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) ke změně polí na hexadecimální řetězce.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Tato funkce převede hexadecimální řetězec (poskytnutý JavaScriptem) na pole bajtů. Používáme ji k analýze hodnot poskytnutých JavaScriptovým kódem. Tato funkce je komplikovaná kvůli tomu, jak Rust zpracovává pole a vektory.

Výraz `<const N: usize>` se nazývá [generikum](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` je parametr, který řídí délku vráceného pole. Funkce se ve skutečnosti volá jako `str_to_array::<n>`, kde `n` je délka pole.

Návratová hodnota je `Option<[u8; N]>`, což znamená, že vrácené pole je [volitelné](https://doc.rust-lang.org/std/option/). Toto je typický vzor v Rustu pro funkce, které mohou selhat.

Například, pokud zavoláme `str_to_array::10("bad060a7")`, funkce má vrátit pole s deseti hodnotami, ale vstup má pouze čtyři bajty. Funkce musí selhat, a to tak, že vrátí `None`. Návratová hodnota pro `str_to_array::4("bad060a7")` by byla `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode vrací Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Funkce [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) vrací `Result<Vec<u8>, FromHexError>`. Typ [`Result`](https://doc.rust-lang.org/std/result/) může obsahovat buď úspěšný výsledek (`Ok(value)`), nebo chybu (`Err(error)`).

Metoda `.ok()` převede `Result` na `Option`, jehož hodnota je buď hodnota `Ok()` v případě úspěchu, nebo `None` v opačném případě. Nakonec [operátor otazníku](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) přeruší aktuální funkci a vrátí `None`, pokud je `Option` prázdný. V opačném případě hodnotu rozbalí a vrátí ji (v tomto případě pro přiřazení hodnoty `vec`).

Vypadá to jako zvláštně spletitá metoda pro zpracování chyb, ale `Result` a `Option` zajišťují, že všechny chyby jsou tak či onak zpracovány.

```rust
    if vec.len() != N { return None; }
```

Pokud je počet bajtů nesprávný, jedná se o selhání a vrátíme `None`.

```rust
    // try_into spotřebuje vec a pokusí se vytvořit [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust má dva typy polí. [Pole](https://doc.rust-lang.org/std/primitive.array.html) mají pevnou velikost. [Vektory](https://doc.rust-lang.org/std/vec/index.html) se mohou zvětšovat a zmenšovat. `hex::decode` vrací vektor, ale knihovna `eth_stealth_addresses` chce přijímat pole. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) převádí hodnotu na jiný typ, například vektor na pole.

```rust
    Some(array)
}
```

Rust nevyžaduje použití klíčového slova [`return`](https://doc.rust-lang.org/std/keyword.return.html) při vracení hodnoty na konci funkce.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Tato funkce přijímá veřejnou meta-adresu, která obsahuje jak _V<sub>pub</sub>_, tak _K<sub>pub</sub>_. Vrací skrytou adresu, veřejný klíč k publikování (_R<sub>pub</sub>_) a jednobajtovou skenovací hodnotu, která urychluje identifikaci toho, které publikované adresy mohou patřit Alici.

Skenovací hodnota je součástí sdíleného tajemství (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Tato hodnota je k dispozici Alici a její kontrola je mnohem rychlejší než kontrola, zda se _f(K<sub>pub</sub>+G\*haš(S))_ rovná publikované adrese.

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

Připravte výstupní řetězec kódovaný ve formátu JSON.

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

Tato funkce používá [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) z knihovny k výpočtu privátního klíče pro výběr z adresy (_R<sub>priv</sub>_). Tento výpočet vyžaduje tyto hodnoty:

- Adresa (_Adresa=f(P<sub>pub</sub>)_)
- Veřejný klíč vygenerovaný Billem (_R<sub>pub</sub>_)
- Privátní klíč pro zobrazení (_V<sub>priv</sub>_)
- Privátní klíč pro útratu (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) určuje, že funkce se provede při inicializaci kódu WASM.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Tento kód určuje, že výstup paniky se pošle do konzole JavaScriptu. Abyste to viděli v akci, použijte aplikaci a dejte Billovi neplatnou meta-adresu (stačí změnit jednu hexadecimální číslici). V konzoli JavaScriptu uvidíte tuto chybu:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Následuje výpis zásobníku. Poté dejte Billovi platnou meta-adresu a Alici buď neplatnou adresu, nebo neplatný veřejný klíč. Zobrazí se tato chyba:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
klíče negenerují skrytou adresu
```

Opět následuje výpis zásobníku.

#### Uživatelské rozhraní {#ui}

Uživatelské rozhraní je napsáno pomocí [Reactu](https://react.dev/) a obsluhováno pomocí [Vite](https://vite.dev/). Můžete se o nich dozvědět pomocí [tohoto tutoriálu](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Zde není potřeba [WAGMI](https://wagmi.sh/), protože neinteragujeme přímo s blockchainem ani s peněženkou.

Jedinou ne zcela zřejmou částí uživatelského rozhraní je připojení WASM. Funguje to takto.

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

Potřebujeme dva pluginy Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) a [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Tento soubor je hlavní komponentou aplikace. Je to kontejner, který obsahuje dvě komponenty: `Alice` a `Bill`, uživatelská rozhraní pro tyto uživatele. Relevantní částí pro WASM je inicializační kód.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Když používáme [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), vytvoří se dva soubory, které zde používáme: soubor wasm se skutečným kódem (zde `src/rust-wasm/pkg/rust_wasm_bg.wasm`) a soubor JavaScript s definicemi pro jeho použití (zde `src/rust_wasm/pkg/rust_wasm.js`). Výchozí export tohoto souboru JavaScript je kód, který se musí spustit pro inicializaci WASM.

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
        console.error('Chyba při načítání wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[Hook `useEffect`](https://react.dev/reference/react/useEffect) umožňuje určit funkci, která se spustí při změně proměnných stavu. Zde je seznam proměnných stavu prázdný (`[]`), takže tato funkce se provede pouze jednou při načtení stránky.

Funkce efektu se musí okamžitě vrátit. Pro použití asynchronního kódu, jako je `init` WASM (který musí načíst soubor `.wasm`, a proto to trvá), definujeme interní funkci [`async`](https://en.wikipedia.org/wiki/Async/await) a spustíme ji bez `await`.

**`Bill.jsx`**

Toto je uživatelské rozhraní pro Billa. Má jednu akci, vytvoření adresy na základě skryté meta-adresy poskytnuté Alicí.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Kromě výchozího exportu exportuje JavaScriptový kód generovaný `wasm-pack` funkci pro každou funkci v kódu WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Chcete-li volat funkce WASM, stačí zavolat funkci exportovanou souborem JavaScriptu vytvořeným `wasm-pack`.

**`Alice.jsx`**

Kód v `Alice.jsx` je analogický, s výjimkou toho, že Alice má dvě akce:

- Vygenerovat meta-adresu
- Získat privátní klíč pro adresu publikovanou Billem

## Závěr {#conclusion}

Skryté adresy nejsou všelék; musí se [používat správně](#go-wrong). Ale když se používají správně, mohou umožnit soukromí na veřejném blockchainu.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).