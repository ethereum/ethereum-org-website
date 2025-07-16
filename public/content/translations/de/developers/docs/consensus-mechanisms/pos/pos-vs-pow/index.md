---
title: Proof-of-Stake vs. Proof-of-Work
description: Ein Vergleich zwischen dem auf Proof-of-Stake und auf Proof-of-Work basierenden Konsensmechanismus auf Ethereum
lang: de
---

Als Ethereum veröffentlicht wurde, war immer noch viel Forschung und Entwicklung zu leisten, bevor dem Proof-of-Stake-System genug Vertrauen für die Sicherung von Ethereum entgegengebracht wurde. Proof-of-Work war ein einfacherer Mechanismus, der sich bereits mit Bitcoin bewährt hatte, was bedeutete, dass Core-Entwickler das System direkt implementieren konnten, damit Ethereum veröffentlicht werden konnte. Es dauerte weitere acht Jahre, um Proof-of-Stake ausreichend weiterzuentwickeln, dass es implementiert werden konnte.

Auf dieser Seite werden die Gründe für Ethereums Wechsel von Proof-of-Work zu Proof-of-Stake und die damit verbundenen Kompromisse erläutert.

## Sicherheit {#security}

Ethereums Forscher halten Proof-of-Stake für sicherer als Proof-of-Work. Jedoch wurde es erst vor kurzer Zeit zum echtem Ethereum Mainnet hinzugefügt und ist weniger zeiterprobt als Proof-of-Work. In den folgenden Abschnitten werden die Vor- und Nachteile des Proof-of-Stake-Sicherheitsmodells im Vergleich zu Proof-of-Work diskutiert.

### Kosten eines Angriffs {#cost-to-attack}

Bei Proof-of-Stake müssen Validatoren mindestens 32 ETH in einen Smart Contract transferieren („staken“). Ethereum kann eingesetzte Ether zerstören, um Validatoren, die sich falsch verhalten, zu bestrafen. Um einen Konsens zu erreichen, müssen mindestens 66 % der insgesamt eingesetzten Ether für eine bestimmte Gruppe von Blöcken abstimmen. Blöcke, für die >=66 % des Stakes abgestimmt haben, werden „finalisiert“, was bedeutet, dass sie nicht mehr entfernt oder neu organisiert werden können.

Ein Angriff auf das Netzwerk kann bedeuten, das Finalisieren der Chain zu verhindern oder eine bestimmte Anordnung von Blöcken in der kanonischen Chain zu erreichen, die für den Angreifer von Vorteil ist. Dies erfordert, dass der Angreifer ehrliche Konsensbildung umgeht, indem er entweder eine große Menge an Ether anhäuft und damit direkt abstimmt oder ehrliche Validatoren dazu bringt, auf eine bestimmte Weise abzustimmen. Wenn wir ausgeklügelte, unwahrscheinliche Angriffe zur Täuschung ehrlicher Validierer für den Moment außen vor lassen, belaufen sich die Kosten für einen Angriff auf Ethereum auf die Kosten für den Stake, den ein Angreifer aufbringen muss, um den Konsens zu seinen Gunsten zu beeinflussen.

Die niedrigsten Angriffskosten sind >33 % des gesamten Stakes. Ein Angreifer, der >33 % des gesamten Stakes hält, könnte einfach nur, indem er offline geht, eine Endgültigkeitsverzögerung hervorrufen. Dies ist ein relativ geringes Problem für das Netzwerk, da es einen Mechanismus gibt, der als „Inactivity Leak“ bekannt ist und den Offline-Validatoren Stake entzieht, bis die Online-Mehrheit 66 % des Stakes repräsentiert und die Chain wieder finalisieren kann. Es ist für einen Angreifer auch theoretisch möglich, mit etwas über 33 % des Gesamt-Stakes eine doppelte Endgültigkeit herbeizuführen. Hierzu würde er zwei Blöcke statt einem Block erzeugen, wenn er darum gebeten wird, als Block-Producer zu fungieren, und dann mit all seinen Validatoren doppelt abstimmen. Bei jeder Abspaltung müssen nur 50 % der verbleibenden ehrlichen Validatoren jeden Block zuerst sehen. Wenn der Angreifer es also schafft, seine Nachrichten zum genau richtigen Zeitpunkt zu versenden, könnte es ihm gelingen, beide Abspaltungen zu finalisieren. Die Wahrscheinlichkeit, dass dies gelingt, ist zwar gering. Wenn ein Angreifer jedoch in der Lage wäre, eine doppelte Endgültigkeit herbeizuführen, müsste sich die Ethereum-Community dazu entscheiden, einer der Abspaltungen zu folgen. In diesem Fall würden die Validatoren des Angreifers auf der anderen Abspaltung zwangsläufig mit Slashing bestraft werden.

Mit >33 % des gesamten Stakes hat ein Angreifer die Chance, das Ethereum-Netzwerk geringfügig (Endgültigkeitsverzögerung) oder schwerwiegender (doppelte Endgültigkeit) zu beeinflussen. Bei mehr als 14.000.000 ETH im Netzwerk und einem repräsentativen Preis von 1.000 $/ETH betragen die Mindestkosten für diese Angriffe `1.000 x 14.000.000 x 0,33 = 4.620.000.000 $`. Der Angreifer würde dieses Geld durch das Slashing verlieren und vom Netzwerk ausgestoßen werden. Um nochmal anzugreifen, müsste er erneut >33 % des Stakes ansammeln und erneut verbrennen. Jeder Versuch, das Netzwerk anzugreifen, würde >4,6 Milliarden $ kosten (bei 1.000 $/ETH und 14 Mio. eingesetzten ETH). Der Angreifer wird auch vom Netzwerk ausgeschlossen, wenn er mit Slashing bestraft wird, und müsste einer Aktivierungswarteschlange beitreten, um wieder ins Netzwerk zu gelangen. Das bedeutet, dass die Wiederholungsrate eines Angriffs nicht nur durch die Geschwindigkeit begrenzt ist, mit der der Angreifer >33 % des Gesamt-Stakes anhäufen kann, sondern auch durch die Zeit, die er benötigt, um alle seine Validatoren in das Netz einzubinden. Jedes Mal, wenn ein Akteur angreift, verliert er Unmengen an Geld, und der Rest der Community profitiert finanziell dank des aus dem Angriff resultierenden Angebotsschocks.

Für andere Angriffe wie 51 %-Angriffe oder Endgültigkeitsumkehrung mit 66 % des gesamten Stakes sind wesentlich mehr ETH erforderlich. Sie sind auch für den Angreifer deutlich kostspieliger.

Vergleichen Sie das mit Proof-of-Stake. Die Kosten für einen Angriff auf Proof-of-Work-Ethereum entsprachen den Kosten, die notwendig waren, um konstant >50 % der gesamten Hash-Rate des Netzwerks zu besitzen. Dies waren die Hardware- und Betriebskosten zur Aufrechterhaltung von ausreichend Rechenleistung, um andere Miner konstant bei der Berechnung von Proof-of-Work-Lösungen zu übertreffen. Auf Ethereum wurde größtenteils mit GPUs und nicht mit ASICs geschürft, was die Kosten niedrig hielt (obwohl auf Ethereum, hätte es am Proof-of-Work-Mechanismus festgehalten, ASIC Mining möglicherweise populärer geworden wäre). Ein Angreifer müsste eine Menge Hardware kaufen und den Strom dafür bezahlen, um ein Proof-of-Work-Ethereum-Netzwerk anzugreifen. Die Gesamtkosten wären allerdings geringer als die Kosten, die erforderlich sind, um genug ETH für einen Angriff zu sammeln. Ein 51 %-Angriff ist [20-mal weniger](https://youtu.be/1m12zgJ42dI?t=1562) teuer bei Proof-of-Work als bei Proof-of-Stake. Wenn der Angriff entdeckt und die Chain hart abgespalten worden wäre, um die Änderungen wieder zu entfernen, könnte der Angreifer wiederholt dieselbe Hardware verwenden, um die neue Abspaltung anzugreifen.

### Komplexität {#complexity}

Proof-of-Stake ist viel komplexer als Proof-of-Work. Dies könnte ein Vorteil für Proof-of-Work sein, da es schwerer ist, aus Versehen Bugs oder ungewollte Effekte in einfachere Protokolle einzuführen. Jedoch hat sich die Komplexität nach Jahren von Forschung und Entwicklung, Simulationen und Testnetz-Implementationen verringert. Das Proof-of-Stake-Protokoll wurde unabhängig voneinander von fünf verschiedenen Teams (jeweils auf Ausführungs- und Konsensebene) in fünf Programmiersprachen implementiert, was zur Folge hat, dass es gegen Client-Bugs sehr widerstandsfähig ist.

Um die Proof-of-Stake-Konsenslogik sicher zu testen und zu entwickeln, wurde die Beacon Chain zwei Jahre vor der Implementierung von Proof-of-Stake auf Ethereums Mainnet veröffentlicht. Die Beacon Chain diente als Sandbox für Proof-of-Stake-Tests, da es sich um eine Live-Blockchain zur Implementierung der Proof-of-Stake-Konsenslogik handelte, die jedoch nichts mit echten Ethereum-Transaktionen zu tun hatte – sie erreichte praktisch nur aus sich selbst heraus eine Übereinstimmung. Sobald dies lange genug stabil und ohne Bugs funktioniert hatte, wurde die Beacon Chain mit Ethereums Mainnet zusammengeführt. Das hat alles dazu beigetragen, die Komplexität von Proof-of-Stake so weit zu verringern, dass das Risiko für unbeabsichtigte Konsequenzen oder Client-Bugs nur noch sehr gering war.

### Angriffsfläche {#attack-surface}

Proof-of-Stake ist komplexer als Proof-of-Work, was bedeutet, dass mehr potenzielle Angriffsvektoren berücksichtigt werden müssen. Anstatt eines Peer-to-Peer-Netzwerks zur Verbindung von Clients gibt es davon zwei, die jeweils ein eigenes Protokoll implementieren. Wenn in jedem Slot ein bestimmter Validator für ein Block-Proposal vorausgewählt wird, kann es potenziell zu einem Denial-of-Service kommen, wobei via große Mengen an Datenverkehr im Netzwerk dieser spezielle Validator außer Gefecht gesetzt wird.

Es gibt auch Möglichkeiten für Angreifer, die Freigabe ihrer Blöcke oder Attestierungen sorgfältig so zu timen, dass sie von einem bestimmten Teil des ehrlichen Netzwerks empfangen werden und ihn dazu bringen, auf eine bestimmte Weise abzustimmen. Schließlich kann ein Angreifer einfach genügend ETH anhäufen, um den Konsensmechanismus mit seinem Stake zu dominieren. Für jeden dieser [Angriffsvektoren existieren entsprechende Abwehrmaßnahmen](/developers/docs/consensus-mechanisms/pos/attack-and-defense), diese sind jedoch nicht für eine Verteidigung im Rahmen eines Proof-of-Work-Angriffs gedacht.

## Dezentralisierung {#decentralization}

Proof-of-Stake ist dezentraler als Proof-of-Work, da das Wettrüsten um die Mining-Hardware tendenziell dazu führt, dass Einzelpersonen und kleine Organisationen das Nachsehen haben. Zwar kann jeder theoretisch mit einfacher Hardware mit dem Mining beginnen, doch ist die Wahrscheinlichkeit dafür, dass sie eine Belohnung erhalten, im Vergleich zu institutionellen Mining-Operationen verschwindend gering. Bei Proof-of-Stake sind die Kosten für das Staking und die prozentuale Rendite daraus für alle gleich. Es kostet aktuell 32 ETH, einen Validator zu betreiben.

Andererseits hat die Erfindung von Liquid Staking Derivatives zu Bedenken bezüglich zu starker Zentralisierung geführt, da einige wenige große Anbieter große Mengen an eingesetzten ETH verwalten. Diese Entwicklung ist problematisch und muss so bald wie möglich korrigiert werden, jedoch ist die Situation differenzierter, als es zunächst den Anschein hat. Zentralisierte Staking-Anbieter verfügen nicht zwangsläufig über eine zentrale Kontrolle über Validatoren – oft nutzen sie den Prozess nur als Möglichkeit, einen zentralen ETH-Pool zu schaffen, in den viele unabhängige Node-Betreiber Kapital einsetzen können, ohne dass jeder einzelne Teilnehmer 32 ETH beisteuern muss.

Die beste Option für Ethereum sind Validatoren, die lokal auf Heimcomputern betrieben werden und mit denen ein maximales Ausmaß an Dezentralisierung erreicht werden kann. Aus diesem Grund wehrt sich Ethereum gegen Änderungen, die die Hardwareanforderungen für den Betrieb eines Nodes/Validators erhöhen.

## Nachhaltigkeit {#sustainability}

Proof-of-Stake ist ein kohlenstoffarmer Weg zur Sicherung der Blockchain. Unter Proof-of-Work konkurrieren Miner um das Recht, einen Block zu schürfen. Miner sind erfolgreicher, wenn sie ihre Berechnungen schneller durchführen können. Das schafft Anreize für Investitionen in die Hardware und sorgt für höheren Energieverbrauch. Dies wurde für Ethereum vor dem Wechsel zu Proof-of-Stake beobachtet. Kurz vorm Übergang zu Proof-of-Stake verbrauchte Ethereum ungefähr 78 TWh/Jahr gebraucht – so viel wie ein kleines Land. Der Wechsel zu Proof-of-Stake hat den Energieverbrauch hingegen um ~99,98 % gesenkt. Proof-of-Stake machte Ethereum zu einer energieeffizienten Plattform, für die wenig Kohlenstoff ausgestoßen wird.

[Mehr über Ethereums Energieverbrauch](/energy-consumption)

## Ausgabe {#issuance}

Proof-of-Stake-Ethereum kann für seine Sicherheit bezahlen, indem viel weniger Münzen als bei Proof-of-Work-Ethereum ausgeben werden, da die Validatoren keine hohen Stromkosten bezahlen müssen. Infolgedessen kann ETH seine Inflation verringern oder sogar deflationär werden, sollten große Mengen an ETH verbrannt werden. Niedrigere Inflationsniveaus bedeuten, dass Ethereums Sicherheit günstiger ist, als das unter Proof-of-Work der Fall gewesen war.

## Eher der visuelle Lernende? {#visual-learner}

Hier erklärt Justin Drake die Vorteile von Proof-of-Stake im Vergleich zu Proof-of-Work:

<YouTube id="1m12zgJ42dI" />

## Weiterführende Informationen {#further-reading}

- [Vitaliks Designphilosophie für Proof-of-Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitaliks Proof-of-Stake-FAQs](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [„Einfach erklärt“-Video zu PoS vs. PoW](https://www.youtube.com/watch?v=M3EFi_POhps)
