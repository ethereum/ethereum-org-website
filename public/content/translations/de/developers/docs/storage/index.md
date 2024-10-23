---
title: Dezentrale Speicher
description: Übersicht über dezentrale Speicher und verfügbare Tools für die Integration der Speicher in eine dApp
lang: de
---

Im Gegensatz zu einem zentralisierten Server, der von einem einzelnen Unternehmen oder einer Organisation betrieben wird, bestehen dezantrale Speichersysteme aus einem Peer-to-Peer-Netzwerk, aufgebaut aus Nutzern, die einen Teil der gesamten Daten aufbewahren. Das macht das Speichersystem sehr robust. Diese können in Blockchain-basierten Anwendungen oder jedem anderen Peer-to-Peer Netzwerk sein.

Ethereum selbst kann als dezentrales Speichersystem genutzt werden und das wird es zum Speichern von Code als Smart Contracts auch. Doch Ethereum wurde nicht für größere Datenmengen konzipiert. Die Chain wächst ständig – aktuell umfasst die Ethereum-Chain ca. 500 GB bis 1TB ([je nach Client](https://etherscan.io/chartsync/chaindefault)) und jeder Node im Netzwerk muss in der Lage sein, all diese Daten zu speichern. Würde die Chain immer weiter expandieren (sagen wir mal 5 TB), dann wäre es nicht mehr möglich, dass alle Nodes weiter laufen. Außerdem würden die Kosten, eine solche Datenmenge für das Mainnet bereitzustellen, wegen der [Ressourcengebühren](/developers/docs/gas) unerschwinglich hoch sein.

Aufgrund dieser Einschränkungen ist eine andere Chain oder Methode erforderlich, um große Datenmengen dezentral abzuspeichern.

Bei dezentralen Speichersystemen (dStorage) gibt es ein paar Aspekte, die Sie beachten sollten.

- Persistenzmechanismus/Anreizstruktur
- Durchsetzung der Datenspeicherung
- Dezentralität
- Konsensmechanismus

## Persistenzmechanismus/Anreizstruktur {#persistence-mechanism}

### Blockchain-basiert {#blockchain-based}

Damit Daten für immer persistent sind, müssen wir uns einen Persistenzmechanismus zunutze machen. Auf Ethereum besteht der Mechanismus zur Persistenz darin, dass die gesamte Chain beim Betrieb eines Nodes berücksichtigt beziehungsweise heruntergeladen werden muss. Neue Daten werden am Ende der Kette angehängt und die Kette wächst weiter – jeder Node muss alle eingebetteten Daten replizieren.

Das wird als **Blockchain-basierte** Persistenz bezeichnet.

Das Problem bei der Blockchain-basierten Persistenz ist, dass die Kette viel zu groß werden könnte, um alle Daten aufrechtzuerhalten und zu speichern (z. B. schätzen [viele Quellen](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/), dass das Internet über 40 Zetabyte Speicherkapazität benötigt).

Die Blockchain benötigt außerdem auch eine Art Anreizstruktur. Bei der Blockchain-basierten Persistenz wird eine Zahlung an den Validator durchgeführt. Wenn Daten zur Blockchain hinzugefügt werden, werden die Validatoren für das Hinzufügen der Daten bezahlt.

Plattformen mit Blockchain-basierter Persistenz:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Vertragsbasiert {#contract-based}

**Vertragsbasierte** Persistenz ist dazu gedacht, dass Daten nicht von jedem Node repliziert und für immer gespeichert werden können, sondern durch vertragliche Vereinbarungen aufrechterhalten werden müssen. Das sind Vereinbarungen zwischen mehreren Nodes, die einander versprechen, bestimmte Daten für einen festgelegten Zeitraum verfügbar zu halten. Wenn die Vereinbarungen auslaufen, müssen sie beendet oder erneuert werden, um die Datenpersistenz zu garantieren.

In den meisten Fällen werden nicht alle Daten in der Chain gespeichert, sondern nur der Hashwert der Position, an der sich die Daten in einer Chain befinden. So muss nicht die gesamte Chain skalieren, um alle Daten zu speichern.

Plattformen mit vertragsbsierter Persistenz:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust-Netzwerk](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Weitere Überlegungen {#additional-consideration}

IPFS ist ein verteiltes System für die Speicherung und den Zugriff auf Dateien, Websites, Anwendungen und Daten. Es hat kein eingebautes Anreizsystem, sondern kann stattdessen mit einer der oben genannten vertragsbasierten Anreizlösungen für eine längerfristige Persistenz verwendet werden. Eine andere Möglichkeit, Daten auf IPFS zu halten, ist die Zusammenarbeit mit einem Pinning-Dienst, der Ihre Daten für Sie "anpinnt". Sie können sogar Ihren eigenen IPFS-Node betreiben und zum Netzwerk beitragen, um Ihre und/oder die Daten anderer kostenlos aufzubewahren.

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS Pinning Service)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin Pinning Service)_
- [Infura](https://infura.io/product/ipfs) _(IPFS Pinning Service)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS Pinning Explorer)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS Pinning Service）_
- [Filebase](https://filebase.com) _(IPFS Pinning Service)_
- [Spheron Network](https://spheron.network/) _(IPFS-/Filecoin-Pinning-Dienst)_

SWARM ist eine dezentrale Datenspeicherungs- und Datenverteilungstechnologie mit einem Speicher-Incentive-System und einem Speicher-Mietpreis-Orakel.

## Datenaufbewahrung/Verfügbarkeit {#data-retention}

Systeme müssen für die Datenverfügbarkeit über einen Mechanismus verfügen, der genau dies sicherstellt.

### Herausforderungsmechanismus {#challenge-mechanism}

Einer der beliebtesten Wege zur Gewährleistung der Datenverfügbarkeit ist es, irgendeine Art von kryptographischer Herausforderung an die Knoten zu senden, die sie nur lösen können, wenn die Daten noch vorhanden sind. Ein einfaches Beispiel ist der Proof-of-Access von Arweave. Sie senden eine Herausforderung an Knoten, um zu sehen, ob sie über diese die Daten im aktuellsten Block sowie einem zufälligen Block in der Vergangenheit verfügen. Hat ein Knoten nicht die richtige Antwort, wird er bestraft.

Anbieter von dStorage mit einem Herausforderungsmechanismus:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Netzwerk
- 4EVERLAND

### Dezentralität {#decentrality}

Es gibt keine hervorragenden Tools, um den Grad der Dezentralität von Plattformen festzustellen. Doch im Allgemeinen sollte man die Tools verwenden, die keine Form von KYC für die Benutzung benötigen.

Dezentrale Tools ohne KYC:

- Züs (gerade erfolgt die Implementierung einer Version ohne KYC)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Netzwerk
- 4EVERLAND

### Konsens {#consensus}

Die meisten diesere Tools haben ihre eigene Version eines [Konsensmechanismus](/developers/docs/consensus-mechanisms/), basieren aber typischerweise auf [**Proof-of-Work (PoW)**](/developers/docs/consensus-mechanisms/pow/) oder [**Proof-of-Stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basierend auf Proof-of-Work:

- Skynet
- Arweave

Basierend auf Proof-of-Stake:

- Ethereum
- Filecoin
- Züs
- Crust Netzwerk

## Verwandte Werkzeuge {#related-tools}

**IPFS – _InterPlanetary File System ist dezentrales Speicher- und Datei-Referenzierungssystem für Ethereum_**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _Sicherer, privater und S3-kompatibler dezentraler Cloudobjektspeicher für Entwickler_**

- [Storj.io](https://storj.io/)
- [Dokumentation](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet – _Skynet ist eine dezentrale PoW-Chain speziell für ein dezentrales Web_**

- [Skynet.net](https://siasky.net/)
- [Dokumentation](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin – _Erstellt vom dem Team, das hinter IPFS steht. Es handelt sich um eine Anreizebene, aufbauend auf den IPFS-Idealen._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentation](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Arweave ist eine dStorage-Plattform für die Datenspeicherung_**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _Züs ist eine Proof-of-Stake-dStorage-Plattform mit Sharding und Blobbers._**

- [zus.network](https://zus.network/)
- [Documentation](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Crust Netzwerk – _Crust ist eine dStorage Plattform auf dem IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentation](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _Ein verteiltes Speichersystem und Content-Verteilungs-Service für den Ethereum-Web3-Stack._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentation](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _Eine dezentrale Peer-to-Peer-Datenbank, die auf IPFS basiert._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentation](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _Dezentrales Cloudprojekt (Datenbanken, Dateispeicherung, Computing und DID). Eine einzigartige Mischung aus Peer-to-Peer-Technologie – Off-Chain und On-Chain. IPFS und Multi-Chain-Kompatibilität._**

- [Aleph.im](https://aleph.im/)
- [Dokumentation](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _Nutzergesteuerte IPFS-Datenbankspeicher für datenintensive und anspruchsvolle Anwendungen._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentation](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _Ein S3-kompatibler dezentraler Speicher und geo-redundanter IPFS-Pinning-Service. Alle über Filebase auf IPFS hochgeladenen Dateien werden automatisch an die Filebase-Infrastruktur mit dreifacher Replikation auf der ganzen Welt gepinnt._**

- [Filebase.com](https://filebase.com/)
- [Dokumentation](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Eine Web 3.0-Cloud-Computing-Plattform, die Speicher-, Rechen- und Netzwerk-Kernfunktionen integriert, S3-kompatibel ist und synchrone Datenspeicherung auf dezentralen Speichernetzwerken wie IPFS und Arweave bietet._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentation](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _Eine Blockchain-as-a-Service-Plattform mit IPFS-Knoten auf einen Klick_**

- [Kaleido](https://kaleido.io/)
- [Dokumentation](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network – _Spheron ist eine Platform-as-a-Service (PaaS), die für dApps entwickelt wurde, die ihre Anwendungen auf dezentraler Infrastruktur mit bester Leistung starten möchten. Sie bietet standardmäßig Rechenleistung, dezentrale Speicherung, CDN und Webhosting._**

- [spheron.network](https://spheron.network/)
- [Dokumentation](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Weiterführende Informationen {#further-reading}

- [Was sind dezentrale Speichersysteme?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Fünf gängige Mythen über dezentrale Speichersysteme entlarvt](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
