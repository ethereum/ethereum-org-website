---
title: Uso de WebSockets
description: "Guía para usar WebSockets para hacer solicitudes JSON-RPC y suscribirse a eventos, con cualquier proveedor de nodos de Ethereum."
author: "Elan Halpern"
lang: es
tags: ["Alchemy", "websockets", "consultas", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Esta es una guía de nivel básico para usar WebSockets para hacer solicitudes a la cadena de bloques de Ethereum. Los ejemplos usan métodos JSON-RPC estándar, por lo que funcionan con cualquier nodo o proveedor de nodos que ofrezca un punto de conexión WebSocket, incluyendo Alchemy.

## WebSockets frente a HTTP {#websockets-vs-http}

A diferencia de HTTP, con WebSockets no necesitas hacer solicitudes continuamente cuando quieres información específica. Los WebSockets mantienen una conexión de red por ti (si se hace correctamente) y escuchan los cambios.

Al igual que con cualquier conexión de red, no debes asumir que un WebSocket permanecerá abierto para siempre sin interrupción, pero manejar correctamente las conexiones caídas y la reconexión manualmente puede ser un desafío para hacerlo bien. Otra desventaja de los WebSockets es que no obtienes códigos de estado HTTP en la respuesta, sino solo el mensaje de error.

Las bibliotecas de cliente pueden manejar esto por ti. Por ejemplo, el [transporte WebSocket de Viem](https://viem.sh/docs/clients/transports/websocket) se reconecta en caso de fallo del socket y envía pings de mantenimiento de conexión (keep-alive) de forma predeterminada.

## Pruébalo {#try-it-out}

Necesitas una URL de WebSocket para un nodo de Ethereum. Los proveedores de nodos te dan una cuando creas una clave de interfaz de programación de aplicaciones (API), generalmente en la forma `wss://<provider-host>/<your-api-key>`. Por ejemplo, una URL de la red principal de Ethereum de Alchemy se ve como `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([regístrate para obtener una cuenta gratuita de Alchemy](https://auth.alchemy.com/signup)). Consulta [nodos como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service/) para otros proveedores, o usa el punto de conexión WebSocket de [tu propio nodo](/developers/docs/nodes-and-clients/run-a-node/). Los puntos de conexión públicos como `wss://ethereum-rpc.publicnode.com` también funcionan para experimentos rápidos, pero tienen un límite de velocidad y es posible que no admitan todos los tipos de suscripción.

La forma más fácil de probar los WebSockets es instalar una herramienta de línea de comandos para hacer solicitudes WebSocket como [wscat](https://github.com/websockets/wscat). Usando wscat, puedes enviar solicitudes de la siguiente manera:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Las líneas que comienzan con `>` son lo que escribes, y las líneas que comienzan con `<` son lo que el nodo devuelve.

## Cómo usar WebSockets {#how-to-use-websockets}

Para empezar, abre un WebSocket usando la URL de WebSocket de tu proveedor. Con Alchemy, puedes encontrarla abriendo tu aplicación en [el panel de control](https://dashboard.alchemy.com/) y viendo su clave de interfaz de programación de aplicaciones (API). Ten en cuenta que la URL para WebSockets (`wss://`) es diferente de la URL para solicitudes HTTP (`https://`), aunque la mayoría de los proveedores usan la misma clave de API para ambas.

![Dónde encontrar tu URL de WebSocket en tu panel de control de Alchemy](./use-websockets.mp4#602x280)

Cualquiera de los [métodos JSON-RPC](/developers/docs/apis/json-rpc/) que admita tu proveedor se puede usar a través de WebSocket. Para hacerlo, usa la misma carga útil que se enviaría como el cuerpo de una solicitud HTTP POST, pero en su lugar envía esa carga útil a través del WebSocket.

## Con Web3 {#with-web3}

La transición a WebSockets mientras usas una biblioteca de cliente como [Viem](https://viem.sh/) es sencilla. Usa el transporte `webSocket` con tu URL de WebSocket en lugar del transporte `http`. Por ejemplo, después de `npm install viem`, guarda esto como `index.mjs` y ejecuta `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Suscribirse a nuevos bloques a través del mismo WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API de suscripción {#subscription-api}

Cuando te conectas a través de un WebSocket, puedes usar dos métodos adicionales: `eth_subscribe` y `eth_unsubscribe`. Estos métodos te permitirán escuchar eventos particulares y recibir notificaciones de inmediato.

### `eth_subscribe` {#eth-subscribe}

Crea una nueva suscripción para los eventos especificados. [Más información sobre `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Parámetros {#parameters}

1. Tipos de suscripción
2. Parámetros opcionales

El primer argumento especifica el tipo de evento a escuchar. El segundo argumento contiene opciones adicionales que dependen del primer argumento. Los diferentes tipos de descripción, sus opciones y las cargas útiles de sus eventos se describen a continuación.

#### Devuelve {#returns}

El ID de suscripción: este ID se adjuntará a cualquier evento recibido y también se puede usar para cancelar la suscripción mediante `eth_unsubscribe`.

#### Eventos de suscripción {#subscription-events}

Mientras la suscripción esté activa, recibirás eventos que son objetos con los siguientes campos:

- `jsonrpc`: Siempre "2.0"
- `method`: Siempre "eth_subscription"
- `params`: Un objeto con los siguientes campos:
  - `subscription`: El ID de suscripción devuelto por la llamada `eth_subscribe` que creó esta suscripción.
  - `result`: Un objeto cuyo contenido varía según el tipo de suscripción.

#### Tipos de suscripción {#subscription-types}

1. `newHeads`

Emite un evento cada vez que se añade un nuevo encabezado a la cadena, incluso durante una reorganización de la cadena.

Cuando ocurre una reorganización de la cadena, esta suscripción emitirá un evento que contiene todos los nuevos encabezados para la nueva cadena. En particular, esto significa que puedes ver múltiples encabezados emitidos con la misma altura, y cuando esto sucede, el último encabezado debe tomarse como el correcto después de una reorganización.

Ejemplo:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Emite registros (logs) que forman parte de bloques recién añadidos que coinciden con los criterios de filtro especificados.

Cuando ocurre una reorganización de la cadena, los registros que forman parte de los bloques en la cadena antigua se emitirán nuevamente con la propiedad `removed` establecida en `true`. Además, se emiten los registros que forman parte de los bloques en la nueva cadena, lo que significa que es posible ver registros para la misma transacción varias veces en el caso de una reorganización.

Parámetros

1. Un objeto con los siguientes campos:
   - `address` (opcional): ya sea una cadena de texto que representa una dirección o un arreglo de dichas cadenas.
     - Solo se emitirán los registros creados desde una de estas direcciones.
   - `topics`: un arreglo de especificadores de temas (topics).
     - Cada especificador de tema es `null`, una cadena de texto que representa un tema o un arreglo de cadenas.
     - Cada posición en el arreglo que no es `null` restringe los registros emitidos solo a aquellos que tienen uno de los temas dados en esa posición.

Algunos ejemplos de especificaciones de temas:

- `[]`: Se permite cualquier tema.
- `[A]`: A en la primera posición (y cualquier cosa después).
- `[null, B]`: Cualquier cosa en la primera posición y B en la segunda posición (y cualquier cosa después).
- `[A, B]`: A en la primera posición y B en la segunda posición (y cualquier cosa después).
- `[[A, B], [A, B]]`: (A o B) en la primera posición y (A o B) en la segunda posición (y cualquier cosa después).

Ejemplo:

Este ejemplo escucha los eventos `Deposit` del [contrato de ether envuelto (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) en la red principal de Ethereum:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Emite el hash de cada transacción que se añade al estado pendiente del nodo (su mempool).

Ejemplo:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Algunos proveedores también ofrecen sus propios tipos de suscripción. Por ejemplo, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) de Alchemy emite _objetos de transacción completos_ en lugar de solo hashes, y acepta los filtros opcionales `fromAddress`, `toAddress` y `hashesOnly`. Estos no forman parte de la interfaz de programación de aplicaciones (API) JSON-RPC estándar, por lo que solo funcionan con ese proveedor.

### `eth_unsubscribe` {#eth-unsubscribe}

Cancela una suscripción existente para que no se envíen más eventos.

Parámetros

1. ID de suscripción, como se devolvió previamente de una llamada a `eth_subscribe`.

Devuelve

`true` si una suscripción se canceló con éxito, o `false` si no existía ninguna suscripción con el ID dado.

Una suscripción solo existe en la conexión WebSocket que la creó, por lo que `eth_unsubscribe` debe enviarse a través de esa misma conexión. No se puede enviar como una solicitud HTTP separada. Cerrar la conexión también cancela todas sus suscripciones.

Ejemplo:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Regístrate en Alchemy](https://auth.alchemy.com) de forma gratuita, consulta la [documentación de Alchemy](https://www.alchemy.com/docs/) y, para conocer las últimas noticias, sigue a Alchemy en [Twitter](https://x.com/Alchemy).
