---
title: Anatomia degli Smart Contract
description: "Uno sguardo più da vicino agli Smart Contract: funzioni, dati e variabili."
lang: it
sidebar: true
---

Uno Smart Contract è un programma che viene eseguito a un indirizzo di Ethereum. È composto di dati e funzioni che entrano in esecuzione appena si riceve una transazione. Ecco una panoramica di cosa costituisce uno Smart Contract.

### Prerequisiti {#prerequisites}

È necessario avere famigliarità con gli [Smart Contract](/developers/docs/smart-contracts/). Questa pagina presuppone che si conoscano i linguaggi di programmazione come JavaScript o Python.

## Dati {#data}

Tutti i dati del contratto devono essere assegnati a una posizione: `storage` oppure ` memory`. Modificare lo storage in uno Smart Contract è dispendioso, perciò è opportuno valutare in anticipo dove devono essere posizionati i dati.

### Storage {#storage}

I dati persistenti sono detti storage (o spazio di archiviazione) e sono rappresentati da variabili di stato. Questi valori sono memorizzati permanentemente nella blockchain. È necessario dichiarare il tipo così che il contratto possa tenere traccia di quanto storage è necessario sulla blockchain quando viene compilato.

```solidity
// Esempio in Solidity
contract SimpleStorage {
    uint storedData; // Variabile di stato
    // ...
}
```

```python
# Esempio in Vyper
storedData: int128
```

Se hai già programmato con linguaggi orientati agli oggetti, è probabile che tu abbia famigliarità con la maggior parte dei tipi, ma `address` potrebbe non essere noto se non hai mai sviluppato per Ethereum.

Un tipo `address` può contenere un indirizzo Ethereum che equivale a 20 byte o 160 bit. Restituisce una notazione esadecimale preceduta da 0x.

Altri tipi includono:

- booleano
- numero intero
- numeri a virgola fissa
- array di byte a dimensione fissa
- array di byte di dimensioni dinamiche
- letterali interi e razionali
- stringhe
- letterali esadecimali
- enumerazioni

Per ulteriori spiegazioni, consulta la documentazione:

- [Vedi Vyper types](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Vedi Solidity types](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Memory {#memory}

I valori che vengono memorizzati solo per la durata di esecuzione di una funzione di contratto sono detti variabili di memoria. Dal momento che non sono memorizzati in modo permanente sulla blockchain, sono molto più economici da usare.

Scopri di più su come l'EVM memorizza i dati (storage, memory e stack) in [Solidity docs](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variabili d'ambiente {#environment-variables}

Oltre alle variabili che vengono definite nel contratto, sono presenti alcune variabili globali speciali. Vengono utilizzate principalmente per fornire informazioni sulla blockchain o sulla transazione corrente.

Esempi:

| **Proprietà**     | **Variabile di stato** | **Descrizione**                            |
| ----------------- | ---------------------- | ------------------------------------------ |
| `block.timestamp` | uint256                | Data/ora dell'epoca del blocco corrente    |
| `msg.sender`      | address                | Mittente del messaggio (chiamata corrente) |

## Funzioni {#functions}

In termini estremamente semplici, le funzioni possono ottenere informazioni o impostarle in risposta alle transazioni in arrivo.

Ci sono due tipi di chiamata di funzione:

- `internal` – non creano una chiamata all'EVM
  - Le funzioni interne e le variabili di stato sono accessibili solo internamente (ovvero dall'interno del contratto corrente o dei contratti derivanti da esso).
- `external` – creano una chiamata all'EVM
  - Le funzioni esterne fanno parte dell'interfaccia del contratto, quindi possono essere chiamate da altri contratti e tramite transazioni. Una funzione esterna `f` non può essere chiamata internamente (quindi `f()` non funziona, ma `this.f()` funziona).

Possono anche essere `public` o `private`

- Le funzioni `public` possono essere chiamate direttamente dall'interno del contratto o dall'esterno tramite messaggi
- Le funzioni `private` sono visibili solo per il contratto in cui sono definite e non da contratti derivati

Sia le funzioni che le variabili di stato possono essere rese pubbliche o private

Questa è una funzione per aggiornare una variabile di stato su un contratto:

```solidity
// Esempio in Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Il parametro `value` di tipo `string` viene passato alla funzione: `update_name`
- È dichiarato `public` e quindi chiunque può accedervi
- Non è dichiarato `view`, quindi può modificare lo stato del contratto

### Funzioni view {#view-functions}

Queste funzioni promettono di non modificare lo stato dei dati del contratto. Tra gli esempi più comuni vi sono le funzioni "getter": puoi usarle ad esempio per ricevere un saldo dell'utente.

```solidity
// Esempio in Solidity
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

Ecco cosa è considerato modifica dello stato:

1. Scrittura su variabili di stato.
2. [Emissione di eventi](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Creazione di altri contratti](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Uso di `selfdestruct`.
5. Invio di ether tramite chiamate.
6. Chiamata di qualsiasi funzione non contrassegnata con `view` o `pure`.
7. Utilizzo di chiamate di basso livello.
8. Utilizzo di assembly inline contenente determinati opcode.

### Funzioni constructor {#constructor-functions}

Quando il contratto viene distribuito per la prima volta, le funzioni `constructor` sono eseguite solo una volta. Come accade per `constructor` in molti linguaggi di programmazione basati su classi, queste funzioni spesso inizializzano le variabili di stato ai valori specificati.

```solidity
// Esempi in Solidity
// Inizializza i dati del contratto, impostando `owner`
// sull'indirizzo del creatore del contratto.
constructor() public {
    // Tutti gli Smart Contract si basano su transazioni esterne per attivare le proprie funzioni.
    // `msg` è una variabile globale che include dati sulla transazione specificata,
    // come indirizzo del mittente e valore degli ETH inclusi nella transazione.
    // Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Esempio in Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Funzioni integrate {#built-in-functions}

Oltre alle variabili che vengono definite nel contratto, sono presenti alcune funzioni speciali integrate. L'esempio più evidente è:

- `address.send()` – Solidity
- `send(address)` – Vyper

Queste permettono ai contratti di inviare ETH ad altri account.

## Scrivere funzioni {#writing-functions}

Una funzione ha bisogno di:

- variabile e tipo di parametro (se accetta parametri)
- dichiarazione interna/esterna
- dichiarazione pure/view/payable
- tipo di valore restituito (se restituisce un valore)

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

Un contratto completo potrebbe avere questa forma. Qui la funzione `constructor` fornisce un valore iniziale per la variabile `dapp_name`.

## Eventi e log {#events-and-logs}

Gli eventi consentono di comunicare con uno Smart Contract dal frontend o da altre applicazioni che prevedono un'iscrizione. In seguito al mining di una transazione, gli Smart Contract possono emettere eventi e scrivere log sulla blockchain che il frontend può quindi elaborare.

## Esempi commentati {#annotated-examples}

Questi sono alcuni esempi scritti in Solidity. Se vuoi sperimentare con il codice, puoi interagire con questi esempi in [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Specifica la versione di Solidity, utilizzando il controllo delle versioni semantico.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato).
// Una volta distribuito, un contratto risiede in un indirizzo specifico della blockchain Ethereum.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Dichiara una variabile di stato `message` di tipo `string`.
    // Le variabili di stato sono variabili con valori memorizzati in modo permanente nello spazio di archiviazione (storage) del contratto.
    // La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto
    // e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
    string public message;

    // Analogamente a molti linguaggi di programmazione basati su classi, un costruttore è
    // una funzione speciale che viene eseguita solo al momento della creazione del contratto.
    // I costruttori sono utilizzati per inizializzare i dati del contratto.
    // Maggiori informazioni: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accetta un argomento di tipo string `initMessage` e imposta il valore
        // nella variabile di archiviazione `message` del contratto).
        message = initMessage;
    }

    // Funzione pubblica che accetta un argomento string
    // e aggiorna la variabile di archiviazione `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Un 'address' è paragonabile a un indirizzo email. Viene usato per identificare un account su Ethereum.
    // Gli indirizzi possono rappresentare uno Smart Contract o un account esterno (utente).
    // Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` è essenzialmente una struttura dati di tipo tabella hash.
    // Questo `mapping` assegna un numero intero senza segno (il saldo del token) a un indirizzo (il proprietario del token).
    // Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Gli eventi consentono di registrare le attività sulla blockchain.
    // I client Ethereum possono attendere gli eventi per reagire alle modifiche di stato del contratto.
    // Ulteriori informazioni: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inizializza i dati del contratto, impostando `owner`
    // sull'indirizzo del creatore del contratto.
    constructor() public {
    // Tutti gli Smart Contract si basano su transazioni esterne per attivare le proprie funzioni.
        // `msg` è una variabile globale che include dati relativi alla transazione specificata,
    // come l'indirizzo del mittente e il valore in ETH incluso nella transazione.
        // Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Crea una quantità di nuovi token e li invia a un indirizzo.
    function mint(address receiver, uint amount) public {
        // `require` è una struttura di controllo utilizzata per implementare determinate condizioni.
        // Se un'istruzione `require` restituisce `false`, viene attivata un'eccezione,
        // che ripristina tutte le modifiche apportate allo stato durante la chiamata corrente.
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
        // Il mittente deve avere abbastanza token da inviare
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Modifica i saldi di token dei due indirizzi
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emette l'evento definito in precedenza
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Risorsa digitale univoca {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importa simboli da altri file nel contratto corrente.
// In questo caso, una serie di contratti di supporto da OpenZeppelin.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// La parola chiave `is` viene utilizzata per ereditare funzioni e parole chiave da contratti esterni.
// In questo caso, `CryptoPizza` eredita dai contratti `IERC721` e `ERC165`.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Utilizza la libreria SafeMath di OpenZeppelin per eseguire operazioni aritmetiche in modo sicuro.
    // Ulteriori informazioni: https://docs.openzeppelin.com/contracts/2. /api/math#SafeMath
    using SafeMath for uint256;

    // Le variabili di stato costanti in Solidity sono simili ad altri linguaggi
    // ma devono essere assegnate da un'espressione che è costante al momento della compilazione.
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
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implmement onERC721Received.");
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
        // Visita https://ethereum.stackexchange.com/a/14016/36603
        // per maggiori dettagli sul funzionamento.
        // TODO Controllare questo codice nuovamente prima del rilascio di Serenity, perché a quel punto
        // tutti gli indirizzi saranno contratti.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Letture consigliate {#further-reading}

Consulta la documentazione di Solidity e Vyper per una panoramica più completa degli Smart Contract:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Argomenti correlati {#related-topics}

- [Smart Contract](/developers/docs/smart-contracts/)
- [Macchina virtuale Ethereum](/developers/docs/evm/)

## Tutorial correlati {#related-tutorials}

- [Downsizing contracts to fight the contract size limit](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Alcuni consigli pratici per ridurre la dimensione degli Smart Contract._
- [Logging data from Smart Contract with events](/developers/tutorials/logging-events-smart-contracts/) _– Introduzione agli eventi degli Smart Contract e come utilizzarli per registrare dati._
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire uno Smart Contract da un contratto esistente e interagirvi._
