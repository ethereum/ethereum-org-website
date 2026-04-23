---
title: Comprendere il contratto intelligente del token ERC-20
description: Scopri come implementare lo standard del token ERC-20 con un esempio completo di contratto intelligente in Solidity e la relativa spiegazione.
author: "jdourlens"
tags: ["contratti intelligenti", "token", "Solidity", "erc-20"]
skill: beginner
breadcrumb: Basi del token ERC-20
lang: it
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Uno dei più significativi [standard per i contratti intelligenti](/developers/docs/standards/) su Ethereum è noto come [ERC-20](/developers/docs/standards/tokens/erc-20/), che è emerso come lo standard tecnico utilizzato per tutti i contratti intelligenti sulla blockchain di Ethereum per le implementazioni di token fungibili.

L'ERC-20 definisce un elenco comune di regole a cui tutti i token fungibili di Ethereum dovrebbero aderire. Di conseguenza, questo standard per i token consente agli sviluppatori di tutti i tipi di prevedere accuratamente come funzioneranno i nuovi token all'interno del più ampio sistema di Ethereum. Questo semplifica e agevola i compiti degli sviluppatori, perché possono procedere con il loro lavoro, sapendo che ogni nuovo progetto non dovrà essere rifatto ogni volta che viene rilasciato un nuovo token, a patto che il token segua le regole.

Ecco, presentate come un'interfaccia, le funzioni che un ERC-20 deve implementare. Se non sei sicuro di cosa sia un'interfaccia: dai un'occhiata al nostro articolo sulla [programmazione OOP in Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Ecco una spiegazione riga per riga a cosa serve ogni funzione. Dopodiché presenteremo una semplice implementazione del token ERC-20.

## Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Restituisce la quantità di token esistenti. Questa funzione è un getter e non modifica lo stato del contratto. Tieni presente che non ci sono numeri in virgola mobile (float) in Solidity. Pertanto, la maggior parte dei token adotta 18 decimali e restituirà l'offerta totale e altri risultati come segue: 1000000000000000000 per 1 token. Non tutti i token hanno 18 decimali e questo è un aspetto a cui devi prestare molta attenzione quando hai a che fare con i token.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Restituisce la quantità di token posseduti da un indirizzo (`account`). Questa funzione è un getter e non modifica lo stato del contratto.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Lo standard ERC-20 consente a un indirizzo di concedere un'indennità (allowance) a un altro indirizzo per poterne prelevare i token. Questo getter restituisce il numero rimanente di token che lo `spender` (spenditore) sarà autorizzato a spendere per conto dell'`owner` (proprietario). Questa funzione è un getter, non modifica lo stato del contratto e dovrebbe restituire 0 per impostazione predefinita.

## Funzioni {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Sposta l'`amount` (quantità) di token dall'indirizzo del chiamante della funzione (`msg.sender`) all'indirizzo del destinatario. Questa funzione emette l'evento `Transfer` definito in seguito. Restituisce true se il trasferimento è stato possibile.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Imposta la quantità di `allowance` (indennità) che lo `spender` è autorizzato a trasferire dal saldo del chiamante della funzione (`msg.sender`). Questa funzione emette l'evento Approval. La funzione restituisce se l'indennità è stata impostata con successo.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Sposta l'`amount` di token dal `sender` (mittente) al `recipient` (destinatario) utilizzando il meccanismo di indennità. L'importo viene quindi detratto dall'indennità del chiamante. Questa funzione emette l'evento `Transfer`.

## Eventi {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Questo evento viene emesso quando la quantità di token (valore) viene inviata dall'indirizzo `from` (da) all'indirizzo `to` (a).

Nel caso in cui si debbano coniare nuovi token, il trasferimento è solitamente `from` (dall') indirizzo 0x00..0000, mentre nel caso in cui si brucino token il trasferimento è `to` (all') indirizzo 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Questo evento viene emesso quando la quantità di token (`value`) viene approvata dall'`owner` per essere utilizzata dallo `spender`.

## Un'implementazione di base dei token ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Ecco il codice più semplice su cui basare il tuo token ERC-20:

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

Un'altra eccellente implementazione dello standard del token ERC-20 è l'[implementazione ERC-20 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).