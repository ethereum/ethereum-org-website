---
title: Arbre de Merkle Patricia
description: Introduction à l'Arbre de Merkle Patricia
lang: fr
sidebarDepth: 2
---

L'état d'Ethereum (l'ensemble des comptes, des soldes et des contrats intelligents) est codé dans une version spéciale de la structure de données couramment connue en informatique sous le nom d'arbre de Merkle. Cette structure est utile pour de nombreuses applications en cryptographie, car elle crée une relation vérifiable entre toutes les pièces de données individuelles entrelacées dans l'arbre, aboutissant à une seule valeur **racine** qui peut être utilisée pour prouver des éléments relatifs aux données.

La structure de données d'Ethereum est un arbre de Patricia Merkle modifié, nommé ainsi parce qu'il emprunte certaines caractéristiques de PATRICIA (ou Practical Algorithm To Retrieve Information Coded in Alphanumeric), et parce qu'il est conçu pour récupérer efficacement les données (re**trie**val) des éléments qui composent l'état Ethereum.

Un arbre de Patricia Merkle est déterministe et cryptographiquement vérifiable : la seule façon de générer une racine d'état est de la calculer à partir de chaque morceau individuel de l'état, et deux états qui sont identiques peuvent être facilement prouvés en comparant le hash de racine et les hashes qui y ont conduit (_a Merkle proof_). Inversement, il n'est pas possible de créer deux états différents avec le même hachage de racine, et toute tentative de modifier l'état avec différentes valeurs donnera lieu à un hachage de racine d'état différent. Théoriquement, cette structure fournit le sacré Graal de l'efficacité `O(log(n))` pour les inserts, les recherches et les suppressions.

Dans un avenir proche, Ethereum prévoit de migrer vers une structure en [arbre de Verkle](https://ethereum.org/en/roadmap/verkle-trees), ce qui ouvrira de nombreuses possibilités d'amélioration du protocole.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, il serait utile d'avoir des connaissances de base sur les [hachages](https://en.wikipedia.org/wiki/Hash_function), les [arbres de Merkle](https://en.wikipedia.org/wiki/Merkle_tree), les [arbres](https://en.wikipedia.org/wiki/Trie) et la [sérialisation](https://en.wikipedia.org/wiki/Serialization). Cet article commence par une description d'un [arbre radix](https://en.wikipedia.org/wiki/Radix_tree) de base, puis introduit progressivement les modifications nécessaires pour la construction d'une structure de données plus optimisée d'Ethereum.

## Arbres radix de base {#basic-radix-tries}

Dans un arbre radix de base, chaque nœud se présente comme suit :

```
    [i_0, i_1 ... i_n, value]
```

Là où `i0 ... in` représentent les symboles de l'alphabet (souvent binaires ou hexagonaux), `value` est la valeur terminale du nœud, et les valeurs dans les créneaux `i0 ... in` sont soit `NULL` soit des pointeurs vers (dans notre cas, des hashs) d'autres nœuds. Cela forme un registre de base `(key, value)`.

Supposons que vous souhaitiez utiliser une structure de données d'arborescence radix pour maintenir une commande sur un ensemble de paires de valeurs clés. Pour connaître la valeur actuellement associée à `dog` dans le tableau, vous devriez d'abord convertir `dog` en lettres de l'alphabet (ce qui donne `64 6f 67`), puis descendre dans l'arbre en suivant ce chemin jusqu'à ce que vous trouviez la valeur. C'est-à-dire que vous commencez par chercher le hachage racine dans une base de données/valeur plate pour trouver le nœud racine de l'arbre. Il se présente sous la forme d'un tableau de clés pointant vers d'autres nœuds. Vous utilisez ensuite la valeur à l'index `6` comme clé et la recherchez dans la base de données clé/valeur pour obtenir le nœud un niveau plus bas. Ensuite, choisissez l'index `4` pour rechercher la valeur suivante, puis choisissez l'index `6`, et ainsi de suite, jusqu'à ce que, une fois suivi le chemin : `racine -> -> -> 6 - > 6 -> 15 -> 6 -> 7`, vous cherchiez la valeur du nœud et retourniez le résultat.

Il y a une différence entre rechercher quelque chose dans l'"arbre" et la "base de données" plate sous-jacente (clé/valeur). Ils définissent tous deux des combinaisons clé/valeur, mais la base de données sous-jacente peut rechercher une clé en une seule étape basique. La recherche d'une clé dans le tableau nécessite plusieurs consultations de la base de données sous-jacente pour obtenir la valeur finale décrite ci-dessus. Faisons référence à ce dernier comme à un `path` (chemin) pour éliminer toute ambiguïté.

Les opérations de mise à jour et de suppression pour les arbres radix peuvent être définies comme suit :

```
    def update(node,path,value):
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        if path == '':
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]],path[1:],value)
            newnode[path[0]] = newindex
        db.put(hash(newnode),newnode)
        return hash(newnode)

    def delete(node,path):
        if node is NULL:
            return NULL
        else:
            curnode = db.get(node)
            newnode = curnode.copy()
            if path == '':
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]],path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

Un arbre Radix « Merkle» est construit en reliant les nœuds à l'aide des diagrammes de hachage cryptographiques générés de manière déterministe. Cette adresse de contenu (dans la base de données clé/valeur `key == keccak256(rlp(value))`) fournit une garantie d'intégrité cryptographique des données stockées. Si le hash racine d'un arbre donné est connu publiquement, alors tout le monde ayant accès à cette feuille peut fournir une preuve que l'arbre inclut une valeur donnée à un endroit spécifique, en fournissant les hachages de chaque nœud reliant une valeur spécifique à la racine de l'arborescence.

Il est impossible pour un attaquant de fournir une preuve d'une paire de `(path, value)` qui n'existe pas car le hachage racine est basé en fin de compte sur tous les hachages situés au-dessous. Toute modification sous-jacente modifierait le hash racine. Vous pouvez considérer le hash comme une représentation compressée des informations structurelles sur les données, sécurisée par la protection de pré-image de la fonction de hachage.

Nous allons faire référence à une unité atomique d'un arbre radix (par exemple un seul caractère hexadécimal, ou un nombre binaire de 4 bits) en tant que "nibble". Lorsque l'on parcourt un chemin un nibble à la fois, comme décrit ci-dessus, les nœuds peuvent faire référence à 16 enfants au maximum, mais peuvent également inclure un élément `value`. Nous les représentons donc comme un tableau de longueur 17. Nous appelons ces tableaux à 17 éléments des "nœuds de branches".

## Arbre de Merkle de Patricia {#merkle-patricia-trees}

Cependant, les arbres radix ont une limitation majeure : ils sont inefficaces. Si vous voulez stocker une seule liaison `(path, value)` où le chemin est, comme dans Ethereum, long de 64 caractères (nombre de nibbles dans `bytes32`), vous aurez besoin de plus d'un kilooctet d'espace supplémentaire pour stocker un niveau par caractère, et chaque consultation ou suppression prendra les 64 étapes complètes. L'arbre de Patricia présenté dans ce qui suit résout ce problème.

### Optimisation {#optimization}

Un nœud dans un arbre de Merkle Patricia correspond à l'un des éléments suivants :

1.  `NULL` (représenté comme une chaîne vide)
2.  `branch` Un nœud de 17 éléments `[ v0 ... v15, vt ]`
3.  `leaf` Un nœud de 2 éléments `[ encodedPath, value ]`
4.  `extension` Un nœud de 2 éléments `[ encodedPath, key ]`

Avec 64 chemins de caractères, il est inévitable qu'après avoir traversé les premières couches de l'arbre, vous atteigniez un nœud où aucun chemin divergent n'existe sur au moins une partie de la descente. Pour éviter de devoir créer jusqu'à 15 nœuds `NULL` épars le long du chemin, nous raccourcissons la descente en créant un nœud `extension` de la forme `[ encodedPath, key ]`, où `encodedPath` contient le "chemin partiel" à sauter (à l'aide d'un codage compact décrit ci-dessous), et où la `key` est destinée à la consultation suivante de la base de données.

Pour un nœud `feuille`, qui peut être marqué par un drapeau dans la première pièce du `encodedPath`, le chemin encode tous les fragments de chemin du nœud précédent et nous pouvons consulter la `valeur` directement.

Cette optimisation introduit toutefois une ambiguïté.

Lors de la traversée de chemins en nibbles, nous pourrions nous retrouver avec un nombre impair de nibbles à traverser, mais comme toutes les données sont stockées au format `bytes`, il est possible que le nombre de nibbles à parcourir soit impair. Il n'est pas possible de différencier entre, par exemple, le nibble `1`, et les nibbles `01` (les deux doivent être stockés sous la forme `<01>`). Pour spécifier une longueur impaire, le chemin partiel est précédé d'un drapeau.

### Spécification : Codage compact d'une séquence hexagonale avec terminateur optionnel {#specification}

Le marquage de la _longueur du chemin partiel restante impaire ou paire_ et de la _feuille ou nœud d'extension_, tel que décrit ci-dessus, se trouve dans le premier élément du chemin partiel de tout nœud à deux éléments. Cela se traduit comme suit :

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

Pour une longueur de chemin restante paire (`0` ou `2`), un autre nibble de "remplissage" de `0` suivra toujours.

```
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term: hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        // hexarray now has an even length whose first nibble is the flags.
        o = ''
        for i in range(0,len(hexarray),2):
            o += chr(16 * hexarray[i] + hexarray[i+1])
        return o
```

Exemples :

```
    > [ 1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [ 0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [ 0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [ f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Voici le code étendu pour obtenir un nœud dans l'arbre de Merkle Patricia :

```
    def get_helper(node,path):
        if path == []: return node
        if node = '': return ''
        curnode = rlp.decode(node if len(node) < 32 else db.get(node))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[:len(k2)]:
                return get(v2, path[len(k2):])
            else:
                return ''
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]],path[1:])

    def get(node,path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node,path2)
```

### Exemple d'arbre {#example-trie}

Supposons que nous voulions un tableau contenant quatre paires chemin/valeur `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Tout d'abord, nous convertissons les chemins et les valeurs en `bytes` (octets). Ci-dessous, les représentations réelles d'octets pour les _chemins_ sont désignées par `<>`, bien que les _valeurs_ soient toujours représentées sous forme de chaînes, désignées par `''`, pour une compréhension plus facile (elles aussi seraient en fait des `octets`) :

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Nous construisons un tel arbre avec les paires clé/valeur suivantes dans la base de données sous-jacente :

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Lorsqu'un nœud est référencé à l'intérieur d'un autre nœud, ce qui est inclus est `H(rlp.encode(node))`, où `H(x) = keccak256(x) if len(x) >= 32 else x` et `rlp.encode` est la fonction d'encodage [RLP](/developers/docs/data-structures-and-encoding/rlp).

Notez que lors de la mise à jour d'un arbre, on doit stocker la paire clé/valeur `(keccak256(x), x)`dans une table de consultation persistante _si_ le nœud nouvellement créé a une longueur >= 32. Toutefois, si le nœud est plus court que cela, il n'est pas nécessaire de stocker quoi que ce soit, puisque la fonction f(x) = x est réversible.

## Les arbres sur Ethereum {#tries-in-ethereum}

Tous les arbres Merkle dans la couche d'exécution d'Ethereum font appel à un arbre de Merkle Patricia.

L'en-tête d'un bloc comporte trois racines issues de trois de ces arbres.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Arbre d'état {#state-trie}

Il n'existe qu'un seul arbre d'état global, qui est mis à jour à chaque fois qu'un client traite un bloc. Dans celui-ci, un `path` est toujours : `keccak256(ethereumAddress)` et une `value` est toujours : `rlp(ethereumAccount)`. Plus précisément, un `account` ethereum est un tableau de 4 éléments de `[nonce,balance,storageRoot,codeHash]`. À ce stade, il convient de noter que ce `storageRoot` est la racine d'un autre arbre Patricia :

### Arbre de stockage {#storage-trie}

C'est dans l'arbre de stockage que se situent _toutes_ les données du contrat. Chaque compte dispose d'un arbre de stockage distinct. Pour récupérer des valeurs à des positions de stockage spécifiques et à une adresse donnée, l'adresse de stockage, la position entière des données stockées dans le stockage et l'ID du bloc sont nécessaires. Ceux-ci peuvent ensuite être transmis comme arguments à la fonction `eth_getStorageAt` définie dans l'API JSON-RPC, par exemple pour récupérer les données dans le créneau de stockage 0 pour l'adresse `0x295a70b2de5e3953354a6a8344e616ed314d7251` :

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

La récupération d'autres éléments dans le stockage est un peu plus complexe, car il faut d'abord calculer la position dans l'arbre de stockage. La position est calculée comme le hachage `keccak256` de l'adresse et de la position de stockage, toutes deux complétées à gauche par des zéros jusqu'à une longueur de 32 octets. Par exemple, la position des données dans l'emplacement de stockage 1 pour l'adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298` est :

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Dans une console Geth, cela peut être calculé comme suit:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Le `path` est donc `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. On peut maintenant l'utiliser pour récupérer les données de l'arbre de stockage comme précédemment :

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Note : le `storageRoot` pour un compte Ethereum est vide par défaut s'il ne s'agit pas d'un compte de contrat.

### Arbre de transactions {#transaction-trie}

Il existe un arbre de transactions distinct pour chaque bloc, qui stocke à nouveau les paires `(key, value)` . Un chemin ici est : `rlp(transactionIndex)` qui représente la clé qui correspond à une valeur déterminée par :

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Plus d'informations à ce sujet peuvent être trouvées dans la documentation [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Arbre de reçus {#receipts-trie}

Chaque bloc a son propre arbre de reçus. Un `path` ici est : `rlp(transactionIndex)`. `transactionIndex` est son indice dans le bloc dans lequel il est inclus. Les arbres de reçus ne sont jamais mis à jour. De la même manière que pour les arbres de transactions, il existe des reçus actuels et des reçus hérités. Pour interroger un reçu spécifique dans la liste des reçus, l'indice de la transaction dans son bloc, les charges du reçu et le type de transaction sont nécessaires. Le reçu retourné peut être de type `Reçu` qui est défini comme la concaténation de `TransactionType` et `ReceiptPayload` ou il peut être de type `LegacyReceipt` qui est défini comme `rlp([statut, cumulativeGasUsed, logsBloom, logs])`.

Plus d'informations à ce sujet peuvent être trouvées dans la documentation [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Complément d'information {#further-reading}

- [Modification de l'arbre de Merkle Patricia — Comment Ethereum sauvegarde un état](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Le Merkling sur Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Comprendre l'arbre Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
