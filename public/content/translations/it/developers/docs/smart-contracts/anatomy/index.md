---
title: Anatomia dei contratti intelligenti
description: 'Uno sguardo approfondito all''anatomia di un contratto intelligente: le funzioni, i dati e le variabili.'
lang: it
---

Un contratto intelligente è un programma eseguito a un indirizzo su Ethereum. È composto di dati e funzioni che entrano in esecuzione appena si riceve una transazione. Ecco una panoramica di cosa compone un contratto intelligente.

## Prerequisiti {#prerequisites}

Prima, assicurati di aver letto a riguardo dei [contratti intelligenti](/developers/docs/smart-contracts/). Questa pagina presuppone che si conoscano i linguaggi di programmazione come JavaScript o Python.

## Dati {#data}

Tutti i dati del contratto devono essere assegnati a una posizione: `storage` oppure ` memory`. Modificare l'archiviazione in un contratto intelligente è dispendioso, devi quindi considerare dove dovrebbero risiedere i tuoi dati.

### Storage {#storage}

I dati persistenti sono detti storage (o spazio di archiviazione) e sono rappresentati da variabili di stato.  Questi valori sono memorizzati permanentemente nella blockchain. È necessario dichiarare il tipo così che il contratto possa tenere traccia di quanto storage è necessario sulla blockchain quando viene compilato.

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

### Memoria {#memory}

I valori che vengono memorizzati solo per la durata di esecuzione di una funzione di contratto sono detti variabili di memoria. Dal momento che non sono memorizzati in modo permanente sulla blockchain, sono molto più economici da usare.

Scopri di più su come l'EVM memorizza i dati (Archiviazione, Memoria e lo Stack), nella [documentazione di Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variabili ambientali {#environment-variables}

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

### Funzioni 'view' {#view-functions}

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

### Funzioni del costruttore {#constructor-functions}

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

Queste, consentono ai contratti di inviare ETH agli altri conti.

## Scrittura delle funzioni {#writing-functions}

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

## Eventi e registri {#events-and-logs}

Gli eventi consentono al tuo contratto intelligente di comunicare con il tuo frontend o con altre applicazioni di iscrizione. Una volta che una transazione viene convalidata e aggiunta a un blocco, i contratti intelligenti possono emettere eventi e registrare informazioni, che possono quindi essere elaborati e utilizzati dal frontend.

## Esempi annotati {#annotated-examples}

Questi sono alcuni esempi scritti in Solidity. Se vuoi sperimentare con il codice, puoi interagire con questi esempi in [Remix](http://remix.ethereum.org).

### Ciao mondo {#hello-world}

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
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // I tipi di struttura ti fanno definire il tuo tipo
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Crea un insieme vuoto di strutture di Pizza
    Pizza[] public pizzas;

    // Mappatura dall'ID della pizza all'indirizzo del suo proprietario
    mapping(uint256 => address) public pizzaToOwner;

    // Mappatura dall'indirizzo del proprietario al numero di token posseduti
    mapping(address => uint256) public ownerPizzaCount;

    // Mappatura dall'ID del token all'indirizzo approvato
    mapping(uint256 => address) pizzaApprovals;

    // Puoi nidificare le mappature, questo esempio mappa le approvazioni da proprietario a operatore
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Funzione interna per creare una Pizza casuale dalla stringa (nome) e dal DNA
    function _createPizza(string memory _name, uint256 _dna)
        // La parola chiave `internal` significa che questa funzione è visibile solo
        // tra questo contratto e i contratti derivati da esso
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` è un modificatore della funzione che verifica se la pizza esiste già
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Aggiunge la Pizza all'insieme di Pizze e ottiene l'id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Verifica che il proprietario della Pizza sia l'utente corrente
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // nota che address(0) è l'indirizzo zero,
        // indicando che pizza[id] non è ancora allocato a un utente in particolare.

        assert(pizzaToOwner[id] == address(0));

        // Mappa la Pizza al proprietario
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Crea una Pizza casuale dalla stringa (nome)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Genera DNA casuale dalla stringa (nome) e dall'indirizzo del proprietario (creatore)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Le funzioni contrassegnate come `pure` promettono di non modificare lo stato o non leggere da esso
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Genera uint casuale dalla stringa (nome) + indirizzo (proprietario)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Restituisce l'insieme di Pizze trovate dal proprietario
    function getPizzasByOwner(address _owner)
        public
        // Le funzioni contrassegnate come `view` promettono di non modificare lo stato
        // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Usa la posizione d'archiviazione `memory` per memorizzare i valori solo per la durata
        // di questa chiamata alla funzione.
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
     * Funzione interna per invocare `onERC721Received` su un dato indirizzo
     * La chiamata non è eseguita se l'indirizzo di destinazione non è un contratto
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

    // Brucia una Pizza - distrugge completamente il Token
    // Il modificatore della funzione `external` significa che questa funzione fa
    // parte dell'interfaccia del contratto e che gli altri contratti possono chiamarla
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Indirizzo non valido.");
        require(_exists(_pizzaId), "La Pizza non esiste.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Indirizzo non approvato.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Restituisce il numero di Pizze per indirizzo
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Restituisce il proprietario della Pizza trovato per id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "ID della Pizza non valido.");
        return owner;
    }

    // Approva altri indirizzi per trasferire la proprietà della Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Dev'essere il proprietario della Pizza.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Restituisce l'indirizzo approvato per la Pizza specifica
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "La Pizza non esiste.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * La funzione privata per cancellare l'approvazione corrente dell'ID di un dato token
     * Si ripristina se l'indirizzo dato non è il proprietario del token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Dev'essere il proprietario della pizza.");
        require(_exists(_pizzaId), "La Pizza non esiste.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Imposta o rimuove l'approvazione di un dato operatore
     * Un operatore può trasferire tutti i token del mittente per conto suo
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Impossibile approvare il proprio indirizzo");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Dice se un operatore è approvato da un dato proprietario
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Prende proprietà della Pizza - solo per gli utenti approvati
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "L'indirizzo non è approvato.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Verifica se la Pizza esiste
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Verifica se l'indirizzo è il proprietario o è approvato per trasferire la Pizza
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

    // Verifica se la Pizza è univoca e non esiste ancora
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
        require(result, "Una Pizza con quel nome esiste già.");
        _;
    }

    // Restituisce se l'indirizzo di destinazione è un contratto
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Correntemente non c'è modo migliore di verificare se esiste un contratto in un indirizzo
        // se non controllare la dimensione del codice a quell'indirizzo.
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

Dai un'occhiata alla documentazione di Solidity e Vyper per una panoramica più complessa dei contratti intelligenti:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Argomenti correlati {#related-topics}

- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Macchina virtuale Ethereum](/developers/docs/evm/)

## Tutorial correlati {#related-tutorials}

- [Ridimensionare i contratti per contrastare il limite di dimensioni del contratto](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/): _Alcuni consigli pratici per ridurre le dimensioni del tuo contratto intelligente._
- [Registrare dati dai contratti intelligenti con gli eventi](/developers/tutorials/logging-events-smart-contracts/): _Un'introduzione agli eventi dei contratti intelligenti e a come puoi usarli per registrare i dati._
- [Interagire con gli altri contratti da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/): _Come distribuire un contratto intelligente da un contratto esistente e interagirvi._
