---
title: Transacciones
description: "Descripción general sobre las transacciones de Ethereum: Cómo funcionan, su estructura de datos y cómo enviarlas a través de una aplicación."
lang: es
---

Las transacciones son instrucciones firmadas criptográficamente que se emiten desde cuentas. Una cuenta iniciará una transacción para actualizar el estado de la red Ethereum. La transacción más sencilla es transferir ETH de una cuenta a otra.

## Requisitos previos {#prerequisites}

Para ayudarle a comprender mejor esta página, le recomendamos leer primero la sección sobre [Cuentas](/developers/docs/accounts/), así como nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una transacción? {#whats-a-transaction}

Una transacción de Ethereum hace referencia a una acción iniciada por una cuenta de propiedad externa, en otras palabras, una cuenta administrada por una persona, no un contrato. Por ejemplo, si Bob le envía 1 ETH a Alice, este debe adeudarse de la cuenta de Bob y acreditarse en la cuenta de Alice. Esta acción según la que se modifica el estado de la red tiene lugar en una transacción.

![Diagrama que muestra cómo una transacción provoca cambios de estado](./tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las transacciones, que modifican el estado de la EVM, se deben transmitir a toda la red. Cualquier nodo puede transmitir una solicitud de una transacción que se va ejecutar en la EVM; a continuación, un minero ejecutará la transacción y propagará la modificación de estado derivada al resto de la red.

Las transacciones implican el pago de una comisión y deben minarse para convertirse en transacciones válidas. Para simplificar este resumen, abarcaremos las comisiones de gas y el minado por separado.

Una transacción enviada incluye la siguiente información:

- `destinatario`: La transacción destinataria (en caso de que sea una cuenta de propiedad externa, la transacción transferirá valor. Si se trata de un contrato, la transacción ejecutará el código del contrato)
- `firma`: Identificador del remitente. Se genera cuando, mediante la clave privada, se firma la transacción y se confirma que el remitente la ha autorizado
- `valor`: Cantidad de ETH que el remitente transfiere al destinatario (en WEI, una denominación de ETH)
- `datos`: Campo opcional en el que se incluyen datos arbitrarios.
- `LímiteDeGas`: Cantidad máxima de unidades de gas que puede consumir la transacción. Las unidades de gas representan pasos computacionales
- `maxPriorityFeePerGas`: la cantidad máxima de gas que se incluirá como recompensa para el minero
- `maxFeePerGas`: la cantidad mínima de gas que se quiere pagar por la transacción (incluidas `baseFeePerGas` y `maxPriorityFeePerGas`)

El gas es una referencia al cálculo necesario para que el minero procese la transacción. Los usuarios tienen que pagar una comisión por ese cálculo. Los valores `gasLimit` y `maxPriorityFeePerGas` determinan la comisión por transacción máxima que se le paga al minero. [Mas información sobre el gas](/developers/docs/gas/).

El objeto de la transacción se verá de la siguiente forma:

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

Es necesario firmar este objeto mediante la clave privada del emisor. De esta forma, se demuestra que la transacción solo pudo haberla enviado el emisor y que no se envió de forma fraudulenta.

Un cliente de Ethereum como Geth gestionará el proceso de firma.

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

Ejemplo de respuesta:

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

- la propiedad `raw` es la transacción firmada en Recursive Length Prefix (RLP)
- la propiedad `tx` es la transaccion firmada en formato JSON

Mediante el hash de la firma, se puede demostrar criptográficamente que la transacción proviene del emisor y que se envió a la red.

### The data field {#the-data-field}

The vast majority of transactions access a contract from an externally-owned account. Most contracts are written in Solidity and interpret their data field in accordance with the [application binary interface (ABI)](/glossary/#abi).

The first four bytes specify which function to call, using the hash of the function's name and arguments. You can sometimes identify the function from the selector using [this database](https://www.4byte.directory/signatures/).

The rest of the calldata is the arguments, [encoded as specified in the ABI specs](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

For example, lets look at [this transaction](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Use **Click to see More** to see the calldata.

The function selector is `0xa9059cbb`. There are several [known functions with this signature](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). In this case [the contract source code](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) has been uploaded to Etherscan, so we know the function is `transfer(address,uint256)`.

The rest of the data is:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

According to the ABI specifications, integer values (such as addresses, which are 20-byte integers) appear in the ABI as 32-byte words, padded with zeros in the front. So we know that the `to` address is [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). The `value` is 0x3b0559f4 = 990206452.

## Tipos de transacciones {#types-of-transactions}

En Ethereum hay algunos tipos diferentes de transacciones:

- Transacciones regulares: una transacción desde una cartera a otra.
- Transacciones de despliegue de contratos: una transacción sin la dirección «a», donde el campo de datos se usa para el código de contrato.
- Execution of a contract: a transaction that interacts with a deployed smart contract. In this case, 'to' address is the smart contract address.

### Sobre el gas {#on-gas}

Tal y se ha mencionado, las transacciones necesitan [gas](/developers/docs/gas/) para ejecutarse. Las transacciones de transferencia simple requieren 21.000 unidades de gas.

De modo que, para que Bob pueda enviar a Alice 1 ETH con un coste de `baseFeePerGas` de 190 gwei y de `maxPriorityFeePerGas` de 10 gwei, Bob tendrá que pagar la siguiente comisión:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

A la cuenta de Bob se le restarán **-1,0042 ETH**

A la cuenta de Alice se añadirán **+1,0 ETH**

La comisión base que se quemará será de **0,00399 ETH**

El minero se queda con la propina (**+0.000210 ETH**)

El gas también es necesario para cualquier interacción del contrato inteligente.

![Diagrama que muestra la devolución del gas no utilizado.](./gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Cualquier gas no utilizado en una transacción es reembolsado a la cuenta de usuario.

## Ciclo de vida de la transacción {#transaction-lifecycle}

Una vez que la transacción ha sido enviada ocurre lo siguiente:

1. Una vez que envíes una transacción, la criptografía genera un hash de transacción: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. A continuación, la transacción se transmite a la red e incluida en un pool con muchas otras transacciones.
3. Un minero debe elegir tu transacción e incluirla en un bloque para verificar la transacción y considerarla "exitosa".
   - Puede que deba esperar en esta fase si la red está ocupada y los mineros no son capaces de mantenerse al día.
4. Tu transacción recibirá «confirmaciones». El número de confirmaciones indica el número de bloques creados desde el bloque en el cual se incluyó su transacción. Cuanto mayor sea el número, mayor será la certeza de que la red procesó y reconoció la transacción.
   - Los bloques recientes pueden sufrir un proceso de reorganización, con lo que dará la impresión de que la transacción ha fallado. Sin embargo, es posible que la transacción todavía sea válida pero que se incluya en otro bloque.
   - La probabilidad de que se lleve a cabo una reorganización disminuye con cada bloque minado posterior, es decir, cuanto mayor es el número de confirmaciones, más inmutable es la transacción.

## Una demostración visual {#a-visual-demo}

Observa a Austin mientras te guía por las transacciones, el gas y la minería.

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope {#typed-transaction-envelope}

Inicialmente, Ethereum tenía un formato único para las transacciones. Cada transacción contenía un nonce, un precio de gas, un límite de gas, una dirección, un importe, datos, y v, r y s. Estos campos se codifican en RLP, y tiene esta apariencia:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum ha mejorado y ahora es compatible con múltiples tipos de transacciones, lo que permite que se implementen nuevas características como listas de acceso y [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) sin afectar los formatos de transacción antiguos.

[EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718) se refiere a un tipo de transacción que funciona como un sobre para futuros tipos de transacción.

El EIP-2718 es un nuevo sobre generalizado para transacciones escritas. En el nuevo modelo, las transacciones se interpretan de la siguiente forma:

`TransactionType || TransactionPayload`

Donde los nuevos campos indican:

- `TransactionType` - un número entre 0 y 0x7f, para un total de 128 posibles tipos de transacción.
- `TransactionPayload` - una matriz de bytes arbitraria definida según el tipo de transacción.

## Más información {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Cuentas](/developers/docs/accounts/)
- [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
- [Minado](/developers/docs/consensus-mechanisms/pow/mining/)
