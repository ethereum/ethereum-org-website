---
title: "Présentation du contrat ERC-20"
description: Qu'est-ce que le contrat OpenZeppelin ERC-20 et pourquoi existe-t-il ?
author: Ori Pomerantz
lang: fr
tags: [ "solidité", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Introduction {#introduction}

Ethereum est couramment utilisé par des groupes pour créer des jetons échangeables ou, dans un certain sens, leur propre monnaie. Ces jetons suivent généralement une norme,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Cette norme permet de créer des outils, tels que des pools de liquidités et des portefeuilles, qui fonctionnent avec tous les jetons ERC-20
. Dans cet article, nous analyserons l'[implémentation ERC20 de Solidity par OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), ainsi que la [définition de l'interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Ceci est le code source annoté. Si vous souhaitez implémenter l'ERC-20,
[lisez ce tutoriel](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## L'interface {#the-interface}

L'objectif d'une norme comme l'ERC-20 est de permettre de nombreuses implémentations de jetons interopérables entre les applications, comme les portefeuilles et les échanges décentralisés. Pour ce faire, nous créons une
[interface](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Tout code qui a besoin d'utiliser le contrat de jeton peut employer les mêmes définitions dans l'interface et être compatible avec tous les contrats de jetons qui l'utilisent, qu'il s'agisse d'un portefeuille tel que MetaMask, d'une dapp comme etherscan.io, ou d'un contrat différent tel qu'un pool de liquidités.

![Illustration de l'interface ERC-20](erc20_interface.png)

Si vous êtes un programmeur expérimenté, vous vous souvenez probablement avoir vu des constructions similaires en [Java](https://www.w3schools.com/java/java_interface.asp)
ou même dans des [fichiers d'en-tête C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Ceci est une définition de l'[Interface ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
d'OpenZeppelin. C'est une traduction de la [norme lisible par l'homme](https://eips.ethereum.org/EIPS/eip-20) en code Solidity. Bien sûr, l'interface
elle-même ne définit pas _comment_ faire quoi que ce soit. Ceci est expliqué dans le code source du contrat ci-dessous.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Les fichiers Solidity sont censés inclure un identifiant de licence. [Vous pouvez voir la liste des licences ici](https://spdx.org/licenses/). Si vous avez besoin d'une autre
licence, il vous suffit de l'expliquer dans les commentaires.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Le langage Solidity évolue encore rapidement, et les nouvelles versions peuvent ne pas être compatibles avec l'ancien code
([voir ici](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Par conséquent, il est judicieux de spécifier non seulement une version minimale
du langage, mais aussi une version maximale, la plus récente avec laquelle vous avez testé le code.

&nbsp;

```solidity
/**
 * @dev Interface de la norme ERC20 telle que définie dans l'EIP.
 */
```

Le `@dev` dans le commentaire fait partie du [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), utilisé pour produire de la
documentation à partir du code source.

&nbsp;

```solidity
interface IERC20 {
```

Par convention, les noms d'interface commencent par `I`.

&nbsp;

```solidity
    /**
     * @dev Renvoie la quantité de jetons existants.
     */
    function totalSupply() external view returns (uint256);
```

Cette fonction est `external`, ce qui signifie qu'[elle ne peut être appelée que depuis l'extérieur du contrat](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Elle renvoie la quantité totale de jetons dans le contrat. Cette valeur est renvoyée en utilisant le type de données le plus courant sur Ethereum, un entier non signé de 256 bits (256 bits est la taille
de mot native de l'EVM). Cette fonction est également de type `view`, ce qui signifie qu'elle ne modifie pas l'état. Elle peut donc être exécutée sur un seul nœud, sans que tous les nœuds de la blockchain n'aient à l'exécuter
. Ce type de fonction ne génère pas de transaction et n'a pas de coût en [gaz](/developers/docs/gas/).

**Remarque :** En théorie, il pourrait sembler que le créateur d'un contrat puisse tricher en renvoyant une offre totale inférieure à la valeur réelle, faisant ainsi paraître chaque jeton
plus précieux qu'il ne l'est en réalité. Cependant, cette crainte ignore la véritable nature de la blockchain. Tout ce qui se passe sur la blockchain peut être vérifié par
chaque nœud. Pour ce faire, le code en langage machine et le stockage de chaque contrat sont disponibles sur chaque nœud. Bien que vous ne soyez pas obligé de publier le code Solidity
de votre contrat, personne ne vous prendrait au sérieux si vous ne publiez pas le code source et la version de Solidity avec laquelle il a été compilé, afin qu'il puisse
être vérifié par rapport au code en langage machine que vous avez fourni.
Par exemple, consultez [ce contrat](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Renvoie la quantité de jetons détenus par `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Comme son nom l'indique, `balanceOf` renvoie le solde d'un compte. Les comptes Ethereum sont identifiés dans Solidity à l'aide du type `address`, qui contient 160 bits.
Elle est également `external` et `view`.

&nbsp;

```solidity
    /**
     * @dev Déplace un `montant` (`amount`) de jetons du compte de l'appelant vers le `destinataire` (`recipient`).
     *
     * Renvoie une valeur booléenne indiquant si l'opération a réussi.
     *
     * Émet un événement {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La fonction `transfer` transfère des jetons de l'appelant à une autre adresse. Cela implique un changement d'état, ce n'est donc pas une fonction de type `view`.
Lorsqu'un utilisateur appelle cette fonction, cela crée une transaction et coûte du gaz. Elle émet également un événement, `Transfer`, pour informer tout le monde sur la
blockchain de l'événement.

La fonction a deux types de sortie pour deux types d'appelants différents :

- Les utilisateurs qui appellent la fonction directement depuis une interface utilisateur. Généralement, l'utilisateur soumet une transaction
  et n'attend pas de réponse, ce qui peut prendre un temps indéfini. L'utilisateur peut voir ce qui s'est passé
  en consultant le reçu de transaction (identifié par le hachage de la transaction) ou en recherchant l'événement
  `Transfer`.
- D'autres contrats, qui appellent la fonction dans le cadre d'une transaction globale. Ces contrats obtiennent le résultat immédiatement,
  car ils s'exécutent dans la même transaction, et peuvent donc utiliser la valeur de retour de la fonction.

Le même type de sortie est créé par les autres fonctions qui modifient l'état du contrat.

&nbsp;

Les allocations permettent à un compte de dépenser des jetons qui appartiennent à un autre propriétaire.
C'est utile, par exemple, pour les contrats qui agissent en tant que vendeurs. Les contrats ne peuvent
pas surveiller les événements, donc si un acheteur devait transférer directement des jetons au contrat du vendeur
, ce contrat ne saurait pas qu'il a été payé. Au lieu de cela, l'acheteur autorise le contrat du vendeur
à dépenser un certain montant, et le vendeur transfère ce montant.
Cela se fait par le biais d'une fonction que le contrat du vendeur appelle, de sorte que le contrat du vendeur
puisse savoir si l'opération a réussi.

```solidity
    /**
     * @dev Renvoie le nombre de jetons restants que `spender` sera
     * autorisé à dépenser au nom de `owner` via {transferFrom}. La valeur par
     * défaut est zéro.
     *
     * Cette valeur change lorsque {approve} ou {transferFrom} sont appelées.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La fonction `allowance` permet à quiconque de demander à voir quelle est l'allocation qu'une
adresse (`owner`) autorise une autre adresse (`spender`) à dépenser.

&nbsp;

```solidity
    /**
     * @dev Définit le `montant` (`amount`) comme l'allocation de `spender` sur les jetons de l'appelant.
     *
     * Renvoie une valeur booléenne indiquant si l'opération a réussi.
     *
     * IMPORTANT : Sachez que la modification d'une allocation avec cette méthode comporte le risque
     * que quelqu'un puisse utiliser à la fois l'ancienne et la nouvelle allocation en raison d'un
     * ordre de transaction malencontreux. Une solution possible pour atténuer cette
     * condition de concurrence consiste à d'abord réduire à 0 l'allocation du dépensier, puis à définir la
     * valeur souhaitée :
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Émet un événement {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La fonction `approve` crée une allocation. Assurez-vous de lire le message sur
la façon dont elle peut être utilisée de manière abusive. Dans Ethereum, vous contrôlez l'ordre de vos propres transactions,
mais vous ne pouvez pas contrôler l'ordre dans lequel les transactions des autres personnes seront
exécutées, à moins que vous ne soumettiez pas votre propre transaction avant de voir que la
transaction de l'autre partie a eu lieu.

&nbsp;

```solidity
    /**
     * @dev Déplace un `montant` (`amount`) de jetons de `sender` vers `recipient` en utilisant le
     * mécanisme d'allocation. Le `montant` (`amount`) est ensuite déduit de l'allocation
     * de l'appelant.
     *
     * Renvoie une valeur booléenne indiquant si l'opération a réussi.
     *
     * Émet un événement {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Enfin, `transferFrom` est utilisé par le dépensier pour dépenser réellement l'allocation.

&nbsp;

```solidity

    /**
     * @dev Émis lorsque des jetons d'une `valeur` (`value`) sont déplacés d'un compte (`from`) à
     * un autre (`to`).
     *
     * Notez que `value` peut être zéro.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Émis lorsque l'allocation d'un `dépensier` (`spender`) pour un `propriétaire` (`owner`) est définie par
     * un appel à {approve}. `value` est la nouvelle allocation.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Ces événements sont émis lorsque l'état du contrat ERC-20 change.

## Le contrat réel {#the-actual-contract}

Ceci est le contrat réel qui implémente la norme ERC-20,
[tiré d'ici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Il n'est pas destiné à être utilisé tel quel, mais vous pouvez
[en hériter](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) pour l'étendre à quelque chose d'utilisable.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Instructions d'importation {#import-statements}

En plus des définitions d'interface ci-dessus, la définition du contrat importe deux autres fichiers :

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` contient les définitions requises pour utiliser [OpenGSN](https://www.opengsn.org/), un système qui permet aux utilisateurs sans ether
  d'utiliser la blockchain. Notez qu'il s'agit d'une ancienne version. Si vous voulez vous intégrer à OpenGSN,
  [utilisez ce tutoriel](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La bibliothèque SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), qui empêche
  les dépassements/sous-dépassements arithmétiques pour les versions de Solidity **&lt;0.8.0**. Dans Solidity ≥0.8.0, les opérations arithmétiques
  s'annulent automatiquement en cas de dépassement/sous-dépassement, ce qui rend SafeMath inutile. Ce contrat utilise SafeMath pour la compatibilité descendante avec
  les anciennes versions du compilateur.

&nbsp;

Ce commentaire explique l'objectif du contrat.

```solidity
/**
 * @dev Implémentation de l'interface {IERC20}.
 *
 * Cette implémentation est agnostique quant à la manière dont les jetons sont créés. Cela signifie
 * qu'un mécanisme d'approvisionnement doit être ajouté dans un contrat dérivé utilisant {_mint}.
 * Pour un mécanisme générique, voir {ERC20PresetMinterPauser}.
 *
 * CONSEIL : pour un exposé détaillé, consultez notre guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Comment
 * implémenter des mécanismes d'approvisionnement].
 *
 * Nous avons suivi les directives générales d'OpenZeppelin : les fonctions s'annulent au lieu de
 * renvoyer « `false` » en cas d'échec. Ce comportement est néanmoins conventionnel
 * et n'entre pas en conflit avec les attentes des applications ERC20.
 *
 * De plus, un événement {Approval} est émis lors des appels à {transferFrom}.
 * Cela permet aux applications de reconstruire l'allocation pour tous les comptes simplement
 * en écoutant lesdits événements. D'autres implémentations de l'EIP peuvent ne pas émettre
 * ces événements, car ce n'est pas requis par la spécification.
 *
 * Enfin, les fonctions non standard {decreaseAllowance} et {increaseAllowance}
 * ont été ajoutées pour atténuer les problèmes bien connus concernant la définition
 * des allocations. Voir {IERC20-approve}.
 */

```

### Définition du contrat {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Cette ligne spécifie l'héritage, dans ce cas de `IERC20` ci-dessus et de `Context`, pour OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Cette ligne attache la bibliothèque `SafeMath` au type `uint256`. Vous pouvez trouver cette bibliothèque
[ici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Définitions des variables {#variable-definitions}

Ces définitions spécifient les variables d'état du contrat. Ces variables sont déclarées comme `private`, mais
cela signifie seulement que les autres contrats sur la blockchain ne peuvent pas les lire. _Il n'y a pas de
secrets sur la blockchain_, le logiciel sur chaque nœud a l'état de chaque contrat
à chaque bloc. Par convention, les variables d'état sont nommées `_<quelquechose>`.

Les deux premières variables sont des [mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
ce qui signifie qu'elles se comportent à peu près de la même manière que des [tableaux associatifs](https://wikipedia.org/wiki/Associative_array),
sauf que les clés sont des valeurs numériques. Le stockage n'est alloué que pour les entrées qui ont des valeurs différentes
de la valeur par défaut (zéro).

```solidity
    mapping (address => uint256) private _balances;
```

Le premier mapping, `_balances`, contient les adresses et leurs soldes respectifs de ce jeton. Pour accéder
au solde, utilisez cette syntaxe : `_balances[<adresse>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Cette variable, `_allowances`, stocke les allocations expliquées précédemment. Le premier index est le propriétaire
des jetons, et le second est le contrat avec l'allocation. Pour accéder au montant que l'adresse A peut
dépenser à partir du compte de l'adresse B, utilisez `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Comme son nom l'indique, cette variable assure le suivi de l'offre totale de jetons.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Ces trois variables sont utilisées pour améliorer la lisibilité. Les deux premières sont explicites, mais `_decimals`
ne l'est pas.

D'une part, Ethereum ne dispose pas de variables à virgule flottante ou fractionnaires. D'autre part,
les humains aiment pouvoir diviser les jetons. Une des raisons pour lesquelles les gens ont opté pour l'or comme monnaie était qu'il
était difficile de rendre la monnaie lorsque quelqu'un voulait acheter l'équivalent d'un canard en vache.

La solution consiste à garder la trace des nombres entiers, mais de compter, au lieu du jeton réel, un jeton fractionnaire qui n'a
pratiquement aucune valeur. Dans le cas de l'ether, le jeton fractionnaire est appelé wei, et 10^18 wei est égal à un
ETH. Au moment de la rédaction de cet article, 10 000 000 000 000 de wei valent environ un centime de dollar américain ou d'euro.

Les applications doivent savoir comment afficher le solde de jetons. Si un utilisateur a 3 141 000 000 000 000 000 wei, est-ce que cela fait
3,14 ETH ? 31,41 ETH ? 3 141 ETH ? Dans le cas de l'ether, il est défini que 10^18 wei valent 1 ETH, mais pour votre
jeton, vous pouvez sélectionner une valeur différente. Si la division du jeton n'a pas de sens, vous pouvez utiliser une
valeur `_decimals` de zéro. Si vous voulez utiliser la même norme que l'ETH, utilisez la valeur **18**.

### Le constructeur {#the-constructor}

```solidity
    /**
     * @dev Définit les valeurs pour {name} et {symbol}, initialise {decimals} avec
     * une valeur par défaut de 18.
     *
     * Pour sélectionner une valeur différente pour {decimals}, utilisez {_setupDecimals}.
     *
     * Ces trois valeurs sont immuables : elles ne peuvent être définies qu'une seule fois pendant
     * la construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Dans Solidity ≥0.7.0, 'public' est implicite et peut être omis.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Le constructeur est appelé lors de la création initiale du contrat. Par convention, les paramètres de fonction sont nommés `<quelquechose>_`.

### Fonctions de l'interface utilisateur {#user-interface-functions}

```solidity
    /**
     * @dev Renvoie le nom du jeton.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Renvoie le symbole du jeton, généralement une version plus courte du
     * nom.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Renvoie le nombre de décimales utilisées pour obtenir sa représentation utilisateur.
     * Par exemple, si `decimals` est égal à `2`, un solde de `505` jetons devrait
     * être affiché à un utilisateur comme `5,05` (`505 / 10 ** 2`).
     *
     * Les jetons optent généralement pour une valeur de 18, imitant la relation entre
     * l'ether et le wei. C'est la valeur que {ERC20} utilise, à moins que {_setupDecimals} ne soit
     * appelée.
     *
     * NOTE : Cette information n'est utilisée qu'à des fins d'_affichage_ : elle n'affecte
     * en aucun cas l'arithmétique du contrat, y compris
     * {IERC20-balanceOf} et {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Ces fonctions, `name`, `symbol` et `decimals` aident les interfaces utilisateur à connaître votre contrat afin qu'elles puissent l'afficher correctement.

Le type de retour est `string memory`, ce qui signifie renvoyer une chaîne de caractères stockée en mémoire. Les variables, telles que les
chaînes de caractères, peuvent être stockées à trois endroits :

|                 | Durée de vie         | Accès au contrat | Coût du gaz                                                                                  |
| --------------- | -------------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| Memory          | Appel de fonction    | Lecture/écriture | Dizaines ou centaines (plus élevé pour les emplacements plus élevés)      |
| Données d'appel | Appel de fonction    | Lecture seule    | Ne peut pas être utilisé comme type de retour, seulement comme type de paramètre de fonction |
| Stockage        | Jusqu'à modification | Lecture/écriture | Élevé (800 pour la lecture, 20k pour l'écriture)                          |

Dans ce cas, `memory` est le meilleur choix.

### Lire les informations sur le jeton {#read-token-information}

Ce sont des fonctions qui fournissent des informations sur le jeton, soit l'offre totale, soit le
solde d'un compte.

```solidity
    /**
     * @dev Voir {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La fonction `totalSupply` renvoie l'offre totale de jetons.

&nbsp;

```solidity
    /**
     * @dev Voir {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Lire le solde d'un compte. Notez que n'importe qui est autorisé à obtenir le solde du compte
de n'importe qui d'autre. Il est inutile d'essayer de cacher cette information, car elle est de toute façon disponible sur chaque
nœud. _Il n'y a pas de secrets sur la blockchain._

### Transférer des jetons {#transfer-tokens}

```solidity
    /**
     * @dev Voir {IERC20-transfer}.
     *
     * Exigences :
     *
     * - `recipient` ne peut pas être l'adresse zéro.
     * - l'appelant doit avoir un solde d'au moins `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La fonction `transfer` est appelée pour transférer des jetons du compte de l'expéditeur vers un autre. Notez
que même si elle renvoie une valeur booléenne, cette valeur est toujours **true**. Si le transfert
échoue, le contrat annule l'appel.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La fonction `_transfer` fait le travail réel. C'est une fonction privée qui ne peut être appelée que par
d'autres fonctions du contrat. Par convention, les fonctions privées sont nommées `_<quelquechose>`, comme les variables
d'état.

Normalement, dans Solidity, nous utilisons `msg.sender` pour l'expéditeur du message. Cependant, cela casse
[OpenGSN](http://opengsn.org/). Si nous voulons autoriser les transactions sans ether avec notre jeton, nous
devons utiliser `_msgSender()`. Elle renvoie `msg.sender` pour les transactions normales, mais pour celles sans ether,
elle renvoie le signataire original et non le contrat qui a relayé le message.

### Fonctions d'allocation {#allowance-functions}

Ce sont les fonctions qui implémentent la fonctionnalité d'allocation : `allowance`, `approve`, `transferFrom`,
et `_approve`. De plus, l'implémentation d'OpenZeppelin va au-delà de la norme de base pour inclure certaines fonctionnalités qui améliorent la
sécurité : `increaseAllowance` et `decreaseAllowance`.

#### La fonction d'allocation {#allowance}

```solidity
    /**
     * @dev Voir {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La fonction `allowance` permet à tout le monde de vérifier n'importe quelle allocation.

#### La fonction d'approbation {#approve}

```solidity
    /**
     * @dev Voir {IERC20-approve}.
     *
     * Exigences :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Cette fonction est appelée pour créer une allocation. Elle est similaire à la fonction `transfer` ci-dessus :

- La fonction appelle simplement une fonction interne (dans ce cas, `_approve`) qui fait le travail réel.
- La fonction renvoie soit `true` (en cas de succès), soit annule (sinon).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Nous utilisons des fonctions internes pour minimiser le nombre d'endroits où des changements d'état se produisent. Toute fonction qui modifie l'état
est un risque de sécurité potentiel qui doit être audité pour la sécurité. De cette façon, nous avons moins de chances de nous tromper.

#### La fonction transferFrom {#transferFrom}

C'est la fonction qu'un dépensier appelle pour dépenser une allocation. Cela nécessite deux opérations : transférer le montant
dépensé et réduire l'allocation de ce montant.

```solidity
    /**
     * @dev Voir {IERC20-transferFrom}.
     *
     * Émet un événement {Approval} indiquant l'allocation mise à jour. Ceci n'est pas
     * requis par l'EIP. Voir la note au début de {ERC20}.
     *
     * Exigences :
     *
     * - `sender` et `recipient` ne peuvent pas être l'adresse zéro.
     * - `sender` doit avoir un solde d'au moins `amount`.
     * - l'appelant doit avoir une allocation pour les jetons de `sender` d'au moins
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

L'appel de fonction `a.sub(b, "message")` fait deux choses. Premièrement, il calcule `a-b`, qui est la nouvelle allocation.
Deuxièmement, il vérifie que ce résultat n'est pas négatif. S'il est négatif, l'appel s'annule avec le message fourni. Notez que lorsqu'un appel s'annule, tout traitement effectué précédemment pendant cet appel est ignoré, nous n'avons donc pas besoin d'annuler
le `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Ajouts de sécurité d'OpenZeppelin {#openzeppelin-safety-additions}

Il est dangereux de définir une allocation non nulle sur une autre valeur non nulle,
car vous ne contrôlez que l'ordre de vos propres transactions, pas celles de quelqu'un d'autre. Imaginez que vous
ayez deux utilisateurs, Alice qui est naïve et Bill qui est malhonnête. Alice veut un service de la part de
Bill, qui, selon elle, coûte cinq jetons. Elle donne donc à Bill une allocation de cinq jetons.

Puis, quelque chose change et le prix de Bill passe à dix jetons. Alice, qui veut toujours le service,
envoie une transaction qui définit l'allocation de Bill à dix. Dès que Bill voit cette nouvelle transaction
dans le pool de transactions, il envoie une transaction qui dépense les cinq jetons d'Alice et a un prix de
gaz beaucoup plus élevé pour qu'elle soit minée plus rapidement. De cette façon, Bill peut d'abord dépenser cinq jetons, puis,
une fois que la nouvelle allocation d'Alice est minée, en dépenser dix de plus pour un prix total de quinze jetons, plus que ce qu'Alice
voulait autoriser. Cette technique est appelée le
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transaction d'Alice                  | Nonce d'Alice | Transaction de Bill                              | Nonce de Bill | Allocation de Bill | Revenu total de Bill provenant d'Alice |
| ------------------------------------ | ------------- | ------------------------------------------------ | ------------- | ------------------ | -------------------------------------- |
| approve(Bill, 5)  | 10            |                                                  |               | 5                  | 0                                      |
|                                      |               | transferFrom(Alice, Bill, 5)  | 10,123        | 0                  | 5                                      |
| approve(Bill, 10) | 11            |                                                  |               | 10                 | 5                                      |
|                                      |               | transferFrom(Alice, Bill, 10) | 10,124        | 0                  | 15                                     |

Pour éviter ce problème, ces deux fonctions (`increaseAllowance` et `decreaseAllowance`) vous permettent
de modifier l'allocation d'un montant spécifique. Donc, si Bill a déjà dépensé cinq jetons, il ne
pourra en dépenser que cinq de plus. Selon le moment, il y a deux façons dont cela peut fonctionner, les deux se terminant
avec Bill n'obtenant que dix jetons :

A :

| Transaction d'Alice                           | Nonce d'Alice | Transaction de Bill                             | Nonce de Bill | Allocation de Bill | Revenu total de Bill provenant d'Alice |
| --------------------------------------------- | ------------: | ----------------------------------------------- | ------------: | -----------------: | -------------------------------------- |
| approve(Bill, 5)           |            10 |                                                 |               |                  5 | 0                                      |
|                                               |               | transferFrom(Alice, Bill, 5) |        10,123 |                  0 | 5                                      |
| increaseAllowance(Bill, 5) |            11 |                                                 |               |            0+5 = 5 | 5                                      |
|                                               |               | transferFrom(Alice, Bill, 5) |        10,124 |                  0 | 10                                     |

B :

| Transaction d'Alice                           | Nonce d'Alice | Transaction de Bill                              | Nonce de Bill | Allocation de Bill | Revenu total de Bill provenant d'Alice |
| --------------------------------------------- | ------------: | ------------------------------------------------ | ------------: | -----------------: | -------------------------------------: |
| approve(Bill, 5)           |            10 |                                                  |               |                  5 |                                      0 |
| increaseAllowance(Bill, 5) |            11 |                                                  |               |           5+5 = 10 |                                      0 |
|                                               |               | transferFrom(Alice, Bill, 10) |        10,124 |                  0 |                                     10 |

```solidity
    /**
     * @dev Augmente atomiquement l'allocation accordée à `spender` par l'appelant.
     *
     * Il s'agit d'une alternative à {approve} qui peut être utilisée comme atténuation des
     * problèmes décrits dans {IERC20-approve}.
     *
     * Émet un événement {Approval} indiquant l'allocation mise à jour.
     *
     * Exigences :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La fonction `a.add(b)` est une addition sûre. Dans le cas peu probable où `a`+`b`>=`2^256`, elle ne boucle pas
comme le fait une addition normale.

```solidity

    /**
     * @dev Diminue atomiquement l'allocation accordée à `spender` par l'appelant.
     *
     * Il s'agit d'une alternative à {approve} qui peut être utilisée comme atténuation des
     * problèmes décrits dans {IERC20-approve}.
     *
     * Émet un événement {Approval} indiquant l'allocation mise à jour.
     *
     * Exigences :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     * - `spender` doit avoir une allocation pour l'appelant d'au moins
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Fonctions qui modifient les informations sur les jetons {#functions-that-modify-token-information}

Ce sont les quatre fonctions qui font le travail réel : `_transfer`, `_mint`, `_burn` et `_approve`.

#### La fonction _transfer {#_transfer}

```solidity
    /**
     * @dev Déplace un `montant` (`amount`) de jetons de `sender` à `recipient`.
     *
     * Cette fonction interne est équivalente à {transfer}, et peut être utilisée pour
     * par exemple, implémenter des frais de jeton automatiques, des mécanismes de délestage, etc.
     *
     * Émet un événement {Transfer}.
     *
     * Exigences :
     *
     * - `sender` ne peut pas être l'adresse zéro.
     * - `recipient` ne peut pas être l'adresse zéro.
     * - `sender` doit avoir un solde d'au moins `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Cette fonction, `_transfer`, transfère des jetons d'un compte à un autre. Elle est appelée à la fois par
`transfer` (pour les transferts depuis le propre compte de l'expéditeur) et `transferFrom` (pour utiliser des allocations
pour transférer depuis le compte de quelqu'un d'autre).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Personne ne possède réellement l'adresse zéro dans Ethereum (c'est-à-dire que personne ne connaît une clé privée dont la clé publique correspondante
est transformée en adresse zéro). Lorsque les gens utilisent cette adresse, il s'agit généralement d'un bogue logiciel. Nous échouons donc
si l'adresse zéro est utilisée comme expéditeur ou destinataire.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Il existe deux façons d'utiliser ce contrat :

1. L'utiliser comme modèle pour votre propre code
2. [En hériter](https://www.bitdegree.org/learn/solidity-inheritance), et ne remplacer que les fonctions que vous devez modifier

La deuxième méthode est bien meilleure car le code ERC-20 d'OpenZeppelin a déjà été audité et s'est avéré sécurisé. Lorsque vous utilisez l'héritage,
les fonctions que vous modifiez sont claires, et pour faire confiance à votre contrat, les gens n'ont besoin que d'auditer ces fonctions spécifiques.

Il est souvent utile d'exécuter une fonction chaque fois que des jetons changent de mains. Cependant, `_transfer` est une fonction très importante et il est
possible de l'écrire de manière non sécurisée (voir ci-dessous), il est donc préférable de ne pas la remplacer. La solution est `_beforeTokenTransfer`, une
[fonction hook](https://wikipedia.org/wiki/Hooking). Vous pouvez remplacer cette fonction, et elle sera appelée à chaque transfert.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Ce sont les lignes qui effectuent réellement le transfert. Notez qu'il n'y a **rien** entre elles, et que nous soustrayons
le montant transféré de l'expéditeur avant de l'ajouter au destinataire. C'est important car s'il y avait un
appel à un contrat différent entre les deux, il aurait pu être utilisé pour tromper ce contrat. De cette façon, le transfert
est atomique, rien ne peut se produire au milieu de celui-ci.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Enfin, émettre un événement `Transfer`. Les événements ne sont pas accessibles aux contrats intelligents, mais le code s'exécutant en dehors de la blockchain
peut écouter les événements et y réagir. Par exemple, un portefeuille peut suivre le moment où le propriétaire obtient plus de jetons.

#### Les fonctions _mint et _burn {#_mint-and-_burn}

Ces deux fonctions (`_mint` et `_burn`) modifient l'offre totale de jetons.
Elles sont internes et aucune fonction ne les appelle dans ce contrat,
elles ne sont donc utiles que si vous héritez du contrat et ajoutez votre propre
logique pour décider dans quelles conditions frapper de nouveaux jetons ou brûler des jetons
existants.

**NOTE :** Chaque jeton ERC-20 a sa propre logique métier qui dicte la gestion des jetons.
Par exemple, un contrat à offre fixe peut n'appeler `_mint`
que dans le constructeur et ne jamais appeler `_burn`. Un contrat qui vend des jetons
appellera `_mint` lorsqu'il sera payé, et appellera vraisemblablement `_burn` à un certain moment
pour éviter une inflation galopante.

```solidity
    /** @dev Crée un `montant` (`amount`) de jetons et les assigne à un `compte` (`account`), augmentant
     * l'offre totale.
     *
     * Émet un événement {Transfer} avec `from` défini sur l'adresse zéro.
     *
     * Exigences :
     *
     * - `to` ne peut pas être l'adresse zéro.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Assurez-vous de mettre à jour `_totalSupply` lorsque le nombre total de jetons change.

&nbsp;

```solidity
    /**
     * @dev Détruit un `montant` (`amount`) de jetons du `compte` (`account`), réduisant
     * l'offre totale.
     *
     * Émet un événement {Transfer} avec `to` défini sur l'adresse zéro.
     *
     * Exigences :
     *
     * - `account` ne peut pas être l'adresse zéro.
     * - `account` doit avoir au moins un `montant` (`amount`) de jetons.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La fonction `_burn` est presque identique à `_mint`, sauf qu'elle va dans l'autre sens.

#### La fonction _approve {#_approve}

C'est la fonction qui spécifie réellement les allocations. Notez qu'elle permet à un propriétaire de spécifier
une allocation supérieure au solde actuel du propriétaire. Ce n'est pas un problème car le solde est
vérifié au moment du transfert, alors qu'il pourrait être différent du solde au moment de la création de l'allocation
.

```solidity
    /**
     * @dev Définit un `montant` (`amount`) comme allocation de `spender` sur les jetons de `owner`.
     *
     * Cette fonction interne est équivalente à `approve`, et peut être utilisée pour
     * par exemple, définir des allocations automatiques pour certains sous-systèmes, etc.
     *
     * Émet un événement {Approval}.
     *
     * Exigences :
     *
     * - `owner` ne peut pas être l'adresse zéro.
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Émettre un événement `Approval`. Selon la façon dont l'application est écrite, le contrat du dépensier peut être informé de l'approbation
soit par le propriétaire, soit par un serveur qui écoute ces événements.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modifier la variable des décimales {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Définit {decimals} sur une valeur autre que celle par défaut de 18.
     *
     * AVERTISSEMENT : Cette fonction ne doit être appelée que depuis le constructeur. La plupart des
     * applications qui interagissent avec les contrats de jeton ne s'attendront pas à ce que
     * {decimals} change, et pourraient fonctionner de manière incorrecte si c'est le cas.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Cette fonction modifie la variable `_decimals` qui est utilisée pour indiquer aux interfaces utilisateur comment interpréter le montant.
Vous devez l'appeler depuis le constructeur. Il serait malhonnête de l'appeler à un moment ultérieur, et les applications
ne sont pas conçues pour le gérer.

### Crochets {#hooks}

```solidity

    /**
     * @dev Hook appelé avant tout transfert de jetons. Cela inclut
     * la frappe et la brûlure.
     *
     * Conditions d'appel :
     *
     * - lorsque `from` et `to` sont tous deux non nuls, un `montant` de jetons de `from`
     * sera transféré à `to`.
     * - lorsque `from` est zéro, un `montant` de jetons sera frappé pour `to`.
     * - lorsque `to` est zéro, un `montant` de jetons de `from` sera brûlé.
     * - `from` et `to` ne sont jamais tous les deux nuls.
     *
     * Pour en savoir plus sur les hooks, rendez-vous sur xref:ROOT:extending-contracts.adoc#using-hooks[Utilisation des hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Il s'agit de la fonction hook à appeler pendant les transferts. Elle est vide ici, mais si vous avez besoin
qu'elle fasse quelque chose, il vous suffit de la remplacer.

## Conclusion {#conclusion}

Pour résumer, voici quelques-unes des idées les plus importantes de ce contrat (à mon avis, le vôtre est susceptible de varier) :

- _Il n'y a pas de secret sur la blockchain_. Toute information à laquelle un contrat intelligent peut accéder
  est disponible pour le monde entier.
- Vous pouvez contrôler l'ordre de vos propres transactions, mais pas quand les transactions d'autres personnes
  ont lieu. C'est la raison pour laquelle la modification d'une allocation peut être dangereuse, car elle permet
  au dépensier de dépenser la somme des deux allocations.
- Les valeurs de type `uint256` se bouclent. En d'autres termes, _0-1=2^256-1_. Si ce n'est pas le comportement souhaité,
  vous devez le vérifier (ou utiliser la bibliothèque SafeMath qui le fait pour vous). Notez que cela a changé dans
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Effectuez tous les changements d'état d'un type spécifique à un endroit spécifique, car cela facilite l'audit.
  C'est la raison pour laquelle nous avons, par exemple, `_approve`, qui est appelé par `approve`, `transferFrom`,
  `increaseAllowance` et `decreaseAllowance`
- Les changements d'état doivent être atomiques, sans aucune autre action au milieu (comme vous pouvez le voir
  dans `_transfer`). C'est parce que pendant le changement d'état, vous avez un état incohérent. Par exemple,
  entre le moment où vous déduisez du solde de l'expéditeur et le moment où vous ajoutez au solde du
  destinataire, il y a moins de jetons en circulation qu'il ne devrait y en avoir. Cela pourrait être potentiellement exploité s'il y a
  des opérations entre eux, en particulier des appels à un contrat différent.

Maintenant que vous avez vu comment le contrat OpenZeppelin ERC-20 est écrit, et surtout comment il est
rendu plus sécurisé, allez écrire vos propres contrats et applications sécurisés.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).
