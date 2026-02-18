---
title: "Maximální extrahovatelná hodnota (MEV)"
description: "Úvod do maximální extrahovatelné hodnoty (MEV)"
lang: cs
---

Maximální extrahovatelná hodnota (MEV) označuje maximální hodnotu, kterou lze získat z produkce bloku nad rámec standardní odměny za blok a poplatků za palivo tím, že se do bloku zahrnou, vyloučí se nebo se změní pořadí transakcí.

## Maximální vytěžitelná hodnota {#maximal-extractable-value}

Maximální vytěžitelná hodnota byla poprvé použita v kontextu [proof-of-work](/developers/docs/consensus-mechanisms/pow/) a původně se označovala jako „miner extractable value“ (hodnota vytěžitelná těžařem). To proto, že v systému proof of work ovládají zahrnutí, vyloučení a pořadí transakcí těžaři. Po přechodu na proof-of-stake prostřednictvím [The Merge](/roadmap/merge) však za tyto role převzali odpovědnost validátoři a těžba již není součástí protokolu Ethereum. Metody extrakce hodnoty však stále existují, a proto se nyní používá termín "maximální extrahovatelná hodnota".

## Předpoklady {#prerequisites}

Ujistěte se, že jste obeznámeni s [transakcemi](/developers/docs/transactions/), [bloky](/developers/docs/blocks/), [proof-of-stake](/developers/docs/consensus-mechanisms/pos) a [palivem](/developers/docs/gas/). Znalost [dapps](/apps/) a [DeFi](/defi/) je také užitečná.

## Extrakce MEV {#mev-extraction}

MEV teoreticky plně připadne validátorům, protože jsou jedinou stranou, která může šanci na ziskovou MEV zrealizovat. V praxi však velkou část MEV extrahují nezávislí účastníci sítě, označovaní jako "hledači" (searchers). Hledači aplikují na blockchainová data složité algoritmy za účelem detekce ziskových MEV příležitostí a spouští robotické programy, které automaticky posílají tyto ziskové transakce do sítě.

Validátoři přesto získávají část hodnoty MEV, protože hledači jsou ochotni platit vysoké poplatky za palivo (které jdou validátorům) výměnou za vyšší pravděpodobnost zahrnutí jejich ziskových transakcí do bloku. Předpokládá se, že hledači jsou ekonomicky racionální, a poplatek za palivo, který jsou ochotni zaplatit, bude činit až 100 % jejich MEV (protože pokud by byl poplatek vyšší, hledač by prodělával).

V případě vysoce konkurenčních příležitostí k MEV, jako je [arbitráž na DEX](#mev-examples-dex-arbitrage), mohou hledači validátorům zaplatit 90 % nebo více ze svých celkových příjmů z MEV na poplatcích za palivo, protože mnoho lidí chce provést stejný ziskový arbitrážní obchod. Jediným způsobem, jak zajistit, aby jejich arbitrážní transakce proběhla, je zaslat transakci s nejvyšším palivovým poplatkem.

### Gas golfing {#mev-extraction-gas-golfing}

Tato dynamika způsobila, že vynikat v "gas golfu" — programování transakcí tak, aby spotřebovávaly co nejméně paliva — je konkurenční výhodou, protože to umožňuje hledačům nastavit vyšší cenu za palivo a udržet přitom své celkové palivové poplatky na stejné úrovni (protože poplatky za palivo = cena paliva \* spotřebované palivo).

Některé známé techniky „gas golfing“ zahrnují: používání adres, které začínají dlouhým řetězcem nul (např. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), protože zabírají méně místa (a tedy i paliva) k uložení; a ponechání malých zůstatků tokenů [ERC-20](/developers/docs/standards/tokens/erc-20/) ve smlouvách, protože inicializace úložného slotu (v případě, že je zůstatek 0) stojí více paliva než aktualizace úložného slotu. Hledání dalších technik ke snížení spotřeby paliva je mezi hledači aktivní oblastí výzkumu.

### Generalizovaní frontrunneři {#mev-extraction-generalized-frontrunners}

Někteří hledači provozují generalizované frontrunnery místo programování složitých algoritmů pro detekci ziskových MEV příležitostí. Generalizovaní frontrunneři jsou robotické programy, které sledují mempool a detekují ziskové transakce. Frontrunner zkopíruje kód potenciálně ziskové transakce, nahradí adresy vlastní adresou a lokálně spustí transakci, aby se přesvědčil, že frontrunner na upravené transakci vydělá. Pokud je transakce skutečně zisková, frontrunner odešle upravenou transakci s nahrazenou adresou a nabídne vyšší cenu za palivo, "předběhne" původní transakci a získá MEV původního hledače.

### Flashbots {#mev-extraction-flashbots}

Flashbots je nezávislý projekt, který rozšiřuje exekuční klienty o službu, která hledačům umožňuje předkládat MEV transakce validátorům, aniž by je odhalovali veřejnému mempoolu. Tímto způsobem se zabraňuje tomu, aby transakce předběhli generalizovaní frontrunneři.

## Příklady MEV {#mev-examples}

MEV se na blockchainu objevuje v několika podobách.

### Arbitráž na DEX {#mev-examples-dex-arbitrage}

Arbitráž na [decentralizované burze](/glossary/#dex) (DEX) je nejjednodušší a nejznámější příležitostí k získání MEV. Výsledkem je, že je také nejkonkurenčnější.

Funguje to takto: Pokud dva DEXy nabízejí token za dvě různé ceny, někdo může v jediné atomické transakci koupit token na DEXu s nižší cenou a prodat ho na DEXu s vyšší cenou. Díky mechanice blockchainu je tato arbitráž bezriziková.

[Zde je příklad](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) ziskové arbitrážní transakce, při které hledač proměnil 1 000 ETH na 1 045 ETH tím, že využil rozdílných cen páru ETH/DAI na Uniswap vs. Sushiswap.

### Likvidace {#mev-examples-liquidations}

Likvidace v protokolech poskytujících půjčky představují další známou příležitost pro MEV.

Půjčovací protokoly jako Maker a Aave vyžadují, aby uživatelé vložili nějaký kolaterál (např. ETH). Tento vložený kolaterál se pak půjčuje dalším uživatelům.

Uživatelé si pak mohou půjčovat aktiva a tokeny od ostatních v závislosti na tom, co potřebují (např. si můžete půjčit MKR, pokud chcete hlasovat v návrhu správy MakerDAO), a to až do určitého procenta svého vloženého kolaterálu. Například pokud je maximální výše půjčky 30 %, může si uživatel, který vloží do protokolu 100 DAI, půjčit až 30 DAI v hodnotě jiného aktiva. Přesné procento půjčovací síly určuje protokol.

Jak se hodnota kolaterálu dlužníka mění, mění se i jeho půjčovací síla. Pokud v důsledku výkyvů na trhu hodnota vypůjčených aktiv přesáhne řekněme 30 % hodnoty jejich kolaterálu (přesné procento opět určuje protokol), protokol obvykle komukoli umožní kolaterál zlikvidovat a okamžitě vyplatit věřitele (podobně fungují i [margin calls](https://www.investopedia.com/terms/m/margincall.asp) v tradičním finančnictví). Pokud je kolaterál zlikvidován, musí dlužník obvykle zaplatit vysoký poplatek za likvidaci, z čehož jde část likvidátorovi – a právě zde se objevuje příležitost pro MEV.

Hledači soutěží v co nejrychlejším zpracování blockchainových dat, aby zjistili, které dlužníky je možné zlikvidovat, a aby jako první podali likvidační transakci a získali tak poplatek za likvidaci.

### Sendvičové obchodování {#mev-examples-sandwich-trading}

Jedná se o další běžnou metodu extrakce MEV.

Chcete-li hledač provést sendvičový obchod, bude v mempoolu hledat velké DEX obchody. Například, pokud chce někdo koupit 10 000 UNI za DAI na Uniswapu. Takový obchod bude mít významný vliv na pár UNI/DAI, což může výrazně zvýšit cenu UNI vůči DAI.

Hledač může vypočítat přibližný cenový dopad tohoto velkého obchodu na pár UNI/DAI a provést optimální nákupní příkaz okamžitě _před_ velkým obchodem, levně tak nakoupit UNI, a poté provést prodejní příkaz okamžitě _po_ velkém obchodu a prodat ho za vyšší cenu způsobenou velkým příkazem.

Sendvičové obchodování je však rizikovější, protože není atomické (na rozdíl od výše popsané arbitráže na DEX) a je náchylné k [útoku salmonelou](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

MEV v prostoru NFT je vznikajícím fenoménem a nemusí být nutně zisková.

Jelikož se však NFT transakce odehrávají na stejném blockchainu jako všechny ostatní transakce na Ethereu, mohou hledači používat podobné techniky jako ty, které se používají u tradičních příležitostí MEV, i na trhu NFT.

Například pokud je nějaký populární NFT drop a hledač chce určité NFT nebo sadu NFT, může naprogramovat transakci tak, aby byl první v řadě na nákup NFT, nebo může koupit celou sadu NFT v jedné transakci. Nebo pokud je NFT [omylem zalistováno za nízkou cenu](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), může hledač předběhnout ostatní kupující a levně ho získat.

Jeden významný příklad NFT MEV nastal, když hledač utratil 7 milionů dolarů za [nákup](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) všech Cryptopunků za nejnižší možnou cenu. Jeden blockchainový výzkumník [vysvětlil na Twitteru](https://twitter.com/IvanBogatyy/status/1422232184493121538), jak kupující spolupracoval s poskytovatelem MEV, aby svůj nákup utajil.

### Dlouhý chvost {#mev-examples-long-tail}

Arbitráž na DEXech, likvidace a sendvičové obchodování jsou všechny velmi známé příležitosti pro MEV a pro nové hledače jsou pravděpodobně neziskové. Existuje však dlouhý chvost méně známých příležitostí pro MEV (NFT MEV je pravděpodobně jednou z takových příležitostí).

Začínající hledači, mohou mít větší úspěch, pokud budou hledat MEV v tomto dlouhém chvostu. [Pracovní nástěnka MEV](https://github.com/flashbots/mev-job-board) od Flashbotů uvádí některé nově vznikající příležitosti.

## Účinky MEV {#effects-of-mev}

MEV není vždy špatná - pro Ethereum má jak pozitivní, tak negativní důsledky.

### Pozitiva {#effects-of-mev-the-good}

Mnohé DeFi projekty se za účelem zajištění užitečnosti a stability svých protokolů spoléhá na ekonomicky racionální aktéry. Arbitráž na DEXech například zajišťuje, že uživatelé mohou své tokeny směnit za nejlepší a nejpřesnější ceny, a protokoly poskytující půjčky se spoléhají na rychlé likvidace, když dlužníci klesnou pod kolateralizační poměry, aby zajistili, že věřitelé budou vyplaceni.

Bez racionálních hledačů, kteří vyhledávají a opravují ekonomické neefektivity a využívají ekonomické pobídky protokolů, by DeFi protokoly a dappky obecně nemusely být tak robustní, jak dnes jsou.

### Negativa {#effects-of-mev-the-bad}

Některé formy MEV, jako je sendvičové obchodování, vedou na aplikační vrstvě k jednoznačně horší uživatelské zkušenosti. Uživatelé, kteří jsou „sendvičováni“, čelí zvýšenému riziku pohybu ceny a horší exekuci svých obchodů.

Na síťové vrstvě vedou generalizovaní frontrunneři a aukce palivových cen, kterých se často účastní (když dva nebo více frontrunnerů soutěží o zařazení své transakce do dalšího bloku postupným zvyšováním ceny za palivo u svých transakcí), k přetížení sítě a vysokým poplatkům pro všechny ostatní, kteří se snaží provádět běžné transakce.

Kromě toho, co se děje _uvnitř_ bloků, může mít MEV škodlivé účinky i _mezi_ bloky. Pokud MEV dostupná v bloku výrazně převyšuje standardní odměnu za blok, mohou být validátoři motivováni k reorganizaci bloků a uzmutí MEV pro sebe, což způsobí reorganizaci blockchainu a destabilizaci konsensu.

Tato možnost reorganizace blockchainu byla [již dříve prozkoumána na blockchainu Bitcoinu](https://dl.acm.org/doi/10.1145/2976749.2978408). Jak se odměna za blok na Bitcoinu snižuje a transakční poplatky tvoří stále větší část odměny, vznikají situace, kdy se pro těžaře stává ekonomicky racionálním vzdát se odměny za další blok a místo toho znovu vytěžit minulé bloky s vyššími poplatky. S růstem MEV by se stejná situace mohla vyskytnout i na Ethereu, což by ohrozilo integritu blockchainu.

## Stav MEV {#state-of-mev}

Extrakce MEV prudce vzrostla na začátku roku 2021, což vedlo k extrémně vysokým cenám za palivo v prvních měsících tohoto roku. Vznik MEV-relay od Flashbotů snížil účinnost generalizovaných frontrunnerů a aukce cen za palivo přesunul mimo řetězec, čímž snížil ceny za palivo pro běžné uživatele.

I když spousta hledačů stále vydělává na MEV slušné peníze, jakmile se tyto příležitosti stanou známějšími a stále více hledačů bude soutěžit o stejnou příležitost, validátoři začnou získávat stále větší podíl z celkových příjmů z MEV (protože stejné palivové aukce, jak byly původně popsány výše, se stále vyskytují i ve Flashbotech, i když soukromě, a validátoři tak získávají příjmy z transakčních poplatků). MEV není omezeno pouze na Ethereum, a jakmile budou příležitosti na Ethereu více konkurenční, hledači se přesunou na alternativní blockchainy, jako je Binance Smart Chain, kde existují podobné MEV příležitosti jako na Ethereu, ale s menší konkurencí.

Na druhé straně přechod z proof of work na proof of stake a probíhající snahy o škálování Etherea pomocí rollupů mění MEV způsoby, které jsou zatím nejasné. Zatím není dobře známo, jak to, že jsou garantovaní navrhovatelé bloků známi s mírným předstihem, mění dynamiku extrakce MEV v porovnání s pravděpodobnostním modelem v proof-of-work, ani jak to bude narušeno, až bude implementována [volba jednoho tajného vůdce](https://ethresear.ch/t/secret-non-single-leader-election/11789) a [technologie distribuovaných validátorů](/staking/dvt/). Podobně není jasné, jaké MEV příležitosti budou existovat, když většina uživatelské aktivity přejde mimo Ethereum a na jeho rollupy druhé vrstvy a shardy.

## MEV v Ethereu s Proof-of-Stake (PoS) {#mev-in-ethereum-proof-of-stake}

Jak jsme vysvětlili výše, MEV má negativní dopady na celkovou uživatelskou zkušenost a bezpečnost na úrovni konsensu. Přechod Etherea na konsensus proof of stake (tzv. "Sloučení") však potenciálně přináší nová rizika spojená s MEV:

### Centralizace validátorů {#validator-centralization}

Na Ethereu po sloučení validátoři (kteří složili bezpečnostní zálohu ve výši 32 ETH) dosahují konsensu o platnosti bloků přidávaných do Beacon Chainu. Jelikož 32 ETH může být pro mnohé mimo dosah, může být schůdnější variantou [připojení se ke staking poolu](/staking/pools/). Nicméně ideální je zdravé rozložení [sólových stakerů](/staking/solo/), protože to zmírňuje centralizaci validátorů a zlepšuje bezpečnost Etherea.

Extrakce MEV se však předpokládá jako faktor, který může urychlit centralizaci validátorů. Je to částečně proto, že od [The Merge](/roadmap/merge/) validátoři [za navrhování bloků vydělávají méně](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) než dříve těžaři a extrakce MEV výrazně [ovlivnila výdělky validátorů](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb).

Větší stakingové pooly budou mít pravděpodobně více prostředků k investování do potřebných optimalizací pro zachycení příležitostí k MEV. Čím více MEV tyto pooly vytěží, tím více prostředků mají na zlepšení svých schopností extrakce MEV (a na zvýšení celkových příjmů), což v podstatě vytváří [úspory z rozsahu](https://www.investopedia.com/terms/e/economiesofscale.asp#).

S menším objemem prostředků, které mají k dispozici, nebudou nezávislí stakeři schopni využívat příležitostí k MEV v takovém rozsahu jako pooly. To může zvýšit tlak na nezávislé validátory, aby se připojili k mocným stakingovým poolům a zvýšili své příjmy, což snižuje míru decentralizace Etherea.

### Mempooly s oprávněním {#permissioned-mempools}

V reakci na sendvičové útoky a frontrunning mohou obchodníci za účelem zajištění soukromí transakcí začít uzavírat offchain dohody s validátory. Místo toho, aby posílali potenciální MEV transakci do veřejného mempoolu, pošlou ji přímo validátorovi, který ji zahrne do bloku a o zisk se s obchodníkem rozdělí.

„Temné pooly“ jsou větší verzí tohoto uspořádání a fungují jako mempooly, pro vstup do nich dostanou povolení uživatelé, kteří jsou ochotni platit určité poplatky. Tento trend by mohl oslabit charakter Etherea založený na přístupu bez nutnosti povolení a bez nutnosti důvěry a potenciálně transformovat blockchain do mechanismu „plať, pak hraj“, který zvýhodňuje uchazeče s nejvyšším příhozem.

Mempooly s nutností povolení by také zrychlily centralizační rizika popsaná v předchozí sekci. Velké pooly provozující více validátorů budou pravděpodobně mít prospěch z nabídky soukromí během transakcí obchodníkům a dalším uživatelům, čímž zvýší své příjmy z MEV.

Řešení těchto problémů spojených s MEV na Ethereu po sloučení je klíčovou oblastí výzkumu. K dnešnímu dni jsou dvě navrhovaná řešení ke snížení negativního dopadu MEV na decentralizaci a bezpečnost Etherea po The Merge [**oddělení navrhovatele a stavitele bloků (PBS)**](/roadmap/pbs/) a [**Builder API**](https://github.com/ethereum/builder-specs).

### Oddělení navrhovatele a stavitele bloků {#proposer-builder-separation}

V rámci proof of work i proof of stake navrhuje síťový uzel, který vytvoří blok, jeho přidání do řetězce ostatním uzlům, které se účastní konsenzu. Nový blok se stane součástí kanonického řetězce poté, co na něm staví další těžař (v PoW) nebo obdrží atestace od většiny validátorů (v PoS).

Kombinace rolí tvůrce bloku a navrhovatele bloku je to, co přináší většinu problémů souvisejících s MEV, jak bylo popsáno výše. Například konsensuální uzly jsou motivovány spouštět reorganizace řetězce při [útocích typu time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack), aby maximalizovaly výdělky z MEV.

[Oddělení navrhovatele a stavitele bloků](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) je navrženo tak, aby zmírnilo dopad MEV, zejména na konsensuální vrstvě. Hlavním rysem PBS je oddělení rolí producenta bloku a navrhovatele bloku. Validátoři jsou stále zodpovědní za navrhování a hlasování o blocích, ale nová třída specializovaných entit, nazývaných **stavitelé bloků**, má za úkol seřazovat transakce a stavět bloky.

V rámci PBS stavitel bloku vytvoří balík transakcí a podá nabídku na jeho zahrnutí do bloku Beacon Chain (jako „execution payload“). Validátor vybraný k navržení dalšího bloku poté porovná různé nabídky a vybere balíček s nejvyšším poplatkem. PBS v podstatě vytváří aukční trh, kde stavitelé jednají s validátory, kteří prodávají prostor v bloku.

Současné návrhy PBS používají [schéma commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), ve kterém stavitelé bloků publikují pouze kryptografický závazek k obsahu bloku (hlavička bloku) spolu se svými nabídkami. Po přijetí vítězné nabídky vytvoří navrhovatel podepsaný návrh bloku, který obsahuje hlavičku bloku. Očekává se, že stavitel bloku zveřejní celé tělo bloku poté, co uvidí podepsaný návrh bloku, a před jeho finalizací musí také obdržet dostatek [atestací](/glossary/#attestation) od validátorů.

#### Jak oddělení navrhovatele a stavitele bloků zmírňuje dopad MEV? {#how-does-pbs-curb-mev-impact}

Oddělení navrhovatele a stavitele v rámci protokolu snižuje vliv MEV na konsenzus tím, že validátorům odebírá možnost extrakce MEV. Místo toho budou příležitosti k MEV zachycovat stavitelé bloků, kteří provozují specializovaný hardware.

To však neznamená, že by validátoři byli zcela vyloučeni z příjmů souvisejících s MEV, protože stavitelé bloků musí nabízet vysoké částky, aby validátoři jejich bloky byly přijali. Nicméně díky tomu, že validátoři se už nebudou přímo zaměřovat na optimalizaci příjmů z MEV, se snižuje hrozba rychlých útoků.

Oddělení navrhovatele a stavitele také snižuje rizika centralizace spojená s MEV. Například použití schématu přispěj-odhal odstraňuje potřebu důvěry stavitelů, že validátoři neukradnou příležitost k MEV nebo ji nezveřejní ostatním stavitelům. To snižuje bariéru pro sólové stakery, aby mohli těžit z MEV, jinak by stavitelé bloků měli tendenci upřednostňovat velké pooly s offchain reputací a uzavírat s nimi offchain dohody.

Podobně validátoři nemusí důvěřovat stavitelům bloků a mohou se spolehnout, že nezatajili tělo bloku nebo nezveřejnili neplatné bloky, protože platba je bezpodmínečná. Poplatek pro validátora je zpracován i v případě, že navržený blok není dostupný nebo je jinými validátory prohlášen za neplatný. V tomto případě je blok jednoduše vyřazen, což způsobí, že stavitel bloku přijde o všechny transakční poplatky a příjmy z MEV.

### Builder API {#builder-api}

Zatímco oddělení navrhovatelů a stavitelů bloků slibuje snížení dopadů extrakce MEV, jeho implementace vyžaduje změny v konsensuálním protokolu. Konkrétně by bylo třeba aktualizovat pravidlo pro [výběr větve](/developers/docs/consensus-mechanisms/pos/#fork-choice) na Beacon Chainu. [Builder API](https://github.com/ethereum/builder-specs) je dočasné řešení, jehož cílem je poskytnout funkční implementaci oddělení navrhovatele a stavitele bloků, i když s vyššími předpoklady důvěry.

Builder API je upravená verze [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), kterou používají klienti konsensuální vrstvy k vyžádání datových částí od klientů exekuční vrstvy. Jak je uvedeno ve [specifikaci poctivého validátora](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), validátoři vybraní k navrhování bloků požadují balíček transakcí od připojeného exekučního klienta, který zahrnou do navrhovaného bloku Beacon Chainu.

API stavitele také funguje jako prostředník mezi validátory a klienty exekuční vrstvy; liší se však tím, že validátorům na Beacon Chainu umožňuje získávat bloky od externích subjektů (namísto vytváření bloku lokálně pomocí klienta exekuční vrstvy).

Níže uvádíme přehled, jak API stavitele funguje:

1. API stavitele připojuje validátora k síti stavitelů bloků, kteří provozují klienty exekuční vrstvy. Stejně jako u PBS, stavitelé jsou specializované subjekty, které investují do náročného budování bloků a k maximalizaci příjmů z MEV a spropitného za prioritní zpracování používají různé strategie.

2. Validátor (provozující klienta konsenzuální vrstvy) žádá exekuční payload spolu s nabídkami od sítě stavitelů. Nabídky od stavitelů obsahují hlavičku exekučního payloadu – kryptografický závazek k obsahu payloadu – a poplatek, který má být uhrazen validátorovi.

3. Validátor projde příchozí nabídky a vybere exekuční payload s nejvyšším poplatkem. Pomocí API stavitele vytvoří validátor "zaslepený" návrh Beacon bloku, který obsahuje pouze jeho podpis a hlavičku exekučního payloadu, a pošle jej staviteli.

4. Od stavitele provozujícího API stavitele se očekává, že po zhlédnutí zaslepeného návrhu bloku odpoví plným exekučním payloadem. To validátorovi umožňuje vytvořit "podepsaný" Beacon blok, který poté rozšíří po celé síti.

5. Od validátora používající API stavitele se stále očekává, že vytvoří blok lokálně, pokud stavitel bloků neodpoví včas, aby nepřišel o odměny za navrhování bloků. Validátor však nemůže vytvořit další blok s použitím nyní odhalených transakcí nebo jiné sady, protože by se jednalo o _ekvivokaci_ (podepsání dvou bloků ve stejném slotu), což je přestupek, za který hrozí slashing.

Příkladem implementace Builder API je [MEV Boost](https://github.com/flashbots/mev-boost), vylepšení [aukčního mechanismu Flashbots](https://docs.flashbots.net/Flashbots-auction/overview) navržené tak, aby omezilo negativní externality MEV na Ethereu. Aukce Flashbots umožňuje validátorům v proof-of-stake zadat práci na vytváření ziskových bloků specializovaným stranám, nazývaným **hledači**.
![Diagram detailně znázorňující tok MEV](./mev.png)

Hledači vyhledávají lukrativní příležitosti k MEV a posílají balíčky transakcí navrhovatelům bloků spolu s [nabídkou v zalepené obálce](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) za zahrnutí do bloku. Validátor provozující mev-geth, větvenou verzi go-ethereum (Geth) klienta, musí pouze vybrat balíček s nejvyšší nabídkou a zahrnout jej jako součást nového bloku. Aby byli navrhovatelé bloků (validátoři) chráněni před spamem a neplatnými transakcemi, procházejí balíčky transakcí před doručením navrhovateli validací přes **přeposílače**.

MEV Boost zachovává stejné fungování původní Flashbots aukce, i když s novými funkcemi navrženými pro přechod Etherea na proof of stake. Hledači stále nacházejí ziskové MEV transakce pro zahrnutí do bloků, ale za agregaci transakcí a balíčků do bloků je zodpovědná nová třída specializovaných stran nazývaných **stavitelé**. Stavitel přijímá nabídky se zapečetěnou cenou od hledačů a provádí optimalizace pro výběr nejziskovějšího pořadí.

Štafeta je stále zodpovědná za validaci balíčků transakcí před jejich předáním navrhovateli. MEV Boost však zavádí **úschovy (escrows)** odpovědné za zajištění [dostupnosti dat](/developers/docs/data-availability/) ukládáním těl bloků zaslaných staviteli a hlaviček bloků zaslaných validátory. Zde se validátor připojený ke štafetě dotazuje na dostupné exekuční payloady a používá algoritmus řazení MEV Boost k výběru payloadové hlavičky s nejvyšší nabídkou a největším MEV spropitným.

#### Jak API stavitele zmírňuje dopady MEV? {#how-does-builder-api-curb-mev-impact}

Hlavním přínosem API stavitele je jeho potenciál demokratizovat přístup k MEV příležitostem. Použití přispěj-odhal schématu eliminuje potřebu důvěry a snižuje vstupní bariéry pro validátory, kteří se chtějí podílet na zisku z MEV. To by mělo snížit tlak na samostatné stakery, aby se zapojili do velkých staking poolů za účelem zvýšení zisků z MEV.

Širší implementace API stavitele podpoří větší konkurenci mezi staviteli bloků, což zvýší odolnost vůči cenzuře. Jak validátoři přezkoumávají nabídky od různých stavitelů, stavitel, který má v úmyslu cenzurovat jednu nebo více uživatelských transakcí, musí nabídnout vyšší cenu než všichni ostatní necenzurující stavitelé, jinak neuspěje. To dramaticky zvyšuje náklady na cenzuru uživatelů a odrazuje od této praxe.

Některé projekty, jako je MEV Boost, používají API stavitele jako součást celkové struktury navržené k zajištění soukromí transakcí určitým stranám, jako jsou obchodníci snažící se vyhnout frontrunningu nebo sendvičovým
útokům. Toho lze docílit zřízením soukromého komunikačního kanálu mezi uživateli a staviteli bloků. Na rozdíl od dříve popsaných mempoolů s nutností povolení je tento přístup prospěšný z následujících důvodů:

1. Přítomnost většího počtu stavitelů na trhu dělá cenzuru nepraktickou, což je výhodné pro uživatele. Naopak existence centralizovaných a na důvěře založených temných poolů by koncentrovala moc v rukou několika stavitelů bloků a zvýšila by možnost cenzury.

2. Software API stavitele je open-source, což umožňuje komukoli nabízet služby stavitelů bloků. To znamená, že uživatelé nejsou nuceni používat žádného konkrétního stavitele a zlepšuje to neutralitu a přístup k Ethereu bez nutnosti povolení. Navíc obchodníci usilující o MEV nebudou nevědomky přispívat k centralizaci používáním soukromých transakčních kanálů.

## Související zdroje {#related-resources}

- [Dokumentace Flashbots](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) – _Sledovač s real-time statistikami pro MEV-Boost relé a stavitele bloků_

## Další čtení {#further-reading}

- [Co je to hodnota vytěžitelná těžařem (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV a já](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum je temný les](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Únik z temného lesa](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning krize MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Vlákna o MEV od @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Architektura Flashbots připravená na The Merge](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Co je MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Proč používat mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Stopařův průvodce po Ethereu](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
