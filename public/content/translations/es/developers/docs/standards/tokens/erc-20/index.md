---
title: Estándar de token ERC-20
description: Aprenda sobre el ERC-20, el estándar para tokens fungibles en Ethereum que permite aplicaciones de tokens interoperables.
lang: es
---

## Introducción {#introduction}

**¿Qué es un token?**

Los tokens pueden representar prácticamente cualquier cosa en [Ethereum](/):

- puntos de reputación en una plataforma en línea
- habilidades de un personaje en un juego
- activos financieros como una acción en una empresa
- una moneda fiduciaria como el USD
- una onza de oro
- y más...

Una característica tan poderosa de Ethereum debe ser manejada por un estándar robusto, ¿verdad? ¡Ahí es exactamente donde el ERC-20 juega su papel! Este estándar permite a los desarrolladores crear aplicaciones de tokens que son interoperables con otros productos y servicios. El estándar ERC-20 también se utiliza para proporcionar funcionalidad adicional al [ether](/glossary/#ether).

**¿Qué es el ERC-20?**

El ERC-20 introduce un estándar para tokens fungibles, en otras palabras, tienen una propiedad que hace que cada token sea exactamente igual (en tipo y valor) a otro token. Por ejemplo, un token ERC-20 actúa igual que el ETH, lo que significa que 1 token es y siempre será igual a todos los demás tokens.

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de tokens](/developers/docs/standards/tokens/)

## Cuerpo {#body}

El ERC-20 (Ethereum Request for Comments 20), propuesto por Fabian Vogelsteller en noviembre de 2015, es un estándar de token que implementa una API para tokens dentro de contratos inteligentes.

Ejemplos de funcionalidades que proporciona el ERC-20:

- transferir tokens de una cuenta a otra
- obtener el saldo actual de tokens de una cuenta
- obtener el suministro total del token disponible en la red
- aprobar si una cantidad de tokens de una cuenta puede ser gastada por una cuenta de terceros

Si un contrato inteligente implementa los siguientes métodos y eventos, se le puede llamar contrato de token ERC-20 y, una vez implementado, será responsable de realizar un seguimiento de los tokens creados en Ethereum.

De [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

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

Veamos cómo un estándar es tan importante para simplificarnos la inspección de cualquier contrato de token ERC-20 en Ethereum. Solo necesitamos la Interfaz Binaria de Aplicación (ABI) del contrato para crear una interfaz para cualquier token ERC-20. Como puede ver a continuación, utilizaremos una ABI simplificada para que sea un ejemplo de baja fricción.

#### Ejemplo con Web3.py {#web3py-example-2}

Primero, asegúrese de haber instalado la biblioteca de Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # ether envuelto (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Esta es una Interfaz Binaria de Aplicación (ABI) de contrato simplificada de un contrato de token ERC-20.
# Solo expondrá los métodos: balanceOf(address), decimals(), symbol() y totalSupply()
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

**A partir del 20/06/2024, se perdieron al menos $83,656,418 en tokens ERC-20 debido a este problema. Tenga en cuenta que una implementación pura de ERC-20 es propensa a este problema a menos que implemente un conjunto de restricciones adicionales además del estándar, como se enumera a continuación.**

Cuando se envían tokens ERC-20 a un contrato inteligente que no está diseñado para manejar tokens ERC-20, esos tokens pueden perderse permanentemente. Esto sucede porque el contrato receptor no tiene la funcionalidad para reconocer o responder a los tokens entrantes, y no hay ningún mecanismo en el estándar ERC-20 para notificar al contrato receptor sobre los tokens entrantes. Las principales formas en que este problema toma forma son a través de:

1.	Mecanismo de transferencia de tokens
  - Los tokens ERC-20 se transfieren utilizando las funciones transfer o transferFrom
	-	Cuando un usuario envía tokens a una dirección de contrato utilizando estas funciones, los tokens se transfieren independientemente de si el contrato receptor está diseñado para manejarlos
2.	Falta de notificación
	-	El contrato receptor no recibe una notificación o devolución de llamada (callback) de que se le han enviado tokens
	-	Si el contrato receptor carece de un mecanismo para manejar tokens (por ejemplo, una función de respaldo o una función dedicada para administrar la recepción de tokens), los tokens quedan efectivamente atascados en la dirección del contrato
3.	Sin manejo integrado
	-	El estándar ERC-20 no incluye una función obligatoria que los contratos receptores deban implementar, lo que lleva a una situación en la que muchos contratos no pueden administrar los tokens entrantes correctamente

**Posibles soluciones**

Si bien no es posible prevenir este problema con ERC-20 por completo, existen métodos que permitirían reducir significativamente la posibilidad de pérdida de tokens para el usuario final:

- El problema más común es cuando un usuario envía tokens a la propia dirección del contrato del token (por ejemplo, USDT depositado en la dirección del contrato del token USDT). Se recomienda restringir la función `transfer(..)` para revertir dichos intentos de transferencia. Considere agregar la comprobación `require(_to != address(this));` dentro de la implementación de la función `transfer(..)`.
- La función `transfer(..)` en general no está diseñada para depositar tokens en contratos. En su lugar, se utiliza el patrón `approve(..) & transferFrom(..)` para depositar tokens ERC-20 en contratos. Es posible restringir la función de transferencia para no permitir el depósito de tokens en ningún contrato con ella, sin embargo, puede romper la compatibilidad con los contratos que asumen que los tokens se pueden depositar en contratos con la función `transfer(..)` (por ejemplo, los fondos de liquidez de Uniswap).
- Asuma siempre que los tokens ERC-20 pueden terminar en su contrato, incluso si se supone que su contrato nunca recibirá ninguno. No hay forma de prevenir o rechazar depósitos accidentales en el extremo del destinatario. Se recomienda implementar una función que permita extraer tokens ERC-20 depositados accidentalmente.
- Considere usar estándares de tokens alternativos.

Algunos estándares alternativos han surgido de este problema, como [ERC-223](/developers/docs/standards/tokens/erc-223) o [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Lecturas adicionales {#further-reading}

- [EIP-20: Estándar de token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementación de ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guía de tokens ERC-20 en Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Otros estándares de tokens fungibles {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Bóvedas tokenizadas](/developers/docs/standards/tokens/erc-4626)

## Tutoriales: Construir con ERC-20 en Ethereum {#tutorials}

- [Tutorial del contrato ERC-20](/developers/tutorials/erc20-annotated-code/) _– Un tutorial anotado línea por línea de la implementación del contrato ERC-20 de OpenZeppelin._
- [ERC-20 con barandillas de seguridad](/developers/tutorials/erc20-with-safety-rails/) _– Cómo agregar salvaguardas a los tokens ERC-20 para ayudar a los usuarios a evitar errores comunes._
- [Envío de tokens usando Ethers.js](/developers/tutorials/send-token-ethersjs/) _– Una guía para principiantes sobre la transferencia de tokens ERC-20 usando Ethers.js._
- [Algunos trucos utilizados por tokens fraudulentos y cómo detectarlos](/developers/tutorials/scam-token-tricks/) _– Una exploración detallada de los patrones de tokens ERC-20 fraudulentos y cómo identificarlos._