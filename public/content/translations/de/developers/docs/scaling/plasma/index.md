---
title: Plasma-Chains
description: "Eine Einführung in Plasma-Chains als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
incomplete: true
sidebarDepth: 3
---

Eine Plasma-Chain ist eine separate Blockchain, die im [Ethereum](/) Mainnet verankert ist, aber Transaktionen Off-Chain mit einem eigenen Mechanismus zur Blockvalidierung ausführt. Plasma-Chains werden manchmal als „Child“-Chains bezeichnet und sind im Wesentlichen kleinere Kopien des Ethereum Mainnets. Plasma-Chains verwenden [Betrugsnachweise](/glossary/#fraud-proof) (wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/)), um Streitigkeiten zu schlichten.

Merkle-Bäume ermöglichen die Erstellung eines endlosen Stapels dieser Chains, die dazu beitragen können, die Bandbreite von Parent-Chains (einschließlich des Ethereum Mainnets) zu entlasten. Obwohl diese Chains eine gewisse Sicherheit von Ethereum ableiten (über Betrugsnachweise), werden ihre Sicherheit und Effizienz jedoch durch mehrere Designbeschränkungen beeinträchtigt.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein allgemeines Verständnis der [Ethereum-Skalierung](/developers/docs/scaling/) haben.

## Was ist Plasma?

Plasma ist ein Framework zur Verbesserung der Skalierbarkeit in öffentlichen Blockchains wie Ethereum. Wie im ursprünglichen [Plasma-Whitepaper](http://plasma.io/plasma.pdf) beschrieben, werden Plasma-Chains auf einer anderen Blockchain (einer sogenannten „Root-Chain“) aufgebaut. Jede „Child-Chain“ geht von der Root-Chain aus und wird im Allgemeinen durch einen Smart Contract verwaltet, der auf der Parent-Chain bereitgestellt wird.

Der Plasma-Contract fungiert unter anderem als [kettenübergreifende Brücke](/developers/docs/bridges/), die es Benutzern ermöglicht, Vermögenswerte zwischen dem Ethereum Mainnet und der Plasma-Chain zu verschieben. Obwohl sie dadurch [Sidechains](/developers/docs/scaling/sidechains/) ähneln, profitieren Plasma-Chains – zumindest bis zu einem gewissen Grad – von der Sicherheit des Ethereum Mainnets. Dies steht im Gegensatz zu Sidechains, die allein für ihre Sicherheit verantwortlich sind.

## Wie funktioniert Plasma?

Die grundlegenden Komponenten des Plasma-Frameworks sind:

### Off-Chain-Berechnung {#offchain-computation}

Die aktuelle Verarbeitungsgeschwindigkeit von Ethereum ist auf ca. 15–20 Transaktionen pro Sekunde begrenzt, was die kurzfristige Möglichkeit der Skalierung zur Bewältigung von mehr Benutzern verringert. Dieses Problem besteht hauptsächlich, weil der [Konsensmechanismus](/developers/docs/consensus-mechanisms/) von Ethereum erfordert, dass viele Peer-to-Peer-Blockchain-Knoten jede Aktualisierung des Zustands der Blockchain verifizieren.

Obwohl der Konsensmechanismus von Ethereum für die Sicherheit notwendig ist, gilt er möglicherweise nicht für jeden Anwendungsfall. Zum Beispiel muss Alice ihre täglichen Zahlungen an Bob für eine Tasse Kaffee nicht vom gesamten Ethereum-Netzwerk verifizieren lassen, da zwischen beiden Parteien ein gewisses Vertrauen besteht.

Plasma geht davon aus, dass das Ethereum Mainnet nicht alle Transaktionen verifizieren muss. Stattdessen können wir Transaktionen außerhalb des Mainnets verarbeiten und so die Blockchain-Knoten davon befreien, jede Transaktion validieren zu müssen.

Off-Chain-Berechnungen sind notwendig, da Plasma-Chains auf Geschwindigkeit und Kosten optimiert werden können. Zum Beispiel kann eine Plasma-Chain – und das tut sie meistens auch – einen einzigen „Betreiber“ (Operator) verwenden, um die Reihenfolge und Ausführung von Transaktionen zu verwalten. Da nur eine Entität Transaktionen verifiziert, sind die Verarbeitungszeiten auf einer Plasma-Chain schneller als im Ethereum Mainnet.

### Zustandsverpflichtungen (State Commitments) {#state-commitments}

Während Plasma Transaktionen Off-Chain ausführt, werden sie auf der primären Ethereum-Ausführungsebene abgewickelt – andernfalls können Plasma-Chains nicht von den Sicherheitsgarantien von Ethereum profitieren. Aber die Finalisierung von Off-Chain-Transaktionen ohne Kenntnis des Zustands der Plasma-Chain würde das Sicherheitsmodell brechen und die Verbreitung ungültiger Transaktionen ermöglichen. Aus diesem Grund ist der Betreiber, die Entität, die für die Produktion von Blöcken auf der Plasma-Chain verantwortlich ist, verpflichtet, regelmäßig „State Commitments“ auf Ethereum zu veröffentlichen.

Ein [Commitment-Verfahren](https://en.wikipedia.org/wiki/Commitment_scheme) ist eine kryptografische Technik, um sich auf einen Wert oder eine Aussage festzulegen, ohne diese einer anderen Partei preiszugeben. Commitments sind in dem Sinne „bindend“, dass man den Wert oder die Aussage nicht mehr ändern kann, sobald man sich darauf festgelegt hat. State Commitments in Plasma nehmen die Form von „Merkle-Wurzeln“ (abgeleitet von einem [Merkle-Baum](/whitepaper/#merkle-trees)) an, die der Betreiber in regelmäßigen Abständen an den Plasma-Contract auf der Ethereum-Chain sendet.

Merkle-Wurzeln sind kryptografische Primitive, die das Komprimieren großer Informationsmengen ermöglichen. Eine Merkle-Wurzel (in diesem Fall auch „Block-Wurzel“ genannt) könnte alle Transaktionen in einem Block repräsentieren. Merkle-Wurzeln erleichtern es auch zu verifizieren, dass ein kleines Datenstück Teil des größeren Datensatzes ist. Zum Beispiel kann ein Benutzer einen [Merkle-Beweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) erstellen, um die Aufnahme einer Transaktion in einen bestimmten Block zu beweisen.

Merkle-Wurzeln sind wichtig, um Ethereum Informationen über den Off-Chain-Zustand bereitzustellen. Man kann sich Merkle-Wurzeln als „Speicherpunkte“ vorstellen: Der Betreiber sagt: „Dies ist der Zustand der Plasma-Chain zum Zeitpunkt x, und dies ist die Merkle-Wurzel als Beweis.“ Der Betreiber legt sich mit einer Merkle-Wurzel auf den _aktuellen Zustand_ der Plasma-Chain fest, weshalb dies als „State Commitment“ bezeichnet wird.

### Ein- und Ausgänge {#entries-and-exits}

Damit Ethereum-Benutzer die Vorteile von Plasma nutzen können, muss es einen Mechanismus geben, um Gelder zwischen dem Mainnet und den Plasma-Chains zu verschieben. Wir können jedoch nicht willkürlich Ether an eine Adresse auf der Plasma-Chain senden – diese Chains sind inkompatibel, sodass die Transaktion entweder fehlschlagen oder zum Verlust von Geldern führen würde.

Plasma verwendet einen Master-Contract, der auf Ethereum läuft, um Benutzerein- und -ausgänge zu verarbeiten. Dieser Master-Contract ist auch dafür verantwortlich, State Commitments (wie zuvor erklärt) zu verfolgen und unehrliches Verhalten durch Betrugsnachweise zu bestrafen (dazu später mehr).

#### Betreten der Plasma-Chain {#entering-the-plasma-chain}

Um die Plasma-Chain zu betreten, muss Alice (die Benutzerin) ETH oder einen beliebigen ERC-20-Token in den Plasma-Contract einzahlen. Der Plasma-Betreiber, der die Einzahlungen in den Contract überwacht, erstellt einen Betrag in Höhe von Alices ursprünglicher Einzahlung neu und gibt ihn an ihre Adresse auf der Plasma-Chain frei. Alice muss den Erhalt der Gelder auf der Child-Chain bestätigen und kann diese Gelder dann für Transaktionen verwenden.

#### Verlassen der Plasma-Chain {#exiting-the-plasma-chain}

Das Verlassen der Plasma-Chain ist aus mehreren Gründen komplexer als das Betreten. Der wichtigste Grund ist, dass Ethereum zwar Informationen über den Zustand der Plasma-Chain hat, aber nicht verifizieren kann, ob die Informationen wahr sind oder nicht. Ein böswilliger Benutzer könnte eine falsche Behauptung aufstellen („Ich habe 1000 ETH“) und damit durchkommen, indem er gefälschte Beweise liefert, um die Behauptung zu untermauern.

Um böswillige Abhebungen zu verhindern, wird eine „Herausforderungsfrist“ (Challenge Period) eingeführt. Während der Herausforderungsfrist (normalerweise eine Woche) kann jeder eine Abhebungsanforderung mithilfe eines Betrugsnachweises anfechten. Wenn die Anfechtung erfolgreich ist, wird die Abhebungsanforderung abgelehnt.

In der Regel sind die Benutzer jedoch ehrlich und machen korrekte Angaben zu den Geldern, die sie besitzen. In diesem Szenario wird Alice eine Abhebungsanforderung auf der Root-Chain (Ethereum) initiieren, indem sie eine Transaktion an den Plasma-Contract übermittelt.

Sie muss außerdem einen Merkle-Beweis vorlegen, der verifiziert, dass eine Transaktion, die ihre Gelder auf der Plasma-Chain erstellt hat, in einen Block aufgenommen wurde. Dies ist für Iterationen von Plasma wie [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html) erforderlich, die ein [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output)-Modell verwenden.

Andere, wie [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), repräsentieren Gelder als [nicht-fungible Token](/developers/docs/standards/tokens/erc-721/) anstelle von UTXOs. Eine Abhebung erfordert in diesem Fall den Nachweis des Eigentums an Token auf der Plasma-Chain. Dies geschieht durch die Übermittlung der beiden letzten Transaktionen, an denen der Token beteiligt war, und die Bereitstellung eines Merkle-Beweises, der die Aufnahme dieser Transaktionen in einen Block verifiziert.

Der Benutzer muss der Abhebungsanforderung außerdem eine Kaution (Bond) als Garantie für ehrliches Verhalten hinzufügen. Wenn ein Herausforderer beweist, dass Alices Abhebungsanforderung ungültig ist, wird ihre Kaution einem Slashing unterzogen und ein Teil davon geht als Belohnung an den Herausforderer.

Wenn die Herausforderungsfrist verstreicht, ohne dass jemand einen Betrugsnachweis erbringt, gilt Alices Abhebungsanforderung als gültig, sodass sie Einzahlungen aus dem Plasma-Contract auf Ethereum abrufen kann.

### Streitbeilegung {#dispute-arbitration}

Wie jede Blockchain benötigen Plasma-Chains einen Mechanismus zur Durchsetzung der Integrität von Transaktionen für den Fall, dass Teilnehmer böswillig handeln (z. B. Double-Spending von Geldern). Zu diesem Zweck verwenden Plasma-Chains Betrugsnachweise, um Streitigkeiten über die Gültigkeit von Zustandsübergängen zu schlichten und schlechtes Verhalten zu bestrafen. Betrugsnachweise werden als Mechanismus verwendet, durch den eine Plasma-Child-Chain eine Beschwerde bei ihrer Parent-Chain oder der Root-Chain einreicht.

Ein Betrugsnachweis ist einfach die Behauptung, dass ein bestimmter Zustandsübergang ungültig ist. Ein Beispiel ist, wenn ein Benutzer (Alice) versucht, dieselben Gelder zweimal auszugeben. Vielleicht hat sie das UTXO in einer Transaktion mit Bob ausgegeben und möchte dasselbe UTXO (das jetzt Bob gehört) in einer anderen Transaktion ausgeben.

Um die Abhebung zu verhindern, wird Bob einen Betrugsnachweis konstruieren, indem er Beweise dafür liefert, dass Alice das besagte UTXO in einer vorherigen Transaktion ausgegeben hat, sowie einen Merkle-Beweis für die Aufnahme der Transaktion in einen Block. Derselbe Prozess funktioniert in Plasma Cash – Bob müsste den Beweis erbringen, dass Alice die Token, die sie abzuheben versucht, zuvor übertragen hat.

Wenn Bobs Anfechtung erfolgreich ist, wird Alices Abhebungsanforderung storniert. Dieser Ansatz beruht jedoch auf Bobs Fähigkeit, die Chain auf Abhebungsanforderungen zu überwachen. Wenn Bob offline ist, kann Alice die böswillige Abhebung verarbeiten, sobald die Herausforderungsfrist abgelaufen ist.

## Das Mass-Exit-Problem in Plasma {#the-mass-exit-problem-in-plasma}

Das Mass-Exit-Problem tritt auf, wenn eine große Anzahl von Benutzern gleichzeitig versucht, Gelder von einer Plasma-Chain abzuheben. Warum dieses Problem existiert, hat mit einem der größten Probleme von Plasma zu tun: **fehlende Datenverfügbarkeit**.

Datenverfügbarkeit ist die Fähigkeit zu verifizieren, dass die Informationen für einen vorgeschlagenen Block tatsächlich im Blockchain-Netzwerk veröffentlicht wurden. Ein Block ist „nicht verfügbar“, wenn der Produzent den Block selbst veröffentlicht, aber Daten zurückhält, die zur Erstellung des Blocks verwendet wurden.

Blöcke müssen verfügbar sein, damit Blockchain-Knoten den Block herunterladen und die Gültigkeit von Transaktionen verifizieren können. Blockchains stellen die Datenverfügbarkeit sicher, indem sie Blockproduzenten zwingen, alle Transaktionsdaten auf der Blockchain zu veröffentlichen.

Datenverfügbarkeit hilft auch bei der Sicherung von Off-Chain-Skalierungsprotokollen, die auf der Basisschicht von Ethereum aufbauen. Indem Betreiber dieser Chains gezwungen werden, Transaktionsdaten auf Ethereum zu veröffentlichen, kann jeder ungültige Blöcke anfechten, indem er Betrugsnachweise konstruiert, die sich auf den korrekten Zustand der Chain beziehen.

Plasma-Chains speichern Transaktionsdaten in erster Linie beim Betreiber und **veröffentlichen keine Daten im Mainnet** (d. h. außer regelmäßigen State Commitments). Das bedeutet, dass sich Benutzer darauf verlassen müssen, dass der Betreiber Blockdaten bereitstellt, wenn sie Betrugsnachweise erstellen müssen, um ungültige Transaktionen anzufechten. Wenn dieses System funktioniert, können Benutzer jederzeit Betrugsnachweise verwenden, um Gelder zu sichern.

Das Problem beginnt, wenn der Betreiber, und nicht nur irgendein Benutzer, die böswillig handelnde Partei ist. Da der Betreiber die alleinige Kontrolle über die Blockchain hat, hat er einen größeren Anreiz, ungültige Zustandsübergänge in größerem Maßstab voranzutreiben, wie z. B. den Diebstahl von Geldern, die Benutzern auf der Plasma-Chain gehören.

In diesem Fall funktioniert die Verwendung des klassischen Betrugsnachweissystems nicht. Der Betreiber könnte leicht eine ungültige Transaktion durchführen, die die Gelder von Alice und Bob in sein Wallet überträgt, und die Daten verbergen, die zur Erstellung des Betrugsnachweises erforderlich sind. Dies ist möglich, da der Betreiber nicht verpflichtet ist, Daten für Benutzer oder das Mainnet verfügbar zu machen.

Daher ist die optimistischste Lösung der Versuch eines „Mass Exits“ der Benutzer aus der Plasma-Chain. Der Mass Exit verlangsamt den Plan des böswilligen Betreibers, Gelder zu stehlen, und bietet den Benutzern ein gewisses Maß an Schutz. Abhebungsanforderungen werden basierend darauf geordnet, wann jedes UTXO (oder jeder Token) erstellt wurde, was verhindert, dass böswillige Betreiber ehrlichen Benutzern zuvorkommen (Front-Running).

Dennoch benötigen wir eine Möglichkeit, die Gültigkeit von Abhebungsanforderungen während eines Mass Exits zu verifizieren – um zu verhindern, dass opportunistische Personen aus dem Chaos Kapital schlagen, indem sie ungültige Exits verarbeiten. Die Lösung ist einfach: Benutzer müssen den letzten **gültigen Zustand der Chain** veröffentlichen, um ihr Geld abzuheben.

Aber dieser Ansatz hat immer noch Probleme. Wenn beispielsweise alle Benutzer einer Plasma-Chain aussteigen müssen (was im Falle eines böswilligen Betreibers möglich ist), muss der gesamte gültige Zustand der Plasma-Chain auf einmal auf die Basisschicht von Ethereum übertragen werden. Angesichts der beliebigen Größe von Plasma-Chains (hoher Durchsatz = mehr Daten) und der Einschränkungen der Verarbeitungsgeschwindigkeiten von Ethereum ist dies keine ideale Lösung.

Obwohl Exit-Spiele in der Theorie gut klingen, werden Mass Exits im wirklichen Leben wahrscheinlich netzwerkweite Überlastungen auf Ethereum selbst auslösen. Abgesehen von der Beeinträchtigung der Funktionalität von Ethereum bedeutet ein schlecht koordinierter Mass Exit, dass Benutzer möglicherweise keine Gelder abheben können, bevor der Betreiber jedes Konto auf der Plasma-Chain leert.

## Vor- und Nachteile von Plasma {#pros-and-cons-of-plasma}

| Vorteile | Nachteile |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bietet hohen Durchsatz und niedrige Kosten pro Transaktion. | Unterstützt keine allgemeinen Berechnungen (kann keine Smart Contracts ausführen). Nur grundlegende Token-Transfers, Swaps und einige andere Transaktionstypen werden über Prädikatenlogik unterstützt. |
| Gut für Transaktionen zwischen beliebigen Benutzern (kein Overhead pro Benutzerpaar, wenn beide auf der Plasma-Chain etabliert sind). | Man muss das Netzwerk regelmäßig überwachen (Liveness-Anforderung) oder diese Verantwortung an jemand anderen delegieren, um die Sicherheit der Gelder zu gewährleisten. |
| Plasma-Chains können an spezifische Anwendungsfälle angepasst werden, die nichts mit der Main-Chain zu tun haben. Jeder, einschließlich Unternehmen, kann Plasma-Smart-Contracts anpassen, um eine skalierbare Infrastruktur bereitzustellen, die in verschiedenen Kontexten funktioniert. | Verlässt sich auf einen oder mehrere Betreiber, um Daten zu speichern und auf Anfrage bereitzustellen. |
| Reduziert die Last auf dem Ethereum Mainnet, indem Berechnungen und Speicherung Off-Chain verlagert werden. | Abhebungen verzögern sich um mehrere Tage, um Anfechtungen zu ermöglichen. Bei fungiblen Vermögenswerten kann dies durch Liquiditätsanbieter gemildert werden, ist jedoch mit Kapitalkosten verbunden. |
| | Wenn zu viele Benutzer gleichzeitig versuchen auszusteigen, könnte das Ethereum Mainnet überlastet werden. |

## Plasma vs. Ebene 2 Skalierungsprotokolle {#plasma-vs-layer-2}

Während Plasma einst als nützliche Skalierungslösung für Ethereum galt, wurde es inzwischen zugunsten von [Ebene 2 (L2) Skalierungsprotokollen](/layer-2/) aufgegeben. L2-Skalierungslösungen beheben mehrere Probleme von Plasma:

### Effizienz {#efficiency}

[Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups) generieren kryptografische Beweise für die Gültigkeit jedes Stapels von Transaktionen, die Off-Chain verarbeitet werden. Dies hindert die Benutzer (und Betreiber) daran, ungültige Zustandsübergänge voranzutreiben, wodurch die Notwendigkeit von Herausforderungsfristen und Exit-Spielen entfällt. Es bedeutet auch, dass Benutzer die Chain nicht regelmäßig überwachen müssen, um ihre Gelder zu sichern.

### Unterstützung für Smart Contracts {#support-for-smart-contracts}

Ein weiteres Problem mit dem Plasma-Framework war [die Unfähigkeit, die Ausführung von Ethereum-Smart-Contracts zu unterstützen](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Infolgedessen wurden die meisten Implementierungen von Plasma hauptsächlich für einfache Zahlungen oder den Austausch von ERC-20-Token entwickelt.

Im Gegensatz dazu sind Optimistic Rollups mit der [Ethereum Virtual Machine](/developers/docs/evm/) kompatibel und können Ethereum-native [Smart Contracts](/developers/docs/smart-contracts/) ausführen, was sie zu einer nützlichen und _sicheren_ Lösung für die Skalierung [dezentralisierter Anwendungen](/developers/docs/dapps/) macht. Ebenso gibt es Pläne, [eine Zero-Knowledge-Implementierung der EVM (zkEVM) zu erstellen](https://ethresear.ch/t/a-zk-evm-specification/11549), die es ZK-Rollups ermöglichen würde, beliebige Logik zu verarbeiten und Smart Contracts auszuführen.

### Fehlende Datenverfügbarkeit {#data-unavailability}

Wie bereits erklärt, leidet Plasma unter einem Datenverfügbarkeitsproblem. Wenn ein böswilliger Betreiber einen ungültigen Übergang auf der Plasma-Chain vorantreibt, könnten Benutzer diesen nicht anfechten, da der Betreiber Daten zurückhalten kann, die zur Erstellung des Betrugsnachweises erforderlich sind. Rollups lösen dieses Problem, indem sie Betreiber zwingen, Transaktionsdaten auf Ethereum zu veröffentlichen, sodass jeder den Zustand der Chain verifizieren und bei Bedarf Betrugsnachweise erstellen kann.

### Mass-Exit-Problem {#mass-exit-problem}

ZK-Rollups und Optimistic Rollups lösen beide das Mass-Exit-Problem von Plasma auf verschiedene Weise. Zum Beispiel verlässt sich ein ZK-Rollup auf kryptografische Mechanismen, die sicherstellen, dass Betreiber unter keinen Umständen Benutzergelder stehlen können.

Ebenso erlegen Optimistic Rollups Abhebungen eine Verzögerungsfrist auf, während der jeder eine Anfechtung initiieren und böswillige Abhebungsanforderungen verhindern kann. Obwohl dies Plasma ähnelt, besteht der Unterschied darin, dass Verifizierer Zugriff auf Daten haben, die zur Erstellung von Betrugsnachweisen erforderlich sind. Daher besteht für Rollup-Benutzer keine Notwendigkeit, sich an einer hektischen „Wer-zuerst-raus-ist“-Migration zum Ethereum Mainnet zu beteiligen.

## Wie unterscheidet sich Plasma von Sidechains und Sharding? {#plasma-sidechains-sharding}

Plasma, Sidechains und Sharding sind sich ziemlich ähnlich, da sie alle auf irgendeine Weise mit dem Ethereum Mainnet verbunden sind. Das Niveau und die Stärke dieser Verbindungen variieren jedoch, was sich auf die Sicherheitseigenschaften jeder Skalierungslösung auswirkt.

### Plasma vs. Sidechains {#plasma-vs-sidechains}

Eine [Sidechain](/developers/docs/scaling/sidechains/) ist eine unabhängig betriebene Blockchain, die über eine Zwei-Wege-Brücke mit dem Ethereum Mainnet verbunden ist. [Kettenübergreifende Brücken](/bridges/) ermöglichen es Benutzern, Token zwischen den beiden Blockchains auszutauschen, um auf der Sidechain zu transagieren, was die Überlastung im Ethereum Mainnet reduziert und die Skalierbarkeit verbessert.
Sidechains verwenden einen separaten Konsensmechanismus und sind in der Regel viel kleiner als das Ethereum Mainnet. Infolgedessen ist das Überbrücken von Vermögenswerten auf diese Chains mit einem erhöhten Risiko verbunden; angesichts der fehlenden Sicherheitsgarantien, die im Sidechain-Modell vom Ethereum Mainnet geerbt werden, riskieren Benutzer den Verlust von Geldern bei einem Angriff auf die Sidechain.

Im Gegensatz dazu leiten Plasma-Chains ihre Sicherheit vom Mainnet ab. Dies macht sie messbar sicherer als Sidechains. Sowohl Sidechains als auch Plasma-Chains können unterschiedliche Konsensprotokolle haben, aber der Unterschied besteht darin, dass Plasma-Chains Merkle-Wurzeln für jeden Block im Ethereum Mainnet veröffentlichen. Block-Wurzeln sind kleine Informationseinheiten, die wir verwenden können, um Informationen über Transaktionen zu verifizieren, die auf einer Plasma-Chain stattfinden. Wenn ein Angriff auf eine Plasma-Chain stattfindet, können Benutzer ihre Gelder mithilfe der entsprechenden Beweise sicher auf das Mainnet zurückziehen.

### Plasma vs. Sharding {#plasma-vs-sharding}

Sowohl Plasma-Chains als auch Shard-Chains veröffentlichen regelmäßig kryptografische Beweise im Ethereum Mainnet. Beide haben jedoch unterschiedliche Sicherheitseigenschaften.

Shard-Chains übermitteln „Collation-Header“ an das Mainnet, die detaillierte Informationen über jeden Daten-Shard enthalten. Blockchain-Knoten im Mainnet verifizieren und erzwingen die Gültigkeit von Daten-Shards, was die Möglichkeit ungültiger Shard-Übergänge verringert und das Netzwerk vor böswilligen Aktivitäten schützt.

Plasma ist anders, weil das Mainnet nur minimale Informationen über den Zustand von Child-Chains erhält. Das bedeutet, dass das Mainnet Transaktionen, die auf Child-Chains durchgeführt werden, nicht effektiv verifizieren kann, was sie weniger sicher macht.

**Hinweis:** Das Sharding der Ethereum-Blockchain steht nicht mehr auf der Roadmap. Es wurde durch die Skalierung über Rollups und [Danksharding](/roadmap/danksharding) ersetzt.

### Plasma verwenden {#use-plasma}

Mehrere Projekte bieten Implementierungen von Plasma an, die Sie in Ihre Dapps integrieren können:

- [Polygon](https://polygon.technology/) (ehemals Matic Network)

## Weiterführende Literatur {#further-reading}

- [Learn Plasma](https://www.learnplasma.org/en/)
- [Eine kurze Erinnerung daran, was „Shared Security“ bedeutet und warum sie so wichtig ist](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains vs. Plasma vs. Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Plasma verstehen, Teil 1: Die Grundlagen](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Das Leben und Sterben von Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Tutorials: Plasma-Chains auf Ethereum {#tutorials}

- [Schreiben Sie ein App-spezifisches Plasma, das die Privatsphäre wahrt](/developers/tutorials/app-plasma/) _– Erstellen Sie eine datenschutzfreundliche Plasma-Anwendung unter Verwendung von Zero-Knowledge-Beweisen und Off-Chain-Komponenten._