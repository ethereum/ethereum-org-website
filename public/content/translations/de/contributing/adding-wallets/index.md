---
title: Wallets hinzufügen
description: Richtlinien, die wir verwenden, wenn wir eine Wallet zu ethereum.org hinzufügen
lang: de
---

# Wallets hinzufügen {#adding-wallets}

Wir wollen sicherstellen, dass wir eine Vielzahl von Wallets zeigen, die die funktionsreiche Landschaft der Wallets abdecken, so dass die Nutzer sich sicher auf Ethereum bewegen können.

Jeder kann einen Vorschlag zum Hinzufügen einer Wallet auf ethereum.org machen. Sollten wir eine Wallet übersehen haben, schlagen Sie sie bitte vor!

Jeder kann eine neue Wallet vorschlagen. Wallets sind derzeit hier aufgelistet:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)
- [ethereum.org/wallets/](/wallets/)

Wallets verändern sich auf Ethereum rasch. Wir haben versucht, ein gerechtes Framework für Überlegungen auf ethereum.org zu schaffen. Allerdings werden sich die Kriterien für die Auflistung im Laufe der Zeit verändern und weiterentwickeln.

## Der Entscheidungsrahmen {#the-decision-framework}

### Aufnahmekriterien: die Must-haves {#the-must-haves}

- **Ein sicherheitsgeprüftes Produkt** – ob durch ein Audit, ein internes Sicherheitsteam, einen offenen Source-Code oder eine andere Methode, die Sicherheit Ihrer Wallet muss zuverlässig sein. So lässt sich das Risiko für unsere Nutzerinnen und Nutzer verringern. Zudem ist das ein Zeichen für die Ernsthaftigkeit eines Produkts.
- **Eine Wallet, die seit mehr als sechs Monaten "live" ist ODER von einer Gruppe mit einer seriösen Erfolgsbilanz herausgegeben wurde** – das ist ein weiterer Hinweis auf Sicherheit. Sechs Monate sind ein guter Zeitraum, in dem kritische Fehler und Sicherheitslücken gefunden werden könnten. Wir bitten um sechs Monate, um Forks herauszufiltern, die schnell als Projekte aufgegeben werden.
- **Bearbeitung durch ein aktives Team** – das trägt dazu bei, die Qualität zu gewährleisten und sicherzustellen, dass ein Nutzer Unterstützung für seine Fragen erhält.
- **Ehrliche und genaue Angaben**: Es wird erwartet, dass alle vorgeschlagenen Projektangebote ehrliche und genaue Angaben enthalten. Produkte, die falsche Angaben machen, z. B. Ihr Produkt als "Open Source" deklarieren, obwohl es das nicht ist, werden entfernt.
- **Ansprechpartner** – Ein Ansprechpartner für die Wallet hilft uns erheblich, genaue Informationen zu erhalten, wenn Änderungen vorgenommen werden. Somit bleibt die Aktualisierung von ethereum.org bei der Erfassung künftiger Informationen überschaubar.

### Weitere Kriterien: optionale Aspekte {#the-nice-to-haves}

- **Globaler Zugang** – Ihre Wallet hat keine geografischen Einschränkungen oder KYC-Anforderungen, die bestimmte Personen vom Zugang zu Ihrem Service ausschließen.
- **Verfügbarkeit in mehreren Sprachen** – Ihre Wallet wird in mehrere Sprachen übersetzt, so dass Nutzer auf der ganzen Welt darauf zugreifen können.
- **Open source** – die gesamte Code-Basis Ihres Projekts (nicht nur die Module) sollte zugänglich sein und Sie sollten PRs von der größeren Gemeinschaft akzeptieren.
- **Keine Verwahrung** – Nutzer kontrollieren ihr Geld. Wenn Ihr Produkt verschwindet, können die Nutzer weiterhin auf ihr Guthaben zugreifen und es bewegen.
- **Unterstützung von Hardware-Wallets** – Nutzer können ihre Hardware-Wallets anschließen, um Transaktionen zu signieren.
- **WalletConnect** – Nutzer können sich über WalletConnect mit dApps verbinden.
- **Importieren von Ethereum RPC-Endpunkten** – Benutzer können Knoten-RPC-Daten importieren, so dass sie sich mit einem Knoten ihrer Wahl oder anderen EVM-kompatiblen Netzwerken verbinden können.
- **NFTs** – Nutzer können ihre NFTs in der Wallet einsehen und mit ihnen interagieren.
- **Verbindung zu Ethereum-Anwendungen** – Nutzer können sich mit Ethereum-Anwendungen verbinden und diese nutzen.
- **Staking** – Nutzer können ihre Investitionen direkt über die Wallet tätigen.
- **Swaps** – Nutzer können Token über die Wallet tauschen.
- **Multichain-Netzwerke** – Ihre Wallet unterstützt standardmäßig den Zugriff auf mehrere Blockchain-Netzwerke.
- **Layer-2-Netzwerke** – Ihre Wallet unterstützt standardmäßig den Zugang zu Layer-2-Netzwerken.
- **Anpassen der Gasgebühren** – Ihre Wallet ermöglicht es den Nutzern, die Gasgebühren für ihre Transaktionen anzupassen (Grundgebühr, Prioritätsgebühr, maximale Gebühr).
- **ENS-Unterstützung** – Ihre Wallet erlaubt es Benutzern, Transaktionen an ENS-Namen zu senden.
- **ERC-20-Unterstützung** – Ihre Wallet ermöglicht es Nutzern, ERC-20-Token-Verträge zu importieren, oder ERC-20-Token automatisch abzufragen und anzuzeigen.
- **EIP-1559 (Typ 2)-Transaktionen** – Ihre Wallet unterstützt EIP-1559 (Typ 2)-Transaktionen.
- **Krypto kaufen** – Ihre Wallet unterstützt Nutzer beim direkten Kauf und Onboarding von Krypto.
- **Verkauf für Geldwerte** – Ihre Wallet unterstützt den Verkauf und die Abhebung von Geldwerten direkt auf eine Karte oder ein Bankkonto.
- **Multisig** – Ihre Wallet unterstützt mehrere Signaturen, um eine Transaktion zu signieren.
- **Social Recovery** – Ihre Wallet unterstützt Guardians und ein Nutzer kann seine Wallet mithilfe dieser Guardians wiederherstellen, wenn er seine Seed-Phrase verliert.
- **Eigenes Support-Team** – Ihre Wallet hat ein eigenes Support-Team, an das sich die Nutzer bei Problemen wenden können.
- **Lehrreiche Ressourcen/Dokumentation** – Ihr Produkt sollte über ein gut gestaltetes Onboarding-System verfügen, um den Benutzern zu helfen und sie zu informieren. Alternativ sind Informationen zu Lerninhalten wie Artikel oder Videos hilfreich.

## Eine Wallet hinzufügen {#adding-a-wallet}

Wenn Sie eine Wallet zu ethereum.org hinzufügen möchten, erstellen Sie ein Ticket auf GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Ein Thema erstellen
</ButtonLink>

## Wartung {#maintenance}

Ethereum befindet sich in der Entwicklung. Daher kommen und gehen Teams und Produkte und Innovationen finden täglich statt, so dass wir unsere Inhalte regelmäßig überprüfen:

- Sicherstellen, dass alle aufgeführten Wallets und dApps weiterhin unsere Kriterien erfüllen
- Überprüfen, ob Produkte vorgeschlagen wurden, die unsere Kriterien besser erfüllen als die derzeit aufgeführten

Ethereum.org wird von der Open-Source-Community gepflegt; wir sind auf die Hilfe der Community angewiesen, um diese Seite auf dem neuesten Stand zu halten. Wenn Ihnen Informationen zu den aufgelisteten Wallets auffallen, die aktualisiert werden müssen, öffnen Sie bitte [ein Ticket](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) oder [Pull Request](https://github.com/ethereum/ethereum-org-website/pulls)!

## Nutzungsbedingungen {#terms-of-use}

Bitte beachten Sie auch unsere[Nutzungsbedingungen](/terms-of-use/). Die Informationen auf ethereum.org werden ausschließlich zu allgemeinen Informationszwecken bereitgestellt.
