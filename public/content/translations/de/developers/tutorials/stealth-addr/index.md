---
title: "Verwendung von Stealth-Adressen"
description: "Stealth-Adressen ermöglichen es Benutzern, Vermögenswerte anonym zu übertragen. Nach dem Lesen dieses Artikels werden Sie in der Lage sein: Zu erklären, was Stealth-Adressen sind und wie sie funktionieren, zu verstehen, wie man Stealth-Adressen so nutzt, dass die Anonymität gewahrt bleibt, und eine webbasierte Anwendung zu schreiben, die Stealth-Adressen verwendet."
author: Ori Pomerantz
tags: ["Stealth-Adresse", "Datenschutz", "Kryptografie", "Rust", "wasm"]
skill: intermediate
breadcrumb: Stealth-Adressen
published: 2025-11-30
lang: de
sidebarDepth: 3
---

Sie sind Bill. Aus Gründen, auf die wir hier nicht näher eingehen, möchten Sie für die Kampagne „Alice for Queen of the World“ spenden und Alice wissen lassen, dass Sie gespendet haben, damit sie Sie belohnt, falls sie gewinnt. Leider ist ihr Sieg nicht garantiert. Es gibt eine konkurrierende Kampagne: „Carol for Empress of the Solar System“. Wenn Carol gewinnt und herausfindet, dass Sie an Alice gespendet haben, stecken Sie in Schwierigkeiten. Sie können also nicht einfach 200 ETH von Ihrem Konto auf das von Alice überweisen.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) bietet die Lösung. Dieser ERC erklärt, wie man [Stealth-Adressen](https://nerolation.github.io/stealth-utils) für anonyme Übertragungen verwendet.

**Warnung**: Die Kryptografie hinter Stealth-Adressen ist, soweit wir wissen, solide. Es gibt jedoch potenzielle Seitenkanalangriffe. [Unten](#go-wrong) werden Sie sehen, was Sie tun können, um dieses Risiko zu verringern.

## Wie Stealth-Adressen funktionieren {#how}

Dieser Artikel wird versuchen, Stealth-Adressen auf zwei Arten zu erklären. Die erste ist, [wie man sie verwendet](#how-use). Dieser Teil reicht aus, um den Rest des Artikels zu verstehen. Danach folgt [eine Erklärung der dahinterstehenden Mathematik](#how-math). Wenn Sie sich für Kryptografie interessieren, lesen Sie auch diesen Teil. 

### Die einfache Version (wie man Stealth-Adressen verwendet) {#how-use}

Alice erstellt zwei Private-Keys und veröffentlicht die entsprechenden Public-Keys (die zu einer einzigen Meta-Adresse doppelter Länge kombiniert werden können). Bill erstellt ebenfalls einen Private-Key und veröffentlicht den entsprechenden Public-Key.

Unter Verwendung des Public-Keys der einen Partei und des Private-Keys der anderen kann man ein gemeinsames Geheimnis ableiten, das nur Alice und Bill bekannt ist (es kann nicht allein aus den Public-Keys abgeleitet werden). Mit diesem gemeinsamen Geheimnis erhält Bill die Stealth-Adresse und kann Vermögenswerte dorthin senden.

Alice erhält die Adresse ebenfalls aus dem gemeinsamen Geheimnis, aber da sie die Private-Keys zu den von ihr veröffentlichten Public-Keys kennt, kann sie auch den Private-Key erhalten, der es ihr ermöglicht, von dieser Adresse abzuheben.

### Die Mathematik (warum Stealth-Adressen so funktionieren) {#how-math}

Standard-Stealth-Adressen verwenden [Elliptische-Kurven-Kryptografie (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor), um eine bessere Leistung mit weniger Schlüsselbits zu erzielen und gleichzeitig das gleiche Sicherheitsniveau beizubehalten. Aber größtenteils können wir das ignorieren und so tun, als würden wir normale Arithmetik verwenden.

Es gibt eine Zahl, die jeder kennt, *G*. Man kann mit *G* multiplizieren. Aber aufgrund der Natur von ECC ist es praktisch unmöglich, durch *G* zu dividieren. Die Art und Weise, wie Public-Key-Kryptografie in Ethereum im Allgemeinen funktioniert, besteht darin, dass man einen Private-Key, *P<sub>priv</sub>*, verwenden kann, um Transaktionen zu signieren, die dann durch einen Public-Key, *P<sub>pub</sub> = GP<sub>priv</sub>*, verifiziert werden. 

Alice erstellt zwei Private-Keys, *K<sub>priv</sub>* und *V<sub>priv</sub>*. *K<sub>priv</sub>* wird verwendet, um Geld von der Stealth-Adresse auszugeben, und *V<sub>priv</sub>*, um die Adressen einzusehen, die Alice gehören. Alice veröffentlicht dann die Public-Keys: *K<sub>pub</sub> = GK<sub>priv</sub>* und *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill erstellt einen dritten Private-Key, *R<sub>priv</sub>*, und veröffentlicht *R<sub>pub</sub> = GR<sub>priv</sub>* in einer zentralen Registratur (Bill hätte ihn auch an Alice senden können, aber wir gehen davon aus, dass Carol mithört).

Bill berechnet *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, wovon er ausgeht, dass Alice es ebenfalls kennt (wird unten erklärt). Dieser Wert wird *S* genannt, das gemeinsame Geheimnis. Dies gibt Bill einen Public-Key, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Aus diesem Public-Key kann er eine Adresse berechnen und beliebige Ressourcen dorthin senden. Wenn Alice in Zukunft gewinnt, kann Bill ihr *R<sub>priv</sub>* mitteilen, um zu beweisen, dass die Ressourcen von ihm stammen.

Alice berechnet *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Dies gibt ihr dasselbe gemeinsame Geheimnis, *S*. Da sie den Private-Key, *K<sub>priv</sub>*, kennt, kann sie *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* berechnen. Dieser Schlüssel ermöglicht ihr den Zugriff auf Vermögenswerte in der Adresse, die sich aus *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)* ergibt.

Wir haben einen separaten Ansichtsschlüssel (Viewing Key), um es Alice zu ermöglichen, Dave's World Domination Campaign Services als Subunternehmer zu beauftragen. Alice ist bereit, Dave die öffentlichen Adressen wissen zu lassen und sie zu informieren, wenn mehr Geld verfügbar ist, aber sie möchte nicht, dass er ihr Kampagnengeld ausgibt.

Da für das Einsehen und Ausgeben separate Schlüssel verwendet werden, kann Alice Dave *V<sub>priv</sub>* geben. Dann kann Dave *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* berechnen und auf diese Weise die Public-Keys (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*) erhalten. Aber ohne *K<sub>priv</sub>* kann Dave den Private-Key nicht erhalten.

Zusammenfassend sind dies die Werte, die den verschiedenen Teilnehmern bekannt sind.

| Alice | Veröffentlicht | Bill | Dave |
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
| *Adresse=f(P<sub>pub</sub>)* | - | *Adresse=f(P<sub>pub</sub>)* | *Adresse=f(P<sub>pub</sub>)* | *Adresse=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Wenn Stealth-Adressen schiefgehen {#go-wrong}

*Es gibt keine Geheimnisse auf der Blockchain*. Während Stealth-Adressen Ihnen Privatsphäre bieten können, ist diese Privatsphäre anfällig für Verkehrsanalysen. Um ein triviales Beispiel zu wählen: Stellen Sie sich vor, Bill finanziert eine Adresse und sendet sofort eine Transaktion, um einen *R<sub>pub</sub>*-Wert zu veröffentlichen. Ohne Alices *V<sub>priv</sub>* können wir nicht sicher sein, dass dies eine Stealth-Adresse ist, aber es ist sehr wahrscheinlich. Dann sehen wir eine weitere Transaktion, die alle ETH von dieser Adresse auf die Adresse von Alices Kampagnenfonds überträgt. Wir können es vielleicht nicht beweisen, aber es ist wahrscheinlich, dass Bill gerade für Alices Kampagne gespendet hat. Carol würde das sicherlich denken.

Es ist für Bill einfach, die Veröffentlichung von *R<sub>pub</sub>* von der Finanzierung der Stealth-Adresse zu trennen (dies zu unterschiedlichen Zeiten und von unterschiedlichen Adressen aus zu tun). Das ist jedoch unzureichend. Das Muster, nach dem Carol sucht, ist, dass Bill eine Adresse finanziert und dann Alices Kampagnenfonds davon abhebt. 

Eine Lösung besteht darin, dass Alices Kampagne das Geld nicht direkt abhebt, sondern es verwendet, um einen Dritten zu bezahlen. Wenn Alices Kampagne 10 ETH an Dave's World Domination Campaign Services sendet, weiß Carol nur, dass Bill an einen von Daves Kunden gespendet hat. Wenn Dave genug Kunden hat, könnte Carol nicht wissen, ob Bill an Alice gespendet hat, die mit ihr konkurriert, oder an Adam, Albert oder Abigail, die Carol egal sind. Alice kann der Zahlung einen gehashten Wert beifügen und Dave dann das Urbild (Preimage) zur Verfügung stellen, um zu beweisen, dass es ihre Spende war. Alternativ, wie oben angemerkt, weiß Dave bereits, von wem die Zahlung kam, wenn Alice ihm ihr *V<sub>priv</sub>* gibt.

Das Hauptproblem bei dieser Lösung ist, dass sie erfordert, dass Alice sich um Geheimhaltung kümmert, wenn diese Geheimhaltung Bill zugutekommt. Alice möchte vielleicht ihren Ruf wahren, damit Bills Freund Bob ebenfalls an sie spendet. Aber es ist auch möglich, dass es ihr nichts ausmachen würde, Bill bloßzustellen, weil er dann Angst davor hat, was passiert, wenn Carol gewinnt. Bill könnte am Ende Alice noch mehr Unterstützung zukommen lassen.

### Verwendung mehrerer Stealth-Ebenen {#multi-layer}

Anstatt sich darauf zu verlassen, dass Alice Bills Privatsphäre wahrt, kann Bill dies selbst tun. Er kann mehrere Meta-Adressen für fiktive Personen, Bob und Bella, generieren. Bill sendet dann ETH an Bob, und „Bob“ (der eigentlich Bill ist) sendet sie an Bella. „Bella“ (ebenfalls Bill) sendet sie an Alice.

Carol kann immer noch eine Verkehrsanalyse durchführen und die Pipeline von Bill zu Bob zu Bella zu Alice sehen. Wenn „Bob“ und „Bella“ jedoch ETH auch für andere Zwecke verwenden, wird es nicht so aussehen, als hätte Bill etwas an Alice übertragen, selbst wenn Alice sofort von der Stealth-Adresse auf ihre bekannte Kampagnenadresse abhebt.

## Schreiben einer Stealth-Adressen-Anwendung {#write-app}

Dieser Artikel erklärt eine Stealth-Adressen-Anwendung, die [auf GitHub verfügbar ist](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Werkzeuge {#tools}

Es gibt [eine Typescript-Stealth-Adressen-Bibliothek](https://github.com/ScopeLift/stealth-address-sdk), die wir verwenden könnten. Kryptografische Operationen können jedoch CPU-intensiv sein. Ich ziehe es vor, sie in einer kompilierten Sprache wie [Rust](https://rust-lang.org/) zu implementieren und [WASM](https://webassembly.org/) zu verwenden, um den Code im Browser auszuführen.

Wir werden [Vite](https://vite.dev/) und [React](https://react.dev/) verwenden. Dies sind branchenübliche Werkzeuge; wenn Sie nicht mit ihnen vertraut sind, können Sie [dieses Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) verwenden. Um Vite zu verwenden, benötigen wir Node.

### Stealth-Adressen in Aktion sehen {#in-action}

1. Installieren Sie die erforderlichen Werkzeuge: [Rust](https://rust-lang.org/tools/install/) und [Node](https://nodejs.org/en/download).

2. Klonen Sie das GitHub-Repository.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
```

3. Installieren Sie die Voraussetzungen und kompilieren Sie den Rust-Code.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
```

4. Starten Sie den Webserver.

   ```sh
   cd ../..
   npm install
   npm run dev
```

5. Navigieren Sie zu [der Anwendung](http://localhost:5173/). Diese Anwendungsseite hat zwei Frames: einen für Alices Benutzeroberfläche und den anderen für Bills. Die beiden Frames kommunizieren nicht miteinander; sie befinden sich nur der Einfachheit halber auf derselben Seite.

6. Klicken Sie als Alice auf **Generate a Stealth Meta-Address**. Dadurch werden die neue Stealth-Adresse und die entsprechenden Private-Keys angezeigt. Kopieren Sie die Stealth-Meta-Adresse in die Zwischenablage.

7. Fügen Sie als Bill die neue Stealth-Meta-Adresse ein und klicken Sie auf **Generate an address**. Dies gibt Ihnen die Adresse, die Sie für Alice finanzieren können. 

8. Kopieren Sie die Adresse und Bills Public-Key und fügen Sie sie in den Bereich „Private key for address generated by Bill“ von Alices Benutzeroberfläche ein. Sobald diese Felder ausgefüllt sind, sehen Sie den Private-Key, um auf die Vermögenswerte an dieser Adresse zuzugreifen.

9. Sie können [einen Online-Rechner](https://iancoleman.net/ethereum-private-key-to-address/) verwenden, um sicherzustellen, dass der Private-Key der Adresse entspricht.

### Wie das Programm funktioniert {#how-the-program-works}

#### Die WASM-Komponente {#wasm}

Der Quellcode, der in WASM kompiliert wird, ist in [Rust](https://rust-lang.org/) geschrieben. Sie können ihn in [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) sehen. Dieser Code ist in erster Linie eine Schnittstelle zwischen dem JavaScript-Code und [der `eth-stealth-addresses`-Bibliothek](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) in Rust ist analog zu [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) in JavaScript. Es enthält Paketinformationen, Abhängigkeitsdeklarationen usw.

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

Das Paket [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) muss Zufallswerte generieren. Das kann nicht durch rein algorithmische Mittel geschehen; es erfordert den Zugriff auf einen physikalischen Prozess als Entropiequelle. Diese Definition legt fest, dass wir diese Entropie erhalten, indem wir den Browser abfragen, in dem wir ausgeführt werden.

```toml
console_error_panic_hook = "0.1.7"
```

[Diese Bibliothek](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) gibt uns aussagekräftigere Fehlermeldungen, wenn der WASM-Code in Panik gerät (panics) und nicht fortgesetzt werden kann.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Der Ausgabetyp, der erforderlich ist, um WASM-Code zu erzeugen.

**`lib.rs`**

Dies ist der eigentliche Rust-Code.

```rust
use wasm_bindgen::prelude::*;
```

Die Definitionen, um ein WASM-Paket aus Rust zu erstellen. Sie sind [hier](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) dokumentiert.

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Die Funktionen, die wir aus [der `eth-stealth-addresses`-Bibliothek](https://github.com/kassandraoftroy/eth-stealth-addresses) benötigen.

```rust
use hex::{decode,encode};
```

Rust verwendet typischerweise Byte-[Arrays](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) für Werte. Aber in JavaScript verwenden wir typischerweise hexadezimale Zeichenfolgen. [Die `hex`-Bibliothek](https://docs.rs/hex/latest/hex/) übersetzt für uns von einer Darstellung in die andere.

```rust
#[wasm_bindgen]
```

Generieren Sie WASM-Bindungen, um diese Funktion aus JavaScript aufrufen zu können.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Der einfachste Weg, ein Objekt mit mehreren Feldern zurückzugeben, ist die Rückgabe eines JSON-Strings. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

Die Funktion [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) gibt drei Felder zurück:

- Die Meta-Adresse (*K<sub>pub</sub>* und *V<sub>pub</sub>*)
- Den Ansichts-Private-Key (*V<sub>priv</sub>*)
- Den Ausgabe-Private-Key (*K<sub>priv</sub>*)

Die [Tupel](https://doc.rust-lang.org/std/primitive.tuple.html)-Syntax ermöglicht es uns, diese Werte wieder zu trennen.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Verwenden Sie das Makro [`format!`](https://doc.rust-lang.org/std/fmt/index.html), um den JSON-codierten String zu generieren. Verwenden Sie [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html), um die Arrays in Hex-Strings umzuwandeln.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Diese Funktion wandelt einen Hex-String (bereitgestellt von JavaScript) in ein Byte-Array um. Wir verwenden sie, um Werte zu parsen, die vom JavaScript-Code bereitgestellt werden. Diese Funktion ist kompliziert, da Rust Arrays und Vektoren auf eine bestimmte Weise handhabt.

Der Ausdruck `<const N: usize>` wird als [Generikum (Generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html) bezeichnet. `N` ist ein Parameter, der die Länge des zurückgegebenen Arrays steuert. Die Funktion heißt eigentlich `str_to_array::<n>`, wobei `n` die Array-Länge ist.

Der Rückgabewert ist `Option<[u8; N]>`, was bedeutet, dass das zurückgegebene Array [optional](https://doc.rust-lang.org/std/option/) ist. Dies ist ein typisches Muster in Rust für Funktionen, die fehlschlagen können.

Wenn wir beispielsweise `str_to_array::10("bad060a7")` aufrufen, soll die Funktion ein Array mit zehn Werten zurückgeben, aber die Eingabe ist nur vier Bytes lang. Die Funktion muss fehlschlagen, und das tut sie, indem sie `None` zurückgibt. Der Rückgabewert für `str_to_array::4("bad060a7")` wäre `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode gibt Result<Vec<u8>, _> zurück
    let vec = decode(s).ok()?;
```

Die Funktion [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) gibt ein `Result<Vec<u8>, FromHexError>` zurück. Der Typ [`Result`](https://doc.rust-lang.org/std/result/) kann entweder ein erfolgreiches Ergebnis (`Ok(value)`) oder einen Fehler (`Err(error)`) enthalten.

Die Methode `.ok()` wandelt das `Result` in eine `Option` um, deren Wert entweder der `Ok()`-Wert ist, wenn sie erfolgreich war, oder `None`, wenn nicht. Schließlich bricht der [Fragezeichen-Operator](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) die aktuellen Funktionen ab und gibt ein `None` zurück, wenn die `Option` leer ist. Andernfalls entpackt er den Wert und gibt ihn zurück (in diesem Fall, um `vec` einen Wert zuzuweisen).

Dies sieht nach einer seltsam komplizierten Methode zur Fehlerbehandlung aus, aber `Result` und `Option` stellen sicher, dass alle Fehler auf die eine oder andere Weise behandelt werden.

```rust
    if vec.len() != N { return None; }
```

Wenn die Anzahl der Bytes falsch ist, ist das ein Fehler, und wir geben `None` zurück.

```rust
    // try_into verbraucht vec und versucht, [u8; N] zu erstellen
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust hat zwei Array-Typen. [Arrays](https://doc.rust-lang.org/std/primitive.array.html) haben eine feste Größe. [Vektoren](https://doc.rust-lang.org/std/vec/index.html) können wachsen und schrumpfen. `hex::decode` gibt einen Vektor zurück, aber die `eth_stealth_addresses`-Bibliothek möchte Arrays empfangen. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) konvertiert einen Wert in einen anderen Typ, zum Beispiel einen Vektor in ein Array.

```rust
    Some(array)
}
```

Rust verlangt nicht, dass Sie das Schlüsselwort [`return`](https://doc.rust-lang.org/std/keyword.return.html) verwenden, wenn Sie am Ende einer Funktion einen Wert zurückgeben.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Diese Funktion empfängt eine öffentliche Meta-Adresse, die sowohl *V<sub>pub</sub>* als auch *K<sub>pub</sub>* enthält. Sie gibt die Stealth-Adresse, den zu veröffentlichenden Public-Key (*R<sub>pub</sub>*) und einen Ein-Byte-Scanwert zurück, der die Identifizierung beschleunigt, welche veröffentlichten Adressen zu Alice gehören könnten.

Der Scanwert ist Teil des gemeinsamen Geheimnisses (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Dieser Wert steht Alice zur Verfügung, und seine Überprüfung ist viel schneller als die Überprüfung, ob *f(K<sub>pub</sub>+G\*hash(S))* der veröffentlichten Adresse entspricht.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::&lt;66>(stealth_address)?);
```

Wir verwenden die Funktion [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) der Bibliothek.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Bereiten Sie den JSON-codierten Ausgabe-String vor.

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

Diese Funktion verwendet die Funktion [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) der Bibliothek, um den Private-Key zum Abheben von der Adresse (*R<sub>priv</sub>*) zu berechnen. Diese Berechnung erfordert diese Werte:

- Die Adresse (*Adresse=f(P<sub>pub</sub>)*)
- Den von Bill generierten Public-Key (*R<sub>pub</sub>*)
- Den Ansichts-Private-Key (*V<sub>priv</sub>*)
- Den Ausgabe-Private-Key (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) gibt an, dass die Funktion ausgeführt wird, wenn der WASM-Code initialisiert wird.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Dieser Code legt fest, dass die Panic-Ausgabe an die JavaScript-Konsole gesendet wird. Um dies in Aktion zu sehen, verwenden Sie die Anwendung und geben Sie Bill eine ungültige Meta-Adresse (ändern Sie einfach eine hexadezimale Ziffer). Sie werden diesen Fehler in der JavaScript-Konsole sehen:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Gefolgt von einem Stacktrace. Geben Sie Bill dann die gültige Meta-Adresse und geben Sie Alice entweder eine ungültige Adresse oder einen ungültigen Public-Key. Sie werden diesen Fehler sehen:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Wieder gefolgt von einem Stacktrace.

#### Die Benutzeroberfläche {#ui}

Die Benutzeroberfläche ist mit [React](https://react.dev/) geschrieben und wird von [Vite](https://vite.dev/) bereitgestellt. Sie können mehr darüber in [diesem Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) erfahren. Hier besteht kein Bedarf an [WAGMI](https://wagmi.sh/), da wir nicht direkt mit einer Blockchain oder einem Wallet interagieren.

Der einzige nicht offensichtliche Teil der Benutzeroberfläche ist die WASM-Konnektivität. Hier ist, wie sie funktioniert.

**`vite.config.js`**

Diese Datei enthält [die Vite-Konfiguration](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Wir benötigen zwei Vite-Plugins: [react](https://www.npmjs.com/package/@vitejs/plugin-react) und [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Diese Datei ist die Hauptkomponente der Anwendung. Sie ist ein Container, der zwei Komponenten enthält: `Alice` und `Bill`, die Benutzeroberflächen für diese Benutzer. Der relevante Teil für WASM ist der Initialisierungscode.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Wenn wir [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) verwenden, erstellt es zwei Dateien, die wir hier verwenden: eine wasm-Datei mit dem eigentlichen Code (hier `src/rust-wasm/pkg/rust_wasm_bg.wasm`) und eine JavaScript-Datei mit den Definitionen zu deren Verwendung (hier `src/rust_wasm/pkg/rust_wasm.js`). Der Standardexport dieser JavaScript-Datei ist Code, der ausgeführt werden muss, um WASM zu initiieren.

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

Der [`useEffect`-Hook](https://react.dev/reference/react/useEffect) ermöglicht es Ihnen, eine Funktion anzugeben, die ausgeführt wird, wenn sich Zustandsvariablen ändern. Hier ist die Liste der Zustandsvariablen leer (`[]`), sodass diese Funktion nur einmal beim Laden der Seite ausgeführt wird.

Die Effektfunktion muss sofort zurückkehren. Um asynchronen Code zu verwenden, wie z. B. das WASM-`init` (das die `.wasm`-Datei laden muss und daher Zeit in Anspruch nimmt), definieren wir eine interne [`async`](https://en.wikipedia.org/wiki/Async/await)-Funktion und führen sie ohne ein `await` aus.

**`Bill.jsx`**

Dies ist die Benutzeroberfläche für Bill. Sie hat eine einzige Aktion: das Erstellen einer Adresse basierend auf der von Alice bereitgestellten Stealth-Meta-Adresse.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Zusätzlich zum Standardexport exportiert der von `wasm-pack` generierte JavaScript-Code eine Funktion für jede Funktion im WASM-Code.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Um WASM-Funktionen aufzurufen, rufen wir einfach die Funktion auf, die von der durch `wasm-pack` erstellten JavaScript-Datei exportiert wird.

**`Alice.jsx`**

Der Code in `Alice.jsx` ist analog, außer dass Alice zwei Aktionen hat:

- Eine Meta-Adresse generieren
- Den Private-Key für eine von Bill veröffentlichte Adresse abrufen

## Fazit {#conclusion}

Stealth-Adressen sind kein Allheilmittel; sie müssen [korrekt verwendet werden](#go-wrong). Aber wenn sie richtig eingesetzt werden, können sie Privatsphäre auf einer öffentlichen Blockchain ermöglichen.

[Sehen Sie hier für weitere meiner Arbeiten](https://cryptodocguy.pro/).