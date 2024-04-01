---
title: Maximálisan kinyerhető érték (MEV)
description: Bevezetés a maximálisan kinyerhető érték (MEV) lényegébe
lang: hu
---

A maximális kinyerhető érték (MEV) arra utal, hogy a blokk létrehozásából kapható sztenderd blokkjutalmon és a gázdíjakon felül plusz értéket lehet szerezni a tranzakciók blokkba helyezésével, kizárásával és a sorrendek megváltoztatásával.

## Bányászattal kivonható érték {#miner-extractable-value}

A maximálisan kinyerhető értéket először a [proof-of-work (munkaigazolás)](/developers/docs/consensus-mechanisms/pow/) kontextusában alkalmazták, és ezért „bányászattal kivonható értékként” emlegették. Mivel a proof-of-work esetében a bányászok ellenőrzik a tranzakciók felvételét, kizárását és sorrendjét. [A Beolvadás](/roadmap/merge) során áttértek a proof-of-stake (letéti igazolás) mechanizmusára, és ezeket a szerepeket a validátorok látják el, a bányászat pedig nem része az Ethereum protokolljának. Értékkinyerési módszerek azonban továbbra is léteznek, ezért jelenleg a „maximálisan kinyerhető érték” kifejezést használjuk.

## Előfeltételek {#prerequisites}

A téma könnyebb megértése érdekében érdemes megismeri a [tranzakciókkal](/developers/docs/transactions/), [blokkokkal](/developers/docs/blocks/), [proof-of-stake-kel](/developers/docs/consensus-mechanisms/pos) és [gázzal](/developers/docs/gas/) foglalkozó témákat. Emellett a [dappok](/dapps/) és a [DeFi](/defi/) ismerete szintén hasznos.

## MEV kivonása {#mev-extraction}

Elméletileg a MEV teljes egészében a validátoroknál keletkezik, mivel ők tudják garantálni a profitábilis MEV-lehetőségek végrehajtását. A gyakorlatban a MEV nagy részét független hálózati résztvevők, úgynevezett „keresők” nyerik ki. A keresők komplex algoritmusokat futtatnak a blokkláncadatokon, hogy felismerjék a profitábilis MEV-lehetőségeket, és botok révén automatikusan beküldik ezeket a nyereséges tranzakciókat a hálózatba.

A validátorok megkapják a MEV-összeg egy részét, mivel a keresők hajlandók magas gázdíjat fizetni (a validátornak) azért, hogy a nyereséges tranzakcióik bekerülhessenek egy adott blokkba. Feltételezve, hogy a keresők gazdaságilag racionálisak, a kereső által fizetett gázdíj a kereső MEV-jének legfeljebb 100%-a (mert ha a gázdíj magasabb lenne, pénzt veszítene vele).

Viszont az erősen versenyképes MEV-lehetőségeknél, mint a [DEX arbitrázs](#mev-examples-dex-arbitrage), a keresőknek a teljes MEV-bevétel 90%-át vagy többet kell gázdíjként kifizetniük a validátornak, mivel sokan akarják ugyanazt az arbitrázst lefuttatni. Mivel az arbitrázsügyletük lefutását csak úgy tudják garantálni, ha a legmagasabb gázárral rendelkező tranzakciót adják be.

### Gázgolfozás {#mev-extraction-gas-golfing}

A MEV-vel kapcsolatos dinamika versenyelőnnyé tette a „gázgolfozást” – amikor a tranzakciókat úgy programozzák, hogy a lehető legkevesebb gázt használják –, mivel a keresők magasabb gázárat tudnak megadni, miközben a teljes gázdíjuk állandó (gázdíj = gázár * felhasznált gáz).

Néhány jól ismert gázgolfozási technika: olyan címek használata, amelyek hosszú nullasorozattal kezdődnek (például [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), mivel ezek tárolása kevesebb helyet (így kevesebb gázt) igényel; kis [ERC-20](/developers/docs/standards/tokens/erc-20/) tokenegyenleg meghagyása a szerződésekben, mivel több gázba kerül egy tárolóhely inicializálása (ha az egyenleg 0), mint a frissítése. A gázfelhasználás csökkentésére irányuló technikák kutatása aktív témakörnek számít a keresők körében.

### Általánosított frontrunnerök {#mev-extraction-generalized-frontrunners}

Ahelyett, hogy komplex algoritmusokat programoznának a profitábilis MEV-lehetőségek felderítésére, egyes keresők általánosított frontrunneröket futtatnak. Ezek az általánosított frontrunnerök, amelyek figyelik a memóriakészletet, hogy felismerjék a profitábilis tranzakciókat. A frontrunner lemásolja a potenciálisan nyereséges tranzakció kódját, kicseréli a címeket a frontrunner címére, és helyben lefuttatja a tranzakciót, hogy ellenőrizze, a módosított tranzakció nyereséget eredményez-e. Ha a tranzakció valóban nyereséges, a frontrunner benyújtja a módosított tranzakciót a kicserélt címmel és magasabb gázárral, „megelőzve” az eredeti tranzakciót, és megkapja az eredeti kereső MEV-jét.

### Flashbots {#mev-extraction-flashbots}

A Flashbots egy független projekt, amely a végrehajtási klienseket egy olyan szolgáltatással bővíti, amely lehetővé teszi a keresők számára, hogy MEV-tranzakciókat nyújtsanak be a validátoroknak anélkül, hogy a nyilvános memóriakészlet számára felfednék azokat. Ez megakadályozza, hogy a tranzakciókat általánosított frontrunnerök futtassák.

## Példák a MEV-re {#mev-examples}

A MEV többféleképpen is megjelenik a blokkláncon.

### DEX arbitrázs {#mev-examples-dex-arbitrage}

[A decentralizált tőzsdei (DEX)](/glossary/#dex) arbitrázs a legegyszerűbb és legismertebb MEV-lehetőség. Ennek eredményeképpen a legnépszerűbb is.

Ez a következőképpen működik: ha két DEX két különböző áron kínál egy tokent, valaki megveheti a tokent az alacsonyabb árú DEX-en, és eladhatja a magasabb árú DEX-en egyetlen, atomikus tranzakció keretében. A blokklánc mechanikájának köszönhetően ez valódi, kockázatmentes arbitrázs.

[Íme egy példa](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) egy nyereséges arbitrázs tranzakcióra, ahol egy kereső 1000 ETH-t 1045 ETH-re váltott, kihasználva az ETH/DAI pár eltérő árazását az Uniswapon és a Sushiswapon.

### Likvidációk {#mev-examples-liquidations}

A kölcsönzési protokollok likvidációja egy másik jól ismert MEV-lehetőség.

Az olyan kölcsönzési protokollok, mint a Maker és az Aave megkövetelik, hogy a felhasználók letétbe helyezzenek némi biztosítékot (például ETH-t). Ezt a letétbe helyezett biztosítékot aztán arra használják, hogy kölcsönadják más felhasználóknak.

A felhasználók ezután kölcsönözhetnek eszközöket és tokeneket másoktól attól függően, hogy mire van szükségük (például MKR-t kölcsönözhet, ha szavazni szeretne egy MakerDAO javaslatban), a letétbe helyezett biztosíték bizonyos százalékáig. Például, ha a kölcsönzési összeg legfeljebb 30%, akkor egy felhasználó, aki 100 DAI-t fizet be a protokollba, legfeljebb 30 DAI értékű másik eszközt vehet kölcsön. A protokoll határozza meg a pontos kölcsönzési teljesítmény százalékos arányát.

Ahogy a hitelfelvevő biztosítékának értéke ingadozik, úgy változik a hitelfelvételi képessége is. Ha a piaci ingadozások miatt a kölcsönvett eszközök értéke meghaladja a biztosíték értékének 30%-át (a pontos arányt a protokoll határozza meg), a protokoll általában lehetővé teszi, hogy bárki felszámolja a biztosítékot, azonnal kifizetve a hitelezőknek (hasonló a [pótlólagos fedezetbekéréshez (margin call)](https://www.investopedia.com/terms/m/margincall.asp) a hagyományos finanszírozásban). Likvidáció esetén a hitelfelvevőnek általában magas likvidációs díjat kell fizetnie, amelynek egy része a felszámolóhoz kerül – itt jön a képbe a MEV-lehetőség.

A keresők versenyeznek a blokkláncadatok gyors elemzésében, hogy meghatározzák, mely hitelfelvevőket lehet likvidálni, elsőként nyújtsanak be likvidációs tranzakciót, és szedjék be maguknak a likvidációs díjat.

### Szendvicskereskedelem {#mev-examples-sandwich-trading}

A szendvicskereskedelem a MEV-kivonás másik gyakori módszere.

A szendvicshez a kereső figyeli a memóriakészletet a nagy DEX-üzletekre. Például valaki 10 000 UNI-t akar vásárolni DAI-jal a Uniswapon. Egy ilyen nagyságrendű kereskedés jelentős hatással lesz az UNI/DAI párra, és jelentősen megemelheti az UNI árfolyamát a DAI-hoz képest.

A kereső kiszámíthatja ennek az UNI/DAI párra gyakorolt megközelítő árhatását, és közvetlenül a kereskedés _előtt_ optimális vételi megbízást adhat, olcsón megvásárolva az UNI-t, majd közvetlenül a kereskedés _után_ eladási megbízást adhat, eladva azt a megbízás által okozott magasabb áron.

A szendvicselés azonban kockázatosabb, mivel nem atomikus (ellentétben a fenti DEX-arbitrázzsal), és hajlamos a [szalmonella-támadásra](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

A MEV az NFT-k esetében egy kialakulóban lévő jelenség, és nem feltétlenül nyereséges.

Mivel azonban az NFT tranzakciók ugyanazon a blokkláncon történnek, amelyet az összes többi Ethereum tranzakció megoszt, a keresők az NFT piacon is hasonló technikákat használhatnak, mint a hagyományos MEV-lehetőségeknél.

Például, ha van egy népszerű NFT-kiadás, és egy kereső egy bizonyos NFT-t vagy NFT-készletet szeretne, akkor beprogramozhat egy tranzakciót úgy, hogy ő legyen az első a sorban, vagy egyetlen tranzakcióban megvásárolhatja az egész készletet. Vagy ha egy NFT [tévesen alacsony áron szerepel](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), a kereső megelőzheti a többi vevőt, és olcsón megveheti.

Az NFT MEV egyik kiemelkedő példája az volt, amikor egy kereső 7 millió dollárt költött arra, hogy [megvásárolja](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) az összes Cryptopunkot a legalacsonyabb áron. Egy blokklánckutató [magyarázta a Twitteren](https://twitter.com/IvanBogatyy/status/1422232184493121538), hogy a vevő egy MEV-szolgáltatóval dolgozott, hogy titokban tartsa a vásárlást.

### Hosszú távú lehetőségek (long tail) {#mev-examples-long-tail}

A DEX arbitrázs, a likvidációk és a szendvicskereskedelem nagyon jól ismert MEV-lehetőségek, és nem valószínű, hogy nyereségesek lennének az új keresők számára. Létezik azonban a kevésbé ismert MEV-lehetőségek esetében egy hosszú távú lehetőség (az NFT MEV is ilyen).

Akik most kezdik a keresést, több sikert érhetnek el, ha a long tail szekcióban (kevésbé ismert, kisebb hozammal járó, hosszabb távon használható lehetőségek között) keresnek MEV-et. A Flashbot [MEV-állásbörzéje](https://github.com/flashbots/mev-job-board) felsorol néhány új lehetőséget.

## A MEV hatásai {#effects-of-mev}

A MEV nem feltétlen rossz, pozitív és negatív következményei is vannak az Ethereumban.

### A pozitív hatásai {#effects-of-mev-the-good}

Számos DeFi-projekt gazdaságilag racionális szereplőkre támaszkodik, hogy biztosítsa protokolljaik hasznosságát és stabilitását. Például a DEX arbitrázs biztosítja, hogy a felhasználók a legjobb, legkorrektebb árakat kapják a tokenjeikért, a hitelezési protokollok pedig a gyors likvidációra támaszkodnak, amikor a hitelfelvevők a fedezeti arányok alá esnek, hogy a hitelezők visszakapják a pénzüket.

Ha a racionális keresők nem keresik és javítják a gazdasági hatástalanságokat, és nem használják ki a protokollok gazdasági ösztönzőit, a DeFi protokollok és általában a dappok nem lehetnek olyan erősek, mint jelenleg.

### A negatív hatásai {#effects-of-mev-the-bad}

Az alkalmazási rétegen a MEV egyes formái, mint például a szendvicskereskedelem, egyértelműen rosszabb felhasználói élményt eredményeznek. A szendvicsbe szorított felhasználóknak nagyobb csúszással és rosszabb teljesítéssel kell számolniuk a kereskedéseik során.

A hálózati szinten az általánosított frontrunnerök és az általuk gyakran folytatott gázár-árverések (két vagy több frontrunner versenyez, hogy tranzakciójuk bekerüljön a következő blokkba a gázár fokozatos emelésével) a hálózat túlterheltségét és magas gázárakat eredményeznek másoknak is, akik szabályos tranzakciókat próbál végrehajtani.

A _blokkon belüli_ eseményeken túl a MEV káros hatással lehet _blokkok között_ is. Ha a blokkban elérhető MEV jelentősen meghaladja a sztenderd blokkjutalmat, a validátorokat arra ösztönözhetik, hogy blokkokat szervezzenek át, és a MEV-et maguknak szerezzék meg, ami a blokklánc átrendeződését és a konszenzus instabilitását okozza.

A blokklánc átszervezésének ezt a lehetőségét [a Bitcoin blokkláncon](https://dl.acm.org/doi/10.1145/2976749.2978408) már korábban is vizsgálták. Ahogy a Bitcoin blokkjutalma a felére csökken, és a tranzakciós díjak egyre nagyobb részét teszik ki a blokkjutalomnak, kialakulhat, hogy a bányászoknak gazdaságilag racionális lehet, ha lemondanak a következő blokk jutalmáról, és helyette magasabb díjakkal újrabányásszák a korábbi blokkokat. A MEV növekedésével ugyanez a helyzet állhat elő az Ethereumban is, ami veszélyezteti a blokklánc integritását.

## A MEV jelenlegi helyzete {#state-of-mev}

A MEV-kivonás 2021 elején felpörgött, ami az év első hónapjaiban rendkívül magas gázárakat eredményezett. A Flashbots MEV relay (közvetítő) megjelenése csökkentette az általános frontrunnerök hatékonyságát, és láncon kívülre vitte a gázár-árveréseket, csökkentve a gázárakat a hétköznapi felhasználók számára.

Bár sok kereső még mindig jól keres a MEV-vel, de ahogy a lehetőségek egyre ismertebbek és több kereső versenyez ugyanazért, a validátorok egyre több MEV-bevételt fognak szerezni (a Flashbots-ban is ugyanolyan gázárverések zajlanak, mint a fenti, bár magánjelleggel, és a validátorok az ebből származó gázbevételt kapják meg). A MEV nem csak az Ethereumra jellemző, és mivel egyre nagyobb a verseny, a keresők alternatív blokkláncok, például a Binance Smart Chain felé mozdulnak el, ahol hasonló MEV-lehetőségek léteznek kevesebb versennyel.

Másrészt a proof-of-work-ről a proof-of-stake-re való áttérés és az Ethereum összevont tranzakciókkal történő skálázása olyan módon változtatják meg a MEV-térképet, amely még nem világos. Még nem ismert, hogy a némileg előre ismert blokkelőterjesztők hogyan változtatják meg a MEV-kivonás dinamikáját a proof-of-work valószínűségi modelljéhez képest, vagy hogyan változik, amikor [egyetlen, titkos vezetőválasztás](https://ethresear.ch/t/secret-non-single-leader-election/11789) és [elosztott validátortechnológia](/staking/dvt/) kerül bevezetésre. Még az sem egyértelmű, milyen MEV-lehetőségek lesznek, amikor a felhasználói tevékenységek az Ethereumról áthelyeződnek a második blokkláncrétegre (L2), az összevont tranzakciókra és a szilánkokra.

## MEV az Ethereum proof-of-stake (PoS) mechanizmusában {#mev-in-ethereum-proof-of-stake}

Amint azt kifejtettük, a MEV negatív hatással van az általános felhasználói élményre és a konszenzusszintű biztonságra. Az Ethereumnak a proof-of-stake konszenzusra való áttérése („a Beolvadás”) potenciálisan új, MEV-hez kapcsolódó kockázatokat hoz létre:

### Validátorcentralizáció {#validator-centralization}

A Beolvadás utáni Ethereumban a validátorok (miután 32 ETH értékű letétet helyeztek el) konszenzusra jutnak a Beacon lánchoz hozzáadott blokkok érvényességéről. A 32 ETH sokak számára elérhetetlen lehet, ezért megvalósíthatóbb [egy letéti alaphoz való csatlakozás](/staking/pools/). Mindazonáltal az [önálló letétbe helyezők](/staking/solo/) egészséges eloszlása ideális, mivel enyhíti a validátorok centralizációját és javítja az Ethereum biztonságát.

A MEV-kivonás vélhetően képes felgyorsítani a validátorok centralizációját. Ez részben azért van így, mert a validátorok [kevesebbet keresnek a blokkelőterjesztésért](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply), mint a bányászatért, a MEV-kivonás jelentősen [befolyásolhatja a validátorok bevételeit](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) a Beolvadás után.

A nagyobb letéti alapok valószínűleg több erőforrással rendelkeznek ahhoz, hogy befektessenek a MEV-lehetőségek kihasználásához szükséges optimalizálásokba. Minél több MEV-t termelnek ki ezek a poolok, annál több erőforrásuk van ennek fejlesztésére (és a bevétel növelésére), ami [méretgazdaságosságot](https://www.investopedia.com/terms/e/economiesofscale.asp#) eredményez.

Az önálló letétbe helyezők, akiknek kevesebb erőforrás áll a rendelkezésükre, nem feltétlen tudnak profitálni a MEV-lehetőségekből. Ez növelheti a független validátorokra nehezedő nyomást, hogy erős letéti alapokhoz csatlakozzanak, és így növeljék a bevételüket, ami csökkenti a decentralizációt az Ethereumban.

### Engedélyhez kötött memóriakészletek {#permissioned-mempools}

A szendvics és a frontrunning támadásokra válaszul a kereskedők a tranzakciók titkossága érdekében a láncon kívül is megegyezhetnek a validátorokkal. Ahelyett, hogy a kereskedő a nyilvános memóriakészletbe küldene egy potenciális MEV-tranzakciót, a kereskedő közvetlenül a validátornak küldi azt, aki beemeli egy blokkba, és osztozik a nyereségen a kereskedővel.

Ennek az elrendezésnek egy nagyobb változatai a „sötét alapok”, melyek engedélyhez kötött, csak hozzáférést adó memóriakészletek, amelyek a fizetős felhasználók számára elérhetők. Ez a tendencia csökkentené az Ethereum engedélymentességét és a bizalomigény-mentességet, potenciálisan egy „pay-to-play” (fizetős játék) mechanizmussá alakítaná át, amely a legmagasabb ajánlattevőnek kedvez.

Az engedélyhez kötött memóriakészletek az előző szakaszban leírt centralizációs kockázatokat is felgyorsítják. A több validátort működtető nagy alapok valószínűleg profitálni fognak abból, hogy a kereskedők és a felhasználók számára tranzakciós adatvédelmet kínálnak, növelve ezzel a MEV-bevételeiket.

Ezeknek a MEV-hez kapcsolódó problémáknak a leküzdése a Beolvadás utáni Ethereumban a kutatás egyik fő területe. Két megoldás merült fel, hogy a MEV negatív hatását csökkentsék az Ethereum decentralizációja és biztonsága szempontjából a Beolvadás után: **javaslattevő-építő szétválasztása (PBS)** és az **építő API**.

### Javaslattevő-építő szétválasztása (PBS) {#proposer-builder-separation}

Mind a proof-of-work, mind a proof-of-stake esetében egy csomópont építi a blokkot, majd javasolja azt a konszenzusban részt vevő többi csomópontnak a láncba való felvételre. Egy új blokk akkor válik a kanonikus lánc részévé, ha egy másik bányász ráépít (PoW esetén), vagy ha a validátorok többségétől tanúsítást kap (PoS esetén).

A blokképítő és blokkajánló szerepek kombinációja az, ami a legtöbb MEV-hez kapcsolódó problémát okozza. A konszenzuscsomópontokat például arra ösztönzik, hogy a MEV-bevételek maximalizálása érdekében időzített támadásokban láncátrendezéseket indítsanak el.

A [javaslattevő-építő szétválasztása (PBS)](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) a MEV hatásának mérséklésére szolgál, különösen a konszenzusrétegben. A PBS fő jellemzője a blokképítő és a blokkelőterjesztő szabályainak szétválasztása. A validátorok továbbra is felelősek a blokkok előterjesztéséért és az azokra vonatkozó szavazásért, de a tranzakciók elrendezése és a blokkok építése egy új, specializált entitás, a **blokképítő** feladata.

A PBS keretében egy blokképítő létrehoz egy tranzakciócsomagot, és ajánlatot tesz arra, hogy egy Beacon lánc blokkba bekerüljön, mint végrehajtási csomag (payload). A következő blokk előterjesztésére kiválasztott validátor ezután ellenőrzi az ajánlatokat, és kiválasztja a legmagasabb díjú csomagot. A PBS lényegében egy aukciós piacot hoz létre, ahol az építők tárgyalnak a blokkterületet értékesítő validátorokkal.

A jelenlegi PBS-tervek egy [elköteleződés-feltárás sémát](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) használnak, amelyben az építők csak a blokk tartalmára vonatkozó kriptográfiai elköteleződést (blokkfejléc) teszik közzé az ajánlatukkal. A nyertes ajánlat elfogadása után az ajánlattevő egy aláírt blokkajánlatot készít, amely tartalmazza a blokkfejlécet. A blokképítőnek az aláírt blokkjavaslat megtekintése után közzé kell tennie a teljes blokkot, és a véglegesítés előtt elegendő [tanúsítást](/glossary/#attestation) kell kapnia a validátoroktól.

#### Hogyan enyhíti a javaslattevő-építő szétválasztás a MEV hatását? {#how-does-pbs-curb-mev-impact}

A protokollon belüli javaslattevő-építő szétválasztása csökkenti a MEV konszenzusra gyakorolt hatását azáltal, hogy a MEV-kivonás kikerül a validátorok hatásköréből. Ehelyett a speciális hardvert futtató blokképítők fogják megragadni a jövőben a MEV-lehetőségeket.

Ez azonban nem zárja ki teljesen a validátorokat a MEV-hez kapcsolódó bevételekből, mivel az építőknek magas ajánlatot kell tenniük ahhoz, hogy blokkjaikat a validátorok elfogadják. Mindazonáltal, mivel a validátorok már nem összpontosítanak közvetlenül a MEV-bevételek optimalizálására, csökken az időzített támadások veszélye.

A javaslattevő-építő szétválasztása csökkenti a MEV centralizációs kockázatait is. Például a elköteleződés-feltárás séma megszünteti azt a bizalomkényszert az építők részéről, hogy a validátorok nem lopják el a MEV-lehetőséget, vagy nem juttatják azt más építőnek. Ez csökkenti az akadályokat az önálló letétbe helyezők számára, hogy a MEV előnyeiből részesüljenek, máskülönben az építők inkább a nagy, a láncon kívüli hírnévvel rendelkező alapokat részesítenék előnyben, és láncon kívüli üzleteket kötnének velük.

Hasonlóképpen, a validátoroknak nem kell attól tartani, hogy az építők visszatartanak blokkokat vagy érvényteleneket adnak, mivel a fizetés feltétel nélküli. A validátor díja akkor is feldolgozható, ha a javasolt blokk nem áll rendelkezésre, vagy egy másik validátor érvénytelennek nyilvánítja. Az utóbbi esetben a blokkot egyszerűen elvetik, így a blokképítő elveszíti a tranzakciós díjat és MEV-bevételt.

### Építő API {#builder-api}

Bár a javaslattevő-építő szétválasztás azt ígéri, hogy csökkenti a MEV-kivonás hatásait, a megvalósítása a konszenzusprotokoll módosítását igényli. Konkrétan a Beacon lánc [elágazásválasztási](/developers/docs/consensus-mechanisms/pos/#fork-choice) szabályát kell hozzá frissíteni. Az [építő API](https://github.com/ethereum/builder-specs) egy ideiglenes megoldás, amelynek célja a javaslattevő-építő szétválasztásának megvalósítása, bár magasabb bizalomigénnyel.

Az építő API az [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) módosított változata, amelyet a konszenzusréteg kliensei használnak arra, hogy a végrehajtási réteg klienseitől végrehajtási csomagokat kérjenek. Az [őszintevalidátor-specifikáció](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md) szerint a blokkelőterjesztési feladatokra kiválasztott validátorok tranzakciócsomagot kérnek egy kapcsolódó végrehajtási klienstől, amelyet a javasolt Beacon lánc blokkjába foglalnak.

Az építő API szintén közvetítőként működik a validátorok és a végrehajtási réteg kliensei között; de ez más, mivel lehetővé teszi a Beacon láncon lévő validátoroknak, hogy külső entitásoktól szerezzenek blokkokat (nem helyben építik fel a végrehajtási klienssel).

Az alábbiakban látható az építő API működése:

1. Az építő API összekapcsolja a validátort a blokképítők hálózatával, amely végrehajtási réteg klienseket futtat. A PBS-hez hasonlóan az építők olyan specializált felek, akik erőforrásigényes blokképítésbe fektetnek be, és különböző stratégiákat alkalmaznak a MEV + elsőbbségi díjak maximalizálására.

2. A validátor (amely egy konszenzusréteg-klienst futtat) az építőhálózattól ajánlatokkal együtt kéri a végrehajtási csomagot. Az építők ajánlatai tartalmazzák a végrehajtási csomag fejlécét – ami a csomag tartalmára vonatkozó kriptográfiai elköteleződés – és a validátornak fizetendő díjat.

3. A validátor megvizsgálja a beérkező ajánlatokat, és kiválasztja a legmagasabb díjjal rendelkező végrehajtási csomagot. Az építő API használatával a validátor létrehoz egy „vak” Beacon-blokk javaslatot, amely csak az aláírását és a végrehajtási csomag fejlécét tartalmazza, majd elküldi azt az építőnek.

4. Az építő API-t futtató építőtől elvárható, hogy a teljes végrehajtási csomaggal válaszoljon, amikor meglátja a vak blokkjavaslatot. Ez lehetővé teszi a validátorok számára, hogy „aláírt” Beacon-blokkot hozzanak létre, amelyet az egész hálózatban elterjesztenek.

5. Az építő API-t használó validátortól továbbra is elvárják, hogy helyben építsen blokkot, ha a blokképítő nem válaszol azonnal, így nem marad le a blokkjavaslatok jutalmáról. A validátor azonban nem hozhat létre egy másik blokkot a felfedett tranzakciókkal vagy egy másik adaggal, mivel ez _kétértelműség_ lenne (két blokk aláírása egy sloton belül), ami szabálysértésnek minősül.

Az építő API egyik példája a [MEV Boost](https://github.com/flashbots/mev-boost), a [Flashbots aukciós mechanizmus](https://docs.flashbots.net/Flashbots-auction/overview/) továbbfejlesztése, amelynek célja a MEV negatív hatásainak csökkentése az Ethereumban. A Flashbots aukció lehetővé teszi a proof-of-work mechanizmusban a bányászok számára, hogy a nyereséges blokkok építését specializált **keresőknek** adják ki.

A keresők jövedelmező MEV-lehetőségeket keresnek, és tranzakciós csomagokat küldenek a bányászoknak egy [lepecsételt árú ajánlattal](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) együtt a blokkba való felvételre. A mev-geth-et, a go-ethereum (Geth) kliens elágaztatott változatát futtató bányásznak csak ki kell választania a legnagyobb nyereséget hozó köteget, és azt az új blokk részeként bányásznia kell. A bányászok spamektől és érvénytelen tranzakcióktól való védelme érdekében a tranzakciókötegeket **közvetítők (relayer)** ellenőrzik, mielőtt eljutnak a bányászokhoz.

A MEV Boost megtartja az eredeti Flashbots aukció működését, bár az Ethereum proof-of-stake-re való átállásához tervezett új funkciókkal. A keresők továbbra is találnak jövedelmező MEV-tranzakciókat a blokkokba való felvételhez, de a tranzakciók és kötegek blokkokká történő összevonásáért új, specializált szereplők, az **építők** felelősek. Az építő elfogadja a keresők lepecsételt-árú ajánlatait, és optimalizálásokat futtat a legjövedelmezőbb sorrend megtalálása érdekében.

A közvetítő továbbra is felelős a tranzakciókötegek validálásáért, mielőtt továbbítja azokat a javaslattevőnek. A MEV Boost ugyanakkor bevezeti a **letéteket**, amelyek a [adatelérhetőség](/developers/docs/data-availability/) biztosításáért felelősek az építők által küldött blokkok és a validátorok által küldött blokkfejlécek tárolásával. Itt a közvetítőhöz (relay) csatlakozó validátor kéri az elérhető végrehajtási csomagokat, és a MEV Boost rendezési algoritmusát használja arra, hogy a legmagasabb ajánlatot és a MEV-borravalókat tartalmazó csomag fejlécét kiválassza.

#### Hogyan csökkenti az építő API a MEV hatását? {#how-does-builder-api-curb-mev-impact}

Az építő API alapvető előnye, hogy demokratizálja a MEV-lehetőségekhez való hozzáférést. A elköteleződés-feltárás sémák használata kiküszöböli a bizalmi feltételezéseket, és csökkenti a belépési korlátokat a MEV előnyeit kihasználni kívánó validálók számára. Ez csökkentené az önálló letétbe helyezőkön lévő nyomást, hogy a MEV-nyereség növelése érdekében nagy letéti alapokba integrálódjanak.

Az építő API széles körű bevezetése nagyobb versenyt ösztönöz a blokképítők között, ami növeli a cenzúrával szembeni ellenállást. Mivel a validátorok több építő ajánlatát vizsgálják, az egy vagy több tranzakciót cenzúrázó építőnek túl kell licitálnia a nem cenzúrázók ajánlatait ahhoz, hogy sikeres legyen. Ez rendkívül megnöveli a felhasználók cenzúrázásának költségeit, és így elrettenti őket ettől a gyakorlattól.

Egyes projektek, mint például a MEV Boost, az építő API-t egy olyan átfogó struktúra részeként használják, amelynek célja, hogy bizonyos felek, például a frontrunning/szendvicstámadásokat elkerülni próbáló kereskedők számára adatvédelmet biztosítson. Ezt úgy érjük el, hogy privát kommunikációs csatornát biztosítunk a felhasználók és a blokképítők között. A fenti engedélyhez kötött memóriakészletekkel ellentétben ez a megközelítés a következők miatt előnyös:

1. Mivel a piacon több építő is jelen van, a cenzúrázás gyakorlatilag lehetetlen, ami előnyös a felhasználók számára. Ezzel szemben a centralizált és bizalomigényű „sötét alapok” létezése néhány blokképítő kezében összpontosítaná a hatalmat, és növelné a cenzúra lehetőségét.

2. Az építő API szoftver nyílt forráskódú, ami lehetővé teszi, hogy bárki blokképítő szolgáltatásokat kínáljon. Eszerint a felhasználók nem kényszerülnek arra, hogy egy adott blokképítőt használjanak, és javítja az Ethereum semlegességét és engedélymentességét. Ráadásul a MEV-et kereső kereskedők nem járulnak hozzá akaratlanul a centralizációhoz azzal, hogy privát tranzakciós csatornákat használnak.

## Kapcsolódó források {#related-resources}

- [Flashbots-dokumentáció](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) – _Dashboard és tranzakciófelfedező a MEV tranzakciókhoz_
- [mevboost.org](https://www.mevboost.org/) – _Tracker valós idejű statisztikákkal a MEV-Boost közvetítőkhöz és blokképítőkhöz_

## További olvasnivaló {#further-reading}

- [Mi az a bányászattal kivonható érték (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [A MEV és én](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Az Ethereum egy sötét erdő](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Kijutni a sötét erdőből](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: megelőzni (frontrunning) a MEV-krízist](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller MEV írásai](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: A Beolvadásra kész Flashbots-architektúra](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Mi az a MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Miért futtassunk MEV Boost-ot?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Ethereum útikalauz stopposoknak](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
