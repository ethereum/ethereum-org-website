---
title: Prova di lavoro (PoW)
description: Una spiegazione del protocollo di consenso della prova di lavoro e del suo ruolo in Ethereum.
lang: it
---

La rete di [Ethereum](/) ha iniziato utilizzando un meccanismo di consenso che prevedeva la **[Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow)**. Questo permetteva ai nodi della rete di Ethereum di concordare sullo stato di tutte le informazioni registrate sulla blockchain di Ethereum e preveniva alcuni tipi di attacchi economici. Tuttavia, Ethereum ha disattivato la prova di lavoro nel 2022 e ha iniziato a utilizzare invece la [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    La prova di lavoro è stata ora deprecata. Ethereum non utilizza più la prova di lavoro come parte del suo meccanismo di consenso. Utilizza invece la Proof-of-Stake. Maggiori informazioni sulla [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) e sullo [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/) e i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la Prova di lavoro (PoW)? {#what-is-pow}

Il consenso di Nakamoto, che utilizza la prova di lavoro, è il meccanismo che un tempo permetteva alla rete decentralizzata di Ethereum di raggiungere il consenso (ovvero, tutti i nodi concordano) su elementi come i saldi degli account e l'ordine delle transazioni. Questo impediva agli utenti di "spendere due volte" le proprie monete e garantiva che la catena di Ethereum fosse tremendamente difficile da attaccare o manipolare. Queste proprietà di sicurezza ora derivano invece dalla Proof-of-Stake utilizzando il meccanismo di consenso noto come [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Prova di lavoro e minaggio {#pow-and-mining}

La prova di lavoro è l'algoritmo sottostante che stabilisce la difficoltà e le regole per il lavoro che i minatori svolgono sulle blockchain basate sulla prova di lavoro. Il minaggio è il "lavoro" stesso. È l'atto di aggiungere blocchi validi alla catena. Questo è importante perché la lunghezza della catena aiuta la rete a seguire il fork corretto della blockchain. Più "lavoro" viene svolto, più lunga è la catena e maggiore è il numero del blocco, più la rete può essere certa dello stato attuale delle cose.

[Maggiori informazioni sul minaggio](/developers/docs/consensus-mechanisms/pow/mining/)

## Come funzionava la prova di lavoro di Ethereum? {#how-it-works}

Le transazioni di Ethereum vengono elaborate in blocchi. Nell'ormai deprecato Ethereum basato sulla prova di lavoro, ogni blocco conteneva:

- difficoltà del blocco – ad esempio: 3,324,092,183,262,715
- mixHash – ad esempio: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – ad esempio: `0xd3ee432b4fb3d26b`

Questi dati del blocco erano direttamente correlati alla prova di lavoro.

### Il lavoro nella prova di lavoro {#the-work}

Il protocollo della prova di lavoro, Ethash, richiedeva ai minatori di affrontare un'intensa corsa per tentativi ed errori per trovare il nonce di un blocco. Solo i blocchi con un nonce valido potevano essere aggiunti alla catena.

Durante la corsa per creare un blocco, un minatore passava ripetutamente un set di dati, che poteva essere ottenuto solo scaricando ed eseguendo l'intera catena (come fa un minatore), attraverso una funzione matematica. Il set di dati veniva utilizzato per generare un mixHash inferiore a un obiettivo dettato dalla difficoltà del blocco. Il modo migliore per farlo è procedere per tentativi ed errori.

La difficoltà determinava l'obiettivo per l'hash. Più basso era l'obiettivo, più piccolo era l'insieme di hash validi. Una volta generato, questo era incredibilmente facile da verificare per altri minatori e client. Anche se una sola transazione fosse cambiata, l'hash sarebbe stato completamente diverso, segnalando una frode.

L'hashing rende le frodi facili da individuare. Ma la prova di lavoro come processo era anche un grande deterrente contro gli attacchi alla catena.

### Prova di lavoro e sicurezza {#security}

I minatori erano incentivati a svolgere questo lavoro sulla catena principale di Ethereum. C'era poco incentivo per un sottoinsieme di minatori a iniziare la propria catena: questo mina il sistema. Le blockchain si basano sull'avere un singolo stato come fonte di verità.

L'obiettivo della prova di lavoro era estendere la catena. La catena più lunga era la più credibile come quella valida perché aveva richiesto il maggior lavoro computazionale per essere generata. All'interno del sistema PoW di Ethereum, era quasi impossibile creare nuovi blocchi che cancellassero transazioni, ne creassero di false o mantenessero una seconda catena. Questo perché un minatore malintenzionato avrebbe dovuto risolvere sempre il nonce del blocco più velocemente di tutti gli altri.

Per creare costantemente blocchi malintenzionati ma validi, un minatore malintenzionato avrebbe avuto bisogno di oltre il 51% della potenza di minaggio della rete per battere tutti gli altri. Quella quantità di "lavoro" richiede molta potenza di calcolo costosa e l'energia spesa avrebbe persino potuto superare i guadagni ottenuti in un attacco.

### Economia della prova di lavoro {#economics}

La prova di lavoro era anche responsabile dell'emissione di nuova valuta nel sistema e dell'incentivazione dei minatori a svolgere il lavoro.

A partire dall'aggiornamento [Constantinople](/ethereum-forks/#constantinople), i minatori che creavano con successo un blocco venivano ricompensati con due ETH appena coniati e parte delle commissioni di transazione. Anche i blocchi ommer compensavano 1,75 ETH. I blocchi ommer erano blocchi validi creati da un minatore praticamente nello stesso momento in cui un altro minatore creava il blocco canonico, il quale veniva infine determinato da quale catena veniva costruita per prima. I blocchi ommer si verificavano solitamente a causa della latenza di rete.

## Definitività {#finality}

Una transazione ha "definitività" su Ethereum quando fa parte di un blocco che non può cambiare.

Poiché i minatori lavoravano in modo decentralizzato, due blocchi validi potevano essere minati contemporaneamente. Questo crea un fork temporaneo. Alla fine, una di queste catene diventava la catena accettata dopo che i blocchi successivi venivano minati e aggiunti ad essa, rendendola più lunga.

A complicare ulteriormente le cose, le transazioni rifiutate sul fork temporaneo potrebbero non essere state incluse nella catena accettata. Questo significa che potrebbero essere annullate. Quindi la definitività si riferisce al tempo che si dovrebbe attendere prima di considerare una transazione irreversibile. Nel precedente Ethereum basato sulla prova di lavoro, più blocchi venivano minati sopra uno specifico blocco `N`, maggiore era la sicurezza che le transazioni in `N` avessero avuto successo e non sarebbero state annullate. Ora, con la Proof-of-Stake, la finalizzazione è una proprietà esplicita, piuttosto che probabilistica, di un blocco.

## Consumo energetico della prova di lavoro {#energy}

Una delle principali critiche alla prova di lavoro è la quantità di energia richiesta per mantenere sicura la rete. Per mantenere la sicurezza e la decentralizzazione, Ethereum basato sulla prova di lavoro consumava grandi quantità di energia. Poco prima di passare alla Proof-of-Stake, i minatori di Ethereum consumavano collettivamente circa 70 TWh/anno (all'incirca come la Repubblica Ceca - secondo [digiconomist](https://digiconomist.net/) il 18 luglio 2022).

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                         | Contro                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| La prova di lavoro è neutrale. Non hai bisogno di ETH per iniziare e le ricompense dei blocchi ti permettono di passare da 0 ETH a un saldo positivo. Con la [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) hai bisogno di ETH per iniziare. | La prova di lavoro consuma così tanta energia da essere dannosa per l'ambiente.                                                                      |
| La prova di lavoro è un meccanismo di consenso collaudato che ha mantenuto Bitcoin ed Ethereum sicuri e decentralizzati per molti anni.                                                                                          | Se vuoi minare, hai bisogno di attrezzature così specializzate che rappresenta un grande investimento per iniziare.                                                |
| Rispetto alla Proof-of-Stake è relativamente facile da implementare.                                                                                                                                                                | A causa del crescente calcolo necessario, le pool di minaggio potrebbero potenzialmente dominare il gioco del minaggio, portando a centralizzazione e rischi per la sicurezza. |

## Confronto con la Proof-of-Stake {#compared-to-pos}

Ad alto livello, la Proof-of-Stake ha lo stesso obiettivo finale della prova di lavoro: aiutare la rete decentralizzata a raggiungere il consenso in modo sicuro. Ma presenta alcune differenze nel processo e nei partecipanti:

- La Proof-of-Stake sostituisce l'importanza della potenza di calcolo con gli ETH messi in staking.
- La Proof-of-Stake sostituisce i minatori con i validatori. I validatori mettono in staking i propri ETH per attivare la capacità di creare nuovi blocchi.
- I validatori non competono per creare blocchi, ma vengono scelti casualmente da un algoritmo.
- La definitività è più chiara: a determinati checkpoint, se i 2/3 dei validatori concordano sullo stato del blocco, questo è considerato definitivo. I validatori devono scommettere il loro intero stake su questo, quindi se cercano di colludere in seguito, perderanno il loro intero stake.

[Maggiori informazioni sulla Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)

## Impari meglio visivamente? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Letture consigliate {#further-reading}

- [Attacco di maggioranza](https://en.bitcoin.it/wiki/Majority_attack)
- [Sulla definitività del regolamento](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Video {#videos}

- [Una spiegazione tecnica dei protocolli di prova di lavoro](https://youtu.be/9V1bipPkCTU)

## Argomenti correlati {#related-topics}

- [Minaggio](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Prova di autorità (PoA)](/developers/docs/consensus-mechanisms/poa/)