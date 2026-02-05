---
title: Bezpečnost a předcházení podvodům v Ethereu
description: Jak zůstat v bezpečí na Ethereu
lang: cs
---

# Bezpečnost a předcházení podvodům v Ethereu {#introduction}

Rostoucí zájem o kryptoměny s sebou přináší rostoucí riziko ze strany podvodníků a hackerů. Tento článek uvádí některé osvědčené postupy ke zmírnění těchto rizik.

**Pamatujte: Nikdo z ethereum.org vás nikdy nebude kontaktovat. Neodpovídejte na e-maily, které tvrdí, že jsou od oficiální podpory Etherea.**

<Divider />

## Krypto bezpečnost 101 {#crypto-security}

### Prohlubte si své znalosti {#level-up-your-knowledge}

Nedorozumění ohledně toho, jak kryptoměny fungují, mohou vést k nákladným chybám. Např. pokud se někdo vydává za pracovníka zákaznického servisu, který vám může vrátit ztracené ETH výměnou za vaše privátní klíče, využívá toho, že lidé nerozumí tomu, že Ethereum je decentralizovaná síť, která takovou funkčnost nemá. Vzdělávat se v oblasti fungování Etherea se vyplatí.

<DocLink href="/what-is-ethereum/">
  Co je to Ethereum?
</DocLink>

<DocLink href="/eth/">
  Co je to ether?
</DocLink>
<Divider />

## Bezpečnost peněženek {#wallet-security}

### Nikomu nesdělujte své soukromé klíče {#protect-private-keys}

**Nikdy, za žádných okolností, nesdílejte své privátní klíče!**

Privátní klíč k vaší peněžence slouží jako heslo k vaší peněžence Ethereum. Je to jediná věc, která brání tomu, aby někdo, kdo zná adresu vaší peněženky, vybral z vašeho účtu veškerá aktiva!

<DocLink href="/wallets/">
  Co je Ethereum peněženka?
</DocLink>

#### Nepořizujte si snímky obrazovky s vašimi seed frázemi / soukromými klíči {#screenshot-private-keys}

Pořízení snímku obrazovky s vašimi bezpečnostními frázemi nebo privátními klíči je může synchronizovat s poskytovatelem cloudových služeb, což by je mohlo zpřístupnit hackerům. Získání privátních klíčů z cloudu je běžným způsobem útoku hackerů.

### Používejte hardwarovou peněženku {#use-hardware-wallet}

Hardwarová peněženka poskytuje offline úložiště privátních klíčů. Je považována za nejbezpečnější variantu peněženky pro ukládání privátních klíčů: váš privátní klíč se nikdy nedotkne internetu a zůstává zcela lokálně ve vašem zařízení.

Uchovávání privátních klíčů offline výrazně snižuje riziko napadení, a to i v případě, že hacker získá kontrolu nad vaším počítačem.

#### Vyzkoušejte hardwarovou peněženku: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Dvakrát si zkontrolujte transakce před jejich odesláním {#double-check-transactions}

Častou chybou je náhodné odeslání kryptoměn na nesprávnou adresu peněženky. **Transakce odeslaná na Ethereu je nevratná.** Pokud neznáte vlastníka adresy a nepřesvědčíte ho, aby vám prostředky vrátil, nebudete schopni je získat zpět.

Před odesláním transakce se vždy ujistěte, že adresa, na kterou odesíláte, přesně odpovídá adrese požadovaného příjemce.
Při interakci s chytrým kontraktem je nejlepší si před podpisem přečíst zprávu o transakci.

### Nastavte limity útrat u chytrých kontraktů {#spend-limits}

Při interakci s chytrými kontrakty nepovolujte neomezené limity převodů. Neomezené převody by mohly chytrému kontraktu umožnit vyčerpat vaši peněženku. Místo toho nastavte limity převodů pouze na částku nezbytnou pro danou transakci.

Mnoho Ethereum peněženek nabízí ochranu limitů, která chrání před vybíráním peněz z účtů.

[Jak zrušit přístup chytrého kontraktu k vašim krypto prostředkům](/guides/how-to-revoke-token-access/)

<Divider />

## Běžné podvody {#common-scams}

Podvodníky nelze zcela zastavit, ale můžeme jim ztížit situaci tím, že budeme znát většinu používaných technik. Těchto podvodů existuje mnoho, ale obecně se řídí stejnými základními vzorci. Když už nic jiného, nezapomeňte:

- být vždy skeptičtí
- že vám nikdo nedá ETH zdarma ani se slevou
- že nikdo nepotřebuje přístup k vašim privátním klíčům nebo osobním údajům

### Phishing v reklamách na Twitteru {#ad-phishing}

![Phishingový odkaz na Twitteru](./twitterPhishingScam.png)

Existuje způsob, jak podvrhnout funkci náhledu (rozbalení) odkazu na Twitteru (také známém jako X) za účelem oklamání uživatele. Cílem je vyvolat v uživatelích dojem, že navštěvují legitimní web. Tato technika využívá mechanismus Twitteru pro generování náhledů adres URL sdílených v tweetech a zobrazuje například _z ethereum.org_ (viz výše), i když ve skutečnosti dochází k přesměrování na škodlivé stránky.

Vždy se ujistěte, že jste na správné doméně, obzvláště poté, co kliknete na odkaz.

[Více informací zde](https://harrydenley.com/faking-twitter-unfurling).

### Podvody s rozdáváním cen {#giveaway}

Jedním z nejčastějších podvodů v oblasti kryptoměn je tzv. rozdávací podvod. Rozdávací podvod může mít mnoho podob, ale obecně funguje tak, že pokud pošlete ETH na uvedenou adresu peněženky, dostanete své ETH zpět, ale navíc zdvojnásobené._Z tohoto důvodu je také známý jako podvod 2 za 1._

Tyto podvody obvykle stanovují omezený čas pro možnost nároku na výhru, aby vytvořily falešný pocit naléhavosti.

### Hacknutí účtů na sociálních sítích {#social-media-hacks}

K významnému případu došlo v červenci 2020, kdy byly nabourány účty významných osobností a organizací na Twitteru. Hacker zároveň na nabouraných účtech zveřejnil nabídku na rozdávání bitcoinů. Přestože byly klamavé tweety rychle zaznamenány a smazány, hackerům se přesto podařilo uniknout s 11 bitcoiny (v září 2021 to bylo 500 000 dolarů).

![Podvod na Twitteru](./appleTwitterScam.png)

### Rozdávání cen celebritami {#celebrity-giveaway}

Další častou formou podvodu je rozdávání dárků od celebrit. Podvodníci vezmou nahraný videorozhovor nebo konferenční přednášku celebrity a živě ji přenášejí na YouTube, aby to vypadalo, že celebrita poskytla živý videorozhovor a podpořila rozdávání kryptoměn.

Nejčastěji je v tomto podvodu využíván Vitalik Buterin, ale i mnoho dalších významných osobností působících v oblasti kryptoměn (např. Elon Musk nebo Charles Hoskinson). Zahrnutí známé osoby dává podvodníkům pocit legitimity (vypadá to pochybně, ale Vitalik je zapojen, takže to musí být v pořádku!).

**Rozdávání jsou vždycky podvody. Pokud na tyto účty pošlete své prostředky, navždy o ně přijdete.**

![Podvod na YouTube](./youtubeScam.png)

### Podvody s falešnou podporou {#support-scams}

Kryptoměny jsou relativně mladou a nepochopenou technologií. Častým podvodem, který toho využívá, je podvod s podporou, kdy se podvodníci vydávají za pracovníky podpory populárních peněženek, burz nebo blockchainů.

Velká část diskuzí o Ethereu se odehrává na Discordu. Podvodníci obvykle najdou svůj cíl tak, že vyhledají dotazy na podporu ve veřejných discordových kanálech a poté tazateli pošlou soukromou zprávu s nabídkou podpory. Vybudováním důvěry se vás podvodníci snaží přimět k tomu, abyste jim prozradili své privátní klíče nebo poslali své finanční prostředky do jejich peněženek.

![Podvod s falešnou podporou na Discordu](./discordScam.png)

Obecně platí, že zaměstnanci s vámi nikdy nebudou komunikovat soukromými, neoficiálními kanály. Při žádosti o podporu je třeba mít na paměti pár jednoduchých věcí:

- Nikdy nesdílejte své privátní klíče, bezpečnostní fráze ani hesla
- Nikdy nikomu neumožňujte vzdálený přístup k vašemu počítači
- Nikdy nekomunikujte mimo kanály určené organizací

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Pozor: Ačkoli se podvody s falešnou podporou běžně objevují na Discordu, mohou se vyskytovat i v jakékoli chatovací aplikaci, kde se diskutuje o kryptoměnách, a to včetně e-mailu.
</AlertDescription>
</AlertContent>
</Alert>

### Podvod s tokenem „Eth2“ {#eth2-token-scam}

Před [Sloučením](/roadmap/merge/) podvodníci zneužili zmatku kolem pojmu „Eth2“ a snažili se přimět uživatele, aby si vyměnili své ETH za token „ETH2“. Žádný "ETH2" neexistuje a žádný jiný legitimní token nebyl se Sloučením zaveden. ETH, které jste vlastnili před Sloučením, jsou stále stejné ETH. Kvůli přechodu z důkazu prací na důkaz podílem **není třeba s vašimi ETH provádět žádné akce**.

Podvodníci se mohou vydávat za "podporu" a tvrdit vám, že pokud jim dáte vaše ETH, dostanete zpět "ETH2". Neexistuje žádná [oficiální podpora Etherea](/community/support/) a neexistuje ani žádný nový token. Nikdy nikomu nesdělujte bezpečnostní frázi vaší peněženky.

_Poznámka: Existují odvozené tokeny/tickery, které mohou představovat stakované ETH (tj. rETH od Rocket Pool, stETH od Lido, ETH2 od Coinbase), ale není to nic, na co byste museli "migrovat"._

### Phishingové podvody {#phishing-scams}

Dalším stále častějším úhlem pohledu, který podvodníci využívají k pokusu o krádež peněz z vaší peněženky, jsou phishingové podvody.

Některé phishingové e-maily vyzývají uživatele, aby klikli na odkazy, které je přesměrují na falešné webové stránky a požádají je o zadání jejich bezpečnostní fráze, obnovení hesla nebo odeslání ETH. Jiné vás mohou požádat, abyste nevědomky nainstalovali malware, který infikuje váš počítač a umožní podvodníkům přístup k souborům vašeho počítače.

Pokud obdržíte e-mail od neznámého odesílatele, nezapomeňte:

- Nikdy neotvírejte odkazy nebo přílohy z e-mailových adres, které neznáte
- Nikdy nikomu neprozrazujte své osobní údaje ani hesla
- Mažte e-maily od neznámých odesílatelů

[Více o tom, jak se vyhnout phishingovým podvodům](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Podvody s krypto brokery {#broker-scams}

Podvodní kryptomakléři tvrdí, že jsou specializovaní makléři s kryptoměnami, kteří vám nabídnou, že převezmou kontrolu nad vašimi penězi a investují je za vás. Poté, co podvodník obdrží vaše finanční prostředky, vás může vést dál a požádat vás o zaslání dalších prostředků, abyste nepřišli o další investiční zisky, nebo může úplně zmizet.

Tito podvodní makléři vyhledávají své cíle využíváním falešných účtů na YouTube a tím, že začínají zdánlivě přirozené konverzace o "makléři". Tyto konverzace jsou často vysoce hodnocené, aby se zvýšila jejich legitimita, ale všechna hodnocení pocházejí od robotů.

**Neumožňujte cizím lidem na internetu, aby za vás investovali. Přijdete o své krypto.**

![Podvod s brokerem pro obchodování na YouTube](./brokerScam.png)

### Podvody s pooly pro těžbu kryptoměn {#mining-pool-scams}

Od září 2022 již těžba na Ethereu není možná. Podvody s těžebními pooly však stále existují. Podvody s těžebními pooly spočívají v tom, že vás nevyžádaně kontaktují lidé, kteří tvrdí, že vstupem do těžebního Ethereum poolu můžete dosáhnout vysokých zisků. Podvodník bude vznášet nároky a zůstane s vámi v kontaktu tak dlouho, jak bude potřeba. Podvodník se vás v podstatě bude snažit přesvědčit, že když se připojíte k těžebnímu poolu na Ethereu, budou vaše kryptoměny použity k vytvoření ETH a budou vám vyplaceny dividendy ve formě ETH. Poté uvidíte, že vaše kryptoměna přináší malé výnosy. Je to jen návnada, abyste investovali více. Nakonec budou všechny vaše finanční prostředky odeslány na neznámou adresu a podvodník buď zmizí, nebo v některých případech zůstane v kontaktu, jak se stalo v jednom z nedávných případů.

Sečteno a podtrženo, buďte obezřetní vůči lidem, kteří vás kontaktují na sociálních sítích a žádají vás o účast v těžebním poolu. Jakmile o kryptoměny přijdete, jsou fuč.

Několik věcí k zapamatování:

- Dávejte si pozor, aby vás někdo nekontaktoval ohledně způsobů, jak vydělat peníze na vašich kryptoměnách
- Udělejte si průzkum o stakování, likvidních poolech nebo jiných způsobech investování vašeho krypta
- Málokdy, pokud vůbec, jsou takové systémy legitimní. Pokud by tomu tak bylo, pravděpodobně by se staly mainstreamem a vy byste o nich určitě slyšeli.

[Muž přišel o 200 tisíc dolarů při podvodu s těžebním poolem](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Podvody s airdropy {#airdrop-scams}

Airdropové podvody spočívají v tom, že podvodný projekt vám do peněženky airdropne aktivum (NFT, token) a pošle vás na podvodnou webovou stránku, kde si ho můžete vyzvednout. Při pokusu o vyzvednutí budete vyzváni, abyste se přihlásili pomocí vaší Ethereum peněženky a "schválili" transakci. Tato transakce kompromituje váš účet tím, že podvodníkovi odešle vaše veřejné a privátní klíče. Alternativní forma tohoto podvodu může spočívat v potvrzení transakce, která odešle finanční prostředky na účet podvodníka.

[Více o podvodech s airdropy](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Bezpečnost na webu 101 {#web-security}

### Používejte silná hesla {#use-strong-passwords}

[Více než 80 % prolomení účtů je důsledkem slabých nebo odcizených hesel](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Pro zabezpečení účtů je nejlepší dlouhá kombinace znaků, čísel a symbolů.

Běžnou chybou je použití kombinace několika běžných, souvisejících slov. Taková hesla nejsou bezpečná, protože jsou náchylná k jednoduché hackerské technice zvané slovníkový útok.

```md
Příklad slabého hesla: CuteFluffyKittens!

Příklad silného hesla: ymv\*azu.EAC8eyp8umf
```

Další častou chybou je používání hesel, která lze snadno uhodnout nebo zjistit pomocí [sociálního inženýrství](https://wikipedia.org/wiki/Social_engineering_\(security\)). Použití jména vaší matky za svobodna, jmen dětí nebo domácích mazlíčků nebo dat narození v hesle není bezpečné a zvyšuje riziko prolomení hesla.

#### Osvědčené postupy pro práci s hesly: {#good-password-practices}

- Vytvářejte hesla tak dlouhá, jak to umožňuje generátor hesel nebo vyplňovaný formulář
- Používejte kombinaci velkých a malých písmen, číslic a symbolů
- V hesle nepoužívejte osobní údaje, například příjmení
- Vyhněte se běžným výrazům

[Více o vytváření silných hesel](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Pro vše používejte jedinečná hesla {#use-unique-passwords}

Silné heslo, které bylo odhaleno při úniku dat, již není silným heslem. Webová stránka [Have I Been Pwned](https://haveibeenpwned.com) vám umožňuje zkontrolovat, zda se vaše účty neobjevily v nějakém veřejném úniku dat. Pokud ano, **okamžitě tato hesla změňte**. Používání jedinečných hesel pro každý účet snižuje riziko, že se hackeři dostanou ke všem vašim účtům, pokud jedno z vašich hesel bude kompromitováno.

### Používejte správce hesel {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Správce hesel se postará o vytvoření silných a jedinečných hesel a o jejich zapamatování! <strong>Důrazně</strong> doporučujeme nějaký používat a většina z nich je zdarma!
</AlertDescription>
</AlertContent>
</Alert>

Pamatovat si silná a jedinečná hesla pro každý účet není ideální. Správce hesel nabízí bezpečné šifrované úložiště všech vašich hesel, ke kterým máte přístup prostřednictvím jednoho silného hlavního hesla. Při registraci do nové služby také doporučují silná hesla, abyste si nemuseli vytvářet vlastní. Mnoho správců hesel vám také oznámí, zda jste byli součástí úniku dat, a umožní vám změnit hesla dříve, než dojde ke škodlivým útokům.

![Příklad použití správce hesel](./passwordManager.png)

#### Vyzkoušejte správce hesel: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Nebo se podívejte na další [doporučené správce hesel](https://www.privacytools.io/secure-password-manager)

### Používejte dvoufaktorové ověřování {#two-factor-authentication}

Někdy můžete být požádáni o ověření své identity prostřednictvím jedinečných důkazů. Jsou známé jako **faktory**. Tři hlavní faktory jsou:

- Něco, co víte (jako třeba heslo nebo bezpečností otázku)
- Něco, co jste (jako třeba otisk prstu nebo sken duhovky/obličeje)
- Něco, co vlastníte (bezpečnostní klíč nebo ověřovací aplikace v telefonu)

Používání **dvoufaktorového ověřování (2FA)** poskytuje další _bezpečnostní faktor_ pro vaše online účty. 2FA zajišťuje, že pouze mít vaše heslo nestačí k přístupu k účtu. Nejčastěji je druhým faktorem náhodný šestimístný kód, známý jako **časově omezené jednorázové heslo (TOTP)**, ke kterému máte přístup prostřednictvím ověřovací aplikace, jako je Google Authenticator nebo Authy. Fungují jako "něco, co vlastníte", protože seed, který generuje časovaný kód, je uložen ve vašem zařízení.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Poznámka: Používání 2FA pomocí SMS je náchylné k <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">odcizení SIM karty</a> a není bezpečné. Pro nejlepší zabezpečení používejte službu, jako je <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> nebo <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Bezpečnostní klíče {#security-keys}

Bezpečnostní klíč je pokročilejší a bezpečnější typ dvoufaktorového ověřování (2FA). Bezpečnostní klíče jsou fyzická hardwarová ověřovací zařízení, která fungují podobně jako ověřovací aplikace. Nejbezpečnějším způsobem 2FA je použití bezpečnostního klíče. Mnoho těchto klíčů využívá standard FIDO Universal 2nd Factor (U2F). [Zjistěte více o FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Podívejte se na další informace o 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Odinstalujte rozšíření prohlížeče {#uninstall-browser-extensions}

Rozšíření pro prohlížeče, jako jsou rozšíření pro Chrome nebo doplňky pro Firefox, mohou zlepšit funkčnost prohlížeče, ale také přinášejí určitá rizika. Ve výchozím nastavení si většina rozšíření prohlížeče vyžádá přístup ke "čtení a změně dat webu", což jim umožňuje dělat s vašimi daty téměř cokoli. Rozšíření Chrome jsou vždy automaticky aktualizována, takže dříve bezpečné rozšíření může být později aktualizováno a obsahovat škodlivý kód. Většina rozšíření prohlížeče se nesnaží ukrást vaše data, ale měli byste vědět, že to mohou udělat.

#### Zůstaňte v bezpečí: {#browser-extension-safety}

- Budete instalovat rozšíření prohlížeče pouze z důvěryhodných zdrojů
- Budete odstraňovat nepoužívaná rozšíření prohlížeče
- Budete instalovat rozšíření Chrome lokálně, abyste zastavili automatické aktualizace (Pokročilé)

[Více o rizicích rozšíření prohlížeče](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Další čtení {#further-reading}

### Bezpečnost na webu {#reading-web-security}

- [Až 3 miliony zařízení infikovaných doplňky pro Chrome a Edge obsahujícími malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) – _Dan Goodin_
- [Jak vytvořit silné heslo — které nezapomenete](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) – _AVG_
- [Co je to bezpečnostní klíč?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) – _Coinbase_

### Krypto bezpečnost {#reading-crypto-security}

- [Ochrana sebe a svých prostředků](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) – _MyCrypto_
- [Bezpečnostní problémy v běžném komunikačním softwaru pro kryptoměny](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) – _Salus_
- [Bezpečnostní příručka pro hlupáky i chytré lidi](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) – _MyCrypto_
- [Krypto bezpečnost: Hesla a ověřování](https://www.youtube.com/watch?v=m8jlnZuV1i4) – _Andreas M. Antonopoulos_

### Vzdělávání o podvodech {#reading-scam-education}

- [Průvodce: Jak rozpoznat podvodné tokeny](/guides/how-to-id-scam-tokens/)
- [Jak zůstat v bezpečí: Běžné podvody](https://support.mycrypto.com/staying-safe/common-scams) – _MyCrypto_
- [Jak se vyhnout podvodům](https://bitcoin.org/en/scams) – _Bitcoin.org_
- [Vlákno na Twitteru o běžných phishingových e-mailech a zprávách v oblasti kryptoměn](https://twitter.com/tayvano_/status/1516225457640787969) – _Taylor Monahan_

<QuizWidget quizKey="security" />
