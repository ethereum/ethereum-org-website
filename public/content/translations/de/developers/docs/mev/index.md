---
title: Maximal Extractable Value (MEV)
description: Eine Einführung in den Maximal Extractable Value (MEV)
lang: de
---

Maximal Extractable Value (MEV) bezieht sich auf den maximalen Wert, der aus der Blockproduktion über die standardmäßige Blockbelohnung und die Gasgebühren hinaus extrahiert werden kann, indem Transaktionen in einem Block eingeschlossen, ausgeschlossen oder in ihrer Reihenfolge geändert werden.

## Maximal Extractable Value {#maximal-extractable-value}

Maximal Extractable Value wurde zuerst im Kontext von [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) angewendet und anfangs als „Miner Extractable Value“ bezeichnet. Das liegt daran, dass bei Proof-of-Work die Miner den Einschluss, Ausschluss und die Reihenfolge von Transaktionen kontrollieren. Seit dem Übergang zu Proof-of-Stake durch [den Merge](/roadmap/merge) sind jedoch Validatoren für diese Rollen verantwortlich, und Mining ist nicht länger Teil des [Ethereum](/)-Protokolls. Die Methoden zur Wertextraktion existieren jedoch weiterhin, weshalb nun stattdessen der Begriff „Maximal Extractable Value“ verwendet wird.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie mit [Transaktionen](/developers/docs/transactions/), [Blöcken](/developers/docs/blocks/), [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) und [Gas](/developers/docs/gas/) vertraut sind. Vertrautheit mit [Dezentralen Anwendungen (Dapps)](/apps/) und [Dezentralisierten Finanzen (DeFi)](/defi/) ist ebenfalls hilfreich.

## MEV-Extraktion {#mev-extraction}

Theoretisch fällt MEV vollständig den Validatoren zu, da sie die einzige Partei sind, die die Ausführung einer profitablen MEV-Gelegenheit garantieren kann. In der Praxis wird jedoch ein großer Teil des MEV von unabhängigen Netzwerk-Teilnehmern extrahiert, die als „Searcher“ bezeichnet werden. Searcher führen komplexe Algorithmen auf Blockchain-Daten aus, um profitable MEV-Gelegenheiten zu erkennen, und nutzen Bots, um diese profitablen Transaktionen automatisch an das Netzwerk zu übermitteln.

Validatoren erhalten dennoch einen Teil des gesamten MEV-Betrags, da Searcher bereit sind, hohe Gasgebühren (die an den Validator gehen) im Austausch für eine höhere Wahrscheinlichkeit der Aufnahme ihrer profitablen Transaktionen in einen Block zu zahlen. Unter der Annahme, dass Searcher wirtschaftlich rational handeln, entspricht die Gasgebühr, die ein Searcher zu zahlen bereit ist, einem Betrag von bis zu 100 % des MEV des Searchers (denn wäre die Gasgebühr höher, würde der Searcher Geld verlieren).

Daher müssen Searcher bei einigen stark umkämpften MEV-Gelegenheiten, wie der [DEX-Arbitrage](#mev-examples-dex-arbitrage), möglicherweise 90 % oder sogar mehr ihrer gesamten MEV-Einnahmen als Gasgebühren an den Validator zahlen, weil so viele Leute denselben profitablen Arbitrage-Handel ausführen wollen. Das liegt daran, dass die einzige Möglichkeit, die Ausführung ihrer Arbitrage-Transaktion zu garantieren, darin besteht, die Transaktion mit dem höchsten Gaspreis einzureichen.

### Gas Golfing {#mev-extraction-gas-golfing}

Diese Dynamik hat dazu geführt, dass es ein Wettbewerbsvorteil ist, gut im „Gas Golfing“ zu sein – dem Programmieren von Transaktionen, sodass sie die geringstmögliche Menge an Gas verbrauchen. Dies ermöglicht es Searchern, einen höheren Gaspreis festzulegen und gleichzeitig ihre gesamten Gasgebühren konstant zu halten (da Gasgebühren = Gaspreis \* verbrauchtes Gas).

Einige bekannte Gas-Golfing-Techniken umfassen: die Verwendung von Adressen, die mit einer langen Reihe von Nullen beginnen (z. B. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), da sie weniger Speicherplatz (und somit Gas) zum Speichern benötigen; und das Belassen kleiner [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token-Guthaben in Verträgen, da es mehr Gas kostet, einen Speicher-Slot zu initialisieren (was der Fall ist, wenn das Guthaben 0 beträgt), als einen Speicher-Slot zu aktualisieren. Das Finden weiterer Techniken zur Reduzierung des Gasverbrauchs ist ein aktives Forschungsgebiet unter Searchern.

### Generalisierte Frontrunner {#mev-extraction-generalized-frontrunners}

Anstatt komplexe Algorithmen zu programmieren, um profitable MEV-Gelegenheiten zu erkennen, betreiben einige Searcher generalisierte Frontrunner. Generalisierte Frontrunner sind Bots, die den Mempool überwachen, um profitable Transaktionen zu erkennen. Der Frontrunner kopiert den Code der potenziell profitablen Transaktion, ersetzt Adressen durch die Adresse des Frontrunners und führt die Transaktion lokal aus, um zu überprüfen, ob die modifizierte Transaktion zu einem Gewinn für die Adresse des Frontrunners führt. Wenn die Transaktion tatsächlich profitabel ist, reicht der Frontrunner die modifizierte Transaktion mit der ersetzten Adresse und einem höheren Gaspreis ein, betreibt so „Frontrunning“ bei der ursprünglichen Transaktion und sichert sich den MEV des ursprünglichen Searchers.

### Flashbots {#mev-extraction-flashbots}

Flashbots ist ein unabhängiges Projekt, das Ausführungsclients um einen Dienst erweitert, der es Searchern ermöglicht, MEV-Transaktionen an Validatoren zu übermitteln, ohne sie dem öffentlichen Mempool preiszugeben. Dies verhindert, dass Transaktionen von generalisierten Frontrunnern überholt (ge-frontrunt) werden.

## MEV-Beispiele {#mev-examples}

MEV tritt auf der Blockchain auf verschiedene Weise in Erscheinung.

### DEX-Arbitrage {#mev-examples-dex-arbitrage}

Die Arbitrage auf [dezentralen Börsen](/glossary/#dex) (DEX) ist die einfachste und bekannteste MEV-Gelegenheit. Infolgedessen ist sie auch am stärksten umkämpft.

Es funktioniert so: Wenn zwei DEXes einen Token zu zwei unterschiedlichen Preisen anbieten, kann jemand den Token auf der günstigeren DEX kaufen und ihn auf der teureren DEX in einer einzigen, atomaren Transaktion verkaufen. Dank der Mechanik der Blockchain ist dies echte, risikolose Arbitrage.

[Hier ist ein Beispiel](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) für eine profitable Arbitrage-Transaktion, bei der ein Searcher 1.000 ETH in 1.045 ETH verwandelte, indem er die unterschiedliche Preisgestaltung des ETH/DAI-Paares auf Uniswap im Vergleich zu Sushiswap ausnutzte.

### Liquidierungen {#mev-examples-liquidations}

Liquidierungen bei Protokollen zur Kreditvergabe stellen eine weitere bekannte MEV-Gelegenheit dar.

Protokolle zur Kreditvergabe wie Maker und Aave verlangen von den Nutzern, eine Sicherheit (z. B. ETH) zu hinterlegen. Diese hinterlegte Sicherheit wird dann verwendet, um Kredite an andere Nutzer zu vergeben.

Nutzer können sich dann je nach Bedarf Vermögenswerte und Token von anderen leihen (z. B. könnten Sie MKR leihen, wenn Sie bei einem Governance-Vorschlag von MakerDAO abstimmen möchten), bis zu einem bestimmten Prozentsatz ihrer hinterlegten Sicherheit. Wenn der Betrag für die Kreditaufnahme beispielsweise maximal 30 % beträgt, kann ein Nutzer, der 100 DAI in das Protokoll einzahlt, einen anderen Vermögenswert im Wert von bis zu 30 DAI leihen. Das Protokoll bestimmt den genauen Prozentsatz der Kreditaufnahmekapazität.

Da der Wert der Sicherheit eines Kreditnehmers schwankt, schwankt auch seine Kreditaufnahmekapazität. Wenn aufgrund von Marktschwankungen der Wert der geliehenen Vermögenswerte beispielsweise 30 % des Wertes ihrer Sicherheit übersteigt (auch hier wird der genaue Prozentsatz durch das Protokoll bestimmt), erlaubt das Protokoll in der Regel jedem, die Sicherheit zu liquidieren und die Kreditgeber sofort auszuzahlen (dies ähnelt der Funktionsweise von [Margin Calls](https://www.investopedia.com/terms/m/margincall.asp) im traditionellen Finanzwesen). Im Falle einer Liquidierung muss der Kreditnehmer in der Regel eine saftige Liquidierungsgebühr zahlen, von der ein Teil an den Liquidator geht – und genau hier kommt die MEV-Gelegenheit ins Spiel.

Searcher konkurrieren darum, Blockchain-Daten so schnell wie möglich zu analysieren, um festzustellen, welche Kreditnehmer liquidiert werden können, und als Erste eine Liquidierungstransaktion einzureichen, um die Liquidierungsgebühr für sich selbst zu kassieren.

### Sandwich-Trading {#mev-examples-sandwich-trading}

Sandwich-Trading ist eine weitere gängige Methode der MEV-Extraktion.

Für ein Sandwich überwacht ein Searcher den Mempool auf große DEX-Trades. Angenommen, jemand möchte 10.000 UNI mit DAI auf Uniswap kaufen. Ein Trade dieser Größenordnung wird eine spürbare Auswirkung auf das UNI/DAI-Paar haben und möglicherweise den Preis von UNI im Verhältnis zu DAI erheblich ansteigen lassen.

Ein Searcher kann den ungefähren Preiseffekt dieses großen Trades auf das UNI/DAI-Paar berechnen und eine optimale Kauforder unmittelbar _vor_ dem großen Trade ausführen, um UNI günstig zu kaufen, und dann eine Verkaufsorder unmittelbar _nach_ dem großen Trade ausführen, um sie zu dem durch die große Order verursachten höheren Preis zu verkaufen.

Sandwiching ist jedoch riskanter, da es nicht atomar ist (im Gegensatz zur oben beschriebenen DEX-Arbitrage) und anfällig für eine [Salmonella-Attacke](https://github.com/Defi-Cartel/salmonella) ist.

### NFT-MEV {#mev-examples-nfts}

MEV im NFT-Bereich ist ein aufkommendes Phänomen und nicht zwangsläufig profitabel.

Da NFT-Transaktionen jedoch auf derselben Blockchain stattfinden, die von allen anderen Ethereum-Transaktionen geteilt wird, können Searcher auch auf dem NFT-Markt ähnliche Techniken anwenden wie bei traditionellen MEV-Gelegenheiten.

Wenn es beispielsweise einen beliebten NFT-Drop gibt und ein Searcher ein bestimmtes NFT oder ein Set von NFTs haben möchte, kann er eine Transaktion so programmieren, dass er als Erster in der Schlange steht, um das NFT zu kaufen, oder er kann das gesamte Set von NFTs in einer einzigen Transaktion kaufen. Oder wenn ein NFT [versehentlich zu einem niedrigen Preis gelistet](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent) wird, kann ein Searcher anderen Käufern zuvorkommen (Frontrunning) und es sich günstig schnappen.

Ein prominentes Beispiel für NFT-MEV ereignete sich, als ein Searcher 7 Millionen US-Dollar ausgab, um jeden einzelnen Cryptopunk zum Mindestpreis zu [kaufen](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs). Ein Blockchain-Forscher [erklärte auf Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538), wie der Käufer mit einem MEV-Anbieter zusammenarbeitete, um seinen Kauf geheim zu halten.

### Der Long Tail {#mev-examples-long-tail}

DEX-Arbitrage, Liquidierungen und Sandwich-Trading sind allesamt sehr bekannte MEV-Gelegenheiten und für neue Searcher wahrscheinlich nicht profitabel. Es gibt jedoch einen „Long Tail“ an weniger bekannten MEV-Gelegenheiten (NFT-MEV ist wohl eine solche Gelegenheit).

Searcher, die gerade erst anfangen, könnten erfolgreicher sein, wenn sie in diesem Long Tail nach MEV suchen. Das [MEV-Jobboard](https://github.com/flashbots/mev-job-board) von Flashbots listet einige aufkommende Gelegenheiten auf.

## Auswirkungen von MEV {#effects-of-mev}

MEV ist nicht nur schlecht – es gibt sowohl positive als auch negative Konsequenzen von MEV auf Ethereum.

### Das Gute {#effects-of-mev-the-good}

Viele DeFi-Projekte sind auf wirtschaftlich rationale Akteure angewiesen, um die Nützlichkeit und Stabilität ihrer Protokolle zu gewährleisten. Beispielsweise stellt die DEX-Arbitrage sicher, dass Nutzer die besten und korrektesten Preise für ihre Token erhalten, und Protokolle zur Kreditvergabe sind auf schnelle Liquidierungen angewiesen, wenn Kreditnehmer unter die Besicherungsquoten fallen, um sicherzustellen, dass Kreditgeber zurückgezahlt werden.

Ohne rationale Searcher, die wirtschaftliche Ineffizienzen suchen und beheben sowie die wirtschaftlichen Anreize von Protokollen nutzen, wären DeFi-Protokolle und Dapps im Allgemeinen möglicherweise nicht so robust, wie sie es heute sind.

### Das Schlechte {#effects-of-mev-the-bad}

Auf der Anwendungsebene führen einige Formen von MEV, wie das Sandwich-Trading, zu einer eindeutig schlechteren Erfahrung für die Nutzer. Nutzer, die „gesandwicht“ werden, sind mit erhöhter Slippage und einer schlechteren Ausführung ihrer Trades konfrontiert.

Auf der Netzwerkebene führen generalisierte Frontrunner und die Gaspreis-Auktionen, an denen sie sich oft beteiligen (wenn zwei oder mehr Frontrunner darum konkurrieren, dass ihre Transaktion in den nächsten Block aufgenommen wird, indem sie den Gaspreis ihrer eigenen Transaktionen schrittweise erhöhen), zu Netzwerküberlastungen und hohen Gaspreisen für alle anderen, die versuchen, reguläre Transaktionen auszuführen.

Über das hinaus, was _innerhalb_ von Blöcken passiert, kann MEV schädliche Auswirkungen _zwischen_ Blöcken haben. Wenn der in einem Block verfügbare MEV die standardmäßige Blockbelohnung deutlich übersteigt, könnten Validatoren einen Anreiz haben, Blöcke zu reorganisieren (Reorg) und den MEV für sich selbst zu erfassen, was zu einer Reorganisation der Blockchain und Instabilität im Konsens führt.

Diese Möglichkeit der Blockchain-Reorganisation wurde [bereits auf der Bitcoin-Blockchain untersucht](https://dl.acm.org/doi/10.1145/2976749.2978408). Da sich die Blockbelohnung von Bitcoin halbiert und Transaktionsgebühren einen immer größeren Teil der Blockbelohnung ausmachen, entstehen Situationen, in denen es für Miner wirtschaftlich rational wird, auf die Belohnung des nächsten Blocks zu verzichten und stattdessen vergangene Blöcke mit höheren Gebühren neu zu minen. Mit dem Wachstum von MEV könnte eine ähnliche Situation bei Ethereum auftreten und die Integrität der Blockchain bedrohen.

## Stand von MEV {#state-of-mev}

Die MEV-Extraktion explodierte Anfang 2021, was in den ersten Monaten des Jahres zu extrem hohen Gaspreisen führte. Das Aufkommen des MEV-Relays von Flashbots hat die Effektivität von generalisierten Frontrunnern verringert und Gaspreis-Auktionen offchain verlagert, was die Gaspreise für normale Nutzer gesenkt hat.

Während viele Searcher immer noch gutes Geld mit MEV verdienen, werden Validatoren, da die Gelegenheiten bekannter werden und immer mehr Searcher um dieselbe Gelegenheit konkurrieren, einen immer größeren Teil der gesamten MEV-Einnahmen erfassen (da die gleiche Art von Gas-Auktionen, wie oben ursprünglich beschrieben, auch bei Flashbots stattfindet, wenn auch privat, und Validatoren die daraus resultierenden Gaseinnahmen erfassen werden). MEV ist auch nicht einzigartig für Ethereum, und da die Gelegenheiten auf Ethereum umkämpfter werden, weichen Searcher auf alternative Blockchains wie die Binance Smart Chain aus, wo ähnliche MEV-Gelegenheiten wie auf Ethereum mit weniger Konkurrenz existieren.

Andererseits verändern der Übergang von Proof-of-Work zu Proof-of-Stake und die laufenden Bemühungen, Ethereum mithilfe von Rollups zu skalieren, die MEV-Landschaft auf eine Weise, die noch etwas unklar ist. Es ist noch nicht genau bekannt, wie garantierte Block-Proposer, die etwas im Voraus bekannt sind, die Dynamik der MEV-Extraktion im Vergleich zum probabilistischen Modell bei Proof-of-Work verändern oder wie dies gestört wird, wenn [Single Secret Leader Election (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) und [Verteilte Validator-Technologie (DVT)](/staking/dvt/) implementiert werden. Ebenso bleibt abzuwarten, welche MEV-Gelegenheiten bestehen, wenn die meiste Nutzeraktivität von Ethereum weg und auf seine Layer 2 (L2) Rollups und Shards verlagert wird.

## MEV in Ethereum Proof-of-Stake (PoS) {#mev-in-ethereum-proof-of-stake}

Wie erklärt, hat MEV negative Auswirkungen auf die allgemeine Nutzererfahrung und die Sicherheit der Konsensschicht. Aber Ethereums Übergang zu einem Proof-of-Stake-Konsens (genannt „der Merge“) birgt potenziell neue MEV-bezogene Risiken:

### Validator-Zentralisierung {#validator-centralization}

Im Post-Merge-Ethereum erzielen Validatoren (nachdem sie Sicherheitsleistungen von 32 ETH hinterlegt haben) einen Konsens über die Gültigkeit von Blöcken, die der Beacon Chain hinzugefügt werden. Da 32 ETH für viele unerschwinglich sein könnten, ist der [Beitritt zu einem Staking-Pool](/staking/pools/) möglicherweise eine praktikablere Option. Dennoch ist eine gesunde Verteilung von [Solo-Stakern](/staking/solo/) ideal, da sie die Zentralisierung von Validatoren abmildert und die Sicherheit von Ethereum verbessert.

Es wird jedoch angenommen, dass die MEV-Extraktion die Zentralisierung von Validatoren beschleunigen kann. Dies liegt zum Teil daran, dass Validatoren [weniger für das Vorschlagen von Blöcken verdienen](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply), als es Miner zuvor taten, weshalb die MEV-Extraktion die [Einnahmen der Validatoren](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) seit [dem Merge](/roadmap/merge/) stark beeinflusst hat.

Größere Staking-Pools werden wahrscheinlich über mehr Ressourcen verfügen, um in notwendige Optimierungen zu investieren, um MEV-Gelegenheiten zu erfassen. Je mehr MEV diese Pools extrahieren, desto mehr Ressourcen haben sie, um ihre MEV-Extraktionsfähigkeiten zu verbessern (und die Gesamteinnahmen zu steigern), was im Wesentlichen [Skaleneffekte](https://www.investopedia.com/terms/e/economiesofscale.asp#) schafft.

Mit weniger Ressourcen zur Verfügung könnten Solo-Staker möglicherweise nicht von MEV-Gelegenheiten profitieren. Dies könnte den Druck auf unabhängige Validatoren erhöhen, sich mächtigen Staking-Pools anzuschließen, um ihre Einnahmen zu steigern, was die Dezentralisierung in Ethereum verringert.

### Erlaubnispflichtige Mempools {#permissioned-mempools}

Als Reaktion auf Sandwiching- und Frontrunning-Angriffe könnten Trader beginnen, offchain-Deals mit Validatoren für die Privatsphäre von Transaktionen abzuschließen. Anstatt eine potenzielle MEV-Transaktion an den öffentlichen Mempool zu senden, sendet der Trader sie direkt an den Validator, der sie in einen Block aufnimmt und die Gewinne mit dem Trader teilt.

„Dark Pools“ sind eine größere Version dieses Arrangements und fungieren als erlaubnispflichtige Mempools mit exklusivem Zugang, die für Nutzer offen sind, die bereit sind, bestimmte Gebühren zu zahlen. Dieser Trend würde die Erlaubnisfreiheit und Vertrauenslosigkeit von Ethereum verringern und die Blockchain potenziell in einen „Pay-to-Play“-Mechanismus verwandeln, der den Höchstbietenden bevorzugt.

Erlaubnispflichtige Mempools würden auch die im vorherigen Abschnitt beschriebenen Zentralisierungsrisiken beschleunigen. Große Pools, die mehrere Validatoren betreiben, werden wahrscheinlich davon profitieren, Tradern und Nutzern Transaktions-Privatsphäre anzubieten, was ihre MEV-Einnahmen erhöht.

Die Bekämpfung dieser MEV-bezogenen Probleme im Post-Merge-Ethereum ist ein zentrales Forschungsgebiet. Bislang sind zwei vorgeschlagene Lösungen zur Verringerung der negativen Auswirkungen von MEV auf die Dezentralisierung und Sicherheit von Ethereum nach dem Merge die [**Proposer-Builder-Trennung (PBS)**](/roadmap/pbs/) und die [**Builder-API**](https://github.com/ethereum/builder-specs).

### Proposer-Builder-Trennung {#proposer-builder-separation}

Sowohl bei Proof-of-Work als auch bei Proof-of-Stake schlägt ein Knoten, der einen Block erstellt, diesen anderen am Konsens teilnehmenden Knoten zur Hinzufügung zur Chain vor. Ein neuer Block wird Teil der kanonischen Chain, nachdem ein anderer Miner darauf aufbaut (bei PoW) oder er Bestätigungen von der Mehrheit der Validatoren erhält (bei PoS).

Die Kombination der Rollen des Blockproduzenten und des Block-Proposers ist es, die die meisten der zuvor beschriebenen MEV-bezogenen Probleme mit sich bringt. Beispielsweise haben Konsensknoten einen Anreiz, Chain-Reorganisationen in [Time-Bandit-Angriffen](https://www.mev.wiki/attack-examples/time-bandit-attack) auszulösen, um die MEV-Einnahmen zu maximieren.

Die [Proposer-Builder-Trennung](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) wurde entwickelt, um die Auswirkungen von MEV abzumildern, insbesondere auf der Konsensschicht. Das Hauptmerkmal von PBS ist die Trennung der Rollen von Blockproduzent und Block-Proposer. Validatoren sind weiterhin dafür verantwortlich, Blöcke vorzuschlagen und darüber abzustimmen, aber eine neue Klasse spezialisierter Entitäten, sogenannte **Block-Builder**, wird mit der Anordnung von Transaktionen und dem Erstellen von Blöcken beauftragt.

Unter PBS erstellt ein Block-Builder ein Transaktionsbündel und gibt ein Gebot für dessen Aufnahme in einen Block der Beacon Chain (als „Ausführungs-Payload“) ab. Der Validator, der ausgewählt wurde, um den nächsten Block vorzuschlagen, prüft dann die verschiedenen Gebote und wählt das Bündel mit der höchsten Gebühr. PBS schafft im Wesentlichen einen Auktionsmarkt, auf dem Builder mit Validatoren verhandeln, die Blockspace verkaufen.

Aktuelle PBS-Designs verwenden ein [Commit-Reveal-Schema](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), bei dem Builder zusammen mit ihren Geboten nur ein kryptografisches Commitment zum Inhalt eines Blocks (Block-Header) veröffentlichen. Nach Annahme des Gewinnergebots erstellt der Proposer einen signierten Block-Vorschlag, der den Block-Header enthält. Vom Block-Builder wird erwartet, dass er den vollständigen Block-Body veröffentlicht, nachdem er den signierten Block-Vorschlag gesehen hat, und er muss außerdem genügend [Bestätigungen](/glossary/#attestation) von Validatoren erhalten, bevor er endgültig ist.

#### Wie mildert die Proposer-Builder-Trennung die Auswirkungen von MEV ab? {#how-does-pbs-curb-mev-impact}

Die protokollinterne Proposer-Builder-Trennung reduziert die Auswirkungen von MEV auf den Konsens, indem sie die MEV-Extraktion aus dem Zuständigkeitsbereich der Validatoren entfernt. Stattdessen werden künftig Block-Builder, die spezialisierte Hardware betreiben, MEV-Gelegenheiten erfassen.

Dies schließt Validatoren jedoch nicht völlig von MEV-bezogenen Einnahmen aus, da Builder hohe Gebote abgeben müssen, damit ihre Blöcke von den Validatoren akzeptiert werden. Da Validatoren jedoch nicht mehr direkt auf die Optimierung von MEV-Einnahmen fokussiert sind, verringert sich die Gefahr von Time-Bandit-Angriffen.

Die Proposer-Builder-Trennung verringert auch die Zentralisierungsrisiken von MEV. Beispielsweise beseitigt die Verwendung eines Commit-Reveal-Schemas die Notwendigkeit für Builder, darauf zu vertrauen, dass Validatoren die MEV-Gelegenheit nicht stehlen oder sie anderen Buildern preisgeben. Dies senkt die Hürde für Solo-Staker, von MEV zu profitieren; andernfalls würden Builder dazu tendieren, große Pools mit Offchain-Reputation zu bevorzugen und Offchain-Deals mit ihnen abzuschließen.

Ebenso müssen Validatoren nicht darauf vertrauen, dass Builder keine Block-Bodies zurückhalten oder ungültige Blöcke veröffentlichen, da die Zahlung bedingungslos ist. Die Gebühr des Validators wird auch dann verarbeitet, wenn der vorgeschlagene Block nicht verfügbar ist oder von anderen Validatoren für ungültig erklärt wird. Im letzteren Fall wird der Block einfach verworfen, was den Block-Builder zwingt, alle Transaktionsgebühren und MEV-Einnahmen zu verlieren.

### Builder-API {#builder-api}

Während die Proposer-Builder-Trennung verspricht, die Auswirkungen der MEV-Extraktion zu verringern, erfordert ihre Implementierung Änderungen am Konsens-Protokoll. Insbesondere müsste die [Fork-Choice](/developers/docs/consensus-mechanisms/pos/#fork-choice)-Regel auf der Beacon Chain aktualisiert werden. Die [Builder-API](https://github.com/ethereum/builder-specs) ist eine temporäre Lösung, die darauf abzielt, eine funktionierende Implementierung der Proposer-Builder-Trennung bereitzustellen, wenn auch mit höheren Vertrauensannahmen.

Die Builder-API ist eine modifizierte Version der [Engine-API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), die von Clients der Konsensschicht verwendet wird, um Ausführungs-Payloads von Ausführungsclients anzufordern. Wie in der [Spezifikation für ehrliche Validatoren](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md) dargelegt, fordern Validatoren, die für Block-Proposing-Aufgaben ausgewählt wurden, ein Transaktionsbündel von einem verbundenen Ausführungsclient an, das sie in den vorgeschlagenen Block der Beacon Chain aufnehmen.

Die Builder-API fungiert auch als Middleware zwischen Validatoren und Clients der Ausführungsschicht; sie unterscheidet sich jedoch dadurch, dass sie es Validatoren auf der Beacon Chain ermöglicht, Blöcke von externen Entitäten zu beziehen (anstatt einen Block lokal mithilfe eines Ausführungsclients zu erstellen).

Nachfolgend finden Sie eine Übersicht darüber, wie die Builder-API funktioniert:

1. Die Builder-API verbindet den Validator mit einem Netzwerk von Block-Buildern, die Ausführungsclients betreiben. Wie bei PBS sind Builder spezialisierte Parteien, die in ressourcenintensives Block-Building investieren und verschiedene Strategien anwenden, um die Einnahmen aus MEV + Prioritäts-Trinkgeldern (Priority Tips) zu maximieren.

2. Ein Validator (der einen Client der Konsensschicht betreibt) fordert Ausführungs-Payloads zusammen mit Geboten aus dem Netzwerk der Builder an. Gebote von Buildern enthalten den Header der Ausführungs-Payload – ein kryptografisches Commitment zum Inhalt der Payload – und eine an den Validator zu zahlende Gebühr.

3. Der Validator prüft die eingehenden Gebote und wählt die Ausführungs-Payload mit der höchsten Gebühr aus. Mithilfe der Builder-API erstellt der Validator einen „blinden“ Beacon-Block-Vorschlag, der nur seine Signatur und den Header der Ausführungs-Payload enthält, und sendet ihn an den Builder.

4. Vom Builder, der die Builder-API ausführt, wird erwartet, dass er mit der vollständigen Ausführungs-Payload antwortet, sobald er den blinden Block-Vorschlag sieht. Dies ermöglicht es dem Validator, einen „signierten“ Beacon-Block zu erstellen, den er im gesamten Netzwerk verbreitet.

5. Von einem Validator, der die Builder-API verwendet, wird weiterhin erwartet, dass er einen Block lokal erstellt, falls der Block-Builder nicht umgehend antwortet, damit er keine Belohnungen für Block-Vorschläge verpasst. Der Validator kann jedoch keinen weiteren Block erstellen, weder mit den nun offengelegten Transaktionen noch mit einem anderen Set, da dies auf eine _Equivocation_ (das Signieren von zwei Blöcken innerhalb desselben Slots) hinauslaufen würde, was ein strafbares Vergehen (Slashing) ist.

Eine beispielhafte Implementierung der Builder-API ist [MEV-Boost](https://github.com/flashbots/mev-boost), eine Verbesserung des [Flashbots-Auktionsmechanismus](https://docs.flashbots.net/flashbots-auction/overview), die entwickelt wurde, um die negativen externen Effekte von MEV auf Ethereum einzudämmen. Die Flashbots-Auktion ermöglicht es Validatoren im Proof-of-Stake, die Arbeit des Erstellens profitabler Blöcke an spezialisierte Parteien, sogenannte **Searcher**, auszulagern.
![A diagram showing the MEV flow in detail](./mev.png)

Searcher suchen nach lukrativen MEV-Gelegenheiten und senden Transaktionsbündel zusammen mit einem [Gebot mit verdecktem Preis](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) für die Aufnahme in den Block an Block-Proposer. Der Validator, der mev-geth ausführt, eine geforkte Version des Go Ethereum (Geth)-Clients, muss nur das Bündel mit dem größten Gewinn auswählen und es als Teil des neuen Blocks aufnehmen. Um Block-Proposer (Validatoren) vor Spam und ungültigen Transaktionen zu schützen, durchlaufen Transaktionsbündel zur Validierung **Relayer**, bevor sie zum Proposer gelangen.

MEV-Boost behält die gleiche Funktionsweise der ursprünglichen Flashbots-Auktion bei, wenn auch mit neuen Funktionen, die für Ethereums Wechsel zu Proof-of-Stake entwickelt wurden. Searcher finden weiterhin profitable MEV-Transaktionen für die Aufnahme in Blöcke, aber eine neue Klasse spezialisierter Parteien, sogenannte **Builder**, ist dafür verantwortlich, Transaktionen und Bündel zu Blöcken zu aggregieren. Ein Builder akzeptiert Gebote mit verdecktem Preis von Searchern und führt Optimierungen durch, um die profitabelste Reihenfolge zu finden.

Der Relayer ist weiterhin dafür verantwortlich, Transaktionsbündel zu validieren, bevor er sie an den Proposer weiterleitet. MEV-Boost führt jedoch **Treuhanddienste (Escrows)** ein, die für die Bereitstellung von [Datenverfügbarkeit](/developers/docs/data-availability/) verantwortlich sind, indem sie von Buildern gesendete Block-Bodies und von Validatoren gesendete Block-Header speichern. Hier fragt ein mit einem Relay verbundener Validator nach verfügbaren Ausführungs-Payloads und verwendet den Sortieralgorithmus von MEV-Boost, um den Payload-Header mit dem höchsten Gebot + MEV-Trinkgeldern auszuwählen.

#### Wie mildert die Builder-API die Auswirkungen von MEV ab? {#how-does-builder-api-curb-mev-impact}

Der Hauptvorteil der Builder-API ist ihr Potenzial, den Zugang zu MEV-Gelegenheiten zu demokratisieren. Die Verwendung von Commit-Reveal-Schemata eliminiert Vertrauensannahmen und senkt die Eintrittsbarrieren für Validatoren, die von MEV profitieren möchten. Dies sollte den Druck auf Solo-Staker verringern, sich in große Staking-Pools zu integrieren, um MEV-Gewinne zu steigern.

Eine weit verbreitete Implementierung der Builder-API wird einen größeren Wettbewerb unter Block-Buildern fördern, was die Zensurresistenz erhöht. Da Validatoren Gebote von mehreren Buildern prüfen, muss ein Builder, der beabsichtigt, eine oder mehrere Nutzertransaktionen zu zensieren, alle anderen nicht zensierenden Builder überbieten, um erfolgreich zu sein. Dies erhöht die Kosten für die Zensur von Nutzern drastisch und schreckt von dieser Praxis ab.

Einige Projekte, wie MEV-Boost, verwenden die Builder-API als Teil einer Gesamtstruktur, die darauf ausgelegt ist, bestimmten Parteien Transaktions-Privatsphäre zu bieten, wie z. B. Tradern, die versuchen, Frontrunning-/Sandwiching-Angriffe zu vermeiden. Dies wird erreicht, indem ein privater Kommunikationskanal zwischen Nutzern und Block-Buildern bereitgestellt wird. Im Gegensatz zu den zuvor beschriebenen erlaubnispflichtigen Mempools ist dieser Ansatz aus folgenden Gründen vorteilhaft:

1. Die Existenz mehrerer Builder auf dem Markt macht Zensur unpraktikabel, was den Nutzern zugutekommt. Im Gegensatz dazu würde die Existenz zentralisierter und vertrauensbasierter Dark Pools die Macht in den Händen weniger Block-Builder konzentrieren und die Möglichkeit der Zensur erhöhen.

2. Die Software der Builder-API ist Open-Source, was es jedem ermöglicht, Block-Builder-Dienste anzubieten. Das bedeutet, dass Nutzer nicht gezwungen sind, einen bestimmten Block-Builder zu verwenden, und verbessert die Neutralität und Erlaubnisfreiheit von Ethereum. Darüber hinaus werden MEV-suchende Trader nicht versehentlich zur Zentralisierung beitragen, indem sie private Transaktionskanäle nutzen.

## Verwandte Ressourcen {#related-resources}

- [Flashbots-Dokumentation](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) – _Tracker mit Echtzeit-Statistiken für MEV-Boost-Relays und Block-Builder_

## Weiterführende Literatur {#further-reading}

- [Was ist Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV und ich](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum ist ein dunkler Wald (Dark Forest)](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Flucht aus dem dunklen Wald](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning der MEV-Krise](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [MEV-Threads von @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Merge-bereite Flashbots-Architektur](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Was ist MEV-Boost?](https://www.alchemy.com/overviews/mev-boost)
- [Warum mev-boost ausführen?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Per Anhalter durch Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)