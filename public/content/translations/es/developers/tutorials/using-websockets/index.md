---
title: Uso de WebSockets
description: Guía para utilizar WebSockets y Alchemy para realizar solicitudes JSON-RPC y suscribirse a eventos.
author: "Elan Halpern"
lang: es
tags: [ "alchemy", "websockets", "consultas", "javascript" ]
skill: principiante
source: Documentación de Alchemy
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Esta es una guía de nivel básico para usar WebSockets y Alchemy para realizar solicitudes a la blockchain de Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

A diferencia de HTTP, con WebSockets no es necesario realizar solicitudes continuamente cuando desea información específica. WebSockets mantienen una conexión de red para usted (si se implementa correctamente) y escuchan cambios.

Como con cualquier conexión de red, no debe asumir que un WebSocket permanecerá abierto para siempre sin interrupciones, pero manejar correctamente las desconexiones y la reconexión manualmente puede ser un reto de implementar correctamente. Otra desventaja de los WebSockets es que no recibe códigos de estado HTTP en la respuesta, solo el mensaje de error.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) agrega automáticamente el manejo de errores y reintentos de WebSocket sin necesidad de configuración.

## Pruébelo {#try-it-out}

La forma más sencilla de probar WebSockets es instalar una herramienta de línea de comandos para realizar solicitudes WebSocket como [wscat](https://github.com/websockets/wscat). Con wscat, puede enviar solicitudes de la siguiente forma:

_Nota: si tiene una cuenta de Alchemy puede reemplazar `demo` por su propia clave de API. [¡Regístrese para obtener una cuenta gratuita de Alchemy aquí!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Cómo usar WebSockets {#how-to-use-websockets}

Para comenzar, abra un WebSocket utilizando la URL de WebSocket de su aplicación. Puede encontrar la URL de WebSocket de su aplicación abriendo la página de la app en [su panel de control](https://dashboard.alchemy.com/) y haciendo clic en "View Key". Tenga en cuenta que la URL de WebSocket de su aplicación es diferente a la URL para solicitudes HTTP, pero ambas se pueden encontrar haciendo clic en "View Key".

![Dónde encontrar la URL de su WebSocket en el panel de Alchemy](./use-websockets.gif)

Cualquiera de las APIs listadas en la [Referencia de API de Alchemy](https://www.alchemy.com/docs/reference/api-overview) puede utilizarse vía WebSocket. Para ello, utilice el mismo payload que enviaría como cuerpo de una solicitud HTTP POST, pero envíelo a través del WebSocket.

## Con Web3 {#with-web3}

El cambio a WebSockets usando una librería cliente como Web3 es sencillo. Simplemente pase la URL de WebSocket en vez de la de HTTP al instanciar su cliente de Web3. Por ejemplo:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API de suscripción {#subscription-api}

Cuando está conectado mediante un WebSocket, puede usar dos métodos adicionales: `eth_subscribe` y `eth_unsubscribe`. Estos métodos le permiten escuchar eventos específicos y recibir notificaciones inmediatamente.

### `eth_subscribe` {#eth-subscribe}

Crea una nueva suscripción para eventos especificados. [Más información sobre `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parámetros {#parameters}

1. Tipos de suscripción
2. Parámetros opcionales

El primer argumento especifica el tipo de evento al que desea escuchar. El segundo argumento contiene opciones adicionales que dependen del primer argumento. Los diferentes tipos de descripción, sus opciones y los payloads de eventos se describen a continuación.

#### Devuelve {#returns}

El ID de la suscripción: Este ID se adjuntará a cualquiera de los eventos recibidos y también puede utilizarse para cancelar la suscripción con `eth_unsubscribe`.

#### Eventos de suscripción {#subscription-events}

Mientras la suscripción esté activa, recibirá eventos que son objetos con los siguientes campos:

- `jsonrpc`: Siempre "2.0"
- `method`: Siempre "eth_subscription"
- `params`: Un objeto con los siguientes campos:
  - `subscription`: El ID de suscripción retornado por la llamada `eth_subscribe` que creó esta suscripción.
  - `result`: Un objeto cuyo contenido varía según el tipo de suscripción.

#### Tipos de suscripción {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Devuelve la información de las transacciones para todas las transacciones que han sido agregadas al estado pendiente. Este tipo de suscripción se suscribe a transacciones pendientes, similar al llamado estándar en Web3 `web3.eth.subscribe("pendingTransactions")`, pero se diferencia en que emite _toda la información de la transacción_ en vez de solo los hashes de las transacciones.

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

Cuando ocurre una reorganización de la cadena, esta suscripción emitirá un evento que contiene todos los nuevos encabezados para la nueva cadena. En particular, esto significa que puede ver varios encabezados emitidos con la misma altura y, cuando esto ocurre, el encabezado más reciente debe ser considerado el correcto tras una reorganización.

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

Emite logs que forman parte de los bloques recién añadidos y que coinciden con los criterios de filtro especificados.

Cuando ocurre una reorganización de la cadena, los logs que forman parte de los bloques de la cadena anterior se emitirán nuevamente con la propiedad `removed` configurada en `true`. Además, los logs que forman parte de los bloques de la nueva cadena se emiten, por lo que es posible ver logs para la misma transacción varias veces en caso de una reorganización.

Parámetros

1. Un objeto con los siguientes campos:
   - `address` (opcional): una cadena que representa una dirección, o un arreglo de dichas cadenas.
     - Solo se emitirán logs creados desde una de estas direcciones.
   - `topics`: un arreglo de especificadores de temas (topics).
     - Cada especificador de tema puede ser `null`, una cadena que representa un tema, o un arreglo de cadenas.
     - Cada posición del arreglo que no sea `null` restringe los logs emitidos solo a aquellos que tengan uno de los temas indicados en esa posición.

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

1. ID de suscripción, tal como fue devuelto previamente desde una llamada a `eth_subscribe`.

Devuelve

`true` si la suscripción se canceló correctamente, o `false` si no existía una suscripción con ese ID.

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

[Regístrese en Alchemy](https://auth.alchemy.com) de forma gratuita, consulte [nuestra documentación](https://www.alchemy.com/docs/) y para las últimas novedades, síganos en [Twitter](https://x.com/AlchemyPlatform).
