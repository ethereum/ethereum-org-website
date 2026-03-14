---
title: Plasma-Kette
description: "Eine Einführung in Plasma-Ketten als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
incomplete: true
sidebarDepth: 3
---

Eine Plasma-Chain ist eine separate Blockchain, die an das Ethereum-Mainnet angebunden ist, aber Transaktionen Off-Chain mit ihrem eigenen Mechanismus zur Block-Validierung ausführt. Plasmaketten werden manchmal als "Kind"-Ketten bezeichnet, im Wesentlichen kleinere Kopien des Ethereum-Mainnets. Plasma-Chains verwenden [Betrugsbeweise](/glossary/#fraud-proof) (wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/)), um Streitigkeiten zu schlichten.

Merkle-Bäume ermöglichen die Erstellung eines endlosen Stapels dieser Ketten, die dazu dienen können, Bandbreite von übergeordneten Ketten (einschließlich des Ethereum-Mainnets) zu entlasten. Allerdings leiten diese Ketten zwar einige Sicherheitsaspekte von Ethereum ab (über Betrugsbeweise), jedoch werden ihre Sicherheit und Effizienz durch mehrere Designbeschränkungen beeinflusst.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen und ein allgemeines Verständnis der [Ethereum-Skalierung](/developers/docs/scaling/) haben.

## Was ist Plasma?

Plasma ist ein Framework zur Verbesserung der Skalierbarkeit in öffentlichen Blockchains wie Ethereum. Wie im ursprünglichen [Plasma-Whitepaper](http://plasma.io/plasma.pdf) beschrieben, werden Plasma-Ketten auf einer anderen Blockchain (einer sogenannten „Root-Chain“) aufgebaut. Jede "Kind-Kette" erstreckt sich von der Wurzelkette und wird in der Regel von einem Smart Contract verwaltet, der auf der übergeordneten Kette bereitgestellt wird.

Der Plasma-Vertrag fungiert unter anderem als [kettenübergreifende Brücke](/developers/docs/bridges/), die es Benutzern ermöglicht, Vermögenswerte zwischen dem Ethereum Mainnet und der Plasma-Chain zu bewegen. Obwohl sie dadurch [Sidechains](/developers/docs/scaling/sidechains/) ähneln, profitieren Plasma-Chains – zumindest bis zu einem gewissen Grad – von der Sicherheit des Ethereum Mainnets. Dies unterscheidet sich von Sidechains, die allein für ihre Sicherheit verantwortlich sind.

## Wie funktioniert Plasma?

Die grundlegenden Komponenten des Plasma-Frameworks sind:

### Off-Chain-Berechnung {#offchain-computation}

Die aktuelle Verarbeitungsgeschwindigkeit von Ethereum ist auf etwa 15-20 Transaktionen pro Sekunde begrenzt, was die kurzfristige Möglichkeit der Skalierung zur Bewältigung von mehr Nutzern verringert. Dieses Problem besteht hauptsächlich, weil der [Konsensmechanismus](/developers/docs/consensus-mechanisms/) von Ethereum erfordert, dass viele Peer-to-Peer-Knoten jede Aktualisierung des Blockchain-Zustands überprüfen.

Obwohl der Konsensmechanismus von Ethereum für die Sicherheit notwendig ist, ist er möglicherweise nicht für jeden Anwendungsfall geeignet. Zum Beispiel benötigt Alice möglicherweise nicht, dass ihre täglichen Zahlungen an Bob für eine Tasse Kaffee vom gesamten Ethereum-Netzwerk überprüft werden, da zwischen beiden Parteien bereits ein gewisses Vertrauen besteht.

Plasma geht davon aus, dass das Ethereum-Mainnet nicht alle Transaktionen überprüfen muss. Stattdessen können wir Transaktionen außerhalb des Mainnets verarbeiten, wodurch die Knoten nicht jede Transaktion validieren müssen.

Offchain-Berechnungen sind notwendig, da Plasma-Chains für Geschwindigkeit und Kosten optimiert werden können. Zum Beispiel kann eine Plasma-Chain – und tut dies in den meisten Fällen – einen einzigen "Operator" verwenden, um die Reihenfolge und Ausführung von Transaktionen zu verwalten. Da nur eine einzige Entität die Transaktionen überprüft, sind die Verarbeitungszeiten auf einer Plasma-Chain schneller als auf dem Ethereum-Mainnet.

### Zustands-Commitments {#state-commitments}

Während Plasma Transaktionen Off-Chain ausführt, werden sie auf der Haupt-Ethereum-Ausführungsschicht abgerechnet – andernfalls können Plasma-Chains nicht von den Sicherheitsgarantien von Ethereum profitieren. Aber das Finalisieren von Offchain-Transaktionen, ohne den Zustand der Plasma-Chain zu kennen, würde das Sicherheitsmodell untergraben und die Verbreitung ungültiger Transaktionen ermöglichen. Aus diesem Grund ist der Operator, die für die Erstellung von Blöcken auf der Plasma-Chain verantwortliche Entität, verpflichtet, in regelmäßigen Abständen "Zustandsverpflichtungen" (State Commitments) auf Ethereum zu veröffentlichen.

Ein [Commitment-Schema](https://en.wikipedia.org/wiki/Commitment_scheme) ist eine kryptografische Technik, um sich auf einen Wert oder eine Aussage festzulegen, ohne diesen einer anderen Partei preiszugeben. Verpflichtungen sind „bindend“ in dem Sinne, dass man den Wert oder die Aussage nicht mehr ändern kann, sobald man sich darauf festgelegt hat. Zustands-Commitments in Plasma nehmen die Form von "Merkle-Wurzeln" an (abgeleitet von einem [Merkle-Baum](/whitepaper/#merkle-trees)), die der Betreiber in Intervallen an den Plasma-Vertrag auf der Ethereum-Chain sendet.

Merkle-Wurzeln sind kryptografische Primitiven, die die Komprimierung großer Informationsmengen ermöglichen. Merkle-Wurzeln sind kryptografische Primitiven, die die Komprimierung großer Informationsmengen ermöglichen. Merkle-Wurzeln erleichtern auch die Überprüfung, ob ein kleiner Teil der Daten Teil des größeren Datensatzes ist. Ein Benutzer kann beispielsweise einen [Merkle-Beweis](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) erbringen, um die Aufnahme einer Transaktion in einen bestimmten Block nachzuweisen.

Merkle-Wurzeln sind wichtig, um Informationen über den Off-Chain-Zustand an Ethereum zu übermitteln. Man kann sich Merkle-Wurzeln als „Speicherpunkte“ vorstellen: Der Operator sagt: „Dies ist der Zustand der Plasma-Chain zum Zeitpunkt x, und dies ist die Merkle-Wurzel als Beweis.“. Der Betreiber verpflichtet sich mit einer Merkle-Root auf den _aktuellen Zustand_ der Plasma-Chain, weshalb dies als "Zustands-Commitment" bezeichnet wird.

### Ein- und Austritte {#entries-and-exits}

Damit Ethereum-Benutzer Plasma nutzen können, muss es einen Mechanismus geben, um Gelder zwischen dem Mainnet und Plasma-Chains zu verschieben. Wir können jedoch nicht willkürlich Ether an eine Adresse auf der Plasma-Chain senden – diese Chains sind inkompatibel, sodass die Transaktion entweder fehlschlagen oder zu verlorenen Geldern führen würde.

Plasma verwendet einen Mastervertrag, der auf Ethereum läuft, um Benutzereinträge und -austritte zu verarbeiten. Dieser Mastervertrag ist auch dafür verantwortlich, Statuszusagen zu verfolgen (früher erklärt) und unehrliches Verhalten durch Betrugsnachweise zu bestrafen (mehr dazu später).

#### Eintritt in die Plasma-Chain {#entering-the-plasma-chain}

Um in die Plasma-Chain einzutreten, muss Alice (die Nutzerin) ETH oder einen beliebigen ERC-20 Token in den Plasma-Vertrag einzahlen. Der Plasma-Operator, der die Vertragseinzahlungen überwacht, stellt einen Betrag in Höhe von Alice' ursprünglicher Einzahlung wieder her und gibt ihn an ihre Adresse in der Plasma-Chain frei. Alice muss den Empfang der Gelder auf der Neben-Chain bestätigen und kann diese dann für Transaktionen verwenden.

#### Austritt aus der Plasma-Chain {#exiting-the-plasma-chain}

Der Austritt aus der Plasma-Chain ist aus mehreren Gründen komplizierter als der Eintritt. Der größte Grund ist, dass Ethereum zwar Informationen über den Zustand der Plasma-Chain hat, aber nicht überprüfen kann, ob die Informationen wahr sind oder nicht. Ein böswilliger Benutzer könnte eine falsche Behauptung aufstellen ("Ich habe 1000 ETH") und damit durchkommen, indem er gefälschte Nachweise vorlegt, um die Behauptung zu stützen.

Um böswillige Abhebungen zu verhindern, wird eine "Herausforderungsperiode" eingeführt. Während der Herausforderungsperiode (normalerweise eine Woche) kann jeder einen Abhebungsantrag mithilfe eines Betrugsnachweises anfechten. Wenn die Herausforderung erfolgreich ist, wird der Abhebungsantrag abgelehnt.

Es ist jedoch normalerweise der Fall, dass Benutzer ehrlich sind und korrekte Angaben über die von ihnen besessenen Gelder machen. In diesem Szenario wird Alice eine Abhebungsanforderung auf der Haupt-Chain (Ethereum) einleiten, indem sie eine Transaktion an den Plasma-Vertrag sendet.

Sie muss auch einen Merkle-Nachweis erbringen, der bestätigt, dass eine Transaktion, die ihre Gelder auf der Plasma-Chain erstellt hat, in einem Block enthalten war. Dies ist für Iterationen von Plasma, wie z. B. [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), erforderlich, die ein [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output)-Modell verwenden.

Andere, wie [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), stellen Gelder als [nicht-fungible Token](/developers/docs/standards/tokens/erc-721/) anstelle von UTXOs dar. In diesem Fall erfordert der Austritt den Nachweis des Eigentums an Token auf der Plasma-Chain. Dies wird durch das Einreichen der beiden letzten Transaktionen, die den Token betreffen, und durch das Vorlegen eines Merkle-Nachweises, der die Einbeziehung dieser Transaktionen in einen Block bestätigt, durchgeführt.

Der Benutzer muss auch eine Sicherheit zur Abholanfrage als Garantie für ehrliches Verhalten hinzufügen. Wenn ein Herausforderer beweist, dass Alices Abholanfrage ungültig ist, wird ihre Sicherheit beschlagnahmt, und ein Teil davon wird als Belohnung an den Herausforderer überwiesen.

Wenn die Challengeperiode abgelaufen ist, ohne dass jemand einen Betrugsbeweis vorgelegt hat, gilt Alices Abholanfrage als gültig. Dies ermöglicht ihr, ihre Einlagen aus dem Plasma-Vertrag auf Ethereum zurückzubekommen.

### Streitschlichtung {#dispute-arbitration}

Wie jede Blockchain benötigen Plasma-Chains einen Mechanismus, um die Integrität der Transaktionen zu gewährleisten, falls Teilnehmer böswillig handeln (z. B. durch doppeltes Ausgeben von Geldern). Zu diesem Zweck verwenden Plasma-Chains Betrugsbeweise, um Streitigkeiten bezüglich der Gültigkeit von Zustandsübergängen zu schlichten und schädigendes Verhalten zu bestrafen. Betrugsbeweise dienen als Mechanismus, durch den eine Plasma-Child-Chain eine Beschwerde an ihre Parent-Chain oder an die Root-Chain einreicht.

Ein Betrugsbeweis ist einfach eine Behauptung, dass ein spezifischer Zustandsübergang ungültig ist. Ein Beispiel ist, wenn ein Benutzer (Alice) versucht, das gleiche Guthaben doppelt auszugeben. Vielleicht hat sie das UTXO in einer Transaktion mit Bob ausgegeben und möchte dasselbe UTXO (das nun Bobs ist) in einer anderen Transaktion erneut ausgeben.

Um die Abholung zu verhindern, wird Bob einen Betrugsbeweis erstellen, indem er Beweise vorlegt, dass Alice das genannte UTXO in einer vorherigen Transaktion ausgegeben hat, sowie einen Merkle-Beweis für die Aufnahme der Transaktion in einen Block. Der gleiche Prozess funktioniert auch in Plasma Cash—Bob müsste einen Betrugsbeweis erbringen, indem er nachweist, dass Alice die Tokens, die sie zurückholen möchte, bereits zuvor an jemand anderen übertragen hat.

Wenn Bobs Herausforderung erfolgreich ist, wird Alices Abholanfrage storniert. Allerdings beruht dieser Ansatz darauf, dass Bob die Chain nach Abholanfragen überwachen kann. Wenn Bob offline ist, kann Alice die schädliche Abholung durchführen, sobald die Challengeperiode abgelaufen ist.

## Das Massenabwanderungsproblem in Plasma {#the-mass-exit-problem-in-plasma}

Das Massenausstiegsproblem tritt auf, wenn eine große Anzahl von Benutzern gleichzeitig versuchen, von einer Plasma-Chain abzuheben. Der Grund für dieses Problem hängt mit einem der größten Probleme von Plasma zusammen: **Datenunverfügbarkeit**.

Datenverfügbarkeit ist die Fähigkeit, zu überprüfen, dass die Informationen für einen vorgeschlagenen Block tatsächlich im Blockchain-Netzwerk veröffentlicht wurden. Ein Block ist "nicht verfügbar", wenn sein Ersteller zwar den Block selbst veröffentlicht, die zum Erstellen des Blocks verwendeten Daten jedoch zurückhält.

Blocks müssen verfügbar sein, damit Knoten den Block herunterladen und die Gültigkeit von Transaktionen überprüfen können. Blockchains gewährleisten die Datenverfügbarkeit, indem sie die Blockproduzenten dazu zwingen, alle Transaktionsdaten On-Chain zu veröffentlichen.

Die Datenverfügbarkeit hilft auch dabei, Offchain-Skalierungsprotokolle zu sichern, die auf der Basisschicht von Ethereum aufbauen. Durch die Verpflichtung der Betreiber dieser Chains, Transaktionsdaten auf Ethereum zu veröffentlichen, kann jeder ungültige Blöcke durch die Erstellung von Betrugsbeweisen anfechten, die auf den korrekten Zustand der Chain verweisen.

Plasma-Chains speichern Transaktionsdaten hauptsächlich beim Betreiber und **veröffentlichen keine Daten auf dem Mainnet** (d.h. außer periodischen Zustands-Commitments). Dies bedeutet, dass Benutzer auf den Operator angewiesen sind, um Blockdaten bereitzustellen, falls sie Betrugsbeweise erstellen müssen, die ungültige Transaktionen anfechten. Wenn dieses System funktioniert, können Benutzer ihre Guthaben stets durch Betrugsbeweise sichern.

Das Problem tritt auf, wenn der Operator – und nicht nur ein beliebiger Benutzer – schädigend handelt. Da der Operator die exklusive Kontrolle über die Blockchain hat, hat er einen stärkeren Anreiz, ungültige Zustandsübergänge in größerem Umfang durchzusetzen, wie zum Beispiel Guthaben der Benutzer auf der Plasma-Chain zu stehlen.

In diesem Fall funktioniert das klassische Betrugsbeweissystem nicht. Der Operator könnte leicht eine ungültige Transaktion durchführen, die die Guthaben von Alice und Bob auf ihr eigenes Wallet überträgt, und die zur Erstellung eines Betrugsbeweises erforderlichen Daten zurückhalten. Das ist möglich, da der Operator nicht verpflichtet ist, Daten für Benutzer oder Mainnet verfügbar zu machen.

Die optimistischste Lösung besteht darin, einen "Massenausstieg" der Benutzer aus der Plasma-Chain zu versuchen. Der Massenausstieg verlangsamt die Pläne des schädigenden Operators, Guthaben zu stehlen, und bietet ein gewisses Maß an Schutz für die Benutzer. Abholanfragen werden gemäß der Erstellungszeit jedes UTXO (oder Tokens) sortiert, was schädigende Betreiber daran hindert, ehrliche Benutzer durch Front-running zu schädigen.

Dennoch benötigen wir eine Methode, um die Gültigkeit von Abholanfragen während eines Massenausstiegs zu überprüfen – um opportunistiche Individuen daran zu hindern, vom Chaos durch die Bearbeitung ungültiger Ausstiege zu profitieren. Die Lösung ist einfach: die Benutzer müssen den letzten **gültigen Zustand der Chain** veröffentlichen, um ihr Geld abzuheben.

Aber dieser Ansatz hat jedoch weiterhin Probleme. Zum Beispiel, wenn alle Benutzer einer Plasma-Chain einen Austritt benötigen (was im Falle eines schädigenden Operators möglich ist), muss der gesamte gültige Zustand der Plasma-Chain auf Ethereums Basislayer auf einmal hochgeladen werden. Bei der beliebigen Größe von Plasma-Chains (hoher Durchsatz = mehr Daten) und den Beschränkungen bei den Verarbeitungsgeschwindigkeiten von Ethereum ist dies keine ideale Lösung.

Obwohl Exit-Games in der Theorie verlockend klingen, könnten realisierte Massenausstiege vermutlich Netzwerkauslastung auf Ethereum selbst auslösen. Zusätzlich zur Beeinträchtigung der Funktionalität von Ethereum bedeutet ein ungenügend koordinierter Massenausstieg, dass Benutzer möglicherweise nicht in der Lage sind, ihr Geld abzuheben, bevor der Betreiber alle Konten auf der Plasma-Chain entleert.

## Vor- und Nachteile von Plasma {#pros-and-cons-of-plasma}

| Pro                                                                                                                                                                                                                                                                                                         | Nachteile                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bietet hohen Durchsatz und niedrige Kosten pro Transaktion.                                                                                                                                                                                                                                 | Unterstützt keine allgemeine Berechnung (kann keine Smart Contracts ausführen). Nur grundlegende Token-Transfers, Swaps und ein paar andere Transaktionstypen werden über Prädikatslogik unterstützt.                                        |
| Gut für Transaktionen zwischen beliebigen Benutzern (kein Overhead pro Benutzer-Paar, wenn beide auf der Plasma-Chain festgelegt sind)                                                                                                                                                   | Benötigt ein regelmäßiges Beobachten des Netzwerks (Lebendigkeitserfordernis) oder das Delegieren dieser Verantwortung an andere, um die Sicherheit der eingesetzten Gelder zu gewährleisten.                                                                |
| Plasma-Chains können an spezifische Use-Cases angepasst werden, die unabhängig von der Main-Chain sind. Jeder, einschließlich Unternehmen, kann Plasma-Smart-Contracts anpassen, um skalierbare Infrastruktur bereitzustellen, die in verschiedenen Kontexten funktioniert. | Verlässt sich auf einen oder mehrere Operatoren, um Daten zu speichern und abzufragen.                                                                                                                                                                                          |
| Entlastet das Ethereum-Mainnet, indem Rechenleistung und Speicher offchain verlagert werden.                                                                                                                                                                                                | Auszahlungen werden um mehrere Tage verzögert, um Herausforderungen zu ermöglichen und potenzielle Streitigkeiten zu lösen. Für fungible Vermögenswerte kann dies durch Liquiditätsanbieter gemindert werden, aber es entstehen damit verbundene Kapitalkosten. |
|                                                                                                                                                                                                                                                                                                             | Wenn zu viele Benutzer gleichzeitig einen Austritt beantragen, könnte Ethereum Mainnet überlastet werden.                                                                                                                                                                       |

## Plasma vs. Layer-2-Skalierungsprotokolle {#plasma-vs-layer-2}

Obwohl Plasma einst als nützliche Skalierungslösung für Ethereum galt, wurde es inzwischen zugunsten von [Layer-2 (L2)-Skalierungsprotokollen](/layer-2/) aufgegeben. L2-Skalierungsprotokolle beheben mehrere Probleme von Plasma:

### Effizienz {#efficiency}

[Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups) erzeugen kryptografische Beweise für die Gültigkeit jedes Transaktionsstapels, der off-chain verarbeitet wird. Dies verhindert, dass Benutzer (und Betreiber) ungültige Zustandsübergänge vorantreiben, was die Notwendigkeit von Challengeperioden und Exit-Games beseitigt. Damit müssen Benutzer ihre Guthaben nicht mehr regelmäßig über die Chain überwachen, um sie zu schützen.

### Unterstützung für Smart Contracts {#support-for-smart-contracts}

Ein weiteres Problem mit dem Plasma-Framework war [die Unfähigkeit, die Ausführung von Ethereum Smart Contracts zu unterstützen](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Daher wurden die meisten Plasma-Implementierungen hauptsächlich für einfache Zahlungen oder den Austausch von ERC-20-Tokens entwickelt.

Im Gegensatz dazu sind Optimistic Rollups mit der [Ethereum Virtual Machine](/developers/docs/evm/) kompatibel und können native Ethereum-[Smart Contracts](/developers/docs/smart-contracts/) ausführen, was sie zu einer nützlichen und _sicheren_ Lösung für die Skalierung [dezentralisierter Anwendungen](/developers/docs/dapps/) macht. In ähnlicher Weise gibt es Pläne, eine [Zero-Knowledge-Implementierung der EVM (zkEVM) zu erstellen](https://ethresear.ch/t/a-zk-evm-specification/11549), die es ZK-Rollups ermöglichen würde, beliebige Logik zu verarbeiten und Smart Contracts auszuführen.

### Datenunverfügbarkeit {#data-unavailability}

Wie bereits erläutert, leidet Plasma unter einem Datenverfügbarkeitsproblem. Wenn ein schädigender Operator einen ungültigen Zustandsübergang in der Plasma-Chain vorantreibt, könnten Benutzer ihn nicht anfechten, da der Operator die zum Erstellen eines Betrugsbeweises benötigten Daten zurückhalten kann. Rollups lösen dieses Problem, indem sie Betreiber verpflichten, Transaktionsdaten auf Ethereum zu veröffentlichen. Dies ermöglicht es jedem, den Zustand der Chain zu überprüfen und gegebenenfalls Betrugsbeweise zu erstellen.

### Massenabwanderungsproblem {#mass-exit-problem}

ZK-Rollups und Optimistische Rollups lösen das Massenausstiegsproblem von Plasma auf verschiedene Weise. Ein ZK-Rollup verlässt sich auf kryptografische Mechanismen, die gewährleisten, dass Betreiber keine Guthaben von Nutzern stehlen können, unabhängig vom Szenario.

Optimistische Rollups legen eine Verzögerungsperiode für Abhebungen fest, in der jeder eine Herausforderung einleiten und schädliche Abhebeanträge verhindern kann. Obwohl dies ähnlich wie Plasma ist, besteht der Unterschied jedoch darin, dass Verifizierer auf die benötigten Daten zum Erstellen von Betrugsbeweisen zugreifen können. Daher besteht für Benutzer von Rollups kein Grund, eine panische "Erstausstiegs"-Migration nach Ethereum Mainnet zu starten.

## Wie unterscheidet sich Plasma von Sidechains und Sharding? {#plasma-sidechains-sharding}

Plasma, Sidechains und Sharding sind ziemlich ähnlich, da sie alle auf unterschiedliche Weise mit Ethereum Mainnet verbunden sind. Allerdings variieren die Stufe und Stärke dieser Verbindungen, was die Sicherheitsmerkmale jeder Skalierungslösung beeinflusst.

### Plasma vs. Sidechains {#plasma-vs-sidechains}

Eine [Sidechain](/developers/docs/scaling/sidechains/) ist eine unabhängig betriebene Blockchain, die über eine bidirektionale kettenübergreifende Brücke mit dem Ethereum Mainnet verbunden ist. [Kettenübergreifende Brücken](/bridges/) ermöglichen es Benutzern, Token zwischen den beiden Blockchains auszutauschen, um Transaktionen auf der Sidechain durchzuführen. Dies reduziert die Überlastung des Ethereum Mainnets und verbessert die Skalierbarkeit.
Sidechains verwenden einen eigenen Konsensmechanismus und sind im Allgemeinen deutlich kleiner als Ethereum Mainnet. Als Ergebnis birgt das Übertragen von Assets über Bridges auf diese Ketten ein erhöhtes Risiko; da die Sicherheitsgarantien von Ethereum Mainnet im Sidechain-Modell nicht übernommen werden, riskieren Benutzer bei einem Angriff auf die Sidechain den Verlust ihrer Guthaben.

Im Gegensatz dazu leiten Plasma-Chains ihre Sicherheit von Mainnet ab. Dies macht sie messbar sicherer als Sidechains. Sowohl Sidechains als auch Plasma-Chains können unterschiedliche Konsensprotokolle haben, aber der Unterschied besteht darin, dass Plasma-Chains die Merkle-Wurzel jedes Blocks auf Ethereum Mainnet veröffentlichen. Merkle-Wurzeln sind kleine Datenstücke, die wir verwenden können, um Informationen über Transaktionen zu überprüfen, die auf einer Plasma-Chain durchgeführt werden. Falls auf einer Plasma-Chain ein Angriff geschieht, können Benutzer ihr Guthaben sicher zurück auf Mainnet abheben, indem sie die entsprechenden Beweise verwenden.

### Plasma vs. Sharding {#plasma-vs-sharding}

Sowohl Plasma-Chains als auch Shard-Chains veröffentlichen periodisch kryptografische Beweise auf Ethereum Mainnet. Beide haben jedoch unterschiedliche Sicherheitseigenschaften.

Shard-Chains senden "Kollationsköpfe" an das Mainnet, die detaillierte Informationen über jeden Datenshard enthalten. Nodes im Mainnet überprüfen und erzwingen die Gültigkeit der Datenshards, wodurch die Möglichkeit ungültiger Shard-Übergänge reduziert und das Netzwerk vor bösartigen Aktivitäten geschützt wird.

Plasma unterscheidet sich, da das Mainnet nur minimale Informationen über den Zustand der Child-Chains erhält. Das bedeutet, dass das Mainnet Transaktionen, die auf Child-Chains durchgeführt werden, nicht effektiv überprüfen kann, was diese weniger sicher macht.

**Hinweis**: Das Sharding der Ethereum-Blockchain steht nicht mehr auf dem Fahrplan. Es wurde durch die Skalierung über Rollups und [Danksharding](/roadmap/danksharding) ersetzt.

### Plasma verwenden {#use-plasma}

Mehrere Projekte bieten Implementierungen von Plasma an, die Sie in Ihre dApps integrieren können:

- [Polygon](https://polygon.technology/) (früher Matic Network)

## Weiterführende Lektüre {#further-reading}

- [Mehr über Plasma erfahren](https://www.learnplasma.org/en/)
- [Eine kurze Erinnerung daran, was "geteilte Sicherheit" bedeutet und warum sie so wichtig ist](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains vs. Plasma vs. Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Plasma verstehen, Teil 1: Die Grundlagen](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Aufstieg und Fall von Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
