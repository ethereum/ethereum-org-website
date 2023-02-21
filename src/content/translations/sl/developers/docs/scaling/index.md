---
title: Širjenje
description: Uvod v različne možnosti za širjenje, ki jih trenutno razvija skupnost Ethereum.
lang: sl
sidebarDepth: 3
---

## Pregled širjenja {#scaling-overview}

Glede na to, da je število ljudi, ki uporabljajo Ethereum, naraslo, je blokovna veriga dosegla določene omejitve kapacitete. To je povečalo stroške uporabe omrežja, kar je ustvarilo potrebo po "rešitvah za širjenje". Raziskuje, testira in implementira se več rešitev, ki zavzemajo različne pristope, da bi dosegli enak cilj.

Glavni cilj razširljivosti je zvišanje hitrosti (hitrejša dokončnost) in pretočnosti transakcij (višje število transakcij na sekundo), brez žrtvovanja decentralizacije ali varnosti (več o [viziji Ethereum](/upgrades/vision/)). Na plasti 1 blokovne verige Ethereum visoko povpraševanje vodi do počasnejših transakcij in neživljenjskih [cen goriva](/developers/docs/gas/). Povečanje kapacitete omrežja v obliki hitrosti in pretočnosti je temeljnega pomena za smiseln in masovni sprejem Ethereuma.

Medtem ko sta hitrost in pretočnost pomembni, je ključno, da rešitve za širjenje, ki omogočajo dosego teh ciljev, ostanejo decentralizirane in varne. Ohranjanje nizkih ovir za vstop upravljavcev vozlišč je ključno za preprečevanje napredovanja proti centralizirani in negotovi računski moči.

Konceptualno širjenje najprej kategoriziramo kot širjenje na verigi ali izven verige.

## Predpogoji {#prerequisites}

Dobro morate razumeti vsa temeljna področja. Implementacija rešitev za širjenje je napredno področje, saj tehnologija v praksi še ni dovolj testirana ter se še naprej raziskuje in razvija.

## Širjenje na verigi {#on-chain-scaling}

Ta metoda širjenja zahteva spremembe protokola Ethereum (plast 1 [glavno omrežje](/glossary/#mainnet)). Drobljenje je trenutno glavna naloga pri tej metodi širitve.

### Razdrobitev {#sharding}

Drobljenje je proces horizontalne cepitve podatkovne baze za razporeditev bremena. V kontekstu Ethereuma bo drobljenje zmanjšalo prenatrpanost omrežja in povečalo število transakcij na sekundo z ustvarjanjem novih verig, imenovanih "drobci". To bo prav tako zmanjšalo obremenitev za vsakega validatorja, ki mu ne bo več treba procesirati vseh transakcij na omrežju.

Izvedite več o [razdrobitvi](/upgrades/sharding/).

## Širjenje izven verige {#off-chain-scaling}

Rešitve izven verige so implementirane ločeno od plasti 1 glavnega omrežja – ne zahtevajo nobenih sprememb obstoječega protokola Ethereum. Nekatere rešitve, znane kot rešitve "plasti 2", izpeljujejo svojo varnost neposredno iz plasti 1 blokovne verige Ethereum. Med drugim so to [optimistični zvitki](/developers/docs/scaling/optimistic-rollups/), [zvitki brez znanja](/developers/docs/scaling/zk-rollups/) ali [kanali stanja](/developers/docs/scaling/state-channels/). Druge rešitve vključujejo ustvarjanje novih verig različnih oblik, ki svojo varnost izpeljujejo ločeno od glavnega omrežja, kot so [stranske verige](#sidechains) ali [plasma](#plasma) verige. Te rešitve komunicirajo z glavnim omrežjem, vendar svojo varnost, za dosego različnih ciljev, izpeljujejo na drugačen način.

### Širjenje s plastjo 2 {#layer-2-scaling}

Ta kategorija rešitev izven verige izpeljuje svojo varnost iz glavnega omrežja Ethereum.

Plast 2 je skupen pojem za rešitve, oblikovane za pomoč pri širjenju vaših aplikacij tako, da upravljajo transakcije izven glavne verige Ethereum (plast 1), medtem ko izkoriščajo prednost robustnega decentraliziranega varnostnega modela glavnega omrežja. Ko je omrežje zasedeno, trpi hitrost transakcij, kar poslabša uporabniško izkušnjo za določene vrste aplikacij. S tem, ko omrežje postaja še bolj zasedeno, se zvišujejo cene goriva, saj pošiljatelji transakcij ciljajo no to, da drug drugega preplačajo. To lahko naredi uporabo Ethereuma zelo drago.

Večina rešitev plasti 2 se osredotoča na strežnik ali množico strežnikov, na katere se lahko nanaša kot vozlišča, validatorji, operaterji, sekvencerji, izdelovalci blokov ali podoben izraz. Odvisno od implementacije lahko ta vozlišča plasti 2 upravljajo posamezniki, podjetja, subjekti, ki jih uporabljajo, tretji operaterji ali velike skupine posameznikov (podobno kot pri glavnem omrežju). Transakcije so v splošnem predložene tem vozliščem plasti 2, namesto da so predložene neposredno na plast 1 (glavno omrežje). Za nekatere rešitve jih primer plasti 2 nato združi v skupine, preden jih zasidra na plast 1, po tem pa so zavarovane s strani plasti 1 in ne morejo biti spremenjene. Podrobnosti o tem, kako je to izvedeno, se med različnimi tehnologijami in implementacijami plasti 2 močno razlikujejo.

Specifičen primer plasti 2 lahko odpre in deli več aplikacij, ali pa ga uveljavi en projekt in je namenjen podpori izključno njihove aplikacije.

#### Zakaj potrebujemo plast 2? {#why-is-layer-2-needed}

- Večje število transakcij na sekundo precej izboljša uporabniško izkušnjo in zniža zasedenost glavnega omrežja Ethereum.
- Transakcije so zvite v eno samo transakcijo na glavnem omrežju Ethereum, kar zniža provizije goriva za uporabnike, kar posledično pomeni, da je Ethereum bolj vključujoč in dostopen za ljudi vsepovsod.
- Do nobene nadgradnje za razširljivost ne sme priti na račun decentralizacije ali varnosti – plast 2 gradi na vrhu Ethereuma.
- Obstajajo omrežja plasti 2, specifična za aplikacije, ki prinašajo svoj lasten set učinkovitosti pri uporabi sredstev v večjem obsegu.

#### Zvitki {#rollups}

Zvitki izvajajo izvedbo transakcij izven plasti 1 in nato podatke objavijo na plasti 1, kjer je doseženo soglasje. Ker so podatki o transakciji vključeni v bloke plasti 1, to zvitkom omogoča, da so zavarovani z domačo varnostjo Ethereuma.

Obstajata dva tipa zvitkov z različnima varnostnima modeloma:

- **Optimistični zvitki**: predvidevajo, da so transakcije privzeto veljavne, in izvedejo računanje le v primeru izpodbijanja prek [**odpora na prevare**](/glossary/#fraud-proof). [Več o optimističnih zvitkih](/developers/docs/scaling/optimistic-rollups/).
- **Zvitki brez znanja**: izvedejo računanje izven verige in predložijo[**dokaz o veljavnosti**](/glossary/#validity-proof) na verigo. [Več o zvitkih brez znanja](/developers/docs/scaling/zk-rollups/).

#### Kanali stanja {#channels}

Kanali stanja uporabljajo večpodpisne pogodbe, da sodelujočim omogočijo hitre in proste prenose izven verige, ter nato poravnajo dokončnost z glavnim omrežjem. To minimizira preobremenjenost omrežja, provizije in zamude. Trenutno obstajata dve vrsti kanalov: kanali stanja in plačilni kanali.

Izvedite več o [kanalih stanja](/developers/docs/scaling/state-channels/).

### Stranske verige {#sidechains}

Stranska veriga je neodvisna kompatibilna blokovna veriga EVM, ki deluje vzporedno z glavnim omrežjem. Stranske verige so kompatibilne z Ethereumom prek dvosmernih mostov ter delujejo po lastnih izbranih pravilih soglasja in blokovnih parametrih.

Izvedite več o [stranskih verigah](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Plasma veriga je ločena blokovna veriga, ki je zasidrana na glavno verigo Ethereum in za reševanje sporov uporablja dokazila o prevarah (kot [optimistični zvitki](/developers/docs/scaling/optimistic-rollups/)).

Izvedite več o [Plasmi](/developers/docs/scaling/plasma/).

### Validium {#validium}

Veriga Validium uporablja dokaze o veljavnosti enako kot zvitki brez znanja, vendar pa podatki niso shranjeni na glavni plasti 1 verige Ethereum. To lahko privede do 10 000 transakcij na sekundo za vsako verigo Validium, vzporedno pa lahko deluje več verig.

Izvedite več o [Validiumu](/developers/docs/scaling/validium/).

## Zakaj je potrebnih toliko rešitev za širjenje? {#why-do-we-need-these}

- Več rešitev lahko pomaga zmanjšati splošno rpenatrpanost na kateremkoli delu omrežja in prav tako preprečujejo posamezne točke neuspeha.
- Celota je večja kot vsota njenih delov. Različne rešitve lahko obstajajo in delujejo usklajeno, kar omogoča eksponenten učinek na prihodnjo hitrost transakcij in pretočnost.
- Vse rešitve ne zahtevajo neposredne uporabe algoritma za soglasje Ethereum in alternative lahko ponudijo prednosti, ki bi jih bilo drugače težko pridobiti.
- Nobena rešitev za širjenje sama ni dovolj za izpolnitev [vizije Ethereum](/upgrades/vision/).

## Se lažje učite z vizualizacijo? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Upoštevajte, da razlaga v videu izraz "plast 2" uporablja za naslavljanje vseh rešitev za širjenje izven verige, medtem ko mi "plast 2" razumemo kot rešitev izven verige, ki izpeljuje svojo varnost prek soglasij na glavnem omrežju plasti 1._

<YouTube id="7pWxCklcNsU" />

## Nadaljnje branje {#further-reading}

- [Načrt Ethereum, osredotočen na zvitke](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktualna analiza o rešitvah za širjenje Ethereuma s plastjo 2](https://www.l2beat.com/)
- [Ocena rešitev za širjenje Ethereuma s plastjo 2: primerjalni okvir](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Nepopoln vodnik po zvitkih](https://vitalik.ca/general/2021/01/05/rollup.html)
- [ZK-zvitki, ki jih poganja Ethereum: World Beaters](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistični zvitki proti ZK-zvitkom](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Razširljivost blokovne verige brez znanja](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Zakaj so zvitki + podatkovni drobci edina primerna rešitev za visoko razširljivost](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)

_Poznate vir iz skupnosti, ki vam je pomagal? Uredite to stran in ga dodajte!_
