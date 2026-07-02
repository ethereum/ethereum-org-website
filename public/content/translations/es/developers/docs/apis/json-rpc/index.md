---
title: API JSON-RPC
description: Un protocolo de llamada a procedimiento remoto (RPC) ligero y sin estado para clientes de Ethereum.
lang: es
---

Para que una aplicación de software interactúe con la cadena de bloques de [Ethereum](/) (ya sea leyendo datos de la cadena de bloques o enviando transacciones a la red), debe conectarse a un nodo de Ethereum.

Para este propósito, cada [cliente de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementa una [especificación JSON-RPC](https://github.com/ethereum/execution-apis), por lo que existe un conjunto uniforme de métodos en los que las aplicaciones pueden confiar independientemente del nodo específico o la implementación del cliente.

[JSON-RPC](https://www.jsonrpc.org/specification) es un protocolo de llamada a procedimiento remoto (RPC) ligero y sin estado. Define varias estructuras de datos y las reglas en torno a su procesamiento. Es independiente del transporte en el sentido de que los conceptos se pueden utilizar dentro del mismo proceso, a través de sockets, a través de HTTP o en muchos entornos de paso de mensajes diferentes. Utiliza JSON (RFC 4627) como formato de datos.

## Implementaciones de clientes {#client-implementations}

Los clientes de Ethereum pueden utilizar diferentes lenguajes de programación al implementar la especificación JSON-RPC. Consulte la [documentación de cada cliente](/developers/docs/nodes-and-clients/#execution-clients) para obtener más detalles relacionados con lenguajes de programación específicos. Recomendamos consultar la documentación de cada cliente para obtener la información más reciente sobre la compatibilidad con la API.

## Bibliotecas de conveniencia {#convenience-libraries}

Aunque puede elegir interactuar directamente con los clientes de Ethereum a través de la API JSON-RPC, a menudo existen opciones más sencillas para los desarrolladores de aplicaciones descentralizadas (dapp). Existen muchas bibliotecas de [JavaScript](/developers/docs/apis/javascript/#available-libraries) y de [API de backend](/developers/docs/apis/backend/#available-libraries) que proporcionan envoltorios sobre la API JSON-RPC. Con estas bibliotecas, los desarrolladores pueden escribir métodos intuitivos de una sola línea en el lenguaje de programación de su elección para inicializar solicitudes JSON-RPC (internamente) que interactúan con Ethereum.

## API de clientes de consenso {#consensus-clients}

Esta página trata principalmente sobre la API JSON-RPC utilizada por los clientes de ejecución de Ethereum. Sin embargo, los clientes de consenso también tienen una API RPC que permite a los usuarios consultar información sobre el nodo, solicitar bloques Beacon, el estado Beacon y otra información relacionada con el consenso directamente desde un nodo. Esta API está documentada en la [página web de la API Beacon](https://ethereum.github.io/beacon-APIs/#/).

También se utiliza una API interna para la comunicación entre clientes dentro de un nodo - es decir, permite que el cliente de consenso y el cliente de ejecución intercambien datos. Esta se llama la 'Engine API' y las especificaciones están disponibles en [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Especificación del cliente de ejecución {#spec}

[Lea la especificación completa de la API JSON-RPC en GitHub](https://github.com/ethereum/execution-apis). Esta API está documentada en la [página web de la API de ejecución](https://ethereum.github.io/execution-apis/) e incluye un Inspector para probar todos los métodos disponibles.

## Convenciones {#conventions}

### Codificación de valores hexadecimales {#hex-encoding}

Se pasan dos tipos de datos clave a través de JSON: matrices de bytes sin formato y cantidades. Ambos se pasan con una codificación hexadecimal pero con diferentes requisitos de formato.

#### Cantidades {#quantities-encoding}

Al codificar cantidades (enteros, números): codifique como hexadecimal, con el prefijo "0x", la representación más compacta (ligera excepción: el cero debe representarse como "0x0").

Aquí hay algunos ejemplos:

- 0x41 (65 en decimal)
- 0x400 (1024 en decimal)
- INCORRECTO: 0x (siempre debe tener al menos un dígito; el cero es "0x0")
- INCORRECTO: 0x0400 (no se permiten ceros a la izquierda)
- INCORRECTO: ff (debe tener el prefijo 0x)

### Datos sin formato {#unformatted-data-encoding}

Al codificar datos sin formato (matrices de bytes, direcciones de cuentas, hashes, matrices de código de bytes): codifique como hexadecimal, con el prefijo "0x", dos dígitos hexadecimales por byte.

Aquí hay algunos ejemplos:

- 0x41 (tamaño 1, "A")
- 0x004200 (tamaño 3, "0B0")
- 0x (tamaño 0, "")
- INCORRECTO: 0xf0f0f (debe ser un número par de dígitos)
- INCORRECTO: 004200 (debe tener el prefijo 0x)

### El parámetro de bloque {#block-parameter}

Los siguientes métodos tienen un parámetro de bloque:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Cuando se realizan solicitudes que consultan el estado de Ethereum, el parámetro de bloque proporcionado determina la altura del bloque.

Las siguientes opciones son posibles para el parámetro de bloque:

- `HEX String`: un número de bloque entero
- `String "earliest"` para el bloque más antiguo/bloque génesis
- `String "latest"`: para el último bloque propuesto
- `String "safe"`: para el último bloque de cabecera seguro
- `String "finalized"`: para el último bloque finalizado
- `String "pending"`: para el estado/transacciones pendientes

## Ejemplos {#examples}

En esta página proporcionamos ejemplos de cómo usar los puntos de conexión individuales de la API JSON_RPC utilizando la herramienta de línea de comandos, [curl](https://curl.se). Estos ejemplos de puntos de conexión individuales se encuentran a continuación en la sección [Ejemplos de curl](#curl-examples). Más abajo en la página, también proporcionamos un [ejemplo de principio a fin](#usage-example) para compilar y desplegar un contrato inteligente usando un nodo de Geth, la API JSON_RPC y curl.

## Ejemplos con curl {#curl-examples}

A continuación se proporcionan ejemplos de uso de la API JSON-RPC realizando solicitudes [curl](https://curl.se) a un nodo de Ethereum. Cada ejemplo incluye una descripción del punto de enlace específico, sus parámetros, el tipo de retorno y un ejemplo práctico de cómo debe usarse.

Las solicitudes curl pueden devolver un mensaje de error relacionado con el tipo de contenido. Esto se debe a que la opción `--data` establece el tipo de contenido en `application/x-www-form-urlencoded`. Si su nodo muestra un error por esto, configure manualmente el encabezado colocando `-H "Content-Type: application/json"` al inicio de la llamada. Los ejemplos tampoco incluyen la combinación de URL/IP y puerto, que debe ser el último argumento proporcionado a curl (por ejemplo, `127.0.0.1:8545`). Una solicitud curl completa que incluya estos datos adicionales tiene el siguiente formato:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, estado e historial {#gossip-state-history}

Varios métodos principales de JSON-RPC requieren datos de la red Ethereum y se dividen claramente en tres categorías principales: _Gossip, estado e historial_. Utilice los enlaces de estas secciones para saltar a cada método, o utilice la tabla de contenido para explorar la lista completa de métodos.

### Métodos de Gossip {#gossip-methods}

> Estos métodos rastrean la cabeza de la cadena. Así es como las transacciones se propagan por la red, se incluyen en los bloques y cómo los clientes descubren nuevos bloques.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Métodos de estado {#state-methods}

> Métodos que informan el estado actual de todos los datos almacenados. El "estado" es como un gran fragmento de memoria RAM compartida, e incluye saldos de cuentas, datos de contratos y estimaciones de gas.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Métodos de historial {#history-methods}

> Obtiene registros históricos de cada bloque hasta el génesis. Esto es como un gran archivo de solo adición, e incluye todos los encabezados de bloques, cuerpos de bloques, bloques tío y recibos de transacciones.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## Entorno de pruebas de la API JSON-RPC {#json-rpc-api-playground}

Puedes usar la [herramienta del entorno de pruebas](https://ethereum-json-rpc.com) para descubrir y probar los métodos de la API. También te muestra qué métodos y redes son compatibles con varios proveedores de nodos.

## Métodos de la API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Devuelve la versión actual del cliente.

**Parámetros**

Ninguno

**Devuelve**

`String` - La versión actual del cliente

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Resultadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoadoado
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Devuelve el Keccak-256 (_no_ el SHA3-256 estandarizado) de los datos proporcionados.

**Parámetros**

1. `DATA` - Los datos a convertir en un hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Devuelve**

`DATA` - El resultado SHA3 de la cadena proporcionada.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Devuelve el ID de red actual.

**Parámetros**

Ninguno

**Devuelve**

`String` - El ID de red actual.

La lista completa de los ID de red actuales está disponible en [chainlist.org](https://chainlist.org). Algunos de los más comunes son:

- `1`: red principal de Ethereum
- `11155111`: red de prueba Sepolia
- `560048` : red de prueba Hoodi

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Devuelve `true` si el cliente está escuchando activamente las conexiones de red.

**Parámetros**

Ninguno

**Devuelve**

`Boolean` - `true` cuando está escuchando, de lo contrario `false`.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Devuelve el número de pares conectados actualmente al cliente.

**Parámetros**

Ninguno

**Devuelve**

`QUANTITY` - entero con el número de pares conectados.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Devuelve la versión actual del protocolo de Ethereum. Ten en cuenta que este método [no está disponible en Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parámetros**

Ninguno

**Devuelve**

`String` - La versión actual del protocolo de Ethereum

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Devuelve un objeto con datos sobre el estado de sincronización o `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Probar endpoint en el playground
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

Los datos de retorno exactos varían entre las implementaciones de los clientes. Todos los clientes devuelven `False` cuando el nodo no se está sincronizando, y todos los clientes devuelven los siguientes campos.

`Object|Boolean`, un objeto con datos del estado de sincronización o `FALSE`, cuando no se está sincronizando:

- `startingBlock`: `QUANTITY` - El bloque en el que comenzó la importación (solo se restablecerá después de que la sincronización alcance su cabecera)
- `currentBlock`: `QUANTITY` - El bloque actual, igual que eth_blockNumber
- `highestBlock`: `QUANTITY` - El bloque más alto estimado

Sin embargo, los clientes individuales también pueden proporcionar datos adicionales. Por ejemplo, Geth devuelve lo siguiente:

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

Mientras que Besu devuelve:

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

Consulte la documentación de su cliente específico para obtener más detalles.

**Ejemplo**

```js
// Solicitud
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
// O cuando no está sincronizando
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Devuelve la dirección coinbase del cliente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

> **Nota:** Este método ha quedado obsoleto a partir de la versión **v1.14.0** y ya no tiene soporte. Intentar usar este método dará como resultado un error "Method not supported".

**Parámetros**

Ninguno

**Devuelve**

`DATA`, 20 bytes - la dirección coinbase actual.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Devuelve el ID de la cadena utilizado para firmar transacciones protegidas contra repetición.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Probar el endpoint en el playground
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

`chainId`, valor hexadecimal como cadena que representa el número entero del ID de la cadena actual.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Devuelve `true` si el cliente está minando activamente nuevos bloques. Esto solo puede devolver `true` para redes de prueba de trabajo y puede no estar disponible en algunos clientes desde [La Fusión](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

`Boolean` - devuelve `true` si el cliente está minando, de lo contrario `false`.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Devuelve el número de hashes por segundo con los que el nodo está minando. Esto solo puede devolver `true` para redes de prueba de trabajo y puede no estar disponible en algunos clientes desde [La Fusión](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

`QUANTITY` - número de hashes por segundo.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Devuelve una estimación del precio actual por gas en Wei. Por ejemplo, el cliente Besu examina los últimos 100 bloques y devuelve la mediana del precio por unidad de gas por defecto.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Probar endpoint en el playground
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

`QUANTITY` - entero del precio actual del gas en Wei.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Devuelve una lista de direcciones propiedad del cliente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

`Array of DATA`, 20 bytes - direcciones propiedad del cliente.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Devuelve el número del bloque más reciente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Probar endpoint en el playground
</ButtonLink>

**Parámetros**

Ninguno

**Devuelve**

`QUANTITY` - entero del número de bloque actual en el que se encuentra el cliente.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Devuelve el saldo de la cuenta en una dirección dada.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Probar el endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 20 bytes - dirección para consultar el saldo.
2. `QUANTITY|TAG` - número de bloque entero, o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, consulte el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Devuelve**

`QUANTITY` - entero del saldo actual en Wei.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Devuelve el valor de una posición de almacenamiento en una dirección dada.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 20 Bytes - dirección del almacenamiento.
2. `QUANTITY` - número entero de la posición en el almacenamiento.
3. `QUANTITY|TAG` - número entero del bloque, o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, consulte el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter)

**Devuelve**

`DATA` - el valor en esta posición de almacenamiento.

**Ejemplo**
Calcular la posición correcta depende del almacenamiento que se va a recuperar. Considere el siguiente contrato desplegado en `0x295a70b2de5e3953354a6a8344e616ed314d7251` por la dirección `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
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

Recuperar un elemento del mapa es más difícil. La posición de un elemento en el mapa se calcula con:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Esto significa que para recuperar el almacenamiento en pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] necesitamos calcular la posición con:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

La consola de Geth que viene con la biblioteca Web3 se puede usar para hacer el cálculo:

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

### eth_getTransactionCount {#eth-gettransactioncount}

Devuelve el número de transacciones _enviadas_ desde una dirección.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 20 bytes: dirección.
2. `QUANTITY|TAG`: número de bloque entero, o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, consulte el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // estado en el último bloque
]
```

**Devuelve**

`QUANTITY`: número entero de la cantidad de transacciones enviadas desde esta dirección.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Devuelve el número de transacciones en un bloque a partir de un bloque que coincida con el hash de bloque proporcionado.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 32 bytes: hash de un bloque

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Devuelve**

`QUANTITY`: número entero de la cantidad de transacciones en este bloque.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Devuelve el número de transacciones en un bloque que coincide con el número de bloque dado.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `QUANTITY|TAG` - entero de un número de bloque, o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, como en el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Devuelve**

`QUANTITY` - entero del número de transacciones en este bloque.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Devuelve el número de tíos en un bloque a partir de un bloque que coincida con el hash de bloque dado.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 32 bytes - hash de un bloque

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Devuelve**

`QUANTITY` - entero con el número de tíos en este bloque.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Devuelve el número de tíos en un bloque a partir de un bloque que coincida con el número de bloque dado.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Probar el endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `QUANTITY|TAG` - número entero de un número de bloque, o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, consulte el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Devuelve**

`QUANTITY` - número entero de la cantidad de tíos en este bloque.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Devuelve el código en una dirección dada.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 20 bytes - dirección
2. `QUANTITY|TAG` - número de bloque entero, o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, consulte el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Devuelve**

`DATA` - el código de la dirección dada.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

El método sign calcula una firma específica de Ethereum con: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Añadir un prefijo al mensaje hace que la firma calculada sea reconocible como una firma específica de Ethereum. Esto previene el uso indebido donde una aplicación descentralizada (dapp) maliciosa puede firmar datos arbitrarios (por ejemplo, una transacción) y usar la firma para hacerse pasar por la víctima.

Nota: la dirección con la que se va a firmar debe estar desbloqueada.

**Parámetros**

1. `DATA`, 20 Bytes - dirección
2. `DATA`, N Bytes - mensaje a firmar

**Devuelve**

`DATA`: Firma

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Firma una transacción que puede ser enviada a la red posteriormente usando [eth_sendRawTransaction](#eth-sendrawtransaction).

**Parámetros**

1. `Object` - El objeto de la transacción

- `type`:
- `from`: `DATA`, 20 bytes - La dirección desde la que se envía la transacción.
- `to`: `DATA`, 20 bytes - (opcional al crear un nuevo contrato) La dirección a la que se dirige la transacción.
- `gas`: `QUANTITY` - (opcional, por defecto: 90000) Entero del gas proporcionado para la ejecución de la transacción. Devolverá el gas no utilizado.
- `gasPrice`: `QUANTITY` - (opcional, por defecto: por determinar) Entero del precio del gas utilizado por cada gas pagado, en Wei.
- `value`: `QUANTITY` - (opcional) Entero del valor enviado con esta transacción, en Wei.
- `data`: `DATA` - El código compilado de un contrato O el hash de la firma del método invocado y los parámetros codificados.
- `nonce`: `QUANTITY` - (opcional) Entero de un nonce. Esto permite sobrescribir sus propias transacciones pendientes que utilizan el mismo nonce.

**Devuelve**

`DATA`, El objeto de la transacción codificado en RLP y firmado por la cuenta especificada.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Crea una nueva transacción de llamada de mensaje o una creación de contrato, si el campo de datos contiene código, y la firma utilizando la cuenta especificada en `from`.

**Parámetros**

1. `Object` - El objeto de la transacción

- `from`: `DATA`, 20 Bytes - La dirección desde la que se envía la transacción.
- `to`: `DATA`, 20 Bytes - (opcional al crear un nuevo contrato) La dirección a la que se dirige la transacción.
- `gas`: `QUANTITY` - (opcional, por defecto: 90000) Entero del gas proporcionado para la ejecución de la transacción. Devolverá el gas no utilizado.
- `gasPrice`: `QUANTITY` - (opcional, por defecto: por determinar) Entero del precio del gas utilizado para cada gas pagado.
- `value`: `QUANTITY` - (opcional) Entero del valor enviado con esta transacción.
- `input`: `DATA` - El código compilado de un contrato O el hash de la firma del método invocado y los parámetros codificados.
- `nonce`: `QUANTITY` - (opcional) Entero de un nonce. Esto permite sobrescribir sus propias transacciones pendientes que utilizan el mismo nonce.

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

**Devuelve**

`DATA`, 32 Bytes - el hash de transacción, o el hash cero si la transacción aún no está disponible.

Utilice [eth_getTransactionReceipt](#eth-gettransactionreceipt) para obtener la dirección del contrato, después de que la transacción se haya propuesto en un bloque, cuando haya creado un contrato.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Crea una nueva transacción de llamada de mensaje o la creación de un contrato para transacciones firmadas.

**Parámetros**

1. `DATA`, los datos de la transacción firmada.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Devuelve**

`DATA`, 32 bytes - el hash de transacción, o el hash cero si la transacción aún no está disponible.

Usa [eth_getTransactionReceipt](#eth-gettransactionreceipt) para obtener la dirección del contrato, después de que la transacción se haya propuesto en un bloque, cuando hayas creado un contrato.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Ejecuta una nueva llamada de mensaje inmediatamente sin crear una transacción en la cadena de bloques. A menudo se utiliza para ejecutar funciones de contrato inteligente de solo lectura, por ejemplo, el `balanceOf` para un contrato ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Probar endpoint en el playground
</ButtonLink>

**Parámetros**

1. `Object` - El objeto de llamada de transacción

- `from`: `DATA`, 20 Bytes - (opcional) La dirección desde la que se envía la transacción.
- `to`: `DATA`, 20 Bytes - La dirección a la que se dirige la transacción.
- `gas`: `QUANTITY` - (opcional) Entero del gas proporcionado para la ejecución de la transacción. eth_call consume cero gas, pero este parámetro puede ser necesario para algunas ejecuciones.
- `gasPrice`: `QUANTITY` - (opcional) Entero del gasPrice utilizado para cada gas pagado
- `value`: `QUANTITY` - (opcional) Entero del valor enviado con esta transacción
- `input`: `DATA` - (opcional) Hash de la firma del método y los parámetros codificados. Para obtener más detalles, consulte la [ABI de contratos de Ethereum en la documentación de Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - número de bloque entero, o la cadena `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, consulte el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter)

**Devuelve**

`DATA` - el valor de retorno del contrato ejecutado.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Genera y devuelve una estimación de cuánto gas es necesario para permitir que la transacción se complete. La transacción no se añadirá a la cadena de bloques. Tenga en cuenta que la estimación puede ser significativamente mayor que la cantidad de gas realmente utilizada por la transacción, por una variedad de razones que incluyen la mecánica de la EVM y el rendimiento del nodo.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Probar el endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

Consulte los parámetros de [eth_call](#eth-call), excepto que todas las propiedades son opcionales. Si no se especifica un límite de gas, geth utiliza el límite de gas del bloque pendiente como límite superior. Como resultado, la estimación devuelta podría no ser suficiente para ejecutar la llamada/transacción cuando la cantidad de gas es mayor que el límite de gas del bloque pendiente.

**Devuelve**

`QUANTITY` - la cantidad de gas utilizada.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Devuelve información sobre un bloque por su hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 32 Bytes - Hash de un bloque.
2. `Boolean` - Si es `true` devuelve los objetos de transacción completos, si es `false` solo los hashes de las transacciones.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Devuelve**

`Object` - Un objeto de bloque, o `null` cuando no se encuentra ningún bloque:

- `number`: `QUANTITY` - el número de bloque. `null` cuando es un bloque pendiente.
- `hash`: `DATA`, 32 Bytes - hash del bloque. `null` cuando es un bloque pendiente.
- `parentHash`: `DATA`, 32 Bytes - hash del bloque padre.
- `nonce`: `DATA`, 8 Bytes - hash de la prueba de trabajo (PoW) generada. `null` cuando es un bloque pendiente, `0x0` para bloques de prueba de participación (PoS) (desde La Fusión).
- `sha3Uncles`: `DATA`, 32 Bytes - SHA3 de los datos de los tíos en el bloque.
- `logsBloom`: `DATA`, 256 Bytes - el filtro de Bloom para los registros del bloque. `null` cuando es un bloque pendiente.
- `transactionsRoot`: `DATA`, 32 Bytes - la raíz del trie de transacciones del bloque.
- `stateRoot`: `DATA`, 32 Bytes - la raíz del trie de estado final del bloque.
- `receiptsRoot`: `DATA`, 32 Bytes - la raíz del trie de recibos del bloque.
- `miner`: `DATA`, 20 Bytes - la dirección del beneficiario al que se le otorgaron las recompensas del bloque.
- `difficulty`: `QUANTITY` - número entero de la dificultad para este bloque.
- `totalDifficulty`: `QUANTITY` - número entero de la dificultad total de la cadena hasta este bloque.
- `extraData`: `DATA` - el campo de "datos adicionales" de este bloque.
- `size`: `QUANTITY` - número entero del tamaño de este bloque en bytes.
- `gasLimit`: `QUANTITY` - el gas máximo permitido en este bloque.
- `gasUsed`: `QUANTITY` - el gas total utilizado por todas las transacciones en este bloque.
- `timestamp`: `QUANTITY` - la marca de tiempo Unix de cuando se recopiló el bloque.
- `transactions`: `Array` - Arreglo de objetos de transacción, o hashes de transacción de 32 Bytes dependiendo del último parámetro proporcionado.
- `uncles`: `Array` - Arreglo de hashes de tíos.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
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

### eth_getBlockByNumber {#eth-getblockbynumber}

Devuelve información sobre un bloque por número de bloque.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `QUANTITY|TAG` - entero de un número de bloque, o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, como en el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Si es `true` devuelve los objetos de transacción completos, si es `false` solo los hashes de las transacciones.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Devuelve**
Ver [eth_getBlockByHash](#eth-getblockbyhash)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Para el resultado, ver [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Devuelve la información sobre una transacción solicitada por el hash de transacción.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 32 bytes - hash de una transacción

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Devuelve**

`Object` - Un objeto de transacción, o `null` cuando no se encontró ninguna transacción:

- `blockHash`: `DATA`, 32 bytes - hash del bloque en el que se encontraba esta transacción. `null` cuando está pendiente.
- `blockNumber`: `QUANTITY` - número de bloque en el que se encontraba esta transacción. `null` cuando está pendiente.
- `from`: `DATA`, 20 bytes - dirección del remitente.
- `gas`: `QUANTITY` - gas proporcionado por el remitente.
- `gasPrice`: `QUANTITY` - precio del gas proporcionado por el remitente en Wei.
- `hash`: `DATA`, 32 bytes - hash de la transacción.
- `input`: `DATA` - los datos enviados junto con la transacción.
- `nonce`: `QUANTITY` - el número de transacciones realizadas por el remitente antes de esta.
- `to`: `DATA`, 20 bytes - dirección del receptor. `null` cuando es una transacción de creación de contrato.
- `transactionIndex`: `QUANTITY` - número entero de la posición del índice de la transacción en el bloque. `null` cuando está pendiente.
- `value`: `QUANTITY` - valor transferido en Wei.
- `v`: `QUANTITY` - ID de recuperación de ECDSA
- `r`: `QUANTITY` - firma ECDSA r
- `s`: `QUANTITY` - firma ECDSA s

**Ejemplo**

```js
// Solicitud
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

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

Devuelve información sobre una transacción mediante el hash del bloque y la posición del índice de la transacción.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 32 bytes: hash de un bloque.
2. `QUANTITY`: número entero de la posición del índice de la transacción.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Devuelve**
Consulte [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Para ver el resultado, consulte [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Devuelve información sobre una transacción por número de bloque y posición de índice de transacción.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `QUANTITY|TAG` - un número de bloque, o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, como en el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - la posición del índice de la transacción.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Devuelve**
Ver [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Para el resultado, ver [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Devuelve el recibo de una transacción por hash de transacción.

**Nota:** El recibo no está disponible para transacciones pendientes.

**Parámetros**

1. `DATA`, 32 bytes - hash de una transacción

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Devuelve**
`Object` - Un objeto de recibo de transacción, o `null` cuando no se encontró ningún recibo:

- `transactionHash `: `DATA`, 32 bytes - hash de la transacción.
- `transactionIndex`: `QUANTITY` - número entero de la posición del índice de la transacción en el bloque.
- `blockHash`: `DATA`, 32 bytes - hash del bloque en el que se encontraba esta transacción.
- `blockNumber`: `QUANTITY` - número de bloque en el que se encontraba esta transacción.
- `from`: `DATA`, 20 bytes - dirección del remitente.
- `to`: `DATA`, 20 bytes - dirección del receptor. Es nulo cuando es una transacción de creación de contrato.
- `cumulativeGasUsed` : `QUANTITY ` - La cantidad total de gas utilizado cuando se ejecutó esta transacción en el bloque.
- `effectiveGasPrice` : `QUANTITY` - La suma de la tarifa base y la tarifa de prioridad pagada por unidad de gas.
- `gasUsed `: `QUANTITY ` - La cantidad de gas utilizado solo por esta transacción específica.
- `contractAddress `: `DATA`, 20 bytes - La dirección del contrato creado, si la transacción fue una creación de contrato, de lo contrario `null`.
- `logs`: `Array` - Arreglo de objetos de registro que generó esta transacción.
- `logsBloom`: `DATA`, 256 bytes - Filtro de Bloom para que los clientes ligeros recuperen rápidamente los registros relacionados.
- `type`: `QUANTITY` - número entero del tipo de transacción, `0x0` para transacciones heredadas, `0x1` para tipos de listas de acceso, `0x2` para tarifas dinámicas.

También devuelve _uno de los siguientes_:

- `root` : `DATA` 32 bytes de la raíz de estado posterior a la transacción (antes de Bizancio)
- `status`: `QUANTITY` ya sea `1` (éxito) o `0` (fracaso)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // cadena de la dirección si fue creada
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // registros devueltos por getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // filtro de bloom de 256 bytes
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

Devuelve información sobre un tío de un bloque por hash y posición de índice del tío.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Probar endpoint en el entorno de pruebas
</ButtonLink>

**Parámetros**

1. `DATA`, 32 bytes: el hash de un bloque.
2. `QUANTITY`: la posición de índice del tío.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Devuelve**
Ver [eth_getBlockByHash](#eth-getblockbyhash)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Para el resultado, ver [eth_getBlockByHash](#eth-getblockbyhash)

**Nota**: Un tío no contiene transacciones individuales.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Devuelve información sobre un tío de un bloque por número y posición de índice del tío.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Probar endpoint en el playground
</ButtonLink>

**Parámetros**

1. `QUANTITY|TAG` - un número de bloque, o la cadena `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, como en el [parámetro de bloque](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - la posición de índice del tío.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Devuelve**
Consulte [eth_getBlockByHash](#eth-getblockbyhash)

**Nota**: Un tío no contiene transacciones individuales.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Para el resultado, consulte [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Crea un objeto de filtro, basado en las opciones de filtro, para notificar cuando el estado cambia (registros).
Para comprobar si el estado ha cambiado, llame a [eth_getFilterChanges](#eth-getfilterchanges).

**Una nota sobre la especificación de filtros de temas:**
Los temas dependen del orden. Una transacción con un registro con los temas [A, B] coincidirá con los siguientes filtros de temas:

- `[]` "cualquier cosa"
- `[A]` "A en primera posición (y cualquier cosa después)"
- `[null, B]` "cualquier cosa en primera posición Y B en segunda posición (y cualquier cosa después)"
- `[A, B]` "A en primera posición Y B en segunda posición (y cualquier cosa después)"
- `[[A, B], [A, B]]` "(A O B) en primera posición Y (A O B) en segunda posición (y cualquier cosa después)"
- **Parámetros**

1. `Object` - Las opciones de filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero, o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado, o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `toBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero, o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado, o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `address`: `DATA|Array`, 20 Bytes - (opcional) Dirección del contrato o una lista de direcciones de las que deben originarse los registros.
- `topics`: `Array of DATA`, - (opcional) Matriz de temas `DATA` de 32 Bytes. Los temas dependen del orden. Cada tema también puede ser una matriz de DATOS con opciones "or".

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

**Devuelve**
`QUANTITY` - Un id de filtro.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Crea un filtro en el nodo para notificar cuando llega un nuevo bloque.
Para comprobar si el estado ha cambiado, llame a [eth_getFilterChanges](#eth-getfilterchanges).

**Parámetros**
Ninguno

**Devuelve**
`QUANTITY` - Un id de filtro.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Crea un filtro en el nodo para notificar cuando llegan nuevas transacciones pendientes.
Para comprobar si el estado ha cambiado, llame a [eth_getFilterChanges](#eth-getfilterchanges).

**Parámetros**
Ninguno

**Devuelve**
`QUANTITY` - Un id de filtro.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Desinstala un filtro con el id dado. Siempre debe llamarse cuando ya no se necesite observar.
Además, los filtros caducan cuando no se solicitan con [eth_getFilterChanges](#eth-getfilterchanges) durante un período de tiempo.

**Parámetros**

1. `QUANTITY` - El id del filtro.

```js
params: [
  "0xb", // 11
]
```

**Devuelve**
`Boolean` - `true` si el filtro se desinstaló correctamente, de lo contrario `false`.

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Método de sondeo para un filtro, que devuelve un arreglo de registros que ocurrieron desde el último sondeo.

**Parámetros**

1. `QUANTITY` - el id del filtro.

```js
params: [
  "0x16", // 22
]
```

**Devuelve**
`Array` - Arreglo de objetos de registro, o un arreglo vacío si nada ha cambiado desde el último sondeo.

- Para los filtros creados con `eth_newBlockFilter` lo que se devuelve son hashes de bloque (`DATA`, 32 Bytes), por ejemplo, `["0x3454645634534..."]`.
- Para los filtros creados con `eth_newPendingTransactionFilter ` lo que se devuelve son hashes de transacción (`DATA`, 32 Bytes), por ejemplo, `["0x6345343454645..."]`.
- Para los filtros creados con `eth_newFilter` los registros son objetos con los siguientes parámetros:
  - `removed`: `TAG` - `true` cuando el registro fue eliminado, debido a una reorganización de la cadena. `false` si es un registro válido.
  - `logIndex`: `QUANTITY` - número entero de la posición del índice del registro en el bloque. `null` cuando es un registro pendiente.
  - `transactionIndex`: `QUANTITY` - número entero de la posición del índice de la transacción a partir de la cual se creó el registro. `null` cuando es un registro pendiente.
  - `transactionHash`: `DATA`, 32 Bytes - hash de la transacción a partir de la cual se creó este registro. `null` cuando es un registro pendiente.
  - `blockHash`: `DATA`, 32 Bytes - hash del bloque en el que estaba este registro. `null` cuando está pendiente. `null` cuando es un registro pendiente.
  - `blockNumber`: `QUANTITY` - el número de bloque en el que estaba este registro. `null` cuando está pendiente. `null` cuando es un registro pendiente.
  - `address`: `DATA`, 20 Bytes - dirección de la que se originó este registro.
  - `data`: `DATA` - datos de registro no indexados de longitud variable. (En _Solidity_: cero o más argumentos de registro no indexados de 32 Bytes).
  - `topics`: `Array of DATA` - Arreglo de 0 a 4 `DATA` de 32 Bytes de argumentos de registro indexados. (En _Solidity_: El primer tema es el _hash_ de la firma del evento (por ejemplo, `Deposit(address,bytes32,uint256)`), excepto si declaró el evento con el especificador `anonymous`).

- **Ejemplo**

```js
// Solicitud
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

### eth_getFilterLogs {#eth-getfilterlogs}

Devuelve un arreglo de todos los registros que coinciden con el filtro con el id dado.

**Parámetros**

1. `QUANTITY` - El id del filtro.

```js
params: [
  "0x16", // 22
]
```

**Devuelve**
Consulte [eth_getFilterChanges](#eth-getfilterchanges)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Para ver el resultado, consulte [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Devuelve un arreglo de todos los registros que coinciden con un objeto de filtro dado.

**Parámetros**

1. `Object` - Las opciones de filtro:

- `fromBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero, o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado, o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `toBlock`: `QUANTITY|TAG` - (opcional, por defecto: `"latest"`) Número de bloque entero, o `"latest"` para el último bloque propuesto, `"safe"` para el último bloque seguro, `"finalized"` para el último bloque finalizado, o `"pending"`, `"earliest"` para transacciones que aún no están en un bloque.
- `address`: `DATA|Array`, 20 Bytes - (opcional) Dirección del contrato o una lista de direcciones de las que deben originarse los registros.
- `topics`: `Array of DATA`, - (opcional) Arreglo de temas `DATA` de 32 Bytes. Los temas dependen del orden. Cada tema también puede ser un arreglo de DATA con opciones "or".
- `blockHash`: `DATA`, 32 Bytes - (opcional, **futuro**) Con la adición de EIP-234, `blockHash` será una nueva opción de filtro que restringe los registros devueltos al único bloque con el hash de 32 bytes `blockHash`. Usar `blockHash` es equivalente a `fromBlock` = `toBlock` = el número de bloque con el hash `blockHash`. Si `blockHash` está presente en los criterios de filtro, entonces no se permiten ni `fromBlock` ni `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Devuelve**
Ver [eth_getFilterChanges](#eth-getfilterchanges)

**Ejemplo**

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Para ver el resultado, consulte [eth_getFilterChanges](#eth-getfilterchanges)

## Ejemplo de uso {#usage-example}

### Desplegar un contrato usando JSON_RPC {#deploying-contract}

Esta sección incluye una demostración de cómo desplegar un contrato usando solo la interfaz RPC. Existen rutas alternativas para desplegar contratos donde esta complejidad se abstrae; por ejemplo, usando bibliotecas construidas sobre la interfaz RPC como [Web3.js](https://web3js.readthedocs.io/) y [Web3.py](https://github.com/ethereum/web3.py). Estas abstracciones son generalmente más fáciles de entender y menos propensas a errores, pero sigue siendo útil entender cómo funciona internamente.

El siguiente es un contrato inteligente sencillo llamado `Multiply7` que se desplegará usando la interfaz JSON-RPC en un nodo de Ethereum. Este tutorial asume que el lector ya está ejecutando un nodo de Geth. Hay más información sobre nodos y clientes disponible [aquí](/developers/docs/nodes-and-clients/run-a-node). Consulte la documentación individual del [cliente](/developers/docs/nodes-and-clients/) para ver cómo iniciar el HTTP JSON-RPC para clientes que no sean Geth. La mayoría de los clientes sirven por defecto en `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Lo primero que hay que hacer es asegurarse de que la interfaz HTTP RPC esté habilitada. Esto significa que proporcionamos a Geth la bandera `--http` al inicio. En este ejemplo usamos el nodo de Geth en una cadena de desarrollo privada. Usando este enfoque no necesitamos ether en la red real.

```bash
geth --http --dev console 2>>geth.log
```

Esto iniciará la interfaz HTTP RPC en `http://localhost:8545`.

Podemos verificar que la interfaz se está ejecutando recuperando la dirección coinbase (obteniendo la primera dirección de la matriz de cuentas) y el saldo usando [curl](https://curl.se). Tenga en cuenta que los datos en estos ejemplos diferirán en su nodo local. Si desea probar estos comandos, reemplace los parámetros de solicitud en la segunda solicitud curl con el resultado devuelto por la primera.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Debido a que los números están codificados en formato hexadecimal, el saldo se devuelve en Wei como una cadena hexadecimal. Si queremos tener el saldo en ether como un número, podemos usar web3 desde la consola de Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Ahora que hay algo de ether en nuestra cadena de desarrollo privada, podemos desplegar el contrato. El primer paso es compilar el contrato Multiply7 a código de bytes que se pueda enviar a la EVM. Para instalar solc, el compilador de Solidity, siga la [documentación de Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Es posible que desee usar una versión anterior de `solc` para que coincida con [la versión del compilador utilizada para nuestro ejemplo](https://github.com/ethereum/solidity/releases/tag/v0.4.20)).

El siguiente paso es compilar el contrato Multiply7 a código de bytes que se pueda enviar a la EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Ahora que tenemos el código compilado, necesitamos determinar cuánto gas cuesta desplegarlo. La interfaz RPC tiene un método `eth_estimateGas` que nos dará una estimación.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Y finalmente desplegar el contrato.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

El nodo acepta la transacción y se devuelve un hash de transacción. Este hash se puede usar para rastrear la transacción. El siguiente paso es determinar la dirección donde se despliega nuestro contrato. Cada transacción ejecutada creará un recibo. Este recibo contiene diversa información sobre la transacción, como en qué bloque se incluyó la transacción y cuánto gas usó la EVM. Si una transacción crea un contrato, también contendrá la dirección del contrato. Podemos recuperar el recibo con el método RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Nuestro contrato se creó en `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Un resultado nulo en lugar de un recibo significa que la transacción aún no se ha incluido en un bloque. Espere un momento, compruebe si su cliente de consenso se está ejecutando y vuelva a intentarlo.

#### Interactuar con contratos inteligentes {#interacting-with-smart-contract}

En este ejemplo enviaremos una transacción usando `eth_sendTransaction` al método `multiply` del contrato.

`eth_sendTransaction` requiere varios argumentos, específicamente `from`, `to` y `data`. `From` es la dirección pública de nuestra cuenta, y `to` es la dirección del contrato. El argumento `data` contiene una carga útil que define qué método debe llamarse y con qué argumentos. Aquí es donde entra en juego la [ABI (interfaz binaria de aplicación)](https://docs.soliditylang.org/en/latest/abi-spec.html). La ABI es un archivo JSON que define cómo definir y codificar datos para la EVM.

Los bytes de la carga útil definen qué método del contrato se llama. Estos son los primeros 4 bytes del hash Keccak sobre el nombre de la función y sus tipos de argumentos, codificados en formato hexadecimal. La función multiply acepta un uint, que es un alias de uint256. Esto nos deja con:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

El siguiente paso es codificar los argumentos. Solo hay un uint256, digamos, el valor 6. La ABI tiene una sección que especifica cómo codificar los tipos uint256.

`int<M>: enc(X)` es la codificación en complemento a dos big-endian de X, rellenada en el lado de orden superior (izquierdo) con 0xff para X negativo y con bytes cero para X positivo de modo que la longitud sea un múltiplo de 32 bytes.

Esto se codifica como `0000000000000000000000000000000000000000000000000000000000000006`.

Combinando el selector de función y el argumento codificado, nuestros datos serán `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Esto ahora se puede enviar al nodo:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Dado que se envió una transacción, se devolvió un hash de transacción. Al recuperar el recibo se obtiene:

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

El recibo contiene un registro. Este registro fue generado por la EVM en la ejecución de la transacción y se incluyó en el recibo. La función `multiply` muestra que el evento `Print` se generó con la entrada multiplicada por 7. Dado que el argumento para el evento `Print` era un uint256, podemos decodificarlo de acuerdo con las reglas de la ABI, lo que nos dejará con el decimal 42 esperado. Aparte de los datos, vale la pena señalar que los temas (topics) se pueden usar para determinar qué evento creó el registro:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Esta fue solo una breve introducción a algunas de las tareas más comunes, demostrando el uso directo de JSON-RPC.

## Temas relacionados {#related-topics}

- [Especificación JSON-RPC](https://www.jsonrpc.org/specification)
- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [API de JavaScript](/developers/docs/apis/javascript/)
- [API de backend](/developers/docs/apis/backend/)
- [Clientes de ejecución](/developers/docs/nodes-and-clients/#execution-clients)
