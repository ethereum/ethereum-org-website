---
title: Ethereum – Sicherheits- und Betrugsvorbeugung
description: Ethereum sicher nutzen
lang: de
---

# Ethereum – Sicherheits- und Betrugsvorbeugung {#introduction}

Das zunehmende Interesse an Kryptowährungen bringt ein wachsendes Risiko durch Betrüger und Hacker mit sich. In diesem Artikel geht es um bewährte Praktiken, um diese Risiken einzugrenzen.

<Divider />

## Das Einmaleins der Krypto-Sicherheit {#crypto-security}

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

### Geben Sie Ihre privaten Schlüssel nicht heraus {#protect-private-keys}

**Teilen Sie niemals – aus welchem Grund auch immer – Ihre privaten Schlüssel!**

Der private Schlüssel zu Ihrem Wallet ist ein Passwort für Ihr Ethereum-Wallet. Es ist das Einzige, das verhindert, dass jemand, der Ihre Wallet-Adresse kennt, Ihr Konto um all seine Vermögenswerte erleichtert!

<DocLink href="/wallets/">
  Was ist eine Ethereum-Wallet?
</DocLink>

#### Nehmen Sie niemals Screenshots Ihrer Seed-Phrasen oder privaten Schlüssel auf {#screenshot-private-keys}

Ein Screenshot Ihrer Seed-Phrase oder Ihrer privaten Schlüssel könnte mit einem Cloud-Datenanbieter synchronisiert werden, was sie für Hacker zugänglich machen könnte. Über die Cloud auf private Schlüssel zuzugreifen ist ein gängiger Angriffsvektoren für Hacker.

### Eine Hardware-Wallet verwenden {#use-hardware-wallet}

Eine Hardware-Wallet bietet einen Offline-Speicherplatz für Ihre Private-Keys. Sie gelten als die sicherste Wallet-Option zum Speichern Ihrer privaten Schlüssel: Ihr privater Schlüssel berührt niemals das Internet und bleibt vollständig lokal auf Ihrem Gerät.

Ihre Private-Keys offline aufzubewahren reduziert das Risiko gehackt zu werden, auch wenn ein Hacker Zugang zu Ihrem Computer bekommt.

#### Überzeugen Sie sich selbst von einer Hardware-Wallet: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Transaktionen vor dem Absenden immer prüfen {#double-check-transactions}

Es kommt häufig vor, dass Kryptowährung versehentlich an eine falsche Wallet-Adresse gesendet wird. **Eine Transaktion, die auf Ethereum verschickt wird, ist unumkehrbar.** Sie werden ihr Geld nicht zurückholen können, solange Sie den Adresseninhaber nicht kennen und ihn davon überzeugen können, Ihnen die Summe zurückzuschicken.

Stellen Sie immer sicher, dass die Adresse, an die Sie Geld überweisen, genau die Adresse des Empfängers ist. Bei einer Interaktion mit einem Smart Contract ist es eine bewährte Vorgehensweise, vor der Unterschrift die Transaktionsnachricht zu lesen.

### Ausgabelimits für Smart Contracts festlegen {#spend-limits}

Wenn Sie mit Smart Contracts interagieren, sollten Sie keine unbegrenzten Ausgabelimits zulassen. Ein unbegrenztes Ausgabelimit könnte einem Smart Contract ermöglichen, Ihre Wallet komplett zu leeren. Legen Sie stattdessen für die Ausgabelimits nur den Wert fest, der für die Transaktion erforderlich ist.

Viele Ethereum-Wallets bieten Schutz gegen die komplette Entleerung durch Hackerangriffe an.

[So widerrufen Sie den Smart-Contract-Zugriff auf Ihre Krypto-Gelder](/guides/how-to-revoke-token-access/)

<Divider />

## Häufige Betrugsversuche {#common-scams}

Es ist unmöglich, Betrüger vollständig aufzuhalten. Allerdings können wir dafür sorgen, dass sie weniger effektiv sind, indem wir ihre am meisten genutzten Techniken kennen. Es gibt viele Variationen von Betrugsversuchen, aber die meisten folgen denselben Mustern. Merken Sie sich auf jeden Fall Folgendes:

- Seien Sie immer skeptisch
- Niemand wird Ihnen ETH kostenlos oder zu einem günstigeren Preis geben
- Niemand benötigt Zugang zu Ihren Private-Keys oder anderen persönlichen Informationen!

### Phishing mit Twitter-Werbung {#ad-phishing}

![Phishing mit Twitter-Link](./twitterPhishingScam.png)

Es gibt eine Methode, um die Linkvorschau-Funktion auf Twitter (auch bekannt als X) zu fälschen („Unfurling“), sodass Benutzer unter Umständen glauben gemacht wird, dass sie eine seriöse Website besuchen. Diese Technik nutzt Twitters Mechanismus für das Generieren von URL-Vorschauen aus, die in Tweets geteilt wurden. Es wird dann zum Beispiel _von ethereum.org_ (siehe oben) angezeigt, obwohl die Nutzer eigentlich auf eine schädliche Website weitergeleitet werden.

Gehen Sie immer sicher, dass Sie sich auf der richtigen Domain befinden, vor allem, nachdem Sie auf einen Link geklickt haben.

[Weitere Informationen dazu hier](https://harrydenley.com/faking-twitter-unfurling).

### Giveaway-Betrug {#giveaway}

Einer der häufigsten Betrugsfälle in der Welt der Kryptowährungen ist der Giveaway-Betrug. Der Giveaway-Betrug kann viele Formen annehmen. Die Grundidee ist jedoch, dass Sie ETH an die angegebene Wallet-Adresse schicken, woraufhin Sie Ihre ETH doppelt zurückbekommen. *Aus diesem Grund wird dieser Betrug auch häufig als „2-für-1“-Betrug bezeichnet.*

Bei diesen Betrügereien wird normalerweise ein begrenztes Zeitfenster für die Inanspruchnahme des Giveaways vorgetäuscht, um ein falsches Gefühl der Dringlichkeit vorzutäuschen.

### Social-Media-Hacks {#social-media-hacks}

Eine namhafte Variante des Giveaway-Betrugs gab es im Juli 2020, als die Twitter-Konten prominenter Personen und Organisationen gehackt wurden. Die Hacker veröffentlichten ein Bitcoin-Giveaway auf allen gehackten Konten gleichzeitig. Obwohl die betrügerischen Tweets schnell bemerkt und gelöscht wurden, gelang es den Hackern dennoch, 11 Bitcoin (oder umgerechnet 500.000 Dollar, Stand September 2021) zu erbeuten.

![Ein Betrug auf Twitter](./appleTwitterScam.png)

### Promi-Giveaway {#celebrity-giveaway}

Ein Promi-Giveaway ist eine andere häufige Form des Giveaway-Betrugs. Betrüger nehmen ein aufgezeichnetes Video-Interview oder einen Konferenz-Vortrag mit einer prominenten Person und streamen es live auf YouTube. Das erweckt den Anschein, als ob die Person ein Live-Interview zur Unterstützung eines Kryptowährungs-Giveaway gibt.

Vitalik Buterin wird am häufigsten für diese Art von Giveaway-Betrug benutzt, aber viele andere prominente Personen in der Kryptoszene (z. B. Elon Musk oder Charles Hoskinson) ebenso. Eine berühmte Person in diesen Betrug hineinzuziehen, verleiht dem Livestream der Betrüger eine gewisse Legitimität (das sieht eigentlich unglaubwürdig aus, aber da Vitalik involviert ist, muss es in Ordnung sein!).

**Giveaways sind immer Betrug. Wenn Sie Ihre Kryptowährung an diese betrügerischen Konten senden, ist das Geld für immer weg.**

![Ein Betrug auf YouTube](./youtubeScam.png)

### Unterstützungsbetrug {#support-scams}

Kryptowährung ist eine relativ junge und missverstandene Technologie. Eine gängige Betrugsmasche, die davon profitiert, ist der Unterstützungsbetrug. Dabei imitieren Betrüger die Mitarbeiter häufig benutzter Wallets, Exchanges oder Blockchains.

Ein Großteil der Diskussion über Ethereum findet auf der Plattform Discord statt. Unterstützungsbetrüger finden Ihre Opfer, indem sie in öffentlichen Discord-Kanälen nach Fragen suchen, und der Person eine private Nachricht senden, die etwas gefragt hat, um Unterstützung anzubieten. Indem die Betrüger Vertrauen aufbauen, versuchen sie, Sie dazu zu bringen, Ihren Private-Key offenzulegen oder auch direkt Geld (in Form von Kryptowährung) an ihre Konten zu schicken.

![Ein Unterstützungsbetrug auf Discord](./discordScam.png)

Allgemein gilt: Mitarbeiter kommunizieren mit Ihnen nie über private, inoffizielle Kanäle. Ein paar einfache Dinge, die Sie beim Umgang mit Mitarbeitern im Hinterkopf behalten sollten:

- Teilen Sie niemals Ihre Private-Keys, Seed-Phrasen oder Kennwörter
- Erlauben Sie niemandem den Remote-Zugriff auf Ihren Computer
- Kommunizieren Sie niemals außerhalb der von einer Organisation ausgewiesenen Kanäle

<InfoBanner emoji=":lock:">
  <div>
    Achtung: Obwohl Unterstützungsbetrug oft auf Discord erfolgt, ist es auch möglich, dass diese und auch andere Arten von Betrug auf anderen Chat-Plattformen, einschließlich per E-Mail, vorkommen können.
  </div>
</InfoBanner>

### „Eth2“-Token-Betrug {#eth2-token-scam}

Im Vorfeld der [Zusammenführung](/roadmap/merge/) haben Betrüger die Chance ergriffen, die Verwirrung um den Begriff „Eth2“ für sich zu nutzen, indem sie Benutzer dazu brachten, ihr ETH gegen „ETH2“-Token einzutauschen. Es gibt kein „ETH2", und es wurde auch kein anderer legitimer Token zusammen mit der Zusammenführung eingeführt. Das ETH, welches Sie vor der Zusammenführung besaßen, ist jetzt weiterhin das gleiche ETH. Es ist in Bezug auf den Wechsel von Proof-of-Work zu Proof-of-Stake **nicht nötig, im Zusammenhang mit Ihren ETH aktiv zu werden**.

Betrüger könnten sich als „Support" ausgeben, und Sie dazu auffordern Ihr ETH einzuzahlen, um im Gegenzug „ETH2" zu erhalten. Es gibt kein [offizielles Ethereum-Support-Team](/community/support/) und auch keinen neuen Token. Teilen Sie niemals Ihre Ethereum-Wallet-Seed-Phrasen.

_Hinweis: Es gibt abgeleitete (derivative) Token/Ticker, die staked ETH darstellen können (z. B. rETH von Rocket Pool, stETH von Lido, ETH2 von Coinbase). Doch diese abgeleiteten Token sind nichts, zu dem Sie „migrieren“ müssen._

### Phishing-Betrug {#phishing-scams}

Phishing ist eine Betrugsmasche, die sich immer stärker ausbreitet. Betrüger setzen darauf, um das Geld aus Ihrer Wallet zu stehlen.

In einigen Phishing-E-Mails werden Benutzer aufgefordert, auf Links zu klicken, über die sie zu Nachahmungen der originalen Websites weitergeleitet werden. Dort werden sie aufgefordert, ihre Seed-Phrase einzugeben, ihr Kennwort zurückzusetzen oder ETH zu senden. Andere bitten Sie möglicherweise darum, unwissentlich Malware zu installieren, um damit Ihren Computer zu infizieren und Betrügern so den Zugriff auf die Dateien Ihres Computers zu geben.

Wenn Sie eine E-Mail von einem unbekannten Absender erhalten, denken Sie daran:

- Öffnen Sie niemals einen Link oder Anhang von E-Mail-Adressen, die Sie nicht kennen
- Geben Sie niemals Ihre persönlichen Daten oder Kennwörter an Dritte weiter
- Löschen Sie E-Mails von unbekannten Absendern

[Mehr zur Vermeidung von Phishing-Betrugsversuchen](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Krypto-Makler-Betrug {#broker-scams}

Betrügerische Krypto-Börsenmakler geben sich als fachmännische Makler für Kryptowährungen aus, die Ihnen anbieten, Ihr Geld zu nehmen und es in Ihrem Namen zu investieren. Nachdem der Betrüger Ihr Geld bekommen hat, könnte er Sie bitten, ihm noch mehr Geld zu senden, damit Sie keine weiteren Anlagegewinne verpassen. Oder der Betrüger verschwindet einfach sofort komplett.

Diese Betrüger finden ihre Zielpersonen oft, indem sie gefälschte Konten auf YouTube nutzen, um scheinbar natürliche Unterhaltungen über den „Makler“ zu beginnen. Diese Gespräche oder Kommentare sind oft extrem positiv bewertet, um die Legitimität zu erhöhen. Doch die positiven Stimmen stammen alle von anderen unechten Konten (sogenannte Bot-Accounts).

**Vertrauen Sie keiner fremden Person im Internet, Investitionen in Ihrem Namen zu tätigen. Sie werden so Ihre Krypto verlieren.**

![Ein Krypto-Makler-Betrug auf YouTube](./brokerScam.png)

### Krypto-Mining-Pool-Betrug {#mining-pool-scams}

Seit September 2022 ist Mining auf Ethereum nicht mehr möglich. Jedoch gibt es noch immer Mining-Pool-Betrug. Beim Mining-Pool-Betrug werden Sie unaufgefordert von anderen Personen kontaktiert, die vorgeben, dass Sie große Gewinne erzielen können, wenn Sie einem Ethereum-Mining-Pool beitreten. Die Betrüger tischen Ihnen eine Lüge nach der anderen auf und werden solange mit Ihnen in Kontakt bleiben, wie es erforderlich ist. Im Grunde wird der Betrüger versuchen, Sie davon zu überzeugen, einem Mining-Pool für Ethereum beizutreten. Mit Ihrer Kryptowährung würden dann ETH geschaffen und Ihnen ETH-Dividenden ausgezahlt. Sie werden dann erkennen, dass Ihre Kryptowährung kleine Erträge abwirft. Das ist natürlich so gedacht, um Sie dazu zu bringen, mehr Kryptowährung zu investieren. Am Ende wird Ihre Kryptowährung an eine unbekannte Adresse gesendet und der Betrüger wird entweder verschwinden oder, wie kürzlich zu beobachten war, vielleicht sogar weiter mit Ihnen in Kontakt bleiben.

Das Fazit lautet: Seien Sie vorsichtig bei Personen, die Sie auf sozialen Medien kontaktieren und Sie darum bitten, Teil eines Mining-Pools zu werden. Wenn Sie Kryptowährung verlieren, ist sie auch weg.

Folgendes sollten Sie beachten:

- Seien Sie vorsichtig, wenn jemand Kontakt mit Ihnen aufnimmt und Möglichkeiten vorschlägt, wie Sie mit Ihrer Kryptowährung Geld verdienen können
- Recherchieren Sie selbst umfassend zu Themen wie Staking, Liquiditäts-Pools und andere Investitionsmöglichkeiten für Ihre Kryptowährung
- Solche Pläne sind selten, wenn überhaupt, echt. Wären sie es, dann würden viele darüber Bescheid wissen und Sie hätten eventuell schon einmal etwas davon gehört.

[Mann verliert 200.000 US-Dollar in einem Mining-Pool-Betrug](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop-Betrug {#airdrop-scams}

Beim Airdrop-Betrug wird über ein Betrugsprojekt ein Asset (z. B. ein NFT/Token) per Airdrop an Ihre Wallet gesendet. Sie werden daraufhin zu einer Betrugs-Website weitergeleitet, damit Sie die per Airdrop versendeten Assets beanspruchen können. Sie werden aufgefordert, sich mit Ihrer Ethereum-Wallet anzumelden, um eine Transaktion zu „autorisieren“, wenn Sie versuchen, den Besitz an dem Asset zu beanspruchen. Diese Transaktion ist eine Gefährdung für Ihr Konto, denn dabei werden Ihre öffentlichen und privaten Schlüssel an den Betrüger gesendet. In einer alternativen Form dieses Betrugs werden Sie dazu aufgefordert, eine Transaktion zu genehmigen, über die Geld direkt zu dem Wallet des Betrügers gesendet wird.

[Mehr zu Airdrop-Betrugsversuchen](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Das Einmaleins der Sicherheit im Internet {#web-security}

### Starke Kennwörter verwenden {#use-strong-passwords}

[In mehr als 80 % der Fälle von gehackten Konten waren die Kennwörter entweder zu schwach oder gestohlen.](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Eine lange Kombination aus Buchstaben, Zahlen und Sonderzeichen hilft Ihnen dabei, Ihre Konten zu schützen.

Ein typischer Fehler ist das Verwenden einer Kombination aus ein paar geläufigen Wörtern, die miteinander in Beziehung stehen. Passwörter wie diese sind unsicher, weil sie anfällig für eine Hacking-Technik namens „Wörterbuchangriff“ sind.

```md
Beispiel eines schwachen Kennworts: SüßeWeicheKätzchen!

Beispiel eines starken Kennworts: ymv\*azu.EAC8eyp8umf
```

Ein weiterer üblicher Fehler ist das Nutzen von Passwörtern, die einfach erraten oder durch [Social Engineering](https://wikipedia.org/wiki/Social_engineering_(security)) entdeckt werden können. Die Verwendung des Geburtsnamens Ihrer Mutter, der Namen Ihrer Kinder oder Haustiere oder Ihrer Geburtsdaten in Ihrem Passwort erhöht das Risiko, gehackt zu werden.

#### Guter Umgang mit Kennwörtern: {#good-password-practices}

- Erstellen Sie Kennwörter, welche die maximal mögliche Länge im Kennwortgenerator oder dem Formular, das Sie ausfüllen, in Anspruch nehmen
- Verwenden Sie eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen
- Verwenden Sie in Ihrem Kennwort keine persönlichen Daten, wie beispielsweise Familiennamen
- Meiden Sie gängige Wörter

[Mehr zum Erstellen starker Kennwörter](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Verwendung einzigartiger Kennwörter {#use-unique-passwords}

Ein starkes Passwort, das im Rahmen einer Datenpanne offenbart wurde, ist kein starkes Passwort mehr. Die Website [Have I Been Pwned](https://haveibeenpwned.com) ermöglicht Ihnen, zu prüfen, ob Ihre Konten in eine öffentliche Datenpanne involviert waren. Wenn dies der Fall ist, **ändern Sie diese Passwörter unverzüglich**. Die Verwendung unterschiedlicher Passwörter für jedes Konto mindert das Risiko, dass Hacker Zugriff auf alle Ihre Konten erhalten, wenn eines Ihrer Passwörter kompromittiert wird.

### Verwendung von Kennwortmanagern {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Ein Kennwortmanager ist hilfreich bei der Erstellung starker, einzigartiger Kennwörter und dabei sich diese zu merken! Wir empfehlen <strong>dringend</strong> die Verwendung eines Kennwortmanagers! Es gibt viele gute, kostenlose Angebote.
  </div>
</InfoBanner>

Es ist nicht möglich, sich starke, einzigartige Kennwörter für jedes Konto zu merken, das Sie eingerichtet haben. Ein Kennwortmanager bietet Ihnen einen sicheren, verschlüsselten Speicher für all Ihre Kennwörter, auf den Sie über ein starkes Master-Kennwort zugreifen können. Ein solches Tool schlägt Ihnen auch starke Kennwörter vor, wenn Sie sich für einen neuen Dienst anmelden, sodass Sie keine eigenen erstellen müssen. Viele Kennwortmanager informieren Sie auch, wenn Sie von einem Datenleck betroffen sind, sodass Sie Ihre Kennwörter vor böswilligen Angriffen ändern können.

![Beispiel zur Verwendung eines Kennwortmanagers](./passwordManager.png)

#### Überzeugen Sie sich selbst von einem Kennwortmanager: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Oder sehen Sie sich andere [empfohlene Passwortmanager](https://www.privacytools.io/secure-password-manager) an

### Zwei-Faktor-Authentifizierung verwenden {#two-factor-authentication}

Sie werden möglicherweise gelegentlich aufgefordert, Ihre Identität mit einzigartigen Nachweisen zu authentifizieren. Diese werden als **Faktoren** bezeichnet. Die drei Hauptfaktoren lauten:

- Etwas, das nur Sie kennen (beispielsweise ein Kennwort oder eine Sicherheitsfrage)
- Etwas, das nur Sie sind (wie ein Fingerabdruck oder ein Iris-/Gesichts-Scan)
- Etwas, das nur Sie besitzen (wie ein Sicherheitsschlüssel, oder eine Authentifizierungs-App auf Ihrem Smartphone)

Die Nutzung der **Zwei-Faktor-Authentifizierung (2FA)** bietet einen zusätzlichen *Sicherheitsfaktor* für Ihre Online-Konten. 2FA sorgt dafür, dass Ihr Passwort allein nicht reicht, um auf ein Konto zuzugreifen. Meist ist der zweite Faktor ein zufälliger 6-stelliger Code, bekannt als ein **zeitabhängiges einmaliges Kennwort (Time-based One-time Password, TOTP)**, auf das Sie über eine Authentifizierungs-App wie Google Authenticator oder Authy Zugriff haben. Solche Apps funktionieren als „etwas, das Sie besitzen“-Faktor, da der Seed, der den Zeitcode generiert, auf Ihrem Gerät gespeichert ist.

<InfoBanner emoji=":lock:">
  <div>
    Hinweis: SMS-basierte 2FA ist anfällig für <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM Jacking</a> und daher nicht sicher. Für das höchste Maß an Sicherheit nutzen Sie am besten einen Dienst wie <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> oder <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Sicherheitsschlüssel {#security-keys}

Ein Sicherheitsschlüssel ist eine fortschrittlichere und sicherere Art der 2FA. Sicherheitsschlüssel sind physische Hardware-Authentifizierungsgeräte, die wie Authentifizierungsapps funktionieren. Einen Sicherheitsschlüssel zu verwenden, ist die sicherste Variante der 2FA. Viele dieser Schlüssel verwenden den Standard „FIDO Universal 2nd Factor (U2F)“. [Mehr erfahren über FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Mehr zur 2FA ansehen:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Browsererweiterungen entfernen {#uninstall-browser-extensions}

Browsererweiterungen wie Chrome-Erweiterungen oder Add-ons für Firefox können die Browserfunktionalität verbessern, bringen aber auch Risiken mit sich. Standardgemäß fragen die meisten Browsererweiterungen nach dem Zugriff „Website-Daten lesen und ändern“. Damit können Sie mit Ihren Daten fast alles machen. Chrome-Erweiterungen werden eigentlich immer automatisch aktualisiert. Das bedeutet, dass eine bisher sichere Erweiterung zu einem späteren Zeitpunkt eventuell bösartig werden kann. Die meisten Browsererweiterungen versuchen nicht, Ihre Daten zu stehlen. Aber Sie sollten sich darüber im Klaren sein, dass sie das könnten.

#### So bleiben Sie sicher: {#browser-extension-safety}

- Nur Browsererweiterungen von vertrauenswürdigen Quellen installieren
- Unbenutzte Browsererweiterungen entfernen
- Chrome-Erweiterungen lokal installieren, um die automatische Aktualisierung der Erweiterungen zu stoppen (fortgeschritten)

[Mehr zu den Risiken von Browsererweiterungen](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Weiterführende Informationen {#further-reading}

### Web-Sicherheit {#reading-web-security}

- [Up to 3 million devices infected by malware-laced Chrome and Edge add-ons](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) (Bis zu 3 Millionen Geräte durch Malware-verseuchte Chrome- und Edge-Add-ons infiziert) – _Dan Goodin_
- [How to Create a Strong Password — That You Won’t Forget](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) (So erstellen Sie ein starkes Passwort, dass Sie nicht vergessen) – _AVG_
- [What is a security key?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) (Was ist ein Sicherheitsschlüssel?) – _Coinbase_

### Kryptosicherheit {#reading-crypto-security}

- [Schützen Sie sich und Ihr Geld](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Sicherheitsprobleme in gängiger Krypto-Kommunikationssoftware](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) – _Salus_
- [Sicherheitshandbuch für Dummies und erfahrene Personen](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Kryptosicherheit: Kennwörter und Authentifizierung](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Aufklärung über Betrug {#reading-scam-education}

- [Leitfaden: Wie man betrügerische Token erkennt](/guides/how-to-id-scam-tokens/)
- [Bleiben Sie sicher: gängige Betrugsmaschen](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Betrug vermeiden](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Twitter-Thread über häufige Phishing-E-Mails und Nachrichten](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
