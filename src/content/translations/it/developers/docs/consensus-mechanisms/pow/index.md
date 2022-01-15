---
title: Proof-of-work (PoW)
description: Spiegazione del consenso con il protocollo proof-of-work e il suo ruolo in Ethereum.
lang: it
sidebar: true
incomplete: true
---

Ethereum, come Bitcoin, attualmente utilizza un protocollo di consenso detto [proof-of-work (PoW)](https://wikipedia.org/wiki/Proof_of_work) che consente ai nodi della rete Ethereum di concordare sullo stato di tutte le informazioni registrate sulla blockchain Ethereum e impedisce alcuni tipi di attacchi economici.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo di leggere prima [transazioni](/developers/docs/transactions/) e [blocchi](/developers/docs/blocks/).

## Cos'è la proof-of-work (PoW)? {#what-is-pow}

La proof-of-work (PoW) è il meccanismo che consente di raggiungere il consenso nella rete decentralizzata Ethereum o di concordare su alcuni aspetti come il saldo degli account e l'ordine delle transazioni. Questo impedisce che gli utenti spendano due volte le loro monete e assicura che la catena Ethereum sia incredibilmente difficile da attaccare o sovrascrivere.

## Proof-of-work e mining {#pow-and-mining}

La proof-of-work è l'algoritmo sottostante che imposta la difficoltà e le regole per il lavoro che i miner devono svolgere. Il mining è il "lavoro" da svolgere. Si tratta dell'atto di aggiungere blocchi validi alla catena. Questo è importante perché la lunghezza della catena aiuta la rete a identificare la catena Ethereum valida e a capire lo stato attuale di Ethereum. Più "lavoro" viene svolto, più è lunga la catena, più elevato è il numero di blocchi e più alta è la certezza che la rete si trovi allo stato delle cose attuale.

[Maggiori informazioni sul mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Come funziona la proof-of-work di Ethereum? {#how-it-works}

Le transazioni di Ethereum vengono elaborate sono in blocchi. Ogni blocco ha:

- difficoltà del blocco, ad esempio: 3.324.092.183.262.715
- un mixHash, ad esempio: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce, ad esempio: `0xd3ee432b4fb3d26b`

Questi dati del blocco sono correlati direttamente alla PoW.

### Il lavoro nella proof-of-work {#the-work}

Il protocollo di proof-of-work, detto Ethash, richiede che i miner competano tramite processi di tentativo ed errore per trovare il nonce di un blocco. Solo i blocchi con un nonce valido possono essere aggiunti alla catena.

Quando compete per creare un blocco, un miner inserisce ripetutamente un set di dati, che si può ottenere solo tramite il download e l'esecuzione dell'intera catena (che è quello che fa il miner), attraverso una funzione matematica. Lo scopo è quello di generare un mixHash che si trovi sotto il nonce target, come dettato dalla difficoltà del blocco. Il miglior modo per farlo è tramite un processo di continui tentativi ed errori.

La difficoltà determina il target per l'hash. Più basso è il target, più piccolo è il set di hash validi. Una volta generato, è incredibilmente facile per gli altri miner e client verificarne la bontà. Anche se dovesse cambiare solo una transazione, l'hash verrebbe completamente stravolto, segnalando una frode.

L'hashing rende le frodi facili da individuare. Ma la PoW è anche un grande deterrente contro gli attacchi alla catena.

### Proof-of-work e sicurezza {#security}

I miner sono incentivati a fare questo lavoro sulla catena principale di Ethereum. L'incentivo a iniziare una catena propria è molto ridotto per i miner, perché minerebbe il sistema. Le blockchain fanno affidamento sul fatto di avere un solo stato di riferimento, che è considerato l'unica fonte di verità. E gli utenti sceglieranno sempre la catena più lunga o più "pesante".

L'obiettivo della PoW è di estendere la catena. La catena più lunga è quella più credibile in termini di validità, perché è quella che racchiude in sé la maggior parte del lavoro computazionale eseguito. Nel sistema PoW di Ethereum è praticamente impossibile creare nuovi blocchi che cancellino transazioni o che ne creino di false, o mantenere una seconda catena. Questo perché un miner malevolo dovrebbe sempre risolvere il nonce del blocco più velocemente di chiunque altro.

Per creare costantemente blocchi malevoli ma validi, bisognerebbe avere più del 51% della potenza di mining della rete, per poter battere tutti gli altri. Servirebbe davvero un'enorme potenza di calcolo per essere in grado di affrontare questa quantità di "lavoro". E il costo dell'energia utilizzata potrebbe anche superare i guadagni ottenibili con un attacco.

### L'economia della proof-of-work {#economics}

La PoW è anche responsabile del rilascio di nuova valuta nel sistema e dell'incentivazione dei miner a fare il proprio lavoro.

I miner che creano correttamente un blocco sono ricompensati con 2 ETH freschi di conio e con tutte le commissioni sulle transazioni all'interno del blocco. Un miner può ottenere anche 1,75 ETH per un blocco zio (uncle block), che è un blocco valido, creato contemporaneamente al blocco corretto di un altro miner. Questa condizione in genere si verifica a causa della latenza della rete.

## Finalità {#finality}

Nelle reti distribuite, una transazione ha la sua finalità quando è parte di un blocco che non può cambiare.

Dato che i miner lavorano in modo decentralizzato, è possibile che avvenga il mining di due blocchi validi nello stesso momento. In questo caso, si crea una diramazione temporanea. Alla fine verrà accettata una sola catena, che sarà quella più lunga che verrà creata quando verranno eseguiti il mining e l'aggiunta di un blocco successivo.

Per complicare ulteriormente le cose, le transazioni che erano state rifiutate sulla diramazione temporanea potrebbero essere state aggiunte alla catena accettata. Questo significa che la catena potrebbe essere annullata. Quindi la finalità si riferisce al tempo per cui è necessario attendere prima di considerare una transazione irreversibile. Per Ethereum il tempo consigliato è di 6 blocchi oppure poco più di un minuto. Dopo questo periodo di tempo si può dire con ragionevole certezza che la transazione è andata a buon fine. Ovviamente è possibile attendere di più per avere una maggiore certezza.

Questa è una cosa da tenere a mente quando si progettano dapp, perché dare informazioni sbagliate agli utenti in merito alle transazioni potrebbe tradursi in una scarsa esperienza utente. Specialmente se il valore della transazione è elevato.

Ricorda che il periodo di tempo non include l'attesa che intercorre prima che la transazione venga prelevata da un miner.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                              | Contro                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La PoW è neutrale. Non servono ETH per iniziare e le ricompense per i blocchi consentono di passare da 0 ETH a un saldo positivo. Con la [ proof of stake](/developers/docs/consensus-mechanisms/pos/) servono ETH per iniziare. | La PoW consuma molta energia, e questo va a scapito dell'ambiente.                                                                                                                                       |
| La PoW è un meccanismo di consenso testato e ben collaudato che mantiene Bitcoin ed Ethereum sicure e decentralizzate da molti anni.                                                                                             | Chi desidera occuparsi di mining deve avere apparecchiature specializzate, con un conseguente notevole investimento iniziale.                                                                            |
| Rispetto alla proof-of-stake è relativamente facile da implementare.                                                                                                                                                             | A causa della crescente richiesta di potenza di calcolo, alcuni i gruppi di mining potrebbero potenzialmente dominare l'attività di mining, portando così alla centralizzazione e a rischi di sicurezza. |

## Confronto con la proof-of-stake {#compared-to-pos}

A un alto livello, la proof-of-stake ha lo stesso obiettivo della proof-of-work: permettere a una rete decentralizzata di raggiungere il consenso in totale sicurezza. Ma ci sono alcune differenze nei processi e nel personale:

- La PoS scambia l'importanza della potenza di calcolo con gli ETH in staking
- La PoS sostituisce i miner con i validatori. I validatori fanno staking con i loro ETH per avere la possibilità di creare nuovi blocchi.
- I validatori non competono per creare blocchi, sono invece scelti casualmente da un algoritmo.
- La finalità è più chiara: in alcuni checkpoint, se i 2/3 dei validatori concordano sullo stato del blocco, questo è considerato definitivo. I validatori devono scommettere il loro intero stake su questo, per cui se dovessero provare a cospirare in seguito, perderebbero il loro intero stake.

[Maggiori informazioni sulla Proof of Stake](/developers/docs/consensus-mechanisms/pos/)

## Letture consigliate {#further-reading}

- [Majority attack](https://en.bitcoin.it/wiki/Majority_attack)
- [On settlement finality](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
