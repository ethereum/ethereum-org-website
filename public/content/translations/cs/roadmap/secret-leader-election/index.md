---
title: Tajná volba lídra
description: Vysvětlení, jak může tajná volba lídra pomoci chránit validátory před útoky
lang: cs
summaryPoints:
  - IP adresy navrhovatelů bloků mohou být známy předem, což je činí zranitelnými vůči útokům.
  - Tajná volba lídra skrývá identitu validátorů, takže je nelze zjistit předem.
  - Rozšířením této myšlenky je náhodný výběr validátoru v každém slotu.
---

V dnešním mechanismu konsensu založeném na [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos) je seznam nadcházejících navrhovatelů bloků veřejný a je možné zmapovat jejich IP adresy. To znamená, že útočníci by mohli identifikovat, kteří validátoři mají navrhnout blok, a zaměřit se na ně útokem odepření služby (DOS), kvůli kterému nebudou schopni navrhnout svůj blok včas.

To by mohlo útočníkovi vytvořit příležitosti k zisku. Například navrhovatel bloku vybraný pro slot `n+1` by mohl provést DOS útok na navrhovatele ve slotu `n`, takže by propásl svou příležitost navrhnout blok. To by útočícímu navrhovateli bloku umožnilo vytěžit MEV z obou slotů, nebo shrábnout všechny transakce, které měly být rozděleny do dvou bloků, a místo toho je zahrnout do jednoho, čímž by získal všechny související poplatky. To pravděpodobně ovlivní domácí validátory více než sofistikované institucionální validátory, kteří mohou k ochraně před DOS útoky využít pokročilejší metody, a mohlo by to tedy působit jako centralizační síla.

Existuje několik řešení tohoto problému. Jedním z nich je [technologie distribuovaných validátorů (DVT)](https://github.com/ethereum/distributed-validator-specs), jejímž cílem je rozložit různé úkoly spojené s provozem validátoru na více strojů s redundancí, takže je pro útočníka mnohem těžší zabránit navržení bloku v konkrétním slotu. Nejrobustnějším řešením je však **tajná volba jediného lídra (Single Secret Leader Election – SSLE)**.

## Tajná volba jediného lídra {#secret-leader-election}

V SSLE se využívá chytrá kryptografie k zajištění toho, aby pouze vybraný validátor věděl, že byl vybrán. Funguje to tak, že každý validátor předloží závazek k tajemství, které všichni sdílejí. Závazky jsou zamíchány a překonfigurovány tak, aby nikdo nemohl přiřadit závazky k validátorům, ale každý validátor ví, který závazek patří jemu. Poté je náhodně vybrán jeden závazek. Pokud validátor zjistí, že byl vybrán jeho závazek, ví, že je na řadě, aby navrhl blok.

Přední implementace této myšlenky se nazývá [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Funguje následovně:

1. Validátoři se zavážou ke sdílenému tajemství. Závazkové schéma je navrženo tak, aby mohlo být svázáno s identitou validátoru, ale zároveň randomizováno, takže žádná třetí strana nemůže zpětně analyzovat vazbu a spojit konkrétní závazek s konkrétním validátorem.
2. Na začátku epochy je pomocí RANDAO vybrána náhodná skupina validátorů, která vzorkuje závazky od 16 384 validátorů.
3. Po dalších 8182 slotů (1 den) navrhovatelé bloků míchají a randomizují podmnožinu závazků pomocí své vlastní soukromé entropie.
4. Po dokončení míchání se pomocí RANDAO vytvoří seřazený seznam závazků. Tento seznam je namapován na sloty Etherea.
5. Validátoři vidí, že je jejich závazek připojen ke konkrétnímu slotu, a když tento slot nastane, navrhnou blok.
6. Tyto kroky se opakují, takže přiřazení závazků ke slotům je vždy daleko před aktuálním slotem.

To brání útočníkům předem vědět, který konkrétní validátor navrhne další blok, čímž se zamezuje možnosti DOS útoků.

## Tajná volba více lídrů (SnSLE) {#secret-non-single-leader-election}

Existuje také samostatný návrh, jehož cílem je vytvořit scénář, ve kterém má každý validátor náhodnou šanci navrhnout blok v každém slotu, podobně jako se o návrhu bloku rozhodovalo v rámci důkazu prací (PoW). Tento koncept je známý jako **tajná volba více lídrů (secret non-single leader election – SnSLE)**. Jedním z jednoduchých způsobů, jak toho dosáhnout, je využití funkce RANDAO, která se v dnešním protokolu používá k náhodnému výběru validátorů. Myšlenka RANDAO spočívá v tom, že se vygeneruje dostatečně náhodné číslo smícháním hashů předložených mnoha nezávislými validátory. V SnSLE by tyto hashe mohly být použity k výběru dalšího navrhovatele bloku, například výběrem hashe s nejnižší hodnotou. Rozsah platných hashů by mohl být omezen, aby se vyladila pravděpodobnost výběru jednotlivých validátorů v každém slotu. Stanovením, že hash musí být menší než `2^256 * 5 / N`, kde `N` = počet aktivních validátorů, by šance na výběr jakéhokoli jednotlivého validátoru v každém slotu byla `5/N`. V tomto příkladu by existovala 99,3% šance, že alespoň jeden navrhovatel vygeneruje platný hash v každém slotu.

## Současný pokrok {#current-progress}

SSLE i SnSLE jsou obě ve fázi výzkumu. Zatím neexistuje žádná finalizovaná specifikace pro žádnou z těchto myšlenek. SSLE a SnSLE jsou konkurenční návrhy, které by nemohly být implementovány oba současně. Před nasazením vyžadují další výzkum a vývoj, prototypování a implementaci na veřejných testnetech.

## Další čtení {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)