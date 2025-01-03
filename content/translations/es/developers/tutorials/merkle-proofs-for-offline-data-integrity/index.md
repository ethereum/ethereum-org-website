---
title: Pruebas de Merkle para la integridad de los datos fuera de línea
description: Asegurar la integridad de los datos en la cadena para los datos que se almacenan, sobre todo, fuera de la cadena.
author: Ori Pomerantz
tags:
  - "almacenamiento"
skill: advanced
lang: es
published: 2021-12-30
---

## Introducción {#introduction}

Idóneamente, nos gustaría guardar todo en el almacenamiento de Ethereum, el cual se guarda en miles de computadoras y tiene una disponibilidad extremadamente alta (los datos no pueden ser censurados) e integridad (los datos no pueden ser modificados de una manera no autorizada), sin embargo almacenar una palabra de 32 bytes suele costar 20.000 gas. En el momento de redactar este artículo, el coste actual es de 6,60 $. A 21 centavos por byte esto es demasiado costoso para muchos usos.

Para resolver este problema, el ecosistema de Ethereum desarrolló [muchas formas alteranativas de almacenar datos de una manera decentralizada](/developers/docs/storage/). Usualmente involucran compensar entre disponibilidad y precio. Sin embargo, normalmente se asegura la integridad.

En este artículo, descubrirá **cómo** asegurar la integridad de los datos sin almacenar los datos en la cadena de bloques, usando [Pruebas de Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## ¿Cómo funciona? {#how-does-it-work}

En teoría podríamos almacenar el hash de los datos en cadena y enviar todos los datos en transacciones que lo requieran. No obstante, sigue siendo demasiado caro. Un byte de data a una transacción cuesta alrededor de 16 gas, actualmente cerca de medio centavo, o aproximadamente 5 dólares por kilobyte. A 5.000 $ por megabyte, esto sigue siendo demasiado caro para muchos usos, incluso sin el coste añadido de acelerar los datos.

La solución consiste en acelerar repetidamente diferentes subconjuntos de los datos, de forma que para los datos que no necesite enviar, pueda simplemente enviar un hash. Esto se hace utilizando un árbol Merkle, una estructura de datos en arbol donde cada nodo es un hash de los nodos debajo:

![Árbol de Merkle](tree.png)

El hash en la raíz es la única parte que necesita almacenarse en cadena. Para demostrar un determinado valor, proporcione todos los hash que necesitan combinarse con él para obtener la raíz. Por ejemplo, para probar `C` proporcionas `D`, `H(A-B)`y `H(E-H)`.

![Prueba del valor de C](proof-c.png)

## Implementación {#implementation}

[El código de muestra se proporciona aquí](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Código fuera de la cadena {#off-chain-code}

En este artículo, utilizamos JavaScript para los cálculos fuera de la cadena. La mayoría de las aplicaciones descentralizadas tienen su componente fuera de la cadena en JavaScript.

#### Crear la raíz de Merkle {#creating-the-merkle-root}

Primero necesitamos proporcionar la raíz de Merkle a la cadena.

```javascript
const ethers = require("ethers")
```

[Utilizamos la función hash del paquete ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificar cada entrada en un único entero de 256 bits resulta en un código menos legible que el de JSON, por ejemplo. Sin embargo, esto significa un procesamiento significativamente menor para recuperar los datos en el contrato, unos costes de gas mucho menores. [Puede leer JSON en la cadena](https://github.com/chrisdotn/jsmnSol), aunque no es muy aconsejable, si se puede evitar.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

En este caso para empezar nuestros datos son valores de 256 bits, por que no se necesita ningún procesamiento. Si utilizamos una estructura de datos más compleja, como cadenas, necesitamos asegurarnos de que hacemos hash los datos primero para obtener una matriz de hashes. Tenga en cuenta que esto también es porque no nos importa que los usuarios conozcan la información de otros usuarios. De lo contrario, habríamos tenido que hacer hash para que el usuario 1 no sepa el valor para el usuario 0, el usuario 2 no sabrá el valor del usuario 3, etc.

```javascript
// Convert between the string the hash function expects and the
// BigInt we use everywhere else.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

La función hash de ethers espera obtener una cadena de JavaScript con un número hexadecimal, como `0x60A7`, y responde con otra cadena con la misma estructura. Sin embargo, para el resto de código es más fácil usar `BigInt`, para convertir a una cadena hexadecimal y viceversa.

```javascript
// Symmetrical hash of a pair so we won't care if the order is reversed.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Esta función es simétrica (hash de un [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Esto significa que cuando revisamos la prueba de Merkle no debemos preocuparnos sobre si el valor de la prueba debe ser colocado antes o después del valor calculado. La revisión de la prueba de Merkle se realiza en la cadena, así que cuanto menos necesitemos hacer, mejor.

Advertencia: la criptografía es más complicada de lo que parece. La versión inicial de este artículo tuvo la función de hash `hash(a^b)`. Y no muy nada **atinado**, porque esto significaba que si conocía los valores legítimos de `a` y `b`, podría usar `b' = a^b^a'` para probar cualquier valor deseado de `a'`. Con esta función tendrías que calcular `b'` tal que `hash(a') ^hash(b')` es igual a un valor conocido (la siguiente rama en el camino a la raíz), lo que es más difícil.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Cuando el número de valores no es un entero potencia de dos, necesitamos manejar ramas vacías. La manera en que este programa lo hace es colocando cero como marcador de posición.

![Árbol Merkle con ramas faltantes](merkle-empty-hash.png)

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

La función «escala» un nivel en el árbol Merkle al hacer hash de los pares de valores en la capa actual. Observe que esta no es la implementación más eficiente, porque podríamos haber evitado copiar el resultado y solo añadir `hashEmpty` cuando sea apropiado en el bucle, pero este código está optimizado para una mejor lectura.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Para obtener la raíz, escalamos hasta que solo quede un valor.

#### Cómo crear una prueba de Merkle {#creating-a-merkle-proof}

Una prueba de Merkle son los valores que se mezclan junto con el valor que se demuestra para recuperar la raíz de Merkle. Por lo general, el valor para probar está disponible a partir de otros datos, por eso prefiero proporcionarlo de manera separada, en vez de como una parte del código.

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

Unimos `(v[0],v[1])`, `(v[2],v[3])`, etc. Encontes, para valores pares necesitamos el siguiente, y para valores impares, el anterior.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Código en la cadena {#on-chain-code}

Por último, tenemos el código que comprueba la prueba. El código en la cadena se escribe en [Solidity](https://docs.soliditylang.org/en/v0.8.11/). La optimización es más importante aquí porque el gas es relativamente caro.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Escribí esto usando el [entorno de desarrollo Hardhat](https://hardhat.org/), que nos permite tener [resultados de la consola desde Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) mientras desarrollamos.

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

Establecer y obtener funciones para la raíz de Merkle. Permitir que cualquiera actualice la raíz de Merkle es una _idea totalmente desaconsejable_ en un sistema de producción. Aquí lo hago con el objetivo de la simplicidad en el código de ejemplo. **No lo haga en un sistema donde la integridad de los datos realmente importe**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Esta función genera un par hash. Solo es la traducción de Solidity del código de JavaScript para `hash` y `pairHash`.

**Nota**: Este es otro caso de optimización para la lectura. Basado en la [definición de función](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), es posible almacenar los datos como un valor [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) y evitar las conversiones.

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

En notación matemática, la verificación de prueba de Merkle dice así: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Este código lo implementa.

## Las pruebas de Merkle y los rollups no se mezclan {#merkle-proofs-and-rollups}

Las pruebas de Merkle no funcionan bien con las acumulaciones o [rollups](/developers/docs/scaling/#rollups). La razón es que los rollups escriben todos los datos de la transacción en L1, pero los procesa en L2. El costo de enviar una prueba de Merkle con una transacción se promedia en 638 de gas por capa (actualmente, un byte en un llamado de datos cuesta 16 de gas si es diferente a cero y 4 si es cero). Si tenemos 1024 palabras de datos, una prueba de Merkle requiere diez capas o un total de 6380 de gas.

Veamos como ejemplo a [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), escribir L1 cuesta alrededor de 100 gwei en gas y L2 cuesta 0,001 gwei en gas (ese es un precio normal, puede aumentar con la congestión). Entonces para el coste de un gas L1 podemos gastar mil de gas en L2. Asumiendo que no hemos sobrescrito el almacenamiento, esto significa que podemos escribir alrededor de cinco palabras en el almacenamiento en L2 para el precio de un gas L1. Para una única prueba de Merkle podemos escribir el total de 1.024 palabras en el almacenamiento (asimiendo que se pueden calcular en la cadena para empezar, en vez de proporcionarlas en la transacción) y todavía tenemos la mayoría del gas restante.

## Conclusión {#conclusion}

En la vida real puede que nunca implemente árboles de Merkle por su cuenta. Hay bibliotecas bien conocidas y auditadas que puede utilizar y, por lo general, es mejor no implementar criptográficos primitivos por su cuenta. Pero espero que ahora comprenda mejor las pruebas de Merkle y pueda decidir cuándo es mejor usarlas.

Note que mientras las pruebas de Merkle preservan la _integridad_, no preservan la _disponibilidad_. Saber que nadie puede adueñarse de sus activos es una pequeña consolación si el almacenamiento de datos decide desactivar el acceso y no puede construir un árbol de Merkle para acceder a estos. Por tanto, es mejor usar los árboles de Merkle con algún tipo de almacenamiento descentralizado, como IPFS.
