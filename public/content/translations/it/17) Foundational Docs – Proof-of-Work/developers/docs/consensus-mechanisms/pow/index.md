---
title: Proof of Work (PoW)
description: Spiegazione del consenso con il protocollo Proof of Work e il suo ruolo in Ethereum.
lang: it
---

La rete Ethereum venne avviata usando un meccanismo di consenso che utilizzava il **[Proof of Work (PoW)](/developers/docs/consensus-mechanisms/pow)** che consentiva ai nodi della rete Ethereum di concordare sullo stato di tutte le informazioni registrate sulla blockchain Ethereum e impediva alcuni tipi di attacchi economici. Tuttavia, Ethereum ha disattivato il Proof of Work nel 2022 e ha iniziato, invece, a usare il [Proof of Stake](/developers/docs/consensus-mechanisms/pos).

<InfoBanner emoji=":wave:">
    Il Proof of Work è diventato ormai obsoleto. Ethereum non usa più il Proof of Work come parte del suo meccanismo di consenso, e usa invece il Proof of Stake. Leggi di più sul <a href="/developers/docs/consensus-mechanisms/pos/">Proof of Stake</a> e sullo <a href="/staking/">staking</a>.
</InfoBanner>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere il materiale relativo alle [transazioni](/developers/docs/transactions/), [ai blocchi](/developers/docs/blocks/), e [ai meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la Proof of Work (PoW)? {#what-is-pow}

Il consenso di Nakamoto, che utilizza il proof-of-work, è il meccanismo che un tempo consentiva alla rete decentralizzata di Ethereum di raggiungere il consenso (ossia, l'accordo di tutti i nodi) su aspetti come i saldi dei conti e l'ordine delle transazioni. Questo impediva che gli utenti spendessero due volte le loro monete e assicurava che la catena Ethereum fosse estremamente difficile da attaccare o manipolare. Ora, invece, queste proprietà di sicurezza provengono dal proof-of-stake, usando il meccanismo di consenso noto come [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Proof of Work e mining {#pow-and-mining}

Il Proof of Work è l'algoritmo sottostante che imposta la difficoltà e le regole per il lavoro che i miner devono svolgere su blockchain di Proof of Work. Il mining è il "lavoro" da svolgere. Si tratta dell'atto di aggiungere blocchi validi alla catena. Questo è importante perché la lunghezza della catena aiuta le rete a seguire la corretta diramazione della blockchain. Più "lavoro" viene svolto, più è lunga la catena e maggiore è il numero di blocchi, e più la rete può essere certa dello stato attuale delle cose.

[Maggiori informazioni sul mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Come funzionava il Proof of Work di Ethereum? {#how-it-works}

Le transazioni di Ethereum vengono elaborate in blocchi. Nell'Ethereum Proof of Work ora obsoleto, ogni blocco conteneva:

- difficoltà del blocco, ad esempio: 3.324.092.183.262.715
- un mixHash, ad esempio: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce, ad esempio: `0xd3ee432b4fb3d26b`

Questi dati del blocco erano correlati direttamente alla al Proof of Work

### Il lavoro nel Proof of Work {#the-work}

Il protocollo di Proof of Work, detto Ethash, richiedeva che i miner competessero tramite processi di tentativo ed errore per trovare il nonce di un blocco. Solo i blocchi con un nonce valido potevano essere aggiunti alla catena.

Quando competeva per creare un blocco, un miner inseriva ripetutamente un set di dati, che si poteva ottenere solo tramite il download e l'esecuzione dell'intera catena (che è quello che fa il miner), attraverso una funzione matematica. Il set di dati veniva utilizzato per generare un mixHash al di sotto di un target dettato dalla difficoltà del blocco. Il miglior modo per farlo era tramite un processo di ripetuti tentativi ed errori.

La difficoltà determinava il target per l'hash. Più basso era il target, più piccolo era il set di hash validi. Una volta generato, era incredibilmente facile per gli altri miner e client verificarne la bontà. Anche se una transazione fosse cambiata, l'hash sarebbe stato completamente diverso, segnalando una potenziale frode.

L'hashing rende le frodi facili da individuare. Ma il processo del Proof of Work era anche un grande deterrente contro gli attacchi alla catena.

### Proof of Work e sicurezza {#security}

I miner erano incentivati a fare questo lavoro sulla catena principale di Ethereum. L'incentivo a iniziare una catena propria era molto ridotto per i miner, perché avrebbe compromesso il sistema. Le blockchain fanno affidamento sul fatto di avere un solo stato di riferimento, che è considerato l'unica fonte di verità.

L'obiettivo del Proof of Work era di estendere la catena. La catena più lunga era quella più credibile in termini di validità, perché era quella che racchiudeva in sé la maggior parte del lavoro computazionale eseguito. Nel sistema PoW di Ethereum era praticamente impossibile creare nuovi blocchi che cancellassero transazioni o che ne creassero di false, o mantenere una seconda catena. Questo perché un miner malevolo avrebbe dovuto sempre risolvere il nonce del blocco più velocemente di chiunque altro.

Per creare costantemente blocchi malevoli ma validi, un miner malevolo avrebbe dovuto avere più del 51% della potenza di mining della rete, per poter battere tutti gli altri. Tale quantità di "lavoro" richiede un grande quantità di costosa potenza di calcolo e l'energia consumata avrebbe potuto persino superare i guadagni derivanti dall'attacco.

### L'economia della Proof of Work {#economics}

Il Proof of Work era anche responsabile del rilascio di nuova valuta nel sistema e dell'incentivazione dei miner a fare il proprio lavoro.

Dall'[aggiornamento di Costantinopoli](/history/#constantinople), i miner che creavano correttamente un blocco erano ricompensati con due ETH appena coniati e parte delle commissioni di transazione. Anche i blocchi ommer erano ricompensati con 1,75 ETH. I blocchi ommer erano blocchi validi, creati da un miner praticamente contestualmente alla creazione del blocco canonico da parte di un altro miner, determinati in ultima analisi dalla catena su cui la creazione era avvenuta prima. I blocchi ommer si verificavano in genere a causa della latenza della rete.

## Finalità {#finality}

Una transazione ha una "finalità" su Ethereum quando fa parte di un blocco che non può cambiare.

Dato che i miner lavoravano in modo decentralizzato, era possibile che avvenisse il mining di due blocchi validi nello stesso momento. In questo caso, si crea una diramazione temporanea. Alla fine veniva accettata una sola catena (quella più lunga), creata quando venivano eseguiti il mining e l'aggiunta di blocchi successivi.

Per complicare ulteriormente le cose, le transazioni che erano state rifiutate sulla diramazione temporanea potevano non essere state aggiunte alla catena accettata. Questo significa che la catena poteva essere annullata. Quindi la finalità si riferisce al tempo per cui era necessario attendere prima di considerare una transazione irreversibile. Con il precedente Ethereum di Proof of Work, più blocchi erano minati su uno specifico blocco `N`, maggiore sarebbe stata la certezza che le transazioni in `N` riuscissero e non fossero annullate. Ora, con il Proof of Stake, la finalizzazione è una proprietà esplicita, piuttosto che probabilistica, di un blocco.

## Consumo energetico del Proof of Work {#energy}

Una delle principali critiche mosse al Proof of Work riguarda la quantità di energia necessaria per mantenere la rete sicura. Per mantenere la sicurezza e la decentralizzazione, Ethereum sul Proof of Work consumava elevate quantità di energia. Poco prima di passare al Proof of Stake, i miner di Ethereum consumavano collettivamente circa 70 TWh/anno (quasi quanto la Repubblica ceca, secondo [digiconomist](https://digiconomist.net/), il 18 luglio 2022).

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                                          | Contro                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Il Proof of Work è neutrale. Non servono ETH per iniziare e le ricompense per i blocchi consentono di passare da 0 ETH a un saldo positivo. Con il [ Proof of Stake](/developers/docs/consensus-mechanisms/pos/) occorrono ETH per iniziare. | Il Proof of Work utilizza così tanta energia da risultare dannoso per l'ambiente.                                                                                                                        |
| Il PoW è un meccanismo di consenso testato e ben collaudato che mantiene Bitcoin ed Ethereum sicure e decentralizzate da molti anni.                                                                                                         | Chi desidera occuparsi di mining deve avere apparecchiature specializzate, con un conseguente notevole investimento iniziale.                                                                            |
| Rispetto alla Proof of Stake è relativamente facile da implementare.                                                                                                                                                                         | A causa della crescente richiesta di potenza di calcolo, alcuni i gruppi di mining potrebbero potenzialmente dominare l'attività di mining, portando così alla centralizzazione e a rischi di sicurezza. |

## Confronto con il Proof of Stake {#compared-to-pos}

Ad alto livello, il Proof of Stake ha lo stesso obiettivo del Proof of Work: permettere a una rete decentralizzata di raggiungere il consenso in totale sicurezza. Ma ci sono alcune differenze nei processi e nel personale:

- Il PoS scambia l'importanza della potenza di calcolo con gli ETH in staking.
- Il PoS sostituisce i miner con i validatori. I validatori fanno staking con i loro ETH per avere la possibilità di creare nuovi blocchi.
- I validatori non competono per creare blocchi, sono invece scelti casualmente da un algoritmo.
- La finalità è più chiara: in alcuni checkpoint, se i 2/3 dei validatori concordano sullo stato del blocco, questo è considerato definitivo. I validatori devono scommettere il loro intero stake su questo, per cui se dovessero provare a cospirare in seguito, perderebbero il loro intero stake.

[Maggiori informazioni sul Proof of Stake](/developers/docs/consensus-mechanisms/pos/)

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Letture consigliate {#further-reading}

- [Majority attack](https://en.bitcoin.it/wiki/Majority_attack)
- [On settlement finality](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Video {#videos}

- [Una spiegazione tecnica dei protocolli proof-of-work](https://youtu.be/9V1bipPkCTU)

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof of Stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof of Authority](/developers/docs/consensus-mechanisms/poa/)
