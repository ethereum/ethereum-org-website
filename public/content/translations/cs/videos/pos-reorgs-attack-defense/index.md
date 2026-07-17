---
title: "Hra reorganizací v Ethereu s důkazem podílem (PoS)"
description: "Caspar Schwarz-Schilling představuje výzkum útoků pomocí reorganizace bloků v Ethereu s důkazem podílem (PoS), pokrývající vektory útoků, obranné mechanismy a zavedená zmírnění na úrovni protokolu."
lang: cs
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "Reorganizace v PoS"
---

Tato prezentace zkoumá typy reorganizací bloků (reorgů), které jsou možné v Ethereu s důkazem podílem (PoS), a zmírnění navržená k jejich prevenci. Caspar Schwarz-Schilling, výzkumník ze skupiny Robust Incentives Group v Nadaci Ethereum, prochází mechanismy ex-post a ex-ante reorganizací a porovnává bezpečnostní prostředí mezi důkazem prací (PoW) a důkazem podílem (PoS).

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=xcPxwhrg3Ao) zveřejněného konferencí LisCon. Pro lepší čitelnost byl lehce upraven.*

#### Úvod a kontext (0:03) {#introduction-and-background-003}

Takže vítejte. Dnes budu mluvit o reorganizacích (reorzích), které jsou možné v Ethereu s důkazem podílem (PoS).

Nedávno jsem se připojil k Nadaci Ethereum, konkrétně ke skupině Robust Incentives Group. V podstatě jsme výzkumný tým zaměřený na cokoliv, co se týká pobídek. Vezmu to stručně — tato přednáška je nabitá informacemi a většinu naší práce najdete na GitHubu.

#### Dva typy reorganizací (0:44) {#two-types-of-reorgs-044}

Dnes chci mluvit o reorganizacích a konkrétně chci nastínit dva různé typy reorgů, které jsou možné v prostředí Etherea s důkazem podílem (PoS).

Na jedné straně máme **ex-post reorganizace** a na druhé straně **ex-ante reorganizace**. Odpusťte mi to trochu nabubřelé latinské pojmenování, ale plní svůj účel.

Ex-post reorganizace jsou zhruba to, co si obvykle představíme, když mluvíme o reorzích. Útočník vidí blok — pokud je cenný, může se pokusit ho reorganizovat. Takže na tomto diagramu vidíme, že blok N+1 je blok, který chce útočník reorganizací odstranit, a tím, že staví na stejném rodičovském bloku N, pokud to vyjde, je blok N+3 následně postaven na bloku N+2. To je běžná praxe.

Ex-ante reorganizace jsou trochu jiné. Myšlenka je taková, že útočník musí zahájit útok ještě předtím, než vůbec ví, jaký blok bude reorganizovat. Jak to zhruba funguje? Velmi zjednodušeně řečeno, blok N+1 je postaven na bloku N, ale není okamžitě zveřejněn. Poctivé uzly ani nevědí, že N+1 existuje, a tak budou dál stavět na N. Poté je prostřednictvím nějakého mechanismu N+1 zveřejněn a N+3 může vidět, že N+1 vede, a stavět na něm, takže N+2 je ve skutečnosti reorganizací odstraněn.

Možná se ptáte, proč byste vůbec chtěli dělat tento typ reorganizace. No, stále je tu MEV, které lze získat. Pokud máte štěstí, blok N+2 má spoustu MEV — můžete ho získat prostým zkopírováním obsahu tohoto bloku. V nejhorším případě máte v podstatě k dispozici transakce ze dvou slotů, kterým můžete naslouchat.

#### Ex-post reorganizace v důkazu prací (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Než se ponoříme do ex-ante reorganizací, což je hlavní téma této přednášky, dovolte mi stručně shrnout ex-post reorganizace a začít zejména kontextem důkazu prací (PoW).

V podstatě jde o shrnutí blogového příspěvku od obvyklých podezřelých — Georgiose a Vitalika. Běžte si ho přečíst, je skvělý.

Stručně řečeno, v Ethereu s důkazem prací (PoW) jsou ex-post reorganizace těžké, ale nejsou neproveditelné. Těžař s 10 % výkonu má poměrně dobrou šanci vytěžit několik bloků v řadě, a pokud je pobídka dostatečně vysoká — představte si, že je tu jeden blok se 100 ETH v MEV k získání — pak může i jednoprocentní úspěšnost stačit k tomu, aby se pokus o reorganizaci vyplatil.

#### Ex-post reorganizace v důkazu podílem (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

V důkazu podílem (PoS) je to úplně jiná liga. Bavíme se o absurdním množství požadovaného staku. Provedu vás tím, jak by se na to dalo jít, jen abych zdůraznil, jak směšně obtížné to je.

Možná nejdřív nějaké základy. Čas v Ethereu s důkazem podílem (PoS) plyne ve slotech. Každý slot je dlouhý 12 sekund. V každém slotu jsou dvě role: máte navrhovatele — přesně jednoho navrhovatele — a výbor tisíců atestujících, kteří mají za úkol atestovat bloky, o kterých slyší na P2P vrstvě. Určují vrchol řetězce spuštěním volby forku (fork choice), což je v podstatě funkce, která vezme strom bloků jako vstup a vrátí vám vrchol řetězce.

Máte atestovat bloky, pokud slyšíte platný blok, nebo čtyři sekundy po začátku slotu — podle toho, co nastane dříve. Takže pokud je z nějakého důvodu navrhovatel bloku N+1 offline a čtyři sekundy po začátku slotu není žádný blok, atestujete blok N. Pokud ho slyšíte včas, atestujete blok N+1. Jednoduché.

Všechny tyto atestace dávají blokům váhu a tuto váhu používá volba forku k určení, co je nejnovějším vrcholem.

Nyní si projděme reorganizaci jednoho bloku. Na začátku jde vše jako obvykle — všichni atestují blok N, dokonce i útočník. Pak je N+1 postaven na N, a protože útočník nechce dát váhu bloku, který se snaží reorganizací odstranit, atestuje místo toho blok N. Blok N získává velkou váhu, protože útočník má dvě třetiny výboru — což znamená, že musí ovládat zhruba dvě třetiny celkového staku.

Jedna třetina poctivých účastníků atestovala N+1, dvě třetiny N. Nyní přichází blok N+2 — útočník ho samozřejmě staví na N a atestuje svůj vlastní blok. Z pohledu poctivých validátorů N+1 stále vede z hlediska váhy, protože jak N+1, tak N+2 dědí celou váhu bloku N, ale N+1 má navíc tuto jednu třetinu atestací, která bloku N+2 chybí.

Když to sečteme — blok N+1 má atestace v hodnotě jedné třetiny plus jedné třetiny, což dává dvě třetiny, a blok N+2 má také dvě třetiny. Pro zjednodušení předpokládejme, že rozhodnutí při shodě (tiebreak) dopadne ve prospěch útočníka. Pak N+3 uvidí N+2 jako vedoucí a bude stavět na něm.

Abyste měli představu, jak absurdní tyto předpoklady jsou — i kdybyste měli stakera s 65 %, pravděpodobnost, že budete ovládat dvě třetiny výboru v jakémkoli daném slotu, je 0,05 %. To ukazuje, že síla paralelních atestací je skutečná — ex-post reorganizace jsou v Ethereu s důkazem podílem (PoS) neuvěřitelně obtížné, ne-li prakticky nemožné.

#### Mechanika útoku ex-ante reorganizace (7:34) {#ex-ante-reorg-attack-mechanics-734}

Nyní budu mluvit o ex-ante reorganizacích. Tento útok je založen na článku od Neudera a dalších. Nedávno jsme tento útok výrazně vylepšili. Také jsme o tom napsali článek a stihli ho nahrát na arXiv právě včas.

A hned na úvod — nebojte se, existují zmírnění. Budou začleněna ještě před Merge.

Jak funguje útok ex-ante reorganizace? Zpočátku blok N — vše jde jako obvykle, všichni ho atestují. Nyní jste navrhovatelem N+1. Navrhnete ho a soukromě ho atestujete pomocí jediného validátoru. Důležité je, že ho udržíte v soukromí — nezveřejníte ho a nešíříte ho na P2P vrstvě.

Stane se to, že poctiví lidé nevidí blok N+1, takže budou atestovat blok N. V tom spočívá ten trik — zdědíte tuto váhu a nemusíte s ní ve skutečnosti bojovat.

Pro tuto chvíli předpokládejme nulovou latenci. Ve slotu N+2 jako útočník uděláme to, že zveřejníme blok N+1 a soukromou atestaci současně. Poctiví validátoři ve slotu N+2 musí atestovat blok. Ze svého pohledu vidí blok N+2 a blok N+1 s touto jednou soukromou atestací. Pokud spustí volbu forku, zjistí, že blok N+1 má větší váhu než blok N+2, protože N+1 má soukromou atestaci, kterou N+2 nemá. Dokonce i všichni poctiví validátoři ve skutečnosti atestují blok N+1. Ve slotu N+3 bude N+1 triviálně považován za vrchol řetězce.

#### Síťová latence a útok (10:25) {#network-latency-and-the-attack-1025}

Předpokládal jsem nulovou latenci, což tak samozřejmě nefunguje. Existuje latence — šíření bloků a zpráv na P2P vrstvě nějakou dobu trvá.

Způsob, jakým může útočník stále provést tento typ útoku, spočívá v tom, že má mnoho uzlů na různých místech v P2P topologii. Když poctivý navrhovatel ve slotu N+2 navrhne tento blok, dozvíte se o tom velmi brzy v procesu šíření. V důsledku toho můžete zveřejnit svůj soukromý blok ze všech těchto různých míst tak, že většina uslyší o bloku N+1 dříve, než uslyší o bloku N+2 — což znamená, že uvidí, že blok N+1 vede ve váze, a skutečně ho atestují.

Abychom znovu zdůraznili, co se zde děje: máme navrhovatele s jediným atestujícím, kterému se podaří provést reorganizaci jednoho bloku. Přinejmenším to není ideální.

#### Vyvažovací strategie pro delší reorganizace (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Pokud chcete být sofistikovanější, můžete provést delší reorganizace pomocí vyvažovací strategie. Myšlenkou je rozdělit poctivý výbor do různých pohledů na řetězec.

Zveřejníte svůj soukromý blok takovým způsobem, že zhruba polovina poctivých uzlů uslyší o vašem soukromém bloku a atestaci dříve, než uslyší o bloku N+2 — takže atestují váš blok. U druhé poloviny chcete, aby váš blok neslyšeli dříve, než atestují N+2.

Nyní máte polovinu poctivého výboru, která atestuje N+1, a druhou polovinu, která atestuje N+2. Jak to pomůže? Poctivý výbor se nyní navzájem vyruší a vy jako útočník s nimi ani nemusíte bojovat — což je v podstatě splněný sen útočníka.

Projděme si diagram: blok N jako obvykle, blok N+1 — stejný příběh, nezveřejníte ho. Poctiví validátoři atestují blok N. Objeví se blok N+2, slyšíte ho brzy a zveřejníte blok N+1 s jednou atestací — „rozhodujícím hlasem“ — takovým způsobem, že polovina poctivého výboru ho vidí předtím a polovina potom. Polovina hlasuje pro N+1, druhá polovina pro N+2. Ve skutečnosti chcete rozdělení s rozdílem jednoho hlasu tak, aby N+2 měl o jednu atestaci více, takže N+3 staví na N+2 a udržuje reorganizaci v chodu.

K dokončení reorganizace dvou bloků: je navržen blok N+3, slyšíte ho brzy, zveřejníte blok N+1 a své dvě zbývající atestace, čímž zaplavíte P2P vrstvu, takže většina poctivých lidí hlasuje pro blok N+1 — tak, že má větší váhu než blok N+3 a N+4 je postaven na bloku N+1.

Když se nad tím zamyslíte, je za těchto předpokladů poměrně levné tyto reorganizace provádět. I když nemáte dokonalá rozdělení, protože P2P vrstva je tak velká, máte rozdělení pravděpodobnosti, na které můžete cílit tak, že náklady na útok rostou s druhou odmocninou velikosti výboru.

#### Zmírnění pomocí zvýhodnění navrhovatele (15:17) {#proposer-boost-mitigation-1517}

Pojďme se bavit o zmírnění. Jaká je základní myšlenka? Dáme navrhovateli trochu více moci. Pokud platný blok dorazí včas, zvýšíme váhu tohoto bloku po dobu trvání slotu. Po skončení tohoto slotu obnovíme obvyklé skóre LMD-GHOST a vše pokračuje jako obvykle.

Takže pokud je blok N+2 navržen včas a je platný, bude mít tento blok zvýhodnění navrhovatele — řekněme 80 % velikosti výboru. Nyní tato roztomilá malá atestace N+1 od útočníka nebude stačit. V žádném případě.

Vyvažování už také nefunguje, protože máte rozdělení 50/50, ale zvýhodnění navrhovatele to vždy převáží jedním směrem. Neexistuje způsob, jak byste mohli toto rozdělení 50/50 udržet.

Myšlenka je taková, že s tímto zavedeným zmírněním musí atestace protivníka soutěžit se zvýhodněním navrhovatele, aby přesvědčily poctivé validátory hlasovat podle jejich představ. To narušuje vyvažovací strategie a v podstatě zcela znemožňuje všechny reorganizace. Dobrá zpráva — existuje otevřený PR (Pull Request), takže to bude v podstatě začleněno ještě před Merge.

#### Klíčové poznatky (16:48) {#key-takeaways-1648}

Několik klíčových poznatků. Mluvil jsem o rozdílech mezi ex-post a ex-ante reorganizacemi. Stručně jsem nastínil různá prostředí pro reorganizace v důkazu prací (PoW) oproti důkazu podílem (PoS). Ukázal jsem vám, jak provést ex-ante reorganizaci, ale také, což je důležité, jak ji opravit.

Pokud vás to zajímá, existuje o tom článek — mnohem podrobnější, s více nuancemi. Snímky z prezentace budou nahrány. Přijďte si se mnou promluvit, pokud máte zájem, a najdete mě také na Twitteru.

Doufám, že to pro vás bylo zajímavé. Mnohokrát děkuji.