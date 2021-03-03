---
title: Lanțul Beacon
description: Informații despre lanțul Beacon - primul upgrade major Eth2 la Ethereum.
lang: ro
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "Lanțul Beacon nu schimbă Ethereum-ul pe care îl folosim astăzi.",
    "Va coordona rețeaua.",
    "Introduce Dovada Mizei în ecosistemul Ethereum.",
    'S-ar putea să cunoști aceasta ca "Faza 0" pe foile de parcurs tehnice.',
  ]
---

<UpgradeStatus isShipped date="Shipped!">
    Lanțul Beacon a fost lansat pe 1 decembrie la prânz, UTC. Pentru informații suplimentare, <a href="https://beaconscan.com/">explorează datele</a>. Dacă vrei să ajuți la validarea lanțului, poți <a href="/eth2/staking/">să mizezi ETH</a>.
</UpgradeStatus>

## Ce face Lanțul Beacon? {#what-does-the-beacon-chain-do}

Lanțul Beacon va conduce sau va coordona rețeaua extinsă de [fragmente](/eth2/shard-chains/) și [stakeri](/eth2/staking/). Dar nu va fi ca [rețeaua principală Ethereum](/glossary/#mainnet) de astăzi. Nu poate gestiona conturi sau contracte inteligente.

Rolul Lanțului Beacon se va schimba în timp, dar este o componentă fundamentală pentru [Ethereum-ul sigur, durabil și scalabil la care lucrăm](/eth2/vision/).

## Caracteristicile Lanțului Beacon {#beacon-chain-features}

### Prezentarea mizării {#introducing-staking}

Lanțul Beacon va introduce [Dovada Mizei](/developers/docs/consensus-mechanisms/pos/) în Ethereum. Aceasta este o nouă modalitate prin care tu să cpntribui la menținerea siguranței Ethereum. Gândește-te la acest lucru ca la un bun public care va face Ethereum mai sănătos și, în același timp, te va face să câștigi mai mult ETH. În practică, te va implica în mizarea de ETH pentru a activa software-ul de validare. În calitate de validator, vei procesa tranzacțiile și vei crea noi blocuri în lanț.

Mizarea și transformarea în validator este mai ușoară decât [mineritul](/developers/docs/mining/) (modul în care rețeaua este securizată în prezent). Și sperăm că acest lucru va ajuta Ethereum să fie mai sigur pe termen lung. Cu cât vor participa mai mulți oameni la rețeaua Ethereum, cu atât va deveni mai descentralizată și mai ferită de atacuri.

<InfoBanner emoji=":money_bag:">
Dacă dorești să devii validator și să ajuți la securizarea Lanțului Beacon, <a href="/eth2/staking/">află mai multe despre mizare</a>.
</InfoBanner>

Aceasta este, de asemenea, o schimbare importantă pentru al doilea upgrade Eth2: [lanțurile de fragmente](/eth2/shard-chains/).

### Configurarea lanțurilor de fragmente {#setting-up-for-shard-chains}

Lanțurile de fragmente (shard) vor fi al doilea upgrade Eth2. Vor crește capacitatea rețelei și vor îmbunătăți viteza tranzacției extinzând rețeaua la 64 de blockchain-uri. Lanțul Beacon este primul pas important în introducerea lanțurilor de fragmente, deoarece acestea necesită mizarea pentru a funcționa în siguranță.

În cele din urmă, lanțul Beacon va fi, de asemenea, responsabil pentru atribuirea aleatorie a stakerilor pentru validarea lanțurilor de fragmente. Acest lucru este esențial pentru a îngreuna realizarea înțelegerilor între stakerilor și preluarea controlului unui fragment. Ei bine, acest lucru înseamnă că au [mai puțin de o șansă la un trilion](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relația dintre upgrade-uri {#relationship-between-upgrades}

Toate upgrade-urile Eth2 sunt oarecum interdependente. Deci, să recapitulăm modul în care lanțul Beacon afectează celelalte upgrade-uri.

### Fragmentele și lanțul Beacon {#shards-and-beacon-chain}

Lanțurile de fragmente nu pot intra în siguranță în ecosistemul Ethereum, decât cu un mecanism de consens în vigoare, Dovada Mizei (PoS). Lanțul Beacon va introduce mizarea, pregătind astfel terenul pentru ca upgrade-ul lanțului de fragmente să urmeze.<ButtonLink to="/eth2/shard-chains/">Lanțuri de fragmente</ButtonLink>

### Rețeaua principală și lanțul Beacon {#mainnet-and-beacon-chain}

La început, lanțul Beacon va exista separat de rețeaua principală Ethereum care este folosită astăzi. Dar în cele din urmă vor fi conectate. Planul este de a „andoca” rețeaua principală în sistemul de dovadă a mizei (PoS) controlat și coordonat de lanțul Beacon.<ButtonLink to="/eth2/docking/">Planul este de a „andoca” rețeaua principală în sistemul de dovadă a mizei (PoS) controlat și coordonat de lanțul Beacon.</ButtonLink>

<Divider />

## Interacțiunea cu lanțul Beacon {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
