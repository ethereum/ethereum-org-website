---
title: "Institutionelle Privatsphäre auf Ethereum heute"
description: "Ein Panel auf dem Web3Privacy Now-Event während der Devconnect 2025, bei dem Experten über reale institutionelle Anforderungen an die Privatsphäre auf Ethereum diskutieren, von Compliance bis hin zu ZK-Beweisen."
lang: de
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy-and-security"
  - "privacy"
format: panel
author: Web3Privacy Now
breadcrumb: "Institutionelle Privatsphäre"
---

Ein Panel auf dem Web3Privacy Now-Event während der Devconnect 2025, moderiert von **Oskar Thorin** (IPTF/EF), mit **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association) und **François** (Polygon Miden), die über reale institutionelle Anforderungen an die Privatsphäre auf Ethereum diskutieren, von der Einhaltung gesetzlicher Vorschriften bis hin zu Zero-Knowledge-Beweisen für institutionelle Dezentralisierte Finanzen (DeFi).

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Videotranskripts](https://www.youtube.com/watch?v=cZqlg4W1Els), das von Web3Privacy Now veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung in die Institutional Privacy Task Force (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Hallo. Könnt ihr mich hören? Alles klar. Cool. Wir machen zuerst einen sehr kurzen Einführungsvortrag – etwa 3 bis 5 Minuten – und das leitet dann in das Panel über. Dies ist ein verkürzter Vortrag. Das vorherige Panel hat viel über Compliance, Privatsphäre und so weiter gesprochen. Ich habe auf dem Cyban Congress bereits einen Vortrag gehalten, der dies ebenfalls berührte, und später am heutigen DeFi-Tag wird es eine längere Version dieses Vortrags geben. Aber worüber ich sprechen möchte, ist institutionelle Privatsphäre auf Ethereum.

Mein Name ist Oskar und ich bin der IPTF-Leiter bei der Ethereum Foundation. Das steht für Institutional Privacy Task Force. Und warum ist institutionelle Privatsphäre wichtig? Sie ist aus mehreren Gründen wichtig. Ich denke, ein großer Grund ist, dass wir, wenn man sich diese riesigen bestehenden Finanzinstitute ansieht, über Geldflüsse in Billionenhöhe sprechen. Früher war die Regulierung das größte Hindernis für sie, Onchain zu gehen. Aber was in den letzten Jahren passiert ist, ist, dass nun tatsächlich die Privatsphäre ihr größtes Hindernis darstellt.

Was ist also hier der Hebel und die Auswirkung? Ich denke, selbst wenn nur 1 % der traditionellen Finanzmittel zu Ethereum fließen würden, hätte das massive Auswirkungen in Bezug auf den Einfluss, den Ethereum auf die Privatsphäre haben kann. Und allein das Onboarding einer einzigen Institution betrifft hier auch Millionen von Nutzern, richtig? Das ist nicht hypothetisch. Es gibt Institutionen, die bereits Onchain sind, und hier passieren im nächsten Jahr oder so mehrere Dinge. Die Zeit dafür ist jetzt reif, was Institutionen betrifft, die mit integrierter Privatsphäre Onchain gehen.

Eine einzige große Institution kann hier massive Auswirkungen darauf haben, welches Ökosystem letztendlich gewinnt – ob es Ethereum ist oder privatere Versionen. Warum wollen sie Ethereum? Dafür gibt es einige Gründe. Dinge wie Liquidität, Zensurresistenz, 10 Jahre Betriebszeit und die Tatsache, dass es ein Verkaufsargument in Bezug auf die Abwicklung ist. Es gibt auch andere Alternativen, aber diese haben andere Einschränkungen. 

Damit Ethereum das Onboarding dieser Institutionen durchführen kann, müssen diese Bedenken hinsichtlich der Privatsphäre angegangen werden. Was wir bei der Institutional Privacy Task Force versuchen, ist das Onboarding von Institutionen auf Ethereum und sicherzustellen, dass ihre Ziele in Bezug auf die Privatsphäre erreicht werden. Wir veranstalten Dinge wie Workshops, versuchen den Bereich zu entmystifizieren und sicherzustellen, dass wir auf institutionelle Bedürfnisse speziell beim Thema Privatsphäre eingehen können. Das erste Artefakt, das wir haben, ist diese Karte zur institutionellen Privatsphäre – wir sprechen mit riesigen Institutionen, verstehen ihre geschäftlichen Anwendungsfälle und Anforderungen, machen so viel wie möglich Open Source und sprechen dann mit Anbietern in diesem Bereich, um Institutionen mit dem Lösungsraum zu verbinden. 

#### Panel-Vorstellungen und institutionelle Probleme (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Entschuldigung, das war etwas schnell, aber hoffentlich verständlich. Dieses Panel besteht also aus vielen Experten aus den Bereichen Forschung, Politik und Technik, und wir werden über institutionelle Privatsphäre sprechen. 

Nur eine kurze Vorstellung: Wir haben Eugenio, Head of Growth bei der European Blockchain Association. Wir haben Zach Obront, CEO von Etherealize, wo er institutionelle Produkte und zugrunde liegende Primitive für die Privatsphäre entwickelt. Wir haben Amzah, der den Großteil seiner Karriere im finanziellen Risikomanagement verbracht hat, bevor er sich intensiv mit Ethereum beschäftigte, und der nun eine Brücke zwischen traditionellen Kontrollen und nativen Ethereum-Märkten schlägt. Und schließlich haben wir François, einen Senior Staff Protocol Engineer bei Polygon Miden, der sich auf Zero-Knowledge-Beweissysteme konzentriert.

Um anzufangen, in einem oder vielleicht ein paar Sätzen: An welchen institutionellen Problemen arbeitet ihr, die tatsächlich Privatsphäre auf öffentlichen Infrastrukturen erfordern, anstatt nur einer traditionellen Datenbank oder einer Privaten Blockchain? Vielleicht können wir mit François beginnen.

**François:** Ja, natürlich kann man immer auf einer Privaten Blockchain aufbauen, aber heute glauben wir, dass Institutionen auf die globale Liquidität zugreifen wollen, die von Ethereum angeboten wird, während sie gleichzeitig das beibehalten, was sie aus der traditionellen Finanzwelt kennen, nämlich ein Maß an Privatsphäre, das es ihnen ermöglicht, mit globaler Liquidität zu handeln, ohne die Gesamtheit ihrer Trades öffentlich zu machen. Für uns ist es deshalb wichtig, sowohl Privatsphäre zu integrieren als auch auf Ethereum aufzubauen.

**Eugenio:** Nun, vielleicht kann ich das aus einer anderen Perspektive betrachten – aus der Perspektive von Standards. Im Standardisierungsprozess gibt es ein für Institutionen sehr wichtiges Konzept, nämlich den Vertrauensanker. Im Grunde hat jede Institution eine große offchain-Umgebung, an der sie die Haftung gegenüber der Gesellschaft für alle Nutzer ihrer Dienste verankert. Ein Teil des großen Problems bei der Schaffung von Blockchain-basierten Diensten für Institutionen besteht darin, wie man ein effizientes System schafft, um eine Brücke für den Vertrauensanker in die Onchain-Welt zu schlagen, und wie man dann kryptografische Techniken einbettet, um sicherzustellen, dass Daten auf eine minimale, aber überprüfbare und verifizierbare Weise verarbeitet werden.

**Zach Obront:** Cool. Bei Etherealize konzentrieren wir uns also darauf, einige der tiefen inneren Abläufe der Finanzmärkte, insbesondere der Kreditmärkte, zu aktualisieren. Ich werde das also aus zwei Richtungen angehen. Die eine ist: *Warum Privatsphäre?* Im Moment laufen all diese Märkte über bilaterale Vereinbarungen. Es gibt zwei Parteien. Sie sind sehr an den Gedanken gewöhnt, dass genau die Informationen nach außen dringen, die nach außen dringen müssen, und sonst nichts. Und so ist die einzige Möglichkeit, wie sie öffentliche Blockchains in Betracht ziehen würden, wenn dieses Maß an Privatsphäre erfüllt ist.

Aus der anderen Richtung: *Warum auf einer öffentlichen Blockchain sein?* Dies sind komplexe Märkte mit Parteien, die einander nicht unbedingt vertrauen und sich auf länderübergreifende Regulierungen verlassen müssen. Eine einzige Quelle der Wahrheit im Zentrum dieser Märkte zu haben, ist ein riesiger Vorteil, den man ohne eine öffentliche Blockchain nicht erreichen kann. Im Moment befinden sie sich in einer Art Stillstand und sagen: „Es gibt dieses Upgrade-Potenzial, aber wir können es nicht ohne die Privatsphäre tun, die wir brauchen.“ Wir versuchen, diese Dinge zusammenzubringen.

**Amzah:** Ja. Ich arbeite also für ABN Amro, eine große niederländische Bank. Wir haben 5 Millionen Privatkunden. Wir bauen also im Moment nicht wirklich etwas speziell im Bereich Privatsphäre, aber was jetzt ansteht, ist zum Beispiel eine Wallet für digitale Identitäten. Normalerweise funktioniert das so, dass Daten in einer zentralisierten Datenbank gespeichert werden und man sich dann mit einem externen Anbieter oder einem Dritten verbindet, aber das ist natürlich nicht wirklich sicher. Wir fangen also bereits an darüber nachzudenken, wie wir zum Beispiel Zero-Knowledge-Beweise (ZK-Beweise) nutzen können, damit wir eine selektive Offenlegung gegenüber externen Parteien haben könnten. In diesem Sinne können wir unsere Kundeninformationen schützen und sie sich auch mit der breiteren Web3-Umgebung verbinden lassen.

#### Konkrete Workflows und Speicherung (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Okay, großartig. Wenn ihr euch einen konkreten Ablauf aussucht, der für euch wichtig sein könnte – wie vielleicht einige Anleiheemissionen, ein Trade oder eine Zahlung aus der Schatzkammer –, wer kann bei welchem Schritt genau was sehen, und was wird Onchain im Gegensatz zu offchain gespeichert? Vielleicht fangen wir mit François an.

**François:** Ein großartiger Weg, sich dem zu nähern, ist aus der Perspektive, mit einer DEX auf Uniswap handeln zu wollen. Das Schöne ist, dass wir auf Miden etwas anbieten können, das vollständige Anonymität bietet. Wir haben anonyme Konten, die über Notes miteinander handeln. Es ist eine Mischung aus dem Kontomodell und dem UTXO-Modell. 

Wenn man mit einem Handelsplatz handelt, wird dieser Handelsplatz öffentlich sein wollen. Als DEX möchte man die Preise jedes Mal neu veröffentlichen, wenn man mit jemandem interagiert hat. Man emittiert also Notes in einen Batch. Für den Nutzer gibt es nichts Onchain, außer dem, was der Handelsplatz möglicherweise entschlüsseln kann. Der Handelsplatz führt den Trade aus und emittiert Notes beim Austritt. Diese Notes können dann von Konten beansprucht werden, die vollständig privat sein können. Man behält also die volle Anonymität, was die Nutzer betrifft – mit Ausnahme des Handelsplatzes, der sich entschieden hat, einige Informationen öffentlich preiszugeben. Darauf aufbauend entwickeln wir Compliance-Abläufe, die Auditierbarkeits-Workflows und View-Key-Richtlinien umfassen, die Market Engineering auf lokaler Ebene ermöglichen.

**Eugenio:** Nun, vielleicht kann ich das mehr aus einer funktionalen Perspektive betrachten. Im Allgemeinen hat jeder Emissions- oder Vertriebsablauf für institutionelle Dienstleistungen drei Hauptsäulen. Die erste ist Identität und Vertrauen, was mit dem Onboarding-Ablauf für Investoren, KYC/KYB-Prozessen und so weiter verbunden ist.

Die zweite ist die Durchsetzung von Richtlinien. Das Konto sammelt alle Informationen aus dieser offchain-Umgebung und generiert einen Auslöser für eine Ausführungserklärung auf der Blockchain. In diesem Zusammenhang können die Privatsphäre wahrende Techniken einen effizienten Vertrieb ermöglichen. Zum Beispiel ein Angebot, das nur an bestimmte Arten von Investoren vertrieben werden kann, die mit bestimmten Arten von Konten verbunden sind.

Die dritte Säule ist das Reporting. Dies ist mit dem Onboarding und den Handelsoperationen Onchain verbunden. Der Klebstoff all dieser Dienste ist, wie wir aus Onchain-Datenattestierungen die Datenpunkte extrahieren, die wir tatsächlich offchain benötigen, um am Ende ein traditionelles Reporting für unsere Kunden bereitzustellen.

**Zach Obront:** Die Antwort darauf ist sehr unterschiedlich, je nachdem, um welchen Ablauf es sich handelt, richtig? Das ist eine der Herausforderungen in diesem Bereich – es ist schwer, allgemeine Prinzipien zu haben. Ein Beispiel für einen Ablauf ist ein großer Kredit, bei dem eine Zinszahlung geleistet wird und eine Menge Kreditgeber aufgeteilt werden. Die Erwartung ist, dass niemand davon erfahren sollte. Es gibt keine Regulierung dafür. Es darf völlig privat sein, und wir wollen in der Lage sein, dieses Ende des Spektrums zu unterstützen. 

Am anderen Ende gibt es vielleicht einen Handel von Positionen zwischen Kreditgebern, und es gibt Erwartungen, dass bestimmte administrative Parteien sehen könnten, dass der Handel stattgefunden hat, aber nicht den Preis. Vielleicht können andere alle Details sehen. Wir haben alles um dieses flexible Modell herum aufgebaut, bei dem wir Compliance-Regeln nicht fest einprogrammieren wollen. Wir wollen sagen, dass ein Nutzer oder eine Anwendung das für sich selbst bestimmen kann. Wir haben die Möglichkeit, Regeln durchzusetzen, die es Aufsichtsbehörden oder administrativen Stellen ermöglichen, Dinge zu sehen, oder sogar aggregierte Daten an Verbände weiterzugeben.

**Amzah:** Ja. Ich stimme größtenteils mit dem überein, was Zach gesagt hat. Wenn Institutionen in der Vergangenheit über Privatsphäre nachdachten, starteten sie einfach eine Private Blockchain, an der vielleicht 20 Banken teilnehmen und nur sie sehen können, was dort drin ist. Aber eigentlich ist es viel nuancierter. Es hängt vom Anwendungsfall ab, von der Art der Abläufe und davon, was die Aufsichtsbehörde wissen muss. Man kann Kontostandsinformationen in einer aggregierteren Form Onchain stellen, zum Beispiel durch Proof of Reserves.

#### Nicht verhandelbare Anforderungen (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio und Amzah, von Banken, Handelsplätzen und Aufsichtsbehörden: Was sind einige nicht verhandelbare Anforderungen, die ihr immer wieder hört? Wie Audit-Trails, KYC-Regeln oder Reporting-Anforderungen?

**Eugenio:** Ich würde sagen, Rechenschaftspflicht, wenn es um den Onboarding-Prozess geht, und Compliance im Zusammenhang mit dem Reporting. Für mich geht es darum, konkrete Geschäftsanforderungen in technische Strukturen zu fassen. Der Teufel steckt im Detail – ob der Nutzer eine Anwendung oder ein Investor ist, schafft einen unterschiedlichen Prozessablauf für das Ökosystem. Das Ziel sollte sein, dieses System effizient aufzubauen, andernfalls werden wir bei der Akzeptanz blockiert. Deshalb entwickelt sich die Konto-Infrastruktur auf Ethereum auf eine sehr coole Weise.

**Amzah:** Ja, dem habe ich eigentlich nichts hinzuzufügen. 

**François:** Unser Mitgründer verbringt Wochen mit Kunden im institutionellen Bereich, und die wichtigste Forderung, die aufkommt, ist „Kontrolle“. Wer sieht was, wann und aus welchem Grund. Und dann geht man in diesen Gesprächen in die Details und sie werden wahnsinnig individuell. Für uns ist das großartig, denn die traditionelle Finanzwelt hat Jahrzehnte damit verbracht, ihre Buchhaltungspraktiken und AML/CTF-Abläufe aufzubauen. Sie sind sehr spezifisch, was diese Kontrolle angeht. Wir bauen diese Fähigkeiten also auf der Protokoll-Ebene auf und unterstützen Kunden auf ihrer Reise.

#### Kompromisse und globale Liquidität (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** Was sind die wichtigsten Kompromisse, mit denen ihr derzeit lebt? Leistung versus Privatsphäre, oder globale Liquidität versus strenge Kontrollen, oder Onchain-Transparenz versus offchain-Aufzeichnungen? Fangen wir mit Zach an.

**Zach Obront:** Glücklicherweise befinden wir uns in einem Markt, in dem Geschwindigkeit nicht die höchste Priorität hat. Viele Kreditmärkte wickeln in Wochen ab, daher sind Sekunden nicht das Wichtigste, woran sie denken. Aber die UX der Privatsphäre ist sehr schwierig. Blockchains sind sehr gut darin, dieses Konzept des eingereihten Zustands aufrechtzuerhalten, damit umzugehen, wenn sich Dinge ändern, und sicherzustellen, dass Transaktionen korrekt geordnet werden. Wenn wir anfangen, private Transaktionen in die Warteschlange zu stellen, wird es kompliziert. Wir müssen die beste Benutzererfahrung herausfinden, die sich mit der Privatsphäre vereinbaren lässt, zumal die Leute erwarten, dass Systeme sowohl privat als auch einfach zu bedienen sind.

**François:** Ich wollte die Kompromisse hervorheben, die wir dank Ethereum *nicht* eingehen müssen. Institutionen wollen wirklich nur in Märkte eintreten, wenn es sich für sie lohnt, was bedeutet, dass sie einen globalen Markt mit Netzwerkeffekten, tiefer Liquidität und vielen Gegenparteien wollen. Ein Rollup auf Ethereum zu sein, anstatt einer Privaten Blockchain oder einer weiteren Layer 1 (L1), gibt uns Zugang zu diesem tiefen Markt.

Natürlich gibt es Komplexitäten. Wir legen großen Wert auf diesen erstklassigen Service für eine Institution, die in diesen Markt eintritt, damit sie ihre eigenen Bedingungen haben kann. Eine der Herausforderungen ist das Gleichgewicht zwischen Privatsphäre und Bedrohungsresistenz. Es gibt Bedrohungsakteure in der Web3-Welt, und wir wollen das besser in den Griff bekommen, um ein fantastisches Erlebnis zu bieten. Wir gehen die Dezentralisierung vorsichtig an – wir wissen, wie man es macht, aber wir werden es in dem Moment tun, in dem es den Kunden am besten dient.

#### Systemvertrauen und Treiber der Akzeptanz (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, wie macht man diese Lösungen für Institutionen und Regierungen vertrauenswürdig und nutzbar?

**Eugenio:** Alles beginnt mit dem Versuch, institutionelle Dienste als integrierte Systeme zu betrachten, in denen jeder Teil des Systems seine eigene spezifische Zugriffsregel hat. Von der Datenentstehung bis zur Datenkomprimierung auf Layer 2 (L2) und der Datendezentralisierung auf Layer 1 (L1). Wenn wir dieses System kombinieren, bei dem die offchain-Umgebung die Vertrauensannahme der Institution hält, können wir verschiedene Prozesse Layer 2 (L2) und Layer 1 (L1) zuweisen.

**Oskar Thorin:** Amzah, wie siehst du das, Systeme vertrauenswürdig und nutzbar zu machen?

**Amzah:** Für uns ist es wirklich wichtig, dass es anpassbar ist. Blockchain ist nicht mehr nur ein Anwendungsfall, bei dem alles vollständig öffentlich oder vollständig privat ist. Es gibt keine Einheitslösung. Was für uns auch am wichtigsten ist, ist die Einhaltung gesetzlicher Vorschriften. Der Bankensektor in Europa ist stark reguliert, und wenn in Bezug auf die Privatsphäre etwas nicht stimmt, wird das von den Aufsichtsbehörden einfach nicht akzeptiert.

#### Ausblick auf 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** Alles klar, wir sind fast am Ende. Was ist ein Baustein – technisch, operativ oder politisch –, von dem ihr glaubt, dass er die institutionelle Akzeptanz bedeutsam beschleunigen würde? Und wenn wir uns 2026 wiedersehen, was glaubt ihr, ist realistisch, was in diesem Jahr passiert sein wird?

**Zach Obront:** Ich denke, „institutionell“ und „Privatsphäre“ sind derzeit sehr weit gefasste Begriffe, und sie überschneiden sich je nach Anwendungsfall unterschiedlich. Einigen geht es darum, sich an liquide Märkte anzuschließen, während andere einfach nur eine bessere interne Infrastruktur wollen. Es würde uns voranbringen, Klarheit über die spezifischen Situationen zu bekommen, für die wir Lösungen suchen. Es gab bisher keine tiefe Kategorisierung von Compliance-Anforderungen. Darauf zu drängen, diese Anforderungen abzubilden und sie in ein Protokoll zu verwandeln, das sie unterstützt, würde unsere Fähigkeit zu bauen auf ein neues Level heben, anstatt uns auf eine fragmentierte Welt zu verlassen, die von Anwälten geführt wird.

**Amzah:** Die Technologie hat mit Zero-Knowledge-Beweisen und vollständig homomorpher Verschlüsselung einen langen Weg zurückgelegt. Ich denke, eines der wichtigsten Dinge, die verbessert werden müssen, ist die Aufklärung von Aufsichtsbehörden und Institutionen. Sie haben vielleicht schon von Zero-Knowledge-Beweisen gehört, aber sie wissen nicht wirklich, wie sie funktionieren. Die Mehrheit der Aufsichtsbehörden denkt immer noch aus rechtlicher Sicht – wenn etwas kaputt geht, wen können wir anrufen? Und wenn es niemanden gibt, den man anrufen kann, ist das eine schwierige Vorstellung für sie.

**Eugenio:** Auf der technologischen Seite werden ZK-Echtzeit-Beweise und -Aggregation es uns wirklich ermöglichen, komplexe Anwendungsfälle zu entwickeln, die Apps, institutionelle Kunden und Layer 1 (L1) kombinieren. Ich unterstütze auch, was Amzah über Aufklärung gesagt hat. Für 2026 würde ich mir mehr kooperatives Engagement zwischen Projekten wünschen, damit Anwendungen wirklich anfangen können, Zugang zu globaler Liquidität und globalen Netzwerken zu haben.

**François:** Wenn wir uns in einem Jahr treffen, würde ich gerne im Frühjahr das Mainnet von Miden gestartet haben, damit wir das feiern können. Darüber hinaus würde ich mir wünschen, dass wir auf dem Weg zur vollständigen Dezentralisierung sind. Es wird eine gemeinsame Anstrengung erfordern. Das Wichtigste, was ich sehen möchte, ist mehr Engagement. Die Vorstellung, dass Privatsphäre im Widerspruch zu Compliance steht, ist nicht wirklich wahr, aber beides miteinander zu verbinden, erfordert Arbeit. Wir wollen, dass Institutionen dabei helfen, die Art von Märkten zu gestalten, die sie sehen wollen, denn wir wissen, dass dies chaotisch und speziell auf ihre Bedürfnisse zugeschnitten sein wird.

#### Abschließende Gedanken (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Ich möchte jedem von euch nur 10 bis 20 Sekunden geben, um etwas zu erwähnen, das diese Woche passiert ist, oder für eine kurze Eigenwerbung, bevor wir zum Ende kommen.

**Amzah:** Vor drei Jahren war ich als Freiwilliger bei einer der ersten Devconnects dabei. Zu sehen, wie die Leute heute im Vergleich zu damals auf Institutionen blicken, ist eine massive Verbesserung.

**Zach Obront:** Es ist einfach erstaunlich, wie sehr das Thema Privatsphäre dieses Jahr in der Luft liegt. Mein Hintergrund liegt im Bereich Sicherheit, und es mangelt an Sicherheitsforschern, die diese Dinge verstehen. Jeden, der sich an dieser Schnittstelle befindet, ermutige ich, sich voll und ganz darauf einzulassen.

**Eugenio:** Ich wähle die Datenregulierungsorganisation – ich denke, es gibt viel Hoffnung für ZKP in einem konformen Datenbereich, und die Interoperabilitäts-Schicht von Ethereum wird dabei helfen, Institutionen Onchain zu bringen.

**François:** Als Ingenieur ist es sehr schwierig; normalerweise hört man von einem Nischenthema. Wir haben kürzlich Precompiles auf Miden eingeführt, was die Verifizierung von Abläufen eröffnet, die maschinelles Lernen beinhalten. Wenn man ein extremer Nerd ist wie ich, möchte man unbedingt maschinelles Lernen und Beweise für maschinelles Lernen durchführen, und das ist jetzt etwas, das wir tun können.

**Oskar Thorin:** Ich möchte allen Diskussionsteilnehmern danken. Wir haben einige sehr interessante Perspektiven aus den Bereichen Technologie, Politik und Technik gehört. Wir haben nur an der Oberfläche gekratzt, aber ich empfehle euch, weiter darüber zu sprechen, wenn ihr an diesem Thema interessiert seid. Danke.