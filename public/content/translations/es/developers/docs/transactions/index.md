---
title: Transacciones
description: "Descripción general sobre las transacciones de Ethereum: Cómo funcionan, su estructura de datos y cómo enviarlas a través de una aplicación."
lang: es
---

Las transacciones son instrucciones firmadas criptográficamente desde las cuentas. Una cuenta iniciará una transacción para actualizar el estado de la red Ethereum. La transacción más sencilla es transferir ETH de una cuenta a otra.

## Requisitos previos {#prerequisites}

Para ayudarle a comprender mejor esta página, le recomendamos que lea primero [Cuentas](/developers/docs/accounts/) y nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una transacción? {#whats-a-transaction}

Una transacción de Ethereum hace referencia a una acción iniciada por una cuenta de titularidad externa, en otras palabras, una cuenta administrada por una persona, no un contrato. Por ejemplo, si Bob le envía 1 ETH a Alice, este debe adeudarse de la cuenta de Bob y acreditarse en la cuenta de Alice. Esta acción según la que se modifica el estado de la red tiene lugar en una transacción.

![Diagrama que muestra un cambio de estado de una transacción](./tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las transacciones, que modifican el estado de la EVM, se deben transmitir a toda la red. Cualquier nodo puede transmitir una solicitud para que se ejecute una transacción en la EVM; después de que esto suceda, un validador ejecutará la transacción y propagará el cambio de estado resultante al resto de la red.

Las transacciones requieren una tarifa y deben incluirse en un bloque validado. Para simplificar este resumen, abarcaremos las comisiones de gas y el minado por separado.

Una transacción enviada incluye la siguiente información:

- `from`: la dirección del remitente que firmará la transacción. Esta será una cuenta de titularidad externa, ya que las cuentas contractuales no pueden enviar transacciones
- `to`: la dirección de recepción (si es una cuenta de propiedad externa, la transacción transferirá valor. Si se trata de un contrato, la transacción ejecutará el código del contrato).
- `signature`: el identificador del remitente. Se genera cuando la clave privada del remitente firma la transacción y confirma que el remitente ha autorizado esta transacción.
- `nonce`: un contador que se incrementa secuencialmente y que indica el número de transacción de la cuenta.
- `value`: la cantidad de ETH que se transferirá del remitente al destinatario (denominada en WEI, donde 1 ETH equivale a 1e+18 wei).
- `input data`: campo opcional para incluir datos arbitrarios.
- `gasLimit`: la cantidad máxima de unidades de gas que puede consumir la transacción. La [EVM](/developers/docs/evm/opcodes) especifica las unidades de gas necesarias para cada paso computacional.
- `maxPriorityFeePerGas`: el precio máximo del gas consumido que se incluirá como propina para el validador.
- `maxFeePerGas`: la tarifa máxima por unidad de gas que se está dispuesto a pagar por la transacción (incluye `baseFeePerGas` y `maxPriorityFeePerGas`).

El gas es una referencia al cálculo necesario para que el validador procese la transacción. Los usuarios tienen que pagar una tarifa por ese cálculo. El `gasLimit` y `maxPriorityFeePerGas` determinan la comisión máxima de la transacción que se paga al validador. [Más sobre el gas](/developers/docs/gas/).

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

- `raw` es la transacción firmada en formato codificado de [prefijo de longitud recursiva (RLP)](/developers/docs/data-structures-and-encoding/rlp).
- la propiedad `tx` es la transacción firmada en formato JSON.

Mediante el hash de la firma, se puede demostrar criptográficamente que la transacción proviene del emisor y que se envió a la red.

### El campo de datos {#the-data-field}

La gran mayoría de las transacciones acceden a un contrato desde una cuenta de titularidad externa.
La mayoría de los contratos se escriben en Solidity e interpretan su campo de datos de acuerdo con la [interfaz binaria de aplicación (ABI)](/glossary/#abi).

Los primeros cuatro bytes especifican qué función de llamar, usando el hash del nombre y los argumentos de la función.
A veces puede identificar la función desde el selector utilizando [esta base de datos](https://www.4byte.directory/signatures/).

El resto de los datos de la llamada (calldata) son los argumentos, [codificados como se especifica en las especificaciones de la ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Por ejemplo, echemos un vistazo a [esta transacción](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Haga clic en **Click to see More** para ver los datos de la llamada (calldata).

El selector de función es `0xa9059cbb`. Hay varias [funciones conocidas con esta firma](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
En este caso, [el código fuente del contrato](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) se ha subido a Etherscan, por lo que sabemos que la función es `transfer(address,uint256)`.

El resto de los datos es:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

De acuerdo con las especificaciones ABI, valores enteros (como direcciones, que son enteros de 20 bytes) aparecen en el ABI como palabras de 32 bytes, agregadas con ceros en el frente.
Así que sabemos que la dirección `to` es [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
El `value` es 0x3b0559f4 = 990206452.

## Tipos de transacciones {#types-of-transactions}

En Ethereum hay algunos tipos diferentes de transacciones:

- Transacciones regulares: una transacción desde una cartera a otra.
- Transacciones de despliegue de contratos: una transacción sin la dirección «a», donde el campo de datos se usa para el código de contrato.
- Ejecución de un contrato: una transacción que interactúa con un contrato inteligente desplegado. En este caso, la dirección «a» es la dirección de contrato inteligente.

### Sobre el gas {#on-gas}

Como se ha mencionado, las transacciones cuestan [gas](/developers/docs/gas/) para ejecutarse. Las transacciones de transferencia simple requieren 21.000 unidades de gas.

Así que, para que Bob envíe 1 ETH a Alice con una `baseFeePerGas` de 190 gwei y una `maxPriorityFeePerGas` de 10 gwei, Bob tendrá que pagar la siguiente comisión:

```
(190 + 10) * 21000 = 4,200,000 gwei
--o--
0,0042 ETH
```

Se cargará en la cuenta de Bob **-1,0042 ETH** (1 ETH para Alice + 0,0042 ETH en comisiones de gas).

Se abonará en la cuenta de Alice **+1,0 ETH**.

La tarifa base se quemará **-0,00399 ETH**.

El validador se queda con la propina **+0,000210 ETH**.

![Diagrama que muestra cómo se reembolsa el gas no utilizado](./gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Cualquier gas no utilizado en una transacción se reembolsa a la cuenta de usuario.

### Interacciones de los contratos inteligentes {#smart-contract-interactions}

Se requiere gas para cualquier transacción que involucre un contrato inteligente.

Los contratos inteligentes también pueden contener funciones conocidas como funciones [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) o [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), que no alteran el estado del contrato. Como tal, invocar estas funciones desde una EOA no requerirá gas. La llamada RPC subyacente para este escenario es [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

A diferencia de cuando se accede mediante `eth_call`, estas funciones `view` o `pure` también se suelen llamar internamente (es decir, desde el propio contrato o desde otro contrato), lo que sí cuesta gas.

## Ciclo de vida de una transacción {#transaction-lifecycle}

Una vez enviada la transacción ocurre lo siguiente:

1. Un hash de transacción se genera criptográficamente:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Luego, la transacción se transmite a la red y se añade a un grupo de transacciones que consta de todas las demás transacciones que estan pendientes en la red.
3. Un validador debe elegir su transacción e incluirla en un bloque para verificarla antes de considerarla «satisfactoria».
4. A medida que pasa el tiempo, el bloque que contiene su transacción se actualizará a «justificado» y luego a «finalizado». Estas actualizaciones hacen que sea mucho más seguro que su transacción se haya realizado correctamente y que nunca se vaya a alterar. Una vez que un bloque está «finalizado», solo se puede cambiar mediante un ataque a nivel de red que costaría miles de millones de dólares.

## Una demostración visual {#a-visual-demo}

Observe a Austin mientras le guía por las transacciones, el gas y la minería.

<YouTube id="er-0ihqFQB0" />

## Sobre de transacción con tipo {#typed-transaction-envelope}

Inicialmente, Ethereum tenía un formato único para las transacciones. Cada transacción contenía un nonce, un precio de gas, un límite de gas, una dirección, un importe, datos, v, r y s. Estos campos están [codificados en RLP](/developers/docs/data-structures-and-encoding/rlp/) y tienen un aspecto similar a este:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum ha evolucionado para admitir múltiples tipos de transacciones, lo que permite que se implementen nuevas características como listas de acceso y [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) sin afectar a los formatos de transacción heredados.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) es lo que permite este comportamiento. Las transacciones se interpretan como:

`Tipo de transacción || Cargaútiltransacción`

Donde los campos indican:

- `TransactionType`: un número entre 0 y 0x7f, para un total de 128 tipos de transacción posibles.
- `TransactionPayload`: un array de bytes arbitrario definido por el tipo de transacción.

Según el valor de `TransactionType`, una transacción se puede clasificar como:

1. **Transacciones de tipo 0 (heredadas):** el formato de transacción original utilizado desde el lanzamiento de Ethereum. No incluyen características de [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), como cálculos dinámicos de las comisiones de gas o listas de acceso para los contratos inteligentes. Las transacciones heredadas carecen de un prefijo específico que indique su tipo en su forma serializada y empiezan con el byte `0xf8` cuando se utiliza la codificación de [prefijo de longitud recursiva (RLP)](/developers/docs/data-structures-and-encoding/rlp). El valor de TransactionType para estas transacciones es `0x0`.

2. **Transacciones de tipo 1:** introducidas en el [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) como parte de la [actualización Berlín](/ethereum-forks/#berlin) de Ethereum, estas transacciones incluyen un parámetro `accessList`. Esta lista especifica las direcciones y las claves de almacenamiento a las que la transacción espera acceder, lo que ayuda a reducir potencialmente los costes de [gas](/developers/docs/gas/) para transacciones complejas que involucran contratos inteligentes. Los cambios en el mercado de tarifas de EIP-1559 no se incluyen en las transacciones de Tipo 1. Las transacciones de tipo 1 también incluyen un parámetro `yParity`, que puede ser `0x0` o `0x1`, lo que indica la paridad del valor y de la firma secp256k1. Se identifican porque empiezan con el byte `0x01`, y su valor de TransactionType es `0x1`.

3. Las **transacciones de tipo 2**, comúnmente conocidas como transacciones EIP-1559, son transacciones introducidas en el [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), en la [actualización London](/ethereum-forks/#london) de Ethereum. Se han convertido en el tipo de transacción estándar en la red Ethereum. Estas transacciones introducen un nuevo mecanismo de mercado de tarifas que mejora la previsibilidad separando la tarifa de transacción en una tarifa base y una tarifa prioritaria. Empiezan con el byte `0x02` e incluyen campos como `maxPriorityFeePerGas` y `maxFeePerGas`. Las transacciones de Tipo 2 son ahora las predeterminadas debido a su flexibilidad y eficiencia, especialmente favorecidas durante los períodos de alta congestión de la red por su capacidad para ayudar a los usuarios a gestionar las tarifas de transacción de manera más predecible. El valor de TransactionType para estas transacciones es `0x2`.

4. Las **transacciones de tipo 3 (blob)** se introdujeron en el [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) como parte de la [actualización Dencun](/ethereum-forks/#dencun) de Ethereum. Estas transacciones están diseñadas para manejar datos «blob» (objetos grandes binarios) de manera más eficiente, beneficiando particularmente a los rollups de capa 2 al proporcionar una forma de publicar datos en la red Ethereum a un coste menor. Las transacciones de blob incluyen campos adicionales como `blobVersionedHashes`, `maxFeePerBlobGas` y `blobGasPrice`. Empiezan con el byte `0x03` y su valor de TransactionType es `0x3`. Las transacciones de Blob representan una mejora significativa en la disponibilidad de datos y las capacidades de escalabilidad de Ethereum.

5. Las **transacciones de tipo 4** se introdujeron en el [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) como parte de la [actualización Pectra](/roadmap/pectra/) de Ethereum. Estas transacciones están diseñadas para ser compatibles con la abstracción de cuentas. Permiten que las EOA se comporten temporalmente como cuentas de contratos inteligentes sin comprometer su funcionalidad original. Incluyen un parámetro `authorization_list`, que especifica el contrato inteligente al que la EOA delega su autoridad. Después de la transacción, el campo de código de la EOA tendrá la dirección del contrato inteligente delegado.

## Lecturas adicionales {#further-reading}

- [EIP-2718: Sobre de transacción con tipo](https://eips.ethereum.org/EIPS/eip-2718)

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_

## Temas relacionados {#related-topics}

- [Cuentas](/developers/docs/accounts/)
- [Máquina virtual de Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
