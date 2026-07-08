---
title: Oddělení navrhovatele a tvůrce
description: Zjistěte, jak a proč validátoři Etherea rozdělí své povinnosti týkající se tvorby a vysílání bloků.
lang: cs
---

Současní validátoři [Etherea](/) vytvářejí _a_ vysílají bloky. Sdružují transakce, o kterých se dozvěděli prostřednictvím sítě typu gossip, a balí je do bloku, který je odeslán uzlům (peers) v síti Ethereum. **Oddělení navrhovatele a tvůrce (PBS)** rozděluje tyto úkoly mezi více validátorů. Tvůrci bloků se stávají zodpovědnými za vytváření bloků a jejich nabízení navrhovateli bloku v každém slotu. Navrhovatel bloku nevidí obsah bloku, jednoduše si vybere ten nejvýnosnější, přičemž obdrží poplatek od tvůrce bloku (nebo tvůrce zaplatí navrhovateli nabídkovou cenu), než blok odešle svým uzlům (peers).

Toto je důležitý upgrade z několika důvodů. Zaprvé vytváří příležitosti, jak zabránit cenzuře transakcí na úrovni protokolu. Zadruhé brání tomu, aby byli amatérští validátoři vytlačeni institucionálními hráči, kteří dokážou lépe optimalizovat ziskovost své tvorby bloků. Zatřetí pomáhá se škálováním Etherea tím, že umožňuje upgrady dankshardingu.

## PBS a odolnost vůči cenzuře {#pbs-and-censorship-resistance}

Oddělení tvůrců bloků a navrhovatelů bloků značně ztěžuje tvůrcům bloků cenzurovat transakce. Je to proto, že lze přidat poměrně složitá kritéria pro zahrnutí, která zajistí, že před navržením bloku nedošlo k žádné cenzuře. Jelikož je navrhovatel bloku samostatnou entitou od tvůrce bloku, může převzít roli ochránce proti cenzurujícím tvůrcům bloků.

Lze například zavést seznamy pro zahrnutí (inclusion lists), takže když validátoři vědí o transakcích, ale nevidí je zahrnuté v blocích, mohou je vynutit jako povinné v dalším bloku. Seznam pro zahrnutí je generován z lokálního mempoolu navrhovatele bloku (seznam transakcí, o kterých ví) a odeslán jeho uzlům (peers) těsně před navržením bloku. Pokud některá z transakcí ze seznamu pro zahrnutí chybí, navrhovatel by mohl blok buď odmítnout, přidat chybějící transakce před jeho navržením, nebo jej navrhnout a nechat jej odmítnout ostatními validátory, když jej obdrží. Existuje také potenciálně efektivnější verze této myšlenky, která tvrdí, že tvůrci musí plně využít dostupný prostor bloku, a pokud tak neučiní, transakce se přidají ze seznamu pro zahrnutí navrhovatele. Toto je stále oblast aktivního výzkumu a optimální konfigurace pro seznamy pro zahrnutí zatím nebyla stanovena.

[Šifrované mempooly](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) by také mohly znemožnit tvůrcům a navrhovatelům zjistit, které transakce do bloku zahrnují, dokud blok již není vyslán.

<ExpandableCard title="Jaké druhy cenzury řeší PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Mocné organizace mohou vyvíjet tlak na validátory, aby cenzurovali transakce na určité adresy nebo z nich. Validátoři tomuto tlaku vyhoví tím, že ve svém transakčním poolu detekují adresy na černé listině a vynechají je z bloků, které navrhují. Po zavedení PBS to již nebude možné, protože navrhovatelé bloků nebudou vědět, které transakce ve svých blocích vysílají. Pro určité jednotlivce nebo aplikace může být důležité dodržovat pravidla cenzury, například když se to v jejich regionu stane zákonem. V těchto případech probíhá dodržování předpisů na aplikační úrovni, zatímco protokol zůstává nevyžadující povolení a bez cenzury.

</ExpandableCard>

## PBS a MEV {#pbs-and-mev}

**Maximální vytěžitelná hodnota (MEV)** označuje situaci, kdy validátoři maximalizují svou ziskovost výhodným uspořádáním transakcí. Mezi běžné příklady patří arbitrážní swapy na decentralizovaných burzách (např. frontrunning velkého prodeje nebo nákupu) nebo identifikace příležitostí k likvidaci pozic v decentralizovaných financích (DeFi). Maximalizace MEV vyžaduje sofistikované technické know-how a vlastní software připojený k běžným validátorům, což značně zvyšuje pravděpodobnost, že institucionální provozovatelé překonají jednotlivce a amatérské validátory v těžbě MEV. To znamená, že výnosy ze stakingu budou pravděpodobně vyšší u centralizovaných provozovatelů, což vytváří centralizační sílu, která odrazuje od domácího stakingu.

PBS tento problém řeší rekonfigurací ekonomiky MEV. Místo toho, aby navrhovatel bloku prováděl vlastní hledání MEV, jednoduše si vybere blok z mnoha, které mu nabídnou tvůrci bloků. Tvůrci bloků možná provedli sofistikovanou těžbu MEV, ale odměna za ni připadne navrhovateli bloku. To znamená, že i když malá skupina specializovaných tvůrců bloků dominuje těžbě MEV, odměna za ni může připadnout jakémukoli validátorovi v síti, včetně jednotlivých domácích stakerů.

<ExpandableCard title="Proč je v pořádku centralizovat tvorbu bloků?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Jednotlivci by mohli být motivováni ke stakingu v poolech spíše než na vlastní pěst kvůli zvýšeným odměnám nabízeným sofistikovanými strategiemi MEV. Oddělení tvorby bloku od návrhu bloku znamená, že vytěžené MEV bude rozděleno mezi více validátorů, místo aby se centralizovalo u nejefektivnějšího hledače MEV. Zároveň to, že je umožněna existence specializovaných tvůrců bloků, zbavuje jednotlivce břemene tvorby bloků a také brání jednotlivcům v tom, aby si MEV ukradli pro sebe, a zároveň maximalizuje počet jednotlivých, nezávislých validátorů, kteří mohou kontrolovat, zda jsou bloky poctivé. Důležitým konceptem je „asymetrie dokazovatele a ověřovatele“ (prover-verifier asymmetry), což odkazuje na myšlenku, že centralizovaná produkce bloků je v pořádku, pokud existuje robustní a maximálně decentralizovaná síť validátorů schopných prokázat, že bloky jsou poctivé. Decentralizace je prostředek, nikoli konečný cíl – to, co chceme, jsou poctivé bloky.
</ExpandableCard>

## PBS a danksharding {#pbs-and-danksharding}

Danksharding je způsob, jakým bude Ethereum škálovat na >100 000 transakcí za sekundu a minimalizovat poplatky pro uživatele rollupů. Spoléhá se na PBS, protože zvyšuje pracovní zátěž pro tvůrce bloků, kteří budou muset vypočítat důkazy pro až 64 MB dat rollupu za méně než 1 sekundu. To bude pravděpodobně vyžadovat specializované tvůrce, kteří mohou tomuto úkolu věnovat poměrně značný hardware. V současné situaci by se však tvorba bloků mohla kvůli těžbě MEV stejně stále více centralizovat kolem sofistikovanějších a výkonnějších provozovatelů. Oddělení navrhovatele a tvůrce je způsob, jak tuto realitu přijmout a zabránit jí ve vyvíjení centralizační síly na validaci bloků (ta důležitá část) nebo na distribuci odměn za staking. Skvělým vedlejším přínosem je, že specializovaní tvůrci bloků jsou také ochotni a schopni vypočítat potřebné datové důkazy pro danksharding.

## Současný pokrok {#current-progress}

PBS je v pokročilé fázi výzkumu, ale stále existují některé důležité otázky týkající se návrhu, které je třeba vyřešit, než bude možné vytvořit jeho prototyp v klientech Etherea. Zatím neexistuje žádná finalizovaná specifikace. To znamená, že PBS je pravděpodobně vzdáleno rok nebo více. Podívejte se na nejnovější [stav výzkumu](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Další čtení {#further-reading}

- [Stav výzkumu: odolnost vůči cenzuře v rámci PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Návrhy trhu s poplatky přátelské k PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS a odolnost vůči cenzuře](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Seznamy pro zahrnutí (Inclusion lists)](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)