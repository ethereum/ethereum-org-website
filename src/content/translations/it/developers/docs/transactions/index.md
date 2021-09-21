---
title: Transazioni
description: "Panoramica sulle transazioni Ethereum: come funzionano, struttura dati e come inviarle tramite un'applicazione."
lang: it
sidebar: true
---

Le transazioni sono istruzioni firmate crittograficamente da account. Un account avvia una transazione per aggiornare lo stato della rete Ethereum. La transazione più semplice è il trasferimento di ETH da un account ad un altro.

<!-- TODO explain these 2 types of transactions -->
<!-- There are two types of transactions: those which result in message calls and those which result in contract creation. -->
<!-- Contract creation results in the creation of a new contract account containing compiled smart contract bytecode. Whenever another account makes a message call to that contract, it executes its bytecode. -->

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, raccomandiamo di leggere la sezione [Account](/en/developers/docs/accounts/) e la nostra [introduzione ad Ethereum](/en/developers/docs/intro-to-ethereum/).

## Cos'è una transazione? {#whats-a-transaction}

Con transazione Ethereum ci si riferisce ad un'azione iniziata da un account di proprietà esterna, in altre parole gestito dall'uomo e non da un contratto. Per esempio, se Bob manda ad Alice 1 ETH, sull'account di Bob verrà addebitato l'importo e su quello di Alice accreditato. Questa azione che modifica lo stato avviene all'interno di una transazione.

![Diagramma che mostra un cambiamento di stato causato da una transazione](./tx.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Le transazioni, che cambiano lo stato dell'EVM, devono essere trasmesse all'intera rete. Ogni nodo può trasmettere una richiesta di esecuzione di una transazione sull'EVM; in seguito, un miner eseguirà la transazione e propagherà il cambiamento di stato risultante al resto della rete.

Le transazioni richiedono una commissione e ne deve essere eseguito il mining affinché siano valide. Per semplificare questa spiegazione, parleremo in altra sede di commissioni e di mining.

Una transazione inviata contiene le seguenti informazioni:

- `recipient` – L'indirizzo ricevente (se si tratta di un account di proprietà esterna, la transazione trasferirà valore. Se si tratta di un contratto, la transazione eseguirà il codice del contratto)
- `signature` – Identificatore del mittente. Viene generata quando la chiave privata del mittente firma la transazione e conferma che il mittente ha autorizzato la transazione
- `value` – Quantità di ETH da trasferire dal mittente al destinatario (in WEI, un taglio dell'ETH)
- `data` – Campo opzionale per includere dati arbitrari
- `gasLimit` – Importo massimo di unità di carburante che possono essere consumate dalla transazione. Le unità di carburante rappresentano fasi di calcolo
- `gasPrice` – Commissione che il mittente paga per unità di carburante

Il carburante è un riferimento per il calcolo necessario perché un miner elabori la transazione. Gli utenti devono pagare una commissione per questo calcolo. Il `gasLimit` e il `gasPrice` determinano la commissione massima sulla transazione pagata al miner. [Maggiori informazioni sul carburante](/en/developers/docs/gas/).

L'oggetto della transazione sarà qualcosa del genere:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  gasPrice: "200",
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
      "gasPrice": "0x1234",
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
      "gasPrice": "0x1234",
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

Con l'hash di firma, la transazione può provare crittograficamente che arriva dal mittente ed è stata inviata alla rete.

### Carburante {#on-gas}

Come accennato, le transazioni hanno un costo in [carburante](/developers/docs/gas/) per essere eseguite. Semplici transazioni di trasferimento richiedono 21000 unità di carburante.

Quindi Bob, per inviare ad Alice 1 ETH con un `gasPrice` di 200 Gwei, dovrà pagare la seguente commissione:

```
200*21000 = 4,200,000 GWEI
--or--
0.0042 ETH
```

Sull'account di Bob verranno addebitati **-1,0042 ETH**

Sull'account di Alice verranno accreditati **+1,0 ETH**

Il miner che elabora la transazione riceverà **+0,0042 ETH**

Il carburante è richiesto anche per ogni interazione con Smart Contract.

![Diagramma che mostra come viene rimborsato il carburante inutilizzato](./gas-tx.png) _Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Il carburante non utilizzato viene rimborsato sull'account dell'utente.

## Ciclo di vita delle transazioni {#transaction-lifecycle}

Una volta inviata una transazione, succede quanto segue:

1. Una volta inviata una transazione, viene generato un hash crittografico della transazione: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. La transazione viene poi inviata alla rete e inclusa in un gruppo di molte altre transazioni.
3. Un miner deve scegliere la transazione e includerla in un blocco per verificarla e considerarla "riuscita".
   - In questa fase potrebbero esserci tempi di attesa se la rete è congestionata e i miner non riescono a tenere il passo. I miner daranno sempre priorità alle transazioni con più alto `GASPRICE` perché otterranno una commissione di conseguenza.
4. La transazione avrà anche un numero di conferma del blocco. Si tratta del numero dei blocchi creati fino al blocco che include la tua transazione. Più è alto il numero, maggiore è la certezza che la transazione venga elaborata e riconosciuta dalla rete. Succede questo perché a volte il blocco in cui è stata inclusa la transazione potrebbe non averla inclusa nella catena.
   - Più è alto il numero di conferma del blocco, più la transazione è immutabile. Quindi per transazioni di valore elevato è consigliabile che ci siano più conferme di blocco.

<!-- **State change**

FROM THE WHITEPAPER:

1. Check if the transaction is well-formed (ie. has the right number of values), the signature is valid, and the nonce matches the nonce in the sender's account. If not, return an error.
2. Calculate the transaction fee as `STARTGAS * GASPRICE`, and determine the sending address from the signature. Subtract the fee from the sender's account balance and increment the sender's nonce. If there is not enough balance to spend, return an error.
3. Initialize `GAS = STARTGAS`, and take off a certain quantity of gas per byte to pay for the bytes in the transaction.
4. Transfer the transaction value from the sender's account to the receiving account. If the receiving account does not yet exist, create it. If the receiving account is a contract, run the contract's code either to completion or until the execution runs out of gas.
5. If the value transfer failed because the sender did not have enough money, or the code execution ran out of gas, revert all state changes except the payment of the fees, and add the fees to the miner's account.
6. Otherwise, refund the fees for all remaining gas to the sender, and send the fees paid for gas consumed to the miner.
 -->
<!-- ## Failed transactions

A transaction can fail for a number of reasons:

- Not enough gas
  - The gas limit is too low
- Reverted -->

<!-- ## Messages

Messages are like transactions between contract accounts but they're not added to the blockchain. They allow smart contracts to call other contracts and trigger their execution.

FROM WHITEPAPER:

A message is produced when a contract currently executing code executes the `CALL` opcode, which produces and executes a message. Like a transaction, a message leads to the recipient account running its code. Thus, contracts can have relationships with other contracts in exactly the same way that external actors can.

@Sam Richards help me understand messages please :D

```
// FROM SOLIDITY DOCS
Contracts can call other contracts or send ether to non-contract accounts by the means of message calls. Message calls are similar to transactions, in that they have a source, a target, data payload, Ether, gas and return data. In fact, every transaction consists of a top-level message call which in turn can create further message calls.

A contract can decide how much of its remaining gas should be sent with the inner message call and how much it wants to retain. If an out-of-gas exception happens in the inner call (or any other exception), this will be signalled by an error value put onto the stack. In this case, only the gas sent together with the call is used up. In Solidity, the calling contract causes a manual exception by default in such situations, so that exceptions “bubble up” the call stack.

As already said, the called contract (which can be the same as the caller) will receive a freshly cleared instance of memory and has access to the call payload - which will be provided in a separate area called the calldata. After it has finished execution, it can return data which will be stored at a location in the caller’s memory preallocated by the caller.

Calls are limited to a depth of 1024, which means that for more complex operations, loops should be preferred over recursive calls.
```

<!-- Feels like this should maybe form a more advanced/complex doc that sits under transactions. Stuff like Ethers and providers need some sort of intro--><!-- ## How to send a transaction -->

<!-- `web3.eth.sendTransaction(transactionObject [, callback])` -->

<!-- Using Ethers and a provider... -->

<!-- ```js
// We require a provider to send transactions
let provider = ethers.getDefaultProvider()

let privateKey =
  "0x3141592653589793238462643383279502884197169399375105820974944592"
let wallet = new ethers.Wallet(privateKey, provider)

let amount = ethers.utils.parseEther("1.0")

let tx = {
  to: "0x88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
  // ... or supports ENS names
  // to: "ricmoo.firefly.eth",

  // We must pass in the amount as wei (1 ether = 1e18 wei), so we
  // use this convenience function to convert ether to wei.
  value: ethers.utils.parseEther("1.0"),
}

let sendPromise = wallet.sendTransaction(tx)

sendPromise.then((tx) => {
  console.log(tx)
  // {
  //    // All transaction fields will be present
  //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
  //    "from", "hash", "r", "s", "v"
  // }
})
``` -->

<!-- **Transaction requests**

Ethers

```js
{
    // Required unless deploying a contract (in which case omit)
    to: addressOrName,  // the target address or ENS name

    // These are optional/meaningless for call and estimateGas
    nonce: 0,           // the transaction nonce
    gasLimit: 0,        // the maximum gas this transaction may spend
    gasPrice: 0,        // the price (in wei) per unit of gas

    // These are always optional (but for call, data is usually specified)
    data: "0x",         // extra data for the transaction, or input for call
    value: 0,           // the amount (in wei) this transaction is sending
    chainId: 3          // the network ID; usually added by a signer
}
``` -->
<!-- **Transaction response**

```js
{
    // Only available for mined transactions
    blockHash: "0x7f20ef60e9f91896b7ebb0962a18b8defb5e9074e62e1b6cde992648fe78794b",
    blockNumber: 3346463,
    timestamp: 1489440489,

    // Exactly one of these will be present (send vs. deploy contract)
    // They will always be a properly formatted checksum address
    creates: null,
    to: "0xc149Be1bcDFa69a94384b46A1F91350E5f81c1AB",

    // The transaction hash
    hash: "0xf517872f3c466c2e1520e35ad943d833fdca5a6739cfea9e686c4c1b3ab1022e",

    // See above "Transaction Requests" for details
    data: "0x",
    from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    gasLimit: utils.bigNumberify("90000"),
    gasPrice: utils.bigNumberify("21488430592"),
    nonce: 0,
    value: utils.parseEther(1.0017071732629267),

    // The chain ID; 0 indicates replay-attack vulnerable
    // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
    chainId: 1,

    // The signature of the transaction (TestRPC may fail to include these)
    r: "0x5b13ef45ce3faf69d1f40f9d15b0070cc9e2c92f3df79ad46d5b3226d7f3d1e8",
    s: "0x535236e497c59e3fba93b78e124305c7c9b20db0f8531b015066725e4bb31de6",
    v: 37,

    // The raw transaction (TestRPC may be missing this)
    raw: "0xf87083154262850500cf6e0083015f9094c149be1bcdfa69a94384b46a1f913" +
           "50e5f81c1ab880de6c75de74c236c8025a05b13ef45ce3faf69d1f40f9d15b0" +
           "070cc9e2c92f3df79ad46d5b3226d7f3d1e8a0535236e497c59e3fba93b78e1" +
           "24305c7c9b20db0f8531b015066725e4bb31de6"
}
``` --><!-- ## How are transactions protected/safe? -->

## Demo visiva {#a-visual-demo}

Austin ci illustra transazioni, carburante e mining. <iframe width="100%" height="315" src="https://www.youtube.com/embed/er-0ihqFQB0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Account](/en/developers/docs/accounts/)
- [Macchina virtuale Ethereum (EVM)](/en/developers/docs/evm/)
- [Carburante](/en/developers/docs/gas/)
- [Mining](/en/developers/docs/consensus-mechanisms/pow/mining/)
