---
title: "Ethereum Pectra-Upgrade: Was Staker wissen müssen"
description: "Erklärung des Pectra-Upgrades aus der Perspektive eines Stakers, einschließlich der praktischen Auswirkungen auf Validatoren, Staking-Operationen und die wichtigsten EIPs, die das Staking im Ethereum-Protokoll beeinflussen."
lang: de
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "Roadmap"
  - "Pectra"
  - "Staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra für Staker"
---

Ein von **Blockdaemon** veranstaltetes Webinar mit der Blockchain-Ingenieurin Julia Schmidt (Alluvial) und Freddy Tänzer (Blockdaemon), in dem diskutiert wird, wie sich das Pectra-Upgrade auf das ETH-Staking auswirkt. Das Webinar behandelt über die Ausführungsschicht auslösbare Abhebungen, Erhöhungen des maximalen effektiven Guthabens, Validator-Konsolidierung und die Auswirkungen auf das Liquid Staking.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=_UpAFpC7X6Y), das von Blockdaemon veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

**Host:** Hallo und willkommen zu diesem von Blockdaemon veranstalteten Webinar, das sich auf das bevorstehende Pectra-Upgrade von Ethereum konzentriert. Heute bei uns sind Julia Schmidt, Blockchain-Ingenieurin bei Alluvial, und Freddy Tänzer, Leiter des Ethereum-Ökosystems bei Blockdaemon, um zu diskutieren, wie sich die Änderungen von Pectra auf das ETH-Staking, das gesamte Netzwerk, Liquid-Staking-Dienste und mehr auswirken werden. Um den Anfang zu machen, Freddy – könntest du uns einen kurzen Überblick über das Pectra-Upgrade geben und welche Auswirkungen es auf Staker haben wird?

#### Was ist Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Pectra ist also ein Ethereum-Upgrade, das für Ende des ersten Quartals 2025 geplant ist – etwa im März, könnte sich ein wenig nach hinten verschieben, vielleicht April oder so. Es sollte anfangs eigentlich ein kleiner Fork sein, und dann kamen immer mehr Dinge hinzu, sodass sie ihn jetzt tatsächlich in zwei Teile aufgeteilt haben.

Der erste Teil enthält viele Dinge – zum Beispiel in Bezug auf Smart Accounts, Kontoabstraktion und ähnliche Dinge –, aber ich möchte mich wirklich auf die Dinge konzentrieren, die für unser Publikum in Bezug auf die Staking-Änderungen relevant sind. Es gibt hauptsächlich zwei große.

Die erste ist die Tatsache, dass man Abhebungen und Austritte aus seinem Validator über die Ausführungsschicht auslösen kann – die Auszahlungsberechtigungen –, was im Grunde die Abhängigkeit vom Knotenbetreiber beseitigt. Die zweite, in ihrer Wirkung wohl noch größere, ist, dass sich das maximale effektive Guthaben eines Validators nun ändern kann. Früher waren es nur 32 ETH als fester Betrag, und jetzt kann es irgendwo zwischen 32 und 2.048 ETH liegen.

Es gibt auch eine kleinere Änderung, die im Grunde dazu führt, dass Einzahlungen viel schneller sind – onchain registriert von etwa 14 Stunden auf weniger als eine Stunde –, aber diese beiden sind meiner Meinung nach die relevantesten für unsere Diskussion hier.

#### EIP-7002: Über die Ausführungsschicht auslösbare Austritte (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Host:** Zur ersten großen Änderung, Julia, könntest du erklären, wie sich der Prozess nach Pectra im Vergleich zu den aktuellen Methoden ändern wird, mit denen Abhebungen im Staking-Ökosystem von Ethereum initiiert werden?

**Julia Schmidt:** Um Blöcke vorzuschlagen und zu attestieren, muss der Validator ständig online sein und ein gestaktes Guthaben von 32 ETH aufweisen. Wenn man einen Validator einrichtet, um am Konsensmechanismus teilzunehmen, richtet man zwei Schlüssel ein. Der eine ist der Validator-Schlüssel, der verwendet wird, um die Validator-Aufgaben auszuführen – das Signieren von Block-Attestierungen. Der zweite ist der Abhebungsschlüssel, der das Eigentum an den gestakten ETH repräsentiert.

Es gibt zwei Möglichkeiten des Stakings: Solo Staking oder Multi-Custodial-Setups wie bei Blockdaemon und wie wir es bei Liquid Collective machen, wo man seinen Knotenbetreiber auswählen kann, der alle Validator-Aufgaben und Validator-Operationen in seinem Namen übernimmt. Dadurch erhalten sie den Validator-Schlüssel, und man selbst hat nur Zugriff auf den Abhebungsschlüssel.

Die eigentliche Nachricht zum Austritt eines Validators kann nur vom Validator-Schlüssel gesendet werden, der vom Knotenbetreiber kontrolliert wird. Das erfordert, dass man seinem Knotenbetreiber vertraut – dass man sich darauf verlässt, dass er den Validator für einen austreten lässt. Wenn sie es tun, ist das großartig, aber man muss sich immer auf diese dritte Partei verlassen.

Was bisher geschah, war, dass man zustimmte, Austritts-Nachrichten vorab zu signieren, wenn man dieses Multi-Custodial-Staking-Setup einrichtete. Man erhielt eine Nachricht, die man später verwenden konnte, um seinen Validator austreten zu lassen, aber man wusste nicht, ob die Austritts-Nachricht tatsächlich funktionieren würde. Jedes Mal, wenn es ein Upgrade in Ethereum gab, das die Versionsnummer änderte, funktionierte die Austritts-Nachricht möglicherweise nicht mehr.

Beim letzten Dencun-Upgrade änderte ein neues EIP die Ablaufzeit dieser Austritts-Nachrichten – aber das behandelte nur das Symptom und löste nicht das Problem. Das eigentliche Problem ist, dass der Eigentümer der gestakten ETH die Abhebung nicht auslösen kann. Die Gelder können im Grunde vom Knotenbetreiber als Geisel gehalten werden.

Dies wird nun mit EIP-7002 gelöst, das es sowohl dem Validator-Schlüssel als auch dem Abhebungsschlüssel ermöglicht, den Austritt über die Ausführungsschicht auszulösen – einfach durch das Senden einer Transaktion an einen speziellen Abhebungs-Vertrag, an den man eine Abhebungsanfrage sendet und entweder einen vollständigen Austritt des Validators oder eine teilweise Abhebung vom gestakten Guthaben angibt.

#### EIP-7251: maximales effektives Guthaben (4:15) {#eip-7251-max-effective-balance-415}

**Host:** Freddy, könntest du uns einen Überblick über das maximale effektive Guthaben ab Pectra geben und wie sich dies auf Leute auswirken wird, die derzeit staken?

**Freddy Tänzer:** Nur zur Ergänzung – für unsere institutionellen Kunden wurde diese Abhängigkeit vom Knotenbetreiber in der Regel mit vorab signierten Austritts-Nachrichten angegangen, hauptsächlich um Bedenken von Aufsichtsbehörden oder Bedenken hinsichtlich der Geschäftskontinuität auszuräumen. Sie mussten diese Austritts-Nachrichten auch sicher aufbewahren. Es gibt also eine klare Vereinfachung des Prozesses, die diese Abhängigkeit beseitigt.

Nun zum maximalen effektiven Guthaben: Viele Dinge ändern sich nicht, und all dies ist optional (Opt-in). Man muss nichts ändern. Das Ziel der Ethereum-Kernentwickler und des gesamten Ökosystems ist es, die Anzahl der Validatoren im Netzwerk zu reduzieren. Wir haben jetzt über eine Million Validatoren, und jeder muss mit anderen über Attestierungen und den Konsens kommunizieren. Das ist eine Menge Netzwerkverkehr – Tests haben gezeigt, dass das Erreichen von zwei Millionen Validatoren ein Problem darstellen könnte.

Das Ziel ist es, die Anzahl der Validatoren zu reduzieren, ohne die Sicherheit des Netzwerks zu beeinträchtigen – da die Gesamtmenge der gestakten ETH konstant bleiben würde, nur durchschnittlich mehr ETH pro Validator.

Für den Kunden bedeutet das hauptsächlich, dass er entscheiden muss, ob er den neuen Validator-Typ oder den alten verwenden möchte. Dies hängt von seinem Liquiditätsbedarf ab. Im aktuellen Setup mit 32-ETH-Validatoren werden die Protokollbelohnungen alle neun oder zehn Tage an die Auszahlungsberechtigungen gesendet, was einem regelmäßige Liquidität verschafft.

Aber viele Setups gehen davon aus, dass Belohnungen verwendet werden, um den Stake zu reinvestieren. In der Vergangenheit musste man beim Reinvestieren warten, bis man 32 ETH an Belohnungen hatte, um manuell einen neuen Validator zu starten. Mit dem neuen Validator-Typ werden die Belohnungen automatisch reinvestiert (Auto-Compounding) – das bedeutet mehr Belohnungen und weniger Arbeit.

Der Kompromiss besteht darin, dass man Belohnungen nicht regelmäßig erhält und einen Prozess einrichten muss, um sie abzurufen. Abhebungsauslöser sind jetzt reguläre Transaktionen, für die eine Gasgebühr anfällt, anstatt Belohnungen im alten Modell kostenlos zu erhalten.

Es gibt auch gute Neuigkeiten zum Slashing: Die anfängliche Slashing-Strafe wird drastisch sinken – um etwa das 128-fache. Bei einem 32-ETH-Validator betrug die anfängliche Strafe einen ETH. Nach Pectra wird es ein Bruchteil eines ETH sein – vielleicht 20 oder 25 Dollar. Dies hat positive Nebeneffekte auf das Solo Staking, was offensichtlich wichtig für die glaubwürdige Neutralität von Ethereum ist.

Der Vorteil des Auto-Compoundings kommt hauptsächlich kleineren Stake-Beträgen zugute. Wenn man tausend Validatoren hat, könnte man monatlich manuell einen neuen starten. Aber wenn man nur einen Validator hat, müsste man praktisch 32 Jahre warten, um zu reinvestieren.

#### Auswirkungen auf das Liquid Staking (11:25) {#liquid-staking-implications-1125}

**Host:** Julia, wie verhält sich die Konsolidierung größerer Validatoren im Vergleich zu den Vorteilen des Liquid Stakings? Wie werden diese Entscheidungen im Kopf eines Stakers nach Pectra abgewogen?

**Julia Schmidt:** Bei Alluvial haben wir diese Änderungen genau verfolgt und möchten beide Lösungen anbieten. Die Konsolidierungsanfragen in Pectra sind eine Zwischenlösung, die die Verdienstzeit des effektiven Guthabens nicht beeinträchtigen sollte – es muss bei der Konsolidierung mehrerer Validatoren nicht erneut durch eine Aktivierungs-Warteschlange gehen. Der Prozess verläuft ziemlich reibungslos.

Die Tatsache, dass die anfängliche Slashing-Strafe gesenkt wurde, verringert das Risiko, Validatoren mit hohem Guthaben zu betreiben. Der Vorstoß der Ethereum Foundation zielt wirklich darauf ab, so viel wie möglich zu konsolidieren, um die Netzwerkbelastung zu reduzieren. Es gibt einen kleinen Nachteil: In dem sehr seltenen Fall, dass ein Validator mit einem maximalen effektiven Guthaben von 2.048 ETH geslasht wird, würde er in die Austritts-Warteschlange gelangen und die Gelder wären für eine längere Zeit gesperrt – es wäre so, als würden 64 Validatoren auf einmal geslasht. Daher würden wir versuchen, flexible Validator-Obergrenzen entsprechend der Risikobereitschaft des Kunden anzubieten.

Auf der Nutzenseite fügt ein Liquid-Staking-Token (LST) offensichtlich Liquidität hinzu – selbst bei teilweisen Abhebungen über die Ausführungsschicht wird dies nicht sofort geschehen. Man reicht die Transaktion ein, sie wird in die Warteschlange gestellt, dann gibt es die Austritts-Epoche und die Abhebungs-Epoche. Liquid-Staking-Token bieten weiterhin sofortige Liquidität, die teilweise Abhebungen nicht bieten können.

#### Nächste Schritte für Staker (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Was wir sehen, ist, dass Finanzinstitute typischerweise zwischen 65 % und 85 % ihrer verwahrten ETH staken würden, da sie den Rest als Liquiditätspuffer für Rücknahmen benötigen. Mit Liquid Staking kann man potenziell die Menge der gestakten ETH erhöhen, was höhere Belohnungen generiert.

Beide Seiten profitieren von Pectra – das Liquid Staking erhält die Option für Abhebungen über die Ausführungsschicht, und das traditionelle Staking profitiert von der Beseitigung des 32-ETH-Schritt-Problems, insbesondere bei kleineren Stakes.

**Julia Schmidt:** Mit dem Liquid Collective-Protokoll bieten wir Staking nicht nur bei einem Knotenbetreiber an – wir haben ein Konsortium verschiedener Knotenbetreiber, denen wir Stakes in einem Round-Robin-Verfahren zuweisen. Das erhöht die Dezentralisierung der gestakten ETH. Und diese Knotenbetreiber befolgen den NORS (Node Operator Risk Standard), sodass wir auch eine Absicherung im Falle eines Slashings garantieren.

Ein wesentlicher Vorteil, den ich noch nicht angesprochen habe, sind die teilweisen Abhebungen – da man nun gestakte ETH über die Ausführungsschicht abheben kann, eröffnet dies neue Wege für Protokolle wie EigenLayer, Abhebungen und Austritte auszulösen. Es gibt eine enorme Zunahme an Funktionalität und Interoperabilität, die Dezentralisierte Finanzen (DeFi) nun besser in den gesamten Validator-Lebenszyklus integrieren können, von der Einzahlung bis zum Austritt. Als Blockchain-Ingenieurin ist es aufregend, den gesamten Workflow automatisieren zu können.

#### Abschluss (19:50) {#closing-1950}

**Host:** Julia, wo können die Leute mehr über Liquid Collective und Alluvial erfahren?

**Julia Schmidt:** Man kann Alluvial und Liquid Collective auf Twitter, auf X, auf LinkedIn oder auf der Alluvial-Website folgen. Wir werden einen Artikel veröffentlichen, der die Änderungen im Zusammenhang mit dem Pectra-Upgrade detailliert beschreibt und wie sie sich auf die Ethereum-Landschaft auswirken werden.

**Host:** Freddy, gibt es Neuigkeiten zu Pectra, die du teilen möchtest?

**Freddy Tänzer:** Da kommt noch einiges auf uns zu. Wir werden eine spezielle Seite auf unserer Website, blockdaemon.com, haben – sie wird der zentrale Knotenpunkt für alle Ressourcen sein. Wir werden einen Blogbeitrag, ein FAQ sowie einige Anleitungen und Modellierungsempfehlungen dazu haben, welche Art von Validator man wählen sollte und in welcher Größe. Ob man einen 2.000-ETH-Validator möchte, oder zwei mit 1.000, oder vier mit 500 – all dies ist grundsätzlich möglich, und es müssen Kompromissentscheidungen getroffen werden. Wir werden unseren Kunden helfen, sich dabei zurechtzufinden.

**Host:** Fantastisch. Freddy, Julia, vielen Dank für eure Zeit heute – eine faszinierende Diskussion und eine großartige Einführung in Pectra.