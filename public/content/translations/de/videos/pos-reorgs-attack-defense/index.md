---
title: "Das Spiel der Reorgs in Proof-of-Stake Ethereum"
description: "Caspar Schwarz-Schilling präsentiert Forschungsergebnisse zu Block-Reorganisationsangriffen in Proof-of-Stake Ethereum und behandelt Angriffsvektoren, Verteidigungsmechanismen sowie die vorhandenen Abhilfemaßnahmen auf Protokollebene."
lang: de
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "PoS-Reorgs"
---

Diese Präsentation untersucht die Arten von Block-Reorgs, die in Proof-of-Stake (PoS) Ethereum möglich sind, sowie die Abhilfemaßnahmen, die entwickelt wurden, um sie zu verhindern. Caspar Schwarz-Schilling, ein Forscher der Robust Incentives Group der Ethereum Foundation, erläutert die Mechanismen von Ex-post- und Ex-ante-Reorgs und vergleicht die Sicherheitslandschaft zwischen Proof-of-Work (PoW) und Proof-of-Stake.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=xcPxwhrg3Ao), das von LisCon veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung und Hintergrund (0:03) {#introduction-and-background-003}

Herzlich willkommen. Heute werde ich über die Reorgs sprechen, die in Proof-of-Stake (PoS) Ethereum möglich sind.

Ich bin vor Kurzem der Ethereum Foundation beigetreten, genauer gesagt der Robust Incentives Group. Im Grunde sind wir ein Forschungsteam, das sich auf alles rund um Anreize konzentriert. Ich werde mich kurz fassen – dieser Vortrag ist vollgepackt und Sie können die meisten unserer Arbeiten auf GitHub finden.

#### Zwei Arten von Reorgs (0:44) {#two-types-of-reorgs-044}

Heute möchte ich über Reorgs sprechen und insbesondere zwei verschiedene Arten von Reorgs skizzieren, die im Bereich von Proof-of-Stake Ethereum möglich sind.

Einerseits haben wir **Ex-post-Reorgs** und andererseits **Ex-ante-Reorgs**. Verzeihen Sie mir die etwas prätentiöse lateinische Namensgebung, aber sie erfüllt ihren Zweck.

Ex-post-Reorgs sind in etwa das, woran wir normalerweise denken, wenn wir über Reorgs sprechen. Der Angreifer sieht einen Block – wenn er wertvoll ist, könnte er versuchen, einen Reorg durchzuführen. Auf dem Diagramm hier sehen wir also, dass Block N+1 der Block ist, den der Angreifer durch einen Reorg verdrängen möchte, und indem er auf demselben Eltern-Block N aufbaut, wird, wenn es funktioniert, Block N+3 dann auf Block N+2 aufgebaut. Das ist das übliche Vorgehen.

Nun sind Ex-ante-Reorgs etwas anders. Die Idee ist, dass der Angreifer den Angriff starten muss, bevor er überhaupt weiß, welchen Block er durch einen Reorg verdrängen wird. Wie funktioniert das grob? Auf einer sehr hohen Ebene wird Block N+1 auf N aufgebaut, aber nicht sofort veröffentlicht. Die ehrlichen Nodes wissen nicht einmal, dass N+1 existiert, und werden daher weiter auf N aufbauen. Dann wird N+1 durch einen bestimmten Mechanismus veröffentlicht, und N+3 sieht möglicherweise, dass N+1 führt, und baut darauf auf, sodass N+2 tatsächlich durch einen Reorg verdrängt wird.

Sie fragen sich vielleicht, warum man diese Art von Reorg überhaupt durchführen möchte. Nun, es gibt immer noch MEV zu extrahieren. Wenn Sie Glück haben, hat Block N+2 viel MEV – Sie können das erfassen, indem Sie einfach kopieren und einfügen, was auch immer dieser Block ist. Im schlimmsten Fall haben Sie im Grunde Transaktionen im Wert von zwei Slots, die Sie abhören können.

#### Ex-post-Reorgs in Proof-of-Work (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Bevor wir uns mit Ex-ante-Reorgs befassen, was das Hauptthema dieses Vortrags ist, lassen Sie mich kurz Ex-post-Reorgs rekapitulieren und insbesondere mit dem Proof-of-Work (PoW) Kontext beginnen.

Im Grunde ist es eine Zusammenfassung des Blogbeitrags der üblichen Verdächtigen – Georgios und Vitalik. Lesen Sie ihn einfach, er ist großartig.

Kurz gesagt, in Proof-of-Work Ethereum sind Ex-post-Reorgs schwierig, aber nicht unmöglich. Ein 10%-Miner hat eine relativ gute Chance, einige Blöcke hintereinander zu minen, und wenn der Anreiz hoch genug ist – stellen Sie sich vor, es gibt einen Block mit MEV im Wert von 100 ETH zu erfassen –, dann reicht vielleicht eine Erfolgsquote von einem Prozent aus, damit es sich lohnt, einen Reorg zu versuchen.

#### Ex-post-Reorgs in Proof-of-Stake (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

In Proof-of-Stake ist es eine völlig andere Liga. Wir sprechen von einer absurden Menge an Stake, die erforderlich ist. Ich werde Ihnen zeigen, wie man dabei vorgehen könnte, nur um zu betonen, wie lächerlich schwierig es ist.

Vielleicht zuerst ein paar Grundlagen. Die Zeit in Proof-of-Stake Ethereum schreitet in Slots voran. Jeder Slot ist 12 Sekunden lang. In jedem Slot gibt es zwei Rollen: Sie haben einen Proposer – genau einen Proposer – und ein Komitee von Tausenden von Attestern, die die Blöcke attestieren sollen, die sie auf der P2P-Schicht hören. Sie bestimmen den Kopf der Chain, indem sie die Fork-Choice ausführen, was im Grunde eine Funktion ist, die den Block-Baum als Eingabe nimmt und Ihnen den Kopf der Chain liefert.

Sie sollen Blöcke attestieren, wenn Sie einen gültigen Block hören, oder vier Sekunden nach Beginn eines Slots – je nachdem, was zuerst eintritt. Wenn also aus irgendeinem Grund der Proposer von Block N+1 offline ist und vier Sekunden nach Beginn des Slots kein Block vorhanden ist, attestieren Sie Block N. Wenn Sie ihn rechtzeitig hören, attestieren Sie Block N+1. Ganz einfach.

All diese Attestierungen verleihen den Blöcken Gewicht, und dieses Gewicht wird von der Fork-Choice verwendet, um zu bestimmen, was der neueste Kopf ist.

Lassen Sie uns nun einen Ein-Block-Reorg durchgehen. Zu Beginn ist alles wie gewohnt – jeder attestiert Block N, sogar der Angreifer. Dann wird N+1 auf N aufgebaut, und weil der Angreifer dem Block, den er durch einen Reorg verdrängen möchte, kein Gewicht verleihen will, attestiert er stattdessen Block N. Block N gewinnt stark an Gewicht, weil der Angreifer zwei Drittel des Komitees hat – was bedeutet, dass er grob gesagt zwei Drittel des gesamten Stakes kontrollieren muss.

Ein Drittel der ehrlichen Teilnehmer hat N+1 attestiert, zwei Drittel N. Nun kommt Block N+2 – offensichtlich baut der Angreifer ihn auf N auf und attestiert seinen eigenen Block. Aus der Sicht der ehrlichen Validatoren führt N+1 in Bezug auf das Gewicht immer noch, da sowohl N+1 als auch N+2 das gesamte Gewicht von Block N erben, aber N+1 hat auch dieses eine Drittel an Attestierungen, das N+2 fehlt.

Wenn wir das zusammenzählen – Block N+1 hat Attestierungen im Wert von einem Drittel plus einem Drittel, was zwei Drittel ergibt, und Block N+2 hat ebenfalls zwei Drittel. Der Einfachheit halber nehmen wir an, dass der Tie-Break zugunsten des Angreifers ausfällt. Dann wird N+3 sehen, dass N+2 führt, und darauf aufbauen.

Um Ihnen eine Vorstellung davon zu geben, wie lächerlich diese Annahmen sind – selbst wenn Sie einen 65%-Staker hätten, liegt die Wahrscheinlichkeit, zwei Drittel des Komitees in einem beliebigen Slot zu kontrollieren, bei 0,05 %. Dies zeigt, dass die Macht paralleler Attestierungen real ist – Ex-post-Reorgs sind in Proof-of-Stake Ethereum unglaublich schwierig, wenn nicht gar praktisch unmöglich.

#### Mechanik des Ex-ante-Reorg-Angriffs (7:34) {#ex-ante-reorg-attack-mechanics-734}

Nun werde ich über Ex-ante-Reorgs sprechen. Dieser Angriff basiert auf einem Paper von Neuder und anderen. Wir haben diesen Angriff kürzlich erheblich verbessert. Wir haben auch ein Paper darüber verfasst und es gerade noch rechtzeitig auf arXiv hochgeladen.

Auch vorab – keine Sorge, es gibt Abhilfemaßnahmen. Sie werden vor dem Merge integriert.

Wie funktioniert ein Ex-ante-Reorg-Angriff? Zunächst Block N – alles wie gewohnt, jeder attestiert ihn. Nun sind Sie der Proposer von N+1. Sie schlagen ihn vor und attestieren ihn privat mit einem einzigen Validator. Wichtig ist, dass Sie ihn privat halten – Sie veröffentlichen ihn nicht und verbreiten ihn nicht auf der P2P-Schicht.

Was passiert, ist, dass die ehrlichen Teilnehmer Block N+1 nicht sehen, also werden sie Block N attestieren. Das ist der Trick – Sie erben dieses Gewicht und müssen es nicht wirklich bekämpfen.

Nehmen wir für den Moment eine Latenz von null an. In Slot N+2 veröffentlichen wir als Angreifer Block N+1 und die private Attestierung gleichzeitig. Die ehrlichen Validatoren in Slot N+2 müssen einen Block attestieren. Aus ihrer Sicht sehen sie Block N+2 und Block N+1 mit dieser einen privaten Attestierung. Wenn sie die Fork-Choice ausführen, werden sie feststellen, dass Block N+1 mehr Gewicht hat als Block N+2, da N+1 die private Attestierung hat, die N+2 fehlt. Sogar alle ehrlichen Validatoren werden tatsächlich Block N+1 attestieren. In N+3 wird N+1 trivialerweise als Kopf der Chain angesehen.

#### Netzwerklatenz und der Angriff (10:25) {#network-latency-and-the-attack-1025}

Ich bin von einer Latenz von null ausgegangen, was offensichtlich nicht der Realität entspricht. Es gibt Latenz – es braucht Zeit, um Blöcke und Nachrichten auf der P2P-Schicht zu verbreiten.

Die Art und Weise, wie ein Angreifer diese Art von Angriff dennoch durchführen kann, besteht darin, viele Nodes an verschiedenen Standorten in der P2P-Topologie zu haben. Wenn der ehrliche Proposer in Slot N+2 diesen Block vorschlägt, erfahren Sie sehr früh im Verbreitungsprozess davon. Infolgedessen können Sie Ihren privaten Block von all diesen verschiedenen Standorten aus veröffentlichen, sodass eine Mehrheit von Block N+1 erfährt, bevor sie von Block N+2 erfährt – was bedeutet, dass sie sehen, dass Block N+1 beim Gewicht führt, und ihn tatsächlich attestieren werden.

Um noch einmal zu betonen, was hier passiert: Wir haben einen Proposer mit einem einzigen Attester, der es schafft, einen Ein-Block-Reorg durchzuführen. Gelinde gesagt, nicht ideal.

#### Balancing-Strategien für längere Reorgs (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Wenn Sie es ausgefallen mögen, können Sie längere Reorgs mithilfe einer Balancing-Strategie durchführen. Die Idee ist, das ehrliche Komitee in verschiedene Ansichten der Chain aufzuteilen.

Sie veröffentlichen Ihren privaten Block so, dass etwa die Hälfte der ehrlichen Nodes von Ihrem privaten Block und Ihrer Attestierung erfährt, bevor sie von Block N+2 erfahren – also attestieren sie Ihren Block. Bei der anderen Hälfte möchten Sie, dass sie Ihren Block nicht hören, bevor sie N+2 attestieren.

Nun haben Sie die Hälfte des ehrlichen Komitees, die N+1 attestiert, und die andere Hälfte, die N+2 attestiert. Wie hilft das? Das ehrliche Komitee hebt sich nun gegenseitig auf, und Sie als Angreifer müssen sie nicht einmal bekämpfen – was im Grunde der wahr gewordene Traum eines Angreifers ist.

Gehen wir das Diagramm durch: Block N wie gewohnt, Block N+1 – gleiche Geschichte, Sie veröffentlichen ihn nicht. Die ehrlichen Validatoren attestieren Block N. Block N+2 taucht auf, Sie erfahren früh davon und veröffentlichen Block N+1 mit einer Attestierung – der „entscheidenden Stimme“ – so, dass die Hälfte des ehrlichen Komitees ihn vorher und die Hälfte nachher sieht. Die Hälfte stimmt für N+1, die andere Hälfte für N+2. Sie wollen eigentlich eine Aufteilung mit einer Abweichung von eins, sodass N+2 eine Attestierung mehr hat, damit N+3 auf N+2 aufbaut und den Reorg am Laufen hält.

Um einen Zwei-Block-Reorg zu beenden: Block N+3 wird vorgeschlagen, Sie hören ihn früh, Sie veröffentlichen Block N+1 und Ihre zwei verbleibenden Attestierungen und überfluten die P2P-Schicht, sodass eine Mehrheit der ehrlichen Teilnehmer für Block N+1 stimmt – sodass er mehr Gewicht hat als Block N+3 und N+4 auf N+1 aufgebaut wird.

Wenn man darüber nachdenkt, ist es relativ günstig, diese Reorgs unter diesen Annahmen durchzuführen. Selbst wenn Sie keine perfekten Aufteilungen haben, haben Sie, weil die P2P-Schicht so groß ist, eine Wahrscheinlichkeitsverteilung, auf die Sie abzielen können, sodass die Angriffskosten mit der Quadratwurzel der Komiteegröße wachsen.

#### Proposer-Boost-Abhilfemaßnahme (15:17) {#proposer-boost-mitigation-1517}

Lassen Sie uns über die Abhilfemaßnahme sprechen. Was ist die Grundidee? Wir werden dem Proposer etwas mehr Macht geben. Wenn ein gültiger Block rechtzeitig ankommt, erhöhen wir das Gewicht dieses Blocks für die Dauer des Slots durch einen Proposer-Boost. Nachdem dieser Slot beendet ist, nehmen wir den üblichen LMD-GHOST-Score wieder auf und alles läuft wie gewohnt.

Wenn also Block N+2 rechtzeitig vorgeschlagen wird und gültig ist, erhält dieser Block einen Boost – sagen wir 80 % der Komiteegröße. Nun wird diese niedliche kleine N+1-Attestierung des Angreifers nicht mehr ausreichen. Auf keinen Fall.

Die Balancing-Sache funktioniert auch nicht mehr, weil man zwar eine 50/50-Aufteilung hat, der Boost sie aber immer in eine Richtung wirft. Es gibt keine Möglichkeit, diese 50/50-Aufteilung beizubehalten.

Die Idee ist, dass mit dieser Abhilfemaßnahme die Attestierungen des Gegners mit dem Boost konkurrieren müssen, um ehrliche Validatoren davon zu überzeugen, nach ihren Wünschen abzustimmen. Dies bricht Balancing-Strategien und verhindert im Grunde alle Reorgs vollständig. Gute Nachrichten – es gibt einen offenen PR, also wird es im Grunde vor dem Merge integriert.

#### Wichtige Erkenntnisse (16:48) {#key-takeaways-1648}

Einige wichtige Erkenntnisse. Ich habe über die Unterschiede zwischen Ex-post- und Ex-ante-Reorgs gesprochen. Ich habe kurz die verschiedenen Landschaften für Reorgs in Proof-of-Work (PoW) im Vergleich zu Proof-of-Stake (PoS) skizziert. Ich habe Ihnen gezeigt, wie man einen Ex-ante-Reorg durchführt, aber auch, was wichtig ist, wie man ihn behebt.

Wenn Sie daran interessiert sind, gibt es ein Paper – viel detaillierter, nuancierter. Die Folien werden hochgeladen. Sprechen Sie mich an, wenn Sie interessiert sind, und Sie können mich auch auf Twitter finden.

Ich hoffe, das war interessant für Sie. Vielen Dank.