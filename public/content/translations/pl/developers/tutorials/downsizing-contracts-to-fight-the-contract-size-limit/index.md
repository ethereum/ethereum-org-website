---
title: "Zmniejszanie kontraktów w walce z limitem rozmiaru kontraktu"
description: Co możesz zrobić, aby Twoje inteligentne kontrakty nie stały się zbyt duże?
author: Markus Waas
lang: pl
tags: [ "solidity", "smart kontrakty", "przechowywanie" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Dlaczego istnieje limit? {#why-is-there-a-limit}

[22 listopada 2016 r.](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) hard fork Spurious Dragon wprowadził [EIP-170](https://eips.ethereum.org/EIPS/eip-170), który dodał limit rozmiaru inteligentnego kontraktu wynoszący 24,576 kb. Dla Ciebie, jako dewelopera Solidity, oznacza to, że gdy dodajesz coraz więcej funkcjonalności do swojego kontraktu, w pewnym momencie osiągniesz limit i podczas wdrażania zobaczysz błąd:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Limit ten został wprowadzony, aby zapobiegać atakom typu „odmowa usługi” (Denial-of-Service, DOS). Każde wywołanie kontraktu jest stosunkowo tanie pod względem zużycia gazu. Jednak wpływ wywołania kontraktu na węzły Ethereum wzrasta nieproporcjonalnie w zależności od rozmiaru kodu wywoływanego kontraktu (odczytywanie kodu z dysku, wstępne przetwarzanie kodu, dodawanie danych do dowodu Merkle). Zawsze, gdy mamy do czynienia z sytuacją, w której atakujący potrzebuje niewielu zasobów, aby spowodować dużo pracy dla innych, pojawia się potencjalne zagrożenie atakami DOS.

Początkowo był to mniejszy problem, ponieważ jednym z naturalnych ograniczeń rozmiaru kontraktu jest limit gazu w bloku. Oczywiście kontrakt musi zostać wdrożony w ramach transakcji, która zawiera cały kod bajtowy kontraktu. Jeśli w bloku umieścisz tylko tę jedną transakcję, możesz zużyć cały ten gaz, ale nie jest on nieskończony. Od czasu [aktualizacji London](/ethereum-forks/#london) limit gazu w bloku może wahać się między 15 a 30 milionami jednostek w zależności od zapotrzebowania w sieci.

W dalszej części przyjrzymy się kilku metodom uporządkowanym według ich potencjalnego wpływu. Pomyśl o tym w kategoriach utraty wagi. Najlepszą strategią na osiągnięcie docelowej wagi (w naszym przypadku 24 kb) jest skupienie się w pierwszej kolejności na metodach o dużym wpływie. W większości przypadków wystarczy zmiana diety, aby osiągnąć cel, ale czasami potrzeba czegoś więcej. Wtedy możesz dodać trochę ćwiczeń (średni wpływ), a nawet suplementy (mały wpływ).

## Duży wpływ {#big-impact}

### Oddziel swoje kontrakty {#separate-your-contracts}

To powinno być zawsze Twoje pierwsze podejście. Jak możesz podzielić kontrakt na kilka mniejszych? Zazwyczaj zmusza to do opracowania dobrej architektury dla swoich kontraktów. Mniejsze kontrakty są zawsze preferowane z perspektywy czytelności kodu. Aby podzielić kontrakty, zadaj sobie pytanie:

- Które funkcje pasują do siebie? Każdy zestaw funkcji może najlepiej pasować do osobnego kontraktu.
- Które funkcje nie wymagają odczytywania stanu kontraktu lub tylko określonego podzbioru stanu?
- Czy możesz rozdzielić przechowywanie i funkcjonalność?

### Biblioteki {#libraries}

Jednym z prostych sposobów na przeniesienie kodu funkcjonalności z dala od miejsca przechowywania danych jest użycie [biblioteki](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Nie deklaruj funkcji biblioteki jako wewnętrznych (internal), ponieważ zostaną one [dodane do kontraktu](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) bezpośrednio podczas kompilacji. Ale jeśli używasz funkcji publicznych (public), to w rzeczywistości znajdą się one w osobnym kontrakcie bibliotecznym. Rozważ użycie [`using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for), aby uczynić korzystanie z bibliotek wygodniejszym.

### Proxy {#proxies}

Bardziej zaawansowaną strategią jest system proxy. Biblioteki używają w tle `DELEGATECALL`, który po prostu wykonuje funkcję innego kontraktu w kontekście stanu kontraktu wywołującego. Zapoznaj się z [tym wpisem na blogu](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2), aby dowiedzieć się więcej o systemach proxy. Dają one więcej funkcjonalności, np. umożliwiają aktualizację, ale dodają też sporo złożoności. Nie dodawałbym ich tylko po to, aby zmniejszyć rozmiar kontraktu, chyba że z jakiegoś powodu jest to jedyna dostępna opcja.

## Średni wpływ {#medium-impact}

### Usuń funkcje {#remove-functions}

To powinno być oczywiste. Funkcje znacznie zwiększają rozmiar kontraktu.

- **Zewnętrzne (External)**: Często dla wygody dodajemy wiele funkcji typu view. Jest to w porządku, dopóki nie osiągniesz limitu rozmiaru. Wtedy warto poważnie zastanowić się nad usunięciem wszystkich funkcji oprócz tych absolutnie niezbędnych.
- **Wewnętrzne (Internal)**: Możesz także usunąć funkcje wewnętrzne/prywatne i po prostu wstawić kod w miejscu wywołania, o ile funkcja jest wywoływana tylko raz.

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

Prosta zmiana, taka jak ta, robi różnicę **0,28 kb**. Istnieje szansa, że znajdziesz wiele podobnych sytuacji w swoich kontraktach, a te mogą zsumować się do znacznych oszczędności.

### Skróć komunikaty o błędach {#shorten-error-message}

Długie komunikaty `revert` i w szczególności wiele różnych komunikatów `revert` może niepotrzebnie zwiększać rozmiar kontraktu. Zamiast tego użyj krótkich kodów błędów i dekoduj je w swojej aplikacji. Długi komunikat może stać się znacznie krótszy:

```solidity
require(msg.sender == owner, "Tylko właściciel tego kontraktu może wywołać tę funkcję");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Używaj niestandardowych błędów zamiast komunikatów o błędach

Niestandardowe błędy zostały wprowadzone w [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Są świetnym sposobem na zmniejszenie rozmiaru Twoich kontraktów, ponieważ są kodowane w ABI jako selektory (tak jak funkcje).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Rozważ niską wartość „runs” w optymalizatorze {#consider-a-low-run-value-in-the-optimizer}

Możesz również zmienić ustawienia optymalizatora. Domyślna wartość 200 oznacza, że próbuje on zoptymalizować kod bajtowy tak, jakby funkcja była wywoływana 200 razy. Jeśli zmienisz tę wartość na 1, w zasadzie mówisz optymalizatorowi, aby optymalizował pod kątem jednokrotnego uruchomienia każdej funkcji. Funkcja zoptymalizowana pod kątem jednokrotnego uruchomienia oznacza, że jest zoptymalizowana pod kątem samego wdrożenia. Pamiętaj, że **zwiększa to [koszty gazu](/developers/docs/gas/) za uruchamianie funkcji**, więc możesz nie chcieć tego robić.

## Mały wpływ {#small-impact}

### Unikaj przekazywania struktur do funkcji {#avoid-passing-structs-to-functions}

Jeśli używasz [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), pomocne może być nieprzekazywanie struktur do funkcji. Zamiast przekazywać parametr jako strukturę, przekaż wymagane parametry bezpośrednio. W tym przykładzie zaoszczędziliśmy kolejne **0,1 kb**.

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

- Funkcje lub zmienne, które są wywoływane tylko z zewnątrz? Deklaruj je jako `external` zamiast `public`.
- Funkcje lub zmienne wywoływane tylko z wnętrza kontraktu? Deklaruj je jako `private` lub `internal` zamiast `public`.

### Usuń modyfikatory {#remove-modifiers}

Modyfikatory, zwłaszcza gdy są intensywnie używane, mogą mieć znaczący wpływ na rozmiar kontraktu. Rozważ ich usunięcie i zamiast tego użyj funkcji.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Te wskazówki powinny pomóc znacznie zmniejszyć rozmiar kontraktu. Jeszcze raz podkreślam, zawsze skupiaj się na dzieleniu kontraktów, jeśli to możliwe, aby uzyskać największy efekt.
