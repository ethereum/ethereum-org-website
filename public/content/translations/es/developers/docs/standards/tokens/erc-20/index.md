---
title: Estándar de token ERC-20
description:
lang: es
---

## Introducción {#introduction}

**¿Qué es un token?**

Los tokens pueden representar cualquier elemento virtualmente en Ethereum:

- puntos de reputación en la plataforma online
- las habilidades de un personaje en un juego
- activos financieros como una acción en una empresa
- una moneda fiat como el USD
- un lingote de oro
- y más...

Una característica tan poderosa de Ethereum debe ser manejada con un estándar sólido, ¿verdad? ¡Ahí es exactamente donde el ERC desempeña su papel! Este estándar permite a los desarrolladores construir aplicaciones de token que son interoperables con otros productos y servicios. El estándar ERC-20 también se utiliza para proporcionar funcionalidad adicional a [ether](/glossary/#ether).

**¿Qué es el ERC-20?**

El ERC-20 introduce un estándar para los tokens fungibles, es decir, tienen una propiedad que hace que cada token sea exactamente igual (en tipo y valor) que otro token. Por ejemplo, un token ERC-20 actúa igual que ETH, es decir, 1 token es y siempre será igual a todos los demás tokens.

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de token](/developers/docs/standards/tokens/)

## Cuerpo {#body}

El ERC-20 (Ethereum Request for Comments 20), propuesto por Fabian Vogelsteller en Noviembre 2015, es un estándar de token que implementa una API para tokens dentro de contratos inteligentes.

Ejemplos de funcionalidades que proporciona ERC-20:

- transferir tokens de una cuenta a otra
- obtener el saldo actual de tokens de una cuenta
- obtener el siministro total del token disponible en la red
- aprobar si una cantidad de tokens de una cuenta puede gastarse con una cuenta de terceros

Si un contrato inteligente implementa los siguientes métodos y eventos, se puede llamar un contrato de token ERC-20, y una vez implementado, será el responsable de llevar un seguimiento de los tokens creados en Ethereum.

Desde [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Métodos {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### Eventos {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Ejemplos {#web3py-example}

Vamos a ver cómo un estándar es tan importante para que las cosas sean sencillas para que inspeccionemos cualquier contrato de token de ERC-20 en Ethereum. Sólo necesitamos la Interfaz binaria de aplicaciones de contrato (ABI) para crear una interfaz a cualquier token ER-20. Como puedes ver a continuación, usaremos una ABI simplificada, para que sea un ejemplo de fricción bajo.

#### Ejemplo de Web3.py {#web3py-example}

Primero asegúrate de haber instalado [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python library:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
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
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Problemas conocidos {#erc20-issues}

### Problema de recepción de tokens ERC-20 {#reception-issue}

Cuando se envían tokens ERC-20 a un contrato inteligente que no está diseñado para manejar tokens ERC-20, esos tokens pueden perderse de forma permanente. Esto sucede porque el contrato que los recibe no tiene la funcionalidad de reconocer o responder a los tokens entrantes, y no hay ningún mecanismo en el estándar ERC-20 para notificar al contrato de recepción sobre los tokens entrantes. Las principales formas en que este problema toma forma es a través de:

1.  Mecanismo de transferencia de tokens
  - Los tokens ERC-20 se transfieren utilizando las funciones de transferencia o transferFrom
    -   Cuando un usuario envía tokens a una dirección de contrato utilizando estas funciones, los tokens se transfieren independientemente de si el contrato de recepción está diseñado para manejarlos
2.  Falta de notificación
    -   El contrato receptor no recibe una notificación o devolución de llamada de que se le han enviado tokens
    -   Si el contrato de recepción carece de un mecanismo para manejar los tokens (ej., una función de respaldo o una función dedicada para gestionar la recepción de tokens), los tokens quedan efectivamente atrapados en la dirección del contrato
3.  No hay forma de manejo incorporada
    -   El estándar ERC-20 no incluye una función obligatoria para la implementación de los contratos de recepción, lo que lleva a una situación en la que muchos contratos no pueden administrar los tokens entrantes correctamente

Algunos estándares alternativos han surgido como resultado de este problema, como [ERC-223](/developers/docs/standards/tokens/erc-223)

## Leer más {#further-reading}

- [EIP-20: Estándar de token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [Tokens de OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin: Implementación de ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy: Guía de tokens ERC20 de Solidity](https://www.alchemy.com/overviews/erc20-solidity)


## Otros estándares de tokens fungibles {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626: bóvedas tokenizadas](/developers/docs/standards/tokens/erc-4626)