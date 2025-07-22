---
title: Einführung in Blockchain-Brücken
description: Brücken erlauben es Benutzern, ihr Guthaben über verschiedene Blockchains zu verschieben
lang: de
---

# Blockchain-Brücken {#prerequisites}

_Web3 hat sich zu einem Ökosystem von L1 Blockchains und L2 Skalierungslösungen entwickelt, die jeweils mit einzigartigen Fähigkeiten und Gegenleistungen entwickelt wurden. Mit zunehmender Zahl der Blockchain-Protokolle steigt auch das Bedürfnis danach, Assets über Blockchains hinweg zu verschieben. Um diesem Bedürfnis gerecht zu werden, brauchen wir Brücken._

<Divider />

## Was sind Brücken? {#what-are-bridges}

Blockchain-Brücken funktionieren genau wie Brücken in der realen Welt. Genau wie eine Brücke zwei Orte in der realen Welt verbindet, verbindet eine Blockchain-Brücke zwei Blockchain-Ökosysteme. **Brücken vereinfachen die Kommunikation zwischen Blockchains durch die Übertragung von Informationen und Assets**.

Sehen wir uns ein Beispiel an:

Sie kommen aus den USA und planen eine Reise nach Europa. Sie haben USD aber benötigen zum Bezahlen EUR. Um Ihre USD in EUR umzutauschen, können Sie gegen eine geringe Gebühr einen Währungstausch durchführen.

Aber was tun Sie, wenn Sie einen ähnlichen Austausch durchführen möchten, um eine andere [Blockchain](/glossary/#blockchain) zu benutzen? Angenommen, Sie möchten [ETH](/glossary/#ether) auf dem Ethereum Mainnet gegen ETH auf [Arbitrum](https://arbitrum.io/) tauschen. Genau wie der Währungstausch, den wir bei EUR durchgeführt haben, brauchen wir einen Mechanismus, um ETH von Ethereum zu Arbitrum umzutauschen. Brücken machen so eine Transaktion möglich. In diesem Fall hat [Arbitrum eine lokale Brücke](https://bridge.arbitrum.io/), welche ETH vom Hauptnetzwerk zu Arbitrum transferieren kann.

## Warum brauchen wir Brücken? {#why-do-we-need-bridges}

Alle Blockchains haben ihre Grenzen. Damit Ethereum mit der Nachfrage mithalten und skalieren kann, sind [Rollups](/glossary/#rollups) erforderlich. Alternativ sind L1s wie Solana und Avalanche anders konzipiert worden, um einen höheren Durchsatz zu ermöglichen. Dies geschieht aber auf Kosten der Dezentralität.

Jedoch entwickeln sich alle Blockchains in isolierten Umgebungen und haben verschiedene Regeln und [Konsens](/glossary/#consensus)-Mechanismen. Das bedeutet, dass sie in Ihrer Urform nicht miteinander kommunizieren können, und Token können sich nicht frei zwischen den Blockchains bewegen.

Brücken existieren, um Blockchains miteinander zu verbinden. Sie erlauben den Transfer von Informationen und Token zwischen den Blockchains.

**Brücken ermöglichen**:

- der Chain-übergreifende Transfer von Assets und Informationen.
- den Zugriff auf die Stärken verschiedener Blockchains durch [DApps](/glossary/#dapp) – wodurch sich ihre Fähigkeiten verbessern (da Protokolle nun mehr Gestaltungsspielraum für Innovationen haben).
- Benutzer können auf neue Plattformen zugreifen, und die Vorteile verschiedener Blockchains zu nutzen.
- Entwickler aus verschiedenen Blockchain-Ökosystemen können zusammenarbeiten, um neue Plattformen für die Benutzer zu erschaffen.

[Wie man Token auf die Layer 2 überträgt](/guides/how-to-use-a-bridge/)

<Divider />

## Anwendungsfälle für Brücken {#bridge-use-cases}

Für die folgenden Szenarien können Brücken verwendet werden:

### Niedrigere Transaktionsgebühren {#transaction-fees}

Nehmen wir an, Sie haben ETH auf dem Ethereum-Hauptnetzwerk, wollen aber günstigere Transaktionsgebühren, um verschiedene dApps auszuprobieren. Wenn Sie Ihr ETH vom Hauptnetzwerk zu einem Ethereum L2 Rollup überbrücken, können Sie günstigere Transaktionsgebühren nutzen.

### dApps auf anderen Blockchains {#dapps-other-chains}

Wenn Sie Aave auf dem Ethereum-Hauptnetzwerk verwenden, um USDT zu leihen, aber der Zinssatz für USDT mit Aave auf Polygon höher ist.

### Entdecken Sie Blockchain-Ökosysteme {#explore-ecosystems}

Wenn Sie ETH auf dem Ethereum-Hauptnetzwerk haben und ein alternatives L1 erkunden möchten, um dessen native dApps auszuprobieren. Sie können eine Brücke benutzen, um Ihr ETH vom Ethereum-Hauptnetzwerk auf die alternative L1 zu übertragen.

### Erhalten Sie native Krypto-Vermögenswerte {#own-native}

Nehmen wir an, Sie möchten native Bitcoin (BTC) besitzen, aber Sie haben nur Geld auf dem Ethereum-Hauptnetzwerk. Um Bitcoin auf Ethereum zu besitzen, können Sie Wrapped Bitcoin (WBTC) kaufen. Jedoch ist WBTC ein [ERC-20](/glossary/#erc-20)-Token, das im Ethereum-Netzwerk nativ ist, d. h. es ist eine Ethereum-Version von Bitcoin und nicht das originale Asset auf der Bitcoin-Blockchain. Um ursprüngliche BTC zu besitzen, muss eine Brücke zwischen Ethereum und Bitcoin genutzt werden. Mit dieser Brücke lässt sich WBTC in ursprüngliche BTC umwandeln. Alternativ besitzen Sie vielleicht BTC und möchten diese in Ethereum-[DeFi](/glossary/#defi)-Protokollen nutzen. Dann müssten Sie Ihre BTC in WBTC umwandeln, welche Sie dann als Vermögenswert in Ethereum nutzen können.

<InfoBanner shouldCenter emoji=":bulb:">
  Sie können all dies auch mit <a href="/get-eth/">zentralisierten Krypto-Börsen</a> tun. Wenn Ihr Guthaben jedoch nicht bereits auf einer Krypto-Börse ist, würde dies mehrere Schritte erfordern, und es wäre wahrscheinlich besser, eine Brücke zu benutzen.
</InfoBanner>

<Divider />

## Arten von Brücken {#types-of-bridge}

Brücken haben viele Arten von Entwürfen und Verkomplizierungen. Im Allgemeinen fallen Brücken in zwei Kategorien: vertrauenswürdige und vertrauenslose Brücken.

| Vertrauenswürdige Brücken                                                                                                                             | Vertrauenslose Brücken                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vertrauenswürdige Brücken sind für ihre Operationen von einer zentralen Einheit oder einem zentralen System abhängig.                                 | Vertrauenslose Brücken arbeiten mit intelligenten Verträgen und Algorithmen.                                                                      |
| Sie haben Vertrauen in die Verwahrung der Mittel und die Sicherheit der Brücke. Die Benutzer sind meist auf den Ruf des Brückenbetreibers angewiesen. | Sie sind vertrauenslos, d. h. die Sicherheit der Brücke ist die gleiche wie die der zugrunde liegenden Blockchain.                                |
| Benutzer müssen die Kontrolle über ihre Krypto-Assets aufgeben.                                                                                       | Vertrauenslose Brücken ermögliches es Nutzern via [Smart Contracts](/glossary/#smart-contract), die Kontrolle über ihre Finanzmittel zu behalten. |

Kurz gesagt, wir können sagen, dass vertrauenswürdige Brücken auf Vertrauensannahmen beruhen, während vertrauenslose Brücken vertraulich minimiert werden und keine neuen Vertrauensannahmen treffen, die über die der zugrunde liegenden Domain hinausgehen. So können diese Begriffe beschrieben werden:

- **Vertrauenslos**: äquivalente Sicherheit zu den zugrunde liegenden Domains. Wie von [Arjun Bhuptani in diesem Artikel beschrieben.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Vertrauensannahmen:** weg von der Sicherheit der zugrunde liegenden Domains durch Hinzufügen externer Prüfer im System und somit weniger krypto-ökonomisch sicher.

Um ein besseres Verständnis der wichtigsten Unterschiede zwischen den beiden Ansätzen zu entwickeln, betrachten wir ein Beispiel:

Stellen Sie sich vor, Sie sind am Sicherheitskontrollpunkt eines Flughafens. Es gibt zwei Arten von Kontrollpunkten:

1. Manuelle Checkpoints – betrieben von Beamten, die alle Details Ihres Tickets und Ihrer Identität vor der Übergabe der Bordkarte manuell überprüfen.
2. Self Check-In — betrieben von einer Maschine, in der Sie Ihre Flugdaten eintragen und die Bordkarte erhalten, wenn alles korrekt ist.

Ein manueller Checkpoint ist ähnlich wie ein vertrauenswürdiges Modell, da sein Funktionieren von einer Drittpartei, z. B. den Officials, abhängig ist. Als Benutzer vertrauen Sie den Beamten, die richtigen Entscheidungen zu treffen und Ihre persönlichen Daten korrekt zu verwenden.

Self Check-in ist ähnlich einem vertrauenslosen Modell, da es die Rolle des Betreibers entfernt und die Technologie für seine Operationen verwendet. Benutzer behalten immer die Kontrolle über ihre Daten und müssen Dritten keine privaten Informationen anvertrauen.

Viele Brückenlösungen übernehmen Modelle zwischen diesen beiden Extremen mit unterschiedlichem Grad an Vertrauenslosigkeit.

<Divider />

## Risiken von Brücken {#bridge-risk}

Brücken befinden sich in der Anfangsphase der Entwicklung. Es ist wahrscheinlich, dass das optimale Brückenkonzept noch nicht entdeckt wurde. Die Interaktion mit jeder Art von Brücke birgt eine gewisse Gefahr:

- **Smart-Contract-Risiko —** das Risiko eines Fehlers im Code, sodass Benutzergelder verloren gehen könnten
- **Technologierisiko —** Softwarefehler, fehlerhafter Code, menschlicher Fehler, Spam und böswillige Angriffe können möglicherweise Benutzeroperationen stören

Und da vertrauenswürdige Brücken Vertrauensannahmen hinzufügen, tragen sie zusätzliche Risiken wie:

- **Zensurrisiko —** Brückenbetreiber können Benutzer theoretisch daran hindern, ihre Vermögenswerte über die Brücke zu übertragen
- **Verwahrungsrisiko —** Brückenbetreiber können sich zusammentun, um die Gelder der Benutzer zu stehlen

Das Guthaben des Benutzers ist gefährdet, wenn:

- es einen Fehler im Smart Contract gibt
- der Benutzer einen Fehler macht
- die zugrunde liegende Blockchain gehackt wurde
- die Brückenbetreiber böswillige Absichten in einer vertrauenswürdigen Brücke haben
- die Brücke gehackt wird

Ein kürzlicher Hack war der von Solanas Wormhole-Brücke, [wo 120T wETH (325 Millionen USD) während des Angriffs gestolen wurden](https://rekt.news/wormhole-rekt/). Bei vielen der [größten Blockchain-Hacks waren Brücken involviert](https://rekt.news/leaderboard/).

Brücken sind von entscheidender Bedeutung für Benutzer, die Ethereum L2s und sogar verschiedene Ökosysteme erkunden wollen. Angesichts der Risiken, die mit der Interaktion mit Brücken verbunden sind, müssen die Benutzer jedoch verstehen, welche Kompromisse die Brücken eingehen. Dies sind einige [Strategien für die Crosschain-Sicherheit](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Weiterführende Informationen {#further-reading}

- [EIP-5164: Cross-Chain-Ausführung](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18. Juni 2022 - Brendan Asselstine_
- [L2Bridge Risiko-Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5. Juli 2022 - Bartek Kiepuszewski_
- [„Warum die Zukunft eine Multi-Chain, aber keine Cross-Chain sein wird."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8. Januar 2022 - Vitalik Buterin_
