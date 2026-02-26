---
title: "So erkennen Sie betrügerische Token"
description: "Erkennen von betrügerischen Token, wie sie sich legitim erscheinen lassen und wie sie sich vermeiden lassen."
lang: de
---

# Wie man Scam-Tokens erkennt {#identify-scam-tokens}

Eine der häufigsten Anwendungen von Ethereum ist die Schaffung eines handelbaren Tokens durch eine Gruppe, der gewissermaßen ihre eigene Währung darstellt. Diese Tokens folgen in der Regel einem Standard, [ERC-20](/developers/docs/standards/tokens/erc-20/). Jedoch gibt es überall, wo es legitime wertschöpfende Anwendungsmöglichkeiten gibt, auch Kriminelle, die diese Werte stehlen möchten.

Die beiden folgenden Täuschungsversuche sind dabei gängig:

- **Verkauf eines Scam-Tokens**, der wie der legitime Token aussehen mag, den Sie kaufen möchten, aber von Betrügern ausgegeben wird und wertlos ist.
- **Verleitung zur Unterzeichnung schädlicher Transaktionen**, normalerweise, indem Sie auf die Benutzeroberfläche der Betrüger geleitet werden. Sie könnten versuchen, Sie dazu zu bringen, ihren Verträgen einen Freibetrag für Ihre ERC-20-Token zu gewähren, sensible Informationen preiszugeben, über die sie Zugang zu Ihren Vermögenswerten erhalten usw. Solche Benutzeroberflächen können nahezu perfekte Klone von legitimen Websites sein, jedoch mit versteckten Tricks.

Um zu veranschaulichen, was Scam-Tokens sind und wie man sie erkennt, sehen wir uns ein Beispiel an: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Dieser Token versucht, wie der legitime [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)-Token auszusehen.

<ExpandableCard
title="Was ist ARB?"
contentPreview=''>

Arbitrum ist eine Organisation, die [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/) entwickelt und verwaltet. Ursprünglich war Arbitrum als gewinnorientiertes Unternehmen organisiert, unternahm dann aber Schritte zur Dezentralisierung. Als Teil dieses Prozesses haben sie einen handelbaren [Governance-Token](/dao/#token-based-membership) ausgegeben.
</ExpandableCard>

<ExpandableCard
title="Warum heißt der Scam-Token wARB?"
contentPreview=''>

In Ethereum gibt es eine Konvention: Wird ein Asset erstellt, das nicht ERC-20-kompatibel ist, wird eine " Wrapped"-Version erstellt wird, deren Name mit "w" beginnt. So gibt es beispielsweise wBTC für Bitcoin und <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH für Ether</a>.

Es ergibt keinen Sinn, eine Wrapped-Version eines ERC-20-Tokens zu erstellen, der bereits auf Ethereum vorhanden ist, aber Betrüger verlassen sich eher auf den Anschein von Legitimität als auf die zugrunde liegende Realität.
</ExpandableCard>

## Wie funktionieren betrügerische Token? {#how-do-scam-tokens-work}

Dezentralisierung ist das zentrale Element von Ethereum. Das bedeutet, dass es keine zentrale Autorität gibt, die Ihre Anlagen konfiszieren oder Sie daran hindern könnte, einen Smart Contract bereitzustellen. Doch das bedeutet auch, dass Betrüger jeden beliebigen Smart Contract bereitstellen können.

<ExpandableCard
title="Was sind Smart Contracts?"
contentPreview=''>

[Smart Contracts](/developers/docs/smart-contracts/) sind die Programme, die auf der Ethereum-Blockchain ausgeführt werden. Jeder ERC-20 Token ist beispielsweise als Smart Contract implementiert.
</ExpandableCard>

Genauer gesagt hat Arbitrum einen Vertrag bereitgestellt, der das Symbol `ARB` verwendet. Doch das hält andere Menschen nicht davon ab, ebenfalls einen Contract einzusetzen, der dasselbe oder ein ähnliches Symbol nutzt. Wer den Contract schreibt, kann bestimmen, wofür er verwendet wird.

## Legitim erscheinen {#appearing-legitimate}

Es gibt einige Tricks, die die Ersteller von betrügerischen Tokens nutzen, um ein legitimes Erscheinungsbild zu imitieren.

- **Legitimer Name und legitimes Symbol**. Wie bereits beschrieben, können ERC-20-Contracts dasselbe Symbol und denselben Namen wie andere ERC-20-Contracts aufweisen. Es ist nicht möglich, darüber auf die Sicherheit der Token zu schließen.

- **Legitime Besitzer**. Betrügerische Token senden oft signifikante Beträge an Adressen, die als legitime Besitzer des echten Tokens angenommen werden.

  Schauen wir uns zum Beispiel `wARB` noch einmal an. [Ungefähr 16 % der Tokens](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) werden von einer Adresse gehalten, deren öffentliches Tag [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F) ist. Dies ist _keine_ gefälschte Adresse, es ist wirklich die Adresse, die [den echten ARB-Vertrag auf dem Ethereum-Mainnet bereitgestellt hat](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Da das ERC-20-Guthaben einer Adresse Teil des ERC-20-Vertragsspeichers ist, kann dafür festgelegt werden, was sich der Entwickler wünscht. Es ist für einen Contract auch möglich, Transfers zu verbieten, sodass der legitime Nutzer keine Chance hat, die betrügerischen Token zu entfernen.

- **Legitime Transfers**. _Legitime Besitzer würden nicht dafür bezahlen, einen Scam-Token an andere zu transferieren. Wenn es also Transfers gibt, muss er legitim sein, oder?_ **Falsch**. `Transfer`-Ereignisse werden vom ERC-20-Vertrag erzeugt. Ein Betrüger kann einfach den Contract so schreiben, dass er diese Aktionen produziert.

## Betrügerische Websites {#websites}

Betrüger können auch sehr überzeugende Websites produzieren, manchmal sogar präzise Klone von authentischen Seiten mit einer identischen Benutzeroberfläche, aber mit subtilen Tricks. Beispiele könnten externe links sein, die legitim aussehen, jedoch den Nutzer zu einer externen betrügerischen Seite senden. Es könnten auch falsche Anweisungen sein, die den Nutzer dazu bringen, seine Schlüssel freizugeben oder dem Angreifer Gelder zu senden.

Die beste Art das zu vermeiden, ist es, die URL vorsichtig auf von Ihnen besuchte Seiten zu überprüfen. Dafür können Sie authentische Seiten in ihren Lesezeichen speichern. Dann können Sie die Seiten über Ihre Lesezeichen aufrufen, ohne versehentlich Rechtschreibfehler zu machen oder sich auf externe Links verlassen zu müssen.

## Wie können Sie sich schützen? Schützen Sie sich {#protect-yourself}

1. **Überprüfen der Contract-Adresse**. Legitime Token stammen von legitimen Organisationen und Sie können die Contract-Adressen auf der Website dieser Organisation nachschauen. Für `ARB` können Sie zum Beispiel [die legitimen Adressen hier einsehen](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Echte Token weisen Liquidität auf**. Eine weitere Möglichkeit ist, die Größe des Liquiditätspools auf [Uniswap](https://uniswap.org/) zu überprüfen, einem der gängigsten Protokolle für den Token-Tausch. Dieses Protokoll funktioniert, indem es Liquiditätspools nutzt, in die ihre Token investieren, in der Hoffnung, mit Handelsgebühren Gewinne zu machen.

Betrügerische Tokens habe, wenn überhaupt, klassischerweise kleine Liquiditätspools, da die Betrüger keine echten Anlagen riskieren wollen. Der `ARB`/`ETH` Uniswap-Pool zum Beispiel hält etwa eine Million Dollar ([den aktuellen Wert finden Sie hier](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) und der Kauf oder Verkauf eines kleinen Betrags wird den Preis nicht verändern:

![Kauf eines legitimen Tokens](./uniswap-real.png)

Aber wenn Sie versuchen, den Scam-Token `wARB` zu kaufen, würde selbst ein winziger Kauf den Preis um über 90 % verändern:

![Kauf eines Scam-Tokens](./uniswap-scam.png)

Dies ist ein weiterer Beweis dafür, dass `wARB` wahrscheinlich kein legitimer Token ist.

3. **Sehen Sie auf Etherscan nach**. Viele betrügerische Token wurden bereits identifiziert und von der Community gemeldet. Solche Tokens sind [in Etherscan markiert](https://info.etherscan.com/etherscan-token-reputation/). Während Etherscan keine unfehlbare Quelle ist (es ist normal für dezentralisierte Netzwerke, dass es so etwas nicht gibt), sind Token, die von Etherscan als Betrug gekennzeichnet wurden, wahrscheinlich betrügerisch.

   ![Scam-Token in Etherscan](./etherscan-scam.png)

## Fazit {#conclusion}

Solange es Werte in der Welt gibt, wird es immer Betrüger geben, die diese stehlen wollen. In einer dezentralisierten Welt gibt es niemanden, der Sie beschützt, außer Sie selbst. Hoffentlich helfen Ihnen diese Informationen dabei, betrügerische und legitime Token auseinanderzuhalten:

- Betrügerische Token kopieren legitime Token, sie können denselben Namen, dasselbe Symbol etc. verwenden.
- Scam-Tokens _können nicht_ dieselbe Vertragsadresse verwenden.
- Die beste Quelle für die Adresse des legitimen Tokens ist die Organisation, um deren Token es sich handelt.
- Andernfalls können Sie beliebte, vertrauenswürdige Anwendungen wie [Uniswap](https://app.uniswap.org/#/swap) und [Blockscout](https://eth.blockscout.com/) verwenden.
