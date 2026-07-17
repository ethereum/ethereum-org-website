---
title: Blockchain-Brücken
metaTitle: Einführung in Blockchain-Brücken
description: Brücken ermöglichen es Benutzern, ihre Gelder über verschiedene Blockchains hinweg zu bewegen
lang: de
---

_Web3 hat sich zu einem Ökosystem aus Layer-1-Blockchains (L1) und Layer-2-Skalierungslösungen (L2) entwickelt, die jeweils mit einzigartigen Fähigkeiten und Kompromissen entworfen wurden. Mit der steigenden Anzahl von Blockchain-Protokollen wächst auch die Nachfrage, Vermögenswerte kettenübergreifend zu bewegen. Um diese Nachfrage zu erfüllen, benötigen wir Brücken._

<Divider />

## Was sind Brücken? {#what-are-bridges}

Blockchain-Brücken funktionieren genau wie die Brücken, die wir in der physischen Welt kennen. So wie eine physische Brücke zwei physische Orte verbindet, verbindet eine Blockchain-Brücke zwei Blockchain-Ökosysteme. **Brücken erleichtern die Kommunikation zwischen Blockchains durch den Transfer von Informationen und Vermögenswerten**.

Betrachten wir ein Beispiel:

Sie kommen aus den USA und planen eine Reise nach Europa. Sie haben USD, benötigen aber EUR zum Ausgeben. Um Ihre USD in EUR umzutauschen, können Sie gegen eine kleine Gebühr eine Wechselstube nutzen.

Aber was tun Sie, wenn Sie einen ähnlichen Tausch vornehmen möchten, um eine andere [Blockchain](/glossary/#blockchain) zu nutzen? Nehmen wir an, Sie möchten [ETH](/glossary/#ether) im [Ethereum Mainnet](/) gegen ETH auf [Arbitrum](https://arbitrum.io/) tauschen. Wie beim Währungstausch für EUR benötigen wir einen Mechanismus, um unsere ETH von Ethereum zu Arbitrum zu bewegen. Brücken machen eine solche Transaktion möglich. In diesem Fall [verfügt Arbitrum über eine native Brücke](https://portal.arbitrum.io/bridge), die ETH vom Mainnet auf Arbitrum transferieren kann.

## Warum brauchen wir Brücken? {#why-do-we-need-bridges}

Alle Blockchains haben ihre Grenzen. Damit Ethereum skalieren und mit der Nachfrage Schritt halten kann, waren [Rollups](/glossary/#rollups) erforderlich. Alternativ sind Layer 1 (L1) wie Solana und Avalanche anders konzipiert, um einen höheren Transaktionsdurchsatz zu ermöglichen, jedoch auf Kosten der Dezentralisierung.

Allerdings werden alle Blockchains in isolierten Umgebungen entwickelt und haben unterschiedliche Regeln und [Konsens](/glossary/#consensus)-Mechanismen. Das bedeutet, dass sie nicht nativ kommunizieren können und Token sich nicht frei zwischen Blockchains bewegen können.

Brücken existieren, um Blockchains zu verbinden und den Transfer von Informationen und Token zwischen ihnen zu ermöglichen.

**Brücken ermöglichen**:

- den kettenübergreifenden Transfer von Vermögenswerten und Informationen.
- [Dezentralen Anwendungen (Dapps)](/glossary/#dapp), auf die Stärken verschiedener Blockchains zuzugreifen – und so ihre Fähigkeiten zu verbessern (da Protokolle nun mehr Gestaltungsspielraum für Innovationen haben).
- Benutzern den Zugang zu neuen Plattformen und die Nutzung der Vorteile verschiedener Chains.
- Entwicklern aus verschiedenen Blockchain-Ökosystemen die Zusammenarbeit und den Aufbau neuer Plattformen für die Benutzer.

[Wie man Token auf Layer 2 (L2) überbrückt](/guides/how-to-use-a-bridge/)

<Divider />

## Anwendungsfälle für Brücken {#bridge-use-cases}

Im Folgenden finden Sie einige Szenarien, in denen Sie eine Brücke nutzen können:

### Niedrigere Transaktionsgebühren {#transaction-fees}

Nehmen wir an, Sie haben ETH im Ethereum Mainnet, möchten aber günstigere Transaktionsgebühren, um verschiedene Dapps zu erkunden. Indem Sie Ihre ETH vom Mainnet zu einem Ethereum-L2-Rollup überbrücken, können Sie von niedrigeren Transaktionsgebühren profitieren.

### Dapps auf anderen Blockchains {#dapps-other-chains}

Wenn Sie Aave im Ethereum Mainnet genutzt haben, um USDT bereitzustellen, aber der Zinssatz, den Sie für die Bereitstellung von USDT über Aave auf Polygon erhalten könnten, höher ist.

### Blockchain-Ökosysteme erkunden {#explore-ecosystems}

Wenn Sie ETH im Ethereum Mainnet haben und eine alternative Layer 1 (L1) erkunden möchten, um deren native Dapps auszuprobieren. Sie können eine Brücke nutzen, um Ihre ETH vom Ethereum Mainnet zur alternativen L1 zu transferieren.

### Eigene native Krypto-Vermögenswerte besitzen {#own-native}

Nehmen wir an, Sie möchten nativen Bitcoin (BTC) besitzen, haben aber nur Gelder im Ethereum Mainnet. Um auf Ethereum in BTC zu investieren, können Sie Wrapped Bitcoin (WBTC) kaufen. WBTC ist jedoch ein [ERC-20](/glossary/#erc-20)-Token, der im Ethereum-Netzwerk nativ ist, was bedeutet, dass es sich um eine Ethereum-Version von Bitcoin handelt und nicht um den ursprünglichen Vermögenswert auf der Bitcoin-Blockchain. Um nativen BTC zu besitzen, müssten Sie Ihre Vermögenswerte mithilfe einer Brücke von Ethereum zu Bitcoin transferieren. Dies überbrückt Ihren WBTC und wandelt ihn in nativen BTC um. Alternativ besitzen Sie vielleicht BTC und möchten diesen in [Dezentralisierten Finanzen (DeFi)](/glossary/#defi)-Protokollen auf Ethereum nutzen. Dies würde eine Überbrückung in die andere Richtung erfordern, von BTC zu WBTC, der dann als Vermögenswert auf Ethereum verwendet werden kann.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Sie können all dies auch über eine [zentralisierte Börse](/get-eth) tun. Wenn sich Ihre Gelder jedoch nicht bereits auf einer Börse befinden, würde dies mehrere Schritte erfordern, und Sie wären wahrscheinlich besser dran, eine Brücke zu nutzen.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Arten von Brücken {#types-of-bridge}

Brücken weisen viele Arten von Designs und Feinheiten auf. Im Allgemeinen fallen Brücken in zwei Kategorien: vertrauensbasierte (trusted) und vertrauenslose (trustless) Brücken.

| Vertrauensbasierte Brücken                                                                                                                                         | Vertrauenslose Brücken                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Vertrauensbasierte Brücken sind für ihren Betrieb von einer zentralen Entität oder einem zentralen System abhängig.                                                                            | Vertrauenslose Brücken arbeiten mit Smart Contracts und Algorithmen.                                        |
| Sie haben Vertrauensannahmen in Bezug auf die Verwahrung von Geldern und die Sicherheit der Brücke. Benutzer verlassen sich meist auf den Ruf des Brückenbetreibers. | Sie sind vertrauenslos, d. h. die Sicherheit der Brücke entspricht der der zugrunde liegenden Blockchain. |
| Benutzer müssen die Kontrolle über ihre Krypto-Vermögenswerte abgeben.                                                                                                   | Durch [Smart Contracts](/glossary/#smart-contract) ermöglichen vertrauenslose Brücken den Benutzern, die Kontrolle über ihre Gelder zu behalten.           |

Kurz gesagt können wir sagen, dass vertrauensbasierte Brücken Vertrauensannahmen haben, während vertrauenslose Brücken vertrauensminimiert sind und keine neuen Vertrauensannahmen über die der zugrunde liegenden Domänen hinaus treffen. So lassen sich diese Begriffe beschreiben:

- **Vertrauenslos**: Sie weisen eine gleichwertige Sicherheit wie die zugrunde liegenden Domänen auf. Wie von [Arjun Bhuptani in diesem Artikel beschrieben.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Vertrauensannahmen:** Abkehr von der Sicherheit der zugrunde liegenden Domänen durch das Hinzufügen externer Verifizierer im System, wodurch es kryptoökonomisch weniger sicher wird.

Um ein besseres Verständnis für die Hauptunterschiede zwischen den beiden Ansätzen zu entwickeln, nehmen wir ein Beispiel:

Stellen Sie sich vor, Sie befinden sich am Sicherheits-Checkpoint am Flughafen. Es gibt zwei Arten von Checkpoints:

1. Manuelle Checkpoints — betrieben von Beamten, die alle Details Ihres Tickets und Ihrer Identität manuell überprüfen, bevor sie Ihnen die Bordkarte aushändigen.
2. Self-Check-in — betrieben von einem Automaten, an dem Sie Ihre Flugdaten eingeben und die Bordkarte erhalten, wenn alles in Ordnung ist.

Ein manueller Checkpoint ähnelt einem vertrauensbasierten Modell, da er für seinen Betrieb von einer dritten Partei, d. h. den Beamten, abhängig ist. Als Benutzer vertrauen Sie darauf, dass die Beamten die richtigen Entscheidungen treffen und Ihre privaten Informationen korrekt verwenden.

Der Self-Check-in ähnelt einem vertrauenslosen Modell, da er die Rolle des Betreibers eliminiert und Technologie für seinen Betrieb nutzt. Benutzer behalten stets die Kontrolle über ihre Daten und müssen ihre privaten Informationen keiner dritten Partei anvertrauen.

Viele Brückenlösungen übernehmen Modelle zwischen diesen beiden Extremen mit unterschiedlichen Graden an Vertrauenslosigkeit.

<Divider />

## Brücken nutzen {#use-bridge}

Die Nutzung von Brücken ermöglicht es Ihnen, Ihre Vermögenswerte über verschiedene Blockchains hinweg zu bewegen. Hier sind einige Ressourcen, die Ihnen helfen können, Brücken zu finden und zu nutzen:

- **[L2BEAT-Brückenzusammenfassung](https://l2beat.com/bridges/summary) & [L2BEAT-Brückenrisikoanalyse](https://l2beat.com/bridges/summary)**: Eine umfassende Zusammenfassung verschiedener Brücken, einschließlich Details zu Marktanteil, Brückentyp und Ziel-Chains. L2BEAT bietet auch eine Risikoanalyse für Brücken, die Benutzern hilft, fundierte Entscheidungen bei der Auswahl einer Brücke zu treffen.
- **[DefiLlama-Brückenzusammenfassung](https://defillama.com/bridges/Ethereum)**: Eine Zusammenfassung der Brückenvolumina über Ethereum-Netzwerke hinweg.

<Divider />

## Risiken bei der Nutzung von Brücken {#bridge-risk}

Brücken befinden sich in einem frühen Entwicklungsstadium. Es ist wahrscheinlich, dass das optimale Brückendesign noch nicht entdeckt wurde. Die Interaktion mit jeder Art von Brücke birgt Risiken:

- **Smart-Contract-Risiko —** das Risiko eines Fehlers im Code, der zum Verlust von Benutzergeldern führen kann
- **Technologierisiko —** Softwareausfälle, fehlerhafter Code, menschliches Versagen, Spam und böswillige Angriffe können möglicherweise die Abläufe der Benutzer stören

Da vertrauensbasierte Brücken zudem Vertrauensannahmen hinzufügen, bergen sie zusätzliche Risiken wie:

- **Zensurrisiko —** Brückenbetreiber können Benutzer theoretisch daran hindern, ihre Vermögenswerte über die Brücke zu transferieren
- **Verwahrungsrisiko —** Brückenbetreiber können sich absprechen, um die Gelder der Benutzer zu stehlen

Die Gelder der Benutzer sind gefährdet, wenn:

- es einen Fehler im Smart Contract gibt
- der Benutzer einen Fehler macht
- die zugrunde liegende Blockchain gehackt wird
- die Brückenbetreiber bei einer vertrauensbasierten Brücke böswillige Absichten haben
- die Brücke gehackt wird

Ein kürzlicher Hack betraf die Wormhole-Brücke von Solana, [bei dem während des Hacks 120.000 wETH (325 Millionen USD) gestohlen wurden](https://rekt.news/wormhole-rekt/). Viele der [größten Hacks bei Blockchains betrafen Brücken](https://rekt.news/leaderboard/).

Brücken sind entscheidend für das Onboarding von Benutzern auf Ethereum Layer 2 (L2) und auch für Benutzer, die verschiedene Ökosysteme erkunden möchten. Angesichts der Risiken, die mit der Interaktion mit Brücken verbunden sind, müssen Benutzer jedoch die Kompromisse verstehen, die die Brücken eingehen. Dies sind einige [Strategien für kettenübergreifende Sicherheit](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Weiterführende Literatur {#further-reading}
- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18. Juni 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5. Juli 2022 - Bartek Kiepuszewski_
- [„Why the future will be multi-chain, but it will not be cross-chain.“](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8. Januar 2022 - Vitalik Buterin_
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12. Juni 2024 - Emmanuel Awosika_
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20. Juni 2024 - Alex Hook_