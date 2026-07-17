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

Dnia [22 listopada 2016 r.](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) twarde rozwidlenie (hard fork) Spurious Dragon wprowadziło [EIP-170](https://eips.ethereum.org/EIPS/eip-170), które dodało limit rozmiaru inteligentnego kontraktu wynoszący 24,576 kb. Dla Ciebie jako programisty Solidity oznacza to, że gdy dodajesz coraz więcej funkcjonalności do swojego kontraktu, w pewnym momencie osiągniesz ten limit i podczas wdrażania zobaczysz błąd:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Limit ten został wprowadzony, aby zapobiec atakom typu odmowa usługi (DOS). Każde wywołanie kontraktu jest stosunkowo tanie pod względem gazu. Jednak wpływ wywołania kontraktu na węzły Ethereum rośnie nieproporcjonalnie w zależności od rozmiaru kodu wywoływanego kontraktu (odczyt kodu z dysku, wstępne przetwarzanie kodu, dodawanie danych do dowodu Merkle'a). Zawsze, gdy masz do czynienia z sytuacją, w której atakujący potrzebuje niewielu zasobów, aby spowodować dużo pracy dla innych, pojawia się potencjał do ataków DOS.

Początkowo było to mniejszym problemem, ponieważ jednym z naturalnych limitów rozmiaru kontraktu jest limit gazu bloku. Oczywiście kontrakt musi zostać wdrożony w ramach transakcji, która zawiera cały kod bajtowy kontraktu. Jeśli dołączysz tylko tę jedną transakcję do bloku, możesz zużyć cały ten gaz, ale nie jest on nieskończony. Od czasu [aktualizacji London](/ethereum-forks/#london), limit gazu bloku może wahać się od 15 do 30 milionów jednostek w zależności od zapotrzebowania sieci.

Poniżej przyjrzymy się kilku metodom uporządkowanym według ich potencjalnego wpływu. Pomyśl o tym w kategoriach utraty wagi. Najlepsza strategia dla kogoś, kto chce osiągnąć swoją docelową wagę (w naszym przypadku 24 kb), to skupienie się najpierw na metodach o dużym wpływie. W większości przypadków samo naprawienie diety pozwoli Ci to osiągnąć, ale czasami potrzebujesz czegoś więcej. Wtedy możesz dodać trochę ćwiczeń (średni wpływ) lub nawet suplementy (mały wpływ).

## Duży wpływ {#big-impact}

### Rozdziel swoje kontrakty {#separate-your-contracts}

To zawsze powinno być Twoje pierwsze podejście. Jak możesz rozdzielić kontrakt na kilka mniejszych? Zazwyczaj zmusza to do wymyślenia dobrej architektury dla Twoich kontraktów. Mniejsze kontrakty są zawsze preferowane z perspektywy czytelności kodu. Przy dzieleniu kontraktów zadaj sobie następujące pytania:

- Które funkcje do siebie pasują? Każdy zestaw funkcji może najlepiej sprawdzić się we własnym kontrakcie.
- Które funkcje nie wymagają odczytywania stanu kontraktu lub tylko jego określonego podzbioru?
- Czy możesz rozdzielić przechowywanie danych i funkcjonalność?

### Biblioteki {#libraries}

Jednym z prostych sposobów na oddzielenie kodu funkcjonalności od przechowywania danych jest użycie [biblioteki](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Nie deklaruj funkcji biblioteki jako wewnętrznych (internal), ponieważ zostaną one [dodane do kontraktu](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) bezpośrednio podczas kompilacji. Jeśli jednak użyjesz funkcji publicznych, będą one w rzeczywistości znajdować się w oddzielnym kontrakcie biblioteki. Rozważ zastosowanie dyrektywy [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for), aby korzystanie z bibliotek było wygodniejsze.

### Proxy {#proxies}

Bardziej zaawansowaną strategią byłby system proxy. Biblioteki używają w tle `DELEGATECALL`, co po prostu wykonuje funkcję innego kontraktu ze stanem kontraktu wywołującego. Sprawdź [ten wpis na blogu](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2), aby dowiedzieć się więcej o systemach proxy. Dają one więcej funkcjonalności, np. umożliwiają aktualizacje, ale dodają również wiele złożoności. Nie dodawałbym ich tylko po to, aby zmniejszyć rozmiar kontraktu, chyba że z jakiegoś powodu jest to Twoja jedyna opcja.

## Średni wpływ {#medium-impact}

### Usuń funkcje {#remove-functions}

To powinno być oczywiste. Funkcje znacznie zwiększają rozmiar kontraktu.

- **Zewnętrzne (External)**: Często dodajemy wiele funkcji widoku (view) dla wygody. Jest to całkowicie w porządku, dopóki nie osiągniesz limitu rozmiaru. Wtedy warto naprawdę zastanowić się nad usunięciem wszystkich poza absolutnie niezbędnymi.
- **Wewnętrzne (Internal)**: Możesz również usunąć funkcje wewnętrzne/prywatne i po prostu wstawić ich kod bezpośrednio (inline), o ile funkcja jest wywoływana tylko raz.

### Unikaj dodatkowych zmiennych {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Taka prosta zmiana robi różnicę **0,28 kb**. Istnieje duża szansa, że znajdziesz wiele podobnych sytuacji w swoich kontraktach, a te mogą naprawdę zsumować się do znaczących wartości.

### Skróć wiadomości o błędach {#shorten-error-message}

Długie wiadomości o wycofaniu (revert), a w szczególności wiele różnych wiadomości o wycofaniu, może niepotrzebnie rozdmuchać kontrakt. Zamiast tego używaj krótkich kodów błędów i dekoduj je w swoim kontrakcie. Długa wiadomość może stać się znacznie krótsza:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Używaj niestandardowych błędów zamiast wiadomości o błędach {#use-custom-errors-instead-of-error-messages}

Niestandardowe błędy (custom errors) zostały wprowadzone w [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Są one świetnym sposobem na zmniejszenie rozmiaru Twoich kontraktów, ponieważ są kodowane w ABI jako selektory (podobnie jak funkcje).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Rozważ niską wartość przebiegów (runs) w optymalizatorze {#consider-a-low-run-value-in-the-optimizer}

Możesz również zmienić ustawienia optymalizatora. Domyślna wartość 200 oznacza, że próbuje on zoptymalizować kod bajtowy tak, jakby funkcja była wywoływana 200 razy. Jeśli zmienisz ją na 1, w zasadzie mówisz optymalizatorowi, aby optymalizował pod kątem uruchomienia każdej funkcji tylko raz. Funkcja zoptymalizowana do jednorazowego uruchomienia oznacza, że jest zoptymalizowana pod kątem samego wdrożenia. Pamiętaj, że **zwiększa to [koszty gazu](/developers/docs/gas/) za uruchamianie funkcji**, więc możesz nie chcieć tego robić.

## Mały wpływ {#small-impact}

### Unikaj przekazywania struktur do funkcji {#avoid-passing-structs-to-functions}

Jeśli używasz [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), pomocne może być nieprzekazywanie struktur (structs) do funkcji. Zamiast przekazywać parametr jako strukturę, przekaż wymagane parametry bezpośrednio. W tym przykładzie zaoszczędziliśmy kolejne **0,1 kb**.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Deklaruj poprawną widoczność dla funkcji i zmiennych {#declare-correct-visibility-for-functions-and-variables}

- Funkcje lub zmienne, które są wywoływane tylko z zewnątrz? Zadeklaruj je jako `external` zamiast `public`.
- Funkcje lub zmienne wywoływane tylko z wnętrza kontraktu? Zadeklaruj je jako `private` lub `internal` zamiast `public`.

### Usuń modyfikatory {#remove-modifiers}

Modyfikatory, zwłaszcza gdy są intensywnie używane, mogą mieć znaczący wpływ na rozmiar kontraktu. Rozważ ich usunięcie i użycie w ich miejsce funkcji.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Te wskazówki powinny pomóc Ci znacznie zmniejszyć rozmiar kontraktu. Jeszcze raz, nie mogę tego wystarczająco podkreślić: zawsze skupiaj się na dzieleniu kontraktów, jeśli to możliwe, aby uzyskać największy wpływ.