---
title: "Schreiben Sie ein App-spezifisches Plasma, das die Privatsphäre wahrt"
description: "In diesem Tutorial bauen wir eine halbgeheime Bank für Einlagen. Die Bank ist eine zentralisierte Komponente; sie kennt das Guthaben jedes Benutzers. Diese Informationen werden jedoch nicht onchain gespeichert. Stattdessen veröffentlicht die Bank einen Hash des Zustands. Jedes Mal, wenn eine Transaktion stattfindet, veröffentlicht die Bank den neuen Hash, zusammen mit einem Zero-Knowledge-Proof, dass sie eine signierte Transaktion hat, die den Hash-Zustand in den neuen ändert. Nach der Lektüre dieses Tutorials werden Sie nicht nur verstehen, wie man Zero-Knowledge-Proofs verwendet, sondern auch, warum man sie verwendet und wie man dies sicher tut."
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
tags:
  [
    "Zero-Knowledge",
    "Server",
    "Off-Chain",
    "Privatsphäre"
  ]
skill: advanced
lang: de
published: 2025-10-15
---

## Einführung {#introduction}

Im Gegensatz zu [Rollups](/developers/docs/scaling/zk-rollups/) nutzen [Plasmas](/developers/docs/scaling/plasma) das Ethereum-Mainnet für die Integrität, aber nicht für die Verfügbarkeit. In diesem Artikel schreiben wir eine Anwendung, die sich wie ein Plasma verhält, wobei Ethereum die Integrität (keine unbefugten Änderungen), aber nicht die Verfügbarkeit (eine zentralisierte Komponente kann ausfallen und das gesamte System lahmlegen) garantiert.

Die Anwendung, die wir hier schreiben, ist eine Bank, die die Privatsphäre wahrt. Verschiedene Adressen haben Konten mit Guthaben, und sie können Geld (ETH) an andere Konten senden. Die Bank veröffentlicht Hashes des Zustands (Konten und deren Guthaben) und Transaktionen, hält aber die tatsächlichen Guthaben offchain, wo sie privat bleiben können.

## Design {#design}

Dies ist kein produktionsreifes System, sondern ein Lehrmittel. Als solches ist es mit mehreren vereinfachenden Annahmen geschrieben.

- Fester Konten-Pool. Es gibt eine bestimmte Anzahl von Konten, und jedes Konto gehört zu einer vorbestimmten Adresse. Dies sorgt für ein viel einfacheres System, da es schwierig ist, Datenstrukturen variabler Größe in Zero-Knowledge-Proofs zu handhaben. Für ein produktionsreifes System können wir die [Merkle-Root](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) als Zustands-Hash verwenden und Merkle-Proofs für die erforderlichen Guthaben bereitstellen.

- Arbeitsspeicher. Auf einem Produktionssystem müssen wir alle Kontoguthaben auf die Festplatte schreiben, um sie im Falle eines Neustarts zu erhalten. Hier ist es in Ordnung, wenn die Informationen einfach verloren gehen.

- Nur Überweisungen. Ein Produktionssystem würde eine Möglichkeit erfordern, Vermögenswerte bei der Bank einzuzahlen und abzuheben. Aber der Zweck hier ist nur, das Konzept zu veranschaulichen, daher ist diese Bank auf Überweisungen beschränkt.

### Zero-Knowledge-Proofs {#zero-knowledge-proofs}

Auf einer fundamentalen Ebene zeigt ein Zero-Knowledge-Proof, dass der Beweisführer einige Daten, _Daten<sub>privat</sub>_, kennt, sodass eine Beziehung _Beziehung_ zwischen einigen öffentlichen Daten, _Daten<sub>öffentlich</sub>_, und _Daten<sub>privat</sub>_ besteht. Der Verifizierer kennt _Beziehung_ und _Daten<sub>öffentlich</sub>_.

Um die Privatsphäre zu wahren, müssen die Zustände und die Transaktionen privat sein. Aber um die Integrität zu gewährleisten, muss der [kryptographische Hash](https://de.wikipedia.org/wiki/Kryptographische_Hashfunktion) der Zustände öffentlich sein. Um den Leuten, die Transaktionen einreichen, zu beweisen, dass diese Transaktionen wirklich stattgefunden haben, müssen wir auch Transaktions-Hashes veröffentlichen.

In den meisten Fällen sind _Daten<sub>privat</sub>_ die Eingabe für das Zero-Knowledge-Proof-Programm und _Daten<sub>öffentlich</sub>_ die Ausgabe.

Diese Felder in _Daten<sub>privat</sub>_:

- _Zustand<sub>n</sub>_, der alte Zustand
- _Zustand<sub>n+1</sub>_, der neue Zustand
- _Transaktion_, eine Transaktion, die den alten Zustand in den neuen ändert. Diese Transaktion muss diese Felder enthalten:
  - _Zieladresse_, die die Überweisung empfängt
  - _Betrag_, der überwiesen wird
  - _Nonce_, um sicherzustellen, dass jede Transaktion nur einmal verarbeitet werden kann.
    Die Quelladresse muss nicht in der Transaktion enthalten sein, da sie aus der Signatur wiederhergestellt werden kann.
- _Signatur_, eine Signatur, die zur Durchführung der Transaktion berechtigt ist. In unserem Fall ist die einzige Adresse, die zur Durchführung einer Transaktion berechtigt ist, die Quelladresse. Da unser Zero-Knowledge-System so funktioniert, wie es funktioniert, benötigen wir zusätzlich zur Ethereum-Signatur auch den öffentlichen Schlüssel des Kontos.

Dies sind die Felder in _Daten<sub>öffentlich</sub>_:

- _Hash(Zustand<sub>n</sub>)_, der Hash des alten Zustands
- _Hash(Zustand<sub>n+1</sub>)_, der Hash des neuen Zustands
- _Hash(Transaktion)_, der Hash der Transaktion, der den Zustand von _Zustand<sub>n</sub>_ zu _Zustand<sub>n+1</sub>_ ändert.

Die Beziehung überprüft mehrere Bedingungen:

- Die öffentlichen Hashes sind tatsächlich die korrekten Hashes für die privaten Felder.
- Die Transaktion, angewendet auf den alten Zustand, ergibt den neuen Zustand.
- Die Signatur stammt von der Quelladresse der Transaktion.

Aufgrund der Eigenschaften von kryptographischen Hash-Funktionen ist der Beweis dieser Bedingungen ausreichend, um die Integrität zu gewährleisten.

### Datenstrukturen {#data-structures}

Die primäre Datenstruktur ist der Zustand, der vom Server gehalten wird. Für jedes Konto verfolgt der Server das Kontoguthaben und eine [Nonce](https://de.wikipedia.org/wiki/Nonce), die verwendet wird, um [Replay-Angriffe](https://de.wikipedia.org/wiki/Replay-Angriff) zu verhindern.

### Komponenten {#components}

Dieses System erfordert zwei Komponenten:

- Der _Server_, der Transaktionen empfängt, verarbeitet und Hashes zusammen mit den Zero-Knowledge-Proofs in der Chain postet.
- Ein _Smart Contract_, der die Hashes speichert und die Zero-Knowledge-Proofs verifiziert, um sicherzustellen, dass die Zustandsübergänge legitim sind.

### Daten- und Kontrollfluss {#flows}

Dies sind die Wege, auf denen die verschiedenen Komponenten kommunizieren, um von einem Konto auf ein anderes zu überweisen.

1. Ein Webbrowser übermittelt eine signierte Transaktion, die eine Überweisung vom Konto des Unterzeichners auf ein anderes Konto anfordert.

2. Der Server überprüft, ob die Transaktion gültig ist:

   - Der Unterzeichner hat ein Konto bei der Bank mit ausreichendem Guthaben.
   - Der Empfänger hat ein Konto bei der Bank.

3. Der Server berechnet den neuen Zustand, indem er den überwiesenen Betrag vom Guthaben des Unterzeichners abzieht und zum Guthaben des Empfängers addiert.

4. Der Server berechnet einen Zero-Knowledge-Proof, dass die Zustandsänderung gültig ist.

5. Der Server übermittelt eine Transaktion an Ethereum, die Folgendes enthält:

   - Der neue Zustands-Hash
   - Der Transaktions-Hash (damit der Absender der Transaktion weiß, dass sie verarbeitet wurde)
   - Der Zero-Knowledge-Proof, der beweist, dass der Übergang zum neuen Zustand gültig ist

6. Der Smart Contract verifiziert den Zero-Knowledge-Proof.

7. Wenn der Zero-Knowledge-Proof erfolgreich ist, führt der Smart Contract die folgenden Aktionen aus:
   - Aktualisieren des aktuellen Zustands-Hashes auf den neuen Zustands-Hash
   - Ausgabe eines Log-Eintrags mit dem neuen Zustands-Hash und dem Transaktions-Hash

### Werkzeuge {#tools}

Für den clientseitigen Code werden wir [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) und [Wagmi](https://wagmi.sh/) verwenden. Dies sind branchenübliche Werkzeuge; wenn Sie mit ihnen nicht vertraut sind, können Sie [dieses Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) verwenden.

Der Großteil des Servers ist in JavaScript mit [Node](https://nodejs.org/en) geschrieben. Der Zero-Knowledge-Teil ist in [Noir](https://noir-lang.org/) geschrieben. Wir benötigen die Version `1.0.0-beta.10`, also führen Sie nach der [Installation von Noir gemäß den Anweisungen](https://noir-lang.org/docs/getting_started/quick_start) Folgendes aus:

```
noirup -v 1.0.0-beta.10
```

Die Blockchain, die wir verwenden, ist `anvil`, eine lokale Test-Blockchain, die Teil von [Foundry](https://getfoundry.sh/introduction/installation) ist.

## Implementierung {#implementation}

Da es sich um ein komplexes System handelt, werden wir es in Etappen implementieren.

### Stufe 1 – Manuelles Zero-Knowledge {#stage-1}

Für die erste Stufe signieren wir eine Transaktion im Browser und geben dann die Informationen manuell an den Zero-Knowledge-Proof weiter. Der Zero-Knowledge-Code erwartet diese Informationen in `server/noir/Prover.toml` (dokumentiert [hier](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

So sehen Sie es in Aktion:

1. Stellen Sie sicher, dass Sie [Node](https://nodejs.org/en/download) und [Noir](https://noir-lang.org/install) installiert haben. Installieren Sie sie vorzugsweise auf einem UNIX-System wie macOS, Linux oder [WSL](https://learn.microsoft.com/de-de/windows/wsl/install).

2. Laden Sie den Code für Stufe 1 herunter und starten Sie den Webserver, um den Client-Code bereitzustellen.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Der Grund, warum Sie hier einen Webserver benötigen, ist, dass viele Wallets (wie MetaMask) zur Verhinderung bestimmter Betrugsarten keine Dateien akzeptieren, die direkt von der Festplatte bereitgestellt werden.

3. Öffnen Sie einen Browser mit einer Wallet.

4. Geben Sie in der Wallet eine neue Passphrase ein. Beachten Sie, dass dies Ihre bestehende Passphrase löscht, also _stellen Sie sicher, dass Sie ein Backup haben_.

   Die Passphrase lautet `test test test test test test test test test test test junk`, die Standard-Test-Passphrase für Anvil.

5. Navigieren Sie zum [clientseitigen Code](http://localhost:5173/).

6. Verbinden Sie sich mit der Wallet und wählen Sie Ihr Zielkonto und den Betrag aus.

7. Klicken Sie auf **Sign** und signieren Sie die Transaktion.

8. Unter der Überschrift **Prover.toml** finden Sie einen Text. Ersetzen Sie `server/noir/Prover.toml` durch diesen Text.

9. Führen Sie den Zero-Knowledge-Proof aus.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Die Ausgabe sollte ähnlich sein wie

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Vergleichen Sie die letzten beiden Werte mit dem Hash, den Sie im Webbrowser sehen, um zu prüfen, ob die Nachricht korrekt gehasht wurde.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) zeigt das von Noir erwartete Informationsformat.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Die Nachricht ist im Textformat, was es für den Benutzer leicht verständlich macht (was beim Signieren notwendig ist) und für den Noir-Code leicht zu parsen ist. Der Betrag wird in Finneys angegeben, um einerseits Teilüberweisungen zu ermöglichen und andererseits leicht lesbar zu sein. Die letzte Zahl ist die [Nonce](https://de.wikipedia.org/wiki/Nonce).

Die Zeichenkette ist 100 Zeichen lang. Zero-Knowledge-Proofs können nicht gut mit Daten variabler Größe umgehen, daher ist es oft notwendig, Daten aufzufüllen.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Diese drei Parameter sind Byte-Arrays fester Größe.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Dies ist die Art, ein Array von Strukturen zu spezifizieren. Für jeden Eintrag geben wir die Adresse, das Guthaben (in milliETH, auch bekannt als [Finney](https://cryptovalleyjournal.com/glossary/finney/)) und den nächsten Nonce-Wert an.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementiert die clientseitige Verarbeitung und generiert die `server/noir/Prover.toml`-Datei (diejenige, die die Zero-Knowledge-Parameter enthält).

Hier ist die Erklärung der interessanteren Teile.

```tsx
export default attrs =>  {
```

Diese Funktion erstellt die `Transfer`-React-Komponente, die andere Dateien importieren können.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Dies sind die Kontoadressen, die durch die Passphrase `test ...` erstellt werden. test junk` Passphrase. Wenn Sie Ihre eigenen Adressen verwenden möchten, ändern Sie einfach diese Definition.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Diese [Wagmi-Hooks](https://wagmi.sh/react/api/hooks) ermöglichen uns den Zugriff auf die [viem](https://viem.sh/)-Bibliothek und die Wallet.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Dies ist die mit Leerzeichen aufgefüllte Nachricht. Jedes Mal, wenn sich eine der `useState`-Variablen (https://react.dev/reference/react/useState) ändert, wird die Komponente neu gezeichnet und die `message` wird aktualisiert.

```tsx
  const sign = async () => {
```

Diese Funktion wird aufgerufen, wenn der Benutzer auf die Schaltfläche **Sign** klickt. Die Nachricht wird automatisch aktualisiert, aber die Signatur erfordert die Genehmigung des Benutzers in der Wallet, und wir möchten nicht danach fragen, es sei denn, es ist notwendig.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Bitten Sie die Wallet, [die Nachricht zu signieren](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Holen Sie sich den Nachrichten-Hash. Es ist hilfreich, ihn dem Benutzer für das Debugging (des Noir-Codes) zur Verfügung zu stellen.

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Holen Sie sich den öffentlichen Schlüssel](https://viem.sh/docs/utilities/recoverPublicKey). Dies ist für die [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir)-Funktion erforderlich.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Setzen Sie die Zustandvariablen. Dadurch wird die Komponente neu gezeichnet (nachdem die `sign`-Funktion beendet ist) und dem Benutzer die aktualisierten Werte angezeigt.

```tsx
    let proverToml = `
```

Der Text für `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem stellt uns den öffentlichen Schlüssel als 65-Byte-Hexadezimalzeichenkette zur Verfügung. Das erste Byte ist `0x04`, ein Versionsmarker. Darauf folgen 32 Bytes für das `x` des öffentlichen Schlüssels und dann 32 Bytes für das `y` des öffentlichen Schlüssels.

Noir erwartet jedoch, diese Informationen als zwei Byte-Arrays zu erhalten, eines für `x` und eines für `y`. Es ist einfacher, dies hier auf dem Client zu parsen als als Teil des Zero-Knowledge-Proofs.

Beachten Sie, dass dies im Allgemeinen eine gute Praxis bei Zero-Knowledge ist. Code innerhalb eines Zero-Knowledge-Proofs ist teuer, daher sollte jede Verarbeitung, die außerhalb des Zero-Knowledge-Proofs durchgeführt werden kann, auch außerhalb des Zero-Knowledge-Proofs durchgeführt werden.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Die Signatur wird ebenfalls als eine 65-Byte lange Hexadezimal-Zeichenkette bereitgestellt. Das letzte Byte ist jedoch nur notwendig, um den öffentlichen Schlüssel wiederherzustellen. Da der öffentliche Schlüssel bereits dem Noir-Code zur Verfügung gestellt wird, benötigen wir ihn nicht zur Überprüfung der Signatur, und der Noir-Code erfordert ihn nicht.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Stellen Sie die Konten bereit.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Dies ist das HTML (genauer gesagt, [JSX](https://react.dev/learn/writing-markup-with-jsx)) Format der Komponente.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) ist der eigentliche Zero-Knowledge-Code.

```
use std::hash::pedersen_hash;
```

[Pedersen-Hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) wird mit der [Noir-Standardbibliothek](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) bereitgestellt. Zero-Knowledge-Proofs verwenden häufig diese Hash-Funktion. Es ist viel einfacher, sie in [arithmetischen Schaltungen](https://rareskills.io/post/arithmetic-circuit) im Vergleich zu den Standard-Hash-Funktionen zu berechnen.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Diese beiden Funktionen sind externe Bibliotheken, die in [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) definiert sind. Sie sind genau das, wofür sie benannt sind: eine Funktion, die den [Keccak256-Hash](https://emn178.github.io/online-tools/keccak_256.html) berechnet, und eine Funktion, die Ethereum-Signaturen verifiziert und die Ethereum-Adresse des Unterzeichners wiederherstellt.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir ist von [Rust](https://www.rust-lang.org/) inspiriert. Variablen sind standardmäßig Konstanten. Auf diese Weise definieren wir globale Konfigurationskonstanten. Insbesondere ist `ACCOUNT_NUMBER` die Anzahl der Konten, die wir speichern.

Datentypen mit dem Namen `u<Zahl>` sind diese Anzahl von Bits, ohne Vorzeichen. Die einzigen unterstützten Typen sind `u8`, `u16`, `u32`, `u64` und `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Diese Variable wird für den Pedersen-Hash der Konten verwendet, wie unten erklärt.

```
global MESSAGE_LENGTH : u32 = 100;
```

Wie oben erklärt, ist die Nachrichtenlänge fest. Sie wird hier angegeben.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191-Signaturen](https://eips.ethereum.org/EIPS/eip-191) erfordern einen Puffer mit einem 26-Byte-Präfix, gefolgt von der Nachrichtenlänge in ASCII und schließlich der Nachricht selbst.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Die Informationen, die wir über ein Konto speichern. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ist eine Zahl, typischerweise bis zu 253 Bits, die direkt in der [arithmetischen Schaltung](https://rareskills.io/post/arithmetic-circuit) verwendet werden kann, die den Zero-Knowledge-Proof implementiert. Hier verwenden wir das `Field`, um eine 160-Bit-Ethereum-Adresse zu speichern.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Die Informationen, die wir für eine Überweisungstransaktion speichern.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Eine Funktionsdefinition. Der Parameter ist eine `Account`-Information. Das Ergebnis ist ein Array von `Field`-Variablen, dessen Länge `FLAT_ACCOUNT_FIELDS` ist.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Der erste Wert im Array ist die Kontoadresse. Der zweite Wert enthält sowohl das Guthaben als auch die Nonce. Die `.into()`-Aufrufe ändern eine Zahl in den Datentyp, den sie haben muss. `account.nonce` ist ein `u32`-Wert, aber um ihn zu `account.balance « 32`, einem `u128`-Wert, hinzuzufügen, muss er ein `u128` sein. Das ist das erste `.into()`. Der zweite wandelt das `u128`-Ergebnis in ein `Field` um, damit es in das Array passt.

```
    flat
}
```

In Noir können Funktionen nur am Ende einen Wert zurückgeben (es gibt keine vorzeitige Rückgabe). Um den Rückgabewert anzugeben, werten Sie ihn kurz vor der schließenden Klammer der Funktion aus.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Diese Funktion wandelt das Konten-Array in ein `Field`-Array um, das als Eingabe für einen Pedersen-Hash verwendet werden kann.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

So geben Sie eine veränderliche Variable an, d. h. _keine_ Konstante. Variablen in Noir müssen immer einen Wert haben, also initialisieren wir diese Variable mit Nullen.

```
    for i in 0..ACCOUNT_NUMBER {
```

Dies ist eine `for`-Schleife. Beachten Sie, dass die Grenzen Konstanten sind. Noir-Schleifen müssen ihre Grenzen zur Kompilierzeit kennen. Der Grund dafür ist, dass arithmetische Schaltungen keine Flusskontrolle unterstützen. Bei der Verarbeitung einer `for`-Schleife fügt der Compiler den Code einfach mehrmals ein, einmal für jede Iteration.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Schließlich sind wir bei der Funktion angelangt, die das Konten-Array hasht.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Diese Funktion findet das Konto mit einer bestimmten Adresse. Diese Funktion wäre in Standardcode furchtbar ineffizient, da sie über alle Konten iteriert, auch nachdem sie die Adresse gefunden hat.

Bei Zero-Knowledge-Proofs gibt es jedoch keine Flusskontrolle. Wenn wir jemals eine Bedingung prüfen müssen, müssen wir sie jedes Mal prüfen.

Etwas Ähnliches geschieht mit `if`-Anweisungen. Die `if`-Anweisung in der obigen Schleife wird in diese mathematischen Aussagen übersetzt.

_bedingung<sub>ergebnis</sub> = accounts[i].address == address_ // eins, wenn sie gleich sind, sonst null

_konto<sub>neu</sub> = bedingung<sub>ergebnis</sub>\*i + (1-bedingung<sub>ergebnis</sub>)\*konto<sub>alt</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} hat kein Konto");

    account
}
```

Die [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert)-Funktion führt zum Absturz des Zero-Knowledge-Proofs, wenn die Behauptung falsch ist. In diesem Fall, wenn wir kein Konto mit der relevanten Adresse finden können. Um die Adresse zu melden, verwenden wir einen [Format-String](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Diese Funktion wendet eine Überweisungstransaktion an und gibt das neue Kontenarray zurück.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Wir können in Noir nicht auf Strukturelemente innerhalb eines Format-Strings zugreifen, also erstellen wir eine nutzbare Kopie.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} hat keine {txnAmount} Finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaktion hat Nonce {txnNonce}, aber das Konto wird voraussichtlich {accountNonce} verwenden");
```

Dies sind zwei Bedingungen, die eine Transaktion ungültig machen könnten.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Erstellen Sie das neue Konten-Array und geben Sie es dann zurück.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Diese Funktion liest die Adresse aus der Nachricht.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Die Adresse ist immer 20 Byte (auch bekannt als 40 Hexadezimalziffern) lang und beginnt bei Zeichen #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Lesen Sie den Betrag und die Nonce aus der Nachricht.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

In der Nachricht ist die erste Zahl nach der Adresse der Betrag in Finney (auch bekannt als Tausendstel eines ETH), der überwiesen werden soll. Die zweite Zahl ist die Nonce. Jeder Text dazwischen wird ignoriert.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Die Rückgabe eines [Tupels](https://noir-lang.org/docs/noir/concepts/data_types/tuples) ist die Noir-Methode, um mehrere Werte aus einer Funktion zurückzugeben.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Diese Funktion konvertiert die Nachricht in Bytes und dann die Beträge in eine `TransferTxn`.

```rust
// Das Äquivalent zu Viems hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Wir konnten den Pedersen-Hash für die Konten verwenden, da sie nur innerhalb des Zero-Knowledge-Proofs gehasht werden. In diesem Code müssen wir jedoch die Signatur der Nachricht überprüfen, die vom Browser generiert wird. Dafür müssen wir dem Ethereum-Signaturformat in [EIP 191](https://eips.ethereum.org/EIPS/eip-191) folgen. Das bedeutet, wir müssen einen kombinierten Puffer mit einem Standardpräfix, der Nachrichtenlänge in ASCII und der Nachricht selbst erstellen und den Ethereum-Standard Keccak256 verwenden, um ihn zu hashen.

```rust
    // ASCII-Präfix
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Um Fälle zu vermeiden, in denen eine Anwendung den Benutzer bittet, eine Nachricht zu signieren, die als Transaktion oder für einen anderen Zweck verwendet werden kann, gibt EIP 191 an, dass alle signierten Nachrichten mit dem Zeichen 0x19 (kein gültiges ASCII-Zeichen) beginnen, gefolgt von `Ethereum Signed Message:` und einem Zeilenumbruch.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Nachrichten, deren Länge drei Ziffern überschreitet, werden nicht unterstützt");
```

Handhaben Sie Nachrichtenlängen bis zu 999 und brechen Sie ab, wenn sie größer ist. Ich habe diesen Code hinzugefügt, obwohl die Nachrichtenlänge eine Konstante ist, weil es die Änderung erleichtert. Auf einem Produktionssystem würden Sie wahrscheinlich einfach davon ausgehen, dass `MESSAGE_LENGTH` sich aus Leistungsgründen nicht ändert.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Verwenden Sie die Ethereum-Standardfunktion `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // Adresse, erste 16 Bytes des Hash, letzte 16 Bytes des Hash        
{
```

Diese Funktion verifiziert die Signatur, was den Nachrichten-Hash erfordert. Es liefert uns dann die Adresse, die sie signiert hat, und den Nachrichten-Hash. Der Nachrichten-Hash wird in zwei `Field`-Werten geliefert, da diese im Rest des Programms einfacher zu verwenden sind als ein Byte-Array.

Wir müssen zwei `Field`-Werte verwenden, da Feldberechnungen [modulo](https://de.wikipedia.org/wiki/Modular_arithmetic) einer großen Zahl durchgeführt werden, aber diese Zahl ist typischerweise kleiner als 256 Bits (andernfalls wäre es schwierig, diese Berechnungen in der EVM durchzuführen).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Spezifizieren Sie `hash1` und `hash2` als veränderliche Variablen und schreiben Sie den Hash Byte für Byte hinein.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Dies ist ähnlich wie [Soliditiys `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), mit zwei wichtigen Unterschieden:

- Wenn die Signatur nicht gültig ist, schlägt der Aufruf ein `assert` fehl und das Programm wird abgebrochen.
- Obwohl der öffentliche Schlüssel aus der Signatur und dem Hash wiederhergestellt werden kann, handelt es sich um eine Verarbeitung, die extern erfolgen kann und daher nicht innerhalb des Zero-Knowledge-Proofs durchgeführt werden sollte. Wenn jemand versucht, uns hier zu betrügen, wird die Signaturüberprüfung fehlschlagen.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash des alten Konten-Arrays
        Field,  // Hash des neuen Konten-Arrays
        Field,  // Erste 16 Bytes des Nachrichten-Hashs
        Field,  // Letzte 16 Bytes des Nachrichten-Hashs
    )
```

Schließlich erreichen wir die `main`-Funktion. Wir müssen beweisen, dass wir eine Transaktion haben, die den Hash der Konten gültig vom alten Wert auf den neuen ändert. Wir müssen auch beweisen, dass sie diesen spezifischen Transaktions-Hash hat, damit die Person, die sie gesendet hat, weiß, dass ihre Transaktion verarbeitet wurde.

```rust
{
    let mut txn = readTransferTxn(message);
```

Wir brauchen `txn`, um veränderbar zu sein, weil wir die Von-Adresse nicht aus der Nachricht, sondern aus der Signatur lesen.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Stufe 2 – Hinzufügen eines Servers {#stage-2}

In der zweiten Stufe fügen wir einen Server hinzu, der Überweisungstransaktionen vom Browser empfängt und implementiert.

So sehen Sie es in Aktion:

1. Stoppen Sie Vite, wenn es läuft.

2. Laden Sie den Branch mit dem Server herunter und stellen Sie sicher, dass Sie alle erforderlichen Module haben.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Es ist nicht notwendig, den Noir-Code zu kompilieren, es ist derselbe Code, den Sie für Stufe 1 verwendet haben.

3. Starten Sie den Server.

   ```sh
   npm run start
   ```

4. Führen Sie Vite in einem separaten Kommandozeilenfenster aus, um den Browser-Code bereitzustellen.

   ```sh
   cd client
   npm run dev
   ```

5. Navigieren Sie zum Client-Code unter [http://localhost:5173](http://localhost:5173)

6. Bevor Sie eine Transaktion ausgeben können, müssen Sie die Nonce sowie den Betrag kennen, den Sie senden können. Um diese Informationen zu erhalten, klicken Sie auf **Kontodaten aktualisieren** und signieren Sie die Nachricht.

   Wir haben hier ein Dilemma. Einerseits wollen wir keine Nachricht signieren, die wiederverwendet werden kann (ein [Replay-Angriff](https://de.wikipedia.org/wiki/Replay-Angriff)), weshalb wir überhaupt eine Nonce wollen. Allerdings haben wir noch keine Nonce. Die Lösung besteht darin, eine Nonce zu wählen, die nur einmal verwendet werden kann und die wir bereits auf beiden Seiten haben, wie z. B. die aktuelle Zeit.

   Das Problem bei dieser Lösung ist, dass die Zeit möglicherweise nicht perfekt synchronisiert ist. Stattdessen signieren wir einen Wert, der sich jede Minute ändert. Dies bedeutet, dass unser Verwundbarkeitsfenster für Replay-Angriffe höchstens eine Minute beträgt. In Anbetracht der Tatsache, dass die signierte Anfrage in der Produktion durch TLS geschützt wird und dass die andere Seite des Tunnels – der Server – das Guthaben und die Nonce bereits offenlegen kann (er muss sie kennen, um zu funktionieren), ist dies ein akzeptables Risiko.

7. Sobald der Browser das Guthaben und die Nonce zurückerhält, zeigt er das Überweisungsformular an. Wählen Sie die Zieladresse und den Betrag aus und klicken Sie auf **Überweisen**. Signieren Sie diese Anfrage.

8. Um die Überweisung zu sehen, **aktualisieren Sie die Kontodaten** oder schauen Sie in das Fenster, in dem Sie den Server ausführen. Der Server protokolliert den Zustand bei jeder Änderung.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) enthält den Serverprozess und interagiert mit dem Noir-Code unter [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Hier ist eine Erklärung der interessanten Teile.

```js
import { Noir } from '@noir-lang/noir_js'
```

Die [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js)-Bibliothek dient als Schnittstelle zwischen JavaScript-Code und Noir-Code.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Laden Sie die arithmetische Schaltung – das kompilierte Noir-Programm, das wir in der vorherigen Stufe erstellt haben – und bereiten Sie sich auf ihre Ausführung vor.

```js
// Wir stellen Kontoinformationen nur als Antwort auf eine signierte Anfrage zur Verfügung
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Um Kontoinformationen bereitzustellen, benötigen wir nur die Signatur. Der Grund dafür ist, dass wir bereits wissen, was die Nachricht sein wird, und daher auch den Nachrichten-Hash.

```js
const processMessage = async (message, signature) => {
```

Verarbeiten Sie eine Nachricht und führen Sie die darin kodierte Transaktion aus.

```js
    // Holen Sie sich den öffentlichen Schlüssel
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Jetzt, da wir JavaScript auf dem Server ausführen, können wir den öffentlichen Schlüssel dort anstatt auf dem Client abrufen.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` führt das Noir-Programm aus. Die Parameter entsprechen denen, die in [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) angegeben sind. Beachten Sie, dass lange Werte als Array von Hexadezimal-Strings (`["0x60", "0xA7"]`) und nicht als einzelner Hexadezimalwert (`0x60A7`) angegeben werden, wie es Viem tut.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Wenn ein Fehler auftritt, fangen Sie ihn ab und leiten Sie eine vereinfachte Version an den Client weiter.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Führen Sie die Transaktion aus. Wir haben dies bereits im Noir-Code getan, aber es ist einfacher, es hier erneut zu tun, als das Ergebnis von dort zu extrahieren.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Die ursprüngliche `Accounts`-Struktur.

### Stufe 3 – Ethereum Smart Contracts {#stage-3}

1. Stoppen Sie die Server- und Client-Prozesse.

2. Laden Sie den Branch mit den Smart Contracts herunter und stellen Sie sicher, dass Sie alle erforderlichen Module haben.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Führen Sie `anvil` in einem separaten Kommandozeilenfenster aus.

4. Generieren Sie den Verifizierungsschlüssel und den Solidity-Verifizierer und kopieren Sie dann den Verifizierer-Code in das Solidity-Projekt.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Gehen Sie zu den Smart Contracts und setzen Sie die Umgebungsvariablen, um die `anvil` Blockchain zu verwenden.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Stellen Sie `Verifier.sol` bereit und speichern Sie die Adresse in einer Umgebungsvariable.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Stellen Sie den `ZkBank`-Vertrag bereit.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Der Wert `0x199..67b` ist der Pederson-Hash des Anfangszustands von `Accounts`. Wenn Sie diesen Anfangszustand in `server/index.mjs` ändern, können Sie eine Transaktion ausführen, um den vom Zero-Knowledge-Proof gemeldeten Anfangs-Hash zu sehen.

8. Starten Sie den Server.

   ```sh
   cd ../server
   npm run start
   ```

9. Führen Sie den Client in einem anderen Befehlszeilenfenster aus.

   ```sh
   cd client
   npm run dev
   ```

10. Führen Sie einige Transaktionen aus.

11. Um zu überprüfen, dass der Zustand onchain geändert wurde, starten Sie den Serverprozess neu. Beachten Sie, dass `ZkBank` keine Transaktionen mehr akzeptiert, da der ursprüngliche Hash-Wert in den Transaktionen vom onchain gespeicherten Hash-Wert abweicht.

    Dies ist die Art von Fehler, die erwartet wird.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Die Änderungen in dieser Datei beziehen sich hauptsächlich auf die Erstellung des tatsächlichen Beweises und dessen Einreichung onchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Wir müssen [das Barretenberg-Paket](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) verwenden, um den tatsächlichen Beweis zu erstellen, der onchain gesendet werden soll. Wir können dieses Paket entweder über die Befehlszeilenschnittstelle (`bb`) oder über die [JavaScript-Bibliothek `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) verwenden. Die JavaScript-Bibliothek ist viel langsamer als nativer Code, daher verwenden wir hier [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback), um die Befehlszeile zu nutzen.

Beachten Sie, dass, wenn Sie sich für die Verwendung von `bb.js` entscheiden, Sie eine Version verwenden müssen, die mit der von Ihnen verwendeten Noir-Version kompatibel ist. Zum Zeitpunkt der Erstellung dieses Artikels verwendet die aktuelle Noir-Version (1.0.0-beta.11) `bb.js` Version 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Die Adresse hier ist diejenige, die Sie erhalten, wenn Sie mit einem sauberen `anvil` beginnen und den obigen Anweisungen folgen.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Dieser private Schlüssel ist einer der standardmäßigen, vorfinanzierten Konten in `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Generieren Sie einen Beweis mit der ausführbaren Datei `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Schreiben Sie den Witness in eine Datei.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Erstellen Sie tatsächlich den Beweis. Dieser Schritt erstellt auch eine Datei mit den öffentlichen Variablen, aber die brauchen wir nicht. Diese Variablen haben wir bereits von `noir.execute` erhalten.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Der Beweis ist ein JSON-Array von `Field`-Werten, die jeweils als Hexadezimalwert dargestellt werden. Wir müssen es jedoch in der Transaktion als einen einzigen `bytes`-Wert senden, den Viem durch eine große Hexadezimalzeichenkette darstellt. Hier ändern wir das Format, indem wir alle Werte verketten, alle `0x` entfernen und dann am Ende eines hinzufügen.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Aufräumen und den Beweis zurückgeben.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Die öffentlichen Felder müssen ein Array von 32-Byte-Werten sein. Da wir jedoch den Transaktions-Hash zwischen zwei `Field`-Werten aufteilen mussten, erscheint er als 16-Byte-Wert. Hier fügen wir Nullen hinzu, damit Viem versteht, dass es sich tatsächlich um 32 Bytes handelt.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Jede Adresse verwendet jede Nonce nur einmal, sodass wir eine Kombination aus `fromAddress` und `nonce` als eindeutigen Bezeichner für die Witness-Datei und das Ausgabeverzeichnis verwenden können.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Senden Sie die Transaktion an die Chain.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Dies ist der Onchain-Code, der die Transaktion empfängt.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Der Onchain-Code muss zwei Variablen nachverfolgen: den Verifizierer (ein separater Vertrag, der von `nargo` erstellt wird) und den aktuellen Zustands-Hash.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Jedes Mal, wenn sich der Zustand ändert, geben wir ein `TransactionProcessed`-Ereignis aus.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Diese Funktion verarbeitet Transaktionen. Sie erhält den Beweis (als `bytes`) und die öffentlichen Eingaben (als `bytes32`-Array) in dem Format, das der Verifizierer benötigt (um die Onchain-Verarbeitung und damit die Gas-Kosten zu minimieren).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Falscher alter Zustands-Hash");
```

Der Zero-Knowledge-Proof muss beweisen, dass die Transaktion von unserem aktuellen Hash zu einem neuen wechselt.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Rufen Sie den Verifizierer-Vertrag auf, um den Zero-Knowledge-Proof zu verifizieren. Dieser Schritt macht die Transaktion rückgängig, wenn der Zero-Knowledge-Proof falsch ist.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Wenn alles stimmt, aktualisieren Sie den Zustands-Hash auf den neuen Wert und geben Sie ein `TransactionProcessed`-Ereignis aus.

## Missbrauch durch die zentralisierte Komponente {#abuses}

Informationssicherheit besteht aus drei Attributen:

- _Vertraulichkeit_: Benutzer können keine Informationen lesen, für deren Lektüre sie nicht autorisiert sind.
- _Integrität_: Informationen können nur von autorisierten Benutzern auf autorisierte Weise geändert werden.
- _Verfügbarkeit_: Autorisierte Benutzer können das System verwenden.

Auf diesem System wird die Integrität durch Zero-Knowledge-Proofs gewährleistet. Verfügbarkeit ist viel schwerer zu garantieren, und Vertraulichkeit ist unmöglich, da die Bank das Guthaben jedes Kontos und alle Transaktionen kennen muss. Es gibt keine Möglichkeit, eine Entität, die über Informationen verfügt, daran zu hindern, diese Informationen weiterzugeben.

Es könnte möglich sein, eine wirklich vertrauliche Bank mit [Stealth-Adressen](https://vitalik.eth.limo/general/2023/01/20/stealth.html) zu erstellen, aber das liegt außerhalb des Rahmens dieses Artikels.

### Falsche Informationen {#false-info}

Eine Möglichkeit, wie der Server die Integrität verletzen kann, ist die Bereitstellung falscher Informationen, wenn [Daten angefordert werden](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Um dies zu lösen, können wir ein zweites Noir-Programm schreiben, das die Konten als private Eingabe und die Adresse, für die Informationen angefordert werden, als öffentliche Eingabe erhält. Die Ausgabe sind das Guthaben und die Nonce dieser Adresse sowie der Hash der Konten.

Natürlich kann dieser Beweis nicht onchain verifiziert werden, da wir keine Nonces und Guthaben onchain veröffentlichen wollen. Er kann jedoch vom Client-Code, der im Browser ausgeführt wird, verifiziert werden.

### Erzwungene Transaktionen {#forced-txns}

Der übliche Mechanismus zur Gewährleistung der Verfügbarkeit und zur Verhinderung von Zensur auf L2s sind [erzwungene Transaktionen](https://docs.optimism.io/stack/transactions/forced-transaction). Aber erzwungene Transaktionen lassen sich nicht mit Zero-Knowledge-Proofs kombinieren. Der Server ist die einzige Instanz, die Transaktionen überprüfen kann.

Wir können `smart-contracts/src/ZkBank.sol` so ändern, dass er erzwungene Transaktionen akzeptiert und den Server daran hindert, den Zustand zu ändern, bis sie verarbeitet sind. Dies eröffnet uns jedoch einen einfachen Denial-of-Service-Angriff. Was ist, wenn eine erzwungene Transaktion ungültig ist und daher unmöglich zu verarbeiten ist?

Die Lösung ist ein Zero-Knowledge-Proof, dass eine erzwungene Transaktion ungültig ist. Dies gibt dem Server drei Optionen:

- Verarbeiten Sie die erzwungene Transaktion und stellen Sie einen Zero-Knowledge-Proof bereit, dass sie verarbeitet wurde und den neuen Zustands-Hash.
- Lehnen Sie die erzwungene Transaktion ab und legen Sie dem Vertrag einen Zero-Knowledge-Proof vor, dass die Transaktion ungültig ist (unbekannte Adresse, falsche Nonce oder unzureichendes Guthaben).
- Ignorieren Sie die erzwungene Transaktion. Es gibt keine Möglichkeit, den Server zu zwingen, die Transaktion tatsächlich zu verarbeiten, aber es bedeutet, dass das gesamte System nicht verfügbar ist.

#### Verfügbarkeitsanleihen {#avail-bonds}

In einer realen Implementierung gäbe es wahrscheinlich eine Art Profitmotiv, den Server am Laufen zu halten. Wir können diesen Anreiz verstärken, indem der Server eine Verfügbarkeitsanleihe hinterlegt, die jeder verbrennen kann, wenn eine erzwungene Transaktion nicht innerhalb eines bestimmten Zeitraums verarbeitet wird.

### Schlechter Noir-Code {#bad-noir-code}

Normalerweise, um das Vertrauen der Leute in einen Smart Contract zu gewinnen, laden wir den Quellcode auf einen [Block-Explorer](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) hoch. Im Falle von Zero-Knowledge-Proofs ist das jedoch unzureichend.

`Verifier.sol` enthält den Verifizierungsschlüssel, der eine Funktion des Noir-Programms ist. Dieser Schlüssel sagt uns jedoch nicht, was das Noir-Programm war. Um tatsächlich eine vertrauenswürdige Lösung zu haben, müssen Sie das Noir-Programm (und die Version, die es erstellt hat) hochladen. Andernfalls könnten die Zero-Knowledge-Proofs ein anderes Programm widerspiegeln, eines mit einer Hintertür.

Bis Block-Explorer es uns ermöglichen, Noir-Programme hochzuladen und zu verifizieren, sollten Sie es selbst tun (vorzugsweise auf [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Dann können versierte Benutzer den Quellcode herunterladen, selbst kompilieren, `Verifier.sol` erstellen und überprüfen, ob er mit dem auf der Chain identisch ist.

## Fazit {#conclusion}

Plasma-Anwendungen erfordern eine zentralisierte Komponente als Informationsspeicher. Dies eröffnet potenzielle Schwachstellen, ermöglicht es uns aber im Gegenzug, die Privatsphäre auf eine Weise zu wahren, die auf der Blockchain selbst nicht verfügbar ist. Mit Zero-Knowledge-Proofs können wir die Integrität gewährleisten und es möglicherweise wirtschaftlich vorteilhaft machen, dass der Betreiber der zentralisierten Komponente die Verfügbarkeit aufrechterhält.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).

## Anerkennungen {#acknowledgements}

- Josh Crites hat einen Entwurf dieses Artikels gelesen und mir bei einem kniffligen Noir-Problem geholfen.

Alle verbleibenden Fehler liegen in meiner Verantwortung.
