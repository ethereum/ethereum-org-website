---
title: Oddělení navrhovatelů od sestavovatelů
description: Zjistěte, jak a proč validátoři Etherea dělí své povinnosti sestavovatelů a šiřitelů bloků.
lang: cs
---

# Oddělení navrhovatelů od sestavovatelů {#proposer-builder-separation}

Současní ethereovští validátoři vytvářejí _a_ šíří nové bloky. Seskupují transakce, o kterých se dozvěděli prostřednictvím komunikační sítě, a balí je do bloku, který rozesílají kolegům v síti Ethereum. **Oddělení navrhovatelů a sestavovatelů (PBS)** dělí tyto úkoly mezi více validátorů. Sestavovatelé bloků jsou odpovědní za vytváření bloků a jejich doručení navrhovatelům bloků v každém slotu. Navrhovatel bloku nevidí obsah bloku, jednoduše si vybere ten nejziskovější a zaplatí poplatek sestavovateli bloku, než odešle blok dalším kolegům.

Toto je důležité vylepšení hned z několika důvodů. Za prvé, jedná se o příležitost, jak zamezit cenzuře transakcí na úrovni protokolu. Za druhé, zabraňuje situaci, kdy jsou jednotliví validátoři upozaděni institucionálními hráči, kteří mohou lépe optimalizovat ziskovost svých bloků. A za třetí, pomáhá se škálováním Etherea tím, že umožňuje dankshardingová vylepšení.

## PBS a odolnost proti cenzuře {#pbs-and-censorship-resistance}

Oddělením sestavovatelů a navrhovatelů bloků je pro sestavovatele bloků mnohem obtížnější cenzurovat transakce. Je to proto, že lze přidat poměrně složitá kritéria pro zařazení, která zajistí, že před navržením bloku neproběhne žádná cenzura. Jelikož je navrhovatel bloků samostatný subjekt nezávislý na sestavovateli bloků, může převzít roli ochránce před cenzurou.

Např. lze zavést seznamy transakcí, které mají být zahrnuty, takže když validátoři vědí o určitých transakcích, které ale nevidí zahrnuté v blocích, mohou je definovat jako nutné pro další blok. Tento seznam je generován z místního mempoolu navrhovatelů bloků (seznam transakcí, o kterých ví) a odesílá se jejich kolegům těsně před navržením bloku. Pokud některá z transakcí z tohoto seznamu chybí, navrhovatel může blok buď odmítnout, přidat chybějící transakce před jeho navržením, nebo jej navrhnout a nechat jej odmítnout jinými validátory, když jej obdrží. Existuje také potenciálně efektivnější verze této myšlenky, která tvrdí, že sestavovatelé musí plně využít dostupný prostor bloků, a pokud tak neučiní, budou transakce přidány ze seznamu zahrnutí navrhovatele. V současné době je tato problematika stále aktivně zkoumána a optimální konfigurace pro zařazení do seznamů dosud nebyla stanovena.

[Šifrované mempooly](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) by také mohly znemožnit sestavovatelům a navrhovatelům zjistit, které transakce zahrnují do bloku, dokud nebude blok rozšířen.

<ExpandableCard title="Jaké druhy cenzury řeší PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Mocné organizace mohou tlačit na validátory, aby cenzurovali transakce na určité adresy nebo z nich. Validátoři tomuto tlaku mohou vyhovět tím, že detekují adresy na černé listině ve svém poolu transakcí a vynechávají je z bloků, které navrhují. Po PBS to již nebude možné, protože navrhovatelé bloků nebudou vědět, jaké transakce ve svých blocích šíří. Pro některé jednotlivce nebo aplikace může být důležité dodržovat pravidla cenzury, např. když je to v jejich regionu uzákoněno. V těchto případech dochází k omezení na úrovni aplikace, zatímco protokol zůstává bez povolení a bez cenzury.

</ExpandableCard>

## PBS a MEV {#pbs-and-mev}

**Maximální extrahovatelná hodnota (MEV)** popisuje validátory maximalizující svou ziskovost výhodným řazením transakcí. Mezi běžné příklady patří arbitráž směn na decentralizovaných burzách (např. předběžná realizace velkého prodeje nebo nákupu) nebo identifikace příležitostí k likvidaci DeFi pozic. Maximalizace MEV vyžaduje sofistikované technické know-how a vlastní software připojený k normálním validátorům, takže je mnohem pravděpodobnější, že institucionální operátoři překonají jednotlivce a domácí validátory při extrakci MEV. To znamená, že výnosy z uzamčení budou pravděpodobně vyšší u centralizovaných operátorů, což vytváří centralizační sílu, která od uzamčení odrazuje jednotlivce.

PBS řeší tento problém překonfigurováním ekonomiky MEV. Místo toho, aby navrhovatel bloku prováděl své vlastní výpočty MEV, jednoduše si vybere jeden blok z mnoha, které jim nabízejí sestavovatelé bloků. Sestavovatelé bloků možná provedli sofistikovanou extrakci MEV, ale odměna za ni půjde navrhovateli bloku. To znamená, že i když v extrakci MEV dominuje malá skupina specializovaných sestavovatelů bloků, odměnu by mohl dostat jakýkoliv validátor v síti, včetně jednotlivých domácích uzamykatelů.

<ExpandableCard title="Proč je v pořádku centralizovat sestavování bloků?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Jednotlivci mohou být motivováni uzamykat spíše pomocí poolů než sami, a to z důvodu lepších odměn, které nabízejí sofistikované strategie MEV. Oddělení sestavení bloku od návrhu bloku znamená, že extrahované MEV bude distribuováno mezi více validátorů, spíše než centralizováno tím, kdo nejlépe spočítá MEV. Umožnění existence specializovaných sestavovatelů bloků zároveň pomůže jednotlivcům, kteří nebudou muset bloky vytvářet, a také jim zabrání v odejmutí MEV pro sebe a maximalizuje počet jednotlivých nezávislých validátorů, kteří mohou potvrdit poctivost bloků. Důležitým konceptem je „asymetrie ověřovatelů a dokazovatelů“, která odkazuje na myšlenku, že centralizovaná produkce bloků je v pořádku, pokud existuje robustní a maximálně decentralizovaná síť validátorů schopných dokázat, že jsou bloky poctivé. Decentralizace je prostředkem, nikoli konečným cílem – chceme poctivé bloky.
</ExpandableCard>

## PBS a Danksharding {#pbs-and-danksharding}

Danksharding je způsob, jakým se Ethereum rozšíří na > 100 000 transakcí za sekundu a minimalizuje poplatky pro uživatele rollupů. Spoléhá na PBS, protože zvyšuje pracovní zátěž pro sestavovatele bloků, kteří budou muset počítat důkazy pro až 64 MB souhrnných dat za méně než 1 sekundu. To bude pravděpodobně vyžadovat specializované sestavovatele, kteří mohou tento úkol svěřit výkonnému hardwaru. V současné situaci by se však sestavování bloků mohlo stále více centralizovat kolem sofistikovanějších a výkonnějších operátorů kvůli extrakci MEV. Oddělení navrhovatele a sestavovatele je způsob, jak zabránit vyvíjenému tlaku na centralizaci ověřování bloků (což je důležité) nebo rozdělování odměn za uzamčení. Velkou vedlejší výhodou je, že specializovaní sestavovatelé bloků jsou také ochotni a schopni vypočítat potřebné důkazy dat pro Danksharding.

## Aktuální průběh {#current-progress}

PBS je v pokročilé fázi výzkumu, ale stále existují některé důležité konstrukční otázky, které je třeba vyřešit, než bude možné jej prototypovat v klientech Etherea. Pro žádný z nápadů zatím neexistuje konečná specifikace. To znamená, že uvedení PBS do praxe nás pravděpodobně čeká za rok nebo později. Podívejte se, [v jaké fázi se momentálně tento výzkum nachází](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Další informace {#further-reading}

- [Stav výzkumu: Odolnost proti cenzuře díky PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS – návrhy trhů s akceptovatelnými poplatky](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS a odolnost proti cenzuře](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Seznamy zařazení transakcí](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
