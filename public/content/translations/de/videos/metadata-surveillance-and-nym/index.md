---
title: "Spezial zum Datenschutztag - Metadaten-Überwachung und Nym"
description: "Ein Gespräch zum Datenschutztag über Metadaten-Überwachung: Was Metadaten über Sie verraten, selbst wenn Nachrichteninhalte verschlüsselt sind, und wie Privatsphäre-Tools auf Netzwerkebene wie Nym funktionieren, um diese zu schützen."
lang: de
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Privatsphäre"
---

Ein Beitrag von **Nym** mit der leitenden Wissenschaftlerin von Nym, Claudia Diaz, der die Mechanismen von Metadaten, ihre entscheidende Rolle in der modernen Überwachung, die persönlichen Details, die sie preisgeben, und die Schritte, die wir unternehmen können, um unsere Privatsphäre zurückzugewinnen, untersucht.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=QBX5AK3DXqw), das von Nym veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Intro (0:04) {#intro-004}

Was sind Kommunikations-Metadaten? Das bezieht sich auf alles an einer Kommunikation, was nicht der Inhalt dessen ist, was tatsächlich gesagt wird. Dazu gehören beispielsweise der Ursprung der Kommunikation, das Ziel, die Zeit, zu der die Informationen gesendet werden, wie viele Informationen gesendet werden, und alle erkennbaren Muster, einschließlich der Zeitpunkte und Größen der ausgetauschten Pakete.

#### Kommunikations-Metadaten (0:27) {#communications-metadata-027}

Kommunikations-Metadaten werden standardmäßig in allen Internetprotokollen offengelegt: TCP/IP, HTTP, UDP, FTP. Selbst sichere Protokolle wie TLS oder sicheres DNS, die den Inhalt mit Ende-zu-Ende-Verschlüsselung schützen, zeigen weiterhin die Kommunikations-Metadaten: Ursprung, Ziel, Zeitpunkt, Länge und so weiter.

Diese Informationen sind also offengelegt, aber für wen? Wer kann sie erhalten?

#### Wer Zugriff auf Metadaten erhält (1:10) {#who-gets-access-to-metadata-110}

Es gibt eine Reihe von Entitäten, die als Vermittler in der Internetkommunikation fungieren und auf diese Kommunikations-Metadaten zugreifen können. Dazu gehören große Akteure in der Internetinfrastruktur, wie Internetdienstanbieter, Knotenpunkte, autonome Systeme, BGP-Router und generell Teilnehmer am Internet-Backbone; sie können Zugang zu einer Menge Kommunikations-Metadaten erhalten. 

Aber auch kleine Akteure, wie der Betreiber des WLAN-Routers oder eines lokalen Netzwerks, oder jemand, der in der Lage ist, lokal mitzuhören, erhalten ebenfalls Zugriff auf die Kommunikations-Metadaten. Und natürlich ist bekannt, dass staatliche Akteure wie die NSA Metadaten in großem Maßstab sammeln und analysieren, um alle Arten von Geheimdienstinformationen zu gewinnen.

#### Warum Metadaten wichtig sind (2:00) {#why-is-metadata-important-200}

Es gibt noch weitere Gründe, warum Metadaten eine sehr interessante Art von Daten sind, um sie zu sammeln und auszuwerten. Sie sind maschinenlesbar, weil sie die Sprache der Computer sprechen; es ist im Grunde die Sprache für Computer, um Kommunikationen ordnungsgemäß von ihrer Quelle zu ihrem Ziel leiten zu können. Sie sind also maschinenlesbar, und das bedeutet, dass Maschinen sie in großem Maßstab sehr leicht verstehen können, im Gegensatz zur natürlichen menschlichen Sprache, die viel schwieriger zu interpretieren ist, weil Menschen Wörter vielleicht auf eine bestimmte Weise verwenden oder Nuancen haben, was viel schwerer zu interpretieren ist. Metadaten hingegen sind wirklich einfach.

Sie haben auch ein viel geringeres Volumen als der Inhalt. Wenn man zum Beispiel an ein YouTube-Video denkt, kann der Inhalt selbst mehrere Gigabyte groß sein, aber die Metadaten würden nur umfassen, wie die URL des Videos lautet, wie viele Bytes es enthält und zu welcher Zeit es angesehen wurde. Es kann also viel weniger sein als der eigentliche Inhalt, und es ist auch in Bezug auf die Größe handhabbar.

Metadaten haben auch einen viel geringeren Schutz als Inhalte. Es ist nicht legal, einfach die Kommunikation von Menschen abzufangen und in den Inhalt zu schauen, dies ist gesetzlich geschützt. Aber Metadaten haben, weil sie nicht als ganz so sensibel gelten, einen viel geringeren Schutz. Daher können viele Entitäten diese Metadaten legal sammeln und analysieren, um Informationen darüber zu erhalten, was Menschen im Internet tun.

Ist das also eine große Sache? Wir könnten sagen: „Nun, es sind nur Metadaten. Solange du nicht weißt, was ich sage, sollte ich mir wirklich Sorgen machen, dass du weißt, mit wem ich spreche und zu welcher Zeit?“ 

Es gibt ein paar Zitate, die zeigen, wie Metadaten tatsächlich als extrem wertvoll angesehen werden. Der Chefjustiziar der NSA, Stewart Baker, sagte, dass Metadaten einem absolut alles über das Leben von jemandem verraten – wenn man genug Metadaten hat, braucht man eigentlich keinen Inhalt. So mächtig sind sie, wenn es darum geht zu verstehen, wofür sich jemand interessiert, wer sein soziales Netzwerk ist, was seine Hobbys sind, was seine Absichten sind, was seine Interessen sind. Man muss eigentlich nicht hören, was sie sagen; es reicht aus, dass man in der Lage ist, alle Metadaten zu beobachten.

Und Whitfield Diffie und Susan Landau sagen in ihrem Buch *Privacy on the Line*, dass die Verkehrsanalyse, nicht die Kryptoanalyse, das Rückgrat der Kommunikationsaufklärung ist. Das liegt daran, dass man sie in großem Maßstab sammeln kann, man kann sie in großem Maßstab analysieren, und sie liefert einem all die großen Muster, das große Ganze, das es einem dann ermöglicht, hineinzuzoomen, um in die spezifischen Ziele einzudringen, die man am interessantesten findet. Aber man findet sie zuerst durch die Verkehrsanalyse der Metadaten.

Die Verkehrsanalyse von Metadaten kann sogar verwendet werden, um verschlüsselte Inhalte wiederherzustellen, ohne die Kryptographie zu brechen. Nehmen wir an, wir haben perfekte Kryptographie: Keine noch so große Kryptoanalyse ist in der Lage, sie zu brechen, und die geheimen Schlüssel sind perfekt geheim. Wir sollten darauf vertrauen können, dass dieser Inhalt geschützt ist und ein Angreifer nicht in der Lage ist, etwas über diesen Inhalt zu erfahren.

Es gibt jedoch viele Situationen, in denen die Verkehrsanalyse von Kommunikations-Metadaten als Seitenkanal fungieren kann, der diesen verschlüsselten Inhalt preisgibt.

#### Metadaten-Überwachung (5:15) {#metadata-surveillance-515}

Ein Beispiel ist, wenn man mit HTTPS auf einer Website surft. Da die Kommunikation mit dieser Website verschlüsselt ist, kann jemand, der die Kommunikation beobachtet, im Prinzip nicht erkennen, auf welche spezifische Seite man auf der Website zugreift. Wenn man zum Beispiel auf WebMD geht, um Krankheiten nachzuschlagen, wird ein Beobachter oder Lauscher sehen können: „Okay, du überprüfst medizinische Informationen auf WebMD“, aber er kann nicht sagen, nach welcher spezifischen Krankheit du suchst.

Der Weg, um herauszufinden, was jemand in diesem Szenario tut, bestünde für einen Angreifer jedoch darin, zunächst alle Seiten der Website herunterzuladen und für jede Seite das Muster der Pakete aufzuzeichnen, die auf der Kommunikationsleitung zu sehen sind. Im Grunde genommen, welche Anzahl von Paketen in welche Richtung geht, wie groß diese Pakete sind und wie lang die Zeitspanne zwischen einem Paket und dem nächsten ist. 

Dadurch kann man einen Fingerabdruck von jeder dieser Seiten erstellen, sodass man, wenn das Ziel eine Seite von der verschlüsselten Website herunterlädt, die Anzahl der Pakete in jeder Richtung und deren Größen abgleichen kann, um zu erraten, welche spezifische Webseite es sich ansieht, obwohl die Webseite selbst verschlüsselt ist und man diesen Inhalt eigentlich nicht erfahren sollte.

Das ist offensichtlich besorgniserregend. Auch wenn wir eine Ende-zu-Ende-Verschlüsselung haben können, sind wir noch lange nicht am Ziel, wenn es darum geht, die Privatsphäre unserer Kommunikation zu schützen.

#### Eine Wunschliste für private Kommunikation (6:40) {#a-wish-list-for-private-communications-640}

Wenn wir also eine Wunschliste hätten, was ein perfekt sicheres Kommunikations-Netzwerk bieten würde, welche Eigenschaften würden wir uns wünschen? 

Offensichtlich wollen wir schützen, was ein Benutzer über den verschlüsselten Kanal sagt, und die Ende-zu-Ende-Verschlüsselung ist bereits ein sehr wichtiger Schritt, um das zu erreichen. Aber nicht nur das, wir wollen auch verbergen, mit wem der Benutzer kommuniziert, also wer der Kommunikationspartner ist, von wem man Pakete empfängt oder an wen man Pakete sendet. Auch den Standort, also von wo aus man kommuniziert; wann und wie lange man kommuniziert; wie viele Datenbytes man austauscht; und alle anderen Muster in der Kommunikation. Und man könnte sogar so weit gehen zu sagen, dass wir verbergen wollen, ob jemand überhaupt kommuniziert oder nicht.

Dies sind alles Eigenschaften, die anonyme Kommunikationssysteme bereitstellen wollen, und im Lösungsraum sind Mixnets eine der besten Lösungen, die wir haben, um diese Art von Eigenschaften bereitzustellen.