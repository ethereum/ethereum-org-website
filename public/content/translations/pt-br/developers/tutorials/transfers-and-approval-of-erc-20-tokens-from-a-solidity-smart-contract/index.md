---
title: Transferências e aprovação de tokens ERC-20 de um contrato inteligente Solidity
description: Crie um contrato inteligente de DEX que lida com transferências e aprovações de tokens ERC-20 usando Solidity.
author: "jdourlens"
tags: [ "smart contracts", "tokens", "solidez", "erc-20" ]
skill: intermediate
lang: pt-br
published: 07/04/2020
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

No tutorial anterior, estudamos [a anatomia de um token ERC-20 em Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) na blockchain da Ethereum. Neste artigo, veremos como podemos usar um contrato inteligente para interagir com um token usando a linguagem Solidity.

Para este contrato inteligente, criaremos uma exchange descentralizada de exemplo, onde um usuário pode trocar ether por nosso [token ERC-20](/developers/docs/standards/tokens/erc-20/) recém-implantado.

Para este tutorial, usaremos o código que escrevemos no tutorial anterior como base. Nossa DEX instanciará uma instância do contrato em seu construtor e realizará as operações de:

- troca de tokens por ether
- troca de ether por tokens

Começaremos o código da nossa exchange descentralizada adicionando nossa base de código simples do ERC20:

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

Nosso novo contrato inteligente de DEX implantará o ERC-20 e obterá todo o suprimento:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // A FAZER
    }

    function sell(uint256 amount) public {
        // A FAZER
    }

}
```

Então, agora temos nossa DEX e ela tem toda a reserva de tokens disponível. O contrato tem duas funções:

- `buy`: O usuário pode enviar ether e obter tokens em troca
- `sell`: o usuário pode decidir enviar tokens para recuperar o ether

## A função buy {#the-buy-function}

Vamos programar a função de compra. Primeiro, precisaremos verificar a quantidade de ether que a mensagem contém e verificar se o contrato possui tokens suficientes e se a mensagem tem algum ether. Se o contrato possuir tokens suficientes, ele enviará o número de tokens ao usuário e emitirá o evento `Bought`.

Observe que, se chamarmos a função `require` em caso de erro, o ether enviado será diretamente revertido e devolvido ao usuário.

Para simplificar, apenas trocamos 1 token por 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Você precisa enviar algum ether");
    require(amountTobuy <= dexBalance, "Não há tokens suficientes na reserva");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Caso a compra seja bem-sucedida, devemos ver dois eventos na transação: o evento `Transfer` do token e o evento `Bought`.

![Dois eventos na transação: Transferência e Compra](./transfer-and-bought-events.png)

## A função sell {#the-sell-function}

A função responsável pela venda exigirá primeiro que o usuário tenha aprovado o valor, chamando a função `approve` antecipadamente. Aprovar a transferência requer que o token ERC20Basic instanciado pela DEX seja chamado pelo usuário. Isso pode ser alcançado chamando primeiro a função `token()` do contrato da DEX para recuperar o endereço onde a DEX implantou o contrato ERC20Basic chamado `token`. Em seguida, criamos uma instância desse contrato em nossa sessão e chamamos sua função `approve`. Então, podemos chamar a função `sell` da DEX e trocar nossos tokens de volta por ether. Por exemplo, é assim que isso aparece em uma sessão interativa do brownie:

```python
#### Python no console interativo do brownie...

# implante a DEX
dex = DEX.deploy({'from':account1})

# chame a função de compra para trocar ether por token
# 1e18 é 1 ether, em wei
dex.buy({'from': account2, 1e18})

# obtenha o endereço de implantação do token ERC20
# que foi implantado durante a criação do contrato DEX
# dex.token() retorna o endereço implantado para o token
token = ERC20Basic.at(dex.token())

# chame a função approve do token
# aprove o endereço da DEX como gastador
# e quantos dos seus tokens ele pode gastar
token.approve(dex.address, 3e18, {'from':account2})

```

Então, quando a função `sell` é chamada, verificamos se a transferência do endereço do chamador para o endereço do contrato foi bem-sucedida e, em seguida, enviamos os Ethers de volta para o endereço do chamador.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Você precisa vender pelo menos alguns tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Verifique a permissão do token");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Se tudo funcionar, você deverá ver 2 eventos (um `Transfer` e um `Sold`) na transação e seus saldos de token e ether atualizados.

![Dois eventos na transação: Transferência e Venda](./transfer-and-sold-events.png)

<Divider />

Neste tutorial, vimos como verificar o saldo e a permissão (`allowance`) de um token ERC-20, e também como chamar `Transfer` e `TransferFrom` de um contrato inteligente ERC20 usando a interface.

Assim que você faz uma transação, temos um tutorial de JavaScript para [aguardar e obter detalhes sobre as transações](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) que foram feitas para o seu contrato e um [tutorial para decodificar eventos gerados por transferências de tokens ou quaisquer outros eventos](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), contanto que você tenha a IAB.

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
        require(amountTobuy > 0, "Você precisa enviar algum ether");
        require(amountTobuy <= dexBalance, "Não há tokens suficientes na reserva");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Você precisa vender pelo menos alguns tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Verifique a permissão do token");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
