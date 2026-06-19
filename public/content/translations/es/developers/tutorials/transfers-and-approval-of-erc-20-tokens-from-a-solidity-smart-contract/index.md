---
title: "Transferencias y aprobación de tokens ERC-20 desde un contrato inteligente en Solidity"
description: Crea un contrato inteligente de DEX que maneje transferencias y aprobaciones de tokens ERC-20 usando Solidity.
author: "jdourlens"
tags: ["contratos inteligentes", "tokens", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: Transferencias ERC-20
lang: es
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En el tutorial anterior estudiamos [la anatomía de un token ERC-20 en Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) en la cadena de bloques de Ethereum. En este artículo veremos cómo podemos usar un contrato inteligente para interactuar con un token usando el lenguaje Solidity.

Para este contrato inteligente, crearemos un intercambio descentralizado (DEX) ficticio real donde un usuario puede intercambiar ether por nuestro [token ERC-20](/developers/docs/standards/tokens/erc-20/) recién desplegado.

Para este tutorial usaremos el código que escribimos en el tutorial anterior como base. Nuestro DEX instanciará una instancia del contrato en su constructor y realizará las operaciones de:

- intercambiar tokens por ether
- intercambiar ether por tokens

Comenzaremos el código de nuestro intercambio descentralizado añadiendo nuestra base de código simple ERC20:

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

Nuestro nuevo contrato inteligente de DEX desplegará el ERC-20 y obtendrá todo el suministro:

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

Así que ahora tenemos nuestro DEX y tiene toda la reserva de tokens disponible. El contrato tiene dos funciones:

- `buy`: El usuario puede enviar ether y obtener tokens a cambio
- `sell`: El usuario puede decidir enviar tokens para recuperar ether

## La función de compra {#the-buy-function}

Codifiquemos la función de compra. Primero necesitaremos comprobar la cantidad de ether que contiene el mensaje y verificar que el contrato posee suficientes tokens y que el mensaje tiene algo de ether. Si el contrato posee suficientes tokens, enviará la cantidad de tokens al usuario y emitirá el evento `Bought`.

Ten en cuenta que si llamamos a la función require en caso de error, el ether enviado se revertirá directamente y se devolverá al usuario.

Para mantener las cosas simples, solo intercambiamos 1 token por 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

En el caso de que la compra sea exitosa, deberíamos ver dos eventos en la transacción: el evento `Transfer` del token y el evento `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## La función de venta {#the-sell-function}

La función responsable de la venta primero requerirá que el usuario haya aprobado la cantidad llamando a la función approve de antemano. Aprobar la transferencia requiere que el usuario llame al token ERC20Basic instanciado por el DEX. Esto se puede lograr llamando primero a la función `token()` del contrato DEX para recuperar la dirección donde el DEX desplegó el contrato ERC20Basic llamado `token`. Luego creamos una instancia de ese contrato en nuestra sesión y llamamos a su función `approve`. Entonces podremos llamar a la función `sell` del DEX e intercambiar nuestros tokens de vuelta por ether. Por ejemplo, así es como se ve esto en una sesión interactiva de Brownie:

```python
#### Python en la consola interactiva de Brownie...

# desplegar el DEX
dex = DEX.deploy({'from':account1})

# llamar a la función buy para el intercambio de ether por token
# 1e18 es 1 ether denominado en Wei
dex.buy({'from': account2, 1e18})

# obtener la dirección de despliegue para el token ERC-20
# que fue desplegado durante la creación del contrato DEX
# dex.token() devuelve la dirección desplegada para el token
token = ERC20Basic.at(dex.token())

# llamar a la función approve del token
# aprobar la dirección del dex como gastador
# y cuántos de tus tokens se le permite gastar
token.approve(dex.address, 3e18, {'from':account2})

```

Luego, cuando se llama a la función de venta, comprobaremos si la transferencia desde la dirección de la persona que llama a la dirección del contrato fue exitosa y luego enviaremos los ethers de vuelta a la dirección de la persona que llama.

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

Si todo funciona, deberías ver 2 eventos (un `Transfer` y un `Sold`) en la transacción y tu saldo de tokens y saldo de ether actualizados.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

En este tutorial vimos cómo comprobar el saldo y la asignación de un token ERC-20 y también cómo llamar a `Transfer` y `TransferFrom` de un contrato inteligente ERC20 usando la interfaz.

Una vez que realices una transacción, tenemos un tutorial de JavaScript para [esperar y obtener detalles sobre las transacciones](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) que se hicieron a tu contrato y un [tutorial para decodificar eventos generados por transferencias de tokens o cualquier otro evento](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) siempre que tengas el ABI.

Aquí está el código completo del tutorial:

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