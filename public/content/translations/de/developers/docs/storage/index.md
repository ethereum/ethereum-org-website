---
title: Dezentralisierte Speicherung
description: "Übersicht darüber, was dezentralisierte Speicherung ist und welche Tools zur Integration in eine Dapp verfügbar sind."
lang: de
---

Im Gegensatz zu einem zentralisierten Server, der von einem einzigen Unternehmen oder einer einzigen Organisation betrieben wird, bestehen dezentralisierte Speichersysteme aus einem Peer-to-Peer-Netzwerk von Benutzer-Betreibern, die einen Teil der Gesamtdaten halten und so ein widerstandsfähiges System zur gemeinsamen Dateispeicherung schaffen. Diese können sich in einer Blockchain-basierten Anwendung oder einem beliebigen Peer-to-Peer-basierten Netzwerk befinden.

Ethereum selbst kann als dezentralisiertes Speichersystem verwendet werden, und das ist es auch, wenn es um die Speicherung von Code in all den Smart Contracts geht. Wenn es jedoch um große Datenmengen geht, ist Ethereum dafür nicht konzipiert worden. Die Chain wächst stetig, aber zum Zeitpunkt des Schreibens ist die Ethereum-Chain etwa 500 GB - 1 TB groß ([abhängig von der Anwendung](https://etherscan.io/chartsync/chaindefault)), und jeder Blockchain-Knoten im Netzwerk muss in der Lage sein, alle Daten zu speichern. Wenn die Chain auf große Datenmengen (sagen wir 5 TB) anwachsen würde, wäre es für alle Blockchain-Knoten nicht mehr machbar, weiterzulaufen. Außerdem wären die Kosten für die Bereitstellung einer so großen Datenmenge im Mainnet aufgrund der [Gas](/developers/docs/gas)-Gebühren unerschwinglich hoch.

Aufgrund dieser Einschränkungen benötigen wir eine andere Chain oder Methodik, um große Datenmengen auf dezentralisierte Weise zu speichern.

Bei der Betrachtung von Optionen für dezentralisierte Speicherung (dStorage) gibt es einige Dinge, die ein Benutzer beachten muss.

- Persistenzmechanismus / Anreizstruktur
- Durchsetzung der Datenaufbewahrung
- Dezentralität
- Konsens

## Persistenzmechanismus / Anreizstruktur {#persistence-mechanism}

### Blockchain-basiert {#blockchain-based}

Damit ein Datenelement für immer bestehen bleibt, müssen wir einen Persistenzmechanismus verwenden. Bei Ethereum besteht der Persistenzmechanismus beispielsweise darin, dass die gesamte Chain berücksichtigt werden muss, wenn ein Blockchain-Knoten betrieben wird. Neue Datenelemente werden an das Ende der Chain angehängt, und sie wächst weiter – was erfordert, dass jeder Blockchain-Knoten alle eingebetteten Daten repliziert.

Dies ist als **Blockchain-basierte** Persistenz bekannt.

Das Problem bei der Blockchain-basierten Persistenz ist, dass die Chain viel zu groß werden könnte, um alle Daten praktikabel zu pflegen und zu speichern (z. B. schätzen [viele Quellen](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/), dass das Internet über 40 Zettabyte Speicherkapazität benötigt).

Die Blockchain muss auch eine Art Anreizstruktur haben. Bei der Blockchain-basierten Persistenz erfolgt eine Zahlung an den Validator. Wenn die Daten zur Chain hinzugefügt werden, werden die Validatoren dafür bezahlt, die Daten hinzuzufügen.

Plattformen mit Blockchain-basierter Persistenz:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Vertragsbasiert {#contract-based}

**Vertragsbasierte** Persistenz beruht auf der Intuition, dass Daten nicht von jedem Blockchain-Knoten repliziert und für immer gespeichert werden können, sondern stattdessen durch Vertragsvereinbarungen aufrechterhalten werden müssen. Dies sind Vereinbarungen, die mit mehreren Blockchain-Knoten getroffen werden, die versprochen haben, ein Datenelement für einen bestimmten Zeitraum zu halten. Sie müssen erstattet oder erneuert werden, wenn sie ablaufen, um die Daten dauerhaft zu speichern.

In den meisten Fällen wird anstelle der Speicherung aller Daten auf der Blockchain der Hash des Speicherorts der Daten auf einer Chain gespeichert. Auf diese Weise muss nicht die gesamte Chain skalieren, um alle Daten zu behalten.

Plattformen mit vertragsbasierter Persistenz:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Zusätzliche Überlegungen {#additional-consideration}

IPFS ist ein verteiltes System zum Speichern und Zugreifen auf Dateien, Websites, Anwendungen und Daten. Es verfügt über kein integriertes Anreizsystem, kann aber stattdessen mit einer der oben genannten vertragsbasierten Anreizlösungen für eine längerfristige Persistenz verwendet werden. Eine weitere Möglichkeit, Daten auf IPFS dauerhaft zu speichern, ist die Zusammenarbeit mit einem Pinning-Dienst, der Ihre Daten für Sie „anheftet“ (pinnt). Sie können sogar Ihren eigenen IPFS-Blockchain-Knoten betreiben und zum Netzwerk beitragen, um Ihre eigenen Daten und/oder die anderer kostenlos dauerhaft zu speichern!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS-Pinning-Dienst)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin-Pinning-Dienst)_
- [Infura](https://infura.io/product/ipfs) _(IPFS-Pinning-Dienst)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS-Pinning-Explorer)_
- [4EVERLAND](https://www.4everland.org/) _(IPFS-Pinning-Dienst)_
- [Filebase](https://filebase.com) _(IPFS-Pinning-Dienst)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin-Pinning-Dienst)_

SWARM ist eine dezentralisierte Datenspeicherungs- und Verteilungstechnologie mit einem Speicheranreizsystem und einem Orakel für Speichermietpreise.

## Datenaufbewahrung {#data-retention}

Um Daten aufzubewahren, müssen Systeme über eine Art Mechanismus verfügen, der sicherstellt, dass Daten aufbewahrt werden.

### Challenge-Mechanismus {#challenge-mechanism}

Eine der beliebtesten Methoden, um sicherzustellen, dass Daten aufbewahrt werden, ist die Verwendung einer Art kryptografischer Challenge (Herausforderung), die an die Blockchain-Knoten ausgegeben wird, um sicherzustellen, dass sie die Daten noch haben. Ein einfaches Beispiel ist der Proof-of-Access von Arweave. Sie geben eine Challenge an die Blockchain-Knoten aus, um zu sehen, ob sie die Daten sowohl im aktuellsten Block als auch in einem zufälligen Block in der Vergangenheit haben. Wenn der Blockchain-Knoten die Antwort nicht liefern kann, wird er bestraft.

Arten von dStorage mit einem Challenge-Mechanismus:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Dezentralität {#decentrality}

Es gibt keine großartigen Tools, um den Grad der Dezentralisierung von Plattformen zu messen, aber im Allgemeinen sollten Sie Tools verwenden, die keine Form von KYC haben, um den Beweis zu erbringen, dass sie nicht zentralisiert sind.

Dezentralisierte Tools ohne KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Konsens {#consensus}

Die meisten dieser Tools haben ihre eigene Version eines [Konsensmechanismus](/developers/docs/consensus-mechanisms/), aber im Allgemeinen basieren sie entweder auf [**Proof-of-Work (PoW)**](/developers/docs/consensus-mechanisms/pow/) oder [**Proof-of-Stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Proof-of-Work-basiert:

- Skynet
- Arweave

Proof-of-Stake-basiert:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Verwandte Tools {#related-tools}

**IPFS – _Das InterPlanetary File System ist ein dezentralisiertes Speicher- und Dateireferenzierungssystem für Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _Sicherer, privater und S3-kompatibler dezentralisierter Cloud-Objektspeicher für Entwickler._**

- [Storj.io](https://storj.io/)
- [Dokumentation](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia – _Nutzt Kryptografie, um einen vertrauensfreien Cloud-Speicher-Marktplatz zu schaffen, der es Käufern und Verkäufern ermöglicht, direkt miteinander zu handeln._**

- [Skynet.net](https://sia.tech/)
- [Dokumentation](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin – _Filecoin wurde von demselben Team entwickelt, das auch hinter IPFS steht. Es ist eine Anreizschicht, die auf den Idealen von IPFS aufbaut._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentation](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Arweave ist eine dStorage-Plattform zur Speicherung von Daten._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _Züs ist eine Proof-of-Stake-dStorage-Plattform mit Sharding und Blobbern._**

- [zus.network](https://zus.network/)
- [Dokumentation](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network – _Crust ist eine dStorage-Plattform, die auf IPFS aufbaut._**

- [Crust.network](https://crust.network)
- [Dokumentation](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _Eine verteilte Speicherplattform und ein Content-Distribution-Service für den Ethereum-Web3-Stack._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentation](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _Eine dezentralisierte Peer-to-Peer-Datenbank, die auf IPFS aufbaut._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentation](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _Dezentralisiertes Cloud-Projekt (Datenbank, Dateispeicher, Computing und DID). Eine einzigartige Mischung aus Peer-to-Peer-Technologie Off-Chain und auf der Blockchain. IPFS- und Multi-Chain-Kompatibilität._**

- [Aleph.im](https://aleph.cloud/)
- [Dokumentation](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _Benutzergesteuerter IPFS-Datenbankspeicher für datenreiche und ansprechende Anwendungen._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentation](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _S3-kompatibler dezentralisierter Speicher und georedundanter IPFS-Pinning-Dienst. Alle Dateien, die über Filebase in IPFS hochgeladen werden, werden automatisch mit dreifacher weltweiter Replikation an die Filebase-Infrastruktur angeheftet._**

- [Filebase.com](https://filebase.com/)
- [Dokumentation](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND – _Eine Web 3.0-Cloud-Computing-Plattform, die Kernfunktionen für Speicherung, Berechnung und Netzwerke integriert, S3-kompatibel ist und synchrone Datenspeicherung in dezentralisierten Speichernetzwerken wie IPFS und Arweave bietet._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentation](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _Eine Blockchain-as-a-Service-Plattform mit IPFS-Blockchain-Knoten auf Knopfdruck_**

- [Kaleido](https://kaleido.io/)
- [Dokumentation](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network – _Spheron ist eine Platform-as-a-Service (PaaS), die für Dapps entwickelt wurde, die ihre Anwendungen auf einer dezentralisierten Infrastruktur mit bester Leistung starten möchten. Sie bietet standardmäßig Rechenleistung, dezentralisierte Speicherung, CDN und Webhosting._**

- [spheron.network](https://spheron.network/)
- [Dokumentation](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Weiterführende Literatur {#further-reading}

- [Was ist dezentralisierte Speicherung?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Fünf gängige Mythen über dezentralisierte Speicherung aufklären](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)