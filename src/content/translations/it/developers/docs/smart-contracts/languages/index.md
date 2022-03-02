---
title: Linguaggi degli Smart Contract
description: Panoramica e confronto dei due linguaggi principali degli Smart Contract - Solidity e Viper.
lang: it
sidebar: true
---

Uno degli aspetti positivi di Ethereum è che gli Smart Contract possono essere programmati utilizzando linguaggi relativamente comodi per gli sviluppatori. Se hai esperienza con Python o altri [linguaggi a parentesi graffa](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), troverai un linguaggio con una sintassi familiare.

I due linguaggi più attivi e gestiti sono:

- Solidity
- Vyper

Gli sviluppatori più esperti potrebbero prendere in considerazione anche Yul, un linguaggio intermedio per la [macchina virtuale Ethereum](/developers/docs/evm/), oppure Yul +, un'estensione di Yul.

Se sei curioso e vorresti aiutare a testare nuovi linguaggi ancora in via di forte sviluppo, puoi sperimentare con Fe, un linguaggio emergente nel campo degli smart contract che al momento è ancora agli inizi.

## Prerequisiti {#prerequisites}

Una conoscenza pregressa dei linguaggi di programmazione, in particolare JavaScript o Python, può aiutarti a capire le differenze tra i linguaggi degli Smart Contract. Ti consigliamo inoltre di approfondire le nozioni connesse agli smart contract prima di addentrarti nei confronti tra i vari linguaggi. [Introduzione agli smart contract](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Linguaggio d'alto livello orientato agli oggetti per l'implementazione di smart contract.
- Linguaggio a parentesi graffa profondamente influenzato da C++.
- Statico (il tipo di una variabile è noto al momento della compilazione).
- Supporta:
  - Ereditarietà (è possibile estendere altri contratti).
  - Librerie (è possibile creare codice riutilizzabile che può essere chiamato da contratti diversi, come le funzioni statiche in una classe statica in altri linguaggi di programmazione orientati agli oggetti).
  - Tipi di dati complessi definiti dall'utente.

### Link importanti {#important-links}

- [Documentazione](https://docs.soliditylang.org/en/latest/)
- [Solidity Language Portal](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity/) collegato a [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Solidity Blog](https://blog.soliditylang.org/)
- [Twitter di Solidity](https://twitter.com/solidity_lang)

### Esempio di contratto {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // La parola chiave "public" rende le variabili
    // accessibili da altri contratti
    address public minter;
    mapping (address => uint) public balances;

    // Gli eventi consentono ai client di reagire a specifiche
    // modifiche ai contratti che vengono dichiarate
    event Sent(address from, address to, uint amount);

    // Il codice del costruttore viene eseguito solo quando il contratto
    // viene creato
    constructor() {
        minter = msg.sender;
    }

    // Invia una quantità di monete appena create a un indirizzo
    // Può essere chiamato solo dal creatore del contratto
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Invia una quantità di monete esistenti
    // da qualsiasi chiamante a un indirizzo
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Questo esempio dà un'idea della sintassi di un contratto in Solidity. Per una descrizione più dettagliata di funzioni e variabili, [consulta la documentazione](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Linguaggio di programmazione Pythonic
- Tipizzazione forte
- Codice del compilatore contenuto e comprensibile
- Ha volutamente meno funzionalità di Solidity con l'obiettivo di rendere i contratti più sicuri e più facili da controllare. Vyper non supporta:
  - Modificatori
  - Ereditarietà
  - Assembly inline
  - Overloading delle funzioni
  - Overloading degli operatori
  - Chiamate ricorsive
  - Cicli di lunghezza infinita
  - Punti fissi binari

Per ulteriori informazioni, [consulta la logica Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Link importanti {#important-links-1}

- [Documentazione](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper Gitter Chatroom](https://gitter.im/vyperlang/community)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Update Jan 8, 2020](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

### Esempio {#example}

```python
# Apertura asta

# Parametri d'asta
# Il beneficiario riceve denaro dal miglior offerente
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Stato attuale dell'asta
highestBidder: public(address)
highestBid: public(uint256)

# Imposta a true alla fine per non permettere più modifiche
ended: public(bool)

# Tiene traccia delle offerte rimborsate in modo da poter seguire il modello di prelievo
pendingReturns: public(HashMap[address, uint256])

# Crea una semplice asta con `_bidding_time`
# tempo di offerta in secondi per conto
# dell'indirizzo del beneficiario `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Offerta sull'asta con il valore inviato
# insieme a questa transazione.
# Il valore sarà rimborsato solo se l'asta
# non viene vinta.
@external
@payable
def bid():
    # Controlla se il periodo di offerta è finito.
    assert block.timestamp < self.auctionEnd
    # Verifica se l'offerta è abbastanza alta
    assert msg.value > self.highestBid
    # Tiene traccia del rimborso all'offerente più alto precedente
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Tiene traccia della nuova offerta più alta
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Preleva un'offerta precedentemente rimborsata. Il modello di prelievo è
# utilizzato qui per evitare un problema di sicurezza. Se i rimborsi venissero inviati direttamente
# come parte di bid(), un contratto di offerta malevolo potrebbe bloccarli
# e quindi bloccare le nuove offerte più alte in arrivo.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Termina l'asta e invia l'offerta più alta
# al beneficiario.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. controllo delle condizioni
    # 2. esecuzione delle azioni (potenzialmente modificando le condizioni)
    # 3. interazione con altri contratti
    # Se queste fasi sono mischiate, l'altro contratto potrebbe eseguire
    # nuove chiamate al contratto corrente e modificare lo stato o causare
    # effetti (pagamento di ether) da eseguire più volte.
    # Se le funzioni chiamate internamente includono l'interazione con contratti esterni
    # devono essere considerate anche interazioni con
    # contratti esterni.

    # 1. Condizioni
    # Controlla se la fine dell'asta è stata raggiunta
    assert block.timestamp >= self.auctionEnd
    # Verifica se questa funzione è già stata chiamata
     assert not self.ended

    # 2. Effetti
    self.ended = True

    # 3. Interazione
    send(self.beneficiary, self.highestBid)
```

Questo esempio dovrebbe dare un'idea della sintassi di un contratto in Vyper. Per una descrizione più dettagliata di funzioni e variabili, [consulta la documentazione](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul e Yul+ {#yul}

Se non hai esperienza con Ethereum e non hai ancora usato i linguaggi degli Smart Contract, consigliamo di iniziare con Solidity o Vyper. Prendi in considerazione Yul o Yul+ solo quando hai acquisito familiarità con le best practice di sicurezza per gli smart contract e le specifiche per l'utilizzo dell'EVM.

**Yul**

- Linguaggio di livello intermedio per Ethereum.
- Supporta l'[EVM](/developers/docs/evm) ed [Ewasm](https://github.com/ewasm), un WebAssembly orientato a Ethereum ed è progettato per essere un denominatore comune utilizzabile di entrambe le piattaforme.
- Buona soluzione per le fasi di ottimizzazione di alto livello che possono essere utili per entrambe le piattaforme, EVM ed eWASM.

**Yul+**

- Un'estensione a Yul molto efficiente e di basso livello.
- Inizialmente progettata per un contratto [optimistic rollup](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups).
- Yul+ può essere considerato come una proposta di upgrade sperimentale a Yul che aggiunge nuove funzionalità.

### Link importanti {#important-links-2}

- [Yul Documentation](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Documentation](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Yul+ Introduction Post](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Esempio di contratto {#example-contract-2}

Il seguente esempio semplice implementa una funzione di potenza. Può essere compilato usando `solc --strict-assembly --bin input.yul`. L'esempio deve essere incluso nel file input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Se hai già una buona esperienza con gli Smart Contract, un'implementazione completa di ERC20 in Yul è disponibile [qui](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Linguaggio digitato staticamente per la Macchina Virtuale di Ethereum (EVM).
- Ispirato da Python e Rust.
- Mira a esser facile da imparare, anche per sviluppatori nuovi all'ecosistema di Ethereum.
- Lo sviluppo di Fe è ancora alle fasi iniziali e a gennaio 2021 è stata rilasciata la versione alfa del linguaggio.

### Link importanti {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Annuncio di Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Tabella di marcia 2021 di Fe](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat Discord di Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter di Fe](https://twitter.com/official_fe)

### Esempio di contratto {#example-contract-3}

Il seguente è un contratto semplice implementato in Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Come scegliere {#how-to-choose}

Come avviene con qualsiasi altro linguaggio di programmazione, si tratta principalmente di scegliere lo strumento giusto per l'operazione da svolgere, in base alle preferenze personali.

Ecco alcuni aspetti da considerare se non hai ancora provato i vari linguaggi:

### Quali vantaggi offre Solidity? {#solidity-advantages}

- Se non hai esperienza, sono disponibili molti tutorial e strumenti di apprendimento. Scopri di più nella sezione [Impara scrivendo codice](/developers/learning-tools/).
- Disponibilità di strumenti utili per sviluppatori.
- Solidity ha un'estesa community di sviluppatori, quindi probabilmente troverai risposte alle tue domande abbastanza rapidamente.

### Quali vantaggi offre Vyper? {#vyper-advatages}

- Ottimo modo per iniziare per gli sviluppatori di Python che vogliono scrivere smart contract.
- Vyper ha un numero minore di funzionalità che lo rendono perfetto per la prototipazione rapida di idee.
- Vyper vuole facilitare l'audit del codice ed essere leggibile il più possibile.

### Quali vantaggi offrono Yul e Yul+? {#yul-advantages}

- Linguaggio di basso livello, semplicistico e funzionale.
- Consente di avvicinarsi all'EVM grezza, il che può aiutare a ottimizzare il consumo di carburante da parte dei contratti.

## Confronto tra linguaggi {#language-comparisons}

Per confrontare sintassi di base, ciclo di vita del contratto, interfacce, operatori, strutture di dati, funzioni, flusso di controllo e altro, consulta questo [contenuto riassuntivo di Auditless](https://reference.auditless.com/cheatsheet/)

## Letture consigliate {#further-reading}

- [Solidity Contracts Library by OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
