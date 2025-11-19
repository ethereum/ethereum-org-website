---
title: Pruebas de Merkle para la integridad de datos fuera de línea.
description: Garantizando la integridad de los datos on-chain para información que se almacena, principalmente, off-chain.
author: Ori Pomerantz
tags: [ "almacenamiento" ]
skill: avanzado
lang: es
published: 2021-12-30
---

## Introducción {#introduction}

Idealmente, nos gustaría almacenar todo en el almacenamiento de Ethereum, el cual se mantiene en miles de computadoras y tiene una disponibilidad extremadamente alta (los datos no pueden ser censurados) e integridad (los datos no pueden ser modificados de manera no autorizada), pero almacenar una palabra de 32 bytes típicamente cuesta 20,000 gas. Mientras escribo esto, ese costo equivale a $6.60 USD. A 21 centavos por byte, esto es demasiado costoso para muchos fines.

Para resolver este problema, el ecosistema de Ethereum desarrolló [muchas maneras alternativas de almacenar datos de forma descentralizada](/developers/docs/storage/). Usualmente implican un compromiso entre disponibilidad y precio. Sin embargo, la integridad generalmente está asegurada.

En este artículo aprenderá **cómo** garantizar la integridad de los datos sin almacenarlos en la blockchain, utilizando [pruebas de Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## ¿Cómo funciona? {#how-does-it-work}

En teoría, podríamos almacenar simplemente el hash de los datos on-chain y enviar todos los datos en las transacciones que lo requieran. Sin embargo, esto sigue siendo demasiado costoso. Un byte de datos en una transacción cuesta alrededor de 16 gas, actualmente medio centavo aproximadamente, o unos $5 por kilobyte. A $5000 por megabyte, esto sigue siendo demasiado costoso para muchos usos, incluso sin considerar el costo adicional de hash por los datos.

La solución es hacer repetidos hashes de diferentes subconjuntos de los datos, de modo que para los datos que no sea necesario enviar, pueda enviarse solo un hash. Esto se hace utilizando un árbol de Merkle, una estructura de datos en forma de árbol donde cada nodo es el hash de los nodos debajo de él:

![Árbol de Merkle](tree.png)

El hash raíz es la única parte que necesita almacenarse en la cadena. Para probar un cierto valor, proporcione todos los hashes que deben ser combinados con él para obtener la raíz. Por ejemplo, para probar `C` proporcione `D`, `H(A-B)` y `H(E-H)`.

![Prueba del valor de C](proof-c.png)

## Implementación {#implementation}

[El código de ejemplo se proporciona aquí](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Código off-chain {#offchain-code}

En este artículo usamos JavaScript para los cálculos fuera de la cadena. La mayoría de las aplicaciones descentralizadas tienen su componente off-chain en JavaScript.

#### Creando la raíz de Merkle {#creating-the-merkle-root}

Primero necesitamos proporcionar la raíz de Merkle a la cadena.

```javascript
const ethers = require("ethers")
```

[Usamos la función hash del paquete ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificar cada entrada en un solo entero de 256 bits da como resultado un código menos legible que, por ejemplo, usar JSON. Sin embargo, esto implica mucho menos procesamiento para recuperar los datos en el contrato, por lo que el costo de gas es mucho menor. [Se puede leer JSON on-chain](https://github.com/chrisdotn/jsmnSol), pero es una mala idea si se puede evitar.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

En este caso, nuestros datos ya son valores de 256 bits, por lo que no se necesita procesamiento adicional. Si usamos una estructura de datos más compleja, como cadenas, debemos asegurarnos de hashear primero los datos para obtener un arreglo de hashes. Tenga en cuenta que esto también se debe a que no nos importa si los usuarios conocen la información de otros usuarios. De lo contrario, deberíamos hashear de modo que el usuario 1 no sepa el valor del usuario 0, el usuario 2 no sepa el del usuario 3, etc.

```javascript
// Convert between the string the hash function expects and the
// BigInt we use everywhere else.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

La función hash de ethers espera recibir una cadena en formato hexadecimal, por ejemplo `0x60A7`, y responde con otra cadena con la misma estructura. Sin embargo, para el resto del código es más fácil usar `BigInt`, por lo que convertimos entre una cadena hexadecimal y viceversa.

```javascript
// Symmetrical hash of a pair so we won't care if the order is reversed.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Esta función es simétrica (hash de un [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Esto significa que cuando verifiquemos la prueba de Merkle no necesitaremos preocuparnos por si el valor del proof va antes o después del valor calculado. La verificación de pruebas de Merkle se realiza on-chain, así que mientras menos operaciones sean necesarias allí, mejor.

Advertencia:
La criptografía es más compleja de lo que parece.
La versión inicial de este artículo tenía la función hash `hash(a^b)`.
Eso era una **mala** idea porque significaba que, si conocías los valores legítimos de `a` y `b`, podrías usar `b' = a^b^a'` para probar cualquier valor `a'` que quisieras.
Con esta función, tendría que calcular `b'` de modo que `hash(a') ^ hash(b')` sea igual a un valor conocido (la siguiente rama hacia la raíz), lo cual es mucho más difícil.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Cuando el número de valores no es una potencia de dos entera, necesitamos gestionar ramas vacías. La manera en que este programa lo hace es colocando cero como marcador de posición.

![Árbol de Merkle con ramas faltantes](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input // Add an empty value if necessary (we need all the leaves to be // paired)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Esta función "sube" un nivel en el árbol de Merkle haciendo hash de los pares de valores del nivel actual. Tenga en cuenta que esta no es la implementación más eficiente; pudimos haber evitado copiar el input y solo añadir `hashEmpty` cuando corresponda en el ciclo, pero este código está optimizado para la legibilidad.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Para obtener la raíz, suba niveles hasta que quede solo un valor.

#### Creando una prueba de Merkle {#creating-a-merkle-proof}

Una prueba de Merkle consiste en los valores a hashear junto con el valor que se quiere probar para obtener la raíz de Merkle. El valor a probar suele estar disponible en otros datos, por lo cual prefiero proporcionarlo por separado y no como parte del código.

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

Hasheamos `(v[0],v[1])`, `(v[2],v[3])`, etc. Entonces, para los valores pares necesitamos el siguiente, y para los impares el anterior.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Código on-chain {#onchain-code}

Finalmente, tenemos el código que verifica la prueba. El código on-chain está escrito en [Solidity](https://docs.soliditylang.org/en/v0.8.11/). La optimización es mucho más importante aquí porque el gas es relativamente caro.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Escribí esto usando el [entorno de desarrollo Hardhat](https://hardhat.org/), que nos permite tener [salidas en consola desde Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) durante el desarrollo.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funciones set y get para la raíz de Merkle. Permitir que cualquier persona actualice la raíz de Merkle es una _muy mala idea_ en un sistema en producción. Aquí lo hago por simplicidad en el código de ejemplo. **No lo haga en un sistema donde la integridad de los datos realmente importe**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Esta función genera el hash de un par. Es simplemente la traducción a Solidity del código JavaScript para `hash` y `pairHash`.

**Nota:** Este es otro caso donde se priorizó la legibilidad sobre la eficiencia. Según [la definición de la función](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), podría ser posible almacenar los datos como un valor [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) y evitar conversiones.

```solidity
    // Verify a Merkle proof
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

En notación matemática, la verificación de pruebas de Merkle se ve así: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Este código lo implementa.

## Las pruebas de Merkle y los rollups no se mezclan {#merkle-proofs-and-rollups}

Las pruebas de Merkle no funcionan bien con los [rollups](/developers/docs/scaling/#rollups). La razón es que los rollups escriben todos los datos de transacciones en L1, pero procesan en L2. El costo de enviar una prueba de Merkle junto a una transacción promedia 638 gas por capa (actualmente, un byte en calldata cuesta 16 gas si no es cero, y 4 si es cero). Si tuviéramos 1024 palabras de datos, una prueba de Merkle requeriría diez capas, o un total de 6380 gas.

Por ejemplo, mirando [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), el gas en L1 cuesta unos 100 gwei, mientras que el gas en L2 cuesta 0.001 gwei (ese es el precio normal, aunque puede subir con congestión). Así, por el costo de un gas en L1, podemos gastar cien mil gas en procesamiento en L2. Suponiendo que no sobrescribimos almacenamiento, esto significa que podemos escribir unas cinco palabras en almacenamiento en L2 por el precio de un gas en L1. Para una sola prueba de Merkle, podemos escribir todas las 1024 palabras en almacenamiento (suponiendo que pueden calcularse on-chain en vez de ser enviadas en una transacción) y aún nos sobra la mayor parte del gas.

## Conclusión {#conclusion}

En la vida real puede que nunca implemente árboles de Merkle por su cuenta. Hay bibliotecas muy conocidas y auditadas que puede usar, y en general, es mejor no implementar primitivas criptográficas usted mismo. Pero espero que ahora comprenda mejor las pruebas de Merkle y pueda decidir cuándo vale la pena usarlas.

Tenga en cuenta que, si bien las pruebas de Merkle preservan la _integridad_, no preservan la _disponibilidad_. Saber que nadie más puede tomar sus activos es poco consuelo si el almacenamiento de datos decide no permitir el acceso y tampoco puede construir un árbol de Merkle para acceder a ellos. Por tanto, los árboles de Merkle se usan mejor junto con algún tipo de almacenamiento descentralizado, como IPFS.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
