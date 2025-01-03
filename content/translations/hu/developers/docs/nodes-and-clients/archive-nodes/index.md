---
title: Ethereum archív csomópont
description: Az archív csomópontok áttekintése
lang: hu
sidebarDepth: 2
---

Az archív csomópont az Ethereum-kliens egy fajtája, melynek lényege, hogy az összes státuszt tárolja. Ez egy hasznos eszköz bizonyos célokra, de nehezebb kezelni, mint egy teljes csomópontot.

## Előfeltételek {#prerequisites}

Meg kell érteni az [Ethereum-csomópont](/developers/docs/nodes-and-clients/), [architektúráját](/developers/docs/nodes-and-clients/node-architecture/), a [szinkronizációs stratégiáig](/developers/docs/nodes-and-clients/#sync-modes), [futtatási gyakorlatát](/developers/docs/nodes-and-clients/run-a-node/) és [használatukat](/developers/docs/apis/json-rpc/).

## Mi is az az archív csomópont

Az archív csomópont lényegéhez meg kell érteni, hogy mit jelent a státusz. Az Ethereumot úgy is nevezhetjük, hogy _tranzakcióalapú státuszgép_. Számlákból áll, és amikor az alkalmazások tranzakciókat hajtanak végre, akkor megváltozik ezek státusza. Az a globális adat, mely lefedi az összes számla- és szerződésinformációt, egy státusznak nevezett fastruktúrájú adatbázisban tárolódik. Ezt a végrehajtási réteg (EL) kliense kezeli, és a következő adatokat tárolja el:

- Számlaegyenlegek és nonce-ok
- Szerződéskód és tárhely
- Konszenzussal kapcsolatos adatok, pl. a letétbe helyezési szerződés

A hálózattal való interakció, az új blokkok ellenőrzése és létrehozása végett az Ethereum-klienseknek követniük kell a legutóbbi változásokat (a lánc elejét), így ezért a jelenlegi státuszt is. A teljes csomópontként konfigurált végrehajtási réteg kliense ellenőrzi és követi a hálózat legutóbbi státuszát, de csak néhány státuszt kap el, pl. a legutóbbi 128 blokkét, így képes kezelni a láncátrendezéseket és gyors hozzáférést tud biztosítani a legutóbbi adatokhoz. A legfrissebb státuszra van szüksége minden kliensnek, hogy ellenőrizze a bejövő tranzakciókat és használja a hálózatot.

Úgy is felfoghatjuk a státuszt, mint egy pénzügyi rendszer pillanatfelvétele egy adott blokknál, az archív pedig a történeti visszajátszás.

Az előzménystátuszokat biztonsággal meg lehet vágni, mert azok nem szükségesek a hálózat működéséhez, és a kliens számára haszontalan lenne a nem releváns adatok tárolása. Azokat a státuszokat, melyek egy bizonyos blokknál korábban keletkeztek (pl. 128 blokkal korábban), egyszerűen törlik. A teljes csomópontok csak blokklánc-előzményadatokat (blokkok és tranzakciók) tartanak meg, valamint esetenként korábbi pillanatfelvételeket is, amelyek alapján újragenerálhatják a régebbi státuszokat, ha azokra szükség lenne. Ehhez az EVM-ben újra lefuttatják a régi tranzakciókat, amihez sok számítási kapacitás kellhet, ha a szükséges státusz távol esik a legközelebbi pillanatfelvételtől.

Tehát a historikus státuszok elérése egy teljes csomópont esetén számottevő számítási kapacitást fogyaszt. A kliensnek talán az összes régi tranzakciót le kell futtatnia, és a genezistől kezdve ki kell számolnia az előzménystátuszt. Az archív csomópontok úgy oldják meg ezt, hogy nemcsak a legutóbbi státuszokat tárolják, hanem minden előzménystátuszt is, amely minden egyes blokk után keletkezik. Alapvetően ez egy kompromisszum, mert a számítási kapacitás helyett ehhez nagyobb tárhely szükséges.

Fontos megjegyezni, hogy a hálózat nem az archív csomópontoktól függ, hogy azok megtartsák és biztosítsák az összes előzményadatot. Ahogy már említettük, a teljes csomópontok minden köztes előzménystátuszt meg tudnak mutatni. A tranzakciókat mindegyik teljes csomópont tárolja (jelenleg kisebb mint 400 G), és vissza tudja azokat játszani ahhoz, hogy egy teljes archívumot felépítsen belőlük.

### Felhasználási módok

Az Ethereum általános használata, mint a tranzakciók küldése, a szerződések létrehozása, a konszenzus ellenőrzése stb. nem igényel semmilyen előzményadatot. A felhasználóknak nincs szükségük archív csomópontra ahhoz, hogy interakciókat hajtsanak végre a hálózattal.

A státuszarchívumok fő haszna az előzménystátuszok gyors elérése. Például az archív csomópont azonnal megadja az eredményt a következő kérdésekre:

- _Mi volt az ETH egyenlege a 0x1337... számlának a 15 537 393. blokknál?_
- _Mi az egyenlege a 0x tokennek a 0x szerződéseben az 1 920 000. blokknál?_

Ahogy felvázoltuk, a teljes csomópont ezt az adatot az EVM végrehajtással tudja előállítani, ami CPU-t és időt igényel. Az archív csomópontok a merevlemezen érik el és azonnal meg tudják azt adni. Ez egy hasznos jellemző az infrastruktúra bizonyos részeinek, például:

- Szolgáltatásnyújtók, mint a blokk felfedezők
- Kutatók
- Biztonsági elemzők
- Dapp-fejlesztők
- Auditálás és a szabályoknak való megfelelés

Számtalan ingyenes [szolgáltatás](/developers/docs/nodes-and-clients/nodes-as-a-service/) van, ami hozzáférést enged az előzményadatokhoz. Mivel nagyobb teherrel jár egy archív csomópont futtatása, ez a hozzáférés általában korlátozott és esetileg működik. Ha egy projekt állandó hozzáférést igényel az előzményadatokhoz, akkor érdemes saját archív csomópontot futtatnia.

## Telepítés és használat

Az archív csomópont ebben a kontextusban azt jelenti, hogy a végrehajtási kliensek adatot szolgáltatnak, mert kezelik a státuszadatbázist és JSON-RPC végpontokat biztosítanak. A konfigurációs lehetőségek, a szinkronizálási idő és az adatbázis mérete kliensenként változik. A részletekkel kapcsolatos részletekért, kérjük, tekintse át az Ön által használt kliens dokumentációját.

Mielőtt egy archív csomópontot kezdene futtatni, tekintse át a kliensek közötti különbségeket, elsősorban a különböző [hardverszükségleteket](/developers/docs/nodes-and-clients/run-a-node/#requirements). A legtöbb kliensben ez a funkció nincs optimalizálva, így az archív változataik több mint 12 TB helyet igényelnek. Ezzel ellentétben az olyan implementáció, mint amilyen az Erigon, képes ugyanazt az adatot kevesebb mint 3 TB helyen tárolni, ami az archív csomópontok esetében a leghatékonyabbá teszi őket.

## Bevált gyakorlatok

Azon túl, amit általános [javaslatként megfogalmaznak a csomópont futtatásához](/developers/docs/nodes-and-clients/run-a-node/), az archív csomópont működtetése többet igényelhet a hardver és a fenntartás szempontjából. Figyelembe véve az Erigon [fő jellemzőit](https://github.com/ledgerwatch/erigon#key-features), a leghasznosabb megközelítés egy [Erigon](/developers/docs/nodes-and-clients/#erigon)-kliens létrehozása lenne.

### Hardver

Mindig ellenőrizze az egy adott csomópontra vonatkozó hardverigényeket a kliens dokumentációjában. Az archív csomópontok legnagyobb igénye a tárhely. A klienstől függően ez 3 és 12 TB között változhat. A HDD jobb lenne a nagymennyiségű adatok tárolásához, de a szinkronizálás és a lánc elejének állandó frissítése SSD-meghajtókat igényel. A [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) meghajtók elég jók, de abból is a megbízható minőségű javasolt, vagyis legalább a [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). A lemezek elég lemezhellyel rendelkező asztali gépbe vagy szerverbe is behelyezhetők. Ezek a dedikált eszközök ideálisak egy ilyen, szinte állandóan aktív csomópont futtatásához. Laptopon is futtatható, de a hordozhatóság több költséggel jár.

Az összes adatnak egy köteten el kell férnie, ezért a lemezeket össze kell kapcsolni, pl. a [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) vagy a [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html) által. Érdemes lehet megfontolni a [ZFS](https://en.wikipedia.org/wiki/ZFS) használatát is, mert ez támogatja az írásra másolás (copy-on-write) funkciót, amivel az adat biztosabban, alacsony szintű hiba nélkül íródik a lemezre.

A nagyobb stabilitás érdekében és a véletlen adatbázis-meghibásodás megelőzésére, főleg a professzionális összeállításban, érdemes [ECC-memóriát](https://en.wikipedia.org/wiki/ECC_memory) használni, ha azt a rendszer is támogatja. A RAM méretének általában akkorának kell lennie, mint egy teljes csomópont esetében, de az ennél több RAM csak segíthet a szinkronizálás gyorsításában.

A kezdeti szinkronizáláskor az archív csomópont kliensei lefuttatják az összes tranzakciót a genezistől kezdve. A végrehajtási sebességet a CPU korlátozza, tehát a gyorsabb CPU segít a kezdeti szinkronizáláskor. Egy átlagos számítógépen a kezdeti szinkronizálás egy hónapig is eltarthat.

## További olvasnivaló {#further-reading}

- [A teljes és az archív csomópont összehasonlítása az Ethereumon](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, 2022. szeptember_
- [Építsen saját Ethereum archív csomópontot](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, 2021. augusztus_
- [Hogyan kell felállítani az Erigont, Erigon RPC-t és TrueBlocks-t (scrape és API) szolgáltatásként](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) – _Magnus Hansson, frissítve 2022. szeptember_

## Kapcsolódó témák {#related-topics}

- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Csomópontok futtatása](/developers/docs/nodes-and-clients/run-a-node/)
