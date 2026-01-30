---
title: Najczęściej zadawane pytania
description: Najczęściej zadawane pytania dotyczące proof-of-stake Ethereum.
lang: pl
---

## Czym jest proof-of-stake {#what-is-proof-of-stake}

Proof-of-stake to klasa algorytmów, które mogą zapewnić bezpieczeństwo blockchainów poprzez zagwarantowanie, że aktywa wartościowe zostaną utracone przez atakujących, którzy działają nieuczciwie. Systemy proof-of-stake wymagają zestawu walidatorów, aby udostępnić pewne aktywa, które mogą zostać zniszczone, jeśli walidator zaangażuje się w udowodnione nieuczciwe zachowanie. Ethereum wykorzystuje mechanizm proof-of-stake do zabezpieczania blockchaina.

## Jak proof-of-stake ma się do proof-of-work? {#comparison-to-proof-of-work}

Zarówno proof-of-work, jak i proof-of-stake są mechanizmami, które ekonomicznie zniechęcają złośliwe podmioty do spamowania lub oszukiwania sieci. W obu przypadkach węzły, które aktywnie uczestniczą w konsensusie, umieszczają pewne zasoby „w sieci”, które utracą w przypadku niewłaściwego zachowania.

W proof-of-work tym zasobem jest energia. Węzeł, znany jako górnik, uruchamia algorytm, którego celem jest obliczenie wartości szybciej niż jakikolwiek inny węzeł. Najszybszy węzeł ma prawo zaproponować blok do łańcucha. Aby zmienić historię łańcucha lub zdominować propozycję bloku, górnik musiałby mieć tak dużą moc obliczeniową, że zawsze wygrywałby wyścig. Jest to zaporowo drogie i trudne do wykonania, chroniąc łańcuch przed atakami. Energia wymagana do „wydobywania” przy użyciu proof-of-work jest realnym zasobem, za który płacą górnicy.

Proof-of-stake wymaga od węzłów, zwanych walidatorami, wyraźnego przesłania aktywa kryptowalutowego do inteligentnego kontraktu. Jeśli walidator zachowa się niewłaściwie, kryptowaluta może zostać zniszczona, ponieważ „stakuje”
on swoje aktywa bezpośrednio do łańcucha, a nie pośrednio poprzez wydatek energetyczny.

Proof-of-work jest znacznie bardziej energochłonny, ponieważ energia elektryczna jest spalana w procesie wydobywania. Proof-of-stake, z drugiej strony, wymaga tylko bardzo małej ilości energii — walidatory Ethereum mogą nawet działać na urządzeniu o niskim poborze mocy, takim jak Raspberry Pi. Mechanizm proof-of-stake Ethereum jest uważany za bezpieczniejszy niż proof-of-work, ponieważ koszt ataku jest większy, a konsekwencje dla atakującego są poważniejsze.

Proof-of-work kontra proof-of-stake to kontrowersyjny temat. [Blog Vitalika Buterina](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) oraz debata pomiędzy Justinem Drake'em a Lyn Alden dobrze podsumowują te argumenty.

<YouTube id="1m12zgJ42dI" />

## Czy proof-of-stake jest energooszczędny? {#is-pos-energy-efficient}

Tak. Węzły w sieci proof-of-stake zużywają niewielką ilość energii. W badaniu przeprowadzonym przez stronę trzecią stwierdzono, że cała sieć proof-of-stake Ethereum zużywa około 0,0026 TWh/rok — około 13 000 razy mniej niż gaming w samych Stanach Zjednoczonych.

[Więcej o zużyciu energii przez Ethereum](/energy-consumption/).

## Czy proof-of-stake jest bezpieczny? {#is-pos-secure}

Proof-of-stake Ethereum jest bardzo bezpieczny. Mechanizm ten był badany, rozwijany i rygorystycznie testowany przez osiem lat przed uruchomieniem. Gwarancje bezpieczeństwa różnią się od blockchainów proof-of-work. W proof-of-stake złośliwi walidatorzy mogą być aktywnie karani („odcinani”) i wyrzucani z zestawu walidatorów, co kosztuje znaczną ilość ETH. W przypadku proof-of-work atakujący może powtarzać swój atak, dopóki ma wystarczającą moc hashowania. Przeprowadzenie równoważnych ataków na proof-of-stake Ethereum jest również bardziej kosztowne niż w przypadku proof-of-work. Aby wpłynąć na żywotność łańcucha, wymagane jest co najmniej 33% całkowitego zestakowanego etheru w sieci (z wyjątkiem przypadków bardzo wyrafinowanych ataków o bardzo niskim prawdopodobieństwie powodzenia). Aby kontrolować zawartość przyszłych bloków, wymagane jest co najmniej 51% całkowitego zestakowanego ETH, a do zmiany historii potrzebne jest ponad 66% całkowitej stawki. Protokół Ethereum zniszczyłby te aktywa w scenariuszach ataku 33% lub 51% oraz poprzez konsensus społeczny w scenariuszu ataku 66%.

- [Więcej o obronie proof-of-stake w Ethereum przed atakującymi](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Więcej o projekcie proof-of-stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Czy proof-of-stake sprawia, że Ethereum jest tańsze? {#does-pos-make-ethereum-cheaper}

Nie. Koszt wysłania transakcji (opłata za gaz) jest określany przez dynamiczny rynek opłat, który rośnie wraz ze wzrostem zapotrzebowania sieci. Mechanizm konsensusu nie ma na to bezpośredniego wpływu.

[Więcej o gazie](/developers/docs/gas).

## Czym są węzły, klienty i walidatorzy? {#what-are-nodes-clients-and-validators}

Węzły to komputery podłączone do sieci Ethereum. Klienty to uruchamiane przez nich oprogramowanie, które zamienia komputer w węzeł. Istnieją dwa rodzaje klientów: klienty wykonawcze i klienty konsensusu. Oba są potrzebne do utworzenia węzła. Walidator jest opcjonalnym dodatkiem do klienta konsensusu, który umożliwia węzłowi uczestnictwo w konsensusie proof-of-stake. Oznacza to tworzenie i proponowanie bloków po wybraniu walidatora i poświadczaniu bloków, o których słyszą w sieci. Aby uruchomić walidator, operator węzła musi wpłacić 32 ETH do kontraktu depozytowego.

- [Więcej o węzłach i klientach](/developers/docs/nodes-and-clients)
- [Więcej o stakowaniu](/staking)

## Czy proof-of-stake to nowy pomysł? {#is-pos-new}

Nie. Użytkownik na BitcoinTalk [zaproponował podstawową ideę proof-of-stake](https://bitcointalk.org/index.php?topic=27787.0) jako ulepszenie do Bitcoin w 2011 roku. Minęło jedenaście lat, zanim był on gotowy do wdrożenia w sieci głównej Ethereum. Niektóre inne sieci wdrożyły proof-of-stake wcześniej niż Ethereum, ale nie specyficzny mechanizm Ethereum (znany jako Gasper).

## Co jest wyjątkowego w proof-of-stake Ethereum? {#why-is-ethereum-pos-special}

Mechanizm proof-of-stake Ethereum jest unikalny w swojej konstrukcji. Nie był to pierwszy mechanizm proof-of-stake, który został zaprojektowany i wdrożony, ale jest najbardziej niezawodny. Mechanizm proof-of-stake jest znany jako „Casper”. Casper definiuje, w jaki sposób walidatorzy są wybierani do proponowania bloków, w jaki sposób i kiedy poświadczenia są dokonywane, w jaki sposób poświadczenia są liczone, nagrody i kary przyznawane walidatorom, warunki cięcia, mechanizmy awaryjne, takie jak wyciek nieaktywności, oraz warunki „finalizacji”. Finalizacja to warunek, że aby blok został uznany za stałą część łańcucha kanonicznego, musi zostać przegłosowany przez co najmniej 66% wszystkich zestakowanych ETH w sieci. Badacze opracowali Casper specjalnie dla Ethereum, a Ethereum jest pierwszym i jedynym blockchainem, który go wdrożył.

Jako dodatek do Casper, proof-of-stake Ethereum wykorzystuje algorytm wyboru forka o nazwie LMD-GHOST. Jest to wymagane w przypadku wystąpienia sytuacji, w której istnieją dwa bloki dla tego samego slotu. Tworzy to dwa forki blockchainu. LMD-GHOST wybiera tego, który ma największą „wagę” poświadczeń. Waga to liczba poświadczeń ważona efektywnym bilansem walidatorów. LMD-GHOST jest unikalny dla Ethereum.

Połączenie Casper i LMD_GHOST jest znane jako Gasper.

[Więcej o Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Czym jest cięcie? {#what-is-slashing}

Cięcie to termin określający zniszczenie części stawki walidatora i wyrzucenie go z sieci. Ilość ETH utraconych w wyniku cięcia skaluje się wraz z liczbą usuniętych walidatorów — oznacza to, że walidatorzy działający w zmowie są karani surowiej niż pojedyncze osoby.

[Więcej o slashingu](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Dlaczego walidatorzy potrzebują 32 ETH? {#why-32-eth}

Walidatorzy muszą stakować ETH, aby mieć coś do stracenia, jeśli zachowają się niewłaściwie. Powodem, dla którego muszą zestakować 32 ETH, jest umożliwienie działania węzłów na skromnym sprzęcie. Gdyby minimalna stawka ETH na walidatora była niższa, wówczas liczba walidatorów, a tym samym liczba wiadomości, które muszą być przetwarzane w każdym slocie, wzrosłaby, co oznacza, że do uruchomienia węzła potrzebny byłby mocniejszy sprzęt.

## Jak wybierani są walidatorzy? {#how-are-validators-selected}

Pojedynczy walidator jest wybierany pseudolosowo, aby zaproponować blok w każdym slocie przy użyciu algorytmu o nazwie RANDAO, który łączy hash od proponenta bloku z ziarnem, które jest aktualizowane co blok. Ta wartość służy do wyboru określonego walidatora z całego zestawu walidatorów. Wybór walidatora jest ustalany na dwie epoki z góry.

[Więcej o wyborze walidatora](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Co to jest stake grinding? {#what-is-stake-grinding}

Stake grinding to kategoria ataków na sieci proof-of-stake, w których atakujący próbuje wpłynąć na algorytm wyboru walidatorów na korzyść własnych walidatorów. Ataki stake grinding na RANDAO wymagają około połowy wszystkich zestakowanych ETH.

[Więcej o stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Czym jest social slashing? {#what-is-social-slashing}

Social slashing to zdolność społeczności do skoordynowania forka łańcucha bloków w odpowiedzi na atak. Umożliwia to społeczności odzyskanie stanu sprzed sfinalizowania nieuczciwego łańcucha przez atakującego. Social slashing może być również użyty przeciwko atakom cenzurującym.

- [Więcej o social slashing](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin o social slashing](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Czy zostanę zslashowany? {#will-i-get-slashed}

Jako walidator, bardzo trudno jest zostać poddanym slashingowi, chyba że celowo dopuszczasz się złośliwego zachowania. Slashing jest stosowany tylko w bardzo specyficznych scenariuszach, w których walidatorzy proponują wiele bloków dla tego samego slotu lub zaprzeczają samym sobie swoimi atestacjami - jest bardzo mało prawdopodobne, aby takie sytuacje powstały przypadkowo.

[Więcej o warunkach slashingu](https://eth2book.info/altair/part2/incentives/slashing)

## Na czym polega problem „nic do stracenia”? {#what-is-nothing-at-stake-problem}

Problem „nic do stracenia” to koncepcyjny problem w niektórych mechanizmach proof-of-stake, gdzie istnieją tylko nagrody, a nie ma kar. Jeśli nie ma nic do stracenia, pragmatyczny walidator z równą chęcią poświadczy dowolny, a nawet wiele forków łańcucha bloków, ponieważ zwiększa to jego nagrody. Ethereum omija ten problem, używając warunków finalizacji i slashingu, aby zapewnić jeden kanoniczny łańcuch.

[Więcej o problemie „nic do stracenia”](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Czym jest algorytm wyboru forka? {#what-is-a-fork-choice-algorithm}

Algorytm wyboru forka implementuje zasady określające, który łańcuch jest kanoniczny. W optymalnych warunkach nie ma potrzeby stosowania reguły wyboru forka, ponieważ na każdy slot przypada tylko jeden proponujący blok i jest tylko jeden blok do wyboru. Czasami jednak wiele bloków dla tego samego slotu lub późno napływające informacje prowadzą do wielu opcji organizacji bloków w pobliżu początku łańcucha. W takich przypadkach wszyscy klienci muszą identycznie implementować te same zasady, aby upewnić się, że wszyscy wybierają prawidłową sekwencję bloków. Algorytm wyboru forka koduje te zasady.

Algorytm wyboru forka w Ethereum nazywa się LMD-GHOST. Wybiera on fork z największą wagą atestacji, czyli ten, za którym głosowała większość zastakowanych ETH.

[Więcej o LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Czym jest finalizacja w proof-of-stake? {#what-is-finality}

Finalizacja w proof-of-stake to gwarancja, że dany blok jest stałą częścią kanonicznego łańcucha i nie może zostać odwrócony, chyba że dojdzie do awarii konsensusu, w której atakujący spali 33% całego zastakowanego etheru. Jest to finalizacja „kryptoekonomiczna”, w przeciwieństwie do „finalizacji probabilistycznej”, która ma zastosowanie w łańcuchach bloków typu proof-of-work. W finalizacji probabilistycznej nie ma jawnych stanów sfinalizowanych/niesfinalizowanych dla bloków - po prostu staje się coraz mniej prawdopodobne, że blok może zostać usunięty z łańcucha w miarę starzenia się, a użytkownicy sami określają, kiedy są wystarczająco pewni, że blok jest „bezpieczny”. W przypadku finalizacji kryptoekonomicznej, na pary bloków kontrolnych musi zagłosować 66% zastakowanego etheru. Jeśli ten warunek jest spełniony, bloki pomiędzy tymi punktami kontrolnymi są jawnie „sfinalizowane”.

[Więcej o finalizacji](/developers/docs/consensus-mechanisms/pos/#finality)

## Czym jest „słaba subiektywność”? {#what-is-weak-subjectivity}

Słaba subiektywność to cecha sieci proof-of-stake, w której informacje społeczne są wykorzystywane do potwierdzenia bieżącego stanu łańcucha bloków. Nowe węzły lub węzły ponownie dołączające do sieci po długim okresie bycia offline mogą otrzymać najnowszy stan, dzięki czemu węzeł może natychmiast sprawdzić, czy znajduje się na prawidłowym łańcuchu. Stany te są znane jako „punkty kontrolne słabej subiektywności” i można je uzyskać od innych operatorów węzłów w sposób pozapasmowy, z eksploratorów bloków lub z kilku publicznych punktów końcowych.

[Więcej o słabej subiektywności](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Czy proof-of-stake jest odporny na cenzurę? {#is-pos-censorship-resistant}

Odporność na cenzurę jest obecnie trudna do udowodnienia. Jednak w przeciwieństwie do proof-of-work, proof-of-stake oferuje opcję koordynowania slashingów w celu ukarania cenzurujących walidatorów. Nadchodzą zmiany w protokole, które oddzielają budowniczych bloków od proponujących bloki i wprowadzają listy transakcji, które budowniczowie muszą uwzględnić w każdym bloku. Ta propozycja jest znana jako separacja proponującego i budowniczego (proposer-builder separation) i pomaga zapobiegać cenzurowaniu transakcji przez walidatorów.

[Więcej o separacji proponującego i budowniczego](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Czy system proof-of-stake w Ethereum może być celem ataku 51%? {#pos-51-attack}

Tak. Proof-of-stake jest podatny na ataki 51%, tak samo jak proof-of-work. Zamiast wymagać 51% mocy haszującej sieci, atakujący potrzebuje 51% wszystkich zastakowanych ETH. Atakujący, który zgromadzi 51% całkowitego stake'u, zyskuje kontrolę nad algorytmem wyboru forka. Umożliwia to atakującemu cenzurowanie określonych transakcji, przeprowadzanie reorganizacji krótkiego zasięgu i ekstrakcję MEV poprzez zmianę kolejności bloków na swoją korzyść.

[Więcej o atakach na proof-of-stake](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Czym jest koordynacja społeczna i dlaczego jest potrzebna? {#what-is-social-coordination}

Koordynacja społeczna jest ostatnią linią obrony dla Ethereum, która pozwoliłaby na odzyskanie uczciwego łańcucha po ataku, który sfinalizował nieuczciwe bloki. W takim przypadku społeczność Ethereum musiałaby skoordynować się „pozapasmowo” i zgodzić się na użycie uczciwego forka mniejszościowego, dokonując w procesie slashingu walidatorów atakującego. Wymagałoby to również, aby aplikacje i giełdy uznały ten uczciwy fork.

[Przeczytaj więcej o koordynacji społecznej](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Czy w proof-of-stake bogaci stają się bogatsi? {#do-rich-get-richer}

Im więcej ETH ktoś stakuje, tym więcej walidatorów może uruchomić i tym więcej nagród może zgromadzić. Nagrody skalują się liniowo z ilością zastakowanych ETH, a każdy otrzymuje taki sam zwrot procentowy. Proof-of-work wzbogaca bogatych bardziej niż proof-of-stake, ponieważ bogatsi górnicy, którzy kupują sprzęt na dużą skalę, korzystają z ekonomii skali, co oznacza, że związek między bogactwem a nagrodą jest nieliniowy.

## Czy proof-of-stake jest bardziej scentralizowany niż proof-of-work? {#is-pos-decentralized}

Nie, proof-of-work ma tendencję do centralizacji, ponieważ koszty kopania rosną i eliminują z rynku osoby fizyczne, następnie małe firmy i tak dalej. Obecnym problemem z proof-of-stake jest wpływ płynnych instrumentów pochodnych stakowania (LSD). Są to tokeny reprezentujące ETH zastakowane przez jakiegoś dostawcę, które każdy może wymieniać na rynkach wtórnych bez konieczności odstakowywania rzeczywistych ETH. LSD pozwalają użytkownikom stakować mniej niż 32 ETH, ale tworzą również ryzyko centralizacji, w którym kilka dużych organizacji może skończyć kontrolując dużą część stake'u. Dlatego [solo staking](/staking/solo) jest najlepszą opcją dla Ethereum.

[Więcej o centralizacji stake'u w LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Dlaczego mogę stakować tylko ETH? {#why-can-i-only-stake-eth}

ETH jest natywną walutą Ethereum. Kluczowe jest posiadanie jednej waluty, w której denominowane są wszystkie stake'i, zarówno do rozliczania efektywnych sald w celu ważenia głosów, jak i dla bezpieczeństwa. Samo ETH jest fundamentalnym składnikiem Ethereum, a nie inteligentnym kontraktem. Włączenie innych walut znacznie zwiększyłoby złożoność i zmniejszyło bezpieczeństwo stakowania.

## Czy Ethereum jest jedynym łańcuchem bloków z proof-of-stake? {#is-ethereum-the-only-pos-blockchain}

Nie, istnieje kilka łańcuchów bloków z proof-of-stake. Żaden nie jest identyczny z Ethereum; mechanizm proof-of-stake w Ethereum jest unikalny.

## Czym jest Połączenie (The Merge)? {#what-is-the-merge}

Połączenie (The Merge) to moment, w którym Ethereum wyłączyło swój mechanizm konsensusu oparty na proof-of-work i włączyło mechanizm konsensusu oparty na proof-of-stake. Połączenie (The Merge) miało miejsce 15 września 2022 r.

[Więcej o Połączeniu (The Merge)](/roadmap/merge)

## Czym są żywotność i bezpieczeństwo? {#what-are-liveness-and-safety}

Żywotność i bezpieczeństwo to dwa fundamentalne aspekty bezpieczeństwa łańcucha bloków. Żywotność to dostępność finalizującego się łańcucha. Jeśli łańcuch przestaje się finalizować lub użytkownicy nie mogą łatwo uzyskać do niego dostępu, są to awarie żywotności. Niezwykle wysoki koszt dostępu również można uznać za awarię żywotności. Bezpieczeństwo odnosi się do tego, jak trudno jest zaatakować łańcuch - tj. sfinalizować sprzeczne punkty kontrolne.

[Przeczytaj więcej w dokumentacji Casper](https://arxiv.org/pdf/1710.09437.pdf)
