---
title: "Przewodnik po kontrakcie ERC-20"
description: Co znajduje się w kontrakcie ERC-20 OpenZeppelin i dlaczego tam jest?
author: Ori Pomerantz
lang: pl
tags: [ "solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Wprowadzenie {#introduction}

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę wymienialnych tokenów, w pewnym sensie własnej waluty. Tokeny te zazwyczaj są zgodne ze standardem,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Standard ten umożliwia pisanie narzędzi, takich jak pule płynności i portfele, które działają ze wszystkimi tokenami ERC-20
. W tym artykule przeanalizujemy [implementację ERC20 w Solidity od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), a także [definicję interfejsu](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

To jest kod źródłowy z adnotacjami. Jeśli chcesz zaimplementować ERC-20,
[przeczytaj ten samouczek](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Interfejs {#the-interface}

Celem standardu takiego jak ERC-20 jest umożliwienie wielu implementacji tokenów, które są interoperacyjne w różnych aplikacjach, takich jak portfele i zdecentralizowane giełdy. Aby to osiągnąć, tworzymy
[interfejs](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Każdy kod, który musi używać kontraktu tokenu,
może używać tych samych definicji w interfejsie i być kompatybilnym ze wszystkimi kontraktami tokenów, które go używają, niezależnie od tego, czy jest to portfel, taki jak
MetaMask, dapka, taka jak etherscan.io, czy inny kontrakt, taki jak pula płynności.

![Ilustracja interfejsu ERC-20](erc20_interface.png)

Jeśli jesteś doświadczonym programistą, prawdopodobnie pamiętasz podobne konstrukcje w [Javie](https://www.w3schools.com/java/java_interface.asp)
lub nawet w [plikach nagłówkowych C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Jest to definicja [interfejsu ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
pochodząca z OpenZeppelin. Jest to tłumaczenie [standardu czytelnego dla człowieka](https://eips.ethereum.org/EIPS/eip-20) na kod Solidity. Oczywiście, sam
interfejs nie definiuje _jak_ cokolwiek zrobić. Jest to wyjaśnione w poniższym kodzie źródłowym kontraktu.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Pliki Solidity powinny zawierać identyfikator licencji. [Listę licencji można zobaczyć tutaj](https://spdx.org/licenses/). Jeśli potrzebujesz innej
licencji, po prostu wyjaśnij to w komentarzach.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Język Solidity wciąż szybko się rozwija, a nowe wersje mogą nie być kompatybilne ze starym kodem
([zobacz tutaj](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Dlatego dobrym pomysłem jest określenie nie tylko minimalnej
wersji języka, ale także maksymalnej wersji, najnowszej, z którą testowano kod.

&nbsp;

```solidity
/**
 * @dev Interfejs standardu ERC20 zdefiniowany w EIP.
 */
```

Zapis `@dev` w komentarzu jest częścią [formatu NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), używanego do tworzenia
dokumentacji z kodu źródłowego.

&nbsp;

```solidity
interface IERC20 {
```

Zgodnie z konwencją, nazwy interfejsów zaczynają się od `I`.

&nbsp;

```solidity
    /**
     * @dev Zwraca liczbę istniejących tokenów.
     */
    function totalSupply() external view returns (uint256);
```

Ta funkcja jest `zewnętrzna`, co oznacza, że [może być wywoływana tylko spoza kontraktu](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Zwraca całkowitą podaż tokenów w kontrakcie. Wartość ta jest zwracana przy użyciu najpopularniejszego typu w Ethereum, 256-bitowej liczby całkowitej bez znaku (256 bitów to
natywny rozmiar słowa EVM). Ta funkcja jest również typu `view`, co oznacza, że nie zmienia ona stanu, więc może być wykonana na pojedynczym węźle zamiast być uruchamiana przez
każdy węzeł w blockchainie. Ten rodzaj funkcji nie generuje transakcji i nie kosztuje [gazu](/developers/docs/gas/).

**Uwaga:** Teoretycznie mogłoby się wydawać, że twórca kontraktu mógłby oszukiwać, zwracając mniejszą całkowitą podaż niż rzeczywista wartość, sprawiając, że każdy token wydaje się
bardziej wartościowy, niż jest w rzeczywistości. Jednakże obawa ta ignoruje prawdziwą naturę blockchaina. Wszystko, co dzieje się w blockchainie, może zostać zweryfikowane przez
każdy węzeł. Aby to osiągnąć, kod maszynowy i pamięć masowa każdego kontraktu są dostępne na każdym węźle. Chociaż nie jest wymagane publikowanie kodu Solidity
kontraktu, nikt nie potraktuje Cię poważnie, chyba że opublikujesz kod źródłowy i wersję Solidity, za pomocą której został on skompilowany, aby można go było
zweryfikować z dostarczonym kodem maszynowym.
Na przykład zobacz [ten kontrakt](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Zwraca liczbę tokenów posiadanych przez `konto`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Jak sama nazwa wskazuje, `balanceOf` zwraca saldo konta. Konta Ethereum są identyfikowane w Solidity za pomocą typu `adres`, który przechowuje 160 bitów.
Jest również `zewnętrzna` i typu `view`.

&nbsp;

```solidity
    /**
     * @dev Przenosi tokeny w `ilości` z konta wywołującego do `odbiorcy`.
     *
     * Zwraca wartość logiczną wskazującą, czy operacja się powiodła.
     *
     * Emituje zdarzenie {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Funkcja `transfer` przenosi tokeny od wywołującego na inny adres. Wiąże się to ze zmianą stanu, więc nie jest to `widok`.
Gdy użytkownik wywołuje tę funkcję, tworzy transakcję i ponosi koszty gazu. Emituje również zdarzenie `Transfer`, aby poinformować wszystkich w
blockchainie o tym zdarzeniu.

Funkcja ma dwa rodzaje danych wyjściowych dla dwóch różnych typów wywołujących:

- Użytkownicy wywołujący funkcję bezpośrednio z interfejsu użytkownika. Zazwyczaj użytkownik przesyła transakcję
  i nie czeka na odpowiedź, co może zająć nieokreśloną ilość czasu. Użytkownik może zobaczyć, co się stało
  , szukając potwierdzenia transakcji (które jest identyfikowane przez hasz transakcji) lub szukając
  zdarzenia `Transfer`.
- Inne kontrakty, które wywołują funkcję w ramach ogólnej transakcji. Kontrakty te otrzymują wynik natychmiast,
  ponieważ działają w tej samej transakcji, więc mogą użyć wartości zwrotnej funkcji.

Ten sam typ danych wyjściowych jest tworzony przez inne funkcje, które zmieniają stan kontraktu.

&nbsp;

Zezwolenia pozwalają kontu na wydanie pewnej liczby tokenów należących do innego właściciela.
Jest to przydatne na przykład w przypadku kontraktów, które działają jako sprzedawcy. Kontrakty nie mogą
monitorować zdarzeń, więc jeśli kupujący miałby przenieść tokeny do kontraktu sprzedawcy
bezpośrednio, kontrakt ten nie wiedziałby, że został opłacony. Zamiast tego, kupujący zezwala
kontraktowi sprzedawcy na wydanie określonej kwoty, a sprzedawca transferuje tę kwotę.
Odbywa się to za pomocą funkcji wywoływanej przez kontrakt sprzedawcy, więc kontrakt sprzedawcy
może wiedzieć, czy się to udało.

```solidity
    /**
     * @dev Zwraca pozostałą liczbę tokenów, które `spender` będzie mógł
     * wydać w imieniu `owner` poprzez {transferFrom}. Domyślnie
     * jest to zero.
     *
     * Wartość ta zmienia się po wywołaniu {approve} lub {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Funkcja `allowance` pozwala każdemu sprawdzić, jakie jest zezwolenie, które jeden
adres (`właściciel`) daje innemu adresowi (`wydającemu`) do wydania.

&nbsp;

```solidity
    /**
     * @dev Ustawia `amount` jako zezwolenie `spendera` na tokeny wywołującego.
     *
     * Zwraca wartość logiczną wskazującą, czy operacja się powiodła.
     *
     * WAŻNE: Należy pamiętać, że zmiana zezwolenia za pomocą tej metody niesie ze sobą ryzyko,
     * że ktoś może użyć zarówno starego, jak i nowego zezwolenia przez niefortunne
     * uporządkowanie transakcji. Jednym z możliwych rozwiązań w celu złagodzenia tego stanu wyścigu
     * jest najpierw zmniejszenie zezwolenia wydającego do 0 i ustawienie
     * pożądanej wartości później:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emituje zdarzenie {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Funkcja `approve` tworzy zezwolenie. Pamiętaj, aby przeczytać wiadomość o tym,
jak można ją nadużywać. W Ethereum kontrolujesz kolejność własnych transakcji,
ale nie możesz kontrolować kolejności, w jakiej transakcje innych osób będą
wykonywane, chyba że nie prześlesz własnej transakcji, dopóki nie zobaczysz, że
transakcja drugiej strony miała miejsce.

&nbsp;

```solidity
    /**
     * @dev Przenosi tokeny o `wartości` `amount` z `nadawcy` do `odbiorcy` przy użyciu
     * mechanizmu zezwoleń. `Kwota` jest następnie odejmowana od zezwolenia wywołującego
     * .
     *
     * Zwraca wartość logiczną wskazującą, czy operacja się powiodła.
     *
     * Emituje zdarzenie {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Na koniec `transferFrom` jest używane przez wydającego do faktycznego wydania zezwolenia.

&nbsp;

```solidity

    /**
     * @dev Emitowane, gdy tokeny `value` są przenoszone z jednego konta (`from`) na drugie (`to`).
     *
     * Zauważ, że `value` może być zerowe.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitowane, gdy pozwolenie `spendera` dla `owner` jest ustawiane przez wywołanie {approve}. `value` to nowe pozwolenie.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Te zdarzenia są emitowane, gdy zmienia się stan kontraktu ERC-20.

## Właściwy kontrakt {#the-actual-contract}

To jest właściwy kontrakt, który implementuje standard ERC-20, [pobrany stąd](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Nie jest on przeznaczony do użycia w obecnej formie, ale można go [odziedziczyć](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm), aby rozszerzyć go do czegoś użytecznego.

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

- `GSN/Context.sol` to definicje wymagane do użycia [OpenGSN](https://www.opengsn.org/), systemu, który pozwala użytkownikom bez etheru korzystać z blockchainu. Zauważ, że jest to stara wersja. Jeśli chcesz zintegrować z OpenGSN, [użyj tego samouczka](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Biblioteka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), która zapobiega przepełnieniom/niedopełnieniom arytmetycznym dla wersji Solidity **&lt;0.8.0**. W Solidity ≥0.8.0, operacje arytmetyczne automatycznie cofają się w przypadku przepełnienia/niedopełnienia, co sprawia, że biblioteka SafeMath jest niepotrzebna. Ten kontrakt używa SafeMath dla wstecznej kompatybilności ze starszymi wersjami kompilatora.

&nbsp;

Ten komentarz wyjaśnia cel kontraktu.

```solidity
/**
 * @dev Implementacja interfejsu {IERC20}.
 *
 * Ta implementacja jest niezależna od sposobu tworzenia tokenów. Oznacza to, że mechanizm zasilania musi zostać dodany w kontrakcie pochodnym za pomocą {_mint}.
 * Ogólny mechanizm można znaleźć w {ERC20PresetMinterPauser}.
 *
 * WSKAZÓWKA: Szczegółowy opis można znaleźć w naszym przewodniku
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Jak
 * wdrażać mechanizmy dostaw].
 *
 * Postępowaliśmy zgodnie z ogólnymi wytycznymi OpenZeppelin: funkcje w przypadku niepowodzenia cofają się, zamiast zwracać „fałsz”.
 * To zachowanie jest jednak konwencjonalne i nie jest sprzeczne z oczekiwaniami aplikacji ERC20.
 *
 * Dodatkowo zdarzenie {Approval} jest emitowane przy wywołaniach {transferFrom}.
 * Umożliwia to aplikacjom odtworzenie uprawnień dla wszystkich kont poprzez nasłuchiwanie tych zdarzeń.
 * Inne implementacje EIP mogą nie emitować tych zdarzeń, ponieważ nie jest to wymagane przez specyfikację.
 *
 * Wreszcie, niestandardowe funkcje {decreaseAllowance} i {increaseAllowance} zostały dodane w celu złagodzenia dobrze znanych problemów związanych z ustawianiem przydziałów.
 * Zobacz {IERC20-approve}.
 */

```

### Definicja kontraktu {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Ta linia określa dziedziczenie, w tym przypadku z `IERC20` z góry i `Context`, dla OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Ta linia dołącza bibliotekę `SafeMath` do typu `uint256`. Tę bibliotekę można znaleźć [tutaj](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definicje zmiennych {#variable-definitions}

Te definicje określają zmienne stanu kontraktu. Te zmienne są zadeklarowane jako `private`, ale oznacza to tylko, że inne kontrakty na blockchainie nie mogą ich odczytać. _Na blockchainie nie ma sekretów_, oprogramowanie na każdym węźle ma stan każdego kontraktu w każdym bloku. Zgodnie z konwencją zmienne stanu nazywane są `_<coś>`.

Pierwsze dwie zmienne to [mapowania](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), co oznacza, że zachowują się mniej więcej tak samo jak [tablice asocjacyjne](https://wikipedia.org/wiki/Associative_array), z tym wyjątkiem, że klucze są wartościami numerycznymi. Pamięć jest przydzielana tylko dla wpisów, które mają wartości różne od domyślnej (zero).

```solidity
    mapping (address => uint256) private _balances;
```

Pierwsze mapowanie, `_balances`, to adresy i ich odpowiednie salda tego tokena. Aby uzyskać dostęp do salda, użyj tej składni: `_balances[<adres>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Ta zmienna, `_allowances`, przechowuje wyjaśnione wcześniej uprawnienia. Pierwszy indeks to właściciel tokenów, a drugi to kontrakt z przydziałem. Aby uzyskać dostęp do kwoty, jaką adres A może wydać z konta adresu B, użyj `_allowances[B][A]`.

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

Te trzy zmienne są używane w celu poprawy czytelności. Dwie pierwsze są oczywiste, ale `_decimals` nie jest.

Z jednej strony Ethereum nie ma zmiennych zmiennoprzecinkowych ani ułamkowych. Z drugiej strony ludzie lubią mieć możliwość dzielenia tokenów. Jednym z powodów, dla których ludzie zdecydowali się na złoto jako walutę, było to, że trudno było wydać resztę, gdy ktoś chciał kupić kaczkę za część krowy.

Rozwiązaniem jest śledzenie liczb całkowitych, ale zamiast prawdziwego tokena liczenie tokena ułamkowego, który jest prawie bezwartościowy. W przypadku etheru token ułamkowy nazywa się wei, a 10^18 wei jest równe jednemu ETH. W momencie pisania tego tekstu 10 000 000 000 000 wei to w przybliżeniu jeden cent amerykański lub eurocent.

Aplikacje muszą wiedzieć, jak wyświetlić saldo tokena. Jeśli użytkownik ma 3 141 000 000 000 000 000 wei, czy to 3,14 ETH? 31,41 ETH? 3141 ETH? W przypadku etheru zdefiniowano 10^18 wei na ETH, ale dla Twojego tokena możesz wybrać inną wartość. Jeśli dzielenie tokena nie ma sensu, możesz użyć wartości `_decimals` równej zero. Jeśli chcesz używać tego samego standardu co ETH, użyj wartości **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Ustawia wartości dla {name} i {symbol}, inicjalizuje {decimals} z domyślną wartością 18.
     *
     * Aby wybrać inną wartość dla {decimals}, użyj {_setupDecimals}.
     *
     * Wszystkie trzy z tych wartości są niezmienne: można je ustawić tylko raz podczas tworzenia.
     */
    constructor (string memory name_, string memory symbol_) public {
        // W Solidity ≥0.7.0, „public” jest domyślne i można je pominąć.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor jest wywoływany przy pierwszym utworzeniu kontraktu. Zgodnie z konwencją parametry funkcji są nazywane `<coś>_`.

### Funkcje interfejsu użytkownika {#user-interface-functions}

```solidity
    /**
     * @dev Zwraca nazwę tokena.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Zwraca symbol tokena, zazwyczaj krótszą wersję nazwy.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Zwraca liczbę miejsc po przecinku używaną do uzyskania jego reprezentacji przez użytkownika.
     * Na przykład, jeśli `decimals` wynosi `2`, saldo `505` tokenów powinno być wyświetlone użytkownikowi jako `5,05` (`505 / 10 ** 2`).
     *
     * Tokeny zazwyczaj wybierają wartość 18, naśladując związek między etherem a wei.
     * Jest to wartość, której używa {ERC20}, chyba że zostanie wywołana funkcja {_setupDecimals}.
     *
     * UWAGA: Informacje te są wykorzystywane wyłącznie do celów _wyświetlania_: w żaden sposób nie wpływają na arytmetykę kontraktu,
     * w tym {IERC20-balanceOf} i {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Te funkcje, `name`, `symbol` i `decimals`, pomagają interfejsom użytkownika dowiedzieć się o Twoim kontrakcie, aby mogły go poprawnie wyświetlać.

Typem zwracanym jest `string memory`, co oznacza zwrócenie ciągu znaków przechowywanego w pamięci. Zmienne, takie jak ciągi znaków, mogą być przechowywane w trzech lokalizacjach:

|                | Czas życia        | Dostęp do kontraktu | Koszt gazu                                                                  |
| -------------- | ----------------- | ------------------- | --------------------------------------------------------------------------- |
| Pamięć         | Wywołanie funkcji | Odczyt/Zapis        | Dziesiątki lub setki (więcej dla wyższych lokalizacji)   |
| Calldata       | Wywołanie funkcji | Tylko do odczytu    | Nie może być używany jako typ zwracany, tylko jako typ parametru funkcji    |
| Przechowywanie | Do zmiany         | Odczyt/Zapis        | Wysoki (800 za odczyt, 20 tys. za zapis) |

W tym przypadku najlepszym wyborem jest `memory`.

### Odczyt informacji o tokenie {#read-token-information}

Są to funkcje, które dostarczają informacji o tokenie, albo o całkowitej podaży, albo o saldzie konta.

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

Odczytaj saldo konta. Zauważ, że każdy może sprawdzić saldo konta każdego innego. Nie ma sensu próbować ukrywać tych informacji, ponieważ i tak są one dostępne w każdym węźle. _Na blockchainie nie ma żadnych tajemnic._

### Przelewanie tokenów {#transfer-tokens}

```solidity
    /**
     * @dev Zobacz {IERC20-transfer}.
     *
     * Wymagania:
     *
     * - `recipient` nie może być adresem zerowym.
     * - wywołujący musi mieć saldo co najmniej `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Funkcja `transfer` jest wywoływana w celu przesłania tokenów z konta nadawcy na inne. Zauważ, że chociaż zwraca ona wartość logiczną, to zawsze jest to **prawda**. Jeśli przelew się nie powiedzie, kontrakt cofa wywołanie.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Funkcja `_transfer` wykonuje właściwą pracę. Jest to funkcja prywatna, która może być wywoływana tylko przez inne funkcje kontraktu. Zgodnie z konwencją funkcje prywatne są nazywane `_<coś>`, tak samo jak zmienne stanu.

Zazwyczaj w Solidity używamy `msg.sender` dla nadawcy wiadomości. Jednakże psuje to [OpenGSN](http://opengsn.org/). Jeśli chcemy zezwolić na transakcje bez etheru za pomocą naszego tokena, musimy użyć `_msgSender()`. Zwraca `msg.sender` dla normalnych transakcji, ale dla transakcji bez etheru zwraca oryginalnego sygnatariusza, a nie kontrakt, który przekazał wiadomość.

### Funkcje przydziału {#allowance-functions}

Są to funkcje, które implementują funkcjonalność przydziału: `allowance`, `approve`, `transferFrom` i `_approve`. Dodatkowo implementacja OpenZeppelin wykracza poza podstawowy standard, zawierając pewne funkcje poprawiające bezpieczeństwo: `increaseAllowance` i `decreaseAllowance`.

#### Funkcja przydziału {#allowance}

```solidity
    /**
     * @dev Zobacz {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Funkcja `allowance` pozwala każdemu sprawdzić dowolny przydział.

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

Ta funkcja jest wywoływana w celu utworzenia przydziału. Jest podobna do powyższej funkcji `transfer`:

- Funkcja po prostu wywołuje funkcję wewnętrzną (w tym przypadku `_approve`), która wykonuje prawdziwą pracę.
- Funkcja albo zwraca `true` (jeśli się powiedzie), albo cofa (jeśli nie).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Używamy funkcji wewnętrznych, aby zminimalizować liczbę miejsc, w których zachodzą zmiany stanu. _Każda_ funkcja, która zmienia stan, jest potencjalnym zagrożeniem bezpieczeństwa, które musi być poddane audytowi bezpieczeństwa. W ten sposób mamy mniejsze szanse na popełnienie błędu.

#### Funkcja transferFrom {#transferFrom}

Jest to funkcja, którą wydający wywołuje, aby wydać przydział. Wymaga to dwóch operacji: przelania wydawanej kwoty i zmniejszenia o nią przydziału.

```solidity
    /**
     * @dev Zobacz {IERC20-transferFrom}.
     *
     * Emituje zdarzenie {Approval} wskazujące zaktualizowany przydział. Nie jest to wymagane przez EIP.
     * Zobacz notatkę na początku {ERC20}.
     *
     * Wymagania:
     *
     * - `sender` i `recipient` nie mogą być adresem zerowym.
     * - `sender` musi mieć saldo co najmniej `amount`.
     * - wywołujący musi mieć przydział na tokeny ``sender`` w wysokości co najmniej
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Wywołanie funkcji `a.sub(b, "message")` robi dwie rzeczy. Po pierwsze, oblicza `a-b`, co jest nowym przydziałem.
Po drugie, sprawdza, czy ten wynik nie jest ujemny. Jeśli jest ujemny, wywołanie cofa się z podaną wiadomością. Zauważ, że gdy wywołanie jest cofane, wszelkie przetwarzanie wykonane wcześniej podczas tego wywołania jest ignorowane, więc nie musimy cofać `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: kwota transferu przekracza przydział"));
        return true;
    }
```

#### Dodatki bezpieczeństwa OpenZeppelin {#openzeppelin-safety-additions}

Niebezpieczne jest ustawianie niezerowego przydziału na inną niezerową wartość, ponieważ kontrolujesz tylko kolejność własnych transakcji, a nie cudzych. Wyobraź sobie, że masz dwóch użytkowników, naiwną Alicję i nieuczciwego Billa. Alicja chce skorzystać z usługi Billa, która jej zdaniem kosztuje pięć tokenów – więc daje Billowi przydział w wysokości pięciu tokenów.

Następnie coś się zmienia i cena Billa wzrasta do dziesięciu tokenów. Alicja, która nadal chce skorzystać z usługi, wysyła transakcję, która ustala przydział dla Billa na dziesięć. W momencie, gdy Bill zobaczy tę nową transakcję w puli transakcji, wysyła transakcję, która wydaje pięć tokenów Alicji i ma znacznie wyższą cenę gazu, dzięki czemu zostanie szybciej wykopana. W ten sposób Bill może najpierw wydać pięć tokenów, a następnie,
gdy nowe zezwolenie Alicji zostanie wydobyte, wydać kolejne dziesięć, co daje łączną cenę piętnastu tokenów, czyli więcej niż
chciała autoryzować Alicja. Ta technika nazywa się
[front-runningiem](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transakcja Alicji                    | Nonce Alicji | Transakcja Billa                                 | Nonce Billa | Zezwolenie Billa | Całkowity dochód Billa od Alicji |
| ------------------------------------ | ------------ | ------------------------------------------------ | ----------- | ---------------- | -------------------------------- |
| approve(Bill, 5)  | 10           |                                                  |             | 5                | 0                                |
|                                      |              | transferFrom(Alice, Bill, 5)  | 10,123      | 0                | 5                                |
| approve(Bill, 10) | 11           |                                                  |             | 10               | 5                                |
|                                      |              | transferFrom(Alice, Bill, 10) | 10,124      | 0                | 15                               |

Aby uniknąć tego problemu, te dwie funkcje (`increaseAllowance` i `decreaseAllowance`) pozwalają
na modyfikację zezwolenia o określoną kwotę. Więc jeśli Bill wydał już pięć tokenów, będzie mógł
wydać tylko pięć więcej. W zależności od czasu, istnieją dwa sposoby, na które może to zadziałać, oba
z których kończą się tym, że Bill dostaje tylko dziesięć tokenów:

A:

| Transakcja Alicji                             | Nonce Alicji | Transakcja Billa                                | Nonce Billa | Zezwolenie Billa | Całkowity dochód Billa od Alicji |
| --------------------------------------------- | -----------: | ----------------------------------------------- | ----------: | ---------------: | -------------------------------- |
| approve(Bill, 5)           |           10 |                                                 |             |                5 | 0                                |
|                                               |              | transferFrom(Alice, Bill, 5) |      10,123 |                0 | 5                                |
| increaseAllowance(Bill, 5) |           11 |                                                 |             |          0+5 = 5 | 5                                |
|                                               |              | transferFrom(Alice, Bill, 5) |      10,124 |                0 | 10                               |

B:

| Transakcja Alicji                             | Nonce Alicji | Transakcja Billa                                 | Nonce Billa | Zezwolenie Billa | Całkowity dochód Billa od Alicji |
| --------------------------------------------- | -----------: | ------------------------------------------------ | ----------: | ---------------: | -------------------------------: |
| approve(Bill, 5)           |           10 |                                                  |             |                5 |                                0 |
| increaseAllowance(Bill, 5) |           11 |                                                  |             |         5+5 = 10 |                                0 |
|                                               |              | transferFrom(Alice, Bill, 10) |      10,124 |                0 |                               10 |

```solidity
    /**
     * @dev Atomowo zwiększa zezwolenie udzielone `spenderowi` przez wywołującego.
     *
     * Jest to alternatywa dla {approve}, która może być używana jako środek zaradczy na
     * problemy opisane w {IERC20-approve}.
     *
     * Emituje zdarzenie {Approval} wskazujące zaktualizowane zezwolenie.
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

Funkcja `a.add(b)` to bezpieczne dodawanie. W mało prawdopodobnym przypadku, gdy `a`+`b`>=`2^256`, nie zawija się ono
w sposób, w jaki robi to normalne dodawanie.

```solidity

    /**
     * @dev Atomowo zmniejsza zezwolenie udzielone `spenderowi` przez wywołującego.
     *
     * Jest to alternatywa dla {approve}, która może być używana jako środek zaradczy na
     * problemy opisane w {IERC20-approve}.
     *
     * Emituje zdarzenie {Approval} wskazujące zaktualizowane zezwolenie.
     *
     * Wymagania:
     *
     * - `spender` nie może być adresem zerowym.
     * - `spender` musi mieć zezwolenie dla wywołującego w wysokości co najmniej
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funkcje modyfikujące informacje o tokenie {#functions-that-modify-token-information}

Są to cztery funkcje, które wykonują rzeczywistą pracę: `_transfer`, `_mint`, `_burn` i `_approve`.

#### Funkcja _transfer {#_transfer}

```solidity
    /**
     * @dev Przenosi tokeny o wartości `amount` z `nadawcy` do `odbiorcy`.
     *
     * Ta wewnętrzna funkcja jest odpowiednikiem {transfer} i może być używana do
     * np. implementacji automatycznych opłat za tokeny, mechanizmów cięcia itp.
     *
     * Emituje zdarzenie {Transfer}.
     *
     * Wymagania:
     *
     * - `nadawca` nie może być adresem zerowym.
     * - `odbiorca` nie może być adresem zerowym.
     * - `nadawca` musi mieć saldo co najmniej `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Ta funkcja, `_transfer`, transferuje tokeny z jednego konta na drugie. Jest ona wywoływana zarówno przez
`transfer` (dla transferów z własnego konta nadawcy), jak i `transferFrom` (dla używania zezwoleń
do transferu z konta kogoś innego).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nikt w rzeczywistości nie posiada adresu zerowego w Ethereum (tzn. nikt nie zna klucza prywatnego, którego pasujący klucz publiczny
jest przekształcany na adres zerowy). Gdy ludzie używają tego adresu, jest to zwykle błąd oprogramowania - więc
kończymy niepowodzeniem, jeśli adres zerowy jest używany jako nadawca lub odbiorca.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Istnieją dwa sposoby wykorzystania tego kontraktu:

1. Użyj go jako szablonu dla własnego kodu
2. [Dziedzicz po nim](https://www.bitdegree.org/learn/solidity-inheritance) i nadpisuj tylko te funkcje, które musisz zmodyfikować

Druga metoda jest znacznie lepsza, ponieważ kod OpenZeppelin ERC-20 został już poddany audytowi i wykazano, że jest bezpieczny. Gdy używasz dziedziczenia,
jasne jest, jakie funkcje modyfikujesz, a aby zaufać twojemu kontraktowi, ludzie muszą tylko poddać audytowi te konkretne funkcje.

Często przydatne jest wykonanie funkcji za każdym razem, gdy tokeny zmieniają właściciela. Jednak `_transfer` jest bardzo ważną funkcją i możliwe jest
napisanie jej w sposób niebezpieczny (patrz poniżej), więc najlepiej jej nie nadpisywać. Rozwiązaniem jest `_beforeTokenTransfer`,
[funkcja typu hook](https://wikipedia.org/wiki/Hooking). Możesz nadpisać tę funkcję, a będzie ona wywoływana przy każdym transferze.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

To są linie, które faktycznie wykonują transfer. Zauważ, że **nic** nie ma między nimi, i że odejmujemy
przekazaną kwotę od nadawcy przed dodaniem jej do odbiorcy. Jest to ważne, ponieważ gdyby w środku było
wywołanie innego kontraktu, mogłoby to zostać wykorzystane do oszukania tego kontraktu. W ten sposób transfer
jest atomowy, nic nie może się zdarzyć w jego środku.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Na koniec wyemituj zdarzenie `Transfer`. Zdarzenia nie są dostępne dla inteligentnych kontraktów, ale kod działający poza blockchainem
może nasłuchiwać zdarzeń i na nie reagować. Na przykład portfel może śledzić, kiedy właściciel dostaje więcej tokenów.

#### Funkcje _mint i _burn {#_mint-and-_burn}

Te dwie funkcje (`_mint` i `_burn`) modyfikują całkowitą podaż tokenów.
Są one wewnętrzne i w tym kontrakcie nie ma funkcji, która by je wywoływała,
więc są przydatne tylko wtedy, gdy dziedziczysz po kontrakcie i dodajesz własną
logikę, aby zdecydować, w jakich warunkach emitować nowe tokeny lub spalać istniejące
.

**UWAGA:** Każdy token ERC-20 ma własną logikę biznesową, która dyktuje zarządzanie tokenami.
Na przykład, kontrakt o stałej podaży może wywoływać `_mint` tylko
w konstruktorze i nigdy nie wywoływać `_burn`. Kontrakt, który sprzedaje tokeny,
wywoła `_mint`, gdy zostanie opłacony, i prawdopodobnie wywoła `_burn` w pewnym momencie,
aby uniknąć niekontrolowanej inflacji.

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

Pamiętaj o aktualizacji `_totalSupply`, gdy zmieni się całkowita liczba tokenów.

&nbsp;

```solidity
    /**
     * @dev Niszczy tokeny o `wartości` `amount` z `konta`, zmniejszając
     * całkowitą podaż.
     *
     * Emituje zdarzenie {Transfer} z `to` ustawionym na adres zerowy.
     *
     * Wymagania:
     *
     * - `konto` nie może być adresem zerowym.
     * - `konto` musi mieć co najmniej `amount` tokenów.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Funkcja `_burn` jest prawie identyczna z `_mint`, z tym że działa w przeciwnym kierunku.

#### Funkcja _approve {#_approve}

To jest funkcja, która faktycznie określa zezwolenia. Zauważ, że pozwala ona właścicielowi określić
zezwolenie, które jest wyższe niż bieżące saldo właściciela. Jest to w porządku, ponieważ saldo jest
sprawdzane w momencie transferu, kiedy może być inne niż saldo w momencie tworzenia zezwolenia
.

```solidity
    /**
     * @dev Ustawia `amount` jako zezwolenie `spendera` na tokeny `właściciela`.
     *
     * Ta wewnętrzna funkcja jest odpowiednikiem `approve` i może być używana do
     * np. ustawiania automatycznych zezwoleń dla niektórych podsystemów itp.
     *
     * Emituje zdarzenie {Approval}.
     *
     * Wymagania:
     *
     * - `właściciel` nie może być adresem zerowym.
     * - `spender` nie może być adresem zerowym.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emituj zdarzenie `Approval`. W zależności od tego, jak napisana jest aplikacja, kontrakt wydającego może być poinformowany o
zatwierdzeniu przez właściciela lub przez serwer, który nasłuchuje tych zdarzeń.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modyfikacja zmiennej Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Ustawia {decimals} na wartość inną niż domyślna 18.
     *
     * OSTRZEŻENIE: Ta funkcja powinna być wywoływana tylko z konstruktora. Większość
     * aplikacji, które wchodzą w interakcję z kontraktami tokenów, nie spodziewa się,
     * że {decimals} kiedykolwiek się zmieni i może działać niepoprawnie, jeśli tak się stanie.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Ta funkcja modyfikuje zmienną `_decimals`, która służy do informowania interfejsów użytkownika, jak interpretować kwotę.
Powinieneś ją wywołać z konstruktora. Byłoby nieuczciwe wywoływać ją w dowolnym późniejszym momencie, a aplikacje
nie są zaprojektowane do obsługi tego.

### Hooki {#hooks}

```solidity

    /**
     * @dev Hook, który jest wywoływany przed każdym transferem tokenów. Obejmuje to
     * minting i burning.
     *
     * Warunki wywołania:
     *
     * - gdy `from` i `to` są oba niezerowe, `amount` tokenów ``from``
     * zostanie przetransferowane do `to`.
     * - gdy `from` jest zerem, `amount` tokenów zostanie wyemitowane dla `to`.
     * - gdy `to` jest zerem, `amount` tokenów ``from`` zostanie spalonych.
     * - `from` i `to` nigdy nie są oba zerami.
     *
     * Aby dowiedzieć się więcej o hookach, przejdź do xref:ROOT:extending-contracts.adoc#using-hooks[Używanie hooków].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

To jest funkcja hook, która ma być wywoływana podczas transferów. Jest tutaj pusta, ale jeśli potrzebujesz,
aby coś robiła, po prostu ją nadpisujesz.

## Wnioski {#conclusion}

Dla przypomnienia, oto niektóre z najważniejszych pomysłów w tym kontrakcie (moim zdaniem, twoje prawdopodobnie będą się różnić):

- _W blockchainie nie ma tajemnic_. Wszelkie informacje, do których inteligentny kontrakt ma dostęp,
  są dostępne dla całego świata.
- Możesz kontrolować kolejność własnych transakcji, ale nie to, kiedy odbywają się transakcje innych osób
  . To jest powód, dla którego zmiana zezwolenia może być niebezpieczna, ponieważ pozwala
  wydającemu wydać sumę obu zezwoleń.
- Wartości typu `uint256` zawijają się. Innymi słowy, _0-1=2^256-1_. Jeśli nie jest to pożądane
  zachowanie, musisz to sprawdzić (lub użyć biblioteki SafeMath, która robi to za Ciebie). Zauważ, że to się zmieniło w
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Wykonuj wszystkie zmiany stanu określonego typu w określonym miejscu, ponieważ ułatwia to audyt.
  To jest powód, dla którego mamy, na przykład, `_approve`, które jest wywoływane przez `approve`, `transferFrom`,
  `increaseAllowance` i `decreaseAllowance`
- Zmiany stanu powinny być atomowe, bez żadnych innych działań w ich środku (jak widać
  w `_transfer`). Dzieje się tak, ponieważ podczas zmiany stanu masz niespójny stan. Na przykład,
  między czasem, w którym odejmujesz od salda nadawcy, a czasem, w którym dodajesz do salda
  odbiorcy, istnieje mniej tokenów, niż powinno być. Może to być potencjalnie nadużywane, jeśli
  pomiędzy nimi są operacje, zwłaszcza wywołania innego kontraktu.

Teraz, gdy zobaczyłeś, jak napisany jest kontrakt OpenZeppelin ERC-20, a zwłaszcza jak jest
on uczyniony bardziej bezpiecznym, idź i napisz własne bezpieczne kontrakty i aplikacje.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
