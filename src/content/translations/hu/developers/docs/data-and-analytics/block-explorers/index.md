---
title: Blokk felfedezők
description: Egy bevezetés a blokkfelfedezőkbe, a blokklánc adatok portáljába, ahol információs lekérdezéseket indíthatsz tranzakciókról, számlákról, szerződésekről és más egyébről.
lang: hu
sidebarDepth: 3
---

A blokkfelfedezők a portálod az Ethereum adataihoz. Használatukkal valós idejű adatokat kaphatsz blokkokról, tranzakciókról, bányászokról, számlákról és más on-chain tevékenységről.

## Előfeltételek {#prerequisites}

Először meg kellene értened az Ethereum alapvető fogalmait ahhoz, hogy értelmezni tudd az adatokat, melyet egy blokkfelfedező biztosít neked. Kezdj itt: [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/).

## Szolgáltatások {#services}

- [Etherscan](https://etherscan.io/) –_Elérhető kínaiul, koreaiul, oroszul és japánul_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/)
- [Blockchair](https://blockchair.com/ethereum) –_Elérhető spanyolul, franciául, olaszul, hollandul, portugálul, oroszul, kínaiul és újperzsa nyelven_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Adat {#data}

Az Ethereum tervezése folytán transzparens, így minden ellenőrizhető. A blokkfelfedezők egy felületet biztosítanak, hogy ez az információ elérhető legyen. És ez igaz az Ethereum főhálózatára és a teszt hálózatokra, ha szükséged van az adatokra.

Itt egy összefoglaló azokról az adatokról, melyet egy blokkfelfedezőről megszerezhetsz.

### Blokkok {#blocks}

Új blokkok adódnak hozzá az Ethereumhoz minden ~12 másodpercben (ez változhat) így van egy közel állandó adatfolyam, mely hozzáadódik a blokkfelfedezőkhöz. A blokkok sok fontos adatot tartalmaznak, melyeket hasznosnak találhatsz:

**Standard adat**

- Blokk magasság - A blokk szám és a blokklánc hossza (blokkokban) a jelenlegi blokk létrehozásánál.
- Időbélyeg – Az időpont, amikor egy bányász kibányászta a blokkot.
- Tranzakciók – a blokkban lévő tranzakciók száma.
- Bányász – A bányász címe, aki kibányászta a blokkot.
- Jutalom – Az ETH mennyiség, melyet a bányász kap jutalmul, hogy hozzáadta a blokkot (alap 2ETH díj + minden tranzakció díja, mely a blokkban szerepelt).
- Nehézség – A blokk kibányászásához rendelt nehézség.
- Méret – A blokkban lévő adat mérete (bájtban mérve).
- Felhasznált gáz – A teljes gáz egység, melyet a tranzakciók felhasználtak a blokkban.
- Gáz limit – A teljes gáz limit, melyet a tranzakciók beállítottak a blokkban.
- Extra adat – Bármely extra adat, melyet a bányász belefoglalt a blokkba.

**Haladó adat**

- Hash – A kriptográfiai hash, mely a blokk fejlécét reprezentálja (a blokk egyedi azonosítója).
- Szülő hash – Annak a blokknak a hash-e, mely a jelenlegi blokk előtt jött.
- Sha3Uncles – Az adott szülőhöz tartozó összes uncle kombinált hash-e.
- StateRoot – A Merkle fa gyökér hash-e, mely a rendszer teljes állapotát tárolja.
- Nonce – Egy érték, mely demonstrálja a proof-of-work-öt egy blokkra a bányász által.

**Uncle blokkok**

Az uncle blokkok akkor jönnek létre, amikor két bányász közel azonos időben hoz létre két blokkot - csak egy blokkot lehet érvényesíteni a csomópontokon keresztül. Nem tartoznak a lánchoz, de így is jutalom jár értük a munkáért.

A blokkfelfedezők információkat szolgáltatnak az uncle blokkokról úgy, mint:

- Az uncle blokk száma.
- Az előfordulás időpontja.
- A blokk magasság, ahol létrejött.
- Ki bányászta ki.
- Az ETH jutalom.

### Üzemanyag {#gas}

A blokkfelfedezők nem csak a tranzakciók és blokkok gáz felhasználásáról adnak információt, hanem némelyik a hálózat aktuális gázárairól is tájékoztat. Ez segít megérteni a hálózati kihasználtságot, biztonságos tranzakciókat indítani, és nem túlköltekezni az gázból. Keress olyan API-okat, melyek segítenek megadni ezt az információt a terméket felületére. A gáz-specifikus adat a következőket fedi le:

- A biztonságos, de lassú tranzakcióhoz szükséges gázegység becslése (+ becsült ár és idő).
- Az átlagos idejű tranzakcióhoz szükséges gázegység becslése (+ becsült ár és idő).
- Az gyors tranzakcióhoz szükséges gázegység becslése (+ becsült ár és idő).
- Az átlagos megerősítési idő a gáz ár alapján.
- Gázt fogyasztó szerződések – máshogy megfogalmazva, olyan népszerű termékek, melyeknek használata számottevő a hálózaton.
- Gázt költő számlák – vagyis, gyakori hálózati felhasználók.

### Tranzakciók {#transactions}

A blokkfelfedezők lettek a leggyakoribb hely az emberek számára, hogy nyomon kövessék a tranzakcióik folyamatát. Ennek az az oka, hogy a részletesség, amiben részesülhetsz, extra bizonyossággal bír. A tranzakció adat a következőket tartalmazza:

**Standard adat**

- Tranzakció hash – A tranzakció elküldésekor egy hash generálódik.
- Státusz – Egy jelzés arról, hogy a tranzakció függőben van-e, meghiúsult vagy sikeres volt-e.
- Blokk – A blokk, mely a tranzakciót tartalmazza.
- Időbélyeg – Az időpont, amikor egy bányász kibányászta a tranzakciót.
- Kitől (from) – A számla címe, amelyik elküldte a tranzakciót.
- Kinek (To)– A címzett vagy az okosszerződés címe, amivel a tranzakció interakcióba lép.
- Átutalt tokenek – Egy tokenekből álló lista, melyek át lettek utalva a tranzakcióban.
- Érték – Az átutalt ETH összértéke.
- Tranzakciós díj – A bányásznak fizetett összeg, hogy feldolgozza a tranzakciót (a gáz ár\* felhasznált gázból számolva).

**Haladó adat**

- Gáz limit – A maximális gáz egység, melyet ez a tranzakció elfogyaszthat.
- Felhasznált gáz – A tényleges mennyiség, melyet ez a tranzakció elfogyasztott.
- Gáz ár – Egy gáz egységre beállított ár.
- Nonce – A `from` cím tranzakciós száma (ne feledd, hogy nullával kezdődik, így `100`-as nonce valójában a 101.-edik tranzakciót jelenteni, melyet a erről a számláról küldtek.)
- Input adat– Bármely extra információ a tranzakcióban.

### Számlák {#accounts}

Rengeteg adatot tudsz egy számláról elérni. Ezért ajánlott, hogy több számlát használj, így a vagyonod és az értéke nehezebben lekövethető. Vannak azonban fejlesztés alatt álló megoldások, melyek a tranzakciókat és a számlákat privátabbá teszik. De itt van az adat, melyet elérhetsz a számlákról:

**Felhasználói számlák**

- Számla cím – A nyilvános cím, melyre pénzt küldhetsz.
- ETH egyenleg – A számlához tartozó ETH mennyisége.
- Teljes ETH érték – Az ETH értéke.
- Tokenek – A számlához tartozó tokenek és az értékeik.
- Tranzakció történet – Az összes tranzakciót tartalmazó lista, ahol a számla vagy a küldő volt vagy a címzett.

**Okosszerződések**

Az okosszerződés számlák rendelkeznek az összes adattal, amivel a felhasználói számlák is, de némelyik blokkfelfedező valamennyi kód információt is szolgáltat. Úgy, mint:

- Szerződés létrehozó – A cím, amelyik feltöltötte a szerződést a főhálózatra.
- Létrehozó tranzakció – A tranzakció, mely tartalmazta a telepítést a főhálózatra.
- Forráskód – Az okosszerződés solidity vagy vyper kódja.
- Szerződés ABI – A szerződés Application Binary Interface – a szerződés általi hívásokat tartalmazza és a kapott adatokat.
- Szerződés létrehozás kód – Az okosszerződés lefordított bájtkódja – akkor jön létre, amikor Solidity-ben vagy Vyper-ben írt okosszerződést fordítasz.
- Szerződés események – Az okosszerződés által meghívott metódusok története. Lényegében egy mód arra, hogy lássuk hogyan használják a szerződést és milyen gyakran.

### Tokenek {#tokens}

A token egy szerződés típus, így az okosszerződésekhez hasonló adatokkal rendelkezik. De mivel van értéke és lehet vele kereskedni, ezért további adatpontjai is vannak:

- Típus – Lehet ERC-20, ERC-721 vagy más tokenszabvány.
- Árfolyam – Ha egy ERC-20, akkor van jelenlegi piaci értéke.
- Piaci kapitalizáció – Ha ERC-20, akkor van egy piaci kapitalizációja (az árfolyam \* teljes készletből számolva).
- Teljes készlet– A forgalomban lévő tokenek száma.
- Tartók – A tokent tartó címek száma.
- Átutalások – A számlák közötti átutalások száma.
- Tranzakciós történet – Az összes tokent tartalmazó tranzakció előzménye.
- Szerződés cím – A token címe, melyet feltelepítettek a főhálózatra.
- Tizedesjegyek – Az ERC-20 tokenek oszthatóak és vannak tizedes helyeik.

### Hálózat {#network}

Természetesen olyan adat is rendelkezésünkre áll, mely a hálózat egészségéről árulkodik. Ezek elég specifikusak az Ethereum proof-of-work konszenzus mechanizmusára nézve. Amikor az Ethereum áttér az Eth2-re néhány adat redundánssá válik majd

- Nehézség – A jelenlegi bányászati nehézség.
- Hash ráta – Egy becslés arról, hogy mennyi hash-t generálnak az Ethereum bányászok, akik a jelenlegi Ethereum blokkot vagy bármely adott blokkot próbálják megoldani.
- Összes tranzakció – Az Ethereum létrehozása óta történt összes tranzakciók száma.
- Tranzakció per másodperc – Egy másodperc alatt feldolgozható tranzakciók száma.
- ETH árfolyam – 1 ETH jelenlegi értéke.
- Teljes ETH készlet – Forgalomban lévő ETH mennyiség – ne feledd, hogy új ETH jön létre minden egyes blokk létrejötte után blokkjutalom formájában.
- Piaci kapitalizáció – Az árfolyam \* készletből számolva.

## Eth2 adat {#consensus-layer-data}

Az Eth2 frissítések még fejlesztés alatt állnak, de érdemes megemlíteni az adatokat, melyet a felfedezők biztosítanak majd számodra. Valójában az összes adat elérhető a tesztneteken jelenleg.

Ha nem ismered az Eth2-t, akkor tekintsd meg az [összefoglalónkat az Eth2 fejlesztésekről](/upgrades/).

### Korszak {#epoch}

Az első Eth2 fejlesztés, a beacon chain, fogja létrehozni a validátorokból álló bizottságokat, melyek biztonsági okokból véletlenszerűen állnak össze minden korszak (epoch) végén (minden 6.4 percben). A korszak adat a következőket tartalmazza:

- Korszak szám.
- Véglegesített státusz – Véglegesült-e egy korszak (Igen/Nem).
- Idő – Az idő, amikor véget ért egy korszak.
- Tanúsítások – A korszakon belüli tanúsítások száma (blokkokra történő szavazás a slotokon belül).
- Letétek – A korszakban lévő ETH letétek száma (a validátoroknak ETH-et kell letenniük, hogy validátorok legyenek).
- Megvágás – A blokk javaslattevők és tanúsítók számára kirótt büntetések száma.
- Szavazati részvétel – A letétbe helyezett ETH mennyisége, melyet blokk tanúsításra használtak.
- Validátorok – A korszakban lévő aktív validátorok száma.
- Átlagos validátor egyenleg – Aktív validátorok átlagos egyenlege.
- Slotok – A korszakban lévő szlotok száma (egy slot egy érvényes blokkot tartalmaz).

### Slot {#slot}

A slotok blokk létrehozási lehetőségek, az egyes slotokra elérhető adat a következőket tartalmazza:

- Korszak – A korszak, amiben érvényes a slot.
- Slot szám.
- Státusz – A slot státusza (Javasolt/Kihagyott).
- Idő – A slot időbélyege.
- Javaslattevő– A validátor, aki javasolta a blokkot a slotba.
- Blokk gyökér – A BeaconBlock hash-fa-gyökere.
- Szülő gyökér – Az előző blokk hash-e.
- Állapot gyökér – A BeaconState hash-fa-gyökere.
- Aláírás.
- Randao megjelenítés.
- Graffiti – A blokk javaslattevő bele tehet egy 32 bájt hosszú üzenetet a blokk javaslatába.
- ETH1 adat.
  - Blokk hash.
  - Letét méret.
  - Letét gyökér.
- Tanúsítások – A tanúsítások száma ebben a slotban erre a blokkra.
- Letétek – A letétek száma a slot alatt.
- Önkéntes kilépők – A kilépő validátorok száma slot alatt.
- Megvágás – A blokk javaslattevők és tanúsítók számára kirótt büntetések száma.
- Szavazatok – A validátorok, akik a blokkra szavaztak ebben a slotban.

### Blokkok {#blocks-1}

Az Eth2-ben a blokkok máshogy működnek, mivel a bányászokat felváltják a validátorok, valamint a beacon chain bevezeti a slotokat és a korszakokat az Ethereumba. Ez több adatot jelent!

- Javaslattevő – A validátor, akit véletlenszerűen választottak ki, hogy javasoljon egy új blokkot.
- Korszak– A korszak, amiben a blokkot javasolták.
- Slot– A slot, amiben a blokkot javasolták.
- Tanúsítások – A slotban lévő tanúsítások száma. A tanúsítások olyanok, mint a szavazatok, melyek azt jelzik, hogy a blokk készen áll, hogy beacon chainhez adódjon.

### Validátorok {#validators}

A validátorok felelősek új blokkok felterjesztéséért és tanúsításáért a slotokon belül.

- Validátor szám– Egyedi szám, mely a validátort reprezentálja.
- Jelenlegi egyenleg – A validátor egyenlege a jutalmakkal együtt.
- Effektív egyenleg – A validátor egyenlege, mely letétbe helyezéshez van felhasználva.
- Bevétel – A jutalmak vagy büntetések, melyet a validátor kapott.
- Státusz – Aktív-e a validátor jelenleg vagy nem.
- Tanúsítási hatékonyság – Az átlagos idő, mely a validátor tanúsításának a lánchoz történő hozzáadásához szükséges.
- Aktiválási jogosultság – Dátum (és korszak), amikor a validátor elérhetővé vált a validálásra.
- Aktív ettől – Dátum (és korszak), amikor a validátor aktívvá vált.
- Javasolt blokkok – A blokk, melyet a validátor javasolt.
- Tanúsítások – A validátor által biztosított tanúsítások.
- Letétek – A küldő címe, tranzakció hash-e, blokk száma, időbélyege, mennyisége és a státusza a validátor által elhelyezett letétnek.

### Tanúsítások {#attestations}

A tanúsítások "igen" szavazatok arra, hogy a blokkot a lánchoz adják. Az adataik kapcsolódnak a tanúsítások bejegyzéseihez és a tanúsító validátorokhoz

- Slot – A slot, ahol a tanúsítás megtörtént.
- Bizottság index – A bizottság indexe az adott slotban.
- Összesítő bitek – Az aggregált tanúsítást reprezentálja minden résztvevő validátorra a tanúsításban.
- Validátorok– A validátorok, akik tanúsításokat szolgáltattak.
- Beacon blokk gyökér – Arra a blokkra mutat, amelyet a validátorok tanúsítanak.
- Forrás – A legutolsó igazolt korszakra mutat.
- Cél – A legutolsó korszak határra mutat.
- Aláírás.

### Hálózat {#network-1}

Az Eth2 felső szintű adat a következőket tartalmazza:

- Jelenlegi korszak.
- Jelenlegi slot.
- Aktív validátorok – Aktív validátorok száma.
- Függőben lévő validátorok – A validátorok száma, akik az aktiválásra várnak.
- Letett ETH – A hálózatba letétbe helyezett ETH mennyisége.
- Átlag egyenleg – A validátorok átlagos ETH egyenlege.

## Blokk felfedezők {#block-explorers}

- [Etherscan](https://etherscan.io/) – egy blokkfelfedező, ahol adatokat kérhetsz le az Ethereum főhálózatról, Ropsten tesztnetről, Kovan tesztnetről, Rinkeby tesztnetről, és a Goerli tesztnetről.
- [Blockscout](https://blockscout.com/) – a következő hálózatokra fókuszál:
  - xDai – a MakerDAO DAI stablecoinja és a POA mellékláncánal okos kombinációja, valamint tokenbridge technológia.
  - POA – Egy melléklánc és autonóm hálózat, melyet egy megbízható validátorokból álló csoport tart biztonságban. A hálózat összes validátora az Egyesült Államokban van bejegyezve és a információik nyilvánosan elérhetőek.
  - POA Sokol Tesztnet.
  - ARTIS – egy Ethereum kompatibilis blokklánc.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – az L14 az első teszt hálózatként működik, hogy a LUKSO közösség egy közös infrastruktúrán építhessen és tesztelhessen.
  - qDai.
- [Etherchain](https://www.etherchain.org/) – egy Ethereum főhálózati blokkfelfedező.
- [Ethplorer](https://ethplorer.io/) – egy blokkfelfedező, mely az Ethereumon és a Kovan tesztneten található tokenekre fókuszál.
- [Blockchair](https://blockchair.com/ethereum) - a legprivátabb Ethereum felfedező. Alkalmas (mempool) adatok szűrésére és válogatására is.

## Eth2 blokk felfedezők {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://eth2stats.io/](https://eth2stats.io/medalla-testnet)

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Bányászat](/developers/docs/consensus-mechanisms/pow/mining/)
- [Tranzakciók](/developers/docs/transactions/)
- [Számlák](/developers/docs/accounts/)
- [Hálózatok](/developers/docs/networks/)
