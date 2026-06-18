---
title: IPFS für dezentrale Benutzeroberflächen
description: Dieses Tutorial zeigt, wie man IPFS verwendet, um die Benutzeroberfläche für eine Dapp zu speichern. Obwohl die Daten und die Geschäftslogik der Anwendung dezentral sind, könnten Benutzer ohne eine zensurresistente Benutzeroberfläche dennoch den Zugriff darauf verlieren.
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - frontend
skill: beginner
breadcrumb: IPFS für Dapp-UIs
lang: de
published: 2024-06-29
---

Du hast eine unglaubliche neue dezentrale Anwendung (Dapp) geschrieben. Du hast sogar eine [Benutzeroberfläche](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) dafür entwickelt. Aber jetzt befürchtest du, dass jemand versuchen könnte, sie zu zensieren, indem er deine Benutzeroberfläche offline nimmt, die nur auf einem einzigen Server in der Cloud liegt. In diesem Tutorial lernst du, wie du Zensur vermeidest, indem du deine Benutzeroberfläche im **[Interplanetary File System (IPFS)](https://ipfs.tech/developers/)** bereitstellst, sodass jeder Interessierte sie für den zukünftigen Zugriff auf einem Server anpinnen (pinnen) kann.

Du könntest einen Drittanbieter-Dienst wie [Fleek](https://resources.fleek.xyz/docs/) nutzen, um die ganze Arbeit zu erledigen. Dieses Tutorial richtet sich an Personen, die genug selbst machen möchten, um zu verstehen, was sie tun, auch wenn es mehr Arbeit bedeutet.

## Lokal loslegen {#getting-started-locally}

Es gibt mehrere [IPFS-Drittanbieter](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), aber für Testzwecke ist es am besten, IPFS zunächst lokal auszuführen.

1. Installiere die [IPFS-Benutzeroberfläche](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Erstelle ein Verzeichnis mit deiner Website. Wenn du [Vite](https://vite.dev/) verwendest, nutze diesen Befehl:

   ```sh
   pnpm vite build
   ```

3. Klicke in IPFS Desktop auf **Import > Folder** und wähle das im vorherigen Schritt erstellte Verzeichnis aus.

4. Wähle den gerade hochgeladenen Ordner aus und klicke auf **Rename**. Gib ihm einen aussagekräftigeren Namen.

5. Wähle ihn erneut aus und klicke auf **Share link**. Kopiere die URL in die Zwischenablage. Der Link sieht ähnlich aus wie `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Klicke auf **Status**. Klappe den Tab **Advanced** auf, um die Gateway-Adresse zu sehen. Auf meinem System lautet die Adresse beispielsweise `http://127.0.0.1:8080`.

7. Kombiniere den Pfad aus dem Link-Schritt mit der Gateway-Adresse, um deine Adresse zu ermitteln. Für das obige Beispiel lautet die URL beispielsweise `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Öffne diese URL in einem Browser, um deine Website zu sehen.

## Hochladen {#uploading}

Jetzt kannst du IPFS also nutzen, um Dateien lokal bereitzustellen, was noch nicht sehr aufregend ist. Der nächste Schritt besteht darin, sie für die Welt verfügbar zu machen, wenn du offline bist.

Es gibt eine Reihe bekannter [Pinning-Dienste](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Wähle einen davon aus. Unabhängig davon, welchen Dienst du nutzt, musst du ein Konto erstellen und ihm den **Content Identifier (CID)** aus deinem IPFS-Desktop zur Verfügung stellen.

Persönlich fand ich [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) am einfachsten zu bedienen. Hier ist die Anleitung dafür:

1. Gehe zum [Dashboard](https://dashboard.4everland.org/overview) und melde dich mit deiner Wallet an.

2. Klicke in der linken Seitenleiste auf **Storage > 4EVER Pin**.

3. Klicke auf **Upload > Selected CID**. Gib deinem Inhalt einen Namen und trage die CID aus dem IPFS-Desktop ein. Derzeit ist eine CID eine Zeichenfolge, die mit `Qm` beginnt, gefolgt von 44 Buchstaben und Ziffern, die einen [Base-58-kodierten](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) Hash darstellen, wie zum Beispiel `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Dies [wird sich jedoch wahrscheinlich ändern](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Der anfängliche Status ist **Queued** (In der Warteschlange). Lade die Seite neu, bis er zu **Pinned** (Gepinnt) wechselt.

5. Klicke auf deine CID, um den Link zu erhalten. Du kannst meine Anwendung [hier](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/) sehen.

6. Möglicherweise musst du dein Konto aktivieren, damit es länger als einen Monat gepinnt bleibt. Die Konto-Aktivierung kostet etwa 1 $. Wenn du das Fenster geschlossen hast, melde dich ab und wieder an, um erneut zur Aktivierung aufgefordert zu werden.

## Nutzung über IPFS {#using-from-ipfs}

An diesem Punkt hast du einen Link zu einem zentralisierten Gateway, das deine IPFS-Inhalte bereitstellt. Kurz gesagt: Deine Benutzeroberfläche ist vielleicht etwas sicherer, aber immer noch nicht zensurresistent. Für echte Zensurresistenz müssen Benutzer IPFS [direkt über einen Browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) nutzen.

Sobald du das installiert hast (und das Desktop-IPFS funktioniert), kannst du auf jeder Website zu [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) gehen und erhältst diesen Inhalt auf dezentrale Weise bereitgestellt.

## Nachteile {#drawbacks}

Du kannst IPFS-Dateien nicht zuverlässig löschen. Solange du also deine Benutzeroberfläche noch veränderst, ist es wahrscheinlich am besten, sie entweder zentralisiert zu belassen oder das [Interplanetary Name System (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs) zu verwenden, ein System, das Veränderbarkeit (Mutability) auf IPFS aufbaut. Natürlich kann alles, was veränderbar ist, zensiert werden – im Fall von IPNS, indem Druck auf die Person mit dem entsprechenden privaten Schlüssel ausgeübt wird.

Zusätzlich haben einige Pakete Probleme mit IPFS. Wenn deine Website also sehr komplex ist, ist dies möglicherweise keine gute Lösung. Und natürlich kann nichts, was auf Serverintegration angewiesen ist, dezentralisiert werden, nur indem die Client-Seite auf IPFS liegt.

## Auffindbarkeit über ENS {#discoverability}

Wenn du einen ENS-Namen (wie vitalik.eth) auf deine Website verweisen lässt, wird sie als vollständig dezentrale Webseite betrachtet und automatisch vom Dienst [dweb3.wtf](https://dweb3.wtf) gepinnt. Außerdem wird sie über die Suchmaschine [web3compass.net](https://web3compass.net) durchsuchbar gemacht, ähnlich wie es DuckDuckGo, Brave Search oder Google für das traditionelle Web tun.

## Fazit {#conclusion}

Genauso wie Ethereum es dir ermöglicht, die Datenbank- und Geschäftslogik-Aspekte deiner Dapp zu dezentralisieren, ermöglicht dir IPFS die Dezentralisierung der Benutzeroberfläche. Dadurch kannst du einen weiteren Angriffsvektor gegen deine Dapp ausschalten.

[Hier findest du weitere meiner Arbeiten](https://cryptodocguy.pro/).