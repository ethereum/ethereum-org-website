---
title: Języki inteligentnych kontraktów
description: Przegląd i porównanie dwóch głównych języków inteligentnych kontraktów – Solidity i Vyper.
lang: pl
---

Świetnym aspektem Ethereum jest to, że inteligentne kontrakty można programować przy użyciu stosunkowo przyjaznych dla programistów języków. Jeśli masz doświadczenie z Pythonem lub JavaScript, możesz znaleźć język o znanej składni.

Dwa najbardziej aktywne i obsługiwane języki to:

- Solidity
- Vyper

Bardziej doświadczeni programiści mogą również użyć Yul, pośredniego języka dla [wirtualnej maszyny Ethereum](/developers/docs/evm/), lub Yul+, rozszerzenia Yul.

## Warunki wstępne {#prerequisites}

Wcześniejsza znajomość języków programowania, zwłaszcza JavaScript lub Python, może pomóc w zrozumieniu różnic w językach inteligentnych kontraktów. Zalecamy również zrozumienie inteligentnych kontraktów jako koncepcji przed zbytnim zagłębieniem się w porównania języków. [Wprowadzenie do inteligentnych kontraktów](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Wpłynęły na niego języki C++, Python i JavaScript.
- Typowanie statyczne (typ zmiennej jest znany w czasie kompilacji).
- Obsługuje:
  - Dziedziczenie (możesz rozszerzać inne kontrakty).
  - Biblioteki (można utworzyć kod wielokrotnego użytku, który można wywoływać z różnych kontraktów — jak funkcje statyczne w klasie statycznej w innych językach programowania obiektowego).
  - Złożone typy zdefiniowane przez użytkownika.

### Ważne linki {#important-links}

- [Dokumentacja](https://docs.soliditylang.org/en/latest/)
- [Portal poświęcony językowi Solidity](https://soliditylang.org/)
- [Solidity w przykładach](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Czat dotyczący Solidity na Glitterze](https://gitter.im/ethereum/solidity/)
- [Ściągawka](https://reference.auditless.com/cheatsheet)
- [Blog poświęcony Solidity](https://blog.soliditylang.org/)

### Przykładowy kontrakt {#example-contract}

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

Ten przykład powinien dać wyobrażenie o składni kontraktu Solidity. Bardziej szczegółowy opis funkcji i zmiennych znajdziesz [w dokumentacji](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonowy język programowania
- Silne typowanie
- Niewielki i zrozumiały kod kompilatora
- Celowo ma mniej funkcji niż Solidity, aby zwiększyć bezpieczeństwo kontraktów i ułatwić ich audyt. Nieobsługiwane przez Vyper:
  - Modyfikatory
  - Dziedziczenie
  - Wbudowany asembler
  - Przeciążenie funkcji
  - Przeciążenie operatora
  - Wywołania rekurencyjne
  - Pętle o nieskończonej długości
  - Binarnej arytmetyki stałoprzecinkowej

Aby uzyskać więcej informacji, [przeczytaj artykuł o podstawach Vypera](https://vyper.readthedocs.io/en/latest/index.html).

### Ważne linki {#important-links-1}

- [Dokumentacja](https://vyper.readthedocs.io)
- [Vyper w przykładach](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Czat poświęcony Vyperowi na Gitterze](https://gitter.im/vyperlang/community)
- [Ściągawka](https://reference.auditless.com/cheatsheet)
- [Aktualizacja 8 stycznia 2020 r](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

### Przykład {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.

@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send Ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2.
 Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

Ten przykład powinien dać wyobrażenie o składni kontraktu Vyper. Aby uzyskać bardziej szczegółowy opis funkcji i zmiennych, [zobacz dokumentację](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul i Yul+ {#yul}

Jeśli dopiero zapoznajesz się z Ethereum i nie kodowałeś jeszcze w językach kontraktów inteligentnych, zalecamy rozpoczęcie pracy od Solidity lub Vyper. Zajrzyj do Yul lub Yul+ dopiero po zapoznaniu się z najlepszymi praktykami w zakresie bezpieczeństwa inteligentnych kontraktów i specyfiką pracy z EVM.

**Yul**

- Język pośredni dla Ethereum.
- Obsługuje [EVM](/developers/docs/evm) i [eWASM](https://github.com/ewasm), Ethereum flavored WebAssembly, zaprojektowany tak, aby był użytecznym wspólnym mianownikiem obu platform.
- Dobry cel dla etapów optymalizacji wysokiego poziomu, które mogą przynieść korzyści zarówno platformom EVM, jak i eWASM.

**Yul+**

- Niskopoziomowe, bardzo wydajne rozszerzenie do Yul.
- Początkowo zaprojektowany na potrzeby kontraktu typu [optymistyczna wartość zbiorcza](/docs/layer-2-scaling/#rollups-and-sidechains).
- Yul+ można postrzegać jako eksperymentalną propozycję ulepszenia Yul, dodającą do niego nowe funkcje.

### Ważne linki {#important-links-2}

- [Dokumentacja Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentacja Yul+](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Post wprowadzający do Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Przykładowy kontrakt {#example-contract-2}

Poniższy prosty przykład implementuje funkcję potęgową. Można go skompilować, używając `solc --strict-assembly --bin input.yul`. Przykład należy zapisać w pliku input.yul.

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

Jeśli masz już duże doświadczenie w inteligentnych kontraktach, pełną implementację ERC20 w Yul znajdziesz [tutaj](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Jak wybrać {#how-to-choose}

Podobnie jak w przypadku każdego innego języka programowania, najczęściej chodzi o wybór odpowiedniego narzędzia do danej pracy, jak również o osobiste preferencje.

Oto kilka rzeczy do rozważenia, jeśli nie próbowałeś jeszcze żadnego z języków:

### Co jest wspaniałego w Solidity? {#solidity-advantages}

- Jeśli dopiero zaczynasz, jest tam wiele samouczków i narzędzi do nauki. Więcej informacji zawiera artykuł [Ucz się przez kodowanie](/developers/learning-tools/).
- Dostępne dobre narzędzia programistyczne.
- Solidity ma dużą społeczność programistów, co oznacza, że ​​najprawdopodobniej szybko znajdziesz odpowiedzi na swoje pytania.

### Co jest wspaniałego w Vyper? {#vyper-advatages}

- Świetny sposób na rozpoczęcie pracy dla programistów Pythona, którzy chcą pisać inteligentne kontrakty.
- Vyper ma mniejszą liczbę funkcji, dzięki czemu świetnie nadaje się do szybkiego prototypowania pomysłów.
- Vyper ma być łatwy do skontrolowania i w największym stopniu czytelny dla człowieka.

### Co jest wspaniałego w Yul i Yul+? {#yul-advantages}

- Uproszczony i funkcjonalny język niskiego poziomu.
- Pozwala zbliżyć się do pierwotnej EVM, co może pomóc zoptymalizować zużycie gazu w Twoich kontraktach.

## Porównania języków {#language-comparisons}

Aby porównać podstawową składnię, cykl życia kontraktu, interfejsy, operatory, struktury danych, funkcje, przepływ kontroli itd., sprawdź tę [ściągawkę firmy Auditless](https://reference.auditless.com/cheatsheet/)

## Dalsza lektura {#further-reading}

- [Biblioteka Kontraktów Solidity autorstwa OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity w przykładach](https://solidity-by-example.org)
