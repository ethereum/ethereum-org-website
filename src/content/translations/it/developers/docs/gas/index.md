---
title: Gas e commissioni
description:
lang: it
---

Il gas è essenziale per la rete di Ethereum. È il carburante che gli consente di operare, proprio come un'automobile lo necessita per funzionare.

## Prerequisiti {#prerequisites}

Per capire meglio questa pagina, consigliamo innanzi tutto di leggere gli argomenti su [transazioni](/developers/docs/transactions/) ed [EVM](/developers/docs/evm/).

## Cos'è il gas? {#what-is-gas}

Gas fa riferimento all'unità che misura la quantità di sforzo di calcolo necessario per eseguire operazioni specifiche sulla rete di Ethereum.

Dato che ogni transazione Ethereum necessita di risorse di calcolo per essere eseguita, richiede una commissione. Il carburante si riferisce alla commissione necessaria per eseguire una transazione su Ethereum, indipendentemente dal suo successo o fallimento.

![Un diagramma che mostra dov'è necessario il gas nelle operazioni dell'EVM](./gas.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Le commissioni del gas sono pagate nalla valuta nativa di Ethereum, ether (ETH). I prezzi del gas sono denotati in gwei, che è a sua volta una denominazione di ETH: ogni gwei equivale a 0,000000001 ETH (10<sup>-9</sup> ETH). Ad esempio, invece di dire che il tuo gas costa 0,000000001 ether, puoi dire che costa 1 gwei. La parola 'gwei' significa 'giga-wei', ed è pari a 1.000.000.000 wei. Wei (dal nome di [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), creatore di [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) è l'unità più piccola di ETH.

## Prima dell'aggiornamento di Londra {#pre-london}

Le modalità di calcolo delle commissioni di transazione sulla rete Ethereum sono state modificate con [l'aggiornamento di Londra](/history/#london) dell'agosto 2021. Ecco un riepilogo di come funzionavano le cose in precedenza:

Mettiamo che Alice debba pagare 1 ETH a Bob. Nella transazione, il limite di gas è di 21.000 unità e il prezzo del gas è di 200 gwei.

La commissione totale sarebbe: `Unità di gas (limite) * Prezzo del gas per unità`, es. ` 21.000 * 200 = 4.200.000 gwei` o 0,0042 ETH

## Dopo l'aggiornamento di Londra {#post-london}

Ipotizziamo che Jordan debba pagare 1 ETH a Taylor. Nella transazione, il limite di gas è di 21.000 unità e la commissione di base è di 10 gwei. Jordan include una mancia di 2 gwei.

La commissione totale sarebbe ora: `unità di gas usate * (commissione di base + commissione prioritaria)`, dove la `commissione di base` è un valore fissato dal protocollo e la `commissione prioritaria` è un valore fissato dall'utente come mancia al validatore.

Ossia `21.000 * (10 + 2) = 252.000 gwei` o 0,000252 ETH.

Quando Jordan invia il denaro, dal suo conto sono sottratti 1,000252 ETH. Taylor riceve un accredito di 1,0000 ETH. Il validatore riceve la mancia di 0,000042 ETH. La commissione di base di 0,00021 ETH è bruciata.

Inoltre, Jordan può anche impostare una commissione massima (`maxFeePerGas`) per la transazione. A Jordan viene rimborsata la differenza tra commissione massima ed effettiva, ovvero `rimborso = commissione max - (commissione di base + commissione prioritaria)`. Jordan può impostare un importo massimo da pagare per la transazione da eseguire, senza preoccuparsi di pagare troppo "oltre" la commissione di base quando la transazione è eseguita.

### Dimensione del blocco {#block-size}

Prima dell'Aggiornamento di Londra, Ethereum aveva blocchi di dimensioni fisse. Nei momenti di elevata domanda di rete, questi blocchi operavano a piena capacità. Quindi, spesso gli utenti dovevano attendere che la domanda calasse per poter essere inclusi in un blocco, il che si traduceva in un'esperienza non soddisfacente per l'utente.

L'Aggiornamento di Londra ha introdotto in Ethereum blocchi di dimensioni variabili. Ogni blocco ha una dimensione prevista di 15 milioni di gas, ma la dimensione dei blocchi aumenta o diminuisce in base alla domanda della rete, fino al limite massimo di 30 milioni di gas per blocco (2 volte la dimensione prevista del blocco). Il protocollo raggiunge una dimensione del blocco equilibrata di 15 milioni in media tramite il processo di _tâtonnement_. Significa che se la dimensione del blocco supera quella prevista, il protocollo aumenta la commissione di base per il blocco successivo. Analogamente, il protocollo riduce la commissione di base se la dimensione del blocco è inferiore a quella prevista. L'importo della commissione di base si adatta proporzionalmente alla distanza della dimensione del blocco corrente rispetto a quella prevista. [Maggiori informazioni sui blocchi](/developers/docs/blocks/).

### Tariffa base {#base-fee}

Ogni blocco ha una commissione di base che funge da prezzo di riserva. Per poter essere inseriti in un blocco, il prezzo offerto per il gas deve essere pari almeno alla commissione di base. La commissione di base è calcolata indipendentemente dal blocco corrente ed è invece determinata dai blocchi che lo precedono, il che rende le commissioni sulle transazioni più prevedibili per gli utenti. Quando il blocco è minato, questa commissione di base viene "bruciata", ovvero rimossa dalla circolazione.

La commissione di base è calcolata con una formula che confronta le dimensioni del blocco precedente (la quantità di gas usata per tutte le transazioni) con le dimensioni di quello corrente. La commissione di base aumenta di un massimo del 12,5% per blocco se la dimensione prevista del blocco viene superata. Questa crescita esponenziale rende economicamente impensabile che la dimensione del blocco resti elevata per un tempo indefinito.

| Numero del blocco | Gas Incluso | Aumento della commissione | Tariffa base corrente |
| ----------------- | ----------: | ------------------------: | --------------------: |
| 1                 |         15M |                        0% |              100 gwei |
| 2                 |         30M |                        0% |              100 gwei |
| 3                 |         30M |                     12,5% |            112,5 gwei |
| 4                 |         30M |                     12,5% |            126,6 gwei |
| 5                 |         30M |                     12,5% |            142,4 gwei |
| 6                 |         30M |                     12,5% |            160,2 gwei |
| 7                 |         30M |                     12,5% |            180,2 gwei |
| 8                 |         30M |                     12,5% |            202,7 gwei |

Rispetto al mercato del gas basato su aste prima dell'Aggiornamento di Londra, questa modifica del meccanismo delle commissioni sulle transazioni ha reso più affidabile la previsione delle commissioni. Secondo la tabella che precede, per creare una transazione sul blocco numero 9, un portafoglio indica all'utente con certezza che la **commissione di base massima** da aggiungere al blocco successivo è `commissione di base corrente * 12,5%` o `202,7 gwei * 12,5% = 228,1 gwei`.

Inoltre, è importante notare che, vista la velocità con cui la commissione di base aumenta mentre si avanza verso un blocco completo, è improbabile assistere a picchi prolungati di blocchi completi.

| Numero del blocco | Gas Incluso | Aumento della commissione | Tariffa base corrente |
| ----------------- | ----------: | ------------------------: | --------------------: |
| 30                |         30M |                     12,5% |          2.705,6 gwei |
| ...               |         ... |                     12,5% |                   ... |
| 50                |         30M |                     12,5% |         28.531,3 gwei |
| ...               |         ... |                     12,5% |                   ... |
| 100               |         30M |                     12,5% |     10.302.608,6 gwei |

### Commissione prioritaria (mance) {#priority-fee}

Prima dell'Aggiornamento di Londra, i miner avrebbero ricevuto la commissione del gas totale da ogni transazione inclusa in un blocco.

In virtù del fatto che la nuova commissione di base viene bruciata, l'Aggiornamento di Londra ha introdotto una commissione prioritaria (mancia) per incentivare i miner a includere una transazione nel blocco. Senza mance, i miner troverebbero economicamente conveniente minare blocchi vuoti, poiché riceverebbero la stessa ricompensa. In condizioni normali, una piccola mancia fornisce ai miner un incentivo minimo per includere una transazione. Per le transazioni che devono essere prioritariamente eseguite prima di altre nello stesso blocco, occorrerà una mancia più cospicua per tentare di superare le transazioni concorrenti.

### Commissione massima {#maxfee}

Per eseguire una transazione sulla rete, gli utenti possono specificare un limite massimo che sono disposti a pagare affinché la loro transazione venga eseguita. Questo parametro facoltativo è noto come `maxFeePerGas`. Affinché una transazione venga eseguita, la commissione massima deve essere maggiore della somma della commissione di base e della mancia. Il mittente della transazione riceve il rimborso della differenza tra la commissione massima e la somma della commissione di base e della mancia.

### Calcolo delle commissioni {#calculating-fees}

Uno dei benefici principali ottenuti con l'Aggiornamento di Londra è il miglioramento dell'esperienza dell'utente nella definizione delle commissioni sulle transazioni. Per i portafogli che supportano l'aggiornamento, invece di dichiarare esplicitamente quanto si è disposti a pagare per far elaborare la transazione, i fornitori del portafoglio imposteranno automaticamente una commissione sulle transazioni consigliata (commissione di base + commissione prioritaria consigliata) per ridurre la quantità di complessità gravante sugli utenti.

## EIP-1559 {#eip-1559}

L'implementazione dell'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) nell'Aggiornamento di Londra ha reso il meccanismo delle commissioni sulle transazioni più complesso rispetto al precedente sistema basato su aste dei prezzi del gas, ma ha il vantaggio di rendere le commissioni del gas più prevedibili, migliorando l'efficienza del mercato delle commissioni sulle transazioni. Gli utenti possono inviare transazioni con una `maxFeePerGas` corrispondente a quanto sono disposti a pagare affinché la transazione sia eseguita, sapendo che non pagheranno di più del prezzo di mercato del gas (`baseFeePerGas`) e otterranno il rimborso di qualsiasi extra, tranne la mancia.

Questo video spiega l'EIP-1559 e i vantaggi che comporta:

<YouTube id="MGemhK9t44Q" />

Se sei interessato, puoi leggere [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).

Approfondisci con queste [Risorse dell'EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## Perché esistono le commissioni del gas? {#why-do-gas-fees-exist}

In breve, le commissioni del gas aiutano a proteggere la rete di Ethereum. Richiedendo una commissione per ogni calcolo eseguito sulla rete, impediamo agli utenti malevoli di compiere spam sulla rete. Per evitare cicli infiniti accidentali od ostili oppure altri sprechi di calcolo nel codice, ogni transazione deve definire un limite al numero di passaggi di calcolo dell'esecuzione del codice che può utilizzare. L'unità fondamentale di calcolo è il "gas".

Sebbene una transazione preveda un limite, tutto il gas non utilizzato in una transazione viene rimborsato all'utente (ciò che viene restituito è: `commissione massima - (commissione di base + mancia)`).

![Diagramma che mostra come viene rimborsato il gas inutilizzato](../transactions/gas-tx.png) _Diagramma adattato da [Ethereum EVM illustrato](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cosa si intende con limite di gas? {#what-is-gas-limit}

Il limite di gas si riferisce all'importo massimo di gas che si è disposti a consumare in una transazione. Le transazioni più complicate che coinvolgono i [contratti intelligenti](/developers/docs/smart-contracts/), richiedono un maggiore lavoro di calcolo e quindi un limite di gas maggiore rispetto a un semplice pagamento. Un trasferimento standard di ETH richiede un limite di gas di 21.000 unità di gas.

Ad esempio, se imposti un limite di gas di 50.000 per un semplice trasferimento di ETH, l'EVM ne consumerebbe 21.000 unità e restituirebbe le 29.000 rimanenti. Tuttavia, se specifichi troppo poco gas, ad esempio un limite di gas di 20.000 per un semplice trasferimento di ETH, l'EVM consumerà le tue 20.000 unità di gas tentando di soddisfare la transazione, ma non la completerà. A quel punto l'EVM annulla ogni modifica, ma dato che il miner ha già eseguito un lavoro pari a 20.000 unità di gas, questo gas viene consumato.

## Perché le commissioni del gas possono esser così elevate? {#why-can-gas-fees-get-so-high}

Le commissioni del gas elevate sono dovute alla popolarità di Ethereum. Eseguire qualsiasi operazione su Ethereum richiede il consumo di gas, ma lo spazio del gas per blocco è limitato. Le commissioni sono utilizzate per pagare i calcoli, l'archiviazione o la manipolazione di dati, o ancora il trasferimento di token, tutte operazioni che consumano diverse quantità di unità di "carburante". All'aumentare della complessità delle funzionalità delle dApp, cresce anche il numero di operazioni eseguite da un contratto intelligente, il che significa che ogni transazione occupa più spazio in un blocco di dimensioni limitate. Se c'è troppa domanda, gli utenti devono offrire una mancia di importo maggiore per provare a superare le transazioni degli altri utenti. Una mancia più cospicua può rendere più probabile che la tua transazione troverà posto nel blocco successivo.

Il prezzo del gas da solo in realtà non determina quanto dobbiamo pagare per una specifica transazione. Per calcolare la commissione sulla transazione dobbiamo moltiplicare il gas usato per la commissione base, misurata in gwei.

## Iniziative per ridurre i costi del gas {#initiatives-to-reduce-gas-costs}

Gli [aggiornamenti di scalabilità](/roadmap/) di Ethereum dovrebbero infine risolvere alcuni problemi delle commissioni del gas, che, a loro volta, consentiranno alla piattaforma di elaborare migliaia di transazioni al secondo e di scalare globalmente.

Il ridimensionamento del Livello 2 è un'iniziativa fondamentale per migliorare notevolmente i costi del gas, l'esperienza utente e la scalabilità. [Maggiori informazioni sul ridimensionamento del Livello 2](/developers/docs/scaling/#layer-2-scaling).

## Strategie utili per ridurre i costi del gas {#strategies-for-you-to-reduce-gas-costs}

Se stai cercando di ridurre i costi del carburante per le tue transazioni, puoi impostare una mancia per indicare il livello di priorità della tua transazione. I miner anteporranno ed eseguiranno le transazioni che offrono una mancia maggiore per il gas, poiché terranno le mance pagate dall'utente e saranno meno inclini a eseguire transazioni che prevedono mance inferiori.

Se desideri monitorare i prezzi del gas, così da poter inviare i tuoi ETH a un costo inferiore, puoi usare molti strumenti differenti, come:

- [Etherscan](https://etherscan.io/gastracker): _Strumento di stima del prezzo del gas delle transazioni_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm): _Estensione di stima del gas di Chrome che supporta sia transazioni ereditarie di Tipo 0 che transazioni EIP-1559 di Tipo 2._

- [ETH Gas Station](https://ethgasstation.info/): _Strumenti di misurazione orientati al cliente per il mercato del gas di Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator): _Calcola le commissioni del gas nella tua valuta locale per diversi tipi di transazione sulla Rete Principale, su Arbitrum e su Polygon._

## Strumenti correlati {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas): _API di stima del gas sviluppata dalla piattaforma di dati della mempool globale di Blocknative_

## Letture consigliate {#further-reading}

- [Spiegazione del Gas di Ethereum](https://defiprime.com/gas)
- [Ridurre il consumo di gas dei tuoi Contratti Intelligenti](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Proof of Stake contro Proof of Work](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Strategie di ottimizzazione del carburante per sviluppatori](https://www.alchemy.com/overviews/solidity-gas-optimization)

## Argomenti correlati {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
