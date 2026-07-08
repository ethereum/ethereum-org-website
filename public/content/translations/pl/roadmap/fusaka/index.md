---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Dowiedz się więcej o aktualizacji protokołu Fusaka
lang: pl
authors: ["Nixo", "Mario Havel"]
---

**Wysoce oczekiwana aktualizacja Fusaka w sieci Ethereum została wdrożona 3 grudnia 2025 r.**

Aktualizacja sieci Fusaka następuje po [Pectra](/roadmap/pectra/), wprowadzając kolejne nowe funkcje i poprawiając doświadczenia każdego użytkownika oraz dewelopera [Ethereum](/). Nazwa składa się z aktualizacji warstwy wykonawczej Osaka oraz wersji warstwy konsensusu nazwanej na cześć gwiazdy Fulu. Obie części Ethereum otrzymują aktualizację, która przenosi skalowanie, bezpieczeństwo i doświadczenia użytkowników Ethereum w przyszłość.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Aktualizacja Fusaka to tylko jeden krok w długoterminowych celach rozwojowych Ethereum. Dowiedz się więcej o [mapie drogowej protokołu](/roadmap/) oraz [poprzednich aktualizacjach](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Ulepszenia w Fusaka {#improvements-in-fusaka}

### Skalowanie blobów {#scale-blobs}

#### PeerDAS {#peerdas}

To _główna atrakcja_ rozwidlenia Fusaka, najważniejsza funkcja dodana w tej aktualizacji. Sieci warstwy 2 (L2) obecnie publikują swoje dane w Ethereum w postaci blobów, efemerycznego typu danych stworzonego specjalnie dla warstwy 2. Przed Fusaka każdy pełny węzeł musiał przechowywać każdy blob, aby upewnić się, że dane istnieją. W miarę wzrostu przepustowości blobów konieczność pobierania wszystkich tych danych staje się nieznośnie zasobochłonna.

Dzięki [próbkowaniu dostępności danych (DAS)](https://notes.ethereum.org/@fradamt/das-fork-choice), zamiast przechowywać wszystkie dane blobów, każdy węzeł będzie odpowiedzialny za ich podzbiór. Bloby są równomiernie i losowo rozdzielane między węzły w sieci, a każdy pełny węzeł przechowuje tylko 1/8 danych, co umożliwia teoretyczne skalowanie do 8 razy. Aby zapewnić dostępność danych, dowolną ich część można zrekonstruować z dowolnych istniejących 50% całości za pomocą metod, które obniżają prawdopodobieństwo błędnych lub brakujących danych do kryptograficznie pomijalnego poziomu (~od jednego na 10<sup>20</sup> do jednego na 10<sup>24</sup>).

Utrzymuje to wymagania sprzętowe i przepustowości dla węzłów na akceptowalnym poziomie, jednocześnie umożliwiając skalowanie blobów, co skutkuje większą skalą i mniejszymi opłatami dla warstwy 2.

[Dowiedz się więcej o PeerDAS](/roadmap/fusaka/peerdas/)

**Zasoby**:

- [Specyfikacja techniczna EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion o PeerDAS: Skalowanie Ethereum dzisiaj | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademickie: Dokumentacja PeerDAS w Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Rozwidlenia tylko dla parametrów blobów (Blob-Parameter-Only) {#blob-parameter-only-forks}

Sieci warstwy 2 skalują Ethereum – w miarę rozwoju ich sieci muszą publikować więcej danych w Ethereum. Oznacza to, że z czasem Ethereum będzie musiało zwiększyć liczbę dostępnych dla nich blobów. Chociaż PeerDAS umożliwia skalowanie danych blobów, musi to być robione stopniowo i bezpiecznie.

Ponieważ Ethereum to kod działający na tysiącach niezależnych węzłów, które wymagają zgody co do tych samych zasad, nie możemy po prostu wprowadzać zmian, takich jak zwiększenie liczby blobów, w taki sam sposób, w jaki wdraża się aktualizację strony internetowej. Każda zmiana zasad musi być skoordynowaną aktualizacją, w której każdy węzeł, klient i oprogramowanie walidatora aktualizuje się przed tym samym, z góry określonym blokiem.

Te skoordynowane aktualizacje zazwyczaj obejmują wiele zmian, wymagają wielu testów, a to zajmuje czas. Aby szybciej dostosować się do zmieniających się potrzeb warstwy 2 w zakresie blobów, rozwidlenia tylko dla parametrów blobów wprowadzają mechanizm zwiększania liczby blobów bez konieczności czekania na harmonogram głównych aktualizacji.

Rozwidlenia tylko dla parametrów blobów mogą być ustawiane przez klientów, podobnie jak inne konfiguracje, takie jak limit gazu. Pomiędzy głównymi aktualizacjami Ethereum klienci mogą zgodzić się na zwiększenie liczby blobów `target` i `max` do np. 9 i 12, a następnie operatorzy węzłów zaktualizują oprogramowanie, aby wziąć udział w tym drobnym rozwidleniu. Te rozwidlenia tylko dla parametrów blobów mogą być konfigurowane w dowolnym momencie.

Kiedy bloby zostały po raz pierwszy dodane do sieci w aktualizacji Dencun, celem były 3. Liczba ta została zwiększona do 6 w Pectra, a po Fusaka może być teraz zwiększana w zrównoważonym tempie, niezależnie od tych głównych aktualizacji sieci.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Źródło wykresu: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Zasoby**: [Specyfikacja techniczna EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Opłata podstawowa za blob ograniczona kosztami wykonania {#blob-base-fee-bounded-by-execution-costs}

Sieci warstwy 2 płacą dwa rachunki, gdy publikują dane: opłatę za blob oraz gaz za wykonanie potrzebny do weryfikacji tych blobów. Jeśli dominuje gaz za wykonanie, aukcja opłat za blob może spaść do 1 wei i przestać być sygnałem cenowym.

EIP-7918 ustala proporcjonalną cenę minimalną dla każdego bloba. Gdy rezerwa jest wyższa niż nominalna opłata podstawowa za blob, algorytm dostosowywania opłat traktuje blok jako przekraczający cel, przestaje obniżać opłatę i pozwala jej normalnie rosnąć. W rezultacie:

- rynek opłat za blob zawsze reaguje na zatory
- sieci warstwy 2 płacą przynajmniej znaczącą część kosztów obliczeń, które wymuszają na węzłach
- skoki opłaty podstawowej w warstwie wykonawczej nie mogą już zablokować opłaty za blob na poziomie 1 wei

**Zasoby**:

- [Specyfikacja techniczna EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Wyjaśnienie w Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Skalowanie L1 {#scale-l1}

#### Wygasanie historii i prostsze pokwitowania {#history-expiry}

W lipcu 2025 r. klienci warstwy wykonawczej Ethereum [zaczęli obsługiwać częściowe wygasanie historii](https://blog.ethereum.org/2025/07/08/partial-history-exp). Odrzuciło to historię starszą niż [The Merge](https://ethereum.org/roadmap/merge/), aby zmniejszyć przestrzeń dyskową wymaganą przez operatorów węzłów w miarę ciągłego rozwoju Ethereum.

Ten EIP znajduje się w sekcji oddzielonej od „Głównych EIP”, ponieważ rozwidlenie w rzeczywistości nie wdraża żadnych zmian – jest to powiadomienie, że zespoły klienckie muszą obsługiwać wygasanie historii do czasu aktualizacji Fusaka. W praktyce klienci mogą wdrożyć to w dowolnym momencie, ale dodanie tego do aktualizacji konkretnie umieściło to na ich liście rzeczy do zrobienia i umożliwiło im przetestowanie zmian Fusaka w połączeniu z tą funkcją.

**Zasoby**: [Specyfikacja techniczna EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Ustalenie górnych limitów dla MODEXP {#set-upper-bounds-for-modexp}

Do tej pory prekompilat MODEXP akceptował liczby o praktycznie dowolnym rozmiarze. Utrudniało to testowanie, ułatwiało nadużycia i stwarzało ryzyko dla stabilności klienta. EIP-7823 wprowadza wyraźny limit: każda liczba wejściowa może mieć maksymalnie 8192 bity (1024 bajty) długości. Wszystko, co jest większe, zostaje odrzucone, gaz transakcji jest spalany i nie zachodzą żadne zmiany stanu. Bardzo wygodnie pokrywa to rzeczywiste potrzeby, jednocześnie usuwając skrajne przypadki, które komplikowały planowanie limitu gazu i przeglądy bezpieczeństwa. Zmiana ta zapewnia większe bezpieczeństwo i ochronę przed atakami DoS bez wpływu na doświadczenia użytkowników czy deweloperów.

**Zasoby**: [Specyfikacja techniczna EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Górny limit gazu dla transakcji {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) dodaje limit 16 777 216 (2^24) gazu na transakcję. Jest to proaktywne wzmocnienie przed atakami DoS poprzez ograniczenie kosztu najgorszego przypadku dla dowolnej pojedynczej transakcji w miarę podnoszenia limitu gazu w bloku. Ułatwia to modelowanie walidacji i propagacji, co pozwala nam zająć się skalowaniem poprzez podniesienie limitu gazu.

Dlaczego dokładnie 2^24 gazu? Jest to wartość znacznie mniejsza niż dzisiejszy limit gazu, wystarczająco duża dla rzeczywistych wdrożeń kontraktów i ciężkich prekompilatów, a potęga liczby 2 ułatwia implementację w różnych klientach. Ten nowy maksymalny rozmiar transakcji jest zbliżony do średniego rozmiaru bloku sprzed Pectra, co czyni go rozsądnym limitem dla dowolnej operacji w Ethereum.

**Zasoby**: [Specyfikacja techniczna EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Wzrost kosztu gazu dla `MODEXP` {#modexp-gas-cost-increase}

MODEXP to wbudowana funkcja prekompilatu, która oblicza potęgowanie modularne, rodzaj matematyki na dużych liczbach używanej w weryfikacji podpisów RSA i systemach dowodów. Pozwala to kontraktom na bezpośrednie wykonywanie tych obliczeń bez konieczności ich samodzielnej implementacji.

Deweloperzy i zespoły klienckie zidentyfikowali MODEXP jako główną przeszkodę w zwiększeniu limitu gazu w bloku, ponieważ obecne wyceny gazu często niedoszacowują, ile mocy obliczeniowej wymagają określone dane wejściowe. Oznacza to, że jedna transakcja wykorzystująca MODEXP mogłaby zająć większość czasu potrzebnego na przetworzenie całego bloku, spowalniając sieć.

Ten EIP zmienia wycenę, aby dopasować ją do rzeczywistych kosztów obliczeniowych poprzez:

- podniesienie minimalnej opłaty z 200 do 500 gazu i usunięcie zniżki w wysokości jednej trzeciej z EIP-2565 w ogólnym obliczaniu kosztów
- gwałtowniejsze zwiększanie kosztu, gdy wejściowy wykładnik jest bardzo długi. Jeśli wykładnik (liczba „potęgi” przekazywana jako drugi argument) jest dłuższy niż 32 bajty / 256 bitów, opłata za gaz rośnie znacznie szybciej za każdy dodatkowy bajt
- pobieranie dodatkowych opłat również za dużą podstawę lub moduł. Zakłada się, że dwie pozostałe liczby (podstawa i moduł) mają co najmniej 32 bajty – jeśli którakolwiek z nich jest większa, koszt rośnie proporcjonalnie do jej rozmiaru

Dzięki lepszemu dopasowaniu kosztów do rzeczywistego czasu przetwarzania, MODEXP nie może już powodować, że walidacja bloku trwa zbyt długo. Zmiana ta jest jedną z kilku mających na celu zapewnienie bezpieczeństwa przy zwiększaniu limitu gazu w bloku Ethereum w przyszłości.

**Zasoby**: [Specyfikacja techniczna EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limit rozmiaru bloku wykonawczego RLP {#rlp-execution-block-size-limit}

Tworzy to pułap określający, jak duży może być blok – jest to limit tego, co jest _wysyłane_ przez sieć i jest niezależny od limitu gazu, który ogranicza _pracę_ wewnątrz bloku. Limit rozmiaru bloku wynosi 10 MiB, z niewielkim marginesem (2 MiB) zarezerwowanym na dane konsensusu, aby wszystko się zmieściło i było płynnie propagowane. Jeśli pojawi się blok większy niż ten limit, klienci go odrzucą.
Jest to potrzebne, ponieważ bardzo duże bloki wymagają więcej czasu na rozprzestrzenienie się i weryfikację w sieci, co może powodować problemy z konsensusem lub być nadużywane jako wektor ataku DoS. Ponadto protokół plotkowania (gossip) warstwy konsensusu i tak nie przekazuje bloków powyżej ~10 MiB, więc dostosowanie warstwy wykonawczej do tego limitu pozwala uniknąć dziwnych sytuacji typu „widziane przez niektórych, odrzucone przez innych”.

Wchodząc w szczegóły: jest to limit rozmiaru bloku wykonawczego zakodowanego w [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB łącznie, z 2 MiB marginesu bezpieczeństwa zarezerwowanego na ramkowanie bloku Beacon. W praktyce klienci definiują

`MAX_BLOCK_SIZE = 10,485,760` bajtów oraz

`SAFETY_MARGIN = 2,097,152` bajtów,

i odrzucają każdy blok wykonawczy, którego ładunek RLP przekracza

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Celem jest ograniczenie czasu propagacji/walidacji w najgorszym przypadku i dostosowanie do zachowania protokołu plotkowania warstwy konsensusu, co zmniejsza ryzyko reorganizacji łańcucha/DoS bez zmiany rozliczania gazu.

**Zasoby**: [Specyfikacja techniczna EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Ustawienie domyślnego limitu gazu na 60 milionów {#set-default-gas-limit-to-60-million}

Przed podniesieniem limitu gazu z 30M do 36M w lutym 2025 r. (a następnie do 45M), wartość ta nie uległa zmianie od czasu The Merge (wrzesień 2022 r.). Ten EIP ma na celu uczynienie spójnego skalowania priorytetem.

EIP-7935 koordynuje zespoły klientów warstwy wykonawczej (EL) w celu podniesienia domyślnego limitu gazu powyżej dzisiejszych 45M dla Fusaka. Jest to informacyjny EIP, ale wyraźnie prosi klientów o przetestowanie wyższych limitów w sieciach deweloperskich, ustalenie bezpiecznej wartości i dostarczenie tej liczby w ich wydaniach Fusaka.

Planowanie w sieciach deweloperskich zakłada testy obciążeniowe na poziomie ~60M (pełne bloki z syntetycznym obciążeniem) i iteracyjne podwyżki; badania wskazują, że patologie rozmiaru bloku w najgorszym przypadku nie powinny stanowić ograniczenia poniżej ~150M. Wdrożenie powinno być połączone z górnym limitem gazu dla transakcji (EIP-7825), aby żadna pojedyncza transakcja nie mogła dominować w miarę wzrostu limitów.

**Zasoby**: [Specyfikacja techniczna EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Poprawa UX {#improve-ux}

#### Deterministyczne przewidywanie proponującego {#deterministic-proposer-lookahead}

Dzięki EIP-7917, Beacon Chain będzie świadomy nadchodzących proponujących bloki na następną epokę. Posiadanie deterministycznego poglądu na to, które walidatory będą proponować przyszłe bloki, może umożliwić [wstępne potwierdzenia (preconfirmations)](https://ethresear.ch/t/based-preconfirmations/17353) – zobowiązanie z nadchodzącym proponującym, które gwarantuje, że transakcja użytkownika zostanie uwzględniona w jego bloku bez czekania na sam blok.

Funkcja ta przynosi korzyści implementacjom klientów i bezpieczeństwu sieci, ponieważ zapobiega skrajnym przypadkom, w których walidatory mogłyby manipulować harmonogramem proponujących. Przewidywanie pozwala również na zmniejszenie złożoności implementacji.

**Zasoby**: [Specyfikacja techniczna EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Kod operacji zliczania wiodących zer (CLZ) {#count-leading-zeros-opcode}

Ta funkcja dodaje małą instrukcję EVM, **zliczanie wiodących zer (CLZ)**. Prawie wszystko w EVM jest reprezentowane jako wartość 256-bitowa – ten nowy kod operacji zwraca informację, ile bitów zerowych znajduje się na początku. Jest to powszechna funkcja w wielu architekturach zestawów instrukcji, ponieważ umożliwia bardziej wydajne operacje arytmetyczne. W praktyce sprowadza to dzisiejsze ręcznie pisane skanowanie bitów do jednego kroku, więc znalezienie pierwszego ustawionego bitu, skanowanie bajtów lub parsowanie pól bitowych staje się prostsze i tańsze. Kod operacji ma niski, stały koszt i został przetestowany jako porównywalny z podstawowym dodawaniem, co zmniejsza kod bajtowy i oszczędza gaz przy tej samej pracy.

**Zasoby**: [Specyfikacja techniczna EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Prekompilat dla obsługi krzywej secp256r1 {#secp256r1-precompile}

Wprowadza wbudowany moduł sprawdzania podpisów secp256r1 (P-256) w stylu kluczy dostępu pod stałym adresem `0x100`, wykorzystujący ten sam format wywołania, który został już przyjęty przez wiele sieci L2, i naprawiający skrajne przypadki, dzięki czemu kontrakty napisane dla tych środowisk działają na L1 bez zmian.

Ulepszenie UX! Dla użytkowników odblokowuje to natywne podpisywanie na urządzeniu i klucze dostępu. Portfele mogą bezpośrednio korzystać z Apple Secure Enclave, magazynu kluczy Android, sprzętowych modułów bezpieczeństwa (HSM) oraz FIDO2/WebAuthn – bez frazy odzyskiwania, z płynniejszym onboardingiem i wieloskładnikowymi przepływami, które przypominają nowoczesne aplikacje. Skutkuje to lepszym UX, łatwiejszym odzyskiwaniem i wzorcami abstrakcji konta, które pasują do tego, co robią już miliardy urządzeń.

Dla deweloperów przyjmuje 160-bajtowe wejście i zwraca 32-bajtowe wyjście, co ułatwia przenoszenie istniejących bibliotek i kontraktów L2. Wewnętrznie obejmuje sprawdzanie punktu w nieskończoności i porównania modularne, aby wyeliminować trudne przypadki brzegowe bez psucia prawidłowych wywołań.

**Zasoby**:

- [Specyfikacja techniczna EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Więcej o RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Uwaga: EIP-7951 zastąpił RIP-7212)_

### Meta {#meta}

#### Metoda JSON-RPC `eth_config` {#eth-config}

Jest to wywołanie JSON-RPC, które pozwala zapytać węzeł, jakie ustawienia rozwidlenia są uruchomione. Zwraca trzy migawki: `current`, `next` i `last`, dzięki czemu walidatory i narzędzia monitorujące mogą zweryfikować, czy klienci są przygotowani na nadchodzące rozwidlenie.

W praktyce ma to na celu rozwiązanie problemu odkrytego, gdy rozwidlenie Pectra zostało uruchomione w sieci testowej Holesky na początku 2025 r. z drobnymi błędami w konfiguracji, co doprowadziło do stanu braku finalizacji. Pomaga to zespołom testującym i deweloperom upewnić się, że główne rozwidlenia będą zachowywać się zgodnie z oczekiwaniami podczas przechodzenia z sieci deweloperskich do sieci testowych, a z sieci testowych do Sieci głównej.

Migawki obejmują: `chainId`, `forkId`, planowany czas aktywacji rozwidlenia, które prekompilaty są aktywne, adresy prekompilatów, zależności kontraktów systemowych oraz harmonogram blobów rozwidlenia.

Ten EIP znajduje się w sekcji oddzielonej od „Głównych EIP”, ponieważ rozwidlenie w rzeczywistości nie wdraża żadnych zmian – jest to powiadomienie, że zespoły klienckie muszą zaimplementować tę metodę JSON-RPC do czasu aktualizacji Fusaka.

**Zasoby**: [Specyfikacja techniczna EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Czy ta aktualizacja dotyczy wszystkich węzłów i walidatorów Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Tak, aktualizacja Fusaka wymaga aktualizacji zarówno [klientów warstwy wykonawczej, jak i klientów warstwy konsensusu](/developers/docs/nodes-and-clients/). Wszyscy główni klienci Ethereum wydadzą wersje obsługujące twarde rozwidlenie oznaczone jako wysoki priorytet. Możesz śledzić, kiedy te wydania będą dostępne w repozytoriach GitHub klientów, na ich [kanałach Discord](https://ethstaker.org/support), na [Discordzie EthStaker](https://dsc.gg/ethstaker) lub subskrybując blog Ethereum, aby otrzymywać aktualizacje protokołu. Aby utrzymać synchronizację z siecią Ethereum po aktualizacji, operatorzy węzłów muszą upewnić się, że używają obsługiwanej wersji klienta. Należy pamiętać, że informacje o wydaniach klientów są wrażliwe na czas, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne szczegóły.

### Jak można przekonwertować ETH po twardym rozwidleniu? {#how-can-eth-be-converted-after-the-hardfork}

- **Twoje ETH nie wymaga żadnych działań**: Po aktualizacji Ethereum Fusaka nie ma potrzeby konwertowania ani aktualizowania Twojego ETH. Salda Twoich kont pozostaną takie same, a posiadane obecnie ETH pozostanie dostępne w dotychczasowej formie po twardym rozwidleniu.
- **Uważaj na oszustwa!** <Emoji text="⚠️" /> **każdy, kto instruuje Cię, aby „zaktualizować” Twoje ETH, próbuje Cię oszukać.** Nie musisz nic robić w związku z tą aktualizacją. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie poinformowanym to najlepsza obrona przed oszustwami.

[Więcej o rozpoznawaniu i unikaniu oszustw](/security/)

### O co chodzi z zebrami? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra to wybrana przez deweloperów „maskotka” Fusaka, ponieważ jej paski odzwierciedlają oparte na kolumnach próbkowanie dostępności danych PeerDAS, w którym węzły przechowują określone podsieci kolumn i próbkują kilka innych kolumn ze slotu każdego peera, aby sprawdzić, czy dane blobów są dostępne.

The Merge w 2022 r. [użyło pandy](https://x.com/hwwonx/status/1431970802040127498) jako swojej maskotki, aby zasygnalizować połączenie warstwy wykonawczej i warstwy konsensusu. Od tego czasu maskotki są nieformalnie wybierane dla każdego rozwidlenia i pojawiają się jako grafika ASCII w logach klienta w momencie aktualizacji. To po prostu fajny sposób na świętowanie.

### Jakie ulepszenia uwzględniono w zakresie skalowania L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) to główna funkcja rozwidlenia. Wdraża próbkowanie dostępności danych (DAS), które odblokowuje większą skalowalność dla rollupów, teoretycznie skalując przestrzeń blobów do 8 razy w stosunku do obecnego rozmiaru. Rynek opłat za blob zostanie również ulepszony, aby skutecznie reagować na zatory i gwarantować, że sieci L2 płacą znaczącą opłatę za obliczenia i przestrzeń, które bloby narzucają węzłom.

### Czym różnią się rozwidlenia BPO? {#how-are-bpo-forks-different}

Rozwidlenia tylko dla parametrów blobów (Blob Only Parameter) zapewniają mechanizm ciągłego zwiększania liczby blobów (zarówno docelowej, jak i maksymalnej) po aktywacji PeerDAS, bez konieczności czekania na pełną skoordynowaną aktualizację. Każde zwiększenie jest zakodowane na stałe, aby było wstępnie skonfigurowane w wydaniach klientów obsługujących Fusaka.

Jako użytkownik lub walidator nie musisz aktualizować swoich klientów dla każdego BPO, a jedynie upewnić się, że podążasz za głównymi twardymi rozwidleniami, takimi jak Fusaka. Jest to ta sama praktyka co wcześniej, nie są wymagane żadne specjalne działania. Nadal zaleca się monitorowanie klientów w okolicach aktualizacji i BPO oraz aktualizowanie ich nawet między głównymi wydaniami, ponieważ po twardym rozwidleniu mogą pojawić się poprawki lub optymalizacje.

### Jaki jest harmonogram BPO? {#what-is-the-bpo-schedule}

Dokładny harmonogram aktualizacji BPO zostanie określony wraz z wydaniami Fusaka. Śledź [ogłoszenia dotyczące protokołu](https://blog.ethereum.org/category/protocol) oraz informacje o wydaniach swoich klientów.

Przykład, jak to może wyglądać:

- Przed Fusaka: cel 6, maks. 9
- Przy aktywacji Fusaka: cel 6, maks. 9
- BPO1, kilka tygodni po aktywacji Fusaka: cel 10, maks. 15, wzrost o dwie trzecie
- BPO2, kilka tygodni po BPO1: cel 14, maks. 21

### Czy to obniży opłaty w Ethereum (warstwa 1)? {#will-this-lower-gas}

Ta aktualizacja nie obniża opłat za gaz na L1, przynajmniej nie bezpośrednio. Głównym celem jest większa przestrzeń blobów dla danych rollupów, a tym samym obniżenie opłat w warstwie 2. Może to mieć pewne skutki uboczne na rynku opłat L1, ale nie oczekuje się znaczących zmian.

### Jako stakujący, co muszę zrobić w związku z aktualizacją? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Podobnie jak w przypadku każdej aktualizacji sieci, upewnij się, że zaktualizowałeś swoich klientów do najnowszych wersji oznaczonych jako obsługujące Fusaka. Śledź aktualizacje na liście dyskusyjnej i [Ogłoszenia dotyczące protokołu na blogu EF](https://blog.ethereum.org/category/protocol), aby być na bieżąco z wydaniami.
Aby zweryfikować swoją konfigurację przed aktywacją Fusaka w Sieci głównej, możesz uruchomić walidator w sieciach testowych. Fusaka jest [aktywowana wcześniej w sieciach testowych](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), co daje więcej czasu na upewnienie się, że wszystko działa, i zgłaszanie błędów. Rozwidlenia sieci testowych są również ogłaszane na liście dyskusyjnej i blogu.

### Czy „Deterministyczne przewidywanie proponującego” (EIP-7917) wpływa na walidatory? {#does-7917-affect-validators}

Zmiana ta nie wpływa na sposób funkcjonowania klienta walidatora, jednak zapewni lepszy wgląd w przyszłość Twoich obowiązków jako walidatora. Upewnij się, że zaktualizowałeś swoje narzędzia monitorujące, aby nadążyć za nowymi funkcjami.

### Jak Fusaka wpływa na wymagania dotyczące przepustowości dla węzłów i walidatorów? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS wprowadza znaczącą zmianę w sposobie przesyłania danych blobów przez węzły. Wszystkie dane są dzielone na części zwane kolumnami w 128 podsieciach, a węzły subskrybują tylko niektóre z nich. Liczba kolumn podsieci, które węzły muszą przechowywać, zależy od ich konfiguracji i liczby podłączonych walidatorów. Rzeczywiste wymagania dotyczące przepustowości będą zależeć od liczby blobów dozwolonych w sieci i typu węzła. W momencie aktywacji Fusaka cel blobów pozostaje taki sam jak wcześniej, ale dzięki PeerDAS operatorzy węzłów mogą zauważyć spadek zużycia dysku przez bloby i ruchu sieciowego. Ponieważ BPO konfigurują większą liczbę blobów w sieci, niezbędna przepustowość będzie rosła z każdym BPO.

Wymagania węzłów nadal mieszczą się w [zalecanych marginesach](https://eips.ethereum.org/EIPS/eip-7870) nawet po BPO Fusaka.

#### Pełne węzły {#full-nodes}

Zwykłe węzły bez żadnych walidatorów będą subskrybować tylko 4 podsieci, zapewniając przechowywanie 1/8 oryginalnych danych. Oznacza to, że przy tej samej ilości danych blobów przepustowość węzła potrzebna do ich pobrania byłaby mniejsza ośmiokrotnie (8). Zużycie dysku i przepustowość pobierania blobów dla normalnego pełnego węzła może spaść o około 80%, do zaledwie kilku Mb.

#### Samodzielni stakujący (Solo stakers) {#solo-stakers}

Jeśli węzeł jest używany dla klienta walidatora, musi przechowywać więcej kolumn, a tym samym przetwarzać więcej danych. Po dodaniu walidatora węzeł subskrybuje co najmniej 8 podsieci kolumn, a tym samym przetwarza dwa razy więcej danych niż zwykły węzeł, ale wciąż mniej niż przed Fusaka. Jeśli saldo walidatora przekracza 287 ETH, subskrybowanych będzie coraz więcej podsieci.

Dla samodzielnego stakującego oznacza to, że zużycie dysku i przepustowość pobierania spadną o około 50%. Jednak do lokalnego budowania bloków i przesyłania wszystkich blobów do sieci potrzebna jest większa przepustowość wysyłania. Lokalni budowniczowie będą potrzebować 2-3 razy wyższej przepustowości wysyłania niż wcześniej w momencie Fusaka, a przy celu BPO2 wynoszącym 15/21 blobów, ostateczna niezbędna przepustowość wysyłania będzie musiała być około 5 razy wyższa, na poziomie 100 Mbps.

#### Duzi walidatorzy {#large-validators}

Liczba subskrybowanych podsieci rośnie wraz z większym saldem i liczbą walidatorów dodanych do węzła. Na przykład przy saldzie około 800 ETH węzeł przechowuje 25 kolumn i będzie potrzebował około 30% większej przepustowości pobierania niż wcześniej. Niezbędne wysyłanie rośnie podobnie jak w przypadku zwykłych węzłów i konieczne jest co najmniej 100 Mbps.

Przy 4096 ETH, 2 walidatorach z maksymalnym saldem, węzeł staje się „superwęzłem”, który przechowuje wszystkie kolumny, a zatem pobiera i przechowuje wszystko. Węzły te aktywnie leczą sieć, dostarczając z powrotem brakujące dane, ale wymagają również znacznie większej przepustowości i pamięci masowej. Ponieważ ostateczny cel blobów jest 6 razy wyższy niż wcześniej, superwęzły będą musiały przechowywać około 600 GB dodatkowych danych blobów i mieć szybszą stałą przepustowość pobierania na poziomie około 20 Mbps.

[Przeczytaj więcej szczegółów na temat oczekiwanych wymagań.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Jakie zmiany w EVM zostały wdrożone? {#what-evm-changes-are-implemented}

Fusaka wzmacnia EVM nowymi drobnymi zmianami i funkcjami.

- Ze względów bezpieczeństwa podczas skalowania, maksymalny rozmiar pojedynczej transakcji zostanie [ograniczony do 16,7 miliona](https://eips.ethereum.org/EIPS/eip-7825) jednostek gazu.
- [Nowy kod operacji zliczania wiodących zer (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) został dodany do EVM i umożliwi językom inteligentnych kontraktów wydajniejsze wykonywanie niektórych operacji.
- [Koszt prekompilatu `ModExp` zostanie zwiększony](https://eips.ethereum.org/EIPS/eip-7883) – kontrakty z niego korzystające będą pobierać więcej gazu za wykonanie.

### Jak nowy limit gazu 16M wpływa na deweloperów kontraktów? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka wprowadza limit [maksymalnego rozmiaru pojedynczej transakcji do 16,7 miliona](https://eips.ethereum.org/EIPS/eip-7825) (2^24) jednostek gazu. Jest to w przybliżeniu poprzedni rozmiar średniego bloku, co czyni go wystarczająco dużym, aby pomieścić złożone transakcje, które pochłonęłyby cały blok. Limit ten tworzy ochronę dla klientów, zapobiegając potencjalnym atakom DoS w przyszłości przy wyższym limicie gazu w bloku. Celem skalowania jest umożliwienie większej liczbie transakcji wejścia do blockchaina bez sytuacji, w której jedna z nich pochłania cały blok.

Zwykłe transakcje użytkowników są dalekie od osiągnięcia tego limitu. Zmiana ta może wpłynąć na pewne przypadki brzegowe, takie jak duże i złożone operacje DeFi, wdrożenia dużych inteligentnych kontraktów lub transakcje wsadowe skierowane do wielu kontraktów. Transakcje te będą musiały zostać podzielone na mniejsze lub zoptymalizowane w inny sposób. Użyj symulacji przed przesłaniem transakcji, które potencjalnie osiągają ten limit.

Metoda RPC `eth_call` nie jest ograniczona i pozwoli na symulację większych transakcji niż rzeczywisty limit blockchaina. Rzeczywisty limit dla metod RPC może zostać skonfigurowany przez operatora klienta, aby zapobiec nadużyciom.

### Co CLZ oznacza dla deweloperów? {#what-clz-means-for-developers}

Kompilatory EVM, takie jak Solidity, zaimplementują i będą wykorzystywać nową funkcję do zliczania zer wewnętrznie. Nowe kontrakty mogą skorzystać na oszczędnościach gazu, jeśli polegają na tego rodzaju operacjach. Śledź wydania i ogłoszenia o funkcjach języka inteligentnych kontraktów, aby uzyskać dokumentację dotyczącą potencjalnych oszczędności.

### Czy są jakieś zmiany dla moich istniejących inteligentnych kontraktów? {#what-clz-means-for-developers-2}

Fusaka nie ma bezpośredniego wpływu, który zepsułby jakiekolwiek istniejące kontrakty lub zmienił ich zachowanie. Zmiany wprowadzone w warstwie wykonawczej są dokonywane z zachowaniem kompatybilności wstecznej, jednak zawsze należy zwracać uwagę na przypadki brzegowe i potencjalny wpływ.

[Wraz ze wzrostem kosztu prekompilatu `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), kontrakty, które od niego zależą, będą zużywać więcej gazu na wykonanie. Jeśli Twój kontrakt w dużym stopniu na tym polega i staje się droższy dla użytkowników, rozważ ponowne przemyślenie sposobu jego wykorzystania.

Weź pod uwagę [nowy limit 16,7 miliona](https://eips.ethereum.org/EIPS/eip-7825), jeśli transakcje wykonujące Twoje kontrakty mogą osiągać podobny rozmiar.

## Dalsza lektura {#further-reading}

- [Mapa drogowa Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Ogłoszenie na blogu o sieci testowej Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Co Fusaka i Pectra przyniosą Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Kolejne aktualizacje Ethereum: Fusaka, Glamsterdam i dalej z Prestonem Van Loonem](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Wyjaśnienie PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)