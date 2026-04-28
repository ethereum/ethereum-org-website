---
title: "Was beinhaltet das Pectra-Upgrade?"
description: "Christine Kim über das Pectra-Upgrade von Ethereum, einschließlich der im Upgrade enthaltenen EIPs, was sie am Protokoll ändern und warum sie für Benutzer, Entwickler und Validatoren wichtig sind."
lang: de
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "Roadmap"
  - "Pectra"
  - "Upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Pectra-Übersicht"
---

Eine Präsentation von **Christine Kim** auf der Devcon SEA über die EIPs, die im Pectra-Upgrade von Ethereum enthalten sind, was sie am Protokoll ändern, wann die Mainnet-Aktivierung erwartet wird und welche EIPs aus dem Umfang entfernt wurden.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=ufIDBCgdGwY), das von der Ethereum Foundation veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Wir werden über alle EIPs sprechen, die in das Pectra-Upgrade einfließen. Ein kurzer Haftungsausschluss, bevor ich beginne: Alles, was ich gleich sagen werde, dient rein informativen Zwecken und sollte nicht als Finanz- oder Anlageberatung verstanden werden.

#### Wann kommt Pectra ins Mainnet (0:23) {#when-is-pectra-mainnet-023}

Bevor wir uns ansehen, was in Pectra enthalten ist, ist die Frage, die mir am häufigsten gestellt wird: „Wann kommt Pectra ins Mainnet?“ Das möchte ich gleich vorwegnehmen, damit wir uns den technischen Details widmen können.

Dies ist eine sehr vorläufige Zeitplananalyse. Wenn mich Leute fragen, wann Pectra stattfinden wird, sage ich, dass es noch zu früh ist, um das zu sagen – denn das ist die Wahrheit. Pectra befindet sich noch in einem sehr frühen Entwicklungsstadium. Die Spezifikationen ändern sich, und der Umfang von Pectra ist noch nicht wirklich endgültig festgelegt worden.

Durch diesen Prozess kann man unter anderem lernen, wie Upgrades entwickelt, wie sie getestet werden und wie sie schließlich ins Mainnet gelangen. Zunächst entscheiden sich die Entwickler für einige EIPs, die in ein Upgrade aufgenommen werden sollen, und implementieren diese EIPs dann in private, auf Entwickler ausgerichtete Testnetze (Testnets), die Devnets genannt werden. Die Entwickler haben bereits einige Devnets für Pectra gestartet, sodass diese EIPs bereits einige Implementierungsrunden durchlaufen haben. Die Entwickler haben Randfälle und Fehler bemerkt, die sie beheben möchten, und sie iterieren an diesen EIPs, indem sie neue Devnets starten. Devnet 4 wurde letzten Monat im Oktober gestartet.

Das passiert normalerweise nicht, aber die Entwickler haben – ganz speziell für diese gesamte Konferenz und für alle im Publikum – diesen Monat das erste öffentliche Pectra-Testnetz gestartet. Es heißt Mekong, sodass Sie schon frühzeitig mit einigen der EIPs interagieren können, die in Pectra enthalten sein werden. Es basiert auf den Spezifikationen von Devnet 4, aber bitte beachten Sie, dass sich diese Spezifikationen noch ändern.

Es gibt eine Liste von Spezifikationsänderungen an den EIPs, die die Entwickler bereits in das Pectra-Devnet 5 aufnehmen möchten – Dinge wie die Preisanpassung der BLS-Vorkompilierung und ein neues EIP, das noch nicht in Devnet 4 implementiert wurde, das die Entwickler aber für Devnet 5 oder ein zukünftiges Upgrade implementieren möchten. Die Pectra-Spezifikationen ändern sich also. Ich gehe davon aus, dass noch mehrere weitere Devnets folgen werden, bevor die Spezifikationen wirklich eingefroren werden können.

Der andere Teil, der für das Pectra-Upgrade auf seinem Weg ins Mainnet wirklich wichtig ist, ist, dass der Umfang endgültig festgelegt wird – dass über alle EIPs, die in Pectra einfließen, entschieden wird. Es gibt ein EIP – es ist eigentlich noch kein EIP –, aber es ist die Erhöhung der Blob-Kapazität, die die Entwickler noch nicht formell in Pectra aufgenommen haben. Es scheint jedoch wahrscheinlich, dass sie eine Art Erhöhung der Blob-Kapazität aufnehmen werden, da sie kürzlich ein EIP aufgenommen haben, das einen Mechanismus einführt, um das Blob-Gas-Ziel und das Blob-Gas-Maximum dynamisch über die Konsensschicht zu aktualisieren, anstatt diese Parameter in der Ausführungsschicht und der Konsensschicht fest zu codieren.

Sobald der Umfang endgültig festgelegt ist, beginnt man mit dem Testen der neu implementierten EIPs – dem vollen Umfang des Pectra-Upgrades – und testet sie auf ein paar weiteren Devnets auf Herz und Nieren. Ich stelle mir vor, vielleicht bis Devnet 6 oder 7. Und sobald die Pectra-Spezifikationen eingefroren und startklar sind – alle Randfälle, die Entwickler auf Devnets finden können, wurden gefunden –, werden sie das Pectra-Upgrade auf öffentlichen Ethereum-Testnetzen veröffentlichen. Derzeit gibt es zwei: Sepolia und Holesky.

In der Vergangenheit haben die Entwickler etwa zwei Wochen zwischen öffentlichen Testnetz-Upgrades eingeplant. In seltenen Fällen haben die Entwickler diesen Zeitrahmen auf nur eine Woche zwischen den Testnetzen verkürzt, aber aufgrund der Größe von Pectra kann ich mir vorstellen, dass die Entwickler die volle Zeit in Anspruch nehmen wollen. Ich plane grob etwa einen Monat für Sepolia und Holesky ein, und danach kann endlich die Mainnet-Aktivierung erfolgen.

Angesichts aller Informationen, die ich derzeit habe, und der Fortschritte, die die Entwickler bisher bei Pectra gemacht haben, ist meine beste Analyse und Schätzung, dass das Pectra-Mainnet realistischerweise im nächsten April 2025 stattfinden wird. Auch dies ist sehr vorläufig, da sich noch viel ändern kann. Die Entwicklung findet von Woche zu Woche statt – Entwickler sprechen in diesen ACD-Anrufen über diesen Fehler, den sie in diesem EIP nicht erwartet haben, oder über dieses neue EIP, das sie zu Pectra hinzufügen möchten.

#### EIPs der Ausführungsschicht (6:23) {#execution-layer-eips-623}

Kommen wir zum Kern dieses Vortrags – was in das Pectra-Upgrade einfließt. Es gibt zehn EIPs, die in Pectra einfließen, und vier davon konzentrieren sich auf die Ausführungsschicht.

**EIP-2537** ist eine neue Vorkompilierung in die EVM – BLS12-381-Kurvenoperationen. Dies ist ein neues kryptographisches Signaturschema, nach dem Smart-Contract-Entwickler schon sehr lange gefragt haben. Dieses EIP wurde 2020 erstellt, und damals sagten Entwickler von dezentralen Anwendungen (Dapps), dass sie es wirklich wollten, weil es bestimmten Dapps, die auf Zero-Knowledge-Kryptographie basieren, stärkere Garantien für die Privatsphäre, potenziell erhöhte Sicherheit und Skalierbarkeit geben würde. BLS-Signaturen sind auch die Aggregation, die auf der Konsensschicht für Validator-Attestierungen stattfindet. Dieses EIP war lange überfällig. Eine der Bedenken ist: Gibt es noch Apps, die auf die BLS-Vorkompilierung warten, und werden sie sie nutzen, wenn sie live geht? Aber falls Sie hier im Publikum sitzen und nicht wussten, dass die BLS-Vorkompilierung endlich kommt – sie kommt.

**EIP-2935** – Bereitstellung historischer Block-Hashes aus dem Zustand. Dieses EIP führt eine Änderung an der Ausführungsschicht ein, sodass Beweise für historische Blöcke aus dem Zustand generiert werden können. Es hat einige kurzfristige Vorteile für die Synchronisierung von Light-Clients und für Smart Contracts, die möglicherweise Daten über den Zustand eines vorherigen Blocks direkt über die EVM nutzen möchten – das ist derzeit eigentlich nicht möglich. Aber diese kurzfristigen Vorteile sind nicht der Hauptgrund, warum dieses EIP in Pectra aufgenommen wurde. Der Hauptgrund ist, dass es eine Voraussetzung für Verkle ist – die umfassende Überarbeitung der Zustandsdatenstruktur von Ethereum. Die Entwickler hatten gedacht, dass dieser Übergang direkt nach Pectra stattfinden würde, aber Verkle wird nicht in Fusaka einfließen. Sie haben es auf ein anderes Upgrade verschoben, aber dieser Zwischenschritt wurde bereits von der Liste abgehakt.

**EIP-7685** – allgemeine Anfragen der Ausführungsschicht. Dieses EIP führt nicht wirklich neue Funktionen in Ethereum ein – es ist ein EIP zur Unterstützung anderer EIPs in Pectra. In Pectra gibt es einige EIPs, bei denen die Ausführungsschicht in der Lage sein wird, viel mehr Nachrichten – verschiedene Arten von Nachrichten – an die Konsensschicht weiterzuleiten, was sie vorher nicht konnte. Smart Contracts auf der Ausführungsschicht werden in der Lage sein, Validator-Abhebungen, Konsolidierungen und Einzahlungen auszulösen. Anstatt diese neuen Kommunikationskanäle alle auf eine separate, einzigartige Weise zu implementieren, schafft dieses EIP eine verallgemeinerte Struktur – einen verallgemeinerten Bus –, um diese Anfragen aufzunehmen. Es wird einfacher zu testen, einfacher über Clients hinweg zu implementieren und einfacher zu standardisieren sein, insbesondere wenn Entwickler neue Arten von durch die Ausführungsschicht auslösbaren Anfragen einführen möchten.

**EIP-7702** – Code für extern besessene Konten (EOAs) festlegen. Ein neuer Transaktionstyp kommt zu Ethereum. Dieser Transaktionstyp wird einem EOA vorübergehend mehr Flexibilität verleihen und Funktionen wie Transaktionsbündelung, gesponserte Transaktionen, bedingte Transaktionen und delegierte Sicherheit ermöglichen. Sie denken vielleicht: „Wird hier die Vision der Kontoabstraktion auf Ethereum lebendig?“ Nein, das ist es nicht – es ist ein kleiner Schritt. Es ist ein früher Schritt, um zu sehen, wie die echte Roadmap zur wahren nativen Kontoabstraktion auf Ethereum aussehen könnte. Es gab eine ziemliche Debatte darüber, wie die Entwickler diesen ersten Schritt machen sollten, und viel Kontroverse um die Aufnahme dieses EIPs und sein Design – aber es ist drin.

#### EIPs der Konsensschicht (12:00) {#consensus-layer-eips-1200}

Es gibt sechs weitere – dies sind EIPs der Konsensschicht.

**EIP-7742** – Entkopplung der Blob-Anzahl zwischen der Konsensschicht und der Ausführungsschicht. Dies ist das jüngste EIP, das in Pectra aufgenommen wurde. Derzeit ist die Blob-Kapazität in der Ausführungsschicht und der Konsensschicht in all den verschiedenen Clients fest codiert. Die Aktualisierung dieser festen Codierung ist nicht so einfach, wie manche vielleicht denken. Die Schaffung eines Mechanismus zur dynamischen Einstellung der Blob-Kapazität über die Konsensschicht wird sicherstellen, dass Entwickler in Zukunft die Blob-Kapazität von Ethereum leicht ändern können und dass ein solches Upgrade nur Änderungen an der Konsensschicht erfordert – nicht an beiden Schichten.

**EIP-6110** – Bereitstellung von Validator-Einzahlungen Onchain. Der Merge hat stattgefunden und Ethereum ist als Proof-of-Stake-Blockchain ausgereifter. Bestimmte Sicherheitsannahmen können nun gelockert werden. Dieses EIP entfernt eine zusätzliche Abstimmungsrunde, die auf Seiten der Konsensschicht jedes Mal stattfindet, wenn Sie 32 ETH in den Einzahlungsvertrag einzahlen, und stellt sicher, dass die gesamte Einzahlungsvalidierung auf der Ausführungsschicht stattfindet. Dies hat Vorteile für die Benutzererfahrung (UX) der Validatoren – es wird die Zeit zwischen der Einzahlung Ihrer 32 ETH und dem Zeitpunkt verkürzen, an dem Sie sehen, dass der Validator tatsächlich auf der Beacon Chain aktiviert wird.

**EIP-7002** – durch die Ausführungsschicht auslösbare Abhebungen. Das ist sehr gut für Staking-Pools. Wenn Sie derzeit einen Validator vollständig abheben möchten, muss der Knotenbetreiber, der diesen Validator betreibt, seinen Abhebungsschlüssel verwenden, um den Austritt des Validators vollständig durchzuführen. Durch dieses EIP werden Smart Contracts in der Lage sein, diese vollständigen Abhebungen zu initiieren. Es ist eine Vertrauensannahme, die Sie nun aus Staking-Pools entfernen können – Pools wie Lido, Rocket Pool und andere auf Smart Contracts basierende Staking-Pools können nun vollständige Abhebungen von Validatoren auslösen, wenn sie dies wünschen.

**EIP-7251** – Erhöhung des maximalen effektiven Guthabens (MaxEB). Das ist wirklich ein Problem. Als die Entwickler über die Beacon Chain nachdachten, erwarteten sie nicht, dass die Menge der Validatoren so schnell wachsen würde – wir sind bei etwa 1,2 oder 1,3 Millionen Validatoren. Es gibt viele aktive Validatoren, viele Nachrichten, die auf der Netzwerkschicht weitergeleitet werden, und es ist zu viel. Es belastet die Knoten, und wenn es unkontrolliert bliebe, wäre es ein großes Problem für die Gesundheit von Ethereum. EIP-7251 wurde entwickelt, um Validatoren zu ermutigen, ihre ETH zu konsolidieren und ein maximales effektives Guthaben von mehr als 32 ETH zu haben, wodurch die Anzahl der aktiven Validatoren auf Ethereum reduziert wird.

**EIP-7549** – Verschiebung des Komitee-Index außerhalb der Attestierung. Dies ist eine Umstrukturierung und ein Refactoring der Art und Weise, wie Attestierungen aggregiert werden, um die Netzwerkbelastung auf Ethereum zu reduzieren und Knoten-Bandbreite zu sparen. Als die Entwickler dies in Pectra aufnahmen, dachten sie, es sei eine großartige Änderung mit wunderbaren Vorteilen und eine einfache dazu – aber in der Praxis erwies sich die Implementierung als viel schwieriger als erwartet.

#### Zusammenfassung (17:19) {#summary-1719}

Pectra ist eine bunte Mischung aus Updates. Es wird drei Dinge tun: Erstens, kritische Mängel von Ethereum als Proof-of-Stake-Blockchain beheben – denken Sie an MaxEB, das ist eine kritische Lösung, da die Größe der Validator-Menge sonst unkontrolliert weiter wachsen kann. Zweitens, die Benutzererfahrung verbessern – der neue Transaktionstyp, flexiblere Designs, einige Verbesserungen für vertrauenslosere Designs für Staking-Pools. Und drittens, die Datenverfügbarkeitskapazität von Ethereum erhöhen – das wurde noch nicht formell in Pectra aufgenommen, scheint aber wahrscheinlich.

#### Aus Pectra entfernte EIPs (18:02) {#eips-removed-from-pectra-1802}

Hier sind alle EIPs, die aus Pectra entfernt wurden. Es ist eine Art Premiere für ein Upgrade, dass so viele EIPs entfernt wurden.

**PeerDAS** – ursprünglich sollte es in Pectra eine viel größere Erhöhung der Datenverfügbarkeitskapazität geben. PeerDAS würde es Entwicklern ermöglichen, das Blob-Ziel von Ethereum um ein Vielfaches zu erhöhen, ohne den Bandbreitenverbrauch und die Rechenanforderungen für den Betrieb eines Ethereum-Knotens stark zu beeinträchtigen. Aber es befindet sich noch in der Forschungs- und Entwicklungsphase.

**EOF** – das EVM Object Format. Diese elf Codeänderungen als Bündel sind ein großes Update für die Ethereum-EVM. Sowohl PeerDAS als auch EOF waren ursprünglich wirklich in Pectra enthalten, wurden aber auf separaten Devnets getestet. Die Entwickler dachten, sie würden viel mehr Zeit benötigen, um für die Mainnet-Aktivierung bereit zu sein, und sie wollten die anderen Pectra-EIPs nicht verzögern. Also sagten sie, dass PeerDAS und EOF eindeutig mehr Zeit benötigen – sie werden sie auf ein anderes Upgrade verschieben und die anderen Pectra-EIPs nicht vom Mainnet zurückhalten.

Diese wurden nun auf Fusaka verschoben. Verkle war ursprünglich für Fusaka vorgesehen, wurde aber inzwischen weiter verzögert. EOF und PeerDAS sind vorerst in Fusaka. Es gibt andere EIPs, die die Entwickler für die Aufnahme in Fusaka überdenken werden – den SSZ-Übergang, Inklusionslisten, Änderungen an der Emission, Historienverfall, ePBS und die Richtung der Kontoabstraktion.

#### Fragen und Antworten (22:02) {#qa-2202}

**Moderator:** Wann kommt EOF?

**Christine Kim:** Ich habe buchstäblich gerade gesagt, dass die Entwickler versuchen werden, es in Fusaka aufzunehmen. Halte ich das für wahrscheinlich? Wahrscheinlich nicht. Glaube ich, dass Fusaka im Jahr 2025 stattfinden wird? Absolut nicht. Die Zeit, die es gedauert hat, Pectra vorzubereiten – Fusaka wird eine ähnliche, wenn nicht sogar längere Zeit in Anspruch nehmen.

**Moderator:** Gibt es einen Notfallplan zur Erhöhung des Blob-Ziels zwischen jetzt und der Pectra-Aktivierung?

**Christine Kim:** Nein. Das Blob-Ziel ist ein fest codierter Parameter in der Ausführungsschicht und der Konsensschicht. Damit sich die Blob-Kapazität ändert, müssen die Entwickler einen Hard Fork durchführen. Ich glaube nicht, dass es eine Möglichkeit gibt, die Blob-Kapazität zwischen jetzt und Pectra ohne einen Hard Fork zu erhöhen.

**Moderator:** Bezieht sich der Vorschlag nur auf die Änderung des Blob-Limits oder auch auf das Blob-Ziel?

**Christine Kim:** Tolle Frage. Die konservativste Erhöhung ist drei auf vier – nur das Ziel ändern, das Maximum überhaupt nicht ändern. Aber das ist nicht das, worum Layer-2-Entwickler (L2) gebeten haben. Es gibt einen Vertreter des Base-Teams – dem Base-Team von Coinbase – und er hat sich für aggressivere Erhöhungen eingesetzt. Er hat Daten vorgelegt, die darauf hindeuten, dass die Erhöhung die Dezentralisierung von Ethereum nicht negativ beeinflussen würde. Es gibt einen konservativen Vorschlag, nur das Ziel zu ändern, und dann gibt es einen ehrgeizigeren Vorschlag, sowohl das Maximum als auch das Ziel zu ändern – wie acht und vier oder sechs und zwölf. Es gibt verschiedene Abstufungen.

**Moderator:** Sie haben die Leute gedrängt, sich mehr in die Governance einzubringen. Wie kann sich die Community stärker beteiligen?

**Christine Kim:** ETH Research und ETH Magicians sind zwei wirklich großartige Diskussionsforen, um bestimmte EIPs hochzuwählen und Ihre Unterstützung zu zeigen. Die ACD-Anrufe sind wahrscheinlich der Ort mit der höchsten Signalwirkung – alles, was Sie tun müssen, ist, einen Kommentar auf der Agenda des ACD-Anrufs auf GitHub zu hinterlassen und zu sagen, dass dies ein EIP ist, über das Sie sprechen oder das Sie präsentieren möchten. Der Moderator des Anrufs ist normalerweise sehr bereit, Ihnen die Zeit zu geben. Nehmen Sie jedoch nicht zu viel Zeit in Anspruch – vielleicht fünf Minuten, um Ihren Standpunkt darzulegen.