---
title: "Guida passo passo al contratto ERC-721 in Vyper"
description: "Il contratto ERC-721 di Ryuya Nakamura e come funziona"
author: Ori Pomerantz
lang: it
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "ERC-721 in Vyper"
published: 2021-04-01
---

## Introduzione {#introduction}

Lo standard [ERC-721](/developers/docs/standards/tokens/erc-721/) è utilizzato per detenere la proprietà dei Token Non Fungibili (NFT).
I token [ERC-20](/developers/docs/standards/tokens/erc-20/) si comportano come una merce, poiché non c'è differenza tra i singoli token.
Al contrario, i token ERC-721 sono progettati per asset simili ma non identici, come diversi [gatti dei cartoni animati](https://www.cryptokitties.co/)
o titoli di proprietà di diversi immobili.

In questo articolo analizzeremo [il contratto ERC-721 di Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Questo contratto è scritto in [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un linguaggio per contratti simile a Python progettato per rendere
più difficile la scrittura di codice insicuro rispetto a Solidity.

## Il contratto {#contract}

```python
# @dev Implementazione dello standard per token non fungibili ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modificato da: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

I commenti in Vyper, come in Python, iniziano con un hash (`#`) e continuano fino alla fine della riga. I commenti che includono
`@<keyword>` sono utilizzati da [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) per produrre documentazione leggibile dall'uomo.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

L'interfaccia ERC-721 è integrata nel linguaggio Vyper.
[Puoi vedere la definizione del codice qui](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
La definizione dell'interfaccia è scritta in Python, anziché in Vyper, perché le interfacce sono utilizzate non solo all'interno della
blockchain, ma anche quando si invia alla blockchain una transazione da un client esterno, che potrebbe essere scritto in
Python.

La prima riga importa l'interfaccia e la seconda specifica che la stiamo implementando qui.

### L'interfaccia ERC721Receiver {#receiver-interface}

```python
# Interfaccia per il contratto chiamato da safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

L'ERC-721 supporta due tipi di trasferimento:

- `transferFrom`, che consente al mittente di specificare qualsiasi indirizzo di destinazione e pone la responsabilità
  del trasferimento sul mittente. Ciò significa che puoi trasferire a un indirizzo non valido, nel qual caso
  l'NFT è perso per sempre.
- `safeTransferFrom`, che controlla se l'indirizzo di destinazione è un contratto. In tal caso, il contratto ERC-721
  chiede al contratto ricevente se desidera ricevere l'NFT.

Per rispondere alle richieste `safeTransferFrom` un contratto ricevente deve implementare `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

L'indirizzo `_from` è l'attuale proprietario del token. L'indirizzo `_operator` è quello che ha
richiesto il trasferimento (questi due potrebbero non essere gli stessi, a causa delle autorizzazioni di spesa).

```python
            _tokenId: uint256,
```

Gli ID dei token ERC-721 sono a 256 bit. In genere vengono creati eseguendo l'hashing di una descrizione di ciò che
il token rappresenta.

```python
            _data: Bytes[1024]
```

La richiesta può contenere fino a 1024 byte di dati utente.

```python
        ) -> bytes32: view
```

Per prevenire i casi in cui un contratto accetta accidentalmente un trasferimento, il valore di ritorno non è un booleano,
ma 256 bit con un valore specifico.

Questa funzione è una `view`, il che significa che può leggere lo stato della blockchain, ma non modificarlo.

### Eventi {#events}

Gli [eventi](/developers/docs/smart-contracts/anatomy/#events-and-logs)
vengono emessi per informare gli utenti e i server all'esterno della blockchain degli eventi. Nota che il contenuto degli eventi
non è disponibile per i contratti sulla blockchain.

```python
# @dev Emesso quando la proprietà di qualsiasi NFT cambia tramite qualsiasi meccanismo. Questo evento viene emesso quando i NFT vengono
#      creati (`from` == 0) e distrutti (`to` == 0). Eccezione: durante la creazione del contratto, qualsiasi
#      numero di NFT può essere creato e assegnato senza emettere Transfer. Al momento di qualsiasi
#      trasferimento, l'indirizzo approvato per quel NFT (se presente) viene reimpostato a nessuno.
# @param _from Mittente del NFT (se l'indirizzo è l'indirizzo zero indica la creazione del token).
# @param _to Ricevitore del NFT (se l'indirizzo è l'indirizzo zero indica la distruzione del token).
# @param _tokenId Il NFT che è stato trasferito.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Questo è simile all'evento Transfer dell'ERC-20, tranne per il fatto che riportiamo un `tokenId` invece di un importo.
Nessuno possiede l'indirizzo zero, quindi per convenzione lo usiamo per segnalare la creazione e la distruzione dei token.

```python
# @dev Questo viene emesso quando l'indirizzo approvato per un NFT viene modificato o riaffermato. L'indirizzo zero
#      indica che non c'è alcun indirizzo approvato. Quando viene emesso un evento Transfer, questo
#      indica anche che l'indirizzo approvato per quel NFT (se presente) viene reimpostato a nessuno.
# @param _owner Proprietario del NFT.
# @param _approved Indirizzo che stiamo approvando.
# @param _tokenId NFT che stiamo approvando.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Un'approvazione ERC-721 è simile a un'autorizzazione di spesa ERC-20. A un indirizzo specifico è consentito trasferire un token
specifico. Questo fornisce un meccanismo ai contratti per rispondere quando accettano un token. I contratti non possono
ascoltare gli eventi, quindi se ti limiti a trasferire loro il token non ne "sanno" nulla. In questo modo il
proprietario invia prima un'approvazione e poi invia una richiesta al contratto: "Ho approvato il trasferimento del token
X da parte tua, per favore procedi...".

Questa è una scelta di progettazione per rendere lo standard ERC-721 simile allo standard ERC-20. Poiché
i token ERC-721 non sono fungibili, un contratto può anche identificare di aver ottenuto un token specifico
esaminando la proprietà del token.

```python
# @dev Questo viene emesso quando un operatore viene abilitato o disabilitato per un proprietario. L'operatore può gestire
#      tutti i NFT del proprietario.
# @param _owner Proprietario del NFT.
# @param _operator Indirizzo al quale stiamo impostando i diritti di operatore.
# @param _approved Stato dei diritti di operatore (true se i diritti di operatore sono concessi e false se
# revocati).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

A volte è utile avere un _operatore_ che possa gestire tutti i token di un account di un tipo specifico (quelli gestiti da
un contratto specifico), in modo simile a una procura. Ad esempio, potrei voler dare tale potere a un contratto che controlla se
non l'ho contattato per sei mesi e, in tal caso, distribuisce i miei asset ai miei eredi (se uno di loro lo richiede, i contratti
non possono fare nulla senza essere chiamati da una transazione). Nell'ERC-20 possiamo semplicemente dare un'elevata autorizzazione di spesa a un contratto di eredità,
ma questo non funziona per l'ERC-721 perché i token non sono fungibili. Questo ne è l'equivalente.

Il valore `approved` ci dice se l'evento riguarda un'approvazione o il ritiro di un'approvazione.

### Variabili di stato {#state-vars}

Queste variabili contengono lo stato attuale dei token: quali sono disponibili e chi li possiede. La maggior parte di questi
sono oggetti `HashMap`, [mappature unidirezionali che esistono tra due tipi](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping dall'ID del NFT all'indirizzo che lo possiede.
idToOwner: HashMap[uint256, address]

# @dev Mapping dall'ID del NFT all'indirizzo approvato.
idToApprovals: HashMap[uint256, address]
```

Le identità degli utenti e dei contratti in Ethereum sono rappresentate da indirizzi a 160 bit. Queste due variabili mappano
dagli ID dei token ai loro proprietari e a coloro che sono approvati per trasferirli (al massimo uno per ciascuno). In Ethereum,
i dati non inizializzati sono sempre zero, quindi se non c'è un proprietario o un trasferitore approvato, il valore per quel token
è zero.

```python
# @dev Mapping dall'indirizzo del proprietario al conteggio dei suoi token.
ownerToNFTokenCount: HashMap[address, uint256]
```

Questa variabile contiene il conteggio dei token per ogni proprietario. Non esiste una mappatura dai proprietari ai token, quindi
l'unico modo per identificare i token posseduti da un proprietario specifico è guardare indietro nella cronologia degli eventi della blockchain
e vedere gli eventi `Transfer` appropriati. Possiamo usare questa variabile per sapere quando abbiamo tutti gli NFT e non
abbiamo bisogno di guardare ancora più indietro nel tempo.

Nota che questo algoritmo funziona solo per le interfacce utente e i server esterni. Il codice in esecuzione sulla blockchain
stessa non può leggere gli eventi passati.

```python
# @dev Mapping dall'indirizzo del proprietario al mapping degli indirizzi degli operatori.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Un account può avere più di un singolo operatore. Un semplice `HashMap` è insufficiente per
tenerne traccia, perché ogni chiave porta a un singolo valore. Invece, puoi usare
`HashMap[address, bool]` come valore. Per impostazione predefinita, il valore per ogni indirizzo è `False`, il che significa che non
è un operatore. Puoi impostare i valori su `True` secondo necessità.

```python
# @dev Indirizzo del minter, che può coniare un token
minter: address
```

I nuovi token devono essere creati in qualche modo. In questo contratto c'è una singola entità a cui è consentito farlo, il
`minter`. Questo è probabilmente sufficiente per un gioco, ad esempio. Per altri scopi, potrebbe essere necessario
creare una logica di business più complicata.

```python
# @dev Mapping dall'id dell'interfaccia a bool che indica se è supportata o meno
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID dell'interfaccia ERC-165 di ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID dell'interfaccia ERC-165 di ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

L'[ERC-165](https://eips.ethereum.org/EIPS/eip-165) specifica un meccanismo per un contratto per rivelare come le applicazioni
possono comunicare con esso, a quali ERC è conforme. In questo caso, il contratto è conforme a ERC-165 ed ERC-721.

### Funzioni {#functions}

Queste sono le funzioni che implementano effettivamente l'ERC-721.

#### Costruttore {#constructor}

```python
@external
def __init__():
```

In Vyper, come in Python, la funzione del costruttore è chiamata `__init__`.

```python
    """
    @dev Costruttore del contratto.
    """
```

In Python e in Vyper, puoi anche creare un commento specificando una stringa multilinea (che inizia e finisce
con `"""`) e non utilizzandola in alcun modo. Questi commenti possono includere anche
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Per accedere alle variabili di stato si usa `self.<variable name>` (di nuovo, come in Python).

#### Funzioni di visualizzazione {#views}

Queste sono funzioni che non modificano lo stato della blockchain e pertanto possono essere eseguite gratuitamente
se chiamate esternamente. Se le funzioni di visualizzazione vengono chiamate da un contratto, devono comunque essere eseguite su
ogni nodo e quindi costano gas.

```python
@view
@external
```

Queste parole chiave prima della definizione di una funzione che iniziano con una chiocciola (`@`) sono chiamate _decorazioni_.
Specificano le circostanze in cui una funzione può essere chiamata.

- `@view` specifica che questa funzione è una visualizzazione (view).
- `@external` specifica che questa particolare funzione può essere chiamata dalle transazioni e da altri contratti.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

A differenza di Python, Vyper è un [linguaggio a tipizzazione statica](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Non puoi dichiarare una variabile o un parametro di funzione senza identificare il [tipo di dato](https://vyper.readthedocs.io/en/latest/types.html). In questo caso il parametro di input è `bytes32`, un valore a 256 bit
(256 bit è la dimensione nativa della parola della [Ethereum Virtual Machine](/developers/docs/evm/)). L'output è un valore booleano.
Per convenzione, i nomi dei parametri di funzione iniziano con un trattino basso (`_`).

```python
    """
    @dev L'identificazione dell'interfaccia è specificata in ERC-165.
    @param _interfaceID Id dell'interfaccia
    """
    return self.supportedInterfaces[_interfaceID]
```

Restituisce il valore dall'HashMap `self.supportedInterfaces`, che è impostato nel costruttore (`__init__`).

```python
### FUNZIONI VIEW ###
```

Queste sono le funzioni di visualizzazione che rendono le informazioni sui token disponibili agli utenti e ad altri contratti.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Restituisce il numero di NFT posseduti da `_owner`.
         Lancia un'eccezione se `_owner` è l'indirizzo zero. I NFT assegnati all'indirizzo zero sono considerati non validi.
    @param _owner Indirizzo per il quale interrogare il saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Questa riga [asserisce](https://vyper.readthedocs.io/en/latest/statements.html#assert) che `_owner` non è
zero. Se lo è, c'è un errore e l'operazione subisce un revert.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Restituisce l'indirizzo del proprietario del NFT.
         Lancia un'eccezione se `_tokenId` non è un NFT valido.
    @param _tokenId L'identificatore per un NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lancia un'eccezione se `_tokenId` non è un NFT valido
    assert owner != ZERO_ADDRESS
    return owner
```

Nella Ethereum Virtual Machine (EVM) qualsiasi spazio di archiviazione che non ha un valore memorizzato al suo interno è zero.
Se non c'è alcun token in `_tokenId`, il valore di `self.idToOwner[_tokenId]` è zero. In tal
caso la funzione subisce un revert.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Ottiene l'indirizzo approvato per un singolo NFT.
         Lancia un'eccezione se `_tokenId` non è un NFT valido.
    @param _tokenId ID del NFT di cui interrogare l'approvazione.
    """
    # Lancia un'eccezione se `_tokenId` non è un NFT valido
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Nota che `getApproved` _può_ restituire zero. Se il token è valido restituisce `self.idToApprovals[_tokenId]`.
Se non c'è alcun approvatore, quel valore è zero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Controlla se `_operator` è un operatore approvato per `_owner`.
    @param _owner L'indirizzo che possiede i NFT.
    @param _operator L'indirizzo che agisce per conto del proprietario.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Questa funzione controlla se a `_operator` è consentito gestire tutti i token di `_owner` in questo contratto.
Poiché possono esserci più operatori, si tratta di un HashMap a due livelli.

#### Funzioni di supporto al trasferimento {#transfer-helpers}

Queste funzioni implementano operazioni che fanno parte del trasferimento o della gestione dei token.

```python

### HELPER DELLE FUNZIONI DI TRASFERIMENTO ###

@view
@internal
```

Questa decorazione, `@internal`, significa che la funzione è accessibile solo da altre funzioni all'interno dello
stesso contratto. Per convenzione, anche i nomi di queste funzioni iniziano con un trattino basso (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Restituisce se lo spender specificato può trasferire un dato ID del token
    @param spender indirizzo dello spender da interrogare
    @param tokenId uint256 ID del token da trasferire
    @return bool se il msg.sender è approvato per l'ID del token specificato,
        è un operatore del proprietario, o è il proprietario del token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Ci sono tre modi in cui a un indirizzo può essere consentito di trasferire un token:

1. L'indirizzo è il proprietario del token
2. L'indirizzo è approvato per spendere quel token
3. L'indirizzo è un operatore per il proprietario del token

La funzione precedente può essere una visualizzazione perché non modifica lo stato. Per ridurre i costi operativi, qualsiasi
funzione che _può_ essere una visualizzazione _dovrebbe_ essere una visualizzazione.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Aggiunge un NFT a un indirizzo specificato
         Lancia un'eccezione se `_tokenId` è posseduto da qualcuno.
    """
    # Lancia un'eccezione se `_tokenId` è posseduto da qualcuno
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Cambia il proprietario
    self.idToOwner[_tokenId] = _to
    # Cambia il tracciamento del conteggio
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Rimuove un NFT da un indirizzo specificato
         Lancia un'eccezione se `_from` non è l'attuale proprietario.
    """
    # Lancia un'eccezione se `_from` non è l'attuale proprietario
    assert self.idToOwner[_tokenId] == _from
    # Cambia il proprietario
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Cambia il tracciamento del conteggio
    self.ownerToNFTokenCount[_from] -= 1
```

Quando c'è un problema con un trasferimento, eseguiamo il revert della chiamata.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Cancella un'approvazione di un indirizzo specificato
         Lancia un'eccezione se `_owner` non è l'attuale proprietario.
    """
    # Lancia un'eccezione se `_owner` non è l'attuale proprietario
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reimposta le approvazioni
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Modifica il valore solo se necessario. Le variabili di stato risiedono nell'archiviazione (storage). Scrivere nell'archiviazione è
una delle operazioni più costose che l'EVM (Ethereum Virtual Machine) esegue (in termini di
[gas](/developers/docs/gas/)). Pertanto, è una buona idea ridurla al minimo; persino scrivere il
valore esistente ha un costo elevato.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Esegue il trasferimento di un NFT.
         Lancia un'eccezione a meno che `msg.sender` non sia l'attuale proprietario, un operatore autorizzato o l'indirizzo
         approvato per questo NFT. (NOTA: `msg.sender` non è consentito in una funzione privata, quindi passa `_sender`.)
         Lancia un'eccezione se `_to` è l'indirizzo zero.
         Lancia un'eccezione se `_from` non è l'attuale proprietario.
         Lancia un'eccezione se `_tokenId` non è un NFT valido.
    """
```

Abbiamo questa funzione interna perché ci sono due modi per trasferire i token (normale e sicuro), ma
vogliamo un solo punto nel codice in cui lo facciamo per semplificare l'auditing.

```python
    # Controlla i requisiti
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Lancia un'eccezione se `_to` è l'indirizzo zero
    assert _to != ZERO_ADDRESS
    # Cancella l'approvazione. Lancia un'eccezione se `_from` non è l'attuale proprietario
    self._clearApproval(_from, _tokenId)
    # Rimuove il NFT. Lancia un'eccezione se `_tokenId` non è un NFT valido
    self._removeTokenFrom(_from, _tokenId)
    # Aggiunge il NFT
    self._addTokenTo(_to, _tokenId)
    # Registra il trasferimento
    log Transfer(_from, _to, _tokenId)
```

Per emettere un evento in Vyper si usa un'istruzione `log` ([vedi qui per maggiori dettagli](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funzioni di trasferimento {#transfer-funs}

```python

### FUNZIONI DI TRASFERIMENTO ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Lancia un'eccezione a meno che `msg.sender` non sia l'attuale proprietario, un operatore autorizzato o l'indirizzo
         approvato per questo NFT.
         Lancia un'eccezione se `_from` non è l'attuale proprietario.
         Lancia un'eccezione se `_to` è l'indirizzo zero.
         Lancia un'eccezione se `_tokenId` non è un NFT valido.
    @notice Il chiamante è responsabile di confermare che `_to` sia in grado di ricevere NFT, altrimenti
            potrebbero andare persi in modo permanente.
    @param _from L'attuale proprietario del NFT.
    @param _to Il nuovo proprietario.
    @param _tokenId Il NFT da trasferire.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Questa funzione ti consente di trasferire a un indirizzo arbitrario. A meno che l'indirizzo non sia un utente o un contratto che
sa come trasferire i token, qualsiasi token trasferito rimarrà bloccato in quell'indirizzo e sarà inutile.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Trasferisce la proprietà di un NFT da un indirizzo a un altro indirizzo.
         Lancia un'eccezione a meno che `msg.sender` non sia l'attuale proprietario, un operatore autorizzato o
         l'indirizzo approvato per questo NFT.
         Lancia un'eccezione se `_from` non è l'attuale proprietario.
         Lancia un'eccezione se `_to` è l'indirizzo zero.
         Lancia un'eccezione se `_tokenId` non è un NFT valido.
         Se `_to` è un contratto, chiama `onERC721Received` su `_to` e lancia un'eccezione se
         il valore di ritorno non è `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTA: bytes4 è rappresentato da bytes32 con padding
    @param _from L'attuale proprietario del NFT.
    @param _to Il nuovo proprietario.
    @param _tokenId Il NFT da trasferire.
    @param _data Dati aggiuntivi senza formato specificato, inviati nella chiamata a `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Va bene eseguire prima il trasferimento perché se c'è un problema eseguiremo comunque il revert,
quindi tutto ciò che è stato fatto nella chiamata verrà annullato.

```python
    if _to.is_contract: # controlla se `_to` è un indirizzo di un contratto
```

Per prima cosa controlla se l'indirizzo è un contratto (se ha del codice). In caso contrario, presumi che sia un indirizzo
utente e che l'utente sarà in grado di utilizzare il token o trasferirlo. Ma non farti cullare
da un falso senso di sicurezza. Puoi perdere i token, anche con `safeTransferFrom`, se li trasferisci
a un indirizzo di cui nessuno conosce la chiave privata.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chiama il contratto di destinazione per vedere se può ricevere token ERC-721.

```python
        # Lancia un'eccezione se la destinazione del trasferimento è un contratto che non implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Se la destinazione è un contratto, ma non accetta token ERC-721 (o ha deciso di non accettare questo
particolare trasferimento), esegui il revert.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Imposta o riafferma l'indirizzo approvato per un NFT. L'indirizzo zero indica che non c'è alcun indirizzo approvato.
         Lancia un'eccezione a meno che `msg.sender` non sia l'attuale proprietario del NFT, o un operatore autorizzato dell'attuale proprietario.
         Lancia un'eccezione se `_tokenId` non è un NFT valido. (NOTA: Questo non è scritto nell'EIP)
         Lancia un'eccezione se `_approved` è l'attuale proprietario. (NOTA: Questo non è scritto nell'EIP)
    @param _approved Indirizzo da approvare per l'ID del NFT specificato.
    @param _tokenId ID del token da approvare.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lancia un'eccezione se `_tokenId` non è un NFT valido
    assert owner != ZERO_ADDRESS
    # Lancia un'eccezione se `_approved` è l'attuale proprietario
    assert _approved != owner
```

Per convenzione, se non vuoi avere un approvatore, nomini l'indirizzo zero, non te stesso.

```python
    # Controlla i requisiti
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Per impostare un'approvazione puoi essere il proprietario o un operatore autorizzato dal proprietario.

```python
    # Imposta l'approvazione
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Abilita o disabilita l'approvazione per una terza parte ("operatore") per gestire tutti gli
         asset di `msg.sender`. Emette anche l'evento ApprovalForAll.
         Lancia un'eccezione se `_operator` è il `msg.sender`. (NOTA: Questo non è scritto nell'EIP)
    @notice Questo funziona anche se il mittente non possiede alcun token in quel momento.
    @param _operator Indirizzo da aggiungere all'insieme degli operatori autorizzati.
    @param _approved True se l'operatore è approvato, false per revocare l'approvazione.
    """
    # Lancia un'eccezione se `_operator` è il `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Coniare nuovi token e distruggere quelli esistenti {#mint-burn}

L'account che ha creato il contratto è il `minter`, il super utente autorizzato a coniare
nuovi NFT. Tuttavia, nemmeno a lui è consentito bruciare i token esistenti. Solo il proprietario, o un'entità
autorizzata dal proprietario, può farlo.

```python
### FUNZIONI PER CONIARE E BRUCIARE ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Questa funzione restituisce sempre `True`, perché se l'operazione fallisce subisce un revert.

```python
    """
    @dev Funzione per coniare token
         Lancia un'eccezione se `msg.sender` non è il minter.
         Lancia un'eccezione se `_to` è l'indirizzo zero.
         Lancia un'eccezione se `_tokenId` è posseduto da qualcuno.
    @param _to L'indirizzo che riceverà i token coniati.
    @param _tokenId L'id del token da coniare.
    @return Un booleano che indica se l'operazione ha avuto successo.
    """
    # Lancia un'eccezione se `msg.sender` non è il minter
    assert msg.sender == self.minter
```

Solo il minter (l'account che ha creato il contratto ERC-721) può coniare nuovi token. Questo può essere un
problema in futuro se vogliamo cambiare l'identità del minter. In
un contratto di produzione probabilmente vorresti una funzione che consenta al minter di trasferire
i privilegi di conio a qualcun altro.

```python
    # Lancia un'eccezione se `_to` è l'indirizzo zero
    assert _to != ZERO_ADDRESS
    # Aggiunge il NFT. Lancia un'eccezione se `_tokenId` è posseduto da qualcuno
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Per convenzione, il conio di nuovi token conta come un trasferimento dall'indirizzo zero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Brucia uno specifico token ERC-721.
         Lancia un'eccezione a meno che `msg.sender` non sia l'attuale proprietario, un operatore autorizzato o l'indirizzo
         approvato per questo NFT.
         Lancia un'eccezione se `_tokenId` non è un NFT valido.
    @param _tokenId uint256 id del token ERC-721 da bruciare.
    """
    # Controlla i requisiti
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Lancia un'eccezione se `_tokenId` non è un NFT valido
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Chiunque sia autorizzato a trasferire un token è autorizzato a bruciarlo. Sebbene bruciare appaia equivalente al
trasferimento all'indirizzo zero, l'indirizzo zero non riceve effettivamente il token. Questo ci consente di
liberare tutto lo spazio di archiviazione che è stato utilizzato per il token, il che può ridurre il costo in gas della transazione.

## Utilizzare questo contratto {#using-contract}

A differenza di Solidity, Vyper non ha l'ereditarietà. Questa è una scelta di progettazione deliberata per rendere il
codice più chiaro e quindi più facile da proteggere. Quindi, per creare il tuo contratto ERC-721 in Vyper, prendi [questo
contratto](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) e modificalo
per implementare la logica di business che desideri.

## Conclusione {#conclusion}

Per riepilogare, ecco alcune delle idee più importanti in questo contratto:

- Per ricevere token ERC-721 con un trasferimento sicuro, i contratti devono implementare l'interfaccia `ERC721Receiver`.
- Anche se usi il trasferimento sicuro, i token possono comunque rimanere bloccati se li invii a un indirizzo la cui chiave privata
  è sconosciuta.
- Quando c'è un problema con un'operazione è una buona idea eseguire il `revert` della chiamata, piuttosto che restituire semplicemente
  un valore di fallimento.
- I token ERC-721 esistono quando hanno un proprietario.
- Ci sono tre modi per essere autorizzati a trasferire un NFT. Puoi essere il proprietario, essere approvato per un token specifico,
  o essere un operatore per tutti i token del proprietario.
- Gli eventi passati sono visibili solo all'esterno della blockchain. Il codice in esecuzione all'interno della blockchain non può visualizzarli.

Ora vai e implementa contratti Vyper sicuri.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).