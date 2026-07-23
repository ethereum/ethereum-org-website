---
title: "Rollupy: ultimátní strategie pro škálování Etherea?"
description: "Detailní pohled na rollupy jako hlavní strategii pro škálování Etherea. Toto video vysvětluje, jak fungují optimistické rollupy (Arbitrum, Optimism) a rollupy s nulovým vědomím."
lang: cs
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollupy"
---

Vysvětlující video od **Finematics**, které pokrývá rollupy jako hlavní strategii pro škálování Etherea. Video porovnává optimistické rollupy (Arbitrum, Optimism) se ZK rollupy a zkoumá, proč se rollupy staly dominantní metodou pro škálování Etherea.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=7pWxCklcNsU) publikovaného kanálem Finematics. Byl lehce upraven pro lepší čitelnost.*

#### Vrstva 2 (1:17) {#layer-2-117}

Škálování Etherea je jedním z nejdiskutovanějších témat v kryptu. Debata o škálování se obvykle vyostřuje během období vysoké aktivity sítě, jako bylo šílenství kolem CryptoKitties v roce 2017, léto decentralizovaných financí (DeFi) v roce 2020 nebo býčí trh v kryptu na začátku roku 2021. Během těchto období vedla bezprecedentní poptávka po síti Ethereum k extrémně vysokým poplatkům za gas, což běžným uživatelům prodražilo placení za jejich transakce.

Aby se tento problém vyřešil, hledání ultimátního řešení pro škálování se stalo jednou z hlavních priorit pro mnoho týmů i komunitu Etherea jako celek.

Obecně existují tři hlavní způsoby, jak škálovat Ethereum – nebo vlastně většinu ostatních blockchainů: škálování samotného blockchainu (škálování vrstvy 1 (l1)), stavění nad vrstvou 1 (škálování vrstvy 2 (l2)) a stavění vedle vrstvy 1 (postranní řetězce).

#### Mimo vrstvu 1 (1:58) {#outside-of-layer-1-158}

Pokud jde o vrstvu 1, Eth2 je zvoleným řešením pro škálování blockchainu Ethereum. Eth2 odkazuje na soubor vzájemně propojených změn, jako je přechod na důkaz podílem (PoS), sloučení stavu blockchainu s důkazem prací (PoW) do nového řetězce s důkazem podílem a sharding. Zejména sharding může dramaticky zvýšit propustnost sítě Ethereum, obzvláště v kombinaci s rollupy.

Pokud jde o škálování mimo vrstvu 1, bylo vyzkoušeno několik různých řešení pro škálování se smíšenými výsledky. Na jedné straně máme řešení vrstvy 2, jako jsou kanály, které jsou plně zabezpečeny Ethereem, ale fungují dobře pouze pro specifickou sadu aplikací. Postranní řetězce jsou na druhou stranu obvykle kompatibilní s EVM a mohou škálovat aplikace pro obecné použití. Hlavní nevýhodou je, že jsou méně bezpečné než řešení vrstvy 2, protože nespoléhají na bezpečnost Etherea a místo toho mají své vlastní modely konsensu.

Většina rollupů se snaží dosáhnout toho nejlepšího z obou těchto světů vytvořením řešení pro škálování pro obecné použití, přičemž se stále plně spoléhají na bezpečnost Etherea. To je svatý grál škálování, protože to umožňuje nasadit všechny existující chytré kontrakty přítomné na Ethereu na rollup s malými nebo žádnými změnami, aniž by se obětovala bezpečnost. Není divu, že rollupy jsou pravděpodobně nejočekávanějším řešením pro škálování ze všech.

Rollup je typ řešení pro škálování, které funguje tak, že provádí transakce mimo vrstvu 1, ale odesílá transakční data na vrstvu 1. To umožňuje rollupu škálovat síť a stále odvozovat svou bezpečnost z konsensu Etherea. Přesun výpočtů offchain v podstatě umožňuje zpracovat celkově více transakcí, protože do bloků Etherea se musí vejít pouze část dat rollupových transakcí.

K dosažení tohoto cíle jsou rollupové transakce prováděny na samostatném řetězci, který může dokonce spouštět verzi EVM specifickou pro daný rollup. Dalším krokem po provedení transakcí na rollupu je jejich seskupení do dávek a odeslání na hlavní řetězec Etherea. Celý proces v podstatě provede transakce, vezme data, zkomprimuje je a sroluje je do hlavního řetězce v jediné dávce – odtud název „rollup“.

Každý rollup nasazuje sadu chytrých kontraktů na vrstvě 1, které jsou zodpovědné za zpracování vkladů a výběrů a ověřování důkazů. Důkazy jsou také tím, kde vstupuje do hry hlavní rozdíl mezi různými typy rollupů. Optimistické rollupy používají důkazy o podvodu, zatímco ZK rollupy používají důkazy platnosti.

#### Optimistické rollupy (4:26) {#optimistic-rollups-426}

Optimistické rollupy odesílají data na vrstvu 1 a předpokládají, že jsou správná – odtud název „optimistické“. Pokud jsou odeslaná data platná, jsme na ideální cestě a není třeba dělat nic dalšího. Optimistický rollup těží z toho, že v optimistickém scénáři nemusí provádět žádnou další práci.

V případě neplatné transakce musí být systém schopen ji identifikovat, obnovit správný stav a penalizovat stranu, která takovou transakci odeslala. K dosažení tohoto cíle implementují optimistické rollupy systém řešení sporů, který je schopen ověřovat důkazy o podvodu, detekovat podvodné transakce a odrazovat zlomyslné aktéry od odesílání dalších neplatných transakcí nebo nesprávných důkazů o podvodu.

Ve většině implementací optimistických rollupů musí strana, která je schopna odesílat dávky transakcí na vrstvu 1, poskytnout kauci, obvykle ve formě ETH. Jakýkoli jiný účastník sítě může odeslat důkaz o podvodu, pokud zpozoruje nesprávnou transakci. Po odeslání důkazu o podvodu systém přejde do režimu řešení sporů. V tomto režimu je podezřelá transakce provedena znovu – tentokrát na hlavním řetězci Etherea. Pokud provedení prokáže, že transakce byla skutečně podvodná, je strana, která tuto transakci odeslala, potrestána, obvykle tím, že je její vložené ETH penalizováno.

Aby se zabránilo zlomyslným aktérům ve spamování sítě nesprávnými důkazy o podvodu, strany, které chtějí odeslat důkazy o podvodu, obvykle také musí poskytnout kauci, která může podléhat penalizaci.

Aby bylo možné provést rollupovou transakci na vrstvě 1, musí optimistické rollupy implementovat systém, který je schopen přehrát transakci s přesným stavem, který byl přítomen, když byla transakce původně provedena na rollupu. To je jedna ze složitých částí optimistických rollupů a obvykle se jí dosahuje vytvořením samostatného řídícího kontraktu, který nahrazuje určitá volání funkcí stavem z rollupu.

Systém může fungovat podle očekávání a detekovat podvod, i když existuje pouze jedna poctivá strana, která monitoruje stav rollupu a v případě potřeby odesílá důkazy o podvodu. Díky správným pobídkám v rámci rollupového systému by měl být vstup do procesu řešení sporů výjimečnou situací a ne něčím, co se děje neustále.

Pokud jde o ZK rollupy, neexistuje zde vůbec žádné řešení sporů. To je možné díky využití chytrého kousku kryptografie zvaného důkazy s nulovým vědomím – odtud název ZK rollupy. V tomto modelu každá dávka odeslaná na vrstvu 1 obsahuje kryptografický důkaz zvaný ZK-SNARK. Důkaz může být rychle ověřen kontraktem na vrstvě 1 při odeslání dávky transakcí a neplatné dávky mohou být okamžitě odmítnuty.

#### Další rozdíly (7:28) {#other-differences-728}

Vzhledem k povaze procesu řešení sporů musí optimistické rollupy poskytnout všem účastníkům sítě dostatek času na odeslání důkazů o podvodu před finalizací transakce na vrstvě 1. Toto období je obvykle poměrně dlouhé – aby se zajistilo, že i v nejhorším možném scénáři mohou být podvodné transakce stále zpochybněny. To způsobuje, že výběry z optimistických rollupů jsou poměrně zdlouhavé, protože uživatelé musí čekat až týden nebo dva, než si budou moci vybrat své prostředky zpět na vrstvu 1.

Naštěstí existuje několik projektů, které pracují na zlepšení této situace poskytováním rychlých „výstupů likvidity“. Tyto projekty nabízejí téměř okamžité výběry zpět na vrstvu 1, jinou vrstvu 2 nebo dokonce postranní řetězec a za toto pohodlí si účtují malý poplatek. Hop Protocol a Connext jsou projekty, které stojí za to sledovat.

ZK rollupy nemají problém s dlouhými výběry, protože prostředky jsou k dispozici pro výběr, jakmile je dávka rollupu spolu s důkazem platnosti odeslána na vrstvu 1.

ZK rollupy však mají své vlastní nevýhody. Vzhledem ke složitosti technologie je mnohem těžší vytvořit ZK rollup kompatibilní s EVM, což ztěžuje škálování aplikací pro obecné použití bez nutnosti přepisovat aplikační logiku. Nicméně zkSync dělá v této oblasti významný pokrok a možná budou schopni spustit ZK rollup kompatibilní s EVM poměrně brzy.

Optimistické rollupy to mají s kompatibilitou s EVM o něco jednodušší. Stále musí spouštět svou vlastní verzi EVM s několika úpravami, ale 99 % kontraktů lze přenést bez jakýchkoli změn. ZK rollupy jsou také mnohem náročnější na výpočty než optimistické rollupy, což znamená, že uzly, které počítají ZK důkazy, musí být vysoce výkonné stroje, což ztěžuje jejich provozování ostatním uživatelům.

#### Vylepšení škálování (9:32) {#scaling-improvements-932}

Pokud jde o vylepšení škálování, oba typy rollupů by měly být schopny škálovat Ethereum z přibližně 15–45 transakcí za sekundu (v závislosti na typu transakce) až na 1 000–4 000 transakcí za sekundu. Stojí za zmínku, že je možné zpracovat ještě více transakcí za sekundu tím, že se nabídne více prostoru pro dávky rollupů na vrstvě 1.

To je také důvod, proč může Eth2 vytvořit masivní synergii s rollupy, protože zvyšuje možný prostor pro dostupnost dat vytvořením více shardů – z nichž každý je schopen uložit značné množství dat. Kombinace Eth2 a rollupů by mohla zvýšit rychlost transakcí Etherea až na 100 000 transakcí za sekundu.

Optimism a Arbitrum jsou v současnosti nejoblíbenějšími možnostmi, pokud jde o optimistické rollupy. Optimism byl částečně spuštěn na Ethereum Mainnet s omezenou sadou partnerů, jako jsou Synthetix a Uniswap, aby se zajistilo, že technologie funguje podle očekávání před plným spuštěním. Arbitrum již nasadilo svou verzi na Mainnet a začalo s onboardingem různých projektů do svého ekosystému.

Mezi nejvýznamnější projekty spouštěné na Arbitru patří Uniswap, Sushi, Bancor, Augur, Chainlink, Aave a mnoho dalších. Arbitrum také oznámilo partnerství s Reddit, které se zaměřuje na spuštění samostatného rollupového řetězce pro škálování jejich systému odměn. Optimism spolupracuje s MakerDAO na vytvoření mostu Optimism Dai Bridge a umožnění rychlých výběrů DAI a dalších tokenů zpět na vrstvu 1.

Ačkoli se Arbitrum i Optimism snaží dosáhnout stejného cíle – budování řešení optimistických rollupů kompatibilních s EVM – v jejich designu je několik rozdílů. Arbitrum má odlišný model řešení sporů. Místo opětovného spuštění celé transakce na vrstvě 1 k ověření, zda je důkaz o podvodu platný, přišli s interaktivním vícekolovým modelem, který umožňuje zúžit rozsah sporu a potenciálně provést pouze několik instrukcí na vrstvě 1 ke kontrole, zda je podezřelá transakce platná.

Dalším velkým rozdílem je přístup ke zpracování řazení transakcí a MEV. Arbitrum bude zpočátku provozovat sekvencer zodpovědný za řazení transakcí, ale v dlouhodobém horizontu jej chtějí decentralizovat. Optimism preferuje jiný přístup, kde řazení transakcí – a tím i MEV – může být vydraženo jiným stranám na určité časové období.

#### ZK rollupy (13:10) {#zk-rollups-1310}

Ačkoli to vypadá, že se komunita Etherea zaměřuje převážně na optimistické rollupy – alespoň v krátkodobém horizontu – projekty pracující na ZK rollupech také postupují extrémně rychle.

Loopring používá technologii ZK rollupů ke škálování své burzy a platebního protokolu. Hermez a ZKTube pracují na škálování plateb pomocí ZK rollupů, přičemž Hermez také buduje ZK rollup kompatibilní s EVM. Aztec se zaměřuje na přinášení funkcí pro soukromí do své technologie ZK rollupů.

Rollupy založené na StarkWare jsou již hojně využívány projekty jako DeversiFi, Immutable X a dYdX. Jak již bylo zmíněno dříve, zkSync pracuje na virtuálním stroji kompatibilním s EVM, který bude schopen plně podporovat jakékoli libovolné chytré kontrakty napsané v Solidity.

#### DeFi (14:02) {#defi-1402}

Rollupy by také měly mít velký dopad na decentralizované finance (DeFi). Uživatelé, kteří dříve nemohli provádět transakce na Ethereu kvůli vysokým transakčním poplatkům, budou moci zůstat v ekosystému, až bude příště aktivita sítě vysoká. Rollupy také umožní vznik nové generace aplikací, které vyžadují levnější transakce a rychlejší dobu potvrzení – to vše při plném zabezpečení konsensem Etherea. Vypadá to, že rollupy mohou spustit další období vysokého růstu pro DeFi.

#### Výzvy (14:29) {#challenges-1429}

Pokud jde o rollupy, existuje však několik výzev. Skládatelnost je jednou z nich – aby bylo možné složit transakci, která využívá více protokolů, musely by být všechny nasazeny na stejném rollupu.

Další výzvou je roztříštěná likvidita. Bez nových peněz přicházejících do ekosystému Etherea jako celku bude stávající likvidita přítomná na vrstvě 1 v protokolech jako Uniswap nebo Aave sdílena mezi vrstvou 1 a více implementacemi rollupů. Nižší likvidita obvykle znamená vyšší cenový skluz a horší provedení obchodu.

To také znamená, že přirozeně budou existovat vítězové a poražení. V současné době není stávající ekosystém Etherea dostatečně velký na to, aby využil všechna řešení pro škálování. To se může – a pravděpodobně i stane – v dlouhodobém horizontu změnit, ale v krátkodobém horizontu můžeme vidět, že se z některých rollupů a dalších řešení pro škálování stanou města duchů. V budoucnu můžeme také vidět uživatele, kteří žijí výhradně v rámci jednoho ekosystému rollupu a po dlouhou dobu neinteragují s hlavním řetězcem Etherea a dalšími řešeními pro škálování.

#### Hrozba pro postranní řetězce (15:44) {#threat-to-sidechains-1544}

Jedna otázka, která se velmi často objevuje při diskusích o rollupech, je, zda představují hrozbu pro postranní řetězce. Postranní řetězce budou mít v ekosystému Etherea stále své místo. Ačkoli náklady na transakce na vrstvě 2 budou mnohem nižší než na vrstvě 1, s největší pravděpodobností budou stále dostatečně vysoké na to, aby vytlačily určité typy aplikací, jako jsou hry a další vysokoobjemové aplikace. To se může změnit, až Ethereum zavede sharding, ale do té doby mohou postranní řetězce vytvořit dostatečný síťový efekt k dlouhodobému přežití.

Poplatky na rollupech jsou také vyšší než na postranních řetězcích, protože každá dávka rollupu stále musí platit za prostor v bloku Etherea. Komunita Etherea klade obrovský důraz na rollupy ve strategii pro škálování Etherea – alespoň v krátkodobém až střednědobém horizontu a potenciálně i déle.