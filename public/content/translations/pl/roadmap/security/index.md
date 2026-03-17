---
title: Bezpieczniejsze Ethereum
description: "Ethereum jest najbezpieczniejszą i najbardziej zdecentralizowaną platformą inteligentnych kontraktów. Nadal jednak można wprowadzać ulepszenia, aby Ethereum pozostawała odporna na wszelkie ataki w przyszłości."
lang: pl
image: /images/roadmap/roadmap-security.png
alt: "Plan działania Ethereum"
template: roadmap
---

**Ethereum jest już bardzo bezpieczną**, zdecentralizowaną platformą [inteligentnych kontraktów](/glossary/#smart-contract). Nadal jednak można wprowadzać ulepszenia, aby Ethereum pozostawała odporna na wszelkie ataki w przyszłości. Obejmują one subtelne zmiany w sposobie, w jaki [klienci Ethereum](/glossary/#consensus-client) radzą sobie z konkurującymi [blokami](/glossary/#block), a także zwiększają szybkość, z jaką sieć uznaje bloki za [„sfinalizowane”](/developers/docs/consensus-mechanisms/pos/#finality) (co oznacza, że nie można ich zmienić bez ekstremalnych strat ekonomicznych dla atakującego).

Istnieją również ulepszenia, które znacznie utrudniają cenzurowanie transakcji, poprzez uniemożliwianie proponentom bloków śledzenia rzeczywistej zawartości ich bloków, a także nowe sposoby identyfikacji, kiedy klient cenzuruje. Te ulepszenia razem zaktualizują protokół [proof-of-stake](/glossary/#pos), dzięki czemu użytkownicy – od osób fizycznych po korporacje – będą mieli natychmiastowe zaufanie do swoich aplikacji, danych i zasobów na Ethereum.

## Wypłaty ze stakowania {#staking-withdrawals}

Ulepszenie z [proof-of-work](/glossary/#pow) do proof-of-stake rozpoczęło się od pionierów Ethereum „stakujących” swoje ETH w kontrakcie depozytowym. Te ETH są wykorzystywane do zabezpieczania sieci. Druga aktualizacja miała miejsce 12 kwietnia 2023 r. i pozwoliła walidatorom na wypłatę stakowanego ETH. Od tamtego momentu walidatorzy mogą swobodnie stakować lub wypłacać swoje ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Poczytaj o wypłatach</ButtonLink>

## Obrona przed atakami {#defending-against-attacks}

Istnieją ulepszenia, które można wprowadzić do protokołu proof-of-stake Ethereum. Jeden z nich jest znany jako [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) – bezpieczniejszy algorytm wyboru [forka](/glossary/#fork), który utrudnia niektóre zaawansowane typy ataków.

Zmniejszenie czasu potrzebnego Ethereum na [sfinalizowanie](/glossary/#finality) bloków zapewniłoby lepsze wrażenia użytkownika i zapobiegłoby zaawansowanym atakom typu „reorg”, w których atakujący próbują przetasować najnowsze bloki, aby uzyskać zysk lub ocenzurować niektóre transakcje. [**Finalizacja w pojedynczym slocie (SSF)**](/roadmap/single-slot-finality/) to **sposób na zminimalizowanie opóźnienia finalizacji**. W tej chwili istnieją 15-minutowe bloki, do których przekonfigurowania atakujący mógłby teoretycznie przekonać inne walidatory. Z SSF jest ich 0. Użytkownicy, od osób indywidualnych po aplikacje i giełdy, korzystają z szybkiej gwarancji, że ich transakcje nie zostaną cofnięte, a sieć korzysta z zamknięcia całej masy ataków.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Poczytaj o finalizacji w pojedynczym slocie</ButtonLink>

## Obrona przed cenzurą {#defending-against-censorship}

Decentralizacja uniemożliwia osobom fizycznym lub małym grupom [walidatorów](/glossary/#validator) uzyskanie zbyt dużych wpływów. Nowe technologie stakowania mogą zwiększyć gwarancję, że walidatory Ethereum pozostaną tak zdecentralizowane, jak to tylko możliwe, jednocześnie chroniąc je przed awariami sprzętu, oprogramowania i sieci. Obejmuje to oprogramowanie, które rozdziela obowiązki walidatora pomiędzy wiele [węzłów](/glossary/#node). Jest to znane jako **technologia rozproszonego walidatora (DVT)**. [Pule stakowania](/glossary/#staking-pool) są zachęcane do korzystania z DVT, ponieważ pozwala to wielu komputerom na wspólne uczestnictwo w walidacji, co zwiększa redundancję i odporność na błędy. Dzieli również klucze walidatora na kilka systemów, co jest alternatywą dla posiadania pojedynczych operatorów obsługujących wiele walidatorów. Utrudnia to nieuczciwym operatorom koordynowanie ataków na Ethereum. Ogólnie rzecz biorąc, chodzi o to, aby czerpać korzyści z bezpieczeństwa, uruchamiając walidatorów jako _społeczności_, a nie jako pojedyncze podmioty.

<ButtonLink variant="outline-color" href="/staking/dvt/">Poczytaj o technologii rozproszonego walidatora</ButtonLink>

Wdrożenie **rozdzielenia proponującego od budowniczego (PBS)** znacznie poprawi wbudowane mechanizmy obronne Ethereum przed cenzurą. PBS pozwala jednemu walidatorowi na tworzenie bloku, a drugiemu na rozgłaszanie go w sieci Ethereum. Zapewnia to, że zyski z profesjonalnych, maksymalizujących zysk algorytmów budowania bloków są dzielone bardziej sprawiedliwie w całej sieci, **zapobiegając koncentracji stawki** u najlepiej prosperujących stakerów instytucjonalnych w miarę upływu czasu. Proponent bloku może wybrać najbardziej opłacalny blok oferowany mu przez rynek twórców bloków. Aby dokonać cenzury, proponujący blok musiałby często wybierać mniej dochodowy blok, co byłoby **ekonomicznie irracjonalne i oczywiste dla reszty walidatorów** w sieci.

Istnieją potencjalne dodatki do PBS, takie jak szyfrowane transakcje i listy inkluzywne, które mogą jeszcze bardziej poprawić odporność Ethereum na cenzurę. Za ich sprawą twórca bloku i proponent nie widzą rzeczywistych transakcji zawartych w ich blokach.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Poczytaj o rozdzieleniu proponującego od budowniczego</ButtonLink>

## Ochrona walidatorów {#protecting-validators}

Możliwe jest, że zaawansowany atakujący mógłby zidentyfikować nadchodzących walidatorów i spamować ich, aby uniemożliwić im proponowanie bloków; jest to znane jako atak typu **odmowa usługi (DoS)**. Wdrożenie [**tajnego wyboru lidera (SLE)**](/roadmap/secret-leader-election) ochroni przed tego typu atakami, uniemożliwiając poznanie z wyprzedzeniem tożsamości osób proponujących bloki. Działa to poprzez ciągłe mieszanie zestawu zobowiązań kryptograficznych reprezentujących kandydatów na proponentów bloków i wykorzystywanie ich kolejności do określenia, który walidator jest wybierany w taki sposób, że tylko sami walidatorzy znają ich kolejność z wyprzedzeniem.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Poczytaj o tajnym wyborze lidera</ButtonLink>

## Aktualny postęp {#current-progress}

**Ulepszenia bezpieczeństwa w planie rozwoju są na zaawansowanym etapie badań**, ale nie przewiduje się, że zostaną wdrożone w najbliższym czasie. Kolejne kroki dla view-merge, PBS, SSF i SLE to sfinalizowanie specyfikacji i rozpoczęcie budowy prototypów.
