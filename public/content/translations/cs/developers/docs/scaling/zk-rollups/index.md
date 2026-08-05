---
title: "Rollupy s nulovým vědomím (ZK-rollupy)"
description: "Úvod do rollupů s nulovým vědomím – řešení škálování používané komunitou Etherea."
lang: cs
---

Rollupy s nulovým vědomím (ZK-rollupy) jsou [řešení škálování](/developers/docs/scaling/) na vrstvě 2 (L2), která zvyšují propustnost na [Ethereum](/) Mainnetu přesunem výpočtů a ukládání stavu offchain. ZK-rollupy dokážou zpracovat tisíce transakcí v dávce a poté na Mainnet odeslat pouze minimální souhrnná data. Tato souhrnná data definují změny, které by měly být provedeny ve stavu Etherea, a kryptografický důkaz, že jsou tyto změny správné.

## Předpoklady {#prerequisites}

Měli byste si přečíst a pochopit naši stránku o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2](/layer-2).

## Co jsou rollupy s nulovým vědomím? {#what-are-zk-rollups}

**Rollupy s nulovým vědomím (ZK-rollupy)** sdružují (neboli „rolují“) transakce do dávek, které jsou prováděny offchain. Offchain výpočty snižují množství dat, která musí být odeslána na blockchain. Operátoři ZK-rollupů předkládají souhrn změn potřebných k reprezentaci všech transakcí v dávce, místo aby posílali každou transakci zvlášť. Vytvářejí také [důkazy platnosti](/glossary/#validity-proof), aby prokázali správnost svých změn.

Stav ZK-rollupu je udržován chytrým kontraktem nasazeným v síti Ethereum. K aktualizaci tohoto stavu musí uzly ZK-rollupu předložit důkaz platnosti k ověření. Jak již bylo zmíněno, důkaz platnosti je kryptografická záruka, že změna stavu navržená rollupem je skutečně výsledkem provedení dané dávky transakcí. To znamená, že ZK-rollupy potřebují k finalizaci transakcí na Ethereu poskytnout pouze důkazy platnosti, místo aby odesílaly všechna transakční data onchain jako [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/).

Při přesunu prostředků ze ZK-rollupu na Ethereum nedochází k žádnému zpoždění, protože výstupní transakce jsou provedeny, jakmile kontrakt ZK-rollupu ověří důkaz platnosti. Naopak výběr prostředků z optimistických rollupů podléhá zpoždění, aby kdokoli mohl zpochybnit výstupní transakci pomocí [důkazu o podvodu](/glossary/#fraud-proof).

ZK-rollupy zapisují transakce na Ethereum jako `calldata`. `calldata` je místo, kam se ukládají data zahrnutá v externích voláních funkcí chytrých kontraktů. Informace v `calldata` jsou publikovány na blockchainu, což komukoli umožňuje nezávisle rekonstruovat stav rollupu. ZK-rollupy používají kompresní techniky ke snížení objemu transakčních dat – například účty jsou reprezentovány indexem spíše než adresou, což šetří 28 bajtů dat. Publikování dat onchain představuje pro rollupy značný náklad, takže komprese dat může uživatelům snížit poplatky.

## Jak ZK-rollupy interagují s Ethereem? {#zk-rollups-and-ethereum}

Řetězec ZK-rollupu je offchain protokol, který funguje nad blockchainem Etherea a je spravován onchain chytrými kontrakty Etherea. ZK-rollupy provádějí transakce mimo Mainnet, ale pravidelně odesílají offchain dávky transakcí do onchain kontraktu rollupu. Tento záznam transakcí je neměnný, podobně jako blockchain Etherea, a tvoří řetězec ZK-rollupu.

Základní architektura ZK-rollupu se skládá z následujících komponent:

1. **Onchain kontrakty**: Jak již bylo zmíněno, protokol ZK-rollupu je řízen chytrými kontrakty běžícími na Ethereu. To zahrnuje hlavní kontrakt, který ukládá bloky rollupu, sleduje vklady a monitoruje aktualizace stavu. Další onchain kontrakt (kontrakt ověřovatele) ověřuje důkazy s nulovou znalostí předložené producenty bloků. Ethereum tak slouží jako základní vrstva neboli „vrstva 1 (L1)“ pro ZK-rollup.

2. **Offchain virtuální stroj (VM)**: Zatímco protokol ZK-rollupu žije na Ethereu, provádění transakcí a ukládání stavu probíhá na samostatném virtuálním stroji nezávislém na [EVM](/developers/docs/evm/). Tento offchain VM je spouštěcím prostředím pro transakce na ZK-rollupu a slouží jako sekundární vrstva neboli „vrstva 2 (L2)“ pro protokol ZK-rollupu. Důkazy platnosti ověřené na Ethereum Mainnetu zaručují správnost přechodů stavu v offchain VM.

ZK-rollupy jsou „hybridní řešení škálování“ – offchain protokoly, které fungují nezávisle, ale odvozují svou bezpečnost od Etherea. Konkrétně síť Ethereum vynucuje platnost aktualizací stavu na ZK-rollupu a zaručuje dostupnost dat za každou aktualizací stavu rollupu. V důsledku toho jsou ZK-rollupy podstatně bezpečnější než čistě offchain řešení škálování, jako jsou [postranní řetězce (sidechains)](/developers/docs/scaling/sidechains/), které jsou samy zodpovědné za své bezpečnostní vlastnosti, nebo [validia](/developers/docs/scaling/validium/), která také ověřují transakce na Ethereu pomocí důkazů platnosti, ale ukládají transakční data jinde.

ZK-rollupy spoléhají na hlavní protokol Etherea v následujících ohledech:

### Dostupnost dat {#data-availability}

ZK-rollupy publikují stavová data pro každou transakci zpracovanou offchain na Ethereum. S těmito daty je možné, aby jednotlivci nebo podniky reprodukovali stav rollupu a sami validovali řetězec. Ethereum zpřístupňuje tato data všem účastníkům sítě jako `calldata`.

ZK-rollupy nepotřebují publikovat mnoho transakčních dat onchain, protože důkazy platnosti již ověřují pravost přechodů stavu. Nicméně ukládání dat onchain je stále důležité, protože umožňuje nezávislé ověření stavu L2 řetězce nevyžadující povolení, což následně umožňuje komukoli odesílat dávky transakcí, a brání tak škodlivým operátorům v cenzuře nebo zmrazení řetězce.

Onchain data jsou vyžadována pro interakci uživatelů s rollupem. Bez přístupu ke stavovým datům nemohou uživatelé dotazovat zůstatek na svém účtu nebo iniciovat transakce (např. výběry), které spoléhají na informace o stavu.

### Finalita transakcí {#transaction-finality}

Ethereum funguje jako vrstva vypořádání pro ZK-rollupy: L2 transakce jsou finalizovány pouze tehdy, pokud L1 kontrakt přijme důkaz platnosti. To eliminuje riziko, že by škodliví operátoři poškodili řetězec (např. ukradli prostředky rollupu), protože každá transakce musí být schválena na Mainnetu. Ethereum také zaručuje, že uživatelské operace nelze zvrátit, jakmile jsou finalizovány na L1.

### Odolnost proti cenzuře {#censorship-resistance}

Většina ZK-rollupů používá k provádění transakcí, vytváření dávek a odesílání bloků na L1 „superuzel“ (operátora). I když to zajišťuje efektivitu, zvyšuje to riziko cenzury: škodliví operátoři ZK-rollupů mohou cenzurovat uživatele tím, že odmítnou zahrnout jejich transakce do dávek.

Jako bezpečnostní opatření umožňují ZK-rollupy uživatelům odesílat transakce přímo do kontraktu rollupu na Mainnetu, pokud se domnívají, že jsou operátorem cenzurováni. To uživatelům umožňuje vynutit si výstup ze ZK-rollupu na Ethereum, aniž by se museli spoléhat na povolení operátora.

## Jak fungují ZK-rollupy? {#how-do-zk-rollups-work}

### Transakce {#transactions}

Uživatelé v ZK-rollupu podepisují transakce a odesílají je L2 operátorům ke zpracování a zahrnutí do další dávky. V některých případech je operátorem centralizovaná entita, zvaná sekvencer, která provádí transakce, agreguje je do dávek a odesílá na L1. Sekvencer v tomto systému je jedinou entitou, která má povoleno produkovat L2 bloky a přidávat transakce rollupu do kontraktu ZK-rollupu.

Jiné ZK-rollupy mohou rotovat roli operátora pomocí sady validátorů na bázi [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/). Potenciální operátoři vkládají prostředky do kontraktu rollupu, přičemž velikost každého staku ovlivňuje šance stakera na to, že bude vybrán k produkci další dávky rollupu. Stake operátora může být penalizován, pokud jedná zlomyslně, což ho motivuje k odesílání platných bloků.

#### Jak ZK-rollupy publikují transakční data na Ethereu {#how-zk-rollups-publish-transaction-data-on-ethereum}

Jak bylo vysvětleno, transakční data jsou publikována na Ethereu jako `calldata`. `calldata` je datová oblast v chytrém kontraktu používaná k předávání argumentů funkci a chová se podobně jako [paměť](/developers/docs/smart-contracts/anatomy/#memory). Ačkoli `calldata` není uložena jako součást stavu Etherea, přetrvává onchain jako součást [historických logů](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) řetězce Etherea. `calldata` neovlivňuje stav Etherea, což z ní činí levný způsob ukládání dat onchain.

Klíčové slovo `calldata` často identifikuje metodu chytrého kontraktu volanou transakcí a obsahuje vstupy do metody ve formě libovolné sekvence bajtů. ZK-rollupy používají `calldata` k publikování komprimovaných transakčních dat onchain; operátor rollupu jednoduše přidá novou dávku zavoláním požadované funkce v kontraktu rollupu a předá komprimovaná data jako argumenty funkce. To pomáhá snížit náklady pro uživatele, protože velká část poplatků za rollup jde na ukládání transakčních dat onchain.

### Závazky stavu {#state-commitments}

Stav ZK-rollupu, který zahrnuje L2 účty a zůstatky, je reprezentován jako [Merkleův strom](/whitepaper/#merkle-trees). Kryptografický hash kořene Merkleova stromu (Merkleho kořen) je uložen v onchain kontraktu, což umožňuje protokolu rollupu sledovat změny ve stavu ZK-rollupu.

Rollup přechází do nového stavu po provedení nové sady transakcí. Operátor, který inicioval přechod stavu, je povinen vypočítat nový kořen stavu a odeslat jej do onchain kontraktu. Pokud je důkaz platnosti spojený s dávkou ověřen kontraktem ověřovatele, nový Merkleho kořen se stane kanonickým kořenem stavu ZK-rollupu.

Kromě výpočtu kořenů stavu vytváří operátor ZK-rollupu také kořen dávky – kořen Merkleova stromu zahrnujícího všechny transakce v dávce. Když je odeslána nová dávka, kontrakt rollupu uloží kořen dávky, což uživatelům umožňuje prokázat, že transakce (např. žádost o výběr) byla zahrnuta do dávky. Uživatelé budou muset poskytnout podrobnosti o transakci, kořen dávky a [Merkleův důkaz](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) ukazující cestu zahrnutí.

### Důkazy platnosti {#validity-proofs}

Nový kořen stavu, který operátor ZK-rollupu odesílá do L1 kontraktu, je výsledkem aktualizací stavu rollupu. Řekněme, že Alice pošle 10 tokenů Bobovi, operátor jednoduše sníží zůstatek Alice o 10 a zvýší zůstatek Boba o 10. Operátor poté provede hashování aktualizovaných dat účtu, znovu sestaví Merkleův strom rollupu a odešle nový Merkleho kořen do onchain kontraktu.

Kontrakt rollupu však automaticky nepřijme navrhovaný závazek stavu, dokud operátor neprokáže, že nový Merkleho kořen vyplynul ze správných aktualizací stavu rollupu. Operátor ZK-rollupu to provede vytvořením důkazu platnosti, stručného kryptografického závazku ověřujícího správnost dávkovaných transakcí.

Důkazy platnosti umožňují stranám prokázat správnost tvrzení, aniž by odhalily samotné tvrzení – proto se jim také říká důkazy s nulovou znalostí. ZK-rollupy používají důkazy platnosti k potvrzení správnosti offchain přechodů stavu, aniž by musely znovu provádět transakce na Ethereu. Tyto důkazy mohou mít podobu [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) nebo [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Jak SNARKy, tak STARKy pomáhají potvrdit integritu offchain výpočtů v ZK-rollupech, ačkoli každý typ důkazu má své specifické vlastnosti.

**ZK-SNARKy**

Aby protokol ZK-SNARK fungoval, je nutné vytvořit společný referenční řetězec (Common Reference String, CRS): CRS poskytuje veřejné parametry pro dokazování a ověřování důkazů platnosti. Bezpečnost dokazovacího systému závisí na nastavení CRS; pokud se informace použité k vytvoření veřejných parametrů dostanou do držení škodlivých aktérů, mohou být schopni generovat falešné důkazy platnosti.

Některé ZK-rollupy se pokoušejí tento problém vyřešit pomocí [ceremonie vícestranných výpočtů (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), do které jsou zapojeni důvěryhodní jednotlivci, aby vygenerovali veřejné parametry pro obvod ZK-SNARK. Každá strana přispívá určitou náhodností (nazývanou „toxický odpad“) ke konstrukci CRS, kterou musí okamžitě zničit.

Důvěryhodná nastavení se používají, protože zvyšují bezpečnost nastavení CRS. Dokud alespoň jeden poctivý účastník zničí svůj vstup, je bezpečnost systému ZK-SNARK zaručena. Přesto tento přístup vyžaduje důvěru v to, že zúčastnění smažou svou vzorkovanou náhodnost a nenaruší bezpečnostní záruky systému.

Pomineme-li předpoklady důvěry, ZK-SNARKy jsou oblíbené pro svou malou velikost důkazu a ověřování v konstantním čase. Vzhledem k tomu, že ověřování důkazů na L1 představuje větší část nákladů na provoz ZK-rollupu, L2 používají ZK-SNARKy ke generování důkazů, které lze rychle a levně ověřit na Mainnetu.

**ZK-STARKy**

Stejně jako ZK-SNARKy, i ZK-STARKy prokazují platnost offchain výpočtů bez odhalení vstupů. ZK-STARKy jsou však považovány za vylepšení oproti ZK-SNARKům díky své škálovatelnosti a transparentnosti.

ZK-STARKy jsou „transparentní“, protože mohou fungovat bez důvěryhodného nastavení společného referenčního řetězce (CRS). Místo toho ZK-STARKy spoléhají na veřejně ověřitelnou náhodnost k nastavení parametrů pro generování a ověřování důkazů.

ZK-STARKy také poskytují větší škálovatelnost, protože čas potřebný k dokazování a ověřování důkazů platnosti roste _kvazilineárně_ v závislosti na složitosti základního výpočtu. U ZK-SNARKů se časy dokazování a ověřování škálují _lineárně_ v závislosti na velikosti základního výpočtu. To znamená, že ZK-STARKy vyžadují méně času než ZK-SNARKy na dokazování a ověřování, když se jedná o velké datové sady, což je činí užitečnými pro velkoobjemové aplikace.

ZK-STARKy jsou také bezpečné proti kvantovým počítačům, zatímco kryptografie eliptických křivek (ECC) používaná v ZK-SNARKách je obecně považována za náchylnou k útokům kvantových počítačů. Nevýhodou ZK-STARKů je, že produkují větší velikosti důkazů, jejichž ověření na Ethereu je dražší.

#### Jak fungují důkazy platnosti v ZK-rollupech? {#validity-proofs-in-zk-rollups}

##### Generování důkazu
Před přijetím transakcí provede operátor obvyklé kontroly. To zahrnuje potvrzení, že:

- Účty odesílatele a příjemce jsou součástí stavového stromu.
- Odesílatel má dostatek prostředků ke zpracování transakce.
- Transakce je správná a odpovídá veřejnému klíči odesílatele na rollupu.
- Nonce odesílatele je správná atd.

Jakmile má uzel ZK-rollupu dostatek transakcí, agreguje je do dávky a sestaví vstupy pro dokazovací obvod, aby je zkompiloval do stručného ZK-důkazu. To zahrnuje:

- Kořen Merkleova stromu zahrnující všechny transakce v dávce.
- Merkleovy důkazy pro transakce k prokázání zahrnutí do dávky.
- Merkleovy důkazy pro každý pár odesílatel-příjemce v transakcích k prokázání, že tyto účty jsou součástí stavového stromu rollupu.
- Sadu mezilehlých kořenů stavu, odvozených z aktualizace kořene stavu po aplikaci aktualizací stavu pro každou transakci (tj. snížení účtů odesílatelů a zvýšení účtů příjemců).

Dokazovací obvod vypočítá důkaz platnosti „smyčkováním“ přes každou transakci a provedením stejných kontrol, které operátor dokončil před zpracováním transakce. Nejprve ověří, že účet odesílatele je součástí existujícího kořene stavu pomocí poskytnutého Merkleova důkazu. Poté sníží zůstatek odesílatele, zvýší jeho nonce, provede hashování aktualizovaných dat účtu a zkombinuje je s Merkleovým důkazem k vygenerování nového Merkleho kořene.

Tento Merkleho kořen odráží jedinou změnu ve stavu ZK-rollupu: změnu zůstatku a nonce odesílatele. To je možné, protože Merkleův důkaz použitý k prokázání existence účtu se používá k odvození nového kořene stavu.

Dokazovací obvod provádí stejný proces na účtu příjemce. Zkontroluje, zda účet příjemce existuje pod mezilehlým kořenem stavu (pomocí Merkleova důkazu), zvýší jeho zůstatek, znovu provede hashování dat účtu a zkombinuje je s Merkleovým důkazem k vygenerování nového kořene stavu.

Proces se opakuje pro každou transakci; každá „smyčka“ vytvoří nový kořen stavu z aktualizace účtu odesílatele a následný nový kořen z aktualizace účtu příjemce. Jak bylo vysvětleno, každá aktualizace kořene stavu představuje změnu jedné části stavového stromu rollupu.

ZK-dokazovací obvod iteruje přes celou dávku transakcí a ověřuje sekvenci aktualizací, které vedou ke konečnému kořeni stavu po provedení poslední transakce. Poslední vypočítaný Merkleho kořen se stává nejnovějším kanonickým kořenem stavu ZK-rollupu.

##### Ověření důkazu
Poté, co dokazovací obvod ověří správnost aktualizací stavu, L2 operátor odešle vypočítaný důkaz platnosti do kontraktu ověřovatele na L1. Ověřovací obvod kontraktu ověří platnost důkazu a také zkontroluje veřejné vstupy, které tvoří součást důkazu:

- **Předchozí kořen stavu (Pre-state root)**: Starý kořen stavu ZK-rollupu (tj. před provedením dávkovaných transakcí), odrážející poslední známý platný stav L2 řetězce.

- **Následný kořen stavu (Post-state root)**: Nový kořen stavu ZK-rollupu (tj. po provedení dávkovaných transakcí), odrážející nejnovější stav L2 řetězce. Následný kořen stavu je konečný kořen odvozený po aplikaci aktualizací stavu v dokazovacím obvodu.

- **Kořen dávky (Batch root)**: Merkleho kořen dávky, odvozený _merklizací_ transakcí v dávce a hashováním kořene stromu.

- **Vstupy transakcí**: Data spojená s transakcemi provedenými jako součást odeslané dávky.

Pokud důkaz vyhovuje obvodu (tj. je platný), znamená to, že existuje sekvence platných transakcí, které převádějí rollup z předchozího stavu (kryptograficky otisknutého předchozím kořenem stavu) do nového stavu (kryptograficky otisknutého následným kořenem stavu). Pokud se předchozí kořen stavu shoduje s kořenem uloženým v kontraktu rollupu a důkaz je platný, kontrakt rollupu převezme následný kořen stavu z důkazu a aktualizuje svůj stavový strom tak, aby odrážel změněný stav rollupu.

### Vstupy a výstupy {#entries-and-exits}

Uživatelé vstupují do ZK-rollupu vložením tokenů do kontraktu rollupu nasazeného na L1 řetězci. Tato transakce je zařazena do fronty, protože transakce do kontraktu rollupu mohou odesílat pouze operátoři.

Pokud se fronta čekajících vkladů začne plnit, operátor ZK-rollupu vezme vkladové transakce a odešle je do kontraktu rollupu. Jakmile jsou prostředky uživatele v rollupu, mohou začít provádět transakce odesláním transakcí operátorovi ke zpracování. Uživatelé mohou ověřit zůstatky na rollupu hashováním dat svého účtu, odesláním hashe do kontraktu rollupu a poskytnutím Merkleova důkazu k ověření proti aktuálnímu kořeni stavu.

Výběr ze ZK-rollupu na L1 je přímočarý. Uživatel iniciuje výstupní transakci odesláním svých aktiv na rollupu na určený účet ke spálení. Pokud operátor zahrne transakci do další dávky, uživatel může odeslat žádost o výběr do onchain kontraktu. Tato žádost o výběr bude obsahovat následující:

- Merkleův důkaz prokazující zahrnutí transakce uživatele na účet pro spálení do dávky transakcí

- Transakční data

- Kořen dávky

- L1 adresa pro příjem vložených prostředků

Kontrakt rollupu provede hashování transakčních dat, zkontroluje, zda existuje kořen dávky, a pomocí Merkleova důkazu zkontroluje, zda je hash transakce součástí kořene dávky. Poté kontrakt provede výstupní transakci a odešle prostředky na uživatelem zvolenou adresu na L1.

## ZK-rollupy a kompatibilita s EVM {#zk-rollups-and-evm-compatibility}

Na rozdíl od optimistických rollupů nejsou ZK-rollupy snadno kompatibilní s [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Dokazování obecných výpočtů EVM v obvodech je obtížnější a náročnější na zdroje než dokazování jednoduchých výpočtů (jako je dříve popsaný převod tokenů).

Nicméně [pokroky v technologii s nulovým vědomím](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) podněcují obnovený zájem o zabalení výpočtů EVM do důkazů s nulovou znalostí. Toto úsilí směřuje k vytvoření implementace zkEVM (zero-knowledge EVM), která dokáže efektivně ověřit správnost provádění programu. zkEVM znovu vytváří existující operační kódy (opcodes) EVM pro dokazování/ověřování v obvodech, což umožňuje provádět chytré kontrakty.

Stejně jako EVM, i zkEVM přechází mezi stavy po provedení výpočtu na některých vstupech. Rozdíl je v tom, že zkEVM také vytváří důkazy s nulovou znalostí k ověření správnosti každého kroku v provádění programu. Důkazy platnosti by mohly ověřit správnost operací, které se dotýkají stavu VM (paměť, zásobník, úložiště), a samotného výpočtu (tj. zavolala operace správné operační kódy a provedla je správně?).

Očekává se, že zavedení ZK-rollupů kompatibilních s EVM pomůže vývojářům využít záruky škálovatelnosti a bezpečnosti důkazů s nulovou znalostí. Ještě důležitější je, že kompatibilita s nativní infrastrukturou Etherea znamená, že vývojáři mohou budovat ZK-přátelské decentralizované aplikace (dapps) pomocí známých (a v praxi ověřených) nástrojů a jazyků.

## Jak fungují poplatky u ZK-rollupů? {#how-do-zk-rollup-fees-work}

Kolik uživatelé platí za transakce na ZK-rollupech, závisí na poplatku za plyn (gas fee), stejně jako na Ethereum Mainnetu. Poplatky za gas však na L2 fungují odlišně a jsou ovlivněny následujícími náklady:

1. **Zápis stavu**: Existuje fixní náklad na zápis do stavu Etherea (tj. odeslání transakce na blockchain Etherea). ZK-rollupy tento náklad snižují dávkováním transakcí a rozložením fixních nákladů mezi více uživatelů.

2. **Publikování dat**: ZK-rollupy publikují stavová data pro každou transakci na Ethereum jako `calldata`. Náklady na `calldata` se v současnosti řídí [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), který stanovuje náklad 16 gas za nenulové bajty a 4 gas za nulové bajty `calldata`. Náklad placený za každou transakci je ovlivněn tím, kolik `calldata` je pro ni potřeba odeslat onchain.

3. **Poplatky L2 operátorovi**: Jedná se o částku placenou operátorovi rollupu jako kompenzaci za výpočetní náklady vzniklé při zpracování transakcí, podobně jako [transakční „prioritní poplatky (spropitné)“](/developers/docs/gas/#how-are-gas-fees-calculated) na Ethereum Mainnetu.

4. **Generování a ověřování důkazů**: Operátoři ZK-rollupů musí vytvářet důkazy platnosti pro dávky transakcí, což je náročné na zdroje. Ověřování důkazů s nulovou znalostí na Mainnetu také stojí gas (~ 500 000 gas).

Kromě dávkování transakcí snižují ZK-rollupy poplatky pro uživatele kompresí transakčních dat. Můžete se [podívat na přehled v reálném čase](https://l2fees.info/), kolik stojí používání ZK-rollupů na Ethereu.

## Jak ZK-rollupy škálují Ethereum? {#scaling-ethereum-with-zk-rollups}

### Komprese transakčních dat {#transaction-data-compression}

ZK-rollupy rozšiřují propustnost na základní vrstvě Etherea přesunem výpočtů offchain, ale skutečným impulsem pro škálování je komprese transakčních dat. [Velikost bloku](/developers/docs/blocks/#block-size) Etherea omezuje data, která může každý blok pojmout, a v důsledku toho i počet transakcí zpracovaných v jednom bloku. Kompresí dat souvisejících s transakcemi ZK-rollupy významně zvyšují počet transakcí zpracovaných v jednom bloku.

ZK-rollupy dokážou komprimovat transakční data lépe než optimistické rollupy, protože nemusí odesílat všechna data potřebná k validaci každé transakce. Musí odeslat pouze minimální data potřebná k obnovení nejnovějšího stavu účtů a zůstatků na rollupu.

### Rekurzivní důkazy {#recursive-proofs}

Výhodou důkazů s nulovou znalostí je, že důkazy mohou ověřovat jiné důkazy. Například jeden ZK-SNARK může ověřit jiné ZK-SNARKy. Takové „důkazy důkazů“ se nazývají rekurzivní důkazy a dramaticky zvyšují propustnost na ZK-rollupech.

V současné době jsou důkazy platnosti generovány blok po bloku a odesílány do L1 kontraktu k ověření. Ověřování důkazů jednotlivých bloků však omezuje propustnost, které mohou ZK-rollupy dosáhnout, protože při odeslání důkazu operátorem může být finalizován pouze jeden blok.

Rekurzivní důkazy však umožňují finalizovat několik bloků pomocí jednoho důkazu platnosti. Je to proto, že dokazovací obvod rekurzivně agreguje více důkazů bloků, dokud není vytvořen jeden konečný důkaz. L2 operátor odešle tento rekurzivní důkaz, a pokud jej kontrakt přijme, všechny příslušné bloky budou okamžitě finalizovány. S rekurzivními důkazy se zvyšuje počet transakcí ZK-rollupu, které lze v intervalech finalizovat na Ethereu.

### Výhody a nevýhody ZK-rollupů {#zk-rollups-pros-and-cons}

| Výhody | Nevýhody |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Důkazy platnosti zajišťují správnost offchain transakcí a brání operátorům v provádění neplatných přechodů stavu. | Náklady spojené s výpočtem a ověřováním důkazů platnosti jsou značné a mohou zvýšit poplatky pro uživatele rollupu. |
| Nabízí rychlejší finalitu transakcí, protože aktualizace stavu jsou schváleny, jakmile jsou důkazy platnosti ověřeny na L1. | Budování ZK-rollupů kompatibilních s EVM je obtížné kvůli složitosti technologie s nulovým vědomím. |
| Spoléhá na kryptografické mechanismy nevyžadující důvěru pro zajištění bezpečnosti, nikoli na poctivost motivovaných aktérů jako u [optimistických rollupů](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Vytváření důkazů platnosti vyžaduje specializovaný hardware, což může podpořit centralizovanou kontrolu řetězce několika stranami. |
| Ukládá data potřebná k obnovení offchain stavu na L1, což zaručuje bezpečnost, odolnost proti cenzuře a decentralizaci. | Centralizovaní operátoři (sekvenceři) mohou ovlivnit pořadí transakcí. |
| Uživatelé těží z vyšší kapitálové efektivity a mohou vybírat prostředky z L2 bez zpoždění. | Hardwarové požadavky mohou snížit počet účastníků, kteří mohou donutit řetězec k pokroku, což zvyšuje riziko, že škodliví operátoři zmrazí stav rollupu a budou cenzurovat uživatele. |
| Nezávisí na předpokladech živosti (liveness) a uživatelé nemusí validovat řetězec, aby ochránili své prostředky. | Některé dokazovací systémy (např. ZK-SNARK) vyžadují důvěryhodné nastavení, které by v případě nesprávného zacházení mohlo potenciálně ohrozit bezpečnostní model ZK-rollupu. |
| Lepší komprese dat může pomoci snížit náklady na publikování `calldata` na Ethereu a minimalizovat poplatky za rollup pro uživatele. | |

### Vizuální vysvětlení ZK-rollupů {#zk-video}

Podívejte se, jak Finematics vysvětluje ZK-rollupy:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Kdo pracuje na zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM pro L2 vs. L1</AlertTitle>
<AlertDescription>
Níže uvedené projekty využívají technologii zkEVM k budování rollupů na vrstvě 2. Probíhá také výzkum využití zkEVM pro [ověřování bloků na L1](/roadmap/zkevm/), což by validátorům umožnilo ověřovat bloky Etherea bez nutnosti znovu provádět transakce.
</AlertDescription>
</AlertContent>
</Alert>

Mezi projekty pracující na zkEVM patří:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** – _zkEVM je projekt financovaný Nadací Ethereum (Ethereum Foundation) za účelem vývoje ZK-rollupu kompatibilního s EVM a mechanismu pro generování důkazů platnosti pro bloky Etherea._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** – _je decentralizovaný ZK-rollup na Ethereum Mainnetu pracující na Ethereum Virtual Machine s nulovým vědomím (zkEVM), který transparentním způsobem provádí transakce Etherea, včetně chytrých kontraktů s validacemi pomocí důkazů s nulovou znalostí._

- **[Scroll](https://scroll.io/blog/zkEVM)** – _Scroll je technologicky zaměřená společnost pracující na budování nativního řešení zkEVM na vrstvě 2 pro Ethereum._

- **[Taiko](https://taiko.xyz)** – _Taiko je decentralizovaný ZK-rollup ekvivalentní Ethereu ([ZK-EVM typu 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** – _ZKsync Era je ZK-rollup kompatibilní s EVM vytvořený společností Matter Labs, poháněný vlastním zkEVM._

- **[Starknet](https://starkware.co/starknet/)** – _Starknet je řešení škálování na vrstvě 2 kompatibilní s EVM vytvořené společností StarkWare._

- **[Morph](https://www.morphl2.io/)** – _Morph je hybridní řešení škálování rollupu, které využívá zk-důkaz k řešení problému se stavem na vrstvě 2._

- **[Linea](https://linea.build)** – _Linea je zkEVM na vrstvě 2 ekvivalentní Ethereu vytvořené společností ConsenSys, plně sladěné s ekosystémem Etherea._

## Další čtení o ZK-rollupech {#further-reading-on-zk-rollups}

- [Co jsou rollupy s nulovým vědomím?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Co jsou rollupy s nulovým vědomím?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Praktický průvodce rollupy na Ethereu](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKy vs. SNARKy](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Co je to zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Typy ZK-EVM: Ekvivalentní Ethereu, ekvivalentní EVM, Typ 1, Typ 4 a další kryptická módní slova](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Úvod do zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Co jsou ZK-EVM L2?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Zdroje Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKy pod pokličkou](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Jak jsou SNARKy možné?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Návody: Soukromí a nulové vědomí na Ethereu {#tutorials}

- [Využití nulového vědomí pro tajný stav](/developers/tutorials/secret-state/) _– Jak používat ZK-důkazy a offchain serverové komponenty k udržování tajného stavu hry onchain._
- [Používání skrytých adres (Stealth Addresses)](/developers/tutorials/stealth-addr/) _– Jak skryté adresy ERC-5564 umožňují anonymní převody ETH pomocí odvození kryptografického klíče._
- [Použití Etherea pro autentizaci ve Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Jak integrovat podpisy peněženky Etherea s autentizačními systémy Web2 založenými na SAML._