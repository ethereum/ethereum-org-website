---
title: "Porozumění chytrému kontraktu ERC-20 tokenu"
description: "Naučte se, jak implementovat standard ERC-20 tokenu s kompletním příkladem chytrého kontraktu v Solidity a jeho vysvětlením."
author: "jdourlens"
tags:
  - chytré kontrakty
  - tokeny
  - solidity
  - erc-20
skill: beginner
breadcrumb: "Základy ERC-20 tokenu"
lang: cs
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Jedním z nejvýznamnějších [standardů chytrých kontraktů](/developers/docs/standards/) na Ethereu je [ERC-20](/developers/docs/standards/tokens/erc-20/), který se stal technickým standardem používaným pro všechny chytré kontrakty na blockchainu Etherea pro implementace zaměnitelných tokenů.

ERC-20 definuje společný seznam pravidel, která by měly dodržovat všechny zaměnitelné tokeny na Ethereu. V důsledku toho tento standard tokenů umožňuje vývojářům všeho druhu přesně předvídat, jak budou nové tokeny fungovat v rámci širšího systému Etherea. To zjednodušuje a usnadňuje úkoly vývojářů, protože mohou pokračovat ve své práci s vědomím, že každý nový projekt nebude muset být předěláván pokaždé, když je vydán nový token, pokud tento token dodržuje pravidla.

Zde jsou ve formě rozhraní představeny funkce, které musí ERC-20 implementovat. Pokud si nejste jisti, co je to rozhraní: podívejte se na náš článek o [OOP programování v Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Zde je vysvětlení řádek po řádku, k čemu každá funkce slouží. Poté si představíme jednoduchou implementaci ERC-20 tokenu.

## Gettery {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Vrací množství existujících tokenů. Tato funkce je getter a nemění stav kontraktu. Mějte na paměti, že v Solidity neexistují čísla s plovoucí desetinnou čárkou (floats). Proto většina tokenů přijímá 18 desetinných míst a vrátí celkovou zásobu (total supply) a další výsledky následovně: 1000000000000000000 pro 1 token. Ne každý token má 18 desetinných míst, a to je něco, na co si při práci s tokeny musíte dát opravdu pozor.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Vrací množství tokenů vlastněných adresou (`account`). Tato funkce je getter a nemění stav kontraktu.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standard ERC-20 umožňuje adrese poskytnout povolený limit jiné adrese, aby z ní mohla vybírat tokeny. Tento getter vrací zbývající počet tokenů, které bude mít `spender` povoleno utratit jménem `owner`. Tato funkce je getter, nemění stav kontraktu a ve výchozím nastavení by měla vracet 0.

## Funkce {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Přesune `amount` tokenů z adresy volajícího funkce (`msg.sender`) na adresu příjemce. Tato funkce vyvolá událost `Transfer`, která je definována později. Vrací true, pokud byl převod možný.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Nastaví množství `allowance`, které má `spender` povoleno převést ze zůstatku volajícího funkce (`msg.sender`). Tato funkce vyvolá událost Approval. Funkce vrací, zda byl povolený limit úspěšně nastaven.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Přesune `amount` tokenů z `sender` na `recipient` pomocí mechanismu povoleného limitu. Částka (amount) je poté odečtena z povoleného limitu volajícího. Tato funkce vyvolá událost `Transfer`.

## Události {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tato událost je vyvolána, když je množství tokenů (value) odesláno z adresy `from` na adresu `to`.

V případě ražení nových tokenů je převod obvykle `from` adresy 0x00..0000, zatímco v případě spalování tokenů je převod `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Tato událost je vyvolána, když je množství tokenů (`value`) schváleno ze strany `owner` k použití pro `spender`.

## Základní implementace ERC-20 tokenů {#a-basic-implementation-of-erc-20-tokens}

Zde je ten nejjednodušší kód, ze kterého můžete při tvorbě svého ERC-20 tokenu vycházet:

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

Další vynikající implementací standardu ERC-20 tokenu je [implementace ERC-20 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).