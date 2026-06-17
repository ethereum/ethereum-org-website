---
title: Brücken
description: Ein Überblick über Brücken für Entwickler
lang: de
---

Mit der zunehmenden Verbreitung von Layer-1-Blockchains (L1) und Layer-2-Lösungen (L2) zur [Skalierung](/developers/docs/scaling/) sowie einer stetig wachsenden Zahl von Dezentralen Anwendungen (Dapps), die kettenübergreifend agieren, ist der Bedarf an Kommunikation und dem Transfer von Vermögenswerten über Chains hinweg zu einem wesentlichen Bestandteil der Netzwerkinfrastruktur geworden. Es gibt verschiedene Arten von Brücken, um dies zu ermöglichen.

## Bedarf an Brücken {#need-for-bridges}

Brücken existieren, um Blockchain-Netzwerke zu verbinden. Sie ermöglichen Konnektivität und Interoperabilität zwischen Blockchains.

Blockchains existieren in isolierten Umgebungen, was bedeutet, dass es für Blockchains keine natürliche Möglichkeit gibt, mit anderen Blockchains zu handeln und zu kommunizieren. Infolgedessen kann es zwar erhebliche Aktivitäten und Innovationen innerhalb eines Ökosystems geben, diese werden jedoch durch die mangelnde Konnektivität und Interoperabilität mit anderen Ökosystemen eingeschränkt.

Brücken bieten eine Möglichkeit für isolierte Blockchain-Umgebungen, sich miteinander zu verbinden. Sie richten eine Transportroute zwischen Blockchains ein, auf der Token, Nachrichten, beliebige Daten und sogar [Smart-Contract](/developers/docs/smart-contracts/)-Aufrufe von einer Chain zur anderen transferiert werden können.

## Vorteile von Brücken {#benefits-of-bridges}

Einfach ausgedrückt, erschließen Brücken zahlreiche Anwendungsfälle, indem sie es Blockchain-Netzwerken ermöglichen, Daten auszutauschen und Vermögenswerte untereinander zu bewegen.

Blockchains haben einzigartige Stärken, Schwächen und Ansätze zur Entwicklung von Anwendungen (wie Geschwindigkeit, Transaktionsdurchsatz, Kosten usw.). Brücken unterstützen die Entwicklung des gesamten Krypto-Ökosystems, indem sie es Blockchains ermöglichen, die Innovationen der jeweils anderen zu nutzen.

Für Entwickler ermöglichen Brücken Folgendes:

- den Transfer beliebiger Daten, Informationen und Vermögenswerte kettenübergreifend.
- die Erschließung neuer Funktionen und Anwendungsfälle für Protokolle, da Brücken den Gestaltungsspielraum für das erweitern, was Protokolle anbieten können. Zum Beispiel kann ein Protokoll für Yield Farming, das ursprünglich im [Ethereum](/) Mainnet bereitgestellt wurde, Liquiditätspools über alle EVM-kompatiblen Chains hinweg anbieten.
- die Möglichkeit, die Stärken verschiedener Blockchains zu nutzen. Zum Beispiel können Entwickler von den niedrigeren Gebühren profitieren, die von den verschiedenen L2-Lösungen angeboten werden, indem sie ihre Dapps über Rollups und Sidechains hinweg bereitstellen, und Benutzer können über diese hinweg Brücken schlagen.
- die Zusammenarbeit von Entwicklern aus verschiedenen Blockchain-Ökosystemen, um neue Produkte zu entwickeln.
- die Gewinnung von Benutzern und Communities aus verschiedenen Ökosystemen für ihre Dapps.

## Wie funktionieren Brücken? {#how-do-bridges-work}

Obwohl es viele [Arten von Brückendesigns](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/) gibt, stechen drei Methoden hervor, um den kettenübergreifenden Transfer von Vermögenswerten zu erleichtern:

- **Sperren und prägen (Lock and mint) –** Vermögenswerte auf der Quell-Chain sperren und Vermögenswerte auf der Ziel-Chain prägen.
- **Verbrennen und prägen (Burn and mint) –** Vermögenswerte auf der Quell-Chain verbrennen und Vermögenswerte auf der Ziel-Chain prägen.
- **Atomic Swaps –** Vermögenswerte auf der Quell-Chain mit einer anderen Partei gegen Vermögenswerte auf der Ziel-Chain tauschen.

## Arten von Brücken {#bridge-types}

Brücken lassen sich in der Regel in eine der folgenden Kategorien einteilen:

- **Native Brücken –** Diese Brücken werden typischerweise gebaut, um Liquidität auf einer bestimmten Blockchain aufzubauen (Bootstrapping), was es Benutzern erleichtert, Gelder in das Ökosystem zu verschieben. Zum Beispiel wurde die [Arbitrum Bridge](https://bridge.arbitrum.io/) entwickelt, um es Benutzern bequem zu machen, eine Brücke vom Ethereum Mainnet zu Arbitrum zu schlagen. Andere solche Brücken umfassen die Polygon PoS Bridge, das [Optimism Gateway](https://app.optimism.io/bridge) usw.
- **Validator- oder Orakel-basierte Brücken –** Diese Brücken verlassen sich auf ein externes Validator-Set oder Orakel, um kettenübergreifende Transfers zu validieren. Beispiele: Multichain und Across.
- **Brücken für generalisierte Nachrichtenübermittlung –** Diese Brücken können Vermögenswerte zusammen mit Nachrichten und beliebigen Daten kettenübergreifend transferieren. Beispiele: Axelar, LayerZero und Nomad.
- **Liquiditätsnetzwerke –** Diese Brücken konzentrieren sich in erster Linie auf den Transfer von Vermögenswerten von einer Chain zur anderen über Atomic Swaps. Im Allgemeinen unterstützen sie keine kettenübergreifende Nachrichtenübermittlung. Beispiele: Connext und Hop.

## Zu berücksichtigende Kompromisse {#trade-offs}

Bei Brücken gibt es keine perfekten Lösungen. Vielmehr gibt es nur Kompromisse, die eingegangen werden, um einen Zweck zu erfüllen. Entwickler und Benutzer können Brücken anhand der folgenden Faktoren bewerten:

- **Sicherheit –** Wer verifiziert das System? Brücken, die durch externe Validatoren gesichert sind, sind in der Regel weniger sicher als Brücken, die lokal oder nativ durch die Validatoren der Blockchain gesichert sind.
- **Komfort –** Wie lange dauert es, eine Transaktion abzuschließen, und wie viele Transaktionen musste ein Benutzer signieren? Für einen Entwickler: Wie lange dauert es, eine Brücke zu integrieren, und wie komplex ist der Prozess?
- **Konnektivität –** Was sind die verschiedenen Ziel-Chains, die eine Brücke verbinden kann (d. h. Rollups, Sidechains, andere Layer-1-Blockchains usw.), und wie schwer ist es, eine neue Blockchain zu integrieren?
- **Fähigkeit, komplexere Daten weiterzugeben –** Kann eine Brücke den Transfer von Nachrichten und komplexeren beliebigen Daten kettenübergreifend ermöglichen, oder unterstützt sie nur kettenübergreifende Transfers von Vermögenswerten?
- **Kosteneffizienz –** Wie viel kostet es, Vermögenswerte über eine Brücke kettenübergreifend zu transferieren? Typischerweise erheben Brücken eine feste oder variable Gebühr, abhängig von den Gas-Kosten und der Liquidität bestimmter Routen. Es ist auch entscheidend, die Kosteneffizienz einer Brücke auf der Grundlage des Kapitals zu bewerten, das zur Gewährleistung ihrer Sicherheit erforderlich ist.

Auf einer hohen Ebene können Brücken in vertrauensbasierte (trusted) und vertrauenslose (trustless) Brücken kategorisiert werden.

- **Vertrauensbasiert (Trusted) –** Vertrauensbasierte Brücken werden extern verifiziert. Sie verwenden eine externe Gruppe von Verifizierern (Föderationen mit Multi-Sig, Multi-Party-Computation-Systeme, Orakel-Netzwerk), um Daten kettenübergreifend zu senden. Infolgedessen können sie eine hervorragende Konnektivität bieten und eine vollständig generalisierte Nachrichtenübermittlung über Chains hinweg ermöglichen. Sie schneiden auch in Bezug auf Geschwindigkeit und Kosteneffizienz tendenziell gut ab. Dies geht auf Kosten der Sicherheit, da sich die Benutzer auf die Sicherheit der Brücke verlassen müssen.
- **Vertrauenslos (Trustless) –** Diese Brücken verlassen sich auf die Blockchains, die sie verbinden, und deren Validatoren, um Nachrichten und Token zu transferieren. Sie sind „vertrauenslos“, weil sie keine neuen Vertrauensannahmen (zusätzlich zu den Blockchains) hinzufügen. Infolgedessen gelten vertrauenslose Brücken als sicherer als vertrauensbasierte Brücken.

Um vertrauenslose Brücken anhand anderer Faktoren zu bewerten, müssen wir sie in Brücken für generalisierte Nachrichtenübermittlung und Liquiditätsnetzwerke unterteilen.

- **Brücken für generalisierte Nachrichtenübermittlung –** Diese Brücken zeichnen sich durch Sicherheit und die Fähigkeit aus, komplexere Daten kettenübergreifend zu transferieren. Typischerweise sind sie auch kosteneffizient. Diese Stärken gehen jedoch im Allgemeinen auf Kosten der Konnektivität bei Light-Client-Brücken (z. B. IBC) und Geschwindigkeitsnachteilen bei optimistischen Brücken (z. B. Nomad), die Betrugsnachweise (Fraud Proofs) verwenden.
- **Liquiditätsnetzwerke –** Diese Brücken verwenden Atomic Swaps für den Transfer von Vermögenswerten und sind lokal verifizierte Systeme (d. h. sie verwenden die Validatoren der zugrunde liegenden Blockchains, um Transaktionen zu verifizieren). Infolgedessen zeichnen sie sich durch Sicherheit und Geschwindigkeit aus. Darüber hinaus gelten sie als vergleichsweise kosteneffizient und bieten eine gute Konnektivität. Der größte Kompromiss ist jedoch ihre Unfähigkeit, komplexere Daten weiterzugeben – da sie keine kettenübergreifende Nachrichtenübermittlung unterstützen.

## Risiken bei Brücken {#risk-with-bridges}

Brücken sind für die drei [größten Hacks im Bereich der Dezentralisierten Finanzen (DeFi)](https://rekt.news/leaderboard/) verantwortlich und befinden sich noch in einem frühen Entwicklungsstadium. Die Nutzung einer Brücke birgt die folgenden Risiken:

- **Smart-Contract-Risiko –** Obwohl viele Brücken Audits erfolgreich bestanden haben, reicht ein einziger Fehler in einem Smart Contract aus, um Vermögenswerte Hacks auszusetzen (z. B. [Solanas Wormhole Bridge](https://rekt.news/wormhole-rekt/)).
- **Systemische finanzielle Risiken** – Viele Brücken verwenden verpackte (wrapped) Vermögenswerte, um kanonische Versionen des ursprünglichen Vermögenswerts auf einer neuen Chain zu prägen. Dies setzt das Ökosystem einem systemischen Risiko aus, da wir bereits gesehen haben, wie verpackte Versionen von Token ausgenutzt wurden.
- **Kontrahentenrisiko –** Einige Brücken verwenden ein vertrauensbasiertes Design, das erfordert, dass sich Benutzer auf die Annahme verlassen, dass Validatoren nicht zusammenarbeiten, um Benutzergelder zu stehlen. Die Notwendigkeit für Benutzer, diesen Drittakteuren zu vertrauen, setzt sie Risiken wie Rug Pulls, Zensur und anderen böswilligen Aktivitäten aus.
- **Offene Fragen –** Da sich Brücken noch in den Kinderschuhen der Entwicklung befinden, gibt es viele unbeantwortete Fragen dazu, wie sich Brücken unter verschiedenen Marktbedingungen verhalten werden, wie z. B. in Zeiten von Netzwerküberlastung und bei unvorhergesehenen Ereignissen wie Angriffen auf Netzwerkebene oder Zustands-Rollbacks. Diese Unsicherheit birgt gewisse Risiken, deren Ausmaß noch unbekannt ist.

## Wie können Dapps Brücken nutzen? {#how-can-dapps-use-bridges}

Hier sind einige praktische Anwendungen, die Entwickler in Bezug auf Brücken und die kettenübergreifende Ausrichtung ihrer Dapp in Betracht ziehen können:

### Integration von Brücken {#integrating-bridges}

Für Entwickler gibt es viele Möglichkeiten, Unterstützung für Brücken hinzuzufügen:

1. **Eine eigene Brücke bauen –** Der Bau einer sicheren und zuverlässigen Brücke ist nicht einfach, insbesondere wenn man einen vertrauensminimierten Weg wählt. Darüber hinaus erfordert es jahrelange Erfahrung und technisches Fachwissen im Zusammenhang mit Skalierbarkeits- und Interoperabilitätsstudien. Zusätzlich wäre ein engagiertes Team erforderlich, um eine Brücke zu warten und ausreichend Liquidität anzuziehen, um sie rentabel zu machen.

2. **Benutzern mehrere Brückenoptionen anzeigen –** Viele [Dapps](/developers/docs/dapps/) erfordern, dass Benutzer ihren nativen Token besitzen, um mit ihnen zu interagieren. Um Benutzern den Zugriff auf ihre Token zu ermöglichen, bieten sie auf ihrer Website verschiedene Brückenoptionen an. Diese Methode ist jedoch nur eine schnelle Lösung für das Problem, da sie den Benutzer von der Dapp-Schnittstelle wegführt und weiterhin erfordert, dass er mit anderen Dapps und Brücken interagiert. Dies ist eine umständliche Onboarding-Erfahrung mit einem erhöhten Risiko, Fehler zu machen.

3. **Eine Brücke integrieren –** Diese Lösung erfordert nicht, dass die Dapp Benutzer zu externen Brücken- und DEX-Schnittstellen sendet. Sie ermöglicht es Dapps, die Onboarding-Erfahrung der Benutzer zu verbessern. Dieser Ansatz hat jedoch seine Grenzen:

   - Die Bewertung und Wartung von Brücken ist schwierig und zeitaufwändig.
   - Die Auswahl einer einzigen Brücke schafft einen Single Point of Failure und eine Abhängigkeit.
   - Die Dapp ist durch die Fähigkeiten der Brücke begrenzt.
   - Brücken allein reichen möglicherweise nicht aus. Dapps benötigen möglicherweise DEXs, um mehr Funktionalität wie kettenübergreifende Tausche (Swaps) anzubieten.

4. **Mehrere Brücken integrieren –** Diese Lösung löst viele Probleme, die mit der Integration einer einzelnen Brücke verbunden sind. Sie hat jedoch auch Einschränkungen, da die Integration mehrerer Brücken ressourcenintensiv ist und technische sowie kommunikative Mehraufwände für Entwickler schafft – die knappste Ressource im Krypto-Bereich.

5. **Einen Brücken-Aggregator integrieren –** Eine weitere Option für Dapps ist die Integration einer Brücken-Aggregationslösung, die ihnen Zugriff auf mehrere Brücken gibt. Brücken-Aggregatoren erben die Stärken aller Brücken und sind somit nicht durch die Fähigkeiten einer einzelnen Brücke begrenzt. Insbesondere pflegen die Brücken-Aggregatoren typischerweise die Brückenintegrationen, was der Dapp die Mühe erspart, bei den technischen und betrieblichen Aspekten einer Brückenintegration auf dem Laufenden bleiben zu müssen.

Allerdings haben auch Brücken-Aggregatoren ihre Grenzen. Zum Beispiel können sie zwar mehr Brückenoptionen anbieten, aber auf dem Markt sind typischerweise noch viel mehr Brücken verfügbar als die, die auf der Plattform des Aggregators angeboten werden. Darüber hinaus sind Brücken-Aggregatoren genau wie Brücken auch Smart-Contract- und Technologierisiken ausgesetzt (mehr Smart Contracts = mehr Risiken).

Wenn eine Dapp den Weg der Integration einer Brücke oder eines Aggregators geht, gibt es verschiedene Optionen, je nachdem, wie tief die Integration sein soll. Wenn es sich beispielsweise nur um eine Front-End-Integration handelt, um die Onboarding-Erfahrung der Benutzer zu verbessern, würde eine Dapp das Widget integrieren. Wenn die Integration jedoch dazu dient, tiefere kettenübergreifende Strategien wie Staking, Yield Farming usw. zu erkunden, integriert die Dapp das SDK oder die API.

### Bereitstellung einer Dapp auf mehreren Chains {#deploying-a-dapp-on-multiple-chains}

Um eine Dapp auf mehreren Chains bereitzustellen, können Entwickler Entwicklungsplattformen wie [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) usw. verwenden. Typischerweise verfügen diese Plattformen über zusammensetzbare Plugins, die es Dapps ermöglichen können, kettenübergreifend zu agieren. Beispielsweise können Entwickler einen deterministischen Bereitstellungs-Proxy verwenden, der vom [hardhat-deploy-Plugin](https://github.com/wighawag/hardhat-deploy) angeboten wird.

#### Beispiele: {#examples}

- [Wie man kettenübergreifende Dapps baut](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Aufbau eines kettenübergreifenden NFT-Marktplatzes](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Aufbau kettenübergreifender NFT-Dapps](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Überwachung der Vertragsaktivität über Chains hinweg {#monitoring-contract-activity-across-chains}

Um die Vertragsaktivität über Chains hinweg zu überwachen, können Entwickler Subgraphen und Entwicklerplattformen wie Tenderly verwenden, um Smart Contracts in Echtzeit zu beobachten. Solche Plattformen verfügen auch über Tools, die eine größere Datenüberwachungsfunktionalität für kettenübergreifende Aktivitäten bieten, wie z. B. die Überprüfung auf [Ereignisse, die von Verträgen ausgegeben werden](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), usw.

#### Tools {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Weiterführende Literatur {#further-reading}
- [Blockchain-Brücken](/bridges/) – ethereum.org
- [L2BEAT Bridge Risk Framework](https://l2beat.com/bridges/summary)
- [Blockchain Bridges: Building Networks of Cryptonetworks](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8. Sep. 2021 – Dmitriy Berenzon
- [The Interoperability Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1. Okt. 2021 – Arjun Bhuptani
- [Clusters: How Trusted & Trust-Minimized Bridges Shape the Multi-Chain Landscape](https://blog.celestia.org/clusters/) - 4. Okt. 2021 – Mustafa Al-Bassam
- [LI.FI: With Bridges, Trust is a Spectrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28. Apr. 2022 – Arjun Chand
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20. Juni 2024 – Alex Hook
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12. Juni 2024 – Emmanuel Awosika

Darüber hinaus sind hier einige aufschlussreiche Präsentationen von [James Prestwich](https://twitter.com/_prestwich), die helfen können, ein tieferes Verständnis von Brücken zu entwickeln:

- [Building Bridges, Not Walled Gardens](https://youtu.be/ZQJWMiX4hT0)
- [Breaking Down Bridges](https://youtu.be/b0mC-ZqN8Oo)
- [Why are the Bridges Burning](https://youtu.be/c7cm2kd20j8)