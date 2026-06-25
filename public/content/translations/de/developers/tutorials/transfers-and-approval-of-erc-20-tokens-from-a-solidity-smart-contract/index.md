---
title: Transfers und Genehmigung von ERC-20-Token aus einem Solidity-Smart-Contract
description: Erstellen Sie einen DEX-Smart-Contract, der ERC-20-Token-Transfers und -Genehmigungen mit Solidity abwickelt.
author: "jdourlens"
tags: ["Smart Contracts", "Token", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20-Transfers
lang: de
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Im vorherigen Tutorial haben wir [die Anatomie eines ERC-20-Tokens in Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) auf der Ethereum-Blockchain untersucht. In diesem Artikel werden wir sehen, wie wir einen Smart Contract verwenden können, um mit einem Token unter Verwendung der Sprache Solidity zu interagieren.

Für diesen Smart Contract erstellen wir eine echte dezentrale Dummy-Börse (DEX), an der ein Benutzer Ether gegen unseren neu bereitgestellten [ERC-20-Token](/developers/docs/standards/tokens/erc-20/) tauschen kann.

Für dieses Tutorial verwenden wir den Code, den wir im vorherigen Tutorial geschrieben haben, als Basis. Unsere DEX wird in ihrem Konstruktor eine Instanz des Vertrags instanziieren und folgende Operationen ausführen:

- Tausch von Token gegen Ether
- Tausch von Ether gegen Token

Wir beginnen unseren Code für die dezentrale Börse, indem wir unsere einfache ERC-20-Codebasis hinzufügen:

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

Unser neuer DEX-Smart-Contract wird den ERC-20 bereitstellen und die gesamte bereitgestellte Menge erhalten:

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

Wir haben nun also unsere DEX und sie verfügt über die gesamte Token-Reserve. Der Vertrag hat zwei Funktionen:

- `buy`: Der Benutzer kann Ether senden und im Tausch Token erhalten
- `sell`: Der Benutzer kann sich entscheiden, Token zu senden, um Ether zurückzuerhalten

## Die buy-Funktion {#the-buy-function}

Lassen Sie uns die buy-Funktion programmieren. Wir müssen zuerst die Menge an Ether überprüfen, die die Nachricht enthält, und verifizieren, dass der Vertrag genügend Token besitzt und dass die Nachricht etwas Ether enthält. Wenn der Vertrag genügend Token besitzt, sendet er die Anzahl der Token an den Benutzer und löst das Ereignis `Bought` aus.

Beachten Sie, dass bei einem Aufruf der Require-Anweisung im Fehlerfall die Transaktion des gesendeten Ethers direkt rückgängig gemacht und dieser dem Benutzer zurückgegeben wird.

Um es einfach zu halten, tauschen wir einfach 1 Token gegen 1 Wei.

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

Für den Fall, dass der Kauf erfolgreich ist, sollten wir zwei Ereignisse in der Transaktion sehen: Das Token-Ereignis `Transfer` und das Ereignis `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Die sell-Funktion {#the-sell-function}

Die für den Verkauf verantwortliche Funktion erfordert zunächst, dass der Benutzer den Betrag genehmigt hat, indem er vorab die Funktion approve aufruft. Die Genehmigung des Transfers erfordert, dass der von der DEX instanziierte ERC20Basic-Token vom Benutzer aufgerufen wird. Dies kann erreicht werden, indem zuerst die Funktion `token()` des DEX-Vertrags aufgerufen wird, um die Adresse abzurufen, an der die DEX den ERC20Basic-Vertrag namens `token` bereitgestellt hat. Dann erstellen wir eine Instanz dieses Vertrags in unserer Sitzung und rufen seine Funktion `approve` auf. Danach sind wir in der Lage, die Funktion `sell` der DEX aufzurufen und unsere Token wieder gegen Ether zu tauschen. So sieht dies beispielsweise in einer interaktiven Brownie-Sitzung aus:

```python
#### Python in der interaktiven Brownie-Konsole...

# die DEX bereitstellen
dex = DEX.deploy({'from':account1})

# die buy-Funktion aufrufen, um Ether gegen Token zu tauschen
# 1e18 ist 1 Ether, angegeben in Wei
dex.buy({'from': account2, 1e18})

# die Bereitstellungsadresse für den ERC20-Token abrufen
# der während der Erstellung des DEX-Vertrags bereitgestellt wurde
# dex.token() gibt die bereitgestellte Adresse für den Token zurück
token = ERC20Basic.at(dex.token())

# die approve-Funktion des Tokens aufrufen
# die DEX-Adresse als Ausgeber genehmigen
# und wie viele Ihrer Token sie ausgeben darf
token.approve(dex.address, 3e18, {'from':account2})

```

Wenn dann die sell-Funktion aufgerufen wird, überprüfen wir, ob der Transfer von der Adresse des Aufrufers zur Vertragsadresse erfolgreich war, und senden dann die Ether an die Adresse des Aufrufers zurück.

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

Wenn alles funktioniert, sollten Sie 2 Ereignisse (ein `Transfer` und ein `Sold`) in der Transaktion sehen und Ihr Token-Guthaben sowie Ihr Ether-Guthaben sollten aktualisiert sein.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

In diesem Tutorial haben wir gesehen, wie man das Guthaben und den Freigabebetrag eines ERC-20-Tokens überprüft und wie man `Transfer` und `TransferFrom` eines ERC-20-Smart-Contracts über die Schnittstelle aufruft.

Sobald Sie eine Transaktion durchführen, haben wir ein JavaScript-Tutorial, um [zu warten und Details über die Transaktionen zu erhalten](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), die an Ihren Vertrag gesendet wurden, sowie ein [Tutorial zum Dekodieren von Ereignissen, die durch Token-Transfers oder andere Ereignisse generiert wurden](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), sofern Sie über die ABI verfügen.

Hier ist der vollständige Code für das Tutorial:

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