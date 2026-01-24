---
title: Mining-Algorithmen
description: Ein detailierter Einblick in die Algorithmen, welche für das Ethereum-Mining eingesetzt werden.
lang: de
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-Work ist nicht mehr der zugrunde liegende Konsensmechanismus von Ethereum, was bedeutet, dass das Mining ausgeschaltet wurde. Stattdessen wird Ethereum von Validatoren gesichert, die ETH staken. Sie können schon heute mit dem Staking von ETH beginnen. Lese mehr dazu unter <a href='/roadmap/merge/'>den Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake</a>, und <a href='/staking/'>Staking</a>. Diese Seite dient ausschließlich dem geschichtlichen Interesse.
</AlertDescription>
</AlertContent>
</Alert>

Ethereum-Mining nutzte einen Algorithmus namens Ethash. Die Grundidee des Algorithmus besteht darin, dass der Miner versucht, durch Brute-Force-Berechnungen einen Nonce-Input zu finden, sodass der sich ergebende Hash-Wert kleiner ist als ein spezifischer Schwellenwert, der durch die berechnete Schwierigkeit festgelegt ist. Dieser Schwierigkeitsgrad kann dynamisch angepasst werden, sodass die Block-Produktion in regelmäßigen Intervallen ausgeführt werden kann.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über den [Proof-of-Work-Konsens](/developers/docs/consensus-mechanisms/pow) und das [Mining](/developers/docs/consensus-mechanisms/pow/mining) zu informieren.

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto war ein Wegbereiter-Forschungsalgorithmus für das Ethereum-Mining, der von Ethash abgelöst wurde. Er war eine Verschmelzung zweier anderer Algorithmen: Dagger und Hashimoto. Er war stets nur eine Forschungsimplementierung und wurde mit Veröffentlichung des Ethereum-Mainnets von Ethash abgelöst.

[Dagger](http://www.hashcash.org/papers/dagger.html) beinhaltet die Erzeugung eines [gerichteten azyklischen Graphen](https://en.wikipedia.org/wiki/Directed_acyclic_graph), dessen zufällige Ausschnitte zusammengehasht werden. Der Grundgedanke beruht darauf, dass jede Nonce nur einen kleinen Abschnitt eines großen Gesamt-Datenbaums benötigt. Den Unterbaum für jede Nonce neu zu berechnen, würde Mining unmöglich machen – weshalb der Baum gespeichert werden muss –, doch für die Verifizierung einer einzigen Nonce ist dieser Vorgang in Ordnung. Dagger wurde als Alternative zu bestehenden Algorithmen wie Scrypt entwickelt, die speicherhart, aber schwer zu verifizieren sind, wenn ihre Speicherhärte auf tatsächlich sichere Ebenen ansteigt. Dagger hatte jedoch Schwachstellen durch Hardwarebeschleunigung in Shared-Memory-Umgebungen und wurde daher durch andere Methoden in der Forschung ersetzt.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) ist ein Algorithmus, der durch seine I/O-Limitierung ASIC-resistent ist (d. h. Speicherlesevorgänge sind der limitierende Faktor im Mining-Prozess). Die Theorie dahinter besagt, dass RAM leichter verfügbar ist als Rechenleistung; durch milliardenschwere Forschung wurde bereits untersucht, inwieweit sich RAM für verschiedene Nutzungsszenarien optimieren lässt, die häufig annähernd zufällige Zugriffsmuster nutzen (daher „Random Access Memory“). Daraus folgt, dass bestehende RAM-Lösungen wahrscheinlich annähernd optimal für die Bewertung des Algorithmus sind. Hashimoto nutzt die Blockchain als Datenquelle, was sowohl den Punkt (1) als auch (3) weiter oben erfüllt.

Dagger-Hashimoto verwendete abgeänderte Versionen der Algorithmen von Dagger und Hashimoto. Der Unterschied zwischen Dagger-Hashimoto und Hashimoto besteht darin, dass Dagger-Hashimoto anstatt der Blockchain einen spezifischen Datensatz nutzt, der entsprechend den Blockdaten alle n Blöcke eine Aktualisierung durchführt. Der Datensatz wird durch den Dagger-Algorithmus generiert, was die effiziente Berechnung einer Untergruppe für jede Nonce für den Verifizierungsalgorithmus des Light-Clients ermöglicht. Der Unterschied zwischen Dagger-Hashimoto und Dagger besteht darin, dass, anders als beim ursprünglichen Dagger, der zur Abfrage des Blocks verwendete Datensatz semi-permanent ist und nur in gelegentlichen Abständen (z. B. einmal pro Woche) aktualisiert wird. Das bedeutet, dass der Anteil des Aufwands für die Generierung des Datensatzes annähernd null ist, weshalb Sergio Lerners Argumente in Bezug auf Geschwindigkeitszuwächse durch Shared-Memory vernachlässigbar sind.

Mehr über [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash war der Mining-Algorithmus, der tatsächlich auf dem echten Ethereum-Mainnet unter der inzwischen veralteten Proof-of-Work-Architektur verwendet wurde. Ethash war im Grunde ein neuer Name, der einer bestimmten Version von Dagger-Hashimoto gegeben wurde, nachdem der Algorithmus signifikant aktualisiert worden war, aber noch immer die grundlegenden Prinzipien seines Vorgängers befolgte. Das Ethereum-Mainnet hat ausschließlich Ethash verwendet – Dagger Hashimoto war eine F&E-Version des Mining-Algorithmus, die abgelöst wurde, bevor das Mining im Ethereum-Mainnet startete.

Mehr über [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Weiterführende Lektüre {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
