---
title: Adat és elemzések
description: Hogyan használjon on-chain elemzéseket és adatokat a dappjában
lang: hu
---

## Bevezetés {#Introduction}

Ahogy a hálózat használata tovább fejlődik, a láncon belüli adatokban egyre növekszik az értékes információk mennyisége. Az adatok mennyiségének gyors növekedésével sok idő és kapacitás kell ahhoz, hogy ezeket az információkat kalkulálni és aggregálni tudjuk, hogy riportálható legyen vagy egy alkalmazást vezéreljen.

A jelenlegi adatszolgáltatók használata előmozdíthatja a fejlesztést, sokkal pontosabb eredményeket adhat és csökkentheti a fenntartáshoz szükséges erőfeszítéseket. Ezáltal a fejlesztők koncentrálhatnak a projektjük fő funkcionalitására, melyet elérhetővé szeretnének tenni.

## Előfeltételek {#prerequisites}

Érdemes áttekinteni a [blokkfelfedezők](/developers/docs/data-and-analytics/block-explorers/) alapkoncepcióját, hogy hogyan használhatók adatelemzési területen. Emellett az [index](/glossary/#index) koncepciójának megértése is fontos, hogy egyértelművé váljon, a rendszerterv részeként milyen előnyöket hozhat.

Az architektúra alapjaiból fontos ismerni, mi az az [API](https://www.wikipedia.org/wiki/API) és a [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), akár csak elméletben.

## Blokk felfedezők {#block-explorers}

Néhány [blokkfelfedező](/developers/docs/data-and-analytics/block-explorers/) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) kapcsolatokat ajánl, hogy a fejlesztőknek rálátásuk legyen az aktuális adatokról a blokkok, tranzakciók, bányászok, számlák és más láncon folyó tevékenységek tekintetében.

A fejlesztők ezáltal ezeket az adatokat feldolgozzák és átalakítják, hogy a felhasználóiknak egyedi rálátásuk legyen a [blokkláncra](/glossary/#blockchain) és interakcióba léphessenek vele. Például az [Etherscan](https://etherscan.io) végrehajtási és konszenzusok adatokat biztosít minden 12 másodperces slotról.

## The Graph {#the-graph}

A [Graph Network](https://thegraph.com/) egy decentralizált indexáló protokoll a blokkláncadatok összerendezésére. Ahelyett, hogy láncon kívüli és centralizált adattárházakat építenének és menedzselnének a láncon belüli adatok aggregálására, a The Graph révén a fejlesztők szerver nélküli alkalmazásokat építhetnek, melyek teljes mértékben nyilvános infrastruktúrán működnek.

A [GraphQL](https://graphql.org/) lekérdezési nyelv használatával a fejlesztők lekérdezhetik bármelyik gondozott, nyílt API-t, más néven algráfot (subgraph), hogy megszerezzék az alkalmazás működéséhez szükséges információkat. Az indexált algráfok lekérdezésével a riportok és alkalmazások nemcsak teljesítmény- és skálázási előnyhöz jutnak, hanem a hálózati konszenzus által biztosított adathelyességet is élvezhetik. A hálózatba kerülő új fejlesztésekkel és algráfokkal az Ön projektje is gyorsan előnyt kovácsolhat ezekből az újdonságokból.

## Kliensdiverzitás

A [kliensdiverzitás](/developers/docs/nodes-and-clients/client-diversity/) rendkívül fontos az egész Ethereum-hálózat átfogó egészsége szempontjából, mivel védelmet biztosít a hibák és támadások ellen. Számos kliensdiverzitásról szóló kimutatás elérhető, mint a [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [execution-diversity.info](https://execution-diversity.info/) és az [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

A [Dune-elemzések](https://dune.com/) előre feldolgozzák a blokkláncadatokat relációs adatbázistáblákba (PostgreSQL és DatabricksSQL), hogy a felhasználók lekérdezhessék a blokklánc adatait SQL segítségével és ennek eredményéből további kimutatásokat építhessenek. A láncon lévő adatok 4 nyerstáblába rendeződnek: `blocks` (blokkok), `transactions` (tranzakciók), `logs` (eseménynaplózás) és `traces` (meghívások nyomai). A népszerű szerződéseket és protokollokat dekódolják, és mindegyik rendelkezik a maga eseményeket és meghívásokat tartalmazó tábláival. Ezeket az esemény- és hívástáblákat tovább dolgozzák és absztrakciós táblákba szervezik a protokollok típusa szerint, mint amilyen a DEX, kölcsönzés, stabilérmék stb.

## További olvasnivaló {#further-reading}

- [A gráfhálózat áttekintése](https://thegraph.com/docs/en/about/network/)
- [Gráflekérdezési próbafelület (playground)](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API-kódpéldák az EtherScan oldalon](https://etherscan.io/apis#contracts)
- [Beaconcha.in – Beaconlánc-felfedező](https://beaconcha.in)
- [A Dune alapjai](https://docs.dune.com/#dune-basics)
