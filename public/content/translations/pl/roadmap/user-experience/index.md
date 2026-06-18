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

Użytkownicy uruchamiający [węzły](/glossary/#node) nie muszą ufać stronom trzecim w kwestii dostarczania im danych i mogą szybko, prywatnie i bez pozwoleń wchodzić w interakcje z [blockchainem](/glossary/#blockchain) Ethereum. Jednak uruchomienie węzła w tej chwili wymaga wiedzy technicznej i znacznej przestrzeni dyskowej, co oznacza, że wiele osób musi zamiast tego ufać pośrednikom.

Istnieje kilka aktualizacji, które sprawią, że uruchamianie węzłów będzie znacznie łatwiejsze i znacznie mniej zasobochłonne. Sposób przechowywania danych zostanie zmieniony, aby wykorzystać bardziej oszczędną pod względem miejsca strukturę znaną jako **drzewo Verkle**. Ponadto, dzięki [bezstanowości](/roadmap/statelessness) lub [wygasaniu danych](/roadmap/statelessness/#data-expiry), węzły Ethereum nie będą musiały przechowywać kopii całych danych stanu Ethereum, co drastycznie zmniejszy wymagania dotyczące przestrzeni na dysku twardym. [Lekkie węzły](/developers/docs/nodes-and-clients/light-clients/) zaoferują wiele korzyści płynących z uruchomienia pełnego węzła, ale będą mogły z łatwością działać na telefonach komórkowych lub w prostych aplikacjach przeglądarkowych.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Przeczytaj o drzewach Verkle</ButtonLink>

Dzięki tym aktualizacjom bariery w uruchamianiu węzła zostają zredukowane praktycznie do zera. Użytkownicy skorzystają z bezpiecznego, niewymagającego pozwoleń dostępu do Ethereum bez konieczności poświęcania zauważalnej przestrzeni dyskowej lub mocy procesora na swoim komputerze lub telefonie komórkowym, a podczas korzystania z aplikacji nie będą musieli polegać na stronach trzecich w zakresie dostępu do danych lub sieci.

## Obecny postęp {#current-progress}

Portfele oparte na inteligentnych kontraktach są już dostępne, ale wymagane są kolejne aktualizacje, aby uczynić je tak zdecentralizowanymi i niewymagającymi pozwoleń, jak to tylko możliwe. EIP-4337 to dojrzała propozycja, która nie wymaga żadnych zmian w protokole Ethereum. Główny inteligentny kontrakt wymagany dla EIP-4337 został **wdrożony w marcu 2023 roku**.

**Pełna bezstanowość wciąż znajduje się w fazie badań** i prawdopodobnie minie kilka lat, zanim zostanie wdrożona. Na drodze do pełnej bezstanowości znajduje się kilka kamieni milowych, w tym wygasanie danych, które mogą zostać wdrożone wcześniej. Inne elementy mapy drogowej, takie jak [drzewa Verkle](/roadmap/verkle-trees/) i [separacja proponującego i budującego (PBS)](/roadmap/pbs/), muszą zostać ukończone w pierwszej kolejności.

Sieci testowe drzew Verkle już działają, a kolejną fazą jest uruchomienie klientów obsługujących drzewa Verkle w prywatnych, a następnie publicznych sieciach testowych. Możesz pomóc przyspieszyć postęp, wdrażając kontrakty w sieciach testowych lub uruchamiając klientów sieci testowej.