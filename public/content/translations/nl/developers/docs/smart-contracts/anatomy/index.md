---
title: Anatomie van smart contracts
description: 'Een diepgaande kijk op de anatomie van een smart contact: de functies, gegevens en variabelen.'
lang: nl
---

Een smart contract is een programma dat op een adres op Ethereum wordt uitgevoerd. Ze bestaan uit gegevens en functies die kunnen worden uitgevoerd na ontvangst van een transactie. Hier is een overzicht van waaruit een smart contract bestaat.

## Vereisten {#prerequisites}

Zorg ervoor dat u zich eerst heeft ingelezen over [smart contracts](/developers/docs/smart-contracts/). Dit document gaat ervan uit dat u al bekend bent met programmeertalen zoals JavaScript of Python.

## Gegevens {#data}

Alle contractgegevens moeten worden toegewezen aan een locatie: ofwel aan `storage` of `memory`. Het is duur om de opslag in een smart contract aan te passen, dus denk zeker na over waar uw gegevens moeten worden opgeslagen.

### Opslag {#storage}

Persistente gegevens worden opslag genoemd en worden weergegeven door statusvariabelen. Deze waarden worden permanent opgeslagen op de blockchain. U moet het type aangeven, zodat het contract kan bijhouden hoeveel opslagruimte het nodig heeft op de blockchain wanneer het wordt gecompileerd.

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

Als u al eens geprogrammeerd hebt in objectgeoriënteerde talen, zult u waarschijnlijk bekend zijn met de meeste types. Maar `address` zou nieuw voor u moeten zijn als u nieuw bent in de ontwikkeling van Ethereum.

Een `address`-type kan een Ethereum-adres bevatten dat gelijk is aan 20 bytes of 160 bits. Het komt terug in hexadecimale notatie met een leidende 0x.

Andere types zijn:

- booleaans
- heel getal
- vastepuntgetallen
- byte-arrays met vaste grootte
- byte-arrays van dynamische grootte
- Rationale en gehele getallen
- Stringliteralen
- Hexadecimale literalen
- Opsommingen

Bekijk de documentatie voor meer uitleg:

- [Zie Vyper-types](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Zie Solidity-types](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Geheugen {#memory}

Waarden die alleen worden opgeslagen zolang een contractfunctie wordt uitgevoerd, worden geheugenvariabelen genoemd. Omdat deze niet permanent op de blockchain worden opgeslagen, zijn ze veel goedkoper in gebruik.

Ontdek meer over hoe de EVM gegevens opslaat (opslag, geheugen en de stack) in de [Solidity-documentatie](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Omgevingsvariabelen {#environment-variables}

Naast de variabelen die u definieert op uw contract, zijn er enkele speciale globale variabelen. Ze worden voornamelijk gebruikt om informatie te geven over de blockchain of de huidige transactie.

Voorbeelden:

| **Attribuut**     | **Statusvariabele** | **Beschrijving**                          |
| ----------------- | ------------------- | ----------------------------------------- |
| `block.timestamp` | uint256             | Tijdstempel huidige block-epoch           |
| `msg.sender`      | address             | Afzender van het bericht (huidige oproep) |

## Functies {#functions}

In de meest eenvoudige bewoordingen kunnen functies informatie krijgen of informatie instellen als reactie op binnenkomende transacties.

Er zijn twee soorten functie-oproepen:

- `internal` - deze maken geen EVM-oproep aan
  - Interne functies en statusvariabelen zijn alleen intern toegankelijk (d.w.z. vanuit het huidige contract of contracten die hiervan zijn afgeleid)
- `external` - deze maken een EVM-oproep aan
  - Externe functies maken deel uit van de contractinterface, wat betekent dat ze kunnen worden opgeroepen vanuit andere contracten en via transacties. Een externe functie `f` kan niet intern worden opgeroepen (d.w.z. `f()` werkt niet, maar `this.f()` werkt wel).

Ze kunnen ook `public` of `private` zijn

- `public`-functies kunnen intern worden opgeroepen vanuit het contract of extern via berichten
- `private`-functies zijn alleen zichtbaar voor het contract waarin ze zijn gedefinieerd en niet in afgeleide contracten

Zowel functies als statusvariabelen kunnen openbaar of persoonlijk worden gemaakt

Hier is een functie voor het bijwerken van een statusvariabele op een contract:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- De parameter `value` van het type `string` wordt doorgegeven aan de functie: `update_name`
- Het is `public` verklaard, wat betekent dat iedereen er toegang toe heeft
- Het is niet gedeclareerd als `view`, dus het kan de contractstatus wijzigen

### Bekijk functies {#view-functions}

Deze functies beloven dat ze de status van de gegevens van het contract niet zullen wijzigen. Gebruikelijke voorbeelden zijn "getter"-functies. Deze kunnen bijvoorbeeld gebruikt worden om het saldo van een gebruiker op te vragen.

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

Wat wordt beschouwd als de status wijzigen:

1. Schrijven naar statusvariabelen.
2. [Evenementen uitzenden](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Andere contracten aanmaken](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` gebruiken.
5. Ether versturen via oproepen.
6. Een functie oproepen die niet is gemarkeerd als `view` of `pure`.
7. Oproepen op laag niveau gebruiken.
8. Gebruik van inline assembly die bepaalde opcodes bevat.

### Constructorfuncties {#constructor-functions}

`constructor`-functies worden slechts uitgevoerd wanneer het contract voor het eerst wordt ingezet. Net als `constructor` in veel op klasse gebaseerde programmeertalen, initialiseren deze functies vaak statusvariabelen naar hun gespecificeerde waarden.

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

### Ingebouwde functies {#built-in-functions}

Naast de variabelen en functies die u definieert op uw contract, zijn er enkele speciale ingebouwde functies. Het meest voor de hand liggende voorbeeld is:

- `address.send()` – Solidity
- `send(address)` – Vyper

Hiermee kunnen contracten ETH naar andere accounts sturen.

## Schrijffuncties {#writing-functions}

Uw functiebehoeften:

- parametervariabele en type (als het parameters accepteert)
- verklaring van internal/external
- verklaring van pure/view/payable
- teruggavetype (als het een waarde teruggeeft)

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

Een volledig contract zou er ongeveer zo uit kunnen zien. Hier geeft de functie `constructor` een beginwaarde voor de variabele `dapp_name`.

## Evenementen en logs {#events-and-logs}

Evenementen zorgen ervoor dat uw smart contract kan communiceren met uw frontend of andere applicaties die zich abonneren. Zodra een transactie is gevalideerd en toegevoegd aan een block, kunnen smart contracts evenementen en loginformatie uitzenden, die de frontend vervolgens kan verwerken en gebruiken.

## Geannoteerde voorbeelden {#annotated-examples}

Dit zijn enkele voorbeelden die geschreven zijn in Solidity. Als u met de code wilt spelen, kunt u er interactie meer hebben in [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

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

### Token {#token}

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

### Unieke digitale activa {#unique-digital-asset}

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
        // See https://ethereum.stackexchange.com/a/14016/36603
        // for more details about how this works.
        // TODO Check this again before the Serenity release, because all addresses will be
        // contracts then.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Verder lezen {#further-reading}

Bekijk de documentatie van Solidity en Vyper voor een meer compleet overzicht van smart contracts:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Gerelateerde onderwerpen {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Ethereum Virtual Machine](/developers/docs/evm/)

## Gerelateerde tutorials {#related-tutorials}

- [De omvang van contracten verkleinen om de limiet van de contractgrootte te bestrijden](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Enkele praktische tips om de omvang van uw smart contract te verkleinen._
- [Gegevens loggen van smart contracts met evenementen](/developers/tutorials/logging-events-smart-contracts/) _- Een inleiding tot evenementen in smart contracts en hoe u ze kunt gebruiken om gegevens te loggen._
- [Interactie met andere contracten van Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- Hoe een smart contract van een bestaand contract inzetten en er interactie mee hebben._
