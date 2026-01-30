---
title: "Wszystko, co możesz zbuforować"
description: "Dowiedz się, jak tworzyć i używać kontraktu buforującego w celu uzyskania tańszych transakcji w pakietach zbiorczych"
author: Ori Pomerantz
tags: [ "warstwa 2", "buforowanie", "przechowywanie" ]
skill: intermediate
published: 2022-09-15
lang: pl
---

Podczas korzystania z pakietów zbiorczych koszt jednego bajtu w transakcji jest znacznie wyższy niż koszt slotu pamięci. Dlatego sensowne jest buforowanie jak największej ilości informacji w łańcuchu.

W tym artykule dowiesz się, jak stworzyć i używać kontraktu buforującego w taki sposób, aby każda wartość parametru, która prawdopodobnie będzie używana wielokrotnie, została zbuforowana i była dostępna do użycia (po pierwszym razie) przy użyciu znacznie mniejszej liczby bajtów, oraz jak napisać kod poza łańcuchem, który korzysta z tej pamięci podręcznej.

Jeśli chcesz pominąć artykuł i po prostu zobaczyć kod źródłowy, [jest on tutaj](https://github.com/qbzzt/20220915-all-you-can-cache). Stos programistyczny to [Foundry](https://getfoundry.sh/introduction/installation/).

## Ogólny projekt {#overall-design}

Dla uproszczenia założymy, że wszystkie parametry transakcji to `uint256` o długości 32 bajtów. Gdy otrzymamy transakcję, będziemy analizować każdy parametr w następujący sposób:

1. Jeśli pierwszy bajt to `0xFF`, weź następne 32 bajty jako wartość parametru i zapisz ją w pamięci podręcznej.

2. Jeśli pierwszy bajt to `0xFE`, weź następne 32 bajty jako wartość parametru, ale _nie_ zapisuj jej w pamięci podręcznej.

3. Dla każdej innej wartości weź cztery górne bity jako liczbę dodatkowych bajtów, a dolne cztery bity jako najbardziej znaczące bity klucza pamięci podręcznej. Oto kilka przykładów:

   | Bajty w calldata | Klucz pamięci podręcznej |
   | :--------------- | -----------------------: |
   | 0x0F             |                     0x0F |
   | 0x10,0x10        |                     0x10 |
   | 0x12,0xAC        |                   0x02AC |
   | 0x2D,0xEA, 0xD6  |                 0x0DEAD6 |

## Manipulacja pamięcią podręczną {#cache-manipulation}

Pamięć podręczna jest zaimplementowana w [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Przejdźmy przez niego linia po linii.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Te stałe służą do interpretacji specjalnych przypadków, w których podajemy wszystkie informacje i chcemy je zapisać w pamięci podręcznej lub nie. Zapisywanie do pamięci podręcznej wymaga dwóch operacji [`SSTORE`](https://www.evm.codes/#55) w wcześniej nieużywanych slotach pamięci kosztem 22100 jednostek gazu każda, dlatego jest to opcjonalne.

```solidity

    mapping(uint => uint) public val2key;
```

[Odwzorowanie](https://www.geeksforgeeks.org/solidity/solidity-mappings/) pomiędzy wartościami a ich kluczami. Ta informacja jest niezbędna do zakodowania wartości przed wysłaniem transakcji.

```solidity
    // Lokalizacja n ma wartość dla klucza n+1, ponieważ musimy zachować
    // zero jako "nie w pamięci podręcznej".
    uint[] public key2val;
```

Możemy użyć tablicy do mapowania kluczy na wartości, ponieważ to my przypisujemy klucze i dla uproszczenia robimy to sekwencyjnie.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Odczyt niezainicjowanego wpisu w pamięci podręcznej");
        return key2val[_key-1];
    }  // cacheRead
```

Odczytaj wartość z pamięci podręcznej.

```solidity
    // Zapisz wartość w pamięci podręcznej, jeśli jeszcze jej tam nie ma
    // Funkcja publiczna tylko po to, aby umożliwić działanie testu
    function cacheWrite(uint _value) public returns (uint) {
        // Jeśli wartość jest już w pamięci podręcznej, zwróć bieżący klucz
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Nie ma sensu umieszczać tej samej wartości w pamięci podręcznej więcej niż raz. Jeśli wartość już istnieje, po prostu zwróć istniejący klucz.

```solidity
        // Ponieważ 0xFE jest przypadkiem specjalnym, największy klucz, jaki może pomieścić pamięć podręczna, to
        // 0x0D, po którym następuje 15 wartości 0xFF. Jeśli długość pamięci podręcznej jest już tak
        // duża, zakończ błędem.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "przepełnienie pamięci podręcznej");
```

Nie sądzę, abyśmy kiedykolwiek uzyskali tak dużą pamięć podręczną (około 1,8\*10<sup>37</sup> wpisów, co wymagałoby około 10<sup>27</sup> TB do przechowywania). Jednak jestem na tyle stary, że pamiętam ["640 kB powinno zawsze wystarczyć"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Ten test jest bardzo tani.

```solidity
        // Zapisz wartość, używając następnego klucza
        val2key[_value] = key2val.length+1;
```

Dodaj wyszukiwanie wsteczne (od wartości do klucza).

```solidity
        key2val.push(_value);
```

Dodaj wyszukiwanie w przód (od klucza do wartości). Ponieważ przypisujemy wartości sekwencyjnie, możemy po prostu dodać ją po ostatniej wartości w tablicy.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Zwróć nową długość `key2val`, która jest komórką, w której przechowywana jest nowa wartość.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Ta funkcja odczytuje wartość z calldata o dowolnej długości (do 32 bajtów, czyli rozmiaru słowa).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "Limit długości _calldataVal to 32 bajty");
        require(length + startByte <= msg.data.length,
            "_calldataVal próbuje odczytać poza calldatasize");
```

Ta funkcja jest wewnętrzna, więc jeśli reszta kodu jest napisana poprawnie, te testy nie są wymagane. Jednak nie kosztują wiele, więc równie dobrze możemy je mieć.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ten kod jest w języku [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Odczytuje 32-bajtową wartość z calldata. Działa to nawet wtedy, gdy calldata kończy się przed `startByte+32`, ponieważ niezainicjowana przestrzeń w EVM jest uważana za zerową.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Niekoniecznie chcemy wartości 32-bajtowej. To usuwa nadmiarowe bajty.

```solidity
        return _retVal;
    } // _calldataVal


    // Odczytaj pojedynczy parametr z calldata, zaczynając od _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Odczytaj pojedynczy parametr z calldata. Zauważ, że musimy zwrócić nie tylko odczytaną wartość, ale także lokalizację następnego bajtu, ponieważ parametry mogą mieć długość od 1 do 33 bajtów.

```solidity
        // Pierwszy bajt mówi nam, jak interpretować resztę
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity próbuje zredukować liczbę błędów, zabraniając potencjalnie niebezpiecznych [niejawnych konwersji typów](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). Degradacja, na przykład z 256 bitów do 8 bitów, musi być jawna.

```solidity

        // Odczytaj wartość, ale nie zapisuj jej w pamięci podręcznej
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Odczytaj wartość i zapisz ją w pamięci podręcznej
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Jeśli dotarliśmy tutaj, oznacza to, że musimy odczytać z pamięci podręcznej

        // Liczba dodatkowych bajtów do odczytania
        uint8 _extraBytes = _firstByte / 16;
```

Weź dolny [półbajt (nibble)](https://en.wikipedia.org/wiki/Nibble) i połącz go z pozostałymi bajtami, aby odczytać wartość z pamięci podręcznej.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Odczytaj n parametrów (funkcje wiedzą, ilu parametrów oczekują)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Moglibyśmy pobrać liczbę parametrów z samych danych wywołania (calldata), ale funkcje, które nas wywołują, wiedzą, ilu parametrów oczekują. Łatwiej jest pozwolić, aby to one nam o tym powiedziały.

```solidity
        // Parametry, które odczytujemy
        uint[] memory params = new uint[](_paramNum);

        // Parametry zaczynają się od 4 bajtu, przed nim jest sygnatura funkcji
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Odczytuj parametry, aż uzyskasz potrzebną liczbę. Jeśli wykroczymy poza koniec calldata, `_readParams` cofnie wywołanie.

```solidity

        return(params);
    }   // readParams

    // Do testowania _readParams, przetestuj odczyt czterech parametrów
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Jedną z wielkich zalet Foundry jest to, że pozwala na pisanie testów w Solidity ([zobacz Testowanie pamięci podręcznej poniżej](#testing-the-cache)). To znacznie ułatwia testy jednostkowe. Jest to funkcja, która odczytuje cztery parametry i zwraca je, aby test mógł zweryfikować ich poprawność.

```solidity
    // Pobierz wartość, zwróć bajty, które ją zakodują (używając pamięci podręcznej, jeśli to możliwe)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` to funkcja, którą kod offchain (poza łańcuchem) wywołuje, aby pomóc w tworzeniu calldata korzystających z pamięci podręcznej. Otrzymuje pojedynczą wartość i zwraca bajty, które ją kodują. Ta funkcja jest funkcją typu `view`, więc nie wymaga transakcji, a wywołana z zewnątrz nie zużywa gazu.

```solidity
        uint _key = val2key[_val];

        // Wartości nie ma jeszcze w pamięci podręcznej, więc dodaj ją
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

W [EVM](/developers/docs/evm/) cała niezainicjowana pamięć masowa jest traktowana jako zera. Więc jeśli szukamy klucza dla wartości, której tam nie ma, otrzymujemy zero. W takim przypadku bajty, które ją kodują, to `INTO_CACHE` (więc zostanie zbuforowana następnym razem), a po nich rzeczywista wartość.

```solidity
        // Jeśli klucz jest <0x10, zwróć go jako pojedynczy bajt
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Pojedyncze bajty są najłatwiejsze. Używamy po prostu [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat), aby zamienić typ `bytes<n>` na tablicę bajtów o dowolnej długości. Pomimo nazwy działa dobrze, gdy jest zaopatrzona w tylko jeden argument.

```solidity
        // Wartość dwubajtowa, zakodowana jako 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Gdy mamy klucz mniejszy niż 16<sup>3</sup>, możemy go wyrazić w dwóch bajtach. Najpierw konwertujemy `_key`, która jest wartością 256-bitową, na wartość 16-bitową i używamy logicznego LUB, aby dodać liczbę dodatkowych bajtów do pierwszego bajtu. Następnie zamieniamy ją na wartość `bytes2`, którą można przekonwertować na `bytes`.

```solidity
        // Prawdopodobnie istnieje sprytny sposób na wykonanie następujących linii jako pętli,
        // ale jest to funkcja widoku, więc optymalizuję pod kątem czasu programisty i
        // prostoty.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Pozostałe wartości (3 bajty, 4 bajty itp.) są obsługiwane w ten sam sposób, tylko z różnymi rozmiarami pól.

```solidity
        // Jeśli dotarliśmy tutaj, coś jest nie tak.
        revert("Błąd w encodeVal, nie powinno się zdarzyć");
```

Jeśli tu dotrzemy, oznacza to, że otrzymaliśmy klucz, który nie jest mniejszy niż 16\*256<sup>15</sup>. Ale `cacheWrite` ogranicza klucze, więc nie możemy nawet dojść do 14\*256<sup>16</sup> (co miałoby pierwszy bajt 0xFE, więc wyglądałoby jak `DONT_CACHE`). Ale niewiele nas kosztuje dodanie testu na wypadek, gdyby przyszły programista wprowadził błąd.

```solidity
    } // encodeVal

}  // Cache
```

### Testowanie pamięci podręcznej {#testing-the-cache}

Jedną z zalet Foundry jest to, że [pozwala pisać testy w Solidity](https://getfoundry.sh/forge/tests/overview/), co ułatwia pisanie testów jednostkowych. Testy dla klasy `Cache` są [tutaj](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Ponieważ kod testowy jest powtarzalny, jak to zwykle bywa z testami, w tym artykule wyjaśniono tylko interesujące części.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Należy uruchomić `forge test -vv` dla konsoli.
import "forge-std/console.sol";
```

To tylko standardowy kod, który jest niezbędny do użycia pakietu testowego i `console.log`.

```solidity
import "src/Cache.sol";
```

Musimy znać kontrakt, który testujemy.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Funkcja `setUp` jest wywoływana przed każdym testem. W tym przypadku po prostu tworzymy nową pamięć podręczną, aby nasze testy nie wpływały na siebie nawzajem.

```solidity
    function testCaching() public {
```

Testy to funkcje, których nazwy zaczynają się od `test`. Ta funkcja sprawdza podstawową funkcjonalność pamięci podręcznej, zapisując wartości i ponownie je odczytując.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

W ten sposób przeprowadza się rzeczywiste testowanie za pomocą [funkcji `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). W tym przypadku sprawdzamy, czy wartość, którą zapisaliśmy, jest tą samą, którą odczytaliśmy. Możemy zignorować wynik `cache.cacheWrite`, ponieważ wiemy, że klucze pamięci podręcznej są przypisywane liniowo.

```solidity
        }
    }    // testCaching


    // Zapisz tę samą wartość wiele razy, upewnij się, że klucz pozostaje
    // taki sam
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Najpierw zapisujemy każdą wartość do pamięci podręcznej dwukrotnie i upewniamy się, że klucze są takie same (co oznacza, że drugi zapis tak naprawdę nie miał miejsca).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Teoretycznie może istnieć błąd, który nie wpływa na kolejne zapisy w pamięci podręcznej. Dlatego tutaj wykonujemy kilka zapisów, które nie są następujące po sobie i widzimy, że wartości nadal nie są nadpisywane.

```solidity
    // Odczytaj uint z bufora pamięci (aby upewnić się, że otrzymamy z powrotem parametry,
    // które wysłaliśmy)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Odczytaj 256-bitowe słowo z bufora `bytes memory`. Ta funkcja narzędziowa pozwala nam zweryfikować, czy otrzymujemy poprawne wyniki, gdy uruchamiamy wywołanie funkcji, która używa pamięci podręcznej.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul nie obsługuje struktur danych poza `uint256`, więc gdy odwołujesz się do bardziej zaawansowanej struktury danych, takiej jak bufor pamięci `_bytes`, otrzymujesz adres tej struktury. Solidity przechowuje wartości `bytes memory` jako 32-bajtowe słowo, które zawiera długość, po której następują rzeczywiste bajty, więc aby uzyskać bajt o numerze `_start`, musimy obliczyć `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Sygnatura funkcji dla fourParams(), dzięki uprzejmości
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Po prostu kilka stałych wartości, aby zobaczyć, czy otrzymujemy poprawne wartości z powrotem
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Kilka stałych, których potrzebujemy do testowania.

```solidity
    function testReadParam() public {
```

Wywołaj `fourParams()`, funkcję, która używa `readParams`, aby przetestować, czy potrafimy poprawnie odczytać parametry.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Nie możemy użyć normalnego mechanizmu ABI do wywołania funkcji przy użyciu pamięci podręcznej, więc musimy użyć niskopoziomowego mechanizmu [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Mechanizm ten przyjmuje na wejściu `bytes memory`, a na wyjściu zwraca to samo (oraz wartość logiczną).

```solidity
        // Pierwsze wywołanie, pamięć podręczna jest pusta
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Użyteczne jest, aby ten sam kontrakt obsługiwał zarówno funkcje buforowane (dla wywołań bezpośrednio z transakcji), jak i niebuforowane (dla wywołań z innych inteligentnych kontraktów). Aby to zrobić, musimy nadal polegać na mechanizmie Solidity do wywoływania poprawnej funkcji, zamiast umieszczać wszystko w [funkcji `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Dzięki temu kompozycyjność staje się o wiele łatwiejsza. Pojedynczy bajt w większości przypadków wystarczyłby do zidentyfikowania funkcji, więc marnujemy trzy bajty (16\*3=48 jednostek gazu). Jednak w chwili, gdy to piszę, te 48 jednostek gazu kosztuje 0,07 centa, co jest rozsądnym kosztem prostszego, mniej podatnego na błędy kodu.

```solidity
            // Pierwsza wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Pierwsza wartość: flaga informująca, że jest to pełna wartość, która musi zostać zapisana w pamięci podręcznej, a następnie 32 bajty wartości. Pozostałe trzy wartości są podobne, z wyjątkiem tego, że `VAL_B` nie jest zapisywana do pamięci podręcznej, a `VAL_C` jest zarówno trzecim, jak i czwartym parametrem.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

To tutaj faktycznie wywołujemy kontrakt `Cache`.

```solidity
        assertEq(_success, true);
```

Oczekujemy, że wywołanie się powiedzie.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Zaczynamy z pustą pamięcią podręczną, a następnie dodajemy `VAL_A`, a po niej `VAL_C`. Spodziewalibyśmy się, że pierwszy będzie miał klucz 1, a drugi 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Dane wyjściowe to cztery parametry. Tutaj weryfikujemy, czy są poprawne.

```solidity
        // Drugie wywołanie, możemy użyć pamięci podręcznej
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Pierwsza wartość w pamięci podręcznej
            bytes1(0x01),
```

Klucze pamięci podręcznej poniżej 16 to tylko jeden bajt.

```solidity
            // Druga wartość, nie dodawaj jej do pamięci podręcznej
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Trzecia i czwarta wartość, ta sama wartość
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Testy po wywołaniu są identyczne jak te po pierwszym wywołaniu.

```solidity
    function testEncodeVal() public {
```

Ta funkcja jest podobna do `testReadParam`, z wyjątkiem tego, że zamiast jawnie pisać parametry, używamy `encodeVal()`.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

Jedynym dodatkowym testem w `testEncodeVal()` jest weryfikacja, czy długość `_callInput` jest prawidłowa. Dla pierwszego wywołania jest to 4+33\*4. Dla drugiego, gdzie każda wartość jest już w pamięci podręcznej, wynosi ona 4+1\*4.

```solidity
    // Przetestuj encodeVal, gdy klucz ma więcej niż jeden bajt
    // Maksymalnie trzy bajty, ponieważ wypełnienie pamięci podręcznej do czterech bajtów trwa
    // zbyt długo.
    function testEncodeValBig() public {
        // Umieść pewną liczbę wartości w pamięci podręcznej.
        // Aby uprościć sprawę, użyj klucza n dla wartości n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Powyższa funkcja `testEncodeVal` zapisuje tylko cztery wartości do pamięci podręcznej, więc [część funkcji, która zajmuje się wartościami wielobajtowymi](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171), nie jest sprawdzana. Ale ten kod jest skomplikowany i podatny na błędy.

Pierwsza część tej funkcji to pętla, która po kolei zapisuje do pamięci podręcznej wszystkie wartości od 1 do 0x1FFF, dzięki czemu będziemy w stanie zakodować te wartości i wiedzieć, dokąd trafią.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Jeden bajt        0x0F
            cache.encodeVal(0x0010),   // Dwa bajty     0x1010
            cache.encodeVal(0x0100),   // Dwa bajty     0x1100
            cache.encodeVal(0x1000)    // Trzy bajty 0x201000
        );
```

Przetestuj wartości jedno-, dwu- i trzybajtowe. Nie testujemy dalej, ponieważ zapisanie wystarczającej liczby wpisów na stosie (co najmniej 0x10000000, czyli około ćwierć miliarda) zajęłoby zbyt dużo czasu.

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Przetestuj, że przy zbyt małym buforze otrzymamy revert
    function testShortCalldata() public {
```

Przetestuj, co się stanie w nietypowym przypadku, gdy nie ma wystarczającej liczby parametrów.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Ponieważ następuje wycofanie, wynikiem, który powinniśmy otrzymać, jest `fałsz`.

```
    // Wywołanie z kluczami pamięci podręcznej, których tam nie ma
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Pierwsza wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Druga wartość
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Ta funkcja otrzymuje cztery całkowicie prawidłowe parametry, z wyjątkiem tego, że pamięć podręczna jest pusta, więc nie ma tam żadnych wartości do odczytania.

```solidity
        .
        .
        .
    // Przetestuj, że przy zbyt długim buforze wszystko działa poprawnie
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Pierwsze wywołanie, pamięć podręczna jest pusta
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Pierwsza wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Druga wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Trzecia wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Czwarta wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_D),

            // I jeszcze jedna wartość „na szczęście”
            bytes4(0x31112233)
        );
```

Ta funkcja wysyła pięć wartości. Wiemy, że piąta wartość jest ignorowana, ponieważ nie jest prawidłowym wpisem w pamięci podręcznej, co spowodowałoby wycofanie transakcji, gdyby nie została uwzględniona.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Przykładowa aplikacja {#a-sample-app}

Pisanie testów w Solidity jest bardzo dobre, ale ostatecznie dapka musi być w stanie przetwarzać żądania spoza łańcucha, aby być użyteczną. Ten artykuł pokazuje, jak używać buforowania w dapce z `WORM`, co oznacza „Write Once, Read Many” (zapisz raz, czytaj wiele razy). Jeśli klucz nie jest jeszcze zapisany, można do niego zapisać wartość. Jeśli klucz jest już zapisany, następuje wycofanie transakcji.

### Kontrakt {#the-contract}

[To jest kontrakt](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). W dużej mierze powtarza to, co zrobiliśmy już z `Cache` i `CacheTest`, więc omówimy tylko interesujące części.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Najłatwiejszym sposobem na użycie `Cache` jest odziedziczenie go w naszym własnym kontrakcie.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Ta funkcja jest podobna do `fourParam` w `CacheTest` powyżej. Ponieważ nie przestrzegamy specyfikacji ABI, najlepiej nie deklarować żadnych parametrów w funkcji.

```solidity
    // Ułatwienie wywoływania nas
    // Sygnatura funkcji dla writeEntryCached(), dzięki uprzejmości
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Kod zewnętrzny, który wywołuje `writeEntryCached`, będzie musiał ręcznie zbudować dane wywołania (calldata), zamiast używać `worm.writeEntryCached`, ponieważ nie przestrzegamy specyfikacji ABI. Posiadanie tej stałej wartości po prostu ułatwia pisanie.

Należy pamiętać, że chociaż definiujemy `WRITE_ENTRY_CACHED` jako zmienną stanu, aby odczytać ją z zewnątrz, należy użyć funkcji pobierającej dla niej, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Funkcja odczytu jest typu `view`, więc nie wymaga transakcji i nie kosztuje gazu. W rezultacie nie ma korzyści z używania pamięci podręcznej dla parametru. W przypadku funkcji `view` najlepiej jest używać standardowego mechanizmu, który jest prostszy.

### Kod testowy {#the-testing-code}

[To jest kod testowy dla kontraktu](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Ponownie, spójrzmy tylko na to, co jest interesujące.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[To (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) to sposób, w jaki w teście Foundry określamy, że następne wywołanie powinno zakończyć się niepowodzeniem, oraz podajemy przyczynę niepowodzenia. Dotyczy to sytuacji, gdy używamy składni `<contract>.<function name>() zamiast budować dane wywołania (calldata) i wywoływać kontrakt przy użyciu interfejsu niskiego poziomu (`<contract>.call()` itp.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Tutaj wykorzystujemy fakt, że `cacheWrite` zwraca klucz pamięci podręcznej. Nie jest to coś, czego spodziewalibyśmy się używać w produkcji, ponieważ `cacheWrite` zmienia stan, a zatem może być wywoływane tylko podczas transakcji. Transakcje nie mają wartości zwracanych; jeśli mają wyniki, to te wyniki powinny być emitowane jako zdarzenia. Zatem wartość zwracana przez `cacheWrite` jest dostępna tylko z kodu onchain, a kod onchain nie potrzebuje buforowania parametrów.

```solidity
        (_success,) = address(worm).call(_callInput);
```

W ten sposób mówimy Solidity, że chociaż `<contract address>.call()` ma dwie wartości zwracane, interesuje nas tylko pierwsza.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Ponieważ używamy funkcji niskiego poziomu `<address>.call()`, nie możemy użyć `vm.expectRevert()` i musimy sprawdzić wartość logiczną powodzenia, którą otrzymujemy z wywołania.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

W ten sposób w Foundry weryfikujemy, czy kod [poprawnie emituje zdarzenie](https://getfoundry.sh/reference/cheatcodes/expect-emit/).

### Klient {#the-client}

Jedną rzeczą, której nie dostajesz w testach Solidity, jest kod JavaScript, który możesz wyciąć i wkleić do własnej aplikacji. Aby napisać ten kod, wdrożyłem WORM w [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), nowej sieci testowej [Optimism](https://www.optimism.io/). Znajduje się pod adresem [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Kod JavaScript dla klienta można zobaczyć tutaj](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Aby go użyć:

1. Sklonuj repozytorium git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Zainstaluj niezbędne pakiety:

   ```sh
   cd javascript
   yarn
   ```

3. Skopiuj plik konfiguracyjny:

   ```sh
   cp .env.example .env
   ```

4. Edytuj `.env` dla swojej konfiguracji:

   | Parametr                                                      | Wartość                                                                                                                                                                                                |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | MNEMONIC                                                      | Mnemonic dla konta, które ma wystarczająco dużo ETH, aby opłacić transakcję. [Darmowe ETH dla sieci Optimism Goerli można uzyskać tutaj](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL do Optimism Goerli. Publiczny punkt końcowy, `https://goerli.optimism.io`, ma ograniczenia szybkości, ale jest wystarczający do tego, czego tutaj potrzebujemy                     |

5. Uruchom `index.js`.

   ```sh
   node index.js
   ```

   Ta przykładowa aplikacja najpierw zapisuje wpis do WORM, wyświetlając dane wywołania (calldata) i link do transakcji na Etherscan. Następnie odczytuje ten wpis i wyświetla używany klucz oraz wartości we wpisie (wartość, numer bloku i autor).

Większość klienta to normalny JavaScript Dapp. Dlatego ponownie przejdziemy tylko przez interesujące części.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Za każdym razem potrzebny jest nowy klucz
    const key = await worm.encodeVal(Number(new Date()))
```

W danym slocie można zapisać tylko raz, więc używamy znacznika czasu, aby upewnić się, że nie używamy ponownie slotów.

```javascript
const val = await worm.encodeVal("0x600D")

// Zapisz wpis
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers oczekuje, że dane wywołania będą ciągiem szesnastkowym, `0x` po którym następuje parzysta liczba cyfr szesnastkowych. Ponieważ zarówno `key`, jak i `val` zaczynają się od `0x`, musimy usunąć te nagłówki.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Podobnie jak w przypadku kodu testowego Solidity, nie możemy normalnie wywołać funkcji buforowanej. Zamiast tego musimy użyć mechanizmu niższego poziomu.

```javascript
    .
    .
    .
    // Odczytaj właśnie zapisany wpis
    const realKey = '0x' + key.slice(4)  // usuń flagę FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Do odczytywania wpisów możemy użyć normalnego mechanizmu. Nie ma potrzeby używania buforowania parametrów z funkcjami `view`.

## Wnioski {#conclusion}

Kod w tym artykule jest dowodem słuszności koncepcji, jego celem jest ułatwienie zrozumienia pomysłu. W przypadku systemu gotowego do produkcji można zaimplementować dodatkowe funkcje:

- Obsługuj wartości, które nie są `uint256`. Na przykład ciągi znaków.
- Zamiast globalnej pamięci podręcznej, można mieć mapowanie między użytkownikami a pamięciami podręcznymi. Różni użytkownicy używają różnych wartości.
- Wartości używane dla adresów różnią się od tych używanych do innych celów. Może mieć sens posiadanie oddzielnej pamięci podręcznej tylko dla adresów.
- Obecnie klucze pamięci podręcznej działają na zasadzie algorytmu „kto pierwszy, ten ma najmniejszy klucz”. Pierwsze szesnaście wartości można wysłać jako pojedynczy bajt. Następne 4080 wartości można wysłać jako dwa bajty. Następny około milion wartości to trzy bajty itd. System produkcyjny powinien utrzymywać liczniki użycia wpisów w pamięci podręcznej i reorganizować je tak, aby szesnaście _najczęściej używanych_ wartości miało jeden bajt, następne 4080 najczęściej używanych wartości dwa bajty itd.

  Jest to jednak potencjalnie niebezpieczna operacja. Wyobraź sobie następującą sekwencję zdarzeń:

  1. Noam Naiwny wywołuje `encodeVal`, aby zakodować adres, na który chce wysłać tokeny. Ten adres jest jednym z pierwszych używanych w aplikacji, więc zakodowana wartość to 0x06. Jest to funkcja `view`, a nie transakcja, więc jest to sprawa między Noamem a węzłem, którego używa, i nikt inny o tym nie wie.

  2. Owen Właściciel uruchamia operację zmiany kolejności pamięci podręcznej. Bardzo niewiele osób faktycznie używa tego adresu, więc jest on teraz zakodowany jako 0x201122. Innej wartości, 10<sup>18</sup>, przypisano 0x06.

  3. Noam Naiwny wysyła swoje tokeny na 0x06. Trafiają na adres `0x0000000000000000000000000de0b6b3a7640000`, a ponieważ nikt nie zna klucza prywatnego do tego adresu, po prostu tam utknęły. Noam _nie jest zadowolony_.

  Istnieją sposoby rozwiązania tego problemu i powiązanego z nim problemu transakcji znajdujących się w mempoolu podczas zmiany kolejności pamięci podręcznej, ale trzeba być tego świadomym.

Pokazałem tutaj buforowanie na przykładzie Optimism, ponieważ jestem pracownikiem Optimism i jest to pakiet zbiorczy, który znam najlepiej. Ale powinno to działać z każdym pakietem zbiorczym, który pobiera minimalny koszt za przetwarzanie wewnętrzne, tak że w porównaniu zapisywanie danych transakcji do L1 jest głównym wydatkiem.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).

