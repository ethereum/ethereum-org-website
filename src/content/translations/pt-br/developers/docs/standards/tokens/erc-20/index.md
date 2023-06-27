---
title: Padrão de token ERC-20
description: Token
lang: pt-br
---

## Introdução {#introduction}

**O que é um token?**

Um token podem representar praticamente qualquer coisa em Ethereum:

- pontos de reputação em uma plataforma online
- habilidades de um personagem em um jogo
- bilhetes de loteria
- ativos financeiros, como a ação em uma empresa
- uma moeda fiduciária, como USD
- 28,3 gr de ouro
- e mais...

Uma característica tão poderosa do Ethereum deve ser tratada por um padrão robusto, certo? É aí que o ERC-20 entra! Este padrão permite que desenvolvedores criem aplicativos de token que são interoperáveis com outros produtos e serviços.

**O que é ERC-20?**

O ERC-20 introduz um padrão para os tokens fungíveis, ou seja, eles têm uma propriedade que faz com que cada token tenha exatamente o mesmo de outro token (em termos de tipo e valor). Por exemplo, um token ERC-20 age como o ETH, significando que 1 token é e será sempre igual a todos os outros tokens.

## Pré-requisitos {#prerequisites}

- [Contas](/developers/docs/accounts)
- [Contratos Inteligentes](/developers/docs/smart-contracts/)
- [Padrões de token](/developers/docs/standards/tokens/)

## Apresentação {#body}

O ERC-20 (Ethereum Request for Comments 20), proposto por Fabian Vogelsteller em novembro de 2015, é um padrão de token que implementa uma API para tokens em contratos inteligentes.

Exemplo de funcionalidades que o ERC-20 fornece:

- transferir tokens de uma conta a outra
- obter o saldo atual de tokens de uma conta
- obter a oferta total do token disponível na rede
- aprovar se uma quantidade de token de uma conta pode ser gasta por uma conta de terceiros

Se um contrato inteligente implementa os métodos e eventos a seguir, ele pode ser chamado de Contrato de token ERC-20 e, uma vez implantado, é responsável por fazer um acompanhamento dos tokens criados no Ethereum.

De [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

#### Métodos {#methods}

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

#### Eventos {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Exemplos {#web3py-example}

Vejamos por que um padrão é importante e como ele simplifica o controle de qualquer contrato de token ERC-20 no Ethereum. Só precisamos da Interface Binária de Aplicativos (ABI, pela sigla em inglês) do contrato para criar uma interface com qualquer token ERC-20. Como você pode ver abaixo, usaremos uma ABI simplificada, para torná-la um exemplo de fácil compreensão.

#### Exemplo para a Web3.py {#web3py-example}

Primeiro, certifique-se de que você instalou a biblioteca [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) do Python:

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

## Leitura adicional {#further-reading}

- [EIP-20: Padrão de token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin: Implementação ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy — Guia para os Tokens ERC20 do Solidity](https://www.alchemy.com/overviews/erc20-solidity)
