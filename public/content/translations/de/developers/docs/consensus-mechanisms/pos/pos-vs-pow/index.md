---
title: Proof-of-Stake vs. Proof-of-Work
description: Ein Vergleich zwischen Ethereums Proof-of-Stake- und Proof-of-Work-basiertem Konsensmechanismus
lang: de
---

Als [Ethereum](/) an den Start ging, benötigte Proof-of-Stake noch viel Forschung und Entwicklung, bevor man darauf vertrauen konnte, dass es Ethereum absichert. Proof-of-Work war ein einfacherer Mechanismus, der sich bereits bei Bitcoin bewährt hatte, was bedeutete, dass die Kernentwickler ihn sofort implementieren konnten, um Ethereum auf den Weg zu bringen. Es dauerte weitere acht Jahre, um Proof-of-Stake so weit zu entwickeln, dass es implementiert werden konnte.

Diese Seite erklärt die Beweggründe für Ethereums Wechsel von Proof-of-Work zu Proof-of-Stake und die damit verbundenen Kompromisse.

## Sicherheit {#security}

Ethereum-Forscher halten Proof-of-Stake für sicherer als Proof-of-Work. Es wurde jedoch erst vor Kurzem für das echte Ethereum-Mainnet implementiert und ist weniger praxiserprobt als Proof-of-Work. Die folgenden Abschnitte erörtern die Vor- und Nachteile des Sicherheitsmodells von Proof-of-Stake im Vergleich zu Proof-of-Work.

### Kosten eines Angriffs {#cost-to-attack}

Bei Proof-of-Stake müssen Validatoren mindestens 32 ETH in einem Smart Contract hinterlegen ("Staking"). Ethereum kann gestakte Ether zerstören, um Validatoren zu bestrafen, die sich falsch verhalten. Um zu einem Konsens zu gelangen, müssen mindestens 66 % der gesamten gestakten Ether für eine bestimmte Gruppe von Blöcken stimmen. Blöcke, für die >=66 % des Einsatzes gestimmt haben, werden "finalisiert", was bedeutet, dass sie nicht entfernt oder neu organisiert werden können.

Das Netzwerk anzugreifen kann bedeuten, die Finalisierung der Chain zu verhindern oder eine bestimmte Anordnung von Blöcken in der kanonischen Chain sicherzustellen, die einem Angreifer in irgendeiner Weise zugutekommt. Dies erfordert, dass der Angreifer den Pfad des ehrlichen Konsenses umleitet, indem er entweder eine große Menge an Ether ansammelt und direkt damit abstimmt oder ehrliche Validatoren dazu bringt, auf eine bestimmte Weise abzustimmen. Abgesehen von raffinierten Angriffen mit geringer Wahrscheinlichkeit, die ehrliche Validatoren austricksen, entsprechen die Kosten für einen Angriff auf Ethereum den Kosten des Einsatzes, den ein Angreifer ansammeln muss, um den Konsens zu seinen Gunsten zu beeinflussen.

Die geringsten Kosten für einen Angriff betragen >33 % des gesamten Einsatzes. Ein Angreifer, der >33 % des gesamten Einsatzes hält, kann eine Verzögerung der Finalität verursachen, indem er einfach offline geht. Dies ist ein relativ kleines Problem für das Netzwerk, da es einen Mechanismus gibt, der als "Inactivity Leak" (Inaktivitätsverlust) bekannt ist und den Einsatz von Offline-Validatoren abzieht, bis die Online-Mehrheit 66 % des Einsatzes repräsentiert und die Chain wieder finalisieren kann. Es ist theoretisch auch möglich, dass ein Angreifer mit etwas mehr als 33 % des gesamten Einsatzes eine doppelte Finalität verursacht, indem er zwei Blöcke anstelle von einem erstellt, wenn er aufgefordert wird, ein Blockproduzent zu sein, und dann mit all seinen Validatoren doppelt abstimmt. Jeder Fork erfordert nur, dass 50 % der verbleibenden ehrlichen Validatoren jeden Block zuerst sehen. Wenn es ihnen also gelingt, ihre Nachrichten genau richtig zu timen, können sie möglicherweise beide Forks finalisieren. Dies hat eine geringe Erfolgswahrscheinlichkeit, aber wenn ein Angreifer in der Lage wäre, eine doppelte Finalität zu verursachen, müsste die Ethereum-Community entscheiden, einem Fork zu folgen, in welchem Fall die Validatoren des Angreifers auf dem anderen zwangsläufig dem Slashing unterliegen würden.

Mit >33 % des gesamten Einsatzes hat ein Angreifer die Chance, eine geringfügige (Verzögerung der Finalität) oder schwerwiegendere (doppelte Finalität) Auswirkung auf das Ethereum-Netzwerk zu haben. Mit mehr als 14.000.000 ETH, die im Netzwerk gestakt sind, und einem repräsentativen Preis von 1000 $/ETH betragen die Mindestkosten für die Durchführung dieser Angriffe `1000 x 14,000,000 x 0.33 = $4,620,000,000`. Der Angreifer würde dieses Geld durch Slashing verlieren und aus dem Netzwerk geworfen werden. Um erneut anzugreifen, müsste er (erneut) >33 % des Einsatzes ansammeln und (erneut) verbrennen. Jeder Versuch, das Netzwerk anzugreifen, würde >4,6 Milliarden $ kosten (bei 1000 $/ETH und 14 Mio. gestakten ETH). Der Angreifer wird auch aus dem Netzwerk geworfen, wenn er geslasht wird, und muss sich in eine Aktivierungswarteschlange einreihen, um wieder beizutreten. Dies bedeutet, dass die Rate eines wiederholten Angriffs nicht nur auf die Rate begrenzt ist, mit der der Angreifer >33 % des gesamten Einsatzes ansammeln kann, sondern auch auf die Zeit, die benötigt wird, um all seine Validatoren in das Netzwerk aufzunehmen. Jedes Mal, wenn der Angreifer angreift, wird er viel ärmer und der Rest der Community wird dank des daraus resultierenden Angebotsschocks reicher.

Andere Angriffe, wie 51-%-Angriffe oder die Umkehrung der Finalität mit 66 % des gesamten Einsatzes, erfordern wesentlich mehr ETH und sind für den Angreifer viel kostspieliger.

Vergleichen Sie dies mit Proof-of-Work. Die Kosten für den Start eines Angriffs auf das Proof-of-Work-Ethereum entsprachen den Kosten für den dauerhaften Besitz von >50 % der gesamten Hash-Rate des Netzwerks. Dies belief sich auf die Hardware- und Betriebskosten für ausreichend Rechenleistung, um andere Miner auszustechen und Proof-of-Work-Lösungen konsistent zu berechnen. Ethereum wurde hauptsächlich mit GPUs anstelle von ASICs gemint, was die Kosten niedrig hielt (obwohl ASIC-Mining möglicherweise populärer geworden wäre, wenn Ethereum bei Proof-of-Work geblieben wäre). Ein Angreifer müsste viel Hardware kaufen und für den Strom bezahlen, um sie zu betreiben, um ein Proof-of-Work-Ethereum-Netzwerk anzugreifen, aber die Gesamtkosten wären geringer als die Kosten, die erforderlich sind, um genug ETH anzusammeln, um einen Angriff zu starten. Ein 51-%-Angriff ist bei Proof-of-Work ~[20-mal weniger](https://youtu.be/1m12zgJ42dI?t=1562) teuer als bei Proof-of-Stake. Wenn der Angriff entdeckt und die Chain einem Hard-Fork unterzogen würde, um ihre Änderungen zu entfernen, könnte der Angreifer wiederholt dieselbe Hardware verwenden, um den neuen Fork anzugreifen.

### Komplexität {#complexity}

Proof-of-Stake ist viel komplexer als Proof-of-Work. Dies könnte ein Punkt zugunsten von Proof-of-Work sein, da es schwieriger ist, versehentlich Fehler oder unbeabsichtigte Effekte in einfachere Protokolle einzuführen. Die Komplexität wurde jedoch durch jahrelange Forschung und Entwicklung, Simulationen und Testnet-Implementierungen gebändigt. Das Proof-of-Stake-Protokoll wurde unabhängig von fünf separaten Teams (jeweils auf der Ausführungsebene und der Konsensebene) in fünf Programmiersprachen implementiert, was Widerstandsfähigkeit gegen Anwendungs-Bugs bietet.

Um die Proof-of-Stake-Konsenslogik sicher zu entwickeln und zu testen, wurde die Beacon Chain zwei Jahre vor der Implementierung von Proof-of-Stake im Ethereum-Mainnet gestartet. Die Beacon Chain fungierte als Sandbox für Proof-of-Stake-Tests, da es sich um eine Live-Blockchain handelte, die die Proof-of-Stake-Konsenslogik implementierte, ohne jedoch echte Ethereum-Transaktionen zu berühren – sie fand effektiv nur einen Konsens über sich selbst. Nachdem dies für eine ausreichende Zeit stabil und fehlerfrei war, wurde die Beacon Chain mit dem Ethereum-Mainnet "zusammengeführt". All dies trug dazu bei, die Komplexität von Proof-of-Stake so weit zu bändigen, dass das Risiko unbeabsichtigter Folgen oder Anwendungs-Bugs sehr gering war.

### Angriffsfläche {#attack-surface}

Proof-of-Stake ist komplexer als Proof-of-Work, was bedeutet, dass es mehr potenzielle Angriffsvektoren zu bewältigen gibt. Anstelle eines Peer-to-Peer-Netzwerks, das Anwendungen verbindet, gibt es zwei, von denen jedes ein separates Protokoll implementiert. Die Vorauswahl eines bestimmten Validators, der in jedem Slot einen Block vorschlägt, schafft das Potenzial für Denial-of-Service-Angriffe, bei denen große Mengen an Netzwerkverkehr diesen bestimmten Validator offline nehmen.

Es gibt auch Möglichkeiten für Angreifer, die Veröffentlichung ihrer Blöcke oder Bestätigungen sorgfältig zu timen, sodass sie von einem bestimmten Anteil des ehrlichen Netzwerks empfangen werden und diese dazu beeinflussen, auf bestimmte Weise abzustimmen. Schließlich kann ein Angreifer einfach ausreichend ETH ansammeln, um sie als Einsatz zu hinterlegen und den Konsensmechanismus zu dominieren. Jeder dieser [Angriffsvektoren hat zugehörige Verteidigungsmaßnahmen](/developers/docs/consensus-mechanisms/pos/attack-and-defense), aber sie existieren nicht, um unter Proof-of-Work verteidigt zu werden.

## Dezentralisierung {#decentralization}

Proof-of-Stake ist dezentralisierter als Proof-of-Work, da das Wettrüsten bei Mining-Hardware dazu neigt, Einzelpersonen und kleine Organisationen preislich zu verdrängen. Während technisch gesehen jeder mit bescheidener Hardware mit dem Mining beginnen kann, ist die Wahrscheinlichkeit, eine Belohnung zu erhalten, im Vergleich zu institutionellen Mining-Betrieben verschwindend gering. Bei Proof-of-Stake sind die Kosten für das Staking und die prozentuale Rendite auf diesen Einsatz für alle gleich. Es kostet derzeit 32 ETH, einen Validator zu betreiben.

Andererseits hat die Erfindung von Liquid-Staking-Derivaten zu Zentralisierungsbedenken geführt, da einige wenige große Anbieter große Mengen an gestakten ETH verwalten. Dies ist problematisch und muss so schnell wie möglich korrigiert werden, aber es ist auch nuancierter, als es scheint. Zentralisierte Staking-Anbieter haben nicht zwangsläufig die zentralisierte Kontrolle über Validatoren – oft ist es nur eine Möglichkeit, einen zentralen Pool von ETH zu schaffen, den viele unabhängige Blockchain-Knoten-Betreiber staken können, ohne dass jeder Teilnehmer 32 eigene ETH benötigt.

Die beste Option für Ethereum ist, dass Validatoren lokal auf Heimcomputern ausgeführt werden, was die Dezentralisierung maximiert. Aus diesem Grund widersetzt sich Ethereum Änderungen, die die Hardwareanforderungen für den Betrieb eines Blockchain-Knotens/Validators erhöhen.

## Nachhaltigkeit {#sustainability}

Proof-of-Stake ist eine kohlenstoffarme Methode zur Absicherung der Blockchain. Unter Proof-of-Work konkurrieren Miner um das Recht, einen Block zu minen. Miner sind erfolgreicher, wenn sie Berechnungen schneller durchführen können, was Investitionen in Hardware und Energieverbrauch anreizt. Dies wurde bei Ethereum beobachtet, bevor es zu Proof-of-Stake wechselte. Kurz vor dem Übergang zu Proof-of-Stake verbrauchte Ethereum etwa 78 TWh/Jahr – so viel wie ein kleines Land. Der Wechsel zu Proof-of-Stake reduzierte diesen Energieaufwand jedoch um ~99,98 %. Proof-of-Stake machte Ethereum zu einer energieeffizienten, kohlenstoffarmen Plattform.

[Mehr über den Energieverbrauch von Ethereum](/energy-consumption)

## Emission {#issuance}

Das Proof-of-Stake-Ethereum kann für seine Sicherheit bezahlen, indem es weitaus weniger Coins ausgibt als das Proof-of-Work-Ethereum, da Validatoren keine hohen Stromkosten zahlen müssen. Infolgedessen kann ETH seine Inflation reduzieren oder sogar deflationär werden, wenn große Mengen an ETH verbrannt werden. Niedrigere Inflationsraten bedeuten, dass die Sicherheit von Ethereum billiger ist als unter Proof-of-Work.

## Lernen Sie besser visuell? {#visual-learner}

Sehen Sie sich an, wie Justin Drake die Vorteile von Proof-of-Stake gegenüber Proof-of-Work erklärt:

<YouTube id="1m12zgJ42dI" />

## Weiterführende Literatur {#further-reading}

- [Vitaliks Proof-of-Stake-Designphilosophie](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitaliks Proof-of-Stake-FAQs](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- ["Simply Explained"-Video über PoS vs. PoW](https://www.youtube.com/watch?v=M3EFi_POhps)