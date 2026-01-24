---
title: Client-Diversität
description: Eine ausführliche Erklärung über die Bedeutung der Client-Vielfalt für Ethereum.
lang: de
sidebarDepth: 2
---

Das Verhalten eines Ethereum-Knotens wird durch die von ihm ausgeführte Client-Software gesteuert. Es gibt mehrere Ethereum-Clients auf Produktionsebene, die jeweils von verschiedenen Teams in verschiedenen Sprachen entwickelt und gepflegt werden. Die Clients werden nach einer gemeinsamen Spezifikation aufgebaut, die sicherstellt, dass die Clients nahtlos miteinander kommunizieren und die gleiche Funktionalität haben sowie ein gleichwertiges Nutzererlebnis bieten. Im Moment jedoch ist die Verteilung von Clients auf Knotenpunkte nicht gleich genug, um diese Netzwerkbefestigung auf sein volles Potenzial zu realisieren. Idealerweise teilen sich Nutzer ungefähr gleich über die verschiedenen Clients hinweg und bringen so viel Client-Vielfalt wie möglich ins Netzwerk.

## Voraussetzungen {#prerequisites}

Wenn Sie noch nicht verstehen, was Nodes und Clients sind, lesen Sie den Artikel über [Nodes und Clients](/developers/docs/nodes-and-clients/). Die [Ausführungs-](/glossary/#execution-layer) und [Konsens-](/glossary/#consensus-layer)Ebenen sind im Glossar definiert.

## Warum gibt es mehrere Clients? {#why-multiple-clients}

Es gibt mehrere, unabhängig voneinander entwickelte und gewartete Clients, weil die Client-Vielfalt das Netzwerk widerstandsfähiger gegen Angriffe und Fehler macht. Mehrere Clients sind die einzigartige Stärke von Ethereum – andere Blockchains verlassen sich auf die Unfehlbarkeit eines einzigen Clients. Es reicht jedoch nicht aus, einfach mehrere Clients zur Verfügung zu haben. Sie müssen von der Community angenommen werden und die Anzahl der aktiven Nodes muss relativ gleichmäßig auf sie verteilt sein.

## Warum ist die Client-Vielfalt wichtig? {#client-diversity-importance}

Viele unabhängig voneinander entwickelte und gewartete Clients sind für die Sicherheit eines dezentralen Netzwerks unerlässlich. Lassen Sie uns die Gründe dafür untersuchen.

### Bugs {#bugs}

Ein Fehler in einem einzelnen Client stellt ein geringeres Risiko für das Netzwerk dar, wenn er nur eine Minderheit der Ethereum-Knoten repräsentiert. Bei einer annähernd gleichmäßigen Verteilung der Knoten auf viele Clients ist die Wahrscheinlichkeit, dass die meisten Clients von einem gemeinsamen Problem betroffen sind, gering. Das Netzwerk ist daher robuster.

### Widerstandsfähigkeit gegen Angriffe {#resilience}

Die Client-Vielfalt bietet auch eine gewisse Widerstandsfähigkeit gegen Angriffe. Ein Angriff beispielsweise, der [einen bestimmten Client dazu verleitet](https://twitter.com/vdWijden/status/1437712249926393858), auf einen bestimmten Zweig der Chain zu wechseln, wird wahrscheinlich nicht erfolgreich sein, da andere Clients wahrscheinlich nicht auf dieselbe Weise ausnutzbar sind und die kanonische Chain unbeschädigt bleibt. Eine geringe Client-Vielfalt erhöht das Risiko, das mit einem Hack auf den dominanten Client verbunden ist. Die Client-Vielfalt hat sich bereits als wichtiger Schutz gegen böswillige Angriffe auf das Netzwerk erwiesen. So war beispielsweise der Denial-of-Service-Angriff von Shanghai im Jahr 2016 möglich, weil es den Angreifern gelang, den dominanten Client (Geth) dazu zu bringen, einen „Slow Disk I/O-Vorgang“ zehntausende Male pro Block auszuführen. Da auch alternative Clients online waren, die diese Schwachstelle nicht aufwiesen, konnte Ethereum dem Angriff widerstehen und weiterarbeiten, während die Schwachstelle in Geth behoben wurde.

### Proof-of-Stake-Endgültigkeit {#finality}

Ein Fehler in einem Konsensclient mit mehr als 33 % der Ethereum-Knoten könnte verhindern, dass die Konsensebene finalisieren kann. Das bedeutet, dass die Nutzer nicht darauf vertrauen können, dass Transaktionen nicht irgendwann rückgängig gemacht oder geändert werden. Dies wäre für viele der auf Ethereum aufbauenden Anwendungen, insbesondere DeFi, sehr problematisch.

<Emoji text="🚨" className="me-4" /> Schlimmer noch: Ein kritischer Bug in einem Client mit Zweidrittelmehrheit könnte dazu führen, dass die Chain <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">falsch geteilt und finalisiert wird</a>. Dies wiederum würde dazu führen, dass eine große Anzahl von Validatoren auf einer ungültigen Chain stecken bleibt. Wenn sie sich der korrekten Chain wieder anschließen möchten, müssen diese Validatoren mit Slashing oder einem langsamen und teuren freiwilligen Rückzug und Reaktivierung rechnen. Das Ausmaß eines Slashings skaliert mit der Anzahl der schuldigen Knoten, wobei maximal eine Zweidrittelmehrheit geslashed werden kann (32 ETH).

Obwohl dies unwahrscheinliche Szenarien sind, kann das Ethereum-Ökosystem das Risiko mindern, indem es die Verteilung der Clients auf die aktiven Knoten ausgleicht. Im Idealfall würde kein Konsensclient jemals einen Anteil von 33 % an der Gesamtzahl der Nodes erreichen.

### Geteilte Verantwortung {#responsibility}

Bei Mehrheitsclients fallen außerdem Personalkosten an. Ein kleines Entwicklungsteam wird dadurch stärker belastet und trägt mehr Verantwortung. Je geringer die Client-Vielfalt ist, desto größer ist die Last der Verantwortung für die Entwickler, die den Mehrheitsclient pflegen. Die Verteilung dieser Verantwortung auf mehrere Teams ist vorteilhaft für die Sicherheit des Knoten-Netzwerks und für das Personalnetzwerk von Ethereum.

## Aktuelle Client-Vielfalt {#current-client-diversity}

### Ausführungs-Clients {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Konsens-Clients {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Andere", value: 0.07 }
]}
/>

Dieses Diagramm ist möglicherweise veraltet – aktuelle Informationen finden Sie auf [ethernodes.org](https://ethernodes.org) und [clientdiversity.org](https://clientdiversity.org).

Die beiden Tortendiagramme oben zeigen Momentaufnahmen der aktuellen Client-Vielfalt für die Ausführungs- und Konsensebene (Stand: Oktober 2025). Die Client-Vielfalt hat sich im Laufe der Jahre verbessert, und auf der Ausführungsebene hat die Dominanz von [Geth](https://geth.ethereum.org/) abgenommen. [Nethermind](https://www.nethermind.io/nethermind-client) liegt knapp an zweiter Stelle, [Besu](https://besu.hyperledger.org/) an dritter und [Erigon](https://github.com/ledgerwatch/erigon) an vierter Stelle, während andere Clients weniger als 3 % des Netzwerks ausmachen. Der am häufigsten verwendete Client auf der Konsensebene – [Lighthouse](https://lighthouse.sigmaprime.io/) – liegt nur knapp vor dem am zweithäufigsten verwendeten. [Prysm](https://prysmaticlabs.com/#projects) und [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) machen ~31 % bzw. ~14 % aus, und andere Clients werden selten verwendet.

Die Daten der Ausführungsebene wurden am 26. Okt. 2025 von [supermajority.info](https://supermajority.info/) bezogen. Die Daten für Konsens-Clients stammen von [Michael Sproul](https://github.com/sigp/blockprint). Die Daten der Konsensclients sind schwieriger zu beschaffen, da die Clients der Konsensschicht nicht immer eindeutige Spuren hinterlassen, anhand derer sie identifiziert werden können. Die Daten wurden mit einem Klassifizierungsalgorithmus generiert, der manchmal einige der Minderheits-Clients verwechselt (weitere Details finden Sie [hier](https://twitter.com/sproulM_/status/1440512518242197516)). Im obigen Diagramm werden diese mehrdeutigen Klassifizierungen mit einem Entweder-Oder-Label behandelt (z. B. Nimbus/Teku). Nichtsdestotrotz ist es klar, dass die Mehrheit des Netzwerks Prysm verwendet. Obwohl es sich nur um Momentaufnahmen handelt, vermitteln die Werte im Diagramm einen guten allgemeinen Eindruck vom aktuellen Stand der Client-Vielfalt.

Aktuelle Daten zur Client-Vielfalt für die Konsensebene sind jetzt auf [clientdiversity.org](https://clientdiversity.org/) verfügbar.

## Ausführungsebene {#execution-layer}

Bisher hat sich die Diskussion über die Client-Vielfalt hauptsächlich auf die Konsensschicht konzentriert. Allerdings macht der Ausführungs-Client [Geth](https://geth.ethereum.org) derzeit etwa 85 % aller Nodes aus. Dieser Prozentsatz ist aus denselben Gründen problematisch wie bei den Konsensclients. Zum Beispiel könnte ein Fehler in Geth, der die Transaktionsabwicklung oder die Konstruktion der Ausführungsnutzlast betrifft, dazu führen, dass Konsensclients problematische oder fehlerhafte Transaktionen abschließen. Daher wäre Ethereum sicherer mit einer gleichmäßigeren Verteilung der Ausführungsclients, idealerweise mit keinem Client, der mehr als 33 % des Netzwerks repräsentiert.

## Verwenden Sie einen Minderheits-Client {#use-minority-client}

Um die Kundenvielfalt zu berücksichtigen, müssen nicht nur einzelne Benutzer Minderheitskunden auswählen – auch Validierungs pools und Institutionen wie die großen Dapp und Börsen müssen ihre Kunden wechseln. Allerdings können alle Nutzer ihren Teil dazu beitragen, das derzeitige Ungleichgewicht auszugleichen und die Nutzung der gesamten verfügbaren Ethereum-Software zu forcieren. Nach der Zusammenführung müssen alle Knotenbetreiber einen Ausführungsclient und einen Konsensclient betreiben. Die Wahl von Kombinationen der unten vorgeschlagenen Clients wird dazu beitragen, die Client-Vielfalt zu erhöhen.

### Ausführungs-Clients {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Konsens-Clients {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Technisch versierte Nutzer können dazu beitragen, diesen Prozess zu beschleunigen, indem sie mehr Anleitungen und Dokumentationen für Minderheitenclients schreiben und ihre Kollegen, die Knoten betreiben, ermutigen, von den dominanten Clients wegzugehen. Anleitungen für den Wechsel zu einem Minderheits-Konsens-Client sind auf [clientdiversity.org](https://clientdiversity.org/) verfügbar.

## Dashboards zur Client-Vielfalt {#client-diversity-dashboards}

Verschiedene Dashboards geben Echtzeit-Statistiken zur Client-Vielfalt für die Ausführungs- und Konsensebene.

**Konsensebene:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Ausführungsebene:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Weiterführende Lektüre {#further-reading}

- [Client-Vielfalt auf der Konsensebene von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum-Merge: Betreiben Sie den Mehrheits-Client auf eigene Gefahr!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24. März 2022_
- [Die Bedeutung der Client-Vielfalt](https://our.status.im/the-importance-of-client-diversity/)
- [Liste von Ethereum-Node-Diensten](https://ethereumnodes.com/)
- [Das „Fünf-Warum-Problem“ der Client-Vielfalt](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum-Vielfalt und wie sie erreicht werden kann (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Verwandte Themen {#related-topics}

- [Einen Ethereum-Node betreiben](/run-a-node/)
- [Nodes und Clients](/developers/docs/nodes-and-clients/)
