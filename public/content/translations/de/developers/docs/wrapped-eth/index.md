---
title: Was ist „Wrapped Ether“ (WETH)
description: Eine Einführung in Wrapped Ether (WETH) – ein ERC20-kompatibler Wrapper für Ether (ETH).
lang: de
---

# Wrapped Ether (WETH) {#intro-to-weth}

Ether (ETH) ist die Hauptwährung von Ethereum. Es wird für verschiedene Zwecke verwendet, wie Staking, als Währung und zur Bezahlung von Gasgebühren für Berechnungen. **WETH ist im Grunde eine erweiterte Form von ETH mit gewisser zusätzlicher Funktionalität, die von vielen Anwendungen und [ERC-20-Token](/glossary/#erc-20)** benötigt wird, welche andere Arten von digitalen Assets auf Ethereum darstellen. Um mit diesen Token arbeiten zu können, muss ETH dieselben Regeln befolgen, auch als ERC-20-Standard bekannt.

Um diese Lücke zu überbrücken, wurde Wrapped ETH (WETH) geschaffen. **Wrapped ETH ist ein Smart Contract, der es Ihnen ermöglicht, eine beliebige Menge an ETH in den Vertrag einzuzahlen und die gleiche Menge an geprägtem WETH** zu erhalten, die dem ERC-20-Token-Standard entspricht. WETH ist eine Darstellung von ETH, die es Ihnen erlaubt, damit als ERC-20-Token zu interagieren, nicht als natives Asset ETH. Sie benötigen weiterhin natives ETH, um Gasgebühren zu bezahlen. Stellen Sie also sicher, dass Sie ausreichend ETH besitzen, wenn Sie Einzahlungen vornehmen.

Sie können WETH in ETH umwandeln, indem Sie den WETH-Smart Contract verwenden. Sie können eine beliebige Menge WETH mit dem WETH-Smart Contract einlösen und erhalten die gleiche Menge in ETH. Das eingezahlte WETH wird dann verbrannt und aus dem umlaufenden Angebot von WETH entfernt.

**Ungefähr ~3 % des ETH-Angebots im Umlauf sind im WETH-Token-Vertrag gesperrt**, was ihn zu einem der am meisten verwendeten [Smart Contracts](/glossary/#smart-contract) macht. WETH ist besonders wichtig für Benutzer, die mit Anwendungen im Bereich der dezentralen Finanzen (DeFi) interagieren.

## Warum müssen wir ETH als ERC-20 verpacken? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiert eine standardisierte Schnittstelle für übertragbare Token, sodass jeder Token erstellen kann, welche nahtlos mit Anwendungen und Token, die diesen Standard im Ethereum-Ökosystem verwenden, interagieren. Da **ETH älter als der ERC-20-Standard** ist, entspricht ETH nicht dieser Spezifikation. Das bedeutet, dass Sie ETH **nicht einfach** gegen andere ERC-20-Token eintauschen oder **ETH in Apps verwenden können, die den ERC-20-Standard nutzen**. Das Verpacken von ETH gibt Ihnen die Möglichkeit, Folgendes zu tun:

- **ETH gegen ERC-20-Token eintauschen**: Sie können ETH nicht direkt gegen andere ERC-20-Token eintauschen. WETH ist eine Darstellung von Ether, die dem ERC-20-Fungible-Token-Standard entspricht und mit anderen ERC-20-Token getauscht werden kann.

- **ETH in dApps verwenden**: Da ETH nicht ERC-20-kompatibel ist, müssten Entwickler separate Schnittstellen (eine für ETH und eine andere für ERC-20-Token) in dApps erstellen. Das Verpacken von ETH beseitigt dieses Hindernis und ermöglicht es Entwicklern, ETH und andere Token innerhalb derselben dApp zu verwalten. Viele Anwendungen für dezentrale Finanzen verwenden diesen Standard und schaffen Märkte für den Austausch dieser Token.

## Wrapped Ether (WETH) und Ether (ETH): Was ist der Unterschied? {#weth-vs-eth-differences}

|          | **Ether (ETH)**                                                                                                                                                                                                                    | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Angebot  | Das Angebot von ETH wird durch das Ethereum-Protokoll verwaltet. Die [Ausgabe](/roadmap/merge/issuance) von ETH erfolgt durch Ethereum-Validatoren beim Verarbeiten von Transaktionen und beim Erstellen von Blöcken. | WETH ist ein ERC-20-Token, dessen Angebot durch einen Smart Contract verwaltet wird. Neue Einheiten von WETH werden durch den Vertrag ausgegeben, nachdem ETH-Einzahlungen von Benutzern eingegangen sind, oder WETH-Einheiten werden verbrannt, wenn ein Benutzer WETH gegen ETH eintauschen möchte. |
| Eigentum | Das Eigentum wird durch das Ethereum-Protokoll über Ihr Kontoguthaben verwaltet.                                                                                                                                                      | Das Eigentum an WETH wird durch den Smart Contract für den WETH-Token verwaltet, der durch das Ethereum-Protokoll gesichert ist.                                                                                                                                                                                      |
| Gas      | Ether (ETH) ist die akzeptierte Zahlungseinheit für Berechnungen im Ethereum-Netzwerk. Gasgebühren werden in Gwei (einer Einheit von Ether) angegeben.                          | Das Bezahlen von Gas mit WETH-Token wird nicht nativ unterstützt.                                                                                                                                                                                                                                                     |

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Sie zahlen Gasgebühren, um ETH mit dem WETH-Vertrag zu verpacken oder zu entpacken.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH gilt allgemein als sicher, da es auf einem einfachen, bewährten Smart Contract basiert. Der WETH-Vertrag wurde zudem formal verifiziert, was den höchsten Sicherheitsstandard für Smart Contracts auf Ethereum darstellt.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Neben der [kanonischen Implementierung von WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), die auf dieser Seite beschrieben ist, gibt es auch andere Varianten. Diese können benutzerdefinierte Token sein, die von App-Entwicklern erstellt wurden, oder Versionen, die auf anderen Blockchains herausgegeben wurden, und sich unterschiedlich verhalten oder unterschiedliche Sicherheitseigenschaften haben. **Überprüfen Sie immer die Token-Informationen, um zu erfahren, mit welcher WETH-Implementierung Sie interagieren.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum-Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Weiterführende Lektüre {#further-reading}

- [WTF ist WETH?](https://weth.tkn.eth.limo/)
- [WETH-Token-Information auf Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Formale Verifizierung von WETH](https://zellic.io/blog/formal-verification-weth)
