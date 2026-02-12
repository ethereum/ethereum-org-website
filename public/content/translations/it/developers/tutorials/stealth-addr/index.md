---
title: "Utilizzo degli Indirizzi Nascosti"
description: "Gli indirizzi nascosti consentono agli utenti di trasferire asset in modo anonimo. Dopo aver letto questo articolo, sarai in grado di: spiegare cosa sono gli indirizzi nascosti e come funzionano, capire come usare gli indirizzi nascosti in modo da preservare l'anonimato e scrivere un'applicazione basata sul web che utilizza gli indirizzi nascosti."
author: Ori Pomerantz
tags:
  [
    "Indirizzo nascosto",
    "privacy",
    "crittografia",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: it
sidebarDepth: 3
---

Tu sei Bill. Per motivi che non approfondiremo, vuoi fare una donazione alla campagna "Alice Regina del Mondo" e vuoi che Alice sappia che hai donato, in modo che ti ricompensi in caso di vittoria. Sfortunatamente, la sua vittoria non è garantita. C'è una campagna concorrente, "Carol Imperatrice del Sistema Solare". Se Carol vince e scopre che hai fatto una donazione ad Alice, sarai nei guai. Quindi non puoi semplicemente trasferire 200 ETH dal tuo conto a quello di Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) offre la soluzione. Questo ERC spiega come usare gli [indirizzi nascosti](https://nerolation.github.io/stealth-utils) per i trasferimenti anonimi.

**Avvertenza**: La crittografia alla base degli indirizzi nascosti è, per quanto ne sappiamo, solida. Tuttavia, esistono potenziali attacchi side-channel. [Di seguito](#go-wrong), vedrai cosa puoi fare per ridurre questo rischio.

## Come funzionano gli indirizzi nascosti {#how}

Questo articolo tenterà di spiegare gli indirizzi nascosti in due modi. Il primo è [come usarli](#how-use). Questa parte è sufficiente per comprendere il resto dell'articolo. Poi c'è [una spiegazione della matematica che vi sta dietro](#how-math). Se sei interessato alla crittografia, leggi anche questa parte.

### La versione semplice (come usare gli indirizzi nascosti) {#how-use}

Alice crea due chiavi private e pubblica le chiavi pubbliche corrispondenti (che possono essere combinate in un unico meta-indirizzo di doppia lunghezza). Anche Bill crea una chiave privata e pubblica la chiave pubblica corrispondente.

Usando la chiave pubblica di una parte e la chiave privata dell'altra, è possibile derivare un segreto condiviso noto solo ad Alice e Bill (non può essere derivato dalle sole chiavi pubbliche). Usando questo segreto condiviso, Bill ottiene l'indirizzo nascosto e può inviarvi degli asset.

Anche Alice ottiene l'indirizzo dal segreto condiviso, ma poiché conosce le chiavi private delle chiavi pubbliche che ha pubblicato, può anche ottenere la chiave privata che le permette di prelevare da quell'indirizzo.

### La matematica (perché gli indirizzi nascosti funzionano così) {#how-math}

Gli indirizzi nascosti standard utilizzano la [crittografia a curva ellittica (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) per ottenere prestazioni migliori con meno bit di chiave, pur mantenendo lo stesso livello di sicurezza. Ma per la maggior parte possiamo ignorarlo e fingere di usare l'aritmetica normale.

C'è un numero che tutti conoscono, _G_. Puoi moltiplicare per _G_. Ma a causa della natura dell'ECC, è praticamente impossibile dividere per _G_. Il modo in cui la crittografia a chiave pubblica funziona generalmente in Ethereum è che puoi usare una chiave privata, _P<sub>priv</sub>_, per firmare le transazioni che vengono poi verificate da una chiave pubblica, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice crea due chiavi private, _K<sub>priv</sub>_ e _V<sub>priv</sub>_. _K<sub>priv</sub>_ sarà usata per spendere fondi dall'indirizzo nascosto, e _V<sub>priv</sub>_ per visualizzare gli indirizzi che appartengono ad Alice. Alice pubblica quindi le chiavi pubbliche: _K<sub>pub</sub> = GK<sub>priv</sub>_ e _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill crea una terza chiave privata, _R<sub>priv</sub>_, e pubblica _R<sub>pub</sub> = GR<sub>priv</sub>_ in un registro centrale (Bill avrebbe potuto inviarla anche ad Alice, ma supponiamo che Carol sia in ascolto).

Bill calcola _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, che si aspetta che anche Alice conosca (spiegato di seguito). Questo valore è chiamato _S_, il segreto condiviso. Questo dà a Bill una chiave pubblica, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. Da questa chiave pubblica, può calcolare un indirizzo e inviarvi qualsiasi risorsa desideri. In futuro, se Alice vince, Bill può dirle _R<sub>priv</sub>_ per dimostrare che le risorse provengono da lui.

Alice calcola _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Questo le dà lo stesso segreto condiviso, _S_. Poiché conosce la chiave privata, _K<sub>priv</sub>_, può calcolare _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_. Questa chiave le consente di accedere agli asset nell'indirizzo che risulta da _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_.

Abbiamo una chiave di visualizzazione separata per consentire ad Alice di subappaltare ai Servizi della Campagna di Dominazione Mondiale di Dave. Alice è disposta a far conoscere a Dave gli indirizzi pubblici e a informarla quando sono disponibili più fondi, ma non vuole che lui spenda i soldi della sua campagna.

Poiché la visualizzazione e la spesa usano chiavi separate, Alice può dare a Dave _V<sub>priv</sub>_. Poi Dave può calcolare _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ e in questo modo ottenere le chiavi pubbliche (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_). Ma senza _K<sub>priv</sub>_ Dave non può ottenere la chiave privata.

Per riassumere, questi sono i valori noti ai diversi partecipanti.

| Alice | Published | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| _K<sub>priv</sub>_ | - | - | - |
| _V<sub>priv</sub>_ | - | - | _V<sub>priv</sub>_ |
| _K<sub>pub</sub> = GK<sub>priv</sub>_ | _K<sub>pub</sub>_ | _K<sub>pub</sub>_ | _K<sub>pub</sub>_ |
| _V<sub>pub</sub> = GV<sub>priv</sub>_ | _V<sub>pub</sub>_ | _V<sub>pub</sub>_ | _V<sub>pub</sub>_ |
| - | - | _R<sub>priv</sub>_ | - |
| _R<sub>pub</sub>_ | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_ | _R<sub>pub</sub>_ |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | - | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_ | - | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_ | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_ |
| _Indirizzo=f(P<sub>pub</sub>)_ | - | _Indirizzo=f(P<sub>pub</sub>)_ | _Indirizzo=f(P<sub>pub</sub>)_ | _Indirizzo=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_ | - | - | - |

## Quando gli indirizzi nascosti vanno male {#go-wrong}

_Non ci sono segreti sulla blockchain_. Sebbene gli indirizzi nascosti possano fornire privacy, tale privacy è suscettibile all'analisi del traffico. Per fare un esempio banale, immagina che Bill finanzi un indirizzo e invii immediatamente una transazione per pubblicare un valore _R<sub>pub</sub>_. Senza la _V<sub>priv</sub>_ di Alice, non possiamo essere sicuri che si tratti di un indirizzo nascosto, ma è la scommessa più probabile. Poi, vediamo un'altra transazione che trasferisce tutti gli ETH da quell'indirizzo all'indirizzo del fondo della campagna di Alice. Potremmo non essere in grado di provarlo, ma è probabile che Bill abbia appena fatto una donazione alla campagna di Alice. Carol la penserebbe certamente così.

È facile per Bill separare la pubblicazione di _R<sub>pub</sub>_ dal finanziamento dell'indirizzo nascosto (farle in momenti diversi, da indirizzi diversi). Tuttavia, ciò non è sufficiente. Lo schema che Carol cerca è che Bill finanzia un indirizzo, e poi il fondo della campagna di Alice preleva da esso.

Una soluzione è che la campagna di Alice non prelevi il denaro direttamente, ma lo usi per pagare una terza parte. Se la campagna di Alice invia 10 ETH ai Servizi della Campagna di Dominazione Mondiale di Dave, Carol sa solo che Bill ha fatto una donazione a uno dei clienti di Dave. Se Dave ha abbastanza clienti, Carol non sarebbe in grado di sapere se Bill ha fatto una donazione ad Alice, che è sua concorrente, o ad Adam, Albert o Abigail, di cui a Carol non importa. Alice può includere un valore hashato con il pagamento, e poi fornire a Dave la preimmagine, per dimostrare che era la sua donazione. In alternativa, come notato sopra, se Alice dà a Dave la sua _V<sub>priv</sub>_, lui sa già da chi proviene il pagamento.

Il problema principale di questa soluzione è che richiede che Alice si preoccupi della segretezza quando quella segretezza va a vantaggio di Bill. Alice potrebbe voler mantenere la sua reputazione in modo che anche Bob, l'amico di Bill, le faccia una donazione. Ma è anche possibile che non le dispiaccia smascherare Bill, perché così lui avrà paura di ciò che accadrà se Carol vincerà. Bill potrebbe finire per fornire ad Alice un sostegno ancora maggiore.

### Utilizzo di più livelli nascosti {#multi-layer}

Invece di affidarsi ad Alice per preservare la privacy di Bill, Bill può farlo da solo. Può generare più meta-indirizzi per persone fittizie, Bob e Bella. Bill quindi invia ETH a Bob, e "Bob" (che in realtà è Bill) li invia a Bella. "Bella" (sempre Bill) li invia ad Alice.

Carol può ancora fare l'analisi del traffico e vedere la pipeline Bill-Bob-Bella-Alice. Tuttavia, se "Bob" e "Bella" usano ETH anche per altri scopi, non sembrerà che Bill abbia trasferito nulla ad Alice, anche se Alice preleva immediatamente dall'indirizzo nascosto al suo indirizzo di campagna noto.

## Scrivere un'applicazione per indirizzi nascosti {#write-app}

Questo articolo spiega un'applicazione di indirizzi nascosti [disponibile su GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Strumenti {#tools}

Esiste [una libreria di indirizzi nascosti per typescript](https://github.com/ScopeLift/stealth-address-sdk) che potremmo usare. Tuttavia, le operazioni crittografiche possono essere ad alta intensità di CPU. Preferisco implementarli in un linguaggio compilato, come [Rust](https://rust-lang.org/), e usare [WASM](https://webassembly.org/) per eseguire il codice nel browser.

Useremo [Vite](https://vite.dev/) e [React](https://react.dev/). Questi sono strumenti standard del settore; se non li conosci, puoi usare [questa guida](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Per usare Vite, abbiamo bisogno di Node.

### Vedere gli indirizzi nascosti in azione {#in-action}

1. Installa gli strumenti necessari: [Rust](https://rust-lang.org/tools/install/) e [Node](https://nodejs.org/en/download).

2. Clona la repository di GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Installa i prerequisiti e compila il codice Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown
   cargo install wasm-pack
   wasm-pack build --target web
   ```

4. Avvia il server web.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Vai all'[applicazione](http://localhost:5173/). Questa pagina dell'applicazione ha due frame: uno per l'interfaccia utente di Alice e l'altro per quella di Bill. I due frame non comunicano; sono sulla stessa pagina solo per comodità.

6. Nei panni di Alice, fai clic su **Genera un meta-indirizzo nascosto**. Questo visualizzerà il nuovo indirizzo nascosto e le chiavi private corrispondenti. Copia il meta-indirizzo nascosto negli appunti.

7. Nei panni di Bill, incolla il nuovo meta-indirizzo nascosto e fai clic su **Genera un indirizzo**. Questo ti dà l'indirizzo da finanziare per Alice.

8. Copia l'indirizzo e la chiave pubblica di Bill e incollali nell'area "Chiave privata per l'indirizzo generato da Bill" dell'interfaccia utente di Alice. Una volta compilati questi campi, vedrai la chiave privata per accedere agli asset a quell'indirizzo.

9. Puoi usare [un calcolatore online](https://iancoleman.net/ethereum-private-key-to-address/) per assicurarti che la chiave privata corrisponda all'indirizzo.

### Come funziona il programma {#how-the-program-works}

#### Il componente WASM {#wasm}

Il codice sorgente che compila in WASM è scritto in [Rust](https://rust-lang.org/). Puoi vederlo in [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Questo codice è principalmente un'interfaccia tra il codice JavaScript e [la libreria `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) in Rust è analogo a [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) in JavaScript. Contiene informazioni sul pacchetto, dichiarazioni di dipendenza, ecc.

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

Il pacchetto [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) deve generare valori casuali. Ciò non può essere fatto con mezzi puramente algoritmici; richiede l'accesso a un processo fisico come fonte di entropia. Questa definizione specifica che otterremo quell'entropia chiedendola al browser in cui siamo in esecuzione.

```toml
console_error_panic_hook = "0.1.7"
```

[Questa libreria](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) ci fornisce messaggi di errore più significativi quando il codice WASM va in panico e non può continuare.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Il tipo di output richiesto per produrre codice WASM.

**`lib.rs`**

Questo è il codice Rust effettivo.

```rust
use wasm_bindgen::prelude::*;
```

Le definizioni per creare un pacchetto WASM da Rust. Sono documentate [qui](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Le funzioni di cui abbiamo bisogno dalla [libreria `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust usa tipicamente [array](https://doc.rust-lang.org/std/primitive.array.html) di byte (`[u8; <size>]`) per i valori. Ma in JavaScript, usiamo tipicamente stringhe esadecimali. [La libreria `hex`](https://docs.rs/hex/latest/hex/) traduce per noi da una rappresentazione all'altra.

```rust
#[wasm_bindgen]
```

Genera i binding WASM per poter chiamare questa funzione da JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Il modo più semplice per restituire un oggetto con più campi è restituire una stringa JSON.

```rust
    let (address, spend_private_key, view_private_key) =
        generate_stealth_meta_address();
```

La funzione [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) restituisce tre campi:

- Il meta-indirizzo (_K<sub>pub</sub>_ e _V<sub>pub</sub>_)
- La chiave privata di visualizzazione (_V<sub>priv</sub>_)
- La chiave privata di spesa (_K<sub>priv</sub>_)

La sintassi [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) ci permette di separare di nuovo questi valori.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Usa la macro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) per generare la stringa codificata in JSON. Usa [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) per cambiare gli array in stringhe esadecimali.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Questa funzione trasforma una stringa esadecimale (fornita da JavaScript) in un array di byte. La usiamo per analizzare i valori forniti dal codice JavaScript. Questa funzione è complicata a causa del modo in cui Rust gestisce gli array e i vettori.

L'espressione `<const N: usize>` è chiamata [generica](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` è un parametro che controlla la lunghezza dell'array restituito. La funzione è in realtà chiamata `str_to_array::<n>`, dove `n` è la lunghezza dell'array.

Il valore di ritorno è `Option<[u8; N]>`, il che significa che l'array restituito è [opzionale](https://doc.rust-lang.org/std/option/). Questo è un modello tipico in Rust per le funzioni che possono fallire.

Ad esempio, se chiamiamo `str_to_array::10("bad060a7")`, la funzione dovrebbe restituire un array di dieci valori, ma l'input è di soli quattro byte. La funzione deve fallire, e lo fa restituendo `None`. Il valore di ritorno per `str_to_array::4("bad060a7")` sarebbe `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode restituisce Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

La funzione [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) restituisce un `Result<Vec<u8>, FromHexError>`. Il tipo [`Result`](https://doc.rust-lang.org/std/result/) può contenere un risultato di successo (`Ok(value)`) o un errore (`Err(error)`).

Il metodo `.ok()` trasforma il `Result` in un `Option`, il cui valore è il valore `Ok()` in caso di successo o `None` in caso contrario. Infine, l'[operatore punto interrogativo](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) interrompe le funzioni correnti e restituisce `None` se l'`Option` è vuoto. Altrimenti, estrae il valore e lo restituisce (in questo caso, per assegnare un valore a `vec`).

Questo sembra un metodo stranamente contorto per gestire gli errori, ma `Result` e `Option` assicurano che tutti gli errori siano gestiti, in un modo o nell'altro.

```rust
    if vec.len() != N { return None; }
```

Se il numero di byte non è corretto, è un fallimento e restituiamo `None`.

```rust
    // try_into consuma vec e tenta di creare [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust ha due tipi di array. Gli [array](https://doc.rust-lang.org/std/primitive.array.html) hanno una dimensione fissa. I [vettori](https://doc.rust-lang.org/std/vec/index.html) possono crescere e ridursi. `hex::decode` restituisce un vettore, ma la libreria `eth_stealth_addresses` vuole ricevere degli array. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) converte un valore in un altro tipo, ad esempio un vettore in un array.

```rust
    Some(array)
}
```

Rust non richiede di usare la parola chiave [`return`](https://doc.rust-lang.org/std/keyword.return.html) quando si restituisce un valore alla fine di una funzione.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Questa funzione riceve un meta-indirizzo pubblico, che include sia _V<sub>pub</sub>_ che _K<sub>pub</sub>_. Restituisce l'indirizzo nascosto, la chiave pubblica da pubblicare (_R<sub>pub</sub>_) e un valore di scansione di un byte che accelera l'identificazione di quali indirizzi pubblicati possono appartenere ad Alice.

Il valore di scansione fa parte del segreto condiviso (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Questo valore è disponibile per Alice, e controllarlo è molto più veloce che controllare se _f(K<sub>pub</sub>+G\*hash(S))_ è uguale all'indirizzo pubblicato.

```rust
    let (address, r_pub, scan) =
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Usiamo la funzione [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) della libreria.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Prepara la stringa di output codificata in JSON.

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

Questa funzione usa [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) della libreria per calcolare la chiave privata per prelevare dall'indirizzo (_R<sub>priv</sub>_). Questo calcolo richiede questi valori:

- L'indirizzo (_Indirizzo=f(P<sub>pub</sub>)_)
- La chiave pubblica generata da Bill (_R<sub>pub</sub>_)
- La chiave privata di visualizzazione (_V<sub>priv</sub>_)
- La chiave privata di spesa (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) specifica che la funzione viene eseguita quando il codice WASM viene inizializzato.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Questo codice specifica che l'output di panico venga inviato alla console di JavaScript. Per vederlo in azione, usa l'applicazione e dai a Bill un meta-indirizzo non valido (basta cambiare una cifra esadecimale). Vedrai questo errore nella console di JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Seguito da una traccia dello stack. Poi dai a Bill il meta-indirizzo valido, e ad Alice un indirizzo o una chiave pubblica non validi. Vedrai questo errore:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Di nuovo, seguito da una traccia dello stack.

#### L'interfaccia utente {#ui}

L'interfaccia utente è scritta usando [React](https://react.dev/) e servita da [Vite](https://vite.dev/). Puoi imparare a usarli con [questa guida](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Non c'è bisogno di [WAGMI](https://wagmi.sh/) qui perché non interagiamo direttamente con una blockchain o un portafoglio.

L'unica parte non ovvia dell'interfaccia utente è la connettività WASM. Ecco come funziona.

**`vite.config.js`**

Questo file contiene [la configurazione di Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Abbiamo bisogno di due plugin di Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) e [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Questo file è il componente principale dell'applicazione. È un contenitore che include due componenti: `Alice` e `Bill`, le interfacce utente per questi utenti. La parte rilevante per WASM è il codice di inizializzazione.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Quando usiamo [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), esso crea due file che usiamo qui: un file wasm con il codice effettivo (qui, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) e un file JavaScript con le definizioni per usarlo (qui, `src/rust_wasm/pkg/rust_wasm.js`). L'esportazione predefinita di quel file JavaScript è il codice che deve essere eseguito per avviare WASM.

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
        console.error('Errore durante il caricamento di wasm:', err)
        alert("Errore Wasm: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

L'hook [`useEffect`](https://react.dev/reference/react/useEffect) consente di specificare una funzione che viene eseguita quando le variabili di stato cambiano. Qui, l'elenco delle variabili di stato è vuoto (`[]`), quindi questa funzione viene eseguita una sola volta al caricamento della pagina.

La funzione effetto deve restituire immediatamente. Per usare codice asincrono, come l' `init` di WASM (che deve caricare il file `.wasm` e quindi richiede tempo) definiamo una funzione interna [`async`](https://en.wikipedia.org/wiki/Async/await) e la eseguiamo senza `await`.

**`Bill.jsx`**

Questa è l'interfaccia utente per Bill. Ha una singola azione, creare un indirizzo basato sul meta-indirizzo nascosto fornito da Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Oltre all'esportazione predefinita, il codice JavaScript generato da `wasm-pack` esporta una funzione per ogni funzione nel codice WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Per chiamare le funzioni WASM, basta chiamare la funzione esportata dal file JavaScript creato da `wasm-pack`.

**`Alice.jsx`**

Il codice in `Alice.jsx` è analogo, tranne che Alice ha due azioni:

- Generare un meta-indirizzo
- Ottenere la chiave privata per un indirizzo pubblicato da Bill

## Conclusione {#conclusion}

Gli indirizzi nascosti non sono una panacea; devono essere [usati correttamente](#go-wrong). Ma se usati correttamente, possono abilitare la privacy su una blockchain pubblica.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
