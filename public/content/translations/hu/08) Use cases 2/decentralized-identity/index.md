---
title: Nem központilag kibocsájtott identitás
description: Mi az a nem központilag kibocsátott identitás, és miért fontos?
lang: hu
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: A hagyományos identitásrendszerek központosították az azonosítók kiadását, karbantartását és ellenőrzését.
summaryPoint2: A decentralizált identitás megszünteti a centralizált harmadik felektől való függőséget.
summaryPoint3: A kriptónak köszönhetően, a felhasználóknak újra van eszközük, hogy tárolják és kezeljék a saját azonosítójukat és tanúsítványaikat.
---

A virtuális identitás az életünk minden részét meghatározza napjainkban. Online szolgáltatások használata, bankszámla nyitás, szavazás a választásokon, ingatlan vásárlása, munkavállalás – mindegyikhez az identitás igazolása szükséges.

Azonban a hagyományos azonosításkezelési rendszerek hosszú ideje központosított szereplőkre támaszkodtak, akik kibocsátják, tárolják és kezelik az azonosítóinkat és [tanúsítványainkat](/glossary/#attestation). Ez azt jelenti, hogy nem tudjuk irányítani az azonosítással kapcsolatos információinkat, és nem dönthetünk arról, hogy ki férhet hozzá a személyazonosító információinkhoz (PII), valamint hogy ezek a felek milyen mértékű hozzáférést kapnak.

Ezen problémák megoldására decentralizált azonosítási rendszerek állnak rendelkezésre, amelyeket nyilvános blokkláncokon, például az Ethereumon, építettek. A decentralizált azonosítás lehetővé teszi az egyének számára, hogy kezeljék az azonosítással kapcsolatos információikat. A decentralizált azonosítási megoldásokkal _Ön is_ létrehozhat azonosítókat, illetve anélkül igényelhet és tárolhat tanúsítványokat, hogy központi hatóságokra, mint például szolgáltatók vagy kormányok, támaszkodna.

## Mi az az identitás? {#what-is-identity}

Az identitás az egyén önmagához való viszonyának értelmezése, egyedi jellemzők által meghatározva. Az identitás az _egyént_ jelenti, azaz egy különálló emberi entitást. Jelenthet még nem emberi entitást is, mint például egy szervezetet vagy hatóságot is.

<YouTube id="Ew-_F-OtDFI" />

## Mik az azonosítók? {#what-are-identifiers}

Az azonosító egy olyan információ, mely sajátos identitásra vagy identitásokra mutat rá. A hétköznapi azonosítók többek között:

- Név
- Társadalombiztosítási szám / adószám
- Mobilszám
- Születési idő és hely
- Digitális azonosítók, mint e-mail-cím, felhasználói név, avatár

Ezeket a hagyományos azonosítókat központi hatóságok bocsátják ki, tárolják és kontrollálják. Engedélyre van szükség a kormánytól ahhoz, hogy valaki megváltoztassa a nevét, vagy a közösségi média platformtól arra, hogy megváltoztassa a profilját.

## A decentralizált identitás előnyei {#benefits-of-decentralized-identity}

1. A decentralizált identitás növeli az egyénnek a saját azonosítói feletti kontrollját. A decentralizált azonosítók és tanúsítások anélkül igazolhatók, hogy egy központi hatóságra vagy egy harmadik fél által nyújtott szolgáltatásra kellene támaszkodni.

2. A decentralizáltidentitás-megoldások úgy képesek igazolni és kezelni egy felhasználó identitását, hogy nem kell megbízni egy másik félben, zökkenőmentes és védi a magán jellegű információkat.

3. A decentralizált identitás a blokklánc-technológiát felhasználva teremt bizalmat a különböző felek között és a tanúsítások érvényességét igazolva nyújt kriptográfiai garanciát.

4. A decentralizált identitás átvihetővé, hordozhatóvá teszi a identitáshoz kapcsolódó adatokat. A felhasználók a mobil tárcájukban tárolják a tanúsításokat és azonosítókat, és eldönthetik, hogy kivel osztják meg azokat. A decentralizált azonosítók és tanúsítások nem az azokat kibocsátó szervezet adatbázisába vannak zárva.

5. A decentralizált identitás jól illeszkedik a most kialakuló [nulla tudású (zero-knowledge)](/glossary/#zk-proof) technológiákhoz, mellyel az egyének anélkül tudják igazolni tulajdonukat vagy eredményeiket, hogy feltárnák, mi is az pontosan. Ez egy hatásos módja annak, hogy a bizalmat és a magán jelleget kombinálják olyan felhasználási módoknál, mint amilyen például a szavazás.

6. A decentralizált identitás lehetővé teszi az [anti-Sybil](/glossary/#anti-sybil) mechanizmust, feltárva azt, amikor egyetlen ember több személynek adja ki magát egy adott játékban vagy azért, hogy teleszemetelje (spam) a rendszert.

## A decentralizált identitás alkalmazásai {#decentralized-identity-use-cases}

A decentralizált identitás számtalan esetben alkalmazható:

### 1. Univerzális bejelentkezés (login) {#universal-dapp-logins}

A decentralizált identitás segíthet, hogy a jelszóalapú bejelentkezésk helyett decentralizált hitelesítés legyen. A szolgáltatók tanúsításokat bocsáthatnak ki a felhasználóknak, amelyet az Ethereum-tárcájukban tárolnak. Például egy olyan tanúsítvány, ami egy [NFT](/glossary/#nft), és hozzáférést biztosít egy online közösséghez.

Az [Ethereumba való bejelentkezés](https://login.xyz/) funkció ekkor lehető tenné a szervereknek, hogy megerősítsék a felhasználó Ethereum-számláját és lekérdezzék az ehhez szükséges tanúsításokat a számlacímükről. Ezáltal a felhasználónak nem kell hosszú jelszavakat megjegyeznie ahhoz, hogy különböző platformokat és weboldalakat érjen el, és így jobb felhasználói élményben lehet része.

### 2. Ügyfél-azonosítás (KYC) {#kyc-authentication}

Az online szolgáltatások használatakor a felhasználóknak tanúsításokat és hitelesítő adatokat kell megadniuk, mint például vezetői engedély vagy útlevél. Ez azonban aggodalomra adhat okot, mivel a magánjellegű információkkal visszaélhetnek, a szolgáltatók pedig nem tudják ellenőrizni a tanúsítások hitelességét.

A decentralizált identitás révén a cégek elhagyhatják a hagyományos [ügyfél-azonosítást (KYC)](https://en.wikipedia.org/wiki/Know_your_customer), és ehelyett az ügyfelek identitását az igazolható bizonyítványok (VC) révén ellenőrizhetik. Ez csökkenti az azonosítások kezelésének költségét, és kivédi a hamis iratok használatát is.

### 3. Szavazás és online közösségek {#voting-and-online-communities}

Az online szavazás és a közösségi média két új alkalmazási területe a decentralizált identitásnak. Az online szavazások ki vannak téve a manipulációnak, főleg ha a rosszindulatú szereplők hamis identitásokat hoznak létre, hogy azokkal szavazzanak. A szavazás folyamatának integritását nagy mértékben növelné, ha az egyének a láncon belüli tanúsításokkal igazolnák magukat.

A decentralizált identitás segít olyan online közösségek létrehozásában, melyek mentesek a hamis profiloktól. Például minden felhasználónak igazolnia kell a kilétét egy láncon belüli azonosítási rendszerrel, mint amilyen az Ethereum Névszolgáltatás (ENS), és így kizárhatók a nem emberi résztvevők (bot).

### 4. Anti-Sybil védelem {#sybil-protection}

A támogatást adó alkalmazások, melyek [kvadratikus szavazást](/glossary/#quadratic-voting) használnak, sebezhetők a [Sybil-támadásokkal](/glossary/#sybil-attack) szemben, mert a támogatás összege növekszik, ha több szavazat érkezik rá. Ez pedig arra ösztönzi a résztvevőket, hogy több identitással vegyenek részt a folyamatban. A decentralizált identitás megakadályozza ezt, mivel a résztvevők könnyedén igazolhatják, hogy valódi emberek, és nem kell hozzá specifikus, magán jellegű információkat feltárniuk magukról.

## Mi az a tanúsítás? {#what-are-attestations}

A tanúsítás egy olyan állítás, melyet az egyik entitás ad a másikról. Az Amerikai Egyesült Államokban a vezetői engedélyt a Gépjárművekkel foglalkozó hivatal (egyik entitás) bocsátja ki, mellyel tanúsítja, hogy az illető személy (másik entitás) autót vezethet.

A tanúsítás nem azonos az azonosítókkal. A tanúsításhoz _szükség van_ azonosítókra, hogy egy sajátos identitásra hivatkozzanak, és az ehhez tartozó valamilyen jellemzőről adjanak egy állítást. Tehát a jogosítvány tartalmaz azonosítókat (név, születési idő, cím), ugyanakkor tanúsítja az autóvezetési jogosultságot.

### Mik azok a decentralizált azonosítók? {#what-are-decentralized-identifiers}

A hagyományos azonosítók, mint a hivatalos név vagy e-mail-cím, harmadik személyen múlnak – a kormányokon és az e-mail-szolgáltatókon. A decentralizált azonosítók (DID) különböznek ezektől – ezeket nem egy központi hatóság állítja ki, kezeli vagy kontrollálja.

A decentralizált azonosítókat az egyének állítják ki, kezelik és kontrollálják. Az [Ethereum-számla](/glossary/#account) is egy decentralizált azonosító. A felhasználó annyi számlát hozhat létre, amennyit csak akar, anélkül hogy bárki engedélyére szükség lenne vagy egy központ nyilvántartásban kellene tárolni azokat.

A decentralizált azonosítókat elosztott főkönyveken ([blokklánc](/glossary/#blockchain)) vagy [peer-to-peer hálózatokon](/glossary/#peer-to-peer-network) tárolják. Ennek okán a DID-ekre az jellemző, hogy [globálisan egyediek, sokrétűen felhasználhatók és kriptográfiával ellenőrizhetők](https://w3c-ccg.github.io/did-primer/). A decentralizált azonosító különféle entitásokhoz kapcsolódhat, mint emberek, szervezetek vagy kormányzati szervek.

## Mi teszi lehetővé a decentralizált azonosítók használatát? {#what-makes-decentralized-identifiers-possible}

### 1. Nyilvánoskulcs-kriptográfia {#public-key-cryptography}

A nyilvánoskulcs-kriptográfia egy olyan információbiztonsági lépés, amely az entitás számára egy [nyilvános kulcsot](/glossary/#public-key) és egy [privát kulcsot](/glossary/#private-key) hoz létre. A nyilvános kulcson alapuló [kriptográfiát](/glossary/#cryptography) a blokklánchálózatok arra használják, hogy igazolják a felhasználók identitását és a digitális eszközök tulajdonjogát.

Néhány decentralizált azonosító, mint amilyen az Ethereum-számla, egyaránt rendelkezik nyilvános és privát kulccsal. A nyilvános kulcs meghatározza a számla birtokosát, miközben a privát kulcs aláírhatja az adott számlához tartozó üzeneteket, illetve feloldhatja azok titkosítását. A nyilvánoskulcs-kriptográfia igazolja az entitások identitását, megakadályozza, hogy valaki más felöltse azt vagy hamisat használjon – mindezt a [kriptográfiai aláírás](https://andersbrownworth.com/blockchain/public-private-keys/) révén, amely minden állítást igazol.

### 2. Decentralizált adattárolók {#decentralized-datastores}

A blokklánc egy igazolható adatnyilvántartásként működik: az információk nyilvános, decentralizált tárhelye, melynek használatakor nem kell megbízni egy központi szereplő (jóhiszemű) magatartásában. A nyilvános blokkláncok létezése miatt nincs többé szükség arra, hogy az azonosítókat központi nyilvántartásokban tárolják.

Ha valaki szeretné egy decentralizált azonosító érvényességét ellenőrizni, akkor a blokkláncon megkeresheti a hozzá tartozó nyilvános kulcsot. Ez különbözik a hagyományos azonosítóktól, ahol harmadik entitás tudja csak igazolni azt.

## A decentralizált azonosítók és a tanúsítás hogyan teszi lehetővé a decentralizált identitást? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

A decentralizált identitás az az elképzelés, hogy az identitáshoz kapcsolódó információkat mindenki maga kontrollálja, azok privátak és hordozhatók, átvihetők, melynek az elsődleges építőkövei a decentralizált azonosítók és a tanúsítások.

A decentralizált identitás kontextusában a tanúsítások (más néven [Igazolható bizonyítványok vagy hitelesítő adatok / VC](https://www.w3.org/TR/vc-data-model/)) olyan hamisításmentes, kriptográfiailag igazolható állítások, melyeket a kibocsátó készít. Minden tanúsítás vagy igazolható bizonyítvány, amit egy entitás (például egy szervezet) kiállít, az kapcsolódik az ő decentralizált azonosítójukhoz (DID).

Mivel a DID-ek a blokkláncon vannak tárolva, ezért bárki ellenőrizni tudja a tanúsítás érvényességét azáltal, hogy megnézi az Ethereumon a kiállító DID-jét. Lényegében az Ethereum-blokklánc olyan, mint egy globális könyvtár, ahol az adott entitásokhoz kapcsolódó decentralizált azonosítókat igazolni lehet.

A decentralizált azonosítók teszik lehetővé, hogy a tanúsításokat a kiállító maga kontrollálja és azok igazolhatók legyenek. Ha a kiállító már nem is létezik, a tanúsítást kapó entitás mindig rendelkezik annak eredetének és érvényességének bizonyítékával.

A decentralizált azonosítók elengedhetetlenek abban is, hogy megvédjék a személyes adatok magán jellegét a decentralizált identitás révén. Például, ha egy egyén beadja egy tanúsítás bizonyítékát (egy vezetői engedélyt), akkor az azt igazoló félnek nem kell ellenőrizni a bizonyítékban található adatok érvényességét. Ehelyett az ellenőrző félnek csak a tanúsítás eredetiségének kriptográfiai garanciáira, valamint a kiállító szervezet identitására van szükség ahhoz, hogy a bizonyíték érvényességét megállapítsa.

## A tanúsítások típusai a decentralizált identitás esetében {#types-of-attestations-in-decentralized-identity}

A tanúsítások tárolása és visszakeresése az Ethereumon alapuló, identitáshoz kötődő ökoszisztémában eltérően működik, mint a hagyományos identitáskezelés. Különféle megközelítések léteznek, hogyan állítják ki, tárolják és igazolják a tanúsításokat a decentralizált identitást biztosító rendszerekben:

### Blokkláncon kívüli tanúsítások {#off-chain-attestations}

A blokkláncon való tanúsítástárolással kapcsolatban felmerül az a konszern, hogy olyan információkat tartalmazhat, melyeket az egyének privát módon szeretnének kezelni. Az ilyen tanúsítások tárolása az Ethereum-blokkláncon, annak nyilvános természete miatt nem előnyös.

Erre az a megoldás, hogy a kiállított tanúsításokat a felhasználók láncon kívül tartják digitális tárcákban, de azok alá vannak írva a kiállító decentralizált azonosítójával (DID), mely a láncon belül elérhető. Ezeket a tanúsításokat [JSON Web Tokenként](https://en.wikipedia.org/wiki/JSON_Web_Token) kódolják, és tartalmazzák a kiállító digitális aláírását – így a láncon kívüli azonosítási igényeket könnyedén igazolni tudja.

A következő példa elmagyarázza a láncon kívüli tanúsításokat:

1. Egy egyetem (kiállító) létrehoz egy tanúsítást (egy digitális egyetemi diplomát), aláírja azt a kulcsaival, és átadja Bobnak (az identitás tulajdonosának).

2. Bob egy állásra jelentkezik és igazolni akarja iskolai tanulmányait a munkaadónak, ezért megosztja vele a tanúsítást a mobil tárcájából. A vállalat (ellenőrző) ekkor megbizonyosodhat a tanúsítás érvényességéről azáltal, hogy megnézi a kiállító DID-jét (pl. az Ethereumon lévő nyilvános kulcsát).

### Blokkláncon kívüli tanúsítások állandó eléréssel {#offchain-attestations-with-persistent-access}

Ebben az elrendezésben a tanúsításokat átalakítják JSON file-okká és a láncon kívül tárolják (ideálisan egy [decentralizált felhőben](/developers/docs/storage/), mint a IPFS vagy a Swarm). Azonban a JSON-fájl [hash-kódja](/glossary/#hash) a láncon van eltárolva és egy DID-hez kapcsolódik egy láncon belüli nyilvántartáson keresztül. A kapcsolódó DID lehet a tanúsítás kiállítójáé vagy azé, aki azt kapta.

Ez a megközelítés lehetővé teszi, hogy a tanúsítások állandóan elérhetők legyenek a blokkláncon, miközben a kapcsolódó információk titkosítottak és igazolhatók. Mivel a privát kulcs tulajdonosa titkosítani tudja az információt, ezért képes szelektív módon nyilvánossá tenni azt.

### Blokkláncon belüli tanúsítások {#onchain-attestations}

A blokkláncon belüli tanúsítások [okosszerződésekben](/glossary/#smart-contract) vannak tárolva az Ethereum-blokkláncon. Az okosszerződés (ami nyilvántartásként működik) hozzáköti a tanúsítást egy kapcsolódó, láncon belüli decentralizált azonosítóhoz (egy nyilvános kulcshoz).

A következő példa bemutatja, hogyan működik a láncon belüli tanúsítás a gyakorlatban:

1. Egy cég (XYZ vállalat) azt tervezi, hogy egy okosszerződésen keresztül tulajdonosi részvényeket ad el, de csak olyan vásárlókat fogad el, akiknek a háttere ellenőrizve lett.

2. XYZ vállalat a háttérellenőrzéssel megbízott cégtől láncon belüli tanúsításokat kap az Ethereumon. Ez a tanúsítás igazolja, hogy az egyén megfelelt az ellenőrzés során, de nem tárja fel semmilyen személyes adatát.

3. A részvényeket eladó okosszerződés meg tudja nézni az átvilágított vevőkre vonatkozó nyilvántartási szerződést, így meghatározhatja, hogy kik vásárolhatnak részvényt.

### Egyénhez kötött tokenek és identitás {#soulbound}

Az [egyénhez kötött tokeneket](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([nem átadható NFT-k](/glossary/#nft)) arra lehet használni, hogy egy adott tárcához tartozó egyedi információkat gyűjtsenek. Ez gyakorlatilag létrehoz egy egyedi, láncon belüli identitást, amely egy adott Ethereum-címhez kötődik, és eredményeket (mint egy online tanfolyam elvégzése vagy egy játékban elért szint) vagy közösségi részvételt jelentő tokeneket foglal magába.

## Használjon decentralizált identitást {#use-decentralized-identity}

Számtalan ambiciózus projekt használja az Ethereumot a decentralizált identitási megoldások alapjaként:

- **[Ethereum Névszolgáltatás (ENS)](https://ens.domains/)** – _Egy decentralizált névadó rendszer a láncon belüli, gép által kiolvasható azonosítókra, mint amilyenek az Ethereum-tárcacímek, a tartalomra vonatkozó hash-kódok és a metaadatok._
- **[SpruceID](https://www.spruceid.com/)** – _Egy decentralizált identitási projekt, mely lehetővé teszi, hogy a felhasználók a digitális identitásukat Ethereum-számlákkal és ENS-profilokkal kontrollálják ahelyett, hogy harmadik személyre támaszkodnának._
- **[Ethereum tanúsítási szolgáltatás (EAS)](https://attest.sh/)** – _Egy decentralizált főkönyv/protokoll láncon belüli vagy láncon kívüli tanúsítások készítésére._
- **[Proof of Humanity](https://www.proofofhumanity.id)** – _Az emberség igazolása (PoH) egy közösségi identitás igazolására készült rendszer, mely az Ethereumra épül._
- **[BrightID](https://www.brightid.org/)** – _Egy decentralizált, nyílt forráskódú, közösségi identitási hálózat, amely új módot keres az azonosításra egy közösségi gráf megalkotásával és elemzésével._
- **[walt.id](https://walt.id)** – _Nyílt forráskódú, decentralizált identitás- és tárcainfrastruktúra, amely lehetővé teszi a fejlesztőknek és szervezeteknek, hogy kihasználják a szuverén identitást, valamint az NFT-ket/SBT-ket._
- **[Veramo](https://veramo.io/)** – _Egy JavaScript keretrendszer, amellyel bárki könnyedén tud kriptográfiailag ellenőrizhető adatot használni az alkalmazásaiban._

## További olvasnivaló {#further-reading}

### Cikkek {#articles}

- [Blokklánc esettanulmányok: blokklánc a digitális identitás területén](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Mi az az Ethereum ERC725? Független identitáskezelés a blokkláncon](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Hogyan tudja a blokklánc megoldani a digitális identitás problémáját](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Mi az a decentralizált identitás és miért érdemes figyelembe venni?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Bevezetés a decentralizált identitás világába](https://walt.id/white-paper/digital-identity) – _Dominik Beron_

### Videók {#videos}

- [Decentralizált identitás (Bonus Livestream Session)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Kiváló magyarázó videó a decentralizált identitásról Andreas Antonopoloustól_
- [Az Ethereumba való bejelentkezés és a decentralizált identitás témája a Ceramic, IDX, React és 3ID Connect használatával](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _YouTube útmutató a személyazonosítási rendszer kiépítéséről, mely az Ethereum-tárca alapján létrehozza, kiolvassa és frissíti a felhasználó profilját – Nader Dabit_
- [BrightID – Decentralizált identitás az Ethereumon](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Bankless podcast epizód a BrightID-ról, ami egy decentralizált identitási megoldás az Ethereumon_
- [A láncon kívüli internet: decentralizált identitás és igazolható bizonyítványok (VC)](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — EthDenver 2022 Evin McMullen prezentációja
- [A hitelesítő adatok bemutatása](https://www.youtube.com/watch?v=ce1IdSr-Kig) – YouTube magyarázó videó példával Tamino Baumanntól

### Közösségek {#communities}

- [ERC-725 szövetség a GitHubon](https://github.com/erc725alliance) — _Az ERC725 szabvány támogatói, mely az Ethereum-blokkláncon való identitáskezelést célozza_
- [SpruceID Discord-szerver](https://discord.com/invite/Sf9tSFzrnt) — _Rajongók és fejlesztők közössége, akik az Ethereumba való bejelentkezés funkcióján dolgoznak_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Fejlesztői közösség, melynek célja az alkalmazásokhoz szükséges igazolható adatok keretrendszerének kidolgozása_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) – _Fejlesztők és építők közössége, akik a decentralizált identitás számtalan iparágban való felhasználási területeivel foglalkoznak_
