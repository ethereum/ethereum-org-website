---
title: "Aplicación de ingeniería inversa en un contrato"
description: Cómo entender un contrato cuando no tiene el código fuente
author: Ori Pomerantz
lang: es
tags:
  - "evm"
  - "códigos de operación"
skill: advanced
published: 2021-12-30
---

## Introducción {#introduction}

_No hay secretos en la cadena de bloques_, todo lo que sucede es consistente, verificable y se encuentra públicamente disponible. Idealmente, [los contratos debieran tener su codigo fuente publicado y verificado en Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Sin embargo, [este no siempre es el caso](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). En este articulo puede aprender cómo aplicar ingenieria inversa a los contratos revisando el contrato sin su código fuente, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Hay compiladores inversos, pero no siempre producen [resultados utilizables](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). En este artículo aprenderá a realizar ingeniería inversa manualmente y entender un contrato a partir de [los códigos de operación](https://github.com/wolflo/evm-opcodes), así como a interpretar los resultados de un decompilador.

Para poder entender este artículo, ya debería conocer los conceptos básicos de la EVM y estar al menos un poco familiarizado con el ensamblador de EVM. [Puede leer sobre estos temas aquí](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Preparar el código ejecutable {#prepare-the-executable-code}

Puede obtener los códigos de operación yendo a Etherscan para el contrato, haciendo clic en la pestaña **Contract** y luego en **Switch to Opcodes View**. Obtendrá una vista que mostrará un código de operación por línea.

![Vista de código de operación de Etherscan](opcode-view.png)

Sin embargo, para poder entender los saltos, necesita saber en qué parte del código se encuentra cada código de operación. Para ello, una forma es abrir una hoja de cálculo de Google y pegar los códigos de operación en la columna C. [Puede omitir los siguientes pasos haciendo una copia de esta hoja de cálculo ya preparada](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

El siguiente paso es obtener las ubicaciones correctas del código para entender los saltos. Pondremos el tamaño del código de operación en la columna B y la ubicación (en hexadecimal) en la columna A. Escriba esta función en la celda `B1` y luego cópiela y péguela para el resto de la columna B, hasta el final del código. Después de hacer esto, puede ocultar la columna B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Primero, esta función agrega un byte para el código de operación en sí y luego busca `PUSH`. Los códigos de operación push son especiales porque necesitan tener bytes adicionales para el valor que se está empujando. Si el código de operación es `PUSH`, extraemos el número de bytes y lo añadimos.

En `A1` ponga el primer desplazamiento, cero. Luego, en `A2`, ponga esta función y vuelva a copiarla y pegarla para el resto de la columna A:

```
=dec2hex(hex2dec(A1)+B1)
```

Necesitamos que esta función nos dé el valor hexadecimal porque los valores que se empujan antes de los saltos (`JUMP` y `JUMPI`) se nos dan en valor hexadecimal.

## El punto de entrada (0x00) {#the-entry-point-0x00}

Los contratos siempre se ejecutan desde el primer byte. Esta es la parte inicial del código:

| Offset | Código de operación | Pila (después del código de operación) |
| ------:| ------------------- | -------------------------------------- |
|      0 | PUSH1 0x80          | 0x80                                   |
|      2 | PUSH1 0x40          | 0x40, 0x80                             |
|      4 | MSTORE              | Vacío                                  |
|      5 | PUSH1 0x04          | 0x04                                   |
|      7 | CALLDATASIZE        | CALLDATASIZE 0x04                      |
|      8 | LT                  | CALLDATASIZE<4                         |
|      9 | PUSH2 0x005e        | 0x5E CALLDATASIZE<4                    |
|      C | JUMPI               | Vacío                                  |

Este código hace dos cosas:

1. Escribe 0x80 como valor de 32 bytes en las ubicaciones de memoria 0x40-0x5F (0x80 se almacena en 0x5F, y 0x40-0x5E son todos ceros).
2. Leer el tamaño de los datos de llamada. Normalmente, los datos de llamada de un contrato de Ethereum siguen [la ABI (interfaz binaria de la aplicación)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), que como mínimo requiere cuatro bytes para el selector de funciones. Si el tamaño de los datos de la llamada es inferior a cuatro, se salta a 0x5E.

![Diagrama de flujo de esta porción](flowchart-entry.png)

### El controlador en 0x5E (para datos de llamadas que no son ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Código de operación |
| ------:| ------------------- |
|     5E | JUMPDEST            |
|     5F | CALLDATASIZE        |
|     60 | PUSH2 0x007c        |
|     63 | JUMPI               |

Este fragmento comienza con un `JUMPDEST`. Los programas de EVM (máquina virtual de Ethereum) lanzan una excepción si salta a un código de operación que no sea `JUMPDEST`. Luego mira el CALLDATASIZE y si es "verdadero" (es decir, distinto de cero), salta a 0x7C. Veremos esto a continuación.

| Offset | Código de operación | Pila (después del código de operación)                                              |
| ------:| ------------------- | ----------------------------------------------------------------------------------- |
|     64 | CALLVALUE           | [Wei](/glossary/#wei) proporcionado por la llamada. Llamado `msg.value` en Solidity |
|     65 | PUSH1 0x06          | 6 CALLVALUE                                                                         |
|     67 | PUSH1 0x00          | 0 6 CALLVALUE                                                                       |
|     69 | DUP3                | CALLVALUE 0 6 CALLVALUE                                                             |
|     6A | DUP3                | 6 CALLVALUE 0 6 CALLVALUE                                                           |
|     6B | SLOAD               | Storage[6] CALLVALUE 0 6 CALLVALUE                                                  |

Así que cuando no hay datos de llamada, leemos el valor de Storage[6]. Todavía no sabemos cuál es este valor, pero podemos buscar transacciones que el contrato haya recibido sin datos de llamada. Las transacciones que solo transfieren ETH sin ningún dato de llamada (y, por lo tanto, ningún método) tienen en Etherscan el método `Transfer`. De hecho, [la primera transacción que recibió el contrato](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) es una transferencia.

Si miramos en esa transacción y hacemos clic en **Click to see More**, vemos que los datos de llamada, llamados datos de entrada, están de hecho vacíos (`0x`). Tenga en cuenta también que el valor es de 1,559 ETH, lo que será relevante más adelante.

![Los datos de la llamada están vacíos](calldata-empty.png)

A continuación, haga clic en la pestaña **State** y expanda el contrato en el que estamos haciendo ingeniería inversa (0x2510...). Puede ver que `Storage[6]` cambió durante la transacción, y si cambia Hex a **Number**, verá que se convirtió en 1.559.000.000.000.000.000, el valor transferido en wei (añadí los puntos para mayor claridad), correspondiente al valor del contrato siguiente.

![El cambio en Storage[6]](storage6.png)

Si miramos los cambios de estado causados por [otras transacciones `Transfer` del mismo período](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), vemos que `Storage[6]` realizó un seguimiento del valor del contrato durante un tiempo. Por ahora lo llamaremos `Value*`. El asterisco (`*`) nos recuerda que aún no _sabemos_ lo que hace esta variable, pero no puede ser solo para rastrear el valor del contrato porque no hay necesidad de usar el almacenamiento, que es muy caro, cuando puede obtener el saldo de sus cuentas usando `ADDRESS BALANCE`. El primer código de operación empuja la dirección del contrato. El segundo lee la dirección en la parte superior de la pila y la reemplaza con el saldo de esa dirección.

| Offset | Código de operación | Pila                                          |
| ------:| ------------------- | --------------------------------------------- |
|     6C | PUSH2 0x0075        | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2               | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1               | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7        | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP                |                                               |

Seguiremos rastreando este código en el destino de salto.

| Offset | Código de operación | Pila                                                          |
| ------:| ------------------- | ------------------------------------------------------------- |
|    1A7 | JUMPDEST            | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00          | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3                | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT                 | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

El `NOT` es bitwise, por lo que invierte el valor de cada bit en el valor de llamada.

| Offset | Código de operación | Pila                                                                            |
| ------:| ------------------- | ------------------------------------------------------------------------------- |
|    1AC | DUP3                | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT                  | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO              | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df        | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI               |                                                                                 |

Saltamos si `Value*` es menor que 2^256-CALLVALUE-1 o igual. Esto parece lógica para evitar el desbordamiento. Y, de hecho, vemos que después de algunas operaciones sin sentido (escribir en la memoria está a punto de eliminarse, por ejemplo) en el desplazamiento 0x01DE, el contrato se revierte si se detecta el desbordamiento, que es un comportamiento normal.

Tenga en cuenta que tal desbordamiento es extremadamente improbable, porque requeriría que el valor de llamada más `Value*` sea comparable a 2^256 wei, alrededor de 10^59 ETH. [El suministro total de ETH, al momento de escribir esto, es inferior a doscientos millones](https://etherscan.io/stat/supply).

| Offset | Código de operación | Pila                                        |
| ------:| ------------------- | ------------------------------------------- |
|    1DF | JUMPDEST            | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP                 | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD                 | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1               | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP                |                                             |

Si llegamos aquí, obtenga `Value* + CALLVALUE` y salte al desplazamiento 0x75.

| Offset | Código de operación | Pila                              |
| ------:| ------------------- | --------------------------------- |
|     75 | JUMPDEST            | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1               | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2               | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE              | 0 CALLVALUE                       |

Si llegamos aquí (lo que requiere que los datos de la llamada estén vacíos), añadimos a `Value*` el valor de la llamada. Esto es consistente con lo que decimos que hacen las transferencias `Transfer`.

| Offset | Código de operación |
| ------:| ------------------- |
|     79 | POP                 |
|     7A | POP                 |
|     7B | DETENER             |

Finalmente, borre la pila (no es necesario) e indique el final exitoso de la transacción.

En resumen, aquí hay un diagrama de flujo del código inicial.

![Diagrama de flujo del punto de entrada](flowchart-entry.png)

## El controlador en 0x7C {#the-handler-at-0x7c}

No puse a propósito en el encabezado lo que hace este controlador. El punto no es enseñarle cómo funciona este contrato específico, sino cómo aplicar ingeniería inversa a los contratos. Aprenderá lo que hace de la misma manera que yo, siguiendo el código.

Llegamos aquí desde varios lugares:

- Si hay datos de llamada de 1, 2 o 3 bytes (desde el desplazamiento 0x63)
- Si se desconoce la firma del método (de los desplazamientos 0x42 y 0x5D)

| Offset | Código de operación | Pila                 |
| ------:| ------------------- | -------------------- |
|     7C | JUMPDEST            |                      |
|     7D | PUSH1 0x00          | 0x00                 |
|     7F | PUSH2 0x009d        | 0x9D 0x00            |
|     82 | PUSH1 0x03          | 0x03 0x9D 0x00       |
|     84 | SLOAD               | Storage[3] 0x9D 0x00 |

Esta es otra celda de almacenamiento, una que no pude encontrar en ninguna transacción, por lo que es más difícil saber lo que significa. El siguiente código lo hará más claro.

| Offset | Código de operación                               | Pila                            |
| ------:| ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Estos códigos de operación truncan el valor que leemos de Storage[3] a 160 bits, la longitud de una dirección de Ethereum.

| Offset | Código de operación | Pila                            |
| ------:| ------------------- | ------------------------------- |
|     9B | SWAP1               | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP                | Storage[3]-as-address 0x00      |

Este salto es superfluo, ya que vamos al siguiente código de operación. Este código no es tan eficiente en materia de gas como podría ser.

| Offset | Código de operación | Pila                            |
| ------:| ------------------- | ------------------------------- |
|     9D | JUMPDEST            | Storage[3]-as-address 0x00      |
|     9E | SWAP1               | 0x00 Storage[3]-as-address      |
|     9F | POP                 | Storage[3]-as-address           |
|     A0 | PUSH1 0x40          | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD               | Mem[0x40] Storage[3]-as-address |

Al principio del código establecimos Mem[0x40] en 0x80. Si miramos 0x40 más adelante, vemos que no lo cambiamos, por lo que podemos asumir que es 0x80.

| Offset | Código de operación | Pila                                              |
| ------:| ------------------- | ------------------------------------------------- |
|     A3 | CALLDATASIZE        | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00          | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3                | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY        | 0x80 Storage[3]-as-address                        |

Copie todos los datos de la llamada a la memoria, comenzando en 0x80.

| Offset | Código de operación | Pila                                                                             |
| ------:| ------------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00          | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1                | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE        | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4                | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6                | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS                 | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL       |                                                                                  |

Ahora las cosas están mucho más claras. Este contrato puede actuar como [proxy](https://blog.openzeppelin.com/proxy-patterns/), llamando a la dirección en Storage[3] para que haga el trabajo real. `DELEGATE_CALL` llama a un contrato separado, pero permanece en el mismo almacenamiento. Esto significa que el contrato delegado, para el que somos un proxy, accede al mismo espacio de almacenamiento. Los parámetros de la llamada son:

- _Gas_: Todo el gas restante
- _Called address_: Storage[3]-as-address
- _Call data_: Los bytes CALLDATASIZE a partir de 0x80, que es donde ponemos los datos de llamada originales
- _Return data_: Ninguno (0x00 - 0x00); obtendremos los datos de devolución por otros medios (ver más abajo)

| Offset | Código de operación | Pila                                                                                          |
| ------:| ------------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE      | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1                | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00          | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5                | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY      | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Aquí copiamos todos los datos de retorno al búfer de memoria a partir de 0x80.

| Offset | Código de operación | Pila                                                                                                                         |
| ------:| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2                | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1                | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO              | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0        | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI               | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2                | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5                | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | REGRESAR            |                                                                                                                              |

Así que después de la llamada copiamos los datos de retorno en el búfer 0x80 - 0x80+RETURNDATASIZE, y si la llamada tiene éxito, entonces devolvemos (`RETURN`) con exactamente ese búfer.

### DELEGATECALL fallido {#delegatecall-failed}

Si llegamos aquí, a 0xC0, significa que el contrato al que llamamos se revirtió. Como solo somos un proxy de ese contrato, queremos devolver los mismos datos y también revertirlos.

| Offset | Código de operación | Pila                                                                                                                |
| ------:| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST            | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2                | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5                | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERTIR            |                                                                                                                     |

Así que hacemos `REVERT` con el mismo búfer que usamos para `RETURN` antes: 0x80 - 0x80+RETURNDATASIZE

![Diagrama de flujo de llamada a proxy](flowchart-proxy.png)

## Llamadas a ABI {#abi-calls}

Si el tamaño de los datos de la llamada es de cuatro bytes o más, esta podría ser una llamada ABI válida.

| Offset | Código de operación | Pila                                              |
| ------:| ------------------- | ------------------------------------------------- |
|      D | PUSH1 0x00          | 0x00                                              |
|      F | CALLDATALOAD        | (((First word (256 bits) of the call data)))      |
|     10 | PUSH1 0xe0          | 0xE0 (((First word (256 bits) of the call data))) |
|     12 | SHR                 | (((first 32 bits (4 bytes) of the call data)))    |

Etherscan nos dice que `1C` es un código de operación desconocido, porque [se añadió después de que Etherscan escribiera esta función](https://eips.ethereum.org/EIPS/eip-145) y no la han actualizado. Una [tabla actualizada de códigos de operación](https://github.com/wolflo/evm-opcodes) nos muestra que esto es un cambio a la derecha (shift right).

| Offset | Código de operación | Pila                                                                                                     |
| ------:| ------------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1                | (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data)))            |
|     14 | PUSH4 0x3cd8045e    | 0x3CD8045E (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data))) |
|     19 | GT                  | 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))                 |
|     1A | PUSH2 0x0043        | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))            |
|     1D | JUMPI               | (((first 32 bits (4 bytes) of the call data)))                                                           |

Al dividir las pruebas de coincidencia de firma del método en dos de esta forma, esto ahorra la mitad de las pruebas en promedio. El código que inmediatamente sigue esto y el código en 0x43 siguen el mismo patrón: `DUP1` los primeros 32 bits de los datos de llamada, `PUSH4 (((method signature>`, ejecutar `EQ` para revisar la equidad y luego `JUMPI` si la firma del método coincide. Aquí están las firmas del método, sus direcciones y, si se conoce, la [definición de método correspondiente](https://www.4byte.directory/):

| Método                                                                                 | Firma del método | Offset para saltar |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------ |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103             |
| ???                                                                                    | 0x81e580d3       | 0x0138             |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158             |
| ???                                                                                    | 0x1f135823       | 0x00C4             |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED             |

Si no se encuentra ninguna coincidencia, el código salta al [controlador de proxy en 0x7C](#the-handler-at-0x7c), con la esperanza de que el contrato en el que somos proxy tenga una coincidencia.

![Diagrama de flujo de llamadas ABI](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Código de operación | Pila                          |
| ------:| ------------------- | ----------------------------- |
|    103 | JUMPDEST            |                               |
|    104 | CALLVALUE           | CALLVALUE                     |
|    105 | DUP1                | CALLVALUE CALLVALUE           |
|    106 | ISZERO              | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f        | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI               | CALLVALUE                     |
|    10B | PUSH1 0x00          | 0x00 CALLVALUE                |
|    10D | DUP1                | 0x00 0x00 CALLVALUE           |
|    10E | REVERTIR            |                               |

Lo primero que hace esta función es comprobar que la llamada no haya enviado ETH. Esta función no es [`pagable`](https://solidity-by-example.org/payable/). Si alguien nos envió ETH, debe ser un error, y queremos revertir (`REVERT`) para evitar tener ETH que no puedan recuperar.

| Offset | Código de operación                               | Pila                                                                        |
| ------:| ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                             |
|    110 | POP                                               |                                                                             |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] a.k.a the contract for which we are a proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a the contract for which we are a proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a the contract for which we are a proxy))) |
|    12D | SWAP2                                             | (((Storage[3] a.k.a the contract for which we are a proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Y 0x80 ahora contiene la dirección del proxy

| Offset | Código de operación | Pila      |
| ------:| ------------------- | --------- |
|    131 | PUSH1 0x20          | 0x20 0x80 |
|    133 | ADD                 | 0xA0      |
|    134 | PUSH2 0x00e4        | 0xE4 0xA0 |
|    137 | JUMP                | 0xA0      |

### El código E4 {#the-e4-code}

Esta es la primera vez que vemos estas líneas, pero se comparten con otros métodos (ver más abajo). Así que llamaremos al valor de la pila X y simplemente recordaremos que en `splitter()` el valor de esta X es 0xA0.

| Offset | Código de operación | Pila        |
| ------:| ------------------- | ----------- |
|     E4 | JUMPDEST            | X           |
|     E5 | PUSH1 0x40          | 0x40 X      |
|     E7 | MLOAD               | 0x80 X      |
|     E8 | DUP1                | 0x80 0x80 X |
|     E9 | SWAP2               | X 0x80 0x80 |
|     EA | SUB                 | X-0x80 0x80 |
|     EB | SWAP1               | 0x80 X-0x80 |
|     EC | REGRESAR            |             |

Por lo tanto, este código recibe un puntero de memoria en la pila (X) y hace que el contrato haga `RETURN` con un búfer que es 0x80 - X.

En el caso de `splitter()`, esto devuelve la dirección para la que somos un proxy. `RETURN` devuelve el búfer en 0x80-0x9F, que es donde escribimos estos datos (desplazamiento 0x130 arriba).

## currentWindow() {#currentwindow}

El código en los desplazamientos 0x158-0x163 es idéntico al que vimos en 0x103-0x10E en `splitter()` (aparte del destino `JUMPI`), por lo que sabemos que `currentWindow()` tampoco es `payable`.

| Offset | Código de operación | Pila                 |
| ------:| ------------------- | -------------------- |
|    164 | JUMPDEST            |                      |
|    165 | POP                 |                      |
|    166 | PUSH2 0x00da        | 0xDA                 |
|    169 | PUSH1 0x01          | 0x01 0xDA            |
|    16B | SLOAD               | Storage[1] 0xDA      |
|    16C | DUP2                | 0xDA Storage[1] 0xDA |
|    16D | JUMP                | Storage[1] 0xDA      |

### El código DA {#the-da-code}

Este código también se comparte con otros métodos. Así que llamaremos al valor de la pila Y y simplemente recordaremos que en `currentWindow()` el valor de esta Y es Storage[1].

| Offset | Código de operación | Pila             |
| ------:| ------------------- | ---------------- |
|     DA | JUMPDEST            | Y 0xDA           |
|     DB | PUSH1 0x40          | 0x40 Y 0xDA      |
|     DD | MLOAD               | 0x80 Y 0xDA      |
|     DE | SWAP1               | Y 0x80 0xDA      |
|     DF | DUP2                | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE              | 0x80 0xDA        |

Escriba Y en 0x80-0x9F.

| Offset | Código de operación | Pila           |
| ------:| ------------------- | -------------- |
|     E1 | PUSH1 0x20          | 0x20 0x80 0xDA |
|     E3 | ADD                 | 0xA0 0xDA      |

Y el resto ya está explicado [arriba](#the-e4-code). Así que salta a 0xDA, escribe la parte superior de la pila (Y) en 0x80-0x9F y devuelve ese valor. En el caso de `currentWindow()`, devuelve Storage[1].

## merkleRoot() {#merkleroot}

El código en los desplazamientos 0xED-0xF8 es idéntico al que vimos en 0x103-0x10E en `splitter()` (aparte del destino `JUMPI`), por lo que sabemos que `merkleRoot()` tampoco es `payable`.

| Offset | Código de operación | Pila                 |
| ------:| ------------------- | -------------------- |
|     F9 | JUMPDEST            |                      |
|     FA | POP                 |                      |
|     FB | PUSH2 0x00da        | 0xDA                 |
|     FE | PUSH1 0x00          | 0x00 0xDA            |
|    100 | SLOAD               | Storage[0] 0xDA      |
|    101 | DUP2                | 0xDA Storage[0] 0xDA |
|    102 | JUMP                | Storage[0] 0xDA      |

Lo que sucede después del salto [ya lo descubrimos](#the-da-code). Así que `merkleRoot()` devuelve Storage[0].

## 0x81e580d3 {#0x81e580d3}

El código en los desplazamientos 0x138-0x143 es idéntico al que vimos en 0x103-0x10E en `splitter()` (aparte del destino `JUMPI`), por lo que sabemos que esta función tampoco es `payable`.

| Offset | Código de operación | Pila                                                         |
| ------:| ------------------- | ------------------------------------------------------------ |
|    144 | JUMPDEST            |                                                              |
|    145 | POP                 |                                                              |
|    146 | PUSH2 0x00da        | 0xDA                                                         |
|    149 | PUSH2 0x0153        | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE        | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04          | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f        | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP                | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST            | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00          | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20          | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3                | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5                | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB                 | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT                 | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO              | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0        | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI               | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Parece que esta función toma al menos 32 bytes (una palabra) de datos de llamada.

| Offset | Código de operación | Pila                                         |
| ------:| ------------------- | -------------------------------------------- |
|    19D | DUP1                | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2                | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERTIR            |                                              |

Si no recibe los datos de la llamada, la transacción se revierte sin ningún dato de devolución.

Veamos qué sucede si la función _sí_ obtiene los datos de llamada que necesita.

| Offset | Código de operación | Pila                                     |
| ------:| ------------------- | ---------------------------------------- |
|    1A0 | JUMPDEST            | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP                 | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD        | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` es la primera palabra de los datos de llamada _después_ de la firma del método

| Offset | Código de operación | Pila                                                                         |
| ------:| ------------------- | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2               | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1               | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP                 | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP                | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST            | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e        | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP                | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST            | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04          | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2                | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2                | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD               | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2                | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT                  | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e        | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI               | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Si la primera palabra no es inferior a Storage[4], la función falla. Se revierte sin ningún valor devuelto:

| Offset | Código de operación | Pila          |
| ------:| ------------------- | ------------- |
|    17A | PUSH1 0x00          | 0x00 ...      |
|    17C | DUP1                | 0x00 0x00 ... |
|    17D | REVERTIR            |               |

Si calldataload(4) es menor que Storage[4], obtenemos este código:

| Offset | Código de operación | Pila                                                |
| ------:| ------------------- | --------------------------------------------------- |
|    17E | JUMPDEST            | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00          | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2               | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3                | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE              | calldataload(4) 0x00 calldataload(4) 0xDA           |

Y las ubicaciones de memoria 0x00-0x1F ahora contienen los datos 0x04 (0x00-0x1E son todos ceros, 0x1F es cuatro)

| Offset | Código de operación | Pila                                                                    |
| ------:| ------------------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20          | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1               | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2               | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3                | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD                 | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD               | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Así que hay una tabla de búsqueda en el almacenamiento que comienza en el SHA3 de 0x000...0004 y tiene una entrada para cada valor de datos de llamada legítimo (valor por debajo de Storage[4]).

| Offset | Código de operación | Pila                                                                    |
| ------:| ------------------- | ----------------------------------------------------------------------- |
|    18B | SWAP1               | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP                 | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2                | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP                | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Ya sabemos lo que hace el [código en offset 0xDA](#the-da-code): devuelve el valor superior de la pila al invocante o el que llama. Así que esta función devuelve el valor de la tabla de búsqueda al que llama.

## 0x1f135823 {#0x1f135823}

El código en los desplazamientos 0xC4-0xCF es idéntico a lo que vimos en 0x103-0x10E en `splitter()` (aparte del destino `JUMPI`), por lo que sabemos que esta función tampoco es de pago (`payable`).

| Offset | Código de operación | Pila                |
| ------:| ------------------- | ------------------- |
|     D0 | JUMPDEST            |                     |
|     D1 | POP                 |                     |
|     D2 | PUSH2 0x00da        | 0xDA                |
|     D5 | PUSH1 0x06          | 0x06 0xDA           |
|     D7 | SLOAD               | Value\* 0xDA      |
|     D8 | DUP2                | 0xDA Value\* 0xDA |
|     D9 | JUMP                | Value\* 0xDA      |

Ya sabemos lo que hace el [código en offset 0xDA](#the-da-code): devuelve el valor superior de la pila al invocante o el que llama. Así que esta función devuelve `Value*`.

### Resumen de métodos {#method-summary}

¿Siente que entiende el contrato en este momento? No. Hasta ahora tenemos estos métodos:

| Método                            | Significado                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Transferir                        | Aceptar el valor proporcionado por la llamada y aumentar `Value*` en esa cantidad            |
| [splitter()](#splitter)           | Return Storage[3], the proxy address                                                         |
| [currentWindow()](#currentwindow) | Return Storage[1]                                                                            |
| [merkleRoot()](#merkeroot)        | Return Storage[0]                                                                            |
| [0x81e580d3](#0x81e580d3)         | Mostrar el valor de una tabla de búsqueda, siempre que el parámetro sea menor que Storage[4] |
| [0x1f135823](#0x1f135823)         | Return Storage[6], a.k.a. Value\*                                                          |

Pero sabemos que cualquier otra funcionalidad es proporcionada por el contrato en Storage[3]. Tal vez si supiéramos cuál es ese contrato, nos daría una pista. Afortunadamente, esta es la cadena de bloques y todo se sabe, al menos en teoría. No vimos ningún método que estableciera Storage[3], por lo que debe haber sido establecido por el constructor.

## El Constructor {#the-constructor}

Cuando [analizamos un contrato](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), también podemos ver la transacción que lo creó.

![Haga clic en crear transacción](create-tx.png)

Si hacemos clic en esa transacción y luego en la pestaña **State**, podemos ver los valores iniciales de los parámetros. Específicamente, podemos ver que Storage[3] contiene [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Ese contrato debe contener la funcionalidad que falta. Podemos entenderla usando las mismas herramientas que usamos para el contrato que estamos investigando.

## El contrato de proxy {#the-proxy-contract}

Utilizando las mismas técnicas que utilizamos para el contrato original anterior, podemos ver que el contrato se revierte si:

- Hay algún ETH adjunto a la llamada (0x05-0x0F).
- El tamaño de los datos de la llamada es inferior a cuatro (0x10-0x19 y 0xBE-0xC2).

Y que los métodos que admite son:

| Método                                                                                                          | Firma del método             | Offset para saltar |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135             |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151             |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4             |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110             |
| ???                                                                                                             | 0x3f26479e                   | 0x0118             |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3             |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148             |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107             |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122             |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8             |

Podemos ignorar los cuatro últimos métodos porque nunca llegaremos a ellos. Sus firmas son tales que nuestro contrato original se encarga de ellos por sí mismo (puede hacer clic en las firmas para ver los detalles arriba), por lo que deben ser [métodos anulados](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Uno de los métodos restantes es `claim(<params>)`, y otro es `isClaimed(<params>)`, así que parece un contrato de airdrop. En lugar de ver el resto opcode por opcode, podemos [probar el decompilador](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), que produce resultados utilizables para tres funciones de este contrato. La ingeniería inversa de los otros se deja como ejercicio para el lector.

### scaleAmountByPercentage {#scaleamountbypercentage}

Esto es lo que el decompilador nos da para esta función:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Las primeras pruebas `require` que tienen los datos de la llamada, además de los cuatro bytes de la firma de la función, al menos 64 bytes, suficientes para los dos parámetros. Si no, obviamente hay algo mal.

La declaración `if` parece comprobar que `_param1` no es cero y que `_param1 * _param2` no es negativo. Probablemente sea para evitar casos de wrap around.

Por último, la función devuelve un valor escalado.

### claim {#claim}

El código que crea el decompilador es complejo, y no todo es relevante para nosotros. Voy a omitir algo de eso para centrarme en las líneas que creo que proporcionan información útil.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Aquí vemos dos cosas importantes:

- `_param2`, aunque se declara como `uint256`, es en realidad una dirección
- `_param1` es la ventana reclamada, que tiene que ser `currentWindow` o anterior.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Así que ahora sabemos que Storage[5] es una serie de ventanas y direcciones, y si la dirección reclamó la recompensa por esa ventana.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Sabemos que `unknown2eb4a7ab` es en realidad la función `merkleRoot()`, por lo que este código parece que está verificando una [prueba de merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Esto significa que `_param4` es una prueba de merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Así es como un contrato transfiere su propio ETH a otra dirección (contrato o de propiedad externa). Lo llama con un valor que es la cantidad a transferir. Así que parece que se trata de un airdrop de ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Las dos últimas líneas nos dicen que Storage[2] también es un contrato al que llamamos. Si [miramos la transacción del constructor](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), vemos que este contrato es [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), un contrato de Ether envuelto (Wrapped Ether) [cuyo código fuente se subió a Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Así que parece que el contrato intenta enviar ETH a `_param2`. Si puede hacerlo, genial. Si no, intenta enviar [WETH](https://weth.tkn.eth.limo/). Si `_param2` es una cuenta de propiedad externa (EOA), siempre puede recibir ETH, pero los contratos pueden negarse a recibir ETH. Sin embargo, WETH es ERC-20 y los contratos no pueden negarse a aceptarlo.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Al final de la función vemos que se genera una entrada de registro. [Mire las entradas de registro generadas](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) y filtre el tema que comienza con `0xdbd5...`. Si [hacemos clic en una de las transacciones que generaron dicha entrada](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), vemos que, de hecho, parece una reclamación: la cuenta envió un mensaje al contrato en el que estamos haciendo ingeniería inversa y como retribución obtuvo ETH.

![Transacción de reclamación (claim)](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Esta función es muy similar a [`claim`](#claim) arriba. También comprueba una prueba de merkle, intenta transferir ETH a la primera y produce el mismo tipo de entrada de registro.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

La principal diferencia es que el primer parámetro, la ventana para hacer el retiro, no está ahí. En su lugar, hay un bucle sobre todas las ventanas que se podrían reclamar.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Así que parece una variante de `claim` que reclama todas las ventanas.

## Conclusión {#conclusion}

A estas alturas debería saber cómo entender los contratos cuyo código fuente no esté disponible, utilizando los códigos de operación (u opcodes) o, cuando funcione, el decompilador. Como es evidente en la longitud de este artículo, la ingeniería inversa de un contrato no es trivial, pero, en un sistema donde la seguridad es esencial, es una habilidad importante poder verificar que los contratos funcionen según lo previsto.
