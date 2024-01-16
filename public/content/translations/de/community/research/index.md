---
title: Aktive Bereiche Ethereum-Forschung
description: Machen Sie sich mit den verschiedenen Bereichen der offenen Forschung vertraut und erfahren Sie, wie auch Sie sich beteiligen können.
lang: de
---

# Aktive Bereiche Ethereum-Forschung {#active-areas-of-ethereum-research}

Eine der Stärken von Ethereum ist, dass die aktive Forschung und die Entwickler-Community fortlaufend Verbesserungen hervorbringen. Viele begeisterte und kompetente Menschen aus aller Welt würden sich gerne bei aktuellen Problemstellungen rund um Ethereums einbringen. Doch es ist nicht immer einfach, herauszufinden, was diese Probleme sind. Auf dieser Seite finden Sie die wichtigsten aktiven Forschungsgebiete. So erhalten Sie einen groben Überblick über den neuesten Stand bei Ethereum.

## So funktioniert die Forschung rund um Ethereum {#how-ethereum-research-works}

Die Forschung um Ethereum ist offen und transparent, sie setzt auf die Grundsätze der [dezentralisierten Wissenschaft (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Die Idee ist, Forschungswerkzeuge und Ergebnisse so offen und interaktiv wie möglich zu gestalten. Zum Beispiel durch ausführbare Notizhefte. Die Forschung um Ethereum entwickelt sich schnell. Neue Erkenntnisse werden offen in Foren wie [ethresear.ch](https://ethresear.ch/) veröffentlicht und diskutiert, anstatt über traditionelle Veröffentlichungen nach wiederholten Peer-Überprüfungen an die Community heranzutreten.

## Allgemeine Forschungsressourcen {#general-research-resources}

Unabhängig vom konkreten Thema gibt es viele Informationen zur Forschung um Ethereum. Sie können sie auf [ethresear.ch](https://ethresear.ch) und dem Discord-Kanal [ETH R&D](https://discord.gg/qGpsxSA) finden. Das sind die Orte, an denen die Ethereum-Forscher die neuesten Ideen und Entwicklungsmöglichkeiten diskutieren.

Dieser Bericht wurde im Mai 2022 von [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) veröffentlicht. Darin finden Sie einen guten Überblick über die Roadmaps von Ethereums.

## Finanzierungsquellen {#sources-of-funding}

Sie können sich auf entgeltlicher Basis an der Forschung um Ethereum beteiligen. Zum Beispiel hat die [Ethereum Foundation](/foundation/) kürzlich eine [Academic Grants-Finanzierungsrunde](https://esp.ethereum.foundation/academic-grants) betrieben. Sie finden Informationen zu aktiven und kommenden Finanzierungsmöglichkeiten auf [der Ethereum-Finanzierungsseite](/community/grants/).

## Protokollforschung {#protocol-research}

Protokollforschung beschäftigt sich mit der Grundebene von Ethereum – der Regeln, die definieren wie sich Knoten verbinden, miteinander kommunizieren, sich untereinander austauschen und die Daten von Ethereum speichern. Sie kommt zu einem Konsens zum aktuellen Stand der Blockchain. Protokollforschung wird auf oberster Ebene in zwei Kategorien geteilt: Konsens und Ausführung.

### Konsensmechanismus {#consensus}

Konsensforschung beschäftigt sich mit dem [Proof-of-Stake-Mechanismus von Ethereum](/developers/docs/consensus-mechanisms/pos/). Einige Beispiele zu Konsensforschungsgebieten:

- Schwachstellen identifizieren und beheben;
- Die kryptoökonomische Sicherheit quantifizieren;
- Die Sicherheit oder Leistung bei der Implementierung der Klienten verbessern;
- Leichte Clients entwickeln.

Genau wie zukunftsorientierte Forschung, werden einige fundamentale Neugestaltungen des Protokolls, wie beispielsweise die Entgültigkeit von Einzelslots (Single Slot Finality) genau erforscht, damit signifikante Verbesserungen für Ethereum möglich sind. Außerdem sind auch Effizienz, Sicherheit und Überwachung von Peer-to-Peer-Netzwerken zwischen Konsens-Clients wichtige Forschungsbereiche.

#### Hintergrundinformationen {#background-reading}

- [Einführung zu Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FGG Artikel](https://arxiv.org/abs/1710.09437)
- [Erläuterungen zu Casper-FGG](https://arxiv.org/abs/1710.09437)
- [Gasper Artikel](https://arxiv.org/abs/2003.03052)

#### Aktuelle Forschung {#recent-research}

- [Ethresear.ch – Konsens](https://ethresear.ch/c/consensus/29)
- [Barrierefreiheit-/Endgültigkeitskonflikt](https://arxiv.org/abs/2009.04987)
- [Einzelplatzfinalität (single slot finality)](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Proposer-Builder-Trennung](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Ausführung {#execution}

Die Ausführungsebene beschäftigt sich mit dem Ausführen von Transaktionen, dem Betrieb der [virtuellen Ethereum-Maschine (EVM)](/developers/docs/evm/) und dem Generieren von Ausführung-Payload zum Weiterleiten an die Ausführungsebene. Es gibt viele Bereiche der aktiven Forschung, dazu gehören:

- Unterstützung von leichten Clients etablieren;
- Gas-Limits untersuchen;
- und neue Datenstrukturen (z. B. Verkle-Bäume) etablieren.

#### Hintergrundinformationen {#background-reading-1}

- [Einführung in EVM](/developers/docs/evm)
- [Ethresear.ch – Ausführungsebene](https://ethresear.ch/c/execution-layer-research/37)

#### Aktuelle Forschung {#recent-research-1}

- [Datenbankoptimierungen](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Zustandsverfall](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Wege zum Zustandsverfall](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Vorschläge für Verkel- und Zustandsverfall](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Verlaufsmanagement](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle-Bäume](https://vitalik.ca/general/2021/06/18/verkle.html)
- [Datenverfügbarkeits-Sampling](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Client-Entwicklung {#client-development}

Ethereum-Clients sind Implementationen des Ethereum-Protokolls. Die Entwicklung von Clients ist die Realisierung der Ergebnisse der Protokollforschung, indem sie in diese Clients einfließen. Entwicklung von Klienten beinhaltet das Aktualisieren der Spezifikationen der Klienten und das Bauen von spezifischen Implementationen.

Ein Ethereum-Knoten wird gebraucht, um zwei verschiedene Arten von Software zu betreiben:

1. einen Konsens-Client, um den Kopf der Blockchain zu verfolgen, Blöcke zu kommunizieren und die Konsenslogik zu verarbeiten
2. einen Ausführungs-Client, um die virtuelle Ethereum-Maschine (EVM) zu unterstützen und Transaktionen sowie Smart Contracts auszuführen

Auf der Seite für [Knoten und Clients](/developers/docs/nodes-and-clients/) finden Sie weitere Informationen zu Knoten und Clients und eine Liste aller derzeitigen Client-lmplementierungen. Sie können auch den Verlauf aller Ethereum-Aktualisierungen auf der [Verlaufsseite](/history/) finden.

### Clients auf Ausführungsebene {#execution-clients}

- [Spezifikation zu Clients auf Ausführungsebene](https://github.com/ethereum/execution-specs)
- [Ausführungs-API-Spezifikationen](https://github.com/ethereum/execution-apis)

### Konsens-Clients {#consensus-clients}

- [Spezifikationen zu Konsens-Clients](https://github.com/ethereum/consensus-specs)
- [Beacon API-Spezifikationen](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skalierung und Leistung {#scaling-and-performance}

Das Skalieren von Ethereum ist ein äußerst wichtiger Forschungsbereich für Ethereum. Die aktuellen Ansätze beschäftigen sich damit, Transaktionen und Rollups auszulagen und diese so günstig wie möglich zu machen. Einführende Informationen zur Skalierung von Ethereum sind auf unserer [Skalierungsseite](/developers/docs/scaling) verfügbar.

### Layer 2 {#layer-2}

Es gibt jetzt mehrere Ebene-2-Protokolle, die Ethereum skalieren und verschiedene Techniken für die Stapelverarbeitung von Transaktionen nutzen und sie auf der Ebene 1 von Ethereum sichern. Bei diesem Thema gibt es eine rasante Entwicklung, mit viel Forschungs- und Entwicklungspotenzial.

#### Hintergrundinformationen {#background-reading-2}

- [Einführung in Ebene 2](/layer-2/)
- [Polynya: Rollups, DA und Modellketten](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Aktuelle Forschung {#recent-research-2}

- [Arbitrums faire-Ordnung von Sequenzern](https://eprint.iacr.org/2021/1465)
- [ethresear.ch – Ebene 2](https://ethresear.ch/c/layer-2/32)
- [Rollup-zentrierter Fahrplan (Roadmap)](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Bridges {#bridges}

Die sicheren und leistungsfähigen Brücken sind ein bestimmter Bereich der Ebene 2, für den mehr Forschung und Entwicklung erforderlich ist. Das beinhaltet Brücken zwischen einigen der Ebenen 2 und Brücken zwischen Ebene 1 und Ebene 2. Dieser Forschungsbereich ist besonders wichtig, da Angreifer sich häufig auf Brücken konzentrieren.

#### Hintergrundinformationen {#background-reading-3}

- [Einführung in Blockchain-Brücken](/bridges/)
- [Vitalik zu Brücken](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artikel zu Blockchain-Brücken](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Der Wert von Brücken](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Aktuelle Forschung {#recent-research-3}

- [Brücken validieren](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Das Sharding war auf der Ethereum-Blockchain lange Teil des Entwicklungs-Fahrplans. Jedoch gibt es neue Lösungsansätze, wie das "Danksharding", die zur Zeit im Mittelpunkt stehen.

#### Hintergrundinformationen {#background-reading-4}

- [Hinweise zu Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding – Video](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Sharding auf Ethereum – Forschungskompendium](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Aktuelle Forschung {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik zu Sharding und Datenverfügbarkeits-Sampling](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Das Betreiben von Knoten](/developers/docs/nodes-and-clients/run-a-node/) auf einfacher Hardware ist unabdingbar für die Dezentralisierung von Ethereum. Deshalb muss aktiv geforscht werden, um die Voraussetzungen an die Hardware für das Betreiben von Knoten abzubauen.

#### Hintergrundinformationen {#background-reading-5}

- [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Aktuelle Forschung {#recent-research-5}

- [ecdsa zu FGPAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sicherheit {#security}

Sicherheit ist ein großes Thema, das Spam-/Scam-Prävention, Sicherheit der Wallets, Hardwaresicherheit, krypto-ökonomische Sicherheit, Fehlersuche und das Testen der Client-Software und der Schlüsselverwaltung beinhaltet. Erkenntnisse in diesem Bereichen zu fördern, wird dabei helfen, dass die Bereitschaft zur Annahme in der Öffentlichkeit gefördert wird.

### Kryptografie und ZKP {#cryptography--zkp}

Zero-Knowledge-Proofs (ZKP) und Kryptographie sind entscheident, wenn es dabei geht Privatsphäre und Sicherheit auf Ethereum und für die Anwendungen zu etablieren. Zero-Knowledge (Null-Wissen) ist eine relativ junge aber sich schnell entwickelnde Umgebung mit vielen offenen Forschungs- und Entwicklungsmöglichkeiten. Dazu gehört die Entwicklung von effizienteren Implementationen des [Keccak-Hashing-Algorithmus](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), die Suche nach polynomialen Verpflichtungen, die besser sind als die aktuell bestehenden, und die Senkung der Kosten für die Erstellung öffentlicher ecdsa-Schlüssel und die Verifikation von Signaturen.

#### Hintergrundinformationen {#background-reading-6}

- [0xparc-Blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge-Podcast](https://zeroknowledge.fm/)

#### Aktuelle Forschung {#recent-research-6}

- [Aktuelle Neuerungen der elliptischen Kurvenkryptografie](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Wallets {#wallets}

Ethereum-Wallets können Browsererweiterungen, Desktop- und Handyapps oder Smart Contracts auf Ethereum sein. Es gibt auch aktive Forschung, die sich mit der sozialen Wiederherstellung von Wallets und dem Risiko in Zusammenhang mit der Schlüsselverwaltung von individuellen Nutzern befasst. Verbunden mit der Wallet-Entwicklung ist die Forschung für alternative Formen der Kontoabstraktion, was ein wichtiges zukünftiges Forschungsfeld ist.

#### Hintergrundinformationen {#background-reading-7}

- [Einführung in Wallets](/wallets/)
- [Einführung in die Wallet-Sicherheit](/security/)
- [ethresear.ch – Sicherheit](https://ethresear.ch/tag/security)
- [EIP-2938-Kontenabstraktion](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337-Kontenabstraktion](https://eips.ethereum.org/EIPS/eip-4337)

#### Aktuelle Forschung {#recent-research-7}

- [Validation, die sich mit Smart Contract-Wallets befasst](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Die Zukunft von Konten](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH- und AUTHCALL-Opcodes](https://eips.ethereum.org/EIPS/eip-3074)
- [Code an einer EOA-Adresse veröffentlichen](https://eips.ethereum.org/EIPS/eip-5003)

## Community, Bildung und Reichweite {#community-education-and-outreach}

Damit sich neue Nutzer mit Ethereum vertraut machen können, braucht es informative Ressourcen und Ansätze, um Reichweite zu schaffen. Das gehören Blog-Veröffentlichungen und Artikel, Bücher, Podcasts, Memes, lehrreiche Ressourcen und sonstige Ressourcen, die das Entstehen von Communitys fördern, für Einsteiger hilfreich sind und die Öffentlichkeit über Ethereum informiert.

### UX/UI {#uxui}

Um mehr Menschen für Ethereum zu begeistern, muss das Ökosystem die UX/UI verbessern. Dafür braucht es Designer und Produktexperten, die das Design von Wallets und anderen Anwendungen überarbeiten.

#### Hintergrundinformationen {#background-reading-8}

- [Ethresear.ch – UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Aktuelle Forschung {#recent-research-8}

- [Web3 – Design-Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 – Designgrundsätze](https://www.web3designprinciples.com/)
- [Ethereum Magicians – UX-Diskussionen](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Wirtschaft {#economics}

Die wirtschaftliche Forschung rund um Ethereum verfolgt im Großen und Ganzen zwei Ansätze: das Validieren der Sicherheitsmechanismen, die abhängig von wirtschaftlichen Anreizen ("microeconomics") sind, und das Analysieren des Werteflusses zwischen Protokollen, Anwendungen und Nutzern ("macroeconomics"). Es gibt komplexe krypto-ökonomische Faktoren, die mit dem nativen Vermögenswert von Ethereum (Ether) und den darauf aufbauenden Token (z. B. NFTs und ERC20-Token) zusammenhängen.

#### Hintergrundinformationen {#background-reading-9}

- [Durchdachte Anreizgruppe](https://ethereum.github.io/rig/)
- [ETHconomics-Workshop auf Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Aktuelle Forschung {#recent-research-9}

- [Empirische Analyse von EIP1559](https://arxiv.org/abs/2201.05574)
- [Balance in der zirkulierenden Versorgung](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifizierung von MEV: Wie dunkel ist der Wald?](https://arxiv.org/abs/2101.05511)

### Blockräume und Gebührenmärkte {#blockspace-fee-markets}

Blockraum-Märkte regeln die Aufnahme von Endnutzertransaktionen, entweder direkt auf Ethereum (Ebene 1) oder auf überbrückten Netzwerken, wie zu Beispiel Rollups (Ebene 2). Auf Ethereum werden Transaktionen zum Gebührenmarkt im Protokoll als EIP-1599 übermittelt. Das schützt die Blockchain vor Spam und Preisstau. Auf beiden Ebenen könnten Transaktionen externe Veränderungen bedingen, bekannt als maximal extrahierbarer Wert (MEV), die das Potenzial haben, neue Marktstrukturen auszulösen, um solche externen Faktoren zu erfassen oder damit umzugehen.

#### Hintergrundinformationen {#background-reading-10}

- [Design des Transaktionsgebührenmechanismus für die Ethereum-Blockchain: eine Wirtschaftsanalyse von EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulationen von EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Wirtschaftliche Überlegungen aus den wichtigsten Prinzipien übertragen](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Transaktionsneuanordnung und Konsens-Instabilität in dezentralisierten Austauschen](https://arxiv.org/abs/1904.05234)

#### Aktuelle Forschung {#recent-research-10}

- [Multidimensionale EIP-1559-Videopräsentation](https://youtu.be/QbR4MTgnCko)
- [Domänenübergreigender MEV](http://arxiv.org/abs/2112.01472)
- [MEV-Auktionen](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Anreize für Proof-of-Stake {#proof-of-stake-incentives}

Validatoren nutzen Ethereums native Währung (Ether) als Sicherheit gegen unehrliches Verhalten. Die Kryptoökonomien dieses Systems entscheiden über die Sicherheit des Netzwerks. Ausgefeilte Validatoren könnten die Gestaltung der Anreizebene (Incentive Layer) nutzen, um explizite Angriffe zu starten.

#### Hintergrundinformationen {#background-reading-11}

- [Masterclass der Wirtschaft Ethereums und das wirtschaftliche Modell](https://github.com/CADLabs/ethereum-economic-model)
- [Simulationen von PoS-Anreizen (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Aktuelle Forschung {#recent-research-11}

- [Verstärken der Zensurresistenz von Transaktionen mit Proposer/Builder-Unterscheidung (PBS).](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Drei Angriffe auf PoS von Ethereum](https://arxiv.org/abs/2110.10086)

### Liquid Staking und seine Ableitungen {#liquid-staking-and-derivatives}

Liquid Staking erlaubt Nutzern mit weniger als 32 ETH Stakingerträge zu erhalten, indem sie Ether mit einem Token austauschen, der gestakte Ether darstellt und in DeFi verwendet werden kann. Jedoch müssen die Anreize und Marktdynamiken, die mit Liquid Staking verbunden werden, erst noch gefunden werden. Es müssen zudem noch die Effekte, diewelche Liquid Staking auf Ethereums Sicherheit (z. B. das Risiko der Zentralisation) hat, gefunden werden.

#### Hintergrundinformationen {#background-reading-12}

- [Ethresear.ch – Liquid Staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: der Weg zum vertrauenslosen Stakinig auf Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Einführung in das Staking-Protokoll](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Aktuelle Forschung {#recent-research-12}

- [Abhebungen von Lido abwickeln](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Zugangsdaten zum Abheben](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Die Risiken verbunden mit Ableitungen vom Liquid Staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testing {#testing}

### Formale Verifizierung {#formal-verification}

Bei der formalen Verifizierung wird Code geschrieben, um zu überprüfen, ob die Konsensspezifikationen von Ethereum korrekt und fehlerfrei sind. Es gibt eine ausführbare Version der Spezifikation, die in Python geschrieben ist und sowohl Wartung als auch Entwicklung benötigt. Weitere Forschung kann helfen, die Python-Implementierung der Spezifikationen zu verbessern und neue Tools für die sichere Verifizierung von Korrektheit und Identitätsproblemen zu finden.

#### Hintergrundinformationen {#background-reading-13}

- [Einführung in die formale Verifizierung](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formale Verifizierung (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Aktuelle Forschung {#recent-research-13}

- [Formale Verifizierung des Einzahlungsvertrags](https://github.com/runtimeverification/deposit-contract-verification)
- [Formale Verifizierung der Beacon Chain-Spezifikation](https://github.com/runtimeverification/deposit-contract-verification)

## Datenwissenschaften und Analysen {#data-science-and-analytics}

Es werden mehr Tools für die Datenanalyse benötigt. Außerdem braucht es mehr detaillierte Informationen zu Aktivität und Zustand des Ethereum-Netzwerks.

### Hintergrundinformationen {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dashboard für Client-Vielfalt](https://clientdiversity.org/)

#### Aktuelle Forschung {#recent-research-14}

- [Robust Incentives Group – Datenanalyse](https://ethereum.github.io/rig/)

## Anwendungen und Tools {#apps-and-tooling}

Die Anwendungsebene unterstützt ein diverses Ökosystem von Programmen, die Transaktionen auf der Grundebene von Ethereum regeln. Entwicklungsteams finden durchgehend neue Wege, Ethereum zu nutzen, um zusammensetzbare, berechtigungsfreie und zensurresistente Versionen von wichtigen Web2-Anwendungen oder komplett neue Web3-native Konzepte zu erstellen. Zu selben Zeit werden neue Tools entwickelt, die den Bau von dApps auf Ethereum weniger komplex machen.

### DeFi {#defi}

Dezentralisierte Finanzen (DeFi) ist eine der Hauptanwendungen, die auf Ethereum aufbauen. DeFi versucht zusammensetzbare "Geld-Legosteine" zu erstellen, mit denen Nutzer Krypto-Vermögenswerte mit der Hilfe von Smart Contracts übertragen, ausleihen oder investieren können. DeFi ist eine Bereich, der sich rasant entwickelt. Forschung in sichere, effiziente und zugängliche Protokolle wird durchgehend gebraucht.

#### Hintergrundinformationen {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Was ist DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Aktuelle Forschung {#recent-research-15}

- [Dezentralisierte Finanzen, zentralisierte Besitztümer?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimismus: der Weg zu Transaktionen eines Unterdollars (Sub-Dollar)](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

Ein bedeutender Anwendungsbereich von Ethereum ist die Fähigkeit, sich in einer dezentralisierten Art, durch die Nutzung von DAOs, zu organisieren. Es wird intensiv daran geforscht, wie DAOs auf Ethereum entwickelt und genutzt werden können, um die Möglichkeiten als Koordinationsinstrument zu nutzen, das mit minimalem Vertrauen arbeiten kann. So lassen sich die Möglichkeiten der Menschen über die traditionellen Unternehmen und Organisationen hinaus erheblich erweitern.

#### Hintergrundinformationen {#background-reading-16}

- [Einführung in DAOs](/dao/)
- [Dao-Kollektiv](https://daocollective.xyz/)

#### Aktuelle Forschung {#recent-research-16}

- [Kartierung des Ökosystems von Dezentralisierten autonomen Organisationen (DAOs)](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Entwicklertools {#developer-tools}

Die Tools für Ethereum-Entwickler verbessern sich rasant. In diesem Bereich gibt es eine aktive Forschung und Entwicklung.

#### Hintergrundinformationen {#background-reading-17}

- [Tools nach Programmiersprache](/developers/docs/programming-languages/)
- [Entwickler-Frameworks](/developers/docs/frameworks/)
- [Tools-Liste für Entwickler der Konsensebene](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Tokenstandards](/developers/docs/standards/tokens/)
- [Biastek: Tools für Ethereum](https://biastek.com/ethereum-tools/)
- [CryptoDevHub: EVM-Tools](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Aktuelle Forschung {#recent-research-17}

- [Eth- und Discord-Kanal zur Tool-Bereitstellung für die Konsensebene](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracles {#oracles}

Orakel importieren Off-Chain-Daten in die Blockchain in einer genehmigungsfreien und dezentralen Art und Weise. Diese Daten auf die Chain zu bekommen, schafft für dApps die Grundlage, auf Phänomene aus der echten Welt umzugehen. Dazu gehören Preisveränderungen von Besitztümern der echten Welt, Ereignisse auf Off-Chain-Apps oder sogar Wetterveränderungen.

#### Hintergrundinformationen {#background-reading-18}

- [Einführung in Orakel](/developers/docs/oracles/)

#### Aktuelle Forschung {#recent-research-18}

- [Umfrage zu Blockchain-Orakeln](https://arxiv.org/pdf/2004.07140.pdf)
- [Whitepaper eines Chain-Links](https://chain.link/whitepaper)

### App-Sicherheit {#app-security}

Bei Angriffen auf Ethereum werden meist Schwachstellen von individuellen Anwendungen und nicht Schwachstellen des Protokolls selbst genutzt. Angreifer und Anwendungsentwickler sind dabei in einem Aufrüstungsduell um neue Angriffs- und Verteidigungsmöglichkeiten gefangen. Das bedeutet, dass es immer wichtige Forschung und Entwicklung benötigt, um Anwendungen vor Angriffen zu schützen.

#### Hintergrundinformationen {#background-reading-19}

- [Ausnutzungsbericht eines Wurmlochs (Wormhole)](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Liste von Angriffen auf Ethereum-Verträge – Post Mortem](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Aktuelle Forschung {#recent-research-19}

- [ethresear.ch – Anwendungen](https://ethresear.ch/c/applications/18)

### Technologie-Stack {#technology-stack}

Den gesamten Technologie-Stack von Ethereum zu dezentralisieren, ist ein wichtiger Forschungsbereich. Derzeit weisen dApps auf Ethereum für gewöhnlich eine Form der Zentralisierung auf, da sie sich auf zentralisierte Werkzeuge oder Infrastruktur verlassen müssen.

#### Hintergrundinformationen {#background-reading-20}

- [Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Coinbase: Einführung zum Web3-Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Einführung in Smart Contracts](/developers/docs/smart-contracts/)
- [Einführung in dezentralisierte Speicher](/developers/docs/storage/)

#### Aktuelle Forschung {#recent-research-20}

- [Smart-Contract-Kombinierbarkeit](/developers/docs/smart-contracts/composability/)
