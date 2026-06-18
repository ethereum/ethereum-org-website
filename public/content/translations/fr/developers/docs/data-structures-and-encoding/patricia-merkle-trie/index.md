---
title: Trie de Merkle Patricia
description: Introduction au trie de Merkle Patricia.
lang: fr
sidebarDepth: 2
---

L'état d'[Ethereum](/) (la totalité de tous les comptes, soldes et contrats intelligents) est encodé dans une version spéciale de la structure de données généralement connue en informatique sous le nom d'arbre de Merkle. Cette structure est utile pour de nombreuses applications en cryptographie car elle crée une relation vérifiable entre toutes les données individuelles intriquées dans l'arbre, ce qui donne une valeur **racine** unique qui peut être utilisée pour prouver des choses sur les données.

La structure de données d'Ethereum est un « trie de Merkle Patricia modifié », nommé ainsi car il emprunte certaines caractéristiques de PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric), et parce qu'il est conçu pour une récupération (re**trie**val) efficace des éléments de données qui composent l'état d'Ethereum.

Un trie de Merkle Patricia est déterministe et cryptographiquement vérifiable : la seule façon de générer une racine d'état est de la calculer à partir de chaque élément individuel de l'état, et il est facile de prouver que deux états sont identiques en comparant le hash racine et les hashs qui y ont conduit (_une preuve de Merkle_). À l'inverse, il n'y a aucun moyen de créer deux états différents avec le même hash racine, et toute tentative de modifier l'état avec des valeurs différentes entraînera un hash de racine d'état différent. Théoriquement, cette structure offre le « Saint Graal » de l'efficacité `O(log(n))` pour les insertions, les recherches et les suppressions.

Dans un avenir proche, Ethereum prévoit de migrer vers une structure d'[arbre de Verkle](/roadmap/verkle-trees), ce qui ouvrira de nombreuses nouvelles possibilités pour les futures améliorations du protocole.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, il serait utile d'avoir des connaissances de base sur les [hashs](https://en.wikipedia.org/wiki/Hash_function), les [arbres de Merkle](https://en.wikipedia.org/wiki/Merkle_tree), les [tries](https://en.wikipedia.org/wiki/Trie) et la [sérialisation](https://en.wikipedia.org/wiki/Serialization). Cet article commence par une description d'un [arbre radix](https://en.wikipedia.org/wiki/Radix_tree) de base, puis introduit progressivement les modifications nécessaires pour la structure de données plus optimisée d'Ethereum.

## Tries radix de base {#basic-radix-tries}

Dans un trie radix de base, chaque nœud se présente comme suit :

```
[i_0, i_1 ... i_n, valeur]
```

Où `i_0 ... i_n` représentent les symboles de l'alphabet (souvent binaire ou hexadécimal), `value` est la valeur terminale au niveau du nœud, et les valeurs dans les créneaux `i_0, i_1 ... i_n` sont soit `NULL` soit des pointeurs vers (dans notre cas, des hashs de) d'autres nœuds. Cela forme un stockage `(key, value)` de base.

Supposons que vous souhaitiez utiliser une structure de données d'arbre radix pour persister un ordre sur un ensemble de paires clé-valeur. Pour trouver la valeur actuellement mappée à la clé `dog` dans le trie, vous devez d'abord convertir `dog` en lettres de l'alphabet (ce qui donne `64 6f 67`), puis descendre dans le trie en suivant ce chemin jusqu'à ce que vous trouviez la valeur. C'est-à-dire que vous commencez par rechercher le hash racine dans une base de données (BD) clé/valeur plate pour trouver le nœud racine du trie. Il est représenté comme un tableau de clés pointant vers d'autres nœuds. Vous utiliseriez la valeur à l'indice `6` comme clé et la rechercheriez dans la BD clé/valeur plate pour obtenir le nœud du niveau inférieur. Ensuite, choisissez l'indice `4` pour rechercher la valeur suivante, puis choisissez l'indice `6`, et ainsi de suite, jusqu'à ce que, une fois que vous avez suivi le chemin : `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, vous recherchiez la valeur du nœud et renvoyiez le résultat.

Il y a une différence entre rechercher quelque chose dans le « trie » et dans la « BD » clé/valeur plate sous-jacente. Tous deux définissent des arrangements clé/valeur, mais la BD sous-jacente peut effectuer une recherche traditionnelle d'une clé en une seule étape. La recherche d'une clé dans le trie nécessite plusieurs recherches dans la BD sous-jacente pour arriver à la valeur finale décrite ci-dessus. Appelons cette dernière un `path` pour éliminer toute ambiguïté.

Les opérations de mise à jour et de suppression pour les tries radix peuvent être définies comme suit :

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Un arbre radix « Merkle » est construit en reliant des nœuds à l'aide d'empreintes de hash cryptographiques générées de manière déterministe. Cet adressage par contenu (dans la BD clé/valeur `key == keccak256(rlp(value))`) fournit une garantie d'intégrité cryptographique des données stockées. Si le hash racine d'un trie donné est publiquement connu, alors toute personne ayant accès aux données de la feuille sous-jacente peut construire une preuve que le trie inclut une valeur donnée à un chemin spécifique en fournissant les hashs de chaque nœud reliant une valeur spécifique à la racine de l'arbre.

Il est impossible pour un attaquant de fournir une preuve d'une paire `(path, value)` qui n'existe pas puisque le hash racine est ultimement basé sur tous les hashs en dessous de lui. Toute modification sous-jacente changerait le hash racine. Vous pouvez considérer le hash comme une représentation compressée des informations structurelles sur les données, sécurisée par la protection de pré-image de la fonction de hachage.

Nous appellerons une unité atomique d'un arbre radix (par exemple, un seul caractère hexadécimal ou un nombre binaire de 4 bits) un « nibble » (demi-octet). Lors de la traversée d'un chemin un nibble à la fois, comme décrit ci-dessus, les nœuds peuvent faire référence au maximum à 16 enfants mais incluent un élément `value`. Nous les représentons donc comme un tableau de longueur 17. Nous appelons ces tableaux de 17 éléments des « nœuds de branche ».

## Trie de Merkle Patricia {#merkle-patricia-trees}

Les tries radix ont une limitation majeure : ils sont inefficaces. Si vous souhaitez stocker une liaison `(path, value)` où le chemin, comme dans Ethereum, fait 64 caractères de long (le nombre de nibbles dans `bytes32`), nous aurons besoin de plus d'un kilo-octet d'espace supplémentaire pour stocker un niveau par caractère, et chaque recherche ou suppression prendra les 64 étapes complètes. Le trie Patricia introduit dans ce qui suit résout ce problème.

### Optimisation {#optimization}

Un nœud dans un trie de Merkle Patricia est l'un des éléments suivants :

1.  `NULL` (représenté comme la chaîne vide)
2.  `branch` Un nœud de 17 éléments `[ v0 ... v15, vt ]`
3.  `leaf` Un nœud de 2 éléments `[ encodedPath, value ]`
4.  `extension` Un nœud de 2 éléments `[ encodedPath, key ]`

Avec des chemins de 64 caractères, il est inévitable qu'après avoir traversé les premières couches du trie, vous atteigniez un nœud où aucun chemin divergent n'existe pour au moins une partie de la descente. Pour éviter d'avoir à créer jusqu'à 15 nœuds `NULL` clairsemés le long du chemin, nous raccourcissons la descente en configurant un nœud `extension` de la forme `[ encodedPath, key ]`, où `encodedPath` contient le « chemin partiel » pour avancer (en utilisant un encodage compact décrit ci-dessous), et la `key` sert à la prochaine recherche dans la BD.

Pour un nœud `leaf`, qui peut être marqué par un indicateur dans le premier nibble du `encodedPath`, le chemin encode tous les fragments de chemin du nœud précédent et nous pouvons rechercher la `value` directement.

Cette optimisation ci-dessus introduit cependant une ambiguïté.

Lors de la traversée de chemins en nibbles, nous pouvons nous retrouver avec un nombre impair de nibbles à traverser, mais parce que toutes les données sont stockées au format `bytes`. Il n'est pas possible de différencier, par exemple, le nibble `1` et les nibbles `01` (les deux doivent être stockés comme `<01>`). Pour spécifier une longueur impaire, le chemin partiel est préfixé par un indicateur.

### Spécification : Encodage compact de séquence hexadécimale avec terminateur optionnel {#specification}

Le marquage à la fois de la _longueur de chemin partiel restante impaire vs paire_ et du _nœud feuille vs extension_ tel que décrit ci-dessus réside dans le premier nibble du chemin partiel de tout nœud à 2 éléments. Ils donnent ce qui suit :

| caractère hex | bits | type de nœud partiel | longueur du chemin |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | extension          | paire       |
| 1        | 0001 | extension          | impaire     |
| 2        | 0010 | terminal (feuille) | paire       |
| 3        | 0011 | terminal (feuille) | impaire     |

Pour une longueur de chemin restante paire (`0` ou `2`), un autre nibble de « remplissage » `0` suivra toujours.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray a maintenant une longueur paire dont le premier quartet correspond aux drapeaux.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Exemples :

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Voici le code étendu pour obtenir un nœud dans le trie de Merkle Patricia :

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Exemple de trie {#example-trie}

Supposons que nous voulions un trie contenant quatre paires chemin/valeur `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Tout d'abord, nous convertissons les chemins et les valeurs en `bytes`. Ci-dessous, les représentations réelles en octets pour les _chemins_ sont désignées par `<>`, bien que les _valeurs_ soient toujours affichées sous forme de chaînes, désignées par `''`, pour une compréhension plus facile (elles aussi seraient en réalité des `bytes`) :

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Maintenant, nous construisons un tel trie avec les paires clé/valeur suivantes dans la BD sous-jacente :

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Lorsqu'un nœud est référencé à l'intérieur d'un autre nœud, ce qui est inclus est `keccak256(rlp.encode(node))`, si `len(rlp.encode(node)) >= 32` sinon `node` où `rlp.encode` est la fonction d'encodage [RLP](/developers/docs/data-structures-and-encoding/rlp).

Notez que lors de la mise à jour d'un trie, il faut stocker la paire clé/valeur `(keccak256(x), x)` dans une table de recherche persistante _si_ le nœud nouvellement créé a une longueur >= 32. Cependant, si le nœud est plus court que cela, il n'est pas nécessaire de stocker quoi que ce soit, puisque la fonction f(x) = x est réversible.

## Les tries dans Ethereum {#tries-in-ethereum}

Tous les tries de Merkle dans la couche d'exécution d'Ethereum utilisent un trie de Merkle Patricia.

À partir d'un en-tête de bloc, il y a 3 racines provenant de 3 de ces tries.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie d'état {#state-trie}

Il y a un trie d'état global, et il est mis à jour chaque fois qu'un client traite un bloc. Dans celui-ci, un `path` est toujours : `keccak256(ethereumAddress)` et une `value` est toujours : `rlp(ethereumAccount)`. Plus spécifiquement, un `account` Ethereum est un tableau de 4 éléments de `[nonce,balance,storageRoot,codeHash]`. À ce stade, il convient de noter que ce `storageRoot` est la racine d'un autre trie Patricia :

### Trie de stockage {#storage-trie}

Le trie de stockage est l'endroit où résident _toutes_ les données de contrat. Il y a un trie de stockage séparé pour chaque compte. Pour récupérer des valeurs à des positions de stockage spécifiques à une adresse donnée, l'adresse de stockage, la position entière des données stockées dans le stockage et l'ID du bloc sont requis. Ceux-ci peuvent ensuite être passés comme arguments à `eth_getStorageAt` défini dans l'API JSON-RPC, par exemple, pour récupérer les données dans le créneau de stockage 0 pour l'adresse `0x295a70b2de5e3953354a6a8344e616ed314d7251` :

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

La récupération d'autres éléments dans le stockage est un peu plus complexe car la position dans le trie de stockage doit d'abord être calculée. La position est calculée comme le hash `keccak256` de l'adresse et de la position de stockage, tous deux complétés à gauche par des zéros jusqu'à une longueur de 32 octets. Par exemple, la position pour les données dans le créneau de stockage 1 pour l'adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298` est :

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Dans une console Geth, cela peut être calculé comme suit :

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Le `path` est donc `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Cela peut maintenant être utilisé pour récupérer les données du trie de stockage comme auparavant :

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Remarque : Le `storageRoot` pour un compte Ethereum est vide par défaut s'il ne s'agit pas d'un compte de contrat.

### Trie des transactions {#transaction-trie}

Il y a un trie des transactions séparé pour chaque bloc, stockant à nouveau des paires `(key, value)`. Un chemin ici est : `rlp(transactionIndex)` qui représente la clé qui correspond à une valeur déterminée par :

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Plus d'informations à ce sujet peuvent être trouvées dans la documentation de l'[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie des reçus {#receipts-trie}

Chaque bloc a son propre trie des reçus. Un `path` ici est : `rlp(transactionIndex)`. `transactionIndex` est son indice dans le bloc dans lequel il a été inclus. Le trie des reçus n'est jamais mis à jour. De manière similaire au trie des transactions, il existe des reçus actuels et hérités. Pour interroger un reçu spécifique dans le trie des reçus, l'indice de la transaction dans son bloc, la charge utile du reçu et le type de transaction sont requis. Le reçu retourné peut être de type `Receipt` qui est défini comme la concaténation de `TransactionType` et `ReceiptPayload` ou il peut être de type `LegacyReceipt` qui est défini comme `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Plus d'informations à ce sujet peuvent être trouvées dans la documentation de l'[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Lectures complémentaires {#further-reading}

- [Modified Merkle Patricia Trie — How Ethereum saves a state](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Understanding the Ethereum trie](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)