---
title: "Definición de almacenamiento secreto Web3"
description: Definicion formal para el almacenamiento secreto web3
lang: es
sidebarDepth: 2
---

Para hacer que su app funcione en Ethereum, puede usar el objeto web3 proporcionado por la biblioteca web3.js. Este se comunica debajo del capó con un nodo local a través de llamadas RPC. [web3](https://github.com/ethereum/web3.js/) funciona con cualquier nodo de Ethereum que exponga una capa RPC.

`web3` contiene el objeto `eth`: web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** resultado
 *               [ 'web3', 3 ]   archivo de claves web3 (v3)
 *  [ 'ethersale', undefined ]   archivo de claves Ethersale
 *                        null     archivo de claves no válido
 */
```

Este documento describe la **versión 3** de la Definición de almacenamiento secreto de Web3.

## Definición {#definition}

La codificación y decodificación real del archivo permanece prácticamente sin cambios desde la versión 1, excepto que el algoritmo criptográfico ya no está fijado en AES-128-CBC (AES-128-CTR es ahora el requisito mínimo). La mayoría de los significados y el algoritmo son similares a los de la versión 1, a excepción de `mac`, que se proporciona como el SHA3 (keccak-256) de las concatenaciones de los segundos 16 bytes desde la izquierda de la clave derivada junto con el `ciphertext` completo.

Los archivos de clave secreta se guardan directamente en `~/.web3/keystore` (para sistemas de tipo Unix) y en `~/AppData/Web3/keystore` (para Windows). Pueden tener cualquier nombre, pero una buena convención es usar `<uuid>.json`, donde `<uuid>` es el UUID de 128 bits que se le asigna a la clave secreta (un proxy que preserva la privacidad para la dirección de la clave secreta).

Todos esos archivos se asocian a una contraseña. Para derivar la clave secreta de un archivo `.json` dado, primero hay que derivar la clave de cifrado del archivo; esto se hace tomando la contraseña del archivo y pasándola por una función de derivación de claves, como se describe en la clave `kdf`. La clave `kdfparams` describe los parámetros estáticos y dinámicos que dependen de la función KDF.

PBKDF2 debe ser aceptado por toda implementation mínimamente compatible, aunque cabe mencionar que:

- `kdf`: `pbkdf2`

Para PBKDF2, el kdfparams incluye:

- `prf`: Debe ser `hmac-sha256` (podría ampliarse en el futuro);
- `c`: número de iteraciones;
- `salt`: salt pasado a PBKDF;
- `dklen`: longitud de la clave derivada. Debe ser >= 32.

Una vez que la clave del archivo se haya derivado, esta tiene que verificarse a través de la derivación del MAC. El MAC debe calcularse como el hash SHA3 (keccak-256) de la matriz de bytes formada por las concatenaciones de los segundos 16 bytes desde la izquierda de la clave derivada con el contenido de la clave `ciphertext`, es decir:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(donde `++` es el operador de concatenación)

Este valor debe compararse con el contenido de la clave `mac`; si son diferentes, se debe solicitar una contraseña alternativa (o cancelar la operación).

Una vez verificada la clave del archivo, el texto cifrado (la clave `ciphertext` del archivo) se puede descifrar utilizando el algoritmo de cifrado simétrico especificado por la clave `cipher` y parametrizado a través de la clave `cipherparams`. Si el tamaño de la clave derivada y el tamaño de la clave del algoritmo no coinciden, los bytes más a la derecha rellenados con ceros de la clave derivada deberían de utilizarse como clave del algoritmo.

Toda implementation mínimamente compatible debe soportar el algoritmo AES-128-CTR, aunque se debe tener en cuenta que:

- `cipher: aes-128-ctr`

Este cifrado toma los siguientes parámetros, dados como claves para la clave cipherparams:

- `iv`: vector de inicialización de 128 bits para el cifrado.

La clave para el cifrado son los 16 bytes más a la izquierda de la clave derivada, es decir, `DK[0..15]`.

La creación/encriptación de la clave secreta debería ser lo contrario a estas instrucciones. Asegúrese de que `uuid`, `salt` e `iv` sean realmente aleatorios.

Además del campo `version`, que debe actuar como un identificador "fijo" de la versión, las implementaciones también pueden usar `minorversion` para rastrear cambios más pequeños en el formato que no rompan la compatibilidad.

## Vectores de prueba {#test-vectors}

Detalles:

- `Dirección`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Contraseña`: `testpassword`
- `Secreto`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

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

`Clave derivada`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Cuerpo del MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Clave de cifrado`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vector de prueba usando AES-128-CTR y el Scrypt:

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

`Clave derivada`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Cuerpo del MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Clave de cifrado`: `7446f59ecc301d2d79bc3302650d8a5c`

## Alteraciones con respecto a la versión 1 {#alterations-from-v2}

Esta versión corrige varias incoherencias con la versión 1 publicada [aquí](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Resumiendo, son estas:

- La capitalización es injustificada e inconsistentes (minúsculas en el scrypt, caso mixto Kdf, MAC en Mayúsculas).
- Dirección innecesaria y privacidad comprometida.
- `Salt` es intrínsecamente un parámetro de la función de derivación de claves y merece estar asociado a ella, no a la criptografía en general.
- _SaltLen_ innecesario (basta con derivarlo a partir de Salt).
- La función de derivación de la clave es determinada, no obstante, el algoritmo es difícil de especificar.
- `Version` es intrínsecamente numérico y, sin embargo, es una cadena (el control de versiones estructurado sería posible con una cadena, pero puede considerarse fuera del alcance para un formato de archivo de configuración que cambia con poca frecuencia).
- `KDF` y `cipher` son conceptos teóricamente análogos, aunque están organizados de forma diferente.
- `MAC` se calcula a partir de un fragmento de datos que no tiene en cuenta los espacios en blanco (!).

Se han hecho cambios al formato para obtener el siguiente archivo, es funcionalmente equivalente al ejemplo dado en la página previamente vinculada:

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

## Alteraciones con respecto a la versión 2 {#alterations-from-v2}

La versión 2 fue una implementation temprana en C++ con un número de errores. Todo lo esencial permanece sin cambios.
