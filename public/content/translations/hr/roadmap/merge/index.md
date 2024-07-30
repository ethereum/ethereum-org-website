---
title: Spajanje
description: Saznajte više o spajanju – kada je glavna mreža Ethereuma usvojila dokaz uloga.
lang: hr
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Glavna mreža Ethereuma upotrebljava dokaz uloga, međutim, to nije uvijek bilo tako.
summaryPoint2: Nadogradnja izvornog mehanizma dokaza rada na dokaz uloga nazvana je The Merge (Spajanje).
summaryPoint3: Spajanjem je spojena izvorna glavna mreža Ethereumu sa zasebnim lancem blokova dokaza uloga (poznat pod nazivom Beacon Chain) u jedan lanac.
summaryPoint4: Spajanjem je potrošnja energije Ethereuma smanjena za približno 99,95 %.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Spajanje je provedeno 15. rujna 2022. Dovršeni prijelaz Ethereuma na konsenzus dokaza uloga službeno je zamijenio dokaz rada i smanjio potrošnju energije za približno 99,95 %.
</UpgradeStatus>

## Što je spajanje? {#what-is-the-merge}

Spajanje predstavlja objedinjavanje izvornog izvršnog sloja Ethereuma (glavne mreže koja je postojala još od [geneze](/history/#frontier)) s novim slojem konsenzusa dokaza uloga pod nazivom Beacon Chain. Time se uklanja potreba za energetski intenzivnim rudarenjem i umjesto toga mreža se osigurava korištenjem ulagačkog ETH-a. To je bio dosta značajan korak vizije Ethereuma kao prilagodljivijeg, sigurnijeg i održivijeg.

<MergeInfographic />

U početku je [Beacon Chain](/roadmap/beacon-chain/) bio odvojen od [glavne mreže](/glossary/#mainnet). Glavna mreža Ethereuma, sa svim svojim računima, stanjima, pametnim ugovorima i stanjima lanaca blokova, ostaje zaštićena [dokazom rada](/developers/docs/consensus-mechanisms/pow/), čak i za vrijeme paralelnog rada značajke Beacon Chain i njegova [dokaza uloga](/developers/docs/consensus-mechanisms/pos/). Spajanjem su ta dva sustava konačno objedinjena, pri čemu je dokaz rada trajno zamijenjen dokazom uloga.

Zamislite Ethereum kao svemirski brod koji je izbačen u orbitu prije nogo što je bio spreman za zvjezdano putovanje. Uz Beacon Chain zajednica je izgradila novi stroj i ojačala njegov trup. Nakon iscrpnog testiranja, odlučeno je da je vrijeme za zamjenu starog stroja u radu novim. Time je uveden nov i učinkovitiji motor u postojeći brod koji mu omogućuje dodatne svjetlosne godine i osvajanje novih svjetova.

## Spajanje s Mainnetom {#merging-with-mainnet}

Dokaz rada štitio je glavnu mrežu Ethereuma od njegove geneze sve do spajanja. Time je omogućeno da se u srpnju 2015. uvede lanac blokova Ethereuma kojim se svi mi koristimo, sa svim poznatim značajkama – transakcijama, pametnim ugovorima, računima i drugim.

Tijekom postojanja Ethereuma programeri su se pripremali za mogući prijelaz s koncepta dokaza rada na koncept dokaza uloga. Dana 1. prosinca 2020. Beacon Chain je formiran kao lanac blokova odvojen od glavne mreže u paralelnom radu.

Beacon Chain nije obrađivao transakcije glavne mreže. Umjesto toga konsenzus je postizao agregiranjem aktivnih validatora i njihovih stanja računa. Nakon iscrpnog testiranja postalo je izvjesno da je vrijeme da Beacon Chain postiže konsenzus temeljem stvarnih podataka. Nakon spajanja Beacon Chain postao je procesor za konsenzus svih mrežnih podataka, uključujući transakcije izvršnog sloja i bilance računa.

Spajanje je predstavljalo službeni prijelaz na Beacon Chain kao procesor proizvodnje bloka. Rudarenje više nije predstavljalo način kako proizvoditi valjane blokove. Umjesto toga, validatori dokaza uloga preuzeli su tu ulogu i sada su odgovorni za obradu valjanosti svih transakcija i predlaganje blokova.

Spajanjem nisu izgubljeni povijesni podaci. Kako se glavna mreža objedinila s Beacon Chainom, tako je migrirana i cjelokupna povijest transakcija Ethereuma.

<InfoBanner>
Prijelaz na dokaz uloga promijenio je način izdavanja Ethera. Saznajte više o <a href="/roadmap/merge/issuance/">izdavanju Ethera prije i nakon Spajanja</a>.
</InfoBanner>

### Korisnici i vlasnici {#users-holders}

**Spajanjem nije promijenjeno ništa za vlasnike ili korisnike.**

_Ponavljamo_: kao korisnik ili vlasnik ETH-a ili bilo kojeg drugog digitalnog novčanog sredstva na Ethereumu i kao dionik koji ne radi putem čvora, **zbog spajanja ne morate poduzeti nikakve mjere sa svojim sredstvima ili novčanikom u računu.** ETH je uvijek ETH. Ne postoji „stari ETH” ili „novi ETH” ili „ETH1” ili „ETH2”. Novčanici funkcioniraju na isti način poslije spajanja kao i prije – ako vam netko kaže drugačije, to je prevarant.

Unatoč trajne zamjene dokaza rada i prijelaza na dokaz uloga, cjelokupna povijest Ethereuma od samih početaka ostala je nepromijenjen i potpuna. Sva sredstva u novčaniku prije spajanja i dalje su dostupna i nakon spajanja. **Zbog nadogradnje vi ne morate ništa učiniti.**

[Više o sigurnosti Ethereuma](/security/#eth2-token-scam)

### Rukovatelji čvora i programeri decentralizirane aplikacije (dapp) {#node-operators-dapp-developers}

<ExpandableCard
title="Rukovatelji i davatelji ulagačkih čvorova"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Ključne radnje sadržavaju:

1. Zajedničko pokretanje konsenzus klijenta i izvršnog klijenta; kranje točke treće strane za preuzimanje podataka izvršavanja više ne funkcioniraju nakon spajanja.
2. Provjerite autentičnost klijenta za izvršavanje i konsenzus klijenta dijeljenom JWR tajnom kako bi sigurno mogli komunicirati.
3. Postavite adresu „primatelja naknade” kako biste primili svoju zarađenu napojnicu/MEV za naknadu za transakciju.

Ako ne dovršite gornje dvije radnje, vaš će se čvor vidjeti kao „izvan mreže” sve dok oba sloja nisu sinkronizirana i dok im nije potvrđena autentičnost.

Iako nije postavljen „primatelj naknade”, validator i dalje može raditi na uobičajeni način, ali vi nećete primiti napojnice za naknade ili MEV koje biste inače zaradili u blokovima koje vaš validator predloži.
</ExpandableCard>

<ExpandableCard
title="Rukovatelji nevalidiranog čvora i davatelji infrastrukture"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Sve do spajanja bio je dovoljan samo klijent za izvršenje (npr. Geth, Erigon, Besu ili Nethermind) za primanje, odgovarajuću potvrdu i propagiranje blokova o kojima se nagađalo u mreži. Nakon spajanja potvrđivanje transakcija koje su dio izvršnog korisnog iznosa sada ovisi o valjanosti „bloka konsenzusa” u kojem se nalaze.

Kao rezultat, čvor Ethereum sada zahtijeva i klijent za izvršenje i klijent za konsenzus. Ta dva klijenta zajednički funkcioniraju služeći se API-jem novog procesora. API procesora zahtijeva provjeru autentičnosti JWT tajnom koja se daje oboma klijentima glede sigurne komunikacije.

Ključne radnje sadržavaju:

- Instalaciju klijenta za konsenzus uz klijenta za izvršenje.
- Potvrdu autentičnosti klijenta za izvršenje i klijenta za konsenzus dijeljenom JWT tajnom kako bi mogli sigurno međusobno komunicirati.

Ako ne dovršite gornje radnje, vaš će se čvor vidjeti kao „izvan mreže” sve dok oba sloja nisu sinkronizirana i dok im nije potvrđena autentičnost.

</ExpandableCard>

<ExpandableCard
title="Programeri decentralizirane aplikacije (dapp) i pametnog ugovora"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Spajanje je izvršilo promjene konsenzusa koje su uključivale promjene:

- strukture bloka
- vremena utora/bloka
- operacijskog programa
- izvora slučajne izvedbe u lancu
- koncept sigurnih blokova za dodavanje (safe head) i odobrenih blokova (finalized).

Više informacija potražite u objavi Tima Beikoa: [How The Merge Impacts Ethereum’s Application Layer](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).
</ExpandableCard>

## Spajanje i potrošnja energije {#merge-and-energy}

Spajanje predstavlja kraj ere dokaza rada u Ethereumu i početak održivijeg, ekološki prikladnijeg Ethereuma. Pad potrošnje energije Ethereuma procijenjen je na 99,95 %, čime je Ethereum postao zeleni lanac čvorova. Saznajte više o [potrošnji energije Ethereuma](/energy-consumption/).

## Spajanje i skaliranje {#merge-and-scaling}

Spajanje je postavilo temelje za nove nadogradnje skalabilnosti koje nisu bile moguće u konceptu dokaza rada. Tako se Ethereum približio potpunoj sigurnosti i održivosti koja je opisana u [Viziji Ethereuma](/roadmap/vision/).

## Zablude o spajanju {#misconceptions}

<ExpandableCard
title="Zabluda: „Za pokretanje čvora potreban je ulog od 32 ETH.”"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">
Postoje dvije vrste čvorova u Ethereumu: čvorovi koji mogu predložiti blokove i čvorovi koji to ne mogu.

Čvorovi koji mogu predložiti blokove samo su mali dio cjelokupne količine blokova u Ethereumu. Ta kategorija uključuje čvorove za rudarenje po konceptu dokaza rada (proof-of-work – PoW) i čvorove validatora po konceptu dokaza uloga (proof-of-stake – PoS). Ta kategorija zahtijeva predaju ekonomskih resursa (kao GPU hash snaga u dokazu rada ili ulogi ETH-a u dokazu uloga) u zamjenu za mogućnost povremenih prijedloga sljedećeg bloka i zarade nagrada protokola.

Ostali čvorovi mreže (većina) ne moraju predati ekonomske resurse veće od uobičajenog korisničkog računala s 1 do 2 TB dostupnog prostora za pohranu i internetske veze. Ti čvorovi ne predlažu blokove, ali i dalje imaju kritičnu ulogu u zaštiti mreže jer praćenjem novih blokova i provjerom njihove valjanosti u skladu s pravilma konsenzusa mreže prilikom prispjeća održavaju sve predlagače blokova odgovornim. Ako je blok valjan, čvor nastavlja propagiranje u mreži. Ako blok nije valjan zbog nekog razloga, softver čvora ga odbacuje kao nevaljanog i zaustavlja njegovo propagiranje.

Svatko može pokrenuti proizvodnju čvora bez bloka s bilo kojim mehanizmom konsenzusa (dokaz rada ili dokaz uloga) i preporučuje se svim korisnicima ako imaju tu mogućnost. Rad čvora od velike je vrijednosti za Ethereum i donosi dodatne koristi vlasnikau čvora u vidu poboljšane sigurnosti, zaštite privatnosti i otpornosti na cenzuru.

Mogućnost da svaka osoba pokrene vlastiti čvor temeljni je čimbenik održavanja decentralizirane mreže Ethereuma.

[Više o pokretanju vlastitog čvora](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Zabluda: „Spajanje nije uspjelo smanjiti troškove goriva.”"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">
Troškovi goriva proizvod su mrežnog zahtjeva povezanog s kapacitetom mreže. Spajanje je zamijenilo koncept dokaza rada prijelazom na dokaz uloga za konsenzuse. Međutim, ono nije značajno promijenilo parametre koji imaju izravan utjecaj na kapacitet ili propusnost mreže.

S [planom razvoja objedinjavanja transakcija](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) napori su usmjereni na skaliranje aktivnosti korisnika na [sloju 2](/layer-2/), dok je sloj 1 glavne mreže omogućen kao zaštićen, decentralizirani sloj odlučivanja optimiziran za pohranu podataka objedinjavanja transakcija kako bi cijena objedinjenih transakcija eksponencijalno padala. Da bi se to moglo provesti, prijelaz na dokaz uloga kritični je preduvjet. [Više o gorivu i troškovima.](/developers/docs/gas/)
</ExpandableCard>

<ExpandableCard
title="Zabluda: „Spajanje je znatno ubrzalo transakcije.”"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
Brzina transakcije može se mjeriti na nekoliko načina, uključujući vrijeme do uključivanja u blok i vrijeme do finalizacije. Oba se neznatno mijenjaju, ali ne u mjeri koju će korisnici primijetiti.

Povijesno, u konceptu dokaza rada cilj je bio dobiti novi blok približno svakih 13,3 sekundi. U konceptu dokaza uloga utori se pojavljuju točno svakih 12 sekundi, a što predstavlja mogućnost za validatora da objavi blok. Većina utora imaju blokove, ali to ne i svi (npr. validator je van mreže). U konceptu dokaza uloga blokovi se proizvode približno 10 % češće nego u konceptu dokaza rada. To je doista mala promjena i nije vjerojatno da će je korisnici primijetiti.

Koncept dokaza uloga uveo je potpuno novi koncept konačnosti transakcije. U konceptu dokaza rada mogućnost reverzije bloka eksponencijalno se usložnjava sa svakim rudarenim blokom u transakciji, međutim ona nikada ne nestaje. U konceptu dokaza uloga blokovi su objedinjeni u epohe (razdoblje od 6,4 minuta sadrži 32 mogućnosti za blokove) za koje glasuju validatori. Kada se epoha završi, validatori glasuju smatra li se epoha „opravdanom”. Ako se validatori slože da je epoha opravdana, epoha se finalizira u sljedećoj epohi. Poništavanje finaliziranih transakcija ekonomski je neodrživo jer bi zahtijevalo prikupljanje i spaljivanje više od trećine ukupunih uloga ETH-a.

</ExpandableCard>

<ExpandableCard
title="Zabluda: „Spajanje je omogućilo povrat uloženih sredstava.”"
contentPreview="False. Staking withdrawals are not yet enabled with The Merge. The following Shanghai upgrade will enable staking withdrawals.">
Uloženi ETH i nagrade za ulaganje i dalje su zaključani bez mogućnosti povlačenja. Povlačenje je planirano za sljedeću šangajsku nadogradnju.
</ExpandableCard>

<ExpandableCard
title="Zabluda: „Validatori neće primiti likvidne ETH nagrade do šangajske nadogradnje u kojoj će biti omogućeno povlačenje sredstava.”"
contentPreview="False. Fee tips/MEV are credited to a non-staking account controlled by the validator, available immediately.">
To se možda čini u suprotnosti s gore navedom informacijom da povlačenje sredstava nije moguće do šangajske nadogradnje, međutim, validatori IMAJU trenutačni pristup nagradama/MEV-ovima zarađenim tijekom predlaganja bloka.

Protokol izdaje ETH kao nagradu validatorima za njihov doprinos u konsenzusu. Sloj konsenzusa računa se kao novoizdani ETH, pri čemu validator ima jedinstvenu adresu koja čuva uložene ETH-ove i nagrade za protokole. Taj je ETH blokiran do šangajske nadogradnje.

ETH na sloju za izvršavanje računa se odvojeno od sloja konsenzusa. Kada korisnici provode transakcije na glavnoj mreži Ethereuma, ETH-om se mora platiti gorivo, uključujući i napojnicu za validatora. ETH je već na sloju za izvršavanje. Protokol ga NIJE izdao kao novog i trenutačno je dostupan validatoru (uz pretpostavku da je registrirana adresa „primatelja naknade” u klijentskom softveru).
</ExpandableCard>

<ExpandableCard
title="Zabluda: „Kada se omogući povlačenje sredstava, ulagači će odmah biti isključeni.”"
contentPreview="False. Validator exits are rate limited for security reasons.">
Nakon što se šangajskom nadogradnjom omogući povlačenje sredstava, svi će se validatori potaknuti da povuku svoju bilansu ulaganja iznad 32 ETH jer su ta sredstva blokirana i ne računaju se u prihod. Ovisno o kamatnoj stopi na godišnjoj razini (APR, koja je određena ukupnim ulogom ETH-a), validatorima se može savjetovati da napuste svoje validatore i zatraže svoju cjelokupnu bilancu ili možda ulože još više, iskorištavajući svoje nagrade, kako bi više zaradili.

Važno upozorenje, protokol ograničava stopu potpunog izlaska validatora, pa tako izaći može samo šest validatora po Epohi (svakih 6,4 min, 1350 na dan, odnosno oko 43.200 ETH dnevno na 10 milijuna uloženih ETH-ova). To se ograničenje prilagođava ovisno o ukupnom ulogu ETH-a i sprječava masovno odlivanje sredstava. Nadalje, sprječava moguće napadače koji žele iskoristiti svoj ulog za kaznene napade i izvući svoju cjelokupnu bilancu ulaganja u istoj Epohi prije nego što protokol može nametnuti kaznu.

Kamatna stopa na godišnjoj razini namjerno je dinamična kako bi dopustila tržištu ulagača da odluče koliko žele zaraditi za pomoć u zaštiti mreže. Kada je omogućeno povlačenje sredstava, ako je stopa preniska, validatori izlaze po stopi koju je ograničio protokol. Postupno će to povećati kamatnu stopu na godišnjoj razini za sve one koji ostanu i privući će nove ulagače i one koji se žele vratiti.
</ExpandableCard>

## Što se dogodilo s „Eth2”? {#eth2}

Pojam „Eth2” je povučen. Nakoj spajanja „Eth1” i „Eth2” u jedan lanac, više nema potrebe za razdvajanjem dviju Ethereumovih mreža – postoji samo jedan Ethereum.

Kako bi se izbjegla zabuna, zajednica je ažurila te pojmove:

- „Eth1” sada je „sloj za izvršavanje” koji obrađuje transakcije i izvršavanja.
- „Eth2” sada je „sloj konsenzusa” koji obrađuje konsenzuse dokaza uloga.

Te terminološke promjene mijenjaju samo naziv i ne utječu na ciljeve i plan razvoja Ethereuma.

[Saznajte više o promjeni naziva „Eth2”](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Odnos između nadogradnji {#relationship-between-upgrades}

Sve nadogradnje Ethereum donekle su međusobno povezane. Ponovimo kako se spajanje odnosi na druge nadogradnje.

### Spajanje i Beacon Chain {#merge-and-beacon-chain}

Spajanje predstavlja formalno usvajanje nadogradnje Beacon Chain kao novog sloja konsenzusa za izvorni sloj za izvršavanje glavne mreže. Od spajanja validatori se dodjeljuju kako bi zaštitili glavnu mrežu Ethereuma, a rudarenje temeljem [dokaza rada](/developers/docs/consensus-mechanisms/pow/) više nije valjan način proizvodnje bloka.

Blokove sada predlažu validirajući čvorovi s ulogom ETH-a u zamjenu za pravo da sudjeluju u konsenzusu. Te nadogradnje postavljaju temelj za buduće nadogradnje prilagođavanja, uključujući razdjeljivanje.

<ButtonLink href="/roadmap/beacon-chain/">
  Beacon Chain
</ButtonLink>

### Spajanje i šangajska nadogradnja {#merge-and-shanghai}

Kako bi se pojednostavila i maksimizirala usredotočenost na uspješan prijelaz na koncept dokaza uloga, nadogradnja spajanja nije sadržavala određene, očekivane značajke, kao mogućnost povlačenja uloženog ETH-a. Šangajska nadogradnja planira se nakon spajanja kako bi omogućila ulagačima da povuku sredstva.

Pratite [problem sa šangajskom nadogradnjom na GitHubu](https://github.com/ethereum/pm/issues/450) ili [blog o razvoju i istraživanju EF-a](https://blog.ethereum.org/category/research-and-development/). Za znatiželjne, pogledajte prezentaciju [Što se događa nakon spajanja](https://youtu.be/7ggwLccuN5s?t=101) koju je održao Vitalik u travnju 2021. na događaju ETHGlobal.

### Spajanje i razdjeljivanje {#merge-and-data-sharding}

Izvorni je plan bio razvijati razdjeljivanje prije spajanja kako bi se riješio problem prilagođavanja. Međutim, uz procvat [rješenja za skaliranje sloja 2](/layer-2/), prioritet se prebacio na zamjenu koncepta dokaza rada u dokaz uloga.

Planovi za razdjeljivanje brzo su se razvijali. Međutim, uzimajući u obzir rast i uspjeh tehnologija sloja 2 za skaliranje izvršavanja transakcija, planovi za razdjeljivanje prešli su u traženje najoptimalnijeg načina diobe opterećenja pohrane komprimiranih podataka iz poziva svih pametnih ugovora uz mogućnost eksponencijalnog rasta mrežnog kapaciteta. To ne bi bilo moguće bez prethodnog prelaska na koncept dokaza uloga.

<ButtonLink href="/roadmap/danksharding/">
  Dijeljenje
</ButtonLink>

## Daljnje čitanje {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
