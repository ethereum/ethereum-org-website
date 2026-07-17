---
title: "Kutumia Anwani Fiche"
description: "Anwani fiche huruhusu watumiaji kuhamisha rasilimali bila kujulikana. Baada ya kusoma makala haya, utaweza: Kueleza anwani fiche ni nini na jinsi zinavyofanya kazi, kuelewa jinsi ya kutumia anwani fiche kwa njia inayohifadhi faragha, na kuandika programu ya wavuti inayotumia anwani fiche."
author: Ori Pomerantz
tags: ["Anwani fiche", "faragha", "kriptografia", "Rust", "WASM"]
skill: intermediate
breadcrumb: Anwani fiche
published: 2025-11-30
lang: sw
sidebarDepth: 3
---

Wewe ni Bill. Kwa sababu ambazo hatutazijadili, unataka kuchangia kampeni ya "Alice for Queen of the World" na unataka Alice ajue ulichangia ili akupe tuzo akishinda. Kwa bahati mbaya, ushindi wake hauna uhakika. Kuna kampeni shindani, "Carol for Empress of the Solar System". Ikiwa Carol atashinda, na agundue ulichangia kwa Alice, utakuwa matatani. Kwa hivyo huwezi tu kuhamisha 200 ETH kutoka kwenye akaunti yako kwenda kwa Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) ina suluhisho. ERC hii inaeleza jinsi ya kutumia [anwani fiche](https://nerolation.github.io/stealth-utils) kwa hamisho lisilojulikana.

**Onyo**: Kriptografia iliyo nyuma ya anwani fiche, kwa kadiri tujuavyo, ni thabiti. Hata hivyo, kuna uwezekano wa mashambulizi ya kando (side-channel attacks). [Hapa chini](#go-wrong), utaona kile unachoweza kufanya ili kupunguza hatari hii.

## Jinsi anwani fiche zinavyofanya kazi {#how}

Makala haya yatajaribu kueleza anwani fiche kwa njia mbili. Ya kwanza ni [jinsi ya kuzitumia](#how-use). Sehemu hii inatosha kuelewa makala yaliyosalia. Kisha, kuna [maelezo ya hisabati iliyo nyuma yake](#how-math). Ikiwa unavutiwa na kriptografia, soma sehemu hii pia. 

### Toleo rahisi (jinsi ya kutumia anwani fiche) {#how-use}

Alice anaunda funguo za siri mbili na kuchapisha funguo za umma zinazolingana (ambazo zinaweza kuunganishwa kuwa anwani-meta moja yenye urefu maradufu). Bill pia anaunda ufunguo wa siri na kuchapisha ufunguo wa umma unaolingana.

Kwa kutumia ufunguo wa umma wa upande mmoja na ufunguo wa siri wa upande mwingine, unaweza kupata siri ya pamoja inayojulikana tu na Alice na Bill (haiwezi kupatikana kutoka kwa funguo za umma pekee). Kwa kutumia siri hii ya pamoja, Bill anapata anwani fiche na anaweza kutuma rasilimali kwake.

Alice pia anapata anwani kutoka kwa siri ya pamoja, lakini kwa sababu anajua funguo za siri za funguo za umma alizochapisha, anaweza pia kupata ufunguo wa siri unaomruhusu kutoa kutoka kwa anwani hiyo.

### Hisabati (kwa nini anwani fiche hufanya kazi hivi) {#how-math}

Anwani fiche za kawaida hutumia [kriptografia ya mkunjo wa duaradufu (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) ili kupata utendaji bora na biti chache za ufunguo, huku zikidumisha kiwango kile kile cha usalama. Lakini kwa sehemu kubwa tunaweza kupuuza hilo na kujifanya tunatumia hisabati ya kawaida.

Kuna nambari ambayo kila mtu anaijua, *G*. Unaweza kuzidisha kwa *G*. Lakini kwa sababu ya asili ya ECC, haiwezekani kabisa kugawanya kwa *G*. Jinsi kriptografia ya ufunguo wa umma inavyofanya kazi kwa ujumla katika Ethereum ni kwamba unaweza kutumia ufunguo wa siri, *P<sub>priv</sub>*, kutia saini miamala ambayo kisha inathibitishwa na ufunguo wa umma, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice anaunda funguo za siri mbili, *K<sub>priv</sub>* na *V<sub>priv</sub>*. *K<sub>priv</sub>* itatumika kutumia pesa kutoka kwenye anwani fiche, na *V<sub>priv</sub>* kutazama anwani zinazomilikiwa na Alice. Kisha Alice anachapisha funguo za umma: *K<sub>pub</sub> = GK<sub>priv</sub>* na *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill anaunda ufunguo wa siri wa tatu, *R<sub>priv</sub>*, na kuchapisha *R<sub>pub</sub> = GR<sub>priv</sub>* kwenye sajili kuu (Bill angeweza pia kumtumia Alice, lakini tunachukulia Carol anasikiliza).

Bill anakokotoa *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, ambayo anatarajia Alice pia aijue (imeelezwa hapa chini). Thamani hii inaitwa *S*, siri ya pamoja. Hii inampa Bill ufunguo wa umma, *P<sub>pub</sub> = K<sub>pub</sub>+G\*heshi(S)*. Kutoka kwa ufunguo huu wa umma, anaweza kukokotoa anwani na kutuma rasilimali zozote anazotaka kwake. Katika siku zijazo, ikiwa Alice atashinda, Bill anaweza kumwambia *R<sub>priv</sub>* ili kuthibitisha rasilimali zilitoka kwake.

Alice anakokotoa *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Hii inampa siri ya pamoja ileile, *S*. Kwa sababu anajua ufunguo wa siri, *K<sub>priv</sub>*, anaweza kukokotoa *P<sub>priv</sub> = K<sub>priv</sub>+heshi(S)*. Ufunguo huu unamruhusu kufikia rasilimali katika anwani inayotokana na *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*heshi(S) = K<sub>pub</sub>+G\*heshi(S)*.

Tuna ufunguo tofauti wa kutazama ili kumruhusu Alice kumpa kandarasi Dave's World Domination Campaign Services. Alice yuko tayari kumruhusu Dave ajue anwani za umma na kumjulisha wakati pesa zaidi zinapatikana, lakini hataki atumie pesa zake za kampeni.

Kwa sababu kutazama na kutumia kunatumia funguo tofauti, Alice anaweza kumpa Dave *V<sub>priv</sub>*. Kisha Dave anaweza kukokotoa *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* na kwa njia hiyo kupata funguo za umma (*P<sub>pub</sub> = K<sub>pub</sub>+G\*heshi(S)*). Lakini bila *K<sub>priv</sub>* Dave hawezi kupata ufunguo wa siri.

Kwa muhtasari, hizi ndizo thamani zinazojulikana na washiriki tofauti.

| Alice | Iliyochapishwa | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*heshi(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*heshi(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*heshi(S)* |
| *Anwani=f(P<sub>pub</sub>)* | - | *Anwani=f(P<sub>pub</sub>)* | *Anwani=f(P<sub>pub</sub>)* | *Anwani=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+heshi(S)* | - | - | - |

## Wakati anwani fiche zinapoenda kombo {#go-wrong}

*Hakuna siri kwenye mnyororo wa vitalu*. Ingawa anwani fiche zinaweza kukupa faragha, faragha hiyo inaweza kuathiriwa na uchanganuzi wa trafiki. Ili kuchukua mfano rahisi, fikiria kwamba Bill anafadhili anwani na mara moja anatuma muamala ili kuchapisha thamani ya *R<sub>pub</sub>*. Bila *V<sub>priv</sub>* ya Alice, hatuwezi kuwa na uhakika kwamba hii ni anwani fiche, lakini huo ndio uwezekano mkubwa. Kisha, tunaona muamala mwingine unaohamisha ETH zote kutoka kwa anwani hiyo hadi kwenye anwani ya mfuko wa kampeni ya Alice. Huenda tusiweze kuthibitisha, lakini kuna uwezekano mkubwa kwamba Bill amechangia kampeni ya Alice. Carol bila shaka angefikiria hivyo.

Ni rahisi kwa Bill kutenganisha uchapishaji wa *R<sub>pub</sub>* na ufadhili wa anwani fiche (kufanya hivyo kwa nyakati tofauti, kutoka kwa anwani tofauti). Hata hivyo, hiyo haitoshi. Mtindo ambao Carol anautafuta ni kwamba Bill anafadhili anwani, na kisha mfuko wa kampeni wa Alice unatoa pesa kutoka kwayo. 

Suluhisho moja ni kwa kampeni ya Alice kutotoa pesa moja kwa moja, bali kuzitumia kulipa mtu wa tatu. Ikiwa kampeni ya Alice itatuma 10 ETH kwa Dave's World Domination Campaign Services, Carol anajua tu kwamba Bill alichangia kwa mmoja wa wateja wa Dave. Ikiwa Dave ana wateja wa kutosha, Carol hataweza kujua ikiwa Bill alichangia kwa Alice anayeshindana naye, au kwa Adam, Albert, au Abigail ambao Carol hawajali. Alice anaweza kujumuisha thamani iliyoheshishwa pamoja na malipo, na kisha kumpa Dave taswira ya awali (preimage), ili kuthibitisha kwamba ulikuwa mchango wake. Vinginevyo, kama ilivyoelezwa hapo juu, ikiwa Alice atampa Dave *V<sub>priv</sub>* yake, tayari anajua malipo yalitoka kwa nani.

Tatizo kuu la suluhisho hili ni kwamba linahitaji Alice kujali kuhusu usiri wakati usiri huo unamnufaisha Bill. Alice anaweza kutaka kudumisha sifa yake ili rafiki wa Bill, Bob, pia amchangie. Lakini pia inawezekana kwamba hangejali kumfichua Bill, kwa sababu basi atakuwa na hofu ya kile kitakachotokea ikiwa Carol atashinda. Bill anaweza kuishia kumpa Alice msaada zaidi.

### Kutumia tabaka nyingi fiche {#multi-layer}

Badala ya kumtegemea Alice kuhifadhi faragha ya Bill, Bill anaweza kufanya hivyo mwenyewe. Anaweza kuunda anwani-meta nyingi kwa watu wa kubuniwa, Bob na Bella. Kisha Bill anatuma ETH kwa Bob, na "Bob" (ambaye kwa kweli ni Bill) anatuma kwa Bella. "Bella" (pia Bill) anatuma kwa Alice.

Carol bado anaweza kufanya uchanganuzi wa trafiki na kuona mtiririko wa Bill-kwa-Bob-kwa-Bella-kwa-Alice. Hata hivyo, ikiwa "Bob" na "Bella" pia wanatumia ETH kwa madhumuni mengine, haitaonekana kwamba Bill alihamisha chochote kwa Alice, hata kama Alice atatoa mara moja kutoka kwa anwani fiche hadi kwenye anwani yake ya kampeni inayojulikana.

## Kuandika programu ya anwani fiche {#write-app}

Makala haya yanaeleza programu ya anwani fiche [inayopatikana kwenye GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Zana {#tools}

Kuna [maktaba ya anwani fiche ya TypeScript](https://github.com/ScopeLift/stealth-address-sdk) ambayo tungeweza kutumia. Hata hivyo, shughuli za kriptografia zinaweza kutumia CPU sana. Ninapendelea kuzitekeleza katika lugha iliyokusanywa (compiled language), kama vile [Rust](https://rust-lang.org/), na kutumia [WASM](https://webassembly.org/) kuendesha msimbo kwenye kivinjari.

Tutatumia [Vite](https://vite.dev/) na [React](https://react.dev/). Hizi ni zana za kiwango cha sekta; ikiwa hufahamu kuzitumia, unaweza kutumia [mafunzo haya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Ili kutumia Vite, tunahitaji Node.

### Tazama anwani fiche zikifanya kazi {#in-action}

1. Sakinisha zana zinazohitajika: [Rust](https://rust-lang.org/tools/install/) na [Node](https://nodejs.org/en/download).

2. Nakili (clone) hazina ya GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Sakinisha mahitaji ya awali na ukusanye (compile) msimbo wa Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Anzisha seva ya wavuti.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Vinjari hadi kwenye [programu](http://localhost:5173/). Ukurasa huu wa programu una fremu mbili: moja kwa ajili ya kiolesura cha mtumiaji cha Alice na nyingine kwa ajili ya Bill. Fremu hizi mbili haziwasiliani; ziko kwenye ukurasa mmoja tu kwa urahisi.

6. Kama Alice, bofya **Generate a Stealth Meta-Address**. Hii itaonyesha anwani fiche mpya na funguo za siri zinazolingana. Nakili anwani-meta fiche kwenye ubao wa kunakili (clipboard).

7. Kama Bill, bandika anwani-meta fiche mpya na ubofye **Generate an address**. Hii inakupa anwani ya kufadhili kwa ajili ya Alice. 

8. Nakili anwani na ufunguo wa umma wa Bill na uzibandike katika eneo la "Private key for address generated by Bill" kwenye kiolesura cha mtumiaji cha Alice. Mara tu sehemu hizo zitakapojazwa, utaona ufunguo wa siri wa kufikia rasilimali kwenye anwani hiyo.

9. Unaweza kutumia [kikokotoo cha mtandaoni](https://iancoleman.net/ethereum-private-key-to-address/) ili kuhakikisha ufunguo wa siri unalingana na anwani.

### Jinsi programu inavyofanya kazi {#how-the-program-works}

#### Kijenzi cha WASM {#wasm}

Msimbo wa chanzo unaokusanywa kuwa WASM umeandikwa katika [Rust](https://rust-lang.org/). Unaweza kuuona katika [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Msimbo huu kimsingi ni kiolesura kati ya msimbo wa JavaScript na [maktaba ya `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) katika Rust inafanana na [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) katika JavaScript. Ina taarifa za kifurushi, matamko ya utegemezi, n.k.

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

Kifurushi cha [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) kinahitaji kuzalisha thamani nasibu. Hilo haliwezi kufanywa kwa njia za kialgoriti pekee; inahitaji ufikiaji wa mchakato wa kimaumbile kama chanzo cha Entropi. Ufafanuzi huu unabainisha kwamba tutapata Entropi hiyo kwa kuuliza kivinjari tunachoendesha.

```toml
console_error_panic_hook = "0.1.7"
```

[Maktaba hii](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) inatupa jumbe za makosa zenye maana zaidi wakati msimbo wa WASM unapoingiwa na hofu (panics) na hauwezi kuendelea.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Aina ya pato inayohitajika ili kuzalisha msimbo wa WASM.

**`lib.rs`**

Huu ndio msimbo halisi wa Rust.

```rust
use wasm_bindgen::prelude::*;
```

Ufafanuzi wa kuunda kifurushi cha WASM kutoka kwa Rust. Zimeandikwa [hapa](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Vitendaji (functions) tunavyohitaji kutoka kwenye [maktaba ya `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust kwa kawaida hutumia [safu](https://doc.rust-lang.org/std/primitive.array.html) za baiti (`[u8; <size>]`) kwa thamani. Lakini katika JavaScript, kwa kawaida tunatumia mifuatano ya heksadesimali. [Maktaba ya `hex`](https://docs.rs/hex/latest/hex/) inatutafsiria kutoka uwakilishi mmoja hadi mwingine.

```rust
#[wasm_bindgen]
```

Zalisha vifungo (bindings) vya WASM ili kuweza kuita kitendaji hiki kutoka kwenye JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Njia rahisi zaidi ya kurejesha kipengee (object) chenye nyanja nyingi ni kurejesha mfuatano wa JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) inarejesha nyanja tatu:

- Anwani-meta (*K<sub>pub</sub>* na *V<sub>pub</sub>*)
- Ufunguo wa siri wa kutazama (*V<sub>priv</sub>*)
- Ufunguo wa siri wa kutumia (*K<sub>priv</sub>*)

Sintaksia ya [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) inaturuhusu kutenganisha thamani hizo tena.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Tumia makro ya [`format!`](https://doc.rust-lang.org/std/fmt/index.html) kuzalisha mfuatano uliosimbwa kwa JSON. Tumia [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) kubadilisha safu kuwa mifuatano ya heksi (hex strings).

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Kitendaji hiki hubadilisha mfuatano wa heksi (uliotolewa na JavaScript) kuwa safu ya baiti. Tunakitumia kuchanganua thamani zilizotolewa na msimbo wa JavaScript. Kitendaji hiki ni kigumu kwa sababu ya jinsi Rust inavyoshughulikia safu na vekta.

Usemi wa `<const N: usize>` unaitwa [kijeneriki (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` ni kigezo kinachodhibiti urefu wa safu iliyorejeshwa. Kitendaji hiki kwa kweli kinaitwa `str_to_array::<n>`, ambapo `n` ni urefu wa safu.

Thamani ya kurejesha ni `Option<[u8; N]>`, ambayo inamaanisha safu iliyorejeshwa ni ya [hiari (optional)](https://doc.rust-lang.org/std/option/). Huu ni mtindo wa kawaida katika Rust kwa vitendaji ambavyo vinaweza kushindwa.

Kwa mfano, ikiwa tutaita `str_to_array::10("bad060a7")`, kitendaji kinapaswa kurejesha safu ya thamani kumi, lakini ingizo ni baiti nne tu. Kitendaji kinahitaji kushindwa, na kinafanya hivyo kwa kurejesha `None`. Thamani ya kurejesha kwa `str_to_array::4("bad060a7")` itakuwa `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode inarejesha Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Kitendaji cha [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) kinarejesha `Result<Vec<u8>, FromHexError>`. Aina ya [`Result`](https://doc.rust-lang.org/std/result/) inaweza kuwa na matokeo yaliyofaulu (`Ok(value)`) au kosa (`Err(error)`).

Mbinu ya `.ok()` inabadilisha `Result` kuwa `Option`, ambayo thamani yake ni thamani ya `Ok()` ikiwa imefaulu au `None` ikiwa sivyo. Hatimaye, [kiendeshaji cha alama ya kuuliza](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) kinasitisha vitendaji vya sasa na kurejesha `None` ikiwa `Option` ni tupu. Vinginevyo, inafungua (unwraps) thamani na kurejesha hiyo (katika kesi hii, ili kugawa thamani kwa `vec`).

Hii inaonekana kama mbinu ngumu isivyo kawaida ya kushughulikia makosa, lakini `Result` na `Option` zinahakikisha kwamba makosa yote yanashughulikiwa, kwa njia moja au nyingine.

```rust
    if vec.len() != N { return None; }
```

Ikiwa idadi ya baiti si sahihi, hilo ni kosa, na tunarejesha `None`.

```rust
    // try_into inatumia vec na kujaribu kutengeneza [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust ina aina mbili za safu. [Safu (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) zina ukubwa usiobadilika. [Vekta (Vectors)](https://doc.rust-lang.org/std/vec/index.html) zinaweza kukua na kupungua. `hex::decode` inarejesha vekta, lakini maktaba ya `eth_stealth_addresses` inataka kupokea safu. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) inabadilisha thamani kuwa aina nyingine, kwa mfano, vekta kuwa safu.

```rust
    Some(array)
}
```

Rust haikuhitaji kutumia neno kuu la [`return`](https://doc.rust-lang.org/std/keyword.return.html) unapokurejesha thamani mwishoni mwa kitendaji.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Kitendaji hiki kinapokea anwani-meta ya umma, ambayo inajumuisha *V<sub>pub</sub>* na *K<sub>pub</sub>*. Inarejesha anwani fiche, ufunguo wa umma wa kuchapisha (*R<sub>pub</sub>*), na thamani ya skanisho ya baiti moja ambayo inaharakisha utambuzi wa anwani zilizochapishwa ambazo zinaweza kuwa za Alice.

Thamani ya skanisho ni sehemu ya siri ya pamoja (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Thamani hii inapatikana kwa Alice, na kuiangalia ni haraka zaidi kuliko kuangalia ikiwa *f(K<sub>pub</sub>+G\*heshi(S))* inalingana na anwani iliyochapishwa.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Tunatumia [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) ya maktaba.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Andaa mfuatano wa pato uliosimbwa kwa JSON.

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

Kitendaji hiki kinatumia [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) ya maktaba kukokotoa ufunguo wa siri wa kutoa kutoka kwenye anwani (*R<sub>priv</sub>*). Ukokotoaji huu unahitaji thamani hizi:

- Anwani (*Anwani=f(P<sub>pub</sub>)*)
- Ufunguo wa umma uliotengenezwa na Bill (*R<sub>pub</sub>*)
- Ufunguo wa siri wa kutazama (*V<sub>priv</sub>*)
- Ufunguo wa siri wa kutumia (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) inabainisha kwamba kitendaji kinatekelezwa wakati msimbo wa WASM unapoanzishwa.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Msimbo huu unabainisha kwamba pato la hofu (panic output) litumwe kwenye kiweko (console) cha JavaScript. Ili kuiona ikifanya kazi, tumia programu na umpe Bill anwani-meta batili (badilisha tu tarakimu moja ya heksadesimali). Utaona kosa hili kwenye kiweko cha JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Ikifuatiwa na ufuatiliaji wa staki (stack trace). Kisha mpe Bill anwani-meta halali, na umpe Alice anwani batili au ufunguo wa umma batili. Utaona kosa hili:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Tena, ikifuatiwa na ufuatiliaji wa staki.

#### Kiolesura cha Mtumiaji {#ui}

Kiolesura cha mtumiaji kimeandikwa kwa kutumia [React](https://react.dev/) na kutolewa na [Vite](https://vite.dev/). Unaweza kujifunza kuzihusu kwa kutumia [mafunzo haya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Hakuna haja ya [Wagmi](https://wagmi.sh/) hapa kwa sababu hatuingiliani moja kwa moja na mnyororo wa vitalu au mkoba.

Sehemu pekee isiyo dhahiri ya kiolesura cha mtumiaji ni muunganisho wa WASM. Hivi ndivyo inavyofanya kazi.

**`vite.config.js`**

Faili hili lina [usanidi wa Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Tunahitaji programu-jalizi (plugins) mbili za Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) na [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Faili hili ndilo kijenzi kikuu cha programu. Ni kontena linalojumuisha vijenzi viwili: `Alice` na `Bill`, violesura vya watumiaji kwa watumiaji hao. Sehemu husika kwa WASM ni msimbo wa kuanzisha.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Tunapotumia [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), inaunda faili mbili tunazotumia hapa: faili la wasm lenye msimbo halisi (hapa, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) na faili la JavaScript lenye ufafanuzi wa kulitumia (hapa, `src/rust_wasm/pkg/rust_wasm.js`). Usafirishaji chaguomsingi (default export) wa faili hilo la JavaScript ni msimbo unaohitaji kuendeshwa ili kuanzisha WASM.

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

[Ndoano (hook) ya `useEffect`](https://react.dev/reference/react/useEffect) inakuruhusu kubainisha kitendaji kinachotekelezwa wakati vigeu vya hali (state variables) vinapobadilika. Hapa, orodha ya vigeu vya hali ni tupu (`[]`), kwa hivyo kitendaji hiki kinatekelezwa mara moja tu ukurasa unapopakiwa.

Kitendaji cha athari (effect function) kinapaswa kurejesha mara moja. Ili kutumia msimbo usiolingana (asynchronous code), kama vile `init` ya WASM (ambayo inapaswa kupakia faili la `.wasm` na kwa hivyo inachukua muda) tunafafanua kitendaji cha ndani cha [`async`](https://en.wikipedia.org/wiki/Async/await) na kukiendesha bila `await`.

**`Bill.jsx`**

Hiki ni kiolesura cha mtumiaji cha Bill. Kina kitendo kimoja, kuunda anwani kulingana na anwani-meta fiche iliyotolewa na Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Mbali na usafirishaji chaguomsingi, msimbo wa JavaScript uliotengenezwa na `wasm-pack` unasafirisha kitendaji kwa kila kitendaji katika msimbo wa WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Ili kuita vitendaji vya WASM, tunaita tu kitendaji kilichosafirishwa na faili la JavaScript lililoundwa na `wasm-pack`.

**`Alice.jsx`**

Msimbo katika `Alice.jsx` unafanana, isipokuwa kwamba Alice ana vitendo viwili:

- Kuzalisha anwani-meta
- Kupata ufunguo wa siri kwa anwani iliyochapishwa na Bill

## Hitimisho {#conclusion}

Anwani fiche si suluhisho la kila kitu; zinapaswa [kutumiwa kwa usahihi](#go-wrong). Lakini zinapotumiwa kwa usahihi, zinaweza kuwezesha faragha kwenye mnyororo wa vitalu wa umma.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).