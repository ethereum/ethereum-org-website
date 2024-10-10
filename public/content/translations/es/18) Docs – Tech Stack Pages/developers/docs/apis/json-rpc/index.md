---
title: API JSON-RPC
description: Protocolo de llamada de procedimiento remoto (RPC) sin estado y liviano para clientes de Ethereum.
lang: es
---

Para que una aplicación de software interactúe con la cadena de bloques de Ethereum (leyendo datos de la blockchain o enviando transacciones a la red), se debe conectar a un nodo de Ethereum.

Para este propósito, cada [cliente de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementa una [especificación JSON-RPC](https://github.com/ethereum/execution-apis) para que haya un conjunto uniforme de métodos que las aplicaciones puedan usar, sin importar la implementación de nodo o cliente específica.

[JSON-RPC](https://www.jsonrpc.org/specification) es un protocolo de llamada de procedimiento remoto (RPC) liviano y sin estado. Define distintas estructuras de datos y las reglas para su procesamiento. Es independiente del transporte en el sentido de que los conceptos se pueden usar dentro del mismo proceso, por sockets, HTTP o distintos entornos de intercambio de mensajes. Utiliza JSON (RFC 4627) como formato de datos.

## Implementaciones de cliente {#client-implementations}

Cada cliente de Ethereum puede utilizar diferentes lenguajes de programación al implementar la especificación JSON-RPC. Consulte [documentación de cada cliente](/developers/docs/nodes-and-clients/#execution-clients) para obtener más detalles relacionados con su lenguaje de programación. Recomendamos revisar la documentación de cada cliente para obtener la información más actualizada del soporte de API.

## Bibliotecas de conveniencia {#convenience-libraries}

Aunque puede elegir interactuar directamente con los clientes de Ethereum a través de la API de JSON-RPC, a menudo hay opciones más fáciles para los desarrolladores de dapps. Existen muchas librerías de [JavaScript](/developers/docs/apis/javascript/#available-libraries) y [API de backend](/developers/docs/apis/backend/#available-libraries) para proporcionar wrappers sobre la API de JSON-RPC. Con estas bibliotecas, los desarrolladores pueden escribir métodos intuitivos de una sola línea en el lenguaje de programación que escojan para realizar peticiones JSON-RPC (debajo del capó) que interactúen con Ethereum.

## API de clientes de consenso {#consensus-clients}

Esta página trata principalmente la API de JSON-RPC usada por los clientes de ejecución de Ethereum. Sin embargo, los clientes de consenso también tienen una API de RPC que permite a los usuarios consultar información sobre el nodo, solicitar bloques de Baliza, ver el estado de la Baliza y otra información relacionada con el consenso directamente desde un nodo. Esta API está documentada en la [página web de la API de Baliza](https://ethereum.github.io/beacon-APIs/#/).

También se utiliza una API interna para la comunicación intercliente dentro de un nodo; esto es, permite al cliente de consenso y el cliente de ejecución intercambiar datos. Esta es la llamada "Engine API", y las especificaciones están disponibles en [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Especificaciones de clientes de ejecución {#spec}

[Lea la especificación completa de la API de JSON-RPC en Github](https://github.com/ethereum/execution-apis). Esta API está documentada en la [página web de la API de Ejecución](https://ethereum.github.io/execution-apis/api-documentation/) e incluye un Inspector para probar todos los métodos disponibles.

## Convenciones {#conventions}

### Codificación de valor hexadecimal {#hex-encoding}

Se pasan dos tipos de datos clave por JSON: arrays de bytes sin formato y cantidades. Ambos se pasan con una codificación hexadecimal pero con diferentes requisitos de formato.

#### Cantidades {#quantities-encoding}

Al codificar cantidades (enteros, números): codificar como hexadecimal, agregar prefijo "0x", la representación más compacta (pequeña excepción: el cero debe representarse como "0x0").

He aquí algunos ejemplos:

- 0x41 (65 en decimal)
- 0x400 (1024 en decimal)
- WRONG: 0x (siempre debe tener al menos un dígito - cero es "0x0")
- WRONG: 0x0400 (no se permiten ceros a la izquierda)
- WRONG: ff (debe tener el prefijo 0x)

### Datos sin formato {#unformatted-data-encoding}

Cuando se codifican datos sin formato (arrays de bytes, direcciones de cuentas, hashes, arrays de bytecode): codificar como hex, agregar prefijo "0x", dos dígitos hexadecimales por byte.

Estos son algunos ejemplos:

- 0x41 (tamaño 1, "A")
- 0x004200 (tamaño 3, "0B0")
- 0x (tamaño 0, "")
- WRONG: 0xf0f0f (debe ser un número par de dígitos)
- WRONG: 004200 (debe tener el prefijo 0x)

### El parámetro de bloque por defecto {#default-block}

Los siguientes métodos tienen un parámetro de bloque predeterminado adicional:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Cuando se hacen peticiones que actúan sobre el estado de Ethereum, el último parámetro de bloque por defecto determina la altura del bloque.

Las siguientes opciones son posibles para el parámetro defaultBlock:

- `HEX String`: un número de bloque entero
- `String "earliest"`: para el bloque inicial
- `String "latest"`: para el último bloque propuesto
- `String "safe"`: para el último bloque de encabezado seguro
- `String "finalized"`: para el último bloque finalizado
- `String "pending"`: para el estado/transacciones pendientes

## Ejemplos

En esta página proporcionamos ejemplos de cómo utilizar los endpoints individuales de la API JSON_RPC usando la herramienta de línea de comandos, [curl](https://curl.se). Estos ejemplos individuales de endpoints se encuentran a continuación en la sección de [ejemplos de curl](#curl-examples). Más adelante en la página, también proporcionamos un [ejemplo de extremo a extremo](#usage-example) para compilar y desplegar un contrato inteligente usando un nodo Geth, la API de JSON_RPC y curl.

## Ejemplos de Curl {#curl-examples}

A continuación se proporcionan ejemplos del uso de la API JSON_RPC realizando solicitudes [curl](https://curl.se) a un nodo Ethereum. Cada ejemplo incluye una descripción del endpoint específico, sus parámetros, el tipo de retorno y un ejemplo práctico de cómo debe utilizarse.

Las peticiones curl pueden mostrar un mensaje de error relacionado con el tipo de contenido. Esto se debe a que la opción `--data` establece el tipo de contenido en `application/x-www-form-urlencoded`. Si su nodo se queja de esto, establezca manualmente el encabezado colocando `-H "Content-Type: application/json"` al inicio de la llamada. Los ejemplos tampoco incluyen la combinación de URL/IP y puerto que debe ser el último argumento dado a curl (ej: `127.0.0.1:8545`). Una solicitud de curl completa, incluyendo estos datos adicionales, tiene la siguiente forma:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, estado, historial {#gossip-state-history}

Un puñado de métodos JSON-RPC básicos requieren datos de la red Ethereum, y se dividen claramente en tres categorías principales: _Gossip, Estado e Historial_. Utilice los enlaces de estas secciones para saltar a cada método o utilice la tabla de contenidos para explorar toda la lista de métodos.

### Métodos gossip {#gossip-methods}

> Estos métodos rastrean la cabeza de la cadena. Así es como las transacciones se abren camino por la red, encuentran su camino en los bloques y cómo los clientes descubren nuevos bloques.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Métodos de estado {#state_methods}

> Métodos que informan el estado actual de todos los datos almacenados. El "estado" es como una gran porción compartida de RAM, e incluye saldos de cuentas, datos de contratos y estimaciones de gas.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Métodos de historial {#history_methods}

> Obtiene registros históricos de cada bloque hasta el bloque inicial. Esto es como un gran archivo append-only e incluye todas las cabeceras de bloques, cuerpos de bloques, bloques tíos y recibos de transacción.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API Playground

Puede usar la [herramienta de playground](https://ethereum-json-rpc.com) para descubrir y probar los métodos de la API. También le muestra qué métodos y redes son compatibles con varios proveedores de nodos.

## Métodos de la API de JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Muestra la versión actual del cliente.

**Parámetros**

Ninguno

**Muestra**

`String`: La versión actual del cliente

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Muestra el Keccak-256 (_no_ el SHA3-256 estandarizado) de los datos dados.

**Parámetros**

1. `DATA`: los datos por convertir en un hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Devuelve**

`DATA`: El resultado SHA3 de la cadena dada.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Muestra el ID de red actual.

**Parámetros**

Ninguno

**Devuelve**

`String`: El ID de red actual.

La lista completa de los ID de red actuales está disponible en [chainlist.org](https://chainlist.org). Algunos comunes son:

- `1`: Red principal de Ethereum
- `5`: Red de prueba Goerli
- `11155111`: Red de prueba Sepolia

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Muestra `true` si el cliente está escuchando activamente las conexiones de red.

**Parámetros**

Ninguno

**Devuelve**

`Boolean`: `true` cuando está escuchando, de lo contrario `false`.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Muestra el número de personas conectadas al cliente.

**Parámetros**

Ninguno

**Devuelve**

`QUANTITY`: número entero de pares conectados.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Muestra la versión actual del protocolo Ethereum. Tenga en cuenta que este método [no está disponible en Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parámetros**

Ninguno

**Devuelve**

`String`: La versión actual del protocolo Ethereum

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Muestra un objeto con datos sobre el estado de sincronización o `false`.

**Parámetros**

Ninguno

**Devuelve**

El retorno de información precisa varía entre las implementaciones del cliente. En todos los clientes aparece `False` cuando el nodo no se está sincronizando y en todos los clientes aparecen los siguientes campos.

`Object|Boolean`: un objeto con datos de estado de sincronización o `FALSE` cuando no se sincroniza:

- `startingBlock`: `QUANTITY` - El bloque en el que comenzó la importación (sólo se reiniciará, después de que la sincronización alcanzó su cabeza)
- `currentBlock`: `QUANTITY` - El bloque actual, igual que eth_blockNumber
- `highestBlock`: `QUANTITY` - El bloque más alto estimado

Sin embargo, los clientes individuales también pueden proporcionar información adicional. Por ejemplo, Geth devuelve lo siguiente:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Cuando Besu devuelve:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Consulte la documentación de su cliente en específico para más información.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Muestra la dirección coinbase del cliente.

**Parámetros**

Ninguno

**Muestra**

`DATA`, 20 bytes - la dirección actual de Coinbase.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Muestra el ID de cadena utilizado para firmar transacciones protegidas contra repetición.

**Parámetros**

Ninguno

**Muestra**

`chainId`: valor hexadecimal como una cadena que representa el número entero del ID de cadena actual.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Aparece `true` si el cliente está minando activamente nuevos bloques. Esto solo puede aparecer como `true` para redes de prueba de trabajo y puede que no esté disponible para algunos clientes desde [La Fusión](/roadmap/merge/).

**Parámetros**

Ninguno

**Muestra**

`Boolean`: muestra `true` si cliente está minando, de lo contrario aparece `falso`.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Retorna el número de hashes por segundo con los que el nodo está minando. Esto solo puede aparecer como `true` para redes de prueba de trabajo y puede que no esté disponible para algunos clientes desde [La Fusión](/roadmap/merge/).

**Parámetros**

Ninguno

**Muestra**

`QUANTITY`: número de hashes por segundo.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Devuelve un estimado del precio actual por gas en wei. Por ejemplo, el cliente Besu examina los últimos 100 bloques y devuelve el precio promedio por unidad de gas por defecto.

**Parámetros**

Ninguno

**Muestra**

`CANTIDAD`: número entero del precio actual de gas en wei.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Retorna una lista de direcciones de propiedad del cliente.

**Parámetros**

Ninguno

**Muestra**

`Array of DATA`, 20 Bytes - direcciones de propiedad del cliente.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Retorna el número de bloque más reciente.

**Parámetros**

Ninguno

**Muestra**

`QUANTITY`: número entero del número de bloque actual en el que se encuentra el cliente.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Retorna el saldo de la cuenta de la dirección dada.

**Parámetros**

1. `DATA`, 20 Bytes - dirección en la que se verifica el saldo.
2. `QUANTITY|TAG`: número de bloque entero o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`; consulte el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Muestra**

`QUANTITY`: número entero del saldo actual en wei.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Retorna el valor de una posición de almacenamiento en una dirección dada.

**Parámetros**

1. `DATA`, 20 Bytes - dirección de almacenamiento.
2. `QUANTITY`: número entero de la posición en el almacenamiento.
3. `QUANTITY|TAG`: número de bloque entero o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`; consulte el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block)

**Muestra**

`DATA`: el valor de esta posición de almacenamiento.

**Ejemplo** El calculo de la posición correcta depende del almacenamiento a recuperar. Considere el siguiente contrato implementado en `0x295a70b2de5e3953354a6a8344e616ed314d7251` por la dirección `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Recuperar el valor de pos0 es sencillo:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Recuperar un elemento del mapa es más difícil. La posición de un elemento de un mapa se calcula con:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Esto signifíca que para recuperar el almacenamiento en pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] necesitamos calcular la posición con:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

La consola geth que viene con la biblioteca web3 puede ser utilizada para hacer el cálculo:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Ahora para obtener el almacenamiento:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Muestra el número de transacciones _enviadas_ de una dirección.

**Parámetros**

1. `DATA`, 20 Bytes - dirección.
2. `QUANTITY|TAG`: número de bloque entero o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`; consulte el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Muestra**

`QUANTITY`: número entero de las transacciones enviadas desde esta dirección.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Muestra el número de transacciones en un bloque de un bloque que coinicide con el hash del bloque dado.

**Parámetros**

1. `DATA`, 32 Bytes - hash de un bloque

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Muestra**

`QUANTITY`: número entero de transacciones de este bloque.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Muestra el número de transacciones de un bloque que coincide con el número de bloque dado.

**Parámetros**

1. `QUANTITY|TAG`: entero de un número de bloque o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, como en el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Muestra**

`QUANTITY`: número entero de transacciones de este bloque.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Muestra el número de tíos en un bloque a partir de un bloque que coincide con el hash del bloque dado.

**Parámetros**

1. `DATA`, 32 Bytes - hash de un bloque

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Muestra**

`QUANTITY`: número entero de tíos en este bloque.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Muestra el número de tíos de un bloque que coincide con el número del bloque dado.

**Parámetros**

1. `QUANTITY|TAG`: número entero de un número de bloque o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, consulte el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**Muestra**

`QUANTITY`: número entero de tíos en este bloque.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Muestra el código en una dirección dada.

**Parámetros**

1. `DATA`, 20 Bytes - dirección
2. `QUANTITY|TAG`: número de bloque entero o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`; consulte el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Muestra**

`DATA`: el código de una dirección dada.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

El método de firma calcula una firma especifíca de Ethereum con: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Añadiendo un prefijo al mensaje, hace que la firma calculada sea reconocible como una firma especifíca de Ethereum. Esto previene el uso inadecuado donde una dapp maliciosa pueda firmar datos arbitrarios (ej: transacción) y use la firma para hacerse pasar por la víctima.

Nota: La dirección con la que se firma debe estar desbloqueada.

**Parámetros**

1. `DATA`, 20 Bytes - dirección
2. `DATA`, N Bytes - mensaje a firmar

**Muestra**

`DATA`: Firma

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Resultado
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Firma una transacción que pueda enviarse a la red más adelante usando [eth_sendRawTransaction](#eth_sendrawtransaction).

**Parámetros**

1. `Object`: Objeto de la transacción

- `type`:
- `from`: `DATA`, 20 Bytes - La dirección desde donde la transacción es enviada.
- `to`: `DATA`, 20 Bytes - (opcional cuando se crea un nuevo contrato) La dirección a la cual se envía la transacción.
- `gas`: `QUANTITY`: (opcional, por defecto; 90000) Entero del gas propuesto para ejecutar la transacción. Devuelve el gas no utilizado.
- `gasPrice`: `QUANTITY`: (opcional, predeterminado: Por determinar) Entero del precio del gas utilizado para cada gas pagado en Wei.
- `value`: `QUANTITY`: (opcional) entero del valor enviado con esta transacción, en Wei.
- `data`: `DATA`: el código compilado de un contrato O el hash del método de firma invocado y los parámetros codificados.
- `nonce`: `QUANTITY`: (opcional) Entero del nonce. Esto permitirá sobrescribir sus propias transacciones pendientes que usen el mismo nonce.

**Muestra**

`DATA`, el objeto transaccional codificado con RLP y firmado por la cuenta en específico.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Resultado
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Crea una nueva transacción de llamada de mensaje o un nuevo contrato, si el campo de datos contiene código y lo firma usando la cuenta especificada en `from`.

**Parámetros**

1. `Object`: Objeto de la transacción

- `from`: `DATA`, 20 Bytes - La dirección desde donde la transacción es enviada.
- `to`: `DATA`, 20 Bytes - (opcional cuando se crea un nuevo contrato) La dirección a la cual se envía la transacción.
- `gas`: `QUANTITY`: (opcional, por defecto; 90000) Entero del gas propuesto para ejecutar la transacción. Devuelve el gas no utilizado.
- `gasPrice`: `QUANTITY`: (opcional, por defecto: Por determinar) entero del precio del gas usado por cada gas pagado.
- `value`: `QUANTITY`: (opcional) Entero del valor enviado con la transacción.
- `input`: `DATA`. El código compilado de un contrato O el hash del método de firma invocado y los parámetros codificados.
- `nonce`: `QUANTITY`: (opcional) Entero del nonce. Esto permitirá sobrescribir sus propias transacciones pendientes que usen el mismo nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Muestra**

`DATA`, 32 Bytes - El hash de la transacción el hash cero si la transacción no está disponible aún.

Utilice [eth_getTransactionReceipt](#eth_gettransactionreceipt) para obtener la dirección del contrato después de que la transacción se propuso en un bloque cuando creó un contrato.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Resultado
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Crea una nueva transacción de llamada de mensaje o la creación de un contrato para transacciones firmadas.

**Parámetros**

1. `DATA`: los datos de la transacción con firma.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Muestra**

`DATA`, 32 Bytes - El hash de la transacción el hash cero si la transacción no está disponible aún.

Utilice [eth_getTransactionReceipt](#eth_gettransactionreceipt) para obtener la dirección del contrato después de que la transacción se propuso en un bloque cuando creó un contrato.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Resultado
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Ejecuta una nueva llamada de mensaje inmediatamente sin crear una transacción en la cadena de bloques. Con frecuencia es usado para ejecutar funciones de solo lectura en los contratos, por ejemplo, el `balanceOf` para un contrato ERC-20.

**Parámetros**

1. `Object`: El objeto de la llamada en la transacción

- `from`: `DATA`, 20 Bytes - (opcional) La dirección desde donde se envía la transacción.
- `to`: `DATA`, 20 Bytes - La dirección a la cual se envía la transacción.
- `gas`: `QUANTITY` - (opcional) Entero del gas proporcionado para la ejecución de la transacción. eth_call consume cero gas, pero este parámetro tal vez sea necesario para algunas ejecuciones.
- `gasPrice` `QUANTITY` - (opcional) Entero del precio del gas usado por cada gas pagado
- `value`: `QUANTITY` - (opcional) Entero del valor enviado con la transacción
- `input`: `DATA` - (opcional) Hash de la firma del método y los parámetros codificados. Para más información, consulte la [ABI de contratos de Ethereum en la doumentación de Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG`: número de bloque entero o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`; consulte el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block)

**Muestra**

`DATA`: el valor de un contrato ejecutado.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Resultado
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Genera y retorna el valor estimado de gas necesario para permitir que se complete la transacción. La transacción no se añadirá a la cadena de bloques. Puede ser que esa estimación sea significativamente más alta que la cantidad actual de gas usada por la transacción por una variedad de razones, incluidos los mecanismos de la EVM y el desempeño del nodo.

**Parámetros**

Consulte los parámetros [eth_call](#eth_call), excepto que todas las propiedades sean opcionales. Si no se especifica ningún límite de gas, geth usa el límite de gas del bloque pendiente como límite superior. Como resultado, la estimación devuelta podría no ser suficiente para ejecutar la llamada/transacción cuando la cantidad de gas sea mayor que el límite de gas del bloque pendiente.

**Muestra**

`QUANTITY`: monto de gas usado.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Resultado
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Retorna información acerca de un bloque por hash.

**Parámetros**

1. `DATA`, 32 Bytes - Hash de un bloque.
2. `Boolean`: si es `true` muestra los objetos de transacción completos, si es `false` solo los hashes de las transacciones.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Muestra**

`Object`: Un objeto de bloque, o `null` cuando no se encuentra ningún bloque:

- `number`: `QUANTITY` - número de bloque. `null` cuando el bloque está pendiente.
- `hash`: `DATA`, 32 Bytes - hash del bloque. `null` cuando el bloque está pendiente.
- `parentHash`: `DATA`, 32 Bytes - hash del bloque principal.
- `nonce`: `DATA`, 8 Bytes - hash de la prueba de trabajo generada. `null` cuando el bloque está pendiente.
- `sha3Uncles`: `DATA`, 32 Bytes - SHA3 de los datos de tíos en el bloque.
- `logsBloom`: `DATA`, 256 Bytes - el filtro bloom para los registros del bloque. `null` cuando el bloque está pendiente.
- `transactionsRoot`: `DATA`, 32 Bytes - la raíz del trie de transacciones del bloque.
- `stateRoot`: `DATA`, 32 Bytes - la raíz del trie de estado final del bloque.
- `receiptsRoot`: `DATA`, 32 Bytes - la raíz del trie de recibos del bloque.
- `miner`: `DATA`, 20 Bytes - la dirección del beneficiario a quien se entregaron las recompensas de minado.
- `difficulty`: `QUANTITY` - número entero de la dificultad de este bloque.
- `totalDifficulty`: `QUANTITY` - número entero de la dificultad total de la cadena hasta este bloque.
- `extraData`: `DATA` - el campo de "datos extra" de este bloque.
- `size`: `QUANTITY` - número entero del tamaño de este bloque en bytes.
- `gasLimit`: `QUANTITY` - el máximo gas permitido en este bloque.
- `ggasUsed`: `QUANTITY` - el total de gas usado por todas las transacciones en este bloque.
- `timestamp`: `QUANTITY` - la marca de tiempo unix del momento en que se recopiló el bloque.
- `transactions`: `Array` - Matriz de los objetos de transacción, o hashes de transacción de 32 bytes dependiendo del último parámetro dado.
- `uncles`: `Array` - Matriz de hashes tíos.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Resultado
{
{
"jsonrpc": "2.0",
"id": 1,
"result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
}
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Retorna información acerca de un bloque por número de bloque.

**Parámetros**

1. `QUANTITY|TAG`: entero de un número de bloque o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, como en el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block).
2. `Boolean`: si es `true` muestra los objetos de transacción completos, si es `false` solo los hashes de las transacciones.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Retorna**Vea[eth_getBlockByHash](#eth_getblockbyhash)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Resultado ver [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Muestra la información acerca de una transacción requerida por el hash de transacción.

**Parámetros**

1. `DATA`, 32 Bytes - hash de una transacción

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Muestra**

`Object`: un objeto de transacción, o `null` cuando no se encontró la transacción:

- `blockHash`: `DATA`, 32 Bytes - hash del bloque donde estaba esta transacción. `null` cuando está pendiente.
- `blockNumber`: `QUANTITY` - número de bloque donde estaba está transacción. `null` cuando está pendiente.
- `from`: `DATA`, 20 Bytes - dirección del emisor.
- `gas`: `QUANTITY` - gas proporcionado por el emisor.
- `gasPrice`: `QUANTITY` - precio del gas proporcionado por el emisor en Wei.
- `hash`: `DATA`, 32 Bytes - hash de la transacción.
- `input`: `DATA` - los datos que se mandan junto con la transacción.
- `nonce`: `QUANTITY` - el número de transacciones hechas por el emisor antes de esta.
- `to`: `DATA`, 20 Bytes - dirección del receptor. `null` cuando se trata de una operación de creación de contrato.
- `transactionIndex`: `QUANTITY` - número entero de la posición del índice de transacciones en el bloque. `null` cuando está pendiente.
- `value`: `QUANTITY` - valor transferido en Wei.
- `v`: `QUANTITY` - ID de recuperación de ECDSA
- `r`: `QUANTITY` - firma r de ECDSA
- `s`: `CANTIDAD` - firma s de ECDSA

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Muestra información acerca de una transacción por hash de bloque y la posición del índice de la transacción.

**Parámetros**

1. `DATA`, 32 Bytes - hash de un bloque.
2. `QUANTITY`: número entero de la posición del índice de la transacción.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Muestra** Vea [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Resultado ver [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Muestra información acerca de una transacción por número de bloque y la posición del índice de transacción.

**Parámetros**

1. `QUANTITY|TAG`: número de bloque o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, como en el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY`: la posición del índice de la transacción.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Muestra** Vea [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Resultado ver [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Muestra el recibo de una transacción por hash de transacción.

**Tenga presente** que el recibo no está disponible para transacciones pendientes.

**Parámetros**

1. `DATA`, 32 Bytes - hash de una transacción

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Muestra** `Object`: objeto de recibo de transacción o `null` cuando no se encontró un recibo:

- `transactionHash`: `DATA`, 32 Bytes - hash de la transacción.
- `transactionIndex`: `QUANTITY` - número entero de la posición del índice de transacciones en el bloque.
- `blockHash`: `DATA`, 32 Bytes - hash del bloque donde estaba esta transacción.
- `blockNumber`: `QUANTITY` - número de bloque donde estaba está transacción.
- `from`: `DATA`, 20 Bytes - dirección del emisor.
- `to`: `DATA`, 20 Bytes - dirección del receptor. null cuando se trata de una transacción de creación de contrato.
- `acumulativeGasUsed` : `QUANTITY` - La cantidad total de gas utilizado cuando esta transacción se ejecutó en el bloque.
- `PeffectiveGasPrice` : `QUANTITY` - La suma de la tarifa base y propina pagada por unidad de gas.
- `gasUsed`: `QUANTITY` - La cantidad de gas usado solo por esta transacción específica.
- `contractAddress`: `DATA`, 20 Bytes - La dirección del contrato creada, si la transacción fue una creación de contrato; de lo contrario `null`.
- `logs`: `Array` - Array de los objetos del registro que generó esta transacción.
- `logsBloom`: `DATA`, 256 Bytes - filtro Bloom para clientes ligeros para recuperar rápidamente los registros relacionados.
- `type`: `QUANTITY` - número entero del tipo de transacción, `0x0` para transacciones heredadas, `0x1` para tipos de lista de acceso, `0x2` para las tasas dinámicas.

También muestra _una de las siguientes_ :

- `root` : `DATA` 32 bytes de ruta de estado postransacción (prebizantino)
- `status`: `QUANTITY` `1` (éxito) o `0` (falla)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Muestra información sobre un tío de un bloque por hash y posición del índice del tío.

**Parámetros**

1. `DATA`, 32 Bytes - El hash de un bloque.
2. `QUANTITY`: Posición de índice del tío.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retorna**Vea[eth_getBlockByHash](#eth_getblockbyhash)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Resultado ver [eth_getBlockByHash](#eth_getblockbyhash)

**Nota**: Un tío no contiene transacciones individuales.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Muestra información sobre un tío de un bloque por número y posición de índice del tío.

**Parámetros**

1. `QUANTITY|TAG`: número de bloque o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, como en el [parámetro de bloque predeterminado](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY`: Posición de índice del tío.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Retorna**Vea[eth_getBlockByHash](#eth_getblockbyhash)

**Nota**: Un tío no contiene transacciones individuales.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Resultado ver [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Crea un objeto de filtro, basado en las opciones de filtrado, que notifica cuando haya un cambio en el estado (registros). Para revisar si hubo un cambio en el estado, compruebe [eth_getFilterChanges](#eth_getfilterchanges).

**Nota sobre la especificación de filtros de temas:** Los Los temas dependen del orden. Una transacción con un registro con los temas [A, B] coincidirá con los siguientes filtros de temas:

- `[]` "cualquiera"
- `[A]` "A el la primera posición (¿y algo después?)"
- `[null, B]` "cualquier cosa en primera posición Y B en segunda posición (¿y algo después?)"
- `[A, B]` "A en primera posición Y B en segunda posición (¿y algo después?)"
- `[[A, B], [A, B]]` "(A ó B) en primera posición Y (A ó B) en segunda posición (¿y algo después?)"
- **Parámetros**

1. `Object` - Las opciones del filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `toBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `address`: `DATA|Array`, 20 Bytes - (opcional) Dirección de contrato o una lista de las direcciones desde donde deben originarse los registros.
- `topics`: `Array de DATA`, - (opcional) Array de temas de `DATA` de 32 bytes. Los temas dependen del orden. Cada tema puede también ser un array de DATA con opciones "or" (o).

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Muestra** `QUANTITY`: ID de filtro.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Crea un nuevo filtro en el nodo que notifica cuando llega un nuevo bloque. Para revisar si hubo un cambio en el estado, compruebe [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters** Ninguno

**Muestra** `QUANTITY`: ID de filtro.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Crea un filtro en el nodo para notificar cuando llegan nuevas transacciones pendientes. Para revisar si hubo un cambio en el estado, compruebe [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters** Ninguno

**Muestra** `QUANTITY`: ID de filtro.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Desinstala un filtro con un ID dado. Debe invocarse siempre cuando ya no se necesite observación. Los filtros adicionales vencen cuando no tienen solicitud de [eth_getFilterChanges](#eth_getfilterchanges) por un período de tiempo.

**Parámetros**

1. `QUANTITY`: ID de filtro.

```js
params: [
  "0xb", // 11
]
```

**Muestra** `Boolean` - `true` si el filtro fue satisfactoriamente desinstalado; caso contrario`false`.

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Método de sondeo para un filtro, que retorna un array de registros que ocurrieron desde el último sondeo.

**Parámetros**

1. `QUANTITY`: ID de filtro.

```js
params: [
  "0x16", // 22
]
```

**Muestra** `Array`: Array de objetos de registro o un array vacío si no cambió nada desde el último sondeo.

- Para los filtros creados con `eth_newBlockFilter`, los resultados son hashes de bloque (`DATA`, 32 bytes), p. ej., `["0x3454645634534..."]`.
- Para filtros creados con `eth_newPendingTransactionFilter` los resultados son hashes de transacciones(`DATA`, 32 Bytes), por ejemplo, `["0x6345343454645..."]`.
- Para filtros creados con `eth_newFilter` los registros son objetos con los siguientes parametros:
  - `removed`: `TAG` - `true` cuando el registro fue removido debido a una reorganización de la cadena. `false` si el registro es válido.
  - `logIndex`: `QUANTITY` - número entero de la posición del índice del registro en el bloque. `null` cuando el registro está pendiente.
  - `transactionIndex`: `QUANTITY` - número entero de posición de índice de transacciones desde donde se creó el registro. `null` cuando el registro está pendiente.
  - `transactionHash`: `DATA`, 32 Bytes - hash de transacciones desde donde se creó el registro. `null` cuando el registro está pendiente.
  - `blockHash`: `DATA`, 32 Bytes - hash del bloque donde estaba este registro. `null` cuando está pendiente. `null` cuando el registro está pendiente.
  - `blockNumber`: `QUANTITY` - número de bloque donde estaba este registro. `null` cuando está pendiente. `null` cuando el registro está pendiente.
  - `address`: `DATA`, 20 Bytes - dirección donde se originó este regustro.
  - `data`: `DATA` - Contiene cero o más de 32 Bytes argumentos no indexados del registro.
  - `topics`: `Array de DATA` - Array de 0 a 4 32 Bytes `DATA` de argumentos de registros indexados. (En _Solidity_: El primer tema es el _hash_ de la firma del evento (ej.: `Deposit(address,bytes32,uint256)`), excepto que declare el evento con el especificador `anonymous`)
- **Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Devuelve una matriz de todos los registros que coinciden con el filtro con el ID dado.

**Parámetros**

1. `QUANTITY`: ID de filtro.

```js
params: [
  "0x16", // 22
]
```

**Muestra** Ver [eth_getFilterChanges](#eth_getfilterchanges)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Resultado ver [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Devuelve una matriz de todos los registros que coinciden con un objeto de filtro dado.

**Parámetros**

1. `Object` - Las opciones del filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `toBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `address`: `DATA|Array`, 20 Bytes - (opcional) Dirección de contrato o una lista de las direcciones desde donde deben originarse los registros.
- `topics`: `Array de DATA`, - (opcional) Array de temas de `DATA` de 32 bytes. Los temas dependen del orden. Cada tema puede también ser un array de DATA con opciones "or" (o).
- `blockhash`: `DATA`, 32 Bytes - (opcional, **future**) Con la adición de EIP-234, `blockHash` será una nueva opción de filtro que restringe los registros retornados al bloque único con el hash de 32 bytes `blockHash`. Usar `blockHash` es equivalente a `fromBlock` = `toBlock` = el número de bloque con hash `blockHash`. Si `blockHash` está presente en los criterios de filtro, no se permiten ni `fromBlock` ni `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Muestra** Ver [eth_getFilterChanges](#eth_getfilterchanges)

**Ejemplo**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Resultado ver [eth_getFilterChanges](#eth_getfilterchanges)

## Ejemplo de uso {#usage-example}

### Implementar un contrato usando JSON_RPC {#deploying-contract}

Está sección incluye una demostración de cómo implementar un contrato usando solo la interfaz RPC. Existen rutas alternativas para implementar contratos donde esta complejidad no está en juego: por ejemplo, usar biblioteas creadas sobre la interfaz RPC como [web3.js](https://web3js.readthedocs.io/) y [web3.py](https://github.com/ethereum/web3.py). Estas abstracciones son generalmente fáciles de entender y menos propensas a errores, pero sigue siendo de ayuda entender qué es lo que sucede "debajo del capó".

El siguiente es un contrato inteligente sencillo llamado `Multiply7` que se implementará usando la interfaz JSON-RPC en un nodo Ethereum. Este tutorial asume que el lector actualmente corre un nodo Geth. Más información sobre nodos y clientes disponible [aquí](/developers/docs/nodes-and-clients/run-a-node). Consulte la documentación de cada [cliente individual](/developers/docs/nodes-and-clients/) para ver cómo iniciar el JSON-RCP HTTP para clientes no Geth. La mayoría de clientes por defecto sirven en `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Lo primero que debe hacer es asegurarse de que la interfaz HTTP RPC esté habilitada. Esto significa que proporcionamos a Geth el indicador `--http` al inicio. En este ejemplo usamos el nodo Geth en una cadena de desarrollo privada. Con este enfoque, no necesitamos ether en la red real.

```bash
geth --http --dev console 2>>geth.log
```

Esto iniciará la interfaz HTTP RPC en `http://localhost:8545`.

Podemos verificar que la interfaz se está ejecutando recuperando la dirección y el saldo de Coinbase usando [curl](https://curl.se). Tenga en cuenta que los datos usados en este ejemplo pueden ser diferentes en su nodo local. Si desea probar estos comandos, reemplace los parámetros de solicitud en la segunda solicitud curl con el resultado devuelto por la primera.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Debido a que los números están codificados en formato hexadecimal, el saldo se muestra en wei como una cadena hexadecimal. Si queremos tener el saldo en ether como número, podemos usar web3 desde la consola Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Ahora que hay algo de ether en nuestra cadena de desarrollo privado, podemos implementar el contrato. El primer paso es compilar el contrato Multiply7 en un código de bytes que se pueda enviar a la EVM. Para instalar solc, el compilador de Solidity, siga la [documentación de Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Es posible que desee utilizar una versión anterior de `solc` para que coincida con [la versión del compilador utilizada para nuestro ejemplo](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

El siguiente paso es compilar el contrato Multiply7 en código de bytes que se pueda enviar a la EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Ahora que tenemos el código compilado, necesitamos determinar cuánto gas cuesta implementarlo. La interfaz RPC tiene un método `eth_estimateGas` que nos dará una estimación.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Y finalmente implementamos el contrato.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

La transacción es aceptada por el nodo y se devuelve un hash de la transacción. Esta hash puede usarse para rastrear la transacción. El siguiente paso es determinar la dirección donde se implementa el contrato. Cada transacción ejecutada debe crear un recibo. Este recibo contiene información sobre la transacción como en qué bloque fue incluida la transacción y cuánto gas usó la EVM. Si una transacción crea un contrato, también contendrá la dirección del contrato. Podemos recuperar el recibo con el método RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Nuestro contrato fue creado en `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Un resultado nulo en lugar de un recibo significa que la transacción aún no se ha incluido en un bloque. Espere un momento y compruebe si su cliente de consenso se está ejecutando y vuelva a intentarlo.

#### Interactuar con contratos inteligentes {#interacting-with-smart-contract}

En este ejemplo enviaremos una transacción utilizando `eth_sendTransaction` al método `multiply` del contrato.

`eth_sendTransaction` requiere varios argumentos, específicamente `from`, `to` y `data`. `From` es la dirección pública de nuestra cuenta y `to` es la dirección del contrato. El argumento `data` contiene una carga útil que define a qué método se debe llamar y con qué argumentos. Aquí es donde entra en juego la [ABI (interfaz binaria de la aplicación)](https://docs.soliditylang.org/en/latest/abi-spec.html). La ABI es un archivo JSON que define cómo definir y codificar datos para la EVM.

Los bytes de la carga útil definen qué método del contrato se invoca. Estos son los primeros 4 bytes del hash de Keccak sobre el nombre de la función y sus tipos de argumentos, codificados en formato hexadecimal. La función de multiplicación acepta un uint que es un alias para uint256. Esto nos deja con:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

El siguiente paso es codificar los argumentos. Solo hay un uint256, digamos, el valor 6. La ABI tiene una sección que especifica cómo codificar tipos uint256.

`int<M>: enc(X)` es la codificación en complemento a 2 big-endian de X, rellenada en el lado de orden superior (izquierda) con 0xff para X negativo y con cero > bytes para X positivo tal que la longitud sea un múltiplo de 32 bytes.

Esto se codifica a `000000000000000000000000000000000000000000000000000000000000000006`.

Combinando el selector de funciones y el argumento codificado, nuestros datos serán `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Esto ahora puede enviarse al nodo:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Desde que la transacción fue enviada, se devolvió un hash de transacción. Recuperar el recibo da:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

El recibo contiene un registro. Este registro fue generado por la EVM en la ejecución de la transacción e incluido en el recibo. La función `multiply` muestra que el evento `Print` fue elevado con la entrada multiplicada por 7 veces. Dado que el argumento del evento `Print` fue un uint256, podemos decodificarlo de acuerdo con las reglas de ABI, lo que nos dejará con el decimal eperado 42. Además de los datos, vale la pena señalar que los temas se pueden usar para determinar qué evento creó el registro:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Esta fue solo una breve introducción a algunas de las tareas más comunes, demostrando el uso directo de JSON-RPC.

## Temas relacionados {#related-topics}

- [Especificación JSON_RPC](http://www.jsonrpc.org/specification)
- [ Nodos y clientes](/developers/docs/nodes-and-clients/)
- [API de JavaScript](/developers/docs/apis/javascript/)
- [API de back-end](/developers/docs/apis/backend/)
- [Clientes de ejecución](/developers/docs/nodes-and-clients/#execution-clients)
