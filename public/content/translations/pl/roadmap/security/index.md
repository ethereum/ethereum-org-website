---
title: Bezpieczniejsze Ethereum
description: Ethereum jest najbezpieczniejszą i najbardziej zdecentralizowaną platformą inteligentnych kontraktów. Nadal jednak można wprowadzać ulepszenia, aby Ethereum pozostawała odporna na wszelkie ataki w przyszłości.
lang: pl
image: /images/roadmap/roadmap-security.png
alt: "Plan działania Ethereum"
template: roadmap
---

**Ethereum jest już bardzo bezpieczną**, zdecentralizowaną platformą [inteligentnych kontraktów](/glossary/#smart-contract). Nadal jednak można wprowadzać ulepszenia, aby Ethereum pozostawała odporna na wszelkie ataki w przyszłości. Obejmują one niewielkie zmiany w sposobie, w jaki [klienci Ethereum](/glossary/#consensus-client) radzą sobie z konkurencyjnymi [blokami](/glossary/#block), a także zwiększaniem szybkości, z jaką sieć uznaje bloki za [„sfinalizowane”](/developers/docs/consensus-mechanisms/pos/#finality) (co oznacza, że nie można ich zmienić bez ekstremalnych strat ekonomicznych dla atakującego).

Istnieją również ulepszenia, które znacznie utrudniają cenzurowanie transakcji, poprzez uniemożliwianie proponentom bloków śledzenia rzeczywistej zawartości ich bloków, a także nowe sposoby identyfikacji, kiedy klient cenzuruje. Razem, te ulepszenia unowocześnią protokół [proof-of-stake](/glossary/#pos), dzięki czemu użytkownicy — od osób indywidualnych po korporacje — będą mieli natychmiastowe zaufanie do swoich aplikacji, danych i aktywów na Ethereum.

## Wypłaty ze stakingu {#staking-withdrawals}

Aktualizacja z [proof-of-work](/glossary/#pow) do proof-of-stake rozpoczęła się od pionierów Ethereum „stakujących” swoje ETH w kontrakcie depozytowym. Te ETH są wykorzystywane do zabezpieczania sieci. W dniu 12 kwietnia 2023 miała miejsce druga aktualizacja, pozwalająca na wypłatę zestakowanego ETH. Od tamtego momentu walidatorzy mogą swobodnie stakować lub wypłacać swoje ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Poczytaj o wypłatach</ButtonLink>

## Ochrona przed atakami {#defending-against-attacks}

Istnieją ulepszenia, które można wprowadzić do protokołu proof-of-stake Ethereum. Jedno z nich znane jest jako [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) — bezpieczniejszy algorytm wyboru [forka](/glossary/#fork), który utrudnia niektóre wyrafinowane rodzaje ataków.

Skrócenie czasu, jakiego Ethereum potrzebuje na [sfinalizowanie](/glossary/#finality) bloków, zapewniłoby lepsze wrażenie użytkownika i zapobiegłoby wyrafinowanym atakom „reorganizacyjnym”, w których atakujący próbują przemieszać najnowsze bloki, aby uzyskać zysk lub ocenzurować niektóre transakcje. [**Finalizacja pojedynczego slotu (SSF)**](/roadmap/single-slot-finality/) to **sposób na zminimalizowanie opóźnienia finalizacji**. W tej chwili istnieją 15-minutowe bloki, do których przekonfigurowania atakujący mógłby teoretycznie przekonać inne walidatory. Z SSF jest ich 0. Użytkownicy, od osób indywidualnych po aplikacje i giełdy, korzystają z szybkiej gwarancji, że ich transakcje nie zostaną cofnięte, a sieć korzysta z zamknięcia całej masy ataków.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Poczytaj o finalizacji pojedynczego slotu</ButtonLink>

## Ochrona przed cenzurą {#defending-against-censorship}

Decentralizacja uniemożliwia wywieranie nadmiernego wpływu przez pojedyncze osoby lub małe grupy [walidatorów](/glossary/#validator). Nowe technologie stakowania mogą zwiększyć gwarancję, że walidatory Ethereum pozostaną tak zdecentralizowane, jak to tylko możliwe, jednocześnie chroniąc je przed awariami sprzętu, oprogramowania i sieci. Dotyczy to także oprogramowania, które dzieli obowiązki walidatora na wiele [węzłów](/glossary/#node). Jest ono znane pod nazwą **technologii rozproszonego walidatora (DVT)**. [Pule stakingowe](/glossary/#staking-pool) zachęcają do korzystania z DVT, ponieważ pozwala to wielu komputerom wspólnie uczestniczyć w walidacji; do tego dochodzi redundancja i odporność na błędy. Dzieli również klucze walidatora na kilka systemów, co jest alternatywą dla posiadania pojedynczych operatorów obsługujących wiele walidatorów. Utrudnia to nieuczciwym operatorom koordynowanie ataków na Ethereum. Podsumowując, pomysł polega na uzyskaniu korzyści bezpieczeństwa poprzez uruchamianie walidatorów jako _społeczności_, a nie jako jednostek.

<ButtonLink variant="outline-color" href="/staking/dvt/">Poczytaj o technologii rozproszonego walidatora</ButtonLink>

Wdrożenie **podziału proponent-twórca (PBS)** radykalnie poprawi wbudowaną ochronę Ethereum przed cenzurą. PBS pozwala jednemu walidatorowi na tworzenie bloku, a drugiemu na rozgłaszanie go w sieci Ethereum. Dzięki temu zyski z profesjonalnych maksymalizujących zyski algorytmów tworzenia bloku są dzielone sprawiedliwiej w całej sieci, **zapobiegając koncentracji stawek** u najlepiej działających stakerów instytucjonalnych w czasie. Proponent bloku może wybrać najbardziej opłacalny blok oferowany mu przez rynek twórców bloków. Aby cenzurować, proponent bloku często musiałby wybrać mniej opłacalny blok, co byłoby **ekonomicznie nierozsądne, a także oczywiste dla pozostałych walidatorów** w sieci.

Istnieją potencjalne dodatki do PBS, takie jak szyfrowane transakcje i listy inkluzywne, które mogą jeszcze bardziej poprawić odporność Ethereum na cenzurę. Za ich sprawą twórca bloku i proponent nie widzą rzeczywistych transakcji zawartych w ich blokach.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Poczytaj o podziale proponent-twórca</ButtonLink>

## Ochrona walidatorów {#protecting-validators}

Istnieje ewentualność, że wyrafinowany atakujący może zidentyfikować nadchodzące walidatory i spamować je, aby uniemożliwić im proponowanie bloków; jest to znane jako atak **blokady usług (DoS)**. Wdrożenie [**tajnego wyboru lidera (SLE)**](/roadmap/secret-leader-election) ochroni przed tego typu atakami, uniemożliwiając wcześniejsze poznanie proponenta bloków. Działa to poprzez ciągłe mieszanie zestawu zobowiązań kryptograficznych reprezentujących kandydatów na proponentów bloków i wykorzystywanie ich kolejności do określenia, który walidator jest wybierany w taki sposób, że tylko sami walidatorzy znają ich kolejność z wyprzedzeniem.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Poczytaj o tajnym wyborze lidera</ButtonLink>

## Aktualny postęp {#current-progress}

**Aktualizacje zabezpieczeń w planie działania są w zaawansowanym stadium badań**, ale nie oczekuje się, że zostaną wdrożone w najbliższym czasie. Kolejnymi krokami dla view-merge, PBS, SSF i SLE jest sfinalizowanie specyfikacji i rozpoczęcie tworzenia prototypów.
