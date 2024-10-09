---
title: Az Ethereum skálázása
description: A összevont tranzakciók összekötegelik a tranzakciókat a láncon kívül, ezzel csökkentve a felhasználó költségét. Az összesítések jelenlegi adatfelhasználásának módja azonban túl drága, ami korlátozza a tranzakciók olcsóságát. Erre a Proto-Danksharding nyújt megoldást.
lang: hu
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum-ütemterv"
template: roadmap
---

Az Ethereum skálázása a [layer 2s](/layer-2/#rollups) második blokkláncréteg (L2), vagy más néven összevont tranzakciók által történik, ami kötegbe rendezi a tranzakciókat és az eredményt beküldi az Ethereumra. Habár az összevont tranzakciók költsége a nyolcada az Ethereum főhálózaténak, még mindig van hova optimalizálni a működésüket és ezzel csökkenteni a felhasználók költségét. A összevont tranzakciók emellett néhány centralizált komponensre támaszkodnak, amelyet a fejlesztők eltávolíthatnak majd, ahogy az összevont tranzakciók fejlődik.

<InfoBanner mb={8} title="Tranzakciós költség">
  <ul style={{ marginBottom: 0 }}>
    <li>Ma az összevont tranzakciók <strong>kb. 5–20×</strong> olcsóbbak, mint az Ethereum L1</li>
    <li>A ZK összevont tranzakciók esetében hamarosan <strong>~40–100×</strong> alacsonyabb lesz a díj</li>
    <li>Az eljövendő Ethereum-módosítások további <strong>~100–1000×</strong>-szoros skálázást tesznek lehetővé</li>
    <li style={{ marginBottom: 0 }}>A felhasználók számára egy tranzakció <strong>kevesebb mint 0,001 $-ba</strong> fog kerülni</li>
  </ul>
</InfoBanner>

## Az adatok olcsóbbá tétele {#making-data-cheaper}

A összevont tranzakciók sok tranzakciót gyűjtenek össze, végrehajtják azokat és az eredményt az Ethereumra küldik. Ez rengeteg adatot jelent, amelyet nyíltan elérhetővé kell tenni bárki számára, hogy lefuttathassa a tranzakciókat és ellenőrizze, hogy az összevont tranzakció operátora jóhiszeműen járt el. Ha valaki talál egy eltérést, akkor megkérdőjelezheti azt.

### Proto-Danksharding {#proto-danksharding}

Az összevont tranzakciós adatok korábban tartósan az Ethereumon maradtak, ami drága volt. Az összevont tranzakciók tranzakciós költségeinek több mint 90%-át az adattárolás teszi ki. A tranzakciós költségek csökkentéséhez az adatot egy új átmeneti blob tárhelyre mozgathatjuk. A blob olcsóbb, mert nem tartós; törölhetők az Ethereumról, amint már nincs rájuk szükség. Az összevont tranzakciós adatok hosszú távon azoknak a felelősségébe tartoznak, akiknek szükségük van azokra, mint például az összevont tranzakciós operátorok, tőzsdék, indexáló szolgáltatások stb. Az Ethereum blob-tranzakcióval való kiegészítése a „Proto-Danksharding” néven ismert frissítés része.

A Proto-Danksharding segítségével sok blobot lehet hozzáadni az Ethereum blokkokhoz. Ez egy újabb jelentős (több mint 100×) skálázási lehetőség az Ethereum tranzakcióátvitelét illetően és a költségek csökkentésére.

### Dank-féle párhuzamos futtatás (Danksharding) {#danksharding}

A blob adatok bővítésének második szakasza bonyolult, mert új módszereket igényel az összesítő adatok hálózaton való elérhetőségének ellenőrzéséhez, és [ellenőrzőkre](/glossary/#validator) támaszkodik, amelyek elválasztják a [blokk](/glossary/#block) felépítési és blokkjavaslat-feladatokat. Kell hozzá egy olyan módszer is, amely kriptográfiailag bizonyítja, hogy a validátor igazolta a blobadat egy kis részét.

Ez a második lépés a [Danksharding](/roadmap/danksharding/). **Valószínűleg több év múlva** a teljes megvalósításig. A Danksharding más fejlesztéseken is múlik, mint a [PBS](/roadmap/pbs) és új hálózati dizájn, hogy a hálózat hatékonyan tudja konfirmálni, hogy az adatok elérhetők, azáltal hogy véletlenszerűen néhány kilobájtos mintát választ egy adott időben, ezt [adat-elérhetőségi mintavételnek (DAS)](/developers/docs/data-availability) nevezzük.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Bővebben a Dankshardingról</ButtonLink>

## Az összevont tranzakciók decentralizálása {#decentralizing-rollups}

Az [összevont tranzakciók](/layer-2) már most is gondoskodnak az Ethereum méretezhetőségéről. Az [összevont tranzakciós projektek gazdag ökoszisztémája](https://l2beat.com/scaling/tvl) teszi lehetővé, hogy a felhasználó gyorsabban és olcsóbban indítson tranzakciót, a biztonsági garanciák széles körét kiélvezve. Ugyanakkor az összevont tranzakciók centralizált szekvenszert használnak (ami feldolgozza a tranzakciókat és aggregálja azokat, mielőtt az Ethereumra küldené). Ez lehetővé teszi a cenzúrát, mivel a szekvenszeroperátorokat meg lehet büntetni, vesztegetni vagy máshogy veszélyeztetni. Emellett az [összevont tranzakciók eltérnek abban](https://l2beat.com), hogyan validálják a bejövő adatokat. A legjobb módja a „bizonyítók” [csalási bizonyítékok](/glossary/#fraud-proof) vagy érvényességi igazolások benyújtása, de még nincs meg minden összesítés. Még ahol léteznek is ilyen érvényesítési/csalásbiztos összevont tranzakciók, ott is csak kevés bizonyítót használnak. Ezért a következő fontos lépés az Ethereum skálázásban, hogy elossza a szekvenszer és a bizonyító felelősségét több emberre.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Bővebben az összevont tranzakciókról</ButtonLink>

## Jelenlegi helyzet {#current-progress}

A Proto-Danksharding az első ilyen ütemterv, amelyet a Cancun-Deneb („Dencun”) hálózatfrissítés részeként hajtanak végre 2024 márciusában. **A teljes Danksharding valószínűleg több év múlva lesz elérhető**, mivel számos egyéb ütemtervelemtől függ először. Az összevont tranzakciók infrastruktúrájának decentralizálása egy fokozatos folyamat lesz – több különböző összevont tranzakció létezik, amelyek kicsit más felállásban működnek, és más rátán fogják tudni elvégezni a decentralizálást.

[További információ a Dencun hálózatfrissítésről](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
