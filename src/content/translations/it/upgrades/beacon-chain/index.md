---
title: La Beacon Chain
description: Informati rigurado alla Beacon Chain - l'aggiornamento che ha introdotto la prova-di-interesse Ethereum.
lang: it
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: La Beacon Chain ha introdotto il proof-of-stake nell'ecosistema Ethereum.
summaryPoint2: È stata fusa con la catena di proof-of-work originale di Ethereum nel settembre 2022.
summaryPoint3: La Beacon Chain ha introdotto la logica del consenso e il protocollo di gossip del blocco, che ora protegge Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
  La Beacon Chain è stata attivata l'1 dicembre 2020 e ha formalizzato il proof-of-stake come il meccanismo di consenso di Ethereum con l'aggiornamento della Fusione il 15 settembre 2022.
</UpgradeStatus>

## Cos'era la Beacon Chain? {#what-is-the-beacon-chain}

La Beacon Chain era il nome della blockchain di Proof of stake originale, lanciata nel 2020. Fu creata per assicurare che la logica di consenso di Proof of stake fosse stabile e sostenibile prima di abilitarla sulla Rete principale di Ethereum. Di conseguenza, era eseguita insieme all'Ethereum Proof of Work originale. La disattivazione del Proof of Work e l'attivazione del Proof of stake su Ethereum ha richiesto di istruire la Beacon Chain ad accettare le transazioni dalla catena Ethereum originale, a raggrupparle in blocchi e organizzarle in una blockchain usando il meccanismo di consenso basato sul Proof of stake. Allo stesso momento, i client originali di Ethereum hanno disattivato il proprio mining, la propagazione dei blocchi e la logica di consenso, passando tutti questi aspetti alla Beacon Chain. Questo evento è noto come [La Fusione](/upgrades/merge/). Una volta verificatasi La Fusione, non esistevano più due blockchain; era stata creata un'unica catena Proof of stake di di Ethereum.

## Cosa faceva la Beacon Chain? {#what-does-the-beacon-chain-do}

La Beacon Chain era il nome dato a un registro di conti che conduceva e coordinava la rete di [staker](/staking/) di Ethereum, prima che questi iniziassero a convalidare transazioni reali di Ethereum. Non elaborava le transazioni, né gestiva le interazioni del contratto intelligente.

Ha introdotto il motore di consenso (o "livello di consenso") che ha preso il posto del mining di Proof of Work su Ethereum, apportando con esso molti miglioramenti significativi.

La Beacon Chain è stata un componente fondamentale per [l'Ethereum sicura, ecosostenibile e scalabile che conosciamo ora](/roadmap/vision/).

## Impatto della Beacon Chain {#beacon-chain-features}

### Introduzione allo staking {#introducing-staking}

La Beacon Chain ha introdotto la [Proof of stake](/developers/docs/consensus-mechanisms/pos/) in Ethereum. Questo mantiene sicura Ethereum e consente ai validatori di guadagnare più ETH nel processo. In pratica, lo staking prevede di puntare ETH per poter attivare il software del validatore. Come staker, esegui il software che crea e convalida i nuovi blocchi nella catena.

Lo staking serve a uno scopo simile a quello del [mining](/developers/docs/mining/), ma è differente in molti modi. Il mining richiedeva ingenti spese iniziali sotto forma di hardware potente e consumi energetici, risultando in economie di scala e promuovendo la centralizzazione. Il mining, inoltre, non prevedeva alcun requisito di bloccare le risorse come garanzie, limitando la capacità del protocollo di punire gli utenti malevoli dopo un attacco.

La transizione al Proof of stake ha reso Ethereum significativamente più sicura e decentralizzata rispetto al Proof of Work. Più persone parteciperanno alla rete, più questa diventerà decentralizzata e protetta dagli attacchi.

<InfoBanner emoji=":money_bag:">
  Se sei interessato a diventare un validatore e contribuire a proteggere Ethereum, <a href="/staking/">scopri di più sullo staking</a>.
</InfoBanner>

### Prepararsi allo sharding {#setting-up-for-sharding}

Da quando la Beacon Chain si è fusa con la Rete principale originale di Ethereum, la community di Ethereum ha iniziato a cercare di ridimensionare la rete.

La Proof of stake ha il vantaggio di avere un registro di tutti i produttori di blocchi approvati in ogni momento, ognuno con ETH in staking. Questo registro getta le basi per la capacità di dividere e conquistare, ma ripartisce in modo affidabile le specifiche responsabilità della rete.

Questa responsabilità è in contrasto con il Poof of Work, in cui i miner non hanno obblighi verso la rete e potrebbero interrompere il mining e disattivare permanentemente il loro software del nodo in un istante, senza ripercussioni. Inoltre, non esiste alcun registro di propositori di blocchi noti e nessun modo affidabile per ripartire le responsabilità della rete in modo sicuro.

[Scopri di più sullo sharding](/upgrades/sharding/)

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo interconnessi. Quindi ricapitoliamo per vedere come la beacon chain incide sugli altri aggiornamenti.

### Beacon Chain e La Fusione {#merge-and-beacon-chain}

Inizialmente la Beacon Chain esisteva separatamente dalla Rete principale di Ethereum, ma le due sono state fuse nel 2022.

<ButtonLink to="/upgrades/merge/">
  La fusione
</ButtonLink>

### Shard chain e beacon chain {#shards-and-beacon-chain}

Lo sharding potrà entrare in modo sicuro nell'ecosistema Ethereum solo quando sarà presente un meccanismo di consenso Proof of stake. La Beacon Chain ha introdotto lo staking, che si è 'fuso' con la Rete principale, spianando la strada allo sharding per contribuire a ridimensionare ulteriormente Ethereum.

<ButtonLink to="/upgrades/sharding/">
  Shard chain
</ButtonLink>

## Letture consigliate

- [Maggiori informazioni sugli aggiornamenti futuri di Ethereum](/roadmap/vision)
- [Maggiori informazioni sul proof-of-stake](/developers/docs/consensus-mechanisms/pos)
