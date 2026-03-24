---
title: Wie man eine Wallet verwendet
metaTitle: "Wie man Ethereum-Wallets verwendet | Schritt für Schritt"
description: "Ein Leitfaden, der erklärt, wie man Token sendet, empfängt und sich mit Web3-Projekten verbindet."
lang: de
---

# Wie man eine Wallet verwendet

Erfahren Sie, wie Sie alle grundlegenden Funktionen einer Wallet bedienen. Wenn Sie noch keine haben, lesen Sie unseren Leitfaden [Wie man ein Ethereum-Konto erstellt](/guides/how-to-create-an-ethereum-account/).

## Öffnen Sie Ihre Wallet

Sie sollten ein Dashboard sehen, das wahrscheinlich Ihr Guthaben anzeigt und Schaltflächen zum Senden und Empfangen von Token enthält.

## Kryptowährung empfangen

Möchten Sie Krypto in Ihrer Wallet empfangen?

Jedes Ethereum-Konto hat seine eigene Empfangsadresse, die eine eindeutige Folge von Zahlen und Buchstaben ist. Die Adresse funktioniert wie eine Bankkontonummer. Ethereum-Adressen beginnen immer mit „0x“. Sie können diese Adresse mit jedem teilen: Es ist sicher, dies zu tun.

Ihre Adresse ist wie Ihre Wohnadresse: Sie müssen den Leuten mitteilen, wie sie lautet, damit sie Sie finden können. Es ist sicher, dies zu tun, da Sie Ihre Haustür immer noch mit einem anderen Schlüssel abschließen können, den nur Sie kontrollieren, sodass niemand eindringen kann, selbst wenn er weiß, wo Sie wohnen.

Sie müssen jedem, der Ihnen Geld senden möchte, Ihre öffentliche Adresse mitteilen. Viele Wallet-Apps ermöglichen es Ihnen, Ihre Adresse zu kopieren oder einen QR-Code zum Scannen anzuzeigen, um die Nutzung zu erleichtern. Vermeiden Sie es, eine Ethereum-Adresse manuell einzugeben. Dies kann leicht zu Tippfehlern und verlorenen Geldern führen.

Verschiedene Apps können variieren oder eine andere Sprache verwenden, aber sie sollten Sie durch einen ähnlichen Prozess führen, wenn Sie versuchen, Gelder zu überweisen.

1. Öffnen Sie Ihre Wallet-App.
2. Klicken Sie auf "Empfangen" (oder eine ähnlich formulierte Option).
3. Kopieren Sie Ihre Ethereum-Adresse in die Zwischenablage.
4. Teilen Sie dem Absender Ihre Ethereum-Empfangsadresse mit.

## Kryptowährung senden

Möchten Sie ETH an eine andere Wallet senden?

1. Öffnen Sie Ihre Wallet-App.
2. Besorgen Sie sich die Empfangsadresse und stellen Sie sicher, dass Sie mit demselben Netzwerk wie der Empfänger verbunden sind.
3. Geben Sie die Empfangsadresse ein oder scannen Sie einen QR-Code mit Ihrer Kamera, damit Sie die Adresse nicht manuell schreiben müssen.
4. Klicken Sie in Ihrer Wallet auf die Schaltfläche „Senden“ (oder eine ähnlich formulierte Alternative).

![Senden-Feld für Krypto-Adresse](./send.png)
<br/>

5. Viele Vermögenswerte wie DAI oder USDC existieren in mehreren Netzwerken. Stellen Sie beim Überweisen von Krypto-Token sicher, dass der Empfänger dasselbe Netzwerk wie Sie verwendet, da diese nicht austauschbar sind.
6. Stellen Sie sicher, dass Ihre Wallet über ausreichend ETH verfügt, um die Transaktionsgebühr zu decken, die je nach Netzwerkbedingungen variiert. Die meisten Wallets fügen der Transaktion automatisch die vorgeschlagene Gebühr hinzu, die Sie dann bestätigen können.
7. Sobald Ihre Transaktion verarbeitet wurde, wird der entsprechende Krypto-Betrag auf dem Konto des Empfängers angezeigt. Dies kann je nach aktueller Auslastung des Netzwerks einige Sekunden bis einige Minuten dauern.

## Mit Projekten verbinden

Ihre Adresse ist in allen Ethereum-Projekten dieselbe. Sie müssen sich bei keinem Projekt einzeln registrieren. Sobald Sie eine Wallet haben, können Sie sich ohne zusätzliche Informationen mit jedem Ethereum-Projekt verbinden. Es werden keine E-Mails oder andere persönliche Informationen benötigt.

1. Besuchen Sie die Website eines beliebigen Projekts.
2. Wenn die Startseite des Projekts nur eine statische Beschreibung des Projekts ist, sollten Sie im Menü auf eine Schaltfläche "App öffnen" klicken können, die Sie zur eigentlichen Web-App weiterleitet.
3. Sobald Sie in der App sind, klicken Sie auf „Verbinden“.

![Schaltfläche, die es dem Benutzer ermöglicht, sich mit einer Wallet mit der Website zu verbinden](./connect1.png)

4. Wählen Sie Ihre Wallet aus der bereitgestellten Optionsliste aus. Wenn Sie Ihre Wallet nicht sehen können, ist sie möglicherweise unter der Option „WalletConnect“ verborgen.

![Auswahl aus einer Liste von Wallets zur Verbindung](./connect2.png)

5. Bestätigen Sie die Signaturanfrage in Ihrer Wallet, um die Verbindung herzustellen. **Das Signieren dieser Nachricht sollte keine ETH kosten**.
6. Das war's! Beginnen Sie mit der Nutzung der App. Sie können einige interessante Projekte auf unserer [Dapps-Seite](/apps/#explore) finden.
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Möchten Sie mehr erfahren?</div>
  <ButtonLink href="/guides/">
    Sehen Sie sich unsere anderen Leitfäden an
  </ButtonLink>
</AlertContent>
</Alert>

## Häufig gestellte Fragen

### Wenn ich eine ETH-Adresse besitze, besitze ich dann dieselbe Adresse auf anderen Blockchains?

Sie können dieselbe Adresse auf allen EVM-kompatiblen Blockchains verwenden (wenn Sie eine Wallet mit einer Wiederherstellungsphrase haben). Diese [Liste](https://chainlist.org/) zeigt Ihnen, welche Blockchains Sie mit derselben Adresse verwenden können. Einige Blockchains, wie Bitcoin, implementieren völlig andere Netzwerkregeln, und Sie benötigen eine andere Adresse mit einem anderen Format. Wenn Sie eine Smart Contract-Wallet haben, sollten Sie auf der Produktwebsite nach weiteren Informationen darüber suchen, welche Blockchains unterstützt werden.

### Kann ich dieselbe Adresse auf mehreren Geräten verwenden?

Ja, Sie können dieselbe Adresse auf mehreren Geräten verwenden. Wallets sind technisch gesehen nur eine Schnittstelle, um Ihnen Ihr Guthaben anzuzeigen und Transaktionen durchzuführen. Ihr Konto wird nicht in der Wallet gespeichert, sondern auf der Blockchain.

### Ich habe die Krypto nicht erhalten, wo kann ich den Status einer Transaktion überprüfen?

Sie können [Blocksuchmaschinen](/developers/docs/data-and-analytics/block-explorers/) verwenden, um den Status jeder Transaktion in Echtzeit zu sehen. Alles, was Sie tun müssen, ist nach Ihrer Wallet-Adresse oder der ID der Transaktion zu suchen.

### Kann ich Transaktionen stornieren oder rückgängig machen?

Nein, sobald eine Transaktion bestätigt ist, können Sie die Transaktion nicht mehr stornieren.