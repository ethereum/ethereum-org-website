---
title: "Ethereums Evolution: Fusaka, Glamsterdam und darüber hinaus"
description: "Preston Van Loon über die kommenden Protokoll-Upgrades von Ethereum, einschließlich der Roadmap-Meilensteine Fusaka und Glamsterdam sowie der langfristigen Evolution des Protokolls."
lang: de
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-und-prioritaeten"
  - "roadmap"
  - "upgrades"
format: presentation
author: ETHDenver
breadcrumb: "Ethereums Evolution"
---

Eine Präsentation von **Preston Van Loon** von Offchain Labs und Prysm, gehalten auf der ETHDenver. Preston behandelt die jüngste Upgrade-Geschwindigkeit von Ethereum und was dem Netzwerk bevorsteht, einschließlich Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, kürzerer Slot-Zeiten und schnellerer Endgültigkeit.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=GgKveVMLnoo), das von der ETHDenver veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:07) {#introduction-007}

**Moderator:** Alles klar, Leute. Machen wir direkt weiter. Wir werden mit Preston Van Loon über die Evolution von Ethereum sprechen. Leg los.

**Preston Van Loon:** Alles klar. Danke. GM – ihr wisst, es heißt immer GM, egal ob Tag oder Nacht, ob es Morgen ist oder nicht. Also sehe ich GM den ganzen Tag und die ganze Nacht. Ich möchte über die Evolution von Ethereum sprechen, also fangen wir an.

Es gibt ein Narrativ, das ihr wahrscheinlich schon einmal gehört habt: Ethereum ist zu langsam bei der Auslieferung. Ich weiß, ihr habt es gehört. Ich habe es gehört. Ihr habt es viele Male gehört. Die Leute sagten: „Wann Merge? Können die Entwickler nicht etwas tun? Andere Chains bewegen sich schnell. Warum bewegt sich Ethereum so langsam?“ Ich bin hier, um euch zu sagen, dass dieses Narrativ tot ist.

Ich arbeite am Konsens-Client Prysm. Er ist eine der Schlüsselkomponenten der Ethereum Beacon Chain. Und ich war bei den jüngsten Updates an vorderster Front dabei – bei Pectra, Fusaka. Nach dem, was ich von innen gesehen habe, war dies keine langsam mahlende Bürokratie, wie die Leute es seit vielen Jahren über Ethereum behaupten. Es war tatsächlich eine hochgeschwindigkeits-, gut funktionierende Maschine, die einige der größten Upgrades geliefert hat, die wir jemals in der Geschichte von Ethereum gesehen haben.

#### Auslieferung von drei Upgrades in einem Jahr (1:18) {#shipping-three-upgrades-in-one-year-118}

Was wir 2025 ausgeliefert haben, waren drei große Updates in einem Jahr. Zuerst Pectra im Mai 2025. Dies führte native Kontoabstraktion ein, eine Erhöhung des maximalen effektiven Guthabens für Validatoren, was Konsolidierungen ermöglichte, und zehn weitere EIPs. Im Mai war dies das größte Upgrade in Bezug auf EIPs, das Ethereum je gesehen hatte.

Aber dann, nur sieben Monate später, lieferten wir Fusaka aus – ein noch größeres Upgrade in Bezug auf EIPs. Dieses hatte dreizehn, mit einer Innovation namens PeerDAS, was wirklich aufregend ist. Aber nur sechs Tage später haben wir erneut mit einem BPO1-Fork aktualisiert, und BPO2 folgte kurz darauf, was die Blob-Kapazität von Ethereum erhöhte.

Dies ist ein Beweis für die Lieferfähigkeit von Ethereum. Dies ist eine Zusammenarbeit zwischen fünf oder sechs Konsens-Clients, fünf Ausführungs-Clients, vielen Forschern – über hundert Personen, die an der Kernentwicklung von Ethereum beteiligt sind – und sie alle liefern koordiniert zur gleichen Zeit aus.

#### PeerDAS-Skalierung (2:22) {#peerdas-scaling-222}

Werfen wir einen Blick auf das Highlight von Fusaka: PeerDAS. PeerDAS ist eine sehr großartige Skalierungslösung. Vor PeerDAS hatten wir Pectra, und mit Pectra musste man – als Knotenbetreiber oder Validator – jeden Blob herunterladen, der mit einem Block kam. Das Ziel waren sechs Blobs pro Block. Jeder musste sie herunterladen, und das ist wirklich ein Skalierungsengpass. Wenn man das erhöhen möchte, verlangt man von den Knotenbetreibern, ihre Bandbreitennutzung für Blobs proportional zu erhöhen.

Jetzt mit Fusaka haben wir Blobs, die Erasure-codiert sind, und verlangen von Validatoren, nur einen Teil davon aufzubewahren. Man muss nur ein Achtel der Blobs aufbewahren. Und mit beliebigen 50 % der Blobs kann man das Ganze rekonstruieren. Da dies über das Netzwerk verteilt ist, wird sichergestellt, dass die Datenverfügbarkeit gegeben ist und Solo-Staker weniger belastet werden. Dies gibt uns eine sofortige Reduzierung der Netzwerkbandbreite bei der Blob-Nutzung um fast 90 %.

Wenn wir uns die Zahlen ansehen: Für Pectra hatten wir ein Ziel von sechs und ein Maximum von neun Blobs mit einem Gaslimit von 36 Millionen. Wir betrachten dies als Basislinie für die Blob-Nutzung – das waren 768 Kilobyte pro Block. Zwischen Pectra und Fusaka hatten wir ein Out-of-Band-Upgrade, bei dem das Gaslimit erhöht wurde. Dies war ein Onchain-Governance-Prozess, bei dem Validatoren einfach darüber abstimmten, was ihrer Meinung nach das Blocklimit sein sollte – es stieg von 36 auf 45 Millionen. Und später im Jahr kamen wir zu Fusaka, was das Blob-Ziel oder -Maximum nicht veränderte, aber das Gaslimit erneut erhöhte.

Und dann bekamen wir diesen großen Rückgang der Bandbreite, bei dem jeder Block mit einem Ziel von sechs Blobs jetzt nur noch 96 Kilobyte an Blob-Daten umfasst, die ein Validator speichern musste. Dann haben wir mit BPO1, dem Blob-Parameter-Only-Fork, das Ziel auf 10 und das Maximum auf 15 erhöht. BPO2, das nur einen Monat später stattfand, ging auf 14 und 21 – was das Doppelte von dem ist, was wir in Pectra hatten, aber immer noch 71 % weniger Bandbreitennutzung für Blobs für Solo-Staker bedeutet.

#### Was in Glamsterdam kommt (4:30) {#whats-coming-in-glamsterdam-430}

Was kommt als Nächstes in Glamsterdam? Es gibt drei wirklich wichtige Dinge und eines, das noch aktiv erforscht wird.

Das erste ist ePBS – verankerte Proposer-Builder-Trennung (PBS). So wie die Blockproduktion heute abläuft, lagern viele Leute ihre Möglichkeit, einen Block zu erstellen, über MEV-Boost an sehr hochentwickelte Ersteller aus. Das betrifft die Mehrheit im Netzwerk. Das Problem ist, dass man einem Relay vertrauen muss, und es erfordert viel Vertrauen, dass der Ersteller tatsächlich den Block vorlegt, auf den er geboten hat. ePBS führt einen Mechanismus im Protokoll ein, sodass viel weniger Vertrauen erforderlich ist, und es ist eine sehr saubere Implementierung derselben Idee.

Das nächste, was wir haben, sind Zugriffslisten auf Blockebene. Dies ist eine coole Innovation, bei der jeder Block mit einer Liste geliefert wird, die angibt, wo im Zustand Daten gelesen oder geschrieben wurden. Das bedeutet, dass man Blöcke parallel verarbeiten kann. Heute muss man Blöcke sequenziell verarbeiten. Wenn man Block 10 verarbeiten möchte, muss man zuerst 9 und 8 und so weiter verarbeiten. Wenn man nun eine Sammlung von Blöcken hat und keiner von ihnen mit den Zustandszugriffsinformationen in Konflikt steht, kann man alle acht parallel verarbeiten. Vielleicht hat man acht Kerne – das macht Ethereum effizienter und schneller bei der Verarbeitung von Blöcken.

Die dritte Sache ist die Neupreisung von Gas. Es gab Benchmarks durch dieses EIP, die zeigten, dass einige Opcodes überteuert und andere unterbewertet waren. Jetzt werden wir die Gebühren, die man für jeden Opcode zahlt, aktualisieren, um die Realität widerzuspiegeln, was Ethereum sicherer und effizienter macht.

#### Die sich wandelnde Rolle von L2s (6:14) {#the-evolving-role-of-l2s-614}

Es gibt eine Sache, über die ich sprechen möchte, die Vitalik kürzlich erwähnt hat. Er sagte vor ein paar Wochen in einem Tweet, dass die ursprüngliche Vision von Layer 2 (L2) und ihrer Rolle in Ethereum keinen Sinn mehr ergibt. Das sorgte für viele Schlagzeilen, und ich denke, viele Leute haben daraus die falschen Schlüsse gezogen.

Lasst mich euch sagen, was das aus der Sicht von jemandem bedeutet, der mittendrin ist. Ethereum skaliert schneller als erwartet. Die Gebühren sind niedriger denn je. Ich hätte nie gedacht, dass ich Gasgebühren von weniger als einem Gwei im Mainnet zahlen würde, aber hier sind wir. Blobs sind reichlich vorhanden – wir haben jede Menge. Wir skalieren Blobs schneller als erwartet. Und selbst die L2-Gebühren sind wirklich niedrig.

Die Idee, dass wir Allzweck-L2s brauchen – also L2s, die einfach dieselbe EVM sind, die wir auf Layer 1 (L1) haben, nur ein paar Mal kopiert und eingefügt, und alles, was sie tun, ist schneller zu sein – das ist nicht mehr die Vision. Diese L2s werden durch Spezialisierung florieren. Einige von ihnen werden auf Dinge wie Privatsphäre, Gaming, Spezifika in Dezentralisierte Finanzen (DeFi) oder Erweiterungen der EVM abzielen. Aber wenn sie einfach nur eine Klon-Kopie der L1 sind, sind sie nicht Teil der Roadmap, in der wir uns ursprünglich diese Art von Sharding-Paradigma durch L2s vorgestellt haben.

#### FOCIL: Zensurresistenz auf Protokollebene (7:25) {#focil-protocol-level-censorship-resistance-725}

Jenseits von Glamsterdam gibt es drei wirklich coole Dinge in aktiver Entwicklung und Forschung. Das erste ist FOCIL – Fork-Choice Enforced Inclusion Lists.

Das Problem, das es zu lösen versucht, ist, dass Block-Ersteller eine Wahl haben. Sie können entscheiden, welche Transaktionen in den Block aufgenommen werden. Sie bevorzugen vielleicht einige oder lehnen andere ab – vielleicht für einen MEV-Vorteil, vielleicht aufgrund von regulatorischem Druck. Aber in jedem Fall sind sie in der Lage, Transaktionen nach Belieben zu zensieren, und niemand kann etwas dagegen tun.

FOCIL verändert die Machtdynamik. Anstatt zu sagen, dass Block-Ersteller alle Transaktionen in einem Block auswählen können, gibt es ein zufälliges Komitee, das – basierend auf seinen lokalen Heuristiken – einige Transaktionen auswählt, von denen es glaubt, dass sie in den nächsten Block aufgenommen werden müssen. Es sind nicht alle Transaktionen im nächsten Block. Ersteller haben immer noch viel Freiheit, aber es gibt eine Teilmenge, die sie einschließen müssen. Der Block-Proposer nimmt diese kurze Liste – vielleicht acht oder so Transaktionen – und fügt sie am Ende des Blocks ein, und sie werden mit dem Block ausgeführt.

Dies wird durch die Fork-Choice-Regel erzwungen. Validatoren, die einen Block sehen, werden keine Attestierung dafür abgeben, es sei denn, es ist unten eine Inklusionsliste angehängt. Wenn sie einen ohne die Liste sehen, betrachten sie diesen Block als ungültig und ignorieren ihn einfach – sie werden ihn nicht weiterleiten, sie werden keine Stimme dafür abgeben. Dies ist noch aktive Forschung, bei der einige Parameter noch festgelegt werden müssen, aber die Richtung ist klar: Ethereum wird Zensurresistenz auf Protokollebene integrieren.

#### Kürzere Slot-Zeiten (9:24) {#shorter-slot-times-924}

Das nächste wirklich Aufregende sind kürzere Slot-Zeiten. Mit Hegata – dem Fork nach Glamsterdam – überlegen wir, ob wir kürzere Slot-Zeiten oder schnelle Slots einführen können. Das heißt nicht, dass wir direkt zu Sechs-Sekunden-Slots oder noch schneller springen, sondern dass wir die Weichen stellen, um das möglich zu machen.

Es klingt wirklich einfach – so nach dem Motto: „Lasst uns einfach schneller werden.“ Aber man muss an die Netzwerk-Propagierung denken, an die Attestierungspflichten der Validatoren, für die sie nur eine begrenzte Zeit zur Verfügung haben, und dann ist da noch die Wirtschaftlichkeit. Als ich zum ersten Mal damit experimentierte, änderte ich einfach die 12 in eine 6, und plötzlich machte jeder doppelt so viel Emission – doppelt so viel Geld –, was nicht wirklich die Absicht hinter kürzeren Slot-Zeiten ist. Es geht darum, schneller zu werden, aber alles andere gleich zu belassen. Es ist also eine sehr komplexe Angelegenheit, aber es besteht die Möglichkeit, im Endstadium schrittweise dorthin zu gelangen.

#### Schnellere Endgültigkeit (10:20) {#faster-finality-1020}

Die dritte Sache ist schnellere Endgültigkeit. Das ist wirklich wichtig, weil Ethereum alle zwei Epochen – alle 13 Minuten – endgültig wird, und es gibt Anwendungen, die wirklich davon abhängen, die Frage zu stellen: Ist meine Transaktion dauerhaft? Wenn die Transaktion nicht in einer endgültigen Epoche war, dann lautet die Antwort nein – es besteht eine kleine Chance, dass sie durch eine Reorganisation (Reorg) verschwindet und die Transaktion erneut eingereicht werden muss.

Wenn wir nun eine schnelle Endgültigkeit haben, können Dinge wie Börsen, Bridges oder jede andere Anwendung sicher sein, dass eine Transaktion endgültig ist. Zuerst, anstatt zwei Epochen für die Endgültigkeit, machen wir es in einer. Dann können wir sagen, anstatt Epochen, die 32 Slots lang sind, verkürzen wir sie auf vier Slots. Wenn man das nun mit Sechs-Sekunden-Slot-Zeiten koppelt, spricht man von einer Endgültigkeit in weniger als 30 Sekunden. Das ist ein wirklich cooles Endziel.

#### Der Nordstern (11:15) {#the-north-star-1115}

All dies ist in den Nordstern eingebaut, bei dem wir sagen, die L1 ist schnell mit einer Finalisierung in Sekunden. Wie kommen wir dorthin? Zuerst beginnen wir mit PeerDAS – das ist bereits ausgeliefert. Das hat uns eine skalierbare Schicht für Datenverfügbarkeit gegeben. Als Nächstes haben wir Glamsterdam, das hauptsächlich ePBS umfasst, was eine saubere Implementierung für die Proposer-Builder-Trennung (PBS) ist und Dinge wie FOCIL wirkungsvoller macht. FOCIL bringt Zensurresistenz mit sich, was sehr harmonisch mit ePBS zusammenpasst. Mit schnelleren Slots machen schnelle Slot-Zeiten eine schnellere Endgültigkeit noch wirkungsvoller. Dann erreichen wir dieses Endziel, bei dem wir wirklich schnelle Transaktionen haben, die in Sekunden endgültig sind.

#### Abschluss (12:02) {#closing-1202}

Ich möchte, dass ihr euch vorstellt, wie das Leben in zwei Jahren aussieht. Es ist ein bisschen schwer vorstellbar, weil Krypto sich so schnell bewegt. Dies könnte in nur zwei Jahren Realität sein: Transaktionsbestätigungszeiten von vier oder sechs Sekunden; Endgültigkeit gemessen in Sekunden, nicht in Minuten; Durchsetzung von Zensurresistenz auf Protokollebene; Schutzmaßnahmen gegen Post-Quanten-Kryptographie; und L2s, die über Funktionen und neue Innovationen konkurrieren, anstatt nur schneller zu werden. All dies, während die Tugend erhalten bleibt, dass man einen handelsüblichen Laptop oder Hardware verwenden kann, um einen Full Node zu Hause zu betreiben. Ethereum ist zugänglich und bleibt auch in Zukunft für jeden zugänglich.

Die Erkenntnis, die ihr mitnehmen sollt, ist: Das Narrativ, das ich euch zu Beginn präsentiert habe – es gibt wirklich keine Beweise, die es stützen. Ethereum liefert schnell. In nur einem Jahr gab es drei Upgrades. Und in den nächsten 24 Monaten kommen noch mehr Dinge, und sie werden noch schneller kommen.

Das sind nicht nur fantastische Fünf-Jahres-Zeitpläne. Das sind tatsächliche Dinge mit konkreten Vorschlägen, die genau jetzt entwickelt werden. Es gibt genau jetzt Dinge im Devnet. Es gibt Leute, die in diesem Moment an diesen Implementierungen arbeiten. Wenn ihr heute auf Ethereum aufbaut, baut ihr auf der am aktivsten entwickelten Blockchain der Welt auf.

Ich bin Preston Van Loon, Ethereum-Kernentwickler. Ich arbeite im Prysm-Team bei Offchain Labs. Wenn ihr euch einbringen wollt, ist der beste Weg, um auf dem Laufenden zu bleiben, was bei Ethereum passiert, selbst beim Aufbau zu helfen. Kommt nachher zu mir und sprecht mich an. Schaut euch das Prysm-Repo oder eines der Repos für Konsens-Spezifikationen oder Ausführungs-Spezifikationen an – wir würden uns sehr über eure Beiträge freuen. Danke.