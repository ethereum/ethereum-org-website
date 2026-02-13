---
title: "Merkle-Beweise für Offline Datenintegrität"
description: "Sicherstellung der Datenintegrität onchain für Daten, die größtenteils offchain gespeichert sind"
author: Ori Pomerantz
tags: [ "Speicher" ]
skill: advanced
lang: de
published: 2021-12-30
---

## Einführung {#introduction}

Idealerweise möchten wir alles in einem Ethereum Speicher ablegen, der auf Tausenden von Computern gespeichert ist und eine extrem hohe Verfügbarkeit (die Daten können nicht zensiert werden) und Integrität (die Daten können nicht unbefugt verändert werden) aufweist, aber die Speicherung eines 32-Byte-Wortes kostet normalerweise 20.000 Gas. Während ich das schreibe, entsprechen
diese Kosten 6,60 USD. Mit 21 Cent pro Byte ist das für viele Anwendungen zu teuer.

Um dieses Problem zu lösen, hat das Ethereum-Ökosystem viele alternative Wege entwickelt, um Daten dezentral
zu speichern. In der Regel muss dabei ein Kompromiss zwischen Verfügbarkeit und Preis eingegangen werden. Die Integrität ist jedoch in der Regel gewährleistet.

In diesem Artikel erfahren Sie, **wie** Sie die Datenintegrität gewährleisten, ohne die Daten auf der Blockchain zu speichern, indem Sie
[Merkle-Beweise](https://computersciencewiki.org/index.php/Merkle_proof) verwenden.

## Wie funktioniert das? {#how-does-it-work}

Theoretisch könnten wir einfach den Hash der Daten onchain speichern und alle Daten in Transaktionen senden, die sie benötigen. Allerdings ist das immer noch zu teuer. Ein Byte Daten zu einer Transaktion kostet etwa 16 Gas, derzeit etwa einen halben Cent, oder etwa 5 USD pro Kilobyte. Mit 5000 USD pro Megabyte ist dies für viele Anwendungen immer noch zu teuer, selbst ohne die zusätzlichen Kosten für das Hashing der Daten.

Die Lösung ist, verschiedene Teilmengen der Daten wiederholt zu hashen, so dass Sie für die Daten, die Sie nicht zu senden brauchen, nur einen Hash senden können. Dazu verwenden Sie einen Merkle Tree, eine Baum Datenstruktur, bei der jeder Knoten ein Hash der darunter liegenden Knoten ist:

![Merkle-Baum](tree.png)

Der Root-Hash ist der einzige Teil, der onchain gespeichert werden muss. Um einen bestimmten Wert zu beweisen, geben Sie alle Hashes an, die damit kombiniert werden müssen, um die Wurzel (Hash-Root) zu erhalten. Um zum Beispiel `C` zu beweisen, stellen Sie `D`, `H(A-B)` und `H(E-H)` zur Verfügung.

![Beweis für den Wert von C](proof-c.png)

## Implementierung {#implementation}

[Der Beispielcode wird hier zur Verfügung gestellt](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Offchain-Code {#offchain-code}

In diesem Artikel verwenden wir JavaScript für die Offchain-Berechnungen. Die meisten dezentralisierten Anwendungen haben ihre Offchain-Komponente in JavaScript.

#### Erstellen der Merkle-Root {#creating-the-merkle-root}

Als erstes müssen wir die Merkle-Wurzel für die Chain bereitstellen.

```javascript
const ethers = require("ethers")
```

[Wir verwenden die Hash-Funktion aus dem Ethers-Paket](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Die Rohdaten, deren Integrität wir überprüfen müssen. Die ersten beiden Bytes
// sind eine Benutzerkennung, und die letzten beiden Bytes sind die Menge der Tokens, die
// der Benutzer derzeit besitzt.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Die Kodierung jedes Eintrags in eine einzelne 256-Bit-Integerzahl führt zu weniger lesbarem Code als z. B. die Verwendung von JSON. Allerdings bedeutet dies einen deutlich geringeren Verarbeitungsaufwand für die Abfrage der Vertragsdaten und damit deutlich niedrigere Gaskosten. [Man kann JSON onchain lesen](https://github.com/chrisdotn/jsmnSol), es ist nur eine schlechte Idee, wenn es vermeidbar ist.

```javascript
// Das Array der Hash-Werte als BigInts
const hashArray = dataArray
```

In diesem Fall handelt es sich bei unseren Daten um 256 Bit-Werte, so dass keine Verarbeitung erforderlich ist. Wenn wir eine kompliziertere Datenstruktur verwenden, wie z. B. Strings, müssen wir sicherstellen, dass wir die Daten zuerst hashen, um ein Array von Hashes zu erhalten. Das liegt auch daran, weil es uns nicht interessiert, ob Benutzer die Informationen anderer Benutzer kennen. Andernfalls hätten wir einen Hash verwenden müssen, damit Benutzer 1 den Wert für Benutzer 0 nicht kennt, Benutzer 2 den Wert für Benutzer 3 nicht kennt usw.

```javascript
// Konvertieren zwischen dem String, den die Hash-Funktion erwartet, und dem
// BigInt, das wir überall sonst verwenden.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Die Ethers-Hash-Funktion erwartet einen JavaScript-String mit einer hexadezimalen Zahl, wie z. B. `0x60A7`, und gibt einen anderen String mit der gleichen Struktur zurück. Für den Rest des Codes ist es jedoch einfacher, `BigInt` zu verwenden, also konvertieren wir es in einen hexadezimalen String und wieder zurück.

```javascript
// Symmetrischer Hash eines Paares, sodass die umgekehrte Reihenfolge keine Rolle spielt.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Diese Funktion ist symmetrisch (Hash von a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Das bedeutet, dass wir uns bei der Überprüfung des Merkle-Beweises keine Gedanken darüber machen müssen, ob wir den Wert aus dem Beweis vor oder nach dem berechneten Wert setzen sollen. Die Überprüfung von Merkle-Beweisen wird onchain durchgeführt. Je weniger wir dort tun müssen, desto besser.

Warnung:
Kryptographie ist schwieriger als es aussieht.
Die ursprüngliche Version dieses Artikels hatte die Hash-Funktion `hash(a^b)`.
Das war eine **schlechte** Idee, denn es bedeutete, dass man, wenn man die legitimen Werte von `a` und `b` kannte, `b' = a^b^a'` verwenden konnte, um einen beliebigen `a'`-Wert zu beweisen.
Mit dieser Funktion müsste man `b'` so berechnen, dass `hash(a') ^ hash(b')` gleich einem bekannten Wert ist (der nächste Zweig auf dem Weg zur Root), was viel schwieriger ist.

```javascript
// Der Wert, der anzeigt, dass ein bestimmter Zweig leer ist und keinen
// Wert hat
const empty = 0n
```

Wenn die Anzahl der Werte keine ganzzahlige Zweierpotenz ist, müssen wir leere Zweige behandeln. Bei diesem Programm wird die Null als Platzhalter eingesetzt.

![Merkle-Baum mit fehlenden Zweigen](merkle-empty-hash.png)

```javascript
// Berechnet eine Ebene im Baum eines Hash-Arrays, indem der Hash
// jedes Paares in der Sequenz genommen wird
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Um das Überschreiben der Eingabe zu vermeiden // Fügt bei Bedarf einen leeren Wert hinzu (wir benötigen alle Blätter // als Paare)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Diese Funktion "klettert" eine Ebene im Merkle-Baum hoch, indem sie die Wertepaare auf der aktuellen Ebene hasht. Beachten Sie, dass dies nicht die effizienteste Implementierung ist. Wir hätten das Kopieren der Eingabe vermeiden und einfach `hashEmpty` an der entsprechenden Stelle in der Schleife hinzufügen können, aber dieser Code ist auf Lesbarkeit optimiert.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Klettere den Baum hinauf, bis es nur noch einen Wert gibt, das ist die // Root. // // Wenn eine Ebene eine ungerade Anzahl von Einträgen hat, fügt der // Code in oneLevelUp einen leeren Wert hinzu. Wenn wir also zum Beispiel // 10 Blätter haben, haben wir 5 Zweige in der zweiten Ebene, 3 // Zweige in der dritten, 2 in der vierten und die Root ist die fünfte

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Um die Wurzel zu bekommen, mache so lange, bis nur noch ein Wert übrig ist.

#### Erstellen eines Merkle-Beweises {#creating-a-merkle-proof}

Ein Merkle-Beweis besteht aus den Werten, die zusammen mit dem zu beweisenden Wert gehasht werden müssen, um die Merkle-Wurzel zu erhalten. Der zu beweisende Wert ist oft aus anderen Daten verfügbar, daher ziehe ich es vor, ihn separat und nicht als Teil des Codes bereitzustellen.

```javascript
// Ein Merkle-Beweis besteht aus dem Wert der Liste der Einträge, mit denen
// gehasht werden soll. Da wir eine symmetrische Hash-Funktion verwenden, benötigen wir
// den Speicherort des Elements nicht, um den Beweis zu verifizieren, sondern nur, um ihn zu erstellen
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Bis wir die Spitze erreichen
    while (currentLayer.length > 1) {
        // Keine Ebenen mit ungerader Länge
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Wenn currentN ungerade ist, füge den Wert davor zum Beweis hinzu
            ? currentLayer[currentN-1]
               // Wenn es gerade ist, füge den Wert danach hinzu
            : currentLayer[currentN+1])

```

Wir hashen `(v[0],v[1])`, `(v[2],v[3])` usw. Für gerade Werte benötigen wir also den nächsten, für ungerade Werte den vorherigen Wert.

```javascript
        // Auf die nächste Ebene aufsteigen
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Onchain-Code {#onchain-code}

Schließlich haben wir den Code, der den Beweis überprüft. Der Onchain-Code ist in [Solidity](https://docs.soliditylang.org/en/v0.8.11/) geschrieben. Die Optimierung ist hier sehr viel wichtiger, weil Gas relativ teuer ist.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Ich habe dies mit der [Hardhat-Entwicklungsumgebung](https://hardhat.org/) geschrieben, die es uns ermöglicht, während der Entwicklung [Konsolenausgaben von Solidity](https://hardhat.org/docs/cookbook/debug-logs) zu haben.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Äußerst unsicher, im Produktionscode muss der Zugriff auf
    // diese Funktion STRENG limitiert sein, wahrscheinlich auf einen
    // Besitzer
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Set- und Get-Funktionen für die Merkle-Wurzel. Jeden die Merkle-Root aktualisieren zu lassen, ist eine _extrem schlechte Idee_ in einem Produktionssystem. Ich tue es hier der Einfachheit halber für den Beispielcode. **Tun Sie das nicht auf einem System, bei dem die Datenintegrität wirklich wichtig ist**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Diese Funktion erzeugt einen Paar-Hash. Es ist nur die Solidity-Übersetzung des JavaScript-Codes für `hash` und `pairHash`.

**Hinweis:** Dies ist ein weiterer Fall der Optimierung auf Lesbarkeit. Basierend auf [der Funktionsdefinition](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) wäre es möglich, die Daten als [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays)-Wert zu speichern und die Konvertierungen zu vermeiden.

```solidity
    // Überprüfen eines Merkle-Beweises
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

In mathematischer Notation sieht die Verifizierung eines Merkle-Beweises so aus: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))`. Dieser Code implementiert sie.

## Merkle-Beweise und Rollups vertragen sich nicht {#merkle-proofs-and-rollups}

Merkle-Beweise funktionieren nicht gut mit [Rollups](/developers/docs/scaling/#rollups). Der Grund dafür ist, dass Rollups alle Transaktionsdaten auf L1 schreiben, aber auf L2 verarbeiten. Die Kosten für die Übermittlung eines Merkle-Beweises mit einer Transaktion belaufen sich auf durchschnittlich 638 Gas pro Ebene (derzeit kostet ein Byte in Call Data 16 Gas, wenn es nicht Null ist, und 4, wenn es Null ist). Bei einer Datenmenge von 1024 Wörtern sind für einen Merkle-Beweis zehn Ebenen erforderlich, also insgesamt 6380 Gas.

Wenn man sich zum Beispiel [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m) ansieht, kostet das Schreiben von L1-Gas etwa 100 Gwei und L2-Gas 0,001 Gwei (das ist der normale Preis, er kann bei Überlastung steigen). Für die Kosten von einem L1 Gas können wir also hunderttausend Gas für die L2 Verarbeitung ausgeben. Wenn wir davon ausgehen, dass wir den Speicher nicht überschreiben, bedeutet das, dass wir für den Preis von einem L1 Gas etwa fünf Wörter in den L2 Speicher schreiben können. Für einen einzelnen Merkle-Beweis können wir die gesamten 1024 Wörter in den Speicher schreiben (vorausgesetzt, sie können von Anfang an onchain berechnet werden, anstatt in einer Transaktion bereitgestellt zu werden) und haben immer noch den größten Teil des Gases übrig.

## Fazit {#conclusion}

Im echten Leben werden Sie Merkle-Bäume vielleicht nie selbst implementieren. Es gibt bekannte und geprüfte Bibliotheken, die Sie verwenden können, wobei es im Allgemeinen nicht ratsam ist, kryptographische Primitive selbst zu implementieren. Aber ich hoffe, dass Sie jetzt die Merkle-Beweise besser verstehen und entscheiden können, wann es sich lohnt, sie einzusetzen.

Beachten Sie, dass Merkle-Beweise zwar die _Integrität_, nicht aber die _Verfügbarkeit_ erhalten. Zu wissen, dass niemand sonst Ihre Assets nehmen kann, ist ein schwacher Trost, wenn der Datenspeicher beschließt, den Zugriff zu verweigern, und Sie auch keinen Merkle-Baum erstellen können, um darauf zuzugreifen. Merkle-Bäume werden daher am besten mit einer Art dezentralem Speicher wie IPFS verwendet.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
