---
title: "Aktualizace Ethereum Pectra: co potřebují vědět stakeři"
description: "Vysvětlení aktualizace Pectra z pohledu stakera, pokrývající praktické dopady na validátory, operace stakingu a klíčové EIP, které ovlivňují staking v protokolu Ethereum."
lang: cs
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra pro stakery"
---

Webinář pořádaný společností **Blockdaemon**, ve kterém blockchainová inženýrka Julia Schmidt (Alluvial) a Freddy Tänzer (Blockdaemon) diskutují o tom, jak aktualizace Pectra ovlivňuje staking ETH. Webinář pokrývá výběry spustitelné z exekuční vrstvy, zvýšení maximálního efektivního zůstatku, konsolidaci validátorů a důsledky pro likvidní staking.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=_UpAFpC7X6Y) zveřejněného společností Blockdaemon. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:00) {#introduction-000}

**Moderátor:** Dobrý den a vítejte na tomto webináři pořádaném společností Blockdaemon, který se zaměřuje na nadcházející aktualizaci Ethereum Pectra. Dnes jsou tu s námi Julia Schmidt, blockchainová inženýrka ve společnosti Alluvial, a Freddy Tänzer, vedoucí ekosystému Ethereum ve společnosti Blockdaemon, abychom prodiskutovali, jak změny v aktualizaci Pectra ovlivní staking ETH, síť jako celek, služby likvidního stakingu a další. Na úvod, Freddy — mohl byste nám stručně shrnout aktualizaci Pectra a jaký bude její dopad na stakery?

#### Co je Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Pectra je aktualizace Etherea, která je naplánována na konec prvního čtvrtletí roku 2025 — zhruba na březen, možná se to trochu posune, třeba na duben. Původně to měl být vlastně malý fork, ale pak se přidávalo stále více věcí, takže to teď vlastně rozdělili na dvě části.

První část obsahuje spoustu věcí — například pokud jde o chytré účty, abstrakci účtu a podobně — ale já se chci zaměřit hlavně na věci, které jsou relevantní pro naše publikum z hlediska změn ve stakingu. Jsou tu hlavně dvě velké.

První je skutečnost, že můžete spouštět výběry a výstupy ze svého validátora prostřednictvím exekuční vrstvy — pomocí pověření k výběru — čímž se v podstatě eliminuje závislost na provozovateli uzlu. Druhá, jejíž dopad je pravděpodobně ještě větší, je to, že se nyní může měnit maximální efektivní zůstatek validátora. Dříve to bylo pouze 32 ETH jako pevná částka, a nyní to může být kdekoli mezi 32 a 2 048 ETH.

Je tu také jedna menší, která v podstatě vede k tomu, že vklady jsou mnohem rychlejší — onchain registrace se zkrátí z nějakých 14 hodin na méně než hodinu — ale myslím, že ty dvě první jsou pro naši diskusi nejrelevantnější.

#### EIP-7002: výstupy spustitelné z exekuční vrstvy (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Moderátor:** Pokud jde o první velkou změnu, Julio, mohla byste vysvětlit, jak se proces po aktualizaci Pectra změní v porovnání se současnými způsoby, jakými jsou výběry iniciovány v ekosystému stakingu na Ethereu?

**Julia Schmidt:** Aby mohl validátor navrhovat a atestovat bloky, musí být neustále online a mít stakovaný zůstatek 32 ETH. Když nastavujete validátora, aby se účastnil mechanismu konsensu, nastavíte dva klíče. Prvním je klíč validátora, který se používá k plnění povinností validátora — podepisování atestací bloků. Druhým je klíč pro výběr, který představuje vlastnictví stakovaných ETH.

Máte dva způsoby stakingu: sólo staking, nebo multi-custodial nastavení, jako je to u Blockdaemon a jak to děláme v Liquid Collective, kde si můžete vybrat provozovatele uzlu, který bude plnit všechny povinnosti a operace validátora vaším jménem. Tím jim předáte klíč validátora a vy máte přístup pouze ke klíči pro výběr.

Samotná zpráva pro výstup validátora může být odeslána pouze z klíče validátora, který ovládá provozovatel uzlu. To vyžaduje, abyste svému provozovateli uzlu důvěřovali — abyste byli závislí na tom, že za vás výstup validátora provede. Pokud to udělá, je to skvělé, ale vždy se musíte spoléhat na tuto třetí stranu.

Dříve se stávalo to, že jste při vytváření tohoto multi-custodial nastavení stakingu souhlasili s předběžným podepisováním zpráv o výstupu. Dostali jste zprávu, kterou jste mohli později použít k výstupu vašeho validátora, ale nevěděli jste, zda bude zpráva o výstupu skutečně fungovat. Pokaždé, když došlo k aktualizaci Etherea, která změnila číslo verze, vaše zpráva o výstupu už nemusela fungovat.

Při poslední aktualizaci Dencun změnilo nové EIP dobu platnosti těchto zpráv o výstupu — ale to jen léčilo příznak, neřešilo to problém. Skutečným problémem je, že vlastník stakovaných ETH nemůže spustit výběr. Prostředky mohou být v podstatě drženy jako rukojmí provozovatelem uzlu.

To je nyní vyřešeno pomocí EIP-7002, které umožňuje jak klíči validátora, tak klíči pro výběr spustit výstup z exekuční vrstvy — jednoduše odesláním transakce do speciálního kontraktu pro výběr, kam odešlete žádost o výběr a specifikujete buď úplný výstup validátora, nebo částečný výběr ze stakovaného zůstatku.

#### EIP-7251: maximální efektivní zůstatek (4:15) {#eip-7251-max-effective-balance-415}

**Moderátor:** Freddy, mohl byste nám poskytnout přehled o maximálním efektivním zůstatku od aktualizace Pectra dále a jak to ovlivní lidi, kteří v současnosti stakují?

**Freddy Tänzer:** Jen bych dodal — pro naše institucionální zákazníky byla tato závislost na provozovateli uzlu obvykle řešena předem podepsanými zprávami o výstupu, hlavně kvůli obavám regulátorů nebo obavám o kontinuitu podnikání. Tyto zprávy o výstupu museli také uchovávat v bezpečí. Dochází zde tedy k jasnému zjednodušení procesu a odstranění této závislosti.

Nyní k maximálnímu efektivnímu zůstatku: spousta věcí se nemění a vše je volitelné (opt-in). Nemusíte nic měnit. Cílem hlavních vývojářů Etherea a celého ekosystému je snížit počet validátorů v síti. Nyní máme přes milion validátorů a každý z nich musí komunikovat s ostatními o atestacích a konsensu. To je obrovský síťový provoz — testy ukázaly, že dosažení dvou milionů validátorů by mohlo představovat problém.

Cílem je snížit počet validátorů bez dopadu na bezpečnost sítě — protože celkové množství stakovaných ETH by zůstalo konstantní, jen by v průměru připadalo více ETH na jednoho validátora.

Pro zákazníka to hlavně znamená, že se musí rozhodnout, zda použije nový typ validátora, nebo ten starý. To závisí na jeho potřebách likvidity. V současném nastavení s validátory o velikosti 32 ETH budou vaše odměny z protokolu odesílány na vaše pověření k výběru každých devět nebo deset dní, což vám poskytne pravidelnou likviditu.

Mnoho nastavení však předpokládá, že se odměny používají ke složenému úročení staku. V minulosti jste při složeném úročení museli čekat, až budete mít na odměnách 32 ETH, abyste mohli ručně spustit nového validátora. S novým typem validátora se vaše odměny úročí automaticky — to znamená více odměn a méně práce.

Kompromisem je, že nedostáváte odměny pravidelně a musíte si nastavit proces pro jejich získání. Spouštěče výběrů jsou nyní běžné transakce, za které se platí poplatek za plyn, na rozdíl od bezplatného přijímání odměn ve starém modelu.

Dobré zprávy jsou i ohledně penalizace: počáteční penalizace se dramaticky sníží — zhruba 128krát. U validátora s 32 ETH byla počáteční penalizace jedno ETH. Po aktualizaci Pectra to bude zlomek ETH — možná 20 nebo 25 dolarů. To má pozitivní vedlejší účinky na sólo staking, což je zjevně důležité pro důvěryhodnou neutralitu Etherea.

Výhoda automatického složeného úročení prospívá hlavně menším částkám staku. Pokud máte tisíc validátorů, mohli byste ručně spouštět nový každý měsíc. Ale pokud máte jen jednoho validátora, museli byste na složené úročení čekat prakticky 32 let.

#### Důsledky pro likvidní staking (11:25) {#liquid-staking-implications-1125}

**Moderátor:** Julio, jak si stojí konsolidace větších validátorů v porovnání s výhodami likvidního stakingu? Jak se budou tato rozhodnutí zvažovat v mysli stakera po aktualizaci Pectra?

**Julia Schmidt:** Ve společnosti Alluvial tyto změny pečlivě sledujeme a chceme nabídnout obě řešení. Požadavky na konsolidaci v aktualizaci Pectra jsou prozatímním řešením, které by nemělo ovlivnit dobu výdělku vašeho efektivního zůstatku — při konsolidaci více validátorů nebude muset znovu procházet frontou pro aktivaci. Proces je poměrně hladký.

Skutečnost, že byla snížena počáteční penalizace, snižuje riziko provozování validátorů s vysokým zůstatkem. Tlak ze strany Nadace Ethereum je skutečně takový, abychom konsolidovali co nejvíce a snížili tak zatížení sítě. Je tu jedna malá nevýhoda: ve velmi vzácném případě, že by byl penalizován validátor s maximálním efektivním zůstatkem 2 048 ETH, dostal by se do fronty pro výstup a vaše prostředky by byly uzamčeny na delší dobu — bylo by to, jako by bylo penalizováno 64 validátorů najednou. Snažili bychom se proto nabízet flexibilní stropy pro validátory podle ochoty klienta riskovat.

Co se týče užitečnosti, token likvidního stakingu (LST) samozřejmě přidává likviditu — i s částečnými výběry z exekuční vrstvy to nebude okamžité. Odešlete transakci, ta se zařadí do fronty, pak následuje epocha výstupu a epocha výběru. Tokeny likvidního stakingu stále nabízejí okamžitou likviditu, kterou částečné výběry poskytnout nemohou.

#### Další kroky pro stakery (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Vidíme, že finanční instituce by typicky stakovaly mezi 65 % a 85 % svých ETH ve správě, protože zbytek potřebují jako rezervu likvidity pro zpětné odkupy. S likvidním stakingem můžete potenciálně zvýšit množství stakovaných ETH, což generuje vyšší odměny.

Z aktualizace Pectra těží obě strany — likvidní staking získává možnost výběrů z exekuční vrstvy a tradiční staking se zbavuje problému s přírůstky po 32 ETH, zejména u menších staků.

**Julia Schmidt:** S protokolem Liquid Collective nenabízíme staking pouze jednomu provozovateli uzlu — máme konsorcium různých provozovatelů uzlů, kterým přidělujeme staky systémem round-robin. To zvyšuje decentralizaci stakovaných ETH. A tito provozovatelé uzlů dodržují standard NORS (Node Operator Risk Standard), takže garantujeme i krytí v případě penalizace.

Klíčovou výhodou, které jsem se ještě nedotkla, jsou částečné výběry — nyní, když můžete vybírat stakované ETH z exekuční vrstvy, otevírá to nové cesty pro protokoly, jako je EigenLayer, ke spouštění výběrů a výstupů. Dochází k obrovskému nárůstu funkčnosti a interoperability, které nyní mohou decentralizované finance (DeFi) lépe začlenit do celého životního cyklu validátora, od vkladu až po výstup. Jako blockchainovou inženýrku mě velmi těší, že mohu automatizovat celý pracovní postup.

#### Závěr (19:50) {#closing-1950}

**Moderátor:** Julio, kam se mohou lidé podívat, aby se dozvěděli více o Liquid Collective a Alluvial?

**Julia Schmidt:** Alluvial a Liquid Collective můžete sledovat na Twitteru, na X, na LinkedInu nebo na webových stránkách Alluvial. Budeme sdílet článek s podrobnostmi o změnách týkajících se aktualizace Pectra a o tom, jak ovlivní prostředí Etherea.

**Moderátor:** Freddy, máte nějaké novinky ohledně aktualizace Pectra, o které byste se chtěl podělit?

**Freddy Tänzer:** Čeká nás toho hodně. Na našich webových stránkách blockdaemon.com budeme mít vyhrazenou stránku — bude to centrální uzel všech zdrojů. Budeme mít příspěvek na blogu, FAQ a nějaké pokyny a doporučení pro modelování ohledně toho, jaký typ validátora zvolit a jakou velikost. Ať už chcete jednoho validátora s 2 000 ETH, nebo dva s 1 000, nebo čtyři s 500 — to vše je obecně možné a je třeba učinit rozhodnutí o kompromisech. Pomůžeme našim zákazníkům se v tom zorientovat.

**Moderátor:** Fantastické. Freddy, Julio, moc vám děkuji za váš dnešní čas — fascinující diskuse a skvělý úvod do aktualizace Pectra.