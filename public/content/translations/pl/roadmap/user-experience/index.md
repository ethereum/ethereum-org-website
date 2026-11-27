---
title: "Poprawa doświadczeń użytkownika"
description: "Dla większości ludzi korzystanie z Ethereum jest wciąż zbyt skomplikowane. Aby zachęcić do masowej adopcji, Ethereum musi drastycznie obniżyć bariery wejścia – użytkownicy muszą czerpać korzyści ze zdecentralizowanego, niewymagającego pozwoleń i odpornego na cenzurę dostępu do Ethereum, ale musi to być równie bezproblemowe, jak korzystanie z tradycyjnej aplikacji Web2."
lang: pl
image: /images/roadmap/roadmap-ux.png
alt: "Mapa drogowa Ethereum"
template: roadmap
---

**Korzystanie z Ethereum musi zostać uproszczone**; od zarządzania [kluczami](/glossary/#key) i [portfelami](/glossary/#wallet) po inicjowanie transakcji. Aby ułatwić masową adopcję, Ethereum musi drastycznie zwiększyć łatwość obsługi, pozwalając użytkownikom na niewymagający pozwoleń i odporny na cenzurę dostęp do Ethereum z bezproblemowym doświadczeniem korzystania z aplikacji [Web2](/glossary/#web2).

## Wyjście poza frazy seed {#no-more-seed-phrases}

Konta Ethereum są chronione przez parę kluczy używanych do identyfikacji kont (klucz publiczny) i podpisywania wiadomości (klucz prywatny). Klucz prywatny jest jak hasło główne; umożliwia pełny dostęp do konta Ethereum. Jest to inny sposób działania dla osób bardziej zaznajomionych z bankami i aplikacjami Web2, które zarządzają kontami w imieniu użytkownika. Aby Ethereum osiągnęło masową adopcję bez polegania na scentralizowanych stronach trzecich, musi istnieć prosty, bezproblemowy sposób, aby użytkownik mógł przejąć pieczę nad swoimi aktywami i zachować kontrolę nad swoimi danymi bez konieczności rozumienia kryptografii klucza publicznego i prywatnego oraz zarządzania kluczami.

Rozwiązaniem tego problemu jest użycie portfeli opartych na [inteligentnych kontraktach](/glossary/#smart-contract) do interakcji z Ethereum. Portfele oparte na inteligentnych kontraktach tworzą sposoby ochrony kont w przypadku utraty lub kradzieży kluczy, dają możliwości lepszego wykrywania oszustw i obrony przed nimi, a także pozwalają portfelom na uzyskanie nowych funkcjonalności. Chociaż portfele oparte na inteligentnych kontraktach istnieją już dziś, ich tworzenie jest niewygodne, ponieważ protokół Ethereum musi je lepiej wspierać. To dodatkowe wsparcie jest znane jako abstrakcja konta.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Więcej o abstrakcji konta</ButtonLink>

## Węzły dla każdego {#nodes-for-everyone}

Użytkownicy uruchamiający [węzły](/glossary/#node) nie muszą ufać stronom trzecim w kwestii dostarczania im danych i mogą szybko, prywatnie i w sposób niewymagający pozwoleń wchodzić w interakcje z [blockchainem](/glossary/#blockchain) Ethereum. Jednak obecnie uruchomienie węzła wymaga wiedzy technicznej i znacznej ilości miejsca na dysku, co oznacza, że wiele osób musi zamiast tego ufać pośrednikom.

Istnieje kilka ulepszeń, które sprawią, że uruchamianie węzłów będzie znacznie łatwiejsze i mniej zasobochłonne. Oczekuje się, że stan Ethereum przejdzie na nową strukturę drzewa, obecnie proponowaną jako drzewo binarne w [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864), która generuje znacznie mniejsze dowody. Ponadto, dzięki [bezstanowości](/roadmap/statelessness) lub [wygasaniu danych](/roadmap/statelessness/#data-expiry), węzły Ethereum nie będą musiały przechowywać kopii całych danych stanu Ethereum, co drastycznie zmniejszy wymagania dotyczące miejsca na dysku twardym. [Lekkie węzły](/developers/docs/nodes-and-clients/light-clients/) zaoferują wiele korzyści płynących z uruchomienia pełnego węzła, ale będą mogły z łatwością działać na telefonach komórkowych lub w prostych aplikacjach przeglądarkowych.

<ButtonLink variant="outline" href="/roadmap/statelessness/">Więcej o bezstanowości</ButtonLink>

Dzięki tym ulepszeniom bariery w uruchamianiu węzła zostaną zredukowane praktycznie do zera. Użytkownicy skorzystają z bezpiecznego, niewymagającego pozwoleń dostępu do Ethereum bez konieczności poświęcania zauważalnej ilości miejsca na dysku lub mocy procesora na swoim komputerze lub telefonie komórkowym, a także nie będą musieli polegać na stronach trzecich w zakresie dostępu do danych lub sieci podczas korzystania z aplikacji.

## Obecny postęp {#current-progress}

Portfele oparte na inteligentnych kontraktach są już dostępne, ale wymagane są kolejne ulepszenia, aby uczynić je tak zdecentralizowanymi i niewymagającymi pozwoleń, jak to tylko możliwe. EIP-4337 to dojrzała propozycja, która nie wymaga żadnych zmian w protokole Ethereum. Główny inteligentny kontrakt wymagany dla EIP-4337 został **wdrożony w marcu 2023 roku**.

**Pełna bezstanowość jest wciąż w fazie badań** i prawdopodobnie minie kilka lat, zanim zostanie wdrożona. Na drodze do pełnej bezstanowości znajduje się kilka kamieni milowych, w tym wygasanie danych, które mogą zostać wdrożone wcześniej. Inne elementy mapy drogowej, takie jak nowe drzewo stanu (obecnie proponowane jako drzewo binarne w [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) oraz [separacja proponującego i budującego](/roadmap/pbs/), muszą zostać ukończone w pierwszej kolejności.

[Drzewa Verkle](/roadmap/verkle-trees/) były badane pod kątem tej roli, ale propozycja drzewa Verkle ([EIP-6800](https://eips.ethereum.org/EIPS/eip-6800)) jest obecnie w stagnacji. EIP-7864 jest wciąż szkicem i nie został zaplanowany do aktualizacji sieci.
