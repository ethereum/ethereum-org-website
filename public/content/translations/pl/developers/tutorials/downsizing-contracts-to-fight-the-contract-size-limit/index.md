---
title: "Zmniejszanie kontraktów w celu walki z limitem rozmiaru kontraktu"
description: "Co możesz zrobić, aby zapobiec nadmiernemu rozrostowi swoich inteligentnych kontraktów?"
author: Markus Waas
lang: pl
tags: ["Solidity", "inteligentne kontrakty", "przechowywanie"]
skill: intermediate
breadcrumb: "Zmniejszanie kontraktów"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Dlaczego istnieje limit? {#why-is-there-a-limit}

[22 listopada 2016 r.](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) twarde rozwidlenie Spurious Dragon wprowadziło [EIP-170](https://eips.ethereum.org/EIPS/eip-170), które dodało limit rozmiaru inteligentnego kontraktu wynoszący 24 576 bajtów (24 KiB). Dla Ciebie jako programisty Solidity oznacza to, że gdy dodajesz coraz więcej funkcjonalności do swojego kontraktu, w pewnym momencie osiągniesz limit, a kompilator ostrzeże Cię:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Istnieje podobne ostrzeżenie dla kodu wdrożenia (initcode), który [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) ograniczył do 49 152 bajtów w aktualizacji Szanghaj.

Limit ten nie jest stały. [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) podnosi go do 65 536 bajtów (64 KiB), a limit initcode do 131 072 bajtów, i jest to zaplanowane w [aktualizacji Glamsterdam](/roadmap/glamsterdam/). Dopóki ta aktualizacja nie zostanie aktywowana w sieci, w której wdrażasz, limit wynosi tam 24 576 bajtów, a nawet po niej mniejsze kontrakty pozostają tańsze we wdrożeniu i łatwiejsze do audytu.

Ten limit został wprowadzony, aby zapobiec atakom typu odmowa usługi (DOS). Każde wywołanie kontraktu jest stosunkowo tanie pod względem gazu. Jednak wpływ wywołania kontraktu na węzły Ethereum rośnie nieproporcjonalnie w zależności od rozmiaru wywoływanego kodu kontraktu (odczyt kodu z dysku, wstępne przetwarzanie kodu, dodawanie danych do dowodu Merkle'a). Zawsze, gdy masz do czynienia z sytuacją, w której atakujący wymaga niewielu zasobów, aby spowodować dużo pracy dla innych, pojawia się potencjał do ataków DOS.

Początkowo było to mniejszym problemem, ponieważ jednym z naturalnych limitów rozmiaru kontraktu jest limit gazu w bloku. Oczywiście kontrakt musi zostać wdrożony w ramach transakcji, która zawiera cały kod bajtowy kontraktu. Jeśli uwzględnisz tylko tę jedną transakcję w bloku, możesz zużyć cały ten gaz, ale nie jest on nieskończony. Obecnie limit gazu w bloku wynosi dziesiątki milionów gazu i był kilkakrotnie podnoszony przez walidatorów, więc sam w sobie pozwalałby na bardzo duże kontrakty. Od czasu [aktualizacji Fusaka](/roadmap/fusaka/), pojedyncza transakcja jest również ograniczona do 16 777 216 gazu ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), ale to wciąż znacznie powyżej kosztów wdrożenia kontraktu o rozmiarze 24 KiB, dlatego potrzebny jest wyraźny limit rozmiaru.

W dalszej części przyjrzymy się niektórym metodom uporządkowanym według ich potencjalnego wpływu. Pomyśl o tym w kategoriach utraty wagi. Najlepszą strategią dla kogoś, kto chce osiągnąć swoją docelową wagę (w naszym przypadku 24 kb), jest skupienie się najpierw na metodach o dużym wpływie. W większości przypadków samo naprawienie diety pozwoli Ci to osiągnąć, ale czasami potrzebujesz trochę więcej. Wtedy możesz dodać trochę ćwiczeń (średni wpływ) lub nawet suplementy (mały wpływ).

## Duży wpływ {#big-impact}

### Rozdziel swoje kontrakty {#separate-your-contracts}

To zawsze powinno być Twoje pierwsze podejście. Jak możesz rozdzielić kontrakt na kilka mniejszych? Zazwyczaj zmusza to do wymyślenia dobrej architektury dla Twoich kontraktów. Mniejsze kontrakty są zawsze preferowane z perspektywy czytelności kodu. Przy dzieleniu kontraktów zadaj sobie następujące pytania:

- Które funkcje do siebie pasują? Każdy zestaw funkcji może najlepiej sprawdzić się we własnym kontrakcie.
- Które funkcje nie wymagają odczytywania stanu kontraktu lub tylko jego określonego podzbioru?
- Czy możesz rozdzielić przechowywanie danych i funkcjonalność?

### Biblioteki {#libraries}

Jednym z prostych sposobów na oddzielenie kodu funkcjonalności od przechowywania danych jest użycie [biblioteki](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Nie deklaruj funkcji biblioteki jako wewnętrznych (internal), ponieważ zostaną one [dodane do kontraktu](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) bezpośrednio podczas kompilacji. Jeśli jednak użyjesz funkcji publicznych, będą one w rzeczywistości znajdować się w oddzielnym kontrakcie biblioteki. Rozważ zastosowanie dyrektywy [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for), aby korzystanie z bibliotek było wygodniejsze.

### Proxy {#proxies}

Bardziej zaawansowaną strategią byłby system proxy. Biblioteki używają w tle `DELEGATECALL`, co po prostu wykonuje funkcję innego kontraktu ze stanem kontraktu wywołującego. Sprawdź [aktualizację inteligentnych kontraktów](/developers/docs/smart-contracts/upgrading/), aby dowiedzieć się więcej o systemach proxy. Dają one więcej funkcjonalności, np. umożliwiają aktualizację, ale dodają również wiele złożoności. Nie dodawałbym ich tylko po to, aby zmniejszyć rozmiar kontraktu, chyba że z jakiegoś powodu jest to Twoja jedyna opcja.

## Średni wpływ {#medium-impact}

### Usuń funkcje {#remove-functions}

To powinno być oczywiste. Funkcje znacznie zwiększają rozmiar kontraktu.

- **Zewnętrzne (External)**: Często dodajemy wiele funkcji widoku (view) dla wygody. Jest to całkowicie w porządku, dopóki nie osiągniesz limitu rozmiaru. Wtedy warto naprawdę zastanowić się nad usunięciem wszystkich poza absolutnie niezbędnymi.
- **Wewnętrzne (Internal)**: Możesz również usunąć funkcje wewnętrzne/prywatne i po prostu wstawić ich kod bezpośrednio (inline), o ile funkcja jest wywoływana tylko raz.

### Unikaj dodatkowych zmiennych {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Taka prosta zmiana zrobiła różnicę **0,28 kb** w momencie pisania tego artykułu. Dokładne oszczędności zależą od wersji kompilatora i ustawień (w Solidity 0.8.37 jest to około 0,1 kb bez optymalizatora i znacznie mniej z nim), więc zawsze mierz. Istnieje duża szansa, że znajdziesz wiele podobnych sytuacji w swoich kontraktach, a te mogą naprawdę zsumować się do znaczących wartości.

### Skróć wiadomości o błędach {#shorten-error-message}

Długie wiadomości o wycofaniu (revert), a w szczególności wiele różnych wiadomości o wycofaniu, może niepotrzebnie rozdmuchać kontrakt. Zamiast tego używaj krótkich kodów błędów i dekoduj je w swoim kontrakcie. Długa wiadomość może stać się znacznie krótsza:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Używaj niestandardowych błędów zamiast wiadomości o błędach {#use-custom-errors-instead-of-error-messages}

Niestandardowe błędy zostały wprowadzone w [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Są one świetnym sposobem na zmniejszenie rozmiaru Twoich kontraktów, ponieważ są kodowane w ABI jako selektory (podobnie jak funkcje).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Rozważ niską wartość przebiegów (runs) w optymalizatorze {#consider-a-low-run-value-in-the-optimizer}

Możesz również zmienić ustawienia optymalizatora. Domyślna wartość 200 oznacza, że próbuje on zoptymalizować kod bajtowy tak, jakby funkcja była wywoływana 200 razy. Jeśli zmienisz ją na 1, w zasadzie mówisz optymalizatorowi, aby optymalizował pod kątem uruchomienia każdej funkcji tylko raz. Zoptymalizowana funkcja do uruchomienia tylko raz oznacza, że jest zoptymalizowana pod kątem samego wdrożenia. Pamiętaj, że **zwiększa to [koszty gazu](/developers/docs/gas/) za uruchamianie funkcji**, więc możesz nie chcieć tego robić. Jeśli kompilujesz z włączonym `viaIR`, sprawdź rozmiar z nim i bez niego, ponieważ generator kodu oparty na IR może generować zauważalnie różne rozmiary kodu bajtowego. Zobacz [opcje optymalizatora](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options), aby uzyskać szczegółowe informacje.

## Mały wpływ {#small-impact}

### Unikaj przekazywania struktur do funkcji {#avoid-passing-structs-to-functions}

Jeśli używasz [ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (domyślne od Solidity 0.8.0), może pomóc nieprzekazywanie struktur do funkcji. Zamiast przekazywać parametr jako strukturę, przekaż wymagane parametry bezpośrednio. W tym przykładzie zaoszczędziliśmy kolejne **0,1 kb**.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Deklaruj poprawną widoczność dla funkcji i zmiennych {#declare-correct-visibility-for-functions-and-variables}

- Funkcje lub zmienne, które są wywoływane tylko z zewnątrz? Zadeklaruj je jako `external` zamiast `public`.
- Funkcje lub zmienne wywoływane tylko z wnętrza kontraktu? Zadeklaruj je jako `private` lub `internal` zamiast `public`.

### Usuń modyfikatory {#remove-modifiers}

Modyfikatory, zwłaszcza gdy są intensywnie używane, mogą mieć znaczący wpływ na rozmiar kontraktu. Rozważ ich usunięcie i zamiast tego użyj funkcji.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Te wskazówki powinny pomóc Ci znacznie zmniejszyć rozmiar kontraktu. Jeszcze raz nie mogę wystarczająco podkreślić: zawsze skupiaj się na dzieleniu kontraktów, jeśli to możliwe, aby uzyskać największy wpływ.
