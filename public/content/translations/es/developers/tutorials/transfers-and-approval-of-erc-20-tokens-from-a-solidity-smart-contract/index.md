---
title: "Transferencias y aprobación de tokens ERC-20 desde un contrato inteligente de Solidity"
description: Cree un contrato inteligente DEX que gestione las transferencias y aprobaciones de tokens ERC-20 utilizando Solidity.
author: "jdourlens"
tags:
  [
    "contratos Inteligentes",
    "tókenes",
    "Solidity",
    "erc-20"
  ]
skill: intermediate
lang: es
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En el tutorial anterior estudiamos [la anatomía de un token ERC-20 en Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) en la cadena de bloques de Ethereum. En este artículo veremos cómo podemos usar un contrato inteligente para interactuar con un token usando el lenguaje Solidity.

Para este contrato inteligente, crearemos un intercambio descentralizado de prueba en el que un usuario puede intercambiar ether por nuestro token [ERC-20](/developers/docs/standards/tokens/erc-20/) recién implementado.

Para este tutorial, usaremos como base el código que escribimos en el tutorial anterior. Nuestro DEX instanciará una instancia del contrato en su constructor y realizará las siguientes operaciones:

- intercambio de tokens por ether
- intercambio de ether por tokens

Comenzaremos el código de nuestro intercambio descentralizado añadiendo nuestro código base simple de ERC20:

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

Nuestro nuevo contrato inteligente DEX implementará el ERC-20 y obtendrá todo el suministro:

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

- `buy`: el usuario puede enviar ether y obtener tokens a cambio.
- `sell`: el usuario puede decidir enviar tokens para recuperar ether.

## La función de compra {#the-buy-function}

Vamos a programar la función `buy`. Primero, tendremos que comprobar la cantidad de ether que contiene el mensaje y verificar que el contrato posea suficientes tokens y que el mensaje tenga algo de ether. Si el contrato posee suficientes tokens, enviará la cantidad de tokens al usuario y emitirá el evento `Bought`.

Tenga en cuenta que si llamamos a la función `require` en caso de error, el ether enviado se revertirá directamente y se devolverá al usuario.

Para simplificar, solo intercambiamos 1 token por 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Necesita enviar algo de ether");
    require(amountTobuy <= dexBalance, "No hay suficientes tokens en la reserva");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Si la compra es exitosa, deberíamos ver dos eventos en la transacción: el evento `Transfer` del token y el evento `Bought`.

![Dos eventos en la transacción: Transfer y Bought](./transfer-and-bought-events.png)

## La función de venta {#the-sell-function}

La función responsable de la venta requerirá primero que el usuario haya aprobado la cantidad llamando previamente a la función `approve`. La aprobación de la transferencia requiere que el usuario llame al token ERC20Basic instanciado por el DEX. Esto se puede lograr llamando primero a la función `token()` del contrato DEX para recuperar la dirección donde el DEX implementó el contrato ERC20Basic llamado `token`. A continuación, creamos una instancia de ese contrato en nuestra sesión y llamamos a su función `approve`. Entonces podremos llamar a la función `sell` del DEX e intercambiar nuestros tokens de vuelta por ether. Por ejemplo, así es como se ve en una sesión interactiva de Brownie:

```python
#### Python en la consola interactiva de Brownie...

# implementar el DEX
dex = DEX.deploy({'from':account1})

# llamar a la función de compra para intercambiar ether por token
# 1e18 es 1 ether denominado en wei
dex.buy({'from': account2, 1e18})

# obtener la dirección de implementación para el token ERC20
# que se implementó durante la creación del contrato DEX
# dex.token() devuelve la dirección implementada para el token
token = ERC20Basic.at(dex.token())

# llamar a la función de aprobación del token
# aprobar la dirección dex como gastador
# y cuántos de sus tokens se le permite gastar
token.approve(dex.address, 3e18, {'from':account2})

```

Luego, cuando se llama a la función `sell`, comprobaremos si la transferencia desde la dirección de la persona que llama a la dirección del contrato fue exitosa y después enviaremos los ether de vuelta a la dirección de la persona que llama.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Necesita vender al menos algunos tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Compruebe la asignación de tokens");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Si todo funciona, debería ver 2 eventos (un `Transfer` y un `Sold`) en la transacción, y el saldo de sus tokens y de ether actualizados.

![Dos eventos en la transacción: Transfer y Sold](./transfer-and-sold-events.png)

<Divider />

En este tutorial vimos cómo comprobar el saldo y la asignación de un token ERC-20 y también cómo llamar a `Transfer` y `TransferFrom` de un contrato inteligente ERC20 utilizando la interfaz.

Una vez que realice una transacción, tenemos un tutorial de JavaScript para [esperar y obtener detalles sobre las transacciones](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) que se hicieron a su contrato y un [tutorial para decodificar los eventos generados por las transferencias de tokens o cualquier otro evento](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) siempre que tenga la ABI.

Aquí está el código completo para el tutorial:

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
        require(amountTobuy > 0, "Necesita enviar algo de ether");
        require(amountTobuy <= dexBalance, "No hay suficientes tokens en la reserva");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Necesita vender al menos algunos tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Compruebe la asignación de tokens");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
