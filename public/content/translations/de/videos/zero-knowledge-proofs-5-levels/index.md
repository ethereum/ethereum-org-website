---
title: "Zero-Knowledge-Beweise in 5 Schwierigkeitsstufen erklärt"
description: "Ein Informatiker erklärt Zero-Knowledge-Beweise auf fünf verschiedenen Komplexitätsstufen, vom Kind bis zum Experten."
lang: de
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Zero-Knowledge-Beweise"
---

Der Informatiker **Amit Sahai**, Professor an der UCLA Samueli School of Engineering, erklärt in dieser **WIRED**-Produktion Zero-Knowledge-Beweise auf fünf Komplexitätsstufen, vom Kind bis zum Experten. Das Konzept wird anhand physischer Analogien demonstriert und mit zunehmender technischer Tiefe diskutiert, wodurch eines der wichtigsten Konzepte der Kryptographie für jeden zugänglich gemacht wird.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=fOGdb1CTu5c), das von WIRED veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

**Amit Sahai:** Hallo, mein Name ist Amit Sahai und ich bin Professor für Informatik an der UCLA Samueli School of Engineering. Heute wurde ich gebeten, Zero-Knowledge-Beweise in fünf aufsteigenden Schwierigkeitsstufen zu erklären.

Ein Zero-Knowledge-Beweis ist eine Möglichkeit für einen Beweiser, einen Verifizierer davon zu überzeugen, dass eine bestimmte Aussage wahr ist, und dabei dennoch keine zusätzlichen Informationen preiszugeben, außer der Tatsache, dass die Aussage wahr ist. Zero-Knowledge-Beweise werden in Blockchains und Kryptowährungen verwendet. Kryptographen sind von Zero-Knowledge begeistert, wegen seiner erstaunlichen mathematischen Eigenschaften, aber auch wegen seiner unglaublichen Anwendbarkeit auf so viele verschiedene Szenarien.

#### Stufe 1: Kind (0:41) {#level-1-child-041}

**Amit Sahai:** Was ist dein Lieblingsfach?

**Chelsea:** Ich würde sagen Mathe. Einige der kleinen Probleme können tatsächlich sehr groß und kompliziert sein. Es ist wie ein Puzzle.

**Amit Sahai:** Ich liebe Mathe aus demselben Grund. Heute werde ich dir von einer Sache erzählen, die sich Zero-Knowledge-Beweis nennt. Bei einem Zero-Knowledge-Beweis gibt es zwei Personen – es gibt einen Beweiser und einen Verifizierer. Ich möchte dir beweisen, dass etwas wahr ist, aber das Verrückte daran ist, dass ich dir beweisen möchte, dass es wahr ist, ohne dir irgendwelche Gründe dafür zu nennen. Ich erinnere mich, als ich zum ersten Mal davon hörte, dachte ich: Moment, was? Wie kann das überhaupt möglich sein?

Also, was siehst du auf diesem Foto?

**Chelsea:** Eine Menge Pinguine.

**Amit Sahai:** Ja. Versteckt zwischen all diesen Pinguinen ist ein Papageientaucher. Möchtest du versuchen, ihn zu suchen? Siehst du, wo er ist? Ich weiß, wo er ist, aber ich möchte es dir nicht sagen. Glaubst du mir?

**Chelsea:** Ja.

**Amit Sahai:** Aber was wäre, wenn ich dir beweisen könnte, dass ich weiß, wo der Papageientaucher ist, ohne dir zu verraten, wo er sich befindet? Lass es mich dir zeigen. Ich habe das Foto genommen und es hier hinter dieses Poster gelegt. Warum schaust du nicht mal durch dieses Loch?

**Chelsea:** Ich sehe den Papageientaucher.

**Amit Sahai:** Wenn du dir also diese Tafel ansiehst, wissen wir nicht, wo das Foto war, richtig? War das Foto mit der Ecke hier, in welchem Fall der Papageientaucher ganz auf dieser Seite wäre? Oder war das Foto mit der Ecke hier, in welchem Fall der Papageientaucher auf der anderen Seite wäre? Das ist also ein wirklich einfaches Beispiel für einen Zero-Knowledge-Beweis. Ich habe dich davon überzeugt, dass ich wusste, wo der Papageientaucher ist, aber du hast sonst nichts darüber erfahren.

**Chelsea:** Warum studierst du Zero-Knowledge-Beweise?

**Amit Sahai:** Als ich zum ersten Mal davon erfuhr, fand ich sie einfach so cool. Aber es stellt sich heraus, dass sie auch wirklich nützlich sind – nicht nur, um Papageientaucher zu finden. Wenn du einfach dein Passwort eingibst und der Hacker sich in den Computer hackt, kann er einfach dein Passwort bekommen. Was wäre, wenn wir stattdessen irgendwie einen Zero-Knowledge-Beweis verwenden könnten, um uns einzuloggen? Du könntest einfach beweisen, dass du Chelsea bist, ohne ihnen irgendetwas preiszugeben. Wenn du das tun könntest, wäre das erstaunlich, denn selbst wenn der Hacker sich in den Computer hacken würde, würde er nichts erfahren – weil nicht einmal der Computer etwas erfährt.

Also Chelsea, in deinen eigenen Worten, was ist ein Zero-Knowledge-Beweis?

**Chelsea:** Ein Zero-Knowledge-Beweis ist der Beweis für eine Aussage. Man zeigt ihnen nicht das Warum oder Was. Man zeigt ihnen nur einen winzigen Ausschnitt oder macht einfach eine Art seltsamen Zaubertrick, der eigentlich kein Zaubertrick ist, und sie werden überzeugt sein. Und man hat ihnen nicht gezeigt, warum oder so etwas in der Art.

#### Stufe 2: Teenager (3:31) {#level-2-teen-331}

**Amit Sahai:** Hast du also schon einmal den Begriff Zero-Knowledge-Beweis gehört?

**Teenager:** Nein, habe ich nicht.

**Amit Sahai:** Es ist eine Möglichkeit für einen Beweiser, einen Verifizierer davon zu überzeugen, dass etwas wahr ist, ohne irgendetwas darüber preiszugeben, warum es wahr ist, was total bizarr klingt. Was ich tun möchte, ist dir zu beweisen, dass ich diese Kombination kenne, ohne dir die Kombination zu verraten. Und was du tun könntest, ist, eine kleine Notiz zu schreiben, ein Geheimnis, das ich definitiv nicht kennen würde. Falte sie zusammen, steck sie hier rein. Und dann, wenn ich die Kombination kenne, sollte ich in der Lage sein, es zu öffnen und dir zu sagen, was du geschrieben hast.

Alles klar. „Mein Hund heißt Doug.“

**Teenager:** Hast du herausgefunden, wie die Kombination lautet?

**Amit Sahai:** Nein. Nirgendwo in dieser Interaktion hast du also Informationen gesehen, die du nicht schon kanntest. Und doch habe ich dich davon überzeugt, dass ich die Kombination kenne.

**Teenager:** Was ist also der genaue Zweck eines Zero-Knowledge-Beweises? Ist es so, als würde man etwas beweisen, aber ohne genügend Informationen preiszugeben, die das gefährden könnten, was auch immer man beweist?

**Amit Sahai:** Menschen vertrauen einander nicht. Und wenn ich jemandem beweisen könnte, dass ich etwas richtig gemacht habe, ohne meine Geheimnisse preisgeben zu müssen, dann würde mir diese Person mehr vertrauen.

**Teenager:** Wie hängt das mit Computertechnologie zusammen? Ist es eine persönliche Interaktion?

**Amit Sahai:** Angenommen, du möchtest Nachrichten mit jemandem austauschen, den du kennst. Ihr würdet euch wahrscheinlich zuerst zusammensetzen und euch einen Geheimcode ausdenken, richtig? Und euch dann gegenseitig Nachrichten in diesem Code schreiben. Aber was ist, wenn du die Person noch nie zuvor getroffen hast? Was ist, wenn du geheime Nachrichten mit mir austauschen möchtest und wir uns noch nie zuvor getroffen haben? Wie könnten wir das möglicherweise tun?

**Teenager:** Ich habe keine Ahnung.

**Amit Sahai:** Es klingt unmöglich, oder? Ist es aber nicht. Man würde kein physisches Schloss oder eine physische Kiste verwenden. Wir würden stattdessen Mathematik verwenden, um solche Dinge zu tun. Du könntest eine Nachricht nehmen und sie mithilfe von Mathematik verschlüsseln. Und dann könnte ich dir beweisen, dass ich den Schlüssel kenne, sie öffnen und an dich zurücksenden. Auf diese Weise würde ich dir beweisen, dass ich den mathematischen Schlüssel zu der mathematischen Schließkassette kenne.

Basierend auf dem, was wir heute besprochen haben, in deinen eigenen Worten: Was ist ein Zero-Knowledge-Beweis?

**Teenager:** Es ist so, als hätte man dieses wirklich wichtige Geheimnis, von dem man möchte, dass jemand davon weiß, aber man möchte ihm nicht alles erzählen. Man kann einen Zero-Knowledge-Beweis verwenden, um ihm dieses Geheimnis zu beweisen, aber nicht alles davon preiszugeben.

#### Stufe 3: Student (6:13) {#level-3-college-student-613}

**Amit Sahai:** Was studierst du?

**Student:** Ich bin Informatikstudent im ersten Jahr an der USC Viterbi. Ich interessiere mich für alles rund um Daten, Internet, Blockchain und Kryptowährung.

**Amit Sahai:** Hast du schon einmal von Zero-Knowledge-Beweisen gehört?

**Student:** Nur flüchtig.

**Amit Sahai:** Tatsächlich ist der Blockchain-Bereich einer der Bereiche, in denen wir sehen, dass Zero-Knowledge-Beweise implementiert werden – und ich denke, das ist erst der Anfang. Im Kern ist ein Zero-Knowledge-Beweis eine Interaktion zwischen zwei Personen. Ich sollte in der Lage sein, dich davon zu überzeugen, dass eine bestimmte Aussage wahr ist, aber du wirst keine Ahnung haben, warum sie wahr ist.

Die Art und Weise, wie wir uns dem nähern werden, ist durch etwas, das NP-Vollständigkeit genannt wird. Ein NP-vollständiges Problem ist ein Problem, das wirklich schwer zu lösen ist. Aber wenn man es lösen kann, kann man jedes Problem lösen, das in der Klasse NP liegt – und das schließt eine riesige Anzahl von Problemen ein. Wir werden ein NP-vollständiges Problem verwenden, um tatsächlich eine unglaubliche Vielfalt von Aussagen durch einen Zero-Knowledge-Beweis zu beweisen. Das spezifische NP-vollständige Problem, das wir uns ansehen werden, nennt sich Drei-Färbbarkeit von Landkarten.

Hier haben wir eine Landkarte mit einer Reihe von Ländern, die so angeordnet sind, dass keine Länder mit derselben Farbe eine gemeinsame Grenze haben. Das ist es, was eine solche Landkarte gültig gefärbt macht. Es stellt sich heraus, dass die Frage, ob eine Landkarte auf diese Weise mit drei Farben gefärbt werden kann oder nicht, ein Beispiel für ein NP-vollständiges Problem ist.

Vielleicht möchtest du in Wirklichkeit einen Zero-Knowledge-Beweis dafür erbringen, dass du mindestens 0,3 Bitcoin hast, ohne die Adresse deines Kontos preiszugeben. Es stellt sich heraus, dass ich diese Aussage nehmen und in eine Landkarte von Ländern umwandeln kann. Diese Landkarte von Ländern wird nur dann mit drei Farben färbbar sein, wenn du mindestens 0,2 Bitcoin hast.

**Student:** Wie würden wir so etwas in einen Zero-Knowledge-Beweis verwandeln?

**Amit Sahai:** Der erste Schritt ist natürlich, dass wir alle Farben ausradieren müssen. Ich habe eine Farbe in jeden dieser Umschläge gesteckt. Woher weißt du nun, dass es eine gültige Färbung ist? Das weißt du nicht. Du musst zwei beliebige benachbarte Länder auswählen – du kannst sie ganz nach Belieben zufällig auswählen.

**Student:** Kann ich diese beiden nehmen?

**Amit Sahai:** Hier haben wir Grün, und hier drüben haben wir Blau. Wie du sehen kannst, sind es zwei verschiedene Farben. Du hast also ein wenig Vertrauen, dass ich es geschafft habe, dies richtig einzufärben – aber nicht so viel Vertrauen, weil ich dir nur zwei der Länder gezeigt habe. Eine Möglichkeit, mehr Vertrauen zu gewinnen, bestünde darin, mehr davon zu öffnen, aber das würde dir Informationen preisgeben. Das möchte ich nicht tun.

Stattdessen werde ich dich also bitten, dich bitte umzudrehen. Und jetzt lass uns diese Farben austauschen.

Kannst du zwei Länder zufällig auswählen, und wir werden wieder zwei der Farben aufdecken.

**Student:** Ich nehme dieses und dieses.

**Amit Sahai:** Das ist schlau von dir, mit demselben zu überprüfen, das du bereits hattest. Aber wie du sehen wirst, ist es jetzt nicht grün – es ist blau. Und dieses hier hingegen ist grün. Die Farben, die ich dir beim letzten Mal gezeigt habe, funktionieren nicht mit diesen neuen Farben. Aber es funktioniert für diese Färbung, die ich dir gerade zeige. Was wir also getan haben, ist, dass wir es dir unmöglich gemacht haben, die Teile zusammenzusetzen. Und wenn du das tausendmal machst und ich dir jedes Mal korrekte, unterschiedliche Farben zeige, wärst du wirklich überzeugt. Und das ist es – das ist der gesamte Zero-Knowledge-Beweis.

**Student:** Ist es also wie ein probabilistischer Beweis?

**Amit Sahai:** Ja. In tatsächlichen Implementierungen würden wir keine Umschläge verwenden – man würde Verschlüsselung verwenden. Aber das ist das Protokoll.

**Student:** Was sind also die umfassenderen Auswirkungen von Zero-Knowledge-Beweisen? Sollen sie praktischer für die Implementierung sein, oder sollen sie strukturell etwas beweisen?

**Amit Sahai:** Es geht nicht darum, etwas effizienter zu machen. Es geht darum, Dinge zu tun, von denen wir vorher einfach nicht wussten, wie wir sie tun sollen. Ich kann dir tatsächlich beweisen, ohne eines meiner Geheimnisse preiszugeben, dass ich mich ehrlich verhalte. Ich könnte dir beweisen, dass ich ein verschlüsseltes Dokument korrekt signiert habe, ohne preiszugeben, was dieses geheime Dokument war. Diese Fähigkeit, die Spielregeln zu ändern – wirklich zu verändern, was wir tun können – ist das, was Zero-Knowledge mit sich bringt.

**Student:** Wo könnten wir deiner Meinung nach mit Zero-Knowledge-Beweisen mehr Vertrauen aufbauen?

**Amit Sahai:** Ein großartiges Beispiel sind Wahlen. Wenn man beweisen könnte, dass eine Wahl korrekt durchgeführt wurde – dass jede Stimme gezählt wurde und alles dazu führte, dass eine Person mit einer bestimmten Gesamtzahl gewann – und zwar in Zero-Knowledge, dann muss man die tatsächlichen Stimmen keiner Person preisgeben. Und doch könnte jeder sehen, dass es korrekt gemacht wurde.

#### Stufe 4: Doktorand (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Es ist so toll, dich hier zu haben und mit dir zu sprechen, Eli. Kannst du mir ein wenig über deine Forschung erzählen?

**Eli:** Meine Forschung befasst sich mit Kryptographie. Genauer gesagt arbeite ich an einigen Protokollen für Multi-Party-Computation. Dasjenige, an dem ich gerade arbeite, ist ein System zur Berechnung aggregierter Statistiken, sodass Dienstanbieter wie Google Chrome oder Tesla diese Statistiken sammeln können, ohne etwas über die Daten einzelner Nutzer zu erfahren. Ich als Nutzer muss Firefox nicht wissen lassen, dass meine Lieblingswebsite mylittlepony.com ist. Aber sie können wissen, wie viele Nutzer jeden Tag auf mylittlepony.com gehen.

**Amit Sahai:** Das ist fantastisch. Multi-Party-Computation liegt mir sehr am Herzen. Offensichtlich geht es bei Zero-Knowledge-Beweisen darum, einer anderen Person Dinge zu beweisen, ohne die Details dessen preiszugeben, was man beweist. Aber in meinen Augen geht Zero-Knowledge eigentlich noch viel weiter darüber hinaus. Es ist dieses übergreifende Konzept, das man oft in der Multi-Party-Computation sieht, wo man eine Aufgabe erledigen möchte, ohne mehr preiszugeben als genau das, was man zur Erledigung dieser Aufgabe benötigt.

**Eli:** Richtig, und es ermöglicht einem zu beweisen, dass man sich ehrlich verhalten hat, ohne die beteiligten Geheimnisse preiszugeben, die man verwendet, um sich tatsächlich ehrlich zu verhalten. Wir wissen, dass Zero-Knowledge-Beweise für NP-vollständige Sprachen eine so große Rolle in der Kryptographie spielen. Wie war deine erste Erfahrung mit NP-Vollständigkeit?

**Amit Sahai:** Meine erste Begegnung war in meinem allerersten Algorithmen-Kurs als Bachelorstudent. Eine NP-vollständige Sprache ist dieses erstaunliche Problem, das einem nicht nur etwas über sich selbst verrät, sondern die Lösung dieses Problems kann einem tatsächlich etwas über eine ganze Klasse von wirklich interessanten Problemen verraten.

**Eli:** Als du zum ersten Mal anfingst, über Beweise als ein interaktives Spiel nachzudenken, bei dem wir miteinander reden, hat das Zero-Knowledge möglich gemacht?

**Amit Sahai:** Absolut. Und die Idee, dass Zufälligkeit nützlich sein könnte, um etwas zu beweisen – scheint wiederum so kontraintuitiv, wenn wir an das platonische Ideal eines Beweises denken. Dort gibt es keine Zufälligkeit, keinen Nicht-Determinismus.

**Eli:** Es hat mit dieser ganzen Idee zu tun, einen Beweis auf den Kopf zu stellen. In einem alten klassischen Beweis richtet sich Zufälligkeit spezifisch gegen das Ziel dessen, was man zu tun versucht, weil man versucht, alles offensichtlich zu machen und den Informationsfluss offenzulegen. Aber sobald man das auf den Kopf stellt und das nicht mehr versucht, werden plötzlich all die schlechten Eigenschaften der Zufälligkeit gut.

**Amit Sahai:** Genau. Zufall ist unvorhersehbar, und das ist es, was wir wollen. Wir wollen, dass diese Unvorhersehbarkeit tatsächlich die Informationen verbirgt, die wir verbergen wollen. Wie hast du Zero-Knowledge in den Projekten verwendet, an denen du gearbeitet hast? Was sind die Herausforderungen, auf die du stößt?

**Eli:** Normalerweise ist der schwierigste Teil herauszufinden, wo genau der beste Ort ist, um es einzusetzen. Ich habe einige Arbeiten geschrieben, die Zero-Knowledge auf eine eher theoretische Weise verwendet haben, aber wenn es um Anwendungen geht, waren einige der aufregendsten Anwendungen, die ich bisher gesehen habe, im Blockchain-Bereich.

**Amit Sahai:** Was sind einige der Effizienzengpässe?

**Eli:** Eines der coolsten Dinge an Zero-Knowledge-Beweisen ist, dass es so viele Arten gibt – ich nenne sie gerne Geschmacksrichtungen. Im Allgemeinen liegt der Hauptengpass bei der Anwendung von Zero-Knowledge-Beweisen meist beim Beweiser.

**Amit Sahai:** Kann man die Aufgabe des Beweisers nehmen und sie in viele parallele Berechnungen aufteilen?

**Eli:** Das ist so eine spannende Frage. Ich glaube, wir als Fachgebiet kennen die Antwort darauf noch immer nicht. Eines der coolsten Dinge, die ich in den letzten drei oder vier Jahren gesehen habe, ist der Übergang von der Theorie zur Praxis – zu sehen, wie all diese erstaunlichen Systeme, die sich die Leute in den letzten 30 Jahren ausgedacht haben, anfangen, tatsächlich effizient genug zu werden, um umgesetzt zu werden.

**Amit Sahai:** Ohne Zweifel. Und besonders mit Cloud-Computing – die Leistung der Cloud zu nutzen, um Zero-Knowledge-Beweise zu ermöglichen, wäre erstaunlich. Auch im Blockchain-Bereich wäre es großartig, wenn man die Generierung von Beweisen beschleunigen möchte, wenn das auf verteilte Weise geschehen könnte. Eine meiner Hoffnungen ist, dass es bei der Kraft der Multi-Party-Computation darum geht, Menschen zusammenzubringen, die einander misstrauen. Können wir diese Kraft in der Kryptographie nehmen und sie nutzen, um bei dem enormen Maß an Misstrauen zu helfen, das derzeit in der Gesellschaft herrscht?

**Eli:** Ich denke, das ist einer der Gründe, warum ich mich so zur Multi-Party-Computation hingezogen fühlte. Eines der wichtigsten Probleme auf der Welt ist die Tatsache, dass so viele Menschen einander nicht vertrauen. In der Lage zu sein, Mathematik zu nutzen, um Technologie zu erschaffen, die es Menschen ermöglicht, zusammenzuarbeiten, ohne einander vertrauen zu müssen, ist eine wirklich coole und großartige Mission.

#### Stufe 5: Experte (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, es ist so toll, dich wiederzusehen. Ich glaube, das letzte Mal haben wir uns 2017 oder so getroffen.

**Shang-Hua:** Ich glaube, wir haben während der Pandemie einmal gezoomt, aber es ist gut, dich persönlich zu sehen. Tatsächlich belegte ich 1986 einen Krypto-Kurs bei Professor Leonard Adleman, dem A von RSA. Er gab mir das Paper von Goldwasser, Micali und Charlie Rackoff über Zero-Knowledge-Beweise auf. Das war also in der Tat meine allererste Präsentation überhaupt in diesem Land – über Zero-Knowledge.

**Amit Sahai:** Das ist fantastisch. Es ist ein fast schon hypnotisches Konzept.

**Shang-Hua:** Es ist auch interessant, wie man diese Konzepte mathematisch formuliert. Zum Beispiel haben wir Daten. Letztendlich kann man aus Daten durch Data-Mining Informationen gewinnen. Und dann gibt es dieses Wort namens „Wissen“. Über Wissen wird selbst in der Philosophie schon lange debattiert. Was ist Wissen? Aber hier ist eine sehr faszinierende Art und Weise, wie Mathematiker oder Informatiker dieses Wissen erfassen wollen. Es hieß nicht „Zero-Information-Beweis“. Was ist also deine Meinung dazu, warum „Wissen“ statt „Information“ oder „Zero-Data-Beweis“? Offensichtlich gibt es dort Daten, also kann es nicht Zero-Data sein.

**Amit Sahai:** Absolut. Ich glaube nicht, dass wir auf diese Frage schon eine völlig zufriedenstellende Antwort haben. Was eine so schöne Erkenntnis war, ist die Idee, dass Zero-Knowledge etwas ist, das man bereits vorhersagen kann. Wenn man die Antwort bereits vorhersagen kann, dann darf man durch diese Interaktion kein Wissen gewinnen. Diese Erkenntnis – die Zukunft genau vorhersagen zu können und dass dies ein Beweis für einen Mangel an neuem Wissen ist – war eine so schöne, erstaunliche Erkenntnis.

**Shang-Hua:** Nun, es gibt hier nicht null Informationen. Grundsätzlich kommt es aus der Perspektive von Computing und Sicherheit darauf an, wie viel Wissen man gewinnt, mehr als darauf, wie viele Informationen man gewonnen hat und wie viele Daten man hat. Daten implizieren nicht sofort Wissen. Aber die Leute können das nicht immer unterscheiden.

**Amit Sahai:** Richtig. Zum Beispiel in der medizinischen Forschung – wie erstaunlich wäre es, ein Medikament zu haben und zu beweisen, dass es in diesem Modell funktioniert, ohne die Struktur der Verbindung preisgeben zu müssen?

**Shang-Hua:** Was würdest du sagen, sind die nächsten Richtungen in diesem Bereich?

**Amit Sahai:** Dieses Konzept von Zero-Knowledge-Programmen würde es einem ermöglichen, völlig beliebige Berechnungen auf eine Zero-Knowledge-Weise durchzuführen, ohne jegliche Interaktion. Ich kann einfach das Programm nehmen, es in ein Zero-Knowledge-Programm – oder ein verschleiertes Programm – umwandeln und es dir dann einfach schicken. Du kannst es ausführen und den Nutzen aus dieser Berechnung ziehen, ohne noch mit mir sprechen zu müssen.

**Shang-Hua:** Das ist richtig. Es gibt eine nicht-interaktive Natur. Aber es steckt Verifizierbarkeit darin. In der Blockchain haben sie auch begonnen, einen allgemeineren Zero-Knowledge-Beweis in das Ledger aufzunehmen.

**Amit Sahai:** Wir sind jetzt definitiv an diesem Punkt, an dem Zero-Knowledge immer mehr genutzt werden wird. Es gibt so viele Konferenzen und Treffen im Zero-Knowledge-Bereich, zu denen du und ich nicht eingeladen sind – weil sie für die Leute sind, die entwickeln, die Leute, die programmieren, nicht für uns Mathematiker. Und ich denke, das ist ein Zeichen. Das ist ein Zeichen dafür, dass unser Baby erwachsen geworden ist und es an der Zeit ist, dass es weiterentwickelt wird.

**Shang-Hua:** Ich denke tiefgreifend, die Studenten fragen mich oft, was die zukünftigen Richtungen sind – sowohl in Bezug auf Krypto, Zero-Knowledge-Beweise, in der realen Welt als auch im mathematischen Computing.

**Amit Sahai:** Das ist eine großartige Frage. Ich wünschte, ich könnte in die Zukunft sehen. Das kann ich nicht, aber lass es mich versuchen. Ich denke, wir haben in den letzten Jahrzehnten so viel in der Kryptographie getan, aber wir verstehen so wenig. Der grundlegendste Aspekt ist das Verständnis von Härte – wie bekommen wir harte Probleme? Wie konstruieren wir eigentlich mathematisch harte Probleme, damit wir sie dann nutzen können, um effiziente Zero-Knowledge-Programme und -Beweise zu erstellen?

**Shang-Hua:** Ich nehme an, auch beim Quantencomputing braucht man noch härtere Probleme.

**Amit Sahai:** In der Tat. Jetzt, da das Gespenst des Quantencomputings auf uns zukommt, wissen wir alle, dass Quantencomputer viele kryptographische Systeme knacken können. Es ist eine tiefgreifende Herausforderung. Können wir also neue Quellen der Härte finden, die quantenresistent sind – die selbst Quantencomputer nicht knacken können? Das ist etwas, woran ich in den letzten Jahren gearbeitet habe.

**Shang-Hua:** Aber ich bin sicher, sie werden zu schöner Mathematik motivieren.

**Amit Sahai:** Ja, das ist richtig. Eines der großartigen Dinge an der realen Welt ist, dass die Menschen in der realen Welt Anforderungen haben. Und diese Anforderungen klingen oft unmöglich. Und da kommen wir ins Spiel – es ist unser Job, das Unmögliche möglich zu machen.