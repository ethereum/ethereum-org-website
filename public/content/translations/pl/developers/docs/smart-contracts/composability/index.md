---
title: Kompozycyjność kontraktów inteligentnych
description: Dowiedz się, w jaki sposób inteligentne kontrakty można łączyć niczym klocki Lego, aby tworzyć złożone aplikacje zdecentralizowane (dapps) poprzez ponowne wykorzystywanie istniejących komponentów.
lang: pl
incomplete: true
---

## Krótkie wprowadzenie {#a-brief-introduction}

Inteligentne kontrakty są publiczne w Ethereum i można je uznać za otwarte API. Nie musisz pisać własnego inteligentnego kontraktu, aby zostać programistą aplikacji dapp, po prostu musisz wiedzieć, jak się nim posługiwać. Na przykład możesz użyć istniejących inteligentnych kontraktów [Uniswap](https://uniswap.exchange/swap), zdecentralizowanej giełdy, aby obsłużyć całą logikę wymiany tokenów w swojej aplikacji – nie musisz zaczynać od zera. Sprawdź niektóre z ich kontraktów [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) i [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Czym jest łatwość łączenia się w większe struktury? {#what-is-composability}

Łatwość łączenia się w większe struktury to łączenie osobnych komponentów w celu stworzenia nowych systemów i rezultatów. W dziedzinie tworzenia oprogramowania, łatwość łączenia się w większe struktury oznacza, że programista może ponownie użyć istniejących komponentów oprogramowania, aby zbudować nową aplikację. Dobrym sposobem na zrozumienie łatwości łączenia się w większe struktury jest wyobrażenie sobie elementów możliwych do połączenia jako klocków lego. Każdy klocek lego może być połączony z innym, pozwalając na budowanie złożonych struktur poprzez łączenie różnych klocków lego.

W Ethereum każdy inteligentny kontrakt jest jak taki klocek lego — możesz użyć inteligentnego kontraktu z innego projektu, jako klocków do swojego projektu. To oznacza, że nie musisz poświęcać czasu na ponowne wynajdywanie koła i ciągłe rozpoczynanie od nowa.

## Jak działa łatwość łączenia się w większe struktury? {#how-does-composability-work}

Inteligentne kontrakty Ethereum są jak publiczne interfejsy API, więc każdy może wchodzić z nimi w interakcję lub zintegrować je ze swoją dapką, aby rozszerzyć jej funkcjonalność. Łatwość łączenia w większe struktury inteligentnych kontraktów jest oparta na trzech zasadach: modularności, autonomii oraz wykrywalności:

\*\*1. **Modularność**: jest to umiejętność poszczególnych komponentów do wykonywania określonych zadań. W Ethereum każdy inteligentny kontrakt ma określone zastosowanie (jak w przykładzie Uniswap).

\*\*2. **Autonomia**: Komponowalne komponenty muszą mieć możliwość niezależnego działania. Każdy inteligentny kontrakt Ethereum jest samorealizujący i może działać bez konieczności polegania na innych częściach systemu.

\*\*3. **Wykrywalność**: Programiści nie mogą wywoływać zewnętrznych kontraktów ani integrować bibliotek oprogramowania w aplikacjach, jeśli te pierwsze nie są publicznie dostępne. Inteligentne kontrakty są z założenia otwarte; każdy może wywołać inteligentny kontrakt lub rozwidlić bazę kodu.

## Korzyści z kompozycyjności {#benefits-of-composability}

### Krótszy cykl deweloperski {#shorter-development-cycle}

Kompozycyjność zmniejsza ilość pracy, którą programiści muszą wykonać podczas tworzenia [dapek](/apps/#what-are-dapps). [Jak ujął to Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Otwarte oprogramowanie oznacza, że każdy problem musi zostać rozwiązany tylko raz."

Jeśli jest taki inteligentny kontrakt, który rozwiązuje jeden problem, to inni programiści mogą użyć go ponownie, aby nie musieć rozwiązywać tego samego problemu. Tym sposobem programiście mogą wziąć istniejące biblioteki i rozszerzyć je o dodatkowe funkcje, aby tworzyć nowe dapki.

### Większa innowacyjność {#greater-innovation}

Łatwa możliwość łączenia w większe struktury stwarza warunki do innowacji oraz eksperymentowania, ponieważ programiści mogą dowolnie używać, modyfikować, duplikować i integrować kod open-source, aby tworzyć oczekiwane rezultaty. W wyniku tego zespoły programistyczne poświęcają mniej czasu na podstawowe funkcje i mogą przeznaczyć go na eksperymentowanie z nowymi możliwościami.

### Lepsze wrażenia użytkownika {#better-user-experience}

Współpraca pomiędzy komponentami ekosystemu Ethereum poprawia doświadczenie użytkownika. Użytkownicy mają dostęp do większej liczby funkcji, kiedy dapki integrują zewnętrzne inteligentne kontrakty niż w rozdrobnionym ekosystemie, którego aplikacje nie mogą się ze sobą komunikować.

Posłużymy się przykładem z arbitrażu handlowego, aby zilustrować korzyści tej współpracy:

Jeśli token ma wyższą cenę na `exchange A` niż na `exchange B`, możesz wykorzystać różnicę w cenie, aby osiągnąć zysk. Możesz to jednak zrobić tylko wtedy, gdy masz wystarczająco dużo kapitału, aby sfinansować transakcję (tzn. kupić token na `exchange B` i sprzedać go na `exchange A`).

W przypadku, kiedy nie posiadasz wystarczających środków, aby sfinansować tę transakcję, może ci się przydać błyskawiczna pożyczka. [Błyskawiczne pożyczki](/defi/#flash-loans) są wysoce techniczne, ale podstawowa idea polega na tym, że można pożyczyć aktywa (bez zabezpieczenia) i zwrócić je w ramach _jednej_ transakcji.

Wracając do naszego pierwotnego przykładu, trader arbitrażowy może wziąć dużą pożyczkę błyskawiczną, kupić tokeny na `exchange B`, sprzedać je na `exchange A`, spłacić kapitał + odsetki i zatrzymać zysk, a wszystko to w ramach tej samej transakcji. Ta skomplikowana logika wymaga połączenia wywołań wielu kontraktów, co nie byłoby możliwe, gdyby nie istniała współpraca pomiędzy inteligentnymi kontraktami.

## Przykłady kompozycyjności w Ethereum {#composability-in-ethereum}

### Wymiana tokenów {#token-swaps}

Jeśli stworzysz dapkę, która wymaga, aby transakcje były opłacone za pomocą ETH, możesz pozwolić użytkownikom płacić innymi tokenami ERC-20 poprzez zintegrowanie logiki wymiany tokenów. Kod automatycznie skonwertuje token użytkownika do ETH, zanim kontrakt wykona wywołaną funkcję.

### Zarządzanie {#governance}

Tworzenie dedykowanych systemów zarządzania dla [DAO](/dao/) może być drogie i czasochłonne. Zamiast tego możesz użyć zestawu narzędzi open-source do zarządzania, takiego jak [Aragon Client](https://client.aragon.org/), aby uruchomić swoje DAO i szybko utworzyć ramy zarządzania.

### Zarządzanie tożsamością {#identity-management}

Zamiast budować niestandardowy system uwierzytelniania lub opierać się na scentralizowanych dostawcach, można zintegrować narzędzia zdecentralizowanej tożsamości (DID), aby obsługiwać uwierzytelnianie dla użytkowników. Przykładem jest [SpruceID](https://www.spruceid.com/), zestaw narzędzi open-source, który oferuje funkcję "Zaloguj się za pomocą Ethereum", która pozwala użytkownikom uwierzytelniać tożsamość za pomocą portfela Ethereum.

## Powiązane samouczki {#related-tutorials}

- [Rozpocznij tworzenie frontendu dapki za pomocą create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Omówienie, jak używać create-eth-app do tworzenia aplikacji z popularnymi, gotowymi inteligentnymi kontraktami._

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

- [Kompozycyjność to innowacja](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Dlaczego kompozycyjność ma znaczenie dla Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Czym jest kompozycyjność?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
