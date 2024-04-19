---
title: Transacciones
description: 'Descripción general sobre las transacciones de Ethereum: Cómo funcionan, su estructura de datos y cómo enviarlas a través de una aplicación.'
lang: es
---

Las transacciones son instrucciones firmadas criptográficamente que se emiten desde cuentas. Una cuenta iniciará una transacción para actualizar el estado de la red Ethereum. La transacción más sencilla es transferir ETH de una cuenta a otra.

## Requisitos previos {#prerequisites}

Para ayudarle a comprender mejor esta página, le recomendamos leer primero la sección sobre [Cuentas](/developers/docs/accounts/), así como nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una transacción? {#whats-a-transaction}

Una transacción de Ethereum hace referencia a una acción iniciada por una cuenta de titularidad externa, en otras palabras, una cuenta administrada por una persona, no un contrato. Por ejemplo, si Bob le envía 1 ETH a Alice, este debe adeudarse de la cuenta de Bob y acreditarse en la cuenta de Alice. Esta acción según la que se modifica el estado de la red tiene lugar en una transacción.

![Diagrama que muestra cómo una transacción provoca cambios de estado](./tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las transacciones, que modifican el estado de la EVM, se deben transmitir a toda la red. Cualquier nodo puede transmitir una solicitud para que se ejecute una transacción en la EVM; después de que esto suceda, un validador ejecutará la transacción y propagará el cambio de estado resultante al resto de la red.

Las transacciones requieren una tarifa y deben incluirse en un bloque validado. Para simplificar este resumen, abarcaremos las comisiones de gas y el minado por separado.

Una transacción enviada incluye la siguiente información:

- `desde`: la dirección del remitente, que firmará la transacción. Esta será una cuenta de titularidad externa, ya que las cuentas contractuales no pueden enviar transacciones.
- `a`: la dirección de recepción (si es una cuenta de propiedad externa, la transacción transferirá valor. Si se trata de un contrato, la transacción ejecutará el código del contrato).
- `Firma`: identificador del remitente. Se genera cuando la clave privada del remitente firma la transacción y confirma que el remitente ha autorizado esta transacción.
- `Nonce`: un contador que se incrementa secuencialmente y que indica el número de transacción de la cuenta.
- `Valor`: cantidad de ETH a transferir del remitente al destinatario (denominada en WEI, donde 1ETH equivale a 1e+18wei).
- `datos de entrada`: campo opcional para incluir datos arbitrarios
- `gasLimit`: cantidad máxima de unidades de gas que puede consumir la transacción. La[EVM](/developers/docs/evm/opcodes)especifica las unidades de gas necesarias para cada paso de cálculo.
- `maxPriorityFeePerGas`: cantidad máxima de gas consumido que se incluirá como propina al validador.
- `maxFeePerGas`: máxima comision por unidad de gas destinada al pago por la transacción (exclusiva de `baseFeePerGas` y `maxPriorityFeePerGas`)

El gas es una referencia al cálculo necesario para que el validador procese la transacción. Los usuarios tienen que pagar una tarifa por ese cálculo. Los valores `gasLimit` y `maxPriorityFeePerGas` determinan la tarifa por transacción máxima que se le paga al validador. [Mas información sobre el gas](/developers/docs/gas/).

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

Ejemplo de una llamada [JSON-RPC](/developers/docs/apis/json-rpc):

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

- `Transacción en bruto` es la transacción firmada en [Prefijo de longitud recursiva (RLP)](/developers/docs/data-structures-and-encoding/rlp) formulario codificado
- la propiedad `tx` es la transaccion firmada en formato JSON

Mediante el hash de la firma, se puede demostrar criptográficamente que la transacción proviene del emisor y que se envió a la red.

### El campo de datos {#the-data-field}

La gran mayoría de las transacciones acceden a un contrato desde una cuenta de titularidad externa. La mayoría de los contratos están escritos en Solidity e interpretan su campo de datos por [la interfaz binaria de la aplicación (ABI)](/glossary/#abi).

Los primeros cuatro bytes especifican qué función de llamar, usando el hash del nombre y los argumentos de la función. A veces se puede identificar la función desde el selector usando [esta base de datos](https://www.4byte.directory/signatures/).

El resto de los datos de llamada son los argumentos, [codificados como se indica en las especificaciones ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Por ejemplo, veamos [esta transacción](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Use **Clic para ver más** para ver los datos de llamada.

El selector de función es `0xa9059cbb`. Hay varias [funciones conocidas con esta firma](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). En este caso [el código fuente del contrato](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) se ha sido subido a Etherscan, así que sabemos que la función es `transferencia (dirección,uint256)`.

El resto de los datos es:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

De acuerdo con las especificaciones ABI, valores enteros (como direcciones, que son enteros de 20 bytes) aparecen en el ABI como palabras de 32 bytes, agregadas con ceros en el frente. Así que sabemos que la dirección `a` es [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). El `valor` es 0x3b0559f4 = 990206452.

## Tipos de transacciones {#types-of-transactions}

En Ethereum hay algunos tipos diferentes de transacciones:

- Transacciones regulares: una transacción desde una cartera a otra.
- Transacciones de despliegue de contratos: una transacción sin la dirección «a», donde el campo de datos se usa para el código de contrato.
- Ejecución de un contrato: una transacción que interactúa con un contrato inteligente desplegado. En este caso, la dirección «a» es la dirección de contrato inteligente.

### Sobre el gas {#on-gas}

Tal y como se ha mencionado, las transacciones necesitan [gas](/developers/docs/gas/) para ejecutarse. Las transacciones de transferencia simple requieren 21.000 unidades de gas.

De modo que, para que Bob pueda enviar a Alice 1 ETH con un coste de `baseFeePerGas` de 190 gwei y de `maxPriorityFeePerGas` de 10 gwei, Bob tendrá que pagar la siguiente tarifa:

```
(190 + 10) * 21000 = 4,200,000 gwei
--o--
0,0042 ETH
```

En la cuenta de Bobs se cargará**-1,0042 ETH** (1 ETH por Alice + 0,0042 ETH en tasas de gas)

A la cuenta de Alice se añadirán **+1,0 ETH**

La tarifa base que se consumirá será de **0,00399 ETH**

El validador se queda con una propina de **+0,000210 ETH**

También se necesita gas para cualquier interacción del contrato inteligente.

![Diagrama que muestra la devolución del gas no utilizado.](./gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Cualquier gas no utilizado en una transacción se reembolsa a la cuenta de usuario.

## Ciclo de vida de la transacción {#transaction-lifecycle}

Una vez enviada la transacción ocurre lo siguiente:

1. Se genera criptográficamente un hash de transacción: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Luego, la transacción se transmite a la red y se añade a un grupo de transacciones que consta de todas las demás transacciones que estan pendientes en la red.
3. Un validador debe elegir su transacción e incluirla en un bloque para verificarla antes de considerarla «satisfactoria».
4. A medida que pasa el tiempo, el bloque que contiene su transacción se actualizará a «justificado» y luego a «finalizado». Estas actualizaciones agudizan la certeza de que su transacción se complete satisfactoriamente y nunca se altere. Una vez que el bloque está «finalizado», este sólo podrá cambiarse mediante un ataque a escala de red que costaría miles de millones de dólares.

## Una demostración visual {#a-visual-demo}

Observe a Austin mientras le guía por las transacciones, el gas y la minería.

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope {#typed-transaction-envelope}

Inicialmente, Ethereum tenía un formato único para las transacciones. Cada transacción contenía un nonce, un precio de gas, un límite de gas, una dirección, un importe, datos, v, r y s. Estos campos se [codifican en RLP](/developers/docs/data-structures-and-encoding/rlp/), para tener un aspecto similar a este:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum ha mejorado y ahora es compatible con múltiples tipos de transacciones, lo que permite que se implementen nuevas características como listas de acceso y [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) sin afectar los formatos de transacción antiguos.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) es lo que permite este comportamiento. Las transacciones se interpretan como:

`Tipo de transacción || Cargaútiltransacción`

Donde los campos indican:

- `TransactionType` - un número entre 0 y 0x7f, para un total de 128 posibles tipos de transacción.
- `TransactionPayload`: una matriz de bytes arbitraria definida según el tipo de transacción.

## Más información {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Cuentas](/developers/docs/accounts/)
- [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
