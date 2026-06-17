---
title: "Często zadawane pytania"
description: "Często zadawane pytania dotyczące dowodu stawki (PoS) w Ethereum."
lang: pl
---

## Czym jest dowód stawki (PoS) {#what-is-proof-of-stake}

Dowód stawki (PoS) to klasa algorytmów, która może zapewniać bezpieczeństwo blockchainom, gwarantując, że atakujący działający nieuczciwie stracą wartościowe aktywa. Systemy dowodu stawki wymagają od zestawu walidatorów udostępnienia pewnych aktywów, które mogą zostać zniszczone, jeśli walidator dopuści się możliwego do udowodnienia nieuczciwego zachowania. Ethereum wykorzystuje mechanizm dowodu stawki do zabezpieczania blockchaina.

## Jak dowód stawki wypada w porównaniu z dowodem pracy (PoW)? {#comparison-to-proof-of-work}

Zarówno dowód pracy (PoW), jak i dowód stawki to mechanizmy, które ekonomicznie zniechęcają złośliwych aktorów do spamowania lub oszukiwania sieci. W obu przypadkach węzły, które aktywnie uczestniczą w konsensusie, wnoszą do sieci pewne aktywa, które stracą w przypadku niewłaściwego zachowania.

W dowodzie pracy tym aktywem jest energia. Węzeł, znany jako górnik, uruchamia algorytm, którego celem jest obliczenie wartości szybciej niż jakikolwiek inny węzeł. Najszybszy węzeł ma prawo zaproponować blok do łańcucha. Aby zmienić historię łańcucha lub zdominować propozycje bloków, górnik musiałby dysponować tak dużą mocą obliczeniową, aby zawsze wygrywać ten wyścig. Jest to zaporowo drogie i trudne do wykonania, co chroni łańcuch przed atakami. Energia wymagana do „kopania” przy użyciu dowodu pracy to rzeczywiste aktywo, za które płacą górnicy.

Dowód stawki wymaga od węzłów, znanych jako walidatory, jawnego przesłania krypto aktywów do inteligentnego kontraktu. Jeśli walidator zachowa się niewłaściwie, to krypto może zostać zniszczone, ponieważ „stakuje” on swoje aktywa bezpośrednio w łańcuchu, a nie pośrednio poprzez zużycie energii.

Dowód pracy jest znacznie bardziej energochłonny, ponieważ w procesie kopania spalana jest energia elektryczna. Z kolei dowód stawki wymaga tylko bardzo małej ilości energii – walidatory Ethereum mogą działać nawet na urządzeniach o niskim poborze mocy, takich jak Raspberry Pi. Uważa się, że mechanizm dowodu stawki w Ethereum jest bezpieczniejszy niż dowód pracy, ponieważ koszt ataku jest wyższy, a konsekwencje dla atakującego są poważniejsze.

Dowód pracy kontra dowód stawki to temat sporny. [Blog Vitalika Buterina](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) oraz debata między Justinem Drake'iem a Lyn Alden stanowią dobre podsumowanie argumentów.

<VideoWatch slug="pow-vs-pos" />

## Czy dowód stawki jest energooszczędny? {#is-pos-energy-efficient}

Tak. Węzły w sieci dowodu stawki zużywają znikomą ilość energii. Niezależne badanie wykazało, że cała sieć Ethereum oparta na dowodzie stawki zużywa około 0,0026 TWh rocznie – około 13 000 razy mniej niż sam sektor gier w USA.

[Więcej o zużyciu energii przez Ethereum](/energy-consumption/).

## Czy dowód stawki jest bezpieczny? {#is-pos-secure}

Dowód stawki w Ethereum jest bardzo bezpieczny. Mechanizm ten był badany, rozwijany i rygorystycznie testowany przez osiem lat przed uruchomieniem. Gwarancje bezpieczeństwa różnią się od tych w blockchainach opartych na dowodzie pracy. W dowodzie stawki złośliwe walidatory mogą być aktywnie karane („cięcie”) i usuwane z zestawu walidatorów, co kosztuje je znaczną ilość ETH. W przypadku dowodu pracy atakujący może powtarzać swój atak, dopóki dysponuje wystarczającą mocą obliczeniową (hash power). Przeprowadzenie równoważnych ataków na Ethereum oparte na dowodzie stawki jest również bardziej kosztowne niż w przypadku dowodu pracy. Aby wpłynąć na żywotność (liveness) łańcucha, wymagane jest co najmniej 33% całkowitego stakowanego etheru w sieci (z wyjątkiem bardzo wyrafinowanych ataków o niezwykle niskim prawdopodobieństwie sukcesu). Aby kontrolować zawartość przyszłych bloków, wymagane jest co najmniej 51% całkowitego stakowanego ETH, a do przepisania historii potrzeba ponad 66% całkowitej stawki. Protokół Ethereum zniszczyłby te aktywa w scenariuszach ataku 33% lub 51%, a poprzez konsensus społeczny w scenariuszu ataku 66%.

- [Więcej o obronie dowodu stawki Ethereum przed atakującymi](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Więcej o projekcie dowodu stawki](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Czy dowód stawki sprawia, że Ethereum jest tańsze? {#does-pos-make-ethereum-cheaper}

Nie. Koszt wysłania transakcji (opłata za gaz) jest określany przez dynamiczny rynek opłat, który rośnie wraz z większym popytem w sieci. Mechanizm konsensusu nie ma na to bezpośredniego wpływu.

[Więcej o gazie](/developers/docs/gas).

## Czym są węzły, klienty i walidatory? {#what-are-nodes-clients-and-validators}

Węzły to komputery podłączone do sieci Ethereum. Klienty to oprogramowanie, które uruchamiają, zmieniające komputer w węzeł. Istnieją dwa rodzaje klientów: klienty wykonawcze i klienty konsensusu. Oba są potrzebne do utworzenia węzła. Walidator to opcjonalny dodatek do klienta konsensusu, który umożliwia węzłowi uczestnictwo w konsensusie dowodu stawki. Oznacza to tworzenie i proponowanie bloków po wybraniu oraz poświadczanie (attesting) bloków, o których dowiadują się w sieci. Aby uruchomić walidator, operator węzła musi zdeponować 32 ETH w kontrakcie depozytowym.

- [Więcej o węzłach i klientach](/developers/docs/nodes-and-clients)
- [Więcej o stakingu](/staking)

## Czy dowód stawki to nowy pomysł? {#is-pos-new}

Nie. Użytkownik na forum BitcoinTalk [zaproponował podstawową ideę dowodu stawki](https://bitcointalk.org/index.php?topic=27787.0) jako aktualizację dla Bitcoina w 2011 roku. Minęło jedenaście lat, zanim był gotowy do wdrożenia w sieci głównej Ethereum. Niektóre inne łańcuchy wdrożyły dowód stawki wcześniej niż Ethereum, ale nie specyficzny mechanizm Ethereum (znany jako Gasper).

## Co jest wyjątkowego w dowodzie stawki Ethereum? {#why-is-ethereum-pos-special}

Mechanizm dowodu stawki w Ethereum jest unikalny w swoim projekcie. Nie był to pierwszy zaprojektowany i wdrożony mechanizm dowodu stawki, ale jest najbardziej solidny. Mechanizm dowodu stawki jest znany jako „Casper”. Casper określa, w jaki sposób wybierane są walidatory do proponowania bloków, jak i kiedy dokonywane są poświadczenia, jak są one liczone, nagrody i kary przyznawane walidatorom, warunki cięcia (slashing), mechanizmy awaryjne, takie jak wyciek za nieaktywność, oraz warunki „ostateczności”. Ostateczność to warunek, zgodnie z którym, aby blok został uznany za stałą część kanonicznego łańcucha, musi na niego zagłosować co najmniej 66% całkowitego stakowanego ETH w sieci. Badacze opracowali Casper specjalnie dla Ethereum, a Ethereum jest pierwszym i jedynym blockchainem, który go wdrożył.

Oprócz Casper, dowód stawki w Ethereum wykorzystuje algorytm wyboru rozwidlenia o nazwie LMD-GHOST. Jest to wymagane w przypadku wystąpienia sytuacji, w której istnieją dwa bloki dla tego samego slotu. Tworzy to dwa rozwidlenia blockchaina. LMD-GHOST wybiera to, które ma największą „wagę” poświadczeń. Waga to liczba poświadczeń ważona przez saldo efektywne walidatorów. LMD-GHOST jest unikalny dla Ethereum.

Połączenie Casper i LMD_GHOST jest znane jako Gasper.

[Więcej o Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Czym jest cięcie (slashing)? {#what-is-slashing}

Cięcie to termin określający zniszczenie części stawki walidatora i usunięcie go z sieci. Ilość ETH utracona w wyniku cięcia skaluje się wraz z liczbą karanych w ten sposób walidatorów – oznacza to, że walidatory działające w zmowie są karane surowiej niż pojedyncze jednostki.

[Więcej o cięciu](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Dlaczego walidatory potrzebują 32 ETH? {#why-32-eth}

Walidatory muszą stakować ETH, aby miały coś do stracenia w przypadku niewłaściwego zachowania. Powodem, dla którego muszą stakować dokładnie 32 ETH, jest umożliwienie działania węzłów na skromnym sprzęcie. Gdyby minimalna ilość ETH na walidator była niższa, liczba walidatorów, a tym samym liczba wiadomości, które muszą zostać przetworzone w każdym slocie, wzrosłaby, co oznaczałoby, że do uruchomienia węzła wymagany byłby potężniejszy sprzęt.

## Jak wybierane są walidatory? {#how-are-validators-selected}

Pojedynczy walidator jest pseudolosowo wybierany jako proponujący blok w każdym slocie za pomocą algorytmu o nazwie RANDAO, który miesza hash od proponującego blok z ziarnem (seed), które jest aktualizowane w każdym bloku. Wartość ta służy do wyboru konkretnego walidatora z całego zestawu walidatorów. Wybór walidatora jest ustalany z wyprzedzeniem dwóch epok.

[Więcej o wyborze walidatora](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Czym jest manipulacja stawką (stake grinding)? {#what-is-stake-grinding}

Manipulacja stawką to kategoria ataku na sieci oparte na dowodzie stawki, w której atakujący próbuje wpłynąć na algorytm wyboru walidatora na korzyść własnych walidatorów. Ataki polegające na manipulacji stawką na RANDAO wymagają około połowy całkowitego stakowanego ETH.

[Więcej o manipulacji stawką](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Czym jest karanie społecznościowe (social slashing)? {#what-is-social-slashing}

Karanie społecznościowe to zdolność społeczności do skoordynowania rozwidlenia blockchaina w odpowiedzi na atak. Umożliwia to społeczności odzyskanie sprawności po sfinalizowaniu nieuczciwego łańcucha przez atakującego. Karanie społecznościowe może być również wykorzystane przeciwko atakom cenzury.

- [Więcej o karaniu społecznościowym](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin o karaniu społecznościowym](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Czy zostanę ukarany cięciem? {#will-i-get-slashed}

Jako walidator bardzo trudno jest zostać ukaranym cięciem, chyba że celowo angażujesz się w złośliwe zachowanie. Cięcie jest wdrażane tylko w bardzo specyficznych scenariuszach, w których walidatory proponują wiele bloków dla tego samego slotu lub zaprzeczają sobie w swoich poświadczeniach – jest bardzo mało prawdopodobne, aby wystąpiły one przypadkowo.

[Więcej o warunkach cięcia](https://eth2book.info/altair/part2/incentives/slashing)

## Czym jest problem braku stawki (nothing-at-stake)? {#what-is-nothing-at-stake-problem}

Problem braku stawki to koncepcyjny problem z niektórymi mechanizmami dowodu stawki, w których istnieją tylko nagrody, a nie ma kar. Jeśli nie ma nic do stracenia (braku stawki), pragmatyczny walidator równie chętnie poświadcza dowolne, a nawet wiele rozwidleń blockchaina, ponieważ zwiększa to jego nagrody. Ethereum omija to, stosując warunki ostateczności i cięcie, aby zapewnić jeden kanoniczny łańcuch.

[Więcej o problemie braku stawki](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Czym jest algorytm wyboru rozwidlenia? {#what-is-a-fork-choice-algorithm}

Algorytm wyboru rozwidlenia wdraża zasady określające, który łańcuch jest tym kanonicznym. W optymalnych warunkach nie ma potrzeby stosowania reguły wyboru rozwidlenia, ponieważ na każdy slot przypada tylko jeden proponujący blok i jeden blok do wyboru. Czasami jednak wiele bloków dla tego samego slotu lub późno docierające informacje prowadzą do wielu opcji organizacji bloków w pobliżu czoła (head) łańcucha. W takich przypadkach wszystkie klienty muszą identycznie wdrożyć pewne zasady, aby upewnić się, że wszystkie wybierają prawidłową sekwencję bloków. Algorytm wyboru rozwidlenia koduje te zasady.

Algorytm wyboru rozwidlenia w Ethereum nazywa się LMD-GHOST. Wybiera on rozwidlenie o największej wadze poświadczeń, czyli to, na które zagłosowało najwięcej stakowanego ETH.

[Więcej o LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Czym jest ostateczność w dowodzie stawki? {#what-is-finality}

Ostateczność w dowodzie stawki to gwarancja, że dany blok jest stałą częścią kanonicznego łańcucha i nie może zostać cofnięty, chyba że nastąpi awaria konsensusu, w której atakujący spali 33% całkowitego stakowanego etheru. Jest to ostateczność „kryptoekonomiczna”, w przeciwieństwie do „ostateczności probabilistycznej”, która ma zastosowanie w blockchainach opartych na dowodzie pracy. W ostateczności probabilistycznej nie ma wyraźnych sfinalizowanych/niesfinalizowanych stanów dla bloków – po prostu staje się coraz mniej prawdopodobne, że blok mógłby zostać usunięty z łańcucha w miarę jego starzenia się, a użytkownicy sami określają, kiedy są wystarczająco pewni, że blok jest „bezpieczny”. W przypadku ostateczności kryptoekonomicznej, na pary bloków punktów kontrolnych musi zagłosować 66% stakowanego etheru. Jeśli ten warunek jest spełniony, bloki między tymi punktami kontrolnymi są wyraźnie „sfinalizowane”.

[Więcej o ostateczności](/developers/docs/consensus-mechanisms/pos/#finality)

## Czym jest „słaba subiektywność”? {#what-is-weak-subjectivity}

Słaba subiektywność to cecha sieci opartych na dowodzie stawki, w których informacje społeczne są wykorzystywane do potwierdzenia obecnego stanu blockchaina. Nowe węzły lub węzły ponownie dołączające do sieci po długim czasie bycia offline mogą otrzymać niedawny stan, dzięki czemu węzeł może natychmiast sprawdzić, czy znajduje się w odpowiednim łańcuchu. Stany te są znane jako „punkty kontrolne słabej subiektywności” i można je uzyskać od innych operatorów węzłów poza pasmem (out-of-band), z eksploratorów bloków lub z kilku publicznych punktów końcowych.

[Więcej o słabej subiektywności](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Czy dowód stawki jest odporny na cenzurę? {#is-pos-censorship-resistant}

Odporność na cenzurę jest obecnie trudna do udowodnienia. Jednak w przeciwieństwie do dowodu pracy, dowód stawki oferuje opcję koordynowania cięć w celu ukarania cenzurujących walidatorów. Nadchodzą zmiany w protokole, które oddzielają budowniczych bloków od proponujących bloki i wdrażają listy transakcji, które budowniczowie muszą uwzględnić w każdym bloku. Ta propozycja jest znana jako separacja proponującego i budującego (PBS) i pomaga zapobiegać cenzurowaniu transakcji przez walidatory.

[Więcej o separacji proponującego i budującego (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Czy system dowodu stawki Ethereum może paść ofiarą ataku 51%? {#pos-51-attack}

Tak. Dowód stawki jest podatny na ataki 51%, podobnie jak dowód pracy. Zamiast wymagać 51% mocy obliczeniowej sieci, atakujący potrzebuje 51% całkowitego stakowanego ETH. Atakujący, który zgromadzi 51% całkowitej stawki, zyskuje kontrolę nad algorytmem wyboru rozwidlenia. Umożliwia to atakującemu cenzurowanie określonych transakcji, przeprowadzanie krótkoterminowych reorganizacji (reorgs) i wydobywanie MEV poprzez zmianę kolejności bloków na swoją korzyść.

[Więcej o atakach na dowód stawki](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Czym jest koordynacja społeczna i dlaczego jest potrzebna? {#what-is-social-coordination}

Koordynacja społeczna to ostatnia linia obrony dla Ethereum, która pozwoliłaby na odzyskanie uczciwego łańcucha po ataku, który sfinalizował nieuczciwe bloki. W takim przypadku społeczność Ethereum musiałaby skoordynować się „poza pasmem” (out-of-band) i zgodzić się na użycie uczciwego rozwidlenia mniejszościowego, karząc przy tym cięciem walidatory atakującego. Wymagałoby to również od aplikacji i giełd uznania uczciwego rozwidlenia.

[Przeczytaj więcej o koordynacji społecznej](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Czy bogaci stają się bogatsi w dowodzie stawki? {#do-rich-get-richer}

Im więcej ETH ktoś ma do stakowania, tym więcej walidatorów może uruchomić i tym więcej nagród może zgromadzić. Nagrody skalują się liniowo z ilością stakowanego ETH, a każdy otrzymuje taki sam procentowy zwrot. Dowód pracy wzbogaca bogatych bardziej niż dowód stawki, ponieważ bogatsi górnicy, którzy kupują sprzęt na dużą skalę, korzystają z ekonomii skali, co oznacza, że relacja między bogactwem a nagrodą jest nieliniowa.

## Czy dowód stawki jest bardziej scentralizowany niż dowód pracy? {#is-pos-decentralized}

Nie, dowód pracy ma tendencję do centralizacji, ponieważ koszty kopania rosną i wypierają z rynku osoby prywatne, a następnie małe firmy i tak dalej. Obecnym problemem z dowodem stawki jest wpływ instrumentów pochodnych płynnego stakingu (LSD). Są to tokeny reprezentujące ETH stakowane przez jakiegoś dostawcę, które każdy może wymieniać na rynkach wtórnych bez faktycznego odblokowywania (unstaking) ETH. LSD pozwalają użytkownikom na stakowanie z mniej niż 32 ETH, ale stwarzają również ryzyko centralizacji, w którym kilka dużych organizacji może ostatecznie kontrolować znaczną część stawki. Dlatego [staking solo](/staking/solo) jest najlepszą opcją dla Ethereum.

[Więcej o centralizacji stawki w LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Dlaczego mogę stakować tylko ETH? {#why-can-i-only-stake-eth}

ETH to natywna waluta Ethereum. Posiadanie jednej waluty, w której denominowane są wszystkie stawki, jest niezbędne zarówno do rozliczania sald efektywnych w celu ważenia głosów, jak i dla bezpieczeństwa. Samo ETH jest fundamentalnym elementem Ethereum, a nie inteligentnym kontraktem. Włączenie innych walut znacznie zwiększyłoby złożoność i zmniejszyło bezpieczeństwo stakingu.

## Czy Ethereum to jedyny blockchain oparty na dowodzie stawki? {#is-ethereum-the-only-pos-blockchain}

Nie, istnieje kilka blockchainów opartych na dowodzie stawki. Żaden nie jest identyczny z Ethereum; mechanizm dowodu stawki w Ethereum jest unikalny.

## Czym jest The Merge? {#what-is-the-merge}

The Merge był momentem, w którym Ethereum wyłączyło swój mechanizm konsensusu oparty na dowodzie pracy i włączyło mechanizm konsensusu oparty na dowodzie stawki. The Merge miał miejsce 15 września 2022 roku.

[Więcej o The Merge](/roadmap/merge)

## Czym są żywotność (liveness) i bezpieczeństwo (safety)? {#what-are-liveness-and-safety}

Żywotność i bezpieczeństwo to dwie podstawowe kwestie bezpieczeństwa dla blockchaina. Żywotność to dostępność finalizującego łańcucha. Jeśli łańcuch przestaje finalizować lub użytkownicy nie mają do niego łatwego dostępu, są to awarie żywotności. Niezwykle wysoki koszt dostępu można również uznać za awarię żywotności. Bezpieczeństwo odnosi się do tego, jak trudno jest zaatakować łańcuch – tj. sfinalizować sprzeczne punkty kontrolne.

[Przeczytaj więcej w dokumencie o Casper](https://arxiv.org/pdf/1710.09437.pdf)