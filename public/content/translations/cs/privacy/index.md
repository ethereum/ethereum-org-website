---
title: Soukromí na Ethereu
description: Nástroje a techniky pro ochranu vašeho soukromí na Ethereu
lang: cs
---

# Soukromí na Ethereu {#introduction}

Soukromí je nejen nezbytné pro osobní bezpečnost, je to základní kámen svobody a klíčový [garant decentralizace](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Soukromí dává lidem možnost svobodně se vyjadřovat, obchodovat s ostatními a organizovat komunity. Stejně jako u všech blockchainů je však soukromí v případě veřejné účetní knihy Etherea náročné.

Ethereum je z podstaty transparentní. Každá akce na blockchainu je viditelná pro každého, kdo se podívá. Ačkoli Ethereum nabízí pseudonymitu propojením vaší aktivity s [veřejným klíčem](/decentralized-identity/#public-key-cryptography) namísto identity v reálném světě, vzorce aktivity by mohly být analyzovány za účelem odhalení citlivých informací a identifikace uživatelů.

Zabudování nástrojů pro ochranu soukromí do Etherea může lidem, organizacím a institucím pomoci bezpečně interagovat a zároveň omezit zbytečné odhalení. Díky tomu je ekosystém bezpečnější a praktičtější pro širší škálu případů použití.

## Ochrana soukromí při zápisech {#privacy-of-writes}

Ve výchozím nastavení je každá transakce zapsaná na Ethereu veřejná a trvalá. To zahrnuje nejen posílání ETH, ale také registraci jmen ENS, sbírání POAP nebo obchodování s NFT. Každodenní akce, jako jsou platby, hlasování nebo ověření totožnosti, mohou odhalit vaše informace nezamýšleným stranám. Existuje několik nástrojů a technik, které mohou pomoci zvýšit jejich soukromí:

### Mixovací protokoly (neboli „mixéry“) {#mixing-protocols}

Mixéry přerušují spojení mezi odesílateli a příjemci tím, že transakce mnoha uživatelů vkládají do sdíleného „poolu“ a poté umožňují lidem pozdější výběr na novou adresu. Jelikož jsou vklady a výběry promíchány, je pro pozorovatele mnohem těžší je spojit.

_Příklady: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Stíněné pooly {#shielded-pools}

Stíněné pooly jsou podobné mixérům, ale umožňují uživatelům držet a převádět finanční prostředky soukromě uvnitř samotného poolu. Namísto pouhého zatemnění spojení mezi vkladem a výběrem si stíněné pooly udržují trvalý soukromý stav, často zabezpečený důkazy s nulovou znalostí. To umožňuje vytvářet soukromé převody, soukromé zůstatky a další.

_Příklady: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Skryté adresy {#stealth-addresses}

[Skrytá adresa](https://vitalik.eth.limo/general/2023/01/20/stealth.html) je jako dát každému odesílateli jedinečnou, jednorázovou poštovní přihrádku, kterou můžete otevřít jen vy. Pokaždé, když vám někdo pošle kryptoměnu, přijde na novou adresu, takže nikdo jiný neuvidí, že všechny tyto platby patří vám. Díky tomu zůstává vaše platební historie soukromá a hůře sledovatelná.

_Příklady: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Další případy použití {#other-use-cases}

Mezi další projekty zkoumající soukromé zápisy patří [PlasmaFold](https://pse.dev/projects/plasma-fold) (soukromé platby) a systémy jako [MACI](https://pse.dev/projects/maci) a [Semaphore](https://pse.dev/projects/semaphore) (soukromé hlasování).

Tyto nástroje rozšiřují možnosti soukromého zápisu na Ethereu, ale každý z nich má své kompromisy. Některé přístupy jsou stále experimentální, některé zvyšují náklady nebo složitost a některé nástroje, jako jsou mixéry, mohou čelit právnímu nebo regulačnímu přezkumu v závislosti na tom, jak jsou používány.

## Ochrana soukromí při čtení {#privacy-of-reads}

Čtení nebo kontrola jakýchkoli informací na Ethereu (např. zůstatku v peněžence) obvykle probíhá prostřednictvím služby, jako je poskytovatel vaší peněženky, poskytovatel uzlů nebo prohlížeč bloků. Protože se na ně spoléháte, že za vás přečtou blockchain, mohou také vidět vaše požadavky spolu s metadaty, jako je vaše IP adresa nebo poloha. Pokud stále kontrolujete stejný účet, tyto informace lze poskládat a propojit vaši identitu s vaší aktivitou.

Provoz vlastního uzlu Etherea by tomu zabránil, ale ukládání a synchronizace celého blockchainu zůstává pro většinu uživatelů nákladná a nepraktická, zejména na mobilních zařízeních.

Mezi některé projekty zkoumající soukromé čtení patří [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, získání dat bez odhalení toho, co hledáte), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (soukromé ověření identity s důkazy s nulovou znalostí), [vOPRF](https://pse.dev/projects/voprf) (používání účtů Web2 pseudonymně ve Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (výpočty na zašifrovaných datech) a [MachinaIO](https://pse.dev/projects/machina-io) (skrytí podrobností programu při zachování funkčnosti).

## Ochrana soukromí při prokazování {#privacy-of-proving}

Důkazy chránící soukromí jsou nástroje, které můžete na Ethereu použít k prokázání, že je něco pravda, aniž byste odhalili zbytečné podrobnosti. Můžete například:

- Prokázat, že je vám více než 18 let, aniž byste sdíleli své celé datum narození
- Prokázat vlastnictví NFT nebo tokenu, aniž byste odhalili celou svou peněženku
- Prokázat nárok na členství, odměnu nebo hlasování bez odhalení dalších osobních údajů

Většina nástrojů pro tyto účely se spoléhá na kryptografické techniky, jako jsou důkazy s nulovou znalostí, ale výzvou je učinit je dostatečně efektivními pro provoz na každodenních zařízeních, přenositelnými na jakoukoli platformu a bezpečnými.

Mezi některé projekty zkoumající ochranu soukromí při prokazování patří [Client Side Proving](https://pse.dev/projects/client-side-proving) (systémy prokazování ZK), [TLSNotary](https://tlsnotary.org/), (důkazy pravosti pro jakákoli data na webu), [Mopro](https://pse.dev/projects/mopro) (mobilní prokazování na straně klienta), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (delegační rámce, které se vyhýbají předpokladům důvěry) a [Noir](https://noir-lang.org/) (jazyk pro soukromé a ověřitelné výpočty).

## Slovníček pojmů o ochraně soukromí {#privacy-glossary}

**Anonymní**: Interakce s trvale odstraněnými všemi identifikátory z vašich dat, což znemožňuje zpětné vysledování informací k jednotlivci

**Šifrování**: Proces, který zamíchá data tak, že je může číst pouze někdo se správným klíčem

**[Plně homomorfní šifrování](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Způsob provádění výpočtů přímo na zašifrovaných datech, aniž by se kdy dešifrovala

**[Nerozlišitelné zatemnění](https://pse.dev/projects/machina-io) (iO)**: Techniky ochrany soukromí, které činí programy nebo data nesrozumitelnými, ale stále použitelnými

**[Výpočty s více stranami](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Metody, které umožňují více stranám společně vypočítat výsledek, aniž by odhalily své soukromé vstupy

**Programovatelná kryptografie**: Flexibilní, pravidly řízená kryptografie, kterou lze v softwaru přizpůsobit a řídit tak, jak a kdy jsou data sdílena, ověřována nebo odhalována

**Pseudonymní**: Používání jedinečných kódů nebo čísel (jako je adresa Etherea) namísto osobních identifikátorů

**Selektivní zveřejňování**: Schopnost sdílet pouze to, co je nezbytně nutné (např. prokázat, že vlastníte NFT, aniž byste odhalili celou historii své peněženky)

**Nepropojitelnost**: Zajištění toho, aby samostatné akce na blockchainu nebylo možné spojit se stejnou adresou

**Ověřitelnost**: Zajištění toho, aby ostatní mohli potvrdit, že tvrzení je pravdivé, například ověřením transakce nebo důkazu na Ethereu

**Ověřitelná delegace**: Přidělení úkolu – například generování důkazu – jiné straně (např. mobilní peněžence využívající server pro náročnou kryptografii) a zároveň schopnost ověřit, že byl proveden správně

**[Důkazy s nulovou znalostí](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Kryptografické protokoly, které umožňují někomu prokázat, že informace je pravdivá, aniž by odhalil podkladová data

**ZK Rollup**: Systém škálovatelnosti, který dávkuje transakce mimo řetězec a odesílá důkaz platnosti na blockchainu – ve výchozím nastavení není soukromý, ale umožňuje efektivní systémy ochrany soukromí (jako jsou stíněné pooly) snížením nákladů

## Zdroje informací {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), výzkumná a vývojová laboratoř nadace Ethereum zaměřená na ochranu soukromí v ekosystému
- [Web3PrivacyNow](https://web3privacy.info/), síť lidí, projektů a spřízněných organizací, které chrání a prosazují lidská práva online
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), stránka pro hodnocení peněženek Etherea, jejímž cílem je poskytnout komplexní seznam peněženek, jejich funkčnosti, postupů a podpory určitých standardů.
- [Zk-kit](https://zkkit.pse.dev/): Sada knihoven (algoritmů, pomocných funkcí a datových struktur), které lze znovu použít v různých projektech a protokolech s nulovou znalostí.
- [Aplikace pro ochranu soukromí](/apps/categories/privacy/) – Objevte seznam vybraných aplikací pro ochranu soukromí, které běží na Ethereu.
