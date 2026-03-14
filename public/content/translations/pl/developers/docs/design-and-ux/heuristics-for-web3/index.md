---
title: 7 heurystyk dla projektowania interfejsu Web3
description: "Zasady poprawiające użyteczność Web3"
lang: pl
---

Heurystyki użyteczności to ogólne „praktyczne zasady”, których możesz użyć do pomiaru użyteczności swojej witryny.
Przedstawione tutaj 7 heurystyk jest specjalnie dostosowanych do Web3 i powinno się je stosować wraz z [10 ogólnymi zasadami projektowania interakcji](https://www.nngroup.com/articles/ten-usability-heuristics/) Jakoba Nielsena.

## Siedem heurystyk użyteczności dla web3 {#seven-usability-heuristics-for-web3}

1. Informacja zwrotna następuje po akcji
2. Bezpieczeństwo i zaufanie
3. Najważniejsze informacje są oczywiste
4. Zrozumiała terminologia
5. Akcje są jak najkrótsze
6. Połączenia sieciowe są widoczne i elastyczne
7. Kontrola z poziomu aplikacji, a nie portfela

## Definicje i przykłady {#definitions-and-examples}

### 1. Informacja zwrotna następuje po akcji {#feedback-follows-action}

**Powinno być oczywiste, kiedy coś się wydarzyło lub dzieje się.**

Użytkownicy decydują o swoich następnych krokach na podstawie wyników swoich poprzednich kroków. Dlatego ważne jest, aby byli na bieżąco informowani o stanie systemu. Jest to szczególnie ważne w Web3, ponieważ zatwierdzenie transakcji w łańcuchu bloków może czasami zająć trochę czasu. Jeśli nie ma informacji zwrotnej informującej ich, że mają czekać, użytkownicy nie są pewni, czy cokolwiek się wydarzyło.

**Wskazówki:**

- Informuj użytkownika za pomocą wiadomości, powiadomień i innych alertów.
- Wyraźnie komunikuj czasy oczekiwania.
- Jeśli akcja ma zająć więcej niż kilka sekund, uspokój użytkownika za pomocą licznika czasu lub animacji, aby poczuł, że coś się dzieje.
- Jeśli proces składa się z wielu kroków, pokaż każdy krok.

**Przykład:**
Pokazanie każdego kroku związanego z transakcją pomaga użytkownikom dowiedzieć się, na jakim etapie procesu się znajdują. Odpowiednie ikony informują użytkownika o stanie jego działań.

![Informowanie użytkownika o każdym kroku podczas wymiany tokenów](./Image1.png)

### 2. Bezpieczeństwo i zaufanie są wbudowane {#security-and-trust-are-backed-in}

Bezpieczeństwo powinno być traktowane priorytetowo i należy to podkreślać użytkownikowi.
Ludzie bardzo dbają o swoje dane. Bezpieczeństwo jest często główną troską użytkowników, więc powinno być brane pod uwagę na wszystkich poziomach projektowania. Zawsze powinieneś starać się zdobyć zaufanie swoich użytkowników, ale sposób, w jaki to robisz, może oznaczać różne rzeczy w różnych aplikacjach. Nie powinno to być coś, o czym myśli się na końcu, ale powinno być świadomie projektowane na każdym etapie. Buduj zaufanie w całym doświadczeniu użytkownika, włączając w to kanały społecznościowe i dokumentację, a także ostateczny interfejs użytkownika. Kwestie takie jak poziom decentralizacji, status multi-sig skarbca i to, czy tożsamość zespołu jest publiczna, wszystko to wpływa na zaufanie użytkowników.

**Wskazówki:**

- Z dumą wymieniaj swoje audyty
- Uzyskaj wiele audytów
- Reklamuj wszelkie zaprojektowane przez siebie funkcje bezpieczeństwa
- Podkreślaj możliwe zagrożenia, w tym te związane z integracjami bazowymi
- Komunikuj złożoność strategii
- Rozważ kwestie niezwiązane z interfejsem użytkownika, które mogą wpływać na postrzeganie bezpieczeństwa przez użytkowników

**Przykład:**
Umieść swoje audyty w stopce, w widocznym rozmiarze.

![Audyty, do których odniesiono się w stopce strony internetowej](./Image2.png)

### 3. Najważniejsze informacje są oczywiste {#the-most-important-info-is-obvious}

W przypadku złożonych systemów pokazuj tylko najistotniejsze dane. Określ, co jest najważniejsze, i nadaj priorytet wyświetlaniu tych informacji.
Zbyt wiele informacji jest przytłaczające, a użytkownicy zazwyczaj opierają się na jednej informacji przy podejmowaniu decyzji. W DeFi prawdopodobnie będzie to APR w aplikacjach do generowania zysków i LTV w aplikacjach pożyczkowych.

**Wskazówki:**

- Badania użytkowników pozwolą odkryć najważniejszą metrykę
- Kluczowe informacje przedstaw w dużym rozmiarze, a pozostałe szczegóły w małym i dyskretnym.
- Ludzie nie czytają, oni skanują wzrokiem; upewnij się, że Twój projekt można łatwo przeskanować wzrokiem.

**Przykład:** duże, kolorowe tokeny są łatwe do znalezienia podczas skanowania wzrokiem. Wartość APR jest duża i podświetlona kolorem akcentującym.

![Token i APR są łatwe do znalezienia](./Image3.png)

### 4. Zrozumiała terminologia {#clear-terminology}

Terminologia powinna być zrozumiała i odpowiednia.
Żargon techniczny może być ogromną przeszkodą, ponieważ wymaga zbudowania zupełnie nowego modelu myślowego. Użytkownicy nie są w stanie odnieść projektu do słów, zwrotów i pojęć, które już znają. Wszystko wydaje się mylące i nieznane, a do tego dochodzi stroma krzywa uczenia się, zanim w ogóle będą mogli spróbować z tego skorzystać. Użytkownik może podejść do DeFi, chcąc zaoszczędzić trochę pieniędzy, a to, co znajduje, to: Mining, farming, staking, emisje, łapówki, skarbce, schowki, veTokeny, vesting, epoki, zdecentralizowane algorytmy, płynność należąca do protokołu...
Staraj się używać prostych terminów, które będą zrozumiałe dla jak najszerszej grupy osób. Nie wymyślaj zupełnie nowych terminów tylko na potrzeby swojego projektu.

**Wskazówki:**

- Używaj prostej i spójnej terminologii
- W miarę możliwości używaj istniejącego języka
- Nie wymyślaj własnych terminów
- Postępuj zgodnie z pojawiającymi się konwencjami
- W miarę możliwości edukuj użytkowników

**Przykład:**
„Twoje nagrody” to szeroko rozumiane, neutralne pojęcie, a nie nowe słowo wymyślone na potrzeby tego projektu. Nagrody są wyrażone w USD, aby pasowały do rzeczywistych modeli myślowych, nawet jeśli same nagrody są w innym tokenie.

![Nagrody w tokenach, wyświetlane w dol. amerykańskich](./Image4.png)

### 5. Akcje są jak najkrótsze {#actions-are-as-short-as-possible}

Przyspiesz interakcje użytkownika, grupując pod-akcje.
Można to zrobić na poziomie inteligentnego kontraktu, jak również w interfejsie użytkownika. Użytkownik nie powinien musieć przechodzić z jednej części systemu do drugiej – ani całkowicie opuszczać systemu – aby wykonać typową akcję.

**Wskazówki:**

- Łącz „Zatwierdź” z innymi akcjami, jeśli to możliwe
- Grupuj kroki podpisywania tak blisko siebie, jak to możliwe

**Przykład:** Połączenie „dodaj płynność” i „stake” jest prostym przykładem akceleratora, który oszczędza czas i gaz użytkownika.

![Modal pokazujący przełącznik do łączenia akcji wpłaty i stakowania](./Image5.png)

### 6. Połączenia sieciowe są widoczne i elastyczne {#network-connections-are-visible-and-flexible}

Informuj użytkownika, z którą siecią jest połączony, i zapewnij przejrzyste skróty do zmiany sieci.
Jest to szczególnie ważne w aplikacjach wielołańcuchowych. Główne funkcje aplikacji powinny być nadal widoczne po rozłączeniu lub połączeniu z nieobsługiwaną siecią.

**Wskazówki:**

- Pokaż jak najwięcej z aplikacji, gdy jesteś rozłączony
- Pokaż, z którą siecią użytkownik jest aktualnie połączony
- Nie zmuszaj użytkownika do przechodzenia do portfela w celu zmiany sieci
- Jeśli aplikacja wymaga od użytkownika zmiany sieci, wywołaj akcję z głównego wezwania do działania
- Jeśli aplikacja zawiera rynki lub skarbce dla wielu sieci, jasno określ, który zestaw użytkownik aktualnie przegląda

**Przykład:** Pokaż użytkownikowi, z którą siecią jest połączony, i pozwól mu ją zmienić na pasku aplikacji.

![Przycisk rozwijany pokazujący podłączoną sieć](./Image6.png)

### 7. Kontrola z poziomu aplikacji, a nie portfela {#control-from-the-app-not-the-wallet}

Interfejs użytkownika powinien informować użytkownika o wszystkim, co musi wiedzieć, i dawać mu kontrolę nad wszystkim, co musi zrobić.
W Web3 istnieją akcje, które podejmujesz w interfejsie użytkownika, i akcje, które podejmujesz w portfelu. Zazwyczaj inicjujesz akcję w interfejsie użytkownika, a następnie potwierdzasz ją w portfelu. Użytkownicy mogą czuć się niekomfortowo, jeśli te dwa wątki nie są starannie zintegrowane.

**Wskazówki:**

- Komunikuj stan systemu za pomocą informacji zwrotnych w interfejsie użytkownika
- Prowadź rejestr ich historii
- Udostępniaj linki do eksploratorów bloków dla starych transakcji
- Udostępnij skróty do zmiany sieci.

**Przykład:** Dyskretny kontener pokazuje użytkownikowi, jakie odpowiednie tokeny ma w swoim portfelu, a główne wezwanie do działania zapewnia skrót do zmiany sieci.

![Główne wezwanie do działania skłania użytkownika do zmiany sieci](./Image7.png)
