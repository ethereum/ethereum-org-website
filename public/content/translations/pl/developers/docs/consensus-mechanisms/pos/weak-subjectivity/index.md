---
title: Słaba podmiotowość
description: Wyjaśnienie słabej subiektywności i jej roli w PoS Ethereum.
lang: pl
---

Subiektywność w łańcuchach bloków odnosi się do polegania na informacjach społecznych w celu uzgodnienia bieżącego stanu. Może istnieć wiele prawidłowych forków, które są wybierane zgodnie z informacjami zebranymi od innych węzłów w sieci. Przeciwieństwem jest obiektywność, która odnosi się do łańcuchów, w których istnieje tylko jeden możliwy prawidłowy łańcuch, co do którego wszystkie węzły muszą się zgodzić, stosując swoje zakodowane zasady. Istnieje również trzeci stan, znany jako słaba subiektywność. Odnosi się to do łańcucha, który może postępować obiektywnie po tym, jak początkowe ziarno informacji zostanie pobrane społecznie.

## Wymagania wstępne {#prerequisites}

Aby zrozumieć tę stronę, konieczne jest najpierw zrozumienie podstaw [dowodu stawki](/developers/docs/consensus-mechanisms/pos/).

## Jakie problemy rozwiązuje słaba subiektywność? {#problems-ws-solves}

Subiektywność jest nieodłączną cechą łańcuchów bloków z dowodem stawki, ponieważ wybór prawidłowego łańcucha spośród wielu forków odbywa się poprzez liczenie historycznych głosów. Naraża to łańcuch bloków na kilka wektorów ataku, w tym ataki dalekiego zasięgu, w których węzły, które uczestniczyły bardzo wcześnie w łańcuchu, utrzymują alternatywny fork, który udostępniają znacznie później dla własnej korzyści. Alternatywnie, jeśli 33% walidatorów wypłaci swoją stawkę, ale nadal będzie poświadczać i produkować bloki, mogą oni wygenerować alternatywnego forka, który jest sprzeczny z łańcuchem kanonicznym. Nowe węzły lub węzły, które były przez długi czas offline, mogą nie być świadome, że atakujący walidatorzy wypłacili swoje środki, więc atakujący mogliby ich oszukać, aby podążali za nieprawidłowym łańcuchem. Ethereum może rozwiązać te wektory ataku poprzez narzucenie ograniczeń, które zmniejszają subiektywne aspekty mechanizmu — a tym samym założenia dotyczące zaufania — do absolutnego minimum.

## Punkty kontrolne słabej subiektywności {#ws-checkpoints}

Słaba subiektywność jest zaimplementowana w Ethereum z dowodem stawki za pomocą „punktów kontrolnych słabej subiektywności”. Są to korzenie stanu, co do których wszystkie węzły w sieci zgadzają się, że należą do kanonicznego łańcucha. Służą temu samemu celowi „uniwersalnej prawdy” co bloki genezy, z tą różnicą, że nie znajdują się na pozycji genezy w łańcuchu bloków. Algorytm wyboru forka ufnie zakłada, że stan łańcucha bloków zdefiniowany w tym punkcie kontrolnym jest poprawny oraz że niezależnie i obiektywnie weryfikuje łańcuch od tego momentu. Punkty kontrolne działają jako „limity cofania”, ponieważ bloki znajdujące się przed punktami kontrolnymi słabej subiektywności nie mogą być zmienione. To podważa ataki dalekiego zasięgu, po prostu przez zdefiniowanie forków dalekiego zasięgu jako nieprawidłowych w ramach projektu mechanizmu. Zapewnienie, że punkty kontrolne słabej subiektywności są od siebie oddalone mniej niż okres wypłaty walidatora, gwarantuje, że walidator, który tworzy fork łańcucha, zostanie ukarany cięciem co najmniej o pewną kwotę progową, zanim będzie mógł wypłacić swoją stawkę, a nowi uczestnicy nie będą mogli zostać oszukani i skłonieni do podążania za nieprawidłowymi forkami przez walidatorów, którzy wypłacili już swoją stawkę.

## Różnica między punktami kontrolnymi słabej subiektywności a sfinalizowanymi blokami {#difference-between-ws-and-finalized-blocks}

Sfinalizowane bloki i punkty kontrolne słabej subiektywności są traktowane inaczej przez węzły Ethereum. Jeśli węzeł dowie się o dwóch konkurujących ze sobą sfinalizowanych blokach, wówczas ma problem z wyborem — nie ma sposobu, aby automatycznie zidentyfikować, który jest forkiem kanonicznym. Jest to symptomem awarii konsensusu. W przeciwieństwie do tego, węzeł po prostu odrzuca każdy blok, który jest sprzeczny z jego punktem kontrolnym słabej subiektywności. Z perspektywy węzła punkt kontrolny słabej subiektywności stanowi absolutną prawdę, której nie można podważyć nową wiedzą od innych węzłów.

## Na ile słaba jest ta subiektywność? {#how-weak-is-weak}

Subiektywny aspekt dowodu stawki w Ethereum to wymóg posiadania niedawnego stanu (punktu kontrolnego słabej subiektywności) z zaufanego źródła w celu synchronizacji. Ryzyko otrzymania złego punktu kontrolnego słabej subiektywności jest bardzo niskie, ponieważ można je sprawdzić w kilku niezależnych źródłach publicznych, takich jak eksploratory bloków lub wiele węzłów. Jednakże zawsze wymagany jest pewien stopień zaufania do uruchomienia dowolnej aplikacji, na przykład zaufanie, że deweloperzy oprogramowania stworzyli uczciwe oprogramowanie.

Punkt kontrolny słabej subiektywności może nawet być częścią oprogramowania klienta. Można argumentować, że atakujący może uszkodzić punkt kontrolny w oprogramowaniu i z równą łatwością może uszkodzić samo oprogramowanie. Nie ma prawdziwej kryptograficzno-ekonomicznej drogi obejścia tego problemu, ale wpływ niegodnych zaufania deweloperów jest minimalizowany w Ethereum dzięki istnieniu wielu niezależnych zespołów klienckich, z których każdy buduje równoważne oprogramowanie w różnych językach, a wszystkie z nich mają żywotny interes w utrzymaniu uczciwego łańcucha. Eksploratory bloków mogą również dostarczać punkty kontrolne słabej subiektywności lub sposób na porównanie punktów kontrolnych uzyskanych z innych miejsc z dodatkowym źródłem.

Wreszcie o punkty kontrolne można poprosić inne węzły; być może inny użytkownik Ethereum, który prowadzi pełny węzeł, może dostarczyć punkt kontrolny, który walidatorzy mogą następnie zweryfikować z danymi z eksploratora bloków. Ogólnie rzecz biorąc, zaufanie dostawcy punktu kontrolnego słabej subiektywności można uznać za równie problematyczne co zaufanie deweloperom klienta. Ogólny wymagany poziom zaufania jest niski. Należy zauważyć, że te rozważania stają się ważne tylko w bardzo mało prawdopodobnym przypadku, gdy większość walidatorów zmówi się, aby stworzyć alternatywny fork łańcucha bloków. W każdych innych okolicznościach do wyboru jest tylko jeden łańcuch Ethereum.

## Dalsza lektura {#further-reading}

- [Słaba subiektywność w Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Jak nauczyłem się kochać słabą subiektywność](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Słaba subiektywność (dokumentacja Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Faza 0 – Przewodnik po słabej subiektywności](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Analiza słabej subiektywności w Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
