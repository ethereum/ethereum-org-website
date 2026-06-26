---
title: So widerrufen Sie den Zugriff von Smart Contracts auf Ihr Krypto-Guthaben
description: Eine Anleitung zum Widerrufen des Token-Zugriffs durch ausbeuterische Smart Contracts
lang: de
---

Diese Anleitung zeigt Ihnen, wie Sie eine Liste aller [Smart Contracts](/glossary/#smart-contract) anzeigen können, denen Sie Zugriff auf Ihr Guthaben gewährt haben, und wie Sie diesen widerrufen können.

Manchmal bauen böswillige Entwickler Hintertüren in Smart Contracts ein, die den Zugriff auf das Guthaben ahnungsloser Benutzer ermöglichen, die mit dem Smart Contract interagieren. Oftmals bitten solche Plattformen den Benutzer um die Erlaubnis, eine **unbegrenzte Anzahl von Token** auszugeben, um in Zukunft kleine Mengen an [Gas](/glossary/#gas) zu sparen, was jedoch mit einem erhöhten Risiko verbunden ist.

Sobald eine Plattform unbegrenzte Zugriffsrechte auf einen Token in Ihrer [Wallet](/glossary/#wallet) hat, kann sie all diese Token ausgeben, selbst wenn Sie Ihr Guthaben von deren Plattform in Ihre Wallet abgehoben haben. Böswillige Akteure können weiterhin auf Ihr Guthaben zugreifen und es in ihre Wallets abheben, ohne dass Ihnen eine Möglichkeit zur Wiederherstellung bleibt.

Der einzige Schutz besteht darin, auf die Nutzung ungetesteter neuer Projekte zu verzichten, nur das zu genehmigen, was Sie benötigen, oder den Zugriff regelmäßig zu widerrufen. Wie machen Sie das also?

## Schritt 1: Tools zum Widerrufen des Zugriffs verwenden {#step-1-use-revoke-access-tools}

Auf mehreren Websites können Sie Smart Contracts anzeigen und widerrufen, die mit Ihrer Adresse verbunden sind. Besuchen Sie die Website und verbinden Sie Ihre Wallet:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (mehrere Netzwerke)
- [Unrekt](https://app.unrekt.net/) (mehrere Netzwerke)
- [EverRevoke](https://everrise.com/everrevoke/) (mehrere Netzwerke)

## Schritt 2: Verbinden Sie Ihre Wallet {#step-2-connect-your-wallet}

Sobald Sie auf der Website sind, klicken Sie auf „Connect wallet“ (Wallet verbinden). Die Website sollte Sie auffordern, Ihre Wallet zu verbinden.

Stellen Sie sicher, dass Sie in Ihrer Wallet und auf der Website dasselbe Netzwerk verwenden. Sie sehen nur Smart Contracts, die sich auf das ausgewählte Netzwerk beziehen. Wenn Sie sich beispielsweise mit dem Ethereum Mainnet verbinden, sehen Sie nur Ethereum-Verträge und keine Verträge von anderen Chains wie Polygon.

## Schritt 3: Wählen Sie einen Smart Contract aus, den Sie widerrufen möchten {#step-3-select-a-smart-contract-you-wish-to-revoke}

Sie sollten alle Verträge sehen, denen der Zugriff auf Ihre Token gestattet ist, sowie deren Ausgabelimit. Suchen Sie denjenigen, den Sie beenden möchten.

Wenn Sie nicht wissen, welchen Vertrag Sie wählen sollen, können Sie alle widerrufen. Das wird Ihnen keine Probleme bereiten, aber Sie müssen bei der nächsten Interaktion mit einem dieser Verträge neue Berechtigungen erteilen.

## Schritt 4: Widerrufen Sie den Zugriff auf Ihr Guthaben {#step-4-revoke-access-to-your-funds}

Sobald Sie auf Widerrufen klicken, sollten Sie einen neuen Transaktionsvorschlag in Ihrer Wallet sehen. Das ist zu erwarten. Sie müssen die Gebühr bezahlen, damit die Stornierung erfolgreich ist. Je nach Netzwerk kann die Verarbeitung eine bis mehrere Minuten dauern.

Wir raten Ihnen, das Widerrufs-Tool nach ein paar Minuten zu aktualisieren und Ihre Wallet erneut zu verbinden, um zu überprüfen, ob der widerrufene Vertrag aus der Liste verschwunden ist.

<mark>Wir empfehlen Ihnen, Projekten niemals unbegrenzten Zugriff auf Ihre Token zu gewähren und alle Token-Freigabebeträge regelmäßig zu widerrufen. Der Widerruf des Token-Zugriffs sollte niemals zu einem Verlust von Guthaben führen, insbesondere wenn Sie die oben aufgeführten Tools verwenden.</mark>

 <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Möchten Sie mehr erfahren?</div>
  <ButtonLink href="/guides/">
    Sehen Sie sich unsere anderen Anleitungen an
  </ButtonLink>
</AlertContent>
</Alert>

## Häufig gestellte Fragen {#frequently-asked-questions}

### Beendet der Widerruf des Token-Zugriffs auch Staking, Pooling, Kreditvergabe usw.? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Nein, es hat keine Auswirkungen auf Ihre [DeFi](/glossary/#defi)-Strategien. Sie behalten Ihre Positionen und erhalten weiterhin Belohnungen usw.

### Ist das Trennen einer Wallet von einem Projekt dasselbe wie das Entziehen der Erlaubnis, mein Guthaben zu verwenden? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Nein, wenn Sie Ihre Wallet vom Projekt trennen, aber Token-Freigabebeträge genehmigt haben, können diese Token weiterhin verwendet werden. Sie müssen diesen Zugriff widerrufen.

### Wann läuft die Vertragsberechtigung ab? {#when-will-the-contract-permission-expire}

Es gibt keine Ablaufdaten für Vertragsberechtigungen. Wenn Sie Vertragsberechtigungen erteilen, können diese auch Jahre nach der Erteilung noch verwendet werden.

### Warum legen Projekte unbegrenzte Token-Freigabebeträge fest? {#why-do-projects-set-unlimited-token-allowance}

Projekte tun dies oft, um die Anzahl der erforderlichen Anfragen zu minimieren, was bedeutet, dass der Benutzer nur einmal genehmigen und die Transaktionsgebühr nur einmal bezahlen muss. Obwohl dies bequem ist, kann es für Benutzer gefährlich sein, unvorsichtig auf Websites zu genehmigen, die sich nicht über die Zeit bewährt haben oder geprüft wurden. Einige Wallets ermöglichen es Ihnen, die Menge der genehmigten Token manuell einzuschränken, um Ihr Risiko zu begrenzen. Erkundigen Sie sich bei Ihrem Wallet-Anbieter nach weiteren Informationen.