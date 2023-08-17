---
title: Définition du stockage secret Web3
description: Définition formelle du stockage secret Web3
lang: fr
sidebarDepth: 2
---

Pour que votre application fonctionne sur Ethereum, vous pouvez utiliser l'objet web3 fourni par la bibliothèque web3.js. Il communique à un nœud local par le biais des appels RPC. [Web3](https://github.com/ethereum/web3.js/) fonctionne avec n'importe quel nœud Ethereum qui propose une couche RPC.

`web3` contient l'objet `eth` - web3.eth.

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

Ce document est la **version 3** de la Définition du Stockage Secret Web3.

## Définition {#definition}

L'encodage et le décodage du fichier restent en grande partie inchangés depuis la version 1, sauf que l'algorithme de cryptage n'est plus fixé à AES-128-CBC (AES-128-CTR est maintenant le minimum requis). La plupart des significations/algorithmes sont similaires à la version 1, sauf `mac`, qui est donné comme SHA3 (keccak-256) des concaténations des 16 octets les plus à gauche de la clé dérivée avec le `cryptage complet`.

Les fichiers de clés secrètes sont stockés directement dans `~/.web3/keystore` (pour les systèmes Unix) et `~/AppData/Web3/keystore` (pour Windows). Ils peuvent porter n'importe quel nom, mais une bonne convention est `<uuid>. fils`, où `<uuid>` est l'UUID 128 bits donné à la clé secrète (un proxy préservant la vie privée pour l'adresse de la clé secrète).

Tous ces fichiers ont un mot de passe associé. Pour dériver la clé secrète d'un fichier `.json` donné, il faut d'abord dériver la clé de chiffrement du fichier ; cela se fait en prenant le mot de passe du fichier et en le faisant passer par une fonction de dérivation de clés, comme décrit par la clé `kdf`. Les paramètres statiques et dynamiques de la fonction KDF sont décrits dans la clé `kdfparams`.

PBKDF2 doit cependant être pris en charge par toutes les implémentations minimalement conformes, désignées par :

- `kdf`: `pbkdf2`

Pour PBKDF2, les kdfparams incluent :

- `prf`: Doit être `hmac-sha256` (peut être étendu dans le futur) ;
- `c`: nombre d'itérations ;
- `sel`: sel passé à PBKDF ;
- `dklen`: longueur de la clé dérivée. Doit être >= 32.

Une fois que la clé du fichier a été dérivée, elle doit être vérifiée par la dérivation du MAC. Le MAC doit être calculé comme le hachage SHA3 (keccak-256) du tableau d'octets formé comme les concaténations des 16 octets les plus à gauche de la clé dérivée avec le contenu de la clé `de texte de chiffrement` , c'est-à-dire :

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(où `++` est l'opérateur de concaténation)

Cette valeur doit être comparée au contenu de la clé `mac` ; si elles sont différentes, un mot de passe alternatif doit être demandé (ou l'opération annulée).

Une fois la clé du fichier vérifiée, le texte de chiffrement (le `cryptage` clé dans le fichier) peut être déchiffré à l'aide de l'algorithme de chiffrement symétrique spécifié par la clé `de chiffrement` et paramétré à travers la clé `de chiffrement`. Si la taille de la clé dérivée et la taille de la clé de l'algorithme ne correspondent pas, les octets zéro les plus à droite de la clé dérivée doivent être utilisés comme clé de l'algorithme.

Toutes les implémentations minimalement conformes doivent supporter l'algorithme AES-128-CTR, désigné par :

- `cipher: aes-128-ctr`

Ce procédé de chiffrement prend les paramètres suivants, donnés comme clés de la clé des paramètres de chiffrement :

- `iv`: vecteur d'initialisation 128 bits pour le chiffrement.

La clé de chiffrement est constituée des 16 octets les plus à gauche de la clé dérivée, c'est-à-dire `DK[0..15]`

La création/Le cryptage d'une clé secrète doit être essentiellement l'inverse de ces instructions. Assurez-vous que les `uuuid`, `sel` et `iv` sont réellement aléatoires.

En plus du champ `version` , qui devrait agir comme un identifiant "en dur" de la version, les implémentations peuvent également utiliser `minorversion` pour suivre les changements plus petits et sans rupture du format.

## Test des vecteurs {#test-vectors}

Détails :

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Test du vecteur en utilisant `AES-128-CTR` et `PBKDF2-SHA-256` :

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

**Intermédiaire** :

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Test de vecteur en utilisant AES-128-CTR et Scrypt :

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "83dbcc02d8ccb40e466191a123791e0e"
    },
    "ciphertext": "d172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 8,
      "r": 1,
      "salt": "ab0c7876052600dd703518d6fc3fe8984592145b591fc8fb5c6d43190334ba19"
    },
    "mac": "2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Intermédiaire** :

`Derived key`: `fac192ceb5fd772906bea3e118a69e8bbb5cc24229e20d8766fd298291bba6bd` `MAC Body`: `bb5cc24229e20d8766fd298291bba6bdd172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c` `MAC`: `2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097` `Cipher key`: `fac192ceb5fd772906bea3e118a69e8b`

## Modifications de la Version 1 {#alterations-from-v2}

Cette version corrige plusieurs incohérences vis-à-vis de la version 1 publiée [ici](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). En bref, il s'agit de :

- La capitalisation est injustifiée et incohérente (Scrypt minuscule, Kdf mixte, Mac majuscule).
- Adresse inutile et compromettant la vie privée.
- `Le sel` est intrinsèquement un paramètre de la fonction de dérivation clé et mérite d'y être associé, et non à la crypto en général.
- _SaltLen_ inutile (il suffit de le déduire du sel).
- La fonction de dérivation de clé est donnée, mais l'algorithme de crypto n'est pas spécifié.
- `La version` est intrinsèquement numérique, mais il s'agit encore d'une chaîne de caractères (le contrôle structuré des versions serait possible avec une chaîne, mais peut être considéré hors de portée pour un format de fichier de configuration rarement changeant).
- `KDF` et `chiffrement` sont en théorie des concepts frères mais sont organisés différemment.
- `MAC` est calculé à travers un espace de données agnostique (!)

Des modifications ont été apportées au format pour donner le fichier suivant, équivalent sur le plan fonctionnel à l'exemple donné sur la page précédemment citée :

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

## Modifications de la Version 2 {#alterations-from-v2}

La version 2 était une implémentation précoce C++ comportant un certain nombre d'anomalies. Tous les éléments essentiels restent inchangés.
