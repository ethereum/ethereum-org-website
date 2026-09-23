---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Erfahren Sie mehr über das Hegotá-Protokoll-Upgrade"
lang: de
template: upgrade
---

Hegotá ist das [Ethereum](/)-Netzwerk-Upgrade, das voraussichtlich auf [Glamsterdam](/roadmap/glamsterdam/) folgen wird. Der Name setzt sich aus „Bogotá“ (Upgrade der Ausführungsschicht, benannt nach einem früheren Devcon-Standort) und „Heze“ (Upgrade der Konsensschicht, benannt nach einem Stern) zusammen.

Hegotá befindet sich in einer frühen Planungsphase. Das Hauptmerkmal (Headliner) wurde ausgewählt und eine zweite Änderung ist inzwischen geplant, aber über den restlichen Umfang wird noch entschieden und es stehen noch keine Termine fest.

## Hauptmerkmal: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Bei Fork-Choice Enforced Inclusion Lists (FOCIL oder EIP-7805) geht es um [Zensurresistenz](/roadmap/security/#censorship-resistance): Es soll sichergestellt werden, dass eine gültige Transaktion in einen Block aufgenommen wird, selbst wenn die Personen, die Blöcke erstellen (Block-Builder), sie lieber weglassen würden.

Heute erstellt ein einzelner [Validator](/glossary/#validator) jeden Block und entscheidet, welche Transaktionen er enthält. Jeder, der genügend Block-Builder beeinflussen kann, kann daher eine Transaktion verzögern, und ein Benutzer hat keine andere Möglichkeit, dies zu erzwingen, als zu warten und zu hoffen.

FOCIL verteilt diese Entscheidung auf viele Validatoren. Ein Komitee schlägt jeweils eine Liste von Transaktionen vor, die aufgenommen werden sollten, und die Regeln des Protokolls verpflichten den Block-Builder, diese Listen zu berücksichtigen. Die Zensur einer Transaktion ist dann nicht mehr etwas, das eine Partei allein tun kann.

## Frame-Transaktionen {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Frame-Transaktionen (EIP-8141) lassen ein [Konto](/glossary/#account) selbst entscheiden, was als gültige Transaktion zählt, anstatt dass das Protokoll auf einem festen Signaturschema beharrt.

Heute wird jede Transaktion auf die gleiche Weise autorisiert: eine Signatur von einem Schlüssel. [Smart-Contract-Konten](/roadmap/account-abstraction/) umgehen dies, indem sie Transaktionen durch zusätzliche Infrastruktur leiten, was Gas kostet und bewegliche Teile hinzufügt, die ausfallen können.

Eine Frame-Transaktion verlagert die Überprüfung in das Konto selbst. Das Konto führt seine eigene Verifizierungslogik aus, sodass Funktionen, die derzeit diese zusätzliche Infrastruktur benötigen – soziale Wiederherstellung, Ausgabenlimits, das Erfordernis mehrerer Genehmigungen, jemand anderen das Gas bezahlen zu lassen – zu Dingen werden, die das Protokoll direkt unterstützt.

Da das Konto seine eigenen Regeln wählt, kann es auch ein Signaturschema wählen, das ein Quantencomputer nicht knacken könnte. Das macht dies zu einem Schritt in Richtung [Quantenresistenz](/roadmap/security/#quantum-resistance) sowie zu besseren Wallets.

## Was sonst noch in Hegotá enthalten ist {#scope}

Noch nicht entschieden. FOCIL und Frame-Transaktionen sind die beiden bisher geplanten Änderungen; Dutzende weitere wurden vorgeschlagen und keine davon ist endgültig beschlossen. Diese Seite wird kurz bleiben, bis der Umfang feststeht – den aktuellen Stand der Diskussion finden Sie in den unten stehenden Ressourcen.

## Weiterführende Literatur {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) – Live-Status jedes Vorschlags
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Technische Spezifikation zu EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Technische Spezifikation zu EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Ethereum-Roadmap](/roadmap/)