---
title: Maximaler extrahierbarer Wert (MEV)
description: Eine Einführung in den maximal extrahierbaren Wert (MEV)
lang: de
---

Der Maximal extrahierbare Wert (MEV) bezieht sich auf den maximalen Wert, der aus der Blockproduktion extrahiert werden kann und der über die Standard-Blockprämie und die Gasgebühren hinausgeht, indem Transaktionen in einem Block einbezogen, ausgeschlossen oder in der Reihenfolge geändert werden.

### Durch Miner extrahierbarer Wert

Dieses Konzept wurde erstmals im Rahmen des [Arbeitsnachweis](/developers/docs/consensus-mechanisms/pow/) angewandt und anfangs als „miner extractable value" bezeichnet. Das liegt daran, dass beim Arbeitsnachweis die Miner den Einschluss, den Ausschluss und die Reihenfolge von Transaktionen kontrollieren. Nach der Umstellung auf Proof-of-Stake über [Die Zusammenführung](/Upgrades/Merge) werden jedoch die Validierer für diese Rollen verantwortlich sein, und Mining wird nicht mehr möglich sein. Die Methoden der Wertextraktion werden auch nach dieser Umstellung fortbestehen, so dass eine Namensänderung erforderlich war. Um das gleiche Akronym der Kontinuität willen und gleichzeitig die gleiche grundlegende Bedeutung beizubehalten, wird jetzt der „maximal extrahierbare Wert" als umfassenderer Ersatz verwendet.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie mit [Transaktionen](/developers/docs/transactions/), [Blöcken](/developers/docs/blocks/), [Gas](/developers/docs/gas/) und [Mining](/developers/docs/consensus-mechanisms/pow/mining/) vertraut sind. Eine Vertrautheit mit [dApps](/dapps/) und [DeFi](/defi/) ist ebenfalls hilfreich.

## MEV-Extrahierung {#mev-extraction}

Theoretisch kommt MEV ausschließlich den Minern zugute, da Miner die einzige Partei sind, welche die Ausführung einer profitablen MEV-Gelegenheit garantieren kann (zumindest in der aktuellen Proof-of-Work-Kette; dies wird sich nach [Die Zusammenführung](/Upgrades/Merge/) ändern). In der Praxis wird jedoch ein großer Teil des MEV von unabhängigen Netzwerkteilnehmern, den sogenannten „Suchenden", extrahiert Die Suchenden lassen komplexe Algorithmen auf Blockchain-Daten laufen, um profitable MEV-Möglichkeiten zu erkennen, und haben Bots, die diese profitablen Transaktionen automatisch an das Netzwerk übermitteln.

Die Miner erhalten ohnehin einen Teil des vollen MEV-Betrags, weil die Suchenden bereit sind, hohe Gasgebühren zu zahlen (die an die Miner gehen), um im Gegenzug die Wahrscheinlichkeit zu erhöhen, dass ihre profitablen Transaktionen in einen Block aufgenommen werden. Unter der Annahme, dass die Suchenden ökonomisch rational handeln, wird die Gasgebühr, die ein Suchender zu zahlen bereit ist, bis zu 100 % seines MEV betragen (denn wenn die Gasgebühr höher wäre, würde der Suchende Geld verlieren).

Bei einigen stark umkämpften MEV-Möglichkeiten wie [DEX-Arbitrage](#mev-examples-dex-arbitrage) müssen die Suchenden unter Umständen 90 % oder sogar mehr ihrer gesamten MEV-Einnahmen in Form von Gasgebühren an den Miner zahlen, weil so viele Leute denselben profitablen Arbitragehandel betreiben wollen. Denn nur wenn sie das Geschäft mit dem höchsten Gaspreis einreichen, ist gewährleistet, dass ihr Arbitragegeschäft zustande kommt.

### Gas-Golfen {#mev-extraction-gas-golfing}

Diese Dynamik hat dazu geführt, dass das „Gas Golfen" - also das Programmieren von Transaktionen so, dass sie möglichst wenig Gas verbrauchen - zu einem Wettbewerbsvorteil geworden ist, weil es den Suchenden ermöglicht, einen höheren Gaspreis festzulegen und gleichzeitig ihre gesamten Gasgebühren konstant zu halten (da Gasgebühren = Gaspreis \* verbrauchtes Gas).

Einige bekannte Gas-Golf-Techniken sind: Verwenden von Adressen, die mit einer langen Reihe von Nullen beginnen (z. B. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), da sie weniger Platz (und damit Gas) zum Speichern benötigen; und das Belassen kleiner [ERC-20](/developers/docs/standards/tokens/erc-20/)-Token-Guthaben in Verträgen, da es mehr Gas kostet, einen Speicher-Slot zu initialisieren (der Fall, wenn das Guthaben gleich 0 ist), als einen Speicherplatz zu aktualisieren. Die Suche nach weiteren Techniken zur Verringerung des Gasverbrauchs ist ein aktiver Research-Bereich unter den Forschern.

### Generalisierte Vorläufer {#mev-extraction-generalized-frontrunners}

Anstatt komplexe Algorithmen zu programmieren, um gewinnbringende MEV-Möglichkeiten zu erkennen, lassen einige Suchende generalisierte Vorläufer betreiben. Generalisierte Vorläufer sind Bots, die den Mempool beobachten, um profitable Transaktionen zu erkennen. Der Vorläufer kopiert den Code der potenziell profitablen Transaktion, ersetzt die Adressen durch die Adresse des Vorläufers und führt die Transaktion lokal aus, um zu überprüfen, ob die geänderte Transaktion zu einem Gewinn für die Adresse des Vorläufers führt. Wenn die Transaktion tatsächlich rentabel ist, reicht der Vorläufer die geänderte Transaktion mit der ersetzten Adresse und einem höheren Gaspreis ein als den der Original-Transaktion und erhält so den MEV des ursprünglichen Suchenden.

### Flashbots {#mev-extraction-flashbots}

Flashbots ist ein unabhängiges Projekt, das den Go-Ethereum-Client um einen Dienst erweitert, der es Suchenden ermöglicht, MEV-Transaktionen an Miner zu übermitteln, ohne sie dem öffentlichen Mempool zu offenzulegen. Dadurch wird verhindert, dass Transaktionen von allgemeinen Vorläufern ausgeführt werden.

Zum jetzigen Zeitpunkt wird ein erheblicher Teil der MEV-Transaktionen über Flashbots abgewickelt, was bedeutet, dass allgemeine Vorläufer nicht mehr so effektiv sind wie früher.

## MEV-Beispiele {#mev-examples}

Der MEV taucht auf der Blockchain auf mehrere Arten auf.

### DEX-Arbitrage {#mev-examples-dex-arbitrage}

[Decentralized Exchange](/glossary/#dex) (DEX) Arbitrage ist die einfachste und bekannteste MEV-Möglichkeit. Infolgedessen ist sie auch die wettbewerbsfähigste.

Das funktioniert so: Wenn zwei DEX einen Token zu zwei unterschiedlichen Preisen anbieten, kann jemand den Token auf dem DEX mit dem niedrigeren Preis kaufen und auf dem DEX mit dem höheren Preis in einer einzigen, atomaren Transaktion verkaufen. Dank der Mechanik der Blockchain ist dies eine echte, risikolose Arbitrage.

[Hier ist ein Beispiel](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) einer profitablen Arbitrage-Transaktion, bei der ein Suchender 1.000 ETH in 1.045 ETH umwandelte, indem er die unterschiedlichen Preise des Paares ETH/DAI bei Uniswap ggü. Sushiswap ausnutzte.

### Liquidationen {#mev-examples-liquidations}

Eine weitere bekannte MEV-Möglichkeit sind Leihprotokoll-Liquidationen.

Leihprotokolle wie Maker und Aave funktionieren, indem sie von den Nutzern verlangen, eine Art von Sicherheit zu hinterlegen (z.B. ETH). Die Nutzer können sich dann verschiedene Vermögenswerte und Token von anderen leihen, je nachdem, was sie brauchen (zum Beispiel können sie sich MKR leihen, wenn sie über einen Vorschlag der MakerDAO-Governance abstimmen wollen, oder SUSHI, wenn sie einen Teil der Handelsgebühren auf Sushiswap verdienen wollen), und zwar bis zu einem bestimmten Betrag ihrer hinterlegten Sicherheiten - zum Beispiel 30 % (der genaue Prozentsatz der Leihkraft wird durch das Protokoll festgelegt). Die Nutzer, von denen sie sich die anderen Token leihen, fungieren in diesem Fall als Verleiher.

Da der Wert der Sicherheiten eines Kreditnehmers schwankt, ändert sich auch seine Kreditaufnahmefähigkeit. Wenn der Wert der geliehenen Vermögenswerte aufgrund von Marktschwankungen etwa 30 % des Wertes ihrer Sicherheiten übersteigt (auch hier wird der genaue Prozentsatz durch das Protokoll festgelegt), erlaubt das Protokoll in der Regel jedem, die Sicherheiten zu verwerten und die Kreditgeber sofort zu entschädigen (dies ist vergleichbar mit der Funktionsweise von [Margin Calls](https://www.investopedia.com/terms/m/margincall.asp) im traditionellen Finanzwesen). Im Falle einer Liquidation muss der Kreditnehmer in der Regel eine saftige Liquidationsgebühr zahlen, von der ein Teil an den Liquidator geht - hier kommt der MEV ins Spiel.

Die Suchenden konkurrieren darum, die Blockchain-Daten so schnell wie möglich zu analysieren, um festzustellen, welche Kreditnehmer liquidiert werden können, und als Erste eine Liquidationstransaktion einzureichen und die Liquidationsgebühr für sich selbst zu kassieren.

### Der Sandwich-Handel {#mev-examples-sandwich-trading}

Der Sandwich-Handel ist eine weitere gängige Methode der MEV-Extraktion.

Um ein Sandwich zu finden, wird ein Sucher den Mempool nach großen DEX-Geschäften beobachten. Nehmen wir zum Beispiel an, jemand möchte 10.000 UNI mit DAI auf Uniswap kaufen. Ein Handel dieser Größenordnung wird sich erheblich auf das UNI/DAI-Paar auswirken und den Kurs von UNI gegenüber DAI möglicherweise erheblich ansteigen lassen.

Ein Sucher kann die ungefähre Preisauswirkung dieses großen Handels auf das Paar UNI/DAI berechnen und einen optimalen Kaufauftrag unmittelbar _vor_ dem großen Handel ausführen, indem er UNI billig kauft, und dann einen Verkaufsauftrag unmittelbar _nach_ dem großen Handel ausführen, indem er sie zu dem durch den großen Auftrag erzeugten höheren Preis verkauft.

Sandwiching ist jedoch riskanter, da es nicht atomar (im Gegensatz zu DEX-Arbitrage, wie oben beschrieben) und anfällig für einen [Salmonellenangriff](https://github.com/Defi-Cartel/salmonella) ist.

### NFT MEV {#mev-examples-nfts}

MEV im NFT-Raum ist ein neu auftretendes Phänomen, das nicht unbedingt profitabel ist.

Da NEU-Transaktionen jedoch auf derselben Blockchain stattfinden, die auch von allen anderen Ethereum-Transaktionen genutzt wird, können Suchende auch auf dem NFT-Markt ähnliche Techniken wie bei den traditionellen MEV-Möglichkeiten anwenden.

Wenn es beispielsweise eine beliebte NFT-Abgabe gibt und ein Suchender eine bestimmte NFT oder eine Reihe von NFTs haben möchte, kann er eine Transaktion so programmieren, dass er der erste in der Schlange ist, um die NFT zu kaufen, oder er kann die gesamte Reihe von NFTs in einer einzigen Transaktion kaufen. Oder wenn ein NFT [fälschlicherweise zu einem niedrigen Preis](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent) angeboten wird, kann ein Suchender anderen Käufern zuvorkommen und es billig ergattern.

Ein prominentes Beispiel für NFT MEV entstand, als ein Sucher 7 Millionen Dollar ausgab, um [jeden einzelnen Cryptopunk zum Mindestpreis zu kaufen](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5). Ein Blockchain-Forscher [erläuterte auf Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538), wie der Käufer mit einem MEV-Anbieter zusammenarbeitete, um seinen Kauf geheim zu halten.

### Der lange Schwanz {#mev-examples-long-tail}

DEX-Arbitrage, Liquidationen und Sandwich-Trading sind allesamt sehr bekannte MEV-Möglichkeiten, die für neue Suchende wahrscheinlich nicht profitabel sein werden. Es gibt jedoch eine ganze Reihe weniger bekannter MEV-Möglichkeiten (NFT MEV ist wohl eine davon).

Suchende, die gerade erst anfangen, können möglicherweise mehr Erfolg haben, wenn sie nach MEV in diesem längeren Schwanz suchen. Die [MEV-Jobbörse](https://github.com/flashbots/mev-job-board) von Flashbot listet einige neue Möglichkeiten auf.

## Auswirkungen von MEV {#effects-of-mev}

MEV ist nicht nur schlecht - es gibt sowohl positive als auch negative Folgen von MEV auf Ethereum.

### Das Positive {#effects-of-mev-the-good}

Viele DeFi-Projekte sind auf wirtschaftlich rationale Akteure angewiesen, um die Nützlichkeit und Stabilität ihrer Protokolle zu gewährleisten. DEX-Arbitrage stellt zum Beispiel sicher, dass die Nutzer die besten und korrektesten Preise für ihre Token erhalten, und Kreditprotokolle verlassen sich auf schnelle Liquidationen, wenn Kreditnehmer unter die Besicherungsquote fallen, um sicherzustellen, dass die Kreditgeber zurückbezahlt werden.

Ohne rationale Suchende, die nach wirtschaftlichen Ineffizienzen suchen und diese beheben und die wirtschaftlichen Anreize der Protokolle nutzen, könnten DeFi-Protokolle und dApps im Allgemeinen nicht so robust sein, wie sie es heute sind.

### Das Negative {#effects-of-mev-the-bad}

Auf der Anwendungsebene führen einige Formen des MEV, wie der Sandwich-Handel, zu einer eindeutig schlechteren Erfahrung für die Nutzer. Nutzer, die sich in einem „Sandwich" befinden, müssen mit erhöhter Verzögerung und schlechterer Ausführung ihrer Geschäfte rechnen.

Auf der Netzwerkebene führen verallgemeinerte Vorläufer und die von ihnen häufig durchgeführten Gaspreisauktionen (bei denen zwei oder mehr Vorläufer um die Aufnahme ihrer Transaktion in den nächsten Block konkurrieren, indem sie den Gaspreis ihrer eigenen Transaktionen schrittweise erhöhen) zu einer Überlastung des Netzwerks und hohen Gaspreisen für alle anderen, die versuchen, reguläre Transaktionen durchzuführen.

Abgesehen von dem, was _innerhalb_ der Blöcke geschieht, kann MEV auch _zwischen_ den Blöcken schädliche Auswirkungen haben. Wenn der in einem Block verfügbare MEV die Standard-Blockbelohnung deutlich übersteigt, können Miner einen Anreiz haben, Blöcke zu reminen und den MEV für sich selbst einzunehmen, was zu einer Reorganisation der Blockchain und einer Instabilität des Konsenses führt.

Diese Möglichkeit der Reorganisation der Blockchain wurde [bereits bei der Bitcoin-Blockchain](https://dl.acm.org/doi/10.1145/2976749.2978408) untersucht. Da sich die Bitcoin-Blockbelohnung halbiert und die Transaktionsgebühren einen immer größeren Teil der Blockbelohnung ausmachen, entstehen Situationen, in denen es für die Miner wirtschaftlich rational wird, auf die Belohnung des nächsten Blocks zu verzichten und stattdessen vergangene Blöcke mit höheren Gebühren zu bearbeiten. Mit dem Wachstum von MEV könnte die gleiche Situation bei Ethereum eintreten und die Integrität der Blockchain bedrohen.

## Zustand der MEV {#state-of-mev}

Die MEV-Förderung stieg Anfang 2021 sprunghaft an, was in den ersten Monaten des Jahres zu extrem hohen Gaspreisen führte. Das Auftauchen von Flashbots MEV-Relais hat die Effektivität von allgemeinen Vorläufern reduziert und die Gaspreisauktionen aus der Kette genommen, was die Gaspreise für normale Nutzer senkt.

Während viele Suchende immer noch gutes Geld mit MEV verdienen, werden die Miner mit zunehmender Bekanntheit der Gelegenheiten und immer mehr Suchenden, die um dieselbe Gelegenheit konkurrieren, immer mehr MEV-Einnahmen erzielen (weil die gleiche Art von Gasauktionen, wie sie oben beschrieben wurden, auch in Flashbots stattfinden, wenn auch auf privater Basis, und die Miner die daraus resultierenden Gaseinnahmen erzielen). MEV gibt es auch nicht nur bei Ethereum, und da die Möglichkeiten bei Ethereum immer wettbewerbsfähiger werden, weichen die Suchenden auf andere Blockchains wie Binance Smart Chain aus, wo ähnliche MEV-Möglichkeiten wie bei Ethereum bestehen, aber weniger Wettbewerb herrscht.

Mit dem Wachstum und der zunehmenden Beliebtheit von DeFi könnte MEV schon bald die Basisbelohnung eines Ethereum-Blocks deutlich übertreffen. Damit wächst die Möglichkeit, dass egoistische Blöcke zurückbleiben und der Konsens instabil wird. Einige sehen darin eine existenzielle Bedrohung für Ethereum, und die Abschreckung von egoistischem Mining ist ein aktives Forschungsgebiet in der Ethereum-Protokolltheorie. Eine Lösung, die derzeit untersucht wird, ist [MEV-Reward-Smoothing](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Zugehörige Ressourcen {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Dashboard und Live-Transaktions-Explorer für MEV-Transaktionen_

## Weiterführende Informationen {#further-reading}

- [Was ist Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV und ich](https://research.paradigm.xyz/MEV)
- [Ethereum ist ein dunkler Wald](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Flucht aus dem dunklen Wald](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Vorläufer in der MEV-Krise](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmillers MEV-Themen](https://twitter.com/bertcmiller/status/1402665992422047747)
