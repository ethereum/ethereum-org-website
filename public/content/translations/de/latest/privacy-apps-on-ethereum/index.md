---
title: "Wie man Privatsphäre-Apps auf Ethereum mit Zero-Knowledge-Beweisen baut"
description: "Ein wiederverwendbares Muster treibt anonyme Abstimmungen, Mixer, Airdrops und Mitgliedschaftssysteme auf Ethereum an. Lernen Sie den Commitment-Nullifier-Proof-Zyklus kennen und erfahren Sie, wie Zero-Knowledge-Tools die heutige Entwicklung praktikabel machen."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "Zero-Knowledge-Beweise"
  - "Privatsphäre"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: "Privatsphäre-Apps auf Ethereum"
lang: de
---

Ethereum ist von Grund auf radikal öffentlich. Jede Adresse, jeder Kontostand, jede Transaktion, jeder Vertragsaufruf und alle Ereignisse sind für jeden mit einem Block-Explorer sichtbar. Diese Transparenz ist nützlich, wenn man Überprüfbarkeit wünscht. Sie ist jedoch ein Problem, wenn Benutzer abstimmen, beanspruchen, Abhebungen vornehmen oder ihre Mitgliedschaft beweisen müssen, ohne jede Aktion auf dieselbe Wallet zurückzuführen.

Anonyme Mitgliedschaft ist das wiederverwendbare Muster, das eine große Klasse von Privatsphäre-Apps auf Ethereum antreibt. Personen registrieren sich zuerst und beweisen später, dass sie zur Gruppe gehören, ohne preiszugeben, welches Mitglied sie sind. Ein Zero-Knowledge-Beweis ist die Brücke zwischen der Registrierungs-Wallet und der agierenden Wallet, und die Brücke verrät nicht, wer sie überquert hat.

Das umgebende Produkt ändert sich, aber das Privatsphäre-Gerüst bleibt gleich.

## Das Muster, erklärt anhand anonymer Abstimmungen {#the-pattern-explained-through-anonymous-voting}

Das Muster besteht aus drei Teilen. Ein Commitment registriert jedes Mitglied. Ein Merkle-Baum verwandelt diese Commitments in eine Menge. Ein Beweis und ein Nullifier lassen ein Mitglied einmal agieren, ohne preiszugeben, welches Mitglied agiert hat.

### Schritt eins: Registrierung {#step-one-registering}

Jeder Wähler erstellt offchain zwei private Werte: das Geheimnis und den Nullifier. Der Wähler hasht diese Werte in ein öffentliches Commitment und registriert dieses Commitment dann onchain.

Das Commitment ist der öffentliche Registrierungsdatensatz. Das Geheimnis und der Nullifier sind die private Notiz, die der Wähler später benötigt. Geht die Notiz verloren, kann der Wähler seine Mitgliedschaft nicht beweisen. Wird sie geleakt, kann möglicherweise jemand anderes anstelle des Benutzers abstimmen.

Da das Commitment ein Hash ist, können Beobachter die darin enthaltenen privaten Werte nicht wiederherstellen. Das Commitment besagt, dass sich "jemand registriert hat", ohne preiszugeben, wer diese Registrierung später nutzen wird.

### Schritt zwei: Aufbau der Menge {#step-two-building-the-crowd}

Wenn sich mehr Wähler registrieren, sammelt die App ihre Commitments in einem Merkle-Baum. Ein Merkle-Baum komprimiert eine lange Liste von Werten in einen einzigen Hash, der als Wurzel bezeichnet wird. Ändert man einen beliebigen Wert in der Liste, ändert sich auch der Hash, sodass die Wurzel als manipulationssichere Zusammenfassung der gesamten Menge fungiert.

Dieser Baum ist Ihre Anonymitätsmenge. Wenn sich zehn Benutzer im Baum befinden, kann ein Beobachter eine spätere Aktion auf einen dieser zehn eingrenzen. Wenn sich zehntausend Benutzer im Baum befinden, ist es viel schwieriger, die Aktion mit einer Person in Verbindung zu bringen. Eine private App mit einer winzigen Anonymitätsmenge ist in der Regel nicht sehr privat, selbst wenn die Kryptographie korrekt ist.

### Schritt drei: Anonymes Agieren {#step-three-acting-anonymously}

Wenn die Abstimmung beginnt, sollte der Wähler nicht mit derselben Wallet abstimmen, die das Commitment registriert hat. Eine Abstimmung über die Registrierungs-Wallet würde die Stimme direkt mit dem Registrierenden verknüpfen und die Privatsphäre-Bemühungen zunichtemachen. Stattdessen erstellt der Wähler einen Zero-Knowledge-Beweis. Die Aussage wird als Schaltkreis codiert, der besagt: "Ich kenne private Werte, die ein registriertes Commitment erzeugen, und ich gebe den korrekten Nullifier-Hash für diese Abstimmung preis."

Der Beweis überzeugt den Verifizierer-Vertrag davon, dass die Aussage wahr ist. Er verrät weder das Geheimnis noch den Nullifier oder welches Commitment verwendet wurde.

Der Nullifier verhindert eine doppelte Stimmabgabe. Zusammen mit dem Beweis veröffentlicht der Wähler einen Nullifier-Hash. Der Abstimmungs-Vertrag speichert diesen Hash, nachdem er die Stimme akzeptiert hat. Wenn dieselbe private Notiz erneut für dieselbe Abstimmung verwendet wird, erzeugt sie denselben Nullifier-Hash, und der Vertrag lehnt die zweite Stimme ab. In Kombination mit dem Beweis weiß der Vertrag dadurch nur, dass ein registrierter Wähler einmal agiert hat, aber nicht welcher.

## Das wiederverwendbare Tor {#the-reusable-gate}

Dasselbe Paar aus Beweis und Nullifier funktioniert auch über Abstimmungen hinaus. Lässt man das Abstimmungsszenario weg, erhält man ein Privatsphäre-Tor für Smart Contract-Funktionen.

Bevor die Funktion ausgeführt wird, überprüft der Vertrag die Merkle-Wurzel, verifiziert den Beweis, bestätigt, dass der Nullifier-Hash noch nicht verwendet wurde, und bindet die öffentlichen Eingaben an die richtige App, Chain, Abstimmung, den richtigen Anspruch oder die richtige Abhebung. Wenn diese Überprüfungen erfolgreich sind, markiert er den Nullifier als verwendet und führt den Rest der Funktion aus.

Setzt man dieses Tor vor eine Abstimmung, erhält man anonymes Abstimmen. Setzt man es vor einen Airdrop-Anspruch, erhält man anonyme Ansprüche. Setzt man es vor eine Abhebungsfunktion, erhält man den Kern eines Mixer-ähnlichen Abhebungsablaufs. Derselbe Commitment-Baum, dieselbe Nullifier-Idee, dasselbe Beweismuster. Was sich ändert, ist der Funktionskörper und die umgebende App-Logik.

## Was läuft wo {#what-runs-where}

Die private Arbeit findet normalerweise offchain statt. Der Benutzer speichert die Notiz, und eine Client-App erstellt den Zeugen und führt den Beweiser aus, um den Beweis zu erzeugen. Ein Indexer verfolgt Commitments und Merkle-Wurzeln. Ein Bündler verbreitet die Benutzeroperation onchain und ein ERC-4337-Paymaster sponsert das Gas, sodass eine frische Wallet nicht zuerst ETH von einer bekannten Wallet des Benutzers benötigt.

Die öffentliche Durchsetzung findet onchain statt. Der Verifizierer-Vertrag überprüft den Beweis. Der App-Vertrag überprüft gültige Wurzeln und ungenutzte Nullifier, speichert den Nullifier-Hash und führt die öffentliche Aktion aus.

Die sensible Benutzererfahrung ist der Umgang mit der Notiz. Behandeln Sie das Geheimnis und den Nullifier wie Schlüssel. Fügen Sie sie nicht in Analysen, Protokolle, URLs, Fehlerberichte oder normale serverseitige Telemetrie ein. Sobald die Notiz geleakt wird, ist die Privatsphäre dahin, egal wie stark der Beweis ist.

## Die Werkzeuge haben aufgeholt {#the-tooling-caught-up}

Sie müssen die zugrunde liegende Kryptographie nicht von Hand programmieren. Ein gängiger Weg ist es, den Schaltkreis in einer höheren Zero-Knowledge-Sprache zu schreiben, einen Solidity-Verifizierer zu generieren und diesen Verifizierer aus dem App-Vertrag aufzurufen.

Der richtige Stack hängt von der Aufgabe ab. Circom mit snarkjs ist ein lang etablierter Weg für Schaltkreise auf App-Ebene. Noir mit Barretenberg ist ein neuerer, entwicklerfreundlicher Weg. Halo2 und gnark sind Schaltkreis-Bibliotheken auf niedrigerer Ebene. zkVMs wie RISC Zero oder SP1 beweisen normale Programme, können aber in der Beweisführung teurer sein als ein kleiner, maßgeschneiderter Schaltkreis.

Greifen Sie für anonyme Mitgliedschaften auf ein bestehendes Protokoll zurück, bevor Sie Ihren eigenen Schaltkreis schreiben. Semaphore verpackt Gruppenmitgliedschaft und Nullifier-basierte Verhinderung von Doppelnutzung in Verträge und JavaScript-Bibliotheken. Für private Abstimmungen und Governance ist MACI der spezialisierte Weg, da es Anti-Kollusions-Eigenschaften hinzufügt. Ausgereifte Protokolle sind oft sicherer als neue Schaltkreise.

## Der Beweis reicht nicht aus {#the-proof-is-not-enough}

Selbst ein perfekter Beweis schlägt fehl, wenn der Wallet-Ablauf die Verbindung preisgibt. Registrieren Sie sich mit Wallet A und agieren Sie später mit Wallet A, und jeder Beobachter kann die Transaktionen miteinander verknüpfen. Finanziere Wallet B von Wallet A aus direkt vor dem Agieren, und diese Finanzierungstransaktion schafft dasselbe Problem.

Deshalb sind Bündler und Paymaster wichtig. Die agierende Wallet sollte frisch sein und keine ETH von einer Wallet empfangen müssen, die der Benutzer von der Aktion trennen möchte.

Dasselbe Problem existiert offchain. Das Einreichen von Registrierungs- und Aktionstransaktionen über dieselbe IP-Adresse, denselben RPC-Anbieter oder dieselbe Sitzung kann die Privatsphäre schwächen, die der Schaltkreis bietet. Frontends können durch Analysen, lokalen Speicher und Support-Protokolle Daten leaken. Ein Zero-Knowledge-Beweis verbirgt die Werte innerhalb des Beweises. Er verbirgt nicht alles rund um die Transaktion.

Öffentliche Eingaben sind ein weiterer Punkt, an dem Privatsphäre-Apps scheitern. Alles, was im Schaltkreis als öffentlich markiert ist, als Ereignis ausgegeben wird, in Aufrufdaten enthalten ist oder vom Vertrag gespeichert wird, ist sichtbar. Überprüfen Sie öffentliche Eingaben genauso sorgfältig wie die Zugriffskontrolle bei einem Solidity-Vertrag.

## Was sich dadurch für Entwickler ändert {#what-this-changes-for-builders}

Privatsphäre auf Ethereum ist einsatzbereit. Entwickler können die Teile zu echten Anwendungen zusammensetzen. Der Stack besteht aus einem Schaltkreis für die private Aussage, einem Verifizierer zur Beweisprüfung, einem App-Vertrag für öffentliche Regeln, einem Indexer für Merkle-Daten sowie einem Bündler plus Paymaster für unverkettbare Einreichungen und Gas-Sponsoring.

Die schwierigen Teile sind Produktdesign, Schlüsselverwaltung, Metadaten-Hygiene, Audits und das Vergrößern der Anonymitätsmenge. Macht man bei einem davon einen Fehler, ist die Privatsphäre, die der Beweis bot, dahin.

## Weiterführende Literatur {#further-reading}

1. [Zero-Knowledge-Beweise (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Semaphore-Dokumentation](https://docs.semaphore.pse.dev/)
3. [MACI-Dokumentation](https://maci.pse.dev/)
4. [Circom-Dokumentation](https://docs.circom.io/)
5. [Noir-Dokumentation](https://noir-lang.org/)
6. [Halo2-Buch](https://zcash.github.io/halo2/)
7. [gnark-Dokumentation](https://docs.gnark.consensys.io/)
8. [RISC Zero-Dokumentation](https://dev.risczero.com/api/)
9. [SP1-Dokumentation](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Kontoabstraktion über den EntryPoint-Vertrag](https://eips.ethereum.org/EIPS/eip-4337)