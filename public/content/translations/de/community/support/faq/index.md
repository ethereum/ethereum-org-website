---
title: Häufig gestellte Fragen
description: Häufige Fragen zu Ethereum rund um Wallets, Transaktionen, Staking und mehr.
lang: de
---

# Häufig gestellte Fragen {#faq}

## Ich habe Krypto an die falsche Adresse gesendet {#wrong-wallet}

Eine auf Ethereum gesendete Transaktion ist unumkehrbar. Wenn Sie ETH oder Token an die falsche Wallet gesendet haben, gibt es leider keine Möglichkeit, die Transaktion rückgängig zu machen.

**Was Sie tun können:**

- **Wenn Sie den Eigentümer der Adresse kennen**, kontaktieren Sie ihn direkt und bitten Sie ihn, die Gelder zurückzugeben
- **Wenn die Adresse zu einer Börse oder einem bekannten Dienst gehört**, kontaktieren Sie deren Support-Team, da es Ihnen möglicherweise helfen kann
- **Wenn Sie Token an eine Vertragsadresse gesendet haben**, prüfen Sie, ob der Vertrag über eine Auszahlungs- oder Wiederherstellungsfunktion verfügt (dies ist selten)

In den meisten Fällen gibt es keine Möglichkeit, das Geld wiederzuerlangen. Keine zentrale Organisation, Entität oder Person ist Eigentümer von Ethereum. Das bedeutet, dass auch niemand Transaktionen rückgängig machen kann. Überprüfen Sie die Empfängeradresse immer doppelt, bevor Sie bestätigen.

## Ich habe den Zugriff auf meine Wallet verloren {#lost-wallet-access}

Ihre Wiederherstellungsoptionen hängen von der Art der von Ihnen verwendeten Wallet ab.

### Wenn Sie Ihre Seed-Phrase (Wiederherstellungsphrase) haben

Sie können Ihre Wallet in jeder kompatiblen Wallet-App mit Ihrer Seed-Phrase wiederherstellen. Deshalb ist es so wichtig, Ihre Seed-Phrase sicher offline aufzubewahren. Anweisungen zur Wiederherstellung finden Sie in der Dokumentation Ihres Wallet-Anbieters.

### Wenn Sie Ihre Seed-Phrase verloren haben

Ohne Ihre Seed-Phrase oder Ihre privaten Schlüssel können Ihre Gelder nicht wiederhergestellt werden. Niemand, auch nicht ethereum.org, kann Ihr Passwort zurücksetzen oder den Zugang zu einer selbstverwalteten Wallet wiederherstellen.

### Wenn sich Ihr Konto bei einer Börse befindet

Wenn sich Ihr Konto bei einer zentralisierten Börse wie Coinbase, Binance oder Kraken befindet, wenden Sie sich direkt an das Support-Team der Börse. Diese kontrollieren die Konten auf ihrer Plattform und können möglicherweise bei der Rücksetzung von Passwörtern oder der Wiederherstellung von Konten helfen.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Teilen Sie Ihre Seed-Phrase niemals mit jemandem**, der behauptet, Ihnen bei der Wiederherstellung Ihrer Wallet zu helfen. Dies ist eine der häufigsten Betrugsmaschen. Kein seriöser Dienst wird Sie jemals nach Ihrer Seed-Phrase fragen.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Wie Sie eine Wallet benutzen
</DocLink>

## Meine Transaktion hängt fest oder ist ausstehend {#stuck-transaction}

Transaktionen auf Ethereum können hängen bleiben, wenn die von Ihnen festgelegte Gasgebühr niedriger ist als die, die das Netzwerk derzeit erfordert. Die meisten Wallets ermöglichen es Ihnen, dies zu beheben:

- **Beschleunigen:** Senden Sie die gleiche Transaktion mit einer höheren Gasgebühr erneut
- **Abbrechen:** Senden Sie eine 0-ETH-Transaktion an Ihre eigene Adresse und verwenden Sie dabei dieselbe Nonce wie bei der ausstehenden Transaktion

### Hilfreiche Anleitungen

- [Wie man eine ausstehende Transaktion auf MetaMask beschleunigt oder abbricht](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Wie man ausstehende Ethereum-Transaktionen abbricht](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Wie kann ich mein Ethereum-Giveaway erhalten? {#giveaway-scam}

Ethereum-Giveaways sind Betrugsmaschen, die darauf abzielen, Ihr ETH zu stehlen. Lassen Sie sich nicht von Angeboten verleiten, die zu gut scheinen, um wahr zu sein. Wenn Sie ETH an eine Giveaway-Adresse senden, werden Sie kein Giveaway erhalten und Sie werden Ihre Gelder nicht wiedererlangen können.

[Mehr zur Betrugsprävention](/security/#common-scams)

## Wie stake ich ETH? {#how-to-stake}

Um ein Validator zu werden, müssen Sie 32 ETH in den Einlagenvertrag von Ethereum einzahlen und einen Validator-Knoten aufbauen. Sie können auch mit weniger ETH über Staking-Pools teilnehmen.

Weitere Informationen finden Sie auf unseren [Staking-Seiten](/staking/) und auf dem [Staking-Launchpad](https://launchpad.ethereum.org/).

## Wie kann ich Ethereum minen? {#mining-ethereum}

Ethereum-Mining ist nicht mehr möglich. Das Mining wurde abgeschaltet, als Ethereum im September 2022 während [The Merge](/roadmap/merge/) von [Proof-of-Work](/glossary/#pow) auf [Proof-of-Stake](/glossary/#pos) umgestellt wurde. Anstatt Miner hat Ethereum jetzt Validatoren. Jeder kann ETH [staken](/glossary/#staking) und Staking-Belohnungen für das Ausführen von Validator-Software zur Sicherung des Netzwerks erhalten.
