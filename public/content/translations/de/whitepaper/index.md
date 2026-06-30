---
title: Ethereum Whitepaper
description: Ein Einführungspapier zu Ethereum, das 2013 vor seinem Start veröffentlicht wurde.
lang: de
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Obwohl es schon einige Jahre alt ist, behalten wir das ursprüngliche Papier unten bei, da es weiterhin als nützliche Referenz und genaue Darstellung von [Ethereum](/) und seiner Vision dient._

## Eine Plattform der nächsten Generation für Smart Contracts und dezentrale Anwendungen {#a-next-generation-smart-contract-and-decentralized-application-platform}

Satoshi Nakamotos Entwicklung von Bitcoin im Jahr 2009 wurde oft als radikale Entwicklung im Bereich Geld und Währung gefeiert, da es das erste Beispiel für einen digitalen Vermögenswert ist, der gleichzeitig keine Deckung oder "[inneren Wert](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" und keinen zentralen Emittenten oder Kontrolleur hat. Ein anderer, wohl noch wichtigerer Teil des Bitcoin-Experiments ist jedoch die zugrunde liegende Blockchain-Technologie als Werkzeug für verteilten Konsens, und die Aufmerksamkeit verlagert sich zunehmend auf diesen anderen Aspekt von Bitcoin. Häufig genannte alternative Anwendungen der Blockchain-Technologie umfassen die Nutzung von digitalen Vermögenswerten auf der Blockchain zur Darstellung benutzerdefinierter Währungen und Finanzinstrumente ("[Colored Coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), das Eigentum an einem zugrunde liegenden physischen Gerät ("[Smart Property](https://en.bitcoin.it/wiki/Smart_Property)"), nicht-fungible Vermögenswerte wie Domainnamen ("[Namecoin](http://namecoin.org)") sowie komplexere Anwendungen, bei denen digitale Vermögenswerte direkt durch ein Stück Code gesteuert werden, das beliebige Regeln implementiert ("[Smart Contracts](https://nakamotoinstitute.org/smart-contracts/)"), oder sogar Blockchain-basierte "[dezentrale autonome Organisationen](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAOs). Was Ethereum bieten möchte, ist eine Blockchain mit einer integrierten, vollwertigen, Turing-vollständigen Programmiersprache, mit der "Verträge" erstellt werden können, die dazu dienen, beliebige Zustandsübergangsfunktionen zu kodieren. Dies ermöglicht es Benutzern, jedes der oben beschriebenen Systeme sowie viele andere, die wir uns noch nicht vorgestellt haben, zu erstellen, indem sie einfach die Logik in ein paar Zeilen Code schreiben.

## Einführung in Bitcoin und bestehende Konzepte {#introduction-to-bitcoin-and-existing-concepts}

### Geschichte {#history}

Das Konzept einer dezentralen digitalen Währung sowie alternativer Anwendungen wie Eigentumsregister gibt es schon seit Jahrzehnten. Die anonymen E-Cash-Protokolle der 1980er und 1990er Jahre, die sich meist auf eine kryptographische Primitive namens Chaum'sches Blinding stützten, boten eine Währung mit einem hohen Maß an Privatsphäre, aber die Protokolle konnten sich größtenteils nicht durchsetzen, da sie auf einen zentralisierten Vermittler angewiesen waren. Im Jahr 1998 wurde Wei Dais [b-money](https://nakamotoinstitute.org/b-money/) zum ersten Vorschlag, der die Idee einführte, Geld durch das Lösen von Rechenrätseln sowie durch dezentralen Konsens zu schaffen, aber der Vorschlag enthielt kaum Details darüber, wie ein dezentraler Konsens tatsächlich implementiert werden könnte. Im Jahr 2005 stellte Hal Finney das Konzept der „[wiederverwendbaren Proofs-of-Work](https://nakamotoinstitute.org/finney/rpow/)“ vor, ein System, das Ideen von b-money zusammen mit Adam Backs rechenintensiven Hashcash-Rätseln nutzt, um ein Konzept für eine Kryptowährung zu schaffen, das jedoch erneut hinter dem Ideal zurückblieb, da es sich auf Trusted Computing als Backend verließ. Im Jahr 2009 wurde erstmals eine dezentrale Währung in der Praxis von Satoshi Nakamoto implementiert, die etablierte Primitiven zur Verwaltung von Eigentum durch Kryptographie mit öffentlichen Schlüsseln mit einem Konsensalgorithmus kombinierte, um nachzuverfolgen, wem Coins gehören, bekannt als „Proof-of-Work (PoW)“.

Der Mechanismus hinter Proof-of-Work war ein Durchbruch in diesem Bereich, da er gleichzeitig zwei Probleme löste. Erstens bot er einen einfachen und mäßig effektiven Konsensalgorithmus, der es den Knoten im Netzwerk ermöglichte, sich kollektiv auf eine Reihe von kanonischen Aktualisierungen für den Zustand des Bitcoin-Ledgers zu einigen. Zweitens bot er einen Mechanismus, der einen freien Eintritt in den Konsensprozess ermöglichte und das politische Problem löste, wer den Konsens beeinflussen darf, während er gleichzeitig Sybil-Angriffe verhinderte. Dies geschieht, indem eine formale Teilnahmebarriere, wie die Anforderung, als eindeutige Entität auf einer bestimmten Liste registriert zu sein, durch eine wirtschaftliche Barriere ersetzt wird – das Gewicht eines einzelnen Knotens im Konsensabstimmungsprozess ist direkt proportional zur Rechenleistung, die der Knoten einbringt. Seitdem wurde ein alternativer Ansatz namens _Proof-of-Stake (PoS)_ vorgeschlagen, bei dem das Gewicht eines Knotens proportional zu seinen Währungsbeständen und nicht zu seinen Rechenressourcen berechnet wird; die Diskussion über die relativen Vorzüge der beiden Ansätze würde den Rahmen dieses Whitepapers sprengen, aber es sollte angemerkt werden, dass beide Ansätze als Rückgrat einer Kryptowährung dienen können.

### Bitcoin als Zustandsübergangssystem {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Aus technischer Sicht kann das Ledger einer Kryptowährung wie Bitcoin als ein Zustandsübergangssystem betrachtet werden, bei dem es einen „Zustand“ gibt, der aus dem Eigentumsstatus aller existierenden Bitcoins besteht, und eine „Zustandsübergangsfunktion“, die einen Zustand und eine Transaktion aufnimmt und einen neuen Zustand als Ergebnis ausgibt. In einem Standard-Bankensystem ist der Zustand beispielsweise eine Bilanz, eine Transaktion ist eine Anfrage, $X von A nach B zu verschieben, und die Zustandsübergangsfunktion reduziert den Wert auf As Konto um $X und erhöht den Wert auf Bs Konto um $X. Wenn As Konto von vornherein weniger als $X aufweist, gibt die Zustandsübergangsfunktion einen Fehler zurück. Daher kann man formal definieren:

```
APPLY(S,TX) -> S' or ERROR
```

In dem oben definierten Bankensystem:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Aber:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Der „Zustand“ in Bitcoin ist die Sammlung aller Coins (technisch gesehen „nicht ausgegebene Transaktionsausgaben“ oder UTXO), die geprägt und noch nicht ausgegeben wurden, wobei jedes UTXO einen Nennwert und einen Eigentümer hat (definiert durch eine 20-Byte-Adresse, die im Wesentlichen ein kryptographischer öffentlicher Schlüssel ist<sup>[fn1](#notes)</sup>). Eine Transaktion enthält eine oder mehrere Eingaben, wobei jede Eingabe einen Verweis auf ein bestehendes UTXO und eine kryptographische Signatur enthält, die durch den privaten Schlüssel erzeugt wurde, der mit der Adresse des Eigentümers verknüpft ist, sowie eine oder mehrere Ausgaben, wobei jede Ausgabe ein neues UTXO enthält, das dem Zustand hinzugefügt werden soll.

Die Zustandsübergangsfunktion `APPLY(S,TX) -> S'` kann grob wie folgt definiert werden:

<ol>
  <li>
    Für jede Eingabe in <code>TX</code>:
    <ul>
    <li>
        Wenn das referenzierte UTXO nicht in <code>S</code> ist, gib einen Fehler zurück.
    </li>
    <li>
        Wenn die bereitgestellte Signatur nicht mit dem Eigentümer des UTXO übereinstimmt, gib einen Fehler zurück.
    </li>
    </ul>
  </li>
  <li>
    Wenn die Summe der Nennwerte aller Eingabe-UTXO kleiner ist als die Summe der Nennwerte aller Ausgabe-UTXO, gib einen Fehler zurück.
  </li>
  <li>
    Gib <code>S</code> zurück, wobei alle Eingabe-UTXO entfernt und alle Ausgabe-UTXO hinzugefügt wurden.
  </li>
</ol>

Die erste Hälfte des ersten Schritts verhindert, dass Transaktionssender Coins ausgeben, die nicht existieren, die zweite Hälfte des ersten Schritts verhindert, dass Transaktionssender die Coins anderer Leute ausgeben, und der zweite Schritt erzwingt die Werterhaltung. Um dies für Zahlungen zu nutzen, sieht das Protokoll wie folgt aus. Angenommen, Alice möchte 11,7 BTC an Bob senden. Zuerst sucht Alice nach einer Menge verfügbarer UTXO, die sie besitzt und die sich auf mindestens 11,7 BTC summieren. Realistischerweise wird Alice nicht genau 11,7 BTC zusammenbekommen; nehmen wir an, das Kleinste, was sie erreichen kann, ist 6+4+2=12. Sie erstellt dann eine Transaktion mit diesen drei Eingaben und zwei Ausgaben. Die erste Ausgabe wird 11,7 BTC mit Bobs Adresse als Eigentümer sein, und die zweite Ausgabe wird das verbleibende „Wechselgeld“ von 0,3 BTC sein, dessen Eigentümerin Alice selbst ist.

### Mining {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Wenn wir Zugang zu einem vertrauenswürdigen zentralisierten Dienst hätten, wäre dieses System trivial zu implementieren; es könnte einfach genau wie beschrieben programmiert werden, wobei die Festplatte eines zentralisierten Servers verwendet wird, um den Zustand nachzuverfolgen. Mit Bitcoin versuchen wir jedoch, ein dezentrales Währungssystem aufzubauen, daher müssen wir das Zustandstransaktionssystem mit einem Konsenssystem kombinieren, um sicherzustellen, dass sich alle über die Reihenfolge der Transaktionen einig sind. Der dezentrale Konsensprozess von Bitcoin erfordert, dass Knoten im Netzwerk kontinuierlich versuchen, Pakete von Transaktionen zu produzieren, die „Blöcke“ genannt werden. Das Netzwerk soll etwa alle zehn Minuten einen Block produzieren, wobei jeder Block einen Zeitstempel, eine Nonce, einen Verweis auf (d. h. den Hash von) den vorherigen Block und eine Liste aller Transaktionen enthält, die seit dem vorherigen Block stattgefunden haben. Im Laufe der Zeit entsteht so eine persistente, stetig wachsende „Blockchain“, die sich ständig aktualisiert, um den neuesten Zustand des Bitcoin-Ledgers darzustellen.

Der Algorithmus zur Überprüfung, ob ein Block gültig ist, ausgedrückt in diesem Paradigma, lautet wie folgt:

1. Überprüfe, ob der vom Block referenzierte vorherige Block existiert und gültig ist.
2. Überprüfe, ob der Zeitstempel des Blocks größer ist als der des vorherigen Blocks<sup>[fn2](#notes)</sup> und weniger als 2 Stunden in der Zukunft liegt.
3. Überprüfe, ob der Proof-of-Work auf dem Block gültig ist.
4. Sei `S[0]` der Zustand am Ende des vorherigen Blocks.
5. Angenommen, `TX` ist die Transaktionsliste des Blocks mit `n` Transaktionen. Für alle `i` in `0...n-1` setze `S[i+1] = APPLY(S[i],TX[i])`. Wenn eine Anwendung einen Fehler zurückgibt, brich ab und gib false zurück.
6. Gib true zurück und registriere `S[n]` als den Zustand am Ende dieses Blocks.

Im Wesentlichen muss jede Transaktion im Block einen gültigen Zustandsübergang von dem, was der kanonische Zustand vor der Ausführung der Transaktion war, zu einem neuen Zustand bereitstellen. Beachte, dass der Zustand in keiner Weise im Block kodiert ist; er ist rein eine Abstraktion, die sich der validierende Knoten merken muss, und kann für jeden Block nur (sicher) berechnet werden, indem man vom Genesis-Zustand ausgeht und sequenziell jede Transaktion in jedem Block anwendet. Beachte außerdem, dass die Reihenfolge, in der der Miner Transaktionen in den Block aufnimmt, von Bedeutung ist; wenn es zwei Transaktionen A und B in einem Block gibt, sodass B ein von A erstelltes UTXO ausgibt, dann ist der Block gültig, wenn A vor B kommt, andernfalls jedoch nicht.

Die einzige in der obigen Liste vorhandene Gültigkeitsbedingung, die in anderen Systemen nicht zu finden ist, ist die Anforderung für „Proof-of-Work“. Die genaue Bedingung ist, dass der doppelte SHA-256-Hash jedes Blocks, behandelt als 256-Bit-Zahl, kleiner sein muss als ein dynamisch angepasstes Ziel, das zum Zeitpunkt des Schreibens dieses Textes bei etwa 2<sup>187</sup> liegt. Der Zweck davon ist es, die Blockerstellung rechnerisch „schwer“ zu machen und dadurch Sybil-Angreifer daran zu hindern, die gesamte Blockchain zu ihren Gunsten neu zu erstellen. Da SHA-256 als völlig unvorhersehbare pseudozufällige Funktion konzipiert ist, besteht die einzige Möglichkeit, einen gültigen Block zu erstellen, schlichtweg in Versuch und Irrtum, indem die Nonce wiederholt inkrementiert wird und geprüft wird, ob der neue Hash übereinstimmt.

Beim aktuellen Ziel von ~2<sup>187</sup> muss das Netzwerk durchschnittlich ~2<sup>69</sup> Versuche unternehmen, bevor ein gültiger Block gefunden wird; im Allgemeinen wird das Ziel vom Netzwerk alle 2016 Blöcke neu kalibriert, sodass im Durchschnitt alle zehn Minuten ein neuer Block von irgendeinem Knoten im Netzwerk produziert wird. Um die Miner für diese Rechenarbeit zu entschädigen, ist der Miner jedes Blocks berechtigt, eine Transaktion einzuschließen, die ihm selbst 25 BTC aus dem Nichts gibt. Zusätzlich geht, wenn eine Transaktion in ihren Eingaben einen höheren Gesamtnennwert hat als in ihren Ausgaben, die Differenz ebenfalls als „Transaktionsgebühr“ an den Miner. Nebenbei bemerkt ist dies auch der einzige Mechanismus, durch den BTC emittiert werden; der Genesis-Zustand enthielt überhaupt keine Coins.

Um den Zweck des Minings besser zu verstehen, wollen wir untersuchen, was im Falle eines böswilligen Angreifers passiert. Da die zugrunde liegende Kryptographie von Bitcoin als sicher bekannt ist, wird der Angreifer auf den einzigen Teil des Bitcoin-Systems abzielen, der nicht direkt durch Kryptographie geschützt ist: die Reihenfolge der Transaktionen. Die Strategie des Angreifers ist einfach:

1. Sende 100 BTC an einen Händler im Austausch für ein Produkt (vorzugsweise ein schnell lieferbares digitales Gut).
2. Warte auf die Lieferung des Produkts.
3. Erzeuge eine weitere Transaktion, die dieselben 100 BTC an ihn selbst sendet.
4. Versuche, das Netzwerk davon zu überzeugen, dass seine Transaktion an sich selbst diejenige war, die zuerst kam.

Sobald Schritt (1) stattgefunden hat, wird nach einigen Minuten ein Miner die Transaktion in einen Block aufnehmen, sagen wir Blocknummer 270000. Nach etwa einer Stunde werden der Chain nach diesem Block fünf weitere Blöcke hinzugefügt worden sein, wobei jeder dieser Blöcke indirekt auf die Transaktion verweist und sie somit „bestätigt“. Zu diesem Zeitpunkt wird der Händler die Zahlung als endgültig akzeptieren und das Produkt liefern; da wir davon ausgehen, dass es sich um ein digitales Gut handelt, erfolgt die Lieferung sofort. Nun erstellt der Angreifer eine weitere Transaktion, die die 100 BTC an ihn selbst sendet. Wenn der Angreifer sie einfach in das Netzwerk einspeist, wird die Transaktion nicht verarbeitet; Miner werden versuchen, `APPLY(S,TX)` auszuführen, und feststellen, dass `TX` ein UTXO verbraucht, das sich nicht mehr im Zustand befindet. Stattdessen erstellt der Angreifer also einen „Fork“ der Blockchain, indem er zunächst eine andere Version von Block 270000 minet, die auf denselben Block 269999 als übergeordneten Block verweist, jedoch mit der neuen Transaktion anstelle der alten. Da die Blockdaten unterschiedlich sind, erfordert dies eine erneute Durchführung des Proof-of-Work. Darüber hinaus hat die neue Version von Block 270000 des Angreifers einen anderen Hash, sodass die ursprünglichen Blöcke 270001 bis 270005 nicht darauf „verweisen“; somit sind die ursprüngliche Chain und die neue Chain des Angreifers vollständig voneinander getrennt. Die Regel besagt, dass bei einem Fork die längste Blockchain als die Wahrheit angesehen wird, und so werden legitime Miner an der 270005-Chain arbeiten, während der Angreifer allein an der 270000-Chain arbeitet. Damit der Angreifer seine Blockchain zur längsten machen kann, müsste er über mehr Rechenleistung verfügen als der Rest des Netzwerks zusammen, um aufzuholen (daher „51%-Angriff“).

### Merkle-Bäume {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Links: Es reicht aus, nur eine kleine Anzahl von Knoten in einem Merkle-Baum zu präsentieren, um einen Beweis für die Gültigkeit eines Zweigs zu erbringen._

_Rechts: Jeder Versuch, einen Teil des Merkle-Baums zu ändern, wird unweigerlich zu einer Inkonsistenz irgendwo weiter oben in der Chain führen._

Ein wichtiges Skalierbarkeitsmerkmal von Bitcoin ist, dass der Block in einer mehrstufigen Datenstruktur gespeichert wird. Der „Hash“ eines Blocks ist eigentlich nur der Hash des Block-Headers, ein etwa 200 Byte großes Datenstück, das den Zeitstempel, die Nonce, den Hash des vorherigen Blocks und den Root-Hash einer Datenstruktur namens Merkle-Baum enthält, die alle Transaktionen im Block speichert. Ein Merkle-Baum ist eine Art Binärbaum, der aus einer Menge von Knoten besteht, mit einer großen Anzahl von Blattknoten am unteren Ende des Baums, die die zugrunde liegenden Daten enthalten, einer Menge von Zwischenknoten, bei denen jeder Knoten der Hash seiner beiden Kinder ist, und schließlich einem einzigen Wurzelknoten, der ebenfalls aus dem Hash seiner beiden Kinder gebildet wird und die „Spitze“ des Baums darstellt. Der Zweck des Merkle-Baums besteht darin, zu ermöglichen, dass die Daten in einem Block stückweise geliefert werden: Ein Knoten kann nur den Header eines Blocks aus einer Quelle herunterladen, den kleinen Teil des Baums, der für ihn relevant ist, aus einer anderen Quelle, und dennoch sicher sein, dass alle Daten korrekt sind. Der Grund, warum dies funktioniert, ist, dass sich Hashes nach oben fortpflanzen: Wenn ein böswilliger Benutzer versucht, eine gefälschte Transaktion am unteren Ende eines Merkle-Baums einzuschleusen, wird diese Änderung eine Änderung im Knoten darüber verursachen, und dann eine Änderung im Knoten darüber, was schließlich die Wurzel des Baums und damit den Hash des Blocks ändert, wodurch das Protokoll ihn als einen völlig anderen Block registriert (fast sicher mit einem ungültigen Proof-of-Work).

Das Merkle-Baum-Protokoll ist wohl unerlässlich für die langfristige Nachhaltigkeit. Ein „Full Node“ im Bitcoin-Netzwerk, der die Gesamtheit jedes Blocks speichert und verarbeitet, beansprucht im Bitcoin-Netzwerk mit Stand April 2014 etwa 15 GB Speicherplatz und wächst um über ein Gigabyte pro Monat. Derzeit ist dies für einige Desktop-Computer machbar, nicht jedoch für Telefone, und in Zukunft werden nur noch Unternehmen und Bastler teilnehmen können. Ein Protokoll, das als „Simplified Payment Verification“ (SPV) bekannt ist, ermöglicht die Existenz einer weiteren Klasse von Knoten, den sogenannten „Light Nodes“, die die Block-Header herunterladen, den Proof-of-Work auf den Block-Headern verifizieren und dann nur die „Zweige“ herunterladen, die mit für sie relevanten Transaktionen verbunden sind. Dies ermöglicht es Light Nodes, mit einer starken Sicherheitsgarantie den Status jeder Bitcoin-Transaktion und ihren aktuellen Kontostand zu bestimmen, während sie nur einen sehr kleinen Teil der gesamten Blockchain herunterladen.

### Alternative Blockchain-Anwendungen {#alternative-blockchain-applications}

Die Idee, die zugrunde liegende Blockchain-Idee auf andere Konzepte anzuwenden, hat ebenfalls eine lange Geschichte. Im Jahr 2005 stellte Nick Szabo das Konzept der „[sicheren Eigentumstitel mit Eigentümerautorität](https://nakamotoinstitute.org/library/secure-property-titles/)“ vor, ein Dokument, das beschreibt, wie „neue Fortschritte in der replizierten Datenbanktechnologie“ ein Blockchain-basiertes System zur Speicherung eines Registers darüber ermöglichen werden, wem welches Land gehört, und so einen ausgeklügelten Rahmen schaffen, der Konzepte wie Homesteading, Ersitzung und die georgianische Grundsteuer umfasst. Leider war zu dieser Zeit jedoch kein effektives repliziertes Datenbanksystem verfügbar, und so wurde das Protokoll nie in der Praxis implementiert. Nach 2009 jedoch, als der dezentrale Konsens von Bitcoin entwickelt war, begannen schnell eine Reihe alternativer Anwendungen aufzutauchen.

- **Namecoin** – 2010 erstellt, lässt sich [Namecoin](https://namecoin.org/) am besten als eine dezentrale Namensregistrierungsdatenbank beschreiben. In dezentralen Protokollen wie Tor, Bitcoin und BitMessage muss es eine Möglichkeit geben, Konten zu identifizieren, damit andere Personen mit ihnen interagieren können, aber in allen bestehenden Lösungen ist die einzige verfügbare Art von Identifikator ein pseudozufälliger Hash wie `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealerweise möchte man ein Konto mit einem Namen wie „george“ haben können. Das Problem ist jedoch, dass, wenn eine Person ein Konto namens „george“ erstellen kann, jemand anderes denselben Prozess nutzen kann, um „george“ ebenfalls für sich selbst zu registrieren und sich als diese Person auszugeben. Die einzige Lösung ist ein First-to-File-Paradigma, bei dem der erste Registrierende erfolgreich ist und der zweite scheitert – ein Problem, das perfekt für das Bitcoin-Konsensprotokoll geeignet ist. Namecoin ist die älteste und erfolgreichste Implementierung eines Namensregistrierungssystems, das eine solche Idee nutzt.
- **Colored Coins** – der Zweck von [Colored Coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) besteht darin, als Protokoll zu dienen, das es Menschen ermöglicht, ihre eigenen digitalen Währungen – oder, im wichtigen trivialen Fall einer Währung mit einer Einheit, digitale Token – auf der Bitcoin-Blockchain zu erstellen. Im Colored-Coins-Protokoll „emittiert“ man eine neue Währung, indem man einem bestimmten Bitcoin-UTXO öffentlich eine Farbe zuweist, und das Protokoll definiert rekursiv die Farbe anderer UTXO als dieselbe wie die Farbe der Eingaben, die die Transaktion, die sie erstellt hat, ausgegeben hat (im Falle von gemischtfarbigen Eingaben gelten einige Sonderregeln). Dies ermöglicht es Benutzern, Wallets zu führen, die nur UTXO einer bestimmten Farbe enthalten, und diese ähnlich wie reguläre Bitcoins zu versenden, wobei sie durch die Blockchain zurückverfolgen, um die Farbe jedes UTXO zu bestimmen, das sie erhalten.
- **Metacoins** – die Idee hinter einem Metacoin ist es, ein Protokoll zu haben, das auf Bitcoin aufbaut und Bitcoin-Transaktionen verwendet, um Metacoin-Transaktionen zu speichern, aber eine andere Zustandsübergangsfunktion, `APPLY'`, hat. Da das Metacoin-Protokoll nicht verhindern kann, dass ungültige Metacoin-Transaktionen in der Bitcoin-Blockchain erscheinen, wird eine Regel hinzugefügt, dass das Protokoll auf `APPLY'(S,TX) = S` zurückfällt, wenn `APPLY'(S,TX)` einen Fehler zurückgibt. Dies bietet einen einfachen Mechanismus zur Erstellung eines beliebigen Kryptowährungsprotokolls, potenziell mit erweiterten Funktionen, die innerhalb von Bitcoin selbst nicht implementiert werden können, aber mit sehr geringen Entwicklungskosten, da die Komplexitäten von Mining und Netzwerk bereits durch das Bitcoin-Protokoll gehandhabt werden. Metacoins wurden verwendet, um einige Klassen von Finanzverträgen, Namensregistrierungen und dezentralen Börsen zu implementieren.

Somit gibt es im Allgemeinen zwei Ansätze zum Aufbau eines Konsensprotokolls: den Aufbau eines unabhängigen Netzwerks und den Aufbau eines Protokolls auf Bitcoin. Der erstere Ansatz ist zwar im Falle von Anwendungen wie Namecoin einigermaßen erfolgreich, aber schwer zu implementieren; jede einzelne Implementierung muss eine unabhängige Blockchain bootstrappen sowie den gesamten notwendigen Zustandsübergangs- und Netzwerkcode erstellen und testen. Zusätzlich prognostizieren wir, dass die Menge der Anwendungen für dezentrale Konsenstechnologie einer Potenzverteilung folgen wird, bei der die überwiegende Mehrheit der Anwendungen zu klein wäre, um eine eigene Blockchain zu rechtfertigen, und wir stellen fest, dass es große Klassen von dezentralen Anwendungen gibt, insbesondere dezentrale autonome Organisationen, die miteinander interagieren müssen.

Der Bitcoin-basierte Ansatz hingegen hat den Fehler, dass er die Simplified-Payment-Verification-Funktionen von Bitcoin nicht erbt. SPV funktioniert für Bitcoin, weil es die Blockchain-Tiefe als Proxy für die Gültigkeit verwenden kann; ab einem bestimmten Punkt, wenn die Vorfahren einer Transaktion weit genug zurückreichen, kann man mit Sicherheit sagen, dass sie legitimerweise Teil des Zustands waren. Blockchain-basierte Meta-Protokolle hingegen können die Blockchain nicht zwingen, Transaktionen nicht aufzunehmen, die im Kontext ihrer eigenen Protokolle nicht gültig sind. Daher müsste eine vollständig sichere SPV-Meta-Protokoll-Implementierung bis zum Anfang der Bitcoin-Blockchain zurückscannen, um festzustellen, ob bestimmte Transaktionen gültig sind oder nicht. Derzeit verlassen sich alle „Light“-Implementierungen von Bitcoin-basierten Meta-Protokollen auf einen vertrauenswürdigen Server, um die Daten bereitzustellen, was wohl ein höchst suboptimales Ergebnis ist, insbesondere wenn einer der Hauptzwecke einer Kryptowährung darin besteht, die Notwendigkeit von Vertrauen zu beseitigen.

### Scripting {#scripting}

Selbst ohne jegliche Erweiterungen ermöglicht das Bitcoin-Protokoll tatsächlich eine schwache Version eines Konzepts von „Smart Contracts“. UTXO in Bitcoin können nicht nur einem öffentlichen Schlüssel gehören, sondern auch einem komplizierteren Skript, das in einer einfachen Stack-basierten Programmiersprache ausgedrückt wird. In diesem Paradigma muss eine Transaktion, die dieses UTXO ausgibt, Daten bereitstellen, die das Skript erfüllen. Tatsächlich wird sogar der grundlegende Eigentumsmechanismus für öffentliche Schlüssel über ein Skript implementiert: Das Skript nimmt eine Signatur einer elliptischen Kurve als Eingabe, verifiziert sie gegen die Transaktion und die Adresse, der das UTXO gehört, und gibt 1 zurück, wenn die Verifizierung erfolgreich ist, und andernfalls 0. Andere, kompliziertere Skripte existieren für verschiedene zusätzliche Anwendungsfälle. Beispielsweise kann man ein Skript konstruieren, das zur Validierung Signaturen von zwei von drei gegebenen privaten Schlüsseln erfordert („Multisig“), ein Setup, das für Firmenkonten, sichere Sparkonten und einige Händler-Treuhand-Situationen nützlich ist. Skripte können auch verwendet werden, um Kopfgelder für Lösungen von Rechenproblemen zu zahlen, und man kann sogar ein Skript konstruieren, das in etwa besagt: „Dieses Bitcoin-UTXO gehört dir, wenn du einen SPV-Beweis erbringen kannst, dass du mir eine Dogecoin-Transaktion in dieser Stückelung gesendet hast“, was im Wesentlichen einen dezentralen kryptowährungsübergreifenden Austausch ermöglicht.

Die in Bitcoin implementierte Skriptsprache weist jedoch einige wichtige Einschränkungen auf:

- **Fehlende Turing-Vollständigkeit** – das heißt, obwohl es eine große Teilmenge von Berechnungen gibt, die die Bitcoin-Skriptsprache unterstützt, unterstützt sie bei weitem nicht alles. Die Hauptkategorie, die fehlt, sind Schleifen. Dies geschieht, um Endlosschleifen während der Transaktionsverifizierung zu vermeiden; theoretisch ist es ein überwindbares Hindernis für Skriptprogrammierer, da jede Schleife simuliert werden kann, indem der zugrunde liegende Code einfach viele Male mit einer if-Anweisung wiederholt wird, aber es führt zu Skripten, die sehr platzineffizient sind. Beispielsweise würde die Implementierung eines alternativen Signaturalgorithmus für elliptische Kurven wahrscheinlich 256 wiederholte Multiplikationsrunden erfordern, die alle einzeln in den Code aufgenommen werden müssten.
- **Wertblindheit** – es gibt keine Möglichkeit für ein UTXO-Skript, eine feingranulare Kontrolle über den Betrag zu bieten, der abgehoben werden kann. Ein leistungsstarker Anwendungsfall für einen Orakel-Vertrag wäre beispielsweise ein Absicherungsvertrag, bei dem A und B BTC im Wert von 1000 $ einzahlen und das Skript nach 30 Tagen BTC im Wert von 1000 $ an A und den Rest an B sendet. Dies würde ein Orakel erfordern, um den Wert von 1 BTC in USD zu bestimmen, aber selbst dann ist es eine massive Verbesserung in Bezug auf Vertrauen und Infrastrukturanforderungen gegenüber den vollständig zentralisierten Lösungen, die derzeit verfügbar sind. Da UTXO jedoch nach dem Alles-oder-Nichts-Prinzip funktionieren, besteht die einzige Möglichkeit, dies zu erreichen, in dem sehr ineffizienten Hack, viele UTXO mit unterschiedlichen Nennwerten zu haben (z. B. ein UTXO von 2<sup>k</sup> für jedes k bis 30) und das Orakel auswählen zu lassen, welche UTXO an A und welche an B gesendet werden.
- **Fehlender Zustand** – UTXO können entweder ausgegeben oder nicht ausgegeben sein; es gibt keine Möglichkeit für mehrstufige Verträge oder Skripte, die darüber hinaus einen anderen internen Zustand beibehalten. Dies macht es schwierig, mehrstufige Optionsverträge, dezentrale Tauschangebote oder zweistufige kryptographische Commitment-Protokolle (notwendig für sichere Rechenkopfgelder) zu erstellen. Es bedeutet auch, dass UTXO nur verwendet werden können, um einfache, einmalige Verträge zu erstellen, und nicht komplexere „zustandsbehaftete“ Verträge wie dezentrale Organisationen, und macht die Implementierung von Meta-Protokollen schwierig. Ein binärer Zustand in Kombination mit Wertblindheit bedeutet auch, dass eine weitere wichtige Anwendung, nämlich Abhebungslimits, unmöglich ist.
- **Blockchain-Blindheit** – UTXO sind blind gegenüber Blockchain-Daten wie der Nonce, dem Zeitstempel und dem Hash des vorherigen Blocks. Dies schränkt Anwendungen im Glücksspiel und in mehreren anderen Kategorien stark ein, indem der Skriptsprache eine potenziell wertvolle Quelle für Zufälligkeit entzogen wird.

Somit sehen wir drei Ansätze zum Aufbau fortschrittlicher Anwendungen auf Basis von Kryptowährungen: den Aufbau einer neuen Blockchain, die Verwendung von Scripting auf Bitcoin und den Aufbau eines Meta-Protokolls auf Bitcoin. Der Aufbau einer neuen Blockchain ermöglicht unbegrenzte Freiheit beim Aufbau eines Funktionsumfangs, jedoch auf Kosten von Entwicklungszeit, Bootstrapping-Aufwand und Sicherheit. Die Verwendung von Scripting ist einfach zu implementieren und zu standardisieren, aber in ihren Fähigkeiten sehr begrenzt, und Meta-Protokolle leiden, obwohl sie einfach sind, unter Mängeln in der Skalierbarkeit. Mit Ethereum beabsichtigen wir, ein alternatives Framework aufzubauen, das noch größere Vorteile bei der Entwicklungsfreundlichkeit sowie noch stärkere Light-Client-Eigenschaften bietet, während es gleichzeitig Anwendungen ermöglicht, ein wirtschaftliches Umfeld und die Blockchain-Sicherheit zu teilen.

## Ethereum {#ethereum}

Das Ziel von Ethereum ist es, ein alternatives Protokoll für die Entwicklung dezentraler Anwendungen (Dapps) zu schaffen. Es bietet andere Kompromisse, von denen wir glauben, dass sie für eine große Klasse dezentraler Anwendungen sehr nützlich sein werden. Besonderer Wert wird dabei auf Situationen gelegt, in denen eine schnelle Entwicklungszeit, Sicherheit für kleine und selten genutzte Anwendungen sowie die Fähigkeit verschiedener Anwendungen, sehr effizient miteinander zu interagieren, wichtig sind. Ethereum erreicht dies durch den Aufbau der im Grunde ultimativen abstrakten Basisschicht: einer Blockchain mit einer integrierten Turing-vollständigen Programmiersprache. Diese ermöglicht es jedem, Smart Contracts und dezentrale Anwendungen zu schreiben, in denen eigene, beliebige Regeln für Eigentum, Transaktionsformate und Zustandsübergangsfunktionen erstellt werden können. Eine rudimentäre Version von Namecoin kann in zwei Codezeilen geschrieben werden, und andere Protokolle wie Währungen und Reputationssysteme können in weniger als zwanzig Zeilen erstellt werden. Smart Contracts, kryptographische „Boxen“, die Werte enthalten und diese nur freigeben, wenn bestimmte Bedingungen erfüllt sind, können ebenfalls auf der Plattform aufgebaut werden. Sie bieten weitaus mehr Leistung als das Bitcoin-Scripting, da sie zusätzlich über Turing-Vollständigkeit, Wertebewusstsein, Blockchain-Bewusstsein und Zustand verfügen.

### Ethereum-Konten {#ethereum-accounts}

In Ethereum besteht der Zustand aus Objekten, die „Konten“ genannt werden. Jedes Konto hat eine 20-Byte-Adresse, und Zustandsübergänge sind direkte Transfers von Werten und Informationen zwischen Konten. Ein Ethereum-Konto enthält vier Felder:

- Die **Nonce**, ein Zähler, der sicherstellt, dass jede Transaktion nur einmal verarbeitet werden kann
- Das aktuelle **Ether-Guthaben** des Kontos
- Der **Vertragscode** (Contract-Code) des Kontos, falls vorhanden
- Der **Speicher** (Storage) des Kontos (standardmäßig leer)

„Ether“ ist der wichtigste interne Krypto-Treibstoff von Ethereum und wird zur Zahlung von Transaktionsgebühren verwendet. Im Allgemeinen gibt es zwei Arten von Konten: **extern besessene Konten**, die durch private Schlüssel kontrolliert werden, und **Contract-Konten**, die durch ihren Vertragscode kontrolliert werden. Ein extern besessenes Konto hat keinen Code, und man kann Nachrichten von einem extern besessenen Konto senden, indem man eine Transaktion erstellt und signiert. Bei einem Contract-Konto wird jedes Mal, wenn das Contract-Konto eine Nachricht empfängt, dessen Code aktiviert. Dies ermöglicht es ihm, in den internen Speicher zu lesen und zu schreiben, andere Nachrichten zu senden oder seinerseits Verträge zu erstellen.

Beachten Sie, dass „Verträge“ in Ethereum nicht als etwas angesehen werden sollten, das „erfüllt“ oder „eingehalten“ werden muss. Vielmehr sind sie wie „autonome Agenten“, die innerhalb der Ethereum-Ausführungsumgebung leben, immer einen bestimmten Codeabschnitt ausführen, wenn sie durch eine Nachricht oder Transaktion „angestupst“ werden, und direkte Kontrolle über ihr eigenes Ether-Guthaben sowie ihren eigenen Schlüssel-Wert-Speicher haben, um persistente Variablen zu verfolgen.

### Nachrichten und Transaktionen {#messages-and-transactions}

Der Begriff „Transaktion“ wird in Ethereum verwendet, um sich auf das signierte Datenpaket zu beziehen, das eine Nachricht speichert, die von einem extern besessenen Konto gesendet werden soll. Transaktionen enthalten:

- Den Empfänger der Nachricht
- Eine Signatur, die den Absender identifiziert
- Die Menge an Ether, die vom Absender an den Empfänger transferiert werden soll
- Ein optionales Datenfeld
- Einen `STARTGAS`-Wert, der die maximale Anzahl an Rechenschritten darstellt, die die Ausführung der Transaktion in Anspruch nehmen darf
- Einen `GASPRICE`-Wert, der die Gebühr darstellt, die der Absender pro Rechenschritt zahlt

Die ersten drei sind Standardfelder, die in jeder Kryptowährung erwartet werden. Das Datenfeld hat standardmäßig keine Funktion, aber die virtuelle Maschine verfügt über einen Opcode, mit dem ein Vertrag auf die Daten zugreifen kann. Als Anwendungsbeispiel: Wenn ein Vertrag als Onchain-Domain-Registrierungsdienst fungiert, möchte er die an ihn übergebenen Daten möglicherweise so interpretieren, dass sie zwei „Felder“ enthalten, wobei das erste Feld eine zu registrierende Domain und das zweite Feld die IP-Adresse ist, auf die sie registriert werden soll. Der Vertrag würde diese Werte aus den Nachrichtendaten lesen und sie entsprechend im Speicher ablegen.

Die Felder `STARTGAS` und `GASPRICE` sind entscheidend für Ethereums Anti-Denial-of-Service-Modell. Um versehentliche oder feindliche Endlosschleifen oder andere Rechenverschwendung im Code zu verhindern, muss jede Transaktion ein Limit dafür festlegen, wie viele Rechenschritte der Codeausführung sie nutzen darf. Die grundlegende Recheneinheit ist „Gas“; normalerweise kostet ein Rechenschritt 1 Gas, aber einige Operationen kosten höhere Mengen an Gas, weil sie rechenintensiver sind oder die Datenmenge erhöhen, die als Teil des Zustands gespeichert werden muss. Es gibt auch eine Gebühr von 5 Gas für jedes Byte in den Transaktionsdaten. Das Ziel des Gebührensystems ist es, von einem Angreifer zu verlangen, proportional für jede Ressource zu bezahlen, die er verbraucht, einschließlich Rechenleistung, Bandbreite und Speicher. Daher muss jede Transaktion, die dazu führt, dass das Netzwerk eine größere Menge einer dieser Ressourcen verbraucht, eine Gasgebühr haben, die in etwa proportional zur Zunahme ist.

### Nachrichten {#messages}

Verträge haben die Fähigkeit, „Nachrichten“ an andere Verträge zu senden. Nachrichten sind virtuelle Objekte, die niemals serialisiert werden und nur in der Ethereum-Ausführungsumgebung existieren. Eine Nachricht enthält:

- Den Absender der Nachricht (implizit)
- Den Empfänger der Nachricht
- Die Menge an Ether, die zusammen mit der Nachricht transferiert werden soll
- Ein optionales Datenfeld
- Einen `STARTGAS`-Wert

Im Grunde ist eine Nachricht wie eine Transaktion, außer dass sie von einem Vertrag und nicht von einem externen Akteur erzeugt wird. Eine Nachricht wird erzeugt, wenn ein Vertrag, der gerade Code ausführt, den Opcode `CALL` ausführt, welcher eine Nachricht erzeugt und ausführt. Wie eine Transaktion führt eine Nachricht dazu, dass das Empfängerkonto seinen Code ausführt. Somit können Verträge Beziehungen zu anderen Verträgen auf genau dieselbe Weise haben wie externe Akteure.

Beachten Sie, dass die durch eine Transaktion oder einen Vertrag zugewiesene Gasmenge für das gesamte Gas gilt, das von dieser Transaktion und allen Unterausführungen verbraucht wird. Wenn beispielsweise ein externer Akteur A eine Transaktion mit 1000 Gas an B sendet und B 600 Gas verbraucht, bevor er eine Nachricht an C sendet, und die interne Ausführung von C 300 Gas verbraucht, bevor sie zurückkehrt, dann kann B weitere 100 Gas ausgeben, bevor ihm das Gas ausgeht.

### Ethereum-Zustandsübergangsfunktion {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Die Ethereum-Zustandsübergangsfunktion `APPLY(S,TX) -> S'` kann wie folgt definiert werden:

1. Überprüfen, ob die Transaktion wohlgeformt ist (d. h. die richtige Anzahl von Werten hat), die Signatur gültig ist und die Nonce mit der Nonce im Konto des Absenders übereinstimmt. Wenn nicht, einen Fehler zurückgeben.
2. Die Transaktionsgebühr als `STARTGAS * GASPRICE` berechnen und die Absenderadresse aus der Signatur ermitteln. Die Gebühr vom Kontostand des Absenders abziehen und die Nonce des Absenders inkrementieren. Wenn nicht genügend Guthaben zum Ausgeben vorhanden ist, einen Fehler zurückgeben.
3. `GAS = STARTGAS` initialisieren und eine bestimmte Menge Gas pro Byte abziehen, um für die Bytes in der Transaktion zu bezahlen.
4. Den Transaktionswert vom Konto des Absenders auf das Empfängerkonto transferieren. Wenn das Empfängerkonto noch nicht existiert, dieses erstellen. Wenn das Empfängerkonto ein Vertrag ist, den Code des Vertrags entweder bis zum Abschluss ausführen oder bis der Ausführung das Gas ausgeht.
5. Wenn der Werttransfer fehlgeschlagen ist, weil der Absender nicht genügend Geld hatte, oder der Codeausführung das Gas ausgegangen ist, alle Zustandsänderungen mit Ausnahme der Zahlung der Gebühren rückgängig machen und die Gebühren dem Konto des Miners hinzufügen.
6. Andernfalls die Gebühren für das gesamte verbleibende Gas an den Absender zurückerstatten und die für das verbrauchte Gas gezahlten Gebühren an den Miner senden.

Angenommen, der Code des Vertrags lautet beispielsweise:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Beachten Sie, dass der Vertragscode in der Realität im Low-Level-EVM-Code geschrieben ist; dieses Beispiel ist der Übersichtlichkeit halber in Serpent, einer unserer High-Level-Sprachen, geschrieben und kann in EVM-Code kompiliert werden. Angenommen, der Speicher des Vertrags ist anfangs leer, und es wird eine Transaktion mit einem Wert von 10 Ether, 2000 Gas, einem Gaspreis von 0,001 Ether und 64 Bytes an Daten gesendet, wobei die Bytes 0-31 die Zahl `2` und die Bytes 32-63 die Zeichenfolge `CHARLIE` darstellen<sup>[fn3](#notes)</sup>. Der Prozess für die Zustandsübergangsfunktion sieht in diesem Fall wie folgt aus:

1. Überprüfen, ob die Transaktion gültig und wohlgeformt ist.
2. Überprüfen, ob der Absender der Transaktion mindestens 2000 \* 0,001 = 2 Ether hat. Wenn dies der Fall ist, 2 Ether vom Konto des Absenders abziehen.
3. Gas = 2000 initialisieren; unter der Annahme, dass die Transaktion 170 Bytes lang ist und die Byte-Gebühr 5 beträgt, 850 abziehen, sodass noch 1150 Gas übrig sind.
4. Weitere 10 Ether vom Konto des Absenders abziehen und dem Konto des Vertrags hinzufügen.
5. Den Code ausführen. In diesem Fall ist das einfach: Er überprüft, ob der Speicher des Vertrags am Index `2` verwendet wird, stellt fest, dass dies nicht der Fall ist, und setzt daher den Speicher am Index `2` auf den Wert `CHARLIE`. Angenommen, dies kostet 187 Gas, dann beträgt die verbleibende Gasmenge 1150 - 187 = 963.
6. 963 \* 0,001 = 0,963 Ether wieder dem Konto des Absenders hinzufügen und den resultierenden Zustand zurückgeben.

Wenn es am Empfangsende der Transaktion keinen Vertrag gäbe, dann wäre die gesamte Transaktionsgebühr einfach gleich dem angegebenen `GASPRICE` multipliziert mit der Länge der Transaktion in Bytes, und die zusammen mit der Transaktion gesendeten Daten wären irrelevant.

Beachten Sie, dass Nachrichten in Bezug auf das Rückgängigmachen (Reverts) äquivalent zu Transaktionen funktionieren: Wenn einer Nachrichtenausführung das Gas ausgeht, dann wird die Ausführung dieser Nachricht und alle anderen durch diese Ausführung ausgelösten Ausführungen rückgängig gemacht, aber übergeordnete Ausführungen müssen nicht rückgängig gemacht werden. Das bedeutet, dass es für einen Vertrag „sicher“ ist, einen anderen Vertrag aufzurufen, denn wenn A B mit G Gas aufruft, verliert die Ausführung von A garantiert höchstens G Gas. Beachten Sie schließlich, dass es einen Opcode, `CREATE`, gibt, der einen Vertrag erstellt; seine Ausführungsmechanik ist im Allgemeinen ähnlich wie bei `CALL`, mit der Ausnahme, dass die Ausgabe der Ausführung den Code eines neu erstellten Vertrags bestimmt.

### Codeausführung {#code-execution}

Der Code in Ethereum-Verträgen ist in einer Low-Level-, Stack-basierten Bytecode-Sprache geschrieben, die als „Ethereum Virtual Machine Code“ oder „EVM-Code“ bezeichnet wird. Der Code besteht aus einer Reihe von Bytes, wobei jedes Byte eine Operation darstellt. Im Allgemeinen ist die Codeausführung eine Endlosschleife, die darin besteht, wiederholt die Operation am aktuellen Programmzähler (der bei null beginnt) auszuführen und dann den Programmzähler um eins zu inkrementieren, bis das Ende des Codes erreicht ist oder ein Fehler oder eine `STOP`- oder `RETURN`-Anweisung erkannt wird. Die Operationen haben Zugriff auf drei Arten von Speicherplatz, um Daten zu speichern:

- Den **Stack**, einen Last-In-First-Out-Container, auf den Werte gelegt und von dem sie geholt werden können
- Den **Memory** (Arbeitsspeicher), ein unendlich erweiterbares Byte-Array
- Den langfristigen **Speicher** (Storage) des Vertrags, einen Schlüssel-Wert-Speicher. Im Gegensatz zu Stack und Memory, die nach Ende der Berechnung zurückgesetzt werden, bleibt der Storage langfristig bestehen.

Der Code kann auch auf den Wert, den Absender und die Daten der eingehenden Nachricht sowie auf Block-Header-Daten zugreifen, und der Code kann auch ein Byte-Array von Daten als Ausgabe zurückgeben.

Das formale Ausführungsmodell von EVM-Code ist überraschend einfach. Während die Ethereum Virtual Machine läuft, kann ihr vollständiger Rechenzustand durch das Tupel `(block_state, transaction, message, code, memory, stack, pc, gas)` definiert werden, wobei `block_state` der globale Zustand ist, der alle Konten enthält und Guthaben sowie Speicher umfasst. Zu Beginn jeder Ausführungsrunde wird die aktuelle Anweisung gefunden, indem das `pc`-te Byte von `code` genommen wird (oder 0, wenn `pc >= len(code)`), und jede Anweisung hat ihre eigene Definition in Bezug darauf, wie sie das Tupel beeinflusst. Beispielsweise holt `ADD` zwei Elemente vom Stack und legt ihre Summe darauf ab, reduziert `gas` um 1 und inkrementiert `pc` um 1, und `SSTORE` holt die obersten zwei Elemente vom Stack und fügt das zweite Element in den Speicher des Vertrags an dem durch das erste Element angegebenen Index ein. Obwohl es viele Möglichkeiten gibt, die Ausführung der Ethereum Virtual Machine durch Just-in-Time-Kompilierung zu optimieren, kann eine grundlegende Implementierung von Ethereum in wenigen hundert Codezeilen erfolgen.

### Blockchain und Mining {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Die Ethereum-Blockchain ist der Bitcoin-Blockchain in vielerlei Hinsicht ähnlich, weist jedoch einige Unterschiede auf. Der Hauptunterschied zwischen Ethereum und Bitcoin in Bezug auf die Blockchain-Architektur besteht darin, dass Ethereum-Blöcke im Gegensatz zu Bitcoin eine Kopie sowohl der Transaktionsliste als auch des aktuellsten Zustands enthalten. Abgesehen davon werden auch zwei weitere Werte, die Blocknummer und die Schwierigkeit, im Block gespeichert. Der grundlegende Algorithmus zur Blockvalidierung in Ethereum sieht wie folgt aus:

1. Überprüfen, ob der referenzierte vorherige Block existiert und gültig ist.
2. Überprüfen, ob der Zeitstempel des Blocks größer ist als der des referenzierten vorherigen Blocks und weniger als 15 Minuten in der Zukunft liegt.
3. Überprüfen, ob die Blocknummer, die Schwierigkeit, die Transaction Root, die Uncle Root und das Gaslimit (verschiedene Low-Level-Ethereum-spezifische Konzepte) gültig sind.
4. Überprüfen, ob der Proof-of-Work auf dem Block gültig ist.
5. Sei `S[0]` der Zustand am Ende des vorherigen Blocks.
6. Sei `TX` die Transaktionsliste des Blocks mit `n` Transaktionen. Für alle `i` in `0...n-1` setze `S[i+1] = APPLY(S[i],TX[i])`. Wenn eine Anwendung einen Fehler zurückgibt oder wenn das gesamte im Block bis zu diesem Punkt verbrauchte Gas das `GASLIMIT` überschreitet, einen Fehler zurückgeben.
7. Sei `S_FINAL` gleich `S[n]`, jedoch zuzüglich der an den Miner gezahlten Blockbelohnung.
8. Überprüfen, ob die Merkle-Baum-Wurzel des Zustands `S_FINAL` gleich der im Block-Header angegebenen finalen State Root ist. Wenn dies der Fall ist, ist der Block gültig; andernfalls ist er ungültig.

Der Ansatz mag auf den ersten Blick sehr ineffizient erscheinen, da er den gesamten Zustand mit jedem Block speichern muss, aber in der Realität sollte die Effizienz mit der von Bitcoin vergleichbar sein. Der Grund dafür ist, dass der Zustand in der Baumstruktur gespeichert wird und nach jedem Block nur ein kleiner Teil des Baums geändert werden muss. Daher sollte im Allgemeinen zwischen zwei benachbarten Blöcken die überwiegende Mehrheit des Baums gleich sein, und folglich können die Daten einmal gespeichert und zweimal über Zeiger (d. h. Hashes von Teilbäumen) referenziert werden. Um dies zu erreichen, wird eine spezielle Art von Baum verwendet, der als „Patricia-Baum“ bekannt ist. Dies beinhaltet eine Modifikation des Merkle-Baum-Konzepts, die es ermöglicht, Knoten effizient einzufügen und zu löschen und nicht nur zu ändern. Da außerdem alle Zustandsinformationen Teil des letzten Blocks sind, besteht keine Notwendigkeit, die gesamte Blockchain-Historie zu speichern – eine Strategie, die, wenn sie auf Bitcoin angewendet werden könnte, rechnerisch eine 5- bis 20-fache Platzersparnis bieten würde.

Eine häufig gestellte Frage ist, „wo“ Vertragscode in Bezug auf physische Hardware ausgeführt wird. Darauf gibt es eine einfache Antwort: Der Prozess der Ausführung von Vertragscode ist Teil der Definition der Zustandsübergangsfunktion, die Teil des Algorithmus zur Blockvalidierung ist. Wenn also eine Transaktion in Block `B` hinzugefügt wird, wird die durch diese Transaktion ausgelöste Codeausführung von allen Knoten – jetzt und in Zukunft – ausgeführt, die Block `B` herunterladen und validieren.

## Anwendungen {#applications}

Im Allgemeinen gibt es drei Arten von Anwendungen auf Ethereum. Die erste Kategorie sind Finanzanwendungen, die den Nutzern leistungsfähigere Möglichkeiten bieten, ihr Geld zu verwalten und Verträge damit abzuschließen. Dazu gehören Unterwährungen, Finanzderivate, Absicherungsverträge (Hedging), Spar-Wallets, Testamente und letztendlich sogar einige Arten von vollwertigen Arbeitsverträgen. Die zweite Kategorie sind semi-finanzielle Anwendungen, bei denen zwar Geld im Spiel ist, es aber auch eine starke nicht-monetäre Seite bei dem gibt, was getan wird; ein perfektes Beispiel sind selbstausführende Belohnungen (Bounties) für Lösungen von Rechenproblemen. Schließlich gibt es Anwendungen wie Online-Abstimmungen und dezentrale Governance, die überhaupt nicht finanzieller Natur sind.

### Token-Systeme {#token-systems}

Onchain-Token-Systeme haben viele Anwendungen, die von Unterwährungen, die Vermögenswerte wie USD oder Gold repräsentieren, über Unternehmensaktien, individuelle Token, die Smart Property (intelligentes Eigentum) darstellen, sichere, fälschungssichere Coupons bis hin zu Token-Systemen reichen, die überhaupt keine Bindung an konventionelle Werte haben und als Punktesysteme für Anreize verwendet werden. Token-Systeme sind in Ethereum überraschend einfach zu implementieren. Der wichtigste Punkt, den man verstehen muss, ist, dass eine Währung oder ein Token-System im Grunde nur eine Datenbank mit einer einzigen Operation ist: Subtrahiere X Einheiten von A und gib X Einheiten an B, unter der Voraussetzung, dass (i) A vor der Transaktion mindestens X Einheiten hatte und (2) die Transaktion von A genehmigt wird. Alles, was zur Implementierung eines Token-Systems erforderlich ist, ist die Implementierung dieser Logik in einen Vertrag.

Der grundlegende Code zur Implementierung eines Token-Systems in Serpent sieht wie folgt aus:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Dies ist im Wesentlichen eine wörtliche Implementierung der Zustandsübergangsfunktion des „Bankensystems“, die weiter oben in diesem Dokument beschrieben wurde. Ein paar zusätzliche Codezeilen müssen hinzugefügt werden, um den anfänglichen Schritt der Verteilung der Währungseinheiten überhaupt erst zu ermöglichen, sowie für einige andere Randfälle. Idealerweise würde auch eine Funktion hinzugefügt, die es anderen Verträgen ermöglicht, den Kontostand einer Adresse abzufragen. Aber das ist auch schon alles. Theoretisch können Ethereum-basierte Token-Systeme, die als Unterwährungen fungieren, potenziell eine weitere wichtige Funktion enthalten, die Onchain-Bitcoin-basierten Meta-Währungen fehlt: die Möglichkeit, Transaktionsgebühren direkt in dieser Währung zu bezahlen. Dies würde so implementiert werden, dass der Vertrag ein Ether-Guthaben unterhält, mit dem er dem Sender das zur Zahlung von Gebühren verwendete Ether zurückerstattet, und er würde dieses Guthaben wieder auffüllen, indem er die internen Währungseinheiten, die er als Gebühren einnimmt, sammelt und in einer ständig laufenden Auktion weiterverkauft. Nutzer müssten also ihre Konten mit Ether „aktivieren“, aber sobald das Ether dort ist, wäre es wiederverwendbar, da der Vertrag es jedes Mal zurückerstatten würde.

### Finanzderivate und wertstabile Währungen {#financial-derivatives-and-stable-value-currencies}

Finanzderivate sind die häufigste Anwendung eines „Smart Contracts“ und eine der am einfachsten in Code zu implementierenden. Die größte Herausforderung bei der Implementierung von Finanzverträgen besteht darin, dass die Mehrheit von ihnen einen Bezug zu einem externen Preis-Ticker erfordert; eine sehr wünschenswerte Anwendung ist beispielsweise ein Smart Contract, der gegen die Volatilität von Ether (oder einer anderen Kryptowährung) in Bezug auf den US-Dollar absichert. Dies erfordert jedoch, dass der Vertrag den Wert von ETH/USD kennt. Der einfachste Weg, dies zu tun, ist über einen „Daten-Feed“-Vertrag, der von einer bestimmten Partei (z. B. NASDAQ) gepflegt wird und so konzipiert ist, dass diese Partei die Möglichkeit hat, den Vertrag nach Bedarf zu aktualisieren, und der eine Schnittstelle bietet, die es anderen Verträgen ermöglicht, eine Nachricht an diesen Vertrag zu senden und eine Antwort zurückzuerhalten, die den Preis liefert.

Mit dieser entscheidenden Zutat würde der Absicherungsvertrag wie folgt aussehen:

1. Warte darauf, dass Partei A 1000 Ether einzahlt.
2. Warte darauf, dass Partei B 1000 Ether einzahlt.
3. Speichere den USD-Wert von 1000 Ether, berechnet durch Abfrage des Daten-Feed-Vertrags, im Speicher, sagen wir, dies ist $x.
4. Erlaube A oder B nach 30 Tagen, den Vertrag zu „reaktivieren“, um Ether im Wert von $x (berechnet durch erneute Abfrage des Daten-Feed-Vertrags, um den neuen Preis zu erhalten) an A und den Rest an B zu senden.

Ein solcher Vertrag hätte erhebliches Potenzial im Krypto-Handel. Eines der Hauptprobleme, das im Zusammenhang mit Kryptowährungen genannt wird, ist die Tatsache, dass sie volatil sind; obwohl viele Nutzer und Händler die Sicherheit und Bequemlichkeit des Umgangs mit kryptografischen Vermögenswerten wünschen, möchten sie sich möglicherweise nicht der Aussicht aussetzen, an einem einzigen Tag 23 % des Wertes ihrer Gelder zu verlieren. Bisher waren die am häufigsten vorgeschlagenen Lösungen emittentengestützte Vermögenswerte; die Idee ist, dass ein Emittent eine Unterwährung schafft, in der er das Recht hat, Einheiten auszugeben und zu widerrufen, und jedem eine Einheit der Währung zur Verfügung stellt, der ihm (offline) eine Einheit eines bestimmten Basiswerts (z. B. Gold, USD) zur Verfügung stellt. Der Emittent verspricht dann, jedem, der eine Einheit des Krypto-Assets zurücksendet, eine Einheit des Basiswerts zur Verfügung zu stellen. Dieser Mechanismus ermöglicht es, jeden nicht-kryptografischen Vermögenswert in einen kryptografischen Vermögenswert „aufzuwerten“, vorausgesetzt, dem Emittenten kann vertraut werden.

In der Praxis sind Emittenten jedoch nicht immer vertrauenswürdig, und in einigen Fällen ist die Bankinfrastruktur zu schwach oder zu feindselig, als dass solche Dienste existieren könnten. Finanzderivate bieten eine Alternative. Hier übernimmt anstelle eines einzelnen Emittenten, der die Mittel zur Deckung eines Vermögenswerts bereitstellt, ein dezentraler Markt von Spekulanten diese Rolle, die darauf wetten, dass der Preis eines kryptografischen Referenzwerts (z. B. ETH) steigen wird. Im Gegensatz zu Emittenten haben Spekulanten keine Möglichkeit, ihren Teil der Abmachung nicht einzuhalten, da der Absicherungsvertrag ihre Gelder treuhänderisch verwaltet. Beachten Sie, dass dieser Ansatz nicht vollständig dezentral ist, da immer noch eine vertrauenswürdige Quelle benötigt wird, um den Preis-Ticker bereitzustellen. Man kann jedoch argumentieren, dass dies immer noch eine massive Verbesserung in Bezug auf die Reduzierung der Infrastrukturanforderungen (im Gegensatz zu einem Emittenten erfordert die Ausgabe eines Preis-Feeds keine Lizenzen und kann wahrscheinlich als freie Meinungsäußerung eingestuft werden) und die Verringerung des Betrugspotenzials darstellt.

### Identitäts- und Reputationssysteme {#identity-and-reputation-systems}

Die allererste alternative Kryptowährung, [Namecoin](http://namecoin.org/), versuchte, eine Bitcoin-ähnliche Blockchain zu verwenden, um ein Namensregistrierungssystem bereitzustellen, bei dem Nutzer ihre Namen zusammen mit anderen Daten in einer öffentlichen Datenbank registrieren können. Der am häufigsten genannte Anwendungsfall ist ein [DNS](https://wikipedia.org/wiki/Domain_Name_System)-System, das Domainnamen wie „bitcoin.org“ (oder im Fall von Namecoin „bitcoin.bit“) einer IP-Adresse zuordnet. Weitere Anwendungsfälle umfassen die E-Mail-Authentifizierung und potenziell fortschrittlichere Reputationssysteme. Hier ist der grundlegende Vertrag zur Bereitstellung eines Namecoin-ähnlichen Namensregistrierungssystems auf Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Der Vertrag ist sehr einfach; er ist lediglich eine Datenbank innerhalb des Ethereum-Netzwerks, der Daten hinzugefügt, aber nicht geändert oder daraus entfernt werden können. Jeder kann einen Namen mit einem bestimmten Wert registrieren, und diese Registrierung bleibt dann für immer bestehen. Ein ausgefeilterer Namensregistrierungsvertrag wird auch eine „Funktionsklausel“ haben, die es anderen Verträgen ermöglicht, ihn abzufragen, sowie einen Mechanismus für den „Eigentümer“ (d. h. den ersten Registrierenden) eines Namens, die Daten zu ändern oder das Eigentum zu übertragen. Man kann sogar Reputations- und Web-of-Trust-Funktionen hinzufügen.

### Dezentrale Dateispeicherung {#decentralized-file-storage}

In den letzten Jahren sind eine Reihe beliebter Start-ups für Online-Dateispeicherung entstanden, von denen Dropbox das bekannteste ist. Sie versuchen, Nutzern zu ermöglichen, ein Backup ihrer Festplatte hochzuladen, und lassen den Dienst das Backup speichern und dem Nutzer gegen eine monatliche Gebühr Zugriff darauf gewähren. Zu diesem Zeitpunkt ist der Markt für Dateispeicherung jedoch teilweise relativ ineffizient; ein flüchtiger Blick auf verschiedene bestehende Lösungen zeigt, dass insbesondere auf dem „Uncanny Valley“-Niveau von 20-200 GB, bei dem weder kostenlose Kontingente noch Rabatte auf Unternehmensebene greifen, die monatlichen Preise für Mainstream-Dateispeicherkosten so hoch sind, dass man in einem einzigen Monat mehr als die Kosten für die gesamte Festplatte bezahlt. Ethereum-Verträge können die Entwicklung eines dezentralen Dateispeicher-Ökosystems ermöglichen, in dem einzelne Nutzer kleine Geldbeträge verdienen können, indem sie ihre eigenen Festplatten vermieten, und ungenutzter Speicherplatz genutzt werden kann, um die Kosten für die Dateispeicherung weiter zu senken.

Das wichtigste Fundament eines solchen Systems wäre das, was wir als „dezentralen Dropbox-Vertrag“ bezeichnet haben. Dieser Vertrag funktioniert wie folgt. Zunächst teilt man die gewünschten Daten in Blöcke auf, verschlüsselt jeden Block aus Gründen der Privatsphäre und erstellt daraus einen Merkle-Baum. Dann schließt man einen Vertrag mit der Regel ab, dass der Vertrag alle N Blöcke einen zufälligen Index im Merkle-Baum auswählt (wobei der vorherige Block-Hash, der über den Vertragscode zugänglich ist, als Quelle der Zufälligkeit dient) und der ersten Entität X Ether gibt, die eine Transaktion mit einem Simplified-Payment-Verification-ähnlichen Eigentumsnachweis für den Block an diesem bestimmten Index im Baum liefert. Wenn ein Nutzer seine Datei erneut herunterladen möchte, kann er ein Micropayment-Kanal-Protokoll verwenden (z. B. 1 szabo pro 32 Kilobyte zahlen), um die Datei wiederherzustellen; der gebühreneffizienteste Ansatz besteht darin, dass der Zahler die Transaktion erst am Ende veröffentlicht und stattdessen die Transaktion nach jeweils 32 Kilobyte durch eine etwas lukrativere mit derselben Nonce ersetzt.

Ein wichtiges Merkmal des Protokolls ist, dass man das Risiko, dass viele zufällige Knoten beschließen, die Datei zu vergessen, auf nahezu null reduzieren kann, indem man die Datei durch Secret Sharing in viele Teile aufteilt und die Verträge beobachtet, um zu sehen, ob sich jedes Teil noch im Besitz eines Knotens befindet. Wenn ein Vertrag immer noch Geld auszahlt, liefert dies einen kryptografischen Beweis dafür, dass jemand da draußen die Datei immer noch speichert.

### Dezentrale Autonome Organisationen {#decentralized-autonomous-organizations}

Das allgemeine Konzept einer „dezentralen autonomen Organisation“ ist das einer virtuellen Entität, die eine bestimmte Gruppe von Mitgliedern oder Aktionären hat, die, vielleicht mit einer 67%-Mehrheit, das Recht haben, die Gelder der Entität auszugeben und ihren Code zu ändern. Die Mitglieder würden gemeinsam darüber entscheiden, wie die Organisation ihre Mittel zuweisen soll. Methoden zur Zuweisung der Mittel einer DAO könnten von Bounties und Gehältern bis hin zu noch exotischeren Mechanismen wie einer internen Währung zur Belohnung von Arbeit reichen. Dies repliziert im Wesentlichen die rechtlichen Rahmenbedingungen eines traditionellen Unternehmens oder einer gemeinnützigen Organisation, verwendet jedoch zur Durchsetzung ausschließlich kryptografische Blockchain-Technologie. Bisher drehte sich ein Großteil der Diskussionen um DAOs um das „kapitalistische“ Modell einer „dezentralen autonomen Körperschaft“ (DAC) mit dividendenberechtigten Aktionären und handelbaren Aktien; eine Alternative, die vielleicht als „dezentrale autonome Gemeinschaft“ beschrieben werden könnte, würde vorsehen, dass alle Mitglieder den gleichen Anteil an der Entscheidungsfindung haben und 67 % der bestehenden Mitglieder zustimmen müssen, um ein Mitglied hinzuzufügen oder zu entfernen. Die Anforderung, dass eine Person nur eine Mitgliedschaft haben kann, müsste dann von der Gruppe kollektiv durchgesetzt werden.

Ein allgemeiner Überblick darüber, wie man eine DAO programmiert, sieht wie folgt aus. Das einfachste Design ist schlichtweg ein Stück selbstmodifizierender Code, der sich ändert, wenn zwei Drittel der Mitglieder einer Änderung zustimmen. Obwohl Code theoretisch unveränderlich ist, kann man dies leicht umgehen und eine De-facto-Veränderbarkeit erreichen, indem man Teile des Codes in separaten Verträgen hat und die Adresse der aufzurufenden Verträge im modifizierbaren Speicher ablegt. In einer einfachen Implementierung eines solchen DAO-Vertrags gäbe es drei Transaktionstypen, die sich durch die in der Transaktion bereitgestellten Daten unterscheiden:

- `[0,i,K,V]`, um einen Vorschlag mit dem Index `i` zu registrieren, um die Adresse am Speicherindex `K` auf den Wert `V` zu ändern
- `[1,i]`, um eine Stimme für den Vorschlag `i` zu registrieren
- `[2,i]`, um den Vorschlag `i` endgültig zu machen, wenn genügend Stimmen abgegeben wurden

Der Vertrag hätte dann Klauseln für jeden dieser Fälle. Er würde eine Aufzeichnung aller offenen Speicheränderungen führen, zusammen mit einer Liste derer, die dafür gestimmt haben. Er hätte auch eine Liste aller Mitglieder. Wenn eine Speicheränderung von zwei Dritteln der Mitglieder befürwortet wird, könnte eine abschließende Transaktion die Änderung ausführen. Ein ausgefeilteres Grundgerüst hätte auch eine integrierte Abstimmungsfunktion für Funktionen wie das Senden einer Transaktion, das Hinzufügen von Mitgliedern und das Entfernen von Mitgliedern und könnte sogar eine Delegation von Stimmen im Stil der [Liquid Democracy](https://wikipedia.org/wiki/Liquid_democracy) vorsehen (d. h. jeder kann jemanden beauftragen, für ihn abzustimmen, und die Zuweisung ist transitiv, d. h. wenn A B beauftragt und B C beauftragt, dann bestimmt C die Stimme von A). Dieses Design würde es der DAO ermöglichen, organisch als dezentrale Gemeinschaft zu wachsen, sodass die Menschen die Aufgabe, herauszufiltern, wer ein Mitglied ist, schließlich an Spezialisten delegieren können. Im Gegensatz zum „aktuellen System“ können Spezialisten jedoch im Laufe der Zeit leicht auftauchen und wieder verschwinden, wenn einzelne Gemeindemitglieder ihre Ausrichtung ändern.

Ein alternatives Modell ist das einer dezentralen Körperschaft, bei der jedes Konto null oder mehr Aktien haben kann und zwei Drittel der Aktien erforderlich sind, um eine Entscheidung zu treffen. Ein vollständiges Grundgerüst würde Vermögensverwaltungsfunktionen, die Möglichkeit, ein Angebot zum Kauf oder Verkauf von Aktien abzugeben, und die Möglichkeit, Angebote anzunehmen (vorzugsweise mit einem Order-Matching-Mechanismus innerhalb des Vertrags), umfassen. Delegation würde auch im Stil der Liquid Democracy existieren und das Konzept eines „Verwaltungsrats“ verallgemeinern.

### Weitere Anwendungen {#further-applications}

**1. Spar-Wallets**. Angenommen, Alice möchte ihre Gelder sicher aufbewahren, macht sich aber Sorgen, dass sie ihren privaten Schlüssel verliert oder jemand ihn hackt. Sie zahlt Ether in einen Vertrag mit Bob, einer Bank, wie folgt ein:

- Alice allein kann maximal 1 % der Gelder pro Tag abheben.
- Bob allein kann maximal 1 % der Gelder pro Tag abheben, aber Alice hat die Möglichkeit, mit ihrem Schlüssel eine Transaktion durchzuführen, die diese Fähigkeit abschaltet.
- Alice und Bob zusammen können alles abheben.

Normalerweise reicht 1 % pro Tag für Alice aus, und wenn Alice mehr abheben möchte, kann sie Bob um Hilfe bitten. Wenn Alices Schlüssel gehackt wird, rennt sie zu Bob, um die Gelder in einen neuen Vertrag zu verschieben. Wenn sie ihren Schlüssel verliert, wird Bob die Gelder schließlich herausholen. Wenn sich herausstellt, dass Bob böswillig ist, kann sie seine Fähigkeit zum Abheben abschalten.

**2. Ernteversicherung**. Man kann leicht einen Finanzderivatvertrag abschließen, aber anstelle eines Preisindex einen Daten-Feed des Wetters verwenden. Wenn ein Landwirt in Iowa ein Derivat kauft, das umgekehrt proportional zum Niederschlag in Iowa auszahlt, erhält der Landwirt bei einer Dürre automatisch Geld, und wenn es genug regnet, ist der Landwirt glücklich, weil seine Ernte gut gedeihen würde. Dies kann generell auf Naturkatastrophenversicherungen ausgeweitet werden.

**3. Ein dezentraler Daten-Feed**. Für finanzielle Differenzkontrakte könnte es tatsächlich möglich sein, den Daten-Feed über ein Protokoll namens „[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)“ zu dezentralisieren. SchellingCoin funktioniert im Grunde wie folgt: N Parteien geben alle den Wert eines bestimmten Datums (z. B. den ETH/USD-Preis) in das System ein, die Werte werden sortiert, und jeder zwischen dem 25. und 75. Perzentil erhält einen Token als Belohnung. Jeder hat den Anreiz, die Antwort zu geben, die alle anderen geben werden, und der einzige Wert, auf den sich eine große Anzahl von Spielern realistischerweise einigen kann, ist der offensichtliche Standard: die Wahrheit. Dies schafft ein dezentrales Protokoll, das theoretisch eine beliebige Anzahl von Werten liefern kann, einschließlich des ETH/USD-Preises, der Temperatur in Berlin oder sogar des Ergebnisses einer bestimmten komplexen Berechnung.

**4. Smartes Multisig-Treuhandkonto**. Bitcoin ermöglicht Multisig-Transaktionsverträge, bei denen beispielsweise drei von fünf bestimmten Schlüsseln die Gelder ausgeben können. Ethereum ermöglicht mehr Granularität; zum Beispiel können vier von fünf alles ausgeben, drei von fünf können bis zu 10 % pro Tag ausgeben und zwei von fünf können bis zu 0,5 % pro Tag ausgeben. Darüber hinaus ist Ethereum-Multisig asynchron – zwei Parteien können ihre Signaturen zu unterschiedlichen Zeiten auf der Blockchain registrieren, und die letzte Signatur sendet die Transaktion automatisch.

**5. Cloud-Computing**. Die EVM-Technologie kann auch verwendet werden, um eine verifizierbare Computerumgebung zu schaffen, die es Nutzern ermöglicht, andere zu bitten, Berechnungen durchzuführen, und dann optional Beweise dafür anzufordern, dass Berechnungen an bestimmten zufällig ausgewählten Kontrollpunkten korrekt durchgeführt wurden. Dies ermöglicht die Schaffung eines Cloud-Computing-Marktes, an dem jeder Nutzer mit seinem Desktop, Laptop oder spezialisierten Server teilnehmen kann, und Stichprobenprüfungen zusammen mit Sicherheitsleistungen können verwendet werden, um sicherzustellen, dass das System vertrauenswürdig ist (d. h. Knoten können nicht profitabel betrügen). Obwohl ein solches System möglicherweise nicht für alle Aufgaben geeignet ist; Aufgaben, die beispielsweise ein hohes Maß an Interprozesskommunikation erfordern, können nicht einfach auf einer großen Cloud von Knoten ausgeführt werden. Andere Aufgaben sind jedoch viel einfacher zu parallelisieren; Projekte wie SETI@home, folding@home und genetische Algorithmen können problemlos auf einer solchen Plattform implementiert werden.

**6. Peer-to-Peer-Glücksspiel**. Eine beliebige Anzahl von Peer-to-Peer-Glücksspielprotokollen, wie z. B. [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) von Frank Stajano und Richard Clayton, kann auf der Ethereum-Blockchain implementiert werden. Das einfachste Glücksspielprotokoll ist eigentlich nur ein Differenzkontrakt auf den nächsten Block-Hash, und darauf aufbauend können fortschrittlichere Protokolle entwickelt werden, wodurch Glücksspieldienste mit Gebühren nahe null entstehen, die keine Möglichkeit zum Betrügen haben.

**7. Prognosemärkte**. Vorausgesetzt, es gibt ein Orakel oder SchellingCoin, sind Prognosemärkte ebenfalls einfach zu implementieren, und Prognosemärkte zusammen mit SchellingCoin könnten sich als die erste Mainstream-Anwendung von [Futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) als Governance-Protokoll für dezentrale Organisationen erweisen.

**8. Dezentrale Onchain-Marktplätze**, die das Identitäts- und Reputationssystem als Basis nutzen.

## Verschiedenes und Bedenken {#miscellanea-and-concerns}

### Modifizierte GHOST-Implementierung {#modified-ghost-implementation}

Das „Greedy Heaviest Observed Subtree“ (GHOST)-Protokoll ist eine Innovation, die erstmals von Yonatan Sompolinsky und Aviv Zohar im [Dezember 2013](https://eprint.iacr.org/2013/881.pdf) vorgestellt wurde. Die Motivation hinter GHOST ist, dass Blockchains mit schnellen Bestätigungszeiten derzeit unter einer verringerten Sicherheit aufgrund einer hohen Stale-Rate (Rate veralteter Blöcke) leiden – da Blöcke eine gewisse Zeit benötigen, um sich im Netzwerk zu verbreiten (Blockverbreitung). Wenn Miner A einen Block minet und Miner B zufällig einen weiteren Block minet, bevor sich der Block von Miner A zu B verbreitet hat, wird der Block von Miner B letztendlich verschwendet und trägt nicht zur Netzwerksicherheit bei. Darüber hinaus gibt es ein Zentralisierungsproblem: Wenn Miner A ein Mining-Pool mit 30 % Hash-Leistung ist und B 10 % Hash-Leistung hat, hat A in 70 % der Fälle das Risiko, einen Stale-Block zu produzieren (da A in den anderen 30 % der Fälle den letzten Block produziert hat und somit sofort Mining-Daten erhält), während B in 90 % der Fälle das Risiko hat, einen Stale-Block zu produzieren. Wenn das Blockintervall also kurz genug ist, damit die Stale-Rate hoch ist, wird A allein aufgrund seiner Größe wesentlich effizienter sein. Durch die Kombination dieser beiden Effekte führen Blockchains, die Blöcke schnell produzieren, sehr wahrscheinlich dazu, dass ein Mining-Pool einen ausreichend großen Prozentsatz der Netzwerk-Hash-Leistung besitzt, um de facto die Kontrolle über den Mining-Prozess zu haben.

Wie von Sompolinsky und Zohar beschrieben, löst GHOST das erste Problem des Verlusts der Netzwerksicherheit, indem es Stale-Blöcke in die Berechnung einbezieht, welche Chain die „längste“ ist; das heißt, nicht nur der übergeordnete Block (Parent) und weitere Vorfahren eines Blocks, sondern auch die veralteten Nachkommen des Vorfahren des Blocks (im Ethereum-Jargon „Uncles“ genannt) werden in die Berechnung einbezogen, welcher Block durch den größten gesamten Proof-of-Work (PoW) gestützt wird. Um das zweite Problem der Zentralisierungstendenz zu lösen, gehen wir über das von Sompolinsky und Zohar beschriebene Protokoll hinaus und gewähren auch Stale-Blöcken Blockbelohnungen: Ein Stale-Block erhält 87,5 % seiner Basisbelohnung, und der Neffe (Nephew), der den Stale-Block einschließt, erhält die restlichen 12,5 %. Transaktionsgebühren werden jedoch nicht an Uncles vergeben.

Ethereum implementiert eine vereinfachte Version von GHOST, die nur sieben Ebenen nach unten geht. Im Einzelnen ist sie wie folgt definiert:

- Ein Block muss einen Parent (Elternblock) angeben und er muss 0 oder mehr Uncles angeben.
- Ein in Block B enthaltener Uncle muss die folgenden Eigenschaften aufweisen:
  - Er muss ein direktes Kind des Vorfahren der k-ten Generation von B sein, wobei `2 <= k <= 7`.
  - Er darf kein Vorfahre von B sein.
  - Ein Uncle muss ein gültiger Block-Header sein, muss aber kein zuvor verifizierter oder gar gültiger Block sein.
  - Ein Uncle muss sich von allen Uncles unterscheiden, die in vorherigen Blöcken enthalten sind, sowie von allen anderen Uncles, die im selben Block enthalten sind (keine doppelte Einbeziehung).
- Für jeden Uncle U in Block B erhält der Miner von B zusätzlich 3,125 % zu seiner Coinbase-Belohnung und der Miner von U erhält 93,75 % einer Standard-Coinbase-Belohnung.

Diese eingeschränkte Version von GHOST, bei der Uncles nur bis zu 7 Generationen einbezogen werden können, wurde aus zwei Gründen verwendet. Erstens würde ein unbegrenztes GHOST zu viele Komplikationen in die Berechnung einbringen, welche Uncles für einen bestimmten Block gültig sind. Zweitens beseitigt ein unbegrenztes GHOST mit Kompensation, wie es in Ethereum verwendet wird, den Anreiz für einen Miner, auf der Haupt-Chain und nicht auf der Chain eines öffentlichen Angreifers zu minen.

### Gebühren {#fees}

Da jede in der Blockchain veröffentlichte Transaktion dem Netzwerk die Kosten für das Herunterladen und Verifizieren auferlegt, bedarf es eines Regulierungsmechanismus, der typischerweise Transaktionsgebühren beinhaltet, um Missbrauch zu verhindern. Der Standardansatz, der bei Bitcoin verwendet wird, besteht darin, rein freiwillige Gebühren zu haben und sich darauf zu verlassen, dass Miner als Gatekeeper fungieren und dynamische Minima festlegen. Dieser Ansatz wurde in der Bitcoin-Community sehr positiv aufgenommen, insbesondere weil er „marktbasiert“ ist und es Angebot und Nachfrage zwischen Minern und Transaktionssendern ermöglicht, den Preis zu bestimmen. Das Problem bei dieser Argumentation ist jedoch, dass die Transaktionsverarbeitung kein Markt ist; obwohl es intuitiv attraktiv ist, die Transaktionsverarbeitung als eine Dienstleistung aufzufassen, die der Miner dem Sender anbietet, muss in der Realität jede Transaktion, die ein Miner einschließt, von jedem Knoten im Netzwerk verarbeitet werden. Daher wird die überwiegende Mehrheit der Kosten für die Transaktionsverarbeitung von Dritten getragen und nicht von dem Miner, der die Entscheidung trifft, ob sie eingeschlossen wird oder nicht. Daher ist es sehr wahrscheinlich, dass Probleme der Tragik der Allmende (Tragedy of the Commons) auftreten.

Wie sich jedoch herausstellt, hebt sich dieser Fehler im marktbasierten Mechanismus unter einer bestimmten ungenauen vereinfachenden Annahme auf magische Weise selbst auf. Das Argument lautet wie folgt. Angenommen, dass:

1. Eine Transaktion führt zu `k` Operationen und bietet jedem Miner, der sie einschließt, die Belohnung `kR`, wobei `R` vom Sender festgelegt wird und `k` sowie `R` für den Miner im Voraus (grob) sichtbar sind.
2. Eine Operation verursacht für jeden Knoten Verarbeitungskosten in Höhe von `C` (d. h. alle Knoten haben die gleiche Effizienz).
3. Es gibt `N` Mining-Knoten, jeder mit exakt gleicher Verarbeitungsleistung (d. h. `1/N` der Gesamtleistung).
4. Es existieren keine Full Nodes, die kein Mining betreiben.

Ein Miner wäre bereit, eine Transaktion zu verarbeiten, wenn die erwartete Belohnung größer als die Kosten ist. Somit beträgt die erwartete Belohnung `kR/N`, da der Miner eine Chance von `1/N` hat, den nächsten Block zu verarbeiten, und die Verarbeitungskosten für den Miner betragen einfach `kC`. Daher werden Miner Transaktionen einschließen, bei denen `kR/N > kC` oder `R > NC` gilt. Beachten Sie, dass `R` die vom Sender bereitgestellte Gebühr pro Operation ist und somit eine untere Grenze für den Nutzen darstellt, den der Sender aus der Transaktion zieht, und `NC` die Kosten für das gesamte Netzwerk zusammen für die Verarbeitung einer Operation sind. Daher haben Miner den Anreiz, nur solche Transaktionen einzuschließen, bei denen der gesamte utilitaristische Nutzen die Kosten übersteigt.

In der Realität gibt es jedoch einige wichtige Abweichungen von diesen Annahmen:

1. Der Miner zahlt tatsächlich höhere Kosten für die Verarbeitung der Transaktion als die anderen verifizierenden Knoten, da die zusätzliche Verifizierungszeit die Blockverbreitung verzögert und somit die Wahrscheinlichkeit erhöht, dass der Block zu einem Stale-Block wird.
2. Es existieren durchaus Full Nodes, die kein Mining betreiben.
3. Die Verteilung der Mining-Leistung kann in der Praxis radikal ungleich ausfallen.
4. Spekulanten, politische Feinde und Verrückte, deren Nutzenfunktion darin besteht, dem Netzwerk Schaden zuzufügen, existieren tatsächlich, und sie können geschickt Verträge aufsetzen, bei denen ihre Kosten viel niedriger sind als die Kosten, die von anderen verifizierenden Knoten gezahlt werden.

(1) sorgt für eine Tendenz des Miners, weniger Transaktionen einzuschließen, und
(2) erhöht `NC`; daher heben sich diese beiden Effekte zumindest teilweise gegenseitig
auf.<sup>[Wie?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) und (4) sind das Hauptproblem; um sie zu lösen, führen wir einfach eine
gleitende Obergrenze ein: Kein Block darf mehr Operationen aufweisen als das
`BLK_LIMIT_FACTOR`-fache des langfristigen exponentiellen gleitenden Durchschnitts.
Im Einzelnen:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` und `EMA_FACTOR` sind Konstanten, die vorerst auf 65536 und 1,5 gesetzt werden, aber nach weiterer Analyse wahrscheinlich geändert werden.

Es gibt einen weiteren Faktor, der große Blockgrößen bei Bitcoin unattraktiv macht: Große Blöcke benötigen länger für die Verbreitung und haben daher eine höhere Wahrscheinlichkeit, zu Stale-Blöcken zu werden. In Ethereum können Blöcke mit hohem Gasverbrauch ebenfalls länger für die Verbreitung benötigen, sowohl weil sie physisch größer sind als auch weil die Verarbeitung der Transaktions-Zustandsübergänge zur Validierung länger dauert. Dieser Verzögerungsnachteil ist bei Bitcoin ein wesentlicher Aspekt, bei Ethereum aufgrund des GHOST-Protokolls jedoch weniger; daher bietet das Verlassen auf regulierte Blocklimits eine stabilere Basis.

### Berechnung und Turing-Vollständigkeit {#computation-and-turing-completeness}

Ein wichtiger Hinweis ist, dass die Ethereum Virtual Machine (EVM) Turing-vollständig ist; das bedeutet, dass EVM-Code jede erdenkliche Berechnung codieren kann, einschließlich Endlosschleifen. EVM-Code ermöglicht Schleifen auf zwei Arten. Erstens gibt es eine `JUMP`-Anweisung, die es dem Programm ermöglicht, zu einer vorherigen Stelle im Code zurückzuspringen, und eine `JUMPI`-Anweisung für bedingte Sprünge, die Anweisungen wie `while x < 27: x = x * 2` ermöglicht. Zweitens können Verträge andere Verträge aufrufen, was potenziell Schleifen durch Rekursion ermöglicht. Dies führt natürlich zu einem Problem: Können böswillige Benutzer Miner und Full Nodes im Wesentlichen lahmlegen, indem sie sie zwingen, in eine Endlosschleife einzutreten? Das Problem entsteht aufgrund eines in der Informatik als Halteproblem bekannten Problems: Es gibt im allgemeinen Fall keine Möglichkeit zu sagen, ob ein bestimmtes Programm jemals anhalten wird oder nicht.

Wie im Abschnitt über Zustandsübergänge beschrieben, funktioniert unsere Lösung, indem eine Transaktion eine maximale Anzahl von Berechnungsschritten festlegen muss, die sie ausführen darf. Wenn die Ausführung länger dauert, wird die Berechnung rückgängig gemacht, aber die Gebühren werden dennoch bezahlt. Nachrichten funktionieren auf die gleiche Weise. Um die Motivation hinter unserer Lösung zu zeigen, betrachten Sie die folgenden Beispiele:

- Ein Angreifer erstellt einen Vertrag, der eine Endlosschleife ausführt, und sendet dann eine Transaktion, die diese Schleife aktiviert, an den Miner. Der Miner wird die Transaktion verarbeiten, die Endlosschleife ausführen und darauf warten, dass ihr das Gas ausgeht. Auch wenn der Ausführung das Gas ausgeht und sie auf halbem Weg stoppt, ist die Transaktion immer noch gültig und der Miner beansprucht weiterhin die Gebühr vom Angreifer für jeden Berechnungsschritt.
- Ein Angreifer erstellt eine sehr lange Endlosschleife mit der Absicht, den Miner zu zwingen, so lange weiterzurechnen, dass bis zum Abschluss der Berechnung einige weitere Blöcke herausgekommen sind und es für den Miner nicht möglich sein wird, die Transaktion einzuschließen, um die Gebühr zu beanspruchen. Der Angreifer muss jedoch einen Wert für `STARTGAS` übermitteln, der die Anzahl der Berechnungsschritte begrenzt, die die Ausführung dauern kann, sodass der Miner im Voraus weiß, dass die Berechnung eine übermäßig große Anzahl von Schritten erfordern wird.
- Ein Angreifer sieht einen Vertrag mit Code in einer Form wie `send(A,contract.storage[A]); contract.storage[A] = 0` und sendet eine Transaktion mit gerade genug Gas, um den ersten Schritt auszuführen, aber nicht den zweiten (d. h. eine Abhebung vorzunehmen, aber den Kontostand nicht sinken zu lassen). Der Vertragsautor muss sich keine Sorgen um den Schutz vor solchen Angriffen machen, denn wenn die Ausführung auf halbem Weg stoppt, werden die Änderungen rückgängig gemacht.
- Ein Finanzvertrag funktioniert, indem er den Median von neun proprietären Daten-Feeds nimmt, um das Risiko zu minimieren. Ein Angreifer übernimmt einen der Daten-Feeds, der so konzipiert ist, dass er über den im Abschnitt über DAOs beschriebenen Mechanismus für Aufrufe mit variabler Adresse modifizierbar ist, und wandelt ihn so um, dass er eine Endlosschleife ausführt. Dadurch versucht er zu erzwingen, dass allen Versuchen, Gelder aus dem Finanzvertrag zu beanspruchen, das Gas ausgeht. Der Finanzvertrag kann jedoch ein Gaslimit für die Nachricht festlegen, um dieses Problem zu verhindern.

Die Alternative zur Turing-Vollständigkeit ist die Turing-Unvollständigkeit, bei der `JUMP` und `JUMPI` nicht existieren und zu jedem Zeitpunkt nur eine Kopie jedes Vertrags im Aufrufstapel (Call Stack) existieren darf. Mit diesem System wären das beschriebene Gebührensystem und die Unsicherheiten hinsichtlich der Wirksamkeit unserer Lösung möglicherweise nicht erforderlich, da die Kosten für die Ausführung eines Vertrags nach oben durch seine Größe begrenzt wären. Darüber hinaus ist die Turing-Unvollständigkeit gar keine so große Einschränkung; von allen Vertragsbeispielen, die wir intern konzipiert haben, erforderte bisher nur eines eine Schleife, und selbst diese Schleife konnte entfernt werden, indem ein einzeiliges Stück Code 26-mal wiederholt wurde. Angesichts der schwerwiegenden Auswirkungen der Turing-Vollständigkeit und des begrenzten Nutzens, warum nicht einfach eine Turing-unvollständige Sprache verwenden? In der Realität ist die Turing-Unvollständigkeit jedoch weit davon entfernt, eine saubere Lösung für das Problem zu sein. Um zu verstehen, warum, betrachten Sie die folgenden Verträge:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Senden Sie nun eine Transaktion an A. Somit haben wir in 51 Transaktionen einen Vertrag, der 2<sup>50</sup> Berechnungsschritte in Anspruch nimmt. Miner könnten versuchen, solche Logikbomben im Voraus zu erkennen, indem sie neben jedem Vertrag einen Wert pflegen, der die maximale Anzahl von Berechnungsschritten angibt, die er ausführen kann, und dies für Verträge berechnen, die andere Verträge rekursiv aufrufen. Das würde jedoch erfordern, dass Miner Verträge verbieten, die andere Verträge erstellen (da die Erstellung und Ausführung aller 26 obigen Verträge leicht in einem einzigen Vertrag zusammengefasst werden könnte). Ein weiterer problematischer Punkt ist, dass das Adressfeld einer Nachricht eine Variable ist, sodass es im Allgemeinen möglicherweise nicht einmal möglich ist, im Voraus zu sagen, welche anderen Verträge ein bestimmter Vertrag aufrufen wird. Alles in allem kommen wir daher zu einer überraschenden Schlussfolgerung: Turing-Vollständigkeit ist überraschend einfach zu handhaben, und das Fehlen von Turing-Vollständigkeit ist ebenso überraschend schwer zu handhaben, es sei denn, es sind genau dieselben Kontrollen vorhanden – aber warum sollte man das Protokoll in diesem Fall nicht einfach Turing-vollständig lassen?

### Währung und Emission {#currency-and-issuance}

Das Ethereum-Netzwerk enthält seine eigene integrierte Währung, Ether, die dem doppelten Zweck dient, eine primäre Liquiditätsschicht bereitzustellen, um einen effizienten Austausch zwischen verschiedenen Arten von digitalen Vermögenswerten zu ermöglichen, und, was noch wichtiger ist, einen Mechanismus zur Zahlung von Transaktionsgebühren bereitzustellen. Aus Bequemlichkeit und um zukünftige Streitigkeiten zu vermeiden (siehe die aktuelle mBTC/uBTC/Satoshi-Debatte bei Bitcoin), werden die Stückelungen im Voraus benannt:

- 1: Wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: Ether

Dies sollte als erweiterte Version des Konzepts von „Dollar“ und „Cent“ oder „BTC“ und „Satoshi“ verstanden werden. In naher Zukunft erwarten wir, dass „Ether“ für gewöhnliche Transaktionen, „finney“ für Mikrotransaktionen und „szabo“ sowie „Wei“ für technische Diskussionen rund um Gebühren und Protokollimplementierung verwendet werden; die verbleibenden Stückelungen könnten später nützlich werden und sollten zu diesem Zeitpunkt nicht in Clients aufgenommen werden.

Das Emissionsmodell wird wie folgt aussehen:

- Ether wird in einem Währungsverkauf zum Preis von 1000-2000 Ether pro BTC freigegeben, ein Mechanismus, der die Ethereum-Organisation finanzieren und die Entwicklung bezahlen soll und der von anderen Plattformen wie Mastercoin und NXT erfolgreich eingesetzt wurde. Frühere Käufer werden von größeren Rabatten profitieren. Die aus dem Verkauf erhaltenen BTC werden vollständig zur Zahlung von Gehältern und Prämien an Entwickler verwendet und in verschiedene gewinnorientierte und gemeinnützige Projekte im Ethereum- und Kryptowährungs-Ökosystem investiert.
- Das 0,099-fache der verkauften Gesamtmenge (60102216 ETH) wird der Organisation zugewiesen, um frühe Mitwirkende zu entschädigen und auf ETH lautende Ausgaben vor dem Genesis-Block zu bezahlen.
- Das 0,099-fache der verkauften Gesamtmenge wird als langfristige Reserve gehalten.
- Das 0,26-fache der verkauften Gesamtmenge wird ab diesem Zeitpunkt für immer jährlich den Minern zugewiesen.

| Gruppe | Beim Start | Nach 1 Jahr | Nach 5 Jahren |
| ---------------------- | --------- | ------------ | ------------- |
| Währungseinheiten | 1,198X | 1,458X | 2,498X |
| Käufer | 83,5 % | 68,6 % | 40,0 % |
| Vor dem Verkauf ausgegebene Reserve | 8,26 % | 6,79 % | 3,96 % |
| Nach dem Verkauf genutzte Reserve | 8,26 % | 6,79 % | 3,96 % |
| Miner | 0 % | 17,8 % | 52,0 % |

#### Langfristige Wachstumsrate des Angebots (Prozent) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Trotz der linearen Währungsemission tendiert die Wachstumsrate des Angebots im Laufe der Zeit, genau wie bei Bitcoin, dennoch gegen null._

Die beiden Hauptentscheidungen im obigen Modell sind (1) die Existenz und Größe eines Stiftungsfonds (Endowment Pool) und (2) die Existenz eines permanent wachsenden linearen Angebots im Gegensatz zu einem gedeckelten Angebot wie bei Bitcoin. Die Rechtfertigung für den Stiftungsfonds lautet wie folgt. Wenn der Stiftungsfonds nicht existieren würde und die lineare Emission auf das 0,217-fache reduziert würde, um die gleiche Inflationsrate zu erzielen, dann wäre die Gesamtmenge an Ether um 16,5 % geringer und somit wäre jede Einheit um 19,8 % wertvoller. Daher würden im Gleichgewicht 19,8 % mehr Ether im Verkauf gekauft werden, sodass jede Einheit wieder genau so wertvoll wäre wie zuvor. Die Organisation hätte dann auch das 1,198-fache an BTC, was als in zwei Teile aufgeteilt betrachtet werden kann: die ursprünglichen BTC und die zusätzlichen 0,198x. Daher ist diese Situation _exakt äquivalent_ zur Stiftung, jedoch mit einem wichtigen Unterschied: Die Organisation hält ausschließlich BTC und hat somit keinen Anreiz, den Wert der Ether-Einheit zu stützen.

Das Modell des permanenten linearen Angebotswachstums verringert das Risiko dessen, was einige als übermäßige Vermögenskonzentration bei Bitcoin ansehen, und gibt Individuen, die in der heutigen und in zukünftigen Epochen leben, eine faire Chance, Währungseinheiten zu erwerben. Gleichzeitig bleibt ein starker Anreiz erhalten, Ether zu erwerben und zu halten, da die „Wachstumsrate des Angebots“ in Prozent im Laufe der Zeit dennoch gegen null tendiert. Wir stellen auch die Theorie auf, dass, da Coins im Laufe der Zeit durch Unachtsamkeit, Tod usw. immer verloren gehen und der Coin-Verlust als Prozentsatz des Gesamtangebots pro Jahr modelliert werden kann, sich das gesamte im Umlauf befindliche Währungsangebot tatsächlich irgendwann auf einem Wert stabilisieren wird, der der jährlichen Emission geteilt durch die Verlustrate entspricht (z. B. bei einer Verlustrate von 1 %: Sobald das Angebot 26X erreicht, werden jedes Jahr 0,26X geminet und 0,26X gehen verloren, wodurch ein Gleichgewicht entsteht).

Beachten Sie, dass Ethereum in Zukunft aus Sicherheitsgründen wahrscheinlich zu einem Proof-of-Stake (PoS)-Modell wechseln wird, wodurch die Emissionsanforderung auf einen Wert zwischen null und 0,05X pro Jahr sinkt. Für den Fall, dass die Ethereum-Organisation ihre Finanzierung verliert oder aus irgendeinem anderen Grund verschwindet, lassen wir einen „Gesellschaftsvertrag“ (Social Contract) offen: Jeder hat das Recht, eine zukünftige Kandidatenversion von Ethereum zu erstellen, mit der einzigen Bedingung, dass die Menge an Ether höchstens gleich `60102216 * (1.198 + 0.26 * n)` sein darf, wobei `n` die Anzahl der Jahre nach dem Genesis-Block ist. Den Erstellern steht es frei, einen Teil oder die gesamte Differenz zwischen der PoS-gesteuerten Angebotsausweitung und der maximal zulässigen Angebotsausweitung per Crowd-Sale zu verkaufen oder anderweitig zuzuweisen, um die Entwicklung zu bezahlen. Kandidaten-Upgrades, die nicht dem Gesellschaftsvertrag entsprechen, können berechtigterweise in konforme Versionen geforkt werden.

### Mining-Zentralisierung {#mining-centralization}

Der Bitcoin-Mining-Algorithmus funktioniert so, dass Miner SHA-256 auf leicht modifizierten Versionen des Block-Headers millionenfach immer wieder berechnen, bis schließlich ein Knoten eine Version findet, deren Hash kleiner als das Ziel (Target) ist (derzeit etwa 2<sup>192</sup>). Dieser Mining-Algorithmus ist jedoch anfällig für zwei Formen der Zentralisierung. Erstens wird das Mining-Ökosystem mittlerweile von ASICs (anwendungsspezifischen integrierten Schaltungen) dominiert, Computerchips, die für die spezifische Aufgabe des Bitcoin-Minings entwickelt wurden und daher tausendmal effizienter darin sind. Das bedeutet, dass Bitcoin-Mining kein stark dezentrales und egalitäres Unterfangen mehr ist, da Millionen von Dollar an Kapital erforderlich sind, um effektiv daran teilzunehmen. Zweitens führen die meisten Bitcoin-Miner die Blockvalidierung nicht tatsächlich lokal durch; stattdessen verlassen sie sich auf einen zentralisierten Mining-Pool, der die Block-Header bereitstellt. Dieses Problem ist wohl noch schlimmer: Zum Zeitpunkt der Erstellung dieses Dokuments kontrollieren die drei größten Mining-Pools indirekt etwa 50 % der Verarbeitungsleistung im Bitcoin-Netzwerk, obwohl dies durch die Tatsache abgemildert wird, dass Miner zu anderen Mining-Pools wechseln können, wenn ein Pool oder eine Koalition einen 51%-Angriff versucht.

Die derzeitige Absicht bei Ethereum ist es, einen Mining-Algorithmus zu verwenden, bei dem Miner zufällige Daten aus dem Zustand abrufen, einige zufällig ausgewählte Transaktionen aus den letzten N Blöcken in der Blockchain berechnen und den Hash des Ergebnisses zurückgeben müssen. Dies hat zwei wichtige Vorteile. Erstens können Ethereum-Verträge jede Art von Berechnung beinhalten, sodass ein Ethereum-ASIC im Wesentlichen ein ASIC für allgemeine Berechnungen wäre – d. h. eine bessere CPU. Zweitens erfordert das Mining Zugriff auf die gesamte Blockchain, was Miner dazu zwingt, die gesamte Blockchain zu speichern und zumindest in der Lage zu sein, jede Transaktion zu verifizieren. Dies beseitigt die Notwendigkeit zentralisierter Mining-Pools; obwohl Mining-Pools immer noch die legitime Rolle spielen können, die Zufälligkeit der Belohnungsverteilung auszugleichen, kann diese Funktion ebenso gut von Peer-to-Peer-Pools ohne zentrale Kontrolle erfüllt werden.

Dieses Modell ist ungetestet, und es kann auf dem Weg dorthin Schwierigkeiten geben, bestimmte clevere Optimierungen zu vermeiden, wenn die Vertragsausführung als Mining-Algorithmus verwendet wird. Ein besonders interessantes Merkmal dieses Algorithmus ist jedoch, dass er es jedem ermöglicht, „den Brunnen zu vergiften“, indem er eine große Anzahl von Verträgen in die Blockchain einbringt, die speziell darauf ausgelegt sind, bestimmte ASICs zu behindern. Es bestehen wirtschaftliche Anreize für ASIC-Hersteller, einen solchen Trick anzuwenden, um sich gegenseitig anzugreifen. Somit ist die Lösung, die wir entwickeln, letztendlich eher eine adaptive wirtschaftlich-menschliche Lösung als eine rein technische.

### Skalierbarkeit {#scalability}

Ein häufiges Bedenken bezüglich Ethereum ist das Problem der Skalierbarkeit. Wie Bitcoin leidet Ethereum unter dem Mangel, dass jede Transaktion von jedem Knoten im Netzwerk verarbeitet werden muss. Bei Bitcoin liegt die Größe der aktuellen Blockchain bei etwa 15 GB und wächst um etwa 1 MB pro Stunde. Wenn das Bitcoin-Netzwerk die 2000 Transaktionen pro Sekunde von Visa verarbeiten würde, würde es um 1 MB pro drei Sekunden wachsen (1 GB pro Stunde, 8 TB pro Jahr). Ethereum wird wahrscheinlich ein ähnliches Wachstumsmuster aufweisen, das durch die Tatsache verschlimmert wird, dass es viele Anwendungen auf der Ethereum-Blockchain geben wird, anstatt nur einer Währung, wie es bei Bitcoin der Fall ist. Es wird jedoch dadurch abgemildert, dass Ethereum-Full-Nodes nur den Zustand anstelle der gesamten Blockchain-Historie speichern müssen.

Das Problem bei einer so großen Blockchain-Größe ist das Zentralisierungsrisiko. Wenn die Blockchain-Größe auf beispielsweise 100 TB ansteigt, wäre das wahrscheinliche Szenario, dass nur eine sehr kleine Anzahl großer Unternehmen Full Nodes betreiben würde, während alle regulären Benutzer Light-SPV-Knoten verwenden würden. In einer solchen Situation entsteht die potenzielle Sorge, dass sich die Full Nodes zusammenschließen und alle zustimmen könnten, auf irgendeine profitable Weise zu betrügen (z. B. die Blockbelohnung zu ändern, sich selbst BTC zu geben). Light Nodes hätten keine Möglichkeit, dies sofort zu erkennen. Natürlich würde wahrscheinlich mindestens ein ehrlicher Full Node existieren, und nach ein paar Stunden würden Informationen über den Betrug durch Kanäle wie Reddit durchsickern, aber zu diesem Zeitpunkt wäre es zu spät: Es läge an den normalen Benutzern, eine Anstrengung zu organisieren, um die betreffenden Blöcke auf eine schwarze Liste zu setzen – ein massives und wahrscheinlich undurchführbares Koordinationsproblem in einer ähnlichen Größenordnung wie die Durchführung eines erfolgreichen 51%-Angriffs. Im Fall von Bitcoin ist dies derzeit ein Problem, aber es gibt eine von Peter Todd [vorgeschlagene Blockchain-Modifikation](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/), die dieses Problem lindern wird.

Kurzfristig wird Ethereum zwei zusätzliche Strategien anwenden, um dieses Problem zu bewältigen. Erstens wird aufgrund der Blockchain-basierten Mining-Algorithmen zumindest jeder Miner gezwungen sein, ein Full Node zu sein, was eine Untergrenze für die Anzahl der Full Nodes schafft. Zweitens und noch wichtiger werden wir jedoch nach der Verarbeitung jeder Transaktion eine Zwischen-Zustandsbaumwurzel (Intermediate State Tree Root) in die Blockchain aufnehmen. Selbst wenn die Blockvalidierung zentralisiert ist, kann das Zentralisierungsproblem über ein Verifizierungsprotokoll umgangen werden, solange ein ehrlicher verifizierender Knoten existiert. Wenn ein Miner einen ungültigen Block veröffentlicht, muss dieser Block entweder schlecht formatiert sein oder der Zustand `S[n]` ist falsch. Da bekannt ist, dass `S[0]` korrekt ist, muss es einen ersten Zustand `S[i]` geben, der falsch ist, während `S[i-1]` korrekt ist. Der verifizierende Knoten würde den Index `i` zusammen mit einem „Ungültigkeitsnachweis“ (Proof of Invalidity) bereitstellen, der aus der Teilmenge der Patricia-Baum-Knoten besteht, die zur Verarbeitung von `APPLY(S[i-1],TX[i]) -> S[i]` benötigt werden. Knoten wären in der Lage, diese Knoten zu verwenden, um diesen Teil der Berechnung auszuführen, und zu sehen, dass der generierte `S[i]` nicht mit dem bereitgestellten `S[i]` übereinstimmt.

Ein weiterer, raffinierterer Angriff würde beinhalten, dass die böswilligen Miner unvollständige Blöcke veröffentlichen, sodass die vollständigen Informationen nicht einmal existieren, um festzustellen, ob Blöcke gültig sind oder nicht. Die Lösung hierfür ist ein Challenge-Response-Protokoll: Verifizierungsknoten geben „Herausforderungen“ (Challenges) in Form von Ziel-Transaktionsindizes aus, und beim Empfang eines Knotens behandelt ein Light Node den Block als nicht vertrauenswürdig, bis ein anderer Knoten, sei es der Miner oder ein anderer Verifizierer, eine Teilmenge von Patricia-Knoten als Gültigkeitsnachweis bereitstellt.

## Fazit {#conclusion}

Das Ethereum-Protokoll wurde ursprünglich als eine verbesserte Version einer Kryptowährung konzipiert, die über eine stark verallgemeinerte Programmiersprache erweiterte Funktionen wie Onchain-Treuhanddienste, Abhebungslimits, Finanzverträge, Glücksspielmärkte und Ähnliches bietet. Das Ethereum-Protokoll würde keine dieser Anwendungen direkt „unterstützen“, aber die Existenz einer Turing-vollständigen Programmiersprache bedeutet, dass theoretisch beliebige Verträge für jede Art von Transaktion oder Anwendung erstellt werden können. Was an Ethereum jedoch noch interessanter ist, ist die Tatsache, dass das Ethereum-Protokoll weit über eine reine Währung hinausgeht. Protokolle für dezentrale Datenspeicherung, dezentrale Berechnungen und dezentrale Prognosemärkte haben neben Dutzenden anderen derartigen Konzepten das Potenzial, die Effizienz der Computerindustrie erheblich zu steigern und anderen Peer-to-Peer-Protokollen massiven Auftrieb zu verleihen, indem sie zum ersten Mal eine wirtschaftliche Ebene hinzufügen. Schließlich gibt es auch eine beträchtliche Anzahl von Anwendungen, die überhaupt nichts mit Geld zu tun haben.

Das Konzept einer beliebigen Zustandsübergangsfunktion, wie es durch das Ethereum-Protokoll implementiert wird, bietet eine Plattform mit einzigartigem Potenzial; anstatt ein geschlossenes, zweckgebundenes Protokoll zu sein, das für eine bestimmte Reihe von Anwendungen in den Bereichen Datenspeicherung, Glücksspiel oder Finanzen gedacht ist, ist Ethereum konzeptionell offen, und wir glauben, dass es sich hervorragend dazu eignet, in den kommenden Jahren als Basisschicht für eine sehr große Anzahl sowohl finanzieller als auch nicht-finanzieller Protokolle zu dienen.

## Anmerkungen und weiterführende Literatur {#notes-and-further-reading}

### Anmerkungen {#notes}

1. Einem versierten Leser mag auffallen, dass eine Bitcoin-Adresse in Wirklichkeit der Hash des öffentlichen Schlüssels der elliptischen Kurve ist und nicht der öffentliche Schlüssel selbst. Es ist jedoch eine völlig legitime kryptographische Terminologie, den Hash des öffentlichen Schlüssels selbst als öffentlichen Schlüssel zu bezeichnen. Dies liegt daran, dass die Kryptographie von Bitcoin als ein benutzerdefinierter Algorithmus für digitale Signaturen betrachtet werden kann, bei dem der öffentliche Schlüssel aus dem Hash des öffentlichen ECC-Schlüssels besteht, die Signatur aus dem öffentlichen ECC-Schlüssel, verkettet mit der ECC-Signatur, besteht und der Verifizierungsalgorithmus beinhaltet, den öffentlichen ECC-Schlüssel in der Signatur mit dem als öffentlichen Schlüssel bereitgestellten Hash des öffentlichen ECC-Schlüssels abzugleichen und anschließend die ECC-Signatur mit dem öffentlichen ECC-Schlüssel zu verifizieren.
2. Technisch gesehen der Median der 11 vorherigen Blöcke.
3. Intern sind 2 und „CHARLIE“ beides Zahlen, wobei letztere in einer Big-Endian-Basis-256-Darstellung vorliegt. Zahlen können mindestens 0 und höchstens 2<sup>256</sup>-1 sein.

### Weiterführende Literatur {#further-reading}

1. [Intrinsischer Wert](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Smart Property](https://en.bitcoin.it/wiki/Smart_Property)
3. [Smart Contracts](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](https://nakamotoinstitute.org/b-money/)
5. [Wiederverwendbare Proofs-of-Work](https://nakamotoinstitute.org/finney/rpow/)
6. [Sichere Eigentumstitel mit Eigentümerautorität](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Bitcoin-Whitepaper](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zookos Dreieck](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Colored-Coins-Whitepaper](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Mastercoin-Whitepaper](https://github.com/mastercoin-MSC/spec)
12. [Dezentrale autonome Unternehmen, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Vereinfachte Zahlungsverifizierung](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkle-Bäume](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia-Bäume](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ und autonome Agenten, Jeff Garzik](https://garzikrants.blogspot.com/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn über Smart Property auf dem Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Ethereum Merkle-Patricia-Bäume](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd über Merkle-Summenbäume](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Zur Geschichte des Whitepapers siehe [dieses Wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum hat sich, wie viele Community-gesteuerte Open-Source-Softwareprojekte, seit seiner ursprünglichen Entstehung weiterentwickelt. Um mehr über die neuesten Entwicklungen von Ethereum zu erfahren und darüber, wie Änderungen am Protokoll vorgenommen werden, empfehlen wir [diesen Leitfaden](/learn/)._
