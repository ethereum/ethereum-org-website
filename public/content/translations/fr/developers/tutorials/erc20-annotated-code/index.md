---
title: "Examen détaillé du contrat ERC-20"
description: Que contient le contrat ERC-20 d'OpenZeppelin et pourquoi ?
author: Ori Pomerantz
lang: fr
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "Examen détaillé de l'ERC-20"
published: 2021-03-09
---

## Introduction {#introduction}

L'une des utilisations les plus courantes d'Ethereum est la création par un groupe d'un jeton échangeable, en un sens leur propre monnaie. Ces jetons suivent généralement un standard, l'[ERC-20](/developers/docs/standards/tokens/erc-20/). Ce standard permet d'écrire des outils, tels que des réserves de liquidité et des portefeuilles, qui fonctionnent avec tous les jetons ERC-20. Dans cet article, nous analyserons l'[implémentation ERC20 en Solidity d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), ainsi que la [définition de l'interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Il s'agit d'un code source annoté. Si vous souhaitez implémenter l'ERC-20, [lisez ce tutoriel](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## L'interface {#the-interface}

L'objectif d'un standard comme l'ERC-20 est de permettre de nombreuses implémentations de jetons qui soient interopérables entre les applications, comme les portefeuilles et les échanges décentralisés. Pour y parvenir, nous créons une [interface](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Tout code qui doit utiliser le contrat de jeton peut utiliser les mêmes définitions dans l'interface et être compatible avec tous les contrats de jetons qui l'utilisent, qu'il s'agisse d'un portefeuille tel que MetaMask, d'une application décentralisée (dapp) telle qu'Etherscan.io, ou d'un contrat différent tel qu'une réserve de liquidité.

![Illustration of the ERC-20 interface](erc20_interface.png)

Si vous êtes un programmeur expérimenté, vous vous souvenez probablement avoir vu des constructions similaires en [Java](https://www.w3schools.com/java/java_interface.asp) ou même dans des [fichiers d'en-tête C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Voici une définition de l'[interface ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) d'OpenZeppelin. Il s'agit d'une traduction du [standard lisible par l'homme](https://eips.ethereum.org/EIPS/eip-20) en code Solidity. Bien sûr, l'interface elle-même ne définit pas _comment_ faire quoi que ce soit. Cela est expliqué dans le code source du contrat ci-dessous.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Les fichiers Solidity sont censés inclure un identifiant de licence. [Vous pouvez voir la liste des licences ici](https://spdx.org/licenses/). Si vous avez besoin d'une licence différente, expliquez-le simplement dans les commentaires.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Le langage Solidity évolue encore rapidement, et les nouvelles versions peuvent ne pas être compatibles avec l'ancien code ([voir ici](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Par conséquent, il est judicieux de spécifier non seulement une version minimale du langage, mais aussi une version maximale, la dernière avec laquelle vous avez testé le code.

&nbsp;

```solidity
/**
 * @dev Interface du standard ERC-20 telle que définie dans l'EIP.
 */
```

Le `@dev` dans le commentaire fait partie du [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), utilisé pour produire de la documentation à partir du code source.

&nbsp;

```solidity
interface IERC20 {
```

Par convention, les noms d'interface commencent par `I`.

&nbsp;

```solidity
    /**
     * @dev Retourne la quantité de jetons en existence.
     */
    function totalSupply() external view returns (uint256);
```

Cette fonction est `external`, ce qui signifie qu'[elle ne peut être appelée que de l'extérieur du contrat](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Elle renvoie l'offre totale de jetons dans le contrat. Cette valeur est renvoyée en utilisant le type le plus courant dans Ethereum, un entier non signé de 256 bits (256 bits est la taille de mot native de l'EVM). Cette fonction est également une `view`, ce qui signifie qu'elle ne modifie pas l'état, elle peut donc être exécutée sur un seul nœud au lieu que chaque nœud de la chaîne de blocs l'exécute. Ce type de fonction ne génère pas de transaction et ne coûte pas de [gaz](/developers/docs/gas/).

**Remarque :** En théorie, il pourrait sembler que le créateur d'un contrat puisse tricher en renvoyant une offre totale inférieure à la valeur réelle, faisant paraître chaque jeton plus précieux qu'il ne l'est en réalité. Cependant, cette crainte ignore la véritable nature de la chaîne de blocs. Tout ce qui se passe sur la chaîne de blocs peut être vérifié par chaque nœud. Pour y parvenir, le code en langage machine et le stockage de chaque contrat sont disponibles sur chaque nœud. Bien que vous ne soyez pas obligé de publier le code Solidity de votre contrat, personne ne vous prendrait au sérieux à moins que vous ne publiiez le code source et la version de Solidity avec laquelle il a été compilé, afin qu'il puisse être vérifié par rapport au code en langage machine que vous avez fourni.
Par exemple, voir [ce contrat](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Retourne la quantité de jetons possédés par `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Comme son nom l'indique, `balanceOf` renvoie le solde d'un compte. Les comptes Ethereum sont identifiés dans Solidity à l'aide du type `address`, qui contient 160 bits. Elle est également `external` et `view`.

&nbsp;

```solidity
    /**
     * @dev Déplace `amount` jetons du compte de l'appelant vers `recipient`.
     *
     * Retourne une valeur booléenne indiquant si l'opération a réussi.
     *
     * Émet un événement {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La fonction `transfer` effectue un transfert de jetons de l'appelant vers une adresse différente. Cela implique un changement d'état, ce n'est donc pas une `view`. Lorsqu'un utilisateur appelle cette fonction, cela crée une transaction et coûte du gaz. Elle émet également un événement, `Transfer`, pour informer tout le monde sur la chaîne de blocs de l'événement.

La fonction a deux types de sortie pour deux types d'appelants différents :

- Les utilisateurs qui appellent la fonction directement depuis une interface utilisateur. Généralement, l'utilisateur soumet une transaction et n'attend pas de réponse, ce qui pourrait prendre un temps indéfini. L'utilisateur peut voir ce qui s'est passé en cherchant le reçu de la transaction (qui est identifié par le hachage de transaction) ou en cherchant l'événement `Transfer`.
- D'autres contrats, qui appellent la fonction dans le cadre d'une transaction globale. Ces contrats obtiennent le résultat immédiatement, car ils s'exécutent dans la même transaction, ils peuvent donc utiliser la valeur de retour de la fonction.

Le même type de sortie est créé par les autres fonctions qui modifient l'état du contrat.

&nbsp;

Les allocations permettent à un compte de dépenser des jetons qui appartiennent à un propriétaire différent. C'est utile, par exemple, pour les contrats qui agissent en tant que vendeurs. Les contrats ne peuvent pas surveiller les événements, donc si un acheteur devait transférer des jetons directement au contrat du vendeur, ce contrat ne saurait pas qu'il a été payé. Au lieu de cela, l'acheteur permet au contrat du vendeur de dépenser un certain montant, et le vendeur transfère ce montant. Cela se fait via une fonction que le contrat du vendeur appelle, afin que le contrat du vendeur puisse savoir si elle a réussi.

```solidity
    /**
     * @dev Retourne le nombre restant de jetons que `spender` sera
     * autorisé à dépenser au nom de `owner` via {transferFrom}. Ceci est
     * zéro par défaut.
     *
     * Cette valeur change lorsque {approve} ou {transferFrom} sont appelés.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La fonction `allowance` permet à quiconque de demander quelle est l'allocation qu'une adresse (`owner`) permet à une autre adresse (`spender`) de dépenser.

&nbsp;

```solidity
    /**
     * @dev Définit `amount` comme l'allocation de `spender` sur les jetons de l'appelant.
     *
     * Retourne une valeur booléenne indiquant si l'opération a réussi.
     *
     * IMPORTANT : Attention, changer une allocation avec cette méthode comporte le risque
     * que quelqu'un puisse utiliser à la fois l'ancienne et la nouvelle allocation suite à un ordre
     * de transaction malheureux. Une solution possible pour atténuer cette condition
     * de concurrence est de d'abord réduire l'allocation du dépensier à 0 puis de définir la
     * valeur désirée ensuite :
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Émet un événement {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La fonction `approve` crée une allocation. Assurez-vous de lire le message sur la façon dont elle peut être détournée. Dans Ethereum, vous contrôlez l'ordre de vos propres transactions, mais vous ne pouvez pas contrôler l'ordre dans lequel les transactions des autres personnes seront exécutées, à moins que vous ne soumettiez votre propre transaction qu'après avoir vu que la transaction de l'autre partie a eu lieu.

&nbsp;

```solidity
    /**
     * @dev Déplace `amount` jetons de `sender` vers `recipient` en utilisant le
     * mécanisme d'allocation. `amount` est ensuite déduit de l'allocation
     * de l'appelant.
     *
     * Retourne une valeur booléenne indiquant si l'opération a réussi.
     *
     * Émet un événement {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Enfin, `transferFrom` est utilisée par le dépensier pour dépenser réellement l'allocation.

&nbsp;

```solidity

    /**
     * @dev Émis lorsque `value` jetons sont déplacés d'un compte (`from`) vers
     * un autre (`to`).
     *
     * Notez que `value` peut être zéro.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Émis lorsque l'allocation d'un `spender` pour un `owner` est définie par
     * un appel à {approve}. `value` est la nouvelle allocation.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Ces événements sont émis lorsque l'état du contrat ERC-20 change.

## Le contrat réel {#the-actual-contract}

Il s'agit du contrat réel qui implémente le standard ERC-20, [tiré d'ici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Il n'est pas destiné à être utilisé tel quel, mais vous pouvez en [hériter](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) pour l'étendre à quelque chose d'utilisable.

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

- `GSN/Context.sol` contient les définitions requises pour utiliser [OpenGSN](https://www.opengsn.org/), un système qui permet aux utilisateurs sans ether d'utiliser la chaîne de blocs. Notez qu'il s'agit d'une ancienne version, si vous souhaitez vous intégrer à OpenGSN, [utilisez ce tutoriel](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La bibliothèque SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), qui empêche les dépassements de capacité arithmétiques (overflows/underflows) pour les versions de Solidity **&lt;0.8.0**. Dans Solidity ≥0.8.0, les opérations arithmétiques s'annulent automatiquement en cas de dépassement de capacité, rendant SafeMath inutile. Ce contrat utilise SafeMath pour la rétrocompatibilité avec les anciennes versions du compilateur.

&nbsp;

Ce commentaire explique l'objectif du contrat.

```solidity
/**
 * @dev Implémentation de l'interface {IERC20}.
 *
 * Cette implémentation est agnostique quant à la façon dont les jetons sont créés. Cela signifie
 * qu'un mécanisme d'approvisionnement doit être ajouté dans un contrat dérivé en utilisant {_mint}.
 * Pour un mécanisme générique, voir {ERC20PresetMinterPauser}.
 *
 * ASTUCE : Pour une description détaillée, consultez notre guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Nous avons suivi les directives générales d'OpenZeppelin : les fonctions s'annulent au lieu
 * de retourner `false` en cas d'échec. Ce comportement est néanmoins conventionnel
 * et n'entre pas en conflit avec les attentes des applications ERC-20.
 *
 * De plus, un événement {Approval} est émis lors des appels à {transferFrom}.
 * Cela permet aux applications de reconstruire l'allocation pour tous les comptes simplement
 * en écoutant lesdits événements. D'autres implémentations de l'EIP peuvent ne pas émettre
 * ces événements, car ce n'est pas requis par la spécification.
 *
 * Enfin, les fonctions non standard {decreaseAllowance} et {increaseAllowance}
 * ont été ajoutées pour atténuer les problèmes bien connus autour de la définition
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

Cette ligne attache la bibliothèque `SafeMath` au type `uint256`. Vous pouvez trouver cette bibliothèque [ici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Définitions des variables {#variable-definitions}

Ces définitions spécifient les variables d'état du contrat. Ces variables sont déclarées `private`, mais cela signifie seulement que les autres contrats sur la chaîne de blocs ne peuvent pas les lire. _Il n'y a pas de secrets sur la chaîne de blocs_, le logiciel sur chaque nœud possède l'état de chaque contrat à chaque bloc. Par convention, les variables d'état sont nommées `_<something>`.

Les deux premières variables sont des [mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), ce qui signifie qu'elles se comportent à peu près de la même manière que des [tableaux associatifs](https://wikipedia.org/wiki/Associative_array), sauf que les clés sont des valeurs numériques. Le stockage n'est alloué que pour les entrées qui ont des valeurs différentes de la valeur par défaut (zéro).

```solidity
    mapping (address => uint256) private _balances;
```

Le premier mapping, `_balances`, correspond aux adresses et à leurs soldes respectifs de ce jeton. Pour accéder au solde, utilisez cette syntaxe : `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Cette variable, `_allowances`, stocke les allocations expliquées précédemment. Le premier indice est le propriétaire des jetons, et le second est le contrat avec l'allocation. Pour accéder au montant que l'adresse A peut dépenser depuis le compte de l'adresse B, utilisez `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Comme son nom l'indique, cette variable garde une trace de l'offre totale de jetons.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Ces trois variables sont utilisées pour améliorer la lisibilité. Les deux premières sont explicites, mais `_decimals` ne l'est pas.

D'une part, Ethereum n'a pas de variables à virgule flottante ou fractionnaires. D'autre part, les humains aiment pouvoir diviser les jetons. L'une des raisons pour lesquelles les gens ont choisi l'or comme monnaie était qu'il était difficile de rendre la monnaie quand quelqu'un voulait acheter l'équivalent d'un canard en vache.

La solution consiste à garder une trace des entiers, mais à compter à la place du jeton réel un jeton fractionnaire qui n'a presque aucune valeur. Dans le cas de l'ether, le jeton fractionnaire s'appelle le Wei, et 10^18 Wei équivalent à un ETH. Au moment de la rédaction, 10 000 000 000 000 Wei valent environ un centime américain ou européen.

Les applications doivent savoir comment afficher le solde du jeton. Si un utilisateur a 3 141 000 000 000 000 000 Wei, est-ce 3,14 ETH ? 31,41 ETH ? 3 141 ETH ? Dans le cas de l'ether, il est défini 10^18 Wei pour un ETH, mais pour votre jeton, vous pouvez sélectionner une valeur différente. Si diviser le jeton n'a pas de sens, vous pouvez utiliser une valeur `_decimals` de zéro. Si vous souhaitez utiliser le même standard que l'ETH, utilisez la valeur **18**.

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

Le constructeur est appelé lors de la première création du contrat. Par convention, les paramètres de fonction sont nommés `<something>_`.

### Fonctions de l'interface utilisateur {#user-interface-functions}

```solidity
    /**
     * @dev Retourne le nom du jeton.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Retourne le symbole du jeton, généralement une version plus courte du
     * nom.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Retourne le nombre de décimales utilisées pour obtenir sa représentation utilisateur.
     * Par exemple, si `decimals` vaut `2`, un solde de `505` jetons devrait
     * être affiché à un utilisateur comme `5,05` (`505 / 10 ** 2`).
     *
     * Les jetons optent généralement pour une valeur de 18, imitant la relation entre
     * ether et Wei. C'est la valeur qu'utilise {ERC20}, à moins que {_setupDecimals} ne soit
     * appelé.
     *
     * REMARQUE : Cette information est uniquement utilisée à des fins d'_affichage_ : elle
     * n'affecte en rien l'arithmétique du contrat, y compris
     * {IERC20-balanceOf} et {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Ces fonctions, `name`, `symbol` et `decimals` aident les interfaces utilisateur à connaître votre contrat afin qu'elles puissent l'afficher correctement.

Le type de retour est `string memory`, ce qui signifie renvoyer une chaîne de caractères stockée en mémoire. Les variables, telles que les chaînes de caractères, peuvent être stockées à trois emplacements :

| | Durée de vie | Accès au contrat | Coût en gaz |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Mémoire | Appel de fonction | Lecture/Écriture | Des dizaines ou des centaines (plus élevé pour les emplacements supérieurs) |
| Données d'appel | Appel de fonction | Lecture seule | Ne peut pas être utilisé comme type de retour, uniquement comme type de paramètre de fonction |
| Stockage | Jusqu'à modification | Lecture/Écriture | Élevé (800 pour la lecture, 20k pour l'écriture) |

Dans ce cas, `memory` est le meilleur choix.

### Lire les informations du jeton {#read-token-information}

Ce sont des fonctions qui fournissent des informations sur le jeton, soit l'offre totale, soit le solde d'un compte.

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

Lire le solde d'un compte. Notez que n'importe qui est autorisé à obtenir le solde du compte de n'importe qui d'autre. Il ne sert à rien d'essayer de cacher cette information, car elle est de toute façon disponible sur chaque nœud. _Il n'y a pas de secrets sur la chaîne de blocs._

### Transférer des jetons {#transfer-tokens}

```solidity
    /**
     * @dev Voir {IERC20-transfer}.
     *
     * Exigences :
     *
     * - `recipient` ne peut pas être l'adresse zéro.
     * - l'appelant doit avoir un solde d'au moins `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La fonction `transfer` est appelée pour effectuer un transfert de jetons du compte de l'expéditeur vers un autre. Notez que même si elle renvoie une valeur booléenne, cette valeur est toujours **true**. Si le transfert échoue, le contrat annule l'appel.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La fonction `_transfer` fait le travail réel. C'est une fonction privée qui ne peut être appelée que par d'autres fonctions du contrat. Par convention, les fonctions privées sont nommées `_<something>`, tout comme les variables d'état.

Normalement, dans Solidity, nous utilisons `msg.sender` pour l'expéditeur du message. Cependant, cela casse [OpenGSN](https://opengsn.org/). Si nous voulons autoriser les transactions sans ether avec notre jeton, nous devons utiliser `_msgSender()`. Elle renvoie `msg.sender` pour les transactions normales, mais pour celles sans ether, elle renvoie le signataire d'origine et non le contrat qui a relayé le message.

### Fonctions d'allocation {#allowance-functions}

Ce sont les fonctions qui implémentent la fonctionnalité d'allocation : `allowance`, `approve`, `transferFrom` et `_approve`. De plus, l'implémentation d'OpenZeppelin va au-delà du standard de base pour inclure certaines fonctionnalités qui améliorent la sécurité : `increaseAllowance` et `decreaseAllowance`.

#### La fonction allowance {#allowance}

```solidity
    /**
     * @dev Voir {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La fonction `allowance` permet à tout le monde de vérifier n'importe quelle allocation.

#### La fonction approve {#approve}

```solidity
    /**
     * @dev Voir {IERC20-approve}.
     *
     * Exigences :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Cette fonction est appelée pour créer une allocation. Elle est similaire à la fonction `transfer` ci-dessus :

- La fonction appelle simplement une fonction interne (dans ce cas, `_approve`) qui fait le vrai travail.
- La fonction renvoie soit `true` (en cas de succès), soit elle annule (sinon).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Nous utilisons des fonctions internes pour minimiser le nombre d'endroits où des changements d'état se produisent. _Toute_ fonction qui modifie l'état est un risque de sécurité potentiel qui doit être audité pour la sécurité. De cette façon, nous avons moins de chances de nous tromper.

#### La fonction transferFrom {#transferfrom}

C'est la fonction qu'un dépensier appelle pour dépenser une allocation. Cela nécessite deux opérations : transférer le montant dépensé et réduire l'allocation de ce montant.

```solidity
    /**
     * @dev Voir {IERC20-transferFrom}.
     *
     * Émet un événement {Approval} indiquant l'allocation mise à jour. Ce n'est pas
     * requis par l'EIP. Voir la note au début de {ERC20}.
     *
     * Exigences :
     *
     * - `sender` et `recipient` ne peuvent pas être l'adresse zéro.
     * - `sender` doit avoir un solde d'au moins `amount`.
     * - l'appelant doit avoir une allocation pour les jetons de ``sender`` d'au moins
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

L'appel de la fonction `a.sub(b, "message")` fait deux choses. Premièrement, il calcule `a-b`, qui est la nouvelle allocation. Deuxièmement, il vérifie que ce résultat n'est pas négatif. S'il est négatif, l'appel s'annule avec le message fourni. Notez que lorsqu'un appel s'annule, tout traitement effectué précédemment pendant cet appel est ignoré, nous n'avons donc pas besoin de défaire le `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Ajouts de sécurité d'OpenZeppelin {#openzeppelin-safety-additions}

Il est dangereux de définir une allocation non nulle à une autre valeur non nulle, car vous ne contrôlez que l'ordre de vos propres transactions, pas celles des autres. Imaginez que vous ayez deux utilisateurs, Alice qui est naïve et Bill qui est malhonnête. Alice veut un service de Bill, qui, selon elle, coûte cinq jetons - elle donne donc à Bill une allocation de cinq jetons.

Puis quelque chose change et le prix de Bill passe à dix jetons. Alice, qui veut toujours le service, envoie une transaction qui fixe l'allocation de Bill à dix. Au moment où Bill voit cette nouvelle transaction dans le pool de transactions, il envoie une transaction qui dépense les cinq jetons d'Alice et a un prix du gaz beaucoup plus élevé afin qu'elle soit minée plus rapidement. De cette façon, Bill peut d'abord dépenser cinq jetons, puis, une fois la nouvelle allocation d'Alice minée, en dépenser dix de plus pour un prix total de quinze jetons, plus que ce qu'Alice avait l'intention d'autoriser. Cette technique s'appelle le [front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transaction d'Alice | Nonce d'Alice | Transaction de Bill | Nonce de Bill | Allocation de Bill | Revenu total de Bill provenant d'Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5) | 10 | | | 5 | 0 |
| | | transferFrom(Alice, Bill, 5) | 10,123 | 0 | 5 |
| approve(Bill, 10) | 11 | | | 10 | 5 |
| | | transferFrom(Alice, Bill, 10) | 10,124 | 0 | 15 |

Pour éviter ce problème, ces deux fonctions (`increaseAllowance` et `decreaseAllowance`) vous permettent de modifier l'allocation d'un montant spécifique. Donc, si Bill avait déjà dépensé cinq jetons, il ne pourra en dépenser que cinq de plus. Selon le moment, il y a deux façons dont cela peut fonctionner, qui se terminent toutes deux par le fait que Bill n'obtient que dix jetons :

A :

| Transaction d'Alice | Nonce d'Alice | Transaction de Bill | Nonce de Bill | Allocation de Bill | Revenu total de Bill provenant d'Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5) | 10 | | | 5 | 0 |
| | | transferFrom(Alice, Bill, 5) | 10,123 | 0 | 5 |
| increaseAllowance(Bill, 5) | 11 | | | 0+5 = 5 | 5 |
| | | transferFrom(Alice, Bill, 5) | 10,124 | 0 | 10 |

B :

| Transaction d'Alice | Nonce d'Alice | Transaction de Bill | Nonce de Bill | Allocation de Bill | Revenu total de Bill provenant d'Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5) | 10 | | | 5 | 0 |
| increaseAllowance(Bill, 5) | 11 | | | 5+5 = 10 | 0 |
| | | transferFrom(Alice, Bill, 10) | 10,124 | 0 | 10 |

```solidity
    /**
     * @dev Augmente de manière atomique l'allocation accordée à `spender` par l'appelant.
     *
     * C'est une alternative à {approve} qui peut être utilisée comme atténuation pour
     * les problèmes décrits dans {IERC20-approve}.
     *
     * Émet un événement {Approval} indiquant l'allocation mise à jour.
     *
     * Exigences :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La fonction `a.add(b)` est une addition sécurisée. Dans le cas peu probable où `a`+`b`>=`2^256`, elle ne boucle pas (wrap around) comme le fait une addition normale.

```solidity

    /**
     * @dev Diminue de manière atomique l'allocation accordée à `spender` par l'appelant.
     *
     * C'est une alternative à {approve} qui peut être utilisée comme atténuation pour
     * les problèmes décrits dans {IERC20-approve}.
     *
     * Émet un événement {Approval} indiquant l'allocation mise à jour.
     *
     * Exigences :
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

### Fonctions qui modifient les informations du jeton {#functions-that-modify-token-information}

Ce sont les quatre fonctions qui font le travail réel : `_transfer`, `_mint`, `_burn` et `_approve`.

#### La fonction _transfer {#transfer}

```solidity
    /**
     * @dev Déplace `amount` jetons de `sender` vers `recipient`.
     *
     * Cette fonction interne est équivalente à {transfer}, et peut être utilisée pour
     * par ex., implémenter des frais de jeton automatiques, des mécanismes de réduction, etc.
     *
     * Émet un événement {Transfer}.
     *
     * Exigences :
     *
     * - `sender` ne peut pas être l'adresse zéro.
     * - `recipient` ne peut pas être l'adresse zéro.
     * - `sender` doit avoir un solde d'au moins `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Cette fonction, `_transfer`, effectue un transfert de jetons d'un compte à un autre. Elle est appelée à la fois par `transfer` (pour les transferts depuis le propre compte de l'expéditeur) et `transferFrom` (pour utiliser les allocations afin de transférer depuis le compte de quelqu'un d'autre).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Personne ne possède réellement l'adresse zéro dans Ethereum (c'est-à-dire que personne ne connaît une clé privée dont la clé publique correspondante est transformée en adresse zéro). Lorsque les gens utilisent cette adresse, il s'agit généralement d'un bogue logiciel - nous échouons donc si l'adresse zéro est utilisée comme expéditeur ou destinataire.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Il y a deux façons d'utiliser ce contrat :

1. L'utiliser comme modèle pour votre propre code
1. [En hériter](https://www.bitdegree.org/learn/solidity-inheritance), et ne remplacer que les fonctions que vous devez modifier

La deuxième méthode est bien meilleure car le code ERC-20 d'OpenZeppelin a déjà été audité et s'est avéré sécurisé. Lorsque vous utilisez l'héritage, les fonctions que vous modifiez sont claires, et pour faire confiance à votre contrat, les gens n'ont besoin d'auditer que ces fonctions spécifiques.

Il est souvent utile d'exécuter une fonction chaque fois que des jetons changent de mains. Cependant, `_transfer` est une fonction très importante et il est possible de l'écrire de manière non sécurisée (voir ci-dessous), il est donc préférable de ne pas la remplacer. La solution est `_beforeTokenTransfer`, une [fonction de hook](https://wikipedia.org/wiki/Hooking). Vous pouvez remplacer cette fonction, et elle sera appelée à chaque transfert.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Ce sont les lignes qui effectuent réellement le transfert. Notez qu'il n'y a **rien** entre elles, et que nous soustrayons le montant transféré de l'expéditeur avant de l'ajouter au destinataire. C'est important car s'il y avait un appel à un contrat différent au milieu, il aurait pu être utilisé pour tromper ce contrat. De cette façon, le transfert est atomique, rien ne peut se passer au milieu.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Enfin, émettre un événement `Transfer`. Les événements ne sont pas accessibles aux contrats intelligents, mais le code s'exécutant en dehors de la chaîne de blocs peut écouter les événements et y réagir. Par exemple, un portefeuille peut garder une trace du moment où le propriétaire obtient plus de jetons.

#### Les fonctions _mint et _burn {#mint-and-burn}

Ces deux fonctions (`_mint` et `_burn`) modifient l'offre totale de jetons. Elles sont internes et aucune fonction ne les appelle dans ce contrat, elles ne sont donc utiles que si vous héritez du contrat et ajoutez votre propre logique pour décider dans quelles conditions frapper de nouveaux jetons ou brûler ceux existants.

**REMARQUE :** Chaque jeton ERC-20 a sa propre logique métier qui dicte la gestion des jetons. Par exemple, un contrat à offre fixe pourrait n'appeler `_mint` que dans le constructeur et ne jamais appeler `_burn`. Un contrat qui vend des jetons appellera `_mint` lorsqu'il sera payé, et appellera vraisemblablement `_burn` à un moment donné pour éviter une inflation galopante.

```solidity
    /** @dev Crée `amount` jetons et les assigne à `account`, augmentant
     * l'offre totale.
     *
     * Émet un événement {Transfer} avec `from` défini sur l'adresse zéro.
     *
     * Exigences :
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
     * @dev Détruit `amount` jetons de `account`, réduisant
     * l'offre totale.
     *
     * Émet un événement {Transfer} avec `to` défini sur l'adresse zéro.
     *
     * Exigences :
     *
     * - `account` ne peut pas être l'adresse zéro.
     * - `account` doit avoir au moins `amount` jetons.
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

#### La fonction _approve {#approve-2}

C'est la fonction qui spécifie réellement les allocations. Notez qu'elle permet à un propriétaire de spécifier une allocation supérieure au solde actuel du propriétaire. C'est acceptable car le solde est vérifié au moment du transfert, lorsqu'il pourrait être différent du solde au moment de la création de l'allocation.

```solidity
    /**
     * @dev Définit `amount` comme l'allocation de `spender` sur les jetons de `owner`.
     *
     * Cette fonction interne est équivalente à `approve`, et peut être utilisée pour
     * par ex., définir des allocations automatiques pour certains sous-systèmes, etc.
     *
     * Émet un événement {Approval}.
     *
     * Exigences :
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

Émettre un événement `Approval`. Selon la façon dont l'application est écrite, le contrat du dépensier peut être informé de l'approbation soit par le propriétaire, soit par un serveur qui écoute ces événements.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modifier la variable Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Définit {decimals} à une valeur autre que celle par défaut de 18.
     *
     * AVERTISSEMENT : Cette fonction ne devrait être appelée que depuis le constructeur. La plupart
     * des applications qui interagissent avec les contrats de jeton ne s'attendront pas
     * à ce que {decimals} change un jour, et pourraient fonctionner de manière incorrecte si c'est le cas.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Cette fonction modifie la variable `_decimals` qui est utilisée pour indiquer aux interfaces utilisateur comment interpréter le montant. Vous devriez l'appeler depuis le constructeur. Il serait malhonnête de l'appeler à un moment ultérieur, et les applications ne sont pas conçues pour le gérer.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook qui est appelé avant tout transfert de jetons. Cela inclut
     * la création et la destruction.
     *
     * Conditions d'appel :
     *
     * - quand `from` et `to` sont tous deux non nuls, `amount` des jetons de ``from``
     * seront transférés à `to`.
     * - quand `from` est zéro, `amount` jetons seront créés pour `to`.
     * - quand `to` est zéro, `amount` des jetons de ``from`` seront détruits.
     * - `from` et `to` ne sont jamais tous les deux zéro.
     *
     * Pour en savoir plus sur les hooks, consultez xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

C'est la fonction de hook à appeler lors des transferts. Elle est vide ici, mais si vous avez besoin qu'elle fasse quelque chose, il vous suffit de la remplacer.

## Conclusion {#conclusion}

Pour résumer, voici quelques-unes des idées les plus importantes de ce contrat (à mon avis, le vôtre est susceptible de varier) :

- _Il n'y a pas de secrets sur la chaîne de blocs_. Toute information à laquelle un contrat intelligent peut accéder est disponible pour le monde entier.
- Vous pouvez contrôler l'ordre de vos propres transactions, mais pas le moment où les transactions des autres se produisent. C'est la raison pour laquelle modifier une allocation peut être dangereux, car cela permet au dépensier de dépenser la somme des deux allocations.
- Les valeurs de type `uint256` bouclent (wrap around). En d'autres termes, _0-1=2^256-1_. Si ce n'est pas le comportement souhaité, vous devez le vérifier (ou utiliser la bibliothèque SafeMath qui le fait pour vous). Notez que cela a changé dans [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Effectuez tous les changements d'état d'un type spécifique à un endroit spécifique, car cela facilite l'audit. C'est la raison pour laquelle nous avons, par exemple, `_approve`, qui est appelée par `approve`, `transferFrom`, `increaseAllowance` et `decreaseAllowance`
- Les changements d'état doivent être atomiques, sans aucune autre action au milieu (comme vous pouvez le voir dans `_transfer`). C'est parce que pendant le changement d'état, vous avez un état incohérent. Par exemple, entre le moment où vous déduisez du solde de l'expéditeur et le moment où vous ajoutez au solde du destinataire, il y a moins de jetons en existence qu'il ne devrait y en avoir. Cela pourrait potentiellement être détourné s'il y a des opérations entre eux, en particulier des appels à un contrat différent.

Maintenant que vous avez vu comment le contrat ERC-20 d'OpenZeppelin est écrit, et surtout comment il est rendu plus sécurisé, allez écrire vos propres contrats et applications sécurisés.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).