---
title: Bezpečnosť Etherea a prevencia proti podvodom
description: Bezpečnosť na Ethereu
lang: sk
---

# Bezpečnosť Etherea a prevencia proti podvodom {#introduction}

Rastúci záujem o kryptomeny so sebou prináša rastúce riziko zo strany podvodníkov a hackerov. Tento článok obsahuje niektoré osvedčené postupy na zmiernenie týchto rizík.

<Divider />

## Krypto bezpečnosť 101 {#crypto-security}

### Zvýšte svoje vedomosti {#level-up-your-knowledge}

Nedorozumenia o tom, ako kryptomeny fungujú, môžu viesť k nákladným chybám. Ak sa napríklad niekto vydáva za agenta zákazníckeho servisu, ktorý vám výmenou za vaše súkromné kľúče vráti stratené ETH, využíva ľudí, ktorí nechápu, že Ethereum je decentralizovaná sieť bez tohto druhu funkcionality. Vzdelávať sa o tom, ako Ethereum funguje, sa oplatí.

<DocLink href="/what-is-ethereum/">
  Čo je to Ethereum?
</DocLink>

<DocLink href="/eth/">
  Čo je ether?
</DocLink>
<Divider />

## Bezpečnosť peňaženky {#wallet-security}

### Nezdieľajte svoje súkromné ​​kľúče {#protect-private-keys}

**Nikdy a zo žiadneho dôvodu nezdieľajte svoje súkromné ​​kľúče!**

Súkromný kľúč k vašej peňaženke je heslo k vašej Ethereum peňaženke. Je to jediná vec, ktorá zabráni tomu, aby niekto, kto pozná adresu vašej peňaženky, vyčerpal z vášho účtu všetky aktíva!

<DocLink href="/wallets/">
  Čo je peňaženka pre Ethereum?
</DocLink>

#### Nerobte si snímky obrazovky svojich seed fráz/súkromných kľúčov {#screenshot-private-keys}

Snímanie obrazovky vašich seed fráz alebo súkromných kľúčov ich môže synchronizovať s poskytovateľom cloudových údajov, čím by ich mohlo sprístupniť hackerom. Získavanie súkromných kľúčov z cloudu je pre hackerov bežným útokom.

### Použite hardvérovú peňaženku {#use-hardware-wallet}

Hardvérová peňaženka poskytuje offline úložisko pre súkromné ​​kľúče. Sú považované za najbezpečnejšiu možnosť peňaženky na uloženie vašich súkromných kľúčov: váš súkromný kľúč sa nikdy nedostane na internet a zostane úplne lokálny na vašom zariadení.

Držanie súkromných kľúčov v režime offline výrazne znižuje riziko napadnutia, aj v prípade, keď hacker získa kontrolu nad vaším počítačom.

#### Vyskúšajte hardvérovú peňaženku: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Pred odoslaním transakcie si ju znova skontrolujte {#double-check-transactions}

Náhodné odoslanie kryptomien na nesprávnu adresu peňaženky je bežnou chybou. **Transakcia odoslaná cez Ethereum je nevratná.** Pokiaľ nepoznáte vlastníka adresy a nepresvedčíte ho, aby vám poslal prostriedky späť, nebudete môcť svoje prostriedky získať späť.

Pred odoslaním transakcie sa vždy uistite, že adresa, na ktorú posielate, sa presne zhoduje s adresou požadovaného príjemcu. Pri interakcii so smart kontraktom je dobrou praxou prečítať si správu o transakcii pred podpisom.

### Nastavte si limity výdavkov na interakciu so smart konrtaktami {#spend-limits}

Pri interakcii so smart kontraktami nepovoľte neobmedzené limity výdavkov. Neobmedzené výdavky by mohli umožniť smart kontraktu vyčerpať vašu peňaženku. Namiesto toho nastavte limity výdavkov iba na sumu potrebnú na transakciu.

Mnohé Ethereum peňaženky ponúkajú ochranu pomocou limitou na zabezpečenie pred vyčerpaním účtov.

[Ako zrušiť prístup chytrého kontraktu k Vašim prostriedkom](/guides/how-to-revoke-token-access/)

<Divider />

## Bežné podvody {#common-scams}

Nie je možné úplne zastaviť podvodníkov, ale môžeme im znížiť efektivitu tým, že si uvedomíme ich najpoužívanejšie techniky. Existuje mnoho variácií týchto podvodov, ale vo všeobecnosti sa riadia rovnakými vzorcami na vysokej úrovni. Ak nič iné, pamätajte:

- vždy buďte skeptickí,
- nikto vám nedá bezplatný alebo zľavnený ETH,
- nikto nepotrebuje prístup k vašim súkromným kľúčom alebo osobným informáciám.

### Twitter reklamný phishing {#ad-phishing}

![Phishing v odkazoch na Twitteri](./twitterPhishingScam.png)

Existuje metóda na sfalšovanie funkcie ukážky odkazu na Twitteri (známom aj ako X) s cieľom potenciálne oklamať používateľov, aby si mysleli, že navštevujú legitímnu webovú stránku. Táto technika využíva mechanizmus Twitteru na generovanie ukážok adries URL zdieľaných v tweetoch a zobrazuje napríklad _ ethereum.org_ (zobrazené vyššie), keď je v skutočnosti používateľ po kliknutí presmerovaný na škodlivú stránku.

Vždy skontrolujte, či ste na správnej doméne, najmä po kliknutí na odkaz.

[Viac informácií nájdete tu](https://harrydenley.com/faking-twitter-unfurling).

### Podvod s darmi {#giveaway}

Jedným z najbežnejších podvodov v kryptomenách je podvod s darmi. Podvod s darmi môže mať mnoho podôb, ale všeobecná myšlienka je, že ak pošlete ETH na uvedenú adresu peňaženky, dostanete svoj ETH späť, ale dvojnásobok. *Z tohto dôvodu je známy aj ako podvod 2 za cenu 1.*

Tieto podvody zvyčajne stanovujú obmedzený čas príležitosti na uplatnenie nároku na dar, aby vytvorili falošný pocit naliehavosti.

### Hackovanie sociálnych médií {#social-media-hacks}

Populárna verzia sa objavila v júli 2020, keď boli hacknuté účty prominentných celebrít a organizácií na Twitteri. Hacker súčasne na napadnutých účtoch uverejnil tweet s bitcoinovým darom. Hoci si klamlivé tweety rýchlo všimli a vymazali, hackerom sa aj tak podarilo odísť s 11 bitcoinami (alebo 500 000 $ v septembri 2021).

![Podvod na Twitteri](./appleTwitterScam.png)

### Dar od celebrít {#celebrity-giveaway}

Dar od celebrít je ďalšou bežnou formou podvodu s darmi. Podvodníci nahrajú videorozhovor alebo konferenčný hovor s celebritou a vysielajú ho naživo na YouTube, vďaka čomu to vyzerá akoby daná celebrita poskytovala živý videorozhovor s propagáciou daru v kryptomenách.

Najčastejšie sa v tomto podvode používa Vitalik Buterin, ale využíva sa aj mnoho ďalších prominentných ľudí zapojených do kryptomien (napr. Elon Musk alebo Charles Hoskinson). Zahrnutie známej osoby dáva podvodníkom pocit legitímnosti (vyzerá to pochybne ale zapojil sa Vitalik, takže to musí byť v poriadku!).

**Dary sú vždy podvody. Ak pošlete svoje prostriedky na tieto účty, stratíte ich navždy.**

![Podvod na YouTube](./youtubeScam.png)

### Podvody na podpore {#support-scams}

Kryptomena je relatívne nová a nepochopená technológia. Bežným podvodom, ktorý to využíva, je podvod s podporou, kde sa podvodníci vydávajú za zákaznícku podporu obľúbených peňaženiek, burz alebo blockchainov.

Veľká časť diskusií o Ethereu sa odohráva na Discorde. Podvodníci zákazníckej podpory zvyčajne nájdu svoj cieľ vyhľadaním otázok podpory na verejných Discord kanáloch a následným odoslaním súkromnej správy žiadateľovi s ponukou podpory. Vybudovaním dôvery sa vás podvodníci snažia oklamať, aby ste odhalili vaše súkromné ​​kľúče alebo poslali vaše prostriedky do ich peňaženiek.

![Podvod s podporou na Discorde](./discordScam.png)

Vo všeobecnosti, personál s vami nikdy nebude komunikovať prostredníctvom súkromných, neoficiálnych kanálov. Pri poskytovaní podpory je potrebné mať na pamäti niekoľko jednoduchých bodov:

- nikdy nezdieľajte svoje súkromné ​​kľúče, seed frázy alebo heslá,
- nikdy nikomu neumožnite vzdialený prístup k vášmu počítaču,
- nikdy nekomunikujte mimo kanály určené organizáciou.

<InfoBanner emoji=":lock:">
  <div>
    Dávajte si pozor: aj keď sa na Discorde bežne vyskytujú podvody v štýle zákazníckej podpory, môžu sa vyskytovať aj v akýchkoľvek chatovacích aplikáciách, kde prebieha kryptografická diskusia, vrátane e-mailu.
  </div>
</InfoBanner>

### Podvod s tokenom „Eth2“ {#eth2-token-scam}

Pred prípravou [Zlúčenia](/roadmap/merge/) podvodníci využili zmätok okolo pojmu „Eth2“ a pokúsili sa prinútiť používateľov, aby vymenili svoje ETH za token „ETH2“. Neexistuje žiadny token 'ETH2' a so Zlúčením nebol predstavený žiadny iný legitímny token. ETH, ktorý ste vlastnili pred Zlúčením, je stále rovnaký ETH. Nie je potrebné **podniknúť žiadne kroky súvisiace s vaším ETH pre prechod z proof-of-work na proof-of-stake**.

Podvodníci môžu vystupovať v mene „podpory“ a povedať vám, že ak vložíte svoj ETH, dostanete späť „ETH2“. Neexistuje žiadna [oficiálna podpora Etherea](/community/support/) a neexistuje žiadny nový token. Nikdy s nikým nezdieľajte svoju seed frázu peňaženky.

_Poznámka: existujú odvodené tokeny/tickery, ktoré môžu predstavovať stakovaný ETH (napr. rETH z Rocket Pool, stETH z Lido, ETH2 z Coinbase), ale nie sú to tokeny, na ktoré musíte „migrovať“_

### Phishingové podvody {#phishing-scams}

Phishingové podvody sú ďalším čoraz bežnejším podvodom, ktorý podvodníci použijú na pokus o ukradnutie finančných prostriedkov z vašej peňaženky.

Niektoré phishingové e-maily žiadajú používateľov, aby klikli na odkazy, ktoré ich presmerujú na podobné webové stránky a požiadajú ich, aby zadali svoju seed frázu, resetovali svoje heslo alebo poslali ETH. Iné vás môžu požiadať o nevedomú inštaláciu škodlivého softvéru, ktorý infikuje váš počítač a poskytne podvodníkom prístup k súborom vášho počítača.

Ak dostanete e-mail od neznámeho odosielateľa, pamätajte:

- nikdy neotvárajte odkaz alebo prílohu z e-mailových adries, ktoré nepoznáte,
- nikdy nikomu neprezrádzajte svoje osobné údaje, ani heslá
- odstráňte e-maily od neznámych odosielateľov.

[Viac informácií o tom, ako sa vyhnúť phishingovým podvodom](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Podvody s maklérmi na burzách s kryptomenami {#broker-scams}

Podvodní makléri na burze s kryptomenami tvrdia, že sú špecializovaní makléri, ktorí vám ponúknu, že si vezmú vaše peniaze a investujú vo vašom mene. Keď podvodník dostane vaše prostriedky, môže vás naďalej viesť za nos a požiadať, aby ste mu poslali viac prostriedkov, aby ste neprišli o ďalšie investičné zisky alebo môžu úplne zmiznúť.

Títo podvodníci často vyhľadávajú ciele pomocou falošných účtov na YouTube a začínajú zdanlivo prirodzené konverzácie o „maklérovi“. Takéto konverzácie sú často pozitívne hodnotené, aby sa zvýšila legitimita, ale všetky pozitívne hlasy pochádzajú z bot účtov.

**Neverte cudzincom na internete, že budú investovať vo vašom mene. Prídete o svoje krypto.**

![Podvodný kryptomaklér na YouTube](./brokerScam.png)

### Podvody s kryptoťažobnými poolmi {#mining-pool-scams}

Od septembra 2022 už ťažba na Ethereu nie je možná. Podvody s kryptoťažobnými poolmi však stále existujú. Podvody s kryptoťažobnými poolmi zahŕňajú ľudí, ktorí vás bez vyžiadania kontaktujú a tvrdia, že môžete dosiahnuť veľké výnosy, ak sa pripojíte k ťažobnému Ethereum poolu. Podvodník si bude robiť nároky a zostane s vami v kontakte tak dlho, ako to bude potrebné. V podstate sa vás podvodník pokúsi presvedčiť, že keď sa pripojíte k ťažobnému poolu Etherea, vaša kryptomena sa použije na vytvorenie ETH a že vám budú vyplatené dividendy z ETH. Potom uvidíte, že vaša kryptomena prináša malé výnosy. Toto vás jednoducho prinúti investovať viac. Nakoniec budú všetky vaše prostriedky odoslané na neznámu adresu a podvodník buď zmizne, alebo v niektorých prípadoch zostane v kontakte, ako sa to stalo v nedávnom prípade.

Záver: dávajte si pozor na ľudí, ktorí vás kontaktujú na sociálnych sieťach a žiadajú, aby ste sa stali súčasťou ťažobného poolu. Akonáhle stratíte svoje krypto, je navždy preč.

Zapamätajte si:

- Dávajte si pozor na ľudí, ktorí vás kontaktujú ohľadom spôsobov, ako zarobiť peniaze z vašich kryptomien
- Urobte si prieskum o stakingu, pooloch likvidity alebo iných spôsoboch investovania vašich kryptomien
- Zriedka, ak vôbec, sú takéto schémy legitímne. Ak by boli, pravdepodobne by boli mainstreamom a už by ste o nich počuli.

[Muž prišiel o 200 000 dolárov v podvode s ťažobným poolom](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop podvody {#airdrop-scams}

Airdrop podvody zahŕňajú podvodný projekt, pri ktorom sa aktívum (NFT, token) presunie do vašej peňaženky a pošle vás na webovú stránku s podvodom, kde si odoslané aktívum môžete nárokovať späť. Pri pokuse o nárokovanie sa zobrazí výzva na prihlásenie pomocou peňaženky Ethereum a „schválenie“ transakcie. Táto transakcia ohrozí váš účet odoslaním vašich verejných a súkromných kľúčov podvodníkovi. Alternatívnou formou tohto podvodu môže byť potvrdenie transakcie, ktorá posiela prostriedky na účet podvodníka.

[Viac o airdrop podvodoch](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Webová bezpečnosť 101 {#web-security}

### Používajte silné heslá {#use-strong-passwords}

[Viac ako 80 % prípadov napadnutia účtu je dôsledkom slabých alebo ukradnutých hesiel](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Pre zabezpečenie účtov je najlepšia dlhá kombinácia znakov, čísel a symbolov.

Bežnou chybou je použitie kombinácie niekoľkých bežných, súvisiacich slov. Také heslá nie sú bezpečné, pretože sú náchylné k jednoduchej hackerskej technike zvanej slovníkový útok.

```md
Príklad slabého hesla: RozkošnéMiléMačiatka!

Príklad silného hesla: ymv\*azu.EAC8eyp9umf
```

Ďalšou častou chybou je používanie hesiel, ktoré možno ľahko uhádnuť alebo zistiť pomocou [sociálneho inžinierstva](https://wikipedia.org/wiki/Social_engineering_(security)). Uvádzanie mena vašej matky za slobodna, mien detí alebo domácich maznáčikov alebo dát narodenia v hesle nie je bezpečné a zvyšuje riziko prelomenia hesla.

#### Čoho sa držať, keď vytvárate heslo: {#good-password-practices}

- vytvárajte heslá tak dlhé, ako to umožňuje generátor hesiel alebo vyplňovaný formulár,
- používajte kombináciu veľkých a malých písmen, číslic a symbolov,
- v hesle nepoužívajte osobné údaje, napríklad priezvisko,
- vyhnite sa bežným výrazom.

[Viac o vytváraní silných hesiel](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Používajte pre všetko jedinečné heslá {#use-unique-passwords}

Silné heslo, ktoré bolo odhalené pri úniku dát, už nie je silným heslom. Webová stránka [Have I Been Pwned](https://haveibeenpwned.com) vám umožňuje skontrolovať, či boli vaše účty zahrnuté do verejných únikov dát. Ak áno, **okamžite tieto heslá zmeňte**. Používanie unikátnych hesiel pre každý účet znižuje riziko, že sa hackeri dostanú ku všetkým vašim účtom, pokiaľ jedno z vašich hesiel bude kompromitované.

### Používajte správcu hesiel {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Správca hesiel sa postará o vytvorenie silných a jedinečných hesiel a ich zapamätanie! <strong>Vrelo</strong> odporúčame nejaký používať, väčšina z nich je zadarmo!
  </div>
</InfoBanner>

Pamätať si silné a jedinečné heslá pre každý účet nie je ideálne. Správca hesiel ponúka bezpečné šifrované úložisko všetkých vašich hesiel, ku ktorým máte prístup prostredníctvom jedného silného hlavného hesla. Pri registrácii do novej služby tiež odporúčajú silné heslá, aby ste si nemuseli vytvárať vlastné. Mnoho správcov hesiel vám tiež oznámi, či ste boli súčasťou úniku dát, a umožní vám zmeniť heslá skôr, než dôjde k škodlivým útokom.

![Príklad použitia správcu hesiel](./passwordManager.png)

#### Vyskúšajte správcu hesiel: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Alebo sa pozrite na ďalších [odporúčaných správcov hesiel](https://www.privacytools.io/secure-password-manager)

### Používajte dvojfaktorové overenie {#two-factor-authentication}

Niekedy môžete byť požiadaní o overenie svojej identity prostredníctvom unikátnych dôkazov. Tieto dôkazy sú známe ako **faktory**. Tri hlavné faktory sú:

- niečo, čo viete (ako napríklad heslo alebo bezpečnostnú otázku),
- niečo, čím ste (ako napríklad odtlačok prsta alebo sken dúhovky/tváre),
- niečo, čo vlastníte (bezpečnostný kľúč alebo overovacie aplikácie v telefóne).

Používanie **dvojfaktorového overenia (2FA) **je ďalším* bezpečnostným faktorom* pre vaše online účty. Funkcia 2FA zabezpečuje, že na prístup k účtu nestačí mať len vaše heslo. Druhým faktorom je najčastejšie náhodný šesťmiestny kód, známy ako **jednorazové časovo obmedzené heslo (TOTP)**, ku ktorému získate prístup prostredníctvom autentizačnej aplikácie, ako je Google Authenticator alebo Authy. Fungujú, ako „niečo, čo vlastníte“, pretože seed, ktorý generuje časovaný kód, je uložený vo vašom zariadení.

<InfoBanner emoji=":lock:">
  <div>
    Poznámka: Používanie 2FA pomocou SMS je náchylné na <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">odcudzenie SIM</a> a nie je bezpečné. Pre najlepšiu ochranu používajte službu ako <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> alebo <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Bezpečnostné kľúče {#security-keys}

Bezpečnostný kľúč je pokročilejší a bezpečnejší typ 2FA. Bezpečnostné kľúče sú fyzické hardvérové ​​autentizačné zariadenia, ktoré fungujú podobne ako autentizačné aplikácie. Najbezpečnejším spôsobom 2FA je použitie bezpečnostného kľúča. Mnoho týchto kľúčov využíva štandard FIDO Universal 2nd Factor (U2F). [Zistite viac o FIDO U2F.](https://www.yubico.com/authentication-standards/fido-u2f/).

Pozrite sa na ďalšie informácie o 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Odinštalujte rozšírenie prehliadača {#uninstall-browser-extensions}

Rozšírenia pre prehliadače, ako sú rozšírenia pre Chrome alebo doplnky pre Firefox, môžu zlepšiť funkčnosť prehliadača, ale tiež prinášajú určité riziká. V predvolenom nastavení si väčšina rozšírení prehliadača vyžiada prístup k „čítaniu a zmene dát webu“, čo im umožňuje robiť s vašimi dátami takmer čokoľvek. Rozšírenia Chrome sú vždy automaticky aktualizované, takže predtým bezpečné rozšírenie môže byť neskôr aktualizované a obsahovať škodlivý kód. Väčšina rozšírení prehliadača sa nesnaží ukradnúť vaše dáta, ale mali by ste vedieť, že to môžu urobiť.

#### Zostaňte v bezpečí tým, že: {#browser-extension-safety}

- budete inštalovať rozšírenie prehliadača iba z dôveryhodných zdrojov,
- budete odstraňovať nepoužívané rozšírenia prehliadača,
- budete inštalovať rozšírenie Chrome lokálne, aby ste zastavili automatické aktualizácie (Pokročilé).

[Ďalšie informácie o rizikách rozšírenia prehliadača](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Ďalšie zdroje informácií {#further-reading}

### Bezpečnosť na internete {#reading-web-security}

- [Až 3 milióny zariadení infikovaných doplnkami pre Chrome a Edge](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) – _Dan Goodin_
- [Ako vytvoriť silné heslo, ktoré nezabudnete](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) – _AVG_
- [Čo je bezpečnostný kľúč?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) – _Coinbase_

### Krypto bezpečnosť {#reading-crypto-security}

- [Ako ochrániť seba a svoje prostriedky](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) – _MyCrypto_
- [Bezpečnostné problémy v bežnom kryptokomunikačnom softvéri](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) – _Salus_
- [Bezpečnostný návod pre truľov, ale aj pre múdrych](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) – _MyCrypto_
- [Krypto bezpečnosť: heslá a Overovanie](https://www.youtube.com/watch?v=m8jlnZuV1i4) – _Andreas M. Antonopoulos_

### Výučba o podvodoch {#reading-scam-education}

- [Návod: ako rozpoznať podvodné tokeny](/guides/how-to-id-scam-tokens/)
- [Ako zostať v bezpečí: časté podvody](https://support.mycrypto.com/staying-safe/common-scams) – _MyCrypto_
- [Predchádzanie podvodom](https://bitcoin.org/en/scams) – _Bitcoin.org_
- [Vlákno na Twitteri o bežných kryptophishingových e-mailoch a správach](https://twitter.com/tayvano_/status/1516225457640787969) – _Taylor Monahan_

<QuizWidget quizKey="security" />
