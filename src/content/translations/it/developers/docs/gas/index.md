---
title: Gas e commissioni
description:
lang: it
---

Il carburante è un elemento essenziale per la rete Ethereum. Consente di far funzionare la rete, proprio come un'automobile ha bisogno di benzina per funzionare.

## Prerequisiti {#prerequisites}

Per capire meglio questa pagina, consigliamo innanzi tutto di leggere gli argomenti su [transazioni](/developers/docs/transactions/) ed [EVM](/developers/docs/evm/).

## Cos'è il carburante? {#what-is-gas}

Con il termine carburante ci si riferisce ad un'unità di misura che indica la quantità di sforzo di calcolo necessaria per eseguire operazioni specifiche sulla rete Ethereum.

Dato che ogni transazione Ethereum necessita di risorse di calcolo per essere eseguita, richiede una commissione. Il carburante si riferisce alla commissione richiesta per far sì che una transazione su Ethereum vada a buon fine.

![Diagramma che mostra dove serve il carburante nelle operazioni dell'EVM](./gas.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

In sostanza, le commissioni sul carburante sono pagate nella valuta nativa di Ethereum, l'ether (ETH). I prezzi del carburante sono indicati in Gwei, che è a sua volta un taglio dell'ETH: ogni Gwei equivale a 0,000000001 ETH (10<sup>-9</sup> ETH). Per esempio, invece di dire che il carburante costa 0,000000001 Ether, puoi dire che costa 1 Gwei. La parola 'gwei' significa 'giga-wei', ed è pari a 1.000.000.000 wei. Wei (dal nome di [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), creatore di [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) è l'unità più piccola di ETH.

## Prima dell'aggiornamento di Londra {#pre-london}

Le modalità di calcolo delle commissioni di transazione sulla rete Ethereum sono state modificate con [l'aggiornamento di Londra](/history/#london) dell'agosto 2021. Ecco un riepilogo di come funzionavano le cose in precedenza:

Mettiamo che Alice debba pagare 1 ETH a Bob. Nella transazione, il limite di carburante è di 21.000 unità e il prezzo del carburante è 200 gwei.

La commissione totale sarebbe: `Unità di carburante (limite) * Prezzo del gas per unità`, es. ` 21.000 * 200 = 4.200.000 gwei` o 0,0042 ETH

Ipotizziamo che Jordan debba pagare 1 ETH a Taylor. Nella transazione, il limite di carburante è di 21.000 unità e la commissione base è di 10 gwei. Jordan include una mancia di 2 gwei.

## Dopo l'aggiornamento di Londra {#post-london}

`21.000 * (10 + 2) = 252.000 gwei` o 0,000252 ETH.

Quando Jordan invia il denaro, dal suo account sono sottratti 1,000252 ETH. Taylor riceve un accredito di 1,0000 ETH. Il validatore riceve la mancia di 0,000042 ETH. La commissione base di 0,00021 ETH è bruciata.

Inoltre, Jordan può anche impostare una commissione massima (`maxFeePerGas`) per la transazione. A Jordan viene rimborsata la differenza tra commissione massima ed effettiva, ovvero `rimborso = commissione max - (commissione base + commissione prioritaria)`. Jordan può impostare un importo massimo da pagare per la transazione da eseguire, senza preoccuparsi di pagare troppo "oltre" la commissione base quando la transazione è eseguita.

### Dimensione del blocco {#block-size}

Prima dell'Aggiornamento di Londra, Ethereum aveva blocchi di dimensioni fisse. Nei momenti di domanda elevata della rete, questi blocchi operavano a piena capacità. Quindi, spesso gli utenti dovevano attendere che la domanda elevata calasse per poter essere inclusi in un blocco, il che si traduceva in un'esperienza non soddisfacente per l'utente.

L'Aggiornamento di Londra ha introdotto blocchi di dimensioni variabili in Ethereum. Ogni blocco ha una dimensione prevista di 15 milioni di carburante, ma la dimensione dei blocchi aumenta o diminuisce in base alla domanda della rete, fino al limite massimo di 30 milioni di carburante per blocco (2 volte la dimensione prevista del blocco). Il protocollo raggiunge una dimensione del blocco equilibrata di 15 milioni in media tramite il processo di _tâtonnement_. Significa che se la dimensione del blocco supera quella prevista, il protocollo aumenta la commissione base per il blocco successivo. Analogamente, il protocollo riduce la commissione base se la dimensione del blocco è inferiore a quella prevista. L'importo della commissione base si adatta proporzionalmente alla distanza della dimensione del blocco corrente rispetto a quella prevista. [Maggiori informazioni sui blocchi](/developers/docs/blocks/).

### Tariffa base {#base-fee}

Ogni blocco ha una commissione base che funge da prezzo di riserva. Per poter essere inseriti in un blocco, il prezzo offerto per il carburante deve essere pari almeno alla commissione base. La commissione base è calcolata indipendentemente dal blocco corrente ed è invece determinata dai blocchi che lo precedono, il che rende le commissioni sulle transazioni più prevedibili per gli utenti. Quando il blocco è minato, questa commissione base viene "bruciata", ovvero rimossa dalla circolazione.

La commissione base è calcolata con una formula che confronta le dimensioni del blocco precedente (la quantità di carburante usata per tutte le transazioni) con le dimensioni di quello corrente. La commissione base aumenta di un massimo del 12,5% per blocco se la dimensione prevista del blocco viene superata. Questa crescita esponenziale rende economicamente impensabile che la dimensione del blocco resti elevata per un tempo indefinito.

| Numero del blocco | Gas incluso | Aumento della commissione | Tariffa base corrente |
| ----------------- | ----------: | ------------------------: | --------------------: |
| 1                 |         15M |                        0% |              100 gwei |
| 2                 |         30M |                        0% |              100 gwei |
| 3                 |         30M |                     12,5% |            112,5 gwei |
| 4                 |         30M |                     12,5% |            126,6 gwei |
| 5                 |         30M |                     12,5% |            142,4 gwei |
| 6                 |         30M |                     12,5% |            160,2 gwei |
| 7                 |         30M |                     12,5% |            180,2 gwei |
| 8                 |         30M |                     12,5% |            202,7 gwei |

Rispetto al mercato del carburante basato su aste prima dell'aggiornamento di Londra, questa modifica del meccanismo delle commissioni sulle transazioni ha reso più affidabile la previsione delle commissioni. Secondo la tabella che precede, per creare una transazione sul blocco numero 9, un portafoglio indica all'utente con certezza che la **commissione base massima** da aggiungere al blocco successivo è `commissione base corrente * 112,5%` o `202,8 gwei * 112,5% = 228,1 gwei`.

Inoltre, è importante notare che, vista la velocità con cui la commissione base aumenta mentre si avanza verso un blocco completo, è improbabile assistere a picchi prolungati di blocchi completi.

| Numero del blocco | Gas incluso | Aumento della commissione | Tariffa base corrente |
| ----------------- | ----------: | ------------------------: | --------------------: |
| 30                |         30M |                     12,5% |          2.705,6 gwei |
| ...               |         ... |                     12,5% |                   ... |
| 50                |         30M |                     12,5% |         28.531,3 gwei |
| ...               |         ... |                     12,5% |                   ... |
| 100               |         30M |                     12,5% |     10.302.608,6 gwei |

### Commissione prioritaria (mance) {#priority-fee}

Prima dell'Aggiornamento di Londra, i miner avrebbero ricevuto la commissione sul carburante totale da ogni transazione inclusa in un blocco.

In virtù del fatto che la nuova commissione base viene bruciata, l'aggiornamento di Londra ha introdotto una commissione prioritaria (mancia) per incentivare i miner a includere una transazione nel blocco. Senza mance, i miner troverebbero economicamente conveniente minare blocchi vuoti, poiché riceverebbero la stessa ricompensa. In condizioni normali, una piccola mancia fornisce ai miner un incentivo minimo per includere una transazione. Per le transazioni che devono essere prioritariamente eseguite prima di altre nello stesso blocco, occorrerà una mancia più cospicua per tentare di superare le transazioni concorrenti.

### Commissione massima {#maxfee}

Per eseguire una transazione sulla rete, gli utenti possono specificare un limite massimo che sono disposti a pagare affinché la loro transazione venga eseguita. Questo parametro opzionale è noto come `maxFeePerGas`. Affinché una transazione venga eseguita, la commissione massima deve essere maggiore della somma della commissione base e della mancia. Il mittente della transazione riceve il rimborso della differenza tra la commissione massima e la somma della commissione base e della mancia.

### Calcolo delle commissioni {#calculating-fees}

Uno dei benefici principali ottenuti con l'aggiornamento di Londra è il miglioramento dell'esperienza dell'utente nella definizione delle commissioni sulle transazioni. Per i portafogli che supportano l'aggiornamento, invece di dichiarare esplicitamente quanto si è disposti a pagare per far elaborare la transazione, i fornitori del portafoglio imposteranno automaticamente una commissione sulle transazioni consigliata (commissione base + commissione prioritaria consigliata) per ridurre la quantità di complessità gravante sugli utenti.

## EIP-1559 {#eip-1559}

L'implementazione dell'[EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) nell'Aggiornamento di Londra ha reso il meccanismo delle commissioni sulle transazioni più complesso rispetto al precedente sistema basato su aste dei prezzi del carburante, ma ha il vantaggio di rendere le commissioni sul carburante più prevedibili, migliorando l'efficienza del mercato delle commissioni sulle transazioni. Gli utenti possono inviare transazioni con una `maxFeePerGas` corrispondente a quanto sono disposti a pagare affinché la transazione sia eseguita, sapendo che non pagheranno di più del prezzo di mercato del carburante (`baseFeePerGas`) e otterranno il rimborso di qualsiasi extra, tranne la mancia.

In questo video viene spiegato l'EIP-1559 e i vantaggi che comporta:

<YouTube id="MGemhK9t44Q" />

Se sei interessato puoi leggere le [specifiche esatte dell'EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

Approfondisci con queste [Risorse relative all'EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## Perché esistono le commissioni sul carburante? {#why-do-gas-fees-exist}

In breve, le commissioni sul carburante contribuiscono a mantenere rete Ethereum sicura. Richiedendo una commissione per ogni calcolo eseguito sulla rete, evitiamo lo spam sulla rete da parte di attori malevoli. Per evitare cicli infiniti accidentali od ostili oppure altri sprechi di calcolo nel codice, ogni transazione deve definire un limite al numero di passaggi di calcolo dell'esecuzione del codice che può utilizzare. Questa unità di calcolo fondamentale è il "carburante".

Sebbene una transazione preveda un limite, tutto il carburante non utilizzato in una transazione viene rimborsato all'utente (ciò che viene restituito è: `commissione massima - (commissione base + mancia)`).

![Diagramma che mostra come viene rimborsato il carburante inutilizzato](../transactions/gas-tx.png) _Diagramma adattato dall' [illustrazione dell'Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cosa si intende con limite di carburante? {#what-is-gas-limit}

Il limite di carburante indica la quantità massima di carburante che si è disposti a consumare in una transazione. Le transazioni più complicate che coinvolgono [smart contract](/developers/docs/smart-contracts/) richiedono un maggiore lavoro di calcolo e quindi un limite di carburante superiore rispetto a un semplice pagamento. Un trasferimento di ETH standard richiede un limite di carburante di 21.000 unità di carburante.

Per esempio, se imposti un limite di carburante di 50.000 per un semplice trasferimento di ETH, l'EVM consuma 21.000 unità e le rimanenti 29.000 vengono rimborsate. Tuttavia, se specifichi troppo poco carburante, ad esempio un limite di carburante di 20.000 per un semplice trasferimento di ETH, l'EVM consumerà le tue 20.000 unità di carburante tentando di soddisfare la transazione, che però non potrà essere completata. A quel punto l'EVM annulla ogni modifica, ma dato che il miner ha già eseguito un lavoro pari a 20.000 unità di carburante, questo carburante viene consumato.

## Perché le commissioni del carburante possono esser così elevate? {#why-can-gas-fees-get-so-high}

Le commissioni sul carburante elevate sono dovute alla popolarità di Ethereum. Eseguire qualsiasi operazione su Ethereum richiede il consumo di carburante, ma bisogna considerare che lo spazio di carburante per blocco è limitato. Le commissioni includono l'esecuzione di calcoli, l'archiviazione o la manipolazione di dati, o ancora il trasferimento di token, tutte operazioni che consumano diverse quantità di unità di "carburante". All'aumentare della complessità delle funzionalità delle dapp, cresce anche il numero di operazioni che uno smart contract esegue, il che significa che ogni transazione occupa più spazio in un blocco di dimensioni limitate. Se c'è troppa domanda, gli utenti devono offrire una mancia maggiore per tentare di superare le transazioni degli altri utenti. Una mancia più cospicua può rendere più probabile che la tua transazione troverà posto nel blocco successivo.

Il prezzo del carburante da solo in realtà non determina quanto dobbiamo pagare per una specifica transazione. Per calcolare la commissione sulle transazioni dobbiamo moltiplicare il carburante usato per la commissione sulle transazioni, misurata in gwei.

## Iniziative per ridurre i costi del gas {#initiatives-to-reduce-gas-costs}

Gli [aggiornamenti di scalabilità](/upgrades/) di Ethereum dovrebbero infine risolvere alcuni problemi delle commissioni sul carburante, che, a loro volta, consentiranno alla piattaforma di elaborare migliaia di transazioni al secondo e di scalare globalmente.

Il ridimensionamento del Livello 2 è un'iniziativa fondamentale per migliorare notevolmente i costi del carburante, l'esperienza utente e la scalabilità. [Maggiori informazioni sul ridimensionamento del Livello 2](/developers/docs/scaling/#layer-2-scaling).

## Strategie utili per ridurre i costi del carburante {#strategies-for-you-to-reduce-gas-costs}

Se stai cercando di ridurre i costi del carburante per i tuoi ETH, puoi impostare una mancia per indicare il livello di priorità della tua transazione. I miner anteporranno ed eseguiranno le transazioni che offrono una mancia maggiore per il carburante, poiché terranno le mance pagate dall'utente e saranno meno inclini a eseguire transazioni che prevedono mance inferiori.

Se desideri monitorare i prezzi del carburante in modo da poter inviare i tuoi ETH a un costo inferiore, puoi usare un ampio ventaglio di strumenti, come:

- [Etherscan](https://etherscan.io/gastracker) _- Strumento di stima del prezzo del carburante delle transazioni_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _- Estensione per la stima del carburante di Chrome, che supporta sia transazioni legacy di Tipo 0 sia transazioni EIP-1559 di Tipo 2._

- [ETH Gas Station](https://ethgasstation.info/) _- Strumenti di misurazione per il mercato del carburante dedicati ai consumatori_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calcola le commissioni del gas nella tua valuta locale per diversi tipi di transazione sulla rete principale, su Arbitrum e su Polygon._

## Strumenti correlati {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _- API per la stima del carburante sviluppata dalla piattaforma di dati mempool globale di Blocknative_

## Letture consigliate {#further-reading}

- [Ethereum Gas Explained](https://defiprime.com/gas)
- [Ethereum è più costoso da usare all'aumentare dei prezzi?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Ridurre il consumo di carburante dei propri smart contract](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Proof of Stake contro Proof of Work](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
