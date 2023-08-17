---
title: Anatomia contractelor inteligente
description: O analiză aprofundată a anatomiei unui contact inteligent – funcțiile, datele și variabilele.
lang: ro
---

Un contract inteligent este un program care rulează la o adresă pe Ethereum. Este alcătuit din date și funcții care pot fi executate la primirea unei tranzacții. Iată o imagine de ansamblu a ceea ce constituie un contract inteligent.

### Condiții prealabile {#prerequisites}

Aveţi grijă să citiţi mai întâi despre [contractele inteligente](/developers/docs/smart-contracts/). Acest document presupune că sunteţi deja familiarizat cu limbaje de programarea precum JavaScript sau Python.

## Datele {#data}

Toate datele dintr-un contract trebuie alocate unei locații: fie de `stocare`, fie de `memorie`. Este costisitor de modificat locul de stocare într-un contract inteligent, deci trebuie să hotărâţi unde să vă plasaţi datele.

### Stocare {#storage}

Datele persistente sunt denumite stocare și sunt reprezentate de variabilele de stare. Aceste valori sunt stocate permanent pe blockchain. Trebuie să declaraţi de ce tip sunt, astfel încât contractul să poată ţine socoteala spaţiului de stocare de care are nevoie pe blockchain atunci când compilează.

```solidity
// Exemplu Solidity
contract SimpleStorage {
    uint storedData; // Stare variabilă
    // ...
}
```

```python
# Exemplu Vyper
storedData: int128
```

Dacă aţi programat deja în limbaje orientate pe obiecte, probabil că știţi deja majoritatea tipurilor. Cu toate acestea, `address` (adresa) ar trebui să fie nouă pentru dvs. dacă nu aţi mai dezvoltat pe Ethereum.

Un tip de `address` poate conține o adresă Ethereum care echivalează cu 20 de octeţi sau 160 de biți. Acesta răspunde în notație hexazecimală cu un 0x la început.

Alte tipuri includ:

- boolean
- întreg
- numere în virgulă fixă
- matrice de octeți de dimensiuni fixe
- matrice de octeți de dimensiuni dinamice
- literale raționale și întregi
- literale de tip string
- literale hexazecimale
- enum-uri

Pentru mai multe explicații, consultaţi documentele:

- [Vedeţi tipurile Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Vedeţi tipurile Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Memorie {#memory}

Valorile care sunt stocate numai pe durata de viață a executării unei funcții contractuale se numesc variabile de memorie. Deoarece acestea nu sunt stocate permanent pe blockchain, sunt mult mai ieftin de utilizat.

Aflaţi mai multe informații despre modul în care EVM stochează datele (stocare, memorie și stivă) în [documentația Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variabile de mediu {#environment-variables}

În plus față de variabilele pe care le definiţi în contract, există câteva variabile globale speciale. Acestea sunt utilizate în principal pentru a furniza informații despre blockchain sau tranzacția curentă.

Exemple:

| **Prop**          | **Variabilă de stare** | **Descriere**                             |
| ----------------- | ---------------------- | ----------------------------------------- |
| `block.timestamp` | uint256                | Marca temporală actuală a epocii blocului |
| `msg.sender`      | address                | Expeditorul mesajului (apel curent)       |

## Funcții {#functions}

În exprimare simplistă, funcțiile pot obține informații sau pot seta informații ca răspuns la tranzacțiile primite.

Există două tipuri de apeluri funcționale:

- `internal` – acestea nu creează un apel EVM
  - Funcțiile interne și variabilele de stare pot fi accesate numai intern (adică din contractul actual sau contractele care derivă din acesta)
- `external` – acestea creează un apel EVM
  - Funcțiile externe fac parte din interfața contractului, ceea ce înseamnă că pot fi apelate din alte contracte și prin tranzacții. O funcție externă `f` nu poate fi apelată intern (adică `f()` nu funcționează, dar `this.f()` funcționează).

De asemenea, pot fi de tip `public` sau `private`

- funcțiile de tip `public` pot fi apelate intern din cadrul contractului sau extern prin mesaje
- funcțiile `private` sunt vizibile numai pentru contractul în care sunt definite și nu sunt vizibile în contractele derivate

Atât funcțiile, cât și variabilele de stare pot fi făcute publice sau private

Iată o funcție pentru actualizarea unei variabile de stare pe un contract:

```solidity
// Exemplu Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parametrul `value` de tip `string` este trecut în funcția: `update_name`
- Este declarat `public`, ceea ce înseamnă că oricine îl poate accesa
- Nu este declarat `view`, astfel încât să poată modifica starea contractului

### Funcții de vizualizare {#view-functions}

Aceste funcții promit să nu modifice starea datelor contractului. Exemplele obişnuite sunt funcțiile „getter” (de obținere) – s-ar putea să utilizaţi acest lucru pentru a primi soldul unui utilizator, de exemplu.

```solidity
// Exemplu Solidity
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

Ce se consideră ca modificator de stare:

1. Scrierea în variabilele de stare.
2. [Emiterea de evenimente](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Crearea altor contracte](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Folosirea `selfdestruct`.
5. Trimiterea de ether prin apeluri.
6. Apelarea oricărei funcții care nu este marcată `view` sau `pure`.
7. Folosirea de apeluri de nivel inferior.
8. Utilizarea ansamblului în linie care conține anumite opcoduri.

### Funcții constructor {#constructor-functions}

Funcțiile `constructor` sunt executate o singură dată, la prima implementare a contractului. Precum `constructor`-ul din multe limbaje de programare bazate pe clase, aceste funcții inițializează adesea variabilele de stare la valorile lor specificate.

```solidity
// Exemplu Solidity
// Inițializează datele contractului, setând `proprietarul`
// la adresa creatorului contractului.
constructor() public {
    // Toate contractele inteligente se bazează pe tranzacții externe pentru a le declanșa funcțiile.
    // `msg`este o variabilă globală care include date relevante privind tranzacția dată,
    // cum ar fi adresa expeditorului și valoarea ETH inclusă în tranzacție.
    // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# exemplu Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Funcții încorporate {#built-in-functions}

În plus față de variabilele și funcțiile pe care le definiţi în contract, există câteva funcții speciale încorporate. Cel mai evident exemplu este:

- `address.send()` – Solidity
- `send(address)` – Vyper

Acestea permit contractelor să trimită ETH către alte conturi.

## Scrierea de funcții {#writing-functions}

Funcția dvs. are nevoie de:

- parametru variabil și tipul acestuia (dacă acceptă parametri)
- declararea dacă este internal/external
- declararea dacă este pure/view/payable
- tipul de răspuns (dacă răspunde printr-o valoare)

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

Un contract complet ar putea arăta astfel. Aici funcția `constructor` furnizează o valoare inițială pentru variabila `dapp_name`.

## Evenimente și jurnale {#events-and-logs}

Evenimentele vă permit să comunicaţi cu contractul dvs. inteligent din frontend sau din alte aplicații cu abonare. Când o tranzacție este minată, contractele inteligente pot emite evenimente și pot scrie jurnale în blockchain, pe care frontend-ul le poate procesa.

## Exemple adnotate {#annotated-examples}

Acestea sunt câteva exemple scrise în Solidity. Dacă doriţi să vă jucaţi cu codul, puteţi interacționa cu el în [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Specifică versiunea Solidity, utilizând versiuni semantice.
// Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definește un contract numit `HelloWorld`.
// Un contract este o colecție de funcții și date - (starea sa).
// Odată implementat, un contract se află la o anumită adresă din blockchain-ul Ethereum.
// Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declară o variabilă de stare `message` de tip `string`.
    // Variabilele de stare sunt variabile ale căror valori sunt stocate permanent în stocarea contractului.
    // Cuvântul cheie `public` face variabile accesibile din afara unui contract
    // și creează o funcție pe care alte contracte sau clienți o pot apela pentru a accesa valoarea.
    string public message;

    // Similar cu multe limbaje orientate pe obiecte bazate pe clase, un constructor este
    // o funcție specială care se execută numai la crearea contractului.
    // Funcțiile constructor sunt utilizate pentru a inițializa datele contractului.
    // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Acceptă un argument de string `initMessage` și setează valoarea
        // în variabila de stocare `message` a contractului).
        message = initMessage;
    }

    // O funcție publică care acceptă un argument string
    // și actualizează variabila de stocare `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` este comparabilă cu o adresă de e-mail - este utilizată pentru a identifica un cont pe Ethereum.
    // Adresele pot reprezenta un contract inteligent sau un cont extern (utilizator).
    // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` este în esență o structură de date de tabel hash.
    // Acest `mapping` atribuie un număr întreg nesemnat (echilibrul tokenului) unei adrese (deținătorul tokenului).
    // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Evenimentele permit înregistrarea activității pe blockchain.
    // Clienții Ethereum pot asculta evenimente pentru a reacționa la modificările stării contractului.
    // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inițializează datele contractului, setând `owner`
    // la adresa creatorului contractului.
    constructor() public {
        // Toate contractele inteligente se bazează pe tranzacții externe pentru a declanșa funcțiile sale.
        // `msg` este o variabilă globală care include date relevante despre tranzacția dată,
        // cum ar fi adresa expeditorului și valoarea ETH inclusă în tranzacție.
        // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creează o cantitate de tokenuri noi și le trimite la o adresă.
    function mint(address receiver, uint amount) public {
        // `require` este o structură de control utilizată pentru a impune anumite condiții.
        // Dacă o declarație `require` este evaluată ca `false`, se declanșează o excepție,
        // care întoarce toate modificările aduse stării în timpul apelului curent.
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
        // Expeditorul trebuie să aibă suficiente tokenuri pentru a le trimite
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Reglează soldurile token ale celor două adrese
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emite evenimentul definit anterior
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Activ digital unic {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importă simboluri din alte fișiere în contractul curent.
// În acest caz, o serie de contracte de ajutor de la OpenZeppelin.
//Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Cuvântul cheie `is` este folosit pentru a moșteni funcții și cuvinte cheie din contracte externe.
// În acest caz, `CryptoPizza` moștenește din contractele `IERC721` și `ERC165`.
// Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Folosește biblioteca OpenZeppelin's SafeMath ca să efectuezi operațiuni aritmetice în siguranță.
    // Află mai multe: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Variabilele de stare constantă din Solidity sunt similare cu alte limbaje
    // dar trebuie să atribui dintr-o expresie care este constantă în timpul compilării.
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
        // Află mai multe: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transferă Pizza și proprietatea asupra altei adrese
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Adresă invalidă.");
        require(_exists(_pizzaId), "Pizza nu există.");
        require(_from != _to, "Nu se poate transfera la aceeași adresă.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adresa nu este aprobată.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        //Emite eveniment definit în contractul IERC721 importat
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Transferă în siguranță dreptul de proprietate asupra unui ID de token dat la o altă adresă
     * Dacă adresa țintă este un contract, aceasta trebuie să implementeze `onERC721Received`,
     * care este apelat la un transfer sigur și returnează valoarea magică
     * `bytes4 (keccak256 (" onERC721Received(address,address,uint256, bytes)"))`;
     * în caz contrar, transferul este anulat.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Transferă în siguranță dreptul de proprietate asupra unui ID de token dat la o altă adresă
     * Dacă adresa țintă este un contract, aceasta trebuie să implementeze `onERC721Received`,
     * care este apelat la un transfer sigur și returnează valoarea magică
     * `bytes4 (keccak256 (" onERC721Received (address, address, uint256, bytes) "))`;
     * în caz contrar, transferul este anulat.
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
        // Consultă https://ethereum.stackexchange.com/a/14016/36603
        // pentru mai multe detalii despre cum funcționează acest lucru.
        // DE_FĂCUT Verifică din nou acest lucru înainte de lansarea Serenity, deoarece toate adresele vor fi
        // contracte atunci.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Referințe suplimentare {#further-reading}

Consultaţi documentația Solidity și Vyper pentru a vedea o prezentare mai completă a contractelor inteligente:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Subiecte corelate {#related-topics}

- [Contracte inteligente](/developers/docs/smart-contracts/)
- [Mașina Virtuală Ethereum](/developers/docs/evm/)

## Tutoriale corelate {#related-tutorials}

- [Reducerea contractelor pentru a contracara limita de mărime a contractului](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Câteva sfaturi practice pentru reducerea dimensiunii contractului dvs. inteligent._
- [Înregistrarea datelor din contracte inteligente cu evenimente](/developers/tutorials/logging-events-smart-contracts/) _– O introducere despre evenimentele contractelor inteligente și cum le puteţi utiliza pentru a înregistra date._
- [Interacționaţi cu alte contracte din Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cum să implementaţi un contract inteligent dintr-un contract existent și să interacționaţi cu acesta._
