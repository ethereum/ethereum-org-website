---
title: Häufig gestellte Fragen
description: Häufig gestellte Fragen zu Proof-of-Stake-Ethereum.
lang: de
---

## Was ist Proof-of-Stake? {#what-is-proof-of-stake}

Proof-of-Stake beschreibt eine Klasse von Algorithmen, die für die Sicherheit von Blockchains sorgen können, indem sie sicherstellen, dass Assets von Angreifern, die unehrlich handeln, verloren gehen. Für Proof-of-Stake-Systeme ist ein Validatoren-Set erforderlich, um Assets verfügbar zu machen, die zerstört werden können, sollte ein Validator ein nachweislich unehrliches Verhalten an den Tag legen. Ethereum nutzt einen Proof-of-Stake-Mechanismus zur Sicherung der Blockchain.

## Was ist der Unterschied zwischen Proof-of-Stake und Proof-of-Work? {#comparison-to-proof-of-work}

Sowohl Proof-of-Work als auch Proof-of-Stake sind Mechanismen, die böswillige Akteure wirtschaftlich davon abhalten, das Netzwerk mit Spam zu überhäufen oder betrügerische Aktivitäten auszuführen. In beiden Fällen legen Nodes, die aktiv am Konsens teilnehmen, Assets „in das Netzwerk“ ab, das sie verlieren, sollten sie sich falsch verhalten.

Bei Proof-of-Work ist dieses Asset die Energie. Der Node, bekannt als Miner, führt einen Algorithmus aus, der versucht, einen Wert schneller als jeder andere Node zu berechnen. Der schnellste Node hat das Recht, der Chain einen Block vorzuschlagen. Um die Historie der Chain zu verändern oder die Block-Proposals zu dominieren müsste ein Miner über so viel Rechenleistung verfügen, dass er immer das Rennen gewinnt. Dies ist unerschwinglich teuer und schwierig auszuführen und schützt die Chain so vor Angriffen. Die Energie, die für das „Mining“ über den Proof-of-Work-Mechanismus erforderlich ist, ist ein Asset in der realen Welt, für den Miner bezahlen.

Proof-of-Stake erfordert Nodes, bekannt als Validatoren, die ein Krypto-Asset einem Smart Contract explizit übergeben. Wenn sich ein Validator falsch verhält, können diese Kryptowerte zerstört werden, da er seine Assets direkt in die Chain und nicht indirekt über den Energieverbrauch einbringt. Dieser Vorgang wird auch „Staking“ (englisch für „Einsatz“) genannt.

Proof-of-Work ist sehr viel energieaufwendiger, da Elektrizität im Mining-Prozess verbraucht wird. Für Proof-of-Stake wird hingegen nur eine sehr kleine Mengen an Energie benötigt – Ethereum-Validatoren können sogar auf Geräten mit geringem Energiebedarf wie etwa einem Raspberry Pi ausgeführt werden. Es wird davon ausgegangen, dass Ethereums Proof-of-Stake-Mechanismus sicherer ist als der Proof-of-Work-Mechanismus, da die Kosten für einen Angriff höher und die Konsequenzen für einen Angreifer schwerwiegender sind.

Proof-of-Work versus Proof-of-Stake ist ein umstrittenes Thema. [Vitalik Buterins Blog](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) und die Debatte zwischen Justin Drake und Lyn Alden geben einen guten Überblick über die Argumente.

<YouTube id="1m12zgJ42dI" />

## Ist Proof-of-Stake energieeffizient? {#is-pos-energy-efficient}

Ja. Nodes auf dem Proof-of-Stake-Netzwerk nutzen sehr geringe Mengen an Energie. Eine Studie Dritter kam zu dem Schluss, dass Ethereums gesamtes Proof-of-Stake-Netzwerk ungefähr 0,0026 TWh/Jahr verbraucht – ungefähr 13.000-mal weniger Energie, als allein in den USA jedes für Gaming aufgebraucht wird.

[ Mehr zum Energieverbrauch von Ethereum](/energy-consumption/).

## Ist Proof-of-Stake sicher? {#is-pos-secure}

Ethereums Proof-of-Stake ist sehr sicher. Der Mechanismus wurde acht Jahre lang erforscht, entwickelt und rigoros getestet, bevor er in Betrieb genommen wurde. Die Sicherheitsversprechen unterscheiden sich von Proof-of-Work-Blockchains. Bei Proof-of-Stake können böswillige Validatoren aktiv bestraft („geslasht“) werden und aus dem Validatoren-Set ausgeschlossen werden. Das kostet eine erhebliche Menge an ETH. Unter Proof-of-Work kann ein böswilliger Akteur seinen Angriff immer wieder ausführen, solange er über die erforderliche Hash-Leistung verfügt. Außerdem ist es im Vergleich zu Proof-of-Work-Ethereum kostspieliger, gleichwertige Angriffe auf Proof-of-Stake-Ethereum durchzuführen. Um die Liveness der Chain zu beeinflussen, sind mindestens 33 % der insgesamt eingesetzten Ether im Netzwerk erforderlich (außer in Fällen sehr ausgeklügelter Angriffe mit extrem geringer Erfolgswahrscheinlichkeit). Um die Inhalte zukünftiger Blocks zu kontrollieren, werden mindestens 51 % der insgesamt eingesetzten ETH benötigt, und um die Historie zu verändern, sind mindestens 66 % der insgesamt eingesetzten ETH erforderlich. Das Ethereum-Protokoll würde diese Assetss in den Angriffsszenarien mit 33 % oder 51 % und durch sozialen Konsens im Angriffsszenario mit 66 % zerstören.

- [Weitere Informationen zur Absicherung von Ethereum durch Proof-of-Stake gegen Angreifer](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Weitere Informationen zum Aufbau von Proof-of-Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Macht Proof-of-Stake Ethereum günstiger? {#does-pos-make-ethereum-cheaper}

Nein. Die Kosten für das Versenden einer Transaktion (Gasgebühren) werden von einem dynamischen Gebührenmarkt bestimmt. Sie erhöhen sich bei steigender Netzwerknachfrage. Der Konsensmechanismus beeinflusst dies nicht direkt.

[Mehr zu Gas](/developers/docs/gas).

## Was sind Nodes, Clients und Validatoren? {#what-are-nodes-clients-and-validators}

Nodes sind Computer, die mit dem Ethereum-Netzwerk verbunden sind. Clients sind die Software, die von ihnen ausgeführt wird und die den Computer in einen Node verwandelt. Es gibt zwei Arten von Clients: Ausführungs-Clients und Konsens-Clients. Es bedarf beider, um einen Node zu erstellen. Ein Validator ist eine optionale Erweiterung zu einem Konsens-Client, der es dem Node ermöglicht, am Proof-of-Stake-Konsens teilzunehmen. Das bedeutet, dass er Blöcke erstellen und vorschlagen kann, wenn er ausgewählt wird, und dass er Blöcke, von denen er im Netzwerk erfährt, attestieren kann. Um einen Validator zu betreiben, muss ein Operator eines Nodes 32 ETH in den Einzahlungsvertrag trasferieren.

- [Mehr zu Nodes und Clients](/developers/docs/nodes-and-clients)
- [Mehr zum Staking](/staking)

## Ist Proof-of-Stake eine neue Idee? {#is-pos-new}

Nein. Ein Benutzer auf BitcoinTalk [schlug 2011 die grundlegende Idee von Proof-of-Stake](https://bitcointalk.org/index.php?topic=27787.0) als ein Upgrade für Bitcoin vor. Es vergingen elf Jahre, bevor die Technologie bereit war, auf dem Ethereum Mainnet implementiert zu werden. Einige andere Chains implementierten Proof-of-Stake bereits vor Ethereum, jedoch nicht Ethereums spezifischen Mechanismus (bekannt als Gasper).

## Was ist das Besondere an Ethereums Proof-of-Stake? {#why-is-ethereum-pos-special}

Ethereums Proof-of-Stake-Mechanismus ist in seinem Aufbau einzigartig. Er war nicht der erste Proof-of-Stake-Mechanismus, der konzipiert und implementiert wurde, jedoch ist es der robusteste. Der Proof-of-Stake-Mechanismus ist als „Casper“ bekannt. Casper definiert, wie Validatoren ausgewählt werden, um Blöcke vorzuschlagen, wie und wann Attestierungen gemacht werden, wie Attestierungen gezählt werden, welche Belohnungen und Strafen an die Validatoren gehen, welche Bedingungen für das Slashing gelten, welche ausfallsicheren Mechanismen wie das Inactivity Leak es gibt und welche Bedingungen für „Endgültikeit“ gelten. Endgültigkeit ist die Bedingung, dass mindestens 66 % der insgesamt eingesetzten ETH im Netzwerk für einen Block gestimmt haben müssen, damit dieser als permanenter Teil der kanonischen Chain betrachtet wird. Forscher haben Casper spezifisch für Ethereum entwickelt und Ethereum ist die erste und einzige Blockchain, die es implementiert hat.

Zusätzlich zu Casper nutzt Ethereums Proof-of-Stake einen Abspaltungs-Wahl-Algorithmus, der LMD-GHOST genannt wird. Dies ist für den Fall erforderlich, dass zwei Blöcke für denselben Slot existieren. In diesem Fall werden zwei Abspaltungen der Blockchain erstellt. LMD-GHOST wählt diejenige aus, die das größte „Gewicht“ an Attestierungen hat. Das Gewicht ist die Anzahl der Attestierungen, die anhand des Effektiguthabens der Validatoren gewichtet wird. LMD-GHOST existiert nur für Ethereum.

Die Kombination von Casper und LMD_Ghost ist als Gasper bekannt.

[Mehr zu Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Was ist Slashing? {#what-is-slashing}

Slashing ist der gegebene Begriff für das Zerstören einiger Teile des Stakes (des Einsatzes) der Validatoren und das Entfernen des Validator aus dem Netzwerk. Die Menge an ETH, die beim Slashing verloren geht, skaliert mit der Anzahl der Validatoren, die geslasht werden – das heißt, dass illegal zusammenarbeitende Validatoren schwerer bestraft werden als einzeln Handelnde.

[Mehr zu Slashing](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Warum benötigen Validatoren 32 ETH? {#why-32-eth}

Validatoren müssen ETH einsetzen, damit sie etwas zu verlieren haben, sollten sie sich falsch benehmen. Der Grund, warum sie genau 32 ETH einsetzen müssen, ist, dass die Nodes so auf einfacher Hardware laufen können. Wenn der minimal pro Validator eingesetzte ETH-Betrag niedriger wäre, würde sich die Anzahl an Validatoren und auch die Anzahl an Nachrichten, die in jedem Slot verarbeitet werden müssen, erhöhen. Dies würde bedeuten, dass leistungsstärkere Hardware nötig wäre, um einen Node zu betreiben.

## Wie werden die Validatoren ausgewählt? {#how-are-validators-selected}

Ein einzelner Validator wird pseudo-zufällig ausgewählt, um in jedem Slot einen Block vorzuschlagen. Der dabei verwendete Algorithmus nennt sich RANDAO und mischt einen Hash vom Block-Proposer mit einem Seed, der für jeden Block aktualisiert wird. Dieser Wert wird genutzt, um einen spezifischen Validator aus dem gesamten Validatoren-Set auszuwählen. Die Auswahl des Validators wird zwei Epochen im Voraus festgelegt.

[Mehr zur Auswahl von Validatoren](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Was ist Stake Grinding? {#what-is-stake-grinding}

Stake Grinding beschreibt eine Kategorie von Angriffen auf Proof-of-Stake-Netzwerke, bei denen der Angreifer versucht, den Auswahlalgorithmus für Validatoren zu Gunsten seiner eigenen Validatoren zu beeinflussen. Für diese Angriffe auf RANDAO ist ungefähr die Hälfte der insgesamt eingesetzten ETH erforderlich.

[Mehr zu Stake Grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Was ist soziales Slashing? {#what-is-social-slashing}

Soziales Slashing beschreibt die Fähigkeit der Community, als Antwort auf einen Angriff eine Abspaltung der Blockchain zu bewirken. Es ermöglicht der Community, sich von einem Angriff, bei dem eine unehrliche Chain finalisiert wurde, zu erholen. Soziales Slashing kann auch als Verteidigung gegen Zensurangriffe zur Anwendung kommen.

- [Mehr zum sozialen Slashing](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin zum sozialen Slashing](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Werde ich geslasht? {#will-i-get-slashed}

Als Validator ist es sehr schwierig, geslasht zu werden, außer Sie verhalten sich absichtlich auf bösartige Weise. Slashing wird nur in sehr spezifischen Szenarios implementiert, bei denen Validatoren mehrere Blöcke für denselben Slot vorschlagen oder sich bei ihren Attestierungen widersprechen. Es ist sehr unwahrscheinlich, dass diese Fälle zufällig auftreten.

[Mehr zu den Bedingungen für Slashing](https://eth2book.info/altair/part2/incentives/slashing)

## Was ist das „Nothing-at-Stake“-Problem? {#what-is-nothing-at-stake-problem}

Das Nothing-at-Stake(„nichts zu verlieren“)-Problem ist ein konzeptionelles Problem mit einigen Proof-of-Stake-Mechanismen, bei denen es nur Belohnungen und keine Bestrafungen gibt. Wenn es nichts zu verlieren gibt, ist ein pragmatischer Validierer auch gerne bereit, jede oder sogar mehrere Abspaltungen der Blockchain zu attestieren, da die seine Belohnungen vermehrt. Ethereum umgeht dies, indem es Endgültigkeitsbedingungen und Slashing nutzt, um sicherzugehen, dass es eine kanonische Chain gibt.

[Mehr zum Nothing-at-Stake-Problem](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Was ist ein Abspaltungs-Wahl-Algorithmus? {#what-is-a-fork-choice-algorithm}

Ein Abspaltungs-Wahl-Algorithmus implementiert Regeln, mit denen festgelegt wird, welche Chain die kanonische ist. Unter optimalen Bedingungen bedarf es keiner Abspaltungs-Wahl-Regel, da es nur einen Block-Proposer pro Slot gibt und nur einen Block, der ausgewählt werden kann. Gelegentlich führen jedoch mehrere Blöcke für denselben Slot oder spät eintreffende Informationen dazu, dass es mehrere Optionen dafür gibt, wie Blöcke in der Nähe der Chain-Spitze organisiert sind. In diesen Fällen müssen alle Clients einige identische Regeln implementieren, um sicherzustellen, dass sie alle die richtige Blockreihenfolge auswählen. Der Abspaltungs-Wahl-Algorithmus kodiert diese Regeln.

Ethereums Abspaltungs-Wahl-Algorithmus heißt LMD-GHOST. Es wählt die Abspaltung mit dem größten Gewicht an Attestierungen, d. h. die Abspaltung, für die die meisten eingesetzten ETH gestimmt haben.

[Mehr zu LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Was ist Endgültigkeit bei Proof-of-Stake? {#what-is-finality}

Endgültigkeit bei Proof-of-Stake ist die Garantie, dass ein gegebener Block ein permanenter Teil der kanonischen Chain ist und nicht rückgängig gemacht werden kann, außer es kommt zu einem Konsensversagen, bei dem ein Angreifer 33 % der insgesamt eingesetzten Ether verbrennt. Das ist „krypto-ökonomische“ Endgültigkeit, im Gegensatz zur „probabilistischer Endgültigkeit“, die für Proof-of-Work-Blockchains relevant ist. Bei der probabilistischen Endgültigkeit gibt es keine expliziten finalisierten oder nicht finalisierten Zustände für die Blöcke – es wird lediglich immer weniger wahrscheinlich, dass ein Block aus der Chain entfernt werden könnte, je älter er wird. Außerdem bestimmen die Benutzer für sich selbst, wann sie überzeugt genug sind, dass ein Block „sicher“ ist. Bei krypto-ökonomischer Endgültigkeit müssen Paare von Checkpoint-Blöcken von 66 % der eingesetzten Ether gewählt werden. Wenn diese Bedingung erfüllt ist, werden Blöcke zwischen diesen Checkpoints explizit „finalisiert“.

[Mehr zur Endgültigkeit](/developers/docs/consensus-mechanisms/pos/#finality)

## Was ist „schwache Subjektivität“? {#what-is-weak-subjectivity}

Schwache Subjektivität ist eine Funktion des Proof-of-Stake-Netzwerks, bei der soziale Informationen genutzt werden, um den derzeitigen Zustand der Blockchain zu bestätigen. Neuen Nodes oder Nodes, die das Netzwerk wieder betreten, nachdem sie für eine längere Zeit offline waren, kann ein aktueller Zustand gegeben werden. Auf diese Weise kann der Node direkt sehen, ob er sich auf der korrekten Chain befindet. Diese Zustände sind bekannt als „Checkpoints von schwacher Subjektivität“ und sie können von anderen Node-Operatoren außerhalb des Bands, von Block-Explorern oder von mehreren öffentliche Endpunkten erhalten werden.

[Mehr zu schwacher Subjektivität](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Ist Proof-of-Stake zensurresistent? {#is-pos-censorship-resistant}

Zensurresistenz ist im Moment schwer zu beweisen. Jedoch bietet Proof-of-Stake anders als Proof-of-Work die Option, Slashings zu koordinieren, sodass zensierende Validatoren bestraft werden können. Es stehen Änderungen an den Protokollen an, die Blockersteller von Block-Proposern trennen und Listen von Transaktionen einführen, die Ersteller in jeden Block mit aufnehmen müssen. Dieser Vorschlag wird als „richtige-Ersteller-Separierung“ bezeichnet und hilft dabei, Validatoren daran zu hindern, Transaktionen zu zensieren.

[Mehr zur Proposer-Ersteller-Separierung](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Ist Ethereums Proof-of-Stake-System anfällig für einen 51 %-Angriff? {#pos-51-attack}

Ja. Proof-of-Stake ist genauso wie Proof-of-Work anfällig für 51 %-Angriffe. Anstatt 51 % der Hash-Leistung eines Netzwerks benötigt ein Angreifer 51 % der insgesamt eingesetzten ETH. Ein Angreifer, der 51 % des gesamten Stakes ansammelt, erhält die Kontrolle über den Abspaltungs-Wahl-Algorithmus. Dies ermöglicht es dem Angreifer, bestimmte Transaktionen zu zensieren, Kurzstrecken-Neuorganisationen durchzuführen und MEV zu extrahieren, indem er Blöcke zu seinen Gunsten neu anordnet.

[Mehr zu Angriffen auf Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Was ist soziale Koordination und warum wird sie benötigt? {#what-is-social-coordination}

Soziale Koordination ist die letzte Verteidigungslinie auf Ethereum, mit der es möglich wäre, eine ehrliche Chain wiederherzustellen, die einem Angriff zum Opfer gefallen ist, bei dem unehrliche Blöcke finalisiert wurden. In diesem Fall müsste sich die Ethereum-Community „außerhalb des Bands“ koordinieren und sich darauf einigen, eine ehrliche Minderheitsabspaltung zu nutzen und dabei die Validatoren des Angreifers mit Slashing zu bestrafen. Dies würde voraussetzen, dass auch Anwendungen und Börsen die ehrliche Abspaltung anerkennen.

[Lesen Sie mehr zu sozialer Koordination](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Werden die Reichen durch Proof-of-Stake noch reicher? {#do-rich-get-richer}

Je mehr ETH jemand einsetzt, desto mehr Validatoren kann derjenige betreiben und desto mehr Belohnungen können für ihn anfallen. Die Belohnung skaliert linear mit der Menge an eingesetzten ETH und jeder bekommt denselben prozentualen Ertrag. Proof-of-Work bereichert die Reichen mehr als Proof-of-Stake, weil reichere Miner, die Hardware in großem Umfang kaufen, von Skaleneffekten profitieren. Das bedeutet, dass die Beziehung zwischen Reichtum und Belohnung nicht linear ist.

## Ist Proof-of-Stake zentralisierter als Proof-of-Work? {#is-pos-decentralized}

Nein, Proof-of-Work tendiert stärker zur Zentralisierung, weil die Mining-Kosten steigen und Einzelpersonen und dann kleine Unternehmen verdrängen, und so weiter. Das derzeitige Problem mit Proof-of-Stake ist der Einfluss von Liquid Staking Derivatives (LSDs). Dabei handelt es sich um Token, die ETH repräsentieren und von einem Anbieter eingesetzt wurden. Diese können von jeder Person auf Sekundärmärkten getauscht werden, ohne dass die eigentlichen ETH entwertet werden. LSDs erlauben es Nutzern, weniger als 32 ETH einzusetzen. Sie erzeugen jedoch auch ein Zentralisierungsrisiko, bei dem einige wenige große Organisationen einen Großteil des Stakes kontrollieren. Aus diesem Grund ist [Solo-Staking](/staking/solo) die beste Option für Ethereum.

[Mehr zur Stake-Zentralisierung in LSDs](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Warum kann ich nur ETH einsetzen? {#why-can-i-only-stake-eth}

ETH ist die Währung von Ethereum. Eine einheitliche Währung, auf die alle Stakes lauten, ist sowohl für die Buchhaltung von Effektivguthaben als auch für die Stimmengewichtung und die Sicherheit unerlässlich. ETH selbst sind eher ein fundamentaler Bestandteil von Ethereum als ein Smart Contract. Die Einbeziehung anderer Währungen würde die Komplexität deutlich erhöhen und die Sicherheit des Stakings verringern.

## Ist Ethereum die einzige Proof-of-Stake-Blockchain? {#is-ethereum-the-only-pos-blockchain}

Nein, es gibt mehrere Proof-of-Stake-Blockchains. Keiner ist identisch mit Ethereum; der Proof-of-Stake-Mechanismus von Ethereum ist einzigartig.

## Was ist The Merge? {#what-is-the-merge}

The Merge war der Moment, als für Ethereum der auf Proof-of-Work basierende Konsensmechanismus abgeschaltet und der auf Proof-of-Stake basierende Konsensmechanismus eingeschaltet wurde. The Merge wurde am 15. September 2022 durchgeführt.

[Mehr zum Zusammenschluss](/roadmap/merge)

## Was sind Liveness und Sicherheit? {#what-are-liveness-and-safety}

Liveness und Sicherheit sind die beiden fundamentalen Sicherheitsbedenken einer Blockchain. Liveness ist die Verfügbarkeit einer finalisierenden Chain. Wenn die Chain aufhört, sich zu finalisieren, oder Benutzer nicht mehr einfach auf sie zugreifen können, heißt das Livesness-Versagen. Extrem hohe Zugangskosten könnten auch als Livesness-Versagen bezeichnet werden. Die Sicherheit beschreibt, wie schwer es ist, die Chain anzugreifen – d.h. widersprüchliche Checkpoints zu finalisieren.

[Lesen sie mehr dazu im Casper-Artikel](https://arxiv.org/pdf/1710.09437.pdf)
