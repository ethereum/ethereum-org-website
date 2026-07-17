---
title: Pruebas de Merkle para la integridad de datos fuera de la cadena
description: "Garantizar la integridad de los datos en cadena para los datos que se almacenan, en su mayoría, fuera de la cadena"
author: Ori Pomerantz
tags: ["almacenamiento"]
skill: advanced
breadcrumb: Pruebas de Merkle
lang: es
published: 2021-12-30
---

## Introducción {#introduction}

Idealmente, nos gustaría almacenar todo en el almacenamiento de Ethereum, que se guarda en miles de computadoras y tiene una disponibilidad extremadamente alta (los datos no pueden ser censurados) y una gran integridad (los datos no pueden ser modificados de manera no autorizada), pero almacenar una palabra de 32 bytes normalmente cuesta 20.000 gas. Mientras escribo esto, ese costo equivale a $6,60. A 21 centavos por byte, esto es demasiado caro para muchos usos.

Para resolver este problema, el ecosistema de Ethereum desarrolló [muchas formas alternativas de almacenar datos de manera descentralizada](/developers/docs/storage/). Por lo general, implican un compromiso entre disponibilidad y precio. Sin embargo, la integridad suele estar asegurada.

En este artículo aprenderá **cómo** garantizar la integridad de los datos sin almacenar los datos en la cadena de bloques, utilizando [pruebas de Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## ¿Cómo funciona? {#how-does-it-work}

En teoría, podríamos simplemente almacenar el hash de los datos en cadena y enviar todos los datos en las transacciones que lo requieran. Sin embargo, esto sigue siendo demasiado caro. Un byte de datos en una transacción cuesta alrededor de 16 gas, actualmente alrededor de medio centavo, o unos $5 por kilobyte. A $5000 por megabyte, esto sigue siendo demasiado caro para muchos usos, incluso sin el costo adicional de aplicar hashing a los datos.

La solución es aplicar hashing repetidamente a diferentes subconjuntos de los datos, de modo que para los datos que no necesita enviar, simplemente puede enviar un hash. Esto se hace utilizando un árbol de Merkle, una estructura de datos en forma de árbol donde cada nodo es un hash de los nodos debajo de él:

![Merkle Tree](tree.png)

La raíz de Merkle es la única parte que necesita almacenarse en cadena. Para probar un cierto valor, usted proporciona todos los hashes que necesitan combinarse con él para obtener la raíz. Por ejemplo, para probar `C` usted proporciona `D`, `H(A-B)` y `H(E-H)`.

![Proof of the value of C](proof-c.png)

## Implementación {#implementation}

[El código de muestra se proporciona aquí](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Código fuera de la cadena {#offchain-code}

En este artículo usamos JavaScript para los cálculos fuera de la cadena. La mayoría de las aplicaciones descentralizadas (dapps) tienen su componente fuera de la cadena en JavaScript.

#### Creación de la raíz de Merkle {#creating-the-merkle-root}

Primero necesitamos proporcionar la raíz de Merkle a la cadena.

```javascript
const ethers = require("ethers")
```

[Usamos la función hash del paquete ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Los datos sin procesar cuya integridad tenemos que verificar. Los primeros dos bytes s
// on un identificador de usuario, y los últimos dos bytes la cantidad de tokens que el
// usuario posee actualmente.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificar cada entrada en un solo número entero de 256 bits da como resultado un código menos legible que usar JSON, por ejemplo. Sin embargo, esto significa un procesamiento significativamente menor para recuperar los datos en el contrato, por lo que los costos de gas son mucho más bajos. [Puede leer JSON en cadena](https://github.com/chrisdotn/jsmnSol), simplemente es una mala idea si se puede evitar.

```javascript
// El arreglo de valores hash, como BigInts
const hashArray = dataArray
```

En este caso, nuestros datos son valores de 256 bits para empezar, por lo que no se necesita procesamiento. Si usamos una estructura de datos más complicada, como cadenas de texto, debemos asegurarnos de aplicar hashing a los datos primero para obtener una matriz de hashes. Tenga en cuenta que esto también se debe a que no nos importa si los usuarios conocen la información de otros usuarios. De lo contrario, habríamos tenido que aplicar hashing para que el usuario 1 no conociera el valor del usuario 0, el usuario 2 no conociera el valor del usuario 3, etc.

```javascript
// Convertir entre la cadena que espera la función hash y el
// BigInt que usamos en todas partes.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

La función hash de ethers espera recibir una cadena de JavaScript con un número hexadecimal, como `0x60A7`, y responde con otra cadena con la misma estructura. Sin embargo, para el resto del código es más fácil usar `BigInt`, por lo que convertimos a una cadena hexadecimal y viceversa.

```javascript
// Hash simétrico de un par para que no nos importe si el orden se invierte.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Esta función es simétrica (hash de a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Esto significa que cuando verificamos la prueba de Merkle no necesitamos preocuparnos por si poner el valor de la prueba antes o después del valor calculado. La verificación de la prueba de Merkle se realiza en cadena, por lo que cuanto menos necesitemos hacer allí, mejor.

Advertencia:
La criptografía es más difícil de lo que parece.
La versión inicial de este artículo tenía la función hash `hash(a^b)`.
Esa fue una **mala** idea porque significaba que si conocía los valores legítimos de `a` y `b` podía usar `b' = a^b^a'` para probar cualquier valor `a'` deseado.
Con esta función tendría que calcular `b'` de tal manera que `hash(a') ^ hash(b')` sea igual a un valor conocido (la siguiente rama en el camino hacia la raíz), lo cual es mucho más difícil.

```javascript
// El valor para denotar que una cierta rama está vacía, no
// tiene un valor
const empty = 0n
```

Cuando el número de valores no es una potencia entera de dos, necesitamos manejar ramas vacías. La forma en que este programa lo hace es poner cero como marcador de posición.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Calcular un nivel arriba en el árbol de un arreglo de hash tomando el hash de
// cada par en secuencia
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Para evitar sobrescribir la entrada // Agregar un valor vacío si es necesario (necesitamos que todas las hojas estén // emparejadas)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Esta función "escala" un nivel en el árbol de Merkle aplicando hashing a los pares de valores en la capa actual. Tenga en cuenta que esta no es la implementación más eficiente, podríamos haber evitado copiar la entrada y simplemente agregar `hashEmpty` cuando fuera apropiado en el bucle, pero este código está optimizado para la legibilidad.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Subir por el árbol hasta que solo haya un valor, que es la // raíz. // // Si una capa tiene un número impar de entradas, el // código en oneLevelUp agrega un valor vacío, por lo que si tenemos, por ejemplo, // 10 hojas, tendremos 5 ramas en la segunda capa, 3 // ramas en la tercera, 2 en la cuarta y la raíz es la quinta

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Para obtener la raíz, escale hasta que solo quede un valor.

#### Creación de una prueba de Merkle {#creating-a-merkle-proof}

Una prueba de Merkle son los valores a los que se les aplica hashing junto con el valor que se está probando para recuperar la raíz de Merkle. El valor a probar a menudo está disponible a partir de otros datos, por lo que prefiero proporcionarlo por separado en lugar de como parte del código.

```javascript
// Una prueba de Merkle consiste en el valor de la lista de entradas para
// hashear. Debido a que usamos una función hash simétrica, no
// necesitamos la ubicación del elemento para verificar la prueba, solo para crearla
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Hasta llegar a la cima
    while (currentLayer.length > 1) {
        // Sin capas de longitud impar
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Si currentN es impar, agregar con el valor anterior a la prueba
            ? currentLayer[currentN-1]
               // Si es par, agregar el valor posterior
            : currentLayer[currentN+1])

```

Aplicamos hashing a `(v[0],v[1])`, `(v[2],v[3])`, etc. Así que para los valores pares necesitamos el siguiente, para los valores impares el anterior.

```javascript
        // Pasar a la siguiente capa superior
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Código en cadena {#onchain-code}

Finalmente tenemos el código que verifica la prueba. El código en cadena está escrito en [Solidity](https://docs.soliditylang.org/en/v0.8.11/). La optimización es mucho más importante aquí porque el gas es relativamente caro.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Escribí esto usando el [entorno de desarrollo Hardhat](https://hardhat.org/), que nos permite tener [salida de consola desde Solidity](https://hardhat.org/docs/cookbook/debug-logs) durante el desarrollo.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremadamente inseguro, en código de producción el acceso a
    // esta función DEBE ESTAR estrictamente limitado, probablemente a un
    // propietario
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funciones set y get para la raíz de Merkle. Permitir que todos actualicen la raíz de Merkle es una _idea extremadamente mala_ en un sistema de producción. Lo hago aquí en aras de la simplicidad para el código de muestra. **No lo haga en un sistema donde la integridad de los datos realmente importe**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Esta función genera un hash de par. Es solo la traducción a Solidity del código JavaScript para `hash` y `pairHash`.

**Nota:** Este es otro caso de optimización para la legibilidad. Según [la definición de la función](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), podría ser posible almacenar los datos como un valor [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) y evitar las conversiones.

```solidity
    // Verificar una prueba de Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

En notación matemática, la verificación de la prueba de Merkle se ve así: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Este código la implementa.

## Las pruebas de Merkle y los rollups no se mezclan {#merkle-proofs-and-rollups}

Las pruebas de Merkle no funcionan bien con los [rollups](/developers/docs/scaling/#rollups). La razón es que los rollups escriben todos los datos de la transacción en la capa 1 (l1), pero los procesan en la capa 2 (l2). El costo de enviar una prueba de Merkle con una transacción promedia 638 gas por capa (actualmente un byte en los datos de llamada cuesta 16 gas si no es cero, y 4 si es cero). Si tenemos 1024 palabras de datos, una prueba de Merkle requiere diez capas, o un total de 6380 gas.

Mirando por ejemplo a [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), escribir gas en la l1 cuesta alrededor de 100 Gwei y el gas en la l2 cuesta 0,001 Gwei (ese es el precio normal, puede subir con la congestión). Así que por el costo de un gas de la l1 podemos gastar cien mil gas en el procesamiento de la l2. Suponiendo que no sobrescribimos el almacenamiento, esto significa que podemos escribir unas cinco palabras en el almacenamiento en la l2 por el precio de un gas de la l1. Para una sola prueba de Merkle podemos escribir las 1024 palabras completas en el almacenamiento (suponiendo que se puedan calcular en cadena para empezar, en lugar de proporcionarse en una transacción) y aún nos sobraría la mayor parte del gas.

## Conclusión {#conclusion}

En la vida real, es posible que nunca implemente árboles de Merkle por su cuenta. Hay bibliotecas bien conocidas y auditadas que puede usar y, en términos generales, es mejor no implementar primitivas criptográficas por su cuenta. Pero espero que ahora entienda mejor las pruebas de Merkle y pueda decidir cuándo vale la pena usarlas.

Tenga en cuenta que si bien las pruebas de Merkle preservan la _integridad_, no preservan la _disponibilidad_. Saber que nadie más puede tomar sus activos es un pequeño consuelo si el almacenamiento de datos decide denegar el acceso y usted tampoco puede construir un árbol de Merkle para acceder a ellos. Por lo tanto, los árboles de Merkle se usan mejor con algún tipo de almacenamiento descentralizado, como IPFS.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).