---
title: Gáz és tranzakciós díjak
description:
lang: hu
sidebar: true
incomplete: true
---

Az gáz (Gas) nélkülözhetetlen az Ethereum hálózaton. Ez az üzemanyag, amitől működik, ahogyan az autóknak is szükségük van benzinre, hogy menjenek.

## Előfeltételek {#prerequisites}

Hogy jobban megértsd ezt az oldalt, javasoljuk, hogy előbb olvasd el a [tranzakciókról](/en/developers/docs/transactions/) és az [EVM-ről](/en/developers/docs/evm/) szóló oldalakat.

## Mi az a gáz? {#what-is-gas}

A gáz a számítási erőfeszítés mértékegységét jelenti, mely bizonyos műveletek végrehajtásához szükséges az Ethereum hálózaton.

Mivel minden egyes utalás az Ethereum hálózaton számítási erőforrást igényel, minden tranzakciónak van egy díja. A gáz a tranzakciós díj, ami szükséges a tranzakció sikeres lebonyolításához.

![Egy diagram, mely azt mutatja, hogy hol van szükség gázra az EVM műveleteknél](./gas.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

Lényegében a gáz díjakat az Ethereum natív valutájában, Etherben (ETH) lehet kifizetni. A gáz árak Gwei-ben vannak feltüntetve, mely az ETH-nek egy egysége - minden Gwei 0.000000001 ETH-tel egyenlő (10<sup>-9</sup> ETH). Például ahelyett, hogy azt mondanánk, hogy a gáz 0.000000001 Ether-be kerül, azt mondjuk, hogy a gáz ára 1 Gwei.

Az alábbi videó jó áttekintés ad, hogy miért van szükségünk a gázra: <iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Miért létezik az gáz? {#why-do-gas-fees-exist}

Röviden, a gáz tartja biztonságban az Ethereum hálózatot. Azzal, hogy minden hálózaton végrehajtott számítás egy díjat von maga után, megelőzzük, hogy ártó személyek túlterheljék a hálózatot. Azért, hogy megelőzzük a véletlen vagy ártó szándékú végtelen ciklusokat vagy más számítási pazarlással járó kódot, minden egyes tranzakciónak be kell állítani egy határt, hogy mennyi számítási lépést hajthat végre a kódlefutás. A számítás alap mértékegysége a "gáz".

Annak ellenére, hogy a tranzakciós díjak limitálva vannak, a nem felhasznált üzemanyag visszajut az utaló félhez.

![Egy diagram, mely a fel nem használt gáz visszatérítését ábrázolja](../transactions/gas-tx.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

## További olvasnivaló {#further-reading}

- [Ethereum gáz, blokkok és a tranzakciós díjpiac megértése](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [Ethereum gáz oktató anyag](https://defiprime.com/gas)

## Kapcsolódó eszközök {#related-tools}

- [ ETH üzemanyag állomás ](https://ethgasstation.info/)_ Vevő orientált metrikák az Ethereum gáz piacáról _
- [ Etherscan gáz követő felület ](https://etherscan.io/gastracker)_ Tranzakciós díj becslés _
- [ Bloxy gáz analitikája ](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true)_ Ethereum gáz statisztikák_

## Kapcsolódó témák {#related-topics}

- [Bányászat](/en/developers/docs/consensus-mechanisms/pow/mining/)
