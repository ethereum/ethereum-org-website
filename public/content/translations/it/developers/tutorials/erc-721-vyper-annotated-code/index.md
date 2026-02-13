---
title: "Analisi dettagliata del contratto ERC-721 in Vyper"
description: Il contratto ERC-721 di Ryuya Nakamura e come funziona
author: Ori Pomerantz
lang: it
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Introduzione {#introduction}

Lo standard [ERC-721](/developers/docs/standards/tokens/erc-721/) è usato per detenere la proprietà di Token Non Fungibili (NFT).
I token [ERC-20](/developers/docs/standards/tokens/erc-20/) si comportano come una commodity, perché non c'è differenza tra i singoli token.
Al contrario, i token ERC-721 sono progettati per asset simili ma non identici, come diversi cartoni
di gatti o titoli di diverse proprietà immobiliari.

In questo articolo analizzeremo il [contratto ERC-721 di Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Questo contratto è scritto in [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un linguaggio per contratti simile a Python, progettato per rendere
più difficile scrivere codice insicuro di quanto lo sia in Solidity.

## Il Contratto {#contract}

```python
# @dev Implementazione dello standard dei token non fungibili ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modificato da: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

I commenti in Vyper, come in Python, iniziano con un hash (`#`) e continuano fino alla fine della riga. I commenti che includono
`@<keyword>` sono utilizzati da [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) per produrre documentazione
leggibile.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

L'interfaccia ERC-721 è integrata nel linguaggio Vyper.
[Puoi vedere la definizione del codice qui](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
La definizione dell'interfaccia è scritta in Python, anziché in Vyper, perché le interfacce non sono usate solo nella blockchain, ma anche quando si invia una transazione alla blockchain da un client esterno, che potrebbe esser scritto in
Python.

La prima riga importa l'interfaccia, la seconda specifica che la stiamo implementando qui.

### L'interfaccia ERC721Receiver {#receiver-interface}

```python
# Interfaccia per il contratto chiamato da safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

L'ERC-721 supporta due tipi di trasferimento:

- `transferFrom`, che consente al mittente di specificare qualsiasi indirizzo di destinazione e attribuisce la responsabilità
  del trasferimento al mittente. Ciò significa che puoi trasferire a un indirizzo non valido, nel qual caso
  l'NFT è perso per sempre.
- `safeTransferFrom`, che controlla se l'indirizzo di destinazione è un contratto. In tal caso, il contratto ERC-721
  chiede al contratto ricevente se vuole ricevere l’NFT.

Per rispondere alle richieste `safeTransferFrom`, un contratto ricevente deve implementare `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

L'indirizzo `_from` è il proprietario corrente del token. L'indirizzo `_operator` è quello che
ha richiesto il trasferimento (i due potrebbero non essere gli stessi, a causa delle autorizzazioni).

```python
            _tokenId: uint256,
```

Gli ID dei token ERC-721 sono a 256 bit. Generalmente, sono creati tramite l'hashing di una descrizione di ciò che
il token rappresenta.

```python
            _data: Bytes[1024]
```

La richiesta può avere fino a 1024 byte di dati utente.

```python
        ) -> bytes32: view
```

Per evitare i casi in cui un contratto accetti accidentalmente un trasferimento, il valore restituito non è un booleano,
ma 256 bit con un valore specifico.

Questa funzione è una `view`, ovvero può leggere lo stato della blockchain, ma non modificarlo.

### Eventi {#events}

Gli [Eventi](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
sono emessi per informare gli utenti e i server al di fuori della blockchain degli eventi. Nota che il contenuto degli eventi
non è disponibile per i contratti sulla blockchain.

```python
# @dev Emette quando la proprietà di un qualsiasi NFT cambia con qualsiasi meccanismo. Questo evento viene emesso quando gli NFT sono
#      creati (`from` == 0) e distrutti (`to` == 0). Eccezione: durante la creazione del contratto, un qualsiasi
#      numero di NFT può essere creato e assegnato senza emettere un evento Transfer. Al momento di ogni
#      trasferimento, l'indirizzo approvato per quell'NFT (se presente) viene reimpostato su nessuno.
# @param _from Mittente dell'NFT (se l'indirizzo è l'indirizzo zero, indica la creazione del token).
# @param _to Destinatario dell'NFT (se l'indirizzo è l'indirizzo zero, indica la distruzione del token).
# @param _tokenId L'NFT che è stato trasferito.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Questo è simile all'evento di trasferimento dell'ERC-20, con la differenza che viene segnalato un `tokenId` invece di un importo.
Nessuno possiede l'indirizzo zero, quindi per convenzione lo usiamo per segnalare la creazione e distruzione dei token.

```python
# @dev Viene emesso quando l'indirizzo approvato per un NFT viene modificato o riconfermato. L'indirizzo
#      zero indica che non c'è nessun indirizzo approvato. Quando un evento Transfer viene emesso, questo
#      indica anche che l'indirizzo approvato per quell'NFT (se presente) viene reimpostato su nessuno.
# @param _owner Proprietario dell'NFT.
# @param _approved Indirizzo che stiamo approvando.
# @param _tokenId NFT che stiamo approvando.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Un'approvazione ERC-721 è simile a un'autorizzazione ERC-20. A un indirizzo specifico è consentito trasferire uno specifico
token. Questo offre ai contratti un meccanismo per rispondere quando accettano un token. I contratti non possono
rimanere in ascolto degli eventi, quindi se si trasferisce loro semplicemente il token non ne vengono a "conoscenza". In questo modo il
proprietario prima invia un'approvazione e poi una richiesta al contratto: "Ti ho approvato per trasferire il token
X, procedi pure...".

Si tratta di una scelta di progettazione per rendere lo standard ERC-721 simile allo standard ERC-20. Poiché
i token ERC-721 non sono fungibili, un contratto può anche identificare di aver ricevuto un token specifico
controllando la proprietà del token.

```python
# @dev Emette quando un operatore è abilitato o disabilitato per un proprietario. L'operatore può gestire
#      tutti gli NFT del proprietario.
# @param _owner Proprietario dell'NFT.
# @param _operator Indirizzo al quale stiamo impostando i diritti di operatore.
# @param _approved Stato dei diritti di operatore (true se i diritti di operatore sono concessi e false se
# revocati).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

A volte è utile avere un _operatore_ che possa gestire tutti i token di un account di un tipo specifico (quelli gestiti da
un contratto specifico), in modo simile a una procura. Ad esempio, potrei voler dare tale potere a un contratto che controlli se
non l'ho contattato per sei mesi e, in tal caso, distribuisca i miei asset ai miei eredi (se uno di loro lo richiede, i contratti
non possono fare nulla senza essere chiamati da una transazione). In ERC-20 possiamo semplicemente dare un'elevata autorizzazione a un contratto di successione,
ma ciò non funziona per ERC-721 perché i token non sono fungibili. Questo è l'equivalente.

Il valore `approved` ci dice se l'evento è per un'approvazione o per la revoca di un'approvazione.

### Variabili di Stato {#state-vars}

Queste variabili contengono lo stato corrente dei token: quali sono disponibili e chi li possiede. La maggior parte di queste
sono oggetti `HashMap`, [mappature unidirezionali che esistono tra due tipi](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mappatura dall'ID dell'NFT all'indirizzo che lo possiede.
idToOwner: HashMap[uint256, address]

# @dev Mappatura dall'ID dell'NFT all'indirizzo approvato.
idToApprovals: HashMap[uint256, address]
```

Le identità dell'utente e del contratto su Ethereum sono rappresentate da indirizzi a 160 bit. Queste due variabili mappano
dagli ID dei token ai loro proprietari e a coloro approvati a trasferirli (per un massimo di uno per ciascuno). In Ethereum,
i dati non inizializzati sono sempre zero, quindi se non c'è alcun proprietario o trasferitore approvato, il valore per quel token
è zero.

```python
# @dev Mappatura dall'indirizzo del proprietario al conteggio dei suoi token.
ownerToNFTokenCount: HashMap[address, uint256]
```

Questa variabile contiene il conteggio dei token per ogni proprietario. Non esiste una mappatura dai proprietari ai token, quindi
l'unico modo per identificare i token posseduti da un proprietario specifico è guardare indietro nella cronologia degli eventi della blockchain
e vedere gli eventi `Transfer` appropriati. Possiamo usare questa variabile per sapere quando abbiamo tutti gli NFT e non
abbiamo bisogno di guardare ancora più indietro nel tempo.

Nota che questo algoritmo funziona solo per le interfacce utente e i server esterni. Il codice in esecuzione sulla blockchain
stessa non può leggere gli eventi passati.

```python
# @dev Mappatura dall'indirizzo del proprietario alla mappatura degli indirizzi degli operatori.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Un account può avere più di un singolo operatore. Un semplice `HashMap` è insufficiente per
tenerne traccia, perché ogni chiave porta a un singolo valore. Invece, è possibile utilizzare
`HashMap[address, bool]` come valore. Per impostazione predefinita, il valore per ogni indirizzo è `False`, il che significa che
non è un operatore. È possibile impostare i valori su `True` secondo necessità.

```python
# @dev Indirizzo del minter, che può coniare un token
minter: address
```

I nuovi token devono essere creati in qualche modo. In questo contratto c'è una sola entità autorizzata a farlo, il
`minter`. Questo è probabilmente sufficiente per un gioco, ad esempio. Per altri scopi, potrebbe essere necessario
creare una logica di business più complicata.

```python
# @dev Mappatura dell'ID dell'interfaccia a un valore booleano che indica se è supportata o meno
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID dell'interfaccia ERC165 di ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID dell'interfaccia ERC165 di ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) specifica un meccanismo con cui un contratto può rivelare come le applicazioni
possono comunicare con esso, a quali ERC è conforme. In questo caso, il contratto è conforme a ERC-165 ed ERC-721.

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
    @dev Costruttore del contratto.
    """
```

In Python, e in Vyper, è possibile anche creare un commento specificando una stringa su più righe (che inizia e finisce
con `"""`), e non utilizzandola in alcun modo. Questi commenti possono anche includere
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Per accedere alle variabili di stato si usa `self.<nome variabile>` (di nuovo, come in Python).

#### Funzioni di visualizzazione {#views}

Queste sono funzioni che non modificano lo stato della blockchain e che quindi possono essere eseguite gratuitamente
se chiamate esternamente. Se le funzioni di visualizzazione sono chiamate da un contratto, devono comunque essere eseguite su
ogni nodo e, di conseguenza, costano gas.

```python
@view
@external
```

Queste parole chiave prima di una definizione di funzione che iniziano con una chiocciola (`@`) sono chiamate _decorazioni_. Specificano
le circostanze in cui una funzione può essere chiamata.

- `@view` specifica che questa funzione è una vista.
- `@external` specifica che questa particolare funzione può essere chiamata da transazioni e da altri contratti.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

A differenza di Python, Vyper è un [linguaggio a tipizzazione statica](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Non è possibile dichiarare una variabile, o un parametro di funzione, senza identificarne il [tipo di dato](https://vyper.readthedocs.io/en/latest/types.html). In questo caso il parametro di input è `bytes32`, un valore a 256 bit
(256 bit è la dimensione nativa della parola della [Ethereum Virtual Machine](/developers/docs/evm/)). L'output è un valore booleano
. Per convenzione, i nomi dei parametri della funzione iniziano con un trattino basso (`_`).

```python
    """
    @dev L'identificazione dell'interfaccia è specificata in ERC-165.
    @param _interfaceID Id dell'interfaccia
    """
    return self.supportedInterfaces[_interfaceID]
```

Restituisce il valore dall'HashMap `self.supportedInterfaces`, che è impostato nel costruttore (`__init__`).

```python
### FUNZIONI DI VISUALIZZAZIONE ###

```

Queste sono le funzioni di visualizzazione che rendono le informazioni sui token disponibili a utenti e altri contratti.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Restituisce il numero di NFT posseduti da `_owner`.
         Genera un'eccezione se `_owner` è l'indirizzo zero. Gli NFT assegnati all'indirizzo zero sono considerati non validi.
    @param _owner Indirizzo per il quale interrogare il saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Questa riga [afferma](https://vyper.readthedocs.io/en/latest/statements.html#assert) che `_owner` non è
zero. Se lo è, si verifica un errore e l'operazione viene annullata.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Restituisce l'indirizzo del proprietario dell'NFT.
         Genera un'eccezione se `_tokenId` non è un NFT valido.
    @param _tokenId L'identificatore di un NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Genera un'eccezione se `_tokenId` non è un NFT valido
    assert owner != ZERO_ADDRESS
    return owner
```

Nella Ethereum Virtual Machine (EVM), qualsiasi spazio di archiviazione che non ha un valore memorizzato è zero.
Se non esiste alcun token in `_tokenId`, il valore di `self.idToOwner[_tokenId]` è zero. In tal
caso la funzione viene annullata.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Ottiene l'indirizzo approvato per un singolo NFT.
         Genera un'eccezione se `_tokenId` non è un NFT valido.
    @param _tokenId ID dell'NFT di cui interrogare l'approvazione.
    """
    # Genera un'eccezione se `_tokenId` non è un NFT valido
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Nota che `getApproved` _può_ restituire zero. Se il token è valido, restituisce `self.idToApprovals[_tokenId]`.
Se non c'è alcun approvatore, quel valore è zero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Controlla se `_operator` è un operatore approvato per `_owner`.
    @param _owner L'indirizzo che possiede gli NFT.
    @param _operator L'indirizzo che agisce per conto del proprietario.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Questa funzione controlla se `_operator` è autorizzato a gestire tutti i token di `_owner` in questo contratto.
Poiché possono esserci più operatori, si tratta di un HashMap a due livelli.

#### Funzioni di supporto per il trasferimento {#transfer-helpers}

Queste funzioni implementano operazioni che fanno parte del trasferimento o della gestione dei token.

```python

### FUNZIONI DI SUPPORTO PER IL TRASFERIMENTO ###

@view
@internal
```

Questa decorazione, `@internal`, significa che la funzione è accessibile solo da altre funzioni all'interno dello
stesso contratto. Per convenzione, anche i nomi di queste funzioni iniziano con un trattino basso (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Restituisce se lo spender specificato può trasferire un determinato ID di token
    @param spender indirizzo dello spender da interrogare
    @param tokenId uint256 ID del token da trasferire
    @return bool se msg.sender è approvato per l'ID di token dato,
        è un operatore del proprietario, o è il proprietario del token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Ci sono tre modi in cui un indirizzo può essere autorizzato a trasferire un token:

1. L'indirizzo è il proprietario del token
2. L'indirizzo è approvato per spendere quel token
3. L'indirizzo è un operatore per il proprietario del token

La funzione di cui sopra può essere una vista perché non cambia lo stato. Per ridurre i costi operativi, qualsiasi
funzione che _può_ essere una vista _dovrebbe_ essere una vista.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Aggiunge un NFT a un dato indirizzo
         Genera un'eccezione se `_tokenId` è di proprietà di qualcuno.
    """
    # Genera un'eccezione se `_tokenId` è di proprietà di qualcuno
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Cambia il proprietario
    self.idToOwner[_tokenId] = _to
    # Cambia il tracciamento del conteggio
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Rimuove un NFT da un dato indirizzo
         Genera un'eccezione se `_from` non è il proprietario corrente.
    """
    # Genera un'eccezione se `_from` non è il proprietario corrente
    assert self.idToOwner[_tokenId] == _from
    # Cambia il proprietario
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Cambia il tracciamento del conteggio
    self.ownerToNFTokenCount[_from] -= 1
```

Quando c'è un problema con un trasferimento, annulliamo la chiamata.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Cancella un'approvazione di un dato indirizzo
         Genera un'eccezione se `_owner` non è il proprietario corrente.
    """
    # Genera un'eccezione se `_owner` non è il proprietario corrente
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reimposta le approvazioni
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Cambiare il valore solo se necessario. Le variabili di stato risiedono nello spazio di archiviazione. La scrittura nello spazio di archiviazione è
una delle operazioni più costose che l'EVM (Ethereum Virtual Machine) esegue (in termini di
[gas](/developers/docs/gas/)). Pertanto, è una buona idea ridurla al minimo, anche la scrittura del
valore esistente ha un costo elevato.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Esegue il trasferimento di un NFT.
         Genera un'eccezione a meno che `msg.sender` non sia il proprietario corrente, un operatore autorizzato o l'indirizzo approvato
         per questo NFT. (NOTA: `msg.sender` non è consentito in una funzione privata, quindi passa `_sender`.)
         Genera un'eccezione se `_to` è l'indirizzo zero.
         Genera un'eccezione se `_from` non è il proprietario corrente.
         Genera un'eccezione se `_tokenId` non è un NFT valido.
    """
```

Abbiamo questa funzione interna perché ci sono due modi per trasferire i token (regolare e sicuro), ma
vogliamo solo un unico punto nel codice in cui lo facciamo per facilitare il controllo.

```python
    # Controlla i requisiti
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Genera un'eccezione se `_to` è l'indirizzo zero
    assert _to != ZERO_ADDRESS
    # Cancella l'approvazione. Genera un'eccezione se `_from` non è il proprietario corrente
    self._clearApproval(_from, _tokenId)
    # Rimuovi l'NFT. Genera un'eccezione se `_tokenId` non è un NFT valido
    self._removeTokenFrom(_from, _tokenId)
    # Aggiungi l'NFT
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
    @dev Genera un'eccezione a meno che `msg.sender` non sia il proprietario corrente, un operatore autorizzato o l'indirizzo approvato
         per questo NFT.
         Genera un'eccezione se `_from` non è il proprietario corrente.
         Genera un'eccezione se `_to` è l'indirizzo zero.
         Genera un'eccezione se `_tokenId` non è un NFT valido.
    @notice Il chiamante è responsabile di confermare che `_to` è in grado di ricevere NFT, altrimenti
            potrebbero essere persi in modo permanente.
    @param _from Il proprietario attuale dell'NFT.
    @param _to Il nuovo proprietario.
    @param _tokenId L'NFT da trasferire.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Questa funzione permette di trasferire a un indirizzo arbitrario. A meno che l'indirizzo non sia un utente o un contratto che
sa come trasferire i token, qualsiasi token trasferito rimarrà bloccato in quell'indirizzo e sarà inutilizzabile.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Trasferisce la proprietà di un NFT da un indirizzo a un altro.
         Genera un'eccezione a meno che `msg.sender` non sia il proprietario corrente, un operatore autorizzato o
         l'indirizzo approvato per questo NFT.
         Genera un'eccezione se `_from` non è il proprietario corrente.
         Genera un'eccezione se `_to` è l'indirizzo zero.
         Genera un'eccezione se `_tokenId` non è un NFT valido.
         Se `_to` è uno smart contract, chiama `onERC721Received` su `_to` e genera un'eccezione se
         il valore restituito non è `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTA: bytes4 è rappresentato da bytes32 con riempimento
    @param _from Il proprietario attuale dell'NFT.
    @param _to Il nuovo proprietario.
    @param _tokenId L'NFT da trasferire.
    @param _data Dati aggiuntivi senza formato specificato, inviati nella chiamata a `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Va bene effettuare prima il trasferimento perché se c'è un problema, l'operazione verrà comunque annullata,
quindi tutto ciò che è stato fatto nella chiamata sarà annullato.

```python
    if _to.is_contract: # controlla se `_to` è un indirizzo di contratto
```

Prima controlla se l'indirizzo è un contratto (se ha del codice). In caso contrario, si presume che sia un indirizzo
di utente e che l'utente sarà in grado di utilizzare il token o di trasferirlo. Ma non lasciarti cullare
in un falso senso di sicurezza. Puoi perdere i token, anche con `safeTransferFrom`, se li trasferisci
a un indirizzo di cui nessuno conosce la chiave privata.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chiama il contratto di destinazione per vedere se può ricevere i token ERC-721.

```python
        # Genera un'eccezione se la destinazione del trasferimento è un contratto che non implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Se la destinazione è un contratto, ma uno che non accetta token ERC-721 (o che ha deciso di non accettare questo
particolare trasferimento), annulla.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Imposta o riconferma l'indirizzo approvato per un NFT. L'indirizzo zero indica che non c'è nessun indirizzo approvato.
         Genera un'eccezione a meno che `msg.sender` non sia il proprietario corrente dell'NFT, o un operatore autorizzato del proprietario corrente.
         Genera un'eccezione se `_tokenId` non è un NFT valido. (NOTA: questo non è scritto nell'EIP)
         Genera un'eccezione se `_approved` è il proprietario corrente. (NOTA: questo non è scritto nell'EIP)
    @param _approved Indirizzo da approvare per il dato ID NFT.
    @param _tokenId ID del token da approvare.
    """
    owner: address = self.idToOwner[_tokenId]
    # Genera un'eccezione se `_tokenId` non è un NFT valido
    assert owner != ZERO_ADDRESS
    # Genera un'eccezione se `_approved` è il proprietario corrente
    assert _approved != owner
```

Per convenzione, se non si desidera avere un approvatore, si nomina l'indirizzo zero, non se stessi.

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
    @dev Abilita o disabilita l'approvazione per una terza parte ("operatore") per la gestione di tutte le
         risorse di `msg.sender`. Emette anche l'evento ApprovalForAll.
         Genera un'eccezione se `_operator` è il `msg.sender`. (NOTA: questo non è scritto nell'EIP)
    @notice Funziona anche se il mittente non possiede alcun token al momento.
    @param _operator Indirizzo da aggiungere al set di operatori autorizzati.
    @param _approved True se l'operatore è approvato, false per revocare l'approvazione.
    """
    # Genera un'eccezione se `_operator` è il `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Conia nuovi token e distruggi quelli esistenti {#mint-burn}

L'account che ha creato il contratto è il `minter`, il super utente autorizzato a coniare
nuovi NFT. Tuttavia, anche a lui non è permesso bruciare i token esistenti. Solo il proprietario, o un'entità
autorizzata dal proprietario, può farlo.

```python
### FUNZIONI DI CONIO E BRUCIATURA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Questa funzione restituisce sempre `True`, perché se l'operazione fallisce, viene annullata.

```python
    """
    @dev Funzione per coniare token
         Genera un'eccezione se `msg.sender` non è il minter.
         Genera un'eccezione se `_to` è l'indirizzo zero.
         Genera un'eccezione se `_tokenId` è di proprietà di qualcuno.
    @param _to L'indirizzo che riceverà i token coniati.
    @param _tokenId L'id del token da coniare.
    @return Un booleano che indica se l'operazione è andata a buon fine.
    """
    # Genera un'eccezione se `msg.sender` non è il minter
    assert msg.sender == self.minter
```

Solo il minter (l'account che ha creato il contratto ERC-721) può coniare nuovi token. Questo potrebbe essere un
problema in futuro se volessimo cambiare l'identità del minter. In
un contratto di produzione, probabilmente vorresti una funzione che permetta al minter di trasferire
i privilegi di minter a qualcun altro.

```python
    # Genera un'eccezione se `_to` è l'indirizzo zero
    assert _to != ZERO_ADDRESS
    # Aggiungi NFT. Genera un'eccezione se `_tokenId` è di proprietà di qualcuno
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Per convenzione, il conio di nuovi token conta come un trasferimento dall'indirizzo zero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Brucia uno specifico token ERC721.
         Genera un'eccezione a meno che `msg.sender` non sia il proprietario corrente, un operatore autorizzato o l'indirizzo approvato
         per questo NFT.
         Genera un'eccezione se `_tokenId` non è un NFT valido.
    @param _tokenId uint256 id del token ERC721 da bruciare.
    """
    # Controlla i requisiti
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Genera un'eccezione se `_tokenId` non è un NFT valido
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Chiunque sia autorizzato a trasferire un token è autorizzato a bruciarlo. Anche se una bruciatura appare equivalente a un
trasferimento all'indirizzo zero, l'indirizzo zero non riceve effettivamente il token. Questo ci permette di
liberare tutto lo spazio di archiviazione utilizzato per il token, il che può ridurre il costo del gas della transazione.

## Utilizzo di questo contratto {#using-contract}

A differenza di Solidity, Vyper non ha ereditarietà. Si tratta di una scelta progettuale deliberata per rendere il codice
più chiaro e quindi più facile da proteggere. Quindi, per creare il tuo contratto ERC-721 in Vyper, prendi questo
contratto e lo modifichi
per implementare la logica di business che desideri.

## Conclusione {#conclusion}

Per un ripasso, ecco alcune delle idee più importanti in questo contratto:

- Per ricevere i token ERC-721 con un trasferimento sicuro, i contratti devono implementare l'interfaccia `ERC721Receiver`.
- Anche se si utilizza il trasferimento sicuro, i token possono comunque rimanere bloccati se li si invia a un indirizzo la cui chiave privata
  è sconosciuta.
- Quando si verifica un problema con un'operazione, è una buona idea `annullare` la chiamata, piuttosto che restituire semplicemente
  un valore di fallimento.
- I token ERC-721 esistono quando hanno un proprietario.
- Ci sono tre modi per essere autorizzati a trasferire un NFT. Puoi essere il proprietario, essere approvato per un token specifico,
  o essere un operatore per tutti i token del proprietario.
- Gli eventi passati sono visibili solo al di fuori della blockchain. Il codice in esecuzione all'interno della blockchain non può visualizzarli.

Ora vai e implementa contratti sicuri in Vyper.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).

