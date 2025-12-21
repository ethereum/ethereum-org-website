---
title: "Estándar de token no fungible ERC-721"
description: "Familiarícese con ERC-721, el estándar para tókenes no fungibles (NFT) que representan activos digitales únicos en Ethereum."
lang: es
---

## Introducción {#introduction}

**¿Qué es un token no fungible?**

Una ficha no funcional (NFT) se utiliza para identificar algo o a alguien de una manera única. Este tipo de token es perfecto para
ser usado en plataformas que ofrecen artículos recolectables, acceder a llaves, boletos de lotería, asientos numerados para conciertos y
partidos deportivos, etc. Este tipo especial de token tiene unas posibilidades asombrosas, por lo que merece un estándar adecuado, el ERC-721
vino a solucionarlo.

**¿Qué es el ERC-721?**

El ERC-721 introduce una norma para NFT, en otras palabras, este tipo de ficha es único y puede tener un valor diferente
que otra ficha del mismo contrato inteligente, tal vez debido a su antigüedad, rareza o incluso a algo como su visualidad.
Espera, ¿visual?

¡Sí! Todos los NFT tienen una variable `uint256` llamada `tokenId`, por lo que para cualquier contrato ERC-721, el par
`dirección del contrato, tokenId uint256` debe ser único a nivel mundial. Dicho esto, una dapp puede tener un "convertidor" que
utilice el `tokenId` como entrada y genere una imagen de algo genial, como zombis, armas, habilidades ¡o gatitos increíbles!

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts/)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de tokens](/desarrolladores/documentos/estándares/tokens/)

## Cuerpo {#body}

El ERC-721 (Ethereum Request for Comments 721), propuesto por William Entriken, Dieter Shirley, Jacob Evans,
Nastassia Sachs en enero de 2018, es un Estándar de Token No Fungible que implementa una API para tokens dentro de Smart Contracts.

Proporciona funcionalidades como transferir tokens de una cuenta a otra, obtener el saldo de tokens actual de una
cuenta, obtener el propietario de un token específico y también el suministro total del token disponible en la red.
Además de estos también tiene otras funcionalidades
como aprobar que una cantidad de token de una cuenta puede ser gastada por una cuenta de terceros.

Si un contrato inteligente implementa los siguientes métodos y eventos, se puede llamar un Contrato de Token ERC-721, y una vez desplegado será el responsable de llevar un seguimiento de los tokens creados en Ethereum.

De [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Métodos {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### Eventos {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Ejemplos {#web3py-example}

Vamos a ver la importancia de un estándar para que inspeccionemos fácilmente cualquier contrato de token de ERC-721 en Ethereum.
Sólo necesitamos la Interfaz binaria de aplicaciones de contrato (ABI) para crear una interfaz a cualquier Token ERC-721. Como puedes
ver a continuación, usaremos una ABI simplificada, para que sea un ejemplo de fricción bajo.

#### Ejemplo de Web3.py {#web3py-example}

Primero, asegúrese de que ha instalado la librería de Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Contrato de CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Subasta de ventas de CryptoKitties

# Esta es una Interfaz Binaria de Aplicación (ABI) de Contrato simplificada de un Contrato NFT ERC-721.
# Expondrá solo los métodos: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFT en subastas: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFT preñados: {pregnant_kitties}")

# Usando el ABI del evento de transferencia para obtener información sobre los Kitties transferidos.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Necesitamos la firma del evento para filtrar los registros
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notas:
#   - Aumente el número de bloques a partir de 120 si no se devuelve ningún evento de Transferencia.
#   - Si no encontró ningún evento de Transferencia, también puede intentar obtener un tokenId en:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Haga clic para expandir los registros del evento y copie su argumento "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Pegue el "tokenId" aquí desde el enlace de arriba
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"El NFT {name} [{symbol}] {kitty_id} está preñado: {is_pregnant}")
```

El contrato de CryptoKitties tiene algunos eventos interesantes aparte de los estándar.

Revisemos dos de ellos, `Pregnant` y `Birth`.

```python
# Usando los ABI de los eventos Pregnant y Birth para obtener información sobre los nuevos Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# Necesitamos la firma del evento para filtrar los registros
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Aquí hay un evento Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Aquí hay un evento Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT populares {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) enumera los principales NFT de Ethereum por volumen de transferencias.
- [CryptoKitties](https://www.cryptokitties.co/) es un juego centrado en criaturas criables, coleccionables y muy adorables
  que llamamos CryptoKitties.
- [Sorare](https://sorare.com/) es un juego de fútbol de fantasía global en el que puedes coleccionar coleccionables de edición limitada,
  gestionar tus equipos y competir para ganar premios.
- [El Servicio de nombres de Ethereum (ENS)](https://ens.domains/) ofrece una forma segura y descentralizada de direccionar recursos tanto
  dentro como fuera de la cadena de bloques, utilizando nombres sencillos y legibles por humanos.
- [POAP](https://poap.xyz) entrega NFT gratuitos a las personas que asisten a eventos o completan acciones específicas. Los POAP se pueden crear y distribuir de forma gratuita.
- [Unstoppable Domains](https://unstoppabledomains.com/) es una empresa con sede en San Francisco que crea dominios en
  cadenas de bloques. Los dominios de cadena de bloques reemplazan las direcciones de criptomoneda con nombres legibles por humanos y se pueden utilizar para habilitar
  sitios web resistentes a la censura.
- [Gods Unchained Cards](https://godsunchained.com/) es un TCG en la cadena de bloques de Ethereum que utiliza NFT para otorgar propiedad real
  a los activos del juego.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) es una colección de 10.000 NFT únicos que, además de ser una obra de arte de rareza demostrable, actúa como un token de membresía para el club, proporcionando ventajas y beneficios para los miembros que aumentan con el tiempo como resultado de los esfuerzos de la comunidad.

## Lecturas adicionales {#further-reading}

- [EIP-721: Estándar de token no fungible ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentación de ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementación de ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API de NFT de Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
