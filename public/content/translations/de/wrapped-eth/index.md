---
title: Was ist Wrapped Ether (WETH)?
description: "Eine Einführung in Wrapped Ether (WETH) – ein ERC20-kompatibler Wrapper für Ether (ETH)."
lang: de
---

# Wrapped Ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Verbinden Sie Ihr Wallet, um ETH auf einer beliebigen Chain unter [WrapETH.com](https://www.wrapeth.com/) zu wrappen oder zu entwrappen.</div>
</Alert>

Ether (ETH) ist die Hauptwährung von Ethereum. Es wird für verschiedene Zwecke verwendet, wie zum Beispiel für das Staking, als Währung und zur Zahlung von Gasgebühren für Rechenleistung. **WETH ist im Grunde eine verbesserte Form von ETH mit einigen zusätzlichen Funktionen, die von vielen Anwendungen und [ERC-20-Token](/glossary/#erc-20) benötigt werden**, bei denen es sich um andere Arten von digitalen Vermögenswerten auf Ethereum handelt. Um mit diesen Token zu funktionieren, muss ETH denselben Regeln folgen wie sie, bekannt als der ERC-20-Standard.

Um diese Lücke zu schließen, wurde Wrapped ETH (WETH) geschaffen. **Wrapped ETH ist ein Smart Contract, der es Ihnen ermöglicht, einen beliebigen Betrag an ETH in den Vertrag einzuzahlen und denselben Betrag in geprägtem WETH zu erhalten**, das dem ERC-20-Token-Standard entspricht. WETH ist eine Repräsentation von ETH, die es Ihnen ermöglicht, damit als ERC-20-Token zu interagieren, nicht als nativer Vermögenswert ETH. Sie benötigen weiterhin natives ETH, um Gasgebühren zu bezahlen. Stellen Sie also sicher, dass Sie bei der Einzahlung etwas davon aufbewahren. 

Sie können WETH mithilfe des WETH-Smart-Contracts in ETH entwrappen. Sie können jeden beliebigen Betrag an WETH über den WETH-Smart-Contract einlösen und erhalten denselben Betrag in ETH. Das eingezahlte WETH wird dann verbrannt und aus dem zirkulierenden Angebot von WETH entfernt.

**Ungefähr 3 % des zirkulierenden ETH-Angebots sind im WETH-Token-Vertrag gesperrt**, was ihn zu einem der am häufigsten genutzten [Smart Contracts](/glossary/#smart-contract) macht. WETH ist besonders wichtig für Benutzer, die mit Anwendungen im Bereich der dezentralisierten Finanzen (DeFi) interagieren.

## Warum müssen wir ETH als ERC-20 wrappen? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiert eine Standardschnittstelle für übertragbare Token, sodass jeder Token erstellen kann, die nahtlos mit Anwendungen und Token interagieren, die diesen Standard im Ethereum-Ökosystem verwenden. Da **ETH älter als der ERC-20-Standard ist**, entspricht ETH dieser Spezifikation nicht. Das bedeutet, dass **Sie ETH nicht einfach** gegen andere ERC-20-Token eintauschen oder **ETH in Apps verwenden können, die den ERC-20-Standard nutzen**. Das Wrappen von ETH gibt Ihnen die Möglichkeit, Folgendes zu tun:

- **ETH gegen ERC-20-Token tauschen**: Sie können ETH nicht direkt gegen andere ERC-20-Token tauschen. WETH ist eine Repräsentation von Ether, die dem Standard für fungible ERC-20-Token entspricht und gegen andere ERC-20-Token getauscht werden kann. 

- **ETH in Dapps verwenden**: Da ETH nicht ERC20-kompatibel ist, müssten Entwickler separate Schnittstellen (eine für ETH und eine weitere für ERC-20-Token) in Dapps erstellen. Das Wrappen von ETH beseitigt dieses Hindernis und ermöglicht es Entwicklern, ETH und andere Token innerhalb derselben Dapp zu verarbeiten. Viele Anwendungen für dezentralisierte Finanzen nutzen diesen Standard und schaffen Märkte für den Austausch dieser Token.

## Wrapped Ether (WETH) vs. Ether (ETH): Was ist der Unterschied? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Angebot     | Das [Angebot an ETH](/eth/supply/) wird durch das [Ethereum](/)-Protokoll verwaltet. Die [Emission](/roadmap/merge/issuance) von ETH wird von Ethereum-Validatoren bei der Verarbeitung von Transaktionen und der Erstellung von Blöcken abgewickelt.                           | WETH ist ein ERC-20-Token, dessen Angebot durch einen Smart Contract verwaltet wird. Neue WETH-Einheiten werden vom Vertrag ausgegeben, nachdem er ETH-Einzahlungen von Benutzern erhalten hat, oder WETH-Einheiten werden verbrannt, wenn ein Benutzer WETH gegen ETH einlösen möchte.                                                                                                                                        |
| Eigentum  | Das Eigentum wird durch das Ethereum-Protokoll über Ihren Kontostand verwaltet.  | Das Eigentum an WETH wird durch den WETH-Token-Smart-Contract verwaltet, der durch das Ethereum-Protokoll gesichert ist.                                                                                                                                         |
| Gas        | Ether (ETH) ist die akzeptierte Zahlungseinheit für Rechenleistung im Ethereum-Netzwerk. Gasgebühren werden in Gwei (einer Einheit von Ether) angegeben.                                                                                    | Die Zahlung von Gas mit WETH-Token wird nativ nicht unterstützt.                                                                                                                                                                                              |

## Häufig gestellte Fragen {#faq}
 
<ExpandableCard title="Zahlt man für das Wrappen/Entwrappen von ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Sie zahlen Gasgebühren, um ETH über den WETH-Vertrag zu wrappen oder zu entwrappen.

</ExpandableCard>

<ExpandableCard title="Ist WETH sicher?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH gilt allgemein als sicher, da es auf einem einfachen, praxiserprobten Smart Contract basiert. Der WETH-Vertrag wurde zudem formal verifiziert, was den höchsten Sicherheitsstandard für Smart Contracts auf Ethereum darstellt.

</ExpandableCard>

<ExpandableCard title="Warum sehe ich verschiedene WETH-Token?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Neben der auf dieser Seite beschriebenen [kanonischen Implementierung von WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) gibt es in der Praxis noch andere Varianten. Dabei kann es sich um benutzerdefinierte Token handeln, die von App-Entwicklern erstellt wurden, oder um Versionen, die auf anderen Blockchains ausgegeben wurden und sich möglicherweise anders verhalten oder andere Sicherheitseigenschaften aufweisen. **Überprüfen Sie immer die Token-Informationen, um zu wissen, mit welcher WETH-Implementierung Sie interagieren.**

</ExpandableCard>

<ExpandableCard title="Was sind die WETH-Verträge in anderen Netzwerken?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [WETH-Token-Informationen auf Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formale Verifizierung von WETH](https://zellic.io/blog/formal-verification-weth)