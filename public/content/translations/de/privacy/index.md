---
title: Datenschutz auf Ethereum
description: "Werkzeuge und Techniken zum Schutz Ihrer Privatsphäre auf Ethereum"
lang: de
---

# Datenschutz auf Ethereum {#introduction}

Datenschutz ist nicht nur für die persönliche Sicherheit unerlässlich, er ist auch ein Eckpfeiler der Freiheit und ein wichtiger [Garant für die Dezentralisierung](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Datenschutz gibt Menschen die Möglichkeit, sich frei auszudrücken, mit anderen zu interagieren und Gemeinschaften zu organisieren. Aber wie bei allen Blockchains macht das öffentliche Hauptbuch von Ethereum den Datenschutz zu einer Herausforderung.

Ethereum ist von Natur aus transparent. Jede On-Chain-Aktion ist für jeden sichtbar, der sie sich ansieht. Obwohl Ethereum Pseudonymität bietet, indem es Ihre Aktivitäten mit einem [öffentlichen Schlüssel](/decentralized-identity/#public-key-cryptography) anstelle einer realen Identität verknüpft, könnten Aktivitätsmuster analysiert werden, um sensible Informationen preiszugeben und Benutzer zu identifizieren.

Die Integration von datenschutzfreundlichen Werkzeugen in Ethereum kann Menschen, Organisationen und Institutionen helfen, sicher zu interagieren und gleichzeitig unnötige Offenlegungen zu begrenzen. Dies macht das Ökosystem sicherer und praktischer für eine breitere Palette von Anwendungsfällen.

## Datenschutz für Schreibvorgänge {#privacy-of-writes}

Standardmäßig ist jede auf Ethereum geschriebene Transaktion öffentlich und dauerhaft. Dazu gehören nicht nur das Senden von ETH, sondern auch das Registrieren von ENS-Namen, das Sammeln von POAPs oder der Handel mit NFTs. Alltägliche Handlungen wie Zahlungen, Abstimmungen oder Identitätsprüfungen können Ihre Informationen an unbeabsichtigte Parteien preisgeben. Es gibt mehrere Werkzeuge und Techniken, die helfen können, diese privater zu gestalten:

### Mixing-Protokolle (oder "Mixer") {#mixing-protocols}

Mixer durchbrechen die Verbindung zwischen Sendern und Empfängern, indem sie die Transaktionen vieler Benutzer in einen gemeinsamen "Pool" legen und es den Leuten ermöglichen, später an eine neue Adresse abzuheben. Da Einzahlungen und Abhebungen durcheinandergewürfelt werden, ist es für Beobachter viel schwieriger, sie miteinander zu verbinden.

_Beispiele: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Shielded Pools {#shielded-pools}

Shielded Pools sind ähnlich wie Mixer, aber sie ermöglichen es den Benutzern, Gelder privat innerhalb des Pools selbst zu halten und zu transferieren. Anstatt nur die Verbindung zwischen Einzahlung und Abhebung zu verschleiern, halten Shielded Pools einen laufenden privaten Zustand aufrecht, der oft mit Zero-Knowledge-Proofs gesichert ist. Dies ermöglicht es, private Überweisungen, private Guthaben und mehr zu erstellen.

_Beispiele: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Stealth-Adressen {#stealth-addresses}

Eine [Stealth-Adresse](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ist, als würde man jedem Absender ein einzigartiges, einmaliges Postfach geben. das nur Sie öffnen können. Jedes Mal, wenn Ihnen jemand Krypto schickt, geht es an eine neue Adresse, sodass niemand sonst sehen kann, dass all diese Zahlungen Ihnen gehören. Dies hält Ihre Zahlungshistorie privat und macht sie schwerer nachverfolgbar.

_Beispiele: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Andere Anwendungsfälle {#other-use-cases}

Andere Projekte, die private Schreibvorgänge erforschen, sind [PlasmaFold](https://pse.dev/projects/plasma-fold) (private Zahlungen) und Systeme wie [MACI](https://pse.dev/projects/maci) und [Semaphore](https://pse.dev/projects/semaphore) (private Abstimmungen).

Diese Werkzeuge erweitern die Möglichkeiten, privat auf Ethereum zu schreiben, aber jedes hat seine eigenen Kompromisse. Einige Ansätze sind noch experimentell, andere erhöhen Kosten oder Komplexität, und einige Werkzeuge wie Mixer können je nach ihrer Verwendung rechtlicher oder regulatorischer Prüfung unterliegen.

## Datenschutz für Lesevorgänge {#privacy-of-reads}

Das Lesen oder Überprüfen von Informationen auf Ethereum (z. B. Ihr Wallet-Guthaben) erfolgt in der Regel über einen Dienst wie Ihren Wallet-Anbieter, einen Node-Anbieter oder einen Block-Explorer. Da Sie sich darauf verlassen, dass sie die Blockchain für Sie lesen, können sie auch Ihre Anfragen zusammen mit Metadaten wie Ihrer IP-Adresse oder Ihrem Standort sehen. Wenn Sie immer wieder dasselbe Konto überprüfen, können diese Informationen zusammengesetzt werden, um Ihre Identität mit Ihren Aktivitäten zu verknüpfen.

Das Betreiben eines eigenen Ethereum-Nodes würde dies verhindern, aber das Speichern und Synchronisieren der gesamten Blockchain bleibt für die meisten Benutzer kostspielig und unpraktisch, insbesondere auf mobilen Geräten.

Einige Projekte, die private Lesevorgänge erforschen, sind [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, Daten abrufen, ohne preiszugeben, wonach Sie suchen), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (private Identitätsprüfungen mit Zero-Knowledge-Proofs), [vOPRF](https://pse.dev/projects/voprf) (Web2-Konten pseudonym in Web3 verwenden), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (Berechnungen auf verschlüsselten Daten durchführen) und [MachinaIO](https://pse.dev/projects/machina-io) (Programmdetails verbergen, während die Funktionalität erhalten bleibt).

## Datenschutz für Nachweise {#privacy-of-proving}

Datenschutzwahrende Nachweise sind Werkzeuge, die Sie auf Ethereum verwenden können, um zu zeigen, dass etwas wahr ist, ohne unnötige Details preiszugeben. Zum Beispiel könnten Sie:

- Beweisen, dass Sie über 18 sind, ohne Ihr vollständiges Geburtsdatum preiszugeben
- Den Besitz eines NFT oder Tokens nachweisen, ohne Ihre gesamte Wallet offenzulegen
- Die Berechtigung für eine Mitgliedschaft, Belohnung oder Abstimmung nachweisen, ohne andere persönliche Daten preiszugeben

Die meisten Werkzeuge dafür basieren auf kryptografischen Techniken wie Zero-Knowledge-Proofs, aber die Herausforderung besteht darin, sie effizient genug zu machen, um auf alltäglichen Geräten zu laufen, auf jeder Plattform portabel und sicher zu sein.

Einige Projekte, die den Datenschutz für Nachweise erforschen, sind [Client Side Proving](https://pse.dev/projects/client-side-proving) (ZK-Beweissysteme), [TLSNotary](https://tlsnotary.org/) (Authentizitätsnachweise für beliebige Daten im Web), [Mopro](https://pse.dev/projects/mopro) (mobiles clientseitiges Beweisen), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (Delegierungs-Frameworks, die Vertrauensannahmen vermeiden) und [Noir](https://noir-lang.org/) (Sprache für privates und verifizierbares Computing).

## Datenschutz-Glossar {#privacy-glossary}

**Anonym**: Interaktion, bei der alle Identifikatoren dauerhaft aus Ihren Daten entfernt werden, sodass es unmöglich ist, Informationen zu einer Person zurückzuverfolgen

**Verschlüsselung**: Ein Prozess, der Daten so verschlüsselt, dass nur jemand mit dem richtigen Schlüssel sie lesen kann

**[Vollständig homomorphe Verschlüsselung](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Eine Möglichkeit, Berechnungen direkt auf verschlüsselten Daten durchzuführen, ohne sie jemals zu entschlüsseln

**[Ununterscheidbare Verschleierung](https://pse.dev/projects/machina-io) (iO)**: Datenschutztechniken, die Programme oder Daten unverständlich machen, während sie weiterhin nutzbar bleiben

**[Multi-Party Computation](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Methoden, die es mehreren Parteien ermöglichen, gemeinsam ein Ergebnis zu berechnen, ohne ihre privaten Eingaben preiszugeben

**Programmierbare Kryptografie**: Flexible, regelbasierte Kryptografie, die in der Software angepasst werden kann, um zu steuern, wie und wann Daten geteilt, verifiziert oder offengelegt werden

**Pseudonym**: Verwendung einzigartiger Codes oder Nummern (wie einer Ethereum-Adresse) anstelle von persönlichen Identifikatoren

**Selektive Offenlegung**: Die Fähigkeit, nur das Nötigste zu teilen (z. B. den Besitz eines NFT nachzuweisen, ohne die gesamte Wallet-Historie offenzulegen)

**Unverknüpfbarkeit**: Sicherstellen, dass separate Aktionen auf der Blockchain nicht auf dieselbe Adresse zurückgeführt werden können

**Überprüfbarkeit**: Sicherstellen, dass andere eine Behauptung als wahr bestätigen können, z. B. durch Validierung einer Transaktion oder eines Nachweises auf Ethereum

**Verifizierbare Delegation**: Zuweisung einer Aufgabe – wie das Erzeugen eines Nachweises – an eine andere Partei (z. B. eine mobile Wallet, die einen Server für aufwändige Kryptografie verwendet), während man immer noch überprüfen kann, ob sie korrekt ausgeführt wurde

**[Zero-Knowledge-Proofs](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: Kryptografische Protokolle, mit denen jemand nachweisen kann, dass eine Information wahr ist, ohne die zugrunde liegenden Daten preiszugeben

**ZK-Rollup**: Ein Skalierbarkeitssystem, das Transaktionen Off-Chain bündelt und einen Gültigkeitsnachweis On-Chain übermittelt – standardmäßig nicht privat, aber es ermöglicht effiziente Datenschutzsysteme (wie Shielded Pools) durch Kostensenkung

## Ressourcen {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), ein Forschungs- und Entwicklungslabor der Ethereum Foundation, das sich auf den Datenschutz im Ökosystem konzentriert
- [Web3PrivacyNow](https://web3privacy.info/), ein Netzwerk von Personen, Projekten und gleichgesinnten Organisationen, die die Menschenrechte online schützen und fördern
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), eine Bewertungsseite für Ethereum-Wallets, die eine umfassende Liste von Wallets, deren Funktionalität, Praktiken und Unterstützung für bestimmte Standards bereitstellen möchte.
- [Zk-kit](https://zkkit.pse.dev/): Eine Reihe von Bibliotheken (Algorithmen, Hilfsfunktionen und Datenstrukturen), die in verschiedenen Projekten und Zero-Knowledge-Protokollen wiederverwendet werden können.
- [Datenschutz-Apps](/apps/categories/privacy/) - Entdecken Sie eine Liste kuratierter Datenschutzanwendungen, die auf Ethereum laufen.
