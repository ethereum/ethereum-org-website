---
title: Bezpečnost a předcházení podvodům v Ethereu
description: Jak zůstat v bezpečí na Ethereu
lang: cs
---

# Bezpečnost a předcházení podvodům v Ethereu {#introduction}

S rostoucím zájmem o kryptoměny je nezbytné osvojit si osvědčené postupy při jejich používání. Kryptoměny mohou být zábavné a vzrušující, ale existují i vážná rizika. Pokud si předem dáte tuhle malou práci, můžete tato rizika zmírnit.

<Divider />

## Bezpečnost na internetu v kostce {#web-security}

### Používejte silná hesla {#use-strong-passwords}

[Více než 80 % případů napadení účtu je důsledkem slabých nebo ukradených hesel](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Pro zabezpečení účtů je nejlepší dlouhá kombinace znaků, čísel a symbolů.

Častou chybou, které se lidi dopouštějí, je používání kombinace dvou až tří běžných, ve slovníku příbuzných, slov. Taková hesla jsou nezabezpečená, protože jsou náchylná k jednoduché hackerské technice známé jako [slovníkový útok](https://wikipedia.org/wiki/Dictionary_attack).

```md
Příklad slabého hesla: CuteFluffyKittens!

Příklad silného hesla: ymv\*azu.EAC8eyp8umf
```

Další častou chybou je používání hesel, která lze snadno uhodnout nebo zjistit pomocí [sociálního inženýrství](https://wikipedia.org/wiki/Social_engineering_(security)). Uvádění jména za svobodna vaší matky, jmen dětí nebo domácích mazlíčků nebo dat narození v hesle není bezpečné a zvyšuje riziko prolomení hesla.

#### Čeho se držet, když vytváříte heslo: {#good-password-practices}

- Vytvářejte hesla tak dlouhá, jak to umožňuje generátor hesel nebo vyplňovaný formulář
- Používejte kombinaci velkých a malých písmen, číslic a symbolů
- V hesle nepoužívejte osobní údaje, například příjmení
- Vyhněte se běžným slovům ze slovníku

[Více o vytváření silných hesel](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Používejte pro všechno jedinečná hesla {#use-unique-passwords}

Silné heslo neposkytuje takovou ochranu, pokud je heslo odhaleno při úniku dat. Webová stránka [Have I Been Pwned](https://haveibeenpwned.com) vám umožňuje zkontrolovat, zda se vaše účty podílely na narušení bezpečnosti dat uložených v jejich databázi. Pokud ano, **měli byste okamžitě změnit vaše uniklá hesla**. Používání jedinečných hesel pro každý účet snižuje riziko, že hackeři získají přístup ke všem vašim účtům, pokud je jedno z vašich hesel prozrazeno.

### Používejte správce hesel {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Správce hesel se postará o vytvoření silných a jedinečných hesel a jejich zapamatování! <strong>Vřele</strong> doporučujeme nějaký používat, většina z nich je zdarma!
  </div>
</InfoBanner>

Pamatovat si silná a jedinečná hesla pro každý účet není ideální. Správce hesel nabízí bezpečné šifrované úložiště všech vašich hesel, ke kterým máte přístup prostřednictvím jednoho silného hlavního hesla. Při registraci do nové služby také doporučují silná hesla, abyste si nemuseli vytvářet vlastní. Mnoho správců hesel vám také oznámí, zda jste byli součástí úniku dat, a umožní vám změnit hesla dříve, než dojde ke škodlivým útokům.

![Příklad použití správce hesel](./passwordManager.png)

#### Vyzkoušejte správce hesel: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Nebo se podívejte na další [doporučené správce hesel](https://www.privacytools.io/secure-password-manager)

### Používejte dvoufaktorové ověření {#two-factor-authentication}

Chcete-li prokázat, že vy jste skutečně vy, existují různé jedinečné důkazy, které lze použít k ověření. Tyto důkazy se nazývají **faktory** a jsou to tyto tři hlavní:

- Něco, co víte (jako třeba heslo nebo bezpečností otázku)
- Něco, co jste (jako třeba otisk prstu nebo sken duhovky/obličeje)
- Něco, co vlastníte (bezpečnostní klíč nebo ověřovací aplikace v telefonu)

Používání **dvoufaktorového ověřování (2FA)** poskytuje další *bezpečnostní faktor* pro vaše online účty, takže k přístupu k účtu nestačí znát pouze heslo (něco, co znáte). Druhým faktorem je nejčastěji náhodný šestimístný kód, známý jako **jednorázové heslo (TOTP)**, ke kterému získáte přístup prostřednictvím autentizační aplikace, jako je Google Authenticator nebo Authy. Fungují jako "něco, co vlastníte", protože seed, který generuje časovaný kód, je uložen ve vašem zařízení.

<InfoBanner emoji=":lock:">
  <div>
    Poznámka: Používání 2FA pomocí SMS je náchylné k 
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      odcizení SIM karty
    </a>
     and není bezpečné. Pro nejlepší ochranu používejte službu jako{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
     nebo <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Bezpečnostní klíče {#security-keys}

Ti, kteří chtějí udělat další krok v oblasti 2FA, mohou zvážit použití bezpečnostního klíče. Bezpečnostní klíče jsou fyzická hardwarová ověřovací zařízení, která fungují stejně jako ověřovací aplikace. Nejbezpečnějším způsobem 2FA je použití bezpečnostního klíče. Mnoho těchto klíčů využívá standard FIDO Universal 2nd Factor (U2F). [Zjistěte více o FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Podívejte se na další informace o 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Odinstalujte rozšíření prohlížeče {#uninstall-browser-extensions}

Rozšíření prohlížeče, jako jsou rozšíření pro Chrome nebo doplňky pro Firefox, mohou rozšířit užitečné funkce prohlížeče a zlepšit uživatelský komfort, ale jsou spojena s riziky. Ve výchozím nastavení si většina rozšíření prohlížeče vyžádá přístup ke "čtení a změně dat webu", což jim umožňuje dělat s vašimi daty téměř cokoli. Rozšíření Chrome jsou vždy automaticky aktualizována, takže dříve bezpečné rozšíření může být později aktualizováno a obsahovat škodlivý kód. Většina rozšíření prohlížeče se nesnaží ukrást vaše data, ale měli byste vědět, že to mohou udělat.

#### Zůstaňte v bezpečí tím, že: {#browser-extension-safety}

- Budete instalovat rozšíření prohlížeče pouze z důvěryhodných zdrojů
- Budete odstraňovat nepoužívaná rozšíření prohlížeče
- Budete instalovat rozšíření Chrome lokálně, abyste zastavili automatické aktualizace (Pokročilé)

[Další informace o rizicích rozšíření prohlížeče](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Krypto bezpečnost v kostce {#crypto-security}

### Rozšiřte své znalosti {#level-up-your-knowledge}

Jedním z největších důvodů, proč se lidé nechávají v kryptu podvádět, je obecně nedostatečné porozumění. Pokud například nechápete, že síť Ethereum je decentralizovaná a nikdo ji nevlastní, můžete se snadno stát obětí někoho, kdo se vydává za pracovníka zákaznického servisu a slibuje vám vrácení ztracených ETH výměnou za vaše privátní klíče. Vzdělávat se v oblasti fungování Etherea se vyplatí.

<DocLink to="/what-is-ethereum/">
  Co je to Ethereum?
</DocLink>

<DocLink to="/eth/">
  Co je Ether?
</DocLink>
<Divider />

## Zabezpečení peněženky {#wallet-security}

### Neposkytujte své privátní klíče {#protect-private-keys}

**Nikdy z žádného důvodu nesdílejte své privátní klíče!**

Privátní klíč k vaší peněžence slouží jako heslo k vaší Ethereum peněžence. Je to jediná věc, která brání tomu, aby někdo, kdo zná adresu vaší peněženky, vybral z vašeho účtu veškerá aktiva!

<DocLink to="/wallets/">
  Co je Ethereum peněženka?
</DocLink>

#### Nepořizujte si snímky obrazovky s bezpečnostními frázemi/privátními klíči {#screenshot-private-keys}

Pořízením snímky obrazovky bezpečnostních frází nebo privátních klíčů riskujete, že je synchronizujete do cloudu a potenciálně je zpřístupníte hackerům. Získání privátních klíčů z cloudu je pro hackery běžným terčem útoku.

### Používejte hardwarovou peněženku {#use-hardware-wallet}

Hardwarová peněženka poskytuje offline úložiště privátních klíčů. Je považována za nejbezpečnější variantu peněženky pro ukládání privátních klíčů: váš privátní klíč se nikdy nedotkne internetu a zůstává zcela lokálně ve vašem zařízení.

Uchovávání privátních klíčů offline výrazně snižuje riziko napadení, a to i v případě, že hacker získá kontrolu nad vaším počítačem.

#### Vyzkoušejte hardwarovou peněženku: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Dvakrát zkontrolujte transakce před odesláním {#double-check-transactions}

Častou chybou je náhodné odeslání kryptoměn na nesprávnou adresu peněženky. **Transakce odeslaná na Ethereu je nevratná.** Pokud neznáte majitele adresy a nepřesvědčíte ho, aby vám poslal vaše prostředky zpět, nebudete mít možnost je získat zpět.

Před odesláním transakce se vždy ujistěte, že adresa, na kterou odesíláte, přesně odpovídá adrese požadovaného příjemce. Při interakci s chytrým kontraktem se také doporučuje si před podpisem přečíst zprávu o transakci.

### Nastavte si u chytrých kontraktů limity převodů {#spend-limits}

Při interakci s chytrými kontrakty nepovolujte neomezené limity převodů. Neomezené převody by mohly chytrému kontraktu umožnit vyčerpat vaši peněženku. Místo toho nastavte limity převodů pouze na částku nezbytnou pro danou transakci.

Mnoho Ethereum peněženek nabízí ochranu limitů, která chrání před vybíráním peněz z účtů.

[Jak zrušit chytrý přístup k Vašim krypto fondům](/guides/how-to-revoke-token-access/)

<Divider />

## Běžné podvody {#common-scams}

Podvodníci vždy hledají způsoby, jak vás připravit o peníze. Podvodníky nelze zcela zastavit, ale můžeme jim ztížit situaci tím, že budeme znát většinu používaných technik. Těchto podvodů existuje mnoho, ale obecně se řídí stejnými základními vzorci. Když už nic jiného, nezapomeňte:

- být vždy skeptičtí
- že vám nikdo nedá ETH zdarma ani se slevou
- že nikdo nepotřebuje přístup k vašim privátním klíčům nebo osobním údajům

### Rozdávací podvod {#giveaway}

Jedním z nejčastějších podvodů v oblasti kryptoměn je tzv. rozdávací podvod. Rozdávací podvod může mít mnoho podob, ale obecně funguje tak, že pokud pošlete ETH na uvedenou adresu peněženky, dostanete své ETH zpět, ale navíc zdvojnásobené. *Z tohoto důvodu je také známý jako podvod 2 za 1.*

Tyto podvody obvykle stanovují omezenou dobu pro zúčastnění v rozdávání, aby podpořily špatné rozhodování a vyvolaly falešný pocit naléhavosti.

#### Podvody na sociálních médiích {#social-media-hacks}

K významnému případu došlo v červenci 2020, kdy byly nabourány účty významných osobností a organizací na Twitteru. Hacker zároveň na nabouraných účtech zveřejnil nabídku na rozdávání bitcoinů. Přestože byly klamavé tweety rychle zaznamenány a smazány, hackerům se přesto podařilo uniknout s 11 bitcoiny (v září 2021 to bylo 500 000 dolarů).

![Podvod na Twitteru](./appleTwitterScam.png)

#### Rozdávání dárků od celebrit {#celebrity-giveaway}

Další častou formou podvodu je rozdávání dárků od celebrit. Podvodníci vezmou nahraný videorozhovor nebo konferenční přednášku celebrity a živě ji přenášejí na YouTube, aby to vypadalo, že celebrita poskytla živý videorozhovor a podpořila rozdávání kryptoměn.

Nejčastěji je v tomto podvodu využíván Vitalik Buterin, ale i mnoho dalších významných osobností působících v oblasti kryptoměn (např. Elon Musk nebo Charles Hoskinson). Zahrnutí známé osoby dává podvodníkům pocit legitimity (vypadá to pochybně, ale Vitalik je zapojen, takže to musí být v pořádku!).

**Rozdávání jsou vždycky podvody. Pokud na tyto účty pošlete své prostředky, navždy o ně přijdete.**

![Podvod na YouTube](./youtubeScam.png)

### Podvody s podporou {#support-scams}

Kryptoměny jsou relativně mladou a nepochopenou technologií. Častým podvodem, který toho využívá, je podvod s podporou, kdy se podvodníci vydávají za pracovníky podpory populárních peněženek, burz nebo blockchainů.

Velká část diskuzí o Ethereu se odehrává na Discordu. Podvodníci obvykle najdou svůj cíl tak, že vyhledají dotazy na podporu ve veřejných discordových kanálech a poté tazateli pošlou soukromou zprávu s nabídkou podpory. Vybudováním důvěry se vás podvodníci snaží přimět k tomu, abyste jim prozradili své privátní klíče nebo poslali své finanční prostředky do jejich peněženek.

![Podvod s podporou na Discordu](./discordScam.png)

Obecně platí, že zaměstnanci s vámi nikdy nebudou komunikovat soukromými, neoficiálními kanály. Při žádosti o podporu je třeba mít na paměti pár jednoduchých věcí:

- Nikdy nesdílejte své privátní klíče, bezpečnostní fráze ani hesla
- Nikdy nikomu neumožňujte vzdálený přístup k vašemu počítači
- Nikdy nekomunikujte mimo kanály určené organizací

<InfoBanner emoji=":lock:">
  <div>
    Pozor: ačkoli k podvodům s podporou běžně dochází na Discordu, mohou se vyskytovat i v jiných chatovacích aplikacích, kde se diskutuje o kryptoměnách, včetně e-mailu.
  </div>
</InfoBanner>

### Podvod s 'Eth2' tokenem {#eth2-token-scam}

Před [Sloučením](/roadmap/merge/) využili podvodníci zmatku kolem termínu "Eth2" a snažili se přimět uživatele, aby vyměnili své ETH za token "ETH2". Žádný "ETH2" neexistuje a žádný jiný legitimní token nebyl se Sloučením zaveden. ETH, které jste vlastnili před Sloučením, jsou stále stejné ETH. Pro přechod z důkazu prací na důkaz podílem **není třeba provádět žádnou akci týkající se vašeho ETH**.

Podvodníci se mohou vydávat za "podporu" a tvrdit vám, že pokud jim dáte vaše ETH, dostanete zpět "ETH2". Neexistuje žádná [oficiální podpora Etherea](/community/support/) ani žádný nový token. Nikdy nikomu nesdělujte bezpečnostní frázi vaší peněženky.

_Poznámka: Existují odvozené tokeny/tickery, které mohou představovat podílové ETH (tj. rETH od Rocket Pool, stETH od Lido, ETH2 od Coinbase), ale není třeba na ně "migrovat."_

### Phishingové podvody {#phishing-scams}

Dalším stále častějším úhlem pohledu, který podvodníci využívají k pokusu o krádež peněz z vaší peněženky, jsou phishingové podvody.

Některé phishingové e-maily vyzývají uživatele, aby klikli na odkazy, které je přesměrují na falešné webové stránky a požádají je o zadání jejich bezpečnostní fráze, obnovení hesla nebo odeslání ETH. Jiné vás mohou požádat, abyste nevědomky nainstalovali malware, který infikuje váš počítač a umožní podvodníkům přístup k souborům vašeho počítače.

Pokud obdržíte e-mail od neznámého odesílatele, nezapomeňte:

- Nikdy neotvírejte odkazy nebo přílohy z e-mailových adres, které neznáte
- Nikdy nikomu neprozrazujte své osobní údaje ani hesla
- Mažte e-maily od neznámých odesílatelů

[Další informace o tom, jak se vyhnout phishingovým podvodům](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Podvody s kryptomakléři {#broker-scams}

Podvodní kryptomakléři tvrdí, že jsou specializovaní makléři s kryptoměnami, kteří vám nabídnou, že převezmou vaše peníze a investují je za vás. Tuto nabídku obvykle doprovázejí sliby nereálných výnosů. Poté, co podvodník obdrží vaše finanční prostředky, vás může vést dál a požádat vás o zaslání dalších prostředků, abyste nepřišli o další investiční zisky, nebo může úplně zmizet.

Tito podvodní makléři vyhledávají své cíle využíváním falešných účtů na YouTube a začínáním zdánlivě přirozené konverzace o makléři. Tyto konverzace jsou často vysoce hodnocené, aby se zvýšila jejich legitimita, ale všechna hodnocení pocházejí od robotů.

**Neumožňujte cizím lidem na internetu, aby za vás investovali. Přijdete o své krypto.**

![Podvodný kryptomakléř na YouTube](./brokerScam.png)

### Podvody s kryptotěžebními pooly {#mining-pool-scams}

Od září 2022 již těžba na Ethereu není možná. Podvody s těžebními pooly však stále existují. Podvody s těžebními pooly spočívají v tom, že vás nevyžádaně kontaktují lidé, kteří tvrdí, že vstupem do těžebního Ethereum poolu můžete dosáhnout vysokých zisků. Podvodník bude vznášet nároky a zůstane s vámi v kontaktu tak dlouho, jak bude potřeba. Podvodník se vás v podstatě bude snažit přesvědčit, že když se připojíte k těžebnímu Ethereum poolu, tak budou vaše kryptoměny použity k vytvoření ETH a že vám budou vyplaceny dividendy ve formě ETH. Nakonec zjistíte, že vaše kryptoměny přináší malé výnosy. Je to jen návnada, abyste investovali více. Nakonec budou všechny vaše finanční prostředky odeslány na neznámou adresu a podvodník buď zmizí, nebo v některých případech zůstane v kontaktu, jak se stalo v jednom z nedávných případů.

Sečteno a podtrženo, buďte obezřetní vůči lidem, kteří vás kontaktují na sociálních sítích a žádají vás o účast v těžebním poolu. Jakmile o kryptoměny přijdete, jsou fuč.

Několik věcí k zapamatování:

- Dávejte si pozor, aby vás někdo nekontaktoval ohledně způsobů, jak vydělat peníze na vašich kryptoměnách
- Udělejte si průzkum o stakování, likvidních poolech nebo jiných způsobech investování vašeho krypta
- Málokdy, pokud vůbec, jsou takové systémy legitimní. Pokud by tomu tak bylo, pravděpodobně by se staly mainstreamem a vy byste o nich určitě slyšeli.

[Muž přišel o 200 tisíc dolarů při podvodu s těžebním poolem](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdropové podvody {#airdrop-scams}

Airdropové podvody spočívají v tom, že podvodný projekt vám do peněženky airdropne aktivum (NFT, token) a pošle vás na podvodnou webovou stránku, kde si ho můžete vyzvednout. Při pokusu o vyzvednutí budete vyzváni, abyste se přihlásili pomocí vaší Ethereum peněženky a "schválili" transakci. Tato transakce kompromituje váš účet tím, že podvodníkovi odešle vaše veřejné a privátní klíče. Alternativní forma tohoto podvodu může spočívat v potvrzení transakce, která odešle finanční prostředky na účet podvodníka.

[Více o airdropových podvodech](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Další informace {#further-reading}

### Bezpečnost na internetu {#reading-web-security}

- [Až 3 miliony zařízení infikovaných doplňky pro Chrome a Edge](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Jak vytvořit silné heslo — které nezapomenete](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Co je to bezpečnostní klíč?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Krypto bezpečnost {#reading-crypto-security}

- [Jak ochránit sebe a své prostředky](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Bezpečnostní problémy v běžném kryptokomunikačním softwaru](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Bezpečnostní návod pro ťuňti, ale i pro chytré](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Krypto bezpečnost: Hesla a Ověřování](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Výuka o podvodech {#reading-scam-education}

- [Návod: Jak rozpoznat podvodné tokeny](/guides/how-to-id-scam-tokens/)
- [Jak zůstat v bezpečí: Časté podvody](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Předcházení podvodům](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Vlákno na Twitteru o běžných kryptophishingových e-mailech a zprávách](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
