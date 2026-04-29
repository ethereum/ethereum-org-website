---
title: "Keynote: Der WAHRE Zustand von L2s"
description: "Ein Vortrag über den aktuellen Zustand von Layer-2-Lösungen, der die Lücke zwischen den Sicherheitsversprechen von Rollups und der Realität untersucht und einen Weg zu echter Dezentralität vorschlägt."
lang: de
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "skalierung-und-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Zustand von L2s"
---

Eine Keynote von **Bartek Kiepuszewski**, Gründer von L2BEAT, auf der Devcon SEA, die den aktuellen Zustand von Layer-2-Lösungen, die Lücke zwischen den Sicherheitsversprechen von Rollups und der Realität, neue Bewertungskategorien sowie das Versprechen von L2BEAT untersucht, im nächsten Jahr erhebliche Ressourcen in die Überprüfung von Beweissystemen zu stecken.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Videotranskripts](https://www.youtube.com/watch?v=ik2JxmHDmyw), das von der Ethereum Foundation veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Als Gründer von L2BEAT habe ich die einzigartige Gelegenheit, mit praktisch jedem einzelnen L2-Team da draußen zusammenzuarbeiten, und wir arbeiten mit ihnen seit den allerersten Anfängen dieses Bereichs zusammen – was nun etwa vier Jahre her ist. Das ist unglaublich. Die Zeit vergeht wie im Flug. Wir haben mit den frühen Pionieren der Zero-Knowledge-Technologie (ZK) gearbeitet, wir haben mit der Plasma Group gearbeitet, die sich in Optimism umbenannt hat, wir haben mit Arbitrum gearbeitet. Und von dieser Bühne aus möchte ich all diesen Teams meine Anerkennung aussprechen, denn ohne eure Unterstützung wären wir sicherlich nicht hier. Als L2BEAT sind wir extrem dankbar für all die Unterstützung, die uns die Community gibt.

Schauen wir uns also an, was wir erreicht haben. Zunächst einmal haben wir es geschafft, fast 50 Rollups und über 50 andere L2s zu starten. Das ist eine unglaubliche Leistung – es sind viele Systeme, und wir haben fast noch einmal so viele, die in den kommenden Monaten starten werden. Wir haben auch viel Wert, einen hohen gesamten gebundenen Wert (TVL), in diese Systeme eingebracht, und wenn man sich die Diagramme ansieht, gehen sie alle nur nach oben.

Die Sache ist die: Mit all diesem Wachstum geht auch viel Verantwortung einher. Wir müssen verstehen, dass Endnutzer, die diese Systeme verwenden, Geld in diese Rollups stecken, weil sie glauben, dass Rollups die Sicherheit von Ethereum erben. Mit dieser Erkenntnis müssen wir meiner Meinung nach anfangen, das Thema Sicherheit ernst zu nehmen.

#### Skalierung von Ethereum (2:10) {#scaling-ethereum-210}

Wir haben es auch geschafft, Ethereum zu skalieren. Ethereum lief eigentlich ganz gut, aber es wurde für die Nachfrage wirklich langsam und die Gebühren wurden sehr hoch. Also skalieren wir definitiv – auch diese Zahlen steigen. Das ist unglaublich.

Es gibt jedoch ein „Aber“. Ihr wisst ja, Leute, es gibt immer ein „Aber“, richtig? Und ich bin nur hier, um ehrlich zu euch allen zu sein. Ich möchte wirklich, dass dieser Bereich ernsthaft wird, und dies ist meine Gelegenheit, um eure Unterstützung zu bitten, um sicherzustellen, dass wir nicht scheitern – dass wir die Erwartungen der Community nicht enttäuschen. Wir müssen anfangen, die Sicherheit dessen, was wir bauen, wirklich ernst zu nehmen.

Denn wisst ihr, wir benutzen schon zu lange Stützräder. Wenn man als Erwachsener Stützräder benutzt – und ich wiederhole, es sind vier Jahre vergangen –, dann ist man wirklich unreif. Es ist in Ordnung, Stützräder zu benutzen, wenn man ein Kind ist. Es ist nicht in Ordnung, Stützräder zu benutzen, wenn man erwachsen ist. Und ich denke, es ist an der Zeit, dass wir alle aufhören, uns davor zu scheuen. Wir sollten alle unsere Meinung sagen und nicht am Syndrom von „Des Kaisers neue Kleider“ leiden.

#### Das große „Aber“: Fehlende Beweissysteme (4:30) {#the-big-but-missing-proof-systems-430}

Was ist also dieses große „Aber“? Nun, erstens haben die meisten L2s heute kein Beweissystem, was irgendwie überraschend ist, denn frühe Pioniere wie StarkNet, wie zkSync, wie Aztec – als sie vor vier Jahren ihre ersten anwendungsspezifischen Rollups starteten, hatten sie Beweissysteme. Also ja, man kann heute ein L2 mit einem Klick starten. Aber ist das wirklich ein L2? Ist das wirklich ein Rollup? Was man da startet, ist etwas, das durch eine Multisig gesichert ist. Ich glaube nicht, dass das gut genug ist.

Der Zustand des Ökosystems sieht heute in etwa so aus wie auf diesem Diagramm. Auf der linken Seite sieht man die aktuellen L2s mit einem Beweissystem. Auf der rechten Seite sieht man aktuelle L2s ohne ein Beweissystem. Und ich würde wetten, dass die überwiegende Mehrheit der kommenden L2s kein Beweissystem haben wird. Das würde im Grunde jede einzelne OP-Stack-Chain einschließen, mit Ausnahme von OP Mainnet und Base – und Hut ab vor ihnen, übrigens, sie sind wie Champions. Jedoch hat jede einzelne andere OP-Stack-Chain schlichtweg kein Beweissystem.

Dieses Diagramm auf der rechten Seite wird auch alle Orbit-Stacks umfassen, die zwar ein Beweissystem haben, dieses sich jedoch hinter einer oft sehr kurzen, erlaubnispflichtigen Whitelist verbirgt. Manchmal besteht diese Whitelist nur aus einem einzigen Akteur – es ist derselbe wie der Proposer für den Zustand. Es ist im Grunde der Proposer für den Zustand, und nur er kann sich selbst anfechten. Bitte was? Ernsthaft.

#### Security Councils (6:00) {#security-councils-600}

Nun, die meisten L2s verwenden keine Security Councils. Was meinen wir mit einem Security Council? Ein Security Council ist im Grunde eine Multisig, die aus mindestens acht Teilnehmern besteht und eine Konsens-Schwelle von 75 % erfordert. Man kann es sich also als eine große Multisig vorstellen, aber es geht nicht nur um die Größe – es geht darum, dass wir wollen, dass die Teilnehmer geografisch dezentral sind. Ihr habt vielleicht gestern eine großartige Präsentation über die Notwendigkeit von Geo-Diversifizierung gehört. Das ist es, was wir von diesen Strukturen erwarten. Und im Grunde wollen wir vor allem, dass die Teilnehmer aus verschiedenen Unternehmen und verschiedenen Gerichtsbarkeiten kommen. Das ist extrem wichtig, und ich werde euch einige Beispiele zeigen, warum das so ist.

Stellt euch Security Councils als diese hochgezüchteten Multisigs vor. Es gibt eine sehr wichtige soziale Ebene dahinter. Das ist also der aktuelle Stand der Dinge, und noch einmal, er ist sehr schlecht. Wir haben Security Councils nur bei Arbitrum, Optimism, Polygon, zkSync – und ich weiß, dass StarkNet, Scroll und interessanterweise Fuel mit einem Security Council starten. Alle anderen sind im Grunde eine sehr kleine, interne, oft private Multisig, und ehrlich gesagt ist es extrem schwer, den Unterschied zwischen diesen Multisigs und einfachen EOAs zu erkennen.

#### Vertrauensannahmen zur Datenverfügbarkeit (7:25) {#data-availability-trust-assumptions-725}

Der dritte große Punkt, den wir falsch gemacht haben, ist, dass die meisten Nicht-Rollup-L2s mit miserablen Vertrauensannahmen zur Datenverfügbarkeit (DA) eingerichtet sind. Und ich benutze das Wort „miserabel“ – erstens, weil ich es mag, und zweitens, weil es wirklich, wirklich schlecht ist.

Seht euch diese Beispiele auf der linken Seite an – Arbitrum, StarkEx, Immutable X. Fast alle anderen posten ihre DA jedoch buchstäblich auf ihren Server im Keller oder wo auch immer. Wir haben keine Ahnung. Wir haben buchstäblich keine Ahnung. Der Punkt ist, sie sind wirklich schlecht und es scheint sie nicht zu interessieren. Vielleicht interessiert es die Nutzer also auch nicht – wir wissen es nicht. Aber wir müssen uns diese Daten wirklich ansehen und allen sagen: Hey, das ist kein Data Availability Committee.

Ein Data Availability Committee wurde ursprünglich von StarkWare für die StarkEx-Implementierungen und von Arbitrum ins Leben gerufen und gefördert. Aber das war nicht der Sinn der Sache – dass man sagen kann: „Ich habe einen Server in meinem Keller, ich kann ihn ein Data Availability Committee nennen.“ Das war nicht der Sinn dieser Übung.

Alles in allem tut es mir leid, das sagen zu müssen, aber im Moment können erlaubnispflichtige Betreiber in den meisten L2s eure Gelder stehlen oder einfrieren. Wir sind hier, um euch alle darauf aufmerksam zu machen. Es tut mir leid, das sagen zu müssen, aber wir müssen unsere Einstellung ändern.

#### Warum Beweissysteme wichtig sind (8:40) {#why-proof-systems-matter-840}

Warum sollten wir uns für Beweissysteme interessieren? Es gibt unserer Meinung nach mindestens drei gute Gründe, warum wir alle ein funktionierendes Beweissystem haben sollten.

Einer ist, dass es tatsächlich einen erlaubnisfreien Austritt ermöglicht, falls alle Betreiber ausfallen – und sie können aus welchem Grund auch immer ausfallen. Wir hatten erst kürzlich den Fall, dass dYdX ausfiel. Sie haben die Nutzer gewarnt, viele Nutzer sind nicht ausgetreten. Wenn man jedoch ein Beweissystem hat, kann man das System so gestalten, dass jemand auf erlaubnisfreie Weise übernimmt, oder man kann einen Sicherheitsausstieg einbauen, damit die Nutzer ihre Gelder herausholen können. Das ist extrem wichtig. Ohne ein Beweissystem kann man das schlichtweg nicht tun – es ist unmöglich.

Der zweite Grund ist, dass man die Vertrauensannahmen des Security Councils tatsächlich verbessern kann – vorausgesetzt natürlich, man hat eines. Und der Grund dafür ist recht nuanciert. Was man jetzt tun kann, ist Folgendes: Anstelle der Situation, in der ein böswilliger Proposer – und dies ist das Diagramm, das das einfache Optimistic Rollup ohne Beweissystem zeigt, was man heute in vielen OP-Stacks sehen kann – gibt es eine sehr starke Multisig, die die Zustands-Wurzel überschreiben kann, und es gibt einen Proposer, der Zustands-Wurzeln vorschlägt. Wenn dieser Vorschlag böswillig ist, müssen sie nur eine Minderheit der Mitglieder des Security Councils bestechen, wegzuschauen – nicht, um etwas Böswilliges zu tun, sondern einfach, um nichts zu tun. In diesem Fall wird der böswillige Vorschlag tatsächlich durchgehen und sie werden die Gelder stehlen.

Sobald man ein Beweissystem einführt, ist die Situation für den böswilligen Proposer viel schwieriger, denn jetzt muss er die **Mehrheit** des Security Councils bestechen. Er muss nicht nur die Mehrheit bestechen, er muss sie auch dazu bringen, tatsächlich etwas Böswilliges zu tun – nicht nur einfach wegzuschauen. Das ist eine ganz andere Ausgangslage. Jemanden dazu zu bringen, wegzuschauen, bedeutet zu sagen: „Hey, wenn ich dir 10 Millionen Dollar gebe, verlierst du einfach deine Schlüssel oder machst einen langen internationalen Flug.“ Wenn man jemanden dazu bringen will, etwas Böswilliges zu tun, ist das eine völlig andere Ausgangslage. Wir denken, dass dies die Vertrauensannahmen grundlegend ändert, insbesondere bei einem öffentlichen Security Council.

Schließlich ermöglichen Beweissysteme – wenn man sich in Stage 2 befindet –, jegliche Vermittler komplett zu entfernen. Man braucht kein Security Council, oder wenn man eines hat, dann nur für Notfälle. Das kann also tatsächlich tiefgreifende regulatorische Auswirkungen haben. Man möchte sein L2 vielleicht von Anfang an als Stage-2-System starten. Das ist möglich, aber natürlich braucht man dafür ein Beweissystem – idealerweise sogar mehr als eines. Es gibt bereits einige Ankündigungen von Systemen, die das tun, wie die jüngste Ankündigung des Nethermind-Teams, das ein Rollup baut, das beim Start Stage 2 sein soll.

#### Warum Security Councils und nicht Multisigs (11:29) {#why-security-councils-not-multisigs-1129}

Das war zum Thema Beweissysteme. Nun, warum Security Councils und nicht einfach nur Multisigs? Der Grund ist: Glaubt nicht, dass Multisigs gleich Multisigs sind. Das ist der Grund – es sei denn, es gibt eine soziale Ebene, die euch wirklich davon überzeugen kann, dass diese grundlegend diversifiziert sind.

Wir hatten mehrere große Ereignisse in unserer Geschichte. Wir hatten Multichain, die behaupteten, sie seien sehr dezentral, und es stellte sich heraus, dass sie es nicht waren – und das ist eine Behauptung, die man nicht wirklich unabhängig überprüfen kann. Ein riesiger Angriff, oder ein Insider-Job, oder ein Rug Pull – wir sind uns nicht sicher.

Dann hatten wir eine Situation mit Oasis, wo sie von einem britischen Gericht kontaktiert wurden und sie die Multisig tatsächlich nutzen mussten, um einige Gelder aus dem Protokoll zu extrahieren. Es wäre unmöglich gewesen, das zu tun, wenn man ein geopolitisch diversifiziertes Security Council gehabt hätte, denn es gibt keinen Gerichtsbeschluss, der tatsächlich jeden erreichen kann.

Schließlich hatten wir erst kürzlich einen Angriff auf eine Multisig. Glaubt keine Sekunde lang, dass Multisigs nicht angegriffen werden können. Letztendlich müssen wir sie alle loswerden.

Zusammenfassend lässt sich also sagen: Wenn man ein Stage-0-Rollup ohne Security Council hat, kann ein böswilliger Betreiber im Grunde mit euren Geldern machen, was er will. Wenn man ein Stage-0-Rollup mit einem Security Council ist, dann muss ein Angreifer eine Minderheit des Security Councils bestechen – vielleicht eine schwierige Sache, aber viel einfacher, als die Mehrheit des Security Councils zu bestechen, was man tun müsste, wenn das Rollup ein Beweissystem hat. Und schließlich kann niemand eure Gelder stehlen, wenn ihr Stage 2 seid. Das ist das Versprechen, wenn man Stage 2 erreicht.

#### Vorgeschlagene Neuklassifizierung (13:10) {#proposed-reclassification-1310}

Die Frage ist: Haben wir die richtigen Anreize für Projekte, sich tatsächlich darum zu kümmern? Das Problem ist, dass das Einzige, was wir tun können – wir als L2BEAT und wir als Ethereum-Community –, darin besteht, sozialen Druck auszuüben. Vitalik sagte, dass er ab nächstem Jahr plant, nur noch L2s öffentlich zu erwähnen, die Stage 1 sind. Er sagte zuvor sogar, dass er Systeme nicht als Rollups bezeichnen wird, wenn sie nicht Stage 1 sind.

Also haben wir uns gefragt, was wir tun können. Im Moment haben wir Stages für Rollups. Wir haben keine Stages für Validiums und Optimiums. Wir haben lange überlegt – vielleicht könnten wir „Stage 0+“ für Systeme einführen, die Beweissysteme haben, aber noch nicht Stage 1 sind. Aber nach monatelangen Diskussionen haben wir entschieden: Nein, es ist an der Zeit, erwachsen zu werden.

Was wir der Community vorschlagen – und das wird für das Feedback der Community ins Forum gestellt –, ist Folgendes. Erstens wollen wir eine separate Kategorie für Systeme schaffen. Der Hauptunterschied besteht darin, dass man ein Beweissystem haben muss, um Stage 0 zu sein. So wird beispielsweise StarkNet heute unter dieser Klassifizierung Stage 0 sein. Alle OP-Stack-Chains, die kein Beweissystem haben – außer Base und Optimism –, werden nicht in diese Kategorie fallen. Und natürlich werden wir den Systemen Zeit geben, sich anzupassen. Das ist die Hauptkategorie, und das sollte wie eine Superliga der Systeme sein.

Dann gibt es eine weitere Kategorie von Systemen, die keine Ethereum-DA verwenden. Sie nutzen zusätzliche Vertrauensannahmen, die mit externer DA einhergehen. Wir nennen sie „Alt-DA“, aber sie würden Validiums, Optimiums und welche hybriden Konstruktionen man auch immer erschaffen mag, umfassen. Sie müssen jedoch angemessene DA-Garantien bieten – das darf nicht euer Keller sein. Das muss ein angemessen großes Data Availability Committee sein, oder wenn man Celestia oder Avail verwendet, muss man die Brücke nutzen.

#### Die Kategorie „Andere“ und das Versprechen von L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

Was ist mit den anderen? Wir werden sie in eine dritte Kategorie einordnen, die wir nennen – und jetzt warte ich auf das Feedback der Community, wie wir diese Systeme benennen sollen –, unser Arbeitsname ist „Andere“. Der Punkt ist, dass sie durch Multisigs gesichert sind, und wir werden diese Multisigs als das entlarven, was sie sind. Das ist es, was wir in unserer Benutzeroberfläche (UI) tun wollen.

Die UI wird in etwa so aussehen: Man wird diese Aufschlüsselung sehen – Rollups, Validiums und Optimiums sowie Andere. Und die Standardsortierung wird nach Sicherheit erfolgen, nicht nach TVL. Lasst uns nicht dem TVL mit schlechter Sicherheit hinterherjagen – das wird wirklich böse enden.

Wir werden Stage-1- und Stage-2-Projekte fördern. Wir werden Stage-0-Projekte als Anwärter betrachten. Was die „Anderen“ betrifft, listen wir sie gerne auf – wir werden da extrem liberal sein. Man muss im Grunde nur mit Ethereum im Einklang stehen und offensichtlich eine Brücke haben, die es einem ermöglicht, Gelder zu bewegen. Wir werden uns jedoch die Vertrauensannahmen und die Multisigs ansehen, und wir hoffen, dass sich die Systeme langsam aber sicher von den „Anderen“ entweder zu Validium/Optimium oder zu Rollups bewegen werden.

So stellen wir uns vor, dass die Kategorie „Andere“ aussehen würde – das sind die echten Daten im Moment, die echten Systeme, die in diese Kategorie fallen könnten, wenn sie kein Beweissystem einführen. Man wird genau sehen, wer der Proposer ist, wer der Herausforderer ist und wer der Upgrader ist. Das Lustige ist, dass man das heute schon auf L2BEAT sehen kann – es ist nur so, dass diese Informationen so tief auf der Detailseite versteckt sind, dass ich wette, nur Forscher und Enthusiasten schauen sie sich an. Es ist heute alles verfügbar. Wir wollen die Daten jedoch den Endnutzern zugänglich machen. Wir wollen, dass sich die Endnutzer wirklich bewusst sind, was vor sich geht, damit wir alle für die Systeme, die wir bauen, zur Verantwortung gezogen werden.

Reicht es aus, einfach zu sagen: „Ich habe ein Beweissystem“? Nein. Unser Versprechen an die Community als L2BEAT ist, dass wir nächstes Jahr erhebliche Ressourcen darauf verwenden werden, uns diese Beweissysteme wirklich sehr genau und sehr tiefgehend anzusehen, um sicherzustellen, dass sie solide und vollständig sind. Wir werden sowohl ZK als auch Optimistic analysieren. Wir werden in den Quellcode gehen, wir werden uns ansehen, wie ihr euer Trusted Setup erstellt habt, wir werden uns eure Schaltkreise ansehen und prüfen, was genau Onchain verifiziert wird. Wir wollen alles super transparent machen, damit Vertrauensannahmen klar kommuniziert werden – und noch wichtiger, euer Beweissystem darf nicht hinter einer unangemessen kleinen Whitelist versteckt werden.

Wir stellen Forscher ein. Wir werden all diese Arbeit erledigen. Das ist unser Versprechen für das nächste Jahr. Ich hoffe, nächstes Jahr wird das Jahr der L2s und Rollups – es geht jedoch nicht darum, ein Rollup mit einem Klick zu starten. Der Punkt ist, dass man in der Lage sein möchte, ein System mit guter Sicherheit zu starten. Idealerweise möchte man so viel Sicherheit wie möglich von Ethereum erben. Es gibt für uns alle noch viel zu tun, um das zu erreichen. Aber wenn wir das nicht tun, dann erschaffen wir im Grunde nur Tausende von unsicheren Sidechains. Ich denke, das wollen wir als Community nicht.

#### Fragen und Antworten (Q&A) (18:45) {#qa-1845}

**Moderator:** Kommen wir zu den Fragen und Antworten. Ist es wichtig, dass Rollups einen dezentralen Sequencer haben, oder reichen andere Sicherheitsmechanismen aus?

**Bartek Kiepuszewski:** Das ist eine sehr gute und wichtige Frage. Ich denke, es gibt verschiedene Designs, die wir sehen werden. Ich glaube nicht, dass die Dezentralisierung des Sequencers für die Sicherheit der Nutzergelder extrem wichtig ist, aber sie könnte in bestimmten Situationen für die Zensurresistenz in Echtzeit wichtig sein. Vitalik sagte während seiner Eröffnungs-Keynote, dass die Zukunft so aussehen könnte, dass wir Rollups sehen, die „based“ werden – also die Ethereum-Infrastruktur nutzen, um Zensurresistenz in Echtzeit zu bekämpfen –, während andere, wie zum Beispiel MegaETH, vielleicht einen sehr zentralisierten Sequencer haben und sich nur auf den Sicherheitsausstieg verlassen. Wir könnten hybride Konstruktionen sehen. Ich denke, der Gestaltungsspielraum ist riesig, und im Moment wollen wir bei L2BEAT wirklich sehen, was passieren wird und wie sich das entwickeln wird.

**Moderator:** Werden TEE-basierte Beweissysteme als Stage 2 betrachtet, auch wenn sie Vertrauen in den Hardwarehersteller voraussetzen?

**Bartek Kiepuszewski:** Die kurze Antwort ist nein, denn bei den Konstruktionen, die wir heute sehen, könnte Intel, wenn man SGX verwendet, einen Beweis einreichen und potenziell blockieren, stehlen oder einfrieren, was immer sie wollen, ohne dass es jemand wirklich bemerkt – und ohne dass Ethereum es bemerkt. Jedoch, mit all der Arbeit, die vorangetrieben wird, um vertrauenslose, erlaubnisfreie TEEs zu schaffen – mir wird gesagt, dass dies tatsächlich extrem spannende Arbeit ist. Aber kurze Antwort: heute, nein.

**Moderator:** Warum ist Optimism als Stage 1 klassifiziert? Basierend auf der Bewertung sind sie es nicht – die Foundation kontrolliert den Vorschlagsprozess vollständig.

**Bartek Kiepuszewski:** Sie erfüllen im Grunde alle Kriterien. Es geht nicht wirklich um den Vorschlagsprozess – es geht darum, wer die Gelder kontrolliert. Man kann einen zentralisierten Proposer haben, es gibt jedoch eine Rückfalloption. Wenn sie ausfallen, wird das gesamte System erlaubnisfreier. Ich denke, es ist wichtig zu erkennen, welche Rolle das Security Council spielt. Wir wollen, dass Stage-1-Systeme einem den Austritt ermöglichen, wenn der zentralisierte Proposer stoppt. Zum Beispiel war bei dYdX der Vorschlag extrem zentralisiert, aber als sie aufhörten, konnten die Leute austreten. Es geht also nicht darum, ob man zentralisiert oder dezentral ist – es geht darum, ob man tatsächlich auf erlaubnisfreie Weise austreten kann.

Sie haben alle Kriterien erfüllt. Wir haben übrigens verfeinert – Kriterien sind nichts, was in Stein gemeißelt ist, denn all diese Systeme entwickeln sich weiter, also müssen wir uns mit diesen Systemen weiterentwickeln. Die Kriterien könnten sich ein wenig ändern, und wir schauen uns sowohl Optimism als auch Arbitrum sehr genau an, weil sie eindeutig die beiden Marktführer sind. Es gibt viele Nuancen, auf die ich aus Zeitgründen nicht eingehen kann. Aber es ist nicht so, dass man eine Stage-Bezeichnung für immer hat – wenn es neue Informationen gibt oder etwas, das wir vielleicht übersprungen oder übersehen haben, ist es durchaus möglich, dass man diese Bezeichnung verliert.

**Moderator:** Was sind die Hauptgründe, warum Projekte nicht in Richtung Stage 1 bauen?

**Bartek Kiepuszewski:** Komplexität, Zeit, Kosten, Talent. Es ist überraschend kostspielig. Wie ich schon sagte, haben die Pioniere vor vier Jahren im Grunde gebaut – dYdX war buchstäblich eines der ersten, wenn nicht das erste ZK-Rollup. Es war anwendungsspezifisch, aber dennoch war es das erste. Und wenn es nicht kleine Nuancen gäbe, wäre es Stage 2 – wirklich, es ist der Governance-Prozess, den wir für Stage 2 verlangen, der hier scheitert. Aber im Grunde genommen ist es ein Stage-2-System. Es wurde vor vier Jahren gebaut, es ist also nicht so, als wäre es unmöglich.

Ich denke, was es heute für all die Rollups ehrlich gesagt extrem schwer macht, dies tatsächlich zu tun, ist, dass die Mehrheit der Rollups nicht von den Teams gebaut wird – sie werden von Rollup-as-a-Service-Anbietern gestartet, und wir müssen Anreize für sie schaffen, es tatsächlich besser zu machen. Und es ist schwer. Niemand hat gesagt, dass es einfach werden würde.