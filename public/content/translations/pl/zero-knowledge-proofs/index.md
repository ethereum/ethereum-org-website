---
title: "Czym są dowody z wiedzą zerową?"
metaTitle: "Dowody z wiedzą zerową"
description: "Nietechniczne wprowadzenie do dowodów z wiedzą zerową dla początkujących."
lang: pl
---

Dowód z wiedzą zerową to sposób na udowodnienie prawdziwości twierdzenia bez ujawniania samego twierdzenia. „Prover” to strona próbująca udowodnić roszczenie, podczas gdy „weryfikator” jest odpowiedzialny za walidację tego roszczenia.

Dowody z wiedzą zerową pojawiły się po raz pierwszy w artykule z 1985 roku pt. „[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)”, który zawiera definicję dowodów z wiedzą zerową powszechnie używaną do dziś:

> Protokół z wiedzą zerową to metoda, dzięki której jedna ze stron (prover) **może udowodnić** drugiej stronie (weryfikatorowi), **że coś jest prawdą, bez ujawniania jakichkolwiek informacji** poza faktem, że to konkretne twierdzenie jest prawdziwe.

Dowody z wiedzą zerową zostały ulepszone na przestrzeni lat i są obecnie wykorzystywane w wielu rzeczywistych zastosowaniach.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Dlaczego potrzebujemy dowodów z wiedzą zerową? {#why-zero-knowledge-proofs-are-important}

Dowody z wiedzą zerową stanowiły przełom w kryptografii stosowanej, ponieważ obiecywały poprawę bezpieczeństwa informacji dla jednostek. Zastanów się, jak mógłbyś udowodnić roszczenie (np. „Jestem obywatelem kraju X”) innej stronie (np. dostawcy usług). Musiałbyś dostarczyć „dowód” na poparcie swojego roszczenia, taki jak paszport krajowy lub prawo jazdy.

Istnieją jednak problemy z tym podejściem, głównie brak prywatności. Dane osobowe (PII) udostępniane usługom stron trzecich są przechowywane w centralnych bazach danych, które są podatne na ataki hakerskie. W związku z tym, że kradzież tożsamości staje się krytycznym problemem, pojawiają się wezwania do stosowania środków udostępniania poufnych informacji, które w większym stopniu chronią prywatność.

Dowody z wiedzą zerową rozwiązują ten problem, **eliminując potrzebę ujawniania informacji w celu udowodnienia ważności roszczeń**. Protokół z wiedzą zerową wykorzystuje twierdzenie (zwane „świadkiem”) jako dane wejściowe do wygenerowania zwięzłego dowodu jego ważności. Dowód ten daje silne gwarancje, że twierdzenie jest prawdziwe, bez ujawniania informacji użytych do jego stworzenia.

Wracając do naszego wcześniejszego przykładu, jedynym dowodem, którego potrzebujesz, aby udowodnić swoje obywatelstwo, jest dowód z wiedzą zerową. Weryfikator musi jedynie sprawdzić, czy pewne właściwości dowodu są prawdziwe, aby przekonać się, że podstawowe twierdzenie również jest prawdziwe.

## Przypadki użycia dowodów z wiedzą zerową {#use-cases-for-zero-knowledge-proofs}

### Anonimowe płatności {#anonymous-payments}

Płatności kartą kredytową są często widoczne dla wielu stron, w tym dostawcy płatności, banków i innych zainteresowanych stron (np. organów rządowych). Chociaż nadzór finansowy ma zalety w postaci identyfikacji nielegalnej działalności, podważa on również prywatność zwykłych obywateli.

Kryptowaluty miały na celu zapewnienie użytkownikom środków do przeprowadzania prywatnych transakcji peer-to-peer. Jednak większość transakcji kryptowalutowych jest jawnie widoczna na publicznych blockchainach. Tożsamości użytkowników są często pseudonimowe i albo celowo powiązane z tożsamościami w świecie rzeczywistym (np. poprzez umieszczenie adresów ETH na profilach na Twitterze lub GitHubie), albo mogą być powiązane z tożsamościami w świecie rzeczywistym za pomocą podstawowej analizy danych onchain i pozałańcuchowych.

Istnieją specjalne „monety prywatności” (privacy coins) zaprojektowane do całkowicie anonimowych transakcji. Blockchainy zorientowane na prywatność, takie jak Zcash i Monero, ukrywają szczegóły transakcji, w tym adresy nadawcy/odbiorcy, rodzaj aktywów, ilość i oś czasu transakcji.

Wbudowując technologię z wiedzą zerową w protokół, zorientowane na prywatność sieci [blockchain](/glossary/#blockchain) pozwalają [węzłom](/glossary/#node) na walidację transakcji bez konieczności dostępu do danych transakcyjnych. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) jest przykładem proponowanego projektu, który umożliwi natywne prywatne transfery wartości na blockchainie [Ethereum](/). Takie propozycje są jednak trudne do wdrożenia ze względu na mieszankę obaw związanych z bezpieczeństwem, regulacjami i doświadczeniem użytkownika (UX).  

**Dowody z wiedzą zerową są również stosowane do anonimizacji transakcji na publicznych blockchainach**. Przykładem jest Tornado Cash, zdecentralizowana, niepowiernicza usługa, która pozwala użytkownikom na przeprowadzanie prywatnych transakcji na Ethereum. Tornado Cash wykorzystuje dowody z wiedzą zerową do zaciemniania szczegółów transakcji i gwarantowania prywatności finansowej. Niestety, ponieważ są to narzędzia prywatności typu „opt-in” (wymagające wyrażenia zgody), są one kojarzone z nielegalną działalnością. Aby temu zaradzić, prywatność musi ostatecznie stać się domyślna na publicznych blockchainach. Dowiedz się więcej o [prywatności na Ethereum](/privacy/).

### Ochrona tożsamości {#identity-protection}

Obecne systemy zarządzania tożsamością narażają dane osobowe na ryzyko. Dowody z wiedzą zerową mogą pomóc jednostkom w walidacji tożsamości przy jednoczesnej ochronie poufnych danych.

Dowody z wiedzą zerową są szczególnie przydatne w kontekście [zdecentralizowanej tożsamości](/decentralized-identity/). Zdecentralizowana tożsamość (określana również jako „suwerenna tożsamość”) daje jednostce możliwość kontrolowania dostępu do osobistych identyfikatorów. Udowodnienie obywatelstwa bez ujawniania numeru NIP lub danych paszportowych jest dobrym przykładem tego, jak technologia z wiedzą zerową umożliwia zdecentralizowaną tożsamość.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Tożsamość w akcji: Narodowy Cyfrowy Dowód Tożsamości (NDI) Bhutanu na Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Rzeczywistym przykładem wykorzystania ZKP w systemach zarządzania tożsamością jest system Narodowego Cyfrowego Dowodu Tożsamości (NDI) Królestwa Bhutanu, zbudowany na Ethereum. NDI Bhutanu wykorzystuje ZKP, aby umożliwić obywatelom kryptograficzne udowodnienie faktów na swój temat, takich jak „Jestem obywatelem” lub „Mam ponad 18 lat”, bez ujawniania poufnych danych osobowych znajdujących się w ich dowodzie tożsamości.
      </p>
      <p>
        Dowiedz się więcej o NDI Bhutanu w <a href="/decentralized-identity/#national-and-government-id">studium przypadku zdecentralizowanej tożsamości</a>.
      </p>
 
</AlertDescription>
 
</AlertContent>
</Alert>

### Dowód człowieczeństwa (Proof of Humanity) {#proof-of-humanity}

Jednym z najczęściej używanych obecnie przykładów dowodów z wiedzą zerową w akcji jest [protokół World ID](https://world.org/blog/world/world-id-faqs), który można uznać za „globalny cyfrowy paszport na erę sztucznej inteligencji”. Pozwala on ludziom udowodnić, że są unikalnymi jednostkami bez ujawniania danych osobowych. Osiąga się to za pomocą urządzenia o nazwie Orb, które skanuje tęczówkę oka i generuje kod tęczówki. Kod tęczówki jest sprawdzany i weryfikowany w celu potwierdzenia, że dana osoba jest biologicznie unikalną istotą ludzką. Po weryfikacji, zobowiązanie tożsamości wygenerowane na urządzeniu użytkownika (i niepowiązane z danymi biometrycznymi ani z nich niepochodzące) jest dodawane do bezpiecznej listy na blockchainie. Następnie, gdy użytkownik chce udowodnić, że jest zweryfikowanym człowiekiem – czy to w celu zalogowania się, oddania głosu, czy podjęcia innych działań – może wygenerować dowód z wiedzą zerową, który potwierdza jego członkostwo na liście. Piękno korzystania z dowodu z wiedzą zerową polega na tym, że ujawniane jest tylko jedno twierdzenie: ta osoba jest unikalna. Wszystko inne pozostaje prywatne.

World ID opiera się na [protokole Semaphore](https://docs.semaphore.pse.dev/) opracowanym przez [zespół PSE](https://pse.dev/) w Fundacji Ethereum. Semaphore został zaprojektowany jako lekki, ale potężny sposób na generowanie i weryfikację dowodów z wiedzą zerową. Pozwala użytkownikom udowodnić, że są częścią grupy (w tym przypadku zweryfikowanych ludzi) bez pokazywania, którym członkiem grupy są. Semaphore jest również wysoce elastyczny, umożliwiając tworzenie grup w oparciu o szeroki zakres kryteriów, takich jak weryfikacja tożsamości, udział w zdarzeniach lub posiadanie poświadczeń.

### Uwierzytelnianie {#authentication}

Korzystanie z usług online wymaga udowodnienia swojej tożsamości i prawa dostępu do tych platform. Często wymaga to podania danych osobowych, takich jak imiona i nazwiska, adresy e-mail, daty urodzenia i tak dalej. Może być również konieczne zapamiętanie długich haseł lub zaryzykowanie utraty dostępu.

Dowody z wiedzą zerową mogą jednak uprościć uwierzytelnianie zarówno dla platform, jak i użytkowników. Po wygenerowaniu dowodu ZK przy użyciu publicznych danych wejściowych (np. danych poświadczających członkostwo użytkownika na platformie) i prywatnych danych wejściowych (np. danych użytkownika), użytkownik może po prostu przedstawić go w celu uwierzytelnienia swojej tożsamości, gdy potrzebuje dostępu do usługi. Poprawia to doświadczenie użytkowników i uwalnia organizacje od konieczności przechowywania ogromnych ilości informacji o użytkownikach.

### Weryfikowalne obliczenia {#verifiable-computation}

Weryfikowalne obliczenia to kolejne zastosowanie technologii z wiedzą zerową w celu ulepszenia projektów blockchain. Weryfikowalne obliczenia pozwalają nam zlecać obliczenia innemu podmiotowi przy jednoczesnym zachowaniu weryfikowalnych wyników. Podmiot przesyła wynik wraz z dowodem weryfikującym, że program został wykonany poprawnie.

Weryfikowalne obliczenia mają **kluczowe znaczenie dla poprawy szybkości przetwarzania na blockchainach** bez zmniejszania bezpieczeństwa. Zrozumienie tego wymaga znajomości różnic w proponowanych rozwiązaniach skalowania Ethereum.

[Rozwiązania skalowania onchain](/developers/docs/scaling/#onchain-scaling), takie jak sharding, wymagają rozległej modyfikacji warstwy bazowej blockchaina. Jednak to podejście jest bardzo złożone, a błędy w implementacji mogą podważyć model bezpieczeństwa Ethereum.

[Pozałańcuchowe rozwiązania skalowania](/developers/docs/scaling/#offchain-scaling) nie wymagają przeprojektowania głównego protokołu Ethereum. Zamiast tego opierają się na modelu zleconych obliczeń w celu poprawy przepustowości w warstwie bazowej Ethereum.

Oto jak to działa w praktyce:

- Zamiast przetwarzać każdą transakcję, Ethereum przenosi wykonanie do oddzielnego łańcucha.

- Po przetworzeniu transakcji, drugi łańcuch zwraca wyniki, które mają zostać zastosowane do stanu Ethereum.

Korzyścią jest to, że Ethereum nie musi wykonywać żadnych operacji i musi jedynie zastosować wyniki ze zleconych obliczeń do swojego stanu. Zmniejsza to przeciążenie sieci, a także poprawia szybkość transakcji (protokoły pozałańcuchowe optymalizują pod kątem szybszego wykonania).

Łańcuch potrzebuje sposobu na walidację transakcji pozałańcuchowych bez ich ponownego wykonywania, w przeciwnym razie wartość wykonania pozałańcuchowego zostaje utracona.

W tym miejscu do gry wkraczają weryfikowalne obliczenia. Kiedy węzeł wykonuje transakcję poza Ethereum, przesyła dowód z wiedzą zerową, aby udowodnić poprawność wykonania pozałańcuchowego. Ten dowód (zwany [dowodem ważności](/glossary/#validity-proof)) gwarantuje, że transakcja jest ważna, pozwalając Ethereum na zastosowanie wyniku do swojego stanu — bez czekania, aż ktoś go zakwestionuje.

[Rollupy z wiedzą zerową](/developers/docs/scaling/zk-rollups) i [validium](/developers/docs/scaling/validium/) to dwa pozałańcuchowe rozwiązania skalowania, które wykorzystują dowody ważności w celu zapewnienia bezpiecznej skalowalności. Protokoły te wykonują tysiące transakcji pozałańcuchowych i przesyłają dowody do weryfikacji na Ethereum. Wyniki te mogą zostać zastosowane natychmiast po zweryfikowaniu dowodu, co pozwala Ethereum na przetwarzanie większej liczby transakcji bez zwiększania obliczeń w warstwie bazowej.

Poza skalowaniem warstwy 2 (L2), dowody z wiedzą zerową mogą również weryfikować samo wykonanie bloku Ethereum L1. [zkEVM do weryfikacji L1](/roadmap/zkevm/) pozwoliłoby walidatorom na weryfikację bloków poprzez sprawdzenie dowodu zamiast ponownego wykonywania wszystkich transakcji — umożliwiając wyższe limity gazu bez podnoszenia wymagań sprzętowych walidatora.

### Zmniejszenie przekupstwa i zmowy w głosowaniu onchain {#secure-blockchain-voting}

Schematy głosowania na blockchainie mają wiele korzystnych cech: są w pełni audytowalne, bezpieczne przed atakami, odporne na cenzurę i wolne od ograniczeń geograficznych. Ale nawet schematy głosowania onchain nie są odporne na problem **zmowy**.

Zdefiniowana jako „koordynacja w celu ograniczenia otwartej konkurencji poprzez oszukiwanie, defraudację i wprowadzanie w błąd innych”, zmowa może przybrać formę złośliwego aktora wpływającego na głosowanie poprzez oferowanie łapówek. Na przykład Alice może otrzymać łapówkę od Boba, aby zagłosować na `option B` na karcie do głosowania, nawet jeśli woli `option A`.

Przekupstwo i zmowa ograniczają skuteczność każdego procesu, który wykorzystuje głosowanie jako mechanizm sygnalizacyjny (zwłaszcza tam, gdzie użytkownicy mogą udowodnić, jak głosowali). Może to mieć znaczące konsekwencje, zwłaszcza gdy głosy są odpowiedzialne za alokację rzadkich zasobów.

Na przykład [mechanizmy finansowania kwadratowego](https://www.radicalxchange.org/wiki/plural-funding/) opierają się na darowiznach w celu pomiaru preferencji dla określonych opcji wśród różnych projektów dobra publicznego. Każda darowizna liczy się jako „głos” na konkretny projekt, a projekty, które otrzymają więcej głosów, otrzymują więcej środków z puli dopasowującej.

Korzystanie z głosowania onchain sprawia, że finansowanie kwadratowe jest podatne na zmowę: transakcje blockchain są publiczne, więc przekupujący mogą sprawdzić aktywność przekupionego onchain, aby zobaczyć, jak „zagłosował”. W ten sposób finansowanie kwadratowe przestaje być skutecznym środkiem alokacji funduszy w oparciu o zagregowane preferencje społeczności.

Na szczęście nowsze rozwiązania, takie jak MACI (Minimum Anti-Collusion Infrastructure), wykorzystują dowody z wiedzą zerową, aby głosowanie onchain (np. mechanizmy finansowania kwadratowego) było odporne na przekupstwo i zmowę. MACI to zestaw inteligentnych kontraktów i skryptów, które pozwalają centralnemu administratorowi (zwanemu „koordynatorem”) na agregację głosów i podliczanie wyników _bez_ ujawniania szczegółów dotyczących tego, jak głosowała każda osoba. Mimo to nadal możliwe jest zweryfikowanie, czy głosy zostały policzone prawidłowo, lub potwierdzenie, że dana osoba wzięła udział w rundzie głosowania.

#### Jak MACI współpracuje z dowodami z wiedzą zerową? {#how-maci-works-with-zk-proofs}

Na początku koordynator wdraża kontrakt MACI na Ethereum, po czym użytkownicy mogą zapisać się do głosowania (rejestrując swój klucz publiczny w inteligentnym kontrakcie). Użytkownicy oddają głosy, wysyłając wiadomości zaszyfrowane swoim kluczem publicznym do inteligentnego kontraktu (ważny głos musi być podpisany najnowszym kluczem publicznym powiązanym z tożsamością użytkownika, między innymi kryteriami). Następnie koordynator przetwarza wszystkie wiadomości po zakończeniu okresu głosowania, podlicza głosy i weryfikuje wyniki onchain.

W MACI dowody z wiedzą zerową są wykorzystywane do zapewnienia poprawności obliczeń poprzez uniemożliwienie koordynatorowi nieprawidłowego przetwarzania głosów i podliczania wyników. Osiąga się to poprzez wymaganie od koordynatora wygenerowania dowodów ZK-SNARK weryfikujących, że a) wszystkie wiadomości zostały przetworzone poprawnie b) ostateczny wynik odpowiada sumie wszystkich _ważnych_ głosów.

W ten sposób, nawet bez udostępniania podziału głosów na użytkownika (jak to zwykle bywa), MACI gwarantuje integralność wyników obliczonych podczas procesu podliczania. Ta funkcja jest przydatna w zmniejszaniu skuteczności podstawowych schematów zmowy. Możemy zbadać tę możliwość, korzystając z poprzedniego przykładu Boba przekupującego Alice, aby zagłosowała na daną opcję:

- Alice rejestruje się do głosowania, wysyłając swój klucz publiczny do inteligentnego kontraktu.
- Alice zgadza się zagłosować na `option B` w zamian za łapówkę od Boba.
- Alice głosuje na `option B`.
- Alice potajemnie wysyła zaszyfrowaną transakcję, aby zmienić klucz publiczny powiązany z jej tożsamością.
- Alice wysyła kolejną (zaszyfrowaną) wiadomość do inteligentnego kontraktu, głosując na `option A` przy użyciu nowego klucza publicznego.
- Alice pokazuje Bobowi transakcję, która pokazuje, że zagłosowała na `option B` (co jest nieważne, ponieważ klucz publiczny nie jest już powiązany z tożsamością Alice w systemie).
- Podczas przetwarzania wiadomości koordynator pomija głos Alice na `option B` i liczy tylko głos na `option A`. W związku z tym próba zmowy Boba z Alice i manipulowania głosowaniem onchain kończy się niepowodzeniem.

Korzystanie z MACI _wymaga_ zaufania, że koordynator nie wejdzie w zmowę z przekupującymi ani nie będzie próbował sam przekupywać wyborców. Koordynator może odszyfrować wiadomości użytkowników (co jest niezbędne do stworzenia dowodu), dzięki czemu może dokładnie zweryfikować, jak głosowała każda osoba.

Jednak w przypadkach, gdy koordynator pozostaje uczciwy, MACI stanowi potężne narzędzie gwarantujące świętość głosowania onchain. Wyjaśnia to jego popularność wśród aplikacji finansowania kwadratowego (np. [clr.fund](https://clr.fund/#/about/maci)), które w dużym stopniu opierają się na integralności wyborów każdego z głosujących.

[Dowiedz się więcej o MACI](https://maci.pse.dev/).

## Jak działają dowody z wiedzą zerową? {#how-do-zero-knowledge-proofs-work}

Dowód z wiedzą zerową pozwala udowodnić prawdziwość twierdzenia bez udostępniania jego treści lub ujawniania, w jaki sposób odkryłeś prawdę. Aby to było możliwe, protokoły z wiedzą zerową opierają się na algorytmach, które przyjmują pewne dane jako wejście i zwracają „prawda” lub „fałsz” jako wyjście.

Protokół z wiedzą zerową musi spełniać następujące kryteria:

1. **Kompletność**: Jeśli dane wejściowe są prawidłowe, protokół z wiedzą zerową zawsze zwraca „prawda”. W związku z tym, jeśli podstawowe twierdzenie jest prawdziwe, a prover i weryfikator działają uczciwie, dowód może zostać zaakceptowany.

2. **Solidność**: Jeśli dane wejściowe są nieprawidłowe, teoretycznie niemożliwe jest oszukanie protokołu z wiedzą zerową, aby zwrócił „prawda”. W związku z tym kłamiący prover nie może oszukać uczciwego weryfikatora, aby uwierzył, że nieprawidłowe twierdzenie jest ważne (z wyjątkiem niewielkiego marginesu prawdopodobieństwa).

3. **Wiedza zerowa**: Weryfikator nie dowiaduje się niczego o twierdzeniu poza jego prawdziwością lub fałszywością (ma „zerową wiedzę” o twierdzeniu). Wymóg ten zapobiega również wyprowadzeniu przez weryfikatora oryginalnych danych wejściowych (treści twierdzenia) z dowodu.

W podstawowej formie dowód z wiedzą zerową składa się z trzech elementów: **świadka**, **wyzwania** i **odpowiedzi**.

- **Świadek**: Za pomocą dowodu z wiedzą zerową prover chce udowodnić znajomość pewnych ukrytych informacji. Tajna informacja jest „świadkiem” dowodu, a zakładana wiedza provera o świadku ustanawia zestaw pytań, na które może odpowiedzieć tylko strona znająca tę informację. W ten sposób prover rozpoczyna proces dowodzenia od losowego wybrania pytania, obliczenia odpowiedzi i wysłania jej do weryfikatora.

- **Wyzwanie**: Weryfikator losowo wybiera inne pytanie z zestawu i prosi provera o odpowiedź.

- **Odpowiedź**: Prover akceptuje pytanie, oblicza odpowiedź i zwraca ją weryfikatorowi. Odpowiedź provera pozwala weryfikatorowi sprawdzić, czy ten pierwszy naprawdę ma dostęp do świadka. Aby upewnić się, że prover nie zgaduje w ciemno i nie uzyskuje poprawnych odpowiedzi przez przypadek, weryfikator wybiera więcej pytań do zadania. Powtarzając tę interakcję wiele razy, możliwość sfałszowania przez provera wiedzy o świadku znacznie spada, dopóki weryfikator nie będzie usatysfakcjonowany.

Powyższe opisuje strukturę „interaktywnego dowodu z wiedzą zerową”. Wczesne protokoły z wiedzą zerową wykorzystywały interaktywne dowodzenie, w którym weryfikacja ważności twierdzenia wymagała komunikacji w obie strony między proverami a weryfikatorami.

Dobrym przykładem ilustrującym działanie interaktywnych dowodów jest słynna [historia o jaskini Ali Baby](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) autorstwa Jean-Jacquesa Quisquatera. W tej historii Peggy (prover) chce udowodnić Victorowi (weryfikatorowi), że zna tajną frazę do otwarcia magicznych drzwi bez ujawniania tej frazy.

### Nieinteraktywne dowody z wiedzą zerową {#non-interactive-zero-knowledge-proofs}

Choć rewolucyjne, interaktywne dowodzenie miało ograniczoną użyteczność, ponieważ wymagało od obu stron dostępności i wielokrotnej interakcji. Nawet jeśli weryfikator był przekonany o uczciwości provera, dowód byłby niedostępny do niezależnej weryfikacji (obliczenie nowego dowodu wymagało nowego zestawu wiadomości między proverem a weryyfikatorem).

Aby rozwiązać ten problem, Manuel Blum, Paul Feldman i Silvio Micali zasugerowali pierwsze [nieinteraktywne dowody z wiedzą zerową](https://dl.acm.org/doi/10.1145/62212.62222), w których prover i weryfikator mają wspólny klucz. Pozwala to proverowi zademonstrować swoją wiedzę na temat pewnych informacji (tj. świadka) bez podawania samej informacji.

W przeciwieństwie do dowodów interaktywnych, dowody nieinteraktywne wymagały tylko jednej rundy komunikacji między uczestnikami (proverem i weryfikatorem). Prover przekazuje tajne informacje do specjalnego algorytmu w celu obliczenia dowodu z wiedzą zerową. Dowód ten jest wysyłany do weryfikatora, który sprawdza, czy prover zna tajne informacje za pomocą innego algorytmu.

Nieinteraktywne dowodzenie zmniejsza komunikację między proverem a weryfikatorem, czyniąc dowody ZK bardziej wydajnymi. Co więcej, po wygenerowaniu dowodu jest on dostępny do weryfikacji dla każdego (z dostępem do wspólnego klucza i algorytmu weryfikacji).

Nieinteraktywne dowody stanowiły przełom w technologii z wiedzą zerową i pobudziły rozwój systemów dowodzenia używanych do dziś. Poniżej omawiamy te typy dowodów:

### Rodzaje dowodów z wiedzą zerową {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK to akronim od **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Zwięzły Nieinteraktywny Argument Wiedzy z Wiedzą Zerową). Protokół ZK-SNARK ma następujące cechy:

- **Wiedza zerowa**: Weryfikator może zweryfikować integralność twierdzenia, nie wiedząc o nim nic więcej. Jedyną wiedzą, jaką weryfikator ma na temat twierdzenia, jest to, czy jest ono prawdziwe, czy fałszywe.

- **Zwięzłość**: Dowód z wiedzą zerową jest mniejszy niż świadek i można go szybko zweryfikować.

- **Nieinteraktywność**: Dowód jest „nieinteraktywny”, ponieważ prover i weryfikator wchodzą w interakcję tylko raz, w przeciwieństwie do dowodów interaktywnych, które wymagają wielu rund komunikacji.

- **Argument**: Dowód spełnia wymóg „solidności”, więc oszustwo jest niezwykle mało prawdopodobne.

- **Wiedzy**: Dowód z wiedzą zerową nie może zostać skonstruowany bez dostępu do tajnych informacji (świadka). Obliczenie ważnego dowodu z wiedzą zerową jest trudne, jeśli nie niemożliwe, dla provera, który nie ma świadka.

Wspomniany wcześniej „wspólny klucz” odnosi się do parametrów publicznych, na których użycie prover i weryfikator zgadzają się podczas generowania i weryfikacji dowodów. Generowanie parametrów publicznych (zbiorczo znanych jako Common Reference String (CRS)) jest wrażliwą operacją ze względu na jej znaczenie dla bezpieczeństwa protokołu. Jeśli entropia (losowość) użyta do wygenerowania CRS wpadnie w ręce nieuczciwego provera, może on obliczyć fałszywe dowody.

[Obliczenia wielostronne (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) to sposób na zmniejszenie ryzyka przy generowaniu parametrów publicznych. Wiele stron uczestniczy w [ceremonii zaufanej konfiguracji](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), w której każda osoba wnosi pewne losowe wartości w celu wygenerowania CRS. Dopóki jedna uczciwa strona zniszczy swoją część entropii, protokół ZK-SNARK zachowuje solidność obliczeniową.

Zaufane konfiguracje wymagają od użytkowników zaufania do uczestników generowania parametrów. Jednak rozwój ZK-STARKs umożliwił protokoły dowodzenia, które działają z niezaufaną konfiguracją.

#### ZK-STARKs {#zk-starks}

ZK-STARK to akronim od **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Skalowalny Przejrzysty Argument Wiedzy z Wiedzą Zerową). ZK-STARKs są podobne do ZK-SNARKs, z tą różnicą, że są:

- **Skalowalne**: ZK-STARK jest szybszy niż ZK-SNARK w generowaniu i weryfikacji dowodów, gdy rozmiar świadka jest większy. W przypadku dowodów STARK czas provera i weryfikacji wzrasta tylko nieznacznie wraz ze wzrostem świadka (czasy provera i weryfikatora SNARK rosną liniowo wraz z rozmiarem świadka).

- **Przejrzyste**: ZK-STARK opiera się na publicznie weryfikowalnej losowości do generowania parametrów publicznych do dowodzenia i weryfikacji zamiast zaufanej konfiguracji. W związku z tym są one bardziej przejrzyste w porównaniu do ZK-SNARKs.

ZK-STARKs generują większe dowody niż ZK-SNARKs, co oznacza, że na ogół mają wyższe koszty ogólne weryfikacji. Istnieją jednak przypadki (takie jak dowodzenie dużych zbiorów danych), w których ZK-STARKs mogą być bardziej opłacalne niż ZK-SNARKs.

## Wady korzystania z dowodów z wiedzą zerową {#drawbacks-of-using-zero-knowledge-proofs}

### Koszty sprzętu {#hardware-costs}

Generowanie dowodów z wiedzą zerową wiąże się z bardzo złożonymi obliczeniami, które najlepiej wykonywać na wyspecjalizowanych maszynach. Ponieważ maszyny te są drogie, często są poza zasięgiem zwykłych osób. Dodatkowo aplikacje, które chcą korzystać z technologii z wiedzą zerową, muszą uwzględnić koszty sprzętu — co może zwiększyć koszty dla użytkowników końcowych.

### Koszty weryfikacji dowodów {#proof-verification-costs}

Weryfikacja dowodów również wymaga złożonych obliczeń i zwiększa koszty wdrażania technologii z wiedzą zerową w aplikacjach. Koszt ten jest szczególnie istotny w kontekście dowodzenia obliczeń. Na przykład rollupy ZK płacą ~ 500 000 gazu za weryfikację pojedynczego dowodu ZK-SNARK na Ethereum, przy czym ZK-STARKs wymagają jeszcze wyższych opłat.

### Założenia dotyczące zaufania {#trust-assumptions}

W ZK-SNARK Common Reference String (parametry publiczne) jest generowany raz i dostępny do ponownego użycia dla stron, które chcą uczestniczyć w protokole z wiedzą zerową. Parametry publiczne są tworzone podczas ceremonii zaufanej konfiguracji, w której zakłada się, że uczestnicy są uczciwi.

Ale tak naprawdę nie ma sposobu, aby użytkownicy mogli ocenić uczciwość uczestników, a użytkownicy muszą wierzyć programistom na słowo. ZK-STARKs są wolne od założeń dotyczących zaufania, ponieważ losowość użyta do wygenerowania ciągu jest publicznie weryfikowalna. W międzyczasie badacze pracują nad niezaufanymi konfiguracjami dla ZK-SNARKs, aby zwiększyć bezpieczeństwo mechanizmów dowodzenia.

### Zagrożenia ze strony komputerów kwantowych {#quantum-computing-threats}

ZK-SNARK wykorzystuje kryptografię krzywych eliptycznych do szyfrowania. Chociaż zakłada się, że problem logarytmu dyskretnego krzywej eliptycznej jest na razie nierozwiązywalny, rozwój komputerów kwantowych może w przyszłości złamać ten model bezpieczeństwa.

ZK-STARK jest uważany za odporny na zagrożenie ze strony komputerów kwantowych, ponieważ jego bezpieczeństwo opiera się wyłącznie na funkcjach haszujących odpornych na kolizje. W przeciwieństwie do par kluczy publiczno-prywatnych używanych w kryptografii krzywych eliptycznych, haszowanie odporne na kolizje jest trudniejsze do złamania przez algorytmy obliczeń kwantowych.

## Dalsza lektura {#further-reading}

- [Przegląd przypadków użycia dowodów z wiedzą zerową](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKS vs. Rekursywne SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Dowód z wiedzą zerową: Poprawa prywatności na blockchainie](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Realistyczny przykład wiedzy zerowej i szczegółowa analiza](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Tworzenie weryfikowalnego zaufania, nawet w obliczu komputerów kwantowych](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Przybliżone wprowadzenie do tego, jak możliwe są zk-SNARKs](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Dlaczego dowody z wiedzą zerową (ZKP) zmieniają zasady gry w przypadku suwerennej tożsamości](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Wyjaśnienie EIP-7503: Umożliwienie prywatnych transferów na Ethereum za pomocą dowodów ZK](https://web.archive.org/web/20251116093505/https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions/) — _Emmanuel Awosika_
- [Gra karciana ZK: gra do nauki podstaw ZK i rzeczywistych przypadków użycia](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
