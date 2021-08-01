---
title: Andocarea rețelei principale cu Eth2
description: Informații despre andocare - când rețeaua principală Ethereum se va alătura sistemului Dovada Mizei (PoS) coordonat de lanțul Beacon.
lang: ro
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    'Eventual, actuala rețea principală Ethereum va "andoca" cu restul de upgrade Eth2.',
    'Andocarea va îmbina rețeaua principală "Eth1" cu Lanțul Beacon Eth2 și cu sistemul de fragmente.',
    "Aceasta va marca sfârșitul Dovezii Muncii (PoW) pentru Ethereum și tranziția completă la Dovada Mizei (PoS).",
    'S-ar putea să găsești acest lucru ca "Faza 1.5" pe foile de parcurs tehnice.',
  ]
---

<UpgradeStatus date="~2021/22">
    Acest upgrade va urma după sosirea lanțurilor de fragmente. Dar este momentul în care <a href="/eth2/vision/">viziunea Eth2</a> devine pe deplin realizată – mai multă scalabilitate, securitate și durabilitate, cu mizarea care susține întreaga rețea.
</UpgradeStatus>

## Ce este andocarea? {#what-is-the-docking}

Este important să ne amintim că inițial, celelalte upgrade-uri ale Eth2 sunt livrate separat de [rețeaua principală](/glossary/#mainnet) - lanțul pe care îl folosim astăzi. Rețeaua principală Ethereum va continua să fie securizată prin [Dovada Muncii (PoW)](/developers/docs/consensus-mechanisms/pow/), chiar dacă [lanțul Beacon](/eth2/beacon-chain/) și [lanțurile sale de fragmente](/eth2/shard-chains/) rulează în paralel folosind [Dovada Mizei (PoS)](/developers/docs/consensus-mechanisms/pos/). Andocarea se va face atunci când aceste două sisteme vor fuziona.

Imaginează-ți că Ethereum este o navă spațială care nu este chiar pregătită pentru o călătorie interstelară. Cu lanțul Beacon și lanțurile de fragmente, comunitatea a construit un nou motor și o carenă întărită. Când va veni timpul, nava actuală va andoca împreună cu acest nou sistem, astfel încât să poată deveni o singură navă, gata să călătorească câțiva ani lumină buni și să cucerească întreg universul.

## Andocarea rețelei principale {#docking-mainnet}

Când va fi gata, rețeaua principală Ethereum va „andoca” cu lanțul Beacon, devenind propriul său fragment care folosește Dovada Mizei (PoS) în loc de [Dovada Muncii (PoW)](/developers/docs/consensus-mechanisms/pow/).

Rețeaua principală va aduce posibilitatea de a rula contracte inteligente în sistemul de Dovadă a Mizei (PoS), plus istoricul complet și starea actuală a Ethereum, pentru a asigura tranziția lină pentru toți deținătorii și utilizatorii de ETH.

<!-- ### Improving Mainnet

Before Mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## După andocare {#after-the-docking}

Aceasta va însemna sfârșitul Dovezii Muncii (PoW) pentru Ethereum și va începe era unui Ethereum mai durabil și mai ecologic. La momentul respectiv, Ethereum va avea scara, securitatea și sustenabilitatea descrise în [viziunea Eth2](/eth2/vision/).

## Relația dintre upgrade-uri {#relationship-between-upgrades}

Upgrade-urile Eth2 sunt oarecum interdependente. Să recapitulăm cum se corelează andocarea cu celelalte upgrade-uri.

### Andocarea și lanțul Beacon {#docking-and-beacon-chain}

După realizarea andocării, stakerii vor fi desemnați să valideze rețeaua principală Ethereum. La fel ca în cazul lanțurilor de fragmente. [Mineritul](/developers/docs/consensus-mechanisms/pow/mining/) nu va mai fi necesar, astfel încât minerii își vor investi probabil câștigurile în mizarea în noul sistem de Dovadă a Mizei (PoS).<ButtonLink to="/eth2/beacon-chain/">Lanțul Beacon</ButtonLink>

### Andocarea și lanțurile de fragmente {#docking-and-shard-chains}

Având în vedere că rețeaua principală va deveni un fragment, implementarea cu succes a lanțurilor de fragmente este esențială pentru acest upgrade. Probabil că tranziția va juca un rol important în a ajuta comunitatea să decidă dacă va lansa un al doilea upgrade la fragmentare (sharding). Acest upgrade va face celelalte fragmente un fel de rețea principală: vor putea să gestioneze tranzacții și contracte inteligente nu doar să furnizeze mai multe date.<ButtonLink to="/eth2/shard-chains/">Lanțuri de fragmente</ButtonLink>
