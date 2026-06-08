---
title: Bezpečnost Etherea a prevence podvodů
description: Jak zůstat v bezpečí na Ethereu
lang: cs
---

Rostoucí zájem o kryptoměny s sebou přináší i rostoucí riziko ze strany podvodníků a hackerů. Tento článek popisuje některé osvědčené postupy, jak tato rizika zmírnit.

**Pamatujte: Nikdo z ethereum.org vás nikdy nebude kontaktovat. Neodpovídejte na e-maily, které tvrdí, že jsou od oficiální podpory Etherea.**

<Divider />

## Základy krypto bezpečnosti {#crypto-security}

### Zlepšete své znalosti {#level-up-your-knowledge}

Nedorozumění ohledně toho, jak krypto funguje, mohou vést k nákladným chybám. Pokud se například někdo vydává za agenta zákaznické podpory, který vám může vrátit ztracené ETH výměnou za vaše soukromé klíče, zneužívá toho, že lidé nechápou, že [Ethereum](/) je decentralizovaná síť, která tento druh funkcionality postrádá. Vzdělávat se v tom, jak Ethereum funguje, je investice, která se vyplatí.

<DocLink href="/what-is-ethereum/">
  Co je Ethereum?
</DocLink>

<DocLink href="/what-is-ether/">
  Co je ether?
</DocLink>
<Divider />

## Bezpečnost peněženky {#wallet-security}

### Nikdy nesdílejte svou obnovovací frázi {#protect-private-keys}

**Nikdy, z žádného důvodu, nesdílejte svou obnovovací frázi ani soukromé klíče!**

Vaše obnovovací fráze (také nazývaná tajná obnovovací fráze nebo seed fráze) je hlavním klíčem k vaší peněžence. Kdokoli ji má, může získat přístup ke všem vašim účtům a vysát veškerá aktiva. Soukromé klíče fungují stejným způsobem pro jednotlivé účty. Žádná legitimní služba, agent podpory ani webová stránka vás o ně nikdy nepožádá.

<DocLink href="/wallets/">
  Co je to Ethereum peněženka?
</DocLink>

#### Nedělejte snímky obrazovky svých seed frází / soukromých klíčů {#screenshot-private-keys}

Pořízení snímku obrazovky vašich seed frází nebo soukromých klíčů je může synchronizovat s poskytovatelem cloudových dat, což by je mohlo zpřístupnit hackerům. Získávání soukromých klíčů z cloudu je pro hackery běžným vektorem útoku.

### Používejte hardwarovou peněženku {#use-hardware-wallet}

Hardwarová peněženka poskytuje offline úložiště pro soukromé klíče. Považují se za nejbezpečnější možnost peněženky pro uložení vašich soukromých klíčů: váš soukromý klíč se nikdy nedotkne internetu a zůstává zcela lokálně na vašem zařízení.

Udržování soukromých klíčů offline masivně snižuje riziko hacknutí, a to i v případě, že hacker získá kontrolu nad vaším počítačem.

#### Vyzkoušejte hardwarovou peněženku: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Před odesláním transakce dvakrát zkontrolujte {#double-check-transactions}

Náhodné odeslání krypta na špatnou adresu peněženky je běžnou chybou. **Transakce odeslaná na Ethereu je nevratná.** Pokud neznáte vlastníka adresy a nedokážete ho přesvědčit, aby vám prostředky poslal zpět, nebudete moci své prostředky získat zpět.

Před odesláním transakce se vždy ujistěte, že adresa, na kterou odesíláte, přesně odpovídá adrese požadovaného příjemce.
Při interakci s chytrým kontraktem je dobrým zvykem si před podepisováním přečíst zprávu transakce.

### Nastavte limity útraty pro chytré kontrakty {#spend-limits}

Při interakci s chytrými kontrakty nepovolujte neomezené limity útraty. Neomezená útrata by mohla chytrému kontraktu umožnit vysát vaši peněženku. Místo toho nastavte limity útraty pouze na částku nezbytnou pro transakci.

Mnoho Ethereum peněženek nabízí ochranu pomocí limitů, která chrání před vysátím účtů.

[Jak zrušit přístup chytrého kontraktu k vašim krypto prostředkům](/guides/how-to-revoke-token-access/)

<Divider />

## Běžné podvody {#common-scams}

Je nemožné podvodníky zcela zastavit, ale můžeme snížit jejich efektivitu tím, že budeme znát jejich nejpoužívanější techniky. Existuje mnoho variant těchto podvodů, ale obecně se řídí stejnými základními vzorci. Pokud si nezapamatujete nic jiného, pamatujte si toto:

- buďte vždy skeptičtí
- nikdo vám nedá ETH zdarma nebo se slevou
- nikdo nepotřebuje přístup k vašim soukromým klíčům nebo osobním údajům

### Phishing prostřednictvím reklam na Twitteru {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Existuje metoda pro falšování funkce náhledu odkazů na Twitteru (známém také jako X), která může uživatele oklamat, aby si mysleli, že navštěvují legitimní webovou stránku. Tato technika zneužívá mechanismus Twitteru pro generování náhledů URL adres sdílených v tweetech a zobrazuje například _from ethereum.org_ (jak je ukázáno výše), i když jsou ve skutečnosti přesměrováni na škodlivou stránku.

Vždy zkontrolujte, zda jste na správné doméně, zejména po kliknutí na odkaz.

[Více informací naleznete zde](https://harrydenley.com/faking-twitter-unfurling).

### Podvodné rozdávání (Giveaway scam) {#giveaway}

Jedním z nejčastějších podvodů v oblasti kryptoměn je podvodné rozdávání (giveaway scam). Tento podvod může mít mnoho podob, ale základní myšlenkou je, že pokud pošlete ETH na uvedenou adresu peněženky, dostanete své ETH zpět, ale zdvojnásobené. *Z tohoto důvodu je také známý jako podvod 2 za 1.*

Tyto podvody obvykle stanovují omezenou dobu, po kterou si lze nárokovat odměnu, aby vytvořily falešný pocit naléhavosti.

### Hacknutí sociálních sítí {#social-media-hacks}

Velmi známá verze tohoto podvodu se odehrála v červenci 2020, kdy byly hacknuty účty na Twitteru patřící prominentním celebritám a organizacím. Hacker na hacknutých účtech současně zveřejnil rozdávání Bitcoinů. Ačkoli si klamavých tweetů lidé rychle všimli a byly smazány, hackerům se i tak podařilo uniknout s 11 bitcoiny (což v září 2021 představovalo 500 000 dolarů).

![A scam on Twitter](./appleTwitterScam.png)

### Rozdávání celebritami {#celebrity-giveaway}

Rozdávání celebritami je další běžnou formou podvodného rozdávání. Podvodníci vezmou nahraný videorozhovor nebo přednášku z konference, kterou vedla celebrita, a živě ji vysílají na YouTube – čímž to vypadá, jako by celebrita poskytovala živý videorozhovor, ve kterém podporuje rozdávání kryptoměn.

Vitalik Buterin je v tomto podvodu využíván nejčastěji, ale zneužíváno je i mnoho dalších prominentních osobností zapojených do krypta (např. Elon Musk nebo Charles Hoskinson). Zahrnutí známé osoby dodává živému vysílání podvodníků pocit legitimity (vypadá to podezřele, ale je v tom zapojen Vitalik, takže to musí být v pořádku!).

**Rozdávání (giveaways) jsou vždy podvody. Pokud pošlete své prostředky na tyto účty, navždy o ně přijdete.**

![A scam on YouTube](./youtubeScam.png)

### Podvody s falešnou podporou {#support-scams}

Kryptoměny jsou relativně mladou a nepochopenou technologií. Běžným podvodem, který toho využívá, je podvod s falešnou podporou, kdy se podvodníci vydávají za pracovníky podpory populárních peněženek, burz nebo blockchainů.

Velká část diskusí o Ethereu probíhá na Discordu. Podvodníci s falešnou podporou obvykle najdou svůj cíl tak, že hledají dotazy na podporu ve veřejných kanálech na Discordu a poté tazateli pošlou soukromou zprávu s nabídkou podpory. Budováním důvěry se vás podvodníci snaží přimět k tomu, abyste odhalili své soukromé klíče nebo poslali své prostředky do jejich peněženek.

![A support scam on Discord](./discordScam.png)

Obecným pravidlem je, že personál s vámi nikdy nebude komunikovat prostřednictvím soukromých, neoficiálních kanálů. Několik jednoduchých věcí, které byste měli mít na paměti při jednání s podporou:

- Nikdy nesdílejte své soukromé klíče, seed fráze ani hesla
- Nikdy nikomu nedovolte vzdálený přístup do vašeho počítače
- Nikdy nekomunikujte mimo určené kanály organizace

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Pozor: ačkoli se podvody ve stylu falešné podpory běžně vyskytují na Discordu, mohou být rozšířené i v jakýchkoli chatovacích aplikacích, kde probíhají diskuse o kryptu, včetně e-mailu.
</AlertDescription>
</AlertContent>
</Alert>

### Podvod s tokenem 'Eth2' {#eth2-token-scam}

V období před [Merge](/roadmap/merge/) podvodníci využili zmatku kolem termínu 'Eth2' a snažili se přimět uživatele, aby vyměnili své ETH za token 'ETH2'. Žádné 'ETH2' neexistuje a s Merge nebyl představen žádný jiný legitimní token. ETH, které jste vlastnili před Merge, je stejné ETH jako nyní. Není **potřeba podnikat žádné kroky týkající se vašeho ETH v souvislosti s přechodem z důkazu prací (PoW) na důkaz podílem (PoS)**.

Podvodníci se mohou vydávat za „podporu“ a tvrdit vám, že pokud vložíte své ETH, dostanete zpět 'ETH2'. Neexistuje žádná [oficiální podpora Etherea](/community/support/) a neexistuje žádný nový token. Nikdy s nikým nesdílejte seed frázi své peněženky.

_Poznámka: Existují derivátové tokeny/tickery, které mohou představovat stakované ETH (např. rETH od Rocket Pool, stETH od Lido, ETH2 od Coinbase), ale to není nic, na co byste museli „migrovat“._

### Phishingové podvody {#phishing-scams}

Phishingové podvody jsou dalším stále častějším způsobem, který podvodníci používají k pokusu o krádež prostředků z vaší peněženky.

Některé phishingové e-maily žádají uživatele, aby klikli na odkazy, které je přesměrují na napodobeniny webových stránek, a žádají je o zadání jejich seed fráze, resetování hesla nebo odeslání ETH. Jiné vás mohou požádat, abyste nevědomky nainstalovali malware, který infikuje váš počítač a poskytne podvodníkům přístup k souborům ve vašem počítači.

Pokud obdržíte e-mail od neznámého odesílatele, pamatujte:

- Nikdy neotevírejte odkaz ani přílohu z e-mailových adres, které neznáte
- Nikdy nikomu neprozrazujte své osobní údaje ani hesla
- Mažte e-maily od neznámých odesílatelů

[Více o tom, jak se vyhnout phishingovým podvodům](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Podvody s krypto brokery {#broker-scams}

Podvodní krypto brokeři o sobě tvrdí, že jsou specializovaní brokeři na kryptoměny, kteří vám nabídnou, že si vezmou vaše peníze a budou investovat vaším jménem. Poté, co podvodník obdrží vaše prostředky, může vás tahat za nos a žádat, abyste poslali další prostředky, abyste nepřišli o další investiční zisky, nebo může zcela zmizet.

Tito podvodníci často nacházejí cíle pomocí falešných účtů na YouTube, kde začínají zdánlivě přirozené konverzace o „brokerovi“. Tyto konverzace jsou často vysoce hodnoceny (upvoted), aby se zvýšila jejich legitimita, ale všechna tato hodnocení pocházejí od botů.

**Nedůvěřujte cizím lidem na internetu, že budou investovat vaším jménem. Přijdete o své krypto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Podvody s těžebními pooly {#mining-pool-scams}

Od září 2022 již není těžba na Ethereu možná. Podvody s těžebními pooly však stále existují. Podvody s těžebními pooly spočívají v tom, že vás lidé nevyžádaně kontaktují a tvrdí, že můžete dosáhnout velkých výnosů tím, že se připojíte k těžebnímu poolu Etherea. Podvodník bude vznášet tvrzení a zůstane s vámi v kontaktu tak dlouho, jak to bude nutné. V podstatě se vás podvodník pokusí přesvědčit, že když se připojíte k těžebnímu poolu Etherea, vaše kryptoměna bude použita k vytvoření ETH a že vám budou vypláceny dividendy v ETH. Poté uvidíte, že vaše kryptoměna přináší malé výnosy. To slouží pouze jako návnada, abyste investovali více. Nakonec budou všechny vaše prostředky odeslány na neznámou adresu a podvodník buď zmizí, nebo v některých případech zůstane v kontaktu, jak se stalo v jednom nedávném případě.

Sečteno a podtrženo: dejte si pozor na lidi, kteří vás kontaktují na sociálních sítích a žádají vás, abyste se stali součástí těžebního poolu. Jakmile o své krypto přijdete, je pryč.

Několik věcí, které byste si měli pamatovat:

- Dejte si pozor na kohokoli, kdo vás kontaktuje ohledně způsobů, jak vydělat peníze na vašem kryptu
- Udělejte si vlastní průzkum o stakingu, poolech likvidity nebo jiných způsobech investování vašeho krypta
- Zřídkakdy, pokud vůbec někdy, jsou taková schémata legitimní. Kdyby byla, pravděpodobně by byla běžně známá a už byste o nich slyšeli.

[Muž přišel o 200 tisíc dolarů v podvodu s těžebním poolem](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Podvody s airdropy {#airdrop-scams}

Podvody s airdropy spočívají v tom, že podvodný projekt provede airdrop aktiva (NFT, tokenu) do vaší peněženky a pošle vás na podvodnou webovou stránku, abyste si airdropnuté aktivum nárokovali. Při pokusu o nárokování budete vyzváni k přihlášení pomocí vaší Ethereum peněženky a ke „schválení“ transakce. Tato transakce kompromituje váš účet tím, že odešle vaše veřejné a soukromé klíče podvodníkovi. Alternativní forma tohoto podvodu vás může přimět k potvrzení transakce, která odešle prostředky na účet podvodníka.

[Více o podvodech s airdropy](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Základy webové bezpečnosti {#web-security}

### Používejte silná hesla {#use-strong-passwords}

[Více než 80 % hacknutí účtů je důsledkem slabých nebo ukradených hesel](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Dlouhá kombinace znaků, čísel a symbolů pomůže udržet vaše účty v bezpečí.

Častou chybou je použití kombinace několika běžných, souvisejících slov. Taková hesla jsou nezabezpečená, protože jsou náchylná k hackerské technice zvané slovníkový útok.

```md
Příklad slabého hesla: RoztomilaChlupataKotatka!

Příklad silného hesla: ymv\*azu.EAC8eyp8umf
```

Další častou chybou je používání hesel, která lze snadno uhodnout nebo odhalit prostřednictvím [sociálního inženýrství](<https://wikipedia.org/wiki/Social_engineering_(security)). Zahrnutí rodného příjmení vaší matky, jmen vašich dětí nebo domácích mazlíčků, případně dat narození do vašeho hesla zvýší riziko hacknutí.

#### Osvědčené postupy pro hesla: {#good-password-practices}

- Vytvářejte hesla tak dlouhá, jak to umožňuje váš generátor hesel nebo formulář, který vyplňujete
- Používejte kombinaci velkých a malých písmen, čísel a symbolů
- Nepoužívejte v hesle osobní údaje, jako jsou příjmení
- Vyhněte se běžným slovům

[Více o vytváření silných hesel](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Používejte pro všechno jedinečná hesla {#use-unique-passwords}

Silné heslo, které bylo odhaleno při úniku dat, již není silným heslem. Webová stránka [Have I Been Pwned](https://haveibeenpwned.com) vám umožňuje zkontrolovat, zda vaše účty nebyly součástí nějakého veřejného úniku dat. Pokud ano, **okamžitě tato hesla změňte**. Používání jedinečných hesel pro každý účet snižuje riziko, že hackeři získají přístup ke všem vašim účtům, pokud je jedno z vašich hesel kompromitováno.

### Používejte správce hesel {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Používání správce hesel se postará o vytváření silných, jedinečných hesel a jejich zapamatování! <strong>Důrazně</strong> doporučujeme nějaký používat a většina z nich je zdarma!
</AlertDescription>
</AlertContent>
</Alert>

Pamatovat si silná a jedinečná hesla pro každý váš účet není ideální. Správce hesel nabízí bezpečné, šifrované úložiště pro všechna vaše hesla, ke kterému máte přístup prostřednictvím jednoho silného hlavního hesla. Při registraci do nové služby také navrhují silná hesla, takže si nemusíte vytvářet vlastní. Mnoho správců hesel vám také sdělí, zda jste byli součástí úniku dat, což vám umožní změnit hesla před jakýmikoli škodlivými útoky.

![Example of using a password manager](./passwordManager.png)

#### Vyzkoušejte správce hesel: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Nebo se podívejte na další [doporučené správce hesel](https://www.privacytools.io/secure-password-manager)

### Používejte dvoufaktorové ověřování {#two-factor-authentication}

Někdy můžete být požádáni o ověření své identity prostřednictvím jedinečných důkazů. Ty jsou známé jako **faktory**. Tři hlavní faktory jsou:

- Něco, co znáte (například heslo nebo bezpečnostní otázka)
- Něco, čím jste (například otisk prstu nebo skener duhovky/obličeje)
- Něco, co vlastníte (bezpečnostní klíč nebo ověřovací aplikace ve vašem telefonu)

Použití **dvoufaktorového ověřování (2FA)** poskytuje dodatečný *bezpečnostní faktor* pro vaše online účty. 2FA zajišťuje, že pouhá znalost vašeho hesla nestačí k přístupu k účtu. Nejčastěji je druhým faktorem náhodný 6místný kód, známý jako **časově závislé jednorázové heslo (TOTP)**, ke kterému máte přístup prostřednictvím ověřovací aplikace, jako je Google Authenticator nebo Authy. Ty fungují jako faktor „něco, co vlastníte“, protože seed, který generuje časovaný kód, je uložen ve vašem zařízení.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Poznámka: Používání 2FA na bázi SMS je náchylné k <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> a není bezpečné. Pro nejlepší zabezpečení použijte službu jako <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> nebo <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Bezpečnostní klíče {#security-keys}

Bezpečnostní klíč je pokročilejší a bezpečnější typ 2FA. Bezpečnostní klíče jsou fyzická hardwarová ověřovací zařízení, která fungují jako ověřovací aplikace. Použití bezpečnostního klíče je nejbezpečnější způsob 2FA. Mnoho z těchto klíčů využívá standard FIDO Universal 2nd Factor (U2F). [Zjistěte více o FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Podívejte se na více informací o 2FA:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Odinstalujte rozšíření prohlížeče {#uninstall-browser-extensions}

Rozšíření prohlížeče, jako jsou rozšíření pro Chrome nebo doplňky pro Firefox, mohou zlepšit funkčnost prohlížeče, ale přinášejí s sebou i rizika. Ve výchozím nastavení většina rozšíření prohlížeče žádá o přístup ke „čtení a změně dat webů“, což jim umožňuje dělat s vašimi daty téměř cokoli. Rozšíření pro Chrome se vždy automaticky aktualizují, takže dříve bezpečné rozšíření se může později aktualizovat a obsahovat škodlivý kód. Většina rozšíření prohlížeče se nesnaží ukrást vaše data, ale měli byste si být vědomi toho, že mohou.

#### Zůstaňte v bezpečí tím, že: {#browser-extension-safety}

- Instalujte rozšíření prohlížeče pouze z důvěryhodných zdrojů
- Odstraníte nepoužívaná rozšíření prohlížeče
- Nainstalujete rozšíření pro Chrome lokálně, abyste zastavili automatické aktualizace (Pokročilé)

[Více o rizicích rozšíření prohlížeče](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Další čtení {#further-reading}

### Webová bezpečnost {#reading-web-security}

- [Až 3 miliony zařízení infikovaných doplňky pro Chrome a Edge obsahujícími malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Jak vytvořit silné heslo — které nezapomenete](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Co je to bezpečnostní klíč?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Krypto bezpečnost {#reading-crypto-security}

- [Ochrana vás a vašich prostředků](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Bezpečnostní problémy v běžném komunikačním softwaru pro krypto](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Průvodce bezpečností pro hlupáky i chytré lidi](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Krypto bezpečnost: Hesla a ověřování](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Vzdělávání o podvodech {#reading-scam-education}

- [Průvodce: Jak identifikovat podvodné tokeny](/guides/how-to-id-scam-tokens/)
- [Jak zůstat v bezpečí: Běžné podvody](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Jak se vyhnout podvodům](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Vlákno na Twitteru o běžných krypto phishingových e-mailech a zprávách](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />