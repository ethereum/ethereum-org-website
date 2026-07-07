---
title: "Guía paso a paso del contrato ERC-721 en Vyper"
description: "El contrato ERC-721 de Ryuya Nakamura y cómo funciona"
author: Ori Pomerantz
lang: es
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "ERC-721 en Vyper"
published: 2021-04-01
---

## Introducción {#introduction}

El estándar [ERC-721](/developers/docs/standards/tokens/erc-721/) se utiliza para mantener la propiedad de los tokens no fungibles (NFT).
Los tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportan como una materia prima, ya que no hay diferencia entre los tokens individuales.
Por el contrario, los tokens ERC-721 están diseñados para activos que son similares pero no idénticos, como diferentes [dibujos de gatos](https://www.cryptokitties.co/)
o títulos de diferentes bienes raíces.

En este artículo analizaremos [el contrato ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Este contrato está escrito en [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un lenguaje de contratos similar a Python diseñado para que sea más difícil escribir código inseguro de lo que es en Solidity.

## El contrato {#contract}

```python
# @dev Implementación del estándar de token no fungible ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modificado de: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Los comentarios en Vyper, al igual que en Python, comienzan con un hash (`#`) y continúan hasta el final de la línea. Los comentarios que incluyen
`@<keyword>` son utilizados por [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) para producir documentación legible por humanos.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

La interfaz ERC-721 está integrada en el lenguaje Vyper.
[Puede ver la definición del código aquí](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
La definición de la interfaz está escrita en Python, en lugar de Vyper, porque las interfaces se utilizan no solo dentro de la
cadena de bloques, sino también al enviar a la cadena de bloques una transacción desde un cliente externo, que puede estar escrito en
Python.

La primera línea importa la interfaz y la segunda especifica que la estamos implementando aquí.

### La interfaz ERC721Receiver {#receiver-interface}

```python
# Interfaz para el contrato llamado por safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 admite dos tipos de transferencia:

- `transferFrom`, que permite al remitente especificar cualquier dirección de destino y pone la responsabilidad
  de la transferencia en el remitente. Esto significa que puede transferir a una dirección no válida, en cuyo caso
  el NFT se pierde para siempre.
- `safeTransferFrom`, que comprueba si la dirección de destino es un contrato. Si es así, el contrato ERC-721
  pregunta al contrato receptor si desea recibir el NFT.

Para responder a las solicitudes de `safeTransferFrom`, un contrato receptor tiene que implementar `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

La dirección `_from` es el propietario actual del token. La dirección `_operator` es la que
solicitó la transferencia (esas dos pueden no ser la misma, debido a las asignaciones).

```python
            _tokenId: uint256,
```

Los ID de los tokens ERC-721 son de 256 bits. Por lo general, se crean aplicando hashing a una descripción de lo que sea que
represente el token.

```python
            _data: Bytes[1024]
```

La solicitud puede tener hasta 1024 bytes de datos de usuario.

```python
        ) -> bytes32: view
```

Para evitar casos en los que un contrato acepte accidentalmente una transferencia, el valor de retorno no es un booleano,
sino 256 bits con un valor específico.

Esta función es un `view`, lo que significa que puede leer el estado de la cadena de bloques, pero no modificarlo.

### Eventos {#events}

Los [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs)
se emiten para informar a los usuarios y servidores fuera de la cadena de bloques sobre los eventos. Tenga en cuenta que el contenido de los eventos
no está disponible para los contratos en la cadena de bloques.

```python
# @dev Se emite cuando la propiedad de cualquier NFT cambia por cualquier mecanismo. Este evento se emite cuando los NFTs son
#      creados (`from` == 0) y destruidos (`to` == 0). Excepción: durante la creación del contrato, cualquier
#      cantidad de NFTs puede ser creada y asignada sin emitir Transfer. En el momento de cualquier
#      transferencia, la dirección aprobada para ese NFT (si la hay) se restablece a ninguna.
# @param _from Remitente del NFT (si la dirección es la dirección cero, indica la creación del token).
# @param _to Receptor del NFT (si la dirección es la dirección cero, indica la destrucción del token).
# @param _tokenId El NFT que fue transferido.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Esto es similar al evento Transfer de ERC-20, excepto que reportamos un `tokenId` en lugar de una cantidad.
Nadie es dueño de la dirección cero, por lo que por convención la usamos para reportar la creación y destrucción de tokens.

```python
# @dev Esto se emite cuando la dirección aprobada para un NFT se cambia o reafirma. La dirección cero
#      indica que no hay dirección aprobada. Cuando se emite un evento Transfer, esto también
#      indica que la dirección aprobada para ese NFT (si la hay) se restablece a ninguna.
# @param _owner Propietario del NFT.
# @param _approved Dirección que estamos aprobando.
# @param _tokenId NFT que estamos aprobando.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Una aprobación ERC-721 es similar a una asignación ERC-20. A una dirección específica se le permite transferir un token
específico. Esto proporciona un mecanismo para que los contratos respondan cuando aceptan un token. Los contratos no pueden
escuchar eventos, por lo que si simplemente les transfiere el token, no lo "saben". De esta manera, el
propietario primero envía una aprobación y luego envía una solicitud al contrato: "Aprobé que transfieras el token
X, por favor hazlo...".

Esta es una elección de diseño para hacer que el estándar ERC-721 sea similar al estándar ERC-20. Debido a que
los tokens ERC-721 no son fungibles, un contrato también puede identificar que obtuvo un token específico al
observar la propiedad del token.

```python
# @dev Esto se emite cuando un operador es habilitado o deshabilitado para un propietario. El operador puede gestionar
#      todos los NFTs del propietario.
# @param _owner Propietario del NFT.
# @param _operator Dirección a la que estamos estableciendo derechos de operador.
# @param _approved Estado de los derechos de operador (verdadero si se otorgan derechos de operador y falso si
# se revocan).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

A veces es útil tener un _operador_ que pueda administrar todos los tokens de una cuenta de un tipo específico (aquellos que son administrados por
un contrato específico), similar a un poder notarial. Por ejemplo, podría querer otorgar tal poder a un contrato que verifique si
no lo he contactado durante seis meses, y si es así, distribuya mis activos a mis herederos (si uno de ellos lo solicita, los contratos
no pueden hacer nada sin ser llamados por una transacción). En ERC-20 simplemente podemos dar una alta asignación a un contrato de herencia,
pero eso no funciona para ERC-721 porque los tokens no son fungibles. Este es el equivalente.

El valor `approved` nos dice si el evento es para una aprobación o el retiro de una aprobación.

### Variables de estado {#state-vars}

Estas variables contienen el estado actual de los tokens: cuáles están disponibles y quién es su dueño. La mayoría de estos
son objetos `HashMap`, [mapeos unidireccionales que existen entre dos tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapeo del ID del NFT a la dirección que lo posee.
idToOwner: HashMap[uint256, address]

# @dev Mapeo del ID del NFT a la dirección aprobada.
idToApprovals: HashMap[uint256, address]
```

Las identidades de usuarios y contratos en Ethereum están representadas por direcciones de 160 bits. Estas dos variables mapean
desde los ID de los tokens a sus propietarios y a aquellos aprobados para transferirlos (con un máximo de uno para cada uno). En Ethereum,
los datos no inicializados siempre son cero, por lo que si no hay un propietario o un transferidor aprobado, el valor para ese token
es cero.

```python
# @dev Mapeo de la dirección del propietario al recuento de sus tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variable mantiene el recuento de tokens para cada propietario. No hay un mapeo de propietarios a tokens, por lo que
la única forma de identificar los tokens que posee un propietario específico es mirar hacia atrás en el historial de eventos de la cadena de bloques
y ver los eventos `Transfer` apropiados. Podemos usar esta variable para saber cuándo tenemos todos los NFT y no
necesitamos buscar aún más atrás en el tiempo.

Tenga en cuenta que este algoritmo solo funciona para interfaces de usuario y servidores externos. El código que se ejecuta en la propia cadena de bloques
no puede leer eventos pasados.

```python
# @dev Mapeo de la dirección del propietario al mapeo de direcciones de operadores.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Una cuenta puede tener más de un solo operador. Un simple `HashMap` es insuficiente para
realizar un seguimiento de ellos, porque cada clave conduce a un solo valor. En su lugar, puede usar
`HashMap[address, bool]` como valor. Por defecto, el valor para cada dirección es `False`, lo que significa que no
es un operador. Puede establecer valores en `True` según sea necesario.

```python
# @dev Dirección del acuñador, quien puede acuñar un token
minter: address
```

Los nuevos tokens tienen que crearse de alguna manera. En este contrato hay una sola entidad a la que se le permite hacerlo, el
`minter`. Es probable que esto sea suficiente para un juego, por ejemplo. Para otros propósitos, podría ser necesario
crear una lógica de negocio más complicada.

```python
# @dev Mapeo del id de la interfaz a booleano sobre si es compatible o no
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID de interfaz ERC-165 de ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID de interfaz ERC-165 de ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica un mecanismo para que un contrato revele cómo las aplicaciones
pueden comunicarse con él, a qué ERC se ajusta. En este caso, el contrato se ajusta a ERC-165 y ERC-721.

### Funciones {#functions}

Estas son las funciones que realmente implementan ERC-721.

#### Constructor {#constructor}

```python
@external
def __init__():
```

En Vyper, al igual que en Python, la función del constructor se llama `__init__`.

```python
    """
    @dev Constructor del contrato.
    """
```

En Python, y en Vyper, también puede crear un comentario especificando una cadena de varias líneas (que comienza y termina
con `"""`), y no usarla de ninguna manera. Estos comentarios también pueden incluir
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Para acceder a las variables de estado se utiliza `self.<variable name>` (de nuevo, igual que en Python).

#### Funciones de vista {#views}

Estas son funciones que no modifican el estado de la cadena de bloques y, por lo tanto, se pueden ejecutar de forma
gratuita si se llaman externamente. Si las funciones de vista son llamadas por un contrato, aún tienen que ejecutarse en
cada nodo y, por lo tanto, cuestan gas.

```python
@view
@external
```

Estas palabras clave previas a la definición de una función que comienzan con un signo de arroba (`@`) se denominan _decoraciones_.
Especifican las circunstancias en las que se puede llamar a una función.

- `@view` especifica que esta función es una vista.
- `@external` especifica que esta función en particular puede ser llamada por transacciones y por otros contratos.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

A diferencia de Python, Vyper es un [lenguaje de tipado estático](https://wikipedia.org/wiki/Type_system#Static_type_checking).
No se puede declarar una variable, o un parámetro de función, sin identificar el [tipo de datos](https://vyper.readthedocs.io/en/latest/types.html). En este caso, el parámetro de entrada es `bytes32`, un valor de 256 bits
(256 bits es el tamaño de palabra nativo de la [Máquina Virtual de Ethereum](/developers/docs/evm/)). La salida es un valor booleano.
Por convención, los nombres de los parámetros de función comienzan con un guion bajo (`_`).

```python
    """
    @dev La identificación de la interfaz se especifica en ERC-165.
    @param _interfaceID Id de la interfaz
    """
    return self.supportedInterfaces[_interfaceID]
```

Devuelve el valor del HashMap `self.supportedInterfaces`, que se establece en el constructor (`__init__`).

```python
### FUNCIONES DE VISTA ###
```

Estas son las funciones de vista que ponen la información sobre los tokens a disposición de los usuarios y otros contratos.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Devuelve el número de NFTs propiedad de `_owner`.
         Revierte si `_owner` es la dirección cero. Los NFTs asignados a la dirección cero se consideran inválidos.
    @param _owner Dirección para la cual consultar el saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Esta línea [afirma](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` no es
cero. Si lo es, hay un error y la operación se revierte.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Devuelve la dirección del propietario del NFT.
         Revierte si `_tokenId` no es un NFT válido.
    @param _tokenId El identificador de un NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Revierte si `_tokenId` no es un NFT válido
    assert owner != ZERO_ADDRESS
    return owner
```

En la Máquina Virtual de Ethereum (EVM), cualquier almacenamiento que no tenga un valor almacenado en él es cero.
Si no hay ningún token en `_tokenId`, entonces el valor de `self.idToOwner[_tokenId]` es cero. En ese
caso, la función se revierte.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Obtiene la dirección aprobada para un solo NFT.
         Revierte si `_tokenId` no es un NFT válido.
    @param _tokenId ID del NFT para consultar la aprobación.
    """
    # Revierte si `_tokenId` no es un NFT válido
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Tenga en cuenta que `getApproved` _puede_ devolver cero. Si el token es válido, devuelve `self.idToApprovals[_tokenId]`.
Si no hay un aprobador, ese valor es cero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Comprueba si `_operator` es un operador aprobado para `_owner`.
    @param _owner La dirección que posee los NFTs.
    @param _operator La dirección que actúa en nombre del propietario.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Esta función comprueba si a `_operator` se le permite administrar todos los tokens de `_owner` en este contrato.
Debido a que puede haber múltiples operadores, este es un HashMap de dos niveles.

#### Funciones auxiliares de transferencia {#transfer-helpers}

Estas funciones implementan operaciones que forman parte de la transferencia o administración de tokens.

```python

### AYUDANTES DE FUNCIÓN DE TRANSFERENCIA ###

@view
@internal
```

Esta decoración, `@internal`, significa que la función solo es accesible desde otras funciones dentro del
mismo contrato. Por convención, los nombres de estas funciones también comienzan con un guion bajo (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Devuelve si el gastador dado puede transferir un ID de token dado
    @param spender dirección del gastador a consultar
    @param tokenId uint256 ID del token a ser transferido
    @return bool si el msg.sender está aprobado para el ID de token dado,
        es un operador del propietario, o es el propietario del token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Hay tres formas en las que se puede permitir a una dirección transferir un token:

1. La dirección es el propietario del token
2. La dirección está aprobada para gastar ese token
3. La dirección es un operador para el propietario del token

La función anterior puede ser una vista porque no cambia el estado. Para reducir los costos operativos, cualquier
función que _pueda_ ser una vista _debería_ ser una vista.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Añade un NFT a una dirección dada
         Revierte si `_tokenId` es propiedad de alguien.
    """
    # Revierte si `_tokenId` es propiedad de alguien
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Cambia el propietario
    self.idToOwner[_tokenId] = _to
    # Cambia el seguimiento del recuento
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Elimina un NFT de una dirección dada
         Revierte si `_from` no es el propietario actual.
    """
    # Revierte si `_from` no es el propietario actual
    assert self.idToOwner[_tokenId] == _from
    # Cambia el propietario
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Cambia el seguimiento del recuento
    self.ownerToNFTokenCount[_from] -= 1
```

Cuando hay un problema con una transferencia, revertimos la llamada.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Borra una aprobación de una dirección dada
         Revierte si `_owner` no es el propietario actual.
    """
    # Revierte si `_owner` no es el propietario actual
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Restablece las aprobaciones
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Solo cambie el valor si es necesario. Las variables de estado viven en el almacenamiento. Escribir en el almacenamiento es
una de las operaciones más costosas que realiza la EVM (Máquina Virtual de Ethereum) (en términos de
[gas](/developers/docs/gas/)). Por lo tanto, es una buena idea minimizarlo, incluso escribir el
valor existente tiene un alto costo.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Ejecuta la transferencia de un NFT.
         Revierte a menos que `msg.sender` sea el propietario actual, un operador autorizado, o la dirección
         aprobada para este NFT. (NOTA: `msg.sender` no está permitido en una función privada, así que pase `_sender`.)
         Revierte si `_to` es la dirección cero.
         Revierte si `_from` no es el propietario actual.
         Revierte si `_tokenId` no es un NFT válido.
    """
```

Tenemos esta función interna porque hay dos formas de transferir tokens (regular y segura), pero
queremos solo una única ubicación en el código donde lo hagamos para facilitar la auditoría.

```python
    # Comprueba los requisitos
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Revierte si `_to` es la dirección cero
    assert _to != ZERO_ADDRESS
    # Borra la aprobación. Revierte si `_from` no es el propietario actual
    self._clearApproval(_from, _tokenId)
    # Elimina el NFT. Revierte si `_tokenId` no es un NFT válido
    self._removeTokenFrom(_from, _tokenId)
    # Añade el NFT
    self._addTokenTo(_to, _tokenId)
    # Registra la transferencia
    log Transfer(_from, _to, _tokenId)
```

Para emitir un evento en Vyper se utiliza una declaración `log` ([consulte aquí para obtener más detalles](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funciones de transferencia {#transfer-funs}

```python

### FUNCIONES DE TRANSFERENCIA ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Revierte a menos que `msg.sender` sea el propietario actual, un operador autorizado, o la dirección
         aprobada para este NFT.
         Revierte si `_from` no es el propietario actual.
         Revierte si `_to` es la dirección cero.
         Revierte si `_tokenId` no es un NFT válido.
    @notice El llamador es responsable de confirmar que `_to` es capaz de recibir NFTs o de lo contrario
            podrían perderse permanentemente.
    @param _from El propietario actual del NFT.
    @param _to El nuevo propietario.
    @param _tokenId El NFT a transferir.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Esta función le permite transferir a una dirección arbitraria. A menos que la dirección sea un usuario, o un contrato que
sepa cómo transferir tokens, cualquier token que transfiera quedará atascado en esa dirección y será inútil.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfiere la propiedad de un NFT de una dirección a otra dirección.
         Revierte a menos que `msg.sender` sea el propietario actual, un operador autorizado, o la
         dirección aprobada para este NFT.
         Revierte si `_from` no es el propietario actual.
         Revierte si `_to` es la dirección cero.
         Revierte si `_tokenId` no es un NFT válido.
         Si `_to` es un contrato inteligente, llama a `onERC721Received` en `_to` y revierte si
         el valor de retorno no es `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTA: bytes4 se representa mediante bytes32 con relleno
    @param _from El propietario actual del NFT.
    @param _to El nuevo propietario.
    @param _tokenId El NFT a transferir.
    @param _data Datos adicionales sin formato especificado, enviados en la llamada a `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Está bien hacer la transferencia primero porque si hay un problema vamos a revertir de todos modos,
por lo que todo lo hecho en la llamada será cancelado.

```python
    if _to.is_contract: # comprueba si `_to` es una dirección de contrato
```

Primero compruebe si la dirección es un contrato (si tiene código). Si no es así, asuma que es una dirección de usuario
y el usuario podrá usar el token o transferirlo. Pero no deje que esto le dé una falsa sensación de seguridad. Puede perder tokens, incluso con `safeTransferFrom`, si los transfiere
a una dirección para la cual nadie conoce la clave privada.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Llame al contrato de destino para ver si puede recibir tokens ERC-721.

```python
        # Revierte si el destino de la transferencia es un contrato que no implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Si el destino es un contrato, pero uno que no acepta tokens ERC-721 (o que decidió no aceptar esta
transferencia en particular), revierta.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Establece o reafirma la dirección aprobada para un NFT. La dirección cero indica que no hay dirección aprobada.
         Revierte a menos que `msg.sender` sea el propietario actual del NFT, o un operador autorizado del propietario actual.
         Revierte si `_tokenId` no es un NFT válido. (NOTA: Esto no está escrito en el EIP)
         Revierte si `_approved` es el propietario actual. (NOTA: Esto no está escrito en el EIP)
    @param _approved Dirección a ser aprobada para el ID de NFT dado.
    @param _tokenId ID del token a ser aprobado.
    """
    owner: address = self.idToOwner[_tokenId]
    # Revierte si `_tokenId` no es un NFT válido
    assert owner != ZERO_ADDRESS
    # Revierte si `_approved` es el propietario actual
    assert _approved != owner
```

Por convención, si desea no tener un aprobador, designa la dirección cero, no a usted mismo.

```python
    # Comprueba los requisitos
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Para establecer una aprobación, puede ser el propietario o un operador autorizado por el propietario.

```python
    # Establece la aprobación
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Habilita o deshabilita la aprobación para que un tercero ("operador") gestione todos los
         activos de `msg.sender`. También emite el evento ApprovalForAll.
         Revierte si `_operator` es el `msg.sender`. (NOTA: Esto no está escrito en el EIP)
    @notice Esto funciona incluso si el remitente no posee ningún token en ese momento.
    @param _operator Dirección a añadir al conjunto de operadores autorizados.
    @param _approved Verdadero si el operador está aprobado, falso para revocar la aprobación.
    """
    # Revierte si `_operator` es el `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Acuñar nuevos tokens y destruir los existentes {#mint-burn}

La cuenta que creó el contrato es el `minter`, el superusuario que está autorizado a acuñar
nuevos NFT. Sin embargo, ni siquiera a él se le permite quemar tokens existentes. Solo el propietario, o una entidad
autorizada por el propietario, puede hacerlo.

```python
### FUNCIONES DE ACUÑAR Y QUEMAR ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Esta función siempre devuelve `True`, porque si la operación falla, se revierte.

```python
    """
    @dev Función para acuñar tokens
         Revierte si `msg.sender` no es el acuñador.
         Revierte si `_to` es la dirección cero.
         Revierte si `_tokenId` es propiedad de alguien.
    @param _to La dirección que recibirá los tokens acuñados.
    @param _tokenId El id del token a acuñar.
    @return Un booleano que indica si la operación fue exitosa.
    """
    # Revierte si `msg.sender` no es el acuñador
    assert msg.sender == self.minter
```

Solo el acuñador (la cuenta que creó el contrato ERC-721) puede acuñar nuevos tokens. Esto puede ser un
problema en el futuro si queremos cambiar la identidad del acuñador. En
un contrato de producción, probablemente querría una función que permita al acuñador transferir
los privilegios de acuñador a otra persona.

```python
    # Revierte si `_to` es la dirección cero
    assert _to != ZERO_ADDRESS
    # Añade el NFT. Revierte si `_tokenId` es propiedad de alguien
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Por convención, la acuñación de nuevos tokens cuenta como una transferencia desde la dirección cero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Quema un token ERC-721 específico.
         Revierte a menos que `msg.sender` sea el propietario actual, un operador autorizado, o la dirección
         aprobada para este NFT.
         Revierte si `_tokenId` no es un NFT válido.
    @param _tokenId uint256 id del token ERC-721 a ser quemado.
    """
    # Comprueba los requisitos
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Revierte si `_tokenId` no es un NFT válido
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Cualquiera a quien se le permita transferir un token se le permite quemarlo. Si bien una quema parece equivalente a
una transferencia a la dirección cero, la dirección cero en realidad no recibe el token. Esto nos permite
liberar todo el almacenamiento que se utilizó para el token, lo que puede reducir el costo de gas de la transacción.

## Uso de este contrato {#using-contract}

A diferencia de Solidity, Vyper no tiene herencia. Esta es una elección de diseño deliberada para hacer que el
código sea más claro y, por lo tanto, más fácil de asegurar. Así que para crear su propio contrato ERC-721 en Vyper, toma [este
contrato](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) y lo modifica
para implementar la lógica de negocio que desee.

## Conclusión {#conclusion}

A modo de repaso, aquí están algunas de las ideas más importantes en este contrato:

- Para recibir tokens ERC-721 con una transferencia segura, los contratos tienen que implementar la interfaz `ERC721Receiver`.
- Incluso si utiliza una transferencia segura, los tokens aún pueden quedar atascados si los envía a una dirección cuya clave privada
  es desconocida.
- Cuando hay un problema con una operación, es una buena idea revertir la llamada con `revert`, en lugar de simplemente devolver
  un valor de falla.
- Los tokens ERC-721 existen cuando tienen un propietario.
- Hay tres formas de estar autorizado para transferir un NFT. Puede ser el propietario, estar aprobado para un token específico,
  o ser un operador para todos los tokens del propietario.
- Los eventos pasados son visibles solo fuera de la cadena de bloques. El código que se ejecuta dentro de la cadena de bloques no puede verlos.

Ahora vaya e implemente contratos seguros en Vyper.

[Consulte aquí para ver más de mi trabajo](https://cryptodocguy.pro/).