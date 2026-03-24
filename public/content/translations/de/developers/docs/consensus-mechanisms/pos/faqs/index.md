---
title: "Häufig gestellte Fragen"
description: "Häufig gestellte Fragen zu Proof-of-Stake bei Ethereum."
lang: de
---

## Was ist Proof-of-Stake? {#what-is-proof-of-stake}

Proof-of-Stake ist eine Klasse von Algorithmen, die Blockchains Sicherheit bieten kann, indem sie sicherstellt, dass Angreifer, die unehrlich handeln, wertvolle Vermögenswerte verlieren. Proof-of-Stake-Systeme erfordern eine Gruppe von Validatoren, die einen Vermögenswert zur Verfügung stellen, der zerstört werden kann, wenn der Validator ein nachweislich unehrliches Verhalten an den Tag legt. Ethereum verwendet einen Konsensmechanismus basierend auf Proof-of-Stake, um die Blockchain zu sichern.

## Wie lässt sich Proof-of-Stake mit Proof-of-Work vergleichen? {#comparison-to-proof-of-work}

Sowohl Proof-of-Work als auch Proof-of-Stake sind Mechanismen, die bösartige Akteure wirtschaftlich davon abhalten, das Netzwerk zu spammen oder zu betrügen. In beiden Fällen bringen Blockchain-Knoten, die aktiv am Konsens teilnehmen, einen Vermögenswert „in das Netzwerk“ ein, den sie verlieren, wenn sie sich falsch verhalten.

Bei Proof-of-Work ist dieser Vermögenswert Energie. Der Blockchain-Knoten, bekannt als Miner, führt einen Algorithmus aus, der darauf abzielt, einen Wert schneller als jeder andere Blockchain-Knoten zu berechnen. Der schnellste Blockchain-Knoten hat das Recht, der Chain einen Block vorzuschlagen. Um die Historie der Chain zu ändern oder den Blockvorschlag zu dominieren, müsste ein Miner über so viel Rechenleistung verfügen, dass er das Rennen immer gewinnt. Dies ist unerschwinglich teuer und schwer auszuführen, was die Chain vor Angriffen schützt. Die Energie, die für das „Mining“ mittels Proof-of-Work erforderlich ist, ist ein realer Vermögenswert, für den die Miner bezahlen.

Proof-of-Stake erfordert, dass Blockchain-Knoten, bekannt als Validatoren, explizit ein Krypto-Asset an einen Smart Contract übermitteln. Wenn sich ein Validator falsch verhält, kann diese Kryptowährung zerstört werden, da er seine Vermögenswerte direkt in die Chain einbringt (Staking), anstatt indirekt über Energieaufwand.

Proof-of-Work ist viel energiehungriger, da beim Mining-Prozess Strom verbraucht wird. Proof-of-Stake hingegen benötigt nur eine sehr geringe Menge an Energie – Ethereum-Validatoren können sogar auf einem stromsparenden Gerät wie einem Raspberry Pi ausgeführt werden. Der Proof-of-Stake-Mechanismus von Ethereum gilt als sicherer als Proof-of-Work, da die Kosten für einen Angriff höher sind und die Konsequenzen für einen Angreifer schwerwiegender ausfallen.

Proof-of-Work versus Proof-of-Stake ist ein umstrittenes Thema. [Vitalik Buterins Blog](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) und die Debatte zwischen Justin Drake und Lyn Alden bieten eine gute Zusammenfassung der Argumente.

<YouTube id="1m12zgJ42dI" />

## Ist Proof-of-Stake energieeffizient? {#is-pos-energy-efficient}

Ja. Blockchain-Knoten in einem Proof-of-Stake-Netzwerk verbrauchen eine winzige Menge an Energie. Eine unabhängige Studie kam zu dem Schluss, dass das gesamte Proof-of-Stake-Netzwerk von Ethereum rund 0,0026 TWh/Jahr verbraucht – etwa 13.000-mal weniger als Gaming allein in den USA.

[Mehr zum Energieverbrauch von Ethereum](/energy-consumption/).

## Ist Proof-of-Stake sicher? {#is-pos-secure}

Das Proof-of-Stake von Ethereum ist sehr sicher. Der Mechanismus wurde über acht Jahre lang erforscht, entwickelt und streng getestet, bevor er live ging. Die Sicherheitsgarantien unterscheiden sich von Proof-of-Work-Blockchains. Bei Proof-of-Stake können bösartige Validatoren aktiv bestraft („Slashing“) und aus der Gruppe der Validatoren ausgeschlossen werden, was eine erhebliche Menge an ETH kostet. Unter Proof-of-Work kann ein Angreifer seinen Angriff beliebig oft wiederholen, solange er über ausreichend Hash-Leistung verfügt. Es ist auch kostspieliger, gleichwertige Angriffe auf das Proof-of-Stake von Ethereum durchzuführen als unter Proof-of-Work. Um die Lebendigkeit (Liveness) der Chain zu beeinträchtigen, sind mindestens 33 % der gesamten im Netzwerk eingesetzten Ether erforderlich (außer in Fällen sehr raffinierter Angriffe mit extrem geringer Erfolgswahrscheinlichkeit). Um den Inhalt zukünftiger Blöcke zu kontrollieren, sind mindestens 51 % der gesamten eingesetzten ETH erforderlich, und um die Historie neu zu schreiben, werden über 66 % des gesamten Einsatzes benötigt. Das Ethereum-Protokoll würde diese Vermögenswerte in den 33-%- oder 51-%-Angriffsszenarien zerstören und durch sozialen Konsens im 66-%-Angriffsszenario.

- [Mehr zur Verteidigung des Ethereum-Proof-of-Stake vor Angreifern](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Mehr zum Proof-of-Stake-Design](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Macht Proof-of-Stake Ethereum billiger? {#does-pos-make-ethereum-cheaper}

Nein. Die Kosten für das Senden einer Transaktion (Gasgebühr) werden durch einen dynamischen Gebührenmarkt bestimmt, der mit steigender Netzwerknachfrage zunimmt. Der Konsensmechanismus hat darauf keinen direkten Einfluss.

[Mehr zu Gas](/developers/docs/gas).

## Was sind Blockchain-Knoten, Anwendungen und Validatoren? {#what-are-nodes-clients-and-validators}

Blockchain-Knoten sind Computer, die mit dem Ethereum-Netzwerk verbunden sind. Anwendungen sind die Software, die sie ausführen und die den Computer in einen Blockchain-Knoten verwandelt. Es gibt zwei Arten von Anwendungen: Ausführungs-Clients und Konsens-Clients. Beide werden benötigt, um einen Blockchain-Knoten zu erstellen. Ein Validator ist ein optionales Add-on zu einem Konsens-Client, das es dem Blockchain-Knoten ermöglicht, am Proof-of-Stake-Konsens teilzunehmen. Dies bedeutet das Erstellen und Vorschlagen von Blöcken, wenn sie ausgewählt werden, und das Bestätigen von Blöcken, von denen sie im Netzwerk erfahren. Um einen Validator zu betreiben, muss der Betreiber des Blockchain-Knotens 32 ETH in den Einzahlungsvertrag einzahlen.

- [Mehr zu Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients)
- [Mehr zu Staking](/staking)

## Ist Proof-of-Stake eine neue Idee? {#is-pos-new}

Nein. Ein Benutzer auf BitcoinTalk [schlug die Grundidee von Proof-of-Stake vor](https://bitcointalk.org/index.php?topic=27787.0), als Upgrade für Bitcoin im Jahr 2011. Es dauerte elf Jahre, bis es bereit war, im Ethereum-Mainnet implementiert zu werden. Einige andere Chains implementierten Proof-of-Stake früher als Ethereum, jedoch nicht den spezifischen Mechanismus von Ethereum (bekannt als Gasper).

## Was ist das Besondere am Proof-of-Stake von Ethereum? {#why-is-ethereum-pos-special}

Der Proof-of-Stake-Mechanismus von Ethereum ist in seinem Design einzigartig. Es war nicht der erste Proof-of-Stake-Mechanismus, der entworfen und implementiert wurde, aber er ist der robusteste. Der Proof-of-Stake-Mechanismus ist als „Casper“ bekannt. Casper definiert, wie Validatoren ausgewählt werden, um Blöcke vorzuschlagen, wie und wann Bestätigungen vorgenommen werden, wie Bestätigungen gezählt werden, die Belohnungen und Strafen für Validatoren, Slashing-Bedingungen, ausfallsichere Mechanismen wie das Inactivity Leak und die Bedingungen für „Finalität“. Finalität ist die Bedingung, dass ein Block, um als dauerhafter Teil der kanonischen Chain betrachtet zu werden, von mindestens 66 % der gesamten im Netzwerk eingesetzten ETH gewählt worden sein muss. Forscher haben Casper speziell für Ethereum entwickelt, und Ethereum ist die erste und einzige Blockchain, die es implementiert hat.

Zusätzlich zu Casper verwendet das Proof-of-Stake von Ethereum einen Fork-Choice-Algorithmus namens LMD-GHOST. Dies ist erforderlich, falls eine Bedingung eintritt, bei der zwei Blöcke für denselben Slot existieren. Dadurch entstehen zwei Forks der Blockchain. LMD-GHOST wählt denjenigen aus, der das größte „Gewicht“ an Bestätigungen aufweist. Das Gewicht ist die Anzahl der Bestätigungen, gewichtet mit dem effektiven Kontostand der Validatoren. LMD-GHOST ist einzigartig für Ethereum.

Die Kombination aus Casper und LMD_GHOST ist als Gasper bekannt.

[Mehr zu Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Was ist Slashing? {#what-is-slashing}

Slashing ist der Begriff für die Zerstörung eines Teils des Einsatzes eines Validators und den Ausschluss des Validators aus dem Netzwerk. Die Menge an ETH, die bei einem Slashing verloren geht, skaliert mit der Anzahl der Validatoren, die geslasht werden – das bedeutet, dass kolludierende Validatoren strenger bestraft werden als Einzelpersonen.

[Mehr zu Slashing](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Warum benötigen Validatoren 32 ETH? {#why-32-eth}

Validatoren müssen ETH einsetzen (Staking), damit sie etwas zu verlieren haben, wenn sie sich falsch verhalten. Der Grund, warum sie genau 32 ETH einsetzen müssen, besteht darin, es Blockchain-Knoten zu ermöglichen, auf bescheidener Hardware zu laufen. Wäre das Minimum an ETH pro Validator geringer, würde die Anzahl der Validatoren und damit die Anzahl der Nachrichten, die in jedem Slot verarbeitet werden müssen, steigen, was bedeuten würde, dass leistungsfähigere Hardware erforderlich wäre, um einen Blockchain-Knoten zu betreiben.

## Wie werden Validatoren ausgewählt? {#how-are-validators-selected}

Ein einzelner Validator wird pseudozufällig ausgewählt, um in jedem Slot einen Block vorzuschlagen, wobei ein Algorithmus namens RANDAO verwendet wird, der einen Hash vom Block-Vorschlagenden mit einem Seed mischt, der bei jedem Block aktualisiert wird. Dieser Wert wird verwendet, um einen bestimmten Validator aus der gesamten Gruppe der Validatoren auszuwählen. Die Auswahl der Validatoren wird zwei Epochen im Voraus festgelegt.

[Mehr zur Auswahl von Validatoren](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Was ist Stake-Grinding? {#what-is-stake-grinding}

Stake-Grinding ist eine Kategorie von Angriffen auf Proof-of-Stake-Netzwerke, bei denen der Angreifer versucht, den Algorithmus zur Auswahl der Validatoren zugunsten seiner eigenen Validatoren zu beeinflussen. Stake-Grinding-Angriffe auf RANDAO erfordern etwa die Hälfte der gesamten eingesetzten ETH.

[Mehr zu Stake-Grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Was ist Social Slashing? {#what-is-social-slashing}

Social Slashing ist die Fähigkeit der Community, als Reaktion auf einen Angriff einen Fork der Blockchain zu koordinieren. Es ermöglicht der Community, sich davon zu erholen, wenn ein Angreifer eine unehrliche Chain finalisiert. Social Slashing kann auch gegen Zensurangriffe eingesetzt werden.

- [Mehr zu Social Slashing](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin über Social Slashing](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Werde ich geslasht? {#will-i-get-slashed}

Als Validator ist es sehr schwierig, geslasht zu werden, es sei denn, man legt absichtlich ein bösartiges Verhalten an den Tag. Slashing wird nur in sehr spezifischen Szenarien implementiert, in denen Validatoren mehrere Blöcke für denselben Slot vorschlagen oder sich mit ihren Bestätigungen selbst widersprechen – es ist sehr unwahrscheinlich, dass dies versehentlich geschieht.

[Mehr zu Slashing-Bedingungen](https://eth2book.info/altair/part2/incentives/slashing)

## Was ist das Nothing-at-Stake-Problem? {#what-is-nothing-at-stake-problem}

Das Nothing-at-Stake-Problem ist ein konzeptionelles Problem bei einigen Proof-of-Stake-Mechanismen, bei denen es nur Belohnungen und keine Strafen gibt. Wenn nichts auf dem Spiel steht (Einsatz), ist ein pragmatischer Validator gleichermaßen bereit, jeden oder sogar mehrere Forks der Blockchain zu bestätigen, da dies seine Belohnungen erhöht. Ethereum umgeht dies durch die Verwendung von Finalitätsbedingungen und Slashing, um eine einzige kanonische Chain sicherzustellen.

[Mehr zum Nothing-at-Stake-Problem](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Was ist ein Fork-Choice-Algorithmus? {#what-is-a-fork-choice-algorithm}

Ein Fork-Choice-Algorithmus implementiert Regeln, die bestimmen, welche Chain die kanonische ist. Unter optimalen Bedingungen besteht keine Notwendigkeit für eine Fork-Choice-Regel, da es nur einen Block-Vorschlagenden pro Slot und einen Block zur Auswahl gibt. Gelegentlich führen jedoch mehrere Blöcke für denselben Slot oder spät eintreffende Informationen zu mehreren Optionen dafür, wie Blöcke nahe der Spitze der Chain organisiert sind. In diesen Fällen müssen alle Anwendungen einige Regeln identisch implementieren, um sicherzustellen, dass sie alle die richtige Abfolge von Blöcken auswählen. Der Fork-Choice-Algorithmus kodiert diese Regeln.

Der Fork-Choice-Algorithmus von Ethereum heißt LMD-GHOST. Er wählt den Fork mit dem größten Gewicht an Bestätigungen, also denjenigen, für den die meisten eingesetzten ETH gestimmt haben.

[Mehr zu LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Was ist Finalität bei Proof-of-Stake? {#what-is-finality}

Finalität bei Proof-of-Stake ist die Garantie, dass ein bestimmter Block ein dauerhafter Teil der kanonischen Chain ist und nicht rückgängig gemacht werden kann, es sei denn, es liegt ein Konsensfehler vor, bei dem ein Angreifer 33 % der gesamten eingesetzten Ether verbrennt. Dies ist eine „kryptoökonomische“ Finalität im Gegensatz zur „probabilistischen Finalität“, die für Proof-of-Work-Blockchains relevant ist. Bei der probabilistischen Finalität gibt es keine expliziten finalisierten/nicht-finalisierten Zustände für Blöcke – es wird einfach immer unwahrscheinlicher, dass ein Block aus der Chain entfernt werden könnte, je älter er wird, und die Benutzer entscheiden selbst, wann sie ausreichend zuversichtlich sind, dass ein Block „sicher“ ist. Bei der kryptoökonomischen Finalität müssen Paare von Checkpoint-Blöcken von 66 % der eingesetzten Ether gewählt werden. Wenn diese Bedingung erfüllt ist, werden Blöcke zwischen diesen Checkpoints explizit „finalisiert“.

[Mehr zu Finalität](/developers/docs/consensus-mechanisms/pos/#finality)

## Was ist „schwache Subjektivität“ (Weak Subjectivity)? {#what-is-weak-subjectivity}

Schwache Subjektivität ist ein Merkmal von Proof-of-Stake-Netzwerken, bei dem soziale Informationen verwendet werden, um den aktuellen Zustand der Blockchain zu bestätigen. Neuen Blockchain-Knoten oder Blockchain-Knoten, die dem Netzwerk nach langer Offline-Zeit wieder beitreten, kann ein aktueller Zustand übergeben werden, sodass der Blockchain-Knoten sofort erkennen kann, ob er sich auf der richtigen Chain befindet. Diese Zustände sind als „Weak Subjectivity Checkpoints“ bekannt und können von anderen Betreibern von Blockchain-Knoten Out-of-Band, von Blocksuchmaschinen oder von verschiedenen öffentlichen Endpunkten bezogen werden.

[Mehr zu schwacher Subjektivität](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Ist Proof-of-Stake zensurresistent? {#is-pos-censorship-resistant}

Zensurresistenz ist derzeit schwer zu beweisen. Im Gegensatz zu Proof-of-Work bietet Proof-of-Stake jedoch die Möglichkeit, Slashings zu koordinieren, um zensierende Validatoren zu bestrafen. Es stehen Änderungen am Protokoll an, die Block-Ersteller von Block-Vorschlagenden trennen und Listen von Transaktionen implementieren, die Ersteller in jeden Block aufnehmen müssen. Dieser Vorschlag ist als Proposer-Builder Separation bekannt und hilft zu verhindern, dass Validatoren Transaktionen zensieren.

[Mehr zur Proposer-Builder Separation](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Kann das Proof-of-Stake-System von Ethereum durch einen 51-%-Angriff attackiert werden? {#pos-51-attack}

Ja. Proof-of-Stake ist anfällig für 51-%-Angriffe, genau wie Proof-of-Work. Anstatt dass der Angreifer 51 % der Hash-Leistung des Netzwerks benötigt, benötigt der Angreifer 51 % der gesamten eingesetzten ETH. Ein Angreifer, der 51 % des gesamten Einsatzes ansammelt, erlangt die Kontrolle über den Fork-Choice-Algorithmus. Dies ermöglicht es dem Angreifer, bestimmte Transaktionen zu zensieren, kurzfristige Reorganisationen durchzuführen und MEV zu extrahieren, indem er Blöcke zu seinen Gunsten neu anordnet.

[Mehr zu Angriffen auf Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Was ist soziale Koordination und warum wird sie benötigt? {#what-is-social-coordination}

Soziale Koordination ist eine letzte Verteidigungslinie für Ethereum, die es ermöglichen würde, eine ehrliche Chain von einem Angriff zu erholen, der unehrliche Blöcke finalisiert hat. In diesem Fall müsste sich die Ethereum-Community „Out-of-Band“ koordinieren und sich darauf einigen, einen ehrlichen Minderheits-Fork zu verwenden, wobei die Validatoren des Angreifers im Zuge dessen geslasht werden. Dies würde erfordern, dass auch Apps und Börsen den ehrlichen Fork anerkennen.

[Mehr zur sozialen Koordination lesen](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Werden die Reichen bei Proof-of-Stake reicher? {#do-rich-get-richer}

Je mehr ETH jemand für das Staking hat, desto mehr Validatoren kann er betreiben und desto mehr Belohnungen kann er ansammeln. Die Belohnungen skalieren linear mit der Menge der eingesetzten ETH, und jeder erhält die gleiche prozentuale Rendite. Proof-of-Work bereichert die Reichen mehr als Proof-of-Stake, da reichere Miner, die Hardware in großem Maßstab kaufen, von Skaleneffekten profitieren, was bedeutet, dass die Beziehung zwischen Reichtum und Belohnung nicht linear ist.

## Ist Proof-of-Stake zentralisierter als Proof-of-Work? {#is-pos-decentralized}

Nein, Proof-of-Work tendiert zur Zentralisierung, da die Mining-Kosten steigen und Einzelpersonen, dann kleine Unternehmen und so weiter vom Markt verdrängen. Das aktuelle Problem bei Proof-of-Stake ist der Einfluss von Liquid Staking Derivatives (LSDs). Dies sind Token, die von einem Anbieter eingesetzte ETH repräsentieren und die jeder auf Sekundärmärkten tauschen kann, ohne dass das eigentliche ETH-Staking beendet wird. LSDs ermöglichen es Benutzern, mit weniger als 32 ETH am Staking teilzunehmen, aber sie schaffen auch ein Zentralisierungsrisiko, bei dem einige wenige große Organisationen am Ende einen Großteil des Einsatzes kontrollieren können. Aus diesem Grund ist [Solo-Staking](/staking/solo) die beste Option für Ethereum.

[Mehr zur Zentralisierung von Einsätzen bei LSDs](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Warum kann ich nur ETH für das Staking verwenden? {#why-can-i-only-stake-eth}

ETH ist die native Währung von Ethereum. Es ist unerlässlich, eine einzige Währung zu haben, in der alle Einsätze denominiert sind, sowohl für die Bilanzierung effektiver Kontostände zur Gewichtung von Stimmen als auch für die Sicherheit. ETH selbst ist eine grundlegende Komponente von Ethereum und kein Smart Contract. Die Einbeziehung anderer Währungen würde die Komplexität erheblich erhöhen und die Sicherheit des Stakings verringern.

## Ist Ethereum die einzige Proof-of-Stake-Blockchain? {#is-ethereum-the-only-pos-blockchain}

Nein, es gibt mehrere Proof-of-Stake-Blockchains. Keine ist identisch mit Ethereum; der Proof-of-Stake-Mechanismus von Ethereum ist einzigartig.

## Was ist The Merge? {#what-is-the-merge}

The Merge war der Moment, in dem Ethereum seinen auf Proof-of-Work basierenden Konsensmechanismus abschaltete und seinen auf Proof-of-Stake basierenden Konsensmechanismus einschaltete. The Merge fand am 15. September 2022 statt.

[Mehr zu The Merge](/roadmap/merge)

## Was sind Lebendigkeit (Liveness) und Sicherheit (Safety)? {#what-are-liveness-and-safety}

Lebendigkeit und Sicherheit sind die beiden grundlegenden Sicherheitsaspekte für eine Blockchain. Lebendigkeit ist die Verfügbarkeit einer finalisierenden Chain. Wenn die Chain aufhört zu finalisieren oder Benutzer nicht einfach darauf zugreifen können, handelt es sich um Lebendigkeitsausfälle. Extrem hohe Zugangskosten könnten ebenfalls als Lebendigkeitsausfall betrachtet werden. Sicherheit bezieht sich darauf, wie schwierig es ist, die Chain anzugreifen – d. h. widersprüchliche Checkpoints zu finalisieren.

[Mehr dazu im Casper-Paper lesen](https://arxiv.org/pdf/1710.09437.pdf)