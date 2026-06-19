---
title: "Comprendre les spécifications de l'EVM du livre jaune"
description: "Comprendre la partie du livre jaune, les spécifications formelles d'Ethereum, qui explique la machine virtuelle Ethereum (EVM)."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: EVM du livre jaune
lang: fr
published: 2022-05-15
---

[Le livre jaune](https://ethereum.github.io/yellowpaper/paper.pdf) est la spécification formelle d'Ethereum. Sauf lorsqu'il est modifié par [le processus des EIP](/eips/), il contient la description exacte du fonctionnement de chaque élément. Il est rédigé comme un article mathématique, ce qui inclut une terminologie avec laquelle les programmeurs peuvent ne pas être familiers. Dans cet article, vous apprendrez comment le lire, et par extension, d'autres articles mathématiques connexes.

## Quel livre jaune ? {#which-yellow-paper}

Comme presque tout le reste dans Ethereum, le livre jaune évolue avec le temps. Pour pouvoir faire référence à une version spécifique, j'ai mis en ligne [la version actuelle au moment de la rédaction](yellow-paper-berlin.pdf). Les numéros de section, de page et d'équation que j'utilise feront référence à cette version. Il est recommandé de l'avoir ouvert dans une autre fenêtre pendant la lecture de ce document.

### Pourquoi l'EVM ? {#why-the-evm}

Le livre jaune original a été rédigé tout au début du développement d'Ethereum. Il décrit le mécanisme de consensus original basé sur la preuve de travail (PoW) qui était initialement utilisé pour sécuriser le réseau. Cependant, Ethereum a abandonné la preuve de travail et a commencé à utiliser un consensus basé sur la preuve d'enjeu (PoS) en septembre 2022. Ce tutoriel se concentrera sur les parties du livre jaune définissant la machine virtuelle Ethereum (EVM). L'EVM n'a pas été modifiée par la transition vers la preuve d'enjeu (à l'exception de la valeur de retour du code d'opération DIFFICULTY).

## 9 Modèle d'exécution {#9-execution-model}

Cette section (p. 12-14) comprend la majeure partie de la définition de l'EVM.

Le terme _état du système_ inclut tout ce que vous devez savoir sur le système pour l'exécuter. Dans un ordinateur classique, cela signifie la mémoire, le contenu des registres, etc.

Une [machine de Turing](https://en.wikipedia.org/wiki/Turing_machine) est un modèle de calcul. Essentiellement, il s'agit d'une version simplifiée d'un ordinateur, dont il est prouvé qu'elle a la même capacité à exécuter des calculs qu'un ordinateur normal (tout ce qu'un ordinateur peut calculer, une machine de Turing peut le calculer et vice versa). Ce modèle permet de prouver plus facilement divers théorèmes sur ce qui est calculable et ce qui ne l'est pas.

Le terme [Turing-complet](https://en.wikipedia.org/wiki/Turing_completeness) désigne un ordinateur capable d'exécuter les mêmes calculs qu'une machine de Turing. Les machines de Turing peuvent entrer dans des boucles infinies, ce qui n'est pas le cas de l'EVM car elle manquerait de gaz, elle n'est donc que quasi-Turing-complète.

## 9.1 Bases {#91-basics}

Cette section présente les bases de l'EVM et la compare à d'autres modèles de calcul.

Une [machine à pile](https://en.wikipedia.org/wiki/Stack_machine) est un ordinateur qui stocke les données intermédiaires non pas dans des registres, mais dans une [**pile**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). C'est l'architecture privilégiée pour les machines virtuelles car elle est facile à implémenter, ce qui signifie que les bugs et les vulnérabilités de sécurité sont beaucoup moins probables. La mémoire de la pile est divisée en mots de 256 bits. Ce choix a été fait car il est pratique pour les opérations cryptographiques de base d'Ethereum telles que le hachage Keccak-256 et les calculs sur courbe elliptique. La taille maximale de la pile est de 1024 éléments (1024 x 256 bits). Lorsque les codes d'opération sont exécutés, ils obtiennent généralement leurs paramètres de la pile. Il existe des codes d'opération spécifiquement conçus pour réorganiser les éléments dans la pile, tels que `POP` (supprime l'élément en haut de la pile), `DUP_N` (duplique le N-ième élément de la pile), etc.

L'EVM dispose également d'un espace volatil appelé **mémoire** qui est utilisé pour stocker des données pendant l'exécution. Cette mémoire est organisée en mots de 32 octets. Tous les emplacements de mémoire sont initialisés à zéro. Si vous exécutez ce code [Yul](https://docs.soliditylang.org/en/latest/yul.html) pour ajouter un mot à la mémoire, il remplira 32 octets de mémoire en complétant l'espace vide du mot avec des zéros, c'est-à-dire qu'il crée un mot - avec des zéros aux emplacements 0-29, 0x60 à 30, et 0xA7 à 31.

```yul
mstore(0, 0x60A7)
```

`mstore` est l'un des trois codes d'opération fournis par l'EVM pour interagir avec la mémoire - il charge un mot dans la mémoire. Les deux autres sont `mstore8` qui charge un seul octet dans la mémoire, et `mload` qui déplace un mot de la mémoire vers la pile.

L'EVM possède également un modèle de **stockage** non volatil distinct qui est maintenu dans le cadre de l'état du système - cette mémoire est organisée en tableaux de mots (par opposition aux tableaux d'octets adressables par mot dans la pile). C'est dans ce stockage que les contrats conservent les données persistantes - un contrat ne peut interagir qu'avec son propre stockage. Le stockage est organisé en correspondances clé-valeur.

Bien que cela ne soit pas mentionné dans cette section du livre jaune, il est également utile de savoir qu'il existe un quatrième type de mémoire. Les **données d'appel** (calldata) sont une mémoire en lecture seule adressable par octet utilisée pour stocker la valeur transmise avec le paramètre `data` d'une transaction. L'EVM possède des codes d'opération spécifiques pour gérer les `calldata`. `calldatasize` renvoie la taille des données. `calldataload` charge les données dans la pile. `calldatacopy` copie les données dans la mémoire.

L'[architecture de von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) standard stocke le code et les données dans la même mémoire. L'EVM ne suit pas cette norme pour des raisons de sécurité - le partage de la mémoire volatile permet de modifier le code du programme. Au lieu de cela, le code est sauvegardé dans le stockage.

Il n'y a que deux cas dans lesquels le code est exécuté à partir de la mémoire :

- Lorsqu'un contrat crée un autre contrat (en utilisant [`CREATE`](https://www.evm.codes/#f0) ou [`CREATE2`](https://www.evm.codes/#f5)), le code du constructeur du contrat provient de la mémoire.
- Lors de la création de _n'importe quel_ contrat, le code du constructeur s'exécute puis renvoie le code du contrat réel, également à partir de la mémoire.

Le terme exécution exceptionnelle désigne une exception qui provoque l'arrêt de l'exécution du contrat en cours.

## 9.2 Aperçu des frais {#92-fees-overview}

Cette section explique comment les frais de gaz sont calculés. Il y a trois coûts :

### Coût du code d'opération {#opcode-cost}

Le coût inhérent au code d'opération spécifique. Pour obtenir cette valeur, trouvez le groupe de coût du code d'opération dans l'Annexe H (p. 28, sous l'équation (327)), et trouvez le groupe de coût dans l'équation (324). Cela vous donne une fonction de coût, qui dans la plupart des cas utilise les paramètres de l'Annexe G (p. 27).

Par exemple, le code d'opération [`CALLDATACOPY`](https://www.evm.codes/#37) est membre du groupe _W<sub>copy</sub>_. Le coût du code d'opération pour ce groupe est _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. En regardant l'Annexe G, nous voyons que les deux constantes sont 3, ce qui nous donne _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Nous devons encore déchiffrer l'expression _⌈μ<sub>s</sub>[2]÷32⌉_. La partie la plus externe, _⌈ \<valeur\> ⌉_ est la fonction plafond, une fonction qui, pour une valeur donnée, renvoie le plus petit entier qui n'est pas inférieur à la valeur. Par exemple, _⌈2.5⌉ = ⌈3⌉ = 3_. La partie interne est _μ<sub>s</sub>[2]÷32_. En regardant la section 3 (Conventions) à la p. 3, _μ_ est l'état de la machine. L'état de la machine est défini dans la section 9.4.1 à la p. 13. Selon cette section, l'un des paramètres de l'état de la machine est _s_ pour la pile. En rassemblant tout cela, il semble que _μ<sub>s</sub>[2]_ soit l'emplacement n°2 dans la pile. En regardant [le code d'opération](https://www.evm.codes/#37), l'emplacement n°2 dans la pile est la taille des données en octets. En regardant les autres codes d'opération du groupe W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) et [`RETURNDATACOPY`](https://www.evm.codes/#3e), ils ont également une taille de données au même emplacement. Donc _⌈μ<sub>s</sub>[2]÷32⌉_ est le nombre de mots de 32 octets requis pour stocker les données en cours de copie. En rassemblant tout, le coût inhérent de [`CALLDATACOPY`](https://www.evm.codes/#37) est de 3 gaz plus 3 par mot de données copié.

### Coût d'exécution {#running-cost}

Le coût d'exécution du code que nous appelons.

- Dans le cas de [`CREATE`](https://www.evm.codes/#f0) et [`CREATE2`](https://www.evm.codes/#f5), le constructeur du nouveau contrat.
- Dans le cas de [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), ou [`DELEGATECALL`](https://www.evm.codes/#f4), le contrat que nous appelons.

### Coût d'expansion de la mémoire {#expanding-memory-cost}

Le coût d'expansion de la mémoire (si nécessaire).

Dans l'équation 324, cette valeur est écrite comme _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. En regardant à nouveau la section 9.4.1, nous voyons que _μ<sub>i</sub>_ est le nombre de mots en mémoire. Donc _μ<sub>i</sub>_ est le nombre de mots en mémoire avant le code d'opération et _μ<sub>i</sub>'_ est le nombre de mots en mémoire après le code d'opération.

La fonction _C<sub>mem</sub>_ est définie dans l'équation 326 : _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ est la fonction partie entière par défaut (plancher), une fonction qui, pour une valeur donnée, renvoie le plus grand entier qui n'est pas supérieur à la valeur. Par exemple, _⌊2.5⌋ = ⌊2⌋ = 2._ Lorsque _a < √512_, _a<sup>2</sup> < 512_, et le résultat de la fonction plancher est zéro. Donc pour les 22 premiers mots (704 octets), le coût augmente de façon linéaire avec le nombre de mots mémoire requis. Au-delà de ce point, _⌊a<sup>2</sup> ÷ 512⌋_ est positif. Lorsque la mémoire requise est suffisamment élevée, le coût en gaz est proportionnel au carré de la quantité de mémoire.

**Remarque** : ces facteurs n'influencent que le coût _inhérent_ en gaz - ils ne prennent pas en compte le marché des frais ou les pourboires aux validateurs qui déterminent combien un utilisateur final doit payer - il s'agit simplement du coût brut d'exécution d'une opération particulière sur l'EVM.

[En savoir plus sur le gaz](/developers/docs/gas/).

## 9.3 Environnement d'exécution {#93-execution-env}

L'environnement d'exécution est un n-uplet, _I_, qui inclut des informations qui ne font pas partie de l'état de la chaîne de blocs ou de l'EVM.

| Paramètre       | Code d'opération pour accéder aux données                                                                                        | Code Solidity pour accéder aux données         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Champs de l'en-tête de bloc, tels que [`NUMBER`](https://www.evm.codes/#43) et [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Profondeur de la pile d'appels pour les appels entre contrats (y compris la création de contrat)                                |
| _I<sub>w</sub>_ | L'EVM est-elle autorisée à modifier l'état, ou s'exécute-t-elle de manière statique                                                  |

Quelques autres paramètres sont nécessaires pour comprendre le reste de la section 9 :

| Paramètre | Défini dans la section   | Signification                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (p. 2, équation 1) | L'état de la chaîne de blocs                                                                                                                                                                                              |
| _g_       | 9.3 (p. 13)          | Gaz restant                                                                                                                                                                                                            |
| _A_       | 6.1 (p. 8)           | Sous-état accumulé (modifications prévues à la fin de la transaction)                                                                                                                                                       |
| _o_       | 9.3 (p. 13)          | Sortie - le résultat renvoyé dans le cas d'une transaction interne (lorsqu'un contrat en appelle un autre) et des appels aux fonctions de vue (lorsque vous demandez simplement des informations, il n'est donc pas nécessaire d'attendre une transaction) |

## 9.4 Aperçu de l'exécution {#94-execution-overview}

Maintenant que nous avons tous les préliminaires, nous pouvons enfin commencer à travailler sur le fonctionnement de l'EVM.

Les équations 137-142 nous donnent les conditions initiales pour exécuter l'EVM :

| Symbole           | Valeur initiale | Signification                                                                                                                                                                                                                                                     |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Gaz restant                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_           | Compteur de programme, l'adresse de la prochaine instruction à exécuter                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Mémoire, initialisée avec des zéros                                                                                                                                                                                                                            |
| _μ<sub>i</sub>_  | _0_           | Emplacement mémoire le plus élevé utilisé                                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_          | La pile, initialement vide                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_           | La sortie, ensemble vide jusqu'à ce que nous nous arrêtions avec des données de retour ([`RETURN`](https://www.evm.codes/#f3) ou [`REVERT`](https://www.evm.codes/#fd)) ou sans ([`STOP`](https://www.evm.codes/#00) ou [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

L'équation 143 nous indique qu'il y a quatre conditions possibles à chaque instant pendant l'exécution, et ce qu'il faut en faire :

1.  `Z(σ,μ,A,I)`. Z représente une fonction qui teste si une opération crée une transition d'état invalide (voir [arrêt exceptionnel](#942-exceptional-halt)). Si elle est évaluée à Vrai (True), le nouvel état est identique à l'ancien (sauf que le gaz est brûlé) car les modifications n'ont pas été implémentées.
2.  Si le code d'opération en cours d'exécution est [`REVERT`](https://www.evm.codes/#fd), le nouvel état est le même que l'ancien état, une partie du gaz est perdue.
3.  Si la séquence d'opérations est terminée, comme indiqué par un [`RETURN`](https://www.evm.codes/#f3)), l'état est mis à jour vers le nouvel état.
4.  Si nous ne sommes pas dans l'une des conditions de fin 1 à 3, l'exécution continue.

## 9.4.1 État de la machine {#941-machine-state}

Cette section explique l'état de la machine plus en détail. Elle précise que _w_ est le code d'opération actuel. Si _μ<sub>pc</sub>_ est inférieur à _||I<sub>b</sub>||_, la longueur du code, alors cet octet (_I<sub>b</sub>[μ<sub>pc</sub>]_) est le code d'opération. Sinon, le code d'opération est défini comme [`STOP`](https://www.evm.codes/#00).

Comme il s'agit d'une [machine à pile](https://en.wikipedia.org/wiki/Stack_machine), nous devons garder une trace du nombre d'éléments retirés (_δ_) et ajoutés (_α_) par chaque code d'opération.

## 9.4.2 Arrêt exceptionnel {#942-exceptional-halt}

Cette section définit la fonction _Z_, qui spécifie quand nous avons une terminaison anormale. Il s'agit d'une fonction [booléenne](https://en.wikipedia.org/wiki/Boolean_data_type), elle utilise donc [_∨_ pour un OU logique](https://en.wikipedia.org/wiki/Logical_disjunction) et [_∧_ pour un ET logique](https://en.wikipedia.org/wiki/Logical_conjunction).

Nous avons un arrêt exceptionnel si l'une de ces conditions est vraie :

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Comme nous l'avons vu dans la section 9.2, _C_ est la fonction qui spécifie le coût en gaz. Il ne reste pas assez de gaz pour couvrir le prochain code d'opération.

- **_δ<sub>w</sub>=∅_**
  Si le nombre d'éléments retirés pour un code d'opération n'est pas défini, alors le code d'opération lui-même n'est pas défini.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Sous-dépassement de pile, pas assez d'éléments dans la pile pour le code d'opération actuel.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Le code d'opération est [`JUMP`](https://www.evm.codes/#56) et l'adresse n'est pas un [`JUMPDEST`](https://www.evm.codes/#5b). Les sauts ne sont valides _que_ lorsque la destination est un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Le code d'opération est [`JUMPI`](https://www.evm.codes/#57), la condition est vraie (non nulle) donc le saut devrait se produire, et l'adresse n'est pas un [`JUMPDEST`](https://www.evm.codes/#5b). Les sauts ne sont valides _que_ lorsque la destination est un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Le code d'opération est [`RETURNDATACOPY`](https://www.evm.codes/#3e). Dans ce code d'opération, l'élément de pile _μ<sub>s</sub>[1]_ est le décalage à partir duquel lire dans le tampon de données de retour, et l'élément de pile _μ<sub>s</sub>[2]_ est la longueur des données. Cette condition se produit lorsque vous essayez de lire au-delà de la fin du tampon de données de retour. Notez qu'il n'y a pas de condition similaire pour les données d'appel (calldata) ou pour le code lui-même. Lorsque vous essayez de lire au-delà de la fin de ces tampons, vous obtenez simplement des zéros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Dépassement de capacité de la pile. Si l'exécution du code d'opération entraîne une pile de plus de 1024 éléments, abandonnez.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Sommes-nous en cours d'exécution statique ([¬ est la négation](https://en.wikipedia.org/wiki/Negation) et _I<sub>w</sub>_ est vrai lorsque nous sommes autorisés à modifier l'état de la chaîne de blocs) ? Si c'est le cas, et que nous essayons une opération de changement d'état, cela ne peut pas se produire.

  La fonction _W(w,μ)_ est définie plus loin dans l'équation 150. _W(w,μ)_ est vraie si l'une de ces conditions est vraie :

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Ces codes d'opération modifient l'état, soit en créant un nouveau contrat, en stockant une valeur, ou en détruisant le contrat actuel.

  - **_LOG0≤w ∧ w≤LOG4_**
    Si nous sommes appelés statiquement, nous ne pouvons pas émettre d'entrées de journal.
    Les codes d'opération de journal sont tous compris entre [`LOG0` (A0)](https://www.evm.codes/#a0) et [`LOG4` (A4)](https://www.evm.codes/#a4).
    Le nombre après le code d'opération de journal spécifie combien de sujets l'entrée de journal contient.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Vous pouvez appeler un autre contrat lorsque vous êtes statique, mais si vous le faites, vous ne pouvez pas lui transférer d'ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Vous ne pouvez pas exécuter [`SSTORE`](https://www.evm.codes/#55) à moins d'avoir plus de G<sub>callstipend</sub> (défini à 2300 dans l'Annexe G) gaz.

## 9.4.3 Validité de la destination de saut {#943-jump-dest-valid}

Ici, nous définissons formellement ce que sont les codes d'opération [`JUMPDEST`](https://www.evm.codes/#5b). Nous ne pouvons pas simplement chercher la valeur d'octet 0x5B, car elle pourrait se trouver à l'intérieur d'un PUSH (et donc être une donnée et non un code d'opération).

Dans l'équation (153), nous définissons une fonction, _N(i,w)_. Le premier paramètre, _i_, est l'emplacement du code d'opération. Le second, _w_, est le code d'opération lui-même. Si _w∈[PUSH1, PUSH32]_, cela signifie que le code d'opération est un PUSH (les crochets définissent une plage qui inclut les extrémités). Dans ce cas, le prochain code d'opération se trouve à _i+2+(w−PUSH1)_. Pour [`PUSH1`](https://www.evm.codes/#60), nous devons avancer de deux octets (le PUSH lui-même et la valeur d'un octet), pour [`PUSH2`](https://www.evm.codes/#61), nous devons avancer de trois octets car il s'agit d'une valeur de deux octets, etc. Tous les autres codes d'opération de l'EVM ne font qu'un octet de long, donc dans tous les autres cas _N(i,w)=i+1_.

Cette fonction est utilisée dans l'équation (152) pour définir _D<sub>J</sub>(c,i)_, qui est l'[ensemble](<https://en.wikipedia.org/wiki/Set_(mathematics)>) de toutes les destinations de saut valides dans le code _c_, en commençant par l'emplacement du code d'opération _i_. Cette fonction est définie de manière récursive. Si _i≥||c||_, cela signifie que nous sommes à la fin ou après la fin du code. Nous n'allons plus trouver de destinations de saut, donc nous renvoyons simplement l'ensemble vide.

Dans tous les autres cas, nous examinons le reste du code en passant au code d'opération suivant et en obtenant l'ensemble à partir de celui-ci. _c[i]_ est le code d'opération actuel, donc _N(i,c[i])_ est l'emplacement du prochain code d'opération. _D<sub>J</sub>(c,N(i,c[i]))_ est donc l'ensemble des destinations de saut valides qui commence au prochain code d'opération. Si le code d'opération actuel n'est pas un `JUMPDEST`, renvoyez simplement cet ensemble. S'il s'agit de `JUMPDEST`, incluez-le dans l'ensemble de résultats et renvoyez-le.

## 9.4.4 Arrêt normal {#944-normal-halt}

La fonction d'arrêt _H_ peut renvoyer trois types de valeurs.

- Si nous ne sommes pas dans un code d'opération d'arrêt, renvoyez _∅_, l'ensemble vide. Par convention, cette valeur est interprétée comme un faux booléen.
- Si nous avons un code d'opération d'arrêt qui ne produit pas de sortie (soit [`STOP`](https://www.evm.codes/#00) soit [`SELFDESTRUCT`](https://www.evm.codes/#ff)), renvoyez une séquence d'octets de taille zéro comme valeur de retour. Notez que c'est très différent de l'ensemble vide. Cette valeur signifie que l'EVM s'est réellement arrêtée, il n'y a simplement aucune donnée de retour à lire.
- Si nous avons un code d'opération d'arrêt qui produit une sortie (soit [`RETURN`](https://www.evm.codes/#f3) soit [`REVERT`](https://www.evm.codes/#fd)), renvoyez la séquence d'octets spécifiée par ce code d'opération. Cette séquence est extraite de la mémoire, la valeur en haut de la pile (_μ<sub>s</sub>[0]_) est le premier octet, et la valeur qui la suit (_μ<sub>s</sub>[1]_) est la longueur.

## H.2 Jeu d'instructions {#h2-instruction-set}

Avant de passer à la dernière sous-section de l'EVM, 9.5, examinons les instructions elles-mêmes. Elles sont définies dans l'Annexe H.2 qui commence à la p. 29. Tout ce qui n'est pas spécifié comme changeant avec ce code d'opération spécifique est censé rester le même. Les variables qui changent sont spécifiées avec un \<quelque chose\>′.

Par exemple, regardons le code d'opération [`ADD`](https://www.evm.codes/#01).

| Valeur | Mnémonique | δ   | α   | Description                                               |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Opération d'addition.                                       |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ est le nombre de valeurs que nous retirons de la pile. Dans ce cas, deux, car nous additionnons les deux valeurs supérieures.

_α_ est le nombre de valeurs que nous rajoutons. Dans ce cas, une, la somme.

Donc le nouveau sommet de la pile (_μ′<sub>s</sub>[0]_) est la somme de l'ancien sommet de la pile (_μ<sub>s</sub>[0]_) et de l'ancienne valeur en dessous (_μ<sub>s</sub>[1]_).

Au lieu de passer en revue tous les codes d'opération avec une liste interminable, cet article n'explique que les codes d'opération qui introduisent quelque chose de nouveau.

| Valeur | Mnémonique  | δ   | α   | Description                                                                                                |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Calcule le hachage Keccak-256.                                                                                   |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

C'est le premier code d'opération qui accède à la mémoire (dans ce cas, en lecture seule). Cependant, il pourrait s'étendre au-delà des limites actuelles de la mémoire, nous devons donc mettre à jour _μ<sub>i</sub>._ Nous faisons cela en utilisant la fonction _M_ définie dans l'équation 328 à la p. 29.

| Valeur | Mnémonique | δ   | α   | Description                       |
| ----: | -------- | --- | --- | --------------------------------- |
|  0x31 | BALANCE  | 1   | 1   | Obtient le solde du compte donné. |
|       |          |     |     | ...                               |

L'adresse dont nous devons trouver le solde est _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Le sommet de la pile est l'adresse, mais comme les adresses ne font que 160 bits, nous calculons la valeur [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, cela signifie qu'il y a des informations sur cette adresse. Dans ce cas, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ est le solde de cette adresse. Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, cela signifie que cette adresse n'est pas initialisée et que le solde est nul. Vous pouvez voir la liste des champs d'information du compte dans la section 4.1 à la p. 4.

La deuxième équation, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, est liée à la différence de coût entre l'accès au stockage chaud (stockage qui a été récemment consulté et qui est susceptible d'être mis en cache) et au stockage froid (stockage qui n'a pas été consulté et qui est susceptible de se trouver dans un stockage plus lent et plus coûteux à récupérer). _A<sub>a</sub>_ est la liste des adresses précédemment consultées par la transaction, qui devraient donc être moins chères d'accès, comme défini dans la section 6.1 à la p. 8. Vous pouvez en savoir plus sur ce sujet dans l'[EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valeur | Mnémonique | δ   | α   | Description                             |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | Duplique le 16ème élément de la pile.              |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Notez que pour utiliser n'importe quel élément de la pile, nous devons le retirer, ce qui signifie que nous devons également retirer tous les éléments de la pile qui se trouvent au-dessus de lui. Dans le cas de [`DUP<n>`](https://www.evm.codes/#8f) et [`SWAP<n>`](https://www.evm.codes/#9f), cela signifie devoir retirer puis rajouter jusqu'à seize valeurs.

## 9.5 Le cycle d'exécution {#95-exec-cycle}

Maintenant que nous avons toutes les parties, nous pouvons enfin comprendre comment le cycle d'exécution de l'EVM est documenté.

L'équation (155) indique qu'étant donné l'état :

- _σ_ (état global de la chaîne de blocs)
- _μ_ (état de l'EVM)
- _A_ (sous-état, modifications devant se produire à la fin de la transaction)
- _I_ (environnement d'exécution)

Le nouvel état est _(σ', μ', A', I')_.

Les équations (156)-(158) définissent la pile et sa modification due à un code d'opération (_μ<sub>s</sub>_). L'équation (159) est la modification du gaz (_μ<sub>g</sub>_). L'équation (160) est la modification du compteur de programme (_μ<sub>pc</sub>_). Enfin, les équations (161)-(164) précisent que les autres paramètres restent les mêmes, à moins qu'ils ne soient explicitement modifiés par le code d'opération.

Avec cela, l'EVM est entièrement définie.

## Conclusion {#conclusion}

La notation mathématique est précise et a permis au livre jaune de spécifier chaque détail d'Ethereum. Cependant, elle présente quelques inconvénients :

- Elle ne peut être comprise que par des humains, ce qui signifie que les [tests de conformité](https://github.com/ethereum/tests) doivent être écrits manuellement.
- Les programmeurs comprennent le code informatique.
  Ils peuvent comprendre ou non la notation mathématique.

C'est peut-être pour ces raisons que les nouvelles [spécifications de la couche de consensus](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) sont écrites en Python. Il existe des [spécifications de la couche d'exécution en Python](https://ethereum.github.io/execution-specs), mais elles ne sont pas complètes. Jusqu'à ce que l'intégralité du livre jaune soit également traduite en Python ou dans un langage similaire, le livre jaune continuera d'être utilisé, et il est utile de pouvoir le lire.