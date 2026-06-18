---
title: "Przewodnik po kontrakcie Uniswap-v2"
description: "Jak działa kontrakt Uniswap-v2? Dlaczego został napisany w ten sposób?"
author: Ori Pomerantz
tags: ["Solidity", "dapps"]
skill: intermediate
breadcrumb: Przewodnik po Uniswap v2
published: 2021-05-01
lang: pl
---
## Wprowadzenie {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) może stworzyć rynek wymiany między dowolnymi dwoma tokenami ERC-20. W tym artykule przeanalizujemy kod źródłowy kontraktów implementujących ten protokół i dowiemy się, dlaczego zostały one napisane w ten sposób.

### Co robi Uniswap? {#what-does-uniswap-do}

Zasadniczo istnieją dwa typy użytkowników: dostawcy płynności i traderzy.

_Dostawcy płynności_ dostarczają do puli dwa tokeny, które można wymieniać (nazwiemy je **Token0** i **Token1**). W zamian otrzymują trzeci token, który reprezentuje częściową własność puli, nazywany _tokenem płynności_.

_Traderzy_ wysyłają jeden rodzaj tokena do puli i otrzymują inny (na przykład wysyłają **Token0** i otrzymują **Token1**) z puli dostarczonej przez dostawców płynności. Kurs wymiany jest określany przez względną liczbę tokenów **Token0** i **Token1**, które posiada pula. Ponadto pula pobiera niewielki procent jako nagrodę dla puli płynności.

Kiedy dostawcy płynności chcą odzyskać swoje aktywa, mogą spalić tokeny puli i otrzymać z powrotem swoje tokeny, w tym swój udział w nagrodach.

[Kliknij tutaj, aby uzyskać pełniejszy opis](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Dlaczego v2? Dlaczego nie v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) to aktualizacja, która jest znacznie bardziej skomplikowana niż v2. Łatwiej jest najpierw nauczyć się v2, a następnie przejść do v3.

### Kontrakty główne a kontrakty peryferyjne {#contract-types}

Uniswap v2 dzieli się na dwa komponenty: główny (core) i peryferyjny (periphery). Taki podział sprawia, że kontrakty główne, które przechowują aktywa i w związku z tym _muszą_ być bezpieczne, są prostsze i łatwiejsze do audytu. Cała dodatkowa funkcjonalność wymagana przez traderów może być następnie dostarczana przez kontrakty peryferyjne.

## Przepływy danych i sterowania {#flows}

Oto przepływ danych i sterowania, który ma miejsce podczas wykonywania trzech głównych akcji na Uniswap:

1. Wymiana między różnymi tokenami
2. Dodanie płynności do rynku i otrzymanie w nagrodę tokenów płynności ERC-20 pary wymiany
3. Spalenie tokenów płynności ERC-20 i odzyskanie tokenów ERC-20, które para wymiany pozwala traderom wymieniać

### Wymiana {#swap-flow}

Jest to najczęstszy przepływ, używany przez traderów:

#### Wywołujący {#caller}

1. Zapewnienie kontu peryferyjnemu limitu wydatków w wysokości kwoty do wymiany.
2. Wywołanie jednej z wielu funkcji wymiany kontraktu peryferyjnego (to, której z nich, zależy od tego, czy zaangażowane jest ETH, czy trader określa ilość tokenów do zdeponowania, czy ilość tokenów do odzyskania itp.).
   Każda funkcja wymiany przyjmuje `path`, czyli tablicę giełd, przez które należy przejść.

#### W kontrakcie peryferyjnym (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Określenie kwot, które muszą zostać wymienione na każdej giełdzie na ścieżce.
4. Iteracja po ścieżce. Dla każdej giełdy po drodze wysyła token wejściowy, a następnie wywołuje funkcję `swap` giełdy.
   W większości przypadków adresem docelowym dla tokenów jest kolejna para wymiany na ścieżce. W ostatniej wymianie jest to adres podany przez tradera.

#### W głównym kontrakcie (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Weryfikacja, czy główny kontrakt nie jest oszukiwany i czy może utrzymać wystarczającą płynność po wymianie.
6. Sprawdzenie, ile dodatkowych tokenów posiadamy oprócz znanych rezerw. Ta kwota to liczba tokenów wejściowych, które otrzymaliśmy do wymiany.
7. Wysłanie tokenów wyjściowych do miejsca docelowego.
8. Wywołanie `_update` w celu aktualizacji kwot rezerw

#### Z powrotem w kontrakcie peryferyjnym (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Wykonanie niezbędnego czyszczenia (na przykład spalenie tokenów WETH, aby odzyskać ETH do wysłania traderowi)

### Dodawanie płynności {#add-liquidity-flow}

#### Wywołujący {#caller-2}

1. Zapewnienie kontu peryferyjnemu limitu wydatków w kwotach, które mają zostać dodane do puli płynności.
2. Wywołanie jednej z funkcji `addLiquidity` kontraktu peryferyjnego.

#### W kontrakcie peryferyjnym (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Utworzenie nowej pary wymiany, jeśli to konieczne
4. Jeśli istnieje już para wymiany, obliczenie ilości tokenów do dodania. Powinna to być identyczna wartość dla obu tokenów, a więc taki sam stosunek nowych tokenów do istniejących tokenów.
5. Sprawdzenie, czy kwoty są akceptowalne (wywołujący mogą określić minimalną kwotę, poniżej której woleliby nie dodawać płynności)
6. Wywołanie głównego kontraktu.

#### W głównym kontrakcie (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. Wybicie tokenów płynności i wysłanie ich do wywołującego
8. Wywołanie `_update` w celu aktualizacji kwot rezerw

### Usuwanie płynności {#remove-liquidity-flow}

#### Wywołujący {#caller-3}

1. Zapewnienie kontu peryferyjnemu limitu wydatków tokenów płynności, które mają zostać spalone w zamian za tokeny bazowe.
2. Wywołanie jednej z funkcji `removeLiquidity` kontraktu peryferyjnego.

#### W kontrakcie peryferyjnym (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Wysłanie tokenów płynności do pary wymiany

#### W głównym kontrakcie (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Wysłanie na adres docelowy tokenów bazowych proporcjonalnie do spalonych tokenów. Na przykład, jeśli w puli znajduje się 1000 tokenów A, 500 tokenów B i 90 tokenów płynności, a my otrzymamy 9 tokenów do spalenia, spalamy 10% tokenów płynności, więc odsyłamy użytkownikowi 100 tokenów A i 50 tokenów B.
5. Spalenie tokenów płynności
6. Wywołanie `_update` w celu aktualizacji kwot rezerw

```yaml
title: "Inteligentne kontrakty Uniswap v2"
description: "Szczegółowe omówienie inteligentnych kontraktów Uniswap v2"
author: "Ori Pomerantz"
tags:
  - "inteligentne kontrakty"
  - "DeFi"
  - "Solidity"
skill: advanced
lang: pl
published: 2022-08-16
source: Uniswap v2
sourceUrl: https://github.com/Uniswap/v2-core/tree/master/contracts
---

## Główne kontrakty {#core-contracts}

Są to bezpieczne kontrakty, które przechowują płynność.

### UniswapV2Pair.sol {#uniswapv2pair}

[Ten kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementuje właściwą pulę, która wymienia tokeny. Jest to główna funkcjonalność Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Są to wszystkie interfejsy, o których kontrakt musi wiedzieć, ponieważ albo je implementuje (`IUniswapV2Pair` i `UniswapV2ERC20`), albo wywołuje kontrakty, które je implementują.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Ten kontrakt dziedziczy po `UniswapV2ERC20`, który dostarcza funkcje ERC-20 dla tokenów płynności.

```solidity
    using SafeMath  for uint;
```

[Biblioteka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) jest używana, aby uniknąć przepełnień i niedomiarów (overflows i underflows). Jest to ważne, ponieważ w przeciwnym razie moglibyśmy skończyć w sytuacji, w której wartość powinna wynosić `-1`, ale zamiast tego wynosi `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Wiele obliczeń w kontrakcie puli wymaga ułamków. Jednak ułamki nie są obsługiwane przez EVM.
Rozwiązaniem, które znalazł Uniswap, jest użycie wartości 224-bitowych, z 112 bitami na część całkowitą i 112 bitami na ułamek. Zatem `1.0` jest reprezentowane jako `2^112`, `1.5` jest reprezentowane jako `2^112 + 2^111` itd.

Więcej szczegółów na temat tej biblioteki jest dostępnych [w dalszej części dokumentu](#fixedpoint).

#### Zmienne {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Aby uniknąć przypadków dzielenia przez zero, istnieje minimalna liczba tokenów płynności, które zawsze istnieją (ale są własnością konta zero). Ta liczba to **MINIMUM_LIQUIDITY**, czyli tysiąc.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

To jest selektor ABI dla funkcji transferu ERC-20. Służy do transferu tokenów ERC-20 na dwóch kontach tokenów.

```solidity
    address public factory;
```

To jest kontrakt fabryki, który utworzył tę pulę. Każda pula to wymiana między dwoma tokenami ERC-20, a fabryka jest centralnym punktem, który łączy wszystkie te pule.

```solidity
    address public token0;
    address public token1;
```

Są to adresy kontraktów dla dwóch typów tokenów ERC-20, które mogą być wymieniane przez tę pulę.

```solidity
    uint112 private reserve0;           // używa pojedynczego slotu pamięci, dostępnego przez getReserves
    uint112 private reserve1;           // używa pojedynczego slotu pamięci, dostępnego przez getReserves
```

Rezerwy, które pula posiada dla każdego typu tokena. Zakładamy, że oba reprezentują tę samą wartość, a zatem każdy token0 jest wart reserve1/reserve0 tokenów token1.

```solidity
    uint32  private blockTimestampLast; // używa pojedynczego slotu pamięci, dostępnego przez getReserves
```

Znacznik czasu (timestamp) dla ostatniego bloku, w którym nastąpiła wymiana, używany do śledzenia kursów wymiany w czasie.

Jednym z największych wydatków na gaz w kontraktach Ethereum jest pamięć (storage), która utrzymuje się od jednego wywołania kontraktu do następnego. Każda komórka pamięci ma długość 256 bitów. Zatem trzy zmienne, `reserve0`, `reserve1` i `blockTimestampLast`, są alokowane w taki sposób, że pojedyncza wartość pamięci może zawierać je wszystkie (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Te zmienne przechowują skumulowane koszty dla każdego tokena (każdy w odniesieniu do drugiego). Mogą być użyte do obliczenia średniego kursu wymiany w danym okresie.

```solidity
    uint public kLast; // reserve0 * reserve1, bezpośrednio po ostatnim zdarzeniu płynności
```

Sposób, w jaki wymiana par decyduje o kursie wymiany między token0 a token1, polega na utrzymywaniu stałego iloczynu dwóch rezerw podczas transakcji. `kLast` to ta wartość. Zmienia się ona, gdy dostawca płynności deponuje lub wypłaca tokeny, i nieznacznie rośnie z powodu opłaty rynkowej w wysokości 0,3%.

Oto prosty przykład. Zauważ, że dla uproszczenia tabela ma tylko trzy cyfry po przecinku i ignorujemy opłatę transakcyjną w wysokości 0,3%, więc liczby nie są dokładne.

| Zdarzenie                                                   |  reserve0 |  reserve1 | reserve0 \* reserve1 | Średni kurs wymiany (token1 / token0) |
| ----------------------------------------------------------- | --------: | --------: | -------------------: | ------------------------------------- |
| Początkowa konfiguracja                                     | 1,000.000 | 1,000.000 |            1,000,000 |                                       |
| Trader A wymienia 50 token0 na 47.619 token1                | 1,050.000 |   952.381 |            1,000,000 | 0.952                                 |
| Trader B wymienia 10 token0 na 8.984 token1                 | 1,060.000 |   943.396 |            1,000,000 | 0.898                                 |
| Trader C wymienia 40 token0 na 34.305 token1                | 1,100.000 |   909.090 |            1,000,000 | 0.858                                 |
| Trader D wymienia 100 token1 na 109.01 token0               |   990.990 | 1,009.090 |            1,000,000 | 0.917                                 |
| Trader E wymienia 10 token0 na 10.079 token1                | 1,000.990 |   999.010 |            1,000,000 | 1.008                                 |

W miarę jak traderzy dostarczają więcej token0, względna wartość token1 rośnie i odwrotnie, w oparciu o podaż i popyt.

#### Blokada {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Istnieje klasa luk w zabezpieczeniach, które opierają się na [nadużyciu reentrancji](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap musi transferować dowolne tokeny ERC-20, co oznacza wywoływanie kontraktów ERC-20, które mogą próbować nadużyć rynku Uniswap, który je wywołuje.
Mając zmienną `unlocked` jako część kontraktu, możemy zapobiec wywoływaniu funkcji podczas ich działania (w ramach tej samej transakcji).

```solidity
    modifier lock() {
```

Ta funkcja to [modyfikator](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), czyli funkcja, która opakowuje normalną funkcję, aby w jakiś sposób zmienić jej zachowanie.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Jeśli `unlocked` jest równe jeden, ustaw je na zero. Jeśli jest już zerem, wycofaj wywołanie (revert), sprawiając, że zakończy się niepowodzeniem.

```solidity
        _;
```

W modyfikatorze `_;` to oryginalne wywołanie funkcji (ze wszystkimi parametrami). Tutaj oznacza to, że wywołanie funkcji następuje tylko wtedy, gdy `unlocked` wynosiło jeden w momencie wywołania, a podczas jej działania wartość `unlocked` wynosi zero.

```solidity
        unlocked = 1;
    }
```

Po powrocie z głównej funkcji zwolnij blokadę.

#### Różne funkcje {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Ta funkcja dostarcza wywołującym obecny stan wymiany. Zauważ, że funkcje Solidity [mogą zwracać wiele wartości](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Ta wewnętrzna funkcja transferuje określoną ilość tokenów ERC-20 z giełdy do kogoś innego. `SELECTOR` określa, że funkcja, którą wywołujemy, to `transfer(address,uint)` (zobacz definicję powyżej).

Aby uniknąć konieczności importowania interfejsu dla funkcji tokena, „ręcznie” tworzymy wywołanie za pomocą jednej z [funkcji ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Istnieją dwa sposoby, w jakie wywołanie transferu ERC-20 może zgłosić niepowodzenie:

1. Wycofanie (revert). Jeśli wywołanie zewnętrznego kontraktu zostanie wycofane, to zwracana wartość logiczna wynosi `false`
2. Normalne zakończenie, ale zgłoszenie błędu. W tym przypadku bufor wartości zwracanej ma niezerową długość, a po zdekodowaniu jako wartość logiczna wynosi `false`

Jeśli wystąpi którykolwiek z tych warunków, następuje wycofanie.

#### Zdarzenia {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Te dwa zdarzenia są emitowane, gdy dostawca płynności deponuje płynność (`Mint`) lub ją wypłaca (`Burn`). W obu przypadkach ilości token0 i token1, które są deponowane lub wypłacane, są częścią zdarzenia, podobnie jak tożsamość konta, które nas wywołało (`sender`). W przypadku wypłaty zdarzenie obejmuje również cel, który otrzymał tokeny (`to`), co może nie być tożsame z nadawcą.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

To zdarzenie jest emitowane, gdy trader wymienia jeden token na inny. Ponownie, nadawca i miejsce docelowe mogą nie być takie same.
Każdy token może zostać wysłany na giełdę lub z niej odebrany.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Na koniec, `Sync` jest emitowane za każdym razem, gdy tokeny są dodawane lub wypłacane, niezależnie od powodu, aby dostarczyć najnowsze informacje o rezerwach (a tym samym o kursie wymiany).

#### Funkcje konfiguracyjne {#pair-setup}

Te funkcje powinny zostać wywołane raz, gdy konfigurowana jest nowa wymiana par.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstruktor upewnia się, że będziemy śledzić adres fabryki, która utworzyła parę. Ta informacja jest wymagana dla `initialize` oraz dla opłaty fabrycznej (jeśli taka istnieje).

```solidity
    // wywoływane raz przez fabrykę w momencie wdrożenia
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // wystarczające sprawdzenie
        token0 = _token0;
        token1 = _token1;
    }
```

Ta funkcja pozwala fabryce (i tylko fabryce) określić dwa tokeny ERC-20, które ta para będzie wymieniać.

#### Wewnętrzne funkcje aktualizujące {#pair-update-internal}

##### \_update

```solidity
    // aktualizuje rezerwy i, przy pierwszym wywołaniu na blok, akumulatory cen
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Ta funkcja jest wywoływana za każdym razem, gdy tokeny są deponowane lub wypłacane.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Jeśli balance0 lub balance1 (uint256) jest wyższe niż uint112(-1) (=2^112-1) (więc przepełnia się i wraca do 0 po konwersji na uint112), odmów kontynuowania \_update, aby zapobiec przepełnieniom. W przypadku normalnego tokena, który można podzielić na 10^18 jednostek, oznacza to, że każda wymiana jest ograniczona do około 5,1\*10^15 każdego z tokenów. Jak dotąd nie stanowiło to problemu.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // przepełnienie jest pożądane
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Jeśli upływający czas nie wynosi zero, oznacza to, że jesteśmy pierwszą transakcją wymiany w tym bloku. W takim przypadku musimy zaktualizować akumulatory kosztów.

```solidity
            // * nigdy się nie przepełnia, a przepełnienie + jest pożądane
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Każdy akumulator kosztów jest aktualizowany o najnowszy koszt (rezerwa drugiego tokena/rezerwa tego tokena) pomnożony przez czas, który upłynął w sekundach. Aby uzyskać średnią cenę, odczytujesz skumulowaną cenę w dwóch punktach w czasie i dzielisz przez różnicę czasu między nimi. Na przykład, załóżmy taką sekwencję zdarzeń:

| Zdarzenie                                                              |  reserve0 |  reserve1 | znacznik czasu | Krańcowy kurs wymiany (reserve1 / reserve0) |       price0CumulativeLast |
| ---------------------------------------------------------------------- | --------: | --------: | -------------- | ------------------------------------------: | -------------------------: |
| Początkowa konfiguracja                                                | 1,000.000 | 1,000.000 | 5,000          |                                       1.000 |                          0 |
| Trader A deponuje 50 token0 i otrzymuje z powrotem 47.619 token1       | 1,050.000 |   952.381 | 5,020          |                                       0.907 |                         20 |
| Trader B deponuje 10 token0 i otrzymuje z powrotem 8.984 token1        | 1,060.000 |   943.396 | 5,030          |                                       0.890 |       20+10\*0.907 = 29.07 |
| Trader C deponuje 40 token0 i otrzymuje z powrotem 34.305 token1       | 1,100.000 |   909.090 | 5,100          |                                       0.826 |    29.07+70\*0.890 = 91.37 |
| Trader D deponuje 100 token1 i otrzymuje z powrotem 109.01 token0      |   990.990 | 1,009.090 | 5,110          |                                       1.018 |    91.37+10\*0.826 = 99.63 |
| Trader E deponuje 10 token0 i otrzymuje z powrotem 10.079 token1       | 1,000.990 |   999.010 | 5,150          |                                       0.998 | 99.63+40\*1.1018 = 143.702 |

Powiedzmy, że chcemy obliczyć średnią cenę **Token0** między znacznikami czasu 5,030 a 5,150. Różnica w wartości `price0Cumulative` wynosi 143.702-29.07=114.632. Jest to średnia z dwóch minut (120 sekund). Zatem średnia cena wynosi 114.632/120 = 0.955.

To obliczenie ceny jest powodem, dla którego musimy znać stare rozmiary rezerw.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Na koniec zaktualizuj zmienne globalne i wyemituj zdarzenie `Sync`.

##### \_mintFee

```solidity
    // jeśli opłata jest włączona, wybijać płynność równą 1/6 wzrostu w sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

W Uniswap 2.0 traderzy płacą opłatę w wysokości 0,30% za korzystanie z rynku. Większość tej opłaty (0,25% transakcji) zawsze trafia do dostawców płynności. Pozostałe 0,05% może trafić albo do dostawców płynności, albo na adres określony przez fabrykę jako opłata protokołu, która płaci Uniswap za ich wysiłek włożony w rozwój.

Aby zmniejszyć liczbę obliczeń (a tym samym koszty gazu), opłata ta jest obliczana tylko wtedy, gdy płynność jest dodawana lub usuwana z puli, a nie przy każdej transakcji.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Odczytaj miejsce docelowe opłaty fabryki. Jeśli wynosi zero, nie ma opłaty protokołu i nie ma potrzeby jej obliczania.

```solidity
        uint _kLast = kLast; // oszczędność gazu
```

Zmienna stanu `kLast` znajduje się w pamięci (storage), więc będzie miała wartość między różnymi wywołaniami kontraktu.
Dostęp do pamięci (storage) jest znacznie droższy niż dostęp do pamięci ulotnej (memory), która jest zwalniana po zakończeniu wywołania funkcji do kontraktu, więc używamy zmiennej wewnętrznej, aby zaoszczędzić na gazie.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Dostawcy płynności otrzymują swoją część po prostu poprzez wzrost wartości ich tokenów płynności. Ale opłata protokołu wymaga wybicia nowych tokenów płynności i dostarczenia ich na adres `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Jeśli istnieje nowa płynność, od której można pobrać opłatę protokołu. Funkcję pierwiastka kwadratowego możesz zobaczyć [w dalszej części tego artykułu](#math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

To skomplikowane obliczanie opłat jest wyjaśnione w [białej księdze](https://app.uniswap.org/whitepaper.pdf) na stronie 5. Wiemy, że między czasem obliczenia `kLast` a teraźniejszością nie dodano ani nie usunięto żadnej płynności (ponieważ uruchamiamy to obliczenie za każdym razem, gdy płynność jest dodawana lub usuwana, zanim faktycznie się zmieni), więc jakakolwiek zmiana w `reserve0 * reserve1` musi pochodzić z opłat transakcyjnych (bez nich utrzymywalibyśmy `reserve0 * reserve1` na stałym poziomie).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Użyj funkcji `UniswapV2ERC20._mint`, aby faktycznie utworzyć dodatkowe tokeny płynności i przypisać je do `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Jeśli nie ma opłaty, ustaw `kLast` na zero (jeśli jeszcze nim nie jest). Kiedy ten kontrakt był pisany, istniała [funkcja zwrotu gazu](https://eips.ethereum.org/EIPS/eip-3298), która zachęcała kontrakty do zmniejszania ogólnego rozmiaru stanu Ethereum poprzez zerowanie pamięci, której nie potrzebowały.
Ten kod uzyskuje ten zwrot, gdy jest to możliwe.

#### Funkcje dostępne z zewnątrz {#pair-external}

Zauważ, że chociaż każda transakcja lub kontrakt _może_ wywołać te funkcje, są one zaprojektowane do wywoływania z kontraktu peryferyjnego. Jeśli wywołasz je bezpośrednio, nie będziesz w stanie oszukać wymiany par, ale możesz stracić wartość przez błąd.

##### mint

```solidity
    // ta niskopoziomowa funkcja powinna być wywoływana z kontraktu, który wykonuje ważne kontrole bezpieczeństwa
    function mint(address to) external lock returns (uint liquidity) {
```

Ta funkcja jest wywoływana, gdy dostawca płynności dodaje płynność do puli. Wybija ona dodatkowe tokeny płynności jako nagrodę. Powinna być wywoływana z [kontraktu peryferyjnego](#uniswapv2router02), który wywołuje ją po dodaniu płynności w tej samej transakcji (aby nikt inny nie mógł przesłać transakcji, która rości sobie prawo do nowej płynności przed prawowitym właścicielem).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // oszczędność gazu
```

To jest sposób na odczytanie wyników funkcji Solidity, która zwraca wiele wartości. Odrzucamy ostatnie zwrócone wartości, znacznik czasu bloku, ponieważ go nie potrzebujemy.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Pobierz aktualne salda i sprawdź, ile dodano każdego typu tokena.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Oblicz opłaty protokołu do pobrania, jeśli takie istnieją, i odpowiednio wybij tokeny płynności. Ponieważ parametrami dla `_mintFee` są stare wartości rezerw, opłata jest obliczana dokładnie tylko na podstawie zmian w puli wynikających z opłat.

```solidity
        uint _totalSupply = totalSupply; // oszczędność gazu, musi być zdefiniowane tutaj, ponieważ totalSupply może się zaktualizować w _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // trwale zablokuj pierwsze MINIMUM_LIQUIDITY tokenów
```

Jeśli jest to pierwszy depozyt, utwórz `MINIMUM_LIQUIDITY` tokenów i wyślij je na adres zero, aby je zablokować. Nigdy nie mogą zostać wykupione, co oznacza, że pula nigdy nie zostanie całkowicie opróżniona (to chroni nas przed dzieleniem przez zero w niektórych miejscach). Wartość `MINIMUM_LIQUIDITY` to tysiąc, co biorąc pod uwagę, że większość ERC-20 jest podzielona na jednostki 10^-18 tokena, tak jak ETH dzieli się na wei, wynosi 10^-15 wartości pojedynczego tokena. Nie jest to wysoki koszt.

W momencie pierwszego depozytu nie znamy względnej wartości dwóch tokenów, więc po prostu mnożymy kwoty i wyciągamy pierwiastek kwadratowy, zakładając, że depozyt zapewnia nam równą wartość w obu tokenach.

Możemy temu zaufać, ponieważ w interesie deponenta leży zapewnienie równej wartości, aby uniknąć utraty wartości na rzecz arbitrażu.
Powiedzmy, że wartość dwóch tokenów jest identyczna, ale nasz deponent zdeponował cztery razy więcej **Token1** niż **Token0**. Trader może wykorzystać fakt, że wymiana par uważa, iż **Token0** jest bardziej wartościowy, aby wydobyć z tego wartość.

| Zdarzenie                                                    | reserve0 | reserve1 | reserve0 \* reserve1 | Wartość puli (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | ---------------------------------: |
| Początkowa konfiguracja                                      |        8 |       32 |                  256 |                                 40 |
| Trader deponuje 8 tokenów **Token0**, otrzymuje z powrotem 16 **Token1** |       16 |       16 |                  256 |                                 32 |

Jak widać, trader zarobił dodatkowe 8 tokenów, które pochodzą ze zmniejszenia wartości puli, szkodząc deponentowi, który jest jej właścicielem.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Przy każdym kolejnym depozycie znamy już kurs wymiany między dwoma aktywami i oczekujemy, że dostawcy płynności zapewnią równą wartość w obu. Jeśli tego nie zrobią, w ramach kary dajemy im tokeny płynności na podstawie mniejszej wartości, którą dostarczyli.

Niezależnie od tego, czy jest to pierwszy depozyt, czy kolejny, liczba tokenów płynności, które dostarczamy, jest równa pierwiastkowi kwadratowemu ze zmiany w `reserve0*reserve1`, a wartość tokena płynności nie ulega zmianie (chyba że otrzymamy depozyt, który nie ma równych wartości obu typów, w którym to przypadku „kara” zostaje rozdzielona). Oto kolejny przykład z dwoma tokenami o tej samej wartości, z trzema dobrymi depozytami i jednym złym (depozyt tylko jednego typu tokena, więc nie generuje żadnych tokenów płynności).

| Zdarzenie                 | reserve0 | reserve1 | reserve0 \* reserve1 | Wartość puli (reserve0 + reserve1) | Tokeny płynności wybite dla tego depozytu | Całkowita liczba tokenów płynności | wartość każdego tokena płynności |
| ------------------------- | -------: | -------: | -------------------: | ---------------------------------: | ----------------------------------------: | ---------------------------------: | -------------------------------: |
| Początkowa konfiguracja   |    8.000 |    8.000 |                   64 |                             16.000 |                                         8 |                                  8 |                            2.000 |
| Depozyt czterech każdego typu |   12.000 |   12.000 |                  144 |                             24.000 |                                         4 |                                 12 |                            2.000 |
| Depozyt dwóch każdego typu |   14.000 |   14.000 |                  196 |                             28.000 |                                         2 |                                 14 |                            2.000 |
| Depozyt o nierównej wartości |   18.000 |   14.000 |                  252 |                             32.000 |                                         0 |                                 14 |                           ~2.286 |
| Po arbitrażu              |  ~15.874 |  ~15.874 |                  252 |                            ~31.748 |                                         0 |                                 14 |                           ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Użyj funkcji `UniswapV2ERC20._mint`, aby faktycznie utworzyć dodatkowe tokeny płynności i przekazać je na właściwe konto.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 i reserve1 są aktualne
        emit Mint(msg.sender, amount0, amount1);
    }
```

Zaktualizuj zmienne stanu (`reserve0`, `reserve1` i w razie potrzeby `kLast`) i wyemituj odpowiednie zdarzenie.

##### burn

```solidity
    // ta niskopoziomowa funkcja powinna być wywoływana z kontraktu, który wykonuje ważne kontrole bezpieczeństwa
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Ta funkcja jest wywoływana, gdy płynność jest wypłacana i odpowiednie tokeny płynności muszą zostać spalone.
Powinna być również wywoływana [z konta peryferyjnego](#uniswapv2router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // oszczędność gazu
        address _token0 = token0;                                // oszczędność gazu
        address _token1 = token1;                                // oszczędność gazu
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Kontrakt peryferyjny przetransferował płynność do spalenia do tego kontraktu przed wywołaniem. W ten sposób wiemy, ile płynności spalić, i możemy upewnić się, że zostanie ona spalona.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // oszczędność gazu, musi być zdefiniowane tutaj, ponieważ totalSupply może się zaktualizować w _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // użycie sald zapewnia proporcjonalną dystrybucję
        amount1 = liquidity.mul(balance1) / _totalSupply; // użycie sald zapewnia proporcjonalną dystrybucję
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Dostawca płynności otrzymuje równą wartość obu tokenów. W ten sposób nie zmieniamy kursu wymiany.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 i reserve1 są aktualne
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Reszta funkcji `burn` jest lustrzanym odbiciem funkcji `mint` powyżej.

##### swap

```solidity
    // ta niskopoziomowa funkcja powinna być wywoływana z kontraktu, który wykonuje ważne kontrole bezpieczeństwa
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Ta funkcja również powinna być wywoływana z [kontraktu peryferyjnego](#uniswapv2router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // oszczędność gazu
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // zakres dla _token{0,1}, zapobiega błędom zbyt głębokiego stosu
```

Zmienne lokalne mogą być przechowywane w pamięci (memory) lub, jeśli nie ma ich zbyt wiele, bezpośrednio na stosie (stack).
Jeśli możemy ograniczyć ich liczbę, aby użyć stosu, zużywamy mniej gazu. Więcej szczegółów znajdziesz w [żółtej księdze, formalnej specyfikacji Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), str. 26, równanie 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optymistycznie transferuj tokeny
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optymistycznie transferuj tokeny
```

Ten transfer jest optymistyczny, ponieważ transferujemy, zanim upewnimy się, że wszystkie warunki są spełnione. Jest to w porządku w Ethereum, ponieważ jeśli warunki nie zostaną spełnione w dalszej części wywołania, wycofujemy je (revert) i wszelkie zmiany, które utworzyło.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Poinformuj odbiorcę o wymianie, jeśli o to poproszono.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Pobierz aktualne salda. Kontrakt peryferyjny wysyła nam tokeny przed wywołaniem nas do wymiany. Ułatwia to kontraktowi sprawdzenie, czy nie jest oszukiwany, co _musi_ nastąpić w głównym kontrakcie (ponieważ możemy być wywoływani przez inne podmioty niż nasz kontrakt peryferyjny).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // zakres dla reserve{0,1}Adjusted, zapobiega błędom zbyt głębokiego stosu
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Jest to test poprawności (sanity check), aby upewnić się, że nie stracimy na wymianie. Nie ma okoliczności, w których wymiana powinna zmniejszyć `reserve0*reserve1`. W tym miejscu upewniamy się również, że przy wymianie przesyłana jest opłata w wysokości 0,3%; przed sprawdzeniem poprawności wartości K mnożymy oba salda przez 1000 pomniejszone o kwoty pomnożone przez 3, co oznacza, że 0,3% (3/1000 = 0,003 = 0,3%) jest odejmowane od salda przed porównaniem jego wartości K z wartością K obecnych rezerw.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Zaktualizuj `reserve0` i `reserve1`, a w razie potrzeby akumulatory cen i znacznik czasu, oraz wyemituj zdarzenie.

##### Sync lub Skim

Możliwe jest, że rzeczywiste salda utracą synchronizację z rezerwami, które wymiana par uważa, że posiada.
Nie ma możliwości wypłaty tokenów bez zgody kontraktu, ale depozyty to inna sprawa. Konto może przetransferować tokeny na giełdę bez wywoływania ani `mint`, ani `swap`.

W takim przypadku istnieją dwa rozwiązania:

- `sync`, zaktualizuj rezerwy do aktualnych sald
- `skim`, wypłać dodatkową kwotę. Zauważ, że każde konto może wywołać `skim`, ponieważ nie wiemy, kto zdeponował tokeny. Ta informacja jest emitowana w zdarzeniu, ale zdarzenia nie są dostępne z poziomu blockchaina.

```solidity
    // wymuś, aby salda zgadzały się z rezerwami
    function skim(address to) external lock {
        address _token0 = token0; // oszczędność gazu
        address _token1 = token1; // oszczędność gazu
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // wymuś, aby rezerwy zgadzały się z saldami
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[Ten kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) tworzy wymiany par.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Te zmienne stanu są niezbędne do zaimplementowania opłaty protokołu (zobacz [białą księgę](https://app.uniswap.org/whitepaper.pdf), str. 5).
Adres `feeTo` gromadzi tokeny płynności na opłatę protokołu, a `feeToSetter` to adres uprawniony do zmiany `feeTo` na inny adres.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Te zmienne śledzą pary, czyli wymiany między dwoma typami tokenów.

Pierwsza z nich, `getPair`, to mapowanie, które identyfikuje kontrakt wymiany par na podstawie dwóch tokenów ERC-20, które wymienia. Tokeny ERC-20 są identyfikowane przez adresy kontraktów, które je implementują, więc klucze i wartość to adresy. Aby uzyskać adres wymiany par, który pozwala na konwersję z `tokenA` na `tokenB`, używasz `getPair[<tokenA address>][<tokenB address>]` (lub odwrotnie).

Druga zmienna, `allPairs`, to tablica, która zawiera wszystkie adresy wymian par utworzonych przez tę fabrykę. W Ethereum nie można iterować po zawartości mapowania ani uzyskać listy wszystkich kluczy, więc ta zmienna jest jedynym sposobem, aby dowiedzieć się, jakimi wymianami zarządza ta fabryka.

Uwaga: Powodem, dla którego nie można iterować po wszystkich kluczach mapowania, jest to, że przechowywanie danych kontraktu jest _drogie_, więc im mniej go używamy, tym lepiej, i im rzadziej je zmieniamy,
tym lepiej. Możesz utworzyć [mapowania, które obsługują iterację](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), ale wymagają one dodatkowej pamięci na listę kluczy. W większości aplikacji nie jest to potrzebne.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

To zdarzenie jest emitowane, gdy tworzona jest nowa wymiana par. Obejmuje adresy tokenów, adres wymiany par oraz całkowitą liczbę wymian zarządzanych przez fabrykę.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Jedyną rzeczą, którą robi konstruktor, jest określenie `feeToSetter`. Fabryki zaczynają bez opłaty i tylko `feeSetter` może to zmienić.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Ta funkcja zwraca liczbę par wymiany.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

To jest główna funkcja fabryki, służąca do tworzenia wymiany par między dwoma tokenami ERC-20. Zauważ, że każdy może wywołać tę funkcję. Nie potrzebujesz pozwolenia od Uniswap, aby utworzyć nową wymianę par.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Chcemy, aby adres nowej wymiany był deterministyczny, aby można go było obliczyć z wyprzedzeniem pozałańcuchowo (może to być przydatne dla [transakcji warstwy 2 (L2)](/developers/docs/scaling/)).
Aby to zrobić, musimy mieć spójną kolejność adresów tokenów, niezależnie od kolejności, w jakiej je otrzymaliśmy, więc sortujemy je tutaj.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // pojedyncze sprawdzenie jest wystarczające
```

Duże pule płynności są lepsze niż małe, ponieważ mają bardziej stabilne ceny. Nie chcemy mieć więcej niż jednej puli płynności na parę tokenów. Jeśli istnieje już wymiana, nie ma potrzeby tworzenia kolejnej dla tej samej pary.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Aby utworzyć nowy kontrakt, potrzebujemy kodu, który go tworzy (zarówno funkcji konstruktora, jak i kodu, który zapisuje w pamięci kod bajtowy EVM właściwego kontraktu). Normalnie w Solidity po prostu używamy `addr = new <name of contract>(<constructor parameters>)` i kompilator zajmuje się wszystkim za nas, ale aby mieć deterministyczny adres kontraktu, musimy użyć [kodu operacji CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Kiedy ten kod był pisany, ten kod operacji nie był jeszcze obsługiwany przez Solidity, więc konieczne było ręczne pobrannie kodu. Nie stanowi to już problemu, ponieważ [Solidity teraz obsługuje CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Gdy kod operacji nie jest jeszcze obsługiwany przez Solidity, możemy go wywołać za pomocą [wbudowanego asemblera (inline assembly)](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Wywołaj funkcję `initialize`, aby powiedzieć nowej wymianie, jakie dwa tokeny wymienia.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // wypełnij mapowanie w odwrotnym kierunku
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Zapisz informacje o nowej parze w zmiennych stanu i wyemituj zdarzenie, aby poinformować świat o nowej wymianie par.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Te dwie funkcje pozwalają `feeSetter` kontrolować odbiorcę opłaty (jeśli istnieje) i zmienić `feeSetter` na nowy adres.

### UniswapV2ERC20.sol {#uniswapv2erc20}

[Ten kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementuje token płynności ERC-20. Jest podobny do [kontraktu ERC-20 OpenZeppelin](/developers/tutorials/erc20-annotated-code), więc wyjaśnię tylko część, która się różni, czyli funkcjonalność `permit`.

Transakcje w Ethereum kosztują ether (ETH), co jest równoznaczne z prawdziwymi pieniędzmi. Jeśli masz tokeny ERC-20, ale nie masz ETH, nie możesz wysyłać transakcji, więc nie możesz z nimi nic zrobić. Jednym z rozwiązań pozwalających uniknąć tego problemu są [metatransakcje](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Właściciel tokenów podpisuje transakcję, która pozwala komuś innemu na wypłatę tokenów pozałańcuchowo i wysyła ją przez Internet do odbiorcy. Odbiorca, który posiada ETH, następnie przesyła pozwolenie w imieniu właściciela.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Ten hash to [identyfikator typu transakcji](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Jedynym, który tutaj obsługujemy, jest `Permit` z tymi parametrami.

```solidity
    mapping(address => uint) public nonces;
```

Sfałszowanie podpisu cyfrowego przez odbiorcę jest niewykonalne. Jednak wysłanie tej samej transakcji dwa razy jest trywialne (jest to forma [ataku powtórzeniowego (replay attack)](https://wikipedia.org/wiki/Replay_attack)). Aby temu zapobiec, używamy [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Jeśli nonce nowego `Permit` nie jest o jeden większe od ostatnio użytego, zakładamy, że jest nieprawidłowe.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

To jest kod do pobrania [identyfikatora łańcucha](https://chainid.network/). Używa on dialektu asemblera EVM o nazwie [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Zauważ, że w obecnej wersji Yul musisz użyć `chainid()`, a nie `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Oblicz [separator domeny](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) dla EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

To jest funkcja, która implementuje uprawnienia. Otrzymuje jako parametry odpowiednie pola oraz trzy wartości skalarne dla [podpisu](https://yos.io/2018/11/16/ethereum-signatures/) (v, r i s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Nie akceptuj transakcji po upływie terminu.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` to wiadomość, której oczekujemy. Wiemy, jakie powinno być nonce, więc nie ma potrzeby, abyśmy otrzymywali je jako parametr.

Algorytm podpisu Ethereum oczekuje 256 bitów do podpisania, więc używamy funkcji skrótu `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Ze skrótu (digest) i podpisu możemy uzyskać adres, który go podpisał, używając [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Jeśli wszystko jest w porządku, potraktuj to jako [zatwierdzenie (approve) ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).
```

## Kontrakty peryferyjne {#periphery-contracts}

Kontrakty peryferyjne stanowią API (interfejs programowania aplikacji) dla Uniswap. Są one dostępne dla wywołań zewnętrznych, zarówno z innych kontraktów, jak i zdecentralizowanych aplikacji (dapp). Można wywoływać kontrakty główne (core) bezpośrednio, ale jest to bardziej skomplikowane i w przypadku błędu można stracić środki. Główne kontrakty zawierają jedynie testy upewniające się, że nie są oszukiwane, a nie kontrole poprawności (sanity checks) dla kogokolwiek innego. Te znajdują się w kontraktach peryferyjnych, dzięki czemu mogą być aktualizowane w miarę potrzeb.

### UniswapV2Router01.sol {#uniswapv2router01}

[Ten kontrakt](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) ma problemy i [nie powinien być już używany](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Na szczęście kontrakty peryferyjne są bezstanowe i nie przechowują żadnych aktywów, więc łatwo jest go wycofać i zasugerować użytkownikom korzystanie z zamiennika, `UniswapV2Router02`.

### UniswapV2Router02.sol {#uniswapv2router02}

W większości przypadków będziesz korzystać z Uniswap za pośrednictwem [tego kontraktu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Możesz zobaczyć, jak go używać [tutaj](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Większość z nich spotkaliśmy już wcześniej lub są one dość oczywiste. Jedynym wyjątkiem jest `IWETH.sol`. Uniswap v2 umożliwia wymianę dowolnej pary tokenów ERC-20, ale sam ether (ETH) nie jest tokenem ERC-20. Powstał przed tym standardem i jego transfer odbywa się za pomocą unikalnych mechanizmów. Aby umożliwić korzystanie z ETH w kontraktach, które mają zastosowanie do tokenów ERC-20, wymyślono kontrakt [opakowanego etheru (WETH)](https://weth.tkn.eth.limo/). Wysyłasz do tego kontraktu ETH, a on wybija dla ciebie równoważną ilość WETH. Możesz też spalić WETH i odzyskać ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Router musi wiedzieć, jakiej fabryki użyć, a w przypadku transakcji wymagających WETH, jakiego kontraktu WETH użyć. Wartości te są [niezmienne](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), co oznacza, że mogą zostać ustawione tylko w konstruktorze. Daje to użytkownikom pewność, że nikt nie będzie w stanie ich zmienić, aby wskazywały na mniej uczciwe kontrakty.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Ten modyfikator upewnia się, że transakcje ograniczone czasowo („zrób X przed czasem Y, jeśli możesz”) nie zostaną wykonane po upływie ich limitu czasu.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstruktor po prostu ustawia niezmienne zmienne stanu.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // akceptuj ETH tylko przez fallback z kontraktu WETH
    }
```

Ta funkcja jest wywoływana, gdy wymieniamy tokeny z kontraktu WETH z powrotem na ETH. Tylko używany przez nas kontrakt WETH jest do tego upoważniony.

#### Dodawanie płynności {#add-liquidity}

Te funkcje dodają tokeny do wymiany w parze, co zwiększa pulę płynności.

```solidity

    // **** DODAJ PŁYNNOŚĆ ****
    function _addLiquidity(
```

Ta funkcja służy do obliczania ilości tokenów A i B, które powinny zostać zdeponowane w wymianie pary.

```solidity
        address tokenA,
        address tokenB,
```

Są to adresy kontraktów tokenów ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Są to kwoty, które dostawca płynności chce zdeponować. Są to również maksymalne kwoty A i B do zdeponowania.

```solidity
        uint amountAMin,
        uint amountBMin
```

Są to minimalne akceptowalne kwoty do zdeponowania. Jeśli transakcja nie może dojść do skutku z tymi kwotami lub większymi, następuje jej wycofanie. Jeśli nie chcesz tej funkcji, po prostu wpisz zero.

Dostawcy płynności zazwyczaj określają minimum, ponieważ chcą ograniczyć transakcję do kursu wymiany zbliżonego do obecnego. Jeśli kurs wymiany zbytnio się waha, może to oznaczać wiadomości, które zmieniają wartości bazowe, a oni chcą ręcznie zdecydować, co zrobić.

Wyobraźmy sobie na przykład przypadek, w którym kurs wymiany wynosi jeden do jednego, a dostawca płynności określa następujące wartości:

| Parametr       | Wartość |
| -------------- | ------: |
| amountADesired |    1000 |
| amountBDesired |    1000 |
| amountAMin     |     900 |
| amountBMin     |     800 |

Dopóki kurs wymiany utrzymuje się w przedziale od 0,9 do 1,25, transakcja dochodzi do skutku. Jeśli kurs wymiany wyjdzie poza ten zakres, transakcja zostanie anulowana.

Powodem tego środka ostrożności jest to, że transakcje nie są natychmiastowe, przesyłasz je i ostatecznie walidator włączy je do bloku (chyba że twoja cena gazu jest bardzo niska, w którym to przypadku będziesz musiał przesłać kolejną transakcję z tym samym nonce i wyższą ceną gazu, aby ją nadpisać). Nie masz kontroli nad tym, co dzieje się w czasie między przesłaniem a włączeniem.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Funkcja zwraca kwoty, które dostawca płynności powinien zdeponować, aby uzyskać stosunek równy obecnemu stosunkowi między rezerwami.

```solidity
        // utwórz parę, jeśli jeszcze nie istnieje
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Jeśli nie ma jeszcze wymiany dla tej pary tokenów, utwórz ją.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Pobierz aktualne rezerwy w parze.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Jeśli obecne rezerwy są puste, oznacza to nową wymianę pary. Kwoty do zdeponowania powinny być dokładnie takie same, jak te, które dostawca płynności chce zapewnić.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Jeśli musimy sprawdzić, jakie będą kwoty, uzyskujemy optymalną kwotę za pomocą [tej funkcji](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Chcemy uzyskać taki sam stosunek jak w przypadku obecnych rezerw.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Jeśli `amountBOptimal` jest mniejsze niż kwota, którą dostawca płynności chce zdeponować, oznacza to, że token B jest obecnie bardziej wartościowy, niż sądzi deponent płynności, więc wymagana jest mniejsza kwota.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Jeśli optymalna kwota B jest większa niż pożądana kwota B, oznacza to, że tokeny B są obecnie mniej wartościowe, niż sądzi deponent płynności, więc wymagana jest wyższa kwota. Jednak pożądana kwota jest wartością maksymalną, więc nie możemy tego zrobić. Zamiast tego obliczamy optymalną liczbę tokenów A dla pożądanej ilości tokenów B.

Składając to wszystko w całość, otrzymujemy ten wykres. Załóżmy, że próbujesz zdeponować tysiąc tokenów A (niebieska linia) i tysiąc tokenów B (czerwona linia). Oś X to kurs wymiany, A/B. Jeśli x=1, mają one równą wartość i deponujesz po tysiąc każdego z nich. Jeśli x=2, A ma dwukrotnie większą wartość niż B (otrzymujesz dwa tokeny B za każdy token A), więc deponujesz tysiąc tokenów B, ale tylko 500 tokenów A. Jeśli x=0,5, sytuacja jest odwrotna, tysiąc tokenów A i pięćset tokenów B.

![Graph](liquidityProviderDeposit.png)

Możesz zdeponować płynność bezpośrednio w głównym kontrakcie (używając [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), ale główny kontrakt sprawdza tylko, czy sam nie jest oszukiwany, więc ryzykujesz utratę wartości, jeśli kurs wymiany zmieni się w czasie między przesłaniem transakcji a jej wykonaniem. Jeśli użyjesz kontraktu peryferyjnego, obliczy on kwotę, którą powinieneś zdeponować, i zdeponuje ją natychmiast, dzięki czemu kurs wymiany nie ulegnie zmianie, a ty nic nie stracisz.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Ta funkcja może zostać wywołana przez transakcję w celu zdeponowania płynności. Większość parametrów jest taka sama jak w `_addLiquidity` powyżej, z dwoma wyjątkami:

. `to` to adres, na który wybijane są nowe tokeny płynności, aby pokazać część puli należącą do dostawcy płynności
. `deadline` to limit czasu dla transakcji

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Obliczamy kwoty do faktycznego zdeponowania, a następnie znajdujemy adres puli płynności. Aby zaoszczędzić gaz, nie robimy tego, pytając fabrykę, ale używając funkcji biblioteki `pairFor` (zobacz poniżej w bibliotekach)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Przetransferuj odpowiednie kwoty tokenów od użytkownika do wymiany pary.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

W zamian przekaż na adres `to` tokeny płynności za częściową własność puli. Funkcja `mint` głównego kontraktu sprawdza, ile ma dodatkowych tokenów (w porównaniu do tego, co miała przy ostatniej zmianie płynności) i odpowiednio wybija płynność.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Kiedy dostawca płynności chce zapewnić płynność dla wymiany pary Token/ETH, istnieje kilka różnic. Kontrakt zajmuje się opakowywaniem ETH dla dostawcy płynności. Nie ma potrzeby określania, ile ETH użytkownik chce zdeponować, ponieważ użytkownik po prostu wysyła je wraz z transakcją (kwota jest dostępna w `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Aby zdeponować ETH, kontrakt najpierw opakowuje je w WETH, a następnie transferuje WETH do pary. Zauważ, że transfer jest opakowany w `assert`. Oznacza to, że jeśli transfer się nie powiedzie, wywołanie tego kontraktu również się nie powiedzie, a zatem opakowywanie tak naprawdę nie ma miejsca.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // zwróć resztki eth, jeśli są
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Użytkownik wysłał nam już ETH, więc jeśli zostanie jakaś nadwyżka (ponieważ drugi token jest mniej wartościowy, niż sądził użytkownik), musimy dokonać zwrotu.

#### Usuwanie płynności {#remove-liquidity}

Te funkcje usuną płynność i zwrócą środki dostawcy płynności.

```solidity
    // **** USUŃ PŁYNNOŚĆ ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Najprostszy przypadek usuwania płynności. Istnieje minimalna kwota każdego tokena, którą dostawca płynności zgadza się zaakceptować, i musi to nastąpić przed upływem terminu.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // wyślij płynność do pary
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Funkcja `burn` głównego kontraktu zajmuje się zwracaniem tokenów użytkownikowi.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Gdy funkcja zwraca wiele wartości, ale interesują nas tylko niektóre z nich, w ten sposób pobieramy tylko te wartości. Jest to nieco tańsze pod względem gazu niż odczytanie wartości i nieużycie jej.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Przetłumacz kwoty ze sposobu, w jaki zwraca je główny kontrakt (najpierw token o niższym adresie), na sposób, jakiego oczekuje użytkownik (odpowiadający `tokenA` i `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Można najpierw wykonać transfer, a następnie zweryfikować jego legalność, ponieważ jeśli nie jest legalny, wycofamy wszystkie zmiany stanu.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Usuwanie płynności dla ETH jest prawie takie samo, z tą różnicą, że otrzymujemy tokeny WETH, a następnie wymieniamy je na ETH, aby zwrócić je dostawcy płynności.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Te funkcje przekazują metatransakcje, aby umożliwić użytkownikom bez etheru wypłatę z puli, korzystając z [mechanizmu permit](#uniswapv2erc20).

```solidity

    // **** USUŃ PŁYNNOŚĆ (obsługa tokenów z opłatą przy transferze) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Ta funkcja może być używana dla tokenów, które mają opłaty za transfer lub przechowywanie. Gdy token ma takie opłaty, nie możemy polegać na funkcji `removeLiquidity`, aby powiedziała nam, ile tokena odzyskamy, więc musimy najpierw dokonać wypłaty, a następnie sprawdzić saldo.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Ostatnia funkcja łączy opłaty za przechowywanie z metatransakcjami.

#### Handel {#trade}

```solidity
    // **** WYMIANA ****
    // wymaga, aby początkowa kwota została już wysłana do pierwszej pary
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Ta funkcja wykonuje wewnętrzne przetwarzanie, które jest wymagane dla funkcji udostępnianych traderom.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

W momencie pisania tego tekstu istnieje [388 160 tokenów ERC-20](https://eth.blockscout.com/tokens). Gdyby istniała wymiana pary dla każdej pary tokenów, byłoby to ponad 150 miliardów wymian par. Cały łańcuch w tej chwili [ma tylko 0,1% tej liczby kont](https://eth.blockscout.com/stats/accountsGrowth). Zamiast tego funkcje wymiany obsługują koncepcję ścieżki. Trader może wymienić A na B, B na C i C na D, więc nie ma potrzeby bezpośredniej wymiany pary A-D.

Ceny na tych rynkach mają tendencję do synchronizacji, ponieważ gdy nie są zsynchronizowane, stwarza to okazję do arbitrażu. Wyobraź sobie na przykład trzy tokeny: A, B i C. Istnieją trzy wymiany par, po jednej dla każdej pary.

1. Sytuacja początkowa
2. Trader sprzedaje 24,695 tokenów A i otrzymuje 25,305 tokenów B.
3. Trader sprzedaje 24,695 tokenów B za 25,305 tokenów C, zatrzymując około 0,61 tokenów B jako zysk.
4. Następnie trader sprzedaje 24,695 tokenów C za 25,305 tokenów A, zatrzymując około 0,61 tokenów C jako zysk. Trader ma również 0,61 dodatkowych tokenów A (25,305, z którymi trader kończy, minus początkowa inwestycja w wysokości 24,695).

| Krok | Wymiana A-B                 | Wymiana B-C                 | Wymiana A-C                 |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Pobierz parę, którą obecnie obsługujemy, posortuj ją (do użytku z parą) i pobierz oczekiwaną kwotę wyjściową.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Pobierz oczekiwane kwoty wyjściowe, posortowane w sposób, jakiego oczekuje wymiana pary.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Czy to ostatnia wymiana? Jeśli tak, wyślij tokeny otrzymane za transakcję do miejsca docelowego. Jeśli nie, wyślij je do następnej wymiany pary.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Faktycznie wywołaj wymianę pary, aby wymienić tokeny. Nie potrzebujemy wywołania zwrotnego (callback), aby dowiedzieć się o wymianie, więc nie wysyłamy żadnych bajtów w tym polu.

```solidity
    function swapExactTokensForTokens(
```

Ta funkcja jest używana bezpośrednio przez traderów do wymiany jednego tokena na inny.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Ten parametr zawiera adresy kontraktów ERC-20. Jak wyjaśniono powyżej, jest to tablica, ponieważ może być konieczne przejście przez kilka wymian par, aby przejść od posiadanego aktywa do pożądanego aktywa.

Parametr funkcji w Solidity może być przechowywany w `memory` lub w `calldata`. Jeśli funkcja jest punktem wejścia do kontraktu, wywoływanym bezpośrednio przez użytkownika (za pomocą transakcji) lub z innego kontraktu, wartość parametru można pobrać bezpośrednio z danych wywołania (call data). Jeśli funkcja jest wywoływana wewnętrznie, jak `_swap` powyżej, parametry muszą być przechowywane w `memory`. Z perspektywy wywoływanego kontraktu `calldata` jest tylko do odczytu.

W przypadku typów skalarnych, takich jak `uint` lub `address`, kompilator zajmuje się wyborem miejsca przechowywania za nas, ale w przypadku tablic, które są dłuższe i droższe, określamy typ pamięci do użycia.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Zwracane wartości są zawsze zwracane w pamięci.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Oblicz kwotę do zakupu w każdej wymianie. Jeśli wynik jest mniejszy niż minimum, które trader jest skłonny zaakceptować, następuje wycofanie transakcji.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Na koniec przetransferuj początkowy token ERC-20 na konto dla pierwszej wymiany pary i wywołaj `_swap`. Wszystko to dzieje się w tej samej transakcji, więc wymiana pary wie, że wszelkie nieoczekane tokeny są częścią tego transferu.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Poprzednia funkcja, `swapTokensForTokens`, pozwala traderowi określić dokładną liczbę tokenów wejściowych, które jest skłonny oddać, oraz minimalną liczbę tokenów wyjściowych, które jest skłonny otrzymać w zamian. Ta funkcja wykonuje odwrotną wymianę, pozwala traderowi określić liczbę pożądanych tokenów wyjściowych oraz maksymalną liczbę tokenów wejściowych, którymi jest skłonny za nie zapłacić.

W obu przypadkach trader musi najpierw przyznać temu kontraktowi peryferyjnemu limit wydatków, aby umożliwić mu ich transfer.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // zwróć resztki eth, jeśli są
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Wszystkie te cztery warianty obejmują handel między ETH a tokenami. Jedyna różnica polega na tym, że albo otrzymujemy ETH od tradera i używamy go do wybicia WETH, albo otrzymujemy WETH z ostatniej wymiany na ścieżce i spalamy je, odsyłając traderowi uzyskane ETH.

```solidity
    // **** WYMIANA (obsługa tokenów z opłatą przy transferze) ****
    // wymaga, aby początkowa kwota została już wysłana do pierwszej pary
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Jest to wewnętrzna funkcja do wymiany tokenów, które mają opłaty za transfer lub przechowywanie, w celu rozwiązania ([tego problemu](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // zakres, aby zapobiec błędom zbyt głębokiego stosu
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Ze względu na opłaty za transfer nie możemy polegać na funkcji `getAmountsOut`, aby powiedziała nam, ile uzyskamy z każdego transferu (tak jak robimy to przed wywołaniem oryginalnego `_swap`). Zamiast tego musimy najpierw wykonać transfer, a następnie sprawdzić, ile tokenów odzyskaliśmy.

Uwaga: W teorii moglibyśmy po prostu użyć tej funkcji zamiast `_swap`, ale w niektórych przypadkach (na przykład, jeśli transfer zostanie ostatecznie wycofany, ponieważ na końcu nie ma wystarczającej ilości, aby spełnić wymagane minimum) kosztowałoby to więcej gazu. Tokeny z opłatą za transfer są dość rzadkie, więc chociaż musimy je uwzględnić, nie ma potrzeby, aby wszystkie wymiany zakładały, że przechodzą przez co najmniej jeden z nich.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Są to te same warianty używane dla normalnych tokenów, ale zamiast tego wywołują `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** FUNKCJE BIBLIOTEKI ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Te funkcje to tylko proxy, które wywołują [funkcje UniswapV2Library](#uniswapv2library).

### UniswapV2Migrator.sol {#uniswapv2migrator}

Ten kontrakt został użyty do migracji wymian ze starej wersji v1 do v2. Teraz, gdy zostały one zmigrowane, nie ma on już znaczenia.

## Biblioteki {#libraries}

[Biblioteka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) jest dobrze udokumentowana, więc nie ma potrzeby opisywać jej tutaj.

### Math {#math}

Ta biblioteka zawiera pewne funkcje matematyczne, które zazwyczaj nie są potrzebne w kodzie Solidity, więc nie są częścią języka.

```solidity
pragma solidity =0.5.16;

// biblioteka do wykonywania różnych operacji matematycznych

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // metoda babilońska (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Zacznij od x jako oszacowania, które jest wyższe niż pierwiastek kwadratowy (to jest powód, dla którego musimy traktować 1-3 jako przypadki szczególne).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Uzyskaj dokładniejsze oszacowanie, średnią z poprzedniego oszacowania i liczby, której pierwiastek kwadratowy próbujemy znaleźć, podzieloną przez poprzednie oszacowanie. Powtarzaj, aż nowe oszacowanie nie będzie niższe od istniejącego. Aby uzyskać więcej szczegółów, [zobacz tutaj](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nigdy nie powinniśmy potrzebować pierwiastka kwadratowego z zera. Pierwiastki kwadratowe z jeden, dwa i trzy wynoszą w przybliżeniu jeden (używamy liczb całkowitych, więc ignorujemy ułamek).

```solidity
        }
    }
}
```

### Ułamki stałoprzecinkowe (UQ112x112) {#fixedpoint}

Ta biblioteka obsługuje ułamki, które normalnie nie są częścią arytmetyki Ethereum. Robi to poprzez kodowanie liczby _x_ jako _x\*2^112_. Pozwala nam to na użycie oryginalnych kodów operacji dodawania i odejmowania bez zmian.

```solidity
pragma solidity =0.5.16;

// biblioteka do obsługi binarnych liczb stałoprzecinkowych (https://wikipedia.org/wiki/Q_(number_format))

// zakres: [0, 2**112 - 1]
// rozdzielczość: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` to kodowanie dla jedynki.

```solidity
    // zakoduj uint112 jako UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // nigdy się nie przepełnia
    }
```

Ponieważ y to `uint112`, jego maksymalna wartość to 2^112-1. Ta liczba wciąż może być zakodowana jako `UQ112x112`.

```solidity
    // podziel UQ112x112 przez uint112, zwracając UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Jeśli podzielimy dwie wartości `UQ112x112`, wynik nie jest już mnożony przez 2^112. Zamiast tego bierzemy liczbę całkowitą jako mianownik. Musielibyśmy użyć podobnej sztuczki do mnożenia, ale nie musimy mnożyć wartości `UQ112x112`.

### UniswapV2Library {#uniswapv2library}

Ta biblioteka jest używana tylko przez kontrakty peryferyjne

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // zwraca posortowane adresy tokenów, używane do obsługi zwracanych wartości z par posortowanych w tej kolejności
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Posortuj dwa tokeny według adresu, abyśmy mogli uzyskać adres wymiany pary dla nich. Jest to konieczne, ponieważ w przeciwnym razie mielibyśmy dwie możliwości: jedną dla parametrów A,B i drugą dla parametrów B,A, co prowadziłoby do dwóch wymian zamiast jednej.

```solidity
    // oblicza adres CREATE2 dla pary bez wykonywania żadnych zewnętrznych wywołań
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hash kodu inicjującego
            ))));
    }
```

Ta funkcja oblicza adres wymiany pary dla dwóch tokenów. Ten kontrakt jest tworzony przy użyciu [kodu operacji CREATE2](https://eips.ethereum.org/EIPS/eip-1014), więc możemy obliczyć adres za pomocą tego samego algorytmu, jeśli znamy parametry, których używa. Jest to znacznie tańsze niż pytanie fabryki, a

```solidity
    // pobiera i sortuje rezerwy dla pary
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Ta funkcja zwraca rezerwy dwóch tokenów, które posiada wymiana pary. Zauważ, że może ona otrzymać tokeny w dowolnej kolejności i sortuje je do użytku wewnętrznego.

```solidity
    // biorąc pod uwagę pewną ilość aktywa i rezerwy pary, zwraca równoważną ilość drugiego aktywa
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Ta funkcja podaje ilość tokena B, którą otrzymasz w zamian za token A, jeśli nie ma żadnej opłaty. To obliczenie bierze pod uwagę, że transfer zmienia kurs wymiany.

```solidity
    // biorąc pod uwagę wejściową ilość aktywa i rezerwy pary, zwraca maksymalną wyjściową ilość drugiego aktywa
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Powyższa funkcja `quote` działa świetnie, jeśli nie ma opłaty za korzystanie z wymiany pary. Jednakże, jeśli istnieje opłata za wymianę w wysokości 0,3%, kwota, którą faktycznie otrzymasz, jest niższa. Ta funkcja oblicza kwotę po potrąceniu opłaty za wymianę.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity nie obsługuje ułamków natywnie, więc nie możemy po prostu pomnożyć kwoty wyjściowej przez 0,997. Zamiast tego mnożymy licznik przez 997, a mianownik przez 1000, osiągając ten sam efekt.

```solidity
    // biorąc pod uwagę wyjściową ilość aktywa i rezerwy pary, zwraca wymaganą wejściową ilość drugiego aktywa
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Ta funkcja robi z grubsza to samo, ale pobiera kwotę wyjściową i dostarcza wejściową.

```solidity

    // wykonuje łańcuchowe obliczenia getAmountOut na dowolnej liczbie par
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // wykonuje łańcuchowe obliczenia getAmountIn na dowolnej liczbie par
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Te dwie funkcje zajmują się identyfikacją wartości, gdy konieczne jest przejście przez kilka wymian par.

### Transfer Helper {#transfer-helper}

[Ta biblioteka](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) dodaje kontrole sukcesu wokół transferów ERC-20 i Ethereum, aby traktować wycofanie i zwrócenie wartości `false` w ten sam sposób.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// metody pomocnicze do interakcji z tokenami ERC-20 i wysyłania ETH, które nie zawsze zwracają true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Możemy wywołać inny kontrakt na jeden z dwóch sposobów:

- Użyć definicji interfejsu do utworzenia wywołania funkcji
- Użyć [interfejsu binarnego aplikacji (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) „ręcznie”, aby utworzyć wywołanie. Na to właśnie zdecydował się autor kodu.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Ze względu na kompatybilność wsteczną z tokenami, które zostały utworzone przed standardem ERC-20, wywołanie ERC-20 może zakończyć się niepowodzeniem poprzez wycofanie (w którym to przypadku `success` wynosi `false`) lub poprzez pomyślne zakończenie i zwrócenie wartości `false` (w którym to przypadku istnieją dane wyjściowe, a jeśli zdekodujesz je jako wartość logiczną, otrzymasz `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Ta funkcja implementuje [funkcjonalność transferu ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), która pozwala kontu na wydanie limitu wydatków zapewnionego przez inne konto.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Ta funkcja implementuje [funkcjonalność transferFrom ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), która pozwala kontu na wydanie limitu wydatków zapewnionego przez inne konto.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Ta funkcja transferuje ether na konto. Każde wywołanie do innego kontraktu może próbować wysłać ether. Ponieważ nie musimy faktycznie wywoływać żadnej funkcji, nie wysyłamy żadnych danych z wywołaniem.

## Podsumowanie {#conclusion}

To długi artykuł liczący około 50 stron. Jeśli dotarłeś aż tutaj, gratulacje! Miejmy nadzieję, że do tej pory zrozumiałeś kwestie związane z pisaniem rzeczywistej aplikacji (w przeciwieństwie do krótkich programów przykładowych) i jesteś lepiej przygotowany do pisania kontraktów dla własnych przypadków użycia.

A teraz idź, napisz coś użytecznego i nas zaskocz.

[Więcej moich prac znajdziesz tutaj](https://cryptodocguy.pro/).