---
title: "EIP-7805: Fork-Choice-erzwungene Inklusionslisten (FOCIL)"
description: "Die Ethereum-Forscher Thomas Thiery und Julian Ma führen durch EIP-7805 (FOCIL), das aggregierte lokale Inklusionslisten verwendet, um zu garantieren, dass gültige Transaktionen nicht von Block-Buildern zensiert werden können."
lang: de
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Episode 141 von **PEEPanEIP** von den Ethereum Cat Herders. Gastgeberin Pooja Ranjan wird von **Thomas Thiery** und **Julian Ma** begleitet, Forschern in der Robust Incentives Group der Ethereum Foundation und Co-Autoren von [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), um Fork-Choice-erzwungene Inklusionslisten (FOCIL) zu erklären: warum Ethereum Zensurresistenz auf Protokollebene benötigt, wie der Mechanismus funktioniert und wie der Stand der Implementierung ist.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=cUGyLx-mf6I), das von den Ethereum Cat Herders veröffentlicht wurde. Es wurde für eine bessere Lesbarkeit leicht bearbeitet.*

### Einführung (0:35) {#introduction-035}

**Pooja Ranjan:** Hallo und willkommen bei PEEPanEIP, der einzigen Show, in der wir tief in Ethereum Improvement Proposals eintauchen und ihre Auswirkungen auf das Ökosystem untersuchen. Dies ist Episode 141, präsentiert von den Ethereum Cat Herders. Ich bin eure Gastgeberin, Pooja Ranjan, und heute sprechen wir über EIP-7805, Fork-choice enforced Inclusion Lists.

EIP-7805 wurde im November 2024 dokumentiert und ist ein Core-Vorschlag auf dem Standards Track, der sich derzeit im Entwurfsstatus befindet. Dieser Vorschlag zielt darauf ab, es einem Komitee von Validatoren zu ermöglichen, eine Reihe von Transaktionen in jedem Block zwangsweise aufzunehmen. Der Vorschlag wurde von Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann und Jihoon Song mitverfasst und wird derzeit aktiv für ein zukünftiges Upgrade diskutiert.

In dieser Episode werden wir die Details von EIP-7805, seine Implikationen und seine potenziellen Auswirkungen auf das Ethereum-Ökosystem untersuchen. Um mehr über den Vorschlag zu sprechen, sind Thomas Thiery und Julian Ma bei uns. Willkommen bei PEEPanEIP.

**Thomas Thiery:** Danke für die Einladung.

**Julian Ma:** Ja, vielen Dank für die Einladung.

**Pooja Ranjan:** Wir freuen uns darauf, einen Überblick über den Vorschlag zu erhalten, wo er heute steht und wie bald wir ihn im Ethereum Mainnet sehen können. Aber bevor wir anfangen: Unsere Community liebt es, die Forscher und Entwickler hinter der Arbeit kennenzulernen. Könntet ihr ein wenig über euch selbst erzählen, über das Projekt, an dem ihr derzeit beteiligt seid, und über eure Reise innerhalb des Ethereum-Ökosystems?

### Vorstellungen der Gäste (2:14) {#guest-introductions-214}

**Julian Ma:** Klar, ich kann anfangen. Ich bin Julian, ein Forscher in der Robust Incentives Group, genau wie Thomas, bei der Ethereum Foundation. Die Robust Incentives Group befasst sich im weitesten Sinne mit der Ökonomie des Protokolls. Einige von uns haben sich mit Transaktionsgebühren-Mechanismen wie EIP-1559 beschäftigt, und andere haben sich Angriffe auf die Konsensschicht angesehen, meist solche, die durch wirtschaftliche Anreize motiviert sind.

Ich für meinen Teil habe mit einem Praktikum angefangen, bei dem ich mir Grundgebühr-Derivate angesehen habe, und danach bin ich in Vollzeit eingestiegen. Ich habe hauptsächlich an der Proposer-Builder-Trennung (PBS) und MEV-bezogenen Themen gearbeitet und konzentriere mich jetzt auf Inklusionslisten via FOCIL mit diesem EIP und freue mich auf die Attester-Proposer-Trennung. Ich würde sagen, ich bin am meisten davon begeistert, Forschung über diese Pipeline in die Produktion zu bringen, indem wir mit eher theoretischer Arbeit beginnen und sie in Richtung eines EIPs bringen, das hoffentlich innerhalb von Ethereum vorgeschlagen und implementiert werden kann.

**Thomas Thiery:** Ich bin Thomas. Ich arbeite ebenfalls bei der Ethereum Foundation in der Robust Incentives Group und forsche dort. Mein Hintergrund ist eigentlich ein Doktortitel in Neurowissenschaften, was etwas ganz anderes war. Aber ich wurde neugierig auf Blockchains und verteilte Systeme, wollte etwas anderes ausprobieren und schloss mich einem Krypto-Datenunternehmen namens Dune an. Dort bin ich eine Weile geblieben, aber dann habe ich die Forschung vermisst und hatte das Glück, der EF und der Robust Incentives Group beitreten zu können, was bisher großartig war.

Ich habe an ähnlichen Themen gearbeitet. MEV war ziemlich groß, als ich anfing. Interessanterweise waren meine allerersten Forschungsbeiträge sehr klein, aber sie handelten von Inklusionsverzögerungen und Zensurresistenz. Ich bin erst in letzter Zeit wirklich tief in die Materie eingetaucht. In den letzten sechs Monaten bis zu einem Jahr war ich aktiver auf der Seite der Zensurresistenz und Inklusion. Es war wirklich schön, mit Forschungsideen beginnen zu können, frühere Ideen zu verbessern, die sehr interessant waren, aber einige der Details, über die wir sprechen werden, nicht enthielten, einen Vorschlag auszuarbeiten und nun Implementierungen und Devnets zu haben, von denen die meisten Leute, mit denen ich gesprochen habe, denken, dass sie eine gute Ergänzung für Ethereum wären.

**Pooja Ranjan:** Danke fürs Teilen. Es ist immer inspirierend, den Hintergrund der Entwickler kennenzulernen. Es ist interessant zu sehen, dass sie aus verschiedenen Bereichen kommen und letztendlich zum Ethereum-Ökosystem beitragen. Ich habe verstanden, dass wir heute hier eine Präsentation haben. Also lassen Sie uns ohne weitere Umschweife einen Blick darauf werfen.

### Präsentation: Ziele von FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Perfekt, vielen Dank. Ich möchte mit einer kleinen Präsentation darüber beginnen, wie EIP-7805, oder FOCIL, funktioniert und warum genau wir es umsetzen wollen. Sie soll als Einstieg in das Gespräch dienen und wird daher nicht zu sehr in die Tiefe gehen, um danach noch Raum für Diskussionen zu lassen.

Das Hauptziel von FOCIL ist es, die glaubwürdige Neutralität von Ethereum zu erhöhen. FOCIL erreicht dies, indem es das Inklusionsmonopol aufhebt, das derzeit ein einzelner Proposer oder Block-Builder innerhalb eines Slots innehat. Stattdessen ermöglicht FOCIL mehreren Validatoren, zur Erstellung eines Blocks beizutragen, indem sie Transaktionen in jeden Block aufnehmen.

Das übergeordnete Ziel ist es, eine Eigenschaft anzustreben, die wir Chain-Neutralität nennen. Das bedeutet, dass jede ausstehende gebührenpflichtige Transaktion aufgenommen werden sollte, wenn sie verfügbar ist und es Platz gibt, sie Onchain aufzunehmen. Wir glauben, dass wir die glaubwürdige Neutralität von Ethereum erhöhen, wenn diese Eigenschaft ausreichend erfüllt ist.

### Warum brauchen wir FOCIL und warum jetzt? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Warum brauchen wir so etwas? Derzeit lagern fast alle Validatoren die Block-Erstellung an MEV-Boost aus, einen Markt außerhalb des Protokolls, auf dem Builder um die Rechte zur Block-Erstellung bieten. In diesem Markt gibt es nur zwei Entitäten, die wirklich dominieren, und das bedeutet, dass 90 % der Blöcke von nur zwei Entitäten erstellt werden.

Wir sehen hier, dass Ethereum seine glaubwürdige Neutralität nicht mehr aus der lokalen Block-Erstellung beziehen kann. Früher war das der Fall. Es begann damit, dass Proposer auf der ganzen Welt verteilt waren und jeder seine Blöcke lokal erstellte, was bedeutete, dass alle Transaktionen einbezogen wurden. Aber jetzt, da die Block-Erstellung an diese hochspezialisierten Entitäten ausgelagert ist, reicht das nicht mehr aus. Daher ist es notwendig, robustere Maßnahmen gegen Zensur zu implementieren, und FOCIL ist der bekannteste Weg, dies zu tun.

Warum sollten wir FOCIL jetzt implementieren? Man könnte denken, dass Builder derzeit nicht so viel zensieren, aber sie könnten jederzeit damit beginnen, sei es aus regulatorischen oder wirtschaftlichen Gründen. Und wirtschaftliche Zensur darf definitiv nicht unterschätzt werden. Es ist auch gut, FOCIL einzuführen, wenn es relativ wenig Zensur gibt, denn dann führt man es als Grundlinie und als Standard ein. Alle Validatoren erstellen Inklusionslisten unabhängig von ihrer Gerichtsbarkeit oder ihren wirtschaftlichen Anreizen, und es verursacht kaum Marktinstabilität. Würde man FOCIL hingegen einführen, wenn alle Builder zensieren, wäre es vielleicht schwieriger.

Außerdem werden Based Rollups heutzutage immer wichtiger, und sie werden sich auf die Block-Erstellung von Ethereum stützen. Wenn wir das Sequencing bereitstellen wollen, das Ethereum hat, ist es notwendig, hier durch FOCIL eine glaubwürdige Neutralität zu haben.

Und potenziell könnte FOCIL bei der Skalierung helfen, je nachdem, wen man fragt. Heute bezieht Ethereum seine Zensurresistenz immer noch aus der lokalen Block-Erstellung. Wenn Ethereum Zensurresistenz aus einer anderen Quelle beziehen kann, zum Beispiel über FOCIL, dann können wir vielleicht die Erwartungen, die wir an Block-Builder haben, erhöhen und zum Beispiel mehr Blobs zulassen. Aber potenziell könnte dies auch ohne FOCIL geschehen. Daher wurde vorgeschlagen, FOCIL in Fusaka zu implementieren.

### Wie FOCIL funktioniert (8:10) {#how-focil-works-810}

**Julian Ma:** Jetzt werde ich euch erklären, wie FOCIL funktioniert. Wir beginnen mit den Grundlagen und gehen Schritt für Schritt vor, bis wir den vollständigen Mechanismus haben, und untersuchen dann, wie dieser vollständige Mechanismus die von uns gewünschten Eigenschaften erfüllt.

Die Grundidee einer Inclusion List, die zuvor auch schon von Mike Neuder vorgeschlagen wurde, besteht darin, dass es eine Liste von Transaktionen gibt, die den Block in irgendeiner Weise einschränkt. Es gibt also beispielsweise eine Inclusion List, die die Transaktionen A und B enthält, sie wird von jemandem signiert, der vom Protokoll anerkannt wird, und dann müssen diese Transaktionen in einen Block aufgenommen werden. FOCIL ändert daran nichts. Es baut darauf auf, und es geht vielmehr darum, wer diese Liste erstellt und wie diese Liste durchgesetzt wird.

Wer erstellt also diese Liste? Dies ist der erste Schritt, wie das FOCIL-Protokoll funktioniert. In jedem Slot werden 16 Validatoren als Mitglieder des Inclusion-List-Komitees ausgewählt. Jedes dieser Komitee-Mitglieder beobachtet den Mempool und erstellt seine eigene Inclusion List. Eine Inclusion List sollte etwa 8 Kilobyte groß sein, was ungefähr 20 durchschnittlichen Transaktionen entspricht, also insgesamt etwa 320 durchschnittlichen Transaktionen.

Der zweite Schritt ist die Verteilung dieser Inclusion Lists. Die Mitglieder des Inclusion-List-Komitees verteilen ihre Inclusion Lists über das globale Topic und fügen sie nicht selbst in einen Block ein. Sie müssen dies vor Sekunde 9 des Slots tun, zu welchem Zeitpunkt die Attester ihre Sicht auf die lokalen Inclusion Lists einfrieren. Wie wir im nächsten Schritt sehen werden, sind die Attester diejenigen, die diese Inclusion Lists tatsächlich durchsetzen, wie der Name schon sagt: Fork-Choice Enforced Inclusion Lists. Sie frieren ihre Sicht darauf, welche Inclusion Lists sie durchsetzen werden, in Sekunde 9 ein, und dies verhindert Split-View-Angriffe. Der Block-Produzent hat noch ein paar zusätzliche Sekunden Zeit, um Inclusion Lists zu beobachten und sicherzustellen, dass er nicht negativ beeinflusst wird, falls er Inclusion Lists verpasst, sodass der Block-Produzent in diesem Szenario keinem Risiko ausgesetzt ist.

Dann kommen wir zum letzten Schritt, der Durchsetzung. Wie ich bereits sagte, erfolgt die Durchsetzung über die Fork-Choice. Attester stimmen nur dann für einen Block, wenn er die Bedingung der Inclusion List erfüllt. Sie tun dies, indem sie die Inclusion Lists beobachten, die über das globale Topic gesendet wurden, eine aggregierte Liste von Transaktionen erstellen, die sie in diesen Inclusion Lists gesehen haben, und dann überprüfen, ob alle diese Transaktionen im Block enthalten sind. Wenn diese Prüfung erfolgreich ist, stimmen sie für den Block. Es könnte auch der Fall sein, dass nicht alle Transaktionen aus den Inclusion Lists im Block sind, der Block aber voll ist. In diesem Fall stimmen die Attester ebenfalls für den Block. Die Attester stimmen also für den Block, es sei denn, er enthält die Transaktionen nicht und ist gleichzeitig nicht voll.

Um den gesamten Mechanismus zusammenzufassen: In jedem Slot werden 16 Komitee-Mitglieder als Mitglieder des Inclusion-List-Komitees ausgewählt. Sie beobachten den Mempool und erstellen Inclusion-List-Objekte, die sie vor einer Frist, in diesem Fall Sekunde 9, über das globale Topic verteilen. Der Ersteller beobachtet diese Inclusion Lists und nimmt alle Transaktionen, die er gesehen hat, in seinen Block auf. Die Attester prüfen dann, ob alle Transaktionen, die sie vor Sekunde 9 in Inclusion Lists gesehen hatten, tatsächlich im Block enthalten sind. Wenn diese Prüfung erfolgreich ist, stimmen sie für den Block, und wir gehen zum nächsten Slot über, in dem das gleiche Setup erneut abläuft.

### IL-Boost und Uncrowdability (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Eine der großen Sorgen bezüglich Inclusion Lists, die beim vorherigen EIP von Mike und während der darauffolgenden Entwicklung geäußert wurde, ist der „IL-Boost“ oder die Uncrowdability. Dies bezieht sich auf die Tatsache, dass Proposer von Inclusion Lists möglicherweise ihre Rechte zum Erstellen einer Inclusion List verkaufen möchten. Das ist eine sehr logische Sorge, denn wir sehen, dass dies bei der Block-Erstellung passiert: Der Verkauf dieses Rechts führt zu einem zentralisierten Markt von hochspezialisierten Block-Buildern.

Wir argumentieren, dass FOCIL aufgrund der folgenden Eigenschaften robust gegenüber diesen MEV-Boost-ähnlichen Märkten ist, oder IL-Boost, wie sie umgangssprachlich genannt werden. FOCIL garantiert keine Reihenfolge von Transaktionen. Unabhängig davon, wo Sie Ihre Transaktion in Ihrer Inclusion List platzieren, wird sie so angeordnet, wie es der Block-Builder für richtig hält. Wenn Sie beispielsweise eine Arbitrage-Transaktion in die Liste aufnehmen würden, ist es höchst unwahrscheinlich, dass der Builder Ihre Arbitrage-Transaktion an die Spitze des Blocks setzt, damit sie die Arbitrage tatsächlich ausführt. Stattdessen wird der Builder dies wahrscheinlich selbst tun.

Darüber hinaus ist ein privater Orderflow nicht möglich. Diese Inclusion Lists werden über das globale Topic verteilt, sodass Ihre Transaktionen öffentlich sind, bevor der Builder den Block erstellt. Es ist nicht möglich, dass ein privater Orderflow über eine Inclusion List in den Block gelangt.

Drittens gibt es mehrere Inclusion-List-Proposer pro Slot. Selbst wenn es etwas Wertvolles zu verkaufen gäbe, haben alle 16 Mitglieder des Inclusion-List-Komitees die gleiche Möglichkeit, diese Inclusion List zu erstellen, sodass der Wettbewerb unter diesen Inclusion-List-Proposern den Wert auf null drücken würde.

Und schließlich werden diese Inclusion Lists 3 Sekunden vor dem Handeln des Block-Produzenten erstellt. Es gibt 3 Sekunden an zusätzlichen Informationen, die normalerweise für MEV-Arten von Transaktionen extrem relevant sind, welche eintreffen, nachdem die Inclusion List festgeschrieben wurde und bevor der Block-Produzent handelt, was bedeutet, dass es nur einen sehr geringen Informationsvorteil gibt. Tatsächlich gibt es einen Informationsnachteil für diejenigen, die versuchen, Inclusion Lists als Vehikel für MEV zu nutzen.

Aus diesen Gründen glauben wir, dass kein einzelner Inclusion-List-Proposer die Macht zur Inklusion, Anordnung oder Exklusion hat, was die grundlegende Definition von MEV ist. Daher sollten Inclusion Lists nicht MEV unterliegen.

### Zusammenfassung der Präsentation (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Um diese kurze Präsentation zusammenzufassen: FOCIL ermöglicht es mehreren Validatoren, zur Block-Erstellung beizutragen, was das Inklusionsmonopol eines einzelnen Proposers verhindert und die glaubwürdige Neutralität von Ethereum stärkt. Wir glauben, dass es notwendig ist, FOCIL jetzt zu implementieren, da es derzeit nur zwei dominante Builder gibt, die jederzeit mit der Zensur beginnen könnten, und dies könnte aus wirtschaftlichen Gründen geschehen, von denen sie profitieren könnten. Die Block-Erstellung könnte stärker beansprucht werden, da Based Rollups die Sequenzierungseigenschaften von Ethereum nutzen wollen. FOCIL wird viel reibungsloser starten, wenn es nur wenige zensierende Parteien gibt: erstens, weil es bedeutet, dass es für Validatoren der Standard ist, Inklusionslisten zu erstellen, und zweitens, weil es weniger Marktinstabilität zwischen Buildern gibt, die zensieren, und solchen, die es nicht tun. Und schließlich könnte FOCIL potenziell bei der Skalierung helfen, was vielleicht ein Thema ist, in das wir tiefer eintauchen können.

Vielen Dank für die Zeit, diese kleine Präsentation halten zu dürfen. Ich wollte nur den QR-Code zeigen, der zum EIP führt, für Leute, die interessiert sind.

**Pooja Ranjan:** Vielen Dank für diese kurze Präsentation und den Überblick über den Vorschlag.

### Q&A: Wie unterscheidet sich EIP-7805 von EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Ich möchte die Q&A-Runde mit der allerersten Frage beginnen, die sich auf den früheren Vorschlag bezieht, der auch in eurer Präsentation erwähnt wurde: Vorschlag 7547, Inclusion Lists, von Mike Neuder. Ich möchte den grundlegenden Unterschied zwischen diesem Vorschlag und dem FOCIL verstehen, das wir mit 7805 haben. Ihr habt in eurer Präsentation bereits teilweise IL Boost und Uncrowdability angesprochen. Möchtet ihr das vielleicht noch ein wenig genauer erklären?

**Julian Ma:** Vielleicht ist Thomas am besten geeignet, um zu beantworten, wie sich 7805 von 7547 unterscheidet, aber ich kann ein wenig dazu sagen. Zunächst einmal gilt FOCIL für denselben Slot, während 7547 für den nächsten Slot galt. Die Eigenschaft des gleichen Slots macht einige Dinge einfacher, da dies bedeutet, dass die Inclusion List nicht Onchain gespeichert werden muss.

Was die Eigenschaft der Uncrowdability betrifft, so ist dies eine sehr interessante und subtile Eigenschaft. In 7547, was ein großartiger Vorschlag war, auf dem unser Vorschlag aufbaut, wird die Inclusion List bedingungslos an das Ende des Blocks angehängt und von einer einzigen Person erstellt. Dies hat einige andere Eigenschaften als bei uns. Erstens sind Transaktionen geordnet. Es könnte sein, dass es in Zukunft sehr wertvoll ist, Bottom-of-Block-Arbitrage zu haben, und tatsächlich hat ein Teil von Thomas' Forschung hervorgehoben, dass dies potenziell ein wertvoller Platz sein könnte. Das Recht zu haben, die Inclusion List zu erstellen, bedeutet, dass man die letzte Person ist, die im Block agiert, und in einigen Fällen könnte dies wertvoll sein. Zweitens wird sie von einer einzigen Person erstellt, sodass es diesen konkurrierenden Effekt unter den Mitgliedern des Inclusion-List-Komitees nicht gibt. Ein Komitee aus einer einzigen Person hat das volle Recht, Transaktionen am Ende des Blocks einzufügen, was es ebenfalls wertvoller machen könnte. Drittens gibt es diese bedingungslose Eigenschaft, was bedeutet, dass Ihre Transaktion unabhängig davon, was der Block-Produzent tut, ohnehin Onchain aufgenommen wird. Es bietet also einige zusätzliche Garantien, die über das für die Aufnahme notwendige Minimum hinausgehen und die es bis zu einem gewissen Grad wertvoll machen könnten.

**Thomas Thiery:** Ein großer Unterschied ist auch die Anzahl der Inclusion-List-Proposer, die wir haben. Im vorherigen Vorschlag gab es einen Mechanismus, bei dem der Proposer von Slot n die Inclusion List erstellt, die der Proposer von Slot n+1 durchsetzen muss. Die zwei wichtigsten Punkte hierbei sind: Erstens gibt es eine Verzögerung von einem Slot, sodass die Transaktionen in der Inclusion List erst im nächsten Slot vom nächsten Proposer aufgenommen werden müssen. Und es gibt nur einen Proposer, der die Inclusion List tatsächlich erstellt. Bei FOCIL haben wir 16. Das macht einen riesigen Unterschied, denn jetzt brauchen wir nur noch ein ehrliches Mitglied aus dem 16-köpfigen IL-Komitee, damit der gesamte Mechanismus wie vorgesehen funktioniert. Es vervielfacht die Chancen, tatsächlich einen guten, zensurresistenten Mechanismus zu haben, während man sich vorher auf eine einzige Partei verlassen musste.

Und dann noch einige technische Details: Es gab einige Inkompatibilitäten mit der Kontoabstraktion, und es war schwierig, mit IL-Äquivokation umzugehen, was bedeutet, dass jemand zwei verschiedene Inclusion Lists sendet. Block-Äquivokation ist ein bekanntes Phänomen und wird vom Protokoll bestraft, aber da im vorherigen Vorschlag alles Onchain ging, musste man sich auch mit seltsamen Randfällen auseinandersetzen, und es war nicht sehr einfach, diese zu berücksichtigen. Mit FOCIL gehen die Inclusion Lists nicht Onchain. Sie werden einfach über das P2P-Netzwerk der Konsensschicht übertragen. Es ist ein bisschen technisch, aber es macht einen großen Unterschied bei der Bewältigung dieser Randfälle, die durch Kontoabstraktion verursacht werden, oder bei Angriffen, bei denen man das Netzwerk durch IL-Äquivokation in zwei Ansichten spaltet.

**Pooja Ranjan:** Vielen Dank. Für Leute, die mehr über den Vorschlag 7547 erfahren möchten, haben wir eine aufgezeichnete Episode mit Mike Neuder, Episode 130 von PEEPanEIP, die einen allgemeinen Überblick bietet. Ich liebe es immer, konkurrierende Vorschläge zu sehen, weil ich weiß, dass dies zur Verbesserung des Ökosystems und der Chain dient. Ich sehe im Chat, dass es ein paar Fragen gibt. Vielleicht möchte ich Kataya einladen, ihre Frage zu teilen.

### Muss der Proposer alle 16 Listen einbeziehen? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Hallo, danke. Meine Frage war: Erhält der Block-Proposer 16 Inklusionslisten, jeweils eine von einem Komitee-Mitglied, und muss er alle Transaktionen aus diesen Listen aufnehmen?

**Thomas Thiery:** Ja, das ist richtig. Man bildet die Vereinigungsmenge aller Transaktionen aus allen Listen, in unserem Fall 16 Listen. Es kann natürlich Überschneidungen geben, also bildet man die Vereinigungsmenge und dedupliziert sie, aber ja, alle Transaktionen in allen Listen müssen in den Block aufgenommen werden, damit er von den Attestern als gültig angesehen wird.

**Pooja Ranjan:** Die nächste Frage im Chat ist von Justin. Justin, möchtest du deine Frage für die Gäste vorlesen?

### Private Mempool-Transaktionen in Inklusionslisten (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Ich habe schon so viele Fragen gestellt. Ich wollte fragen, was einen daran hindert, eine Transaktion aus einem privaten Mempool in eine Inklusionsliste aufzunehmen, und ich denke, das wurde bereits gut beantwortet. Es klingt so, als wäre das völlig in Ordnung, wenn man bedenkt, dass der Builder sie im Grunde sowieso so anordnet, wie er es für richtig hält, und die eigene Transaktion öffentlich wird, sobald sie auf der IL landet. Ich denke also, das ergibt Sinn. Danke.

**Thomas Thiery:** Das war eine Überlegung, wie Julian bereits erwähnt hat. Wir wollten wirklich nicht, dass FOCIL und Inklusionslisten für die Aufnahme von MEV-Transaktionen, privatem Orderflow oder Preconfirmations genutzt werden, denn letztendlich wollen wir Zensurresistenz, und es passiert sehr leicht, dass ein Mechanismus zu einem Vehikel für die Aufnahme wertvoller Transaktionen wird, wenn man nicht aufpasst. Die Tatsache, dass eine Transaktion, wenn man sie in eine Inklusionsliste aufnimmt, automatisch öffentlich wird, jeder sie sehen kann, sie keine Reihenfolgegarantien hat und vom Builder überall im Block eingefügt werden kann, macht sie für wertvolle Transaktionen nicht sehr gut geeignet.

Entweder hat man also eine öffentliche Transaktion und sendet sie vielleicht einfach an den öffentlichen Mempool, damit sie in eine Inklusionsliste aufgenommen wird, oder man hat wertvolle private Transaktionen, und dann würde man nicht über FOCIL gehen, weil es dafür bessere Wege gibt. Man würde den Builder direkt kontaktieren und sie über private Kanäle senden.

**Pooja Ranjan:** Danke fürs Teilen. Ich sehe, die nächste Frage ist von Ladislaus.

### FOCIL und Skalierung (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Hallo Leute. Dies bezieht sich auf den Punkt, den ihr in Bezug auf FOCIL und Skalierung angesprochen habt. Ich habe in letzter Zeit, wie wir alle, einige Diskussionen über die Skalierung von Ethereum gesehen, und wie ihr richtig erwähnt habt, gibt es diesen Engpass von nur wenigen Block-Buildern da draußen. Ich persönlich betrachte FOCIL gerne als eine Stärkung des lokalen Block-Buildings und sehe es als Notwendigkeit an, dass es im Protokoll verankert wird, bevor wir die Bandbreitenanforderungen oder die Anforderungen an Knoten im Allgemeinen erhöhen. Vielleicht könnt ihr näher erläutern, wie ihr darüber denkt, und auch mögliche andere Wege zur Skalierung aufzeigen, vielleicht ohne FOCIL, wie ihr erwähnt habt.

**Julian Ma:** Danke für die Frage. Zunächst einmal zu den Argumenten für die Skalierung über FOCIL. Derzeit lagern 90 % der Validatoren die Block-Erstellung über MEV-Boost aus, und diese hochentwickelten Entitäten verfügen offensichtlich über mehr Bandbreite als die minimalen Hardwareanforderungen. Sie könnten zum Beispiel mehr Blobs in ihre Blöcke aufnehmen, ohne dass dies zu Problemen führt. Interessant ist jedoch, dass Ethereum für glaubwürdige Neutralität oder Zensurresistenz auf lokales Block-Building angewiesen ist, da diese beiden hochentwickelten Entitäten nicht diejenigen sind, auf denen die Zensurresistenz von Ethereum aufgebaut werden kann.

Das Ethereum-Protokoll muss also weiterhin so gestaltet sein, dass lokales Block-Building möglich ist, und tatsächlich gestalten wir es so, dass es im Vergleich zu MEV-Boost nicht unrentabel ist. Dies ist im Design von Ethereum vorgesehen, aber in der Praxis ist MEV-Boost natürlich weitaus profitabler: erstens, weil diese hochentwickelten Block-Builder über komplexere Algorithmen verfügen, und zweitens, weil sie viel mehr privaten Orderflow haben. Kürzlich gab es eine Untersuchung von Data Always, die zeigte, dass MEV-Boost-Blöcke weitaus mehr Transaktionen enthalten. Das allein führt schon zu mehr Profit.

Dennoch ist das Protokoll so konzipiert, dass es innerhalb der Protokollregeln keine Kräfte gibt, die einen Validator weniger profitabel machen als einen anderen. Wenn wir diese Regel beibehalten wollen, dann ist FOCIL notwendig, denn dann können lokale Block-Builder zu Inklusionslisten beitragen und so die Zensurresistenz aufrechterhalten. Wir könnten diese Regel jedoch auch abschaffen und im Grunde sagen, dass lokale Block-Builder eine bestimmte Anzahl von Blobs aufnehmen können, aber hochentwickeltere Block-Builder mehr Blobs aufnehmen könnten, und zwar in einem Ausmaß, dass lokale Block-Builder diese Last bei der eigenen Erstellung eines Blocks nicht bewältigen könnten. Wenn wir also die Regel beibehalten wollen, dass das Maximum auf die niedrigsten Hardwareanforderungen festgelegt ist, dann brauchen wir FOCIL. Wenn wir damit einverstanden sind, diese Regel zu lockern, dann brauchen wir FOCIL möglicherweise nicht für die Skalierung.

**Thomas Thiery:** Es ist sehr ähnlich, denke ich, aber im Moment befinden wir uns bei Ethereum in einer seltsamen Position, weil wir uns auf hochentwickelte Block-Builder verlassen, um die meisten Blöcke zu erstellen, aber diese sind nicht großartig für die Zensurresistenz, weil es nur zwei Parteien sind. Wenn sie beschließen, Transaktionen oder einige Adressen aus irgendeinem willkürlichen Grund zu zensieren, dann haben wir im Grunde keine Zensurresistenz oder Erlaubnisfreiheit, was ebenfalls sehr wichtig ist. Das bedeutet, dass sie beliebige Akteure zensieren oder davon abhalten können, Onchain teilzunehmen, was sehr schlecht ist.

Und die Eigenschaften der Zensurresistenz, die wir beibehalten, sind nicht berauschend, oder? Da die meisten Blöcke von diesen beiden Block-Buildern erstellt werden, muss man im Grunde warten, bis ein lokaler Block-Builder ausgewählt wird und einen Block vorschlägt, der all diese Transaktionen enthält, die normalerweise zensiert werden, was sich nicht gut anfühlt. Das bedeutet, dass diese Nutzer 10, 12, ich weiß nicht, viele Blöcke warten müssen, bis ihre Transaktionen tatsächlich Onchain aufgenommen werden.

Wir wollen also unbedingt Home-Staker und lokale Block-Builder behalten, denn sie sind diejenigen, die die Zensurresistenz bewahren. Gleichzeitig ist es heute selbst mit ihnen nicht optimal, da man immer noch lange warten muss, bis die eigene Transaktion aufgenommen wird, wenn sie von den beiden Block-Buildern zensiert wird. Mit FOCIL bewegen wir uns in eine Welt, in der die Teilnehmer, die die Zensurresistenz garantieren – in unserem Fall die Mitglieder des Inklusionslisten-Komitees –, andere sein können als die Personen, die die Blöcke erstellen. Ich denke, das eröffnet eine sehr interessante Landschaft, denn jetzt müssen wir uns nicht mehr auf genau denselben Teilnehmer verlassen, um sowohl wertvolle Blöcke zu erstellen als auch zur Zensurresistenz beizutragen. FOCIL kann auch als ein erster Schritt in diese wichtige Richtung betrachtet werden, da man zwei sehr unterschiedliche Aufgaben hat und wir heute genau dieselben Validator-Knoten bitten, beides zu tun, was sehr stark im Spannungsfeld steht.

**Pooja Ranjan:** Vielen Dank. Ich glaube, die nächste Frage ist von Luis.

### Kriterien für die Auswahl von Transaktionen (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Ich bin ein paar Minuten nach Beginn dazugekommen, aber für mich sieht es so aus, als würde dies die Transaktionsauswahl im gesamten Netzwerk dezentralisieren. Das ist meiner Meinung nach sehr gut; es bekämpft MEV und Zensur. Und mir gefällt definitiv der Teil, dass die Attester diese Aufgabe übernehmen, denn in Zukunft werden sie geringere Hardwareanforderungen haben als die Builder, umso mehr mit Zustandslosigkeit und zustandslosen Clients. Da man dies mit sehr geringer Hardware ausführen kann, macht es die Dinge sehr dezentral. Ich schätze, die größte Herausforderung hierbei ist es, die Kriterien für die Transaktionsauswahl dieser Inclusion Lists zu definieren, ob man nach Prioritätsgebühren oder der Anzahl der Blobs geht; es gibt so viele Variablen. Habt ihr euch auf eine Reihe von Kriterien geeinigt, die ihr durchsetzen wollt?

**Thomas Thiery:** Das ist eine großartige Frage. Es ist zweigeteilt. Der erste Punkt ist sehr wichtig: Es geht darum zu versuchen, Attester von den Leuten zu trennen, die den Block erstellen oder vorschlagen. Das ist der gesamte Forschungsbereich der Attester-Proposer-Trennung (APS); Julian hat ziemlich viel daran gearbeitet. Wir nennen es die Entbündelung von Rollen, damit sie besser zu den Aufgaben des Protokolls passen. Ich habe einen Beitrag geschrieben, den ich gerade geteilt habe, über eine mögliche Trennung, die noch sehr offen ist, und ich würde mich über mehr Feedback von anderen freuen. In diesem Beitrag unterscheide ich zwischen Attestern, Includern, was jetzt die Mitglieder des IL-Komitees sind, und Execution-Proposern oder Buildern. Ich denke, das sind grundlegend verschiedene Aufgaben, und vielleicht sollten wir dafür unterschiedliche Rollen haben.

Was dann die Inklusionsregel betrifft, das ist eine sehr gute Frage. Wir haben ziemlich viel darüber nachgedacht und ich glaube, wir sind bei zwei Dingen gelandet. Das erste ist, dass wir eine Vielfalt an Regeln wollen. Wir wollen nicht eine einzige Regel, zum Beispiel die Sortierung nach absteigenden Prioritätsgebühren für alle Clients, denn dann kann man tatsächlich Spielchen treiben und versuchen, den Mempool so umzusortieren, dass nur die eigenen Transaktionen in die ILs aufgenommen werden. Aber wenn man eine Vielfalt an Regeln hat, einschließlich einer Regel, die auch die Zeit berücksichtigt, die eine Transaktion im Mempool ausstehend war, und verschiedene Clients unterschiedliche Regeln implementieren, die alle in die gleiche Richtung gehen – meistens rund um Prioritätsgebühren und die Wartezeit im Mempool –, dann ist es sehr, sehr schwer zu manipulieren, und es macht das Protokoll noch robuster. Es ist meiner Meinung nach auch ein guter Weg, um die Client-Vielfalt, die wir heute auf Ethereum haben, zu nutzen und den Clients zu ermöglichen, meinungsstarke Entscheidungen zu treffen. Wir haben Regeln im Kopf, aber wir denken, dass Clients auch die für sie besten Regeln wählen können. Solange nicht jeder exakt dieselbe Regel hat, die nach Prioritätsgebühren sortiert, wird alles gut sein.

**Luis Pinto:** Okay, ihr verteilt also auch diese Kriterien und lasst diejenigen, die Inclusion Lists erstellen, ihre eigenen Kriterien haben. Oder wird das Teil des Protokolls sein?

**Julian Ma:** Die Inklusionsregel wird nicht Teil des Protokolls sein. Erstens ist sie sehr schwer durchzusetzen, und zweitens ist es eigentlich besser, gar nichts durchzusetzen. Wenn wir den Komitee-Mitgliedern erlauben, selbst zu entscheiden, oder die Client-Teams in ihrem Namen handeln lassen, wie sie Transaktionen aufnehmen, dann schaffen wir eine gewisse Robustheit im Netzwerk. Leute mit unterschiedlichen Präferenzen werden auf unterschiedliche Weise inkludieren, was bedeutet, dass es schwerer ist, das System anzugreifen.

**Luis Pinto:** Okay, danke.

### Kompatibilität mit EIP-7702, ePBS und PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Vielen Dank. Soweit ich weiß, ist dieser Vorschlag bereits für das Upgrade nach Pectra, Fusaka, vorgeschlagen worden. Und da Fusaka möglicherweise einige andere EIPs, die in Arbeit sind, beinhalten wird oder auch nicht, frage ich mich, wie es um die Kompatibilität von FOCIL in Bezug auf Vorschläge wie 7702, der für die Kontoabstraktion gedacht ist, ePBS und PeerDAS steht.

**Thomas Thiery:** Tolle Frage. Wir hatten hier aufgrund der Vorgeschichte der Inclusion Lists einen kleinen Vorteil. Wie bereits erwähnt, wurde 7547 für die Aufnahme in Betracht gezogen und dann wegen Inkompatibilitäten abgelehnt. Daher waren wir sehr darauf bedacht, diese zu lösen, bevor wir einen neuen Vorschlag machten, denn wir wussten, dass die Leute ihn mit denselben Fragen betrachten würden, was auch Sinn ergibt.

Wir sind sehr zuversichtlich, da wir auch mit den Teams für Kontoabstraktion gesprochen haben und uns viel mit Potuz und Terence ausgetauscht haben. Terence hat uns aktiv geholfen und sowohl an ePBS als auch an FOCIL gearbeitet, sodass es für uns sehr einfach war, zu überprüfen, ob das ebenfalls kompatibel ist. Ich glaube wirklich nicht, dass es Inkompatibilitäten mit einem der anderen EIPs gibt. Bei ePBS muss man mit dem Timing der Dinge vorsichtig sein, da man die Ausführungs-Payload vom Konsens-Block trennt. Dadurch ändert sich das gesamte Slot-Timing, und nun kommt auch noch die Erstellung von ILs hinzu, die erfolgen muss, bevor die Payload vorgeschlagen wird. Man muss also beim Timing aufpassen, aber wenn ich mich richtig erinnere, gab es bei unserem letzten Gespräch darüber mit Potuz und Terence überhaupt keine kritische Inkompatibilität. Ich denke, wir stehen in Sachen Kompatibilität gut da.

**Pooja Ranjan:** Das ist gut zu wissen. Mir ist aufgefallen, dass Jihoon auch ein HackMD geteilt hat, das wir den Ressourcen hinzufügen werden, für Leute, die mehr über die Kompatibilität speziell mit ePBS erfahren möchten. Und ja, ich erinnere mich an das letzte Gespräch mit Mike, ich glaube, der Vorschlag wurde wegen der Inkompatibilität mit der Kontoabstraktion nicht aufgenommen. Es ist also gut zu wissen, dass dies bereits erledigt wurde.

### FOCIL und Multi-Slot-MEV (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Ich bin die Dokumente und die Details durchgegangen, die der FOCIL-Website meetfocil.eth.limo hinzugefügt wurden, und habe von einem Begriff namens Multi-Slot-MEV erfahren. Julian erwähnte auch, dass MEV-Boost im Allgemeinen profitabel ist, trotz des Wunsches und der Bemühungen der Entwickler, es auf einem ausgeglichenen Niveau zu halten. Ich frage mich, wie FOCIL dies verhindern wird.

**Julian Ma:** Danke für deine Frage. Lass mich zuerst etwas zu FOCIL und MEV sagen, und dann können wir zum Multi-Slot-MEV übergehen. FOCIL verhindert MEV nicht zwangsläufig, und das liegt genau daran, dass wir die MEV-Teile und die Inklusions-Teile entbündeln wollen. Aus unserer Sicht ist es wichtig, dies zu tun, da sonst diese Art von IL-Boost-Märkten aus dem Boden schießen. Wenn die Inklusionsliste die Menge an extrahierbarem MEV einschränken könnte, würde die Erstellung der Inklusionsliste nach dieser Logik sehr wertvoll werden, und die Leute würden Märkte darum herum aufbauen. Unser Design ist wirklich dazu da, die minimale Inklusionsgarantie zu bieten, was bedeutet, dass es nicht so wertvoll ist, ein Mitglied im Inklusionslisten-Komitee zu sein. Es gibt 16 davon, was bedeutet, dass es keinen Markt von hochspezialisierten Produzenten gibt.

Um dann auf Multi-Slot-MEV einzugehen: FOCIL lindert einige der Probleme, aber es löst sie nicht vollständig. Das liegt wiederum an dieser Unvereinbarkeit zwischen der Bereitstellung von Zensurresistenz und einer Lösung für MEV. Was FOCIL tut, ist, dass es zulässt, dass jede Transaktion aufgenommen wird, solange sie die Gebühren zahlt, was Multi-Slot-MEV bis zu einem gewissen Grad löst. Multi-Slot-MEV bedeutet hier, dass eine Partei in der Lage ist, mehr MEV zu extrahieren, wenn sie zwei Blöcke hintereinander kontrolliert.

FOCIL lindert einige der Probleme, weil es dir ermöglicht, deine Transaktion einzufügen. Wenn du zum Beispiel eine Transaktion einfügen musst, die irgendwo faule Kredite einer Position liquidiert, kannst du dies tun, selbst wenn der Proposer versucht, dich zu zensieren und im nächsten Block MEV von dir extrahieren würde.

Warum es nicht alle Probleme löst, liegt an der adversen Selektion, einer ökonomischen Eigenschaft, bei der eine Person mehr Informationen hat als die andere. Ein Beispiel für Multi-Slot-MEV wäre die Extraktion von Arbitrage über zwei Blöcke hinweg, wobei der Block-Builder im ersten Block keine Arbitrage extrahiert und dies im zweiten Block tut. Es gibt einige theoretische Ergebnisse, die zeigen, dass dies für den Block-Builder profitabler sein kann, als Arbitrage in beiden Slots zu extrahieren. Man könnte denken, dass FOCIL hier hilft, weil Arbitrageure im Prinzip ihre Transaktion in die Inklusionsliste aufnehmen und dadurch eine Art Arbitrage erzwingen könnten. Obwohl dies der Fall ist, ist es für Arbitrageure nicht anreizkompatibel, ihre Transaktion bei FOCIL einzureichen, da immer noch 3 Sekunden zwischen dem Einreichen ihrer Transaktion und der Möglichkeit des Block-Builders zu handeln vergehen. Wenn du versuchst, Arbitrage zu betreiben, und sich der Preis auf einem externen Markt ständig bewegt, möchtest du dich nicht 3 Sekunden im Voraus festlegen, weil du viel weniger Informationen hast als der Block-Builder, der später als du handelt. Die adverse Selektion kommt ins Spiel, weil der Builder mehr Informationen hat: Er lässt dich gewinnen, wenn es schlecht für dich ist, falls sich der Preis auf dem externen Markt in diesen drei zusätzlichen Sekunden gegen dich entwickelt hat, und er lässt sich selbst gewinnen, wenn es für ihn besser ist zu gewinnen.

FOCIL löst also die Teile von Multi-Slot-MEV, bei denen Transaktionen nicht unter adverser Selektion leiden. Für Transaktionen, bei denen es eine adverse Selektion gibt, ist es etwas komplizierter, aber es lindert das Problem bis zu einem gewissen Grad. Im Prinzip macht es die Dinge besser, als sie jetzt sind, aber es gibt noch ein wenig Arbeit zu tun.

**Pooja Ranjan:** Sehr gut, vielen Dank fürs Teilen. Ich verstehe, dass es viele laufende Forschungen gibt, um die MEV-Thematik anzugehen, daher ist es gut zu wissen, dass es zumindest im Prinzip mehr helfen wird als im aktuellen Szenario.

### Kompromisse und Herausforderungen (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Ich habe eine Frage zu dem, was Thomas vorhin über IL-Äquivokation erwähnt hat. Mir ist aufgefallen, dass im Abschnitt zu den Sicherheitsüberlegungen des Vorschlags einige Punkte erwähnt werden, wie Konsens-Liveness, IL-Äquivokation und die Erstellung der Payload. Was würdest du als den größten Kompromiss ansehen, oder als etwas, das möglicherweise mehr Forschung erfordert und verhindern könnte, dass dieser Vorschlag in seiner jetzigen Form in das nächste Upgrade aufgenommen wird?

**Thomas Thiery:** Um ehrlich zu sein, denke ich, dass der Abschnitt über Sicherheitsüberlegungen hauptsächlich dazu diente, zu zeigen, dass wir uns Gedanken über die Sicherheit gemacht und entsprechende Bedenken ausgeräumt haben. Es geht vielmehr darum, als dass es noch offene Fragen zu Sicherheitsaspekten gäbe, über die wir nichts wissen. Ich glaube nicht, dass es in Bezug auf die Sicherheitsüberlegungen große Blocker oder Probleme gibt.

Zu den Kompromissen: Wenn man es sehr eng betrachtet, stimmt es, dass FOCIL den Validatoren einige Aufgaben hinzufügt, sowohl wenn sie eine Inclusion List vorschlagen müssen, als auch für Attester, wenn sie eine weitere Bedingung überprüfen müssen, um sicherzustellen, dass der Block gemäß den Inclusion Lists gültig ist. Es fügt auch eine kleine Aufgabe für den Proposer hinzu, da dieser nun sicherstellen muss, dass seine Payload tatsächlich die Transaktionen aus den ILs enthält. Für mich ist das der einzige Kompromiss, und diese Aufgaben sind weder schwerwiegend noch komplex. Ein Mitglied des IL-Komitees überwacht lediglich den öffentlichen Mempool und nimmt Transaktionen in eine Liste auf, die es dann sendet. Das erfordert keinerlei besondere Fähigkeiten oder Raffinesse, was ich gut finde. Andererseits könnte es, wie bereits erwähnt, einige große Skalierungsverbesserungen und eine bessere Trennung zwischen Teilnehmern und Aufgaben innerhalb des Protokolls ermöglichen.

Ich bin vielleicht voreingenommen, aber ich sehe keine großen Kompromisse. Ich denke jedoch, dass es in Bezug auf die Zensurresistenz gewissermaßen alles auf den Kopf stellt. Jetzt müssen im Grunde nur noch 15 % des Netzwerks ehrlich sein, damit alle Transaktionen – einschließlich derer, die möglicherweise von Block-Buildern zensiert werden – in den nächsten Block aufgenommen werden, was eine sehr große Verbesserung darstellt. Ich glaube ehrlich gesagt nicht, dass man da viele Kompromisse eingeht.

**Pooja Ranjan:** Das ist gut zu wissen. In den meisten Vorschlägen stellen wir fest, dass der Abschnitt zu den Sicherheitsüberlegungen entweder keine oder nur sehr wenige Informationen enthält. Daher ist es gut zu wissen, dass in diesem Bereich geforscht wurde und wir uns der möglichen Sicherheitsüberlegungen bewusst sind. Ich bin froh zu wissen, dass dies kein Blocker oder eine potenzielle Herausforderung für die zukünftige Implementierung und Adoption darstellt.

### Transaktionsgebühren-Mechanismen für Inclusion Lists (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Ich habe eine Frage zu einigen offenen Fragen, die ich auf der Website selbst gefunden habe, bezüglich des Transaktionsgebühren-Mechanismus. Ich frage mich, ob es ein Update gibt oder ob ihr mehr über den besten Weg teilen möchtet, Gebühren zu erheben und diese Gebühren für die Aufnahme in die Inclusion List zu verteilen.

**Thomas Thiery:** Wir haben einen laufenden Grant, der sich speziell damit und mit Anreizmechanismen befasst, um Mitglieder des IL-Komitees zu belohnen. Es ist nicht einfach. Es ist knifflig, und egal wie man es angeht, das sind auch sehr große Änderungen. Gebühren auf Ethereum zu ändern, ob man eine Gebühr ändert, eine hinzufügt oder eine neue Emission hinzufügt, all das sind große Änderungen, die viel Überlegung und Sorgfalt erfordern. Aber es wird untersucht, und Ideen rund um die Verteilung von Gebühren auf beispielsweise Komitee-Mitglieder, die eine Transaktion aufnehmen, scheinen gute Ideen zu sein. Es hat in etwa die Eigenschaften, die wir wollen, denn wir möchten Leute dafür belohnen, dass sie Transaktionen aufnehmen, die andere vielleicht nicht aufnehmen wollen. Wir denken also sehr intensiv darüber nach und haben einen laufenden Grant.

Es stellt sich auch die Frage, ob wir IL-Komitee-Mitgliedern überhaupt jemals Gebühren geben wollen, da es bekanntermaßen sehr schwer ist, kleinere Teilnehmer zu belohnen, die über die ganze Welt verteilt sind. Man möchte keine Sybil-Angriffe, und man möchte nicht, dass große Teilnehmer mit viel Stake die Gruppe des IL-Komitees verdrängen. Wie verhindert man das? Das ist sehr schwer. Man muss also viele Designüberlegungen berücksichtigen.

Eine meiner jüngsten Überlegungen ist: Was wäre, wenn wir FOCIL einige coole Funktionen hinzufügen, wie Privatsphäre, sodass man nicht wirklich wissen kann, wer eine bestimmte Liste von Transaktionen vorgeschlagen hat? Man weiß, dass es jemand war, der tatsächlich als IL-Komitee-Mitglied ausgewählt wurde, aber man weiß nicht genau, wer welche Liste vorgeschlagen hat, sodass man IL-Komitee-Mitglieder nicht mit der Menge der Transaktionen in ihren ILs verknüpfen kann. Wenn wir das haben können und die Rolle im IL-Komitee eine Art Opt-in ist, dann hätten wir wahrscheinlich ehrliche Teilnehmer im Protokoll, die sich auf altruistisches Verhalten stützen, und vielleicht müssten wir gar keinen Gebührenmechanismus einrichten. Das ist eine sehr aktuelle, meinungsstarke Ansicht, und sie wird derzeit intensiv untersucht. All dies sind Diskussionen über die „Zukunft von FOCIL“; sie sollen nicht in den aktuellen EIP aufgenommen werden.

**Julian Ma:** Um das noch zu ergänzen, dieser letzte Teil ist ebenfalls sehr wichtig: EIP-7805 enthält keinen Transaktionsgebühren-Mechanismus, um die Implementierung einfacher zu machen. Es ist im Grunde der kleinstmögliche Weg, wie wir die Eigenschaften der Zensurresistenz bereitstellen können, aber es ist sehr erweiterbar. Wir prüfen das. Thomas hat ziemlich viel Arbeit investiert, um separate Transaktionsgebühren für Includer und für Proposer zu untersuchen. Dann haben wir, wie Thomas erwähnt hat, einen laufenden Grant mit einem großartigen Forscher bei Nethermind, der die Schaffung eines Transaktionsgebühren-Mechanismus für FOCIL untersucht, und das ist sehr vielversprechend. Und schließlich gab es Arbeiten an einem Transaktionsgebühren-Mechanismus für eine Variante von FOCIL namens AUCIL, ein auktionsbasiertes Inclusion-List-Design, das von Sarisht Wadhwa, Fan Zhang und Kartik Nayak zusammen mit mehreren der FOCIL-Autoren vorgeschlagen wurde und nach Wegen sucht, Anreize für Mitglieder des Inclusion-List-Komitees zu schaffen.

Um auf Luis' früheren Punkt zurückzukommen: Bei der Schaffung von Anreizen geht es sehr stark darum, wie Inclusion Lists erstellt werden. Das bedeutet, das Protokoll möchte eine bestimmte Vorstellung davon vermitteln, wie sich Mitglieder des Inclusion-List-Komitees verhalten sollten. Normalerweise läuft dies darauf hinaus, dass es möchte, dass bestimmte Teilnehmer unterschiedliche Dinge tun. Zum Beispiel könnte es Komitee-Mitglieder ordnen und ihnen über ein korreliertes Gleichgewicht bestimmte Transaktionen zuweisen, um dennoch ein unterschiedliches Verhalten zwischen den Komitee-Mitgliedern zu haben. Es ist also nicht Teil des aktuellen Vorschlags, aber wir prüfen es definitiv, und es passt zur Erweiterbarkeit von FOCIL.

**Pooja Ranjan:** Oh, das ist interessant. Wir sollten uns also auf einige ergänzende Vorschläge in der Zukunft freuen, um die aktuellen FOCIL-Funktionen zu verbessern.

### Größe der Inclusion List (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Ich habe noch eine Frage. Ich bin mir nicht sicher, ob das Teil des aktuellen Vorschlags sein sollte, aber ich bin neugierig, ob es Neuigkeiten zur IL-Größe gibt. Inclusion Lists müssen wahrscheinlich in ihrer Größe begrenzt sein, um eine übermäßige Nutzung der Bandbreite zu verhindern. Gibt es weitere Forschungen oder Updates dazu, wie die optimale Größe der Inclusion List bestimmt werden kann?

**Thomas Thiery:** Wir haben jetzt eine feste Größe in der Spezifikation, und das schon seit einer Weile: 8 Kilobyte. Wir haben es in Kilobyte angegeben, weil das, was FOCIL und ILs wirklich verbrauchen, Bandbreite ist, und das ist so ziemlich alles. Wenn man die mittlere Transaktionsgröße nimmt, kommen wir auf etwa 40 Transaktionen pro IL, und wenn alle Transaktionen einzigartig sind, sind das etwa 640 Transaktionen, die über alle 16 Komitee-Mitglieder hinweg kombiniert werden könnten.

Ich weiß nicht, ob noch viel Forschung zur exakten optimalen Größe nötig ist. Wofür wir uns entschieden haben: 16 mal 8 Kilobyte entspricht im Grunde der Größe eines Blobs, es ist also insgesamt keine enorme Menge an Bandbreite. Und da die Kombination von Transaktionen über ILs hinweg größer ist als ein Block, glaube ich nicht, dass wir da auf Probleme stoßen.

Für die Zukunft könnte man die IL-Größe erhöhen, aber man könnte auch in Betracht ziehen, die Anzahl der IL-Komitee-Mitglieder zu erhöhen. Das bietet noch mehr Chancen, ein ehrliches IL-Komitee-Mitglied zu bekommen, falls der Großteil des Netzwerks beschließt, mit dem Zensieren zu beginnen. Das ist also auch etwas, das wir tun könnten. Für den Moment scheinen 16 völlig in Ordnung und ausreichend zu sein, aber man kann in Zukunft definitiv mit diesen Parametern spielen, falls die Zensur sehr extrem wird oder wir weitere Maßnahmen ergreifen müssen.

### Metriken zur Verfolgung der Adoption (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Nur eine kurze Nachfrage hierzu: Habt ihr bestimmte Metriken im Kopf, die wir verfolgen können, um die Adoption oder den Erfolg dieses Vorschlags zu verstehen?

**Julian Ma:** Das ist eine großartige Frage. Lass mich kurz antworten und dann das Wort an Thomas übergeben. Einige einfache Metriken sind einfach, wie viele Inclusion-Lists vorgeschlagen werden, die nicht leer sind. Und man könnte an Dashboards denken, wie die „.pics“-Serie von Toni Wahrstätter, wo es vielleicht mehr Details gibt und diesen Inclusion-Lists ein Qualitätsmaß zugewiesen wird. Im Prinzip muss jedoch nur eine Person pro Slot eine ordnungsgemäße Inclusion-List erstellen, um Zensurresistenz zu bieten.

Ich denke, es ist ein so wichtiger Punkt, dass es wichtig ist, FOCIL bald zu implementieren, denn jetzt befinden wir uns in diesem magischen Zustand, in dem Block-Builder nicht zu viel zensieren und Validatoren nicht zu viel zensieren. Ich würde sagen, das ist sehr fragil. Bis jetzt haben Block-Builder lange Zeit zensiert, und wenn wir FOCIL jetzt einführen, haben wir die Möglichkeit, es zum Standard zu machen, dass all diese Validatoren es übernehmen und sinnvolle Inclusion-Lists erstellen. Da Block-Builder nicht zensieren, entsteht hier keine Marktinstabilität. Wenn wir warten, bis es Zensur unter den Buildern gibt, dann ist es viel schwieriger, FOCIL einzuführen, und ich könnte mir vorstellen, dass all die Metriken, die zur Messung der Adoption verwendet würden, viel schlechter ausfallen würden.

**Thomas Thiery:** Eine weitere wichtige Metrik, die man sich ansehen sollte, ist buchstäblich die Inklusionsverzögerung für öffentliche Mempool-Transaktionen. Man nimmt alle Transaktionen, die im öffentlichen Mempool ausstehen, und schaut, wie schnell sie aufgenommen werden. Wenn FOCIL funktioniert, werden sie alle in den nächsten Block aufgenommen. Wenn nicht, bedeutet das, dass ein großer Teil der Validatoren zensiert. Die andere Metrik, die wir uns also ansehen können, ist, wer zensiert und welcher Anteil des Netzwerks zensiert. Wir werden Dashboards und sehr transparente Metriken haben, um dies zu verfolgen, denn das ist im Grunde das, was FOCIL tun soll. Wenn öffentliche Transaktionen nicht in den nächsten Block aufgenommen werden, bedeutet das, dass ein sehr großer Teil des Netzwerks diese Transaktionen tatsächlich zensiert.

**Pooja Ranjan:** Sehr interessant. Das ist also vielleicht etwas für Forscher: eine mögliche Wunschliste für Upgrades, dass Dashboards und Metrik-Tracker von Entwicklern für einen Vorschlag geteilt werden sollten, wann immer er in ein Netzwerk-Upgrade aufgenommen wird.

### Status der Client-Implementierung (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Wie Julian erwähnt hat, muss dieser Vorschlag möglicherweise so schnell wie möglich implementiert werden. Ich bin neugierig zu erfahren, wo wir bei der Client-Implementierung stehen, denn ich erinnere mich, dass Paritosh im letzten Testnetz-Call erwähnt hat, dass etwas Unterstützung für Devnets hinzugefügt wird. Wo stehen wir da also?

**Thomas Thiery:** Wir kommen ziemlich gut voran. Zunächst einmal war es super schön zu sehen, wie die Leute den Implementierungsteil von FOCIL in Angriff genommen haben, denn ich bin kein Entwickler, ich bin Forscher. Ich habe von Anfang an mit Entwicklern zusammengearbeitet, aber ich bin nicht derjenige, der Dinge in Clients implementiert.

Diejenigen, die das angeführt haben, die drei: Wir haben Terence von Prysm und Jihoon, der Terence viel bei Prysm geholfen hat, aber auch an Geth gearbeitet hat. Jetzt haben wir also ein funktionierendes Devnet für Prysm und Geth, was großartig ist, und es laufen viele Tests. Wir versuchen jetzt auch, FOCIL auf dem Dora-Explorer anzuzeigen und sichtbar zu machen. Dann gibt es noch Jacob, der an Lighthouse und Reth gearbeitet hat, und ich weiß, dass dort noch einige Bemühungen im Gange sind. Lodestar war in letzter Zeit sehr aktiv; ich glaube, sie sind sehr nah dran, ein funktionierendes Devnet zu haben. Wir haben heute Neuigkeiten von Nethermind erhalten, dass sie einen Prototyp haben, was super schön ist. Ich habe das Gefühl, ich vergesse einige von ihnen... Nimbus schließt sich ebenfalls an, sagt Jihoon. Das ist wirklich schön.

Insgesamt bekommen wir immer mehr Devnets fertig und live, lokale Devnets und immer mehr Kombinationen zwischen Ausführungs- und Konsensschicht-Clients. Es gab einige wirklich gute Fortschritte, und das ist schön zu sehen, denn wir alle wissen, dass die Entwickler jetzt ziemlich beschäftigt sind, da Pectra ansteht und sie bereits an PeerDAS und anderen Dingen arbeiten. Es war wirklich großartig zu sehen, wie sehr sich die Leute bei Ethereum insgesamt um Zensurresistenz kümmern. Die meisten Teams, die ich nicht speziell kontaktiert hatte, haben sich einfach den Bemühungen angeschlossen und arbeiten nun auf Devnets und Tests hin.

**Pooja Ranjan:** Danke fürs Teilen. Ich freue mich darauf, die Updates zu den Devnets zu verfolgen. Ich bin mir nicht sicher, wie viele Iterationen dieses Devnets es geben wird, aber ich bin gespannt darauf, es entstehen zu sehen. Ich sehe, Justin hat hier eine Frage. Justin, bitte fahr fort.

### FOCIL in Fusaka oder Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Okay, schnall dich an für diese Frage. Du hast ein sehr gutes Argument vorgebracht, dass der beste Zeitpunkt, um Zensur anzugehen, der ist, bevor Zensur passiert, richtig? Also: FOCIL in Fusaka, oder kann es bis Glamsterdam warten? Und wofür sollte ich mich als Entwickler einsetzen?

**Thomas Thiery:** Wir haben den PR geöffnet und er wurde gemergt, wobei FOCIL für Fusaka vorgeschlagen wird. Wir denken, es sollte in Fusaka aufgenommen werden. Ein Teil der Begründung ist, dass einige Clients bereits mit der Arbeit daran begonnen haben und sie nicht auf allzu viele Hürden gestoßen sind. Es ist nicht wie bei anderen Vorschlägen, die viel schwerer zu implementieren sind und viel mehr Arbeit erfordern. Und es ist auch nicht sehr umstritten. Ich glaube nicht, dass sich jemand gegen Zensurresistenz ausspricht, und alle sind sich irgendwie einig, dass es so schnell wie möglich aufgenommen werden muss. Ich würde mich also für Fusaka entscheiden.

Ich weiß nicht, ob es warten kann oder nicht. Vorschläge und Upgrades können immer warten. Ich möchte nur eine Welt vermeiden, in der es nicht so einfach ist, diese Änderungen zu implementieren. Die Dinge können sich sehr schnell ändern. Wie wir gesehen haben, lief es auch schon andersherum: Vor ein paar Monaten hat einer der Haupt-Block-Builder völlig aus heiterem Himmel aufgehört zu zensieren. Wir haben gefragt warum, und die Antwort war in etwa: „Ja, wir haben uns einfach dagegen entschieden.“ In diesem Fall war es gut, weil es auf der guten Seite war, aber es kann komplett wieder umschlagen, und dann könnten wir zwei Block-Builder haben, die einige Transaktionen zensieren, und wir wären wieder in einer sehr schlechten Lage.

Die andere Sache, die ich erwähnen möchte, weil ich sie wirklich für wichtig halte: Wenn wir in Richtung einiger der Dinge gehen, über die wir gesprochen haben, wie APS, wo man Attester und Proposer mit einigen der Designs, an denen wir gearbeitet haben, tatsächlich trennen kann, müssen wir FOCIL vorher drin haben, und wir müssen wissen, dass FOCIL funktioniert. Wir brauchen FOCIL für sechs Monate oder ein Jahr im Mainnet, um wirklich sicher zu sein, dass es seinen Zweck erfüllt, nämlich die Aufrechterhaltung und Verbesserung der Zensurresistenz-Eigenschaften von Ethereum. Eine weitere Dringlichkeit besteht für mich zumindest darin, dass wir FOCIL so schnell wie möglich brauchen, wenn wir Attester vor Timing-Spielen und einigen anderen Bedenken schützen wollen, die wir mit APS angehen wollen.

**Pooja Ranjan:** Es ist manchmal traurig zu sehen, wenn Vorschläge nicht für das nächste oder nächstgelegene Upgrade ausgewählt werden, aber es kann nur eine begrenzte Anzahl von Vorschlägen in ein Upgrade aufgenommen werden. Ich schätze die harte Arbeit, die hinter der Einreichung des Vorschlags, der Vorbereitung des Vorschlags sowie den damit verbundenen Tests steckt, sehr. Vielen Dank also für all die Arbeit, die ihr für das Ethereum-Ökosystem leistet.

### Schnellfragerunde (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Bevor wir zum Schluss kommen, haben wir noch eine kurze Schnellfragerunde. Die einzige Bedingung ist, dass die Antwort aus einem Wort oder einem Satz bestehen sollte, und wir werden versuchen, das mit einem Timer zu machen, vielleicht 30 Sekunden pro Person. Wenn ihr bereit seid, fangen wir mit Julian an. Was ist derzeit das schwierigste Problem in der Blockchain-Forschung?

**Julian Ma:** Ich werde nicht zu sehr in Memes sprechen, also antworte ich ernsthaft. Ich würde sagen, das schwierigste Problem ist die Zukunft des Stakings: was die Zukunft des Stakings bedeutet, welche Rollen welche Dienstleister übernehmen, wie sie dafür entlohnt werden und wie sie zueinander in Beziehung stehen.

**Pooja Ranjan:** Was ist ein Blockchain-Anwendungsfall, der noch nicht ausreichend erforscht wurde?

**Julian Ma:** Ich würde sagen FOCIL.

**Pooja Ranjan:** Was ist heute das größte Sicherheitsrisiko für Ethereum?

**Julian Ma:** Ich würde ehrlich gesagt sagen, dass Zensurresistenz hier sehr kritisch ist, wegen Dingen wie Multi-Block-MEV, die riesige Sicherheitsrisiken darstellen könnten, zum Beispiel für L2s.

**Pooja Ranjan:** Sollte MEV minimiert, begrüßt oder etwas dazwischen sein?

**Julian Ma:** Ich stimme hier weitgehend der Ansicht von Flashbots zu, dass es demokratisiert werden sollte, was bedeutet, dass es dort maximiert werden sollte, wo es notwendig ist, und auf der Anwendungsschicht minimiert werden sollte.

**Pooja Ranjan:** Ist Dezentralisierung immer die Kompromisse wert?

**Julian Ma:** Sie ist die Kompromisse normalerweise wert.

**Pooja Ranjan:** Was ist die größte Innovation, die Ethereum der Welt gebracht hat?

**Julian Ma:** Hier möchte ich Mike Neuders Vortrag von der Devcon über digitale Eigentumsrechte zitieren. Ich würde sagen, zensurresistente digitale Eigentumsrechte, die die Welt wirklich verändern.

**Pooja Ranjan:** Vielen Dank, sehr gut geantwortet. Meine nächsten Fragen sind für Thomas. Also, wenn Ethereum nicht existieren würde, an welcher Blockchain würdest du arbeiten?

**Thomas Thiery:** Ich glaube, ich werde sehr meme-lastig antworten, und Julian hat mir da ein bisschen einen Strich durch die Rechnung gemacht, weil ich dachte, er würde dasselbe tun. Die Blockchain wäre FOCIL.

**Pooja Ranjan:** Was ist der am meisten überbewertete Anwendungsfall für die Blockchain?

**Thomas Thiery:** Kein Anwendungsfall ist es wert, ohne FOCIL gehypt zu werden.

**Pooja Ranjan:** Was ist eine Sache, die Ethereum so schnell wie möglich verbessern muss?

**Thomas Thiery:** Zensurresistenz, mit FOCIL.

**Pooja Ranjan:** Ein Wort, um Dezentralisierung zu beschreiben?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Glaubst du, dass Ethereum die Skalierbarkeit vollständig lösen wird?

**Thomas Thiery:** Ethereum mit FOCIL, ja.

**Pooja Ranjan:** Layer 1-Skalierung oder Layer 2-Skalierung, was gewinnt?

**Thomas Thiery:** Unendliche Layer, alle mit FOCIL.

**Pooja Ranjan:** Sehr gut gemacht, vielen Dank, Thomas. Danke für die Beantwortung all dieser Fragen. Da wir nun zum Schluss kommen, möchte ich dir diese Gelegenheit geben: Hast du noch eine Nachricht an die Community bezüglich des Vorschlags oder für die Ethereum-Community im Allgemeinen?

### Nachrichten an die Community (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Das ist tatsächlich ein sehr wichtiger Punkt, denn wir führen ständig aktive Diskussionen, und das alles öffentlich auf Discord. Es gab anfangs den Vorstoß, alles öffentlich zu machen, und die Leute tun das auch tatsächlich, worüber ich sehr froh bin. Ihr könnt die Diskussionen und Fortschritte auf dem öffentlichen Eth R&D Discord im Kanal inclusion-list verfolgen. Dort spielt sich derzeit im Grunde alles ab. Außerdem könnt ihr uns auf Twitter, Telegram oder überall sonst erreichen. Zögert nicht.

Je mehr Leute wir ansprechen und einbeziehen, desto besser werden das Design und die Implementierung sein. Wenn ihr also in irgendeiner Weise helfen könnt, meldet euch, und wir helfen gerne in allen Bereichen, auch in der Forschung. Es ist, glaube ich, sogar noch passender für uns, mit Leuten zusammenzuarbeiten, die an der Zukunft von FOCIL arbeiten wollen. Wir haben Privatsphäre erwähnt, wir haben Mechanismen für Transaktionsgebühren erwähnt, und wir werden uns auch stark auf FOCIL für Blobs konzentrieren. All diese Dinge erfordern Menschen und Forschungsaufwand. Wenn ihr interessiert seid, meldet euch. Vielen Dank für die Einladung und danke auch für all die Arbeit, die ihr für Ethereum leistet.

**Julian Ma:** Um das noch zu ergänzen: Ich hoffe, wir konnten einige Leute für FOCIL begeistern. Wenn ihr begeistert seid, lasst es uns bitte wissen. Und falls ihr noch Fragen habt, beantworten wir diese gerne und können euch hoffentlich davon überzeugen, dass FOCIL tatsächlich der richtige Weg ist. Vielen Dank. Es war wirklich eine Freude, hier zu sein, und danke für die Moderation der Sitzung. Und natürlich auch ein Dankeschön an alle für die Teilnahme.

### Schlussworte (59:52) {#closing-words-5952}

**Pooja Ranjan:** Vielen Dank. Das war's. Ein riesiges Dankeschön an Thomas und Julian, dass sie heute bei uns waren und ihre Erkenntnisse zu EIP-7805 geteilt haben. Danke an alle Teilnehmer; eure Fragen sind ermutigend und informativ. Danke fürs Einschalten. Wenn euch dieses Gespräch gefallen hat, vergesst nicht, diese Episode zu liken, zu abonnieren und mit anderen Ethereum-Enthusiasten zu teilen. Wir werden euch bei PEEPanEIP weitere EIPs und Forschungsfortschritte präsentieren. Bis zum nächsten Mal, schnurrt weiter mit dem Wissen und streift durch Ethereum mit den Ethereum Cat Herders. Habt noch einen schönen Tag.