---
title: "Ethereum – Sicherheits- und Betrugsvorbeugung"
description: Ethereum sicher nutzen
lang: de
---

# Ethereum-Sicherheit und Betrugsprävention {#introduction}

Das zunehmende Interesse an Kryptowährungen bringt ein wachsendes Risiko durch Betrüger und Hacker mit sich. In diesem Artikel geht es um bewährte Praktiken, um diese Risiken einzugrenzen.

**Denken Sie daran: Niemand von ethereum.org wird Sie jemals kontaktieren. Beantworten Sie keine E-Mails, die angeblich vom offiziellen Ethereum-Support stammen.**

<Divider />

## Grundlagen der Krypto-Sicherheit {#crypto-security}

### Erweitern Sie Ihr Wissen {#level-up-your-knowledge}

Missverständnisse über die Funktionsweise von Krypto können zu kostspieligen Fehlern führen. Wenn zum Beispiel ein vermeintlicher Kundenberater vorgibt, verlorenes ETH im Austausch gegen Ihre privaten Schlüssel zurückbringen zu können, dann nutzt diese Person Menschen aus, die nicht verstehen, dass Ethereum ein dezentrales Netzwerk ist, in dem eine derartige Funktion nicht existiert. Es ist lohnenswert, sich über die Funktionsweise von Ethereum zu informieren.

<DocLink href="/what-is-ethereum/">
  Was ist Ethereum?
</DocLink>

<DocLink href="/eth/">
  Was ist Ether?
</DocLink>
<Divider />

## Wallet-Sicherheit {#wallet-security}

### Geben Sie Ihre privaten Schlüssel nicht weiter {#protect-private-keys}

**Teilen Sie niemals – aus welchem Grund auch immer – Ihre privaten Schlüssel!**

Der private Schlüssel zu Ihrem Wallet ist ein Passwort für Ihr Ethereum-Wallet. Es ist das Einzige, das verhindert, dass jemand, der Ihre Wallet-Adresse kennt, Ihr Konto um all seine Vermögenswerte erleichtert!

<DocLink href="/wallets/">
  Was ist eine Ethereum-Wallet?
</DocLink>

#### Erstellen Sie keine Screenshots Ihrer Seed-Phrasen/privaten Schlüssel {#screenshot-private-keys}

Ein Screenshot Ihrer Seed-Phrase oder Ihrer privaten Schlüssel könnte mit einem Cloud-Datenanbieter synchronisiert werden, was sie für Hacker zugänglich machen könnte. Über die Cloud auf private Schlüssel zuzugreifen ist ein gängiger Angriffsvektoren für Hacker.

### Verwenden Sie eine Hardware-Wallet {#use-hardware-wallet}

Eine Hardware-Wallet bietet einen Offline-Speicherplatz für Ihre Private-Keys. Sie gelten als die sicherste Wallet-Option zum Speichern Ihrer privaten Schlüssel: Ihr privater Schlüssel berührt niemals das Internet und bleibt vollständig lokal auf Ihrem Gerät.

Ihre Private-Keys offline aufzubewahren reduziert das Risiko gehackt zu werden, auch wenn ein Hacker Zugang zu Ihrem Computer bekommt.

#### Probieren Sie eine Hardware-Wallet aus: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Überprüfen Sie Transaktionen vor dem Senden doppelt {#double-check-transactions}

Es kommt häufig vor, dass Kryptowährung versehentlich an eine falsche Wallet-Adresse gesendet wird. **Eine Transaktion, die auf Ethereum verschickt wird, ist unumkehrbar.** Sie werden Ihr Geld nicht zurückholen können, solange Sie den Adresseninhaber nicht kennen und ihn davon überzeugen können, Ihnen die Summe zurückzuschicken.

Stellen Sie immer sicher, dass die Adresse, an die Sie Geld überweisen, genau die Adresse des Empfängers ist.
Bei einer Interaktion mit einem Smart Contract ist es eine bewährte Vorgehensweise, vor der Unterschrift die Transaktionsnachricht zu lesen.

### Ausgabenlimits für Smart Contracts festlegen {#spend-limits}

Wenn Sie mit Smart Contracts interagieren, sollten Sie keine unbegrenzten Ausgabelimits zulassen. Ein unbegrenztes Ausgabelimit könnte einem Smart Contract ermöglichen, Ihre Wallet komplett zu leeren. Legen Sie stattdessen für die Ausgabelimits nur den Wert fest, der für die Transaktion erforderlich ist.

Viele Ethereum-Wallets bieten Schutz gegen die komplette Entleerung durch Hackerangriffe an.

[So widerrufen Sie den Zugriff von Smart Contracts auf Ihre Krypto-Gelder](/guides/how-to-revoke-token-access/)

<Divider />

## Häufige Betrugsmaschen {#common-scams}

Es ist unmöglich, Betrüger vollständig aufzuhalten. Allerdings können wir dafür sorgen, dass sie weniger effektiv sind, indem wir ihre am meisten genutzten Techniken kennen. Es gibt viele Variationen von Betrugsversuchen, aber die meisten folgen denselben Mustern. Merken Sie sich auf jeden Fall Folgendes:

- Seien Sie immer skeptisch
- Niemand wird Ihnen ETH kostenlos oder zu einem günstigeren Preis geben
- Niemand benötigt Zugang zu Ihren Private-Keys oder anderen persönlichen Informationen!

### Twitter-Anzeigen-Phishing {#ad-phishing}

![Phishing über Twitter-Link](./twitterPhishingScam.png)

Es gibt eine Methode, um die Linkvorschau-Funktion auf Twitter (auch bekannt als X) zu fälschen („Unfurling“), sodass Benutzer unter Umständen glauben gemacht wird, dass sie eine seriöse Website besuchen. Diese Technik nutzt den Mechanismus von Twitter zur Erstellung von URL-Vorschauen, die in Tweets geteilt werden. Dadurch wird zum Beispiel _von ethereum.org_ angezeigt (siehe oben), obwohl Nutzer tatsächlich auf eine bösartige Seite weitergeleitet werden.

Gehen Sie immer sicher, dass Sie sich auf der richtigen Domain befinden, vor allem, nachdem Sie auf einen Link geklickt haben.

[Weitere Informationen hier](https://harrydenley.com/faking-twitter-unfurling).

### Giveaway-Betrug {#giveaway}

Einer der häufigsten Betrugsfälle in der Welt der Kryptowährungen ist der Giveaway-Betrug. Der Giveaway-Betrug kann viele Formen annehmen. Die Grundidee ist jedoch, dass Sie ETH an die angegebene Wallet-Adresse schicken, woraufhin Sie Ihre ETH doppelt zurückbekommen._Aus diesem Grund wird dieser Betrug auch häufig als „2-für-1“-Betrug bezeichnet._

Bei diesen Betrügereien wird normalerweise ein begrenztes Zeitfenster für die Inanspruchnahme des Giveaways vorgetäuscht, um ein falsches Gefühl der Dringlichkeit vorzutäuschen.

### Hacks in sozialen Medien {#social-media-hacks}

Eine namhafte Variante des Giveaway-Betrugs gab es im Juli 2020, als die Twitter-Konten prominenter Personen und Organisationen gehackt wurden. Die Hacker veröffentlichten ein Bitcoin-Giveaway auf allen gehackten Konten gleichzeitig. Obwohl die betrügerischen Tweets schnell bemerkt und gelöscht wurden, gelang es den Hackern dennoch, 11 Bitcoin (oder umgerechnet 500.000 Dollar, Stand September 2021) zu erbeuten.

![Ein Betrug auf Twitter](./appleTwitterScam.png)

### Prominenten-Giveaway {#celebrity-giveaway}

Ein Promi-Giveaway ist eine andere häufige Form des Giveaway-Betrugs. Die Betrüger nehmen ein aufgezeichnetes Videointerview oder einen Konferenzvortrag eines Prominenten auf und streamen es live auf YouTube – so entsteht der Eindruck, dass der Prominente in einem Live-Videointerview ein Kryptowährungs-Giveaway bewirbt.

Vitalik Buterin wird bei dieser Betrugsmasche am häufigsten benutzt, aber auch viele andere bekannte Personen aus der Kryptoszene werden verwendet (z. B. Elon Musk oder Charles Hoskinson). Eine berühmte Person in diesen Betrug hineinzuziehen, verleiht dem Livestream der Betrüger eine gewisse Legitimität (das sieht eigentlich unglaubwürdig aus, aber da Vitalik involviert ist, muss es in Ordnung sein!).

**Giveaways sind immer Betrug. Wenn Sie Ihre Kryptowährung an diese betrügerischen Konten senden, ist das Geld für immer weg.**

![Ein Betrug auf YouTube](./youtubeScam.png)

### Support-Betrug {#support-scams}

Kryptowährung ist eine relativ junge und missverstandene Technologie. Eine gängige Betrugsmasche, die davon profitiert, ist der Unterstützungsbetrug. Dabei imitieren Betrüger die Mitarbeiter häufig benutzter Wallets, Exchanges oder Blockchains.

Ein Großteil der Diskussion über Ethereum findet auf der Plattform Discord statt. Unterstützungsbetrüger finden Ihre Opfer, indem sie in öffentlichen Discord-Kanälen nach Fragen suchen, und der Person eine private Nachricht senden, die etwas gefragt hat, um Unterstützung anzubieten. Indem die Betrüger Vertrauen aufbauen, versuchen sie, Sie dazu zu bringen, Ihren Private-Key offenzulegen oder auch direkt Geld (in Form von Kryptowährung) an ihre Konten zu schicken.

![Ein Support-Betrug auf Discord](./discordScam.png)

Allgemein gilt: Mitarbeiter kommunizieren mit Ihnen nie über private, inoffizielle Kanäle. Ein paar einfache Dinge, die Sie beim Umgang mit Mitarbeitern im Hinterkopf behalten sollten:

- Teilen Sie niemals Ihre Private-Keys, Seed-Phrasen oder Kennwörter
- Erlauben Sie niemandem den Remote-Zugriff auf Ihren Computer
- Kommunizieren Sie niemals außerhalb der von einer Organisation ausgewiesenen Kanäle

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Achtung: Obwohl Betrugsmaschen im Support-Stil häufig auf Discord vorkommen, können sie auch in jeder Chat-Anwendung, in der über Kryptowährungen diskutiert wird, einschließlich E-Mails, verbreitet sein.
</AlertDescription>
</AlertContent>
</Alert>

### „Eth2“-Token-Betrug {#eth2-token-scam}

Im Vorfeld von [Die Zusammenführung](/roadmap/merge/) nutzten Betrüger die Verwirrung um den Begriff „Eth2“ aus, um Nutzer dazu zu bringen, ihre ETH gegen einen „ETH2“-Token einzutauschen. Es gibt kein „ETH2", und es wurde auch kein anderer legitimer Token zusammen mit der Zusammenführung eingeführt. Das ETH, welches Sie vor der Zusammenführung besaßen, ist jetzt weiterhin das gleiche ETH. **Es ist nicht notwendig, bezüglich Ihrer ETH irgendwelche Maßnahmen für den Wechsel von Proof-of-Work zu Proof-of-Stake zu ergreifen**.

Betrüger könnten sich als „Support" ausgeben, und Sie dazu auffordern Ihr ETH einzuzahlen, um im Gegenzug „ETH2" zu erhalten. Es gibt keinen [offiziellen Ethereum-Support](/community/support/) und es gibt keinen neuen Token. Teilen Sie niemals Ihre Ethereum-Wallet-Seed-Phrasen.

_Hinweis: Es gibt derivative Token/Ticker, die gestakte ETH repräsentieren können (d. h. rETH von Rocket Pool, stETH von Lido, ETH2 von Coinbase), aber zu diesen müssen Sie nicht „migrieren“._

### Phishing-Betrugsmaschen {#phishing-scams}

Phishing ist eine Betrugsmasche, die sich immer stärker ausbreitet. Betrüger setzen darauf, um das Geld aus Ihrer Wallet zu stehlen.

In einigen Phishing-E-Mails werden Benutzer aufgefordert, auf Links zu klicken, über die sie zu Nachahmungen der originalen Websites weitergeleitet werden. Dort werden sie aufgefordert, ihre Seed-Phrase einzugeben, ihr Kennwort zurückzusetzen oder ETH zu senden. Andere bitten Sie möglicherweise darum, unwissentlich Malware zu installieren, um damit Ihren Computer zu infizieren und Betrügern so den Zugriff auf die Dateien Ihres Computers zu geben.

Wenn Sie eine E-Mail von einem unbekannten Absender erhalten, denken Sie daran:

- Öffnen Sie niemals einen Link oder Anhang von E-Mail-Adressen, die Sie nicht kennen
- Geben Sie niemals Ihre persönlichen Daten oder Kennwörter an Dritte weiter
- Löschen Sie E-Mails von unbekannten Absendern

[Mehr zur Vermeidung von Phishing-Betrugsmaschen](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Krypto-Broker-Betrug {#broker-scams}

Betrügerische Krypto-Börsenmakler geben sich als fachmännische Makler für Kryptowährungen aus, die Ihnen anbieten, Ihr Geld zu nehmen und es in Ihrem Namen zu investieren. Nachdem der Betrüger Ihr Geld bekommen hat, könnte er Sie bitten, ihm noch mehr Geld zu senden, damit Sie keine weiteren Anlagegewinne verpassen. Oder der Betrüger verschwindet einfach sofort komplett.

Diese Betrüger finden ihre Zielpersonen oft, indem sie gefälschte Konten auf YouTube nutzen, um scheinbar natürliche Unterhaltungen über den „Makler“ zu beginnen. Diese Gespräche oder Kommentare sind oft extrem positiv bewertet, um die Legitimität zu erhöhen. Doch die positiven Stimmen stammen alle von anderen unechten Konten (sogenannte Bot-Accounts).

**Vertrauen Sie keiner fremden Person im Internet, Investitionen in Ihrem Namen zu tätigen. Sie werden so Ihre Krypto verlieren.**

![Ein Trading-Broker-Betrug auf YouTube](./brokerScam.png)

### Betrugsmaschen mit Krypto-Mining-Pools {#mining-pool-scams}

Seit September 2022 ist Mining auf Ethereum nicht mehr möglich. Jedoch gibt es noch immer Mining-Pool-Betrug. Beim Mining-Pool-Betrug werden Sie unaufgefordert von anderen Personen kontaktiert, die vorgeben, dass Sie große Gewinne erzielen können, wenn Sie einem Ethereum-Mining-Pool beitreten. Die Betrüger tischen Ihnen eine Lüge nach der anderen auf und werden solange mit Ihnen in Kontakt bleiben, wie es erforderlich ist. Im Grunde wird der Betrüger versuchen, Sie davon zu überzeugen, einem Mining-Pool für Ethereum beizutreten. Mit Ihrer Kryptowährung würden dann ETH geschaffen und Ihnen ETH-Dividenden ausgezahlt. Sie werden dann erkennen, dass Ihre Kryptowährung kleine Erträge abwirft. Das ist natürlich so gedacht, um Sie dazu zu bringen, mehr Kryptowährung zu investieren. Am Ende wird Ihre Kryptowährung an eine unbekannte Adresse gesendet und der Betrüger wird entweder verschwinden oder, wie kürzlich zu beobachten war, vielleicht sogar weiter mit Ihnen in Kontakt bleiben.

Das Fazit lautet: Seien Sie vorsichtig bei Personen, die Sie auf sozialen Medien kontaktieren und Sie darum bitten, Teil eines Mining-Pools zu werden. Wenn Sie Kryptowährung verlieren, ist sie auch weg.

Folgendes sollten Sie beachten:

- Seien Sie vorsichtig, wenn jemand Kontakt mit Ihnen aufnimmt und Möglichkeiten vorschlägt, wie Sie mit Ihrer Kryptowährung Geld verdienen können
- Recherchieren Sie selbst umfassend zu Themen wie Staking, Liquiditäts-Pools und andere Investitionsmöglichkeiten für Ihre Kryptowährung
- Solche Pläne sind selten, wenn überhaupt, echt. Wären sie es, dann würden viele darüber Bescheid wissen und Sie hätten eventuell schon einmal etwas davon gehört.

[Mann verliert 200.000 $ durch Mining-Pool-Betrug](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop-Betrugsmaschen {#airdrop-scams}

Beim Airdrop-Betrug wird über ein Betrugsprojekt ein Asset (z. B. ein NFT/Token) per Airdrop an Ihre Wallet gesendet. Sie werden daraufhin zu einer Betrugs-Website weitergeleitet, damit Sie die per Airdrop versendeten Assets beanspruchen können. Sie werden aufgefordert, sich mit Ihrer Ethereum-Wallet anzumelden, um eine Transaktion zu „autorisieren“, wenn Sie versuchen, den Besitz an dem Asset zu beanspruchen. Diese Transaktion ist eine Gefährdung für Ihr Konto, denn dabei werden Ihre öffentlichen und privaten Schlüssel an den Betrüger gesendet. In einer alternativen Form dieses Betrugs werden Sie dazu aufgefordert, eine Transaktion zu genehmigen, über die Geld direkt zu dem Wallet des Betrügers gesendet wird.

[Mehr zu Airdrop-Betrugsmaschen](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Grundlagen der Websicherheit {#web-security}

### Verwenden Sie starke Passwörter {#use-strong-passwords}

[Über 80 % der Konto-Hacks sind auf schwache oder gestohlene Passwörter zurückzuführen](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Eine lange Kombination aus Buchstaben, Zahlen und Sonderzeichen hilft Ihnen dabei, Ihre Konten zu schützen.

Ein typischer Fehler ist das Verwenden einer Kombination aus ein paar geläufigen Wörtern, die miteinander in Beziehung stehen. Passwörter wie diese sind unsicher, weil sie anfällig für eine Hacking-Technik namens „Wörterbuchangriff“ sind.

```md
Beispiel für ein schwaches Passwort: CuteFluffyKittens!

Beispiel für ein starkes Passwort: ymv\*azu.EAC8eyp8umf
```

Ein weiterer häufiger Fehler ist die Verwendung von Passwörtern, die leicht erraten oder durch [Social Engineering](https://wikipedia.org/wiki/Social_engineering_\(security\)) aufgedeckt werden können. Die Verwendung des Geburtsnamens Ihrer Mutter, der Namen Ihrer Kinder oder Haustiere oder Ihrer Geburtsdaten in Ihrem Passwort erhöht das Risiko, gehackt zu werden.

#### Bewährte Methoden für Passwörter: {#good-password-practices}

- Erstellen Sie Kennwörter, welche die maximal mögliche Länge im Kennwortgenerator oder dem Formular, das Sie ausfüllen, in Anspruch nehmen
- Verwenden Sie eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen
- Verwenden Sie in Ihrem Kennwort keine persönlichen Daten, wie beispielsweise Familiennamen
- Meiden Sie gängige Wörter

[Mehr zum Erstellen starker Passwörter](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Verwenden Sie für alles einzigartige Passwörter {#use-unique-passwords}

Ein starkes Passwort, das im Rahmen einer Datenpanne offenbart wurde, ist kein starkes Passwort mehr. Die Website [Have I Been Pwned](https://haveibeenpwned.com) ermöglicht es Ihnen, zu überprüfen, ob Ihre Konten von öffentlichen Datenlecks betroffen waren. Falls ja, **ändern Sie diese Passwörter sofort**. Die Verwendung unterschiedlicher Passwörter für jedes Konto mindert das Risiko, dass Hacker Zugriff auf alle Ihre Konten erhalten, wenn eines Ihrer Passwörter kompromittiert wird.

### Verwenden Sie einen Passwort-Manager {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Ein Passwort-Manager erstellt starke, einzigartige Passwörter für Sie und merkt sie sich! Wir empfehlen <strong>dringend</strong>, einen zu verwenden, und die meisten davon sind kostenlos!
</AlertDescription>
</AlertContent>
</Alert>

Es ist nicht möglich, sich starke, einzigartige Kennwörter für jedes Konto zu merken, das Sie eingerichtet haben. Ein Kennwortmanager bietet Ihnen einen sicheren, verschlüsselten Speicher für all Ihre Kennwörter, auf den Sie über ein starkes Master-Kennwort zugreifen können. Ein solches Tool schlägt Ihnen auch starke Kennwörter vor, wenn Sie sich für einen neuen Dienst anmelden, sodass Sie keine eigenen erstellen müssen. Viele Kennwortmanager informieren Sie auch, wenn Sie von einem Datenleck betroffen sind, sodass Sie Ihre Kennwörter vor böswilligen Angriffen ändern können.

![Beispiel für die Verwendung eines Passwort-Managers](./passwordManager.png)

#### Probieren Sie einen Passwort-Manager aus: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Oder sehen Sie sich andere [empfohlene Passwort-Manager](https://www.privacytools.io/secure-password-manager) an

### Verwenden Sie die Zwei-Faktor-Authentifizierung {#two-factor-authentication}

Sie werden möglicherweise gelegentlich aufgefordert, Ihre Identität mit einzigartigen Nachweisen zu authentifizieren. Diese werden als **Faktoren** bezeichnet. Die drei Hauptfaktoren lauten:

- Etwas, das nur Sie kennen (beispielsweise ein Kennwort oder eine Sicherheitsfrage)
- Etwas, das nur Sie sind (wie ein Fingerabdruck oder ein Iris-/Gesichts-Scan)
- Etwas, das nur Sie besitzen (wie ein Sicherheitsschlüssel, oder eine Authentifizierungs-App auf Ihrem Smartphone)

Die Nutzung der **Zwei-Faktor-Authentifizierung (2FA)** bietet einen zusätzlichen _Sicherheitsfaktor_ für Ihre Online-Konten. 2FA sorgt dafür, dass Ihr Passwort allein nicht reicht, um auf ein Konto zuzugreifen. Am häufigsten ist der zweite Faktor ein zufälliger 6-stelliger Code, bekannt als **zeitbasiertes Einmalpasswort (TOTP)**, auf den Sie über eine Authenticator-App wie Google Authenticator oder Authy zugreifen können. Solche Apps funktionieren als „etwas, das Sie besitzen“-Faktor, da der Seed, der den Zeitcode generiert, auf Ihrem Gerät gespeichert ist.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Hinweis: SMS-basierte 2FA ist anfällig für <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM-Jacking</a> und ist nicht sicher. Für die beste Sicherheit verwenden Sie einen Dienst wie <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> oder <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Sicherheitsschlüssel {#security-keys}

Ein Sicherheitsschlüssel ist eine fortschrittlichere und sicherere Art der 2FA. Sicherheitsschlüssel sind physische Hardware-Authentifizierungsgeräte, die wie Authentifizierungsapps funktionieren. Einen Sicherheitsschlüssel zu verwenden, ist die sicherste Variante der 2FA. Viele dieser Schlüssel verwenden den Standard „FIDO Universal 2nd Factor (U2F)“. [Erfahren Sie mehr über FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Mehr zur 2FA ansehen:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Deinstallieren Sie Browser-Erweiterungen {#uninstall-browser-extensions}

Browsererweiterungen wie Chrome-Erweiterungen oder Add-ons für Firefox können die Browserfunktionalität verbessern, bringen aber auch Risiken mit sich. Standardgemäß fragen die meisten Browsererweiterungen nach dem Zugriff „Website-Daten lesen und ändern“. Damit können Sie mit Ihren Daten fast alles machen. Chrome-Erweiterungen werden eigentlich immer automatisch aktualisiert. Das bedeutet, dass eine bisher sichere Erweiterung zu einem späteren Zeitpunkt eventuell bösartig werden kann. Die meisten Browsererweiterungen versuchen nicht, Ihre Daten zu stehlen. Aber Sie sollten sich darüber im Klaren sein, dass sie das könnten.

#### So bleiben Sie sicher: {#browser-extension-safety}

- Nur Browsererweiterungen von vertrauenswürdigen Quellen installieren
- Unbenutzte Browsererweiterungen entfernen
- Chrome-Erweiterungen lokal installieren, um die automatische Aktualisierung der Erweiterungen zu stoppen (fortgeschritten)

[Mehr zu den Risiken von Browser-Erweiterungen](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Weiterführende Lektüre {#further-reading}

### Websicherheit {#reading-web-security}

- [Bis zu 3 Millionen Geräte mit Malware-verseuchten Chrome- und Edge-Add-ons infiziert](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) – _Dan Goodin_
- [Wie man ein starkes Passwort erstellt – das man nicht vergisst](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) – _AVG_
- [Was ist ein Sicherheitsschlüssel?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) – _Coinbase_

### Krypto-Sicherheit {#reading-crypto-security}

- [Schützen Sie sich und Ihr Geld](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) – _MyCrypto_
- [Sicherheitsprobleme in gängiger Krypto-Kommunikationssoftware](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) – _Salus_
- [Sicherheitsleitfaden für Dummies und auch für schlaue Leute](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) – _MyCrypto_
- [Krypto-Sicherheit: Passwörter und Authentifizierung](https://www.youtube.com/watch?v=m8jlnZuV1i4) – _Andreas M. Antonopoulos_

### Aufklärung über Betrugsmaschen {#reading-scam-education}

- [Anleitung: Wie man Betrugs-Token erkennt](/guides/how-to-id-scam-tokens/)
- [Sicher bleiben: Häufige Betrugsmaschen](https://support.mycrypto.com/staying-safe/common-scams) – _MyCrypto_
- [Betrugsmaschen vermeiden](https://bitcoin.org/en/scams) – _Bitcoin.org_
- [Twitter-Thread zu häufigen Krypto-Phishing-E-Mails und -Nachrichten](https://twitter.com/tayvano_/status/1516225457640787969) – _Taylor Monahan_

<QuizWidget quizKey="security" />
