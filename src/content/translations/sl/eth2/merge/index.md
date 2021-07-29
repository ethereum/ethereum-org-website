---
title: Spojitev glavnega omrežja z Eth2
description: Preberite več o spojitvi – ko se bo glavno omrežje Ethereum pridružilo sistemu z dokazom o deležu, ki ga bo usklajevala oddajniška veriga.
lang: sl
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    'Sčasoma se bo glavno omrežje Ethereum "spojilo" s preostalimi nadgradnjami Eth2.',
    'Spojitev bo združila glavno omrežje "Eth1" z oddajniško verigo Eth2 in sistemom razdrobljenih verig.',
    "To bo predstavljalo konec dokaza o delu za Ethereum in popoln prehod na dokaz o deležu.",
    'Spojitev morda poznate kot "faza 1.5", ki se uporablja v tehničnih načrtih.',
  ]
---

<UpgradeStatus date="~2021/22">
    Ta nadgradnja bo sledila uvedbi razdrobljenih verig. Vendar je to trenutek, ko bo <a href="/eth2/vision/">vizija o Eth2</a> povsem uresničena – večja razširljivost, varnost in trajnost, celotno omrežje pa bo podpiralo zastavljanje.
</UpgradeStatus>

## Kaj je spojitev? {#what-is-the-docking}

Pomembno si je zapomniti, da bodo na začetku druge nadgradnje Eth2 uvedene ločeno od [glavnega omrežja](/glossary/#mainnet), torej verige, ki jo uporabljamo danes. Glavno omrežje Ethereum bo še naprej varoval [dokaz o delu](/developers/docs/consensus-mechanisms/pow/), medtem ko bodo [oddajniška veriga](/eth2/beacon-chain/) in njene [razdrobljene verige](/eth2/shard-chains/) vzporedno delovale z uporabo [dokaza o deležu](/developers/docs/consensus-mechanisms/pos/). Ob spojitvi bosta ta dva sistema združena.

Predstavljajte si, da je Ethereum vesoljska ladja, ki še ni povsem pripravljena na medzvezdno potovanje. Z oddajniško verigo in razdrobljenimi verigami je skupnost zgradila nov motor in ojačan trup. Ko bo prišel čas, se bo trenutna ladja spojila s tem novim sistemom, tako da lahko postaneta ena ladja, pripravljena, da prepotuje nekaj precejšnjih svetlobnih let in zavzame vesolje.

## Spojitev glavnega omrežja {#docking-mainnet}

Ko bo vse pripravljeno, se bo glavno omrežje Ethereum »spojilo« z oddajniško verigo in postalo lasten drobec, ki namesto [dokaza o delu](/developers/docs/consensus-mechanisms/pow/) uporablja dokaz o deležu.

Glavno omrežje bo zagotavljalo možnost izvajanja pametnih pogodb v sistemu z dokazom o deležu ter tudi celotno zgodovino in trenutno stanje Ethereuma, kar bo zagotovilo brezhiben prehod za vse imetnike in uporabnike ETH.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Po spojitvi {#after-the-docking}

To bo predstavljalo konec dokaza o deležu za Ethereum in začetek obdobja bolj trajnostnega, okolju prijaznega Ethereuma. Na tej točki bo imel Ethereum obseg, varnost in trajnost, opisane v [viziji za Eth2](/eth2/vision/).

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Nadgradnje Eth2 so vse delno medsebojno povezane. Povzemimo torej, kako spojitev vpliva na druge nadgradnje.

### Spojitev in oddajniška veriga {#docking-and-beacon-chain}

Ko pride do spojitve, bo zastavljavcem dodeljeno potrjevanje glavnega omrežja Ethereum. Povsem enako kot pri razdeljenih verigah. [Rudarjenje](/developers/docs/consensus-mechanisms/pow/mining/) ne bo več potrebno, tako da bodo rudarji verjetno vložili svoje zaslužke v zastavljanje v novem sistemu z dokazom o deležu.<ButtonLink to="/eth2/beacon-chain/">Oddajniška veriga</ButtonLink>

### Spojitev in razdrobljene verige {#docking-and-shard-chains}

Ker bo glavno omrežje postalo drobec, je uspešna izvedba razdrobljenih verig ključna za to nadgradnjo. Prehod bo verjetno igral pomembno vlogo za lažje odločanje skupnosti glede uvedbe druge nadgradnje razdrobljenih verig. S to nadgradnjo bodo drugi drobci videti kot glavno omrežje: lahko bodo obdelovali transakcije in pametne pogodbe, ne pa samo zagotavljali podatke.<ButtonLink to="/eth2/shard-chains/">Razdrobljene verige</ButtonLink>
