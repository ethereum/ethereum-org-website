---
title: Transferências e aprovação de tokens ERC-20 de um contrato inteligente Solidity
description: Como usar um contrato inteligente para interagir com um token usando a linguagem Solidity
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "tokens"
  - "solidity"
  - "introdução"
  - "erc-20"
skill: intermediate
lang: pt-br
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

No tutorial anterior, estudamos [a estrutura de um token ERC-20 no Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/)usado na blockchain Ethereum. Nesse artigo, veremos como usar um contrato inteligente para interagir com um token usando a linguagem Solidity.

Para esse contrato inteligente, vamos criar uma troca descentralizada realmente robusta na qual o usuário pode negociar o Ethereum com o nosso recém-implantado [token ERC-20](/developers/docs/standards/tokens/erc-20/).

Para este tutorial, usaremos o código que escrevemos no tutorial anterior como uma base. Nosso DEX instanciará um contrato em seu construtor e realizará as operações de:

- trocando tokens por ether
- trocando ether por tokens

Iniciaremos nosso código de intercâmbio descentralizado adicionando a nossa simples base de código ERC20:

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

Nosso novo contrato inteligente DEX implantará o ERC-20 e obter todos os fornecidos:

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

Agora temos nosso DEX, que tem seu próprio token reserva disponível. O contrato tem duas funções:

- `buy`: o usuário pode enviar ether e obter tokens em troca
- `sell`: o usuário pode decidir enviar tokens para recuperar ether

## A função de compra {#the-buy-function}

Vamos programar a função de compra. Primeiro, precisaremos verificar a quantidade de ether que a mensagem contém e verificar se os contratos possuem tokens suficientes e se a mensagem tem algum ether. Se o contrato possui tokens suficientes, enviará o número de tokens para o usuário e emitirá o evento `Bought`.

Observe que, se chamarmos a função `require` em caso de um erro, o ether enviado será diretamente revertido e retornado para o usuário.

To keep things simple, we just exchange 1 token for 1 Wei.

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

No caso de a compra ser bem-sucedida, devemos ver dois eventos na transação: o token `Transfer` e o evento `Bought`.

![Dois eventos na transação: transferência e compra](./transfer-and-bought-events.png)

## A função de venda {#the-sell-function}

A função responsável pela venda primeiro exigirá que o usuário tenha aprovado o valor, chamando a função approve antecipadamente. Approving the transfer requires the ERC20Basic token instantiated by the DEX to be called by the user. This can be achieved by first calling the DEX contract's `token()` function to retrieve the address where DEX deployed the ERC20Basic contract called `token`. Then we create an instance of that contract in our session and call its `approve` function. Then we are able to call the DEX's `sell` function and swap our tokens back for ether. For example, this is how this looks in an interactive brownie session:

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

Então quando a função `sell` é chamada, verificamos se a transferência do endereço do remetente para o endereço do contrato foi bem-sucedida e depois enviamos os Ethers para o endereço de chamada.

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

Se tudo funcionar, você deve ver 2 eventos (um `Transfer` e `Sold`) na transação, e o seu saldo de token e saldo de Ethereum atualizados.

![Dois eventos na transação: transferência e venda](./transfer-and-sold-events.png)

<Divider />

Neste tutorial, vimos como verificar o saldo e a dedução de um token ERC-20 e também como chamar a `Transfer` e `TransferFrom` de um contrato inteligente ERC20 usando a interface.

Once you make a transaction we have a JavaScript tutorial to [wait and get details about the transactions](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) that were made to your contract and a [tutorial to decode events generated by token transfers or any other events](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) as long as you have the ABI.

Aqui está o código completo para o tutorial:

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
