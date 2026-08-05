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

Los comentarios en Vyper, al igual que en Python, comienzan con un hash (`ethereum.ercs`) y continúan hasta el final de la línea. Los comentarios que incluyen
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

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### La interfaz ERC721Receiver

```python
# Interfaz para el contrato llamado por safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 admite dos tipos de transferencia:

- `transferFrom`, que permite al remitente especificar cualquier dirección de destino y pone la responsabilidad de la transferencia en el remitente. Esto significa que puede transferir a una dirección no válida, en cuyo caso el NFT se pierde para siempre.
- `safeTransferFrom`, que comprueba si la dirección de destino es un contrato. Si es así, el contrato ERC-721 pregunta al contrato receptor si desea recibir el NFT.

Para responder a las solicitudes de `safeTransferFrom`, un contrato receptor tiene que implementar `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

La dirección `_from` es el propietario actual del token. La dirección `_operator` es la que solicitó la transferencia (es posible que estas dos no sean la misma, debido a las asignaciones). Por convención, la mayoría de los parámetros de función en este contrato comienzan con un guion bajo (`_`).

```python
            _tokenId: uint256,
```

Los ID de los tokens ERC-721 son de 256 bits. Por lo general, se crean aplicando hashing a una descripción de lo que sea que represente el token.

```python
            _data: Bytes[1024]
```

La solicitud puede tener hasta 1024 bytes de datos de usuario.

```python
        ) -> bytes4: nonpayable
```

Para evitar casos en los que un contrato acepte accidentalmente una transferencia, el valor de retorno no es un booleano, sino un valor específico de cuatro bytes, el selector de función de `onERC721Received`. La función es `nonpayable` porque un contrato receptor puede cambiar su propio estado cuando acepta un token.
### Eventos

Los [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) se emiten para informar a los usuarios y servidores fuera de la cadena de bloques sobre los eventos. Tenga en cuenta que el contenido de los eventos no está disponible para los contratos en la cadena de bloques. Los tres eventos ERC-721 están definidos por la interfaz `IERC721` que importamos, por lo que este contrato no los declara por sí mismo; los emite con `log IERC721.<Event>(...)`, como veremos en las funciones de transferencia a continuación.

`Transfer` (`sender`, `receiver`, `token_id`) informa de un cambio en la propiedad de un NFT. Esto es similar al evento Transfer de ERC-20, excepto que informamos de un `token_id` en lugar de una cantidad. Nadie es dueño de la dirección cero, por lo que, por convención, la usamos para informar de la creación y destrucción de tokens. La única excepción es la creación de contratos, durante la cual se puede crear y asignar cualquier número de NFT sin emitir `Transfer`.

Una aprobación ERC-721 es similar a una asignación ERC-20: se permite a una dirección específica transferir un token específico, y se emite `Approval` (`owner`, `approved`, `token_id`) cada vez que se establece o reafirma esa dirección aprobada. Esto proporciona un mecanismo para que los contratos respondan cuando aceptan un token. Los contratos no pueden escuchar eventos, por lo que si simplemente les transfiere el token, no lo "saben". De esta manera, el propietario primero envía una aprobación y luego envía una solicitud al contrato: "Aprobé que transfieras el token X, por favor haz...". Esta es una elección de diseño para hacer que el estándar ERC-721 sea similar al estándar ERC-20. Debido a que los tokens ERC-721 no son fungibles, un contrato también puede identificar que obtuvo un token específico al observar la propiedad del token.

Finalmente, `ApprovalForAll` (`owner`, `operator`, `approved`) se emite cuando se habilita o deshabilita un _operador_ para un propietario. A veces es útil tener un operador que pueda administrar todos los tokens de un tipo específico de una cuenta (aquellos que son administrados por un contrato específico), similar a un poder notarial. Por ejemplo, podría querer otorgar tal poder a un contrato que verifique si no me he comunicado con él durante seis meses y, de ser así, distribuya mis activos a mis herederos (si uno de ellos lo solicita, los contratos no pueden hacer nada sin ser llamados por una transacción). En ERC-20 podemos simplemente dar una asignación alta a un contrato de herencia, pero eso no funciona para ERC-721 porque los tokens no son fungibles. Este es el equivalente. El valor `approved` nos dice si el evento es para una aprobación o para el retiro de una aprobación.
### Variables de estado

Estas variables contienen el estado actual de los tokens: cuáles están disponibles y quién es su propietario. La mayoría de estos son objetos `HashMap`, [mapeos unidireccionales que existen entre dos tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapeo del ID del NFT a la dirección que lo posee.
idToOwner: HashMap[uint256, address]

# @dev Mapeo del ID del NFT a la dirección aprobada.
idToApprovals: HashMap[uint256, address]
```

Las identidades de usuarios y contratos en Ethereum están representadas por direcciones de 160 bits. Estas dos variables mapean desde los ID de los tokens a sus propietarios y a aquellos aprobados para transferirlos (con un máximo de uno para cada uno). En Ethereum, los datos no inicializados siempre son cero, por lo que si no hay un propietario o un transferidor aprobado, el valor para ese token es cero.

```python
# @dev Mapeo de la dirección del propietario al recuento de sus tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variable contiene el recuento de tokens para cada propietario. No hay un mapeo de propietarios a tokens, por lo que la única forma de identificar los tokens que posee un propietario específico es mirar hacia atrás en el historial de eventos de la cadena de bloques y ver los eventos `Transfer` apropiados. Podemos usar esta variable para saber cuándo tenemos todos los NFT y no necesitamos buscar aún más atrás en el tiempo.

Tenga en cuenta que este algoritmo solo funciona para interfaces de usuario y servidores externos. El código que se ejecuta en la propia cadena de bloques no puede leer eventos pasados.

```python
# @dev Mapeo de la dirección del propietario al mapeo de direcciones de operadores.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Una cuenta puede tener más de un solo operador. Un `HashMap` simple es insuficiente para realizar un seguimiento de ellos, porque cada clave conduce a un solo valor. En su lugar, puede usar `HashMap[address, bool]` como valor. Por defecto, el valor para cada dirección es `False`, lo que significa que no es un operador. Puede establecer los valores en `True` según sea necesario.

```python
# @dev Dirección del acuñador, que puede acuñar un token
minter: address
```

Los nuevos tokens tienen que crearse de alguna manera. En este contrato hay una sola entidad a la que se le permite hacerlo, el `minter` (acuñador). Es probable que esto sea suficiente para un juego, por ejemplo. Para otros propósitos, podría ser necesario crear una lógica de negocio más complicada.

```python
# @dev Lista estática de ID de interfaces ERC165 compatibles
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ID de interfaz ERC165 de ERC165
    0x01ffc9a7,
    # ID de interfaz ERC165 de ERC721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica un mecanismo para que un contrato revele cómo las aplicaciones pueden comunicarse con él, a qué ERC se ajusta. `SUPPORTED_INTERFACES` es una lista constante de los dos ID de interfaz de cuatro bytes a los que se ajusta este contrato: el propio ERC-165 y ERC-721.
### Funciones {#functions}

Estas son las funciones que realmente implementan ERC-721.

#### Constructor

```python
@deploy
def __init__():
```

En Vyper, al igual que en Python, la función del constructor se llama `__init__`. Está marcada con la decoración `@deploy`, lo que significa que se ejecuta una vez, cuando se implementa el contrato.

```python
    """
    @dev Constructor del contrato.
    """
```

En Python, y en Vyper, también puede crear un comentario especificando una cadena de varias líneas (que comienza y termina con `"""`), y no usarla de ninguna manera. Estos comentarios también pueden incluir [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Para acceder a las variables de estado, se usa `self.<variable name>` (nuevamente, igual que en Python). El constructor registra la cuenta que implementó el contrato como el `minter` (acuñador).
#### Funciones de vista

Estas son funciones que no modifican el estado de la cadena de bloques y, por lo tanto, se pueden ejecutar de forma gratuita si se llaman externamente. Si las funciones de vista son llamadas por un contrato, aún tienen que ejecutarse en cada nodo y, por lo tanto, cuestan gas.

```python
@view
@external
```

Estas palabras clave antes de una definición de función que comienzan con un signo de arroba (`@`) se denominan _decoraciones_. Especifican las circunstancias en las que se puede llamar a una función.

- `@view` especifica que esta función es una vista.
- `@external` especifica que esta función en particular puede ser llamada por transacciones y por otros contratos.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

A diferencia de Python, Vyper es un [lenguaje de tipado estático](https://wikipedia.org/wiki/Type_system#Static_type_checking). No se puede declarar una variable, o un parámetro de función, sin identificar el [tipo de datos](https://vyper.readthedocs.io/en/latest/types.html). En este caso, el parámetro de entrada es `bytes4`, un valor de cuatro bytes, y la salida es un valor booleano.

```python
    """
    @dev La identificación de la interfaz se especifica en ERC-165.
    @param interface_id Id de la interfaz
    """
    return interface_id in SUPPORTED_INTERFACES
```

Devuelve `True` si `interface_id` es uno de los ID de interfaz en la lista `SUPPORTED_INTERFACES`.

```python
### FUNCIONES DE VISTA ###
```

Estas son las funciones de vista que ponen la información sobre los tokens a disposición de los usuarios y otros contratos.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Devuelve el número de NFT que posee `_owner`.
         Lanza un error si `_owner` es la dirección cero. Los NFT asignados a la dirección cero se consideran no válidos.
    @param _owner Dirección para la que se consultará el saldo.
    """
    assert _owner != empty(address)
```

Esta línea [afirma](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` no es la dirección cero, escrita como `empty(address)`. Si lo es, hay un error y la operación se revierte.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Devuelve la dirección del propietario del NFT.
         Lanza un error si `_tokenId` no es un NFT válido.
    @param _tokenId El identificador de un NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lanza un error si `_tokenId` no es un NFT válido
    assert owner != empty(address)
    return owner
```

En la Máquina Virtual de Ethereum (EVM), cualquier almacenamiento que no tenga un valor almacenado en él es cero. Si no hay ningún token en `_tokenId`, entonces el valor de `self.idToOwner[_tokenId]` es cero. En ese caso, la función se revierte.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Obtiene la dirección aprobada para un solo NFT.
         Lanza un error si `_tokenId` no es un NFT válido.
    @param _tokenId ID del NFT del que se consultará la aprobación.
    """
    # Lanza un error si `_tokenId` no es un NFT válido
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Tenga en cuenta que `getApproved` _puede_ devolver cero. Si el token es válido, devuelve `self.idToApprovals[_tokenId]`. Si no hay un aprobador, ese valor es cero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Comprueba si `_operator` es un operador aprobado para `_owner`.
    @param _owner La dirección que posee los NFT.
    @param _operator La dirección que actúa en nombre del propietario.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Esta función comprueba si a `_operator` se le permite administrar todos los tokens de `_owner` en este contrato. Debido a que puede haber múltiples operadores, este es un HashMap de dos niveles.
#### Funciones auxiliares de transferencia

Estas funciones implementan operaciones que forman parte de la transferencia o administración de tokens.

```python

### FUNCIONES AUXILIARES DE TRANSFERENCIA ###

@view
@internal
```

Esta decoración, `@internal`, significa que la función solo es accesible desde otras funciones dentro del mismo contrato. Por convención, los nombres de estas funciones también comienzan con un guion bajo (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Devuelve si el gastador dado puede transferir un ID de token dado
    @param spender dirección del gastador a consultar
    @param tokenId uint256 ID del token a transferir
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

La función anterior puede ser una vista porque no cambia el estado. Para reducir los costos operativos, cualquier función que _pueda_ ser una vista _debería_ ser una vista.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Añade un NFT a una dirección dada
         Lanza un error si `_tokenId` es propiedad de alguien.
    """
    # Lanza un error si `_tokenId` es propiedad de alguien
    assert self.idToOwner[_tokenId] == empty(address)
    # Cambia el propietario
    self.idToOwner[_tokenId] = _to
    # Cambia el seguimiento del recuento
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Elimina un NFT de una dirección dada
         Lanza un error si `_from` no es el propietario actual.
    """
    # Lanza un error si `_from` no es el propietario actual
    assert self.idToOwner[_tokenId] == _from
    # Cambia el propietario
    self.idToOwner[_tokenId] = empty(address)
    # Cambia el seguimiento del recuento
    self.ownerToNFTokenCount[_from] -= 1
```

Cuando hay un problema con una transferencia, revertimos la llamada.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Borra una aprobación de una dirección dada
         Lanza un error si `_owner` no es el propietario actual.
    """
    # Lanza un error si `_owner` no es el propietario actual
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Restablece las aprobaciones
        self.idToApprovals[_tokenId] = empty(address)
```

Solo cambie el valor si es necesario. Las variables de estado viven en el almacenamiento. Escribir en el almacenamiento es una de las operaciones más costosas que realiza la EVM (Máquina Virtual de Ethereum) (en términos de [gas](/developers/docs/gas/)). Por lo tanto, es una buena idea minimizarlo, incluso escribir el valor existente tiene un alto costo.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Ejecuta la transferencia de un NFT.
         Lanza un error a menos que `msg.sender` sea el propietario actual, un operador autorizado o la dirección
         aprobada para este NFT. (NOTA: `msg.sender` no está permitido en una función privada, así que pase `_sender`).
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_from` no es el propietario actual.
         Lanza un error si `_tokenId` no es un NFT válido.
    """
```

Tenemos esta función interna porque hay dos formas de transferir tokens (regular y segura), pero queremos solo una única ubicación en el código donde lo hagamos para facilitar la auditoría.

```python
    # Comprueba los requisitos
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Lanza un error si `_to` es la dirección cero
    assert _to != empty(address)
    # Borra la aprobación. Lanza un error si `_from` no es el propietario actual
    self._clearApproval(_from, _tokenId)
    # Elimina el NFT. Lanza un error si `_tokenId` no es un NFT válido
    self._removeTokenFrom(_from, _tokenId)
    # Añade el NFT
    self._addTokenTo(_to, _tokenId)
    # Registra la transferencia
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Para emitir un evento en Vyper, se usa una declaración `log` ([consulte aquí para obtener más detalles](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)). Debido a que los eventos pertenecen a la interfaz importada, nos referimos a ellos como `IERC721.Transfer` y pasamos sus campos por palabra clave.
#### Funciones de transferencia

```python

### FUNCIONES DE TRANSFERENCIA ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Lanza un error a menos que `msg.sender` sea el propietario actual, un operador autorizado o la dirección
         aprobada para este NFT.
         Lanza un error si `_from` no es el propietario actual.
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_tokenId` no es un NFT válido.
    @notice El llamador es responsable de confirmar que `_to` es capaz de recibir NFT o, de lo contrario,
            pueden perderse permanentemente.
    @param _from El propietario actual del NFT.
    @param _to El nuevo propietario.
    @param _tokenId El NFT a transferir.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Esta función le permite transferir a una dirección arbitraria. A menos que la dirección sea un usuario o un contrato que sepa cómo transferir tokens, cualquier token que transfiera quedará atascado en esa dirección y será inútil.

La decoración `@payable` está aquí porque la interfaz `IERC721` declara `transferFrom`, `safeTransferFrom` y `approve` como pagables, por lo que un contrato que implementa la interfaz tiene que coincidir con esas firmas.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfiere la propiedad de un NFT de una dirección a otra dirección.
         Lanza un error a menos que `msg.sender` sea el propietario actual, un operador autorizado o la
         dirección aprobada para este NFT.
         Lanza un error si `_from` no es el propietario actual.
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_tokenId` no es un NFT válido.
         Si `_to` es un contrato inteligente, llama a `onERC721Received` en `_to` y lanza un error si
         el valor de retorno no es `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from El propietario actual del NFT.
    @param _to El nuevo propietario.
    @param _tokenId El NFT a transferir.
    @param _data Datos adicionales sin formato especificado, enviados en la llamada a `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Está bien hacer la transferencia primero porque si hay un problema vamos a revertir de todos modos, por lo que todo lo hecho en la llamada será cancelado.

```python
    if _to.is_contract: # comprueba si `_to` es una dirección de contrato
```

Primero compruebe si la dirección es un contrato (si tiene código). Si no es así, asuma que es una dirección de usuario y que el usuario podrá usar el token o transferirlo. Pero no deje que esto le dé una falsa sensación de seguridad. Puede perder tokens, incluso con `safeTransferFrom`, si los transfiere a una dirección para la que nadie conoce la clave privada.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Llame al contrato de destino para ver si puede recibir tokens ERC-721. Vyper 0.4 requiere que las llamadas a otros contratos estén marcadas, por lo que la llamada tiene el prefijo `extcall`.

```python
        # Lanza un error si el destino de la transferencia es un contrato que no implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Si el destino es un contrato, pero uno que no acepta tokens ERC-721 (o que decidió no aceptar esta transferencia en particular), revierta.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Establece o reafirma la dirección aprobada para un NFT. La dirección cero indica que no hay una dirección aprobada.
         Lanza un error a menos que `msg.sender` sea el propietario actual del NFT o un operador autorizado del propietario actual.
         Lanza un error si `_tokenId` no es un NFT válido. (NOTA: Esto no está escrito en el EIP)
         Lanza un error si `_approved` es el propietario actual. (NOTA: Esto no está escrito en el EIP)
    @param _approved Dirección a ser aprobada para el ID de NFT dado.
    @param _tokenId ID del token a ser aprobado.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lanza un error si `_tokenId` no es un NFT válido
    assert owner != empty(address)
    # Lanza un error si `_approved` es el propietario actual
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
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Habilita o deshabilita la aprobación para que un tercero ("operador") administre todos los
         activos de `msg.sender`. También emite el evento ApprovalForAll.
         Lanza un error si `_operator` es el `msg.sender`. (NOTA: Esto no está escrito en el EIP)
    @notice Esto funciona incluso si el remitente no posee ningún token en ese momento.
    @param _operator Dirección a añadir al conjunto de operadores autorizados.
    @param _approved True si el operador está aprobado, false para revocar la aprobación.
    """
    # Lanza un error si `_operator` es el `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
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
