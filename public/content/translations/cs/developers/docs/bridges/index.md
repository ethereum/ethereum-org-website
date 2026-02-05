---
title: "Přemostění"
description: "Přehled přemostění pro vývojáře"
lang: cs
---

S rozmachem L1 blockchainů a L2 [škalovacích](/developers/docs/scaling/) řešení, spolu s rostoucím počtem decentralizovaných aplikací, které fungují napříč různými sítěmi, se potřeba komunikace a přesunu aktiv mezi těmito sítěmi stala nezbytnou součástí síťové infrastruktury. Existuje několik typů přemostění (bridges), které tuto potřebu pomáhají naplnit.

## Potřeba přemostění {#need-for-bridges}

Přemostění existují proto, aby propojily blockchainové sítě. Umožňují propojení a interoperabilitu mezi blockchainy.

Blockchainy fungují v oddělených prostředích, což znamená, že neexistuje přirozený způsob, jak by si blockchainy mohly vyměňovat data a komunikovat mezi sebou. V důsledku toho, i když by v určitém ekosystému mohlo probíhat mnoho aktivity a inovací, je tento potenciál omezen nedostatkem propojení a interoperability s jinými ekosystémy.

Přemostění nabízejí způsob, jak izolovaná blockchainová prostředí propojit. Vytvářejí přepravní cestu mezi blockchainy, kde mohou být tokeny, zprávy, libovolná data a dokonce i volání [chytrých kontraktů](/developers/docs/smart-contracts/) přenášena z jednoho řetězce na druhý.

## Výhody přemostění {#benefits-of-bridges}

Jednoduše řečeno, přemostění nabízí mnoho využití tím, že umožňuje blockchainovým sítím vyměňovat si data a přesouvat aktiva mezi sebou.

Blockchainy mají unikátní silné stránky, slabiny a přístupy k vytváření aplikací (např. rychlost, propustnost, náklady atd.). Přemostění podporuje vývoj celého krypto ekosystému tím, že umožňuje blockchainům využívat inovace ostatních.

Pro vývojáře přináší přemostění následující výhody:

- přenos jakýchkoli dat, informací a aktiv napříč blockchainy.
- nové funkce a využití pro protokoly, protože přemostění rozšiřují designový prostor, který mohou protokoly nabízet. Například protokol pro výnosové farmářství původně nasazený na Ethereum Mainnetu může nabídnout likviditní fondy napříč všemi EVM-kompatibilními řetězci.
- příležitost využít silné stránky různých blockchainů. Například vývojáři mohou těžit z nižších poplatků nabízených různými L2 řešeními tím, že nasadí své dappky napříč rollupy a sidechainy a uživatelé se mezi nimi mohou volně pohybovat.
- spolupráci mezi vývojáři z různých blockchainových ekosystémů na vytváření nových produktů.
- nalákání uživatelů a komunit z různých ekosystémů do jejich dappek.

## Jak přemostění fungují? {#how-do-bridges-work}

I když existuje mnoho [typů designů přemostění](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), tři způsoby, jak usnadnit přesun aktiv mezi řetězci, vynikají:

- **Zamknutí a ražba –** Zamknete aktiva na zdrojovém řetězci a vyrazíte aktiva na cílovém řetězci.
- **Spálení a ražba –** Spálíte aktiva na zdrojovém řetězci a vyrazíte aktiva na cílovém řetězci.
- **Atomické swapy –** Směníte aktiva na zdrojovém řetězci za aktiva na cílovém řetězci s jinou stranou.

## Typy přemostění {#bridge-types}

Přemostění lze obvykle zařadit do jedné z následujících kategorií:

- **Nativní přemostění –** Tato přemostění jsou obvykle vytvořena pro zavedení likvidity na konkrétním blockchainu, což usnadňuje uživatelům přesun prostředků do ekosystému. Například [Arbitrum Bridge](https://bridge.arbitrum.io/) je vytvořen pro snadný přechod uživatelů z Ethereum Mainnetu na Arbitrum. Další taková přemostění zahrnují Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge) atd.
- **Přemostění založená na validátorech nebo orákulech –** Tato přemostění se spoléhají na externí sady validátorů nebo orákulí pro validaci přesunů mezi řetězci. Příklady: Multichain a Across.
- **Generalizovaná přemostění pro přenos zpráv –** Tato přemostění mohou přenášet aktiva spolu se zprávami a libovolnými daty napříč řetězci. Příklady: Axelar, LayerZero a Nomad.
- **Likviditní sítě –** Tato přemostění se primárně zaměřují na přenos aktiv z jednoho řetězce na druhý prostřednictvím atomických swapů. Obecně nepodporují přenos zpráv napříč řetězci. Příklady: Connext a Hop.

## Kompromisy ke zvážení {#trade-offs}

Dokonalá řešení u přemostění nenajdete. Spíše se jedná o kompromisy, které je třeba učinit, aby byl splněn určitý účel. Vývojáři a uživatelé mohou hodnotit přemostění na základě následujících faktorů:

- **Bezpečnost –** Kdo verifikuje systém? Přemostění zabezpečená externími validátory jsou obvykle méně bezpečná než přemostění, která jsou lokálně nebo nativně zabezpečena validátory blockchainu.
- **Pohodlí –** Jak dlouho trvá dokončení transakce a kolik transakcí musel uživatel podepsat? Pro vývojáře: Jak dlouho trvá integrace přemostění a jak složitý je proces?
- **Konektivita –** Jaké jsou různé cílové řetězce, které může přemostění propojit (např. rollupy, sidechainy, jiné blockchainy L1 atd.) a jak obtížné je integrovat nový blockchain?
- **Schopnost přenášet složitější data –** Umožňuje přemostění přenos zpráv a dalších složitějších dat napříč řetězci, nebo podporuje pouze meziřetězcový přesun aktiv?
- **Nákladová efektivita –** Kolik stojí přesun aktiv mezi řetězci pomocí přemostění? Obvykle přemostění účtují pevný nebo proměnný poplatek v závislosti na palivových nákladech a likviditě specifických tras. Je také důležité zhodnotit nákladovou efektivitu přemostění na základě kapitálu potřebného k zajištění jeho bezpečnosti.

Na vyšší úrovni lze přemostění dělit na ta, kterým musíte důvěřovat, a přemostění bez nutnosti důvěry.

- **Ta, kterým musíte důvěřovat –** Tato přemostění jsou verifikována externě. Používají externí sadu ověřovatelů (federace s multi-sig, multi-party výpočetní systémy, síť orákulí) k odesílání dat napříč řetězci. Díky tomu mohou nabídnout skvělou konektivitu a umožnit plně generalizovaný přenos zpráv napříč řetězci. Také mají tendenci dobře fungovat s ohledem na rychlost a nákladovou efektivitu. Toto vše však přichází na úkor bezpečnosti, protože uživatelé se musí spolehnout na bezpečnost přemostění.
- **Bez nutnosti důvěry –** Tato přemostění pro přenos zpráv a tokenů spoléhají na blockchainy, které propojují, a jejich validátory. Jsou "bez nutnosti důvěry", protože nepřidávají nové předpoklady vyžadující důvěru (kromě blockchainů). Z tohoto důvodu jsou přemostění bez nutnosti důvěry považována za bezpečnější než přemostění, kterým je potřeba důvěřovat.

Pro hodnocení přemostění bez nutnosti důvěry na základě dalších faktorů je třeba je rozdělit je na generalizovaná přemostění pro přenos zpráv a likviditní sítě.

- **Generalizovaná přemostění pro přenos zpráv –** Tato přemostění vynikají v oblasti bezpečnosti a schopnosti přenášet složitější data napříč řetězci. Obvykle jsou také dobrá z hlediska nákladové efektivity. Tyto silné stránky však obvykle přicházejí na úkor konektivity u přemostění s lehkým klientem (např. IBC) a rychlostních nevýhod pro optimistická přemostění (např. Nomad), která používají důkazy o podvodech.
- **Likviditní sítě –** Tato přemostění používají pro přenos aktiv atomické swapy a jsou lokálně ověřovanými systémy (tj. používají validátory podkladových blockchainů k ověření transakcí). Díky tomu vynikají bezpečností a rychlostí. Kromě toho jsou považovány za relativně nákladově efektivní a nabízejí dobrou konektivitu. Hlavním kompromisem je však jejich neschopnost přenášet složitější data – například nepodporují přenos zpráv.

## Rizika spojená s přemostěními {#risk-with-bridges}

Přemostění mají na svědomí tři největší [hacky v DeFi](https://rekt.news/leaderboard/) a jsou stále v raných fázích vývoje. Použití jakéhokoli přemostění s sebou nese následující rizika:

- **Riziko chyby v chytrém kontraktu –** I když mnoho přemostění úspěšně prošlo audity, stačí jedna chyba v chytrém kontraktu, aby byla aktiva vystavena hackům (např. [Wormhole Bridge na Solaně](https://rekt.news/wormhole-rekt/)).
- **Systémová finanční rizika –** Mnoho přemostění používá zabalená aktiva k ražbě kanonických verzí původního aktiva na novém řetězci. To vystavuje ekosystém systémovému riziku, čehož jsme už u zneužitých zabalených verzí tokenů byli svědky.
- **Riziko protistrany –** Některá přemostění využívají design, kterému musí uživatelé důvěřovat: Je zde nutné spoléhat se na předpoklad, že validátoři nebudou spolupracovat na odcizení prostředků uživatelů. Nutnost důvěřovat těmto třetím stranám vystavuje uživatele rizikům, jako jsou "rug pulls", cenzura a další škodlivé aktivity.
- **Otevřené otázky –** Vzhledem k tomu, že přemostění jsou v raných fázích vývoje, existuje mnoho nezodpovězených otázek týkajících se toho, jak budou fungovat v různých tržních podmínkách, jako jsou období přetížení sítě nebo neočekávané události, jako jsou útoky na úrovni sítě nebo rollbacky stavu. Tato nejistota představuje jistá rizika, jejichž míra je ale zatím neznámá.

## Jak mohou přemostění využívat dappky? Jak mohou dapps využívat přemostění? {#how-can-dapps-use-bridges}

Níže uvádíme některá praktická použití, která mohou vzít vývojáři na vědomí při využívání přemostění a přenosu svých dappek napříč řetězci:

### Integrace přemostění {#integrating-bridges}

Existuje několik způsobů, jak mohou vývojáři přidat podporu pro přemostění:

1. **Vytvoření vlastního přemostění –** Vytvoření bezpečného a spolehlivého přemostění není snadné, zejména pokud se rozhodnete pro cestu vyžadující minimální důvěru ze strany uživatele. Navíc to vyžaduje roky zkušeností a technických znalostí týkajících se škálovatelnosti a interoperability. Dále by to vyžadovalo najmout tým na plný úvazek, který by přemostění udržoval a zajišťoval dostatečnou likviditu, aby bylo neustále funkční.

2. **Zobrazení více možností přemostění pro uživatele –** Mnoho [dapps](/developers/docs/dapps/) vyžaduje, aby uživatelé pro interakci s nimi vlastnili jejich nativní token. Aby uživatelé mohli získat přístup k těmto tokenům, nabízejí dappky na svých webových stránkách různé možnosti přemostění. Tento způsob je však jen rychlou opravou problému, protože uživatele odvádí pryč z rozhraní dappky a vyžaduje, aby interagovali s dalšími dappkami a přemostěními. Uživatel takové dappky získá dojem složitosti, který je navíc doprovázený zvýšeným rizikem chyb.

3. **Integrace přemostění –** Toto řešení nevyžaduje, aby dapp posílala uživatele na externí rozhraní přemostění a DEXu. Umožňuje dappkám usnadnit onboarding uživatelů. Tento přístup má ale svá omezení:

   - Posuzování a údržba přemostění jsou složité a časově náročné.
   - Výběr jednoho přemostění vytváří jediný bod selhání a závislost.
   - Dappka je omezeno schopnostmi přemostění.
   - Samotná přemostění nemusí být dostatečná. Dappky mohou potřebovat DEXy kvůli větší funkčnosti, například pro meziblockchainové směny.

4. **Integrace více přemostění –** Toto řešení řeší mnoho problémů spojených s integrací jediného přemostění. Má však také svá omezení, protože integrace více přemostění je náročná na zdroje a vytváří technickou a komunikační zátěž pro vývojáře - a ti jsou v kryptu momentálně nejvzácnějším zdrojem.

5. **Integrace agregátoru přemostění –** Další možností pro dapps je integrace řešení agregace přemostění, které jim poskytne přístup k několika přemostěním. Agregátory přemostění dědí silné stránky všech agregovaných přemostění a nejsou tak omezeni schopnostmi jen jediného přemostění. Je důležité poznamenat, že agregátory přemostění obvykle udržují integraci přemostění, což zbavuje dappky nutnosti sledovat technické a provozní aspekty integrace přemostění.

Nicméně, agregátory přemostění mají svá omezení. Například, i když mohou nabídnout více variant přemostění, na trhu je obvykle k dispozici ještě spousta dalších přemostění, které agregátor nenabízí. Navíc, stejně jako přemostění, jsou i agregátory přemostění vystaveny rizikům spojeným se smart kontrakty a technologií (více smart kontraktů = více rizik).

Pokud se dappka rozhodne pro integraci přemostění nebo agregátoru, má na výběr z několika různých možností podle hloubky integrace. Například, pokud se jedná pouze o frontendovou integraci pro zlepšení onboardingu uživatelů, dappka by měla integrovat widget. Pokud je však integrace zaměřena na hlubší meziřetězové strategie jako staking, výnosové farmářství atd., dappka integruje SDK nebo API.

### Nasazení dapp na více řetězců {#deploying-a-dapp-on-multiple-chains}

K nasazení dapp na více řetězců mohou vývojáři používat vývojářské platformy jako [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) atd. Tyto platformy obvykle přicházejí s pluginy, které umožňují dappkám fungovat napříč blockchainy. Vývojáři mohou například využít deterministickou nasazovací proxy nabízenou pluginem [hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Příklady:

- [Jak vytvářet meziřetězcové dapps](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Vytvoření meziřetězcového tržiště s NFT](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Tvorba meziřetězcových NFT dapps](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorování aktivity kontraktů napříč řetězci {#monitoring-contract-activity-across-chains}

Pro monitorování aktivity kontraktů napříč řetězci mohou vývojáři použít subgrafy a vývojové platformy jako je Tenderly, které umožňují monitorovat smart kontrakty v reálném čase. Tyto platformy také nabízejí nástroje s rozšířenou funkcionalitou pro sledování aktivit napříč řetězci, jako je kontrola [událostí emitovaných kontrakty](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) atd.

#### Nástroje

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Další čtení {#further-reading}

- [Blockchainová přemostění](/bridges/) – ethereum.org
- [Rámec pro posuzování rizik přemostění od L2Beat](https://l2beat.com/bridges/summary)
- [Blockchainová přemostění: Budování sítí kryptosítí](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) – 8. září 2021 – Dmitriy Berenzon
- [Trilema interoperability](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) – 1. října 2021 – Arjun Bhuptani
- [Klastry: Jak důvěryhodná přemostění a přemostění s minimalizovanou důvěrou utvářejí prostředí s více řetězci](https://blog.celestia.org/clusters/) – 4. října 2021 – Mustafa Al-Bassam
- [LI.FI: U přemostění je důvěra spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) – 28. dubna 2022 – Arjun Chand
- [Stav řešení interoperability rollupů](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) – 20. června 2024 – Alex Hook
- [Využití sdíleného zabezpečení pro bezpečnou meziřetězcovou interoperabilitu: Lagrangeovy státní výbory a další](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) – 12. června 2024 – Emmanuel Awosika

Dále uvádíme některé zajímavé prezentace od [Jamese Prestwiche](https://twitter.com/_prestwich), které vám mohou pomoci porozumění přemostěním ještě prohloubit:

- [Stavění přemostění, ne zděných zahrad](https://youtu.be/ZQJWMiX4hT0)
- [Rozbor přemostění](https://youtu.be/b0mC-ZqN8Oo)
- [Proč přemostění hoří](https://youtu.be/c7cm2kd20j8)
