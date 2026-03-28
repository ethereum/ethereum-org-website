---
title: Netzwerkschicht
description: "Eine Einführung in die Netzwerkschicht von Ethereum."
lang: de
sidebarDepth: 2
---

[Ethereum](/) ist ein Peer-to-Peer-Netzwerk mit Tausenden von Blockchain-Knoten, die in der Lage sein müssen, über standardisierte Protokolle miteinander zu kommunizieren. Die „Netzwerkschicht“ ist der Stack von Protokollen, der es diesen Blockchain-Knoten ermöglicht, sich gegenseitig zu finden und Informationen auszutauschen. Dies umfasst das „Gossiping“ (Verbreiten) von Informationen (Eins-zu-Viele-Kommunikation) über das Netzwerk sowie den Austausch von Anfragen und Antworten zwischen bestimmten Blockchain-Knoten (Eins-zu-Eins-Kommunikation). Jeder Blockchain-Knoten muss bestimmte Netzwerkregeln einhalten, um sicherzustellen, dass er die richtigen Informationen sendet und empfängt.

Die Client-Software besteht aus zwei Teilen (Ausführungs-Clients und Konsens-Clients), von denen jeder seinen eigenen, separaten Netzwerk-Stack hat. Neben der Kommunikation mit anderen Ethereum-Blockchain-Knoten müssen die Ausführungs- und Konsens-Clients auch miteinander kommunizieren. Diese Seite bietet eine einführende Erklärung der Protokolle, die diese Kommunikation ermöglichen.

Ausführungs-Clients verbreiten Transaktionen über das Peer-to-Peer-Netzwerk der Ausführungsebene. Dies erfordert eine verschlüsselte Kommunikation zwischen authentifizierten Peers. Wenn ein Validator ausgewählt wird, um einen Block vorzuschlagen, werden Transaktionen aus dem lokalen Transaktionspool des Blockchain-Knotens über eine lokale RPC-Verbindung an Konsens-Clients weitergeleitet, die in Beacon-Blöcke verpackt werden. Konsens-Clients verbreiten dann Beacon-Blöcke über ihr P2P-Netzwerk. Dies erfordert zwei separate P2P-Netzwerke: eines, das Ausführungs-Clients für die Verbreitung von Transaktionen verbindet, und eines, das Konsens-Clients für die Verbreitung von Blöcken verbindet.

## Voraussetzungen {#prerequisites}

Ein gewisses Wissen über [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/) von Ethereum ist hilfreich, um diese Seite zu verstehen.

## Die Ausführungsebene {#execution-layer}

Die Netzwerkprotokolle der Ausführungsebene sind in zwei Stacks unterteilt:

- den Discovery-Stack: baut auf UDP auf und ermöglicht es einem neuen Blockchain-Knoten, Peers zu finden, mit denen er sich verbinden kann

- den DevP2P-Stack: setzt auf TCP auf und ermöglicht es Blockchain-Knoten, Informationen auszutauschen

Beide Stacks arbeiten parallel. Der Discovery-Stack speist neue Netzwerkteilnehmer in das Netzwerk ein, und der DevP2P-Stack ermöglicht deren Interaktionen.

### Discovery {#discovery}

Discovery ist der Prozess, andere Blockchain-Knoten im Netzwerk zu finden. Dies wird mithilfe einer kleinen Gruppe von Bootnodes (Blockchain-Knoten, deren Adressen in der Anwendung [fest codiert](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) sind, damit sie sofort gefunden werden können und die Anwendung mit Peers verbinden) initiiert. Diese Bootnodes existieren nur, um einen neuen Blockchain-Knoten einer Gruppe von Peers vorzustellen – dies ist ihr einziger Zweck. Sie nehmen nicht an normalen Anwendungsaufgaben wie der Synchronisierung der Blockchain teil und werden nur beim allerersten Start einer Anwendung verwendet.

Das für die Interaktionen zwischen Blockchain-Knoten und Bootnode verwendete Protokoll ist eine modifizierte Form von [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), das eine [verteilte Hash-Tabelle](https://en.wikipedia.org/wiki/Distributed_hash_table) verwendet, um Listen von Blockchain-Knoten zu teilen. Jeder Blockchain-Knoten verfügt über eine Version dieser Tabelle, die die erforderlichen Informationen enthält, um sich mit seinen engsten Peers zu verbinden. Diese „Nähe“ ist nicht geografisch – die Entfernung wird durch die Ähnlichkeit der ID des Blockchain-Knotens definiert. Die Tabelle jedes Blockchain-Knotens wird als Sicherheitsfunktion regelmäßig aktualisiert. Zum Beispiel sind im Discovery-Protokoll [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) Blockchain-Knoten auch in der Lage, „Anzeigen“ zu senden, die die von der Anwendung unterstützten Subprotokolle anzeigen. Dies ermöglicht es Peers, über die Protokolle zu verhandeln, die sie beide für die Kommunikation verwenden können.

Discovery beginnt mit einem PING-PONG-Spiel. Ein erfolgreiches PING-PONG „bindet“ den neuen Blockchain-Knoten an einen Bootnode. Die anfängliche Nachricht, die einen Bootnode auf die Existenz eines neuen Blockchain-Knotens aufmerksam macht, der dem Netzwerk beitritt, ist ein `PING`. Dieses `PING` enthält gehashte Informationen über den neuen Blockchain-Knoten, den Bootnode und einen Ablaufzeitstempel. Der Bootnode empfängt das `PING` und gibt ein `PONG` zurück, das den `PING`-Hash enthält. Wenn die `PING`- und `PONG`-Hashes übereinstimmen, wird die Verbindung zwischen dem neuen Blockchain-Knoten und dem Bootnode verifiziert und man sagt, sie haben sich „gebunden“ (bonded).

Sobald sie gebunden sind, kann der neue Blockchain-Knoten eine `FIND-NEIGHBOURS`-Anfrage an den Bootnode senden. Die vom Bootnode zurückgegebenen Daten enthalten eine Liste von Peers, mit denen sich der neue Blockchain-Knoten verbinden kann. Wenn die Blockchain-Knoten nicht gebunden sind, schlägt die `FIND-NEIGHBOURS`-Anfrage fehl, sodass der neue Blockchain-Knoten dem Netzwerk nicht beitreten kann.

Sobald der neue Blockchain-Knoten eine Liste von Nachbarn vom Bootnode erhält, beginnt er mit jedem von ihnen einen PING-PONG-Austausch. Erfolgreiche PING-PONGs binden den neuen Blockchain-Knoten an seine Nachbarn und ermöglichen den Nachrichtenaustausch.

```
start client --> connect to bootnode --> bond to bootnode --> find neighbours --> bond to neighbours
```

Ausführungs-Clients verwenden derzeit das Discovery-Protokoll [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md), und es gibt aktive Bemühungen, auf das Protokoll [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) zu migrieren.

#### ENR: Ethereum Node Records {#enr}

Der [Ethereum Node Record (ENR)](/developers/docs/networking-layer/network-addresses/) ist ein Objekt, das drei grundlegende Elemente enthält: eine Signatur (Hash des Datensatzinhalts, der nach einem vereinbarten Identitätsschema erstellt wurde), eine Sequenznummer, die Änderungen am Datensatz verfolgt, und eine beliebige Liste von Schlüssel-Wert-Paaren. Dies ist ein zukunftssicheres Format, das einen einfacheren Austausch von Identifizierungsinformationen zwischen neuen Peers ermöglicht und das bevorzugte Format für [Netzwerkadressen](/developers/docs/networking-layer/network-addresses) für Ethereum-Blockchain-Knoten ist.

#### Warum basiert Discovery auf UDP? {#why-udp}

UDP unterstützt keine Fehlerprüfung, kein erneutes Senden fehlgeschlagener Pakete und kein dynamisches Öffnen und Schließen von Verbindungen – stattdessen feuert es einfach einen kontinuierlichen Informationsstrom auf ein Ziel ab, unabhängig davon, ob dieser erfolgreich empfangen wird. Diese minimale Funktionalität führt auch zu minimalem Overhead, was diese Art von Verbindung sehr schnell macht. Für Discovery, bei dem ein Blockchain-Knoten lediglich seine Anwesenheit bekannt machen möchte, um dann eine formelle Verbindung mit einem Peer herzustellen, ist UDP ausreichend. Für den Rest des Netzwerk-Stacks ist UDP jedoch nicht geeignet. Der Informationsaustausch zwischen Blockchain-Knoten ist recht komplex und erfordert daher ein funktionsreicheres Protokoll, das erneutes Senden, Fehlerprüfung usw. unterstützen kann. Der zusätzliche Overhead, der mit TCP verbunden ist, ist die zusätzliche Funktionalität wert. Daher arbeitet der Großteil des P2P-Stacks über TCP.

### DevP2P {#devp2p}

DevP2P ist selbst ein ganzer Stack von Protokollen, den Ethereum implementiert, um das Peer-to-Peer-Netzwerk aufzubauen und aufrechtzuerhalten. Nachdem neue Blockchain-Knoten dem Netzwerk beigetreten sind, werden ihre Interaktionen durch Protokolle im [DevP2P](https://github.com/ethereum/devp2p)-Stack gesteuert. Diese setzen alle auf TCP auf und umfassen das RLPx-Transportprotokoll, das Wire-Protokoll und mehrere Subprotokolle. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) ist das Protokoll, das die Initiierung, Authentifizierung und Aufrechterhaltung von Sitzungen zwischen Blockchain-Knoten regelt. RLPx codiert Nachrichten mit RLP (Recursive Length Prefix), was eine sehr platzsparende Methode ist, um Daten in eine minimale Struktur für das Senden zwischen Blockchain-Knoten zu codieren.

Eine RLPx-Sitzung zwischen zwei Blockchain-Knoten beginnt mit einem anfänglichen kryptografischen Handshake. Dabei sendet der Blockchain-Knoten eine Authentifizierungsnachricht, die dann vom Peer verifiziert wird. Bei erfolgreicher Verifizierung generiert der Peer eine Authentifizierungsbestätigungsnachricht, die an den initiierenden Blockchain-Knoten zurückgegeben wird. Dies ist ein Schlüsselaustauschprozess, der es den Blockchain-Knoten ermöglicht, privat und sicher zu kommunizieren. Ein erfolgreicher kryptografischer Handshake löst dann aus, dass beide Blockchain-Knoten eine „Hello“-Nachricht „on the wire“ (über die Leitung) aneinander senden. Das Wire-Protokoll wird durch einen erfolgreichen Austausch von Hello-Nachrichten initiiert.

Die Hello-Nachrichten enthalten:

- Protokollversion
- Anwendungs-ID
- Port
- Blockchain-Knoten-ID
- Liste der unterstützten Subprotokolle

Dies sind die für eine erfolgreiche Interaktion erforderlichen Informationen, da sie definieren, welche Fähigkeiten zwischen beiden Blockchain-Knoten geteilt werden, und die Kommunikation konfigurieren. Es gibt einen Prozess der Subprotokoll-Aushandlung, bei dem die Listen der von jedem Blockchain-Knoten unterstützten Subprotokolle verglichen werden und diejenigen, die beiden Blockchain-Knoten gemeinsam sind, in der Sitzung verwendet werden können.

Zusammen mit den Hello-Nachrichten kann das Wire-Protokoll auch eine „Disconnect“-Nachricht senden, die einen Peer warnt, dass die Verbindung geschlossen wird. Das Wire-Protokoll enthält auch PING- und PONG-Nachrichten, die regelmäßig gesendet werden, um eine Sitzung offen zu halten. Der Austausch über RLPx und das Wire-Protokoll bildet somit die Grundlage der Kommunikation zwischen den Blockchain-Knoten und bietet das Gerüst für den Austausch nützlicher Informationen gemäß einem bestimmten Subprotokoll.

### Subprotokolle {#sub-protocols}

#### Wire-Protokoll {#wire-protocol}

Sobald Peers verbunden sind und eine RLPx-Sitzung gestartet wurde, definiert das Wire-Protokoll, wie Peers kommunizieren. Ursprünglich definierte das Wire-Protokoll drei Hauptaufgaben: Blockchain-Synchronisation, Blockverbreitung und Transaktionsaustausch. Nachdem Ethereum jedoch zu Proof-of-Stake gewechselt war, wurden die Blockverbreitung und die Blockchain-Synchronisation Teil der Konsensebene. Der Transaktionsaustausch liegt weiterhin im Aufgabenbereich der Ausführungs-Clients. Der Transaktionsaustausch bezieht sich auf den Austausch ausstehender Transaktionen zwischen Blockchain-Knoten, sodass Block-Ersteller einige davon für die Aufnahme in den nächsten Block auswählen können. Detaillierte Informationen zu diesen Aufgaben finden Sie [hier](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Anwendungen, die diese Subprotokolle unterstützen, stellen sie über den [JSON-RPC](/developers/docs/apis/json-rpc/) zur Verfügung.

#### les (Light Ethereum Subprotocol) {#les}

Dies ist ein minimales Protokoll zur Synchronisierung von Light-Clients. Traditionell wurde dieses Protokoll selten verwendet, da Full-Nodes (vollständige Blockchain-Knoten) erforderlich sind, um Daten für Light-Clients bereitzustellen, ohne dafür einen Anreiz zu erhalten. Das Standardverhalten von Ausführungs-Clients besteht darin, keine Light-Client-Daten über les bereitzustellen. Weitere Informationen finden Sie in der les-[Spezifikation](https://github.com/ethereum/devp2p/blob/master/caps/les.md).

#### Snap {#snap}

Das [Snap-Protokoll](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) ist eine optionale Erweiterung, die es Peers ermöglicht, Snapshots aktueller Status auszutauschen. Dadurch können Peers Konto- und Speicherdaten verifizieren, ohne dazwischenliegende Merkle-Trie-Knoten herunterladen zu müssen.

#### Wit (Witness-Protokoll) {#wit}

Das [Witness-Protokoll](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) ist eine optionale Erweiterung, die den Austausch von Status-Witnesses (Zeugen) zwischen Peers ermöglicht und dabei hilft, Anwendungen mit der Spitze der Blockchain zu synchronisieren.

#### Whisper {#whisper}

Whisper war ein Protokoll, das darauf abzielte, sicheres Messaging zwischen Peers bereitzustellen, ohne Informationen in die Blockchain zu schreiben. Es war Teil des DevP2P-Wire-Protokolls, ist aber mittlerweile veraltet. Es gibt andere [verwandte Projekte](https://wakunetwork.com/) mit ähnlichen Zielen.

## Die Konsensebene {#consensus-layer}

Die Konsens-Clients nehmen an einem separaten Peer-to-Peer-Netzwerk mit einer anderen Spezifikation teil. Konsens-Clients müssen an der Blockverbreitung (Block Gossip) teilnehmen, damit sie neue Blöcke von Peers empfangen und diese übertragen können, wenn sie an der Reihe sind, Block-Vorschlagender zu sein. Ähnlich wie bei der Ausführungsebene erfordert dies zunächst ein Discovery-Protokoll, damit ein Blockchain-Knoten Peers finden und sichere Sitzungen zum Austausch von Blöcken, Bestätigungen usw. einrichten kann.

### Discovery {#consensus-discovery}

Ähnlich wie die Ausführungs-Clients verwenden Konsens-Clients [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) über UDP, um Peers zu finden. Die Implementierung von discv5 auf der Konsensebene unterscheidet sich von der der Ausführungs-Clients nur dadurch, dass sie einen Adapter enthält, der discv5 mit einem [libP2P](https://libp2p.io/)-Stack verbindet und DevP2P obsolet macht. Die RLPx-Sitzungen der Ausführungsebene sind zugunsten des sicheren Noise-Kanal-Handshakes von libP2P veraltet.

### ENRs {#consensus-enr}

Der ENR für Konsens-Blockchain-Knoten enthält den Public-Key des Blockchain-Knotens, die IP-Adresse, UDP- und TCP-Ports sowie zwei konsensspezifische Felder: das Bestätigungs-Subnetz-Bitfeld und den `eth2`-Schlüssel. Ersteres erleichtert es Blockchain-Knoten, Peers zu finden, die an bestimmten Subnetzwerken für die Verbreitung von Bestätigungen teilnehmen. Der `eth2`-Schlüssel enthält Informationen darüber, welche Ethereum-Fork-Version der Blockchain-Knoten verwendet, um sicherzustellen, dass sich Peers mit dem richtigen Ethereum verbinden.

### libP2P {#libp2p}

Der libP2P-Stack unterstützt die gesamte Kommunikation nach der Discovery. Anwendungen können über IPv4 und/oder IPv6 wählen und zuhören, wie in ihrem ENR definiert. Die Protokolle auf der libP2P-Schicht können in die Gossip- und Req/Resp-Domänen (Anfrage/Antwort) unterteilt werden.

### Gossip {#gossip}

Die Gossip-Domäne umfasst alle Informationen, die sich schnell im gesamten Netzwerk verbreiten müssen. Dazu gehören Beacon-Blöcke, Beweise, Bestätigungen, Exits und Slashings. Dies wird mithilfe von libP2P gossipsub v1 übertragen und basiert auf verschiedenen Metadaten, die lokal auf jedem Blockchain-Knoten gespeichert sind, einschließlich der maximalen Größe der zu empfangenden und zu sendenden Gossip-Nutzdaten. Detaillierte Informationen zur Gossip-Domäne finden Sie [hier](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Request-Response (Anfrage-Antwort) {#request-response}

Die Request-Response-Domäne enthält Protokolle für Anwendungen, die spezifische Informationen von ihren Peers anfordern. Beispiele hierfür sind die Anforderung bestimmter Beacon-Blöcke, die mit bestimmten Root-Hashes übereinstimmen oder innerhalb eines Bereichs von Slots liegen. Die Antworten werden immer als Snappy-komprimierte, SSZ-codierte Bytes zurückgegeben.

## Warum bevorzugt der Konsens-Client SSZ gegenüber RLP? {#ssz-vs-rlp}

SSZ steht für Simple Serialization (einfache Serialisierung). Es verwendet feste Offsets, die es einfach machen, einzelne Teile einer codierten Nachricht zu decodieren, ohne die gesamte Struktur decodieren zu müssen. Dies ist für den Konsens-Client sehr nützlich, da er effizient bestimmte Informationen aus codierten Nachrichten extrahieren kann. Es wurde auch speziell für die Integration mit Merkle-Protokollen entwickelt, was zu entsprechenden Effizienzgewinnen bei der Merkleisierung führt. Da alle Hashes in der Konsensebene Merkle-Roots sind, summiert sich dies zu einer erheblichen Verbesserung. SSZ garantiert außerdem eindeutige Darstellungen von Werten.

## Verbindung von Ausführungs- und Konsens-Clients {#connecting-clients}

Sowohl Konsens- als auch Ausführungs-Clients laufen parallel. Sie müssen verbunden sein, damit der Konsens-Client dem Ausführungs-Client Anweisungen geben kann und der Ausführungs-Client Transaktionsbündel an den Konsens-Client weiterleiten kann, um sie in Beacon-Blöcke aufzunehmen. Die Kommunikation zwischen den beiden Clients kann über eine lokale RPC-Verbindung erfolgen. Eine API, bekannt als ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), definiert die Anweisungen, die zwischen den beiden Clients gesendet werden. Da beide Clients hinter einer einzigen Netzwerkidentität stehen, teilen sie sich einen ENR (Ethereum Node Record), der einen separaten Schlüssel für jeden Client enthält (eth1-Schlüssel und eth2-Schlüssel).

Eine Zusammenfassung des Kontrollflusses ist unten dargestellt, wobei der relevante Netzwerk-Stack in Klammern angegeben ist.

### Wenn der Konsens-Client nicht der Block-Produzent ist: {#when-consensus-client-is-not-block-producer}

- Der Konsens-Client empfängt einen Block über das Block-Gossip-Protokoll (Konsens-P2P)
- Der Konsens-Client validiert den Block vor, d. h. er stellt sicher, dass er von einem gültigen Absender mit korrekten Metadaten stammt
- Die Transaktionen im Block werden als Ausführungs-Payload an die Ausführungsebene gesendet (lokale RPC-Verbindung)
- Die Ausführungsebene führt die Transaktionen aus und validiert den Status im Block-Header (d. h. prüft, ob die Hashes übereinstimmen)
- Die Ausführungsebene gibt Validierungsdaten an die Konsensebene zurück, der Block gilt nun als validiert (lokale RPC-Verbindung)
- Die Konsensebene fügt den Block an die Spitze ihrer eigenen Blockchain an und bestätigt ihn, wobei die Bestätigung über das Netzwerk übertragen wird (Konsens-P2P)

### Wenn der Konsens-Client der Block-Produzent ist: {#when-consensus-client-is-block-producer}

- Der Konsens-Client erhält die Benachrichtigung, dass er der nächste Block-Produzent ist (Konsens-P2P)
- Die Konsensebene ruft die Methode `create block` im Ausführungs-Client auf (lokaler RPC)
- Die Ausführungsebene greift auf den Transaktions-Mempool zu, der durch das Transaktions-Gossip-Protokoll gefüllt wurde (Ausführungs-P2P)
- Der Ausführungs-Client bündelt Transaktionen in einen Block, führt die Transaktionen aus und generiert einen Block-Hash
- Der Konsens-Client holt sich die Transaktionen und den Block-Hash vom Ausführungs-Client und fügt sie dem Beacon-Block hinzu (lokaler RPC)
- Der Konsens-Client überträgt den Block über das Block-Gossip-Protokoll (Konsens-P2P)
- Andere Clients empfangen den vorgeschlagenen Block über das Block-Gossip-Protokoll und validieren ihn wie oben beschrieben (Konsens-P2P)

Sobald der Block von ausreichend Validatoren bestätigt wurde, wird er an die Spitze der Blockchain angehängt, gerechtfertigt (justified) und schließlich finalisiert.

![Diagramm der Netzwerkschicht des Ethereum-Konsens-Clients](cons_client_net_layer.png)
![Diagramm der Netzwerkschicht des Ethereum-Ausführungs-Clients](exe_client_net_layer.png)

Schema der Netzwerkschicht für Konsens- und Ausführungs-Clients, von [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Weiterführende Literatur {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Netzwerkspezifikationen der Konsensebene](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[Kademlia zu discv5](https://vac.dev/kademlia-to-discv5)
[Kademlia-Paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Einführung in Ethereum P2P](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Beziehung zwischen eth1 und eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video zu Details über den Merge und eth2-Clients](https://www.youtube.com/watch?v=zNIrIninMgg)