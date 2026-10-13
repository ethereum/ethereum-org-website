---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Zjistěte více o aktualizaci protokolu Hegotá"
lang: cs
template: upgrade
---

Hegotá je aktualizace sítě [Etherea](/), u které se očekává, že bude následovat po aktualizaci [Glamsterdam](/roadmap/glamsterdam/). Její název vznikl spojením slov „Bogotá“ (aktualizace exekuční vrstvy, pojmenovaná po předchozím místě konání konference Devcon) a „Heze“ (aktualizace vrstvy konsensu, pojmenovaná po hvězdě).

Hegotá je v rané fázi plánování. Její hlavní bod byl již vybrán a od té doby byla naplánována druhá změna, ale o zbytku rozsahu se stále rozhoduje a nebyla stanovena žádná data.

## Hlavní bod: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Seznamy pro zahrnutí vynucené volbou forku (FOCIL, neboli Návrh na vylepšení Etherea (EIP-7805)) se týkají [odolnosti vůči cenzuře](/roadmap/security/#censorship-resistance): zajišťují, že se platná transakce dostane do bloku, i když by ji lidé, kteří tvoří bloky, raději vynechali.

Dnes každý blok vytváří jediný [validátor](/glossary/#validator) a rozhoduje o tom, jaké transakce bude obsahovat. Kdokoli, kdo dokáže ovlivnit dostatek tvůrců bloků, tak může zpozdit transakci a uživatel nemá jinou možnost, jak situaci řešit, než čekat a doufat.

FOCIL toto rozhodnutí rozděluje mezi mnoho validátorů. Každý výbor navrhne seznam transakcí, které by měly být zahrnuty, a pravidla protokolu zavazují tvůrce bloku, aby tyto seznamy respektoval. Cenzurování transakce tak přestává být něčím, co může jedna strana provádět sama.

## Rámcové transakce {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Rámcové transakce (Návrh na vylepšení Etherea (EIP-8141)) umožňují [účtu](/glossary/#account) samostatně rozhodnout, co se počítá jako platná transakce, místo toho, aby protokol trval na jednom pevném schématu podpisu.

Dnes je každá transakce autorizována stejným způsobem: jedním podpisem z jednoho klíče. [Účty chytrých kontraktů](/roadmap/account-abstraction/) to obcházejí směrováním transakcí přes dodatečnou infrastrukturu, což stojí gas a přidává pohyblivé části, které mohou selhat.

Rámcová transakce přesouvá tuto kontrolu do samotného účtu. Účet spouští svou vlastní ověřovací logiku, takže funkce, které v současnosti potřebují tuto dodatečnou infrastrukturu – sociální obnova, limity útraty, vyžadování několika schválení, možnost nechat někoho jiného zaplatit gas – se stávají věcmi, které protokol podporuje přímo.

Protože si účet volí svá vlastní pravidla, může si také zvolit schéma podpisu, které by kvantový počítač nedokázal prolomit. To z tohoto návrhu činí krok směrem ke [kvantové odolnosti](/roadmap/security/#quantum-resistance) a také k lepším peněženkám.

## Co dalšího je v Hegotá {#scope}

Zatím nebylo rozhodnuto. FOCIL a rámcové transakce jsou dvě dosud naplánované změny; byly navrženy desítky dalších a žádná z nich není definitivně schválena. Tato stránka zůstane stručná, dokud se rozsah neustálí – pro aktuální stav diskuse se podívejte na zdroje níže.

## Další čtení {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — živý stav každého návrhu
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Technická specifikace EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Technická specifikace EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Plán vývoje Etherea](/roadmap/)
