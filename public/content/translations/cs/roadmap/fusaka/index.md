---
title: Fulu-Osaka (Fusaka)
description: Zjistěte více o vylepšení protokolu Fusaka
lang: cs
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Dlouho očekávané vylepšení Etherea Fusaka bylo spuštěno 3. prosince 2025**

Vylepšení sítě Fusaka navazuje na [Pectra](/roadmap/pectra/) a přináší další nové funkce a zlepšuje zážitek pro každého uživatele a vývojáře Etherea. Název se skládá z vylepšení exekuční vrstvy Osaka a verze vrstvy konsenzu pojmenované po hvězdě Fulu. Obě části Etherea dostávají vylepšení, které posouvá škálování, zabezpečení a uživatelský zážitek Etherea do budoucnosti.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Vylepšení Fusaka je pouze jedním krokem v dlouhodobých vývojových cílech Etherea. Zjistěte více o [plánu protokolu](/roadmap/) a [předchozích vylepšeních](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Vylepšení ve Fusace {#improvements-in-fusaka}

### Škálování blobů {#scale-blobs}

#### PeerDAS {#peerdas}

Toto je _hlavní tahák_ forku Fusaka, hlavní funkce přidaná v tomto vylepšení. Druhé vrstvy v současné době posílají svá data na Ethereum v blobech, což je efemérní datový typ vytvořený speciálně pro druhé vrstvy. Před vylepšením Fusaka musel každý plný uzel ukládat každý blob, aby se zajistilo, že data existují. Se zvyšující se propustností blobů se stahování všech těchto dat stává neudržitelně náročným na zdroje.

S [vzorkováním dostupnosti dat](https://notes.ethereum.org/@fradamt/das-fork-choice) bude místo nutnosti ukládat všechna data blobů každý uzel zodpovědný za podmnožinu dat blobů. Bloby jsou rovnoměrně náhodně distribuovány mezi uzly v síti, přičemž každý plný uzel drží pouze 1/8 dat, což teoreticky umožňuje až 8násobné škálování. Pro zajištění dostupnosti dat lze jakoukoli část dat zrekonstruovat z jakýchkoli existujících 50 % celku pomocí metod, které snižují pravděpodobnost nesprávných nebo chybějících dat na kryptograficky zanedbatelnou úroveň (~jedna ku 10<sup>20</sup> až jedna ku 10<sup>24</sup>).

Tím jsou nároky na hardware a šířku pásma pro uzly udržitelné a zároveň je umožněno škálování blobů, což vede k většímu škálování s menšími poplatky pro druhé vrstvy.

[Zjistěte více o PeerDAS](/roadmap/fusaka/peerdas/)

**Zdroje**:

- [Technická specifikace EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion on PeerDAS: Scaling Ethereum Today | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademické: A Documentation of Ethereum’s PeerDAS (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Forky pouze s parametry blobů {#blob-parameter-only-forks}

Druhé vrstvy škálují Ethereum – jak jejich sítě rostou, potřebují posílat více dat na Ethereum. To znamená, že Ethereum bude muset postupem času zvyšovat počet blobů, které jim jsou k dispozici. Ačkoli PeerDAS umožňuje škálování dat blobů, je třeba to dělat postupně a bezpečně.

Protože Ethereum je kód běžící na tisících nezávislých uzlů, které vyžadují shodu na stejných pravidlech, nemůžeme jednoduše zavádět změny, jako je zvýšení počtu blobů, stejným způsobem, jakým nasazujete aktualizaci webových stránek. Jakákoli změna pravidel musí být koordinovaným vylepšením, při kterém se software každého uzlu, klienta a validátora vylepší před stejným předem určeným blokem.

Tato koordinovaná vylepšení obecně zahrnují mnoho změn, vyžadují mnoho testování a to zabere čas. Aby bylo možné se rychleji přizpůsobit měnícím se potřebám blobů druhé vrstvy, forky pouze s parametry blobů zavádějí mechanismus pro zvýšení počtu blobů, aniž by bylo nutné čekat na plán vylepšení.

Forky pouze s parametry blobů mohou být nastaveny klienty, podobně jako jiná konfigurace, například palivový limit. Mezi hlavními vylepšeními Etherea se klienti mohou dohodnout na zvýšení `cílového` a `maximálního` počtu blobů například na 9 a 12 a poté operátoři uzlů provedou aktualizaci, aby se zúčastnili tohoto malého forku. Tyto forky pouze s parametry blobů lze nakonfigurovat kdykoli.

Když byly bloby poprvé přidány do sítě v rámci vylepšení Dencun, cíl byl 3. Ten byl v Pectře zvýšen na 6 a po vylepšení Fusaka jej lze nyní zvyšovat udržitelným tempem nezávisle na těchto velkých vylepšeních sítě.

![Graf zobrazující průměrný počet blobů na blok a zvyšující se cíle s vylepšeními](./average-blob-count-per-block.webp)

Zdroj grafu: [Ethereum Blobs – @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Zdroje**: [Technická specifikace EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Základní poplatek blobu ohraničený exekučními náklady {#blob-base-fee-bounded-by-execution-costs}

Druhé vrstvy platí při odesílání dat dva účty: poplatek za blob a exekuční palivo potřebné k ověření těchto blobů. Pokud dominuje exekuční palivo, aukce poplatků za bloby může klesnout až na 1 wei a přestat být cenovým signálem.

EIP-7918 stanovuje proporcionální rezervní cenu pod každým blobem. Když je rezerva vyšší než nominální základní poplatek za blob, algoritmus pro úpravu poplatků považuje blok za překračující cíl, přestane tlačit poplatek dolů a umožní mu normálně se zvýšit. Výsledkem je:

- trh s poplatky za bloby vždy reaguje na přetížení
- druhé vrstvy platí alespoň smysluplnou část výpočetního výkonu, který nutí uzly vynaložit
- skoky základního poplatku na exekuční vrstvě již nemohou nechat poplatek za blob na hodnotě 1 wei

**Zdroje**:

- [Technická specifikace EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Vysvětlení ve Storybooku](https://notes.ethereum.org/@anderselowsson/AIG)

### Škálování L1 {#scale-l1}

#### Vypršení platnosti historie a jednodušší potvrzení {#history-expiry}

V červenci 2025 začali exekuční klienti Etherea [podporovat částečné vypršení platnosti historie](https://blog.ethereum.org/2025/07/08/partial-history-exp). Tím byla odstraněna historie starší než [Sloučení](https://ethereum.org/roadmap/merge/), aby se snížil prostor na disku požadovaný operátory uzlů, protože Ethereum stále roste.

Tento EIP je v samostatné sekci od „základních EIP“, protože fork ve skutečnosti neimplementuje žádné změny – je to oznámení, že týmy klientů musí podporovat vypršení platnosti historie do vylepšení Fusaka. Prakticky mohou klienti toto implementovat kdykoli, ale přidání do vylepšení to konkrétně zařadilo na jejich seznam úkolů a umožnilo jim testovat změny vylepšení Fusaka ve spojení s touto funkcí.

**Zdroje**: [Technická specifikace EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Nastavení horních hranic pro MODEXP {#set-upper-bounds-for-modexp}

Doposud předkompilace MODEXP přijímala čísla prakticky jakékoli velikosti. To ztěžovalo testování, usnadňovalo zneužití a představovalo riziko pro stabilitu klienta. EIP-7823 zavádí jasný limit: každé vstupní číslo může mít maximálně 8192 bitů (1024 bajtů). Cokoli většího je zamítnuto, palivo transakce je spáleno a nedochází k žádným změnám stavu. Velmi pohodlně pokrývá reálné potřeby a zároveň odstraňuje extrémní případy, které komplikovaly plánování palivového limitu a bezpečnostní kontroly. Tato změna poskytuje větší bezpečnost a ochranu proti DoS útokům, aniž by to ovlivnilo zážitek uživatele nebo vývojáře.

**Zdroje**: [Technická specifikace EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Strop palivového limitu transakce {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) přidává strop 16 777 216 (2^24) paliva na transakci. Jedná se o proaktivní posílení proti DoS útokům omezením nejhoršího možného nákladu na jakoukoli jednotlivou transakci při zvyšování palivového limitu bloku. Usnadňuje to modelování validace a šíření, což nám umožňuje řešit škálování zvyšováním palivového limitu.

Proč přesně 2^24 paliva? Je to pohodlně menší než dnešní palivový limit, dostatečně velké pro reálné nasazení kontraktů a náročné předkompilace, a mocnina 2 usnadňuje implementaci napříč klienty. Tato nová maximální velikost transakce je podobná průměrné velikosti bloku před vylepšením Pectra, což z ní činí rozumný limit pro jakoukoli operaci na Ethereu.

**Zdroje**: [Technická specifikace EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Zvýšení nákladů na palivo `MODEXP` {#modexp-gas-cost-increase}

MODEXP je vestavěná funkce předkompilace, která počítá modulární umocňování, což je typ matematiky s velkými čísly používaný při ověřování podpisů RSA a v důkazových systémech. Umožňuje kontraktům provádět tyto výpočty přímo, aniž by je musely samy implementovat.

Vývojáři a týmy klientů identifikovali MODEXP jako hlavní překážku pro zvýšení palivového limitu bloku, protože současné ocenění paliva často podceňuje, kolik výpočetního výkonu některé vstupy vyžadují. To znamená, že jedna transakce využívající MODEXP by mohla zabrat většinu času potřebného ke zpracování celého bloku, což by zpomalilo síť.

Tento EIP mění ocenění tak, aby odpovídalo skutečným výpočetním nákladům:

- zvýšením minimálního poplatku z 200 na 500 paliva a odstraněním třetinové slevy z EIP-2565 na obecný výpočet nákladů
- prudším zvyšováním nákladů, když je vstup exponentu velmi dlouhý. pokud je exponent (číslo „mocniny“, které předáváte jako druhý argument) delší než 32 bajtů / 256 bitů, poplatek za palivo stoupá mnohem rychleji za každý další bajt
- účtováním dodatečných nákladů za velkou základnu nebo modulus. Předpokládá se, že ostatní dvě čísla (základna a modulus) mají alespoň 32 bajtů – pokud je jedno z nich větší, náklady rostou v poměru k jeho velikosti

Díky lepšímu sladění nákladů se skutečnou dobou zpracování již MODEXP nemůže způsobit, že by validace bloku trvala příliš dlouho. Tato změna je jednou z několika, které mají za cíl umožnit bezpečné zvýšení palivového limitu bloku Etherea v budoucnu.

**Zdroje**: [Technická specifikace EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limit velikosti exekučního bloku RLP {#rlp-execution-block-size-limit}

Tím se vytváří strop pro velikost bloku – jedná se o limit toho, co se _posílá_ po síti, a je oddělen od palivového limitu, který omezuje _práci_ uvnitř bloku. Strop velikosti bloku je 10 MiB, s malou rezervou (2 MiB) vyhrazenou pro data konsenzu, aby se vše vešlo a čistě šířilo. Pokud se objeví větší blok, klienti jej odmítnou.
Je to nutné, protože velmi velké bloky se déle šíří a ověřují po síti a mohou vytvářet problémy s konsenzem nebo být zneužity jako vektor DoS útoku. Také gossip vrstvy konsenzu již nepředává bloky větší než ~10 MiB, takže sladění exekuční vrstvy s tímto limitem zabraňuje podivným situacím, kdy je blok „viděn některými, ale zahozen jinými“.

Podrobnosti: jedná se o strop velikosti exekučního bloku kódovaného pomocí [RLP](/developers/docs/data-structures-and-encoding/rlp/). Celkem 10 MiB, s 2 MiB bezpečnostní rezervou vyhrazenou pro rámování beacon-bloku. Prakticky klienti definují

`MAX_BLOCK_SIZE = 10 485 760` bajtů a

`SAFETY_MARGIN = 2 097 152` bajtů,

a odmítají jakýkoli exekuční blok, jehož RLP datová část přesahuje

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Cílem je omezit nejhorší možnou dobu šíření/validace a sladit se s chováním gossipu vrstvy konsenzu, čímž se sníží riziko reorganizace/DoS útoku bez změny účtování paliva.

**Zdroje**: [Technická specifikace EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Nastavení výchozího palivového limitu na 60 milionů {#set-default-gas-limit-to-60-million}

Před zvýšením palivového limitu z 30 M na 36 M v únoru 2025 (a následně na 45 M) se tato hodnota od Sloučení (září 2022) nezměnila. Cílem tohoto EIP je učinit konzistentní škálování prioritou.

EIP-7935 koordinuje týmy EL klientů, aby zvýšily výchozí palivový limit nad dnešních 45 M pro vylepšení Fusaka. Je to informační EIP, ale explicitně žádá klienty, aby testovali vyšší limity na devnetech, dohodli se na bezpečné hodnotě a tuto hodnotu zahrnuli do svých vydání pro Fusaka.

Plánování na devnetech cílí na zátěž ~60 M (plné bloky se syntetickou zátěží) a iterativní navyšování; výzkum říká, že nejhorší patologie velikosti bloku by se neměly projevit pod ~150 M. Zavádění by mělo být spárováno se stropem palivového limitu transakce (EIP-7825), aby žádná jednotlivá transakce nemohla dominovat při zvyšování limitů.

**Zdroje**: [Technická specifikace EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Zlepšení UX {#improve-ux}

#### Deterministický pohled na navrhovatele {#deterministic-proposer-lookahead}

S EIP-7917 bude Beacon Chain vědět o nadcházejících navrhovatelích bloků pro další epochu. Mít deterministický pohled na to, kteří validátoři budou navrhovat budoucí bloky, může umožnit [předběžná potvrzení](https://ethresear.ch/t/based-preconfirmations/17353) – závazek s nadcházejícím navrhovatelem, který zaručuje, že uživatelská transakce bude zahrnuta do jeho bloku bez čekání na skutečný blok.

Tato funkce přináší výhody implementacím klientů a zabezpečení sítě, protože zabraňuje okrajovým případům, kdy by validátoři mohli manipulovat s plánem navrhovatelů. Pohled dopředu také umožňuje snížit složitost implementace.

**Zdroje**: [Technická specifikace EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Operační kód pro počítání úvodních nul (CLZ) {#count-leading-zeros-opcode}

Tato funkce přidává malou instrukci EVM, **počet úvodních nul (CLZ)**. Téměř vše v EVM je reprezentováno jako 256bitová hodnota – tento nový operační kód vrací, kolik nulových bitů je na začátku. Jedná se o běžnou funkci v mnoha architekturách instrukčních sad, protože umožňuje efektivnější aritmetické operace. V praxi to zhušťuje dnešní ručně vytvořené skenování bitů do jednoho kroku, takže nalezení prvního nastaveného bitu, skenování bajtů nebo parsování bitových polí se stává jednodušším a levnějším. Operační kód je levný, má pevné náklady a byl benchmarkován tak, aby byl na stejné úrovni jako základní sčítání, což zkracuje bajtkód a šetří palivo pro stejnou práci.

**Zdroje**: [Technická specifikace EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Předkompilace pro podporu křivky secp256r1 {#secp256r1-precompile}

Zavádí vestavěný ověřovač podpisů secp256r1 (P-256) ve stylu passkey na pevné adrese `0x100`, který používá stejný formát volání, jaký již přijaly mnohé L2, a opravuje okrajové případy, takže kontrakty napsané pro tato prostředí fungují na L1 bez změn.

Vylepšení UX! Pro uživatele to odemyká podepisování nativní pro zařízení a passkeys. Peněženky se mohou přímo napojit na Apple Secure Enclave, Android Keystore, hardwarové bezpečnostní moduly (HSM) a FIDO2/WebAuthn – bez bezpečnostní fráze, s plynulejším onboardingem a vícefaktorovými toky, které působí jako moderní aplikace. Výsledkem je lepší UX, snazší obnova a vzory abstrakce účtu, které odpovídají tomu, co již dělají miliardy zařízení.

Pro vývojáře přijímá 160bajtový vstup a vrací 32bajtový výstup, což usnadňuje portování stávajících knihoven a kontraktů L2. Pod kapotou obsahuje kontroly bodu v nekonečnu a modulární porovnání, aby se eliminovaly záludné okrajové případy bez narušení platných volajících.

**Zdroje**:

- [Technická specifikace EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Více o RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Poznámka: EIP-7951 nahradil RIP-7212)_

### Meta {#meta}

#### Metoda JSON-RPC `eth_config` {#eth-config}

Toto je volání JSON-RPC, které vám umožňuje zeptat se vašeho uzlu, jaká nastavení forku používáte. Vrací tři snímky: `current`, `next` a `last`, takže validátoři a monitorovací nástroje mohou ověřit, že klienti jsou připraveni na nadcházející fork.

Prakticky řečeno, jde o řešení nedostatku objeveného, když fork Pectra byl spuštěn na testovací síti Holesky na začátku roku 2025 s drobnými chybami v konfiguraci, což vedlo k nefinalizujícímu stavu. To pomáhá testovacím týmům a vývojářům zajistit, že se velké forky budou chovat podle očekávání při přechodu z devnetů na testovací sítě a z testovacích sítí na hlavní síť.

Snímky zahrnují: `chainId`, `forkId`, plánovaný čas aktivace forku, které předkompilace jsou aktivní, adresy předkompilací, závislosti systémových kontraktů a plán blobů forku.

Tento EIP je v samostatné sekci od „základních EIP“, protože fork ve skutečnosti neimplementuje žádné změny – je to oznámení, že týmy klientů musí tuto metodu JSON-RPC implementovat do vylepšení Fusaka.

**Zdroje**: [Technická specifikace EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Nejčastější dotazy {#faq}

### Ovlivňuje toto vylepšení všechny uzly a validátory Etherea? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ano, vylepšení Fusaka vyžaduje aktualizace jak [exekučních klientů, tak koncenzus klientů](/developers/docs/nodes-and-clients/). Všechny hlavní klienty Etherea vydají verze podporující hard fork označený jako vysoce prioritní. Můžete sledovat, kdy budou tyto verze k dispozici v repozitářích Githubu klientů, na jejich [kanálech Discord](https://ethstaker.org/support), na [Discordu EthStaker](https://dsc.gg/ethstaker) nebo přihlášením k odběru blogu Etherea pro aktualizace protokolu. Aby operátoři uzlů po vylepšení udrželi synchronizaci se sítí Ethereum, musí si ověřit, že používají podporovanou verzi klienta. Nezapomínejte, že informace o vydání upgradů klientů jsou časově citlivé, a uživatelé by měli sledovat nejnovější aktualizace pro nejaktuálnější podrobnosti.

### Jak mohu posílat ETH po hard forku? {#how-can-eth-be-converted-after-the-hardfork}

- **S vašimi prostředky nemusíte nic dělat**: Po vylepšení Ethereum Fusaka není potřeba ETH převádět nebo vylepšovat. Zůstatky na vašem účtu se nezmění a ETH, které aktuálně držíte, zůstanou po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **Každý, kdo vás vyzývá k „upgradu“ vašich ETH, se vás snaží podvést.** V souvislosti s tímto vylepšením nemusíte podnikat žádné kroky. Vaše aktiva zůstanou nedotčena. Pamatujte, že informovanost je nejlepší obranou proti podvodům.

[Více o rozpoznávání a vyhýbání se podvodům](/security/)

### Co s těmi zebrami? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra je vývojáři zvolený „maskot“ vylepšení Fusaka, protože její pruhy odrážejí sloupcové vzorkování dostupnosti dat v PeerDAS, kde uzly spravují určité podstavy sloupců a vzorkují několik dalších sloupců z každého peer slotu, aby zkontrolovaly, zda jsou data blobu dostupná.

Sloučení v roce 2022 [použilo pandu](https://x.com/hwwonx/status/1431970802040127498) jako svého maskota, aby signalizovalo spojení exekuční a konsenzuální vrstvy. Od té doby byli pro každý fork neformálně zvoleni maskoti a objevují se jako ASCII art v logách klientů v době vylepšení. Je to jen zábavný způsob, jak to oslavit.

### Jaká vylepšení jsou zahrnuta pro škálování L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) je hlavní funkcí forku. Implementuje vzorkování dostupnosti dat (DAS), které odemyká větší škálovatelnost pro rollupy, teoreticky škáluje prostor pro bloby až 8krát oproti současné velikosti. Trh s poplatky za bloby bude také vylepšen, aby efektivně reagoval na přetížení a zaručil, že L2 zaplatí smysluplný poplatek za výpočetní výkon a prostor, které bloby pro uzly představují.

### Jak se liší BPO forky? {#how-are-bpo-forks-different}

Forky pouze s parametry blobů poskytují mechanismus pro neustálé zvyšování počtu blobů (jak cílového, tak maximálního) po aktivaci PeerDAS, aniž by bylo nutné čekat na plné koordinované vylepšení. Každé zvýšení je napevno předkonfigurováno ve vydáních klientů podporujících Fusaka.

Jako uživatel nebo validátor nemusíte aktualizovat své klienty pro každé BPO a stačí se ujistit, že sledujete hlavní hardforky jako Fusaka. Je to stejná praxe jako dříve, nejsou potřeba žádné zvláštní akce. Stále se doporučuje monitorovat vaše klienty kolem vylepšení a BPO a udržovat je aktualizované i mezi hlavními vydáními, protože opravy nebo optimalizace mohou následovat po hardforku.

### Jaký je plán BPO? {#what-is-the-bpo-schedule}

Přesný plán aktualizací BPO bude stanoven s vydáními Fusaka. Sledujte [Oznámení o protokolu](https://blog.ethereum.org/category/protocol) a poznámky k vydání vašich klientů.

Příklad, jak by to mohlo vypadat:

- Před vylepšením Fusaka: cíl 6, max 9
- Při aktivaci vylepšení Fusaka: cíl 6, max 9
- BPO1, několik týdnů po aktivaci Fusaka: cíl 10, max 15, zvýšení o dvě třetiny
- BPO2, několik týdnů po BPO1: cíl 14, max 21

### Sníží to poplatky na Ethereu (první vrstva)? {#will-this-lower-gas}

Toto vylepšení nesnižuje poplatky za palivo na L1, alespoň ne přímo. Hlavním zaměřením je více prostoru pro bloby pro data rollupů, což snižuje poplatky na druhé vrstvě. To může mít některé vedlejší účinky na trh s poplatky na L1, ale neočekává se žádná významná změna.

### Jako staker, co musím pro vylepšení udělat? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Jako u každého vylepšení sítě se ujistěte, že aktualizujete své klienty na nejnovější verze označené podporou Fusaka. Sledujte aktualizace v mailing listu a [Oznámení o protokolu na blogu EF](https://blog.ethereum.org/category/protocol), abyste byli informováni o vydáních.
Pro ověření vašeho nastavení před aktivací Fusaka na hlavní síti můžete spustit validátor na testovacích sítích. Fusaka je [aktivována dříve na testovacích sítích](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), což vám dává více prostoru, abyste se ujistili, že vše funguje, a nahlásili chyby. Forky na testovací síti jsou také oznamovány v mailing listu a na blogu.

### Ovlivňuje „Deterministický pohled na navrhovatele“ (EIP-7917) validátory? {#does-7917-affect-validators}

Tato změna nemění fungování vašeho klienta validátora, nicméně poskytne více vhledu do budoucnosti vašich povinností validátora. Ujistěte se, že aktualizujete své monitorovací nástroje, abyste drželi krok s novými funkcemi.

### Jak Fusaka ovlivňuje požadavky na šířku pásma pro uzly a validátory? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS přináší významnou změnu v tom, jak uzly přenášejí data blobů. Všechna data jsou rozdělena na části zvané sloupce napříč 128 podsítěmi, přičemž uzly se přihlašují pouze k některým z nich. Množství sloupců podsítí, které musí uzly spravovat, závisí na jejich konfiguraci a počtu připojených validátorů. Skutečné požadavky na šířku pásma budou záviset na množství povolených blobů v síti a typu uzlu. V okamžiku aktivace vylepšení Fusaka zůstává cíl blobů stejný jako předtím, ale s PeerDAS mohou operátoři uzlů zaznamenat snížení využití disku pro bloby a síťového provozu. Jakmile BPO nakonfigurují vyšší počet blobů v síti, potřebná šířka pásma se s každým BPO zvýší.

Požadavky na uzly jsou i po BPO vylepšení Fusaka stále v [doporučených mezích](https://eips.ethereum.org/EIPS/eip-7870).

#### Plné uzly {#full-nodes}

Běžné uzly bez jakýchkoli validátorů se přihlásí pouze ke 4 podsítím, což zajišťuje správu 1/8 původních dat. To znamená, že se stejným množstvím dat blobů by šířka pásma uzlu pro jejich stahování byla osmkrát (8x) menší. Využití disku a šířka pásma pro stahování blobů pro normální plný uzel by se mohly snížit o přibližně 80 %, na pouhých několik Mb.

#### Sólo stakeři {#solo-stakers}

Pokud je uzel používán pro klienta validátora, musí spravovat více sloupců a tedy zpracovávat více dat. S přidaným validátorem se uzel přihlašuje k alespoň 8 sloupcovým podsítím a proto zpracovává dvakrát více dat než běžný uzel, ale stále méně než před vylepšením Fusaka. Pokud je zůstatek validátora nad 287 ETH, bude se přihlašovat k dalším a dalším podsítím.

Pro solo stakera to znamená, že se jeho využití disku a šířka pásma pro stahování sníží o přibližně 50 %. Nicméně pro lokální vytváření bloků a nahrávání všech blobů do sítě je zapotřebí větší šířka pásma pro nahrávání. Lokální tvůrci budou potřebovat 2–3krát vyšší šířku pásma pro nahrávání než předtím v době vylepšení Fusaka a s cílem BPO2 15/21 blobů bude konečná potřebná šířka pásma pro nahrávání muset být přibližně 5krát vyšší, tedy 100 Mpbs.

#### Velcí validátoři {#large-validators}

Počet přihlášených podsítí roste s větším zůstatkem a větším počtem validátorů připojených k uzlu. Například při zůstatku kolem 800 ETH uzel spravuje 25 sloupců a bude potřebovat o přibližně 30 % více šířky pásma pro stahování než předtím. Potřebná šířka pásma pro nahrávání roste podobně jako u běžných uzlů a je zapotřebí alespoň 100 Mbps.

Při 4096 ETH, 2 validátoři s maximálním zůstatkem, se uzel stává „superuzlem“, který spravuje všechny sloupce, tedy stahuje a ukládá vše. Tyto uzly aktivně léčí síť tím, že přispívají chybějícími daty, ale také vyžadují mnohem větší šířku pásma a úložiště. S konečným cílem pro bloby 6krát vyšším než předtím budou muset super uzly ukládat přibližně 600 GB dalších dat blobů a mít rychlejší trvalou šířku pásma pro stahování kolem 20 Mbps.

[Přečtěte si více podrobností o očekávaných požadavcích.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Jaké změny v EVM jsou implementovány? {#what-evm-changes-are-implemented}

Fusaka upevňuje EVM novými drobnými změnami a funkcemi.

- Pro bezpečnost při škálování bude maximální velikost jedné transakce [omezena na 16,7 milionu](https://eips.ethereum.org/EIPS/eip-7825) jednotek paliva.
- [Nový operační kód pro počítání úvodních nul (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) je přidán do EVM a umožní jazykům chytrých kontraktů provádět určité operace efektivněji.
- [Náklady na předkompilaci `ModExp` budou zvýšeny](https://eips.ethereum.org/EIPS/eip-7883) – kontrakty, které ji používají, budou za exekuci účtovat více paliva.

### Jak nový limit paliva 16M ovlivňuje vývojáře kontraktů? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka zavádí limit na [maximální velikost jedné transakce na 16,7 milionu](https://eips.ethereum.org/EIPS/eip-7825) (2^24) jednotek paliva. To je přibližně předchozí velikost průměrného bloku, což je dostatečně velké na to, aby to pojalo složité transakce, které by spotřebovaly celý blok. Tento limit vytváří ochranu pro klienty, čímž zabraňuje potenciálním DoS útokům v budoucnu s vyšším palivovým limitem bloku. Cílem škálování je umožnit, aby se do blockchainu dostalo více transakcí, aniž by jediná spotřebovala celý blok.

Běžné uživatelské transakce jsou daleko od dosažení tohoto limitu. Tato změna může ovlivnit určité okrajové případy, jako jsou velké a složité operace DeFi, nasazení velkých chytrých kontraktů nebo dávkové transakce cílící na více kontraktů. Tyto transakce budou muset být rozděleny na menší nebo optimalizovány jiným způsobem. Před odesláním transakcí, které potenciálně dosahují limitu, použijte simulaci.

Metoda RPC `eth_call` není omezena a umožní simulaci větších transakcí, než je skutečný limit blockchainu. Skutečný limit pro metody RPC může být nakonfigurován operátorem klienta, aby se zabránilo zneužití.

### Co znamená CLZ pro vývojáře? {#what-clz-means-for-developers}

Kompilátory EVM jako Solidity budou implementovat a využívat novou funkci pro počítání nul pod kapotou. Nové kontrakty mohou těžit z úspor paliva, pokud se spoléhají na tento typ operace. Sledujte vydání a oznámení funkcí jazyka chytrých kontraktů pro dokumentaci o potenciálních úsporách.

### Jsou nějaké změny pro mé stávající chytré kontrakty? {#what-clz-means-for-developers}

Fusaka nemá žádný přímý vliv, který by narušil jakékoli stávající kontrakty nebo změnil jejich chování. Změny zavedené do exekuční vrstvy jsou provedeny se zpětnou kompatibilitou, nicméně vždy sledujte okrajové případy a potenciální dopad.

[Se zvýšenými náklady na předkompilaci `ModExp`](https://eips.ethereum.org/EIPS/eip-7883) budou kontrakty, které na ní závisí, spotřebovávat více paliva pro exekuci. Pokud se váš kontrakt na toto silně spoléhá a stává se pro uživatele dražším, zvažte, jak je využíván.

Zvažte [nový limit 16,7 milionu](https://eips.ethereum.org/EIPS/eip-7825), pokud by transakce provádějící vaše kontrakty mohly dosahovat podobné velikosti.

## Další čtení {#further-reading}

- [Plán Etherea](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Meta EIP Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Oznámení o testovací síti Fusaka na blogu](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: What Fusaka & Pectra will bring Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereum's Next Upgrades: Fusaka, Glamsterdam & Beyond with Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Explained](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
