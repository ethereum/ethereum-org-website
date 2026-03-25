---
title: "Einführung in Blockchain-Brücken"
description: "Kettenübergreifende Brücken ermöglichen es Benutzern, ihre Geldmittel über verschiedene Blockchains hinweg zu bewegen"
lang: de
---

# Blockchain-Brücken {#prerequisites}

_Web3 hat sich zu einem Ökosystem aus L1-Blockchains und L2-Skalierungslösungen entwickelt, die jeweils mit einzigartigen Fähigkeiten und Kompromissen entworfen wurden. Mit der steigenden Anzahl von Blockchain-Protokollen wächst auch die Nachfrage, Vermögenswerte über verschiedene Chains hinweg zu bewegen. Um diese Nachfrage zu befriedigen, benötigen wir kettenübergreifende Brücken._

<Divider />

## Was sind kettenübergreifende Brücken? {#what-are-bridges}

Blockchain-Brücken funktionieren genau wie die Brücken, die wir aus der physischen Welt kennen. So wie eine physische Brücke zwei physische Orte verbindet, verbindet eine Blockchain-Brücke zwei Blockchain-Ökosysteme. **Kettenübergreifende Brücken erleichtern die Kommunikation zwischen Blockchains durch die Übertragung von Informationen und Vermögenswerten**.

Betrachten wir ein Beispiel:

Sie kommen aus den USA und planen eine Reise nach Europa. Sie haben USD, benötigen aber EUR für Ihre Ausgaben. Um Ihre USD in EUR umzutauschen, können Sie gegen eine kleine Gebühr eine Wechselstube nutzen.

Aber was tun Sie, wenn Sie einen ähnlichen Tausch vornehmen möchten, um eine andere [Blockchain](/glossary/#blockchain) zu nutzen? Angenommen, Sie möchten [ETH](/glossary/#ether) im [Ethereum](/)-Mainnet gegen ETH auf [Arbitrum](https://arbitrum.io/) tauschen. Wie beim Währungstausch für EUR benötigen wir einen Mechanismus, um unsere ETH von Ethereum zu Arbitrum zu bewegen. Kettenübergreifende Brücken machen eine solche Transaktion möglich. In diesem Fall [verfügt Arbitrum über eine native Brücke](https://portal.arbitrum.io/bridge), die ETH vom Mainnet zu Arbitrum übertragen kann.

## Warum brauchen wir kettenübergreifende Brücken? {#why-do-we-need-bridges}

Alle Blockchains haben ihre Grenzen. Damit Ethereum skalieren und mit der Nachfrage Schritt halten kann, waren [Rollups](/glossary/#rollups) erforderlich. Alternativ sind L1s wie Solana und Avalanche anders konzipiert, um einen höheren Durchsatz zu ermöglichen, jedoch auf Kosten der Dezentralisierung.

Allerdings werden alle Blockchains in isolierten Umgebungen entwickelt und haben unterschiedliche Regeln und [Konsensmechanismen](/glossary/#consensus). Das bedeutet, dass sie nicht nativ kommunizieren können und Token sich nicht frei zwischen Blockchains bewegen können.

Kettenübergreifende Brücken existieren, um Blockchains zu verbinden und die Übertragung von Informationen und Token zwischen ihnen zu ermöglichen.

**Kettenübergreifende Brücken ermöglichen**:

- die kettenübergreifende Übertragung von Vermögenswerten und Informationen.
- [Dapps](/glossary/#dapp), auf die Stärken verschiedener Blockchains zuzugreifen – und so ihre Fähigkeiten zu verbessern (da Protokolle nun mehr Gestaltungsspielraum für Innovationen haben).
- Benutzern den Zugang zu neuen Plattformen und die Nutzung der Vorteile verschiedener Chains.
- Entwicklern aus verschiedenen Blockchain-Ökosystemen die Zusammenarbeit und den Aufbau neuer Plattformen für die Benutzer.

[So übertragen Sie Token über eine Brücke auf Ebene 2](/guides/how-to-use-a-bridge/)

<Divider />

## Anwendungsfälle für kettenübergreifende Brücken {#bridge-use-cases}

Im Folgenden finden Sie einige Szenarien, in denen Sie eine kettenübergreifende Brücke verwenden können:

### Niedrigere Transaktionsgebühren {#transaction-fees}

Angenommen, Sie haben ETH im Ethereum-Mainnet, möchten aber günstigere Transaktionsgebühren, um verschiedene Dapps zu erkunden. Indem Sie Ihre ETH über eine Brücke vom Mainnet zu einem Ethereum-L2-Rollup übertragen, können Sie von niedrigeren Transaktionsgebühren profitieren.

### Dapps auf anderen Blockchains {#dapps-other-chains}

Wenn Sie Aave im Ethereum-Mainnet verwendet haben, um USDT bereitzustellen, aber der Zinssatz, den Sie für die Bereitstellung von USDT über Aave auf Polygon erhalten können, höher ist.

### Blockchain-Ökosysteme erkunden {#explore-ecosystems}

Wenn Sie ETH im Ethereum-Mainnet haben und eine alternative L1 erkunden möchten, um deren native Dapps auszuprobieren. Sie können eine kettenübergreifende Brücke verwenden, um Ihre ETH vom Ethereum-Mainnet zur alternativen L1 zu übertragen.

### Eigene native Krypto-Vermögenswerte besitzen {#own-native}

Angenommen, Sie möchten nativen Bitcoin (BTC) besitzen, haben aber nur Geldmittel im Ethereum-Mainnet. Um auf Ethereum in BTC zu investieren, können Sie Wrapped Bitcoin (WBTC) kaufen. WBTC ist jedoch ein [ERC-20](/glossary/#erc-20)-Token, der im Ethereum-Netzwerk nativ ist, was bedeutet, dass es sich um eine Ethereum-Version von Bitcoin handelt und nicht um den ursprünglichen Vermögenswert auf der Bitcoin-Blockchain. Um nativen BTC zu besitzen, müssten Sie Ihre Vermögenswerte mithilfe einer kettenübergreifenden Brücke von Ethereum zu Bitcoin übertragen. Dadurch wird Ihr WBTC überbrückt und in nativen BTC umgewandelt. Alternativ besitzen Sie vielleicht BTC und möchten diesen in Ethereum-[DeFi](/glossary/#defi)-Protokollen verwenden. Dies würde eine Überbrückung in die andere Richtung erfordern, von BTC zu WBTC, der dann als Vermögenswert auf Ethereum verwendet werden kann.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Sie können all dies auch über eine [zentralisierte Börse](/get-eth) tun. Wenn sich Ihre Geldmittel jedoch nicht bereits auf einer Börse befinden, wären mehrere Schritte erforderlich, und Sie wären wahrscheinlich besser dran, eine kettenübergreifende Brücke zu verwenden.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Arten von kettenübergreifenden Brücken {#types-of-bridge}

Kettenübergreifende Brücken weisen viele Arten von Designs und Feinheiten auf. Im Allgemeinen fallen Brücken in zwei Kategorien: vertrauenswürdige (trusted) und vertrauenslose (trustless) Brücken.

| Vertrauenswürdige Brücken (Trusted Bridges)                                                                                                                                         | Vertrauenslose Brücken (Trustless Bridges)                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Vertrauenswürdige Brücken sind für ihren Betrieb auf eine zentrale Entität oder ein zentrales System angewiesen.                                                                            | Vertrauenslose Brücken arbeiten mit Smart Contracts und Algorithmen.                                        |
| Sie haben Vertrauensannahmen in Bezug auf die Verwahrung von Geldmitteln und die Sicherheit der Brücke. Benutzer verlassen sich meist auf den Ruf des Brückenbetreibers. | Sie sind vertrauenslos, d. h. die Sicherheit der Brücke entspricht der der zugrunde liegenden Blockchain. |
| Benutzer müssen die Kontrolle über ihre Krypto-Vermögenswerte aufgeben.                                                                                                   | Durch [Smart Contracts](/glossary/#smart-contract) ermöglichen vertrauenslose Brücken den Benutzern, die Kontrolle über ihre Geldmittel zu behalten.           |

Kurz gesagt können wir sagen, dass vertrauenswürdige Brücken Vertrauensannahmen haben, während vertrauenslose Brücken vertrauensminimiert sind und keine neuen Vertrauensannahmen über die der zugrunde liegenden Domänen hinaus treffen. So lassen sich diese Begriffe beschreiben:

- **Vertrauenslos (Trustless)**: Sie weisen eine gleichwertige Sicherheit wie die zugrunde liegenden Domänen auf. Wie von [Arjun Bhuptani in diesem Artikel](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) beschrieben.
- **Vertrauensannahmen (Trust assumptions):** Abkehr von der Sicherheit der zugrunde liegenden Domänen durch Hinzufügen externer Prüfer im System, wodurch es kryptoökonomisch weniger sicher wird.

Um ein besseres Verständnis für die Hauptunterschiede zwischen den beiden Ansätzen zu entwickeln, nehmen wir ein Beispiel:

Stellen Sie sich vor, Sie befinden sich an der Sicherheitskontrolle am Flughafen. Es gibt zwei Arten von Kontrollpunkten:

1. Manuelle Kontrollpunkte — betrieben von Beamten, die alle Details Ihres Tickets und Ihrer Identität manuell überprüfen, bevor sie die Bordkarte aushändigen.
2. Selbst-Check-in — betrieben von einem Automaten, in den Sie Ihre Flugdaten eingeben und die Bordkarte erhalten, wenn alles in Ordnung ist.

Ein manueller Kontrollpunkt ähnelt einem vertrauenswürdigen Modell, da er für seinen Betrieb von einer dritten Partei, d. h. den Beamten, abhängig ist. Als Benutzer vertrauen Sie darauf, dass die Beamten die richtigen Entscheidungen treffen und Ihre privaten Informationen korrekt verwenden.

Der Selbst-Check-in ähnelt einem vertrauenslosen Modell, da er die Rolle des Betreibers beseitigt und Technologie für seinen Betrieb nutzt. Benutzer behalten stets die Kontrolle über ihre Daten und müssen ihre privaten Informationen keiner dritten Partei anvertrauen.

Viele Brückenlösungen übernehmen Modelle zwischen diesen beiden Extremen mit unterschiedlichen Graden an Vertrauenslosigkeit.

<Divider />

## Kettenübergreifende Brücken nutzen {#use-bridge}

Die Verwendung von kettenübergreifenden Brücken ermöglicht es Ihnen, Ihre Vermögenswerte über verschiedene Blockchains hinweg zu bewegen. Hier sind einige Ressourcen, die Ihnen helfen können, Brücken zu finden und zu nutzen:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/summary)**: Eine umfassende Zusammenfassung verschiedener Brücken, einschließlich Details zu Marktanteil, Brückentyp und Ziel-Chains. L2BEAT bietet auch eine Risikoanalyse für Brücken, die Benutzern hilft, fundierte Entscheidungen bei der Auswahl einer Brücke zu treffen.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)**: Eine Zusammenfassung der Brückenvolumina über Ethereum-Netzwerke hinweg.

<Divider />

## Risiken bei der Nutzung von kettenübergreifenden Brücken {#bridge-risk}

Kettenübergreifende Brücken befinden sich in einem frühen Entwicklungsstadium. Es ist wahrscheinlich, dass das optimale Brückendesign noch nicht entdeckt wurde. Die Interaktion mit jeder Art von Brücke birgt Risiken:

- **Smart-Contract-Risiko —** das Risiko eines Fehlers im Code, der zum Verlust von Benutzergeldern führen kann
- **Technologierisiko —** Softwarefehler, fehlerhafter Code, menschliches Versagen, Spam und böswillige Angriffe können möglicherweise den Benutzerbetrieb stören

Da vertrauenswürdige Brücken zudem Vertrauensannahmen hinzufügen, bergen sie zusätzliche Risiken wie:

- **Zensurrisiko —** Brückenbetreiber können Benutzer theoretisch daran hindern, ihre Vermögenswerte über die Brücke zu übertragen
- **Verwahrungsrisiko —** Brückenbetreiber können sich absprechen, um die Geldmittel der Benutzer zu stehlen

Die Geldmittel der Benutzer sind gefährdet, wenn:

- ein Fehler im Smart Contract vorliegt
- der Benutzer einen Fehler macht
- die zugrunde liegende Blockchain gehackt wird
- die Brückenbetreiber bei einer vertrauenswürdigen Brücke böswillige Absichten haben
- die Brücke gehackt wird

Ein kürzlicher Hack betraf die Wormhole-Brücke von Solana, [bei dem während des Hacks 120.000 wETH (325 Millionen USD) gestohlen wurden](https://rekt.news/wormhole-rekt/). Viele der [größten Hacks bei Blockchains betrafen Brücken](https://rekt.news/leaderboard/).

Kettenübergreifende Brücken sind entscheidend für das Onboarding von Benutzern auf Ethereum-L2s und auch für Benutzer, die verschiedene Ökosysteme erkunden möchten. Angesichts der Risiken, die mit der Interaktion mit Brücken verbunden sind, müssen Benutzer jedoch die Kompromisse verstehen, die die Brücken eingehen. Dies sind einige [Strategien für kettenübergreifende Sicherheit](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Weiterführende Literatur {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) – _18. Juni 2022 – Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) – _5. Juli 2022 – Bartek Kiepuszewski_
- ["Why the future will be multi-chain, but it will not be cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) – _8. Januar 2022 – Vitalik Buterin_
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) – _12. Juni 2024 – Emmanuel Awosika_
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) – _20. Juni 2024 – Alex Hook_