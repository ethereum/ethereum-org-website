---
title: "Kód je zákon? Vysvětlení chytrých kontraktů"
description: "Zkoumání konceptu „kód je zákon“ optikou chytrých kontraktů na Ethereu a DeFi. Toto video vysvětluje, co jsou chytré kontrakty, jak fungují a filozofickou otázku, zda by kód měl být konečným arbitrem."
lang: cs
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "chytré kontrakty"
format: explainer
author: Finematics
breadcrumb: "Chytré kontrakty"
---

Vysvětlující video od **Finematics**, které zkoumá koncept „kód je zákon“ optikou chytrých kontraktů na Ethereu. Pokrývá, co jsou chytré kontrakty, jak fungují, jaké mají výhody oproti tradičním kontraktům a proč jsou základními stavebními kameny decentralizovaných financí (DeFi).

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=pWGLtjG-F5c) zveřejněného kanálem Finematics. Byl lehce upraven pro lepší čitelnost.*

#### Úvod (0:00) {#introduction-000}

Už jste někdy slyšeli výraz „kód je zákon“, kde se technologie používá k vymáhání pravidel? Potřebujeme v takovém případě vůbec právníky? Nebo možná můžeme žít v plně automatizovaném světě, kde kód diktuje, co můžeme a co nesmíme dělat. Se současným vývojem chytrých kontraktů může být tento futuristický scénář blíž, než si myslíme.

Chytrý kontrakt je kus kódu, který lze spouštět automaticky a deterministickým způsobem. Kód chytrého kontraktu je obvykle uložen a spouštěn na blockchainu, aby byl bezpečný a nevyžadující důvěru. Chytré kontrakty mají také schopnost přijímat, uchovávat a odesílat prostředky – a dokonce volat jiné chytré kontrakty. Řídí se sémantikou „když-tak“ (if-then), což usnadňuje jejich programování.

Chytré kontrakty se zaměřují na odstranění lidského faktoru z rozhodování. Lidský faktor se často ukazuje jako nejvíce chybový a nespolehlivý prvek standardních tradičních kontraktů.

Prodejní automat se velmi často uvádí jako dobrá analogie k chytrému kontraktu, protože sdílí určité podobnosti. Typický prodejní automat je naprogramován tak, že umožňuje určité akce a přechody stavů na základě vstupu. Funguje také plně deterministickým způsobem. Pokud si například chcete koupit plechovku koly, která stojí dva dolary, a máte jen jeden dolar, bez ohledu na to, kolikrát to zkusíte, nápoj nedostanete. Na druhou stranu, pokud vhodíte tři dolary, automat vám vydá plechovku koly a příslušné drobné. Dokonce i vrácené drobné jsou vybírány předem definovaným a naprogramovaným způsobem na základě toho, jaké mince jsou k dispozici a kterých mincí se chce automat zbavit nejdříve.

Chytrý kontrakt se může spoléhat čistě na informace dostupné na blockchainu – například „pokud mi dáš deset tokenů A, dám ti deset tokenů B“. Nebo se může spoléhat na externí zdroj dat, například na cenu ETH nebo S&P 500. Druhý příklad činí chytré kontrakty složitějšími, protože musí důvěřovat datům z reálného světa. Potřebnou důvěru lze minimalizovat pomocí služeb orákula, ale i službám orákula je třeba důvěřovat. Existuje již několik projektů, které pomocí určitých pobídek zvyšují pravděpodobnost, že orákula poskytnou správná data. Chainlink je projekt, který v této kategorii jasně vyniká.

#### Chytré kontrakty na Ethereu (3:09) {#ethereum-smart-contracts-309}

Ethereum je blockchain, který podporuje chytré kontrakty a umožňuje programátorům implementovat jejich vlastní chytré kontrakty. Chytrý kontrakt může být napsán v programovacím jazyce zvaném Solidity, který byl vytvořen speciálně pro tento účel. Na Ethereu jsou všechny nasazené chytré kontrakty neměnné – to znamená, že jakmile jsou nasazeny, nelze je upravovat, což vytváří určitá rizika, o kterých budeme diskutovat později.

Chytré kontrakty na Ethereu jsou také decentralizované, což znamená, že neexistuje žádný jediný stroj, který by kontrakt ovládal. Ve skutečnosti všechny uzly v síti Ethereum uchovávají stejný kontrakt s naprosto stejným stavem. Ačkoli je Ethereum v současnosti nejpopulárnější platformou pro chytré kontrakty pro obecné použití, není jedinou a má několik konkurentů, včetně Cardano, Tezos, EOS a Tron – ale ne všechny sdílejí stejné vlastnosti.

#### Definice chytrého kontraktu (4:23) {#smart-contract-definition-423}

Termín „chytrý kontrakt“ vytvořil známý kryptograf Nick Szabo na počátku 90. let. Tento název, ačkoliv není úplně samovysvětlující, se ujal a běžně se používá, zejména v blockchainovém odvětví. Abychom viděli výhody chytrých kontraktů, pojďme porovnat hypotetický chytrý kontrakt s jeho ekvivalentem v tradičním světě.

#### Příklad chytrého kontraktu (4:46) {#smart-contract-example-446}

Řekněme, že chceme napsat následující kontrakt: pokud Alice pošle X tokenů A a Bob pošle stejný počet tokenů B, dojde k jejich swapu – Alice obdrží Bobovy tokeny a Bob obdrží Aliciny tokeny.

Ve světě bez chytrých kontraktů by jedním ze způsobů, jak toho dosáhnout, aniž by Alice musela důvěřovat Bobovi a Bob Alici, bylo vytvoření svěřenského (escrow) kontraktu se třetí stranou. Třetí strana by vybrala tokeny A od Alice, počkala na stejný počet tokenů B od Boba a poslala Alici a Bobovi příslušné tokeny po swapu.

#### Problémy chytrých kontraktů (5:45) {#smart-contract-problems-545}

Tento přístup již ukazuje několik problémů, kterým mohou Alice a Bob čelit:

- **Důvěra ve zprostředkovatele** – neexistuje žádná záruka, že třetí strana po přijetí prostředků od Alice a Boba s tokeny neuteče. Musíme se spoléhat na pověst zprostředkovatele a případné pojištění.
- **Nedeterministické výsledky** – pokud se něco pokazí, může to mít různé výstupy v závislosti na mnoha faktorech, včetně jurisdikce, kde by se případný spor řešil.

Na druhou stranu by chytrý kontrakt fungoval plně automatizovaným a deterministickým způsobem, čímž by zajistil, že obě strany obdrží prostředky, jakmile splní počáteční kritéria pro vložení tokenů. Chytré kontrakty mohou také uchovávat prostředky samy v sobě, čehož v tradičním světě nelze dosáhnout.

#### Rychlost (6:47) {#speed-647}

V závislosti na zprostředkovateli mohou Alice a Bob čekat i několik dní nebo týdnů na vypořádání převodu tokenů. Co když chtějí provést swap tokenů v neděli a zprostředkovatel nefunguje? S chytrými kontrakty tyto druhy problémů mizí a kontrakt může být naplněn několik sekund po splnění počátečních kritérií.

#### Náklady (7:16) {#cost-716}

Tradiční kontrakty nejsou drahé jen kvůli zprostředkovateli, který musí vytvářet zisk – existuje zde také obrovské riziko skrytých nákladů na věci, jako je arbitráž a vymáhání, pokud se s kontraktem vyskytnou nějaké problémy.

Znovupoužitelnost je další výhodou: stejný chytrý kontrakt zodpovědný za swap Aliciných a Bobových tokenů by mohl použít kdokoli jiný, kdo chce provést swap tokenů. V tradičním světě by všichni museli podepsat samostatné kontrakty a zaplatit příslušné poplatky zprostředkovateli.

#### Podvody (7:58) {#fraud-758}

Podvody jsou dalším skrytým nákladem, tentokrát pro samotného zprostředkovatele. Zprostředkovatel by se musel ujistit, že tokeny Alice i Boba jsou legitimní, než zahájí swap. Podvody jsou v tradičních financích velmi běžné a většina společností má obrovské týmy, které pracují čistě na prevenci podvodů. S chytrými kontrakty lze tokeny ověřit na blockchainu a díky digitálním podpisům je okamžitě jasné, zda jsou Alice i Bob oprávněni své tokeny utratit.

#### Případy užití (8:42) {#use-cases-842}

Chytré kontrakty mají rostoucí počet případů užití, od plateb a decentralizovaných financí (DeFi) až po dodavatelské řetězce a crowdfunding. Chytré kontrakty jsou také základními stavebními kameny pro decentralizované aplikace (dapp).

#### DeFi (9:07) {#defi-907}

Decentralizované finance (DeFi) jsou jedním z nových odvětví, které silně spoléhá na chytré kontrakty. Mezi věci, které již byly v tomto prostoru vybudovány, patří:

- **Decentralizované stablecoiny** – chytrým využitím chytrých kontraktů a určitých pobídek můžeme vytvořit stablecoin navázaný na americký dolar, aniž bychom museli uchovávat dolary v reálném světě. MakerDAO je jedním z projektů, který to umožňuje.
- **Automatizované poskytování likvidity** – sada chytrých kontraktů může uživatelům umožnit poskytovat likviditu a provádět swap tokenů zcela decentralizovaným způsobem a nevyžadujícím povolení. Uniswap a Kyber Network jsou dobrými příklady takových protokolů.

#### Crowdfunding a dodavatelské řetězce (10:05) {#crowdfunding-and-supply-chains-1005}

Dalším případem užití je poskytování větší transparentnosti dodavatelským řetězcům, kde vstupují do hry protokoly jako OriginTrail. Pokud jde o crowdfunding, můžete si představit kontrakt, který odemkne prostředky, jakmile jsou splněny určité cíle a ověřeny komunitou.

#### Budoucnost chytrých kontraktů (10:29) {#future-smart-contracts-1029}

Co kdyby chytré kontrakty mohly usnadnit věci jako sdílení jízd, pronájmy bytů a mnoho dalšího? A co charita? Můžete si představit plně automatizovaný fond, který by posílal peníze přímo lidem, kteří je nejvíce potřebují, bez jakýchkoli zprostředkovatelů. Fond by například mohl určit, že určitý region zasáhl hurikán, a přesměrovat prostředky do této části světa. Zatím to zní docela nemožně, ale všechny potřebné prvky k tomu, aby se něco takového stalo skutečností, se právě teď budují.

Případy užití pro chytré kontrakty jsou téměř nekonečné, ale než toho všeho dosáhneme, musíme vyřešit několik problémů:

- **Chyby (Bugs)** – jedním z hlavních rizik, pokud jde o chytré kontrakty, je něco, co pronásleduje každý jiný software. Nejlepším příkladem je hack The DAO, který vedl ke ztrátě etheru v hodnotě milionů dolarů, protože útočník dokázal vysát prostředky z chytrého kontraktu. To způsobilo, že Ethereum provedlo hard fork, a vyvolalo to mnoho neshod v komunitě Etherea. Od hacku The DAO přišla komunita Etherea s mnoha dodatečnými bezpečnostními opatřeními. V dnešní době prošly téměř všechny populární chytré kontrakty bezpečnostním auditem, často od více týmů. Existuje také trend používat metody formální verifikace k prokázání, že se určité kontrakty budou vždy chovat očekávaným způsobem.
- **Změny protokolu** – i když chytrý kontrakt nemá žádné chyby a prošel auditem, stále nemůžeme zaručit, že změna na úrovni platformy nezpůsobí problémy. Upgrade samotného protokolu může způsobit, že se určité chytré kontrakty začnou chovat jinak, než se očekávalo.
- **Data z reálného světa** – služby orákula mohou poskytnout spolehlivý způsob, jak dostat informace z reálného světa na blockchain. Ale představte si, že jste si pronajali byt nebo auto a způsobili nějakou náhodnou škodu. Jak by se o tom mohl chytrý kontrakt bez jakéhokoli lidského zásahu dozvědět? Existuje mnoho příkladů, kdy je těžké si představit, jak může být něco neočekávaného, co se stane v reálném světě, viditelné pro chytrý kontrakt.

Kromě výše uvedeného existují také rizika týkající se regulace a daní, ale ta lze nakonec všechna vyřešit.

#### Můžeme nahradit právníky? (13:58) {#can-we-replace-lawyers-1358}

Můžeme tedy skutečně nahradit právníky kódem? Ne tak docela – alespoň ne právě teď. V budoucnu bude pravděpodobně stále více kontraktů automatizováno, zejména ve financích. Ale i v plně automatizovaném světě mohou právníci poskytnout cenné znalosti, které lze převést do kódu. Kolem krypto odvětví je také spousta regulačních výzev, které právníky na nějakou dobu velmi zaměstnají. Nicméně, kdybych byl právníkem, začal bych se učit o chytrých kontraktech a programování, protože v budoucnu budou hrát velkou roli.

#### Shrnutí (14:53) {#summary-1453}

Výhody chytrých kontraktů:

- Plně automatizované
- Deterministické výsledky
- Nevyžadující důvěru
- Rychlé, přesné a bezpečné
- Nákladově efektivní a transparentní

Nevýhody chytrých kontraktů:

- Softwarové chyby
- Změny protokolu
- Regulační a daňová nejistota

Přestože chytré kontrakty nesou určitá rizika, jsme stále na samém začátku a většina současných problémů je řešitelná.