---
title: Client-Vielfalt
description: "Eine allgemeine Erklärung der Bedeutung der Ethereum-Client-Vielfalt."
lang: de
sidebarDepth: 2
---

Das Verhalten eines [Ethereum](/)-Blockchain-Knotens wird durch die darauf ausgeführte Anwendungssoftware (Client-Software) gesteuert. Es gibt mehrere produktionsreife Ethereum-Anwendungen, die jeweils in verschiedenen Sprachen von separaten Teams entwickelt und gepflegt werden. Die Anwendungen werden nach einer gemeinsamen Spezifikation erstellt, die sicherstellt, dass die Anwendungen nahtlos miteinander kommunizieren, dieselbe Funktionalität aufweisen und eine gleichwertige Benutzererfahrung bieten. Derzeit ist die Verteilung der Anwendungen auf die Blockchain-Knoten jedoch nicht gleichmäßig genug, um diese Netzwerkstärkung in vollem Umfang zu realisieren. Im Idealfall teilen sich die Benutzer ungefähr gleichmäßig auf die verschiedenen Anwendungen auf, um dem Netzwerk eine größtmögliche Client-Vielfalt zu verleihen.

## Voraussetzungen {#prerequisites}

Wenn Sie noch nicht wissen, was Blockchain-Knoten und Anwendungen sind, lesen Sie [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/). Die [Ausführungsebene](/glossary/#execution-layer) und die [Konsensebene](/glossary/#consensus-layer) werden im Glossar definiert.

## Warum gibt es mehrere Anwendungen? {#why-multiple-clients}

Es gibt mehrere, unabhängig voneinander entwickelte und gepflegte Anwendungen, da die Client-Vielfalt das Netzwerk widerstandsfähiger gegen Angriffe und Fehler macht. Mehrere Anwendungen sind eine Stärke, die einzigartig für Ethereum ist – andere Blockchains verlassen sich auf die Unfehlbarkeit einer einzigen Anwendung. Es reicht jedoch nicht aus, einfach nur mehrere Anwendungen zur Verfügung zu haben; sie müssen von der Community angenommen werden und die gesamten aktiven Blockchain-Knoten müssen relativ gleichmäßig auf sie verteilt sein.

## Warum ist Client-Vielfalt wichtig? {#client-diversity-importance}

Viele unabhängig entwickelte und gepflegte Anwendungen zu haben, ist für die Gesundheit eines dezentralisierten Netzwerks von entscheidender Bedeutung. Lassen Sie uns die Gründe dafür untersuchen.

### Fehler {#bugs}

Ein Fehler in einer einzelnen Anwendung stellt ein geringeres Risiko für das Netzwerk dar, wenn sie eine Minderheit der Ethereum-Blockchain-Knoten repräsentiert. Bei einer annähernd gleichmäßigen Verteilung der Blockchain-Knoten auf viele Anwendungen ist die Wahrscheinlichkeit gering, dass die meisten Anwendungen von einem gemeinsamen Problem betroffen sind, und infolgedessen ist das Netzwerk robuster.

### Widerstandsfähigkeit gegen Angriffe {#resilience}

Client-Vielfalt bietet auch Widerstandsfähigkeit gegen Angriffe. Zum Beispiel ist ein Angriff, der [eine bestimmte Anwendung austrickst](https://twitter.com/vdWijden/status/1437712249926393858), um auf einen bestimmten Zweig der Chain zu wechseln, unwahrscheinlich erfolgreich, da andere Anwendungen wahrscheinlich nicht auf dieselbe Weise ausgenutzt werden können und die kanonische Chain unbeschädigt bleibt. Eine geringe Client-Vielfalt erhöht das Risiko, das mit einem Hack der dominierenden Anwendung verbunden ist. Client-Vielfalt hat sich bereits als wichtige Verteidigung gegen böswillige Angriffe auf das Netzwerk erwiesen. Beispielsweise war der Shanghai-Denial-of-Service-Angriff im Jahr 2016 möglich, weil Angreifer die dominierende Anwendung (Geth) dazu bringen konnten, eine langsame Festplatten-E/A-Operation zehntausende Male pro Block auszuführen. Da auch alternative Anwendungen online waren, die diese Schwachstelle nicht aufwiesen, konnte Ethereum dem Angriff widerstehen und den Betrieb aufrechterhalten, während die Schwachstelle in Geth behoben wurde.

### Proof-of-Stake-Finalität {#finality}

Ein Fehler in einem Konsens-Client mit über 33 % der Ethereum-Blockchain-Knoten könnte verhindern, dass die Konsensebene die Finalität erreicht. Das bedeutet, dass Benutzer nicht darauf vertrauen könnten, dass Transaktionen nicht irgendwann rückgängig gemacht oder geändert werden. Dies wäre für viele der auf Ethereum basierenden Apps, insbesondere im DeFi-Bereich, sehr problematisch.

<Emoji text="🚨" className="me-4" /> Schlimmer noch, ein kritischer Fehler in einer Anwendung mit einer Zweidrittelmehrheit könnte dazu führen, dass sich die Chain <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">fälschlicherweise aufspaltet und finalisiert</a>, was dazu führt, dass eine große Gruppe von Validatoren auf einer ungültigen Chain stecken bleibt. Wenn sie sich wieder der korrekten Chain anschließen möchten, droht diesen Validatoren ein Slashing oder ein langsamer und teurer freiwilliger Rückzug und eine Reaktivierung. Das Ausmaß eines Slashings skaliert mit der Anzahl der schuldigen Blockchain-Knoten, wobei eine Zweidrittelmehrheit maximal geslasht wird (32 ETH).

Obwohl dies unwahrscheinliche Szenarien sind, kann das Ethereum-Ökosystem deren Risiko mindern, indem es die Verteilung der Anwendungen auf die aktiven Blockchain-Knoten ausgleicht. Im Idealfall würde kein Konsens-Client jemals einen Anteil von 33 % an den gesamten Blockchain-Knoten erreichen.

### Geteilte Verantwortung {#responsibility}

Es gibt auch menschliche Kosten, wenn es Mehrheits-Anwendungen gibt. Es legt eine übermäßige Belastung und Verantwortung auf ein kleines Entwicklungsteam. Je geringer die Client-Vielfalt ist, desto größer ist die Last der Verantwortung für die Entwickler, die die Mehrheits-Anwendung pflegen. Diese Verantwortung auf mehrere Teams zu verteilen, ist sowohl für die Gesundheit von Ethereums Netzwerk aus Blockchain-Knoten als auch für sein Netzwerk aus Menschen gut.

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
{ name: "Other", value: 0.07 }
]}
/>

Dieses Diagramm ist möglicherweise veraltet – besuchen Sie [ethernodes.org](https://ethernodes.org) und [clientdiversity.org](https://clientdiversity.org) für aktuelle Informationen.

Die beiden obigen Kreisdiagramme zeigen Momentaufnahmen der aktuellen Client-Vielfalt für die Ausführungs- und Konsensebenen (zum Zeitpunkt der Erstellung im Oktober 2025). Die Client-Vielfalt hat sich im Laufe der Jahre verbessert, und auf der Ausführungsebene ist ein Rückgang der Dominanz von [Geth](https://geth.ethereum.org/) zu verzeichnen, wobei [Nethermind](https://www.nethermind.io/nethermind-client) dicht dahinter auf dem zweiten Platz liegt, [Besu](https://besu.hyperledger.org/) auf dem dritten und [Erigon](https://github.com/ledgerwatch/erigon) auf dem vierten Platz, während andere Anwendungen weniger als 3 % des Netzwerks ausmachen. Die am häufigsten verwendete Anwendung auf der Konsensebene – [Lighthouse](https://lighthouse.sigmaprime.io/) – liegt ziemlich nah an der am zweithäufigsten verwendeten. [Prysm](https://prysmaticlabs.com/#projects) und [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) machen ~31 % bzw. ~14 % aus, und andere Anwendungen werden selten verwendet.

Die Daten der Ausführungsebene wurden am 26. Oktober 2025 von [supermajority.info](https://supermajority.info/) bezogen. Die Daten für Konsens-Clients stammen von [Michael Sproul](https://github.com/sigp/blockprint). Daten zu Konsens-Clients sind schwieriger zu beschaffen, da die Anwendungen der Konsensebene nicht immer eindeutige Spuren aufweisen, anhand derer sie identifiziert werden können. Die Daten wurden mithilfe eines Klassifizierungsalgorithmus generiert, der manchmal einige der Minderheits-Anwendungen verwechselt (siehe [hier](https://twitter.com/sproulM_/status/1440512518242197516) für weitere Details). Im obigen Diagramm werden diese mehrdeutigen Klassifizierungen mit einer Entweder-Oder-Bezeichnung (z. B. Nimbus/Teku) behandelt. Dennoch ist klar, dass die Mehrheit des Netzwerks Prysm ausführt. Obwohl es sich nur um Momentaufnahmen handelt, vermitteln die Werte im Diagramm einen guten allgemeinen Eindruck vom aktuellen Stand der Client-Vielfalt.

Aktuelle Daten zur Client-Vielfalt für die Konsensebene sind jetzt unter [clientdiversity.org](https://clientdiversity.org/) verfügbar.

## Ausführungsebene {#execution-layer}

Bisher konzentrierte sich die Diskussion um die Client-Vielfalt hauptsächlich auf die Konsensebene. Der Ausführungs-Client [Geth](https://geth.ethereum.org) macht jedoch derzeit rund 85 % aller Blockchain-Knoten aus. Dieser Prozentsatz ist aus denselben Gründen problematisch wie bei Konsens-Clients. Beispielsweise könnte ein Fehler in Geth, der die Transaktionsverarbeitung oder die Erstellung von Ausführungs-Payloads beeinträchtigt, dazu führen, dass Konsens-Clients problematische oder fehlerhafte Transaktionen finalisieren. Daher wäre Ethereum mit einer gleichmäßigeren Verteilung von Ausführungs-Clients gesünder, idealerweise ohne dass eine Anwendung mehr als 33 % des Netzwerks repräsentiert.

## Verwenden Sie eine Minderheits-Anwendung {#use-minority-client}

Die Bewältigung der Client-Vielfalt erfordert mehr, als dass sich einzelne Benutzer für Minderheits-Anwendungen entscheiden – es erfordert, dass auch Validator-Pools und Institutionen wie die großen Dapps und Börsen die Anwendungen wechseln. Dennoch können alle Benutzer ihren Teil dazu beitragen, das derzeitige Ungleichgewicht zu beheben und die Nutzung der gesamten verfügbaren Ethereum-Software zu normalisieren. Nach dem Merge müssen alle Betreiber von Blockchain-Knoten einen Ausführungs-Client und einen Konsens-Client ausführen. Die Wahl von Kombinationen der unten vorgeschlagenen Anwendungen wird dazu beitragen, die Client-Vielfalt zu erhöhen.

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

Technische Benutzer können dazu beitragen, diesen Prozess zu beschleunigen, indem sie mehr Tutorials und Dokumentationen für Minderheits-Anwendungen schreiben und ihre Kollegen, die Blockchain-Knoten betreiben, ermutigen, von den dominierenden Anwendungen weg zu migrieren. Anleitungen zum Wechsel zu einem Minderheits-Konsens-Client sind auf [clientdiversity.org](https://clientdiversity.org/) verfügbar.

## Dashboards zur Client-Vielfalt {#client-diversity-dashboards}

Mehrere Dashboards bieten Echtzeit-Statistiken zur Client-Vielfalt für die Ausführungs- und Konsensebene.

**Konsensebene:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Ausführungsebene:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Weiterführende Literatur {#further-reading}

- [Client-Vielfalt auf der Konsensebene von Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Führen Sie die Mehrheits-Anwendung auf eigene Gefahr aus!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24. März 2022_
- [Bedeutung der Client-Vielfalt](https://our.status.im/the-importance-of-client-diversity/)
- [Liste der Ethereum-Blockchain-Knoten-Dienste](https://ethereumnodes.com/)
- [Die „Fünf Warums“ des Problems der Client-Vielfalt](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum-Vielfalt und wie man sie löst (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Verwandte Themen {#related-topics}

- [Einen Ethereum-Blockchain-Knoten betreiben](/run-a-node/)
- [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/)