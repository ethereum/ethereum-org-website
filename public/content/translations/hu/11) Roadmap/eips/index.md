---
title: Ethereum Fejlesztési Javaslatok (EIP-k)
description: Az EIP megértéséhez szükséges alapinformációk
lang: hu
---

# Bevezetés az Ethereum Fejlesztési Javaslatokba (EIP-k) {#introduction-to-ethereum-improvement-proposals}

## Mik azok az EIP-k? {#what-are-eips}

[Az Ethereum Fejlesztési Javaslatok (EIP-k)](https://eips.ethereum.org/) olyan sztenderdek, melyek potenciális új funkciókat és folyamatokat specifikálnak az Ethereumra. Az EIP-k tartalmazzák a javasolt változtatások műszaki előírásait, és a közösség „igazságforrásaként” működnek. Az Ethereum hálózati frissítéseit és alkalmazási szabványait az EIP folyamaton keresztül tárgyalják és fejlesztik.

Az Ethereum közösségben bárki létrehozhat egy EIP-t. Az EIP-írás irányelveit az [EIP-1](https://eips.ethereum.org/EIPS/eip-1) tartalmazza. Egy EIP elsődleges célja, hogy tömör technikai specifikációt nyújtson némi motivációval együtt. Az EIP szerzője felelős a közösségen belüli konszenzus kialakításáért, valamint az eltérő vélemények dokumentálásáért. A jól kidolgozott EIP benyújtásának magas szakmai követelményei miatt a legtöbb EIP-szerző általában alkalmazás- vagy protokollfejlesztő.

## Miért fontosak az EIP-k? {#why-do-eips-matter}

Az EIP-k központi szerepet játszanak abban, hogy a változások hogyan történnek és dokumentálódnak az Ethereumon. Így lehet az embereknek javaslatot tenni, vitatkozni és elfogadni a változásokat. Különböző [EIP-típusok léteznek](https://eips.ethereum.org/EIPS/eip-1#eip-types), például alapvető (core) EIP-k az alacsony szintű protokollmódosításokhoz, amelyek a konszenzust érintik és hálózatfrissítést igényelnek, mint az [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), valamint az alkalmazásstandardokat érintő ERC-k, például az [EIP-20](https://eips.ethereum.org/EIPS/eip-20) és az [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Minden hálózati frissítés EIP-kből áll, melyeket a hálózaton működő összes [Ethereum-kliensnek](/learn/#clients-and-nodes) implementálnia kell. Ez azt jelenti, hogy az Ethereum-főhálózat többi kliensével való konszenzus fenntartása érdekében a kliensfejlesztőknek meg kell győződniük arról, hogy mindannyian implementálták a szükséges EIP-ket.

A változások technikai specifikációjával együtt az EIP-k egy olyan egységet képeznek, amely körül az irányítás történik az Ethereumban: bárki szabadon javasolhat egyet, ezután a közösség különböző érdekeltjei megvitatják, hogy ezt szabványként kell-e elfogadni, vagy egy hálózati frissítés legyen-e belőle. Mivel a nem alapvető (non-core) EIP-ket nem kell minden alkalmazásnak bevezetnie (például készíthető egy helyettesíthető token, amely nem használja az EIP-20 szabványt), de az alapvető (core) EIP-ket széleskörűen be kell vezetni (mivel minden csomópontot frissíteni kell, hogy ugyanahhoz a hálózathoz tartozzanak), az alapvető EIP-k szélesebb konszenzust igényelnek a közösségen belül, mint a nem alapvető EIP-k.

## EIP-k története {#history-of-eips}

Az [Ethereum Improvement Proposals (EIPs) Github gyűjteményt](https://github.com/ethereum/EIPs) 2015 októberében hozták létre. Az EIP folyamat a [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) folyamaton alapul, ami pedig a [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) folyamaton alapul.

Az EIP-szerkesztők feladata a technikai stabilitás és a formázási kérdések vizsgálata, valamint a helyesírás/nyelvtan és a kódstílus ellenőrzése. Többek között Martin Becze, Vitalik Buterin és Gavin Wood voltak az eredeti EIP szerkesztők 2015-től 2016 végéig.

Jelenlegi EIP-szerkesztők:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Tiszteletbeli EIP-szerkesztők:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Ha ön is szeretne EIP-szerkesztő lenni, akkor tekintse meg az [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069) frissítést.

Az EIP-szerkesztők döntik el, hogy egy javaslat mikor áll készen arra, hogy EIP váljon belőle, és segítenek az EIP-szerzőknek kidolgozni javaslataikat. Az [Ethereum macskapásztorok (Cat Herder)](https://www.ethereumcatherders.com/) segítenek az EIP-szerkesztők és a közösség találkozóinak szervezésében (lásd még [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

A teljes szabványosítási folyamat diagrammal együtt megtalálható az [EIP-1](https://eips.ethereum.org/EIPS/eip-1) frissítésben.

## Bővebben {#learn-more}

Ha szeretne többet olvasni az EIP-kről, akkor tekintse meg az [EIP-k weboldalát](https://eips.ethereum.org/) és az [EIP-1](https://eips.ethereum.org/EIPS/eip-1) frissítést. További hasznos linkek:

- [Az összes Ethereum-fejlesztési javaslat (EIP) listája](https://eips.ethereum.org/all)
- [Az összes EIP-típus leírása](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Az összes EIP-állapot leírása](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Közösségi oktatási projektek {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP egy oktatási videosorozat, amely megtárgyalja az Ethereum-fejlesztési javaslatokat (EIP) és a következő frissítések főbb jellemzőit.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *Az EIPs For Nerds átfogó, egyszerűen megfogalmazott áttekintést nyújt az Ethereum-fejlesztési javaslatokról (EIP), beleértve a főbb javaslatokat, az alkalmazás-/infrastruktúra-rétegre vonatkozókat (ERC), hogy tájékoztatást nyújtson és konszenzust teremtsen a Ethereum-protokoll javasolt változásai kapcsán.*
- [EIPs.wtf](https://www.eips.wtf/) — *Az EIPs.wtf további információkat ad az Ethereum-fejlesztési javaslatokról (EIP), beleértve azok státuszát, bevezetési részleteit, a kapcsolódó pull request-eket (PR) és a közösség visszajelzéseit.*
- [EIP.Fun](https://eipfun.substack.com/) — *Az EIP.Fun az Ethereum-fejlesztési javaslatokról (EIP) ad friss híreket, a kapcsolódó EIP megbeszélésekről és más dolgokról tudósít.*
- [EIPs Insight](https://eipsinsight.com/) — *Az EIPs Insight az Ethereum-fejlesztési javaslatok (EIP) státuszáról ad folyamatjellegű és statisztikai adatokat különböző forrásokból.*

## Részvétel {#participate}

Bárki létrehozhat EIP-t. A javaslat beküldése előtt el kell olvasni az [EIP-1](https://eips.ethereum.org/EIPS/eip-1) frissítést, amely leírja az EIP-folyamatot és az EIP megírásának módját, továbbá visszajelzést kell kérni az [Ethereum Mágusok](https://ethereum-magicians.org/) weboldalán, ahol a tervezet benyújtása előtt a közösséggel együtt megvitatják a javaslatokat.

## Hivatkozások {#references}

<cite class="citation">

Az oldal tartalmát részben az [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) szolgáltatta Hudson Jameson által

</cite>
