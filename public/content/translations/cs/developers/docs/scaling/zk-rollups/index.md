---
title: Rollupy s nulovým přístupem
description: Úvod do rollupů s nulovou znalostí – řešení pro škálování, které používá komunita Etherea.
lang: cs
---

Rollupy s nulovou znalostí (ZK-rollupy) jsou [škálovací řešení](/developers/docs/scaling/) vrstvy 2, která zvyšují propustnost na Ethereum Mainnetu tím, že přesouvají výpočty a ukládání stavu mimo řetězec. ZK-rollupy mohou zpracovat tisíce transakcí v jednom balíku a poté na Mainnetu zveřejní pouze minimální souhrnná data. Tato souhrnná data definují změny, které by měly být provedeny ve stavu Etherea, a obsahují kryptografický důkaz o správnosti těchto změn.

## Předpoklady {#prerequisites}

Měli byste si přečíst a porozumět naší stránce o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2](/layer-2).

## Co jsou rollupy s nulovou znalostí? {#what-are-zk-rollups}

**Rollupy s nulovou znalostí (ZK-rollupy)** seskupují (nebo „rolují“) transakce do balíků, které jsou exekuovány mimo řetězec. Off-chain výpočty snižují množství dat, která musí být zveřejněna na blockchainu. Operátoři ZK-rollupů předkládají souhrn změn potřebných k reprezentaci všech transakcí v balíku místo toho, aby odesílali každou transakci jednotlivě. Také vytvářejí [důkazy o platnosti](/glossary/#validity-proof), které prokazují správnost těchto změn.

Stav ZK-rollupu je udržován smart kontraktem nasazeným na síti Etherea. Pro aktualizaci stavu musí síťové uzly ZK-rollupu předložit důkaz o platnosti k ověření. Jak bylo zmíněno, důkaz o platnosti je kryptografickou zárukou, že změna stavu navržená rollupem je skutečně výsledkem exekuce daného balíku transakcí. To znamená, že ZK-rollupy potřebují k finalizaci transakcí na Ethereu poskytnout pouze důkazy o platnosti namísto zveřejnění všech transakčních dat na řetězci, jako to dělají [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/).

Při přesunu prostředků ze ZK-rollupu na Ethereum nedochází ke zpožděním, protože transakce výstupu jsou provedeny ihned po ověření důkazu o platnosti kontraktem ZK-rollupu. Naopak výběr prostředků z optimistických rollupů podléhá zpoždění, aby měl kdokoli možnost napadnout výstupní transakci [důkazem podvodu](/glossary/#fraud-proof).

ZK-rollupy zapisují transakce na Ethereum jako `calldata`. `calldata` je místo, kde jsou uložena data, která jsou zahrnuta v externích voláních funkcí smart kontraktů. Informace v `calldata` jsou publikovány na blockchainu, což umožňuje komukoli nezávisle rekonstruovat stav rollupu. ZK-rollupy používají kompresní techniky ke snížení objemu transakčních dat – například účty jsou reprezentovány indexem namísto adresy, což ušetří 28 bajtů dat. Publikování dat na řetězec je pro rollupy velkým nákladem, takže komprese dat může snížit poplatky uživatelů.

## Jak ZK-rollupy interagují s Ethereem? {#zk-rollups-and-ethereum}

Řetězec ZK-rollupu je off-chain protokol, který funguje na vrcholu blockchainu Etherea a je řízen on-chain smart kontrakty na Ethereu. ZK-rollupy provádějí transakce mimo Mainnet, ale pravidelně odesílají balíky transakcí z off-chain na on-chain kontrakt rollupu. Tento záznam transakcí je neměnný, podobně jako blockchain Etherea, a tvoří řetězec ZK-rollupu.

Základní architektura ZK-rollupu se skládá z následujících komponent:

1. **On-chain kontrakty**: Jak již bylo zmíněno, ZK-rollup protokol je řízen smart kontrakty běžícími na Ethereu. To zahrnuje hlavní kontrakt, který ukládá bloky rollupu, sleduje vklady a monitoruje aktualizace stavu. Další on-chain kontrakt (ověřovací kontrakt) ověřuje důkazy s nulovou znalostí předložené producenty bloků. Ethereum tak slouží jako základní vrstva nebo „vrstva 1“ pro ZK-rollup.

2. **Off-chain virtuální stroj (VM)**: Zatímco ZK-rollup protokol existuje na Ethereu, provádění transakcí a ukládání stavu probíhá na samostatném virtuálním stroji nezávislém na [EVM](/developers/docs/evm/). Tento off-chain VM je prostředí pro provádění transakcí na ZK-rollupu a slouží jako sekundární vrstva nebo „vrstva 2“ pro ZK-rollup protokol. Důkazy o platnosti ověřené na Ethereum Mainnetu zaručují správnost přechodů stavu v off-chain VM.

ZK-rollupy jsou „hybridní škálovací řešení“ – off-chain protokoly, které fungují nezávisle, ale odvozují bezpečnost od Etherea. Konkrétně síť Etherea vynucuje platnost aktualizací stavu na ZK-rollupu a zaručuje dostupnost dat za každou aktualizací stavu rollupu. Výsledkem je, že ZK-rollupy jsou podstatně bezpečnější než čistě off-chain škálovací řešení, jako jsou [postranní řetězce](/developers/docs/scaling/sidechains/), které jsou odpovědné za své bezpečnostní vlastnosti, nebo [validia](/developers/docs/scaling/validium/), která také ověřují transakce na Ethereu pomocí důkazů o platnosti, ale ukládají transakční data jinde.

Rollupy s nulovou znalostí se spoléhají na hlavní protokol Etherea z následujících důvodů:

### Dostupnost dat {#data-availability}

ZK-rollupy publikují stavová data pro každou transakci zpracovanou mimo řetězec na Ethereu. S těmito daty je možné, aby jednotlivci nebo firmy reprodukovali stav rollupu a sami si ověřili řetězec. Ethereum zpřístupňuje tato data všem účastníkům sítě jako `calldata`.

ZK-rollupy nepotřebují zveřejňovat mnoho transakčních dat on-chain, protože důkazy o platnosti již ověřují autenticitu změn stavu. Nicméně ukládání dat on-chain je stále důležité, protože umožňuje nezávislé ověření stavu řetězce vrstvy 2 bez nutnosti důvěry, což zase umožňuje komukoli odesílat balíky transakcí a zabraňuje škodlivým operátorům v cenzurování nebo zmrazení řetězce.

On-chain data jsou nezbytná pro to, aby mohli uživatelé interagovat s rollupem. Bez přístupu k datům stavu uživatelé nemohou dotazovat zůstatek svého účtu nebo iniciovat transakce (např. výběry), které závisí na informacích o stavu.

### Finálnost transakcí {#transaction-finality}

Ethereum funguje jako vypořádací vrstva pro ZK-rollupy: Transakce vrstvy 2 jsou finalizovány pouze tehdy, pokud L1 kontrakt přijme důkaz o platnosti. To eliminuje riziko, že by podvodní operátoři mohli řetězec zkompromitovat (např. ukrást prostředky rollupu), protože každá transakce musí být schválena na Mainnetu. Ethereum také zaručuje, že uživatelské operace nemohou být po jejich finalizaci na L1 zrušeny.

### Odolnost proti cenzuře {#censorship-resistance}

Většina ZK-rollupů používá „superuzel“ (operátora) k provádění transakcí, vytváření balíků a odesílání bloků na vrstvu 1. I když to zajišťuje efektivitu, zvyšuje to riziko cenzury: Podvodní operátoři ZK-rollupu mohou cenzurovat uživatele tím, že odmítnou zahrnout jejich transakce do balíků.

Jako bezpečnostní opatření umožňují ZK-rollupy uživatelům zasílat transakce přímo na rollup kontrakt na Mainnetu, pokud se domnívají, že jsou operátorem cenzurováni. To umožňuje uživatelům vynutit si výstup ze ZK-rollupu na Ethereum, aniž by se museli spoléhat na svolení operátora.

## Jak ZK-rollupy fungují? {#how-do-zk-rollups-work}

### Transakce {#transactions}

Uživatelé v ZK-rollupu podepisují transakce a zasílají je operátorům L2 ke zpracování a zahrnutí do dalšího balíku. V některých případech je operátor centralizovaný subjekt, nazývaný sekvencer, který provádí transakce, agreguje je do balíků a odesílá na vrstvu 1. Sekvencer v tomto systému je jediným subjektem, který má povoleno vytvářet bloky vrstvy 2 a přidávat transakce rollupu do kontraktu ZK-rollupu.

Jiné ZK-rollupy mohou rotovat roli operátora pomocí sady validátorů [proof of stake](/developers/docs/consensus-mechanisms/pos/). Potenciální operátoři vkládají prostředky do kontraktu rollupu, přičemž velikost každého vkladu ovlivňuje šance stakera na výběr pro vytvoření dalšího balíku rollupu. Podíl operátora může být penalizován snížením zástavy, pokud jedná podvodně, což ho motivuje k tomu, aby odesílal platné bloky.

#### Jak ZK-rollupy publikují transakční data na Ethereu {#how-zk-rollups-publish-transaction-data-on-ethereum}

Jak jsme už vysvětlili, transakční data jsou publikována na Ethereu jako `calldata`. `calldata` je datová oblast ve smart kontraktu, která slouží k předávání argumentů do funkce a chová se podobně jako [paměť](/developers/docs/smart-contracts/anatomy/#memory). Zatímco oblast `calldata` není uložena jako součást stavu Etherea, přetrvává na řetězci jako součást [historických logů](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) řetězce Etherea. `calldata` neovlivňuje stav Etherea, což z ní činí levný způsob ukládání dat na řetězci.

Klíčové slovo `calldata` často identifikuje metodu smart kontraktu, kterou transakce volá, a obsahuje vstupy do metody ve formě libovolné posloupnosti bajtů. ZK-rollupy používají `calldata` k publikování komprimovaných transakčních dat na řetězec; operátor rollupu jednoduše přidá nový balík tím, že zavolá požadovanou funkci v kontraktu rollupu a předá komprimovaná data jako argumenty funkce. To pomáhá snižovat náklady uživatelů, protože velká část poplatků za rollupy jde na ukládání transakčních dat na řetězci.

### Závazky stavu {#state-commitments}

Stav ZK-rollupu, který zahrnuje účty a zůstatky vrstvy 2, je reprezentován jako [Merkle tree](/whitepaper/#merkle-trees). Kryptografický hash kořene Merkle tree (Merkle kořen) je uložen v on-chain kontraktu, což umožňuje protokolu rollupu sledovat změny ve stavu ZK-rollupu.

Rollup přechází do nového stavu po provedení nové sady transakcí. Operátor, který inicioval přechod stavu, musí vypočítat nový kořen stavu a předložit ho on-chain kontraktu. Pokud je důkaz o platnosti spojený s balíkem ověřen ověřovacím kontraktem, nový Merkle kořen se stává kanonickým kořenem stavu ZK-rollupu.

Kromě výpočtu kořenů stavu operátor ZK-rollupu také vytváří kořen balíku – kořen Merkle tree zahrnujícího všechny transakce v balíku. Když je předložen nový balík, kontrakt rollupu ukládá kořen balíku, což umožňuje uživatelům prokázat, že transakce (např. žádost o výběr) byla zahrnuta do balíku. Uživatelé budou muset poskytnout podrobnosti o transakci, kořen balíku a [Merkle důkaz](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) prokazující cestu vedoucí k zahrnutí.

### Důkazy platnosti {#validity-proofs}

Nový kořen stavu, který operátor ZK-rollupu předloží L1 kontraktu, je výsledkem aktualizací stavu rollupu. Řekněme, že Alice pošle Bobovi 10 tokenů, operátor jednoduše sníží zůstatek Alice o 10 a zvýší zůstatek Boba o 10. Operátor pak zahešuje aktualizovaná data účtu, znovu vytvoří Merkle tree rollupu a předloží nový Merkle kořen on-chain kontraktu.

Ale kontrakt rollupu automaticky nepřijme navrhovaný závazek stavu, dokud operátor neprokáže, že nový Merkle kořen je výsledkem správných aktualizací stavu rollupu. Operátor ZK-rollupu to provede vytvořením důkazu platnosti, což je stručný kryptografický závazek ověřující správnost seskupených transakcí.

Důkazy platnosti umožňují stranám prokázat správnost tvrzení, aniž by odhalily samotné tvrzení – proto se také nazývají důkazy s nulovou znalostí. ZK-rollupy používají důkazy o platnosti k potvrzení správnosti off-chain přechodů stavu, aniž by bylo nutné znovu provádět transakce na Ethereu. Tyto důkazy mohou mít podobu [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) nebo [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Oba typy důkazů, SNARKy a STARKy, pomáhají potvrdit integritu off-chain výpočtů v ZK-rollupech, ačkoli každý typ důkazu má své charakteristické rysy.

**ZK-SNARKy**

Aby protokol ZK-SNARK fungoval, je nutné vytvořit společný referenční řetězec (Common Reference String, CRS): CRS poskytuje veřejné parametry pro dokazování a ověřování důkazů o platnosti. Bezpečnost systému dokazování závisí na nastavení CRS; pokud by se informace použité k vytvoření veřejných parametrů dostaly do rukou podvodníků, mohli by být schopni generovat falešné důkazy platnosti.

Některé ZK-rollupy se pokoušejí tento problém vyřešit pomocí [ceremoniálu více stran (multi-party computation ceremony, MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), který zahrnuje důvěryhodné jednotlivce při generování veřejných parametrů pro ZK-SNARK okruh. Každá strana přispívá určitou náhodností (nazývanou „toxický odpad“) k vytvoření CRS, kterou musí okamžitě zničit.

Důvěryhodné nastavení se používá, protože zvyšuje bezpečnost nastavení CRS. V případě, že byť pouze jeden čestný účastník zničí svůj vstup, je bezpečnost ZK-SNARK systému zaručena. Tento přístup však vyžaduje důvěru, že zapojení jedinci skutečně vymažou svou náhodnost a nepodkopou bezpečnostní záruky systému.

Bez ohledu na nutnost důvěry jsou ZK-SNARKy oblíbené pro své malé velikosti důkazů a konstantní dobu ověřování. Protože ověřování důkazů na vrstvě 1 představuje největší náklad na provoz ZK-rollupu, vrstvy 2 používají ZK-SNARKy k vytváření důkazů, které lze na Mainnetu rychle a levně ověřit.

**ZK-STARKy**

Stejně jako ZK-SNARKy, ZK-STARKy prokazují platnost off-chain výpočtů, aniž by odhalily vstupy. ZK-STARKy jsou nicméně považovány za zlepšení oproti ZK-SNARKům díky jejich škálovatelnosti a transparentnosti.

ZK-STARKy jsou „transparentní“, protože mohou fungovat bez nastavení společného referenčního řetězce (CRS), které vyžaduje důvěru. Místo toho se ZK-STARKy spoléhají na veřejně ověřitelnou náhodnost k nastavení parametrů pro generování a ověřování důkazů.

ZK-STARKy také poskytují větší škálovatelnost, protože čas potřebný k prokázání a ověření důkazů o platnosti roste _kvazilineárně_ ve vztahu ke složitosti podkladového výpočtu. U ZK-SNARKů se čas potřebný k prokázání a ověření důkazů škáluje _lineárně_ ve vztahu k velikosti podkladového výpočtu. To znamená, že ZK-STARKy vyžadují méně času než ZK-SNARKy pro prokazování a ověřování, když jsou zahrnuty velké objemy dat, což je činí užitečnými pro aplikace s vysokým objemem transakcí.

ZK-STARKy jsou také bezpečné vůči kvantovým počítačům, zatímco se obecně věří, že kryptografie na eliptických křivkách (Elliptic Curve Cryptography, ECC) používaná v ZK-SNARK řešeních je náchylná k útokům kvantových počítačů. Nevýhodou ZK-STARKů je, že produkují větší velikosti důkazů, což je dražší na ověřování na Ethereu.

#### Jak fungují důkazy o platnosti na ZK-rollupech? {#validity-proofs-in-zk-rollups}

##### Generování důkazů

Před přijetím transakcí provede operátor obvyklé kontroly. To zahrnuje potvrzení, že:

- Účty odesílatele a příjemce jsou součástí stromu stavu.
- Odesílatel má dostatek prostředků na zpracování transakce.
- Transakce je správná a odpovídá veřejnému klíči odesílatele na rollupu.
- Nonce odesílatele je správné atd.

Jakmile má síťový uzel ZK-rollupu dostatek transakcí, agreguje je do balíku a připraví vstupy pro ověřovací okruh, aby je sestavil do stručného ZK-důkazu. To zahrnuje:

- Kořen Merkle tree zahrnující všechny transakce v balíku.
- Merkle důkazy pro transakce k prokázání jejich zahrnutí do balíku.
- Merkle důkazy pro každý pár odesílatel-příjemce v transakcích, aby bylo možné prokázat, že tyto účty jsou součástí stromu stavu rollupu.
- Sadu mezistavových kořenů, odvozených z aktualizace kořene stavu po aplikaci aktualizací stavu pro každou transakci (tj. snížení zůstatku účtů odesílatelů a zvýšení zůstatku účtů příjemců).

Ověřovací okruh vypočítá důkaz o platnosti tak, že „prochází“ každou transakci a provádí stejné kontroly, které operátor provedl před zpracováním transakce. Nejprve ověřuje, zda je účet odesílatele součástí existujícího kořene stavu pomocí poskytnutého Merkle důkazu. Poté sníží zůstatek odesílatele, zvýší jeho nonce, zahešuje aktualizovaná data účtu a spojí je s Merkle důkazem k vytvoření nového Merkle kořene.

Tento Merkle kořen odráží jedinou změnu ve stavu ZK-rollupu: změnu zůstatku a nonce odesílatele. To je možné, protože Merkleův důkaz použitý k prokázání existence účtu je použit k odvození nového kořene stavu.

Ověřovací okruh provádí stejný proces na účtu příjemce. Ověří, zda účet příjemce existuje pod mezistavovým kořenem (pomocí Merkle důkazu), zvýší jeho zůstatek, znovu zahešuje data účtu a spojí je s Merkle důkazem k vytvoření nového kořene stavu.

Tento proces se opakuje pro každou transakci; každá „smyčka“ vytváří nový kořen stavu z aktualizace účtu odesílatele a následný nový kořen z aktualizace účtu příjemce. Jak jsme již vysvětlili, každá aktualizace kořene stavu představuje změnu jedné části stromu stavu rollupu.

ZK-ověřovací okruh iteruje celým balíkem transakcí, ověřuje sekvenci aktualizací, které vedou k finálnímu kořenu stavu po provedení poslední transakce. Poslední vypočítaný Merkle kořen se stává nejnovějším kanonickým kořenem stavu ZK-rollupu.

##### Ověřování důkazů

Po ověření správnosti aktualizací stavu ověřovacím okruhem podá operátor L2 vypočítaný důkaz o platnosti ověřovacímu kontraktu na L1. Ověřovací okruh kontraktu ověřuje platnost důkazu a také kontroluje veřejné vstupy, které jsou součástí důkazu:

- **Představový kořen**: Starý kořen stavu ZK-rollupu (tj. před provedením seskupených transakcí), který odráží poslední známý platný stav řetězce L2.

- **Po-stavový kořen**: Nový kořen stavu ZK-rollupu (tj. po provedení seskupených transakcí), který odráží nejnovější stav řetězce L2. Po-stavový kořen je finální kořen odvozený po aplikaci aktualizací stavu v ověřovacím okruhu.

- **Kořen balíku**: Merkle kořen balíku, odvozený _merklováním_ transakcí v balíku a hašováním kořene stromu.

- **Transakční vstupy**: Data spojená s transakcemi, které jsou součástí podaného balíku.

Pokud důkaz splňuje podmínky okruhu (tj. je platný), znamená to, že existuje sekvence platných transakcí, které přecházejí z rollupu z předchozího stavu (kryptograficky otisknutého představovým kořenem) do nového stavu (kryptograficky otisknutého po-stavovým kořenem). Pokud se představový kořen shoduje s kořenem uloženým v kontraktu rollupu a důkaz je platný, kontrakt rollupu vezme po-stavový kořen z důkazu a aktualizuje svůj strom stavu, aby odrážel změněný stav rollupu.

### Vstupy a výstupy {#entries-and-exits}

Uživatelé vstupují do ZK-rollupu vkladem tokenů do kontraktu rollupu nasazeného na řetězci L1. Tato transakce je zařazena do fronty, protože pouze operátoři mohou podávat transakce do kontraktu rollupu.

Pokud se fronta čekajících vkladů začne plnit, operátor ZK-rollupu vezme vkladové transakce a odešle je do rollupového kontraktu. Jakmile jsou prostředky uživatele v rollupu, mohou začít provádět transakce tím, že je pošlou operátorovi ke zpracování. Uživatelé mohou ověřit zůstatky na rollupu tak, že zahašují svá data účtu, pošlou hash do rollupového kontraktu a poskytnou Merkle důkaz pro ověření vůči aktuálnímu kořeni stavu.

Výběr ze ZK-rollupu na L1 je jednoduchý. Uživatel zahájí výstupní transakci tím, že pošle svá aktiva na rollupu na určený účet ke spálení. Pokud operátor zahrne transakci do dalšího balíku, uživatel může předložit žádost o výběr on-chain kontraktu. Tato žádost o výběr bude obsahovat následující:

- Merkle důkaz prokazující zahrnutí uživatelské transakce na účet ke spálení v transakčním balíku

- Transakční data

- Kořen balíku

- Adresu na L1 pro příjem vkládaných prostředků

Rollup kontrakt zahašuje transakční data, ověří, zda kořen balíku existuje, a použije Merkle důkaz k ověření, zda je hash transakce součástí kořene balíku. Poté kontrakt provede výstupní transakci a odešle prostředky na adresu uživatele na L1.

## ZK-rollupy a kompatibilita s EVM {#zk-rollups-and-evm-compatibility}

Na rozdíl od optimistických rollupů nejsou ZK-rollupy snadno kompatibilní s [Virtuálním strojem Etherea (EVM)](/developers/docs/evm/). Ověřování obecného výpočtu EVM v okruzích je složitější a náročnější na zdroje než ověřování jednoduchých výpočtů (jako je dříve popsaný převod tokenů).

[Pokroky v technologii nulové znalosti](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) však znovu probouzí zájem o zabalení výpočtů EVM do důkazů s nulovou znalostí. Tyto snahy směřují k vytvoření implementace EVM s nulovou znalostí (zkEVM), která by mohla efektivně ověřovat správnost provádění programů. zkEVM znovu vytváří stávající opkódy EVM pro dokazování a nebo ověřování v okruzích, což umožňuje exekuci smart kontraktů.

Stejně jako EVM přechází zkEVM mezi stavy po provedení výpočtu na základě některých vstupů. Rozdíl je v tom, že zkEVM také vytváří důkazy s nulovou znalostí pro ověření správnosti každého kroku v exekuci programu. Důkazy o platnosti by mohly ověřovat správnost operací, které ovlivňují stav VM (paměť, zásobník, úložiště) a samotný výpočet (tj. zda operace zavolala správné opkódy a provedla je správně).

Zavedení ZK-rollupů kompatibilních s EVM by mělo pomoci vývojářům využít škálovatelnost a bezpečnostní záruky důkazů s nulovou znalostí. Důležitější je, že kompatibilita s nativní infrastrukturou Etherea znamená, že vývojáři mohou vytvářet aplikace přátelské k nulové znalosti pomocí známých (a ověřených) nástrojů a jazyků.

## Jak fungují poplatky na ZK-rollupech? {#how-do-zk-rollup-fees-work}

Kolik uživatelé platí za transakce na ZK-rollupech závisí na poplatku za palivo, stejně jako na Ethereum Mainnetu. Nicméně poplatky za palivo fungují na L2 odlišně a jsou ovlivněny následujícími náklady:

1. **Zápis stavu**: Náklad na zápis do stavu Etherea (tj. podání transakce na blockchainu Etherea) je pevně daný. ZK-rollupy tento náklad snižují tím, že seskupují transakce a rozdělují pevné náklady mezi více uživatelů.

2. **Publikování dat**: ZK-rollupy publikují stavová data pro každou transakci na Ethereu jako `calldata`. Náklady na `calldata` jsou aktuálně řízeny [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), který stanovuje náklady 16 jednotek paliva za bajt, který není nulový, a 4 jednotky paliva za nulový bajt `calldata`. Cena zaplacená za každou transakci je ovlivněna množstvím `calldata`, které je potřeba zveřejnit.

3. **Poplatky operátorů L2**: Toto je částka vyplacená operátorovi rollupu jako kompenzace za výpočetní náklady spojené se zpracováním transakcí, podobně jako [„poplatky za prioritu transakce (spropitné)“](/developers/docs/gas/#how-are-gas-fees-calculated) na Ethereum Mainnetu.

4. **Generování a ověřování důkazů**: Operátoři ZK-rollupu musí produkovat důkazy o platnosti pro transakční balíky, což je náročné na zdroje. Ověřování důkazů s nulovou znalostí na Mainnetu stojí další palivo (asi 500 000 jednotek paliva).

Kromě seskupování transakcí snižují ZK-rollupy poplatky pro uživatele kompresí transakčních dat. Můžete se [podívat na aktuální přehled nákladů](https://l2fees.info/) na používání Ethereum ZK-rollupů.

## Jak ZK-rollupy škálují Ethereum? {#scaling-ethereum-with-zk-rollups}

### Komprese dat transakcí {#transaction-data-compression}

ZK-rollupy zvyšují propustnost na základní vrstvě Etherea tím, že přesouvají výpočty mimo řetězec, ale skutečný impuls pro škálování přichází s kompresí transakčních dat. [Velikost bloku](/developers/docs/blocks/#block-size) Etherea omezuje množství dat, které může každý blok pojmout, a tím i počet transakcí zpracovaných na blok. Kompresí dat souvisejících s transakcemi ZK-rollupy významně zvyšují počet transakcí zpracovaných v jednom bloku.

ZK-rollupy mohou komprimovat transakční data lépe než optimistické rollupy, protože nemusí zveřejňovat všechna data potřebná k ověření každé transakce. Musí zveřejnit pouze minimální data potřebná k obnovení nejnovějšího stavu účtů a zůstatků na rollupu.

### Rekurzivní důkazy {#recursive-proofs}

Výhodou důkazů s nulovou znalostí je, že důkazy mohou ověřovat jiné důkazy. Například jediný ZK-SNARK může ověřovat jiné ZK-SNARKy. Takové „důkazy důkazů“ se nazývají rekurzivní důkazy a dramaticky zvyšují propustnost na ZK-rollupech.

V současnosti se důkazy o platnosti generují pro každý blok zvlášť a odesílají se L1 kontraktu k ověření. Ověřování jednotlivých blokových důkazů však omezuje propustnost, kterou mohou ZK-rollupy dosáhnout, protože pouze jeden blok může být finalizován, když operátor předloží důkaz.

Rekurzivní důkazy však umožňují finalizovat několik bloků jedním důkazem o platnosti. To proto, že ověřovací okruh rekurzivně agreguje více blokových důkazů, dokud nevytvoří jeden finální důkaz. Operátor L2 předloží tento rekurzivní důkaz, a pokud ho kontrakt přijme, všechny příslušné bloky budou okamžitě finalizovány. S rekurzivními důkazy se zvyšuje počet ZK-rollupových transakcí, které mohou být v pravidelných intervalech finalizovány na Ethereu.

### Výhody a nevýhody ZK-rollupů {#zk-rollups-pros-and-cons}

| Plusy                                                                                                                                                                                                                                                           | Minusy                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Důkazy o platnosti zajišťují správnost transakcí mimo řetězec a zabraňují operátorům provádět neplatné přechody stavu.                                                                                                                                          | Náklady spojené s výpočtem a ověřováním důkazů o platnosti jsou značné a mohou zvýšit poplatky pro uživatele rollupu.                                                                  |
| Nabízejí rychlejší finálnost transakcí, protože aktualizace stavu jsou schváleny, jakmile jsou důkazy o platnosti ověřeny na L1.                                                                                                                                | Vývoj ZK-rollupů kompatibilních s EVM je obtížný kvůli složitosti technologie nulové znalosti.                                                                                         |
| Spoléhají se na kryptografické mechanismy pro bezpečnost, u kterých není důvěra podmínkou používání, nikoli na čestnost incentivovaných aktérů, jako je tomu u [optimistických rollupů](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Produkování důkazů platnosti vyžaduje specializovaný hardware, což může podpořit centralizovanou kontrolu řetězce několika stranami.                                                   |
| Ukládají data potřebná k obnovení stavu mimo řetězec na L1, což zaručuje bezpečnost, odolnost vůči cenzuře a decentralizaci.                                                                                                                                    | Centralizovaní operátoři (sekvencery) mohou ovlivňovat pořadí transakcí.                                                                                                               |
| Uživatelé profitují z vyšší efektivity kapitálu a mohou vybírat prostředky z L2 bez zpoždění.                                                                                                                                                                   | Požadavky na hardware mohou snížit počet účastníků, kteří mohou vynutit posun řetězce, čímž se zvyšuje riziko, že podvodní operátoři zmrazí stav rollupu a budou cenzurovat uživatele. |
| Nespadají pod předpoklady o živosti a uživatelé nemusí validovat řetězec, aby chránili své prostředky.                                                                                                                                                          | Některé ověřovací systémy (např. ZK-SNARK) vyžadují důvěryhodné nastavení, které, pokud je špatně zvládnuto, by mohlo potenciálně ohrozit bezpečnostní model ZK-rollupu.               |
| Lepší komprese dat může pomoci snížit náklady na publikování `calldata` na Ethereu a minimalizovat poplatky uživatelů za používání rollupu.                                                                                                                     |                                                                                                                                                                                        |

### Vizualizace ZK-rollupů {#zk-video}

Podívejte se na vysvětlení ZK-rollupů od Finematics:

<YouTube id="7pWxCklcNsU" start="406" />


## Kdo pracuje na zkEVM? {#zkevm-projects}

Projekty pracující na zkEVM zahrnují:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** – _zkEVM je projekt financovaný Ethereum Foundation, jehož cílem je vyvinout ZK-rollup kompatibilní s EVM a mechanismus pro generování důkazů platnosti pro bloky Etherea._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** – _je decentralizovaný ZK Rollup na Ethereum Mainnetu, který pracuje na Virtuálním stroji Etherea s nulovou znalostí (zkEVM), provádí Ethereum transakce transparentním způsobem, včetně smart kontraktů s ověřením pomocí důkazů s nulovou znalostí._

- **[Scroll](https://scroll.io/blog/zkEVM)** – _Scroll je technologicky zaměřená společnost, která pracuje na vybudování nativního zkEVM řešení vrstvy 2 pro Ethereum._

- **[Taiko](https://taiko.xyz)** – _Taiko je decentralizovaný, Ethereum-ekvivalentní ZK-rollup ([typ 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** – _ZKsync Era je ZK Rollup kompatibilní s EVM vyvinutý Matter Labs, poháněný vlastním zkEVM._

- **[Starknet](https://starkware.co/starknet/)** – _StarkNet je škálovací řešení vrstvy 2 kompatibilní s EVM vyvinuté společností StarkWare._

- **[Morph](https://www.morphl2.io/)** – _Morph je hybridní škálovací řešení rollupu, které využívá důkazy s nulovou znalostí k řešení problému se stavem vrstvy 2._

## Další čtení o ZK-rollupech {#further-reading-on-zk-rollups}

- [Co jsou rollupy s nulovou znalostí?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Co jsou rollupy s nulovou znalostí?](https://alchemy.com/blog/zero-knowledge-rollups)
- [STARKy vs SNARKy](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Co je zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Typy ZK-EVM: Ethereum-ekvivalentní, EVM-ekvivalentní, Type 1, Type 4 a další kryptické pojmy](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Úvod do zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Zdroje awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKY pod pokličkou](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Jak jsou SNARKy možné?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
