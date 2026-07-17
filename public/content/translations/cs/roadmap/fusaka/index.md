---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Přečtěte si o aktualizaci protokolu Fusaka
lang: cs
authors: ["Nixo", "Mario Havel"]
---

**Vysoce očekávaná aktualizace Etherea Fusaka byla spuštěna 3. prosince 2025**

Aktualizace sítě Fusaka následuje po aktualizaci [Pectra](/roadmap/pectra/), přináší další nové funkce a zlepšuje uživatelský zážitek pro každého uživatele a vývojáře [Etherea](/). Název se skládá z aktualizace exekuční vrstvy Osaka a verze vrstvy konsensu pojmenované po hvězdě Fulu. Obě části Etherea získávají aktualizaci, která posouvá škálování, bezpečnost a uživatelský zážitek Etherea do budoucnosti.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Aktualizace Fusaka je pouze jedním krokem v dlouhodobých cílech vývoje Etherea. Přečtěte si více o [plánu vývoje protokolu](/roadmap/) a [předchozích aktualizacích](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Vylepšení ve Fusace {#improvements-in-fusaka}

### Škálování blobů {#scale-blobs}

#### PeerDAS {#peerdas}

Toto je _hlavní tahák_ forku Fusaka, hlavní funkce přidaná v této aktualizaci. Sítě vrstvy 2 (l2) v současnosti odesílají svá data do Etherea v blobech, což je dočasný datový typ vytvořený speciálně pro vrstvu 2 (l2). Před Fusakou musel každý plný uzel ukládat každý blob, aby se zajistilo, že data existují. S rostoucí propustností blobů se stahování všech těchto dat stává neudržitelně náročným na zdroje.

Díky [vzorkování dostupnosti dat (DAS)](https://notes.ethereum.org/@fradamt/das-fork-choice) bude každý uzel zodpovědný pouze za podmnožinu dat blobu, místo aby musel ukládat všechna data. Bloby jsou rovnoměrně a náhodně distribuovány mezi uzly v síti, přičemž každý plný uzel uchovává pouze 1/8 dat, což umožňuje teoretické škálování až na osminásobek. Pro zajištění dostupnosti dat lze jakoukoli část dat zrekonstruovat z jakýchkoli existujících 50 % celku pomocí metod, které snižují pravděpodobnost chybných nebo chybějících dat na kryptograficky zanedbatelnou úroveň (~jedna ku 10<sup>20</sup> až jedna ku 10<sup>24</sup>).

To udržuje požadavky na hardware a šířku pásma pro uzly na přijatelné úrovni a zároveň umožňuje škálování blobů, což vede k většímu škálování s menšími poplatky pro sítě vrstvy 2 (l2).

[Přečtěte si více o PeerDAS](/roadmap/fusaka/peerdas/)

**Zdroje**:

- [Technická specifikace EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion o PeerDAS: Škálování Etherea dnes | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademické: Dokumentace k Ethereum PeerDAS (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Forky pouze pro parametry blobů (Blob-Parameter-Only) {#blob-parameter-only-forks}

Sítě vrstvy 2 (l2) škálují Ethereum – jak jejich sítě rostou, potřebují do Etherea odesílat více dat. To znamená, že Ethereum bude muset postupem času zvyšovat počet blobů, které mají k dispozici. Ačkoli PeerDAS umožňuje škálování dat blobů, je třeba to dělat postupně a bezpečně.

Protože Ethereum je kód běžící na tisících nezávislých uzlů, které vyžadují shodu na stejných pravidlech, nemůžeme jednoduše zavádět změny, jako je zvýšení počtu blobů, stejným způsobem, jakým nasazujete aktualizaci webových stránek. Jakákoli změna pravidel musí být koordinovanou aktualizací, při které se každý uzel, klient a software validátoru aktualizuje před stejným předem určeným blokem.

Tyto koordinované aktualizace obecně zahrnují mnoho změn, vyžadují spoustu testování a to zabere čas. Aby se bylo možné rychleji přizpůsobit měnícím se potřebám blobů na vrstvě 2 (l2), forky pouze pro parametry blobů zavádějí mechanismus pro zvýšení počtu blobů, aniž by se muselo čekat na plán těchto velkých aktualizací.

Forky pouze pro parametry blobů mohou být nastaveny klienty, podobně jako jiná konfigurace, například limit plynu. Mezi hlavními aktualizacemi Etherea se klienti mohou dohodnout na zvýšení `target` a `max` blobů např. na 9 a 12 a provozovatelé uzlů se pak aktualizují, aby se tohoto drobného forku zúčastnili. Tyto forky pouze pro parametry blobů lze nakonfigurovat kdykoli.

Když byly bloby poprvé přidány do sítě v aktualizaci Dencun, cíl byl 3. V aktualizaci Pectra se tento počet zvýšil na 6 a po Fusace jej lze nyní zvyšovat udržitelným tempem nezávisle na těchto velkých aktualizacích sítě.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Zdroj grafu: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Zdroje**: [Technická specifikace EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Základní poplatek za blob ohraničený exekučními náklady {#blob-base-fee-bounded-by-execution-costs}

Sítě vrstvy 2 (l2) platí při odesílání dat dva účty: poplatek za blob a exekuční gas potřebný k ověření těchto blobů. Pokud dominuje exekuční gas, aukce poplatků za blob může klesnout až na 1 Wei a přestat fungovat jako cenový signál.

EIP-7918 stanovuje pod každý blob proporcionální rezervní cenu. Když je rezerva vyšší než nominální základní poplatek za blob, algoritmus pro úpravu poplatků považuje blok za překračující cíl, přestane tlačit poplatek dolů a umožní mu normálně růst. V důsledku toho:

- trh s poplatky za blob vždy reaguje na přetížení sítě
- sítě vrstvy 2 (l2) platí alespoň smysluplnou část výpočetního výkonu, který vyžadují od uzlů
- skoky základního poplatku na exekuční vrstvě již nemohou srazit poplatek za blob na 1 Wei

**Zdroje**:

- [Technická specifikace EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Vysvětlení ve Storybooku](https://notes.ethereum.org/@anderselowsson/AIG)

### Škálování vrstvy 1 (l1) {#scale-l1}

#### Exspirace historie a jednodušší účtenky {#history-expiry}

V červenci 2025 začali exekuční klienti Etherea [podporovat částečnou exspiraci historie](https://blog.ethereum.org/2025/07/08/partial-history-exp). Tím se zahodila historie starší než [Merge](https://ethereum.org/roadmap/merge/), aby se snížilo místo na disku požadované provozovateli uzlů, jak Ethereum nadále roste.

Tento EIP je v sekci oddělené od „Core EIPs“, protože fork ve skutečnosti neimplementuje žádné změny – je to upozornění, že týmy klientů musí podporovat exspiraci historie do aktualizace Fusaka. Prakticky to klienti mohou implementovat kdykoli, ale přidání do aktualizace to konkrétně zařadilo na jejich seznam úkolů a umožnilo jim testovat změny Fusaky ve spojení s touto funkcí.

**Zdroje**: [Technická specifikace EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Nastavení horních limitů pro MODEXP {#set-upper-bounds-for-modexp}

Až dosud předkompilovaný kontrakt MODEXP přijímal čísla prakticky jakékoli velikosti. To ztěžovalo testování, usnadňovalo zneužití a představovalo riziko pro stabilitu klienta. EIP-7823 zavádí jasný limit: každé vstupní číslo může být dlouhé maximálně 8192 bitů (1024 bajtů). Cokoli většího je odmítnuto, gas transakce je spálen a nedojde k žádným změnám stavu. Velmi pohodlně pokrývá reálné potřeby a zároveň odstraňuje extrémní případy, které komplikovaly plánování limitu plynu a bezpečnostní kontroly. Tato změna poskytuje větší bezpečnost a ochranu proti DoS, aniž by ovlivnila uživatelský nebo vývojářský zážitek.

**Zdroje**: [Technická specifikace EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Zastropování limitu plynu pro transakce {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) přidává strop 16 777 216 (2^24) gasu na transakci. Jde o proaktivní posílení proti DoS tím, že se omezí náklady na nejhorší možný scénář jakékoli jednotlivé transakce při zvyšování limitu plynu bloku. Usnadňuje to modelování validace a propagace, což nám umožňuje řešit škálování prostřednictvím zvyšování limitu plynu.

Proč přesně 2^24 gasu? Je to pohodlně méně než dnešní limit plynu, je to dostatečně velké pro nasazení reálných kontraktů a náročné předkompilované kontrakty a mocnina 2 usnadňuje implementaci napříč klienty. Tato nová maximální velikost transakce je podobná průměrné velikosti bloku před aktualizací Pectra, což z ní činí rozumný limit pro jakoukoli operaci na Ethereu.

**Zdroje**: [Technická specifikace EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Zvýšení nákladů na gas pro `MODEXP` {#modexp-gas-cost-increase}

MODEXP je vestavěná funkce (předkompilovaný kontrakt), která počítá modulární umocňování, což je typ matematiky s velkými čísly používaný při ověřování podpisů RSA a v systémech důkazů. Umožňuje kontraktům spouštět tyto výpočty přímo, aniž by je musely samy implementovat.

Vývojáři a týmy klientů identifikovali MODEXP jako hlavní překážku pro zvýšení limitu plynu bloku, protože současné oceňování gasu často podceňuje, kolik výpočetního výkonu určité vstupy vyžadují. To znamená, že jedna transakce využívající MODEXP by mohla zabrat většinu času potřebného ke zpracování celého bloku, což by zpomalilo síť.

Tento EIP mění oceňování tak, aby odpovídalo skutečným výpočetním nákladům, a to následovně:

- zvýšením minimálního poplatku z 200 na 500 gasu a odstraněním třetinové slevy z EIP-2565 při obecném výpočtu nákladů
- prudším zvýšením nákladů, když je vstupní exponent velmi dlouhý. Pokud je exponent (číslo „mocniny“, které předáváte jako druhý argument) delší než 32 bajtů / 256 bitů, poplatek za gas stoupá mnohem rychleji za každý další bajt
- dodatečným zpoplatněním velkého základu nebo modulu. U dalších dvou čísel (základ a modul) se předpokládá, že mají alespoň 32 bajtů – pokud je některé z nich větší, náklady rostou úměrně jeho velikosti

Díky lepšímu sladění nákladů se skutečnou dobou zpracování již MODEXP nemůže způsobit, že validace bloku bude trvat příliš dlouho. Tato změna je jednou z několika, jejichž cílem je zajistit, aby bylo v budoucnu bezpečné zvýšit limit plynu bloku Etherea.

**Zdroje**: [Technická specifikace EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limit velikosti exekučního bloku RLP {#rlp-execution-block-size-limit}

Tím se vytváří strop pro to, jak velký smí být blok – jedná se o limit toho, co se _odesílá_ po síti, a je oddělený od limitu plynu, který omezuje _práci_ uvnitř bloku. Strop velikosti bloku je 10 MiB, s malou rezervou (2 MiB) vyhrazenou pro data konsensu, aby se vše čistě vešlo a propagovalo. Pokud se objeví blok větší než tento limit, klienti jej odmítnou.
Je to nutné, protože šíření a ověřování velmi velkých bloků v síti trvá déle a může to způsobit problémy s konsensem nebo být zneužito jako vektor DoS útoku. Navíc gossip protokol vrstvy konsensu již nepřeposílá bloky větší než ~10 MiB, takže sladění exekuční vrstvy s tímto limitem zabraňuje podivným situacím typu „někteří vidí, jiní zahodí“.

Detaily: jedná se o strop velikosti exekučního bloku kódovaného pomocí [RLP](/developers/docs/data-structures-and-encoding/rlp/). Celkem 10 MiB, s bezpečnostní rezervou 2 MiB vyhrazenou pro rámování beacon bloku. Prakticky klienti definují

`MAX_BLOCK_SIZE = 10,485,760` bajtů a

`SAFETY_MARGIN = 2,097,152` bajtů,

a odmítnou jakýkoli exekuční blok, jehož RLP payload překročí

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Cílem je omezit čas propagace/validace v nejhorším případě a sladit se s chováním gossip protokolu vrstvy konsensu, čímž se sníží riziko reorganizace/DoS bez změny účtování gasu.

**Zdroje**: [Technická specifikace EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Nastavení výchozího limitu plynu na 60 milionů {#set-default-gas-limit-to-60-million}

Před zvýšením limitu plynu z 30M na 36M v únoru 2025 (a následně na 45M) se tato hodnota od Merge (září 2022) nezměnila. Cílem tohoto EIP je učinit z konzistentního škálování prioritu.

EIP-7935 koordinuje týmy klientů exekuční vrstvy, aby pro Fusaku zvýšily výchozí limit plynu nad dnešních 45M. Jedná se o informační EIP, ale výslovně žádá klienty, aby otestovali vyšší limity na devnetech, shodli se na bezpečné hodnotě a dodali toto číslo ve svých vydáních pro Fusaku.

Plánování devnetu cílí na zátěž ~60M (plné bloky se syntetickou zátěží) a iterativní zvyšování; výzkum říká, že patologie velikosti bloku v nejhorším případě by neměly představovat omezení pod ~150M. Zavedení by mělo být spojeno se zastropováním limitu plynu pro transakce (EIP-7825), aby žádná jednotlivá transakce nemohla dominovat při zvyšování limitů.

**Zdroje**: [Technická specifikace EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Zlepšení UX {#improve-ux}

#### Deterministický výhled navrhovatele {#deterministic-proposer-lookahead}

S EIP-7917 bude Beacon chain vědět o nadcházejících navrhovatelích bloků pro další epochu. Deterministický pohled na to, kteří validátoři budou navrhovat budoucí bloky, může umožnit [předběžná potvrzení (preconfirmations)](https://ethresear.ch/t/based-preconfirmations/17353) – závazek s nadcházejícím navrhovatelem, který zaručuje, že transakce uživatele bude zahrnuta do jeho bloku bez čekání na samotný blok.

Tato funkce je přínosem pro implementace klientů a bezpečnost sítě, protože zabraňuje okrajovým případům, kdy by validátoři mohli manipulovat s plánem navrhovatelů. Výhled také umožňuje menší složitost implementace.

**Zdroje**: [Technická specifikace EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Operační kód pro počítání úvodních nul (CLZ) {#count-leading-zeros-opcode}

Tato funkce přidává malou instrukci EVM, **počítání úvodních nul (CLZ)**. Téměř vše v EVM je reprezentováno jako 256bitová hodnota – tento nový operační kód vrací, kolik nulových bitů je na začátku. Jedná se o běžnou funkci v mnoha architekturách instrukčních sad, protože umožňuje efektivnější aritmetické operace. V praxi to zkracuje dnešní ručně psané skenování bitů do jednoho kroku, takže nalezení prvního nastaveného bitu, skenování bajtů nebo parsování bitových polí se stává jednodušším a levnějším. Operační kód má nízké, fixní náklady a podle benchmarků je na stejné úrovni jako základní sčítání, což zkracuje bajtkód a šetří gas za stejnou práci.

**Zdroje**: [Technická specifikace EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Předkompilovaný kontrakt pro podporu křivky secp256r1 {#secp256r1-precompile}

Zavádí vestavěnou kontrolu podpisů secp256r1 (P-256) ve stylu přístupových klíčů na pevné adrese `0x100` pomocí stejného formátu volání, který již přijalo mnoho sítí vrstvy 2 (l2), a opravuje okrajové případy, takže kontrakty napsané pro tato prostředí fungují na vrstvě 1 (l1) beze změn.

Vylepšení UX! Pro uživatele to odemyká nativní podepisování na zařízení a přístupové klíče. Peněženky mohou přímo využívat Apple Secure Enclave, úložiště klíčů Android, hardwarové bezpečnostní moduly (HSM) a FIDO2/WebAuthn – žádná seed fráze, plynulejší onboarding a vícefaktorové toky, které působí jako moderní aplikace. Výsledkem je lepší UX, snazší obnova a vzorce abstrakce účtu, které odpovídají tomu, co již dělají miliardy zařízení.

Pro vývojáře to znamená, že přijímá 160bajtový vstup a vrací 32bajtový výstup, což usnadňuje portování existujících knihoven a kontraktů z vrstvy 2 (l2). Interně zahrnuje kontroly bodu v nekonečnu a modulárního porovnání, aby se eliminovaly záludné okrajové případy bez narušení platných volajících.

**Zdroje**:

- [Technická specifikace EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Více o RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Vezměte na vědomí, že EIP-7951 nahradil RIP-7212)_

### Meta {#meta}

#### Metoda JSON-RPC `eth_config` {#eth-config}

Jedná se o volání JSON-RPC, které vám umožňuje zeptat se vašeho uzlu, jaké nastavení forku používáte. Vrací tři snímky: `current`, `next` a `last`, aby validátoři a monitorovací nástroje mohli ověřit, že jsou klienti připraveni na nadcházející fork.

Prakticky vzato to řeší nedostatek objevený, když byl fork Pectra spuštěn na testnetu Holesky na začátku roku 2025 s drobnými chybami v konfiguraci, což vedlo ke stavu bez finalizace. To pomáhá testovacím týmům a vývojářům zajistit, že se hlavní forky budou chovat podle očekávání při přechodu z devnetů na testnety a z testnetů na Mainnet.

Snímky zahrnují: `chainId`, `forkId`, plánovaný čas aktivace forku, které předkompilované kontrakty jsou aktivní, adresy předkompilovaných kontraktů, závislosti systémových kontraktů a plán blobů forku.

Tento EIP je v sekci oddělené od „Core EIPs“, protože fork ve skutečnosti neimplementuje žádné změny – je to upozornění, že týmy klientů musí implementovat tuto metodu JSON-RPC do aktualizace Fusaka.

**Zdroje**: [Technická specifikace EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Často kladené dotazy (FAQ) {#faq}

### Ovlivní tato aktualizace všechny uzly a validátory Etherea? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ano, aktualizace Fusaka vyžaduje aktualizace jak [exekučních klientů, tak klientů konsensu](/developers/docs/nodes-and-clients/). Všichni hlavní klienti Etherea vydají verze podporující hard fork označené jako vysoká priorita. Kdy budou tato vydání k dispozici, můžete sledovat v repozitářích klientů na GitHubu, na jejich [kanálech na Discordu](https://ethstaker.org/support), na [Discordu EthStaker](https://dsc.gg/ethstaker) nebo přihlášením k odběru blogu Etherea pro aktualizace protokolu. Pro udržení synchronizace se sítí Ethereum po aktualizaci musí provozovatelé uzlů zajistit, že používají podporovanou verzi klienta. Vezměte na vědomí, že informace o vydáních klientů jsou časově citlivé a uživatelé by se měli řídit nejnovějšími aktualizacemi pro nejaktuálnější podrobnosti.

### Jak lze převést ETH po hard forku? {#how-can-eth-be-converted-after-the-hardfork}

- **Pro vaše ETH není vyžadována žádná akce**: Po aktualizaci Etherea Fusaka není nutné vaše ETH převádět ani aktualizovat. Zůstatky na vašem účtu zůstanou stejné a ETH, které aktuálně držíte, zůstane po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **kdokoli, kdo vás instruuje k „aktualizaci“ vašeho ETH, se vás snaží podvést.** V souvislosti s touto aktualizací nemusíte dělat vůbec nic. Vaše aktiva zůstanou zcela nedotčena. Pamatujte, že být informován je nejlepší obranou proti podvodům.

[Více o rozpoznávání a vyhýbání se podvodům](/security/)

### Co je s těmi zebrami? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra je vývojáři zvoleným „maskotem“ Fusaky, protože její pruhy odrážejí vzorkování dostupnosti dat (DAS) založené na sloupcích v PeerDAS, kde uzly spravují určité sloupcové podsítě a vzorkují několik dalších sloupců ze slotu každého peera, aby zkontrolovaly, zda jsou data blobů dostupná.

Merge v roce 2022 [použil jako maskota pandu](https://x.com/hwwonx/status/1431970802040127498), aby signalizoval spojení exekuční vrstvy a vrstvy konsensu. Od té doby jsou maskoti neformálně vybíráni pro každý fork a objevují se jako ASCII art v protokolech klientů v době aktualizace. Je to jen zábavný způsob oslavy.

### Jaká vylepšení jsou zahrnuta pro škálování vrstvy 2 (l2)? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) je hlavní funkcí forku. Implementuje vzorkování dostupnosti dat (DAS), které odemyká větší škálovatelnost pro rollupy, čímž teoreticky škáluje prostor pro bloby až na 8násobek současné velikosti. Trh s poplatky za blob bude také vylepšen, aby efektivně reagoval na přetížení a zaručil, že sítě vrstvy 2 (l2) zaplatí smysluplný poplatek za výpočetní výkon a prostor, který bloby vyžadují od uzlů.

### V čem se liší forky BPO? {#how-are-bpo-forks-different}

Forky pouze pro parametry blobů (Blob Only Parameter - BPO) poskytují mechanismus pro neustálé zvyšování počtu blobů (jak cílového, tak maximálního) po aktivaci PeerDAS, aniž by se muselo čekat na plně koordinovanou aktualizaci. Každé zvýšení je pevně zakódováno tak, aby bylo předem nakonfigurováno ve vydáních klientů podporujících Fusaku.

Jako uživatel nebo validátor nemusíte aktualizovat své klienty pro každý BPO a stačí se ujistit, že sledujete hlavní hard forky, jako je Fusaka. Jedná se o stejnou praxi jako dříve, nejsou potřeba žádné speciální akce. Stále se doporučuje sledovat vaše klienty v době aktualizací a BPO a udržovat je aktuální i mezi hlavními vydáními, protože po hard forku mohou následovat opravy nebo optimalizace.

### Jaký je plán BPO? {#what-is-the-bpo-schedule}

Přesný plán aktualizací BPO bude určen s vydáními Fusaky. Sledujte [Oznámení o protokolu](https://blog.ethereum.org/category/protocol) a poznámky k vydání vašich klientů.

Příklad, jak by to mohlo vypadat:

- Před Fusakou: cíl 6, max 9
- Při aktivaci Fusaky: cíl 6, max 9
- BPO1, několik týdnů po aktivaci Fusaky: cíl 10, max 15, zvýšení o dvě třetiny
- BPO2, několik týdnů po BPO1: cíl 14, max 21

### Sníží to poplatky na Ethereu (vrstva 1) {#will-this-lower-gas}

Tato aktualizace nesnižuje poplatky za gas na vrstvě 1 (l1), alespoň ne přímo. Hlavním zaměřením je více prostoru pro bloby pro data rollupů, a tím snížení poplatků na vrstvě 2 (l2). To může mít určité vedlejší účinky na trh s poplatky na vrstvě 1 (l1), ale neočekává se žádná významná změna.

### Co musím jako staker udělat pro aktualizaci? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Stejně jako u každé aktualizace sítě se ujistěte, že jste aktualizovali své klienty na nejnovější verze označené podporou Fusaky. Sledujte aktualizace v e-mailové konferenci a [Oznámení o protokolu na blogu EF](https://blog.ethereum.org/category/protocol), abyste byli informováni o vydáních.
Chcete-li ověřit své nastavení před aktivací Fusaky na Mainnetu, můžete spustit validátor na testnetech. Fusaka je [aktivována dříve na testnetech](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), což vám dává více prostoru k ujištění se, že vše funguje, a k nahlášení chyb. Forky testnetů jsou také oznamovány v e-mailové konferenci a na blogu.

### Ovlivňuje „Deterministický výhled navrhovatele“ (EIP-7917) validátory? {#does-7917-affect-validators}

Tato změna nemění způsob, jakým funguje váš klient validátoru, nicméně poskytne lepší přehled o budoucnosti vašich povinností validátoru. Nezapomeňte aktualizovat své monitorovací nástroje, abyste udrželi krok s novými funkcemi.

### Jak Fusaka ovlivňuje požadavky na šířku pásma pro uzly a validátory? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS přináší významnou změnu ve způsobu, jakým uzly přenášejí data blobů. Všechna data jsou rozdělena na části zvané sloupce napříč 128 podsítěmi, přičemž uzly se přihlašují k odběru pouze některých z nich. Množství sloupců podsítě, které musí uzly spravovat, závisí na jejich konfiguraci a počtu připojených validátorů. Skutečné požadavky na šířku pásma budou záviset na množství blobů povolených v síti a typu uzlu. V okamžiku aktivace Fusaky zůstává cíl blobů stejný jako dříve, ale s PeerDAS mohou provozovatelé uzlů zaznamenat snížení využití disku pro bloby a síťového provozu. Jak BPO konfigurují vyšší počty blobů v síti, potřebná šířka pásma se bude s každým BPO zvyšovat.

Požadavky na uzly jsou i po BPO Fusaky stále v rámci [doporučených mezí](https://eips.ethereum.org/EIPS/eip-7870).

#### Plné uzly {#full-nodes}

Běžné uzly bez jakýchkoli validátorů se přihlásí k odběru pouze 4 podsítí, čímž zajistí správu 1/8 původních dat. To znamená, že při stejném množství dat blobů by šířka pásma uzlu pro jejich stahování byla osmkrát (8x) menší. Využití disku a šířka pásma pro stahování blobů u normálního plného uzlu by se mohly snížit přibližně o 80 % na pouhých několik Mb.

#### Sóloví stakeři {#solo-stakers}

Pokud je uzel používán pro klienta validátoru, musí spravovat více sloupců, a proto zpracovávat více dat. S přidaným validátorem se uzel přihlásí k odběru alespoň 8 sloupcových podsítí, a proto zpracovává dvakrát více dat než běžný uzel, ale stále méně než před Fusakou. Pokud je zůstatek validátoru vyšší než 287 ETH, bude se přihlašovat k odběru stále více podsítí.

Pro sólového stakera to znamená, že jeho využití disku a šířka pásma pro stahování se sníží přibližně o 50 %. K lokálnímu sestavování bloků a nahrávání všech blobů do sítě je však zapotřebí větší šířka pásma pro nahrávání. Lokální tvůrci bloků budou v době Fusaky potřebovat 2-3krát vyšší šířku pásma pro nahrávání než dříve a s cílem BPO2 15/21 blobů bude muset být konečná potřebná šířka pásma pro nahrávání přibližně 5krát vyšší, na úrovni 100 Mbps.

#### Velcí validátoři {#large-validators}

Počet odebíraných podsítí roste s větším zůstatkem a validátory přidanými do uzlu. Například při zůstatku kolem 800 ETH uzel spravuje 25 sloupců a bude potřebovat přibližně o 30 % větší šířku pásma pro stahování než dříve. Potřebný upload roste podobně jako u běžných uzlů a je nutných alespoň 100 Mbps.

Při 4096 ETH, 2 validátorech s maximálním zůstatkem, se uzel stává „superuzlem“, který spravuje všechny sloupce, a proto vše stahuje a ukládá. Tyto uzly aktivně léčí síť tím, že přispívají chybějícími daty zpět, ale také vyžadují mnohem větší šířku pásma a úložiště. Vzhledem k tomu, že konečný cíl blobů je 6krát vyšší než dříve, superuzly budou muset ukládat přibližně 600 GB dat blobů navíc a mít rychlejší trvalou šířku pásma pro stahování kolem 20 Mbps.

[Přečtěte si více podrobností o očekávaných požadavcích.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Jaké změny EVM jsou implementovány? {#what-evm-changes-are-implemented}

Fusaka upevňuje EVM novými drobnými změnami a funkcemi.

- Pro bezpečnost při škálování bude maximální velikost jedné transakce [omezena na 16,7 milionu](https://eips.ethereum.org/EIPS/eip-7825) jednotek gasu.
- Do EVM je přidán [nový operační kód pro počítání úvodních nul (CLZ)](https://eips.ethereum.org/EIPS/eip-7939), který umožní jazykům pro chytré kontrakty provádět určité operace efektivněji.
- [Náklady na předkompilovaný kontrakt `ModExp` se zvýší](https://eips.ethereum.org/EIPS/eip-7883) – kontrakty, které jej používají, budou účtovat více gasu za exekuci.

### Jak nový limit 16M gasu ovlivňuje vývojáře kontraktů? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka zavádí limit [maximální velikosti jedné transakce na 16,7 milionu](https://eips.ethereum.org/EIPS/eip-7825) (2^24) jednotek gasu. To je zhruba předchozí velikost průměrného bloku, což je dostatečně velké na to, aby se do něj vešly složité transakce, které by spotřebovaly celý blok. Tento limit vytváří ochranu pro klienty a zabraňuje potenciálním DoS útokům v budoucnu s vyšším limitem plynu bloku. Cílem škálování je umožnit, aby se do blockchainu dostalo více transakcí, aniž by jedna jediná spotřebovala celý blok.

Běžné uživatelské transakce mají k dosažení tohoto limitu daleko. Určité okrajové případy, jako jsou velké a složité operace decentralizovaných financí (DeFi), nasazení velkých chytrých kontraktů nebo dávkové transakce cílící na více kontraktů, mohou být touto změnou ovlivněny. Tyto transakce budou muset být rozděleny na menší nebo optimalizovány jiným způsobem. Před odesláním transakcí, které potenciálně dosahují limitu, použijte simulaci.

Metoda RPC `eth_call` není omezena a umožní simulaci větších transakcí, než je skutečný limit blockchainu. Skutečný limit pro metody RPC může nakonfigurovat provozovatel klienta, aby se zabránilo zneužití.

### Co znamená CLZ pro vývojáře? {#what-clz-means-for-developers}

Kompilátory EVM, jako je Solidity, budou interně implementovat a využívat novou funkci pro počítání nul. Nové kontrakty mohou těžit z úspor gasu, pokud se spoléhají na tento druh operace. Sledujte vydání a oznámení funkcí jazyka pro chytré kontrakty, kde najdete dokumentaci k potenciálním úsporám.

### Jsou nějaké změny pro mé stávající chytré kontrakty? {#what-clz-means-for-developers-2}

Fusaka nemá žádný přímý vliv, který by narušil jakékoli stávající kontrakty nebo změnil jejich chování. Změny zavedené do exekuční vrstvy jsou prováděny se zpětnou kompatibilitou, nicméně vždy dávejte pozor na okrajové případy a potenciální dopad.

[Se zvýšenými náklady na předkompilovaný kontrakt `ModExp`](https://eips.ethereum.org/EIPS/eip-7883) budou kontrakty, které na něm závisí, spotřebovávat více gasu pro exekuci. Pokud se na to váš kontrakt silně spoléhá a stane se pro uživatele dražším, přehodnoťte, jak je využíván.

Zvažte [nový limit 16,7 milionu](https://eips.ethereum.org/EIPS/eip-7825), pokud by transakce provádějící vaše kontrakty mohly dosahovat podobné velikosti.

## Další čtení {#further-reading}

- [Plán vývoje Etherea](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Oznámení o testnetu Fusaka na blogu](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Co Fusaka a Pectra přinesou Ethereu](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Další aktualizace Etherea: Fusaka, Glamsterdam a dále s Prestonem Van Loonem](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Soubory Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Vysvětlení PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)