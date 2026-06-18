---
title: Technický úvod do Etherea
description: Úvod do základních konceptů Etherea pro vývojáře dapp.
lang: cs
---

## Co je to blockchain? {#what-is-a-blockchain}

Blockchain je veřejná databáze, která je aktualizována a sdílena mnoha počítači v síti.

"Blok" odkazuje na data a stav, které jsou ukládány v po sobě jdoucích skupinách známých jako "bloky". Pokud někomu pošlete ETH, data transakce musí být přidána do bloku, aby byla úspěšná.

"Řetězec" odkazuje na skutečnost, že každý blok kryptograficky odkazuje na svého předchůdce. Jinými slovy, bloky se řetězí dohromady. Data v bloku nelze změnit bez změny všech následujících bloků, což by vyžadovalo konsensus celé sítě.

Každý počítač v síti se musí shodnout na každém novém bloku a na řetězci jako celku. Tyto počítače jsou známé jako "uzly". Uzly zajišťují, že každý, kdo interaguje s blockchainem, má stejná data. K dosažení této distribuované shody potřebují blockchainy mechanismus konsensu.

[Ethereum](/) používá [mechanismus konsensu založený na důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/). Každý, kdo chce přidávat nové bloky do řetězce, musí vložit ETH – nativní měnu Etherea – jako stake, který slouží jako zajištění, a provozovat software validátoru. Tito "validátoři" pak mohou být náhodně vybráni, aby navrhli bloky, které ostatní validátoři zkontrolují a přidají do blockchainu. Existuje systém odměn a trestů, který silně motivuje účastníky, aby byli čestní a co nejvíce dostupní online.

Pokud byste chtěli vidět, jak jsou data blockchainu hašována a následně připojována k historii odkazů na bloky, určitě se podívejte na [toto demo](https://andersbrownworth.com/blockchain/blockchain) od Anderse Brownwortha a zhlédněte doprovodné video níže.

Podívejte se, jak Anders vysvětluje haše v blockchainech:

<VideoWatch slug="blockchain-101-visual-demo" />

## Co je Ethereum? {#what-is-ethereum}

Ethereum je blockchain s integrovaným počítačem. Je to základ pro budování aplikací a organizací decentralizovaným způsobem, nevyžadujícím povolení a odolným vůči cenzuře.

Ve světě Etherea existuje jediný, kanonický počítač (nazývaný Ethereum Virtual Machine, neboli EVM), na jehož stavu se shodnou všichni v síti Ethereum. Každý, kdo se účastní sítě Ethereum (každý uzel Etherea), uchovává kopii stavu tohoto počítače. Kromě toho může jakýkoli účastník vyslat požadavek, aby tento počítač provedl libovolný výpočet. Kdykoli je takový požadavek vyslán, ostatní účastníci v síti výpočet ověří, zvalidují a provedou ("vykonají"). Toto provedení způsobí změnu stavu v EVM, která je potvrzena jako závazek a šířena napříč celou sítí.

Požadavky na výpočet se nazývají požadavky na transakci; záznam všech transakcí a současný stav EVM se ukládá na blockchain, který je následně uložen a odsouhlasen všemi uzly.

Kryptografické mechanismy zajišťují, že jakmile jsou transakce ověřeny jako platné a přidány do blockchainu, nelze s nimi později manipulovat. Stejné mechanismy také zajišťují, že všechny transakce jsou podepsány a provedeny s příslušnými "oprávněními" (nikdo by neměl být schopen odesílat digitální aktiva z účtu Alice, kromě samotné Alice).

## Co je ether? {#what-is-ether}

**Ether (ETH)** je nativní kryptoměna Etherea. Účelem ETH je umožnit trh s výpočetním výkonem. Takový trh poskytuje ekonomickou motivaci pro účastníky, aby ověřovali a prováděli požadavky na transakce a poskytovali síti výpočetní zdroje.

Každý účastník, který vyšle požadavek na transakci, musí také nabídnout síti určité množství ETH jako odměnu. Síť část této odměny spálí a zbytek udělí tomu, kdo nakonec odvede práci spočívající v ověření transakce, jejím provedení, zapsání do blockchainu jako závazek a vyslání do sítě.

Množství zaplaceného ETH odpovídá zdrojům potřebným k provedení výpočtu. Tyto odměny také brání zlomyslným účastníkům v úmyslném ucpávání sítě tím, že by požadovali provedení nekonečných výpočtů nebo jiných skriptů náročných na zdroje, protože tito účastníci musí za výpočetní zdroje platit.

ETH se také používá k zajištění kryptoekonomické bezpečnosti sítě třemi hlavními způsoby: 1) používá se jako prostředek k odměňování validátorů, kteří navrhují bloky nebo upozorňují na nečestné chování jiných validátorů; 2) validátoři jej vkládají jako stake, který funguje jako zajištění proti nečestnému chování – pokud se validátoři pokusí o nekalé jednání, jejich ETH může být zničeno; 3) používá se k vážení "hlasů" pro nově navržené bloky, což vstupuje do části mechanismu konsensu, která rozhoduje o volbě forku.

## Co jsou chytré kontrakty? {#what-are-smart-contracts}

V praxi účastníci nepíší nový kód pokaždé, když chtějí požádat o výpočet na EVM. Vývojáři aplikací spíše nahrávají programy (znovupoužitelné úryvky kódu) do stavu EVM a uživatelé zadávají požadavky na provedení těchto úryvků kódu s různými parametry. Programy nahrané do sítě a prováděné sítí nazýváme "chytré kontrakty".

Na velmi základní úrovni si můžete chytrý kontrakt představit jako jakýsi prodejní automat: skript, který při volání s určitými parametry provede nějaké akce nebo výpočet, pokud jsou splněny určité podmínky. Například jednoduchý prodejní chytrý kontrakt by mohl vytvořit a přiřadit vlastnictví digitálního aktiva, pokud volající pošle ETH konkrétnímu příjemci.

Každý vývojář může vytvořit chytrý kontrakt a zveřejnit jej v síti, přičemž blockchain využije jako jeho datovou vrstvu, za poplatek zaplacený síti. Jakýkoli uživatel pak může chytrý kontrakt zavolat, aby provedl jeho kód, opět za poplatek zaplacený síti.

Díky chytrým kontraktům tak mohou vývojáři budovat a nasazovat libovolně složité uživatelské aplikace a služby, jako jsou: tržiště, finanční nástroje, hry atd.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Posloupnost všech bloků, které byly v historii sítě zapsány jako závazek do sítě Ethereum. Nazývá se tak proto, že každý blok obsahuje odkaz na předchozí blok, což nám pomáhá udržovat pořadí všech bloků (a tím i přesnou historii).

### ETH {#eth}

**Ether (ETH)** je nativní kryptoměna Etherea. Uživatelé platí ETH jiným uživatelům za to, že splní jejich požadavky na provedení kódu.

[Více o ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Ethereum Virtual Machine (EVM) je globální virtuální počítač, jehož stav ukládá a na kterém se shodne každý účastník sítě Ethereum. Jakýkoli účastník může požádat o provedení libovolného kódu na EVM; provedení kódu mění stav EVM.

[Více o EVM](/developers/docs/evm/)

### Uzly {#nodes}

Skutečné stroje, které ukládají stav EVM. Uzly spolu komunikují, aby šířily informace o stavu EVM a nových změnách stavu. Jakýkoli uživatel může také požádat o provedení kódu vysláním požadavku na provedení kódu z uzlu. Samotná síť Ethereum je souhrnem všech uzlů Etherea a jejich komunikace.

[Více o uzlech](/developers/docs/nodes-and-clients/)

### Účty {#accounts}

Místo, kde je uloženo ETH. Uživatelé mohou inicializovat účty, vkládat na ně ETH a provádět převod ETH ze svých účtů jiným uživatelům. Účty a zůstatky na účtech jsou uloženy ve velké tabulce v EVM; jsou součástí celkového stavu EVM.

[Více o účtech](/developers/docs/accounts/)

### Transakce {#transactions}

"Požadavek na transakci" je formální termín pro požadavek na provedení kódu na EVM a "transakce" je splněný požadavek na transakci a s ním spojená změna stavu EVM. Jakýkoli uživatel může vyslat požadavek na transakci do sítě z uzlu. Aby požadavek na transakci ovlivnil dohodnutý stav EVM, musí být zvalidován, proveden a "zapsán jako závazek do sítě" jiným uzlem. Provedení jakéhokoli kódu způsobí změnu stavu v EVM; po zapsání závazku je tato změna stavu vyslána do všech uzlů v síti. Několik příkladů transakcí:

- Odeslat X ETH z mého účtu na účet Alice.
- Publikovat kód nějakého chytrého kontraktu do stavu EVM.
- Provést kód chytrého kontraktu na adrese X v EVM s argumenty Y.

[Více o transakcích](/developers/docs/transactions/)

### Bloky {#blocks}

Objem transakcí je velmi vysoký, takže transakce jsou "zapisovány jako závazek" v dávkách, neboli blocích. Bloky obvykle obsahují desítky až stovky transakcí.

[Více o blocích](/developers/docs/blocks/)

### Chytré kontrakty {#smart-contracts}

Znovupoužitelný úryvek kódu (program), který vývojář publikuje do stavu EVM. Kdokoli může požádat o provedení kódu chytrého kontraktu vytvořením požadavku na transakci. Protože vývojáři mohou do EVM zapisovat libovolné spustitelné aplikace (hry, tržiště, finanční nástroje atd.) publikováním chytrých kontraktů, často se jim také říká [decentralizované aplikace (dapp)](/developers/docs/dapps/).

[Více o chytrých kontraktech](/developers/docs/smart-contracts/)

## Kam dál {#where-to-go-next}

Většina čtenářů postupuje v dokumentaci popořadě, ale nejkratší cesta závisí na tom, co se snažíte vytvořit:

- **Decentralizované aplikace (dapp), které interagují s Ethereem:** [účty](/developers/docs/accounts/) a [transakce](/developers/docs/transactions/), poté si vyberte [framework](/developers/docs/frameworks/).
- **Vývoj chytrých kontraktů:** [chytré kontrakty](/developers/docs/smart-contracts/) a [programovací jazyky](/developers/docs/programming-languages/).
- **Uzly a staking:** [uzly a klienti](/developers/docs/nodes-and-clients/), poté [mechanismy konsensu](/developers/docs/consensus-mechanisms/).

## Další čtení {#further-reading}

- [Bílá kniha Etherea](/whitepaper/)
- [Jak vlastně Ethereum funguje?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Pozn.** tento zdroj je stále cenný, ale mějte na paměti, že předchází [Merge](/roadmap/merge), a proto stále odkazuje na mechanismus Etherea důkaz prací (PoW) – Ethereum je nyní ve skutečnosti zabezpečeno pomocí [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos))

### Učíte se raději vizuálně? {#visual-learner}

Tato série videí nabízí důkladné prozkoumání základních témat:

<VideoWatch slug="ethereum-basics-intro" />

[Playlist Základy Etherea](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související tutoriály {#related-tutorials}

- [Průvodce Ethereem pro vývojáře, část 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Velmi přívětivé prozkoumání Etherea pro začátečníky pomocí Pythonu a web3.py_