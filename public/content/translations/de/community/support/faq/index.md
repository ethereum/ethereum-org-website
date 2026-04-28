---
title: "Häufig gestellte Fragen"
description: "Häufige Fragen zu Ethereum über Wallets, Transaktionen, Staking und mehr."
lang: de
---

# Häufig gestellte Fragen {#faq}

## Ich habe Krypto an die falsche Adresse gesendet {#wrong-wallet}

Eine auf Ethereum gesendete Transaktion ist irreversibel. Wenn Sie ETH oder Token an die falsche Wallet gesendet haben, gibt es leider keine Möglichkeit, die Transaktion rückgängig zu machen.

**Was Sie tun können:**

- **Wenn Sie den Besitzer der Adresse kennen**, kontaktieren Sie ihn direkt und bitten Sie ihn, das Geld zurückzusenden
- **Wenn die Adresse zu einer Börse oder einem bekannten Dienst gehört**, kontaktieren Sie deren Support-Team, da dieses möglicherweise helfen kann
- **Wenn Sie Token an eine Vertragsadresse gesendet haben**, prüfen Sie, ob der Vertrag über eine Auszahlungs- oder Wiederherstellungsfunktion verfügt (dies ist selten)

In den meisten Fällen gibt es keine Möglichkeit, das Geld zurückzuerhalten. Keine zentrale Organisation, Einrichtung oder Person besitzt Ethereum, was bedeutet, dass niemand Transaktionen rückgängig machen kann. Überprüfen Sie immer die Empfängeradresse, bevor Sie bestätigen.

## Ich habe den Zugriff auf meine Wallet verloren {#lost-wallet-access}

Ihre Wiederherstellungsoptionen hängen von der Art der Wallet ab, die Sie verwenden.

### Wenn Sie Ihre Seed-Phrase (Wiederherstellungsphrase) haben

Sie können Ihre Wallet in jeder kompatiblen Wallet-App mithilfe Ihrer Seed-Phrase wiederherstellen. Aus diesem Grund ist es von entscheidender Bedeutung, dass Sie Ihre Seed-Phrase sicher offline aufbewahren. Überprüfen Sie die Dokumentation Ihres Wallet-Anbieters auf Anweisungen zur Wiederherstellung.

### Wenn Sie Ihre Seed-Phrase verloren haben

Ohne Ihre Seed-Phrase oder Ihre Private-Keys kann Ihr Geld nicht wiederhergestellt werden. Niemand, einschließlich ethereum.org, kann Ihr Passwort zurücksetzen oder den Zugriff auf eine selbstverwaltete Wallet wiederherstellen.

### Wenn sich Ihr Konto bei einer Börse befindet

Wenn sich Ihr Konto bei einer zentralisierten Börse wie Coinbase, Binance oder Kraken befindet, kontaktieren Sie das Support-Team der Börse direkt. Sie kontrollieren die Konten auf ihrer Plattform und können möglicherweise beim Zurücksetzen des Passworts oder bei der Kontowiederherstellung helfen.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Teilen Sie Ihre Seed-Phrase niemals mit jemandem**, der behauptet, Ihnen bei der Wiederherstellung Ihrer Wallet zu helfen. Dies ist eine der häufigsten Betrugstaktiken. Kein seriöser Dienst wird Sie jemals nach Ihrer Seed-Phrase fragen.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Wie man eine Wallet verwendet
</DocLink>

## Meine Transaktion steckt fest oder ist ausstehend {#stuck-transaction}

Transaktionen auf Ethereum können stecken bleiben, wenn die von Ihnen festgelegte Gasgebühr niedriger war als das, was das Netzwerk derzeit erfordert. Die meisten Wallets ermöglichen es Ihnen, dies zu beheben:

- **Beschleunigen:** Senden Sie dieselbe Transaktion mit einer höheren Gasgebühr erneut
- **Abbrechen:** Senden Sie eine Transaktion über 0 ETH an Ihre eigene Adresse und verwenden Sie dabei dieselbe Nonce wie bei der ausstehenden Transaktion

### Hilfreiche Leitfäden

- [Wie man eine ausstehende Transaktion auf MetaMask beschleunigt oder abbricht](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Wie man ausstehende Ethereum-Transaktionen abbricht](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Wie kann ich mein Ethereum-Giveaway beanspruchen? {#giveaway-scam}

Ethereum-Giveaways sind Betrugsmaschen, die darauf abzielen, Ihre ETH zu stehlen. Lassen Sie sich nicht von Angeboten verleiten, die zu gut klingen, um wahr zu sein. Wenn Sie ETH an eine Giveaway-Adresse senden, erhalten Sie kein Giveaway und können Ihr Geld nicht zurückerhalten.

[Mehr zur Betrugsprävention](/security/#common-scams)

## Wie stake ich ETH? {#how-to-stake}

Um ein Validator zu werden, müssen Sie 32 ETH im Ethereum-Einzahlungsvertrag staken und einen Validator-Blockchain-Knoten einrichten. Sie können auch mit weniger ETH über Staking-Pools teilnehmen.

Weitere Informationen finden Sie auf unseren [Staking-Seiten](/staking/) und auf dem [Staking Launchpad](https://launchpad.ethereum.org/).

## Wie mine ich Ethereum? {#mining-ethereum}

Ethereum-Mining ist nicht mehr möglich. Das Mining wurde abgeschaltet, als Ethereum während [des Merge](/roadmap/merge/) im September 2022 von [Proof-of-Work](/glossary/#pow) zu [Proof-of-Stake](/glossary/#pos) wechselte. Jetzt hat Ethereum anstelle von Minern Validatoren. Jeder kann ETH [staken](/glossary/#staking) und Staking-Belohnungen für das Ausführen von Validator-Software zur Sicherung des Netzwerks erhalten.