---
title: Înțelegerea contractului inteligent de token ERC-20
description: Introducere despre implementarea primului dvs. contract inteligent pe o rețea de testare Ethereum
author: "jdourlens"
tags:
  - "contracte inteligente"
  - "tokenuri"
  - "solidity"
  - "noțiuni de bază"
  - "erc-20"
skill: beginner
lang: ro
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Unul dintre cele mai importante [standarde ale contractelor inteligente](/developers/docs/standards/) de pe Ethereum este cunoscut sub numele de [ERC-20](/developers/docs/standards/tokens/erc-20/); a apărut ca standard tehnic utilizat pentru toate contractele inteligente de pe blockchain-ul Ethereum pentru implementarea tokenurilor fungibile.

ERC-20 definește o listă comună de reguli la care trebuie să adere toate tokenurile fungibile Ethereum. În consecință, acest token standard le permite programatorilor de toate tipurile să estimeze cu precizie modul în care vor funcţiona noile tokenuri în cadrul unui sistem Ethereum mai mare. Acest lucru simplifică și facilitează sarcinile programatorilor, deoarece îşi pot continua lucrările știind că fiecare proiect nou nu va trebui să fie refăcut de fiecare dată când este lansat un nou token, atâta timp cât tokenul urmează regulile.

Iată funcțiile pe care trebuie să leimplementeze ERC-20, prezentate ca interfaţă. Dacă nu știţi sigur ce este o interfață: citiţi articolul nostru despre [programarea OOP în Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Iată un explicator linie cu linie a utilităţii fiecărei funcții. După aceasta vom prezenta o implementare simplă a unui token ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Răspunde prin numărul de tokenuri existente. Această funcție este un „getter” și nu modifică starea contractului. Rețineţi că nu există virgule mobile în Solidity. Prin urmare, cele mai multe tokenuri adoptă 18 zecimale și vor răspunde prin totalul disponibil și alte rezultate după cum urmează 1000000000000000000 pentru 1 token. Nu toate tokenurile au 18 zecimale și acesta este un lucru căruia să-i acordaţi atenţie când aveţi de-a face cu tokenurile.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Răspunde prin numărul de tokenuri deținute de o adresă (`account`). Această funcție este un „getter” și nu modifică starea contractului.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standardul ERC-20 permite unei adrese să ofere unei alte adrese o alocaţie pentru a putea recupera tokenuri de la aceasra. Această funcție „getter” returnează numărul rămas de tokenuri pe care funcția `spender` va putea să le cheltuiască în numele proprietarului, funcția `owner`. Această funcție este un „getter” și nu modifică starea contractului și ar trebui să răspundă prin 0 în mod implicit.

## Funcții {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Mută numărul de token-uri `amount` de la adresa apelantului funcției (`msg.sender`) la adresa destinatarului. Această funcție emite evenimentul `Transfer` definit ulterior. Răspunde prin „true” dacă transferul a fost posibil.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Setează cât este `suma alocată` ce i se permite `spenderului`-să o transfere din soldul funcției „caller” (`msg.sender`). Această funcție emite evenimentul „Approval”. Funcția răspunde dacă „allowance” a fost setată cu succes.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Mută `amount` (numărul) de tokenuri de la `expeditor` la `destinatar` folosind mecanismul „allowance” (alocație). Apoi „amount” este dedus din „allowance” al apelantului. Această funcție emite evenimentul `Transfer`.

## Evenimente {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Acest eveniment este emis atunci când cantitatea de tokenuri (valori) este trimisă de la adresa `from` la adresa `to`.

În cazul emiterii de noi tokenuri, transferul este de obicei de la adresa `from` 0x00..0000, în timp ce în cazul arderii de tokenuri, transferul este trimis la adresa `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Acest eveniment este emis atunci când cantitatea de tokenuri (`value`) este aprobată de `owner` pentru a fi utilizate de către `spender`.

## O implementare elementară a tokenurilor ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Iată cel mai simplu cod pe care să vă bazaţi tokenul ERC-20:

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

Această implementare utilizează biblioteca SafeMath. Citiţi tutorialul nostru dacă doriţi să afliaţi [cum vă ajută biblioteca să acționaţi în caz de atac overflows și underflow în contractele dvs. inteligente](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/).

O altă excelentă implementare a standardului de token ERC-20 este [Implementarea OpenZeppelin-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
