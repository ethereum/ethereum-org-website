---
title: Uso de WebSockets
description: "Guía para usar WebSockets y Alchemy para hacer solicitudes JSON-RPC y suscribirse a eventos."
author: "Elan Halpern"
lang: es
tags: ["Alchemy", "websockets", "consultas", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Esta es una guía de nivel básico para usar WebSockets y Alchemy para hacer solicitudes a la cadena de bloques de Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

A diferencia de HTTP, con WebSockets no necesitas hacer solicitudes continuamente cuando quieres información específica. Los WebSockets mantienen una conexión de red por ti (si se hace correctamente) y escuchan los cambios.

Al igual que con cualquier conexión de red, no debes asumir que un WebSocket permanecerá abierto para siempre sin interrupciones, pero manejar correctamente las conexiones caídas y la reconexión manual puede ser un desafío. Otra desventaja de los WebSockets es que no obtienes códigos de estado HTTP en la respuesta, sino solo el mensaje de error.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) añade automáticamente el manejo de fallos y reintentos de WebSocket sin necesidad de configuración.

## Pruébalo {#try-it-out}

La forma más fácil de probar los WebSockets es instalar una herramienta de línea de comandos para hacer solicitudes WebSocket, como [wscat](https://github.com/websockets/wscat). Usando wscat, puedes enviar solicitudes de la siguiente manera:

_Nota: si tienes una cuenta de Alchemy, puedes reemplazar `demo` con tu propia clave API. [¡Regístrate para obtener una cuenta gratuita de Alchemy aquí!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## Cómo usar WebSockets {#how-to-use-websockets}

Para empezar, abre un WebSocket usando la URL de WebSocket para tu aplicación. Puedes encontrar la URL de WebSocket de tu aplicación abriendo la página de la aplicación en [tu panel de control](https://dashboard.alchemy.com/) y haciendo clic en "View Key" (Ver clave). Ten en cuenta que la URL de tu aplicación para WebSockets es diferente de su URL para solicitudes HTTP, pero ambas se pueden encontrar haciendo clic en "View Key".

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

Cualquiera de las API enumeradas en la [Referencia de la API de Alchemy](https://www.alchemy.com/docs/reference/api-overview) se puede usar a través de WebSocket. Para hacerlo, usa la misma carga útil (payload) que se enviaría como el cuerpo de una solicitud HTTP POST, pero en su lugar envía esa carga útil a través del WebSocket.

## Con Web3 {#with-web3}

La transición a WebSockets mientras se usa una biblioteca cliente como Web3 es sencilla. Simplemente pasa la URL de WebSocket en lugar de la HTTP al instanciar tu cliente Web3. Por ejemplo:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API de suscripción {#subscription-api}

Cuando te conectas a través de un WebSocket, puedes usar dos métodos adicionales: `eth_subscribe` y `eth_unsubscribe`. Estos métodos te permitirán escuchar eventos particulares y recibir notificaciones de inmediato.

### `eth_subscribe` {#eth-subscribe}

Crea una nueva suscripción para los eventos especificados. [Más información sobre `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

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

1. `alchemy_newFullPendingTransactions`

Devuelve la información de la transacción para todas las transacciones que se añaden al estado pendiente. Este tipo de suscripción se suscribe a transacciones pendientes, de forma similar a la llamada estándar de Web3 `web3.eth.subscribe("pendingTransactions")`, pero difiere en que emite _información completa de la transacción_ en lugar de solo los hashes de la transacción.

Ejemplo:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Emite un evento cada vez que se añade un nuevo encabezado a la cadena, incluso durante una reorganización de la cadena.

Cuando ocurre una reorganización de la cadena, esta suscripción emitirá un evento que contiene todos los nuevos encabezados para la nueva cadena. En particular, esto significa que puedes ver múltiples encabezados emitidos con la misma altura, y cuando esto sucede, el último encabezado debe tomarse como el correcto después de una reorganización.

Ejemplo:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Emite registros (logs) que forman parte de bloques recién añadidos que coinciden con los criterios de filtro especificados.

Cuando ocurre una reorganización de la cadena, los registros que forman parte de los bloques en la cadena antigua se emitirán nuevamente con la propiedad `removed` establecida en `true`. Además, se emiten los registros que forman parte de los bloques en la nueva cadena, lo que significa que es posible ver registros para la misma transacción varias veces en el caso de una reorganización.

Parámetros

1. Un objeto con los siguientes campos:
   - `address` (opcional): ya sea una cadena de texto que representa una dirección o una matriz (array) de dichas cadenas.
     - Solo se emitirán los registros creados desde una de estas direcciones.
   - `topics`: una matriz de especificadores de temas (topics).
     - Cada especificador de tema es `null`, una cadena de texto que representa un tema o una matriz de cadenas.
     - Cada posición en la matriz que no es `null` restringe los registros emitidos solo a aquellos que tienen uno de los temas dados en esa posición.

Algunos ejemplos de especificaciones de temas:

- `[]`: Se permite cualquier tema.
- `[A]`: A en la primera posición (y cualquier cosa después).
- `[null, B]`: Cualquier cosa en la primera posición y B en la segunda posición (y cualquier cosa después).
- `[A, B]`: A en la primera posición y B en la segunda posición (y cualquier cosa después).
- `[[A, B], [A, B]]`: (A o B) en la primera posición y (A o B) en la segunda posición (y cualquier cosa después).

Ejemplo:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Cancela una suscripción existente para que no se envíen más eventos.

Parámetros

1. ID de suscripción, como se devolvió previamente de una llamada a `eth_subscribe`.

Devuelve

`true` si una suscripción se canceló correctamente, o `false` si no existía ninguna suscripción con el ID dado.

Ejemplo:

**Solicitud**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**Resultado**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Regístrate en Alchemy](https://auth.alchemy.com) de forma gratuita, echa un vistazo a [nuestra documentación](https://www.alchemy.com/docs/) y, para conocer las últimas noticias, síguenos en [Twitter](https://x.com/AlchemyPlatform).