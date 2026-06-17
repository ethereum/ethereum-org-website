---
title: Mosty
description: "Přehled přemostění pro vývojáře"
lang: cs
---

S rozvojem blockchainů vrstvy 1 (l1) a řešení [škálování](/developers/docs/scaling/) vrstvy 2 (l2), spolu se stále rostoucím počtem decentralizovaných aplikací (dapp), které se stávají meziřetězcovými, se potřeba komunikace a pohybu aktiv napříč řetězci stala nezbytnou součástí síťové infrastruktury. K tomu, aby to bylo možné, existují různé typy mostů.

## Potřeba mostů {#need-for-bridges}

Mosty existují za účelem propojení blockchainových sítí. Umožňují konektivitu a interoperabilitu mezi blockchainy.

Blockchainy existují v izolovaných prostředích, což znamená, že neexistuje způsob, jak by blockchainy mohly přirozeně obchodovat a komunikovat s jinými blockchainy. V důsledku toho, i když by v rámci ekosystému mohla probíhat významná aktivita a inovace, je omezena nedostatkem konektivity a interoperability s jinými ekosystémy.

Mosty nabízejí způsob, jak se mohou izolovaná blockchainová prostředí navzájem propojit. Vytvářejí přepravní trasu mezi blockchainy, kde lze z jednoho řetězce do druhého převádět tokeny, zprávy, libovolná data a dokonce i volání [chytrých kontraktů](/developers/docs/smart-contracts/).

## Výhody mostů {#benefits-of-bridges}

Jednoduše řečeno, mosty odemykají řadu případů užití tím, že umožňují blockchainovým sítím vyměňovat si data a přesouvat mezi sebou aktiva.

Blockchainy mají jedinečné silné a slabé stránky a přístupy k budování aplikací (jako je rychlost, propustnost, nákladnost atd.). Mosty pomáhají rozvoji celkového krypto ekosystému tím, že umožňují blockchainům vzájemně využívat své inovace.

Vývojářům mosty umožňují následující:

- převod jakýchkoli dat, informací a aktiv napříč řetězci.
- odemknutí nových funkcí a případů užití pro protokoly, protože mosty rozšiřují designový prostor pro to, co mohou protokoly nabídnout. Například protokol pro výnosové farmaření původně nasazený na [Ethereum](/) Mainnetu může nabízet fondy likvidity napříč všemi řetězci kompatibilními s EVM.
- příležitost využít silné stránky různých blockchainů. Vývojáři mohou například těžit z nižších poplatků, které nabízejí různá řešení vrstvy 2 (l2), nasazením svých dapp napříč rollupy a postranními řetězci (sidechains), a uživatelé mezi nimi mohou přemosťovat.
- spolupráci mezi vývojáři z různých blockchainových ekosystémů na budování nových produktů.
- přilákání uživatelů a komunit z různých ekosystémů do jejich dapp.

## Jak mosty fungují? {#how-do-bridges-work}

Ačkoli existuje mnoho [typů návrhů mostů](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), vynikají tři způsoby, jak usnadnit meziřetězcový převod aktiv:

- **Uzamknout a razit (Lock and mint) –** Uzamkne aktiva ve zdrojovém řetězci a razí aktiva v cílovém řetězci.
- **Spálit a razit (Burn and mint) –** Spálí aktiva ve zdrojovém řetězci a razí aktiva v cílovém řetězci.
- **Atomické swapy (Atomic swaps) –** Swapne aktiva ve zdrojovém řetězci za aktiva v cílovém řetězci s jinou stranou.

## Typy mostů {#bridge-types}

Mosty lze obvykle zařadit do jedné z následujících kategorií:

- **Nativní mosty –** Tyto mosty jsou obvykle postaveny za účelem nastartování likvidity na konkrétním blockchainu, což uživatelům usnadňuje přesun prostředků do ekosystému. Například [Arbitrum Bridge](https://bridge.arbitrum.io/) je postaven tak, aby uživatelům usnadnil přemostění z Ethereum Mainnetu na Arbitrum. Mezi další takové mosty patří Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge) atd.
- **Mosty založené na validátorech nebo orákulech –** Tyto mosty spoléhají na externí sadu validátorů nebo orákula k ověření meziřetězcových převodů. Příklady: Multichain a Across.
- **Mosty pro obecné předávání zpráv –** Tyto mosty mohou převádět aktiva spolu se zprávami a libovolnými daty napříč řetězci. Příklady: Axelar, LayerZero a Nomad.
- **Sítě likvidity –** Tyto mosty se primárně zaměřují na převod aktiv z jednoho řetězce do druhého prostřednictvím atomických swapů. Obecně nepodporují meziřetězcové předávání zpráv. Příklady: Connext a Hop.

## Kompromisy ke zvážení {#trade-offs}

U mostů neexistují žádná dokonalá řešení. Spíše existují pouze kompromisy učiněné za účelem splnění účelu. Vývojáři a uživatelé mohou hodnotit mosty na základě následujících faktorů:

- **Bezpečnost –** Kdo ověřuje systém? Mosty zabezpečené externími validátory jsou obvykle méně bezpečné než mosty, které jsou lokálně nebo nativně zabezpečeny validátory blockchainu.
- **Pohodlí –** Jak dlouho trvá dokončení transakce a kolik transakcí musel uživatel podepsat? Jak dlouho trvá vývojáři integrace mostu a jak složitý je tento proces?
- **Konektivita –** Jaké jsou různé cílové řetězce, které může most propojit (tj. rollupy, postranní řetězce, další blockchainy vrstvy 1 atd.), a jak těžké je integrovat nový blockchain?
- **Schopnost předávat složitější data –** Může most umožnit převod zpráv a složitějších libovolných dat napříč řetězci, nebo podporuje pouze meziřetězcové převody aktiv?
- **Nákladová efektivita –** Kolik stojí převod aktiv napříč řetězci přes most? Mosty obvykle účtují fixní nebo variabilní poplatek v závislosti na nákladech na gas a likviditě konkrétních tras. Je také důležité vyhodnotit nákladovou efektivitu mostu na základě kapitálu potřebného k zajištění jeho bezpečnosti.

Na vysoké úrovni lze mosty rozdělit na důvěryhodné (trusted) a nevyžadující důvěru (trustless).

- **Důvěryhodné (Trusted) –** Důvěryhodné mosty jsou externě ověřovány. K odesílání dat napříč řetězci používají externí sadu ověřovatelů (federace s multi-sig, systémy pro vícestranné výpočty, síť orákul). V důsledku toho mohou nabídnout skvělou konektivitu a umožnit plně zobecněné předávání zpráv napříč řetězci. Mají také tendenci dosahovat dobrých výsledků v rychlosti a nákladové efektivitě. To je na úkor bezpečnosti, protože uživatelé se musí spoléhat na bezpečnost mostu.
- **Nevyžadující důvěru (Trustless) –** Tyto mosty spoléhají na blockchainy, které propojují, a na jejich validátory při převodu zpráv a tokenů. Jsou „nevyžadující důvěru“, protože nepřidávají nové předpoklady důvěry (nad rámec samotných blockchainů). V důsledku toho jsou mosty nevyžadující důvěru považovány za bezpečnější než důvěryhodné mosty.

Abychom mohli hodnotit mosty nevyžadující důvěru na základě dalších faktorů, musíme je rozdělit na mosty pro obecné předávání zpráv a sítě likvidity.

- **Mosty pro obecné předávání zpráv –** Tyto mosty vynikají bezpečností a schopností převádět složitější data napříč řetězci. Obvykle jsou také dobré z hlediska nákladové efektivity. Tyto silné stránky jsou však obecně na úkor konektivity u mostů s lehkými klienty (např. IBC) a nevýhod v rychlosti u optimistických mostů (např. Nomad), které používají důkazy o podvodu (fraud proofs).
- **Sítě likvidity –** Tyto mosty používají k převodu aktiv atomické swapy a jsou lokálně ověřovanými systémy (tj. k ověřování transakcí používají validátory podkladových blockchainů). V důsledku toho vynikají bezpečností a rychlostí. Navíc jsou považovány za poměrně nákladově efektivní a nabízejí dobrou konektivitu. Hlavním kompromisem je však jejich neschopnost předávat složitější data – protože nepodporují meziřetězcové předávání zpráv.

## Rizika spojená s mosty {#risk-with-bridges}

Mosty mají na svědomí tři [největší hacky v decentralizovaných financích (DeFi)](https://rekt.news/leaderboard/) a jsou stále v raných fázích vývoje. Použití jakéhokoli mostu s sebou nese následující rizika:

- **Riziko chytrého kontraktu –** Ačkoli mnoho mostů úspěšně prošlo audity, stačí jedna chyba v chytrém kontraktu, aby byla aktiva vystavena hackům (např. [Wormhole Bridge na Solaně](https://rekt.news/wormhole-rekt/)).
- **Systémová finanční rizika** – Mnoho mostů používá zabalená (wrapped) aktiva k ražení kanonických verzí původního aktiva v novém řetězci. To vystavuje ekosystém systémovému riziku, jak jsme viděli při zneužití zabalených verzí tokenů.
- **Riziko protistrany –** Některé mosty využívají důvěryhodný design, který vyžaduje, aby se uživatelé spoléhali na předpoklad, že se validátoři nedomluví na krádeži uživatelských prostředků. Nutnost uživatelů důvěřovat těmto aktérům třetích stran je vystavuje rizikům, jako jsou rug pully, cenzura a další škodlivé aktivity.
- **Otevřené problémy –** Vzhledem k tomu, že mosty jsou v počátečních fázích vývoje, existuje mnoho nezodpovězených otázek týkajících se toho, jak budou mosty fungovat v různých tržních podmínkách, jako jsou doby přetížení sítě a během nepředvídaných událostí, jako jsou útoky na úrovni sítě nebo vrácení stavu (state rollbacks). Tato nejistota představuje určitá rizika, jejichž míra je stále neznámá.

## Jak mohou dapp využívat mosty? {#how-can-dapps-use-bridges}

Zde je několik praktických aplikací, které mohou vývojáři zvážit ohledně mostů a převedení své dapp do meziřetězcového prostředí:

### Integrace mostů {#integrating-bridges}

Pro vývojáře existuje mnoho způsobů, jak přidat podporu pro mosty:

1. **Vybudování vlastního mostu –** Vybudovat bezpečný a spolehlivý most není snadné, zvláště pokud se vydáte cestou s minimalizovanou důvěrou. Navíc to vyžaduje roky zkušeností a technických odborných znalostí souvisejících se studiemi škálovatelnosti a interoperability. Kromě toho by to vyžadovalo aktivní tým k údržbě mostu a přilákání dostatečné likvidity, aby to bylo proveditelné.

2. **Zobrazení více možností mostů uživatelům –** Mnoho [dapp](/developers/docs/dapps/) vyžaduje, aby uživatelé měli jejich nativní token pro interakci s nimi. Aby uživatelům umožnili přístup k jejich tokenům, nabízejí na svých webových stránkách různé možnosti mostů. Tato metoda je však rychlým řešením problému, protože odvádí uživatele od rozhraní dapp a stále vyžaduje, aby interagovali s jinými dapp a mosty. Jedná se o těžkopádný onboarding s větším prostorem pro chyby.

3. **Integrace mostu –** Toto řešení nevyžaduje, aby dapp posílala uživatele na externí rozhraní mostů a DEX (decentralizovaných burz). Umožňuje dapp zlepšit uživatelský onboarding. Tento přístup má však svá omezení:

   - Hodnocení a údržba mostů jsou obtížné a časově náročné.
   - Výběr jednoho mostu vytváří jediný bod selhání a závislost.
   - Dapp je omezena schopnostmi mostu.
   - Samotné mosty nemusí stačit. Dapp mohou potřebovat DEXy, aby nabídly více funkcí, jako jsou meziřetězcové swapy.

4. **Integrace více mostů –** Toto řešení řeší mnoho problémů spojených s integrací jednoho mostu. Má však také svá omezení, protože integrace více mostů je náročná na zdroje a vytváří technickou a komunikační režii pro vývojáře – nejvzácnější zdroj v kryptu.

5. **Integrace agregátoru mostů –** Další možností pro dapp je integrace řešení agregace mostů, které jim poskytuje přístup k více mostům. Agregátory mostů dědí silné stránky všech mostů, a proto nejsou omezeny schopnostmi žádného jednotlivého mostu. Zejména agregátory mostů obvykle udržují integrace mostů, což dapp ušetří starosti s udržováním přehledu o technických a provozních aspektech integrace mostu.

Přesto mají agregátory mostů také svá omezení. Například, i když mohou nabídnout více možností mostů, na trhu je obvykle k dispozici mnohem více mostů než ty, které jsou nabízeny na platformě agregátoru. Navíc, stejně jako mosty, jsou i agregátory mostů vystaveny rizikům chytrých kontraktů a technologií (více chytrých kontraktů = více rizik).

Pokud se dapp vydá cestou integrace mostu nebo agregátoru, existují různé možnosti na základě toho, jak hluboká má integrace být. Například, pokud se jedná pouze o front-end integraci pro zlepšení uživatelského onboardingu, dapp by integrovala widget. Pokud má však integrace prozkoumat hlubší meziřetězcové strategie, jako je staking, výnosové farmaření atd., dapp integruje SDK nebo API.

### Nasazení dapp na více řetězcích {#deploying-a-dapp-on-multiple-chains}

K nasazení dapp na více řetězcích mohou vývojáři použít vývojové platformy jako [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) atd. Tyto platformy obvykle přicházejí s komponovatelnými pluginy, které mohou dapp umožnit přechod do meziřetězcového prostředí. Vývojáři mohou například použít deterministické proxy pro nasazení nabízené [pluginem hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Příklady: {#examples}

- [Jak budovat meziřetězcové dapp](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Budování meziřetězcového tržiště NFT](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Budování meziřetězcových NFT dapp](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Sledování aktivity kontraktů napříč řetězci {#monitoring-contract-activity-across-chains}

Ke sledování aktivity kontraktů napříč řetězci mohou vývojáři používat podgrafy (subgraphs) a vývojářské platformy jako Tenderly k pozorování chytrých kontraktů v reálném čase. Takové platformy mají také nástroje, které nabízejí větší funkčnost sledování dat pro meziřetězcové aktivity, jako je kontrola [událostí emitovaných kontrakty](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) atd.

#### Nástroje {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Další čtení {#further-reading}

- [Blockchainové mosty](/bridges/) – ethereum.org
- [Rámec rizik mostů L2BEAT](https://l2beat.com/bridges/summary)
- [Blockchainové mosty: Budování sítí kryptosítí](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8. září 2021 – Dmitriy Berenzon
- [Trilema interoperability](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1. října 2021 – Arjun Bhuptani
- [Klastry: Jak důvěryhodné mosty a mosty s minimalizovanou důvěrou utvářejí prostředí více řetězců](https://blog.celestia.org/clusters/) - 4. října 2021 – Mustafa Al-Bassam
- [LI.FI: U mostů je důvěra spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28. dubna 2022 – Arjun Chand
- [Stav řešení interoperability rollupů](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20. června 2024 – Alex Hook
- [Využití sdílené bezpečnosti pro bezpečnou meziřetězcovou interoperabilitu: Lagrange State Committees a další](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12. června 2024 – Emmanuel Awosika

Navíc zde je několik zasvěcených prezentací od [Jamese Prestwiche](https://twitter.com/_prestwich), které mohou pomoci k hlubšímu pochopení mostů:

- [Budování mostů, ne opevněných zahrad](https://youtu.be/ZQJWMiX4hT0)
- [Rozebírání mostů](https://youtu.be/b0mC-ZqN8Oo)
- [Proč mosty hoří](https://youtu.be/c7cm2kd20j8)