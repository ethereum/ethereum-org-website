---
title: Padrão de token ERC-20
description: Aprenda sobre o ERC-20, o padrão para tokens fungíveis no Ethereum que permite aplicativos de tokens interoperáveis.
lang: pt-br
---

## Introdução {#introduction}

**O que é um token?**

Os tokens podem representar virtualmente qualquer coisa no [Ethereum](/):

- pontos de reputação em uma plataforma online
- habilidades de um personagem em um jogo
- ativos financeiros como uma ação de uma empresa
- uma moeda fiduciária como o USD
- uma onça de ouro
- e muito mais...

Um recurso tão poderoso do Ethereum deve ser tratado por um padrão robusto, certo? É exatamente aí que o ERC-20 desempenha o seu papel! Esse padrão permite que os desenvolvedores criem aplicativos de token que são interoperáveis com outros produtos e serviços. O padrão ERC-20 também é usado para fornecer funcionalidades adicionais ao [ether](/glossary/#ether).

**O que é o ERC-20?**

O ERC-20 introduz um padrão para tokens fungíveis, em outras palavras, eles têm uma propriedade que faz com que cada token seja exatamente igual (em tipo e valor) a outro token. Por exemplo, um token ERC-20 age exatamente como o ETH, o que significa que 1 token é e sempre será igual a todos os outros tokens.

## Pré-requisitos {#prerequisites}

- [Contas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Padrões de token](/developers/docs/standards/tokens/)

## Corpo {#body}

O ERC-20 (Ethereum Request for Comments 20), proposto por Fabian Vogelsteller em novembro de 2015, é um padrão de token que implementa uma API para tokens dentro de contratos inteligentes.

Exemplos de funcionalidades que o ERC-20 fornece:

- transferir tokens de uma conta para outra
- obter o saldo atual de tokens de uma conta
- obter o fornecimento total do token disponível na rede
- aprovar se uma quantidade de token de uma conta pode ser gasta por uma conta de terceiros

Se um contrato inteligente implementar os seguintes métodos e eventos, ele pode ser chamado de contrato de token ERC-20 e, uma vez implantado, será responsável por rastrear os tokens criados no Ethereum.

Do [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

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

### Exemplos {#web3py-example}

Vamos ver como um padrão é tão importante para simplificar a inspeção de qualquer contrato de token ERC-20 no Ethereum.
Precisamos apenas da Interface Binária de Aplicativo (ABI) do contrato para criar uma interface para qualquer token ERC-20. Como você pode
ver abaixo, usaremos uma ABI simplificada, para torná-lo um exemplo de baixo atrito.

#### Exemplo com Web3.py {#web3py-example-2}

Primeiro, certifique-se de ter instalado a biblioteca Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Esta é uma Interface Binária de Aplicação (ABI) de contrato simplificada de um contrato de token ERC-20.
# Ela exporá apenas os métodos: balanceOf(address), decimals(), symbol() e totalSupply()
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

## Problemas conhecidos {#erc20-issues}

### Problema de recebimento de token ERC-20 {#reception-issue}

**Até 20/06/2024, pelo menos US$ 83.656.418 em tokens ERC-20 foram perdidos devido a esse problema. Observe que uma implementação pura do ERC-20 está propensa a esse problema, a menos que você implemente um conjunto de restrições adicionais além do padrão, conforme listado abaixo.**

Quando tokens ERC-20 são enviados para um contrato inteligente que não foi projetado para lidar com tokens ERC-20, esses tokens podem ser perdidos permanentemente. Isso acontece porque o contrato receptor não tem a funcionalidade de reconhecer ou responder aos tokens recebidos, e não há mecanismo no padrão ERC-20 para notificar o contrato receptor sobre os tokens recebidos. As principais formas como esse problema se manifesta são por meio de:

1.	Mecanismo de transferência de token
  - Os tokens ERC-20 são transferidos usando as funções transfer ou transferFrom
	-	Quando um usuário envia tokens para um endereço de contrato usando essas funções, os tokens são transferidos independentemente de o contrato receptor ter sido projetado para lidar com eles
2.	Falta de notificação
	-	O contrato receptor não recebe uma notificação ou retorno de chamada (callback) de que os tokens foram enviados a ele
	-	Se o contrato receptor não tiver um mecanismo para lidar com tokens (por exemplo, uma função de fallback ou uma função dedicada para gerenciar o recebimento de tokens), os tokens ficarão efetivamente presos no endereço do contrato
3.	Nenhum tratamento integrado
	-	O padrão ERC-20 não inclui uma função obrigatória para os contratos receptores implementarem, levando a uma situação em que muitos contratos são incapazes de gerenciar os tokens recebidos adequadamente

**Possíveis soluções**

Embora não seja possível evitar esse problema com o ERC-20 completamente, existem métodos que permitiriam reduzir significativamente a possibilidade de perda de tokens para o usuário final:

- O problema mais comum é quando um usuário envia tokens para o próprio endereço do contrato de token (por exemplo, USDT depositado no endereço do contrato de token USDT). Recomenda-se restringir a função `transfer(..)` para reverter tais tentativas de transferência. Considere adicionar a verificação `require(_to != address(this));` na implementação da função `transfer(..)`.
- A função `transfer(..)` em geral não foi projetada para depositar tokens em contratos. Em vez disso, o padrão `approve(..) & transferFrom(..)` é usado para depositar tokens ERC-20 em contratos. É possível restringir a função de transferência para não permitir o depósito de tokens em quaisquer contratos com ela, no entanto, isso pode quebrar a compatibilidade com contratos que assumem que os tokens podem ser depositados em contratos com a função `transfer(..)` (por exemplo, pools de liquidez do Uniswap).
- Sempre assuma que os tokens ERC-20 podem acabar no seu contrato, mesmo que o seu contrato não deva receber nenhum. Não há como evitar ou rejeitar depósitos acidentais no lado do destinatário. Recomenda-se implementar uma função que permita extrair tokens ERC-20 depositados acidentalmente.
- Considere usar padrões de token alternativos.

Alguns padrões alternativos surgiram desse problema, como o [ERC-223](/developers/docs/standards/tokens/erc-223) ou o [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Leitura adicional {#further-reading}

- [EIP-20: Padrão de token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementação do ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guia para tokens ERC-20 em Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Outros padrões de token fungível {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Cofres tokenizados](/developers/docs/standards/tokens/erc-4626)

## Tutoriais: Construa com ERC-20 no Ethereum {#tutorials}

- [Passo a passo do contrato ERC-20](/developers/tutorials/erc20-annotated-code/) _– Um passo a passo anotado linha por linha da implementação do contrato ERC-20 do OpenZeppelin._
- [ERC-20 com grades de segurança](/developers/tutorials/erc20-with-safety-rails/) _– Como adicionar salvaguardas aos tokens ERC-20 para ajudar os usuários a evitar erros comuns._
- [Enviando tokens usando ethers.js](/developers/tutorials/send-token-ethersjs/) _– Um guia para iniciantes sobre a transferência de tokens ERC-20 usando ethers.js._
- [Alguns truques usados por tokens fraudulentos e como detectá-los](/developers/tutorials/scam-token-tricks/) _– Uma exploração detalhada dos padrões de tokens ERC-20 fraudulentos e como identificá-los._