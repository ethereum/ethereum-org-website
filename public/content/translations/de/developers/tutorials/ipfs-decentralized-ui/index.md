---
title: "IPFS für dezentralisierte Benutzeroberflächen"
description: "Dieses Tutorial zeigt dem Leser, wie man IPFS nutzt, um die Benutzeroberfläche für eine Dapp zu speichern. Obwohl die Daten und die Geschäftslogik der Anwendung dezentralisiert sind, könnten Benutzer ohne eine zensurresistente Benutzeroberfläche trotzdem den Zugriff darauf verlieren."
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: de
published: 2024-06-29
---

Sie haben eine unglaubliche neue Dapp geschrieben. Sie haben sogar eine [Benutzeroberfläche](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) dafür geschrieben. Aber jetzt befürchten Sie, dass jemand versuchen könnte, sie zu zensieren, indem er Ihre Benutzeroberfläche, die sich nur auf einem einzigen Server in der Cloud befindet, lahmlegt. In diesem Tutorial lernen Sie, wie Sie Zensur vermeiden können, indem Sie Ihre Benutzeroberfläche im **[Interplanetary File System (IPFS)](https://ipfs.tech/developers/)** ablegen, sodass jeder Interessierte sie für den zukünftigen Zugriff auf einem Server pinnen kann.

Sie könnten einen Drittanbieterdienst wie [Fleek](https://resources.fleek.xyz/docs/) nutzen, um die ganze Arbeit zu erledigen. Dieses Tutorial richtet sich an Personen, die genug tun wollen, um zu verstehen, was sie tun, auch wenn es mehr Arbeit bedeutet.

## Lokale erste Schritte {#getting-started-locally}

Es gibt mehrere [Drittanbieter von IPFS](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), aber für Testzwecke ist es am besten, IPFS zunächst lokal auszuführen.

1. Installieren Sie die [IPFS-Benutzeroberfläche](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Erstellen Sie ein Verzeichnis mit Ihrer Website. Wenn Sie [Vite](https://vite.dev/) verwenden, nutzen Sie diesen Befehl:

   ```sh
   pnpm vite build
   ```

3. Klicken Sie in IPFS Desktop auf **Importieren > Ordner** und wählen Sie das Verzeichnis aus, das Sie im vorherigen Schritt erstellt haben.

4. Wählen Sie den Ordner aus, den Sie gerade hochgeladen haben, und klicken Sie auf **Umbenennen**. Geben Sie ihm einen aussagekräftigeren Namen.

5. Wählen Sie ihn erneut aus und klicken Sie auf **Link teilen**. Kopieren Sie die URL in die Zwischenablage. Der Link wäre ähnlich wie `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Klicken Sie auf **Status**. Erweitern Sie den Tab **Erweitert**, um die Gateway-Adresse zu sehen. Auf meinem System lautet die Adresse beispielsweise `http://127.0.0.1:8080`.

7. Kombinieren Sie den Pfad aus dem Link-Schritt mit der Gateway-Adresse, um Ihre Adresse zu finden. Für das obige Beispiel lautet die URL `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Öffnen Sie diese URL in einem Browser, um Ihre Website zu sehen.

## Hochladen {#uploading}

Jetzt können Sie IPFS also verwenden, um Dateien lokal bereitzustellen, was nicht sehr aufregend ist. Der nächste Schritt besteht darin, sie für die ganze Welt verfügbar zu machen, wenn Sie offline sind.

Es gibt eine Reihe von bekannten [Pinning-Diensten](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Wählen Sie einen davon aus. Egal welchen Dienst Sie nutzen, Sie müssen ein Konto erstellen und ihm den **Content Identifier (CID)** von Ihrem IPFS-Desktop bereitstellen.

Ich persönlich fand [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) am einfachsten zu bedienen. Hier ist die Anleitung dafür:

1. Navigieren Sie zum [Dashboard](https://dashboard.4everland.org/overview) und melden Sie sich mit Ihrer Wallet an.

2. Klicken Sie in der linken Seitenleiste auf **Speicher > 4EVER Pin**.

3. Klicken Sie auf **Hochladen > Ausgewählte CID**. Geben Sie Ihrem Inhalt einen Namen und geben Sie die CID aus dem IPFS-Desktop an. Derzeit ist eine CID eine Zeichenkette, die mit `Qm` beginnt, gefolgt von 44 Buchstaben und Ziffern, die einen [Base58-kodierten](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) Hash darstellen, wie z. B. `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, aber [das wird sich wahrscheinlich ändern](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Der anfängliche Status ist **In Warteschlange**. Laden Sie neu, bis er sich auf **Gepinnt** ändert.

5. Klicken Sie auf Ihre CID, um den Link zu erhalten. Sie können meine Anwendung [hier](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/) sehen.

6. Möglicherweise müssen Sie Ihr Konto aktivieren, damit es länger als einen Monat gepinnt bleibt. Die Aktivierung des Kontos kostet etwa 1 $. Wenn Sie es geschlossen haben, melden Sie sich ab und wieder an, um erneut zur Aktivierung aufgefordert zu werden.

## Verwendung von IPFS {#using-from-ipfs}

An diesem Punkt haben Sie einen Link zu einem zentralisierten Gateway, das Ihre IPFS-Inhalte bereitstellt. Kurz gesagt, Ihre Benutzeroberfläche ist vielleicht etwas sicherer, aber immer noch nicht zensurresistent. Für echte Zensurresistenz müssen Benutzer IPFS [direkt aus einem Browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) verwenden.

Sobald Sie das installiert haben (und der Desktop-IPFS funktioniert), können Sie auf jeder Website zu [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) gehen und Sie erhalten diesen Inhalt auf dezentralisierte Weise.

## Nachteile {#drawbacks}

Sie können IPFS-Dateien nicht zuverlässig löschen. Solange Sie also Ihre Benutzeroberfläche ändern, ist es wahrscheinlich am besten, sie entweder zentralisiert zu belassen oder das [Interplanetary Name System (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs) zu verwenden, ein System, das Veränderbarkeit auf IPFS bietet. Natürlich kann alles, was veränderbar ist, zensiert werden, im Fall von IPNS, indem man die Person unter Druck setzt, die den zugehörigen privaten Schlüssel besitzt.

Außerdem haben einige Pakete ein Problem mit IPFS. Wenn Ihre Website also sehr kompliziert ist, ist das möglicherweise keine gute Lösung. Und natürlich kann alles, was auf Server-Integration angewiesen ist, nicht dezentralisiert werden, nur weil die Client-Seite auf IPFS liegt.

## Fazit {#conclusion}

So wie Ethereum es Ihnen ermöglicht, die Datenbank- und Geschäftslogikaspekte Ihrer Dapp zu dezentralisieren, ermöglicht IPFS die Dezentralisierung der Benutzeroberfläche. Damit können Sie einen weiteren Angriffsvektor gegen Ihre Dapp ausschalten.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
