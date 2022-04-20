---
title: Transazioni
description: "Panoramica sulle transazioni Ethereum: come funzionano, struttura dati e come inviarle tramite un'applicazione."
lang: it
sidebar: true
---

Le transazioni sono istruzioni firmate crittograficamente da account. Un account avvia una transazione per aggiornare lo stato della rete Ethereum. La transazione più semplice è il trasferimento di ETH da un account ad un altro.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo di leggere innanzitutto la sezione [Account](/developers/docs/accounts/) e la nostra [introduzione ad Ethereum](/developers/docs/intro-to-ethereum/).

## Cos'è una transazione? {#whats-a-transaction}

Per transazione Ethereum si intende un'azione iniziata da un account controllato dall'esterno (externally-owned), in altre parole gestito dall'uomo e non da un contratto. Per esempio, se Bob manda ad Alice 1 ETH, l'importo verrà addebitato sull'account di Bob e accreditato su quello di Alice. Questa azione che modifica lo stato avviene all'interno di una transazione.

![Diagramma che mostra un cambiamento di stato causato da una transazione](./tx.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Le transazioni, che cambiano lo stato dell'EVM, devono essere trasmesse all'intera rete. Ogni nodo può trasmettere una richiesta di esecuzione di una transazione sull'EVM; in seguito, un miner eseguirà la transazione e propagherà il cambiamento di stato che ne risulta al resto della rete.

Le transazioni richiedono una commissione e deve essere eseguito il mining affinché siano valide. Per semplificare questa spiegazione, parleremo in altra sede di commissioni e di mining.

Una transazione inviata contiene le seguenti informazioni:

- `recipient` – L'indirizzo ricevente (se si tratta di un account di proprietà esterna, la transazione trasferirà valore. Se si tratta di un contratto, la transazione eseguirà il codice del contratto)
- `signature` – Identificatore del mittente. Viene generata quando la chiave privata del mittente firma la transazione e conferma che il mittente ha autorizzato la transazione
- `value` – Quantità di ETH da trasferire dal mittente al destinatario (in WEI, un taglio dell'ETH)
- `data` – Campo opzionale per includere dati arbitrari
- `gasLimit` – Importo massimo di unità di carburante che possono essere consumate dalla transazione. Le unità di carburante rappresentano fasi di calcolo
- `maxPriorityFeePerGas` - la quantità massima di carburante da includere come mancia al miner
- `maxFeePerGas` - la quantità massima di carburante che si è disposti a pagare per la transazione (comprensiva di `baseFeePerGas` e `maxPriorityFeePerGas`)

Per carburante si intende il calcolo necessario perché un miner elabori la transazione. Gli utenti devono pagare una commissione per questo calcolo. Il `gasLimit` e la `maxPriorityFeePerGas` determinano la commissione sulle transazioni massima pagata al miner. [Maggiori informazioni sul carburante](/developers/docs/gas/).

L'oggetto della transazione sarà qualcosa del genere:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300"
  maxPriorityFeePerGas: "10"
  nonce: "0",
  value: "10000000000",
}
```

Ma l'oggetto di una transazione deve essere firmato utilizzando la chiave privata del mittente. Questo prova che la transazione è stata originata solo dal mittente e non è stata inviata in modo fraudolento.

Un client Ethereum come Geth gestirà il processo di firma.

Esempio di chiamata [JSON-RPC](https://eth.wiki/json-rpc/API):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Esempio di risposta:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` è la transazione firmata in formato codificato Recursive Length Prefix (RLP)
- `tx` è la transazione firmata in formato JSON

Con l'hash di firma, la transazione può provare crittograficamente che proviene dal mittente ed è stata inviata alla rete.

## Tipi di transazioni {#types-of-transactions}

Su Ethereum esistono diversi tipi di transazioni:

- Transazioni ordinarie: una transazione da un portafoglio a un altro.
- Transazioni di distribuzione del contratto: una transazione senza un indirizzo 'to', in cui il campo dei dati è usato per il codice del contratto.

### Carburante {#on-gas}

Come accennato, le transazioni hanno un costo in [carburante](/developers/docs/gas/) per essere eseguite. Semplici transazioni di trasferimento richiedono 21000 unità di carburante.

Quindi per poter inviare 1 ETH ad Alice con una `baseFeePerGas` di 190 gwei e una `maxPriorityFeePerGas` di 10 gwei, Bob dovrà pagare la seguente commissione:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Sull'account di Bob verranno addebitati **-1,0042 ETH**

Sull'account di Alice verranno accreditati **+1,0 ETH**

La commissione base brucerà **-0,00399 ETH**

Il miner riceverà una mancia di **+0,000210 ETH**

Il carburante è richiesto anche per ogni interazione con Smart Contract.

![Diagramma che mostra come viene rimborsato il carburante inutilizzato](./gas-tx.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Il carburante non utilizzato viene rimborsato sull'account dell'utente.

## Ciclo di vita delle transazioni {#transaction-lifecycle}

Una volta inviata una transazione, succede quanto segue:

1. Una volta inviata una transazione, viene generato un hash crittografico della transazione: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. La transazione viene poi inviata alla rete e inclusa in un gruppo di molte altre transazioni.
3. Un miner deve scegliere la transazione e includerla in un blocco per verificarla e considerarla "riuscita".
   - In questa fase potrebbero esserci tempi di attesa se la rete è congestionata e i miner non riescono a tenere il passo.
4. La tua transazione riceverà delle "conferme". Il numero di conferme è il numero di blocchi creati dopo il blocco che includeva la tua transazione. Più alto è il numero, maggiore è la certezza che la rete abbia elaborato e riconosciuto la transazione.
   - I blocchi recenti potrebbero essere riorganizzati, dando l'impressione che la transazione non sia andata a buon fine; tuttavia, la transazione potrebbe comunque essere valida ma inclusa in un blocco differente.
   - La probabilità di riorganizzazione diminuisce con ogni blocco consecutivo minato, ad es. maggiore il numero delle conferme, più immutabile è la transazione.

## Dimostrazione visiva {#a-visual-demo}

Austin ci illustra transazioni, carburante e mining.

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope {#typed-transaction-envelope}

In origine Ethereum aveva un solo formato per le transazioni. Ogni transazione conteneva nonce, prezzo del carburante, limite del carburante, indirizzo di destinazione, valore, dati, v, r e s. Questi campi sono codificati in RLP e somigliano a qualcosa del genere:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum si è evoluto per supportare diversi tipi di transazioni e consentire l'implementazione di nuove funzionalità, come gli elenchi d'accesso, [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), senza interferire sui precedenti formati di transazione.

[EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718) definisce un tipo di transazione che rappresenta una busta (envelope) per i tipi di transazione futuri.

L'EIP-2718 è una nuova busta generalizzata per le transazioni tipizzate. Nel nuovo standard, le transazioni sono interpretate come:

`TransactionType || TransactionPayload`

Dove i campi sono definiti come:

- `TransactionType` - un numero tra 0 e 0x7f, per un totale di 128 tipi di transazione possibili.
- `TransactionPayload` - un insieme arbitrario di byte definito dal tipo di transazione.

## Lettura consigliate {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Account](/developers/docs/accounts/)
- [Macchina virtuale Ethereum (EVM)](/developers/docs/evm/)
- [Carburante](/developers/docs/gas/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
