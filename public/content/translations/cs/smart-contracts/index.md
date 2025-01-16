---
title: Chytré kontrakty
description: Netechnický úvod do chytrých kontraktů
lang: cs
---

# Úvod do chytrých kontraktů {#introduction-to-smart-contracts}

Chytré kontrakty jsou základními stavebními kameny aplikační vrstvy Etherea. Jsou to počítačové programy uložené na [blockchainu](/glossary/#blockchain), které se řídí logikou „jestli tohle, tak tamto“ a je zaručeno, že se spouštějí podle pravidel definovaných svým kódem, který po vytvoření nelze měnit.

Nick Szabo zavedl termín „chytrý kontrakt“. V roce 1994 napsal [úvod do tohoto konceptu](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) a v roce 1996 napsal [výzkum činností, které by chytré kontrakty mohly dělat](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo popsal digitální tržiště, kde automatické, [kryptografií zabezpečené](/glossary/#cryptography), procesy umožňují provádění transakcí a obchodních funkcí bez důvěryhodných zprostředkovatelů. Chytré kontrakty na Ethereu tuto vizi uvedly do praxe.

Koukněte se, jak vysvětlují chytré kontrakty na Finematics:

<YouTube id="pWGLtjG-F5c" />

## Důvěra v konvenční kontrakty {#trust-and-contracts}

Jedním z největších problémů tradičních kontraktů je, že vyžadují, aby důvěryhodné osoby dodržely podmínky kontraktu.

Tady je ukázka:

Představme si, že Alice a Bob jedou cyklistický závod. Řekněme, že Alice se vsadí s Bobem o 10 dolarů, že vyhraje závod. Bob si je jistý, že bude vítězem a souhlasí se sázkou. Alice nakonec dojede do cíle o hodně dříve než Bob a je jasným vítězem. Bob však odmítá vyplatit sázku a tvrdí, že Alice musela podvádět.

Tento jednoduchý příklad ilustruje problém s jakoukoliv dohodou, která není založená na chytrém kontraktu. I když jsou podmínky dohody splněny (tj. jste vítězem závodu), musíte stále důvěřovat jiné osobě, že splní svou část dohody (např. že vám vyplatí výhru).

## Digitální výdejní automat {#vending-machine}

Jednoduchá metafora pro chytrý kontrakt je prodejní automat, který funguje podobně jako chytrý kontrakt – konkrétní vstupy zaručují předem stanovené výstupy.

- Vyberete produkt
- Automat zobrazí cenu
- Zaplatíte
- Automat ověří, že jste zaplatili správnou částku
- Automat vám vydá vybraný produkt

Prodejní automat vám vydá požadovaný produkt až po splnění všech požadavků. Pokud si nevyberete produkt nebo nevložíte dostatek peněz, prodejní automat vám produkt nevydá.

## Automatické vykonání požadovaného výsledku {#automation}

Hlavní výhodou chytrého kontraktu je, že deterministicky provádí jednoznačný kód, pokud jsou splněny určité podmínky. Není třeba čekat na lidskou interpretaci nebo vyjednávat o výsledku. Tím odpadá potřeba důvěryhodných zprostředkovatelů.

Například můžete sepsat chytrý kontrakt, který drží finanční prostředky v úschově pro dítě, a umožní mu vybrat finanční prostředky až po určitém datu. Pokud se pokusí vybrat prostředky před tímto datem, chytrý kontrakt tuto operaci neumožní. Nebo můžete sepsat kontrakt, který vám automaticky poskytne digitální verzi vlastnictví vozidla, když zaplatíte prodejci.

## Předpovídatelné výsledky {#predictability}

Tradiční kontrakty jsou nejednoznačné, protože se spoléhají na to, že je interpretují a realizují lidé. Například dva soudci mohou vykládat kontrakt odlišnými způsoby, což může vést k nekonzistentním rozhodnutím a odlišným výsledkům. Chytré kontrakty tuto variantu neumožňují. Místo toho se chytré kontrakty exekuují přesně na základě podmínek napsaných v kódu kontraktu. Tato přesnost znamená, že za stejných okolností bude chytrý kontrakt poskytovat stejný výsledek.

## Veřejný záznam {#public-record}

Chytré kontrakty jsou užitečným nástrojem pro audity a sledování. Jelikož jsou ethereovské chytré kontrakty na veřejném blockchainu, každý může okamžitě sledovat převody aktiv a další související informace. Můžete například zkontrolovat, zda někdo poslal peníze na vaši adresu.

## Ochrana soukromí {#privacy-protection}

Chytré kontrakty také chrání vaše soukromí. Protože je Ethereum pseudonymní síť (vaše transakce jsou veřejně vázány na jedinečnou kryptografickou adresu, ne vaši identitu), můžete chránit své soukromí před pozorovateli.

## Transparentní podmínky {#visible-terms}

A konečně, stejně jako v případě tradičních kontraktů, můžete prozkoumat, co je obsahem chytrého kontraktu před tím, než ho podepíšete (nebo s ním budete interagovat jiným způsobem). Transparentnost chytrého kontraktu zaručuje, že si ho může prohlédnout kdokoli.

## Využití chytrých kontraktů {#use-cases}

Chytré kontrakty umí v podstatě cokoli, co umí počítačové programy.

Mohou provádět výpočty, vytvářet měnu, ukládat data, těžit [NFT](/glossary/#nft), odesílat komunikaci a dokonce generovat grafiku. Zde jsou některé reálné populární příklady:

- [Stablecoiny](/stablecoins/)
- [Vytváření a distribuce jedinečných digitálních majetků](/nft/)
- [Automatická otevřená směnárna](/get-eth/#dex)
- [Decentralizované počítačové hry](/dapps/?category=gaming#explore)
- [Pojistná smlouva, která automaticky vyplatí plnění](https://etherisc.com/)
- [Standard, který umožňuje vytvářet interoperabilní měny dle konkrétních požadavků](/developers/docs/standards/tokens/)

## Další informace {#further-reading}

- [Jak chytré kontrakty změní svět](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Chytré kontrakty: Blockchainová technologie, která nahradí právníky](https://blockgeeks.com/guides/smart-contracts/)
- [Chytré kontrakty pro vývojáře](/developers/docs/smart-contracts/)
- [Naučte se psát chytré kontrakty](/developers/learning-tools/)
- [Pochopení Etherea – Co je chytrý kontrakt?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
