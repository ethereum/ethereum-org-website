---
title: "Wszystko, co możesz zbuforować"
description: "Dowiedz się, jak stworzyć i używać kontraktu buforującego dla tańszych transakcji w rollupach"
author: Ori Pomerantz
tags: ["warstwa 2", "caching", "przechowywanie", "skalowanie"]
skill: intermediate
breadcrumb: "Caching dla rollupów"
published: 2022-09-15
lang: pl
---

Podczas korzystania z rollupów koszt bajtu w transakcji jest znacznie wyższy niż koszt slotu przechowywania. Dlatego ma sens buforowanie (caching) jak największej ilości informacji onchain.

W tym artykule dowiesz się, jak stworzyć i używać kontraktu buforującego w taki sposób, aby każda wartość parametru, która prawdopodobnie zostanie użyta wielokrotnie, została zbuforowana i była gotowa do użycia (po pierwszym razie) przy użyciu znacznie mniejszej liczby bajtów, a także jak napisać kod pozałańcuchowy, który korzysta z tej pamięci podręcznej.

Jeśli chcesz pominąć artykuł i po prostu zobaczyć kod źródłowy, [znajdziesz go tutaj](https://github.com/qbzzt/20220915-all-you-can-cache). Stos technologiczny to [Foundry](https://getfoundry.sh/introduction/installation/).

## Ogólny projekt {#overall-design}

Dla uproszczenia założymy, że wszystkie parametry transakcji to `uint256`, o długości 32 bajtów. Kiedy otrzymamy transakcję, przeanalizujemy każdy parametr w następujący sposób:

1. Jeśli pierwszy bajt to `0xFF`, weź następne 32 bajty jako wartość parametru i zapisz ją w pamięci podręcznej.

2. Jeśli pierwszy bajt to `0xFE`, weź następne 32 bajty jako wartość parametru, ale _nie_ zapisuj jej w pamięci podręcznej.

3. Dla każdej innej wartości weź cztery najbardziej znaczące bity jako liczbę dodatkowych bajtów, a cztery najmniej znaczące bity jako najbardziej znaczące bity klucza pamięci podręcznej. Oto kilka przykładów:

   | Bajty w danych wywołania | Klucz pamięci podręcznej |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipulacja pamięcią podręczną {#cache-manipulation}

Pamięć podręczna jest zaimplementowana w [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Przeanalizujmy to linijka po linijce.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Te stałe są używane do interpretacji specjalnych przypadków, w których podajemy wszystkie informacje i chcemy, aby zostały zapisane w pamięci podręcznej lub nie. Zapis do pamięci podręcznej wymaga dwóch operacji [`SSTORE`](https://www.evm.codes/#55) w nieużywanych wcześniej slotach przechowywania, co kosztuje 22100 gazu za każdą, więc robimy to opcjonalnie.

```solidity

    mapping(uint => uint) public val2key;
```

[Mapowanie](https://www.geeksforgeeks.org/solidity/solidity-mappings/) między wartościami a ich kluczami. Ta informacja jest niezbędna do zakodowania wartości przed wysłaniem transakcji.

```solidity
    // Lokalizacja n ma wartość dla klucza n+1, ponieważ musimy zachować
    // zero jako "brak w pamięci podręcznej".
    uint[] public key2val;
```

Możemy użyć tablicy do mapowania z kluczy na wartości, ponieważ to my przypisujemy klucze, a dla uproszczenia robimy to sekwencyjnie.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Odczytaj wartość z pamięci podręcznej.

```solidity
    // Zapisz wartość w pamięci podręcznej, jeśli jeszcze jej tam nie ma
    // Tylko publiczne, aby umożliwić działanie testu
    function cacheWrite(uint _value) public returns (uint) {
        // Jeśli wartość jest już w pamięci podręcznej, zwróć bieżący klucz
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Nie ma sensu umieszczać tej samej wartości w pamięci podręcznej więcej niż raz. Jeśli wartość już tam jest, po prostu zwróć istniejący klucz.

```solidity
        // Ponieważ 0xFE jest przypadkiem szczególnym, największy klucz, jaki może
        // pomieścić pamięć podręczna, to 0x0D, po którym następuje 15 0xFF. Jeśli długość pamięci podręcznej jest już tak
        // duża, zakończ niepowodzeniem.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Nie sądzę, byśmy kiedykolwiek uzyskali tak dużą pamięć podręczną (około 1.8\*10<sup>37</sup> wpisów, co wymagałoby około 10<sup>27</sup> TB do przechowania). Jednak jestem wystarczająco stary, by pamiętać, że [„640kB zawsze wystarczy”](https://quoteinvestigator.com/2011/09/08/640k-enough/). Ten test jest bardzo tani.

```solidity
        // Zapisz wartość używając następnego klucza
        val2key[_value] = key2val.length+1;
```

Dodaj odwrotne wyszukiwanie (od wartości do klucza).

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

Ta funkcja odczytuje wartość z danych wywołania o dowolnej długości (do 32 bajtów, rozmiar słowa).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Ta funkcja jest wewnętrzna, więc jeśli reszta kodu jest napisana poprawnie, te testy nie są wymagane. Jednak nie kosztują one wiele, więc równie dobrze możemy je mieć.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ten kod jest w [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Odczytuje 32-bajtową wartość z danych wywołania. Działa to nawet wtedy, gdy dane wywołania kończą się przed `startByte+32`, ponieważ niezainicjowana przestrzeń w EVM jest uważana za zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Niekoniecznie chcemy 32-bajtowej wartości. To pozbywa się nadmiarowych bajtów.

```solidity
        return _retVal;
    } // _calldataVal


    // Odczytaj pojedynczy parametr z danych wywołania, zaczynając od _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Odczytaj pojedynczy parametr z danych wywołania. Zauważ, że musimy zwrócić nie tylko odczytaną wartość, ale także lokalizację następnego bajtu, ponieważ parametry mogą mieć długość od 1 bajtu do 33 bajtów.

```solidity
        // Pierwszy bajt mówi nam, jak zinterpretować resztę
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity próbuje zmniejszyć liczbę błędów, zabraniając potencjalnie niebezpiecznych [niejawnych konwersji typów](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). Zmniejszenie rozmiaru, na przykład z 256 bitów do 8 bitów, musi być jawne.

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

        // Jeśli tu dotarliśmy, oznacza to, że musimy odczytać z pamięci podręcznej

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

Moglibyśmy uzyskać liczbę parametrów z samych danych wywołania, ale funkcje, które nas wywołują, wiedzą, ilu parametrów oczekują. Łatwiej jest pozwolić im nam to powiedzieć.

```solidity
        // Odczytane przez nas parametry
        uint[] memory params = new uint[](_paramNum);

        // Parametry zaczynają się od bajtu 4, wcześniej znajduje się sygnatura funkcji
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Odczytuj parametry, aż uzyskasz potrzebną liczbę. Jeśli wyjdziemy poza koniec danych wywołania, `_readParams` spowoduje wycofanie wywołania.

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

Jedną z dużych zalet Foundry jest to, że pozwala na pisanie testów w Solidity ([zobacz Testowanie pamięci podręcznej poniżej](#testing-the-cache)). To znacznie ułatwia testy jednostkowe. Jest to funkcja, która odczytuje cztery parametry i zwraca je, aby test mógł zweryfikować, czy były poprawne.

```solidity
    // Pobierz wartość, zwróć bajty, które ją zakodują (używając pamięci podręcznej, jeśli to możliwe)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` to funkcja, którą wywołuje kod pozałańcuchowy, aby pomóc w tworzeniu danych wywołania korzystających z pamięci podręcznej. Otrzymuje pojedynczą wartość i zwraca bajty, które ją kodują. Ta funkcja to `view`, więc nie wymaga transakcji, a wywołana z zewnątrz nie kosztuje żadnego gazu.

```solidity
        uint _key = val2key[_val];

        // Wartości nie ma jeszcze w pamięci podręcznej, dodaj ją
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

W [EVM](/developers/docs/evm/) zakłada się, że całe niezainicjowane przechowywanie to zera. Więc jeśli szukamy klucza dla wartości, której tam nie ma, otrzymujemy zero. W takim przypadku bajty, które ją kodują, to `INTO_CACHE` (więc zostanie zbuforowana następnym razem), a po nich następuje rzeczywista wartość.

```solidity
        // Jeśli klucz to <0x10, zwróć go jako pojedynczy bajt
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Pojedyncze bajty są najprostsze. Po prostu używamy [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat), aby zamienić typ `bytes<n>` w tablicę bajtów, która może mieć dowolną długość. Mimo nazwy, działa to świetnie, gdy podamy tylko jeden argument.

```solidity
        // Wartość dwubajtowa, zakodowana jako 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Kiedy mamy klucz mniejszy niż 16<sup>3</sup>, możemy go wyrazić w dwóch bajtach. Najpierw konwertujemy `_key`, który jest wartością 256-bitową, na wartość 16-bitową i używamy logicznego OR, aby dodać liczbę dodatkowych bajtów do pierwszego bajtu. Następnie po prostu rzutujemy to na wartość `bytes2`, którą można przekonwertować na `bytes`.

```solidity
        // Prawdopodobnie istnieje sprytny sposób na wykonanie poniższych wierszy jako pętli,
        // ale jest to funkcja view, więc optymalizuję pod kątem czasu programisty i
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

Pozostałe wartości (3 bajty, 4 bajty itd.) są obsługiwane w ten sam sposób, tylko z różnymi rozmiarami pól.

```solidity
        // Jeśli tu dotarliśmy, coś jest nie tak.
        revert("Error in encodeVal, should not happen");
```

Jeśli tu dotrzemy, oznacza to, że otrzymaliśmy klucz, który nie jest mniejszy niż 16\*256<sup>15</sup>. Ale `cacheWrite` ogranicza klucze, więc nie możemy nawet dojść do 14\*256<sup>16</sup> (co miałoby pierwszy bajt 0xFE, więc wyglądałoby jak `DONT_CACHE`). Ale nie kosztuje nas wiele dodanie testu na wypadek, gdyby przyszły programista wprowadził błąd.

```solidity
    } // encodeVal

}  // Cache
```

### Testowanie pamięci podręcznej {#testing-the-cache}

Jedną z zalet Foundry jest to, że [pozwala pisać testy w Solidity](https://getfoundry.sh/forge/tests/overview/), co ułatwia pisanie testów jednostkowych. Testy dla klasy `Cache` znajdują się [tutaj](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Ponieważ kod testujący jest powtarzalny, jak to zwykle bywa z testami, ten artykuł wyjaśnia tylko interesujące części.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Należy uruchomić `forge test -vv` dla konsoli.
import "forge-std/console.sol";
```

To tylko kod szablonowy (boilerplate), który jest niezbędny do korzystania z pakietu testowego i `console.log`.

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

Testy to funkcje, których nazwy zaczynają się od `test`. Ta funkcja sprawdza podstawową funkcjonalność pamięci podręcznej, zapisując wartości i odczytując je ponownie.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Tak przeprowadza się właściwe testowanie, używając [funkcji `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). W tym przypadku sprawdzamy, czy zapisana wartość jest tą, którą odczytaliśmy. Możemy odrzucić wynik `cache.cacheWrite`, ponieważ wiemy, że klucze pamięci podręcznej są przypisywane liniowo.

```solidity
        }
    }    // testCaching


    // Zapisz tę samą wartość w pamięci podręcznej wiele razy, upewnij się, że klucz pozostaje
    // taki sam
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Najpierw zapisujemy każdą wartość dwukrotnie w pamięci podręcznej i upewniamy się, że klucze są takie same (co oznacza, że drugi zapis tak naprawdę się nie odbył).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

W teorii mógłby istnieć błąd, który nie wpływa na kolejne zapisy w pamięci podręcznej. Więc tutaj wykonujemy kilka zapisów, które nie są po kolei, i sprawdzamy, czy wartości nadal nie są nadpisywane.

```solidity
    // Odczytaj uint z bufora pamięci (aby upewnić się, że otrzymujemy z powrotem parametry,
    // które wysłaliśmy)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Odczytaj 256-bitowe słowo z bufora `bytes memory`. Ta funkcja pomocnicza pozwala nam zweryfikować, czy otrzymujemy poprawne wyniki, gdy uruchamiamy wywołanie funkcji korzystającej z pamięci podręcznej.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul nie obsługuje struktur danych poza `uint256`, więc kiedy odwołujesz się do bardziej zaawansowanej struktury danych, takiej jak bufor pamięci `_bytes`, otrzymujesz adres tej struktury. Solidity przechowuje wartości `bytes memory` jako 32-bajtowe słowo zawierające długość, po którym następują rzeczywiste bajty, więc aby uzyskać bajt numer `_start`, musimy obliczyć `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Sygnatura funkcji dla fourParams(), dzięki uprzejmości
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Tylko kilka stałych wartości, aby sprawdzić, czy otrzymujemy z powrotem poprawne wartości
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Kilka stałych, których potrzebujemy do testowania.

```solidity
    function testReadParam() public {
```

Wywołaj `fourParams()`, funkcję, która używa `readParams`, aby przetestować, czy możemy poprawnie odczytać parametry.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Nie możemy użyć normalnego mechanizmu ABI do wywołania funkcji korzystającej z pamięci podręcznej, więc musimy użyć niskopoziomowego mechanizmu [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Ten mechanizm przyjmuje `bytes memory` jako wejście i zwraca to samo (a także wartość logiczną) jako wyjście.

```solidity
        // Pierwsze wywołanie, pamięć podręczna jest pusta
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Przydatne jest, aby ten sam kontrakt obsługiwał zarówno funkcje buforowane (dla wywołań bezpośrednio z transakcji), jak i niebuforowane (dla wywołań z innych inteligentnych kontraktów). Aby to zrobić, musimy nadal polegać na mechanizmie Solidity do wywoływania odpowiedniej funkcji, zamiast umieszczać wszystko w [funkcji `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Takie podejście znacznie ułatwia kompozycyjność. W większości przypadków pojedynczy bajt wystarczyłby do zidentyfikowania funkcji, więc marnujemy trzy bajty (16\*3=48 gazu). Jednak w momencie pisania tego tekstu te 48 gazu kosztuje 0,07 centa, co jest rozsądnym kosztem za prostszy, mniej podatny na błędy kod.

```solidity
            // Pierwsza wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Pierwsza wartość: Flaga mówiąca, że jest to pełna wartość, która musi zostać zapisana w pamięci podręcznej, po której następuje 32 bajty wartości. Pozostałe trzy wartości są podobne, z tą różnicą, że `VAL_B` nie jest zapisywana w pamięci podręcznej, a `VAL_C` jest zarówno trzecim, jak i czwartym parametrem.

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

Oczekujemy, że wywołanie zakończy się sukcesem.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Zaczynamy od pustej pamięci podręcznej, a następnie dodajemy `VAL_A`, a po nim `VAL_C`. Oczekujemy, że pierwsza z nich będzie miała klucz 1, a druga 2.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Wyjściem są cztery parametry. Tutaj weryfikujemy, czy jest poprawne.

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

Testy po wywołaniu są identyczne z tymi po pierwszym wywołaniu.

```solidity
    function testEncodeVal() public {
```

Ta funkcja jest podobna do `testReadParam`, z tą różnicą, że zamiast jawnie zapisywać parametry, używamy `encodeVal()`.

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

Jedynym dodatkowym testem w `testEncodeVal()` jest weryfikacja, czy długość `_callInput` jest poprawna. Dla pierwszego wywołania wynosi ona 4+33\*4. Dla drugiego, gdzie każda wartość jest już w pamięci podręcznej, wynosi 4+1\*4.

```solidity
    // Przetestuj encodeVal, gdy klucz ma więcej niż jeden bajt
    // Maksymalnie trzy bajty, ponieważ wypełnienie pamięci podręcznej do czterech bajtów zajmuje
    // zbyt dużo czasu.
    function testEncodeValBig() public {
        // Umieść kilka wartości w pamięci podręcznej.
        // Aby uprościć sprawę, użyj klucza n dla wartości n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Powyższa funkcja `testEncodeVal` zapisuje tylko cztery wartości w pamięci podręcznej, więc [część funkcji zajmująca się wartościami wielobajtowymi](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) nie jest sprawdzana. Ale ten kod jest skomplikowany i podatny na błędy.

Pierwsza część tej funkcji to pętla, która zapisuje wszystkie wartości od 1 do 0x1FFF w pamięci podręcznej w kolejności, dzięki czemu będziemy w stanie zakodować te wartości i wiedzieć, dokąd trafiają.

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

Przetestuj wartości jedno-, dwu- i trzybajtowe. Nie testujemy dalej, ponieważ zapisanie wystarczającej liczby wpisów na stosie zajęłoby zbyt dużo czasu (co najmniej 0x10000000, czyli około ćwierć miliarda).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Przetestuj, czy przy zbyt małym buforze otrzymamy wycofanie
    function testShortCalldata() public {
```

Przetestuj, co się dzieje w nietypowym przypadku, gdy nie ma wystarczającej liczby parametrów.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Ponieważ następuje wycofanie, wynikiem, który powinniśmy otrzymać, jest `false`.

```
// Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Pierwsza wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Ta funkcja otrzymuje cztery całkowicie poprawne parametry, z tą różnicą, że pamięć podręczna jest pusta, więc nie ma tam żadnych wartości do odczytania.

```solidity
        .
        .
        .
    // Przetestuj, czy przy zbyt długim buforze wszystko działa poprawnie
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Pierwsze wywołanie, pamięć podręczna jest pusta
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Druga wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Trzecia wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Czwarta wartość, dodaj ją do pamięci podręcznej
            cache.INTO_CACHE(), bytes32(VAL_D),

            // I jeszcze jedna wartość na "szczęście"
            bytes4(0x31112233)
        );
```

Ta funkcja wysyła pięć wartości. Wiemy, że piąta wartość jest ignorowana, ponieważ nie jest prawidłowym wpisem w pamięci podręcznej, co spowodowałoby wycofanie, gdyby nie została uwzględniona.

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

Pisanie testów w Solidity jest bardzo dobre, ale ostatecznie zdecentralizowana aplikacja (dapp) musi być w stanie przetwarzać żądania spoza łańcucha, aby była użyteczna. Ten artykuł demonstruje, jak używać pamięci podręcznej w dapp z `WORM`, co oznacza „Write Once, Read Many” (Zapisz raz, czytaj wiele razy). Jeśli klucz nie jest jeszcze zapisany, możesz zapisać do niego wartość. Jeśli klucz jest już zapisany, następuje wycofanie.

### Kontrakt {#the-contract}

[Oto kontrakt](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). W większości powtarza to, co już zrobiliśmy z `Cache` i `CacheTest`, więc omówimy tylko interesujące części.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Najprostszym sposobem na użycie `Cache` jest odziedziczenie go w naszym własnym kontrakcie.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Ta funkcja jest podobna do `fourParam` w `CacheTest` powyżej. Ponieważ nie przestrzegamy specyfikacji ABI, najlepiej nie deklarować żadnych parametrów w funkcji.

```solidity
    // Ułatw wywoływanie nas
    // Sygnatura funkcji dla writeEntryCached(), dzięki uprzejmości
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Zewnętrzny kod, który wywołuje `writeEntryCached`, będzie musiał ręcznie zbudować dane wywołania, zamiast używać `worm.writeEntryCached`, ponieważ nie przestrzegamy specyfikacji ABI. Posiadanie tej stałej wartości po prostu ułatwia jej napisanie.

Zauważ, że chociaż definiujemy `WRITE_ENTRY_CACHED` jako zmienną stanu, aby odczytać ją z zewnątrz, konieczne jest użycie dla niej funkcji pobierającej (getter), `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Funkcja odczytu to `view`, więc nie wymaga transakcji i nie kosztuje gazu. W rezultacie nie ma korzyści z używania pamięci podręcznej dla parametru. W przypadku funkcji widoku (view functions) najlepiej jest użyć standardowego mechanizmu, który jest prostszy.

### Kod testujący {#the-testing-code}

[Oto kod testujący dla kontraktu](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Ponownie, spójrzmy tylko na to, co interesujące.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[W ten sposób (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) określamy w teście Foundry, że następne wywołanie powinno się nie powieść, oraz zgłaszaną przyczynę niepowodzenia. Ma to zastosowanie, gdy używamy składni `<contract>.<function name>()` zamiast budowania danych wywołania i wywoływania kontraktu za pomocą interfejsu niskopoziomowego (`<contract>.call()` itp.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Tutaj wykorzystujemy fakt, że `cacheWrite` zwraca klucz pamięci podręcznej. Nie jest to coś, czego spodziewalibyśmy się użyć w produkcji, ponieważ `cacheWrite` zmienia stan, a zatem może być wywołane tylko podczas transakcji. Transakcje nie mają wartości zwracanych; jeśli mają wyniki, te wyniki powinny być emitowane jako zdarzenia. Zatem wartość zwracana przez `cacheWrite` jest dostępna tylko z kodu onchain, a kod onchain nie potrzebuje buforowania parametrów.

```solidity
        (_success,) = address(worm).call(_callInput);
```

W ten sposób mówimy Solidity, że chociaż `<contract address>.call()` ma dwie wartości zwracane, zależy nam tylko na pierwszej.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Ponieważ używamy niskopoziomowej funkcji `<address>.call()`, nie możemy użyć `vm.expectRevert()` i musimy spojrzeć na logiczną wartość sukcesu, którą otrzymujemy z wywołania.

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

W ten sposób weryfikujemy, czy kod [poprawnie emituje zdarzenie](https://getfoundry.sh/reference/cheatcodes/expect-emit/) w Foundry.

### Klient {#the-client}

Jedną rzeczą, której nie uzyskasz dzięki testom w Solidity, jest kod w JavaScript, który możesz skopiować i wkleić do własnej aplikacji. Oryginalna wersja tego samouczka wdrażała WORM w sieci Optimism Goerli, która od tego czasu została wycofana. Aby dzisiaj uruchomić klienta, ponownie wdróż WORM w obsługiwanej sieci OP Stack, takiej jak [OP Sepolia](https://docs.optimism.io/op-stack/introduction/op-stack), a następnie użyj wynikowego adresu kontraktu w kliencie JavaScript.

[Kod JavaScript dla klienta można zobaczyć tutaj](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Przykładowe repozytorium zostało napisane dla Optimism Goerli, więc przed jego uruchomieniem zaktualizuj punkt końcowy RPC i adresy URL eksploratora w plikach `javascript/.env.example` oraz `javascript/index.js` dla swojej docelowej sieci. Aby z niego skorzystać:

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

4. Edytuj plik `.env` zgodnie ze swoją konfiguracją:

   | Parametr            | Wartość                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | Fraza mnemoniczna dla konta, które ma wystarczająco dużo ETH, aby zapłacić za transakcję. [Dokumentacja kraników Optimism](https://docs.optimism.io/app-developers/tools/faucets) zawiera listę aktualnych kraników dla sieci testowej. |
   | OPTIMISM_GOERLI_URL | Adres URL RPC dla sieci, w której ponownie wdrażasz WORM. W przypadku OP Sepolia użyj punktu końcowego RPC dla OP Sepolia, takiego jak `https://sepolia.optimism.io`, lub innego punktu końcowego od Twojego dostawcy.        |

5. Uruchom `index.js`.

   ```sh
   node index.js
   ```

   Ta przykładowa aplikacja najpierw zapisuje wpis w WORM, wyświetlając dane wywołania i link do transakcji w eksploratorze bloków. Następnie odczytuje ten wpis i wyświetla używany klucz oraz wartości w nim zawarte (wartość, numer bloku i autora).

Większość klienta to standardowy kod JavaScript dla zdecentralizowanej aplikacji (dapp). Dlatego ponownie omówimy tylko interesujące części.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Za każdym razem potrzebny jest nowy klucz
    const key = await worm.encodeVal(Number(new Date()))
```

Do danego slotu można zapisać tylko raz, więc używamy znacznika czasu, aby upewnić się, że nie używamy ponownie tych samych slotów.

```javascript
const val = await worm.encodeVal("0x600D")

// Zapisz wpis
const calldata = func + key.slice(2) + val.slice(2)
```

Biblioteka Ethers oczekuje, że dane wywołania będą ciągiem szesnastkowym, czyli `0x`, po którym następuje parzysta liczba cyfr szesnastkowych. Ponieważ zarówno `key`, jak i `val` zaczynają się od `0x`, musimy usunąć te nagłówki.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Podobnie jak w kodzie testującym w Solidity, nie możemy normalnie wywołać funkcji korzystającej z pamięci podręcznej. Zamiast tego musimy użyć mechanizmu niższego poziomu.

```javascript
    .
    .
    .
    // Odczytaj nowo zapisany wpis
    const realKey = '0x' + key.slice(4)  // usuń flagę FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Do odczytywania wpisów możemy użyć standardowego mechanizmu. Nie ma potrzeby używania buforowania parametrów w przypadku funkcji `view`.
## Podsumowanie {#conclusion}

Kod w tym artykule to dowód słuszności koncepcji (proof of concept), a jego celem jest ułatwienie zrozumienia pomysłu. W przypadku systemu gotowego do produkcji możesz chcieć zaimplementować dodatkową funkcjonalność:

- Obsługa wartości, które nie są `uint256`. Na przykład ciągi znaków (strings).
- Zamiast globalnej pamięci podręcznej, być może mapowanie między użytkownikami a pamięciami podręcznymi. Różni użytkownicy używają różnych wartości.
- Wartości używane dla adresów różnią się od tych używanych do innych celów. Może mieć sens posiadanie oddzielnej pamięci podręcznej tylko dla adresów.
- Obecnie klucze pamięci podręcznej opierają się na algorytmie „kto pierwszy, ten ma najmniejszy klucz”. Pierwsze szesnaście wartości można wysłać jako pojedynczy bajt. Następne 4080 wartości można wysłać jako dwa bajty. Kolejny około milion wartości to trzy bajty itd. System produkcyjny powinien prowadzić liczniki użycia wpisów w pamięci podręcznej i reorganizować je tak, aby szesnaście _najczęstszych_ wartości zajmowało jeden bajt, kolejne 4080 najczęstszych wartości dwa bajty itd.

  Jednak jest to potencjalnie niebezpieczna operacja. Wyobraź sobie następującą sekwencję zdarzeń:

  1. Naiwny Noam wywołuje `encodeVal`, aby zakodować adres, na który chce wysłać tokeny. Ten adres jest jednym z pierwszych użytych w aplikacji, więc zakodowana wartość to 0x06. Jest to funkcja `view`, a nie transakcja, więc odbywa się to między Noamem a węzłem, z którego korzysta, i nikt inny o tym nie wie.

  2. Właściciel Owen uruchamia operację zmiany kolejności w pamięci podręcznej. Bardzo niewiele osób faktycznie używa tego adresu, więc jest on teraz zakodowany jako 0x201122. Innej wartości, 10<sup>18</sup>, przypisano 0x06.

  3. Naiwny Noam wysyła swoje tokeny na 0x06. Trafiają one na adres `0x0000000000000000000000000de0b6b3a7640000`, a ponieważ nikt nie zna klucza prywatnego dla tego adresu, po prostu tam utknęły. Noam _nie jest zadowolony_.

  Istnieją sposoby na rozwiązanie tego problemu, a także powiązanego problemu transakcji, które znajdują się w mempoolu podczas zmiany kolejności w pamięci podręcznej, ale musisz być tego świadomy.

Zademonstrowałem tutaj buforowanie z Optimism, ponieważ jestem pracownikiem Optimism i jest to rollup, który znam najlepiej. Ale powinno to działać z każdym rollupem, który pobiera minimalne opłaty za wewnętrzne przetwarzanie, tak że w porównaniu z tym zapisywanie danych transakcji na L1 jest głównym wydatkiem.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).
