---
title: "Usare gli indirizzi stealth"
description: "Gli indirizzi stealth consentono agli utenti di trasferire asset in modo anonimo. Dopo aver letto questo articolo, sarai in grado di: spiegare cosa sono gli indirizzi stealth e come funzionano, capire come usare gli indirizzi stealth in modo da preservare l'anonimato e scrivere un'applicazione basata sul web che utilizza gli indirizzi stealth."
author: Ori Pomerantz
tags: ["Indirizzo stealth", "privacy", "crittografia", "Rust", "wasm"]
skill: intermediate
breadcrumb: Indirizzi stealth
published: 2025-11-30
lang: it
sidebarDepth: 3
---

Sei Bill. Per ragioni in cui non entreremo, vuoi donare alla campagna "Alice Regina del Mondo" e far sapere ad Alice che hai donato, in modo che ti ricompensi se vince. Sfortunatamente, la sua vittoria non è garantita. C'è una campagna concorrente, "Carol Imperatrice del Sistema Solare". Se Carol vince e scopre che hai donato ad Alice, sarai nei guai. Quindi non puoi semplicemente trasferire 200 ETH dal tuo account a quello di Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) ha la soluzione. Questo ERC spiega come utilizzare gli [indirizzi stealth](https://nerolation.github.io/stealth-utils) per i trasferimenti anonimi.

**Attenzione**: La crittografia alla base degli indirizzi stealth è, per quanto ne sappiamo, solida. Tuttavia, ci sono potenziali attacchi side-channel (a canale laterale). [Di seguito](#go-wrong), vedrai cosa puoi fare per ridurre questo rischio.

## Come funzionano gli indirizzi stealth {#how}

Questo articolo cercherà di spiegare gli indirizzi stealth in due modi. Il primo è [come usarli](#how-use). Questa parte è sufficiente per comprendere il resto dell'articolo. Poi, c'è [una spiegazione della matematica che c'è dietro](#how-math). Se ti interessa la crittografia, leggi anche questa parte. 

### La versione semplice (come usare gli indirizzi stealth) {#how-use}

Alice crea due chiavi private e pubblica le chiavi pubbliche corrispondenti (che possono essere combinate in un singolo meta-indirizzo a doppia lunghezza). Anche Bill crea una chiave privata e pubblica la chiave pubblica corrispondente.

Usando la chiave pubblica di una parte e la chiave privata dell'altra, è possibile derivare un segreto condiviso noto solo ad Alice e Bill (non può essere derivato solo dalle chiavi pubbliche). Usando questo segreto condiviso, Bill ottiene l'indirizzo stealth e può inviarvi degli asset.

Anche Alice ottiene l'indirizzo dal segreto condiviso, ma poiché conosce le chiavi private delle chiavi pubbliche che ha pubblicato, può anche ottenere la chiave privata che le permette di prelevare da quell'indirizzo.

### La matematica (perché gli indirizzi stealth funzionano così) {#how-math}

Gli indirizzi stealth standard utilizzano la [crittografia a curva ellittica (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) per ottenere prestazioni migliori con meno bit di chiave, pur mantenendo lo stesso livello di sicurezza. Ma per la maggior parte possiamo ignorarlo e fingere di usare l'aritmetica normale.

C'è un numero che tutti conoscono, *G*. Puoi moltiplicare per *G*. Ma a causa della natura dell'ECC, è praticamente impossibile dividere per *G*. Il modo in cui la crittografia a chiave pubblica funziona generalmente in Ethereum è che puoi usare una chiave privata, *P<sub>priv</sub>*, per firmare le transazioni che vengono poi verificate da una chiave pubblica, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice crea due chiavi private, *K<sub>priv</sub>* e *V<sub>priv</sub>*. *K<sub>priv</sub>* verrà utilizzata per spendere denaro dall'indirizzo stealth, e *V<sub>priv</sub>* per visualizzare gli indirizzi che appartengono ad Alice. Alice pubblica quindi le chiavi pubbliche: *K<sub>pub</sub> = GK<sub>priv</sub>* e *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill crea una terza chiave privata, *R<sub>priv</sub>*, e pubblica *R<sub>pub</sub> = GR<sub>priv</sub>* in un registro centrale (Bill avrebbe anche potuto inviarla ad Alice, ma supponiamo che Carol stia ascoltando).

Bill calcola *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, che si aspetta che anche Alice conosca (spiegato di seguito). Questo valore è chiamato *S*, il segreto condiviso. Questo dà a Bill una chiave pubblica, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Da questa chiave pubblica, può calcolare un indirizzo e inviarvi tutte le risorse che desidera. In futuro, se Alice vince, Bill può dirle *R<sub>priv</sub>* per dimostrare che le risorse provenivano da lui.

Alice calcola *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Questo le dà lo stesso segreto condiviso, *S*. Poiché conosce la chiave privata, *K<sub>priv</sub>*, può calcolare *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Questa chiave le permette di accedere agli asset nell'indirizzo risultante da *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Abbiamo una chiave di visualizzazione separata per consentire ad Alice di subappaltare ai Servizi per la Campagna di Dominio del Mondo di Dave. Alice è disposta a far conoscere a Dave gli indirizzi pubblici e a farsi informare quando c'è più denaro disponibile, ma non vuole che lui spenda i soldi della sua campagna.

Poiché la visualizzazione e la spesa utilizzano chiavi separate, Alice può dare a Dave *V<sub>priv</sub>*. Quindi Dave può calcolare *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* e in questo modo ottenere le chiavi pubbliche (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Ma senza *K<sub>priv</sub>* Dave non può ottenere la chiave privata.

Per riassumere, questi sono i valori conosciuti dai diversi partecipanti.

| Alice | Pubblicato | Bill | Dave |
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

## Quando gli indirizzi stealth falliscono {#go-wrong}

*Non ci sono segreti sulla blockchain*. Sebbene gli indirizzi stealth possano fornirti privacy, tale privacy è suscettibile all'analisi del traffico. Per fare un esempio banale, immagina che Bill finanzi un indirizzo e invii immediatamente una transazione per pubblicare un valore *R<sub>pub</sub>*. Senza la *V<sub>priv</sub>* di Alice, non possiamo essere sicuri che si tratti di un indirizzo stealth, ma è molto probabile. Poi, vediamo un'altra transazione che trasferisce tutti gli ETH da quell'indirizzo all'indirizzo del fondo della campagna di Alice. Potremmo non essere in grado di dimostrarlo, ma è probabile che Bill abbia appena donato alla campagna di Alice. Carol lo penserebbe sicuramente.

È facile per Bill separare la pubblicazione di *R<sub>pub</sub>* dal finanziamento dell'indirizzo stealth (farli in momenti diversi, da indirizzi diversi). Tuttavia, questo è insufficiente. Il modello che Carol cerca è che Bill finanzi un indirizzo, e poi il fondo della campagna di Alice prelevi da esso. 

Una soluzione è che la campagna di Alice non prelevi i soldi direttamente, ma li usi per pagare una terza parte. Se la campagna di Alice invia 10 ETH ai Servizi per la Campagna di Dominio del Mondo di Dave, Carol sa solo che Bill ha donato a uno dei clienti di Dave. Se Dave ha abbastanza clienti, Carol non sarebbe in grado di sapere se Bill ha donato ad Alice, che compete con lei, o ad Adam, Albert o Abigail, di cui a Carol non importa nulla. Alice può includere un valore hash con il pagamento, e poi fornire a Dave la preimmagine, per dimostrare che si trattava della sua donazione. In alternativa, come notato sopra, se Alice dà a Dave la sua *V<sub>priv</sub>*, lui sa già da chi proveniva il pagamento.

Il problema principale di questa soluzione è che richiede ad Alice di preoccuparsi della segretezza quando tale segretezza va a vantaggio di Bill. Alice potrebbe voler mantenere la sua reputazione in modo che anche l'amico di Bill, Bob, le faccia una donazione. Ma è anche possibile che non le dispiaccia esporre Bill, perché allora lui avrà paura di cosa succederà se Carol vince. Bill potrebbe finire per fornire ad Alice ancora più supporto.

### Usare più livelli stealth {#multi-layer}

Invece di fare affidamento su Alice per preservare la privacy di Bill, Bill può farlo da solo. Può generare più meta-indirizzi per persone fittizie, Bob e Bella. Bill invia quindi ETH a Bob, e "Bob" (che in realtà è Bill) li invia a Bella. "Bella" (sempre Bill) li invia ad Alice.

Carol può ancora fare l'analisi del traffico e vedere la pipeline Bill-a-Bob-a-Bella-ad-Alice. Tuttavia, se "Bob" e "Bella" usano ETH anche per altri scopi, non sembrerà che Bill abbia trasferito nulla ad Alice, anche se Alice preleva immediatamente dall'indirizzo stealth al suo indirizzo noto della campagna.

## Scrivere un'applicazione per indirizzi stealth {#write-app}

Questo articolo spiega un'applicazione per indirizzi stealth [disponibile su GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Strumenti {#tools}

C'è [una libreria typescript per indirizzi stealth](https://github.com/ScopeLift/stealth-address-sdk) che potremmo usare. Tuttavia, le operazioni crittografiche possono essere intensive per la CPU. Preferisco implementarle in un linguaggio compilato, come [Rust](https://rust-lang.org/), e usare [WASM](https://webassembly.org/) per eseguire il codice nel browser.

Useremo [Vite](https://vite.dev/) e [React](https://react.dev/). Questi sono strumenti standard del settore; se non hai familiarità con essi, puoi usare [questo tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Per usare Vite, abbiamo bisogno di Node.

### Vedere gli indirizzi stealth in azione {#in-action}

1. Installa gli strumenti necessari: [Rust](https://rust-lang.org/tools/install/) e [Node](https://nodejs.org/en/download).

2. Clona il repository GitHub.

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

5. Vai all'[applicazione](http://localhost:5173/). Questa pagina dell'applicazione ha due frame: uno per l'interfaccia utente di Alice e l'altro per quella di Bill. I due frame non comunicano; si trovano sulla stessa pagina solo per comodità.

6. Come Alice, fai clic su **Generate a Stealth Meta-Address** (Genera un meta-indirizzo stealth). Questo mostrerà il nuovo indirizzo stealth e le chiavi private corrispondenti. Copia il meta-indirizzo stealth negli appunti.

7. Come Bill, incolla il nuovo meta-indirizzo stealth e fai clic su **Generate an address** (Genera un indirizzo). Questo ti dà l'indirizzo da finanziare per Alice. 

8. Copia l'indirizzo e la chiave pubblica di Bill e incollali nell'area "Private key for address generated by Bill" (Chiave privata per l'indirizzo generato da Bill) dell'interfaccia utente di Alice. Una volta compilati questi campi, vedrai la chiave privata per accedere agli asset a quell'indirizzo.

9. Puoi usare [un calcolatore online](https://iancoleman.net/ethereum-private-key-to-address/) per assicurarti che la chiave privata corrisponda all'indirizzo.

### Come funziona il programma {#how-the-program-works}

#### Il componente WASM {#wasm}

Il codice sorgente che viene compilato in WASM è scritto in [Rust](https://rust-lang.org/). Puoi vederlo in [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Questo codice è principalmente un'interfaccia tra il codice JavaScript e [la libreria `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) in Rust è analogo a [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) in JavaScript. Contiene informazioni sul pacchetto, dichiarazioni delle dipendenze, ecc.

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

Il pacchetto [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) ha bisogno di generare valori casuali. Questo non può essere fatto con mezzi puramente algoritmici; richiede l'accesso a un processo fisico come fonte di entropia. Questa definizione specifica che otterremo quell'entropia chiedendola al browser in cui siamo in esecuzione.

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

Questo è il codice Rust vero e proprio.

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

Rust utilizza tipicamente [array](https://doc.rust-lang.org/std/primitive.array.html) di byte (`[u8; <size>]`) per i valori. Ma in JavaScript, utilizziamo tipicamente stringhe esadecimali. [La libreria `hex`](https://docs.rs/hex/latest/hex/) traduce per noi da una rappresentazione all'altra.

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

- Il meta-indirizzo (*K<sub>pub</sub>* e *V<sub>pub</sub>*)
- La chiave privata di visualizzazione (*V<sub>priv</sub>*)
- La chiave privata di spesa (*K<sub>priv</sub>*)

La sintassi della [tupla](https://doc.rust-lang.org/std/primitive.tuple.html) ci permette di separare nuovamente quei valori.

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

Questa funzione trasforma una stringa esadecimale (fornita da JavaScript) in un array di byte. La usiamo per analizzare i valori forniti dal codice JavaScript. Questa funzione è complicata a causa di come Rust gestisce array e vettori.

L'espressione `<const N: usize>` è chiamata [generico](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` è un parametro che controlla la lunghezza dell'array restituito. La funzione si chiama in realtà `str_to_array::<n>`, dove `n` è la lunghezza dell'array.

Il valore di ritorno è `Option<[u8; N]>`, il che significa che l'array restituito è [opzionale](https://doc.rust-lang.org/std/option/). Questo è un pattern tipico in Rust per le funzioni che potrebbero fallire.

Ad esempio, se chiamiamo `str_to_array::10("bad060a7")`, la funzione dovrebbe restituire un array di dieci valori, ma l'input è di soli quattro byte. La funzione deve fallire, e lo fa restituendo `None`. Il valore di ritorno per `str_to_array::4("bad060a7")` sarebbe `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode restituisce Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

La funzione [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) restituisce un `Result<Vec<u8>, FromHexError>`. Il tipo [`Result`](https://doc.rust-lang.org/std/result/) può contenere un risultato positivo (`Ok(value)`) o un errore (`Err(error)`).

Il metodo `.ok()` trasforma il `Result` in un `Option`, il cui valore è il valore `Ok()` se ha successo o `None` in caso contrario. Infine, l'[operatore punto interrogativo](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) interrompe le funzioni correnti e restituisce un `None` se l'`Option` è vuoto. Altrimenti, estrae il valore e lo restituisce (in questo caso, per assegnare un valore a `vec`).

Questo sembra un metodo stranamente contorto per gestire gli errori, ma `Result` e `Option` assicurano che tutti gli errori vengano gestiti, in un modo o nell'altro.

```rust
    if vec.len() != N { return None; }
```

Se il numero di byte non è corretto, si tratta di un fallimento e restituiamo `None`.

```rust
    // try_into consuma vec e tenta di creare [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust ha due tipi di array. Gli [array](https://doc.rust-lang.org/std/primitive.array.html) hanno una dimensione fissa. I [vettori](https://doc.rust-lang.org/std/vec/index.html) possono crescere e ridursi. `hex::decode` restituisce un vettore, ma la libreria `eth_stealth_addresses` vuole ricevere array. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) converte un valore in un altro tipo, ad esempio, un vettore in un array.

```rust
    Some(array)
}
```

Rust non richiede l'uso della parola chiave [`return`](https://doc.rust-lang.org/std/keyword.return.html) quando si restituisce un valore alla fine di una funzione.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Questa funzione riceve un meta-indirizzo pubblico, che include sia *V<sub>pub</sub>* che *K<sub>pub</sub>*. Restituisce l'indirizzo stealth, la chiave pubblica da pubblicare (*R<sub>pub</sub>*) e un valore di scansione di un byte che accelera l'identificazione di quali indirizzi pubblicati potrebbero appartenere ad Alice.

Il valore di scansione fa parte del segreto condiviso (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Questo valore è disponibile per Alice, e controllarlo è molto più veloce che controllare se *f(K<sub>pub</sub>+G\*hash(S))* è uguale all'indirizzo pubblicato.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::&lt;66>(stealth_address)?);
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

Questa funzione usa la funzione [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) della libreria per calcolare la chiave privata per prelevare dall'indirizzo (*R<sub>priv</sub>*). Questo calcolo richiede questi valori:

- L'indirizzo (*Address=f(P<sub>pub</sub>)*)
- La chiave pubblica generata da Bill (*R<sub>pub</sub>*)
- La chiave privata di visualizzazione (*V<sub>priv</sub>*)
- La chiave privata di spesa (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) specifica che la funzione viene eseguita quando il codice WASM viene inizializzato.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Questo codice specifica che l'output di panico venga inviato alla console JavaScript. Per vederlo in azione, usa l'applicazione e dai a Bill un meta-indirizzo non valido (basta cambiare una cifra esadecimale). Vedrai questo errore nella console JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Seguito da un'analisi dello stack (stack trace). Quindi dai a Bill il meta-indirizzo valido e dai ad Alice un indirizzo non valido o una chiave pubblica non valida. Vedrai questo errore:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Di nuovo, seguito da un'analisi dello stack.

#### L'interfaccia utente {#ui}

L'interfaccia utente è scritta usando [React](https://react.dev/) e servita da [Vite](https://vite.dev/). Puoi imparare a conoscerli usando [questo tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Non c'è bisogno di [WAGMI](https://wagmi.sh/) qui perché non interagiamo direttamente con una blockchain o un portafoglio.

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

Abbiamo bisogno di due plugin Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) e [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Questo file è il componente principale dell'applicazione. È un contenitore che include due componenti: `Alice` e `Bill`, le interfacce utente per quegli utenti. La parte rilevante per WASM è il codice di inizializzazione.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Quando usiamo [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), crea due file che usiamo qui: un file wasm con il codice vero e proprio (qui, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) e un file JavaScript con le definizioni per usarlo (qui, `src/rust_wasm/pkg/rust_wasm.js`). L'esportazione predefinita di quel file JavaScript è il codice che deve essere eseguito per avviare WASM.

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

L'[`hook useEffect`](https://react.dev/reference/react/useEffect) ti permette di specificare una funzione che viene eseguita quando le variabili di stato cambiano. Qui, l'elenco delle variabili di stato è vuoto (`[]`), quindi questa funzione viene eseguita solo una volta al caricamento della pagina.

La funzione dell'effetto deve restituire immediatamente. Per usare codice asincrono, come l'`init` di WASM (che deve caricare il file `.wasm` e quindi richiede tempo) definiamo una funzione [`async`](https://en.wikipedia.org/wiki/Async/await) interna e la eseguiamo senza un `await`.

**`Bill.jsx`**

Questa è l'interfaccia utente per Bill. Ha una singola azione, creare un indirizzo basato sul meta-indirizzo stealth fornito da Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Oltre all'esportazione predefinita, il codice JavaScript generato da `wasm-pack` esporta una funzione per ogni funzione nel codice WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Per chiamare le funzioni WASM, chiamiamo semplicemente la funzione esportata dal file JavaScript creato da `wasm-pack`.

**`Alice.jsx`**

Il codice in `Alice.jsx` è analogo, tranne per il fatto che Alice ha due azioni:

- Generare un meta-indirizzo
- Ottenere la chiave privata per un indirizzo pubblicato da Bill

## Conclusione {#conclusion}

Gli indirizzi stealth non sono una panacea; devono essere [usati correttamente](#go-wrong). Ma se usati correttamente, possono abilitare la privacy su una blockchain pubblica.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).