---
title: Entenda o contrato inteligente de token ERC-20
description: Aprenda a implementar o padrão de token ERC-20 com um exemplo e explicação completos do contrato inteligente Solidity.
author: "jdourlens"
tags: [ "smart contracts", "tokens", "solidez", "erc-20" ]
skill: beginner
lang: pt-br
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Um dos [padrões de contratos inteligentes](/developers/docs/standards/) mais significativos no Ethereum é conhecido como [ERC-20](/developers/docs/standards/tokens/erc-20/), que surgiu como o padrão técnico usado para todos os contratos inteligentes na blockchain do Ethereum para implementações de tokens fungíveis.

O ERC-20 define uma lista comum de regras às quais todos os tokens Ethereum fungíveis devem aderir. Consequentemente, este padrão de token capacita os desenvolvedores de todos os tipos a prever com precisão como os novos tokens funcionarão dentro do sistema Ethereum maior. Isso simplifica e facilita as tarefas dos desenvolvedores, pois eles podem prosseguir com seu trabalho, sabendo que cada novo projeto não precisará ser refeito toda vez que um novo token for lançado, desde que o token siga as regras.

Veja aqui, apresentadas como uma interface, as funções que um ERC-20 deve implementar. Se você não tem certeza do que é uma interface: confira nosso artigo sobre [programação OOP em Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Aqui está uma explicação linha por linha da finalidade de cada função. Depois disso, apresentaremos uma implementação simples de um token ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Retorna a quantidade de tokens em existência. Esta função é um getter e não modifica o estado do contrato. Lembre-se de que não existem floats em Solidity. Portanto, a maioria dos tokens adota 18 casas decimais e retornará o fornecimento total e outros resultados da seguinte forma: 1000000000000000000 para 1 token. Nem todo token tem 18 casas decimais e isso é algo a que você realmente precisa estar atento ao lidar com tokens.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Retorna a quantidade de tokens pertencentes a um endereço (`account`). Esta função é um getter e não modifica o estado do contrato.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

O padrão ERC-20 permite que um endereço dê uma permissão a outro endereço para poder retirar tokens dele. Este getter retorna o número restante de tokens que o `spender` terá permissão para gastar em nome do `owner`. Esta função é um getter, não modifica o estado do contrato e deve retornar 0 por padrão.

## Funções {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Move a quantidade (`amount`) de tokens do endereço do chamador da função (`msg.sender`) para o endereço do destinatário. Esta função emite o evento `Transfer` definido mais adiante. Retorna verdadeiro se a transferência foi possível.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Define o valor da `allowance` que o `spender` tem permissão para transferir do saldo do chamador da função (`msg.sender`). Esta função emite o evento `Approval`. A função retorna se a permissão foi definida com sucesso.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Move a quantidade (`amount`) de tokens de `sender` para `recipient` usando o mecanismo de permissão (allowance). A `amount` (quantia) é então deduzida da permissão (allowance) do chamador. Esta função emite o evento `Transfer`.

## Eventos {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Este evento é emitido quando a quantidade de tokens (value) é enviada do endereço `from` para o endereço `to`.

No caso de cunhagem de novos tokens, a transferência é geralmente `from` o endereço 0x00..0000, enquanto no caso de queima de tokens a transferência é `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Este evento é emitido quando a quantidade de tokens (`value`) é aprovada pelo `owner` para ser usada pelo `spender`.

## Uma implementação básica de tokens ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Aqui está o código mais simples para servir de base para o seu token ERC-20:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

Outra excelente implementação do padrão de token ERC-20 é a [implementação ERC-20 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
