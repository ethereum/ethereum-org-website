---
title: Dezentrale Speicher
description: "Übersicht über dezentrale Speicher und verfügbare Tools für die Integration der Speicher in eine dApp"
lang: de
---

Im Gegensatz zu einem zentralisierten Server, der von einem einzelnen Unternehmen oder einer Organisation betrieben wird, bestehen dezantrale Speichersysteme aus einem Peer-to-Peer-Netzwerk, aufgebaut aus Nutzern, die einen Teil der gesamten Daten aufbewahren. Das macht das Speichersystem sehr robust. Diese können in Blockchain-basierten Anwendungen oder jedem anderen Peer-to-Peer Netzwerk sein.

Ethereum selbst kann als dezentrales Speichersystem genutzt werden und das wird es zum Speichern von Code als Smart Contracts auch. Doch Ethereum wurde nicht für größere Datenmengen konzipiert. Die Chain wächst ständig, aber zum Zeitpunkt der Erstellung dieses Artikels ist die Ethereum-Chain ca. 500 GB – 1 TB groß ([je nach Client](https://etherscan.io/chartsync/chaindefault)), und jeder Node im Netzwerk muss in der Lage sein, alle Daten zu speichern. Würde die Chain immer weiter expandieren (sagen wir mal 5 TB), dann wäre es nicht mehr möglich, dass alle Nodes weiter laufen. Außerdem wären die Kosten für die Bereitstellung dieser Datenmenge im Mainnet aufgrund von [Gas](/developers/docs/gas)-Gebühren unerschwinglich hoch.

Aufgrund dieser Einschränkungen ist eine andere Chain oder Methode erforderlich, um große Datenmengen dezentral abzuspeichern.

Bei dezentralen Speichersystemen (dStorage) gibt es ein paar Aspekte, die Sie beachten sollten.

- Persistenzmechanismus/Anreizstruktur
- Durchsetzung der Datenspeicherung
- Dezentralität
- Konsens

## Persistenzmechanismus / Anreizstruktur {#persistence-mechanism}

### Blockchain-basiert {#blockchain-based}

Damit Daten für immer persistent sind, müssen wir uns einen Persistenzmechanismus zunutze machen. Auf Ethereum besteht der Mechanismus zur Persistenz darin, dass die gesamte Chain beim Betrieb eines Nodes berücksichtigt beziehungsweise heruntergeladen werden muss. Neue Daten werden am Ende der Kette angehängt und die Kette wächst weiter – jeder Node muss alle eingebetteten Daten replizieren.

Dies wird als **blockchain-basierte** Persistenz bezeichnet.

Das Problem bei der Blockchain-basierten Persistenz ist, dass die Chain viel zu groß werden könnte, um alle Daten praktikabel zu verwalten und zu speichern (z. B. schätzen [viele Quellen](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/), dass das Internet über 40 Zettabyte Speicherkapazität benötigt).

Die Blockchain benötigt außerdem auch eine Art Anreizstruktur. Bei der Blockchain-basierten Persistenz wird eine Zahlung an den Validator durchgeführt. Wenn Daten zur Blockchain hinzugefügt werden, werden die Validatoren für das Hinzufügen der Daten bezahlt.

Plattformen mit Blockchain-basierter Persistenz:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Vertragsbasiert {#contract-based}

Die **vertragsbasierte** Persistenz geht davon aus, dass Daten nicht von jedem Node repliziert und für immer gespeichert werden können, sondern stattdessen durch vertragliche Vereinbarungen aufrechterhalten werden müssen. Das sind Vereinbarungen zwischen mehreren Nodes, die einander versprechen, bestimmte Daten für einen festgelegten Zeitraum verfügbar zu halten. Wenn die Vereinbarungen auslaufen, müssen sie beendet oder erneuert werden, um die Datenpersistenz zu garantieren.

In den meisten Fällen wird statt aller Daten auf der Blockchain nur der Hash gespeichert, der angibt, wo die Daten auf einer Kette zu finden sind. So muss nicht die gesamte Chain skalieren, um alle Daten zu speichern.

Plattformen mit vertragsbsierter Persistenz:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Zusätzliche Überlegungen {#additional-consideration}

IPFS ist ein verteiltes System für die Speicherung und den Zugriff auf Dateien, Websites, Anwendungen und Daten. Es hat kein eingebautes Anreizsystem, sondern kann stattdessen mit einer der oben genannten vertragsbasierten Anreizlösungen für eine längerfristige Persistenz verwendet werden. Eine andere Möglichkeit, Daten auf IPFS zu halten, ist die Zusammenarbeit mit einem Pinning-Dienst, der Ihre Daten für Sie "anpinnt". Sie können sogar Ihren eigenen IPFS-Node betreiben und zum Netzwerk beitragen, um Ihre und/oder die Daten anderer kostenlos aufzubewahren.

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS-Pinning-Dienst)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin-Pinning-Dienst)_
- [Infura](https://infura.io/product/ipfs) _(IPFS-Pinning-Dienst)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS-Pinning-Explorer)_
- [4EVERLAND](https://www.4everland.org/) _(IPFS-Pinning-Dienst)_
- [Filebase](https://filebase.com) _(IPFS-Pinning-Dienst)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin-Pinning-Dienst)_

SWARM ist eine dezentrale Datenspeicherungs- und Datenverteilungstechnologie mit einem Speicher-Incentive-System und einem Speicher-Mietpreis-Orakel.

## Datenaufbewahrung {#data-retention}

Systeme müssen für die Datenverfügbarkeit über einen Mechanismus verfügen, der genau dies sicherstellt.

### Challenge-Mechanismus {#challenge-mechanism}

Einer der beliebtesten Wege zur Gewährleistung der Datenverfügbarkeit ist es, irgendeine Art von kryptographischer Herausforderung an die Knoten zu senden, die sie nur lösen können, wenn die Daten noch vorhanden sind. Ein einfaches Beispiel ist der Proof-of-Access von Arweave. Sie senden eine Herausforderung an Knoten, um zu sehen, ob sie über diese die Daten im aktuellsten Block sowie einem zufälligen Block in der Vergangenheit verfügen. Hat ein Knoten nicht die richtige Antwort, wird er bestraft.

Anbieter von dStorage mit einem Herausforderungsmechanismus:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust-Netzwerk
- 4EVERLAND

### Dezentralität {#decentrality}

Es gibt keine hervorragenden Tools, um den Grad der Dezentralität von Plattformen festzustellen. Doch im Allgemeinen sollte man die Tools verwenden, die keine Form von KYC für die Benutzung benötigen.

Dezentrale Tools ohne KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust-Netzwerk
- 4EVERLAND

### Konsens {#consensus}

Die meisten dieser Tools haben ihre eigene Version eines [Konsensmechanismus](/developers/docs/consensus-mechanisms/), aber im Allgemeinen basieren sie entweder auf [**Proof-of-Work (PoW)**](/developers/docs/consensus-mechanisms/pow/) oder [**Proof-of-Stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basierend auf Proof-of-Work:

- Skynet
- Arweave

Basierend auf Proof-of-Stake:

- Ethereum
- Filecoin
- Züs
- Crust-Netzwerk

## Zugehörige Werkzeuge {#related-tools}

**IPFS – _InterPlanetary File System ist ein dezentrales Speicher- und Dateireferenzierungssystem für Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _Sicherer, privater und S3-kompatibler dezentraler Cloud-Objektspeicher für Entwickler._**

- [Storj.io](https://storj.io/)
- [Dokumentation](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia – _Nutzt Kryptografie, um einen vertrauenslosen Cloud-Speichermarktplatz zu schaffen, der es Käufern und Verkäufern ermöglicht, direkt zu handeln._**

- [Skynet.net](https://sia.tech/)
- [Dokumentation](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin – _Filecoin wurde von demselben Team entwickelt, das auch hinter IPFS steht._** Es handelt sich um eine Anreizebene, aufbauend auf den IPFS-Idealen._\*\*

- [Filecoin.io](https://filecoin.io/)
- [Dokumentation](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Arweave ist eine dStorage-Plattform zur Datenspeicherung._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _Züs ist eine Proof-of-Stake dStorage-Plattform mit Sharding und Blobbers._**

- [zus.network](https://zus.network/)
- [Dokumentation](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network – _Crust ist eine dStorage-Plattform auf Basis von IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentation](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _Eine verteilte Speicherplattform und ein Dienst zur Inhaltsverteilung für den Ethereum Web3-Stack._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentation](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _Eine dezentrale Peer-to-Peer-Datenbank, die auf IPFS basiert._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentation](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _Dezentrales Cloud-Projekt (Datenbank, Dateispeicher, Computing und DID)._** Eine einzigartige Mischung aus Peer-to-Peer-Technologie – Off-Chain und On-Chain. IPFS und Multi-Chain-Kompatibilität._\*\*

- [Aleph.im](https://aleph.cloud/)
- [Dokumentation](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _Nutzergesteuerter IPFS-Datenbankspeicher für datenintensive und ansprechende Anwendungen._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentation](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _S3-kompatibler dezentraler Speicher und georedundanter IPFS-Pinning-Dienst. Alle über Filebase auf IPFS hochgeladenen Dateien werden automatisch mit 3-facher globaler Replikation an die Filebase-Infrastruktur gepinnt._**

- [Filebase.com](https://filebase.com/)
- [Dokumentation](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND – _Eine Web 3.0-Cloud-Computing-Plattform, die Speicher-, Rechen- und Netzwerk-Kernfunktionen integriert, S3-kompatibel ist und eine synchrone Datenspeicherung auf dezentralen Speichernetzwerken wie IPFS und Arweave bietet._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentation](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _Eine Blockchain-as-a-Service-Plattform mit IPFS-Nodes per Mausklick._**

- [Kaleido](https://kaleido.io/)
- [Dokumentation](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network – _Spheron ist eine Platform-as-a-Service (PaaS), die für Dapps entwickelt wurde, die ihre Anwendungen auf einer dezentralen Infrastruktur mit bester Leistung starten möchten. Sie bietet standardmäßig Rechenleistung, dezentralen Speicher, CDN und Webhosting._**

- [spheron.network](https://spheron.network/)
- [Dokumentation](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Weiterführende Lektüre {#further-reading}

- [Was ist dezentraler Speicher?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Fünf verbreitete Mythen über dezentralen Speicher widerlegt](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
