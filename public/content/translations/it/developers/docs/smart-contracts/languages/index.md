---
title: Linguaggi per gli smart contract
description: "Una panoramica e un confronto dei due principali linguaggi per gli smart contract: Solidity e Vyper."
lang: it
---

Un aspetto fantastico di [Ethereum](/) è che gli smart contract possono essere programmati usando linguaggi relativamente facili per gli sviluppatori. Se hai esperienza con Python o con qualsiasi [linguaggio a parentesi graffe](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), puoi trovare un linguaggio con una sintassi familiare.

I due linguaggi più attivi e mantenuti sono:

- Solidity
- Vyper

L'IDE Remix fornisce un ambiente di sviluppo completo per creare e testare contratti sia in Solidity che in Vyper. [Prova l'IDE Remix nel browser](https://remix.ethereum.org) per iniziare a programmare.

Gli sviluppatori più esperti potrebbero anche voler usare Yul, un linguaggio intermedio per la [Ethereum Virtual Machine](/developers/docs/evm/), o Yul+, un'estensione di Yul.

Se sei curioso e ti piace aiutare a testare nuovi linguaggi che sono ancora in forte sviluppo, puoi sperimentare con Fe, un linguaggio emergente per gli smart contract che è attualmente ancora agli inizi.

## Prerequisiti {#prerequisites}

Una conoscenza pregressa dei linguaggi di programmazione, specialmente di JavaScript o Python, può aiutarti a comprendere le differenze nei linguaggi per gli smart contract. Ti consigliamo inoltre di comprendere gli smart contract come concetto prima di addentrarti troppo nei confronti tra i linguaggi. [Introduzione agli smart contract](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Linguaggio ad alto livello orientato agli oggetti per l'implementazione di smart contract.
- Linguaggio a parentesi graffe che è stato profondamente influenzato dal C++.
- Tipizzato staticamente (il tipo di una variabile è noto in fase di compilazione).
- Supporta:
  - Ereditarietà (puoi estendere altri contratti).
  - Librerie (puoi creare codice riutilizzabile che puoi chiamare da contratti diversi, come le funzioni statiche in una classe statica in altri linguaggi di programmazione orientati agli oggetti).
  - Tipi complessi definiti dall'utente.

### Link importanti {#important-links}

- [Documentazione](https://docs.soliditylang.org/en/latest/)
- [Portale del linguaggio Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Chatroom Gitter di Solidity](https://gitter.im/ethereum/solidity) collegata alla [Chatroom Matrix di Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Blog di Solidity](https://blog.soliditylang.org/)
- [Twitter di Solidity](https://twitter.com/solidity_lang)

### Contratto di esempio {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // La parola chiave "public" rende le variabili
    // accessibili da altri contratti
    address public minter;
    mapping (address => uint) public balances;

    // Gli eventi permettono ai client di reagire a specifiche
    // modifiche del contratto che dichiari
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

Questo esempio dovrebbe darti un'idea di come sia la sintassi di un contratto in Solidity. Per una descrizione più dettagliata delle funzioni e delle variabili, [consulta la documentazione](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Linguaggio di programmazione pythonico
- Tipizzazione forte
- Codice del compilatore ridotto e comprensibile
- Generazione efficiente del bytecode
- Ha deliberatamente meno funzionalità rispetto a Solidity con l'obiettivo di rendere i contratti più sicuri e facili da verificare. Vyper non supporta:
  - Modificatori
  - Ereditarietà
  - Assembly inline
  - Overloading delle funzioni
  - Overloading degli operatori
  - Chiamate ricorsive
  - Cicli di lunghezza infinita
  - Punti fissi binari

Per maggiori informazioni, [leggi la logica di Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Link importanti {#important-links-1}

- [Documentazione](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Altro su Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat Discord della community di Vyper](https://discord.gg/SdvKC79cJk)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Framework e strumenti di sviluppo di smart contract per Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk: impara a proteggere e hackerare gli smart contract in Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub per lo sviluppo](https://github.com/zcor/vyper-dev)
- [I migliori esempi di smart contract in Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Risorse curate Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Esempio {#example}

```python
# Asta aperta

# Parametri dell'asta
# Il beneficiario riceve denaro dal miglior offerente
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Stato attuale dell'asta
highestBidder: public(address)
highestBid: public(uint256)

# Impostato su true alla fine, non consente alcuna modifica
ended: public(bool)

# Tiene traccia delle offerte rimborsate in modo da poter seguire il pattern di prelievo
pendingReturns: public(HashMap[address, uint256])

# Crea una semplice asta con `_bidding_time`
# secondi di tempo per le offerte per conto dell'
# indirizzo del beneficiario `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Fai un'offerta all'asta con il valore inviato
# insieme a questa transazione.
# Il valore verrà rimborsato solo se l'
# asta non viene vinta.
@external
@payable
def bid():
    # Controlla se il periodo per le offerte è terminato.
    assert block.timestamp < self.auctionEnd
    # Controlla se l'offerta è abbastanza alta
    assert msg.value > self.highestBid
    # Tieni traccia del rimborso per il precedente miglior offerente
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Tieni traccia della nuova offerta più alta
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Preleva un'offerta precedentemente rimborsata. Il pattern di prelievo è
# usato qui per evitare un problema di sicurezza. Se i rimborsi fossero direttamente
# inviati come parte di bid(), un contratto di offerta malevolo potrebbe bloccare
# quei rimborsi e quindi bloccare l'arrivo di nuove offerte più alte.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Termina l'asta e invia l'offerta più alta
# al beneficiario.
@external
def endAuction():
    # È una buona linea guida strutturare le funzioni che interagiscono
    # con altri contratti (cioè, chiamano funzioni o inviano ether)
    # in tre fasi:
    # 1. controllo delle condizioni
    # 2. esecuzione delle azioni (potenzialmente modificando le condizioni)
    # 3. interazione con altri contratti
    # Se queste fasi vengono mescolate, l'altro contratto potrebbe richiamare
    # il contratto corrente e modificare lo stato o causare
    # l'esecuzione multipla di effetti (pagamento di ether).
    # Se le funzioni chiamate internamente includono l'interazione con
    # contratti esterni, devono anch'esse essere considerate interazioni con
    # contratti esterni.

    # 1. Condizioni
    # Controlla se l'ora di fine dell'asta è stata raggiunta
    assert block.timestamp >= self.auctionEnd
    # Controlla se questa funzione è già stata chiamata
    assert not self.ended

    # 2. Effetti
    self.ended = True

    # 3. Interazione
    send(self.beneficiary, self.highestBid)
```

Questo esempio dovrebbe darti un'idea di come sia la sintassi di un contratto in Vyper. Per una descrizione più dettagliata delle funzioni e delle variabili, [consulta la documentazione](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul e Yul+ {#yul}

Se sei nuovo su Ethereum e non hai ancora programmato con i linguaggi per gli smart contract, ti consigliamo di iniziare con Solidity o Vyper. Esamina Yul o Yul+ solo quando avrai familiarità con le migliori pratiche di sicurezza degli smart contract e con le specifiche del lavoro con la EVM.

**Yul**

- Linguaggio intermedio per Ethereum.
- Supporta la [EVM](/developers/docs/evm) ed [Ewasm](https://github.com/ewasm), un WebAssembly in stile Ethereum, ed è progettato per essere un denominatore comune utilizzabile per entrambe le piattaforme.
- Ottimo target per le fasi di ottimizzazione ad alto livello che possono avvantaggiare equamente sia le piattaforme EVM che Ewasm.

**Yul+**

- Un'estensione di Yul a basso livello e altamente efficiente.
- Inizialmente progettato per un contratto di [rollup ottimistico](/developers/docs/scaling/optimistic-rollups/).
- Yul+ può essere considerato come una proposta di aggiornamento sperimentale per Yul, aggiungendovi nuove funzionalità.

### Link importanti {#important-links-2}

- [Documentazione di Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentazione di Yul+](https://github.com/fuellabs/yulp)
- [Post introduttivo su Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Contratto di esempio {#example-contract-2}

Il seguente semplice esempio implementa una funzione di potenza. Può essere compilato usando `solc --strict-assembly --bin input.yul`. L'esempio dovrebbe essere salvato nel file input.yul.

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

Se hai già molta esperienza con gli smart contract, puoi trovare un'implementazione completa di ERC-20 in Yul [qui](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Linguaggio tipizzato staticamente per la Ethereum Virtual Machine (EVM).
- Ispirato a Python e Rust.
- Mira a essere facile da imparare, anche per gli sviluppatori che sono nuovi nell'ecosistema di Ethereum.
- Lo sviluppo di Fe è ancora nelle sue fasi iniziali, il linguaggio ha avuto la sua versione alpha a gennaio 2021.

### Link importanti {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Annuncio di Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Roadmap di Fe del 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat Discord di Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter di Fe](https://twitter.com/official_fe)

### Contratto di esempio {#example-contract-3}

Di seguito è riportato un semplice contratto implementato in Fe.

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

Come per qualsiasi altro linguaggio di programmazione, si tratta principalmente di scegliere lo strumento giusto per il lavoro giusto, oltre che di preferenze personali.

Ecco alcune cose da considerare se non hai ancora provato nessuno dei linguaggi:

### Cosa c'è di fantastico in Solidity? {#solidity-advantages}

- Se sei un principiante, ci sono molti tutorial e strumenti di apprendimento in circolazione. Scopri di più nella sezione [Imparare programmando](/developers/learning-tools/).
- Sono disponibili ottimi strumenti per gli sviluppatori.
- Solidity ha una grande community di sviluppatori, il che significa che molto probabilmente troverai risposte alle tue domande abbastanza rapidamente.

### Cosa c'è di fantastico in Vyper? {#vyper-advatages}

- Ottimo modo per iniziare per gli sviluppatori Python che vogliono scrivere smart contract.
- Vyper ha un numero minore di funzionalità, il che lo rende ottimo per la prototipazione rapida di idee.
- Vyper mira a essere facile da verificare e il più leggibile possibile per gli esseri umani.

### Cosa c'è di fantastico in Yul e Yul+? {#yul-advantages}

- Linguaggio a basso livello semplicistico e funzionale.
- Permette di avvicinarsi molto di più alla EVM pura, il che può aiutare a ottimizzare l'utilizzo di gas dei tuoi contratti.

## Confronti tra i linguaggi {#language-comparisons}

Per confronti sulla sintassi di base, il ciclo di vita del contratto, le interfacce, gli operatori, le strutture dati, le funzioni, il flusso di controllo e altro ancora, dai un'occhiata a questo [cheatsheet di Auditless](https://reference.auditless.com/cheatsheet/)

## Letture consigliate {#further-reading}

- [Libreria di contratti Solidity di OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
