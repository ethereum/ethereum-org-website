---
title: Transfery i zatwierdzenie tokenów ERC-20 z inteligentnego kontraktu Solidity
description: Zbuduj inteligentny kontrakt DEX, który obsługuje transfery i zatwierdzenia tokenów ERC-20 przy użyciu Solidity.
author: "jdourlens"
tags: [ "smart kontrakty", "tokeny", "solidity", "erc-20" ]
skill: intermediate
lang: pl
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W poprzednim samouczku zbadaliśmy [anatomię tokena ERC-20 w Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) na blockchainie Ethereum. W tym artykule zobaczymy, jak możemy użyć inteligentnego kontraktu do interakcji z tokenem, używając języka Solidity.

W ramach tego inteligentnego kontraktu stworzymy prostą, przykładową, zdecentralizowaną giełdę, na której użytkownik może wymieniać ether na nasz nowo wdrożony [token ERC-20](/developers/docs/standards/tokens/erc-20/).

W tym samouczku użyjemy kodu, który napisaliśmy w poprzednim samouczku jako podstawy. Nasz DEX utworzy instancję kontraktu w swoim konstruktorze i wykona następujące operacje:

- wymiana tokenów na ether
- wymiana etheru na tokeny

Pracę nad kodem naszej zdecentralizowanej giełdy rozpoczniemy od dodania prostej bazy kodu ERC20:

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

Nasz nowy inteligentny kontrakt DEX wdroży token ERC-20 i otrzyma całą jego podaż:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // DO ZROBIENIA
    }

    function sell(uint256 amount) public {
        // DO ZROBIENIA
    }

}
```

Więc teraz mamy nasz DEX, który posiada całą dostępną rezerwę tokenów. Kontrakt ma dwie funkcje:

- `buy`: użytkownik może wysyłać ether i otrzymywać w zamian tokeny
- `sell`: użytkownik może wysłać tokeny, aby odzyskać ether

## Funkcja `buy` {#the-buy-function}

Zakodujmy funkcję `buy`. Najpierw będziemy musieli sprawdzić ilość etheru zawartą w komunikacie i zweryfikować, czy kontrakt posiada wystarczającą liczbę tokenów oraz czy komunikat zawiera jakąś ilość etheru. Jeśli kontrakt posiada wystarczającą liczbę tokenów, wyśle on odpowiednią liczbę tokenów do użytkownika i wyemituje zdarzenie `Bought`.

Zwróć uwagę, że jeśli w przypadku błędu wywołamy funkcję `require`, wysłany ether zostanie natychmiast zwrócony do użytkownika.

Dla uproszczenia wymieniamy 1 token na 1 wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Musisz wysłać trochę etheru");
    require(amountTobuy <= dexBalance, "Niewystarczająca liczba tokenów w rezerwie");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

W przypadku pomyślnego zakupu powinniśmy zobaczyć w transakcji dwa zdarzenia: `Transfer` tokena oraz zdarzenie `Bought`.

![Dwa zdarzenia w transakcji: Transfer i Bought](./transfer-and-bought-events.png)

## Funkcja `sell` {#the-sell-function}

Funkcja odpowiedzialna za sprzedaż (`sell`) będzie w pierwszej kolejności wymagać od użytkownika zatwierdzenia kwoty poprzez wcześniejsze wywołanie funkcji `approve`. Zatwierdzenie transferu wymaga od użytkownika wywołania funkcji na instancji tokena ERC20Basic utworzonej przez DEX. Można to osiągnąć, najpierw wywołując funkcję `token()` kontraktu DEX, aby pobrać adres, pod którym kontrakt DEX wdrożył kontrakt ERC20Basic. Następnie tworzymy instancję tego kontraktu w naszej sesji i wywołujemy jego funkcję `approve`. Następnie możemy wywołać funkcję `sell` kontraktu DEX i wymienić nasze tokeny z powrotem na ether. Na przykład tak to wygląda w interaktywnej sesji brownie:

```python
#### Python w interaktywnej konsoli brownie...

# wdróż DEX
dex = DEX.deploy({'from':account1})

# wywołaj funkcję buy, aby wymienić ether na tokeny
# 1e18 to 1 ether wyrażony w wei
dex.buy({'from': account2, 1e18})

# pobierz adres wdrożenia tokena ERC20,
# który został wdrożony podczas tworzenia kontraktu DEX
# dex.token() zwraca adres wdrożonego tokena
token = ERC20Basic.at(dex.token())

# wywołaj funkcję approve tokena
# zatwierdź adres dex jako 'spendera' (wydającego)
# i określ, ile Twoich tokenów może on wydać
token.approve(dex.address, 3e18, {'from':account2})

```

Następnie, po wywołaniu funkcji `sell`, sprawdzimy, czy transfer z adresu wywołującego na adres kontraktu powiódł się, a następnie odeślemy ether z powrotem na adres wywołującego.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Musisz sprzedać co najmniej jakąś liczbę tokenów");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Sprawdź przydział tokenów");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Jeśli wszystko zadziała poprawnie, w transakcji powinny być widoczne 2 zdarzenia (`Transfer` i `Sold`), a salda tokenów i etheru zostaną zaktualizowane.

![Dwa zdarzenia w transakcji: Transfer i Sold](./transfer-and-sold-events.png)

<Divider />

W tym samouczku zobaczyliśmy, jak sprawdzić saldo i przydział (allowance) tokena ERC-20, a także jak wywołać funkcje `Transfer` i `TransferFrom` inteligentnego kontraktu ERC20 za pomocą interfejsu.

Po wykonaniu transakcji polecamy nasz samouczek JavaScript, aby dowiedzieć się, jak [oczekiwać na transakcje i pobierać ich szczegóły](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) dla kontraktu, oraz [samouczek dotyczący dekodowania zdarzeń](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) generowanych przez transfery tokenów lub inne, pod warunkiem posiadania ABI.

Oto kompletny kod do tego samouczka:

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
        require(amountTobuy > 0, "Musisz wysłać trochę etheru");
        require(amountTobuy <= dexBalance, "Niewystarczająca liczba tokenów w rezerwie");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Musisz sprzedać co najmniej jakąś liczbę tokenów");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Sprawdź przydział tokenów");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
