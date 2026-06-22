---
title: "Client-Diversität"
description: "Eine allgemeine Erklärung der Bedeutung der Client-Diversität bei Ethereum."
lang: de
sidebarDepth: 2
---

Das Verhalten eines [Ethereum](/)-Knotens wird durch die Client-Software gesteuert, die er ausführt. Es gibt mehrere produktionsreife Ethereum-Clients, von denen jeder in verschiedenen Sprachen von separaten Teams entwickelt und gepflegt wird. Die Clients werden nach einer gemeinsamen Spezifikation entwickelt, die sicherstellt, dass die Clients nahtlos miteinander kommunizieren, dieselbe Funktionalität aufweisen und eine gleichwertige Benutzererfahrung bieten. Derzeit ist die Verteilung der Clients auf die Knoten jedoch nicht gleichmäßig genug, um diese Stärkung des Netzwerks in vollem Umfang zu realisieren. Im Idealfall verteilen sich die Benutzer in etwa gleichmäßig auf die verschiedenen Clients, um dem Netzwerk eine größtmögliche Client-Diversität zu verleihen.

## Voraussetzungen {#prerequisites}

Wenn Sie noch nicht wissen, was Knoten und Clients sind, lesen Sie den Artikel über [Knoten und Clients](/developers/docs/nodes-and-clients/). Die [Ausführungs-](/glossary/#execution-layer) und [Konsensschichten](/glossary/#consensus-layer) sind im Glossar definiert.

## Warum gibt es mehrere Clients? {#why-multiple-clients}

Es gibt mehrere, unabhängig voneinander entwickelte und gepflegte Clients, da die Client-Diversität das Netzwerk widerstandsfähiger gegen Angriffe und Fehler macht. Mehrere Clients sind eine einzigartige Stärke von Ethereum – andere Blockchains verlassen sich auf die Unfehlbarkeit eines einzigen Clients. Es reicht jedoch nicht aus, einfach nur mehrere Clients zur Verfügung zu haben; sie müssen von der Community angenommen werden und die gesamten aktiven Knoten müssen relativ gleichmäßig auf sie verteilt sein.

## Warum ist Client-Diversität wichtig? {#client-diversity-importance}

Viele unabhängig entwickelte und gepflegte Clients zu haben, ist für die Gesundheit eines dezentralen Netzwerks von entscheidender Bedeutung. Lassen Sie uns die Gründe dafür untersuchen.

### Bugs {#bugs}

Ein Bug in einem einzelnen Client stellt ein geringeres Risiko für das Netzwerk dar, wenn er eine Minderheit der Ethereum-Knoten repräsentiert. Bei einer in etwa gleichmäßigen Verteilung der Knoten auf viele Clients ist die Wahrscheinlichkeit gering, dass die meisten Clients von einem gemeinsamen Problem betroffen sind, und infolgedessen ist das Netzwerk robuster.

### Widerstandsfähigkeit gegen Angriffe {#resilience}

Client-Diversität bietet auch Widerstandsfähigkeit gegen Angriffe. Zum Beispiel ist ein Angriff, der [einen bestimmten Client austrickst](https://twitter.com/vdWijden/status/1437712249926393858), um auf einen bestimmten Zweig der Chain zu wechseln, wahrscheinlich nicht erfolgreich, da andere Clients wahrscheinlich nicht auf dieselbe Weise ausgenutzt werden können und die kanonische Chain unbeschädigt bleibt. Eine geringe Client-Diversität erhöht das Risiko, das mit einem Hack des dominierenden Clients verbunden ist. Client-Diversität hat sich bereits als wichtige Verteidigung gegen böswillige Angriffe auf das Netzwerk erwiesen. Beispielsweise war der Shanghai-Denial-of-Service-Angriff im Jahr 2016 möglich, weil Angreifer den dominierenden Client (Geth) dazu bringen konnten, eine langsame Festplatten-E/A-Operation zehntausende Male pro Block auszuführen. Da auch alternative Clients online waren, die diese Schwachstelle nicht aufwiesen, konnte Ethereum dem Angriff standhalten und den Betrieb aufrechterhalten, während die Schwachstelle in Geth behoben wurde.

### Proof-of-Stake-Endgültigkeit {#finality}

Ein Bug in einem Konsens-Client mit über 33 % der Ethereum-Knoten könnte verhindern, dass die Konsensschicht die Endgültigkeit erreicht, was bedeutet, dass Benutzer nicht darauf vertrauen könnten, dass Transaktionen nicht irgendwann rückgängig gemacht oder geändert werden. Dies wäre für viele der auf Ethereum aufbauenden Dezentralen Anwendungen (Dapps) sehr problematisch, insbesondere für Dezentralisierte Finanzen (DeFi).

<Emoji text="🚨" className="me-4" /> Schlimmer noch, ein kritischer Bug in einem Client mit einer Zweidrittelmehrheit könnte dazu führen, dass sich die Chain <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">fälschlicherweise aufspaltet und Endgültigkeit erreicht</a>, was dazu führt, dass eine große Anzahl von Validatoren auf einer ungültigen Chain stecken bleibt. Wenn sie der korrekten Chain wieder beitreten wollen, droht diesen Validatoren Slashing oder eine langsame und teure freiwillige Abhebung und Reaktivierung. Das Ausmaß eines Slashings skaliert mit der Anzahl der schuldigen Knoten, wobei bei einer Zweidrittelmehrheit maximal geslasht wird (32 ETH).

Obwohl dies unwahrscheinliche Szenarien sind, kann das Ethereum-Ökosystem ihr Risiko mindern, indem es die Verteilung der Clients auf die aktiven Knoten ausgleicht. Im Idealfall würde kein Konsens-Client jemals einen Anteil von 33 % an den gesamten Knoten erreichen.

### Geteilte Verantwortung {#responsibility}

Mehrheits-Clients haben auch einen menschlichen Preis. Es bürdet einem kleinen Entwicklungsteam übermäßige Belastung und Verantwortung auf. Je geringer die Client-Diversität, desto größer ist die Last der Verantwortung für die Entwickler, die den Mehrheits-Client pflegen. Diese Verantwortung auf mehrere Teams zu verteilen, ist sowohl für die Gesundheit von Ethereums Netzwerk von Knoten als auch für sein Netzwerk von Menschen gut.

## Aktuelle Client-Diversität {#current-client-diversity}

### Ausführungsclients {#execution-clients-breakdown}

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
{ name: "Other", value: 0.07 }
]}
/>

Dieses Diagramm ist möglicherweise veraltet – aktuelle Informationen finden Sie auf [ethernodes.org](https://ethernodes.org) und [clientdiversity.org](https://clientdiversity.org).

Die beiden obigen Kreisdiagramme zeigen Momentaufnahmen der aktuellen Client-Diversität für die Ausführungs- und Konsensschichten (zum Zeitpunkt der Erstellung im Oktober 2025). Die Client-Diversität hat sich im Laufe der Jahre verbessert, und auf der Ausführungsschicht ist die Dominanz von [Geth](https://geth.ethereum.org/) zurückgegangen, wobei [Nethermind](https://www.nethermind.io/nethermind-client) dicht dahinter auf dem zweiten, [Besu](https://besu.hyperledger.org/) auf dem dritten und [Erigon](https://github.com/ledgerwatch/erigon) auf dem vierten Platz liegt, während andere Clients weniger als 3 % des Netzwerks ausmachen. Der am häufigsten verwendete Client auf der Konsensschicht – [Lighthouse](https://lighthouse.sigmaprime.io/) – liegt ziemlich nah am zweithäufigsten verwendeten. [Prysm](https://prysmaticlabs.com/#projects) und [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) machen etwa 31 % bzw. 14 % aus, und andere Clients werden selten verwendet.

Die Daten der Ausführungsschicht wurden am 26. Oktober 2025 von [supermajority.info](https://supermajority.info/) bezogen. Die Daten für Konsens-Clients stammen von [Michael Sproul](https://github.com/sigp/blockprint). Daten zu Konsens-Clients sind schwieriger zu beschaffen, da die Clients der Konsensschicht nicht immer eindeutige Spuren aufweisen, anhand derer sie identifiziert werden können. Die Daten wurden mithilfe eines Klassifizierungsalgorithmus generiert, der manchmal einige der Minderheits-Clients verwechselt (weitere Details finden Sie [hier](https://twitter.com/sproulM_/status/1440512518242197516)). Im obigen Diagramm werden diese mehrdeutigen Klassifizierungen mit einer Entweder-oder-Bezeichnung (z. B. Nimbus/Teku) behandelt. Dennoch ist klar, dass die Mehrheit des Netzwerks Prysm ausführt. Obwohl es sich nur um Momentaufnahmen handelt, vermitteln die Werte im Diagramm einen guten allgemeinen Eindruck vom aktuellen Stand der Client-Diversität.

Aktuelle Daten zur Client-Diversität für die Konsensschicht sind jetzt unter [clientdiversity.org](https://clientdiversity.org/) verfügbar.

## Ausführungsschicht {#execution-layer}

Bisher konzentrierte sich die Diskussion um die Client-Diversität hauptsächlich auf die Konsensschicht. Der Ausführungsclient [Geth](https://geth.ethereum.org) macht derzeit jedoch rund 85 % aller Knoten aus. Dieser Prozentsatz ist aus denselben Gründen problematisch wie bei Konsens-Clients. Beispielsweise könnte ein Bug in Geth, der die Transaktionsverarbeitung oder die Erstellung von Ausführungs-Payloads betrifft, dazu führen, dass Konsens-Clients problematische oder fehlerhafte Transaktionen endgültig machen. Daher wäre Ethereum mit einer gleichmäßigeren Verteilung der Ausführungsclients gesünder, idealerweise ohne dass ein Client mehr als 33 % des Netzwerks repräsentiert.

## Verwenden Sie einen Minderheits-Client {#use-minority-client}

Die Bewältigung der Client-Diversität erfordert mehr, als dass einzelne Benutzer Minderheits-Clients wählen – es erfordert, dass auch Validator-Pools und Institutionen wie die großen Dezentralen Anwendungen (Dapps) und Börsen die Clients wechseln. Alle Benutzer können jedoch ihren Teil dazu beitragen, das derzeitige Ungleichgewicht zu beheben und die Nutzung der gesamten verfügbaren Ethereum-Software zu normalisieren. Nach dem Merge müssen alle Knotenbetreiber einen Ausführungsclient und einen Konsens-Client ausführen. Die Wahl von Kombinationen der unten vorgeschlagenen Clients trägt dazu bei, die Client-Diversität zu erhöhen.

### Ausführungsclients {#execution-clients}

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

Technische Benutzer können dazu beitragen, diesen Prozess zu beschleunigen, indem sie mehr Tutorials und Dokumentationen für Minderheits-Clients schreiben und ihre Knoten betreibenden Kollegen ermutigen, von den dominierenden Clients weg zu migrieren. Anleitungen zum Wechsel zu einem Minderheits-Konsens-Client finden Sie auf [clientdiversity.org](https://clientdiversity.org/).

## Dashboards zur Client-Diversität {#client-diversity-dashboards}

Mehrere Dashboards bieten Echtzeitstatistiken zur Client-Diversität für die Ausführungs- und Konsensschicht.

**Konsensschicht:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Ausführungsschicht:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Weiterführende Literatur {#further-reading}

- [Client-Diversität auf der Konsensschicht von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Run the majority client at your own peril!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24. März 2022_
- [Bedeutung der Client-Diversität](https://our.status.im/the-importance-of-client-diversity/)
- [Liste der Ethereum-Knotendienste](https://ethereumnodes.com/)
- [Die „Fünf Warums“ des Problems der Client-Diversität](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum Diversity and How to Solve For It (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Verwandte Themen {#related-topics}

- [Einen Ethereum-Knoten ausführen](/run-a-node/)
- [Knoten und Clients](/developers/docs/nodes-and-clients/)
