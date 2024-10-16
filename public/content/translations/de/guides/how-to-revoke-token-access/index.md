---
title: So widerrufen Sie den Smart-Contract-Zugriff auf Ihre Krypto-Gelder
description: Ein Leitfaden für den Widerruf des Zugriffs auf ausbeuterische Smart Contract Token
lang: de
---

# So widerrufen Sie den Smart-Contract-Zugriff auf Ihre Krypto-Gelder

In dieser Anleitung zeigen wir Ihnen, wie Sie eine Liste aller [Smart Contracts](/glossary/#smart-contract) aufrufen können, denen Sie Zugriff zu Ihren Geldmitteln gestattet haben und wie Sie diese stornieren können.

Manchmal bauen böswillige Entwickler Hintertüren in intelligente Verträge ein, die den Zugriff auf die Gelder von ahnungslosen Benutzern ermöglichen, die mit dem intelligenten Vertrag interagieren. Häufig kommt es dazu, dass solche Plattformen den Nutzer um Erlaubnis bitten, eine **unbegrenzte Anzahl an Token** auszugeben, um zu versuchen, kleine [Gas](/glossary/#gas)-Beträge in der Zukunft zu sparen. Dies führt jedoch zu erhöhten Risiken.

Sobald eine Plattform über unbegrenzte Zugriffsrechte auf ein Token in Ihrer [Wallet](/glossary/#wallet) verfügt, kann sie all diese Token ausgeben, selbst wenn Sie Ihre Geldmittel von der Plattform in Ihre Wallet transferiert haben. Böswillige Akteure können nach wie vor auf Ihr Geld zugreifen und es in ihre Wallet abheben, ohne dass Sie eine Möglichkeit zur Wiederherstellung haben.

Der einzige Schutz besteht darin, keine ungeprüften neuen Projekte zu verwenden, nur das zu genehmigen, was Sie brauchen, oder den Zugriff regelmäßig zu widerrufen. Und wie macht man das?

## Schritt 1: Verwendung von Tools zum Entzug des Zugriffs

Auf mehreren Websites können Sie die mit Ihrer Adresse verbundenen intelligenten Verträge einsehen und widerrufen. Rufen Sie die Webseite auf und verbinden Sie sich mit Ihrer Wallet:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (multiple Netzwerke)
- [Revoke](https://revoke.cash/) (multiple Netzwerke)
- [Unrekt](https://app.unrekt.net/) (multiple Netzwerke)
- [EverRevoke](https://everrise.com/everrevoke/) (multiple Netzwerke)

## Schritt 2: Verbinden Sie Ihre Wallet

Sobald Sie die Webseite aufgerufen haben, klicken Sie auf „Connect Wallet". Die Website sollte Sie auffordern, Ihre Wallet zu verbinden.

Stellen Sie sicher, dass Sie das gleiche Netzwerk in Ihrer Wallet und Website verwenden. Es werden nur solche intelligenten Verträge angezeigt, die sich auf das ausgewählte Netzwerk beziehen. Wenn Sie sich zum Beispiel mit dem Ethereum Mainnet verbinden, sehen Sie nur Ethereum-Kontrakte und keine Kontrakte von anderen Ketten wie Polygon.

## Schritt 3: Wählen Sie einen intelligenten Vertrag, den Sie widerrufen möchten

Sie sollten alle Verträge sehen können, die Zugriff auf Ihre Token haben und ihr Ausgabenlimit. Finde denjenigen, den Sie beenden möchten.

Falls Sie nicht wissen, welchen Vertrag Sie wählen sollen, können Sie auch alle widerrufen. Es wird für Sie keine Probleme geben, jedoch werden Sie bei der nächsten Interaktion mit einem dieser Verträge neue Berechtigungen erteilen müssen.

## Schritt 4: Widerrufen Sie den Zugriff auf Ihre Gelder

Sobald Sie auf Widerrufen klicken, sollten Sie einen neuen Transaktionsvorschlag in Ihrer Wallet sehen. Das ist zu erwarten. Sie müssen die Gebühr bezahlen, damit die Stornierung erfolgreich ist. Die Bearbeitungsdauer hängt vom jeweiligen Netzwerk ab und kann zwischen einer Minute bis zu mehreren Minuten dauern.

Wir empfehlen Ihnen, das Widerrufs-Tool nach einigen Minuten zu aktualisieren und Ihre Wallet erneut zu verbinden, um doppelt zu prüfen, ob der widerrufene Vertrag aus der Liste verschwunden ist.

<mark>Wir empfehlen Ihnen, Projekten niemals uneingeschränkten Zugriff auf Ihre Token zu gewähren und regelmäßig alle Token-Erlaubniszugriffe zu widerrufen. Das Widerrufen des Token-Zugriffs sollte niemals zu einem Verlust von Geldmitteln führen, insbesondere wenn Sie die oben aufgeführten Tools verwenden.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Möchten Sie mehr erfahren?</div>
  <ButtonLink href="/guides/">
    Sehen Sie unsere anderen Anleitungen
  </ButtonLink>
</InfoBanner>

## Häufig gestellte Fragen

### Beendet das Widerrufen des Token-Zugriffs auch das Staking, Pooling, Lending usw.?

Nein, es wird keine Auswirkungen auf Ihre [DeFi](/glossary/#defi)-Strategien haben. Ihre Positionen bleiben bestehen und Sie erhalten, weiterhin Belohnungen usw.

### Ist das Trennen einer Wallet von einem Projekt dasselbe wie das Entfernen der Erlaubnis zur Verwendung meiner Gelder?

Nein, wenn Sie Ihre Wallet von einem Projekt trennen, aber Token-Erlaubniszugriffe gewährt haben, können sie immer noch diese Token verwenden. Sie müssen diesen Zugriff widerrufen.

### Wann läuft die Vertragsberechtigung ab?

Es gibt keine Ablaufdaten für Vertragsberechtigungen. Wenn Sie Vertragsberechtigungen gewähren, können diese auch Jahre später verwendet werden.

### Warum setzen einige Projekte den Token-Zugriff auf „unbegrenzt"?

Projekte tun dies oft, um die erforderliche Anzahl von Anfragen zu minimieren. Dies bedeutet, dass der Nutzer nur einmal genehmigen und die Transaktionsgebühr nur einmal zahlen muss. Das ist zwar bequem, kann sich aber bei Seiten, die nicht verifiziert sind oder noch nicht lange bestehen, als gefährlich erweisen. Einige Wallets erlauben es Ihnen, die Anzahl der genehmigten Token manuell zu begrenzen, um das Risiko zu senken. Weitere Informationen finden Sie bei Ihrem Wallet-Anbieter.
