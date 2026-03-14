---
title: "Języki inteligentnego kontraktu"
description: "Przegląd i porównanie dwóch głównych języków inteligentnych kontraktów – Solidity i Vyper."
lang: pl
---

Świetnym aspektem Ethereum jest to, że inteligentne kontrakty można programować przy użyciu stosunkowo przyjaznych dla programistów języków. Jeśli masz doświadczenie w Pythonie lub jakimkolwiek [języku z nawiasami klamrowymi](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), możesz znaleźć język o znajomej składni.

Dwa najbardziej aktywne i obsługiwane języki to:

- Solidity
- Vyper

Remix IDE zapewnia kompleksowe środowisko programistyczne do tworzenia i testowania kontraktów zarówno w Solidity, jak i Vyper. [Wypróbuj Remix IDE w przeglądarce](https://remix.ethereum.org), aby zacząć kodować.

Bardziej doświadczeni programiści mogą również chcieć użyć Yul, języka pośredniego dla [Wirtualnej Maszyny Ethereum](/developers/docs/evm/), lub Yul+, rozszerzenia Yul.

Jeśli jesteś ciekawy i chcesz pomóc w testowaniu nowych języków, które wciąż są w fazie intensywnego rozwoju, możesz poeksperymentować z Fe, nowym językiem inteligentnych kontraktów, który obecnie jest jeszcze w początkowej fazie rozwoju.

## Wymagania wstępne {#prerequisites}

Wcześniejsza znajomość języków programowania, zwłaszcza JavaScript lub Python, może pomóc w zrozumieniu różnic w językach inteligentnych kontraktów. Zalecamy również zrozumienie inteligentnych kontraktów jako koncepcji przed zbytnim zagłębieniem się w porównania języków. [Wprowadzenie do inteligentnych kontraktów](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Obiektowy język wysokiego poziomu do implementacji inteligentnych kontraktów.
- Język z nawiasami klamrowymi, na który największy wpływ miał C++.
- Typowanie statyczne (typ zmiennej jest znany w czasie kompilacji).
- Obsługuje:
  - Dziedziczenie (możesz rozszerzać inne kontrakty).
  - Biblioteki (możesz utworzyć kod wielokrotnego użytku, który można wywoływać z różnych kontraktów — jak funkcje statyczne w klasie statycznej w innych językach programowania obiektowego).
  - Złożone typy zdefiniowane przez użytkownika.

### Ważne linki {#important-links}

- [Dokumentacja](https://docs.soliditylang.org/en/latest/)
- [Portal języka Solidity](https://soliditylang.org/)
- [Solidity na przykładach](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Czat Gitter Solidity](https://gitter.im/ethereum/solidity) zmostowany z [czatem Matrix Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Ściągawka](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Przykładowy kontrakt {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Słowo kluczowe "public" udostępnia zmienne
    // z innych kontraktów
    address public minter;
    mapping (address => uint) public balances;

    // Zdarzenia pozwalają klientom reagować na określone
    // zmiany w kontrakcie, które zadeklarujesz
    event Sent(address from, address to, uint amount);

    // Kod konstruktora jest uruchamiany tylko wtedy, gdy kontrakt
    // jest tworzony
    constructor() {
        minter = msg.sender;
    }

    // Wysyła pewną ilość nowo utworzonych monet na dany adres
    // Może być wywołane tylko przez twórcę kontraktu
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Wysyła pewną ilość istniejących monet
    // od dowolnego wywołującego na dany adres
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Niewystarczające saldo.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Ten przykład powinien dać wyobrażenie o składni kontraktu Solidity. Aby uzyskać bardziej szczegółowy opis funkcji i zmiennych, [zobacz dokumentację](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonowy język programowania
- Silne typowanie
- Niewielki i zrozumiały kod kompilatora
- Efektywne generowanie kodu bajtowego
- Celowo ma mniej funkcji niż Solidity, aby zwiększyć bezpieczeństwo kontraktów i ułatwić ich audyt. Nieobsługiwane przez Vyper:
  - Modyfikatory
  - Dziedziczenie
  - Wbudowany asembler
  - Przeciążenie funkcji
  - Przeciążenie operatora
  - Wywołania rekurencyjne
  - Pętle o nieskończonej długości
  - Binarne punkty stałe

Aby uzyskać więcej informacji, [przeczytaj uzasadnienie Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Ważne linki {#important-links-1}

- [Dokumentacja](https://vyper.readthedocs.io)
- [Vyper na przykładach](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Więcej przykładów Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Czat Discord społeczności Vyper](https://discord.gg/SdvKC79cJk)
- [Ściągawka](https://reference.auditless.com/cheatsheet)
- [Frameworki i narzędzia do tworzenia inteligentnych kontraktów dla Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - naucz się zabezpieczać i hakować inteligentne kontrakty Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Centrum programistyczne Vyper](https://github.com/zcor/vyper-dev)
- [Przykłady inteligentnych kontraktów Vyper – największe hity](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper – wyselekcjonowane zasoby](https://github.com/spadebuilders/awesome-vyper)

### Przykład {#example}

```python
# Otwarta aukcja

# Parametry aukcji

# Beneficjent otrzymuje pieniądze od licytującego, który złożył najwyższą ofertę

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Obecny stan aukcji

highestBidder: public(address)
highestBid: public(uint256)

# Ustawiane na true na końcu, uniemożliwia wszelkie zmiany

ended: public(bool)

# Śledzenie zwróconych ofert, abyśmy mogli postępować zgodnie ze wzorcem wypłaty

pendingReturns: public(HashMap[address, uint256])

# Utwórz prostą aukcję z czasem licytacji `_bidding_time`

# sekund w imieniu

# adresu beneficjenta `_beneficiary`.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Licytuj w aukcji z wartością wysłaną

# razem z tą transakcją.

# Wartość zostanie zwrócona tylko wtedy, gdy

# aukcja nie zostanie wygrana.

@external
@payable
def bid():
    # Sprawdź, czy okres licytacji się skończył.
    assert block.timestamp < self.auctionEnd
    # Sprawdź, czy oferta jest wystarczająco wysoka
    assert msg.value > self.highestBid
    # Śledź zwrot dla poprzedniego licytującego z najwyższą ofertą
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Śledź nową wysoką ofertę
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Wypłać wcześniej zwróconą ofertę. Wzorzec wypłaty jest

# używany tutaj w celu uniknięcia problemu z bezpieczeństwem. Gdyby zwroty były bezpośrednio

# wysyłane w ramach bid(), złośliwy kontrakt licytacyjny mógłby zablokować

# te zwroty, a tym samym zablokować napływ nowych, wyższych ofert.

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Zakończ aukcję i wyślij najwyższą ofertę

# do beneficjenta.

@external
def endAuction():
    # Dobrą wytyczną jest strukturyzowanie funkcji, które wchodzą w interakcję
    # z innymi kontraktami (tj. wywołują funkcje lub wysyłają ether)
    # w trzech fazach:
    # 1. sprawdzanie warunków
    # 2. wykonywanie działań (potencjalnie zmieniających warunki)
    # 3. interakcja z innymi kontraktami
    # Jeśli te fazy są pomieszane, inny kontrakt może wywołać
    # z powrotem bieżący kontrakt i zmodyfikować stan lub spowodować
    # wielokrotne wykonanie efektów (wypłata etheru).
    # Jeśli funkcje wywoływane wewnętrznie obejmują interakcję z zewnętrznymi
    # kontraktami, muszą być również traktowane jako interakcja z
    # kontraktami zewnętrznymi.

    # 1. Warunki
    # Sprawdź, czy osiągnięto czas zakończenia aukcji
    assert block.timestamp >= self.auctionEnd
    # Sprawdź, czy ta funkcja została już wywołana
    assert not self.ended

    # 2. Efekty
    self.ended = True

    # 3. Interakcja
    send(self.beneficiary, self.highestBid)
```

Ten przykład powinien dać wyobrażenie o składni kontraktu Vyper. Aby uzyskać bardziej szczegółowy opis funkcji i zmiennych, [zobacz dokumentację](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul i Yul+ {#yul}

Jeśli dopiero zapoznajesz się z Ethereum i nie kodowałeś jeszcze w językach inteligentnych kontraktów, zalecamy rozpoczęcie od Solidity lub Vyper. Przyjrzyj się Yul lub Yul+ dopiero po zapoznaniu się z najlepszymi praktykami w zakresie bezpieczeństwa inteligentnych kontraktów i specyfiką pracy z EVM.

**Yul**

- Język pośredni dla Ethereum.
- Obsługuje [EVM](/developers/docs/evm) i [Ewasm](https://github.com/ewasm), czyli WebAssembly w stylu Ethereum, i jest zaprojektowany jako użyteczny wspólny mianownik dla obu platform.
- Dobry cel dla etapów optymalizacji wysokiego poziomu, które mogą przynieść korzyści zarówno platformom EVM, jak i Ewasm.

**Yul+**

- Niskopoziomowe, bardzo wydajne rozszerzenie do Yul.
- Początkowo zaprojektowany dla kontraktu [rollup optymistyczny](/developers/docs/scaling/optimistic-rollups/).
- Yul+ można postrzegać jako eksperymentalną propozycję ulepszenia Yul, dodającą do niego nowe funkcje.

### Ważne linki {#important-links-2}

- [Dokumentacja Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentacja Yul+](https://github.com/fuellabs/yulp)
- [Wpis wprowadzający do Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Przykładowy kontrakt {#example-contract-2}

Poniższy prosty przykład implementuje funkcję potęgową. Można go skompilować za pomocą `solc --strict-assembly --bin input.yul`. Przykład należy zapisać
w pliku input.yul.

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

Jeśli masz już duże doświadczenie z inteligentnymi kontraktami, pełną implementację ERC20 w Yul można znaleźć [tutaj](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Statycznie typowany język dla maszyny wirtualnej Ethereum (EVM).
- Zainspirowany Pythonem i Rustem.
- Ma być łatwy do nauczenia — nawet dla deweloperów, którzy są nowicjuszami w ekosystemie Ethereum.
- Rozwój Fe jest wciąż na wczesnym etapie, język miał swoją wersję alfa w styczniu 2021 roku.

### Ważne linki {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Ogłoszenie Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Plan rozwoju Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Czat Discord Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Przykładowy kontrakt {#example-contract-3}

Poniżej znajduje się prosty kontrakt zaimplementowany w Fe.

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

## Jak wybrać {#how-to-choose}

Podobnie jak w przypadku każdego innego języka programowania, najczęściej chodzi o wybór odpowiedniego narzędzia do danej pracy, jak również o osobiste preferencje.

Oto kilka rzeczy do rozważenia, jeśli nie próbowałeś jeszcze żadnego z języków:

### Co jest wspaniałego w Solidity? {#solidity-advantages}

- Jeśli dopiero zaczynasz, jest tam wiele samouczków i narzędzi do nauki. Zobacz więcej na ten temat w sekcji [Nauka przez kodowanie](/developers/learning-tools/).
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

Aby porównać podstawową składnię, cykl życia kontraktu, interfejsy, operatory, struktury danych, funkcje, przepływ sterowania i nie tylko, sprawdź tę [ściągawkę od Auditless](https://reference.auditless.com/cheatsheet/)

## Dalsza lektura {#further-reading}

- [Biblioteka kontraktów Solidity od OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity na przykładach](https://solidity-by-example.org)
