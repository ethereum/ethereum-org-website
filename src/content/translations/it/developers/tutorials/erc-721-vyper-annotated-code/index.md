---
title: "Guisa sul Contratto ERC-721 Vyper"
description: Il contratto ERC-721 di Ryuya Nakamura e come funziona
author: Ori Pomerantz
lang: it
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Introduzione {#introduction}

Lo standard [ERC-721](/developers/docs/standards/tokens/erc-721/) è utilizzato per determinare la proprietà di un Token Non Fungibile (NFT). I token [ERC-20](/developers/docs/standards/tokens/erc-20/) si comportano come una commodity, perché non c'è differenza tra i token individuali. Al contrario, i token ERC-721 sono progettati per risorse simili ma non identiche, come diversi [cat cartoon](https://www.cryptokitties.co/) o titoli di diverse proprietà immobiliari.

In questo articolo analizzeremo [il contratto ERC-721 di Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy). Questo contratto è scritto in [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un linguaggio per contratti simile a Python, pensato per rendere più difficile scrivere codice non sicuro rispetto a Solidity.

## Il contratto {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

I commenti in Vyper, come in Python, iniziano con un hash (`#`) e continuano fino alla fine della riga. I commenti che includono `@<keyword>` sono usati da [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) per produrre una documentazione leggibile.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

L'interfaccia ERC-721 è creata nel linguaggio Vyper. [Puoi vedere qui la definizione del codice](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). La definizione dell'interfaccia è scritta in Python, anziché in Vyper, perché le interfacce non sono usate solo nella blockchain, ma anche quando si invia una transazione alla blockchain da un client esterno, che potrebbe esser scritto in Python.

La prima riga importa l'interfaccia, la seconda specifica che la stiamo implementando qui.

### L'interfaccia ERC721Receiver {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 supporta due tipi di trasferimento:

- `transferFrom`, che consente al mittente di specificare qualsiasi indirizzo di destinazione e pone sul mittente la responsabilità del trasferimento. Ciò significa che puoi trasferire a un indirizzo non valido, nel qual caso l'NFT è perso definitivamente.
- `safeTransferFrom`, che controlla se l'indirizzo di destinazione è un contratto. In tal caso, il contratto ERC-721 chiede al contratto ricevente se vuole ricevere l’NFT.

Per rispondere alle richieste `safeTransferFrom`, un contratto ricevente deve implementare `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

L'indirizzo `_from` è il proprietario corrente del token. L'indirizzo `_operator` è quello che ha richiesto il trasferimento (i due potrebbero non corrispondere, a causa delle indennità).

```python
            _tokenId: uint256,
```

Gli ID del token ERC-721 sono a 256 bit. Solitamente sono creati mediante hashing di una descrizione di qualsiasi token rappresenti.

```python
            _data: Bytes[1024]
```

La richiesta può avere fino a 1024 byte di dati utente.

```python
        ) -> bytes32: view
```

Per impedire casi la possibilità che un contratto accetti accidentalmente un trasferimento, il valore restituito non è booleano, ma 256 bit con un valore specifico.

Questa funzione è una `view`, ovvero può leggere lo stato della blockchain, ma non modificarlo.

### Eventi {#events}

Gli [eventi](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) sono emessi per informare gli utenti e i server al di fuori della blockchain degli eventi. Nota che il contenuto degli eventi non è disponibile per i contratti sulla blockchain.

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transfered.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Questo è simile all'evento di Trasferimento dell'ERC-20, tranne per il fatto che segnaliamo un `tokenId` anziché un importo. Nessuno possiede l'indirizzo zero, quindi per convenzione lo usiamo per segnalare la creazione e distruzione dei token.

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
#      address indicates there is no approved address. When a Transfer event emits, this also
#      indicates that the approved address for that NFT (if any) is reset to none.
# @param _owner Owner of NFT.
# @param _approved Address that we are approving.
# @param _tokenId NFT which we are approving.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

L'approvazione di un ERC-721 è simile a un'indennità dell'ERC-20. Un indirizzo specifico può trasferire un token specifico. Questo offre ai contratti un meccanismo per rispondere quando accettano un token. I contratti non possono ascoltare gli eventi, quindi se semplicemente trasferisci loro il token, non lo "sanno". In questo modo, il proprietario invia prima un'approvazione e poi una richiesta al contratto: "Ho approvato il tuo trasferimento del token X, sei pregato di...".

Si tratta di una scelta di progettazione per rendere lo standard ERC-721 simile allo standard ERC-20. Poiché i token di ERC-721 non sono fungibili, un contratto può capire di aver ricevuto un token specifico anche guardando alle sue proprietà.

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
#      all NFTs of the owner.
# @param _owner Owner of NFT.
# @param _operator Address to which we are setting operator rights.
# @param _approved Status of operator rights(true if operator rights are given and false if
# revoked).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Talvolta è utile avere un _operatore_ che possa gestire tutti i token di un account di un tipo specifico (quelli gestiti da un contratto specifico), similmente a una delega. Ad esempio, potrei voler dare a un contratto una delega per verificare se non l'ho contattato per sei mesi e, in questo caso, distribuisce le mie risorse ai miei eredi (se uno di loro lo richiede, i contratti non possono fare niente senza esser chiamati da una transazione). In ERC-20 possiamo solo dare un'indennità elevata a un contratto di ereditarietà, ma questo non funziona per ERC-721 perché i token non sono fungibili. Questo è l'equivalente.

Il valore `approved` ci comunica se l'evento è per un'approvazione, o la revoca di un'approvazione.

### Variabili di stato {#state-vars}

Queste variabili contengono lo stato corrente dei token: quali sono disponibili e chi li possiede. Gran parte di questi sono oggetti di `HashMap`, [mappature unidirezionali che esistono tra due tipi](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

Le identità dell'utente e del contratto su Ethereum sono rappresentate da indirizzi a 160 bit. Queste due variabili mappano gli ID dei token con i loro proprietari e quelli approvati per trasferirli (a un massimo di uno ciascuno). In Ethereum, i dati non inizializzati sono sempre zero, quindi se non c'è alcun proprietario o trasferente approvato, il valore per quel token è zero.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Questa variabile tiene conto dei token per ogni proprietario. Non c'è alcuna mappatura dai proprietari ai token, quindi l'unico modo per identificare i token che un proprietario specifico possiede è guardare alla cronologia di eventi della blockchain e vedere gli eventi di `trasferimento` appropriati. Possiamo usare questa variabile per sapere quando abbiamo tutti gli NFT e non dobbiamo guardare oltre nel tempo.

Questo algoritmo funziona solo per le interfacce utente e i server esterni. Il codice in esecuzione sulla blockchain stessa non può leggere gli eventi passati.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Un account potrebbe avere più di un singolo operatore. Un semplice `HashMap` è insufficiente per tenerne traccia, perché ogni chiave conduce a un valore singolo. Invece, puoi usare `HashMap[address, bool]` come valore. Di default, il valore per ogni indirizzo è `False`, che significa che non è un operatore. Puoi impostare i valori a `True` se necessario.

```python
# @dev Address of minter, who can mint a token
minter: address
```

I nuovi token devono in qualche modo esser creati. In questo contratto, esiste solo un'entità che può farlo, il `coniatore`. Questo sarà probabilmente sufficiente per un gioco, ad esempio. Per altri scopi, potrebbe esser necessario creare una logica di business più complicata.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) specifica un meccanismo con cui un contratto può rivelare come le applicazioni possono comunicare con esso, a quali ERC è conforme. In questo caso, il contratto è conforme a ERC-165 ed ERC-721.

### Funzioni {#functions}

Queste sono le funzioni che implementano effettivamente ERC-721.

#### Costruttore {#constructor}

```python
@external
def __init__():
```

In Vyper, come in Python, la funzione del costruttore è chiamata `__init__`.

```python
    """
    @dev Contract constructor.
    """
```

Su Python e su Vyper, puoi anche creare un commento specificando una stringa su più righe (che inizia e termina per `"""`), senza usarla in alcun modo. Questi commenti possono anche includere [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Per accedere alle variabili di stato, si usa `self.<variable name>` (di nuovo, come in Python).

#### Funzioni di visualizzazione {#views}

Sono funzioni che non modificano lo stato della blockchain e dunque sono eseguibili liberamente se chiamate esternamente. Se le funzioni di visualizzazione sono chiamate da un contratto, devono comunque essere eseguite su ogni nodo e dunque costano del carburante.

```python
@view
@external
```

Queste parole chiave prima della definizione di una funzione che inizia con un segno (`@`) sono dette _decorazioni_. Specificano le circostanze in cui una funzione è chiamabile.

- `@view` specifica che questa funzione è una visualizzazione.
- `@external` specifica che questa particolare funzione è chiamabile dalle transazioni o da altri contratti.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

A differenza di Python, Vyper è un [linguaggio tipizzato statico](https://wikipedia.org/wiki/Type_system#Static_type_checking). Non puoi dichiarare una variabile, o il parametro di una funzione, senza indicare il [tipo di dato](https://vyper.readthedocs.io/en/latest/types.html). In questo caso, il parametro inserito è `bytes32`, un valore a 256 bit (256 bit è la dimensione nativa della word della [Macchina Virtuale di Ethereum](/developers/docs/evm/)). L'output è un valore booleano. Per convenzione, i nomi dei parametri della funzione iniziano con un trattino basso (`_`).

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Restituisce il valore dall'HashMap `self-supportedInterfaces`, che è impostata nel costruttore (`__init__`).

```python
### VIEW FUNCTIONS ###
```

Queste sono le funzioni di visualizzazione che rendono le informazioni sui token disponibili a utenti e altri contratti.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

Questa riga [afferma](https://vyper.readthedocs.io/en/latest/statements.html#assert) che `_owner` non è zero. Se lo è, c'è un errore e l'operazione è annullata.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

Nella Macchina Virtuale di Ethereum (EVM), ogni memoria senza un valore memorizzato è zero. Se non esiste alcun token a `_tokenId`, allora il valore di `self.idToOwner[_tokenId]` è zero. In quel caso la funzione si annulla.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Nota che `getApproved` _può_ restituire zero. Se il token è valido, restituisce `self.idToApprovals[_tokenId]`. Se non c'è alcun approvatore, quel valore è zero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Questa funzione verifica se `_operator` può gestire tutti i token del `_owner` in questo contratto. Poiché possono esserci diversi operatori, si tratta di un HashMap a due livelli.

#### Funzioni d'aiuto al trasferimento {#transfer-helpers}

Queste funzioni implementano operazioni che fanno parte del trasferimento o della gestione dei token.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Questa decorazione, `@internal`, significa che la funzione è accessibile solo da altre funzioni nello stesso contratto. Per convenzione, questi nomi di funzione iniziano anch'essi con un trattino basso (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Returns whether the given spender can transfer a given token ID
    @param spender address of the spender to query
    @param tokenId uint256 ID of the token to be transferred
    @return bool whether the msg.sender is approved for the given token ID,
        is an operator of the owner, or is the owner of the token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Esistono tre modi in cui a un indirizzo è consentito trasferire un token:

1. L'indirizzo è il proprietario del token
2. L'indirizzo è autorizzato a spendere quel token
3. L'indirizzo è un operatore per il proprietario del token

La funzione che precedere può essere una visualizzazione, perché non modifica lo stato. Per ridurre i costi operativi, ogni funzione che _può_ essere una visualizzazione, _dovrebbe_ esserlo.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

Quando c'è un problema con un trasferimento, anulliamo la chiamata.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Cambia il valore solo se necessario. Le variabili di stato risiedono nella memoria. Scrivere alla memoria è una delle operazioni più costose che l'EVM (Macchina Virtuale di Ethereum) effettua (in termini di [carburante](/developers/docs/gas/)). Dunque, è bene mantenerla al minimo, anche scrivere il valore esistente ha un costo elevato.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Exeute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

Abbiamo questa funzione interna perché esistono due modi per trasferire i token (regolare e sicuro), ma vogliamo una sola posizione nel codice dove farlo, per semplificare il controllo.

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

Per emettere un evento su Vyper, si usa una dichiarazione di `log` ([vedi qui per ulteriori dettagli](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funzioni di trasferimento {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Questa funzione ti consente di trasferire a un indirizzo arbitrario. A meno che l'indirizzo non sia un utente o un contratto che sa come trasferire i token, ogni token che trasferisci sarà bloccato in quell'indirizzo e inutile.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Va bene effettuare prima il trasferimento perché se c'è un problema, ripristineremo comunque, quindi tutto ciò che è fatto nella chiamata sarà annullato.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

Prima controlla per vedere se l'indirizzo è un contratto (se ha il codice). Altrimenti, presumi che sia un indirizzo utente e che l'utente possa usare o trasferire il token. Ma non abbandonarti a un falso senso di sicurezza. Puoi infatti perdere i token, anche con `safeTransferFrom`, se li trasferisci a un indirizzo di cui nessuno conosce la chiave privata.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chiama il contratto di destinazione per vedere se può ricevere i token ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Se la destinazione è un contratto, ma un contratto che non accetta i token ERC-721 (o che ha deciso di non accettare questo specifico trasferimento), annulla.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

Per convenzione, se non vuoi avere un approvatore, nomini l'indirizzo zero, non te stesso.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Per impostare un'approvazione, puoi essere il proprietario o un operatore autorizzato dal proprietario.

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Conia nuovi token e distruggi token esistenti {#mint-burn}

L'account che ha creato il contratto è il `coniatore`, il super utente autorizzato a coniare nuovi NFT. Tuttavia, nemmeno lui è autorizzato a bruciare i token esistenti. Può farlo solo il proprietario, o un'entità da autorizzata dal proprietario.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Questa funzione restituisce sempre `True`, perché se l'operazione fallisce è ripristinata.

```python
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

Solo il coniatore (l'account che ha creato il contratto ERC-721) può coniare nuovi token. Questo può essere un problema in futuro se si vuole cambiare l'identità del coniatore. In un contratto di produzione, potresti volere una funzione che consenta al coniatore di trasferire i propri privilegi a qualcun altro.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Per convenzione, coniare i nuovi token conta come un trasferimento all'indirizzo zero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Chiunque è autorizzato a trasferire un token, può bruciarlo. Anche se bruciare un token appare equivalente a trasferirlo all'indirizzo zero, l'indirizzo zero non riceve realmente il token. Questo ci consente di liberare tutta la memoria usata per il token, potendo così ridurre il costo del carburante della transazione.

# Usare questo contratto {#using-contract}

A differenza di Solidity, Vyper non ha un ereditarietà. Si tratta di una scelta progettuale deliberata per rendere il codice più chiaro e quindi più facile da proteggere. Quindi, per creare il tuo contratto ERC-721 in Vyper, prendi [questo contratto](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) e lo modifichi per implementare la logica di business che desideri.

# Conclusione {#conclusion}

Per ripasso presentiamo alcune delle idee più importanti in questo contratto:

- Per ricevere i token ERC-721 con un trasferimento sicuro, i contratti devono implementare l'interfaccia di `ERC721Receiver`.
- Anche se usi il trasferimento sicuro, i token possono comunque rimanere bloccati se li invii a un indirizzo la cui chiave privata è sconosciuta.
- Quando c'è un problema con un'operazione, è una buona idea eseguire il `revert` della chiamata, piuttosto che restituire semplicemente un valore d'errore.
- I token ERC-721 esistono quando hanno un proprietario.
- Esistono tre modi per essere autorizzati a trasferire un NFT. Puoi essere il proprietario, essere approvato per un token specifico o essere un operatore per tutti i token del proprietario.
- Gli eventi passati sono visibili solo al di fuori della blockchain. Il codice eseguito nella blockchain non può vederli.

Ora puoi andare a implementare contratti sicuri in Vyper.
