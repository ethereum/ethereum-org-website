---
title: So erkennen Sie betrügerische Token
description: Erkennen von betrügerischen Token, wie sie sich legitim erscheinen lassen und wie sie sich vermeiden lassen.
lang: de
---

# So erkennen Sie betrügerische Token {#identify-scam-tokens}

Eine der häufigsten Anwendungen von Ethereum ist die Schaffung eines handelbaren Tokens durch eine Gruppe, der gewissermaßen ihre eigene Währung darstellt. Diese Token folgen in der Regel dem Standard, [ERC-20](/developers/docs/standards/tokens/erc-20/). Jedoch gibt es überall, wo es legitime wertschöpfende Anwendungsmöglichkeiten gibt, auch Kriminelle, die diese Werte stehlen möchten.

Die beiden folgenden Täuschungsversuche sind dabei gängig:

- **Verkaufen eines betrügerischen Tokens**, der im Aussehen einem legitimen Token ähnelt und den Sie kaufen möchten, jedoch von einem Betrüger erstellt wurde und keinen Wert hat.
- **Sie werden dazu verleitet, unzulässige Transaktionen zu unterzeichnen**, indem Sie für gewöhnlich auf die Benutzeroberfläche der Betrüger geleitet wird. Sie könnten versuchen, Sie dazu zu bringen, ihren Verträgen einen Freibetrag für Ihre ERC-20-Token zu gewähren, sensible Informationen preiszugeben, über die sie Zugang zu Ihren Vermögenswerten erhalten usw. Solche Benutzeroberflächen können nahezu perfekte Klone von legitimen Websites sein, jedoch mit versteckten Tricks.

Um zu veranschaulichen, was Betrugs-Token sind und wie man sie erkennt, sehen wir uns ein Beispiel an: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Dieser Token immitiert das Aussehen eines legitimen [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) -Tokens.

<ExpandableCard
title="Was ist ARB?"
contentPreview=''>

Arbitrum ist eine Organisation zur Entwicklung und Verwaltung von <a href="/developers/docs/scaling/optimistic-rollups/">optimistischen Rollups</a>. Ursprünglich war Arbitrum als gewinnorientiertes Unternehmen organisiert, unternahm dann aber Schritte zur Dezentralisierung. Im Rahmen dieses Prozesses wurde ein handelbarer <a href="/dao/#token-based-membership">Governance-Token</a> ausgegeben.

</ExpandableCard>

<ExpandableCard
title="Warum wird der betrügerische Token wARB genannt?"
contentPreview=''>

In Ethereum gibt es eine Konvention: Wird ein Asset erstellt, das nicht ERC-20-kompatibel ist, wird eine " Wrapped"-Version erstellt wird, deren Name mit "w" beginnt. So gibt es beispielsweise wBTC für Bitcoin und <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH für Ether</a>.

Es ergibt keinen Sinn, eine Wrapped-Version eines ERC-20-Tokens zu erstellen, der bereits auf Ethereum vorhanden ist, aber Betrüger verlassen sich eher auf den Anschein von Legitimität als auf die zugrunde liegende Realität.

</ExpandableCard>

## Wie funktionieren betrügerische Token? {#how-do-scam-tokens-work}

Dezentralisierung ist das zentrale Element von Ethereum. Das bedeutet, dass es keine zentrale Autorität gibt, die Ihre Anlagen konfiszieren oder Sie daran hindern könnte, einen Smart Contract bereitzustellen. Doch das bedeutet auch, dass Betrüger jeden beliebigen Smart Contract bereitstellen können.

<ExpandableCard
title="Was sind Smart Contracts?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Smart Contracts</a> sind die Programme, die auf der Ethereum-Blockchain laufen. Jeder ERC-20 Token ist beispielsweise als Smart Contract implementiert.

</ExpandableCard>

Insbesondere Arbitrum setzt so einen Contract ein, der das Symbol `ARB` nutzt. Doch das hält andere Menschen nicht davon ab, ebenfalls einen Contract einzusetzen, der dasselbe oder ein ähnliches Symbol nutzt. Wer den Contract schreibt, kann bestimmen, wofür er verwendet wird.

## Legitimes Erscheinungsbild {#appearing-legitimate}

Es gibt einige Tricks, die die Ersteller von betrügerischen Tokens nutzen, um ein legitimes Erscheinungsbild zu imitieren.

- **Legitimer Name und legitimes Symbol**. Wie bereits beschrieben, können ERC-20-Contracts dasselbe Symbol und denselben Namen wie andere ERC-20-Contracts aufweisen. Es ist nicht möglich, darüber auf die Sicherheit der Token zu schließen.

- **Legitime Besitzer**. Betrügerische Token senden oft signifikante Beträge an Adressen, die als legitime Besitzer des echten Tokens angenommen werden.

  Kommen wir nochmals auf `wARB` zurück. [Ungefähr 16 % der Token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) werden von einer Adresse verwaltet, deren öffentlicher Tag ["Arbitrum Foundation: Deployer"](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) ist. Das ist _keine_ falsche Adresse, es ist vielmehr die Adresse, die [den echten ARB-Contract auf dem Ethereum-Mainnet](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670) eingesetzt hat.

  Da das ERC-20-Guthaben einer Adresse Teil des ERC-20-Vertragsspeichers ist, kann dafür festgelegt werden, was sich der Entwickler wünscht. Es ist für einen Contract auch möglich, Transfers zu verbieten, sodass der legitime Nutzer keine Chance hat, die betrügerischen Token zu entfernen.

- **Legitime Transfers**. _Legitime Besitzer würden nicht dafür bezahlen, einen betrügerischen Token auf andere zu übertragen. Daher muss der Token, sofern er Transfers ausführt, legitim sein, oder?_ **Falsch**. `Transfer`-Ereignisse werden auch durch den ERC-20-Contract produziert. Ein Betrüger kann einfach den Contract so schreiben, dass er diese Aktionen produziert.

## Betrügerische Websites {#websites}

Betrüger können auch sehr überzeugende Websites produzieren, manchmal sogar präzise Klone von authentischen Seiten mit einer identischen Benutzeroberfläche, aber mit subtilen Tricks. Beispiele könnten externe links sein, die legitim aussehen, jedoch den Nutzer zu einer externen betrügerischen Seite senden. Es könnten auch falsche Anweisungen sein, die den Nutzer dazu bringen, seine Schlüssel freizugeben oder dem Angreifer Gelder zu senden.

Die beste Art das zu vermeiden, ist es, die URL vorsichtig auf von Ihnen besuchte Seiten zu überprüfen. Dafür können Sie authentische Seiten in ihren Lesezeichen speichern. Dann können Sie die Seiten über Ihre Lesezeichen aufrufen, ohne versehentlich Rechtschreibfehler zu machen oder sich auf externe Links verlassen zu müssen.

## Wie können Sie sich schützen? {#protect-yourself}

1. **Überprüfen der Contract-Adresse**. Legitime Token stammen von legitimen Organisationen und Sie können die Contract-Adressen auf der Website dieser Organisation nachschauen. Zum Beispiel können Sie[ die legitimen Adressen für `ARB` hier nachsehen](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Echte Token weisen Liquidität auf**. Eine weitere Option ist, sich die Liquidität-Poolgröße auf [Uniswap](https://uniswap.org/) anzuschauen – eines der gängigsten Token-Tauschprotokolle. Dieses Protokoll funktioniert, indem es Liquiditätspools nutzt, in die ihre Token investieren, in der Hoffnung, mit Handelsgebühren Gewinne zu machen.

Betrügerische Tokens habe, wenn überhaupt, klassischerweise kleine Liquiditätspools, da die Betrüger keine echten Anlagen riskieren wollen. Der `ARB`/`ETH` Uniswap Pool hält beispielsweise ungefähr eine halbe Millionen Dollar ([schlagen Sie hier den aktuellen Wert nach](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) und das Kaufen oder Verkaufen einer kleinen Menge wird den Preis nicht beeinflussen:

![Einen legitimen Token kaufen](./uniswap-real.png)

Doch wenn Sie versuchen würden, den betrügerischen `wARB`-Token zu kaufen, könnte sogar eine kleine Investition den Preis um über 90 % steigern:

![Einen betrügerischen Token kaufen](./uniswap-scam.png)

Das ist ein weiterer Beweis, der uns zeigt, dass `wARB` wahrscheinlich kein legitimer Token ist.

3. **Sehen Sie auf Etherscan nach**. Viele betrügerische Token wurden bereits identifiziert und von der Community gemeldet. Solche Token werden in [Etherscan gekennzeichnet](https://info.etherscan.com/etherscan-token-reputation/). Während Etherscan keine unfehlbare Quelle ist (es ist normal für dezentralisierte Netzwerke, dass es so etwas nicht gibt), sind Token, die von Etherscan als Betrug gekennzeichnet wurden, wahrscheinlich betrügerisch.

   ![Betrügerische Token in Etherscan](./etherscan-scam.png)

## Fazit {#conclusion}

Solange es Werte in der Welt gibt, wird es immer Betrüger geben, die diese stehlen wollen. In einer dezentralisierten Welt gibt es niemanden, der Sie beschützt, außer Sie selbst. Hoffentlich helfen Ihnen diese Informationen dabei, betrügerische und legitime Token auseinanderzuhalten:

- Betrügerische Token kopieren legitime Token, sie können denselben Namen, dasselbe Symbol etc. verwenden.
- Betrügerische Token _können nicht_ dieselbe Contract-Adresse verwenden.
- Die beste Quelle für die Adresse des legitimen Tokens ist die Organisation, um deren Token es sich handelt.
- Sie können zudem sichere Anwendungen wie [Uniswap](https://app.uniswap.org/#/swap) und [Etherscan](https://etherscan.io/) nutzen.
