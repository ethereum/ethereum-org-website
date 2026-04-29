---
title: "Evoluce Etherea: Fusaka, Glamsterdam a dále"
description: "Preston Van Loon o nadcházejících aktualizacích protokolu Etherea, milnících roadmapy Fusaka a Glamsterdam a dlouhodobém vývoji protokolu."
lang: cs
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmapa-a-priority"
  - "roadmapa"
  - "aktualizace"
format: presentation
author: ETHDenver
breadcrumb: "Evoluce Etherea"
---

Prezentace **Prestona Van Loona** z Offchain Labs a Prysm, přednesená na ETHDenver. Preston se věnuje nedávné rychlosti aktualizací Etherea a tomu, co síť čeká, včetně Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, kratších časů slotů a rychlejší finality.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=GgKveVMLnoo) zveřejněného ETHDenver. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:07) {#introduction-007}

**Moderátor:** Dobrá, všichni. Pokračujeme dál. Budeme mluvit o evoluci Etherea s Prestonem Van Loonem. Máš slovo.

**Preston Van Loon:** Dobrá. Děkuji. GM — víte, že GM platí kdykoliv, ve dne i v noci, ať už je ráno nebo ne. Takže vidím GM celý den i noc. Chci mluvit o evoluci Etherea, tak pojďme na to.

Existuje narativ, který jste už pravděpodobně slyšeli: Ethereum vydává novinky příliš pomalu. Vím, že jste to slyšeli. Já jsem to slyšel. Slyšeli jste to mnohokrát. Lidé říkali: „Kdy bude merge? Nemůžou vývojáři něco udělat? Ostatní sítě postupují rychle. Proč je Ethereum tak pomalé?“ Jsem tu, abych vám řekl, že tento narativ je mrtvý.

Pracuji na konsensuálním klientovi Prysm. Je to jedna z klíčových součástí Beacon chainu Etherea. A byl jsem v první linii u nejnovějších aktualizací — u Pectra, Fusaka. Z toho, co jsem viděl zevnitř, to nebyla žádná pomalá byrokracie, jak lidé o Ethereu po mnoho let tvrdili. Ve skutečnosti to byl vysoce rychlý, dobře fungující stroj, který dodal jedny z největších aktualizací, jaké jsme kdy v historii Etherea viděli.

#### Vydání tří aktualizací za jeden rok (1:18) {#shipping-three-upgrades-in-one-year-118}

To, co jsme vydali v roce 2025, byly tři hlavní aktualizace během jednoho roku. Nejprve Pectra v květnu 2025. Ta přinesla nativní abstrakci účtu, zvýšení maximálního efektivního zůstatku validátoru umožňující konsolidace a dalších deset EIP. V květnu to byla největší aktualizace z hlediska počtu EIP, jakou kdy Ethereum zažilo.

Ale pak, jen o sedm měsíců později, jsme vydali Fusaka — ještě větší aktualizaci z hlediska EIP. Ta jich měla třináct, s inovací zvanou PeerDAS, což je opravdu vzrušující. Ale jen o šest dní později jsme aktualizovali znovu s forkem BPO1 a krátce nato následoval BPO2, což zvýšilo kapacitu blobů v Ethereu.

To je důkazem toho, že Ethereum dodává výsledky. Jde o spolupráci mezi pěti nebo šesti konsensuálními klienty, pěti exekučními klienty, mnoha výzkumníky — více než sto lidmi zapojenými do hlavního vývoje Etherea — a všichni vydávají aktualizace koordinovaně ve stejnou dobu.

#### Škálování PeerDAS (2:22) {#peerdas-scaling-222}

Pojďme se podívat na hlavní tahák Fusaka: PeerDAS. PeerDAS je naprosto úžasné řešení pro škálování. Před PeerDAS jsme měli Pectra a s Pectra jste museli — jako provozovatel uzlu nebo validátor — stáhnout každý blob, který přišel s blokem. Cílem bylo šest blobů na blok. Každý to musel stahovat, a to je opravdu úzké hrdlo škálování. Pokud to chcete zvýšit, žádáte provozovatele uzlů, aby úměrně zvýšili využití šířky pásma pro bloby.

Nyní s Fusaka máme bloby, které jsou kódovány proti výmazu (erasure-coded), a žádáme validátory, aby uchovávali pouze jejich část. Stačí uchovávat pouze jednu osminu blobů. A s jakýmikoli 50 % blobů můžete zrekonstruovat celý celek. Takže díky tomuto rozložení po síti je zajištěna dostupnost dat a menší zátěž pro sólo stakery. To nám okamžitě přináší téměř 90% snížení využití šířky pásma sítě pro bloby.

Když se podíváme na čísla: pro Pectra jsme měli cíl šest a maximum devět blobů s limitem plynu (gas limit) 36 milionů. To považujeme za základní úroveň využití blobů — to bylo 768 kilobajtů na blok. Nyní, mezi Pectra a Fusaka, jsme měli mimořádnou aktualizaci, kde byl limit plynu zvýšen. Šlo o proces onchain správy, kde validátoři jednoduše hlasovali o tom, jaký by podle nich měl být limit bloku — ten se zvýšil z 36 na 45 milionů. A pak později v průběhu roku jsme se dostali k Fusaka, která nezměnila cíl ani maximum blobů, ale opět zvýšila limit plynu.

A pak jsme dosáhli toho velkého snížení šířky pásma, kde každý blok s cílem šesti blobů nyní představuje pouze 96 kilobajtů dat blobů, které musel validátor ukládat. Pak znovu s BPO1, forkem zaměřeným pouze na parametry blobů, jsme zvýšili cíl na 10 a maximum na 15. BPO2, který proběhl jen o měsíc později, se dostal na 14 a 21 — což je dvojnásobek toho, co jsme měli v Pectra, ale stále o 71 % menší využití šířky pásma pro bloby u sólo stakerů.

#### Co nás čeká v Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

Co dalšího nás čeká v Glamsterdam? Jsou tu tři opravdu klíčové věci a jedna, která je stále předmětem aktivního výzkumu.

První z nich je ePBS — zakotvené oddělení navrhovatele a tvůrce (PBS). Způsob, jakým dnes probíhá tvorba bloků, spočívá v tom, že mnoho lidí outsourcuje svou příležitost vytvořit blok prostřednictvím MEV-Boost velmi sofistikovaným tvůrcům. To je většina sítě. Problém je, že musíte důvěřovat relé (relay) a je zde velká míra důvěry, že tvůrce skutečně předloží blok, na který podal nabídku. ePBS zavádí mechanismus přímo v protokolu, takže je potřeba mnohem méně důvěry, a jde o velmi čistou implementaci stejné myšlenky.

Další věcí, kterou máme, jsou seznamy přístupů na úrovni bloku (block-level access lists). To je skvělá inovace, kde každý blok přijde se seznamem, který říká, kde ve stavu četl nebo zapisoval data. To znamená, že můžete zpracovávat bloky paralelně. Dnes musíte bloky zpracovávat sekvenčně. Pokud chcete zpracovat blok 10, musíte nejprve zpracovat 9 a 8 a tak dále. Nyní, pokud máte sadu bloků a žádný z nich není v konfliktu s informacemi o přístupu ke stavu, můžete zpracovat všech osm paralelně. Možná máte osm jader — to činí Ethereum efektivnějším a rychlejším při zpracování bloků.

Třetí věcí je přecenění gasu (gas repricing). Prostřednictvím tohoto EIP proběhly benchmarky, které ukázaly, že některé operační kódy byly předražené, jiné podhodnocené. Nyní aktualizujeme poplatky, které platíte za každý operační kód, aby odrážely realitu, čímž se Ethereum stane bezpečnějším a efektivnějším.

#### Vyvíjející se role L2 (6:14) {#the-evolving-role-of-l2s-614}

Je tu jedna věc, o které chci mluvit a kterou nedávno zmínil Vitalik. Před pár týdny v tweetu uvedl, že původní vize vrstev 2 (l2) a jejich role v Ethereu už nedává smysl. Získalo to spoustu titulků a myslím, že si z toho mnoho lidí odneslo špatný závěr.

Dovolte mi říct, co to znamená z pohledu někoho zevnitř. Ethereum škáluje rychleji, než se očekávalo. Poplatky jsou nižší než kdy jindy. Nikdy jsem si nemyslel, že budu na Mainnetu platit poplatky za gas nižší než jeden Gwei, ale jsme tady. Blobů je hojnost — máme jich spoustu. Škálování blobů probíhá rychleji, než se čekalo. A dokonce i poplatky na l2 jsou opravdu nízké.

Takže myšlenka, že potřebujeme univerzální l2 — tedy l2, které jsou jednoduše stejným EVM, jaké máme na vrstvě 1 (l1), jen ho několikrát zkopírujeme a vložíme a jediné, co dělají, je, že jsou rychlejší — to už není naše vize. Tyto l2 budou prosperovat díky specializaci. Některé z nich se zaměří na věci jako soukromí, hraní her, specifika v decentralizovaných financích (DeFi) nebo rozšíření EVM. Ale pokud jsou to jen klony l1, nejsou součástí roadmapy, kde jsme původně předpokládali tento druh sharded paradigmatu prostřednictvím l2.

#### FOCIL: odolnost proti cenzuře na úrovni protokolu (7:25) {#focil-protocol-level-censorship-resistance-725}

Kromě Glamsterdam jsou v aktivním vývoji a výzkumu tři opravdu skvělé věci. První z nich je FOCIL — Fork-Choice Enforced Inclusion Lists (seznamy zahrnutí vynucené volbou forku).

Problém, který se snaží vyřešit, spočívá v tom, že tvůrci bloků mají na výběr. Mohou rozhodovat o tom, jaké transakce budou do bloku zahrnuty. Mohou některé upřednostňovat a jiné ne — možná kvůli výhodě MEV, možná kvůli regulačnímu tlaku. Ale v každém případě mohou cenzurovat transakce, jak se jim zlíbí, a nikdo s tím nemůže nic dělat.

FOCIL mění dynamiku moci. Místo toho, abychom řekli, že tvůrci bloků mohou vybrat všechny transakce v bloku, existuje náhodný výbor, který na základě své lokální heuristiky vybere některé transakce, o kterých se domnívá, že musí být zahrnuty do dalšího bloku. Nejsou to všechny transakce v dalším bloku. Tvůrci mají stále velkou svobodu, ale existuje podmnožina, kterou musí zahrnout. Navrhovatel bloku vezme tento krátký seznam — možná zhruba osm transakcí — a umístí ho na konec bloku, a ty se provedou společně s blokem.

To je vynuceno prostřednictvím volby forku (fork choice). Validátoři, kteří uvidí blok, pro něj neprovedou atestaci, pokud k němu nebude na konci připojen seznam zahrnutí. Pokud uvidí blok bez tohoto seznamu, budou ho považovat za neplatný a jednoduše ho budou ignorovat — nebudou ho šířit, nebudou o něm hlasovat. Toto je stále aktivní výzkum a o některých parametrech se stále rozhoduje, ale směr je jasný: Ethereum bude zahrnovat odolnost proti cenzuře na úrovni protokolu.

#### Kratší časy slotů (9:24) {#shorter-slot-times-924}

Další opravdu vzrušující věcí jsou kratší časy slotů. S Hegata — forkem po Glamsterdam — zvažujeme, zda můžeme zahrnout kratší časy slotů nebo rychlé sloty. To neznamená, že rovnou přeskočíme na šestisekundové sloty nebo ještě rychlejší, ale budujeme základy, které to umožní.

Zní to opravdu jednoduše — jako „pojďme prostě zrychlit“. Ale musíte myslet na šíření v síti, povinnosti atestace validátorů, kde mají na provedení omezené množství času, a pak je tu ekonomika. Když jsem s tím poprvé experimentoval, prostě jsem změnil 12 na 6 a najednou všichni generovali dvakrát větší emisi — dvakrát více peněz — což opravdu není záměrem kratších časů slotů. Jde o to být rychlejší, ale zachovat vše ostatní stejné. Takže je to velmi složitá věc, ale má to potenciál se tam v konečné fázi postupně dostat.

#### Rychlejší finalita (10:20) {#faster-finality-1020}

Třetí věcí je rychlejší finalita. To je opravdu důležité, protože Ethereum finalizuje každé dvě epochy — každých 13 minut — a existují aplikace, které skutečně závisí na otázce: je moje transakce trvalá? Pokud transakce nebyla ve finalizované epoše, pak je odpověď ne — existuje malá šance, že by mohla být odstraněna při reorganizaci (reorg) a transakci by bylo nutné odeslat znovu.

Nyní, pokud budeme mít rychlou finalitu, věci jako burzy, mosty nebo jakákoli aplikace si mohou být jisty, že transakce je finální. Nejprve, místo dvou epoch pro finalitu, to udělejme v jedné. Pak můžeme říct, že místo epoch, které jsou dlouhé 32 slotů, je zkrátíme na čtyři sloty. Nyní, pokud to spojíte s šestisekundovými časy slotů, mluvíme o finalitě za méně než 30 sekund. To je opravdu skvělý konečný cíl.

#### Hlavní cíl (11:15) {#the-north-star-1115}

To vše je zabudováno do našeho hlavního cíle, kde říkáme, že l1 je rychlá s finalizací v řádu sekund. Jak se tam dostaneme? Nejprve začneme s PeerDAS — to už bylo vydáno. To nám poskytlo škálovatelnou vrstvu pro dostupnost dat. Dále tu máme Glamsterdam, zahrnující převážně ePBS, což je čistá implementace pro oddělení navrhovatele a tvůrce a díky níž jsou věci jako FOCIL účinnější. FOCIL přichází s odolností proti cenzuře, což je velmi v souladu s ePBS. S rychlejšími sloty činí kratší časy slotů rychlejší finalitu ještě efektivnější. Pak se dostaneme k tomuto konečnému cíli, kde skutečně máme rychlé transakce, které jsou finalizovány v řádu sekund.

#### Závěr (12:02) {#closing-1202}

Chci, abyste si představili, jaký bude život za dva roky. Je to trochu těžké si představit, protože krypto se pohybuje tak rychle. Tohle by mohla být realita už za dva roky: čtyř- nebo šestisekundové časy potvrzení transakce; finalita měřená v sekundách, ne v minutách; vynucování odolnosti proti cenzuře na úrovni protokolu; ochrana proti postkvantové kryptografii; a l2 soutěžící ve funkcích a nových inovacích, nejen v rychlosti. To vše při zachování výhody, že můžete použít běžný spotřebitelský notebook nebo hardware k provozování plného uzlu doma. Ethereum je přístupné a zůstane přístupné pro všechny i v budoucnu.

To, co chci, abyste si odnesli, je: narativ, který jsem vám představil na začátku — pro něj skutečně neexistují žádné důkazy. Ethereum vydává novinky rychle. Za pouhý jeden rok proběhly tři aktualizace. A v příštích 24 měsících přijde ještě více věcí a budou přicházet ještě rychleji.

Nejsou to jen nějaké vysněné pětileté plány. Jsou to skutečné věci s konkrétními návrhy, které se právě teď vyvíjejí. Právě teď jsou věci v devnetu. Zatímco spolu mluvíme, lidé na těchto implementacích pracují. Pokud dnes stavíte na Ethereu, stavíte na nejaktivněji vyvíjeném blockchainu na světě.

Jsem Preston Van Loon, hlavní vývojář Etherea. Pracuji v týmu Prysm ve společnosti Offchain Labs. Pokud se chcete zapojit, nejlepší způsob, jak zůstat v obraze o tom, co se v Ethereu děje, je pomoci ho sami budovat. Přijďte si se mnou potom promluvit. Podívejte se na repozitář Prysm nebo na jakékoli repozitáře specifikací konsensu či exekuce — budeme moc rádi za vaše příspěvky. Děkuji.