---
title: "Języki inteligentnych kontraktów"
description: "Przegląd i porównanie dwóch głównych języków inteligentnych kontraktów – Solidity i Vyper."
lang: pl
---

Wspaniałym aspektem [Ethereum](/) jest to, że inteligentne kontrakty mogą być programowane przy użyciu języków stosunkowo przyjaznych dla programistów. Jeśli masz doświadczenie z językiem Python lub jakimkolwiek [językiem z nawiasami klamrowymi](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), znajdziesz język o znajomej składni.

Dwa najbardziej aktywne i utrzymywane języki to:

- Solidity
- Vyper

Remix IDE zapewnia kompleksowe środowisko programistyczne do tworzenia i testowania kontraktów zarówno w Solidity, jak i Vyper. [Wypróbuj przeglądarkowe Remix IDE](https://remix.ethereum.org), aby zacząć kodować.

Bardziej doświadczeni programiści mogą również chcieć użyć Yul, języka pośredniego dla [Wirtualnej Maszyny Ethereum (EVM)](/developers/docs/evm/), lub Yul+, rozszerzenia dla Yul.

Jeśli jesteś ciekawy i lubisz pomagać w testowaniu nowych języków, które wciąż są w fazie intensywnego rozwoju, możesz poeksperymentować z Fe, nowo powstającym językiem inteligentnych kontraktów, który obecnie wciąż jest w powijakach.

## Wymagania wstępne {#prerequisites}

Wcześniejsza znajomość języków programowania, zwłaszcza JavaScript lub Python, może pomóc w zrozumieniu różnic między językami inteligentnych kontraktów. Zalecamy również zrozumienie inteligentnych kontraktów jako koncepcji przed zbytnim zagłębianiem się w porównania języków. [Wprowadzenie do inteligentnych kontraktów](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Zorientowany obiektowo język wysokiego poziomu do implementacji inteligentnych kontraktów.
- Język z nawiasami klamrowymi, na który największy wpływ miał C++.
- Statycznie typowany (typ zmiennej jest znany w czasie kompilacji).
- Obsługuje:
  - Dziedziczenie (możesz rozszerzać inne kontrakty).
  - Biblioteki (możesz tworzyć kod wielokrotnego użytku, który można wywoływać z różnych kontraktów – podobnie jak funkcje statyczne w klasie statycznej w innych obiektowych językach programowania).
  - Złożone typy definiowane przez użytkownika.

### Ważne linki {#important-links}

- [Dokumentacja](https://docs.soliditylang.org/en/latest/)
- [Portal języka Solidity](https://soliditylang.org/)
- [Solidity na przykładach](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Czat Solidity na Gitterze](https://gitter.im/ethereum/solidity) połączony z [czatem Solidity na Matrixie](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Ściągawka](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Przykładowy kontrakt {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Słowo kluczowe "public" sprawia, że zmienne są
    // dostępne z innych kontraktów
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

    // Wysyła określoną ilość nowo utworzonych monet na adres
    // Może być wywołane tylko przez twórcę kontraktu
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Wysyła określoną ilość istniejących monet
    // od dowolnego wywołującego na adres
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Ten przykład powinien dać ci wyobrażenie o tym, jak wygląda składnia kontraktu w Solidity. Bardziej szczegółowy opis funkcji i zmiennych [znajdziesz w dokumentacji](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Język programowania w stylu Pythona
- Silne typowanie
- Mały i zrozumiały kod kompilatora
- Wydajne generowanie kodu bajtowego
- Celowo posiada mniej funkcji niż Solidity, aby kontrakty były bezpieczniejsze i łatwiejsze do audytu. Vyper nie obsługuje:
  - Modyfikatorów
  - Dziedziczenia
  - Wstawek w asemblerze (inline assembly)
  - Przeciążania funkcji
  - Przeciążania operatorów
  - Wywołań rekurencyjnych
  - Pętli o nieskończonej długości
  - Binarnych punktów stałych

Aby uzyskać więcej informacji, [przeczytaj uzasadnienie dla języka Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Ważne linki {#important-links-1}

- [Dokumentacja](https://vyper.readthedocs.io)
- [Vyper na przykładach](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Więcej przykładów w Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Czat społeczności Vyper na Discordzie](https://discord.gg/SdvKC79cJk)
- [Ściągawka](https://reference.auditless.com/cheatsheet)
- [Frameworki i narzędzia do tworzenia inteligentnych kontraktów dla Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - naucz się zabezpieczać i hakować inteligentne kontrakty w Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub dla programistów](https://github.com/zcor/vyper-dev)
- [Najlepsze przykłady inteligentnych kontraktów w Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Wyselekcjonowane zasoby Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Przykład {#example}

```python
# Otwarta aukcja

# Parametry aukcji
# Beneficjent otrzymuje pieniądze od osoby, która złożyła najwyższą ofertę
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Obecny stan aukcji
highestBidder: public(address)
highestBid: public(uint256)

# Ustawiane na true na końcu, uniemożliwia jakiekolwiek zmiany
ended: public(bool)

# Śledzenie zwróconych ofert, aby móc zastosować wzorzec wypłaty
pendingReturns: public(HashMap[address, uint256])

# Utwórz prostą aukcję z czasem licytacji `_bidding_time`
# sekund w imieniu
# adresu beneficjenta `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Licytuj w aukcji za pomocą wartości wysłanej
# razem z tą transakcją.
# Wartość zostanie zwrócona tylko wtedy, gdy
# aukcja nie zostanie wygrana.
@external
@payable
def bid():
    # Sprawdź, czy okres licytacji się zakończył.
    assert block.timestamp < self.auctionEnd
    # Sprawdź, czy oferta jest wystarczająco wysoka
    assert msg.value > self.highestBid
    # Śledź zwrot dla poprzedniego licytanta z najwyższą ofertą
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Śledź nową najwyższą ofertę
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Wypłać wcześniej zwróconą ofertę. Wzorzec wypłaty jest
# użyty tutaj, aby uniknąć problemu z bezpieczeństwem. Gdyby zwroty były bezpośrednio
# wysyłane jako część bid(), złośliwy kontrakt licytujący mógłby zablokować
# te zwroty i tym samym zablokować napływ nowych, wyższych ofert.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Zakończ aukcję i wyślij najwyższą ofertę
# do beneficjenta.
@external
def endAuction():
    # Dobrą praktyką jest strukturyzowanie funkcji, które wchodzą w interakcje
    # z innymi kontraktami (tj. wywołują funkcje lub wysyłają ether)
    # w trzy fazy:
    # 1. sprawdzanie warunków
    # 2. wykonywanie akcji (potencjalnie zmieniających warunki)
    # 3. interakcja z innymi kontraktami
    # Jeśli te fazy zostaną pomieszane, inny kontrakt mógłby wywołać
    # z powrotem obecny kontrakt i zmodyfikować stan lub spowodować,
    # że efekty (wypłata etheru) zostaną wykonane wielokrotnie.
    # Jeśli funkcje wywoływane wewnętrznie obejmują interakcję z zewnętrznymi
    # kontraktami, muszą być one również traktowane jako interakcja z
    # zewnętrznymi kontraktami.

    # 1. Warunki
    # Sprawdź, czy czas zakończenia aukcji został osiągnięty
    assert block.timestamp >= self.auctionEnd
    # Sprawdź, czy ta funkcja została już wywołana
    assert not self.ended

    # 2. Efekty
    self.ended = True

    # 3. Interakcja
    send(self.beneficiary, self.highestBid)
```

Ten przykład powinien dać ci wyobrażenie o tym, jak wygląda składnia kontraktu w Vyper. Bardziej szczegółowy opis funkcji i zmiennych [znajdziesz w dokumentacji](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul i Yul+ {#yul}

Jeśli jesteś nowy w Ethereum i nie programowałeś jeszcze w językach inteligentnych kontraktów, zalecamy rozpoczęcie od Solidity lub Vyper. Zainteresuj się Yul lub Yul+ dopiero wtedy, gdy zapoznasz się z najlepszymi praktykami bezpieczeństwa inteligentnych kontraktów i specyfiką pracy z Wirtualną Maszyną Ethereum (EVM).

**Yul**

- Język pośredni dla Ethereum.
- Obsługuje [EVM](/developers/docs/evm) oraz [Ewasm](https://github.com/ewasm), czyli WebAssembly w wersji dla Ethereum, i został zaprojektowany jako użyteczny wspólny mianownik obu platform.
- Dobry cel dla etapów optymalizacji wysokiego poziomu, z których mogą w równym stopniu korzystać platformy EVM i Ewasm.

**Yul+**

- Niskopoziomowe, wysoce wydajne rozszerzenie dla Yul.
- Początkowo zaprojektowane dla kontraktu typu [optymistyczny rollup](/developers/docs/scaling/optimistic-rollups/).
- Yul+ można traktować jako eksperymentalną propozycję aktualizacji dla Yul, dodającą do niego nowe funkcje.

### Ważne linki {#important-links-2}

- [Dokumentacja Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentacja Yul+](https://github.com/fuellabs/yulp)
- [Wpis wprowadzający do Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Przykładowy kontrakt {#example-contract-2}

Poniższy prosty przykład implementuje funkcję potęgowania. Można go skompilować za pomocą `solc --strict-assembly --bin input.yul`. Przykład powinien zostać zapisany w pliku input.yul.

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

Jeśli masz już duże doświadczenie z inteligentnymi kontraktami, pełną implementację ERC-20 w Yul znajdziesz [tutaj](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Statycznie typowany język dla Wirtualnej Maszyny Ethereum (EVM).
- Zainspirowany przez Python i Rust.
- Ma być łatwy do nauki – nawet dla programistów, którzy są nowi w ekosystemie Ethereum.
- Rozwój Fe jest wciąż na wczesnym etapie, język miał swoje wydanie alfa w styczniu 2021 roku.

### Ważne linki {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Ogłoszenie Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Mapa drogowa Fe na 2021 rok](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Czat Fe na Discordzie](https://discord.com/invite/ywpkAXFjZH)
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

Podobnie jak w przypadku każdego innego języka programowania, chodzi głównie o wybór odpowiedniego narzędzia do odpowiedniego zadania, a także o osobiste preferencje.

Oto kilka rzeczy do rozważenia, jeśli nie próbowałeś jeszcze żadnego z tych języków:

### Co jest wspaniałego w Solidity? {#solidity-advantages}

- Jeśli jesteś początkujący, dostępnych jest wiele samouczków i narzędzi do nauki. Więcej na ten temat znajdziesz w sekcji [Nauka przez kodowanie](/developers/learning-tools/).
- Dostępne są dobre narzędzia dla programistów.
- Solidity ma dużą społeczność programistów, co oznacza, że najprawdopodobniej dość szybko znajdziesz odpowiedzi na swoje pytania.

### Co jest wspaniałego w Vyper? {#vyper-advatages}

- Świetny sposób na rozpoczęcie pracy dla programistów Pythona, którzy chcą pisać inteligentne kontrakty.
- Vyper ma mniejszą liczbę funkcji, co czyni go świetnym do szybkiego prototypowania pomysłów.
- Vyper ma być łatwy do audytu i maksymalnie czytelny dla człowieka.

### Co jest wspaniałego w Yul i Yul+? {#yul-advantages}

- Uproszczony i funkcjonalny język niskopoziomowy.
- Pozwala znacznie zbliżyć się do surowego EVM, co może pomóc zoptymalizować zużycie gazu przez twoje kontrakty.

## Porównania języków {#language-comparisons}

Aby porównać podstawową składnię, cykl życia kontraktu, interfejsy, operatory, struktury danych, funkcje, przepływ sterowania i inne, sprawdź tę [ściągawkę od Auditless](https://reference.auditless.com/cheatsheet/)

## Dalsza lektura {#further-reading}

- [Biblioteka kontraktów Solidity od OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity na przykładach](https://solidity-by-example.org)