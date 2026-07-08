---
title: "Definición de almacenamiento de secretos de Web3"
description: "Definición formal para el almacenamiento de secretos de Web3"
lang: es
sidebarDepth: 2
---

Para hacer que su aplicación funcione en Ethereum, puede usar el objeto web3 proporcionado por la biblioteca Web3.js. Internamente, se comunica con un nodo local a través de llamadas RPC. [web3](https://github.com/ethereum/web3.js/) funciona con cualquier nodo de Ethereum que exponga una capa RPC.

`web3` contiene el objeto `eth`: web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** resultado
 *               [ 'web3', 3 ]   archivo de clave de Web3 (v3)
 *  [ 'ethersale', undefined ]   archivo de clave de Ethersale
 *                        null     archivo de clave inválido
 */
```

Este documento describe la **versión 3** de la Definición de almacenamiento de secretos de Web3.

## Definición {#definition}

La codificación y decodificación real del archivo permanece en gran medida sin cambios desde la versión 1, excepto que el algoritmo cripto ya no está fijado a AES-128-CBC (AES-128-CTR es ahora el requisito mínimo). La mayoría de los significados/algoritmos son similares a la versión 1, excepto `mac`, que se da como el SHA3 (Keccak-256) de las concatenaciones de los 16 bytes en la segunda posición más a la izquierda de la clave derivada junto con el `ciphertext` completo.

Los archivos de clave secreta se almacenan directamente en `~/.web3/keystore` (para sistemas tipo Unix) y `~/AppData/Web3/keystore` (para Windows). Pueden tener cualquier nombre, pero una buena convención es `<uuid>.json`, donde `<uuid>` es el UUID de 128 bits asignado a la clave secreta (un proxy que preserva la privacidad para la dirección de la clave secreta).

Todos estos archivos tienen una contraseña asociada. Para derivar la clave secreta de un archivo `.json` dado, primero derive la clave de cifrado del archivo; esto se hace tomando la contraseña del archivo y pasándola por una función de derivación de claves como se describe en la clave `kdf`. Los parámetros estáticos y dinámicos dependientes de KDF para la función KDF se describen en la clave `kdfparams`.

PBKDF2 debe ser compatible con todas las implementaciones que cumplan con los requisitos mínimos, denotado mediante:

- `kdf`: `pbkdf2`

Para PBKDF2, los kdfparams incluyen:

- `prf`: Debe ser `hmac-sha256` (puede ampliarse en el futuro);
- `c`: número de iteraciones;
- `salt`: salt pasado a PBKDF;
- `dklen`: longitud de la clave derivada. Debe ser >= 32.

Una vez que se ha derivado la clave del archivo, debe verificarse mediante la derivación del MAC. El MAC debe calcularse como el hash SHA3 (Keccak-256) de la matriz de bytes formada como las concatenaciones de los 16 bytes en la segunda posición más a la izquierda de la clave derivada con el contenido de la clave `ciphertext`, es decir:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(donde `++` es el operador de concatenación)

Este valor debe compararse con el contenido de la clave `mac`; si son diferentes, se debe solicitar una contraseña alternativa (o cancelar la operación).

Después de que se haya verificado la clave del archivo, el texto cifrado (la clave `ciphertext` en el archivo) puede descifrarse utilizando el algoritmo de cifrado simétrico especificado por la clave `cipher` y parametrizado a través de la clave `cipherparams`. Si el tamaño de la clave derivada y el tamaño de la clave del algoritmo no coinciden, los bytes más a la derecha de la clave derivada, rellenados con ceros, deben usarse como clave para el algoritmo.

Todas las implementaciones que cumplan con los requisitos mínimos deben ser compatibles con el algoritmo AES-128-CTR, denotado mediante:

- `cipher: aes-128-ctr`

Este cifrado toma los siguientes parámetros, dados como claves a la clave cipherparams:

- `iv`: vector de inicialización de 128 bits para el cifrado.

La clave para el cifrado son los 16 bytes más a la izquierda de la clave derivada, es decir, `DK[0..15]`

La creación/cifrado de una clave secreta debe ser esencialmente el reverso de estas instrucciones. Asegúrese de que `uuid`, `salt` y `iv` sean realmente aleatorios.

Además del campo `version`, que debe actuar como un identificador "fuerte" de la versión, las implementaciones también pueden usar `minorversion` para rastrear cambios menores y no disruptivos en el formato.

## Vectores de prueba {#test-vectors}

Detalles:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

Vector de prueba usando `AES-128-CTR` y `PBKDF2-SHA-256`:

Contenido del archivo de `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Intermedios**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vector de prueba usando AES-128-CTR y Scrypt:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Intermedios**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Alteraciones desde la versión 1 {#alterations-from-v2}

Esta versión corrige varias inconsistencias con la versión 1 publicada [aquí](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). En resumen, estas son:

- El uso de mayúsculas es injustificado e inconsistente (scrypt en minúsculas, Kdf en mayúsculas y minúsculas, MAC en mayúsculas).
- La dirección es innecesaria y compromete la privacidad.
- `Salt` es intrínsecamente un parámetro de la función de derivación de claves y merece estar asociado a ella, no a la criptografía en general.
- _SaltLen_ es innecesario (simplemente se deriva de Salt).
- Se proporciona la función de derivación de claves, sin embargo, el algoritmo cripto está especificado de forma rígida.
- `Version` es intrínsecamente numérico, pero es una cadena (el control de versiones estructurado sería posible con una cadena, pero puede considerarse fuera del alcance para un formato de archivo de configuración que rara vez cambia).
- `KDF` y `cipher` son conceptos teóricamente hermanos, pero están organizados de manera diferente.
- `MAC` se calcula a través de un fragmento de datos independiente de los espacios en blanco (!)

Se han realizado cambios en el formato para proporcionar el siguiente archivo, funcionalmente equivalente al ejemplo dado en la página enlazada anteriormente:

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## Alteraciones desde la versión 2 {#alterations-from-v2-2}

La versión 2 fue una implementación temprana en C++ con varios errores. Todos los elementos esenciales permanecen sin cambios desde entonces.