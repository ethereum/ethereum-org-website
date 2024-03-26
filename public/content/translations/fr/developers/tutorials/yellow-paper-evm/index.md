---
title: Comprendre le livre Jaune des spécifications d'EVM
description: Comprendre la partie du Livre Jaune, les spécifications formelles pour Ethereum, qui explique la machine virtuelle Ethereum (EVM).
author: "qbzzt"
tags:
  - "evm"
skill: intermediate
lang: fr
published: 2022-05-15
---

[Le Livre Jaune](https://ethereum.github.io/yellowpaper/paper.pdf) est la spécification formelle d'Ethereum. Sauf là où il a été modifié par [le processus d'EIP](/eips/), il contient la description exacte du fonctionnement de tout. Il est rédigé sous forme de document mathématique, qui inclut une terminologie que les programmeurs pourraient ne pas connaître. Dans ce document, vous apprendrez comment le lire, et par extension, d'autres documents mathématiques liés.

## Quel Livre Jaune ? {#which-yellow-paper}

Comme presque tout le reste dans Ethereum, le Livre Jaune évolue avec le temps. Afin de pouvoir se référer à une version spécifique, j'ai [téléchargé la version actuelle au moment de la rédaction](yellow-paper-berlin.pdf). Les numéros de section, de page et d'équation que j'utilise se référeront à cette version. Il est recommandé de l'avoir ouvert dans une autre fenêtre pendant la lecture de ce document.

### Pourquoi l'EVM ? {#why-the-evm}

Le livre jaune original a été rédigé dès le début du développement d'Ethereum. Il décrit le mécanisme de consensus original basé sur la preuve de travail qui était initialement utilisé pour sécuriser le réseau. Cependant, Ethereum a abandonné la preuve de travail et a commencé à utiliser un consensus basé sur la preuve d'enjeu en septembre 2022. Ce tutoriel se concentrera sur les parties du livre jaune définissant la Machine Virtuelle Ethereum. L'EVM n'a pas été modifié par la transition vers la preuve d'enjeu (à l'exception de la valeur de réponse de l'opcode DIFFICULTY).

## 9 Modèle d'exécution {#9-execution-model}

Cette section (p. 12-14) comprend la majeure partie de la définition de l'EVM.

Le terme _état du système_ comprend tout ce que vous devez savoir sur le système pour le faire fonctionner. Dans un ordinateur classique, cela signifie la mémoire, le contenu des registres, etc.

Une [machine de Turing](https://en.wikipedia.org/wiki/Turing_machine) est un modèle de calcul. En substance, c'est une version simplifiée d'un ordinateur, qui s’est avéré avoir la même capacité d'exécuter des calculs qu'un ordinateur normal (tout ce qu'un ordinateur peut calculer, une machine de Turing peut le calculer et vice versa). Ce modèle facilite la preuve de divers théorèmes sur ce qui est et n'est pas calculable.

Le terme [Turing-complet](https://en.wikipedia.org/wiki/Turing_completeness) désigne un ordinateur qui peut exécuter les mêmes calculs qu'une machine de Turing. Les machines de Turing peuvent entrer dans des boucles infinies, et l'EVM ne le peut pas car elle manquerait de gaz, elle est donc seulement quasi-Turing-complète.

## 9.1 Les bases {#91-basics}

Cette section présente les bases de l'EVM et comment il se compare à d'autres modèles computationnels.

Une [machine pile](https://en.wikipedia.org/wiki/Stack_machine) est un ordinateur qui stocke les données intermédiaires non pas dans des registres, mais dans une [**pile**](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). C'est l'architecture privilégiée pour les machines virtuelles car elle est facile à mettre en œuvre, ce qui signifie que les bugs et les vulnérabilités de sécurité sont beaucoup moins probables. La mémoire dans la pile est divisée en mots de 256 bits. Ce choix a été fait car il est pratique pour les opérations cryptographiques centrales d'Ethereum telles que le hachage Keccak-256 et les calculs de courbes elliptiques. La taille maximale de la pile est de 1024 octets. Lorsque les opcodes sont exécutés, ils prennent généralement leurs paramètres depuis la pile. Il existe des opcodes spécifiquement pour réorganiser les éléments dans la pile, tels que `POP` (retire l'élément du haut de la pile), `DUP_N` (duplique le N-ième élément dans la pile), etc.

L'EVM possède également un espace volatile appelé **mémoire**, qui est utilisé pour stocker des données pendant l'exécution. Cette mémoire est organisée en mots de 32 octets. Tous les emplacements mémoire sont initialisés à zéro. Si vous exécutez ce code [Yul](https://docs.soliditylang.org/en/latest/yul.html) pour ajouter un mot à la mémoire, il remplira 32 octets de mémoire en remplissant l'espace vide du mot avec des zéros, c'est-à-dire qu'il crée un mot - avec des zéros aux emplacements 0-29, 0x60 à 30, et 0xA7 à 31.

```yul
mstore(0, 0x60A7)
```

`mstore` est l'un des trois opcodes que l'EVM fournit pour interagir avec la mémoire - il charge un mot en mémoire. Les deux autres sont `mstore8`, qui charge un seul octet en mémoire, et `mload`, qui déplace un mot de la mémoire à la pile.

L'EVM a également un modèle de **stockage** non volatile séparé qui est maintenu dans le système - cette mémoire est organisée en tableaux de mots (par opposition aux tableaux d'octets adressables par mots dans la pile). Ce stockage est l'endroit où les contrats conservent des données persistantes - un contrat ne peut interagir qu'avec son propre stockage. Le stockage est organisé en mappages clé-valeur.

Bien qu'il ne soit pas mentionné dans cette section du Livre Jaune, il est également utile de savoir qu'il existe un quatrième type de mémoire. **Calldata** est une mémoire en lecture seule adressable par octets utilisée pour stocker la valeur passée avec le paramètre de `données` d'une transaction. L'EVM dispose d'opcodes spécifiques pour gérer `calldata`. `calldatasize` renvoie la taille des données. `calldataload` charge les données dans la pile. `calldatacopy` copie les données en mémoire.

L'architecture standard [Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) stocke le code et les données dans la même mémoire. L'EVM ne suit pas cette norme pour des raisons de sécurité - le partage de mémoire volatile rend possible la modification du code programme. Au lieu de cela, le code est sauvegardé dans le stockage.

Il n'y a que deux cas où le code est exécuté à partir de la mémoire :

- Lorsqu'un contrat crée un autre contrat (en utilisant [`CREATE`](https://www.evm.codes/#f0) ou [`CREATE2`](https://www.evm.codes/#f5)), le code pour le constructeur de contrat provient de la mémoire.
- Lors de la création d'un contrat, le code du constructeur s'exécute puis renvoie avec le code du contrat réel, également à partir de la mémoire.

Le terme exécution exceptionnelle signifie une exception qui provoque l'arrêt de l'exécution du contrat en cours.

## 9.2 Aperçu des frais {#92-fees-overview}

Cette section explique comment les frais de gaz sont calculés. Il y a trois coûts :

### Coût des opcodes {#opcode-cost}

Le coût inhérent à l'opcode spécifique. Pour obtenir cette valeur, trouvez le coût de l'opcode dans l'Annexe H (p. 28, sous l'équation (327)), et trouvez le coût dans l'équation (324). Cela vous donne une fonction de coût, qui dans la plupart des cas utilise des paramètres de l'Annexe G (p. 27).

Par exemple, l'opcode [`CALLDATACOPY`](https://www.evm.codes/#37) fait partie du groupe _W<sub>copy</sub>_. Le coût de l'opcode pour ce groupe est _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. En regardant l'Annexe G, nous voyons que les deux constantes sont 3, ce qui nous donne _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Nous devons encore décrypter l'expression _⌈μ<sub>s</sub>[2]÷32⌉_. La partie la plus externe, _⌈ \<value\> ⌉_, est la fonction plafond, une fonction qui, étant donnée une valeur, retourne le plus petit entier qui n'est pas inférieur à cette valeur. Par exemple, _⌈2.5⌉ = ⌈3⌉ = 3_. La partie interne est _μ<sub>s</sub>[2]÷32_. En consultant la section 3 (Conventions) à la p. 3, _μ_ représente l'état de la machine. L'état de la machine est défini dans la section 9.4.1 à la p. 13. Selon cette section, l'un des paramètres de l'état de la machine est _s_ pour la pile. En regroupant tout cela, il semble que _μ<sub>s</sub>[2]_ soit l'emplacement n°2 dans la pile. En examinant [l'opcode](https://www.evm.codes/#37), l'emplacement n°2 dans la pile est la taille des données en octets. En regardant les autres opcodes du groupe W<sub>copy</sub>, comme [`CODECOPY`](https://www.evm.codes/#39) et [`RETURNDATACOPY`](https://www.evm.codes/#3e), ils ont également une taille de données au même endroit. Ainsi, _⌈μ<sub>s</sub>[2]÷32⌉_ représente le nombre de mots de 32 octets nécessaires pour stocker les données copiées. En résumé, le coût inhérent de [`CALLDATACOPY`](https://www.evm.codes/#37) est de 3 gas plus 3 par mot de données copiées.

### Coût d'exécution {#running-cost}

Il s'agit du coût d'exécution du code que nous appelons.

- Dans le cas de [`CREATE`](https://www.evm.codes/#f0) et [`CREATE2`](https://www.evm.codes/#f5), il s'agit du constructeur du nouveau contrat.
- Dans le cas de [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), ou [`DELEGATECALL`](https://www.evm.codes/#f4), il s'agit du contrat que nous appelons.

### Coût d'expansion de la mémoire {#expanding-memory-cost}

Il s'agit du coût de l'expansion de la mémoire (si nécessaire).

Dans l'équation 324, cette valeur est notée _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. En consultant à nouveau la section 9.4.1, nous voyons que _μ<sub>i</sub>_ représente le nombre de mots en mémoire. Ainsi, _μ<sub>i</sub>_ est le nombre de mots en mémoire avant le opcode et _μ<sub>i</sub>'_ est le nombre de mots en mémoire après l'opcode.

La fonction _C<sub>mem</sub>_ est définie dans l'équation 326 : _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ est la fonction plancher, une fonction qui, étant donné une valeur, retourne le plus grand entier qui n'est toujours pas supérieur à cette valeur. Par exemple, _⌊2.5⌋ = ⌊2⌋ = 2_. Lorsque _a < √512_, _a<sup>2</sup> < 512_, et le résultat de la fonction plancher est zéro. Ainsi, pour les 22 premiers mots (704 octets), le coût augmente linéairement avec le nombre de mots mémoire requis. Au-delà de ce point, _⌊a<sup>2</sup> ÷ 512⌋_ est positif. Lorsque la mémoire requise est suffisamment élevée, le coût en gas est proportionnel au carré de la quantité de mémoire.

**Note** : ces facteurs n'influencent que le coût en gas _inhérent_ - cela ne prend pas en compte le marché des frais ou les pourboires aux validateurs qui déterminent combien un utilisateur final doit payer - il s'agit simplement du coût brut d'exécution d'une opération particulière sur l'EVM.

[Plus d'information sur le gaz](/developers/docs/gas/).

## 9.3 Environnement d'exécution {#93-execution-env}

L'environnement d'exécution est un tuple, _I_, qui inclut des informations qui ne font pas partie de l'état de la blockchain ou de l'EVM.

| Paramètre       | Opcode pour accéder aux données                                                                                          | Code Solidity pour accéder aux données   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                   | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                    | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                  | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                                        | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                    | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                 | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                  | `address(this).code`                     |
| _I<sub>H</sub>_ | Champs de l'en-tête de bloc, tels que [`NUMBER`](https://www.evm.codes/#43) et [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Profondeur de la pile d'appels pour les appels entre contrats (y compris la création de contrat)                         |                                          |
| _I<sub>w</sub>_ | L'EVM est-il autorisé à modifier l'état ou s'exécute-t-il de manière statique                                            |                                          |

Quelques autres paramètres sont nécessaires pour comprendre le reste de la section 9 :

| Paramètre | Défini dans la section | Signification                                                                                                                                                                                                                                                |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (p. 2, équation 1)   | L'état de la blockchain                                                                                                                                                                                                                                      |
| _g_       | 9.3 (p. 13)            | Gaz restant                                                                                                                                                                                                                                                  |
| _A_       | 6.1 (p. 8)             | Sous-état accumulé (modifications prévues pour la fin de la transaction)                                                                                                                                                                                     |
| _o_       | 9.3 (p. 13)            | Sortie - le résultat retourné dans le cas d'une transaction interne (quand un contrat en appelle un autre) et des appels à des fonctions d'affichage (quand on demande simplement des informations, il n'est donc pas nécessaire d'attendre une transaction) |

## 9.4 Aperçu de l'exécution {#94-execution-overview}

Maintenant que nous avons tous les préliminaires, nous pouvons enfin commencer à travailler sur le fonctionnement de l'EVM.

Les équations 137-142 nous donnent les conditions initiales pour faire fonctionner l'EVM :

| Symbole          | Valeur initiale | Signification                                                                                                                                                                                                                                                                        |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _μ<sub>g</sub>_  | _g_             | Gaz restant                                                                                                                                                                                                                                                                          |
| _μ<sub>pc</sub>_ | _0_             | Compteur de programme, l'adresse de la prochaine instruction à exécuter                                                                                                                                                                                                              |
| _μ<sub>m</sub>_  | _(0, 0, ...)_   | Mémoire, initialisée à zéro                                                                                                                                                                                                                                                          |
| _μ<sub>i</sub>_  | _0_             | Emplacement mémoire le plus élevé utilisé                                                                                                                                                                                                                                            |
| _μ<sub>s</sub>_  | _()_            | La pile, initialement vide                                                                                                                                                                                                                                                           |
| _μ<sub>o</sub>_  | _∅_             | La sortie, un ensemble vide jusqu'à ce que nous nous arrêtions soit avec des données de retour ([`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)) soit sans elle ([`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

L'équation 143 nous indique qu'il existe quatre conditions possibles à chaque instant lors de l'exécution, et ce qu'il faut faire avec elles :

1.  `Z(σ,μ,A,I)`. Z représente une fonction qui teste si une opération crée une transition d'état invalide (voir [l'arrêt exceptionnel](#942-exceptional-halting)). Si elle est évaluée à True, le nouvel état est identique à l'ancien (à l'exception du gaz brûlé) car les changements n'ont pas été mis en œuvre.
2.  Si l'opcode exécuté est [`REVERT`](https://www.evm.codes/#fd), le nouvel état est le même que l'ancien, et une partie du gaz est perdue.
3.  Si la séquence d'opérations est terminée, comme signifié par un [`RETURN`](https://www.evm.codes/#f3), l'état est mis à jour avec le nouvel état.
4.  Si nous ne sommes pas à l'une des conditions de fin 1-3, continuer l'exécution.

## 9.4.1 Machine à états {#941-machine-state}

Cette section explique la machine à états en détail. Elle spécifie que _w_ est l'opcode actuel. Si _μ<sub>pc</sub>_ est inférieur à _||I<sub>b</sub>||_, la longueur du code, alors ce byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) est l'opcode. Sinon, l'opcode est défini comme [`STOP`](https://www.evm.codes/#00).

Comme il s'agit [d'une machine à pile](https://en.wikipedia.org/wiki/Stack_machine), nous devons suivre le nombre d'éléments retirés (_δ_) et insérés (_α_) par chaque opcode.

## 9.4.2 Arrêt Exceptionnel {#942-exceptional-halt}

Cette section définit la fonction _Z_, qui spécifie quand nous avons une terminaison anormale. Il s'agit d'une fonction [booléenne](https://en.wikipedia.org/wiki/Boolean_data_type), donc elle utilise [_∨_ pour un « ou » logique](https://en.wikipedia.org/wiki/Logical_disjunction) et [_∧_ pour un « et » logique](https://en.wikipedia.org/wiki/Logical_conjunction).

Nous avons un arrêt exceptionnel si l'une de ces conditions est vraie :

- **_μ<sub>g</sub> < C(σ,μ,A,I)_** Comme nous l'avons vu à la section 9.2, _C_ est la fonction qui spécifie le coût en gaz. Il ne reste pas assez de gaz pour couvrir le prochain opcode.

- **_δ<sub>w</sub>=∅_** Si le nombre d'éléments extraits pour un opcode est indéfini, alors l'opcode lui-même est indéfini.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_** Sous-alimentation de la pile, pas assez d'éléments dans la pile pour l'opcode actuel.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_** L'opcode est [`JUMP`](https://www.evm.codes/#56) et l'adresse n'est pas une [`JUMPDEST`](https://www.evm.codes/#5b). Les sauts ne sont valides _que_ lorsque la destination est une [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_** L'opcode est [`JUMPI`](https://www.evm.codes/#57), la condition est vraie (non nulle) donc le saut devrait se produire, et l'adresse n'est pas une [`JUMPDEST`](https://www.evm.codes/#5b). Les sauts ne sont valides _que_ lorsque la destination est une [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_** L'opcode est [`RETURNDATACOPY`](https://www.evm.codes/#3e). Dans cet opcode, l'élément de pile _μ<sub>s</sub>[1]_ est le décalage pour lire dans le tampon de données retournées, et l'élément de pile _μ<sub>s</sub>[2]_ est la longueur des données. Cette condition se produit lorsque vous essayez de lire au-delà de la fin du tampon de données retournées. Notez qu'il n'y a pas de condition similaire pour les données d'appel ou pour le code lui-même. Lorsque vous essayez de lire au-delà de la fin de ces tampons, vous obtenez simplement des zéros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Débordement de la pile. Si l'exécution de l'opcode entraîne une pile de plus de 1024 éléments, abandonnez.

- **_¬I<sub>w</sub> ∧ W(w,μ)_** Exécutons-nous de manière statique ([¬ est une négation](https://en.wikipedia.org/wiki/Negation) et _I<sub>w</sub>_ est vrai lorsque nous sommes autorisés à modifier l'état de la blockchain) ? Si c'est le cas et que nous essayons une opération qui change l'état, cela ne peut pas se produire.

  La fonction _W(w,μ)_ est définie plus tard dans l'équation 150. _W(w,μ)_ est vraie si l'une de ces conditions est vraie :

  - **_w ∈ {CREATE, CREATE2, SSTORE, SELFDESTRUCT}_** Ces opcodes modifient l'état, soit en créant un nouveau contrat, soit en stockant une valeur, soit en détruisant le contrat actuel.

  - **_LOG0≤w ∧ w≤LOG4_** Si nous sommes appelés de manière statique, nous ne pouvons pas émettre d'entrées de journal. Les opcodes de journal sont tous dans la plage entre [`LOG0` (A0)](https://www.evm.codes/#a0) et [`LOG4` (A4)](https://www.evm.codes/#a4). Le nombre après l'opcode de journal spécifie combien de sujets l'entrée de journal contient.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_** Vous pouvez appeler un autre contrat lorsque vous êtes statique, mais si vous le faites, vous ne pouvez pas lui transférer de l'ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_** Vous ne pouvez pas exécuter [`SSTORE`](https://www.evm.codes/#55) à moins d'avoir plus de G<sub>callstipend</sub> (défini à 2300 dans l'Annexe G) de gaz.

## 9.4.3 Validité de la Destination de Saut {#943-jump-dest-valid}

Ici, nous définissons formellement ce que sont les opcodes [`JUMPDEST`](https://www.evm.codes/#5b). Nous ne pouvons pas simplement chercher la valeur de byte 0x5B, car elle pourrait se trouver à l'intérieur d'un PUSH (et donc être une donnée et non un opcode).

Dans l'équation (153), nous définissons une fonction, _N(i,w)_. Le premier paramètre, _i_, est la position de l'opcode. Le second, _w_, est l'opcode lui-même. Si _w∈[PUSH1, PUSH32]_, cela signifie que l'opcode est un PUSH (les crochets définissent une plage qui inclut les points d'extrémité). Dans ce cas, le prochain opcode est à _i+2+(w−PUSH1)_. Pour [`PUSH1`](https://www.evm.codes/#60), nous devons avancer de deux bytes (le PUSH lui-même et la valeur d'un byte), pour [`PUSH2`](https://www.evm.codes/#61) nous devons avancer de trois bytes car c'est une valeur de deux bytes, etc. Tous les autres opcodes EVM ont une longueur d'un byte, donc dans tous les autres cas _N(i,w)=i+1_.

Cette fonction est utilisée dans l'équation (152) pour définir _D<sub>J</sub>(c,i)_, qui est [l'ensemble](https://en.wikipedia.org/wiki/Set_(mathematics)) de toutes les destinations de saut valides dans le code _c_, à partir de la position de l'opcode _i_. Cette fonction est définie de manière récursive. Si _i≥||c||_, cela signifie que nous sommes à la fin ou après la fin du code. Nous ne trouverons plus d'autres destinations de saut, donc retournez simplement l'ensemble vide.

Dans tous les autres cas, nous examinons le reste du code en passant à l'opcode suivant et en obtenant l'ensemble à partir de celui-ci. _c[i]_ est l'opcode actuel, donc _N(i,c[i])_ est la position du prochain opcode. _D<sub>J</sub>(c,N(i,c[i]))_ est donc l'ensemble des destinations de saut valides qui commence au prochain opcode. Si l'opcode actuel n'est pas un `JUMPDEST`, retournez simplement cet ensemble. Si c'est un `JUMPDEST`, incluez-le dans l'ensemble résultant et retournez-le.

## 9.4.4 Arrêt normal {#944-normal-halt}

La fonction d'arrêt _H_ peut retourner trois types de valeurs.

- Si nous ne sommes pas dans un opcode d'arrêt, retournez _∅_, l'ensemble vide. Par convention, cette valeur est interprétée comme un booléen faux.
- Si nous avons un opcode d'arrêt qui ne produit pas de sortie (soit [`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)), retournez une séquence de bytes de taille zéro comme valeur de retour. Notez que ceci est très différent de l'ensemble vide. Cette valeur signifie que l'EVM s'est vraiment arrêté, il n'y a juste aucune donnée de retour à lire.
- Si nous avons un opcode d'arrêt qui produit une sortie (soit [`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)), retournez la séquence de bytes spécifiée par cet opcode. Cette séquence est prise de la mémoire, la valeur en haut de la pile (_μ<sub>s</sub>[0]_) est le premier byte, et la valeur après elle (_μ<sub>s</sub>[1]_) est la longueur.

## H.2 Ensemble d'instructions {#h2-instruction-set}

Avant de passer à la sous-section finale de l'EVM, 9.5, examinons les instructions elles-mêmes. Elles sont définies dans l'Annexe H.2 qui commence à la page 29. Tout ce qui n'est pas spécifié comme changeant avec cet opcode spécifique est censé rester identique. Les variables qui changent sont spécifiées comme \<quelque chose\>′.

Par exemple, examinons l'opcode [`ADD`](https://www.evm.codes/#01).

| Valeur | Mnemonic | δ | α | Description                                               |
| ------:| -------- | - | - | --------------------------------------------------------- |
|   0x01 | ADD      | 2 | 1 | Opération d'addition.                                     |
|        |          |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ est le nombre de valeurs que nous retirons de la pile. Dans ce cas deux, car nous additionnons les deux premières valeurs.

_α_ est le nombre de valeurs que nous remettons. Dans ce cas une, la somme.

Ainsi, le nouveau sommet de la pile (_μ′<sub>s</sub>[0]_) est la somme de l'ancien sommet de la pile (_μ<sub>s</sub>[0]_) et de l'ancienne valeur en dessous (_μ<sub>s</sub>[1]_).

Au lieu de passer en revue tous les opcodes avec une « liste ennuyeuse », cet article n'explique que les opcodes qui introduisent quelque chose de nouveau.

| Valeur | Mnemonic  | δ | α | Description                                                                                                |
| ------:| --------- | - | - | ---------------------------------------------------------------------------------------------------------- |
|   0x20 | KECCAK256 | 2 | 1 | Calculez le hash Keccak-256.                                                                               |
|        |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|        |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Il s'agit du premier opcode qui accède à la mémoire (dans ce cas, en lecture seule). Cependant, il pourrait dépasser les limites actuelles de la mémoire, nous devons donc mettre à jour _μ<sub>i</sub>._ Nous faisons cela en utilisant la fonction _M_ définie dans l'équation 328 à la page 29.

| Valeur | Mnemonic | δ | α | Description                       |
| ------:| -------- | - | - | --------------------------------- |
|   0x31 | BALANCE  | 1 | 1 | Obtenez le solde du compte donné. |
|        |          |   |   | ...                               |

L'adresse dont nous avons besoin pour trouver le solde est _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Le sommet de la pile est l'adresse, mais comme les adresses ne font que 160 bits, nous calculons la valeur [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, cela signifie qu'il y a des informations sur cette adresse. Dans ce cas, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ est le solde de cette adresse. Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, cela signifie que cette adresse n'est pas initialisée et le solde est zéro. Vous pouvez voir la liste des champs d'information du compte dans la section 4.1 à la page 4.

La deuxième équation, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ {μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, est liée à la différence de coût entre l'accès au stockage chaud (stockage qui a récemment été accédé et est susceptible d'être mis en cache) et le stockage froid (stockage qui n'a pas été accédé et est susceptible de se trouver dans un stockage plus lent qui est plus coûteux à récupérer). _A<sub>a</sub>_ est la liste des adresses précédemment accédées par la transaction, qui devraient donc être moins chères à accéder, comme défini dans la section 6.1 à la page 8. Vous pouvez en savoir plus sur ce sujet dans [l'EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valeur | Mnemonic | δ  | α  | Description                             |
| ------:| -------- | -- | -- | --------------------------------------- |
|   0x8F | DUP16    | 16 | 17 | Duplique le 16e élément de la pile.     |
|        |          |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Notez que pour utiliser un élément de la pile, nous devons le retirer, ce qui signifie que nous devons également retirer tous les éléments de la pile au-dessus de lui. Dans le cas de [`DUP<n>`](https://www.evm.codes/#8f) et [`SWAP<n>`](https://www.evm.codes/#9f), cela signifie devoir retirer puis remettre jusqu'à seize valeurs.

## 9.5 Le cycle d'exécution {#95-exec-cycle}

Maintenant que nous avons toutes les parties, nous pouvons enfin comprendre comment le cycle d'exécution de l'EVM est documenté.

L'équation (155) dit qu'étant donné l'état :

- _σ_ (état global de la blockchain)
- _μ_ (état de l'EVM)
- _A_ (sous-état, changements à effectuer lorsque la transaction se termine)
- _I_ (environnement d'exécution)

Le nouvel état est _(σ', μ', A', I')_.

Les équations (156)-(158) définissent la pile et le changement en elle en raison d'un opcode (_μ<sub>s</sub>_). L'équation (159) est le changement de gaz (_μ<sub>g</sub>_). L'équation (160) est le changement dans le compteur de programme (_μ<sub>pc</sub>_). Enfin, les équations (161)-(164) spécifient que les autres paramètres restent les mêmes, sauf s'ils sont explicitement modifiés par l'opcode.

Avec cela, l'EVM est entièrement défini.

## Conclusion {#conclusion}

La notation mathématique est précise et a permis au Livre Jaune de spécifier chaque détail d'Ethereum. Cependant, elle présente quelques inconvénients :

- Elle ne peut être comprise que par les humains, ce qui signifie que [les tests](https://github.com/ethereum/tests) de conformité doivent être écrits manuellement.
- Les programmeurs comprennent le code informatique. Ils peuvent ou non comprendre la notation mathématique.

Peut-être pour ces raisons, les nouvelles [spécifications de la couche de consensus](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) sont écrites en Python. Il existe des [spécifications de la couche d'exécution en Python](https://ethereum.github.io/execution-specs), mais elles ne sont pas complètes. Jusqu'à ce que le Livre Jaune soit également traduit en Python ou dans un langage similaire, le Livre Jaune continuera d'être utilisé, et il est utile de pouvoir le lire.
