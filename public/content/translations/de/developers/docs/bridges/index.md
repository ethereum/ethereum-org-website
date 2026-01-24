---
title: Brücken
description: Eine Übersicht über Bridging für Entwickler
lang: de
---

Mit der Verbreitung von L1-Blockchains und L2-[Skalierungslösungen](/developers/docs/scaling/) sowie einer ständig wachsenden Zahl dezentralisierter Anwendungen, die kettenübergreifend arbeiten, ist die Notwendigkeit der Kommunikation und des Transfers von Vermögenswerten über Ketten hinweg zu einem wesentlichen Bestandteil der Netzwerkinfrastruktur geworden. Um dies zu ermöglichen, gibt es verschiedene Arten von Brücken (Bridges).

## Notwendigkeit für kettenübergreifende Brücken {#need-for-bridges}

Es gibt Bridges, um Blockchain-Netzwerke miteinander zu verbinden. Sie ermöglichen Konnektivität und Interoperabilität zwischen Blockchains.

Blockchains existieren in isolierten Umgebungen. Das bedeutet, dass es für Blockchains keine Möglichkeit gibt, auf natürliche Weise mit anderen Blockchains zu transferieren und zu kommunizieren. Dies hat zur Folge, dass es innerhalb eines Ökosystems zwar erhebliche Aktivität und Innovation geben kann, diese aber durch die fehlende Konnektivität und Interoperabilität mit anderen Ökosystemen eingeschränkt ist.

Bridges bieten eine Möglichkeit für isolierte Blockchain-Umgebungen, sich zu connecten. Sie stellen eine Transportroute zwischen Blockchains her, über die Token, Nachrichten, beliebige Daten und sogar [Smart-Contract-Aufrufe](/developers/docs/smart-contracts/) von einer Kette zur anderen übertragen werden können.

## Vorteile von kettenübergreifenden Brücken {#benefits-of-bridges}

Einfach ausgedrückt, ermöglichen Brücken zahlreiche Anwendungsfälle, indem sie es Blockchain-Netzwerken erlauben, Daten auszutauschen und Vermögenswerte zwischen ihnen zu transferieren.

Blockchains haben einzigartige Stärken, Schwächen und Ansätze zum Aufbau von Anwendungen (wie Geschwindigkeit, Durchsatz, Kosten usw.). Bridges tragen zur Entwicklung des gesamten Krypto-Ökosystems bei, indem sie es Blockchains ermöglichen, die Innovationen der anderen zu nutzen.

Für Entwickler ermöglichen Bridges Folgendes:

- Die Übertragung von Daten, Informationen und Vermögenswerten über Ketten hinweg.
- Die Erschließung neuer Funktionen und Anwendungsfälle für Protokolle, da Bridges den Gestaltungsspielraum für Protokolle erweitern. Zum Beispiel kann ein Protokoll für Yield Farming, das ursprünglich im Ethereum Mainnet eingesetzt wurde, Liquiditätspools über alle EVM-kompatiblen Chains hinweg anbieten.
- Die Möglichkeit, die Stärken der verschiedenen Blockchains zu nutzen. So können Entwickler beispielsweise von den niedrigeren Gebühren der verschiedenen L2-Lösungen profitieren, indem sie ihre Dapps auf Rollups bzw. Sidechains deployen und Nutzer diese überbrücken können.
- Zusammenarbeit zwischen Entwicklern aus verschiedenen Blockchain-Ökosystemen, um neue Produkte zu entwickeln.
- Nutzer und Communities aus verschiedenen Ökosystemen für ihre Dapps gewinnen.

## Wie funktionieren Bridges? {#how-do-bridges-work}

Obwohl es viele [Arten von Designs für kettenübergreifende Brücken](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/) gibt, stechen drei Möglichkeiten zur Vereinfachung des kettenübergreifenden Transfers von Vermögenswerten hervor:

- **Sperren und Prägen –** Vermögenswerte auf der Quellkette sperren und auf der Zielkette prägen.
- **Verbrennen und Prägen –** Vermögenswerte auf der Quellkette verbrennen und auf der Zielkette prägen.
- **Atomare Swaps –** Tausch von Vermögenswerten auf der Quellkette gegen Vermögenswerte auf der Zielkette mit einer anderen Partei.

## Arten von kettenübergreifenden Brücken {#bridge-types}

Bridges lassen sich in der Regel in eine der folgenden Kategorien einordnen:

- **Native kettenübergreifende Brücken –** Diese kettenübergreifenden Brücken werden in der Regel gebaut, um die Liquidität auf einer bestimmten Blockchain zu fördern, was es den Nutzern erleichtert, Gelder in das Ökosystem zu transferieren. Die [Arbitrum Bridge](https://bridge.arbitrum.io/) wurde beispielsweise gebaut, um es Nutzern zu erleichtern, von Ethereum Mainnet zu Arbitrum zu überbrücken. Andere solche kettenübergreifenden Brücken sind die Polygon PoS Bridge, das [Optimism Gateway](https://app.optimism.io/bridge) usw.
- **Validator- oder Orakel-basierte kettenübergreifende Brücken –** Diese kettenübergreifenden Brücken stützen sich auf eine externe Gruppe von Validatoren oder Orakel, um kettenübergreifende Übertragungen zu validieren. Beispiele: Multichain und Across.
- **Generalisierten kettenübergreifenden Brücken zur Nachrichtenübermittlung –** Diese kettenübergreifenden Brücken können Vermögenswerte zusammen mit Nachrichten und beliebigen Daten über Ketten hinweg übertragen. Beispiele: Axelar, LayerZero und Nomad.
- **Liquiditätsnetzwerke –** Diese kettenübergreifenden Brücken konzentrieren sich in erster Linie auf die Übertragung von Vermögenswerten von einer Kette zur anderen über atomare Swaps. Im Allgemeinen unterstützen sie keine cross-chain Nachrichtenübermittlung. Beispiele: Connext und Hop.

## Zu berücksichtigende Trade-offs {#trade-offs}

Bei Bridges gibt es keine perfekten Lösungen. Vielmehr gibt es Kompromisse, die gemacht werden, um einen bestimmten Zweck zu erfüllen. Entwickler und Benutzer können Bridges anhand der folgenden Faktoren bewerten:

- **Sicherheit –** Wer verifiziert das System? Durch externe Validatoren gesicherte Bridges sind in der Regel weniger sicher als Bridges, die lokal oder nativ durch die Validatoren der Blockchain gesichert sind.
- **Bequemlichkeit –** Wie lange dauert der Abschluss einer Transaktion und wie viele Transaktionen musste ein Nutzer unterzeichnen? Wie lange braucht ein Entwickler, um eine Bridge zu integrieren, und wie komplex ist der Prozess?
- **Konnektivität –** Welche verschiedenen Zielketten kann eine kettenübergreifende Brücke verbinden (d. h. Rollups, Sidechains, andere Layer-1-Blockchains usw.) und wie schwierig ist es, eine neue Blockchain zu integrieren?
- **Fähigkeit, komplexere Daten zu übermitteln –** Kann eine kettenübergreifende Brücke die Übertragung von Nachrichten und komplexeren beliebigen Daten über Ketten hinweg ermöglichen oder unterstützt sie nur kettenübergreifende Vermögensübertragungen?
- **Kosteneffizienz –** Wie viel kostet die Übertragung von Vermögenswerten über Ketten hinweg über eine kettenübergreifende Brücke? In der Regel erheben Bridges eine feste oder variable Gebühr, die sich nach den Gaskosten und der Liquidität bestimmter Routen richtet. Es ist auch wichtig, die Kosteneffizienz einer Bridge auf der Grundlage des zur Gewährleistung ihrer Sicherheit erforderlichen Kapitals zu bewerten.

Grundlegend können Bridges in "trusted" und "trustless" Bridges unterteilt werden.

- **Vertrauenswürdig –** Vertrauenswürdige kettenübergreifende Brücken werden extern verifiziert. Sie verwenden eine externe Gruppe von Verifizierern (Gruppen mit Mehrsignatur, Mehrparteien-Rechensysteme, Orakelnetzwerke), um Daten über Ketten hinweg zu senden. Infolgedessen können sie eine hohe Konnektivität bieten und eine vollständig generalisierte Nachrichtenübermittlung über Chains hinweg ermöglichen. Sie zeichnen sich auch durch hohe Geschwindigkeit und Kosteneffizienz aus. Dies geht jedoch auf Kosten der Sicherheit, da die Benutzer sich auf die Sicherheit der Bridge verlassen müssen.
- **Vertrauenslos –** Diese kettenübergreifenden Brücken stützen sich auf die Blockchains, die sie verbinden, und deren Validatoren, um Nachrichten und Token zu übertragen. Sie sind "vertrauenslos", weil sie keine neuen Vertrauensannahmen (zusätzlich zu den Blockchains) hinzufügen. Folglich gelten trustless Bridges als sicherer als trusted Bridges.

Um trustless Bridges auf der Grundlage anderer Faktoren zu bewerten, müssen wir sie in "Generalized message passing bridges" und "Liquidity networks" unterteilen.

- **Generalisierte kettenübergreifende Brücken zur Nachrichtenübermittlung –** Diese kettenübergreifenden Brücken zeichnen sich durch Sicherheit und die Fähigkeit aus, komplexere Daten über Ketten hinweg zu übertragen. In der Regel sind sie auch sehr kosteneffizient. Diese Stärken gehen jedoch in der Regel auf Kosten der Konnektivität bei einfachen Client-Brücken (z. B. IBC) und der Geschwindigkeit bei optimistischen Brücken (z. B. Nomad), die Betrugsnachweise verwenden.
- **Liquiditätsnetzwerke –** Diese kettenübergreifenden Brücken verwenden atomare Swaps für die Übertragung von Vermögenswerten und sind lokal verifizierte Systeme (d. h. sie verwenden die Validatoren der zugrunde liegenden Blockchains, um Transaktionen zu verifizieren). Daher zeichnen sie sich durch Sicherheit und Geschwindigkeit aus. Außerdem gelten sie als vergleichsweise kostengünstig und bieten eine gute Konnektivität. Der größte Nachteil ist jedoch ihre Unfähigkeit, komplexere Daten zu übertragen, da sie keine cross-chain Nachrichtenübermittlung unterstützen.

## Risiken bei kettenübergreifenden Brücken {#risk-with-bridges}

Kettenübergreifende Brücken sind für die drei [größten Hacks in DeFi](https://rekt.news/leaderboard/) verantwortlich und befinden sich noch in einem frühen Entwicklungsstadium. Die Verwendung von Bridges birgt die folgenden Risiken:

- **Smart-Contract-Risiko –** Obwohl viele kettenübergreifende Brücken Audits erfolgreich bestanden haben, reicht ein einziger Fehler in einem Smart Contract aus, damit Vermögenswerte Hacks ausgesetzt sind (z. B. [Solanas Wormhole Bridge](https://rekt.news/wormhole-rekt/)).
- **Systemische finanzielle Risiken** – Viele kettenübergreifende Brücken verwenden Wrapped Assets, um kanonische Versionen des ursprünglichen Vermögenswerts auf einer neuen Kette zu prägen. Dies setzt das Ökosystem einem systemischen Risiko aus, da wir gesehen haben, wie gewrappte Versionen von Token ausgenutzt wurden.
- **Gegenparteirisiko –** Einige kettenübergreifende Brücken verwenden ein vertrauenswürdiges Design, bei dem sich Nutzer darauf verlassen müssen, dass die Validatoren nicht kollaborieren, um Nutzergelder zu stehlen. Da die Nutzer diesen Drittparteien vertrauen müssen, sind sie Risiken wie Absprachen, Zensur und anderen betrügerischen Aktivitäten ausgesetzt.
- **Offene Fragen –** Da sich kettenübergreifende Brücken in einem frühen Entwicklungsstadium befinden, gibt es viele unbeantwortete Fragen dazu, wie sich kettenübergreifende Brücken unter verschiedenen Marktbedingungen verhalten werden, wie z. B. bei Netzwerküberlastung und bei unvorhergesehenen Ereignissen wie Angriffen auf Netzwerkebene oder State Rollbacks. Diese Ungewissheit birgt gewisse Risiken, deren Ausmaß noch unbekannt ist.

## Wie können Dapps Brücken nutzen? {#how-can-dapps-use-bridges}

Hier sind einige praktische Anwendungen, die Entwickler bei der Integration von Brücken für ihre Cross-Chain-Dapps berücksichtigen können:

### Integration von kettenübergreifenden Brücken {#integrating-bridges}

Entwickler haben verschiedene Möglichkeiten, Bridges zu implementieren:

1. **Eine eigene kettenübergreifende Brücke bauen –** Der Bau einer sicheren und zuverlässigen kettenübergreifenden Brücke ist nicht einfach, besonders wenn man einen vertrauensminimierten Weg wählt. Dies erfordert umfangreiche Erfahrung und technisches Fachwissen in Bezug auf Skalierbarkeit und Interoperabilität. Zudem ist ein Team notwendig, das sich um die Wartung der Brücke kümmert und ausreichend Liquidität anzieht, um sie funktionsfähig zu machen.

2. **Nutzern mehrere Optionen für kettenübergreifende Brücken anzeigen –** Viele [Dapps](/developers/docs/dapps/) erfordern, dass Nutzer ihre nativen Token besitzen, um mit ihnen zu interagieren. Um den Nutzern den Zugriff auf ihre Token zu ermöglichen, können sie verschiedene Bridge-Optionen auf ihrer Plattform anbieten. Diese Methode ist jedoch eine schnelle Lösung und lenkt den Nutzer von der Dapp-Oberfläche weg, da er weiterhin mit anderen Dapps und Bridges interagieren muss. Dies kann zu einem umständlichen Onboarding-Erlebnis mit erhöhtem Fehlerpotenzial führen.

3. **Eine kettenübergreifende Brücke integrieren –** Diese Lösung erfordert nicht, dass die Dapp Nutzer an die externen Schnittstellen der kettenübergreifenden Brücke und DEX sendet. Sie ermöglicht es Dapps, das Onboarding-Erlebnis der Benutzer zu verbessern. Dieser Ansatz hat jedoch seine Grenzen:

   - Die Bewertung und Pflege von Bridges ist schwierig und zeitaufwändig.
   - Die Auswahl einer Bridge führt zu einem Single Point of Failure und zu Abhängigkeiten.
   - Die Dapp ist durch die Fähigkeiten der Bridge begrenzt.
   - Bridges allein reichen möglicherweise nicht aus. Dapps benötigen möglicherweise DEXs, um weitere Funktionen wie Cross-Chain-Swaps anzubieten.

4. **Mehrere kettenübergreifende Brücken integrieren –** Diese Lösung löst viele Probleme, die mit der Integration einer einzigen kettenübergreifenden Brücke verbunden sind. Sie hat jedoch auch ihre Grenzen, da die Integration mehrerer Bridges ressourcenintensiv ist und einen technischen und kommunikativen Mehraufwand für Entwickler bedeutet - die knappste Ressource in der Kryptowirtschaft.

5. **Einen Aggregator für kettenübergreifende Brücken integrieren –** Eine weitere Option für Dapps ist die Integration einer Aggregationslösung für kettenübergreifende Brücken, die ihnen Zugang zu mehreren kettenübergreifenden Brücken gibt. Bridge-Aggregatoren erben die Stärken aller Bridges und sind daher nicht durch die Fähigkeiten einer einzelnen Bridge eingeschränkt. Die Bridge-Aggregatoren übernehmen in der Regel die Wartung der Bridge-Integrationen und ersparen der App damit den Aufwand, sich um die technischen und betrieblichen Aspekte einer Bridge-Integration zu kümmern.

Abgesehen davon haben Bridge-Aggregatoren auch ihre Grenzen. So können sie zwar mehr Bridge-Optionen anbieten, aber auf dem Markt sind in der Regel viel mehr Bridges verfügbar als die, die auf der Plattform des Aggregators angeboten werden. Darüber hinaus sind Bridge-Aggregatoren, genau wie Bridges, auch Smart-Contract- und Technologierisiken ausgesetzt (mehr Smart Contracts = mehr Risiken).

Wenn eine Dapp den Weg der Integration einer Bridge oder eines Aggregators einschlägt, gibt es verschiedene Optionen, je nachdem, wie umfassend die Integration sein soll. Wenn es sich zum Beispiel nur um eine Front-End-Integration handelt, um das Onboarding-Erlebnis des Nutzers zu verbessern, würde eine Dapp das Widget integrieren. Wenn die Integration jedoch tiefergehende cross-chain Strategien wie Staking, Yield Farming usw. umfassen soll, integriert die Dapp das SDK oder die API.

### Eine Dapp auf mehreren Chains bereitstellen {#deploying-a-dapp-on-multiple-chains}

Um eine Dapp auf mehreren Chains bereitzustellen, können Entwickler Entwicklungsplattformen wie [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) usw. verwenden. Diese Plattformen verfügen in der Regel über modulare Plugins, mit denen Dapps cross-chain eingesetzt werden können. Zum Beispiel können Entwickler einen deterministischen Bereitstellungs-Proxy verwenden, der vom [hardhat-deploy-Plugin](https://github.com/wighawag/hardhat-deploy) angeboten wird.

#### Beispiele:

- [Wie man kettenübergreifende Dapps baut](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Aufbau eines kettenübergreifenden NFT-Marktplatzes](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Kettenübergreifende NFT-Dapps bauen](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Überwachung der Vertragsaktivität über Ketten hinweg {#monitoring-contract-activity-across-chains}

Zur Überwachung der chain-übergreifenden Contract-Aktivitäten können Entwickler Subgraphen und Entwicklerplattformen wie Tenderly verwenden, um Smart Contracts in Echtzeit zu beobachten. Solche Plattformen verfügen auch über Tools, die eine erweiterte Datenüberwachungsfunktionalität für kettenübergreifende Aktivitäten bieten, wie z. B. die Überprüfung von [Ereignissen, die von Verträgen ausgegeben werden](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), usw.

#### Tools

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Weiterführende Lektüre {#further-reading}

- [Blockchain-Brücken](/bridges/) – ethereum.org
- [L2Beat Bridge Risk Framework](https://l2beat.com/bridges/summary)
- [Blockchain-Brücken: Aufbau von Netzwerken aus Kryptonetzwerken](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8. Sep. 2021 – Dmitriy Berenzon
- [Das Interoperabilitäts-Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1. Okt. 2021 – Arjun Bhuptani
- [Cluster: Wie vertrauenswürdige und vertrauensminimierte kettenübergreifende Brücken die Multi-Chain-Landschaft gestalten](https://blog.celestia.org/clusters/) - 4. Okt. 2021 – Mustafa Al-Bassam
- [LI.FI: Bei kettenübergreifenden Brücken ist Vertrauen ein Spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28. Apr. 2022 – Arjun Chand
- [Der Stand der Rollup-Interoperabilitätslösungen](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20. Juni 2024 – Alex Hook
- [Nutzung gemeinsamer Sicherheit für sichere kettenübergreifende Interoperabilität: Lagrange State Committees und darüber hinaus](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12. Juni 2024 – Emmanuel Awosika

Zusätzlich finden Sie hier einige aufschlussreiche Präsentationen von [James Prestwich](https://twitter.com/_prestwich), die helfen können, ein tieferes Verständnis für kettenübergreifende Brücken zu entwickeln:

- [Brücken bauen, keine ummauerten Gärten](https://youtu.be/ZQJWMiX4hT0)
- [Brücken analysieren](https://youtu.be/b0mC-ZqN8Oo)
- [Warum brennen die Brücken](https://youtu.be/c7cm2kd20j8)
