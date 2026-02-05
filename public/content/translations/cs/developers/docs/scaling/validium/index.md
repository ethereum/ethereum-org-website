---
title: Validium
description: "Úvod do Validia jako škálovacího řešení, které v současné době využívá komunita Etherea."
lang: cs
sidebarDepth: 3
---

Validium je [škalovací řešení](/developers/docs/scaling/), které zajišťuje integritu transakcí pomocí důkazů o platnosti, podobně jako [ZK-rollupy](/developers/docs/scaling/zk-rollups/), ale neukládá transakční data na Ethereum Mainnet. Ačkoli dostupnost dat off-chain přináší kompromisy, může vést k masivnímu zlepšení škálovatelnosti (validia mohou zpracovat [~9 000 transakcí za sekundu nebo více](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Předpoklady {#prerequisites}

Měli byste si přečíst a pochopit naši stránku o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2](/layer-2).

## Co je to validium? {#what-is-validium}

Validia jsou škálovací řešení, která využívají off-chain dostupnost dat a výpočty navržené ke zlepšení propustnosti zpracováním transakcí mimo Ethereum Mainnet. Stejně jako rollupy s nulovou znalostí (ZK-rollupy), validia zveřejňují [důkazy s nulovou znalostí](/glossary/#zk-proof) k ověření off-chain transakcí na Ethereu. Tím se zabraňuje neplatným změnám stavu a zvyšují se bezpečnostní záruky řetězce typu validium.

Tyto „důkazy o platnosti“ mohou mít podobu ZK-SNARKů (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) nebo ZK-STARKů (Zero-Knowledge Scalable Transparent Argument of Knowledge). Více o [důkazech s nulovou znalostí](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Prostředky patřící uživatelům validia jsou spravovány smart kontraktem na Ethereu. Validia nabízejí téměř okamžité výběry, podobně jako ZK-rollupy; jakmile je důkaz o platnosti žádosti o výběr ověřen na Mainnetu, uživatelé mohou vybrat prostředky poskytnutím [Merkleho důkazů](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Merkleho důkaz ověřuje zahrnutí výběrové transakce uživatele do ověřeného balíku transakcí, což umožňuje on-chain kontraktu zpracovat výběr.

Nicméně uživatelé validia mohou mít své prostředky zmrazené a výběry omezené. To se může stát, pokud správci dostupnosti dat na validiovém řetězci zadrží off-chain stavová data od uživatelů. Bez přístupu k transakčním datům nemohou uživatelé vytvořit Merkle důkaz potřebný k prokázání vlastnictví prostředků a k provedení výběru.

Toto je hlavní rozdíl mezi validiem a ZK-rollupy – jejich pozice na spektru dostupnosti dat. Obě řešení přistupují k ukládání dat odlišně, což má dopady na bezpečnost a nezávislost na důvěře.

## Jak validia interagují s Ethereem? {#how-do-validiums-interact-with-ethereum}

Validia jsou škálovací protokoly postavené na stávajícím řetězci Etherea. Ačkoli provádí transakce off-chain, validiový řetězec je spravován sadou chytrých kontraktů nasazených na Mainnetu, včetně:

1. **Ověřovací kontrakt**: Ověřovací kontrakt ověřuje platnost důkazů předložených operátorem validia při provádění aktualizací stavu. To zahrnuje důkazy o platnosti potvrzující správnost off-chain transakcí a důkazy o dostupnosti dat, které ověřují existenci off-chain transakčních dat.

2. **Hlavní kontrakt**: Hlavní kontrakt ukládá závazky ke stavu (Merkleho kořeny) předložené producenty bloků a aktualizuje stav validia, jakmile je on-chain ověřen důkaz o platnosti. Tento kontrakt také zpracovává vklady a výběry z validiového řetězce.

Validia se spoléhají na hlavní vrstvu Etherea v následujících bodech:

### Vypořádání {#settlement}

Transakce provedené na validiu nemohou být plně potvrzeny, dokud rodičovský řetězec neověří jejich platnost. Veškeré obchodní transakce provedené na validiu musí být nakonec vypořádány na Mainnetu. Blockchain Etherea také poskytuje „záruky vypořádání“ pro uživatele validia, což znamená, že off-chain transakce nemohou být zvráceny nebo změněny, jakmile jsou potvrzeny on-chain.

### Bezpečnost {#security}

Ethereum, které funguje jako vrstva sloužící k vypořádání, také zaručuje platnost přechodů stavu na validiu. Off-chain transakce provedené na validiovém řetězci jsou ověřovány prostřednictvím chytrého kontraktu na základní vrstvě Etherea.

Pokud on-chain ověřovací kontrakt shledá důkaz neplatným, jsou transakce zamítnuty. To znamená, že operátoři musí splnit podmínky platnosti vynucené protokolem Etherea před aktualizací stavu validia.

## Jak validium funguje? {#how-does-validium-work}
### Transakce {#transactions}

Uživatelé předkládají transakce operátorovi, což je síťový uzel zodpovědný za provádění transakcí na validiu. Některá validia mohou používat k exekuci řetězce jediného operátora nebo se pro rotaci operátorů spoléhat na mechanismus [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/).

Operátor agreguje transakce do balíku a odešle je do ověřovacího okruhu k potvrzení. Ověřovací okruh přijme balík transakcí (a další relevantní data) jako vstupy a výstupem je důkaz o platnosti, který ověřuje, že operace byly provedeny správně.

### Závazky stavu {#state-commitments}

Stav validia je hašován jako Merkle tree s kořenem uloženým v hlavním kontraktu na Ethereu. Merkle kořen, známý také jako kořen stavu, funguje jako kryptografický závazek k aktuálnímu stavu účtů a zůstatků na validiu.

Pro provedení aktualizace stavu musí operátor vypočítat nový kořen stavu (po provedení transakcí) a předložit ho on-chain kontraktu. Pokud je důkaz o platnosti ověřen, navrhovaný stav je přijat a validium přepne na nový kořen stavu.

### Vklady a výběry {#deposits-and-withdrawals}

Uživatelé přesouvají prostředky z Etherea na validium vložením ETH (nebo jakéhokoli tokenu kompatibilního s ERC) do on-chain kontraktu. Kontrakt přenese událost vkladu na validium off-chain, kde je na adresu uživatele připsána částka odpovídající jeho vkladu. Operátor také zahrne tuto vkladovou transakci do nového balíku.

Pro přesun prostředků zpět na Mainnet zahájí uživatel validia transakci výběru a předloží ji operátorovi, který ověří žádost o výběr a zahrne ji do balíku. Aktiva uživatele na validiu jsou zničena, dříve než mohou opustit systém. Jakmile je důkaz o platnosti spojený s balíkem ověřen, uživatel může zavolat hlavní kontrakt a vybrat zbytek svého původního vkladu.

Jako mechanismus proti cenzuře umožňuje validiový protokol uživatelům vybírat přímo z validiového kontraktu bez použití operátora. V tomto případě musí uživatelé poskytnout Merkle důkaz ověřovacímu kontraktu, který prokazuje zahrnutí účtu do kořene stavu. Pokud je důkaz přijat, uživatel může zavolat funkci pro výběr z hlavního kontraktu a vybrat své prostředky z validia.

### Dávkové odesílání {#batch-submission}

Po exekuci balíčku transakcí předloží operátor přidružený důkaz o platnosti ověřovacímu kontraktu a navrhne nový kořen stavu hlavnímu kontraktu. Pokud je důkaz platný, hlavní kontrakt aktualizuje stav validia a finalizuje výsledky transakcí v balíku.

Na rozdíl od ZK-rollupu nejsou producenti bloků na validiu povinni zveřejňovat transakční data pro balíky transakcí (pouze záhlaví bloků). To dělá z validia čistě off-chain škálovací protokol, na rozdíl od „hybridních“ škálovacích protokolů (tj. [vrstva 2](/layer-2/)), které zveřejňují stavová data na hlavním řetězci Etherea pomocí dat typu blob, `calldata`, nebo jejich kombinací.

### Dostupnost dat {#data-availability}

Jak už jsme zmínili, validia využívají off-chain model dostupnosti dat, kde operátoři ukládají veškerá transakční data mimo Ethereum Mainnet. Nízká on-chain datová stopa validia zlepšuje škálovatelnost (propustnost není omezena kapacitou zpracování dat Etherea) a snižuje poplatky uživatelů (náklady na publikování dat on-chain jsou nižší).

Off-chain dostupnost dat však představuje problém: data nezbytná k vytvoření nebo ověření Merkleho důkazů mohou být nedostupná. To znamená, že uživatelé nemusí být schopni vybrat prostředky z on-chain kontraktu, pokud by operátoři jednali se zlým úmyslem.

Různá řešení validií se pokoušejí tento problém vyřešit decentralizací úložiště stavových dat. Spočívá to v donucení producentů bloků posílat podkladová data „správcům dostupnosti dat“, kteří jsou odpovědní za ukládání off-chain dat a jejich zpřístupnění uživatelům na vyžádání.

Správci dostupnosti dat ve validiu potvrzují dostupnost dat pro off-chain transakce tím, že podepisují každý balík validia. Tyto podpisy představují formu „důkazu dostupnosti“, který on-chain ověřovací kontrakt kontroluje před schválením aktualizací stavu.

Validia se liší v přístupu ke správě dostupnosti dat. Některá se spoléhají na důvěryhodné strany pro ukládání stavových dat, zatímco jiná využívají náhodně přidělené validátory.

#### Komise pro dostupnost dat (DAC) {#data-availability-committee}

Pro zajištění dostupnosti off-chain dat jmenují některá validiová řešení skupinu důvěryhodných subjektů, společně známou jako komise pro dostupnost dat (DAC), která ukládá kopie stavu a poskytuje důkazy o dostupnosti dat. DAC jsou snazší na implementaci a vyžadují méně koordinace, protože členství je omezené.

Uživatelé však musí věřit DAC, že data budou k dispozici, když budou potřeba (např. pro generování Merkle důkazů). Existuje možnost, že členové komisí pro dostupnost dat [budou kompromitováni útočníkem](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), který pak může zadržovat off-chain data.

[Více o komisích pro dostupnost dat ve validiích](https://medium.com/starkware/data-availability-e5564c416424).

#### Vázaná dostupnost dat {#bonded-data-availability}

Jiná validia vyžadují, aby účastníci zodpovědní za ukládání offline dat před převzetím své role zastavili (tj. uzamkli) tokeny ve smart kontraktu. Tento stake slouží jako „závazek“ k zajištění čestného chování mezi správci dostupnosti dat a snižuje potřebu důvěry. Pokud tito účastníci nedokážou prokázat dostupnost dat, jejich záloha se zmenší.

V rámci schématu vázané dostupnosti dat může být kdokoli pověřen držením off-chain dat, pokud poskytne požadovaný stake. To rozšiřuje okruh způsobilých správců dostupnosti dat a snižuje centralizaci, která ovlivňuje komisi pro dostupnost dat (DAC). Důležitější je, že tento přístup spoléhá na kryptoekonomické incentivy, které brání podvodné aktivitě, což je podstatně bezpečnější než jmenování důvěryhodných stran pro zajištění offline dat ve validiu.

[Více o vázané dostupnosti dat ve validiích](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions a validium {#volitions-and-validium}

Validium nabízí mnoho výhod, ale přináší i kompromisy (nejvýrazněji v oblasti dostupnosti dat). Stejně jako u mnoha škálovacích řešení je validium vhodné pro specifické případy použití – právě proto byla vytvořena volitia.

Volitia kombinují ZK-rollup a validiový řetězec a umožňují uživatelům přepínat mezi těmito dvěma škálovacími řešeními. S volitiemi mohou uživatelé využívat off-chain dostupnosti dat validia pro určité transakce a přitom si zachovat možnost přepnout na on-chain dostupnost dat (ZK-rollup), pokud je to potřeba. To v podstatě dává uživatelům svobodu volby kompromisů, které odpovídají jejich jedinečným okolnostem.

Decentralizovaná burza (DEX) může preferovat použití škálovatelné a soukromé infrastruktury validia pro transakce s vysokou hodnotou. Může také použít ZK-rollup pro uživatele, kteří chtějí vyšší bezpečnostní záruky a nezávislost na důvěře, které ZK-rollup nabízí.

## Validia a kompatibilita s EVM {#validiums-and-evm-compatibility}

Stejně jako ZK-rollupy jsou validia většinou vhodná pro jednoduché aplikace, jako jsou směny tokenů a platby. Podpora obecných výpočtů a provádění chytrých kontraktů na validiích je obtížně implementovatelná vzhledem ke značné režii při dokazování instrukcí [EVM](/developers/docs/evm/) v důkazním okruhu s nulovou znalostí.

Některé validiové projekty se pokoušejí tento problém obejít kompilací jazyků kompatibilních s EVM (např. Solidity, Vyper) do vytváření vlastního bytecode optimalizovaného pro efektivní ověřování. Nevýhodou tohoto přístupu je, že nové virtuální stroje přátelské k důkazům s nulovou znalostí nemusí podporovat důležité opkódy EVM a vývojáři musí psát přímo v high-level jazyce. To vytváří ještě více problémů: Nutí vývojáře stavět dappky s úplně novým vývojovým stackem a narušuje kompatibilitu se stávající infrastrukturou Etherea.

Některé týmy se však pokoušejí optimalizovat stávající opkódy EVM pro ZK-důkazní kruhy. To povede k vývoji virtuálního stroje Etherea s nulovou znalostí (zkEVM), virtuálního stroje kompatibilního s EVM, který generuje důkazy pro ověření správnosti exekuce programů. Se zkEVM mohou validiové řetězce provádět chytré kontrakty off-chain a předkládat důkazy o platnosti k ověření off-chain výpočtů (bez nutnosti je znovu provádět) na Ethereu.

[Více o zkEVM](https://www.alchemy.com/overviews/zkevm).

## Jak validia škálují Ethereum? {#scaling-ethereum-with-validiums}

### 1. Off-chain úložiště dat {#offchain-data-storage}

Škálovací projekty vrstvy 2, jako jsou optimistické rollupy a ZK-rollupy, vyměňují nekonečnou škálovatelnost čistě off-chain škálovacích protokolů (např. [Plasma](/developers/docs/scaling/plasma/)) za bezpečnost tím, že publikují některá transakční data na L1. To však znamená, že škálovatelnost rollupů je omezena šířkou pásma dat na Ethereum Mainnetu ([sharding dat](/roadmap/danksharding/) si z tohoto důvodu klade za cíl zlepšit kapacitu úložiště dat Etherea).

Validia dosahují škálovatelnosti tím, že udržují všechna transakční data off-chain a publikují pouze závazky stavu (a důkazy o platnosti) při přenosu aktualizací stavu na hlavní řetězec Etherea. Existence důkazů o platnosti však dává validiím vyšší bezpečnostní záruky než jiná čistě off-chain škálovací řešení, včetně Plasmy a [sidechainů](/developers/docs/scaling/sidechains/). Snížením množství dat, která musí Ethereum zpracovat před ověřením off-chain transakcí, validiové návrhy výrazně zvyšují propustnost na Mainnetu.

### 2. Rekurzivní důkazy {#recursive-proofs}

Rekurzivní důkaz je důkaz o platnosti, který ověřuje platnost jiných důkazů. Tyto „důkazy důkazů“ jsou generovány rekurzivním agregováním více důkazů, dokud není vytvořen jeden konečný důkaz, který ověřuje všechny předchozí důkazy. Rekurzivní důkazy škálují rychlost zpracování blockchainu tím, že zvyšují počet transakcí, které mohou být ověřeny na jeden důkaz o platnosti.

Obvykle každý důkaz o platnosti, který operátor validia předloží k ověření Ethereu, ověřuje integritu jednoho bloku. Na druhou stranu lze jeden rekurzivní důkaz použít k potvrzení platnosti několika bloků validia současně – je to možné, protože ověřovací okruh může rekurzivně agregovat několik blokových důkazů do jednoho konečného důkazu. Pokud on-chain ověřovací kontrakt přijme rekurzivní důkaz, všechny podkladové bloky jsou okamžitě finalizovány.

## Výhody a nevýhody validia {#pros-and-cons-of-validium}

| Plusy                                                                                                                                                       | Minusy                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Důkazy o platnosti zajišťují integritu off-chain transakcí a zabraňují operátorům finalizovat neplatné aktualizace stavu.                   | Výroba důkazů o platnosti vyžaduje speciální hardware, což představuje riziko centralizace.                                                                              |
| Zvyšuje efektivitu kapitálu pro uživatele (žádné zpoždění při výběru prostředků zpět na Ethereum).                       | Omezená podpora pro obecné výpočty a smart kontrakty; pro vývoj jsou nutné specializované jazyky.                                                                        |
| Není náchylné k určitým ekonomickým útokům, kterým čelí systémy založené na důkazech podvodu u aplikací s vysokou hodnotou.                 | Vyžaduje vysoký výpočetní výkon pro generování ZK důkazů; není nákladově efektivní pro aplikace s nízkou propustností.                                                   |
| Snižuje poplatky za palivo pro uživatele tím, že neposílá calldata na Ethereum Mainnet.                                                     | Pomalejší subjektivní finálnost (10–30 minut na vytvoření ZK důkazu), ale rychlejší k úplné finálnosti, protože při řešení sporů není žádné zpoždění. |
| Vhodné pro specifické případy použití, jako je obchodování nebo blockchainové hry, které upřednostňují soukromí transakcí a škálovatelnost. | Uživatelé mohou mít zablokovaný výběr prostředků, protože generování Merkleho důkazů o vlastnictví vyžaduje, aby off-chain data byla dostupná po celou dobu.             |
| Dostupnost dat off-chain poskytuje vyšší úroveň propustnosti a zvyšuje škálovatelnost.                                                      | Bezpečnostní model spoléhá na důvěru a kryptoekonomické incentivy, na rozdíl od ZK-rollupů, které se spoléhají čistě na kryptografické bezpečnostní mechanismy.          |

### Použití Validium/Volitions {#use-validium-and-volitions}

Několik projektů poskytuje implementace validia a volitia, které můžete integrovat do svých dapp:

**StarkWare StarkEx** - _StarkEx je škálovací řešení pro Ethereum vrstvy 2 (L2), které je založeno na důkazech o platnosti. Může fungovat buď v ZK-Rollup, nebo validium režimu dostupnosti dat._

- [Dokumentace](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Webové stránky](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter je škálovací protokol vrstvy 2, který řeší dostupnost dat hybridním přístupem, který kombinuje myšlenky zkRollupu a shardingu. Může podporovat libovolný počet shardů, každý s vlastní politikou dostupnosti dat._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentace](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Webové stránky](https://zksync.io/)

## Další čtení {#further-reading}

- [Validium a matice 2x2 vrstvy 2 — vydání č. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollupy vs. Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition a vznikající spektrum dostupnosti dat](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollupy, validia a volitions: Poznejte nejžhavější řešení pro škálování Etherea](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Praktický průvodce rollupy na Ethereu](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
