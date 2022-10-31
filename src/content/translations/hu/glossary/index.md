---
title: Ethereum szótár
description: Szójegyzék az Ethereumhoz kapcsolódó technikai és nem technikai szavakról, a teljesség igénye nélkül
lang: hu
sidebarDepth: 2
---

# Összegzés {#ethereum-glossary}

<Divider />

## # {#section-numbers}

### 51% attack (51%-os támadás) {#51-attack}

Egy decentralizált [hálózat](#network) ellen irányuló támadás, amikor egy csoport irányítja a [csomópontok](#node) többségét. Ez lehetővé tenné számukra, hogy meghamisítsák a blokkláncot [tranzakciók](#transaction) visszaállításával és [ether](#ether) vagy más token kétszeres elköltésével.

## A {#section-a}

### account (számla) {#account}

Egy objektum, mely egy [címet](#address), egy egyenleget, [egy nonce-t](#nonce), és opcionálisan tárhelyet és kódot tartalmazhat. Egy számla lehet [szerződéses számla](#contract-account) vagy egy [külső tulajdonú számla (EOA)](#eoa).

<DocLink to="/developers/docs/accounts">
  Ethereum számlák
</DocLink>

### address (cím) {#address}

Általánosságban ez egy [EOA-t](#eoa) vagy egy [szerződést](#contract-accouint) reprezentál, mely fogadhat (cél cím) vagy küldhet (eredő cím) [tranzakciókat](#transaction) a blokkláncon. Pontosabban ez egy [ECDSA](#ecdsa) [publikus kulcs](#public-key) [Keccak hashének](#keccak-256) jobb oldalra eső 160 bitje.

### assert {#assert}

A [Solidity-ben](#solidity), az `assert(false)` a `0xfe` opkódra fordítódik, mely egy érvénytelen opkód, ami felhasználja az összes megmaradt [gázt](#gas) és visszaállítja a változásokat. Ha egy `assert()` állítás meghiúsul, akkor valami nagyon rossz és váratlan történik, és meg kell javítanod a kódot. Az `assert()` kódot, olyan feltételek elkerülésére kell használnod, melynek soha sem szabad megtörténnie.

<DocLink to="/developers/docs/smart-contracts/security/">
  Biztonság
</DocLink>

### attestation (tanúsítás) {#attestation}

Egy validátor szavazata egy [Beacon Chain](#beacon-chain) vagy egy [shard](#shard) [blokkra](#block). A validátoroknak tanúsítaniuk kell a blokkokat, jelezve, hogy egyetértenek a blokk által javasolt állapottal.

<Divider />

## B {#section-b}

### Beacon Chain {#beacon-chain}

Egy Eth2 fejlesztés, mely az Ethereum hálózat koordinátora lesz. Bevezeti a [letétbizonyítékot](#proof-of-stake) és a [validátorokat](#validator) az Ethereumra. Idővel össze fog olvadni a [főhálózattal](#mainnet).

<DocLink to="/upgrades/beacon-chain/">
  Beacon Chain
</DocLink>

### big-endian {#big-endian}

Helyzeti számábrázolás, ahol a legfontosabb számjegy az első a memóriában. A little-endian az ellentéte, ahol a legkevésbé jelentős számjegy az első.

### blokk {#block}

A szükséges információ (egy blokk fejléc) gyűjteménye a befoglalt [tranzakciókról](#transaction), és más blokk fejlécek halmaza, melyet [ommereknek](#ommer) hívunk. A blokkokat a [bányászok](#miner) adják hozzá az Ethereum hálózathoz.

<DocLink to="/developers/docs/blocks/">
  Blokkok
</DocLink>

### blokklánc {#blockchain}

Az Ethereumban [blokkok](#block) sorozatát jelenti, melyeket a [proof-of-work](#pow) rendszer érvényesít, mindegyik kapcsolódik az előzőhöz egészen a [genezis blokkig](#genesis-block). Nincsen blokk méret határ, ehelyett [gáz limitet](#gas-limit) használunk.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Mi az a blokklánc?
</DocLink>

### bytecode {#bytecode}

Egy absztrakt utasításkészlet, amelyet egy szoftver fordító vagy virtuális gép általi hatékony végrehajtásra terveztek. Az emberek által is olvasható forráskóddal ellentétben a bájtkód numerikus formátumban van kifejezve.

### Byzantium fork (Byzantium elágazás) {#byzantium-fork}

Az első a két [hard forkból](#hard-fork) a [Metropolis](#metropolis) fejlesztési szinthgez. Tartalmazta az EIP-649 Metropolis [nehézség bomba](#difficulty-bomb) késeltetést és a blokk jutalom csökkentését, ahol az [Ice Age](#ice-age) el lett tolva 1 évvel és a blokk jutalom lecsökkent 5 etherről 3 etherre.

<Divider />

## C {#section-c}

### compiling (fordítás) {#compiling}

Egy magas szintű nyelvben (pl.: [Solidity](#solidity)) írt kód átkonvertálása egy alacsonyabb szintű nyelvre (pl.: EVM [bájtkód](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Okos szerződések fordítása
</DocLink>

### committee (bizottság) {#committee}

Legalább 128 [validátorból](#validator) álló csoport, akiket hozzárendeltek a beacon vagy shard blokkok validálására véletlenszerűen [a Beacon Chain](#beacon-chain) által.

### consensus (konszenzus) {#consensus}

Ha számos csomópont (általában a legtöbb csomópont a hálózaton) ugyanazokkal a blokkokkal rendelkezik a saját lokálisan validált legjobb blokkláncukon. Nem összekeverendő a [konszenzus szabályokkal](#consensus-rules).

### consensus rules (konszenzus szabályok) {#consensus-rules}

A blokk érvényesítési szabályai, amelyeket a teljes csomópontok követnek, hogy más csomópontokkal konszenzusban maradjanak. Nem összekeverendő a [konszenzussal](#consensus).

### Constantinople fork (Constantinople elágazás) {#constantinople-fork}

A [Metropolis](#metropolis) fázis második része, eleinte 2018 közepére tervezték. Egy váltást tartalmazott volna egy hibrid [proof-of-work](#pow)/[proof-of-stake](#pos) konszenzus algoritmusra más változtatásokkal együtt.

### contract account (szerződéses számla) {#contract-account}

Egy számla, mely kódot tartalmaz, mely lefut, amikor kap egy [tranzakciót](#transaction) egy másik [számláról](#account) ([EOA](#eoa) vagy [szerződéses](#contract-account)).

### contract creation transaction (szerződés létrehozó tranzakció) {#contract-creation-transaction}

Egy speciális [tranzakció](#transaction), a [zéró címmel](#zero-address) mint a fogadó, melyet arra használunk, hogy egy [szerződést](#contract-account) regisztráljunk és rögzítsük az Ethereum blokkláncra.

### crosslink (kereszt kapcsolat) {#crosslink}

A kereszt kapcsolat egy összesítést ad vissza egy shard állapotáról. Így fognak a [shard](#shard) láncok kommunikálni egymással [Beacon Chain-en](#beacon-chain) keresztül a [proof-of-stake rendszerben](#proof-of-stake).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

<Divider />

## D {#section-d}

### Decentralized Autonomous Organization (DAO) {#dao}

Egy olyan vállalat vagy szervezet, amely hierarchikus menedzsment nélkül működik. A DAO utalhat a "The DAO" nevű szerződésre, melyet 2016 április 30.-án indítottak, és 2016 júniusában meghackeltek; ez végül erősen motiválta a [hard forkot](#hard-fork) (DAO kódnév) az 1,192,000 blokkban, mely visszaállította a meghackelt DAO szerződést és az Ethereum és az Ethereum Classic szétválását okozta két rivális rendszerré.

<DocLink to="/community/#decentralized-autonomous-organizations-daos">
  Decentralizált autonóm szervezetek (DAO-k)
</DocLink>

### Dapp {#dapp}

Decentralizált alkalmazás. Legalább egy [okosszerződés](#smart-contract) és egy webes felhasználói felület. Tágabb értelemben egy dapp egy olyan web alkalmazás, mely egy decentralizált, peer-to-peer infrastruktúra szolgáltatásra épült. Továbbá sok dapp tartalmazhat decentralizált tárhelyet és/vagy egy üzenetküldő protokollt és platformot.

<DocLink to="/developers/docs/dapps/">
  Bevezetés a dappokba
</DocLink>

### decentralizált tőzsde (DEX) {#dex}

Egy [dapp](#dapp) típus, mellyel tokeneket cserélhetsz a peerekkel a hálózaton. Szükséged lesz [etherre](#ether) a használatukhoz (a [tranzakciós díjak](#transaction-fee) kifizetésére) de nincsenek kitéve a földrajzi megszorításoknak, mint a centralizált tőzsdék – bárki használhatja őket.

<DocLink to="/get-eth/#dex">
  Decentralizált tőzsdék
</DocLink>

### deed {#deed}

Lásd [nem felcserélhető token (NFT)](#nft)

### defi {#defi}

A "decentralized finance", vagyis "decentralizált pénzügy" rövidítése, amely olyan [Dappok](#dapp) széles kategóriája, melyeknek célkitűzése blokklánc alapú pénzügyi szolgáltatások létrehozása, köztes szereplők nélkül, így bárki részt vehet benne internetkapcsolattal.

<DocLink to="/dapps/#explore">
  Defi dappok
</DocLink>

### difficulty (nehézség) {#difficulty}

Egy hálózati szintű beállítás, mely beszabályozza, hogy mennyi számítás szükséges egy [proof-of-work](#pow) létrehozásához.

### difficulty bomb (nehézség bomba) {#difficulty-bomb}

A [proof-of-work](#pow) [nehézség](#difficulty) tervezett exponenciális megnövelése, mely motiválja a [proof-of-stake-re](#pos) történő átállást, csökkenti a [forknak](#hard-fork) a változásait

### digitális aláírás {#digital-signatures}

Egy rövid adat sztring, melyet egy felhasználó hoz létre egy dokumentumhoz egy [privát kulcs](#private-key) használatával úgy, hogy bárki a hozzátartozó [publikus kulccsal](#public-key), az aláírással és a dokumentummal hitelesíteni tudja, hogy (1) a dokumentumot "aláírta" a bizonyos privát kulcs tulajdonosa, és (2) a dokumentum nem változott miután aláírták.

<Divider />

## E {#section-e}

### elliptikus görbe digitális aláírás algoritmus (ECDSA) {#ecdsa}

Az Ethereum által használt kriptográfiai algoritmus, mely biztosítja, hogy a javakat csak a tulajdonosok költhetik el.

### epoch (korszak) {#epoch}

Egy 32 [slotból](#slot) álló periódus (6.4 perc) a [Beacon Chain](#beacon-chain)-által koordinált rendszerben. A [validátor](#validator) [bizottságokat](#committee) összekeverik minden korszakban biztonsági okokból. Minden korszakban esély van a lánc [véglelesítésére](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### Ethereum Fejlesztési Javaslatok (EIP-k) {#eip}

Tervezési dokumentum, amely információkat nyújt az Ethereum közösség számára, és ismerteti a javasolt új funkciót, annak folyamatait vagy környezetét (lásd [ERC](#erc)).

<DocLink to="/eips/">
  Bevezetés az EIP-kbe
</DocLink>

### Ethereum Name Service (ENS) {#ens}

Az ENS jegyzés az egyedüli, központi [szerződés](#smart-contract), mely egy leképezést szolgáltat a domén nevek és a tulajdonosok és a feloldók között, ahogy az [EIP](#eip) 137-ben elő van írva.

[Olvass róla többet a ens.domains](https://ens.domains)

### entrópia {#entropy}

A kriptográfia kontextusában a megjósolhatóság hiányát vagy a véletlenszerűség mértékét jelenti. Amikor titkos információkat generálunk, mint a [privát kulcsok](#private-key), az algoritmusok általában egy magas entrópia forrásra támaszkodnak, hogy biztosítsák a kimenet megjósolhatatlanságát.

### externally owned account (EOA) {#eoa}

Egy emberi felhasználók által vagy számára létrehozott [számla](#account) az Ethereum hálózaton.

### Ethereum Request for Comments (ERC) {#erc}

Néhány [EIP-hez](#eip) tartozó címke, melyek specifikus Ethereum használati szabványokat definiálnak.

<DocLink to="/eips/">
  Bevezetés az EIP-kbe
</DocLink>

### Ethash {#ethash}

Az Ethereum 1.0 [munkabizonyíték](#pow) algoritmusa.

[Olvass róla többet a eth.wiki oldalon](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Az Ethereum ökoszisztéma által használt natív kriptovaluta, mely fedezi a [gáz](#gas) költségeket tranzakciók végrehajtásakor. Írásban találkozhatunk vele ETH-ként vagy a Ξ szimbólumként is, ami a nagybetűs görög kszí karakter.

<DocLink to="/eth/">
  A digitális jövőnk valutája
</DocLink>

### events (események) {#events}

Az [EVM](#evm) logolási lehetőségeinek használatát teszi lehetővé. A [dappok](#dapp) figyelhetik az eseményeket és a használatukkal JavaScript callback függvényeket triggerelhetnek az felhasználói felületen.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Események és naplózások
</DocLink>

### Ethereum virtuális gép (EVM) {#evm}

Egy stack alapú virtuális gép, mely [bájtkódot](#bytecode) futtat. Az Ethereumban a lefutási modell előírja, hogyan fog a rendszerállapot megváltozni adott bájtkód sorozattól és a környezeti adatok egy kis sorától. Ez a virtuális állapot gép formális modelljében van előírva.

<DocLink to="/developers/docs/evm/">
  Ethereum virtuális gép
</DocLink>

### EVM assembly nyelv {#evm-assembly-language}

Az EVM [bájtkód](#bytecode) emberek számára is olvasható változata.

<Divider />

## F {#section-f}

### fallback függvény {#fallback-function}

Egy alap függvény, mely adat vagy deklarált függvény név hiánya esetén hívódik meg.

### faucet (csap) {#faucet}

Egy [okosszerződés](#smart-contract) által működtetett szolgáltatás, mely javakat bocsájt ki ingyenes teszt ether formájában, melyet a tesztneten lehet használni.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Tesztnet csapok
</DocLink>

### véglegesség {#finality}

A véglegesség a garancia arra, hogy az adott tranzakciók egy bizonyos idő előtt nem fognak megváltozni és nem lehet visszavonni őket.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Proof-of-work véglegesség
</DocLink> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Proof-of-stake véglegesség
</DocLink>

### finney {#finney}

Az [ether](#ether) egyik részegysége. 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### fork (elágazás) {#fork}

Egy protokoll változtatás, mely egy alternatív lánc létrejöttét vonja magával, vagy egy átmeneti eltérés két potenciális blokk útvonal között bányászat közben.

### fraud proof (csalási bizonyítás) {#fraud-proof}

Bizonyos [2. réteg](#layer-2) megoldások biztonsági modellje, ahol a sebesség növelése érdekében a tranzakciókat csoportokba [összegzik](#rollups) és egy tranzakcióként továbbítják az Ethereumra. Érvényesnek feltételezzük őket, de meg lehet kérdőjelezni, ha csalást feltételezünk. Ekkor lefut egy csalási bizonyítás, mely ellenőrzi, hogy történt-e csalás. Ez a módszer növeli a lehetséges tranzakciók mennyiségét mialatt fenntartja a biztonságot. Néhány [összegző](#rollups) [érvényességi bizonyítást](#validity-proof) használ.

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups">
  Optimista összegzők
</DocLink>

### frontier {#frontier}

Az Ethereum kezdeti teszt fejlesztési fázisa, mely 2015 júliusától 2016 márciusáig tartott.

<Divider />

## G {#section-g}

### gas (gáz) {#gas}

Egy virtuális üzemanyag, melyet az Ethereumon használunk okosszerződések végrehajtására. Az [EVM](#evm) egy könyvelési mechanizmust használ, amivel méri a gázfogyasztást és behatárolja a számítási kapacitások fogyasztását (lásd [Turing teljes](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gáz és tranzakciós díjak
</DocLink>

### gas limit (gáz limit) {#gas-limit}

A [gáz](#gas) maximális mennyisége, amit egy [tranzakció](#transaction) vagy egy [blokk](#block) elfogyaszthat.

### genesis blokk {#genesis-block}

Egy [blokklánc](#blockchain) első blokkja, amit egy adott hálózat és a kriptovalutája elindítására használnak.

### geth {#geth}

Go Ethereum. Az Ethereum egyik legprominensebb implementációja Go-ban írva.

[Olvass róla többet a geth.ethereum.org oldalon](https://geth.ethereum.org/)

### gwei {#gwei}

A gigawei rövidítése, az [ether](#ether) egyik részegysége, gyakran a [gáz](#gas) díjak elszámolására használjuk. 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### hard fork {#hard-fork}

A [blokklánc](#blockchain) permanens eltérése; más néven hard-forking változás. Gyakran előfordul, amikor a nem frissített csomópontok nem tudnak blokkokat validálni, melyet a frissített csomópontok hoztak létre, akik az új [konszenzus szabályokat](#consensus-rules) követik. Nem összetévesztendő a forkkal, soft forkkal, software forkkal, vagy a Git forkkal.

### hash {#hash}

Egy változó méretű bemenet fix hosszúságú lenyomata, melyet egy hash függvény állít elő. (Lásd [keccak-256](#keccak-256))

### HD tárca {#hd-wallet}

Egy [tárca](#wallet), mely a hierarchikus determinisztikus (HD) kulcs létrehozást és átutalási protokollt használja.

[Olvass róla többet a github.com oldalon](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD tárca seed {#hd-wallet-seed}

Egy érték, melyet a master [privát kulcs](#private-key) és a master lánc kód generálásához használnak a HD [tárcáknál](#wallet). A tárca seed reprezentálható mnemonikus szavakkal, így az embereknek könnyebb lemásolni és tárolni a privát kulcsokat.

### homestead {#homestead}

Az Ethereum második fejlesztési fázisa, mely 2016 márciusában indult el az 1,150,000 számú blokknál.

<Divider />

## I {#section-i}

### Inter-exchange Client Address Protocol (ICAP) {#icap}

Egy Ethereum cím kódolás, mely részben kompatibilis az International Bank Account Number (IBAN) kódolással, és sokoldalú, checksum ellenőrzött és interoperábilis kódolást kínál az Ethereum címek számára. Az ICAP címek az új IBAN pszeudo-ország kódot használják- XE, mely az "eXtended Ethereum" névből következik, ahogy a nem-hivatalos valuták használják (pl.: XBT, XRP, XCP).

### Ice Age {#ice-age}

Egy Ethereum [hard fork](#hard-fork) a 200,000 blokknál, mely bevezeti az exponenciális [nehézségi](#difficulty) növelést (más néven[nehézségi bomba](#difficulty-bomb)), hogy a [proof-of-stake-re](#pos) való átállást motiválja.

### integrált fejlesztői környezet (IDE) {#ide}

Egy felhasználói felület, mely általában egy kód szerkesztőt, egy fordítót, egy runtime-ot és egy debuggert egyesít.

<DocLink to="/developers/docs/ides/">
  Integrált Fejlesztői Környezetek
</DocLink>

### immutable deployed code problem (nem megváltoztatható kód problémája) {#immutable-deployed-code-problem}

Amint egy [szerződés](#smart-contract) (vagy [könyvtár](#library)) kód telepítésre került, megváltoztathatatlanná válik. A standard szoftverfejlesztési gyakorlat a lehetséges bugok javítására és új funkciók hozzáadására támaszkodik, így ez egy kihívást jelent az okosszerződés fejlesztésnél.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Okosszerződések telepítése
</DocLink>

### internal transaction (belső tranzakció) {#internal-transaction}

Egy [tranzakció](#transaction) egy [szerződéses számláról](#contract-account) egy másik szerződéses számlára vagy egy [EOA-ra](#eoa) (lásd [üzenet](#message)).

<Divider />

## K {#section-k}

### kulcsszármaztatási függvény (KDF) {#kdf}

Más néven "jelszó nyújtó algoritmus", melyet a [keystore](#keystore-file) formátumok használnak, hogy védekezzenek a brute-force, dictionary és a szivárvány tábla támadásokkal szemben a jelszó titkosításoknál a jelszó ismételt hashelésével.

<DocLink to="/developers/docs/smart-contracts/security/">
  Biztonság
</DocLink>

### keccak-256 {#keccak-256}

Az Ethereumban használt kriptográfiai [hash](#hash) függvény. A Keccak-256 [SHA](#sha)-3-ként lett szabványosítva.

### keystore fájl {#keystore-file}

Egy JSON kódolású fájl, mely egy (véletlenszerűen generált) [privát kulcsot](#private-key) tartalmaz, melyet egy jelszó titkosít magasabb fokú biztonságért.

<Divider />

## L {#section-l}

### layer 2 (2. réteg) {#layer-2}

Egy fejlesztési terület, mely az Ethereum protokollra épített fejlesztési rétegekre fókuszál. Ezek a fejlesztések a [tranzakciókhoz](#transaction) sebességhez, olcsóbb[tranzakciós díjakhoz](#transaction-fee) és a privát tranzakciókhoz kapcsolódnak.

<DocLink to="/developers/docs/layer-2-scaling/">
  2. réteg
</DocLink>

### LevelDB {#level-db}

Egy nyílt forráskódú on-disk, kulcspár tároló, mely egy könnyű, egyedi célú [könyvtárként](#library) van implementálva több kapcsolódással más platformokhoz.

### library (könyvtár) {#library}

Egy speciális [szerződés](#smart-contract) típus, melynek nincsenek payable függvényei, fallback függvényei vagy adattárolója. Így nem tud ethert tartani vagy kapni, illetve adatot tárolni. Egy könyvtár korábban telepített kódként szolgál, melyet más szerződések meghívhatnak read-only számítás céljából.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Okosszerződés könyvtárak
</DocLink>

### lightweight client (könnyű kliens) {#lightweight-client}

Egy Ethereum kliens, mely nem tárolja a [blokklánc](#blockchain) lokális másolatát, nem validál blokkokat és [tranzakciókat](#transaction). Egy [tárca](#wallet) funkcionalitását szolgáltatja és tranzakciókat tud létrehozni és közvetíteni.

<Divider />

## M {#section-m}

### Mainnet (főhálózat) {#mainnet}

A "main network" rövidítése, ez a fő nyilvános Ethereum [blokklánc](#blockchain). Valódi ETH, valódi érték, és valódi következmények. 1. rétegként is hivatkozunk rá, amikor a [2. rétegű](#layer-2) skálázhatósági megoldásokról beszélünk. (Ezenkívül lásd [tesztnet](#testnet))

### Merkle Patricia fa {#merkle-patricia-tree}

Egy adat struktúra az Ethereumban, mellyel hatékonyan lehet kulcs-érték párokat tárolni.

### message (üzenet) {#message}

Egy [belső tranzakció](#internal-transaction), mely sosincs sorba rendezve és csak az [EVM](#evm) belül kerül elküldésre.

### message call (üzenet hívás) {#message-call}

Egy [üzenet](#message) átadása egyik számláról egy másikba. Ha a cél számla összeköttetésben van [EVM](#evm) kóddal, akkor a VM elindul az adott objektum állapotával és az üzenettel, mellyel meghívták.

### Metropolis {#metropolis}

Az Ethereum harmadik fejlesztési fázisa, mely 2017 októberében indult el.

### miner (bányász) {#miner}

Egy hálózati [csomópont](#node), mely érvényes [munkabizonyítékokat](#pow) keres az új blokkoknak ismételt hasheléssel (lásd [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Bányászat
</DocLink>

<Divider />

## N {#section-n}

### network (hálózat) {#network}

Az Ethereum hálózatra utal, mely egy peer-to-peer hálózat, mely tranzakciókat és blokkokat terjeszt az összes Ethereum csomópont (hálózati résztvevő) számára.

<DocLink to="/developers/docs/networks/">
  Hálózatok
</DocLink>

### nem felcserélhető token (NFT) {#nft}

Más néven "deed", ez egy token szabvány, melyet az ERC-721 javaslat vezetett be. Az NFT-ket nyomon lehet követni és kereskedni velük, de minden egyes token egyedi és különböző; nem felcserélhetőek, mint az ERC-20 tokenek. Az NFT-k tulajdonjogot reprezentálhatnak digitális vagy fizikai eszközöknél.

<DocLink to="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Nem Felcserélhető Token Szabvány
</DocLink>

### node (csomópont) {#node}

Egy szoftver kliens, mely részt vesz a hálózatban.

<DocLink to="/developers/docs/nodes-and-clients/">
  Csomópontok és kliensek
</DocLink>

<DocLink to="/developers/docs/nodes-and-clients/">
  Csomópontok és kliensek
</DocLink>

### nonce {#nonce}

A kriptográfiában egy olyan érték, melyet csak egyszer lehet felhasználni. Az Ethereum kétféle nonce-ot használ -a számla-nonce a tranzakciók számlán történő nyilvántartásához szükséges, és a tranzakciók megismétlésével történő támadások megelőzésére használja a hálózat; a [munkabizonyíték](#pow)-nonce pedig az a blokkban használt véletlenszerű érték, amely [munkabizonyítékként](#pow) szolgál.

<Divider />

## O {#section-o}

### ommer (vagy uncle - nagybácsi) blokk {#ommer}

Amikor egy [bányász](#miner) talál egy érvényes [blokkot](#block), lehetséges, hogy egy másik bányász már nyilvánosságra hozott egy másik blokkot, ami előbb kerül be a blokkláncba. Ez az érvényes, ugyanakkor elavult blokk _ommerként_ bekerülhet a blokkláncba az újabb blokkok által, és részleges blokk-jutalomban részesülhet. Az "ommer" kifejezés a szülő-blokk testvér-blokkjának gender-semleges formája, de néha "uncle", azaz "nagybácsi" blokként is hivatkoznak rá.

### Optimistic rollup (Optimistic típusú összevont tranzakciók) {#optimistic-rollup}

Olyan [összevont tranzakció](#rollups), amely [csalási bizonyítást](#fraud-proof) használ annak érdekében, hogy növelje a [2. rétegen](#layer-2) végrehajtható tranzakciók számát, ugyanakkor a [főhálózat](#mainnet) (1. réteg) biztonsági protokollját használja. Ellentétben egy hasonló 2. réteges megoldással, a [Plasmával](#plasma), az Optimistic típusú összevont tranzakciók komplexebb tranzakciókat is képesek kezelni - az [EVM](#evm)-ben bármi lehetséges. Vannak azonban késleltetési problémái a [Zero-knowledge típusú összevont tranzakciókhoz](#zk-rollups) képest, mivel egy tranzakciót meg lehet kérdőjelezni egy csalási bizonyítással.

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups">
  Optimista összegzők
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Az Ethereum kliens szoftver egyik legprominensebb, interoperábilis implementációja.

### Plasma {#plasma}

Egy [2. réteges](#layer-2)skálázási megoldás, mely [csalási bizonyításokat használ](#fraud-proof), mint az [optimista összegzők](#optimistic-rollups). A Plasma csak egyszerű tranzakciókra alkalmas, mint az egyszerű token átutalás vagy cserélés.

<DocLink to="/developers/docs/layer-2-scaling/#Plasma">
  Plasma
</DocLink>

### private key (secret key) / privát kulcs (titkos kulcs) {#private-key}

Egy titkos szám, mely lehetővé teszi az Ethereum felhasználóknak, hogy bizonyítsák a tulajdonjogukat egy számlához vagy szerződéshez egy digitális aláírással (lásd [publikus kulcs](#public-key), [cím](#address), [ECDSA](#ecdsa)).

### proof-of-stake (PoS) / letétbizonyíték {#pos}

Egy metódus, mellyel egy kriptovaluta blokklánc protokoll eléri az elosztott [konszenzust](#consensus). A PoS utasítja a felhasználókat, hogy bizonyítsák a tulajdonjogukat egy bizonyos összegű kriptovaluta felett (a "letétük" a hálózatban) azért, hogy részt vehessenek a tranzakciók validálásában.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Proof-of-stake
</DocLink>

### proof-of-work (PoW) / munkabizonyíték {#pow}

Egy adatsor (a bizonyíték), melynek megtalálása jelentős mennyiségű számítást igényel. Az Ethereumban a [bányászoknak](#miner) meg kell találniuk a numerikus megoldását az [Ethash](#ethash) algoritmusnak, mely eléri a hálózati szintű [nehézségi](#difficulty) célt.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Proof-of-work
</DocLink>

### public key (publikus kulcs) {#public-key}

Egy a [privát kulcsból](#private-key) egy egyirányú függvénnyel származtatott szám, amelyet nyilvánosan meg lehet osztani, és bárki felhasználhatja az ehhez tartozó privát kulccsal készült digitális aláírások hitelesítéséhez.

<Divider />

## R {#section-r}

### receipt (visszaigazolás) {#receipt}

Egy Ethereum kliens által visszadott adat, mely egy adott [tranzakció](#transaction) eredményét reprezentálja, beleértve a tranzakció [hash-t](#hash), a [blokk](#block) számát, a felhasznált [gáz](#gas) mennyiséget, és, egy [okosszerződés](#smart-contract) telepítés esetében, a szerződés [címét](#address).

### re-entrancy attack (újbóli belépés támadás) {#re-entrancy-attack}

Egy támadás, mely során egy támadó szerződés meghívja az áldozat szerződés egyik függvényét úgy, hogy újra meghívja a függvényt lefutás közben rekurzívan. Ez például a pénz ellopását eredményezheti úgy, hogy kihagy egy pár lépést az áldozat szerződéséből, mely frissítené az egyenlegeket vagy számolná a kiutalási mennyiségeket.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Újbóli belépés (re-entrancy)
</DocLink>

### reward (jutalom) {#reward}

Egy minden egyes blokkban jelenlévő ether mennyiség, mely a jutalom a [bányásznak](#miner), aki megtalálta a [proof-of-work](#pow) megoldást.

### Recursive Length Prefix (RLP) {#rlp}

Egy Ethereum fejlesztők által megtervezett kódolási szabvány tetszőlegesen komplex és tetszőlegesen hosszú objektumok (adat struktúrák) kódolására és sorosítására.

### rollups (összevont tranzakciók) {#rollups}

A [2. réteg](#layer-2) skálázódásának egyik módszere, amely több tranzakciót gyűjt össze, és egyszerre, egyetlen tranzakcióban küldi el őket az [Ethereum főhálózatára](#mainnet). Ez lehetővé teszi a [gáz](#gas) költségének csökkentését, és növeli a feldolgozható [tranzakciók](#transaction) számát. Vannak Optimistic és Zero-knowledge típusú összevont tranzakciók, melyek különböző biztonsági módszert használnak, hogy elérjék a skálázási eredményt.

<DocLink to="/developers/docs/layer-2-scaling/#rollups">
  Összegzők
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Az Ethereum negyedik és végső fejlesztési fázisa.

<DocLink to="/upgrades/">
  Ethereum 2.0 (Eth2)
</DocLink>

### Secure Hash Algorithm (SHA) {#sha}

Kriptográfiai hash függvények egy családja, melyet a National Institute of Standards and Technology (NIST) adott ki.

### shard / shard lánc {#shard}

Egy [proof-of-stake](#proof-of-stake) lánc, melyet a [Beacon Chain](#beacon-chain) koordinált és a [validátorok](#validator) tartják biztonságban. 64 lesz hozzáadva a hálózathoz az Eth2 shard lánc fejlesztés részeként. A shard láncok megnövelt tranzakció átvitelt tesznek majd lehetővé az Ethereumon extra adat szolgáltatással az olyan [2. réteg](#layer-2) megoldások részére, mint az [optimista összegzők](#optimistic-rollups) és az [ZK összegzők](#zk-rollups).

<DocLink to="/upgrades/shard-chains">
  Shard láncok
</DocLink>

### Sidechain (melléklánc) {#sidechain}

Egy skálázási megoldás, mely egy különálló láncot használ másfajta, gyakran gyorsabb, [konszenzus szabályokkal](#consensus-rules). Egy áthidalás szükséges, hogy ezek a mellékláncok a [főhálózathoz](#mainnet) csatlakozzanak. Az [összegzők](#rollups) szintén mellékláncokat használnak, de ehelyett a [főhálózattal](#mainnet) együttműködve teszik ezt.

<DocLink to="/developers/docs/layer-2-scaling/#sidechains">
  Mellékláncok
</DocLink>

### singleton {#singleton}

Egy számítógép programozási fogalom, mely egy olyan objektumot jelent, aminek csak egy példánya létezhet.

### slot {#slot}

Időperiódus (12 másodperc), amely alatt egy új [Beacon Chain](#beacon-chain) és [shard](#shard) lánc blokkot terjeszthet elő egy [validátor](#validator) a [letétbizonyíték](#proof-of-stake) alapú rendszerben. A slot lehet üres is. 32 slot tesz ki egy [epochát](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### smart contract (okosszerződés) {#smart-contract}

Egy program, amelyet az Ethereum számítási infrastruktúráján lehet futtatni.

<DocLink to="/developers/docs/smart-contracts/">
  Bevezetés az okosszerződésekbe
</DocLink>

### Solidity {#solidity}

Egy eljárásközpontú (imperatív) programozási nyelv, amelynek szintaxisa hasonló mint a JavaScript, a C++ és a Java. Az Ethereum [okosszerződések](#smart-contract) legnépszerűbb, leggyakrabban használt programozási nyelve. Dr. Gavin Wood alkotta meg.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity inline assembly {#solidity-inline-assembly}

A [Solidity](#solidity) programokban használható [EVM](#evm) assembly nyelv. Az inline assembly támogatottsága a Solidity-ben megkönnyíti bizonyos műveletek írását.

### Spurious Dragon {#spurious-dragon}

Az Ethereum blokklánc [hard-forkja](#hard-fork), ami a 2.675.000 számú blokknál ment végbe, a szolgáltatásmegtagadási támadások kiküszöbölésének érdekében. (Lásd: [Tangerine Whistle](#tangerine-whistle)). Ezen kívül egy újrajátszási támadások elleni mechanizmust is magában foglalt (lásd: [nonce](#nonce)).

### stablecoin (stabil értékű token) {#stablecoin}

Olyan [ERC-20 token](#token-standard), amelynek értéke egy másik vagyontárgyéhoz van kötve. Léteznek hagyományos devizához, például dollárhoz, nemesfémekhez, például aranyhoz, és más kriptovalutákhoz, például Bitcoinhoz kötött értékű stablecoinok.

<DocLink to="/eth/#tokens">
  Az ETH nem az egyedüli kripto az Ethereumon
</DocLink>

### staking (letétbe helyezés) {#staking}

Adott mennyiségű [ether](#ether) letétbe helyezése a validátorrá válás és a [hálózat](#network) biztosításának érdekében. A validátor ellenőrzi a [tranzakciókat](#transaction), és új [blokkokat](#block) terjeszt elő a [letétbizonyíték](#pos) konszenzus-modellje alapján. A letétbe helyezés pénzügyi motivációt ad arra, hogy a hálózat érdekét szem előtt tartva járj el. A [validátori](#validator) feladatok elvégzéséért jutalomban részesülsz, de váltzó mennyiségű ETH-t veszíthetsz el, ha nem így teszel.

<DocLink to="/staking/">
  Helyezd letétbe az ETH-ed, hogy Ethereum validátorrá válhass
</DocLink>

### state channels (állapot csatornák) {#state-channels}

Egy [2. rétegű](#layer-2) megoldás, ahol egy csatorna van létrehozva a résztvevők között és ahol szabadon és kis költséggel indíthatnak tranzakciókat. Csak egy, a csatornát megnyitó és a csatornát lezáró, [tranzakció](#transaction) kerül fel a [főhálózatra](#mainnet). Ez nagyon magas tranzakció átvitelt tesz lehetővé, de a résztvevők számának előzetes ismeretére, valamint a tőke lekötésére támaszkodik.

<DocLink to="/developers/docs/layer-2-scaling/#state-channels">
  Állapot csatornák
</DocLink>

### szabo {#szabo}

Az [ether](#ether) egyik címlete. 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Az Ethereum blokklánc egyik[hard-forkja](#hard-fork), mely az 2,463,000 számú blokknál történt és megváltoztatta a [gáz](#gas) számítást bizonyos I/O intenzív műveleteknél, valamint ezután törlődik a szolgáltatás megtagadás támadás után felhalmozott állapot, mely kihasználta az alacsony gáz díjakat ezeknél a műveleteknél.

### testnet (tesztnet) {#testnet}

A "test network", (vagyis "teszthálózat") rövidítése. A fő Ethereum hálózat (lásd: [főhálózat](#mainnet)) viselkedésének szimulálására használt hálózat.

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Tesztnetek
</DocLink>

### token standard (token szabvány) {#token-standard}

Az ERC-20 előterjesztéssel került be a rendszerbe ez a standardizált [okosszerződési](#smart-contract) struktúra a felcserélhető tokenek kezelésére. Az egyazon szerződésből származó tokenek követhetők, eladhatók, és az [NFT](#nft)-kkel ellentétben felcserélhetők.

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20 Token Szabvány
</DocLink>

### tranzakció {#transaction}

Az Ethereum Blokkláncra küldött, egy feladó [számla](#account) által aláírt, egy bizonyos [címet](#address) célzó adat. A tranzakció metaadatokat tartalmaz, mint például az adott tranzakció [gáz limitje](#gas-limit).

<DocLink to="/developers/docs/transactions/">
  Tranzakciók
</DocLink>

### transaction fee (tranzakciós díj) {#transaction-fee}

Egy díj, amit minden alkalommal ki kell fizetned, amikor az Ethereum hálózatot használod. Díjat kell fizetned például akkor, ha pénzt küldesz a [tárcádból](#wallet), vagy interakcióba lépsz egy [dapp](#dapp)al, például tokeneket váltasz, vagy gyűjthető tárgyat vásárolsz. Úgy is gondolhatsz erre, mint egy szolgáltatás ára. A díj mértéke attól függően változik, hogy mennyire van leterhelve a hálózat. Ez azért van, mert a [bányászok](#miner), akik a tranzakciók feldolgozásáért felelnek, valószínűleg előrébb veszik a magasabb díjjal járó tranzakciókat - így a leterheltség felfelé mozdítja az árakat.

Technikai szempontból a tranzakciós díj attól függ, mennyi [gázra](#gas) van szükség a tranzakciód végrehajtásához.

A tranzakciós díjak csökkentésének témáját nagy érdeklődés övezi mostanában. Lásd: [2. réteg](#layer-2)

### Turing complete (Turing-teljes) {#turing-complete}

Az angol matematikus és számítástechnikus Alan Turing után elnevezett fogalom - az adatmanipulációs szabályok rendszere (például egy számítógép utasításai, egy programozási nyelv, vagy egy sejtautomata) "Turing-teljesnek" vagy számítási szempontból univerzálisnak mondható, ha bármely Turing-gép szimulálására használható.

<Divider />

## V {#section-v}

### validátor {#validator}

Egy [csomópont](#node) a [letétbizonyíték](#proof-of-stake) alapú rendszerben, amely az adattárolásért, a tranzakciók felolgozásáért, és az új blokkok blokklánchoz való hozzáadásáért felel. A validátor-szoftver aktiválásához 32 ETH-t kell [letétbe helyezned](#staking).

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Proof-of-stake
</DocLink> <DocLink to="/staking/">
  Letétbe helyezés az Ethereumon
</DocLink>

### Validity proof (érvényességi bizonyíték) {#validity-proof}

Egyes [2. réteges](#layer-2) megoldások biztonsági modellje, amely a feldolgozási sebesség növelésének érdekében a tranzakciókat [összevonják](/#rollups), és egyetlen tranzakció keretében küldik el az Ethereum hálózatra. A tranzakciós számítások a láncon kívül történnek, majd az érvényességük bizonyítékával együtt kerülnek fel a láncra. Ez a módszer növeli a végrehajtható tranzakciók számát, mialatt a biztonságot is fenntartja. Egyes [összesített tranzakciók](#rollups) [csalási bizonyítást](#fraud-proof) használnak.

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups">
  Zero-knowledge összegzők
</DocLink>

### Validium {#validium}

[2. réteges](#layer-2) megoldás, amely [érvényességi bizonyítást](#validity-proof) használ a feldolgozható tranzakciók számának növelésére. A [Zero-knowledge összegzőkkel](#zk-rollup) ellentétben a Validium adat nem az 1. rétegű [főhálózaton](#mainnet) tárolódik.

<DocLink to="/developers/docs/layer-2-scaling/#validium">
  Validium
</DocLink>

### Vyper {#vyper}

Egy magas szintű programozási nyelv Python-szerű szintaxissal. Az a célja, hogy megközelítse a tiszta funkcionális nyelvet. Vitalik Buterin készítette.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### wallet (tárca) {#wallets}

Szoftver, amely a [privát kulcsokat](#private-key) tartalmazza. Az Ethereum [számlák](#account) elérésére és kezelésére, valamint az [okosszerződésekkel](#smart-contract) való interakcióra használható. A kulcsokat nem kell a tárcában tárolni, a nagyobb biztonság érdekében lehetséges offline tárhelyen (például memóriakártyán vagy papíron) őrizni azokat. Neve ellenére a tárca soha nem tartalmazza a tényleges érméket vagy tokeneket.

<DocLink to="/wallets/">
  Ethereum tárcák
</DocLink>

### Web3 {#web3}

A világháló harmadik verziója. A Web3, amit először Dr. Gavin Wood írt le, új célt tűz ki a webes applikációknak - központilag birtokolt és menedzselt applikációk helyett decentralizált protokollokra épülő applikációk (lásd: [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### wei {#wei}

Az [ether](#ether) legkisebb címlete. 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### zero address (zéró számla) {#zero-address}

Egy speciális, kizárólag nullákat tartalmazó Ethereum cím, amely a [szerződés létrehozó tranzakciók](#contract-creation-transaction) címzettjeként működik.

### Zero-knowledge rollup (Nulla tudás alapú összevont tranzakció) {#zk-rollup}

[Érvényességi bizonyítást](#validity-proof) használó tranzakciók [összevonása](#rollups), a [2. réteg](#layer-2) tranzakciófelolgozási kapacitásának, és a [főhálózat](#mainnet) (1. réteg) által nyújtott biztonság elérésének érdekében. Bár ezek nem képesek olyan komplex tranzakciókat kezelni, mint az [Optimistic típusú összevont tranzakciók](#optimistic-rollups), nincsenek késleltetési problémáik, mert a tranzakciók feltételezhetően érvényesek a hálózatra küldés pillanatában.

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups">
  Zero-knowledge összegzők
</DocLink>

<Divider />

## Források {#sources}

_Részben a [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)alapján [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) által a CC-BY-SA alapján_

<Divider />

## Járulj hozzá az oldalhoz {#contribute-to-this-page}

Kihagytunk valamit? Valami nem helyes? Segíts nekünk jobbá tenni úgy, hogy közreműködsz ehhez a szójegyzékhez a GitHub-on!

[Tudj meg többet a hozzájárulásról](/contributing/adding-glossary-terms)
