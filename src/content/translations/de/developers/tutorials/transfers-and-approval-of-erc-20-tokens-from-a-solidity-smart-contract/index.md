---
title: ERC-20-Token aus einem Solidity-Smart Contract übertragen und genehmigen
description: So verwendne Sie einen Smart Contract, um über die Sprache Solidity mit einem Token zu interagieren
author: "jdourlens"
tags:
  - "Smart Contracts"
  - "Token"
  - "Solidity"
  - "Erste Schritte"
  - "Erc-20"
skill: intermediate
lang: de
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Im vorherigen Tutorial haben wir uns [die Anatomy eines ERC-20-Tokens in Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) auf der Ethereum-Blockchain angesehen. In diesem Beitrag sehen wir uns an, wie wir einen Smart Contract verwenden können, um mit einem Token unter Verwendung der Solidity-Sprache zu interagieren.

Für diesen Smart Contract erstellen wir eine echte Dummy-Börse, auf der ein Nutzer Ethereum mit unserem neu eingeführten [ERC-20-Token](/developers/docs/standards/tokens/erc-20/) handeln kann.

In diesem Tutorial werden wir den Code verwenden, den wir in den vorherigen Tutorials als Grundlage geschrieben haben. Unser DEX wird eine Instanz des Vertrags in seinem Konstruktor instanziieren und die folgenden Operationen durchführen:

- Umtausch von Token zu Ether
- Umtausch von Ether zu Token

Wir beginnen für den Code für den dezentralisierten Austausch damit, unsere einfache ERC20-Codebasis hinzufügen:

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
        allowed[owner][msg.sender] = allowed[owner][msg.sender]+numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

Unser neuer DEX-Smart Contract stellt den ERC-20 bereit und erhält folgende Komponenten:

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

Wir haben jetzt also unseren DEX. Dieser verfügt über die gesamte Token-Reserve. Der Vertrag hat zwei Funktionen:

- `buy`: Der Benutzer kann Ether senden und erhält dafür Token.
- `sell`: Der Benutzer kann entscheiden, Token zu senden, um Ether zurückzubekommen.

## Die Kauffunktion {#the-buy-function}

Programmieren wir nun die Kauffunktion. Als Erstes müssen wir die Menge an Ether in der Nachricht überprüfen und sicherstellen, dass die Verträge genügend Token besitzen. Enthält der Vertrag genügend Token, sendet er die Anzahl an Token an den Benutzer und gibt als Ereignis `Gekauft` aus.

Beachten Sie, dass beim Aufruf der Require-Funktion im Falle eines Fehlers der Versand rückgängig gemacht und der Ether wieder zurück an den Benutzer gesendet wird.

Um die Dinge einfach zu halten, tauschen wir einfach 1 Token gegen 1 Wei.

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

Im Falle eines erfolgreichen Kaufs sollten zwei Ereignisse in der Transaktion angezeigt werden: das Tokenereignis `Transfer` und `Bought`.

![Zwei Ereignisse in der Transaktion: Übertragung und Gekauft](./transfer-and-bought-events.png)

## Die Verkaufsfunktion {#the-sell-function}

Die Funktion, die für den Verkauf zuständig ist, setzt voraus, dass der Benutzer den Betrag zuvor durch die Abfrage der Funktion genehmigt hat. Zur Genehmigung der Überweisung muss der vom DEX instanziierte ERC20Basic-Token vom Nutzer aufgerufen werden. Das lässt sich erreichen, indem zuerst die `token()-`Funktion des DEX-Vertrags aufgerufen wird, um die Adresse abzurufen, an der DEX den ERC20Basic-Vertrag namens `Token` bereitgestellt hat. Dann erstellen Sie eine Instanz dieses Vertrags in der Sitzung und rufen seine `approve`-Funktion auf. Dann können wir die `sell`-Funktion des DEX aufrufen und unsere Token gegen Ether zurücktauschen. So sieht das zum Beispiel bei einer interaktiven Brownie-Sitzung aus:

```python
#### Python in interactive brownie console...

# DEX einsetzen
dex = DEX.deploy({'from':account1})

# Aufruf der Kauffunktion zum Tausch von Ether gegen Token
# 1e18 ist 1 Ether, der auf Wei lautet
dex.buy({'from': account2, 1e18})

# Ermitteln der Bereitstellungsadresse für den ERC20-Token
# der während der DEX-Vertragserstellung bereitgestellt wurde
# dex.token() liefert die Deployment-Adresse für den Token
token = ERC20Basic.at(dex.token())

# Aufruf der Approve-Funktion für den Token
# die dex-Adresse als Spender genehmigen
# und wie viele Ihrer Token sie ausgeben darf
token.approve(dex.address, 3e18, {'from':account2})

```

Wenn dann die Verkaufsfunktion aufgerufen wird, prüfen wir, ob die Übertragung von der Adresse des Abfragenden an die Adresse des Vertragspartners erfolgreich war, und senden dann die Ether zurück an die Adresse des Abfragenden.

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

Wenn alles funktioniert, sollten Sie zwei Ereignisse (`Transfer` und `Sold`) in der Transaktion sehen und dass Ihr Tokenguthaben und Ethereum-Guthaben aktualisiert wurden.

![Zwei Ereignisse in der Transaktion: Übertragung und Verkauf](./transfer-and-sold-events.png)

<Divider />

In diesem Tutorial haben wir gesehen, wie Sie den Kontostand und das Guthaben eines ERC-20-Tokens überprüfen und wie Sie `Transfer` und `TransferFrom` eines ERC20-Smart-Contracts über die Schnittstelle abrufen.

Sobald Sie eine Transaktion durchführen, haben wir ein JavaScript-Tutorial, um [zu warten und Details über die Transaktionen](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) zu erhalten, die mit Ihrem Vertrag durchgeführt wurden, und ein [Tutorial, um Ereignisse zu dekodieren, die durch Tokenübertragungen oder andere Ereignisse](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) erzeugt werden, solange Sie die ABI haben.

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
        allowed[owner][msg.sender] = allowed[owner][msg.sender]+numTokens;
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
