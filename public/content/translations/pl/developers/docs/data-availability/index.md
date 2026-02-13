---
title: "Dostępność danych"
description: "Przegląd problemów i rozwiązań związanych z dostępnością danych w Ethereum"
lang: pl
---

„Nie ufaj, weryfikuj” to popularna maksyma w Ethereum. Ideą jest, aby węzeł mógł samodzielnie zweryfikować poprawność otrzymywanych informacji, wykonując wszystkie transakcje z bloków otrzymanych od peerów, aby upewnić się, że proponowane zmiany dokładnie odpowiadają tym obliczonym niezależnie przez węzeł. Oznacza to, że węzły nie muszą ufać, że nadawcy bloku są uczciwi. Nie jest to możliwe, jeśli brakuje danych.

**Dostępność danych** odnosi się do pewności, jaką użytkownik może mieć co do tego, że dane wymagane do zweryfikowania bloku są rzeczywiście dostępne dla wszystkich uczestników sieci. W przypadku pełnych węzłów w warstwie 1 Ethereum jest to stosunkowo proste; pełny węzeł pobiera kopię wszystkich danych z każdego bloku – dane _muszą_ być dostępne, aby pobieranie było możliwe. Blok z brakującymi danymi zostałby odrzucony, a nie dodany do blockchaina. Jest to „dostępność danych on-chain” i jest to cecha monolitycznych blockchainów. Pełnych węzłów nie da się oszukać, aby zaakceptowały nieprawidłowe transakcje, ponieważ same pobierają i wykonują każdą transakcję. Jednakże w przypadku modułowych blockchainów, rollupów warstwy 2 i lekkich klientów krajobraz dostępności danych jest bardziej złożony i wymaga bardziej zaawansowanych procedur weryfikacyjnych.

## Wymagania wstępne {#prerequisites}

Należy dobrze rozumieć [podstawy technologii blockchain](/developers/docs/intro-to-ethereum/), a zwłaszcza [mechanizmy konsensusu](/developers/docs/consensus-mechanisms/). Ta strona zakłada również, że czytelnik jest zaznajomiony z [blokami](/developers/docs/blocks/), [transakcjami](/developers/docs/transactions/), [węzłami](/developers/docs/nodes-and-clients/), [rozwiązaniami skalującymi](/developers/docs/scaling/) i innymi istotnymi tematami.

## Problem dostępności danych {#the-data-availability-problem}

Problem dostępności danych to potrzeba udowodnienia całej sieci, że podsumowana forma niektórych danych transakcji dodawanych do blockchaina rzeczywiście reprezentuje zestaw prawidłowych transakcji, ale bez wymagania od wszystkich węzłów pobierania wszystkich danych. Pełne dane transakcji są niezbędne do niezależnej weryfikacji bloków, ale wymaganie od wszystkich węzłów pobierania wszystkich danych transakcji stanowi barierę dla skalowania. Rozwiązania problemu dostępności danych mają na celu zapewnienie uczestnikom sieci, którzy sami nie pobierają i nie przechowują danych, wystarczających gwarancji, że pełne dane transakcji zostały udostępnione do weryfikacji.

[Lekkie węzły](/developers/docs/nodes-and-clients/light-clients) i [rollupy warstwy 2](/developers/docs/scaling) są ważnymi przykładami uczestników sieci, którzy wymagają silnych gwarancji dostępności danych, ale nie mogą sami pobierać i przetwarzać danych transakcji. Unikanie pobierania danych transakcji jest tym, co sprawia, że lekkie węzły są „lekkie” i pozwala rollupom być skutecznymi rozwiązaniami skalującymi.

Dostępność danych jest również kluczową kwestią dla przyszłych [„bezstanowych”](/roadmap/statelessness) klientów Ethereum, którzy nie muszą pobierać i przechowywać danych o stanie, aby weryfikować bloki. Klienci bezstanowi nadal muszą mieć pewność, że dane są _gdzieś_ dostępne i że zostały poprawnie przetworzone.

## Rozwiązania problemu dostępności danych {#data-availability-solutions}

### Próbkowanie dostępności danych (DAS) {#data-availability-sampling}

Próbkowanie dostępności danych (DAS) to sposób, w jaki sieć może sprawdzić, czy dane są dostępne, nie obciążając zbytnio żadnego pojedynczego węzła. Każdy węzeł (w tym węzły niestakujące) pobiera niewielki, losowo wybrany podzbiór wszystkich danych. Pomyślne pobranie próbek potwierdza z dużą pewnością, że wszystkie dane są dostępne. Opiera się to na kodowaniu wymazującym danych, które rozszerza dany zestaw danych o nadmiarowe informacje (odbywa się to poprzez dopasowanie funkcji znanej jako _wielomian_ do danych i obliczenie wartości tego wielomianu w dodatkowych punktach). Pozwala to w razie potrzeby na odzyskanie oryginalnych danych z danych nadmiarowych. Konsekwencją tego tworzenia danych jest to, że jeśli _jakakolwiek_ część oryginalnych danych jest niedostępna, będzie brakować _połowy_ rozszerzonych danych! Ilość próbek danych pobieranych przez każdy węzeł można dostosować tak, aby było _niezwykle_ prawdopodobne, że będzie brakować co najmniej jednego z fragmentów danych próbkowanych przez każdego klienta, _jeśli_ faktycznie dostępna jest mniej niż połowa danych.

DAS będzie używane do zapewnienia, że operatorzy rollupów udostępniają swoje dane transakcyjne po wdrożeniu [pełnego Dankshardingu](/roadmap/danksharding/#what-is-danksharding). Węzły Ethereum będą losowo próbkować dane transakcyjne dostarczone w obiektach blob, używając wyjaśnionego powyżej schematu nadmiarowości, aby upewnić się, że wszystkie dane istnieją. Tę samą technikę można by również zastosować, aby zapewnić, że producenci bloków udostępniają wszystkie swoje dane bezpiecznym lekkim klientom. Podobnie, w ramach [separacji proponującego od budowniczego](/roadmap/pbs), tylko budowniczy bloku byłby zobowiązany do przetworzenia całego bloku – inni walidatorzy dokonywaliby weryfikacji za pomocą próbkowania dostępności danych.

### Komitety ds. dostępności danych {#data-availability-committees}

Komitety ds. dostępności danych (DAC) to zaufane podmioty, które zapewniają lub poświadczają dostępność danych. Komitety DAC mogą być używane zamiast, [lub w połączeniu z](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Gwarancje bezpieczeństwa zapewniane przez komitety zależą od konkretnej konfiguracji. Na przykład Ethereum wykorzystuje losowo wybrane podzbiory walidatorów do poświadczania dostępności danych dla lekkich węzłów.

Komitety DAC są również używane przez niektóre validium. DAC to zaufany zestaw węzłów, który przechowuje kopie danych w trybie offline. Komitet DAC jest zobowiązany do udostępnienia danych w przypadku sporu. Członkowie komitetu DAC publikują również poświadczenia on-chain, aby udowodnić, że wspomniane dane są rzeczywiście dostępne. Niektóre validium zastępują komitety DAC systemem walidatorów opartym na dowodzie stawki (PoS). W tym przypadku każdy może zostać walidatorem i przechowywać dane w trybie off-chain. Muszą jednak zapewnić „zabezpieczenie” (bond), które jest zdeponowane w inteligentnym kontrakcie. W przypadku złośliwego zachowania, takiego jak wstrzymywanie danych przez walidatora, zabezpieczenie może zostać obcięte (slashing). Komitety ds. dostępności danych oparte na dowodzie stawki są znacznie bezpieczniejsze niż zwykłe komitety DAC, ponieważ bezpośrednio motywują do uczciwego zachowania.

## Dostępność danych i lekkie węzły {#data-availability-and-light-nodes}

[Lekkie węzły](/developers/docs/nodes-and-clients/light-clients) muszą weryfikować poprawność otrzymywanych nagłówków bloków bez pobierania danych bloku. Ceną tej „lekkości” jest niemożność niezależnej weryfikacji nagłówków bloków poprzez ponowne lokalne wykonanie transakcji w taki sam sposób, w jaki robią to pełne węzły.

Lekkie węzły Ethereum ufają losowym zestawom 512 walidatorów, którzy zostali przypisani do _komitetu synchronizacyjnego_. Komitet synchronizacyjny działa jako DAC, który sygnalizuje lekkim klientom za pomocą podpisu kryptograficznego, że dane w nagłówku są prawidłowe. Każdego dnia komitet synchronizacyjny jest odświeżany. Każdy nagłówek bloku informuje lekkie węzły, którzy walidatorzy mają podpisać _następny_ blok, więc nie mogą one zostać oszukane i zaufać złośliwej grupie udającej prawdziwy komitet synchronizacyjny.

Co się jednak stanie, jeśli atakującemu _uda się_ przekazać złośliwy nagłówek bloku lekkim klientom i przekonać ich, że został on podpisany przez uczciwy komitet synchronizacyjny? W takim przypadku atakujący mógłby zawrzeć nieprawidłowe transakcje, a lekki klient zaakceptowałby je na ślepo, ponieważ nie sprawdza on niezależnie wszystkich zmian stanu podsumowanych w nagłówku bloku. Aby się przed tym zabezpieczyć, lekki klient może używać dowodów oszustwa.

Dowody oszustwa działają w ten sposób, że pełny węzeł, widząc nieprawidłowe przejście stanu rozgłaszane w sieci, może szybko wygenerować mały fragment danych, który wykaże, że proponowane przejście stanu nie mogło powstać z danego zestawu transakcji, i rozgłosić te dane do peerów. Lekkie węzły mogłyby odebrać te dowody oszustwa i użyć ich do odrzucenia nieprawidłowych nagłówków bloków, zapewniając, że pozostaną na tym samym uczciwym łańcuchu co pełne węzły.

Wymaga to, aby pełne węzły miały dostęp do pełnych danych transakcji. Atakujący, który rozgłasza nieprawidłowy nagłówek bloku, a także nie udostępnia danych transakcji, byłby w stanie uniemożliwić pełnym węzłom generowanie dowodów oszustwa. Pełne węzły mogłyby zasygnalizować ostrzeżenie o nieprawidłowym bloku, ale nie mogłyby poprzeć swojego ostrzeżenia dowodem, ponieważ dane potrzebne do jego wygenerowania nie zostały udostępnione!

Rozwiązaniem tego problemu dostępności danych jest DAS. Lekkie węzły pobierają bardzo małe, losowe fragmenty pełnych danych o stanie i używają próbek do weryfikacji, czy pełny zestaw danych jest dostępny. Rzeczywiste prawdopodobieństwo błędnego założenia pełnej dostępności danych po pobraniu N losowych fragmentów można obliczyć ([dla 100 fragmentów szansa wynosi 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), czyli jest niewiarygodnie małe).

Nawet w tym scenariuszu ataki polegające na wstrzymaniu zaledwie kilku bajtów mogłyby pozostać niezauważone przez klientów wysyłających losowe żądania danych. Kodowanie wymazujące naprawia to poprzez rekonstrukcję małych brakujących fragmentów danych, które można wykorzystać do sprawdzenia proponowanych zmian stanu. Dowód oszustwa można by następnie skonstruować przy użyciu zrekonstruowanych danych, uniemożliwiając lekkim węzłom akceptowanie nieprawidłowych nagłówków.

**Uwaga:** DAS i dowody oszustwa nie zostały jeszcze wdrożone dla lekkich klientów Ethereum opartych na dowodzie stawki, ale znajdują się w planie działania i najprawdopodobniej przyjmą formę dowodów opartych na ZK-SNARK. Dzisiejsze lekkie klienty polegają na pewnej formie komitetu DAC: weryfikują tożsamość członków komitetu synchronizacyjnego, a następnie ufają otrzymywanym podpisanym nagłówkom bloków.

## Dostępność danych i rollupy warstwy 2 {#data-availability-and-layer-2-rollups}

[Rozwiązania skalujące warstwy 2](/layer-2/), takie jak [rollupy](/glossary/#rollups), zmniejszają koszty transakcji i zwiększają przepustowość Ethereum poprzez przetwarzanie transakcji w trybie off-chain. Transakcje rollup są kompresowane i publikowane w Ethereum w partiach. Partie reprezentują tysiące pojedynczych transakcji off-chain w ramach jednej transakcji w Ethereum. Zmniejsza to przeciążenie w warstwie podstawowej i obniża opłaty dla użytkowników.

Jednakże zaufanie do transakcji „podsumowujących” publikowanych w Ethereum jest możliwe tylko wtedy, gdy proponowana zmiana stanu może być niezależnie zweryfikowana i potwierdzona jako wynik zastosowania wszystkich pojedynczych transakcji off-chain. Jeśli operatorzy rollupów nie udostępnią danych transakcji do tej weryfikacji, mogliby wysyłać nieprawidłowe dane do Ethereum.

[Rollupy optymistyczne](/developers/docs/scaling/optimistic-rollups/) publikują skompresowane dane transakcji w Ethereum i czekają przez pewien czas (zazwyczaj 7 dni), aby umożliwić niezależnym weryfikatorom sprawdzenie danych. Jeśli ktoś zidentyfikuje problem, może wygenerować dowód oszustwa i użyć go do zakwestionowania rollupu. Spowodowałoby to wycofanie zmian w łańcuchu i pominięcie nieprawidłowego bloku. Jest to możliwe tylko wtedy, gdy dane są dostępne. Obecnie istnieją dwa sposoby, w jakie rollupy optymistyczne publikują dane transakcji w L1. Niektóre rollupy udostępniają dane na stałe jako `CALLDATA`, które na stałe pozostają w łańcuchu (on-chain). Wraz z wdrożeniem EIP-4844 niektóre rollupy zamiast tego publikują swoje dane transakcyjne w tańszej pamięci masowej blob. Nie jest to pamięć trwała. Niezależni weryfikatorzy muszą odpytywać obiekty blob i zgłaszać swoje zastrzeżenia w ciągu ok. 18 dni, zanim dane zostaną usunięte z warstwy 1 Ethereum. Dostępność danych jest gwarantowana przez protokół Ethereum tylko w tym krótkim, stałym oknie czasowym. Po tym czasie staje się to obowiązkiem innych podmiotów w ekosystemie Ethereum. Każdy węzeł może zweryfikować dostępność danych za pomocą DAS, tzn. pobierając małe, losowe próbki danych z obiektu blob.

[Rollupy o zerowej wiedzy (ZK)](/developers/docs/scaling/zk-rollups) nie muszą publikować danych transakcji, ponieważ [dowody ważności o zerowej wiedzy](/glossary/#zk-proof) gwarantują poprawność przejść stanów. Jednakże dostępność danych nadal stanowi problem, ponieważ nie możemy zagwarantować funkcjonalności rollupu ZK (ani wchodzić z nim w interakcje) bez dostępu do jego danych o stanie. Na przykład użytkownicy nie mogą poznać swoich sald, jeśli operator wstrzymuje szczegóły dotyczące stanu rollupu. Nie mogą również wykonywać aktualizacji stanu, używając informacji zawartych w nowo dodanym bloku.

## Dostępność danych a odzyskiwalność danych {#data-availability-vs-data-retrievability}

Dostępność danych różni się od odzyskiwalności danych. Dostępność danych to zapewnienie, że pełne węzły były w stanie uzyskać dostęp i zweryfikować pełny zestaw transakcji powiązanych z określonym blokiem. Niekoniecznie oznacza to, że dane są dostępne na zawsze.

Odzyskiwalność danych to zdolność węzłów do pobierania _informacji historycznych_ z blockchaina. Te dane historyczne nie są potrzebne do weryfikacji nowych bloków, są wymagane tylko do synchronizacji pełnych węzłów od bloku genezy lub obsługi określonych żądań historycznych.

Podstawowy protokół Ethereum dotyczy przede wszystkim dostępności danych, a nie ich odzyskiwalności. Odzyskiwalność danych może być zapewniona przez niewielką populację węzłów archiwalnych prowadzonych przez strony trzecie lub może być rozproszona w całej sieci przy użyciu zdecentralizowanej pamięci masowej, takiej jak [Portal Network](https://www.ethportal.net/).

## Dalsza lektura {#further-reading}

- [O co chodzi z dostępnością danych?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Czym jest dostępność danych?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Wprowadzenie do kontroli dostępności danych](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Wyjaśnienie propozycji shardingu i DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Uwagi na temat dostępności danych i kodowania wymazującego](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Komitety ds. dostępności danych.](https://medium.com/starkware/data-availability-e5564c416424)
- [Komitety ds. dostępności danych oparte na dowodzie stawki.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Rozwiązania problemu odzyskiwalności danych](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Dostępność danych, czyli jak rollupy nauczyły się nie martwić i pokochały Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Zwiększenie kosztu Calldata](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
