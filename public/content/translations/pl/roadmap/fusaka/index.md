---
title: Fulu-Osaka (Fusaka)
description: Poznaj uaktualnienie protokołu Fusaka
lang: pl
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Długo oczekiwane uaktualnienie Ethereum Fusaka zostało uruchomione 3 grudnia 2025 r.**

Uaktualnienie sieci Fusaka następuje po [Pectra](/roadmap/pectra/), wprowadza nowe funkcje i poprawia komfort użytkowania dla każdego użytkownika i dewelopera Ethereum. Nazwa składa się z uaktualnienia warstwy wykonawczej Osaka oraz wersji warstwy konsensusu nazwanej na cześć gwiazdy Fulu. Obie części Ethereum otrzymują uaktualnienie, które przenosi skalowanie, bezpieczeństwo i doświadczenie użytkownika Ethereum w przyszłość.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Uaktualnienie Fusaka to tylko jeden z etapów długoterminowych celów rozwojowych Ethereum. Dowiedz się więcej o [planie działania protokołu](/roadmap/) oraz [wcześniejszych uaktualnieniach](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Usprawnienia wprowadzone w Fusaka {#improvements-in-fusaka}

### Skalowanie blobów {#scale-blobs}

#### PeerDAS {#peerdas}

To _główna atrakcja_ forka Fusaka, kluczowa funkcja dodana w tym uaktualnieniu. Warstwy 2 obecnie publikują swoje dane w Ethereum w blobach, efemerycznym typie danych stworzonym specjalnie dla warstw 2. Przed Fusaką każdy pełny węzeł musiał przechowywać wszystkie bloby, aby zapewnić, że dane istnieją. W miarę wzrostu przepustowości blobów pobieranie wszystkich tych danych staje się niewspółmiernie zasobochłonne.

Dzięki [próbkowaniu dostępności danych](https://notes.ethereum.org/@fradamt/das-fork-choice) każdy węzeł, zamiast przechowywać wszystkie dane blobów, będzie odpowiedzialny za ich podzbiór. Bloby są równomiernie i losowo rozdzielane między węzłami w sieci, przy czym każdy pełny węzeł przechowuje tylko 1/8 danych, co teoretycznie umożliwia skalowanie do 8x. Aby zapewnić dostępność danych, dowolną ich część można odtworzyć z dowolnych 50% całości za pomocą metod, które sprowadzają prawdopodobieństwo błędnych lub brakujących danych do kryptograficznie pomijalnego poziomu (od ~1 na 10<sup>20</sup> do 1 na 10<sup>24</sup>).

Utrzymuje to wymagania sprzętowe i przepustowości dla węzłów na rozsądnym poziomie, jednocześnie umożliwiając skalowanie blobów, co skutkuje większą skalą przy mniejszych opłatach dla warstw 2.

[Dowiedz się więcej o PeerDAS](/roadmap/fusaka/peerdas/)

**Źródła**:

- [Specyfikacja techniczna EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion o PeerDAS: Skalowanie Ethereum dzisiaj | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademickie: Dokumentacja PeerDAS w Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Forki tylko dla parametrów blobów {#blob-parameter-only-forks}

Warstwy 2 skalują Ethereum – w miarę rozwoju ich sieci muszą publikować więcej danych w Ethereum. Oznacza to, że z czasem Ethereum będzie musiało zwiększyć liczbę dostępnych dla nich blobów. Chociaż PeerDAS umożliwia skalowanie danych blobów, musi to być przeprowadzane stopniowo i bezpiecznie.

Ponieważ Ethereum to kod działający na tysiącach niezależnych węzłów, które wymagają zgody na te same zasady, nie możemy po prostu wprowadzać zmian, takich jak zwiększenie liczby blobów, w taki sam sposób, w jaki wdraża się aktualizację strony internetowej. Każda zmiana zasad musi być skoordynowanym uaktualnieniem, w ramach którego każdy węzeł, klient i oprogramowanie walidatora aktualizuje się przed tym samym, z góry określonym blokiem.

Te skoordynowane uaktualnienia zazwyczaj obejmują wiele zmian, wymagają wielu testów, a to zajmuje czas. Aby szybciej dostosować się do zmieniających się potrzeb blobów warstwy 2, forki tylko dla parametrów blobów wprowadzają mechanizm zwiększania liczby blobów bez konieczności czekania na harmonogram uaktualnień.

Forki tylko dla parametrów blobów mogą być ustawiane przez klientów, podobnie jak inne konfiguracje, np. limit gazu. Pomiędzy głównymi uaktualnieniami Ethereum klienci mogą uzgodnić zwiększenie docelowej (`target`) i maksymalnej (`max`) liczby blobów do np. 9 i 12, a następnie operatorzy węzłów zaktualizują się, aby wziąć udział w tym niewielkim forku. Te forki tylko dla parametrów blobów można konfigurować w dowolnym momencie.

Kiedy bloby zostały po raz pierwszy dodane do sieci w uaktualnieniu Dencun, docelowa liczba wynosiła 3. W uaktualnieniu Pectra została ona zwiększona do 6, a po Fusace może być teraz zwiększana w zrównoważonym tempie, niezależnie od tych głównych uaktualnień sieci.

![Wykres pokazujący średnią liczbę blobów na blok i rosnące cele wraz z uaktualnieniami](./average-blob-count-per-block.webp)

Źródło wykresu: [Ethereum Blobs – @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Źródła**: [Specyfikacja techniczna EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Podstawowa opłata za bloby ograniczona kosztami wykonania {#blob-base-fee-bounded-by-execution-costs}

Warstwy 2 płacą dwa rachunki, gdy publikują dane: opłatę za blob i gaz wykonawczy potrzebny do weryfikacji tych blobów. Jeśli dominuje gaz wykonawczy, aukcja opłat za bloby może spaść do 1 wei i przestać być sygnałem cenowym.

EIP-7918 ustala proporcjonalną cenę rezerwową pod każdym blobem. Gdy rezerwa jest wyższa niż nominalna podstawowa opłata za blob, algorytm dostosowywania opłat traktuje blok jako przekraczający cel, przestaje obniżać opłatę i pozwala jej normalnie wzrosnąć. W rezultacie:

- rynek opłat za bloby zawsze reaguje na przeciążenia
- warstwy 2 płacą co najmniej znaczącą część za moc obliczeniową, którą narzucają węzłom
- skoki opłaty podstawowej na EL nie mogą już blokować opłaty za bloby na poziomie 1 wei

**Źródła**:

- [Specyfikacja techniczna EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Wyjaśnienie w formie Storybooka](https://notes.ethereum.org/@anderselowsson/AIG)

### Skalowanie L1 {#scale-l1}

#### Wygasanie historii i prostsze potwierdzenia {#history-expiry}

W lipcu 2025 r. klienci wykonawczy Ethereum [zaczęli obsługiwać częściowe wygasanie historii](https://blog.ethereum.org/2025/07/08/partial-history-exp). Spowodowało to usunięcie historii starszej niż [Połączenie (The Merge)](https://ethereum.org/roadmap/merge/), aby zmniejszyć ilość miejsca na dysku wymaganego przez operatorów węzłów w miarę dalszego rozwoju Ethereum.

Ten EIP znajduje się w osobnej sekcji niż „Główne EIP”, ponieważ fork tak naprawdę nie wprowadza żadnych zmian – jest to powiadomienie, że zespoły klientów muszą obsługiwać wygasanie historii do czasu uaktualnienia Fusaka. W praktyce klienci mogą wdrożyć to w dowolnym momencie, ale dodanie tego do uaktualnienia konkretnie umieściło to na ich liście zadań i umożliwiło im testowanie zmian w Fusace w połączeniu z tą funkcją.

**Źródła**: [Specyfikacja techniczna EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Ustawienie górnych granic dla MODEXP {#set-upper-bounds-for-modexp}

Do tej pory prekompilat MODEXP akceptował liczby praktycznie dowolnego rozmiaru. Utrudniało to testowanie, ułatwiało nadużycia i stanowiło zagrożenie dla stabilności klienta. EIP-7823 wprowadza wyraźny limit: każda liczba wejściowa może mieć co najwyżej 8192 bity (1024 bajty) długości. Większe wartości są odrzucane, gaz transakcji jest spalany, a żadne zmiany stanu nie następują. Z dużą swobodą pokrywa to rzeczywiste potrzeby, eliminując jednocześnie skrajne przypadki, które komplikowały planowanie limitu gazu i przeglądy bezpieczeństwa. Ta zmiana zapewnia większe bezpieczeństwo i ochronę przed atakami DoS, nie wpływając na doświadczenie użytkownika ani dewelopera.

**Źródła**: [Specyfikacja techniczna EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Górny limit gazu dla transakcji {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) dodaje górny limit 16 777 216 (2^24) jednostek gazu na transakcję. Jest to proaktywne wzmocnienie ochrony przed atakami DoS poprzez ograniczenie najgorszego możliwego kosztu pojedynczej transakcji w miarę podnoszenia limitu gazu w bloku. Ułatwia to modelowanie walidacji i propagacji, co pozwala nam zająć się skalowaniem poprzez podniesienie limitu gazu.

Dlaczego dokładnie 2^24 jednostek gazu? Jest to wartość znacznie mniejsza niż obecny limit gazu, wystarczająco duża dla rzeczywistych wdrożeń kontraktów i ciężkich prekompilatów, a potęga 2 ułatwia implementację na różnych klientach. Ten nowy maksymalny rozmiar transakcji jest podobny do średniego rozmiaru bloku sprzed uaktualnienia Pectra, co czyni go rozsądnym limitem dla każdej operacji na Ethereum.

**Źródła**: [Specyfikacja techniczna EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Zwiększenie kosztu gazu dla `MODEXP` {#modexp-gas-cost-increase}

MODEXP to wbudowana funkcja prekompilacji, która oblicza potęgowanie modularne, rodzaj matematyki na dużych liczbach używany w weryfikacji podpisów RSA i systemach dowodów. Pozwala to kontraktom na bezpośrednie wykonywanie tych obliczeń bez konieczności ich samodzielnego implementowania.

Deweloperzy i zespoły klientów zidentyfikowali MODEXP jako główną przeszkodę w zwiększaniu limitu gazu w bloku, ponieważ obecna wycena gazu często niedoszacowuje, ile mocy obliczeniowej wymagają niektóre dane wejściowe. Oznacza to, że jedna transakcja używająca MODEXP może zająć większość czasu potrzebnego do przetworzenia całego bloku, spowalniając sieć.

Ten EIP zmienia wycenę, aby dopasować ją do rzeczywistych kosztów obliczeniowych poprzez:

- podniesienie minimalnej opłaty z 200 do 500 jednostek gazu i usunięcie zniżki w wysokości jednej trzeciej z EIP-2565 w ogólnym obliczeniu kosztów
- gwałtowniejsze zwiększanie kosztu, gdy wykładnik wejściowy jest bardzo długi. jeśli wykładnik (liczba „potęgi” podawana jako drugi argument) jest dłuższy niż 32 bajty / 256 bitów, opłata za gaz rośnie znacznie szybciej za każdy dodatkowy bajt
- naliczanie dodatkowych opłat za dużą podstawę lub moduł. Przyjmuje się, że pozostałe dwie liczby (podstawa i moduł) mają co najmniej 32 bajty – jeśli którakolwiek z nich jest większa, koszt rośnie proporcjonalnie do jej rozmiaru

Dzięki lepszemu dopasowaniu kosztów do rzeczywistego czasu przetwarzania MODEXP nie może już powodować, że walidacja bloku trwa zbyt długo. Ta zmiana jest jedną z kilku, które mają na celu umożliwienie bezpiecznego zwiększenia limitu gazu w bloku Ethereum w przyszłości.

**Źródła**: [Specyfikacja techniczna EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limit rozmiaru bloku wykonawczego RLP {#rlp-execution-block-size-limit}

Tworzy to górny limit rozmiaru bloku – jest to limit tego, co jest _wysyłane_ przez sieć i jest oddzielny od limitu gazu, który ogranicza _pracę_ wewnątrz bloku. Limit rozmiaru bloku wynosi 10 MiB, z niewielkim marginesem (2 MiB) zarezerwowanym na dane konsensusu, aby wszystko pasowało i propagowało się bezproblemowo. Jeśli pojawi się większy blok, klienci go odrzucą.
Jest to konieczne, ponieważ bardzo duże bloki rozprzestrzeniają się i weryfikują w sieci dłużej i mogą powodować problemy z konsensusem lub być nadużywane jako wektor ataku DoS. Ponadto protokół plotkowania (gossip) warstwy konsensusu już teraz nie przekazuje bloków o rozmiarze powyżej ~10 MiB, więc dostosowanie warstwy wykonawczej do tego limitu pozwala uniknąć dziwnych sytuacji, w których blok jest „widziany przez jednych, a odrzucany przez innych”.

Wchodząc w szczegóły: jest to górny limit rozmiaru bloku wykonawczego zakodowanego w [RLP](/developers/docs/data-structures-and-encoding/rlp/). Łącznie 10 MiB, z 2 MiB marginesem bezpieczeństwa zarezerwowanym na ramkowanie bloku beacon. W praktyce klienci definiują

`MAX_BLOCK_SIZE = 10 485 760` bajtów oraz

`SAFETY_MARGIN = 2 097 152` bajtów,

i odrzucają każdy blok wykonawczy, którego ładunek RLP przekracza

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Celem jest ograniczenie najgorszego możliwego czasu propagacji/walidacji i dostosowanie do zachowania protokołu plotkowania (gossip) warstwy konsensusu, zmniejszając ryzyko reorg/DoS bez zmiany rozliczania gazu.

**Źródła**: [Specyfikacja techniczna EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Ustawienie domyślnego limitu gazu na 60 milionów {#set-default-gas-limit-to-60-million}

Przed podniesieniem limitu gazu z 30 mln do 36 mln w lutym 2025 r. (a następnie do 45 mln) wartość ta nie zmieniła się od czasu Połączenia (wrzesień 2022 r.). Ten EIP ma na celu uczynienie spójnego skalowania priorytetem.

EIP-7935 koordynuje zespoły klientów EL w celu podniesienia domyślnego limitu gazu powyżej dzisiejszych 45 mln dla Fusaki. Jest to informacyjny EIP, ale wyraźnie prosi klientów o testowanie wyższych limitów na devnetach, uzgodnienie bezpiecznej wartości i dostarczenie tej liczby w swoich wydaniach Fusaka.

Planowanie devnetów zakłada testy obciążeniowe na poziomie ~60 mln (pełne bloki z syntetycznym obciążeniem) i iteracyjne podnoszenie limitu; badania wskazują, że patologie związane z rozmiarem bloku w najgorszym przypadku nie powinny być wiążące poniżej ~150 mln. Wdrożenie powinno być połączone z górnym limitem gazu dla transakcji (EIP-7825), aby żadna pojedyncza transakcja nie mogła dominować w miarę wzrostu limitów.

**Źródła**: [Specyfikacja techniczna EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Poprawa UX {#improve-ux}

#### Deterministyczne przewidywanie propozycji {#deterministic-proposer-lookahead}

Dzięki EIP-7917 łańcuch beacon będzie wiedział o nadchodzących proponujących bloki na następną epokę. Posiadanie deterministycznego wglądu w to, którzy walidatorzy będą proponować przyszłe bloki, może umożliwić [pre-potwierdzenia](https://ethresear.ch/t/based-preconfirmations/17353) – zobowiązanie z nadchodzącym proponującym, które gwarantuje, że transakcja użytkownika zostanie uwzględniona w jego bloku bez czekania na faktyczny blok.

Ta funkcja przynosi korzyści implementacjom klientów i bezpieczeństwu sieci, ponieważ zapobiega skrajnym przypadkom, w których walidatorzy mogliby manipulować harmonogramem proponujących. Przewidywanie pozwala również na zmniejszenie złożoności implementacji.

**Źródła**: [Specyfikacja techniczna EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Kod operacji liczenia zer wiodących (CLZ) {#count-leading-zeros-opcode}

Ta funkcja dodaje małą instrukcję EVM, **liczenie zer wiodących (CLZ)**. Większość danych w EVM jest reprezentowana jako wartość 256-bitowa — ten nowy kod operacji zwraca liczbę bitów zerowych na początku. Jest to powszechna funkcja w wielu architekturach zestawów instrukcji, ponieważ umożliwia bardziej wydajne operacje arytmetyczne. W praktyce sprowadza to dzisiejsze ręcznie pisane skanowanie bitów do jednego kroku, dzięki czemu znajdowanie pierwszego ustawionego bitu, skanowanie bajtów lub parsowanie pól bitowych staje się prostsze i tańsze. Kod operacji ma niski, stały koszt i został przetestowany jako porównywalny z podstawowym dodawaniem, co skraca kod bajtowy i oszczędza gaz przy tej samej pracy.

**Źródła**: [Specyfikacja techniczna EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Prekompilat dla obsługi krzywej secp256r1 {#secp256r1-precompile}

Wprowadza wbudowany weryfikator podpisów secp256r1 (P-256) w stylu passkey pod stałym adresem `0x100`, używając tego samego formatu wywołania, który został już przyjęty przez wiele warstw 2, i naprawiając skrajne przypadki, dzięki czemu kontrakty napisane dla tych środowisk działają na L1 bez zmian.

Ulepszenie UX! Dla użytkowników odblokowuje to natywne podpisywanie na urządzeniu i klucze passkey. Portfele mogą bezpośrednio korzystać z Apple Secure Enclave, Android Keystore, sprzętowych modułów bezpieczeństwa (HSM) i FIDO2/WebAuthn – bez frazy seed, z płynniejszym wdrażaniem i wieloskładnikowymi przepływami, które przypominają nowoczesne aplikacje. Skutkuje to lepszym UX, łatwiejszym odzyskiwaniem i wzorcami abstrakcji kont, które pasują do tego, co już robią miliardy urządzeń.

Dla deweloperów przyjmuje 160-bajtowe wejście i zwraca 32-bajtowe wyjście, co ułatwia przenoszenie istniejących bibliotek i kontraktów L2. Pod maską zawiera sprawdzanie punktu w nieskończoności i porównania modularne, aby wyeliminować trudne skrajne przypadki bez zakłócania prawidłowych wywołań.

**Źródła**:

- [Specyfikacja techniczna EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Więcej o RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Należy pamiętać, że EIP-7951 zastąpił RIP-7212)_

### Meta {#meta}

#### Metoda JSON-RPC `eth_config` {#eth-config}

Jest to wywołanie JSON-RPC, które pozwala zapytać węzeł o ustawienia forka, na których działa. Zwraca trzy migawki: `current` (bieżąca), `next` (następna) i `last` (ostatnia), dzięki czemu walidatorzy i narzędzia monitorujące mogą zweryfikować, czy klienci są przygotowani na nadchodzący fork.

W praktyce ma to na celu usunięcie niedociągnięcia odkrytego, gdy fork Pectra został uruchomiony na sieci testowej Holesky na początku 2025 roku z drobnymi błędami konfiguracyjnymi, co doprowadziło do stanu braku finalizacji. Pomaga to zespołom testującym i deweloperom upewnić się, że główne forki będą zachowywać się zgodnie z oczekiwaniami podczas przechodzenia z devnetów na testnety i z testnetów na Mainnet.

Migawki zawierają: `chainId`, `forkId`, planowany czas aktywacji forka, które prekompilaty są aktywne, adresy prekompilatów, zależności kontraktów systemowych oraz harmonogram blobów forka.

Ten EIP znajduje się w osobnej sekcji niż „Główne EIP”, ponieważ fork tak naprawdę nie wprowadza żadnych zmian – jest to powiadomienie, że zespoły klientów muszą zaimplementować tę metodę JSON-RPC do czasu uaktualnienia Fusaka.

**Źródła**: [Specyfikacja techniczna EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Czy to uaktualnienie wpływa na wszystkie węzły i walidatory Ethereum? Czy to uaktualnienie wpływa na wszystkie węzły i walidatory Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Tak, uaktualnienie Fusaka wymaga aktualizacji zarówno [klientów wykonawczych, jak i klientów konsensusu](/developers/docs/nodes-and-clients/). Wszystkie główne klienty Ethereum wydadzą wersję obsługujące ten hard fork oznaczone jako priorytetowe. Możesz śledzić, kiedy te wydania będą dostępne w repozytoriach Github klientów, na ich [kanałach Discord](https://ethstaker.org/support), na [Discordzie EthStaker](https://dsc.gg/ethstaker) lub subskrybując blog Ethereum, aby otrzymywać aktualizacje protokołu. Aby zachować synchronizację z siecią Ethereum po uaktualnieniu, operatorzy węzłów muszą się upewnić, że korzystają z obsługiwanej wersji klienta. Należy pamiętać, że informacje o wersjach klienta zależą od czasu, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne szczegóły.

### Jak można przekonwertować ETH po hard forku? {#how-can-eth-be-converted-after-the-hardfork}

- **Nie musisz nic robić ze swoim ETH**: po uaktualnieniu Ethereum Fusaka nie ma potrzeby konwertowania ani ulepszania swojego ETH. Salda Twoich kont pozostaną takie same, a ETH, które obecnie posiadasz, pozostanie dostępne w tej samej formie po hard forku.
- **Uważaj na oszustwa!** <Emoji text="⚠️" /> **Każdy, kto mówi Ci, aby „ulepszyć” ETH, próbuje cię oszukać.** Nie musisz nic robić w związku z tym uaktualnieniem. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie na bieżąco jest najlepszą formą obrony przed oszustwami.

[Więcej na temat rozpoznawania i unikania oszustw](/security/)

### O co chodzi z zebrami? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra jest wybraną przez deweloperów „maskotką” Fusaki, ponieważ jej paski odzwierciedlają kolumnowe próbkowanie dostępności danych w PeerDAS, w którym węzły przechowują określone podsieci kolumn i próbkują kilka innych kolumn z każdego slotu peerów, aby sprawdzić, czy dane bloba są dostępne.

W Połączeniu (The Merge) w 2022 r. użyto [pandy](https://x.com/hwwonx/status/1431970802040127498) jako maskotki, aby zasygnalizować połączenie warstw wykonawczej i konsensusu. Od tego czasu maskotki są nieformalnie wybierane dla każdego forka i pojawiają się jako sztuka ASCII w logach klienta w momencie uaktualnienia. To po prostu fajny sposób na świętowanie.

### Jakie ulepszenia są zawarte dla skalowania L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) jest główną cechą tego forka. Implementuje próbkowanie dostępności danych (DAS), które odblokowuje większą skalowalność dla rollupów, teoretycznie skalując przestrzeń blobów do 8-krotności obecnego rozmiaru. Rynek opłat za bloby zostanie również ulepszony, aby efektywnie reagować na przeciążenia i gwarantować, że warstwy 2 płacą znaczącą opłatę za moc obliczeniową i przestrzeń, które bloby narzucają węzłom.

### Czym różnią się forki BPO? {#how-are-bpo-forks-different}

Forki tylko dla parametrów blobów (BPO) zapewniają mechanizm ciągłego zwiększania liczby blobów (zarówno docelowej, jak i maksymalnej) po aktywacji PeerDAS, bez konieczności czekania na pełne, skoordynowane uaktualnienie. Każde zwiększenie jest zakodowane na stałe i prekonfigurowane w wydaniach klientów obsługujących Fusakę.

Jako użytkownik lub walidator nie musisz aktualizować swoich klientów przy każdym BPO i musisz tylko pamiętać o śledzeniu głównych hardforków, takich jak Fusaka. Jest to taka sama praktyka jak wcześniej, nie są wymagane żadne specjalne działania. Nadal zaleca się monitorowanie klientów w okresach uaktualnień i BPO oraz ich aktualizowanie nawet między głównymi wydaniami, ponieważ po hardforku mogą pojawić się poprawki lub optymalizacje.

### Jaki jest harmonogram BPO? {#what-is-the-bpo-schedule}

Dokładny harmonogram aktualizacji BPO zostanie określony wraz z wydaniami Fusaka. Śledź [ogłoszenia dotyczące protokołu](https://blog.ethereum.org/category/protocol) i noty o wydaniu swoich klientów.

Przykładowy wygląd:

- Przed Fusaką: cel 6, maks. 9
- Przy aktywacji Fusaki: cel 6, maks. 9
- BPO1, kilka tygodni po aktywacji Fusaki: cel 10, maks. 15, wzrost o dwie trzecie
- BPO2, kilka tygodni po BPO1: cel 14, maks. 21

### Czy to obniży opłaty na Ethereum (warstwa 1)? {#will-this-lower-gas}

To uaktualnienie nie obniża opłat za gaz na L1, przynajmniej nie bezpośrednio. Głównym celem jest zapewnienie większej przestrzeni blobów dla danych rollupów, co obniża opłaty na warstwie 2. Może to mieć pewne skutki uboczne na rynku opłat L1, ale nie oczekuje się znaczących zmian.

### Jako staker, co muszę zrobić w związku z uaktualnieniem? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Jak przy każdym uaktualnieniu sieci, upewnij się, że aktualizujesz swoich klientów do najnowszych wersji oznaczonych jako obsługujące Fusakę. Śledź aktualizacje na liście mailingowej i [ogłoszenia dotyczące protokołu na blogu EF](https://blog.ethereum.org/category/protocol), aby być na bieżąco z informacjami o wydaniach.
Aby zweryfikować swoją konfigurację przed aktywacją Fusaki na Mainnet, możesz uruchomić walidatora na sieciach testowych. Fusaka jest [aktywowana wcześniej na sieciach testowych](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), co daje więcej czasu na upewnienie się, że wszystko działa, i zgłaszanie błędów. Forki na sieciach testowych są również ogłaszane na liście mailingowej i blogu.

### Czy „Deterministyczne przewidywanie propozycji” (EIP-7917) wpływa na walidatorów? {#does-7917-affect-validators}

Ta zmiana nie wpływa na sposób działania Twojego klienta walidatora, jednak zapewni lepszy wgląd w przyszłe obowiązki walidatora. Upewnij się, że aktualizujesz swoje narzędzia do monitorowania, aby być na bieżąco z nowymi funkcjami.

### Jak Fusaka wpływa na wymagania dotyczące przepustowości dla węzłów i walidatorów? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS wprowadza znaczącą zmianę w sposobie, w jaki węzły przesyłają dane blobów. Wszystkie dane są podzielone na fragmenty zwane kolumnami w 128 podsieciach, a węzły subskrybują tylko niektóre z nich. Liczba kolumn podsieci, które węzły muszą przechowywać, zależy od ich konfiguracji i liczby podłączonych walidatorów. Rzeczywiste wymagania dotyczące przepustowości będą zależeć od liczby dozwolonych blobów w sieci i typu węzła. W momencie aktywacji Fusaki docelowa liczba blobów pozostaje taka sama jak wcześniej, ale dzięki PeerDAS operatorzy węzłów mogą zauważyć spadek zużycia dysku na bloby i ruchu sieciowego. W miarę jak BPO będą konfigurować większą liczbę blobów w sieci, niezbędna przepustowość będzie rosła z każdym BPO.

Wymagania dotyczące węzłów nadal mieszczą się w [zalecanych marginesach](https://eips.ethereum.org/EIPS/eip-7870) nawet po BPO wprowadzonych w Fusace.

#### Pełne węzły {#full-nodes}

Zwykłe węzły bez żadnych walidatorów będą subskrybować tylko 4 podsieci, zapewniając przechowywanie 1/8 oryginalnych danych. Oznacza to, że przy tej samej ilości danych blobów przepustowość węzła do ich pobierania będzie mniejsza ośmiokrotnie (8x). Zużycie dysku i przepustowość pobierania blobów dla normalnego pełnego węzła może spaść o około 80%, do zaledwie kilku Mb.

#### Stakerzy solo {#solo-stakers}

Jeśli węzeł jest używany dla klienta walidatora, musi przechowywać więcej kolumn, a zatem przetwarzać więcej danych. Po dodaniu walidatora węzeł subskrybuje co najmniej 8 podsieci kolumn, a zatem przetwarza dwa razy więcej danych niż zwykły węzeł, ale wciąż mniej niż przed Fusaką. Jeśli saldo walidatora przekracza 287 ETH, subskrybowanych będzie coraz więcej podsieci.

Dla stakera solo oznacza to, że zużycie dysku i przepustowość pobierania zmniejszą się o około 50%. Jednakże, aby budować bloki lokalnie i przesyłać wszystkie bloby do sieci, potrzebna jest większa przepustowość wysyłania. Lokalni budowniczowie będą potrzebować 2-3 razy większej przepustowości wysyłania niż wcześniej w momencie aktywacji Fusaki, a przy docelowej liczbie blobów BPO2 wynoszącej 15/21, ostateczna niezbędna przepustowość wysyłania będzie musiała być około 5 razy wyższa i wynosić 100 Mpbs.

#### Duże walidatory {#large-validators}

Liczba subskrybowanych podsieci rośnie wraz z większym saldem i liczbą walidatorów dodanych do węzła. Na przykład przy saldzie około 800 ETH węzeł przechowuje 25 kolumn i będzie potrzebował o około 30% większej przepustowości pobierania niż wcześniej. Niezbędna przepustowość wysyłania rośnie podobnie jak w przypadku zwykłych węzłów i wymagane jest co najmniej 100 Mbps.

Przy 4096 ETH i 2 walidatorach z maksymalnym saldem węzeł staje się „superwęzłem”, który przechowuje wszystkie kolumny, a zatem pobiera i przechowuje wszystko. Te węzły aktywnie „leczą” sieć, dostarczając brakujące dane, ale wymagają też znacznie większej przepustowości i pamięci masowej. Przy ostatecznym celu blobów 6 razy wyższym niż wcześniej, superwęzły będą musiały przechowywać około 600 GB dodatkowych danych blobów i mieć szybszą stałą przepustowość pobierania na poziomie około 20 Mbps.

[Przeczytaj więcej szczegółów na temat oczekiwanych wymagań.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Jakie zmiany w EVM są implementowane? {#what-evm-changes-are-implemented}

Fusaka umacnia EVM dzięki nowym drobnym zmianom i funkcjom.

- Dla bezpieczeństwa podczas skalowania maksymalny rozmiar pojedynczej transakcji zostanie [ograniczony do 16,7 miliona](https://eips.ethereum.org/EIPS/eip-7825) jednostek gazu.
- [Nowy kod operacji liczenia zer wiodących (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) jest dodawany do EVM i umożliwi językom inteligentnych kontraktów bardziej efektywne wykonywanie niektórych operacji.
- [Koszt prekompilatu `ModExp` zostanie zwiększony](https://eips.ethereum.org/EIPS/eip-7883) — kontrakty z niego korzystające będą pobierać więcej gazu za wykonanie.

### Jak nowy limit gazu 16 mln wpływa na deweloperów kontraktów? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka wprowadza limit [maksymalnego rozmiaru pojedynczej transakcji do 16,7 miliona](https://eips.ethereum.org/EIPS/eip-7825) (2^24) jednostek gazu. Jest to w przybliżeniu poprzedni rozmiar średniego bloku, co czyni go wystarczająco dużym, aby pomieścić złożone transakcje, które zużyłyby cały blok. Limit ten tworzy ochronę dla klientów, zapobiegając potencjalnym atakom DoS w przyszłości przy wyższym limicie gazu w bloku. Celem skalowania jest umożliwienie umieszczenia większej liczby transakcji w blockchainie bez sytuacji, w której jedna z nich zużywałaby cały blok.

Zwykłe transakcje użytkowników są dalekie od osiągnięcia tego limitu. Niektóre skrajne przypadki, takie jak duże i złożone operacje DeFi, duże wdrożenia inteligentnych kontraktów lub transakcje wsadowe skierowane do wielu kontraktów, mogą zostać dotknięte tą zmianą. Te transakcje będą musiały zostać podzielone na mniejsze lub zoptymalizowane w inny sposób. Użyj symulacji przed przesłaniem transakcji, które potencjalnie mogą osiągnąć limit.

Metoda RPC `eth_call` nie jest ograniczona i pozwoli na symulację transakcji większych niż faktyczny limit blockchaina. Faktyczny limit dla metod RPC może być skonfigurowany przez operatora klienta, aby zapobiec nadużyciom.

### Co CLZ oznacza dla deweloperów? {#what-clz-means-for-developers}

Kompilatory EVM, takie jak Solidity, zaimplementują i wykorzystają nową funkcję do liczenia zer pod maską. Nowe kontrakty mogą skorzystać na oszczędnościach gazu, jeśli opierają się na tego rodzaju operacjach. Śledź wydania i ogłoszenia o funkcjach języka inteligentnych kontraktów, aby uzyskać dokumentację na temat potencjalnych oszczędności.

### Czy są jakieś zmiany dla moich istniejących inteligentnych kontraktów? {#what-clz-means-for-developers}

Fusaka nie ma bezpośredniego wpływu, który mógłby uszkodzić istniejące kontrakty lub zmienić ich zachowanie. Zmiany wprowadzane w warstwie wykonawczej są dokonywane z zachowaniem kompatybilności wstecznej, jednak zawsze należy zwracać uwagę na skrajne przypadki i potencjalny wpływ.

[Wraz ze wzrostem kosztu prekompilatu `ModExp`](https://eips.ethereum.org/EIPS/eip-7883) kontrakty, które od niego zależą, będą zużywać więcej gazu na wykonanie. Jeśli twój kontrakt w dużym stopniu na tym polega i staje się droższy dla użytkowników, rozważ ponowne przemyślenie sposobu jego wykorzystania.

Rozważ [nowy limit 16,7 miliona](https://eips.ethereum.org/EIPS/eip-7825), jeśli transakcje wykonujące twoje kontrakty mogą osiągać podobny rozmiar.

## Dalsze materiały {#further-reading}

- [Plan działania Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Ogłoszenie na blogu dotyczące sieci testowej Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Co Fusaka i Pectra przyniosą Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Następne uaktualnienia Ethereum: Fusaka, Glamsterdam i dalej z Prestonem Van Loonem](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Wyjaśnienie PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
