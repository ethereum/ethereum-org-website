---
title: Transacciones
description: Una descripción general de las transacciones de Ethereum: cómo funcionan, su estructura de datos y cómo enviarlas a través de una aplicación.
lang: es
---

Las transacciones son instrucciones firmadas criptográficamente desde cuentas. Una cuenta iniciará una transacción para actualizar el estado de la red [Ethereum](/). La transacción más simple es transferir ETH de una cuenta a otra.

## Requisitos previos {#prerequisites}

Para ayudarle a comprender mejor esta página, le recomendamos que primero lea [Cuentas](/developers/docs/accounts/) y nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una transacción? {#whats-a-transaction}

Una transacción de Ethereum se refiere a una acción iniciada por una cuenta de propiedad externa, en otras palabras, una cuenta administrada por un humano, no por un contrato. Por ejemplo, si Bob envía a Alice 1 ETH, la cuenta de Bob debe ser debitada y la de Alice debe ser acreditada. Esta acción que cambia el estado tiene lugar dentro de una transacción.

![Diagram showing a transaction cause state change](./tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las transacciones, que cambian el estado de la EVM, deben transmitirse a toda la red. Cualquier nodo puede transmitir una solicitud para que se ejecute una transacción en la EVM; después de que esto suceda, un validador ejecutará la transacción y propagará el cambio de estado resultante al resto de la red.

Las transacciones requieren una tarifa y deben incluirse en un bloque validado. Para simplificar esta descripción general, cubriremos las tarifas de gas y la validación en otra parte.

Una transacción enviada incluye la siguiente información:

- `from`: la dirección del remitente, que firmará la transacción. Esta será una cuenta de propiedad externa, ya que las cuentas de contrato no pueden enviar transacciones.
- `to`: la dirección receptora (si es una cuenta de propiedad externa, la transacción transferirá valor. Si es una cuenta de contrato, la transacción ejecutará el código del contrato).
- `signature`: el identificador del remitente. Esto se genera cuando la clave privada del remitente firma la transacción y confirma que el remitente ha autorizado esta transacción.
- `nonce`: un contador que se incrementa secuencialmente y que indica el número de transacción de la cuenta.
- `value`: cantidad de ETH a transferir del remitente al destinatario (denominada en Wei, donde 1 ETH equivale a 1e+18 Wei).
- `input data`: campo opcional para incluir datos arbitrarios.
- `gasLimit`: la cantidad máxima de unidades de gas que puede consumir la transacción. La [EVM](/developers/docs/evm/opcodes) especifica las unidades de gas requeridas por cada paso computacional.
- `maxPriorityFeePerGas`: el precio máximo del gas consumido que se incluirá como tarifa de prioridad para el validador.
- `maxFeePerGas`: la tarifa máxima por unidad de gas que se está dispuesto a pagar por la transacción (incluyendo `baseFeePerGas` y `maxPriorityFeePerGas`).

El gas es una referencia a la computación requerida para procesar la transacción por parte de un validador. Los usuarios tienen que pagar una tarifa por esta computación. El `gasLimit` y el `maxPriorityFeePerGas` determinan la tarifa de transacción máxima pagada al validador. [Más sobre el gas](/developers/docs/gas/).

El objeto de la transacción se verá un poco así:

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

Pero un objeto de transacción debe estar firmado usando la clave privada del remitente. Esto prueba que la transacción solo pudo provenir del remitente y no fue enviada de manera fraudulenta.

Un cliente de Ethereum como Geth manejará este proceso de firma.

Ejemplo de llamada [JSON-RPC](/developers/docs/apis/json-rpc):

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

- el `raw` es la transacción firmada en forma codificada de [Prefijo de Longitud Recursiva (RLP)](/developers/docs/data-structures-and-encoding/rlp).
- el `tx` es la transacción firmada en formato JSON.

Con el hash de la firma, se puede probar criptográficamente que la transacción provino del remitente y se envió a la red.

### El campo de datos {#the-data-field}

La gran mayoría de las transacciones acceden a un contrato desde una cuenta de propiedad externa.
La mayoría de los contratos están escritos en Solidity e interpretan su campo de datos de acuerdo con la [interfaz binaria de aplicación (ABI)](/glossary/#abi).

Los primeros cuatro bytes especifican a qué función llamar, utilizando el hash del nombre y los argumentos de la función.
A veces puede identificar la función a partir del selector utilizando [esta base de datos](https://www.4byte.directory/signatures/).

El resto de los datos de llamada son los argumentos, [codificados como se especifica en las especificaciones de la ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Por ejemplo, echemos un vistazo a [esta transacción](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Use **Click to see More** para ver los datos de llamada.

El selector de función es `0xa9059cbb`. Hay varias [funciones conocidas con esta firma](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
En este caso, [el código fuente del contrato](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) se ha subido a Etherscan, por lo que sabemos que la función es `transfer(address,uint256)`.

El resto de los datos es:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Según las especificaciones de la ABI, los valores enteros (como las direcciones, que son enteros de 20 bytes) aparecen en la ABI como palabras de 32 bytes, rellenadas con ceros en la parte delantera.
Por lo tanto, sabemos que la dirección `to` es [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
La `value` es 0x3b0559f4 = 990206452.

### Descriptores de transacciones {#transaction-descriptors}

Debido a que el campo de datos contiene bytes hexadecimales opacos, puede ser extremadamente difícil verificar qué acción realizará realmente una transacción. Esta vulnerabilidad de "firma a ciegas" se aborda mediante la **[firma clara](https://clearsigning.org/)** a través del uso de [descriptores de transacciones](https://eips.ethereum.org/EIPS/eip-7730) (definidos por ERC-7730).  

La especificación ERC-7730 utiliza descriptores de transacciones (a menudo estructurados como archivos JSON) para enriquecer los datos que se encuentran en las ABI y los mensajes estructurados, como los datos de llamada de transacciones de la EVM, los mensajes EIP-712 y las operaciones de usuario EIP-4337. Los desarrolladores utilizan estos descriptores para mapear variables de transacciones específicas directamente en plantillas de formato, asegurando que los datos subyacentes sigan siendo legibles por máquina para las aplicaciones.

En el frontend, las billeteras utilizan este contexto de formato para traducir el código de bytes opaco en información clara y legible para los humanos. Al resolver automáticamente valores como direcciones de tokens en símbolos reconocidos, o cantidades en decimales, a los usuarios se les presenta un resumen en lenguaje sencillo de la intención exacta de la transacción (por ejemplo, 'Intercambiar 1000 USDC por al menos 0.25 WETH') antes de que firmen.

## Tipos de transacciones {#types-of-transactions}

En Ethereum hay algunos tipos diferentes de transacciones:

- Transacciones regulares: una transacción de una cuenta a otra.
- Transacciones de despliegue de contratos: una transacción sin una dirección 'to' (para), donde el campo de datos se utiliza para el código del contrato.
- Ejecución de un contrato: una transacción que interactúa con un contrato inteligente desplegado. En este caso, la dirección 'to' es la dirección del contrato inteligente.

### Sobre el gas {#on-gas}

Como se mencionó, las transacciones cuestan [gas](/developers/docs/gas/) para ejecutarse. Las transacciones de transferencia simples requieren 21000 unidades de gas.

Entonces, para que Bob envíe a Alice 1 ETH a una `baseFeePerGas` de 190 Gwei y una `maxPriorityFeePerGas` de 10 Gwei, Bob tendrá que pagar la siguiente tarifa:

```
(190 + 10) * 21000 = 4,200,000 Gwei
--o--
0.0042 ETH
```

La cuenta de Bob será debitada con **-1.0042 ETH** (1 ETH para Alice + 0.0042 ETH en tarifas de gas).

La cuenta de Alice será acreditada con **+1.0 ETH**.

La tarifa base será quemada **-0.00399 ETH**.

El validador se queda con la tarifa de prioridad **+0.000210 ETH**.


![Diagram showing how unused gas is refunded](./gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Cualquier gas no utilizado en una transacción se reembolsa a la cuenta del usuario.

### Interacciones de contratos inteligentes {#smart-contract-interactions}

Se requiere gas para cualquier transacción que involucre un contrato inteligente.

Los contratos inteligentes también pueden contener funciones conocidas como funciones [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) o [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), que no alteran el estado del contrato. Como tal, llamar a estas funciones desde una EOA (cuenta de propiedad externa) no requerirá ningún gas. La llamada RPC subyacente para este escenario es [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

A diferencia de cuando se accede mediante `eth_call`, estas funciones `view` o `pure` también se llaman comúnmente de forma interna (es decir, desde el propio contrato o desde otro contrato), lo que sí cuesta gas.

## Ciclo de vida de la transacción {#transaction-lifecycle}

Una vez que se ha enviado la transacción, sucede lo siguiente:

1. Se genera criptográficamente un hash de transacción:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Luego, la transacción se transmite a la red y se agrega a un pool de transacciones que consta de todas las demás transacciones pendientes de la red.
3. Un validador debe elegir su transacción e incluirla en un bloque para verificar la transacción y considerarla "exitosa".
4. A medida que pasa el tiempo, el bloque que contiene su transacción se actualizará a "justificado" y luego a "finalizado". Estas actualizaciones hacen que sea mucho
   más seguro que su transacción fue exitosa y nunca será alterada. Una vez que un bloque está "finalizado", solo podría cambiarse
   mediante un ataque a nivel de red que costaría muchos miles de millones de dólares.

## Una demostración visual {#a-visual-demo}

Vea a Austin guiarle a través de las transacciones, el gas y la minería.

<VideoWatch slug="transactions-eth-build" />

## Sobre de transacción tipada {#typed-transaction-envelope}

Ethereum originalmente tenía un formato para las transacciones. Cada transacción contenía un nonce, precio del gas, límite de gas, dirección de destino (to), valor, datos, v, r y s. Estos campos están [codificados en RLP](/developers/docs/data-structures-and-encoding/rlp/), para verse algo así:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum ha evolucionado para admitir múltiples tipos de transacciones para permitir que se implementen nuevas características como listas de acceso y [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) sin afectar los formatos de transacciones heredados.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) es lo que permite este comportamiento. Las transacciones se interpretan como:

`TransactionType || TransactionPayload`

Donde los campos se definen como:

- `TransactionType`: un número entre 0 y 0x7f, para un total de 128 tipos de transacciones posibles.
- `TransactionPayload`: una matriz de bytes arbitraria definida por el tipo de transacción.

Según el valor de `TransactionType`, una transacción se puede clasificar como:

1. **Transacciones de tipo 0 (heredadas):** El formato de transacción original utilizado desde el lanzamiento de Ethereum. No incluyen características de [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) como cálculos dinámicos de tarifas de gas o listas de acceso para contratos inteligentes. Las transacciones heredadas carecen de un prefijo específico que indique su tipo en su forma serializada, comenzando con el byte `0xf8` cuando se utiliza la codificación de [Prefijo de Longitud Recursiva (RLP)](/developers/docs/data-structures-and-encoding/rlp). El valor de TransactionType para estas transacciones es `0x0`.

2. **Transacciones de tipo 1:** Introducidas en [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) como parte de la [actualización Berlín](/ethereum-forks/#berlin) de Ethereum, estas transacciones incluyen un parámetro `accessList`. Esta lista especifica las direcciones y las claves de almacenamiento a las que la transacción espera acceder, lo que ayuda a reducir potencialmente los costos de [gas](/developers/docs/gas/) para transacciones complejas que involucran contratos inteligentes. Los cambios en el mercado de tarifas de EIP-1559 no se incluyen en las transacciones de tipo 1. Las transacciones de tipo 1 también incluyen un parámetro `yParity`, que puede ser `0x0` o `0x1`, lo que indica la paridad del valor y de la firma secp256k1. Se identifican por comenzar con el byte `0x01`, y su valor de TransactionType es `0x1`.

3. **Transacciones de tipo 2**, comúnmente conocidas como transacciones EIP-1559, son transacciones introducidas en [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), en la [actualización London](/ethereum-forks/#london) de Ethereum. Se han convertido en el tipo de transacción estándar en la red Ethereum. Estas transacciones introducen un nuevo mecanismo de mercado de tarifas que mejora la previsibilidad al separar la tarifa de transacción en una tarifa base y una tarifa de prioridad. Comienzan con el byte `0x02` e incluyen campos como `maxPriorityFeePerGas` y `maxFeePerGas`. Las transacciones de tipo 2 son ahora las predeterminadas debido a su flexibilidad y eficiencia, especialmente favorecidas durante períodos de alta congestión de la red por su capacidad para ayudar a los usuarios a administrar las tarifas de transacción de manera más predecible. El valor de TransactionType para estas transacciones es `0x2`.

4. **Transacciones de tipo 3 (blob)** se introdujeron en [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) como parte de la [actualización Dencun](/ethereum-forks/#dencun) de Ethereum. Estas transacciones están diseñadas para manejar datos "blob" (objetos binarios grandes) de manera más eficiente, beneficiando particularmente a los rollup de capa 2 (l2) al proporcionar una forma de publicar datos en la red Ethereum a un costo menor. Las transacciones blob incluyen campos adicionales como `blobVersionedHashes`, `maxFeePerBlobGas` y `blobGasPrice`. Comienzan con el byte `0x03`, y su valor de TransactionType es `0x3`. Las transacciones blob representan una mejora significativa en la disponibilidad de datos y las capacidades de escalado de Ethereum.

5. **Transacciones de tipo 4** se introdujeron en [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) como parte de la [actualización Pectra](/roadmap/pectra/) de Ethereum. Estas transacciones están diseñadas para ser compatibles con versiones futuras con la abstracción de cuentas. Permiten que las EOA se comporten temporalmente como cuentas de contrato inteligente sin comprometer su funcionalidad original. Incluyen un parámetro `authorization_list`, que especifica el contrato inteligente al que la EOA delega su autoridad. Después de la transacción, el campo de código de la EOA tendrá la dirección del contrato inteligente delegado.

## Lecturas adicionales {#further-reading}

- [EIP-2718: Sobre de transacción tipada](https://eips.ethereum.org/EIPS/eip-2718)

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Cuentas](/developers/docs/accounts/)
- [Máquina virtual de Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)