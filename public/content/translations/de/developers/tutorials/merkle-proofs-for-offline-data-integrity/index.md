---
title: Merkle-Nachweise für die Integrität von Offline-Daten
description: Sicherstellung der Datenintegrität Onchain für Daten, die größtenteils offchain gespeichert sind
author: Ori Pomerantz
tags: ["Speicher"]
skill: advanced
breadcrumb: Merkle-Nachweise
lang: de
published: 2021-12-30
---

## Einführung {#introduction}

Idealerweise würden wir gerne alles im Ethereum-Speicher ablegen, der über Tausende von Computern verteilt ist und eine extrem hohe Verfügbarkeit (die Daten können nicht zensiert werden) sowie Integrität (die Daten können nicht unbefugt geändert werden) aufweist. Das Speichern eines 32-Byte-Wortes kostet jedoch typischerweise 20.000 Gas. Zum Zeitpunkt des Schreibens entspricht dieser Preis 6,60 $. Mit 21 Cent pro Byte ist dies für viele Anwendungsfälle zu teuer.

Um dieses Problem zu lösen, hat das Ethereum-Ökosystem [viele alternative Wege entwickelt, um Daten dezentral zu speichern](/developers/docs/storage/). Meistens beinhalten diese einen Kompromiss zwischen Verfügbarkeit und Preis. Die Integrität ist jedoch in der Regel gewährleistet.

In diesem Artikel erfahren Sie, **wie** Sie die Datenintegrität sicherstellen können, ohne die Daten auf der Blockchain zu speichern, indem Sie [Merkle-Nachweise](https://computersciencewiki.org/index.php/Merkle_proof) verwenden.

## Wie funktioniert das? {#how-does-it-work}

Theoretisch könnten wir einfach den Hash der Daten Onchain speichern und alle Daten in Transaktionen senden, die sie benötigen. Dies ist jedoch immer noch zu teuer. Ein Byte an Daten für eine Transaktion kostet etwa 16 Gas, derzeit etwa einen halben Cent oder etwa 5 $ pro Kilobyte. Mit 5000 $ pro Megabyte ist dies für viele Anwendungsfälle immer noch zu teuer, selbst ohne die zusätzlichen Kosten für das Hashing der Daten.

Die Lösung besteht darin, wiederholt verschiedene Teilmengen der Daten zu hashen, sodass Sie für die Daten, die Sie nicht senden müssen, einfach einen Hash senden können. Dies geschieht mithilfe eines Merkle-Baums, einer Baum-Datenstruktur, bei der jeder Knoten ein Hash der darunter liegenden Knoten ist:

![Merkle Tree](tree.png)

Der Wurzel-Hash ist der einzige Teil, der Onchain gespeichert werden muss. Um einen bestimmten Wert nachzuweisen, stellen Sie alle Hashes bereit, die damit kombiniert werden müssen, um die Wurzel zu erhalten. Um beispielsweise `C` nachzuweisen, stellen Sie `D`, `H(A-B)` und `H(E-H)` bereit.

![Proof of the value of C](proof-c.png)

## Implementierung {#implementation}

[Der Beispielcode wird hier bereitgestellt](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Offchain-Code {#offchain-code}

In diesem Artikel verwenden wir JavaScript für die Offchain-Berechnungen. Die meisten dezentralen Anwendungen haben ihre Offchain-Komponente in JavaScript.

#### Erstellen der Merkle-Wurzel {#creating-the-merkle-root}

Zuerst müssen wir der Chain die Merkle-Wurzel bereitstellen.

```javascript
const ethers = require("ethers")
```

[Wir verwenden die Hashfunktion aus dem ethers-Paket](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Die Rohdaten, deren Integrität wir überprüfen müssen. Die ersten zwei Bytes s
// ind eine Benutzerkennung, und die letzten zwei Bytes die Menge an Token, die der
// Benutzer derzeit besitzt.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Das Codieren jedes Eintrags in eine einzelne 256-Bit-Ganzzahl führt zu weniger lesbarem Code als beispielsweise die Verwendung von JSON. Dies bedeutet jedoch deutlich weniger Verarbeitungsaufwand, um die Daten im Vertrag abzurufen, und somit viel geringere Gas-Kosten. [Sie können JSON Onchain lesen](https://github.com/chrisdotn/jsmnSol), es ist nur eine schlechte Idee, wenn es sich vermeiden lässt.

```javascript
// Das Array der Hash-Werte, als BigInts
const hashArray = dataArray
```

In diesem Fall bestehen unsere Daten von vornherein aus 256-Bit-Werten, sodass keine Verarbeitung erforderlich ist. Wenn wir eine kompliziertere Datenstruktur wie Strings verwenden, müssen wir sicherstellen, dass wir die Daten zuerst hashen, um ein Array von Hashes zu erhalten. Beachten Sie, dass dies auch daran liegt, dass es uns egal ist, ob Benutzer die Informationen anderer Benutzer kennen. Andernfalls hätten wir hashen müssen, damit Benutzer 1 den Wert für Benutzer 0 nicht kennt, Benutzer 2 den Wert für Benutzer 3 nicht kennt usw.

```javascript
// Konvertiere zwischen dem String, den die Hashfunktion erwartet, und dem
// BigInt, den wir überall sonst verwenden.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Die ethers-Hashfunktion erwartet einen JavaScript-String mit einer Hexadezimalzahl, wie z. B. `0x60A7`, und antwortet mit einem weiteren String mit derselben Struktur. Für den Rest des Codes ist es jedoch einfacher, `BigInt` zu verwenden, also konvertieren wir in einen Hexadezimal-String und wieder zurück.

```javascript
// Symmetrischer Hash eines Paares, sodass es uns egal ist, ob die Reihenfolge umgekehrt wird.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Diese Funktion ist symmetrisch (Hash von a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Das bedeutet, dass wir uns bei der Überprüfung des Merkle-Nachweises keine Gedanken darüber machen müssen, ob wir den Wert aus dem Nachweis vor oder nach dem berechneten Wert einfügen. Die Überprüfung des Merkle-Nachweises erfolgt Onchain, je weniger wir dort also tun müssen, desto besser.

Warnung:
Kryptographie ist schwieriger, als es aussieht.
Die ursprüngliche Version dieses Artikels enthielt die Hashfunktion `hash(a^b)`.
Das war eine **schlechte** Idee, denn es bedeutete, dass man, wenn man die legitimen Werte von `a` und `b` kannte, `b' = a^b^a'` verwenden konnte, um jeden gewünschten `a'`-Wert nachzuweisen.
Mit dieser Funktion müssten Sie `b'` so berechnen, dass `hash(a') ^ hash(b')` gleich einem bekannten Wert ist (dem nächsten Zweig auf dem Weg zur Wurzel), was viel schwieriger ist.

```javascript
// Der Wert, der angibt, dass ein bestimmter Zweig leer ist, keinen
// Wert hat
const empty = 0n
```

Wenn die Anzahl der Werte keine ganzzahlige Zweierpotenz ist, müssen wir leere Zweige behandeln. Dieses Programm macht das, indem es Null als Platzhalter einsetzt.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Berechne eine Ebene höher im Baum eines Hash-Arrays, indem der Hash von
// jedem Paar der Reihe nach gebildet wird
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Um ein Überschreiben der Eingabe zu vermeiden // Füge bei Bedarf einen leeren Wert hinzu (wir müssen alle Blätter // paaren)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Diese Funktion „klettert“ eine Ebene im Merkle-Baum nach oben, indem sie die Wertepaare auf der aktuellen Ebene hasht. Beachten Sie, dass dies nicht die effizienteste Implementierung ist. Wir hätten das Kopieren der Eingabe vermeiden und einfach `hashEmpty` an der entsprechenden Stelle in der Schleife hinzufügen können, aber dieser Code ist auf Lesbarkeit optimiert.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Klettere den Baum hinauf, bis es nur noch einen Wert gibt, das ist die // Wurzel. // // Wenn eine Schicht eine ungerade Anzahl von Einträgen hat, fügt der // Code in oneLevelUp einen leeren Wert hinzu. Wenn wir also zum Beispiel // 10 Blätter haben, haben wir 5 Zweige in der zweiten Schicht, 3 // Zweige in der dritten, 2 in der vierten und die Wurzel ist die fünfte

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Um die Wurzel zu erhalten, klettern Sie, bis nur noch ein Wert übrig ist.

#### Erstellen eines Merkle-Nachweises {#creating-a-merkle-proof}

Ein Merkle-Nachweis besteht aus den Werten, die zusammen mit dem nachzuweisenden Wert gehasht werden müssen, um die Merkle-Wurzel zurückzuerhalten. Der nachzuweisende Wert ist oft aus anderen Daten verfügbar, daher ziehe ich es vor, ihn separat und nicht als Teil des Codes bereitzustellen.

```javascript
// Ein Merkle-Nachweis besteht aus dem Wert der Liste von Einträgen, mit denen
// gehasht wird. Da wir eine symmetrische Hashfunktion verwenden, benötigen wir
// die Position des Elements nicht, um den Nachweis zu verifizieren, sondern nur, um ihn zu erstellen
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Bis wir die Spitze erreichen
    while (currentLayer.length > 1) {
        // Keine Schichten mit ungerader Länge
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Wenn currentN ungerade ist, füge es mit dem Wert davor zum Nachweis hinzu
            ? currentLayer[currentN-1]
               // Wenn es gerade ist, füge den Wert danach hinzu
            : currentLayer[currentN+1])

```

Wir hashen `(v[0],v[1])`, `(v[2],v[3])` usw. Für gerade Werte benötigen wir also den nächsten, für ungerade Werte den vorherigen.

```javascript
        // Gehe zur nächsten Schicht nach oben
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Onchain-Code {#onchain-code}

Schließlich haben wir den Code, der den Nachweis überprüft. Der Onchain-Code ist in [Solidity](https://docs.soliditylang.org/en/v0.8.11/) geschrieben. Optimierung ist hier viel wichtiger, da Gas relativ teuer ist.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Ich habe dies mit der [Hardhat-Entwicklungsumgebung](https://hardhat.org/) geschrieben, die es uns ermöglicht, während der Entwicklung [Konsolenausgaben aus Solidity](https://hardhat.org/docs/cookbook/debug-logs) zu erhalten.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extrem unsicher, im Produktionscode muss der Zugriff auf
    // diese Funktion STRENG LIMITIERT SEIN, wahrscheinlich auf einen
    // Besitzer
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Set- und Get-Funktionen für die Merkle-Wurzel. Jeden die Merkle-Wurzel aktualisieren zu lassen, ist in einem Produktionssystem eine _extrem schlechte Idee_. Ich mache es hier der Einfachheit halber für den Beispielcode. **Tun Sie dies nicht auf einem System, bei dem Datenintegrität tatsächlich wichtig ist**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Diese Funktion generiert einen Paar-Hash. Es ist nur die Solidity-Übersetzung des JavaScript-Codes für `hash` und `pairHash`.

**Hinweis:** Dies ist ein weiterer Fall von Optimierung für die Lesbarkeit. Basierend auf [der Funktionsdefinition](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) könnte es möglich sein, die Daten als [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays)-Wert zu speichern und die Konvertierungen zu vermeiden.

```solidity
    // Verifiziere einen Merkle-Nachweis
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

In mathematischer Notation sieht die Verifizierung eines Merkle-Nachweises so aus: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Dieser Code implementiert sie.

## Merkle-Nachweise und Rollups passen nicht zusammen {#merkle-proofs-and-rollups}

Merkle-Nachweise funktionieren nicht gut mit [Rollups](/developers/docs/scaling/#rollups). Der Grund dafür ist, dass Rollups alle Transaktionsdaten auf Layer 1 (L1) schreiben, aber auf Layer 2 (L2) verarbeiten. Die Kosten für das Senden eines Merkle-Nachweises mit einer Transaktion belaufen sich im Durchschnitt auf 638 Gas pro Ebene (derzeit kostet ein Byte in Aufrufdaten 16 Gas, wenn es nicht null ist, und 4, wenn es null ist). Wenn wir 1024 Datenwörter haben, erfordert ein Merkle-Nachweis zehn Ebenen oder insgesamt 6380 Gas.

Wenn wir uns zum Beispiel [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m) ansehen, kostet das Schreiben von L1-Gas etwa 100 Gwei und L2-Gas kostet 0,001 Gwei (das ist der normale Preis, er kann bei Überlastung steigen). Für die Kosten von einem L1-Gas können wir also hunderttausend Gas für die L2-Verarbeitung ausgeben. Unter der Annahme, dass wir den Speicher nicht überschreiben, bedeutet dies, dass wir für den Preis von einem L1-Gas etwa fünf Wörter in den Speicher auf L2 schreiben können. Für einen einzigen Merkle-Nachweis können wir die gesamten 1024 Wörter in den Speicher schreiben (vorausgesetzt, sie können von vornherein Onchain berechnet werden, anstatt in einer Transaktion bereitgestellt zu werden) und haben immer noch den Großteil des Gases übrig.

## Fazit {#conclusion}

Im echten Leben werden Sie Merkle-Bäume vielleicht nie selbst implementieren. Es gibt bekannte und geprüfte Bibliotheken, die Sie verwenden können, und im Allgemeinen ist es am besten, kryptographische Primitive nicht selbst zu implementieren. Aber ich hoffe, dass Sie Merkle-Nachweise jetzt besser verstehen und entscheiden können, wann sich ihr Einsatz lohnt.

Beachten Sie, dass Merkle-Nachweise zwar die _Integrität_ wahren, nicht aber die _Verfügbarkeit_. Zu wissen, dass niemand sonst Ihre Vermögenswerte nehmen kann, ist ein schwacher Trost, wenn der Datenspeicher beschließt, den Zugriff zu verweigern, und Sie auch keinen Merkle-Baum konstruieren können, um darauf zuzugreifen. Daher werden Merkle-Bäume am besten mit einer Art dezentralem Speicher wie IPFS verwendet.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).