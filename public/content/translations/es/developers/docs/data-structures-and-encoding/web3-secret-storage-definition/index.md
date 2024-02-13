---
title: Definición de almacenamiento secreto Web3
description: Definicion formal para el almacenamiento secreto web3
lang: es
sidebarDepth: 2
---

Para hacer que su app funcione en Ethereum, puede usar el objeto web3 proporcionado por la biblioteca web3.js. Este se comunica debajo del capó con un nodo local a través de llamadas RPC. [web3](https://github.com/ethereum/web3.js/) funciona con cualquiera nodo de Ethereum que exponga una capa RPC.

`web3` contiene el objeto `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** result
 *               [ 'web3', 3 ]   web3 (v3) keyfile
 *  [ 'ethersale', undefined ]   Ethersale keyfile
 *                        null     invalid keyfile
 */
```

Esto documenta la **versión 3** de la Definición de Almacenamiento Secreto Web3.

## Definición {#definition}

La codificación y decodificación real del archivo permanece prácticamente sin cambios desde la versión 1, excepto que el algoritmo criptográfico ya no está fijado en AES-128-CBC (AES-128-CTR es ahora el requisito mínimo). La mayoría de los significados/algoritmos son similares a la versión 1, a excepción de `mac`, el cual es dado como SHA3 (keccak-256) de las concatenaciones de los segundos 16 bytes más a la izquierda de la clave derivada junto con el `ciphertext` completo.

Los archivos de clave secreta son guardados directamente en `~/.web3/keystore` (para sistemas del tipo Unix) y `~/AppData/Web3/keystore` (para Windows). Se pueden llamar como se quieran, no obstante una buena forma es `<uuid>.json`, donde `<uuid>` es el UUID de 128-bit otorgado a la clave secreta (un proxy para preservar la privacidad para las direcciones de las claves secretas).

Todos esos archivos se asocian a una contraseña. Para derivar la clave secreta de un archivo `.json` determinado, primero se deriva la clave de encriptación del archivo. Esto se hace tomando la contraseña del archivo y pasándola por una función de derivación de claves, tal y como describe la clave `kdf`. Laclave `kdfparams` describe los parámetros estáticos y dinámicos que dependen de la función KDF.

PBKDF2 debe ser aceptado por toda implementation mínimamente compatible, aunque cabe mencionar que:

- `kdf`: `pbkdf2`

Para PBKDF2, el kdfparams incluye:

- `prf`: tiene que ser `hmac-sha256` (tal vez se amplíe en el futuro);
- `c`: número de repeticiones;
- `salt`: salt pasado a PBKDF;
- `dklen`; longitud de la clave derivada. Debe ser ser >= 32.

Una vez que la clave del archivo se haya derivado, esta tiene que verificarse a través de la derivación del MAC. El MAC debe calcularse como el hash SHA3 (keccak-256) de la matriz de bytes formado como las concatenaciones de los 16 bytes secundarios más a la izquierda de la clave derivada con el contenido de la clave `ciphertext`, es decir:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(donde `++` es el operador de la concatenación)

Este valor debe compararse con el contenido de la clave `mac`; si son diferentes, debería requerirse una contraseña alternativa (o la cancelación de la operación).

Después de verificar la clave del archivo, el texto cifrado (la clave `ciphertext` en el archivo) puede descifrarse usando el algoritmo de encriptación sistemático especificado por la clave `cipher` y parametrizada a través de la llave `cipherparams`. Si el tamaño de la clave derivada y el tamaño de la clave del algoritmo no coinciden, los bytes más a la derecha rellenados con ceros de la clave derivada deberían de utilizarse como clave del algoritmo.

Toda implementation mínimamente compatible debe soportar el algoritmo AES-128-CTR, aunque se debe tener en cuenta que:

- `cipher: aes-128-ctr`

Este cifrado toma los siguientes parámetros, dados como claves para la clave cipherparams:

- `iv`: vector de iniciación de 128-bit para el cifrado.

La clave de cifrado son los 16 bytes más a la izquierda de la clave derivada, p. ej.,: `DK[0..15]`

La creación/encriptación de la clave secreta debería ser lo contrario a estas instrucciones. Asegúrese de que `uuid`, `salt` y `iv` sean aleatorios.

Además del campo `version`, el cual debería de actuar como un indentificador de versión «duro», las implementaciones pueden usar también `minorversion` para ir siguiendo los cambios de formato irrompibles más pequeños.

## Vectores de prueba {#test-vectors}

Detalles:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

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

**Intermediario**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

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

**Intermediario**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d` `MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2` `MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c` `Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Alteraciones de la versión 1 {#alterations-from-v2}

Está versión soluciona numerosas inconsistencias con la versión 1 publicada [aquí](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Resumiendo, son estas:

- La capitalización es injustificada e inconsistentes (minúsculas en el scrypt, caso mixto Kdf, MAC en Mayúsculas).
- Dirección innecesaria y privacidad comprometida.
- `Salt` es intrínsecamente un parámetro de la función de derivación de la lcave y merece asociarse a a ella, no a la criptografia en general.
- _SaltLen_ innecesaria (solo derivada desde Salt).
- La función de derivación de la clave es determinada, no obstante, el algoritmo es difícil de especificar.
- `Version` es intrínsecamente numérico y, al mismo tiempo, una cadena (el control de versiones estructurado sería posible con una cadena, pero se puede considerar fuera del alcance de un formato de archivo de configuración que rara vez cambia).
- `KDF` y `cipher` son conceptos teóricamente iguales, a pesar de estar organizados de forma diferente.
- `MAC` se calcula a través de piezas de datos independientemente del espacio en blanco(!)

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

## Se han hecho cambios desde la versión 2 {#alterations-from-v2}

La versión 2 fue una implementation temprana en C++ con un número de errores. Todo lo esencial permanece sin cambios.
