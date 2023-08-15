---
title: Ethereum Fejlesztési Javaslatok (EIP-k)
description: Az alapvető információk, melyek az Ethereum fejlesztési javaslatok (EIP-k) megértéséhez szükségesek.
lang: hu
---

# Bevezetés az Ethereum Fejlesztési Javaslatokba (EIP-k) {#introduction-to-ethereum-improvement-proposals-eips}

## Mik azok az EIP-k? {#what-are-eips}

[Az Ethereum Fejlesztési Javaslatok (EIP-k)](https://eips.ethereum.org/) olyan sztenderdek, melyek potenciális új funkciókat és folyamatokat specifikálnak az Ethereumra. Az EIP-k tartalmazzák a javasolt változtatások műszaki előírásait, és a közösség „igazságforrásaként” működnek. Az Ethereum hálózati frissítéseit és alkalmazási szabványait az EIP folyamaton keresztül tárgyalják és fejlesztik.

Az Ethereum közösségben bárki létrehozhat egy EIP-t. Az EIP írás irányelveit az [EIP 1](https://eips.ethereum.org/EIPS/eip-1) tartalmazza. Az EIP-nek tömör technikai specifikációt kell tartalmaznia a szolgáltatásról és annak indoklásáról. Az EIP szerzője felelős a közösségen belüli konszenzus kialakításáért és az eltérő vélemények dokumentálásáért. A jól kidolgozott EIP benyújtásának magas technikai elvárásai miatt a legtöbb EIP szerző történelmileg alkalmazás- vagy protokollfejlesztő volt.

## Miért fontosak az EIP-k? {#why-do-eips-matter}

Az EIP-k központi szerepet játszanak abban, hogy a változások hogyan történnek és dokumentálódnak az Ethereumon. Így lehet az embereknek javaslatot tenni, vitatkozni és elfogadni a változásokat. [Különböző típusú EIP-k](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types) léteznek, beleértve az alacsony szintű protokoll-változtatásokhoz szükséges alapvető EIP-ket, amelyek befolyásolják a konszenzust és hálózati frissítést igényelnek, valamint az alkalmazási szabványokhoz szükséges ERC-ket. Például a token létrehozás szabványai, mint az [ERC20](https://eips.ethereum.org/EIPS/eip-20) vagy az [ERC721](https://eips.ethereum.org/EIPS/eip-721) lehetővé teszik ezekkel a tokenekkel interakcióba lépő alkalmazásoknak, hogy az összes tokent ugyanazon szabály szerint kezeljék, mely így könnyebbé teszi az interoperábilis alkalmazások létrehozását.

Minden hálózati frissítés EIP-kből áll, melyeket minden [Ethereum kliensnek](/learn/#clients-and-nodes) implementálnia kell a hálózaton. Ez azt jelenti, hogy az Ethereum főhálózat többi kliensével való konszenzus fenntartása érdekében az kliens fejlesztőknek meg kell győződniük arról, hogy mindannyian implementálták a szükséges EIP-ket.

A változások technikai specifikációjával együtt az EIP-k egy olyan egységet képeznek, amely körül az irányítás történik az Ethereumban: bárki szabadon javasolhat egyet, ezután a közösség különböző érdekeltjei megvitatják, hogy ezt szabványként kell-e elfogadni, vagy egy hálózati frissítés legyen-e belőle. Mivel a nem belső (non-core) EIP-ket nem kell minden alkalmazásnak bevezetnie (például csinálhatsz egy nem-[ERC20 tokent](https://eips.ethereum.org/EIPS/eip-20)), de a belső (core) EIP-ket széleskörűen be kell vezetni (mivel minden csomópontot frissíteni kell, hogy ugyanahhoz a hálózathoz tartozzanak), a belső EIP-k szélesebb konszenzust igényelnek a közösségen belül, mint a nem belső EIP-k.

## EIP-k története {#history-of-eips}

Az [Ethereum Improvement Proposals (EIPs) GitHub gyűjteményt](https://github.com/ethereum/EIPs) 2015 októberében hozták létre. Az EIP folyamat a [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) folyamaton alapul, ami pedig a [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) folyamaton alapul.

Az EIP szerkesztők feladata a technikai hibátlanság, a helyesírás/nyelvtan és a kód stílus ellenőrzése. Többek között Martin Becze, Vitalik Buterin és Gavin Wood voltak az eredeti EIP szerkesztők 2015-től 2016 végéig. A jelenlegi EIP szerkesztők:

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (Community)
- Casey Detrio (EWASM/Ethereum Foundation)
- Hudson James (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (Community)

## Bővebben {#learn-more}

Ha szeretnél többet olvasni az EIP-kről, akkor látogasd meg az [EIP-k weboldalát](https://eips.ethereum.org/), ahogy további információkat találhatsz többek között:

- [A különböző EIP típusokról](https://eips.ethereum.org/)
- [Az EIP-ről, melyek elkészültek](https://eips.ethereum.org/all)
- [Az EIP státuszokról és a jelentésükről](https://eips.ethereum.org/)

## Részvétel {#participate}

Ha szeretnéd követni vagy megosztani a véleményedet az EIP-kről, akkor nézd meg az [Ethereum Magicians fórumot](https://ethereum-magicians.org/), ahol megvitatjuk az EIP-eket a közösséggel.

Továbbá:

- [Hogyan kell EIP-t készíteni](https://eips.ethereum.org/EIPS/eip-1)

## Hivatkozások {#references}

<cite class="citation">

Az oldal tartalmát részben az [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) szolgáltatta Hudson Jameson által

</cite>
