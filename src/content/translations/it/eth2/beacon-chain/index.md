---
title: La beacon chain
description: Scopri la beacon chain - il primo grande aggiornamento a Eth2 in Ethereum.
lang: it
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "La beacon chain non modifica nulla della rete Ethereum che usiamo oggi.",
    "Coordinerà la rete.",
    "Introduce la proof of stake nell'ecosistema Ethereum.",
    'Potreste averne sentito parlare come "Fase 0" nelle roadmap tecniche.',
  ]
---

<UpgradeStatus isShipped date="Shipped!">
    La beacon chain è stata resa disponibile il primo dicembre a mezzogiorno (UTC). Per saperne di più, <a href="https://beaconscan.com/">esplora i dati</a>. Se vuoi contribuire a convalidare la catena, puoi <a href="/eth2/staking/">fare staking con i tuoi ETH</a>.
</UpgradeStatus>

## Cosa fa la beacon chain? {#what-does-the-beacon-chain-do}

La beacon chain condurrà o coordinerà la rete ampliata di [shard](/eth2/shard-chains/) e [staker](/eth2/staking/). Ma non sarà come la [rete principale Ethereum](/glossary/#mainnet) di oggi. Non è in grado di gestire account o smart contract.

Il ruolo della beacon chain cambierà con il passare del tempo ma è una componente fondamentale per [la sicurezza, sostenibilità e scalabilità di Etherum che stiamo cercando di raggiungere](/eth2/vision/).

## Caratteristiche della beacon chain {#beacon-chain-features}

### Introduzione allo staking {#introducing-staking}

La beacon chain introdurrà la [proof of stake](/developers/docs/consensus-mechanisms/pos/) su Ethereum. È un modo nuovo per contribuire a mantenere Ethereum sicura. Può essere considerata un bene pubblico che renderà Ethereum più sana e allo stesso tempo farà guadagnare più ETH. In pratica, dovrai fare staking con ETH per attivare il software di convalida. Come validatore, elaborerai transazioni e creerai nuovi blocchi nella catena.

Fare staking e diventare validatore è più facile che [fare mining](/developers/docs/mining/) (cioè il metodo attuale di protezione della rete). E si spera che questo aiuti a rendere Ethereum più sicura a lungo termine. Più persone parteciperanno alla rete, più questa sarà decentralizzata e protetta dagli attacchi.

<InfoBanner emoji=":money_bag:">
Se ti interessa diventare validatore e vuoi contribuire a proteggere la beacon chain, <a href="/eth2/staking/">scopri di più sullo staking</a>.
</InfoBanner>

Si tratta inoltre di un importante cambiamento per il secondo aggiornamento a Eth2: [le shard chain](/eth2/shard-chains/).

### Prepararsi alle shard chain {#setting-up-for-shard-chains}

Le shard chain saranno il secondo aggiornamento a Eth2. Miglioreranno la capacità della rete e la velocità delle transazioni, estendendo la rete a 64 blockchain. La beacon chain è un importante primo passo per l'introduzione delle shard chain, perché queste richiedono lo staking per funzionare in modo sicuro.

Alla fine la beacon chain sarà anche responsabile dell'assegnazione casuale degli staker per la convalida delle shard chain. È fondamentale per rendere la vita difficile agli staker che tentano di cospirare per prendere il controllo di uno shard. Più precisamente, significa che avranno [meno di una possibilità su un trilione](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti a Eth2 sono tutti interconnessi in qualche modo. Quindi ricapitoliamo per vedere come la beacon chain incide sugli altri aggiornamenti.

### La rete principale e la beacon chain {#mainnet-and-beacon-chain}

La beacon chain, all'inizio, esisterà separatamente rispetto alla rete principale Ethereum che usiamo oggi. Alle fine però le due realtà verranno collegate. L'intenzione è di "agganciare" (docking) la rete principale al sistema proof of stake che è controllato e coordinato dalla beacon chain.

<ButtonLink to="/eth2/merge/">Il docking</ButtonLink>

### Shard e beacon chain {#shards-and-beacon-chain}

Le shard chain potranno entrare in modo sicuro nell'ecosistema Ethereum solo quando sarà presente un meccanismo di consenso proof of stake. La beacon chain introdurrà lo staking, aprendo la strada per l'aggiornamento alle shard chain.

<ButtonLink to="/eth2/shard-chains/">Le shard chain</ButtonLink>

<Divider />

## Interagire con la beacon chain {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
