---
title: Transazioni
description: "Una panoramica delle transazioni di Ethereum: come funzionano, la loro struttura dei dati e come inviarle tramite un'applicazione."
lang: it
---

Le transazioni sono istruzioni firmate crittograficamente dagli account. Un account avvierà una transazione per aggiornare lo stato della rete [Ethereum](/). La transazione più semplice è il trasferimento di ETH da un account a un altro.

## Prerequisiti {#prerequisites}

Per aiutarti a comprendere meglio questa pagina, ti consigliamo di leggere prima [Account](/developers/docs/accounts/) e la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Cos'è una transazione? {#whats-a-transaction}

Una transazione di Ethereum si riferisce a un'azione avviata da un account controllato esternamente, in altre parole un account gestito da un essere umano, non da un contratto. Ad esempio, se Bob invia ad Alice 1 ETH, l'account di Bob deve essere addebitato e quello di Alice accreditato. Questa azione di modifica dello stato avviene all'interno di una transazione.

![Diagramma che mostra una transazione che causa un cambio di stato](./tx.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Le transazioni, che cambiano lo stato della macchina virtuale di Ethereum (EVM), devono essere trasmesse all'intera rete. Qualsiasi nodo può trasmettere una richiesta affinché una transazione venga eseguita sull'EVM; dopo che ciò accade, un validatore eseguirà la transazione e propagherà il cambiamento di stato risultante al resto della rete.

Le transazioni richiedono una commissione e devono essere incluse in un blocco convalidato. Per rendere questa panoramica più semplice, tratteremo le commissioni del gas e la convalida altrove.

Una transazione inviata include le seguenti informazioni:

- `from` – l'indirizzo del mittente, che firmerà la transazione. Questo sarà un account controllato esternamente poiché gli account dei contratti non possono inviare transazioni
- `to` – l'indirizzo di ricezione (se è un account controllato esternamente, la transazione trasferirà valore. Se è un account di un contratto, la transazione eseguirà il codice del contratto)
- `signature` – l'identificatore del mittente. Questo viene generato quando la chiave privata del mittente firma la transazione e conferma che il mittente ha autorizzato questa transazione
- `nonce` - un contatore che si incrementa in modo sequenziale e indica il numero della transazione dall'account
- `value` – la quantità di ETH da trasferire dal mittente al destinatario (denominata in WEI, dove 1 ETH equivale a 1e+18 wei)
- `input data` – campo opzionale per includere dati arbitrari
- `gasLimit` – la quantità massima di unità di gas che possono essere consumate dalla transazione. L'[EVM](/developers/docs/evm/opcodes) specifica le unità di gas richieste da ogni passaggio computazionale
- `maxPriorityFeePerGas` - il prezzo massimo del gas consumato da includere come mancia per il validatore
- `maxFeePerGas` - la commissione massima per unità di gas che si è disposti a pagare per la transazione (comprensiva di `baseFeePerGas` e `maxPriorityFeePerGas`)

Il gas è un riferimento al calcolo richiesto per elaborare la transazione da parte di un validatore. Gli utenti devono pagare una commissione per questo calcolo. Il `gasLimit` e la `maxPriorityFeePerGas` determinano la commissione della transazione massima pagata al validatore. [Maggiori informazioni sul Gas](/developers/docs/gas/).

L'oggetto della transazione avrà un aspetto simile a questo:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Ma un oggetto della transazione deve essere firmato utilizzando la chiave privata del mittente. Questo dimostra che la transazione può provenire solo dal mittente e non è stata inviata in modo fraudolento.

Un client di Ethereum come Geth gestirà questo processo di firma.

Esempio di chiamata [JSON-RPC](/developers/docs/apis/json-rpc):

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

- `raw` è la transazione firmata in forma codificata [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` è la transazione firmata in formato JSON

Con l'hash della firma, si può dimostrare crittograficamente che la transazione proviene dal mittente ed è stata inviata alla rete.

### Il campo dati {#the-data-field}

La stragrande maggioranza delle transazioni accede a un contratto da un account controllato esternamente.
La maggior parte dei contratti è scritta in Solidity e interpreta il proprio campo dati in conformità con l'[interfaccia binaria dell'applicazione (ABI)](/glossary/#abi).

I primi quattro byte specificano quale funzione chiamare, utilizzando l'hash del nome della funzione e dei suoi argomenti.
A volte puoi identificare la funzione dal selettore utilizzando [questo database](https://www.4byte.directory/signatures/).

Il resto dei calldata sono gli argomenti, [codificati come specificato nelle specifiche dell'ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Ad esempio, diamo un'occhiata a [questa transazione](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Usa **Click to see More** per vedere i calldata.

Il selettore della funzione è `0xa9059cbb`. Ci sono diverse [funzioni note con questa firma](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
In questo caso [il codice sorgente del contratto](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) è stato caricato su Etherscan, quindi sappiamo che la funzione è `transfer(address,uint256)`.

Il resto dei dati è:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Secondo le specifiche dell'ABI, i valori interi (come gli indirizzi, che sono interi a 20 byte) appaiono nell'ABI come parole a 32 byte, riempite con zeri all'inizio.
Quindi sappiamo che l'indirizzo `to` è [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
Il `value` è 0x3b0559f4 = 990206452.

## Tipi di transazioni {#types-of-transactions}

Su Ethereum ci sono alcuni tipi diversi di transazioni:

- Transazioni regolari: una transazione da un account a un altro.
- Transazioni di distribuzione del contratto: una transazione senza un indirizzo 'to', in cui il campo dati viene utilizzato per il codice del contratto.
- Esecuzione di un contratto: una transazione che interagisce con un contratto intelligente distribuito. In questo caso, l'indirizzo 'to' è l'indirizzo del contratto intelligente.

### Sul gas {#on-gas}

Come accennato, l'esecuzione delle transazioni costa [gas](/developers/docs/gas/). Le transazioni di trasferimento semplici richiedono 21000 unità di Gas.

Quindi, affinché Bob invii ad Alice 1 ETH a una `baseFeePerGas` di 190 gwei e una `maxPriorityFeePerGas` di 10 gwei, Bob dovrà pagare la seguente commissione:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

L'account di Bob verrà addebitato di **-1,0042 ETH** (1 ETH per Alice + 0,0042 ETH in commissioni del gas)

L'account di Alice verrà accreditato di **+1,0 ETH**

La commissione di base verrà bruciata **-0,00399 ETH**

Il validatore trattiene la mancia **+0,000210 ETH**


![Diagramma che mostra come viene rimborsato il gas non utilizzato](./gas-tx.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Qualsiasi gas non utilizzato in una transazione viene rimborsato all'account dell'utente.

### Interazioni con i contratti intelligenti {#smart-contract-interactions}

Il gas è richiesto per qualsiasi transazione che coinvolga un contratto intelligente.

I contratti intelligenti possono anche contenere funzioni note come funzioni [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) o [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), che non alterano lo stato del contratto. Pertanto, chiamare queste funzioni da un account controllato esternamente (EOA) non richiederà alcun gas. La chiamata RPC sottostante per questo scenario è [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

A differenza di quando vi si accede utilizzando `eth_call`, queste funzioni `view` o `pure` sono anche comunemente chiamate internamente (cioè, dal contratto stesso o da un altro contratto), il che costa gas.

## Ciclo di vita della transazione {#transaction-lifecycle}

Una volta inviata la transazione, accade quanto segue:

1. Viene generato crittograficamente un hash della transazione:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. La transazione viene quindi trasmessa alla rete e aggiunta a un pool di transazioni costituito da tutte le altre transazioni di rete in sospeso.
3. Un validatore deve prelevare la tua transazione e includerla in un blocco per verificare la transazione e considerarla "riuscita".
4. Col passare del tempo, il blocco contenente la tua transazione verrà aggiornato a "giustificato" e poi a "finalizzato". Questi aggiornamenti rendono molto più certo che la tua transazione sia andata a buon fine e non verrà mai alterata. Una volta che un blocco è "finalizzato", potrebbe essere modificato solo da un attacco a livello di rete che costerebbe molti miliardi di dollari.

## Una demo visiva {#a-visual-demo}

Guarda Austin che ti guida attraverso le transazioni, il gas e il mining.

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope {#typed-transaction-envelope}

In origine, Ethereum aveva un solo formato per le transazioni. Ogni transazione conteneva un nonce, il prezzo del gas, il limite del gas, l'indirizzo di destinazione (to), il valore, i dati, v, r e s. Questi campi sono [codificati in RLP](/developers/docs/data-structures-and-encoding/rlp/), per apparire in questo modo:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum si è evoluto per supportare più tipi di transazioni per consentire l'implementazione di nuove funzionalità come le liste di accesso e l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) senza influire sui formati delle transazioni legacy.

L'[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) è ciò che consente questo comportamento. Le transazioni vengono interpretate come:

`TransactionType || TransactionPayload`

Dove i campi sono definiti come:

- `TransactionType` - un numero compreso tra 0 e 0x7f, per un totale di 128 possibili tipi di transazione.
- `TransactionPayload` - un array di byte arbitrario definito dal tipo di transazione.

In base al valore di `TransactionType`, una transazione può essere classificata come:

1. **Transazioni di Tipo 0 (Legacy):** Il formato di transazione originale utilizzato sin dal lancio di Ethereum. Non includono funzionalità dell'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) come i calcoli dinamici delle commissioni del gas o le liste di accesso per i contratti intelligenti. Le transazioni legacy non hanno un prefisso specifico che indichi il loro tipo nella loro forma serializzata, iniziando con il byte `0xf8` quando si utilizza la codifica [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp). Il valore TransactionType per queste transazioni è `0x0`.

2. **Transazioni di Tipo 1:** Introdotte nell'[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) come parte dell'[Aggiornamento Berlin](/ethereum-forks/#berlin) di Ethereum, queste transazioni includono un parametro `accessList`. Questo elenco specifica gli indirizzi e le chiavi di archiviazione a cui la transazione prevede di accedere, aiutando a ridurre potenzialmente i costi del [gas](/developers/docs/gas/) per transazioni complesse che coinvolgono contratti intelligenti. Le modifiche al mercato delle commissioni dell'EIP-1559 non sono incluse nelle transazioni di Tipo 1. Le transazioni di Tipo 1 includono anche un parametro `yParity`, che può essere `0x0` o `0x1`, indicando la parità del valore y della firma secp256k1. Sono identificate iniziando con il byte `0x01` e il loro valore TransactionType è `0x1`.

3. **Transazioni di Tipo 2**, comunemente chiamate transazioni EIP-1559, sono transazioni introdotte nell'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), nell'[Aggiornamento London](/ethereum-forks/#london) di Ethereum. Sono diventate il tipo di transazione standard sulla rete Ethereum. Queste transazioni introducono un nuovo meccanismo di mercato delle commissioni che migliora la prevedibilità separando la commissione della transazione in una commissione di base e una commissione di priorità. Iniziano con il byte `0x02` e includono campi come `maxPriorityFeePerGas` e `maxFeePerGas`. Le transazioni di Tipo 2 sono ora l'impostazione predefinita grazie alla loro flessibilità ed efficienza, particolarmente favorite durante i periodi di elevata congestione della rete per la loro capacità di aiutare gli utenti a gestire le commissioni delle transazioni in modo più prevedibile. Il valore TransactionType per queste transazioni è `0x2`.

4. **Transazioni di Tipo 3 (Blob)** sono state introdotte nell'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) come parte dell'[Aggiornamento Dencun](/ethereum-forks/#dencun) di Ethereum. Queste transazioni sono progettate per gestire i dati "blob" (Binary Large Objects) in modo più efficiente, avvantaggiando in particolare i rollup di livello 2 fornendo un modo per pubblicare dati sulla rete Ethereum a un costo inferiore. Le transazioni blob includono campi aggiuntivi come `blobVersionedHashes`, `maxFeePerBlobGas` e `blobGasPrice`. Iniziano con il byte `0x03` e il loro valore TransactionType è `0x3`. Le transazioni blob rappresentano un miglioramento significativo nella disponibilità dei dati e nelle capacità di scalabilità di Ethereum.

5. **Transazioni di Tipo 4** sono state introdotte nell'[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) come parte dell'[Aggiornamento Pectra](/roadmap/pectra/) di Ethereum. Queste transazioni sono progettate per essere compatibili in avanti con l'astrazione dell'account. Consentono agli EOA di comportarsi temporaneamente come account di contratti intelligenti senza compromettere la loro funzionalità originale. Includono un parametro `authorization_list`, che specifica il contratto intelligente a cui l'EOA delega la propria autorità. Dopo la transazione, il campo del codice dell'EOA avrà l'indirizzo del contratto intelligente delegato.

## Letture consigliate {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Account](/developers/docs/accounts/)
- [Macchina virtuale di Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)