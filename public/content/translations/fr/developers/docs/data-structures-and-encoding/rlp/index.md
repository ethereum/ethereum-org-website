---
title: "Sérialisation par préfixe de longueur récursif (RLP)"
description: "Une définition de l'encodage RLP dans la couche d'exécution d'Ethereum."
lang: fr
sidebarDepth: 2
---

La sérialisation par préfixe de longueur récursif (RLP) est largement utilisée dans les clients d'exécution d'Ethereum. Le RLP standardise le transfert de données entre les nœuds dans un format économe en espace. L'objectif du RLP est d'encoder des tableaux de données binaires imbriqués de manière arbitraire, et le RLP est la principale méthode d'encodage utilisée pour sérialiser des objets dans la couche d'exécution d'Ethereum. Le but principal du RLP est d'encoder la structure ; à l'exception des entiers positifs, le RLP délègue l'encodage de types de données spécifiques (par ex., les chaînes de caractères, les nombres à virgule flottante) à des protocoles d'ordre supérieur. Les entiers positifs doivent être représentés sous forme binaire grand-boutiste sans zéros non significatifs (rendant ainsi la valeur entière zéro équivalente au tableau d'octets vide). Les entiers positifs désérialisés avec des zéros non significatifs doivent être traités comme invalides par tout protocole d'ordre supérieur utilisant le RLP.

Plus d'informations dans [le livre jaune d'Ethereum (Annexe B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Pour utiliser le RLP afin d'encoder un dictionnaire, les deux formes canoniques suggérées sont :

- utiliser `[[k1,v1],[k2,v2]...]` avec les clés dans l'ordre lexicographique
- utiliser l'encodage de niveau supérieur de l'arbre Patricia (Patricia Tree) comme le fait [Ethereum](/)

## Définition {#definition}

La fonction d'encodage RLP prend en entrée un élément (item). Un élément est défini comme suit :

- une chaîne de caractères (c.-à-d. un tableau d'octets) est un élément
- une liste d'éléments est un élément
- un entier positif est un élément

Par exemple, tous les éléments suivants sont des éléments :

- une chaîne vide ;
- la chaîne contenant le mot « cat » ;
- une liste contenant n'importe quel nombre de chaînes ;
- et des structures de données plus complexes comme `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- le nombre `100`

Notez que dans le contexte du reste de cette page, « chaîne » (string) signifie « un certain nombre d'octets de données binaires » ; aucun encodage spécial n'est utilisé, et aucune connaissance sur le contenu des chaînes n'est implicite (sauf ce qui est requis par la règle contre les entiers positifs non minimaux).

L'encodage RLP est défini comme suit :

- Pour un entier positif, il est converti en le tableau d'octets le plus court dont l'interprétation grand-boutiste est l'entier, puis encodé comme une chaîne selon les règles ci-dessous.
- Pour un octet unique dont la valeur se situe dans la plage `[0x00, 0x7f]` (`[0, 127]` en décimal), cet octet est son propre encodage RLP.
- Sinon, si une chaîne a une longueur de 0 à 55 octets, l'encodage RLP consiste en un seul octet de valeur **0x80** (128 en déc.) plus la longueur de la chaîne, suivi de la chaîne. La plage du premier octet est donc `[0x80, 0xb7]` (`[128, 183]` en déc.).
- Si une chaîne fait plus de 55 octets de long, l'encodage RLP consiste en un seul octet de valeur **0xb7** (183 en déc.) plus la longueur en octets de la longueur de la chaîne sous forme binaire, suivi de la longueur de la chaîne, suivi de la chaîne. Par exemple, une chaîne de 1024 octets de long serait encodée comme `\xb9\x04\x00` (`185, 4, 0` en déc.) suivi de la chaîne. Ici, `0xb9` (183 + 2 = 185) est le premier octet, suivi des 2 octets `0x0400` (1024 en déc.) qui indiquent la longueur de la chaîne réelle. La plage du premier octet est donc `[0xb8, 0xbf]` (`[184, 191]` en déc.).
- Si une chaîne fait 2^64 octets de long, ou plus, elle ne peut pas être encodée.
- Si la charge utile totale d'une liste (c.-à-d. la longueur combinée de tous ses éléments encodés en RLP) fait de 0 à 55 octets de long, l'encodage RLP consiste en un seul octet de valeur **0xc0** plus la longueur de la charge utile, suivi de la concaténation des encodages RLP des éléments. La plage du premier octet est donc `[0xc0, 0xf7]` (`[192, 247]` en déc.).
- Si la charge utile totale d'une liste fait plus de 55 octets de long, l'encodage RLP consiste en un seul octet de valeur **0xf7** plus la longueur en octets de la longueur de la charge utile sous forme binaire, suivi de la longueur de la charge utile, suivi de la concaténation des encodages RLP des éléments. La plage du premier octet est donc `[0xf8, 0xff]` (`[248, 255]` en déc.).

De manière succincte :

| Plage       | Octet 1     | Octet 2     | ...        | Octet 9                | Octet 10    | Signification                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | chaîne d'un seul octet                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | chaîne courte (0-55 octets)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | chaîne longue, N+1 octets pour la longueur, puis charge utile |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | liste courte (0-55 octets)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | liste longue, N+1 octets pour la longueur, puis charge utile |

- `p` = charge utile
- `n` = longueur (nombre d'octets de la charge utile)
- `N` = décalage de la longueur de la longueur (N+1 octets `n` suivent)

Dans le code, cela donne :

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Exemples {#examples}

- la chaîne « dog » = [ 0x83, 'd', 'o', 'g' ]
- la liste [ « cat », « dog » ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- la chaîne vide ('null') = `[ 0x80 ]`
- la liste vide = `[ 0xc0 ]`
- l'entier 0 = `[ 0x80 ]`
- l'octet '\x00' = `[ 0x00 ]`
- l'octet '\x0f' = `[ 0x0f ]`
- les octets '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- la [représentation ensembliste](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) de trois, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- la chaîne « Lorem ipsum dolor sit amet, consectetur adipisicing elit » = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Décodage RLP {#rlp-decoding}

Selon les règles et le processus de l'encodage RLP, l'entrée du décodage RLP est considérée comme un tableau de données binaires. Le processus de décodage RLP est le suivant :

1.  en fonction du premier octet (c.-à-d. le préfixe) des données d'entrée et du décodage du type de données, déterminer la longueur des données réelles et le décalage ;

2.  en fonction du type et du décalage des données, décoder les données de manière correspondante, en respectant la règle d'encodage minimal pour les entiers positifs ;

3.  continuer à décoder le reste de l'entrée ;

Parmi celles-ci, les règles de décodage des types de données et du décalage sont les suivantes :

1.  les données sont une chaîne si la plage du premier octet (c.-à-d. le préfixe) est [0x00, 0x7f], et la chaîne est exactement le premier octet lui-même ;

2.  les données sont une chaîne si la plage du premier octet est [0x80, 0xb7], et la chaîne dont la longueur est égale au premier octet moins 0x80 suit le premier octet ;

3.  les données sont une chaîne si la plage du premier octet est [0xb8, 0xbf], et la longueur de la chaîne dont la longueur en octets est égale au premier octet moins 0xb7 suit le premier octet, et la chaîne suit la longueur de la chaîne ;

4.  les données sont une liste si la plage du premier octet est [0xc0, 0xf7], et la concaténation des encodages RLP de tous les éléments de la liste dont la charge utile totale est égale au premier octet moins 0xc0 suit le premier octet ;

5.  les données sont une liste si la plage du premier octet est [0xf8, 0xff], et la charge utile totale de la liste dont la longueur est égale au premier octet moins 0xf7 suit le premier octet, et la concaténation des encodages RLP de tous les éléments de la liste suit la charge utile totale de la liste ;

Dans le code, cela donne :

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Complément d'information {#further-reading}

- [Le RLP dans Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum sous le capot : le RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. Prépublication arXiv arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Sujets connexes {#related-topics}

- [Trie de Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)