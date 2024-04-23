---
title: Zrozumienie inteligentnego kontraktu tokenu ERC-20
description: Wprowadzenie do wdrożenia pierwszego inteligentnego kontraktu w sieci testowej Ethereum
author: "jdourlens"
tags:
  - "inteligentne kontrakty"
  - "tokeny"
  - "solidity"
  - "pierwsze kroki"
  - "erc-20"
skill: beginner
lang: pl
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Jeden z najważniejszych [standardów inteligentnych kontraktów](/developers/docs/standards/) na Ethereum znany jest jako [ERC-20](/developers/docs/standards/tokens/erc-20/), który stał się standardem technicznym stosowanym w odniesieniu do wszystkich inteligentnych kontraktów w blockchainie Ethereum do implementacji zamiennych tokenów.

ERC-20 określa wspólny wykaz zasad, których powinny przestrzegać wszystkie zamienne tokeny Ethereum. W konsekwencji, ten standard tokenów umożliwia deweloperom wszystkich typów dokładnie przewidzieć, jak nowe tokeny będą funkcjonować w ramach większego systemu Ethereum. Upraszcza to i ułatwia pracę deweloperom, ponieważ mogą oni kontynuować swoją pracę, wiedząc, że żaden nowy projekt nie będzie musiał być ponownie tworzony za każdym razem, gdy pojawi się nowy token, o ile będzie on zgodny z zasadami.

Oto, przedstawione w formie interfejsu, funkcje, które musi zaimplementować ERC-20. Jeśli nie jesteś pewien co do interfejsu: sprawdź nasz artykuł dotyczący [Programowanie obiektowe w Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Zwraca ilość istniejących tokenów. Ta funkcja jest to getter i nie modyfikuje stanu umowy. Pamiętaj, że w Solidity nie ma liczb zmiennoprzecinkowych. Dlatego większość tokenów przyjmuje 18 miejsc po przecinku i zwróci całkowitą podaż i inne wyniki w następujący sposób 100000000000000000000 dla 1 tokena. Nie każdy token ma 18 miejsc po przecinku i jest to coś, na co naprawdę musisz uważać, gdy masz do czynienia z tokenami.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Zwraca ilość tokenów będących w posiadaniu adresu (`account`). Ta funkcja jest to getter i nie modyfikuje stanu umowy.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standard ERC-20 umożliwia adresowi przyznanie zezwolenia na inny adres, aby móc pobrać z niego tokeny. Ten getter zwraca pozostałą liczbę tokenów, które `wydawca` będzie mógł wydać w imieniu `właściciela`. Ta funkcja jest to getter i nie modyfikuje stanu umowy. Powinna domyślnie zwracać 0.

## Funkcje {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Przenosi `amount` tokenów z adresu wywołującego funkcję (`msg.sender`) na adres odbiorcy. Ta funkcja emituje zdarzenie `Transfer` zdefiniowane później. Zwraca prawdę, jeśli transfer był możliwy.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Ustaw kwotę `allowance`, jaką `spender` może przenieść z salda wywołującego funkcję (`msg.sender`). Ta funkcja emituje zdarzenie zatwierdzenia. Funkcja zwraca, czy dozwolony limit (allowance) został ustawiony.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Przesyła `amount` tokenów od `sender` dto `recipient` przy użyciu mechanizmu dozwolonego limitu. Wartość amount jest następnie odliczana od dozwolonego limitu wywołującego funkcję. Ta funkcja emituje zdarzenie `Transfer`.

## Zdarzenia {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

To zdarzenie jest emitowane, gdy ilość tokenów (wartość) jest wysyłana z adresu `od` na adres `do`.

W przypadku wybijania nowych tokenów transfer jest zazwyczaj `from` adresu 0x00..0000, podczas gdy w przypadku wypalania tokenów transfer jest `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

To wydarzenie jest emitowane, gdy ilość tokenów (`value`) jest zatwierdzona przez `owner` do użycia przez `spender`.

## Podstawowa implementacja tokenów ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Oto najprostszy kod, z którego można oprzeć swój token ERC-20:

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

    uint256 totalSupply_;

    using SafeMath for uint256;


   constructor(uint256 total) public {
    totalSupply_ = total;
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

Ta implementacja wykorzystuje bibliotekę SafeMath. Przeczytaj nasz samouczek, jeśli chcesz się dowiedzieć [jak biblioteka pomaga Ci w obsłudze przepełnień i niedoborów w inteligentnych kontraktach](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/).

Inną doskonałą implementacją standardu tokena ERC-20 jest [implementacja OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
