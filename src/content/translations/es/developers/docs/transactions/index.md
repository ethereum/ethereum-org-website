---
title: Transacciones
description: "Descripción general sobre las transacciones de Ethereum: Cómo funcionan, su estructura de datos y cómo enviarlas a través de una aplicación."
lang: es
sidebar: true
isOutdated: true
---

Las transacciones son instrucciones firmadas criptográficamente que se emiten desde cuentas. Una cuenta iniciará una transacción para actualizar el estado de la red Ethereum. La transacción más sencilla es transferir ETH de una cuenta a otra.

## Requisitos previos {#prerequisites}

Para entender más el contenido de esta página, te recomendamos que leas primero la página sobre [Cuentas](/developers/docs/accounts/), así como nuestra [Introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una transacción? {#whats-a-transaction}

Una transacción de Ethereum hace referencia a una acción iniciada por una cuenta de propiedad externa, en otras palabras, una cuenta controlada por un humano, no un contrato. Por ejemplo, si Bob le envía 1 ETH a Alice, este debe debitarse de la cuenta de Bob y acreditarse en la cuenta de Alice. Esta acción modificadora del estado de la red tiene lugar en una transacción.

![Diagrama que muestra cómo una transacción causa cambios de estado](../../../../../developers/docs/transactions/tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las transacciones, que modifican el estado de la EVM, se deben transmitir a toda la red. Cualquier nodo puede transmitir una solicitud de una transacción que se va ejecutar en la EVM; a continuación, un minero ejecutará la transacción y propagará la modificación de estado que resulte de ello al resto de la red.

Las transacciones necesitan una comisión y deben minarse para convertirse en transacciones válidas. Para simplificar esta descripción general, abarcaremos las comisiones de gas y el minado por separado.

Una transacción enviada incluye la siguiente información:

- `destinatario`: La transacción destinataria (en caso de que sea una cuenta de propiedad externa, la transacción transferirá valor. Si se trata de un contrato, la transacción ejecutará el código del contrato)
- `firma`: Identificador del remitente. Se genera cuando, mediante la clave privada, se firma la transacción y se confirma que el remitente la ha autorizado
- `valor`: Cantidad de ETH que el remitente transfiere al destinatario (en WEI, una denominación de ETH)
- `datos`: Campo opcional en el que se incluyen datos arbitrarios.
- `LímiteDeGas`: Cantidad máxima de unidades de gas que puede consumir la transacción. Las unidades de gas representan pasos computacionales
- `PrecioDeGas`: La comisión que el remitente paga por unidad de gas.

El gas es una referencia al trabajo computacional que se necesita para que el minero procese la transacción. Los usuarios tienen que pagar una comisión por ese trabajo computacional. El `límiteDeGas` y el `precioDeGas` determinan la comisión de gas máxima que se le paga al minero. [Mas información acerca del gas](/developers/docs/gas/).

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

![Diagrama mostrando como el gas no utilizado es retornado](../../../../../developers/docs/transactions/gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Cualquier gas no utilizado en una transacción es reembolsado a la cuenta de usuario.

## Ciclo de vida de la transacción {#transaction-lifecycle}

Una vez que la transacción ha sido enviada ocurre lo siguiente:

1. Una vez que envíes una transacción, la criptografía genera un hash de transacción: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. A continuación, la transacción se transmite a la red e incluida en un pool con muchas otras transacciones.
3. Un minero debe elegir tu transacción e incluirla en un bloque para verificar la transacción y considerarla "exitosa".
   - Puedes terminar esperando en esta etapa si la red está ocupada y los mineros no son capaces de mantenerse al día. Los mineros siempre priorizarán las transacciones con mayor `PRECIO DE GAS (GASPRICE)` porque consiguen mantener las comisiones.
4. Tu transición también obtendrá un número de confirmación de bloque. Este es el número de bloques creados desde el bloque en el que se incluyó tu transacción. Cuanto mayor sea el número, mayor será la certeza de que la transacción fue procesada y reconocida por la red. Esto sucede porque, a veces, puede que el bloque en el que se ha incluido tu transacción no haya entrado en la cadena.
   - Cuanto mayor sea el número de confirmación del bloque, más inmutable será la transacción. Por eso, para las transacciones con valores más altos, se precisan más confirmaciones de bloques.

## Una demostración visual {#a-visual-demo}

Observa a Austin mientras te guía por las transacciones, el gas y la minería.

<YouTube id="er-0ihqFQB0" />

## Leer más {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Cuentas](/developers/docs/accounts/)
- [Máquina Virtual de Ethereum (MVE)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
