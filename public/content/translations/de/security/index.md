---
title: "Ethereum-Sicherheit und Betrugsprävention"
description: Sicher bleiben auf Ethereum
lang: de
---

# Ethereum-Sicherheit und Betrugsprävention {#introduction}

Das steigende Interesse an Kryptowährungen bringt ein wachsendes Risiko durch Betrüger und Hacker mit sich. Dieser Artikel stellt einige bewährte Methoden vor, um diese Risiken zu mindern.

**Denken Sie daran: Niemand von ethereum.org wird Sie jemals kontaktieren. Antworten Sie nicht auf E-Mails, die behaupten, vom offiziellen Ethereum-Support zu stammen.**

<Divider />

## Krypto-Sicherheit 101 {#crypto-security}

### Erweitern Sie Ihr Wissen {#level-up-your-knowledge}

Missverständnisse darüber, wie Krypto funktioniert, können zu kostspieligen Fehlern führen. Wenn sich beispielsweise jemand als Kundendienstmitarbeiter ausgibt, der verlorene ETH im Austausch für Ihre Private-Keys zurückgeben kann, nutzt er aus, dass die Leute nicht verstehen, dass [Ethereum](/) ein dezentralisiertes Netzwerk ist, dem diese Art von Funktionalität fehlt. Sich darüber zu informieren, wie Ethereum funktioniert, ist eine lohnende Investition.

<DocLink href="/what-is-ethereum/">
  Was ist Ethereum?
</DocLink>

<DocLink href="/eth/">
  Was ist Ether?
</DocLink>
<Divider />

## Wallet-Sicherheit {#wallet-security}

### Teilen Sie niemals Ihre Wiederherstellungsphrase {#protect-private-keys}

**Teilen Sie niemals, aus welchem Grund auch immer, Ihre Wiederherstellungsphrase oder Ihre Private-Keys!**

Ihre Wiederherstellungsphrase (auch geheime Wiederherstellungsphrase oder Seed-Phrase genannt) ist der Hauptschlüssel zu Ihrem Wallet. Jeder, der sie hat, kann auf alle Ihre Konten zugreifen und jedes Guthaben abräumen. Private-Keys funktionieren auf die gleiche Weise für einzelne Konten. Kein legitimer Dienst, Support-Mitarbeiter oder keine Website wird Sie jemals danach fragen.

<DocLink href="/wallets/">
  Was ist ein Ethereum-Wallet?
</DocLink>

#### Machen Sie keine Screenshots von Ihren Seed-Phrasen/Private-Keys {#screenshot-private-keys}

Wenn Sie Screenshots von Ihren Seed-Phrasen oder Private-Keys machen, werden diese möglicherweise mit einem Cloud-Datenanbieter synchronisiert, was sie für Hacker zugänglich machen könnte. Das Beschaffen von Private-Keys aus der Cloud ist ein häufiger Angriffsvektor für Hacker.

### Verwenden Sie ein Hardware-Wallet {#use-hardware-wallet}

Ein Hardware-Wallet bietet Offline-Speicher für Private-Keys. Sie gelten als die sicherste Wallet-Option zur Aufbewahrung Ihrer Private-Keys: Ihr Private-Key kommt nie mit dem Internet in Berührung und bleibt vollständig lokal auf Ihrem Gerät.

Das Offline-Halten von Private-Keys reduziert das Risiko, gehackt zu werden, massiv, selbst wenn ein Hacker die Kontrolle über Ihren Computer erlangt.

#### Probieren Sie ein Hardware-Wallet aus: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Überprüfen Sie Transaktionen vor dem Senden doppelt {#double-check-transactions}

Das versehentliche Senden von Krypto an die falsche Wallet-Adresse ist ein häufiger Fehler. **Eine auf Ethereum gesendete Transaktion ist irreversibel.** Es sei denn, Sie kennen den Inhaber der Adresse und können ihn überzeugen, Ihnen Ihr Geld zurückzusenden, werden Sie Ihr Geld nicht zurückerhalten können.

Stellen Sie immer sicher, dass die Adresse, an die Sie senden, genau mit der Adresse des gewünschten Empfängers übereinstimmt, bevor Sie eine Transaktion senden.
Es ist eine gute Praxis, bei der Interaktion mit einem Smart Contract die Transaktionsnachricht vor dem Signieren zu lesen.

### Legen Sie Ausgabenlimits für Smart Contracts fest {#spend-limits}

Erlauben Sie bei der Interaktion mit Smart Contracts keine unbegrenzten Ausgabenlimits. Ein unbegrenztes Ausgabenlimit könnte es dem Smart Contract ermöglichen, Ihr Wallet leerzuräumen. Legen Sie stattdessen Ausgabenlimits nur auf den für die Transaktion erforderlichen Betrag fest.

Viele Ethereum-Wallets bieten einen Limits-Schutz, um Konten davor zu bewahren, leergeräumt zu werden.

[So widerrufen Sie den Zugriff von Smart Contracts auf Ihre Krypto-Guthaben](/guides/how-to-revoke-token-access/)

<Divider />

## Häufige Betrugsmaschen {#common-scams}

Es ist unmöglich, Betrüger vollständig zu stoppen, aber wir können sie weniger effektiv machen, indem wir uns ihrer am häufigsten verwendeten Techniken bewusst sind. Es gibt viele Variationen dieser Betrugsmaschen, aber sie folgen im Allgemeinen denselben übergeordneten Mustern. Wenn Sie sich sonst nichts merken, denken Sie an Folgendes:

- seien Sie immer skeptisch
- niemand wird Ihnen kostenlose oder vergünstigte ETH geben
- niemand benötigt Zugriff auf Ihre Private-Keys oder persönlichen Informationen

### Twitter-Anzeigen-Phishing {#ad-phishing}

![Twitter-Link-Phishing](./twitterPhishingScam.png)

Es gibt eine Methode zur Manipulation der Link-Vorschaufunktion (Unfurling) von Twitter (auch bekannt als X), um Benutzer potenziell in dem Glauben zu täuschen, sie würden eine legitime Website besuchen. Diese Technik nutzt den Mechanismus von Twitter zur Generierung von Vorschauen von in Tweets geteilten URLs aus und zeigt beispielsweise _von ethereum.org_ an (siehe oben), während sie in Wirklichkeit auf eine bösartige Website umgeleitet werden.

Überprüfen Sie immer, ob Sie sich auf der richtigen Domain befinden, insbesondere nachdem Sie auf einen Link geklickt haben.

[Weitere Informationen hier](https://harrydenley.com/faking-twitter-unfurling).

### Giveaway-Betrug {#giveaway}

Einer der häufigsten Betrügereien bei Kryptowährungen ist der Giveaway-Betrug. Der Giveaway-Betrug kann viele Formen annehmen, aber die allgemeine Idee ist, dass Sie, wenn Sie ETH an die angegebene Wallet-Adresse senden, Ihre ETH verdoppelt zurückerhalten. *Aus diesem Grund ist er auch als 2-für-1-Betrug bekannt.*

Diese Betrügereien geben in der Regel ein begrenztes Zeitfenster vor, um das Giveaway in Anspruch zu nehmen, um ein falsches Gefühl der Dringlichkeit zu erzeugen.

### Social-Media-Hacks {#social-media-hacks}

Eine aufsehenerregende Version davon ereignete sich im Juli 2020, als die Twitter-Konten prominenter Persönlichkeiten und Organisationen gehackt wurden. Der Hacker postete gleichzeitig ein Bitcoin-Giveaway auf den gehackten Konten. Obwohl die irreführenden Tweets schnell bemerkt und gelöscht wurden, gelang es den Hackern dennoch, mit 11 Bitcoin (oder 500.000 $ Stand September 2021) davonzukommen.

![Ein Betrug auf Twitter](./appleTwitterScam.png)

### Promi-Giveaway {#celebrity-giveaway}

Das Promi-Giveaway ist eine weitere häufige Form des Giveaway-Betrugs. Die Betrüger nehmen ein aufgezeichnetes Videointerview oder einen Konferenzvortrag eines Prominenten und streamen es live auf YouTube – so dass es so aussieht, als würde der Prominente ein Live-Videointerview geben, in dem er ein Kryptowährungs-Giveaway unterstützt.

Vitalik Buterin wird am häufigsten für diesen Betrug verwendet, aber auch viele andere prominente Personen, die in Krypto involviert sind, werden genutzt (z. B. Elon Musk oder Charles Hoskinson). Die Einbeziehung einer bekannten Person verleiht dem Livestream der Betrüger ein Gefühl der Legitimität (das sieht verdächtig aus, aber Vitalik ist involviert, also muss es in Ordnung sein!).

**Giveaways sind immer Betrug. Wenn Sie Ihr Geld an diese Konten senden, werden Sie es für immer verlieren.**

![Ein Betrug auf YouTube](./youtubeScam.png)

### Support-Betrug {#support-scams}

Kryptowährung ist eine relativ junge und missverstandene Technologie. Ein häufiger Betrug, der dies ausnutzt, ist der Support-Betrug, bei dem sich Betrüger als Support-Mitarbeiter für beliebte Wallets, Börsen oder Blockchains ausgeben.

Ein Großteil der Diskussionen über Ethereum findet auf Discord statt. Support-Betrüger finden ihr Ziel in der Regel, indem sie in öffentlichen Discord-Kanälen nach Support-Fragen suchen und dem Fragesteller dann eine private Nachricht senden, in der sie Unterstützung anbieten. Durch den Aufbau von Vertrauen versuchen Support-Betrüger, Sie dazu zu bringen, Ihre Private-Keys preiszugeben oder Ihr Geld an ihre Wallets zu senden.

![Ein Support-Betrug auf Discord](./discordScam.png)

Als allgemeine Regel gilt, dass Mitarbeiter niemals über private, inoffizielle Kanäle mit Ihnen kommunizieren werden. Einige einfache Dinge, die Sie im Umgang mit dem Support beachten sollten:

- Teilen Sie niemals Ihre Private-Keys, Seed-Phrasen oder Passwörter
- Erlauben Sie niemals jemandem Fernzugriff auf Ihren Computer
- Kommunizieren Sie niemals außerhalb der dafür vorgesehenen Kanäle einer Organisation

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Vorsicht: Obwohl Betrügereien im Support-Stil häufig auf Discord vorkommen, können sie auch in allen Chat-Anwendungen verbreitet sein, in denen Krypto-Diskussionen stattfinden, einschließlich E-Mail.
</AlertDescription>
</AlertContent>
</Alert>

### 'Eth2'-Token-Betrug {#eth2-token-scam}

Im Vorfeld von [The Merge](/roadmap/merge/) nutzten Betrüger die Verwirrung um den Begriff 'Eth2' aus, um zu versuchen, Benutzer dazu zu bringen, ihre ETH gegen einen 'ETH2'-Token einzutauschen. Es gibt kein 'ETH2', und mit The Merge wurde kein anderer legitimer Token eingeführt. Die ETH, die Sie vor The Merge besaßen, sind jetzt dieselben ETH. Es besteht **keine Notwendigkeit, irgendwelche Maßnahmen in Bezug auf Ihre ETH zu ergreifen, um dem Wechsel von Proof-of-Work zu Proof-of-Stake Rechnung zu tragen**.

Betrüger können als "Support" auftreten und Ihnen mitteilen, dass Sie, wenn Sie Ihre ETH einzahlen, 'ETH2' zurückerhalten. Es gibt keinen [offiziellen Ethereum-Support](/community/support/), und es gibt keinen neuen Token. Teilen Sie niemals Ihre Wallet-Seed-Phrase mit jemandem.

_Hinweis: Es gibt derivative Token/Ticker, die gestakte ETH repräsentieren können (z. B. rETH von Rocket Pool, stETH von Lido, ETH2 von Coinbase), aber dies ist nichts, wohin Sie "migrieren" müssen._

### Phishing-Betrug {#phishing-scams}

Phishing-Betrug ist ein weiterer, immer häufiger werdender Ansatz, den Betrüger nutzen, um zu versuchen, das Guthaben Ihres Wallets zu stehlen.

Einige Phishing-E-Mails fordern Benutzer auf, auf Links zu klicken, die sie auf nachgeahmte Websites umleiten, und fordern sie auf, ihre Seed-Phrase einzugeben, ihr Passwort zurückzusetzen oder ETH zu senden. Andere fordern Sie möglicherweise auf, unwissentlich Malware zu installieren, um Ihren Computer zu infizieren und Betrügern Zugriff auf die Dateien Ihres Computers zu geben.

Wenn Sie eine E-Mail von einem unbekannten Absender erhalten, denken Sie daran:

- Öffnen Sie niemals einen Link oder Anhang von E-Mail-Adressen, die Sie nicht kennen
- Geben Sie niemals Ihre persönlichen Informationen oder Passwörter an jemanden weiter
- Löschen Sie E-Mails von unbekannten Absendern

[Mehr zur Vermeidung von Phishing-Betrug](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Krypto-Trading-Broker-Betrug {#broker-scams}

Betrügerische Krypto-Trading-Broker behaupten, spezialisierte Kryptowährungs-Broker zu sein, die anbieten, Ihr Geld zu nehmen und in Ihrem Namen zu investieren. Nachdem der Betrüger Ihr Geld erhalten hat, kann er Sie hinhalten und Sie bitten, mehr Geld zu senden, damit Sie keine weiteren Anlagegewinne verpassen, oder er verschwindet vollständig.

Diese Betrüger finden oft Ziele, indem sie gefälschte Konten auf YouTube verwenden, um scheinbar natürliche Gespräche über den 'Broker' zu beginnen. Diese Gespräche werden oft stark hochgevotet, um die Legitimität zu erhöhen, aber die Upvotes stammen alle von Bot-Konten.

**Vertrauen Sie keinen Fremden im Internet, die in Ihrem Namen investieren wollen. Sie werden Ihre Krypto verlieren.**

![Ein Trading-Broker-Betrug auf YouTube](./brokerScam.png)

### Krypto-Mining-Pool-Betrug {#mining-pool-scams}

Seit September 2022 ist das Mining auf Ethereum nicht mehr möglich. Dennoch gibt es weiterhin Mining-Pool-Betrügereien. Bei Mining-Pool-Betrügereien kontaktieren Sie Personen unaufgefordert und behaupten, dass Sie durch den Beitritt zu einem Ethereum-Mining-Pool hohe Renditen erzielen können. Der Betrüger wird Behauptungen aufstellen und so lange mit Ihnen in Kontakt bleiben, wie es nötig ist. Im Wesentlichen wird der Betrüger versuchen, Sie davon zu überzeugen, dass Ihre Kryptowährung bei einem Beitritt zu einem Ethereum-Mining-Pool zur Erstellung von ETH verwendet wird und dass Ihnen ETH-Dividenden ausgezahlt werden. Sie werden dann sehen, dass Ihre Kryptowährung kleine Renditen erzielt. Dies dient lediglich dazu, Sie dazu zu verleiten, mehr zu investieren. Letztendlich wird Ihr gesamtes Geld an eine unbekannte Adresse gesendet, und der Betrüger wird entweder verschwinden oder in einigen Fällen weiterhin in Kontakt bleiben, wie es in einem kürzlichen Fall geschehen ist.

Fazit: Seien Sie vorsichtig bei Personen, die Sie in den sozialen Medien kontaktieren und Sie bitten, Teil eines Mining-Pools zu werden. Sobald Sie Ihre Krypto verlieren, ist sie weg.

Einige Dinge, die Sie sich merken sollten:

- Seien Sie vorsichtig bei jedem, der Sie bezüglich Möglichkeiten kontaktiert, mit Ihrer Krypto Geld zu verdienen
- Recherchieren Sie über Staking, Liquiditätspools oder andere Möglichkeiten, Ihre Krypto zu investieren
- Selten, wenn überhaupt, sind solche Systeme legitim. Wenn sie es wären, wären sie wahrscheinlich Mainstream und Sie hätten davon gehört.

[Mann verliert 200.000 $ bei Mining-Pool-Betrug](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop-Betrug {#airdrop-scams}

Bei Airdrop-Betrügereien wirft ein Betrugsprojekt einen Vermögenswert (NFT, Token) per Airdrop in Ihr Wallet ab und leitet Sie auf eine Betrugswebsite weiter, um den abgeworfenen Vermögenswert zu beanspruchen. Sie werden aufgefordert, sich mit Ihrem Ethereum-Wallet anzumelden und eine Transaktion zu "genehmigen", wenn Sie versuchen, ihn zu beanspruchen. Diese Transaktion kompromittiert Ihr Konto, indem sie Ihre Public- und Private-Keys an den Betrüger sendet. Eine alternative Form dieses Betrugs kann Sie dazu bringen, eine Transaktion zu bestätigen, die Geld auf das Konto des Betrügers sendet.

[Mehr zu Airdrop-Betrug](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Web-Sicherheit 101 {#web-security}

### Verwenden Sie starke Passwörter {#use-strong-passwords}

[Über 80 % der Konto-Hacks sind das Ergebnis schwacher oder gestohlener Passwörter](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Eine lange Kombination aus Zeichen, Zahlen und Symbolen hilft dabei, Ihre Konten sicher zu halten.

Ein häufiger Fehler ist die Verwendung einer Kombination aus wenigen gebräuchlichen, verwandten Wörtern. Solche Passwörter sind unsicher, da sie anfällig für eine Hacking-Technik namens Wörterbuchangriff sind.

```md
Example of a weak password: CuteFluffyKittens!

Example of a strong password: ymv\*azu.EAC8eyp8umf
```

Ein weiterer häufiger Fehler ist die Verwendung von Passwörtern, die leicht erraten oder durch [Social Engineering](<https://wikipedia.org/wiki/Social_engineering_(security)>) herausgefunden werden können. Die Einbeziehung des Mädchennamens Ihrer Mutter, der Namen Ihrer Kinder oder Haustiere oder von Geburtsdaten in Ihr Passwort erhöht das Risiko, gehackt zu werden.

#### Gute Passwort-Praktiken: {#good-password-practices}

- Machen Sie Passwörter so lang, wie es entweder Ihr Passwortgenerator oder das Formular, das Sie ausfüllen, zulässt
- Verwenden Sie eine Mischung aus Groß- und Kleinbuchstaben, Zahlen und Symbolen
- Verwenden Sie keine persönlichen Daten wie Familiennamen in Ihrem Passwort
- Vermeiden Sie gebräuchliche Wörter

[Mehr zum Erstellen starker Passwörter](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Verwenden Sie für alles einzigartige Passwörter {#use-unique-passwords}

Ein starkes Passwort, das bei einer Datenschutzverletzung offengelegt wurde, ist kein starkes Passwort mehr. Die Website [Have I Been Pwned](https://haveibeenpwned.com) ermöglicht es Ihnen zu überprüfen, ob Ihre Konten in öffentliche Datenschutzverletzungen verwickelt waren. Wenn dies der Fall ist, **ändern Sie diese Passwörter sofort**. Die Verwendung einzigartiger Passwörter für jedes Konto verringert das Risiko, dass Hacker Zugriff auf alle Ihre Konten erhalten, wenn eines Ihrer Passwörter kompromittiert wird.

### Verwenden Sie einen Passwort-Manager {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Die Verwendung eines Passwort-Managers kümmert sich um die Erstellung starker, einzigartiger Passwörter und merkt sie sich! Wir empfehlen <strong>dringend</strong> die Verwendung eines solchen, und die meisten davon sind kostenlos!
</AlertDescription>
</AlertContent>
</Alert>

Sich starke, einzigartige Passwörter für jedes Konto zu merken, das Sie haben, ist nicht ideal. Ein Passwort-Manager bietet einen sicheren, verschlüsselten Speicher für alle Ihre Passwörter, auf den Sie über ein starkes Master-Passwort zugreifen können. Sie schlagen auch starke Passwörter vor, wenn Sie sich für einen neuen Dienst anmelden, sodass Sie keine eigenen erstellen müssen. Viele Passwort-Manager teilen Ihnen auch mit, ob Sie in eine Datenschutzverletzung verwickelt waren, sodass Sie die Passwörter vor böswilligen Angriffen ändern können.

![Beispiel für die Verwendung eines Passwort-Managers](./passwordManager.png)

#### Probieren Sie einen Passwort-Manager aus: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Oder sehen Sie sich andere [empfohlene Passwort-Manager](https://www.privacytools.io/secure-password-manager) an

### Verwenden Sie die Zwei-Faktor-Authentifizierung {#two-factor-authentication}

Sie werden möglicherweise manchmal gebeten, Ihre Identität durch eindeutige Nachweise zu authentifizieren. Diese werden als **Faktoren** bezeichnet. Die drei Hauptfaktoren sind:

- Etwas, das Sie wissen (wie ein Passwort oder eine Sicherheitsfrage)
- Etwas, das Sie sind (wie ein Fingerabdruck oder Iris-/Gesichtsscanner)
- Etwas, das Sie besitzen (ein Sicherheitsschlüssel oder eine Authentifizierungs-App auf Ihrem Telefon)

Die Verwendung der **Zwei-Faktor-Authentifizierung (2FA)** bietet einen zusätzlichen *Sicherheitsfaktor* für Ihre Online-Konten. 2FA stellt sicher, dass das bloße Vorhandensein Ihres Passworts nicht ausreicht, um auf ein Konto zuzugreifen. Am häufigsten ist der zweite Faktor ein zufälliger 6-stelliger Code, bekannt als **zeitbasiertes Einmalpasswort (TOTP)**, auf den Sie über eine Authentifizierungs-App wie Google Authenticator oder Authy zugreifen können. Diese funktionieren als "Etwas, das Sie besitzen"-Faktor, da der Seed, der den zeitgesteuerten Code generiert, auf Ihrem Gerät gespeichert ist.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Hinweis: Die Verwendung von SMS-basierter 2FA ist anfällig für <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM-Jacking</a> und ist nicht sicher. Für die beste Sicherheit verwenden Sie einen Dienst wie <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> oder <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Sicherheitsschlüssel {#security-keys}

Ein Sicherheitsschlüssel ist eine fortschrittlichere und sicherere Art von 2FA. Sicherheitsschlüssel sind physische Hardware-Authentifizierungsgeräte, die wie Authentifizierungs-Apps funktionieren. Die Verwendung eines Sicherheitsschlüssels ist der sicherste Weg zur 2FA. Viele dieser Schlüssel nutzen den FIDO Universal 2nd Factor (U2F)-Standard. [Erfahren Sie mehr über FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Sehen Sie mehr zu 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Deinstallieren Sie Browser-Erweiterungen {#uninstall-browser-extensions}

Browser-Erweiterungen, wie Chrome-Erweiterungen oder Add-ons für Firefox, können die Browserfunktionalität verbessern, bergen aber auch Risiken. Standardmäßig fordern die meisten Browser-Erweiterungen Zugriff auf das 'Lesen und Ändern von Websitedaten' an, was es ihnen ermöglicht, fast alles mit Ihren Daten zu tun. Chrome-Erweiterungen werden immer automatisch aktualisiert, sodass eine zuvor sichere Erweiterung später aktualisiert werden kann, um bösartigen Code zu enthalten. Die meisten Browser-Erweiterungen versuchen nicht, Ihre Daten zu stehlen, aber Sie sollten sich bewusst sein, dass sie es können.

#### Bleiben Sie sicher, indem Sie: {#browser-extension-safety}

- Nur Browser-Erweiterungen aus vertrauenswürdigen Quellen installieren
- Nicht verwendete Browser-Erweiterungen entfernen
- Chrome-Erweiterungen lokal installieren, um die automatische Aktualisierung zu stoppen (Fortgeschritten)

[Mehr zu den Risiken von Browser-Erweiterungen](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Weiterführende Literatur {#further-reading}

### Web-Sicherheit {#reading-web-security}

- [Bis zu 3 Millionen Geräte durch mit Malware verseuchte Chrome- und Edge-Add-ons infiziert](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [So erstellen Sie ein starkes Passwort — das Sie nicht vergessen werden](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Was ist ein Sicherheitsschlüssel?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Krypto-Sicherheit {#reading-crypto-security}

- [Sich selbst und sein Geld schützen](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Sicherheitsprobleme in gängiger Krypto-Kommunikationssoftware](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Sicherheitsleitfaden für Dummies und auch für schlaue Leute](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Krypto-Sicherheit: Passwörter und Authentifizierung](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Aufklärung über Betrug {#reading-scam-education}

- [Leitfaden: So identifizieren Sie Betrugs-Token](/guides/how-to-id-scam-tokens/)
- [Sicher bleiben: Häufige Betrugsmaschen](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Betrug vermeiden](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Twitter-Thread zu häufigen Krypto-Phishing-E-Mails und -Nachrichten](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />