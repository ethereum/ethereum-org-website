---
title: Entender el contrato inteligente de token ERC
description: Una intoducción a publicar tu primer contrato inteligente en una red de prueba de Ethereum
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "tókenes"
  - "Solidity"
  - "erc-20"
skill: beginner
lang: es
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/aprenda-sobre-el-contrato-erc20tokens/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Uno de los [estándares de contrato inteligentes](/developers/docs/standards/) más significativos en Ethereum es conocido como [ERC-20](/developers/docs/standards/tokens/erc-20/), que se ha convertido en el estándar técnico utilizado para todos los contratos inteligentes en la cadena de bloques de Ethereum para implementaciones de tókenes fungibles.

ERC-20 define una lista común de reglas a las que deben adherirse todos los tókenes fungibles de Ethereum. En consecuencia, este estándar de token permite a todo tipo de desarrolladores, predecir con precisión, cómo funcionarán los nuevos tókenes dentro del sistema Ethereum en general. Esto simplifica y facilita las tareas de los desarrolladores, ya que estos pueden continuar con su trabajo, sabiendo que todos y cada uno de los nuevos proyectos no se tendrán que repetir, cada vez que se libere un nuevo token, siempre y cuando el token siga las reglas.

He aquí, a modo de interfaz, las funciones que un ERC debe implementar. Si no está seguro de lo que es una interfaz, consulte nuestro artículo sobre [programación OOP en Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Aquí encontrará una explicación detallada del propósito de cada función. Seguidamente, presentaremos una implementación simple del token ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Devuelve la cantidad de tókenes que existen. Esta función es un getter (capturador) y no modifica el estado del contrato. Tenga en cuenta que no hay valores decimales, solo enteros en Solidity. Por lo tanto, la mayoría de los tókenes adoptan 18 decimales y devolverán el suministro total y otros resultados a razón de 100000000000000 por token. No todos los tókenes tienen definidos 18 decimales y esto es algo que debe tener en cuenta al tratar con tókenes.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Devuelve la cantidad de tókenes pertenecientes a una dirección (`cuenta`). Esta función es un getter (capturador) y no modifica el estado del contrato.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

El estándar ERC-20 permite que una dirección dé una asignación a otra dirección para poder recuperar tókenes de ella. Este getter (capturador) devuelve el número restante de tókenes que el `spender` (gastador) podrá gastar en nombre del `owner` (propietario). Esta función es un getter (capturador) y no modifica el estado del contrato y debería devolver 0 por defecto.

## Funciones {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Mueve la `amount` (cantidad) de tókenes de la dirección de la persona que llama a la función (`msg.sender`) a la dirección del destinatario. Esta función emite el evento de `Transfer` definido más adelante. Ella devuelve verdadero si la transferencia fuera posible.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Establece la cantidad `permitida` que el `gastador` puede transferir desde la función de llamada -caller- (`msg.sender) balance`. Esta función emite el evento de aprobación. La función devuelve si el permiso se ha establecido correctamente.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Pasa la `cantidad` de tókenes de `remitente` al `destinatario` usando el mecanismo de autorización. La cantidad se deduce del total del solicitante. Esta función emite el evento `Transfer` (transferencia).

## Eventos {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Este evento se emite cuando se envía la cantidad de tókenes (valor) de la dirección `from ` a la dirección `to`.

En el caso de acuñar nuevos tókenes, la transferencia suele hacerse `from` la dirección 0x00..0000, mientras que en el caso de la grabación de tókenes la transferencia es a `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Este evento se emite cuando el `owner` (propietario) aprueba la cantidad de tókenes (`value` [valor]) que quiere utilizar el `spender` (gastador).

## Una implementación básica de los tókenes ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Este es el código más sencillo en el que puede basar su token ERC-20:

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

Otra implementación excelente del estándar de token ERC-20 es la implementación de [OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
