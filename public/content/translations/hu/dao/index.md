---
title: Decentralizált autonóm szervezetek (DAO-k)
description: Az Ethereumon működő DAO-k áttekintése
lang: hu
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: Egy javaslatra történő DAO-szavazat ábrázolása.
summaryPoint1: Tagtulajdonú közösségek központi vezetők nélkül.
summaryPoint2: Biztonságos módja az interneten történő, ismeretlenekkel való együttműködésnek.
summaryPoint3: Egy biztonságos hely, ahol pénzét adott célokra fordíthatja.
---

## Mik azok a DAO-k? {#what-are-daos}

A DAO egy közös tulajdonú szervezet, amely egy közös küldetésért dolgozik.

A DAO-k lehetőséget biztosítanak számunkra, hogy hozzánk hasonló elhivatottságú emberekkel dolgozzunk a világ minden tájáról anélkül, hogy egy központi vezetőre bíznánk a pénzügyi és operatív működtetést. Nincs olyan vezérigazgató, aki a kedve szerint költhetné el az alapokat, vagy olyan pénzügyi vezető, aki manipulálhatná a könyvelést. Helyette a kódba épített, blokkláncon alapuló szabályok határozzák meg, hogyan működik a szervezet és kerülnek elköltésre az alapok.

Beépített pénztárakkal rendelkeznek, amelyekhez a csoport jóváhagyása nélkül senkinek sincs jogosultsága hozzáférni. A döntéseket a javaslatok és a szavazás szabályozzák, így biztosítva, hogy a szervezetben mindenki megszólaljon, és minden átláthatóan, [láncon belül](/glossary/#on-chain) történjen.

## Miért van szükségünk DAO-kra? {#why-dao}

Egy pénzügyi forrásokat és pénzt igénylő szervezet indítása nagyon sok bizalmat igényel azon emberek vonatkozásában, akikkel együtt dolgozunk. Azonban nehéz megbízni valakiben, akivel csak az interneten keresztül léptünk kapcsolatba. A DAO-k esetében nem kell megbíznia a csoport többi tagjában, kizárólag a DAO kódjában, mely 100%-ban átlátható és bárki által ellenőrizhető.

Ennek köszönhetően rengeteg lehetőség nyílik meg a globális együttműködésre és koordinációra.

### Összehasonlítás {#dao-comparison}

| DAO                                                                                                                   | Egy hagyományos szervezet                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Általában lapos és teljesen demokratizált.                                                                            | Rendszerint hierarchikus.                                                                                                                |
| Bármely változtatás végrehajtásához a tagok szavazata szükséges.                                                      | A felépítésen alapszik, egyetlen tagtól is követelhető változás, vagy szavazásra is bocsátható a kérdés.                                 |
| A szavazatokat összeszámolják, a szavazás eredményét pedig automatikusan végrehajtják egy megbízott közvetítő nélkül. | Ha megengedett a szavazás, akkor a szavazatokat a szervezeten belül összeszámolják, a szavazás eredményét pedig manuálisan végrehajtják. |
| A szolgáltatásokat automatikusan, decentralizált módon kezelik (például a humanitárius források elosztása).           | Emberi közbenjárást igényel, vagy egy központilag irányított automata mechanizmus működteti, mely visszaélésre adhat lehetőséget.        |
| Minden tevékenység átlátható és teljesen nyilvános.                                                                   | A tevékenység jellemzően nem nyilvános, így korlátozott betekintést ad a nyilvánosság számára.                                           |

### Példák a DAO-ra {#dao-examples}

Annak érdekében, hogy még érthetőbbé tegyük a DAO-k működését, az alábbiakban néhány példán keresztül bemutatjuk, mire is használhatók:

- **Egy jótékonysági szervezet** – adományokat fogadhat el a világon bárkitől, és szavazhat arról, hogy mely célokat finanszírozza.
- **Közös tulajdonjog** – vásárolhat fizikai vagy digitális eszközöket, és a tagok szavazhatnak a használatukról.
- **Kockázati tőke és támogatás** – létrehozhat egy kockázatitőke-alapot, mely befektetési tőkét gyűjt, és szavazással válaszhatók ki a támogatandó vállalkozások. A visszaérkező összegeket pedig később szétoszthatják a DAO tagjai között.

<iframe src="https://embed.ted.com/talks/lang/en/scott_fitsimones_could_a_dao_build_the_next_great_city" ></p>

<h2 id="how-daos-work" spaces-before="0">
  Hogyan működnek a DAO-k?
</h2>

<p spaces-before="0">
  A DAO gerincét az <a href="/glossary/#smart-contract">intelligens szerződés</a> adja, amely meghatározza a szervezet szabályait és birtokolja a csoport pénztárát. Amint a szerződés életbe lép az Ethereumon, csakis szavazás útján lehet módosítani a szabályokat. Ha valaki olyat próbál tenni, ami nem szerepel a szabályokban és a programlogikában, az meghiúsul. Mivel a társaság pénzügyeit is az okosszerződés határozza meg, ezért a csoport jóváhagyása nélkül senki sem költheti el a pénzösszegeket. Tehát a DAO-nak nincs szüksége központi hatóságra. Ehelyett a csoport közösen hoz döntéseket, a kifizetések pedig automatikusan jóváhagyásra kerülnek a szavazás eredményeként.
</p>

<p spaces-before="0">
  Mindez azért lehetséges, mert az okosszerződést nem lehet önkényesen megváltoztatni vagy meghamisítani, amikor már életbe lépett az Ethereumon. Senki sem tudja módosítani a programkódot (a DAO szabályait) anélkül, hogy mások azt észre ne vennék, mivel minden nyilvános.
</p>

<h2 id="ethereum-and-daos" spaces-before="0">
  Az Ethereum és a DAO-k
</h2>

<p spaces-before="0">
  Az Ethereum tökéletes alapot szolgáltat a DAO-knak számtalan okból kifolyólag:
</p>

<ul>
  <li>
    Az Ethereum saját konszenzusa decentralizált és eléggé megalapozott ahhoz, hogy a szervezetek megbízhassanak a hálózatban.
  </li>
  <li>
    Az okosszerződés tartalmát nem lehet módosítani, miután életbe lépett, még a tulajdonosok sem módosíthatják azt. Ennek következtében a DAO a meghatározott szabályok alapján fog működni.
  </li>
  <li>
    Az okosszerződések képesek pénzeszközöket küldeni és fogadni. Enélkül szükség lenne egy megbízható közvetítőre, aki a csoport eszközeit kezelné.
  </li>
  <li>
    Az Ethereum közössége bizonyítottan együttműködő, nem versenyszellemű, így a bevált gyakorlatok és a támogatórendszerek gyorsan kialakulnak.
  </li>
</ul>

<h2 id="dao-governance" spaces-before="0">
  A DAO irányítása
</h2>

<p spaces-before="0">
  A DAO irányításakor számtalan szempontot figyelembe kell venni, mint például a szavazás menete és a javaslatok kezelése.
</p>

<h3 id="governance-delegation" spaces-before="0">
  Delegáció
</h3>

<p spaces-before="0">
  A delegáció vagy felhatalmazás a DAO verziója a képviselőalapú demokráciának. A tokenek birtokosai átadják szavazati jogaikat olyan felhasználóknak, akik vállalják, hogy felügyelik a protokollt és tájékozódnak az ügyeket illetően.
</p>

<h4 id="governance-example" spaces-before="0">
  Egy híres példa
</h4>

<p spaces-before="0">
  <a href="https://claim.ens.domains/delegate-ranking">ENS</a> – Az ENS-tulajdonosok átruházhatják szavazataikat a közösség elkötelezett tagjaira, hogy képviseljék őket.
</p>

<h3 id="governance-example" spaces-before="0">
  Automatikus tranzakciókon alapuló irányítás
</h3>

<p spaces-before="0">
  Számos DAO-nál a tranzakciók automatikusan végrehajtódnak, ha a tagok határozatképes létszámban megszavazzák azt.
</p>

<h4 id="governance-example" spaces-before="0">
  Egy híres példa
</h4>

<p spaces-before="0">
  <a href="https://nouns.wtf">Főnevek</a> – A Nouns DAO-ban a tranzakció automatikusan végrehajtásra kerül, ha a szavazatok határozatképessége teljesül, és a többség igennel szavaz, mindaddig, amíg az alapítók nem vétózzák meg.
</p>

<h3 id="governance-example" spaces-before="0">
  Több aláírásos irányítás
</h3>

<p spaces-before="0">
  Míg a DAO-k több ezer szavazati joggal rendelkező taggal rendelkezhetnek, az alapok egy <a href="/glossary/#wallet">pénztárcában</a> élhetnek, amelyen 5-20 aktív közösségtag osztozik, akikben megbíznak és általában doxxelnek (a közösség által ismert nyilvános identitások). Szavazás után a <a href="/glossary/#multisig">multisig</a> aláírók végrehajtják a közösség akaratát.
</p>

<h2 id="dao-laws" spaces-before="0">
  A DAO törvényei
</h2>

<p spaces-before="0">
  1977-ben Wyoming megalkotta a korlátolt felelősségű társasági formát, mely megvédi a vállalkozót és behatárolja a felelősségi körüket. Nemrég elsőként hozták létre a DAO-kra vonatkozó törvényt, mely jogi státuszt ad a DAO-knak. Jelenleg Wyoming, Vermont és a Virgin-szigetek rendelkeznek DAO-törvénnyel valamilyen formában.
</p>

<h3 id="law-example" spaces-before="0">
  Egy híres példa
</h3>

<p spaces-before="0">
  <a href="https://citydao.io">CityDAO</a> – A CityDAO 40 hektár földet vett a Yellowstone Nemzeti Park közelében Wyoming DAO-törvényével élve.
</p>

<h2 id="dao-membership" spaces-before="0">
  DAO-tagság
</h2>

<p spaces-before="0">
  A DAO-tagságra különféle modellek léteznek. A tagság meghatározza a szavazás menetét, illetve a DAO más kulcsfontosságú részleteit.
</p>

<h3 id="token-based-membership" spaces-before="0">
  Tokenalapú tagság
</h3>

<p spaces-before="0">
  Általában teljesen <a href="/glossary/#permissionless">engedély nélküli</a>, a használt tokentől függően. Ezekkel az irányítási tokenekkel többnyire engedély nélkül lehet kereskedni <a href="/glossary/#dex">decentralizált tőzsdén</a>. Más tokenek megszerzéséhez likviditást kell biztosítani vagy más munkaigazolás (proof-of-work) szükséges. Bármelyik módon is jut hozzá, a token maga biztosítja a szavazati jogot.
</p>

<p spaces-before="0">
  <em x-id="4">Főleg arra használják, hogy kiterjedt, decentralizált protokollokat és/vagy magukat a tokeneket irányítsák ezáltal.</em>
</p>

<h4 id="token-example" spaces-before="0">
  Egy híres példa
</h4>

<p spaces-before="0">
  <a href="https://makerdao.com">MakerDAO</a> – A MakerDAO tokenje, az MKR, széles körben elérhető a decentralizált tőzsdéken, s bárki beszerezheti azokat, hogy szavazati jogot nyerjen a Maker protokoll jövőjére vonatkozóan.
</p>

<h3 id="share-based-membership" spaces-before="0">
  Részesedésalapú tagság
</h3>

<p spaces-before="0">
  A részesedésalapú DAO-k sokkal inkább engedélyhez kötöttek, de még mindig elég nyitottak. Bármelyik leendő tag beadhat egy csatlakozási kérvényt, melyben általában felajánl valamilyen értéket tokenek vagy elvégzendő munka (például számítási kapacitás) formájában. A részesedés közvetlen szavazati és tulajdonjogot jelent. A tagok bármikor kiléphetnek az arányos részesedésükkel együtt.
</p>

<p spaces-before="0">
  <em x-id="4">Főleg a szorosabb szerveződésű, emberközpontú szervezetek használják, mint az adománygyűjtők, munkaközösségek és befektetési klubok. Ezt is használhatják protokollok és tokenek irányítására.</em>
</p>

<h4 id="share-example" spaces-before="0">
  Egy híres példa
</h4>

<p spaces-before="0">
  <a href="http://molochdao.com/">MolochDAO</a> – A MolochDAO az Ethereum projektek finanszírozására összpontosít. A tagságot kérvényezni kell, melynek alapján a csoport eldönti, vajon az új tag rendelkezik a szükséges szakértelemmel és tőkével, hogy megfelelő döntést tudjon hozni a lehetséges támogatottakról. Nem lehetséges megvásárolni a DAO-tagságot a piacon.
</p>

<h3 id="reputation-based-membership" spaces-before="0">
  Reputációalapú tagság
</h3>

<p spaces-before="0">
  A reputáció a részvételt igazolja és szavazati jogot biztosít a DAO-ban. A token- és részesedésalapú tagsággal ellentétben a reputációalapú DAO nem ad tulajdonjogot a közreműködőknek. A reputációt nem lehet megvenni, átadni vagy delegálni; a DAO tagok a részvételükkel nyerik el azt. A láncon belüli szavazás nem engedélyhez kötött, a leendő tagok szabadon kérvényezhetik a DAO-hoz való csatlakozást, illetve azt, hogy a közreműködésükért cserébe reputációt és tokent kapjanak.
</p>

<p spaces-before="0">
  <em x-id="4">Jellemzően protokollok és <a href="/glossary/#dapp">dapp-ok</a> decentralizált fejlesztésére és irányítására használják, de kiválóan alkalmas különféle szervezetek, például jótékonysági szervezetek, munkavállalói kollektívák, befektetési klubok stb. számára is</em>
</p>

<h4 id="reputation-example" spaces-before="0">
  Egy híres példa
</h4>

<p spaces-before="0">
  <a href="https://DXdao.eth.link">DXdao</a> – A DXdao egy független globális csoportosulás, amely 2019 óta épít és irányít decentralizált protokollokat és alkalmazásokat. A hírnév alapú kormányzást és a <a href="/glossary/#holographic-consensus">holografikus konszenzust</a> kihasználja az alapok koordinálásához és kezeléséhez, ami azt jelenti, hogy senki sem vásárolhatja meg magát a jövőjének befolyásolásában.
</p>

<h2 id="join-start-a-dao" spaces-before="0">
  Csatlakozás DAO-hoz / DAO indítása
</h2>

<h3 id="join-a-dao" spaces-before="0">
  Csatlakozzon egy DAO-hoz
</h3>

<ul>
  <li>
    <a href="/community/get-involved/#decentralized-autonomous-organizations-daos">Az Ethereum-közösséghez tartozó DAO-k</a>
  </li>
  <li>
    <a href="https://app.daohaus.club/explore">DAOHaus által listázott DAO-k</a>
  </li>
  <li>
    <a href="https://www.tally.xyz">Tally.xyz által listázott DAO-k</a>
  </li>
</ul>

<h3 id="start-a-dao" spaces-before="0">
  DAO indítása
</h3>

<ul>
  <li>
    <a href="https://app.daohaus.club/summon">Indítson DAO-t a DAOHaus-szal</a>
  </li>
  <li>
    <a href="https://www.tally.xyz/add-a-dao">Indítson irányító DAO-t a Tally-vel</a>
  </li>
  <li>
    <a href="https://aragon.org/product">Hozzon létre egy Aragon által működtetett DAO-t</a>
  </li>
  <li>
    <a href="https://colony.io/">Hozzon létre csoportot a Colony-val</a>
  </li>
  <li>
    <a href="https://alchemy.daostack.io/daos/create">Indítson DAO-t a DAOstack által biztosított holografikus konszenzussal</a>
  </li>
</ul>

<h2 id="further-reading" spaces-before="0">
  További olvasnivaló
</h2>

<h3 id="dao-articles" spaces-before="0">
  DAO-ról szóló cikkek
</h3>

<ul>
  <li>
    <a href="https://aragon.org/dao">Mi az a DAO?</a> – <a href="https://aragon.org/">Aragon</a>
  </li>
  <li>
    <a href="https://wiki.metagame.wtf/docs/great-houses/house-of-daos">DAO-k háza</a> – <a href="https://wiki.metagame.wtf/">Metagame</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for">Mi az a DAO és mire jó?</a> – <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a">Hogyan lehet létrehozni egy DAO által működtetett digitális közösséget</a> – <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://coinmarketcap.com/alexandria/article/what-is-a-dao">Mi az a DAO?</a> – <a href="https://coinmarketcap.com">Coinmarketcap</a>
  </li>
  <li>
    <a href="https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c">Mi az a holografikus konszenzus?</a> – <a href="https://daostack.io/">DAOstack</a>
  </li>
  <li>
    <a href="https://vitalik.eth.limo/general/2022/09/20/daos.html">A DAO-k nem vállalatok: hol van a legnagyobb jelentősége a decentralizációnak az autonóm szervezetekben – Vitalik</a>
  </li>
  <li>
    <a href="https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide">DAO, DAC, DA és mások: egy nem teljes terminológiai útmutató</a> – <a href="https://blog.ethereum.org">Ethereum Blog</a>
  </li>
</ul>

<h3 id="videos" spaces-before="0">
  Videók
</h3>

<ul>
  <li>
    <a href="https://youtu.be/KHm0uUPqmVE">Mit jelent a DAO a kripto világában?</a>
  </li>
  <li>
    <a href="https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city">Felépíthet egy várost egy DAO?</a> – <a href="https://www.ted.com/">TED</a>
  </li>
</ul>
