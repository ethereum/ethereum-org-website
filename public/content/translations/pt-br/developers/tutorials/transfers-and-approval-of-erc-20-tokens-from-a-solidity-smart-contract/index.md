---
title: "Transferências e aprovação de tokens ERC-20 a partir de um contrato inteligente em Solidity"
description: "Crie um contrato inteligente de DEX que lida com transferências e aprovações de tokens ERC-20 usando Solidity."
author: "jdourlens"
tags: ["contratos inteligentes", "tokens", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "Transferências ERC-20"
lang: pt-br
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

No tutorial anterior, estudamos [a anatomia de um token ERC-20 em Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) na blockchain Ethereum. Neste artigo, veremos como podemos usar um contrato inteligente para interagir com um token usando a linguagem Solidity.

Para este contrato inteligente, criaremos uma exchange descentralizada (DEX) fictícia real onde um usuário pode trocar ether pelo nosso [token ERC-20](/developers/docs/standards/tokens/erc-20/) recém-implantado.

Para este tutorial, usaremos o código que escrevemos no tutorial anterior como base. Nossa DEX instanciará uma instância do contrato em seu construtor e executará as operações de:

- troca de tokens por ether
- troca de ether por tokens

Começaremos o código da nossa exchange descentralizada adicionando nossa base de código ERC-20 simples:

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
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Então agora temos nossa DEX e ela tem toda a reserva de tokens disponível. O contrato tem duas funções:

- `buy`: O usuário pode enviar ether e obter tokens em troca
- `sell`: O usuário pode decidir enviar tokens para receber ether de volta

## A função de compra {#the-buy-function}

Vamos codificar a função de compra. Primeiro, precisaremos verificar a quantidade de ether que a mensagem contém e verificar se o contrato possui tokens suficientes e se a mensagem tem algum ether nela. Se o contrato possuir tokens suficientes, ele enviará o número de tokens ao usuário e emitirá o evento `Bought`.

Observe que, se chamarmos a função de exigir (require) no caso de um erro, o ether enviado será diretamente revertido e devolvido ao usuário.

Para manter as coisas simples, apenas fazemos a troca de 1 token por 1 Wei.

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

No caso em que a compra for bem-sucedida, devemos ver dois eventos na transação: O evento `Transfer` do token e o evento `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## A função de venda {#the-sell-function}

A função responsável pela venda primeiro exigirá que o usuário tenha aprovado o valor chamando a função de aprovar (approve) de antemão. Aprovar a transferência exige que o token ERC20Basic instanciado pela DEX seja chamado pelo usuário. Isso pode ser alcançado chamando primeiro a função `token()` do contrato da DEX para recuperar o endereço onde a DEX implantou o contrato ERC20Basic chamado `token`. Em seguida, criamos uma instância desse contrato em nossa sessão e chamamos sua função `approve`. Depois, somos capazes de chamar a função `sell` da DEX e fazer a troca (swap) de nossos tokens de volta por ether. Por exemplo, é assim que isso se parece em uma sessão interativa do Brownie:

```python
#### Python no console interativo do Brownie...

# implantar a DEX
dex = DEX.deploy({'from':account1})

# chamar a função buy para a troca de ether por token
# 1e18 é 1 ether denominado em Wei
dex.buy({'from': account2, 1e18})

# obter o endereço de implantação do token ERC-20
# que foi implantado durante a criação do contrato da DEX
# dex.token() retorna o endereço implantado para o token
token = ERC20Basic.at(dex.token())

# chamar a função approve do token
# aprovar o endereço da DEX como gastador
# e quantos dos seus tokens ele tem permissão para gastar
token.approve(dex.address, 3e18, {'from':account2})

```

Então, quando a função de venda for chamada, verificaremos se a transferência do endereço do chamador para o endereço do contrato foi bem-sucedida e, em seguida, enviaremos os ethers de volta para o endereço do chamador.

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

Se tudo funcionar, você deverá ver 2 eventos (um `Transfer` e um `Sold`) na transação e seu saldo de tokens e saldo de ether atualizados.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

A partir deste tutorial, vimos como verificar o saldo e a permissão de um token ERC-20 e também como chamar `Transfer` e `TransferFrom` de um contrato inteligente ERC-20 usando a interface.

Depois de fazer uma transação, temos um tutorial em JavaScript para [aguardar e obter detalhes sobre as transações](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) que foram feitas para o seu contrato e um [tutorial para decodificar eventos gerados por transferências de tokens ou quaisquer outros eventos](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), desde que você tenha a ABI.

Aqui está o código completo do tutorial:

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