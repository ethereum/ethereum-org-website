---
title: Trasferimento e approvazione di token ERC-20 da uno smart contract Solidity
description: Crea un contratto intelligente DEX che gestisce i trasferimenti e le approvazioni di token ERC-20 usando Solidity.
author: "jdourlens"
tags: [ "smart contract", "token", "Solidity", "erc-20" ]
skill: intermediate
lang: it
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nel precedente tutorial abbiamo studiato [l'anatomia di un token ERC-20 in Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sulla blockchain di Ethereum. In questo articolo vedremo come usare un contratto intelligente per interagire con un token usando il linguaggio Solidity.

Per questo contratto intelligente, creeremo una semplicissima piattaforma di scambio decentralizzata, in cui un utente può scambiare ether con il nostro [token ERC-20](/developers/docs/standards/tokens/erc-20/) appena distribuito.

Per questa guida useremo come base di partenza il codice che abbiamo scritto nella guida precedente. Il nostro DEX creerà un'istanza del contratto nel suo costruttore ed eseguirà le operazioni di:

- scambio di token in ether
- scambio di ether in token

Inizieremo a scrivere il codice della nostra piattaforma di scambio decentralizzata aggiungendo la nostra semplice base di codice ERC20:

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

Il nostro nuovo contratto intelligente DEX distribuirà l'ERC-20 e riceverà tutta la fornitura:

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

Quindi ora abbiamo il nostro DEX con tutta la riserva di token disponibile. Il contratto ha due funzioni:

- `buy`: l'utente può inviare ether e ricevere token in cambio
- `sell`: l'utente può decidere di inviare token per riavere indietro ether

## La funzione buy {#the-buy-function}

Scriviamo il codice per la funzione buy. Per prima cosa, dovremo controllare l'importo di ether che il messaggio contiene e verificare che il contratto possieda abbastanza token e che il messaggio contenga ether. Se il contratto possiede abbastanza token, invierà il numero di token all'utente ed emetterà l'evento `Bought`.

Nota che se chiamiamo la funzione `require`, in caso di errore la transazione verrà annullata e l'ether inviato sarà restituito direttamente all'utente.

Per semplificare le cose, scambiamo 1 token per 1 wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "È necessario inviare degli ether");
    require(amountTobuy <= dexBalance, "Token non sufficienti nella riserva");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Nel caso in cui l'acquisto vada a buon fine, dovremmo vedere due eventi nella transazione: l'evento `Transfer` del token e l'evento `Bought`.

![Due eventi nella transazione: Transfer e Bought](./transfer-and-bought-events.png)

## La funzione sell {#the-sell-function}

La funzione responsabile della vendita richiederà che l'utente abbia approvato l'importo in anticipo, chiamando la funzione `approve`. Per approvare il trasferimento occorre che il token ERC20Basic istanziato dal DEX sia chiamato dall'utente. Ciò può essere ottenuto chiamando prima la funzione `token()` del contratto DEX per recuperare l'indirizzo in cui il DEX ha distribuito il contratto ERC20Basic chiamato `token`. Creiamo quindi un'istanza di quel contratto nella nostra sessione e chiamiamo la sua funzione `approve`. Siamo quindi in grado di chiamare la funzione `sell` del DEX e scambiare nuovamente i nostri token con ether. Ad esempio, ecco come appare in una sessione interattiva di Brownie:

```python
#### Python nella console interattiva di brownie...

# distribuisci il DEX
dex = DEX.deploy({'from':account1})

# chiama la funzione buy per scambiare ether per token
# 1e18 è 1 ether denominato in wei
dex.buy({'from': account2, 1e18})

# ottieni l'indirizzo di distribuzione per il token ERC20
# che è stato distribuito durante la creazione del contratto DEX
# dex.token() restituisce l'indirizzo distribuito per il token
token = ERC20Basic.at(dex.token())

# chiama la funzione approve del token
# approva l'indirizzo dex come spender
# e quanti dei tuoi token gli è consentito di spendere
token.approve(dex.address, 3e18, {'from':account2})

```

Poi, quando viene chiamata la funzione sell, controlliamo se il trasferimento dall'indirizzo del chiamante a quello del contratto è riuscito e restituiamo gli ether all'indirizzo del chiamante.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Devi vendere almeno qualche token");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Verifica l'allowance del token");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Se tutto funziona, dovresti vedere 2 eventi (un `Transfer` e `Sold`) nella transazione e i saldi dei token e degli ether aggiornati.

![Due eventi nella transazione: Transfer e Sold](./transfer-and-sold-events.png)

<Divider />

In questa guida abbiamo visto come controllare il saldo e l'allowance di un token ERC-20 e anche come chiamare `Transfer` e `TransferFrom` di un contratto intelligente ERC20 usando l'interfaccia.

Una volta effettuata una transazione, abbiamo una [guida JavaScript per attendere e ottenere i dettagli sulle transazioni](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) effettuate sul tuo contratto e una [guida per decodificare gli eventi generati dai trasferimenti di token o da qualsiasi altro evento](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), purché si disponga dell'ABI.

Ecco il codice completo per la guida:

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
        require(amountTobuy > 0, "È necessario inviare degli ether");
        require(amountTobuy <= dexBalance, "Token non sufficienti nella riserva");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Devi vendere almeno qualche token");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Verifica l'allowance del token");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
