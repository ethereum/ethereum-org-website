---
title: Proof-of-stake (PoS)
description: Spiegazione del protocollo di consenso Proof-of-stake e del suo ruolo in Ethereum.
lang: it
sidebar: true
incomplete: true
---

Ethereum sta passando dal [Proof of Work (PoW)](/developers/docs/consensus-mechanisms/pow/) a un meccanismo di consenso detto Proof-of-stake (PoS). Questa transizione è sempre stata nei piani perché scalare Ethereum [attraverso gli aggiornamenti Eth2](/eth2/) è uno dei punti chiave della strategia della community. Tuttavia, arrivare alla PoS è un'ardua sfida tecnica e non è semplice come utilizzare la PoW per ottenere consenso in tutta la rete.

## Prerequisiti {#prerequisites}

Per capire meglio questa pagina ti consigliamo di leggere i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la proof-of-stake (PoS)? {#what-is-pos}

La proof of stake è un tipo di [meccanismo di consenso](/developers/docs/consensus-mechanisms/) usato dalle reti di tipo blockchain per ottenere il consenso distribuito.

Richiede che gli utenti facciano staking con i loro ETH per diventare validatori nella rete. I validatori hanno lo stesso compito dei miner nella [Proof of Work](/developers/docs/consensus-mechanisms/pow/): ordinare transazioni e creare nuovi blocchi così che tutti i nodi possano concordare sullo stato della rete.

La proof-of-stake porta con sé una serie di miglioramenti rispetto al sistema Proof of Work:

- migliore efficienza energetica: non occorre molta energia per il mining dei blocchi
- minori barriere all'ingresso, requisiti hardware ridotti: non serve hardware d'èlite per avere la possibilità di creare nuovi blocchi
- maggiore immunità alla centralizzazione: la proof-of-stake dovrebbe portare un maggior numero di nodi alla rete
- miglior supporto delle shard chain: un upgrade chiave per scalare la rete Ethereum

## Proof-of-stake, staking e validatori {#pos-staking-validators}

La Proof-of-stake è il meccanismo che attiva i validatori, una volta ricevuto abbastanza stake. Per Ethereum, gli utenti dovranno fare staking con 32 ETH per diventare validatori. I validatori sono scelti a caso per creare blocchi e sono responsabili del controllo e della conferma dei blocchi che non creano. Lo stake di un utente è usato anche per incentivare un comportamento corretto da parte del validatore. Ad esempio, un utente può perdere una parte del suo stake, ad esempio se va offline (mancata validazione) oppure può perdere l'intero stake in caso di collusione intenzionata.

## Come funziona la Proof-of-stake di Ethereum? {#how-does-pos-work}

A differenza della Proof of Work, i validatori non hanno bisogno di molta potenza di calcolo, perché sono scelti a caso e non competono tra loro. Non devono fare il mining dei blocchi, ma solo creare nuovi blocchi quando vengono scelti e convalidare i blocchi proposti quando non vengono scelti. Questa convalida è detta attestazione. L'attestazione è come dire: "Questo blocco per me va bene". I validatori ottengono ricompense quando propongono nuovi blocchi e attestano quelli che hanno visto.

Se attesti un blocco dannoso, perdi il tuo stake.

### La beacon chain {#the-beacon-chain}

Dal momento in cui Ethereum sostituirà la Proof of Work con la proof-of-stake, verrà aggiunta la complessità delle [shard chain](/eth2/shard-chains/). Si tratta di blockchain separate, in cui i validatori dovranno elaborare transazioni e creare nuovi blocchi. Si prevede di avere 64 shard chain e tutte dovranno avere una comprensione condivisa dello stato della rete. Sarà quindi necessario un coordinamento extra, che verrà effettuato dalla e [the beacon chain](/eth2/beacon-chain/).

La beacon chain riceve informazioni sullo stato dagli shard e le rende disponibili ad altri shard, in modo che la rete possa rimanere sincronizzata. La beacon chain gestirà anche i validatori, dalla registrazione dei depositi di stake fino all'emissione delle ricompense o delle penalità.

Ecco come funziona questo processo.

### Come funziona la convalida {#how-does-validation-work}

Quando invii una transazione su uno shard, un validatore sarà responsabile di aggiungere la tua transazione a un blocco shard. I validatori sono scelti in base a un algoritmo dalla beacon chain per proporre nuovi blocchi.

#### Attestazione {#attestation}

Se un validatore non viene scelto per proporre un nuovo blocco shard, dovrà attestare la proposta di un altro validatore e confermare che tutto sia nella norma. Più che la transazione stessa, quello che viene registrato nella beacon chain è l'attestazione.

Per attestare ogni blocco shard servono almeno 128 validatori. Viene detta "commissione".

La commissione ha un lasso di tempo per proporre e convalidare un blocco shard. Questo lasso di tempo è detto "slot". Per ogni slot viene creato un solo blocco valido. 32 slot formano un'"epoca". Dopo ogni epoca, la commissione viene sciolta e riformata con partecipanti casuali e diversi. Questo aiuta a mantenere gli shard al sicuro da commissioni di attori ostili.

#### Crosslink {#rewards-and-penalties}

Una volta che la proposta di un blocco shard ottiene abbastanza attestazioni, viene creato un "crosslink" che conferma l'inclusione del blocco, e della transazione, nella beacon chain.

Quando è presente il crosslink, il validatore che ha proposto il blocco ottiene la ricompensa.

#### Finalità {#finality}

Nelle reti distribuite, una transazione ha la sua "finalità" quando fa parte di un blocco che non può più cambiare.

Per fare questo nella Proof of Stake, Casper, un protocollo di finalità, fa in modo che i validatori concordino sullo stato di un blocco in determinati checkpoint. Quando 2/3 dei validatori sono concordi, il blocco è finalizzato. I validatori perderebbero tutto il proprio stake nel caso provassero successivamente ad apportare un cambiamento con un attacco del 51%.

Come ha detto Vlad Zamfir, è un po' come se i miner che partecipano a un attacco del 51% vedessero andare in fumo tutto il proprio hardware per il mining.

## Proof-of-stake e sicurezza

La minaccia di un [attacco al 51%](https://www.investopedia.com/terms/1/51-attack.asp) esiste anche con un meccanismo Proof-of-stake, ma chi attacca rischia molto di più. Infatti, dovrebbe controllare il 51% degli ETH messi in staking. Non solo si tratta veramente di tanto denaro, ma probabilmente questo causerebbe un crollo del prezzo di ETH. Non ci sono molti incentivi che spingono a distruggere il valore di una moneta della quale si detiene la maggioranza in staking. Sono invece molti quelli che spingono a mantenere la rete sicura e in salute.

Ci saranno tagli delle somme messe in staking, espulsioni e altre penalità che verranno coordinate dalla beacon chain per impedire altri comportamenti scorretti. I validatori saranno inoltre responsabili di mettere in evidenza questi episodi.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                                                                                                             | Contro                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Lo staking semplifica l'esecuzione di un nodo. Non servono grandi investimenti hardware o di energia. E, nel caso tu non abbia abbastanza ETH da mettere in staking, puoi unirti a un gruppo di staking.                                                                                                        | La Proof-of-stake è ancora agli albori, e quindi è meno testata della Proof of Work |
| Lo staking è più decentralizzato. Permette una maggiore partecipazione e avere più nodi non corrisponde a maggiori ritorni percentuali, come avviene con il mining.                                                                                                                                             |                                                                                     |
| Lo staking permette uno sharding sicuro. Le shard chain consentono a Ethereum di creare più blocchi nello stesso momento, aumentando il volume delle transazioni. In un ambiente Proof of Work, lo sharding semplicemente diminuirebbe la potenza di calcolo necessaria per compromettere una parte della rete. |                                                                                     |

## Letture consigliate {#further-reading}

- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _Ethos.dev_

## Argomenti correlati {#related-topics}

- [Proof of work](/developers/docs/consensus-mechanisms/pow/)
