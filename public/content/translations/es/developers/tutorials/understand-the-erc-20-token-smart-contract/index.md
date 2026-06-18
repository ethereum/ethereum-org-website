---
title: Comprender el contrato inteligente del token ERC-20
description: Aprenda a implementar el estándar de token ERC-20 con un ejemplo completo de contrato inteligente en Solidity y su explicación.
author: "jdourlens"
tags: ["contratos inteligentes", "tokens", "solidity", "erc-20"]
skill: beginner
breadcrumb: Conceptos básicos del token ERC-20
lang: es
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Uno de los [estándares de contratos inteligentes](/developers/docs/standards/) más importantes en Ethereum se conoce como [ERC-20](/developers/docs/standards/tokens/erc-20/), el cual ha surgido como el estándar técnico utilizado para todos los contratos inteligentes en la cadena de bloques de Ethereum para implementaciones de tokens fungibles.

ERC-20 define una lista común de reglas a las que todos los tokens fungibles de Ethereum deben adherirse. En consecuencia, este estándar de token permite a los desarrolladores de todo tipo predecir con precisión cómo funcionarán los nuevos tokens dentro del sistema más amplio de Ethereum. Esto simplifica y facilita las tareas de los desarrolladores, ya que pueden continuar con su trabajo sabiendo que todos y cada uno de los nuevos proyectos no tendrán que rehacerse cada vez que se lance un nuevo token, siempre y cuando el token siga las reglas.

Aquí se presentan, a modo de interfaz, las funciones que debe implementar un ERC-20. Si no está seguro de qué es una interfaz: consulte nuestro artículo sobre [programación orientada a objetos (POO) en Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

A continuación, se ofrece una explicación línea por línea de para qué sirve cada función. Después de esto, presentaremos una implementación sencilla del token ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Devuelve la cantidad de tokens existentes. Esta función es un getter y no modifica el estado del contrato. Tenga en cuenta que no hay números de punto flotante (floats) en Solidity. Por lo tanto, la mayoría de los tokens adoptan 18 decimales y devolverán el suministro total y otros resultados de la siguiente manera: 1000000000000000000 para 1 token. No todos los tokens tienen 18 decimales y esto es algo a lo que realmente debe prestar atención cuando trabaje con tokens.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Devuelve la cantidad de tokens que posee una dirección (`account`). Esta función es un getter y no modifica el estado del contrato.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

El estándar ERC-20 permite que una dirección otorgue una asignación a otra dirección para que pueda retirar tokens de ella. Este getter devuelve el número restante de tokens que el `spender` tendrá permitido gastar en nombre del `owner`. Esta función es un getter, no modifica el estado del contrato y debería devolver 0 por defecto.

## Funciones {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Mueve la cantidad (`amount`) de tokens desde la dirección que llama a la función (`msg.sender`) a la dirección del destinatario. Esta función emite el evento `Transfer` definido más adelante. Devuelve true si la transferencia fue posible.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Establece la cantidad (`allowance`) que el `spender` tiene permitido transferir desde el saldo del que llama a la función (`msg.sender`). Esta función emite el evento Approval. La función devuelve si la asignación se estableció correctamente.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Mueve la cantidad (`amount`) de tokens de `sender` a `recipient` utilizando el mecanismo de asignación. Luego, la cantidad se deduce de la asignación del que llama. Esta función emite el evento `Transfer`.

## Eventos {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Este evento se emite cuando la cantidad de tokens (value) se envía desde la dirección `from` a la dirección `to`.

En el caso de la acuñación de nuevos tokens, la transferencia es generalmente `from` la dirección 0x00..0000, mientras que en el caso de quemar tokens, la transferencia es `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Este evento se emite cuando la cantidad de tokens (`value`) es aprobada por el `owner` para ser utilizada por el `spender`.

## Una implementación básica de tokens ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Aquí está el código más simple en el que basar su token ERC-20:

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

Otra excelente implementación del estándar de token ERC-20 es la [implementación ERC-20 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).