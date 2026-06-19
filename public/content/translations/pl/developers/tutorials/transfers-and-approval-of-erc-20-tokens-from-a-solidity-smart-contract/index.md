---
title: Transfery i zatwierdzanie tokenów ERC-20 z inteligentnego kontraktu w Solidity
description: Zbuduj inteligentny kontrakt DEX, który obsługuje transfery i zatwierdzanie tokenów ERC-20 przy użyciu Solidity.
author: "jdourlens"
tags: ["inteligentne kontrakty", "tokeny", "solidity", "erc-20"]
skill: intermediate
breadcrumb: Transfery ERC-20
lang: pl
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W poprzednim samouczku omówiliśmy [anatomię tokena ERC-20 w Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) na blockchainie Ethereum. W tym artykule zobaczymy, jak możemy użyć inteligentnego kontraktu do interakcji z tokenem przy użyciu języka Solidity.

Dla tego inteligentnego kontraktu stworzymy prawdziwą, testową zdecentralizowaną giełdę (DEX), na której użytkownik będzie mógł wymieniać ether na nasz nowo wdrożony [token ERC-20](/developers/docs/standards/tokens/erc-20/).

W tym samouczku jako bazy użyjemy kodu napisanego w poprzednim samouczku. Nasz DEX utworzy instancję kontraktu w swoim konstruktorze i będzie wykonywał następujące operacje:

- wymiana tokenów na ether
- wymiana etheru na tokeny

Rozpoczniemy pisanie kodu naszej zdecentralizowanej giełdy od dodania naszej prostej bazy kodu ERC20:

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

Nasz nowy inteligentny kontrakt DEX wdroży ERC-20 i otrzyma całą podaż:

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

Mamy więc teraz nasz DEX, który dysponuje całą dostępną rezerwą tokenów. Kontrakt posiada dwie funkcje:

- `buy`: Użytkownik może wysłać ether i otrzymać w zamian tokeny
- `sell`: Użytkownik może zdecydować się na wysłanie tokenów, aby odzyskać ether

## Funkcja kupna {#the-buy-function}

Napiszmy kod funkcji kupna. Najpierw będziemy musieli sprawdzić ilość etheru, jaką zawiera wiadomość, oraz zweryfikować, czy kontrakt posiada wystarczającą liczbę tokenów i czy wiadomość w ogóle zawiera jakiś ether. Jeśli kontrakt posiada wystarczającą liczbę tokenów, wyśle je do użytkownika i wyemituje zdarzenie `Bought`.

Zauważ, że jeśli wywołamy instrukcję require, w przypadku błędu wysłany ether zostanie bezpośrednio cofnięty i zwrócony użytkownikowi.

Dla uproszczenia wymieniamy po prostu 1 token na 1 wei.

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

W przypadku, gdy kupno zakończy się sukcesem, powinniśmy zobaczyć dwa zdarzenia w transakcji: `Transfer` tokena oraz zdarzenie `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Funkcja sprzedaży {#the-sell-function}

Funkcja odpowiedzialna za sprzedaż będzie najpierw wymagać od użytkownika zatwierdzenia kwoty poprzez wcześniejsze wywołanie funkcji approve. Zatwierdzenie transferu wymaga, aby token ERC20Basic, którego instancję utworzył DEX, został wywołany przez użytkownika. Można to osiągnąć, wywołując najpierw funkcję `token()` kontraktu DEX, aby pobrać adres, pod którym DEX wdrożył kontrakt ERC20Basic o nazwie `token`. Następnie tworzymy instancję tego kontraktu w naszej sesji i wywołujemy jego funkcję `approve`. Wtedy jesteśmy w stanie wywołać funkcję `sell` kontraktu DEX i wymienić nasze tokeny z powrotem na ether. Na przykład, tak to wygląda w interaktywnej sesji Brownie:

```python
#### Python w interaktywnej konsoli Brownie...

# wdroż DEX
dex = DEX.deploy({'from':account1})

# wywołaj funkcję buy, aby wymienić ether na token
# 1e18 to 1 ether wyrażony w wei
dex.buy({'from': account2, 1e18})

# pobierz adres wdrożenia tokena ERC20
# który został wdrożony podczas tworzenia kontraktu DEX
# dex.token() zwraca wdrożony adres tokena
token = ERC20Basic.at(dex.token())

# wywołaj funkcję approve tokena
# zatwierdź adres dex jako wydającego
# oraz ile twoich tokenów może on wydać
token.approve(dex.address, 3e18, {'from':account2})

```

Następnie, gdy wywoływana jest funkcja sprzedaży, sprawdzimy, czy transfer z adresu wywołującego na adres kontraktu zakończył się pomyślnie, a następnie odeślemy ether z powrotem na adres wywołującego.

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

Jeśli wszystko działa, powinieneś zobaczyć 2 zdarzenia (`Transfer` i `Sold`) w transakcji, a Twoje saldo tokenów i etheru powinno zostać zaktualizowane.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

Z tego samouczka dowiedzieliśmy się, jak sprawdzić saldo i limit wydatków tokena ERC-20, a także jak wywołać `Transfer` i `TransferFrom` inteligentnego kontraktu ERC20 za pomocą interfejsu.

Po wykonaniu transakcji mamy samouczek JavaScript, z którego dowiesz się, jak [czekać i uzyskiwać szczegóły dotyczące transakcji](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) wykonanych na Twoim kontrakcie, oraz [samouczek dotyczący dekodowania zdarzeń generowanych przez transfery tokenów lub dowolne inne zdarzenia](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), o ile posiadasz ABI.

Oto kompletny kod z tego samouczka:

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