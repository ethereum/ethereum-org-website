---
title: "Blockchain — ETH.BUILD"
description: "Eine Demonstration, wie Blockchain-Mining funktioniert, einschließlich der Art und Weise, wie Blöcke aneinandergereiht werden, wie Proof-of-Work Blockchains sichert und was passiert, wenn jemand versucht, Daten zu manipulieren."
lang: de
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Blockchain (ETH.BUILD)"
---

Ein Tutorial von **Austin Griffith**, das demonstriert, wie Blockchain-Mining mit dem visuellen Programmiertool ETH.BUILD funktioniert. Austin behandelt Proof-of-Work-Konsens, das Verketten von Blöcken, Mining-Schwierigkeit, Blockbelohnungen und die Unveränderlichkeit der Chain.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Videotranskripts](https://www.youtube.com/watch?v=zcX7OJ-L8XQ), das von Austin Griffith veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Das Problem der Koordination (0:00) {#the-problem-of-coordination-000}

Guten Morgen, fröhlichen Fliegen-Freitag! Dieses ETH.BUILD konzentriert sich auf die Blockchain – eine wirklich coole Sache. Wir sitzen in diesem Clown-Boot, unsere Bitcoin-Fliege dafür umgebunden. Los geht's.

Im bisherigen Lehrplan haben wir uns also durch Schlüsselpaare, Hashes und Ledger (Kassenbücher) gearbeitet. Wir haben festgestellt, dass wir Koordinationsprobleme bekommen, wenn wir Werte in einem verteilten Netzwerk – nicht in einem zentralisierten – hin und her transferieren wollen. Wir haben letztendlich das Problem, dass wir keinen Konsens zwischen verschiedenen Parteien finden können, weil sie alle unterschiedliche Transaktionen zu unterschiedlichen Zeiten erhalten. Es gibt viele verschiedene Möglichkeiten, dies zu lösen, aber keine davon war großartig, bis Proof-of-Work (PoW) aufkam.

Wir haben die byzantinischen Generäle als Nebenaufgabe behandelt, und was wir dort gelernt haben, ist, dass die Generäle beweisen mussten, dass sie eine Armee hatten, wenn sie Nachrichten über ein unsicheres Netzwerk sendeten. Dann konnte die empfangende Partei erkennen, dass diese Person tatsächlich ein General mit einer Armee war, die angreifen würde, und sie konnten sich koordinieren.

#### Blöcke und die Nonce (1:04) {#blocks-and-the-nonce-104}

Mit diesem Ledger pumpen wir also Transaktionen aus dem Netzwerk ein. Anstatt jeden einzelnen Benutzer seine Arbeit beweisen zu lassen, abstrahieren wir den Proof-of-Work (PoW) in einen Block von Transaktionen und lassen einen Miner daran arbeiten.

Wir bringen einen Block ein, der Transaktionen enthält – was auch immer über das Netzwerk kommt, laden wir in diesen Block. Wenn wir uns die Struktur dieses Blocks ansehen, hat er auch eine Nonce. Diese Nonce lässt uns den Hash anpassen. Wenn wir diesen gesamten Block nehmen, ihn in einen String umwandeln und ihn hashen, erhalten wir einen Hash. Wenn sich Transaktionen ändern, ändert sich dieser Hash, aber auch wenn wir die Nonce ändern, ändert sich der Hash ebenfalls.

Wir leisten hier etwas Arbeit – wir haben eine zufällige Menge von Transaktionen und ändern die Nonce, bis der Hash eine führende Null hat. Wenn Sie die Nebenaufgabe über die byzantinischen Generäle gesehen haben, haben wir diese führende Null als eine willkürliche Menge an Arbeit ausgewählt, die bewiesen werden muss. Die Nonce geht also einfach jede Zahl durch – eins, zwei, drei, vier – und wenn wir eine führende Null erhalten, sagen wir: Das ist ein gültiger Block.

#### Proof-of-Work in Aktion (3:00) {#proof-of-work-in-action-300}

Wenn wir einen geminten Block nehmen, den Hash herausziehen und ihn in eine Hashfunktion werfen, können wir beweisen, dass er eine führende Null hat – wir können beweisen, dass an diesem Block gearbeitet wurde.

Die Hashfunktion kostet CPU, was eine begrenzte Ressource ist. Wir setzen unsere gesamte CPU-Leistung ein, um einen Hash mit führenden Nullen zu finden. Sobald wir das tun, haben wir einen gültigen Block – der Block ist im Grunde eingefroren. Welche Transaktionen auch immer zu diesem Zeitpunkt darin waren, sind jetzt in diesem Block, und jeder respektiert ihn, und wir können zum nächsten Block übergehen.

#### Blöcke aneinanderreihen (3:56) {#chaining-blocks-together-356}

Hier ist der Trick: Wir nehmen den alten Block und verbinden ihn mit dem neuen Block. Wenn wir uns die Struktur ansehen, hat der neue Block keine Transaktionen und eine leere Nonce, aber er hat einen Vorgänger (Parent) mit Transaktionen. Der vorherige Block wird Teil des nächsten Blocks sein, sodass wir eine ganze Chain haben.

Wir werfen die neuesten Transaktionen aus dem Transaktionspool ein und arbeiten daran, eine Nonce zu finden. Block Nummer zwei ist gemint – wir brauchten eine Nonce von zehn, um diese Transaktionen gültig zu machen. Dann machen wir dasselbe: Wir verbinden den alten Block, bringen den neuen ein, werfen die neuesten Transaktionen hinein und arbeiten wieder daran. Nach genügend Versuchen haben wir eine Nonce für Block drei gefunden. Block vier – derselbe Prozess, und wir machen immer weiter.

#### Mining-Schwierigkeit (5:02) {#mining-difficulty-502}

Das ist zu einfach – wir können sehr schnell einen gültigen Block finden, und wir wollen, dass es schwieriger wird. Ich werde die Schwierigkeit auf zwei erhöhen. Wir verbinden Block fünf, bringen die neuesten Transaktionen ein und lassen einen Zähler rattern. Jetzt betreiben wir Mining – wir nutzen unsere begrenzte CPU-Leistung, um willkürlich zufällige Hashes darauf zu werfen, bis wir einen Hash mit zwei führenden Nullen finden, weil die Schwierigkeit erhöht wurde. Das wird ein bisschen dauern.

Jetzt haben wir diese Blockchain aus fünf Blöcken. Diese Blöcke enthalten Transaktionen und jeder verweist auf den vorherigen. Jeder Block erforderte eine willkürliche Menge an Arbeit, um produziert zu werden, und die Menge an Arbeit wird durch die Schwierigkeit gesteuert.

#### Der Miner (6:46) {#the-miner-646}

Schauen wir uns an, was ein Miner ist. Beim Problem der byzantinischen Generäle brauchte der General, der „im Morgengrauen angreifen“ wollte, Soldaten. Was in jedem Soldaten vorgeht, ist genau das, was wir hier mit unserem Miner tun – wir nehmen eine Nachricht und eine Nonce und werfen sie so schnell wie möglich in eine Hashfunktion, um diese führenden Nullen zu erhalten. Die führenden Nullen sind eine willkürliche Sache, auf die wir uns alle geeinigt haben – das ist genug Arbeit, um zu beweisen, dass man ein Soldat ist oder dass man Krieg führen kann.

Lassen Sie mich einen Miner hinzuziehen und das etwas schneller machen. Der Miner wird dasselbe für unsere Blöcke tun – er nimmt die Transaktionen, die aus dem Transaktionspool kommen, pumpt sie in den Block und arbeitet einfach daran, bis er einen gültigen Hash findet.

Der Miner ist ein bisschen effizienter. Er ist mehr auf das Mining fokussiert. Er wirft zufällig Hashes – das ist genau das, was unser Miner vorher gemacht hat, nur abstrahiert. Wir können sehen, wie er im Hintergrund rattert und einfach Hashes durcharbeitet. Er hat es gefunden – Block sechs ist gemint.

#### Double Spends und Netzwerk-Propagation (10:00) {#double-spends-and-network-propagation-1000}

Wir haben bereits über das Problem des Double Spendings (doppelte Ausgaben) und auch über das Problem der Netzwerk-Propagation gesprochen. Wenn wir einen Ledger und ein verteiltes Netzwerk haben und jemand eine Transaktion sendet, erreicht sie verschiedene Personen zu unterschiedlichen Zeiten. Daher könnten wir zwei Miner draußen im Netzwerk haben, die beide genau zur gleichen Zeit einen Block minen, und sie haben unterschiedliche Transaktionen darin.

Jeder von ihnen ist zu diesem Zeitpunkt gültig – beide haben den Proof-of-Work (PoW) erbracht, beide haben führende Nullen. Aber sie können nicht beide kanonisch sein. Sie können nicht beide die Wahrheit sein. Wir brauchen also eine Möglichkeit für das Netzwerk, einen Konsens darüber zu finden, welche die echte Chain ist.

#### Mehrere Miner und Konsens (12:27) {#multiple-miners-and-consensus-1227}

Lassen Sie mich diesen Block nehmen und ihn hierher verschieben. Was ich möchte, sind zwei verschiedene Miner, die am selben Problem arbeiten, quasi auf denselben Transaktionspool hören und unabhängig voneinander Blöcke erstellen. Wir haben zwei Miner: Mallory und Mike. Ich habe die Schwierigkeit auf drei gestellt, und beide arbeiten daran, einen Hash mit drei führenden Nullen zu finden.

Mallory hat also zuerst einen Block gefunden! Großartig. Was passiert nun – da wir uns in einem verteilten Netzwerk befinden, weiß Mike vielleicht noch gar nichts von Mallorys Block. Er arbeitet vielleicht noch an seiner eigenen Version. Und jetzt hat Mike auch einen gefunden. Wir haben also zwei gültige Pfade.

Wenn Sie ein Peer im Netzwerk sind und Mallorys Block zuerst sehen, denken Sie, dass dies der Hauptblock ist. Später kommt dann Mikes Block an. Sie behalten beide, für den Fall, dass einer von ihnen zur längsten Chain wird. Und die Regel lautet: Folge der längsten gültigen Chain.

#### Coinbase und Blockbelohnungen (15:33) {#coinbase-and-block-rewards-1533}

Wenn ein Miner einen Block mint, sagen wir: Hier sind alle Transaktionen, die wir wollen, hier ist die Nonce, hier ist der Vorgänger – aber wir sagen auch, hier ist die Person, die diesen Block gemint hat. Das nennt man eine Coinbase – ich glaube, es gibt jetzt ein Unternehmen, das so heißt, aber das ist etwas anderes. Wir nennen es einfach „Miner“. Unsere Blöcke erfordern jetzt also ein Miner-Feld.

Mike hat also gerade den Block gefunden, und Mike wird daraus auch einen Wert von zehn erhalten. Wir müssen den Minern einen Anreiz geben, all diese Arbeit zu leisten, richtig? Sie geben Geld aus, um diese Rigs zu kaufen, um im Grunde das Netzwerk sicher zu machen. Diese Miner geben Geld aus, um das Netzwerk mit all ihrer Hash-Leistung zu sichern – mit allen Minern zusammen, vielleicht Zehntausende. Sie zahlen gutes Geld, um Rigs zu bauen, die an diesen Hashes arbeiten, und um ihnen einen Anreiz zu geben, geben wir ihnen einen Anteil, der Blockbelohnung genannt wird, für jeden Block, den sie minen.

#### Blockbelohnungen und Anreize (16:52) {#block-rewards-and-incentives-1652}

In dieser Version des Blocks hat Mallory also zehn Dollar, aber in dieser Version hat Mike zehn Dollar. Jeder dieser beiden Akteure hat einen Anreiz, seine eigene Chain weiterzuverfolgen, und der Rest des Netzwerks muss einen Konsens finden. Im Grunde läuft es darauf hinaus, wer die längste gültige Chain hat.

Mike wird seinen Block als Vorgänger festlegen und anfangen, am nächsten Block zu arbeiten. Mallory wird dasselbe tun. Und es kommt darauf an, wer sonst noch im Netzwerk wessen Seite wählt. Da wir Leute mit schlechten Netzwerken nicht bestrafen wollen, bin ich mir ziemlich sicher, dass wir in Ethereum Uncle-Blöcke bezahlen – gültige Blöcke, die es nicht in die längste Chain geschafft haben –, weil sie immer noch helfen, das Netzwerk zu sichern.

Wir hatten dieses Problem der Koordination und des Konsenses, und wir haben es gelöst, indem wir diese willkürliche Menge an Arbeit eingeführt haben, die erforderlich ist, um Transaktionen gültig zu machen. Mallory hat all diese Arbeit geleistet, Hashing und Hashing und Hashing, um drei führende Nullen eines Hashes all dieser Transaktionen und des vorherigen Blocks zu finden.

#### Die Blockchain abfragen (18:30) {#querying-the-blockchain-1830}

Wir können mit der jeweils längsten Chain kommunizieren. Mike ist noch nicht bei sieben angekommen, also können wir sehen, dass die Höhe hier drüben immer noch sechs ist. Und wir können Dinge tun, wie Kontostände für Leute abfragen. Wir klicken also auf Kontostand – was bekommen wir? Fünfhundertvierundzwanzig. Heidi saß also auf 524 oder was auch immer der native Token für diese Chain ist. Wir können ihre Nonce sehen, wir können alles tun, was wir mit dem Ledger tun konnten, aber jetzt stapeln wir Blöcke und diese Blöcke enthalten Transaktionen.

Wir haben die Arbeit von den Benutzern, die nur Geld senden, auf die Miner abstrahiert, und wir haben ihnen einen Anreiz gegeben, indem wir ihnen diese Blockbelohnung geben. Es wird auch einen kleinen Betrag geben, den jede Person pro Transaktion zahlt, aber dazu kommen wir in einer späteren Episode. Wir wollen jetzt nicht über Gas sprechen, aber es hilft zu wissen, dass es einen Anreiz gibt, nicht nur einen Block zu minen, sondern einen vollen Block mit vielen Transaktionen zu minen. Aber das ist ein kleinerer Anreiz – dazu kommen wir noch.

#### Unveränderlichkeit der Chain (19:51) {#chain-immutability-1951}

Wenn Blöcke gemint werden, werden sie immer sicherer. Lassen Sie mich Ihnen zeigen, was ich meine. Mike hat also einen Block gemint, Mallory war hier drüben, hat eine Demonstration gemacht und konnte keinen Block minen. Jetzt wird Mikes Chain also die längste sein, und sie wird sich über das Netzwerk verbreiten. Jeder wird sie sehen und sagen: Okay, diese Chain hat sieben Blöcke, sie sind alle gültig – das ist diejenige, der wir folgen werden. Es kann zu Hard Forks, umstrittenen Forks kommen, bei denen sich die Regeln, nach denen wir spielen, ändern und verschiedene Gruppen von Menschen verschiedenen Chains folgen wollen. Coole Sache.

Okay, zu guter Letzt, wenn wir zu Block drei zurückgehen und etwas ändern – irgendein kleines Detail ändern – werde ich hier reingehen. Da gibt es eine Transaktion an Frank. Sagen wir, anstatt Frank ändern wir es in Eve. Beobachten Sie nun, was passiert, wenn ich auf Okay klicke: Sehen Sie sich das an. Ich habe ein winziges kleines Stück von Block drei geändert und plötzlich fällt die gesamte Chain auseinander. Sie ist nicht mehr gültig. Wenn ich das über das Netzwerk übertragen würde, würden mich die Leute auslachen.

Man kann nichts mehr ändern, sobald ein Block gemint ist, es sei denn, man geht zurück und mint das Zeug neu, während es sich ändert. Ich müsste im Grunde den Miner hier wieder anschließen und versuchen, genug Leistung zu haben, um Mike hier draußen mit sieben Blöcken einzuholen. Das wäre sehr, sehr schwer. Je tiefer ein Block ist, desto schwerer ist es, davon zurückzukommen. Die Tatsache, dass dieser Block drei hier, in dem Carlos 84 an Bob gesendet hat – Bob kann sich ziemlich sicher sein, dass dieses Geld, mehrere Blöcke tief, definitiv da ist. Es gibt keine Möglichkeit, dass es hier einen umstrittenen Fork geben wird – ich bin auf der sicheren Seite. Das ist es, was wir Endgültigkeit nennen.

#### Zusammenfassung (22:00) {#summary-2200}

Anstatt einen Ledger und dieses Konsensproblem zu haben, verwenden wir Proof-of-Work (PoW), um an einem Hash zu arbeiten, um einen Block zu validieren – und „gültig“ bedeutet eine willkürliche Anzahl von führenden Nullen. Wir werden beim Aufbau der Chain von Blöcken immer noch auf Probleme stoßen, bei denen geminte Blöcke tatsächlich zu unterschiedlichen Zeiten an unterschiedlichen Orten ankommen können. Wir haben also einen weiteren Konsensalgorithmus, der besagt: Folge der längsten Chain, die gültig ist und die dem Regelwerk folgt, an dem du teilnehmen möchtest.

Alles klar, fröhlichen Fliegen-Freitag! Das war Blockchain auf ETH.BUILD. Ich werde das speichern und dort hochladen, damit Sie einfach auf „Laden“ klicken können und eine Chain zum Spielen haben. Fröhlichen Freitag!