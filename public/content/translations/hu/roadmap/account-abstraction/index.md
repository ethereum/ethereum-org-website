---
title: Számlaabsztrakció
description: Az Ethereum tervek áttekintése azzal kapcsolatban, hogy a felhasználói számlák egyszerűbbek és biztonságosabbak legyenek
lang: hu
summaryPoints:
  - A számlaabsztrakció sokkal egyszerűbbé teszi az okosszerződéses tárcák építését
  - Az okosszerződéses tárcák egyszerűbbé teszik az Ethereum számlákhoz való hozzáférés menedzselését
  - Az elvesztett vagy nyilvánossá vált kulcsokat többféle biztonsági megoldással is vissza lehet nyerni
---

# Számlaabsztrakció {#account-abstraction}

A felhasználók **[külső tulajdonú számlák (EOA)](/glossary/#eoa)** révén kapcsolódnak az Ethereumhoz. Ez az egyetlen módja, hogy egy tranzakciót kezdeményezzenek vagy elindítsanak egy okosszerződést. Ez behatárolja azt, ahogyan a felhasználók az Ethereummal kapcsolatba léphetnek. Nehézkessé teszi például, hogy tranzakciókötegeket hajtsanak végre és a felhasználóknak mindig tartani kell ETH-t, hogy fedezzék a tranzakciók költségeit (gáz).

A számlaabsztrakció egy olyan mód, amely megoldást ad ezekre a problémákra azáltal, hogy a felhasználók rugalmasabban adhatnak több biztonságot a számláikhoz, illetve jobb felhasználói élményben lehet részük. Ehhez arra van szükség, hogy [EOA-kat fejleszteni kell](https://eips.ethereum.org/EIPS/eip-3074), hogy okosszerződéssel is lehessen azokat irányítani, vagy [az okosszerződéseket kell fejleszteni](https://eips.ethereum.org/EIPS/eip-2938) úgy, hogy tranzakciókat tudjanak kezdeményezni. Mindkét opcióhoz módosítani kell az Ethereum-protokollt. Egy harmadik megoldás is lehetséges, ahol egy [második, elkülönült tranzakciós rendszert](https://eips.ethereum.org/EIPS/eip-4337) hoznak létre, hogy a meglévő protokollal párhuzamosan működjön. A megoldási módtól függetlenül az eredmény az, hogy az Ethereumot okosszerződéses tárcákkal, a meglévő protokoll támogatásával vagy egy hozzáadott tranzakciós hálózattal is el lehet érni.

Az okosszerződéses tárcák számos előnnyel járnak a felhasználók számára:

- beállíthatják a saját rugalmas biztonsági szabályaikat
- a számlát vissza lehet állítani akkor is, ha a kulcsok elvesztek
- a számla biztonságát meg lehet osztani megbízható eszközökkel vagy egyénekkel
- lehet gázt fizetni más helyett, illetve helyettünk is fizethet más
- a tranzakciókat össze lehet kötegelni (pl. az átváltásokat egyszerre jóvá lehet hagyni és végrehajtani)
- az alkalmazás- (dapp) és tárcafejlesztőknek több lehetőségük van, hogy javítsák a felhasználói élményeket

Jelenleg ezek az előnyök nem érhetők el, mert csak a külső tulajdonú számlák ([EOA](/glossary/#eoa)) indíthatnak tranzakciókat. Az EOA-k lényegileg egy nyilvános-privát kulcspárból állnak. Így működnek:

- aki rendelkezik egy privát kulccsal, az _bármit_ megtehet az Ethereum Virtuális Gép (EVM) szabályain belül
- aki nem rendelkezik a privát kulccsal, az _semmit_ sem tehet.

Ha a kulcsok elvesznek, akkor nem lehet azokat visszaszerezni, illetve az ellopott kulcsok azonnali hozzáférést adnak a számlán lévő eszközökhöz.

Az okosszerződéses tárcák megoldást tudnak ezekre adni, de jelenleg nehéz programozni ezeket, mert minden egyes logikát a végén le kell fordítani egy adag EOA-tranzakcióra, hogy azokat végre lehessen hajtani az Ethereumon. A számlaabsztrakció lehetővé teszi az okosszerződések számára, hogy tranzakciókat indítsanak el, ezért a felhasználó bármilyen általa kívánt logikát be tud kódolni az okosszerződéses tárcába és azt végre tudja hajtatni az Ethereumon.

Végül a számlaabsztrakció fejleszti az okosszerződéses tárcák támogatását, mivel egyszerűbb lesz azokat megépíteni és biztonságosabb lesz használni. A számlaabsztrakció révén a felhasználók az Ethereum összes előnyét kiélvezhetik, és nem kell tudniuk vagy foglalkozniuk a mögöttes technológiával.

## A kulcsmondatokon túl {#beyond-seed-phrases}

Jelenleg a számlákat a privát kulcsok használata védi, amelyet kulcsmondatokból állítanak elő. Aki hozzáfér a kulcsmondathoz, az könnyen fel tudja fedezni a számlát védő privát kulcsot, így hozzáférhet a számla eszközeihez. Ha a privát kulcs és a kulcsmondat elvész, akkor azokat már nem lehet visszanyerni és a számlán tárolt eszközök örökre be lesznek fagyasztva. A kulcsmondatok biztonságos tárolása elég kényelmetlen még a szakértő felhasználók számára is, és az ezekre irányuló adathalászat a fő oka annak, hogy a felhasználókat átverik.

A számlaabsztrakció esetében az okosszerződés tárolja a eszközöket és hagyja jóvá a tranzakciókat. Ezeket az okosszerződéseket személyre szabott logikával lehet működtetni, hogy a lehető legbiztonságosabbak legyenek és a felhasználóra legyenek szabva. A felhasználó még mindig privát kulcsokat használ ahhoz, hogy a számlát irányítsa, de azt biztonsági hálóval együtt teszi, amely könnyebbé és biztonságosabbá teszi a kezelést.

Például olyan biztonsági kulcsok adhatók a tárcához, hogy ha valaki elveszíti vagy véletlenül feltárja a fő kulcsát más előtt, akkor azt kicserélheti egy új, biztonságos kulcsra, amelyet a biztonsági kulcs engedélyez. A különféle kulcsot más-más módon biztosíthatja a felhasználó, vagy megbízott őrzők között is feloszthatja azt. Ezáltal sokkal nehezebbé válik a csalóknak, hogy teljes kontrollt szerezzenek az eszközök felett. Hasonlóképpen szabályokat is hozzáadhat a pénztárcához, hogy csökkentse a fő kulcsának veszélyeztetettségét, például lehetővé teheti az alacsony értékű tranzakciók egyetlen aláírással történő ellenőrzését, míg a nagyobb értékű tranzakciókhoz több hitelesített aláíró jóváhagyása szükséges. Az intelligens szerződéses pénztárcák más módokon is segíthetnek a tolvajok meghiúsításában, például egy engedélyezési lista segítségével blokkolhat minden tranzakciót, kivéve, ha az megbízható címre érkezik, vagy ha nem igazolja több előre jóváhagyott kulccsal.

### Néhány példa arra, hogy milyen biztonsági logikákat lehet beépíteni az okosszerződéses tárcába:

- **Többaláírásos jóváhagyás**: A jóváhagyásra való meghatalmazást meg lehet osztani több megbízható ember vagy eszközök között. Ekkor a szerződést úgy lehet beállítani, hogy egy előre meghatározott érték feletti tranzakció jóváhagyást kérjen a megbízott felek egy adott arányától (pl. 5-ből 3-tól). Egy magas értékű tranzakció például jóváhagyást kérhet egy mobileszköztől és egy hardvertárcától egyszerre, vagy a megbízott családtagok között megosztott számláktól igényelhet aláírást.
- **Számlabefagyasztás**: Ha egy eszköz elveszett vagy más kezébe került, akkor a számlát be lehet fagyasztani egy másik jóváhagyott eszközről, ezzel megvédve a felhasználó eszközeit.
- **Számla-visszaállítás**: Elveszett az eszköz vagy elfelejtette a jelszót? A jelenlegi felállásban ez azt jelenti, hogy a számlán tartott eszközök örökre befagyasztva maradnak. Az intelligens szerződéses pénztárcával beállíthat egy engedélyezési listát azokról a fiókokról, amelyek engedélyezhetik az új eszközöket és visszaállíthatják a hozzáférést.
- **Tranzakciólimitek beállítása**: Napi határértéket lehet megadni arra vonatkozóan, hogy milyen értéket lehet áttranszferálni az adott számláról egy nap/hét/hónap alatt. Tehát ha egy támadó hozzáférést szerez a számlához, akkor nem tudja egyszerre kiüríteni azt, a tulajdonos pedig be tudja azt fagyasztani és visszaállítani a saját hozzáférést.
- **Engedélyezőlisták létrehozása**: Csak bizonyos címekre engedélyezi a tranzakciókat, amelyekről tudja, hogy biztonságosak. Ez azt jelenti, hogy _még ha_ a privát kulcsát ellopták is, a támadó csak a listán szereplő célszámlákra küldhet pénzt. Ezekhez az engedélyezési listákhoz több aláírásra lenne szükség a módosításukhoz, így a támadók csak akkor vehetik fel a saját címüket a listára, ha hozzáfértek több biztonsági kulcshoz.

## Jobb felhasználói élmény {#better-user-experience}

A számlaabsztrakció lehetővé teszi a **jobb felhasználói élményt** és **a magasabb fokú biztonságot**, mert támogatást biztosít az okosszerződéses tárcának a protokoll szintjén. Ez a megoldás az okosszerződések, tárcák és alkalmazások fejlesztőinek olyan szintű szabadságot ad az innovációra a felhasználói élményt illetően, olyan módokon, amiket most még elképzelni sem tudunk. Néhány egyértelmű fejlesztés a számlaabsztrakció mellett többek között az, hogy a tranzakciókat kötegelni lehet a gyorsaság és a hatékonyság érdekében. Például egy egyszerű swapnak egy kattintásos műveletnek kell lennie, de manapság több tranzakció aláírása szükséges ahhoz, hogy jóváhagyják az egyes tokenek elköltését a csere végrehajtása előtt. A számlaabsztrakcióval megszűnik ez a többszörös jóváhagyás, mert a tranzakciókat össze lehet kötegelni. Emellett a kötegelt tranzakciókat úgy hagyja jóvá a felhasználó, hogy a tokeneknek a megfelelő értéke szerepel benne, majd a végrehajtás után visszavonja a jóváhagyást, ezzel fokozva a biztonságot.

A gáz, vagyis a tranzakciós díjak kezelése is sokkal fejlettebbé válik a számlaabsztrakcióval. Az alkalmazások felajánlhatják, hogy kifizetik a felhasználók gázdíját, továbbá a gázt más tokenben is lehet rendezni, nem csak ETH-ben, így a felhasználóknak nem kötelező ETH-összeget tartani a számlájukon, hogy a tranzakciókat finanszírozni tudják. Ez úgy valósul meg, hogy a szerződésen belül a felhasználó tokenjeit átváltják ETH-re, és ebben fizetik ki a gázt.

<ExpandableCard title="Hogyan tud a számlaabsztrakció segíteni a gázdíjak kapcsán?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

A gázdíjak kezelése az egyik fő gond az Ethereum-felhasználók számára, mert csak ETH-ben lehet azt rendezni. Tegyük fel, hogy van egy tárca USDC-egyenleggel, de nincs benne ETH. Akkor az USDC-tokeneket nem tudja a tulajdonos elküldeni vagy átváltani, mert nem tudja kifizetni a gázdíjat. Nem lehet átváltani az USDC-t ETH-re, mert ez önmagában gázdíjat igényel. Ennek megoldásához ETH-t kell beküldeni a számlára egy tőzsdéről vagy egy másik címről. Az okosszerződéses tárcákkal ki lehet fizetni a gázdíjat a számlán tartott USDC-ből, így szabadon használható a számla. Ennek köszönhetően nem kell ETH-egyenleget tartani az összes számlán.

A számlaabsztrakció lehetővé teszi a dapp fejlesztőknek azt is, hogy a gázdíj kezelésében kreatívak legyenek. Például a kedvenc tőzsdéjének a felhasználó akár fix díjat is fizethetne havonta korlátlan mennyiségű tranzakcióért. A dappok felajánlhatják, hogy kifizetik az összes gázdíjat a felhasználó helyett, ezzel jutalmazva őket, hogy az adott platformot használják, vagy belépési ajánlat gyanánt. A fejlesztőknek könnyebb lesz innovatív módon hozzáállni a gázhoz, amikor az okosszerződéses tárcákat protokollszinten támogatják.

</ExpandableCard>

A megbízható periódus használata is jelentős hatással lehet a felhasználói élményekre, főleg olyan alkalmazásoknál, mint a játékok, ahol sok kis értékű tranzakciót kell rövid időn belül jóváhagyni. Ha egyesével kell a tranzakciókat engedélyezni, akkor az megtöri a játék élményét, de az állandó jóváhagyás nem lenne biztonságos. Az okosszerződéses tárca engedélyezni tudna bizonyos tranzakciókat egy fix időre, egy meghatározott értékig vagy csak egy bizonyos címre.

Érdekes azt is átgondolni, hogyan alakulnak a váráslások a számlaabsztrakcióval. Jelenleg minden tranzakciót jóvá kell hagyni és végre kell hajtani a tárcából úgy, a megfelelő token kellő összege rendelkezésre áll. A számlaabsztrakcióval ez az élmény inkább olyan lehet, mint egy online vásárlás, ahol a felhasználó beleteszi a tételeket a kosarába, egyszerre fizeti ki az összeset, és a szerződés kezeli azokat a logikákat, amelyek ehhez szükségesek.

Ez csak néhány példa arra, hogy a felhasználói élmény hogyan fejlődhet a számlaabsztrakcióval, ám ennél sokkal több is lehetségessé válik. A számlaabsztrakció felszabadítja a fejlesztőket a jelenlegi EOA-k kötöttségei alól, behozhatják a web2 jó szempontjait a web3-ba anélkül, hogy feláldoznák az eszközök fölötti saját felügyeletet, illetve kreatív módon javíthatják a felhasználói élményeket.

## Hogyan kerül bevezetésre a számlaabsztrakció? {#how-will-aa-be-implemented}

Az okosszerződéses tárcák most is léteznek, de kihívásokkal teli a megvalósításuk, mert az EVM nem támogatja azokat. Ehelyett azon alapulnak, hogy elég összetett kódokba burkolják a standard Ethereum-tranzakciókat. Az Ethereum képes ezt megváltoztatni azáltal, hogy megengedi az okosszerződéseknek a tranzakciókezdeményezést, így az Ethereum okosszerződésbe lehet kódolni a szükséges logikákat, nem pedig a láncon kívül kezelni azokat. Az okosszerződésbe írt logikák növelik az Ethereum decentralizációját is, mivel nem lesz szükség a tárcafejlesztők által működtetett közvetítőkre, hogy lefordítsák a felhasználók által aláírt üzeneteket Ethereum-tranzakciókká.

<ExpandableCard title="EIP-2771: számlaabsztrakció metatranzakciók használatával" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 a metatranzakció koncepcióját vezeti be, amelynek révén egy harmadik személy kifizetheti a felhasználó gázdíját anélkül, hogy ehhez változtatni kellene az Ethereum protokollon. Eszerint a felhasználó által aláírt tranzakciók egy „továbbító” szerződéshez kerülnek. Ez a továbbító egy megbízott entitás, amely ellenőrzi a tranzakciók érvényességét, mielőtt elküldi azokat egy gázközvetítőnek. Ezt a láncon kívül intézik, így nem kell érte gázdíjat fizetni. A gázközvetítő átadja a tranzakciót egy „fogadó” szerződésnek, és kifizeti a szükséges díjat, hogy a tranzakció végrehajtható legyen az Ethereumon. A tranzakciót végre lehet hajtani, ha a „továbbító” ismert és a „fogadó” bízta meg. Ez a modell megkönnyíti a fejlesztők számára, hogy gázdíj nélküli tranzakciókat tegyenek lehetővé a felhasználók számára.

</ExpandableCard>

<ExpandableCard title="EIP-4337: számlaabsztrakció az Ethereum-protokoll módosítása nélkül" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

Az EIP-4337 az első lépés az okosszerződéses tárca támogatására decentralizált módon <em>anélkül, hogy az Ethereum-protokollt változtatni kellene hozzá</em>. Ahelyett, hogy a konszenzusréteget módosítanák, hogy támogassa az okosszerződéses tárcákat, egy új rendszert adnak a meglévő tranzakciós pletykaprotokollhoz. Ez a magasabb szintű rendszer egy új objektumra épül, amely a <code>UserOperation</code> nevet kapta, és a felhasználótól érkező tevékenységeket csomagolja össze a megfelelő aláírásokkal együtt. Majd ezeket a <code>UserOperation</code>-objektumokat elküldik egy dedikált memóriakészletbe, ahol a validátorok azokat egy tranzakcióköteggé szedhetik össze. A tranzakcióköteg számos egyéni <code>UserOperations</code>-sorozatot képvisel, és ugyanúgy bekerül egy Ethereum-blokkba, mint bármilyen normál tranzakció. Ezután a validátorok felveszik azt egy díjmaximalizáló kiválasztási modell alapján.

Az EIP-4337 azt is megváltoztatja, ahogy a tárcák működnek. Ahelyett, hogy minden egyes tárca újraimplementálná a közös, de összetett biztonsági logikát, ezek a funkciók kikerülnének egy globális tárcaszerződésbe, amelyet „ belépési pontnak” neveznek. Ez üzemeltetné az olyan funkciókat, mint a díjak fizetése és az EVM-kód végrehajtása, így a tárcafejlesztők fókuszálhatnak a kiváló felhasználói élményre.

<strong>Megjegyzés:</strong> az EIP-4337 által tervezett belépésipont-szerződést az Ethereum-főhálózatra 2023. március 1-én üzemelték be. A szerződés az <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a> oldalon tekinthető meg.

</ExpandableCard>

<ExpandableCard title="EIP-2938: az Ethereum-protokoll módosítása, hogy az támogassa a számlaabsztrakciót" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

Az <a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> az Ethereum-protokollt fejleszti azzal, hogy bevezet egy új, <code>AA_TX_TYPE</code> nevű tranzakciótípust, amely három mezőt tartalmaz: <code>nonce</code>, <code>target</code> és <code>data</code>, ahol a <code>nonce</code> egy tranzakciószámláló, a <code>target</code> a belépésipont-szerződés címe, a <code>data</code> pedig az EVM-bájtkód. Ezen tranzakciók végrehajtásához két új parancsot (operációs kódot) kell hozzáadni az EVM-hez: <code>NONCE</code> és <code>PAYGAS</code>. A <code>NONCE</code> opkód trekkeli a tranzakciósorrendet, a <code>PAYGAS</code> kalkulálja és levonja a végrehajtáshoz szükséges gázdíjat a szerződés egyenlegéből. Ezek az új funkciók lehetővé teszik az Ethereumnak, hogy támogassa az okosszerződéses tárcákat, mivel a szükséges infrastruktúra az Ethereum-protokollba épül be.

Jelenleg az EIP-2938 változtatás nem aktív. A közösség az EIP-4337 javaslatot támogatja, mert ahhoz nem szükséges megváltoztatni a protokollt.

</ExpandableCard>

<ExpandableCard title="EIP-3074: a külső tulajdonú számlák továbbfejlesztése a számlaabsztrakció bevezetéséhez" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

Az <a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> az Ethereumot úgy fejleszti, hogy a külső tulajdonú számlák képesek legyenek delegálni a kontrollt egy okosszerződésnek. Eszerint az okosszerződés logikája jóváhagyhat olyan tranzakciót, amely egy külső tulajdonú számlától (EOA) származik. Ez lehetővé teszi az olyan funkciók bevezetését, mint a gázdíjak szponzor általi kifizetése és a kötegelt tranzakciók. Ennek működéséhez két új operációs kódot kell hozzáadni az EVM-hez: <code>AUTH</code> és <code>AUTHCALL</code>. Az EIP-3074 révén az okosszerződéses tárca előnyei elérhetővé válnak úgy, hogy <em>nem kell hozzá szerződés</em> – ehelyett egy státuszmentes, bizalomigény-mentes, nem változtatható szerződés, a „hívó” kezeli a tranzakciókat.

Jelenleg az EIP-3074 változtatás nem aktív. A közösség az EIP-4337 javaslatot támogatja, mert ahhoz nem szükséges megváltoztatni a protokollt.

</ExpandableCard>

## Jelenlegi helyzet {#current-progress}

Az okosszerződéses tárcák már elérhetők, de több fejlesztésre van szükség, hogy még decentralizáltabbak és engedélymentesek legyenek. Az EIP-4337 egy kiforrott javaslat, amely nem igényel változtatást az Ethereum-protokollban, ezért ezt gyorsan be lehet vezetni. Azok a fejlesztések, amelyekhez az Ethereum-protokollt módosítani kell, jelenleg nincsenek aktív állapotban, így ezek a változások hosszabb időt vesznek igénybe. Az is lehetséges, hogy a számlaabsztrakciót kellőképpen el lehet érni az EIP-4337 révén, ezért a protokollt nem is kell hozzá megváltoztatni.

## További olvasnivaló {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Panelbeszélgetés a számlaabsztrakcióról a Devcontól, Bogotából](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- [„A számlaabsztrakció miért hoz jelentős fejlődést a dappok számára?” – Devcon, Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- [„Számlaabsztrakció ELI5” – Devcon, Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Vitalik „Út a számlaabsztrakcióhoz” jegyzetei](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalik blogbejegyzése a közösségi médiával visszaállítható tárcákról](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [EIP-2938 jegyzetek](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [EIP-2938 dokumentáció](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 jegyzetek](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [EIP-4337 dokumentáció](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-2771 dokumentáció](https://eips.ethereum.org/EIPS/eip-2771)
- [„A számlaabsztrakció alapjai” – Mi az a számlaabsztrakció, I. rész](https://www.alchemy.com/blog/account-abstraction)
