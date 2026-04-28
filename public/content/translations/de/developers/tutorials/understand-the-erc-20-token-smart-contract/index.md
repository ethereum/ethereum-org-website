---
title: Den ERC-20-Token-Smart-Contract verstehen
description: "Erfahren Sie, wie Sie den ERC-20-Token-Standard mit einem vollständigen Solidity-Smart-Contract-Beispiel und einer Erklärung implementieren."
author: "jdourlens"
tags: ["Smart Contracts", "Token", "Solidity", "erc-20"]
skill: beginner
breadcrumb: ERC-20-Token-Grundlagen
lang: de
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Einer der bedeutendsten [Smart-Contract-Standards](/developers/docs/standards/) auf Ethereum ist als [ERC-20](/developers/docs/standards/tokens/erc-20/) bekannt. Er hat sich als technischer Standard für alle Smart Contracts auf der Ethereum-Blockchain für Implementierungen fungibler Token etabliert.

ERC-20 definiert eine gemeinsame Liste von Regeln, an die sich alle fungiblen Ethereum-Token halten sollten. Folglich ermöglicht dieser Token-Standard Entwicklern aller Art, genau vorherzusagen, wie neue Token innerhalb des größeren Ethereum-Systems funktionieren werden. Dies vereinfacht und erleichtert die Aufgaben der Entwickler, da sie mit ihrer Arbeit fortfahren können, in dem Wissen, dass nicht jedes neue Projekt jedes Mal neu erstellt werden muss, wenn ein neuer Token veröffentlicht wird, solange der Token die Regeln befolgt.

Hier sind, als Schnittstelle (Interface) dargestellt, die Funktionen, die ein ERC-20 implementieren muss. Wenn Sie sich nicht sicher sind, was eine Schnittstelle ist: Lesen Sie unseren Artikel über [OOP-Programmierung in Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Hier ist eine zeilenweise Erklärung, wofür jede Funktion da ist. Danach werden wir eine einfache Implementierung des ERC-20-Tokens vorstellen.

## Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Gibt die Menge der existierenden Token zurück. Diese Funktion ist ein Getter und ändert den Zustand des Vertrags nicht. Denken Sie daran, dass es in Solidity keine Gleitkommazahlen (Floats) gibt. Daher verwenden die meisten Token 18 Dezimalstellen und geben das Gesamtangebot (Total Supply) und andere Ergebnisse wie folgt zurück: 1000000000000000000 für 1 Token. Nicht jeder Token hat 18 Dezimalstellen, und darauf müssen Sie beim Umgang mit Token unbedingt achten.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Gibt die Menge an Token zurück, die einer Adresse (`account`) gehören. Diese Funktion ist ein Getter und ändert den Zustand des Vertrags nicht.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Der ERC-20-Standard erlaubt es einer Adresse, einer anderen Adresse eine Freigabe (Allowance) zu erteilen, um Token von ihr abrufen zu können. Dieser Getter gibt die verbleibende Anzahl von Token zurück, die der `spender` im Namen des `owner` ausgeben darf. Diese Funktion ist ein Getter, ändert den Zustand des Vertrags nicht und sollte standardmäßig 0 zurückgeben.

## Funktionen {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Verschiebt die `amount` (Menge) an Token von der Adresse des Funktionsaufrufers (`msg.sender`) zur Empfängeradresse. Diese Funktion löst das später definierte `Transfer`-Ereignis aus. Sie gibt „true“ zurück, wenn die Übertragung möglich war.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Legt die Menge der `allowance` (Freigabe) fest, die der `spender` vom Guthaben des Funktionsaufrufers (`msg.sender`) übertragen darf. Diese Funktion löst das Approval-Ereignis aus. Die Funktion gibt zurück, ob die Freigabe erfolgreich festgelegt wurde.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Verschiebt die `amount` an Token vom `sender` zum `recipient` unter Verwendung des Freigabemechanismus. Der Betrag wird dann von der Freigabe des Aufrufers abgezogen. Diese Funktion löst das `Transfer`-Ereignis aus.

## Ereignisse {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Dieses Ereignis wird ausgelöst, wenn die Menge an Token (value) von der `from`-Adresse an die `to`-Adresse gesendet wird.

Im Falle des Prägens neuer Token erfolgt die Übertragung normalerweise `from` (von) der Adresse 0x00..0000, während im Falle des Verbrennens von Token die Übertragung `to` (an) 0x00..0000 erfolgt.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Dieses Ereignis wird ausgelöst, wenn die Menge an Token (`value`) vom `owner` zur Verwendung durch den `spender` genehmigt wird.

## Eine grundlegende Implementierung von ERC-20-Token {#a-basic-implementation-of-erc-20-tokens}

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

Eine weitere hervorragende Implementierung des ERC-20-Token-Standards ist die [OpenZeppelin ERC-20-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).