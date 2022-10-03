---
title: Rețeaua Beacon
description: Informații despre rețeaua Beacon - primul upgrade major Eth2 la Ethereum.
lang: ro
template: upgrade
image: ../../../../assets/upgrades/core.png
summaryPoint1: Rețeaua Beacon nu schimbă Ethereum-ul pe care îl folosim astăzi.
summaryPoint2: Va coordona rețeaua.
summaryPoint3: Introduce Dovada Mizei (proof-of-stake) în ecosistemul Ethereum.
summaryPoint4: S-ar putea să-l cunoști sub numele de „Faza 0” pe foile de parcurs tehnice.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    Rețeaua Beacon a fost lansată pe 1 decembrie 2020 la prânz, UTC. Pentru informații suplimentare, <a href="https://beaconscan.com/">explorează datele</a>. Dacă vrei să ajuți la validarea lanțului, poți <a href="/staking/">să mizezi ETH</a>.
</UpgradeStatus>

## Ce face Lanțul Beacon? {#what-does-the-beacon-chain-do}

Lanțul Beacon va conduce sau va coordona rețeaua extinsă de [fragmente](/upgrades/sharding/) și [stakeri](/staking/). Dar nu va fi ca [Rețeaua principală Ethereum](/glossary/#mainnet) de astăzi. Nu poate gestiona conturi sau contracte inteligente.

Rolul rețelei Beacon se va schimba în timp, dar este o componentă fundamentală pentru [Ethereum-ul sigur, durabil și scalabil la care lucrăm](/upgrades/vision/).

## Caracteristicile Lanțului Beacon {#beacon-chain-features}

### Prezentarea mizării {#introducing-staking}

Rețeaua Beacon va introduce [Dovada de Minare](/developers/docs/consensus-mechanisms/pos/) în Ethereum. Aceasta este o nouă modalitate prin care tu să cpntribui la menținerea siguranței Ethereum. Gândește-te la acest lucru ca la un bun public care va face Ethereum mai sănătos și, în același timp, te va face să câștigi mai mult ETH. În practică, te va implica în minarea de ETH pentru a activa software-ul de validare. În calitate de validator, vei procesa tranzacțiile și vei crea noi blocuri în lanț.

Mizarea și transformarea în validator este mai ușoară decât [minatul](/developers/docs/mining/) (modul în care rețeaua este securizată în prezent). Și sperăm că acest lucru va ajuta Ethereum să fie mai sigur pe termen lung. Cu cât vor participa mai mulți oameni la rețeaua Ethereum, cu atât va deveni mai descentralizată și mai ferită de atacuri.

<InfoBanner emoji=":money_bag:">
Dacă dorești să devii validator și să ajuți la securizarea rețelei Beacon, <a href="/staking/">află mai multe despre mizare</a>.
</InfoBanner>

Aceasta este o altă schimbare importantă pentru următorul upgrade Eth2: [lanțurile de fragmente](/upgrades/sharding/).

### Configurarea lanțurilor de fragmente {#setting-up-for-shard-chains}

După ce Rețeaua principală se va uni cu rețeaua Beacon, următoarea actualizare va introduce lanțurile de fragmente în rețeaua care folosește dovada de minare(proof-of-stake). Aceste „fragmente” vor crește capacitatea rețelei și vor îmbunătăți viteza tranzacțiilor extinzând rețeaua la 64 de blockchain-uri. Rețeaua Beacon este primul pas important în introducerea lanțurilor de fragmente, deoarece acestea necesită mizarea pentru a funcționa în siguranță.

În cele din urmă, rețeaua Beacon va fi, de asemenea, responsabil pentru atribuirea aleatorie a stakerilor pentru validarea lanțurilor de fragmente. Acest lucru este esențial pentru a îngreuna realizarea înțelegerilor între stakeri și preluarea controlului unui fragment. Ei bine, acest lucru înseamnă că au [mai puțin de o șansă la un trilion](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relația dintre upgrade-uri {#relationship-between-upgrades}

Toate upgrade-urile Eth2 sunt oarecum interdependente. Deci, să recapitulăm modul în care lanțul Beacon afectează celelalte upgrade-uri.

### Rețeaua principală și Rețeaua Beacon {#mainnet-and-beacon-chain}

La început, Rețeaua Beacon va exista separat de Rețeaua principală Ethereum care este folosită în prezent. Dar în cele din urmă vor fi conectate. Planul este de a „uni” Rețeaua principală în sistemul bazat pe Dovada de Minare(proof-of-stake) care este controlat și coordonat de rețeaua Beacon.

<ButtonLink to="/upgrades/merge/">Unirea</ButtonLink>

### Fragmentele și lanțul Beacon {#shards-and-beacon-chain}

Lanțurile de fragmente nu pot intra în siguranță în ecosistemul Ethereum decât cu un mecanism de consens bazat pe Dovada de Minare(proof-of-stake). Rețeaua Beacon va introduce mizarea, pregătind astfel terenul pentru ca actualizarea lanțului de fragmente să aibă loc.

<ButtonLink to="/upgrades/sharding/">Lanțuri de fragmente</ButtonLink>

<Divider />

## Interacțiunea cu lanțul Beacon {#interact-with-beacon-chain}

<BeaconChainActions />
