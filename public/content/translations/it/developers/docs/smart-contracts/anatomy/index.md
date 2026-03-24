---
title: Anatomia dei contratti intelligenti
description: "Uno sguardo approfondito all'anatomia di un contratto intelligente: le funzioni, i dati e le variabili."
lang: it
---

Un contratto intelligente è un programma che viene eseguito a un indirizzo su Ethereum. Sono costituiti da dati e funzioni che possono essere eseguiti alla ricezione di una transazione. Ecco una panoramica di ciò che compone un contratto intelligente.

## Prerequisiti {#prerequisites}

Assicurati di aver prima letto dei [contratti intelligenti](/developers/docs/smart-contracts/). Questo documento presuppone che tu abbia già familiarità con linguaggi di programmazione come JavaScript o Python.

## Dati {#data}

Qualsiasi dato del contratto deve essere assegnato a una posizione: `storage` o `memory`. Modificare lo storage in un contratto intelligente è costoso, quindi devi considerare dove dovrebbero risiedere i tuoi dati.

### Storage {#storage}

I dati persistenti sono definiti storage e sono rappresentati da variabili di stato. Questi valori vengono archiviati in modo permanente sulla blockchain. Devi dichiararne il tipo in modo che il contratto possa tenere traccia di quanto spazio di archiviazione sulla blockchain necessita durante la compilazione.

```solidity
// Esempio in Solidity
contract SimpleStorage {
    uint storedData; // Variabile di stato
    // ...
}
```

```vyper
# Vyper example
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
- letterali di stringa
- letterali esadecimali
- enumerazioni (enum)

Per ulteriori spiegazioni, dai un'occhiata alla documentazione:

- [Vedi i tipi di Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Vedi i tipi di Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memory {#memory}

I valori che vengono archiviati solo per la durata dell'esecuzione di una funzione del contratto sono chiamati variabili di memoria (memory). Poiché non vengono archiviati in modo permanente sulla blockchain, sono molto più economici da usare.

Scopri di più su come l'EVM archivia i dati (Storage, Memory e Stack) nella [documentazione di Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variabili d'ambiente {#environment-variables}

Oltre alle variabili che definisci nel tuo contratto, ci sono alcune variabili globali speciali. Sono utilizzate principalmente per fornire informazioni sulla blockchain o sulla transazione corrente.

Esempi:

| **Proprietà**     | **Variabile di stato** | **Descrizione**                      |
| ----------------- | ---------------------- | ------------------------------------ |
| `block.timestamp` | uint256                | Timestamp dell'epoca del blocco corrente |
| `msg.sender`      | address                | Mittente del messaggio (chiamata corrente) |

## Funzioni {#functions}

Nei termini più semplici, le funzioni possono ottenere informazioni o impostare informazioni in risposta alle transazioni in entrata.

Esistono due tipi di chiamate di funzione:

- `internal` – queste non creano una chiamata EVM
  - Le funzioni interne e le variabili di stato possono essere accessibili solo internamente (cioè, dall'interno del contratto corrente o dai contratti che ne derivano)
- `external` – queste creano una chiamata EVM
  - Le funzioni esterne fanno parte dell'interfaccia del contratto, il che significa che possono essere chiamate da altri contratti e tramite transazioni. Una funzione esterna `f` non può essere chiamata internamente (cioè, `f()` non funziona, ma `this.f()` funziona).

Possono anche essere `public` o `private`

- le funzioni `public` possono essere chiamate internamente dall'interno del contratto o esternamente tramite messaggi
- le funzioni `private` sono visibili solo per il contratto in cui sono definite e non nei contratti derivati

Sia le funzioni che le variabili di stato possono essere rese pubbliche o private

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

### Funzioni View {#view-functions}

Queste funzioni promettono di non modificare lo stato dei dati del contratto. Esempi comuni sono le funzioni "getter": potresti usarle per ricevere il saldo di un utente, ad esempio.

```solidity
// Esempio in Solidity
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```vyper
dapp_name: public(String[24])

@external
@view
def readName() -> String[24]:
    return self.dapp_name
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

### Funzioni Constructor {#constructor-functions}

Le funzioni `constructor` vengono eseguite solo una volta quando il contratto viene distribuito per la prima volta. Come il `constructor` in molti linguaggi di programmazione basati su classi, queste funzioni spesso inizializzano le variabili di stato ai loro valori specificati.

```solidity
// Esempio in Solidity
// Inizializza i dati del contratto, impostando l'`owner`
// all'indirizzo del creatore del contratto.
constructor() public {
    // Tutti gli smart contract si basano su transazioni esterne per attivare le proprie funzioni.
    // `msg` è una variabile globale che include dati rilevanti sulla transazione data,
    // come l'indirizzo del mittente e il valore in ETH incluso nella transazione.
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```vyper
# Vyper example
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
- tipo di ritorno (se restituisce un valore)

```vyper
@external
def update_name(value: String[24]):
    self.dapp_name = value
```

Un contratto completo potrebbe assomigliare a questo. Qui la funzione `constructor` fornisce un valore iniziale per la variabile `dapp_name`.

## Eventi e log {#events-and-logs}

Gli eventi consentono al tuo contratto intelligente di comunicare con il tuo frontend o altre applicazioni iscritte. Una volta che una transazione è convalidata e aggiunta a un blocco, i contratti intelligenti possono emettere eventi e registrare informazioni, che il frontend può quindi elaborare e utilizzare.

## Esempi annotati {#annotated-examples}

Questi sono alcuni esempi scritti in Solidity. Se desideri giocare con il codice, puoi interagirvi in [Remix](http://remix.ethereum.org).

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
    // Un `address` è paragonabile a un indirizzo email: è usato per identificare un account su Ethereum.
    // Gli indirizzi possono rappresentare uno smart contract o account esterni (di utenti).
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` è essenzialmente una struttura dati a tabella hash.
    // Questo `mapping` assegna un intero senza segno (il saldo del token) a un indirizzo (il detentore del token).
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Gli eventi consentono di registrare le attività sulla blockchain.
    // I client di Ethereum possono ascoltare gli eventi per reagire ai cambiamenti di stato del contratto.
    // Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inizializza i dati del contratto, impostando l'`owner`
    // all'indirizzo del creatore del contratto.
    constructor() public {
        // Tutti gli smart contract si basano su transazioni esterne per attivare le proprie funzioni.
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

### Risorsa digitale unica {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";
import "../node_modules/@openzeppelin/contracts/drafts/Counters.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `SimpleToken` inherits from the `ERC165` and `IERC721` contracts.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract SimpleToken is ERC165, IERC721 {

    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;

    // Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Mapping from token ID to owner
    mapping (uint256 => address) private _tokenOwner;

    // Mapping from token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;

    // Mapping from owner to number of owned token
    mapping (address => Counters.Counter) private _ownedTokensCount;

    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;

    /*
     *     bytes4(keccak256('balanceOf(address)')) == 0x70a08231
     *     bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
     *     bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
     *     bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
     *     bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
     *     bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
     *     bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde
     *
     *     => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
     *        0xa22cb465 ^ 0xe985e9c5 ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
     */
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

    constructor () public {
        // register the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(_INTERFACE_ID_ERC721);
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");

        return _ownedTokensCount[owner].current();
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");

        return owner;
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "ERC721: approve to caller");

        _operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");

        _transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public {
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();

        emit Transfer(address(0), to, tokenId);
    }

    function _burn(address owner, uint256 tokenId) internal {
        require(ownerOf(tokenId) == owner, "ERC721: burn of token that is not own");

        _clearApproval(tokenId);

        _ownedTokensCount[owner].decrement();
        _tokenOwner[tokenId] = address(0);

        emit Transfer(owner, address(0), tokenId);
    }

    function _burn(uint256 tokenId) internal {
        _burn(ownerOf(tokenId), tokenId);
    }

    function _transferFrom(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _clearApproval(tokenId);

        _ownedTokensCount[from].decrement();
        _ownedTokensCount[to].increment();

        _tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
        internal returns (bool)
    {
        if (!to.isContract()) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data);
        return (retval == _ERC721_RECEIVED);
    }

    function _clearApproval(uint256 tokenId) private {
        if (_tokenApprovals[tokenId] != address(0)) {
            _tokenApprovals[tokenId] = address(0);
        }
    }
}
```

## Letture di approfondimento {#further-reading}

Dai un'occhiata alla documentazione di Solidity e Vyper per una panoramica più completa sui contratti intelligenti:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Argomenti correlati {#related-topics}

- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Macchina virtuale di Ethereum](/developers/docs/evm/)

## Tutorial correlati {#related-tutorials}

- [Ridurre le dimensioni dei contratti per combattere il limite di dimensione del contratto](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Alcuni consigli pratici per ridurre le dimensioni del tuo contratto intelligente._
- [Registrare i dati dai contratti intelligenti con gli eventi](/developers/tutorials/logging-events-smart-contracts/) _– Un'introduzione agli eventi dei contratti intelligenti e a come puoi usarli per registrare i dati._
- [Interagire con altri contratti da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Come distribuire un contratto intelligente da un contratto esistente e interagirvi._