---
title: La Beacon Chain
description: Informati rigurado alla Beacon Chain - l'aggiornamento che ha introdotto la prova-di-interesse Ethereum.
lang: it
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/core.png
summaryPoint1: La Beacon Chain non apporta modifiche all'Ethereum che stiamo utilizzando.
summaryPoint2: Coordinerebbe il network, fungendo da livello di consenso.
summaryPoint3: Ha introdotto Proof of Stake nell'ecosistema Ethereum.
summaryPoint4: Potresti conoscere questa come "Fase 0" sulle roadmap tecniche.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    La Beacon Chain è stata resa disponibile il 1° dicembre 2020 a mezzogiorno (UTC). Per saperne di più, <a href="https://beaconscan.com/">esplora i dati</a>. Se vuoi contribuire a convalidare la chain, puoi <a href="/staking/">"puntare" i tuoi ETH</a>.
</UpgradeStatus>

## Cosa fa la beacon chain? {#what-does-the-beacon-chain-do}

La Beacon Chain condurrà o coordinerà la rete ampliata di [shard](/upgrades/sharding/) e [staker](/staking/). Ma non sarà come l'attuale [Rete principale di Ethereum](/glossary/#mainnet). Non è in grado di gestire gli account o gli Smart Contracts.

Il ruolo della beacon chain cambierà con il passare del tempo ma è una componente fondamentale per [la sicurezza, la sostenibilità e la scalabilità di Ethereum che stiamo cercando di raggiungere](/upgrades/vision/).

## Caratteristiche della beacon chain {#beacon-chain-features}

### Introduzione allo staking {#introducing-staking}

La beacon chain introdurrà la [proof of stake](/developers/docs/consensus-mechanisms/pos/) in Ethereum. È un modo innovativo per contribuire a garantire la sicurezza di Ethereum. Può essere considerata un bene pubblico che renderà Ethereum più sana e allo stesso tempo farà guadagnare più ETH. In pratica, occorrerà fare staking con ETH per attivare il software di convalida. Come validatore, elaborerai transazioni e creerai nuovi blocchi nella catena.

Fare staking e diventare validatore è più facile che [fare mining](/developers/docs/mining/) (cioè il metodo attuale di protezione della rete). E si spera che questo aiuti ad aumentare la sicurezza di Ethereum a lungo termine. Più persone parteciperanno alla rete, più questa sarà decentralizzata e protetta dagli attacchi.

<InfoBanner emoji=":money_bag:">
Se sei interessato a diventare un validatore e ad contribuire a proteggere la beacon chain, <a href="/staking/">scopri di più sullo staking</a>.
</InfoBanner>

È anche un importante cambiamento per un altro aggiornamento: [shard chains](/upgrades/sharding/).

### Prepararsi alle shard chain {#setting-up-for-shard-chains}

Dopo la fusione della rete principale con la beacon chain, il prossimo aggiornamento introdurrà le shard chain nella rete proof of stake. Questi "shard" ("frammenti" in italiano) miglioreranno la capacità della rete e la velocità delle transazioni, estendendo la rete a 64 blockchain. La beacon chain è un primo passo importante per l'introduzione delle shard chain, perché queste richiedono lo staking per funzionare in modo sicuro.

Alla fine la beacon chain sarà anche responsabile dell'assegnazione casuale degli staker per la convalida delle shard chain. Ciò è fondamentale per complicare la vita agli staker che tentano di cospirare per prendere il controllo di uno shard. Per essere più precisi, significa che avranno [meno di una possibilità su un trilione](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti Ethereum sono tutti abbastanza interconnessi. Quindi ricapitoliamo per vedere come la beacon chain incide sugli altri aggiornamenti.

### La rete principale e la beacon chain {#mainnet-and-beacon-chain}

In un primo momento la beacon chain godrà di vita separata rispetto all'attuale rete principale di Ethereum. A un certo punto però le due realtà verranno collegate. L'intenzione è quella di "incorporare" la rete principale nel sistema proof of stake controllato e coordinato dalla beacon chain.

<ButtonLink to="/upgrades/merge/">
    La fusione
</ButtonLink>

### Shard chain e beacon chain {#shards-and-beacon-chain}

Le shard chain potranno entrare in modo sicuro nell'ecosistema Ethereum solo quando sarà presente un meccanismo di consenso proof of stake. La beacon chain introdurrà lo staking, aprendo la strada al successivo upgrade basato sulla shard chain.

<ButtonLink to="/upgrades/sharding/">
    Shard chain
</ButtonLink>

<Divider />

## Interagire con la beacon chain {#interact-with-beacon-chain}

<BeaconChainActions />
