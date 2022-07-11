---
title: Trasferimento e approvazione di token ERC-20 da uno Smart Contract Solidity
description: Come usare uno Smart Contract per interagire con un token utilizzando il linguaggio Solidity
author: "jdourlens"
tags:
  - "Smart Contract"
  - "token"
  - "Solidity"
  - "primi passi"
  - "erc-20"
skill: intermediate
lang: it
sidebar: true
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nel precedente tutorial abbiamo studiato [l'anatomia di un token ERC-20 in Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sulla blockchain Ethereum. In questo articolo vedremo come usare uno Smart Contract per interagire con un token usando il linguaggio Solidity.

Per questo Smart Contract creeremo uno scambio decentralizzato molto semplice dove un utente può scambiare Ethereum con il nostro [token ERC-20](/developers/docs/standards/tokens/erc-20/) appena distribuito.

Per questo tutorial useremo come base di partenza il codice che abbiamo scritto in precedenza. Il nostro DEX creerà un'istanza del contratto nel suo costruttore ed eseguirà le operazioni di:

- scambio di token in ether
- scambio di ether in token

Inizieremo a scrivere il codice del nostro scambio decentralizzato aggiungendo una semplice base di codice ERC20:

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


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 100 ether;

    using SafeMath for uint256;

   constructor(uint256 total) public {
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
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
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

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
```

Il nostro nuovo Smart Contract DEX distribuirà ERC-20 e riceverà tutta la disponibilità:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() public {
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

Quindi ora abbiamo il nostro DEX con tutta la riserva di token disponibile. Il contratto ha due funzioni:

- `buy`: l'utente può inviare ether e ricevere token in cambio
- `sell`: l'utente può decidere di inviare token per ottenere ether

## La funzione buy {#the-buy-function}

Scriviamo la funzione buy. Prima di tutto dovremo controllare l'ammontare di ether che il messaggio contiene e verificare che i contratti abbiano abbastanza token e che il messaggio abbia alcuni ether al suo interno. Se il contratto ha abbastanza token, invierà il numero dei token all'utente ed emetterà l'evento `Bought`.

Nota: se chiamiamo la funzione require, in caso di errore l'ether inviato sarà ripristinato direttamente e restituito all'utente.

Per semplificare le cose, scambiamo 1 token per 1 ether.

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

Se l'acquisto va a buon fine, dovremmo vedere due eventi nella transazione: l'evento `Transfer` per il token e `Bought`.

![Due eventi nella transazione: Transfer e Bought](./transfer-and-bought-events.png)

## La funzione sell {#the-sell-function}

La funzione responsabile della vendita implica che l'utente abbia prima approvato l'importo chiamando la funzione approve. Poi, quando viene chiamata la funzione sell, controlliamo se il trasferimento dall'indirizzo del chiamante a quello del contratto è riuscito e restituiamo gli ether all'indirizzo del chiamante.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    msg.sender.transfer(amount);
    emit Sold(amount);
}
```

Se tutto funziona come previsto, dovresti vedere 2 eventi (`Transfer` e `Sold`) nella transazione e il saldo di token e di Ethereum verrà aggiornato.

![Due eventi nella transazione: Transfer e Sold](./transfer-and-sold-events.png)

<Divider />

In questo tutorial abbiamo visto come controllare il saldo e la disponibilità di un token ERC-20 e come chiamare `Transfer` e `TransferFrom` di uno Smart Contract ERC20 usando l'interfaccia.

Una volta creata una transazione, abbiamo un tutorial JavaScript per [attendere e ottenere dettagli sulle transazioni](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) eseguite sul contratto e un [tutorial per decodificare gli eventi generati dai trasferimenti di token o da altri tipi di eventi](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) se si è in possesso dell'ABI.

Ecco il codice completo del tutorial:

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


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;

    using SafeMath for uint256;

   constructor() public {
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
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
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

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}

contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() public {
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
        msg.sender.transfer(amount);
        emit Sold(amount);
    }

}
```
