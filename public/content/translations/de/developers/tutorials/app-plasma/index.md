---
title: "Schreiben Sie ein anwendungsspezifisches Plasma, das die Privatsphäre wahrt"
description: "In diesem Tutorial bauen wir eine halbgeheime Bank für Einlagen. Die Bank ist eine zentralisierte Komponente; sie kennt den Kontostand jedes Benutzers. Diese Informationen werden jedoch nicht auf der Blockchain gespeichert. Stattdessen veröffentlicht die Bank einen Hash des Zustands. Jedes Mal, wenn eine Transaktion stattfindet, veröffentlicht die Bank den neuen Hash zusammen mit einem Zero-Knowledge-Beweis, dass sie eine signierte Transaktion hat, die den Hash-Zustand in den neuen ändert. Nach dem Lesen dieses Tutorials werden Sie nicht nur verstehen, wie man Zero-Knowledge-Beweise verwendet, sondern auch, warum man sie verwendet und wie man dies sicher tut."
author: Ori Pomerantz
tags: ["Zero-Knowledge", "Server", "Off-Chain", "Privatsphäre"]
skill: advanced
breadcrumb: Anwendungsspezifisches Plasma
lang: de
published: 2025-10-15
---

## Einführung {#introduction}

Im Gegensatz zu [Rollups](/developers/docs/scaling/zk-rollups/) nutzen [Plasmas](/developers/docs/scaling/plasma) das Ethereum-Mainnet für die Integrität, aber nicht für die Verfügbarkeit. In diesem Artikel schreiben wir eine Anwendung, die sich wie ein Plasma verhält, wobei Ethereum die Integrität garantiert (keine unbefugten Änderungen), aber nicht die Verfügbarkeit (eine zentralisierte Komponente kann ausfallen und das gesamte System lahmlegen).

Die Anwendung, die wir hier schreiben, ist eine Bank, die die Privatsphäre wahrt. Verschiedene Adressen haben Konten mit Guthaben, und sie können Geld (ETH) an andere Konten senden. Die Bank veröffentlicht Hashes des Zustands (Konten und deren Guthaben) und Transaktionen, hält aber die tatsächlichen Guthaben Off-Chain, wo sie privat bleiben können.

## Design {#design}

Dies ist kein produktionsreifes System, sondern ein Lehrmittel. Als solches wurde es mit einigen vereinfachenden Annahmen geschrieben.

- Fester Kontenpool. Es gibt eine bestimmte Anzahl von Konten, und jedes Konto gehört zu einer vorgegebenen Adresse. Dies macht das System viel einfacher, da es schwierig ist, Datenstrukturen variabler Größe in Zero-Knowledge-Beweisen zu handhaben. Für ein produktionsreifes System können wir die [Merkle-Wurzel](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) als Zustands-Hash verwenden und Merkle-Beweise für die erforderlichen Guthaben bereitstellen.

- Speicherung im Arbeitsspeicher. In einem Produktionssystem müssen wir alle Kontostände auf die Festplatte schreiben, um sie im Falle eines Neustarts zu erhalten. Hier ist es in Ordnung, wenn die Informationen einfach verloren gehen.

- Nur Überweisungen. Ein Produktionssystem würde eine Möglichkeit erfordern, Vermögenswerte bei der Bank einzuzahlen und abzuheben. Aber der Zweck hier ist nur, das Konzept zu veranschaulichen, daher ist diese Bank auf Überweisungen beschränkt.

### Zero-Knowledge-Beweise {#zero-knowledge-proofs}

Auf einer grundlegenden Ebene zeigt ein Zero-Knowledge-Beweis, dass der Beweiser bestimmte Daten kennt, _Data<sub>private</sub>_, sodass eine Beziehung _Relationship_ zwischen einigen öffentlichen Daten, _Data<sub>public</sub>_, und _Data<sub>private</sub>_ besteht. Der Verifizierer kennt _Relationship_ und _Data<sub>public</sub>_.

Um die Privatsphäre zu wahren, müssen die Zustände und die Transaktionen privat sein. Um jedoch die Integrität zu gewährleisten, muss der [kryptografische Hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) der Zustände öffentlich sein. Um den Personen, die Transaktionen einreichen, zu beweisen, dass diese Transaktionen wirklich stattgefunden haben, müssen wir auch Transaktions-Hashes veröffentlichen.

In den meisten Fällen ist _Data<sub>private</sub>_ die Eingabe für das Zero-Knowledge-Beweisprogramm und _Data<sub>public</sub>_ die Ausgabe.

Diese Felder in _Data<sub>private</sub>_:

- _State<sub>n</sub>_, der alte Zustand
- _State<sub>n+1</sub>_, der neue Zustand
- _Transaction_, eine Transaktion, die vom alten Zustand in den neuen wechselt. Diese Transaktion muss folgende Felder enthalten:
  - _Zieladresse_, die die Überweisung empfängt
  - _Betrag_, der überwiesen wird
  - _Nonce_, um sicherzustellen, dass jede Transaktion nur einmal verarbeitet werden kann.
    Die Quelladresse muss nicht in der Transaktion enthalten sein, da sie aus der Signatur wiederhergestellt werden kann.
- _Signatur_, eine Signatur, die autorisiert ist, die Transaktion durchzuführen. In unserem Fall ist die einzige Adresse, die zur Durchführung einer Transaktion autorisiert ist, die Quelladresse. Da unser Zero-Knowledge-System so funktioniert, wie es funktioniert, benötigen wir zusätzlich zur Ethereum-Signatur auch den Public-Key des Kontos.

Dies sind die Felder in _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ der Hash des alten Zustands
- _Hash(State<sub>n+1</sub>)_ der Hash des neuen Zustands
- _Hash(Transaction)_ der Hash der Transaktion, die den Zustand von _State<sub>n</sub>_ zu _State<sub>n+1</sub>_ ändert.

Die Beziehung prüft mehrere Bedingungen:

- Die öffentlichen Hashes sind tatsächlich die korrekten Hashes für die privaten Felder.
- Die Transaktion führt, wenn sie auf den alten Zustand angewendet wird, zum neuen Zustand.
- Die Signatur stammt von der Quelladresse der Transaktion.

Aufgrund der Eigenschaften kryptografischer Hash-Funktionen reicht der Beweis dieser Bedingungen aus, um die Integrität zu gewährleisten.

### Datenstrukturen {#data-structures}

Die primäre Datenstruktur ist der vom Server gehaltene Zustand. Für jedes Konto verfolgt der Server den Kontostand und eine [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), die verwendet wird, um [Replay-Angriffe](https://en.wikipedia.org/wiki/Replay_attack) zu verhindern.

### Komponenten {#components}

Dieses System erfordert zwei Komponenten:

- Der _Server_, der Transaktionen empfängt, sie verarbeitet und Hashes zusammen mit den Zero-Knowledge-Beweisen auf der Blockchain veröffentlicht.
- Ein _Smart Contract_, der die Hashes speichert und die Zero-Knowledge-Beweise verifiziert, um sicherzustellen, dass Zustandsübergänge legitim sind.

### Daten- und Kontrollfluss {#flows}

Dies sind die Wege, auf denen die verschiedenen Komponenten kommunizieren, um von einem Konto auf ein anderes zu überweisen.

1. Ein Webbrowser reicht eine signierte Transaktion ein, die um eine Überweisung vom Konto des Unterzeichners auf ein anderes Konto bittet.

2. Der Server verifiziert, dass die Transaktion gültig ist:

   - Der Unterzeichner hat ein Konto bei der Bank mit ausreichendem Guthaben.
   - Der Empfänger hat ein Konto bei der Bank.

3. Der Server berechnet den neuen Zustand, indem er den überwiesenen Betrag vom Guthaben des Unterzeichners abzieht und ihn dem Guthaben des Empfängers hinzufügt.

4. Der Server berechnet einen Zero-Knowledge-Beweis, dass die Zustandsänderung gültig ist.

5. Der Server reicht bei Ethereum eine Transaktion ein, die Folgendes enthält:

   - Den neuen Zustands-Hash
   - Den Transaktions-Hash (damit der Sender der Transaktion weiß, dass sie verarbeitet wurde)
   - Den Zero-Knowledge-Beweis, der belegt, dass der Übergang in den neuen Zustand gültig ist

6. Der Smart Contract verifiziert den Zero-Knowledge-Beweis.

7. Wenn der Zero-Knowledge-Beweis erfolgreich ist, führt der Smart Contract diese Aktionen aus:
   - Aktualisierung des aktuellen Zustands-Hashes auf den neuen Zustands-Hash
   - Ausgabe eines Protokolleintrags mit dem neuen Zustands-Hash und dem Transaktions-Hash

### Werkzeuge {#tools}

Für den clientseitigen Code werden wir [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) und [Wagmi](https://wagmi.sh/) verwenden. Dies sind branchenübliche Werkzeuge; wenn Sie nicht mit ihnen vertraut sind, können Sie [dieses Tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) verwenden.

Der Großteil des Servers ist in JavaScript unter Verwendung von [Node](https://nodejs.org/en) geschrieben. Der Zero-Knowledge-Teil ist in [Noir](https://noir-lang.org/) geschrieben. Wir benötigen Version `1.0.0-beta.10`, also führen Sie nach der [Installation von Noir gemäß Anleitung](https://noir-lang.org/docs/getting_started/quick_start) Folgendes aus:

```
noirup -v 1.0.0-beta.10
```

Die Blockchain, die wir verwenden, ist `anvil`, eine lokale Test-Blockchain, die Teil von [Foundry](https://getfoundry.sh/introduction/installation) ist.

## Implementierung {#implementation}

Da dies ein komplexes System ist, werden wir es in Phasen implementieren.

### Phase 1 - Manuelles Zero-Knowledge {#stage-1}

Für die erste Phase werden wir eine Transaktion im Browser signieren und dann die Informationen manuell dem Zero-Knowledge-Beweis zur Verfügung stellen. Der Zero-Knowledge-Code erwartet, diese Informationen in `server/noir/Prover.toml` zu erhalten (dokumentiert [hier](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Um es in Aktion zu sehen:

1. Stellen Sie sicher, dass Sie [Node](https://nodejs.org/en/download) und [Noir](https://noir-lang.org/install) installiert haben. Installieren Sie sie vorzugsweise auf einem UNIX-System wie macOS, Linux oder [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Laden Sie den Code für Phase 1 herunter und starten Sie den Webserver, um den Client-Code bereitzustellen.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
```

   Der Grund, warum Sie hier einen Webserver benötigen, ist, dass viele Wallets (wie MetaMask) zur Verhinderung bestimmter Arten von Betrug keine Dateien akzeptieren, die direkt von der Festplatte bereitgestellt werden.

3. Öffnen Sie einen Browser mit einem Wallet.

4. Geben Sie im Wallet eine neue Passphrase ein. Beachten Sie, dass dadurch Ihre bestehende Passphrase gelöscht wird, _stellen Sie also sicher, dass Sie ein Backup haben_.

   Die Passphrase lautet `test test test test test test test test test test test junk`, die Standard-Test-Passphrase für anvil.

5. Navigieren Sie zum [clientseitigen Code](http://localhost:5173/).

6. Verbinden Sie sich mit dem Wallet und wählen Sie Ihr Zielkonto und den Betrag aus.

7. Klicken Sie auf **Sign** und signieren Sie die Transaktion.

8. Unter der Überschrift **Prover.toml** finden Sie Text. Ersetzen Sie `server/noir/Prover.toml` durch diesen Text.

9. Führen Sie den Zero-Knowledge-Beweis aus.

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

10. Vergleichen Sie die letzten beiden Werte mit dem Hash, den Sie im Webbrowser sehen, um zu überprüfen, ob die Nachricht korrekt gehasht wurde.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) zeigt das von Noir erwartete Informationsformat.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Die Nachricht liegt im Textformat vor, was es dem Benutzer leicht macht, sie zu verstehen (was beim Signieren notwendig ist), und dem Noir-Code, sie zu parsen. Der Betrag ist in Finneys angegeben, um einerseits Teilüberweisungen zu ermöglichen und andererseits leicht lesbar zu sein. Die letzte Zahl ist die [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Die Zeichenfolge ist 100 Zeichen lang. Zero-Knowledge-Beweise können mit Daten variabler Größe nicht gut umgehen, daher ist es oft notwendig, Daten aufzufüllen (Padding).

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

Dies ist die Art und Weise, ein Array von Strukturen anzugeben. Für jeden Eintrag geben wir die Adresse, das Guthaben (in milliETH, auch bekannt als [Finney](https://cryptovalleyjournal.com/glossary/finney/)) und den nächsten Nonce-Wert an.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementiert die clientseitige Verarbeitung und generiert die Datei `server/noir/Prover.toml` (diejenige, die die Zero-Knowledge-Parameter enthält).

Hier ist die Erklärung der interessanteren Teile.

```tsx
export default attrs =>  {
```

Diese Funktion erstellt die React-Komponente `Transfer`, die von anderen Dateien importiert werden kann.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Dies sind die Kontoadressen, die Adressen, die durch die Passphrase `test ... test junk` erstellt wurden. Wenn Sie Ihre eigenen Adressen verwenden möchten, ändern Sie einfach diese Definition.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Diese [Wagmi-Hooks](https://wagmi.sh/react/api/hooks) ermöglichen uns den Zugriff auf die [viem](https://viem.sh/)-Bibliothek und das Wallet.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Dies ist die Nachricht, aufgefüllt mit Leerzeichen. Jedes Mal, wenn sich eine der [`useState`](https://react.dev/reference/react/useState)-Variablen ändert, wird die Komponente neu gezeichnet und `message` aktualisiert.

```tsx
  const sign = async () => {
```

Diese Funktion wird aufgerufen, wenn der Benutzer auf die Schaltfläche **Sign** klickt. Die Nachricht wird automatisch aktualisiert, aber die Signatur erfordert die Zustimmung des Benutzers im Wallet, und wir möchten nicht danach fragen, es sei denn, es ist erforderlich.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Bitten Sie das Wallet, [die Nachricht zu signieren](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

Rufen Sie den Nachrichten-Hash ab. Es ist hilfreich, ihn dem Benutzer zum Debuggen (des Noir-Codes) zur Verfügung zu stellen. 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Rufen Sie den Public-Key ab](https://viem.sh/docs/utilities/recoverPublicKey). Dies ist für die [Noir-Funktion `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) erforderlich.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Legen Sie die Zustandsvariablen fest. Dadurch wird die Komponente neu gezeichnet (nachdem die Funktion `sign` beendet ist) und dem Benutzer werden die aktualisierten Werte angezeigt.

```tsx
    let proverToml = `
```

Der Text für `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem stellt uns den Public-Key als 65-Byte-Hexadezimalzeichenfolge zur Verfügung. Das erste Byte ist `0x04`, eine Versionsmarkierung. Darauf folgen 32 Bytes für das `x` des Public-Keys und dann 32 Bytes für das `y` des Public-Keys.

Noir erwartet diese Informationen jedoch als zwei Byte-Arrays, eines für `x` und eines für `y`. Es ist einfacher, sie hier auf dem Client zu parsen, als als Teil des Zero-Knowledge-Beweises.

Beachten Sie, dass dies im Allgemeinen eine gute Praxis bei Zero-Knowledge ist. Code innerhalb eines Zero-Knowledge-Beweises ist teuer, daher _sollte_ jede Verarbeitung, die außerhalb des Zero-Knowledge-Beweises durchgeführt werden kann, auch außerhalb des Zero-Knowledge-Beweises durchgeführt werden.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Die Signatur wird ebenfalls als 65-Byte-Hexadezimalzeichenfolge bereitgestellt. Das letzte Byte ist jedoch nur erforderlich, um den Public-Key wiederherzustellen. Da der Public-Key dem Noir-Code bereits zur Verfügung gestellt wird, benötigen wir ihn nicht zur Verifizierung der Signatur, und der Noir-Code erfordert ihn nicht.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Stellen Sie die Konten bereit.

```tsx
    setProverToml(proverToml)
  }

  return (
    \<>
        <h2>Transfer</h2>
```

Dies ist das HTML-Format (genauer gesagt [JSX](https://react.dev/learn/writing-markup-with-jsx)) der Komponente.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) ist der eigentliche Zero-Knowledge-Code.

```
use std::hash::pedersen_hash;
```

Der [Pedersen-Hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) wird mit der [Noir-Standardbibliothek](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) bereitgestellt. Zero-Knowledge-Beweise verwenden diese Hash-Funktion häufig. Sie ist innerhalb von [arithmetischen Schaltkreisen](https://rareskills.io/post/arithmetic-circuit) im Vergleich zu den Standard-Hash-Funktionen viel einfacher zu berechnen.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Diese beiden Funktionen sind externe Bibliotheken, die in [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) definiert sind. Sie sind genau das, wonach sie benannt sind: eine Funktion, die den [keccak256-Hash](https://emn178.github.io/online-tools/keccak_256.html) berechnet, und eine Funktion, die Ethereum-Signaturen verifiziert und die Ethereum-Adresse des Unterzeichners wiederherstellt.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir ist von [Rust](https://www.rust-lang.org/) inspiriert. Variablen sind standardmäßig Konstanten. So definieren wir globale Konfigurationskonstanten. Insbesondere ist `ACCOUNT_NUMBER` die Anzahl der Konten, die wir speichern.

Datentypen mit dem Namen `u<number>` haben diese Anzahl von Bits, vorzeichenlos. Die einzigen unterstützten Typen sind `u8`, `u16`, `u32`, `u64` und `u128`.

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

Die Informationen, die wir über ein Konto speichern. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ist eine Zahl, typischerweise bis zu 253 Bits, die direkt in dem [arithmetischen Schaltkreis](https://rareskills.io/post/arithmetic-circuit) verwendet werden kann, der den Zero-Knowledge-Beweis implementiert. Hier verwenden wir das `Field`, um eine 160-Bit-Ethereum-Adresse zu speichern.

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

Eine Funktionsdefinition. Der Parameter sind `Account`-Informationen. Das Ergebnis ist ein Array von `Field`-Variablen, dessen Länge `FLAT_ACCOUNT_FIELDS` ist.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Der erste Wert im Array ist die Kontoadresse. Der zweite enthält sowohl das Guthaben als auch die Nonce. Die `.into()`-Aufrufe ändern eine Zahl in den Datentyp, den sie haben muss. `account.nonce` ist ein `u32`-Wert, aber um ihn zu `account.balance << 32`, einem `u128`-Wert, hinzuzufügen, muss er ein `u128` sein. Das ist das erste `.into()`. Das zweite konvertiert das `u128`-Ergebnis in ein `Field`, damit es in das Array passt.

```
    flat
}
```

In Noir können Funktionen nur am Ende einen Wert zurückgeben (es gibt kein vorzeitiges Zurückgeben). Um den Rückgabewert anzugeben, werten Sie ihn direkt vor der schließenden Klammer der Funktion aus.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Diese Funktion wandelt das Konten-Array in ein `Field`-Array um, das als Eingabe für einen Petersen-Hash verwendet werden kann.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

So geben Sie eine veränderbare Variable an, also _keine_ Konstante. Variablen in Noir müssen immer einen Wert haben, daher initialisieren wir diese Variable mit lauter Nullen.

```
    for i in 0..ACCOUNT_NUMBER {
```

Dies ist eine `for`-Schleife. Beachten Sie, dass die Grenzen Konstanten sind. Bei Noir-Schleifen müssen die Grenzen zur Kompilierzeit bekannt sein. Der Grund dafür ist, dass arithmetische Schaltkreise keine Flusskontrolle unterstützen. Bei der Verarbeitung einer `for`-Schleife fügt der Compiler den Code darin einfach mehrmals ein, einmal für jede Iteration.

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

Diese Funktion findet das Konto mit einer bestimmten Adresse. Diese Funktion wäre in Standardcode furchtbar ineffizient, da sie über alle Konten iteriert, selbst nachdem sie die Adresse gefunden hat.

In Zero-Knowledge-Beweisen gibt es jedoch keine Flusskontrolle. Wenn wir jemals eine Bedingung überprüfen müssen, müssen wir sie jedes Mal überprüfen.

Ähnliches passiert bei `if`-Anweisungen. Die `if`-Anweisung in der obigen Schleife wird in diese mathematischen Anweisungen übersetzt.

_condition<sub>result</sub> = accounts[i].address == address_ // eins, wenn sie gleich sind, andernfalls null

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Die Funktion [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) führt dazu, dass der Zero-Knowledge-Beweis abstürzt, wenn die Behauptung falsch ist. In diesem Fall, wenn wir kein Konto mit der entsprechenden Adresse finden können. Um die Adresse zu melden, verwenden wir einen [Format-String](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Diese Funktion wendet eine Überweisungstransaktion an und gibt das neue Konten-Array zurück.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Wir können in Noir nicht auf Strukturelemente innerhalb eines Format-Strings zugreifen, daher erstellen wir eine nutzbare Kopie.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
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

Die Adresse ist immer 20 Bytes (also 40 hexadezimale Ziffern) lang und beginnt bei Zeichen Nr. 7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 { // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 { // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 { // a-f
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

In der Nachricht ist die erste Zahl nach der Adresse der Betrag in Finney (also Tausendstel eines ETH), der überwiesen werden soll. Die zweite Zahl ist die Nonce. Jeglicher Text dazwischen wird ignoriert.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 { // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce { // Wir haben es gerade gefunden
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

Diese Funktion konvertiert die Nachricht in Bytes und konvertiert dann die Beträge in eine `TransferTxn`.

```rust
// Das Äquivalent zu Viems hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Wir konnten den Pedersen-Hash für die Konten verwenden, da sie nur innerhalb des Zero-Knowledge-Beweises gehasht werden. In diesem Code müssen wir jedoch die Signatur der Nachricht überprüfen, die vom Browser generiert wird. Dafür müssen wir dem Ethereum-Signaturformat in [EIP 191](https://eips.ethereum.org/EIPS/eip-191) folgen. Das bedeutet, wir müssen einen kombinierten Puffer mit einem Standardpräfix, der Nachrichtenlänge in ASCII und der Nachricht selbst erstellen und den Ethereum-Standard keccak256 verwenden, um ihn zu hashen.

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
        0x0A // '\n'
    ];
```

Um Fälle zu vermeiden, in denen eine Anwendung den Benutzer auffordert, eine Nachricht zu signieren, die als Transaktion oder für einen anderen Zweck verwendet werden kann, legt EIP 191 fest, dass alle signierten Nachrichten mit dem Zeichen 0x19 (kein gültiges ASCII-Zeichen) beginnen, gefolgt von `Ethereum Signed Message:` und einem Zeilenumbruch.

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

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Behandeln Sie Nachrichtenlängen bis zu 999 und schlagen Sie fehl, wenn sie größer sind. Ich habe diesen Code hinzugefügt, obwohl die Nachrichtenlänge eine Konstante ist, weil es so einfacher ist, sie zu ändern. In einem Produktionssystem würden Sie wahrscheinlich aus Gründen der besseren Leistung einfach davon ausgehen, dass sich `MESSAGE_LENGTH` nicht ändert.

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
    ) -> (Field, Field, Field) // Adresse, erste 16 Bytes des Hashs, letzte 16 Bytes des Hashs
{
```

Diese Funktion verifiziert die Signatur, was den Nachrichten-Hash erfordert. Sie liefert uns dann die Adresse, die sie signiert hat, und den Nachrichten-Hash. Der Nachrichten-Hash wird in zwei `Field`-Werten geliefert, da diese im Rest des Programms einfacher zu verwenden sind als ein Byte-Array.

Wir müssen zwei `Field`-Werte verwenden, da Feldberechnungen [modulo](https://en.wikipedia.org/wiki/Modulo) einer großen Zahl durchgeführt werden, diese Zahl jedoch typischerweise kleiner als 256 Bits (andernfalls wäre es schwierig, diese Berechnungen in der EVM durchzuführen).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Geben Sie `hash1` und `hash2` als veränderbare Variablen an und schreiben Sie den Hash Byte für Byte in sie hinein.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Dies ähnelt [Soliditys `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), mit zwei wichtigen Unterschieden:

- Wenn die Signatur nicht gültig ist, schlägt der Aufruf bei einem `assert` fehl und das Programm wird abgebrochen.
- Während der Public-Key aus der Signatur und dem Hash wiederhergestellt werden kann, ist dies eine Verarbeitung, die extern durchgeführt werden kann und sich daher nicht lohnt, innerhalb des Zero-Knowledge-Beweises durchgeführt zu werden. Wenn jemand versucht, uns hier zu betrügen, wird die Signaturverifizierung fehlschlagen.

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
        Field, // Hash des alten Konten-Arrays
        Field, // Hash des neuen Konten-Arrays
        Field, // Erste 16 Bytes des Nachrichten-Hashs
        Field, // Letzte 16 Bytes des Nachrichten-Hashs
    )
```

Schließlich erreichen wir die Funktion `main`. Wir müssen beweisen, dass wir eine Transaktion haben, die den Hash der Konten gültig vom alten Wert auf den neuen ändert. Wir müssen auch beweisen, dass sie diesen spezifischen Transaktions-Hash hat, damit die Person, die sie gesendet hat, weiß, dass ihre Transaktion verarbeitet wurde.

```rust
{
    let mut txn = readTransferTxn(message);
```

Wir benötigen `txn` als veränderbar, da wir die Absenderadresse nicht aus der Nachricht lesen, sondern aus der Signatur. 

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

### Phase 2 - Hinzufügen eines Servers {#stage-2}

In der zweiten Phase fügen wir einen Server hinzu, der Überweisungstransaktionen vom Browser empfängt und implementiert.

Um es in Aktion zu sehen:

1. Stoppen Sie Vite, falls es läuft.

2. Laden Sie den Branch herunter, der den Server enthält, und stellen Sie sicher, dass Sie alle erforderlichen Module haben.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
```

   Es ist nicht nötig, den Noir-Code zu kompilieren, es ist derselbe Code, den Sie für Phase 1 verwendet haben.

3. Starten Sie den Server.

   ```sh
   npm run start
```

4. Führen Sie in einem separaten Befehlszeilenfenster Vite aus, um den Browser-Code bereitzustellen.

   ```sh
   cd client
   npm run dev
```

5. Navigieren Sie zum Client-Code unter [http://localhost:5173](http://localhost:5173)

6. Bevor Sie eine Transaktion ausgeben können, müssen Sie die Nonce sowie den Betrag kennen, den Sie senden können. Um diese Informationen zu erhalten, klicken Sie auf **Update account data** und signieren Sie die Nachricht.

   Wir haben hier ein Dilemma. Einerseits möchten wir keine Nachricht signieren, die wiederverwendet werden kann (ein [Replay-Angriff](https://en.wikipedia.org/wiki/Replay_attack)), weshalb wir überhaupt erst eine Nonce wollen. Wir haben jedoch noch keine Nonce. Die Lösung besteht darin, eine Nonce zu wählen, die nur einmal verwendet werden kann und die wir bereits auf beiden Seiten haben, wie z. B. die aktuelle Uhrzeit.

   Das Problem bei dieser Lösung ist, dass die Zeit möglicherweise nicht perfekt synchronisiert ist. Stattdessen signieren wir also einen Wert, der sich jede Minute ändert. Das bedeutet, dass unser Zeitfenster für die Anfälligkeit gegenüber Replay-Angriffen höchstens eine Minute beträgt. In Anbetracht der Tatsache, dass die signierte Anfrage in der Produktion durch TLS geschützt ist und dass die andere Seite des Tunnels – der Server – das Guthaben und die Nonce bereits offenlegen kann (er muss sie kennen, um zu funktionieren), ist dies ein akzeptables Risiko.

7. Sobald der Browser das Guthaben und die Nonce zurückerhält, zeigt er das Überweisungsformular an. Wählen Sie die Zieladresse und den Betrag aus und klicken Sie auf **Transfer**. Signieren Sie diese Anfrage.

8. Um die Überweisung zu sehen, klicken Sie entweder auf **Update account data** oder schauen Sie in das Fenster, in dem Sie den Server ausführen. Der Server protokolliert den Zustand jedes Mal, wenn er sich ändert.

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

[Diese Datei](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) enthält den Serverprozess und interagiert mit dem Noir-Code in [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Hier ist eine Erklärung der interessanten Teile.

```js
import { Noir } from '@noir-lang/noir_js'
```

Die Bibliothek [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) bildet die Schnittstelle zwischen JavaScript-Code und Noir-Code.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Laden Sie den arithmetischen Schaltkreis – das kompilierte Noir-Programm, das wir in der vorherigen Phase erstellt haben – und bereiten Sie dessen Ausführung vor.

```js
// Wir stellen Kontoinformationen nur als Antwort auf eine signierte Anfrage zur Verfügung
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Um Kontoinformationen bereitzustellen, benötigen wir nur die Signatur. Der Grund dafür ist, dass wir bereits wissen, wie die Nachricht lauten wird, und somit auch den Nachrichten-Hash kennen.

```js
const processMessage = async (message, signature) => {
```

Verarbeiten Sie eine Nachricht und führen Sie die darin codierte Transaktion aus.

```js
    // Öffentlichen Schlüssel abrufen
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Da wir nun JavaScript auf dem Server ausführen, können wir den Public-Key dort abrufen, anstatt auf dem Client.

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

`noir.execute` führt das Noir-Programm aus. Die Parameter entsprechen denen, die in [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) angegeben sind. Beachten Sie, dass lange Werte als Array von Hexadezimalzeichenfolgen (`["0x60", "0xA7"]`) bereitgestellt werden, nicht als einzelner Hexadezimalwert (`0x60A7`), wie es Viem tut.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Wenn ein Fehler auftritt, fangen Sie ihn ab und leiten Sie dann eine vereinfachte Version an den Client weiter.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Wenden Sie die Transaktion an. Wir haben dies bereits im Noir-Code getan, aber es ist einfacher, es hier noch einmal zu tun, als das Ergebnis von dort zu extrahieren.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Die anfängliche `Accounts`-Struktur.

### Phase 3 - Ethereum Smart Contracts {#stage-3}

1. Stoppen Sie die Server- und Client-Prozesse.

2. Laden Sie den Branch mit den Smart Contracts herunter und stellen Sie sicher, dass Sie alle erforderlichen Module haben.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
```

3. Führen Sie `anvil` in einem separaten Befehlszeilenfenster aus.

4. Generieren Sie den Verifizierungsschlüssel und den Solidity-Verifizierer und kopieren Sie dann den Verifizierer-Code in das Solidity-Projekt.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
```

5. Gehen Sie zu den Smart Contracts und legen Sie die Umgebungsvariablen fest, um die `anvil`-Blockchain zu verwenden.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

6. Stellen Sie `Verifier.sol` bereit und speichern Sie die Adresse in einer Umgebungsvariablen.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
```

7. Stellen Sie den `ZkBank`-Vertrag bereit.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
```

   Der Wert `0x199..67b` ist der Pederson-Hash des Anfangszustands von `Accounts`. Wenn Sie diesen Anfangszustand in `server/index.mjs` ändern, können Sie eine Transaktion ausführen, um den anfänglichen Hash zu sehen, der vom Zero-Knowledge-Beweis gemeldet wird.

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

11. Um zu überprüfen, ob sich der Zustand auf der Blockchain geändert hat, starten Sie den Serverprozess neu. Sie werden sehen, dass `ZkBank` keine Transaktionen mehr akzeptiert, da der ursprüngliche Hash-Wert in den Transaktionen von dem auf der Blockchain gespeicherten Hash-Wert abweicht.

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

Die Änderungen in dieser Datei beziehen sich hauptsächlich auf die Erstellung des eigentlichen Beweises und dessen Einreichung auf der Blockchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Wir müssen [das Barretenberg-Paket](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) verwenden, um den eigentlichen Beweis zu erstellen, der auf der Blockchain gesendet werden soll. Wir können dieses Paket entweder durch Ausführen der Befehlszeilenschnittstelle (`bb`) oder durch Verwendung der [JavaScript-Bibliothek `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) verwenden. Die JavaScript-Bibliothek ist viel langsamer als die native Ausführung von Code, daher verwenden wir hier [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback), um die Befehlszeile zu nutzen.

Beachten Sie, dass Sie, wenn Sie sich für die Verwendung von `bb.js` entscheiden, eine Version verwenden müssen, die mit der von Ihnen verwendeten Noir-Version kompatibel ist. Zum Zeitpunkt des Schreibens verwendet die aktuelle Noir-Version (1.0.0-beta.11) die `bb.js`-Version 0.87.

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

Dieser Private-Key gehört zu einem der standardmäßig vorfinanzierten Konten in `anvil`. 

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

Erstellen Sie den eigentlichen Beweis. Dieser Schritt erstellt auch eine Datei mit den öffentlichen Variablen, aber die benötigen wir nicht. Wir haben diese Variablen bereits von `noir.execute` erhalten.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Der Beweis ist ein JSON-Array von `Field`-Werten, die jeweils als Hexadezimalwert dargestellt werden. Wir müssen ihn jedoch in der Transaktion als einzelnen `bytes`-Wert senden, den Viem durch eine große Hexadezimalzeichenfolge darstellt. Hier ändern wir das Format, indem wir alle Werte verketten, alle `0x` entfernen und dann am Ende eines hinzufügen.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Bereinigen und den Beweis zurückgeben.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Die öffentlichen Felder müssen ein Array von 32-Byte-Werten sein. Da wir jedoch den Transaktions-Hash auf zwei `Field`-Werte aufteilen mussten, erscheint er als 16-Byte-Wert. Hier fügen wir Nullen hinzu, damit Viem versteht, dass es sich tatsächlich um 32 Bytes handelt.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Jede Adresse verwendet jede Nonce nur einmal, sodass wir eine Kombination aus `fromAddress` und `nonce` als eindeutige Kennung für die Witness-Datei und das Ausgabeverzeichnis verwenden können.

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

Senden Sie die Transaktion an die Blockchain.

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

Der Onchain-Code muss zwei Variablen verfolgen: den Verifizierer (ein separater Vertrag, der von `nargo` erstellt wird) und den aktuellen Zustands-Hash.

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

Diese Funktion verarbeitet Transaktionen. Sie erhält den Beweis (als `bytes`) und die öffentlichen Eingaben (als `bytes32`-Array) in dem Format, das der Verifizierer benötigt (um die Onchain-Verarbeitung und damit die Gaskosten zu minimieren).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Der Zero-Knowledge-Beweis muss belegen, dass die Transaktion von unserem aktuellen Hash zu einem neuen wechselt.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Rufen Sie den Verifizierer-Vertrag auf, um den Zero-Knowledge-Beweis zu verifizieren. Dieser Schritt macht die Transaktion rückgängig, wenn der Zero-Knowledge-Beweis falsch ist.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<&lt;128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Wenn alles in Ordnung ist, aktualisieren Sie den Zustands-Hash auf den neuen Wert und geben Sie ein `TransactionProcessed`-Ereignis aus.

## Missbrauch durch die zentralisierte Komponente {#abuses}

Informationssicherheit besteht aus drei Attributen:

- _Vertraulichkeit_, Benutzer können keine Informationen lesen, für die sie nicht autorisiert sind.
- _Integrität_, Informationen können nur von autorisierten Benutzern auf autorisierte Weise geändert werden.
- _Verfügbarkeit_, autorisierte Benutzer können das System nutzen.

In diesem System wird die Integrität durch Zero-Knowledge-Beweise gewährleistet. Die Verfügbarkeit ist viel schwerer zu garantieren, und Vertraulichkeit ist unmöglich, da die Bank den Kontostand jedes Kontos und alle Transaktionen kennen muss. Es gibt keine Möglichkeit, eine Entität, die über Informationen verfügt, daran zu hindern, diese Informationen weiterzugeben.

Es könnte möglich sein, eine wirklich vertrauliche Bank unter Verwendung von [Stealth-Adressen](https://vitalik.eth.limo/general/2023/01/20/stealth.html) zu erstellen, aber das sprengt den Rahmen dieses Artikels.

### Falsche Informationen {#false-info}

Eine Möglichkeit, wie der Server die Integrität verletzen kann, besteht darin, falsche Informationen bereitzustellen, wenn [Daten angefordert werden](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Um dies zu lösen, können wir ein zweites Noir-Programm schreiben, das die Konten als private Eingabe und die Adresse, für die Informationen angefordert werden, als öffentliche Eingabe erhält. Die Ausgabe ist das Guthaben und die Nonce dieser Adresse sowie der Hash der Konten.

Natürlich kann dieser Beweis nicht auf der Blockchain verifiziert werden, da wir Nonces und Guthaben nicht auf der Blockchain veröffentlichen möchten. Er kann jedoch durch den im Browser ausgeführten Client-Code verifiziert werden.

### Erzwungene Transaktionen {#forced-txns}

Der übliche Mechanismus zur Gewährleistung der Verfügbarkeit und zur Verhinderung von Zensur auf L2s sind [erzwungene Transaktionen](https://docs.optimism.io/stack/transactions/forced-transaction). Aber erzwungene Transaktionen lassen sich nicht mit Zero-Knowledge-Beweisen kombinieren. Der Server ist die einzige Entität, die Transaktionen verifizieren kann.

Wir können `smart-contracts/src/ZkBank.sol` so ändern, dass erzwungene Transaktionen akzeptiert werden und der Server daran gehindert wird, den Zustand zu ändern, bis sie verarbeitet sind. Dies öffnet uns jedoch für einen einfachen Denial-of-Service-Angriff. Was ist, wenn eine erzwungene Transaktion ungültig und daher unmöglich zu verarbeiten ist?

Die Lösung besteht darin, einen Zero-Knowledge-Beweis dafür zu haben, dass eine erzwungene Transaktion ungültig ist. Dies gibt dem Server drei Optionen:

- Die erzwungene Transaktion verarbeiten und einen Zero-Knowledge-Beweis dafür liefern, dass sie verarbeitet wurde, sowie den neuen Zustands-Hash.
- Die erzwungene Transaktion ablehnen und dem Vertrag einen Zero-Knowledge-Beweis dafür liefern, dass die Transaktion ungültig ist (unbekannte Adresse, falsche Nonce oder unzureichendes Guthaben).
- Die erzwungene Transaktion ignorieren. Es gibt keine Möglichkeit, den Server zu zwingen, die Transaktion tatsächlich zu verarbeiten, aber das bedeutet, dass das gesamte System nicht verfügbar ist.

#### Verfügbarkeitskautionen {#avail-bonds}

In einer realen Implementierung gäbe es wahrscheinlich eine Art Profitmotiv, um den Server am Laufen zu halten. Wir können diesen Anreiz verstärken, indem wir den Server eine Verfügbarkeitskaution hinterlegen lassen, die jeder verbrennen kann, wenn eine erzwungene Transaktion nicht innerhalb eines bestimmten Zeitraums verarbeitet wird.

### Schlechter Noir-Code {#bad-noir-code}

Normalerweise laden wir den Quellcode in eine [Blocksuchmaschine](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) hoch, um das Vertrauen der Leute in einen Smart Contract zu gewinnen. Im Falle von Zero-Knowledge-Beweisen ist das jedoch unzureichend.

`Verifier.sol` enthält den Verifizierungsschlüssel, der eine Funktion des Noir-Programms ist. Dieser Schlüssel sagt uns jedoch nicht, was das Noir-Programm war. Um tatsächlich eine vertrauenswürdige Lösung zu haben, müssen Sie das Noir-Programm (und die Version, die es erstellt hat) hochladen. Andernfalls könnten die Zero-Knowledge-Beweise ein anderes Programm widerspiegeln, eines mit einer Hintertür.

Bis Blocksuchmaschinen es uns ermöglichen, Noir-Programme hochzuladen und zu verifizieren, sollten Sie dies selbst tun (vorzugsweise auf [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Dann können erfahrene Benutzer den Quellcode herunterladen, ihn selbst kompilieren, `Verifier.sol` erstellen und überprüfen, ob er mit dem auf der Blockchain identisch ist.

## Fazit {#conclusion}

Plasma-artige Anwendungen erfordern eine zentralisierte Komponente als Informationsspeicher. Dies eröffnet potenzielle Schwachstellen, ermöglicht es uns aber im Gegenzug, die Privatsphäre auf eine Weise zu wahren, die auf der Blockchain selbst nicht verfügbar ist. Mit Zero-Knowledge-Beweisen können wir die Integrität sicherstellen und es möglicherweise für denjenigen, der die zentralisierte Komponente betreibt, wirtschaftlich vorteilhaft machen, die Verfügbarkeit aufrechtzuerhalten.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).

## Danksagungen {#acknowledgements}

- Josh Crites hat einen Entwurf dieses Artikels gelesen und mir bei einem kniffligen Noir-Problem geholfen.

Alle verbleibenden Fehler liegen in meiner Verantwortung.