---
title: Úvod k platformě Ethereum
description: Úvod do základních konceptů Etherea pro vývojáře dappek.
lang: cs
---

## Co je to blockchain? {#what-is-a-blockchain}

Blockchain je veřejná databáze, která je aktualizována a sdílena mnoha počítači v síti.

„Blok“ odkazuje na data a stavy účtů uložené v po sobě jdoucích skupinách známých jako „bloky“. Jestliže pošlete ETH někomu jinému, data transakce musí být přidána do bloku, aby byla úspěšně vykonána.

„Řetězec“ odkazuje na skutečnost, že každý blok kryptograficky odkazuje na svého předchůdce. Jinými slovy, bloky jsou spojeny do řetězce. Data v bloku nelze měnit beze změny všech následujících bloků, což by vyžadovalo konsenzus celé sítě.

Každý počítač v síti musí souhlasit s každým novým blokem a řetězcem jako celkem. Tyto počítače jsou známé jako „uzly“. Tyto uzly zajišťují, že všichni, kdo interagují s blockchainem, mají stejná data. K dosažení tohoto distribuovaného souhlasu blockchainy potřebují mechanismus konsenzu.

Ethereum používá [mechanismus konsenzu založený na důkazu podílem](/developers/docs/consensus-mechanisms/pos/). Každý, kdo chce přidat nové bloky do řetězce, musí uzamknout ETH – nativní měnu v Ethereu – jako záruku a spustit validační software. Tito „validátoři“ mohou být pak náhodně vybráni k navržení bloků, které ostatní validátoři zkontrolují a přidají na blockchain. Existuje systém odměn a trestů, který silně motivuje účastníky, aby byli poctiví a co nejvíce online.

Pokud se chcete podívat, jak jsou blockchainová data hashována a následně přidávána k historii odkazů bloků, podívejte se na [tuto ukázku](https://andersbrownworth.com/blockchain/blockchain) od Anderse Brownwortha na videu níže.

Podívejte se, jak Anders vysvětluje hashe na blockchainech:

<YouTube id="_160oMzblY8" />

## Co je to Ethereum? {#what-is-ethereum}

Ethereum je blockchain s integrovaným počítačem. Je základem pro budování aplikací a organizací decentralizovaným, cenzuře odolným způsobem bez nutnosti dovolovat se třetí strany.

V univerzu Etherea existuje jediný, kanonický počítač (nazývaný Virtuální stroj Etherea neboli EVM), jehož stav je uznáván všemi účastníky sítě Ethereum. Každý, kdo se účastní Etherea (každý uzel Etherea), uchovává kopii stavu tohoto počítače. Kromě toho může každý účastník vyslat požadavek, aby tento počítač provedl libovolný výpočet. Kdykoliv je takový požadavek vyslán, ostatní účastníci sítě výpočet ověří, validují a vykonají („provedou“). Toto provedení způsobí změnu stavu v EVM, která je potvrzena a rozšířena do celé sítě.

Požadavky na výpočet se nazývají transakční požadavky. Záznam všech transakcí a aktuální stav EVM je uložen na blockchainu, který je následně uznán všemi uzly.

Kryptografické mechanismy zajišťují, že jakmile jsou transakce ověřeny jako platné a přidány na blockchain, nemohou být později zmanipulovány. Tyto mechanismy také zajišťují, že všechny transakce jsou podepsány a provedeny s odpovídajícími „oprávněními“ (nikdo by neměl být schopen poslat digitální aktiva z účtu Alice, kromě Alice samotné).

## Co je ether? {#what-is-ether}

**Ether (ETH)** je nativní kryptoměna Etherea. Účelem ETH je umožnit fungování trhu výpočetních zdrojů. Takový trh poskytuje účastníkům ekonomickou pobídku k ověřování a provádění požadavků na transakce a poskytování výpočetních zdrojů síti.

Každý účastník, který vysílá transakční požadavek, musí také síti nabídnout určité množství ETH jako odměnu. Síť část odměny spálí a zbytek přidělí tomu, kdo nakonec transakci ověří, provede, zapíše na blockchain a rozšíří do sítě.

Množství zaplaceného ETH odpovídá zdrojům potřebným k provedení výpočtu. Tyto odměny také zabraňují nečestným účastníkům záměrně zahlcovat síť požadavky na provedení nekonečných výpočtů nebo jiných výpočetně náročných skriptů, protože tito účastníci musí platit za výpočetní zdroje.

ETH se také používá k zajištění kryptografické bezpečnosti sítě třemi hlavními způsoby: 1) Slouží jako prostředek k odměňování validátorů, kteří navrhují bloky nebo upozorňují na nepoctivé chování jiných validátorů. 2) Validátoři ho uzamykají jako záruku proti nepoctivému chování – pokud se validátoři pokusí o nekalou činnost, jejich ETH může být zničeno. 3) Používá se k vážení „hlasů“ pro nově navrhované bloky, což se promítá do volby větve v mechanismu konsenzu.

## Co to jsou chytré kontrakty? {#what-are-smart-contracts}

V praxi účastníci nepíší nový kód pokaždé, když chtějí požádat o výpočet na EVM. Místo toho vývojáři aplikací nahrají programy (znovu použitelné úryvky kódu) do stavu EVM a uživatelé posílají požadavky na provedení těchto úryvků kódu s různými parametry. Tyto programy, které jsou nahrány do sítě a touto sítí také vykonávány, nazýváme chytré kontrakty.

Na základní úrovni si můžete chytrý kontrakt představit jako druh automatu: Skript, který při volání s určitými parametry, pokud jsou splněny určité podmínky, provádí nějaké akce nebo výpočet. Např. jednoduchý vydávající chytrý kontrakt by mohl vytvořit a přiřadit vlastnictví digitálního aktiva, pokud volající pošle ETH konkrétnímu příjemci.

Každý vývojář může vytvořit chytrý kontrakt a za poplatek ho zpřístupnit síti. Každý uživatel pak může tento chytrý kontrakt kontaktovat a vykonat jeho kód, opět za poplatek zaplacený síti.

Díky chytrým kontraktům mohou vývojáři budovat a spouštět libovolně složité uživatelské aplikace a služby, jako jsou tržiště, finanční nástroje, hry atd.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Sekvence všech bloků, které byly historicky přidány na síť Ethereum. Toto pojmenování odráží, že každý blok obsahuje odkaz na předchozí blok, což nám pomáhá udržovat pořadí všech bloků (a tedy přesnou historii).

### ETH {#eth}

**Ether (ETH)** je nativní kryptoměna Etherea. Uživatelé platí ETH jiným uživatelům, aby byly splněny jejich požadavky na vykonání kódu.

[Více o ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Virtuální stroj Etherea (EVM) je globální virtuální počítač, jehož stav uchovává a uznává každý účastník sítě Ethereum. Každý účastník může požádat o vykonání libovolného kódu na EVM. To mění stav EVM.

[Další informace o EVM](/developers/docs/evm/)

### Síťové uzly {#nodes}

Reálné stroje, které ukládají stav EVM. Uzly mezi sebou komunikují, aby sdílely informace o stavu EVM a jeho změnách. Každý uživatel může také požádat o vykonání kódu tím, že z uzlu vyšle požadavek na vykonání kódu. Samotná síť Ethereum je souhrnem všech uzlů Etherea a jejich komunikací.

[Více o uzlech](/developers/docs/nodes-and-clients/)

### Účty {#accounts}

Místo, kde je uloženo ETH. Uživatelé mohou inicializovat účty, vkládat ETH na účty a převádět ETH ze svých účtů na účty jiných uživatelů. Účty a zůstatky na účtech jsou uloženy ve velké tabulce v EVM. Jsou součástí celkového stavu EVM.

[Další informace o účtech](/developers/docs/accounts/)

### Transakce {#transactions}

„Transakční požadavek“ je formální termín pro požadavek na provedení kódu na EVM a „transakce“ je splněný transakční požadavek a s ním spojená změna stavu EVM. Každý uživatel může vyslat transakční požadavek do sítě z uzlu. Aby transakční požadavek ovlivnil uznaný stav EVM, musí být ověřen, vykonán a „zapsán do sítě“ jiným uzlem. Provádění jakéhokoliv kódu vede ke změně stavu EVM. Po zapsání je tato změna stavu rozšířena na všechny uzly v síti. Několik příkladů transakcí:

- Pošli X ETH z mého účtu na účet Alice.
- Nahraj nějaký chytrý kontraktový kód do stavu EVM.
- Vykonej kód chytrého kontraktu na adrese X v EVM s argumenty Y.

[Další informace o transakcích](/developers/docs/transactions/)

### Bloky {#blocks}

Objem transakcí je velmi vysoký, takže transakce jsou „zapisovány“ v dávkách neboli blocích. Bloky obvykle obsahují desítky až stovky transakcí.

[Další informace o blocích](/developers/docs/blocks/)

### Chytré kontrakty {#smart-contracts}

Znovu použitelný úryvek kódu (program), který vývojář nahraje do stavu EVM. Každý může podáním transakčního požadavku požádat o vykonání kódu chytrého kontraktu. Protože vývojáři mohou do EVM zapisovat libovolné spustitelné aplikace (hry, tržiště, finanční nástroje atd.) tím, že publikují chytré kontrakty, často se jim říká [dappky nebo decentralizované aplikace](/developers/docs/dapps/).

[Více o chytrých kontraktech](/developers/docs/smart-contracts/)

## Další četba {#further-reading}

- [Oficiální dokumenty Ethereum](/whitepaper/)
- [Jak vlastně Ethereum funguje?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) – _Preethi Kasireddy_ (**Poznámka**: Tento zdroj je stále užitečný, ale vezměte na vědomí, že předchází [Sloučení](/roadmap/merge), a proto stále odkazuje na mechanismus důkazu prací – Ethereum je nyní zabezpečeno pomocí [důkazu podílem.](/developers/docs/consensus-mechanisms/pos))

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související návody {#related-tutorials}

- [Průvodce Ethereem pro vývojáře, část 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Velmi přívětivý průvodce Ethereem používající Python a web3.py_
