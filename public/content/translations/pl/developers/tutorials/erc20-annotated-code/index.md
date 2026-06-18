---
title: "Przewodnik po kontrakcie ERC-20"
description: Co znajduje się w kontrakcie ERC-20 od OpenZeppelin i dlaczego?
author: Ori Pomerantz
lang: pl
tags: ["solidity", "erc-20"]
skill: beginner
breadcrumb: Przewodnik po ERC-20
published: 2021-03-09
---

## Wprowadzenie {#introduction}

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę zbywalnego tokena, w pewnym sensie własnej waluty. Tokeny te zazwyczaj są zgodne ze standardem [ERC-20](/developers/docs/standards/tokens/erc-20/). Standard ten umożliwia pisanie narzędzi, takich jak pule płynności i portfele, które współpracują ze wszystkimi tokenami ERC-20. W tym artykule przeanalizujemy [implementację ERC20 w Solidity od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), a także [definicję interfejsu](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

To jest opatrzony komentarzami kod źródłowy. Jeśli chcesz zaimplementować ERC-20, [przeczytaj ten samouczek](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Interfejs {#the-interface}

Celem standardu takiego jak ERC-20 jest umożliwienie wielu implementacji tokenów, które są interoperacyjne w różnych aplikacjach, takich jak portfele i zdecentralizowane giełdy. Aby to osiągnąć, tworzymy [interfejs](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Każdy kod, który musi użyć kontraktu tokena, może korzystać z tych samych definicji w interfejsie i być kompatybilny ze wszystkimi kontraktami tokenów, które go używają, niezależnie od tego, czy jest to portfel taki jak MetaMask, zdecentralizowana aplikacja (dapp) taka jak etherscan.io, czy inny kontrakt, taki jak pula płynności.

![Illustration of the ERC-20 interface](erc20_interface.png)

Jeśli jesteś doświadczonym programistą, prawdopodobnie pamiętasz podobne konstrukcje w [Javie](https://www.w3schools.com/java/java_interface.asp) lub nawet w [plikach nagłówkowych C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

To jest definicja [interfejsu ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) od OpenZeppelin. Jest to tłumaczenie [czytelnego dla człowieka standardu](https://eips.ethereum.org/EIPS/eip-20) na kod Solidity. Oczywiście sam interfejs nie definiuje _jak_ cokolwiek zrobić. Zostało to wyjaśnione w kodzie źródłowym kontraktu poniżej.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Pliki Solidity powinny zawierać identyfikator licencji. [Listę licencji możesz zobaczyć tutaj](https://spdx.org/licenses/). Jeśli potrzebujesz innej licencji, po prostu wyjaśnij to w komentarzach.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Język Solidity wciąż szybko ewoluuje, a nowe wersje mogą nie być kompatybilne ze starym kodem ([zobacz tutaj](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Dlatego dobrym pomysłem jest określenie nie tylko minimalnej wersji języka, ale także maksymalnej wersji, czyli najnowszej, z którą testowano kod.

&nbsp;

```solidity
/**
 * @dev Interfejs standardu ERC-20 zgodnie z definicją w EIP.
 */
```

`@dev` w komentarzu jest częścią [formatu NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), używanego do generowania dokumentacji z kodu źródłowego.

&nbsp;

```solidity
interface IERC20 {
```

Zgodnie z konwencją, nazwy interfejsów zaczynają się od `I`.

&nbsp;

```solidity
    /**
     * @dev Zwraca ilość istniejących tokenów.
     */
    function totalSupply() external view returns (uint256);
```

Ta funkcja to `external`, co oznacza, że [może być wywołana tylko z zewnątrz kontraktu](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Zwraca ona całkowitą podaż tokenów w kontrakcie. Wartość ta jest zwracana przy użyciu najpopularniejszego typu w Ethereum, 256-bitowej liczby bez znaku (256 bitów to natywny rozmiar słowa EVM). Funkcja ta jest również `view`, co oznacza, że nie zmienia stanu, więc może być wykonana na pojedynczym węźle, zamiast być uruchamiana przez każdy węzeł w blockchainie. Tego rodzaju funkcja nie generuje transakcji i nie kosztuje [gazu](/developers/docs/gas/).

**Uwaga:** W teorii mogłoby się wydawać, że twórca kontraktu może oszukiwać, zwracając mniejszą całkowitą podaż niż rzeczywista wartość, sprawiając, że każdy token wydaje się cenniejszy niż jest w rzeczywistości. Jednak obawa ta ignoruje prawdziwą naturę blockchaina. Wszystko, co dzieje się na blockchainie, może zostać zweryfikowane przez każdy węzeł. Aby to osiągnąć, kod w języku maszynowym i pamięć każdego kontraktu są dostępne na każdym węźle. Chociaż nie masz obowiązku publikowania kodu Solidity swojego kontraktu, nikt nie potraktuje Cię poważnie, dopóki nie opublikujesz kodu źródłowego i wersji Solidity, w której został skompilowany, aby można go było zweryfikować z dostarczonym kodem w języku maszynowym. Na przykład, zobacz [ten kontrakt](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Zwraca ilość tokenów posiadanych przez `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Jak sama nazwa wskazuje, `balanceOf` zwraca saldo konta. Konta Ethereum są identyfikowane w Solidity za pomocą typu `address`, który przechowuje 160 bitów. Jest to również `external` i `view`.

&nbsp;

```solidity
    /**
     * @dev Przenosi `amount` tokenów z konta wywołującego do `recipient`.
     *
     * Zwraca wartość logiczną wskazującą, czy operacja się powiodła.
     *
     * Emituje zdarzenie {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Funkcja `transfer` wykonuje transfer tokenów od wywołującego na inny adres. Wiąże się to ze zmianą stanu, więc nie jest to `view`. Kiedy użytkownik wywołuje tę funkcję, tworzy ona transakcję i kosztuje gaz. Emituje również zdarzenie, `Transfer`, aby poinformować wszystkich w blockchainie o tym zdarzeniu.

Funkcja ma dwa rodzaje wyjścia dla dwóch różnych typów wywołujących:

- Użytkownicy, którzy wywołują funkcję bezpośrednio z interfejsu użytkownika. Zazwyczaj użytkownik przesyła transakcję i nie czeka na odpowiedź, co mogłoby zająć nieokreśloną ilość czasu. Użytkownik może zobaczyć, co się stało, szukając pokwitowania transakcji (które jest identyfikowane przez hash transakcji) lub szukając zdarzenia `Transfer`.
- Inne kontrakty, które wywołują funkcję w ramach ogólnej transakcji. Kontrakty te otrzymują wynik natychmiast, ponieważ działają w tej samej transakcji, więc mogą użyć wartości zwracanej przez funkcję.

Ten sam typ wyjścia jest tworzony przez inne funkcje, które zmieniają stan kontraktu.

&nbsp;

Limity wydatków pozwalają kontu na wydanie pewnej ilości tokenów należących do innego właściciela. Jest to przydatne na przykład w przypadku kontraktów pełniących rolę sprzedawców. Kontrakty nie mogą monitorować zdarzeń, więc gdyby kupujący przetransferował tokeny bezpośrednio do kontraktu sprzedawcy, kontrakt ten nie wiedziałby, że otrzymał zapłatę. Zamiast tego kupujący pozwala kontraktowi sprzedawcy wydać określoną kwotę, a sprzedawca transferuje tę kwotę. Odbywa się to poprzez funkcję wywoływaną przez kontrakt sprzedawcy, dzięki czemu kontrakt sprzedawcy może wiedzieć, czy operacja się powiodła.

```solidity
    /**
     * @dev Zwraca pozostałą liczbę tokenów, które `spender` będzie
     * mógł wydać w imieniu `owner` poprzez {transferFrom}. Domyślnie wynosi
     * zero.
     *
     * Ta wartość zmienia się, gdy wywoływane są {approve} lub {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Funkcja `allowance` pozwala każdemu sprawdzić, jaki jest limit wydatków, który jeden adres (`owner`) pozwala wydać innemu adresowi (`spender`).

&nbsp;

```solidity
    /**
     * @dev Ustawia `amount` jako limit wydatków dla `spender` na tokenach wywołującego.
     *
     * Zwraca wartość logiczną wskazującą, czy operacja się powiodła.
     *
     * WAŻNE: Należy pamiętać, że zmiana limitu wydatków za pomocą tej metody niesie ze sobą ryzyko,
     * że ktoś może wykorzystać zarówno stary, jak i nowy limit wydatków z powodu niefortunnej
     * kolejności transakcji. Jednym z możliwych rozwiązań łagodzących ten problem
     * jest najpierw zmniejszenie limitu wydatków dla `spender` do 0, a następnie ustawienie
     * żądanej wartości:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emituje zdarzenie {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Funkcja `approve` tworzy limit wydatków. Koniecznie przeczytaj wiadomość o tym, jak może to zostać nadużyte. W Ethereum kontrolujesz kolejność własnych transakcji, ale nie możesz kontrolować kolejności, w jakiej będą wykonywane transakcje innych osób, chyba że nie prześlesz własnej transakcji, dopóki nie zobaczysz, że transakcja drugiej strony została zrealizowana.

&nbsp;

```solidity
    /**
     * @dev Przenosi `amount` tokenów od `sender` do `recipient` przy użyciu
     * mechanizmu limitu wydatków. `amount` jest następnie odejmowane od limitu wydatków
     * wywołującego.
     *
     * Zwraca wartość logiczną wskazującą, czy operacja się powiodła.
     *
     * Emituje zdarzenie {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Na koniec, `transferFrom` jest używane przez wydającego do faktycznego wydania limitu wydatków.

&nbsp;

```solidity

    /**
     * @dev Emitowane, gdy `value` tokenów zostaje przeniesionych z jednego konta (`from`) na
     * drugie (`to`).
     *
     * Należy pamiętać, że `value` może wynosić zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitowane, gdy limit wydatków dla `spender` od `owner` jest ustawiany przez
     * wywołanie {approve}. `value` to nowy limit wydatków.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Te zdarzenia są emitowane, gdy zmienia się stan kontraktu ERC-20.

## Właściwy kontrakt {#the-actual-contract}

To jest właściwy kontrakt, który implementuje standard ERC-20, [pobrany stąd](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Nie jest on przeznaczony do użycia w obecnej postaci, ale możesz po nim [dziedziczyć](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm), aby rozszerzyć go do czegoś użytecznego.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Instrukcje importu {#import-statements}

Oprócz powyższych definicji interfejsu, definicja kontraktu importuje dwa inne pliki:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` to definicje wymagane do korzystania z [OpenGSN](https://www.opengsn.org/), systemu, który pozwala użytkownikom bez etheru na korzystanie z blockchaina. Zauważ, że jest to stara wersja, jeśli chcesz zintegrować się z OpenGSN, [skorzystaj z tego samouczka](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Biblioteka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), która zapobiega przepełnieniom arytmetycznym (overflow/underflow) dla wersji Solidity **&lt;0.8.0**. W Solidity ≥0.8.0 operacje arytmetyczne automatycznie powodują wycofanie w przypadku przepełnienia, co czyni SafeMath niepotrzebnym. Ten kontrakt używa SafeMath dla kompatybilności wstecznej ze starszymi wersjami kompilatora.

&nbsp;

Ten komentarz wyjaśnia cel kontraktu.

```solidity
/**
 * @dev Implementacja interfejsu {IERC20}.
 *
 * Ta implementacja jest niezależna od sposobu tworzenia tokenów. Oznacza to,
 * że mechanizm podaży musi zostać dodany w kontrakcie pochodnym przy użyciu {_mint}.
 * Ogólny mechanizm można znaleźć w {ERC20PresetMinterPauser}.
 *
 * WSKAZÓWKA: Szczegółowy opis znajduje się w naszym przewodniku
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Postępowaliśmy zgodnie z ogólnymi wytycznymi OpenZeppelin: funkcje wycofują zmiany (revert) zamiast
 * zwracać `false` w przypadku niepowodzenia. To zachowanie jest jednak konwencjonalne
 * i nie koliduje z oczekiwaniami aplikacji ERC-20.
 *
 * Dodatkowo, zdarzenie {Approval} jest emitowane przy wywołaniach {transferFrom}.
 * Pozwala to aplikacjom na zrekonstruowanie limitu wydatków dla wszystkich kont tylko
 * poprzez nasłuchiwanie tych zdarzeń. Inne implementacje EIP mogą nie emitować
 * tych zdarzeń, ponieważ nie jest to wymagane przez specyfikację.
 *
 * Na koniec dodano niestandardowe funkcje {decreaseAllowance} i {increaseAllowance},
 * aby złagodzić dobrze znane problemy związane z ustawianiem
 * limitów wydatków. Zobacz {IERC20-approve}.
 */

```

### Definicja kontraktu {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Ta linia określa dziedziczenie, w tym przypadku z `IERC20` z powyższego kodu oraz `Context` dla OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Ta linia dołącza bibliotekę `SafeMath` do typu `uint256`. Możesz znaleźć tę bibliotekę [tutaj](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definicje zmiennych {#variable-definitions}

Te definicje określają zmienne stanu kontraktu. Zmienne te są zadeklarowane jako `private`, ale oznacza to tylko tyle, że inne kontrakty na blockchainie nie mogą ich odczytać. _Na blockchainie nie ma tajemnic_, oprogramowanie na każdym węźle posiada stan każdego kontraktu w każdym bloku. Zgodnie z konwencją, zmienne stanu nazywane są `_<something>`.

Pierwsze dwie zmienne to [mapowania](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), co oznacza, że zachowują się mniej więcej tak samo jak [tablice asocjacyjne](https://wikipedia.org/wiki/Associative_array), z tą różnicą, że kluczami są wartości numeryczne. Pamięć jest przydzielana tylko dla wpisów, które mają wartości inne niż domyślne (zero).

```solidity
    mapping (address => uint256) private _balances;
```

Pierwsze mapowanie, `_balances`, to adresy i ich odpowiednie salda tego tokena. Aby uzyskać dostęp do salda, użyj tej składni: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Ta zmienna, `_allowances`, przechowuje limity wydatków wyjaśnione wcześniej. Pierwszy indeks to właściciel tokenów, a drugi to kontrakt z limitem wydatków. Aby uzyskać dostęp do kwoty, którą adres A może wydać z konta adresu B, użyj `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Jak sama nazwa wskazuje, ta zmienna śledzi całkowitą podaż tokenów.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Te trzy zmienne służą do poprawy czytelności. Pierwsze dwie są oczywiste, ale `_decimals` nie jest.

Z jednej strony Ethereum nie ma zmiennych zmiennoprzecinkowych ani ułamkowych. Z drugiej strony ludzie lubią mieć możliwość dzielenia tokenów. Jednym z powodów, dla których ludzie zdecydowali się na złoto jako walutę, było to, że trudno było wydać resztę, gdy ktoś chciał kupić krowę o wartości kaczki.

Rozwiązaniem jest śledzenie liczb całkowitych, ale liczenie zamiast prawdziwego tokena ułamkowego tokena, który jest prawie bezwartościowy. W przypadku etheru ułamkowy token nazywa się wei, a 10^18 wei jest równe jednemu ETH. W momencie pisania tego tekstu 10 000 000 000 000 wei to w przybliżeniu jeden cent amerykański lub eurocent.

Aplikacje muszą wiedzieć, jak wyświetlić saldo tokenów. Jeśli użytkownik ma 3 141 000 000 000 000 000 wei, czy to jest 3,14 ETH? 31,41 ETH? 3 141 ETH? W przypadku etheru zdefiniowano 10^18 wei na ETH, ale dla swojego tokena możesz wybrać inną wartość. Jeśli dzielenie tokena nie ma sensu, możesz użyć wartości `_decimals` równej zero. Jeśli chcesz użyć tego samego standardu co ETH, użyj wartości **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Ustawia wartości dla {name} i {symbol}, inicjuje {decimals}
     * domyślną wartością 18.
     *
     * Aby wybrać inną wartość dla {decimals}, użyj {_setupDecimals}.
     *
     * Wszystkie trzy z tych wartości są niezmienne: mogą zostać ustawione tylko raz w
     * konstruktorze.
     */
    constructor (string memory name_, string memory symbol_) public {
        // W Solidity ≥0.7.0 'public' jest domyślne i może zostać pominięte.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor jest wywoływany przy pierwszym tworzeniu kontraktu. Zgodnie z konwencją, parametry funkcji nazywane są `<something>_`.

### Funkcje interfejsu użytkownika {#user-interface-functions}

```solidity
    /**
     * @dev Zwraca nazwę tokena.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Zwraca symbol tokena, zazwyczaj krótszą wersję
     * nazwy.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Zwraca liczbę miejsc po przecinku używaną do uzyskania reprezentacji dla użytkownika.
     * Na przykład, jeśli `decimals` wynosi `2`, saldo `505` tokenów powinno
     * zostać wyświetlone użytkownikowi jako `5,05` (`505 / 10 ** 2`).
     *
     * Tokeny zazwyczaj przyjmują wartość 18, naśladując relację między
     * etherem a wei. Jest to wartość, której używa {ERC20}, chyba że wywołano
     * {_setupDecimals}.
     *
     * UWAGA: Ta informacja jest używana tylko do celów _wyświetlania_: w
     * żaden sposób nie wpływa na arytmetykę kontraktu, w tym
     * {IERC20-balanceOf} i {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Te funkcje, `name`, `symbol` i `decimals`, pomagają interfejsom użytkownika dowiedzieć się o Twoim kontrakcie, aby mogły go poprawnie wyświetlić.

Typem zwracanym jest `string memory`, co oznacza zwrócenie ciągu znaków przechowywanego w pamięci. Zmienne, takie jak ciągi znaków, mogą być przechowywane w trzech lokalizacjach:

|          | Czas życia         | Dostęp z kontraktu | Koszt gazu                                                                                             |
| -------- | ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------ |
| Pamięć (Memory)   | Wywołanie funkcji  | Odczyt/Zapis       | Dziesiątki lub setki (więcej dla wyższych lokalizacji)                                                 |
| Dane wywołania (Calldata) | Wywołanie funkcji  | Tylko do odczytu   | Nie może być użyte jako typ zwracany, tylko jako typ parametru funkcji                                 |
| Pamięć trwała (Storage)  | Do momentu zmiany  | Odczyt/Zapis       | Wysoki (800 za odczyt, 20k za zapis)                                                                   |

W tym przypadku `memory` jest najlepszym wyborem.

### Odczyt informacji o tokenie {#read-token-information}

Są to funkcje, które dostarczają informacji o tokenie, czy to o całkowitej podaży, czy o saldzie konta.

```solidity
    /**
     * @dev Zobacz {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Funkcja `totalSupply` zwraca całkowitą podaż tokenów.

&nbsp;

```solidity
    /**
     * @dev Zobacz {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Odczyt salda konta. Zauważ, że każdy może uzyskać saldo konta dowolnej innej osoby. Nie ma sensu próbować ukrywać tych informacji, ponieważ i tak są one dostępne na każdym węźle. _Na blockchainie nie ma tajemnic._

### Transfer tokenów {#transfer-tokens}

```solidity
    /**
     * @dev Zobacz {IERC20-transfer}.
     *
     * Wymagania:
     *
     * - `recipient` nie może być adresem zerowym.
     * - wywołujący musi posiadać saldo wynoszące co najmniej `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Funkcja `transfer` jest wywoływana w celu transferu tokenów z konta nadawcy na inne. Zauważ, że chociaż zwraca wartość logiczną, wartość ta jest zawsze **true**. Jeśli transfer się nie powiedzie, kontrakt wycofuje wywołanie.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Funkcja `_transfer` wykonuje właściwą pracę. Jest to funkcja prywatna, która może być wywoływana tylko przez inne funkcje kontraktu. Zgodnie z konwencją funkcje prywatne nazywane są `_<something>`, tak samo jak zmienne stanu.

Zazwyczaj w Solidity używamy `msg.sender` dla nadawcy wiadomości. Jednak to psuje [OpenGSN](https://opengsn.org/). Jeśli chcemy zezwolić na transakcje bez etheru z naszym tokenem, musimy użyć `_msgSender()`. Zwraca to `msg.sender` dla normalnych transakcji, ale dla tych bez etheru zwraca oryginalnego sygnatariusza, a nie kontrakt, który przekazał wiadomość.

### Funkcje limitu wydatków {#allowance-functions}

Są to funkcje, które implementują funkcjonalność limitu wydatków: `allowance`, `approve`, `transferFrom` i `_approve`. Dodatkowo implementacja OpenZeppelin wykracza poza podstawowy standard, aby uwzględnić pewne funkcje poprawiające bezpieczeństwo: `increaseAllowance` i `decreaseAllowance`.

#### Funkcja allowance {#allowance}

```solidity
    /**
     * @dev Zobacz {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Funkcja `allowance` pozwala każdemu sprawdzić dowolny limit wydatków.

#### Funkcja approve {#approve}

```solidity
    /**
     * @dev Zobacz {IERC20-approve}.
     *
     * Wymagania:
     *
     * - `spender` nie może być adresem zerowym.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Ta funkcja jest wywoływana w celu utworzenia limitu wydatków. Jest podobna do powyższej funkcji `transfer`:

- Funkcja po prostu wywołuje funkcję wewnętrzną (w tym przypadku `_approve`), która wykonuje właściwą pracę.
- Funkcja zwraca `true` (jeśli się powiedzie) lub wycofuje transakcję (jeśli nie).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Używamy funkcji wewnętrznych, aby zminimalizować liczbę miejsc, w których zachodzą zmiany stanu. _Każda_ funkcja, która zmienia stan, jest potencjalnym zagrożeniem bezpieczeństwa, które musi zostać poddane audytowi. W ten sposób mamy mniejsze szanse na popełnienie błędu.

#### Funkcja transferFrom {#transferfrom}

Jest to funkcja, którą wywołuje wydający, aby wydać limit wydatków. Wymaga to dwóch operacji: transferu wydawanej kwoty i zmniejszenia limitu wydatków o tę kwotę.

```solidity
    /**
     * @dev Zobacz {IERC20-transferFrom}.
     *
     * Emituje zdarzenie {Approval} wskazujące zaktualizowany limit wydatków. Nie jest to
     * wymagane przez EIP. Zobacz notatkę na początku {ERC20}.
     *
     * Wymagania:
     *
     * - `sender` i `recipient` nie mogą być adresem zerowym.
     * - `sender` musi posiadać saldo wynoszące co najmniej `amount`.
     * - wywołujący musi posiadać limit wydatków dla tokenów ``sender`` wynoszący co najmniej
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Wywołanie funkcji `a.sub(b, "message")` robi dwie rzeczy. Po pierwsze, oblicza `a-b`, co jest nowym limitem wydatków. Po drugie, sprawdza, czy ten wynik nie jest ujemny. Jeśli jest ujemny, wywołanie zostaje wycofane z podaną wiadomością. Zauważ, że kiedy wywołanie zostaje wycofane, wszelkie przetwarzanie wykonane wcześniej podczas tego wywołania jest ignorowane, więc nie musimy cofać `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Dodatki bezpieczeństwa OpenZeppelin {#openzeppelin-safety-additions}

Niebezpieczne jest ustawianie niezerowego limitu wydatków na inną niezerową wartość, ponieważ kontrolujesz tylko kolejność własnych transakcji, a nie cudzych. Wyobraź sobie, że masz dwóch użytkowników: naiwną Alice i nieuczciwego Billa. Alice chce od Billa jakiejś usługi, która jej zdaniem kosztuje pięć tokenów - więc daje Billowi limit wydatków w wysokości pięciu tokenów.

Potem coś się zmienia i cena Billa rośnie do dziesięciu tokenów. Alice, która nadal chce usługi, wysyła transakcję, która ustawia limit wydatków Billa na dziesięć. W momencie, gdy Bill widzi tę nową transakcję w puli transakcji, wysyła transakcję, która wydaje pięć tokenów Alice i ma znacznie wyższą cenę gazu, dzięki czemu zostanie wydobyta szybciej. W ten sposób Bill może wydać najpierw pięć tokenów, a następnie, gdy nowy limit wydatków Alice zostanie wydobyty, wydać kolejne dziesięć za łączną cenę piętnastu tokenów, czyli więcej, niż Alice zamierzała autoryzować. Ta technika nazywa się [wyprzedzaniem transakcji](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transakcja Alice | Nonce Alice | Transakcja Billa              | Nonce Billa | Limit wydatków Billa | Całkowity dochód Billa od Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Aby uniknąć tego problemu, te dwie funkcje (`increaseAllowance` i `decreaseAllowance`) pozwalają na modyfikację limitu wydatków o określoną kwotę. Więc jeśli Bill wydał już pięć tokenów, będzie mógł wydać tylko pięć kolejnych. W zależności od czasu, istnieją dwa sposoby, w jakie może to zadziałać, z których oba kończą się tym, że Bill otrzymuje tylko dziesięć tokenów:

A:

| Transakcja Alice           | Nonce Alice | Transakcja Billa             | Nonce Billa | Limit wydatków Billa | Całkowity dochód Billa od Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Transakcja Alice           | Nonce Alice | Transakcja Billa              | Nonce Billa | Limit wydatków Billa | Całkowity dochód Billa od Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev Atomicznie zwiększa limit wydatków przyznany `spender` przez wywołującego.
     *
     * Jest to alternatywa dla {approve}, która może być użyta jako środek zaradczy na
     * problemy opisane w {IERC20-approve}.
     *
     * Emituje zdarzenie {Approval} wskazujące zaktualizowany limit wydatków.
     *
     * Wymagania:
     *
     * - `spender` nie może być adresem zerowym.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Funkcja `a.add(b)` to bezpieczne dodawanie. W mało prawdopodobnym przypadku, gdy `a`+`b`>=`2^256`, nie zawija się ona w sposób, w jaki robi to normalne dodawanie.

```solidity

    /**
     * @dev Atomicznie zmniejsza limit wydatków przyznany `spender` przez wywołującego.
     *
     * Jest to alternatywa dla {approve}, która może być użyta jako środek zaradczy na
     * problemy opisane w {IERC20-approve}.
     *
     * Emituje zdarzenie {Approval} wskazujące zaktualizowany limit wydatków.
     *
     * Wymagania:
     *
     * - `spender` nie może być adresem zerowym.
     * - `spender` musi posiadać limit wydatków dla wywołującego wynoszący co najmniej
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funkcje modyfikujące informacje o tokenie {#functions-that-modify-token-information}

Oto cztery funkcje, które wykonują właściwą pracę: `_transfer`, `_mint`, `_burn` i `_approve`.

#### Funkcja _transfer {#transfer}

```solidity
    /**
     * @dev Przenosi `amount` tokenów od `sender` do `recipient`.
     *
     * Ta wewnętrzna funkcja jest odpowiednikiem {transfer} i może być użyta do
     * np. implementacji automatycznych opłat w tokenach, mechanizmów slashingu itp.
     *
     * Emituje zdarzenie {Transfer}.
     *
     * Wymagania:
     *
     * - `sender` nie może być adresem zerowym.
     * - `recipient` nie może być adresem zerowym.
     * - `sender` musi posiadać saldo wynoszące co najmniej `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Ta funkcja, `_transfer`, transferuje tokeny z jednego konta na drugie. Jest wywoływana zarówno przez `transfer` (dla transferów z własnego konta nadawcy), jak i `transferFrom` (dla użycia limitów wydatków do transferu z cudzego konta).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nikt tak naprawdę nie jest właścicielem adresu zerowego w Ethereum (to znaczy nikt nie zna klucza prywatnego, którego pasujący klucz publiczny jest przekształcany na adres zerowy). Kiedy ludzie używają tego adresu, jest to zazwyczaj błąd oprogramowania - więc przerywamy działanie, jeśli adres zerowy jest używany jako nadawca lub odbiorca.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Istnieją dwa sposoby korzystania z tego kontraktu:

1. Użyj go jako szablonu dla własnego kodu
1. [Dziedzicz po nim](https://www.bitdegree.org/learn/solidity-inheritance) i nadpisz tylko te funkcje, które musisz zmodyfikować

Druga metoda jest znacznie lepsza, ponieważ kod ERC-20 od OpenZeppelin został już poddany audytowi i wykazano, że jest bezpieczny. Kiedy używasz dziedziczenia, jasne jest, jakie funkcje modyfikujesz, a aby zaufać Twojemu kontraktowi, ludzie muszą jedynie przeprowadzić audyt tych konkretnych funkcji.

Często przydatne jest wykonanie funkcji za każdym razem, gdy tokeny zmieniają właściciela. Jednak `_transfer` jest bardzo ważną funkcją i można ją napisać w sposób niebezpieczny (patrz poniżej), więc najlepiej jej nie nadpisywać. Rozwiązaniem jest `_beforeTokenTransfer`, [funkcja hook](https://wikipedia.org/wiki/Hooking). Możesz nadpisać tę funkcję, a będzie ona wywoływana przy każdym transferze.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

To są linie, które faktycznie wykonują transfer. Zauważ, że nie ma między nimi **niczego**, i że odejmujemy transferowaną kwotę od nadawcy przed dodaniem jej do odbiorcy. Jest to ważne, ponieważ gdyby w środku znajdowało się wywołanie innego kontraktu, mogłoby to zostać użyte do oszukania tego kontraktu. W ten sposób transfer jest atomowy, nic nie może się wydarzyć w jego trakcie.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Na koniec wyemituj zdarzenie `Transfer`. Zdarzenia nie są dostępne dla inteligentnych kontraktów, ale kod działający poza blockchainem może nasłuchiwać zdarzeń i reagować na nie. Na przykład portfel może śledzić, kiedy właściciel otrzymuje więcej tokenów.

#### Funkcje _mint i _burn {#mint-and-burn}

Te dwie funkcje (`_mint` i `_burn`) modyfikują całkowitą podaż tokenów. Są one wewnętrzne i w tym kontrakcie nie ma funkcji, która by je wywoływała, więc są przydatne tylko wtedy, gdy dziedziczysz po kontrakcie i dodajesz własną logikę, aby zdecydować, w jakich warunkach wybijać nowe tokeny lub spalić istniejące.

**UWAGA:** Każdy token ERC-20 ma własną logikę biznesową, która dyktuje zarządzanie tokenami. Na przykład kontrakt o stałej podaży może wywoływać `_mint` tylko w konstruktorze i nigdy nie wywoływać `_burn`. Kontrakt, który sprzedaje tokeny, wywoła `_mint` po otrzymaniu zapłaty i prawdopodobnie wywoła `_burn` w pewnym momencie, aby uniknąć niekontrolowanej inflacji.

```solidity
    /** @dev Tworzy `amount` tokenów i przypisuje je do `account`, zwiększając
     * całkowitą podaż.
     *
     * Emituje zdarzenie {Transfer} z `from` ustawionym na adres zerowy.
     *
     * Wymagania:
     *
     * - `to` nie może być adresem zerowym.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Pamiętaj, aby zaktualizować `_totalSupply`, gdy zmieni się całkowita liczba tokenów.

&nbsp;

```solidity
    /**
     * @dev Niszczy `amount` tokenów z `account`, zmniejszając
     * całkowitą podaż.
     *
     * Emituje zdarzenie {Transfer} z `to` ustawionym na adres zerowy.
     *
     * Wymagania:
     *
     * - `account` nie może być adresem zerowym.
     * - `account` musi posiadać co najmniej `amount` tokenów.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Funkcja `_burn` jest prawie identyczna z `_mint`, z tą różnicą, że działa w odwrotnym kierunku.

#### Funkcja _approve {#approve-2}

Jest to funkcja, która faktycznie określa limity wydatków. Zauważ, że pozwala ona właścicielowi określić limit wydatków, który jest wyższy niż obecne saldo właściciela. Jest to w porządku, ponieważ saldo jest sprawdzane w momencie transferu, kiedy może różnić się od salda w momencie tworzenia limitu wydatków.

```solidity
    /**
     * @dev Ustawia `amount` jako limit wydatków dla `spender` na tokenach `owner`.
     *
     * Ta wewnętrzna funkcja jest odpowiednikiem `approve` i może być użyta do
     * np. ustawiania automatycznych limitów wydatków dla pewnych podsystemów itp.
     *
     * Emituje zdarzenie {Approval}.
     *
     * Wymagania:
     *
     * - `owner` nie może być adresem zerowym.
     * - `spender` nie może być adresem zerowym.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Wyemituj zdarzenie `Approval`. W zależności od tego, jak napisana jest aplikacja, kontrakt wydającego może zostać poinformowany o zatwierdzeniu przez właściciela lub przez serwer, który nasłuchuje tych zdarzeń.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modyfikacja zmiennej Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Ustawia {decimals} na wartość inną niż domyślne 18.
     *
     * OSTRZEŻENIE: Ta funkcja powinna być wywoływana tylko z konstruktora. Większość
     * aplikacji, które wchodzą w interakcję z kontraktami tokenów, nie będzie oczekiwać,
     * że {decimals} kiedykolwiek się zmieni, i może działać nieprawidłowo, jeśli tak się stanie.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Ta funkcja modyfikuje zmienną `_decimals`, która służy do informowania interfejsów użytkownika, jak interpretować kwotę. Powinieneś wywołać ją z konstruktora. Nieuczciwe byłoby wywoływanie jej w jakimkolwiek późniejszym momencie, a aplikacje nie są zaprojektowane do jej obsługi.

### Hooki {#hooks}

```solidity

    /**
     * @dev Hook, który jest wywoływany przed każdym transferem tokenów. Obejmuje to
     * wybijanie (minting) i palenie (burning).
     *
     * Warunki wywołania:
     *
     * - gdy `from` i `to` są różne od zera, `amount` tokenów ``from``
     * zostanie przetransferowane do `to`.
     * - gdy `from` wynosi zero, `amount` tokenów zostanie wybitych dla `to`.
     * - gdy `to` wynosi zero, `amount` tokenów ``from`` zostanie spalonych.
     * - `from` i `to` nigdy nie są jednocześnie zerem.
     *
     * Aby dowiedzieć się więcej o hookach, przejdź do xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

To jest funkcja hook, która ma być wywoływana podczas transferów. Tutaj jest pusta, ale jeśli potrzebujesz, aby coś robiła, po prostu ją nadpisz.

## Wnioski {#conclusion}

Dla podsumowania, oto niektóre z najważniejszych pomysłów w tym kontrakcie (moim zdaniem, Twoje mogą się różnić):

- _Na blockchainie nie ma tajemnic_. Wszelkie informacje, do których inteligentny kontrakt ma dostęp, są dostępne dla całego świata.
- Możesz kontrolować kolejność własnych transakcji, ale nie to, kiedy mają miejsce transakcje innych osób. Z tego powodu zmiana limitu wydatków może być niebezpieczna, ponieważ pozwala wydającemu wydać sumę obu limitów wydatków.
- Wartości typu `uint256` zawijają się. Innymi słowy, _0-1=2^256-1_. Jeśli nie jest to pożądane zachowanie, musisz to sprawdzić (lub użyć biblioteki SafeMath, która zrobi to za Ciebie). Zauważ, że zmieniło się to w [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Dokonuj wszystkich zmian stanu określonego typu w określonym miejscu, ponieważ ułatwia to audyt. Z tego powodu mamy na przykład `_approve`, które jest wywoływane przez `approve`, `transferFrom`, `increaseAllowance` i `decreaseAllowance`
- Zmiany stanu powinny być atomowe, bez żadnych innych akcji w ich trakcie (jak widać w `_transfer`). Dzieje się tak, ponieważ podczas zmiany stanu masz niespójny stan. Na przykład, między czasem odjęcia od salda nadawcy a czasem dodania do salda odbiorcy istnieje mniej tokenów, niż powinno. Mogłoby to zostać potencjalnie nadużyte, gdyby pomiędzy nimi znajdowały się operacje, zwłaszcza wywołania innego kontraktu.

Teraz, gdy już wiesz, jak napisany jest kontrakt ERC-20 od OpenZeppelin, a zwłaszcza jak jest on zabezpieczony, idź i napisz własne bezpieczne kontrakty i aplikacje.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).