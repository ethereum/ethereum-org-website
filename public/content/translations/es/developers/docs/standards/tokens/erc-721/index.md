---
title: Estándar de token no fungible ERC-721
description: Aprenda sobre ERC-721, el estándar para tokens no fungibles (NFT) que representan activos digitales únicos en Ethereum.
lang: es
---

## Introducción {#introduction}

**¿Qué es un token no fungible?**

Un token no fungible (NFT) se utiliza para identificar algo o a alguien de forma única. Este tipo de token es perfecto para usarse en plataformas que ofrecen artículos coleccionables, claves de acceso, billetes de lotería, asientos numerados para conciertos y partidos deportivos, etc. Este tipo especial de token tiene posibilidades increíbles, por lo que merece un estándar adecuado, ¡el ERC-721 llegó para resolverlo!

**¿Qué es ERC-721?**

El ERC-721 introduce un estándar para los NFT, en otras palabras, este tipo de token es único y puede tener un valor diferente al de otro token del mismo contrato inteligente, tal vez debido a su antigüedad, rareza o incluso algo más como su aspecto visual. Un momento, ¿aspecto visual?

¡Sí! Todos los NFT tienen una variable `uint256` llamada `tokenId`, por lo que para cualquier contrato ERC-721, el par `contract address, uint256 tokenId` debe ser globalmente único. Dicho esto, una aplicación descentralizada (dapp) puede tener un "convertidor" que utilice el `tokenId` como entrada y produzca una imagen de algo genial, ¡como zombis, armas, habilidades o gatitos increíbles!

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts/)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de tokens](/developers/docs/standards/tokens/)

## Cuerpo {#body}

El ERC-721 ([Ethereum](/) Request for Comments 721), propuesto por William Entriken, Dieter Shirley, Jacob Evans y Nastassia Sachs en enero de 2018, es un estándar de token no fungible que implementa una API para tokens dentro de contratos inteligentes.

Proporciona funcionalidades como transferir tokens de una cuenta a otra, obtener el saldo actual de tokens de una cuenta, obtener el propietario de un token específico y también el suministro total del token disponible en la red. Además de estas, también tiene otras funcionalidades como aprobar que una cantidad de tokens de una cuenta pueda ser movida por una cuenta de terceros.

Si un contrato inteligente implementa los siguientes métodos y eventos, se le puede llamar contrato de token no fungible ERC-721 y, una vez desplegado, será responsable de realizar un seguimiento de los tokens creados en Ethereum.

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

Veamos cómo un estándar es tan importante para simplificarnos la inspección de cualquier contrato de token ERC-721 en Ethereum. Solo necesitamos la Interfaz Binaria de Aplicación (ABI) del contrato para crear una interfaz para cualquier token ERC-721. Como puede ver a continuación, utilizaremos una ABI simplificada para que sea un ejemplo de baja fricción.

#### Ejemplo con Web3.py {#web3py-example-2}

Primero, asegúrese de haber instalado la biblioteca de Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Contrato de CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Subasta de venta de CryptoKitties

# Esta es una Interfaz Binaria de Aplicación (ABI) de contrato simplificada de un contrato NFT ERC-721.
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
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Usando la ABI del evento de transferencia para obtener información sobre los Kitties transferidos.
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
#   - Aumente el número de bloques a más de 120 si no se devuelve ningún evento de transferencia.
#   - Si no encontró ningún evento de transferencia, también puede intentar obtener un tokenId en:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Haga clic para expandir los registros del evento y copie su argumento "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Pegue el "tokenId" aquí desde el enlace anterior
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

El contrato de CryptoKitties tiene algunos eventos interesantes además de los estándar.

Revisemos dos de ellos, `Pregnant` y `Birth`.

```python
# Usando la ABI de los eventos Pregnant y Birth para obtener información sobre nuevos Kitties.
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

- [Rastreador de NFT de Etherscan](https://etherscan.io/nft-top-contracts) enumera los principales NFT en Ethereum por volumen de transferencias.
- [CryptoKitties](https://www.cryptokitties.co/) es un juego centrado en criaturas criables, coleccionables y muy adorables que llamamos CryptoKitties.
- [Sorare](https://sorare.com/) es un juego de fútbol de fantasía global donde puede reunir coleccionables de edición limitada, administrar sus equipos y competir para ganar premios.
- [El Servicio de Nombres de Ethereum (ENS)](https://ens.domains/) ofrece una forma segura y descentralizada de direccionar recursos tanto dentro como fuera de la cadena de bloques utilizando nombres simples y legibles por humanos.
- [POAP](https://poap.xyz) entrega NFT gratuitos a las personas que asisten a eventos o completan acciones específicas. Los POAP son gratuitos de crear y distribuir.
- [Unstoppable Domains](https://unstoppabledomains.com/) es una empresa con sede en San Francisco que construye dominios en cadenas de bloques. Los dominios de cadena de bloques reemplazan las direcciones de criptomonedas con nombres legibles por humanos y se pueden usar para habilitar sitios web resistentes a la censura.
- [Cartas de Gods Unchained](https://godsunchained.com/) es un juego de cartas coleccionables (TCG) en la cadena de bloques de Ethereum que utiliza NFT para brindar propiedad real a los activos del juego.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) es una colección de 10.000 NFT únicos que, además de ser una obra de arte de rareza demostrable, actúa como un token de membresía para el club, proporcionando ventajas y beneficios a los miembros que aumentan con el tiempo como resultado de los esfuerzos de la comunidad.

## Lecturas adicionales {#further-reading}

- [EIP-721: Estándar de token no fungible ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin: Documentación de ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin: Implementación de ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API de NFT de Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Tutoriales: Construir con tokens no fungibles (ERC-721) en Ethereum {#tutorials}

- [Guía paso a paso del contrato ERC-721 en Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Una guía paso a paso anotada de un contrato NFT ERC-721 completo escrito en Vyper._
- [Cómo escribir y desplegar un NFT (Parte 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Guía paso a paso para escribir y desplegar su primer contrato inteligente ERC-721._
- [Cómo acuñar un NFT (Parte 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Cómo acuñar un NFT ERC-721 utilizando su contrato inteligente desplegado y Web3._
- [Cómo ver su NFT en su billetera (Parte 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Cómo mostrar su NFT acuñado en MetaMask después del despliegue._
- [Tutorial de acuñador de NFT](/developers/tutorials/nft-minter/) _– Construya una dapp de acuñación de NFT full-stack con un frontend en React, MetaMask y Alchemy._