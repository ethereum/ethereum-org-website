---
title: Ethereum-beveiliging en -scampreventie
description: Veilig blijven op Ethereum
lang: nl
---

# Ethereum-beveiliging en -scampreventie {#introduction}

De toenemende interesse in cryptovaluta brengt ook een groeiend risico van oplichters en hackers met zich mee. In dit artikel worden een aantal best practices beschreven om deze risico's te beperken.

<Divider />

## Crypto beveiliging 101 {#crypto-security}

### Vergroot uw kennis {#level-up-your-knowledge}

Misverstanden over hoe crypto werkt, kunnen leiden tot kostbare fouten. Als iemand zich bijvoorbeeld voordoet als een klantenservicemedewerker die verloren ETH kan teruggeven in ruil voor jouw privé-sleutels, dan aast hij/zij op mensen die niet begrijpen dat Ethereum een ​​gedecentraliseerd netwerk is waarin dit soort functionaliteit ontbreekt. Het is een waardevolle investering om jezelf te leren hoe Ethereum functioneert.

<DocLink href="/what-is-ethereum/">
  Wat is Ethereum?
</DocLink>

<DocLink href="/eth/">
  Wat is ether?
</DocLink>
<Divider />

## Portemonneebeveiliging {#wallet-security}

### Geef je privé-sleutels niet prijs {#protect-private-keys}

**Deel nooit om welke reden dan ook je privé-sleutels!**

De prive-sleutel tot je portemonnee is het wachtwoord voor je Ethereum-portemonnee. Het is het enige dat iemand die uw portemonnee-adres kent ervan weerhoudt om uw account en al uw activa te stelen!

<DocLink href="/wallets/">
  Wat is een Ethereum-portemonnee?
</DocLink>

#### Neem geen screenshots van je zaadzinnen/privé-sleutels {#screenshot-private-keys}

Als je een screenshot maakt van uw je zaadzinnen of privé-sleutels, worden deze mogelijk gesynchroniseerd met een cloudprovider, waardoor ze toegankelijk worden voor hackers. Het verkrijgen van privé-sleutels uit de cloud is een veelvoorkomende aanvalsvector voor hackers.

### Gebruik een hardwareportemonnee {#use-hardware-wallet}

Een hardwareportemonnee biedt offline opslag voor privé-sleutels. Ze worden beschouwd als de veiligste portemonnee-optie voor het opslaan van je privé-sleutels: je privé-sleutel komt nooit in contact met het internet en blijft volledig lokaal op je apparaat.

Privé-sleutels offline houden vermindert het risico om gehackt te worden, zelfs als een hacker de besturing van uw computer onder controle krijgt.

#### Gebruik een hardwareportemonnee: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Controleer de transacties dubbel vóór verzending {#double-check-transactions}

Het sturen van crypto naar het verkeerde portemonnee-adres is een veel voorkomende fout. **Een transactie die via Ethereum wordt verzonden, is onomkeerbaar.** Tenzij je de eigenaar van het adres kent en hem of haar ervan kunt overtuigen je geld terug te sturen, kun je je geld niet terugkrijgen.

Zorg er altijd voor dat het adres waarheen u stuurt precies overeenkomt met het gewenste adres van de ontvanger voordat u een transactie verstuurt. Het is een goede gewoonte om bij het werken met een slim contract het transactiebericht te lezen voordat je tekent.

### Stel bestedingslimieten voor slimme contracten in {#spend-limits}

Sta bij interactie met slimme contracten geen onbeperkte bestedingslimieten toe. In geval van onbeperkte uitgaven, kan het slimme contract uw portemonnee leegmaken. Stel in plaats daarvan uitgavenlimieten in op het bedrag dat nodig is voor de transactie.

Veel Ethereum-portemonnees bieden limieten aan bescherming tegen het leeglopen van rekeningen.

[Hoe toegang via slimme contracten tot uw cryptofondsen herroepen](/guides/how-to-revoke-token-access/)

<Divider />

## Veelvoorkomende scams {#common-scams}

Het is onmogelijk om oplichters volledig te stoppen, maar we kunnen ze wel minder effectief maken door op de hoogte te zijn van de meest gebruikte technieken. Er zijn veel variaties van deze oplichterijen, maar over het algemeen volgen ze dezelfde patronen van hoog niveau. Onthoud in elk geval:

- wees altijd sceptisch
- niemand zal je gratis of afgeprijsd ETH geven
- niemand heeft toegang nodig tot uw privé-sleutels of persoonlijke informatie

### Twitter-advertentiephishing {#ad-phishing}

![Twitter-linkphishing](./twitterPhishingScam.png)

Er bestaat een methode om de linkvoorvertoningsfunctie (unfurling) van Twitter (ook bekend als X) te spoofen, zodat gebruikers denken dat ze een legitieme website bezoeken. Deze techniek maakt gebruik van het mechanisme van Twitter om voorvertoningen te genereren van URL's die in tweets worden gedeeld, en toont bijvoorbeeld _URL's van ethereum.org_ (hierboven weergegeven), terwijl ze in werkelijkheid worden omgeleid naar een schadelijke site.

Controleer altijd of je op het juiste domein zit, vooral nadat je op een link hebt geklikt.

[Meer informatie hier](https://harrydenley.com/faking-twitter-unfurling).

### Giveaway-scam {#giveaway}

Een van de meest voorkomende zwendelpraktijken in cryptovaluta is de giveaway-scam. De giveaway-oplichting kan verschillende vormen aannemen, maar het algemene idee is dat als je ETH naar het opgegeven portemonnee-adres stuurt, je je ETH terugkrijgt, maar dan verdubbeld. *Om deze reden staat het ook bekend als de 2-voor-1 scam.*

Bij dit soort oplichtingspraktijken wordt er meestal een beperkte tijdsduur gesteld waarin men de giveaway kan claimen, om zo een vals gevoel van urgentie te creëren.

### Socialemedia-hacks {#social-media-hacks}

Een spraakmakende versie hiervan vond plaats in juli 2020, toen de Twitter-accounts van prominente beroemdheden en organisaties werden gehackt. De hacker plaatste tegelijkertijd een Bitcoin-giveaway op de gehackte accounts. Hoewel de misleidende tweets snel werden opgemerkt en verwijderd, slaagden de hackers er nog steeds in om met 11 bitcoin (of $ 500.000 per september 2021) weg te komen.

![Een scam op Twitter](./appleTwitterScam.png)

### Celebrity giveaway {#celebrity-giveaway}

De celebrity giveaway is een andere veelvoorkomende vorm van de giveaway-scam. De oplichters nemen een opgenomen video-interview of conferentiegesprek van een celebrity en livestreamen dit op YouTube, zodat het lijkt alsof de celebrity een live video-interview gaf ter ondersteuning van een cryptovaluta-giveaway.

Vitalik Buterin wordt het meest gebruikt in deze zwendel, maar veel andere prominente mensen die betrokken zijn bij crypto worden ook gebruikt (bijv. Elon Musk of Charles Hoskinson). Door een bekend persoon erbij te halen krijgt de livestream van de scammers een atmosfeer van legitimiteit (dit ziet er vaag uit, maar het gaat om Vitalik, dus het moet OK zijn!).

**Giveaways zijn altijd scams. Als je fondsen naar deze accounts stuurt, verlies je ze voor altijd.**

![Een scam op YouTube](./youtubeScam.png)

### Support scams {#support-scams}

Cryptocurrency is een relatief jonge en onbegrepen technologie. Een veelvoorkomende zwendel die hiervan profiteert is de support-scam, waarbij zwendelaars doen alsof ze ondersteunend personeel zijn voor populaire portemonnees, exchanges of blockchains.

Veel van de discussie over Ethereum vindt plaats op Discord. Support-scammers zullen vaak hun doelwit vinden door te zoeken naar ondersteuningsvragen in publieke discord-kanalen en vervolgens een privé-bericht sturen dat ondersteuning biedt. Door vertrouwen op te bouwen, proberen scammers je erin te laten lopen zodat je je privé-sleutels onthult of je fondsen naar hun portemonnees stuurt.

![Een support-scam op Discord](./discordScam.png)

Als algemene regel zal het personeel nooit met u communiceren via privé- en niet-officiële kanalen. Enkele eenvoudige dingen om in gedachten te houden bij het omgaan met support:

- Deel nooit uw privé-sleutels, seed phrases of wachtwoorden
- Sta nooit iemand op afstand toegang toe tot uw computer
- Communiceer nooit buiten de aangewezen kanalen van een organisatie

<InfoBanner emoji=":lock:">
  <div>
    Pas op: hoewel support scams vaak gebeuren op Discord, kunnen ze ook voorkomen in chatprogramma's waar discussie over crypto plaatsvindt, inclusief e-mail.
  </div>
</InfoBanner>

### 'Eth2'-tokenscam {#eth2-token-scam}

In de aanloop naar [The Merge](/roadmap/merge/) maakten oplichters gebruik van de verwarring rond de term 'Eth2' en probeerden ze gebruikers hun ETH te laten wisselen voor een onbestaand 'ETH2'-token. Er bestaat geen 'ETH2', en geen ander legitiem token werd ingevoerd bij The Merge. De ETH die je had voor The Merge is nu nog steeds dezelfde ETH. Er is **geen noodzaak om actie te ondernemen met betrekking tot je ETH voor de overstap van proof-of-work naar proof-of-stake**.

Scammers kunnen verschijnen in de vorm van "support" en zullen je vertellen om je ETH te storten om 'ETH2' terug te krijgen. Er is geen [officiële Ethereum-ondersteuning](/community/support/), en er is geen nieuw token. Deel nooit de zaadzin van je portemonnee met iemand.

_Opmerking: er zijn afgeleide tokens/tickers die een gestakete ETH kunnen vertegenwoordigen (d.w.z. rETH van Rocket Pool, stETH van Lido, ETH2 van Coinbase), maar dit is niet iets waar je naar hoeft te "migreren."_

### Phishing-scams {#phishing-scams}

Phishing-scams worden ook steeds vaker gebruikt in een poging om de fondsen uit je portemonnee te stelen.

Sommige phishing-e-mails vragen gebruikers om te klikken op links die hen omleiden naar imitatiewebsites, waarbij hen gevraagd wordt dat ze hun zaadzin invoeren, hun wachtwoord opnieuw instellen of ETH versturen. Andere mails kunnen je vragen om malware te installeren zonder dat je dat in de gaten hebt, om je computer te infecteren en de zwendelaars toegang te geven tot je computerbestanden.

Als je een e-mail van een onbekende afzender ontvangt, onthoud dan:

- Open nooit een link of bijlage vanuit e-mailadressen die u niet herkent
- Onthul uw persoonlijke gegevens of wachtwoorden nooit aan iemand
- Verwijder e-mails van onbekende afzenders

[Meer over het vermijden van phishing-scams](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Scams van cryptohandelaars {#broker-scams}

Oplichters die zich bezighouden met cryptohandel doen zich voor als gespecialiseerde cryptomakelaars en bieden aan om je geld over te nemen en namens jou te investeren. Nadat de zwendelaar je geld heeft ontvangen, kan hij/zij je aan het lijntje houden en je vragen meer geld te sturen. zodat je niet nog meer investeringswinsten mist, of hij/zij kan volledig van het toneel verdwijnen.

Deze oplichters vinden hun doelwitten vaak door nepaccounts op YouTube te gebruiken en zo ogenschijnlijk natuurlijke gesprekken over de 'makelaar' te beginnen. Deze gesprekken worden vaak sterk opgewaardeerd om de legitimiteit te vergroten, maar de upvotes komen allemaal van bot-accounts.

**Vertrouw geen internetvreemdelingen om namens jou te investeren. Je zult je crypto verliezen.**

![Een makelaar-scam op YouTube](./brokerScam.png)

### Cryptominingpool-scams {#mining-pool-scams}

Vanaf september 2022 is het niet meer mogelijk om Ethereum te minen. Er bestaan echter nog steeds miningpool-scams. Bij miningpool-scams nemen mensen ongevraagd contact met je op en beweren ze dat je grote rendementen kunt behalen door mee te doen met een Ethereum-miningpool. De zwendelaar zal claims doen en met je in contact blijven, hoelang het ook mag duren. In wezen probeert de oplichter je ervan te overtuigen dat wanneer je je voegt bij een Ethereum-miningpool, je cryptovaluta zal worden gebruikt om ETH te creëren en dat je ETH-dividenden zult ontvangen. Vervolgens zul je zien dat je cryptovaluta kleine rendementen oplevert. Dit is simpelweg om je te verlokken meer te investeren. Uiteindelijk worden al je fondsen verzonden naar een onbekend adres en de zwendelaar verdwijnt of blijft in sommige gevallen in contact, zoals is gebeurd in een recent geval.

Kortom: wees op je hoede voor mensen die via sociale media contact met je opnemen en je vragen om deel uit te maken van een miningpool. Zodra je je crypto kwijtraakt, is het voor altijd weg.

Dingen om te onthouden:

- Wees op uw hoede voor iedereen die contact met u opneemt over manieren om geld te verdienen met uw crypto
- Doe uw onderzoek naar staken, liquiditeitspools of andere manieren van investeren van uw crypto
- Dergelijke regelingen zijn zelden of nooit legitiem. Als dat wel het geval zou zijn, zouden ze waarschijnlijk in de mainstream zijn en heeft u ervan gehoord.

[Man verliest $ 200.000 in miningpool-scam](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop scams {#airdrop-scams}

Airdrop-scams hebben betrekking op een scamproject waarmee een activum (NFT, token) in je portemonnee terechtkomt en je naar een scamwebsite gestuurd wordt om het geairdropte activum op te halen. Je wordt gevraagd om in te loggen met je Ethereum-portemonnee en een transactie "goed te keuren" wanneer je probeert te claimen. Deze transactie brengt je account in gevaar door je publieke en privé-sleutels te verzenden naar de scammer. Een alternatieve vorm van deze scam kan ervoor zorgen dat je een transactie bevestigt die fondsen naar het account van de scammer verstuurt.

[Meer over airdrop-scams](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Webbeveiliging 101 {#web-security}

### Gebruik sterke wachtwoorden {#use-strong-passwords}

[Meer dan 80% van de account-hacks zijn het gevolg van zwakke of gestolen wachtwoorden](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Een lange combinatie van tekens, cijfers en symbolen zorgt ervoor dat je accounts veilig blijven.

Een veelgemaakte fout is het gebruiken van een combinatie van een aantal gemeenschappelijke, gerelateerde woorden. Dit soort wachtwoorden zijn onveilig omdat ze vatbaar zijn voor een hacktechniek die woordenboekaanval wordt genoemd.

```md
Voorbeeld van een zwak wachtwoord: CuteFluffyKittens!

Voorbeeld van een sterk wachtwoord: ymv\*azu.EAC8eyp8umf
```

Een andere veelgemaakte fout is het gebruiken van wachtwoorden die gemakkelijk te raden of te ontdekken zijn via [social engineering](https://wikipedia.org/wiki/Social_engineering_(security)). De meisjesnaam van je moeder, de namen van je kinderen of huisdieren of geboortedatums in je wachtwoord opnemen vergroot het risico dat je gehackt wordt.

#### Goede wachtwoordpraktijken: {#good-password-practices}

- Maak wachtwoorden zo lang mogelijk als is toegestaan door uw wachtwoordgenerator of het formulier dat u invult
- Gebruik een mengeling van hoofdletters, kleine letters, cijfers en symbolen
- Gebruik geen persoonlijke gegevens, zoals familienamen, in uw wachtwoord
- Vermijd veelvoorkomende woorden

[Meer over het maken van sterke wachtwoorden](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gebruik unieke wachtwoorden voor alles {#use-unique-passwords}

Een sterk wachtwoord dat openbaar is gemaakt bij een datalek, is niet langer een sterk wachtwoord. Op de website [Have I Been Pwned](https://haveibeenpwned.com) kun je controleren of je accounts betrokken zijn geweest bij openbare datalekken. Als dat het geval is, **verander die wachtwoorden dan onmiddellijk**. Door voor elk account een uniek wachtwoord te gebruiken, verklein je het risico dat hackers toegang krijgen tot al je accounts als een van je wachtwoorden wordt gecompromitteerd.

### Gebruik een wachtwoordbeheerder {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Het gebruik van een wachtwoordbeheerder zorgt voor het maken van sterke, unieke wachtwoorden en het onthouden van deze wachtwoorden! Wij raden <strong>sterk</strong> aan om er een te gebruiken, de meeste zijn gratis!
  </div>
</InfoBanner>

Het onthouden van sterke, unieke wachtwoorden voor elk account dat u heeft is niet ideaal. Een wachtwoordbeheerder biedt een veilige en versleutelde opslag voor al uw wachtwoorden waartoe u via één sterk hoofdwachtwoord toegang kunt verkrijgen. Ze suggereren ook sterke wachtwoorden bij het aanmelden voor een nieuwe service, zodat u uw eigen wachtwoord niet hoeft te maken. Veel wachtwoordbeheerders zullen u ook vertellen of u betrokken bent geweest bij een gegevenslek, waarna ze u uw wachtwoord laten wijzigen voordat er kwaadwillige aanvallen kunnen plaatsvinden.

![Voorbeeld van het gebruik van een wachtwoordbeheerder](./passwordManager.png)

#### Probeer een wachtwoordbeheerder: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Of bekijk andere [aanbevolen wachtwoordmanagers](https://www.privacytools.io/secure-password-manager)

### Gebruik tweefactorverificatie {#two-factor-authentication}

Soms word je gevraagd je identiteit te verifiëren met unieke bewijzen. Deze staan ​​bekend als **factoren**. De drie belangrijkste factoren zijn:

- Iets dat u kent (zoals een wachtwoord of een beveiligingsvraag)
- Iets dat u bent (zoals een vingerafdruk of iris-/gezichtsscanner)
- Iets waar u eigenaar van bent (een beveiligingssleutel of verificatie-app op uw telefoon)

Met behulp van **twee-factor-authenticatie (2FA)** zorg je voor een extra *beveiligingsfactor* voor je online accounts. Met 2FA zorg je ervoor dat je met alleen je wachtwoord niet meer toegang krijgt tot een account. Meest gebruikelijk is de tweede factor een willekeurige 6-cijferige code, bekend als een **tijdsgebaseerd eenmalig wachtwoord (TOTP)**, waartoe u toegang heeft via een verificatie-app zoals Google Authenticator of Authy. Deze werken als een "iets dat u bezit"-factor, omdat de seed die de tijdcode genereert op uw apparaat is opgeslagen.

<InfoBanner emoji=":lock:">
  <div>
    Opmerking: het gebruik van SMS-gebaseerde 2FA is gevoelig voor <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM-jacking</a> en is niet veilig. Voor de beste beveiliging gebruik je een service als <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> of <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Beveiligingssleutels {#security-keys}

Een beveiligingssleutel is een geavanceerder en veiliger type 2FA. Beveiligingssleutels zijn fysieke hardware-authenticatieapparaten die werken als authenticatie-apps. Het gebruik van een beveiligingssleutel is de meest veilige manier voor 2FA. Veel van deze sleutels gebruiken de FIDO Universal 2nd Factor (U2F)-standaard. [Meer informatie over FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Bekijk meer over 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Maak de installatie van browserextensies ongedaan {#uninstall-browser-extensions}

Browserextensies, zoals Chrome-extensies of Add-ons voor Firefox, kunnen de functionaliteit van de browser verbeteren, maar brengen ook risico's met zich mee. Standaard vragen de meeste browserextensies om toegang voor het 'Lezen en wijzigen van sitegegevens', waardoor ze bijna alles met uw gegevens kunnen doen. Chrome-extensies worden altijd automatisch bijgewerkt, zodat een voorheen veilige extensie later zodanig bijgewerkt kan worden dat een schadelijke code wordt opgenomen. De meeste browserextensies proberen uw gegevens niet te stelen, maar u moet weten dat ze dat wel kunnen.

#### Blijf veilig door: {#browser-extension-safety}

- Installeer alleen extensies van vertrouwde bronnen
- Ongebruikte browserextensies verwijderen
- Installeer Chrome-extensies lokaal om automatisch bijwerken te stoppen (Geavanceerd)

[Meer over de risico's van browserextensies](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Lees verder {#further-reading}

### Webbeveiliging {#reading-web-security}

- [Up to 3 million devices infected by malware-laced Chrome and Edge add-ons](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [How to Create a Strong Password — That You Won’t Forget](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [What is a security key?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Cryptobeveiliging {#reading-crypto-security}

- [Protecting Yourself and Your Funds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Security issues in common crypto communication software](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Security Guide For Dummies And Smart People Too](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Crypto Security: Passwords and Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Voorlichting over scams {#reading-scam-education}

- [Gids: Hoe scam-tokens identificeren](/guides/how-to-id-scam-tokens/)
- [Staying Safe: Common Scams](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Scams Vermijden](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Twitter-thread over veelvoorkomende crypto-phishingmails en -berichten](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
