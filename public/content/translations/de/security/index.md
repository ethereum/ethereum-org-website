---
title: Ethereum – Sicherheits- und Betrugsvorbeugung
description: Ethereum sicher nutzen
lang: de
---

# Ethereum – Sicherheits- und Betrugsvorbeugung {#introduction}

Da Kryptowährungen immer beliebter werden, ist es unerlässlich, sich die besten Praktiken für die Nutzung von Kryptowährungen anzueignen. Kryptowährungen können Spaß machen und aufregend sein, aber es gibt auch ernsthafte Risiken. Wenn Sie bereits im Vorfeld etwas Zeit investieren, können Sie diese Risiken mildern.

<Divider />

## Das Einmaleins der Sicherheit im Internet {#web-security}

### Starke Kennwörter verwenden {#use-strong-passwords}

[In mehr als 80 % der Fälle von gehackten Konten waren die Kennwörter entweder zu schwach oder gestohlen.](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Lange Kombinationen aus Buchstaben, Zahlen und Sonderzeichen sind am besten geeignet, um Ihre Konten zu schützen.

Der Fehler ist weit verbreitet, eine Kombination aus zwei oder drei allgemeinen, verwandten Wörtern aus dem Wörterbücher zu verwenden. Solche Kennwörter sind unsicher, da sie für eine einfache Hacking-Technik anfällig sind, welche als [Wörterbuchangriff](https://wikipedia.org/wiki/Dictionary_attack) bekannt ist.

```md
Beispiel eines schwachen Kennworts: SüßeWeicheKätzchen!

Beispiel eines starken Kennworts: ymv\*azu.EAC8eyp8umf
```

Ein weiter häufiger Fehler ist die Verwendung von Kennwörtern, die leicht erraten oder durch [Social Engineering](https://wikipedia.org/wiki/Social_engineering_(security)) herausgefunden werden können. Dazu gehören der Mädchenname Ihrer Mutter, die Namen Ihrer Kinder oder Tiere oder Geburtsdaten. Das ist nicht sicher und erhöht das Risiko, dass Ihr Kennwort gehackt wird.

#### Guter Umgang mit Kennwörtern: {#good-password-practices}

- Erstellen Sie Kennwörter, welche die maximal mögliche Länge im Kennwortgenerator oder dem Formular, das Sie ausfüllen, in Anspruch nehmen
- Verwenden Sie eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen
- Verwenden Sie in Ihrem Kennwort keine persönlichen Daten, wie beispielsweise Familiennamen
- Vermeiden Sie häufige Wörter, die aus Wörterbüchern stammen

[Mehr zum Erstellen starker Kennwörter](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Verwendung einzigartiger Kennwörter {#use-unique-passwords}

Ein starkes Kennwort bietet nicht viel Schutz, wenn es durch eine Datenpanne offengelegt wird. Auf der Website [Have I Been Pwned](https://haveibeenpwned.com) können Sie prüfen, ob Ihre Konten von irgendeiner der Datenpannen, die in der Datenbank der Website gespeichert sind, betroffen sind. Ist das der Fall, **sollten Sie die betroffenen Kennwörter sofort ändern**. Die Verwendung von einzigartigen Kennwörtern für jedes Konto verringert das Risiko, dass Hacker Zugriff auf alle Ihre Konten erhalten, wenn eines der Kennwörter kompromittiert wird.

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

Um zu beweisen, dass Sie tatsächlich Sie sind, gibt es verschiedene eindeutige Nachweise, die zur Authentifizierung verwendet werden können. Solche Nachweise werden **Faktoren** genannt. Die drei Hauptfaktoren sind:

- Etwas, das nur Sie kennen (beispielsweise ein Kennwort oder eine Sicherheitsfrage)
- Etwas, das nur Sie sind (wie ein Fingerabdruck oder ein Iris-/Gesichts-Scan)
- Etwas, das nur Sie besitzen (wie ein Sicherheitsschlüssel, oder eine Authentifizierungs-App auf Ihrem Smartphone)

Die Verwendung der **Zwei-Faktor-Authentifizierung (2FA)** bietet einen zusätzlichen *Sicherheitsfaktor* für Ihre Online-Konten. Damit reicht die Kenntnis Ihres Kennworts allein (etwas, das nur Sie wissen) nicht aus, um auf ein Konto zuzugreifen. Meist ist der zweite Faktor ein zufälliger 6-stelliger Code, bekannt als ein **zeitabhängiges einmaliges Kennwort (Time-based One-time Password, TOTP)**, auf das Sie über eine Authentifizierungs-App wie Google Authenticator oder Authy Zugriff haben. Solche Apps funktionieren als „etwas, das Sie besitzen“-Faktor, da der Seed, der den Zeitcode generiert, auf Ihrem Gerät gespeichert ist.

<InfoBanner emoji=":lock:">
  <div>
    Hinweis: Die Verwendung von SMS-basierten 2FA ist anfällig für
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM-Swapping
    </a>
    und ist nicht sicher. Die höchste Sicherheit erhalten Sie, wenn Sie einen Service wie {" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
    oder <a href="https://authy.com/">Authy</a> nutzen.
  </div>
</InfoBanner>

#### Sicherheitsschlüssel {#security-keys}

Für diejenigen, die bei der 2FA einen Schritt weiter gehen möchten, sollten einen Sicherheitsschlüssel oder „Security Key“ benutzten. Sicherheitsschlüssel sind physische Hardware-Authentifizierungsgeräte, die genau so funktionieren wie Authentifizierungs-Apps. Einen Sicherheitsschlüssel zu verwenden, ist die sicherste Variante der 2FA. Viele dieser Schlüssel verwenden den Standard „FIDO Universal 2nd Factor (U2F)“. [Mehr erfahren über FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Mehr zur 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Browsererweiterungen entfernen {#uninstall-browser-extensions}

Browsererweiterungen wie die Chrome-Erweiterungen oder die Add-ons von Firefox können nützliche Browserfunktionen erweitern und die Benutzerfreundlichkeit verbessern, aber sie sind auch mit Risiken verbunden. Standardgemäß fragen die meisten Browsererweiterungen nach dem Zugriff „Website-Daten lesen und ändern“. Damit können Sie mit Ihren Daten fast alles machen. Chrome-Erweiterungen werden eigentlich immer automatisch aktualisiert. Das bedeutet, dass eine bisher sichere Erweiterung zu einem späteren Zeitpunkt eventuell bösartig werden kann. Die meisten Browsererweiterungen versuchen nicht, Ihre Daten zu stehlen. Aber Sie sollten sich darüber im Klaren sein, dass sie das könnten.

#### So bleiben Sie sicher: {#browser-extension-safety}

- Nur Browsererweiterungen von vertrauenswürdigen Quellen installieren
- Unbenutzte Browsererweiterungen entfernen
- Chrome-Erweiterungen lokal installieren, um die automatische Aktualisierung der Erweiterungen zu stoppen (fortgeschritten)

[Mehr zu den Risiken von Browsererweiterungen](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Das Einmaleins der Krypto-Sicherheit {#crypto-security}

### Erweitern Sie Ihr Wissen {#level-up-your-knowledge}

Einer der häufigsten Gründe, warum Menschen in der Kryptoszene betrogen werden, ist mangelndes Verständnis. Angenommen, Sie hätten nicht verstanden, dass das Ethereum-Netzwerk dezentralisiert ist und niemandem direkt gehört. In diesem Fall wäre es einfach, dass Sie auf jemanden hereinfallen, der vorgibt, ein Kundendienstmitarbeiter zu sein, und verspricht, im Gegenzug für Ihren Private-Key, Ihr verlorenes ETH zurückzuerstatten. Es ist lohnenswert, sich über die Funktionsweise von Ethereum zu informieren.

<DocLink to="/what-is-ethereum/">
  Was ist Ethereum?
</DocLink>

<DocLink to="/eth/">
  Was ist Ether?
</DocLink>
<Divider />

## Wallet-Sicherheit {#wallet-security}

### Geben Sie Ihre Private-Keys nicht heraus {#protect-private-keys}

**Teilen Sie niemals – aus welchem Grund auch immer – Ihre Private-Keys!**

Der Private-Key zu Ihrer Wallet fungiert als Kennwort für Ihre Ethereum-Wallet. Es ist das Einzige, das verhindert, dass jemand, der Ihre Wallet-Adresse kennt, Ihr Konto um all seine Vermögenswerte erleichtert!

<DocLink to="/wallets/">
  Was ist eine Ethereum-Wallet?
</DocLink>

#### Nehmen Sie niemals Screenshots (Bildschirmaufnahmen) Ihrer Seed-Phrasen oder Private-Keys auf {#screenshot-private-keys}

Wenn Sie Screenshots Ihrer Seed-Phrasen oder Private-Keys machen, riskieren Sie, dass diese mit der Cloud synchronisiert werden und möglicherweise Hacker darauf zu greifen können. Private-Keys aus der Cloud zu erhalten, ist ein gängiger Angriffspunkt für Hacker.

### Eine Hardware-Wallet verwenden {#use-hardware-wallet}

Eine Hardware-Wallet bietet einen Offline-Speicherplatz für Ihre Private-Keys. Sie gelten als die sicherste Wallet-Option zum Speichern Ihrer privaten Schlüssel: Ihr privater Schlüssel berührt niemals das Internet und bleibt vollständig lokal auf Ihrem Gerät.

Ihre Private-Keys offline aufzubewahren reduziert das Risiko gehackt zu werden, auch wenn ein Hacker Zugang zu Ihrem Computer bekommt.

#### Überzeugen Sie sich selbst von einer Hardware-Wallet: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Transaktionen vor dem Absenden immer prüfen {#double-check-transactions}

Es kommt häufig vor, dass Kryptowährung versehentlich an eine falsche Wallet-Adresse gesendet wird. **Eine über das Ethereum-Netzwerk versendete Transaktion lässt sich nicht rückgängig machen.** Der einzige Weg, das verlorene Geld wieder zurück zu bekommen, wäre, wenn Sie den Adresseneigentümer kennen und ihn bitten würden, das Geld wieder zurück zu senden.

Stellen Sie immer sicher, dass die Adresse, an die Sie Geld überweisen, genau die Adresse des Empfängers ist. Es wird auch empfohlen, wenn Sie mit einem Smart Contract interagieren, dass Sie die Transaktionsnachricht vor dem Unterschreiben lesen.

### Ausgabelimits für Smart Contracts festlegen {#spend-limits}

Wenn Sie mit Smart Contracts interagieren, sollten Sie keine unbegrenzten Ausgabelimits zulassen. Ein unbegrenztes Ausgabelimit könnte einem Smart Contract ermöglichen, Ihre Wallet komplett zu leeren. Legen Sie stattdessen für die Ausgabelimits nur den Wert fest, der für die Transaktion erforderlich ist.

Viele Ethereum-Wallets bieten Schutz gegen die komplette Entleerung durch Hackerangriffe an.

[So widerrufen Sie den Smart-Contract-Zugriff auf Ihre Krypto-Gelder](/guides/how-to-revoke-token-access/)

<Divider />

## Häufige Betrugsversuche {#common-scams}

Betrüger suchen immer nach Möglichkeiten, an Ihr Geld zu gelangen. Es ist unmöglich, Betrüger gänzlich aufzuhalten. Doch wir können dafür sorgen, dass sie weniger erfolgreich sind, indem wir uns bewusst machen, wie sie vorgehen. Es gibt viele Variationen von Betrugsversuchen, aber die meisten folgen denselben Mustern. Merken Sie sich auf jeden Fall Folgendes:

- Seien Sie immer skeptisch
- Niemand wird Ihnen ETH kostenlos oder zu einem günstigeren Preis geben
- Niemand benötigt Zugang zu Ihren Private-Keys oder anderen persönlichen Informationen!

### Giveaway-Betrug {#giveaway}

Einer der häufigsten Betrugsfälle in der Welt der Kryptowährungen ist der Giveaway-Betrug. Der Giveaway-Betrug kann viele Formen annehmen. Allgemein wird aber gefordert, dass Sie ETH an eine angegebene Wallet-Adresse senden und dann die doppelte Menge an ETH zurückerhalten. *Aus diesem Grund wird dieser Betrug auch häufig als „2-für-1“-Betrug bezeichnet.*

Im Rahmen solcher Betrugsmaschen wird in der Regel ein kurzer Zeitraum vorgegeben, der für die Inanspruchnahme eines Geschenks gewährt wird, um schlechte Entscheidungen zu fördern und ein falsches Gefühl von Dringlichkeit zu erzeugen.

#### Social-Media-Hacks {#social-media-hacks}

Eine namhafte Variante des Giveaway-Betrugs gab es im Juli 2020, als die Twitter-Konten prominenter Personen und Organisationen gehackt wurden. Die Hacker veröffentlichten ein Bitcoin-Giveaway auf allen gehackten Konten gleichzeitig. Obwohl die betrügerischen Tweets schnell bemerkt und gelöscht wurden, gelang es den Hackern dennoch, 11 Bitcoin (oder umgerechnet 500.000 Dollar, Stand September 2021) zu erbeuten.

![Ein Betrug auf Twitter](./appleTwitterScam.png)

#### Promi-Giveaway {#celebrity-giveaway}

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

Im Vorfeld der [Zusammenführung](/roadmap/merge/) haben Betrüger die Chance ergriffen, die Verwirrung um den Begriff „Eth2“ für sich zu nutzen, indem sie Benutzer dazu brachten, ihr ETH gegen „ETH2“-Token einzutauschen. Es gibt kein „ETH2", und es wurde auch kein anderer legitimer Token zusammen mit der Zusammenführung eingeführt. Das ETH, welches Sie vor der Zusammenführung besaßen, ist jetzt weiterhin das gleiche ETH. Es ist **nicht nötig, im Zusammenhang mit Ihrem ETH aktiv zu werden, um den Wechsel von Proof-of-Work zu Proof-of-Stake zu berücksichtigen**.

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

Betrüger, die sich als Krypto-Makler ausgeben, geben vor, spezialisierte Kryptowährungsmakler zu sein. Sie bieten Ihnen an, Ihr Geld in Ihrem Namen zu investieren. In der Regel werden bei diesen Angeboten auch unrealistisch hohe Renditen versprochen. Nachdem der Betrüger Ihr Geld bekommen hat, könnte er Sie bitten, ihm noch mehr Geld zu senden, damit Sie keine weiteren Anlagegewinne verpassen. Oder der Betrüger verschwindet einfach sofort komplett.

Diese betrügerischen Makler finden ihre Opfer, indem sie unechte YouTube-Kanäle oder -Konten nutzen, um scheinbar ganz normale Gespräche über den Makler zu beginnen. Diese Gespräche oder Kommentare sind oft extrem positiv bewertet, um die Legitimität zu erhöhen. Doch die positiven Stimmen stammen alle von anderen unechten Konten (sogenannte Bot-Accounts).

**Vertrauen Sie keiner fremden Person im Internet, Investitionen in Ihrem Namen zu tätigen. Sie werden so Ihre Krypto verlieren.**

![Ein Krypto-Makler-Betrug auf YouTube](./brokerScam.png)

### Krypto-Mining-Pool-Betrug {#mining-pool-scams}

Seit September 2022 ist Mining auf Ethereum nicht mehr möglich. Jedoch gibt es noch immer Mining-Pool-Betrug. Beim Mining-Pool-Betrug werden Sie unaufgefordert von anderen Personen kontaktiert, die vorgeben, dass Sie große Gewinne erzielen können, wenn Sie einem Ethereum-Mining-Pool beitreten. Die Betrüger tischen Ihnen eine Lüge nach der anderen auf und werden solange mit Ihnen in Kontakt bleiben, wie es erforderlich ist. Im Wesentlichen versuchen die Betrüger Sie davon zu überzeugen, dem Ethereum-Mining-Pool beizutreten. Ihre Kryptowährung soll dazu benutzt werden, ETH zu schaffen. Im Gegenzug erhalten Sie eine Dividende in Form von ETH. Am Ende passiert Folgendes: Sie merken, dass Ihre Kryptowährung nur kleine Gewinne einbringt. Das ist natürlich so gedacht, um Sie dazu zu bringen, mehr Kryptowährung zu investieren. Am Ende wird Ihre Kryptowährung an eine unbekannte Adresse gesendet und der Betrüger wird entweder verschwinden oder, wie kürzlich zu beobachten war, vielleicht sogar weiter mit Ihnen in Kontakt bleiben.

Fazit: Seien Sie vorsichtig mit Personen, die sie über soziale Netzwerke anschreiben und Ihnen vorschlagen, ihrem Mining-Pool beizutreten. Wenn Sie Kryptowährung verlieren, ist sie auch weg.

Folgendes sollten Sie beachten:

- Seien Sie vorsichtig, wenn jemand Kontakt mit Ihnen aufnimmt und Möglichkeiten vorschlägt, wie Sie mit Ihrer Kryptowährung Geld verdienen können
- Recherchieren Sie selbst umfassend zu Themen wie Staking, Liquiditäts-Pools und andere Investitionsmöglichkeiten für Ihre Kryptowährung
- Solche Pläne sind selten, wenn überhaupt, echt. Wären sie es, dann würden viele darüber Bescheid wissen und Sie hätten eventuell schon einmal etwas davon gehört.

[Mann verliert 200.000 US-Dollar in einem Mining-Pool-Betrug](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop-Betrug {#airdrop-scams}

Beim Airdrop-Betrug sendet ein Betrugsprojekt ein Asset (z. B. ein NFT/Token) per Airdrop an Ihre Wallet und leitet Sie gleichzeitig zu einer Betrugs-Website, damit Sie die Assets aus dem Airdrop beanspruchen können. Sie werden aufgefordert, sich mit Ihrer Ethereum-Wallet anzumelden, um eine Transaktion zu „autorisieren“, wenn Sie versuchen, den Besitz an dem Asset zu beanspruchen. Diese Transaktion ist eine Gefährdung für Ihr Konto, denn dabei werden Ihre öffentlichen und privaten Schlüssel an den Betrüger gesendet. In einer alternativen Form dieses Betrugs werden Sie dazu aufgefordert, eine Transaktion zu genehmigen, über die Geld direkt zu dem Wallet des Betrügers gesendet wird.

[Mehr zu Airdrop-Betrugsversuchen](https://www.youtube.com/watch?v=LLL_nQp1lGk)

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
