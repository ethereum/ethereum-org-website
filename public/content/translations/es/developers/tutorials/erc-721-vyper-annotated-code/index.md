---
title: "Una explicación del contrato ERC-721"
description: El contrato ERC-721 de Ryuya Nakamura y cómo funciona
author: Ori Pomerantz
lang: es
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Introducción {#introduction}

La norma [ERC-721](/developers/docs/standards/tokens/erc-721/) sirve para mantener la propiedad de los tókenes no fungibles (o NFT). Los tókenes [ERC-20](/developers/docs/standards/tokens/erc-20/) actúan como mercancía, porque no hay diferencia entre tókenes individuales. En contraste, los tókenes ERC-721 están diseñados para activos similares, pero no identicos, tales como [catcartoons](https://www.cryptokitties.co/) o títulos a diferentes piezas de bienes inmuebles.

En este artículo analizaremos [ el contrato ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy). Este contrato está escrito en [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un lenguaje de contrato similar a Python diseñado para hacer más difícil escribir código inseguro que en Solidity.

## El contrato {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Comentarios en Vyper, como en Python, empiezan con un hash (`#`) y continúan hasta el final de la línea. Comentarios que incluyen `@<keyword>` los usan [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) para producir documentación legible.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

La interfaz ERC-721 está integrada en el lenguaje Vyper. [Puede ver la definición del código aquí](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). La definición de la interfaz está escrita en Python, en lugar de Vyper, porque las interfaces se utilizan no solo dentro de la cadena de bloques, sino que también al enviar a la cadena de bloques una transacción desde un cliente externo, que puede estar escrito en Python.

La primera línea importa la interfaz, y la segunda especifica que la estamos implementando aquí.

### La interfaz de receptor ERC721 {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 soporta dos tipos de transferencia:

- `transferFrom`, que permite al remitente especificar cualquier dirección de destino y responsabiliza al remitente de la transferencia. Esto significa que puede transferir a una dirección no válida, en cuyo caso el NFT se pierde para siempre.
- `safeTransferFrom`, que comprueba si la dirección de destino es un contrato. Si es así, el contrato ERC-721 le pregunta al contrato receptor si quiere recibir el NFT.

Para responder a `safeTransferFrom`, se solicitará un contrato receptor que implemente `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

La dirección `_from` es el dueño actual del token. La dirección `_operador` es la que solicitó la transferencia (estos dos no pueden ser los mismos, debido a permisos).

```python
            _tokenId: uint256,
```

Las ID del token ERC-721 son de 256 bits. Normalmente se crean al cifrar una descripción de lo que sea representara el token.

```python
            _data: Bytes[1024]
```

La solicitud puede tener hasta 1.024 bytes de datos de usuario.

```python
        ) -> bytes32: view
```

Para prevenir casos en los que un contrato acepte accidentalmente una transferencia, el valor de retorno no es un booleano, si no 256 bits con un valor específico.

Esta función es una ` view`, lo que significa que puede leer el estado de la cadena de bloques, pero no modificarla.

### Events {#events}

[Los eventos](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) se emiten para informar a los usuarios y servidores fuera de la cadena de bloques de eventos. Tenga en cuenta que el contenido de los eventos no está disponible para los contratos en la cadena de bloques.

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transferred.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Esto es similar a una transferencia de ERC-20, excepto que informamos de un `tokenId` en lugar de una cantidad. Nadie tiene la dirección cero, así que convencionalmente la utilizamos para informar de la creación y destrucción de tókenes .

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

La aprobación de una norma ERC-721 es similar a una autorización para el ERC. Se permite una dirección específica para transferir un token específico. Esto da un mecanismo para que los contratos respondan cuando aceptan un token. Los contratos no pueden escuchar eventos, así que si solo transfiere el token a ellos, estos no lo sabrán. De esta manera el propietario de envía primero una aprobación y luego envía una solicitud al contrato: «He aprobado la transferencia del token X, hágalo por favor...».

Esta es una opción de diseño para hacer que la norma ERC-721 sea similar la norma ERC-20. Debido a que los tókenes ERC-721 no son fungibles, un contrato también puede identificar que obtuvo un token específico mirando la propiedad del token.

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

A veces es útil tener un _operator_ que pueda administrar todos los tókenes de una cuenta de un tipo específico (aquellos que administra un contrato específico), similar a un poder notarial. Por ejemplo, querría dar tal poder a un contrato que comprueba si no me he puesto en contacto con él durante seis meses. Y si así lo desea, distribuye mis activos a mis herederos (si uno de ellos lo solicita, los contratos no pueden hacer nada sin ser invocados por una transacción). En ERC-20 sólo podemos dar una alta asignación a un contrato de herencia, pero eso no funciona para ERC-721 porque los tókenes no son fungibles. Este es el equivalente.

El valor `approved` nos dice si el evento es para una aprobación o la retirada de una aprobación.

### Variables de estado {#state-vars}

Estas variables contienen el estado actual de los tókenes: cuáles están disponibles y quién los posee. La mayoría de estos son objetos de `HashMap`, [, asignaciones unidireccionales que existen entre dos tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

Las identidades del usuario y del contrato en Ethereum vienen representadas por direcciones de 160-bits. Estas dos variables mapean desde identificadores de tókenes a sus propietarios y aquellos aprobados para transferirlos (máximo uno para cada uno). En Ethereum, los datos no inicializados siempre son cero, así que si no hay ningún propietario o transferidor aprobado, el valor para ese token es cero.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variable tiene el recuento de tókenes para cada propietario. No hay mapeo de propietarios a tókenes, así que la única manera de identificar los tókenes que posee un propietario específico es mirar el historial de eventos de la cadena de bloques y ver los eventos apropiados de `Transfer`. Podemos usar esta variable para saber cuando tenemos todos los NFT y no necesitamos mirar aún más a tiempo.

Tenga en cuenta que este algoritmo sólo funciona para interfaces de usuario y servidores externos. El código en ejecución en la cadena de bloques no puede leer eventos pasados.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Una cuenta puede tener más de un operador único. Un simple `HashMap` es insuficiente para llevar un seguimiento de ellos, porque cada clave conduce a un único valor. En su lugar, puede utilizar `HashMap[address, bool]` como el valor. Por defecto, el valor para cada dirección es `False`, lo que significa que no es un operador. Puede establecer valores a `True` según sea necesario.

```python
# @dev Address of minter, who can mint a token
minter: address
```

Hay que crear nuevos tókenes de alguna manera. En este contrato hay una única entidad que puede hacerlo, el `minter`. Es probable que esto sea suficiente para un juego, por ejemplo. Para otros propósitos, podría ser necesario crear una lógica de negocio más complicada.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica un mecanismo para un contrato para divulgar cómo las aplicaciones pueden comunicarse con él, con qué ERC concuerda. En este caso, el contrato se ajusta a ERC-165 y ERC-721.

### Funciones {#functions}

Estas son las funciones que implementan ERC-721.

#### El constructor {#constructor}

```python
@external
def __init__():
```

En Vyper, como en Python, la función constructora se llama `__init__`.

```python
    """
    @dev Contract constructor.
    """
```

En Python, y en Vyper, también puedes crear un comentario especificando una cadena multilínea (que comienza y termina en `"""`), y no usarla de ninguna manera. Estos comentarios también pueden incluir [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Para acceder a variables de estado se usa `self.<nombre de variable>` (otra vez, igual que en Python).

#### Funciones View {#views}

Estas son funciones que no modifican el estado de la cadena de bloques y que, por lo tanto, pueden ejecutarse libremente si se invocan externamente. Si las funciones de vista (View) se invocan mediante un contrato y todavía tienen que ejecutarse en cada nodo y por lo tanto cuestan gas.

```python
@view
@external
```

Estas palabras clave antes de una definición de función que empiezan con un signo en la pantalla (`@`) se llaman _decoraciones_. Y especifican las circunstancias en las que se puede activar una función.

- `@view` especifica que esta función es una vista.
- `@external` especifica que esta función en concreto puede activarse por transacciones y por otros contratos.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

A diferencia de Python, Vyper es un [lenguaje tipeado estático](https://wikipedia.org/wiki/Type_system#Static_type_checking). No se puede declarar una variable o un parámetro de función sin identificar el [tipo de datos](https://vyper.readthedocs.io/en/latest/types.html). En este caso, el parámetro de entrada es `bytes32`, un valor de 256 bits (que es el tamaño de la palabra nativa de la [máquina virtual de Ethereum](/developers/docs/evm/)). La salida es un valor booleano. Por costumbre, los nombres de los parámetros de función comienzan por un guión bajo (`_`).

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Devuelve el valor del HashMap `self.supportedInterfaces`, que se establece en el constructor (`__init__`).

```python
### VIEW FUNCTIONS ###
```

Estas son las funciones de vista que hacen que la información sobre los tókenes esté disponible para los usuarios y otros contratos.

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

Esta línea [verifica](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` no es cero. Si lo es, hay un error y el funcionamiento se revierte.

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

En la máquina virtual de Ethereum (EVM) cualquier almacenamiento que no tenga un valor almacenado en ella es cero. Si no hay ningún token en `_tokenId`, entonces el valor de `self.idToOwner[_tokenId]` es cero. En ese caso la función se revierte.

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

Tenga en cuenta que `getApproved` _puede_ dar cero como valor. Si el token es válido, aparece `self.idToApprovals[_tokenId]`. Si no hay aprobador, ese valor es cero.

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

Esta función verifica si `_operator` tiene permitido administrar todos los tókenes de `_owner` de este contrato. Debido a que puede haber múltiples operadores, se trata de un HashMap de dos niveles.

#### Funciones auxiliares de transferencia {#transfer-helpers}

Estas funciones implementan operaciones que son parte de la transferencia o la gestión de tókenes.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Esta decoración `@internal` significa que solo se puede accedeer a la función desde otras funciones dentro del mismo contrato. Por costumbre, los nombres de los parámetros de función comienzan por un guión bajo (`_`).

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

Hay tres formas en las que se puede permitir que una dirección transfiera un token:

1. La dirección es el dueño del token.
2. La dirección está aprobada para gastar ese token.
3. La dirección es un operador para el propietario del token.

La función anterior puede ser una vista, porque no cambia el estado. Para reducir los costos operativos, cualquier función que _pueda_ ser una vista _debería_ ser una vista.

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

Cuando hay un problema con una transferencia se revierte la activación.

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

Cambie el valor solo si es necesario. Las variables de estado viven en el storage. Escribir al almacenamiento es una de las operaciones más caras que hace la EVM (máquina virtual de Ethereum) (en términos de [gas](/developers/docs/gas/)). Por lo tanto, es una buena idea minimizarlo, incluso si escribir el valor existente tiene un alto coste.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Execute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

Tenemos esta función interna, porque hay dos maneras de transferir tókenes (regulares y seguros), pero solo queremos una única ubicación en el código donde lo hacemos para simplificar la auditoría.

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

Para emitir un evento en Vyper, utiliza una instrucción de registro `log` ([ver aquí para más detalles](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funciones de transferencia {#transfer-funs}

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

Esta función le permite transferir a una dirección arbitraria. A menos que la dirección sea un usuario, o un contrato que sepa cómo transferir tókenes, cualquier token que usted transfiera se quedará atascado en esa dirección e inutilizable.

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

Es mejor hacer la transferencia primero, porque si hay un problema lo revertiremos de todos modos, para que todas las operaciones de la activación se cancelen.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

Primero compruebe si la dirección es un contrato (si tiene código). De lo contrario, asuma que es una dirección de usuario y que el usuario podrá usar el token o transferirlo. No obstante, no se confíe con una falsa sensación de seguridad. Puede perder tókenes, incluso con `safeTransferFrom`, si los transfiere a una dirección cuya clave privada nadie conozca.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Invoque al contrato de destino para ver si puede recibir tókenes ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Si el destino es un contrato, pero no acepta tókenes ERC-721 (o que decidió no aceptar esta transferencia en particular), reviertalo.

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

Por lo general, si usted no quiere un aprobador, nombre la dirección cero, no a usted mismo.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Para establecer una aprobación usted puede ser el propietario, o un operador autorizado por el propietario.

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

#### Acuñar nuevos tokens y destruir las existentes {#mint-burn}

La cuenta que creó el contrato es el `minter`, el súper usuario autorizado a acuñar nuevos NFT. Sin embargo, ni siquiera se le permite quemar los tókenes existentes. Solo el propietario, o una entidad autorizada por el propietario, puede hacerlo.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Esta función siempre muestra `True`, porque si la operación falla se revierte.

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

Sólo el minter (la cuenta que creó el contrato ERC-721) puede acuñar nuevos tókenes. Esto puede ser un problema en el futuro si queremos cambiar la identidad del minter. En un contrato de producción, es deseable una función que permita al minter transferir privilegios de minter a otra persona.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Por lo general, el acuñar nuevos tókenes cuenta como una transferencia desde la dirección cero.

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

Cualquiera a quien se le permita transferir un token puede quemarlo. Mientras que una quema parece equivalente a transferira la dirección cero, la dirección cero no recibe el token. Esto nos permite liberar todo el almacenamiento que se utilizó para el token, lo que puede reducir el coste del gas de la transacción.

# Utilizar este contrato {#using-contract}

En contraste con Solidity, Vyper no tiene herencia. Esta es una elección de diseño deliberada para hacer el código más claro y por lo tanto más fácil de asegurar. Así que para crear su propio contrato Vyper ERC-721, utilice [este contrato](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) y modifíquelo para implementar la lógica de negocio que desee.

# Conclusión {#conclusion}

A modo de recapitulación, he resumido algunas de las ideas más importantes de este contrato:

- Para recibir tokens ERC-721 con una transferencia segura, los contratos tienen que implementar la interfaz `ERC721Receiver`.
- Incluso si utiliza una transferencia segura, los tókenes todavía pueden atascarse si los envía a una dirección cuya clave privada no se conozca.
- Cuando hay un problema con una operación, es una buena idea usar `revert` en la activación, en lugar de que solo aparezca un valor de fallo.
- Las tókenes ERC-721 existen cuando tienen un propietario.
- Existen tres maneras de ser autorizados para transferir un NFT. Puede ser el propietario, ser aprobado para un token específico, o ser un operador para todos los tókenes del propietario.
- Los eventos pasados solo son visibles fuera de la cadena de bloques. El código ejecutándose dentro de la cadena de bloques no puede verlos.

Ahora vaya a implementar contratos seguros de Vyper.
