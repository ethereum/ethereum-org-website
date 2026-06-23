---
title: Plasma-Chains
description: "Eine Einführung in Plasma-Chains als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
incomplete: true
sidebarDepth: 3
---

Eine Plasma-Chain ist eine separate Blockchain, die im [Ethereum](/) Mainnet verankert ist, aber Transaktionen offchain mit ihrem eigenen Mechanismus zur Blockvalidierung ausführt. Plasma-Chains werden manchmal als „Child“-Chains bezeichnet, im Wesentlichen kleinere Kopien des Ethereum Mainnets. Plasma-Chains verwenden [Betrugsnachweise (Fraud Proofs)](/glossary/#fraud-proof) (wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/)), um Streitigkeiten zu schlichten.

Merkle-Bäume ermöglichen die Erstellung eines endlosen Stapels dieser Chains, die dazu dienen können, die Bandbreite von Parent-Chains (einschließlich des Ethereum Mainnets) zu entlasten. Obwohl diese Chains jedoch eine gewisse Sicherheit von Ethereum (über Betrugsnachweise) ableiten, werden ihre Sicherheit und Effizienz durch mehrere Designbeschränkungen beeinträchtigt.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein allgemeines Verständnis der [Ethereum-Skalierung](/developers/docs/scaling/) haben.

## Was ist Plasma? {#what-is-plasma}

Plasma ist ein Framework zur Verbesserung der Skalierbarkeit in öffentlichen Blockchains wie Ethereum. Wie im ursprünglichen [Plasma-Whitepaper](https://plasma.io/plasma.pdf) beschrieben, werden Plasma-Chains auf einer anderen Blockchain (einer sogenannten „Root-Chain“) aufgebaut. Jede „Child-Chain“ geht von der Root-Chain aus und wird im Allgemeinen von einem Smart Contract verwaltet, der auf der Parent-Chain bereitgestellt wird.

Der Plasma-Vertrag fungiert unter anderem als [Brücke](/developers/docs/bridges/), die es Benutzern ermöglicht, Vermögenswerte zwischen dem Ethereum Mainnet und der Plasma-Chain zu verschieben. Obwohl sie dadurch [Sidechains](/developers/docs/scaling/sidechains/) ähneln, profitieren Plasma-Chains – zumindest bis zu einem gewissen Grad – von der Sicherheit des Ethereum Mainnets. Dies steht im Gegensatz zu Sidechains, die allein für ihre Sicherheit verantwortlich sind.

## Wie funktioniert Plasma? {#how-does-plasma-work}

Die grundlegenden Komponenten des Plasma-Frameworks sind:

### Offchain-Berechnung {#offchain-computation}

Die aktuelle Verarbeitungsgeschwindigkeit von Ethereum ist auf ca. 15-20 Transaktionen pro Sekunde begrenzt, was die kurzfristige Möglichkeit einer Skalierung zur Bewältigung von mehr Benutzern verringert. Dieses Problem besteht hauptsächlich, weil der [Konsensmechanismus](/developers/docs/consensus-mechanisms/) von Ethereum erfordert, dass viele Peer-to-Peer-Knoten jede Aktualisierung des Zustands der Blockchain verifizieren.

Obwohl der Konsensmechanismus von Ethereum für die Sicherheit notwendig ist, gilt er möglicherweise nicht für jeden Anwendungsfall. Zum Beispiel muss Alice ihre täglichen Zahlungen an Bob für eine Tasse Kaffee möglicherweise nicht vom gesamten Ethereum-Netzwerk verifizieren lassen, da zwischen beiden Parteien ein gewisses Vertrauen besteht.

Plasma geht davon aus, dass das Ethereum Mainnet nicht alle Transaktionen verifizieren muss. Stattdessen können wir Transaktionen außerhalb des Mainnets verarbeiten und so die Knoten davon befreien, jede Transaktion validieren zu müssen.

Offchain-Berechnungen sind notwendig, da Plasma-Chains auf Geschwindigkeit und Kosten optimiert werden können. Zum Beispiel kann eine Plasma-Chain – und das tut sie meistens auch – einen einzigen „Betreiber“ (Operator) verwenden, um die Reihenfolge und Ausführung von Transaktionen zu verwalten. Da nur eine Entität Transaktionen verifiziert, sind die Verarbeitungszeiten auf einer Plasma-Chain schneller als im Ethereum Mainnet.

### Zustands-Commitments {#state-commitments}

Während Plasma Transaktionen offchain ausführt, werden sie auf der primären Ethereum-Ausführungsschicht abgewickelt – andernfalls können Plasma-Chains nicht von den Sicherheitsgarantien von Ethereum profitieren. Aber das Finalisieren von Offchain-Transaktionen ohne Kenntnis des Zustands der Plasma-Chain würde das Sicherheitsmodell brechen und die Verbreitung ungültiger Transaktionen ermöglichen. Aus diesem Grund ist der Betreiber, die für die Produktion von Blöcken auf der Plasma-Chain verantwortliche Entität, verpflichtet, regelmäßig „Zustands-Commitments“ auf Ethereum zu veröffentlichen.

Ein [Commitment-Verfahren](https://en.wikipedia.org/wiki/Commitment_scheme) ist eine kryptografische Technik, um sich auf einen Wert oder eine Aussage festzulegen, ohne sie einer anderen Partei preiszugeben. Commitments sind in dem Sinne „bindend“, dass Sie den Wert oder die Aussage nicht mehr ändern können, sobald Sie sich darauf festgelegt haben. Zustands-Commitments in Plasma nehmen die Form von „Merkle-Wurzeln“ an (abgeleitet von einem [Merkle-Baum](/whitepaper/#merkle-trees)), die der Betreiber in regelmäßigen Abständen an den Plasma-Vertrag auf der Ethereum-Chain sendet.

Merkle-Wurzeln sind kryptografische Primitive, die das Komprimieren großer Informationsmengen ermöglichen. Eine Merkle-Wurzel (in diesem Fall auch „Block-Wurzel“ genannt) könnte alle Transaktionen in einem Block repräsentieren. Merkle-Wurzeln erleichtern es auch zu überprüfen, ob ein kleines Datenstück Teil des größeren Datensatzes ist. Beispielsweise kann ein Benutzer einen [Merkle-Nachweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) erstellen, um die Aufnahme einer Transaktion in einen bestimmten Block zu beweisen.

Merkle-Wurzeln sind wichtig, um Ethereum Informationen über den Zustand der Offchain bereitzustellen. Sie können sich Merkle-Wurzeln als „Speicherpunkte“ vorstellen: Der Betreiber sagt: „Dies ist der Zustand der Plasma-Chain zum Zeitpunkt x, und dies ist die Merkle-Wurzel als Beweis.“ Der Betreiber legt sich mit einer Merkle-Wurzel auf den _aktuellen Zustand_ der Plasma-Chain fest, weshalb dies als „Zustands-Commitment“ bezeichnet wird.

### Eintritte und Austritte {#entries-and-exits}

Damit Ethereum-Benutzer die Vorteile von Plasma nutzen können, muss es einen Mechanismus geben, um Gelder zwischen dem Mainnet und Plasma-Chains zu verschieben. Wir können jedoch nicht willkürlich Ether an eine Adresse auf der Plasma-Chain senden – diese Chains sind inkompatibel, sodass die Transaktion entweder fehlschlagen oder zum Verlust von Geldern führen würde.

Plasma verwendet einen Master-Vertrag, der auf Ethereum läuft, um Benutzereintritte und -austritte zu verarbeiten. Dieser Master-Vertrag ist auch dafür verantwortlich, Zustands-Commitments zu verfolgen (wie zuvor erklärt) und unehrliches Verhalten durch Betrugsnachweise zu bestrafen (dazu später mehr).

#### Eintritt in die Plasma-Chain {#entering-the-plasma-chain}

Um in die Plasma-Chain einzutreten, muss Alice (die Benutzerin) ETH oder einen beliebigen ERC-20-Token in den Plasma-Vertrag einzahlen. Der Plasma-Betreiber, der die Vertragseinzahlungen überwacht, erstellt einen Betrag in Höhe von Alices ursprünglicher Einzahlung neu und gibt ihn an ihre Adresse auf der Plasma-Chain frei. Alice muss den Erhalt der Gelder auf der Child-Chain bestätigen und kann diese Gelder dann für Transaktionen verwenden.

#### Austritt aus der Plasma-Chain {#exiting-the-plasma-chain}

Der Austritt aus der Plasma-Chain ist aus mehreren Gründen komplexer als der Eintritt. Der wichtigste Grund ist, dass Ethereum zwar Informationen über den Zustand der Plasma-Chain hat, aber nicht überprüfen kann, ob die Informationen wahr sind oder nicht. Ein böswilliger Benutzer könnte eine falsche Behauptung aufstellen („Ich habe 1000 ETH“) und damit durchkommen, indem er gefälschte Beweise liefert, um den Anspruch zu untermauern.

Um böswillige Abhebungen zu verhindern, wird eine „Anfechtungsfrist“ (Challenge Period) eingeführt. Während der Anfechtungsfrist (normalerweise eine Woche) kann jeder eine Abhebungsanfrage mithilfe eines Betrugsnachweises anfechten. Wenn die Anfechtung erfolgreich ist, wird die Abhebungsanfrage abgelehnt.

In der Regel sind die Benutzer jedoch ehrlich und stellen korrekte Ansprüche auf die Gelder, die sie besitzen. In diesem Szenario wird Alice eine Abhebungsanfrage auf der Root-Chain (Ethereum) initiieren, indem sie eine Transaktion an den Plasma-Vertrag übermittelt.

Sie muss außerdem einen Merkle-Nachweis erbringen, der verifiziert, dass eine Transaktion, die ihre Gelder auf der Plasma-Chain erstellt hat, in einen Block aufgenommen wurde. Dies ist für Iterationen von Plasma wie [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html) erforderlich, die ein [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output)-Modell verwenden.

Andere, wie [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), repräsentieren Gelder als [Non-Fungible Tokens](/developers/docs/standards/tokens/erc-721/) anstelle von UTXOs. Eine Abhebung erfordert in diesem Fall den Nachweis des Eigentums an Tokens auf der Plasma-Chain. Dies geschieht durch Übermittlung der beiden letzten Transaktionen, an denen der Token beteiligt war, und durch Bereitstellung eines Merkle-Nachweises, der die Aufnahme dieser Transaktionen in einen Block verifiziert.

Der Benutzer muss der Abhebungsanfrage außerdem eine Kaution (Bond) als Garantie für ehrliches Verhalten hinzufügen. Wenn ein Anfechtender beweist, dass Alices Abhebungsanfrage ungültig ist, wird ihre Kaution einem Slashing unterzogen, und ein Teil davon geht als Belohnung an den Anfechtenden.

Wenn die Anfechtungsfrist verstreicht, ohne dass jemand einen Betrugsnachweis erbringt, gilt Alices Abhebungsanfrage als gültig, sodass sie Einzahlungen aus dem Plasma-Vertrag auf Ethereum abrufen kann.

### Streitbeilegung {#dispute-arbitration}

Wie jede Blockchain benötigen Plasma-Chains einen Mechanismus zur Durchsetzung der Integrität von Transaktionen für den Fall, dass Teilnehmer böswillig handeln (z. B. Doppelausgabe von Geldern). Zu diesem Zweck verwenden Plasma-Chains Betrugsnachweise, um Streitigkeiten über die Gültigkeit von Zustandsübergängen zu schlichten und schlechtes Verhalten zu bestrafen. Betrugsnachweise werden als Mechanismus verwendet, durch den eine Plasma-Child-Chain eine Beschwerde bei ihrer Parent-Chain oder der Root-Chain einreicht.

Ein Betrugsnachweis ist einfach die Behauptung, dass ein bestimmter Zustandsübergang ungültig ist. Ein Beispiel ist, wenn ein Benutzer (Alice) versucht, dieselben Gelder zweimal auszugeben. Vielleicht hat sie den UTXO in einer Transaktion mit Bob ausgegeben und möchte denselben UTXO (der jetzt Bob gehört) in einer anderen Transaktion ausgeben.

Um die Abhebung zu verhindern, wird Bob einen Betrugsnachweis konstruieren, indem er Beweise dafür liefert, dass Alice den besagten UTXO in einer früheren Transaktion ausgegeben hat, sowie einen Merkle-Nachweis für die Aufnahme der Transaktion in einen Block. Derselbe Prozess funktioniert in Plasma Cash – Bob müsste den Beweis erbringen, dass Alice die Tokens, die sie abzuheben versucht, zuvor übertragen hat.

Wenn Bobs Anfechtung erfolgreich ist, wird Alices Abhebungsanfrage storniert. Dieser Ansatz beruht jedoch auf Bobs Fähigkeit, die Chain auf Abhebungsanfragen zu überwachen. Wenn Bob offline ist, kann Alice die böswillige Abhebung verarbeiten, sobald die Anfechtungsfrist abgelaufen ist.

## Das Massenaustrittsproblem bei Plasma {#the-mass-exit-problem-in-plasma}

Das Massenaustrittsproblem tritt auf, wenn eine große Anzahl von Benutzern gleichzeitig versucht, sich von einer Plasma-Chain zurückzuziehen (auszutreten). Warum dieses Problem existiert, hat mit einem der größten Probleme von Plasma zu tun: **Datenunverfügbarkeit**.

Datenverfügbarkeit ist die Fähigkeit zu überprüfen, ob die Informationen für einen vorgeschlagenen Block tatsächlich im Blockchain-Netzwerk veröffentlicht wurden. Ein Block ist „nicht verfügbar“, wenn der Produzent den Block selbst veröffentlicht, aber Daten zurückhält, die zur Erstellung des Blocks verwendet wurden.

Blöcke müssen verfügbar sein, damit Knoten den Block herunterladen und die Gültigkeit von Transaktionen überprüfen können. Blockchains stellen die Datenverfügbarkeit sicher, indem sie Blockproduzenten zwingen, alle Transaktionsdaten Onchain zu veröffentlichen.

Datenverfügbarkeit hilft auch bei der Sicherung von Offchain-Skalierungsprotokollen, die auf der Basisschicht von Ethereum aufbauen. Indem Betreiber auf diesen Chains gezwungen werden, Transaktionsdaten auf Ethereum zu veröffentlichen, kann jeder ungültige Blöcke anfechten, indem er Betrugsnachweise konstruiert, die sich auf den korrekten Zustand der Chain beziehen.

Plasma-Chains speichern Transaktionsdaten in erster Linie beim Betreiber und **veröffentlichen keine Daten im Mainnet** (d. h. außer regelmäßigen Zustands-Commitments). Dies bedeutet, dass sich Benutzer darauf verlassen müssen, dass der Betreiber Blockdaten bereitstellt, wenn sie Betrugsnachweise erstellen müssen, um ungültige Transaktionen anzufechten. Wenn dieses System funktioniert, können Benutzer jederzeit Betrugsnachweise verwenden, um Gelder zu sichern.

Das Problem beginnt, wenn der Betreiber, nicht nur irgendein Benutzer, die böswillig handelnde Partei ist. Da der Betreiber die alleinige Kontrolle über die Blockchain hat, hat er mehr Anreize, ungültige Zustandsübergänge in größerem Maßstab voranzutreiben, wie z. B. den Diebstahl von Geldern, die Benutzern auf der Plasma-Chain gehören.

In diesem Fall funktioniert die Verwendung des klassischen Betrugsnachweissystems nicht. Der Betreiber könnte leicht eine ungültige Transaktion durchführen, die die Gelder von Alice und Bob auf seine Wallet überträgt, und die Daten verbergen, die zur Erstellung des Betrugsnachweises erforderlich sind. Dies ist möglich, da der Betreiber nicht verpflichtet ist, Daten für Benutzer oder das Mainnet verfügbar zu machen.

Daher ist die optimistischste Lösung der Versuch eines „Massenaustritts“ von Benutzern aus der Plasma-Chain. Der Massenaustritt verlangsamt den Plan des böswilligen Betreibers, Gelder zu stehlen, und bietet den Benutzern ein gewisses Maß an Schutz. Abhebungsanfragen werden basierend darauf geordnet, wann jeder UTXO (oder Token) erstellt wurde, was verhindert, dass böswillige Betreiber ehrliche Benutzer durch Front-Running übervorteilen.

Dennoch benötigen wir eine Möglichkeit, die Gültigkeit von Abhebungsanfragen während eines Massenaustritts zu überprüfen – um zu verhindern, dass opportunistische Personen aus dem Chaos Kapital schlagen, indem sie ungültige Austritte verarbeiten. Die Lösung ist einfach: Benutzer müssen den letzten **gültigen Zustand der Chain** veröffentlichen, um ihr Geld abzuziehen.

Aber dieser Ansatz hat immer noch Probleme. Wenn beispielsweise alle Benutzer einer Plasma-Chain austreten müssen (was im Falle eines böswilligen Betreibers möglich ist), muss der gesamte gültige Zustand der Plasma-Chain auf einmal auf die Basisschicht von Ethereum abgeladen werden. Angesichts der beliebigen Größe von Plasma-Chains (hoher Transaktionsdurchsatz = mehr Daten) und der Einschränkungen der Verarbeitungsgeschwindigkeiten von Ethereum ist dies keine ideale Lösung.

Obwohl Austrittsspiele (Exit Games) in der Theorie gut klingen, werden Massenaustritte im wirklichen Leben wahrscheinlich netzwerkweite Überlastungen auf Ethereum selbst auslösen. Neben der Beeinträchtigung der Funktionalität von Ethereum bedeutet ein schlecht koordinierter Massenaustritt, dass Benutzer möglicherweise keine Gelder abheben können, bevor der Betreiber jedes Konto auf der Plasma-Chain leert.

## Vor- und Nachteile von Plasma {#pros-and-cons-of-plasma}

| Vorteile                                                                                                                                                                                                                             | Nachteile                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bietet einen hohen Transaktionsdurchsatz und niedrige Kosten pro Transaktion.                                                                                                                                                                             | Unterstützt keine allgemeinen Berechnungen (kann keine Smart Contracts ausführen). Nur grundlegende Token-Transfers, Swaps und einige andere Transaktionstypen werden über Prädikatenlogik unterstützt.    |
| Gut für Transaktionen zwischen beliebigen Benutzern (kein Overhead pro Benutzerpaar, wenn beide auf der Plasma-Chain etabliert sind).                                                                                                            | Das Netzwerk muss regelmäßig überwacht werden (Liveness-Anforderung), oder diese Verantwortung muss an jemand anderen delegiert werden, um die Sicherheit Ihrer Gelder zu gewährleisten.                          |
| Plasma-Chains können an spezifische Anwendungsfälle angepasst werden, die nichts mit der Main-Chain zu tun haben. Jeder, einschließlich Unternehmen, kann Plasma-Smart-Contracts anpassen, um eine skalierbare Infrastruktur bereitzustellen, die in verschiedenen Kontexten funktioniert. | Verlässt sich auf einen oder mehrere Betreiber, um Daten zu speichern und auf Anfrage bereitzustellen.                                                                                                     |
| Reduziert die Last auf dem Ethereum Mainnet, indem Berechnungen und Speicherung offchain verlagert werden.                                                                                                                                                    | Abhebungen verzögern sich um mehrere Tage, um Anfechtungen zu ermöglichen. Bei fungiblen Vermögenswerten kann dies durch Liquiditätsanbieter gemildert werden, ist jedoch mit Kapitalkosten verbunden. |
|                                                                                                                                                                                                                                  | Wenn zu viele Benutzer gleichzeitig versuchen auszutreten, könnte das Ethereum Mainnet überlastet werden.                                                                                          |

## Plasma vs. Layer-2-Skalierungsprotokolle {#plasma-vs-layer-2}

Während Plasma einst als nützliche Skalierungslösung für Ethereum galt, wurde es inzwischen zugunsten von [Layer-2-Skalierungsprotokollen (L2)](/layer-2/) aufgegeben. L2-Skalierungslösungen beheben mehrere Probleme von Plasma:

### Effizienz {#efficiency}

[Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups) generieren kryptografische Beweise für die Gültigkeit jedes Stapels von Transaktionen, die offchain verarbeitet werden. Dies hindert die Benutzer (und Betreiber) daran, ungültige Zustandsübergänge voranzutreiben, wodurch Anfechtungsfristen und Austrittsspiele überflüssig werden. Es bedeutet auch, dass Benutzer die Chain nicht regelmäßig überwachen müssen, um ihre Gelder zu sichern.

### Unterstützung für Smart Contracts {#support-for-smart-contracts}

Ein weiteres Problem mit dem Plasma-Framework war [die Unfähigkeit, die Ausführung von Ethereum-Smart-Contracts zu unterstützen](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Infolgedessen wurden die meisten Implementierungen von Plasma hauptsächlich für einfache Zahlungen oder den Austausch von ERC-20-Tokens entwickelt.

Im Gegensatz dazu sind Optimistic Rollups mit der [Ethereum Virtual Machine](/developers/docs/evm/) kompatibel und können Ethereum-native [Smart Contracts](/developers/docs/smart-contracts/) ausführen, was sie zu einer nützlichen und _sicheren_ Lösung für die Skalierung [dezentraler Anwendungen (Dapps)](/developers/docs/dapps/) macht. Ebenso gibt es Pläne, [eine Zero-Knowledge-Implementierung der EVM (zkEVM) zu erstellen](https://ethresear.ch/t/a-zk-evm-specification/11549), die es ZK-Rollups ermöglichen würde, beliebige Logik zu verarbeiten und Smart Contracts auszuführen.

### Datenunverfügbarkeit {#data-unavailability}

Wie bereits erklärt, leidet Plasma unter einem Datenverfügbarkeitsproblem. Wenn ein böswilliger Betreiber einen ungültigen Übergang auf der Plasma-Chain vorantreibt, könnten Benutzer diesen nicht anfechten, da der Betreiber Daten zurückhalten kann, die zur Erstellung des Betrugsnachweises erforderlich sind. Rollups lösen dieses Problem, indem sie Betreiber zwingen, Transaktionsdaten auf Ethereum zu veröffentlichen, sodass jeder den Zustand der Chain überprüfen und bei Bedarf Betrugsnachweise erstellen kann.

### Massenaustrittsproblem {#mass-exit-problem}

Sowohl ZK-Rollups als auch Optimistic Rollups lösen das Massenaustrittsproblem von Plasma auf verschiedene Weise. Beispielsweise verlässt sich ein ZK-Rollup auf kryptografische Mechanismen, die sicherstellen, dass Betreiber unter keinen Umständen Benutzergelder stehlen können.

Ebenso erlegen Optimistic Rollups Abhebungen eine Verzögerungsfrist auf, während der jeder eine Anfechtung initiieren und böswillige Abhebungsanfragen verhindern kann. Obwohl dies Plasma ähnelt, besteht der Unterschied darin, dass Verifizierer Zugriff auf Daten haben, die zur Erstellung von Betrugsnachweisen erforderlich sind. Daher besteht für Rollup-Benutzer keine Notwendigkeit, sich an einer hektischen „Wer-zuerst-raus-ist“-Migration zum Ethereum Mainnet zu beteiligen.

## Wie unterscheidet sich Plasma von Sidechains und Sharding? {#plasma-sidechains-sharding}

Plasma, Sidechains und Sharding sind sich ziemlich ähnlich, da sie alle auf irgendeine Weise mit dem Ethereum Mainnet verbunden sind. Das Niveau und die Stärke dieser Verbindungen variieren jedoch, was sich auf die Sicherheitseigenschaften jeder Skalierungslösung auswirkt.

### Plasma vs. Sidechains {#plasma-vs-sidechains}

Eine [Sidechain](/developers/docs/scaling/sidechains/) ist eine unabhängig betriebene Blockchain, die über eine Zwei-Wege-Brücke mit dem Ethereum Mainnet verbunden ist. [Brücken](/bridges/) ermöglichen es Benutzern, Tokens zwischen den beiden Blockchains auszutauschen, um auf der Sidechain zu transagieren, was die Überlastung im Ethereum Mainnet reduziert und die Skalierbarkeit verbessert.
Sidechains verwenden einen separaten Konsensmechanismus und sind in der Regel viel kleiner als das Ethereum Mainnet. Infolgedessen ist das Überbrücken von Vermögenswerten auf diese Chains mit einem erhöhten Risiko verbunden; angesichts der fehlenden Sicherheitsgarantien, die im Sidechain-Modell vom Ethereum Mainnet geerbt werden, riskieren Benutzer den Verlust von Geldern bei einem Angriff auf die Sidechain.

Im Gegensatz dazu leiten Plasma-Chains ihre Sicherheit vom Mainnet ab. Dies macht sie messbar sicherer als Sidechains. Sowohl Sidechains als auch Plasma-Chains können unterschiedliche Konsensprotokolle haben, aber der Unterschied besteht darin, dass Plasma-Chains Merkle-Wurzeln für jeden Block im Ethereum Mainnet veröffentlichen. Block-Wurzeln sind kleine Informationseinheiten, die wir verwenden können, um Informationen über Transaktionen zu überprüfen, die auf einer Plasma-Chain stattfinden. Wenn ein Angriff auf eine Plasma-Chain stattfindet, können Benutzer ihre Gelder mithilfe der entsprechenden Nachweise sicher auf das Mainnet abheben.

### Plasma vs. Sharding {#plasma-vs-sharding}

Sowohl Plasma-Chains als auch Shard-Chains veröffentlichen regelmäßig kryptografische Beweise im Ethereum Mainnet. Beide haben jedoch unterschiedliche Sicherheitseigenschaften.

Shard-Chains übermitteln „Collation-Header“ an das Mainnet, die detaillierte Informationen über jeden Daten-Shard enthalten. Knoten im Mainnet verifizieren und erzwingen die Gültigkeit von Daten-Shards, was die Möglichkeit ungültiger Shard-Übergänge verringert und das Netzwerk vor böswilligen Aktivitäten schützt.

Plasma ist anders, da das Mainnet nur minimale Informationen über den Zustand von Child-Chains erhält. Dies bedeutet, dass das Mainnet Transaktionen, die auf Child-Chains durchgeführt werden, nicht effektiv verifizieren kann, was sie weniger sicher macht.

**Hinweis:** Das Sharding der Ethereum-Blockchain steht nicht mehr auf der Roadmap. Es wurde durch die Skalierung über Rollups und [Danksharding](/roadmap/danksharding) abgelöst.

### Plasma nutzen {#use-plasma}

Mehrere Projekte bieten Implementierungen von Plasma an, die Sie in Ihre Dapps integrieren können:

- [Polygon](https://polygon.technology/) (ehemals Matic Network)

## Weiterführende Literatur {#further-reading}

- [Plasma lernen](https://www.learnplasma.org/en/)
- [Eine kurze Erinnerung daran, was „Shared Security“ bedeutet und warum sie so wichtig ist](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains vs. Plasma vs. Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Plasma verstehen, Teil 1: Die Grundlagen](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Leben und Tod von Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Tutorials: Plasma-Chains auf Ethereum {#tutorials}

- [Schreiben Sie ein App-spezifisches Plasma, das die Privatsphäre wahrt](/developers/tutorials/app-plasma/) _– Erstellen Sie eine die Privatsphäre wahrende Plasma-Anwendung unter Verwendung von Zero-Knowledge-Beweisen und Offchain-Komponenten._