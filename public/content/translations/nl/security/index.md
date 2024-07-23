---
title: Ethereum-beveiliging en -scampreventie
description: Veilig blijven op Ethereum
lang: nl
---

# Ethereum-beveiliging en -scampreventie {#introduction}

Met de groeiende belangstelling voor cryptocurrencies is het leren van beste praktijken bij het gebruik van cryptocurrency essentieel. Crypto kan leuk en opwindend zijn, maar er zijn ook serieuze risico's. Als u deze kleine hoeveelheid werk vooraf verricht, kunt u deze risico's beperken.

<Divider />

## Webbeveiliging 101 {#web-security}

### Gebruik sterke wachtwoorden {#use-strong-passwords}

[Meer dan 80% van de account-hacks zijn het gevolg van zwakke of gestolen wachtwoorden](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Een lange combinatie van tekens, nummers en symbolen is het beste om uw rekeningen veilig te houden.

Een veel voorkomende fout die personen maken is het gebruiken van een combinatie van twee tot drie gewone, gerelateerde woorden. Wachtwoorden als dit zijn onveilig omdat ze vatbaar zijn voor een eenvoudige hacktechniek die bekend staat als een [woordenboekaanval](https://wikipedia.org/wiki/Dictionary_attack).

```md
Voorbeeld van een zwak wachtwoord: CuteFluffyKittens!

Voorbeeld van een sterk wachtwoord: ymv\*azu.EAC8eyp8umf
```

Een andere veel voorkomende fout is het gebruik van wachtwoorden die gemakkelijk geraden of gevonden kunnen worden via [social engineering](<https://wikipedia.org/wiki/Social_engineering_(security)>). Het opnemen van de meisjesnaam van uw moeder, de namen van uw kinderen of huisdieren, of geboortedatums in uw wachtwoord is niet veilig en vergroot het risico dat uw wachtwoord wordt gehackt.

#### Goede wachtwoordpraktijken: {#good-password-practices}

- Maak wachtwoorden zo lang mogelijk als is toegestaan door uw wachtwoordgenerator of het formulier dat u invult
- Gebruik een mengeling van hoofdletters, kleine letters, cijfers en symbolen
- Gebruik geen persoonlijke gegevens, zoals familienamen, in uw wachtwoord
- Vermijd veelvoorkomende woordenboekwoorden

[Meer over het maken van sterke wachtwoorden](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gebruik unieke wachtwoorden voor alles {#use-unique-passwords}

Een sterk wachtwoord biedt niet zoveel bescherming als het wachtwoord in een gegevensinbreuk wordt weergegeven. Op de website[Have I Been Pwned](https://haveibeenpwned.com)kunt u controleren of uw accounts betrokken zijn geweest bij inbreuken op gegevens die in hun database zijn opgeslagen. Als ze dit hebben,**moet u onmiddellijk uw wachtwoorden wijzigen**. Het gebruik van unieke wachtwoorden voor elk account verlaagt het risico dat hackers toegang krijgen tot al uw accounts wanneer een van uw wachtwoorden in gevaar is.

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
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### Gebruik tweefactorverificatie {#two-factor-authentication}

Om te bewijzen dat u werkelijk u bent, zijn er verschillende unieke bewijzen die kunnen worden gebruikt voor authenticatie. Deze zijn bekend als **factoren** en de drie belangrijkste factoren zijn:

- Iets dat u kent (zoals een wachtwoord of een beveiligingsvraag)
- Iets dat u bent (zoals een vingerafdruk of iris-/gezichtsscanner)
- Iets waar u eigenaar van bent (een beveiligingssleutel of verificatie-app op uw telefoon)

Het gebruik van**tweefactorverificatie (2FA)**biedt een extra*beveiligingsfactor*voor uw online accounts zodat het kennen van uw wachtwoord alleen (iets dat u kent) niet genoeg is om toegang te krijgen tot een account. Meest gebruikelijk is de tweede factor een willekeurige 6-cijferige code, bekend als een **tijdsgebaseerd eenmalig wachtwoord (TOTP)**, waartoe u toegang heeft via een verificatie-app zoals Google Authenticator of Authy. Deze werken als een "iets dat u bezit"-factor, omdat de seed die de tijdcode genereert op uw apparaat is opgeslagen.

<InfoBanner emoji=":lock:">
  <div>
    Opmerking: het gebruik van SMS-gebaseerde 2FA is vatbaar voor
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM-jacking
    </a>
    en is niet veilig. Voor de beste veiligheid, gebruik een service zoals{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
    of <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Beveiligingssleutels {#security-keys}

Voor degenen die de volgende stap in 2FA willen zetten, overweeg een beveiligingssleutel te gebruiken. Beveiligingssleutels zijn fysieke hardware authenticatie apparaten die op dezelfde manier werken als authenticator apps. Het gebruik van een beveiligingssleutel is de meest veilige manier voor 2FA. Veel van deze sleutels gebruiken de FIDO Universal 2nd Factor (U2F)-standaard. [Meer informatie over FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Bekijk meer over 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Maak de installatie van browserextensies ongedaan {#uninstall-browser-extensions}

Browserextensies zoals Chrome-extensies of add-ons voor Firefox kunnen de functionaliteit van de browser uitbreiden en de gebruikerservaring verbeteren, maar ze brengen risico's met zich mee. Standaard vragen de meeste browserextensies om toegang voor het 'Lezen en wijzigen van sitegegevens', waardoor ze bijna alles met uw gegevens kunnen doen. Chrome-extensies worden altijd automatisch bijgewerkt, zodat een voorheen veilige extensie later zodanig bijgewerkt kan worden dat een schadelijke code wordt opgenomen. De meeste browserextensies proberen uw gegevens niet te stelen, maar u moet weten dat ze dat wel kunnen.

#### Blijf veilig door: {#browser-extension-safety}

- Installeer alleen extensies van vertrouwde bronnen
- Ongebruikte browserextensies verwijderen
- Installeer Chrome-extensies lokaal om automatisch bijwerken te stoppen (Geavanceerd)

[Meer over de risico's van browserextensies](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Crypto beveiliging 101 {#crypto-security}

### Vergroot uw kennis {#level-up-your-knowledge}

Een van de grootste redenen waarom mensen zich in het algemeen laten misleiden in crypto is een gebrek aan begrip. Als u bijvoorbeeld niet begrijpt dat het Ethereum-netwerk gedecentraliseerd is en eigendom is van niemand, is het makkelijk om ten prooi te vallen aan iemand die doet alsof hij een klantenservicemedewerker is die belooft uw verloren ETH terug te geven in ruil voor uw privé-sleutels. Het is een waardevolle investering om jezelf te leren hoe Ethereum functioneert.

<DocLink href="/what-is-ethereum/">
  Wat is Ethereum?
</DocLink>

<DocLink href="/eth/">
  Wat is ether?
</DocLink>
<Divider />

## Portemonneebeveiliging {#wallet-security}

### Geef uw privé-sleutels niet prijs {#protect-private-keys}

**Deel nooit om welke reden dan ook uw privé-sleutels!**

De prive-sleutel van uw portemonnee fungeert als een wachtwoord voor uw Ethereum-portemonnee. Het is het enige dat iemand die uw portemonnee-adres kent ervan weerhoudt om uw account en al uw activa te stelen!

<DocLink href="/wallets/">
  Wat is een Ethereum-portemonnee?
</DocLink>

#### Neem geen screenshots van uw seed phrases / privé-sleutels {#screenshot-private-keys}

Door een screenshot te maken van uw seed phrases of privé-sleutels, riskeert u ze naar de cloud te synchroniseren en ze mogelijk toegankelijk te maken voor hackers. Het verkrijgen van privé-sleutels uit de cloud is een vaak voorkomende aanvalsvector voor hackers.

### Gebruik een hardwareportemonnee {#use-hardware-wallet}

Een hardwareportemonnee biedt offline opslag voor privé-sleutels. Ze worden beschouwd als de veiligste portemonnee-optie voor het opslaan van uw privé-sleutels.

Privé-sleutels offline houden vermindert het risico om gehackt te worden, zelfs als een hacker de besturing van uw computer onder controle krijgt.

#### Gebruik een hardwareportemonnee: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Controleer de transacties dubbel vóór verzending {#double-check-transactions}

Het sturen van crypto naar het verkeerde portemonnee-adres is een veel voorkomende fout. **Een op Ethereum verzonden transactie is onomkeerbaar.** Tenzij u de adreseigenaar kent en hem ervan kunt overtuigen dat om uw fondsen terug te sturen, is er geen andere manier voor u om geld terug te krijgen.

Zorg er altijd voor dat het adres waarheen u stuurt precies overeenkomt met het gewenste adres van de ontvanger voordat u een transactie verstuurt. Het wordt ook aanbevolen bij interactie met een slim contract het transactiebericht vóór ondertekening te lezen.

### Stel bestedingslimieten voor slimme contracten in {#spend-limits}

Sta bij interactie met slimme contracten geen onbeperkte bestedingslimieten toe. In geval van onbeperkte uitgaven, kan het slimme contract uw portemonnee leegmaken. Stel in plaats daarvan uitgavenlimieten in op het bedrag dat nodig is voor de transactie.

Veel Ethereum-portemonnees bieden limieten aan bescherming tegen het leeglopen van rekeningen.

<Divider />

## Veelvoorkomende scams {#common-scams}

Scammers zijn altijd op zoek naar manieren om uw geld te stelen. Het is onmogelijk om de zwendelpraktijken volledig te stoppen, maar we kunnen ze minder effectief maken door ons bewust te zijn van de meeste gebruikte technieken. Er zijn veel variaties van deze oplichters, maar over het algemeen volgen ze dezelfde patronen van hoog niveau. Onthoud in elk geval:

- wees altijd sceptisch
- niemand zal u gratis of afgeprijsd ETH geven
- niemand heeft toegang nodig tot uw privé-sleutels of persoonlijke informatie

### Giveaway-scam {#giveaway}

Een van de meest voorkomende zwendelpraktijken in cryptocurrency is de giveaway-scam. De giveaway-scam kan vele vormen aannemen, maar de algemene premisse is dat als u ETH naar het opgegeven portemonneeadres stuurt, u uw ETH verdubbeld terugkrijgt. *Om deze reden staat het ook bekend als de 2-voor-1 scam.*

Deze zwendelpraktijken geven meestal slechts een beperkte tijd om de giveaway te claimen om slechte besluitvorming te bevorderen en een gevoel van valse urgentie te creëren.

#### Socialemedia-hacks {#social-media-hacks}

Een high-profile versie hiervan vond plaats in juli 2020, toen de Twitter-accounts van prominente beroemdheden en organisaties werden gehackt. De hacker plaatste tegelijkertijd een Bitcoin giveaway op de gehackte accounts. Hoewel de misleidende tweets snel werden opgemerkt en verwijderd, slaagden de hackers er nog steeds in om met 11 bitcoin (of $ 500.000 per september 2021) weg te komen.

![Een scam op Twitter](./appleTwitterScam.png)

#### Celebrity giveaway {#celebrity-giveaway}

De celebrity giveaway is een andere veelvoorkomende vorm van de giveaway scam. De oplichters nemen een opgenomen video-interview of conferentiegesprek van een celebrity en livestreamen dit op YouTube, zodat het lijkt alsof de celebrity een live video interview gaf ter ondersteuning van een cryptocurrency giveaway.

Vitalik Buterin wordt het meest gebruikt in deze zwendel, maar veel andere prominente mensen die betrokken zijn bij crypto worden ook gebruikt (bijv. Elon Musk of Charles Hoskinson). Door een bekend persoon erbij te halen krijgt de livestream van de scammers een atmosfeer van legitimiteit (dit ziet er vaag uit, maar het gaat om Vitalik, dus het moet OK zijn!).

**Giveaways zijn altijd scams. Als u fondsen naar deze rekeningen stuurt, verliest u ze voor altijd.**

![Een scam op YouTube](./youtubeScam.png)

### Support scams {#support-scams}

Cryptocurrency is een relatief jonge en onbegrepen technologie. Een veelvoorkomende zwendel die hiervan profiteert is de support scam, waarbij zwendelaars doen alsof ze ondersteunend personeel zijn voor populaire portemonnees, exchanges of blockchains.

Veel van de discussie over Ethereum vindt plaats op Discord. Support scammers zullen vaak hun doelwit vinden door te zoeken naar ondersteuningsvragen in publieke discord-kanalen en vervolgens een privé-bericht sturen dat ondersteuning biedt. Door vertrouwen op te bouwen, proberen scammers u erin te laten lopen zodat u uw privé-sleutels onthult of uw fondsen naar hun portemonnees stuurt.

![Een support scam op Discord](./discordScam.png)

Als algemene regel zal het personeel nooit met u communiceren via privé- en niet-officiële kanalen. Enkele eenvoudige dingen om in gedachten te houden bij het omgaan met support:

- Deel nooit uw privé-sleutels, seed phrases of wachtwoorden
- Sta nooit iemand op afstand toegang toe tot uw computer
- Communiceer nooit buiten de aangewezen kanalen van een organisatie

<InfoBanner emoji=":lock:">
  <div>
    Pas op: hoewel support scams vaak gebeuren op Discord, kunnen ze ook voorkomen in chatprogramma's waar discussie over crypto plaatsvindt, inclusief e-mail.
  </div>
</InfoBanner>

### Phishing scams {#phishing-scams}

Phishing scams worden ook steeds vaker gebruikt om de fondsen uit uw portemonnee te stelen.

Sommige phishing e-mails vragen gebruikers om te klikken op links die hen omleiden naar imitatiewebsites, waarbij hen gevraagd wordt dat ze hun seed phrase invoeren, hun wachtwoord opnieuw instellen of ETH versturen. Andere mails kunnen u vragen om malware te installeren zonder dat u dat in de gaten heeft, om uw computer te infecteren en de zwendelaars toegang te geven tot uw computerbestanden.

Als u een e-mail van een onbekende afzender ontvangt, onthoud dan:

- Open nooit een link of bijlage vanuit e-mailadressen die u niet herkent
- Onthul uw persoonlijke gegevens of wachtwoorden nooit aan iemand
- Verwijder e-mails van onbekende afzenders

[Meer over het vermijden van phishing scams](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Scams van cryptohandelaars {#broker-scams}

Oplichtende cryptohandelaars beweren gespecialiseerde makelaars in cryptocurrency te zijn die aanbieden om uw geld te nemen en het namens u te investeren. De beloften van onrealistische rendementen horen meestal bij dit aanbod. Nadat de zwendelaar uw geld heeft ontvangen, kan hij u aan het lijntje houden en u vragen meer geld te sturen. zodat u niet nog meer investeringswinsten mist, of hij kan volledig van het toneel verdwijnen.

Deze frauduleuze makelaars vinden hun doelwitten door valse accounts op YouTube te gebruiken om schijnbaar natuurlijke gesprekken over de handel te starten. Deze gesprekken worden vaak sterk opgewaardeerd om de legitimiteit te vergroten, maar de upvotes komen allemaal van bot-accounts.

**Vertrouw geen internetvreemdelingen om namens u te investeren. U zult uw crypto verliezen.**

![Een makelaarscam op YouTube](./brokerScam.png)

### Cryptominingpool scams {#mining-pool-scams}

Bij miningpool scams nemen mensen ongevraagd contact met u op en beweren ze dat u grote rendementen kunt behalen door u te voegen bij een Ethereum miningpool. De zwendelaar zal claims doen en met u in contact blijven, hoelang het ook mag duren. In wezen zal de zwendelaar proberen u ervan te overtuigen dat wanneer u zich voegt bij een Ethereum miningpool, uw cryptocurrency wordt gebruikt om ETH te maken en dat u dividenden ontvangt in de vorm van ETH. Wat uiteindelijk zal gebeuren, is dat u ziet dat uw cryptocurrency kleine rendementen oplevert. Dit is simpelweg om u te verlokken meer te investeren. Uiteindelijk worden al uw fondsen verzonden naar een onbekend adres en de zwendelaar verdwijnt of blijft in sommige gevallen in contact, zoals is gebeurd in een recent geval.

Feit is, wees voorzichtig met mensen die contact met u opnemen via sociale media en u vragen om deel te nemen aan een miningpool. Als u uw crypto kwijtraakt, is het voor altijd weg.

Dingen om te onthouden:

- Wees op uw hoede voor iedereen die contact met u opneemt over manieren om geld te verdienen met uw crypto
- Doe uw onderzoek naar staken, liquiditeitspools of andere manieren van investeren van uw crypto
- Dergelijke regelingen zijn zelden of nooit legitiem. Als dat wel het geval zou zijn, zouden ze waarschijnlijk in de mainstream zijn en heeft u ervan gehoord.

[Man verliest $ 200.000 in mining-pool-scam](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 'Eth2'-tokenscam {#eth2-token-scam}

Met [de merge](/roadmap/merge/) die komt in 2022, hebben oplichters van de verwarring rond de term 'Eth2' gebruik gemaakt om te proberen gebruikers hun ETH te laten inwisselen voor een 'ETH2'-token. Er is geen 'ETH2' of een ander nieuw token ingevoerd bij de merge. Het ETH dat u vandaag bezit zal na de merge dezelfde ETH blijven en er is geen noodzaak om swaps van uw ETH te doen voor de merge.

Scammers kunnen verschijnen in de vorm van "support" die u vertelt dat als u uw ETH stort, u 'ETH2' terugkrijgt. Er is geen [officiële Ethereum-ondersteuning](/community/support/), en er is geen nieuwe token. Deel nooit de seed phrase van uw portemonnee met iemand.

_Opmerking: er zijn afgeleide tokens/tickers die een gestakete ETH kunnen vertegenwoordigen (d.w.z. rETH van Rocket Pool, stETH van Lido, ETH2 van Coinbase), maar dit is niet iets waar u naar hoeft te "migreren."_

### Airdrop scams {#airdrop-scams}

Airdrop scams hebben betrekking op een scamproject waarmee een activum (NFT, token) in uw portemonnee terechtkomt en u naar een scamwebsite gestuurd wordt om de airdrop op te halen. U wordt gevraagd om in te loggen met uw Ethereum-portemonnee en een transactie "goed te keuren" wanneer u probeert te claimen. Deze transactie brengt uw account in gevaar door uw publieke en privé-sleutels te verzenden naar de scammer. Een alternatieve vorm van deze zwendel kan ervoor zorgen dat u een transactie bevestigt die fondsen naar het account van de scammer verstuurt.

[Meer over airdrop scams](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Lees verder {#further-reading}

### Webbeveiliging {#reading-web-security}

- [This is why you shouldn’t use texts for two-factor authentication](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Up to 3 million devices infected by malware-laced Chrome and Edge add-ons](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [How to Create a Strong Password — That You Won’t Forget](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [What is a security key?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Cryptobeveiliging {#reading-crypto-security}

- [Protecting Yourself and Your Funds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [4 Ways to Stay Safe in Crypto](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/) - _CoinDesk_
- [Security Guide For Dummies And Smart People Too](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Crypto Security: Passwords and Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Voorlichting over scams {#reading-scam-education}

- [Staying Safe: Common Scams](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Avoiding Scams](https://bitcoin.org/en/scams) _Bitcoin.org_
