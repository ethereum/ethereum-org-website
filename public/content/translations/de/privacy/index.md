---
title: "Privatsphäre auf Ethereum"
description: "Tools und Techniken zum Schutz Ihrer Privatsphäre auf Ethereum"
lang: de
---

# Privatsphäre auf Ethereum {#introduction}

Privatsphäre ist nicht nur für die persönliche Sicherheit unerlässlich, sie ist auch ein Eckpfeiler der Freiheit und ein wichtiger [Garant für Dezentralisierung](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Privatsphäre gibt Menschen die Möglichkeit, sich frei auszudrücken, mit anderen zu interagieren und Gemeinschaften frei zu organisieren. Aber wie bei allen Blockchains macht das öffentliche Ledger von Ethereum den Schutz der Privatsphäre zu einer Herausforderung.

Ethereum ist von Grund auf transparent. Jede Aktion auf der Blockchain ist für jeden sichtbar, der hinsieht. Obwohl Ethereum Pseudonymität bietet, indem es Ihre Aktivitäten mit einem [Public-Key](/decentralized-identity/#public-key-cryptography) anstelle einer realen Identität verknüpft, könnten Aktivitätsmuster analysiert werden, um sensible Informationen preiszugeben und Benutzer zu identifizieren.

Die Integration von datenschutzfreundlichen Tools in Ethereum kann Menschen, Organisationen und Institutionen helfen, sicher zu interagieren und gleichzeitig unnötige Offenlegungen zu begrenzen. Dies macht das Ökosystem sicherer und praktischer für eine breitere Palette von Anwendungsfällen.

## Privatsphäre beim Schreiben {#privacy-of-writes}

Standardmäßig ist jede auf Ethereum geschriebene Transaktion öffentlich und dauerhaft. Dies umfasst nicht nur das Senden von ETH, sondern auch die Registrierung von ENS-Namen, das Sammeln von POAPs oder den Handel mit NFTs. Alltägliche Aktionen wie Zahlungen, Abstimmungen oder Identitätsprüfungen können Ihre Informationen an unbeabsichtigte Parteien weitergeben. Es gibt verschiedene Tools und Techniken, die helfen können, diese privater zu gestalten:

### Mixing-Protokolle (oder "Mixer") {#mixing-protocols}

Mixer unterbrechen die Verbindung zwischen Sendern und Empfängern, indem sie die Transaktionen vieler Benutzer in einen gemeinsamen „Pool“ werfen und die Leute später auf eine neue Adresse abheben lassen. Da Einzahlungen und Abhebungen miteinander vermischt werden, ist es für Beobachter viel schwieriger, sie miteinander in Verbindung zu bringen.

_Beispiele: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Shielded Pools {#shielded-pools}

Shielded Pools ähneln Mixern, ermöglichen es den Benutzern jedoch, Gelder privat innerhalb des Pools selbst zu halten und zu überweisen. Anstatt nur die Verbindung zwischen Einzahlung und Abhebung zu verschleiern, behalten Shielded Pools einen fortlaufenden privaten Zustand bei, der oft mit Zero-Knowledge-Beweisen gesichert ist. Dies macht es möglich, private Überweisungen, private Guthaben und mehr aufzubauen.

_Beispiele: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Stealth-Adressen {#stealth-addresses}

Eine [Stealth-Adresse](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ist so, als würde man jedem Sender ein einzigartiges, einmaliges Postfach geben, das nur Sie öffnen können. Jedes Mal, wenn Ihnen jemand Krypto sendet, geht es an eine neue Adresse, sodass niemand sonst sehen kann, dass all diese Zahlungen Ihnen gehören. Dies hält Ihre Zahlungshistorie privat und erschwert die Nachverfolgung.

_Beispiele: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Weitere Anwendungsfälle {#other-use-cases}

Andere Projekte, die private Schreibvorgänge erforschen, umfassen [PlasmaFold](https://pse.dev/projects/plasma-fold) (private Zahlungen) und Systeme wie [MACI](https://pse.dev/projects/maci) und [Semaphore](https://pse.dev/projects/semaphore) (private Abstimmungen).

Diese Tools erweitern die Möglichkeiten für privates Schreiben auf Ethereum, aber jedes bringt Kompromisse mit sich. Einige Ansätze sind noch experimentell, einige erhöhen die Kosten oder die Komplexität, und einige Tools wie Mixer können je nach ihrer Verwendung rechtlicher oder behördlicher Prüfung unterliegen.

## Privatsphäre beim Lesen {#privacy-of-reads}

Das Lesen oder Überprüfen von Informationen auf Ethereum (z. B. Ihr Wallet-Guthaben) erfolgt in der Regel über einen Dienst wie Ihren Wallet-Anbieter, einen Blockchain-Knoten-Anbieter oder eine Blocksuchmaschine. Da Sie sich darauf verlassen, dass diese die Blockchain für Sie lesen, können sie auch Ihre Anfragen zusammen mit Metadaten wie Ihrer IP-Adresse oder Ihrem Standort sehen. Wenn Sie immer wieder dasselbe Konto überprüfen, können diese Informationen zusammengesetzt werden, um Ihre Identität mit Ihrer Aktivität zu verknüpfen.

Das Betreiben eines eigenen Ethereum-Blockchain-Knotens würde dies verhindern, aber das Speichern und Synchronisieren der gesamten Blockchain bleibt für die meisten Benutzer kostspielig und unpraktisch, insbesondere auf mobilen Geräten.

Einige Projekte, die private Lesevorgänge erforschen, umfassen [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, Daten abrufen, ohne preiszugeben, wonach Sie suchen), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (private Identitätsprüfungen mit Zero-Knowledge-Beweisen), [vOPRF](https://pse.dev/projects/voprf) (Web2-Konten pseudonym im Web3 nutzen), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (Berechnungen auf verschlüsselten Daten) und [MachinaIO](https://pse.dev/projects/machina-io) (Programmdetails verbergen, während die Funktionalität erhalten bleibt).

## Privatsphäre beim Beweisen {#privacy-of-proving}

Datenschutzfreundliche Beweise sind Tools, die Sie auf Ethereum verwenden können, um zu zeigen, dass etwas wahr ist, ohne unnötige Details preiszugeben. Zum Beispiel könnten Sie:

- Beweisen, dass Sie über 18 sind, ohne Ihr vollständiges Geburtsdatum mitzuteilen
- Den Besitz eines NFTs oder Tokens beweisen, ohne Ihr gesamtes Wallet preiszugeben
- Die Berechtigung für eine Mitgliedschaft, Belohnung oder Abstimmung beweisen, ohne andere persönliche Daten offenzulegen

Die meisten Tools dafür stützen sich auf kryptografische Techniken wie Zero-Knowledge-Beweise, aber die Herausforderung besteht darin, sie effizient genug zu machen, um auf alltäglichen Geräten ausgeführt zu werden, portabel auf jede Plattform und sicher zu sein.

Einige Projekte, die Privatsphäre beim Beweisen erforschen, umfassen [Client Side Proving](https://pse.dev/projects/client-side-proving) (ZK-Beweissysteme), [TLSNotary](https://tlsnotary.org/) (Echtheitsnachweise für beliebige Daten im Web), [Mopro](https://pse.dev/projects/mopro) (mobiles clientseitiges Beweisen), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (Delegations-Frameworks, die Vertrauensannahmen vermeiden) und [Noir](https://noir-lang.org/) (Sprache für privates und verifizierbares Computing).

## Privatsphäre-Glossar {#privacy-glossary}

**Anonym**: Interaktion, bei der alle Identifikatoren dauerhaft aus Ihren Daten entfernt wurden, was es unmöglich macht, Informationen auf eine Person zurückzuführen

**Verschlüsselung**: Ein Prozess, der Daten so unkenntlich macht, dass nur jemand mit dem richtigen Schlüssel sie lesen kann

**[Vollhomomorphe Verschlüsselung](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Eine Möglichkeit, Berechnungen direkt auf verschlüsselten Daten durchzuführen, ohne sie jemals zu entschlüsseln

**[Ununterscheidbare Verschleierung](https://pse.dev/projects/machina-io) (iO)**: Datenschutztechniken, die Programme oder Daten unverständlich, aber dennoch nutzbar machen

**[Multi-Party Computation](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Methoden, die es mehreren Parteien ermöglichen, gemeinsam ein Ergebnis zu berechnen, ohne ihre privaten Eingaben offenzulegen

**Programmierbare Kryptografie**: Flexible, regelgesteuerte Kryptografie, die in Software angepasst werden kann, um zu steuern, wie und wann Daten geteilt, verifiziert oder offengelegt werden

**Pseudonym**: Verwendung eindeutiger Codes oder Nummern (wie einer Ethereum-Adresse) anstelle von persönlichen Identifikatoren

**Selektive Offenlegung**: Die Fähigkeit, nur das zu teilen, was benötigt wird (z. B. zu beweisen, dass Sie ein NFT besitzen, ohne Ihre gesamte Wallet-Historie preiszugeben)

**Unverknüpfbarkeit**: Sicherstellen, dass separate Aktionen auf der Blockchain nicht auf dieselbe Adresse zurückgeführt werden können

**Verifizierbarkeit**: Sicherstellen, dass andere bestätigen können, dass eine Behauptung wahr ist, wie z. B. die Validierung einer Transaktion oder eines Beweises auf Ethereum

**Verifizierbare Delegation**: Zuweisung einer Aufgabe – wie die Erstellung eines Beweises – an eine andere Partei (z. B. ein mobiles Wallet, das einen Server für aufwendige Kryptografie nutzt), während man weiterhin überprüfen kann, ob sie korrekt ausgeführt wurde

**[Zero-Knowledge-Beweise](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: Kryptografische Protokolle, die es jemandem ermöglichen, zu beweisen, dass Informationen wahr sind, ohne die zugrunde liegenden Daten preiszugeben

**Zero-Knowledge Rollup**: Ein Skalierungssystem, das Transaktionen Off-Chain bündelt und einen Validitätsnachweis auf der Blockchain einreicht – standardmäßig nicht privat, aber sie ermöglichen effiziente Datenschutzsysteme (wie Shielded Pools) durch Kostensenkung

## Ressourcen {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), ein Forschungs- und Entwicklungslabor der Ethereum Foundation, das sich auf den Datenschutz für das Ökosystem konzentriert
- [Web3PrivacyNow](https://web3privacy.info/), ein Netzwerk von Menschen, Projekten und gleichgesinnten Organisationen, die Menschenrechte im Internet schützen und fördern
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), eine Bewertungsseite für Ethereum-Wallets, die darauf abzielt, eine umfassende Liste von Wallets, deren Funktionalität, Praktiken und Unterstützung für bestimmte Standards bereitzustellen.
- [Zk-kit](https://zkkit.pse.dev/): Eine Sammlung von Bibliotheken (Algorithmen, Hilfsfunktionen und Datenstrukturen), die in verschiedenen Projekten und Zero-Knowledge-Protokollen wiederverwendet werden können.
- [Datenschutz-Apps](/apps/categories/privacy/) - Entdecken Sie eine Liste kuratierter Datenschutzanwendungen, die auf Ethereum laufen.