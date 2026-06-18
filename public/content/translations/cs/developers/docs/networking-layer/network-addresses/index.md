---
title: "Síťové adresy"
description: "Úvod do síťových adres."
lang: cs
sidebarDepth: 2
---

Uzly [Etherea](/) se musí identifikovat pomocí základních informací, aby se mohly připojit k peerům. Aby bylo zajištěno, že jakýkoli potenciální peer dokáže tyto informace interpretovat, jsou předávány v jednom ze tří standardizovaných formátů, kterým rozumí každý uzel Etherea: multiaddr, enode nebo Ethereum Node Records (ENR). ENR jsou současným standardem pro síťové adresy Etherea.

## Předpoklady {#prerequisites}

K pochopení této stránky je nutná určitá znalost [síťové vrstvy](/developers/docs/networking-layer/) Etherea.

## Multiaddr {#multiaddr}

Původním formátem adresy uzlu Etherea byl 'multiaddr' (zkratka pro 'multi-addresses'). Multiaddr je univerzální formát navržený pro peer-to-peer sítě. Adresy jsou reprezentovány jako páry klíč-hodnota, kde jsou klíče a hodnoty odděleny lomítkem. Například multiaddr pro uzel s IPv4 adresou `192.168.22.27` naslouchající na TCP portu `33000` vypadá takto:

`/ip4/192.168.22.27/tcp/33000`

Pro uzel Etherea obsahuje multiaddr ID uzlu (hash jeho veřejného klíče):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode je způsob identifikace uzlu Etherea pomocí formátu URL adresy. Hexadecimální ID uzlu je zakódováno v části URL pro uživatelské jméno a od hostitele je odděleno znakem @. Název hostitele (hostname) může být zadán pouze jako IP adresa; názvy DNS nejsou povoleny. Port v části názvu hostitele je naslouchající TCP port. Pokud se porty TCP a UDP (pro objevování) liší, UDP port je specifikován jako parametr dotazu „discport“.

V následujícím příkladu URL uzlu popisuje uzel s IP adresou `10.3.58.6`, TCP portem `30303` a UDP portem pro objevování `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENR) {#enr}

Ethereum Node Records (ENR) jsou standardizovaným formátem pro síťové adresy na Ethereu. Nahrazují multiaddr a enode. Jsou obzvláště užitečné, protože umožňují větší výměnu informací mezi uzly. ENR obsahuje podpis, pořadové číslo a pole podrobně popisující schéma identity použité ke generování a ověřování podpisů. ENR může být také naplněn libovolnými daty uspořádanými jako páry klíč-hodnota. Tyto páry klíč-hodnota obsahují IP adresu uzlu a informace o subprotokolech, které je uzel schopen používat. Klienti konsensu používají [specifickou strukturu ENR](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) k identifikaci zaváděcích uzlů (boot nodes) a také zahrnují pole `eth2`, které obsahuje informace o aktuálním forku Etherea a podsíti pro šíření atestací (attestation gossip subnet) (to připojuje uzel ke konkrétní sadě peerů, jejichž atestace se agregují dohromady).

## Další čtení {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)