---
title: Limbaje pentru contractele inteligente
description: O prezentare generală și o comparație a celor două limbaje principale ale contractelor inteligente – Solidity și Vyper.
lang: ro
---

Un aspect important despre Ethereum este că puteţi programa contractele inteligente folosind limbaje relativ uşor de utilizat de către dezvoltatori. Dacă aveţi experiență cu Python sau cu orice [limbaj de programare cu acolade](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), puteţi găsi un limbaj a cărui sintaxă o cunoaşteţi.

Cele mai active și acceptate două limbaje sunt:

- Solidity
- Vyper

Dezvoltatorii mai experimentați ar putea dori să utilizeze şi Yul, un limbaj intermediar pentru [Mașina virtuală Ethereum](/developers/docs/evm/) sau Yul +, o extensie pentru Yul.

Dacă sunteţi curios și vă place să ajutaţi la testarea unor limbaje noi pentru care procesul de dezvoltare este departe de a fi finalizat, puteţi experimenta utilizarea Fe, un limbaj emergent al contractelor inteligente, care se află încă la începuturi.

## Condiții prealabile {#prerequisites}

Dacă aveţi deja cunoştinţe de limbaje de programare, în special JavaScript sau Python, aceasta vă poate ajuta să înțelegeţi diferențele între limbajele contractelor inteligente. De asemenea, vă recomandăm să înțelegeţi conceptul de bază al contractelor inteligente înainte de a avansa în procesul de comparaţie a limbajelor între ele. [Introducere despre contractele inteligente](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Un limbaj de nivel înalt, orientat pe obiecte, pentru implementarea contractelor inteligente.
- Limbajul cu acolade care a fost influențat cel mai profund de C++.
- Static tipizat (tipul unei variabile este cunoscut în momentul compilării).
- Acceptă:
  - Moștenirea (puteţi extinde alte contracte).
  - Biblioteci (puteţi crea cod reutilizabil, pe care îl puteţi apela din diferite contracte – cum ar fi funcțiile statice dintr-o clasă statică în alte limbaje de programare orientate pe obiecte).
  - Tipuri complexe definite de utilizator.

### Linkuri importante {#important-links}

- [Documentație](https://docs.soliditylang.org/en/latest/)
- [Portalul limbajului Solidity](https://soliditylang.org/)
- [Solidity prin exemple](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Camera de chat Solidity Gitter](https://gitter.im/ethereum/solidity/) legată de [Camera de chat Solidity Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Blogul Solidity](https://blog.soliditylang.org/)
- [Contul de Twitter Solidity](https://twitter.com/solidity_lang)

### Exemplu de contract {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Acest exemplu ar trebui să vă dea o idee despre sintaxa contractului Solidity. Pentru o descriere mai detaliată a funcțiilor și variabilelor, [consultaţi documentația](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Limbajul de programare Pythonic
- Tipizare puternică
- Cod de compilator mic și ușor de înțeles
- În mod deliberat are mai puține caracteristici decât Solidity, în scopul de a creşte securitatea contractelor şi a le facilita auditarea. Vyper nu acceptă:
  - Modificatorii
  - Moștenirea
  - Asamblarea în linie
  - Supraîncărcarea funcțiilor
  - Supraîncărcarea operatorilor
  - Apelurile recursive
  - Buclele infinite
  - Punctele fixe binare

Pentru mai multe informații, [citiţi raționamentul pentru Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Linkuri importante {#important-links-1}

- [Documentație](https://vyper.readthedocs.io)
- [Vyper prin exemple](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Camera de chat Vyper Gitter](https://gitter.im/vyperlang/community)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Actualizare pe 8 ianuarie 2020](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

### Exemplu {#example}

```python
# Deschide licitația

# Parametri de licitație
# Beneficiarul primește bani de la cel mai mare ofertant
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Starea actuală a licitației
highestBidder: public(address)
highestBid: public(uint256)

# Setat la „true” la sfârșit, interzice orice modificare
ended: public(bool)

# Ține evidența ofertelor rambursate, astfel încât să putem urma modelul de retragere
pendingReturns: public(HashMap[address, uint256])

# Creează o licitație simplă cu `_bidding_time`
# în secunde în numele
# beneficiarului adresei `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Licitează la licitație cu valoarea trimisă
# împreună cu această tranzacție.
# Valoarea va fi rambursată numai dacă
# licitația nu este câștigată.
@external
@payable
def bid():
    # Verifică dacă perioada de licitare a trecut.
    assert block.timestamp < self.auctionEnd
    # Verifică dacă suma licitată este suficient de mare
    assert msg.value > self.highestBid
    # Urmărește rambursarea pentru cel mai înalt ofertant anterior
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Urmărește o nouă ofertă ridicată
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retrage o ofertă rambursată anterior. Modelul de retragere este
# folosit aici pentru a evita o problemă de securitate. Dacă rambursările au fost direct
# trimise ca parte a ofertei „bid()", un contract de licitare rău intenționat ar putea bloca
# aceste rambursări și astfel bloca intrarea noilor sume mai mari licitate.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Încheie licitația și trimiteți cea mai mare ofertă
# către beneficiar.
@external
def endAuction():
    # o recomandare bună ar fi să structuraţi funcțiile care interacționează
    # cu alte contracte (adică apelează funcții sau trimit ether)
    # în trei faze:
    # 1. verificarea condițiilor
    # 2. efectuarea de acțiuni (condiții potențial schimbătoare)
    # 3. interacționarea cu alte contracte
    # Dacă aceste faze sunt amestecate, celălalt contract ar putea apela
    # înapoi contractul actual și modifica starea sau cauza
    # efecte ca (plata eterului) care s-ar face de mai multe ori.
    # Dacă funcțiile numite „internaly” includ interacțiunea cu contracte
    # externe, trebuie de asemenea să fie considerate interacțiuni cu
    # contractele externe.

    # 1. Condiții
    # Verifică dacă a fost atinsă ora de încheiere a licitației
    assert block.timestamp >= self.auctionEnd
    # Verifică dacă această funcție a fost deja chemată
    assert not self.ended

    # 2. Efecte
    self.ended = True

    # 3. Interacțiune
    send(self.beneficiary, self.highestBid)
```

Acest exemplu ar trebui să vă dea o idee despre sintaxa contractului Vyper. Pentru o descriere mai detaliată a funcțiilor și variabilelor, [vedeţi documentația](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul și Yul+ {#yul}

Dacă nu aţi mai folosit Ethereum și încă nu ați scris coduri cu limbaje de contracte inteligente, vă recomandăm să începeți cu Solidity sau Vyper. Treceţi la Yul sau Yul+ numai după ce v-aţi familiarizat cu cele mai bune practici pentru securitatea contractelor inteligente și cu specificul de lucru cu EVM.

**Yul**

- Limbaj intermediar pentru Ethereum.
- Acceptă [EVM](/developers/docs/evm) și [eWASM](https://github.com/ewasm), un WebAssembly ce aduce a Ethereum, conceput să fie un numitor comun utilizabil pe ambele platforme.
- Este bine să îl vizăm în etapele de optimizare la nivel înalt, cu avantaje atât pentru platformele EVM, cât și pentru platformele eWASM.

**Yul+**

- O extensie de nivel inferior, extrem de eficientă, a Yul.
- Conceput inițial pentru un contract [rolllup optimistic](/developers/docs/scaling/optimistic-rollups/).
- Yul+ poate fi considerat o propunere experimentală de actualizare a Yul, ce îi adaugă noi funcţionalităţi.

### Linkuri importante {#important-links-2}

- [Documentație Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentație Yul+](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Postarea de introducere despre Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemplu de contract {#example-contract-2}

Următorul exemplu simplu implementează o funcție de ridicare la putere. Poate fi compilat folosind `solc --strict-assembly --bin input.yul`. Exemplul ar trebui să fie stocat în fișierul input.yul.

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

Dacă aveţi deja suficientă experienţă privind contractele inteligente, puteţi găsi o implementare completă ERC20 în Yul [aici](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Limbaj static tipizat pentru Mașina Virtuală Ethereum (EVM).
- Inspirat de Python și Rust.
- Scopul este de a fi ușor de învățat -- chiar și pentru dezvoltatorii care nu au mai folosit ecosistemul Ethereum.
- Dezvoltarea Fe se află încă în faza incipientă, limbajul având o versiune alfa lansată în ianuarie 2021.

### Linkuri importante {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Anunțul despre Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Foaia de parcurs Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat-ul Discord Fe](https://discord.com/invite/ywpkAXFjZH)
- [Contul de Twitter Fe](https://twitter.com/official_fe)

### Exemplu de contract {#example-contract-3}

Iată un contract simplu implementat în Fe.

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

## Cum să alegeţi {#how-to-choose}

La fel ca în orice alt limbaj de programare, este vorba atât de alegerea unui instrument potrivit pentru proiect, cât în funcţie de preferințele personale.

Iată câteva lucruri de luat în considerare, dacă nu aţi mai folosit niciunul dintre limbaje:

### Ce este excelent la Solidity? {#solidity-advantages}

- Dacă sunteţi începător, există multe tutoriale și instrumente de învățare. Aflaţi mai multe informații despre aceasta în secțiunea [Învațaţi scriind cod](/developers/learning-tools/).
- Sunt disponibile instrumente bune pentru dezvoltatori.
- Solidity are o comunitate mare de dezvoltatori, ceea ce înseamnă că veţi găsi răspunsuri la întrebările dvs. cel mai probabil destul de repede.

### Ce este excelent la Vyper? {#vyper-advatages}

- O modalitate excelentă de a începe pentru dezvoltatorii Python care doresc să scrie contracte inteligente.
- Vyper are un număr mai mic de funcţionalităţi, ceea ce îl face excelent pentru crearea unor idei de prototip.
- Vyper își propune să fie ușor de auditat și extrem de ușor de citit de către oameni.

### Ce este excelent la Yul și Yul+? {#yul-advantages}

- Limbaj simplist și funcțional la nivel inferior.
- Permite o apropiere mai bună de EVM-ul brut, ceea ce poate ajuta la optimizarea consumului de gaz din contractele dvs.

## Comparații între limbaje {#language-comparisons}

Pentru a vedea comparații ale sintaxei de bază, ciclul de viață al contractului, interfețele, operatorii, structurile de date, funcțiile, fluxul de control și multe altele, consultaţi acest [Cheat Sheet creat de Auditless](https://reference.auditless.com/cheatsheet/)

## Referințe suplimentare {#further-reading}

- [Biblioteca de contracte Solidity creată de OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity prin exemple](https://solidity-by-example.org)
