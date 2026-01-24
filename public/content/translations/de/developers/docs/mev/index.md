---
title: Maximal extrahierbarer Wert (MEV)
description: "Einführung in den maximal extrahierbaren Wert (MEV)"
lang: de
---

Der Maximal extrahierbare Wert (MEV) bezieht sich auf den maximalen Wert, der aus der Blockproduktion extrahiert werden kann und der über die Standard-Blockprämie und die Gasgebühren hinausgeht, indem Transaktionen in einem Block einbezogen, ausgeschlossen oder in der Reihenfolge geändert werden.

## Maximal extrahierbarer Wert {#maximal-extractable-value}

Der maximal extrahierbare Wert wurde erstmals im Kontext von [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) angewendet und zunächst als "von Minern extrahierbarer Wert" bezeichnet. Das liegt daran, dass beim Arbeitsnachweis die Miner den Einschluss, den Ausschluss und die Reihenfolge von Transaktionen kontrollieren. Seit dem Übergang zu Proof-of-Stake durch [The Merge](/roadmap/merge) sind jedoch Validatoren für diese Rollen verantwortlich, und Mining ist kein Bestandteil des Ethereum-Protokolls mehr. Die Methoden zur Wertextraktion existieren allerdings weiterhin, weshalb nun der Begriff "Maximal extrahierbarer Wert" verwendet wird.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie mit [Transaktionen](/developers/docs/transactions/), [Blöcken](/developers/docs/blocks/), [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) und [Gas](/developers/docs/gas/) vertraut sind. Eine Vertrautheit mit [Dapps](/apps/) und [DeFi](/defi/) ist ebenfalls hilfreich.

## MEV-Extraktion {#mev-extraction}

Theoretisch entfällt der MEV vollständig auf die Validator, da sie die einzige Partei sind, die die Ausführung einer gewinnträchtigen MEV-Gelegenheit garantieren können. In der Praxis wird jedoch ein großer Teil des MEV von unabhängigen Netzwerkteilnehmern, den sogenannten „Suchenden", extrahiert Die Suchenden lassen komplexe Algorithmen auf Blockchain-Daten laufen, um profitable MEV-Möglichkeiten zu erkennen, und haben Bots, die diese profitablen Transaktionen automatisch an das Netzwerk übermitteln.

Validatoren erhalten jedoch auf jeden Fall einen Teil der vollen MEV-Summe, da Suchende bereit sind, hohe Gasgebühren (die an die Validator gehen) zu zahlen, um die Wahrscheinlichkeit zu erhöhen, dass ihre gewinnträchtigen Transaktionen in einen Block aufgenommen werden. Unter der Annahme, dass die Suchenden ökonomisch rational handeln, wird die Gasgebühr, die ein Suchender zu zahlen bereit ist, bis zu 100 % seines MEV betragen (denn wenn die Gasgebühr höher wäre, würde der Suchende Geld verlieren).

Bei einigen stark umkämpften MEV-Gelegenheiten, wie der [DEX-Arbitrage](#mev-examples-dex-arbitrage), müssen Searcher möglicherweise 90 % oder sogar mehr ihrer gesamten MEV-Einnahmen als Gasgebühren an den Validator zahlen, da so viele Leute denselben profitablen Arbitrage-Handel durchführen möchten. Denn nur wenn sie das Geschäft mit dem höchsten Gaspreis einreichen, ist gewährleistet, dass ihr Arbitragegeschäft zustande kommt.

### Gas-Golfing {#mev-extraction-gas-golfing}

Diese Dynamik hat dazu geführt, dass das „Gas Golfen" - also das Programmieren von Transaktionen so, dass sie möglichst wenig Gas verbrauchen - zu einem Wettbewerbsvorteil geworden ist, weil es den Suchenden ermöglicht, einen höheren Gaspreis festzulegen und gleichzeitig ihre gesamten Gasgebühren konstant zu halten (da Gasgebühren = Gaspreis \* verbrauchtes Gas).

Einige bekannte Gas-Golfing-Techniken umfassen: die Verwendung von Adressen, die mit einer langen Reihe von Nullen beginnen (z. B. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), da sie weniger Platz (und damit Gas) zum Speichern benötigen; und das Belassen kleiner [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token-Guthaben in Verträgen, da es mehr Gas kostet, einen Speicher-Slot zu initialisieren (der Fall, wenn das Guthaben 0 ist), als einen Speicher-Slot zu aktualisieren. Die Suche nach weiteren Techniken zur Verringerung des Gasverbrauchs ist ein aktiver Research-Bereich unter den Forschern.

### Verallgemeinerte Frontrunner {#mev-extraction-generalized-frontrunners}

Anstatt komplexe Algorithmen zu programmieren, um gewinnbringende MEV-Möglichkeiten zu erkennen, lassen einige Suchende generalisierte Vorläufer betreiben. Generalisierte Vorläufer sind Bots, die den Mempool beobachten, um profitable Transaktionen zu erkennen. Der Vorläufer kopiert den Code der potenziell profitablen Transaktion, ersetzt die Adressen durch die Adresse des Vorläufers und führt die Transaktion lokal aus, um zu überprüfen, ob die geänderte Transaktion zu einem Gewinn für die Adresse des Vorläufers führt. Wenn die Transaktion tatsächlich rentabel ist, reicht der Vorläufer die geänderte Transaktion mit der ersetzten Adresse und einem höheren Gaspreis ein als den der Original-Transaktion und erhält so den MEV des ursprünglichen Suchenden.

### Flashbots {#mev-extraction-flashbots}

Flashbots ist ein unabhängiges Projekt, das Execution-Clients um einen Dienst erweitert, der Suchenden ermöglicht, MEV-Transaktionen direkt an Validator zu senden, ohne sie dem öffentlichen Mempool offenzulegen. Dadurch wird verhindert, dass Transaktionen von allgemeinen Vorläufern ausgeführt werden.

## MEV-Beispiele {#mev-examples}

Der MEV taucht auf der Blockchain auf mehrere Arten auf.

### DEX-Arbitrage {#mev-examples-dex-arbitrage}

Die Arbitrage auf [dezentralen Börsen](/glossary/#dex) (DEX) ist die einfachste und bekannteste MEV-Möglichkeit. Infolgedessen ist sie auch die wettbewerbsfähigste.

Das funktioniert so: Wenn zwei DEX einen Token zu zwei unterschiedlichen Preisen anbieten, kann jemand den Token auf dem DEX mit dem niedrigeren Preis kaufen und auf dem DEX mit dem höheren Preis in einer einzigen, atomaren Transaktion verkaufen. Dank der Mechanik der Blockchain ist dies eine echte, risikolose Arbitrage.

[Hier ist ein Beispiel](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) für eine profitable Arbitrage-Transaktion, bei der ein Searcher 1.000 ETH in 1.045 ETH umwandelte, indem er die unterschiedlichen Preise des ETH/DAI-Paares auf Uniswap im Vergleich zu Sushiswap ausnutzte.

### Liquidationen {#mev-examples-liquidations}

Eine weitere bekannte MEV-Möglichkeit sind Leihprotokoll-Liquidationen.

Kreditprotokolle wie Maker und Aave verlangen von den Nutzern, dass sie eine Sicherheit hinterlegen (z. B. ETH). Diese hinterlegte Sicherheit wird dann genutzt, um sie anderen Nutzern als Kredit auszuzahlen.

Nutzer können dann je nach Bedarf Vermögenswerte und Token von anderen leihen (z. B. könnten Sie MKR leihen, wenn Sie bei einem MakerDAO-Governance-Vorschlag abstimmen möchten), bis zu einem bestimmten Prozentsatz ihrer hinterlegten Sicherheit. Zum Beispiel kann ein Nutzer, der 100 DAI in das Protokoll einzahlt, wenn die maximale Ausleihquote bei 30 % liegt, Assets im Wert von bis zu 30 DAI ausleihen. Das Protokoll legt den genauen Prozentsatz für die Ausleihmöglichkeit fest.

Da der Wert der Sicherheiten eines Kreditnehmers schwankt, ändert sich auch seine Kreditaufnahmefähigkeit. Wenn der Wert der geliehenen Vermögenswerte aufgrund von Marktschwankungen beispielsweise 30 % des Wertes ihrer Sicherheiten übersteigt (auch hier wird der genaue Prozentsatz durch das Protokoll bestimmt), erlaubt das Protokoll in der Regel jedem, die Sicherheiten zu liquidieren und die Kreditgeber sofort auszuzahlen (dies ähnelt der Funktionsweise von [Margin Calls](https://www.investopedia.com/terms/m/margincall.asp) im traditionellen Finanzwesen). Im Falle einer Liquidation muss der Kreditnehmer in der Regel eine saftige Liquidationsgebühr zahlen, von der ein Teil an den Liquidator geht - hier kommt der MEV ins Spiel.

Die Suchenden konkurrieren darum, die Blockchain-Daten so schnell wie möglich zu analysieren, um festzustellen, welche Kreditnehmer liquidiert werden können, und als Erste eine Liquidationstransaktion einzureichen und die Liquidationsgebühr für sich selbst zu kassieren.

### Sandwich-Trading {#mev-examples-sandwich-trading}

Der Sandwich-Handel ist eine weitere gängige Methode der MEV-Extraktion.

Um ein Sandwich zu finden, wird ein Sucher den Mempool nach großen DEX-Geschäften beobachten. Nehmen wir zum Beispiel an, jemand möchte 10.000 UNI mit DAI auf Uniswap kaufen. Ein Handel dieser Größenordnung wird sich erheblich auf das UNI/DAI-Paar auswirken und den Kurs von UNI gegenüber DAI möglicherweise erheblich ansteigen lassen.

Ein Searcher kann die ungefähre Preisauswirkung dieses großen Handels auf das UNI/DAI-Paar berechnen und einen optimalen Kaufauftrag unmittelbar _vor_ dem großen Handel ausführen, UNI billig kaufen, und dann einen Verkaufsauftrag unmittelbar _nach_ dem großen Handel ausführen und es zu dem durch den großen Auftrag verursachten höheren Preis verkaufen.

Sandwiching ist jedoch riskanter, da es nicht atomar ist (im Gegensatz zur oben beschriebenen DEX-Arbitrage) und anfällig für einen [Salmonellenangriff](https://github.com/Defi-Cartel/salmonella) ist.

### NFT-MEV {#mev-examples-nfts}

MEV im NFT-Raum ist ein neu auftretendes Phänomen, das nicht unbedingt profitabel ist.

Da NEU-Transaktionen jedoch auf derselben Blockchain stattfinden, die auch von allen anderen Ethereum-Transaktionen genutzt wird, können Suchende auch auf dem NFT-Markt ähnliche Techniken wie bei den traditionellen MEV-Möglichkeiten anwenden.

Wenn es beispielsweise eine beliebte NFT-Abgabe gibt und ein Suchender eine bestimmte NFT oder eine Reihe von NFTs haben möchte, kann er eine Transaktion so programmieren, dass er der erste in der Schlange ist, um die NFT zu kaufen, oder er kann die gesamte Reihe von NFTs in einer einzigen Transaktion kaufen. Oder wenn ein NFT [versehentlich zu einem niedrigen Preis gelistet wird](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), kann ein Searcher anderen Käufern zuvorkommen und es günstig ergattern.

Ein prominentes Beispiel für NFT-MEV ereignete sich, als ein Searcher 7 Millionen US-Dollar ausgab, um jeden einzelnen Cryptopunk zum Mindestpreis zu [kaufen](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs). Ein Blockchain-Forscher [erläuterte auf Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538), wie der Käufer mit einem MEV-Anbieter zusammenarbeitete, um seinen Kauf geheim zu halten.

### Der Long Tail {#mev-examples-long-tail}

DEX-Arbitrage, Liquidationen und Sandwich-Trading sind allesamt sehr bekannte MEV-Möglichkeiten, die für neue Suchende wahrscheinlich nicht profitabel sein werden. Es gibt jedoch eine ganze Reihe weniger bekannter MEV-Möglichkeiten (NFT MEV ist wohl eine davon).

Suchende, die gerade erst anfangen, können möglicherweise mehr Erfolg haben, wenn sie nach MEV in diesem längeren Schwanz suchen. Flashbots' [MEV-Jobbörse](https://github.com/flashbots/mev-job-board) listet einige neue Möglichkeiten auf.

## Auswirkungen von MEV {#effects-of-mev}

MEV ist nicht nur schlecht - es gibt sowohl positive als auch negative Folgen von MEV auf Ethereum.

### Die guten Seiten {#effects-of-mev-the-good}

Viele DeFi-Projekte sind auf wirtschaftlich rationale Akteure angewiesen, um die Nützlichkeit und Stabilität ihrer Protokolle zu gewährleisten. DEX-Arbitrage stellt zum Beispiel sicher, dass die Nutzer die besten und korrektesten Preise für ihre Token erhalten, und Kreditprotokolle verlassen sich auf schnelle Liquidationen, wenn Kreditnehmer unter die Besicherungsquote fallen, um sicherzustellen, dass die Kreditgeber zurückbezahlt werden.

Ohne rationale Suchende, die nach wirtschaftlichen Ineffizienzen suchen und diese beheben und die wirtschaftlichen Anreize der Protokolle nutzen, könnten DeFi-Protokolle und dApps im Allgemeinen nicht so robust sein, wie sie es heute sind.

### Die schlechten Seiten {#effects-of-mev-the-bad}

Auf der Anwendungsebene führen einige Formen des MEV, wie der Sandwich-Handel, zu einer eindeutig schlechteren Erfahrung für die Nutzer. Nutzer, die sich in einem „Sandwich" befinden, müssen mit erhöhter Verzögerung und schlechterer Ausführung ihrer Geschäfte rechnen.

Auf der Netzwerkebene führen verallgemeinerte Vorläufer und die von ihnen häufig durchgeführten Gaspreisauktionen (bei denen zwei oder mehr Vorläufer um die Aufnahme ihrer Transaktion in den nächsten Block konkurrieren, indem sie den Gaspreis ihrer eigenen Transaktionen schrittweise erhöhen) zu einer Überlastung des Netzwerks und hohen Gaspreisen für alle anderen, die versuchen, reguläre Transaktionen durchzuführen.

Über das Geschehen _innerhalb_ von Blöcken hinaus kann MEV auch _zwischen_ den Blöcken schädliche Auswirkungen haben. Wenn der in einem Block verfügbare MEV die standardmäßige Blockprämie deutlich übersteigt, könnten Validator dazu angereizt werden, Blöcke neu zu organisieren und den MEV für sich selbst zu beanspruchen. Dies führt zu einer Neustrukturierung der Blockchain und zu Instabilität im Konsens.

Diese Möglichkeit der Blockchain-Reorganisation wurde [bereits auf der Bitcoin-Blockchain untersucht](https://dl.acm.org/doi/10.1145/2976749.2978408). Da sich die Bitcoin-Blockbelohnung halbiert und die Transaktionsgebühren einen immer größeren Teil der Blockbelohnung ausmachen, entstehen Situationen, in denen es für die Miner wirtschaftlich rational wird, auf die Belohnung des nächsten Blocks zu verzichten und stattdessen vergangene Blöcke mit höheren Gebühren zu bearbeiten. Mit dem Wachstum von MEV könnte die gleiche Situation bei Ethereum eintreten und die Integrität der Blockchain bedrohen.

## Status von MEV {#state-of-mev}

Die MEV-Förderung stieg Anfang 2021 sprunghaft an, was in den ersten Monaten des Jahres zu extrem hohen Gaspreisen führte. Das Aufkommen von Flashbots' MEV-Relay hat die Effektivität von generalisierten Frontrunnern verringert und Gaspreis-Auktionen offchain verlagert, was die Gaspreise für normale Nutzer senkt.

Während viele Suchende immer noch gutes Geld mit MEV verdienen, führt die zunehmende Bekanntheit der Möglichkeiten und das wachsende Interesse von mehr und mehr Suchenden, die um dieselbe Gelegenheit konkurrieren, dazu, dass Validator einen immer größeren Anteil der gesamten MEV-Einnahmen einfangen werden. (Denn ähnliche Gasauktionen wie oben beschrieben finden auch bei Flashbots statt, wenn auch privat, und Validator erhalten die daraus resultierenden Gaseinnahmen). MEV gibt es auch nicht nur bei Ethereum, und da die Möglichkeiten bei Ethereum immer wettbewerbsfähiger werden, weichen die Suchenden auf andere Blockchains wie Binance Smart Chain aus, wo ähnliche MEV-Möglichkeiten wie bei Ethereum bestehen, aber weniger Wettbewerb herrscht.

Andererseits verändert der Übergang von Proof-of-Work zu Proof-of-Stake sowie die laufenden Bemühungen, Ethereum mithilfe von Rollups zu skalieren, die MEV-Landschaft in noch nicht vollständig absehbarer Weise. Es ist noch nicht genau bekannt, wie das Vorhandensein von garantierten Block-Proposern, die kurz im Voraus bekannt sind, die Dynamik der MEV-Extraktion im Vergleich zum probabilistischen Modell in Proof-of-Work verändert, oder wie dies gestört wird, wenn die [Single Secret Leader Election](https://ethresear.ch/t/secret-non-single-leader-election/11789) und die [Technologie der verteilten Validatoren](/staking/dvt/) implementiert werden. Ebenso bleibt abzuwarten, welche MEV-Möglichkeiten bestehen, wenn die meisten Nutzeraktivitäten von Ethereum auf seine Layer-2-Rollups und Shards verlagert werden.

## MEV in Ethereum Proof-of-Stake (PoS) {#mev-in-ethereum-proof-of-stake}

Wie bereits erläutert, hat MEV negative Auswirkungen auf das Gesamtnutzererlebnis und die Sicherheit der Konsensschicht. Der Übergang von Ethereum zu einem Proof-of-Stake-Konsens (als "The Merge" bekannt) birgt jedoch potenziell neue MEV-bezogene Risiken:

### Validator-Zentralisierung {#validator-centralization}

In der Ära nach dem Merge kommen Validator (die Sicherheitsdepots von 32 ETH hinterlegt haben) zu einem Konsens über die Gültigkeit von Blöcken, die zur Beacon Chain hinzugefügt werden. Da 32 ETH für viele unerreichbar sein könnten, ist der [Beitritt zu einem Staking-Pool](/staking/pools/) möglicherweise eine praktikablere Option. Dennoch ist eine gesunde Verteilung von [Solo-Stakern](/staking/solo/) ideal, da sie die Zentralisierung von Validatoren verringert und die Sicherheit von Ethereum verbessert.

Allerdings wird angenommen, dass die MEV-Extraktion die Zentralisierung von Validatoren beschleunigen kann. Dies liegt zum Teil daran, dass Validatoren [weniger für das Vorschlagen von Blöcken verdienen](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) als Miner zuvor, und die MEV-Extraktion die [Einnahmen der Validatoren](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) seit [The Merge](/roadmap/merge/) stark beeinflusst hat.

Größere Staking-Pools werden wahrscheinlich über mehr Ressourcen verfügen, um notwendige Optimierungen vorzunehmen und so MEV-Möglichkeiten zu nutzen. Je mehr MEV diese Pools extrahieren, desto mehr Ressourcen haben sie, um ihre MEV-Extraktionsfähigkeiten zu verbessern (und den Gesamtumsatz zu steigern), was im Wesentlichen [Skaleneffekte](https://www.investopedia.com/terms/e/economiesofscale.asp#) schafft.

Solo-Staker könnten aufgrund ihrer begrenzten Ressourcen nicht in der Lage sein, von MEV-Möglichkeiten zu profitieren. Dies könnte den Druck auf unabhängige Validatoren erhöhen, sich mächtigen Staking-Pools anzuschließen, um ihre Einnahmen zu steigern, was die Dezentralisierung bei Ethereum verringern könnte.

### Genehmigungspflichtige Mempools {#permissioned-mempools}

Als Reaktion auf Sandwiching- und Frontrunning-Angriffe könnten Trader damit beginnen, zur Wahrung der Transaktions-Privatsphäre Off-Chain-Deals mit Validatoren abzuschließen. Anstatt eine potenzielle MEV-Transaktion an den öffentlichen Mempool zu senden, schickt der Händler sie direkt an den Validator, der sie in einen Block aufnimmt und die Gewinne mit dem Händler teilt.

„Dark Pools“ sind eine größere Version dieser Vereinbarung und fungieren als kontrollierte, nur auf Einladung zugängliche Mempools, die für Nutzer offen sind, die bereit sind, bestimmte Gebühren zu zahlen. Diese Entwicklung würde Ethereums Prinzipien der uneingeschränkten Zugänglichkeit und Vertrauensfreiheit schwächen und könnte die Blockchain potenziell in einen „Pay-to-Play“-Mechanismus verwandeln, der den Höchstbietenden bevorzugt.

Berechtigte Mempools würden zudem die in dem vorherigen Abschnitt beschriebenen Risiken der Zentralisierung weiter verstärken. Große Pools, die mehrere Validatoren betreiben, werden voraussichtlich davon profitieren, Transaktionsprivatsphäre für Händler und Nutzer anzubieten, was ihre MEV-Einnahmen erhöhen wird.

Die Bekämpfung dieser MEV-bezogenen Probleme im post-Merge-Ethereum ist ein zentrales Forschungsgebiet. Bislang wurden zwei Lösungen vorgeschlagen, um die negativen Auswirkungen von MEV auf die Dezentralisierung und Sicherheit von Ethereum nach The Merge zu reduzieren: [**Proposer-Builder Separation (PBS)**](/roadmap/pbs/) und die [**Builder-API**](https://github.com/ethereum/builder-specs).

### Proposer-Builder-Separation {#proposer-builder-separation}

In beiden Systemen, Proof-of-Work und Proof-of-Stake, erstellt ein Node, der einen Block baut, diesen zur Aufnahme in die Blockchain für andere am Konsens teilnehmende Nodes vor. Ein neuer Block wird Teil der kanonischen Kette, nachdem ein anderer Miner darauf aufbaut (im PoW) oder er die Zustimmung der Mehrheit der Validator erhält (im PoS).

Die Kombination der Rollen des Blockproduzenten und des Blockvorschlagenden ist es, die die meisten der zuvor beschriebenen MEV-bezogenen Probleme verursacht. Zum Beispiel erhalten Konsens-Nodes Anreize, Kettenreorganisationen in [Time-Bandit-Angriffen](https://www.mev.wiki/attack-examples/time-bandit-attack) auszulösen, um die MEV-Einnahmen zu maximieren.

Die [Proposer-Builder-Separation](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) wurde entwickelt, um die Auswirkungen von MEV, insbesondere auf der Konsens-Ebene, zu mildern. Ein zentrales Merkmal von PBS ist die Trennung der Rollen des Blockproduzenten und des Blockvorschlagenden. Validatoren sind weiterhin für das Vorschlagen von und Abstimmen über Blöcke verantwortlich, aber eine neue Klasse spezialisierter Entitäten, sogenannte **Block-Builder**, sind mit der Anordnung von Transaktionen und dem Erstellen von Blöcken beauftragt.

Bei PBS erstellt ein Block-Builder ein Transaktionspaket und platziert ein Gebot für dessen Aufnahme in einen Beacon-Chain-Block (als „execution payload“). Der Validator, der für den Vorschlag des nächsten Blocks ausgewählt wurde, überprüft die verschiedenen Gebote und wählt das Paket mit der höchsten Gebühr aus. PBS schafft im Wesentlichen einen Auktionsmarkt, auf dem Builder mit Validatoren verhandeln, die Blockspace verkaufen.

Aktuelle PBS-Designs verwenden ein [Commit-Reveal-Schema](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), bei dem Builder nur eine kryptografische Verpflichtung zum Inhalt eines Blocks (Block-Header) zusammen mit ihren Geboten veröffentlichen. Nachdem das höchste Gebot akzeptiert wurde, erstellt der Proposer einen signierten Blockvorschlag, der den Blockheader enthält. Der Block-Builder wird voraussichtlich den vollständigen Block-Body veröffentlichen, nachdem er den signierten Block-Vorschlag gesehen hat, und er muss auch genügend [Attestierungen](/glossary/#attestation) von Validatoren erhalten, bevor er finalisiert wird.

#### Wie mildert die Trennung von Proposer und Builder (PBS) die Auswirkungen von MEV? {#how-does-pbs-curb-mev-impact}

Die Trennung von Proposer und Builder im Protokoll reduziert die Auswirkungen von MEV auf den Konsens, indem die MEV-Extraktion aus dem Aufgabenbereich der Validator-Nodes entfernt wird. Stattdessen werden Block-Builders, die spezialisierte Hardware betreiben, zukünftig die MEV-Gelegenheiten nutzen.

Dies schließt Validator-Nodes jedoch nicht vollständig von MEV-bezogenen Einnahmen aus, da Builder hohe Gebote abgeben müssen, damit ihre Blöcke von den Validatoren akzeptiert werden. Dennoch verringert sich durch die Trennung die Bedrohung durch Time-Bandit-Angriffe, da Validator-Nodes sich nicht mehr direkt auf die Maximierung von MEV-Einnahmen konzentrieren.

Die Trennung von Proposer und Builder reduziert zudem die Zentralisierungsrisiken durch MEV. Zum Beispiel entfällt durch das Commit-Reveal-Verfahren die Notwendigkeit, dass Builder den Validatoren vertrauen müssen, die MEV-Gelegenheit nicht zu stehlen oder sie anderen Buildern offenzulegen. Dies senkt die Hürde für Solo-Staker, von MEV zu profitieren. Andernfalls würden Builder dazu tendieren, große Pools mit Off-Chain-Reputation zu bevorzugen und mit ihnen Off-Chain-Deals abzuschließen.

Ebenso müssen Validator keine Builder vertrauen, dass diese Blockinhalte nicht zurückhalten oder ungültige Blöcke veröffentlichen, da die Zahlung unbedingt erfolgt. Die Gebühr für den Validator wird dennoch verarbeitet, selbst wenn der vorgeschlagene Block nicht verfügbar ist oder von anderen Validatoren als ungültig erklärt wird. Im letzteren Fall wird der Block einfach verworfen, was den Block-Buildern zwingt, alle Transaktionsgebühren und MEV-Einnahmen zu verlieren.

### Builder-API {#builder-api}

Während die Trennung von Proposer und Builder (PBS) verspricht, die Auswirkungen der MEV-Extraktion zu reduzieren, erfordert ihre Implementierung Änderungen am Konsensprotokoll. Insbesondere müsste die [Fork-Choice](/developers/docs/consensus-mechanisms/pos/#fork-choice)-Regel in der Beacon Chain aktualisiert werden. Die [Builder-API](https://github.com/ethereum/builder-specs) ist eine temporäre Lösung, die darauf abzielt, eine funktionierende Implementierung der Proposer-Builder-Separation bereitzustellen, wenn auch mit höheren Vertrauensannahmen.

Die Builder-API ist eine modifizierte Version der [Engine-API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), die von Clients der Konsens-Ebene verwendet wird, um Ausführungsnutzlasten von Clients der Ausführungsebene anzufordern. Wie in der [Spezifikation für ehrliche Validatoren](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md) beschrieben, fordern die für das Vorschlagen von Blöcken ausgewählten Validatoren ein Transaktionsbündel von einem verbundenen Ausführungs-Client an, das sie in den vorgeschlagenen Beacon-Chain-Block aufnehmen.

Die Builder-API fungiert ebenfalls als Middleware zwischen Validatoren und Execution-Layer-Clients; sie unterscheidet sich jedoch dadurch, dass sie es Validatoren auf der Beacon Chain ermöglicht, Blöcke von externen Entitäten zu beziehen (anstatt einen Block lokal mithilfe eines Execution-Clients zu erstellen).

Im Folgenden finden Sie einen Überblick darüber, wie die Builder-API funktioniert:

1. Die Builder-API verbindet den Validator mit einem Netzwerk von Block-Buildern, die Execution-Layer-Clients betreiben. Wie bei PBS sind Builder spezialisierte Akteure, die in die ressourcenintensive Erstellung von Blöcken (Block-Building) investieren und unterschiedliche Strategien anwenden, um die Einnahmen aus MEV und Priority Tips zu maximieren.

2. Ein Validator (der einen Consensus-Layer-Client ausführt) fordert Execution Payloads zusammen mit Geboten vom Netzwerk der Builder an. Die Gebote der Builder werden den Execution Payload Header – eine kryptografische Verpflichtung auf den Inhalt des Payloads – sowie eine Gebühr für den Validator enthalten.

3. Der Validator überprüft die eingehenden Gebote und wählt den Execution Payload mit der höchsten Gebühr aus. Mithilfe der Builder API erstellt der Validator einen „geblindeten“ Beacon-Block-Vorschlag, der nur seine Signatur und den Execution Payload Header enthält, und sendet diesen an den Builder.

4. Es wird erwartet, dass der Builder, der die Builder API betreibt, mit dem vollständigen Execution Payload antwortet, sobald er den „geblindeten“ Block-Vorschlag sieht. Dies ermöglicht es dem Validator, einen „signierten“ Beacon-Block zu erstellen, den er im gesamten Netzwerk verbreitet.

5. Es wird von einem Validator, der die Builder API verwendet, dennoch erwartet, dass er lokal einen Block erstellt, falls der Block-Builder nicht rechtzeitig antwortet, damit ihm die Belohnungen für den Block-Vorschlag nicht entgehen. Der Validator kann jedoch keinen weiteren Block erstellen, weder unter Verwendung der nun aufgedeckten Transaktionen noch eines anderen Satzes, da dies einer _Äquivokation_ (Unterzeichnung zweier Blöcke innerhalb desselben Slots) gleichkäme, was ein slashbares Vergehen ist.

Eine beispielhafte Implementierung der Builder-API ist [MEV Boost](https://github.com/flashbots/mev-boost), eine Verbesserung des [Flashbots-Auktionsmechanismus](https://docs.flashbots.net/Flashbots-auction/overview), der entwickelt wurde, um die negativen externen Effekte von MEV auf Ethereum einzudämmen. Die Flashbots-Auktion ermöglicht es Validatoren in Proof-of-Stake, die Arbeit des Erstellens profitabler Blöcke an spezialisierte Parteien, sogenannte **Searcher**, auszulagern.
![Ein Diagramm, das den MEV-Fluss im Detail zeigt](./mev.png)

Searcher suchen nach lukrativen MEV-Möglichkeiten und senden Transaktionsbündel zusammen mit einem [verdeckten Preisgebot](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) zur Aufnahme in den Block an die Block-Proposer. Der Validator, der mev-geth – eine geforkte Version des go-ethereum (Geth) Clients – verwendet, muss nur das Bündel mit dem höchsten Gewinn auswählen und es als Teil des neuen Blocks einfügen. Um Block-Proposer (Validatoren) vor Spam und ungültigen Transaktionen zu schützen, durchlaufen Transaktionsbündel zur Validierung **Relayer**, bevor sie zum Proposer gelangen.

MEV Boost behält die gleiche Funktionsweise der ursprünglichen Flashbots-Auktion bei, wenn auch mit neuen Funktionen, die für Ethereums Umstellung auf Proof-of-Stake entwickelt wurden. Searcher finden weiterhin profitable MEV-Transaktionen für die Aufnahme in Blöcke, aber eine neue Klasse von spezialisierten Parteien, sogenannte **Builder**, sind für die Aggregation von Transaktionen und Bündeln in Blöcken verantwortlich. Ein Builder akzeptiert verdeckte Preisgebote von Searchern und führt Optimierungen durch, um die profitabelste Anordnung zu finden.

Der Relayer ist weiterhin dafür verantwortlich, Transaktionsbündel zu validieren, bevor er sie an den Proposer weitergibt. MEV-Boost führt jedoch **Escrows** ein, die für die Bereitstellung der [Datenverfügbarkeit](/developers/docs/data-availability/) verantwortlich sind, indem sie von Buildern gesendete Block-Bodys und von Validatoren gesendete Block-Header speichern. Hier fragt ein Validator, der mit einem Relay verbunden ist, nach verfügbaren Execution Payloads und nutzt den Anordnungsalgorithmus von MEV Boost, um den Payload Header mit dem höchsten Gebot plus MEV-Tips auszuwählen.

#### Wie mildert die Builder-API die Auswirkungen von MEV? {#how-does-builder-api-curb-mev-impact}

Der Hauptvorteil der Builder-API liegt in ihrem Potenzial, den Zugang zu MEV-Möglichkeiten zu demokratisieren. Die Verwendung von Commit-Reveal-Verfahren beseitigt Vertrauensannahmen und senkt die Einstiegshürden für Validatoren, die von MEV profitieren möchten. Dies sollte den Druck auf Solo-Staker verringern, sich großen Staking-Pools anzuschließen, um die MEV-Gewinne zu steigern.

Eine flächendeckende Implementierung der Builder-API wird einen größeren Wettbewerb unter den Block-Buildern fördern, was die Zensurresistenz erhöht. Da Validatoren die Gebote von mehreren Buildern prüfen, muss ein Builder mit Zensurabsicht alle anderen, nicht zensierenden Builder überbieten, um erfolgreich zu sein. Dies erhöht die Kosten für die Zensur von Nutzern drastisch und schreckt von dieser Praxis ab.

Einige Projekte wie MEV Boost nutzen die Builder-API als Teil einer Gesamtstruktur, die darauf ausgelegt ist, bestimmten Akteuren (etwa Tradern, die Frontrunning- und Sandwiching-Angriffe vermeiden wollen) Transaktions-Privatsphäre zu gewährleisten. Dies wird durch die Bereitstellung eines privaten Kommunikationskanals zwischen Nutzern und Block-Buildern erreicht. Im Gegensatz zu den zuvor beschriebenen, berechtigungsbasierten Mempools ist dieser Ansatz aus den folgenden Gründen vorteilhaft:

1. Die Existenz mehrerer Builder auf dem Markt macht eine Zensur unpraktikabel, was den Nutzern zugutekommt. Im Gegensatz dazu würde die Existenz von zentralisierten und vertrauensbasierten Dark Pools die Macht in den Händen weniger Block-Builder konzentrieren und die Möglichkeit einer Zensur erhöhen.

2. Die Software der Builder-API ist Open-Source, was es jedem ermöglicht, Block-Builder-Dienste anzubieten. Dies bedeutet, dass Nutzer nicht gezwungen sind, einen bestimmten Block-Builder zu verwenden, was die Neutralität und Erlaubnisfreiheit von Ethereum verbessert. Darüber hinaus werden MEV-suchende Trader nicht unbeabsichtigt zur Zentralisierung beitragen, indem sie private Transaktionskanäle nutzen.

## Zugehörige Ressourcen {#related-resources}

- [Flashbots-Dokumentation](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) – _Tracker mit Echtzeit-Statistiken für MEV-Boost-Relays und Block-Builder_

## Weiterführende Lektüre {#further-reading}

- [Was ist Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV und ich](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum ist ein dunkler Wald](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Flucht aus dem dunklen Wald](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning der MEV-Krise](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmillers MEV-Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Merge-fähige Flashbots-Architektur](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Was ist MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Warum mev-boost ausführen?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Per Anhalter durch die Ethereum-Galaxis](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
