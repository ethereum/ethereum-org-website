---
title: Maximal extrahierbarer Wert (MEV)
description: "Eine Einführung in den maximal extrahierbaren Wert (MEV)"
lang: de
---

Maximal extrahierbarer Wert (MEV) bezieht sich auf den maximalen Wert, der aus der Blockproduktion über die standardmäßige Block-Belohnung und die Gasgebühren hinaus extrahiert werden kann, indem Transaktionen in einem Block eingeschlossen, ausgeschlossen und in ihrer Reihenfolge geändert werden.

## Maximal extrahierbarer Wert {#maximal-extractable-value}

Der maximal extrahierbare Wert wurde zuerst im Kontext von [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) angewendet und anfangs als „Miner Extractable Value“ (durch Miner extrahierbarer Wert) bezeichnet. Das liegt daran, dass beim Proof-of-Work die Miner das Einschließen, Ausschließen und die Reihenfolge von Transaktionen kontrollieren. Seit dem Übergang zu Proof-of-Stake durch [The Merge](/roadmap/merge) sind jedoch Validatoren für diese Rollen verantwortlich, und Mining ist nicht länger Teil des [Ethereum](/)-Protokolls. Die Methoden zur Wertextraktion existieren jedoch weiterhin, weshalb nun stattdessen der Begriff „Maximal extrahierbarer Wert“ verwendet wird.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie mit [Transaktionen](/developers/docs/transactions/), [Blöcken](/developers/docs/blocks/), [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) und [Gas](/developers/docs/gas/) vertraut sind. Vertrautheit mit [Dapps](/apps/) und [DeFi](/defi/) ist ebenfalls hilfreich.

## MEV-Extraktion {#mev-extraction}

Theoretisch fällt MEV vollständig den Validatoren zu, da sie die einzige Partei sind, die die Ausführung einer profitablen MEV-Gelegenheit garantieren kann. In der Praxis wird jedoch ein großer Teil des MEV von unabhängigen Netzwerk-Teilnehmern extrahiert, die als „Searcher“ (Sucher) bezeichnet werden. Searcher führen komplexe Algorithmen auf Blockchain-Daten aus, um profitable MEV-Gelegenheiten zu erkennen, und nutzen Bots, um diese profitablen Transaktionen automatisch an das Netzwerk zu übermitteln.

Validatoren erhalten dennoch einen Teil des gesamten MEV-Betrags, da Searcher bereit sind, hohe Gasgebühren (die an den Validator gehen) im Austausch für eine höhere Wahrscheinlichkeit der Aufnahme ihrer profitablen Transaktionen in einen Block zu zahlen. Unter der Annahme, dass Searcher wirtschaftlich rational handeln, wird die Gasgebühr, die ein Searcher zu zahlen bereit ist, ein Betrag von bis zu 100 % des MEV des Searchers sein (denn wenn die Gasgebühr höher wäre, würde der Searcher Geld verlieren).

Daher müssen Searcher bei einigen stark umkämpften MEV-Gelegenheiten, wie z. B. [DEX-Arbitrage](#mev-examples-dex-arbitrage), möglicherweise 90 % oder sogar mehr ihrer gesamten MEV-Einnahmen als Gasgebühren an den Validator zahlen, weil so viele Leute denselben profitablen Arbitrage-Handel ausführen wollen. Das liegt daran, dass die einzige Möglichkeit, die Ausführung ihrer Arbitrage-Transaktion zu garantieren, darin besteht, die Transaktion mit dem höchsten Gaspreis einzureichen.

### Gas Golfing {#mev-extraction-gas-golfing}

Diese Dynamik hat dazu geführt, dass es ein Wettbewerbsvorteil ist, gut im „Gas Golfing“ zu sein – dem Programmieren von Transaktionen, sodass sie die geringste Menge an Gas verbrauchen. Dies ermöglicht es Searchern, einen höheren Gaspreis festzulegen und gleichzeitig ihre gesamten Gasgebühren konstant zu halten (da Gasgebühren = Gaspreis \* verbrauchtes Gas).

Einige bekannte Gas-Golf-Techniken umfassen: die Verwendung von Adressen, die mit einer langen Reihe von Nullen beginnen (z. B. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), da sie weniger Platz (und somit Gas) zum Speichern benötigen; und das Belassen kleiner [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token-Guthaben in Verträgen, da es mehr Gas kostet, einen Speicherplatz zu initialisieren (was der Fall ist, wenn das Guthaben 0 beträgt), als einen Speicherplatz zu aktualisieren. Das Finden weiterer Techniken zur Reduzierung des Gasverbrauchs ist ein aktives Forschungsgebiet unter Searchern.

### Generalisierte Frontrunner {#mev-extraction-generalized-frontrunners}

Anstatt komplexe Algorithmen zu programmieren, um profitable MEV-Gelegenheiten zu erkennen, betreiben einige Searcher generalisierte Frontrunner. Generalisierte Frontrunner sind Bots, die den Mempool überwachen, um profitable Transaktionen zu erkennen. Der Frontrunner kopiert den Code der potenziell profitablen Transaktion, ersetzt Adressen durch die Adresse des Frontrunners und führt die Transaktion lokal aus, um zu überprüfen, ob die modifizierte Transaktion zu einem Gewinn für die Adresse des Frontrunners führt. Wenn die Transaktion tatsächlich profitabel ist, reicht der Frontrunner die modifizierte Transaktion mit der ersetzten Adresse und einem höheren Gaspreis ein, wodurch er der ursprünglichen Transaktion zuvorkommt („Frontrunning“) und das MEV des ursprünglichen Searchers erhält.

### Flashbots {#mev-extraction-flashbots}

Flashbots ist ein unabhängiges Projekt, das Ausführungs-Clients um einen Dienst erweitert, der es Searchern ermöglicht, MEV-Transaktionen an Validatoren zu übermitteln, ohne sie dem öffentlichen Mempool preiszugeben. Dies verhindert, dass Transaktionen von generalisierten Frontrunnern überholt werden.

## MEV-Beispiele {#mev-examples}

MEV tritt auf der Blockchain auf verschiedene Weise in Erscheinung.

### DEX-Arbitrage {#mev-examples-dex-arbitrage}

Die Arbitrage an einer [dezentralisierten Börse](/glossary/#dex) (DEX) ist die einfachste und bekannteste MEV-Gelegenheit. Infolgedessen ist sie auch am stärksten umkämpft.

Es funktioniert so: Wenn zwei DEXes einen Token zu zwei verschiedenen Preisen anbieten, kann jemand den Token auf der günstigeren DEX kaufen und ihn auf der teureren DEX in einer einzigen, atomaren Transaktion verkaufen. Dank der Mechanik der Blockchain ist dies echte, risikolose Arbitrage.

[Hier ist ein Beispiel](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) für eine profitable Arbitrage-Transaktion, bei der ein Searcher 1.000 ETH in 1.045 ETH verwandelte, indem er die unterschiedliche Preisgestaltung des ETH/DAI-Paares auf Uniswap im Vergleich zu Sushiswap ausnutzte.

### Liquidationen {#mev-examples-liquidations}

Liquidationen in Kreditprotokollen stellen eine weitere bekannte MEV-Gelegenheit dar.

Kreditprotokolle wie Maker und Aave verlangen von den Nutzern, dass sie Sicherheiten (z. B. ETH) hinterlegen. Diese hinterlegten Sicherheiten werden dann verwendet, um sie an andere Nutzer zu verleihen.

Nutzer können sich dann je nach Bedarf Vermögenswerte und Token von anderen leihen (z. B. könnten Sie MKR leihen, wenn Sie bei einem MakerDAO-Governance-Vorschlag abstimmen möchten), bis zu einem bestimmten Prozentsatz ihrer hinterlegten Sicherheiten. Wenn der Leihbetrag beispielsweise maximal 30 % beträgt, kann ein Nutzer, der 100 DAI in das Protokoll einzahlt, bis zu einem Wert von 30 DAI eines anderen Vermögenswerts leihen. Das Protokoll bestimmt den genauen Prozentsatz der Leihkraft.

Da der Wert der Sicherheiten eines Kreditnehmers schwankt, schwankt auch seine Leihkraft. Wenn aufgrund von Marktschwankungen der Wert der geliehenen Vermögenswerte beispielsweise 30 % des Wertes ihrer Sicherheiten übersteigt (auch hier wird der genaue Prozentsatz durch das Protokoll bestimmt), erlaubt das Protokoll in der Regel jedem, die Sicherheiten zu liquidieren und die Kreditgeber sofort auszuzahlen (dies ist ähnlich wie [Margin Calls](https://www.investopedia.com/terms/m/margincall.asp) im traditionellen Finanzwesen funktionieren). Im Falle einer Liquidation muss der Kreditnehmer in der Regel eine hohe Liquidationsgebühr zahlen, von der ein Teil an den Liquidator geht – und genau hier kommt die MEV-Gelegenheit ins Spiel.

Searcher konkurrieren darum, Blockchain-Daten so schnell wie möglich zu analysieren, um festzustellen, welche Kreditnehmer liquidiert werden können, und die Ersten zu sein, die eine Liquidations-Transaktion einreichen und die Liquidationsgebühr für sich selbst kassieren.

### Sandwich-Trading {#mev-examples-sandwich-trading}

Sandwich-Trading ist eine weitere gängige Methode der MEV-Extraktion.

Für ein Sandwich-Manöver überwacht ein Searcher den Mempool auf große DEX-Trades. Angenommen, jemand möchte 10.000 UNI mit DAI auf Uniswap kaufen. Ein Trade dieser Größenordnung wird eine bedeutende Auswirkung auf das UNI/DAI-Paar haben und möglicherweise den Preis von UNI im Verhältnis zu DAI erheblich in die Höhe treiben.

Ein Searcher kann den ungefähren Preiseffekt dieses großen Trades auf das UNI/DAI-Paar berechnen und eine optimale Kauforder unmittelbar _vor_ dem großen Trade ausführen, um UNI günstig zu kaufen, und dann eine Verkaufsorder unmittelbar _nach_ dem großen Trade ausführen, um sie zu dem durch die große Order verursachten höheren Preis zu verkaufen.

Sandwiching ist jedoch riskanter, da es nicht atomar ist (im Gegensatz zur oben beschriebenen DEX-Arbitrage) und anfällig für einen [Salmonella-Angriff](https://github.com/Defi-Cartel/salmonella) ist.

### NFT-MEV {#mev-examples-nfts}

MEV im NFT-Bereich ist ein aufkommendes Phänomen und nicht zwangsläufig profitabel.

Da NFT-Transaktionen jedoch auf derselben Blockchain stattfinden, die von allen anderen Ethereum-Transaktionen geteilt wird, können Searcher ähnliche Techniken wie bei traditionellen MEV-Gelegenheiten auch auf dem NFT-Markt anwenden.

Wenn es beispielsweise einen beliebten NFT-Drop gibt und ein Searcher ein bestimmtes NFT oder ein Set von NFTs haben möchte, kann er eine Transaktion so programmieren, dass er als Erster in der Schlange steht, um das NFT zu kaufen, oder er kann das gesamte Set von NFTs in einer einzigen Transaktion kaufen. Oder wenn ein NFT [versehentlich zu einem niedrigen Preis gelistet wird](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), kann ein Searcher anderen Käufern zuvorkommen und es günstig ergattern.

Ein prominentes Beispiel für NFT-MEV ereignete sich, als ein Searcher 7 Millionen Dollar ausgab, um [jeden einzelnen Cryptopunk zum Mindestpreis zu kaufen](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs). Ein Blockchain-Forscher [erklärte auf Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538), wie der Käufer mit einem MEV-Anbieter zusammenarbeitete, um seinen Kauf geheim zu halten.

### Der Long Tail {#mev-examples-long-tail}

DEX-Arbitrage, Liquidationen und Sandwich-Trading sind allesamt sehr bekannte MEV-Gelegenheiten und dürften für neue Searcher kaum profitabel sein. Es gibt jedoch einen „Long Tail“ (langen Schwanz) an weniger bekannten MEV-Gelegenheiten (NFT-MEV ist wohl eine solche Gelegenheit).

Searcher, die gerade erst anfangen, könnten mehr Erfolg haben, wenn sie in diesem Long Tail nach MEV suchen. Das [MEV-Job-Board](https://github.com/flashbots/mev-job-board) von Flashbots listet einige aufkommende Gelegenheiten auf.

## Auswirkungen von MEV {#effects-of-mev}

MEV ist nicht nur schlecht – es gibt sowohl positive als auch negative Konsequenzen von MEV auf Ethereum.

### Das Gute {#effects-of-mev-the-good}

Viele DeFi-Projekte verlassen sich auf wirtschaftlich rationale Akteure, um die Nützlichkeit und Stabilität ihrer Protokolle zu gewährleisten. Beispielsweise stellt die DEX-Arbitrage sicher, dass Nutzer die besten und korrektesten Preise für ihre Token erhalten, und Kreditprotokolle sind auf schnelle Liquidationen angewiesen, wenn Kreditnehmer unter die Besicherungsquoten fallen, um sicherzustellen, dass Kreditgeber zurückgezahlt werden.

Ohne rationale Searcher, die wirtschaftliche Ineffizienzen suchen und beheben und die wirtschaftlichen Anreize von Protokollen ausnutzen, wären DeFi-Protokolle und Dapps im Allgemeinen möglicherweise nicht so robust, wie sie es heute sind.

### Das Schlechte {#effects-of-mev-the-bad}

Auf der Anwendungsebene führen einige Formen von MEV, wie das Sandwich-Trading, zu einer eindeutig schlechteren Erfahrung für die Nutzer. Nutzer, die in ein Sandwich geraten, sehen sich mit erhöhter Slippage und einer schlechteren Ausführung ihrer Trades konfrontiert.

Auf der Netzwerkebene führen generalisierte Frontrunner und die Gaspreis-Auktionen, an denen sie sich oft beteiligen (wenn zwei oder mehr Frontrunner darum konkurrieren, dass ihre Transaktion in den nächsten Block aufgenommen wird, indem sie den Gaspreis ihrer eigenen Transaktionen schrittweise erhöhen), zu Netzwerküberlastungen und hohen Gaspreisen für alle anderen, die versuchen, reguläre Transaktionen auszuführen.

Über das hinaus, was _innerhalb_ von Blöcken passiert, kann MEV schädliche Auswirkungen _zwischen_ Blöcken haben. Wenn das in einem Block verfügbare MEV die standardmäßige Block-Belohnung deutlich übersteigt, könnten Validatoren einen Anreiz haben, Blöcke neu zu organisieren (Reorg) und das MEV für sich selbst zu erfassen, was zu einer Reorganisation der Blockchain und Instabilität im Konsens führt.

Diese Möglichkeit der Blockchain-Reorganisation wurde [bereits auf der Bitcoin-Blockchain untersucht](https://dl.acm.org/doi/10.1145/2976749.2978408). Da sich die Block-Belohnung von Bitcoin halbiert und Transaktionsgebühren einen immer größeren Teil der Block-Belohnung ausmachen, entstehen Situationen, in denen es für Miner wirtschaftlich rational wird, auf die Belohnung des nächsten Blocks zu verzichten und stattdessen vergangene Blöcke mit höheren Gebühren neu zu minen. Mit dem Wachstum von MEV könnte eine ähnliche Situation in Ethereum auftreten und die Integrität der Blockchain bedrohen.

## Stand von MEV {#state-of-mev}

Die MEV-Extraktion explodierte Anfang 2021, was in den ersten Monaten des Jahres zu extrem hohen Gaspreisen führte. Das Aufkommen des MEV-Relays von Flashbots hat die Effektivität von generalisierten Frontrunnern verringert und Gaspreis-Auktionen Off-Chain verlagert, was die Gaspreise für normale Nutzer gesenkt hat.

Während viele Searcher immer noch gutes Geld mit MEV verdienen, werden Validatoren, da die Gelegenheiten bekannter werden und immer mehr Searcher um dieselbe Gelegenheit konkurrieren, immer mehr der gesamten MEV-Einnahmen erfassen (da die gleiche Art von Gas-Auktionen, wie ursprünglich oben beschrieben, auch in Flashbots stattfindet, wenn auch privat, und Validatoren die daraus resultierenden Gaseinnahmen erfassen werden). MEV ist auch nicht einzigartig für Ethereum, und da die Gelegenheiten auf Ethereum umkämpfter werden, weichen Searcher auf alternative Blockchains wie die Binance Smart Chain aus, wo ähnliche MEV-Gelegenheiten wie auf Ethereum mit weniger Konkurrenz existieren.

Andererseits verändern der Übergang von Proof-of-Work zu Proof-of-Stake und die laufenden Bemühungen zur Skalierung von Ethereum mithilfe von Rollups die MEV-Landschaft auf eine Weise, die noch etwas unklar ist. Es ist noch nicht genau bekannt, wie die Tatsache, dass garantierte Block-Vorschlagende etwas im Voraus bekannt sind, die Dynamik der MEV-Extraktion im Vergleich zum probabilistischen Modell im Proof-of-Work verändert oder wie dies gestört wird, wenn [Single Secret Leader Election](https://ethresear.ch/t/secret-non-single-leader-election/11789) und [verteilte Validator-Technologie](/staking/dvt/) implementiert werden. Ebenso bleibt abzuwarten, welche MEV-Gelegenheiten existieren, wenn die meiste Nutzeraktivität von Ethereum weg und auf seine Ebene-2-Rollups und Shards verlagert wird.

## MEV in Ethereum Proof-of-Stake (PoS) {#mev-in-ethereum-proof-of-stake}

Wie erklärt, hat MEV negative Auswirkungen auf die allgemeine Nutzererfahrung und die Sicherheit der Konsensebene. Aber Ethereums Übergang zu einem Proof-of-Stake-Konsens (genannt „The Merge“) birgt potenziell neue MEV-bezogene Risiken:

### Zentralisierung der Validatoren {#validator-centralization}

Im Post-Merge-Ethereum erzielen Validatoren (die Sicherheitsleistungen von 32 ETH hinterlegt haben) einen Konsens über die Gültigkeit von Blöcken, die der Beacon Chain hinzugefügt werden. Da 32 ETH für viele unerschwinglich sein könnten, ist der [Beitritt zu einem Staking-Pool](/staking/pools/) möglicherweise eine praktikablere Option. Dennoch ist eine gesunde Verteilung von [Solo-Stakern](/staking/solo/) ideal, da sie die Zentralisierung von Validatoren abmildert und die Sicherheit von Ethereum verbessert.

Es wird jedoch angenommen, dass die MEV-Extraktion in der Lage ist, die Zentralisierung der Validatoren zu beschleunigen. Dies liegt zum Teil daran, dass Validatoren [weniger für das Vorschlagen von Blöcken verdienen](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) als Miner zuvor, weshalb die MEV-Extraktion die [Einnahmen der Validatoren](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) seit [The Merge](/roadmap/merge/) stark beeinflusst hat.

Größere Staking-Pools werden wahrscheinlich über mehr Ressourcen verfügen, um in notwendige Optimierungen zur Erfassung von MEV-Gelegenheiten zu investieren. Je mehr MEV diese Pools extrahieren, desto mehr Ressourcen haben sie, um ihre MEV-Extraktionsfähigkeiten zu verbessern (und die Gesamteinnahmen zu steigern), was im Wesentlichen [Skaleneffekte](https://www.investopedia.com/terms/e/economiesofscale.asp#) schafft.

Mit weniger Ressourcen zur Verfügung könnten Solo-Staker möglicherweise nicht von MEV-Gelegenheiten profitieren. Dies könnte den Druck auf unabhängige Validatoren erhöhen, sich mächtigen Staking-Pools anzuschließen, um ihre Einnahmen zu steigern, was die Dezentralisierung in Ethereum verringert.

### Erlaubnispflichtige Mempools {#permissioned-mempools}

Als Reaktion auf Sandwiching- und Frontrunning-Angriffe könnten Händler beginnen, Off-Chain-Deals mit Validatoren für Transaktionsdatenschutz durchzuführen. Anstatt eine potenzielle MEV-Transaktion an den öffentlichen Mempool zu senden, sendet der Händler sie direkt an den Validator, der sie in einen Block aufnimmt und die Gewinne mit dem Händler teilt.

„Dark Pools“ sind eine größere Version dieses Arrangements und fungieren als erlaubnispflichtige Mempools mit Zugangsbeschränkung, die Nutzern offenstehen, die bereit sind, bestimmte Gebühren zu zahlen. Dieser Trend würde die Erlaubnisfreiheit und Vertrauenslosigkeit von Ethereum verringern und die Blockchain potenziell in einen „Pay-to-Play“-Mechanismus verwandeln, der den Höchstbietenden bevorzugt.

Erlaubnispflichtige Mempools würden auch die im vorherigen Abschnitt beschriebenen Zentralisierungsrisiken beschleunigen. Große Pools, die mehrere Validatoren betreiben, werden wahrscheinlich davon profitieren, Händlern und Nutzern Transaktionsdatenschutz anzubieten, was ihre MEV-Einnahmen erhöht.

Die Bekämpfung dieser MEV-bezogenen Probleme im Post-Merge-Ethereum ist ein Kernbereich der Forschung. Bisher wurden zwei Lösungen vorgeschlagen, um die negativen Auswirkungen von MEV auf die Dezentralisierung und Sicherheit von Ethereum nach The Merge zu reduzieren: [**Proposer-Builder Separation (PBS)**](/roadmap/pbs/) und die [**Builder API**](https://github.com/ethereum/builder-specs).

### Proposer-Builder Separation {#proposer-builder-separation}

Sowohl beim Proof-of-Work als auch beim Proof-of-Stake schlägt ein Blockchain-Knoten, der einen Block erstellt, diesen anderen am Konsens teilnehmenden Blockchain-Knoten zur Hinzufügung zur Kette vor. Ein neuer Block wird Teil der kanonischen Kette, nachdem ein anderer Miner darauf aufbaut (im PoW) oder er Bestätigungen von der Mehrheit der Validatoren erhält (im PoS).

Die Kombination der Rollen des Block-Produzenten und des Block-Vorschlagenden ist es, was die meisten der zuvor beschriebenen MEV-bezogenen Probleme einführt. Beispielsweise haben Konsens-Knoten einen Anreiz, Kettenreorganisationen in [Time-Bandit-Angriffen](https://www.mev.wiki/attack-examples/time-bandit-attack) auszulösen, um die MEV-Einnahmen zu maximieren.

Die [Proposer-Builder Separation](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) wurde entwickelt, um die Auswirkungen von MEV abzumildern, insbesondere auf der Konsensebene. Das Hauptmerkmal von PBS ist die Trennung der Rollen von Block-Produzent und Block-Vorschlagendem. Validatoren sind weiterhin dafür verantwortlich, Blöcke vorzuschlagen und darüber abzustimmen, aber eine neue Klasse spezialisierter Entitäten, sogenannte **Block-Builder**, wird mit der Anordnung von Transaktionen und dem Erstellen von Blöcken beauftragt.

Unter PBS erstellt ein Block-Builder ein Transaktionsbündel und gibt ein Gebot für dessen Aufnahme in einen Beacon Chain-Block ab (als „Ausführungs-Payload“). Der Validator, der ausgewählt wurde, um den nächsten Block vorzuschlagen, prüft dann die verschiedenen Gebote und wählt das Bündel mit der höchsten Gebühr. PBS schafft im Wesentlichen einen Auktionsmarkt, auf dem Builder mit Validatoren verhandeln, die Blockplatz verkaufen.

Aktuelle PBS-Designs verwenden ein [Commit-Reveal-Schema](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), bei dem Builder nur eine kryptografische Verpflichtung auf den Inhalt eines Blocks (Block-Header) zusammen mit ihren Geboten veröffentlichen. Nach Annahme des Gewinnergebots erstellt der Vorschlagende einen signierten Blockvorschlag, der den Block-Header enthält. Es wird erwartet, dass der Block-Builder den vollständigen Blockkörper veröffentlicht, nachdem er den signierten Blockvorschlag gesehen hat, und er muss auch genügend [Bestätigungen](/glossary/#attestation) von Validatoren erhalten, bevor er finalisiert wird.

#### Wie mildert die Proposer-Builder Separation die Auswirkungen von MEV ab? {#how-does-pbs-curb-mev-impact}

Die protokollinterne Proposer-Builder Separation reduziert die Auswirkungen von MEV auf den Konsens, indem sie die MEV-Extraktion aus dem Zuständigkeitsbereich der Validatoren entfernt. Stattdessen werden Block-Builder, die spezialisierte Hardware betreiben, in Zukunft MEV-Gelegenheiten erfassen.

Dies schließt Validatoren jedoch nicht völlig von MEV-bezogenen Einnahmen aus, da Builder hohe Gebote abgeben müssen, damit ihre Blöcke von Validatoren akzeptiert werden. Da Validatoren jedoch nicht mehr direkt auf die Optimierung von MEV-Einnahmen fokussiert sind, verringert sich die Gefahr von Time-Bandit-Angriffen.

Die Proposer-Builder Separation reduziert auch die Zentralisierungsrisiken von MEV. Beispielsweise beseitigt die Verwendung eines Commit-Reveal-Schemas die Notwendigkeit für Builder, darauf zu vertrauen, dass Validatoren die MEV-Gelegenheit nicht stehlen oder sie anderen Buildern preisgeben. Dies senkt die Hürde für Solo-Staker, von MEV zu profitieren; andernfalls würden Builder dazu tendieren, große Pools mit Off-Chain-Reputation zu bevorzugen und Off-Chain-Deals mit ihnen durchzuführen.

Ebenso müssen Validatoren nicht darauf vertrauen, dass Builder keine Blockkörper zurückhalten oder ungültige Blöcke veröffentlichen, da die Zahlung bedingungslos ist. Die Gebühr des Validators wird auch dann verarbeitet, wenn der vorgeschlagene Block nicht verfügbar ist oder von anderen Validatoren für ungültig erklärt wird. Im letzteren Fall wird der Block einfach verworfen, was den Block-Builder zwingt, alle Transaktionsgebühren und MEV-Einnahmen zu verlieren.

### Builder API {#builder-api}

Während die Proposer-Builder Separation verspricht, die Auswirkungen der MEV-Extraktion zu reduzieren, erfordert ihre Implementierung Änderungen am Konsensprotokoll. Insbesondere müsste die [Fork-Choice](/developers/docs/consensus-mechanisms/pos/#fork-choice)-Regel auf der Beacon Chain aktualisiert werden. Die [Builder API](https://github.com/ethereum/builder-specs) ist eine vorübergehende Lösung, die darauf abzielt, eine funktionierende Implementierung der Proposer-Builder Separation bereitzustellen, wenn auch mit höheren Vertrauensannahmen.

Die Builder API ist eine modifizierte Version der [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), die von Konsens-Clients verwendet wird, um Ausführungs-Payloads von Ausführungs-Clients anzufordern. Wie in der [Spezifikation für ehrliche Validatoren](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md) dargelegt, fordern Validatoren, die für Block-Vorschlagsaufgaben ausgewählt wurden, ein Transaktionsbündel von einem verbundenen Ausführungs-Client an, das sie in den vorgeschlagenen Beacon Chain-Block aufnehmen.

Die Builder API fungiert auch als Middleware zwischen Validatoren und Ausführungs-Clients; sie unterscheidet sich jedoch dadurch, dass sie es Validatoren auf der Beacon Chain ermöglicht, Blöcke von externen Entitäten zu beziehen (anstatt einen Block lokal mit einem Ausführungs-Client zu erstellen).

Nachfolgend finden Sie eine Übersicht darüber, wie die Builder API funktioniert:

1. Die Builder API verbindet den Validator mit einem Netzwerk von Block-Buildern, die Ausführungs-Clients betreiben. Wie bei PBS sind Builder spezialisierte Parteien, die in ressourcenintensives Block-Building investieren und verschiedene Strategien anwenden, um die Einnahmen aus MEV + Prioritätstrinkgeldern zu maximieren.

2. Ein Validator (der einen Konsens-Client betreibt) fordert Ausführungs-Payloads zusammen mit Geboten aus dem Netzwerk der Builder an. Gebote von Buildern enthalten den Header des Ausführungs-Payloads – eine kryptografische Verpflichtung auf den Inhalt des Payloads – und eine an den Validator zu zahlende Gebühr.

3. Der Validator prüft die eingehenden Gebote und wählt den Ausführungs-Payload mit der höchsten Gebühr. Mithilfe der Builder API erstellt der Validator einen „blinden“ Beacon-Blockvorschlag, der nur seine Signatur und den Header des Ausführungs-Payloads enthält, und sendet ihn an den Builder.

4. Es wird erwartet, dass der Builder, der die Builder API ausführt, mit dem vollständigen Ausführungs-Payload antwortet, sobald er den blinden Blockvorschlag sieht. Dies ermöglicht es dem Validator, einen „signierten“ Beacon-Block zu erstellen, den er im gesamten Netzwerk verbreitet.

5. Von einem Validator, der die Builder API verwendet, wird weiterhin erwartet, dass er einen Block lokal erstellt, falls der Block-Builder nicht rechtzeitig antwortet, damit er keine Belohnungen für den Blockvorschlag verpasst. Der Validator kann jedoch keinen weiteren Block erstellen, weder mit den nun offengelegten Transaktionen noch mit einem anderen Set, da dies auf _Equivocation_ (das Signieren von zwei Blöcken innerhalb desselben Slots) hinauslaufen würde, was ein Vergehen ist, das mit Slashing bestraft wird.

Eine beispielhafte Implementierung der Builder API ist [MEV Boost](https://github.com/flashbots/mev-boost), eine Verbesserung des [Flashbots-Auktionsmechanismus](https://docs.flashbots.net/flashbots-auction/overview), die entwickelt wurde, um die negativen externen Effekte von MEV auf Ethereum einzudämmen. Die Flashbots-Auktion ermöglicht es Validatoren im Proof-of-Stake, die Arbeit des Erstellens profitabler Blöcke an spezialisierte Parteien, sogenannte **Searcher**, auszulagern.
![Ein Diagramm, das den MEV-Fluss im Detail zeigt](./mev.png)

Searcher suchen nach lukrativen MEV-Gelegenheiten und senden Transaktionsbündel an Block-Vorschlagende zusammen mit einem [verdeckten Gebot](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) für die Aufnahme in den Block. Der Validator, der mev-geth ausführt, eine geforkte Version des go-ethereum (Geth)-Clients, muss nur das Bündel mit dem meisten Gewinn auswählen und es als Teil des neuen Blocks aufnehmen. Um Block-Vorschlagende (Validatoren) vor Spam und ungültigen Transaktionen zu schützen, durchlaufen Transaktionsbündel **Relayer** zur Validierung, bevor sie zum Vorschlagenden gelangen.

MEV Boost behält die gleiche Funktionsweise der ursprünglichen Flashbots-Auktion bei, wenn auch mit neuen Funktionen, die für Ethereums Wechsel zu Proof-of-Stake entwickelt wurden. Searcher finden weiterhin profitable MEV-Transaktionen für die Aufnahme in Blöcke, aber eine neue Klasse spezialisierter Parteien, sogenannte **Builder**, ist dafür verantwortlich, Transaktionen und Bündel zu Blöcken zu aggregieren. Ein Builder akzeptiert verdeckte Gebote von Searchern und führt Optimierungen durch, um die profitabelste Reihenfolge zu finden.

Der Relayer ist weiterhin dafür verantwortlich, Transaktionsbündel zu validieren, bevor er sie an den Vorschlagenden weitergibt. MEV Boost führt jedoch **Treuhanddienste (Escrows)** ein, die für die Bereitstellung von [Datenverfügbarkeit](/developers/docs/data-availability/) verantwortlich sind, indem sie von Buildern gesendete Blockkörper und von Validatoren gesendete Block-Header speichern. Hier fragt ein mit einem Relay verbundener Validator nach verfügbaren Ausführungs-Payloads und verwendet den Sortieralgorithmus von MEV Boost, um den Payload-Header mit dem höchsten Gebot + MEV-Trinkgeldern auszuwählen.

#### Wie mildert die Builder API die Auswirkungen von MEV ab? {#how-does-builder-api-curb-mev-impact}

Der Hauptvorteil der Builder API ist ihr Potenzial, den Zugang zu MEV-Gelegenheiten zu demokratisieren. Die Verwendung von Commit-Reveal-Schemata eliminiert Vertrauensannahmen und senkt die Eintrittsbarrieren für Validatoren, die von MEV profitieren möchten. Dies sollte den Druck auf Solo-Staker verringern, sich in große Staking-Pools zu integrieren, um MEV-Gewinne zu steigern.

Eine weit verbreitete Implementierung der Builder API wird einen größeren Wettbewerb unter Block-Buildern fördern, was die Zensurresistenz erhöht. Da Validatoren Gebote von mehreren Buildern prüfen, muss ein Builder, der beabsichtigt, eine oder mehrere Nutzertransaktionen zu zensieren, alle anderen nicht zensierenden Builder überbieten, um erfolgreich zu sein. Dies erhöht die Kosten für die Zensur von Nutzern drastisch und entmutigt diese Praxis.

Einige Projekte, wie MEV Boost, verwenden die Builder API als Teil einer Gesamtstruktur, die darauf ausgelegt ist, bestimmten Parteien Transaktionsdatenschutz zu bieten, wie z. B. Händlern, die versuchen, Frontrunning-/Sandwiching-Angriffe zu vermeiden. Dies wird erreicht, indem ein privater Kommunikationskanal zwischen Nutzern und Block-Buildern bereitgestellt wird. Im Gegensatz zu den zuvor beschriebenen erlaubnispflichtigen Mempools ist dieser Ansatz aus folgenden Gründen vorteilhaft:

1. Die Existenz mehrerer Builder auf dem Markt macht Zensur unpraktisch, was den Nutzern zugutekommt. Im Gegensatz dazu würde die Existenz zentralisierter und vertrauensbasierter Dark Pools die Macht in den Händen weniger Block-Builder konzentrieren und die Möglichkeit der Zensur erhöhen.

2. Die Builder API-Software ist Open-Source, was es jedem ermöglicht, Block-Builder-Dienste anzubieten. Dies bedeutet, dass Nutzer nicht gezwungen sind, einen bestimmten Block-Builder zu verwenden, und verbessert die Neutralität und Erlaubnisfreiheit von Ethereum. Darüber hinaus werden MEV-suchende Händler nicht versehentlich zur Zentralisierung beitragen, indem sie private Transaktionskanäle nutzen.

## Weiterführende Ressourcen {#related-resources}

- [Flashbots-Dokumentation](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Tracker mit Echtzeit-Statistiken für MEV-Boost-Relays und Block-Builder_

## Weiterführende Literatur {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Merge ready Flashbots Architecture](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [What Is MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Why run mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [The Hitchhikers Guide To Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)