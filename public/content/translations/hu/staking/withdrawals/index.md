---
title: A letétbe helyezés visszavonása
description: A letétvisszavonás működésének és a jutalmak megszerzésének áttekintése
lang: hu
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie, a rinocérosz a letétbe helyezésből származó jutalmaival
sidebarDepth: 2
summaryPoints:
  - A Shanghai/Capella frissítés lehetővé tette a letétek visszavonását az Ethereumon
  - A validátor operátorainak meg kell adni ehhez egy visszavonási címet
  - A jutalmakat néhány naponta automatikusan átkerülnek
  - A validátorok, akik teljesen kiszállnak a letétből, a maradék egyenleget visszakapják
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
A letétek visszavonását a 2023. április 12-i Shanghai/Capella frissítés tette lehetővé.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Bővebben a Shanghai/Capella frissítésről</a>
</UpgradeStatus>

**A letétek visszavonása** azt jelenti, hogy a validátorszámla ETH-egyenlege, ami az Ethereum konszenzusrétegén található (Beacon-lánc), áthelyezésre kerül a végrehajtási rétegre, ahol fel lehet használni.

**A jutalmak kifizetése** 32 ETH felett automatikusan és rendszeresen megtörténik az egyes validátorokhoz tartozó visszavonási címre, ahogy azt a felhasználó beállította. A felhasználó **teljesen kiszállhat a letétbe helyezésből**, felszabadítva a teljes validátoregyenleget.

## A letétbe helyezésből eredő jutalmak {#staking-rewards}

Az aktív validátorszámlákra a jutalmak kifizetése automatikusan megtörténik, és maximum 32 ETH egyenleg marad azokon.

A 32 ETH feletti összeg nem adódik hozzá az alaphoz, nem növeli a validátor súlyát a hálózaton, így automatikusan visszavonásra kerül jutalomként néhány naponta. A visszavonási címet rögzíteni kell, de ezen kívül a validátor működtetőjének nincs több teendője. Ez a konszenzusrétegen zajlik, ezért nincs gáz/tranzakciós díj vonzata egyik lépésnél sem.

### Hogyan jutottunk el idáig? {#how-did-we-get-here}

Az elmúlt években az Ethereum számos hálózati fejlesztésen esett át, hogy a hálózatot az ETH biztosítsa, és ne az erőforrás-igényes bányászás (mining). A konszenzusban való részvétel az Ethereumon a letétbe helyezés (staking), mivel a tagok önként lekötötték az ETH-t, hogy a hálózatban részt tudjanak venni. A szabályokat követő felhasználók jutalmakat nyernek, a visszaélést pedig bünteti a rendszer.

A letétbe helyezési szerződés létrehozásával (2020. november) néhány bátor Ethereum-úttörő önként zárolta a pénzeszközeit, hogy validátorokként működjenek – ezek olyan különleges számlák, melyek hivatalosan tanúsíthatnak és javasolhatnak blokkot a hálózat szabályait követve.

A Shanghai/Capella frissítés előtt nem lehetett használni vagy elérni ezt a lekötött ETH-t. Most azonban automatikusan áthelyeződnek a jutalmak a kiválasztott számlára, és a lekötést is bármikor fel lehet oldani.

### Hogyan tudok erre felkészülni? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Fontos figyelmeztetések {#important-notices}

A visszavonási cím megadása szükséges ahhoz, hogy a validátorszámla egyenlegéből ETH visszavonás történjen.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Minden validátorszámlához egyszer, egyetlen visszavonási cím adható meg.</strong> Amint ezt a címet kiválasztották és elküldték a konszenzus rétegnek, nem lehet visszahívni vagy megváltoztatni. Ellenőrizze le a cím tulajdonosát és pontosságát, mielőtt elküldi azt.
</InfoBanner>

Eközben <strong>a pénzeszközöket nem fenyegeti veszély</strong>, ha nem adja meg a címet, feltéve, hogy a mnemonikus/kulcsmondat biztonságban van offline, és nincs kitéve veszélynek. Amíg nem tudja megadni a visszavonási adatokat, addig az ETH egyszerűen a validátorszámlán marad.

## A letétbe helyezés felbontása {#exiting-staking-entirely}

A visszavonási számlára van szükség ahhoz, _bármilyen_ pénzeszközt ki lehessen utalni a validátorszámla egyenlegéből.

Azoknak a felhasználóknak, akik teljesen ki akarnak lépni a letétbe helyezéből és a teljes egyenleget vissza akarják vonni, a validátorkulcsokkal alá kell írniuk és ki kell adniuk egy önként kiszállok üzenetet, ezzel elindul a lezárás folyamata. Ezt a validátorkliens végzi és a konszenzus csomópontjára küldi el, így nem kell hozzá gáz/díj.

A kilépés változó ideig tart, attól függően, hogy hányan akarnak ugyanakkor kiszállni. Amint végbemegy, ez a számla már nem végez validátori feladatokat, nem jár neki ezért jutalom, és a kapcsolódó ETH nincs letétbe helyezve. Ekkora a számla teljesen „visszavonhatóként” lesz megjelölve.

Ha a visszavonható jelölés megtörtént és a visszavonási adatok meg lettek adva, akkor nincs több teendő. A blokkot javaslók automatikusan és folyamatosan ellenőrzik, mondhatni söprik a számlákat a kilépő pénzeszközöket vizsgálva, így a számla egyenlege teljes mértékben átvezetésre kerül a következő <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>söprésnél</a>.

## Mikortól elérhető a letétek visszavonása? {#when}

A letétek visszavonása elérhető! A funkcionalitást a Shanghai/Capella frissítés tette elérhetővé 2023. április 12-én.

Ennek következtében a korábban letétbe helyezett ETH-t vissza lehet vonni a normális Ethereum-számlákra. Ez lezárta a letétek likviditásának témáját, és az Ethereumot egy lépéssel közelebb vitte a céljához, ami egy fenntartható, skálázható, biztonságot, decentralizált ökoszisztéma.

- [Bővebben az Ethereum történetéről](/history/)
- [Bővebben az Ethereum fejlesztési terveiről](/roadmap/)

## Hogyan működik a visszavonási kifizetés? {#how-do-withdrawals-work}

A validátorszámla státusza mondja meg, hogy egy validátor jogosult-e a visszavonásra vagy sem. Nincs szükség a felhasználó közreműködésére, hogy a számla visszavonásra kerül-e vagy sem – a teljes folyamat automatikusan üzemel a konszenzus réteg által, egy állandóan működő ciklusban.

### Ön inkább vizuális típus? {#visual-learner}

Nézze meg az Ethereum letétvisszavonásról szóló magyarázatát a Finematics-tól:

<YouTube id="RwwU3P9n3uo" />

### Validátor-ellenőrzés vagy söprés {#validator-sweeping}

Amikor egy adott validátor be van ütemezve, hogy a következő blokkot ő fogja javasolni, akkor készítenie kell egy 16 tételből álló visszavonási listát. Kezdve a 0 validátorindexel, meghatározza, hogy az adott számla a protokoll szabályai szerint visszavonásra jogosult-e, és ha igen, akkor beteszi a listába. A validátorcsoport ott száll be, ahol az előző abbahagyta és a végtelenségig folytatja.

<InfoBanner emoji="🕛">
Képzeljen el egy analóg módon működő órát. Az óramutató egy irányba halad és sorban végigmegy minden számon, majd miután elérte az utolsó számot, visszaér a kezdőpontra. <br/><br/>
Tegyük fel 1–12 helyett 0-n található <em>(ahol n a validátor számlák teljes száma, amelyek a konszenzus rétegen regisztrálva lettek; több mint 500 000 2023. januárjában).</em><br/><br/>
Az óramutató a következő validátorra mutat, hogy leellenőrizze azt visszavonás szempontjából. A 0-nál kezdi és végigmegy az összes számlán. Amikor eléri az utolsó validátort, akkor a ciklus újra elindul.
</InfoBanner>

#### A számlák ellenőrzése visszavonási szempontból {#checking-an-account-for-withdrawals}

Miközben a blokk javaslója a validátorokat ellenőrzi a lehetséges visszavonások miatt, minden validátornál néhány kérdéssel ellenőrzi, hogy kell-e visszavonást indítani, és mennyi ETH-t érint ez.

1. **Van visszavonási cím megadva?** Ha nincs, akkor kihagyja a számlát, és nem lehet visszavonást kezdeményezni.
2. **A validátor kiszállt és visszavonható a számlája?** Ha a validátor kiszállt, és a számlája „visszavonhatóvá” vált, akkor egy teljes visszavonás történik. A teljes egyenlege átkerül a visszavonási címre.
3. **Az érvényes egyenleg 32 ETH?** Ha a számla rendelkezik visszavonási adatokkal, nem lépett ki a letétbe helyezésből, de jutalmak vannak a 32 ETH összegen túl, akkor egy részleges visszavonás indul, ami a 32 ETH feletti jutalmakat áthelyezi a visszavonási címre.

Csak két döntés vagy cselekvés van, amit a validátor üzemeltetője meglép a validátor életciklusa során, és ezt a folyamatot közvetlenül befolyásolja:

- A visszavonási adatok biztosítása, hogy bármit át lehessen vezetni
- A hálózatból való kilépés, ami egy teljes visszavonást indít el

### Gáz/díjmentes {#gas-free}

A letétek visszavonása anélkül zajlik, hogy a letétesnek tranzakciót kellene indítania, amiben adott mennyiségű ETH-t von ki. Ezért **nincs gáz/tranzakciós díj**, a visszavonások pedig nem versenyeznek, hogy bekerüljenek a végrehajtási réteg blokkjába.

### Milyen gyakran kapom meg a letéti jutalmakat? {#how-soon}

Egy blokkban maximum 16 visszavonást lehet végrehajtani. Ez alapján 115 200 validátor-visszavonást lehet egy nap alatt teljesíteni (ha minden slot eredményes). A visszavonásra nem jogosult validátárokat átugorják, ezért a teljes ellenőrzés kevesebb ideig tart.

Ezt a kalkulációt kiterjesztve megbecsülhetjük, hogy egy adott számú visszavonást mennyi idő alatt lehet teljesíteni:

<TableContainer>

| Visszavonások száma | Időszükséglet |
| :-------------------: | :--------------: |
|        400 000        |     3,5 nap     |
|        500 000        |     4,3 nap     |
|        600 000        |     5,2 nap     |
|        700 000        |     6,1 nap     |
|        800 000        |     7,0 nap     |

</TableContainer>

Ahogy látható, a feldolgozás lelassul, ahogy egyre több validátor van a hálózaton. A kihagyott slotok száma arányosan le tudja lassítani a folyamatot, de ez a lassabb verzióját mutatja a lehetséges kimenetnek.

## Gyakran ismételt kérdések {#faq}

<ExpandableCard
title="Amikor már megadtam egy visszavonási címet, meg lehet az változtatni?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nem, a visszavonási adatok megadása egyszeri, nem lehet változtatni azokon.
</ExpandableCard>

<ExpandableCard
title="Miért lehet a visszavonási címet csak egyszer megadni?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
A végrehajtási réteg visszavonási cím megadásával a validátor visszavonási adatai örökre megváltoztak. A korábbi adatok már nem működnek, az újak pedig a végrehajtási réteg számlájára mutatnak.

A visszavonási cím lehet okosszerződés (melyet a programkódja irányít) vagy egy külső tulajdonú számla (EOA, melyet a privát kulcsa kontrollál). Ezek a számlák jelenleg nem tudnak üzenetet küldeni a konszenzusrétegnek, amely megváltoztatná a validátor hitelesítő adatait, ez a funkció pedig egy szükségtelen komplexitást adna a protokollhoz.

Egy másik megoldás az adott validátorhoz tartozó visszavonási cím módosítására, ha a felhasználók okosszerződést választanak visszavonási címként, amely tudja kezelni a kulcsok rotálását, mint amilyen a Safe. Azok a felhasználók, akik a saját EOA számlájukra tették a pénzeszközöket, végezhetnek teljes kilépést, visszavonva az összes lekötött eszközt, majd újra letétbe helyezhetik az új hitelesítő adatokat használatával.
</ExpandableCard>

<ExpandableCard
title="Mi van akkor, ha a letétbe helyezést letéti tokenekkel vagy letéti alapokkal végzem"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Ha Ön <a href="/staking/pools/">letéti alapokat</a> vagy letéti tokeneket használ, ellenőrizze a szolgáltatójával, hogy hogyan kezelik a letétvisszavonást, mivel minden szolgáltatás másképp működik.

Általánosságban a felhasználók szabadon visszavehetik a letétbe helyezett ETH-t vagy lecserélhetik a letéti szolgáltatójukat. Ha egy adott letéti alap túl nagy méretű lesz, akkor a pénzeszközöket ki lehet venni belőle és újra le lehet kötni egy <a href="https://rated.network/">kisebb szolgáltatóval</a>. Ha pedig elég ETH gyűlt össze, akkor Ön<a href="/staking/solo/">otthonról is végezhet letétbe helyezést</a>.

</ExpandableCard>

<ExpandableCard
title="A jutalmak kifizetése (részleges visszavonás) automatikusan történik?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Igen, ha a validátora megadta a visszavonási címet. Ezt egyszer kell megtenni, hogy a visszavonások teljesíthetők legyenek, utána a jutalmak automatikusan átkerülnek néhány naponta a validátorok ellenőrzésénél.
</ExpandableCard>

<ExpandableCard
title="A teljes visszavonások automatikusan történnek?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Nem, ha a validátor aktív a hálózaton, akkor a teljes visszavonás nem történik meg automatikusan. Az önkéntes kilépést manuálisan kell kezdeményezni.

Amint a validátor végigvitte a kilépési folyamatot, a számlán pedig ott vannak a visszavonási adatok, <em>akkor</em> a maradék egyenleget átteszi a következő <a href="#validator-sweeping">validátor-ellenőrzés</a>.

</ExpandableCard>

<ExpandableCard title="Visszavonhatok egy egyedi összeget?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
A visszavonásokat úgy tervezték meg, hogy automatikusan minden olyan összeget áthelyezzenek, ami aktívan nem járul hozzá a letéthez. Ez érvényes a kilépő számlák teljes egyenlegére.

Nem lehetséges manuálisan kérvényezni bizonyos mennyiségű ETH kivételét.
</ExpandableCard>

<ExpandableCard
title="Validátort üzemeltetek. Hol találok további információkat a visszavonás beállításáról?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Javasoljuk, hogy a validátorműködtetők látogassanak el a <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> oldalra, ahol további információkat találhatnak a letét kivonásához kapcsolódó felkészülésről, az események időzítéséről és arról, hogyan működik ez a kivonási funkció.

Próbálja ki először a beállításait egy teszthálózaton, látogasson el a <a href="https://holesky.launchpad.ethereum.org">Holesky-teszthálózat Staking Launchpad</a> oldalára.

</ExpandableCard>

<ExpandableCard
title="Újra tudom aktiválni a validátoromat a kilépés után azzal, hogy ETH-t kötök le?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nem. Miután egy validátor kilépett, és a teljes egyenlegét kivette, az adott validátorra letétbe helyezett további összegek automatikusan átutalásra kerülnek a következő validátor-ellenőrzés során a visszavonási címre. Az ETH újbóli letétbe helyezéséhez egy új validátort kell aktiválni.
</ExpandableCard>

## További olvasnivaló {#further-reading}

- [Staking Launchpad visszavonások](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon-lánc operációs műveletként intézi a visszavonásokat](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders – Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: A letétbe helyezett ETH visszavonása (tesztelés) – Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon lánc operációs műveletként intézi a visszavonásokat – Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [A validátor valós egyenlegének megértése](https://www.attestant.io/posts/understanding-validator-effective-balance/)
