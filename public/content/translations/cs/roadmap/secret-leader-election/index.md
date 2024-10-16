---
title: Tajná volba lídra
description: Vysvětlení, jak tajná volba lídra může pomoci ochránit validátory před útoky
lang: cs
summaryPoints:
  - IP adresa navrhovatelů bloků může být známa předem, což je činí zranitelnými vůči útokům.
  - Tajná volba lídra skrývá identitu validátorů, takže je nelze znát předem.
  - Rozšířením této myšlenky je náhodný výběr validátora v každém slotu.
---

# Tajná volba lídra {#single-secret-leader-election}

V dnešním mechanismu konsensu založeném na [důkazu podílem](/developers/docs/consensus-mechanisms/pos) je seznam budoucích navrhovatelů bloků veřejný a lze mapovat jejich IP adresy. To znamená, že útočníci by mohli identifikovat, kteří validátoři mají navrhnout blok, a zaměřit se na ně útokem denial-of-service (DOS), který jim nedovolí blok včas navrhnout.

To by mohlo dát útočníkovi příležitost vydělat. Např. navrhovatel bloku vybraný pro slot `n+1` by mohl DOS navrhovatele ve slotu `n`, takže by nestihl navrhnout blok. To by umožnilo útočícímu navrhovateli bloku extrahovat MEV obou slotů nebo vzít všechny transakce, které měly být rozděleny do dvou bloků, a místo toho je všechny zahrnout do jednoho, čímž by získal všechny poplatky, které s nimi souvisejí. V ohrožení jsou zejména domácí validátoři, nikoli sofistikovaní institucionální validátoři, kteří se mohou chránit před útoky DOS pomocí pokročilejších metod, a mohli by proto být centralizační silou.

Existuje několik řešení tohoto problému. Jedním z nich je [Technologie distribuovaných validátorů](https://github.com/ethereum/distributed-validator-specs), jejímž cílem je rozdělit různé úkoly související se spuštěním validátoru na více počítačů s redundancí, takže pro útočníka je mnohem těžší zabránit navržení bloku v konkrétním slotu. Nejrobustnějším řešením je však **tajná volba jediného lídra (Single Secret Leader Election, SSLE)**.

## Tajná volba jediného lídra {#secret-leader-election}

V SSLE se používá chytrá kryptografie, která zajišťuje, že pouze vybraný validátor ví, že byl vybrán. Funguje to tak, že se každý validátor zaváže k tajemství sdílenému všemi. Tyto závazky se zamíchají a překonfigurují tak, aby nikdo nemohl mapovat závazky validátorů, ale každý validátor ví, který závazek k němu patří. Poté je náhodně vybrán jeden závazek. Pokud validátor zjistí, že byl vybrán jeho závazek, ví, že je řada na něm, aby navrhl blok.

Hlavní implementace této myšlenky se nazývá [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Funguje takto:

1. Validátoři se zavazují ke sdílenému tajemství. Schéma závazku je navrženo tak, že může být vázáno na identitu validátora, ale také randomizováno, takže žádná třetí strana nemůže zpětně tuto vazbu zanalyzovat a tím propojit konkrétní závazek s konkrétním validátorem.
2. Na začátku epochy je náhodně vybrána sada validátorů, která pomocí RANDAO odebere vzorky závazků od 16 384 validátorů.
3. Pro dalších 8 182 slotů (1 den) se navrhovatelé bloků promíchají a náhodně rozdělí podmnožinu závazků pomocí své vlastní entropie.
4. Po dokončení míchání se RANDAO používá k vytvoření uspořádaného seznamu závazků. Tento seznam je namapován na sloty Etherea.
5. Validátoři vidí, že jejich závazek je připojen ke konkrétnímu slotu, a když tento slot přijde na řadu, navrhnou blok.
6. Tyto kroky se opakují tak, aby přiřazení závazků ke slotům bylo vždy daleko před aktuálním slotem.

To brání útočníkům, aby předem věděli, který konkrétní validátor navrhne další blok, což zabraňuje DOS útokům.

## Tajné volby bez jediného vůdce (SnSLE) {#secret-non-single-leader-election}

Existuje také samostatný návrh, jehož cílem je vytvořit scénář, ve kterém má každý validátor náhodnou šanci navrhnout blok v každém slotu, podobně jako tomu bylo v rámci důkazu prací. Tento systém je znám jako **tajná volba bez jediného vůdce (SnSLE)**. Jednoduchým způsobem, jak toho dosáhnout, je využít funkci RANDAO, která se používá k náhodnému výběru validátorů v dnešním protokolu. Myšlenkou RANDAO je, že dostatečně náhodné číslo je generováno smícháním hashů předložených mnoha nezávislými validátory. V SnSLE lze tyto hashe použít k výběru dalšího navrhovatele bloku, např. výběrem hashe s nejnižší hodnotou. Rozsah platných hashů může být omezen, což sjednotí pravděpodobnost výběru jednotlivých validátorů v každém slotu. Pokud hash musí být menší než `2^256 * 5 / N`, kde `N` = počet aktivních validátorů, je šance, že bude vybrán jakýkoliv jednotlivý validátor v každém slotu, `5/N`. V tomto příkladu by byla 99,3% šance, že alespoň jeden navrhovatel vygeneruje platný hash v každém slotu.

## Aktuální průběh {#current-progress}

Jak SSLE, tak SnSLE jsou ve fázi výzkumu. Pro žádný z nápadů zatím neexistuje konečná specifikace. SSLE a SnSLE jsou konkurenční návrhy, které nemohly být implementovány najednou. Před implementací je potřeba další výzkum a vývoj, prototypování a implementace na veřejných testovacích sítích.

## Další informace {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
