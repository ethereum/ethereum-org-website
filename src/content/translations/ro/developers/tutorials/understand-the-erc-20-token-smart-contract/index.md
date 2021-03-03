---
title: Înțelegerea contractului inteligent ERC-20
description: O introducere în implementarea primului tău contract inteligent pe o rețea de testare Ethereum
author: "jdourlens"
tags:
  - "contracte inteligente"
  - "tokenuri"
  - "solidity"
  - "noțiuni de bază"
  - "erc-20"
skill: începător
lang: ro
sidebar: true
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Unul dintre cele mai importante [standarde de contract inteligent](/developers/docs/standards/) pe Ethereum este cunoscut sub numele de [ERC-20](/developers/docs/standards/tokens/erc-20/); a apărut ca standard tehnic utilizat pentru toate contractele inteligente de pe blockchain-ul Ethereum pentru implementarea tokenurilor fungibile.

ERC-20 definește o listă comună de reguli la care trebuie să adere toate tokenurile fungibile Ethereum. În consecință, acest token standard le permite programatorilor de toate tipurile să prezică cu precizie modul în care noile tokenuri vor funcționa în cadrul unui sistem Ethereum mai mare. Acest lucru simplifică și ușurează sarcinile programatorilor, deoarece pot lucra în continuare știind că fiecare proiect nou nu va trebui să fie refăcut de fiecare dată când este lansat un nou token, atâta timp cât tokenul urmează regulile.

Aici, sunt prezentate ca o interfață, funcțiile pe care trebuie să leimplementeze ERC-20. Dacă nu știi sigur ce este o interfață: citește articolul nostru despre [programarea OOP în Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Iată un explicator linie cu linie a fiecărei funcții. După aceasta vom prezenta o implementare simplă a unui token ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Returnează numărul de tokenuri existente. Această funcție este un „getter” și nu modifică starea contractului. Reține că nu există virgule mobile în Solidity. Prin urmare, cele mai multe tokenuri adoptă 18 zecimale și vor returna totalul de aprovizionare și alte rezultate după cum urmează 1000000000000000000 pentru 1 token. Nu toate tokenurile au 18 zecimale și acesta este un lucru pe care trebuie să-l urmărești atunci când ai de-a face cu tokenuri.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Returnează numărul de tokenuri deținute de o adresă (`account`). Această funcție este un „getter” și nu modifică starea contractului.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standardul ERC-20 permite unei adrese să ofere unei alte adrese limita de tokenuri pe care ultima poate să le obțină de la prima. Această funcție „getter” returnează numărul rămas de tokenuri pe care funcția `spender` va putea să o cheltuiască în numele proprietarului, funcția `owner`. Această funcție este un „getter” și nu modifică starea contractului și ar trebui să întoarcă 0 în mod implicit.

## Funcții {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Mută numărul de tokenuri `amount` de la adresa apelantului funcției (`msg.sender`) la adresa destinatarului. Această funcție emite evenimentul `Transfer` definit mai târziu. Returnează „true” dacă transferul a fost posibil.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Setează cantitatea de `allowance` care este permisă `spender`-lui să o transfere din soldul funcției „caller” (`msg.sender`). Această funcție emite evenimentul „Approval”. Funcția returnează dacă „allowance” a fost setată cu succes.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Mută `amount` (numărul) de tokenuri de la `sender` la `recipient` folosind mecanismul „allowance” (alocație). Apoi „amount” este dedus din „allowance” al apelantului. Această funcție emite evenimentul `transfer`.

## Evenimente {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Acest eveniment este emis atunci când cantitatea de tokenuri (valori) este trimisă de la adresa `from` la adresa `to`.

În cazul emiterii de noi tokenuri, transferul este, de obicei, de la adresa `from` 0x00..0000, în timp ce în cazul distrugerii de tokenuri, transferul este trimis la adresa `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Acest eveniment este emis atunci când cantitatea de tokenuri (`value`) este aprobat de `owner` pentru a fi utilizate de către `spender`.

## O implementare de bază a tokenurilor ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Aici este cel mai simplu cod pe care să-ți bazezi tokenul tău ERC-20:

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

Această implementare utilizează biblioteca SafeMath. Citește tutorialul nostru dacă dorești să afli [cum te ajută biblioteca să acționezi în caz de atac overflows și underflow în contractele tale inteligente](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/).

O altă excelentă implementare a standardului de token ERC-20 este [Implementarea OpenZeppelin-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
