---
title: "Îndrumar pentru contractul Vyper ERC-721"
description: Contractul ERC-721 al lui Ryuya Nakamura și modul în care funcționează acesta
author: Ori Pomerantz
lang: ro
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Introducere {#introduction}

Se utilizează standardul [ERC-721](/developers/docs/standards/tokens/erc-721/) pentru a deține proprietatea asupra tokenurilor nefungibile (NFT-uri). Tokenurile [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportă ca o marfă, deoarece nu există nicio diferență între tokenurile individuale. Spre deosebire de acestea, tokenurile ERC-721 sunt concepute pentru active care sunt similare, dar nu identice, cum ar fi diverse [caricaturi de pisici](https://www.cryptokitties.co/) sau titluri pentru diferite proprietăți imobiliare.

În acest articol vom analiza [contractul ERC-721 al lui Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy). Acest contract este scris în [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un limbaj de contracte asemănător cu Python, destinat să facă mai dificilă scrierea de cod nesecurizat decât în Solidity.

## Contractul {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Comentariile în Vyper, la fel ca în Python, încep cu un hash (`#`) și continuă până la sfârșitul liniei. Comentariile care includ `@<keyword>` sunt utilizate de [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) pentru a produce documentație lizibilă de către om.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Interfața ERC-721 este încorporată în limbajul Vyper. [Puteți vedea definiția codului aici](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). Definiția interfeței este scrisă în Python în loc de Vyper, întrucât interfețele sunt utilizate nu doar în cadrul blockchain-ului, dar și când se trimite către blockchain o tranzacție de la un client extern, care poate să fie scrisă în Python.

Prima linie importă interfața, iar a doua specifică faptul că o implementăm aici.

### Interfața ERC721Receiver {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 acceptă două tipuri de transfer:

- `transferFrom`, care permite expeditorului să specifice orice adresă de destinație și atribuie expeditorului responsabilitatea transferului. Aceasta înseamnă că puteți efectua un transfer la o adresă nevalidă, caz în care NFT-ul este pierdut pentru totdeauna.
- `safeTransferFrom`, care verifică dacă adresa de destinație este un contract. În caz afirmativ, contractul ERC-721 întreabă contractul ce primește dacă dorește să primească NFT-ul.

Pentru a răspunde la solicitările `SafeTransferFrom`, un contract ce primește trebuie să implementeze `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Adresa `_from` este proprietarul actual al tokenului. Adresa `_operator` este cea care a solicitat transferul (cele două adrese pot să nu fie identice, din cauza alocațiilor).

```python
            _tokenId: uint256,
```

ID-urile tokenurilor ERC-721 au 256 de biți. De obicei acestea sunt create prin hash-area descrierii a ceea ce reprezintă tokenul.

```python
            _data: Bytes[1024]
```

Cererea poate avea până la 1024 de octeți de date utilizator.

```python
        ) -> bytes32: view
```

Pentru a preveni cazurile în care un contract acceptă din greșeală un transfer, valoarea de răspuns nu este un boolean, ci 256 de biți cu o valoare specifică.

Această funcție este un `view` (o vizualizare), adică poate citi starea blockchain-ului, fără a o putea modifica.

### Evenimente {#events}

[Evenimentele](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) sunt emise pentru a informa utilizatorii și serverele din afara blockchain-ului despre evenimente. De reținut că în blockchain conținutul evenimentelor nu este disponibil pentru contracte.

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

Acesta este similar cu un eveniment ERC-20 „Transfer”, cu excepția faptului că se raportează un `tokenId` în loc de o sumă. Nimeni nu deține adresa zero, așa că o utilizăm prin convenție pentru a indica crearea și distrugerea de tokenuri.

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

O aprobare ERC-721 este similară cu o alocație ERC-20. O anumită adresă este autorizată să transfere un anumit token. Acest fapt oferă un mecanism prin care contractele să răspundă atunci când acceptă un token. Contractele nu pot depista evenimente prin ascultare, așa că, dacă le transferați pur și simplu tokenul, ele nu „au cunoștință” despre aceasta. În acest fel, proprietarul prezintă mai întâi o aprobare și apoi trimite o cerere către contract: „Am autorizat transferul tokenului X, vă rog să faceți...".

S-a optat să se conceapă în acest fel pentru ca standardul ERC-721 să fie similar cu cel al ERC-20. Având în vedere că tokenurile ERC-721 nu sunt fungibile, un contract poate și să determine că a primit un anumit token văzând care este proprietarul tokenului.

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

Uneori este util să existe un _operator_ care să poată gestiona toate tokenurile de un anumit tip dintr-un cont (cele gestionate de un anumit contract), în mod similar cu atribuirea unei procuri. De exemplu, aș putea să acord o astfel de împuternicire unui contract care să verifice dacă nu l-am contactat timp de șase luni, iar în acest caz să-mi distribuie activele către moștenitorii mei (dacă unul dintre ei solicită acest lucru, contractele nu pot face nimic fără a fi apelate de o tranzacție). În cazul unui ERC-20, am putea foarte simplu să acordăm o alocație mare unui contract de moștenire, dar nu se poate face aceasta în ERC-721, deoarece tokenurile nu sunt fungibile. Acesta este echivalentul.

Valoarea `approved` (aprobată) ne spune dacă evenimentul se referă la o aprobare sau la retragerea unei aprobări.

### Variabilele de stare {#state-vars}

Aceste variabile conțin starea actuală a tokenurilor: care dintre ele sunt disponibile și cine le deține. Acestea sunt în mare parte obiecte `HashMap`, [mapări unidirecționale care există între două tipuri](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

Identitățile utilizatorului și ale contractului sunt reprezentate în Ethereum prin adrese de 160 de biți. Aceste două variabile mapează de la ID-urile tokenurilor atât la proprietarii lor, cât și la cei autorizați să le transfere (maximum unul pentru fiecare token). În Ethereum datele neinițializate sunt întotdeauna egale cu zero, deci dacă nu există un proprietar sau o persoană autorizată să îl transfere, valoarea acelui token este zero.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Această variabilă conține numărul de jetoane pentru fiecare proprietar. Deoarece nu există nicio corespondență între proprietari și tokenuri, singura modalitate de a identifica tokenurile pe care le deține un anumit proprietar este să ne uităm în urmă în istoricul evenimentelor din blockchain ca să găsim evenimentele `Transfer` corespunzătoare. Această variabilă ne permite să știm când avem toate NFT-urile, fără să mai fie nevoie să ne mai întoarcem în timp pentru a căuta.

De reținut este că acest algoritm funcționează numai pentru interfețele cu utilizatorul și serverele externe. Codul care rulează pe blockchain-ul propriu-zis nu poate citi evenimentele din trecut.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Un cont poate avea mai mult de un singur operator. Un simplu `HashMap` nu este suficient pentru a le ține evidența, întrucât fiecare cheie conduce la o singură valoare. Puteți folosi în schimb `HashMap[address, bool]` ca valoare. Valoarea implicită pentru fiecare adresă este `False`, adică nu este un operator. Puteți să o setați la `True` după necesități.

```python
# @dev Address of minter, who can mint a token
minter: address
```

Trebuie cumva să creăm tokenuri noi. Singura entitate care este autorizată să o facă în acest contract este `minter`-ul. Aceasta ar fi probabil suficientă pentru un joc, de exemplu. În alte scopuri ar putea fi necesar să creăm o logică operațională mai complicată.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) specifică un mecanism prin care un contract să dezvăluie modul în care aplicațiile pot să comunice cu acesta, cu care se conformează ERC-urile. În cazul nostru, contractul este în conformitate cu ERC-165 și ERC-721.

### Funcțiile {#functions}

Acestea sunt funcțiile care implementează efectiv ERC-721

#### Constructorul {#constructor}

```python
@external
def __init__():
```

În Vyper, ca și în Python, funcția constructorului se numește `__init__`.

```python
    """
    @dev Contract constructor.
    """
```

Atât în Python, cât și în Vyper, puteți să creați un comentariu, prin specificarea unui string de mai multe linii (care încep și se termină cu `"""`), fără a-l utiliza în vreun fel. Aceste comentarii pot include și [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Pentru a accesa variabilele de stare, utilizați `self.<variable name>` (din nou, la fel ca în Python).

#### Funcțiile „view” (de vizualizare) {#views}

Funcțiile acestea nu modifică starea blockchain-ului, deci pot fi executate gratuit dacă sunt apelate din exterior. Funcțiile „view” costă gaz dacă sunt apelate de un contract, acesta deoarece trebuie să le execute fiecare nod.

```python
@view
@external
```

Cuvintele-cheie care încep cu semnul (`@)` înaintea unei definiții de funcții se numesc _decorații_. Acestea indică circumstanțele în care poate fi apelată o funcție.

- `@view` precizează că această este o funcție de vizualizare.
- `@external` precizează că această funcție anume poate fi apelată atât de tranzacții, cât și de alte contracte.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Spre deosebire de Python, limbajul Vyper este un [limbaj static-typed](https://wikipedia.org/wiki/Type_system#Static_type_checking) (unde tipul variabilei este cunoscut la compilare, și nu la execuție). Nu puteți declara o variabilă sau un parametru al unei funcții fără a identifica [tipul datelor](https://vyper.readthedocs.io/en/latest/types.html). În cazul nostru, parametrul de intrare este `bytes32`, o valoare de 256 de biți (256 de biți este mărimea nativă a cuvântului pe [Mașina Virtuală Ethereum](/developers/docs/evm/)). Rezultatul este o valoare booleană. Prin convenție, numele parametrilor funcției încep cu un caracter de subliniere (`_`).

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Răspunde prin valoarea de tip HashMap `self.supportedInterfaces`, care este setată în constructor (`__init__`).

```python
### VIEW FUNCTIONS ###
```

Acestea sunt funcțiile de vizualizare care pun la dispoziția utilizatorilor și altor contracte informații despre tokenuri.

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

Această linie [precizează](https://vyper.readthedocs.io/en/latest/statements.html#assert) că `_owner` nu este zero. În caz contrar, apare o eroare și operația este inversată.

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

În Mașina Virtuală Ethereum (EVM) orice stocare fără nicio valoare stocată în ea, este zero. Dacă nu există niciun token în `_tokenId` atunci valoarea `self.idToOwner[_tokenId]` este zero. În acest caz funcția se inversează.

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

De remarcat că `getApproved` _poate_ să răspundă prin zero. Dacă tokenul este valid, acesta răspunde prin `self.idToApprovals[_tokenId]`. Dacă nu există niciun aprobator, atunci valoarea este zero.

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

Această funcție controlează dacă în acest contract `_operator`-ul este autorizat să gestioneze toate tokenurile `_owner`-ului. Întrucât pot exista mai mulți operatori, acesta este un HashMap cu două niveluri.

#### Funcții ajutătoare pentru transferuri {#transfer-helpers}

Aceste funcții implementează operațiuni care fac parte din transferul sau gestionarea tokenurilor.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Această decorație, `@internal`, indică faptul că această funcție este accesibilă numai din alte funcții din cadrul aceluiași contract. Prin convenție, aceste nume de funcții încep de asemenea cu un caracter de subliniere (`_`).

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

Există trei moduri prin care o adresă poate fi autorizată să transfere un token:

1. Adresa este proprietarul tokenului
2. Adresa este autorizată să cheltuiască tokenul
3. Adresa este un operator pentru proprietarului tokenului

Funcția de mai sus poate fi o funcție de vizualizare, deoarece nu schimbă starea. Pentru reducerea costurilor de operare, orice funcție care _poate_ fi de vizualizare _trebuie_ să fie o funcție de vizualizare.

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

Când avem o problemă cu un transfer, anulăm apelul funcției.

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

Schimbați valoarea numai dacă este necesar. Variabilele de stare locuiesc în spațiul de stocare. Scrierea în spațiul de stocare este una dintre cele mai scumpe operațiuni pe care le efectuează EVM (Mașina Virtuală Ethereum) (în ce privește [gazul](/developers/docs/gas/)). Prin urmare, este bine să o minimizăm, întrucât până și scrierea valorii existente costă mult.

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

Avem următoarea funcție internă deoarece există două moduri de a transfera tokenuri (normal și securizat), dar dorim să avem o singură locație în cod în care să facem acest lucru pentru a facilita auditul.

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

Pentru a emite un eveniment în Vyper, utilizați o instrucțiune `log` ([uitați-vă aici pentru a afla mai multe detalii](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funcțiile de transfer {#transfer-funs}

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

Această funcție vă permite să faceți transferuri la o adresă arbitrară. În afara cazului în care adresa este un utilizator sau un contract care știe cum să transfere tokenuri, orice token veți transfera se va bloca la adresa respectivă și va fi inutil.

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

Este bine să efectuați mai întâi transferul, deoarece, dacă există o problemă, îl vom inversa oricum, deci se va anula tot ceea ce s-a făcut pe durata apelului.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

Mai întâi verificați dacă adresa este un contract (dacă are cod). În caz contrar, presupunem că este o adresă de utilizator, iar utilizatorul va fi capabil să folosească sau să transfere tokenul. Dar nu vă lăsați prins în mrejele unei false impresii de securitate. Vă puteți pierde tokenurile chiar și cu `safeTransferFrom` dacă le transferați la o adresă a cărei cheie privată nu o cunoaște nimeni.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Apelați contractul țintă pentru a vedea dacă poate primi tokenuri ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

În cazul când destinația este un contract, dar acesta nu acceptă tokenuri ERC-721 (sau a decis doar să nu accepte acest transfer anume), întoarceți apelul.

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

Prin convenție, dacă nu vreți să aveți un aprobator, desemnați adresa zero, și nu pe dvs.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Pentru a configura o aprobare, puteți să fiți atât proprietarul, cât și un operator autorizat de proprietar.

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

#### Emiterea de jetoane noi și distrugerea celor existente {#mint-burn}

Contul care a creat contractul este `minter`-ul, super-utilizatorul care este autorizat să emită noi NFT-uri. Cu toate acestea, nici chiar el nu este autorizat să ardă tokenurile existente. O poate face numai proprietarul sau o entitate autorizată de acesta.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Această funcție răspunde întotdeauna prin `True` deoarece este inversată în cazul eșecului operației.

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

Numai „minter-ul” (contul care a creat contractul ERC-721) poate emite („mint”) tokenuri noi. Aceasta poate fi o problemă dacă în viitor am dori să schimbăm identitatea „minter-ului”. Într-un contract de producție ar fi de dorit să aveți o funcție care să permită „minter-ului” să transfere privilegiile sale de „minter” altcuiva.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Prin convenție, emiterea de tokenuri noi contează ca un transfer de la adresa zero.

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

Oricine este autorizat să transfere un token este autorizat să îl și ardă. În timp ce arderea pare echivalentul unui transfer la adresa zero, această adresă nu primește de fapt tokenul. Aceasta ne permite să eliberăm tot spațiul de stocare folosit pentru token, ceea ce poate reduce costul de gaz al tranzacției.

# Utilizarea acestui contract {#using-contract}

Spre deosebire de Solidity, Vyper nu are funcția de moștenire. Aceasta este o opțiune deliberată de concepție, pentru a conferi claritate codului, facilitându-i prin aceasta securizarea. Deci, pentru a vă crea propriul contract Vyper ERC-721, porniți de la [acest contract](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) și modificați-l pentru a implementa logica operațională pe care o doriți.

# Concluzie {#conclusion}

În recapitulare, iată câteva din cele mai importante idei din acest contract:

- Pentru a primi tokenurile ERC-721 printr-un transfer securizat, contractele trebuie să implementeze interfața `ERC721Receiver`.
- Chiar dacă folosiți transferul securizat, tokenurile pot rămâne blocate atunci când le trimiteți la o adresă a cărei cheie privată este necunoscută.
- Când apare o problemă la o operațiune, este mai bine să `anulați` apelul decât să răspundeți pur și simplu printr-o valoare de eșec.
- Tokenurile ERC-721 există numai dacă au un proprietar.
- Există trei modalități de a fi autorizat să transferați un NFT. (1) Dacă sunteți proprietarul, (2) dacă aveți o aprobare pentru un anumit token sau (3) dacă sunteți operator pentru toate tokenurile proprietarului.
- Evenimentele din trecut sunt vizibile doar în afara blockchain-ului. Codul care se execută în interiorul blockchain-ului nu le poate vedea.

Haideți acum să începeți să implementați contracte Vyper securizate.
