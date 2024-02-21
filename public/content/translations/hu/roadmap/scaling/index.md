---
title: Az Ethereum skálázása
description: A összevont tranzakciók összekötegelik a tranzakciókat a láncon kívül, ezzel csökkentve a felhasználó költségét. Ugyanakkor ahogy az összevont tranzakciók jelenleg használják az adatokat, az túl drága, és behatárolják, hogy milyen alacsony is lehet a tranzakciós díj. Erre a Proto-Danksharding nyújt megoldást.
lang: hu
image: /roadmap/roadmap-transactions.png
alt: "Ethereum-ütemterv"
template: roadmap
---

Az Ethereum skálázása a [layer 2s](/layer-2/#rollups) második blokkláncréteg (L2), vagy más néven összevont tranzakciók által történik, ami kötegbe rendezi a tranzakciókat és az eredményt beküldi az Ethereumra. Habár az összevont tranzakciók költsége a nyolcada az Ethereum főhálózaténak, még mindig van hova optimalizálni a működésüket és ezzel csökkenteni a felhasználók költségét. A összevont tranzakciók emellett néhány centralizált komponensre támaszkodnak, amelyet a fejlesztők eltávolíthatnak majd, ahogy az összevont tranzakciók fejlődik.

<InfoBanner mb={8} title="Tranzakciós költség">
  <ul style={{ marginBottom: 0 }}>
    <li>Ma az összevont tranzakciók <strong>~3–8×</strong> olcsóbbak, mint az Ethereum L1</li>
    <li>A ZK összevont tranzakciók esetében hamarosan <strong>~40–100×</strong> alacsonyabb lesz a díj</li>
    <li>Az eljövendő Ethereum-módosítások további <strong>~100–1000×</strong>-szoros skálázást tesznek lehetővé</li>
    <li style={{ marginBottom: 0 }}>A felhasználók számára egy tranzakció <strong>kevesebb mint 0,001 $-ba</strong> fog kerülni</li>
  </ul>
</InfoBanner>

## Az adatok olcsóbbá tétele {#making-data-cheaper}

A összevont tranzakciók sok tranzakciót gyűjtenek össze, végrehajtják azokat és az eredményt az Ethereumra küldik. Ez rengeteg adatot jelent, amelyet nyíltan elérhetővé kell tenni bárki számára, hogy lefuttathassa a tranzakciókat és ellenőrizze, hogy az összevont tranzakció operátora jóhiszeműen járt el. Ha valaki talál egy eltérést, akkor megkérdőjelezheti azt.

### Proto-Danksharding {#proto-danksharding}

A összevont tranzakciós adatok tartósan az Ethereumon maradnak, ami drága. Az összevont tranzakciók tranzakciós költségeinek több mint 90%-át az adattárolás teszi ki. A tranzakciós költségek csökkentéséhez az adatot egy új átmeneti blob tárhelyre mozgathatjuk. A blob olcsóbb, mert nem tartós; törölhetők az Ethereumról, amint már nincs rájuk szükség. A összevont tranzakciós adatok hosszú távon azoknak a felelősségébe tartoznak, akiknek szükségük van azokra, mint az összevont tranzakciós operátorok, tőzsdék, indexáló szolgáltatások stb. Az Ethereum blob-tranzakcióval való kiegészítése a „Proto-Danksharding” néven ismert frissítés része. Viszonylag hamar, 2023 végére várható, hogy a frissítés bevezetésre kerül.

Miután a blob-tranzakció a protokoll részévé válik a Proto-Dankshardingon keresztül, számos blobot lehet majd hozzáadni az Ethereum-blokkokhoz. Ez egy újabb jelentős (több mint 100×) skálázási lehetőség az Ethereum tranzakcióátvitelét illetően és a költségek csökkentésére.

### Dank-féle párhuzamos futtatás (Danksharding) {#danksharding}

A blobadatok kiterjesztésének második szintje bonyolult, mert új módszer kell annak ellenőrzésére, hogy az összevont tranzakcióadatok a hálózaton vannak, és arra támaszkodik, hogy a validátor felelősségi körei szétválnak a blokk építésre és javaslattételre. Kell hozzá egy olyan módszer is, amely kriptográfiailag bizonyítja, hogy a validátor igazolta a blobadat egy kis részét.

Ez a második lépés a [Danksharding](/roadmap/danksharding/). Valószínűleg néhány évnek el kell telnie, mire teljesen kialakul. A Danksharding más fejlesztéseken is múlik, mint a [PBS](/roadmap/pbs) és új hálózati dizájn, hogy a hálózat hatékonyan tudja konfirmálni, hogy az adatok elérhetők, azáltal hogy véletlenszerűen néhány kilobájtos mintát választ egy adott időben, ezt [adat-elérhetőségi mintavételnek (DAS)](/developers/docs/data-availability) nevezzük.

<ButtonLink variant="outline-color" to="/roadmap/danksharding/">Bővebben a Dankshardingról</ButtonLink>

## Az összevont tranzakciók decentralizálása {#decentralizing-rollups}

Az [összevont tranzakciók](/layer-2) már most is gondoskodnak az Ethereum méretezhetőségéről. Az [összevont tranzakciós projektek gazdag ökoszisztémája](https://l2beat.com/scaling/tvl) teszi lehetővé, hogy a felhasználó gyorsabban és olcsóbban indítson tranzakciót, a biztonsági garanciák széles körét kiélvezve. Ugyanakkor az összevont tranzakciók centralizált szekvenszert használnak (ami feldolgozza a tranzakciókat és aggregálja azokat, mielőtt az Ethereumra küldené). Ez lehetővé teszi a cenzúrát, mivel a szekvenszeroperátorokat meg lehet büntetni, vesztegetni vagy máshogy veszélyeztetni. Emellett az [összevont tranzakciók eltérnek abban](https://l2beat.com), hogyan validálják a bejövő adatokat. A legjobb az, ha a bizonyítók csalási bizonyítékot vagy érvényességi bizonyítékot adnak be, de nem minden összevont tranzakció tart még itt. Még ahol léteznek is ilyen érvényesítési/csalásbiztos összevont tranzakciók, ott is csak kevés bizonyítót használnak. Ezért a következő fontos lépés az Ethereum skálázásban, hogy elossza a szekvenszer és a bizonyító felelősségét több emberre.

<ButtonLink variant="outline-color" to="/developers/docs/scaling/">Bővebben az összevont tranzakciókról</ButtonLink>

## Jelenlegi helyzet {#current-progress}

A Proto-Danksharding valószínűleg az egyik legkorábbi útiterv lesz, ami megvalósul. A felállításához szükséges decentralizált számítási lépések már úton vannak, és számos kliens épített prototípust a blobadatok kezelésére. A teljes Danksharding valószínűleg több év múlva fog megvalósulni, mivel több más útitervelem kifejlesztése is szükséges hozzá. Az összevont tranzakciók infrastruktúrájának decentralizálása egy fokozatos folyamat lesz – több különböző összevont tranzakció létezik, amelyek kicsit más felállásban működnek, és más rátán fogják tudni elvégezni a decentralizálást.
