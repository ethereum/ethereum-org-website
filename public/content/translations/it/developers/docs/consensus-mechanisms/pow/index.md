---
title: Prova di lavoro (PoW)
description: Una spiegazione del protocollo di consenso della prova di lavoro e del suo ruolo in Ethereum.
lang: it
---

La rete [Ethereum](/) ha iniziato utilizzando un meccanismo di consenso che prevedeva la **[prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow)**. Questo ha permesso ai nodi della rete Ethereum di concordare sullo stato di tutte le informazioni registrate sulla blockchain di Ethereum e ha prevenuto determinati tipi di attacchi economici. Tuttavia, Ethereum ha disattivato la prova di lavoro nel 2022 e ha iniziato a utilizzare invece la [prova di stake](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    La prova di lavoro è stata ora deprecata. Ethereum non utilizza più la prova di lavoro come parte del suo meccanismo di consenso. Utilizza invece la prova di stake. Maggiori informazioni sulla [prova di stake](/developers/docs/consensus-mechanisms/pos/) e sullo [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/) e i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la prova di lavoro (PoW)? {#what-is-pow}

Il consenso di Nakamoto, che utilizza la prova di lavoro, è il meccanismo che un tempo consentiva alla rete decentralizzata di Ethereum di raggiungere il consenso (ovvero, tutti i nodi concordano) su cose come i saldi degli account e l'ordine delle transazioni. Questo impediva agli utenti di "spendere due volte" le loro monete e garantiva che la catena di Ethereum fosse tremendamente difficile da attaccare o manipolare. Queste proprietà di sicurezza ora derivano invece dalla prova di stake utilizzando il meccanismo di consenso noto come [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Prova di lavoro e mining {#pow-and-mining}

La prova di lavoro è l'algoritmo sottostante che imposta la difficoltà e le regole per il lavoro che i minatori svolgono sulle blockchain basate sulla prova di lavoro. Il mining è il "lavoro" stesso. È l'atto di aggiungere blocchi validi alla catena. Questo è importante perché la lunghezza della catena aiuta la rete a seguire la biforcazione corretta della blockchain. Più "lavoro" viene svolto, più lunga è la catena e maggiore è il numero del blocco, più la rete può essere certa dello stato attuale delle cose.

[Maggiori informazioni sul mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Come funzionava la prova di lavoro di Ethereum? {#how-it-works}

Le transazioni di Ethereum vengono elaborate in blocchi. Nell'ormai deprecato Ethereum basato sulla prova di lavoro, ogni blocco conteneva:

- difficoltà del blocco – ad esempio: 3,324,092,183,262,715
- mixHash – ad esempio: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – ad esempio: `0xd3ee432b4fb3d26b`

Questi dati del blocco erano direttamente correlati alla prova di lavoro.

### Il lavoro nella prova di lavoro {#the-work}

Il protocollo di prova di lavoro, Ethash, richiedeva ai minatori di affrontare un'intensa corsa per tentativi ed errori per trovare il nonce per un blocco. Solo i blocchi con un nonce valido potevano essere aggiunti alla catena.

Durante la corsa per creare un blocco, un minatore inseriva ripetutamente un set di dati, che poteva essere ottenuto solo scaricando ed eseguendo l'intera catena (come fa un minatore), attraverso una funzione matematica. Il set di dati veniva utilizzato per generare un mixHash al di sotto di un obiettivo dettato dalla difficoltà del blocco. Il modo migliore per farlo è per tentativi ed errori.

La difficoltà determinava l'obiettivo per l'hash. Più basso era l'obiettivo, più piccolo era l'insieme di hash validi. Una volta generato, questo era incredibilmente facile da verificare per altri minatori e client. Anche se una sola transazione fosse cambiata, l'hash sarebbe stato completamente diverso, segnalando una frode.

L'hashing rende le frodi facili da individuare. Ma la prova di lavoro come processo era anche un grande deterrente contro gli attacchi alla catena.

### Prova di lavoro e sicurezza {#security}

I minatori erano incentivati a svolgere questo lavoro sulla catena principale di Ethereum. C'era poco incentivo per un sottoinsieme di minatori a iniziare la propria catena: mina il sistema. Le blockchain si basano sull'avere un singolo stato come fonte di verità.

L'obiettivo della prova di lavoro era estendere la catena. La catena più lunga era la più credibile come quella valida perché aveva la maggior quantità di lavoro computazionale svolto per generarla. All'interno del sistema PoW di Ethereum, era quasi impossibile creare nuovi blocchi che cancellassero transazioni, ne creassero di false o mantenessero una seconda catena. Questo perché un minatore malintenzionato avrebbe dovuto risolvere sempre il nonce del blocco più velocemente di tutti gli altri.

Per creare costantemente blocchi malintenzionati ma validi, un minatore malintenzionato avrebbe avuto bisogno di oltre il 51% della potenza di mining della rete per battere tutti gli altri. Quella quantità di "lavoro" richiede molta potenza di calcolo costosa e l'energia spesa avrebbe potuto persino superare i guadagni ottenuti in un attacco.

### Economia della prova di lavoro {#economics}

La prova di lavoro era anche responsabile dell'emissione di nuova valuta nel sistema e dell'incentivazione dei minatori a svolgere il lavoro.

A partire dall'aggiornamento [Constantinople](/ethereum-forks/#constantinople), i minatori che creavano con successo un blocco venivano ricompensati con due ETH appena coniati e parte delle commissioni della transazione. I blocchi ommer compensavano anche 1,75 ETH. I blocchi ommer erano blocchi validi creati da un minatore praticamente nello stesso momento in cui un altro minatore creava il blocco canonico, che alla fine veniva determinato da quale catena veniva costruita per prima. I blocchi ommer di solito si verificavano a causa della latenza della rete.

## Finalità {#finality}

Una transazione ha "finalità" su Ethereum quando fa parte di un blocco che non può cambiare.

Poiché i minatori lavoravano in modo decentralizzato, due blocchi validi potevano essere minati contemporaneamente. Questo crea una biforcazione temporanea. Alla fine, una di queste catene diventava la catena accettata dopo che i blocchi successivi venivano minati e aggiunti ad essa, rendendola più lunga.

A complicare ulteriormente le cose, le transazioni rifiutate sulla biforcazione temporanea potrebbero non essere state incluse nella catena accettata. Ciò significa che potrebbero essere annullate. Quindi la finalità si riferisce al tempo che dovresti aspettare prima di considerare una transazione irreversibile. Nel precedente Ethereum basato sulla prova di lavoro, più blocchi venivano minati sopra un blocco specifico `N`, maggiore era la sicurezza che le transazioni in `N` avessero avuto successo e non sarebbero state annullate. Ora, con la prova di stake, la finalizzazione è una proprietà esplicita, piuttosto che probabilistica, di un blocco.

## Consumo energetico della prova di lavoro {#energy}

Una delle principali critiche alla prova di lavoro è la quantità di energia richiesta per mantenere la rete sicura. Per mantenere la sicurezza e la decentralizzazione, Ethereum basato sulla prova di lavoro consumava grandi quantità di energia. Poco prima di passare alla prova di stake, i minatori di Ethereum consumavano collettivamente circa 70 TWh/anno (più o meno come la Repubblica Ceca - secondo [digiconomist](https://digiconomist.net/) il 18 luglio 2022).

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                         | Contro                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| La prova di lavoro è neutrale. Non hai bisogno di ETH per iniziare e le ricompense del blocco ti consentono di passare da 0 ETH a un saldo positivo. Con la [prova di stake](/developers/docs/consensus-mechanisms/pos/) hai bisogno di ETH per iniziare. | La prova di lavoro consuma così tanta energia da essere dannosa per l'ambiente.                                                                      |
| La prova di lavoro è un meccanismo di consenso collaudato che ha mantenuto Bitcoin ed Ethereum sicuri e decentralizzati per molti anni.                                                                                          | Se vuoi minare, hai bisogno di attrezzature così specializzate che rappresenta un grande investimento per iniziare.                                                |
| Rispetto alla prova di stake è relativamente facile da implementare.                                                                                                                                                                | A causa del crescente calcolo necessario, le pool di mining potrebbero potenzialmente dominare il gioco del mining, portando a centralizzazione e rischi per la sicurezza. |

## Confronto con la prova di stake {#compared-to-pos}

Ad alto livello, la prova di stake ha lo stesso obiettivo finale della prova di lavoro: aiutare la rete decentralizzata a raggiungere il consenso in modo sicuro. Ma presenta alcune differenze nel processo e nel personale:

- La prova di stake sostituisce l'importanza della potenza di calcolo con gli ETH in staking.
- La prova di stake sostituisce i minatori con i validatori. I validatori mettono in staking i loro ETH per attivare la capacità di creare nuovi blocchi.
- I validatori non competono per creare blocchi, ma vengono scelti casualmente da un algoritmo.
- La finalità è più chiara: a determinati checkpoint, se 2/3 dei validatori concordano sullo stato del blocco, questo è considerato finale. I validatori devono scommettere il loro intero stake su questo, quindi se cercano di colludere in seguito, perderanno il loro intero stake.

[Maggiori informazioni sulla prova di stake](/developers/docs/consensus-mechanisms/pos/)

## Impari meglio visivamente? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Letture consigliate {#further-reading}

- [Attacco di maggioranza](https://en.bitcoin.it/wiki/Majority_attack)
- [Sulla finalità del regolamento](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Video {#videos}

- [Una spiegazione tecnica dei protocolli di prova di lavoro](https://youtu.be/9V1bipPkCTU)

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova di stake](/developers/docs/consensus-mechanisms/pos/)
- [Prova di autorità](/developers/docs/consensus-mechanisms/poa/)