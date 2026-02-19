---
title: Dagger-Hashimoto
description: "Un regard détaillé sur l'algorithme Dagger-Hashimoto."
lang: fr
---

Dagger-Hashimoto représentait l'implémentation et la spécification originales de recherche pour l'algorithme de minage d'Ethereum. Dagger-Hashimoto a été remplacé par [Ethash](#ethash). Le minage a été complètement arrêté lors de [La Fusion](/roadmap/merge/) le 15 septembre 2022. Depuis lors, Ethereum est sécurisé par un mécanisme de [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos). Cette page a un intérêt historique - l'information fournie n'est plus pertinente depuis La Fusion Ethereum.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de vous informer d'abord sur le [consensus de preuve de travail](/developers/docs/consensus-mechanisms/pow), le [minage](/developers/docs/consensus-mechanisms/pow/mining) et les [algorithmes de minage](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto vise à satisfaire deux objectifs :

1. **Résistance aux ASIC** : l'avantage de la création de matériel spécialisé pour l'algorithme doit être aussi minime que possible.
2. **Vérifiabilité par un client léger** : un bloc doit pouvoir être vérifié efficacement par un client léger.

Avec une modification supplémentaire, et si cela vous intéresse, nous vous spécifierons également comment réaliser un troisième objectif mais au prix d'une complexité supplémentaire :

**Stockage de la chaîne complète** : le minage doit nécessiter le stockage de l'état complet de la blockchain (en raison de la structure irrégulière du trie d'état d'Ethereum, nous prévoyons qu'un certain élagage sera possible, en particulier pour certains contrats souvent utilisés, mais nous voulons minimiser cela).

## Génération du DAG {#dag-generation}

Le code de l'algorithme sera défini ci-dessous en Python. Tout d'abord, nous donnons `encode_int` pour la sérialisation d'entiers non signés de précision spécifiée en chaînes de caractères. L'inverse est également donné :

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Nous supposons ensuite que `sha3` est une fonction qui prend un entier et renvoie un entier, et que `dbl_sha3` est une fonction double-sha3 ; si vous convertissez ce code de référence en une implémentation, utilisez :

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Paramètres {#parameters}

Les paramètres utilisés pour l'algorithme sont :

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536
                                        # with epochtime=20000 gives 882 MB growth per year
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light
                                        # client; not part of the algo spec)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated)
      "k": 1,                           # Number of parents of a node
      "w": w,                          # Used for modular exponentiation hashing
      "accesses": 200,                  # Number of dataset accesses during hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation
}
```

`P` dans ce cas est un nombre premier choisi de telle sorte que `log₂(P)` soit juste légèrement inférieur à 512, ce qui correspond aux 512 bits que nous avons utilisés pour représenter nos nombres. Notez que seule la dernière moitié du DAG doit être stockée, ainsi le besoin de mémoire commence de fait à 1 Go et augmente de 441 Mo par an.

### Construction du graphe Dagger {#dagger-graph-building}

La construction graphique Dagger primitive est définie comme suit :

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Essentiellement, il initialise un graphe comme un nœud unique, `sha3(seed)`, et à partir de là, commence à ajouter séquentiellement d'autres nœuds en se basant sur des nœuds précédents aléatoires. Lorsqu'un nouveau nœud est créé, une puissance modulaire de la graine est calculée pour sélectionner de manière aléatoire certains indices inférieurs à `i` (en utilisant `x % i` ci-dessus), et les valeurs des nœuds à ces indices sont utilisées dans un calcul pour générer une nouvelle valeur pour `x`, qui est ensuite transmise à une petite fonction de preuve de travail (basée sur XOR) pour finalement générer la valeur du graphe à l'indice `i`. La raison d'être de cette conception particulière est de forcer l'accès séquentiel du DAG ; la valeur suivante du DAG qui sera accessible ne peut pas être déterminée tant que la valeur courante n'est pas connue. Enfin, l’exponentiation modulaire permet de hacher le résultat.

Cet algorithme repose sur plusieurs résultats de la théorie des nombres. Consultez l'annexe ci-dessous à des fins de discussion.

## Évaluation par le client léger {#light-client-evaluation}

La construction du graphique ci-dessus vise à permettre à chaque nœud du graphique d'être reconstruit en calculant une sous-arborescence d'un petit nombre de nœuds et en ne nécessitant qu'une petite quantité de mémoire auxiliaire. Notez qu'avec k=1, la sous-arborescence n'est qu'une chaîne de valeurs allant jusqu'au premier élément du DAG.

Pour que le DAG fonctionne, la fonction de calcul du client allégé est la suivante :

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Il s'agit essentiellement d'une réécriture de l'algorithme ci-dessus qui supprime la boucle de calcul des valeurs pour l'ensemble du DAG et remplace la précédente recherche du nœud par un appel récursif ou une recherche de cache. Notez que pour `k=1`, le cache est inutile, bien qu'une optimisation supplémentaire précalcule les quelques milliers de premières valeurs du DAG et les conserve comme un cache statique pour les calculs ; voir l'annexe pour une implémentation de code de ceci.

## Double tampon de DAG {#double-buffer}

Dans un client complet, un [_double tampon_](https://wikipedia.org/wiki/Multiple_buffering) de 2 DAG produits par la formule ci-dessus est utilisé. L'idée est que les DAG sont produits tous les `epochtime` blocs, conformément aux paramètres ci-dessus. Au lieu d'utiliser le dernier DAG produit, le client utilise le précédent. L'avantage est qu'il permet aux DAG d'être remplacés au fil du temps sans avoir besoin d'incorporer une étape où les mineurs devraient soudainement recalculer toutes les données. Sinon, il existe un risque de ralentissement brutal et temporaire du traitement en chaîne à intervalles réguliers et d'augmentation spectaculaire de la centralisation. Ainsi, il existe un risque d'attaques de 51% au cours de ces quelques minutes avant que toutes les données ne soient recalculées.

L'algorithme utilisé pour générer l'ensemble des DAG utilisés pour calculer le travail d'un bloc est le suivant :

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # Aucun tampon arrière n'est possible, il suffit de créer un tampon avant
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

L'idée derrière le Hashimoto original est d'utiliser la blockchain comme jeu de données, effectuant un calcul qui sélectionne N indices de la blockchain, rassemble les transactions sur ces indices, exécute un XOR de ces données, et retourne le hachage du résultat. L'algorithme original de Thaddeus Dryja, traduit en Python pour la cohérence, est le suivant :

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Malheureusement, bien que Hashimoto soit considéré comme de la RAM en dur, il repose sur l'arithmétique 256-bit, qui présente des frais supplémentaires de calcul considérables. Cependant, Dagger-Hashimoto n'utilise que les 64 bits les moins significatifs lors de l'indexation de son jeu de données pour résoudre ce problème.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

L'utilisation du double SHA3 permet à un formulaire de zéro donnée, une pré-vérification quasi instantanée, vérifiant uniquement qu'une valeur intermédiaire correcte a été fournie. Cette couche extérieure de preuve de travail est très favorable aux ASIC et assez faible, mais existe pour rendre les attaques DDoS encore plus difficiles puisque cette petite quantité de travail doit être réalisée pour produire un bloc qui ne sera pas immédiatement rejeté. Voici la version client allégé :

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Minage et vérification {#mining-and-verifying}

Maintenant, mettons tout cela ensemble dans l'algorithme de minage :

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

Voici l'algorithme de vérification :

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Vérification conviviale du client allégé :

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Notez également que Dagger-Hashimoto impose des exigences supplémentaires à l'en-tête du bloc:

- Pour que la vérification de deux couches fonctionne, un en-tête de bloc doit avoir à la fois la valeur nonce et la valeur moyenne pré-sha3
- Quelque part, un en-tête de bloc doit stocker la sha3 de l'actuel ensemble de données

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Annexe {#appendix}

Comme mentionné ci-dessus, le RNG utilisé pour la génération de DAG repose sur des résultats tirés de la théorie des nombres. Premièrement, nous donnons l'assurance que le générateur de nombres aléatoires (RNG) de Lehmer, qui est à la base de la variable `picker`, a une longue période. Deuxièmement, nous montrons que `pow(x,3,P)` ne fera pas correspondre `x` à `1` ou `P-1`, à condition que `x ∈ [2,P-2]` au départ. Enfin, nous montrons que `pow(x,3,P)` a un faible taux de collision lorsqu'il est traité comme une fonction de hachage.

### Générateur de nombres aléatoires de Lehmer {#lehmer-random-number}

Bien que la fonction `produce_dag` n'ait pas besoin de produire des nombres aléatoires non biaisés, une menace potentielle est que `seed**i % P` ne prenne qu'une poignée de valeurs. Cela pourrait être un avantage pour les mineurs qui reconnaissent le modèle par rapport à ceux qui ne le font pas.

Pour éviter cela, un résultat de la théorie du nombre est exercé. Un [_nombre premier sûr_](https://en.wikipedia.org/wiki/Safe_prime) est défini comme un nombre premier `P` tel que `(P-1)/2` est aussi un nombre premier. L'_ordre_ d'un membre `x` du [groupe multiplicatif](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` est défini comme le `m` minimal tel que <pre>xᵐ mod P ≡ 1</pre>
Compte tenu de ces définitions, nous avons :

> Observation 1. Soit `x` un membre du groupe multiplicatif `ℤ/Pℤ` pour un nombre premier sûr `P`. Si `x mod P ≠ 1 mod P` et `x mod P ≠ P-1 mod P`, alors l'ordre de `x` est soit `P-1` soit `(P-1)/2`.

_Preuve_. Puisque `P` est un nombre premier sûr, alors d'après le [théorème de Lagrange][lagrange], nous avons que l'ordre de `x` est soit `1`, `2`, `(P-1)/2`, ou `P-1`.

L'ordre de `x` ne peut pas être `1`, car d'après le petit théorème de Fermat, nous avons :

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Par conséquent, `x` doit être une identité multiplicative de `ℤ/nℤ`, qui est unique. Puisque nous avons supposé que `x ≠ 1`, ceci n'est pas possible.

L'ordre de `x` ne peut pas être `2` à moins que `x = P-1`, car cela violerait le fait que `P` est un nombre premier.

D'après la proposition ci-dessus, nous pouvons reconnaître que l'itération de `(picker * init) % P` aura une longueur de cycle d'au moins `(P-1)/2`. C'est parce que nous avons sélectionné `P` pour être un nombre premier sûr approximativement égal à une puissance supérieure de deux, et `init` se trouve dans l'intervalle `[2,2**256+1]`. Étant donné la magnitude de `P`, nous ne devrions jamais nous attendre à un cycle provenant de l'exponentiation modulaire.

Lorsque nous attribuons la première cellule dans le DAG (la variable étiquetée `init`), nous calculons `pow(sha3(seed) + 2, 3, P)`. À première vue, cela ne garantit pas que le résultat n'est ni `1` ni `P-1`. Cependant, puisque `P-1` est un nombre premier sûr, nous avons l'assurance supplémentaire suivante, qui est un corollaire de l'Observation 1 :

> Observation 2. Soit `x` un membre du groupe multiplicatif `ℤ/Pℤ` pour un nombre premier sûr `P`, et soit `w` un nombre naturel. Si `x mod P ≠ 1 mod P` et `x mod P ≠ P-1 mod P`, ainsi que `w mod P ≠ P-1 mod P` et `w mod P ≠ 0 mod P`, alors `xʷ mod P ≠ 1 mod P` et `xʷ mod P ≠ P-1 mod P`

### Exponentiation modulaire en tant que fonction de hachage {#modular-exponentiation}

Pour certaines valeurs de `P` et `w`, la fonction `pow(x, w, P)` peut avoir de nombreuses collisions. Par exemple, `pow(x,9,19)` ne prend que les valeurs `{1,18}`.

Étant donné que `P` est un nombre premier, un `w` approprié pour une fonction de hachage par exponentiation modulaire peut être choisi en utilisant le résultat suivant :

> Observation 3. Soit `P` un nombre premier ; `w` et `P-1` sont premiers entre eux si et seulement si pour tous les `a` et `b` dans `ℤ/Pℤ` :<center>`aʷ mod P ≡ bʷ mod P` si et seulement si `a mod P ≡ b mod P`</center>

Ainsi, étant donné que `P` est un nombre premier et que `w` est premier avec `P-1`, nous avons `|{pow(x, w, P) : x ∈ ℤ}| = P`, ce qui implique que la fonction de hachage a le taux de collision le plus bas possible.

Dans le cas particulier où `P` est un nombre premier sûr comme nous l'avons sélectionné, `P-1` n'a alors que les facteurs 1, 2, `(P-1)/2` et `P-1`. Puisque `P` > 7, nous savons que 3 est premier avec `P-1`, donc `w=3` satisfait la proposition ci-dessus.

## Algorithme d'évaluation plus efficace basé sur le cache {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
