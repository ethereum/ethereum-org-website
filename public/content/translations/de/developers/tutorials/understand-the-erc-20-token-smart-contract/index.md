---
title: Den ERC-20-Token-Smart-Contract verstehen
description: Lernen Sie, wie Sie den ERC-20-Token-Standard mit einem vollständigen Solidity-Smart-Contract-Beispiel und einer Erklärung implementieren.
author: "jdourlens"
tags:
  [
    "intelligente Verträge",
    "Token",
    "solidity",
    "Erc-20"
  ]
skill: beginner
lang: de
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Einer der wichtigsten [Smart-Contract-Standards](/developers/docs/standards/) auf Ethereum ist als [ERC-20](/developers/docs/standards/tokens/erc-20/) bekannt, der sich als technischer Standard für alle Smart Contracts auf der Ethereum-Blockchain für fungible Token-Implementierungen durchgesetzt hat.

ERC-20 definiert eine gemeinsame Liste von Regeln, an die sich alle fungiblen Ethereum-Token halten sollten. Folglich ermöglicht dieser Tokenstandard Entwicklern aller Art, genau vorherzusagen, wie neue Token innerhalb des größeren Ethereum-Systems funktionieren werden. Das vereinfacht und erleichtert die Arbeit der Entwickler, denn sie können mit ihrer Arbeit fortfahren, da sie wissen, dass nicht jedes neue Projekt von Grund auf neu erstellt werden muss, wenn ein neuer Token veröffentlicht wird, solange der Token den Regeln entspricht.

Hier sind, als Interface dargestellt, die Funktionen, die ein ERC-20 implementieren muss. Wenn Sie sich nicht sicher sind, was ein Interface ist: Sehen Sie sich unseren Artikel über [OOP-Programmierung in Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) an.

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

Hier wird Zeile für Zeile erklärt, wofür die einzelnen Funktionen da sind. Danach stellen wir eine einfache Implementierung eines ERC-20-Tokens vor.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Gibt die Anzahl der existierenden Token zurück. Diese Funktion ist ein Getter und ändert den Zustand des Vertrags nicht. Beachten Sie, dass es in Solidity keine Floats gibt. Daher verwenden die meisten Token 18 Dezimalstellen und geben die Gesamtversorgung und andere Ergebnisse wie folgt zurück: 1000000000000000000 für 1 Token. Nicht jeder Token hat 18 Dezimalstellen und darauf müssen Sie beim Umgang mit Token unbedingt achten.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Gibt die Anzahl der Token zurück, die eine Adresse (`account`) besitzt. Diese Funktion ist ein Getter und ändert den Zustand des Vertrags nicht.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Der ERC-20-Standard ermöglicht es einer Adresse, einer anderen Adresse eine Allowance zu erteilen, um Token von ihr abrufen zu können. Dieser Getter gibt die verbleibende Anzahl an Token zurück, die der `spender` im Namen des `owner` ausgeben darf. Diese Funktion ist ein Getter und ändert den Zustand des Vertrags nicht und sollte standardmäßig 0 zurückgeben.

## Funktionen {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Verschiebt den `amount` (Betrag) an Token von der Adresse des Funktionsaufrufers (`msg.sender`) an die Empfängeradresse. Diese Funktion löst das später definierte `Transfer`-Event aus. Sie gibt `true` zurück, wenn die Übertragung möglich war.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Legt den Betrag der `allowance` fest, den der `spender` vom Guthaben des Funktionsaufrufers (`msg.sender`) transferieren darf. Diese Funktion löst das `Approval`-Event aus. Die Funktion gibt zurück, ob die `allowance` erfolgreich festgelegt wurde.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Verschiebt den `amount` an Token vom `sender` zum `recipient` unter Verwendung des Allowance-Mechanismus. Der `amount` wird dann von der Allowance des Aufrufers abgezogen. Diese Funktion löst das `Transfer`-Event aus.

## Ereignisse {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Dieses Event wird ausgelöst, wenn ein Betrag an Token (`value`) von der `from`-Adresse an die `to`-Adresse gesendet wird.

Beim Minting (Prägen) neuer Token erfolgt der Transfer in der Regel `from` der Adresse 0x00..0000, während beim Burning (Verbrennen) von Token der Transfer `to` 0x00..0000 erfolgt.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Dieses Event wird ausgelöst, wenn der Betrag an Token (`value`) vom `owner` für die Verwendung durch den `spender` genehmigt wurde.

## Eine einfache Implementierung von ERC-20-Token {#a-basic-implementation-of-erc-20-tokens}

Hier ist der einfachste Code, auf dem Sie Ihren ERC-20-Token aufbauen können:

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

Eine weitere exzellente Implementierung des ERC-20-Token-Standards ist die [ERC-20-Implementierung von OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
