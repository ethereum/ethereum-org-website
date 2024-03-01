---
title: Estándar de token no fungible ERC-721
description:
lang: es
---

## Introducción {#introduction}

**¿Qué es un token no fungible o funcional?**

Una ficha no funcional (NFT) se utiliza para identificar algo o a alguien de una manera única. Este tipo de token es perfecto para ser usado en plataformas que ofrecen artículos recolectables, acceder a llaves, boletos de lotería, asientos numerados para conciertos y partidos deportivos, etc. Este tipo especial de token tiene unas posibilidades asombrosas, por lo que merece un estándar adecuado, el ERC-721 vino a solucionarlo.

**¿Qué es ERC-721?**

El ERC-721 introduce una norma para NFT, en otras palabras, este tipo de ficha es único y puede tener un valor diferente que otra ficha del mismo contrato inteligente, tal vez debido a su antigüedad, rareza o incluso a algo como su visualidad. Espera, ¿visual?

¡Sí! Todos los NFT tienen una variable `uint256` llamada `tokenId`, así para cualquier Contrato ERC-721, el par `dirección del contrato, uint256 tokenId` debe ser único globalmente. Dicho esto, una dapp puede tener un "convertidor" que utilice el `tokenId` como entrada y produzca una imagen de algo atractivo, ¡como zombies, armas, habilidades o increíbles gatitos!

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts/)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de token](/developers/docs/standards/tokens/)

## Cuerpo {#body}

El ERC-721 (Ethereum Request for Comments 721), propuesto por William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs en enero de 2018, es un Estándar de Token No Fungible que implementa una API para tokens dentro de Smart Contracts.

Proporciona funcionalidades como transferir tokens de una cuenta a otra, para obtener el saldo actual del token de una cuenta y además del suministro total del token disponible en la red. Además de estos también tiene otras funcionalidades como aprobar que una cantidad de token de una cuenta puede ser gastada por una cuenta de terceros.

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

Vamos a ver la importancia de un estándar para que inspeccionemos fácilmente cualquier contrato de token de ERC-721 en Ethereum. Sólo necesitamos la Interfaz binaria de aplicaciones de contrato (ABI) para crear una interfaz a cualquier Token ERC-721. Como puedes ver a continuación, usaremos un ABI simplificado, para que sea un ejemplo de fricción baja.

#### Ejemplo de Web3.py {#web3py-example}

Primero asegúrate de haber instalado [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python library:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - Increase the number of blocks up from 120 if no Transfer event is returned.
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

El contrato de CryptoKitties tiene algunos eventos interesantes aparte de los estándar.

Revisemos dos de ellos, `Embarazada` y `Nacimiento`.

```python
# Usar la ABI de eventos de Embarazada y Nacimiento para obtener información sobre nuevos gatitos.
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

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT populares {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) enumera los principales NFT en Ethereum por volumen de transferencias.
- [CryptoKitties](https://www.cryptokitties.co/) es un juego centrado en criables, coleccionables y tan adorables criaturas que llamamos CryptoKitties.
- [Sorare](https://sorare.com/) es un juego de fútbol de fantasía global en el que puedes coleccionar coleccionables de ediciones limitadas, gestiona tus equipos y compite para ganar premios.
- [Ethereum Name Service (ENS)](https://ens.domains/) ofrece un Nombre en forma descentralizada de abordar los recursos tanto dentro y fuera de la cadena de bloques utilizando nombres sencillos y legibles por humanos.
- [POAP](https://poap.xyz) entrega NFT gratis a las personas que asisten a eventos o completan acciones específicas. Los POAP se pueden crear y distribuir de forma gratuita.
- [Unstoppable Domains](https://unstoppabledomains.com/) es una empresa con sede en San Francisco que crea dominios en cadenas de bloques. Los dominios de cadena de bloques reemplazan las direcciones de criptomonedas por nombres legibles por humanos y se pueden usar para habilitar sitios web resistentes a la censura.
- [Tarjetas de Gods Unchained:](https://godsunchained.com/) TCG en la cadena de bloques de Ethereum que utiliza NFT para otorgar propiedad real en los activos del juego.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) es una colección de 10.000 NFT únicos que, además de ser obras de arte de probada rareza, actúa como token de membresía del club, lo que proporciona ventajas y beneficios a los miembros que aumentan con el tiempo como resultado de los esfuerzos de la comunidad.

## Leer más {#further-reading}

- [EIP-721: ERC-721 Estándar de token no fungible](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin: Documentos de ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin: Implementación de ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API de NFT de Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
