---
title: Poprawa doświadczenia użytkownika
description: Korzystanie z Ethereum jest nadal zbyt skomplikowane dla większości osób. Aby zachęcić do masowej adaptacji, Ethereum musi drastycznie obniżyć bariery wejścia — użytkownicy muszą uzyskać korzyści ze zdecentralizowanego, niewymagającego uprawnień i odpornego na cenzurę dostępu do Ethereum, ale musi on być tak samo płynny, jak korzystanie z tradycyjnej aplikacji web2.
lang: pl
image: /images/roadmap/roadmap-ux.png
alt: "Plan działania Ethereum"
template: roadmap
---

**Korzystanie z Ethereum musi być uproszczone**; od zarządzania [kluczami](/glossary/#key) i [portfelami](/glossary/#wallet) po inicjowanie transakcji. Aby ułatwić masową adaptację, Ethereum musi drastycznie zwiększyć łatwość użytkowania, umożliwiając użytkownikom doświadczenie niewymagającego uprawnień i odpornego na cenzurę dostępu do Ethereum, z płynnym korzystaniem z aplikacji [Web2](/glossary/#web2).

## Poza frazami seed {#no-more-seed-phrases}

Konta Ethereum są chronione przez parę kluczy używanych do identyfikacji kont (klucz publiczny) i podpisywania wiadomości (klucz prywatny). Klucz prywatny jest jak hasło główne; umożliwia pełny dostęp do konta Ethereum. Jest to inny sposób działania dla osób bardziej zaznajomionych z bankami i aplikacjami Web2, które zarządzają kontami w imieniu użytkownika. Aby Ethereum osiągnęło masową adaptację bez polegania na scentralizowanych stronach trzecich, musi istnieć prosty, płynny sposób, aby użytkownik mógł przejąć opiekę nad swoimi aktywami i zachować kontrolę nad swoimi danymi bez konieczności rozumienia kryptografii klucza publicznego i prywatnego oraz zarządzania kluczami.

Rozwiązaniem tego problemu jest wykorzystanie portfeli [inteligentnych kontraktów](/glossary/#smart-contract) do interakcji z Ethereum. Portfele inteligentnych kontraktów tworzą sposoby ochrony kont w przypadku zgubienia lub kradzieży kluczy, możliwości lepszego wykrywania oszustw i obrony, a także pozwalają portfelom uzyskać nowe funkcje. Chociaż portfele inteligentnych kontraktów istnieją już dziś, są one trudne do zbudowania, ponieważ protokół Ethereum musi je lepiej wspierać. To dodatkowe wsparcie jest znane jako abstrakcja kont.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Więcej na temat abstrakcji kont</ButtonLink>

## Węzły dla każdego

Użytkownicy uruchamiający [węzły](/glossary/#node) nie muszą ufać stronom trzecim w zakresie dostarczania im danych i mogą szybko, prywatnie i bez pozwolenia wchodzić w interakcje z [blockchainem](/glossary/#blockchain) Ethereum. Jednak obecnie uruchomienie węzła wymaga wiedzy technicznej i znacznej ilości miejsca na dysku, co oznacza, że wiele osób musi zaufać pośrednikom.

Istnieje kilka aktualizacji, dzięki którym uruchamianie węzłów będzie znacznie łatwiejsze i mniej zasobochłonne. Sposób przechowywania danych zostanie zmieniony na bardziej efektywną przestrzennie strukturę znaną jako **drzewo Verkle**. Ponadto, dzięki [bezstanowości](/roadmap/statelessness) lub [wygasaniu danych](/roadmap/statelessness/#data-expiry), węzły Ethereum nie będą musiały przechowywać kopii wszystkich danych stanu Ethereum, co radykalnie zmniejszy zapotrzebowanie na miejsce na dysku twardym. [Lekkie węzły](/developers/docs/nodes-and-clients/light-clients/) będą oferować wiele korzyści płynących z uruchomienia pełnego węzła, ale można je łatwo uruchamiać na telefonach lub w prostych aplikacjach przeglądarkowych.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Przeczytaj o drzewach Verkle</ButtonLink>

Dzięki tym aktualizacjom bariery związane z uruchomieniem węzła są skutecznie zredukowane do zera. Użytkownicy będą mogli korzystać z bezpiecznego i niewymagającego uprawnień dostępu do Ethereum bez konieczności poświęcania znacznej przestrzeni dyskowej lub procesora na swoim komputerze lub telefonie i nie będą musieli polegać na osobach trzecich w zakresie dostępu do danych lub sieci podczas korzystania z aplikacji.

## Aktualny postęp {#current-progress}

Portfele inteligentnych kontraktów są już dostępne, ale wymaganych jest więcej aktualizacji, aby stały się one w jak największym stopniu zdecentralizowane i pozbawione uprawnień. EIP-4337 to dopracowana propozycja, która nie wymaga żadnych zmian w protokole Ethereum. Główny inteligentny kontrakt wymagany dla EIP-4337 został **wdrożony w marcu 2023 roku**.

**Pełna bezstanowość wciąż znajduje się w fazie badań** i prawdopodobnie dzieli nas kilka lat od jej wdrożenia. Istnieje kilka kamieni milowych na drodze do pełnej bezstanowości, w tym wygasanie danych, które można wdrożyć wcześniej. Inne elementy planu działania, takie jak [drzewa Verkle](/roadmap/verkle-trees/) i [podział proponent-twórca](/roadmap/pbs/) muszą zostać ukończone w pierwszej kolejności.

Sieci testowe drzewa Verkle są już uruchomione, a następną fazą jest uruchomienie klientów obsługujących drzewa Verkle w prywatnych, a następnie publicznych sieciach testowych. Możesz jeszcze bardziej przyspieszyć postęp wdrażając kontrakty do sieci testowych lub uruchamiając klientów sieci testowych.
