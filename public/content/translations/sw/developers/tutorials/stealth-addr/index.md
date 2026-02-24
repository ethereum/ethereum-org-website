---
title: "Kutumia Anwani za Siri"
description: "Anwani za siri huruhusu watumiaji kuhamisha mali bila kujulikana. Baada ya kusoma makala haya, utaweza: Kueleza anwani za siri ni nini na jinsi zinavyofanya kazi, kuelewa jinsi ya kutumia anwani za siri kwa njia ambayo inalinda kutokujulikana, na kuandika programu ya wavuti inayotumia anwani za siri."
author: Ori Pomerantz
tags:
  [
    "Anwani ya siri",
    "faragha",
    "kriptografia",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: sw
sidebarDepth: 3
---

Wewe ni Bill. Kwa sababu ambazo hatutaziingilia, unataka kuchangia kampeni ya "Alice kwa Malkia wa Dunia" na kumfanya Alice ajue ulichangia ili akuzawadie akishinda. Kwa bahati mbaya, ushindi wake hauna uhakika. Kuna kampeni shindani, "Carol kwa Maliki wa Mfumo wa Jua". Ikiwa Carol atashinda, na akagundua ulichangia kwa Alice, utakuwa matatani. Kwa hivyo huwezi tu kuhamisha ETH 200 kutoka akaunti yako hadi ya Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) ina suluhisho. ERC hii inaeleza jinsi ya kutumia [anwani za siri](https://nerolation.github.io/stealth-utils) kwa uhamisho usiojulikana.

**Onyo**: Kriptografia nyuma ya anwani za siri, kwa kadiri tunavyojua, ni thabiti. Hata hivyo, kuna uwezekano wa mashambulizi ya njia za pembeni. [Chini](#go-wrong), utaona unachoweza kufanya ili kupunguza hatari hii.

## Jinsi anwani za siri zinavyofanya kazi {#how}

Makala haya yatajaribu kueleza anwani za siri kwa njia mbili. Ya kwanza ni [jinsi ya kuzitumia](#how-use). Sehemu hii inatosha kuelewa sehemu iliyobaki ya makala. Kisha, kuna [maelezo ya hisabati nyuma yake](#how-math). Ikiwa una nia ya kriptografia, soma sehemu hii pia.

### Toleo rahisi (jinsi ya kutumia anwani za siri) {#how-use}

Alice huunda funguo mbili za binafsi na kuchapisha funguo za umma zinazolingana (ambazo zinaweza kuunganishwa kuwa anwani-meta moja ya urefu maradufu). Bill pia huunda ufunguo wa binafsi na kuchapisha ufunguo wa umma unaolingana.

Kwa kutumia ufunguo wa umma wa upande mmoja na ufunguo wa binafsi wa mwingine, unaweza kupata siri ya pamoja inayojulikana tu na Alice na Bill (haiwezi kutolewa kutoka kwa funguo za umma pekee). Kwa kutumia siri hii ya pamoja, Bill anapata anwani ya siri na anaweza kutuma mali kwake.

Alice pia hupata anwani kutoka kwa siri ya pamoja, lakini kwa sababu anajua funguo za binafsi za funguo za umma alizochapisha, anaweza pia kupata ufunguo wa binafsi unaomruhusu kutoa pesa kutoka kwa anwani hiyo.

### Hisabati (kwa nini anwani za siri hufanya kazi hivi) {#how-math}

Anwani za kawaida za siri hutumia [kriptografia ya mzingo duaradufu (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) kupata utendakazi bora na biti chache za ufunguo, huku zikidumisha kiwango kile kile cha usalama. Lakini kwa sehemu kubwa tunaweza kupuuza hilo na kujifanya tunatumia hesabu za kawaida.

Kuna nambari ambayo kila mtu anaijua, _G_. Unaweza kuzidisha kwa _G_. Lakini kwa sababu ya asili ya ECC, haiwezekani kivitendo kugawanya kwa _G_. Njia ambayo kriptografia ya ufunguo wa umma hufanya kazi kwa ujumla katika Ethereum ni kwamba unaweza kutumia ufunguo wa binafsi, _P<sub>priv</sub>_, kusaini miamala ambayo kisha inathibitishwa na ufunguo wa umma, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice huunda funguo mbili za binafsi, _K<sub>priv</sub>_ na _V<sub>priv</sub>_. _K<sub>priv</sub>_ itatumika kutumia pesa kutoka kwa anwani ya siri, na _V<sub>priv</sub>_ kuona anwani ambazo ni za Alice. Kisha Alice huchapisha funguo za umma: _K<sub>pub</sub> = GK<sub>priv</sub>_ na _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill huunda ufunguo wa tatu wa binafsi, _R<sub>priv</sub>_, na kuchapisha _R<sub>pub</sub> = GR<sub>priv</sub>_ kwenye sajili ya kati (Bill angeweza pia kumtumia Alice, lakini tunadhania Carol anasikiliza).

Bill anakokotoa _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, ambayo anatarajia Alice pia aijue (imeelezwa hapa chini). Thamani hii inaitwa _S_, siri ya pamoja. Hii inampa Bill ufunguo wa umma, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hashi(S)_. Kutoka kwa ufunguo huu wa umma, anaweza kukokotoa anwani na kutuma rasilimali zozote anazotaka kwake. Katika siku zijazo, ikiwa Alice atashinda, Bill anaweza kumwambia _R<sub>priv</sub>_ ili kudhibitisha rasilimali zilitoka kwake.

Alice anakokotoa _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Hii inampa siri ileile ya pamoja, _S_. Kwa sababu anajua ufunguo wa binafsi, _K<sub>priv</sub>_, anaweza kukokotoa _P<sub>priv</sub> = K<sub>priv</sub>+hashi(S)_. Ufunguo huu unamruhusu kufikia mali katika anwani inayotokana na _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hashi(S) = K<sub>pub</sub>+G\*hashi(S)_.

Tuna ufunguo tofauti wa kutazama ili kumruhusu Alice kumpa kandarasi ndogo Dave's World Domination Campaign Services. Alice yuko tayari kumruhusu Dave ajue anwani za umma na kumjulisha pesa zaidi zinapopatikana, lakini hataki atumie pesa zake za kampeni.

Kwa sababu kutazama na kutumia hutumia funguo tofauti, Alice anaweza kumpa Dave _V<sub>priv</sub>_. Kisha Dave anaweza kukokotoa _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ na kwa njia hiyo kupata funguo za umma (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hashi(S)_). Lakini bila _K<sub>priv</sub>_ Dave hawezi kupata ufunguo wa binafsi.

Kwa muhtasari, hizi ni thamani zinazojulikana na washiriki tofauti.

| Alice                                                                     | Imechapishwa      | Bill                                                                      | Dave                                                                        |                                                |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                |
| _K<sub>priv</sub>_                                                        | --                | --                                                                        | --                                                                          |                                                |
| _V<sub>priv</sub>_                                                        | --                | --                                                                        | _V<sub>priv</sub>_                                                          |                                                |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                |
| --                                                                        | --                | _R<sub>priv</sub>_                                                        | --                                                                          |                                                |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | --                | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hashi(S)_        | --                | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hashi(S)_        | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hashi(S)_          |                                                |
| _Anwani=f(P<sub>pub</sub>)_                            | --                | _Anwani=f(P<sub>pub</sub>)_                            | _Anwani=f(P<sub>pub</sub>)_                              | _Anwani=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hashi(S)_         | --                | --                                                                        | --                                                                          |                                                |

## Wakati anwani za siri zinakwenda kombo {#go-wrong}

_Hakuna siri kwenye mnyororo wa bloku_. Wakati anwani za siri zinaweza kukupa faragha, faragha hiyo iko katika hatari ya uchambuzi wa trafiki. Ili kuchukua mfano mdogo, fikiria kwamba Bill anafadhili anwani na mara moja anatuma muamala kuchapisha thamani ya _R<sub>pub</sub>_. Bila _V<sub>priv</sub>_ ya Alice, hatuwezi kuwa na uhakika kwamba hii ni anwani ya siri, lakini hiyo ndiyo njia ya kubashiri. Kisha, tunaona muamala mwingine unaohamisha ETH zote kutoka kwa anwani hiyo hadi kwa anwani ya hazina ya kampeni ya Alice. Huenda tusiweze kuthibitisha, lakini kuna uwezekano kwamba Bill alichangia kampeni ya Alice. Carol bila shaka angefikiria hivyo.

Ni rahisi kwa Bill kutenganisha uchapishaji wa _R<sub>pub</sub>_ na ufadhili wa anwani ya siri (kufanya hivyo kwa nyakati tofauti, kutoka kwa anwani tofauti). Hata hivyo, hilo halitoshi. Mtindo ambao Carol anatafuta ni kwamba Bill anafadhili anwani, na kisha hazina ya kampeni ya Alice inatoa pesa kutoka humo.

Suluhisho moja ni kwa kampeni ya Alice kutotoa pesa moja kwa moja, bali kuitumia kumlipa mtu wa tatu. Ikiwa kampeni ya Alice itatuma ETH 10 kwa Dave's World Domination Campaign Services, Carol atajua tu kwamba Bill alimchangia mmoja wa wateja wa Dave. Ikiwa Dave ana wateja wa kutosha, Carol hataweza kujua ikiwa Bill alichangia kwa Alice anayeshindana naye, au kwa Adam, Albert, au Abigail ambao Carol hawajali. Alice anaweza kujumuisha thamani iliyohashishwa na malipo, na kisha kumpa Dave picha ya awali, ili kuthibitisha kuwa ulikuwa mchango wake. Vinginevyo, kama ilivyoelezwa hapo juu, ikiwa Alice atampa Dave _V<sub>priv</sub>_ yake, tayari anajua malipo yalitoka kwa nani.

Tatizo kuu la suluhisho hili ni kwamba linahitaji Alice ajali usiri wakati usiri huo unamnufaisha Bill. Alice anaweza kutaka kudumisha sifa yake ili rafiki yake Bill, Bob, pia amchangie. Lakini inawezekana pia kwamba hatamjali kumfichua Bill, kwa sababu basi ataogopa kitakachotokea ikiwa Carol atashinda. Bill anaweza kuishia kumpa Alice msaada zaidi.

### Kutumia tabaka nyingi za siri {#multi-layer}

Badala ya kumtegemea Alice kulinda faragha ya Bill, Bill anaweza kufanya hivyo mwenyewe. Anaweza kutengeneza anwani-meta nyingi kwa watu wa kubuni, Bob na Bella. Kisha Bill anatuma ETH kwa Bob, na "Bob" (ambaye kwa kweli ni Bill) anaituma kwa Bella. "Bella" (pia Bill) anaituma kwa Alice.

Carol bado anaweza kufanya uchambuzi wa trafiki na kuona bomba la Bill-kwa-Bob-kwa-Bella-kwa-Alice. Hata hivyo, ikiwa "Bob" na "Bella" pia watatumia ETH kwa madhumuni mengine, haitaonekana kwamba Bill alihamisha chochote kwa Alice, hata kama Alice atatoa pesa mara moja kutoka kwa anwani ya siri hadi kwa anwani yake ya kampeni inayojulikana.

## Kuandika programu ya anwani ya siri {#write-app}

Makala haya yanaelezea programu ya anwani ya siri [inayopatikana kwenye GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Zana {#tools}

Kuna [maktaba ya typescript ya anwani za siri](https://github.com/ScopeLift/stealth-address-sdk) tunayoweza kutumia. Hata hivyo, operesheni za kikriptografia zinaweza kutumia CPU sana. Ninapendelea kuzitekeleza katika lugha iliyokusanywa, kama vile [Rust](https://rust-lang.org/), na kutumia [WASM](https://webassembly.org/) kuendesha msimbo kwenye kivinjari.

Tutatumia [Vite](https://vite.dev/) na [React](https://react.dev/). Hizi ni zana za kawaida za tasnia; ikiwa huzifahamu, unaweza kutumia [mafunzo haya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Ili kutumia Vite, tunahitaji Node.

### Angalia anwani za siri zikifanya kazi {#in-action}

1. Sakinisha zana zinazohitajika: [Rust](https://rust-lang.org/tools/install/) na [Node](https://nodejs.org/en/download).

2. Clone hazina ya GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Sakinisha mahitaji ya awali na ukusanye msimbo wa Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Anzisha seva ya wavuti.

   ```sh
   cd ../../
   npm install
   npm run dev
   ```

5. Vinjari hadi [programu](http://localhost:5173/). Ukurasa huu wa programu una fremu mbili: moja kwa ajili ya kiolesura cha mtumiaji cha Alice na nyingine kwa ajili ya cha Bill. Fremu hizi mbili haziwasiliani; ziko tu kwenye ukurasa mmoja kwa urahisi.

6. Kama Alice, bofya **Tengeneza Anwani-Meta ya Siri**. Hii itaonyesha anwani mpya ya siri na funguo za binafsi zinazolingana. Nakili anwani-meta ya siri kwenye ubao wa kunakili.

7. Kama Bill, bandika anwani-meta mpya ya siri na bofya **Tengeneza anwani**. Hii inakupa anwani ya kufadhili kwa ajili ya Alice.

8. Nakili anwani na ufunguo wa umma wa Bill na uvibandike katika eneo la "Ufunguo wa binafsi kwa anwani iliyotengenezwa na Bill" ya kiolesura cha mtumiaji cha Alice. Mara tu sehemu hizo zitakapojazwa, utaona ufunguo wa binafsi wa kufikia mali kwenye anwani hiyo.

9. Unaweza kutumia [kikokotoo cha mtandaoni](https://iancoleman.net/ethereum-private-key-to-address/) ili kuhakikisha ufunguo wa binafsi unalingana na anwani.

### Jinsi programu inavyofanya kazi {#how-the-program-works}

#### Sehemu ya WASM {#wasm}

Msimbo chanzo unaokusanywa kuwa WASM umeandikwa katika [Rust](https://rust-lang.org/). Unaweza kuuona katika [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Msimbo huu kimsingi ni kiolesura kati ya msimbo wa JavaScript na [maktaba ya `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) katika Rust inafanana na [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) katika JavaScript. Ina maelezo ya kifurushi, tamko za utegemezi, n.k.

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

Kifurushi cha [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) kinahitaji kutengeneza thamani za nasibu. Hilo haliwezi kufanywa kwa njia za kialgoriti pekee; inahitaji ufikiaji wa mchakato halisi kama chanzo cha entropy. Ufafanuzi huu unabainisha kuwa tutapata entropy hiyo kwa kuuliza kivinjari tunachotumia.

```toml
console_error_panic_hook = "0.1.7"
```

[Maktaba hii](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) inatupa ujumbe wa makosa wenye maana zaidi wakati msimbo wa WASM unapokwama na hauwezi kuendelea.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Aina ya towe inayohitajika kutengeneza msimbo wa WASM.

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

Vitendaji tunavyohitaji kutoka kwa [maktaba ya `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust kwa kawaida hutumia safu za baiti ([arrays](https://doc.rust-lang.org/std/primitive.array.html)) (`[u8; <size>]`) kwa thamani. Lakini katika JavaScript, kwa kawaida tunatumia mifuatano ya heksadesimali. [Maktaba ya `hex`](https://docs.rs/hex/latest/hex/) inatutafsiria kutoka uwakilishi mmoja hadi mwingine.

```rust
#[wasm_bindgen]
```

Tengeneza viunganishi vya WASM ili kuweza kuita kitendaji hiki kutoka kwa JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Njia rahisi zaidi ya kurudisha kitu chenye sehemu nyingi ni kurudisha mfuatano wa JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) inarudisha sehemu tatu:

- Anwani-meta (_K<sub>pub</sub>_ na _V<sub>pub</sub>_)
- Ufunguo wa binafsi wa kutazama (_V<sub>priv</sub>_)
- Ufunguo wa binafsi wa kutumia (_K<sub>priv</sub>_)

Sintaksia ya [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) inaturuhusu kutenganisha thamani hizo tena.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Tumia macro ya [`format!`](https://doc.rust-lang.org/std/fmt/index.html) kutengeneza mfuatano uliosimbwa kwa JSON. Tumia [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) kubadilisha safu kuwa mifuatano ya heksi.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Kitendaji hiki hugeuza mfuatano wa heksi (unaotolewa na JavaScript) kuwa safu ya baiti. Tunaitumia kuchanganua thamani zinazotolewa na msimbo wa JavaScript. Kitendaji hiki ni kigumu kwa sababu ya jinsi Rust inavyoshughulikia safu na vekta.

Usemi wa `<const N: usize>` unaitwa [generic](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` ni kigezo kinachodhibiti urefu wa safu inayorudishwa. Kitendaji hiki kwa kweli kinaitwa `str_to_array::<n>`, ambapo `n` ni urefu wa safu.

Thamani ya kurudisha ni `Option<[u8; N]>`, ambayo inamaanisha safu inayorudishwa ni ya [hiari](https://doc.rust-lang.org/std/option/). Huu ni mtindo wa kawaida katika Rust kwa vitendaji ambavyo vinaweza kushindwa.

Kwa mfano, tukiiita `str_to_array::10("bad060a7")`, kitendaji kinatakiwa kurudisha safu ya thamani kumi, lakini ingizo ni baiti nne tu. Kitendaji kinahitaji kushindwa, na hufanya hivyo kwa kurudisha `None`. Thamani ya kurudisha kwa `str_to_array::4("bad060a7")` itakuwa `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Kitendaji cha [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) kinarudisha `Result<Vec<u8>, FromHexError>`. Aina ya [`Result`](https://doc.rust-lang.org/std/result/) inaweza kuwa na matokeo ya mafanikio (`Ok(value)`) au kosa (`Err(error)`).

Mbinu ya `.ok()` hubadilisha `Result` kuwa `Option`, ambayo thamani yake ni thamani ya `Ok()` ikiwa imefanikiwa au `None` ikiwa sivyo. Mwishowe, [opereta ya alama ya swali](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) huacha vitendaji vya sasa na kurudisha `None` ikiwa `Option` ni tupu. Vinginevyo, hufungua thamani na kuirudisha (katika kesi hii, kugawa thamani kwa `vec`).

Hii inaonekana kama njia ya kushangaza iliyopotoka ya kushughulikia makosa, lakini `Result` na `Option` huhakikisha kuwa makosa yote yanashughulikiwa, kwa njia moja au nyingine.

```rust
    if vec.len() != N { return None; }
```

Ikiwa idadi ya baiti si sahihi, hilo ni kosa, na tunarudisha `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust ina aina mbili za safu. [Safu](https://doc.rust-lang.org/std/primitive.array.html) zina ukubwa usiobadilika. [Vekta](https://doc.rust-lang.org/std/vec/index.html) zinaweza kukua na kupungua. `hex::decode` inarudisha vekta, lakini maktaba ya `eth_stealth_addresses` inataka kupokea safu. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) hubadilisha thamani kuwa aina nyingine, kwa mfano, vekta kuwa safu.

```rust
    Some(array)
}
```

Rust haikuhitaji utumie neno kuu la [`return`](https://doc.rust-lang.org/std/keyword.return.html) unaporudisha thamani mwishoni mwa kitendaji.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Kitendaji hiki kinapokea anwani-meta ya umma, ambayo inajumuisha _V<sub>pub</sub>_ na _K<sub>pub</sub>_. Inarudisha anwani ya siri, ufunguo wa umma wa kuchapisha (_R<sub>pub</sub>_), na thamani ya skanisho ya baiti moja ambayo inaharakisha utambuzi wa anwani zilizochapishwa ambazo zinaweza kuwa za Alice.

Thamani ya skanisho ni sehemu ya siri ya pamoja (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Thamani hii inapatikana kwa Alice, na kuikagua ni haraka zaidi kuliko kuangalia ikiwa _f(K<sub>pub</sub>+G\*hashi(S))_ ni sawa na anwani iliyochapishwa.

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

Andaa mfuatano wa towe uliosimbwa kwa JSON.

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

Kitendaji hiki hutumia [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) ya maktaba kukokotoa ufunguo wa binafsi wa kutoa pesa kutoka kwa anwani (_R<sub>priv</sub>_). Ukokoaji huu unahitaji thamani hizi:

- Anwani (_Anwani=f(P<sub>pub</sub>)_)
- Ufunguo wa umma uliotengenezwa na Bill (_R<sub>pub</sub>_)
- Ufunguo wa binafsi wa kutazama (_V<sub>priv</sub>_)
- Ufunguo wa binafsi wa kutumia (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) inabainisha kuwa kitendaji kinachotekelezwa wakati msimbo wa WASM unapowashwa.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Msimbo huu unabainisha kuwa towe la hitilafu litumwe kwenye kiweko cha JavaScript. Ili kuiona ikifanya kazi, tumia programu na mpe Bill anwani-meta isiyo sahihi (badilisha tu tarakimu moja ya heksadesimali). Utaona kosa hili kwenye kiweko cha JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Ikifuatiwa na ufuatiliaji wa mrundikano. Kisha mpe Bill anwani-meta sahihi, na mpe Alice anwani isiyo sahihi au ufunguo wa umma usio sahihi. Utaona kosa hili:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Tena, ikifuatiwa na ufuatiliaji wa mrundikano.

#### Kiolesura cha Mtumiaji {#ui}

Kiolesura cha mtumiaji kimeandikwa kwa kutumia [React](https://react.dev/) na kinatolewa na [Vite](https://vite.dev/). Unaweza kujifunza kuzihusu kwa kutumia [mafunzo haya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Hakuna haja ya [WAGMI](https://wagmi.sh/) hapa kwa sababu hatuingiliani moja kwa moja na mnyororo wa bloku au mkoba.

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

Tunahitaji programu-jalizi mbili za Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) na [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Faili hili ndilo sehemu kuu ya programu. Ni kontena linalojumuisha sehemu mbili: `Alice` na `Bill`, violesura vya watumiaji hao. Sehemu muhimu kwa WASM ni msimbo wa uanzishaji.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Tunapotumia [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), inatengeneza faili mbili tunazotumia hapa: faili la wasm lenye msimbo halisi (hapa, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) na faili la JavaScript lenye ufafanuzi wa kuitumia (hapa, `src/rust_wasm/pkg/rust_wasm.js`). Usafirishaji chaguo-msingi wa faili hilo la JavaScript ni msimbo unaohitaji kuendeshwa ili kuanzisha WASM.

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

[Ndoano ya `useEffect`](https://react.dev/reference/react/useEffect) inakuwezesha kubainisha kitendaji kinachotekelezwa wakati vigezo vya hali vinapobadilika. Hapa, orodha ya vigezo vya hali ni tupu (`[]`), kwa hivyo kitendaji hiki kinachotekelezwa mara moja tu wakati ukurasa unapopakiwa.

Kitendaji cha athari lazima kirudi mara moja. Ili kutumia msimbo wa asinkroni, kama vile `init` ya WASM (ambayo inapaswa kupakia faili la `.wasm` na kwa hivyo inachukua muda) tunafafanua kitendaji cha ndani cha [`async`](https://en.wikipedia.org/wiki/Async/await) na kukiendesha bila `await`.

**`Bill.jsx`**

Hiki ni kiolesura cha mtumiaji cha Bill. Ina kitendo kimoja, kutengeneza anwani kulingana na anwani-meta ya siri iliyotolewa na Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Mbali na usafirishaji chaguo-msingi, msimbo wa JavaScript uliotengenezwa na `wasm-pack` husafirisha kitendaji kwa kila kitendaji katika msimbo wa WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Ili kuita vitendaji vya WASM, tunaita tu kitendaji kilichosafirishwa na faili la JavaScript lililotengenezwa na `wasm-pack`.

**`Alice.jsx`**

Msimbo katika `Alice.jsx` unafanana, isipokuwa kwamba Alice ana vitendo viwili:

- Tengeneza anwani-meta
- Pata ufunguo wa binafsi kwa anwani iliyochapishwa na Bill

## Hitimisho {#conclusion}

Anwani za siri si suluhisho la kila kitu; zinapaswa [kutumiwa ipasavyo](#go-wrong). Lakini zinapotumiwa ipasavyo, zinaweza kuwezesha faragha kwenye mnyororo wa bloku wa umma.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).