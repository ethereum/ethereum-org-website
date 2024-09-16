---
title: Enterprise auf Ethereum Mainnet
description: Anleitungen, Artikel und Tools zu Unternehmensanwendungen in der öffentlichen Ethereum-Blockchain
lang: de
---

# Ethereum Mainnet für Unternehmen {#ethereum-for-enterprise}

Blockchain-Anwendungen helfen Unternehmen:

- Sie erhöhen das Vertrauen und reduzieren die Kosten für die Koordinierung zwischen Geschäftspartnern.
- Sie verbessern die Rechenschaftspflicht im Geschäftsnetzwerk und die operative Effizienz.
- Sie erschaffen neue Geschäftsmodelle und Wertschöpfungsmöglichkeiten.
- Sie bieten für ihre Organisation einen wettbewerbsorientierten Zukunftsschutz.

Enterprise-Blockchain-Anwendungen können auf dem öffentlichen Ethereum-[Mainnet](/glossary/#mainnet) oder auf privaten Blockchains, die auf der Ethereum-Technologie basieren, aufgebaut werden. Weitere Informationen zu [privaten Enterprise-Ethereum-Ketten](/enterprise/private-ethereum/)

## Öffentliches gegenüber privatem Ethereum {#private-vs-public}

Es gibt nur ein öffentliches Ethereum-Mainnet. Anwendungen, die auf dem Mainnet basieren, können interoperieren, ähnlich wie Anwendungen, die auf dem Internet basieren, sich miteinander verbinden können, wodurch das volle Potenzial der dezentralisierten Blockchain genutzt wird.

Viele Unternehmen und Konsortien haben private, zugelassene Blockchains für spezielle Anwendungen auf Basis der Ethereum-Technologie gestartet.

### Wesentliche Unterschiede {#key-differences}

- Blockchain Security/Immutability – Der Widerstand einer Blockchain gegen Manipulation wird durch ihren Konsensalgorithmus bestimmt. Das Ethereum-Mainnet ist durch die Interaktion tausender unabhängiger Nodes gesichert, die von Einzelpersonen und Minern/Validatoren auf der ganzen Welt betrieben werden. Private Blockchains haben in der Regel eine kleine Anzahl von Nodes, die von einer oder wenigen Organisationen kontrolliert werden. Diese Nodes können streng kontrolliert werden, aber nur wenige müssen kompromittiert werden, um die Blockchain umzuschreiben oder betrügerische Transaktionen zuzulassen.
- Leistung – Da private Enterprise Ethereum-Blockchains Hochleistungsnodes mit speziellen Hardwareanforderungen und unterschiedlichen Konsensalgorithmen wie Proof-of-Authority verwenden können, können sie einen höheren Transaktionsdurchsatz auf der Basisebene erreichen (Layer 1). Durch die Nutzung von [Layer-2-Skalierungslösungen](/developers/docs/scaling/#layer-2-scaling) kann auf dem Ethereum-Mainnet ein hoher Durchsatz erzielt werden.
- Kosten - Die Kosten für den Betrieb einer privaten Blockchain spiegeln sich primär in der Arbeit zum Aufbau und Management der Blockchain und der Server wider, um das System auszuführen. Während die Verbindung zum Ethereum-Mainnet kostenlos ist, fallen hingegen für jede Transaktion Gaskosten an, die in Ether gezahlt werden müssen. Transaktionsrelais (auch bekannt als Gas-Stationen) werden entwickelt, um die Notwendigkeit für Endverbraucher und sogar Unternehmen zu beseitigen, Ether direkt in ihren Transaktionen zu verwenden. Einige [Analysen](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) haben gezeigt, dass die Gesamtkosten für den Betrieb einer Anwendung auf dem Mainnet niedriger sein können als die Ausführung einer privaten Blockchain.
- Node-Berechtigung – Nur autorisierte Nodes können privaten Blockchains beitreten. Jeder kann einen Node auf dem Ethereum-Mainnet einrichten.
- Privatsphäre – Der Zugriff auf in private Blockchains geschriebene Daten kann durch Einschränkung des Netzwerkzugangs gesteuert werden, und auf einer feinkörnigeren Basis mit Zugangskontrollen und privaten Transaktionen. Alle in Mainnet Layer 1 geschriebenen Daten sind für jeden sichtbar. Daher sollten vertrauliche Informationen außerhalb der Blockchain gespeichert und übertragen oder verschlüsselt werden. Designmuster, die dies erleichtern, entstehen gerade (z. B. Baseline, Aztec), genauso wie Layer-2-Lösungen, mit denen Daten getrennt und aus Layer 1 ausgelagert werden können.

### Warum auf dem Ethereum-Mainnet aufbauen? {#why-build-on-ethereum-mainnet}

Unternehmen experimentieren mit Blockchain-Technologie seit etwa 2016, als die Projekte Hyperledger, Quorum und Corda gestartet wurden. Der Schwerpunkt lag hauptsächlich auf privat genehmigten Unternehmensblockchains, aber ab 2019 hat es eine Verschiebung im Denken über öffentliche gegenüber privaten Blockchains für geschäftliche Anwendungen gegeben. Eine von Forrester durchgeführte [Umfrage](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-Öffentliche-Blockchain-Möglichkeit-Snapshot.pdf) hat aufgezeigt, dass “75 % der in der Umfrage Befragten sagen, dass sie in Zukunft wahrscheinlich öffentliche Blockchains nutzen würden, während fast ein Drittel sagen, dass sie diese sehr wahrscheinlich nutzen würden“. Paul Brody von EY hat [über die Vorteile gesprochen](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668), die der Aufbau auf öffentlichen Blockchains hat, welche (abhängig von der Anwendung) eine stärkere Sicherheit enthalten kann, Transparenz, niedrigere Gesamtkosten des Eigentums und die Fähigkeit, mit allen anderen Anwendungen, die auch auf dem Mainnet laufen, zu interagieren (Netzwerkeffekte). Die Nutzung eines gemeinsamen Referenzrahmens zwischen Unternehmen vermeidet die unnötige Schaffung zahlreicher isolierter Silos, die nicht untereinander kommunizieren, teilen oder Informationen synchronisieren können.

Eine weitere Entwicklung, die den Fokus auf öffentliche Blockchains verschiebt, ist [Layer 2](/developers/docs/scaling/#layer-2-scaling). Layer 2 ist in erster Linie eine Kategorie der Skalierbarkeit, die hohe Durchsatzraten auf öffentlichen Blockchains ermöglicht. Aber die Layer-2-Lösungen können auch [einige der anderen Herausforderungen bewältigen, die die Entwickler in der Vergangenheit veranlasst haben, private Blockchains auszuwählen.](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Das Baseline-Protokoll ist ein Schlüsselprojekt, das ein Protokoll definiert, das eine vertrauliche und komplexe Zusammenarbeit zwischen Unternehmen ermöglicht, ohne sensible Daten auf der Blockchain zu belassen. Es hat über das Jahr 2000 ein bedeutendes [Momentum](https://www.oasis-open.org/2020/08/26/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise/) erreicht.

## Entwicklerressourcen für Unternehmen {#enterprise-developer-resources}

### Organisationen {#organizations}

Verschiedene Organisationen unternahmen gemeinsame Anstrengungen, um Ethereum unternehmensfreundlich zu gestalten:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) Die EEA ermöglicht Organisationen die Übernahme und Nutzung der Ethereum-Technologie in ihren täglichen Geschäftsbetrieb. Sie ermöglicht dem Ethereum-Ökosystem, neue Geschäftsmöglichkeiten zu entwickeln, die Einführung von Blockchain in der Industrie voranzutreiben, miteinander zu lernen und zusammenzuarbeiten. Die Arbeitsgruppe EEA's Mainnet ist eine Anlaufstelle für Vertreter von Unternehmen, die daran interessiert sind, auf dem öffentlichen Ethereum-Mainnet aufzubauen, sowie für Mitglieder der Ethereum-Community, die sie unterstützen möchten.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) Das Ethereum OASIS Open Project ist ein OASIS Open Project, welches ein neutrales Forum für verschiedene Stakeholder bereitstellt, um hochwertige Spezifikationen zu erstellen, die Ethereums Langlebigkeit, Interoperabilität und einfache Integration sicherstellen sollen. Das Projekt beabsichtigt, klare, offene Standards, hochwertige Dokumentation und gemeinsame Testsuiten zu entwickeln, die neue Funktionen und Verbesserungen des Ethereum-Protokolls ermöglichen.
- [Baseline-Projekt](https://www.baseline-protocol.org/) Das Baseline Protocol ist eine Open-Source-Initiative, die Fortschritte in Kryptographie, Messaging und Blockchain kombiniert, um sichere und private Geschäftsprozesse zu geringen Kosten über das öffentliche Ethereum-Mainnet bereitzustellen. Das Protokoll ermöglicht eine vertrauliche und komplexe Zusammenarbeit zwischen Unternehmen, ohne sensible Daten auf der Blockchain zu belassen. Das Baseline-Projekt ist ein Unterprojekt des Ethereum OASIS Open Project und wird vom Baseline Technical Steering Committee koordiniert.

### Produkte und Dienste {#products-and-services}

- [Alchemy](https://www.alchemy.com/)_ bietet API-Dienste und Tools für die Entwicklung und das Monitoring von Anwendungen auf Ethereum_
- [Blockapps](https://blockapps.net/) _Implementierung des Enterprise-Ethereum-Protokolls, von Tools und APIs, die die STRATO-Plattform bilden_
- [Chainstack](https://chainstack.com/)_ öffentlich gehostete Mainnet- und Testnetz-Ethereum-Infrastruktur und isolierte Kunden-Clouds_
- [ConsenSys](https://consensys.io/) _ bietet eine Reihe von Produkten und Tools für das Aufbauen auf Ethereum sowie Beratungs- und Custom-Development-Dienste_
- [Envision Blockchain](https://envisionblockchain.com/)_ bietet unternehmensorientierte Beratungs- und Entwicklungsdienstleistungen, die auf das Ethereum-Mainnet spezialisiert sind_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _ bietet einen Beschaffungsworkflow durch die Ausgabe von RFQs, Verträgen, Bestellungen und Rechnungen im Netzwerk von vertrauenswürdigen Geschäftspartnern_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _ ein unternehmensorientierter Open-Source-Ethereum-Client, entwickelt unter der Apache-2.0-Lizenz und in Java geschrieben_
- [Infura](https://infura.io/) _ skalierbarer API-Zugriff auf die Ethereum- und IPFS-Netzwerke_
- [Provide](https://provide.services/) _Infrastruktur und APIs für Enterprise-Web3-Anwendungen_
- [QuickNode](https://www.quicknode.com/) _bietet zuverlässige und schnelle Nodes mit High-Level-APIs wie NFT API, Token API etc., während hierdurch zugleich eine einheitliche Produktsuite und unternehmensweite Lösungen geliefert werden_
- [Unibright](https://unibright.io/) _, ein Team von Blockchain-Spezialisten, Architekten, Entwicklern und Beratern mit über 20 Jahren Erfahrung in Geschäftsprozessen und Integration_

### Tools und Bibliotheken {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _Ethereum-Data-Analytics-Plattform_
- [Chainlens](https://www.chainlens.com/) _eine Plattform zur Entwicklung, Bereitstellung und Überwachung von Blockchain-Anwendungen durch Web3 Labs_
- [Ernst & Youngs 'Nightfall'](https://github.com/EYBlockchain/nightfall) _ein Toolkit für private Transaktionen_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _eine Transaktionssignierungsanwendung zur Verwendung mit einem Web3-Anbieter_
- [Tenderly](https://tenderly.co/) _, eine Datenplattform, die Echtzeit-Analysen, Alarmierung und Überwachung mit Unterstützung für private Netzwerke bereitstellt_

### Skalierungslösungen {#scalability-solutions}

[Layer 2](/developers/docs/scaling/#layer-2-scaling) ist ein Satz von Technologien oder Systemen, die aufgesetzt auf Ethereum (Layer 1) laufen, jedoch Sicherheitseigenschaften von Layer 1 übernehmen und größere Transaktionsverarbeitungskapazitäten (Durchsatz), niedrigere Transaktionsgebühren (Betriebskosten) und schnellere Transaktionsbestätigungen als Layer 1 bieten. Layer-2-Skalierungslösungen werden durch Layer 1 gesichert, aber sie ermöglichen es Blockchain-Anwendungen, viel mehr Benutzer, Aktionen oder Daten als Layer 1 zu verwalten. Viele von ihnen nutzen die jüngsten Fortschritte in der Kryptographie und den Zero-Knowledge(ZK)-Beweisen, um Leistung und Sicherheit zu maximieren.

Die Erstellung einer Anwendung auf einer Layer-2-Skalierbarkeitslösung [kann helfen, viele der Bedenken, die Unternehmen früher dazu gebracht haben, auf privaten Blockchains aufzubauen, zu beseitigen](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), behält jedoch die Vorteile des Aufbaus auf dem Mainnet.

Beispiele für L2-Lösungen, die produktionsbereit sind oder es bald sein werden:

- Optimistic Rollups (Daten on-chain, Betrugsnachweise)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- ZK-Rollups (Daten on-chain, ZK-Gültigkeitsnachweise)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs ZKsync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (Daten off-chain, ZK-Gültigkeitsnachweise)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma (Daten off-chain, Betrugsnachweise)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- State Channels
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- Sidechains
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Hybridlösungen, die Eigenschaften mehrerer Kategorien kombinieren
  - [Celer](https://celer.network)

## Enterprise-Anwendungen live auf dem Mainnet {#enterprise-live-on-mainnet}

Nachfolgend werden einige der Anwendungen für Unternehmen aufgelistet, die bislang auf dem öffentlichen Ethereum-Mainnet eingesetzt werden

### Zahlungen {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _bezahlt seine Benutzer durch die Verteilung von sogenannten Einfachen Aufmerksamkeits-Token (Basic Attention Token, BAT) dafür, dass sie Werbung ansehen. Auch Benutzer können Herausgeber von Internetseiten selbst durch BAT unterstützen_
- [hCaptcha](https://www.hcaptcha.com/) _ CAPTCHA-System zur Bot-Prävention, das Websitebetreiber für die Arbeit der Benutzer bezahlt, um Daten für das maschinelle Lernen zu kennzeichnen. Nun eingesetzt durch Cloudflare_
- [Audius](https://audius.co/) _ein Streaming-Dienst, der Musikfans direkt mit Künstlern verbindet und die vollständige Bezahlung der Künstler durch ihre Fans ermöglicht, direkt und sofort für jeden Stream_
- [EthereumAds](https://ethereumads.com/)_ erlaubt es Websitebetreibern, Werbeflächen zu verkaufen und per Ethereum bezahlt zu werden_

### Finanzen {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _Ausgabe und Abwicklung von Anleihen_
- [Generale Societe](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _Ausgabe von Anleihen_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _Anleiheangebot und Tokenisierung für FAT-Marken_
- [Sila](https://silamoney.com/) _Bank- und ACH-Zahlungsinfrastruktur-as-a-Service_
- [Tinlake](https://tinlake.centrifuge.io/) _Forderungsfinanzierung durch tokenisierte Vermögenswerte wie Rechnungen, Hypotheken oder Streaming von Lizenzgebühren_
- [Kratos](https://triterras.com/kratos) _Rohstoffhandel und Handelsfinanzierungsplattform, die Rohstoffhändler verbindet und es ihnen ermöglicht, Kapital direkt online zu handeln und zu beschaffen_
- [Fasset](https://www.fasset.com/) _eine Plattform zur Unterstützung nachhaltiger Infrastruktur_
- [Taurus](https://www.taurushq.com/)_ gibt tokenisierte Wertpapiere aus_

### Notarisierung von Daten {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _Details von finalisierten Darlehen werden gehasht und im Hauptnetz aufgezeichnet_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Italiens größte Nachrichtenagentur kämpft gegen gefälschte Nachrichten und ermöglicht es Lesern, den Ursprung der Nachrichten zu überprüfen, indem sie im Mainnet aufgezeichnet werden_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _protokolliert Pressemitteilungen auf Ethereum, um die Rechenschaftspflicht und das Vertrauen von Unternehmen zu gewährleisten_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _erfasst den Herkunfts- und Reparaturverlauf von Uhren auf Ethereum_
- [EthSign](https://ethsign.xyz/)_ erfasst signierte elektronische Dokumente in der Ethereum-Blockchain_

### Lieferkette {#supply-chain}

- [Morpheus.network](https://morpheus.network/) _Lieferketten-Automatisierungsplattform, die einen Hybrid aus privaten Blockchains mit notarisierten Daten im Ethereum-Mainnet implementiert und von Unternehmen wie Canadian Food, Oil & Gas Distributor Federated Co-op Ltd. und vom argentinischen Haustierspeiseanbieter Vitalcan verwendet wird._
- [Minespider](https://www.minespider.com/) _Lieferketten-Tracking_
- [Folge unseren Fasern](https://www.followourfibre.com) _Viskose-Lieferkettenverfolgbarkeit_
- [EY OpsChain Netzwerkbeschaffung](https://blockchain.ey.com/products/contract-manager) _bietet einen Beschaffungsworkflow durch die Ausgabe von RFQs, Verträgen, Bestellungen und Rechnungen in Ihrem Netzwerk vertrauenswürdiger Geschäftspartner_
- [Treum](https://treum.io/) _bringt Transparenz, Rückverfolgbarkeit und Handelbarkeit in Lieferketten mithilfe der Blockchain-Technologie_
- [TradeTrust](https://www.tradetrust.io/) _überprüft elektronische Frachtbriefe (eBLs) für den internationalen Versand_

### Referenzen und Zertifizierungen {#credentials}

- [Utah Counties](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _Ausstellung digitaler Ehezertifikate auf Ethereum_
- [Zwei italienische Hochschulen](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _digitale Diplome auf dem Ethereum-Mainnet ausgegeben_
- [Universität St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _Pilotprojekt zur Verifizierung von Abschlüssen einer Schweizer Universität_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _Alle Bildungszertifikate wurden von [Hyland](https://www.learningmachine.com/)_ im Mainnet erfasst
- [Die Pohang-Universität für Wissenschaft und Technologie](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _Die südkoreanische Universität vergibt an ihre neuen Absolventen auf Blockchain-gespeicherte Diplome_
- [OpenCerts](https://opencerts.io/) _gibt Blockchain-Bildungsinformationen in Singapur aus_
- [BlockCerts](https://www.blockcerts.org/) _hat einen offenen Standard für Blockchain-Zugangsdaten entwickelt_
- [SkillTree](http://skilltree.org/) _Online-Qualifikationstraining und Zertifizierungen, die mit Ablaufauslösern oder Abhängigkeiten von anderen Fähigkeiten konfiguriert werden können_

### Hilfsmittel {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _Stromzahlungen_

Wenn du etwas zu dieser Liste beitragen möchtest, sieh dir bitte die [Anweisungen für das Beitragen](/contributing/) an.
