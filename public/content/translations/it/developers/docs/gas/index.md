---
title: Gas e commissioni
metaTitle: "Gas e commissioni Ethereum: panoramica tecnica"
description: Scopri le commissioni del gas di Ethereum, come vengono calcolate e il loro ruolo nella sicurezza della rete e nell'elaborazione delle transazioni.
lang: it
---

Il gas è essenziale per la rete di Ethereum. È il carburante che gli consente di operare, proprio come un'automobile lo necessita per funzionare.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le [transazioni](/developers/docs/transactions/) e l'[EVM](/developers/docs/evm/).

## Cos'è il gas? {#what-is-gas}

Gas fa riferimento all'unità che misura la quantità di sforzo di calcolo necessario per eseguire operazioni specifiche sulla rete di Ethereum.

Poiché ogni transazione di Ethereum richiede risorse computazionali per essere eseguita, queste risorse devono essere pagate per assicurare che Ethereum non sia vulnerabile a spam e che non si blocchi in cicli computazionali infiniti. Il pagamento per il calcolo è fatto sotto forma di commissioni di carburante (comunemente chiamato gas).

La commissione del gas è **la quantità di gas utilizzata per eseguire un'operazione, moltiplicata per il costo per unità di gas**. La commissione viene pagata indipendentemente dal fatto che la transazione abbia successo o fallisca.

![Un diagramma che mostra dove è necessario il gas nelle operazioni EVM](./gas.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Le commissioni del gas devono essere pagate nella valuta nativa di Ethereum, l'ether (ETH). I prezzi del gas sono solitamente riportati in gwei, che è una sottounità di ETH. Ogni gwei equivale ad un miliardesimo di ETH (0,000000001 ETH or 10<sup>-9</sup> ETH).

Per esempio, invece di dire che il gas costa 0,000000001 ether, puoi dire che costa 1 gwei.

La parola 'gwei' è l'abbreviazione di 'giga-wei', che significa 'miliardo di wei'. Un gwei equivale ad un miliardo di wei. Wei stesso (che prende il nome da [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), creatore di [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) è la più piccola unità di ETH.

## Come sono calcolate le commissioni del gas? {#how-are-gas-fees-calculated}

Quando invii una transazione, puoi impostare la quantità di gas che sei disposto a pagare. Offrendo una certa quantità di gas, stai facendo un'offerta per includere la tua transazione nel prossimo blocco. Se offri troppo poco, i validatori saranno meno disposti a scegliere la tua transazione per includerla, il che significa che la tua transazione potrebbe essere eseguita in ritardo o non essere eseguita affatto. Se offri troppo, potresti rischiare di sprecare un po' di ETH. Quindi, come si fa a capire quanto pagare?

Il gas totale pagato è diviso in due componenti: la `commissione di base` e la `commissione di priorità` (mancia).

La `commissione di base` è impostata dal protocollo: devi pagare almeno questo importo affinché la tua transazione sia considerata valida. La `commissione di priorità` è una mancia che si aggiunge alla commissione di base per rendere la transazione interessante per i validatori, in modo che la scelgano per l'inclusione nel blocco successivo.

Una transazione che paga solo la `commissione di base` è tecnicamente valida, ma è improbabile che venga inclusa perché non offre alcun incentivo ai validatori per sceglierla rispetto a qualsiasi altra transazione. La `commissione di priorità` 'corretta' è determinata dall'utilizzo della rete al momento dell'invio della transazione: se la domanda è alta, potrebbe essere necessario impostare una `commissione di priorità` più alta, ma quando la domanda è minore, si può pagare di meno.

Ad esempio, ipotizziamo che Jordan debba pagare 1 ETH a Taylor. Il trasferimento di ETH richiede 21.000 unità di gas, e la commissione base è di 10 gwei. Jordan include una mancia di 2 gwei.

La commissione totale sarebbe ora pari a:

`unità di gas usato * (commissione base + commissione prioritaria)`

dove la `commissione di base` è un valore impostato dal protocollo e la `commissione di priorità` è un valore impostato dall'utente come mancia per il validatore.

ad es., `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Quando Jordan invia il denaro, dal suo conto sono sottratti 1,000252 ETH. Taylor riceve un accredito di 1,0000 ETH. Il validatore riceve la mancia di 0,000042 ETH. La `commissione di base` di 0,00021 ETH viene bruciata.

### Commissione di base {#base-fee}

Ogni blocco ha una commissione di base che funge da prezzo di riserva. Per poter essere inseriti in un blocco, il prezzo offerto per il gas deve essere pari almeno alla commissione base. La commissione di base è calcolata indipendentemente dal blocco corrente ed è invece determinata dai blocchi che lo precedono, rendendo le commissioni sulle transazioni più prevedibili per gli utenti. Quando il blocco viene creato, questa **commissione di base viene "bruciata"**, rimuovendola dalla circolazione.

La commissione di base viene calcolata da una formula che confronta la dimensione del blocco precedente (la quantità di gas utilizzata per tutte le transazioni) con la dimensione di destinazione (metà del limite del gas). La commissione di base aumenterà o diminuirà di un massimo del 12,5% per blocco se la dimensione del blocco di destinazione è rispettivamente superiore o inferiore all'obiettivo. Questa crescita esponenziale rende economicamente impensabile che la dimensione del blocco resti elevata per un tempo indefinito.

| Numero del blocco | Gas Incluso | Aumento della commissione | Tariffa base corrente |
| ----------------- | ----------: | ------------------------: | --------------------: |
| 1                 |         18M |                        0% |              100 gwei |
| 2                 |         36M |                        0% |              100 gwei |
| 3                 |         36M |                     12,5% |            112,5 gwei |
| 4                 |         36M |                     12,5% |            126,6 gwei |
| 5                 |         36M |                     12,5% |            142,4 gwei |
| 6                 |         36M |                     12,5% |            160,2 gwei |
| 7                 |         36M |                     12,5% |            180,2 gwei |
| 8                 |         36M |                     12,5% |            202,7 gwei |

Nella tabella precedente, viene dimostrato un esempio utilizzando 36 milioni come limite del gas. Seguendo questo esempio, per creare una transazione sul blocco numero 9, un portafoglio farà sapere all'utente con certezza che la **commissione di base massima** da aggiungere al blocco successivo è `current base fee * 112.5%` o `202.7 gwei * 112.5% = 228.1 gwei`.

Inoltre, è importante notare che, vista la velocità con cui la commissione base aumenta mentre si avanza verso un blocco completo, è improbabile assistere a picchi prolungati di blocchi completi.

| Numero del blocco                                   |                                         Gas Incluso | Aumento della commissione |                               Tariffa base corrente |
| --------------------------------------------------- | --------------------------------------------------: | ------------------------: | --------------------------------------------------: |
| 30                                                  |                                                 36M |                     12,5% |                        2.705,6 gwei |
| ... | ... |                     12,5% | ... |
| 50                                                  |                                                 36M |                     12,5% |                       28.531,3 gwei |
| ... | ... |                     12,5% | ... |
| 100                                                 |                                                 36M |                     12,5% |   10.302.608,6 gwei |

### Commissione di priorità (mance) {#priority-fee}

La commissione di priorità (mancia) incentiva i validatori a massimizzare il numero di transazioni in un blocco, vincolati solo dal limite del gas del blocco. Senza mance, un validatore razionale potrebbe includere meno transazioni, o addirittura nessuna, senza alcuna penalità diretta a livello di esecuzione o di consenso, poiché le ricompense dello staking sono indipendenti dal numero di transazioni in un blocco. Inoltre, le mance consentono agli utenti di fare un'offerta più alta di altri per ottenere la priorità all'interno dello stesso blocco, segnalando di fatto l'urgenza.

### Commissione massima {#maxfee}

Per eseguire una transazione sulla rete, gli utenti possono specificare un limite massimo che sono disposti a pagare affinché la loro transazione venga eseguita. Questo parametro facoltativo è noto come `maxFeePerGas`. Affinché una transazione venga eseguita, la commissione massima deve essere maggiore della somma della commissione di base e della mancia. Il mittente della transazione riceve il rimborso della differenza tra la commissione massima e la somma della commissione di base e della mancia.

### Dimensione del blocco {#block-size}

Ogni blocco ha una dimensione target pari alla metà del limite del gas corrente, ma la dimensione dei blocchi aumenterà o diminuirà in base alla domanda della rete, fino al raggiungimento del limite del blocco (2 volte la dimensione target del blocco). Il protocollo raggiunge in media una dimensione del blocco di equilibrio pari all'obiettivo attraverso il processo di _tâtonnement_. Significa che se la dimensione del blocco supera quella prevista, il protocollo aumenta la commissione di base per il blocco successivo. Analogamente, il protocollo riduce la commissione di base se la dimensione del blocco è inferiore a quella prevista.

L'importo della commissione base si adatta proporzionalmente alla distanza della dimensione del blocco corrente rispetto a quella prevista. Si tratta di un calcolo lineare che va da -12,5% per un blocco vuoto, a 0% alla dimensione target, fino a +12,5% per un blocco che raggiunge il limite del gas. Il limite del gas può fluttuare nel tempo in base alla segnalazione dei validatori e tramite gli aggiornamenti della rete. Puoi [visualizzare le modifiche del limite del gas nel tempo qui](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Calcolo delle commissioni del gas in pratica {#calculating-fees-in-practice}

Puoi indicare esplicitamente quanto sei disposto a pagare per far eseguire la tua transazione. Tuttavia, la maggior parte dei fornitori di portafogli imposterà automaticamente una commissione sulla transazione consigliata (commissione base + commissione prioritaria consigliata) per ridurre la complessità che grava sui propri utenti.

## Perché esistono le commissioni del gas? {#why-do-gas-fees-exist}

In breve, le commissioni del gas aiutano a proteggere la rete di Ethereum. Richiedendo una commissione per ogni calcolo eseguito sulla rete, impediamo agli utenti malevoli di compiere spam sulla rete. Per evitare cicli infiniti accidentali od ostili oppure altri sprechi di calcolo nel codice, ogni transazione deve definire un limite al numero di passaggi di calcolo dell'esecuzione del codice che può utilizzare. L'unità fondamentale di calcolo è il "gas".

Sebbene una transazione includa un limite, il gas non utilizzato in una transazione viene restituito all'utente (ad es. viene restituito `max fee - (base fee + tip)`).

![Diagramma che mostra come viene rimborsato il gas non utilizzato](../transactions/gas-tx.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cosa è il limite del gas? {#what-is-gas-limit}

Il limite di gas si riferisce all'importo massimo di gas che sei disposto a consumare in una transazione. Le transazioni più complicate che coinvolgono i [contratti intelligenti](/developers/docs/smart-contracts/) richiedono un maggiore lavoro di calcolo e quindi un limite del gas maggiore rispetto a un semplice pagamento. Un trasferimento standard di ETH richiede un limite di gas di 21.000 unità di gas.

Ad esempio, se imposti un limite di gas di 50.000 per un semplice trasferimento di ETH, l'EVM ne consumerebbe 21.000 unità e restituirebbe le 29.000 rimanenti. Tuttavia, se si specifica troppo poco gas, ad esempio un limite del gas di 20.000 per un semplice trasferimento di ETH, la transazione fallirà durante la fase di convalida. Sarà rifiutata prima di essere inclusa in un blocco e non verrà consumato alcun gas. D'altra parte, se una transazione esaurisce il gas durante l'esecuzione (ad es. un contratto intelligente consuma tutto il gas a metà), l'EVM annullerà qualsiasi modifica, ma tutto il gas fornito sarà comunque consumato per il lavoro svolto.

## Perché le commissioni del gas possono essere così elevate? {#why-can-gas-fees-get-so-high}

Le commissioni del gas elevate sono dovute alla popolarità di Ethereum. Se c'è troppa domanda, gli utenti devono offrire mance più alte per cercare di superare le transazioni degli altri utenti. Una mancia più cospicua può rendere più probabile che la tua transazione troverà posto nel blocco successivo. Inoltre, le applicazioni di contratti intelligenti più complessi potrebbero dover eseguire molte operazioni per supportare le loro funzioni, consumando molto gas.

## Iniziative per ridurre i costi del gas {#initiatives-to-reduce-gas-costs}

Gli [aggiornamenti di scalabilità](/roadmap/) di Ethereum dovrebbero infine risolvere alcuni dei problemi delle commissioni del gas, che, a loro volta, consentiranno alla piattaforma di elaborare migliaia di transazioni al secondo e di scalare a livello globale.

Il ridimensionamento del Livello 2 è un'iniziativa fondamentale per migliorare notevolmente i costi del gas, l'esperienza utente e il ridimensionamento.

[Maggiori informazioni sulla scalabilità di livello 2](/developers/docs/scaling/#layer-2-scaling)

## Monitoraggio delle commissioni del gas {#monitoring-gas-fees}

Se desideri monitorare i prezzi del gas, così da poter inviare i tuoi ETH a un costo inferiore, puoi usare molti strumenti differenti, come:

- [Etherscan](https://etherscan.io/gastracker) _Stimatore del prezzo del gas per le transazioni_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Stimatore open source del prezzo del gas per le transazioni_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitora e traccia i prezzi del gas di Ethereum e degli L2 per ridurre le commissioni sulle transazioni e risparmiare denaro_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Estensione di Chrome per la stima del gas che supporta sia le transazioni legacy di tipo 0 che le transazioni di tipo 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calcola le commissioni del gas nella tua valuta locale per diversi tipi di transazione sulla Rete Principale, Arbitrum e Polygon._

## Strumenti correlati {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API di stima del gas basata sulla piattaforma dati globale della mempool di Blocknative_
- [Gas Network](https://gas.network) Oracoli del gas sulla catena. Supporto per oltre 35 catene.

## Letture consigliate {#further-reading}

- [Spiegazione del gas di Ethereum](https://defiprime.com/gas)
- [Ridurre il consumo di gas dei tuoi Contratti Intelligenti](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategie di ottimizzazione del gas per sviluppatori](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documenti dell'EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Risorse sull'EIP-1559 di Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: separare i meccanismi dai meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
