---
title: "Maximální extrahovatelná hodnota (MEV)"
description: "Co je maximální extrahovatelná hodnota (MEV)? Zjistěte, jak hledači, tvůrci a validátoři extrahují hodnotu řazením transakcí a jak MEV ovlivňuje uživatele."
lang: cs
---

Maximální extrahovatelná hodnota (MEV) označuje maximální hodnotu, kterou lze extrahovat z produkce bloku nad rámec standardní odměny za blok a poplatků za plyn zahrnutím, vyloučením a změnou pořadí transakcí v bloku.

## Maximální extrahovatelná hodnota {#maximal-extractable-value}

Maximální extrahovatelná hodnota byla poprvé aplikována v kontextu [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow/) a původně se označovala jako „miner extractable value“ (hodnota extrahovatelná těžařem). Je to proto, že v důkazu prací (PoW) těžaři kontrolují zahrnutí, vyloučení a řazení transakcí. Nicméně od přechodu na důkaz podílem (PoS) prostřednictvím [Merge](/roadmap/merge) jsou za tyto role zodpovědní validátoři a těžba již není součástí protokolu [Ethereum](/). Metody extrakce hodnoty však stále existují, takže se nyní místo toho používá termín „maximální extrahovatelná hodnota“.

## Předpoklady {#prerequisites}

Ujistěte se, že jste obeznámeni s [transakcemi](/developers/docs/transactions/), [bloky](/developers/docs/blocks/), [důkazem podílem (PoS)](/developers/docs/consensus-mechanisms/pos) a [gasem](/developers/docs/gas/). Užitečná je také znalost [decentralizovaných aplikací (dapp)](/apps/) a [decentralizovaných financí (DeFi)](/defi/).

## Extrakce MEV {#mev-extraction}

Teoreticky MEV připadá výhradně validátorům, protože jsou jedinou stranou, která může zaručit provedení ziskové příležitosti MEV. V praxi však velkou část MEV extrahují nezávislí účastníci sítě označovaní jako „hledači“. Hledači spouštějí složité algoritmy na datech blockchainu, aby detekovali ziskové příležitosti MEV, a mají boty, kteří tyto ziskové transakce automaticky odesílají do sítě.

Validátoři přesto získávají část z celkové částky MEV, protože hledači jsou ochotni platit vysoké poplatky za plyn (které jdou validátorovi) výměnou za vyšší pravděpodobnost zahrnutí jejich ziskových transakcí do bloku. Za předpokladu, že jsou hledači ekonomicky racionální, poplatek za plyn, který je hledač ochoten zaplatit, bude činit až 100 % MEV hledače (protože pokud by byl poplatek za plyn vyšší, hledač by prodělal).

Z tohoto důvodu u některých vysoce konkurenčních příležitostí MEV, jako je [arbitráž na decentralizovaných burzách (DEX)](#mev-examples-dex-arbitrage), mohou hledači muset zaplatit 90 % nebo dokonce více ze svých celkových příjmů z MEV na poplatcích za plyn validátorovi, protože tolik lidí chce provést stejný ziskový arbitrážní obchod. Je to proto, že jediný způsob, jak zaručit, že jejich arbitrážní transakce proběhne, je odeslat transakci s nejvyšší cenou plynu.

### Gas golfing {#mev-extraction-gas-golfing}

Tato dynamika způsobila, že být dobrý v „gas golfingu“ – programování transakcí tak, aby spotřebovaly co nejméně gasu – je konkurenční výhodou, protože to hledačům umožňuje nastavit vyšší cenu plynu při zachování konstantních celkových poplatků za plyn (protože poplatky za plyn = cena plynu \* spotřebovaný gas).

Mezi několik známých technik gas golfingu patří: používání adres, které začínají dlouhým řetězcem nul (např. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), protože zabírají méně místa (a tedy i gasu) pro uložení; a ponechání malých zůstatků [ERC-20](/developers/docs/standards/tokens/erc-20/) tokenů v kontraktech, protože inicializace úložného slotu (případ, kdy je zůstatek 0) stojí více gasu než aktualizace úložného slotu. Hledání dalších technik ke snížení spotřeby gasu je aktivní oblastí výzkumu mezi hledači.

### Zobecnění frontrunneři {#mev-extraction-generalized-frontrunners}

Místo programování složitých algoritmů k detekci ziskových příležitostí MEV provozují někteří hledači univerzální frontrunnery. Univerzální frontrunneři jsou boti, kteří sledují mempool, aby detekovali ziskové transakce. Frontrunner zkopíruje kód potenciálně ziskové transakce, nahradí adresy svou vlastní adresou a spustí transakci lokálně, aby si ověřil, že upravená transakce přinese zisk na jeho adresu. Pokud je transakce skutečně zisková, frontrunner odešle upravenou transakci s nahrazenou adresou a vyšší cenou plynu, čímž „předběhne“ (frontrunning) původní transakci a získá MEV původního hledače.

### Flashbots {#mev-extraction-flashbots}

Flashbots je nezávislý projekt, který rozšiřuje exekuční klienty o službu, jež umožňuje hledačům odesílat MEV transakce validátorům, aniž by je odhalili ve veřejném mempoolu. Tím se zabrání tomu, aby transakce předběhli univerzální frontrunneři.

## Příklady MEV {#mev-examples}

MEV se na blockchainu objevuje několika způsoby.

### Arbitráž na DEX {#mev-examples-dex-arbitrage}

Arbitráž na [decentralizované burze](/glossary/#dex) (DEX) je nejjednodušší a nejznámější příležitostí MEV. V důsledku toho je také nejvíce konkurenční.

Funguje to takto: pokud dvě DEX nabízejí token za dvě různé ceny, někdo může koupit token na levnější DEX a prodat ho na dražší DEX v jediné atomické transakci. Díky mechanismům blockchainu se jedná o skutečnou, bezrizikovou arbitráž.

[Zde je příklad](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) ziskové arbitrážní transakce, kde hledač proměnil 1 000 ETH na 1 045 ETH tím, že využil rozdílného ocenění páru ETH/DAI na Uniswapu oproti Sushiswapu.

### Likvidace {#mev-examples-liquidations}

Likvidace v protokolech pro půjčování představují další známou příležitost MEV.

Protokoly pro půjčování jako Maker a Aave vyžadují, aby uživatelé vložili nějaké zajištění (např. ETH). Toto vložené zajištění se pak používá k půjčování dalším uživatelům.

Uživatelé si pak mohou vypůjčovat aktiva a tokeny od ostatních v závislosti na tom, co potřebují (např. si můžete vypůjčit MKR, pokud chcete odevzdat hlas v návrhu na správu MakerDAO), a to až do určitého procenta jejich vloženého zajištění. Například pokud je částka pro vypůjčování maximálně 30 %, uživatel, který do protokolu vloží 100 DAI, si může vypůjčit jiné aktivum v hodnotě až 30 DAI. Přesné procento výpůjční síly určuje protokol.

Jak hodnota zajištění dlužníka kolísá, kolísá i jeho výpůjční síla. Pokud v důsledku tržních výkyvů hodnota vypůjčených aktiv překročí řekněme 30 % hodnoty jejich zajištění (přesné procento opět určuje protokol), protokol obvykle umožňuje komukoli zlikvidovat zajištění a okamžitě vyplatit věřitele (to je podobné tomu, jak fungují [margin calls](https://www.investopedia.com/terms/m/margincall.asp) v tradičních financích). V případě likvidace musí dlužník obvykle zaplatit tučný poplatek za likvidaci, z něhož část připadne likvidátorovi – a právě zde se objevuje příležitost MEV.

Hledači soutěží v tom, kdo co nejrychleji analyzuje data blockchainu, aby zjistili, kteří dlužníci mohou být zlikvidováni, a byli první, kdo odešle likvidační transakci a vybere poplatek za likvidaci pro sebe.

### Sandwich trading {#mev-examples-sandwich-trading}

Sandwich trading (sendvičové obchodování) je další běžnou metodou extrakce MEV.

Při sandwich tradingu hledač sleduje mempool a hledá velké obchody na DEX. Předpokládejme například, že někdo chce na Uniswapu koupit 10 000 UNI za DAI. Obchod takového rozsahu bude mít smysluplný dopad na pár UNI/DAI a potenciálně výrazně zvýší cenu UNI vůči DAI.

Hledač dokáže vypočítat přibližný cenový dopad tohoto velkého obchodu na pár UNI/DAI a provést optimální nákupní příkaz bezprostředně _před_ velkým obchodem, čímž nakoupí UNI levně, a poté provést prodejní příkaz bezprostředně _po_ velkém obchodu, čímž jej prodá za vyšší cenu způsobenou velkou objednávkou.

Sandwiching je však riskantnější, protože není atomický (na rozdíl od výše popsané arbitráže na DEX) a je náchylný k [útoku typu salmonella](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

MEV v prostoru nezaměnitelných tokenů (NFT) je nově vznikajícím fenoménem a nemusí být nutně ziskové.

Vzhledem k tomu, že transakce NFT probíhají na stejném blockchainu sdíleném všemi ostatními transakcemi Etherea, mohou hledači na trhu NFT používat podobné techniky jako u tradičních příležitostí MEV.

Pokud například dojde k populárnímu vydání (dropu) NFT a hledač chce určité NFT nebo sadu NFT, může naprogramovat transakci tak, aby byl první na řadě při nákupu NFT, nebo může koupit celou sadu NFT v jediné transakci. Nebo pokud je NFT [omylem nabídnuto za nízkou cenu](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), hledač může předběhnout ostatní kupující a ulovit ho levně.

Jeden z prominentních příkladů NFT MEV se stal, když hledač utratil 7 milionů dolarů, aby [koupil](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) každého jednotlivého Cryptopunka za minimální cenu (price floor). Výzkumník blockchainu [vysvětlil na Twitteru](https://twitter.com/IvanBogatyy/status/1422232184493121538), jak kupující spolupracoval s poskytovatelem MEV, aby svůj nákup utajil.

### Dlouhý chvost {#mev-examples-long-tail}

Arbitráž na DEX, likvidace a sandwich trading jsou velmi známé příležitosti MEV a je nepravděpodobné, že by byly pro nové hledače ziskové. Existuje však dlouhý chvost (long tail) méně známých příležitostí MEV (NFT MEV je pravděpodobně jednou z nich).

Hledači, kteří teprve začínají, mohou být úspěšnější při hledání MEV v tomto dlouhém chvostu. [Pracovní deska MEV](https://github.com/flashbots/mev-job-board) od Flashbots uvádí některé nově vznikající příležitosti.

## Účinky MEV {#effects-of-mev}

MEV není jen špatné – MEV má na Ethereu jak pozitivní, tak negativní důsledky.

### To dobré {#effects-of-mev-the-good}

Mnoho projektů decentralizovaných financí (DeFi) spoléhá na ekonomicky racionální aktéry, kteří zajišťují užitečnost a stabilitu jejich protokolů. Například arbitráž na DEX zajišťuje, že uživatelé získají za své tokeny ty nejlepší a nejsprávnější ceny, a protokoly pro půjčování spoléhají na rychlé likvidace, když dlužníci klesnou pod poměr zajištění, aby se zajistilo, že věřitelé dostanou své peníze zpět.

Bez racionálních hledačů, kteří hledají a napravují ekonomické neefektivity a využívají ekonomických pobídek protokolů, by protokoly DeFi a decentralizované aplikace (dapp) obecně nemusely být tak robustní, jako jsou dnes.

### To špatné {#effects-of-mev-the-bad}

Na aplikační vrstvě vedou některé formy MEV, jako je sandwich trading, k jednoznačně horšímu zážitku pro uživatele. Uživatelé, kteří se stanou obětí sandwichingu, čelí zvýšenému cenovému skluzu a horšímu provedení svých obchodů.

Na síťové vrstvě vedou univerzální frontrunneři a aukce cen plynu, do kterých se často zapojují (když dva nebo více frontrunnerů soutěží o to, aby byla jejich transakce zahrnuta do dalšího bloku postupným zvyšováním ceny plynu vlastních transakcí), k přetížení sítě a vysokým cenám plynu pro všechny ostatní, kteří se snaží provádět běžné transakce.

Kromě toho, co se děje _uvnitř_ bloků, může mít MEV škodlivé účinky _mezi_ bloky. Pokud MEV dostupné v bloku výrazně převyšuje standardní odměnu za blok, mohou být validátoři motivováni k reorganizaci bloků a získání MEV pro sebe, což způsobuje reorganizaci blockchainu a nestabilitu konsensu.

Tato možnost reorganizace blockchainu byla [již dříve zkoumána na blockchainu Bitcoinu](https://dl.acm.org/doi/10.1145/2976749.2978408). Jak se odměna za blok Bitcoinu půlí a transakční poplatky tvoří stále větší část odměny za blok, nastávají situace, kdy se pro těžaře stává ekonomicky racionálním vzdát se odměny za další blok a místo toho znovu vytěžit minulé bloky s vyššími poplatky. S růstem MEV by mohla podobná situace nastat i v Ethereu, což by ohrozilo integritu blockchainu.

## Stav MEV {#state-of-mev}

Extrakce MEV prudce vzrostla na začátku roku 2021, což vedlo k extrémně vysokým cenám plynu v prvních měsících roku. Vznik MEV relé od Flashbots snížil efektivitu univerzálních frontrunnerů a přesunul aukce cen plynu offchain, čímž se snížily ceny plynu pro běžné uživatele.

Zatímco mnoho hledačů stále vydělává na MEV dobré peníze, jak se příležitosti stávají známějšími a stále více hledačů soutěží o stejnou příležitost, validátoři budou získávat stále větší část celkových příjmů z MEV (protože stejný druh aukcí plynu, jak byl původně popsán výše, probíhá také ve Flashbots, i když soukromě, a validátoři získají výsledné příjmy z plynu). MEV také není unikátní pro Ethereum, a jak se příležitosti na Ethereu stávají více konkurenčními, hledači se přesouvají na alternativní blockchainy, jako je Binance Smart Chain, kde existují podobné příležitosti MEV jako na Ethereu s menší konkurencí.

Na druhou stranu přechod z důkazu prací (PoW) na důkaz podílem (PoS) a probíhající snaha o škálování Etherea pomocí rollupů mění prostředí MEV způsoby, které jsou stále poněkud nejasné. Zatím není dobře známo, jak existence zaručených navrhovatelů bloků známých mírně předem mění dynamiku extrakce MEV ve srovnání s pravděpodobnostním modelem v důkazu prací, nebo jak to bude narušeno, až se implementuje [volba jediného tajného vůdce (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) a [technologie distribuovaných validátorů (DVT)](/staking/dvt/). Podobně se teprve uvidí, jaké příležitosti MEV budou existovat, až se většina uživatelské aktivity přesune z Etherea na jeho rollupy vrstvy 2 (L2) a shardy.

## MEV v Ethereu s důkazem podílem (PoS) {#mev-in-ethereum-proof-of-stake}

Jak bylo vysvětleno, MEV má negativní důsledky pro celkový uživatelský zážitek a bezpečnost vrstvy konsensu. Přechod Etherea na konsensus důkazu podílem (nazývaný „Merge“) však potenciálně přináší nová rizika spojená s MEV:

### Centralizace validátorů {#validator-centralization}

V Ethereu po Merge se validátoři (kteří složili bezpečnostní vklady ve výši 32 ETH) shodují na platnosti bloků přidaných do Beacon chainu. Vzhledem k tomu, že 32 ETH může být pro mnohé nedosažitelných, může být schůdnější možností [připojení ke stakingovému poolu](/staking/pools/). Nicméně zdravé rozložení [sólo stakerů](/staking/solo/) je ideální, protože zmírňuje centralizace validátorů a zlepšuje bezpečnost Etherea.

Předpokládá se však, že extrakce MEV je schopna urychlit centralizaci validátorů. Je to částečně proto, že jelikož validátoři [vydělávají za navrhování bloků méně](/roadmap/merge/issuance/#post-merge), než dříve vydělávali těžaři, extrakce MEV od [Merge](/roadmap/merge/) značně [ovlivnila výdělky validátorů](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb).

Větší stakingové pooly budou mít pravděpodobně více zdrojů na investice do nezbytných optimalizací k zachycení příležitostí MEV. Čím více MEV tyto pooly extrahují, tím více zdrojů mají na zlepšení svých schopností extrakce MEV (a zvýšení celkových příjmů), což v podstatě vytváří [úspory z rozsahu](https://www.investopedia.com/terms/e/economiesofscale.asp#).

S menším množstvím zdrojů, které mají k dispozici, nemusí být sólo stakeři schopni profitovat z příležitostí MEV. To může zvýšit tlak na nezávislé validátory, aby se připojili k mocným stakingovým poolům za účelem zvýšení svých výdělků, což snižuje decentralizace v Ethereu.

### Mempooly s řízeným přístupem {#permissioned-mempools}

V reakci na útoky typu sandwiching a frontrunning mohou obchodníci začít uzavírat offchain dohody s validátory za účelem soukromí transakcí. Místo odeslání potenciální MEV transakce do veřejného mempoolu ji obchodník odešle přímo validátorovi, který ji zahrne do bloku a rozdělí si s obchodníkem zisk.

„Dark pools“ (temné pooly) jsou větší verzí tohoto uspořádání a fungují jako mempooly s řízeným přístupem, otevřené pouze uživatelům ochotným platit určité poplatky. Tento trend by snížil bezoprávněnost (permissionlessness) a bezdůvěrnost Etherea a potenciálně by transformoval blockchain na mechanismus „pay-to-play“, který zvýhodňuje toho, kdo nabídne nejvíce.

Mempooly s řízeným přístupem by také urychlily rizika centralizace popsaná v předchozí části. Velké pooly provozující více validátorů budou pravděpodobně těžit z nabídky soukromí transakcí obchodníkům a uživatelům, což zvýší jejich příjmy z MEV.

Boj proti těmto problémům souvisejícím s MEV v Ethereu po Merge je klíčovou oblastí výzkumu. K dnešnímu dni jsou dvěma navrhovanými řešeními ke snížení negativního dopadu MEV na decentralizace a bezpečnost Etherea po Merge [**oddělení navrhovatele a tvůrce (PBS)**](/roadmap/pbs/) a [**Builder API**](https://github.com/ethereum/builder-specs).

### Oddělení navrhovatele a tvůrce (PBS) {#proposer-builder-separation}

Jak v důkazu prací, tak v důkazu podílem uzel, který sestaví blok, jej navrhne k přidání do řetězce ostatním uzlům účastnícím se konsensu. Nový blok se stane součástí kanonického řetězce poté, co na něm staví další těžař (v PoW), nebo obdrží atestace od většiny validátorů (v PoS).

Kombinace rolí producenta bloku a navrhovatele bloku je to, co přináší většinu dříve popsaných problémů souvisejících s MEV. Například uzly konsensu jsou motivovány ke spouštění reorganizací řetězce při [útocích typu time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack), aby maximalizovaly výdělky z MEV.

[Oddělení navrhovatele a tvůrce](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) je navrženo tak, aby zmírnilo dopad MEV, zejména na vrstvě konsensu. Hlavním rysem PBS je oddělení pravidel producenta bloku a navrhovatele bloku. Validátoři jsou stále zodpovědní za navrhování a hlasování o blocích, ale nová třída specializovaných entit, nazývaných **tvůrci bloků**, má za úkol řadit transakce a sestavovat bloky.

V rámci PBS tvůrce bloku vytvoří balíček transakcí a podá nabídku na jeho zahrnutí do bloku Beacon chainu (jako „exekuční payload“). Validátor vybraný k navržení dalšího bloku pak zkontroluje různé nabídky a vybere balíček s nejvyšším poplatkem. PBS v podstatě vytváří aukční trh, kde tvůrci vyjednávají s validátory prodávajícími prostor v bloku.

Současné návrhy PBS používají [schéma commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), ve kterém tvůrci spolu se svými nabídkami zveřejňují pouze kryptografický závazek k obsahu bloku (hlavička bloku). Po přijetí vítězné nabídky navrhovatel vytvoří podepsaný návrh bloku, který obsahuje hlavičku bloku. Očekává se, že tvůrce bloku zveřejní celé tělo bloku poté, co uvidí podepsaný návrh bloku, a předtím, než je finalizováno, musí také obdržet dostatek [atestací](/glossary/#attestation) od validátorů.

#### Jak oddělení navrhovatele a tvůrce zmírňuje dopad MEV? {#how-does-pbs-curb-mev-impact}

Oddělení navrhovatele a tvůrce v rámci protokolu snižuje vliv MEV na konsensus tím, že odstraňuje extrakci MEV z kompetence validátorů. Místo toho budou příležitosti MEV do budoucna zachycovat tvůrci bloků provozující specializovaný hardware.

To však validátory zcela nevylučuje z příjmů souvisejících s MEV, protože tvůrci musí nabízet vysoké částky, aby jejich bloky validátoři přijali. Nicméně vzhledem k tomu, že se validátoři již přímo nezaměřují na optimalizaci příjmů z MEV, hrozba útoků typu time-bandit se snižuje.

Oddělení navrhovatele a tvůrce také snižuje rizika centralizace MEV. Například použití schématu commit-reveal odstraňuje nutnost, aby tvůrci důvěřovali validátorům, že neukradnou příležitost MEV nebo ji neodhalí jiným tvůrcům. To snižuje bariéru pro sólo stakery, aby mohli těžit z MEV, jinak by tvůrci měli tendenci upřednostňovat velké pooly s offchain reputací a uzavírat s nimi offchain dohody.

Podobně validátoři nemusí důvěřovat tvůrcům, že nezadrží těla bloků nebo nezveřejní neplatné bloky, protože platba je bezpodmínečná. Poplatek validátora se zpracuje i v případě, že navrhovaný blok není k dispozici nebo je jinými validátory prohlášen za neplatný. V druhém případě je blok jednoduše zahozen, což tvůrce bloku donutí přijít o všechny transakční poplatky a příjmy z MEV.

### Builder API {#builder-api}

Zatímco oddělení navrhovatele a tvůrce slibuje snížení účinků extrakce MEV, jeho implementace vyžaduje změny v protokolu konsensu. Konkrétně by bylo nutné aktualizovat pravidlo [volby forku](/developers/docs/consensus-mechanisms/pos/#fork-choice) na Beacon chainu. [Builder API](https://github.com/ethereum/builder-specs) je dočasné řešení zaměřené na poskytnutí fungující implementace oddělení navrhovatele a tvůrce, i když s vyššími předpoklady důvěry.

Builder API je upravená verze [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), kterou používají klienti vrstvy konsensu k vyžádání exekučních payloadů od klientů exekuční vrstvy. Jak je nastíněno ve [specifikaci poctivého validátora](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), validátoři vybraní pro povinnosti navrhování bloků si vyžádají balíček transakcí od připojeného exekučního klienta, který zahrnou do navrhovaného bloku Beacon chainu.

Builder API také funguje jako middleware mezi validátory a klienty exekuční vrstvy; liší se však tím, že umožňuje validátorům na Beacon chainu získávat bloky od externích entit (místo lokálního sestavování bloku pomocí exekučního klienta).

Níže je uveden přehled toho, jak Builder API funguje:

1. Builder API připojuje validátora k síti tvůrců bloků provozujících klienty exekuční vrstvy. Stejně jako v PBS jsou tvůrci specializované strany, které investují do sestavování bloků náročného na zdroje a používají různé strategie k maximalizaci příjmů získaných z MEV + prioritních poplatků.

2. Validátor (provozující klienta vrstvy konsensu) si vyžádá exekuční payloady spolu s nabídkami od sítě tvůrců. Nabídky od tvůrců budou obsahovat hlavičku exekučního payloadu – kryptografický závazek k obsahu payloadu – a poplatek, který má být zaplacen validátorovi.

3. Validátor zkontroluje příchozí nabídky a vybere exekuční payload s nejvyšším poplatkem. Pomocí Builder API validátor podepíše „zaslepený“ beacon blok, který obsahuje pouze hlavičku exekučního payloadu, nikoli transakce, a odešle jej zpět.

4. Jakmile tvůrce uvidí podepsaný zaslepený blok, prostřednictvím relé, které neslo jeho nabídku, odhalí celý exekuční payload a zveřejní kompletní podepsaný beacon blok do sítě. (Před upgradem Fusaka byl payload místo toho vrácen validátorovi, který blok zveřejnil.)

5. Od validátora používajícího Builder API se stále očekává, že sestaví blok lokálně pro případ, že by tvůrce bloku neodpověděl pohotově, aby nepřišel o odměny za návrh bloku. Validátor však nemůže vytvořit další blok pomocí nyní odhalených transakcí nebo jiné sady, protože by to znamenalo _ekvivokaci_ (podepsání dvou bloků ve stejném slotu), což je přestupek trestaný slashingem.

Příkladem implementace Builder API je [MEV-Boost](https://github.com/flashbots/mev-boost), vylepšení [aukčního mechanismu Flashbots](https://docs.flashbots.net/flashbots-auction/overview) navržené k omezení negativních externalit MEV na Ethereu. Aukce Flashbots umožňuje validátorům v důkazu podílem outsourcovat práci na sestavování ziskových bloků specializovaným stranám zvaným **hledači**.

<MevBoostDiagram />

Hledači hledají lukrativní příležitosti MEV a odesílají balíčky transakcí navrhovatelům bloků spolu s [nabídkou s uzavřenou cenou](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) pro zahrnutí do bloku. Validátor provozující mev-geth, forknutou verzi klienta Go Ethereum (Geth), musí pouze vybrat balíček s největším ziskem a zahrnout jej jako součást nového bloku. K ochraně navrhovatelů bloků (validátorů) před spamem a neplatnými transakcemi procházejí balíčky transakcí předtím, než se dostanou k navrhovateli, přes **relé** (relayers) za účelem validace.

MEV-Boost zachovává stejné fungování původní aukce Flashbots, i když s novými funkcemi navrženými pro přechod Etherea na důkaz podílem. Hledači stále nacházejí ziskové MEV transakce pro zahrnutí do bloků, ale nová třída specializovaných stran, nazývaných **tvůrci**, je zodpovědná za agregaci transakcí a balíčků do bloků. Tvůrce přijímá nabídky s uzavřenou cenou od hledačů a spouští optimalizace, aby našel nejziskovější řazení.

Relé je stále zodpovědné za validaci bloků tvůrců předtím, než nabídne jejich hlavičky navrhovateli. Relé také fungují jako úschovy (escrows): drží celý blok každého tvůrce, čímž zajišťují [dostupnost dat](/developers/docs/data-availability/), a ukazují navrhovateli pouze jeho hlavičku, dokud ji navrhovatel nepodepíše, a poté zveřejní celý blok. Zde validátor připojený k jednomu nebo více relé požádá o dostupné exekuční payloady a MEV-Boost vybere hlavičku payloadu s nejvyšší nabídkou.

#### Jak Builder API zmírňuje dopad MEV? {#how-does-builder-api-curb-mev-impact}

Hlavní výhodou Builder API je jeho potenciál demokratizovat přístup k příležitostem MEV. Použití schémat commit-reveal eliminuje předpoklady důvěry a snižuje vstupní bariéry pro validátory, kteří chtějí těžit z MEV. To by mělo snížit tlak na sólo stakery, aby se integrovali do velkých stakingových poolů za účelem zvýšení zisků z MEV.

Rozšířená implementace Builder API podpoří větší konkurenci mezi tvůrci bloků, což zvyšuje odolnost vůči cenzuře. Vzhledem k tomu, že validátoři kontrolují nabídky od více tvůrců, tvůrce, který má v úmyslu cenzurovat jednu nebo více uživatelských transakcí, musí přeplatit všechny ostatní necenzurující tvůrce, aby byl úspěšný. To dramaticky zvyšuje náklady na cenzuru uživatelů a odrazuje od této praxe.

Některé projekty, jako je MEV-Boost, používají Builder API jako součást celkové struktury navržené k poskytování soukromí transakcí určitým stranám, jako jsou obchodníci, kteří se snaží vyhnout útokům typu frontrunning/sandwiching. Toho je dosaženo poskytnutím soukromého komunikačního kanálu mezi uživateli a tvůrci bloků. Na rozdíl od dříve popsaných mempoolů s řízeným přístupem je tento přístup prospěšný z následujících důvodů:

1. Existence více tvůrců na trhu činí cenzuru nepraktickou, což je přínosem pro uživatele. Naproti tomu existence centralizovaných a na důvěře založených dark poolů by soustředila moc do rukou několika tvůrců bloků a zvýšila by možnost cenzury.

2. Software Builder API je open-source, což umožňuje komukoli nabízet služby tvůrce bloků. To znamená, že uživatelé nejsou nuceni používat žádného konkrétního tvůrce bloků, a zlepšuje to neutralitu a bezoprávněnost Etherea. Navíc obchodníci hledající MEV nebudou neúmyslně přispívat k centralizaci používáním soukromých transakčních kanálů.

## Související zdroje {#related-resources}

- [Dokumentace Flashbots](https://docs.flashbots.net/)
- [GitHub Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) – _Sledovač se statistikami v reálném čase pro relé a tvůrce bloků MEV-Boost_

## Další čtení {#further-reading}

- [Co je Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV a já](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum je temný les](https://www.paradigm.xyz/writing/ethereum-is-a-dark-forest)
- [Útěk z temného lesa](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning krize MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Vlákna o MEV od @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Architektura Flashbots připravená na Merge](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Co je MEV-Boost](https://www.alchemy.com/overviews/mev-boost)
- [Proč provozovat mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Stopařův průvodce po Ethereu](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
