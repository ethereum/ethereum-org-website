---
title: Anatomie des contrats intelligents
description: 'Examen approfondi des composantes d''un contrat intelligent : les fonctions, les données et les variables.'
lang: fr
---

Les contrats intelligents sont des programmes qui s'exécutent à une adresse sur Ethereum. Ils sont constitués de données et de fonctions qui peuvent s'exécuter lors de la réception d'une transaction. Cette page explique la composition d'un contrat intelligent.

## Prérequis {#prerequisites}

Assurez-vous de commencer par lire la page [Contrats intelligents](/developers/docs/smart-contracts/). Ce document part du principe que vous êtes déjà familiarisé avec des langages de programmation comme JavaScript ou Python.

## Données {#data}

Toute donnée relative à un contrat doit être affectée à un emplacement : soit `storage` soit `memory`. Il est coûteux de modifier le stockage dans un contrat intelligent. Vous devez donc décider de l'endroit où vous souhaitez conserver vos données.

### Stockage {#storage}

Les données persistantes sont appelées stockage et sont représentées par des variables d'état. Ces valeurs sont stockées en permanence sur la blockchain. Vous devez déclarer le type afin que le contrat puisse garder une trace de la quantité de stockage nécessaire sur la blockchain quand il compile.

```solidity
// Solidity example
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Si vous avez déjà programmé des langages orientés objet, vous serez probablement familiarisé avec la plupart des types. Cependant, le type `address` devrait être nouveau pour vous si vous commencez à développer pour Ethereum.

Un type `address ` peut contenir une adresse Ethereum qui équivaut à 20 octets ou 160 bits, ce qui donne une adresse en notation hexadécimale commençant par 0x.

Les autres types incluent les :

- booléens ;
- nombres entiers ;
- numéros de points fixes ;
- tableaux d'octets de taille fixe ;
- tableaux d'octets de taille dynamique ;
- littéraux rationnels et entiers ;
- littéraux de chaîne ;
- nombres hexadécimaux ;
- énumérations.

Pour plus d'explications, consultez les pages ci-dessous :

- [Types Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Types Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Mémoire {#memory}

Les valeurs qui ne sont stockées que pendant la durée de l'exécution d'une fonction de contrat sont appelées variables de mémoire. Celles-ci n'étant pas stockées de façon permanente sur la blockchain, elles sont donc moins chères à utiliser.

Pour en savoir plus sur la façon dont l'EVM conserve les données (stockage, mémoire et pile) consultez la documentation [Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variables d'environnement {#environment-variables}

En plus des variables que vous définissez sur votre contrat, il existent quelques variables globales spéciales. Elles sont principalement utilisées pour fournir des informations sur la blockchain ou la transaction en cours.

Exemples :

| **Propriété**     | **Variable d'état** | **Description**                         |
| ----------------- | ------------------- | --------------------------------------- |
| `block.timestamp` | uint256             | Horodatage de la période du bloc actuel |
| `msg.sender`      | address             | Expéditeur du message (appel en cours)  |

## Fonctions {#functions}

En termes simples, les fonctions peuvent obtenir ou définir des informations en réponse à des transactions entrantes.

Il existe deux types d'appels de fonctions :

- `internal` - Ces fonctions ne créent pas d'appel EVM
  - Les fonctions internes et les variables d'état ne peuvent être accédées qu'en interne (c'est-à-dire à partir du contrat actuel ou des contrats qui en découlent)
- `external` - Ces fonctions créent un appel EVM
  - Les fonctions externes font partie de l'interface du contrat, ce qui signifie qu'elles peuvent être appelées à partir d'autres contrats et via des transactions. Une fonction externe `f` ne peut pas être appelée en interne (par ex., `f()` ne fonctionne pas, mais `this.f()` fonctionne).

Elles peuvent également être de type `public` ou `private`

- Les fonctions `public` peuvent être appelées en interne à l'intérieur du contrat ou à l'extérieur via des messages
- Les fonctions `private` ne sont visibles que pour le contrat dans lequel elles sont définies et non dans les contrats dérivés

Les fonctions et les variables d'état peuvent être rendues publiques ou privées

Voici une fonction pour mettre à jour une variable d'état sur un contrat :

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- Le paramètre `value` de type `string` est passé dans la fonction : `update_name`.
- Il est déclaré `public`, ce qui signifie que n'importe qui peut y accéder.
- Il n'est pas déclaré comme `view`, il peut donc modifier l'état du contrat

### Voir les fonctions {#view-functions}

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
2. [Émission d'événements](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events)
3. [Création d'autres contrats](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)
4. Utilisation d'`autodestruct`
5. Envoi d'ether via des appels
6. Appel d'une fonction non marquée `view` ni `pure`
7. Utilisation d'appels de bas niveau
8. Utilisation d'un assemblage en ligne conteant certains opcodes

### Fonctions du constructeur {#constructor-functions}

Les fonctions `constructor` ne sont exécutées qu'une seule fois lors du premier déploiement du contrat. Comme `constructor` dans de nombreux langages de programmation basés sur des classes, ces fonctions initialisent souvent les variables d'état à leurs valeurs spécifiées.

```solidity
// Solidity example
// Initializes the contract's data, setting the `owner`
// to the address of the contract creator.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions.
    // `msg` is a global variable that includes relevant data on the given transaction,
    // such as the address of the sender and the ETH value included in the transaction.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

- `address.send()` - Solidity
- `send(address)` - Vyper

Celles-ci permettent aux contrats d’envoyer des ETH à d’autres comptes.

## Fonctions d'écriture {#writing-functions}

Votre fonction a besoin des éléments suivants :

- Paramètre variable et type (si elle accepte des paramètres)
- Déclaration de fonction internal/external
- Déclaration de fonction pure/view/payable
- Type de renvoi (si elle renvoie une valeur)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Un contrat complet pourrait ressembler à cela. Ici la fonction `constructor` fournit une valeur initiale pour la variable `dapp_name`.

## Événements et journaux {#events-and-logs}

Les événements permettent à votre contrat intelligent de communiquer avec votre frontend ou d'autres applications abonnées. Une fois qu'une transaction est validée et ajoutée à un bloc, les contrats intelligents peuvent émettre des événements et enregistrer des informations, que le frontend peut ensuite traiter et utiliser.

## Exemples annotés {#annotated-examples}

Voici quelques exemples rédigés en Solidity. Si vous souhaitez jouer avec le code, vous pouvez interagir avec dans [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
    // Declares a state variable `message` of type `string`.
    // State variables are variables whose values are permanently stored in contract storage.
    // The keyword `public` makes variables accessible from outside a contract
    // and creates a function that other contracts or clients can call to access the value.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is
    // a special function that is only executed upon contract creation.

    // Constructors are used to initialize the contract's data.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value
        // into the contract's `message` storage variable).

        message = initMessage;
    }

    // A public function that accepts a string argument
    // and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Jeton {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // An `address` is comparable to an email address - it's used to identify an account on Ethereum.
    // Addresses can represent a smart contract or an external (user) accounts.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` is essentially a hash table data structure.
    // This `mapping` assigns an unsigned integer (the token balance) to an address (the token holder).
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events allow for logging of activity on the blockchain.
    // Ethereum clients can listen for events in order to react to contract state changes.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner`
    // to the address of the contract creator.
    constructor() public {
        // All smart contracts rely on external transactions to trigger its functions.

        // `msg` is a global variable that includes relevant data on the given transaction,
        // such as the address of the sender and the ETH value included in the transaction.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creates an amount of new tokens and sends them to an address.
    function mint(address receiver, uint amount) public {
        // `require` is a control structure used to enforce certain conditions.
        // If a `require` statement evaluates to `false`, an exception is triggered,
        // which reverts all changes made to the state during the current call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emits the event defined earlier
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Actif numérique unique {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages
    // but you must assign from an expression which is constant at compile time.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
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

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
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

    // Check if Pizza is unique and doesn't exist yet
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
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // Voir https://ethereum.stackexchange.com/a/14016/36603
        // pour plus de détails sur le fonctionnement.
        // TODO Vérifiez cela à nouveau avant la version Serenity, car toutes les adresses seront alors contractuelles
        // .
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Complément d'information {#further-reading}

Consultez la documentation Solidity et Vyper pour une vue d'ensemble plus complète des contrats intelligents :

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Sujets connexes {#related-topics}

- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Machine virtuelle Ethereum (EVM)](/developers/docs/evm/)

## Tutoriels connexes {#related-tutorials}

- [Réduire les contrats pour respecter la limite de taille](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _ - Quelques conseil pratiques pour réduire la taille de votre contrat intelligent_
- [Consigner les données des contrats intelligents avec des événements](/developers/tutorials/logging-events-smart-contracts/) _- Introduction aux événements de contrats intelligents et comment vous pouvez les utiliser pour consigner les données_
- [Interagir avec d'autres contrats Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- Comment déployer et interagir avec un contrat intelligent à partir d'un contrat existant_
