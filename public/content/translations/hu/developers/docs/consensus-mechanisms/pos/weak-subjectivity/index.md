---
title: Gyenge szubjektivitás
description: A gyenge szubjektivitásnak és a proof-of-stake Ethereumban elfoglalt szerepének bemutatása.
lang: hu
---

A szubjektivitás a blokkláncban arra utal, hogy a jelenlegi státuszról való megegyezés közösségi információkon alapszik. Több érvényes elágazás is létezhet, amelyek közül a hálózati társaktól gyűjtött információk alapján választanak. Ennek ellentéte az objektivitás, amely olyan láncokra vonatkozik, ahol csak egy lehetséges érvényes lánc van, amelyben minden csomópont egyetért a kódolt szabályok alkalmazásával. A harmadik helyzet a gyenge szubjektivitás. Ez egy olyan lánc, amely objektíven haladhat előre, miután bizonyos kezdeti információt közösségileg megszerzett.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez tekintse meg a [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) alapjairól szóló oldalt.

## Milyen problémákat old meg a gyenge szubjektivitás? {#problems-ws-solves}

A szubjektivitás a proof-of-stake blokkláncok velejárója, mivel a helyes lánc kiválasztása több elágazás közül a korábbi szavazatok számolásával történik. Ez számos támadási vektornak teszi ki a blokkláncot, beleértve a hosszú távú támadásokat, amelyek során a láncban nagyon korán részt vevő csomópontok fenntartanak egy alternatív elágazást, amelyet később saját érdekükből kifolyólag kiadnak. Alternatív megoldásként, ha a validátorok 33%-a visszavonja a letétjét, de továbbra is tanúsít és blokkokat állít elő, akkor létrehozhatnak egy alternatív elágazást, amely ütközik a kanonikus lánccal. Az új vagy a hosszú ideje offline csomópontok nem biztos, hogy tudják, hogy ezek a támadó validátorok visszavonták a letétüket, így rávehetik őket, hogy egy helytelen láncot kövessenek. Az Ethereum olyan korlátozásokkal tudja megoldani a támadási vektorokat, amelyek a mechanizmus szubjektív aspektusait, beleértve a bizalmi feltételezéseket is, a minimálisra csökkenti.

## A gyenge szubjektivitás ellenőrzőpontjai {#ws-checkpoints}

A gyenge szubjektivitás a proof-of-stake Ethereumban az erre vonatkozó ellenőrzőpontokkal valósul meg. Ezek olyan státuszgyökerek, amelyek a hálózat összes csomópontja szerint a kanonikus láncba tartoznak. Ezek is az „egyetemes igazság” célját szolgálják, mint a genezis blokkok, azzal a különbséggel, hogy nem a genezis pozícióban helyezkednek el a blokkláncban. Az elágazásválasztó-algoritmus bízik abban, hogy az adott ellenőrzőpontban meghatározott blokkláncstátusz helyes, és hogy ettől a ponttól kezdve függetlenül és objektíven ellenőrzi a láncot. Az ellenőrzési pontok adják az adott blokk visszafordíthatóságának korlátját, mivel a gyenge szubjektivitás ellenőrzési pontjai előtti blokkok nem módosíthatók. Ez aláássa a nagy hatótávolságú támadásokat azzal, hogy a mechanizmus érvénytelennek minősíti a nagy hatótávolságú elágazásokat. Azzal, hogy a gyenge szubjektivitás ellenőrzési pontjai közelebb vannak, mint a validátor letétkivételi ideje, az elágazást készítő validátort meg tudja bünteti valamekkora összegig, mielőtt kivehetné a letétet, és így az új belépőket nem tudja eltéríteni a téves elágazásokra.

## A gyenge szubjektivitás ellenőrzési pontjai és a véglegesített blokkok közötti különbség {#difference-between-ws-and-finalized-blocks}

Az Ethereum-csomópontok másképp kezelik a véglegesített blokkokat és a gyenge szubjektivitás ellenőrzési pontjait. Ha egy csomópont két egymással versengő véglegesített blokkról szerez tudomást, akkor a kettő között vacilál – nem tudja automatikusan azonosítani, hogy melyik a kanonikus elágazás. Ez a konszenzuskudarc tünete. Ezzel szemben egy csomópont egyszerűen elutasít minden olyan blokkot, amely ütközik a gyenge szubjektivitás ellenőrzési pontjával. A csomópont szempontjából a gyenge szubjektivitás ellenőrzési pontja olyan abszolút igazságot képvisel, amelyet nem lehet aláásni a társaktól jövő információkkal.

## Mennyire gyenge a gyenge? {#how-weak-is-weak}

Az Ethereum proof-of-stake szubjektív aspektusa az, hogy a szinkronizáláshoz egy megbízható forrásból származó friss státuszra van szükség (ez a gyenge szubjektivitás ellenőrzési pontja). Annak kockázata, hogy a gyenge szubjektivitás ellenőrzési pontja rossz, nagyon alacsony, mivel több független nyilvános forrással is ellenőrizhetők, mint amilyenek a blokkfelfedezők vagy más csomópontok. Egy szoftver futtatásához azonban szükség van bizonyos fokú bizalomra, például bíznunk kell abban, hogy a fejlesztők tisztességes szoftvert készítettek.

A gyenge szubjektivitás ellenőrzési pontja a kliensszoftver részeként is megjelenhet. Vitatható, hogy egy támadó megrongálhatja a szoftverben lévő ellenőrzőpontot, és ugyanilyen könnyen magát a szoftvert is. Nincs kriptogazdasági megoldás ennek a problémának a megkerülésére, de a megbízhatatlan fejlesztők hatása az Ethereumban minimálisra csökkenthető azáltal, hogy több független klienscsapat van, amelyek különböző nyelveken készítenek egyenértékű szoftvert, és érdekeltek a tisztességes lánc fenntartásában. A blokkfelfedezők gyenge szubjektivitást ellenőrző pontokat is biztosíthatnak, vagy a kapott ellenőrzési pontokat további forrással is össze lehet vetni.

Végül, ellenőrzőpontokat lehet kérni más csomópontoktól; például egy másik Ethereum-felhasználó, aki teljes csomópontot futtat, adhat egy ellenőrzőpontot, amelyet a validátorok ellenőrizhetnek a blokkfelfedezőből származó adatokkal. Összességében a gyenge szubjektivitás ellenőrzési pontjának szolgáltatójában való bizalom csak annyira problémás, mint megbízni a kliensfejlesztőkben. A szükséges bizalom alacsony szintű. Fontos megjegyezni, hogy ezek a megfontolások abban a valószínűtlen esetben válnak fontossá, ha a validátorok többsége összeesküvést sző, hogy létrehozza a blokkláncnak egy alternatív elágazását. Bármilyen más körülmények között nem létezik több Ethereum-lánc, amelyek közül választani kellene.

## További olvasnivaló {#further-reading}

- [Gyenge szubjektivitás az Eth2-ben](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Hogyan tanultam meg szeretni a gyenge szubjektivitást](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Gyenge szubjektivitás (Teku dokumentációk)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [0. fázisú gyenge szubjektivitási útmutató](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [A gyenge szubjektivitás elemzése az Ethereum 2.0-n](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
