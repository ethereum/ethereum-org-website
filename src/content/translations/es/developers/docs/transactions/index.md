---
title: Transacciones
description: "Descripción general sobre las transacciones de Ethereum: Cómo funcionan, su estructura de datos y cómo enviarlas a través de una aplicación."
lang: es
sidebar: true
---

Las transacciones son instrucciones firmadas criptográficamente que se emiten desde cuentas. Una cuenta iniciará una transacción para actualizar el estado de la red Ethereum. La transacción más sencilla es transferir ETH de una cuenta a otra.

<!-- TODO explain these 2 types of transactions -->
<!-- There are two types of transactions: those which result in message calls and those which result in contract creation. -->
<!-- Contract creation results in the creation of a new contract account containing compiled smart contract bytecode. Whenever another account makes a message call to that contract, it executes its bytecode. -->

## Requisitos previos {#prerequisites}

Para entender más el contenido de esta página, te recomendamos que leas primero la página sobre [Cuentas](/en/developers/docs/accounts/), así como nuestra [Introducción a Ethereum](/en/developers/docs/intro-to-ethereum/).

## ¿Qué es una transacción? {#whats-a-transaction}

Una transacción de Ethereum hace referencia a una acción iniciada por una cuenta de propiedad externa, en otras palabras, una cuenta controlada por un humano, no un contrato. Por ejemplo, si Bob le envía 1 ETH a Alice, este debe debitarse de la cuenta de Bob y acreditarse en la cuenta de Alice. Esta acción modificadora del estado de la red tiene lugar en una transacción.

![Diagrama que muestra cómo una transacción causa cambios de estado](./tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las transacciones, que modifican el estado de la EVM, se deben transmitir a toda la red. Cualquier nodo puede transmitir una solicitud de una transacción que se va ejecutar en la EVM; a continuación, un minero ejecutará la transacción y propagará la modificación de estado que resulte de ello al resto de la red.

Las transacciones necesitan una comisión y deben minarse para convertirse en transacciones válidas. Para simplificar esta descripción general, abarcaremos las comisiones de gas y el minado por separado.

Una transacción enviada incluye la siguiente información:

- `destinatario`: La transacción destinataria (en caso de que sea una cuenta de propiedad externa, la transacción transferirá valor. Si se trata de un contrato, la transacción ejecutará el código del contrato)
- `firma`: Identificador del remitente. Se genera cuando, mediante la clave privada, se firma la transacción y se confirma que el remitente la ha autorizado
- `valor`: Cantidad de ETH que el remitente transfiere al destinatario (en WEI, una denominación de ETH)
- `datos`: Campo opcional en el que se incluyen datos arbitrarios.
- `LímiteDeGas`: Cantidad máxima de unidades de gas que puede consumir la transacción. Las unidades de gas representan pasos computacionales
- `PrecioDeGas`: La comisión que el remitente paga por unidad de gas.

El gas es una referencia al trabajo computacional que se necesita para que el minero procese la transacción. Los usuarios tienen que pagar una comisión por ese trabajo computacional. El `límiteDeGas` y el `precioDeGas` determinan la comisión de gas máxima que se le paga al minero. [Mas ínformación acerca del gas](/en/developers/docs/gas/).

El objeto de la transacción luce de la siguiente forma:

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

Es necesario que se firme este objeto mediante la clave privada del remitente. De esta forma, se prueba que la transacción solo pudo haberla originado el remitente y que no se envió de forma fraudulenta.

Un cliente de Ethereum como Geth manejará el proceso de firmado.

Ejemplo de una llamada [JSON-RPC](https://eth.wiki/json-rpc/API):

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

Ejemplo de respuesta:

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

- la propiedad `raw` es la transacción firmada en Recursive Length Prefix (RLP)
- la propiedad `tx` es la transaccion firmada en formato JSON

Mediante el hash de la firma, se puede probar criptográficamente que la transacción se originó del remitente y que se envió a la red.

### Sobre el gas {#on-gas}

Como ya se mencionó, las transacciones cuestan [gas](/developers/docs/gas/) para ejecutarse. Las transacciones de transferencia simple requieren 21 000 unidades de Gas.

De modo que para que Bob le envíe a Alice 1ETH a un `gasPrice` de 200 Gwei, él necesitará pagar la siguiente comisión:

```
200 x 21000 = 4 200 000 GWEI
--o--
0,0042 ETH
```

La cuenta de Bobs será debitada **-1,0042 ETH**

La cuenta de Alice se acreditará **+1,0 ETH**

El procesamiento del minero de la transacción obtendrá **+0,0042 ETH**

El gas también es necesario para cualquier interacción del contrato inteligente.

![Diagrama mostrando como el gas no utilizado es retornado](./gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Cualquier gas no utilizado en una transacción es reembolsado a la cuenta de usuario.

## Ciclo de vida de la transacción {#transaction-lifecycle}

Una vez que la transacción ha sido enviada ocurre lo siguiente:

1. Una vez que envíes una transacción, la criptografía genera un hash de transacción: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. A continuación, la transacción se transmite a la red e incluida en un pool con muchas otras transacciones.
3. Un minero debe elegir tu transacción e incluirla en un bloque para verificar la transacción y considerarla "exitosa".
   - Puedes terminar esperando en esta etapa si la red está ocupada y los mineros no son capaces de mantenerse al día. Los mineros siempre priorizarán las transacciones con mayor `PRECIO DE GAS (GASPRICE)` porque consiguen mantener las comisiones.
4. Tu transición también obtendrá un número de confirmación de bloque. Este es el número de bloques creados desde el bloque en el que se incluyó tu transacción. Cuanto mayor sea el número, mayor será la certeza de que la transacción fue procesada y reconocida por la red. Esto sucede porque, a veces, puede que el bloque en el que se ha incluido tu transacción no haya entrado en la cadena.
   - Cuanto mayor sea el número de confirmación del bloque, más inmutable será la transacción. Por eso, para las transacciones con valores más altos, se precisan más confirmaciones de bloques.

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

## Una demostración visual {#a-visual-demo}

Observa a Austin mientras te guía por las transacciones, el gas y la minería. <iframe width="100%" height="315" src="https://www.youtube.com/embed/er-0ihqFQB0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Leer más {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Cuentas](/en/developers/docs/accounts/)
- [Máquina Virtual de Ethereum (MVE)](/en/developers/docs/evm/)
- [Gas](/en/developers/docs/gas/)
- [Minería](/en/developers/docs/consensus-mechanisms/pow/mining/)
