---
title: Úvod do chytrých kontraktů
metaTitle: "Chytré kontrakty: Co to je a jaké mají výhody"
description: Netechnický úvod do chytrých kontraktů
lang: cs
---

Chytré kontrakty jsou základními stavebními kameny aplikační vrstvy [Etherea](/). Jsou to počítačové programy uložené na [blockchainu](/glossary/#blockchain), které se řídí logikou „když se stane toto, udělej tamto“, a je zaručeno, že se provedou podle pravidel definovaných jejich kódem, který po vytvoření nelze změnit.

Termín „chytrý kontrakt“ poprvé použil Nick Szabo. V roce 1994 napsal [úvod do tohoto konceptu](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) a v roce 1996 sepsal [studii o tom, co by chytré kontrakty mohly dokázat](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo si představoval digitální tržiště, kde automatické, [kryptograficky zabezpečené](/glossary/#cryptography) procesy umožňují provádění transakcí a obchodních funkcí bez důvěryhodných zprostředkovatelů. Chytré kontrakty na Ethereu uvádějí tuto vizi do praxe.

Podívejte se, jak Finematics vysvětluje chytré kontrakty:

<VideoWatch slug="smart-contracts-code-is-law" />

## Důvěra v tradiční kontrakty {#trust-and-contracts}

Jedním z největších problémů tradičního kontraktu je potřeba důvěryhodných osob, které zajistí dodržení jeho výsledků.

Zde je příklad:

Alice a Bob závodí na kolech. Řekněme, že se Alice vsadí s Bobem o 10 dolarů, že závod vyhraje. Bob je přesvědčen, že vyhraje on, a sázku přijímá. Nakonec Alice dokončí závod s velkým náskokem před Bobem a je jasnou vítězkou. Bob ale odmítá sázku vyplatit a tvrdí, že Alice musela podvádět.

Tento hloupý příklad ilustruje problém s jakoukoli dohodou, která není „chytrá“. I když jsou podmínky dohody splněny (tj. jste vítězem závodu), stále musíte důvěřovat jiné osobě, že dohodu splní (tj. vyplatí sázku).

## Digitální prodejní automat {#vending-machine}

Jednoduchou metaforou pro chytrý kontrakt je prodejní automat, který funguje do jisté míry podobně jako chytrý kontrakt – specifické vstupy zaručují předem stanovené výstupy.

- Vyberete si produkt
- Prodejní automat zobrazí cenu
- Zaplatíte cenu
- Prodejní automat ověří, že jste zaplatili správnou částku
- Prodejní automat vám vydá vaši položku

Prodejní automat vydá požadovaný produkt až po splnění všech požadavků. Pokud si nevyberete produkt nebo nevložíte dostatek peněz, prodejní automat vám produkt nevydá.

## Automatické provádění {#automation}

Hlavní výhodou chytrého kontraktu je, že při splnění určitých podmínek deterministicky provede jednoznačný kód. Není třeba čekat, až výsledek interpretuje nebo vyjedná člověk. Tím odpadá potřeba důvěryhodných zprostředkovatelů.

Můžete například napsat chytrý kontrakt, který drží prostředky v úschově pro dítě a umožní mu je vybrat až po určitém datu. Pokud se pokusí o výběr před tímto datem, chytrý kontrakt se neprovede. Nebo můžete napsat kontrakt, který vám automaticky vydá digitální verzi technického průkazu k autu, jakmile zaplatíte prodejci.

## Předvídatelné výsledky {#predictability}

Tradiční kontrakty jsou nejednoznačné, protože spoléhají na to, že je lidé budou interpretovat a implementovat. Například dva soudci mohou interpretovat kontrakt odlišně, což by mohlo vést k nekonzistentním rozhodnutím a nerovným výsledkům. Chytré kontrakty tuto možnost odstraňují. Místo toho se chytré kontrakty provádějí přesně na základě podmínek zapsaných v kódu kontraktu. Tato přesnost znamená, že za stejných okolností přinese chytrý kontrakt vždy stejný výsledek.

## Veřejný záznam {#public-record}

Chytré kontrakty jsou užitečné pro audity a sledování. Vzhledem k tomu, že chytré kontrakty na Ethereu jsou na veřejném blockchainu, kdokoli může okamžitě sledovat převody aktiv a další související informace. Můžete například zkontrolovat, zda někdo poslal peníze na vaši adresu.

## Ochrana soukromí {#privacy-protection}

Chytré kontrakty také chrání vaše soukromí. Vzhledem k tomu, že Ethereum je pseudonymní síť (vaše transakce jsou veřejně vázány na jedinečnou kryptografickou adresu, nikoli na vaši identitu), můžete chránit své soukromí před pozorovateli.

## Viditelné podmínky {#visible-terms}

A konečně, stejně jako u tradičních kontraktů, můžete před podepsáním zkontrolovat, co je v chytrém kontraktu obsaženo. Na rozdíl od tradičního kontraktu umožňuje onchain transparentnost chytrého kontraktu komukoli jej před interakcí podrobně prozkoumat a zkontrolovat. 

Ačkoli si však kdokoli může prohlédnout podmínky chytrého kontraktu, surová data transakce jsou navržena tak, aby je interpretovaly aplikace a peněženky, nikoli lidé. Protože jsou tato data tak obtížně čitelná, uživatelé často čelí velkému bezpečnostnímu riziku zvanému „slepé podepisování“ (blind signing), neboli schvalování transakce, která interaguje s chytrým kontraktem, aniž by ve skutečnosti chápali, co udělá. 

Ekosystém Etherea přechází na standardy **[jasného podepisování (Clear Signing)](https://clearsigning.org/)** (konkrétně [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). Jasné podepisování překládá neprůhledná data chytrého kontraktu do srozumitelných, lidsky čitelných popisů transakcí, čímž zajišťuje, že kdokoli může pochopit skutečný záměr kontraktu předtím, než jej podepíše.

## Případy užití chytrých kontraktů {#use-cases}

Chytré kontrakty dokážou v podstatě cokoli, co dokážou počítačové programy.

Mohou provádět výpočty, vytvářet měnu, ukládat data, razit [NFT](/glossary/#nft), odesílat komunikaci a dokonce generovat grafiku. Zde jsou některé populární příklady z reálného světa:

- [Stablecoiny](/stablecoins/)
- [Vytváření a distribuce unikátních digitálních aktiv](/nft/)
- [Automatická, otevřená směnárna měn](/get-eth/#dex)
- [Decentralizované hraní](/apps/categories/gaming)
- [Pojistka, která se automaticky vyplácí](https://etherisc.com/)
- [Standard, který lidem umožňuje vytvářet přizpůsobené, interoperabilní měny](/developers/docs/standards/tokens/)

## Další čtení {#further-reading}

- [Jak chytré kontrakty změní svět](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Chytré kontrakty pro vývojáře](/developers/docs/smart-contracts/)
- [Naučte se psát chytré kontrakty](/developers/learning-tools/)
- [Mastering Ethereum – Co je to chytrý kontrakt?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />