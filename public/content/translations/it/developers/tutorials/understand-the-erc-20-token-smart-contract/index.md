---
title: Comprendere il contratto intelligente del token ERC-20
description: Un'introduzione alla distribuzione del tuo primo contratto intelligente su una rete di prova di Ethereum
author: "jdourlens"
tags:
  - "contratti intelligenti"
  - "token"
  - "Solidity"
  - "erc-20"
skill: beginner
lang: it
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Uno dei più importanti [standard dei contratti intelligenti](/developers/docs/standards/) su Ethereum è noto come [ERC-20](/developers/docs/standards/tokens/erc-20/); è emerso come lo standard tecnico usato per tutti i contratti intelligenti sulla blockchain di Ethereum per le implementazioni di token fungibili.

ERC-20 definisce una serie comune di regole che tutti i token fruibili di Ethereum devono seguire. Di conseguenza, consente a sviluppatori di ogni tipologia di prevedere con precisione come funzioneranno i nuovi token nell'ecosistema Ethereum. Questo semplifica lo sviluppo, in quanto si può lavorare con la sicurezza che ogni nuovo progetto non dovrà essere rifatto in seguito al rilascio di un nuovo token, se questo segue le regole.

Ecco qui di seguito, rappresentate da un'interfaccia, le funzioni che un token ERC-20 deve implementare. Se non sai cos'è un'interfaccia, leggi il nostro articolo sulla [programmazione OOP in Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Ecco una spiegazione riga per riga di ciascuna funzione. In seguito presenteremo una semplice implementazione di un token ERC-20.

## Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Restituisce la quantità di token esistenti. Questa è una cosiddetta funzione getter e non altera lo stato del contratto. Tieni a mente che in Solidity non è prevista la virgola mobile. Perciò gran parte dei token adottano 18 decimali e restituiscono la disponibilità totale e altri risultati come 1000000000000000000 per 1 token. Non tutti i token hanno 18 decimali e questo è un aspetto a cui devi prestare molta attenzione quando interagisci con i token.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Restituisce la quantità di token posseduti da un indirizzo (`account`). Questa è una funzione getter e non altera lo stato del contratto.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Lo standard ERC-20 consente ad un indirizzo di trasferire una somma a un altro indirizzo in modo da potervi recuperare token. Questa funzione getter restituisce il numero rimanente di token che lo `spender` potrà spendere per conto dell'`owner`. Questa funzione è un getter e non altera lo stato del contratto; per default dovrebbe restituire 0.

## Funzioni {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Sposta la quantità (`amount`) di token dall'indirizzo di chiama la funzione (`msg.sender`) a quello del destinatario. Questa funzione emette l'evento `Transfer` definito in seguito. Restituisce true se il trasferimento è stato effettuato.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Aggiorna l'importo di `allowance` che lo `spender` può trasferire dal saldo di chi chiama la funzione (`msg.sender`). Questa funzione emette l'evento Approval. La funzione restituisce un valore che indica se la somma è stata impostata.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Trasferisce l'importo (`amount`) di token da `sender` a `recipient` usando il meccanismo della disponibilità. L'importo viene poi sottratto dalla disponibilità del chiamante. Questa funzione emette l'evento `Transfer`.

## Eventi {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Questo evento viene emesso quando la quantità di token (value) è inviata dall'indirizzo `from` all'indirizzo `to`.

Nel caso del conio di nuovi token, il trasferimento è solitamente `from` l'indirizzo 0x00..0000, mentre nel caso in cui i token sono bruciati, il trasferimento è `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Questo evento vien trasmesso ogni volta che la quantità di token (`value`) è approvata da `owner` per essere utilizzata da `spender`.

## Implementazione di base dei token ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Ecco il codice più semplice su cui basare un token ERC-20:

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

Un'altra eccellente implementazione dello standard token ERC-20 è l'[implementazione ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
