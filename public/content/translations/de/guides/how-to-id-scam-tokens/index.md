---
title: Wie man Betrugs-Token erkennt
description: Betrugs-Token verstehen, wie sie sich als legitim ausgeben und wie man sie vermeidet.
lang: de
---

# Wie man Betrugs-Token erkennt {#identify-scam-tokens}

Eine der häufigsten Anwendungen für Ethereum ist die Erstellung eines handelbaren Tokens durch eine Gruppe, gewissermaßen ihre eigene Währung. Diese Token folgen typischerweise einem Standard, [ERC-20](/developers/docs/standards/tokens/erc-20/). Wo es jedoch legitime Anwendungsfälle gibt, die Wert schaffen, gibt es auch Kriminelle, die versuchen, diesen Wert für sich selbst zu stehlen.

Es gibt zwei Möglichkeiten, wie sie Sie wahrscheinlich täuschen werden:

- **Verkauf eines Betrugs-Tokens**, der wie der legitime Token aussehen mag, den Sie kaufen möchten, aber von den Betrügern ausgegeben wird und nichts wert ist.
- **Sie dazu verleiten, schädliche Transaktionen zu signieren**, normalerweise indem sie Sie auf ihre eigene Benutzeroberfläche leiten. Sie könnten versuchen, Sie dazu zu bringen, ihren Verträgen eine Freigabe (Allowance) für Ihre ERC-20-Token zu erteilen, sensible Informationen preiszugeben, die ihnen Zugang zu Ihren Vermögenswerten verschaffen, usw. Diese Benutzeroberflächen können nahezu perfekte Klone ehrlicher Websites sein, jedoch mit versteckten Tricks.

Um zu veranschaulichen, was Betrugs-Token sind und wie man sie erkennt, sehen wir uns ein Beispiel an: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Dieser Token versucht, wie der legitime [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)-Token auszusehen.

<ExpandableCard
title="Was ist ARB?"
contentPreview=''>

Arbitrum ist eine Organisation, die [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/) entwickelt und verwaltet. Ursprünglich war Arbitrum als gewinnorientiertes Unternehmen organisiert, unternahm dann aber Schritte, um sich zu dezentralisieren. Als Teil dieses Prozesses gaben sie einen handelbaren [Governance-Token](/dao/#token-based-membership) heraus.

</ExpandableCard>

<ExpandableCard
title="Warum heißt der Betrugs-Token wARB?"
contentPreview=''>

Es gibt eine Konvention bei Ethereum, dass wir, wenn ein Vermögenswert nicht ERC-20-konform ist, eine "Wrapped"-Version (eingepackte Version) davon erstellen, deren Name mit "w" beginnt. So haben wir zum Beispiel wBTC für Bitcoin und <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH für Ether</a>.

Es macht keinen Sinn, eine Wrapped-Version eines ERC-20-Tokens zu erstellen, der sich bereits auf Ethereum befindet, aber Betrüger verlassen sich eher auf den Anschein von Legitimität als auf die zugrunde liegende Realität.

</ExpandableCard>

## Wie funktionieren Betrugs-Token? {#how-do-scam-tokens-work}

Der ganze Sinn von Ethereum ist die Dezentralisierung. Das bedeutet, dass es keine zentrale Autorität gibt, die Ihre Vermögenswerte beschlagnahmen oder Sie daran hindern kann, einen Smart Contract bereitzustellen. Es bedeutet aber auch, dass Betrüger jeden beliebigen Smart Contract bereitstellen können, den sie möchten.

<ExpandableCard
title="Was sind Smart Contracts?"
contentPreview=''>

[Smart Contracts](/developers/docs/smart-contracts/) sind die Programme, die auf der Ethereum-Blockchain ausgeführt werden. Jeder ERC-20-Token ist beispielsweise als Smart Contract implementiert.

</ExpandableCard>

Konkret hat Arbitrum einen Vertrag bereitgestellt, der das Symbol `ARB` verwendet. Das hindert andere jedoch nicht daran, ebenfalls einen Vertrag bereitzustellen, der genau dasselbe oder ein ähnliches Symbol verwendet. Wer den Vertrag schreibt, darf festlegen, was der Vertrag tun wird.

## Legitim erscheinen {#appearing-legitimate}

Es gibt verschiedene Tricks, die Ersteller von Betrugs-Token anwenden, um legitim zu erscheinen.

- **Legitimer Name und Symbol**. Wie bereits erwähnt, können ERC-20-Verträge dasselbe Symbol und denselben Namen wie andere ERC-20-Verträge haben. Sie können sich bei der Sicherheit nicht auf diese Felder verlassen.

- **Legitime Eigentümer**. Betrugs-Token führen oft Airdrops mit erheblichen Guthaben an Adressen durch, von denen erwartet werden kann, dass sie legitime Inhaber des echten Tokens sind.

  Schauen wir uns zum Beispiel noch einmal `wARB` an. [Etwa 16 % der Token](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) werden von einer Adresse gehalten, deren öffentliches Tag [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F) lautet. Dies ist _keine_ gefälschte Adresse, es ist tatsächlich die Adresse, die [den echten ARB-Vertrag im Ethereum-Mainnet bereitgestellt hat](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Da das ERC-20-Guthaben einer Adresse Teil des Speichers des ERC-20-Vertrags ist, kann es vom Vertrag so festgelegt werden, wie es der Vertragsentwickler wünscht. Es ist auch möglich, dass ein Vertrag Übertragungen verbietet, sodass die legitimen Benutzer diese Betrugs-Token nicht loswerden können.

- **Legitime Übertragungen**. _Legitime Eigentümer würden nicht dafür bezahlen, einen Betrugs-Token an andere zu übertragen. Wenn es also Übertragungen gibt, muss er legitim sein, oder?_ **Falsch**. `Transfer`-Ereignisse werden vom ERC-20-Vertrag erzeugt. Ein Betrüger kann den Vertrag leicht so schreiben, dass er diese Aktionen erzeugt.

## Betrügerische Websites {#websites}

Betrüger können auch sehr überzeugende Websites erstellen, manchmal sogar exakte Klone authentischer Websites mit identischen Benutzeroberflächen, aber mit subtilen Tricks. Beispiele hierfür könnten externe Links sein, die legitim erscheinen, den Benutzer aber tatsächlich auf eine externe Betrugsseite leiten, oder falsche Anweisungen, die den Benutzer dazu verleiten, seine Schlüssel preiszugeben oder Gelder an die Adresse eines Angreifers zu senden.

Die beste Methode, um dies zu vermeiden, besteht darin, die URL der von Ihnen besuchten Websites sorgfältig zu überprüfen und Adressen bekannter authentischer Websites in Ihren Lesezeichen zu speichern. Dann können Sie über Ihre Lesezeichen auf die echte Website zugreifen, ohne versehentlich Tippfehler zu machen oder sich auf externe Links zu verlassen.

## Wie können Sie sich schützen? {#protect-yourself}

1. **Überprüfen Sie die Vertragsadresse**. Legitime Token stammen von legitimen Organisationen, und Sie können die Vertragsadressen auf der Website der Organisation einsehen. Zum Beispiel [können Sie für `ARB` die legitimen Adressen hier sehen](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Echte Token haben Liquidität**. Eine weitere Möglichkeit besteht darin, sich die Größe des Liquiditätspools auf [Uniswap](https://uniswap.org/) anzusehen, einem der gängigsten Protokolle zum Tauschen von Token. Dieses Protokoll arbeitet mit Liquiditätspools, in die Investoren ihre Token in der Hoffnung auf eine Rendite aus Handelsgebühren einzahlen.

Betrugs-Token haben in der Regel winzige Liquiditätspools, wenn überhaupt, da die Betrüger keine echten Vermögenswerte riskieren wollen. Zum Beispiel hält der `ARB`/`ETH`-Uniswap-Pool etwa eine Million Dollar ([siehe hier für den aktuellen Wert](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) und der Kauf oder Verkauf einer kleinen Menge wird den Preis nicht verändern:

![Kauf eines legitimen Tokens](./uniswap-real.png)

Wenn Sie jedoch versuchen, den Betrugs-Token `wARB` zu kaufen, würde selbst ein winziger Kauf den Preis um über 90 % verändern:

![Kauf eines Betrugs-Tokens](./uniswap-scam.png)

Dies ist ein weiterer Beweis dafür, dass `wARB` wahrscheinlich kein legitimer Token ist.

3. **Suchen Sie in Etherscan**. Viele Betrugs-Token wurden bereits von der Community identifiziert und gemeldet. Solche Token sind [in Etherscan markiert](https://info.etherscan.com/etherscan-token-reputation/). Obwohl Etherscan keine maßgebliche Quelle der Wahrheit ist (es liegt in der Natur dezentralisierter Netzwerke, dass es keine maßgebliche Quelle für Legitimität geben kann), sind Token, die von Etherscan als Betrug identifiziert werden, wahrscheinlich auch Betrug.

   ![Betrugs-Token in Etherscan](./etherscan-scam.png)

## Fazit {#conclusion}

Solange es Werte auf der Welt gibt, wird es Betrüger geben, die versuchen, sie für sich selbst zu stehlen, und in einer dezentralisierten Welt gibt es niemanden, der Sie schützt, außer Ihnen selbst. Hoffentlich erinnern Sie sich an diese Punkte, um legitime Token von Betrug zu unterscheiden:

- Betrugs-Token geben sich als legitime Token aus, sie können denselben Namen, dasselbe Symbol usw. verwenden.
- Betrugs-Token _können nicht_ dieselbe Vertragsadresse verwenden.
- Die beste Quelle für die Adresse des legitimen Tokens ist die Organisation, deren Token es ist.
- Andernfalls können Sie beliebte, vertrauenswürdige Anwendungen wie [Uniswap](https://app.uniswap.org/#/swap) und [Blockscout](https://eth.blockscout.com/) verwenden.