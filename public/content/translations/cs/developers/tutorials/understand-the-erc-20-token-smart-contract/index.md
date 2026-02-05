---
title: Porozumění chytrému kontraktu tokenu ERC-20
description: Naučte se implementovat tokenový standard ERC-20 s kompletním příkladem a vysvětlením chytrého kontraktu v Solidity.
author: "jdourlens"
tags: [ "smart kontrakt účty", "tokeny", "solidity", "erc-20" ]
skill: beginner
lang: cs
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Jeden z nejvýznamnějších [standardů chytrých kontraktů](/developers/docs/standards/) na Ethereu je známý jako [ERC-20](/developers/docs/standards/tokens/erc-20/), který se stal technickým standardem používaným pro všechny chytré kontrakty na ethereovém blockchainu pro implementaci zaměnitelných tokenů.

ERC-20 definuje společný seznam pravidel, která by měly dodržovat všechny zaměnitelné ethereové tokeny. V důsledku toho tento tokenový standard umožňuje vývojářům všech typů přesně předvídat, jak budou nové tokeny fungovat v širším systému Etherea. To zjednodušuje a usnadňuje práci vývojářů, protože mohou pokračovat ve své práci s vědomím, že každý nový projekt nebude třeba předělávat pokaždé, když je vydán nový token, pokud se token řídí pravidly.

Zde jsou, prezentovány jako rozhraní, funkce, které musí ERC-20 implementovat. Pokud si nejste jisti, co je to rozhraní, přečtěte si náš článek o [OOP programování v Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Zde je vysvětlení řádek po řádku, k čemu jednotlivé funkce slouží. Poté si představíme jednoduchou implementaci tokenu ERC-20.

## Gettery {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Vrátí množství tokenů v oběhu. Tato funkce je getter a nemění stav kontraktu. Mějte na paměti, že v Solidity neexistují čísla s plovoucí desetinnou čárkou (floats). Proto většina tokenů používá 18 desetinných míst a celkovou zásobu a další výsledky vrátí jako 1000000000000000000 pro 1 token. Ne každý token má 18 desetinných míst a na to si opravdu musíte dávat pozor při práci s tokeny.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Vrátí množství tokenů vlastněných adresou (`account`). Tato funkce je getter a nemění stav kontraktu.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standard ERC-20 umožňuje, aby adresa udělila povolení jiné adrese, aby z ní mohla čerpat tokeny. Tento getter vrací zbývající počet tokenů, které bude moci `spender` utratit jménem `owner`a. Tato funkce je getter, nemění stav kontraktu a ve výchozím nastavení by měla vracet 0.

## Funkce {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Přesune `amount` tokenů z adresy volajícího funkce (`msg.sender`) na adresu příjemce. Tato funkce spouští událost `Transfer` definovanou později. Vrací hodnotu true, pokud byl převod možný.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Nastaví výši `allowance`, kterou smí `spender` převést ze zůstatku volajícího funkce (`msg.sender`). Tato funkce spouští událost Approval. Funkce vrací, zda bylo povolení úspěšně nastaveno.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Přesune `amount` tokenů z adresy `sender` na adresu `recipient` pomocí mechanismu povolení. Částka (`amount`) je poté odečtena z povolení volajícího. Tato funkce spouští událost `Transfer`.

## Události {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tato událost se spustí, když je množství tokenů (`value`) odesláno z adresy `from` na adresu `to`.

V případě ražby nových tokenů je převod obvykle `z` (`from`) adresy 0x00..0000, zatímco v případě pálení tokenů je převod `na` (`to`) 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Tato událost se spustí, když `owner` schválí množství tokenů (`value`) k použití pro `spender`a.

## Základní implementace tokenů ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Zde je nejjednodušší kód, ze kterého můžete vycházet při tvorbě svého tokenu ERC-20:

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

Další vynikající implementací tokenového standardu ERC-20 je [implementace ERC-20 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
