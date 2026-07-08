---
title: "Ethereum-Grundlagen: Einführung"
description: "Eine Einführungsvorlesung zu den Grundlagen von Ethereum, die behandelt, was Ethereum ist, wie es sich von Bitcoin unterscheidet und welche Kernkonzepte dem Ethereum-Netzwerk zugrunde liegen."
lang: de
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Ethereum-Grundlagen"
---

Eine Einführungsvorlesung von **Quezar**, die die Grundlagen von Ethereum behandelt, einschließlich der Frage, was Blockchains sind, wie sie technisch funktionieren und welche Schlüsselkomponenten das Ethereum-Netzwerk ausmachen.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Videotranskripts](https://www.youtube.com/watch?v=j78ZcIIpi0Q), das von Quezar veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Willkommen und Serienüberblick (0:03) {#welcome-and-series-overview-003}

Willkommen zurück zu einem weiteren Teil der Ethereum-Serie. Wenn du nach einer guten Ressource gesucht hast, um zu verstehen, wie Ethereum im Hintergrund funktioniert, bist du hier genau richtig. Im vorherigen Teil haben wir behandelt, wie man grundlegende Solidity-Contracts liest und schreibt, und kurz einige Dinge über die verschiedenen Komponenten im Ethereum-Netzwerk besprochen. In diesem Teil werden wir uns die Architektur von Ethereum genauer ansehen und jede Komponente viel detaillierter besprechen. Wir haben bald noch viele weitere Videos, also wenn dir diese Art von Inhalten gefällt, klicke auf den Gefällt-mir-Button und abonniere den Kanal, damit du benachrichtigt wirst, wenn das neue Video online geht.

#### Ziele und Voraussetzungen (0:40) {#goals-and-prerequisites-040}

Das Ziel dieses Teils der Serie ist es, dir innerhalb einer Woche ein gutes Verständnis der Architektur von Ethereum zu vermitteln. Wie beim vorherigen Teil habe ich es so strukturiert, dass du dich innerhalb von sieben Tagen viel besser mit allem auskennst, was im Ethereum-Netzwerk passiert, wann immer jemand eine Aktivität darauf ausführt.

Was die Voraussetzungen betrifft – es gibt nichts Bestimmtes, das du bereits wissen müsstest. Wenn du dir dieses Video ansiehst, weißt du höchstwahrscheinlich genug über das Ethereum-Netzwerk, was diesen Teil betrifft. Aber ich würde empfehlen, den vorherigen Teil der Serie – Solidity-Grundlagen – abzuschließen, da dieser Teil viel praxisorientierter ist. Du kannst Code in der Remix IDE ausführen und sehen, wie die Dinge im Ethereum-Netzwerk tatsächlich funktionieren. Dieser Teil wird hauptsächlich theoretischer Natur sein, und wenn du den vorherigen Teil bereits durchgearbeitet hast, wird es dir viel leichter fallen, ihm zu folgen.

#### Was wir behandeln werden (1:41) {#what-well-cover-141}

In diesem Teil werden wir behandeln, was Blockchains sind und sehen, wie sie technisch funktionieren. Wir werden uns auch ansehen, aus welchen Komponenten das Ethereum-Netzwerk besteht, und dann werden wir fortfahren und jede Komponente viel detaillierter besprechen.

Für diesen Teil habe ich die offizielle Ethereum-Dokumentation als Grundlage verwendet. Sobald du diesen Teil durchgearbeitet hast, hast du die grundlegenden Themen dieser Dokumentation größtenteils abgedeckt. Es wird dir viel leichter fallen, sie durchzugehen. Offensichtlich ist nicht alles in den Videos enthalten, aber ich habe versucht, alle Dinge auf einer höheren Ebene zu behandeln. Du kannst diesen Teil als Einführung in die Dokumentation betrachten, die viel tiefer ins Detail geht.

#### Werkzeuge und Vorgehensweise (2:30) {#tools-and-approach-230}

Wir werden auch Etherscan verwenden, um zu sehen, wie jede Komponente in Echtzeit funktioniert. Mach dir keine Sorgen, wenn du nicht alles auf Anhieb verstehst – du kannst jederzeit auf bestimmte Themen zurückkommen, wann immer dir danach ist. Ich würde empfehlen, nach jedem Thema kurze Pausen einzulegen, damit du sie besser verarbeiten kannst. Lass uns also damit beginnen, zu verstehen, was Blockchains sind.