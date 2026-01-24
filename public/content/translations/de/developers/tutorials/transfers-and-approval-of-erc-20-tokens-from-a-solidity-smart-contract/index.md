---
title: Übertragung und Genehmigung von ERC-20-Token aus einem Solidity-Smart-Contract
description: Erstellen Sie einen DEX-Smart-Contract, der ERC-20-Token-Übertragungen und -Genehmigungen mit Solidity handhabt.
author: "jdourlens"
tags:
  [
    "intelligente Verträge",
    "Token",
    "solidity",
    "Erc-20"
  ]
skill: intermediate
lang: de
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Im vorherigen Tutorial haben wir [die Anatomie eines ERC-20-Tokens in Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) auf der Ethereum-Blockchain untersucht. In diesem Artikel sehen wir uns an, wie wir einen Smart Contract verwenden können, um mithilfe der Sprache Solidity mit einem Token zu interagieren.

Für diesen Smart Contract erstellen wir eine echte dezentralisierte Dummy-Börse, auf der ein Benutzer Ether gegen unseren neu bereitgestellten [ERC-20-Token](/developers/docs/standards/tokens/erc-20/) handeln kann.

Für dieses Tutorial verwenden wir den Code, den wir im vorherigen Tutorial geschrieben haben, als Grundlage. Unser DEX wird eine Instanz des Vertrags in seinem Konstruktor instanziieren und die folgenden Operationen durchführen:

- Umtausch von Token zu Ether
- Umtausch von Ether zu Token

Wir beginnen mit dem Code für unsere dezentralisierte Börse, indem wir unsere einfache ERC20-Codebasis hinzufügen:

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

Unser neuer DEX-Smart-Contract stellt den ERC-20 bereit und erhält folgende Komponenten:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // ZU ERLEDIGEN
    }

    function sell(uint256 amount) public {
        // ZU ERLEDIGEN
    }

}
```

Wir haben jetzt also unseren DEX. Dieser verfügt über die gesamte Token-Reserve. Der Vertrag hat zwei Funktionen:

- `buy`: Der Benutzer kann Ether senden und im Gegenzug Token erhalten.
- `sell`: Der Benutzer kann entscheiden, Token zu senden, um Ether zurückzubekommen.

## Die Kauffunktion {#the-buy-function}

Programmieren wir nun die Kauffunktion. Zuerst müssen wir die Ether-Menge in der Nachricht überprüfen und sicherstellen, dass der Contract genügend Token besitzt und die Nachricht auch Ether enthält. Wenn der Contract genügend Token besitzt, sendet er die Anzahl der Token an den Benutzer und löst das `Bought`-Ereignis aus.

Beachten Sie, dass bei einem Aufruf der `require`-Funktion im Fehlerfall der gesendete Ether direkt zurückgebucht und an den Benutzer zurückgegeben wird.

Um die Dinge einfach zu halten, tauschen wir einfach 1 Token gegen 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Sie müssen etwas Ether senden");
    require(amountTobuy <= dexBalance, "Nicht genügend Token in der Reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Im Falle eines erfolgreichen Kaufs sollten wir zwei Ereignisse in der Transaktion sehen: das `Transfer`-Ereignis des Tokens und das `Bought`-Ereignis.

![Zwei Ereignisse in der Transaktion: Transfer und Bought](./transfer-and-bought-events.png)

## Die Verkaufsfunktion {#the-sell-function}

Die für den Verkauf zuständige Funktion setzt voraus, dass der Benutzer den Betrag zuvor durch Aufrufen der `approve`-Funktion genehmigt hat. Zur Genehmigung der Übertragung muss der vom DEX instanziierte ERC20Basic-Token vom Nutzer aufgerufen werden. Dies kann erreicht werden, indem zuerst die `token()`-Funktion des DEX-Vertrags aufgerufen wird, um die Adresse abzurufen, an der der DEX den `ERC20Basic`-Vertrag mit dem Namen `token` bereitgestellt hat. Dann erstellen wir eine Instanz dieses Vertrags in unserer Sitzung und rufen seine `approve`-Funktion auf. Dann können wir die `sell`-Funktion des DEX aufrufen und unsere Token gegen Ether zurücktauschen. So sieht das zum Beispiel bei einer interaktiven Brownie-Sitzung aus:

```python
#### Python in der interaktiven Brownie-Konsole...

# DEX bereitstellen
dex = DEX.deploy({'from':account1})

# die Kauffunktion aufrufen, um Ether gegen Token zu tauschen
# 1e18 ist 1 Ether in Wei
dex.buy({'from': account2, 1e18})

# die Bereitstellungsadresse für den ERC20-Token abrufen
# der bei der Erstellung des DEX-Vertrags bereitgestellt wurde
# dex.token() gibt die Bereitstellungsadresse für den Token zurück
token = ERC20Basic.at(dex.token())

# die approve-Funktion des Tokens aufrufen
# die DEX-Adresse als Spender genehmigen
# und wie viele Ihrer Token es ausgeben darf
token.approve(dex.address, 3e18, {'from':account2})

```

Wenn dann die `sell`-Funktion aufgerufen wird, überprüfen wir, ob die Übertragung von der Adresse des Aufrufers zur Contract-Adresse erfolgreich war, und senden dann die Ether an die Adresse des Aufrufers zurück.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Sie müssen mindestens einige Token verkaufen");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Überprüfen Sie die Token-Freigabe");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Wenn alles funktioniert, sollten Sie 2 Ereignisse (ein `Transfer` und ein `Sold`) in der Transaktion sehen, und Ihr Token- und Ether-Guthaben sollte aktualisiert sein.

![Zwei Ereignisse in der Transaktion: Transfer und Sold](./transfer-and-sold-events.png)

<Divider />

In diesem Tutorial haben wir gesehen, wie man das Guthaben und die Freigabe (`allowance`) eines ERC-20-Tokens überprüft und wie man `Transfer` und `TransferFrom` eines ERC20-Smart-Contracts über die Schnittstelle aufruft.

Nachdem Sie eine Transaktion durchgeführt haben, haben wir ein JavaScript-Tutorial, um [auf die an Ihren Contract gesendeten Transaktionen zu warten und Details zu erhalten](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), sowie ein [Tutorial zum Dekodieren von Ereignissen, die durch Token-Übertragungen oder andere Ereignisse erzeugt werden](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), solange Sie die ABI haben.

Hier finden Sie den vollständigen Code für das Tutorial:

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
        require(amountTobuy > 0, "Sie müssen etwas Ether senden");
        require(amountTobuy <= dexBalance, "Nicht genügend Token in der Reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Sie müssen mindestens einige Token verkaufen");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Überprüfen Sie die Token-Freigabe");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
