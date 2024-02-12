---
title: Transferencias y aprobación de tókenes ERC-20 desde un contrato inteligente en Solidity
description: Cómo usar un contrato inteligente para interactuar con un token a través del lenguaje Solidity.
author: "jdourlens"
tags:
  - "smart contracts"
  - "tókenes"
  - "solidity"
  - "Empezar"
  - "erc-20"
skill: intermediate
lang: es
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En el tutorial anterior, se estudió [la anatomía de un token ERC-20 en Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sobre la cadena de bloques de Ethereum. En este artículo veremos cómo usar un contrato inteligente para la interacción con un token, usando el lenguaje de programación Solidity.

Para el contrato inteligente, se crea un intercambio descentralizado de prueba en donde un usuario puede operar con Ethereum en el recién implementado [token ERC](/developers/docs/standards/tokens/erc-20/).

Para este tutorial usaremos el código que escribimos en el tutorial anterior como punto de partida. El DEX representará una instancia del contrato en su constructor y perfeccionará las operaciones de:

- intercambio de tókenes por ether
- intercambio de ether por tókenes

Iniciaremos nuestro código de intercambio descentralizado añadiendo un código ERC20 sencillo:

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
        allowed[owner][msg.sender] = allowed[owner][msg.sender]+numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

El nuevo contrato inteligente de DEX desplegará el ERC-20 y obtendrá todo el suministro:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Entonces, ahora tenemos nuestro (intercambio descentralizado) y tiene toda la reserva de tókenes disponible. El contrato tiene dos funciones:

- `buy` (comprar): el usuario puede enviar ether y obtener tókenes a cambio.
- `sell` (vender): el usuario puede optar por enviar tókenes para recuperar el ether.

## La función comprar {#the-buy-function}

Codifiquemos la función comprar. Primero se tiene que comprobar la cantidad de ether que contiene el mensaje y verificar que los contratos poseen suficientes tókenes y que el mensaje contiene algún ether. Si el contrato posee suficientes tókenes, enviará el número de tókenes al usuario y emitirá el evento `Bought` (comprado).

Hay que tener en cuenta que si se ejecuta la función requerida en caso de error, el ether enviado rebotará y será devuelto directamente al usuario.

Para simplificar las cosas, intercambiamos un token por un Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token. alanceOf(address(this));
    require(amountTobuy > 0, "Usted necesita enviar algún ether");
    require(amountTobuy <= dexBalance, "No hay suficientes fichas en la reserva");
    ficha. ransfer(msg.sender, amountTobuy);
    emitir Bought(amountTobuy);
}
```

En el caso de que la compra sea exitosa, se deberían ver dos eventos en la transacción: el token `Transfer` (transferencia) y el evento `Bought` (comprado).

![Dos eventos en la transacción: transferencia y comprado](./transfer-and-bought-events.png)

## La función vender {#the-sell-function}

La función responsable de la venta requerirá, primero, que el usuario haya aprobado la cantidad llamando a la función de aprobación de antemano. La aprobación de la transferencia requiere que el usuario ejecute el token básico ERC20 instanciado por el DEX. Esto se puede lograr ejecutando primero la función `token()` del contrato DEX para recuperar la dirección donde DEX desplegó el contrato ERC20Basic llamado `token`. Luego creamos una instancia de este contrato en nuestra sesión y ejecutamos su función de `approve`. Una vez realizado esto, podemos lanzar la función `sell` de DEX e intercambiar nuestros tókenes por ether. Por ejemplo, este es el aspecto que tiene una sesión de brownie interactiva:

```python
#### Python in interactive brownie console...

# deploy the DEX
dex = DEX.deploy({'from':account1})

# call the buy function to swap ether for token
# 1e18 is 1 ether denominated in wei
dex.buy({'from': account2, 1e18})

# get the deployment address for the ERC20 token
# that was deployed during DEX contract creation
# dex.token() returns the deployed address for token
token = ERC20Basic.at(dex.token())

# call the token's approve function
# approve the dex address as spender
# and how many of your tokens it is allowed to spend
token.approve(dex.address, 3e18, {'from':account2})

```

Al ejecutar la sesión de venta (sell), comprobamos que la transferencia desde la dirección del solicitante a la dirección del contrato se ha realizado con éxito y devolvemos los ethers a la dirección del solicitante.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Si todo funciona correctamente, se deberían ver 2 eventos ( `Transfer` [transferencia] y `Sold` [vendido]) en la transacción y el saldo de tókenes y balance de Ethereum actualizados.

![Dos eventos en la transacción: transferencia y vender](./transfer-and-sold-events.png)

<Divider />

Desde este tutorial se ha visto cómo comprobar el saldo y la autorización de un token ERC, y también cómo ejecutar `Transfer` y `TransferFrom` de un contrato inteligente ERC20 usando la interfaz.

Una vez realizada esta transacción, tenemos un tutorial de JavaScript para [esperar y obtener los detalles de las transacciones](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) que se han hecho a su contrato y un [tutorial para descodificar los eventos generados por las transferencias de tókenes o cualquier otro evento](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) siempre y cuando tenga la ABI.

He aquí el código completo para el tutorial:

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
        allowed[owner][msg.sender] = allowed[owner][msg.sender]+numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
