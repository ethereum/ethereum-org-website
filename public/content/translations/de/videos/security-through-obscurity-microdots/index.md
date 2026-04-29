---
title: "Sicherheit durch Obskurität: Verwendung von Mikropunkten zur Speicherung von Geheimnissen"
description: "Präsentation eines unkonventionellen Ansatzes zur Schlüsselverwahrung mithilfe physischer Mikropunkt-Technologie, bei dem Seed-Phrases in gedruckten, für das bloße Auge unsichtbaren Bildern verschleiert werden."
lang: de
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "datenschutz-und-sicherheit"
  - "datenschutz"
  - "authentifizierung"
format: presentation
author: Ethereum Foundation
breadcrumb: "Mikropunkt-Sicherheit"
---

Ein Lightning Talk von **jseam** auf der Devcon SEA, der einen unkonventionellen Ansatz zur Schlüsselverwahrung mithilfe physischer Mikropunkt-Technologie untersucht. Diese wurde historisch in der Spionage eingesetzt, um Seed-Phrases in gedruckten Bildern zu verschleiern, die für das bloße Auge praktisch unsichtbar sind.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=k9Dfg19JPEw), das von der Ethereum Foundation veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Warum Mikropunkte? (0:00) {#why-microdots-000}

Hallo Leute, willkommen in Thailand. In meinem Vortrag werde ich über Mikropunkte sprechen – was genau sie sind, warum man sie haben möchte und wie man sie tatsächlich herstellen kann. Ich habe einige Muster dabei, die ihr euch nach dem Vortrag ansehen könnt.

Es gibt viele Fragen zur OpSec und wie man Seed-Phrases verstecken kann. Viele der bestehenden Prozesse sind rein digital. Aber was wäre, wenn es physische Prozesse gäbe? Was wäre, wenn man Dinge verschleiern könnte? Die Schlüsselverwahrung bleibt ein riesiges Problem. Wir haben Secret Sharing, soziale Wiederherstellung – aber ich weiß, dass viele Krypto-Leute eher ungesellig sind, daher könnte die soziale Wiederherstellung schwierig sein.

Seht euch diese Grafik an: Wir erleben gerade eine Epidemie der Einsamkeit. Daher werden die Schlüsselverwahrung und die soziale Wiederherstellung zu riesigen Problemen werden. Was wäre, wenn es physische Ansätze zur Verschleierung von Informationen gäbe?

#### Die Geschichte der Mikropunkt-Steganografie (2:00) {#the-history-of-microdot-steganography-200}

Dies ist eine Steganografie-Technik namens Mikropunkte. Der Grund, warum ich das heute zeige, ist, dass dies historisch in der Spionage verwendet wurde. Das Ziel ist es im Grunde, Nachrichten direkt vor den Augen aller zu verstecken.

Die gesamte Dokumentation dazu ist sehr begrenzt. Ihr fragt wahrscheinlich Claude und er sagt: „Tut mir leid, keine Infos für dich.“ Ich habe diese Informationen selbst per Reverse-Engineering rekonstruiert. Die Folien dokumentieren alles. Ich werde nicht auf jedes Detail eingehen können, aber ich werde die interessanten Teile durchgehen. Ich habe auch ein GitHub-Repo erstellt, das die Prozesse dokumentiert.

#### Analoge Fotografie für die Sicherheit (3:30) {#analog-photography-for-security-330}

Wir werden die analoge Fotografie für diesen Anwendungsfall wiederbeleben. Warum analog? Es gibt im Grunde keine Möglichkeit für jemanden, eine analoge Kamera zu hacken, es sei denn, er stiehlt sie euch physisch.

Eines der Hauptprobleme bei der analogen Fotografie ist der ISO-Wert. Bei einer Digitalkamera ist das keine große Sache – man kann ihn einfach anpassen. Aber bei Film ist der ISO-Wert eine Funktion der Filmkörnung. Das wird zu einem Problem, wenn man das Bild miniaturisieren möchte. Je kleiner der ISO-Wert, desto feiner ist im Allgemeinen die Körnung.

Es gibt zwei Phasen. Zuerst macht man ein Foto, entwickelt es und fixiert es. In der zweiten Phase machen wir, anstatt das Bild zu vergrößern, das Gegenteil – wir schrumpfen es auf einen mikroskopischen Maßstab.

#### Der britische Prozess (5:00) {#the-british-process-500}

So wird es gemacht. Ihr schreibt eure Seed-Phrase auf. Normalerweise fordert euch ein MetaMask-Tutorial auf, die Seed-Phrase aufzuschreiben – aber wo legt man sie dann hin? Dies ist eine Möglichkeit: Ihr macht ein Foto der Seed-Phrase, spult den Film ein und entwickelt ihn. Das Interessante daran – das sind alles Schwermetalle, Silbermetalle. Ihr solltet sie nicht in eure Toilette schütten. Ich habe versehentlich etwas davon in meine Toilette gegossen, also habe ich vielleicht ein paar Umweltvergehen begangen. Im schlimmsten Fall wird es wahrscheinlich meine Rohre korrodieren.

Ihr macht das Foto noch einmal, und tada – ihr habt diesen winzig kleinen Punkt. Das nennt man den britischen Prozess.

#### Der Dichromat-Prozess (7:00) {#the-dichromated-process-700}

Der nächste, noch extremere Prozess ist der Dichromat-Prozess. So kann man mikroskopische Vergrößerungen wie 1000x erreichen. Das Ziel ist es, ein chemisches Substrat dafür zu finden, und hier kommt das ins Spiel, was ich den „verbotenen Orangensaft“ nenne – Ammoniumdichromat. Es ist sehr giftig. Ich habe etwas davon verschüttet und bin fast gestorben, als ich den Staub eingeatmet habe. Ich muss danach wahrscheinlich zur Krebsvorsorge gehen.

Man projiziert das Bild und erhält diese winzig kleinen Punkte auf einem Stück Papier. Die Punkte sind so klein, dass man definitiv ein Mikroskop braucht. Den Punkt aus dem britischen Prozess kann man mit bloßem Auge sehen, aber der Dichromat-Prozess erzeugt etwas wirklich Winziges – ich bin mir ohne Mikroskop nicht einmal sicher, ob es sich um ein tatsächliches Bild handelt.

#### Fragen und Antworten (8:00) {#qa-800}

Wie klein sind die Mikropunkte? Den mit dem britischen Prozess hergestellten kann man mit bloßem Auge sehen, aber der Dichromat-Prozess erzeugt etwas wirklich Winziges – man braucht definitiv ein Mikroskop. Ohne eines ist es schwer zu sagen, ob es überhaupt ein tatsächliches Bild ist.

**Frage:** Wie lange hält das? Gibt es eine Halbwertszeit?

**jseam:** Es ist nicht radioaktiv. Wir werden es in 20 Jahren herausfinden.

**Frage:** Hast du den Prozess umgekehrt – kodiert und dann dekodiert, um zu sehen, ob du es wiederherstellen kannst?

**jseam:** Ich denke, das könnte man. Man bräuchte wahrscheinlich eine Art optisches Projektions-Setup.

Vielen Dank. Wenn ihr euch die Muster ansehen wollt, ich werde hier irgendwo in der Nähe sein. Danke für eure Zeit, Leute.