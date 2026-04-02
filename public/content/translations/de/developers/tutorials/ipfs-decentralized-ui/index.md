---
title: "IPFS für dezentralisierte Benutzeroberflächen"
description: "Dieses Tutorial zeigt dem Leser, wie man IPFS verwendet, um die Benutzeroberfläche für eine Dapp zu speichern. Obwohl die Daten und die Geschäftslogik der Anwendung dezentralisiert sind, könnten Benutzer ohne eine zensurresistente Benutzeroberfläche dennoch den Zugriff darauf verlieren."
author: Ori Pomerantz
tags: ["ipfs", "dapps", "frontend"]
skill: beginner
breadcrumb: "IPFS für Dapp-Benutzeroberflächen"
lang: de
published: 2024-06-29
---

Sie haben eine unglaubliche neue Dapp geschrieben. Sie haben sogar eine [Benutzeroberfläche](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) dafür geschrieben. Aber jetzt befürchten Sie, dass jemand versuchen wird, sie zu zensieren, indem er Ihre Benutzeroberfläche, die nur auf einem Server in der Cloud liegt, vom Netz nimmt. In diesem Tutorial lernen Sie, wie Sie Zensur vermeiden können, indem Sie Ihre Benutzeroberfläche auf dem **[Interplanetary File System (IPFS)](https://ipfs.tech/developers/)** bereitstellen, sodass jeder Interessierte sie für den zukünftigen Zugriff auf einem Server anheften (pinnen) kann.

Sie könnten einen Drittanbieter-Dienst wie [Fleek](https://resources.fleek.xyz/docs/) nutzen, um die ganze Arbeit zu erledigen. Dieses Tutorial richtet sich an Personen, die genug tun möchten, um zu verstehen, was sie tun, auch wenn es mehr Arbeit bedeutet.

## Lokal loslegen {#getting-started-locally}

Es gibt mehrere [IPFS-Drittanbieter](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), aber am besten beginnen Sie damit, IPFS zu Testzwecken lokal auszuführen.

1. Installieren Sie die [IPFS-Benutzeroberfläche](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Erstellen Sie ein Verzeichnis mit Ihrer Website. Wenn Sie [Vite](https://vite.dev/) verwenden, nutzen Sie diesen Befehl:

   ```sh
   pnpm vite build
```

3. Klicken Sie in IPFS Desktop auf **Import > Folder** (Importieren > Ordner) und wählen Sie das Verzeichnis aus, das Sie im vorherigen Schritt erstellt haben.

4. Wählen Sie den soeben hochgeladenen Ordner aus und klicken Sie auf **Rename** (Umbenennen). Geben Sie ihm einen aussagekräftigeren Namen.

5. Wählen Sie ihn erneut aus und klicken Sie auf **Share link** (Link teilen). Kopieren Sie die URL in die Zwischenablage. Der Link sieht in etwa so aus: `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Klicken Sie auf **Status**. Erweitern Sie den Tab **Advanced** (Erweitert), um die Gateway-Adresse zu sehen. Auf meinem System lautet die Adresse beispielsweise `http://127.0.0.1:8080`.

7. Kombinieren Sie den Pfad aus dem Link-Schritt mit der Gateway-Adresse, um Ihre Adresse zu finden. Für das obige Beispiel lautet die URL beispielsweise `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Öffnen Sie diese URL in einem Browser, um Ihre Website zu sehen.

## Hochladen {#uploading}

Jetzt können Sie also IPFS verwenden, um Dateien lokal bereitzustellen, was nicht sehr aufregend ist. Der nächste Schritt besteht darin, sie für die Welt verfügbar zu machen, wenn Sie offline sind.

Es gibt eine Reihe bekannter [Pinning-Dienste](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Wählen Sie einen davon aus. Welchen Dienst Sie auch nutzen, Sie müssen ein Konto erstellen und ihm den **Content Identifier (CID)** aus Ihrem IPFS Desktop zur Verfügung stellen.

Persönlich fand ich [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) am einfachsten zu bedienen. Hier sind die Anweisungen dafür:

1. Navigieren Sie zum [Dashboard](https://dashboard.4everland.org/overview) und melden Sie sich mit Ihrem Wallet an.

2. Klicken Sie in der linken Seitenleiste auf **Storage > 4EVER Pin**.

3. Klicken Sie auf **Upload > Selected CID**. Geben Sie Ihrem Inhalt einen Namen und geben Sie die CID aus IPFS Desktop an. Derzeit ist eine CID eine Zeichenfolge, die mit `Qm` beginnt, gefolgt von 44 Buchstaben und Ziffern, die einen [Base-58-kodierten](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) Hash darstellen, wie z. B. `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, aber [das wird sich wahrscheinlich ändern](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Der anfängliche Status ist **Queued** (In der Warteschlange). Laden Sie die Seite neu, bis er sich zu **Pinned** (Angeheftet) ändert.

5. Klicken Sie auf Ihre CID, um den Link zu erhalten. Sie können meine Anwendung [hier](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/) sehen.

6. Möglicherweise müssen Sie Ihr Konto aktivieren, um es länger als einen Monat angeheftet zu lassen. Die Kontoaktivierung kostet etwa 1 $. Wenn Sie es geschlossen haben, melden Sie sich ab und wieder an, um erneut zur Aktivierung aufgefordert zu werden.

## Nutzung über IPFS {#using-from-ipfs}

Zu diesem Zeitpunkt haben Sie einen Link zu einem zentralisierten Gateway, das Ihre IPFS-Inhalte bereitstellt. Kurz gesagt, Ihre Benutzeroberfläche ist vielleicht etwas sicherer, aber immer noch nicht zensurresistent. Für echte Zensurresistenz müssen Benutzer IPFS [direkt über einen Browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) nutzen.

Sobald Sie das installiert haben (und das Desktop-IPFS funktioniert), können Sie auf einer beliebigen Website zu [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) gehen und erhalten diesen Inhalt auf dezentralisierte Weise bereitgestellt.

## Nachteile {#drawbacks}

Sie können IPFS-Dateien nicht zuverlässig löschen. Solange Sie also Ihre Benutzeroberfläche ändern, ist es wahrscheinlich am besten, sie entweder zentralisiert zu belassen oder das [Interplanetary Name System (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs) zu verwenden, ein System, das Veränderbarkeit auf IPFS aufbaut. Natürlich kann alles, was veränderbar ist, zensiert werden, im Fall von IPNS, indem Druck auf die Person mit dem entsprechenden Private-Key ausgeübt wird.

Darüber hinaus haben einige Pakete ein Problem mit IPFS. Wenn Ihre Website also sehr komplex ist, ist dies möglicherweise keine gute Lösung. Und natürlich kann nichts, was auf Serverintegration angewiesen ist, dezentralisiert werden, nur indem die Client-Seite auf IPFS liegt.

## Fazit {#conclusion}

Genauso wie Ethereum es Ihnen ermöglicht, die Datenbank- und Geschäftslogikaspekte Ihrer Dapp zu dezentralisieren, ermöglicht IPFS Ihnen, die Benutzeroberfläche zu dezentralisieren. Dadurch können Sie einen weiteren Angriffsvektor gegen Ihre Dapp ausschalten.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).