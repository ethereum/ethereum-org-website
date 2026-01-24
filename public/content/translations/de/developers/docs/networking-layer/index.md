---
title: Netzwerkebene
description: Eine Einführung in die Netzwerkschicht von Ethereum.
lang: de
sidebarDepth: 2
---

Ethereum ist ein Peer-to-Peer-Netzwerk mit Tausenden von Knoten, die über standardisierte Protokolle miteinander kommunizieren können müssen. Die „Netzwerkschicht“ ist der Protokollstapel, der es diesen Knoten ermöglicht, einander zu finden und Informationen auszutauschen. Hierzu gehört das „Klatschen“ von Informationen (Eins-zu-viele-Kommunikation) über das Netzwerk sowie der Austausch von Anfragen und Antworten zwischen bestimmten Knoten (Eins-zu-eins-Kommunikation). Jeder Knoten muss bestimmte Netzwerkregeln einhalten, um sicherzustellen, dass er die richtigen Informationen sendet und empfängt.

Die Client-Software besteht aus zwei Teilen (Ausführungsclients und Konsens-Clients), jeder mit seinem eigenen Netzwerk-Stack. Neben der Kommunikation mit anderen Ethereum-Knoten müssen die Ausführungs- und Konsens-Clients auch untereinander kommunizieren. Auf dieser Seite finden Sie eine einführende Erklärung der Protokolle, die diese Kommunikation ermöglichen.

Ausführungsclients leiten Transaktionen über das Peer-to-Peer-Netzwerk der Ausführungsebene weiter. Dies erfordert eine verschlüsselte Kommunikation zwischen authentifizierten Peers. Wenn ein Validator ausgewählt wird, um einen Block vorzuschlagen, werden Transaktionen aus dem lokalen Transaktionspool des Knotens über eine lokale RPC Verbindung an Konsens-Clients weitergeleitet, die in Beacon Blöcke verpackt werden. Konsens-Clients werden dann Beacon Blöcke über ihr P2P-Netzwerk verbreiten. Dies erfordert zwei separate P2P-Netzwerke: eines, das Ausführungsclients für Transaktions-Gossip verbindet, und eines, das Konsensclients für Block-Gossip verbindet.

## Voraussetzungen {#prerequisites}

Einige Kenntnisse über Ethereum-[Nodes und Clients](/developers/docs/nodes-and-clients/) sind hilfreich, um diese Seite zu verstehen.

## Die Ausführungsebene {#execution-layer}

Die Netzwerkprotokolle der Ausführungsschicht sind in zwei Stapel unterteilt:

- der Discovery-Stack: baut auf UDP auf und ermöglicht es einem neuen Knoten, Peers zu finden, mit denen er sich verbinden kann

- der Dev P2P-Stack: sitzt auf TCP und ermöglicht Knoten den Informationsaustausch

Beide Stapel arbeiten parallel. Der Discovery-Stack speist neue Netzwerkteilnehmer in das Netzwerk ein und der Dev P2P-Stack ermöglicht ihre Interaktionen.

### Entdeckung {#discovery}

Bei der Erkennung handelt es sich um den Vorgang, andere Knoten im Netzwerk zu finden. Dies wird mithilfe eines kleinen Satzes von Bootnodes gebootstrappt (Nodes, deren Adressen in den Client [fest codiert](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) sind, damit sie sofort gefunden werden und den Client mit Peers verbinden können). Diese Bootknoten existieren nur, um einer Gruppe von Peers einen neuen Knoten vorzustellen – dies ist ihr einziger Zweck. Sie nehmen nicht an normalen Client-Aufgaben wie der Synchronisierung der Kette teil und werden nur beim allerersten Hochfahren eines Clients verwendet.

Das für die Interaktionen zwischen Node und Bootnode verwendete Protokoll ist eine modifizierte Form von [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), die eine [verteilte Hashtabelle](https://en.wikipedia.org/wiki/Distributed_hash_table) verwendet, um Listen von Nodes zu teilen. Jeder Knoten verfügt über eine Version dieser Tabelle, die die für die Verbindung mit seinen nächstgelegenen Peers erforderlichen Informationen enthält. Diese „Nähe“ ist nicht geografisch – die Entfernung wird durch die Ähnlichkeit der Knoten-ID definiert. Aus Sicherheitsgründen wird die Tabelle jedes Knotens regelmäßig aktualisiert. Im Entdeckungsprotokoll [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) können Nodes zum Beispiel auch „Anzeigen“ versenden, die die vom Client unterstützten Unterprotokolle anzeigen. Dadurch können Peers über die Protokolle verhandeln, die sie beide zur Kommunikation verwenden können.

Die Entdeckung beginnt mit einer Partie PING PONG. Ein erfolgreicher PING-l PONG „bindet“ den neuen Knoten an einen Bootknoten. Die erste Nachricht, die einen Bootnode auf die Existenz eines neuen Node aufmerksam macht, der in das Netzwerk eintritt, ist ein `PING`. Dieser `PING` enthält gehashte Informationen über den neuen Node, den Bootnode und einen Ablauf-Zeitstempel. Der Bootnode empfängt den `PING` und gibt einen `PONG` zurück, der den `PING`-Hash enthält. Wenn die `PING`- und `PONG`-Hashes übereinstimmen, wird die Verbindung zwischen dem neuen Node und dem Bootnode verifiziert und es wird gesagt, dass sie "verbunden" sind.

Sobald sie verbunden sind, kann der neue Node eine `FIND-NEIGHBOURS`-Anfrage an den Bootnode senden. Die vom Bootknoten zurückgegebenen Daten enthalten eine Liste von Peers, mit denen der neue Knoten eine Verbindung herstellen kann. Wenn die Nodes nicht verbunden sind, schlägt die `FIND-NEIGHBOURS`-Anfrage fehl, sodass der neue Node nicht in das Netzwerk eintreten kann.

Sobald der neue Knoten eine Liste der Nachbarn vom Bootknoten erhält, beginnt er mit jedem von ihnen einen PING PONG Austausch. Erfolgreiche PING PONG verbinden den neuen Knoten mit seinen Nachbarn und ermöglichen so den Nachrichtenaustausch.

```
Client starten --> mit Bootnode verbinden --> an Bootnode binden --> Nachbarn finden --> an Nachbarn binden
```

Ausführungs-Clients verwenden derzeit das Entdeckungsprotokoll [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) und es gibt aktive Bestrebungen, auf das Protokoll [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) zu migrieren.

#### ENR: Ethereum Node Records {#enr}

Der [Ethereum Node Record (ENR)](/developers/docs/networking-layer/network-addresses/) ist ein Objekt, das drei grundlegende Elemente enthält: eine Signatur (Hash des Inhalts des Records, der nach einem vereinbarten Identitätsschema erstellt wurde), eine Sequenznummer, die Änderungen am Record verfolgt, und eine beliebige Liste von Schlüssel-Wert-Paaren. Dies ist ein zukunftssicheres Format, das einen einfacheren Austausch von Identifizierungsinformationen zwischen neuen Peers ermöglicht und das bevorzugte Format für [Netzwerkadressen](/developers/docs/networking-layer/network-addresses) für Ethereum-Nodes ist.

#### Warum basiert die Erkennung auf UDP? {#why-udp}

UDP unterstützt keine Fehlerprüfung, kein erneutes Senden fehlgeschlagener Pakete oder dynamisches Öffnen und Schließen von Verbindungen. Stattdessen sendet es einfach einen kontinuierlichen Informationsstrom an ein Ziel, unabhängig davon, ob dieser erfolgreich empfangen wurde. Diese minimale Funktionalität führt auch zu einem minimalen Overhead, wodurch diese Art der Verbindung sehr schnell wird. Für die Erkennung, bei der ein Knoten lediglich seine Anwesenheit bekannt geben möchte, um dann eine formelle Verbindung mit einem Peer herzustellen, ist UDP ausreichend. Für den Rest des Netzwerk-Stacks ist UDP jedoch nicht geeignet. Der Informationsaustausch zwischen Knoten ist recht komplex und erfordert daher ein Protokoll mit umfassenderen Funktionen, das erneutes Senden, Fehlerprüfung usw. unterstützt. Der mit TCP verbundene zusätzliche Overhead ist die zusätzliche Funktionalität wert. Daher läuft der Großteil des P2P-Stacks über TCP.

### DevP2P {#devp2p}

Entwickler P2P selbst ist ein ganzer Stapel von Protokollen, die Ethereum implementiert, um das Peer-to-Peer-Netzwerk aufzubauen und zu pflegen. Nachdem neue Nodes dem Netzwerk beitreten, werden ihre Interaktionen durch Protokolle im [DevP2P](https://github.com/ethereum/devp2p)-Stack geregelt. Diese basieren alle auf TCP und umfassen das RLPx Transportprotokoll, das Draht Protokoll und mehrere Unterprotokolle. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) ist das Protokoll, das die Initiierung, Authentifizierung und Aufrechterhaltung von Sitzungen zwischen Nodes regelt. RLPx codiert Nachrichten mithilfe von RLP (Recursive Length Prefix), einer sehr platzsparenden Methode zum Codieren von Daten in eine minimale Struktur zum Senden zwischen Knoten.

Eine RLPx Sitzung zwischen zwei Knoten beginnt mit einem ersten kryptografischen Handshake. Dabei sendet der Knoten eine Authentifizierungsnachricht, die dann vom Peer überprüft wird. Nach erfolgreicher Überprüfung generiert der Peer eine Authentifizierungsbestätigungsnachricht, die an den Initiator knoten zurückgesendet wird. Dies ist ein Schlüsselaustauschprozess, der es den Knoten ermöglicht, privat und sicher zu kommunizieren. Ein erfolgreicher kryptografischer Handshake veranlasst dann beide Knoten, sich gegenseitig eine „Hallo“-Nachricht „über die Leitung“ zu senden. Das Draht-Protokoll wird durch einen erfolgreichen Austausch von Hallo Nachrichten initiiert.

Die Begrüßungsnachrichten enthalten:

- Protokollversion
- Kunden-ID
- Hafen
- Knoten ID
- Liste der unterstützten Unterprotokolle

Dies sind die für eine erfolgreiche Interaktion erforderlichen Informationen, da sie definieren, welche Funktionen zwischen beiden Knoten geteilt werden, und die Kommunikation konfigurieren. Es gibt einen Prozess der Unterprotokollverhandlung, bei dem die Listen der von jedem Knoten unterstützten Unterprotokolle verglichen werden und diejenigen, die beiden Knoten gemeinsam sind, in der Sitzung verwendet werden können.

Neben den Hallo-Nachrichten kann das Draht-Protokoll auch eine "Trennen" Nachricht senden, die einen Peer warnt, dass die Verbindung geschlossen wird. Das Draht-Protokoll umfasst auch PING und PONG Nachrichten, die regelmäßig gesendet werden, um eine Sitzung offen zuhalten. Der RLPx und Draht-Protokollaustausch legt daher die Grundlagen der Kommunikation zwischen den Knoten fest und bietet das Gerüst für den Austausch nützlicher Informationen gemäß einem bestimmten Unterprotokoll.

### Unterprotokolle {#sub-protocols}

#### Wire-Protokoll {#wire-protocol}

Sobald die Peers verbunden sind und eine RLPx Sitzung gestartet wurde, definiert das Draht Protokoll, wie die Peers kommunizieren. Ursprünglich definierte das Draht-Protokoll drei Hauptaufgaben: Kettensynchronisierung, Blockausbreitung und Transaktionsaustausch. Als Ethereum jedoch auf Proof-of-Stake umstellte, wurden Blockausbreitung und Kettensynchronisierung Teil der Konsensebene. Der Transaktionsaustausch liegt weiterhin in der Verantwortung der Ausführungskunden. Unter Transaktionsaustausch versteht man den Austausch ausstehender Transaktionen zwischen Knoten, sodass Blockersteller einige davon für die Aufnahme in den nächsten Block auswählen können. Detaillierte Informationen zu diesen Aufgaben sind [hier](https://github.com/ethereum/devp2p/blob/master/caps/eth.md) verfügbar. Clients, die diese Unterprotokolle unterstützen, stellen sie über die [JSON-RPC](/developers/docs/apis/json-rpc/) zur Verfügung.

#### les (leichtes Ethereum-Unterprotokoll) {#les}

Dies ist ein minimales Protokoll zum Synchronisieren von Light-Clients. Traditionell wurde dieses Protokoll selten verwendet, da vollständige Knoten erforderlich sind, um Daten an Light-Clients zu liefern, ohne dass hierfür Anreize bestehen. Das Standardverhalten von Ausführungsclients besteht nicht darin, leichte Client daten über Dateien bereitzustellen. Weitere Informationen sind in der les-[Spezifikation](https://github.com/ethereum/devp2p/blob/master/caps/les.md) verfügbar.

#### Snap {#snap}

Das [Snap-Protokoll](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) ist eine optionale Erweiterung, die es Peers ermöglicht, Snapshots der letzten Zustände auszutauschen, sodass Peers Konto- und Speicherdaten verifizieren können, ohne dazwischenliegende Merkle-Trie-Nodes herunterladen zu müssen.

#### Wit (Witness-Protokoll) {#wit}

Das [Witness-Protokoll](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) ist eine optionale Erweiterung, die den Austausch von Zustands-Witnesses zwischen Peers ermöglicht und dabei hilft, Clients mit der Spitze der Chain zu synchronisieren.

#### Whisper {#whisper}

Flüstern war ein Protokoll, das darauf abzielte, sichere Nachrichten zwischen Peers zu übermitteln, ohne Informationen in die Blockchain zu schreiben. Es war Teil des DevP2P Draht Protokolls, ist aber mittlerweile veraltet. Es gibt andere [verwandte Projekte](https://wakunetwork.com/) mit ähnlichen Zielen.

## Die Konsens-Ebene {#consensus-layer}

Die Konsens-Clients nehmen an einem separaten Peer-to-Peer-Netzwerk mit einer anderen Spezifikation teil. Konsens-Clients müssen am Blockklatsch teilnehmen, damit sie neue Blöcke von Peers erhalten und diese senden können, wenn sie an der Reihe sind, Blockvorschläge zu machen. Ähnlich wie bei der Ausführungsschicht ist hierfür zunächst ein Erkennungsprotokoll erforderlich, damit ein Knoten Peers finden und sichere Sitzungen zum Austausch von Blöcken, Bescheinigungen usw. herstellen kann.

### Entdeckung {#consensus-discovery}

Ähnlich wie die Ausführungs-Clients verwenden Konsens-Clients [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) über UDP, um Peers zu finden. Die Implementierung von discv5 auf der Konsens-Ebene unterscheidet sich von der der Ausführungs-Clients nur dadurch, dass sie einen Adapter enthält, der discv5 mit einem [libP2P](https://libp2p.io/)-Stack verbindet, wodurch DevP2P veraltet ist. Die RLP Sitzungen der Ausführungsschicht werden zugunsten des Noise Secure Channel Handshake von vlib P2P verworfen.

### ENRs {#consensus-enr}

Der ENR für Konsens-Nodes enthält den öffentlichen Schlüssel des Node, die IP-Adresse, UDP- und TCP-Ports sowie zwei konsensspezifische Felder: das Attestierungs-Subnetz-Bitfeld und den `eth2`-Schlüssel. Ersteres erleichtert es Knoten, Peers zu finden, die an bestimmten Konsens Tratsch Subnetzwerken teilnehmen. Der `eth2`-Schlüssel enthält Informationen darüber, welche Ethereum-Fork-Version der Node verwendet, und stellt so sicher, dass die Peers sich mit dem richtigen Ethereum verbinden.

### libP2P {#libp2p}

Der Lib P2P Stack unterstützt die gesamte Kommunikation nach der Erkennung. Clients können gemäß der Definition in ihrer ENR über IPv4 und/oder IPv6 wählen und lauschen. Die Protokolle auf der lib P2P Schicht können in die Domänen Gossip und Req/Resp unterteilt werden.

### Gossip {#gossip}

Der Klatschbereich umfasst alle Informationen, die sich schnell im gesamten Netzwerk verbreiten müssen. Hierzu zählen Beacon Blöcke, Beweise, Bescheinigungen, Ausgänge und Schrägstriche. Dies wird mithilfe von libP2P gossipsub v1 übertragen und basiert auf verschiedenen Metadaten, die lokal an jedem Knoten gespeichert werden, einschließlich der maximalen Größe der zu empfangenden und zu übertragenden Gossip Nutzdaten. Detaillierte Informationen über die Gossip-Domäne sind [hier](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub) verfügbar.

### Anfrage-Antwort {#request-response}

Die Anforderungs-Antwort-Domäne enthält Protokolle für Clients, die bestimmte Informationen von ihren Peers anfordern. Beispiele hierfür sind das Anfordern bestimmter Beacon Blöcke, die bestimmten Root-Hashes entsprechen oder innerhalb eines Slot-Bereichs liegen. Die Antworten werden immer als bissig komprimierte SSZ codierte Bytes zurückgegeben.

## Warum bevorzugt der Konsens Client SSZ gegenüber RLP? {#ssz-vs-rlp}

SSZ steht für einfache Serialisierung. Es verwendet feste Offsets, die das Dekodieren einzelner Teile einer kodierten Nachricht erleichtern, ohne die gesamte Struktur dekodieren zu müssen. Dies ist für den Konsens-Client sehr nützlich, da er bestimmte Informationen effizient aus kodierten Nachrichten extrahieren kann. Es ist außerdem speziell für die Integration mit Merkle Protokollen konzipiert, mit entsprechenden Effizienzsteigerungen für die Merkleisieru. Da alle Hashes in der Konsensschicht Merkle Wurzeln sind, führt dies zu einer erheblichen Verbesserung. SSZ garantiert außerdem eindeutige Wertedarstellungen.

## Verbinden der Ausführungs- und Konsens-Clients {#connecting-clients}

Sowohl Konsens als auch Ausführungsclients laufen parallel. Sie müssen verbunden sein, damit der Konsens Clients dem Ausführungsclient Anweisungen erteilen und der Ausführungsclient Transaktionsbündel an den Konsens Clients übergeben kann, um sie in Beacon Blöcke aufzunehmen. Die Kommunikation zwischen den beiden Clients kann über eine lokale RPC Verbindung erfolgen. Eine API, die als ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) bekannt ist, definiert die Anweisungen, die zwischen den beiden Clients gesendet werden. Da beide Clients hinter einer einzigen Netzwerkidentität sitzen, teilen sie sich einen ENR (Ethereum-Knotendatensatz), der für jeden Client einen separaten Schlüssel enthält (Eth1-Schlüssel und Eth2-Schlüssel).

Unten sehen Sie eine Zusammenfassung des Kontrollflusses, wobei der relevante Netzwerkstapel in Klammern steht.

### Wenn der Konsens-Client kein Blockproduzent ist: {#when-consensus-client-is-not-block-producer}

- Der Konsens-Client empfängt einen Block über das Block Tratsch Protokoll (Konsens P2P)
- Der Konsens-Client validiert den Block vorab, d. h. stellt sicher, dass er von einem gültigen Absender mit korrekten Metadaten stammt.
- Die Transaktionen im Block werden als Ausführungsnutzlast an die Ausführungsschicht gesendet (lokale RPC Verbindung)
- Die Ausführungsebene führt die Transaktionen aus und validiert den Zustand im Block-Header (d. h. prüft, ob die Hashes übereinstimmen).
- Die Ausführungsebene übergibt die Verbindung zurück an die Konsensebene. Der Block gilt nun als validiert (lokale RPC Verbindung)
- Die Konsensschicht fügt dem Kopf ihrer eigenen Blockchain einen Block hinzu und bestätigt ihn, indem sie die Bestätigung über das Netzwerk sendet (Konsens P2P)

### Wenn der Konsens-Client Blockproduzent ist: {#when-consensus-client-is-block-producer}

- Der Konsens Client erhält die Benachrichtigung, dass er der nächste Blockproduzent ist (Konsens P2P)
- Die Konsens-Ebene ruft die Methode `create block` im Ausführungs-Client auf (lokales RPC).
- Die Ausführungsschicht greift auf den Transaktion Mempool zu, der durch das Transaktion Tratsch Protokoll gefüllt wurde (Ausführung p2p)
- Der Ausführungsclient bündelt Transaktionen in einem Block, führt die Transaktionen aus und generiert einen Block-Hash
- Der Konsens-Client holt sich die Transaktionen und den Block-Hash vom Ausführungs-Client und fügt sie dem Beacon Block hinzu (lokales RPC)
- Der Konsens-Client überträgt den Block über das Block Tratsch Protokoll (Konsens P2P)
- Andere Clients erhalten den vorgeschlagenen Block über das Block Tratsch Protokoll und validieren ihn wie oben beschrieben (Konsens P2P)

Sobald der Block von genügend Validierung bestätigt wurde, wird er dem Kopf der Kette hinzugefügt, gerechtfertigt und schließlich abgeschlossen.

![](cons_client_net_layer.png)
![](exe_client_net_layer.png)

Schema der Netzwerkebene für Konsens- und Ausführungs-Clients, von [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Weiterführende Lektüre {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Netzwerkspezifikationen der Konsens-Ebene](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)
[kademlia zu discv5](https://vac.dev/kademlia-to-discv5)
[kademlia-Paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Einführung in Ethereum P2P](https://p2p.paris/en/talks/intro-ethereum-networking/)
[eth1/eth2-Beziehung](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video mit Details zu Merge und eth2-Client](https://www.youtube.com/watch?v=zNIrIninMgg)
