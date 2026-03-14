---
title: Anatomie des contrats intelligents
description: "Examen approfondi des composantes d'un contrat intelligent : les fonctions, les données et les variables."
lang: fr
---

Les contrats intelligents sont des programmes qui s'exécutent à une adresse sur Ethereum. Ils sont constitués de données et de fonctions qui peuvent s'exécuter lors de la réception d'une transaction. Cette page explique la composition d'un contrat intelligent.

## Prérequis {#prerequisites}

Assurez-vous d'avoir d'abord lu la page sur les [contrats intelligents](/developers/docs/smart-contracts/). Ce document part du principe que vous êtes déjà familiarisé avec des langages de programmation comme JavaScript ou Python.

## Données {#data}

Toute donnée de contrat doit être affectée à un emplacement : soit `storage`, soit `memory`. Il est coûteux de modifier le stockage dans un contrat intelligent. Vous devez donc décider de l'endroit où vous souhaitez conserver vos données.

### Stockage {#storage}

Les données persistantes sont appelées stockage et sont représentées par des variables d'état. Ces valeurs sont stockées en permanence sur la blockchain. Vous devez déclarer le type afin que le contrat puisse garder une trace de la quantité de stockage nécessaire sur la blockchain quand il compile.

```solidity
// Exemple Solidity
contract SimpleStorage {
    uint storedData; // Variable d'état
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Si vous avez déjà programmé des langages orientés objet, vous serez probablement familiarisé avec la plupart des types. Cependant, `address` devrait être nouveau pour vous si vous débutez dans le développement Ethereum.

Un type `address` peut contenir une adresse Ethereum qui équivaut à 20 octets ou 160 bits. ce qui donne une adresse en notation hexadécimale commençant par 0x.

Les autres types incluent les :

- booléens ;
- nombres entiers ;
- numéros de points fixes ;
- tableaux d'octets de taille fixe ;
- tableaux d'octets de taille dynamique
- littéraux rationnels et entiers
- littéraux de chaîne
- littéraux hexadécimaux
- énumérations

Pour plus d'explications, consultez les pages ci-dessous :

- [Voir les types Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Voir les types Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Mémoire {#memory}

Les valeurs qui ne sont stockées que pendant la durée de l'exécution d'une fonction de contrat sont appelées variables de mémoire. Celles-ci n'étant pas stockées de façon permanente sur la blockchain, elles sont donc moins chères à utiliser.

Apprenez-en davantage sur la façon dont l'EVM stocke les données (le stockage, la mémoire et la pile) dans la [documentation de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variables d'environnement {#environment-variables}

En plus des variables que vous définissez sur votre contrat, il existent quelques variables globales spéciales. Elles sont principalement utilisées pour fournir des informations sur la blockchain ou la transaction en cours.

Exemples :

| **Propriété**     | **Variable d'état** | **Description**                                           |
| ----------------- | ------------------- | --------------------------------------------------------- |
| `block.timestamp` | uint256             | Horodatage de la période du bloc actuel                   |
| `msg.sender`      | Adresse             | Expéditeur du message (appel en cours) |

## Fonctions {#functions}

En termes simples, les fonctions peuvent obtenir ou définir des informations en réponse à des transactions entrantes.

Il existe deux types d'appels de fonctions :

- `internal` – celles-ci ne créent pas d'appel EVM
  - Les fonctions internes et les variables d'état ne sont accessibles qu'en interne (c'est-à-dire depuis le contrat actuel ou les contrats qui en dérivent)
- `external` – celles-ci créent un appel EVM
  - Les fonctions externes font partie de l'interface du contrat, ce qui signifie qu'elles peuvent être appelées à partir d'autres contrats et via des transactions. Une fonction externe `f` ne peut pas être appelée en interne (c.-à-d. que `f()` ne fonctionne pas, mais `this.f()` fonctionne).

Elles peuvent également être `public` ou `private`

- Les fonctions `public` peuvent être appelées en interne depuis le contrat ou en externe via des messages
- Les fonctions `private` ne sont visibles que pour le contrat dans lequel elles sont définies et non dans les contrats dérivés

Les fonctions et les variables d'état peuvent être rendues publiques ou privées

Voici une fonction pour mettre à jour une variable d'état sur un contrat :

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- Le paramètre `value` de type `string` est passé dans la fonction : `update_name`
- Elle est déclarée `public`, ce qui signifie que n'importe qui peut y accéder
- Elle n'est pas déclarée `view`, elle peut donc modifier l'état du contrat

### Fonctions View {#view-functions}

Ces fonctions promettent de ne pas modifier l’état des données du contrat. Les exemples courants sont les fonctions « getter » - vous pouvez utiliser ceci pour obtenir le solde d'un utilisateur par exemple.

```solidity
// Solidity example
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Voici ce qui est considéré comme une modification d'état :

1. Écriture dans les variables d'état
2. [Émettre des événements](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Créer d'autres contrats](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Utiliser `selfdestruct`.
5. Envoi d'ether via des appels
6. Appeler toute fonction non marquée `view` ou `pure`.
7. Utilisation d'appels de bas niveau
8. Utilisation d'un assemblage en ligne conteant certains opcodes

### Fonctions constructeur {#constructor-functions}

Les fonctions `constructor` ne sont exécutées qu'une seule fois lors du premier déploiement du contrat. Comme le `constructor` dans de nombreux langages de programmation orientés objet, ces fonctions initialisent souvent les variables d'état à leurs valeurs spécifiées.

```solidity
// Exemple Solidity
// Initialise les données du contrat, en définissant l'`owner`
// sur l'adresse du créateur du contrat.
constructor() public {
    // Tous les contrats intelligents s'appuient sur des transactions externes pour déclencher leurs fonctions.
    // `msg` est une variable globale qui inclut des données pertinentes sur la transaction donnée,
    // comme l'adresse de l'expéditeur et la valeur en ETH incluse dans la transaction.
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Fonctions intégrées {#built-in-functions}

En plus des variables et des fonctions que vous définissez pour votre contrat, il existe des fonctions spéciales intégrées. Exemple le plus évident :

- `address.send()` – Solidity
- `send(address)` – Vyper

Celles-ci permettent aux contrats d’envoyer des ETH à d’autres comptes.

## Écrire des fonctions {#writing-functions}

Votre fonction a besoin des éléments suivants :

- Paramètre variable et type (si elle accepte des paramètres)
- Déclaration de fonction internal/external
- Déclaration de fonction pure/view/payable
- Type de renvoi (si elle renvoie une valeur)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // variable d'état

    // Appelé lorsque le contrat est déployé et initialise la valeur
    constructor() public {
        dapp_name = "Ma dapp d'exemple";
    }

    // Fonction Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Fonction Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Un contrat complet pourrait ressembler à cela. Ici, la fonction `constructor` fournit une valeur initiale pour la variable `dapp_name`.

## Événements et journaux {#events-and-logs}

Les événements permettent à votre contrat intelligent de communiquer avec votre frontend ou d'autres applications abonnées. Une fois qu'une transaction est validée et ajoutée à un bloc, les contrats intelligents peuvent émettre des événements et enregistrer des informations, que le frontend peut ensuite traiter et utiliser.

## Exemples annotés {#annotated-examples}

Voici quelques exemples rédigés en Solidity. Si vous souhaitez vous amuser avec le code, vous pouvez interagir avec celui-ci dans [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Définit un contrat nommé `HelloWorld`.
// Un contrat est une collection de fonctions et de données (son état).
// Une fois déployé, un contrat réside à une adresse spécifique sur la blockchain Ethereum.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Déclare une variable d'état `message` de type `string`.
    // Les variables d'état sont des variables dont les valeurs sont stockées en permanence dans le stockage du contrat.
    // Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat
    // et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
    string public message;

    // Similaire à de nombreux langages orientés objet basés sur des classes, un constructeur est
    // une fonction spéciale qui n'est exécutée que lors de la création du contrat.
    // Les constructeurs sont utilisés pour initialiser les données du contrat.
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepte un argument de chaîne `initMessage` et définit la valeur
        // dans la variable de stockage `message` du contrat.
        message = initMessage;
    }

    // Une fonction publique qui accepte un argument de chaîne
    // et met à jour la variable de stockage `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Jeton {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Un `address` est comparable à une adresse e-mail - il est utilisé pour identifier un compte sur Ethereum.
    // Les adresses peuvent représenter un contrat intelligent ou des comptes externes (utilisateur).
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` est essentiellement une structure de données de table de hachage.
    // Ce `mapping` attribue un entier non signé (le solde de jetons) à une adresse (le détenteur de jetons).
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Les événements permettent de journaliser l'activité sur la blockchain.
    // Les clients Ethereum peuvent écouter les événements afin de réagir aux changements d'état du contrat.
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initialise les données du contrat, en définissant l'`owner`
    // sur l'adresse du créateur du contrat.
    constructor() public {
        // Tous les contrats intelligents s'appuient sur des transactions externes pour déclencher leurs fonctions.
        // `msg` est une variable globale qui inclut des données pertinentes sur la transaction donnée,
        // comme l'adresse de l'expéditeur et la valeur en ETH incluse dans la transaction.
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Crée un montant de nouveaux jetons et les envoie à une adresse.
    function mint(address receiver, uint amount) public {
        // `require` est une structure de contrôle utilisée pour appliquer certaines conditions.
        // Si une déclaration `require` est évaluée à `false`, une exception est déclenchée,
        // qui annule toutes les modifications apportées à l'état au cours de l'appel actuel.
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Seul le propriétaire du contrat peut appeler cette fonction
        require(msg.sender == owner, "Vous n'êtes pas le propriétaire.");

        // Applique un montant maximum de jetons
        require(amount < 1e60, "Émission maximale dépassée");

        // Augmente le solde de `receiver` de `amount`
        balances[receiver] += amount;
    }

    // Envoie un montant de jetons existants de n'importe quel appelant à une adresse.
    function transfer(address receiver, uint amount) public {
        // L'expéditeur doit avoir suffisamment de jetons à envoyer
        require(amount <= balances[msg.sender], "Solde insuffisant.");

        // Ajuste les soldes de jetons des deux adresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Émet l'événement défini plus tôt
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Actif numérique unique {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importe des symboles d'autres fichiers dans le contrat actuel.
// Dans ce cas, une série de contrats d'aide d'OpenZeppelin.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Le mot-clé `is` est utilisé pour hériter des fonctions et des mots-clés de contrats externes.
// Dans ce cas, `CryptoPizza` hérite des contrats `IERC721` et `ERC165`.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Utilise la bibliothèque SafeMath d'OpenZeppelin pour effectuer des opérations arithmétiques en toute sécurité.
    // En savoir plus : https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Les variables d'état constantes dans Solidity sont similaires à d'autres langages
    // mais vous devez les affecter à partir d'une expression qui est constante au moment de la compilation.
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Les types struct vous permettent de définir votre propre type
    // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Crée un tableau vide de structs Pizza
    Pizza[] public pizzas;

    // Mappage de l'ID de la pizza à l'adresse de son propriétaire
    mapping(uint256 => address) public pizzaToOwner;

    // Mappage de l'adresse du propriétaire au nombre de jetons possédés
    mapping(address => uint256) public ownerPizzaCount;

    // Mappage de l'ID du jeton à l'adresse approuvée
    mapping(uint256 => address) pizzaApprovals;

    // Vous pouvez imbriquer des mappages, cet exemple mappe le propriétaire aux approbations de l'opérateur
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Fonction interne pour créer une Pizza aléatoire à partir d'une chaîne (nom) et d'un ADN
    function _createPizza(string memory _name, uint256 _dna)
        // Le mot-clé `internal` signifie que cette fonction n'est visible
        // qu'à l'intérieur de ce contrat et des contrats qui dérivent de ce contrat
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` est un modificateur de fonction qui vérifie si la pizza existe déjà
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Ajoute une Pizza au tableau de Pizzas et obtient l'ID
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Vérifie que le propriétaire de la Pizza est le même que l'utilisateur actuel
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // notez que address(0) est l'adresse zéro,
        // indiquant que pizza[id] n'est pas encore alloué à un utilisateur particulier.

        assert(pizzaToOwner[id] == address(0));

        // Mappe la Pizza au propriétaire
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Crée une Pizza aléatoire à partir d'une chaîne (nom)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Génère un ADN aléatoire à partir d'une chaîne (nom) et de l'adresse du propriétaire (créateur)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Les fonctions marquées comme `pure` promettent de ne pas lire ou modifier l'état
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Génère un uint aléatoire à partir d'une chaîne (nom) + adresse (propriétaire)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Renvoie un tableau des Pizzas trouvées par propriétaire
    function getPizzasByOwner(address _owner)
        public
        // Les fonctions marquées comme `view` promettent de ne pas modifier l'état
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Utilise l'emplacement de stockage `memory` pour stocker des valeurs uniquement pour le cycle de vie de cet appel de fonction.
        // En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Transfère la Pizza et la propriété à une autre adresse
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Adresse non valide.");
        require(_exists(_pizzaId), "La pizza n'existe pas.");
        require(_from != _to, "Impossible de transférer à la même adresse.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "L'adresse n'est pas approuvée.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Émet un événement défini dans le contrat IERC721 importé
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Transfère en toute sécurité la propriété d'un ID de jeton donné à une autre adresse
     * Si l'adresse cible est un contrat, elle doit implémenter `onERC721Received`,
     * qui est appelée lors d'un transfert sécurisé, et renvoyer la valeur magique
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * sinon, le transfert est annulé.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Transfère en toute sécurité la propriété d'un ID de jeton donné à une autre adresse
     * Si l'adresse cible est un contrat, elle doit implémenter `onERC721Received`,
     * qui est appelée lors d'un transfert sécurisé, et renvoyer la valeur magique
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * sinon, le transfert est annulé.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Doit implémenter onERC721Received.");
    }

    /**
     * Fonction interne pour invoquer `onERC721Received` sur une adresse cible
     * L'appel n'est pas exécuté si l'adresse cible n'est pas un contrat
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Brûle une Pizza - détruit complètement le jeton
    // Le modificateur de fonction `external` signifie que cette fonction
    // fait partie de l'interface du contrat et que d'autres contrats peuvent l'appeler
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Adresse non valide.");
        require(_exists(_pizzaId), "La pizza n'existe pas.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "L'adresse n'est pas approuvée.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Renvoie le nombre de Pizzas par adresse
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Renvoie le propriétaire de la Pizza trouvé par ID
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "ID de Pizza non valide.");
        return owner;
    }

    // Approuve une autre adresse pour transférer la propriété de la Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Doit être le propriétaire de la Pizza.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Renvoie l'adresse approuvée pour une Pizza spécifique
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "La pizza n'existe pas.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Fonction privée pour effacer l'approbation actuelle d'un ID de jeton donné
     * Annule si l'adresse donnée n'est pas en effet le propriétaire du jeton
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Doit être le propriétaire de la pizza.");
        require(_exists(_pizzaId), "La pizza n'existe pas.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Définit ou annule l'approbation d'un opérateur donné
     * Un opérateur est autorisé à transférer tous les jetons de l'expéditeur en leur nom
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Impossible d'approuver sa propre adresse");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Indique si un opérateur est approuvé par un propriétaire donné
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Prend la propriété de la Pizza - uniquement pour les utilisateurs approuvés
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "L'adresse n'est pas approuvée.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Vérifie si la Pizza existe
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Vérifie si l'adresse est propriétaire ou est approuvée pour transférer la Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Vérifie si la Pizza est unique et n'existe pas encore
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Une pizza avec ce nom existe déjà.");
        _;
    }

    // Renvoie si l'adresse cible est un contrat
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Actuellement, il n'y a pas de meilleure façon de vérifier s'il y a un contrat à une adresse
        // que de vérifier la taille du code à cette adresse.
        // Voir https://ethereum.stackexchange.com/a/14016/36603
        // pour plus de détails sur son fonctionnement.
        // TODO Vérifier à nouveau avant la sortie de Serenity, car toutes les adresses seront
        // alors des contrats.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## En savoir plus {#further-reading}

Consultez la documentation Solidity et Vyper pour une vue d'ensemble plus complète des contrats intelligents :

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Sujets connexes {#related-topics}

- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Machine Virtuelle Ethereum](/developers/docs/evm/)

## Tutoriels connexes {#related-tutorials}

- [Réduire la taille des contrats pour combattre la limite de taille des contrats](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Quelques conseils pratiques pour réduire la taille de votre contrat intelligent._
- [Journaliser les données des contrats intelligents avec des événements](/developers/tutorials/logging-events-smart-contracts/) _– Une introduction aux événements de contrats intelligents et comment vous pouvez les utiliser pour journaliser des données._
- [Interagir avec d'autres contrats depuis Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec lui._
