---
title: Standard dei token ERC-223
description: Una panoramica dello standard per token fungibili ERC-223, come funziona e un confronto con ERC-20.
lang: it
---

## Introduzione {#introduction}

### Cos'è ERC-223? {#what-is-erc223}

ERC-223 è uno standard per token fungibili simile allo standard ERC-20. La differenza principale è che ERC-223 definisce non solo l'API del token ma anche la logica per trasferire i token dal mittente al destinatario. Introduce un modello di comunicazione che permette la gestione dei trasferimenti di token da parte del destinatario.

### Differenze rispetto a ERC-20 {#erc20-differences}

ERC-223 affronta alcune limitazioni di ERC-20 e introduce un nuovo metodo di interazione tra il contratto del token e un contratto che potrebbe ricevere i token. Ci sono alcune cose che sono possibili con ERC-223 ma non con ERC-20:

- La gestione del trasferimento dei token da parte del destinatario: i destinatari possono rilevare che un token ERC-223 è stato depositato.
- Il rifiuto di token inviati erroneamente: se un utente manda dei token ERC-223 a un contratto che non dovrebbe ricevere token, il contratto può rifiutare la transazione impedendo la perdita di token.
- Metadati nei trasferimenti: i token ERC-223 possono includere metadati, permettendo di allegare informazioni arbitrarie alle transazioni di token.

## Prerequisiti {#prerequisites}

- [Conti](/developers/docs/accounts)
- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Standard dei token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-223 è uno standard di token che implementa un'API per i token con contratti intelligenti. Dichiara anche un'API per i contratti che dovrebbero ricevere token ERC-223. I contratti che non supportano l'API ERC-223 del destinatario non possono ricevere token ERC-223, impedendo un errore utente.

Se un contratto intelligente implementa i seguenti metodi ed eventi può essere definito contratto di toke compatibile con ERC-223. Una volta distribuito,
sarà responsabile di tener traccia dei token creati su Ethereum.

Il contratto non è obbligato ad avere solo queste funzioni e uno sviluppatore può aggiungere qualsiasi altra funzione da diversi standard di token a questo contratto. Per esempio, le funzioni `approve` e `transferFrom` non sono parte dello standard ERC-223 ma queste funzioni potrebbero essere implementate se necessario.

Da [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Metodi {#methods}

Il token ERC-223 deve implementare i metodi seguenti:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Un contratto che debba ricevere token ERC-223 deve implementare il metodo seguente:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Se i token ERC-223 sono inviati a un contratto che non ha implementato la funzione `tokenReceived(..)`, il trasferimento deve fallire e i token non possono essere spostati dal saldo del mittente.

### Eventi {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Esempi {#examples}

L'API del token ERC-223 è simile a quella del ERC-20, quindi dalla prospettiva dello sviluppo della UI non ci sono differenze. L'unica eccezione qui è che i token ERC-223 potrebbero non avere le funzioni `approve` + `transferFrom` dato che sono facoltative per questo standard.

#### Esempi in Solidity {#solidity-example}

L'esempio seguente illustra come funziona un contratto del token ERC-223 di base:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Adesso vogliamo che un altro contratto accetti i depositi di `tokenA` presupponendo che il tokenA sia un token ERC-223. Il contratto deve accettare solo tokenA e rigettare qualsiasi altro token. Quando il contratto riceve tokenA deve emettere un evento `Deposit()` e aumentare il valore della variabile interna `deposits`.

Ecco il codice:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Domande frequenti {#faq}

### Cosa succede se mandiamo dei tokenB al contratto? {#sending-tokens}

La transazione fallirà e il trasferimento dei token non avrà luogo. I token saranno restituiti all'indirizzo del mittente.

### Come possiamo fare un deposito su questo contratto? {#contract-deposits}

Chiamare la funzione `transfer(address,uint256)` o `transfer(address,uint256,bytes)` del token ERC-223 specificando l'indirizzo del `RecipientContract`.

### Cosa succede se trasferiamo un token ERC-20 a questo contratto? {#erc-20-transfers}

Se un token ERC-20 viene inviato al `RecipientContract`, i token saranno trasferiti ma il trasferimento non verrà riconosciuto (non sarà attivato alcun evento `Deposit()` e il valore del deposito non cambierà). Non è possibile filtrare o impedire depositi di ERC-20 indesiderati.

### E nel caso volessimo eseguire qualche funzione dopo che il deposito del token è completato? {#function-execution}

Ci sono vari modi per farlo. In questo esempio seguiamo il metodo che rende i trasferimenti di ERC-223 identici a trasferimenti di Ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Quando il `RecipientContract` riceverà un token ERC-223 il contratto eseguirà una funzione codificata come parametro `_data` della transazione del token, in modo identico a come le transazioni di Ether codificano le chiamate di funzioni come transazioni `data`. Leggi [il campo dati](https://ethereum.org/en/developers/docs/transactions/#the-data-field) per maggiori informazioni.

Nell'esempio precedente un token ERC-223 deve essere trasferito all'indirizzo del `RecipientContract` con la funzione `transfer(address,uin256,bytes calldata _data)`. Se il parametro dei dati sarà `0xc2985578` (la firma di una funzione `foo()`) allora la funzione foo() sarà invocata dopo che il deposito del token è stato ricevuto e l'evento Foo() è stato attivato.

I parametri possono essere codificati anche come `data` del trasferimento del token, per esempio possiamo chiamare la funzione bar() con valore 12345 per `_someNumber`. In questo caso `data` deve essere `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` dove `0x0423a132` è la firma della funzione `bar(uint256)` e `00000000000000000000000000000000000000000000000000000000000004d2` è 12345 in uint256.

## Limitazioni {#limitations}

Nonostante ERC-223 affronti diversi problemi che si trovano nello standard ERC-20, non è privo di limitazioni:

- Adozione e compatibilità: ERC-223 non è ancora adottato ampiamente, il che potrebbe limitarne la compatibilità con strumenti e piattaforme esistenti.
- Compatibilità retroattiva: ERC-223 non è compatibile con le versioni precedenti di ERC-20, il che significa che i contratti ERC-20 e gli strumenti esistenti non funzionano con i token ERC-223 senza modifiche.
- Costi del gas: ulteriori controlli e funzionalità nei trasferimenti di ERC-223 potrebbero risultare in costi del gas maggiori rispetto a transazioni di ERC-20.

## Letture consigliate {#further-reading}

- [EIP-223: standard per token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Proposta iniziale di ERC-223](https://github.com/ethereum/eips/issues/223)
