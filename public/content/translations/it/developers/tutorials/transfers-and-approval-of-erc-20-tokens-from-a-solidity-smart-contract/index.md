---
title: Trasferimenti e approvazione di token ERC-20 da un contratto intelligente in Solidity
description: Crea un contratto intelligente per un DEX che gestisce i trasferimenti e le approvazioni di token ERC-20 usando Solidity.
author: "jdourlens"
tags: ["contratti intelligenti", "token", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: Trasferimenti ERC-20
lang: it
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nel tutorial precedente abbiamo studiato [l'anatomia di un token ERC-20 in Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sulla blockchain di Ethereum. In questo articolo vedremo come possiamo usare un contratto intelligente per interagire con un token usando il linguaggio Solidity.

Per questo contratto intelligente, creeremo un vero e proprio exchange decentralizzato fittizio in cui un utente può scambiare ether per il nostro [token ERC-20](/developers/docs/standards/tokens/erc-20/) appena distribuito.

Per questo tutorial useremo come base il codice che abbiamo scritto nel tutorial precedente. Il nostro DEX istanzierà un'istanza del contratto nel suo costruttore ed eseguirà le operazioni di:

- scambio di token in ether
- scambio di ether in token

Inizieremo il codice del nostro exchange decentralizzato aggiungendo la nostra semplice base di codice ERC20:

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

Il nostro nuovo contratto intelligente del DEX distribuirà l'ERC-20 e otterrà tutta la fornitura:

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

Quindi ora abbiamo il nostro DEX e ha tutta la riserva di token disponibile. Il contratto ha due funzioni:

- `buy`: L'utente può inviare ether e ottenere token in cambio
- `sell`: L'utente può decidere di inviare token per riavere ether

## La funzione buy {#the-buy-function}

Codifichiamo la funzione buy. Per prima cosa dovremo controllare la quantità di ether che il messaggio contiene e verificare che il contratto possieda abbastanza token e che il messaggio contenga degli ether. Se il contratto possiede abbastanza token, invierà il numero di token all'utente ed emetterà l'evento `Bought`.

Nota che se chiamiamo la funzione require in caso di errore, gli ether inviati verranno direttamente annullati e restituiti all'utente.

Per mantenere le cose semplici, scambiamo semplicemente 1 token per 1 Wei.

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

Nel caso in cui l'acquisto vada a buon fine, dovremmo vedere due eventi nella transazione: l'evento `Transfer` del token e l'evento `Bought`.

![Due eventi nella transazione: Transfer e Bought](./transfer-and-bought-events.png)

## La funzione sell {#the-sell-function}

La funzione responsabile della vendita richiederà prima all'utente di aver approvato l'importo chiamando in anticipo la funzione approve. L'approvazione del trasferimento richiede che il token ERC20Basic istanziato dal DEX venga chiamato dall'utente. Questo può essere ottenuto chiamando prima la funzione `token()` del contratto del DEX per recuperare l'indirizzo in cui il DEX ha distribuito il contratto ERC20Basic chiamato `token`. Quindi creiamo un'istanza di quel contratto nella nostra sessione e chiamiamo la sua funzione `approve`. A questo punto siamo in grado di chiamare la funzione `sell` del DEX e scambiare nuovamente i nostri token per ether. Ad esempio, ecco come appare in una sessione interattiva di brownie:

```python
# ### Python nella console interattiva di brownie...

# distribuisci il DEX
dex = DEX.deploy({'from':account1})

# chiama la funzione buy per scambiare ether con token
# 1e18 è 1 ether denominato in wei
dex.buy({'from': account2, 1e18})

# ottieni l'indirizzo di distribuzione per il token ERC20
# che è stato distribuito durante la creazione del contratto DEX
# dex.token() restituisce l'indirizzo distribuito per il token
token = ERC20Basic.at(dex.token())

# chiama la funzione approve del token
# approva l'indirizzo del dex come spender
# e quanti dei tuoi token è autorizzato a spendere
token.approve(dex.address, 3e18, {'from':account2})

```

Quindi, quando viene chiamata la funzione sell, controlleremo se il trasferimento dall'indirizzo del chiamante all'indirizzo del contratto è andato a buon fine e poi invieremo gli Ether indietro all'indirizzo del chiamante.

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

Se tutto funziona dovresti vedere 2 eventi (un `Transfer` e un `Sold`) nella transazione e il tuo saldo dei token e il saldo degli ether aggiornati.

![Due eventi nella transazione: Transfer e Sold](./transfer-and-sold-events.png)

<Divider />

Da questo tutorial abbiamo visto come controllare il saldo e l'allowance di un token ERC-20 e anche come chiamare `Transfer` e `TransferFrom` di un contratto intelligente ERC20 usando l'interfaccia.

Una volta effettuata una transazione, abbiamo un tutorial in JavaScript per [attendere e ottenere i dettagli sulle transazioni](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) che sono state fatte al tuo contratto e un [tutorial per decodificare gli eventi generati dai trasferimenti di token o da qualsiasi altro evento](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) a patto di avere l'ABI.

Ecco il codice completo per il tutorial:

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