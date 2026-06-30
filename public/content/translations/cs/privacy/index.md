---
title: "Soukromí na Ethereu"
description: "Nástroje a techniky pro ochranu vašeho soukromí na Ethereu"
lang: cs
---

Soukromí je nejen nezbytné pro osobní bezpečnost, je to základní kámen svobody a klíčový [garant decentralizace](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Soukromí dává lidem možnost svobodně se vyjadřovat, provádět transakce s ostatními a organizovat komunity. Ale stejně jako u všech blockchainů, veřejná účetní kniha Etherea činí soukromí náročným.

Ethereum je ze své podstaty transparentní. Každá onchain akce je viditelná pro kohokoli, kdo se podívá. Ačkoli Ethereum nabízí pseudonymitu tím, že spojuje vaši aktivitu s [veřejným klíčem](/decentralized-identity/#public-key-cryptography) namísto skutečné identity, vzorce aktivity by mohly být analyzovány k odhalení citlivých informací a identifikaci uživatelů.

Zabudování nástrojů pro zachování soukromí do Etherea může pomoci lidem, organizacím a institucím bezpečně komunikovat a zároveň omezit zbytečné vystavení. Díky tomu je ekosystém bezpečnější a praktičtější pro širší škálu případů užití.

<VideoWatch slug="privacy-is-existential" />

## Soukromí pro zápisy {#privacy-of-writes}

Ve výchozím nastavení je každá transakce zapsaná na Ethereu veřejná a trvalá. To zahrnuje nejen odesílání ETH, ale také registraci jmen ENS, sbírání POAPů nebo obchodování s NFT. Každodenní akce, jako jsou platby, hlasování nebo ověřování identity, mohou odhalit vaše informace nezamýšleným stranám. Existuje několik nástrojů a technik, které mohou pomoci učinit tyto akce soukromějšími:

### Mixovací protokoly (nebo „mixéry“) {#mixing-protocols}

Mixéry přerušují spojení mezi odesílateli a příjemci tím, že vloží transakce mnoha uživatelů do sdíleného „poolu“ a poté lidem umožní pozdější výběr na novou adresu. Vzhledem k tomu, že vklady a výběry jsou smíchány dohromady, je pro pozorovatele mnohem těžší je propojit.

_Příklady: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Chráněné pooly {#shielded-pools}

Chráněné pooly jsou podobné mixérům, ale umožňují uživatelům držet a převádět prostředky soukromě přímo uvnitř samotného poolu. Namísto pouhého zastření spojení mezi vkladem a výběrem udržují chráněné pooly nepřetržitý soukromý stav, často zabezpečený důkazy s nulovou znalostí. To umožňuje vytvářet soukromé převody, soukromé zůstatky a další.

_Příklady: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Skryté adresy {#stealth-addresses}

[Skrytá adresa](https://vitalik.eth.limo/general/2023/01/20/stealth.html) je jako dát každému odesílateli jedinečnou, jednorázovou P.O. box schránku, kterou můžete otevřít pouze vy. Pokaždé, když vám někdo pošle krypto, jde to na novou adresu, takže nikdo jiný nevidí, že všechny tyto platby patří vám. To udržuje vaši platební historii v soukromí a ztěžuje její sledování.

_Příklady: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Další případy užití {#other-use-cases}

Další projekty zkoumající soukromé zápisy zahrnují [PlasmaFold](https://pse.dev/projects/plasma-fold) (soukromé platby) a systémy jako [MACI](https://pse.dev/projects/maci) a [Semaphore](https://pse.dev/projects/semaphore) (soukromé hlasování).

Tyto nástroje rozšiřují možnosti pro soukromé zápisy na Ethereu, ale každý z nich přináší určité kompromisy. Některé přístupy jsou stále experimentální, některé zvyšují náklady nebo složitost a některé nástroje, jako jsou mixéry, mohou čelit právnímu nebo regulačnímu dohledu v závislosti na tom, jak jsou používány.

## Soukromí pro čtení {#privacy-of-reads}

Čtení nebo kontrola jakýchkoli informací na Ethereu (např. zůstatku vaší peněženky) obvykle probíhá prostřednictvím služby, jako je poskytovatel vaší peněženky, poskytovatel uzlu nebo prohlížeč bloků. Protože se spoléháte na to, že pro vás přečtou blockchain, mohou také vidět vaše požadavky spolu s metadaty, jako je vaše IP adresa nebo poloha. Pokud neustále kontrolujete stejný účet, mohou být tyto informace poskládány dohromady a propojit vaši identitu s vaší aktivitou.

Provozování vlastního uzlu Etherea by tomu zabránilo, ale ukládání a synchronizace celého blockchainu zůstává pro většinu uživatelů nákladné a nepraktické, zejména na mobilních zařízeních.

Některé projekty zkoumající soukromé čtení zahrnují [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, načítání dat bez odhalení toho, co hledáte), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (soukromé kontroly identity pomocí důkazů s nulovou znalostí), [vOPRF](https://pse.dev/projects/voprf) (pseudonymní používání účtů Web2 ve Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (výpočty na šifrovaných datech) a [MachinaIO](https://pse.dev/projects/machina-io) (skrytí detailů programu při zachování funkčnosti).

## Soukromí pro dokazování {#privacy-of-proving}

Důkazy zachovávající soukromí jsou nástroje, které můžete na Ethereu použít k prokázání, že je něco pravda, aniž byste odhalili zbytečné detaily. Například byste mohli:

- Dokázat, že je vám více než 18 let, aniž byste sdíleli celé datum narození
- Dokázat vlastnictví NFT nebo tokenu, aniž byste odhalili celou svou peněženku
- Dokázat způsobilost pro členství, odměnu nebo hlas, aniž byste odhalili další osobní údaje

Většina nástrojů pro tyto účely spoléhá na kryptografické techniky, jako jsou důkazy s nulovou znalostí, ale výzvou je učinit je dostatečně efektivními, aby běžely na běžných zařízeních, byly přenositelné na jakoukoli platformu a bezpečné.

Některé projekty zkoumající soukromí pro dokazování zahrnují [Client Side Proving](https://pse.dev/projects/client-side-proving) (systémy pro dokazování ZK), [TLSNotary](https://tlsnotary.org/) (důkazy pravosti pro jakákoli data na webu), [Mopro](https://pse.dev/projects/mopro) (mobilní dokazování na straně klienta), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (rámce pro delegaci, které se vyhýbají předpokladům důvěry) a [Noir](https://noir-lang.org/) (jazyk pro soukromé a ověřitelné výpočty).

## Slovníček pojmů o soukromí {#privacy-glossary}

**Anonymní**: Interakce se všemi identifikátory trvale odstraněnými z vašich dat, což znemožňuje zpětné vysledování informací k jednotlivci

**Šifrování**: Proces, který zamíchá data tak, aby je mohl přečíst pouze někdo se správným klíčem

**[Plně homomorfní šifrování](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Způsob, jak provádět výpočty přímo na šifrovaných datech, aniž by se kdy dešifrovala

**[Nerozlišitelné zmatení](https://pse.dev/projects/machina-io) (iO)**: Techniky ochrany soukromí, které činí programy nebo data nesrozumitelnými, ale stále použitelnými

**[Vícestranné výpočty](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Metody, které umožňují více stranám společně vypočítat výsledek, aniž by odhalily své soukromé vstupy

**Programovatelná kryptografie**: Flexibilní kryptografie řízená pravidly, kterou lze v softwaru přizpůsobit tak, aby kontrolovala, jak a kdy jsou data sdílena, ověřována nebo odhalována

**Pseudonymní**: Používání jedinečných kódů nebo čísel (jako je adresa Etherea) namísto osobních identifikátorů

**Selektivní odhalení**: Schopnost sdílet pouze to, co je potřeba (např. prokázání, že vlastníte NFT, aniž byste odhalili celou historii své peněženky)

**Nepropojitelnost**: Zajištění toho, že oddělené akce na blockchainu nelze zpětně spojit se stejnou adresou

**Ověřitelnost**: Zajištění toho, že ostatní mohou potvrdit, že je nárok pravdivý, jako je ověření transakce nebo důkazu na Ethereu

**Ověřitelná delegace**: Přidělení úkolu – jako je generování důkazu – jiné straně (např. mobilní peněženka využívající server pro náročnou kryptografii), přičemž je stále možné ověřit, že byl proveden správně

**[Důkazy s nulovou znalostí](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Kryptografické protokoly, které někomu umožňují prokázat, že je informace pravdivá, aniž by odhalil podkladová data

**ZK rollup**: Systém škálovatelnosti, který dávkuje transakce offchain a odesílá důkaz platnosti onchain – ve výchozím nastavení není soukromý, ale umožňuje efektivní systémy ochrany soukromí (jako jsou chráněné pooly) snížením nákladů

## Zdroje {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), výzkumná a vývojová laboratoř Nadace Ethereum zaměřená na soukromí pro ekosystém
- [Web3PrivacyNow](https://web3privacy.info/), síť lidí, projektů a spřízněných organizací, které chrání a prosazují lidská práva online
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), stránka pro hodnocení peněženek Etherea, jejímž cílem je poskytnout komplexní seznam peněženek, jejich funkčnosti, postupů a podpory určitých standardů.
- [Zk-kit](https://zkkit.org/): Sada knihoven (algoritmy, pomocné funkce a datové struktury), které lze znovu použít v různých projektech a protokolech s nulovým vědomím.
- [Privacy Apps](/apps/categories/privacy/) – Objevte seznam vybraných aplikací pro ochranu soukromí, které běží na Ethereu.
