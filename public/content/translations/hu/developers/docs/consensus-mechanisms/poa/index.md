---
title: Jogosultsági igazolás (proof-of-authority/PoA)
description: A jogosultsági igazolás konszenzusprotokoll bemutatása és az Ethereumban betöltött szerepe.
lang: hu
---

**A jogosultsági igazolás (POA)** egy reputációalapú konszenzusalgoritmus, amely a [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) módosított verziója. Főleg privát láncok, teszthálózatok és helyi fejlesztői hálózatok használják. PoA egy olyan reputációalapú konszenzusalgoritmus, amelynél felhatalmazott aláírók egy csoportját bízzák meg a blokkok létrehozásával, nem a PoS-nél ismert letéti alapú mechanizmus szerint végzik.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez érdemes áttekinteni a [tranzakciók](/developers/docs/transactions/), [blokkok](/developers/docs/blocks/) és a [konszenzusmechanizmus](/developers/docs/consensus-mechanisms/) oldalakat.

## Mi az a jogosultsági igazolás (PoA)? {#what-is-poa}

A jogosultsági igazolás a **[proof-of-stake](/developers/docs/consensus-mechanisms/pos/) (PoS)** módosított változata, ami egy reputációalapú konszenzusalgoritmus, nem pedig letéti alapú mechanizmus, mint a PoS esetében. A kifejezést Gavin Wood használta először 2017-ben, és ez a konszenzusalgoritmus főleg privát láncok, teszthálózatok és helyi fejlesztési hálózatok esetén működik, mely megoldja a PoW esetében szükséges jó minőségű források igényét, illetve a PoS esetében fellépő skálázási gondokat, mivel a csomópontok kis csoportja tárolja a blokkláncot és gyártja a blokkokat.

A jogosultsági igazolásnál felhatalmazott aláírók csoportját bízzák meg, mely benne van a [genezis blokkban](/glossary/#genesis-block). A jelenlegi felhasználásoknál minden felhatalmazott aláíró ugyanolyan hatalommal és jogosultsággal bír, amikor a lánc konszenzusát meghatározza. A reputációalapú letét mögött az az elképzelés húzódik, hogy a felhatalmazott validátorok jól ismertek mindenki előtt, vegyük az ismerd meg a vevődet (KYC) módszert vagy ha az egyetlen validátor egy jól ismert szervezet - így ha a validátor rosszat tesz, az identitása egyértelműen kiderül.

A PoA-nak számos implementációja létezik, de a sztenderd Ethereum módja a **clique**, mely az [EIP-225](https://eips.ethereum.org/EIPS/eip-225) fejlesztést vezette be. A clique egy fejlesztőbarát és könnyen bevezethető szabvány, amely mindenféle kliensszinkronizálást támogat. Más implementációk felölelik az [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) és az [Aura](https://openethereum.github.io/Chain-specification) módozatokat.

## Hogyan működik {#how-it-works}

A PoA esetében a felhatalmazott aláírók csoportja készíti az új blokkokat. Az aláírókat a reputációjuk alapján választják, és csak ők hozhatnak létre blokkot. Az aláírókat körmérkőzéses módon választják, és mindegyik egy adott időszakban hozhat létre blokkot. A blokk létrehozásának ideje rögzített, és ekkor kell az aláíróknak előállítani azt.

A reputáció ebben a kontextusban nem egy mérhető dolog, hanem a Microsoft és a Google esetében jól ismert módszer, így a kiválasztás se algoritmikus, hanem _bizalomalapú_, ahol az entitás, például a Microsoft, létrehoz egy PoA privát hálózatot startup-ok százai vagy ezrei részvételével, ő maga a megbízott aláíró, aki új aláírókat adhat a rendszerhez, mint például a Google-t, így a startup-ok kétely nélkül bíznak abban, hogy a Microsoft jóhiszeműen jár el és így használja a hálózatot. Ez megoldja a különböző kis/privát hálózatokban való letétek szükségességét, amelyeket különböző célokra építettek, hogy decentralizáltak és működőképesek maradjanak, valamint a bányászok szükségességét, ami sok energiát és erőforrást igényel. Néhány privát hálózat a PoA szabványt használja, mint a VeChain, és néhány módosította azt, mint a Binance, mely [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) verziót használ, ami egy személyre szabott PoA és PoS verzió.

A szavazási folyamatot az aláírók végzik. Minden aláíró szavaz egy adott aláíró bevétele vagy eltávolítása mellett a saját blokkjában, amikor azt létrehozza. A szavazatokat összegzik a csomópontok, így az aláírók bekerülnek vagy kikerülnek, ha a szavazatok elérik a SIGNER_LIMIT határt.

Bizonyos esetekben apróbb elágazások történhetnek, a blokk nehézsége azon múlik, hogy soron belül vagy kívül írták alá. A soron belüli blokkok 2-es nehézséggel bírnak, a soron kívüliek 1-essel. A kisebb elágazások esetén az a lánc lesz az összetettebb és ezáltal a nyertes, amely a legtöbb soron belüli aláírót tudja felmutatni.

## Támadási vektorok {#attack-vectors}

### Rosszhiszemű aláírók {#malicious-signers}

Lehetséges, hogy egy rosszhiszemű aláíró kerül be az aláírók listájába, vagy kompromittálódik egy aláírási kulcs/gép. Ilyen helyzetben a protokollnak meg kell védenie magát az átszervezések és a teleszemetelés (spamming) ellen. A javasolt megoldás az, hogy ha van egy N elemű aláírólista, mindegyik aláíró egy blokkot hoz létre minden K-ból. Így a kár korlátozott, a validátorok többi része pedig ki tudja szavazni a rosszhiszemű felhasználót.

### Cenzúrázás {#censorship-attack}

Egy másik érdekes támadási vektor, ha egy aláíró (vagy az aláírók egy csoportja) megpróbálja cenzúrázni a blokkokat azáltal, hogy kiszavazza azokat a jóváhagyott listából. Ennek elkerüléséhez az aláírók blokk-készítését 1-re kell korlátozni N/2-ből. Ekkor a rosszhiszemű aláíróknak legalább 51%-nyi aláírószámlát kell kontrollálniuk, és ekkor ők mondják meg mi a lánc új státusza.

### Szemetelés (spam) {#spam-attack}

Egy másik kisebb támadási vektor az, amikor a rosszhiszemű aláírók új szavazási javaslatot adnak az általuk készített blokkban. Mivel a csomópontoknak egyesíteni kell a szavazatokat, hogy létrehozzák az felhatalmazott aláírók listáját, így az összes szavazatot rögzíteniük kell. Ha a szavazási ablaknak nincs határa, akkor ez lassan, de a végtelenségig növekedhet. Ennek megoldása az, hogy W blokk kap egy _mozgó_ ablakot, ami után a szavazatok már elévülnek. _Az ablak 1–2 korszak hosszúságú lehetne._

### Párhuzamos blokkok {#concurrent-blocks}

Egy PoA-alapú hálózatban, ha N felhatalmazott aláíró van, minden aláíró K-ból 1 blokkot hozhat létre, ami azt jelenti, hogy N-K+1 validátornak van lehetősége bármely adott időpontban blokkot készíteni. Ahhoz, hogy a validátorok ne versenyezzenek a blokkokért, minden aláírónak egy kis véletlenszerű „elmozdulást” kell adni az időhöz, amikor az új blokkot készíti. Bár ezzel a kisebb elágazások ritkák, de mégis megtörténhetnek, ahogy a főhálózatnál is. Ha egy aláíró visszaél a hatalmával és káoszt csinál, akkor a többi aláíró kiszavazhatja.

Ha például 10 felhatalmazott aláíró van, és mindegyik készíthet 1 blokkot a 20-ból, akkor bármelyik időben 11 validátor blokkot készíthet. Ahhoz, hogy a validátorok ne versenyezzenek a blokkokért, minden aláírónak egy kis véletlenszerű „elmozdulást” kell adni az időhöz, amikor az új blokkot készíti. Bár ezzel a kisebb elágazások ritkák, de mégis megtörténhetnek, ahogy a főhálózatnál is. Ha egy aláíró visszaél a hatalmával és káoszt csinál, akkor a többi aláíró kiszavazhatja.

## Előnyök és hátrányok {#pros-and-cons}

| Előnyök                                                                                                                           | Hátrányok                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sokkal jobban skálázható, mint más népszerű mechanizmusok, mint a PoS és a PoW, és behatárolt blokkaláírón alapszik               | A PoA-hálózatok általában kevés validáló csomóponttal működnek. Emiatt a PoA-hálózat sokkal centralizáltabb.                  |
| A PoA-blokkláncokat rendkívül olcsó futtatni és fenntartani                                                                       | Az átlagos felhasználó nem válik felhatalmazott aláíróvá, mert a blokklánchoz olyan entitások kellenek, amelyek reputációja jól megalapozott. |
| A tranzakciókat gyorsan konfirmálják, akár 1 másodpercen belül, mert csak korlátozott számú aláíró kell az új blokk validálásához | A rosszhiszemű aláírók képesek átrendezésre, dupla költésre, tranzakciócenzúrára a hálózaton belül, amelyeket lehet mitigálni, de ettől még lehetségesek      |

## További olvasnivaló {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique szabvány_
- [A jogosultsági igazolásról készült tanulmány](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Mi az a jogosultsági igazolás](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [A jogosultsági igazolás magyarázata](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA a blokkláncban](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [A clique magyarázata](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Elavult PoA, Aura-specifikáció](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, egy másik PoA-implementáció](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Ön inkább vizuális típus? {#visual-learner}

Tekintse meg a jogosultsági igazolás vizuális magyarázatát:

<YouTube id="Mj10HSEM5_8" />

## Kapcsolódó témák {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
