---
title: Standard dei Token ERC-223
description: Una panoramica dello standard dei token fungibili ERC-223, come funziona e un confronto con l'ERC-20.
lang: it
---

## Introduzione {#introduction}

### Cos'è l'ERC-223? {#what-is-erc223}

L'ERC-223 è uno standard per i token fungibili, simile allo standard ERC-20. La differenza chiave è che l'ERC-223 definisce non solo l'API del token, ma anche la logica per il trasferimento dei token dal mittente al destinatario. Introduce un modello di comunicazione che consente di gestire i trasferimenti di token dal lato del destinatario.

### Differenze rispetto all'ERC-20 {#erc20-differences}

L'ERC-223 affronta alcune limitazioni dell'ERC-20 e introduce un nuovo metodo di interazione tra il contratto del token e un contratto che potrebbe ricevere i token. Ci sono alcune cose che sono possibili con l'ERC-223 ma non con l'ERC-20:

- Gestione del trasferimento di token dal lato del destinatario: i destinatari possono rilevare che un token ERC-223 viene depositato.
- Rifiuto di token inviati in modo improprio: se un utente invia token ERC-223 a un contratto che non dovrebbe ricevere token, il contratto può rifiutare la transazione, prevenendo la perdita di token.
- Metadati nei trasferimenti: i token ERC-223 possono includere metadati, consentendo di allegare informazioni arbitrarie alle transazioni di token.

## Prerequisiti {#prerequisites}

- [Account](/developers/docs/accounts)
- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Standard dei token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corpo {#body}

L'ERC-223 è uno standard di token che implementa un'API per i token all'interno dei contratti intelligenti. Dichiara inoltre un'API per i contratti che dovrebbero ricevere token ERC-223. I contratti che non supportano l'API del Ricevitore ERC-223 non possono ricevere token ERC-223, prevenendo errori da parte dell'utente.

Se un contratto intelligente implementa i seguenti metodi ed eventi, può essere definito un contratto di token compatibile con l'ERC-223. Una volta distribuito, sarà responsabile di tenere traccia dei token creati su Ethereum.

Il contratto non è obbligato ad avere solo queste funzioni e uno sviluppatore può aggiungere a questo contratto qualsiasi altra funzionalità da diversi standard di token. Ad esempio, le funzioni `approve` e `transferFrom` non fanno parte dello standard ERC-223, ma queste funzioni potrebbero essere implementate qualora fosse necessario.

Da [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Metodi {#methods}

Il token ERC-223 deve implementare i seguenti metodi:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Un contratto che dovrebbe ricevere token ERC-223 deve implementare il seguente metodo:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Se i token ERC-223 vengono inviati a un contratto che non implementa la funzione `tokenReceived(..)`, il trasferimento deve fallire e i token non devono essere spostati dal saldo del mittente.

### Eventi {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Esempi {#examples}

L'API del token ERC-223 è simile a quella dell'ERC-20, quindi dal punto di vista dello sviluppo dell'interfaccia utente non c'è alcuna differenza. L'unica eccezione qui è che i token ERC-223 potrebbero non avere le funzioni `approve` + `transferFrom`, poiché queste sono opzionali per questo standard.

#### Esempi in Solidity {#solidity-example}

Il seguente esempio illustra come opera un contratto di token ERC-223 di base:

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

Ora vogliamo che un altro contratto accetti depositi di `tokenA` supponendo che tokenA sia un token ERC-223. Il contratto deve accettare solo tokenA e rifiutare qualsiasi altro token. Quando il contratto riceve tokenA, deve emettere un evento `Deposit()` e aumentare il valore della variabile interna `deposits`.

Ecco il codice:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // L'unico token che vogliamo accettare.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // È importante capire che all'interno di questa funzione
        // msg.sender è l'indirizzo di un token che viene ricevuto,
        // msg.value  è sempre 0 poiché il contratto del token non possiede né invia ether nella maggior parte dei casi,
        // _from      è il mittente del trasferimento del token,
        // _value     è la quantità di token che è stata depositata.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Domande frequenti {#faq}

### Cosa succederà se inviamo del tokenB al contratto? {#sending-tokens}

La transazione fallirà e il trasferimento dei token non avverrà. I token verranno restituiti all'indirizzo del mittente.

### Come possiamo effettuare un deposito su questo contratto? {#contract-deposits}

Chiama la funzione `transfer(address,uint256)` o `transfer(address,uint256,bytes)` del token ERC-223, specificando l'indirizzo del `RecipientContract`.

### Cosa succederà se trasferiamo un token ERC-20 a questo contratto? {#erc-20-transfers}

Se un token ERC-20 viene inviato al `RecipientContract`, i token verranno trasferiti, ma il trasferimento non sarà riconosciuto (nessun evento `Deposit()` verrà attivato e il valore dei depositi non cambierà). I depositi ERC-20 indesiderati non possono essere filtrati o prevenuti.

### E se volessimo eseguire una funzione dopo il completamento del deposito del token? {#function-execution}

Ci sono diversi modi per farlo. In questo esempio seguiremo il metodo che rende i trasferimenti ERC-223 identici ai trasferimenti di ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // L'unico token che vogliamo accettare.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Gestire la transazione in entrata ed eseguire una successiva chiamata di funzione.
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

Quando il `RecipientContract` riceverà un token ERC-223, il contratto eseguirà una funzione codificata come parametro `_data` della transazione del token, in modo identico a come le transazioni di ether codificano le chiamate di funzione come `data` della transazione. Leggi [il campo dei dati](/developers/docs/transactions/#the-data-field) per maggiori informazioni.

Nell'esempio sopra, un token ERC-223 deve essere trasferito all'indirizzo del `RecipientContract` con la funzione `transfer(address,uin256,bytes calldata _data)`. Se il parametro dei dati sarà `0xc2985578` (la firma di una funzione `foo()`), allora la funzione foo() verrà invocata dopo aver ricevuto il deposito del token e verrà attivato l'evento Foo().

I parametri possono essere codificati anche nei `data` del trasferimento del token, ad esempio possiamo chiamare la funzione bar() con il valore 12345 per `_someNumber`. In questo caso i `data` devono essere `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` dove `0x0423a132` è la firma della funzione `bar(uint256)` e `00000000000000000000000000000000000000000000000000000000000004d2` è 12345 come uint256.

## Limitazioni {#limitations}

Sebbene l'ERC-223 affronti diversi problemi riscontrati nello standard ERC-20, non è privo di limitazioni:

- Adozione e compatibilità: l'ERC-223 non è ancora ampiamente adottato, il che potrebbe limitare la sua compatibilità con gli strumenti e le piattaforme esistenti.
- Retrocompatibilità: l'ERC-223 non è retrocompatibile con l'ERC-20, il che significa che i contratti e gli strumenti ERC-20 esistenti non funzioneranno con i token ERC-223 senza modifiche.
- Costi del gas: i controlli e le funzionalità aggiuntive nei trasferimenti ERC-223 potrebbero comportare costi del gas più elevati rispetto alle transazioni ERC-20.

## Letture consigliate {#further-reading}

- [EIP-223: Standard dei Token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Proposta iniziale dell'ERC-223](https://github.com/ethereum/eips/issues/223)