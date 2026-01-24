---
title: So widerrufen Sie den Smart-Contract-Zugriff auf Ihre Krypto-Geldmittel
description: Ein Leitfaden für den Widerruf des Zugriffs auf ausbeuterische Smart Contract Token
lang: de
---

# So widerrufen Sie den Smart-Contract-Zugriff auf Ihre Krypto-Geldmittel

Diese Anleitung zeigt Ihnen, wie Sie eine Liste aller [Smart Contracts](/glossary/#smart-contract) einsehen, denen Sie Zugriff auf Ihre Gelder gewährt haben, und wie Sie diese widerrufen können.

Manchmal bauen böswillige Entwickler Hintertüren in intelligente Verträge ein, die den Zugriff auf die Gelder von ahnungslosen Benutzern ermöglichen, die mit dem intelligenten Vertrag interagieren. Häufig bitten solche Plattformen den Nutzer um die Erlaubnis, eine **unbegrenzte Anzahl von Tokens** auszugeben, um in Zukunft kleine Mengen an [Gas](/glossary/#gas) zu sparen, was jedoch mit einem erhöhten Risiko verbunden ist.

Sobald eine Plattform unbegrenzte Zugriffsrechte auf einen Token in Ihrer [Wallet](/glossary/#wallet) hat, kann sie alle diese Tokens ausgeben, selbst wenn Sie Ihr Geld von dieser Plattform in Ihre Wallet abgehoben haben. Böswillige Akteure können nach wie vor auf Ihr Geld zugreifen und es in ihre Wallet abheben, ohne dass Sie eine Möglichkeit zur Wiederherstellung haben.

Der einzige Schutz besteht darin, keine ungeprüften neuen Projekte zu verwenden, nur das zu genehmigen, was Sie brauchen, oder den Zugriff regelmäßig zu widerrufen. Und wie macht man das?

## Schritt 1: Verwendung von Tools zum Entzug des Zugriffs

Auf mehreren Websites können Sie die mit Ihrer Adresse verbundenen intelligenten Verträge einsehen und widerrufen. Rufen Sie die Webseite auf und verbinden Sie sich mit Ihrer Wallet:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/apps/revokescout) (Ethereum)
- [Revoke](https://revoke.cash/) (mehrere Netzwerke)
- [Unrekt](https://app.unrekt.net/) (mehrere Netzwerke)
- [EverRevoke](https://everrise.com/everrevoke/) (mehrere Netzwerke)

## Schritt 2: Verbinden Sie Ihre Wallet

Sobald Sie die Webseite aufgerufen haben, klicken Sie auf „Connect Wallet". Die Website sollte Sie auffordern, Ihre Wallet zu verbinden.

Stellen Sie sicher, dass Sie das gleiche Netzwerk in Ihrer Wallet und Website verwenden. Es werden nur solche intelligenten Verträge angezeigt, die sich auf das ausgewählte Netzwerk beziehen. Wenn Sie sich zum Beispiel mit dem Ethereum Mainnet verbinden, sehen Sie nur Ethereum-Kontrakte und keine Kontrakte von anderen Ketten wie Polygon.

## Schritt 3: Wählen Sie einen intelligenten Vertrag, den Sie widerrufen möchten

Sie sollten alle Verträge sehen können, die Zugriff auf Ihre Token haben und ihr Ausgabenlimit. Finde denjenigen, den Sie beenden möchten.

Falls Sie nicht wissen, welchen Vertrag Sie wählen sollen, können Sie auch alle widerrufen. Es wird für Sie keine Probleme geben, jedoch werden Sie bei der nächsten Interaktion mit einem dieser Verträge neue Berechtigungen erteilen müssen.

## Schritt 4: Widerrufen Sie den Zugriff auf Ihre Gelder

Sobald Sie auf Widerrufen klicken, sollten Sie einen neuen Transaktionsvorschlag in Ihrer Wallet sehen. Das ist zu erwarten. Sie müssen die Gebühr bezahlen, damit die Stornierung erfolgreich ist. Die Bearbeitungsdauer hängt vom jeweiligen Netzwerk ab und kann zwischen einer Minute bis zu mehreren Minuten dauern.

Wir empfehlen Ihnen, das Widerrufs-Tool nach einigen Minuten zu aktualisieren und Ihre Wallet erneut zu verbinden, um doppelt zu prüfen, ob der widerrufene Vertrag aus der Liste verschwunden ist.

<mark>Wir empfehlen Ihnen, Projekten niemals unbegrenzten Zugriff auf Ihre Tokens zu gewähren und alle Token-Freigaben regelmäßig zu widerrufen. Das Widerrufen des Token-Zugriffs sollte niemals zu einem Verlust von Geldmitteln führen, insbesondere wenn Sie die oben aufgeführten Tools verwenden.</mark>

<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Möchten Sie mehr erfahren?</div>
  <ButtonLink href="/guides/">
    Sehen Sie unsere anderen Anleitungen
  </ButtonLink>
</AlertContent>
</Alert>

## Häufig gestellte Fragen

### Beendet das Widerrufen des Token-Zugriffs auch das Staking, Pooling, Lending usw.?

Nein, es wird sich nicht auf Ihre [DeFi](/glossary/#defi)-Strategien auswirken. Ihre Positionen bleiben bestehen und Sie erhalten, weiterhin Belohnungen usw.

### Ist das Trennen einer Wallet von einem Projekt dasselbe wie das Entfernen der Erlaubnis zur Verwendung meiner Gelder?

Nein, wenn Sie Ihre Wallet von einem Projekt trennen, aber Token-Erlaubniszugriffe gewährt haben, können sie immer noch diese Token verwenden. Sie müssen diesen Zugriff widerrufen.

### Wann läuft die Vertragsberechtigung ab?

Es gibt keine Ablaufdaten für Vertragsberechtigungen. Wenn Sie Vertragsberechtigungen gewähren, können diese auch Jahre später verwendet werden.

### Warum setzen einige Projekte den Token-Zugriff auf „unbegrenzt"?

Projekte tun dies oft, um die erforderliche Anzahl von Anfragen zu minimieren. Dies bedeutet, dass der Nutzer nur einmal genehmigen und die Transaktionsgebühr nur einmal zahlen muss. Das ist zwar bequem, kann sich aber bei Seiten, die nicht verifiziert sind oder noch nicht lange bestehen, als gefährlich erweisen. Einige Wallets erlauben es Ihnen, die Anzahl der genehmigten Token manuell zu begrenzen, um das Risiko zu senken. Weitere Informationen finden Sie bei Ihrem Wallet-Anbieter.
