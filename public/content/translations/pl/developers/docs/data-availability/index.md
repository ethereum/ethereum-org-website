---
title: Dostępność danych
description: Przegląd problemów i rozwiązań związanych z dostępnością danych w Ethereum
lang: pl
---

„Nie ufaj, weryfikuj” to popularna maksyma w Ethereum. Chodzi o to, że twój węzeł może niezależnie zweryfikować poprawność otrzymywanych informacji, wykonując wszystkie transakcje w blokach otrzymanych od innych węzłów, aby upewnić się, że proponowane zmiany dokładnie odpowiadają tym obliczonym niezależnie przez węzeł. Oznacza to, że węzły nie muszą ufać, że nadawcy bloku są uczciwi. Nie jest to możliwe, jeśli brakuje danych.

**Dostępność danych** odnosi się do pewności użytkownika, że dane wymagane do weryfikacji bloku są rzeczywiście dostępne dla wszystkich uczestników sieci. Dla pełnych węzłów w [Ethereum](/) warstwy 1 (L1) jest to stosunkowo proste; pełny węzeł pobiera kopię wszystkich danych w każdym bloku – dane _muszą_ być dostępne, aby pobieranie było możliwe. Blok z brakującymi danymi zostałby odrzucony, a nie dodany do blockchaina. Jest to „dostępność danych onchain” i stanowi cechę monolitycznych blockchainów. Pełne węzły nie mogą zostać oszukane i zaakceptować nieprawidłowych transakcji, ponieważ same pobierają i wykonują każdą transakcję. Jednak w przypadku modułowych blockchainów, rollupów warstwy 2 (L2) i lekkich klientów, kwestia dostępności danych jest bardziej złożona i wymaga bardziej wyrafinowanych procedur weryfikacji.

## Wymagania wstępne {#prerequisites}

Powinieneś dobrze rozumieć [podstawy blockchaina](/developers/docs/intro-to-ethereum/), a w szczególności [mechanizmy konsensusu](/developers/docs/consensus-mechanisms/). Ta strona zakłada również, że czytelnik jest zaznajomiony z [blokami](/developers/docs/blocks/), [transakcjami](/developers/docs/transactions/), [węzłami](/developers/docs/nodes-and-clients/), [rozwiązaniami skalującymi](/developers/docs/scaling/) i innymi powiązanymi tematami.

## Problem dostępności danych {#the-data-availability-problem}

Problem dostępności danych polega na konieczności udowodnienia całej sieci, że skrócona forma pewnych danych transakcji dodawanych do blockchaina rzeczywiście reprezentuje zestaw prawidłowych transakcji, ale bez wymagania od wszystkich węzłów pobierania wszystkich danych. Pełne dane transakcji są niezbędne do niezależnej weryfikacji bloków, ale wymaganie od wszystkich węzłów pobierania wszystkich danych transakcji stanowi barierę dla skalowania. Rozwiązania problemu dostępności danych mają na celu zapewnienie wystarczającej pewności, że pełne dane transakcji zostały udostępnione do weryfikacji uczestnikom sieci, którzy sami nie pobierają i nie przechowują tych danych.

[Lekkie węzły](/developers/docs/nodes-and-clients/light-clients) i [rollupy warstwy 2](/developers/docs/scaling) to ważne przykłady uczestników sieci, którzy wymagają silnych gwarancji dostępności danych, ale nie mogą samodzielnie pobierać i przetwarzać danych transakcji. Unikanie pobierania danych transakcji to właśnie to, co czyni lekkie węzły lekkimi i pozwala rollupom być skutecznymi rozwiązaniami skalującymi.

Dostępność danych jest również kluczową kwestią dla przyszłych [„bezstanowych”](/roadmap/statelessness) klientów Ethereum, którzy nie muszą pobierać i przechowywać danych stanu w celu weryfikacji bloków. Bezstanowi klienci nadal muszą mieć pewność, że dane są dostępne _gdzieś_ i że zostały przetworzone poprawnie.

## Rozwiązania problemu dostępności danych {#data-availability-solutions}

### Próbkowanie dostępności danych (DAS) {#data-availability-sampling}

Próbkowanie dostępności danych (DAS) to sposób, w jaki sieć może sprawdzić, czy dane są dostępne, bez zbytniego obciążania pojedynczego węzła. Każdy węzeł (w tym węzły nieuczestniczące w stakingu) pobiera niewielki, losowo wybrany podzbiór wszystkich danych. Pomyślne pobranie próbek potwierdza z dużą pewnością, że wszystkie dane są dostępne. Opiera się to na kodowaniu wymazań (erasure coding), które rozszerza dany zbiór danych o nadmiarowe informacje (odbywa się to poprzez dopasowanie funkcji znanej jako _wielomian_ do danych i obliczenie wartości tego wielomianu w dodatkowych punktach). Pozwala to na odzyskanie oryginalnych danych z danych nadmiarowych w razie potrzeby. Konsekwencją takiego tworzenia danych jest to, że jeśli _jakakolwiek_ część oryginalnych danych jest niedostępna, będzie brakować _połowy_ rozszerzonych danych! Ilość próbek danych pobieranych przez każdy węzeł można dostosować tak, aby było _niezwykle_ prawdopodobne, że zabraknie co najmniej jednego z fragmentów danych próbkowanych przez każdego klienta, _jeśli_ w rzeczywistości dostępna jest mniej niż połowa danych.

DAS zostanie użyte, aby upewnić się, że operatorzy rollupów udostępniają swoje dane transakcji po wdrożeniu [pełnego dankshardingu](/roadmap/danksharding/#what-is-danksharding). Węzły Ethereum będą losowo próbkować dane transakcji dostarczone w blobach, korzystając z opisanego powyżej schematu nadmiarowości, aby upewnić się, że wszystkie dane istnieją. Tę samą technikę można by również zastosować, aby upewnić się, że producenci bloków udostępniają wszystkie swoje dane w celu zabezpieczenia lekkich klientów. Podobnie, w ramach [separacji proponującego i budującego (PBS)](/roadmap/pbs), tylko budowniczy bloków byłby zobowiązany do przetworzenia całego bloku – inne walidatory weryfikowałyby go za pomocą próbkowania dostępności danych.

### Komitety dostępności danych {#data-availability-committees}

Komitety dostępności danych (DAC) to zaufane strony, które zapewniają dostępność danych lub ją poświadczają. DAC mogą być używane zamiast lub [w połączeniu z](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Gwarancje bezpieczeństwa związane z komitetami zależą od konkretnej konfiguracji. Na przykład Ethereum używa losowo próbkowanych podzbiorów walidatorów do poświadczania dostępności danych dla lekkich węzłów.

DAC są również używane przez niektóre validia. DAC to zaufany zestaw węzłów, który przechowuje kopie danych w trybie offline. DAC jest zobowiązany do udostępnienia danych w przypadku sporu. Członkowie DAC publikują również poświadczenia onchain, aby udowodnić, że wspomniane dane są rzeczywiście dostępne. Niektóre validia zastępują DAC systemem walidatorów opartym na dowodzie stawki (PoS). W tym przypadku każdy może zostać walidatorem i przechowywać dane pozałańcuchowo. Muszą jednak wnieść „kaucję”, która jest deponowana w inteligentnym kontrakcie. W przypadku złośliwego zachowania, takiego jak zatajenie danych przez walidatora, kaucja może zostać poddana cięciu. Komitety dostępności danych oparte na dowodzie stawki są znacznie bezpieczniejsze niż zwykłe DAC, ponieważ bezpośrednio zachęcają do uczciwego zachowania.

## Dostępność danych a lekkie węzły {#data-availability-and-light-nodes}

[Lekkie węzły](/developers/docs/nodes-and-clients/light-clients) muszą weryfikować poprawność otrzymywanych nagłówków bloków bez pobierania danych bloku. Kosztem tej lekkości jest brak możliwości niezależnej weryfikacji nagłówków bloków poprzez ponowne lokalne wykonanie transakcji w sposób, w jaki robią to pełne węzły.

Lekkie węzły Ethereum ufają losowym zestawom 512 walidatorów, którzy zostali przydzieleni do _komitetu synchronizacyjnego_. Komitet synchronizacyjny działa jako DAC, który za pomocą kryptograficznego podpisu sygnalizuje lekkim klientom, że dane w nagłówku są poprawne. Każdego dnia komitet synchronizacyjny jest odświeżany. Każdy nagłówek bloku ostrzega lekkie węzły, których walidatorów należy się spodziewać przy podpisywaniu _następnego_ bloku, dzięki czemu nie można ich oszukać, by zaufały złośliwej grupie udającej prawdziwy komitet synchronizacyjny.

Co się jednak stanie, jeśli atakującemu w jakiś sposób _uda się_ przekazać złośliwy nagłówek bloku lekkim klientom i przekonać ich, że został on podpisany przez uczciwy komitet synchronizacyjny? W takim przypadku atakujący mógłby dołączyć nieprawidłowe transakcje, a lekki klient ślepo by je zaakceptował, ponieważ nie sprawdza niezależnie wszystkich zmian stanu podsumowanych w nagłówku bloku. Aby się przed tym uchronić, lekki klient mógłby użyć dowodów oszustwa.

Sposób działania tych dowodów oszustwa polega na tym, że pełny węzeł, widząc nieprawidłowe przejście stanu rozgłaszane w sieci, mógłby szybko wygenerować niewielki fragment danych wykazujący, że proponowane przejście stanu nie mogło powstać z danego zestawu transakcji, i rozesłać te dane do innych węzłów. Lekkie węzły mogłyby przechwycić te dowody oszustwa i użyć ich do odrzucenia złych nagłówków bloków, upewniając się, że pozostają na tym samym uczciwym łańcuchu co pełne węzły.

Opiera się to na tym, że pełne węzły mają dostęp do pełnych danych transakcji. Atakujący, który rozgłasza zły nagłówek bloku, a jednocześnie nie udostępnia danych transakcji, byłby w stanie uniemożliwić pełnym węzłom generowanie dowodów oszustwa. Pełne węzły mogłyby zasygnalizować ostrzeżenie o złym bloku, ale nie mogłyby poprzeć swojego ostrzeżenia dowodem, ponieważ dane nie zostały udostępnione do wygenerowania dowodu!

Rozwiązaniem tego problemu dostępności danych jest DAS. Lekkie węzły pobierają bardzo małe, losowe fragmenty pełnych danych stanu i używają tych próbek do weryfikacji, czy dostępny jest pełny zestaw danych. Rzeczywiste prawdopodobieństwo błędnego założenia pełnej dostępności danych po pobraniu N losowych fragmentów można obliczyć ([dla 100 fragmentów szansa wynosi 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), czyli jest to niezwykle mało prawdopodobne).

Nawet w tym scenariuszu ataki polegające na zatajeniu zaledwie kilku bajtów mogłyby prawdopodobnie pozostać niezauważone przez klientów wysyłających losowe żądania danych. Kodowanie wymazań rozwiązuje ten problem poprzez rekonstrukcję małych brakujących fragmentów danych, które można wykorzystać do sprawdzenia proponowanych zmian stanu. Dowód oszustwa mógłby następnie zostać skonstruowany przy użyciu zrekonstruowanych danych, zapobiegając akceptowaniu złych nagłówków przez lekkie węzły.

**Uwaga:** DAS i dowody oszustwa nie zostały jeszcze zaimplementowane dla lekkich klientów Ethereum opartych na dowodzie stawki, ale znajdują się na mapie drogowej, najprawdopodobniej w formie dowodów opartych na ZK-SNARK. Dzisiejsi lekcy klienci polegają na formie DAC: weryfikują tożsamość komitetu synchronizacyjnego, a następnie ufają otrzymanym podpisanym nagłówkom bloków.

## Dostępność danych a rollupy warstwy 2 {#data-availability-and-layer-2-rollups}

[Rozwiązania skalujące warstwy 2](/layer-2/), takie jak [rollupy](/glossary/#rollups), zmniejszają koszty transakcji i zwiększają przepustowość Ethereum poprzez przetwarzanie transakcji pozałańcuchowo. Transakcje rollupów są kompresowane i publikowane w Ethereum w partiach. Partie reprezentują tysiące pojedynczych transakcji pozałańcuchowych w jednej transakcji w Ethereum. Zmniejsza to zatory w warstwie bazowej i obniża opłaty dla użytkowników.

Jednak zaufanie do „podsumowujących” transakcji publikowanych w Ethereum jest możliwe tylko wtedy, gdy proponowana zmiana stanu może zostać niezależnie zweryfikowana i potwierdzona jako wynik zastosowania wszystkich pojedynczych transakcji pozałańcuchowych. Jeśli operatorzy rollupów nie udostępnią danych transakcji do tej weryfikacji, mogliby wysłać nieprawidłowe dane do Ethereum.

[Optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups/) publikują skompresowane dane transakcji w Ethereum i czekają przez pewien czas (zazwyczaj 7 dni), aby umożliwić niezależnym weryfikatorom sprawdzenie danych. Jeśli ktoś zidentyfikuje problem, może wygenerować dowód oszustwa i użyć go do zakwestionowania rollupa. Spowodowałoby to cofnięcie łańcucha i pominięcie nieprawidłowego bloku. Jest to możliwe tylko wtedy, gdy dane są dostępne. Obecnie istnieją dwa sposoby, w jakie optymistyczne rollupy publikują dane transakcji w warstwie 1 (L1). Niektóre rollupy udostępniają dane na stałe jako `CALLDATA`, które żyją na stałe onchain. Wraz z wdrożeniem EIP-4844, niektóre rollupy publikują swoje dane transakcji w tańszym magazynie blobów. Nie jest to stałe przechowywanie. Niezależni weryfikatorzy muszą odpytywać bloby i zgłaszać swoje zastrzeżenia w ciągu ~18 dni, zanim dane zostaną usunięte z warstwy 1 (L1) Ethereum. Dostępność danych jest gwarantowana przez protokół Ethereum tylko w tym krótkim, stałym oknie czasowym. Po tym czasie staje się to obowiązkiem innych podmiotów w ekosystemie Ethereum. Każdy węzeł może zweryfikować dostępność danych za pomocą DAS, tj. pobierając małe, losowe próbki danych bloba.

[Rollupy z wiedzą zerową (ZK)](/developers/docs/scaling/zk-rollups) nie muszą publikować danych transakcji, ponieważ [dowody ważności z wiedzą zerową](/glossary/#zk-proof) gwarantują poprawność przejść stanu. Jednak dostępność danych nadal stanowi problem, ponieważ nie możemy zagwarantować funkcjonalności rollupa ZK (ani wchodzić z nim w interakcje) bez dostępu do jego danych stanu. Na przykład użytkownicy nie mogą znać swoich sald, jeśli operator zatai szczegóły dotyczące stanu rollupa. Ponadto nie mogą oni wykonywać aktualizacji stanu przy użyciu informacji zawartych w nowo dodanym bloku.

## Dostępność danych a możliwość odzyskiwania danych {#data-availability-vs-data-retrievability}

Dostępność danych różni się od możliwości odzyskiwania danych. Dostępność danych to pewność, że pełne węzły miały dostęp do pełnego zestawu transakcji powiązanych z określonym blokiem i mogły go zweryfikować. Nie oznacza to jednak, że dane są dostępne na zawsze.

Możliwość odzyskiwania danych to zdolność węzłów do pobierania _historycznych informacji_ z blockchaina. Te historyczne dane nie są potrzebne do weryfikacji nowych bloków, są wymagane tylko do synchronizacji pełnych węzłów od bloku genezy lub obsługi określonych żądań historycznych.

Główny protokół Ethereum zajmuje się przede wszystkim dostępnością danych, a nie możliwością ich odzyskiwania. Możliwość odzyskiwania danych może być zapewniona przez niewielką populację węzłów archiwalnych prowadzonych przez strony trzecie lub może być rozproszona w sieci przy użyciu zdecentralizowanego przechowywania plików, takiego jak [Portal Network](https://www.ethportal.net/).

## Dalsza lektura {#further-reading}

- [Czym do cholery jest dostępność danych?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Czym jest dostępność danych?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Wprowadzenie do sprawdzania dostępności danych](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Wyjaśnienie propozycji sharding + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Notatka o dostępności danych i kodowaniu wymazań](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Komitety dostępności danych.](https://medium.com/starkware/data-availability-e5564c416424)
- [Komitety dostępności danych oparte na dowodzie stawki.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Rozwiązania problemu możliwości odzyskiwania danych](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Dostępność danych, czyli: jak rollupy przestały się martwiować i pokochały Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Zwiększenie kosztu danych wywołania](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)