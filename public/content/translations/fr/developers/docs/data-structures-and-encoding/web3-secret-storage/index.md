---
title: "Définition du stockage de secrets Web3"
description: "Définition formelle du stockage de secrets Web3"
lang: fr
sidebarDepth: 2
---

Pour faire fonctionner votre application sur Ethereum, vous pouvez utiliser l'objet web3 fourni par la bibliothèque Web3.js. En interne, il communique avec un nœud local via des appels RPC. [web3](https://github.com/ethereum/web3.js/) fonctionne avec n'importe quel nœud Ethereum qui expose une couche RPC.

`web3` contient l'objet `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** résultat
 *               [ 'web3', 3 ]   fichier de clé Web3 (v3)
 *  [ 'ethersale', undefined ]   fichier de clé Ethersale
 *                        null     fichier de clé invalide
 */
```

Ce document décrit la **version 3** de la définition du stockage de secrets Web3.

## Définition {#definition}

L'encodage et le décodage réels du fichier restent en grande partie inchangés par rapport à la version 1, à l'exception de l'algorithme crypto qui n'est plus fixé à AES-128-CBC (AES-128-CTR est désormais l'exigence minimale). La plupart des significations/algorithmes sont similaires à la version 1, à l'exception de `mac`, qui est donné comme le SHA3 (Keccak-256) des concaténations du deuxième bloc de 16 octets en partant de la gauche de la clé dérivée avec l'intégralité de `ciphertext`.

Les fichiers de clé secrète sont stockés directement dans `~/.web3/keystore` (pour les systèmes de type Unix) et `~/AppData/Web3/keystore` (pour Windows). Ils peuvent porter n'importe quel nom, mais une bonne convention est `<uuid>.json`, où `<uuid>` est l'UUID de 128 bits attribué à la clé secrète (un proxy préservant la confidentialité pour l'adresse de la clé secrète).

Tous ces fichiers ont un mot de passe associé. Pour dériver la clé secrète d'un fichier `.json` donné, dérivez d'abord la clé de chiffrement du fichier ; cela se fait en prenant le mot de passe du fichier et en le passant par une fonction de dérivation de clé telle que décrite par la clé `kdf`. Les paramètres statiques et dynamiques dépendant de la KDF pour la fonction KDF sont décrits dans la clé `kdfparams`.

PBKDF2 doit être pris en charge par toutes les implémentations minimalement conformes, indiqué par :

- `kdf` : `pbkdf2`

Pour PBKDF2, les kdfparams incluent :

- `prf` : Doit être `hmac-sha256` (peut être étendu à l'avenir) ;
- `c` : nombre d'itérations ;
- `salt` : sel passé à PBKDF ;
- `dklen` : longueur de la clé dérivée. Doit être >= 32.

Une fois la clé du fichier dérivée, elle doit être vérifiée par la dérivation du MAC. Le MAC doit être calculé comme le hash SHA3 (Keccak-256) du tableau d'octets formé par les concaténations du deuxième bloc de 16 octets en partant de la gauche de la clé dérivée avec le contenu de la clé `ciphertext`, c'est-à-dire :

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(où `++` est l'opérateur de concaténation)

Cette valeur doit être comparée au contenu de la clé `mac` ; si elles sont différentes, un mot de passe alternatif doit être demandé (ou l'opération annulée).

Après que la clé du fichier a été vérifiée, le texte chiffré (la clé `ciphertext` dans le fichier) peut être déchiffré en utilisant l'algorithme de chiffrement symétrique spécifié par la clé `cipher` et paramétré via la clé `cipherparams`. Si la taille de la clé dérivée et la taille de la clé de l'algorithme ne correspondent pas, les octets les plus à droite de la clé dérivée, complétés par des zéros, doivent être utilisés comme clé pour l'algorithme.

Toutes les implémentations minimalement conformes doivent prendre en charge l'algorithme AES-128-CTR, indiqué par :

- `cipher: aes-128-ctr`

Ce chiffrement prend les paramètres suivants, donnés comme clés à la clé cipherparams :

- `iv` : vecteur d'initialisation de 128 bits pour le chiffrement.

La clé pour le chiffrement correspond aux 16 octets les plus à gauche de la clé dérivée, c'est-à-dire `DK[0..15]`

La création/le chiffrement d'une clé secrète doit être essentiellement l'inverse de ces instructions. Assurez-vous que `uuid`, `salt` et `iv` sont réellement aléatoires.

En plus du champ `version`, qui doit agir comme un identifiant « strict » de version, les implémentations peuvent également utiliser `minorversion` pour suivre les modifications mineures et non bloquantes du format.

## Vecteurs de test {#test-vectors}

Détails :

- `Address` : `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP` : `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID` : `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password` : `testpassword`
- `Secret` : `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

Vecteur de test utilisant `AES-128-CTR` et `PBKDF2-SHA-256` :

Contenu du fichier `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` :

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

**Intermédiaires** :

`Derived key` : `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body` : `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC` : `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key` : `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vecteur de test utilisant AES-128-CTR et Scrypt :

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

**Intermédiaires** :

`Derived key` : `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body` : `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC` : `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key` : `7446f59ecc301d2d79bc3302650d8a5c`

## Modifications par rapport à la version 1 {#alterations-from-v2}

Cette version corrige plusieurs incohérences avec la version 1 publiée [ici](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). En résumé, ce sont :

- La capitalisation est injustifiée et incohérente (scrypt en minuscules, Kdf en casse mixte, MAC en majuscules).
- L'adresse est inutile et compromet la confidentialité.
- `Salt` est intrinsèquement un paramètre de la fonction de dérivation de clé et mérite d'y être associé, et non à la crypto en général.
- _SaltLen_ est inutile (il suffit de le dériver de Salt).
- La fonction de dérivation de clé est donnée, pourtant l'algorithme crypto est spécifié en dur.
- `Version` est intrinsèquement numérique mais est une chaîne de caractères (le versionnage structuré serait possible avec une chaîne, mais peut être considéré comme hors de portée pour un format de fichier de configuration qui change rarement).
- `KDF` et `cipher` sont théoriquement des concepts frères, mais sont organisés différemment.
- `MAC` est calculé à partir d'une donnée insensible aux espaces (!)

Des modifications ont été apportées au format pour donner le fichier suivant, fonctionnellement équivalent à l'exemple donné sur la page liée précédemment :

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

## Modifications par rapport à la version 2 {#alterations-from-v2-2}

La version 2 était une première implémentation en C++ comportant un certain nombre de bugs. Tous les éléments essentiels restent inchangés par rapport à celle-ci.