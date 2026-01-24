---
title: Einführung in Blockchain-Brücken
description: Brücken erlauben es Benutzern, ihr Guthaben über verschiedene Blockchains zu verschieben
lang: de
---

# Blockchain-kettenübergreifende Brücken {#prerequisites}

_Web3 hat sich zu einem Ökosystem von L1 Blockchains und L2 Skalierungslösungen entwickelt, die jeweils mit einzigartigen Fähigkeiten und Gegenleistungen entwickelt wurden. Mit zunehmender Zahl der Blockchain-Protokolle steigt auch das Bedürfnis danach, Assets über Blockchains hinweg zu verschieben.Um diesem Bedürfnis gerecht zu werden, brauchen wir Brücken._

<Divider />

## Was sind Brücken? {#what-are-bridges}

Blockchain-Brücken funktionieren genau wie Brücken in der realen Welt. Genau wie eine Brücke zwei Orte in der realen Welt verbindet, verbindet eine Blockchain-Brücke zwei Blockchain-Ökosysteme. **Brücken vereinfachen die Kommunikation zwischen Blockchains durch die Übertragung von Informationen und Assets**.

Sehen wir uns ein Beispiel an:

Sie kommen aus den USA und planen eine Reise nach Europa. Sie haben USD aber benötigen zum Bezahlen EUR. Um Ihre USD in EUR umzutauschen, können Sie gegen eine geringe Gebühr einen Währungstausch durchführen.

Aber was machen Sie, wenn Sie einen ähnlichen Umtausch durchführen möchten, um eine andere [Blockchain](/glossary/#blockchain) zu benutzen? Angenommen, Sie möchten [ETH](/glossary/#ether) auf dem Ethereum Mainnet gegen ETH auf [Arbitrum](https://arbitrum.io/) tauschen. Genau wie der Währungstausch, den wir bei EUR durchgeführt haben, brauchen wir einen Mechanismus, um ETH von Ethereum zu Arbitrum umzutauschen. Brücken machen so eine Transaktion möglich. In diesem Fall hat [Arbitrum eine native kettenübergreifende Brücke](https://portal.arbitrum.io/bridge), die ETH vom Mainnet auf Arbitrum übertragen kann.

## Warum brauchen wir Brücken? {#why-do-we-need-bridges}

Alle Blockchains haben ihre Grenzen. Damit Ethereum skalieren und mit der Nachfrage Schritt halten kann, sind [Rollups](/glossary/#rollups) erforderlich. Alternativ sind L1s wie Solana und Avalanche anders konzipiert worden, um einen höheren Durchsatz zu ermöglichen. Dies geschieht aber auf Kosten der Dezentralität.

Allerdings werden alle Blockchains in isolierten Umgebungen entwickelt und haben unterschiedliche Regeln und [Konsens](/glossary/#consensus)mechanismen. Das bedeutet, dass sie in Ihrer Urform nicht miteinander kommunizieren können, und Token können sich nicht frei zwischen den Blockchains bewegen.

Brücken existieren, um Blockchains miteinander zu verbinden. Sie erlauben den Transfer von Informationen und Token zwischen den Blockchains.

**Brücken ermöglichen**:

- der Chain-übergreifende Transfer von Assets und Informationen.
- Ermöglicht [Dapps](/glossary/#dapp) den Zugriff auf die Stärken verschiedener Blockchains – wodurch ihre Fähigkeiten erweitert werden (da Protokolle jetzt mehr Gestaltungsspielraum für Innovationen haben).
- Benutzer können auf neue Plattformen zugreifen, und die Vorteile verschiedener Blockchains zu nutzen.
- Entwickler aus verschiedenen Blockchain-Ökosystemen können zusammenarbeiten, um neue Plattformen für die Benutzer zu erschaffen.

[Wie man Token auf Layer 2 überbrückt](/guides/how-to-use-a-bridge/)

<Divider />

## Anwendungsfälle von kettenübergreifenden Brücken {#bridge-use-cases}

Für die folgenden Szenarien können Brücken verwendet werden:

### Niedrigere Transaktionsgebühren {#transaction-fees}

Nehmen wir an, Sie haben ETH auf dem Ethereum-Hauptnetzwerk, wollen aber günstigere Transaktionsgebühren, um verschiedene dApps auszuprobieren. Wenn Sie Ihr ETH vom Hauptnetzwerk zu einem Ethereum L2 Rollup überbrücken, können Sie günstigere Transaktionsgebühren nutzen.

### Dapps auf anderen Blockchains {#dapps-other-chains}

Wenn Sie Aave im Ethereum Mainnet verwendet haben, um USDT bereitzustellen, der Zinssatz, den Sie möglicherweise für die Bereitstellung von USDT mit Aave auf Polygon erhalten, jedoch höher ist.

### Blockchain-Ökosysteme erkunden {#explore-ecosystems}

Wenn Sie ETH auf dem Ethereum-Hauptnetzwerk haben und ein alternatives L1 erkunden möchten, um dessen native dApps auszuprobieren. Sie können eine Brücke benutzen, um Ihr ETH vom Ethereum-Hauptnetzwerk auf die alternative L1 zu übertragen.

### Native Krypto-Vermögenswerte besitzen {#own-native}

Nehmen wir an, Sie möchten native Bitcoin (BTC) besitzen, aber Sie haben nur Geld auf dem Ethereum-Hauptnetzwerk. Um Bitcoin auf Ethereum zu besitzen, können Sie Wrapped Bitcoin (WBTC) kaufen. Allerdings ist WBTC ein [ERC-20](/glossary/#erc-20)-Token, der im Ethereum-Netzwerk heimisch ist, was bedeutet, dass es sich um eine Ethereum-Version von Bitcoin und nicht um den ursprünglichen Vermögenswert auf der Bitcoin-Blockchain handelt. Um ursprüngliche BTC zu besitzen, muss eine Brücke zwischen Ethereum und Bitcoin genutzt werden. Mit dieser Brücke lässt sich WBTC in ursprüngliche BTC umwandeln. Alternativ könnten Sie BTC besitzen und es in Ethereum-[DeFi](/glossary/#defi)-Protokollen verwenden wollen. Dann müssten Sie Ihre BTC in WBTC umwandeln, welche Sie dann als Vermögenswert in Ethereum nutzen können.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Sie können all das oben Genannte auch mithilfe einer [zentralisierten Börse](/get-eth). Wenn Ihr Guthaben jedoch nicht bereits auf einer Krypto-Börse ist, würde dies mehrere Schritte erfordern, und es wäre wahrscheinlich besser, eine Brücke zu benutzen.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Arten von kettenübergreifenden Brücken {#types-of-bridge}

Brücken haben viele Arten von Entwürfen und Verkomplizierungen. Im Allgemeinen fallen Brücken in zwei Kategorien: vertrauenswürdige und vertrauenslose Brücken.

| Vertrauenswürdige Brücken                                                                                                                                                             | Vertrauenslose Brücken                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vertrauenswürdige Brücken sind für ihre Operationen von einer zentralen Einheit oder einem zentralen System abhängig.                                                 | Vertrauenslose Brücken arbeiten mit intelligenten Verträgen und Algorithmen.                                                                                       |
| Sie haben Vertrauen in die Verwahrung der Mittel und die Sicherheit der Brücke. Die Benutzer sind meist auf den Ruf des Brückenbetreibers angewiesen. | Sie sind vertrauenslos, d. h. die Sicherheit der Brücke ist die gleiche wie die der zugrunde liegenden Blockchain.                 |
| Benutzer müssen die Kontrolle über ihre Krypto-Assets aufgeben.                                                                                                       | Durch [Smart Contracts](/glossary/#smart-contract) ermöglichen vertrauenslose kettenübergreifende Brücken den Nutzern, die Kontrolle über ihre Gelder zu behalten. |

Kurz gesagt, wir können sagen, dass vertrauenswürdige Brücken auf Vertrauensannahmen beruhen, während vertrauenslose Brücken vertraulich minimiert werden und keine neuen Vertrauensannahmen treffen, die über die der zugrunde liegenden Domain hinausgehen. So können diese Begriffe beschrieben werden:

- **Vertrauenslos**: gleiche Sicherheit wie die zugrunde liegenden Domains. Wie von [Arjun Bhuptani in diesem Artikel beschrieben.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Vertrauensannahmen:** Abkehr von der Sicherheit der zugrunde liegenden Domains durch Hinzufügen externer Prüfer zum System, wodurch es krypto-ökonomisch weniger sicher wird.

Um ein besseres Verständnis der wichtigsten Unterschiede zwischen den beiden Ansätzen zu entwickeln, betrachten wir ein Beispiel:

Stellen Sie sich vor, Sie sind am Sicherheitskontrollpunkt eines Flughafens. Es gibt zwei Arten von Kontrollpunkten:

1. Manuelle Checkpoints – betrieben von Beamten, die alle Details Ihres Tickets und Ihrer Identität vor der Übergabe der Bordkarte manuell überprüfen.
2. Self Check-In — betrieben von einer Maschine, in der Sie Ihre Flugdaten eintragen und die Bordkarte erhalten, wenn alles korrekt ist.

Ein manueller Checkpoint ist ähnlich wie ein vertrauenswürdiges Modell, da sein Funktionieren von einer Drittpartei, z. B. den Officials, abhängig ist. Als Benutzer vertrauen Sie den Beamten, die richtigen Entscheidungen zu treffen und Ihre persönlichen Daten korrekt zu verwenden.

Self Check-in ist ähnlich einem vertrauenslosen Modell, da es die Rolle des Betreibers entfernt und die Technologie für seine Operationen verwendet. Benutzer behalten immer die Kontrolle über ihre Daten und müssen Dritten keine privaten Informationen anvertrauen.

Viele Brückenlösungen übernehmen Modelle zwischen diesen beiden Extremen mit unterschiedlichem Grad an Vertrauenslosigkeit.

<Divider />

## Kettenübergreifende Brücken verwenden {#use-bridge}

Durch die Verwendung von Brücken können Sie Ihre Vermögenswerte über verschiedene Blockchains hinweg verschieben. Hier sind einige Ressourcen, die Ihnen beim Finden und Verwenden von Brücken helfen können:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/summary)**: Eine umfassende Zusammenfassung verschiedener kettenübergreifender Brücken, einschließlich Details zu Marktanteil, Typ der kettenübergreifenden Brücke und Zielketten. L2BEAT verfügt außerdem über eine Risikoanalyse für Brücken, die den Benutzern hilft, fundierte Entscheidungen bei der Auswahl einer Brücke zu treffen.
- **[DefiLlama Zusammenfassung der kettenübergreifenden Brücken](https://defillama.com/bridges/Ethereum)**: Eine Zusammenfassung der Volumen von kettenübergreifenden Brücken in den Ethereum-Netzwerken.

<Divider />

## Risiken bei der Verwendung von kettenübergreifenden Brücken {#bridge-risk}

Brücken befinden sich in der Anfangsphase der Entwicklung. Es ist wahrscheinlich, dass das optimale Brückenkonzept noch nicht entdeckt wurde. Die Interaktion mit jeder Art von Brücke birgt eine gewisse Gefahr:

- **Smart-Contract-Risiko —** das Risiko eines Fehlers im Code, durch den Nutzergelder verloren gehen können.
- **Technologierisiko —** Softwarefehler, fehlerhafter Code, menschlicher Fehler, Spam und böswillige Angriffe können möglicherweise Benutzeroperationen stören.

Und da vertrauenswürdige Brücken Vertrauensannahmen hinzufügen, tragen sie zusätzliche Risiken wie:

- **Zensurrisiko —** Betreiber von kettenübergreifenden Brücken können Nutzer theoretisch daran hindern, ihre Vermögenswerte über die kettenübergreifende Brücke zu übertragen.
- **Verwahrungsrisiko —** Betreiber von kettenübergreifenden Brücken können kollaborieren, um die Gelder der Nutzer zu stehlen.

Das Guthaben des Benutzers ist gefährdet, wenn:

- es einen Fehler im Smart Contract gibt
- der Benutzer einen Fehler macht
- die zugrunde liegende Blockchain gehackt wurde
- die Brückenbetreiber böswillige Absichten in einer vertrauenswürdigen Brücke haben
- die Brücke gehackt wird

Ein aktueller Hack war der der Wormhole-Brücke von Solana, [bei dem 120k wETH (325 Mio. USD) gestohlen wurden](https://rekt.news/wormhole-rekt/). Viele der [größten Hacks in Blockchains betrafen kettenübergreifende Brücken](https://rekt.news/leaderboard/).

Brücken sind von entscheidender Bedeutung für Benutzer, die Ethereum L2s und sogar verschiedene Ökosysteme erkunden wollen. Angesichts der Risiken, die mit der Interaktion mit Brücken verbunden sind, müssen die Benutzer jedoch verstehen, welche Kompromisse die Brücken eingehen. Dies sind einige [Strategien für die Cross-Chain-Sicherheit](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Weiterführende Lektüre {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18. Juni 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5. Juli 2022 - Bartek Kiepuszewski_
- ["Why the future will be multi-chain, but it will not be cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8. Januar 2022 - Vitalik Buterin_
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12. Juni 2024 - Emmanuel Awosika_
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20. Juni 2024 - Alex Hook_

