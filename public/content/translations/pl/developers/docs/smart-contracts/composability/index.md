---
title: Kompozycyjność inteligentnych kontraktów
description: Dowiedz się, jak inteligentne kontrakty można łączyć jak klocki Lego, aby budować złożone zdecentralizowane aplikacje (dapp) poprzez ponowne wykorzystanie istniejących komponentów.
lang: pl
incomplete: true
---

## Krótkie wprowadzenie {#a-brief-introduction}

Inteligentne kontrakty są publiczne w Ethereum i można o nich myśleć jak o otwartych interfejsach API. Nie musisz pisać własnego inteligentnego kontraktu, aby zostać programistą zdecentralizowanych aplikacji (dapp), wystarczy, że wiesz, jak z nimi wchodzić w interakcje. Na przykład możesz użyć istniejących inteligentnych kontraktów [Uniswap](https://uniswap.exchange/swap), zdecentralizowanej giełdy, do obsługi całej logiki wymiany tokenów w swojej aplikacji – nie musisz zaczynać od zera. Sprawdź niektóre z ich kontraktów [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) i [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Czym jest kompozycyjność? {#what-is-composability}

Kompozycyjność to łączenie odrębnych komponentów w celu tworzenia nowych systemów lub wyników. W tworzeniu oprogramowania kompozycyjność oznacza, że programiści mogą ponownie wykorzystywać istniejące komponenty oprogramowania do budowania nowych aplikacji. Dobrym sposobem na zrozumienie kompozycyjności jest myślenie o komponowalnych elementach jak o klockach Lego. Każdy klocek Lego można połączyć z innym, co pozwala na budowanie złożonych struktur poprzez łączenie różnych klocków.

W Ethereum każdy inteligentny kontrakt jest swego rodzaju klockiem Lego — możesz używać inteligentnych kontraktów z innych projektów jako elementów budulcowych dla swojego projektu. Oznacza to, że nie musisz tracić czasu na wymyślanie koła na nowo ani budowanie od zera.

## Jak działa kompozycyjność? {#how-does-composability-work}

Inteligentne kontrakty Ethereum są jak publiczne interfejsy API, więc każdy może wchodzić w interakcje z kontraktem lub integrować je z aplikacjami dapp w celu uzyskania dodatkowej funkcjonalności. Kompozycyjność inteligentnych kontraktów opiera się na trzech zasadach: modułowości, autonomii i wykrywalności:

**1. Modułowość**: Jest to zdolność poszczególnych komponentów do wykonywania określonego zadania. W Ethereum każdy inteligentny kontrakt ma określony przypadek użycia (jak pokazano na przykładzie Uniswap).

**2. Autonomia**: Komponowalne komponenty muszą być w stanie działać niezależnie. Każdy inteligentny kontrakt w Ethereum jest samowykonywalny i może funkcjonować bez polegania na innych częściach systemu.

**3. Wykrywalność**: Programiści nie mogą wywoływać zewnętrznych kontraktów ani integrować bibliotek oprogramowania z aplikacjami, jeśli te pierwsze nie są publicznie dostępne. Z założenia inteligentne kontrakty są oprogramowaniem typu open-source; każdy może wywołać inteligentny kontrakt lub stworzyć rozwidlenie bazy kodu.

## Korzyści z kompozycyjności {#benefits-of-composability}

### Krótszy cykl rozwoju {#shorter-development-cycle}

Kompozycyjność zmniejsza nakład pracy, jaki programiści muszą włożyć w tworzenie [aplikacji dapp](/apps/#what-are-dapps). [Jak ujął to Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) „Open source oznacza, że każdy problem musi zostać rozwiązany tylko raz”.

Jeśli istnieje inteligentny kontrakt, który rozwiązuje dany problem, inni programiści mogą go ponownie wykorzystać, dzięki czemu nie muszą rozwiązywać tego samego problemu. W ten sposób programiści mogą wziąć istniejące biblioteki oprogramowania i dodać dodatkową funkcjonalność, aby tworzyć nowe aplikacje dapp.

### Większa innowacyjność {#greater-innovation}

Kompozycyjność zachęca do innowacji i eksperymentowania, ponieważ programiści mogą swobodnie ponownie wykorzystywać, modyfikować, powielać lub integrować kod open-source w celu uzyskania pożądanych rezultatów. W rezultacie zespoły programistyczne spędzają mniej czasu na podstawowej funkcjonalności i mogą poświęcić więcej czasu na eksperymentowanie z nowymi funkcjami.

### Lepsze doświadczenie użytkownika {#better-user-experience}

Interoperacyjność między komponentami ekosystemu Ethereum poprawia doświadczenie użytkownika. Użytkownicy mają dostęp do większej funkcjonalności, gdy aplikacje dapp integrują zewnętrzne inteligentne kontrakty, niż w pofragmentowanym ekosystemie, w którym aplikacje nie mogą się ze sobą komunikować.

Posłużymy się przykładem z handlu arbitrażowego, aby zilustrować korzyści płynące z interoperacyjności:

Jeśli token jest notowany wyżej na `exchange A` niż na `exchange B`, możesz wykorzystać różnicę cen, aby osiągnąć zysk. Możesz to jednak zrobić tylko wtedy, gdy masz wystarczający kapitał na sfinansowanie transakcji (tj. kupno tokena na `exchange B` i sprzedaż na `exchange A`).

W scenariuszu, w którym nie masz wystarczających środków na pokrycie transakcji, idealna może okazać się błyskawiczna pożyczka. [Błyskawiczne pożyczki](/defi/#flash-loans) są wysoce techniczne, ale podstawowa idea polega na tym, że możesz pożyczyć aktywa (bez zabezpieczenia) i zwrócić je w ramach _jednej_ transakcji.

Wracając do naszego początkowego przykładu, inwestor arbitrażowy może zaciągnąć dużą błyskawiczną pożyczkę, kupić tokeny na `exchange B`, sprzedać je na `exchange A`, spłacić kapitał wraz z odsetkami i zatrzymać zysk w ramach tej samej transakcji. Ta złożona logika wymaga połączenia wywołań do wielu kontraktów, co nie byłoby możliwe, gdyby inteligentnym kontraktom brakowało interoperacyjności.

## Przykłady kompozycyjności w Ethereum {#composability-in-ethereum}

### Wymiany tokenów {#token-swaps}

Jeśli tworzysz aplikację dapp, która wymaga opłacania transakcji w ETH, możesz pozwolić użytkownikom płacić w innych tokenach ERC-20, integrując logikę wymiany tokenów. Kod automatycznie przekonwertuje token użytkownika na ETH, zanim kontrakt wykona wywołaną funkcję.

### Zarządzanie {#governance}

Budowanie dedykowanych systemów zarządzania dla [DAO](/dao/) może być drogie i czasochłonne. Zamiast tego możesz użyć zestawu narzędzi do zarządzania typu open-source, takiego jak [Aragon Client](https://client.aragon.org/), aby zainicjować swoje DAO i szybko stworzyć ramy zarządzania.

### Zarządzanie tożsamością {#identity-management}

Zamiast budować niestandardowy system uwierzytelniania lub polegać na scentralizowanych dostawcach, możesz zintegrować narzędzia zdecentralizowanej tożsamości (DID), aby zarządzać uwierzytelnianiem użytkowników. Przykładem jest [SpruceID](https://www.spruceid.com/), zestaw narzędzi open-source, który oferuje funkcjonalność „Zaloguj się przez Ethereum” (Sign in with Ethereum), pozwalającą użytkownikom na uwierzytelnianie tożsamości za pomocą portfela Ethereum.

## Powiązane samouczki {#related-tutorials}

- [Rozpocznij tworzenie frontendu swojej aplikacji dapp za pomocą create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Przegląd tego, jak używać create-eth-app do tworzenia aplikacji z popularnymi inteligentnymi kontraktami bez dodatkowej konfiguracji._

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

- [Kompozycyjność to innowacja](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Dlaczego kompozycyjność ma znaczenie dla Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Czym jest kompozycyjność?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)