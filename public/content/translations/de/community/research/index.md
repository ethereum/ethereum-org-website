---
title: Aktive Bereiche der Ethereum-Forschung
description: Machen Sie sich mit den verschiedenen Bereichen der offenen Forschung vertraut und erfahren Sie, wie auch Sie sich beteiligen können.
lang: de
---

# Aktive Bereiche der Ethereum-Forschung {#active-areas-of-ethereum-research}

Eine der Hauptstärken von Ethereum ist, dass es von einer aktiven Forschungs- und Technik-Community ständig verbessert wird. Viele begeisterte und kompetente Menschen aus aller Welt würden sich gern bei aktuellen Problemstellungen rund um Ethereum einbringen. Doch es ist nicht immer einfach, herauszufinden, was diese Probleme sind. Auf dieser Seite finden Sie die wichtigsten aktiven Forschungsgebiete. So erhalten Sie einen groben Überblick über Innovationen bei Ethereum.

## Wie Ethereum-Forschung funktioniert {#how-ethereum-research-works}

Ethereum-Forschung ist öffentlich und transparent und verkörpert damit die Prinzipien [dezentralisierter Wissenschaft (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Die Idee dahinter ist es, Forschungswerkzeuge und Ergebnisse so offen und interaktiv wie möglich zu gestalten – etwa durch ausführbare Notizhefte. Ethereum-Forschung schreitet schnell voran, da neue Erkenntnisse öffentlich in Foren wie [ethresear.ch](https://ethresear.ch/) gepostet und besprochen werden, anstatt sich nach mehreren Peer-Review-Runden durch traditionelle Veröffentlichungen an die Community zu wenden.

## Allgemeine Forschungsressourcen {#general-research-resources}

Unabhängig vom jeweiligen Thema findet sich auf [ethresear.ch](https://ethresear.ch) und dem [Eth R&D-Discord-Kanal](https://discord.gg/qGpsxSA) eine Fülle an Informationen zur Ethereum-Forschung. Das sind die wichtigsten Orte, an denen die Ethereum-Forscher die neuesten Ideen und Entwicklungsmöglichkeiten diskutieren.

Dieser Bericht wurde im Mai 2022 von [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) veröffentlicht und verschafft einen guten Überblick über die Ethereum-Roadmap.

## Finanzierungsquellen {#sources-of-funding}

Sie können sich an der Forschung um Ethereum beteiligen und Geld dafür erhalten! Zum Beispiel veranstaltete [die Ethereum Foundation](/foundation/) vor Kurzem eine [Finanzierungsrunde für akademische Stipendien](https://esp.ethereum.foundation/academic-grants). Informationen über aktive und bevorstehende Finanzierungsmöglichkeiten finden Sie auf der [Ethereum-Finanzierungseite](/community/grants/) finden.

## Protokollforschung {#protocol-research}

Protokollforschung beschäftigt sich mit der Grundebene von Ethereum – dem Regelsatz, der definiert, wie sich Knoten verbinden, miteinander kommunizieren, Ethereum-Daten austauschen und speichern und zu einem Konsens zum aktuellen Stand der Blockchain kommen. Protokollforschung wird auf oberster Ebene in zwei Kategorien geteilt: Konsens und Ausführung.

### Konsens {#consensus}

Konsensforschung beschäftigt sich mit [Ethereums Proof-of-Stake-Mechanismus](/developers/docs/consensus-mechanisms/pos/). Einige Beispiele zu Konsensforschungsgebieten:

- Schwachstellen identifizieren und beheben
- Die kryptoökonomische Sicherheit quantifizieren
- Die Sicherheit oder Leistung bei der Implementierung der Clients verbessern
- Leichte Clients entwickeln

Genau wie zukunftsorientierte Forschung werden einige fundamentale Neugestaltungen des Protokolls, wie beispielsweise die Entgültigkeit von Einzelslots (Single Slot Finality), erforscht, damit signifikante Verbesserungen von Ethereum möglich sind. Wichtige Forschungsgebiete sind außerdem Effizienz, Sicherheit und Überwachung von Peer-to-Peer-Netzwerken zwischen Konsens-Clients.

#### Hintergrundlektüre {#background-reading}

- [Einführung in Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG-Artikel](https://arxiv.org/abs/1710.09437)
- [Casper-FFG-Erklärung](https://arxiv.org/abs/1710.09437)
- [Casper-Artikel](https://arxiv.org/abs/2003.03052)

#### Aktuelle Forschung {#recent-research}

- [Ethresear.ch – Konsens](https://ethresear.ch/c/consensus/29)
- [Verfügbarkeits-/Endgültigkeitsdilemma](https://arxiv.org/abs/2009.04987)
- [Einzelslot-Finalität](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Proposer-Builder-Trennung](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Ausführung {#execution}

Die Ausführungsebene beschäftigt sich damit, Transaktionen auszuführen, die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) zu betreiben und Ausführungsnutzlasten zu generieren, die an die Konsensebene übergeben werden. Es gibt viele Bereiche der aktiven Forschung, dazu gehören:

- Unterstützung von leichten Clients etablieren
- Gas-Limits untersuchen
- Neue Datenstrukturen (z. B. Verkle-Bäume) etablieren

#### Hintergrundlektüre {#background-reading-1}

- [Einführung in die EVM](/developers/docs/evm)
- [Ethresear.ch – Ausführungsebene](https://ethresear.ch/c/execution-layer-research/37)

#### Aktuelle Forschung {#recent-research-1}

- [Datenbankoptimierung](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Statusverfall](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Wege zum Statusverfall](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle und Vorschlag zum Statusverfall](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Verlaufsmanagement](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle-Bäume](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Datenverfügbarkeits-Sampling](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Client-Entwicklung {#client-development}

Ethereum-Clients sind Implementationen des Ethereum-Protokolls. Die Entwicklung von Clients realisiert die Ergebnisse der Protokollforschung, indem sie in diese Clients einfließen. Die Entwicklung von Clients beinhaltet das Aktualisieren der Client-Spezifikationen sowie den Aufbau spezifischer Implementationen.

Ein Ethereum-Knoten wird benötigt, um zwei Arten von Software zu betreiben:

1. einen Konsens-Client, um die Spitze der Blockchain zu verfolgen, Blöcke zu übermitteln und die Konsenslogik zu verarbeiten
2. einen Ausführungs-Client, um die virtuelle Ethereum Virtual Machine (EVM) zu unterstützen und Transaktionen sowie Smart Contracts auszuführen

Besuchen Sie die [Knoten- und Clients-Seite](/developers/docs/nodes-and-clients/), um mehr Details zu Knoten und Clients zu erfahren und eine Liste aller aktuellen Client-Implementationen einzusehen. Auf der [Verlaufsseite](/history/) können Sie auch den Verlauf aller Ethereum-Upgrades finden.

### Ausführungs-Clients {#execution-clients}

- [Ausführungs-Client-Spezifikation](https://github.com/ethereum/execution-specs)
- [Ausführungs-API-Spezifikation](https://github.com/ethereum/execution-apis)

### Konsens-Clients {#consensus-clients}

- [Konsens-Client-Spezifikation](https://github.com/ethereum/consensus-specs)
- [Beacon-API-Spezifikation](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skalierung und Leistung {#scaling-and-performance}

Das Skalieren von Ethereum ist ein äußerst wichtiger Bereich für Ethereum-Forscher. Die aktuellen Ansätze beschäftigen sich damit, Transaktionen auf Rollups auszulagen und diese durch Daten-Blobs so günstig wie möglich zu machen. Einführende Informationen zur Ethereum-Skalierung sind auf unserer [Skalierungsseite](/developers/docs/scaling) verfügbar.

### Ebene 2 {#layer-2}

Es gibt jetzt mehrere Ebene-2-Protokolle, die Ethereum skalieren und dabei verschiedene Techniken für die Stapelverarbeitung von Transaktionen nutzen und sie auf Ebene 1 von Ethereum sichern. Dieser Bereich entwickelt sich rasant und bietet enormes Forschungs- und Entwicklungspotenzial.

#### Hintergrundlektüre {#background-reading-2}

- [Einführung in Ebene 2](/layer-2/)
- [Polynya: Rollups, DA und Modularketten](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Aktuelle Forschung {#recent-research-2}

- [Das Fair-Ordering für Sequencer von Arbitrum](https://eprint.iacr.org/2021/1465)
- [ethresear.ch – Ebene 2](https://ethresear.ch/c/layer-2/32)
- [Rollup-zentrierte Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Brücken {#bridges}

Sichere und leistungsfähige Brücken sind ein spezifischer Bereich der Ebene 2, für den mehr Forschung und Entwicklung erforderlich sind. Das beinhaltet Brücken zwischen verschiedenen Ebenen 2 und Brücken zwischen Ebene 1 und Ebene 2. Dieser Forschungsbereich ist besonders wichtig, da Hacker sich häufig auf Brücken konzentrieren.

#### Hintergrundlektüre {#background-reading-3}

- [Einführung in Blockchain-Brücken](/bridges/)
- [Vitalik zum Thema Brücken](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artikel zum Thema Blockchain-Brücken](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Gesperrter Wert in Brücken](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Aktuelle Forschung {#recent-research-3}

- [Validierung von Brücken] (https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Das Sharding der Ethereum-Blockchain war lange Teil des Entwicklungsfahrplans. Es gibt jedoch neue Skalierungsansätze wie das „Danksharding“, die zuzeit im Mittelpunkt stehen.

Die Vorstufe zum vollständigen Danksharding, das sogenannte Proto-Danksharding, wurde mit der Upgrade des Netzwerks Cancun-Deneb („Dencun“) in Betrieb genommen.

[Mehr zum Dencun-Upgrade](/roadmap/dencun/)

#### Hintergrundlektüre {#background-reading-4}

- [Proto-Danksharding – Hinweise](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding – Video](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Forschungskompendium zu Ethereum-Sharding](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Aktuelle Forschung {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik zum Thema Sharding und Datenverfügbarkeitsstichproben](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Der Betrieb von Knoten](/developers/docs/nodes-and-clients/run-a-node/) auf schichter Hardware ist für die Dezentralität von Ethereum von entscheidender Bedeutung. Deshalb ist die aktive Forschung zum Abbau der Voraussetzungen an die Hardware für das Betreiben von Knoten ein wichtiger Bereich.

#### Hintergrundlektüre {#background-reading-5}

- [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Aktuelle Forschung {#recent-research-5}

- [ecdsa auf FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sicherheit {#security}

Sicherheit ist ein großes Feld, das Spam-/Scam-Prävention, Sicherheit von Wallets, Hardwaresicherheit, krypto-ökonomische Sicherheit, Fehlersuche und das Testen von Anwendungen und Client-Software sowie die Schlüsselverwaltung umfasst. Beiträge zu Erkenntnissen in diesen Bereichen werden dabei helfen, die Bereitschaft zur Annahme in der Öffentlichkeit zu fördern.

### Kryptographie und ZKP {#cryptography--zkp}

Zero-Knowledge-Proofs (ZKP) und Kryptographie sind entscheidend, wenn es darum geht, Datenschutz und Sicherheit bei Ethereum und seinen Anwendungen zu etablieren. Zero-Knowledge ist ein relativ junger, aber sich schnell entwickelnder Bereich mit vielen offenen Forschungs- und Entwicklungsmöglichkeiten. Zu den Möglichkeiten gehören die Entwicklung effizienterer Implementierungen des [Keccak-Hashing-Algorithmus](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), die Suche nach besseren Polynomverpflichtungen, als es sie derzeit gibt, die Senkung der Kosten für die Generierung öffentlicher ECDSA-Schlüssel und Signaturverifizierungsschaltungen.

#### Hintergrundlektüre {#background-reading-6}

- [0xparc-Blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge-Podcast](https://zeroknowledge.fm/)

#### Aktuelle Forschung {#recent-research-6}

- [Jüngste Fortschritte in der Kryptographie mit elliptischen Kurven](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch – ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Wallets {#wallets}

Ethereum-Wallets können Browsererweiterungen, Desktop- und Handyapps oder Smart Contracts auf Ethereum sein. Es gibt auch aktive Forschung, die sich mit Social-Recovery-Wallets befasst, die einige Risiken in Zusammenhang mit der Schlüsselverwaltung bei individuellen Benutzern minimieren. Verbunden mit der Wallet-Entwicklung ist die Forschung für alternative Formen der Kontoabstraktion, was ein wichtiges zukünftiges Forschungsfeld darstellt.

#### Hintergrundlektüre {#background-reading-7}

- [Einführung in Wallets](/wallets/)
- [Einführung in die Sicherheit von Wallets](/security/)
- [ethresear.ch – Sicherheit](https://ethresear.ch/tag/security)
- [EIP-2938 Kontoabstraktion](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Kontoabstraktion](https://eips.ethereum.org/EIPS/eip-4337)

#### Aktuelle Forschung {#recent-research-7}

- [Validierungsorientierte Smart-Contract-Wallets] (https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Die Zukunft von Konten](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: AUTH- und AUTHCALL-Opcodes](https://eips.ethereum.org/EIPS/eip-3074)
- [Veröffentlichung von Code unter einer EOA-Adresse](https://eips.ethereum.org/EIPS/eip-5003)

## Community, Aufklärung und Reichweite {#community-education-and-outreach}

Damit sich neue Benutzer mit Ethereum vertraut machen können, braucht es informative Ressourcen und Ansätze, um Reichweite zu schaffen. Das kann Blogeinträge, Artikel, Bücher, Podcasts, Memes, Lehrmittel, Ereignisse und alles Weitere, was Communitys bildet, Neuanfänger begrüßt und Personen über Ethereum aufklärt, beinhalten.

### UX/UI {#uxui}

Um mehr Menschen mit Ethereum vertraut zu machen, muss das Ökosystem die UX/UI verbessern. Dafür braucht es Designer und Produktexperten, die das Design von Wallets und Anwendungen prüfen.

#### Hintergrundlektüre {#background-reading-8}

- [Ethresear.ch – UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Aktuelle Forschung {#recent-research-8}

- [Web3-Design-Discord](https://discord.gg/FsCFPMTSm9)
- [Web3-Design-Prinzipien](https://www.web3designprinciples.com/)
- [Ethereum Magicians-UX-Diskussion](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Wirtschaft {#economics}

Die Wirtschaftsforschung rund um Ethereum verfolgt im Großen und Ganzen zwei Ansätze: das Validieren der Sicherheit von Mechanismen, die von wirtschaftlichen Anreizen („Mikroökonomie“) abhängig sind, und das Analysieren des Wertflusses zwischen Protokollen, Anwendungen und Benutzern („Makroökonomie“). Es gibt komplexe krypto-ökonomische Faktoren, die mit dem nativen Ethereum-Asset (Ether) und den darauf aufbauenden Token (z. B. NFTs und ERC20-Token) zusammenhängen.

#### Hintergrundlektüre {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [ETHconomics-Workshop bei Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Aktuelle Forschung {#recent-research-9}

- [Empirische Analyse von EIP1559](https://arxiv.org/abs/2201.05574)
- [Balance in der zirkulierenden Versorgung](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV-Quantifizierung: Wie dunkel ist der Wald?](https://arxiv.org/abs/2101.05511)

### Blockaum- und Gebührenmärkte {#blockspace-fee-markets}

Blockraum-Märkte regeln die Aufnahme von Endbenutzertransaktionen, entweder direkt auf Ethereum (Ebene 1) oder auf Brückennetzwerken, wie zum Beispiel Rollups (Ebene 2). Auf Ethereum werden Transaktionen zum Gebührenmarkt übermittelt – im Protokoll als EIP-1599 bereitgestellt. Das schützt die Blockchain vor Spam und Preisstau. Auf beiden Ebenen können Transaktionen Externalitäten bedingen, bekannt als maximal extrahierbarer Wert (MEV – Maximal Extractable Value), die neue Marktstrukturen zur Erfassung oder Verwaltung dieser Externalitäten auslösen.

#### Hintergrundlektüre {#background-reading-10}

- [Transaktionsgebührenmechanismus-Design für die Ethereum-Blockchain: Eine wirtschaftliche Analyse von EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulationen von EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Rollup-Wirtschaft von Grund auf](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Neuordnung von Transaktionen und Konsensinstabilität in dezentralen Börsen](https://arxiv.org/abs/1904.05234)

#### Aktuelle Forschung {#recent-research-10}

- [Multidimensionale EIP-1559-Videopräsentation](https://youtu.be/QbR4MTgnCko)
- [Domänenübergreifendes MEV](http://arxiv.org/abs/2112.01472)
- [MEV-Auktionen](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Proof-of-Stake-Anreize {#proof-of-stake-incentives}

Validatoren nutzen Ethereums natives Asset (Ether) als Sicherheit vor unehrlichem Verhalten. Die Kryptoökonomie dahinter entscheidet über die Sicherheit des Netzwerks. Ausgefeilte Validatoren könnten Teile der Anreizebene ausnutzen, um explizite Angriffe zu starten.

#### Hintergrundlektüre {#background-reading-11}

- [Meisterkurs zur Ethereum-Ökonomie und Wirtschaftsmodell](https://github.com/CADLabs/ethereum-economic-model)
- [Simulationen von PoS-Anreizen (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Aktuelle Forschung {#recent-research-11}

- [Erhöhung der Zensurresistenz von Transaktionen im Rahmen der Proposer-Builder-Trennung (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Drei Angriffe auf PoS-Ethereum] (https://arxiv.org/abs/2110.10086)

### Liquid Staking und Derivate {#liquid-staking-and-derivatives}

Liquid Staking erlaubt Benutzern mit weniger als 32 ETH Stakingerträge zu erhalten, indem sie Ether für einen Token austauschen, der gestaktes Ether darstellt und in DeFi verwendet werden kann. Jedoch müssen die Anreize und Marktdynamiken, die mit Liquid Staking verbunden sind, noch erkundet werden. Es müssen zudem noch die Effekte, die Liquid Staking auf Ethereums Sicherheit hat (z. B. Zentralisierungsrisiken), gefunden werden.

#### Hintergrundlektüre {#background-reading-12}

- [Ethresear.ch – Liquid Staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Der Weg zum vertrauenslosen Ethereum-Staking](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Einführung in das Staking-Protokoll](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Aktuelle Forschung {#recent-research-12}

- [Abwicklung von Abhebungen von Lido] (https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Anmeldeinformationen für Abhebungen](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Die Risiken von Liquid Staking-Derivaten](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Tests {#testing}

### Formale Verifizierung {#formal-verification}

Bei der formalen Verifizierung wird Code geschrieben, um zu überprüfen, ob die Konsensspezifikationen von Ethereum korrekt und fehlerfrei sind. Es gibt eine ausführbare Version der Spezifikation, die in Python geschrieben ist und sowohl Wartung als auch Entwicklung erfordert. Weitere Forschung kann dabei helfen, die Python-Implementierung der Spezifikationen zu verbessern und Tools für die sicherere Verifizierung von Korrektheits- und Identitätsproblemen einzuführen.

#### Hintergrundlektüre {#background-reading-13}

- [Einführung in die formale Verifizierung](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formale Verifizierung (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Aktuelle Forschung {#recent-research-13}

- [Formale Verifizierung des Einzahlungsvertrags](https://github.com/runtimeverification/deposit-contract-verification)
- [Formale Verifizierung der Beacon Chain-Spezifikation](https://github.com/runtimeverification/deposit-contract-verification)

## Datenwissenschaft und -analyse {#data-science-and-analytics}

Es werden mehr Tools für die Datenanalyse benötigt. Außerdem braucht es Dashboards mit detaillierten Informationen zur Aktivität auf Ethereum und zum Zustand des Netzwerks.

### Hintergrundlektüre {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dashboard zur Client-Diversität](https://clientdiversity.org/)

#### Aktuelle Forschung {#recent-research-14}

- [Datenanalyse von Robust Incentives Group](https://ethereum.github.io/rig/)

## Apps und Tools {#apps-and-tooling}

Die Anwendungsebene unterstützt ein diverses Ökosystem von Programmen, die Transaktionen auf der Grundebene von Ethereum regeln. Entwicklungsteams finden ständig neue Wege, Ethereum zu nutzen, um zusammensetzbare, berechtigungsfreie und zensurresistente Versionen von wichtigen Web2-Apps oder völlig neue Web3-native Konzepte zu erstellen. Gleichzeitig werden neue Tools entwickelt, die die Entwicklung von dApps auf Ethereum weniger komplex machen.

### DeFi {#defi}

Dezentralisierte Finanzen (DeFi) ist eine der Hauptanwendungsklassen, die auf Ethereum aufbauen. DeFi zielt darauf ab, zusammensetzbare „Geld-Legosteine“ zu entwickeln, mit denen Benutzer Krypto-Assets mithilfe von Smart Contracts speichern, übertragen, ausleihen, leihen und investieren können. DeFi ist ein Bereich, der sich beständig rasant entwickelt. Forschung zu sicheren, effizienten und zugänglichen Protokollen wird stets benötigt.

#### Hintergrundlektüre {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Was ist DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Aktuelle Forschung {#recent-research-15}

- [Dezentrale Finanzen, zentrales Eigentum?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Der Weg zu Transaktionen unter einem Dollar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

Ein bedeutender Anwendungsfall von Ethereum ist die Möglichkeit der Organisierung auf eine dezentrale Art, durch die Nutzung von DAOs. Es wird intensiv daran geforscht, wie DAOs auf Ethereum entwickelt und eingesetzt werden können, um verbesserte Governance-Formen als vertrauensminimiertes Koordinationsinstrument zu realisieren. Dadurch werden die Möglichkeiten über traditionelle Unternehmen und Organisationen hinaus erheblich erweitert.

#### Hintergrundlektüre {#background-reading-16}

- [Einführung in DAOs](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Aktuelle Forschung {#recent-research-16}

- [Zuordnung des DAO-Ökosystems] (https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Entwicklerwerkzeuge {#developer-tools}

Die Tools für Ethereum-Entwickler verbessern sich rasant. Dieser Bereich bietet viel Raum für eine aktive Forschung und Entwicklung.

#### Hintergrundlektüre {#background-reading-17}

- [Tools nach Programmiersprache](/developers/docs/programming-languages/)
- [Entwickler-Frameworks](/developers/docs/frameworks/)
- [Toolliste für Konsensentwickler](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Token-Standards](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM-Tools](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Aktuelle Forschung {#recent-research-17}

- [Eth R&D – Discord-Kanal zu Konsenstools](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Orakel {#oracles}

Orakel importieren Off-Chain-Daten in die Blockchain auf eine genehmigungsfreie und dezentrale Art. Diese Daten auf die Chain zu bekommen, schafft für dApps die Grundlage, auf Phänomene aus der realen Welt zu reagieren. Dazu gehören Preisveränderungen von Assets der echten Welt, Ereignisse in Off-Chain-Apps und sogar Wetterveränderungen.

#### Hintergrundlektüre {#background-reading-18}

- [Einführung in Oracles](/Entwickler/Dok/Orakel/)

#### Aktuelle Forschung {#recent-research-18}

- [Umfrage zu Blockchain-Orakeln](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink-Whitepaper](https://chain.link/whitepaper)

### App-Sicherheit {#app-security}

Bei Angriffen auf Ethereum werden meist Schwachstellen von bestimmten Anwendungen und nicht Schwachstellen des Protokolls selbst ausgenutzt. Angreifer und Anwendungsentwickler befinden sich dabei in einem Wettbewerb bei der Entwicklung neuer Angriffe und Verteidigungsmöglichkeiten. Das bedeutet, dass es immer wichtige Forschung und Entwicklung benötigt, um Anwendungen vor Angriffen zu schützen.

#### Hintergrundlektüre {#background-reading-19}

- [Bericht zur Wormhole-Sicherheitslücke](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Liste der Nachbetrachtungen von Ethereum-Vertrags-Hacks](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Aktuelle Forschung {#recent-research-19}

- [ethresear.ch – Anwendungen](https://ethresear.ch/c/applications/18)

### Technologie-Stack {#technology-stack}

Den gesamten Technologie-Stack von Ethereum zu dezentralisieren, ist ein wichtiger Forschungsbereich. Derzeit weisen dApps auf Ethereum für gewöhnlich eine Form der Zentralisierung auf, da sie sich auf zentralisierte Tools oder Infrastrukturen verlassen.

#### Hintergrundlektüre {#background-reading-20}

- [Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Coinbase: Einführung in den Web3-Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Einführung in Smart Contracts](/developers/docs/smart-contracts/)
- [Einführung in die dezentrale Speicherung](/developers/docs/storage/)

#### Aktuelle Forschung {#recent-research-20}

- [Smart Contract-Zusammensetzbarkeit](/developers/docs/smart-contracts/composability/)
