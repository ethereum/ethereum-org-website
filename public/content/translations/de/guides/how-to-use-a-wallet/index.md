---
title: So verwenden Sie eine Wallet
description: Ein Leitfaden zum Versenden, Empfangen von Token und Verbinden mit Web-3 Projekten.
lang: de
---

# So verwenden Sie eine Wallet

Lernen Sie die grundlegenden Funktionen einer Krypto-Wallet kennen. Wenn Sie noch keine haben, werfen Sie einen blick auf unseren [Leitfaden zur Erstellung eines Ethereum-Kontos](/guides/how-to-create-an-ethereum-account/) an.

## Öffnen Sie Ihre Wallet

Sie sollten eine Übersicht sehen, die wahrscheinlich Ihr Guthaben, als auch Tasten zum Senden und Empfangen enthält.

## Kryptowährung empfangen

Möchten Sie Kryptowährungen in ihrer Wallet empfangen?

Jedes Ethereum Account hat seine eigene Empfangsadresse, welche eine einzigartige Abfolge von Zahlen und Buchstaben enthält. Die Adresse funktioniert wie eine Bankkontonummer. Ethereum-Adressen beginnen immer mit „0x“. Sie können diese Adresse mit jedem teilen: Es besteht kein Sicherheitsrisiko.

Mit Ihrer Adresse verhält es sich wie mit Ihrer Privatadresse: Sie müssen diese angeben, damit man Sie finden kann. Es besteht keine Gefahr, dies zu tun, weil Sie immer noch Ihre Haustür mit einem anderen Schlüssel, den Sie kontrollieren, abschließen können, sodass keiner hereinkommen kann, auch wenn sie wissen, wo Sie wohnen.

Sie müssen jedem, der Ihnen Geld schicken möchten, Ihre öffentliche Adresse zur Verfügung stellen. Viele Wallet-Apps lassen Sie zur vereinfachten Handhabung Ihre Adresse kopieren oder zeigen einen QR-Code an, der gescannt werden kann. Vermeiden Sie die manuelle Eingabe einer Ethereum-Adresse. Dies kann leichtfertig zu Schreibfehlern und damit zum Verlust Ihres Vermögens führen.

Verschiedene Apps können sich voneinander unterscheiden oder benutzen eine unterschiedliche Sprache, aber sie sollten Sie durch einen ähnlichen Transaktionsprozess führen.

1. Öffnen Sie Ihre Wallet-App.
2. Klicken Sie auf „Empfangen" (oder ähnliche Option).
3. Kopieren Sie Ihre Ethereum-Adresse in die Zwischenablage.
4. Geben Sie dem Absender Ihre Ethereum-Adresse an.

## Kryptowährungen senden

Möchten Sie ETH an eine andere Wallet senden?

1. Öffnen Sie Ihre Wallet-App.
2. Holen Sie sich die Empfängeradresse und stellen Sie sicher, dass Sie mit demselben Netzwerk verbunden sind wie der Empfänger.
3. Geben Sie die Empfängeradresse ein oder scannen Sie einen QR-Code mit Ihrer Kamera, damit Sie die Adresse nicht manuell eingeben müssen.
4. Klicken Sie auf die Schaltfläche „Senden" in Ihrer Wallet (oder ein ähnliches Wort).

![Sendefeld für Krypto-Adressen](./send.png)
<br/>

5. Viele Assets wie DAI oder USDC existieren in mehreren Netzwerken. Stellen Sie bei der Übertragung von Krypto-Token sicher, dass der Empfänger das gleiche Netzwerk wie Sie nutzt, da diese nicht austauschbar sind.
6. Stellen Sie sicher, dass Ihre Wallet genug ETH enthält, um für die Transaktionsgebühren aufzukommen, die je nach Netzwerkbedingung variiert. Die meisten Wallets werden automatisch die vorgeschlagene Gebühr zur Transaktion hinzufügen, die Sie dann bestätigen können.
7. Sobald Ihre Transaktion bearbeitet wurde, wird der entsprechende Krypto-Betrag im Konto des Empfängers angezeigt. Dies kann irgendwo zwischen ein paar Sekunden und ein paar Minuten dauern, je nachdem wie stark das Netzwerk im Moment benutzt wird.

## Mit Projekten verbinden

Ihre Adresse wird auf allen Ethereum Projekten dieselbe sein. Sie brauchen sich für kein Projekt extra zu registrieren. Sobald Sie eine Wallet haben, können Sie sich mit jedem Ethereum-Projekt ohne zusätzliche Informationen verbinden. Es werden keine E-Mails oder sonstige persönliche Informationen benötigt.

1. Besuchen Sie die Webseite eines Projekts.
2. Wenn die Zielseite des Projekts nur eine statische Beschreibung des Projekts ist, sollten Sie in der Lage sein, auf eine Schaltfläche „App öffnen" im Menü zu klicken, die Sie zur eigentlichen Web-App navigiert.
3. Sobald Sie in der App sind, klicken Sie auf "Verbinden".

![Schaltfläche zum Verbinden mit einer Wallet](./connect1.png)

4. Wählen Sie Ihre Wallet aus der Liste der angegebenen Optionen aus. Wenn Sie Ihre Wallet nicht sehen können, könnte sie unter der Option „WalletConnect“ versteckt sein.

![Wählen Sie aus einer Liste von Wallets zur Verbindung](./connect2.png)

5. Bestätigen Sie die Signaturanfrage in Ihrer Wallet um die Verbindung herzustellen. **Das Signieren der dieser Nachricht benötigt kein zusätzliches ETH**.
6. Das war's! Beginnen Sie, die App zu benutzen. Einige interessante Projekte finden Sie auf unserer [dApps-Seite](/dapps/#explore). <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Möchten Sie mehr erfahren?</div>
  <ButtonLink href="/guides/">
    Sehen Sie unsere anderen Anleitungen
  </ButtonLink>
</InfoBanner>

## Häufig gestellte Fragen

### Wenn ich eine ETH-Adresse besitze, besitze ich dann die gleiche Adresse auf anderen Blockchains?

Sie können dieselbe Adresse auf allen EVM-kompatiblen Blockchains verwenden (wenn Sie eine Wallet mit einem Wiederherstellungssatz haben). Diese [Liste](https://chainlist.org/) zeigt Ihnen, welche Blockchains Sie mit der gleichen Adresse verwenden können. Einige Blockchains, wie z. B. Bitcoin, implementieren einen komplett separaten Satz von Netzwerkregeln und Sie benötigen eine andere Adresse mit einem anderen Format. Wenn Sie eine Smart Contract Wallet haben, sollten Sie auf der Produktwebsite nachsehen, welche Blockchains unterstützt werden.

### Kann ich dieselbe Adresse auf mehreren Geräten verwenden?

Ja, Sie können die gleiche Adresse auf mehreren Geräten verwenden. Wallets sind technisch gesehen nur eine Schnittstelle, um Ihnen Ihr Guthaben zu zeigen und Transaktionen zu tätigen, Ihr Konto ist nicht in der Wallet gespeichert, sondern auf der Blockchain.

### Ich habe kein Krypto erhalten, wo kann ich den Status einer Transaktion überprüfen?

Sie können [Block-Entdecker](/developers/docs/data-and-analytics/block-explorers/) verwenden, um den Status jeder Transaktion in Echtzeit zu sehen. Alles, was Sie tun müssen, ist, Ihre Wallet-Adresse oder die ID der Transaktion zu suchen.

### Kann ich Transaktionen stornieren oder zurücksenden?

Nein, wurde die Transaktion einmal bestätigt, kann sie nicht mehr abgebrochen werden.
