---
title: "Recorrido por un contrato ERC-721 de Vyper"
description: "El contrato ERC-721 de Ryuya Nakamura y cómo funciona"
author: Ori Pomerantz
lang: es
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Introducción {#introduction}

El estándar [ERC-721](/developers/docs/standards/tokens/erc-721/) se usa para mantener la propiedad de los tokens no fungibles (NFT).
Los tókenes [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportan como una mercancía, porque no hay diferencia entre los tókenes individuales.
A diferencia de esto, los tókenes ERC-721 están diseñados para activos que son similares pero no idénticos, como diferentes [dibujos de gatos](https://www.cryptokitties.co/) o títulos de diferentes propiedades inmobiliarias.

En este artículo analizaremos el [contrato ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Este contrato está escrito en [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un lenguaje de contratos similar a Python diseñado para que sea más difícil escribir código inseguro que en Solidity.

## El contrato {#contract}

```python
# @dev Implementación del estándar de token no fungible ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modificado de: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Los comentarios en Vyper, como en Python, empiezan con un hash (`#`) y continúan hasta el final de la línea. Los comentarios que incluyen `@<keyword>` son utilizados por [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) para producir documentación legible por humanos.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

La interfaz ERC-721 está integrada en el lenguaje Vyper.
[Puede ver la definición del código aquí](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
La definición de la interfaz está escrita en Python, en lugar de Vyper, porque las interfaces se utilizan no solo dentro de la cadena de bloques, sino también al enviar a la cadena de bloques una transacción desde un cliente externo, que puede estar escrito en Python.

La primera línea importa la interfaz y la segunda especifica que la estamos implementando aquí.

### La interfaz ERC721Receiver {#receiver-interface}

```python
# Interfaz para el contrato llamado por safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 admite dos tipos de transferencia:

- `transferFrom`, que permite al emisor especificar cualquier dirección de destino y pone la responsabilidad de la transferencia sobre el emisor. Esto significa que puede transferir a una dirección no válida, en cuyo caso el NFT se pierde para siempre.
- `safeTransferFrom`, que comprueba si la dirección de destino es un contrato. Si es así, el contrato ERC-721 le pregunta al contrato receptor si quiere recibir el NFT.

Para responder a las solicitudes de `safeTransferFrom`, un contrato receptor tiene que implementar `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

La dirección `_from` es el propietario actual del token. La dirección `_operator` es la que solicitó la transferencia (estas dos pueden no ser las mismas, debido a los permisos).

```python
            _tokenId: uint256,
```

Los ID del token ERC-721 son de 256 bits. Normalmente, se crean mediante el hash de una descripción de lo que el token representa.

```python
            _data: Bytes[1024]
```

La solicitud puede tener hasta 1024 bytes de datos de usuario.

```python
        ) -> bytes32: view
```

Para evitar casos en los que un contrato acepte accidentalmente una transferencia, el valor de retorno no es un booleano, sino 256 bits con un valor específico.

Esta función es una `view`, lo que significa que puede leer el estado de la cadena de bloques, pero no modificarlo.

### Eventos {#events}

Se emiten [eventos](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) para informar de los eventos a los usuarios y servidores que están fuera de la cadena de bloques. Tenga en cuenta que el contenido de los eventos no está disponible para los contratos en la cadena de bloques.

```python
# @dev Se emite cuando la propiedad de cualquier NFT cambia por cualquier mecanismo. Este evento se emite cuando los NFT se
#      crean (`from` == 0) y se destruyen (`to` == 0). Excepción: durante la creación del contrato, se puede
#      crear y asignar cualquier número de NFT sin emitir una Transferencia. En el momento de cualquier
#      transferencia, la dirección aprobada para ese NFT (si la hubiera) se restablece a ninguna.
# @param _from Emisor del NFT (si la dirección es la dirección cero, indica la creación del token).
# @param _to Receptor del NFT (si la dirección es la dirección cero, indica la destrucción del token).
# @param _tokenId El NFT que fue transferido.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Esto es similar al evento de Transferencia de ERC-20, con la excepción de que se reporta un `tokenId` en lugar de una cantidad.
Nadie posee la dirección cero, así que, por convención, la usamos para informar de la creación y la destrucción de los tokens.

```python
# @dev Se emite cuando la dirección aprobada para un NFT se cambia o se reafirma. La dirección
#      cero indica que no hay ninguna dirección aprobada. Cuando se emite un evento de Transferencia, esto también
#      indica que la dirección aprobada para ese NFT (si la hubiera) se restablece a ninguna.
# @param _owner Propietario del NFT.
# @param _approved Dirección que estamos aprobando.
# @param _tokenId NFT que estamos aprobando.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Una aprobación de ERC-721 es similar a una autorización de ERC-20. A una dirección específica se le permite transferir un token específico. Esto proporciona un mecanismo para que los contratos respondan cuando aceptan un token. Los contratos no pueden escuchar eventos, así que si simplemente les transfiere el token, estos no lo "sabrán". De esta manera, el propietario primero envía una aprobación y luego una solicitud al contrato: "Le he aprobado para transferir el token X, por favor, hágalo...".

Esta es una decisión de diseño para hacer que el estándar ERC-721 sea similar al estándar ERC-20. Como los tókenes ERC-721 no son fungibles, un contrato también puede identificar que obtuvo un token específico al mirar la propiedad del token.

```python
# @dev Se emite cuando se habilita o deshabilita un operador para un propietario. El operador puede gestionar
#      todos los NFT del propietario.
# @param _owner Propietario del NFT.
# @param _operator Dirección a la que le estamos asignando los derechos de operador.
# @param _approved Estado de los derechos de operador (verdadero si se otorgan los derechos de operador y falso si
# se revocan).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

A veces es útil tener un _operador_ que pueda gestionar todos los tókenes de una cuenta de un tipo específico (aquellos que son gestionados por un contrato específico), de forma similar a un poder notarial. Por ejemplo, podría querer darle dicho poder a un contrato que compruebe si no lo he contactado durante seis meses y, en ese caso, distribuya mis activos a mis herederos (si uno de ellos lo solicita, los contratos no pueden hacer nada sin ser llamados por una transacción). En ERC-20 podemos simplemente dar una autorización alta a un contrato de herencia, pero eso no funciona para ERC-721 porque los tókenes no son fungibles. Este es el equivalente.

El valor `approved` nos dice si el evento es para una aprobación o para el retiro de una aprobación.

### Variables de estado {#state-vars}

Estas variables contienen el estado actual de los tókenes: cuáles están disponibles y quién los posee. La mayoría de estos son objetos `HashMap`, [mapeos unidireccionales que existen entre dos tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapeo del ID del NFT a la dirección que lo posee.
idToOwner: HashMap[uint256, address]

# @dev Mapeo del ID del NFT a la dirección aprobada.
idToApprovals: HashMap[uint256, address]
```

Las identidades del usuario y del contrato en Ethereum vienen representadas por direcciones de 160 bits. Estas dos variables mapean desde identificadores de tókenes a sus propietarios y aquellos aprobados para transferirlos (máximo uno para cada uno). En Ethereum, los datos no inicializados siempre son cero, así que si no hay ningún propietario o transferidor aprobado, el valor para ese token es cero.

```python
# @dev Mapeo de la dirección del propietario al recuento de sus tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variable contiene el recuento de tokens de cada propietario. No hay mapeo de propietarios a tókenes, así que la única manera de identificar los tókenes que posee un propietario específico es mirar el historial de eventos de la cadena de bloques y ver los eventos apropiados de `Transfer`. Podemos usar esta variable para saber cuándo tenemos todos los NFT y no necesitamos buscar más atrás en el tiempo.

Tenga en cuenta que este algoritmo sólo funciona para interfaces de usuario y servidores externos. El código en ejecución en la propia cadena de bloques no puede leer eventos pasados.

```python
# @dev Mapeo de la dirección del propietario al mapeo de las direcciones del operador.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Una cuenta puede tener más de un solo operador. Un `HashMap` simple es insuficiente para llevar un seguimiento de ellos, porque cada clave conduce a un único valor. En su lugar, puede utilizar `HashMap[address, bool]` como el valor. Por defecto, el valor para cada dirección es `False`, lo que significa que no es un operador. Puede establecer los valores a `True` según sea necesario.

```python
# @dev Dirección del acuñador, quien puede acuñar un token.
minter: address
```

Los nuevos tokens tienen que crearse de alguna manera. En este contrato hay una única entidad que puede hacerlo, el `minter`. Es probable que esto sea suficiente para un juego, por ejemplo. Para otros propósitos, podría ser necesario crear una lógica de negocio más complicada.

```python
# @dev Mapeo de la id de la interfaz a un bool sobre si es compatible o no.
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID de interfaz ERC165 de ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID de interfaz ERC165 de ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica un mecanismo para que un contrato revele cómo las aplicaciones pueden comunicarse con él y a qué ERC se ajusta. En este caso, el contrato se ajusta a ERC-165 y ERC-721.

### Funciones {#functions}

Estas son las funciones que realmente implementan ERC-721.

#### Constructor {#constructor}

```python
@external
def __init__():
```

En Vyper, como en Python, la función constructora se llama `__init__`.

```python
    """
    @dev Constructor de contrato.
    """
```

En Python y en Vyper, también puede crear un comentario especificando una cadena de varias líneas (que comienza y termina con `"""`) y no utilizándola de ninguna manera. Estos comentarios también pueden incluir [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Para acceder a las variables de estado, use `self.<nombre de la variable>`(de nuevo, igual que en Python).

#### Funciones de vista {#views}

Estas son funciones que no modifican el estado de la cadena de bloques y, por lo tanto, pueden ejecutarse de forma gratuita si se llaman externamente. Si las funciones de vista son llamadas por un contrato, todavía tienen que ejecutarse en cada nodo y, por lo tanto, cuestan gas.

```python
@view
@external
```

Estas palabras clave que preceden a la definición de una función y que empiezan con una arroba (`@`) se denominan _decoraciones_. Especifican las circunstancias en las que se puede llamar a una función.

- `@view` especifica que esta función es una vista.
- `@external` especifica que esta función en particular puede ser llamada por transacciones y por otros contratos.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

A diferencia de Python, Vyper es un [lenguaje de tipo estático](https://wikipedia.org/wiki/Type_system#Static_type_checking).
No se puede declarar una variable o un parámetro de función sin identificar el [tipo de datos](https://vyper.readthedocs.io/en/latest/types.html). En este caso, el parámetro de entrada es `bytes32`, un valor de 256 bits (256 bits es el tamaño de palabra nativo de la [máquina virtual de Ethereum](/developers/docs/evm/)). La salida es un valor booleano. Por convención, los nombres de los parámetros de las funciones comienzan con un guion bajo (`_`).

```python
    """
    @dev La identificación de la interfaz se especifica en ERC-165.
    @param _interfaceID Id de la interfaz.
    """
    return self.supportedInterfaces[_interfaceID]
```

Devuelve el valor del HashMap `self.supportedInterfaces`, que se establece en el constructor (`__init__`).

```python
### FUNCIONES DE VISTA ###

```

Estas son las funciones de vista que hacen que la información sobre los tokens esté disponible para los usuarios y otros contratos.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Devuelve el número de NFT que posee `_owner`.
         Lanza un error si `_owner` es la dirección cero. Los NFT asignados a la dirección cero se consideran inválidos.
    @param _owner Dirección para la que se consulta el saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Esta línea [afirma](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` no es cero. Si lo es, se produce un error y la operación se revierte.

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
    # Lanza un error si `_tokenId` no es un NFT válido.
    assert owner != ZERO_ADDRESS
    return owner
```

En la máquina virtual de Ethereum (EVM), cualquier almacenamiento que no tenga un valor almacenado en él es cero.
Si no hay ningún token en `_tokenId`, entonces el valor de `self.idToOwner[_tokenId]` es cero. En ese caso, la función se revierte.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Obtener la dirección aprobada para un único NFT.
         Lanza un error si `_tokenId` no es un NFT válido.
    @param _tokenId ID del NFT para consultar la aprobación.
    """
    # Lanza un error si `_tokenId` no es un NFT válido.
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
    @param _owner La dirección que posee los NFT.
    @param _operator La dirección que actúa en nombre del propietario.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Esta función comprueba si `_operator` tiene permiso para gestionar todos los tokens de `_owner` en este contrato.
Debido a que puede haber múltiples operadores, se trata de un HashMap de dos niveles.

#### Funciones auxiliares de transferencia {#transfer-helpers}

Estas funciones implementan operaciones que son parte de la transferencia o la gestión de tókenes.

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
    @param spender Dirección del gastador a consultar
    @param tokenId ID de uint256 del token a transferir
    @return bool si el msg.sender está aprobado para el ID de token dado,
        es un operador del propietario, o es el propietario del token.
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Hay tres formas en las que se puede permitir que una dirección transfiera un token:

1. La dirección es la propietaria del token.
2. La dirección está aprobada para gastar ese token
3. La dirección es un operador para el propietario del token.

La función anterior puede ser una vista porque no cambia el estado. Para reducir los costes operativos, cualquier función que _pueda_ ser una vista _debería_ ser una vista.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Añadir un NFT a una dirección determinada
         Lanza un error si `_tokenId` es propiedad de alguien.
    """
    # Lanza un error si `_tokenId` es propiedad de alguien.
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Cambiar el propietario
    self.idToOwner[_tokenId] = _to
    # Cambiar el seguimiento del recuento
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Eliminar un NFT de una dirección determinada.
         Lanza un error si `_from` no es el propietario actual.
    """
    # Lanza un error si `_from` no es el propietario actual.
    assert self.idToOwner[_tokenId] == _from
    # Cambiar el propietario
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Cambiar el seguimiento del recuento
    self.ownerToNFTokenCount[_from] -= 1
```

Cuando hay un problema con una transferencia, revertimos la llamada.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Borrar la aprobación de una dirección determinada.
         Lanza un error si `_owner` no es el propietario actual.
    """
    # Lanza un error si `_owner` no es el propietario actual.
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Restablecer las aprobaciones
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Cambie el valor solo si es necesario. Las variables de estado residen en el almacenamiento. Escribir en el almacenamiento es una de las operaciones más caras que realiza la EVM (máquina virtual de Ethereum) (en términos de [gas](/developers/docs/gas/)). Por lo tanto, es una buena idea minimizarlo, incluso escribir el valor existente tiene un alto coste.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Ejecutar la transferencia de un NFT.
         Se produce una excepción a menos que `msg.sender` sea el propietario actual, un operador autorizado o la dirección aprobada
         para este NFT. (NOTA: `msg.sender` no está permitido en la función privada, así que se pasa `_sender`).
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_from` no es el propietario actual.
         Lanza un error si `_tokenId` no es un NFT válido.
    """
```

Tenemos esta función interna porque hay dos maneras de transferir tokens (regular y segura), pero queremos un solo lugar en el código donde lo hagamos para facilitar la auditoría.

```python
    # Comprobar los requisitos
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Lanza un error si `_to` es la dirección cero
    assert _to != ZERO_ADDRESS
    # Borrar la aprobación. Lanza un error si `_from` no es el propietario actual
    self._clearApproval(_from, _tokenId)
    # Eliminar NFT. Lanza un error si `_tokenId` no es un NFT válido
    self._removeTokenFrom(_from, _tokenId)
    # Añadir NFT
    self._addTokenTo(_to, _tokenId)
    # Registrar la transferencia
    log Transfer(_from, _to, _tokenId)
```

Para emitir un evento en Vyper se utiliza una sentencia `log` ([consulte aquí para más detalles](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funciones de transferencia {#transfer-funs}

```python

### FUNCIONES DE TRANSFERENCIA ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Se produce una excepción a menos que `msg.sender` sea el propietario actual, un operador autorizado o la dirección aprobada
         para este NFT.
         Lanza un error si `_from` no es el propietario actual.
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_tokenId` no es un NFT válido.
    @notice El llamador es responsable de confirmar que `_to` es capaz de recibir NFT, de lo contrario
            pueden perderse permanentemente.
    @param _from El propietario actual del NFT.
    @param _to El nuevo propietario.
    @param _tokenId El NFT a transferir.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Esta función le permite transferir a una dirección arbitraria. A menos que la dirección sea un usuario, o un contrato que sepa cómo transferir tokens, cualquier token que transfiera se quedará atascado en esa dirección y será inútil.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfiere la propiedad de un NFT de una dirección a otra.
         Se produce una excepción a menos que `msg.sender` sea el propietario actual, un operador autorizado o la
         dirección aprobada para este NFT.
         Lanza un error si `_from` no es el propietario actual.
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_tokenId` no es un NFT válido.
         Si `_to` es un contrato inteligente, llama a `onERC721Received` en `_to` y produce una excepción si
         el valor de retorno no es `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTA: bytes4 está representado por bytes32 con relleno
    @param _from El propietario actual del NFT.
    @param _to El nuevo propietario.
    @param _tokenId El NFT a transferir.
    @param _data Datos adicionales sin formato especificado, enviados en la llamada a `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Está bien hacer la transferencia primero porque si hay un problema vamos a revertir de todos modos, así que todo lo que se haga en la llamada será cancelado.

```python
    if _to.is_contract: # comprobar si `_to` es una dirección de contrato
```

Primero compruebe si la dirección es un contrato (si tiene código). Si no, asuma que es una dirección de usuario y que el usuario podrá usar el token o transferirlo. Pero no deje que le arrulle en una falsa sensación de seguridad. Puede perder tokens, incluso con `safeTransferFrom`, si los transfiere a una dirección de la que nadie conoce la clave privada.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Llame al contrato de destino para ver si puede recibir tókenes ERC-721.

```python
        # Lanza un error si el destino de la transferencia es un contrato que no implementa 'onERC721Received'.
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Si el destino es un contrato, pero uno que no acepta tókenes ERC-721 (o que decidió no aceptar esta transferencia en particular), se revierte.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Establecer o reafirmar la dirección aprobada para un NFT. La dirección cero indica que no hay dirección aprobada.
         Lanza un error a menos que `msg.sender` sea el propietario actual del NFT, o un operador autorizado del propietario actual.
         Lanza un error si `_tokenId` no es un NFT válido. (NOTA: Esto no está escrito en la EIP)
         Lanza un error si `_approved` es el propietario actual. (NOTA: Esto no está escrito en la EIP)
    @param _approved Dirección a aprobar para el ID de NFT dado.
    @param _tokenId ID del token a aprobar.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lanza un error si `_tokenId` no es un NFT válido.
    assert owner != ZERO_ADDRESS
    # Lanza un error si `_approved` es el propietario actual
    assert _approved != owner
```

Por convención, si no quiere tener un aprobador, designe la dirección cero, no a usted mismo.

```python
    # Comprobar los requisitos
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Para establecer una aprobación, puede ser el propietario o un operador autorizado por el propietario.

```python
    # Establecer la aprobación
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Habilita o deshabilita la aprobación para que un tercero ("operador") gestione todos los
         activos de `msg.sender`. También emite el evento ApprovalForAll.
         Lanza un error si `_operator` es el `msg.sender`. (NOTA: Esto no está escrito en la EIP)
    @notice Esto funciona incluso si el emisor no posee ningún token en ese momento.
    @param _operator Dirección para añadir al conjunto de operadores autorizados.
    @param _approved True si los operadores están aprobados, false para revocar la aprobación.
    """
    # Lanza un error si `_operator` es el `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Acuñar nuevos tokens y destruir los existentes {#mint-burn}

La cuenta que creó el contrato es el `minter`, el superusuario que está autorizado a acuñar nuevos NFT. Sin embargo, ni siquiera se le permite quemar los tókenes existentes. Solo el propietario, o una entidad autorizada por el propietario, puede hacerlo.

```python
### FUNCIONES DE ACUÑACIÓN Y QUEMA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Esta función siempre devuelve `True`, porque si la operación falla, se revierte.

```python
    """
    @dev Función para acuñar tokens.
         Lanza un error si `msg.sender` no es el acuñador.
         Lanza un error si `_to` es la dirección cero.
         Lanza un error si `_tokenId` es propiedad de alguien.
    @param _to La dirección que recibirá los tokens acuñados.
    @param _tokenId El ID del token a acuñar.
    @return Un booleano que indica si la operación tuvo éxito.
    """
    # Lanza un error si `msg.sender` no es el acuñador
    assert msg.sender == self.minter
```

Solo el acuñador (la cuenta que creó el contrato ERC-721) puede acuñar nuevos tokens. Esto puede ser un problema en el futuro si queremos cambiar la identidad del acuñador. En un contrato de producción, probablemente querrá una función que permita al acuñador transferir los privilegios de acuñador a otra persona.

```python
    # Lanza un error si `_to` es la dirección cero
    assert _to != ZERO_ADDRESS
    # Añadir NFT. Lanza un error si `_tokenId` es propiedad de alguien
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Por convención, la acuñación de nuevos tokens cuenta como una transferencia desde la dirección cero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Quema un token ERC721 específico.
         Lanza un error a menos que `msg.sender` sea el propietario actual, un operador autorizado o la dirección
         aprobada para este NFT.
         Lanza un error si `_tokenId` no es un NFT válido.
    @param _tokenId id uint256 del token ERC721 a quemar.
    """
    # Comprobar los requisitos
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Lanza un error si `_tokenId` no es un NFT válido
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Cualquiera que tenga permiso para transferir un token puede quemarlo. Aunque una quema parece equivalente a una transferencia a la dirección cero, la dirección cero no recibe realmente el token. Esto nos permite liberar todo el almacenamiento que se utilizó para el token, lo que puede reducir el costo de gas de la transacción.

## Uso de este contrato {#using-contract}

A diferencia de Solidity, Vyper no tiene herencia. Esta es una elección de diseño deliberada para hacer el código más claro y, por lo tanto, más fácil de asegurar. Por lo tanto, para crear su propio contrato ERC-721 de Vyper, tome [este contrato](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) y modifíquelo para implementar la lógica de negocio que desee.

## Conclusión {#conclusion}

A modo de recapitulación, he aquí algunas de las ideas más importantes de este contrato:

- Para recibir tokens ERC-721 con una transferencia segura, los contratos tienen que implementar la interfaz `ERC721Receiver`.
- Incluso si utiliza una transferencia segura, los tokens pueden atascarse si los envía a una dirección cuya clave privada es desconocida.
- Cuando hay un problema con una operación, es una buena idea `revertir` la llamada, en lugar de simplemente devolver un valor de fallo.
- Los tokens ERC-721 existen cuando tienen un propietario.
- Existen tres maneras de ser autorizados para transferir un NFT. Puede ser el propietario, estar aprobado para un token específico, o ser un operador para todos los tokens del propietario.
- Los eventos pasados solo son visibles fuera de la cadena de bloques. El código que se ejecuta dentro de la cadena de bloques no puede verlos.

Ahora vaya e implemente contratos seguros de Vyper.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

