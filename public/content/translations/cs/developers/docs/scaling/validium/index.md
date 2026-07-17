---
title: Validium
description: "Úvod do Validia jako řešení škálování, které v současnosti využívá komunita Etherea."
lang: cs
sidebarDepth: 3
---

Validium je [řešení škálování](/developers/docs/scaling/), které vynucuje integritu transakcí pomocí důkazů platnosti podobně jako [ZK-rollupy](/developers/docs/scaling/zk-rollups/), ale neukládá transakční data na [Ethereum](/) Mainnet. Ačkoli offchain dostupnost dat přináší určité kompromisy, může vést k masivnímu zlepšení škálovatelnosti (Validia mohou zpracovat [\~9 000 transakcí nebo více za sekundu](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Předpoklady {#prerequisites}

Měli byste si přečíst a porozumět naší stránce o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2 (l2)](/layer-2).

## Co je Validium? {#what-is-validium}

Validia jsou řešení škálování, která využívají offchain dostupnost dat a výpočty navržené ke zlepšení propustnosti zpracováním transakcí mimo Ethereum Mainnet. Stejně jako rollupy s nulovým vědomím (ZK-rollupy), Validia publikují [důkazy s nulovou znalostí](/glossary/#zk-proof) k ověření offchain transakcí na Ethereu. To zabraňuje neplatným přechodům stavu a zvyšuje bezpečnostní záruky řetězce Validia.

Tyto „důkazy platnosti“ mohou mít podobu ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) nebo ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Více o [důkazech s nulovou znalostí](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Prostředky patřící uživatelům Validia jsou řízeny chytrým kontraktem na Ethereu. Validia nabízejí téměř okamžité výběry, podobně jako ZK-rollupy; jakmile je důkaz platnosti pro žádost o výběr ověřen na Mainnetu, uživatelé mohou vybrat prostředky poskytnutím [Merkleových důkazů](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Merkleův důkaz ověřuje zahrnutí uživatelovy transakce výběru do ověřené dávky transakcí, což umožňuje onchain kontraktu zpracovat výběr.

Uživatelům Validia však mohou být jejich prostředky zmrazeny a výběry omezeny. K tomu může dojít, pokud správci dostupnosti dat v řetězci Validia zatají uživatelům offchain data o stavu. Bez přístupu k transakčním datům nemohou uživatelé vypočítat Merkleův důkaz potřebný k prokázání vlastnictví prostředků a provedení výběrů.

To je hlavní rozdíl mezi Validii a ZK-rollupy – jejich pozice ve spektru dostupnosti dat. Obě řešení přistupují k ukládání dat odlišně, což má důsledky pro bezpečnost a bezdůvěrnost.

## Jak Validia interagují s Ethereem? {#how-do-validiums-interact-with-ethereum}

Validia jsou protokoly pro škálování postavené nad existujícím řetězcem Etherea. Ačkoli provádí transakce offchain, řetězec Validia je spravován sadou chytrých kontraktů nasazených na Mainnetu, včetně:

1. **Kontrakt ověřovatele**: Kontrakt ověřovatele ověřuje platnost důkazů předložených operátorem Validia při provádění aktualizací stavu. To zahrnuje důkazy platnosti potvrzující správnost offchain transakcí a důkazy dostupnosti dat ověřující existenci offchain transakčních dat.

2. **Hlavní kontrakt**: Hlavní kontrakt ukládá závazky stavu (Merkleho kořeny) předložené producenty bloků a aktualizuje stav Validia, jakmile je důkaz platnosti ověřen onchain. Tento kontrakt také zpracovává vklady do řetězce Validia a výběry z něj.

Validia se také spoléhají na hlavní řetězec Etherea v následujících ohledech:

### Vypořádání {#settlement}

Transakce provedené ve Validiu nemohou být plně potvrzeny, dokud nadřazený řetězec neověří jejich platnost. Veškerá činnost prováděná ve Validiu musí být nakonec vypořádána na Mainnetu. Blockchain Etherea také poskytuje uživatelům Validia „záruky vypořádání“, což znamená, že offchain transakce nemohou být zvráceny nebo změněny, jakmile jsou zapsány onchain.

### Bezpečnost {#security}

Ethereum, fungující jako vrstva vypořádání, také zaručuje platnost přechodů stavu ve Validiu. Offchain transakce provedené v řetězci Validia jsou ověřovány prostřednictvím chytrého kontraktu na základní vrstvě Etherea.

Pokud onchain kontrakt ověřovatele vyhodnotí důkaz jako neplatný, transakce jsou zamítnuty. To znamená, že operátoři musí splnit podmínky platnosti vynucované protokolem Etherea před aktualizací stavu Validia.

## Jak Validium funguje? {#how-does-validium-work}

### Transakce {#transactions}

Uživatelé odesílají transakce operátorovi, což je uzel zodpovědný za provádění transakcí v řetězci Validia. Některá Validia mohou k provádění řetězce používat jediného operátora nebo se spoléhat na mechanismus [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/) pro střídání operátorů.

Operátor agreguje transakce do dávky a odešle ji do dokazovacího obvodu k prokázání. Dokazovací obvod přijme dávku transakcí (a další relevantní data) jako vstupy a na výstupu vygeneruje důkaz platnosti ověřující, že operace byly provedeny správně.

### Závazky stavu {#state-commitments}

Stav Validia je zahašován jako Merkleův strom s kořenem uloženým v hlavním kontraktu na Ethereu. Merkleho kořen, známý také jako kořen stavu, funguje jako kryptografický závazek k aktuálnímu stavu účtů a zůstatků ve Validiu.

K provedení aktualizace stavu musí operátor vypočítat nový kořen stavu (po provedení transakcí) a odeslat jej do onchain kontraktu. Pokud je důkaz platnosti v pořádku, navrhovaný stav je přijat a Validium přejde na nový kořen stavu.

### Vklady a výběry {#deposits-and-withdrawals}

Uživatelé přesouvají prostředky z Etherea do Validia vložením ETH (nebo jakéhokoli ERC kompatibilního tokenu) do onchain kontraktu. Kontrakt předá událost vkladu do Validia offchain, kde je na adresu uživatele připsána částka rovnající se jeho vkladu. Operátor také zahrne tuto transakci vkladu do nové dávky.

Pro přesun prostředků zpět na Mainnet iniciuje uživatel Validia transakci výběru a odešle ji operátorovi, který žádost o výběr ověří a zahrne ji do dávky. Aktiva uživatele v řetězci Validia jsou také zničena, než mohou opustit systém. Jakmile je důkaz platnosti spojený s dávkou ověřen, uživatel může zavolat hlavní kontrakt a vybrat zbytek svého původního vkladu.

Jako mechanismus proti cenzuře umožňuje protokol Validia uživatelům vybírat přímo z kontraktu Validia, aniž by museli jít přes operátora. V tomto případě musí uživatelé poskytnout Merkleův důkaz kontraktu ověřovatele, který prokazuje zahrnutí účtu do kořene stavu. Pokud je důkaz přijat, uživatel může zavolat funkci výběru hlavního kontraktu a vybrat své prostředky z Validia.

### Odeslání dávky {#batch-submission}

Po provedení dávky transakcí operátor odešle přidružený důkaz platnosti kontraktu ověřovatele a navrhne nový kořen stavu hlavnímu kontraktu. Pokud je důkaz platný, hlavní kontrakt aktualizuje stav Validia a finalizuje výsledky transakcí v dávce.

Na rozdíl od ZK-rollupu nejsou producenti bloků ve Validiu povinni publikovat transakční data pro dávky transakcí (pouze hlavičky bloků). To dělá z Validia čistě offchain protokol pro škálování, na rozdíl od „hybridních“ protokolů pro škálování (tj. [vrstva 2 (l2)](/layer-2/)), které publikují data o stavu na hlavním řetězci Etherea pomocí blob dat, `calldata` nebo kombinace obojího.

### Dostupnost dat {#data-availability}

Jak již bylo zmíněno, Validia využívají model offchain dostupnosti dat, kde operátoři ukládají všechna transakční data mimo Ethereum Mainnet. Nízká onchain datová stopa Validia zlepšuje škálovatelnost (propustnost není omezena kapacitou zpracování dat Etherea) a snižuje uživatelské poplatky (náklady na publikování dat onchain jsou nižší).

Offchain dostupnost dat však představuje problém: data nezbytná pro vytvoření nebo ověření Merkleových důkazů mohou být nedostupná. To znamená, že uživatelé by nemuseli být schopni vybrat prostředky z onchain kontraktu, pokud by operátoři jednali zlomyslně.

Různá řešení Validia se pokoušejí tento problém vyřešit decentralizací ukládání dat o stavu. To zahrnuje donucení producentů bloků odesílat podkladová data „správcům dostupnosti dat“, kteří jsou zodpovědní za ukládání offchain dat a jejich zpřístupnění uživatelům na vyžádání.

Správci dostupnosti dat ve Validiu potvrzují dostupnost dat pro offchain transakce podepisováním každé dávky Validia. Tyto podpisy tvoří formu „důkazu dostupnosti“, kterou onchain kontrakt ověřovatele kontroluje před schválením aktualizací stavu.

Validia se liší ve svém přístupu ke správě dostupnosti dat. Některá se spoléhají na důvěryhodné strany při ukládání dat o stavu, zatímco jiná k tomuto úkolu používají náhodně přiřazené validátory.

#### Výbor pro dostupnost dat (DAC) {#data-availability-committee}

K zaručení dostupnosti offchain dat některá řešení Validia jmenují skupinu důvěryhodných subjektů, souhrnně známou jako výbor pro dostupnost dat (DAC), aby ukládala kopie stavu a poskytovala důkaz o dostupnosti dat. DAC se snáze implementují a vyžadují méně koordinace, protože počet členů je nízký.

Uživatelé však musí důvěřovat DAC, že data zpřístupní, když to bude potřeba (např. pro generování Merkleových důkazů). Existuje možnost, že členové výborů pro dostupnost dat [budou kompromitováni zlomyslným aktérem](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), který pak může zatajit offchain data.

[Více o výborech pro dostupnost dat ve Validiích](https://medium.com/starkware/data-availability-e5564c416424).

#### Dostupnost dat s kaucí {#bonded-data-availability}

Jiná Validia vyžadují, aby účastníci pověření ukládáním offline dat vložili stake (tj. uzamkli) tokeny v chytrém kontraktu, než převezmou své role. Tento stake slouží jako „kauce“ k zaručení poctivého chování mezi správci dostupnosti dat a snižuje předpoklady důvěry. Pokud tito účastníci neprokážou dostupnost dat, kauce je penalizována.

Ve schématu dostupnosti dat s kaucí může být kdokoli pověřen uchováváním offchain dat, jakmile poskytne požadovaný stake. To rozšiřuje okruh způsobilých správců dostupnosti dat a snižuje centralizaci, která ovlivňuje výbory pro dostupnost dat (DAC). A co je důležitější, tento přístup se spoléhá na kryptoekonomické pobídky k prevenci zlomyslné aktivity, což je podstatně bezpečnější než jmenování důvěryhodných stran k zabezpečení offline dat ve Validiu.

[Více o dostupnosti dat s kaucí ve Validiích](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions a Validium {#volitions-and-validium}

Validia nabízejí mnoho výhod, ale přinášejí s sebou kompromisy (nejvýrazněji dostupnost dat). Ale stejně jako u mnoha řešení škálování jsou Validia vhodná pro specifické případy použití – a proto byly vytvořeny volitions.

Volitions kombinují ZK-rollup a řetězec Validia a umožňují uživatelům přepínat mezi těmito dvěma řešeními škálování. S volitions mohou uživatelé využít offchain dostupnost dat Validia pro určité transakce, přičemž si zachovávají svobodu přepnout na řešení s onchain dostupností dat (ZK-rollup), pokud je to potřeba. To v podstatě dává uživatelům svobodu zvolit si kompromisy tak, jak to diktují jejich jedinečné okolnosti.

Decentralizovaná burza (DEX) může preferovat použití škálovatelné a soukromé infrastruktury Validia pro obchody s vysokou hodnotou. Může také použít ZK-rollup pro uživatele, kteří chtějí vyšší bezpečnostní záruky a bezdůvěrnost ZK-rollupu.

## Validia a kompatibilita s EVM {#validiums-and-evm-compatibility}

Stejně jako ZK-rollupy jsou Validia většinou vhodná pro jednoduché aplikace, jako jsou swapy tokenů a platby. Podpora obecných výpočtů a provádění chytrých kontraktů mezi Validii je obtížně implementovatelná vzhledem ke značné režii dokazování instrukcí [EVM](/developers/docs/evm/) v obvodu důkazu s nulovou znalostí.

Některé projekty Validia se pokoušejí tento problém obejít kompilací jazyků kompatibilních s EVM (např. Solidity, Vyper) do vlastního bajtkódu optimalizovaného pro efektivní dokazování. Nevýhodou tohoto přístupu je, že nové virtuální stroje (VM) přátelské k důkazům s nulovou znalostí nemusí podporovat důležité EVM opkódy a vývojáři musí psát přímo ve vysokoúrovňovém jazyce pro optimální zážitek. To vytváří ještě více problémů: nutí to vývojáře budovat decentralizované aplikace (dapps) se zcela novým vývojovým stackem a narušuje to kompatibilitu se současnou infrastrukturou Etherea.

Některé týmy se však pokoušejí optimalizovat stávající EVM opkódy pro ZK dokazovací obvody. To povede k vývoji virtuálního stroje Etherea s nulovým vědomím (zkEVM), virtuálního stroje kompatibilního s EVM, který produkuje důkazy k ověření správnosti provádění programu. S zkEVM mohou řetězce Validia provádet chytré kontrakty offchain a odesílat důkazy platnosti k ověření offchain výpočtu (aniž by jej musely znovu provádět) na Ethereu.

[Více o zkEVM](https://www.alchemy.com/overviews/zkevm).

## Jak Validia škálují Ethereum? {#scaling-ethereum-with-validiums}

### 1. Offchain ukládání dat {#offchain-data-storage}

Projekty škálování na vrstvě 2 (l2), jako jsou optimistické rollupy a ZK-rollupy, vyměňují nekonečnou škálovatelnost čistě offchain protokolů pro škálování (např. [Plasma](/developers/docs/scaling/plasma/)) za bezpečnost tím, že publikují některá transakční data na vrstvě 1 (l1). To ale znamená, že vlastnosti škálovatelnosti rollupů jsou omezeny datovou propustností na Ethereum Mainnetu (z tohoto důvodu navrhuje [datový sharding](/roadmap/danksharding/) zlepšit kapacitu ukládání dat Etherea).

Validia dosahují škálovatelnosti tím, že udržují všechna transakční data offchain a zveřejňují pouze závazky stavu (a důkazy platnosti) při předávání aktualizací stavu do hlavního řetězce Etherea. Existence důkazů platnosti však dává Validiím vyšší bezpečnostní záruky než jiným čistě offchain řešením škálování, včetně Plasmy a [postranních řetězců (sidechains)](/developers/docs/scaling/sidechains/). Snížením množství dat, která musí Ethereum zpracovat před ověřením offchain transakcí, návrhy Validia výrazně rozšiřují propustnost na Mainnetu.

### 2. Rekurzivní důkazy {#recursive-proofs}

Rekurzivní důkaz je důkaz platnosti, který ověřuje platnost jiných důkazů. Tyto „důkazy důkazů“ jsou generovány rekurzivní agregací více důkazů, dokud není vytvořen jeden konečný důkaz ověřující všechny předchozí důkazy. Rekurzivní důkazy škálují rychlost zpracování blockchainu zvýšením počtu transakcí, které lze ověřit na jeden důkaz platnosti.

Typicky každý důkaz platnosti, který operátor Validia odešle Ethereu k ověření, ověřuje integritu jednoho bloku. Zatímco jeden rekurzivní důkaz lze použít k potvrzení platnosti několika bloků Validia současně – to je možné, protože dokazovací obvod může rekurzivně agregovat několik důkazů bloků do jednoho konečného důkazu. Pokud onchain kontrakt ověřovatele přijme rekurzivní důkaz, všechny podkladové bloky jsou okamžitě finalizovány.

## Výhody a nevýhody Validia {#pros-and-cons-of-validium}

| Výhody                                                                                                                     | Nevýhody                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Důkazy platnosti vynucují integritu offchain transakcí a brání operátorům ve finalizaci neplatných aktualizací stavu. | Vytváření důkazů platnosti vyžaduje speciální hardware, což představuje riziko centralizace.                                                              |
| Zvyšuje kapitálovou efektivitu pro uživatele (žádná zpoždění při výběru prostředků zpět do Etherea).                                 | Omezená podpora pro obecné výpočty / chytré kontrakty; pro vývoj jsou vyžadovány specializované jazyky.                                             |
| Není zranitelné vůči určitým ekonomickým útokům, kterým čelí systémy založené na důkazech podvodu v aplikacích s vysokou hodnotou.                | Vysoký výpočetní výkon potřebný ke generování ZK důkazů; není nákladově efektivní pro aplikace s nízkou propustností.                                         |
| Snižuje poplatky za gas pro uživatele tím, že neodesílá data volání na Ethereum Mainnet.                                                  | Pomalejší doba subjektivní finality (10-30 min na vygenerování ZK důkazu), ale rychlejší dosažení plné finality, protože nedochází k časovému zpoždění kvůli sporům.               |
| Vhodné pro specifické případy použití, jako je obchodování nebo blockchainové hry, které upřednostňují soukromí transakcí a škálovatelnost.  | Uživatelům může být zabráněno ve výběru prostředků, protože generování Merkleových důkazů vlastnictví vyžaduje, aby byla offchain data neustále k dispozici.      |
| Offchain dostupnost dat poskytuje vyšší úroveň propustnosti a zvyšuje škálovatelnost.                              | Bezpečnostní model se spoléhá na předpoklady důvěry a kryptoekonomické pobídky, na rozdíl od ZK-rollupů, které se spoléhají čistě na kryptografické bezpečnostní mechanismy. |

### Použití Validia / Volitions {#use-validium-and-volitions}

Více projektů poskytuje implementace Validia a volitions, které můžete integrovat do svých decentralizovaných aplikací (dapps):

**StarkWare StarkEx** - _StarkEx je řešení škálovatelnosti Etherea na vrstvě 2 (l2), které je založeno na důkazech platnosti. Může fungovat v režimech dostupnosti dat ZK-Rollup nebo Validium._

- [Dokumentace](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Webové stránky](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter je protokol pro škálování na vrstvě 2 (l2), který řeší dostupnost dat hybridním přístupem kombinujícím myšlenky zkRollupu a shardingu. Může podporovat libovolně mnoho shardů, z nichž každý má svou vlastní politiku dostupnosti dat._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentace](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Webové stránky](https://zksync.io/)

## Další čtení {#further-reading}

- [Validium a vrstva 2 (l2) Two-By-Two — Vydání č. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollupy vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition a vznikající spektrum dostupnosti dat](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Praktický průvodce rollupy na Ethereu](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)