---
title: Bezpieczniejsze Ethereum
description: "Ethereum jest najbezpieczniejszą i najbardziej zdecentralizowaną platformą inteligentnych kontraktów, jaka istnieje. Wciąż jednak można wprowadzić ulepszenia, aby Ethereum pozostało odporne na wszelkie ataki w dalekiej przyszłości."
lang: pl
image: /images/roadmap/roadmap-security.png
alt: Mapa drogowa Ethereum
template: roadmap
---

**Ethereum jest już bardzo bezpieczną**, zdecentralizowaną platformą [inteligentnych kontraktów](/glossary/#smart-contract). Wciąż jednak można wprowadzić ulepszenia, aby Ethereum pozostało odporne na wszelkiego rodzaju ataki w dalekiej przyszłości. Obejmują one subtelne zmiany w sposobie, w jaki [klienty Ethereum](/glossary/#consensus-client) radzą sobie z konkurującymi [blokami](/glossary/#block), a także zwiększenie szybkości, z jaką sieć uznaje bloki za [„sfinalizowane”](/developers/docs/consensus-mechanisms/pos/#finality) (co oznacza, że nie można ich zmienić bez ogromnych strat ekonomicznych dla atakującego).

Istnieją również ulepszenia, które znacznie utrudniają cenzurowanie transakcji, sprawiając, że proponujący blok nie widzą rzeczywistej zawartości swoich bloków, a także nowe sposoby identyfikacji, kiedy klient cenzuruje. Razem te ulepszenia zaktualizują protokół [dowodu stawki (PoS)](/glossary/#pos), tak aby użytkownicy – od osób prywatnych po korporacje – mieli natychmiastową pewność co do swoich aplikacji, danych i aktywów w Ethereum.

## Wypłaty ze stakingu {#staking-withdrawals}

Aktualizacja z [dowodu pracy (PoW)](/glossary/#pow) do dowodu stawki (PoS) rozpoczęła się od pionierów Ethereum „stakujących” swoje ETH w kontrakcie depozytowym. To ETH jest używane do ochrony sieci. Druga aktualizacja miała miejsce 12 kwietnia 2023 r., aby umożliwić walidatorom wypłatę stakowanego ETH. Od tego czasu walidatorzy mogą swobodnie stakować lub wypłacać ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Przeczytaj o wypłatach</ButtonLink>

## Obrona przed atakami {#defending-against-attacks}

Istnieją ulepszenia, które można wprowadzić do protokołu dowodu stawki (PoS) Ethereum. Jednym z nich jest [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) – bezpieczniejszy algorytm wyboru [rozwidlenia](/glossary/#fork), który utrudnia pewne wyrafinowane rodzaje ataków.

Skrócenie czasu potrzebnego Ethereum na [sfinalizowanie](/glossary/#finality) bloków zapewniłoby lepsze wrażenia użytkownika i zapobiegłoby wyrafinowanym atakom typu „reorganizacja łańcucha”, w których atakujący próbują przetasować bardzo niedawne bloki, aby czerpać zyski lub cenzurować określone transakcje. [**Ostateczność w pojedynczym slocie (SSF)**](/roadmap/single-slot-finality/) to **sposób na zminimalizowanie opóźnienia finalizacji**. Obecnie istnieje 15 minut bloków, do których rekonfiguracji atakujący mógłby teoretycznie przekonać innych walidatorów. Dzięki SSF ten czas wynosi 0. Użytkownicy, od osób prywatnych po aplikacje i giełdy, zyskują szybką pewność, że ich transakcje nie zostaną cofnięte, a sieć zyskuje dzięki wyeliminowaniu całej klasy ataków.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Przeczytaj o ostateczności w pojedynczym slocie</ButtonLink>

## Obrona przed cenzurą {#defending-against-censorship}

Decentralizacja zapobiega uzyskaniu zbyt dużych wpływów przez jednostki lub małe grupy [walidatorów](/glossary/#validator). Nowe technologie stakingu mogą pomóc w zapewnieniu, że walidatorzy Ethereum pozostaną tak zdecentralizowani, jak to tylko możliwe, jednocześnie chroniąc ich przed awariami sprzętu, oprogramowania i sieci. Obejmuje to oprogramowanie, które dzieli obowiązki walidatora na wiele [węzłów](/glossary/#node). Jest to znane jako **technologia rozproszonych walidatorów (DVT)**. [Pule stakingowe](/glossary/#staking-pool) są zachęcane do korzystania z DVT, ponieważ pozwala to wielu komputerom na wspólne uczestnictwo w walidacji, dodając redundancję i odporność na błędy. Dzieli to również klucze walidatora na kilka systemów, zamiast polegać na pojedynczych operatorach obsługujących wielu walidatorów. Utrudnia to nieuczciwym operatorom koordynowanie ataków na Ethereum. Ogólnie rzecz biorąc, chodzi o czerpanie korzyści z bezpieczeństwa poprzez uruchamianie walidatorów jako _społeczności_, a nie jako jednostek.

<ButtonLink variant="outline-color" href="/staking/dvt/">Przeczytaj o technologii rozproszonych walidatorów</ButtonLink>

Wdrożenie **separacji proponującego i budującego (PBS)** drastycznie poprawi wbudowaną obronę Ethereum przed cenzurą. PBS pozwala jednemu walidatorowi na utworzenie bloku, a innemu na rozgłoszenie go w sieci Ethereum. Zapewnia to, że zyski z profesjonalnych algorytmów budowania bloków maksymalizujących zysk są dzielone sprawiedliwiej w całej sieci, **zapobiegając koncentracji stawki** u najlepiej radzących sobie instytucjonalnych stakerów z biegiem czasu. Proponujący blok może wybrać najbardziej opłacalny blok zaoferowany mu przez rynek budowniczych bloków. Aby cenzurować, proponujący blok często musiałby wybrać mniej opłacalny blok, co byłoby **ekonomicznie irracjonalne, a także oczywiste dla reszty walidatorów** w sieci.

Istnieją potencjalne dodatki do PBS, takie jak szyfrowane transakcje i listy włączeń, które mogłyby jeszcze bardziej poprawić odporność Ethereum na cenzurę. Sprawiają one, że budowniczy bloków i proponujący nie widzą rzeczywistych transakcji zawartych w ich blokach.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Przeczytaj o separacji proponującego i budującego</ButtonLink>

## Ochrona walidatorów {#protecting-validators}

Możliwe jest, że wyrafinowany atakujący mógłby zidentyfikować nadchodzących walidatorów i spamować ich, aby uniemożliwić im proponowanie bloków; jest to znane jako atak typu **odmowa usługi (DoS)**. Wdrożenie [**tajnego wyboru lidera (SLE)**](/roadmap/secret-leader-election) ochroni przed tego typu atakiem, uniemożliwiając wcześniejsze poznanie proponujących blok. Działa to poprzez ciągłe tasowanie zestawu zobowiązań kryptograficznych reprezentujących kandydatów na proponujących blok i wykorzystywanie ich kolejności do określenia, który walidator zostanie wybrany w taki sposób, że tylko sami walidatorzy znają swoją kolejność z wyprzedzeniem.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Przeczytaj o tajnym wyborze lidera</ButtonLink>

## Obecny postęp {#current-progress}

**Aktualizacje bezpieczeństwa na mapie drogowej są na zaawansowanym etapie badań**, ale nie oczekuje się ich wdrożenia przez jakiś czas. Kolejnymi krokami dla view-merge, PBS, SSF i SLE są sfinalizowanie specyfikacji i rozpoczęcie budowy prototypów.