---
title: Netzwerkschicht
description: Eine Einführung in die Netzwerkschicht von Ethereum.
lang: de
sidebarDepth: 2
---

[Ethereum](/) ist ein Peer-to-Peer-Netzwerk mit Tausenden von Knoten, die in der Lage sein müssen, über standardisierte Protokolle miteinander zu kommunizieren. Die „Netzwerkschicht“ ist der Protokoll-Stack, der es diesen Knoten ermöglicht, sich gegenseitig zu finden und Informationen auszutauschen. Dies umfasst das „Gossiping“ (Verbreiten) von Informationen (Eins-zu-Viele-Kommunikation) über das Netzwerk sowie den Austausch von Anfragen und Antworten zwischen bestimmten Knoten (Eins-zu-Eins-Kommunikation). Jeder Knoten muss bestimmte Netzwerkregeln einhalten, um sicherzustellen, dass er die richtigen Informationen sendet und empfängt.

Die Client-Software besteht aus zwei Teilen (Ausführungsclients und Konsens-Clients), von denen jeder seinen eigenen, separaten Netzwerk-Stack hat. Neben der Kommunikation mit anderen Ethereum-Knoten müssen die Ausführungs- und Konsens-Clients auch miteinander kommunizieren. Diese Seite bietet eine einführende Erklärung der Protokolle, die diese Kommunikation ermöglichen.

Ausführungsclients verbreiten Transaktionen über das Peer-to-Peer-Netzwerk der Ausführungsschicht. Dies erfordert eine verschlüsselte Kommunikation zwischen authentifizierten Peers. Wenn ein Validator ausgewählt wird, um einen Block vorzuschlagen, werden Transaktionen aus dem lokalen Transaktionspool des Knotens über eine lokale RPC-Verbindung an Konsens-Clients weitergeleitet, die in Beacon-Blöcke verpackt werden. Konsens-Clients verbreiten dann Beacon-Blöcke über ihr P2P-Netzwerk. Dies erfordert zwei separate P2P-Netzwerke: eines, das Ausführungsclients für die Transaktionsverbreitung verbindet, und eines, das Konsens-Clients für die Blockverbreitung verbindet.

## Voraussetzungen {#prerequisites}

Etwas Wissen über Ethereum-[Knoten und Clients](/developers/docs/nodes-and-clients/) ist hilfreich, um diese Seite zu verstehen.

## Die Ausführungsschicht {#execution-layer}

Die Netzwerkprotokolle der Ausführungsschicht sind in zwei Stacks unterteilt:

- den Erkennungs-Stack: baut auf UDP auf und ermöglicht es einem neuen Knoten, Peers zu finden, mit denen er sich verbinden kann

- den devp2p-Stack: setzt auf TCP auf und ermöglicht es Knoten, Informationen auszutauschen

Beide Stacks arbeiten parallel. Der Erkennungs-Stack speist neue Netzwerkteilnehmer in das Netzwerk ein, und der devp2p-Stack ermöglicht deren Interaktionen.

### Erkennung {#discovery}

Die Erkennung ist der Prozess, andere Knoten im Netzwerk zu finden. Dies wird mithilfe einer kleinen Gruppe von Bootnodes (Knoten, deren Adressen im Client [fest codiert](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) sind, damit sie sofort gefunden werden können und den Client mit Peers verbinden) initiiert. Diese Bootnodes existieren nur, um einen neuen Knoten einer Gruppe von Peers vorzustellen – dies ist ihr einziger Zweck, sie nehmen nicht an normalen Client-Aufgaben wie der Synchronisierung der Chain teil und werden nur beim allerersten Start eines Clients verwendet.

Das für die Interaktionen zwischen Knoten und Bootnode verwendete Protokoll ist eine modifizierte Form von [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), das eine [verteilte Hash-Tabelle](https://en.wikipedia.org/wiki/Distributed_hash_table) verwendet, um Listen von Knoten zu teilen. Jeder Knoten verfügt über eine Version dieser Tabelle, die die erforderlichen Informationen enthält, um sich mit seinen engsten Peers zu verbinden. Diese „Nähe“ ist nicht geografisch – die Entfernung wird durch die Ähnlichkeit der Knoten-ID definiert. Die Tabelle jedes Knotens wird als Sicherheitsfunktion regelmäßig aktualisiert. Zum Beispiel können im Erkennungsprotokoll [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) Knoten auch „Anzeigen“ senden, die die vom Client unterstützten Subprotokolle anzeigen, sodass Peers über die Protokolle verhandeln können, die sie beide zur Kommunikation verwenden können.

Die Erkennung beginnt mit einem PING-PONG-Spiel. Ein erfolgreiches PING-PONG „bindet“ den neuen Knoten an einen Bootnode. Die anfängliche Nachricht, die einen Bootnode auf die Existenz eines neuen Knotens aufmerksam macht, der dem Netzwerk beitritt, ist ein `PING`. Dieses `PING` enthält gehashte Informationen über den neuen Knoten, den Bootnode und einen Ablaufzeitstempel. Der Bootnode empfängt das `PING` und gibt ein `PONG` zurück, das den `PING`-Hash enthält. Wenn die Hashes von `PING` und `PONG` übereinstimmen, wird die Verbindung zwischen dem neuen Knoten und dem Bootnode verifiziert und man sagt, sie haben sich „gebunden“.

Sobald sie gebunden sind, kann der neue Knoten eine `FIND-NEIGHBOURS`-Anfrage an den Bootnode senden. Die vom Bootnode zurückgegebenen Daten enthalten eine Liste von Peers, mit denen sich der neue Knoten verbinden kann. Wenn die Knoten nicht gebunden sind, schlägt die `FIND-NEIGHBOURS`-Anfrage fehl, sodass der neue Knoten dem Netzwerk nicht beitreten kann.

Sobald der neue Knoten eine Liste von Nachbarn vom Bootnode erhält, beginnt er mit jedem von ihnen einen PING-PONG-Austausch. Erfolgreiche PING-PONGs binden den neuen Knoten an seine Nachbarn und ermöglichen den Nachrichtenaustausch.

```
Client starten --> mit Bootnode verbinden --> an Bootnode binden --> Nachbarn finden --> an Nachbarn binden
```

Ausführungsclients verwenden derzeit das Erkennungsprotokoll [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) und es gibt aktive Bemühungen, auf das Protokoll [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) zu migrieren.

#### ENR: Ethereum Node Records {#enr}

Der [Ethereum Node Record (ENR)](/developers/docs/networking-layer/network-addresses/) ist ein Objekt, das drei grundlegende Elemente enthält: eine Signatur (Hash des Datensatzinhalts, der gemäß einem vereinbarten Identitätsschema erstellt wurde), eine Sequenznummer, die Änderungen am Datensatz verfolgt, und eine beliebige Liste von Schlüssel-Wert-Paaren. Dies ist ein zukunftssicheres Format, das einen einfacheren Austausch von Identifizierungsinformationen zwischen neuen Peers ermöglicht und das bevorzugte [Netzwerkadressen](/developers/docs/networking-layer/network-addresses)-Format für Ethereum-Knoten ist.

#### Warum baut die Erkennung auf UDP auf? {#why-udp}

UDP unterstützt keine Fehlerprüfung, kein erneutes Senden fehlgeschlagener Pakete oder das dynamische Öffnen und Schließen von Verbindungen – stattdessen feuert es einfach einen kontinuierlichen Informationsstrom auf ein Ziel ab, unabhängig davon, ob dieser erfolgreich empfangen wird. Diese minimale Funktionalität führt auch zu minimalem Overhead, was diese Art von Verbindung sehr schnell macht. Für die Erkennung, bei der ein Knoten lediglich seine Anwesenheit bekannt machen möchte, um dann eine formelle Verbindung mit einem Peer herzustellen, ist UDP ausreichend. Für den Rest des Netzwerk-Stacks ist UDP jedoch nicht zweckmäßig. Der Informationsaustausch zwischen Knoten ist recht komplex und benötigt daher ein funktionsreicheres Protokoll, das erneutes Senden, Fehlerprüfung usw. unterstützen kann. Der mit TCP verbundene zusätzliche Overhead ist die zusätzliche Funktionalität wert. Daher arbeitet der Großteil des P2P-Stacks über TCP.

### devp2p {#devp2p}

devp2p ist selbst ein ganzer Protokoll-Stack, den Ethereum implementiert, um das Peer-to-Peer-Netzwerk aufzubauen und aufrechtzuerhalten. Nachdem neue Knoten dem Netzwerk beigetreten sind, werden ihre Interaktionen durch Protokolle im [devp2p](https://github.com/ethereum/devp2p)-Stack gesteuert. Diese setzen alle auf TCP auf und umfassen das RLPx-Transportprotokoll, das Wire-Protokoll und mehrere Subprotokolle. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) ist das Protokoll, das die Initiierung, Authentifizierung und Aufrechterhaltung von Sitzungen zwischen Knoten steuert. RLPx codiert Nachrichten mithilfe von RLP (Recursive Length Prefix), was eine sehr platzeffiziente Methode ist, um Daten in eine minimale Struktur für das Senden zwischen Knoten zu codieren.

Eine RLPx-Sitzung zwischen zwei Knoten beginnt mit einem anfänglichen kryptografischen Handshake. Dabei sendet der Knoten eine Authentifizierungsnachricht, die dann vom Peer verifiziert wird. Bei erfolgreicher Verifizierung generiert der Peer eine Authentifizierungsbestätigungsnachricht, die an den Initiatorknoten zurückgegeben wird. Dies ist ein Schlüsselaustauschprozess, der es den Knoten ermöglicht, privat und sicher zu kommunizieren. Ein erfolgreicher kryptografischer Handshake löst dann aus, dass beide Knoten eine „Hallo“-Nachricht „on the wire“ (über die Leitung) aneinander senden. Das Wire-Protokoll wird durch einen erfolgreichen Austausch von Hallo-Nachrichten initiiert.

Die Hallo-Nachrichten enthalten:

- Protokollversion
- Client-ID
- Port
- Knoten-ID
- Liste der unterstützten Subprotokolle

Dies sind die für eine erfolgreiche Interaktion erforderlichen Informationen, da sie definieren, welche Fähigkeiten zwischen beiden Knoten geteilt werden, und die Kommunikation konfigurieren. Es gibt einen Prozess der Subprotokoll-Verhandlung, bei dem die Listen der von jedem Knoten unterstützten Subprotokolle verglichen werden und diejenigen, die beiden Knoten gemeinsam sind, in der Sitzung verwendet werden können.

Zusammen mit den Hallo-Nachrichten kann das Wire-Protokoll auch eine „Trennen“-Nachricht senden, die einen Peer warnt, dass die Verbindung geschlossen wird. Das Wire-Protokoll enthält auch PING- und PONG-Nachrichten, die regelmäßig gesendet werden, um eine Sitzung offen zu halten. Der Austausch über RLPx und das Wire-Protokoll bildet somit die Grundlage der Kommunikation zwischen den Knoten und bietet das Gerüst für den Austausch nützlicher Informationen gemäß einem bestimmten Subprotokoll.

### Subprotokolle {#sub-protocols}

#### Wire-Protokoll {#wire-protocol}

Sobald Peers verbunden sind und eine RLPx-Sitzung gestartet wurde, definiert das Wire-Protokoll, wie Peers kommunizieren. Ursprünglich definierte das Wire-Protokoll drei Hauptaufgaben: Chain-Synchronisierung, Blockverbreitung und Transaktionsaustausch. Nachdem Ethereum jedoch zu Proof-of-Stake (PoS) gewechselt war, wurden Blockverbreitung und Chain-Synchronisierung Teil der Konsensschicht. Der Transaktionsaustausch liegt weiterhin im Aufgabenbereich der Ausführungsclients. Der Transaktionsaustausch bezieht sich auf den Austausch ausstehender Transaktionen zwischen Knoten, sodass Block-Ersteller einige davon für die Aufnahme in den nächsten Block auswählen können. Detaillierte Informationen zu diesen Aufgaben finden Sie [hier](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Clients, die diese Subprotokolle unterstützen, stellen sie über die [JSON-RPC](/developers/docs/apis/json-rpc/) zur Verfügung.

#### les (Light Ethereum Subprotocol) {#les}

Dies ist ein minimales Protokoll zur Synchronisierung von Light-Clients. Traditionell wurde dieses Protokoll selten verwendet, da vollständige Knoten (Full Nodes) erforderlich sind, um Daten für Light-Clients bereitzustellen, ohne dafür einen Anreiz zu erhalten. Das Standardverhalten von Ausführungsclients besteht darin, keine Light-Client-Daten über les bereitzustellen. Weitere Informationen finden Sie in der les-[Spezifikation](https://github.com/ethereum/devp2p/blob/master/caps/les.md).

#### Snap {#snap}

Das [Snap-Protokoll](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) ist eine optionale Erweiterung, die es Peers ermöglicht, Snapshots aktueller Zustände auszutauschen, sodass Peers Konto- und Speicherdaten verifizieren können, ohne dazwischenliegende Merkle-Trie-Knoten herunterladen zu müssen.

#### Wit (Witness-Protokoll) {#wit}

Das [Witness-Protokoll](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) ist eine optionale Erweiterung, die den Austausch von Zustands-Zeugen zwischen Peers ermöglicht und dabei hilft, Clients mit der Spitze der Chain zu synchronisieren.

#### Whisper {#whisper}

Whisper war ein Protokoll, das darauf abzielte, sicheres Messaging zwischen Peers bereitzustellen, ohne Informationen in die Blockchain zu schreiben. Es war Teil des devp2p-Wire-Protokolls, ist aber mittlerweile veraltet. Es gibt andere [verwandte Projekte](https://wakunetwork.com/) mit ähnlichen Zielen.

## Die Konsensschicht {#consensus-layer}

Die Konsens-Clients nehmen an einem separaten Peer-to-Peer-Netzwerk mit einer anderen Spezifikation teil. Konsens-Clients müssen an der Blockverbreitung teilnehmen, damit sie neue Blöcke von Peers empfangen und diese übertragen können, wenn sie an der Reihe sind, Block-Proposer zu sein. Ähnlich wie bei der Ausführungsschicht erfordert dies zunächst ein Erkennungsprotokoll, damit ein Knoten Peers finden und sichere Sitzungen zum Austausch von Blöcken, Attestierungen usw. aufbauen kann.

### Erkennung {#consensus-discovery}

Ähnlich wie die Ausführungsclients verwenden Konsens-Clients [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) über UDP, um Peers zu finden. Die Implementierung von discv5 in der Konsensschicht unterscheidet sich von der der Ausführungsclients nur dadurch, dass sie einen Adapter enthält, der discv5 mit einem [libp2p](https://libp2p.io/)-Stack verbindet, wodurch devp2p veraltet ist. Die RLPx-Sitzungen der Ausführungsschicht sind zugunsten des Noise Secure Channel Handshakes von libp2p veraltet.

### ENRs {#consensus-enr}

Der ENR für Konsens-Knoten enthält den öffentlichen Schlüssel des Knotens, die IP-Adresse, UDP- und TCP-Ports sowie zwei konsensspezifische Felder: das Attestierungs-Subnetz-Bitfeld und den `eth2`-Schlüssel. Ersteres erleichtert es Knoten, Peers zu finden, die an bestimmten Attestierungs-Gossip-Subnetzwerken teilnehmen. Der `eth2`-Schlüssel enthält Informationen darüber, welche Ethereum-Fork-Version der Knoten verwendet, um sicherzustellen, dass sich Peers mit dem richtigen Ethereum verbinden.

### libp2p {#libp2p}

Der libp2p-Stack unterstützt die gesamte Kommunikation nach der Erkennung. Clients können über IPv4 und/oder IPv6 wählen und lauschen, wie in ihrem ENR definiert. Die Protokolle auf der libp2p-Schicht können in die Gossip- und Req/Resp-Domänen (Anfrage/Antwort) unterteilt werden.

### Gossip {#gossip}

Die Gossip-Domäne umfasst alle Informationen, die sich schnell im gesamten Netzwerk verbreiten müssen. Dazu gehören Beacon-Blöcke, Beweise, Attestierungen, Exits und Slashings. Dies wird mithilfe von libp2p gossipsub v1 übertragen und beruht darauf, dass verschiedene Metadaten lokal auf jedem Knoten gespeichert werden, einschließlich der maximalen Größe von Gossip-Payloads zum Empfangen und Senden. Detaillierte Informationen zur Gossip-Domäne finden Sie [hier](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Anfrage-Antwort (Request-Response) {#request-response}

Die Anfrage-Antwort-Domäne enthält Protokolle für Clients, die bestimmte Informationen von ihren Peers anfordern. Beispiele hierfür sind die Anforderung bestimmter Beacon-Blöcke, die mit bestimmten Root-Hashes übereinstimmen oder innerhalb eines Bereichs von Slots liegen. Die Antworten werden immer als Snappy-komprimierte, SSZ-codierte Bytes zurückgegeben.

## Warum bevorzugt der Konsens-Client SSZ gegenüber RLP? {#ssz-vs-rlp}

SSZ steht für Simple Serialize (einfache Serialisierung). Es verwendet feste Offsets, die es einfach machen, einzelne Teile einer codierten Nachricht zu decodieren, ohne die gesamte Struktur decodieren zu müssen. Dies ist für den Konsens-Client sehr nützlich, da er effizient bestimmte Informationen aus codierten Nachrichten abrufen kann. Es ist auch speziell für die Integration mit Merkle-Protokollen konzipiert, mit entsprechenden Effizienzgewinnen für die Merkleisierung. Da alle Hashes in der Konsensschicht Merkle-Roots sind, summiert sich dies zu einer erheblichen Verbesserung. SSZ garantiert auch eindeutige Darstellungen von Werten.

## Verbindung von Ausführungs- und Konsens-Clients {#connecting-clients}

Sowohl Konsens- als auch Ausführungsclients laufen parallel. Sie müssen verbunden sein, damit der Konsens-Client dem Ausführungsclient Anweisungen geben kann und der Ausführungsclient Transaktionsbündel an den Konsens-Client weitergeben kann, um sie in Beacon-Blöcke aufzunehmen. Die Kommunikation zwischen den beiden Clients kann über eine lokale RPC-Verbindung erfolgen. Eine API, bekannt als [„Engine-API“](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), definiert die Anweisungen, die zwischen den beiden Clients gesendet werden. Da beide Clients hinter einer einzigen Netzwerkidentität stehen, teilen sie sich einen ENR (Ethereum Node Record), der einen separaten Schlüssel für jeden Client enthält (Eth1-Schlüssel und Eth2-Schlüssel).

Eine Zusammenfassung des Kontrollflusses ist unten dargestellt, mit dem relevanten Netzwerk-Stack in Klammern.

### Wenn der Konsens-Client kein Block-Produzent ist: {#when-consensus-client-is-not-block-producer}

- Der Konsens-Client empfängt einen Block über das Block-Gossip-Protokoll (Konsens-P2P)
- Der Konsens-Client validiert den Block vor, d. h. er stellt sicher, dass er von einem gültigen Absender mit korrekten Metadaten stammt
- Die Transaktionen im Block werden als Ausführungs-Payload an die Ausführungsschicht gesendet (lokale RPC-Verbindung)
- Die Ausführungsschicht führt die Transaktionen aus und validiert den Zustand im Block-Header (d. h. prüft, ob die Hashes übereinstimmen)
- Die Ausführungsschicht gibt Validierungsdaten an die Konsensschicht zurück, der Block gilt nun als validiert (lokale RPC-Verbindung)
- Die Konsensschicht fügt den Block an die Spitze ihrer eigenen Blockchain an und attestiert ihn, wobei die Attestierung über das Netzwerk übertragen wird (Konsens-P2P)

### Wenn der Konsens-Client Block-Produzent ist: {#when-consensus-client-is-block-producer}

- Der Konsens-Client erhält die Benachrichtigung, dass er der nächste Block-Produzent ist (Konsens-P2P)
- Die Konsensschicht ruft die Methode `create block` im Ausführungsclient auf (lokale RPC)
- Die Ausführungsschicht greift auf den Transaktions-Mempool zu, der durch das Transaktions-Gossip-Protokoll gefüllt wurde (Ausführungs-P2P)
- Der Ausführungsclient bündelt Transaktionen in einen Block, führt die Transaktionen aus und generiert einen Block-Hash
- Der Konsens-Client holt sich die Transaktionen und den Block-Hash vom Ausführungsclient und fügt sie dem Beacon-Block hinzu (lokale RPC)
- Der Konsens-Client überträgt den Block über das Block-Gossip-Protokoll (Konsens-P2P)
- Andere Clients empfangen den vorgeschlagenen Block über das Block-Gossip-Protokoll und validieren ihn wie oben beschrieben (Konsens-P2P)

Sobald der Block von ausreichend Validatoren attestiert wurde, wird er an die Spitze der Chain angehängt, gerechtfertigt und schließlich endgültig gemacht.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Schema der Netzwerkschicht für Konsens- und Ausführungsclients, von [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Weiterführende Literatur {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[Netzwerkspezifikationen der Konsensschicht](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[Kademlia zu discv5](https://vac.dev/kademlia-to-discv5)
[Kademlia-Paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Einführung in Ethereum P2P](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Beziehung zwischen Eth1 und Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video zu Merge- und Eth2-Client-Details](https://www.youtube.com/watch?v=zNIrIninMgg)