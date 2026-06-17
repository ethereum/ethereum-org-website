---
title: Dagger-Hashimoto
description: Un aperçu détaillé de l'algorithme Dagger-Hashimoto.
lang: fr
---

Dagger-Hashimoto était l'implémentation de recherche et la spécification d'origine pour l'algorithme de minage d'Ethereum. Dagger-Hashimoto a été remplacé par [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash). Le minage a été complètement désactivé lors de [La Fusion](/roadmap/merge/) le 15 septembre 2022. Depuis lors, Ethereum est sécurisé à l'aide d'un mécanisme de [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos) à la place. Cette page est à des fins d'intérêt historique - les informations ici ne sont plus pertinentes pour l'Ethereum post-Fusion.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de vous renseigner d'abord sur le [consensus par preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow), le [minage](/developers/docs/consensus-mechanisms/pow/mining) et les [algorithmes de minage](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto vise à satisfaire deux objectifs :

1.  **Résistance aux ASIC** : l'avantage de créer du matériel spécialisé pour l'algorithme doit être aussi faible que possible.
2.  **Vérifiabilité par client léger** : un bloc doit pouvoir être vérifié efficacement par un client léger.

Avec une modification supplémentaire, nous précisons également comment atteindre un troisième objectif si souhaité, mais au prix d'une complexité accrue :

**Stockage complet de la chaîne** : le minage devrait nécessiter le stockage de l'état complet de la chaîne de blocs (en raison de la structure irrégulière du trie d'état d'Ethereum, nous prévoyons qu'un certain élagage sera possible, en particulier pour certains contrats souvent utilisés, mais nous voulons minimiser cela).

## Génération du DAG {#dag-generation}

Le code de l'algorithme sera défini en Python ci-dessous. Tout d'abord, nous donnons `encode_int` pour la conversion d'entiers non signés d'une précision spécifiée en chaînes de caractères. Son inverse est également donné :

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

Nous supposons ensuite que `sha3` est une fonction qui prend un entier et renvoie un entier, et que `dbl_sha3` est une fonction double-sha3 ; si vous convertissez ce code de référence en une implémentation, utilisez :

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
SAFE_PRIME_512 = 2**512 - 38117     # Plus grand nombre premier sûr inférieur à 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Taille du jeu de données (4 gigaoctets) ; DOIT ÊTRE UN MULTIPLE DE 65536
      "n_inc": 65536,                   # Incrément de la valeur de n par période ; DOIT ÊTRE UN MULTIPLE DE 65536
                                        # avec epochtime=20000 donne une croissance de 882 Mo par an
      "cache_size": 2500,               # Taille du cache du client léger (peut être choisie par le client
                                        # léger ; ne fait pas partie de la spécification de l'algo)
      "diff": 2**14,                    # Difficulté (ajustée lors de l'évaluation du bloc)
      "epochtime": 100000,              # Longueur d'une époque en blocs (fréquence de mise à jour du jeu de données)
      "k": 1,                           # Nombre de parents d'un nœud
      "w": w,                          # Utilisé pour le hachage par exponentiation modulaire
      "accesses": 200,                  # Nombre d'accès au jeu de données pendant hashimoto
      "P": SAFE_PRIME_512               # Nombre premier sûr pour le hachage et la génération de nombres aléatoires
}
```

`P` dans ce cas est un nombre premier choisi de telle sorte que `log₂(P)` soit juste légèrement inférieur à 512, ce qui correspond aux 512 bits que nous avons utilisés pour représenter nos nombres. Notez que seule la seconde moitié du DAG a réellement besoin d'être stockée, de sorte que l'exigence de RAM de facto commence à 1 Go et augmente de 441 Mo par an.

### Construction du graphe Dagger {#dagger-graph-building}

La primitive de construction du graphe Dagger est définie comme suit :

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

Essentiellement, il démarre un graphe sous la forme d'un seul nœud, `sha3(seed)`, et à partir de là, commence à ajouter séquentiellement d'autres nœuds en fonction de nœuds précédents aléatoires. Lorsqu'un nouveau nœud est créé, une puissance modulaire de la graine est calculée pour sélectionner aléatoirement certains indices inférieurs à `i` (en utilisant `x % i` ci-dessus), et les valeurs des nœuds à ces indices sont utilisées dans un calcul pour générer une nouvelle valeur pour `x`, qui est ensuite introduite dans une petite fonction de preuve de travail (basée sur XOR) pour finalement générer la valeur du graphe à l'indice `i`. La logique derrière cette conception particulière est de forcer l'accès séquentiel au DAG ; la prochaine valeur du DAG qui sera accédée ne peut pas être déterminée tant que la valeur actuelle n'est pas connue. Enfin, l'exponentiation modulaire hache davantage le résultat.

Cet algorithme s'appuie sur plusieurs résultats de la théorie des nombres. Voir l'annexe ci-dessous pour une discussion.

## Évaluation par client léger {#light-client-evaluation}

La construction du graphe ci-dessus vise à permettre à chaque nœud du graphe d'être reconstruit en calculant un sous-arbre composé d'un petit nombre de nœuds seulement et ne nécessitant qu'une petite quantité de mémoire auxiliaire. Notez qu'avec k=1, le sous-arbre n'est qu'une chaîne de valeurs remontant jusqu'au premier élément du DAG.

La fonction de calcul du client léger pour le DAG fonctionne comme suit :

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

Essentiellement, il s'agit simplement d'une réécriture de l'algorithme ci-dessus qui supprime la boucle de calcul des valeurs pour l'ensemble du DAG et remplace la recherche de nœud précédente par un appel récursif ou une recherche dans le cache. Notez que pour `k=1`, le cache n'est pas nécessaire, bien qu'une optimisation supplémentaire précalcule en fait les quelques milliers de premières valeurs du DAG et les conserve comme cache statique pour les calculs ; voir l'annexe pour une implémentation de code de ceci.

## Double tampon de DAG {#double-buffer}

Dans un client complet, un [_double tampon_](https://wikipedia.org/wiki/Multiple_buffering) de 2 DAG produits par la formule ci-dessus est utilisé. L'idée est que les DAG sont produits tous les `epochtime` blocs selon les paramètres ci-dessus. Au lieu que le client utilise le dernier DAG produit, il utilise le précédent. L'avantage de ceci est que cela permet aux DAG d'être remplacés au fil du temps sans avoir besoin d'incorporer une étape où les mineurs doivent soudainement recalculer toutes les données. Sinon, il y a un risque de ralentissement temporaire brutal du traitement de la chaîne à intervalles réguliers et d'augmentation spectaculaire de la centralisation. Ainsi, des risques d'attaque des 51 % existent pendant ces quelques minutes avant que toutes les données ne soient recalculées.

L'algorithme utilisé pour générer l'ensemble de DAG utilisés pour calculer le travail d'un bloc est le suivant :

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
        # Aucun tampon arrière n'est possible, créer simplement un tampon avant
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

L'idée derrière le Hashimoto original est d'utiliser la chaîne de blocs comme un ensemble de données, en effectuant un calcul qui sélectionne N indices de la chaîne de blocs, rassemble les transactions à ces indices, effectue un XOR de ces données et renvoie le hash du résultat. L'algorithme original de Thaddeus Dryja, traduit en Python pour des raisons de cohérence, est le suivant :

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

Malheureusement, bien que Hashimoto soit considéré comme exigeant en RAM, il s'appuie sur une arithmétique 256 bits, ce qui entraîne une surcharge de calcul considérable. Cependant, Dagger-Hashimoto n'utilise que les 64 bits de poids faible lors de l'indexation de son ensemble de données pour résoudre ce problème.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

L'utilisation du double SHA3 permet une forme de pré-vérification quasi instantanée sans données, vérifiant uniquement qu'une valeur intermédiaire correcte a été fournie. Cette couche externe de preuve de travail est très favorable aux ASIC et assez faible, mais existe pour rendre les attaques DDoS encore plus difficiles, car cette petite quantité de travail doit être effectuée afin de produire un bloc qui ne sera pas rejeté immédiatement. Voici la version pour client léger :

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Minage et vérification {#mining-and-verifying}

Maintenant, rassemblons tout cela dans l'algorithme de minage :

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

Vérification adaptée aux clients légers :

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Notez également que Dagger-Hashimoto impose des exigences supplémentaires sur l'en-tête de bloc :

- Pour que la vérification à deux couches fonctionne, un en-tête de bloc doit comporter à la fois le nonce et la valeur intermédiaire pré-sha3
- Quelque part, un en-tête de bloc doit stocker le sha3 de l'ensemble de graines actuel

## Complément d'information {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Annexe {#appendix}

Comme indiqué ci-dessus, le RNG (générateur de nombres aléatoires) utilisé pour la génération du DAG s'appuie sur certains résultats de la théorie des nombres. Premièrement, nous garantissons que le RNG de Lehmer qui est à la base de la variable `picker` a une large période. Deuxièmement, nous montrons que `pow(x,3,P)` ne mappera pas `x` sur `1` ou `P-1` à condition que `x ∈ [2,P-2]` pour commencer. Enfin, nous montrons que `pow(x,3,P)` a un faible taux de collision lorsqu'il est traité comme une fonction de hachage.

### Générateur de nombres aléatoires de Lehmer {#lehmer-random-number}

Bien que la fonction `produce_dag` n'ait pas besoin de produire des nombres aléatoires non biaisés, une menace potentielle est que `seed**i % P` ne prenne qu'une poignée de valeurs. Cela pourrait donner un avantage aux mineurs reconnaissant le modèle par rapport à ceux qui ne le font pas.

Pour éviter cela, on fait appel à un résultat de la théorie des nombres. Un [_nombre premier sûr_](https://en.wikipedia.org/wiki/Safe_prime) est défini comme étant un nombre premier `P` tel que `(P-1)/2` est également premier. L'_ordre_ d'un membre `x` du [groupe multiplicatif](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` est défini comme étant le `m` minimal tel que <pre>xᵐ mod P ≡ 1</pre>
Compte tenu de ces définitions, nous avons :

> Observation 1. Soit `x` un membre du groupe multiplicatif `ℤ/Pℤ` pour un nombre premier sûr `P`. Si `x mod P ≠ 1 mod P` et `x mod P ≠ P-1 mod P`, alors l'ordre de `x` est soit `P-1` soit `(P-1)/2`.

_Preuve_. Puisque `P` est un nombre premier sûr, alors par le [théorème de Lagrange][lagrange] nous avons que l'ordre de `x` est soit `1`, `2`, `(P-1)/2`, ou `P-1`.

L'ordre de `x` ne peut pas être `1`, car par le petit théorème de Fermat nous avons :

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Par conséquent, `x` doit être une identité multiplicative de `ℤ/nℤ`, qui est unique. Puisque nous avons supposé que `x ≠ 1` par hypothèse, ce n'est pas possible.

L'ordre de `x` ne peut pas être `2` à moins que `x = P-1`, car cela violerait le fait que `P` est premier.

À partir de la proposition ci-dessus, nous pouvons reconnaître que l'itération de `(picker * init) % P` aura une longueur de cycle d'au moins `(P-1)/2`. C'est parce que nous avons sélectionné `P` pour être un nombre premier sûr approximativement égal à une puissance supérieure de deux, et `init` est dans l'intervalle `[2,2**256+1]`. Étant donné la magnitude de `P`, nous ne devrions jamais nous attendre à un cycle de l'exponentiation modulaire.

Lorsque nous assignons la première cellule dans le DAG (la variable étiquetée `init`), nous calculons `pow(sha3(seed) + 2, 3, P)`. À première vue, cela ne garantit pas que le résultat n'est ni `1` ni `P-1`. Cependant, puisque `P-1` est un nombre premier sûr, nous avons l'assurance supplémentaire suivante, qui est un corollaire de l'Observation 1 :

> Observation 2. Soit `x` un membre du groupe multiplicatif `ℤ/Pℤ` pour un nombre premier sûr `P`, et soit `w` un entier naturel. Si `x mod P ≠ 1 mod P` et `x mod P ≠ P-1 mod P`, ainsi que `w mod P ≠ P-1 mod P` et `w mod P ≠ 0 mod P`, alors `xʷ mod P ≠ 1 mod P` et `xʷ mod P ≠ P-1 mod P`

### L'exponentiation modulaire comme fonction de hachage {#modular-exponentiation}

Pour certaines valeurs de `P` et `w`, la fonction `pow(x, w, P)` peut avoir de nombreuses collisions. Par exemple, `pow(x,9,19)` ne prend que les valeurs `{1,18}`.

Étant donné que `P` est premier, alors un `w` approprié pour une fonction de hachage par exponentiation modulaire peut être choisi en utilisant le résultat suivant :

> Observation 3. Soit `P` un nombre premier ; `w` et `P-1` sont premiers entre eux si et seulement si pour tout `a` et `b` dans `ℤ/Pℤ` :<center>`aʷ mod P ≡ bʷ mod P` si et seulement si `a mod P ≡ b mod P`</center>

Ainsi, étant donné que `P` est premier et que `w` est premier avec `P-1`, nous avons que `|{pow(x, w, P) : x ∈ ℤ}| = P`, ce qui implique que la fonction de hachage a le taux de collision minimal possible.

Dans le cas particulier où `P` est un nombre premier sûr comme nous l'avons sélectionné, alors `P-1` n'a que les facteurs 1, 2, `(P-1)/2` et `P-1`. Puisque `P` > 7, nous savons que 3 est premier avec `P-1`, par conséquent `w=3` satisfait la proposition ci-dessus.

## Algorithme d'évaluation basé sur le cache plus efficace {#cache-based-evaluation}

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