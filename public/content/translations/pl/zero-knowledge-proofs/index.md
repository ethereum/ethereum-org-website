---
title: Pakiety zbiorcze o wiedzy zerowej
description: Nietechniczne wprowadzenie do dowodów wiedzy zerowej dla początkujących.
lang: pl
---

# Czym są dowody wiedzy zerowej? {#what-are-zk-proofs}

Dowód o wiedzy zerowej to sposób na udowodnienie ważności stwierdzenia bez ujawniania samego stwierdzenia. „Udowadniający” jest stroną próbującą udowodnić twierdzenie, podczas gdy „weryfikator” jest odpowiedzialny za walidację twierdzenia.

Dowody wiedzy zerowej pojawiły się po raz pierwszy w artykule z 1985 r. pt. „[Złożoność wiedzy interaktywnych systemów dowodowych](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)”, który zawiera definicję dowodów wiedzy zerowej szeroko stosowanych obecnie:

> Protokół wiedzy zerowej to metoda, za pomocą której jedna strona (udowadniający) może udowodnić drugiej stronie (weryfikatorowi), że coś jest prawdą, bez ujawniania jakichkolwiek informacji poza faktem, że to konkretne stwierdzenie jest prawdziwe.

Dowody wiedzy zerowej zostały udoskonalone na przestrzeni lat i są obecnie wykorzystywane w wielu rzeczywistych zastosowaniach.

## Dlaczego potrzebujemy dowodów o wiedzy zerowej? {#why-zero-knowledge-proofs-are-important}

Dowody wiedzy zerowej stanowiły przełom w stosowanej kryptografii, ponieważ obiecywały poprawę bezpieczeństwa informacji dla osób fizycznych. Zastanów się, w jaki sposób możesz udowodnić stwierdzenie (np. „Jestem obywatelem kraju X”) innej stronie (np. usługodawcy). Musiałbyś przedstawić „dowody” na poparcie swojego stwierdzenia, takie jak paszport lub prawo jazdy.

Z takim podejściem wiążą się jednak z pewne problemy, przede wszystkim z brak prywatności. Dane osobowe (PII) udostępniane usługom stron trzecich są przechowywane w centralnych bazach danych, które są podatne na ataki hakerskie. Ponieważ kradzież tożsamości staje się krytycznym problemem, pojawiają się prośby o bardziej chroniące prywatność sposoby udostępniania poufnych informacji.

Dowody wiedzy zerowej rozwiązują ten problem, eliminując potrzebę ujawniania informacji do udowodnienia prawdziwości twierdzeń. Protokół wiedzy zerowej wykorzystuje stwierdzenie (zwane „świadkiem”) jako dane wejściowe do wygenerowania treściwego dowodu jego prawdziwości. Dowód ten oferuje silne gwarancje, że stwierdzenie jest prawdziwe bez ujawniania informacji użytych do jego stworzenia.

Wracając do naszego wcześniejszego przykładu, jedynym dowodem potrzebnym do udowodnienia stwierdzenia o obywatelstwie jest dowód wiedzy zerowej. Weryfikator musi jedynie sprawdzić, czy pewne właściwości dowodu są prawdziwe, aby być przekonanym, że podstawowe stwierdzenie jest również prawdziwe.

## Jak działają dowody wiedzy zerowej? {#how-do-zero-knowledge-proofs-work}

Dowód wiedzy zerowej pozwala udowodnić prawdziwość stwierdzenia bez dzielenia się jego treścią lub ujawniania sposobu, w jaki odkryłeś prawdę. Aby było to możliwe, protokoły wiedzy zerowej opierają się na algorytmach, które biorą pewne dane jako dane wejściowe i zwracają „prawdę” lub „fałsz” jako dane wyjściowe.

Protokół wiedzy zerowej musi spełniać następujące kryteria:

1. **Kompletność**: Jeśli dane wejściowe są prawidłowe, protokół wiedzy zerowej zawsze zwraca wartość „prawda”. Dlatego też, jeśli podstawowe stwierdzenie jest prawdziwe, a udowadniający i weryfikujący zachowują się uczciwie, dowód może zostać zaakceptowany.

2. **Solidność**: Jeśli dane wejściowe są nieprawidłowe, teoretycznie niemożliwe jest oszukanie protokołu wiedzy zerowej, aby zwrócił „prawdę”. Dlatego też, kiedy udowadniający kłamie, nie może oszukać uczciwego weryfikatora, aby uwierzył, że nieprawidłowe stwierdzenie jest prawidłowe (poza małym marginesem prawdopodobieństwa).

3. **Zerowa wiedza**: Weryfikator nie dowiaduje się niczego o stwierdzeniu poza jego prawidłowością lub fałszywością (ma „zerową wiedzę” na temat stwierdzenia). Wymóg ten uniemożliwia również weryfikatorowi uzyskanie oryginalnych danych wejściowych (treści stwierdzenia) z dowodu.

W formie podstawowej dowód wiedzy zerowej składa się z trzech elementów: **świadka**, **wyzwania** i **odpowiedzi**.

- **Świadek**: W przypadku dowodu wiedzy zerowej, udowadniający chce udowodnić wiedzę pewnej ukrytej informacji. Ta tajna informacja jest „świadkiem” dowodu, a zakładana wiedza udowadniającego o świadku ustanawia zestaw pytań, na które może odpowiedzieć tylko strona posiadająca wiedzę o informacji. W ten sposób udowadniający rozpoczyna proces udowadniania, losowo wybierając pytanie, obliczając odpowiedź i wysyłając ją do weryfikatora.

- **Wyzwanie**: Weryfikator losowo wybiera kolejne pytanie ze zbioru i prosi udowadniającego o udzielenie na nie odpowiedzi.

- **Odpowiedź**: Udowadniający akceptuje pytanie, oblicza odpowiedź i zwraca ją do weryfikatora. Odpowiedź udowadniającego pozwala weryfikatorowi sprawdzić, czy ten pierwszy rzeczywiście ma dostęp do świadka. Aby upewnić się, że udowadniający nie zgaduje na ślepo i nie otrzymuje poprawnych odpowiedzi przez przypadek, weryfikator wybiera więcej pytań do zadania. Powtarzając tę interakcję wiele razy, prawdopodobieństwo, że udowadniający fałszuje wiedzę świadka, znacznie spada, dopóki weryfikator nie będzie usatysfakcjonowany.

Powyżej opisano strukturę „interaktywnego dowodu wiedzy zerowej”. Wczesne protokoły wiedzy zerowej wykorzystywały interaktywne udowadnianie, w którym weryfikacja poprawności stwierdzenia wymagała komunikacji w obie strony między udowadniającym i weryfikującym.

Dobrym przykładem ilustrującym działanie interaktywnych dowodów jest słynna [historia jaskini Ali Baby](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) Jeana-Jacquesa Quisquatera. W tej historii Peggy (udowadniająca) chce udowodnić Victorowi (weryfikującemu), że zna sekretną frazę otwierającą magiczne drzwi bez ujawniania tej frazy.

### Nieinteraktywne dowody wiedzy zerowej {#non-interactive-zero-knowledge-proofs}

Interaktywne udowadnianie, choć jest rewolucyjne, miało ograniczoną użyteczność, ponieważ wymagało od obu stron bycia dostępnym i wielokrotnej interakcji. Nawet jeśli weryfikator był przekonany o uczciwości udowadniającego, dowód byłby niedostępny do niezależnej weryfikacji (obliczenie nowego dowodu wymagałoby nowego zestawu wiadomości między udowadniającym a weryfikującym).

Aby rozwiązać ten problem, Manuel Blum, Paul Feldman i Silvio Micali zaproponowali pierwsze [nieinteraktywne dowody wiedzy zerowej](https://dl.acm.org/doi/10.1145/62212.62222), w których udowadniający i weryfikujący mają wspólny klucz. Pozwala to udowadniającemu zademonstrować swoją wiedzę na temat pewnych informacji (tj. świadka) bez podawania samych informacji.

W odróżnieniu od dowodów interaktywnych dowody nieinteraktywne wymagały tylko jednej rundy komunikacji między uczestnikami (udowadniającym i weryfikującym). Udowadniający przekazuje tajną informację specjalnemu algorytmowi w celu obliczenia dowodu wiedzy zerowej. Ten dowód jest wysyłany do weryfikatora, który sprawdza, czy udowadniający zna tajną informację, używając innego algorytmu.

Udowadnianie nieinteraktywne zmniejsza komunikację między udowadniającym a weryfikującym, dzięki czemu dowody wiedzy zerowej są wydajniejsze. Co więcej, po wygenerowaniu dowodu jest on dostępny dla każdego (z dostępem do wspólnego klucza i algorytmu weryfikującego) do zweryfikowania.

Nieinteraktywne dowody stanowiły przełom w technologii wiedzy zerowej i zainicjowały rozwój stosowanych obecnie systemów udowadniania. Omówimy te rodzaje dowodów poniżej:

### Rodzaje dowodów wiedzy zerowej {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK to skrót od **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Zwięzły i nieinteraktywny dowód oparty o wiedzę zerową). Protokół ZK-SNARK ma następujące właściwości:

- **Zerowa wiedza (Zero-knowledge)**: Weryfikator może sprawdzić prawdziwość stwierdzenia, nie wiedząc o nim nic więcej. Jedyną wiedzą, jaką ma weryfikator na temat stwierdzenia, jest to, czy jest ono prawdziwe, czy fałszywe.

- **Zwięzły (Succint)**: Dowód wiedzy zerowej jest krótszy niż świadek i może być szybko sprawdzony.

- **Nieinteraktywny (Non-interactive)**: Dowód jest „nieinteraktywny”, ponieważ udowadniający i weryfikujący wchodzą w interakcję tylko raz, w przeciwieństwie do interaktywnych dowodów, które wymagają wielu rund komunikacji.

- **Argument**: Dowód spełnia wymóg „solidności”, więc oszukiwanie jest niezwykle mało prawdopodobne.

- **Wiedza ((Of) Knowledge)**: Dowód wiedzy zerowej nie może być stworzony bez dostępu do tajnej informacji (świadka). Jest to trudne, jeśli w ogóle możliwe, żeby udowadniający, który nie ma świadka, mógł obliczyć prawidłowy dowód wiedzy zerowej.

„Wspólny klucz” wspomniany wcześniej odnosi się do publicznych parametrów, które udowadniający i weryfikujący zgadzają się wykorzystać do generowania i weryfikacji dowodów. Generowanie publicznych parametrów (znanych jako Wspólny Ciąg Odniesienia (CRS)) jest operacją wrażliwą ze względu na jej znaczenie dla bezpieczeństwa protokołu. Jeśli entropia (losowość) użyta do wygenerowania CRS dostanie się w ręce nieuczciwego udowadniającego, może on obliczyć fałszywe dowody.

[Obliczenia wielostronne (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) to sposób na zmniejszenie ryzyka związanego z generowaniem publicznych parametrów. Wiele stron uczestniczy w [zaufanej ceremonii konfiguracji](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), podczas której każda osoba wnosi pewne losowe wartości w celu wygenerowania CRS. Tak długo, jak jedna uczciwa strona niszczy swoją część entropii, protokół ZK-SNARK zachowuje solidność obliczeniową.

Zaufane konfiguracje wymagają od użytkowników zaufania uczestnikom w generacji parametrów. Jednak rozwój ZK-STARK umożliwił udowodnienie protokołów, które działają z niezaufaną konfiguracją.

#### ZK-STARKs {#zk-starks}

ZK-STARK to skrót od **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Skalowalny i transparentny dowód oparty o wiedzę zerową). Dowody ZK-STARK są podobne do ZK-SNARK, z wyjątkiem tego, że są:

- **Skalowalne (Scalable)**: ZK-STARK jest szybszy w generowaniu i weryfikacji dowodów niż ZK-SNARK, gdy rozmiar świadka jest większy. Z dowodami STARK czasy udowadniania i weryfikacji rosną tylko nieznacznie wraz ze wzrostem rozmiaru świadka (czasy udowadniania i weryfikacji dowodów SNARK rosną liniowo wraz ze wzrostem świadka).

- **Transparentne (Transparent)**: ZK-STARK opiera się na publicznie weryfikowalnej losowości do generowania publicznych parametrów do udowadniania i weryfikacji zamiast na zaufanej konfiguracji. Dzięki temu są one bardziej transparentne w porównaniu do ZK-SNARK.

ZK-STARK generuje większe dowody niż ZK-SNARK, co oznacza, że najczęściej ma większe koszty weryfikacji. Istnieją jednak przypadki (takie jak udowadnianie dużych zbiorów danych), w których ZK-STARK może być bardziej opłacalny niż ZK-SNARK.

## Przypadki użycia dowodów wiedzy zerowej {#use-cases-for-zero-knowledge-proofs}

### Anonimowe płatności {#anonymous-payments}

Płatności kartą kredytową są często widoczne dla wielu podmiotów, w tym dla dostawcy usług płatniczych, banków i innych zainteresowanych podmiotów (np. organów rządowych). Chociaż nadzór finansowy przynosi korzyści w zakresie identyfikacji nielegalnych działalności, narusza on również prywatność zwykłych obywateli.

Kryptowaluty miały zapewnić użytkownikom środki do przeprowadzania prywatnych i bezpośrednich transakcji (peer-to-peer). Jednak większość transakcji kryptowalutowych jest otwarcie widoczna na publicznych blockchainach. Tożsamości użytkowników są często pseudonimami i są albo celowo powiązane z rzeczywistymi tożsamościami (np. poprzez posiadanie adresów ETH na profilu na Twitterze lub GitHubie), albo mogą być skojarzone z rzeczywistymi tożsamościami przy użyciu podstawowej analizy danych w łańcuchu i poza nim.

Istnieją specjalne „monety prywatności” zaprojektowane do całkowicie anonimowych transakcji. Blockchainy skupiające się na prywatności, takie jak Zcash czy Monero, chronią szczegóły transakcji, w tym adresy nadawcy/odbiorcy, rodzaje aktywów, ich ilości i czas transakcji.

Dzięki wbudowaniu technologii wiedzy zerowej do protokołu, sieci blockchain skupiające się na prywatności umożliwiają węzłom walidację transakcji bez potrzeby uzyskiwania dostępu do danych transakcji.

Dowody wiedzy zerowej są również stosowane do anonimizacji transakcji na publicznych blockchainach. Przykładem jest Tornado Cash, zdecentralizowana usługa non-custodial (nie ma bezpośredniego dostępu do aktywów użytkownika), która umożliwia użytkownikom przeprowadzanie prywatnych transakcji na Ethereum. Tornado Cash wykorzystuje dowody wiedzy zerowej do ukrywania szczegółów transakcji i gwarantowania prywatności finansowej. Niestety, ponieważ są to narzędzia prywatności typu „opt-in” to kojarzone są z nielegalną działalnością. Aby temu zaradzić, prywatność musi ostatecznie stać się rzeczą domyślną na publicznych blockchainach.

### Ochrona tożsamości {#identity-protection}

Obecne systemy zarządzania tożsamością narażają dane osobowe na ryzyko. Dowody wiedzy zerowej mogą pomóc osobom w weryfikacji tożsamości przy jednoczesnym ochranianiu poufnych danych.

Dowody wiedzy zerowej są szczególnie przydatne w kontekście [zdecentralizowanej tożsamości](/decentralized-identity/). Zdecentralizowana tożsamość (określana również jako „tożsamość suwerenna”) daje osobom możliwość kontrolowania dostępu do osobistych danych identyfikacyjnych. Potwierdzenie obywatelstwa bez konieczności ujawniania danych z identyfikatora podatkowego lub paszportu to dobry przykład tego, jak technologia wiedzy zerowej umożliwia zdecentralizowaną tożsamość.

### Uwierzytelnianie {#authentication}

Używanie usług online wymaga udowodnienia swojej tożsamości i prawa dostępu do tych platform. Często wymaga to podania danych osobowych, takich jak imię, adres e-mail, data urodzenia itp. Konieczne może być również zapamiętywanie długich haseł, co wiąże się z utratą dostępu.

Jednak dowody wiedzy zerowej mogą uprościć uwierzytelnianie zarówno dla platform, jak i użytkowników. Po wygenerowaniu dowodu wiedzy zerowej przy użyciu danych wejściowych publicznych (np. danych potwierdzających członkostwo użytkownika na platformie) i prywatnych (np. szczegółów użytkownika), użytkownik może po prostu przedstawić go w celu uwierzytelnienia swojej tożsamości, gdy musi uzyskać dostęp do usługi. Poprawia to wrażenia użytkowników i uwalnia organizacje od konieczności przechowywania ogromnych ilości danych użytkowników.

### Weryfikowalne obliczenia {#verifiable-computation}

Weryfikowalne obliczenia to kolejne zastosowanie technologii wiedzy zerowej do ulepszania designów blockchainów. Weryfikowalne obliczenia pozwalają nam zlecić obliczenia innemu podmiotowi przy jednoczesnym zachowaniu weryfikowalnych wyników. Podmiot przesyła wynik wraz z dowodem weryfikującym poprawność wykonania programu.

Weryfikowalne obliczenia mają kluczowe znaczenie dla poprawy szybkości przetwarzania blockchaiów bez zmniejszania bezpieczeństwa. Zrozumienie tego wymaga poznania różnic w proponowanych rozwiązaniach do skalowania Ethereum.

[Rozwiązania skalowania w łańcuchu](/developers/docs/scaling/#on-chain-scaling), takie jak sharding, wymagają rozległej modyfikacji warstwy bazowej blockchainu. Jednak podejście to jest bardzo skomplikowane, a błędy w implementacji mogą zaszkodzić modelowi bezpieczeństwa Ethereum.

[Rozwiązania skalowania poza łańcuchem](/developers/docs/scaling/#off-chain-scaling) nie wymagają przeprojektowywania głównego protokołu Ethereum. Zamiast tego polegają na zewnętrznym modelu obliczeniowym, aby poprawić przepustowość warstwy bazowej Ethereum.

Oto jak to wygląda w praktyce:

- Zamiast przetwarzać każdą transakcję, Ethereum przenosi wykonanie ich do oddzielnego łańcucha.

- Po przetworzeniu transakcji ten drugi łańcuch zwraca wyniki, które zostaną zastosowane do stanu Ethereum.

Zaletą tutaj jest to, że Ethereum nie musi wykonywać żadnych operacji i musi jedynie zastosować wyniki zleconych obliczeń do swojego stanu. Zmniejsza to przeciążenie sieci, a także poprawia szybkość transakcji (protokoły poza łańcuchem optymalizują pod kątem szybszego wykonywania).

Łańcuch potrzebuje sposobu na walidację transakcji poza łańcuchem bez ich ponownego wykonywania, w przeciwnym razie wartość wykonania poza łańcuchem zostanie utracona.

W tym miejscu wkraczają weryfikowalne obliczenia. Kiedy węzeł wykona transakcję poza Ethereum, przesyła dowód wiedzy zerowej, aby udowodnić poprawność wykonania poza łańcuchem. Ten dowód (nazywany [dowodem ważności](/glossary/#validity-proof)) gwarantuje, że transakcja jest poprawna, pozwalając Ethereum na zastosowanie wyniku do swojego stanu — bez czekania, aż ktoś to potwierdzi.

[Pakiety zbiorcze o wiedzy zerowej](/developers/docs/scaling/zk-rollups) i [validiumy](/developers/docs/scaling/validium/) są dwoma rozwiązaniami poza łańcuchowymi, które używają dowodów ważności do zapewnienia bezpiecznej skalowalności. Protokoły te wykonują tysiące transakcji poza łańcuchem i przesyłają dowody do weryfikacji na Ethereum. Wyniki te mogą być zastosowane natychmiast po zweryfikowaniu dowodu, pozwalając Ethereum na przetworzenie większej ilości transakcji bez zwiększania ilości obliczeń w warstwie bazowej.

### Ograniczenie łapówek i zmów w głosowaniach w łańcuchu {#secure-blockchain-voting}

Schematy głosowania na blockchainie mają wiele korzystnych cech: są w pełni kontrolowane, zabezpieczone przed atakami, odporne na cenzurę i wolne od ograniczeń geograficznych. Ale nawet schematy głosowania w łańcuchu nie są odporne na problem **zmów**.

Zdefiniowana jako „koordynowana w celu ograniczenia otwartej konkurencji poprzez zwodzenie, wyłudzanie i wprowadzanie w błąd innych”, zmowa może przybrać formę złośliwego czynnika wpływającego na głosowanie poprzez przekupstwo. Na przykład, Alice może otrzymać łapówkę od Boba, żeby zagłosowała na `opcję B` na karcie do głosowania, nawet jeśli ona preferuje `opcję A`.

Przekupstwo i zmowy ograniczają skuteczność każdego procesu, który wykorzystuje głosowanie jako mechanizm sygnalizacyjny (zwłaszcza gdy użytkownicy mogą udowodnić, jak głosowali). Może to mieć spore konsekwencje, zwłaszcza gdy głosy są odpowiedzialne za przydzielanie ograniczonych zasobów.

Na przykład [mechanizm finansowania kwadratowego](https://www.radicalxchange.org/concepts/plural-funding/) opiera się na darowiznach do zmierzenia preferencji dla określonych opcji wśród różnych projektów dóbr publicznych. Każda darowizna liczy się jako „głos” na konkretny projekt, przy czym projekty, które otrzymają więcej głosów, otrzymają więcej funduszy z puli.

Używanie głosowania w łańcuchu sprawia, że finansowanie kwadratowe jest wrażliwe na zmowy: transakcje na blockchainie są publiczne, więc przekupujący mogą sprawdzić aktywność swoich celów w łańcuchu, aby zobaczyć, jak „głosował”. W ten sposób finansowanie kwadratowe przestaje być skutecznym sposobem przydzielania środków na podstawie zagregowanych preferencji społeczności.

Na szczęście nowsze rozwiązania, takie jak MACI (Minimalna struktura antykolizyjna), wykorzystują dowody wiedzy zerowej, aby uczynić głosowanie w łańcuchu (np. mechanizmy finansowania kwadratowego) odpornym na przekupstwo i zmowy. MACI to zestaw inteligentnych kontraktów i skryptów, które umożliwiają centralnemu administratorowi (zwanego „koordynatorem”) agregowanie głosów i podliczanie wyników _bez_ ujawniania szczegółów o tym, jak głosowała każda osoba. Mimo to nadal możliwe jest weryfikowanie, czy głosy zostały policzone prawidłowo lub potwierdzić, że dana osoba uczestniczyła w rundzie głosowania.

#### Jak działa MACI z dowodami wiedzy zerowej? {#how-maci-works-with-zk-proofs}

Na początku koordynator wdraża kontrakt MACI na Ethereum, po czym użytkownicy mogą zarejestrować się do głosowania (rejestrując swój klucz publiczny w inteligentnym kontrakcie). Użytkownicy oddają głosy, wysyłając wiadomości zaszyfrowane ich kluczem publicznym do inteligentnego kontraktu (między innymi poprawny głos musi zostać podpisany najnowszym kluczem publicznym powiązanym z tożsamością użytkownika). Następnie koordynator przetwarza wszystkie wiadomości po zakończeniu okresu głosowania, podlicza głosy i weryfikuje wyniki w łańcuchu.

W MACI dowody wiedzy zerowej są wykorzystywane do zapewnienia poprawności obliczeń poprzez uniemożliwienie koordynatorowi nieprawidłowego przetwarzania głosów i podliczania wyników. Jest to osiągane poprzez wymaganie od koordynatora wygenerowania dowodu ZK-SNARK weryfikującego, że a) wszystkie wiadomości zostały poprawnie przetworzone b) końcowy wynik odpowiada sumie _poprawnych_ głosów.

Zatem nawet bez udostępniania podziału głosów na użytkownika (jak to zwykle ma miejsce), MACI gwarantuje uczciwość wyników obliczonych podczas procesu zliczania. Ta funkcja jest przydatna w ograniczaniu efektywności podstawowych schematów zmów. Możemy zbadać tę możliwość, używając poprzedniego przykładu Boba przekupującego Alice, żeby zagłosowała na daną opcję:

- Alice rejestruje się w głosowaniu, wysyłając swój klucz publiczny do inteligentnego kontraktu.
- Alice zgadza się zagłosować na `opcję B` w zamian za łapówkę od Boba.
- Alice głosuje na `opcję B`.
- Alice potajemnie wysyła zaszyfrowaną transakcję, żeby zmienić klucz publiczny powiązany z jej tożsamością.
- Alice wysyła kolejną (zaszyfrowaną) wiadomość do inteligentnego kontraktu głosując na `opcję A` używając nowego klucza publicznego.
- Alice pokazuje Bobowi transakcję, która pokazuje, że zagłosowała na `opcję B` (która jest nieprawidłowa, ponieważ klucz publiczny już nie jest powiązany z tożsamością Alice w systemie).
- Podczas przetwarzania wiadomości, koordynator pomija głos Alice na `opcję B` i zlicza tylko głos na `opcję A`. W taki sposób próba przekupienia Alice przez Boba i zmanipulowania głosowania w łańcuchu się nie udaje.

Korzystanie z MACI _wymaga_ zaufania koordynatorowi, że nie jest w zmowie z przekupującymi lub sam nie próbuje przekupić głosujących. Koordynator może odszyfrować wiadomości użytkowników (wymagane do stworzenia dowodu), żeby mógł dokładnie policzyć, w jaki sposób zagłosowała każda osoba.

Jednak w przypadku, w którym koordynator pozostaje uczciwy, MACI stanowi potężne narzędzie gwarantujące uczciwość głosowania w łańcuchu. Wyjaśnia to jego popularność wśród aplikacji finansowania kwadratowego (np. [clr.fund](https://clr.fund/#/about/maci)), które polegają głównie na uczciwości wyboru każdej osoby w głosowaniu.

[Dowiedz się więcej o MACI](https://privacy-scaling-explorations.github.io/maci/).

## Wady korzystania z dowodów wiedzy zerowej {#drawbacks-of-using-zero-knowledge-proofs}

### Koszty sprzętowe {#hardware-costs}

Generowanie dowodów wiedzy zerowej wymaga bardzo skomplikowanych obliczeń, które najlepiej wykonywać na wyspecjalizowanych maszynach. Ponieważ maszyny te są drogie, często są poza zasięgiem zwykłych osób. Co więcej, aplikacje, które chcą korzystać z technologi wiedzy zerowej, muszą uwzględnić koszty sprzętu — co może zwiększyć koszt dla użytkowników końcowych.

### Koszt weryfikacji dowodu {#proof-verification-costs}

Weryfikowanie dowodów również wymaga skomplikowanych obliczeń i zwiększa koszty wdrożenia technologii wiedzy zerowej w aplikacjach. Koszt ten jest szczególnie istotny w kontekście udowadniania obliczeń. Na przykład, pakiety zbiorcze o wiedzy zerowej wymagają około 500.000 gazu do zweryfikowana pojedynczego dowodu ZK-SNARK na Ethereum, a ZK-STARK wymaga jeszcze wyższych opłat.

### Założenia zaufania {#trust-assumptions}

W ZK-SNARK Wspólny Ciąg Odniesienia (publiczne parametry) jest generowany raz i dostępny do ponownego wykorzystania dla stron, które chcą uczestniczyć w protokole wiedzy zerowej. Publiczne parametry są tworzone za pośrednictwem zaufanej ceremonii konfiguracji, w której zakłada się, że uczestnicy są uczciwi.

Jednak tak naprawdę użytkownicy nie mają możliwości ocenić uczciwości uczestników i muszą wierzyć deweloperom na słowo. Dowody ZK-STARK są wolne od założeń zaufania, ponieważ losowość używana do generowania ciągu jest publicznie weryfikowalna. W międzyczasie naukowcy pracują nad niezaufanymi konfiguracjami dla ZK-SNARK, aby zwiększyć bezpieczeństwo mechanizmów udowadniania.

### Zagrożenia obliczeń kwantowych {#quantum-computing-threats}

ZK-SNARK do szyfrowania używa kryptografii krzywych eliptycznych ([ECDSA](/glossary/#ecdsa)). Chociaż algorytm ECDSA jest bezpieczny na tę chwilę, rozwój komputerów kwantowych może w przyszłości złamać jego model bezpieczeństwa.

ZK-STARK jest uważany za odporny na zagrożenia związane z obliczeniami kwantowymi, ponieważ korzysta z funkcji haszujących odpornych na kolizje. W przeciwieństwie do par kluczy publiczno-prywatnych stosowanych w kryptografii krzywych eliptycznych, odporne na kolizje haszowanie jest cięższe do złamania przez algorytmy obliczeń kwantowych.

## Przeczytaj także {#further-reading}

- [Informatyk wyjaśnia jedno pojęcie na 5 poziomach trudności | WIRED](https://www.youtube.com/watch?v=fOGdb1CTu5c) — _Kanał Wired na YouTubie_
- [Przegląd przypadków użycia dowodów wiedzy zerowej](https://pse.dev/projects) — _Zespół ds. prywatności i eksploracji skalowania_
- [SNARK kontra STARK kontra Rekursywny SNARK](https://www.alchemy.com/overviews/snarks-vs-starks) — _Przegląd Alchemy_
- [Dowód wiedzy zerowej: poprawa prywatności w blockchainie](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Realistyczny przykład wiedzy zerowej i dogłębna analiza](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Twórz weryfikowalne zaufanie, nawet względem komputerów kwantowych](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Przybliżone wprowadzenie do tego, dlaczego zk-SNARK są możliwe](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Czym jest dowód wiedzy zerowej i jaka jest jego rola w blockchainie?](https://www.leewayhertz.com/zero-knowledge-proof-and-blockchain/) — _LeewayHertz_
