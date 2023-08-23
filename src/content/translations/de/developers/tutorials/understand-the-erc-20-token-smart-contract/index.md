---
title: Den ERC-20-Token-Smart-Contract verstehen
description: Einführung in die Bereitstellung Ihres ersten Smart Contracts in einem Ethereum-Testnet
author: "jdourlens"
tags:
  - "Smart Contracts"
  - "Token"
  - "Solidity"
  - "Erste Schritte"
  - "Erc-20"
skill: beginner
lang: de
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Einer der wichtigsten [Smart-Contract-Standards](/developers/docs/standards/) auf Ethereum ist als [ERC-20](/developers/docs/standards/tokens/erc-20/) bekannt, der sich als technischer Standard für alle Smart Contracts auf der Ethereum-Blockchain für fungible Token-Implementierungen durchgesetzt hat.

ERC-20 definiert eine gemeinsame Liste von Regeln, an die sich alle fungible Ethereum-Token halten sollten. Folglich ermöglicht dieser Tokenstandard allen Entwicklern, die Funktionsweise neuer Token innerhalb des größeren Ethereum-Systems zu prognostizieren. Das vereinfacht und erleichtert die Arbeit der Entwickler, denn sie können mit ihrer Arbeit fortfahren, da sie wissen, dass nicht jedes neue Projekt von Grund auf neu erstellt werden muss, wenn ein neuer Token veröffentlicht wird, solange der Token den Regeln entspricht.

Hier sind die Funktionen, die ein ERC-20 implementieren muss, dargestellt in Form einer Schnittstelle. Wenn Sie unsicher sind, was eine Schnittstelle ist: Lesen Sie unseren Beitrag über [OOP-Programmierung in Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Gibt die Anzahl der vorhandenen Token zurück. Diese Funktion ist ein Getter und verändert den Zustand des Vertrags nicht. Beachten Sie, dass es in Solidity keine Floats gibt. Daher nehmen die meisten Token 18 Dezimalstellen an und geben den Gesamtvorrat und andere Ergebnisse wie folgt zurück: 10000000000000000000000 für 1 Token. Nicht jeder Token hat 18 Dezimalstellen. Darauf müssen Sie beim Umgang mit Token unbedingt achten.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Gibt die Anzahl der Token zurück, die eine Adresse (`Konto`) besitzt. Diese Funktion ist ein Getter und verändert den Zustand des Vertrags nicht.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Der ERC-20-Standard ermöglicht es einer Adresse, einer anderen Adresse eine Genehmigung zu erteilen, um Token von ihr abrufen zu können. Dieser Getter gibt die verbleibende Anzahl an Token zurück, die der `Spender` im Namen des `Owner` ausgeben darf. Diese Funktion ist ein Getter und ändert den Zustand des Vertrags nicht. Sie sollte standardmäßig 0 zurückgeben.

## Funktionen {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Verschiebt die `Anzahl` von Token von der Adresse des Funktionsaufrufers (`msg.sender`) zur Empfängeradresse. Diese Funktion löst das später definierte Ereignis `Transfer` aus. Sie gibt true zurück, wenn die Übertragung möglich war.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Legen Sie die Höhe der `Allowance` also die Freigabe fest, die der `Spender` vom Guthaben des Funktionsaufrufers (`msg.sender`) übertragen darf. Diese Funktion löst das Genehmigungsereignis aus. Die Funktion gibt zurück, ob die Freigabe erfolgreich gesetzt wurde.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Verschiebt die `Anzahl` an Token vom `Sender` zum `Recipient`, also Empfänger, unter Verwendung des Genehmigungsmechanismus. Der Betrag wird dann von der Vergütung des Abfragers abgezogen. Diese Funktion löst das Ereignis `Transfer` aus.

## Ereignisse {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Dieses Ereignis wird ausgegeben, wenn die Anzahl an Token (Wert) von der `from`-Adresse an die `to`-Adresse gesendet wird.

Bei der Prägung neuer Token erfolgt die Überweisung in der Regel `von der` 0x00..0000-Adresse, während im Falle von brennenden Token die Übertragung `zu` 0x00..0000 erfolgt.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Dieses Ereignis wird ausgegeben, wenn die Anzahl an Token (`value`) vom `Owner`, also Eigentümer, zur Verwendung durch den `Spender` genehmigt wurde.

## Eine einfache Implementierung von ERC-20-Token {#a-basic-implementation-of-erc-20-tokens}

Im Folgenden finden Sie einen sehr einfachen Code, den Sie als Grundlage für Ihren ERC-20-Token verwenden können:

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

Eine weitere hervorragende Implementierung des ERC-20 Token-Standards ist die [OpenZeppelin ERC-20 Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
