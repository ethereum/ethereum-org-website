---
title: Smart kontrakty
description: Netechnický úvod do smart kontraktov
lang: sk
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Smart kontrakty sú základnými stavebnými kameňmi aplikačnej vrstvy Etherea. Sú to počítačové programy uložené na [blockchaine](/glossary/#blockchain), ktorá sa riadi logikou „ak toto, tak tamto“ a je zaručené, že sa spúšťajú podľa pravidiel definovaných svojim kódom, ktorý po vytvorení nie je možné meniť.

Nick Szabo zaviedol termín „smart kontrakt“. V roku 1994 napísal [úvod do tohoto konceptu](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), a v roku 1996 napísal [prieskum činností, ktoré by smart kontrakty mohli robiť](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo popísal digitálnu tržnicu, kde automatické, [kryptografiou zabezpečené](/glossary/#cryptography) procesy umožňujú prevádzanie transakcií a obchodných funkcií bez dôveryhodných sprostredkovateľov. Smart kontrakty na Ethereu túto víziu uviedli do praxe.

Pozrite sa, ako vysvetľujú smart kontrakty na Finematics:

<YouTube id="pWGLtjG-F5c" />

## Dôvera v konvenčné kontrakty {#trust-and-contracts}

Jedným z najväčších problémov tradičných kontraktov je, že vyžadujú, aby dôveryhodné osoby dodržali podmienky kontraktu.

Tu je príklad:

Predstavme si, že Alica a Bob pretekajú na bicykloch. Povedzme, že Alica sa vsadí s Bobom o 10 dolárov, že vyhrá. Bob si je istý, že zvíťazí a súhlasí so stávkou. Alice nakoniec dôjde do cieľa oveľa skôr ako Bob a je jasnou víťazkou. Bob však odmieta vyplatiť stávku a tvrdí, že Alice musela podvádzať.

Tento jednoduchý príklad ilustruje problém s akoukoľvek dohodou, ktorá nie je založená na smart kontrakte. Aj keď sú podmienky dohody splnené (t. j. ste víťazom závodu), stále musíte dôverovať inej osobe, že splní svoju časť dohody (t. j. vyplatí stávku).

## A digital vending machine {#vending-machine}

Jednoduchá metafora pre smart kontrakt je predajný automat, ktorý funguje podobne ako smart kontrakt – konkrétne vstupy zaručujú vopred stanovené výstupy.

- Vyberiete produkt
- Automat zobrazí cenu
- Zaplatíte
- Automat overí, že ste zaplatili správnu čiastku
- Automat vám vydá vybraný produkt

Predajný automat vám vydá požadovaný produkt až po splnení všetkých požiadaviek. Pokiaľ si nevyberiete produkt alebo nevložíte dostatok peňazí, predajný automat vám produkt nevydá.

## Automatické vykonanie {#automation}

Hlavnou výhodou smart kontraktu je, že deterministicky vykonáva jednoznačný kód, pokiaľ sú splnené určité podmienky. Nie je potrebné čakať na ľudskú interpretáciu alebo vyjednávať o výsledku. Tým odpadá potreba dôveryhodných sprostredkovateľov.

Napríklad môžete spísať smart kontrakt, ktorý drží finančné prostriedky v úschove pre dieťa, a umožní mu vybrať finančné prostriedky až po určitom dátume. Ak sa pokúsi vybrať prostriedky pred týmto dátumom, smart kontrakt túto operáciu neumožní. Alebo môžete spísať kontrakt, ktorý vám automaticky poskytne digitálnu verziu vlastníctva vozidla, keď zaplatíte predajcovi.

## Predvídateľne výsledky {#predictability}

Tradičné kontrakty sú nejednoznačné, pretože sa spoliehajú na to, že ich interpretujú a realizujú ľudia. Napríklad dvaja sudcovia môžu vykladať kontrakt odlišnými spôsobmi, čo môže viesť k nekonzistentným rozhodnutiam a odlišným výsledkom. Smart kontrakty túto variantu neumožňujú. Namiesto toho sa smart kontrakty vykonávajú presne na základe podmienok napísaných v kóde kontraktu. Táto presnosť znamená, že za rovnakých okolností bude smart kontrakt poskytovať rovnaký výsledok.

## Verejný záznam {#public-record}

Smart kontrakty sú užitočným nástrojom pre audity a sledovanie. Keďže sú smart kontrakty Etherea na verejnom blockchaine, každý môže okamžite sledovať prevody aktív a ďalšie súvisiace informácie. Môžete napríklad skontrolovať, či niekto poslal peniaze na vašu adresu.

## Ochrana súkromia {#privacy-protection}

Smart kontrakty tiež chránia vaše súkromie. Pretože je Ethereum pseudonymná sieť (vaše transakcie sú verejne viazané na jedinečnú kryptografickú adresu, nie vašu identitu), môžete chrániť svoje súkromie pred pozorovateľmi.

## Transparentné podmienky {#visible-terms}

A napokon, rovnako ako v prípade tradičných kontraktov, môžete preskúmať, čo je obsahom smart kontraktu pred tým, než ho podpíšete (alebo s ním budete pracovať iným spôsobom). Transparentnosť smart kontraktu zaručuje, že si ho môže pozrieť ktokoľvek.

## Využitie smart kontraktov {#use-cases}

Smart kontrakty vedia v podstate čokoľvek, čo vedia počítačové programy.

Môžu vykonávať výpočty, vytvárať menu, ukladať dáta, mintovať [NFT](/glossary/#nft), odosielať komunikáciu a dokonca generovať grafiku. Tu sú niektoré reálne populárne príklady:

- [Kryptomeny Stablecoin](/stablecoins/)
- [Vytváranie a distribúcia jedinečných digitálnych aktív](/nft/)
- [Automatická otvorená zmenáreň](/get-eth/#dex)
- [Decentralizované hry](/dapps/?category=gaming#explore)
- [Poistná zmluva, ktorá automaticky vyplatí plnenie](https://etherisc.com/)
- [Štandard, ktorý umožňuje vytvárať interoperabilné meny podľa konkrétnych požiadaviek](/developers/docs/standards/tokens/)

## Ďalšie zdroje informácií {#further-reading}

- [Ako smart kontrakty zmenia svet](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart kontrakty: blockchainová technológia, ktorá nahradí právnikov](https://blockgeeks.com/guides/smart-contracts/)
- [Smart kontrakty pre vývojárov](/developers/docs/smart-contracts/)
- [Naučte sa programovať smart kontrakty](/developers/learning-tools/)
- [Pochopenie Etherea – čo je smart kontrakt?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
