---
title: Słaba subiektywność
description: Wyjaśnienie słabej subiektywności i jej roli w Ethereum opartym na dowodzie stawki (PoS).
lang: pl
---

Subiektywność w blockchainach odnosi się do polegania na informacjach społecznych w celu uzgodnienia obecnego stanu. Może istnieć wiele prawidłowych rozwidleń, z których wybiera się na podstawie informacji zebranych od innych uczestników w sieci. Przeciwieństwem jest obiektywność, która odnosi się do łańcuchów, w których istnieje tylko jeden możliwy prawidłowy łańcuch, na który wszystkie węzły z konieczności się zgodzą, stosując swoje zakodowane reguły. Istnieje również trzeci stan, znany jako słaba subiektywność. Odnosi się to do łańcucha, który może postępować obiektywnie po tym, jak pewna początkowa porcja informacji zostanie pozyskana społecznie.

## Wymagania wstępne {#prerequisites}

Aby zrozumieć tę stronę, należy najpierw zrozumieć podstawy [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Jakie problemy rozwiązuje słaba subiektywność? {#problems-ws-solves}

Subiektywność jest nieodłącznym elementem blockchainów opartych na dowodzie stawki (PoS), ponieważ wybór właściwego łańcucha spośród wielu rozwidleń odbywa się poprzez liczenie historycznych głosów. Naraża to blockchain na kilka wektorów ataku, w tym ataki dalekiego zasięgu (long-range attacks), w których węzły, które uczestniczyły bardzo wcześnie w łańcuchu, utrzymują alternatywne rozwidlenie, które uwalniają znacznie później dla własnej korzyści. Alternatywnie, jeśli 33% walidatorów wypłaci swoją stawkę, ale nadal będzie poświadczać i produkować bloki, mogą oni wygenerować alternatywne rozwidlenie, które jest w konflikcie z kanonicznym łańcuchem. Nowe węzły lub węzły, które były offline przez długi czas, mogą nie być świadome, że ci atakujący walidatorzy wypłacili swoje środki, więc atakujący mogliby oszukać ich, aby podążali za nieprawidłowym łańcuchem. [Ethereum](/) może rozwiązać te wektory ataku, nakładając ograniczenia, które zmniejszają subiektywne aspekty mechanizmu – a tym samym założenia dotyczące zaufania – do absolutnego minimum.

## Punkty kontrolne słabej subiektywności {#ws-checkpoints}

Słaba subiektywność jest zaimplementowana w Ethereum opartym na dowodzie stawki (PoS) poprzez użycie „punktów kontrolnych słabej subiektywności”. Są to korzenie stanu, co do których wszystkie węzły w sieci zgadzają się, że należą do kanonicznego łańcucha. Służą one temu samemu celowi „uniwersalnej prawdy” co bloki genezy, z tą różnicą, że nie znajdują się na pozycji genezy w blockchainie. Algorytm wyboru rozwidlenia ufa, że stan blockchaina zdefiniowany w tym punkcie kontrolnym jest prawidłowy i że niezależnie i obiektywnie weryfikuje łańcuch od tego momentu. Punkty kontrolne działają jako „limity wycofania”, ponieważ bloki znajdujące się przed punktami kontrolnymi słabej subiektywności nie mogą zostać zmienione. Podważa to ataki dalekiego zasięgu po prostu poprzez zdefiniowanie rozwidleń dalekiego zasięgu jako nieprawidłowych w ramach projektu mechanizmu. Zapewnienie, że punkty kontrolne słabej subiektywności są oddzielone mniejszą odległością niż okres wypłaty walidatora, gwarantuje, że walidator, który rozwidla łańcuch, podlega cięciu o co najmniej pewną progową kwotę, zanim będzie mógł wypłacić swoją stawkę, a nowi uczestnicy nie mogą zostać oszukani i wprowadzeni na nieprawidłowe rozwidlenia przez walidatorów, których stawka została wypłacona.

## Różnica między punktami kontrolnymi słabej subiektywności a sfinalizowanymi blokami {#difference-between-ws-and-finalized-blocks}

Sfinalizowane bloki i punkty kontrolne słabej subiektywności są traktowane inaczej przez węzły Ethereum. Jeśli węzeł dowie się o dwóch konkurujących sfinalizowanych blokach, jest rozdarty między nimi – nie ma sposobu, aby automatycznie zidentyfikować, które rozwidlenie jest kanoniczne. Jest to objaw awarii konsensusu. W przeciwieństwie do tego, węzeł po prostu odrzuca każdy blok, który jest w konflikcie z jego punktem kontrolnym słabej subiektywności. Z perspektywy węzła punkt kontrolny słabej subiektywności reprezentuje absolutną prawdę, która nie może zostać podważona przez nową wiedzę od innych uczestników sieci.

## Jak słaba jest „słaba”? {#how-weak-is-weak}

Subiektywnym aspektem dowodu stawki (PoS) w Ethereum jest wymóg posiadania niedawnego stanu (punktu kontrolnego słabej subiektywności) z zaufanego źródła, z którego można przeprowadzić synchronizację. Ryzyko uzyskania złego punktu kontrolnego słabej subiektywności jest bardzo niskie, ponieważ można je sprawdzić w kilku niezależnych publicznych źródłach, takich jak eksploratory bloków lub wiele węzłów. Jednak zawsze wymagany jest pewien stopień zaufania do uruchomienia dowolnej aplikacji, na przykład zaufanie, że programiści stworzyli uczciwe oprogramowanie.

Punkt kontrolny słabej subiektywności może nawet stanowić część oprogramowania klienta. Można argumentować, że atakujący może uszkodzić punkt kontrolny w oprogramowaniu i równie łatwo może uszkodzić samo oprogramowanie. Nie ma prawdziwej kryptoekonomicznej drogi obejścia tego problemu, ale wpływ niegodnych zaufania programistów jest zminimalizowany w Ethereum poprzez posiadanie wielu niezależnych zespołów klienckich, z których każdy buduje równoważne oprogramowanie w różnych językach, a wszystkie mają żywotny interes w utrzymaniu uczciwego łańcucha. Eksploratory bloków mogą również dostarczać punkty kontrolne słabej subiektywności lub sposób na krzyżowe sprawdzenie punktów kontrolnych uzyskanych z innych miejsc z dodatkowym źródłem.

Wreszcie, o punkty kontrolne można poprosić inne węzły; być może inny użytkownik Ethereum, który uruchamia pełny węzeł, może dostarczyć punkt kontrolny, który walidatorzy mogą następnie zweryfikować z danymi z eksploratora bloków. Ogólnie rzecz biorąc, zaufanie do dostawcy punktu kontrolnego słabej subiektywności można uznać za równie problematyczne, co zaufanie do programistów klienta. Ogólne wymagane zaufanie jest niskie. Należy zauważyć, że te rozważania stają się ważne tylko w bardzo mało prawdopodobnym przypadku, gdy większość walidatorów spiskuje w celu wyprodukowania alternatywnego rozwidlenia blockchaina. W każdych innych okolicznościach istnieje tylko jeden łańcuch Ethereum do wyboru.

## Dalsza lektura {#further-reading}

- [Słaba subiektywność w Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Jak nauczyłem się kochać słabą subiektywność](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Słaba subiektywność (dokumentacja Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Przewodnik po słabej subiektywności w Fazie 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Analiza słabej subiektywności w Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)