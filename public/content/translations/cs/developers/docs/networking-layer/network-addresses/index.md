---
title: Síťové adresy
description: Úvod do síťových adres.
lang: cs
sidebarDepth: 2
---

Síťové uzly se musí identifikovat pomocí základních informací, aby se mohly připojit k peerům. Aby se zajistilo, že jakýkoli potenciální peer může tyto informace interpretovat, jsou předávány v jednom ze tří standardizovaných formátů, kterým rozumí každý Ethereum uzel: multiaddr, enode nebo Ethereum Node Records (ENR). ENR jsou současným standardem pro síťové adresy na Ethereu.

## Předpoklady {#prerequisites}

Pro pochopení této stránky je nutná určitá znalost [síťové vrstvy](/developers/docs/networking-layer/) Etherea.

## Multiaddr {#multiaddr}

Původní formát adresy síťového uzlu Etherea byl 'multiaddr' (zkratka pro 'multi-adresy'). Multiaddr je univerzální formát navržený pro sítě peer-to-peer. Adresy jsou reprezentovány jako páry klíč-hodnota, kde jsou klíče a hodnoty odděleny lomítkem. Například multiaddr pro uzel s IPv4 adresou `192.168.22.27`, který naslouchá na TCP portu `33000`, vypadá takto:

`/ip4/192.168.22.27/tcp/33000`

Pro Ethereum uzel obsahuje multiaddr node-ID (haš veřejného klíče):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode je způsob, jak identifikovat Ethereum uzel pomocí formátu URL adresy. Hexadecimální node-ID je zakódováno v uživatelské části URL, oddělené od hostitele znakem @. Hostitelské jméno může být zadáno pouze jako IP adresa; DNS jména nejsou povolena. Port v části hostitelského jména je TCP naslouchací port. Pokud se TCP a UDP (discovery) porty liší, UDP port je specifikován jako dotazovací parametr "discport".

V následujícím příkladu URL uzlu popisuje uzel s IP adresou `10.3.58.6`, TCP portem `30303` a UDP discovery portem `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Záznamy ethereových uzlů (ENR) {#enr}

Ethereum Node Records (ENR) jsou standardizovaným formátem síťových adres na Ethereu. Nahrazují formáty multiaddr a enode. Tyto záznamy jsou obzvláště užitečné, protože umožňují větší výměnu informací mezi uzly. ENR obsahuje podpis, pořadové číslo a pole podrobně popisující identifikační schéma použité k vytvoření a ověření podpisů. ENR může být také naplněn libovolnými daty organizovanými jako páry klíč-hodnota. Tyto páry klíč-hodnota obsahují IP adresu uzlu a informace o podprotokolech, které uzel může používat. Konsensuální klienti používají [specifickou strukturu ENR](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) k identifikaci bootovacích uzlů a také obsahují pole `eth2` s informacemi o aktuální větvi Etherea a atestačním gossip subnetu (to propojuje uzel s konkrétní sadou peerů, jejichž atestace jsou agregovány dohromady).

## Další čtení {#further-reading}

- [EIP-778: Záznamy ethereových uzlů (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
