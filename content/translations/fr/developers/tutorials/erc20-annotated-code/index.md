---
title: "Présentation du contrat ERC-20"
description: Qu'est-ce que le contrat OpenZeppelin ERC-20 et pourquoi existe-t-il ?
author: Ori Pomerantz
lang: fr
tags:
  - "solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Introduction {#introduction}

Ethereum est couramment utilisé par des groupes pour créer des jetons échangeables ou, dans un certain sens, leur propre monnaie. Ces jetons suivent généralement une norme, [ERC-20](/developers/docs/standards/tokens/erc-20/). Cette norme permet d'écrire des outils, tels que des groupes de liquidité et des portefeuilles, qui fonctionnent avec tous les jetons ERC-20. . Dans cet article nous allons analyser [l'implémentation d'OpenZeppelin Solidity ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), ainsi que la [définition d'interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Ceci est le code source annoté. Si vous voulez implémenter ERC-20, [lisez ce tutoriel](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## L'interface {#the-interface}

L'objectif d'un standard comme ERC-20 est de permettre de nombreuses implémentations de jetons interopérables entre applications, comme les portefeuilles et les échanges décentralisés. À cette fin, nous créons une [interface](https://www.geeksforgeeks.org/solidity-basics-of-interface/). Tout code qui a besoin d'utiliser le contrat de jeton peut employer les mêmes définitions dans l'interface et ainsi être compatible avec tous les contrats de jetons qui l'utilisent, qu'il s'agisse d'un portefeuille tel que MetaMask, une DApp comme etherscan.io, ou un contrat différent tel qu'un pool de liquidités.

![Illustration de l'interface ERC-20](erc20_interface.png)

Si vous êtes un programmeur expérimenté, vous vous souvenez probablement avoir déjà vu des constructions similaires dans [Java](https://www.w3schools.com/java/java_interface.asp) ou même dans des [fichiers d'en-tête C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Ceci est une définition de [l'interface ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) d'OpenZeppelin. C'est une traduction du [standard lisible par l'homme](https://eips.ethereum.org/EIPS/eip-20) en code Solidity. Bien sûr, l'interface elle-même ne définit pas _comment_ faire quoi que ce soit. Ceci est expliqué dans le code source du contrat ci-dessous.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Les fichiers Solidity sont supposés inclure un identifiant de licence. [Vous pouvez consulter la liste des licences ici](https://spdx.org/licenses/). Si vous avez besoin d'une licence différente, dites de quoi il s'agit dans les commentaires.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Le langage Solidity évolue rapidement et les nouvelles versions peuvent ne pas être compatibles avec l'ancien code ([voir ici](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Par conséquent, c'est une bonne idée de ne pas spécifier seulement une version minimale du langage, mais également une version maximale, la dernière avec laquelle vous avez testé le code.

&nbsp;

```solidity
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
```

Le `@dev` dans le commentaire fait partie du [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), utilisé pour produire la documentation à partir du code source.

&nbsp;

```solidity
interface IERC20 {
```

Par convention, les noms d'interface commencent par `I`.

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
```

Cette fonction est `external`, ce qui signifie [qu'elle ne peut être appelée qu'extra-contractuellement](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Elle retourne la quantité totale de jetons dans le contrat. Cette valeur est fournie en utilisant le type de données le plus commun dans Ethereum, 256 bits non signé (256 bits est la taille native de l'EVM). Cette fonction est également une `view`, ce qui signifie qu'elle ne change pas l'état et peut donc être exécutée sur un seul nœud au lieu de devoir exécuter chaque nœud dans la blockchain. Ce type de fonction ne génère pas de transaction et n'est pas [énergétivore](/developers/docs/gas/).

**Remarque :** En théorie, on peut avoir l'impression que le créateur d'un contrat est en capacité de tricher en indiquant une quantité totale inférieure à la valeur réelle et en faisant ainsi apparaître chaque jeton plus précieux qu'il ne l'est réellement. Avoir cette crainte c'est, cependant, méconnaître la vraie nature de la blockchain. Tout ce qui se passe sur la blockchain peut être vérifié par chaque nœud. Pour ce faire, le langage de code et le stockage de chaque contrat sont disponibles sur chaque nœud. Vous n'avez pas à publier le code Solidity de votre contrat, mais personne ne vous prendrait au sérieux à moins de publier le code source et la version de Solidity avec laquelle il a été compilé pour qu'il puisse ainsi être comparé au code langue de la machine que vous avez utilisé. Par exemple, voir [ce contrat](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code).

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Comme son nom même l'indique, `balanceOf` permet d'afficher le solde d'un compte. Les comptes Ethereum sont identifiés dans Solidity en utilisant le type d'`address` ayant une valeur de 160 bits. Également `external` et `view`.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La fonction `transfer` permet de transférer un jeton de l'appelant à une adresse différente. Cela implique un changement d'état, donc ce n'est pas une `view`. Lorsqu'un utilisateur appelle cette fonction, il crée une transaction qui a un coût exprimé en gaz. Il émet également un événement, `Transfer`, pour informer tout le monde sur la blockchain de cet événement.

La fonction a deux types de sortie pour deux différents types d'appels :

- Les utilisateurs qui appellent la fonction directement depuis une interface utilisateur. Typiquement, l'utilisateur soumet une transaction et n'attend pas la réponse, ce qui peut prendre un temps indéfini. L'utilisateur peut voir ce qui s'est passé en recherchant le reçu de transaction (qui est identifié par le hash de transaction) ou en recherchant l'événement `Transfer`.
- Autres contrats qui appellent la fonction dans le cadre d'une transaction globale. Ces contrats donnent immédiatement des résultats parce qu'ils s'exécutent lors de la même transaction, de sorte qu'ils peuvent utiliser la valeur fournie par la fonction.

Les autres fonctions qui changent l'état du contrat donnent le même type de résultat.

&nbsp;

Les allocations permettent à un compte de dépenser des jetons qui appartiennent à un autre propriétaire. C'est utile par exemple, pour les contrats qui agissent en tant que vendeurs. Les contrats ne peuvent pas suivre les événements. Si un acheteur devait par conséquent transférer directement des jetons au contrat du vendeur, ce contrat ne saurait pas qu'il y a eu paiement. Au lieu de cela, l'acheteur permet au contrat du vendeur de dépenser un certain montant, le vendeur transférant ce montant. Cela est possible grâce à une fonction appelée par le contrat du vendeur qui peut savoir si l'opération a réussi.

```solidity
    /**
     * @dev Indique le nombre restant de jetons que `spender` sera
     * autorisé à dépenser pour le compte du `owner` par l'intermédiaire de {transferFrom}. Ce nombre est
     * zéro par défaut.
     *
     * Cette valeur change lorsque {approve} ou {transferFrom} sont appelés.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La fonction `allowance` permet à quiconque de demander à voir quelle allocation une adresse (`owner`) permet à une autre adresse (`spender`) de dépenser.

&nbsp;

```solidity
    /**
     * @dev  Définit l''amount` comme étant l'allocation que le `spender` attribue aux jetons de l'appelant.
     *
     * Renvoie une valeur booléenne indiquant si l'opération a réussi. 
     *
     * IMPORTANT: Attention ! Modifier une allocation par ce biais comporte un risque :
     * celui que quelqu'un puisse utiliser à la fois l'ancienne et la nouvelle allocation en activant une
     * commande de transactions erronée. Solution possible pour résoudre le problème
     * réduire l'allocation du client à 0 et fixer la
     * valeur souhaitée par la suite :
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Émet un événement {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La fonction `approve` crée une autorisation. Veillez à lire le message expliquant comment elle peut être mal utilisée. Sur Ethereum, vous contrôlez l'ordre de vos propres transactions mais vous ne pouvez pas contrôler l'ordre dans lequel les transactions des autres seront exécutées, à moins que vous attendiez pour soumettre votre propre transaction de voir que la transaction est exécutée de l'autre côté.

&nbsp;

```solidity
    /**
     * @dev Déplace l``amount` des jetons du `sender`  vers le `recipient`  grâce au
     * mécanisme d'allocation. l'`amount` est ensuite déduit de l'  
     * allocation de l'appelant.
     *
     * Renvoie une valeur booléenne indiquant si l'opération a réussi.
     *
     * Émet un événement {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Enfin, `transferFrom` est utilisé par le client pour dépenser réellement l'allocation.

&nbsp;

```solidity

    /**
     * @dev Émis lorsque les jetons `value` sont déplacés d'un compte (`from`) vers
     * un autre (`to`).
     *
     * Notez que `value` peut être zéro.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` est la nouvelle allocation.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Ces événements sont émis lorsque l'état du contrat ERC-20 change.

## Le contrat réel {#the-actual-contract}

Ceci est le contrat réel qui implémente la norme ERC-20, [tirée d'ici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Il n'est pas destiné à être utilisé tel quel, mais vous pouvez en [hériter](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) pour l'étendre à quelque chose d'utilisable.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Importer les relevés {#import-statements}

En complément des définitions d'interface ci-dessus, la définition de contrat importe deux autres fichiers :

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` est l'ensemble des définitions requises pour utiliser [OpenGSN](https://www.opengsn.org/), un système qui permet aux utilisateurs sans ether d'utiliser la blockchain. Notez que c'est une ancienne version, si vous souhaitez une intégration avec OpenGSN [utilisez ce tutoriel](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La bibliothèque SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), qui est utilisée pour faire des ajouts et retraits sans dépassements. Ceci est nécessaire car sinon une personne pourrait avoir un jeton, dépenser deux jetons, puis avoir 2^256-1 jetons.

&nbsp;

Ce commentaire explique la finalité du contrat.

```solidity
/**
 * Implémentation @dev de l'interface {IERC20}.
 *
 * Cette implémentation ne sait pas comment les jetons sont créés. Cela signifie
 * qu'un mécanisme de génération doit être ajouté dans un contrat dérivé en utilisant {_mint}.
 * Pour un mécanisme générique, voir {ERC20PresetMinterPauser}.
 *
 * CONSEIL : Pour une description détaillée, consultez notre guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Comment
 * implémenter des mécanismes d'approvisionnement].
 *
 * Nous avons suivi les directives générales d'OpenZeppelin : les fonctions s'inversent au lieu de
 * faire état d'un `false` en cas d'échec. Ce comportement est néanmoins classique
 * et n'entre pas en conflit avec les attentes des applications ERC20.
 *
 * De plus, un événement {Approval} est émis en cas d'appels vers {transferFrom}.
 * Cela permet aux applications de reconstituer l'allocation pour tous les comptes rien
 * qu'en écoutant lesdits événements. Les autres implémentations de l'EIP peuvent ne pas émettre
 * ces événements car la spécification ne le demande pas.
 *
 * Enfin, les fonctions non normalisées {decreaseAllowance} et {increaseAllowance}
 * ont été ajoutées pour atténuer les problèmes bien connus autour de la définition des
 * allocations. Voir {IERC20-approve}.
 */

```

### Définition du contrat {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Cette ligne spécifie l'héritage : dans ce cas du `IERC20` ci-dessus et `Context`, pour OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Cette ligne associe la bibliothèque `SafeMath` au type `uint256`. Vous pouvez trouver cette bibliothèque [ici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Définitions des variables {#variable-definitions}

Ces définitions précisent les variables d'état du contrat. Il y a des variables déclarées `private`, mais cela signifie uniquement que d'autres contrats sur la blockchain ne peuvent pas les lire. _Il n'ey a rien de secret sur la blockchain_, le logiciel sur chaque nœud dispose de l'état de chaque contrat pour chaque bloc. Par convention, les variables d'état sont nommées `_<something>`.

Les deux premières variables sont des [mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), ce qui signifie qu'elles se comportent à peu près comme un [tableau associatif](https://wikipedia.org/wiki/Associative_array), si ce n'est que les clés sont des valeurs numériques. Il n'y a de possibilité de stockage que pour les entrées qui ont des valeurs différentes de la valeur par défaut (zéro).

```solidity
    mapping (address => uint256) private _balances;
```

Le premier mapping, `_balances`, correspond aux adresses et aux soldes respectifs de ce jeton. Pour accéder au solde, utilisez cette syntaxe : `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Cette variable, `_allowances`, stocke les allocations expliquées plus haut. Le premier index est le propriétaire des jetons, et le second est le contrat avec l'allocation. Pour accéder au montant que l'adresse A peut dépenser à partir du compte de l'adresse B, utilisez `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Comme le nom le suggère, cette variable garde une trace de la quantité totale de jetons.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Ces trois variables sont utilisées pour améliorer la lisibilité. Les noms des deux premières parlent d'eux-mêmes, mais pas `_decimals`.

D'une part, Ethereum n'a pas de variables à virgule flottante ou fractionnées. D'autre part, les gens apprécient de pouvoir diviser les jetons. Si les gens se sont orientés vers l'or comme monnaie c'est parce qu'il était difficile de faire de la monnaie quand quelqu'un voulait acheter la valeur d'un canard en vache.

La solution est de garder la trace des entiers, mais de compter à la place du jeton réel un jeton fractionné qui est presque sans valeur. Dans le cas de l'éther, la fraction de jeton est appelée wei, et 10^18 wei est égal à un ETH. A l’écriture, 10.000.000.000.000 wei représentent approximativement un centime de dollars américain ou un centime d’euro.

Les applications ont besoin de savoir comment afficher le solde de jetons. Si un utilisateur dispose de 3.141.000.000.000.000.000 wei, est-ce que cela correspond à 3,14 ETH ? 31,41 ETH ? 3,141 ETH ? Dans le cas de l'éther, il est défini comme 10^18 wei pour un ETH, mais pour votre jeton, vous pouvez sélectionner une valeur différente. Si diviser le jeton n'a pas de sens, vous pouvez définir une valeur `_decimals` de zéro. Si vous souhaitez definir le même standard que pour ETH, utilisez la valeur **18**.

### Le Constructeur {#the-constructor}

```solidity
    /**
     * @dev Définit les valeurs de {name} et {symbol}, initialise {decimals} avec
     * une valeur par défaut de 18.
     *
     * Pour sélectionner une valeur différente pour {decimals}, utilisez {_setupDecimals}.
     *
     * Ces trois valeurs sont immuables : elles ne peuvent être définies qu'une seule fois pendant
     * la phase de construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Le constructeur est appelé lorsque le contrat est créé pour la première fois. Par convention, les paramètres de fonction sont nommés `<something>_`.

### Fonctions de l'interface utilisateur {#user-interface-functions}

```solidity
    /**
     * @dev Renvoie le nom du jeton.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * Par exemple, si `decimals` est égal à `2`, un solde de jetons `505` devrait
     * être affiché comme suit pour un utilisateur : `5,05` (`505 / 10 ** 2`).
     *
     * Les jetons optent généralement pour une valeur de 18, qui correspond à la relation entre
     * éther et wei. C'est la valeur {ERC20} utilisée, sauf si {_setupDecimals} est
     * appelé.
     *
     * REMARQUE : Cette information n'est utilisée qu'à des fins _affichage_ : 
     * elle n'affecte en aucune façon l'arithmétique du contrat, y compris
     * {IERC20-balanceOf} et {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Ces fonctions, `name`, `symbol`, et `decimal` aident les interfaces utilisateur à connaître votre contrat afin qu'elles puissent l'afficher correctement.

Le type de retour est `string memory`, ce qui signifie retourner une chaîne de caractères stockée en mémoire. Les variables telles que les chaînes peuvent être stockées à trois endroits :

|                 | Durée de vie         | Accès au contrat | Coût énergétique                                                                           |
| --------------- | -------------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| Mémoire         | Appel de la fonction | Lecture/Écriture | Dix ou des centaines (plus pour des endroits plus élevés)                                  |
| Données d'appel | Appel de la fonction | Lecture seule    | Ne peut pas être utilisé comme type de retour, uniquement un type de paramètre de fonction |
| Stockage        | Jusqu'au changement  | Lecture/Écriture | Haut (800 pour la lecture, 20k pour l'écriture)                                            |

Dans ce cas, `memory` est le meilleur choix.

### Lire les informations du jeton {#read-token-information}

Ce sont des fonctions qui fournissent des informations sur le jeton, soit l'offre totale, soit le solde d'un compte.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La fonction `totalSupply` fournit la quantité totale de jetons.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Lit le solde d'un compte. Notez que n'importe qui est autorisé à obtenir le solde du compte de n'importe qui d'autre. Il est inutile d'essayer de masquer cette information car de toute façon, elle est disponible sur tous les nœuds. _Il n'existe aucun secret sur la blockchain._

### Transférer des jetons {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Pré-requis:
     *
     * - le `bénéficiaire ' ne peut pas être l'adresse zéro.
     * - l'appelant doit avoir un solde au moins égal au `montant`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La fonction `transfer` est appelée pour transférer des jetons depuis le compte de l'expéditeur vers un autre compte. Remarquez que même si elle fournit une valeur booléenne, cette valeur est toujours **true**. Si le transfert échoue, le contrat reprend l'appel.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La fonction `_transfer` fait le travail réel. C'est une fonction privée qui ne peut être appelée que par d'autres fonctions de contrat. Par convention les fonctions privées sont nommées `_<something>`, comme les variables d'état.

Habituellement avec Solidity nous utilisons `msg.sender` pour l'expéditeur du message. Cependant, cela casse [OpenGSN](http://opengsn.org/). Si nous voulons autoriser les transactions avec notre jeton, nous devons utiliser `_msgSender()`. Elle retournera `msg.sender` pour les transactions normales, en revanche pour les transactions sans ether elle indiquera le signataire original et non le contrat qui a relayé le message.

### Fonctions de provision {#allowance-functions}

Ce sont les fonctions qui implémentent la fonctionnalité de provision : `allowance`, `approve`, `transferFrom`, et `_approve`. De plus, l'implémentation d'OpenZeppelin va au-delà du standard de base pour inclure certaines fonctionnalités qui améliorent la sécurité : `increaseAllowance`, et `decreaseAllowance`.

#### La fonction d'allocation {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La fonction `allowance` permet à quiconque de vérifier n'importe quelle allocation.

#### La fonction d'approbation {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Exigences :
Pré-requis     *
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Cette fonction est appelée pour créer une provision. Elle est similaire à la fonction `transfer` ci-dessus :

- La fonction appelle simplement une fonction interne (dans ce cas, `_approve`) qui fait le travail réel.
- La fonction retourne soit `true` (si réussi) ou retour (si ce n'est pas le cas).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Nous utilisons des fonctions internes pour minimiser le nombre d'endroits où des changements d'état se produisent. _Toute_ fonction qui change l'état présente un risque potentiel de sécurité qui doit être audité pour déceler d'éventuelles failles de sécurité. De cette manière, nous avons moins de risques de nous tromper.

#### Fonction transferFrom {#transferFrom}

C'est la fonction que le client appelle pour dépenser une provision. Cela nécessite deux opérations : transférer le montant dépensé et réduire d'autant le montant de la provision.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Émet un événement {Approval} indiquant le montant de la provision mis à jour. This is not
     * required by the EIP. Voir la note au début de {ERC20}.
     *
     * Pré-requis  :
    *
     * - `spender` et `recipient` ne peuvent pas correspondre à l'adresse zéro.
     * - `sender` doit avoir un solde d'au moins `amount`.
     * - l'appelant doit avoir une allocation pour les jetons du ``sender`` d'au moins
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

L'appel à la fonction `a.sub(b, "message")` fait deux choses. Tout d'abord, elle calcule `a-b`, qui est la nouvelle provision. Deuxièmement, elle vérifie que ce résultat n'est pas négatif. S'il est négatif, l'appel revient avec le message fourni. Veuillez noter que lorsqu'un appel annule tout traitement effectué précédemment pendant cet appel il est ignoré pour que nous n'ayons pas besoin d'annuler le `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Ajouts de sécurité OpenZeppelin {#openzeppelin-safety-additions}

Il est dangereux d'attribuer à une provision non nulle une autre valeur non nulle parce que vous ne contrôlez que l'ordre de vos propres transactions, pas celles de quelqu'un d'autre. Imaginez que vous ayez deux utilisateurs, Alice qui est naïve et Bill qui est malhonnête. Alice souhaite solliciter un service de la part de Bill qui, selon elle, coûte cinq jetons - donc elle donne à Bill une provision de cinq jetons.

Puis, quelque chose change et le prix de Bill monte à dix jetons. Alice, qui souhaite toujours le service, envoie une transaction qui fixe la provision de Bill à dix. Au moment où Bill voit cette nouvelle transaction dans le pool de transactions, il envoie une transaction qui dépense les cinq jetons d'Alice et a un coût énergétique bien plus élevé, donc elle sera épuisée plus rapidement. De cette façon, Bill peut dépenser les cinq premiers jetons puis, une fois que la nouvelle provision d'Alice est épuisée, en dépenser dix de plus pour un prix total de quinze jetons, plus qu'Alice est censée avoir autorisé. Cette technique est appelée [front-running](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)

| Transaction d'Alice | Nonce d'Alice | Transaction de Bill           | Nonce de Bill | Provision de Bill | Total facturé par Bill à Alice |
| ------------------- | ------------- | ----------------------------- | ------------- | ----------------- | ------------------------------ |
| approve(Bill, 5)    | 10            |                               |               | 5                 | 0                              |
|                     |               | transferFrom(Alice, Bill, 5)  | 10 123        | 0                 | 5                              |
| approve(Bill, 10)   | 11            |                               |               | 10                | 5                              |
|                     |               | transferFrom(Alice, Bill, 10) | 10,124        | 0                 | 15                             |

Pour éviter ce problème, ces deux fonctions (`increaseAllowance` et `decreaseAllowance`) vous permettent de modifier la provision d'un montant spécifique. Ainsi, si Bill a déjà dépensé cinq jetons, il ne sera autorisé à dépenser que cinq jetons de plus. En fonction du timing, il y a deux façons de procéder, les deux aboutissant au fait que Bill n'obtient que dix jetons :

A :

| Transaction d'Alice        | Nonce d'Alice | Transaction de Bill          | Nonce de Bill | Provision de Bill | Total facturé par Bill à Alice |
| -------------------------- | -------------:| ---------------------------- | -------------:| -----------------:| ------------------------------ |
| approve(Bill, 5)           |            10 |                              |               |                 5 | 0                              |
|                            |               | transferFrom(Alice, Bill, 5) |        10,123 |                 0 | 5                              |
| increaseAllowance(Bill, 5) |            11 |                              |               |           0+5 = 5 | 5                              |
|                            |               | transferFrom(Alice, Bill, 5) |        10 124 |                 0 | 10                             |

B :

| Transaction d'Alice        | Nonce d'Alice | Transaction de Bill           | Nonce de Bill | Provision de Bill | Total facturé par Bill à Alice |
| -------------------------- | -------------:| ----------------------------- | -------------:| -----------------:| ------------------------------:|
| approve(Bill, 5)           |            10 |                               |               |                 5 |                              0 |
| increaseAllowance(Bill, 5) |            11 |                               |               |          5+5 = 10 |                              0 |
|                            |               | transferFrom(Alice, Bill, 10) |        10 124 |                 0 |                             10 |

```solidity
    /**
     * @dev augmente atomiquement l'allocation accordée à `spender` par l'appelant.
     *
     * C'est une alternative à {approve} qui peut être utilisée pour atténuer les
     * problèmes décrits dans {IERC20-approve}.
     *
     * Émet un événement {Approval} indiquant l'allocation telle que mise à jour.
     *
     * Pré-requis :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La fonction `a.add(b)` est un ajout sûr. Dans le cas peu probable où `a`+`b`>=`2^256` il n'intègre pas la manière dont l'ajout normal doit se réaliser.

```solidity

    /**
     * @dev diminue atomiquement l'allocation accordée par l'appelant à `spender`.
     *
     * C'est une alternative à {approve} qui peut être utilisée pour atténuer les
     * problèmes décrits dans {IERC20-approve}.
     *
     * Émet un événement {Approval} indiquant le montant actualisé de l'allocation.
     *
     * Pré-requis :
     *
     * - `spender` ne peut pas être l'adresse zéro.
     * - `spender` doit avoir une provision pour l'appelant d'au moins
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Fonctions qui modifient les informations du jeton {#functions-that-modify-token-information}

Voici les quatre fonctions qui font le travail réel : `_transfer`, `_mint`, `_burn`, et `_approve`.

#### La fonction \_transfer {#\_transfer}

```solidity
    /**
     * @dev Déplace les jetons `amount` de `sender` à `recipient`.
     *
     * Cette fonction interne équivaut à {transfer},  et peut être utilisée pour
     * par ex. définir des frais de jetons automatiques, des mécanismes de réduction, etc.
     *
     * Émet un événement {Transfer}.
     *
     * Pré-requis :
     *
     * - `sender` ne peut pas être l'adresse zéro.
     * - `recipient` ne peut pas être l'adresse zéro.
     * - `sender` doit avoir un solde d'au moins `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Cette fonction, `_transfer`, transfère des jetons d'un compte à un autre. Elle est appelée à la fois par `transfer` (pour les transferts depuis le compte de l'expéditeur) et `transferFrom` (pour utiliser les provisions à être transférée depuis le compte de quelqu'un d'autre).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Personne ne possède réellement l'adresse zéro dans Ethereum (c'est-à-dire que personne ne connaît une clé privée dont la clé publique correspondante est transformée en une adresse zéro). Lorsque les personnes utilisent cette adresse, il s'agit généralement d'un bogue logiciel - donc nous échouons si l'adresse zéro est utilisée comme expéditeur ou destinataire.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Il existe deux façons d'utiliser ce contrat :

1. Utilisez-le comme modèle pour votre propre code
1. [Héritez-en](https://www.bitdegree.org/learn/solidity-inheritance), et remplacez uniquement les fonctions que vous devez modifier

La seconde méthode est bien meilleure parce que le code ERC-20 d'OpenZeppelin a déjà été audité et s'avère sécurisé. Lorsque vous utilisez la méthode d'héritage, il est facile de distinguer quelles sont les fonctions que vous avez modifiées et ainsi pour faire confiance à vos contrats, les personnes n'ont besoin que de vérifier ces fonctions spécifiques.

Il est souvent utile d'exécuter une fonction chaque fois que des jetons changent de main. Cependant, `_transfer` est une fonction très importante et il est possible de l'écrire de manière non sécurisée (voir ci-dessous), Il est donc préférable de ne pas le remplacer. La solution est `_beforeTokenTransfer`, une fonction [hook](https://wikipedia.org/wiki/Hooking). Vous pouvez remplacer cette fonction et elle sera appelée pour chaque transfert.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Ce sont les lignes qui exécutent réellement le transfert. Notez qu'il n'y a **rien** entre elles et que nous soustrayons le montant transféré du solde de l'expéditeur avant de l'ajouter au destinataire. Ceci est important car s'il y a eu entre temps un appel à un contrat différent, il aurait pu être utilisé pour abuser de ce contrat. De cette façon, le transfert est atomique, rien ne peut se produire en cours de route.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Enfin, émettre un événement `Transfert`. Les événements ne sont pas accessibles par les contrats intelligents, mais le code exécuté en dehors de la blockchain peut lire les événements et réagir. Par exemple, un portefeuille peut garder une trace du moment où le propriétaire obtient plus de jetons.

#### La fonction \_mint and \_burn {#\_mint-and-\_burn}

Ces deux fonctions (`_mint` et `_burn`) modifient la quantité totale de jetons. Elles sont internes et il n'y a pas de fonction qui les appelle dans ce contrat, ainsi elles ne sont utiles que si vous héritez du contrat et ajoutez votre propre logique pour décider dans quelles conditions générer de nouveaux jetons ou utiliser les jetons existants.

**REMARQUE :** Chaque jeton ERC-20 a sa propre logique commerciale qui dicte la gestion des jetons. Par exemple, un contrat d'approvisionnement fixe ne peut appeler que `_mint` dans le constructeur et jamais `_burn`. Un contrat qui vend des jetons appellera `_mint` lorsqu'il sera payé, et probablement `_burn` à un certain point pour éviter une inflation galopante.

```solidity
    /** @dev Crée des jetons `amount` et les affecte à `account`, augmentant ainsi
     * l'offre totale.
     *
     * Émet un événement {Transfer} avec `from` défini à l'adresse zéro.
     *
     * Pré-requis:
     *
     * - `to' ne peut pas être l'adresse zéro.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Veillez à mettre à jour `_totalSupply` lorsque le nombre total de jetons change.

&nbsp;

```
    /**
     * @dev Détruit les jetons `amount` de l'account`, réduisant ainsi
     * l'offre totale.
     *
     * Émet un événement {Transfer} avec `to` défini à l'adresse zéro.
     *
     * Pré-requis:
     *
     * - `account' ne peut pas être l'adresse zéro.
     * - `account` doit au moins avoir un nombre de jetons correspondant à l'`amount`.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La fonction `_burn` est presque identique à `_mint` sauf qu'elle fonctionne en sens inverse.

#### Fonction \_approve {#\_approve}

C'est la fonction qui spécifie les provisions. Notez qu'elle permet à un propriétaire de spécifier une provision supérieure au solde actuel du propriétaire. Cela ne pose pas de problème car le solde est vérifié au moment du transfert dans la mesure où il pourrait être différent du solde existant au moment de la création de la provision.

```solidity
    /**
     * @dev  Définit le `montant` comme étant l'allocation que le `spender` attribue aux jetons de l'`owner`.
     *
     * Cette fonction interne est équivalente à `approve`, et peut être utilisée pour
     * par ex. définir des allocations automatiques pour certains sous-systèmes, etc.
     *
     * Émet un événement {Approval}.
     *
     * Pré-requis :
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

Émettre un événement `Approval`. Selon la façon dont l'application est écrite, le contrat du client peut être informé de l'approbation soit par le propriétaire, soit par un serveur qui lit ces événements.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modifier la variable des décimales {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Définit {decimals} à une valeur autre que la valeur par défaut de 18.
     *
     * AVERTISSEMENT : Cette fonction ne doit être appelée qu'à partir du constructeur. La plupart des
     * applications qui interagissent avec des contrats de jetons ne s'attendent pas à ce que
     * {decimals} change jamais, et peuvent mal fonctionner si c'est le cas.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Cette fonction modifie la variable `_decimals` qui est utilisée pour dicter aux interfaces utilisateur comment interpréter le montant. Vous devez l'appeler depuis le constructeur. Il serait malhonnête de l'appeler à n'importe quel moment ultérieur et les applications ne sont pas conçues pour le gérer.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook appelé avant tout transfert de jetons.      * frappe et brûlage compris.
     *
     * Conditions d'appel :
     *
     * - lorsque `from` et `to` ne sont pas à zéro, `amount` jetons de ``from``
     * seront transférés à `to`.
     * - lorsque `from` est zéro, les jetons `amount` seront frappés pour `to`.
     * - lorsque `to` est zéro, `amount` jetons de ``from`` seront brûlés.
     * - `from` et `to` ne sont jamais tous les deux nuls.
     *
     * Pour en savoir plus sur les hook, rendez-vous sur xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Il s'agit de la fonction hook à appeler pendant les transferts. Elle est ici vide, mais si vous en avez besoin pour accomplir quelque chose, vous avez juste à la remplacer.

# Conclusion {#conclusion}

Pour résumer, voici quelques-unes des idées les plus importantes de ce contrat (selon moi et les vôtres pourraient ne pas être les mêmes) :

- _Il n'y a pas de secret sur la blockchain._ Toute information accessible par un contrat intelligent l'est pour le monde entier.
- Vous pouvez contrôler l'ordre de vos propres transactions, mais pas lorsque les transactions d'autres personnes sont en cours. C'est la raison pour laquelle un changement de provision peut être dangereux car il permet à la personne qui dépense de dépenser la somme des deux provisions.
- Valeurs de type `uint256` enveloppent autour. En d'autres termes, _0-1=2^256-1_. Si ce comportement n'est pas souhaité, vous devez le vérifier (ou utiliser la bibliothèque SafeMath qui le fera pour vous). Notez que cela a changé avec [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Effectuez tous les changements d'état d'un type spécifique en un emplacement spécifique, car cela facilite la vérification. C'est la raison pour laquelle nous disposons par exemple de `_approve`, appelée par `approve` `transferFrom`, `increaseAllowance`, et `decreaseAllowance`
- Les changements d'état doivent être atomiques, sans aucune autre action au milieu (comme c'est le cas avec `_transfer`). Ceci parce que pendant le changement d'état, l'état est incohérent. Par exemple, entre le moment où vous déduisez du solde de la personne qui dépense et le moment où vous ajoutez au solde du bénéficiaire il y a moins de jeton existants qu'il ne devrait y en avoir. Ce laps de temps pourrait être utilisé à mauvais escient si des opérations interviennent entre eux, en particulier des appels à un contrat différent.

Maintenant que vous avez pu constater comment le contrat OpenZeppelin ERC-20 est rédigé et surtout comment il est rendu plus sûr, rédigez vos propres contrats et applications sécurisés.
