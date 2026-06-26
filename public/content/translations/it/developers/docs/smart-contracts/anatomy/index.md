---
title: Anatomia degli smart contract
description: "Uno sguardo approfondito all'anatomia di uno smart contract: funzioni, dati e variabili."
lang: it
---

Uno smart contract è un programma che viene eseguito a un indirizzo su Ethereum. Sono composti da dati e funzioni che possono essere eseguiti alla ricezione di una transazione. Ecco una panoramica di ciò che compone uno smart contract.

## Prerequisiti {#prerequisites}

Assicurati di aver prima letto degli [smart contract](/developers/docs/smart-contracts/). Questo documento presuppone che tu abbia già familiarità con linguaggi di programmazione come JavaScript o Python.

## Dati {#data}

Qualsiasi dato del contratto deve essere assegnato a una posizione: a `storage` o a `memory`. Modificare lo storage in uno smart contract è costoso, quindi devi considerare dove dovrebbero risiedere i tuoi dati.

### Storage {#storage}

I dati persistenti sono definiti storage e sono rappresentati da variabili di stato. Questi valori vengono archiviati permanentemente sulla blockchain. Devi dichiararne il tipo in modo che il contratto possa tenere traccia di quanto storage sulla blockchain necessita durante la compilazione.

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

Se hai già programmato in linguaggi orientati agli oggetti, probabilmente avrai familiarità con la maggior parte dei tipi. Tuttavia, `address` dovrebbe esserti nuovo se sei agli inizi con lo sviluppo su [Ethereum](/).

Un tipo `address` può contenere un indirizzo Ethereum, che equivale a 20 byte o 160 bit. Viene restituito in notazione esadecimale con un 0x iniziale.

Altri tipi includono:

- booleani
- interi
- numeri a virgola fissa
- array di byte a dimensione fissa
- array di byte a dimensione dinamica
- letterali razionali e interi
- letterali stringa
- letterali esadecimali
- enumerazioni (enum)

Per ulteriori spiegazioni, dai un'occhiata alla documentazione:

- [Vedi i tipi di Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Vedi i tipi di Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memoria {#memory}

I valori che vengono archiviati solo per la durata dell'esecuzione di una funzione del contratto sono chiamati variabili di memoria (memory). Poiché non vengono archiviati permanentemente sulla blockchain, sono molto più economici da usare.

Scopri di più su come l'EVM archivia i dati (Storage, Memory e Stack) nella [documentazione di Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variabili d'ambiente {#environment-variables}

Oltre alle variabili che definisci nel tuo contratto, ci sono alcune variabili globali speciali. Sono utilizzate principalmente per fornire informazioni sulla blockchain o sulla transazione corrente.

Esempi:

| **Proprietà**     | **Variabile di stato** | **Descrizione**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Timestamp dell'epoca del blocco corrente |
| `msg.sender`      | address            | Mittente del messaggio (chiamata corrente) |

## Funzioni {#functions}

Nei termini più semplici, le funzioni possono ottenere o impostare informazioni in risposta alle transazioni in entrata.

Esistono due tipi di chiamate di funzione:

- `internal` – queste non creano una chiamata EVM
  - Le funzioni interne e le variabili di stato possono essere accessibili solo internamente (ovvero, dall'interno del contratto corrente o dai contratti che ne derivano)
- `external` – queste creano una chiamata EVM
  - Le funzioni esterne fanno parte dell'interfaccia del contratto, il che significa che possono essere chiamate da altri contratti e tramite transazioni. Una funzione esterna `f` non può essere chiamata internamente (ovvero, `f()` non funziona, ma `this.f()` funziona).

Possono anche essere `public` o `private`

- Le funzioni `public` possono essere chiamate internamente dall'interno del contratto o esternamente tramite messaggi
- Le funzioni `private` sono visibili solo per il contratto in cui sono definite e non nei contratti derivati

Sia le funzioni che le variabili di stato possono essere rese pubbliche (public) o private (private)

Ecco una funzione per aggiornare una variabile di stato in un contratto:

```solidity
// Esempio in Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Il parametro `value` di tipo `string` viene passato alla funzione: `update_name`
- È dichiarata `public`, il che significa che chiunque può accedervi
- Non è dichiarata `view`, quindi può modificare lo stato del contratto

### Funzioni view {#view-functions}

Queste funzioni promettono di non modificare lo stato dei dati del contratto. Esempi comuni sono le funzioni "getter": potresti usarle per ricevere il saldo di un utente, ad esempio.

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

Cosa è considerato una modifica dello stato:

1. Scrivere su variabili di stato.
2. [Emettere eventi](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Creare altri contratti](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Usare `selfdestruct`.
5. Inviare ether tramite chiamate.
6. Chiamare qualsiasi funzione non contrassegnata come `view` o `pure`.
7. Usare chiamate di basso livello.
8. Usare assembly inline che contiene determinati opcode.

### Funzioni costruttore {#constructor-functions}

Le funzioni `constructor` vengono eseguite solo una volta quando il contratto viene distribuito per la prima volta. Come `constructor` in molti linguaggi di programmazione basati su classi, queste funzioni spesso inizializzano le variabili di stato ai loro valori specificati.

```solidity
// Esempio in Solidity
// Inizializza i dati del contratto, impostando `owner`
// all'indirizzo del creatore del contratto.
constructor() public {
    // Tutti gli smart contract si affidano a transazioni esterne per attivare le proprie funzioni.
    // `msg` è una variabile globale che include dati rilevanti sulla transazione data,
    // come l'indirizzo del mittente e il valore in ETH incluso nella transazione.
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

Oltre alle variabili e alle funzioni che definisci nel tuo contratto, ci sono alcune funzioni integrate speciali. L'esempio più ovvio è:

- `address.send()` – Solidity
- `send(address)` – Vyper

Queste consentono ai contratti di inviare ETH ad altri account.

## Scrivere funzioni {#writing-functions}

La tua funzione necessita di:

- variabile e tipo del parametro (se accetta parametri)
- dichiarazione di internal/external
- dichiarazione di pure/view/payable
- tipo restituito (se restituisce un valore)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // variabile di stato

    // Chiamato quando il contratto viene distribuito e inizializza il valore
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Funzione Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Funzione Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Un contratto completo potrebbe assomigliare a questo. Qui la funzione `constructor` fornisce un valore iniziale per la variabile `dapp_name`.

## Eventi e log {#events-and-logs}

Gli eventi consentono al tuo smart contract di comunicare con il tuo frontend o altre applicazioni iscritte. Una volta che una transazione è convalidata e aggiunta a un blocco, gli smart contract possono emettere eventi e registrare log di informazioni, che il frontend può poi elaborare e utilizzare.

## Esempi annotati {#annotated-examples}

Questi sono alcuni esempi scritti in Solidity. Se desideri giocare con il codice, puoi interagirvi in [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Specifica la versione di Solidity, usando il versionamento semantico.
// Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato).
// Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum.
// Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Dichiara una variabile di stato `message` di tipo `string`.
    // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nell'archiviazione del contratto.
    // La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto
    // e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
    string public message;

    // Similmente a molti linguaggi orientati agli oggetti basati su classi, un costruttore è
    // una funzione speciale che viene eseguita solo alla creazione del contratto.
    // I costruttori sono usati per inizializzare i dati del contratto.
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accetta un argomento stringa `initMessage` e imposta il valore
        // nella variabile di archiviazione `message` del contratto).
        message = initMessage;
    }

    // Una funzione pubblica che accetta un argomento stringa
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
    // Un `address` (indirizzo) è paragonabile a un indirizzo email - è usato per identificare un account su Ethereum.
    // Gli indirizzi possono rappresentare uno smart contract o account esterni (di utenti).
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` è essenzialmente una struttura dati a tabella hash.
    // Questo `mapping` assegna un intero senza segno (il saldo dei token) a un indirizzo (il detentore dei token).
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Gli eventi consentono il log delle attività sulla blockchain.
    // I client di Ethereum possono mettersi in ascolto degli eventi per reagire ai cambiamenti di stato del contratto.
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inizializza i dati del contratto, impostando `owner`
    // all'indirizzo del creatore del contratto.
    constructor() public {
        // Tutti gli smart contract si affidano a transazioni esterne per attivare le proprie funzioni.
        // `msg` è una variabile globale che include dati rilevanti sulla transazione data,
        // come l'indirizzo del mittente e il valore in ETH incluso nella transazione.
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Crea una quantità di nuovi token e li invia a un indirizzo.
    function mint(address receiver, uint amount) public {
        // `require` è una struttura di controllo usata per imporre determinate condizioni.
        // Se un'istruzione `require` restituisce `false`, viene attivata un'eccezione,
        // che annulla tutte le modifiche apportate allo stato durante la chiamata corrente.
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Solo il proprietario del contratto può chiamare questa funzione
        require(msg.sender == owner, "You are not the owner.");

        // Impone una quantità massima di token
        require(amount < 1e60, "Maximum issuance exceeded");

        // Aumenta il saldo di `receiver` di `amount`
        balances[receiver] += amount;
    }

    // Invia una quantità di token esistenti da qualsiasi chiamante a un indirizzo.
    function transfer(address receiver, uint amount) public {
        // Il mittente deve avere abbastanza token da inviare
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Regola i saldi dei token dei due indirizzi
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emette l'evento definito in precedenza
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Asset digitale unico {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importa simboli da altri file nel contratto corrente.
// In questo caso, una serie di contratti di supporto da OpenZeppelin.
// Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// La parola chiave `is` è usata per ereditare funzioni e parole chiave da contratti esterni.
// In questo caso, `CryptoPizza` eredita dai contratti `IERC721` ed `ERC165`.
// Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Usa la libreria SafeMath di OpenZeppelin per eseguire operazioni aritmetiche in modo sicuro.
    // Scopri di più: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Le variabili di stato costanti in Solidity sono simili ad altri linguaggi
    // ma devi assegnarle da un'espressione che è costante in fase di compilazione.
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // I tipi struct ti permettono di definire il tuo tipo
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Crea un array vuoto di struct Pizza
    Pizza[] public pizzas;

    // Mapping dall'ID della pizza all'indirizzo del suo proprietario
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping dall'indirizzo del proprietario al numero di token posseduti
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping dall'ID del token all'indirizzo approvato
    mapping(uint256 => address) pizzaApprovals;

    // Puoi annidare i mapping, questo esempio mappa il proprietario alle approvazioni dell'operatore
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Funzione interna per creare una Pizza casuale da stringa (nome) e DNA
    function _createPizza(string memory _name, uint256 _dna)
        // La parola chiave `internal` significa che questa funzione è visibile solo
        // all'interno di questo contratto e dei contratti che derivano da questo contratto
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` è un modificatore di funzione che controlla se la pizza esiste già
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Aggiunge la Pizza all'array di Pizze e ottiene l'id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Controlla che il proprietario della Pizza sia lo stesso dell'utente corrente
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // nota che address(0) è l'indirizzo zero,
        // indicando che pizza[id] non è ancora allocata a un utente particolare.

        assert(pizzaToOwner[id] == address(0));

        // Mappa la Pizza al proprietario
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Crea una Pizza casuale da stringa (nome)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Genera DNA casuale da stringa (nome) e indirizzo del proprietario (creatore)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Le funzioni contrassegnate come `pure` promettono di non leggere o modificare lo stato
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Genera un uint casuale da stringa (nome) + indirizzo (proprietario)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Restituisce l'array di Pizze trovate dal proprietario
    function getPizzasByOwner(address _owner)
        public
        // Le funzioni contrassegnate come `view` promettono di non modificare lo stato
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Usa la posizione di archiviazione `memory` per memorizzare i valori solo per il
        // ciclo di vita di questa chiamata di funzione.
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Trasferisce la Pizza e la proprietà a un altro indirizzo
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emette l'evento definito nel contratto IERC721 importato
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Trasferisce in modo sicuro la proprietà di un dato ID di token a un altro indirizzo
     * Se l'indirizzo di destinazione è un contratto, deve implementare `onERC721Received`,
     * che viene chiamato in caso di trasferimento sicuro, e restituire il valore magico
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * altrimenti, il trasferimento viene annullato.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Trasferisce in modo sicuro la proprietà di un dato ID di token a un altro indirizzo
     * Se l'indirizzo di destinazione è un contratto, deve implementare `onERC721Received`,
     * che viene chiamato in caso di trasferimento sicuro, e restituire il valore magico
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * altrimenti, il trasferimento viene annullato.
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
     * Funzione interna per invocare `onERC721Received` su un indirizzo di destinazione
     * La chiamata non viene eseguita se l'indirizzo di destinazione non è un contratto
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

    // Brucia una Pizza - distrugge completamente il token
    // Il modificatore di funzione `external` significa che questa funzione è
    // parte dell'interfaccia del contratto e altri contratti possono chiamarla
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

    // Restituisce il conteggio delle Pizze per indirizzo
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Restituisce il proprietario della Pizza trovata tramite id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approva un altro indirizzo per trasferire la proprietà della Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Restituisce l'indirizzo approvato per una Pizza specifica
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Funzione privata per cancellare l'approvazione corrente di un dato ID di token
     * Si annulla se l'indirizzo fornito non è effettivamente il proprietario del token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Imposta o rimuove l'approvazione di un dato operatore
     * A un operatore è consentito trasferire tutti i token del mittente per suo conto
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Indica se un operatore è approvato da un dato proprietario
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Prende la proprietà della Pizza - solo per utenti approvati
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Controlla se la Pizza esiste
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Controlla se l'indirizzo è il proprietario o è approvato per trasferire la Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disabilita il controllo di solium a causa di
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Controlla se la Pizza è unica e non esiste ancora
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

    // Restituisce se l'indirizzo di destinazione è un contratto
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Attualmente non c'è modo migliore per controllare se c'è un contratto in un indirizzo
        // che controllare la dimensione del codice a quell'indirizzo.
        // Vedi https://ethereum.stackexchange.com/a/14016/36603
        // per maggiori dettagli su come funziona.
        // TODO Controllare di nuovo prima della release di Serenity, perché tutti gli indirizzi saranno
        // contratti allora.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Letture consigliate {#further-reading}

Dai un'occhiata alla documentazione di Solidity e Vyper per una panoramica più completa sugli smart contract:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Argomenti correlati {#related-topics}

- [Smart contract](/developers/docs/smart-contracts/)
- [Ethereum Virtual Machine](/developers/docs/evm/)

## Tutorial correlati {#related-tutorials}

- [Ridimensionare i contratti per combattere il limite di dimensione del contratto](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Alcuni consigli pratici per ridurre le dimensioni del tuo smart contract._
- [Registrare i dati dagli smart contract con gli eventi](/developers/tutorials/logging-events-smart-contracts/) _– Un'introduzione agli eventi degli smart contract e a come puoi usarli per registrare i dati._
- [Interagire con altri contratti da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire uno smart contract da un contratto esistente e interagirvi._