---
title: 7 heurystyk projektowania interfejsów Web3
description: Zasady poprawiające użyteczność Web3
lang: pl
---

Heurystyki użyteczności to ogólne „praktyczne zasady”, których można użyć do pomiaru użyteczności witryny.
Przedstawione tutaj 7 heurystyk jest specjalnie dostosowanych do Web3 i powinno być stosowanych wraz z [10 ogólnymi zasadami projektowania interakcji](https://www.nngroup.com/articles/ten-usability-heuristics/) Jakoba Nielsena.

## Siedem heurystyk użyteczności dla Web3 {#seven-usability-heuristics-for-web3}

1. Informacja zwrotna następuje po akcji
2. Bezpieczeństwo i zaufanie
3. Najważniejsze informacje są oczywiste
4. Zrozumiała terminologia
5. Akcje są tak krótkie, jak to możliwe
6. Połączenia sieciowe są widoczne i elastyczne
7. Kontrola z poziomu aplikacji, a nie portfela


## Definicje i przykłady {#definitions-and-examples}

### 1. Informacja zwrotna następuje po akcji {#feedback-follows-action}

**Powinno być oczywiste, kiedy coś się wydarzyło lub właśnie się dzieje.**

Użytkownicy decydują o swoich kolejnych krokach na podstawie wyników poprzednich działań. Dlatego ważne jest, aby byli na bieżąco informowani o stanie systemu. Jest to szczególnie ważne w Web3, ponieważ transakcje mogą czasami wymagać chwili na zatwierdzenie w blockchainie. Jeśli nie ma informacji zwrotnej informującej o konieczności oczekiwania, użytkownicy nie są pewni, czy cokolwiek się wydarzyło.

**Wskazówki:** 
- Informuj użytkownika za pomocą wiadomości, powiadomień i innych alertów.
- Jasno komunikuj czas oczekiwania.
- Jeśli akcja potrwa dłużej niż kilka sekund, uspokój użytkownika za pomocą licznika czasu lub animacji, aby miał poczucie, że coś się dzieje.
- Jeśli proces składa się z wielu kroków, pokaż każdy z nich.

**Przykład:**
Pokazanie każdego kroku związanego z transakcją pomaga użytkownikom zorientować się, na jakim etapie procesu się znajdują. Odpowiednie ikony informują użytkownika o statusie jego działań.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. Bezpieczeństwo i zaufanie są wbudowane {#security-and-trust-are-backed-in}

Bezpieczeństwo powinno być priorytetem i należy to podkreślać użytkownikowi. 
Ludzie bardzo dbają o swoje dane. Bezpieczeństwo jest często głównym zmartwieniem użytkowników, dlatego należy je uwzględniać na wszystkich poziomach projektowania. Zawsze powinieneś dążyć do zdobycia zaufania swoich użytkowników, ale sposób, w jaki to robisz, może oznaczać różne rzeczy w różnych aplikacjach. Nie powinno to być refleksją po fakcie, ale powinno być świadomie projektowane od samego początku. Buduj zaufanie poprzez całe doświadczenie użytkownika, w tym kanały społecznościowe i dokumentację, a także końcowy interfejs użytkownika (UI). Rzeczy takie jak poziom decentralizacji, status portfela multi-sig skarbca i to, czy zespół jest publicznie znany (doxxed), wpływają na zaufanie użytkowników.

**Wskazówki:**
- Z dumą wymieniaj swoje audyty
- Przeprowadź wiele audytów
- Reklamuj wszelkie zaprojektowane przez siebie funkcje bezpieczeństwa
- Podkreślaj możliwe ryzyka, w tym integracje bazowe
- Komunikuj złożoność strategii
- Weź pod uwagę kwestie niezwiązane z interfejsem użytkownika, które mogą wpłynąć na postrzeganie bezpieczeństwa przez użytkowników

**Przykład:** 
Umieść swoje audyty w stopce, w widocznym rozmiarze.

![Audits referenced in the website footer](./Image2.png)

### 3. Najważniejsze informacje są oczywiste {#the-most-important-info-is-obvious}

W przypadku złożonych systemów pokazuj tylko najistotniejsze dane. Określ, co jest najważniejsze, i nadaj priorytet temu wyświetlaniu. 
Zbyt duża ilość informacji przytłacza, a użytkownicy zazwyczaj opierają się na jednej informacji podczas podejmowania decyzji. W zdecentralizowanych finansach (DeFi) będzie to prawdopodobnie APR w aplikacjach dochodowych i LTV w aplikacjach do pożyczania.

**Wskazówki:**
- Badania użytkowników pozwolą odkryć najważniejszą metrykę
- Spraw, aby kluczowe informacje były duże, a inne szczegóły małe i dyskretne
- Ludzie nie czytają, oni skanują tekst; upewnij się, że Twój projekt jest łatwy do skanowania wzrokiem

**Przykład:** Duże tokeny w pełnym kolorze są łatwe do znalezienia podczas skanowania wzrokiem. APR jest duże i wyróżnione kolorem akcentującym.

![The token and APR are easy to find](./Image3.png)

### 4. Jasna terminologia {#clear-terminology}

Terminologia powinna być zrozumiała i odpowiednia.
Techniczny żargon może być ogromną przeszkodą, ponieważ wymaga zbudowania całkowicie nowego modelu mentalnego. Użytkownicy nie są w stanie powiązać projektu ze słowami, frazami i koncepcjami, które już znają. Wszystko wydaje się mylące i nieznane, a krzywa uczenia się jest stroma, zanim w ogóle będą mogli spróbować z tego skorzystać. Użytkownicy mogą podejść do zdecentralizowanych finansów (DeFi), chcąc zaoszczędzić trochę pieniędzy, a to, co znajdują, to: kopanie, farmienie, staking, emisje, łapówki (bribes), skarbce (vaults), blokady (lockers), veTokeny, vesting, epoki, zdecentralizowane algorytmy, płynność będąca własnością protokołu…
Staraj się używać prostych terminów, które będą zrozumiałe dla jak najszerszej grupy ludzi. Nie wymyślaj zupełnie nowych terminów tylko dla swojego projektu.

**Wskazówki:**
- Używaj prostej i spójnej terminologii
- W miarę możliwości używaj istniejącego języka
- Nie wymyślaj własnych terminów
- Przestrzegaj konwencji w miarę ich pojawiania się
- Edukuj użytkowników w jak największym stopniu

**Przykład:**
„Twoje nagrody” to powszechnie zrozumiały, neutralny termin; nie jest to nowe słowo wymyślone na potrzeby tego projektu. Nagrody są denominowane w USD, aby pasowały do modeli mentalnych ze świata rzeczywistego, nawet jeśli same nagrody są w innym tokenie.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. Akcje są tak krótkie, jak to możliwe {#actions-are-as-short-as-possible}

Przyspiesz interakcje użytkownika, grupując akcje podrzędne. 
Można to zrobić na poziomie inteligentnego kontraktu, a także w interfejsie użytkownika. Użytkownik nie powinien musieć przechodzić z jednej części systemu do drugiej – ani całkowicie opuszczać systemu – aby wykonać typową akcję. 

**Wskazówki:**
- Tam, gdzie to możliwe, połącz „Zatwierdź” z innymi akcjami
- Grupuj kroki podpisywania tak blisko siebie, jak to możliwe

**Przykład:** Połączenie „dodaj płynność” i „stakuj” to prosty przykład akceleratora, który oszczędza użytkownikowi zarówno czas, jak i gaz.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. Połączenia sieciowe są widoczne i elastyczne {#network-connections-are-visible-and-flexible}

Poinformuj użytkownika, do jakiej sieci jest podłączony, i zapewnij wyraźne skróty do zmiany sieci. 
Jest to szczególnie ważne w aplikacjach wielosieciowych (multichain). Główne funkcje aplikacji powinny być nadal widoczne po odłączeniu lub podłączeniu do nieobsługiwanej sieci.

**Wskazówki:**
- Pokazuj jak najwięcej aplikacji w stanie odłączenia
- Pokaż, do jakiej sieci użytkownik jest obecnie podłączony
- Nie zmuszaj użytkownika do przechodzenia do portfela w celu zmiany sieci
- Jeśli aplikacja wymaga od użytkownika zmiany sieci, wywołaj tę akcję z głównego wezwania do działania (CTA)
- Jeśli aplikacja zawiera rynki lub skarbce dla wielu sieci, jasno określ, na który zestaw użytkownik obecnie patrzy

**Przykład:** Pokaż użytkownikowi, do jakiej sieci jest podłączony, i pozwól mu ją zmienić na pasku aplikacji.

![Dropdown button showing the connected network](./Image6.png)

### 7. Kontrola z poziomu aplikacji, a nie portfela {#control-from-the-app-not-the-wallet}

Interfejs użytkownika powinien mówić użytkownikowi wszystko, co musi wiedzieć, i dawać mu kontrolę nad wszystkim, co musi zrobić. 
W Web3 istnieją akcje, które wykonujesz w interfejsie użytkownika, oraz akcje, które wykonujesz w portfelu. Zazwyczaj inicjujesz akcję w interfejsie użytkownika, a następnie potwierdzasz ją w portfelu. Użytkownicy mogą czuć się niekomfortowo, jeśli te dwa wątki nie są ze sobą starannie zintegrowane.

**Wskazówki:**
- Komunikuj stan systemu poprzez informacje zwrotne w interfejsie użytkownika
- Prowadź rejestr ich historii
- Udostępniaj linki do eksploratorów bloków dla starych transakcji
- Zapewnij skróty do zmiany sieci. 

**Przykład:** Subtelny kontener pokazuje użytkownikowi, jakie odpowiednie tokeny ma w swoim portfelu, a główne wezwanie do działania (CTA) zapewnia skrót do zmiany sieci.

![Main CTA is prompting the user to switch network](./Image7.png)