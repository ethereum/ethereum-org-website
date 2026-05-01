---
title: "Jenseits des Ethereum-Protokolls: Proposer-Builder-Trennung"
description: "Eine Präsentation über die Proposer-Builder-Trennung (PBS), ein Entwurfsmuster, das die Rollen der Block-Erstellung und des Block-Vorschlagens in Ethereum trennt."
lang: de
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "PBS erklärt"
---

Diese Präsentation erklärt, wie sich die Blockproduktion von Ethereum von einem einfachen Modell zu einer komplexen Lieferkette entwickelt hat, an der Validatoren, Builder, Searcher und Relays beteiligt sind. Barnabé Monnot von der Ethereum Foundation erläutert, warum es die Proposer-Builder-Trennung (PBS) gibt, wie MEV-Boost-Relays die Beziehung zwischen Proposern und Buildern vermitteln und welche protokollinternen Lösungen erforscht werden, um Vertrauensabhängigkeiten zu verringern und die Zensurresistenz, die MEV-Verteilung und die dezentrale Struktur der Validatoren zu verbessern.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=u8XvkTrjITs), das vom CBER Forum veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Mein Name ist Barnabé Monnot. Ich werde ein wenig darüber sprechen, was außerhalb des Protokolls passiert, und insbesondere über das Konzept der Proposer-Builder-Trennung und wie es mit Relays und einer Menge offchain-Infrastruktur betrieben wird.

Ich stelle mir das Protokoll gerne als ein abstraktes Objekt vor, das bestimmte Befugnisse hat. Eine der Befugnisse, die das Protokoll hat, ist die Fähigkeit, bestimmten Teilnehmern Rechte zu verleihen. Wir haben im vorherigen Vortrag gesehen, dass das Protokoll Validatoren ermächtigt, Konsensaufgaben zu erfüllen, aber das ist nicht das Einzige, was sie tun – wir müssen auch Blöcke mit Transaktionen packen. Wir nennen das die Ausführungsaufgaben, und darauf möchte ich mich in diesem Vortrag konzentrieren.

#### Warum Validatoren Builder nutzen (0:46) {#why-validators-use-builders-046}

Interessant ist, dass, obwohl das Protokoll diese Rechte hervorbringt und sie den Validatoren überträgt, wir in der Praxis beobachten, dass viele Validatoren sich dafür entscheiden, das Recht nicht selbst auszuüben. Sie entscheiden sich dafür, das Recht an jemand anderen abzugeben, damit dieser es in ihrem Namen ausführt. Und diesen „jemand anderen“ kennen wir bei Ethereum als Builder.

Wir beobachten also, dass Validatoren zwar weiterhin diese Konsensaufgaben selbst übernehmen, sich aber dazu entschließen, die Ausführungsaufgaben an Builder weiterzugeben. Das ist tatsächlich ein ziemlich bedeutender Markt. Heute werden etwa 90 % der Blöcke von externen Buildern erstellt, und das ist seit etwa Dezember 2022 der Fall – drei Monate nach dem Merge. Die mittlere Zahlung vom Builder an den Validator beträgt etwa 120 US-Dollar pro Block. Täglich wird eine Million Dollar ausgezahlt, und alle 12 Sekunden gibt es für diesen Markt die Möglichkeit, zu einer Art Einigung zwischen einem Proposer und einem Builder zu kommen.

Heute möchte ich erörtern, warum Validatoren Builder nutzen und woher diese Beziehung kommt – dabei werde ich ein wenig über MEV und Searcher einführen –, dann werde ich Ihnen erzählen, wie diese Beziehung vermittelt wird, und ich werde über die Relays sprechen, die heute existieren, sowie über protokollinterne Lösungen, über die wir nachdenken. Ich möchte auch das große Ganze betrachten, denn es ist leicht, diese Bilder zu sehen und zu denken: „Oh, das ist sehr beängstigend, was ist mit der Dezentralisierung?“ Ich möchte Ihnen das Gefühl geben, dass dies Kompromisse sind, die eingegangen werden, aber meiner Meinung nach in die richtige Richtung gehen.

#### Das naive Modell und MEV (3:04) {#the-naive-model-and-mev-304}

Man kann sich ein naives Modell der Blockproduktion vorstellen, bei dem der Validator nach einem Leader-Auswahlverfahren ausgewählt wird und einen Block erstellen muss, der eine Liste von Transaktionen aus dem Mempool enthält. Im naivsten Modell gibt es eigentlich nur zwei Parteien – einen Validator, der den Mempool überwacht, und wenn er an der Reihe ist, einen Block zu erstellen, nimmt er die Transaktionen heraus, die die meisten Gebühren zahlen, und fügt sie hinzu, meist unter Verwendung nicht sehr ausgefeilter Pack-Algorithmen.

Was in den letzten fünf Jahren ziemlich dramatisch beobachtet wurde, ist, dass dies dem Produzenten viel Macht verleiht – insbesondere die Macht des letzten Blicks (Last Look). Sie sehen, was die Nutzer tun wollen, zum Beispiel sehen sie, dass der Nutzer etwas tauschen möchte, und sie können diese Informationen nutzen, um Profit für sich selbst zu extrahieren.

Im besten Fall stammt dieser Profit aus natürlichen Marktfunktionen wie Arbitrage. Im schlimmsten Fall kann er direkt aus der Tasche des Nutzers kommen, wie im Fall von Sandwich-Angriffen. Zum Beispiel gibt ein Nutzer eine Tausch-Order für Token A gegen Token B auf einem Markt wie Uniswap auf. Diese Transaktion wird ein Preisungleichgewicht mit einem anderen Markt erzeugen, der auf derselben Chain bereitgestellt ist. Der Produzent kann die ausstehende Transaktion sehen und seine eigene Transaktion einfügen, die einen Tausch in die andere Richtung auf einem anderen Markt durchführt, und dabei die Arbitrage einstreichen.

Das gibt dem Produzenten wirklich viel Macht und macht die Position des Blockproduzenten extrem wertvoll. Dieses Produzentenprivileg ist etwas, das wir heute als **Maximal Extractable Value (MEV)** bezeichnen.

#### Die Rolle der Searcher (5:43) {#the-role-of-searchers-543}

In der Praxis wissen die Produzenten möglicherweise nicht, wo der Wert liegt. Es kann etwas unbedarfte Blockproduzenten geben – wie erwähnt, kann jeder ein Validator werden, solange er über ausreichend Kapital verfügt und in der Lage ist, einen Knoten zu betreiben. In der Praxis weiß ich vielleicht nicht, wie man Arbitrage betreibt oder irgendetwas über Finanzmärkte. Was ich wollen würde, ist, dass mir jemand sagt, wo diese Möglichkeiten liegen – ein Markt von Leuten, die darum konkurrieren, mir zu sagen, was das Beste ist, was ich als Blockproduzent tun kann.

Diese Entitäten, die sehr gut darin sind, Möglichkeiten zu finden, nennen wir **Searcher**. Sie decken Möglichkeiten für den Blockproduzenten auf. Der Searcher könnte beobachten, wie ein Nutzer einen Tausch durchführt, entweder über den öffentlichen Mempool oder über Dark Pools oder private Kanäle, und dann dem Validator mitteilen: „Da findet ein Tausch statt – wenn du diesen Tausch zusammen mit dieser Arbitrage in ein Bündel atomarer Transaktionen packst und dieses Bündel aufnimmst, dann kannst du mit der Arbitrage Geld verdienen.“ Es wird viele Searcher geben, die darum konkurrieren, den Blockproduzenten zu überzeugen.

Dieses Modell funktioniert in der Praxis gut, wenn der Searcher darauf vertraut, dass der Produzent das Bündel atomar hält. Sie haben vielleicht kürzlich von einem Angriff auf Ethereum gehört, der eine Gruppe von Sandwichern 25 Millionen Dollar gekostet hat – die Hauptursache war, dass es dem Angreifer gelang, die Atomarität von Bündeln zu brechen, die Inhalte zu empfangen und zu versuchen, sie neu zu organisieren und zu modifizieren. Das ist eine sehr wichtige Eigenschaft, die wirklich nur so lange Bestand hat, wie man darauf vertrauen kann, dass der Produzent diese Atomarität nicht bricht.

#### Warum wir Builder brauchen (8:16) {#why-we-need-builders-816}

Was tut man, wenn ein Produzent nicht vertrauenswürdig ist? Nach dem Merge bei Ethereum haben wir Solo-Staker – etwa 6 % des Netzwerks –, die wir nicht kennen. Die Searcher werden diesen Block-Proposern nicht wirklich Bündel schicken wollen, weil es ein bisschen zu gefährlich ist.

Das Design, zu dem man also gelangt ist, lautet: Anstatt dass Searcher Bündel kommunizieren, die der Produzent in seinen Block aufnimmt, erstellen wir einfach den gesamten Block für dich. Auf diese Weise kannst du den Block einfach blind signieren – du musst nicht wissen, was drin ist, du vertraust darauf, dass der Builder dir einen guten Block liefert.

Jetzt hat man diese noch tiefere Kette: den Validator an einem Ende, den Nutzer am anderen, und dazwischen diese ganze Kette von Vermittlern, die im Laufe der Zeit immer dichter wird. Der Builder übernimmt den Ausführungsteil, während der Validator den Konsens übernimmt.

#### Wie MEV-Boost-Relays funktionieren (13:01) {#how-mev-boost-relays-work-1301}

Nehmen wir an, Sie sind ein Proposer und möchten in diesen Markt einsteigen. Dieser Blockproduktionsdienst ist ein klassisches Problem des fairen Austauschs (Fair Exchange) – zwei Parteien versuchen, zu einer Einigung zu kommen, aber sie vertrauen einander nicht. Die klassische Literatur besagt, dass man keinen fairen Austausch ohne eine vertrauenswürdige dritte Partei durchführen kann.

Was wir heute als vertrauenswürdige dritte Partei nutzen, nennen wir ein **Relay** – das MEV-Boost-Relay. MEV-Boost ist der Name des Protokolls, das die Interaktionen zwischen Buildern und Validatoren vermittelt. Das Relay sitzt in der Mitte, um sicherzustellen, dass die Vereinbarung von beiden Seiten zustande kommt.

Das Relay hat ein paar Aufgaben. Erstens muss es die Payload eines Builders validieren – das Relay sieht den Block, den der Builder erstellt, im Klartext und kann überprüfen, ob er gültig ist und dem Netzwerk vorgeschlagen werden kann. Es gibt eine Variante namens optimistisches Relay, bei der das Relay die Gültigkeit nicht sofort überprüft, sondern den Builder um eine Sicherheit bittet, für den Fall, dass der Block letztendlich ungültig ist.

Zweitens geben die Builder Gebote ab und versuchen zu konkurrieren, um der vom Validator ausgewählte Builder zu werden. Das Relay fungiert als Gebotsweiterleiter und sendet die Gebote an den Validator. Im letzten Schritt, sobald der Validator eines der Gebote vom Relay auswählt – und der Validator kann sich mit so vielen Relays verbinden, wie er möchte –, signiert er es, immer noch ohne zu wissen, was der Blockinhalt ist, und sendet das signierte Gebot an das Relay zurück. Mit diesem signierten Gebot kann das Relay den Block an das Netzwerk freigeben.

Die Ökonomie von Relays ist kompliziert. Einige sind kostenlos, ähnlich wie Öffentliche Güter. Andere haben Ertragsmodelle entwickelt – das Ultrasound-Relay hat zum Beispiel eine „Gebotsanpassung“, bei der sie die Differenz zwischen dem besten und dem zweitbesten Gebot als Einnahme verbuchen.

#### Vertrauen und das Relay (17:01) {#trust-and-the-relay-1701}

Das Relay ist die vertrauenswürdige dritte Partei im System. Angenommen, ein Relay liefert einen ungültigen Block – die Leute werden es sofort sehen, weil er signiert ist, und sie werden die Verbindung zu diesem Relay sehr schnell trennen. Man kann sogar eine Art Fehlerbeweis über das Gossip-Protokoll verbreiten. Innerhalb von fünf Blöcken werden die Leute aufhören, dem Relay zu vertrauen, und einfach die Verbindung trennen, wenn es nicht gut funktioniert.

Es basiert also auf Vertrauen, aber mit der Annahme, dass es relativ schnell ersetzt werden kann. Die Relays sind keine Validatoren – sie haben nicht zwangsläufig einen Stake und müssen nichts mit Ethereum zu tun haben. Es könnten Leute sein, die wir heute kennen und schätzen, aber morgen könnte es jeder sein.

#### Verankerung von PBS im Protokoll (20:01) {#enshrining-pbs-in-the-protocol-2001}

Wir versuchen, den Status des Relays als vertrauenswürdige dritte Partei zu beseitigen. Wir haben eine vertrauenswürdige dritte Partei, die wir bei Ethereum mögen – und das ist Ethereum selbst. Man kann protokollinterne Lösungen entwerfen, die im Wesentlichen versuchen, die Rolle des Relays zu verankern und die Abhängigkeit davon optional zu machen.

Im Moment sieht das Ethereum-Protokoll einen Teil dessen, was die Validatoren tun, ist aber völlig blind für das Netzwerk der Builder. Wir versuchen, es so voranzutreiben, dass das Ethereum-Protokoll zur vertrauenswürdigen dritten Partei in der Interaktion zwischen Proposer und Builder wird – in diesem Sinne müssen wir uns nicht mehr auf das Relay verlassen.

#### Builder einschränken, Dezentralisierung verstärken (22:05) {#constraining-builders-amplifying-decentralization-2205}

Das große Ganze ist wichtig. Auf jeder Ebene scheinen unterschiedliche Spiele stattzufinden und verschiedene Akteure nehmen einander Geld ab – ist das wieder das traditionelle Finanzwesen? Ich möchte argumentieren, dass diese Kompromisse nicht aus einer schlechten Absicht heraus entstehen. Sie versuchen, sich auf Eigenschaften dieser Systeme zu stützen, von denen wir glauben, dass sie hilfreich sind, um sie zu skalieren und nützlicher zu machen.

Vitalik sprach über eine grundlegende Asymmetrie von Diensten, die eine Blockchain anbieten könnte. Konsens erfordert eine sehr große dezentrale Gruppe von Menschen, die die Kontrolle behalten. Aber einige Dienste erfordern wirklich nur eine Person, die die Arbeit gut macht, und alle anderen, die überprüfen, ob die Arbeit gut gemacht wurde. Wir brauchen nur einen Builder, um einen Block zu erstellen, und dann kann jeder überprüfen, ob er gültig ist.

Heute gibt es eindeutig drei dominante Builder: Beaver Build, Titan und rsync Builder. Ist das ein guter Zustand? Nicht wirklich – wir können es besser machen. Aber ist es realistisch, sich vorzustellen, dass wir so viele Builder wie Validatoren haben werden? Wahrscheinlich nicht.

Was wir wirklich wollen, ist diese dünne Schicht von Validatoren, die die Tatsache einschränkt und nutzt, dass es in der Mitte hochleistungsfähige Parteien gibt, die Aufgaben ausführen können, welche keine Annahmen über eine ehrliche Mehrheit erfordern.

Einige Ideen zur Einschränkung von Buildern:

- **Inclusion Lists (Aufnahmelisten)** – bei denen der Validator dem Builder sagt: „Du musst diese Transaktionen in deinen Block aufnehmen“
- **Partielle Block-Erstellung** – das Aufteilen des gesamten Blocks, damit der Builder kein Monopol über den gesamten Platz hat
- **Reduzierung von Abhängigkeiten von Drittanbietern** – Verankerung der Relay-Rolle im Protokoll

Um die Dezentralisierung der Validatoren zu verstärken:

- **Attester-Proposer-Trennung** – anstatt den Validator standardmäßig zum Blockproduzenten zu machen, wird eine andere Gruppe von Personen als Blockproduzenten ausgewählt und die Rollen werden entbündelt
- **Verbesserte Staking-Mechanismen** – das Staking bei Ethereum ist heute noch etwas rudimentär und kann verbessert werden

#### Fragen und Abschluss (27:03) {#questions-and-closing-2703}

Eine Frage aus dem Publikum: In der traditionellen Finanzwelt wird die Abwicklungszeit von zwei Tagen auf einen Tag reduziert. Würde eine Reduzierung der Abwicklungszeit von 12 Sekunden auf ein kürzeres Intervall einige der Front-Running-Probleme lösen?

Die Leute sprechen darüber – sie nennen es **Pre-Confirmations (Vorab-Bestätigungen)**. Die Idee ist, dass man seine Transaktion sendet und jemand einem sagt: „Du bist dabei, zu diesem Preis, in diesem Zustand.“ Die Sache ist die, man kann nicht schneller abwickeln, als das Protokoll läuft. Man kann keine schnellere Abwicklung der Endgültigkeit als 12 Minuten erreichen. Man kann sich nicht schneller als die Blockzeit bewegen.

Die Verkürzung der Blockzeit ist schwierig, weil wir die Validator-Schicht so dezentral wie möglich halten wollen, und eine Verkürzung erhöht lediglich die Hardwareanforderungen.