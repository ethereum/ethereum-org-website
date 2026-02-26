---
title: Zrozumienie inteligentnego kontraktu tokenu ERC-20
description: "Dowiedz się, jak zaimplementować standard tokena ERC-20, korzystając z pełnego przykładu i objaśnienia inteligentnego kontraktu w Solidity."
author: "jdourlens"
tags: [ "smart kontrakty", "tokeny", "solidity", "erc-20" ]
skill: beginner
lang: pl
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Jeden z najważniejszych [standardów inteligentnych kontraktów](/developers/docs/standards/) na Ethereum znany jest jako [ERC-20](/developers/docs/standards/tokens/erc-20/), który stał się standardem technicznym stosowanym w odniesieniu do wszystkich inteligentnych kontraktów w blockchainie Ethereum do implementacji zamiennych tokenów.

ERC-20 określa wspólną listę zasad, których powinny przestrzegać wszystkie zamienne tokeny Ethereum. W konsekwencji ten standard tokenów umożliwia deweloperom wszystkich typów dokładnie przewidzieć, jak nowe tokeny będą funkcjonować w ramach większego systemu Ethereum. Upraszcza to i ułatwia pracę deweloperom, ponieważ mogą oni kontynuować swoją pracę, wiedząc, że żaden nowy projekt nie będzie musiał być ponownie tworzony za każdym razem, gdy pojawi się nowy token, o ile będzie on zgodny z zasadami.

Oto, przedstawione w formie interfejsu, funkcje, które musi zaimplementować ERC-20. Jeśli nie jesteś pewien, czym jest interfejs, sprawdź nasz artykuł o [programowaniu obiektowym w Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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
```

Oto szczegółowe wyjaśnienie przeznaczenia każdej funkcji. Następnie przedstawimy prostą implementację tokenu ERC-20.

## Gettery {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Zwraca liczbę istniejących tokenów. Ta funkcja jest getterem i nie modyfikuje stanu kontraktu. Pamiętaj, że w Solidity nie ma liczb zmiennoprzecinkowych. Dlatego większość tokenów przyjmuje 18 miejsc po przecinku i zwraca całkowitą podaż oraz inne wyniki jako 1000000000000000000 za 1 token. Nie każdy token ma 18 miejsc po przecinku i jest to coś, na co naprawdę trzeba uważać, mając do czynienia z tokenami.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Zwraca liczbę tokenów posiadanych przez dany adres (`account`). Ta funkcja jest getterem i nie modyfikuje stanu kontraktu.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standard ERC-20 umożliwia jednemu adresowi przyznanie innemu adresowi zezwolenia na pobranie z niego tokenów. Ten getter zwraca pozostałą liczbę tokenów, które `spender` będzie mógł wydać w imieniu `owner`. Ta funkcja jest getterem, nie modyfikuje stanu kontraktu i domyślnie powinna zwracać 0.

## Funkcje {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Przenosi `amount` tokenów z adresu wywołującego funkcję (`msg.sender`) na adres odbiorcy. Ta funkcja emituje zdefiniowane później zdarzenie `Transfer`. Zwraca `true`, jeśli transfer był możliwy.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Ustawia `allowance` – kwotę, którą `spender` może przelać z salda wywołującego funkcję (`msg.sender`). Ta funkcja emituje zdarzenie `Approval`. Funkcja zwraca informację, czy `allowance` zostało pomyślnie ustawione.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Przenosi `amount` tokenów z adresu `sender` na adres `recipient` za pomocą mechanizmu `allowance`. Kwota `amount` jest następnie odejmowana od `allowance` osoby wywołującej. Ta funkcja emituje zdarzenie `Transfer`.

## Zdarzenia {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

To zdarzenie jest emitowane, gdy liczba tokenów (`value`) jest wysyłana z adresu `from` na adres `to`.

W przypadku wybijania nowych tokenów transfer jest zazwyczaj `from` adresu 0x00..0000, natomiast w przypadku spalania tokenów transfer jest `to` adresu 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

To zdarzenie jest emitowane, gdy kwota tokenów (`value`) jest zatwierdzana przez `owner` do użycia przez `spender`.

## Podstawowa implementacja tokenów ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Oto najprostszy kod, na którym można oprzeć swój token ERC-20:

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

Inną doskonałą implementacją standardu tokenów ERC-20 jest [implementacja ERC-20 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
