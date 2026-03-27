---
title: Mining-Algorithmen
description: "Ein detaillierter Blick auf die Algorithmen, die für das Ethereum-Mining verwendet werden."
lang: de
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-Work liegt dem Konsensmechanismus von Ethereum nicht mehr zugrunde, was bedeutet, dass das Mining abgeschaltet wurde. Stattdessen wird Ethereum durch Validatoren gesichert, die ETH staken. Sie können noch heute mit dem Staking Ihrer ETH beginnen. Lesen Sie mehr über <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake</a> und <a href='/staking/'>Staking</a>. Diese Seite ist nur von historischem Interesse.
</AlertDescription>
</AlertContent>
</Alert>

Das Ethereum-Mining verwendete einen Algorithmus namens Ethash. Die grundlegende Idee des Algorithmus ist, dass ein Miner versucht, durch Brute-Force-Berechnung eine Nonce-Eingabe zu finden, sodass der resultierende Hash kleiner ist als ein Schwellenwert, der durch die berechnete Schwierigkeit bestimmt wird. Dieser Schwierigkeitsgrad kann dynamisch angepasst werden, sodass die Blockproduktion in regelmäßigen Abständen erfolgen kann.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über den [Proof-of-Work-Konsens](/developers/docs/consensus-mechanisms/pow) und [Mining](/developers/docs/consensus-mechanisms/pow/mining) zu informieren.

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto war ein Vorläufer-Forschungsalgorithmus für das Ethereum-Mining, der von Ethash abgelöst wurde. Es war eine Verschmelzung von zwei verschiedenen Algorithmen: Dagger und Hashimoto. Es handelte sich immer nur um eine Forschungsimplementierung und wurde bis zum Start des Ethereum-Mainnets durch Ethash ersetzt.

[Dagger](http://www.hashcash.org/papers/dagger.html) beinhaltet die Erstellung eines [gerichteten azyklischen Graphen (Directed Acyclic Graph)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), von dem zufällige Teile zusammen gehasht werden. Das Kernprinzip besteht darin, dass jede Nonce nur einen kleinen Teil eines großen Gesamtdatenbaums benötigt. Die Neuberechnung des Teilbaums für jede Nonce ist für das Mining unerschwinglich – daher die Notwendigkeit, den Baum zu speichern –, aber für die Verifizierung einer einzelnen Nonce in Ordnung. Dagger wurde als Alternative zu bestehenden Algorithmen wie Scrypt entwickelt, die speicherintensiv (memory-hard) sind, aber schwer zu verifizieren, wenn ihre Speicherintensität auf ein wirklich sicheres Niveau ansteigt. Dagger war jedoch anfällig für Hardwarebeschleunigung mit gemeinsam genutztem Speicher (Shared Memory) und wurde zugunsten anderer Forschungsansätze fallen gelassen.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) ist ein Algorithmus, der ASIC-Resistenz hinzufügt, indem er I/O-gebunden ist (d. h. Speicherlesevorgänge sind der begrenzende Faktor im Mining-Prozess). Die Theorie besagt, dass RAM leichter verfügbar ist als Rechenleistung; Milliarden von Dollar an Forschungsgeldern wurden bereits in die Optimierung von RAM für verschiedene Anwendungsfälle investiert, die oft nahezu zufällige Zugriffsmuster beinhalten (daher „Random Access Memory“). Infolgedessen ist der vorhandene RAM wahrscheinlich mäßig nah am Optimum für die Auswertung des Algorithmus. Hashimoto nutzt die Blockchain als Datenquelle und erfüllt damit gleichzeitig die obigen Punkte (1) und (3).

Dagger-Hashimoto verwendete geänderte Versionen der Dagger- und Hashimoto-Algorithmen. Der Unterschied zwischen Dagger Hashimoto und Hashimoto besteht darin, dass Dagger Hashimoto anstelle der Blockchain als Datenquelle einen benutzerdefiniert generierten Datensatz verwendet, der basierend auf Blockdaten alle N Blöcke aktualisiert wird. Der Datensatz wird mit dem Dagger-Algorithmus generiert, was eine effiziente Berechnung einer für jede Nonce spezifischen Teilmenge für den Light-Client-Verifizierungsalgorithmus ermöglicht. Der Unterschied zwischen Dagger Hashimoto und Dagger besteht darin, dass der Datensatz, der zur Abfrage des Blocks verwendet wird, im Gegensatz zum ursprünglichen Dagger semi-permanent ist und nur in gelegentlichen Abständen (z. B. einmal pro Woche) aktualisiert wird. Dies bedeutet, dass der Aufwand für die Generierung des Datensatzes nahezu null ist, sodass Sergio Lerners Argumente bezüglich der Geschwindigkeitssteigerungen durch Shared Memory vernachlässigbar werden.

Mehr zu [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash war der Mining-Algorithmus, der tatsächlich im echten Ethereum-Mainnet unter der nun veralteten Proof-of-Work-Architektur verwendet wurde. Ethash war im Grunde ein neuer Name für eine bestimmte Version von Dagger-Hashimoto, nachdem der Algorithmus erheblich aktualisiert wurde, während er weiterhin die grundlegenden Prinzipien seines Vorgängers erbte. Das Ethereum-Mainnet verwendete immer nur Ethash – Dagger Hashimoto war eine F&E-Version des Mining-Algorithmus, die abgelöst wurde, bevor das Mining im Ethereum-Mainnet begann.

[Mehr zu Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_