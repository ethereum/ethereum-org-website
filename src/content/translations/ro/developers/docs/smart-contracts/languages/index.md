---
title: Limbaje pentru de contracte inteligente
description: O prezentare generală și o comparație a celor două limbaje principale ale contractelor inteligente – Solidity și Vyper.
lang: ro
sidebar: true
---

Un aspect important despre Ethereum este că poți programa contractele inteligente folosind limbaje relativ prietenoase cu programatorii. Dacă ai experiență în Python sau JavaScript, poți găsi un limbaj cu sintaxă familiară.

Cele mai active și suportate două limbaje sunt:

- Solidity
- Vyper

De asemenea, programatorii mai experimentați ar putea dori să utilizeze Yul, un limbaj intermediar pentru [Mașina virtuală Ethereum](/developers/docs/evm/) sau Yul +, o extensie pentru Yul.

## Condiții prealabile {#prerequisites}

Cunoașterea anterioară a limbajelor de programare, în special JavaScript sau Python, te poate ajuta să înțelegi diferențele în limbajele contractelor inteligente. De asemenea, îți recomandăm să înțelegeți conceptul de bază al contractelor inteligente înainte de a analiza mai atent diferențele dintre limbajele contractelor inteligente. [Introducere în contracte inteligente](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Influențat de C ++, Python și JavaScript.
- Tip static (tipul unei variabile este cunoscut în momentul compilării).
- Susține:
  - Moștenire (poți prelungi alte contracte).
  - Biblioteci (poți crea cod reutilizabil pe care îl poți apela din diferite contracte inteligente – cum ar fi în funcțiile statice dintr-o clasă statică în alte limbaje de programare orientate pe obiecte).
  - Tipuri complexe definite de utilizator.

### Linkuri importante {#important-links}

- [Documentație](https://docs.soliditylang.org/en/latest/)
- [Portalul limbajului Solidity](https://soliditylang.org/)
- [Solidity prin exemple](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Cameră de chat Solidity Gitter](https://gitter.im/ethereum/solidity/)
- [Foaie de notițe](https://reference.auditless.com/cheatsheet)
- [Bloc Solidity](https://blog.soliditylang.org/)

### Exemplu de contract {#example-contract}

```solidity
// SPDX-Licență-Identificare: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Cuvântul cheie „public” face variabilele
    // accesibile din alte contracte
    address public minter;
    mapping (address => uint) public balances;

    // Evenimentele permit clienților să reacționeze la anumite
    // modificări ale contractului pe care le declari
    event Sent(address from, address to, uint amount);

    // Codul constructor se execută numai când contractul
    // este creeat
    constructor() {
        minter = msg.sender;
    }

    // Trimite o sumă de monede nou create la o adresă
    // Poate fi apelat numai de către creatorul contractului
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Trimite o cantitate de monede existente
    // de la orice apelant la o adresă
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Balanță insuficientă.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Acest exemplu ar trebui să-ți dea o idee despre sintaxa contractului Solidity. Pentru o descriere mai detaliată a funcțiilor și variabilelor, consultă [documentele](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Limbaj de programare Pythonic
- Tip puternic
- Cod de compilator mic și ușor de înțeles
- În mod deliberat are mai puține caracteristici decât Solidity, cu scopul de a face contractele mai sigure și mai ușor de auditat. Vyper nu acceptă:
  - Modificatori
  - Moștenire
  - Asamblare în linie
  - Supraîncărcarea funcției
  - Supraîncărcarea operatorului
  - Apel recursiv
  - Bucle cu lungime infinită
  - Puncte fixe binare

Pentru mai multe informații, [citește raționamentul Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Linkuri importante {#important-links-1}

- [Documentație](https://vyper.readthedocs.io)
- [Vyper prin exemplu](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Cameră de chat Vyper Gitter](https://gitter.im/vyperlang/community)
- [Foaie de notițe](https://reference.auditless.com/cheatsheet)
- [Actualizare 8 ianuarie 2020](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

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
    # Un bun sfat ar fi să structurezi funcțiile care interacționează
    # cu alte contracte (adică apelează funcții sau trimit Eter)
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

Acest exemplu ar trebui să vă dea o idee despre sintaxa contractului Vyper. Pentru o descriere mai detaliată a funcțiilor și variabilelor, [vezi documentele](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul și Yul+ {#yul}

Dacă ești nou în Ethereum și încă nu ai scris cod cu limbaje de contracte inteligente, îți recomandăm să începi cu Solidity sau Vyper. Încearcă Yul sau Yul + numai după ce ești familiarizat cu cele mai bune practici de securitate a contractelor inteligente și cu specificul de lucru cu EVM.

**Yul**

- Limbaj intermediar pentru Ethereum.
- Suportă [EVM](/developers/docs/evm) și [eWASM](https://github.com/ewasm), un WebAssembly cu arome de Ethereum, și este conceput să fie un numitor comun utilizabil al ambelor platforme.
- O țintă bună pentru etapele de optimizare la nivel înalt, cu avantaje atât pentru platformele EVM, cât și pentru platformele eWASM.

**Yul+**

- O extensie de nivel scăzut, extrem de eficientă pentru Yul.
- Conceput inițial pentru un contract <a href="/developers/docs/layer-2-scaling/#rollupss">optimistic rollup</a>.
- Yul + poate fi privit ca o propunere experimentală de upgrade la Yul, adăugând noi caracteristici.

### Linkuri importante {#important-links-2}

- [Documentație Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentație Yul +](https://github.com/fuellabs/yulp)
- [Teren de joacă Yul+](https://yulp.fuel.sh/)
- [Post de introducere Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemplu de contract {#example-contract-2}

Următorul exemplu simplu implementează o funcție de ridicare la putere. Poate fi compilat folosind `solc --strict-assembly --bin input.yul`. Exemplul ar trebui să fie stocate în fișierul input.yul.

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

Dacă ai deja o experiență bună în ceea ce privește contractele inteligente, poți găsi o implementare completă ERC20 în Yul [aici](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Cum să alegi {#how-to-choose}

La fel ca în orice alt limbaj de programare, este vorba atât de alegerea unui instrument potrivit la locul de muncă potrivit, cât și de preferințele personale.

Iată câteva lucruri de luat în considerare, dacă nu ai încercat încă niciun limbaj:

### Ce este excelent la Solidity? {#solidity-advantages}

- Dacă ești începător, există multe tutoriale și instrumente de învățare. Află mai multe informații despre aceasta în secțiunea [Învață prin codificare](/developers/learning-tools/).
- Sunt disponibile instrumente bune pentru programatori.
- Solidity are o comunitate mare de programatori, ceea ce înseamnă că cel mai probabil vei găsi răspunsuri la întrebările tale destul de repede.

### Ce este excelent la Vyper? {#vyper-advatages}

- O modalitate excelentă de a începe pentru programatorii Python care doresc să scrie contracte inteligente.
- Vyper are un număr mai mic de caracteristici, ceea ce îl face excelent pentru crearea unor idei de prototip.
- Vyper își propune să fie ușor de auditat și extrem de ușor de citit de oameni.

### Ce este grozav la Yul și Yul+? {#yul-advantages}

- Limbaj simplist și funcțional la nivel scăzut.
- Permite o apropie mai bună de EVM-ul brut, ceea ce poate ajuta la optimizarea consumului de gaz din contractele tale.

## Comparații între limbaje {#language-comparisons}

Pentru comparații ale sintaxei de bază, ciclul de viață al contractului, interfețe, operatori, structuri de date, funcții, flux de control și multe altele, consultă această [foaie de cheat de Auditless](https://reference.auditless.com/cheatsheet/)

## Referințe suplimentare {#further-reading}

- [Biblioteca de contracte Solidity de OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity prin exemple](https://solidity-by-example.org)
