---
title: Aktive Forschungsbereiche von Ethereum
description: Erkunden Sie verschiedene Bereiche der offenen Forschung und erfahren Sie, wie Sie sich einbringen können.
lang: de
---

Eine der Hauptstärken von Ethereum ist, dass eine aktive Forschungs- und Entwicklungs-Community es ständig verbessert. Viele enthusiastische, fähige Menschen weltweit würden sich gerne den offenen Fragen bei Ethereum widmen, aber es ist nicht immer einfach herauszufinden, welche das sind. Diese Seite skizziert die wichtigsten aktiven Forschungsbereiche als groben Leitfaden zur Innovationsspitze von Ethereum.

## Wie die Ethereum-Forschung funktioniert {#how-ethereum-research-works}

Die Ethereum-Forschung ist offen und transparent und verkörpert die Prinzipien der [Dezentralisierten Wissenschaft (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Die Kultur besteht darin, Forschungswerkzeuge und -ergebnisse so offen und interaktiv wie möglich zu gestalten, beispielsweise durch ausführbare Notebooks. Die Ethereum-Forschung bewegt sich schnell; neue Erkenntnisse werden offen in Foren wie [ethresear.ch](https://ethresear.ch/) gepostet und diskutiert, anstatt die Community erst durch traditionelle Publikationen nach mehreren Runden von Peer-Reviews zu erreichen.

## Allgemeine Forschungsressourcen {#general-research-resources}

Unabhängig vom spezifischen Thema gibt es eine Fülle von Informationen zur Ethereum-Forschung auf [ethresear.ch](https://ethresear.ch) und im [Eth R&D Discord-Kanal](https://discord.gg/qGpsxSA). Dies sind die primären Orte, an denen Ethereum-Forscher die neuesten Ideen und Entwicklungsmöglichkeiten diskutieren.

Dieser im Mai 2022 von [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) veröffentlichte Bericht bietet einen guten Überblick über die Ethereum-Roadmap.

## Finanzierungsquellen {#sources-of-funding}

Sie können sich an der Ethereum-Forschung beteiligen und dafür bezahlt werden! Zum Beispiel hat [die Ethereum Foundation](/foundation/) kürzlich eine [Finanzierungsrunde für akademische Zuschüsse (Academic Grants)](https://esp.ethereum.foundation/academic-grants) durchgeführt. Informationen zu aktiven und kommenden Finanzierungsmöglichkeiten finden Sie auf [der Ethereum-Zuschussseite (Grants)](/community/grants/).

## Protokollforschung {#protocol-research}

Die Protokollforschung befasst sich mit der Basisschicht von Ethereum – dem Regelwerk, das definiert, wie Knoten sich verbinden, kommunizieren, Ethereum-Daten austauschen und speichern und zu einem Konsens über den Zustand der Blockchain gelangen. Die Protokollforschung wird in zwei Hauptkategorien unterteilt: Konsens und Ausführung.

### Konsens {#consensus}

Die Konsensforschung befasst sich mit dem [Proof-of-Stake-Mechanismus von Ethereum](/developers/docs/consensus-mechanisms/pos/). Einige beispielhafte Themen der Konsensforschung sind:

- Identifizierung und Behebung von Schwachstellen;
- Quantifizierung der kryptoökonomischen Sicherheit;
- Erhöhung der Sicherheit oder Leistung von Client-Implementierungen;
- und Entwicklung von Light-Clients.

Neben zukunftsweisender Forschung werden auch einige grundlegende Neugestaltungen des Protokolls, wie die Single-Slot-Finalität, erforscht, um signifikante Verbesserungen für Ethereum zu ermöglichen. Darüber hinaus sind die Effizienz, Sicherheit und Überwachung des Peer-to-Peer-Netzwerks zwischen Konsens-Clients ebenfalls wichtige Forschungsthemen.

#### Hintergrundlektüre {#background-reading}

- [Einführung in Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Casper FFG-Paper](https://arxiv.org/abs/1710.09437)
- [Casper FFG-Erklärung](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Gasper-Paper](https://arxiv.org/abs/2003.03052)

#### Aktuelle Forschung {#recent-research}

- [Ethresear.ch Konsens](https://ethresear.ch/c/consensus/29)
- [Verfügbarkeits-/Endgültigkeits-Dilemma](https://arxiv.org/abs/2009.04987)
- [Single-Slot-Finalität](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Proposer-Builder-Trennung (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Ausführung {#execution}

Die Ausführungsschicht befasst sich mit der Ausführung von Transaktionen, dem Betrieb der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) und der Generierung von Ausführungs-Payloads zur Weitergabe an die Konsensschicht. Es gibt viele aktive Forschungsbereiche, darunter:

- Ausbau der Unterstützung für Light-Clients;
- Erforschung von Gas-Limits;
- und Einbindung neuer Datenstrukturen (z. B. Verkle-Bäume).

#### Hintergrundlektüre {#background-reading-1}

- [Einführung in die EVM](/developers/docs/evm)
- [Ethresear.ch Ausführungsschicht](https://ethresear.ch/c/execution-layer-research/37)

#### Aktuelle Forschung {#recent-research-1}

- [Datenbankoptimierungen](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Zustandsablauf](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Wege zum Zustandsablauf](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Vorschlag für Verkle und Zustandsablauf](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Verwaltung der Historie](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle-Bäume](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Data Availability Sampling (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Client-Entwicklung {#client-development}

Ethereum-Clients sind Implementierungen des Ethereum-Protokolls. Die Client-Entwicklung setzt die Ergebnisse der Protokollforschung in die Realität um, indem sie diese in die Clients einbaut. Die Client-Entwicklung umfasst sowohl die Aktualisierung der Client-Spezifikationen als auch die Erstellung spezifischer Implementierungen.

Ein Ethereum-Knoten muss zwei Softwarekomponenten ausführen:

1. einen Konsens-Client, um den Kopf der Blockchain zu verfolgen, Blöcke zu verbreiten (Gossip) und die Konsenslogik zu handhaben
2. einen Ausführungsclient, um die Ethereum Virtual Machine zu unterstützen und Transaktionen sowie Smart Contracts auszuführen

Weitere Details zu Knoten und Clients sowie eine Liste aller aktuellen Client-Implementierungen finden Sie auf der [Seite zu Knoten und Clients](/developers/docs/nodes-and-clients/). Eine Historie aller Ethereum-Upgrades finden Sie auf der [Historienseite](/ethereum-forks/).

### Ausführungsclients {#execution-clients}

- [Spezifikation für Ausführungsclients](https://github.com/ethereum/execution-specs)
- [Spezifikation der Ausführungs-API](https://github.com/ethereum/execution-apis)

### Konsens-Clients {#consensus-clients}

- [Spezifikation für Konsens-Clients](https://github.com/ethereum/consensus-specs)
- [Spezifikation der Beacon-API](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skalierung und Leistung {#scaling-and-performance}

Die Skalierung von Ethereum ist ein großer Schwerpunkt für Ethereum-Forscher. Aktuelle Ansätze umfassen die Auslagerung von Transaktionen auf Rollups und deren größtmögliche Verbilligung durch Daten-Blobs. Einführende Informationen zur Skalierung von Ethereum finden Sie auf unserer [Skalierungsseite](/developers/docs/scaling).

### Layer 2 {#layer-2}

Es gibt mittlerweile mehrere Layer-2-Protokolle, die Ethereum skalieren, indem sie verschiedene Techniken zur Bündelung von Transaktionen und zu deren Absicherung auf Ethereum Layer 1 verwenden. Dies ist ein sehr schnell wachsendes Thema mit viel Forschungs- und Entwicklungspotenzial.

#### Hintergrundlektüre {#background-reading-2}

- [Einführung in Layer 2](/layer-2/)
- [Polynya: Rollups, DA und modulare Chains](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Aktuelle Forschung {#recent-research-2}

- [Arbitrums Fair-Ordering für Sequencer](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)
- [Rollup-zentrierte Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Bridges {#bridges}

Ein besonderer Bereich von Layer 2, der mehr Forschung und Entwicklung erfordert, sind sichere und leistungsstarke Bridges (Brücken). Dies umfasst Bridges zwischen verschiedenen Layer 2s sowie Bridges zwischen Layer 1 und Layer 2. Dies ist ein besonders wichtiger Forschungsbereich, da Bridges häufig das Ziel von Hackern sind.

#### Hintergrundlektüre {#background-reading-3}

- [Einführung in Blockchain-Bridges](/bridges/)
- [Vitalik über Bridges](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artikel über Blockchain-Bridges](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [In Bridges gesperrter Wert](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Aktuelle Forschung {#recent-research-3}

- [Validierung von Bridges](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Das Sharding der Ethereum-Blockchain ist seit langem Teil der Entwicklungs-Roadmap. Neue Skalierungslösungen wie "Danksharding" rücken jedoch derzeit in den Mittelpunkt.

Der Vorläufer des vollständigen Dankshardings, bekannt als Proto-Danksharding, ging mit dem Cancun-Deneb-Netzwerk-Upgrade ("Dencun") live.

[Mehr über das Dencun-Upgrade](/roadmap/dencun/)

#### Hintergrundlektüre {#background-reading-4}

- [Notizen zu Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless-Video zu Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Kompendium zur Ethereum-Sharding-Forschung](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Aktuelle Forschung {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik über Sharding und Data Availability Sampling](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Das Ausführen von Knoten](/developers/docs/nodes-and-clients/run-a-node/) auf bescheidener Hardware ist grundlegend, um Ethereum dezentral zu halten. Daher ist die aktive Erforschung der Minimierung der Hardwareanforderungen für den Betrieb von Knoten ein wichtiger Forschungsbereich.

#### Hintergrundlektüre {#background-reading-5}

- [Ethereum auf ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Aktuelle Forschung {#recent-research-5}

- [ECDSA auf FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sicherheit {#security}

Sicherheit ist ein weites Feld, das Spam-/Betrugsprävention, Wallet-Sicherheit, Hardware-Sicherheit, kryptoökonomische Sicherheit, Bug-Hunting und das Testen von Anwendungen und Client-Software sowie Schlüsselverwaltung umfassen kann. Ein Beitrag zum Wissen in diesen Bereichen wird dazu beitragen, die Mainstream-Adoption zu fördern.

### Kryptographie & ZKP {#cryptography--zkp}

Zero-Knowledge-Beweise (ZKP) und Kryptographie sind entscheidend, um Privatsphäre und Sicherheit in Ethereum und seine Anwendungen zu integrieren. Zero-Knowledge ist ein relativ junger, aber schnelllebiger Bereich mit vielen offenen Forschungs- und Entwicklungsmöglichkeiten. Einige Möglichkeiten umfassen die Entwicklung effizienterer Implementierungen des [Keccak-Hashing-Algorithmus](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), das Finden besserer Polynomial-Commitments als die derzeit existierenden oder die Reduzierung der Kosten für die Generierung von öffentlichen ECDSA-Schlüsseln und Signaturverifizierungsschaltungen.

#### Hintergrundlektüre {#background-reading-6}

- [0xPARC-Blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero-Knowledge-Podcast](https://zeroknowledge.fm/)

#### Aktuelle Forschung {#recent-research-6}

- [Aktuelle Fortschritte in der Kryptographie auf Basis elliptischer Kurven](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Wallets {#wallets}

Ethereum-Wallets können Browser-Erweiterungen, Desktop- und mobile Apps oder Smart Contracts auf Ethereum sein. Es gibt aktive Forschung zu Wallets mit sozialer Wiederherstellung, die einige der Risiken reduzieren, die mit der Schlüsselverwaltung durch einzelne Benutzer verbunden sind. Verbunden mit der Entwicklung von Wallets ist die Erforschung alternativer Formen der Kontoabstraktion, was ein wichtiger Bereich der aufkommenden Forschung ist.

#### Hintergrundlektüre {#background-reading-7}

- [Einführung in Wallets](/wallets/)
- [Einführung in die Wallet-Sicherheit](/security/)
- [Ethresear.ch Sicherheit](https://ethresear.ch/tag/security)
- [EIP-2938 Kontoabstraktion](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Kontoabstraktion](https://eips.ethereum.org/EIPS/eip-4337)

#### Aktuelle Forschung {#recent-research-7}

- [Validierungsfokussierte Smart-Contract-Wallets](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Die Zukunft von Konten](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH- und AUTHCALL-Opcodes](https://eips.ethereum.org/EIPS/eip-3074)
- [Veröffentlichung von Code an einer EOA-Adresse](https://eips.ethereum.org/EIPS/eip-5003)

## Community, Bildung und Öffentlichkeitsarbeit {#community-education-and-outreach}

Das Onboarding neuer Benutzer bei Ethereum erfordert neue Bildungsressourcen und Ansätze für die Öffentlichkeitsarbeit. Dies kann Blogbeiträge und Artikel, Bücher, Podcasts, Memes, Lehrmaterialien, Ereignisse und alles andere umfassen, was Communities aufbaut, Neueinsteiger willkommen heißt und Menschen über Ethereum aufklärt.

### UX/UI {#uxui}

Um mehr Menschen für Ethereum zu gewinnen (Onboarding), muss das Ökosystem die UX/UI verbessern. Dies erfordert, dass Designer und Produktexperten das Design von Wallets und Apps neu überdenken.

#### Hintergrundlektüre {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Aktuelle Forschung {#recent-research-8}

- [Web3 Design Discord](https://discord.gg/FsCFPMTSm9)
- [Web3-Designprinzipien](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX-Diskussion](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ökonomie {#economics}

Die Wirtschaftsforschung bei Ethereum verfolgt im Großen und Ganzen zwei Ansätze: die Validierung der Sicherheit von Mechanismen, die auf wirtschaftlichen Anreizen beruhen ("Mikroökonomie"), und die Analyse der Wertströme zwischen Protokollen, Anwendungen und Benutzern ("Makroökonomie"). Es gibt komplexe kryptoökonomische Faktoren in Bezug auf das native Asset von Ethereum (Ether) und die darauf aufgebauten Token (zum Beispiel NFTs und ERC-20-Token).

#### Hintergrundlektüre {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [ETHconomics-Workshop auf der Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Aktuelle Forschung {#recent-research-9}

- [Empirische Analyse von EIP-1559](https://arxiv.org/abs/2201.05574)
- [Gleichgewicht des zirkulierenden Angebots](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifizierung von MEV: Wie dunkel ist der Wald?](https://arxiv.org/abs/2101.05511)

### Blockspace und Gebührenmärkte {#blockspace-fee-markets}

Blockspace-Märkte regeln die Einbeziehung von Endbenutzer-Transaktionen, entweder direkt auf Ethereum (Layer 1) oder auf überbrückten Netzwerken, z. B. Rollups (Layer 2). Auf Ethereum werden Transaktionen an den Gebührenmarkt übermittelt, der als EIP-1559 im Protokoll implementiert ist und die Chain vor Spam schützt sowie Überlastungen bepreist. Auf beiden Schichten können Transaktionen externe Effekte erzeugen, die als Maximal Extractable Value (MEV) bekannt sind und neue Marktstrukturen induzieren, um diese externen Effekte zu erfassen oder zu verwalten.

#### Hintergrundlektüre {#background-reading-10}

- [Design von Transaktionsgebühren-Mechanismen für die Ethereum-Blockchain: Eine ökonomische Analyse von EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulationen von EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Rollup-Ökonomie aus ersten Prinzipien](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Transaktions-Neuordnung und Konsens-Instabilität in dezentralen Börsen](https://arxiv.org/abs/1904.05234)

#### Aktuelle Forschung {#recent-research-10}

- [Videopräsentation zu multidimensionalem EIP-1559](https://youtu.be/QbR4MTgnCko)
- [Cross-Domain MEV](https://arxiv.org/abs/2112.01472)
- [MEV-Auktionen](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Proof-of-Stake-Anreize {#proof-of-stake-incentives}

Validatoren verwenden das native Asset von Ethereum (Ether) als Sicherheit gegen unehrliches Verhalten. Die Kryptoökonomie davon bestimmt die Sicherheit des Netzwerks. Ausgeklügelte Validatoren könnten in der Lage sein, die Nuancen der Anreizschicht auszunutzen, um explizite Angriffe zu starten.

#### Hintergrundlektüre {#background-reading-11}

- [Ethereum-Ökonomie-Meisterklasse und Wirtschaftsmodell](https://github.com/CADLabs/ethereum-economic-model)
- [Simulationen von PoS-Anreizen (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Aktuelle Forschung {#recent-research-11}

- [Erhöhung der Zensurresistenz von Transaktionen unter Proposer-Builder-Trennung (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Drei Angriffe auf PoS-Ethereum](https://arxiv.org/abs/2110.10086)

### Liquid Staking und Derivate {#liquid-staking-and-derivatives}

Liquid Staking ermöglicht es Benutzern mit weniger als 32 ETH, Staking-Renditen zu erhalten, indem sie Ether gegen einen Token tauschen, der gestakten Ether repräsentiert und in DeFi verwendet werden kann. Die Anreize und Marktdynamiken im Zusammenhang mit Liquid Staking werden jedoch noch erforscht, ebenso wie dessen Auswirkungen auf die Sicherheit von Ethereum (z. B. Zentralisierungsrisiken).

#### Hintergrundlektüre {#background-reading-12}

- [Ethresear.ch Liquid Staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Der Weg zum vertrauenslosen Ethereum-Staking](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Einführung in das Staking-Protokoll](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Aktuelle Forschung {#recent-research-12}

- [Umgang mit Auszahlungen von Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Auszahlungsberechtigungen](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Die Risiken von Liquid-Staking-Derivaten](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testen {#testing}

### Formale Verifikation {#formal-verification}

Formale Verifikation bedeutet, Code zu schreiben, um zu überprüfen, ob die Konsensspezifikationen von Ethereum korrekt und fehlerfrei sind. Es gibt eine ausführbare Version der Spezifikation, die in Python geschrieben ist und Wartung sowie Entwicklung erfordert. Weitere Forschung kann dazu beitragen, die Python-Implementierung der Spezifikation zu verbessern und Werkzeuge hinzuzufügen, die die Korrektheit robuster verifizieren und Probleme identifizieren können.

#### Hintergrundlektüre {#background-reading-13}

- [Einführung in die Formale Verifikation](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formale Verifikation (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Aktuelle Forschung {#recent-research-13}

- [Formale Verifikation des Einzahlungsvertrags](https://github.com/runtimeverification/deposit-contract-verification)
- [Formale Verifikation der Beacon Chain-Spezifikation](https://github.com/runtimeverification/deposit-contract-verification)

## Data Science und Analytik {#data-science-and-analytics}

Es besteht Bedarf an mehr Datenanalyse-Tools und Dashboards, die detaillierte Informationen über die Aktivität auf Ethereum und den Zustand des Netzwerks liefern.

### Hintergrundlektüre {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dashboard zur Client-Diversität](https://clientdiversity.org/)

#### Aktuelle Forschung {#recent-research-14}

- [Datenanalyse der Robust Incentives Group](https://rig.ethereum.org/)

## Apps und Tooling {#apps-and-tooling}

Die Anwendungsschicht unterstützt ein vielfältiges Ökosystem von Programmen, die Transaktionen auf der Basisschicht von Ethereum abwickeln. Entwicklungsteams finden ständig neue Wege, Ethereum zu nutzen, um zusammensetzbare, erlaubnisfreie und zensurresistente Versionen wichtiger Web2-Apps zu erstellen oder völlig neue Web3-native Konzepte zu entwickeln. Gleichzeitig wird neues Tooling entwickelt, das die Erstellung von Dapps auf Ethereum weniger komplex macht.

### DeFi {#defi}

Dezentralisierte Finanzen (DeFi) sind eine der primären Anwendungsklassen, die auf Ethereum aufbauen. DeFi zielt darauf ab, zusammensetzbare "Geld-Legos" zu schaffen, die es Benutzern ermöglichen, Krypto-Assets mithilfe von Smart Contracts zu speichern, zu transferieren, zu verleihen, zu leihen und zu investieren. DeFi ist ein schnelllebiger Bereich, der sich ständig aktualisiert. Die Erforschung sicherer, effizienter und zugänglicher Protokolle wird kontinuierlich benötigt.

#### Hintergrundlektüre {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Was ist DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Aktuelle Forschung {#recent-research-15}

- [Dezentralisierte Finanzen, zentralisiertes Eigentum?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Der Weg zu Transaktionen unter einem Dollar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

Ein wirkungsvoller Anwendungsfall für Ethereum ist die Möglichkeit, sich durch den Einsatz von DAOs dezentral zu organisieren. Es gibt viel aktive Forschung darüber, wie DAOs auf Ethereum entwickelt und genutzt werden können, um verbesserte Formen der Governance als vertrauensminimiertes Koordinationswerkzeug auszuführen, was die Optionen der Menschen weit über traditionelle Unternehmen und Organisationen hinaus erweitert.

#### Hintergrundlektüre {#background-reading-16}

- [Einführung in DAOs](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### Aktuelle Forschung {#recent-research-16}

- [Kartierung des DAO-Ökosystems](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Entwickler-Tools {#developer-tools}

Die Tools für Ethereum-Entwickler verbessern sich rasant. In diesem allgemeinen Bereich gibt es viel aktive Forschung und Entwicklung zu leisten.

#### Hintergrundlektüre {#background-reading-17}

- [Tooling nach Programmiersprache](/developers/docs/programming-languages/)
- [Entwickler-Frameworks](/developers/docs/frameworks/)
- [Liste der Konsens-Entwickler-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Token-Standards](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM-Tools](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Aktuelle Forschung {#recent-research-17}

- [Eth R&D Discord-Kanal für Konsens-Tooling](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Orakel {#oracles}

Orakel importieren offchain-Daten auf erlaubnisfreie und dezentrale Weise in die Blockchain. Diese Daten Onchain zu bringen, ermöglicht es Dapps, auf reale Phänomene wie Preisschwankungen bei realen Vermögenswerten, Ereignisse in Offchain-Apps oder sogar Wetteränderungen zu reagieren.

#### Hintergrundlektüre {#background-reading-18}

- [Einführung in Orakel](/developers/docs/oracles/)

#### Aktuelle Forschung {#recent-research-18}

- [Umfrage zu Blockchain-Orakeln](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink-Whitepaper](https://chain.link/whitepaper)

### App-Sicherheit {#app-security}

Hacks auf Ethereum nutzen im Allgemeinen Schwachstellen in einzelnen Anwendungen aus und nicht im Protokoll selbst. Hacker und App-Entwickler befinden sich in einem Wettrüsten, um neue Angriffe und Verteidigungen zu entwickeln. Das bedeutet, dass immer wichtige Forschung und Entwicklung erforderlich ist, um Apps vor Hacks zu schützen.

#### Hintergrundlektüre {#background-reading-19}

- [Bericht zum Wormhole-Exploit](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Liste von Post-Mortems zu Ethereum-Contract-Hacks](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Aktuelle Forschung {#recent-research-19}

- [Ethresear.ch Anwendungen](https://ethresear.ch/c/applications/18)

### Technologie-Stack {#technology-stack}

Die Dezentralisierung des gesamten Ethereum-Technologie-Stacks ist ein wichtiger Forschungsbereich. Derzeit weisen Dapps auf Ethereum häufig einige Zentralisierungspunkte auf, da sie auf zentralisiertes Tooling oder Infrastruktur angewiesen sind.

#### Hintergrundlektüre {#background-reading-20}

- [Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Coinbase: Einführung in den Web3-Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Einführung in Smart Contracts](/developers/docs/smart-contracts/)
- [Einführung in dezentrale Speicherung](/developers/docs/storage/)

#### Aktuelle Forschung {#recent-research-20}

- [Komponierbarkeit von Smart Contracts](/developers/docs/smart-contracts/composability/)