---
title: "Verwendung von Stealth-Adressen"
description: "Stealth-Adressen ermöglichen es Benutzern, Vermögenswerte anonym zu übertragen. Nach der Lektüre dieses Artikels werden Sie in der Lage sein: zu erklären, was Stealth-Adressen sind und wie sie funktionieren, zu verstehen, wie man Stealth-Adressen so verwendet, dass die Anonymität gewahrt bleibt, und eine webbasierte Anwendung zu schreiben, die Stealth-Adressen verwendet."
author: Ori Pomerantz
tags:
  [
    "Stealth-Adresse",
    "Privatsphäre",
    "Kryptographie",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: de
sidebarDepth: 3
---

Sie sind Bill. Aus Gründen, auf die wir nicht näher eingehen werden, möchten Sie für die Kampagne "Alice für die Königin der Welt" spenden, und Alice soll wissen, dass Sie gespendet haben, damit sie Sie belohnt, wenn sie gewinnt. Leider ist ihr Sieg nicht garantiert. Es gibt eine konkurrierende Kampagne, "Carol für die Kaiserin des Sonnensystems". Wenn Carol gewinnt und herausfindet, dass Sie an Alice gespendet haben, werden Sie in Schwierigkeiten geraten. Sie können also nicht einfach 200 ETH von Ihrem Konto auf das von Alice überweisen.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) hat die Lösung. Dieser ERC erklärt, wie [Stealth-Adressen](https://nerolation.github.io/stealth-utils) für anonyme Übertragungen verwendet werden.

**Warnung**: Die Kryptographie hinter Stealth-Adressen ist, soweit wir wissen, solide. Es gibt jedoch potenzielle Seitenkanalangriffe. [Unten](#go-wrong), werden Sie sehen, was Sie tun können, um dieses Risiko zu verringern.

## Wie Stealth-Adressen funktionieren {#how}

Dieser Artikel wird versuchen, Stealth-Adressen auf zwei Arten zu erklären. Die erste ist, [wie man sie benutzt](#how-use). Dieser Teil ist ausreichend, um den Rest des Artikels zu verstehen. Dann gibt es [eine Erklärung der dahinterstehenden Mathematik](#how-math). Wenn Sie sich für Kryptographie interessieren, lesen Sie auch diesen Teil.

### Die einfache Version (wie man Stealth-Adressen benutzt) {#how-use}

Alice erstellt zwei private Schlüssel und veröffentlicht die entsprechenden öffentlichen Schlüssel (die zu einer einzigen Meta-Adresse doppelter Länge kombiniert werden können). Bill erstellt ebenfalls einen privaten Schlüssel und veröffentlicht den entsprechenden öffentlichen Schlüssel.

Mit dem öffentlichen Schlüssel einer Partei und dem privaten Schlüssel der anderen können Sie ein gemeinsames Geheimnis ableiten, das nur Alice und Bill bekannt ist (es kann nicht allein aus den öffentlichen Schlüsseln abgeleitet werden). Mit diesem gemeinsamen Geheimnis erhält Bill die Stealth-Adresse und kann Vermögenswerte an sie senden.

Alice erhält die Adresse ebenfalls aus dem gemeinsamen Geheimnis, aber da sie die privaten Schlüssel zu den von ihr veröffentlichten öffentlichen Schlüsseln kennt, kann sie auch den privaten Schlüssel erhalten, mit dem sie von dieser Adresse abheben kann.

### Die Mathematik (warum Stealth-Adressen so funktionieren) {#how-math}

Standard-Stealth-Adressen verwenden [Elliptische-Kurven-Kryptographie (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor), um eine bessere Leistung mit weniger Schlüsselbits zu erzielen und gleichzeitig das gleiche Sicherheitsniveau beizubehalten. Aber größtenteils können wir das ignorieren und so tun, als ob wir normale Arithmetik verwenden.

Es gibt eine Zahl, die jeder kennt, _G_. Man kann mit _G_ multiplizieren. Aber aufgrund der Natur von ECC ist es praktisch unmöglich, durch _G_ zu teilen. Die Art und Weise, wie die Public-Key-Kryptographie im Allgemeinen in Ethereum funktioniert, ist, dass Sie einen privaten Schlüssel, _P<sub>priv</sub>_, verwenden können, um Transaktionen zu signieren, die dann durch einen öffentlichen Schlüssel, _P<sub>pub</sub> = GP<sub>priv</sub>_, verifiziert werden.

Alice erstellt zwei private Schlüssel, _K<sub>priv</sub>_ und _V<sub>priv</sub>_. _K<sub>priv</sub>_ wird verwendet, um Geld von der Stealth-Adresse auszugeben, und _V<sub>priv</sub>_, um die Adressen anzuzeigen, die Alice gehören. Alice veröffentlicht dann die öffentlichen Schlüssel: _K<sub>pub</sub> = GK<sub>priv</sub>_ und _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill erstellt einen dritten privaten Schlüssel, _R<sub>priv</sub>_, und veröffentlicht _R<sub>pub</sub> = GR<sub>priv</sub>_ in einem zentralen Register (Bill hätte ihn auch an Alice senden können, aber wir gehen davon aus, dass Carol zuhört).

Bill berechnet _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, von dem er erwartet, dass Alice es ebenfalls kennt (wird unten erklärt). Dieser Wert wird _S_ genannt, das gemeinsame Geheimnis. Dies gibt Bill einen öffentlichen Schlüssel, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. Von diesem öffentlichen Schlüssel aus kann er eine Adresse berechnen und beliebige Ressourcen an sie senden. Wenn Alice in Zukunft gewinnt, kann Bill ihr _R<sub>priv</sub>_ mitteilen, um zu beweisen, dass die Ressourcen von ihm stammen.

Alice berechnet _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Dies gibt ihr das gleiche gemeinsame Geheimnis, _S_. Da sie den privaten Schlüssel _K<sub>priv</sub>_ kennt, kann sie _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_ berechnen. Dieser Schlüssel ermöglicht ihr den Zugriff auf Vermögenswerte in der Adresse, die sich aus _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_ ergibt.

Wir haben einen separaten Ansichtsschlüssel, damit Alice die World Domination Campaign Services von Dave unterbeauftragen kann. Alice ist bereit, Dave die öffentlichen Adressen mitzuteilen und sie zu informieren, wenn mehr Geld verfügbar ist, aber sie möchte nicht, dass er ihr Kampagnengeld ausgibt.

Da für das Anzeigen und Ausgeben separate Schlüssel verwendet werden, kann Alice Dave _V<sub>priv</sub>_ geben. Dann kann Dave _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ berechnen und auf diese Weise die öffentlichen Schlüssel (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_) erhalten. Aber ohne _K<sub>priv</sub>_ kann Dave den privaten Schlüssel nicht erhalten.

Zusammenfassend sind dies die Werte, die den verschiedenen Teilnehmern bekannt sind.

| Alice                                                                     | Veröffentlicht    | Bill                                                                      | Dave                                                                        |                                                 |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                 |
| _K<sub>priv</sub>_                                                        | –                 | –                                                                         | –                                                                           |                                                 |
| _V<sub>priv</sub>_                                                        | –                 | –                                                                         | _V<sub>priv</sub>_                                                          |                                                 |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                 |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                 |
| –                                                                         | –                 | _R<sub>priv</sub>_                                                        | –                                                                           |                                                 |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                 |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | –                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                 |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | –                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                 |
| _Address=f(P<sub>pub</sub>)_                           | –                 | _Address=f(P<sub>pub</sub>)_                           | _Address=f(P<sub>pub</sub>)_                             | _Address=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | –                 | –                                                                         | –                                                                           |                                                 |

## Wenn bei Stealth-Adressen etwas schief geht {#go-wrong}

_Es gibt keine Geheimnisse auf der Blockchain_. Obwohl Stealth-Adressen Ihnen Privatsphäre bieten können, ist diese Privatsphäre anfällig für Verkehrsanalyse. Um ein triviales Beispiel zu nennen: Stellen Sie sich vor, Bill finanziert eine Adresse und sendet sofort eine Transaktion, um einen _R<sub>pub</sub>_-Wert zu veröffentlichen. Ohne Alices _V<sub>priv</sub>_ können wir nicht sicher sein, dass dies eine Stealth-Adresse ist, aber es ist die wahrscheinlichste Annahme. Dann sehen wir eine weitere Transaktion, die alle ETH von dieser Adresse auf die Adresse des Kampagnenfonds von Alice überträgt. Wir können es vielleicht nicht beweisen, aber es ist wahrscheinlich, dass Bill gerade an Alices Kampagne gespendet hat. Carol würde das sicher auch denken.

Es ist einfach für Bill, die Veröffentlichung von _R<sub>pub</sub>_ von der Finanzierung der Stealth-Adresse zu trennen (indem er sie zu verschiedenen Zeiten und von verschiedenen Adressen aus durchführt). Das ist jedoch nicht ausreichend. Das Muster, nach dem Carol sucht, ist, dass Bill eine Adresse finanziert und dann der Kampagnenfonds von Alice von ihr abhebt.

Eine Lösung ist, dass Alices Kampagne das Geld nicht direkt abhebt, sondern es verwendet, um einen Dritten zu bezahlen. Wenn Alices Kampagne 10 ETH an Daves World Domination Campaign Services sendet, weiß Carol nur, dass Bill an einen von Daves Kunden gespendet hat. Wenn Dave genügend Kunden hat, könnte Carol nicht wissen, ob Bill an Alice gespendet hat, die mit ihr konkurriert, oder an Adam, Albert oder Abigail, die Carol egal sind. Alice kann der Zahlung einen gehashten Wert beifügen und Dave dann das Urbild zur Verfügung stellen, um zu beweisen, dass es ihre Spende war. Alternativ, wie oben erwähnt, wenn Alice Dave ihr _V<sub>priv</sub>_ gibt, weiß er bereits, von wem die Zahlung kam.

Das Hauptproblem bei dieser Lösung ist, dass Alice sich um die Geheimhaltung kümmern muss, wenn diese Geheimhaltung Bill zugutekommt. Alice möchte vielleicht ihren Ruf wahren, damit auch Bills Freund Bob an sie spendet. Aber es ist auch möglich, dass es ihr nichts ausmachen würde, Bill zu entlarven, denn dann hätte er Angst davor, was passieren wird, wenn Carol gewinnt. Bill könnte Alice am Ende sogar noch mehr Unterstützung gewähren.

### Verwendung mehrerer Stealth-Ebenen {#multi-layer}

Anstatt sich darauf zu verlassen, dass Alice Bills Privatsphäre schützt, kann Bill dies selbst tun. Er kann mehrere Meta-Adressen für fiktive Personen, Bob und Bella, generieren. Bill sendet dann ETH an Bob, und "Bob" (der eigentlich Bill ist) sendet sie an Bella. "Bella" (ebenfalls Bill) sendet es an Alice.

Carol kann immer noch eine Verkehrsanalyse durchführen und die Pipeline von Bill zu Bob zu Bella zu Alice sehen. Wenn "Bob" und "Bella" ETH jedoch auch für andere Zwecke verwenden, wird es nicht so aussehen, als hätte Bill etwas an Alice überwiesen, selbst wenn Alice sofort von der Stealth-Adresse auf ihre bekannte Kampagnenadresse abhebt.

## Schreiben einer Stealth-Adressen-Anwendung {#write-app}

Dieser Artikel erklärt eine Stealth-Adressen-Anwendung, die [auf GitHub verfügbar ist](https://github.com/qbzzt/251022-stealth-addresses.git).

### Werkzeuge {#tools}

Es gibt [eine TypeScript Stealth-Adressen-Bibliothek](https://github.com/ScopeLift/stealth-address-sdk), die wir verwenden könnten. Kryptographische Operationen können jedoch CPU-intensiv sein. Ich bevorzuge es, sie in einer kompilierten Sprache wie [Rust](https://rust-lang.org/) zu implementieren und [WASM](https://webassembly.org/) zu verwenden, um den Code im Browser auszuführen.

Wir werden [Vite](https://vite.dev/) und [React](https://react.dev/) verwenden. Dies sind branchenübliche Werkzeuge; wenn Sie mit ihnen nicht vertraut sind, können Sie [dieses Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) verwenden. Um Vite zu verwenden, benötigen wir Node.

### Stealth-Adressen in Aktion sehen {#in-action}

1. Installieren Sie die notwendigen Werkzeuge: [Rust](https://rust-lang.org/tools/install/) und [Node](https://nodejs.org/en/download).

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

5. Rufen Sie [die Anwendung](http://localhost:5173/) auf. Diese Anwendungsseite hat zwei Frames: einen für Alices Benutzeroberfläche und den anderen für die von Bill. Die beiden Frames kommunizieren nicht; sie befinden sich nur aus praktischen Gründen auf derselben Seite.

6. Klicken Sie als Alice auf **Eine Stealth-Meta-Adresse generieren**. Dadurch werden die neue Stealth-Adresse und die entsprechenden privaten Schlüssel angezeigt. Kopieren Sie die Stealth-Meta-Adresse in die Zwischenablage.

7. Fügen Sie als Bill die neue Stealth-Meta-Adresse ein und klicken Sie auf **Eine Adresse generieren**. Dies gibt Ihnen die Adresse, die Sie für Alice finanzieren sollen.

8. Kopieren Sie die Adresse und Bills öffentlichen Schlüssel und fügen Sie sie in den Bereich "Privater Schlüssel für von Bill generierte Adresse" in Alices Benutzeroberfläche ein. Sobald diese Felder ausgefüllt sind, sehen Sie den privaten Schlüssel für den Zugriff auf Vermögenswerte unter dieser Adresse.

9. Sie können [einen Online-Rechner](https://iancoleman.net/ethereum-private-key-to-address/) verwenden, um sicherzustellen, dass der private Schlüssel mit der Adresse übereinstimmt.

### Wie das Programm funktioniert {#how-the-program-works}

#### Die WASM-Komponente {#wasm}

Der Quellcode, der zu WASM kompiliert wird, ist in [Rust](https://rust-lang.org/) geschrieben. Sie können es in [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) sehen. Dieser Code ist in erster Linie eine Schnittstelle zwischen dem JavaScript-Code und [der `eth-stealth-addresses`-Bibliothek](https://github.com/kassandraoftroy/eth-stealth-addresses).

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

Das [`getrandom`](https://docs.rs/getrandom/latest/getrandom/)-Paket muss Zufallswerte generieren. Dies kann nicht durch rein algorithmische Mittel geschehen; es erfordert den Zugriff auf einen physikalischen Prozess als Quelle der Entropie. Diese Definition legt fest, dass wir diese Entropie erhalten, indem wir den Browser abfragen, in dem wir laufen.

```toml
console_error_panic_hook = "0.1.7"
```

[Diese Bibliothek](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) gibt uns aussagekräftigere Fehlermeldungen, wenn der WASM-Code in Panik gerät und nicht fortfahren kann.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Der Ausgabetyp, der zur Erzeugung von WASM-Code erforderlich ist.

**`lib.rs`**

Das ist der eigentliche Rust-Code.

```rust
use wasm_bindgen::prelude::*;
```

Die Definitionen zum Erstellen eines WASM-Pakets aus Rust. Sie sind [hier](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) dokumentiert.

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

Rust verwendet normalerweise Byte-[Arrays](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) für Werte. Aber in JavaScript verwenden wir normalerweise hexadezimale Zeichenketten. [Die `hex`-Bibliothek](https://docs.rs/hex/latest/hex/) übersetzt für uns von einer Darstellung in die andere.

```rust
#[wasm_bindgen]
```

Generieren Sie WASM-Bindungen, um diese Funktion von JavaScript aus aufrufen zu können.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Der einfachste Weg, ein Objekt mit mehreren Feldern zurückzugeben, ist die Rückgabe einer JSON-Zeichenkette.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

Die [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) gibt drei Felder zurück:

- Die Meta-Adresse (_K<sub>pub</sub>_ und _V<sub>pub</sub>_)
- Der private Ansichtsschlüssel (_V<sub>priv</sub>_)
- Der private Ausgabenschlüssel (_K<sub>priv</sub>_)

Die [Tupel](https://doc.rust-lang.org/std/primitive.tuple.html)-Syntax lässt uns diese Werte wieder trennen.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Verwenden Sie das [`format!`](https://doc.rust-lang.org/std/fmt/index.html)-Makro, um die JSON-kodierte Zeichenkette zu generieren. Verwenden Sie [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html), um die Arrays in Hex-Strings zu ändern.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Diese Funktion wandelt eine Hex-Zeichenkette (von JavaScript bereitgestellt) in ein Byte-Array um. Wir verwenden sie, um Werte zu parsen, die vom JavaScript-Code bereitgestellt werden. Diese Funktion ist kompliziert, weil Rust mit Arrays und Vektoren umgeht.

Der Ausdruck `<const N: usize>` wird als [Generic](https://doc.rust-lang.org/book/ch10-01-syntax.html) bezeichnet. `N` ist ein Parameter, der die Länge des zurückgegebenen Arrays steuert. Die Funktion wird eigentlich `str_to_array::<n>` genannt, wobei `n` die Array-Länge ist.

Der Rückgabewert ist `Option<[u8; N]>`, was bedeutet, dass das zurückgegebene Array [optional](https://doc.rust-lang.org/std/option/) ist. Dies ist ein typisches Muster in Rust für Funktionen, die fehlschlagen können.

Wenn wir zum Beispiel `str_to_array::10("bad060a7")` aufrufen, soll die Funktion ein Array mit zehn Werten zurückgeben, aber die Eingabe besteht nur aus vier Bytes. Die Funktion muss fehlschlagen, und das tut sie, indem sie `None` zurückgibt. Der Rückgabewert für `str_to_array::4("bad060a7")` wäre `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Die [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html)-Funktion gibt ein `Result<Vec<u8>, FromHexError>` zurück. Der Typ [`Result`](https://doc.rust-lang.org/std/result/) kann entweder ein erfolgreiches Ergebnis (`Ok(value)`) oder einen Fehler (`Err(error)`) enthalten.

Die `.ok()`-Methode wandelt das `Result` in eine `Option` um, deren Wert entweder der `Ok()`-Wert ist, wenn erfolgreich, oder `None`, wenn nicht. Schließlich bricht der [Fragezeichen-Operator](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) die aktuelle Funktion ab und gibt ein `None` zurück, wenn die `Option` leer ist. Andernfalls entpackt er den Wert und gibt diesen zurück (in diesem Fall, um `vec` einen Wert zuzuweisen).

Dies sieht nach einer seltsam verschlungenen Methode zur Fehlerbehandlung aus, aber `Result` und `Option` stellen sicher, dass alle Fehler auf die eine oder andere Weise behandelt werden.

```rust
    if vec.len() != N { return None; }
```

Wenn die Anzahl der Bytes falsch ist, ist das ein Fehler, und wir geben `None` zurück.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust hat zwei Array-Typen. [Arrays](https://doc.rust-lang.org/std/primitive.array.html) haben eine feste Größe. [Vektoren](https://doc.rust-lang.org/std/vec/index.html) können wachsen und schrumpfen. `hex::decode` gibt einen Vektor zurück, aber die `eth_stealth_addresses`-Bibliothek möchte Arrays empfangen. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) konvertiert einen Wert in einen anderen Typ, zum Beispiel einen Vektor in ein Array.

```rust
    Some(array)
}
```

Rust erfordert nicht, dass Sie das Schlüsselwort [`return`](https://doc.rust-lang.org/std/keyword.return.html) verwenden, wenn Sie am Ende einer Funktion einen Wert zurückgeben.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Diese Funktion empfängt eine öffentliche Meta-Adresse, die sowohl _V<sub>pub</sub>_ als auch _K<sub>pub</sub>_ enthält. Sie gibt die Stealth-Adresse, den zu veröffentlichenden öffentlichen Schlüssel (_R<sub>pub</sub>_) und einen Ein-Byte-Scan-Wert zurück, der die Identifizierung beschleunigt, welche veröffentlichten Adressen Alice gehören könnten.

Der Scan-Wert ist Teil des gemeinsamen Geheimnisses (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Dieser Wert steht Alice zur Verfügung, und seine Überprüfung ist viel schneller als die Überprüfung, ob _f(K<sub>pub</sub>+G\*hash(S))_ mit der veröffentlichten Adresse übereinstimmt.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Wir verwenden [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) der Bibliothek.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Bereiten Sie die JSON-kodierte Ausgabezeichenkette vor.

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

Diese Funktion verwendet die [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html)-Funktion der Bibliothek, um den privaten Schlüssel zum Abheben von der Adresse (_R<sub>priv</sub>_) zu berechnen. Diese Berechnung erfordert diese Werte:

- Die Adresse (_Address=f(P<sub>pub</sub>)_)
- Der von Bill generierte öffentliche Schlüssel (_R<sub>pub</sub>_)
- Der private Ansichtsschlüssel (_V<sub>priv</sub>_)
- Der private Ausgabenschlüssel (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) legt fest, dass die Funktion ausgeführt wird, wenn der WASM-Code initialisiert wird.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Dieser Code legt fest, dass die Panikausgabe an die JavaScript-Konsole gesendet wird. Um es in Aktion zu sehen, verwenden Sie die Anwendung und geben Sie Bill eine ungültige Meta-Adresse (ändern Sie einfach eine hexadezimale Ziffer). Sie werden diesen Fehler in der JavaScript-Konsole sehen:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Gefolgt von einem Stack-Trace. Geben Sie Bill dann die gültige Meta-Adresse und Alice entweder eine ungültige Adresse oder einen ungültigen öffentlichen Schlüssel. Sie werden diesen Fehler sehen:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Wiederum gefolgt von einem Stack-Trace.

#### Die Benutzeroberfläche {#ui}

Die Benutzeroberfläche ist mit [React](https://react.dev/) geschrieben und wird von [Vite](https://vite.dev/) bereitgestellt. Sie können sich mit [diesem Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) darüber informieren. Es besteht hier keine Notwendigkeit für [WAGMI](https://wagmi.sh/), da wir nicht direkt mit einer Blockchain oder einer Wallet interagieren.

Der einzige nicht offensichtliche Teil der Benutzeroberfläche ist die WASM-Konnektivität. So funktioniert es.

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

Diese Datei ist die Hauptkomponente der Anwendung. Es ist ein Container, der zwei Komponenten enthält: `Alice` und `Bill`, die Benutzeroberflächen für diese Benutzer. Der für WASM relevante Teil ist der Initialisierungscode.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Wenn wir [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) verwenden, erstellt es zwei Dateien, die wir hier verwenden: eine wasm-Datei mit dem eigentlichen Code (hier `src/rust-wasm/pkg/rust_wasm_bg.wasm`) und eine JavaScript-Datei mit den Definitionen zur Verwendung (hier `src/rust_wasm/pkg/rust_wasm.js`). Der Standardexport dieser JavaScript-Datei ist Code, der zur Initiierung von WASM ausgeführt werden muss.

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

Der [`useEffect`-Hook](https://react.dev/reference/react/useEffect) ermöglicht es Ihnen, eine Funktion anzugeben, die ausgeführt wird, wenn sich Zustandsvariablen ändern. Hier ist die Liste der Zustandsvariablen leer (`[]`), sodass diese Funktion nur einmal ausgeführt wird, wenn die Seite geladen wird.

Die Effektfunktion muss sofort zurückkehren. Um asynchronen Code wie das WASM-`init` zu verwenden (das die `.wasm`-Datei laden muss und daher Zeit benötigt), definieren wir eine interne [`async`](https://en.wikipedia.org/wiki/Async/await)-Funktion und führen sie ohne `await` aus.

**`Bill.jsx`**

Dies ist die Benutzeroberfläche für Bill. Es hat eine einzige Aktion, das Erstellen einer Adresse basierend auf der von Alice bereitgestellten Stealth-Meta-Adresse.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Zusätzlich zum Standardexport exportiert der von `wasm-pack` generierte JavaScript-Code eine Funktion für jede Funktion im WASM-Code.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Um WASM-Funktionen aufzurufen, rufen wir einfach die Funktion auf, die von der von `wasm-pack` erstellten JavaScript-Datei exportiert wird.

**`Alice.jsx`**

Der Code in `Alice.jsx` ist analog, außer dass Alice zwei Aktionen hat:

- Eine Meta-Adresse generieren
- Den privaten Schlüssel für eine von Bill veröffentlichte Adresse erhalten

## Fazit {#conclusion}

Stealth-Adressen sind kein Allheilmittel; sie müssen [korrekt verwendet](#go-wrong) werden. Aber wenn sie richtig verwendet werden, können sie die Privatsphäre auf einer öffentlichen Blockchain ermöglichen.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).