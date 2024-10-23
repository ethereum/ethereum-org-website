---
title: Bezstanowość, wygasanie stanu oraz wygasanie historii
description: Objaśnienie wygasania historii oraz bezstanowości Ethereum
lang: pl
---

# Bezstanowość, wygasanie stanu oraz wygasanie historii {#statelessness}

Możliwość uruchamiania węzłów Ethereum na skromnym sprzęcie jest kluczowa dla prawdziwej decentralizacji. Wynika to z tego, że uruchomienie węzła daje użytkownikom możliwość zweryfikowania informacji poprzez niezależne przeprowadzenie kryptograficznych kontroli zamiast zaufania stronie trzeciej, która przekazuje te dane. Uruchomienie węzła pozwala użytkownikom na przesyłanie transakcji bezpośrednio do sieci peer-to-peer Ethereum zamiast pokładania zaufania w pośrednikach. Decentralizacja nie jest możliwa, jeśli te korzyści są dostępne tylko dla użytkowników z drogim sprzętem. Zamiast tego węzły powinny być zdolne do działania przy bardzo skromnych wymaganiach dotyczących przetwarzania i pamięci, aby móc działać na telefonach, mikrokomputerach lub niezauważalnie na domowym komputerze.

Obecnie wymóg posiadania dużej ilości przestrzeni dyskowej jest główną przeszkodą uniemożliwiającą powszechny dostęp do węzłów. Wynika to głównie z konieczności przechowywania dużych fragmentów danych o stanie Ethereum. Te dane stanu zawierają kluczowe informacje potrzebne do poprawnego przetwarzania nowych bloków i transakcji. W chwili pisania tego tekstu do uruchomienia pełnego węzła Ethereum zalecany jest szybki dysk SSD o pojemności 2 TB. W przypadku węzła, który nie usuwa żadnych starszych danych, zapotrzebowanie na pamięć rośnie w tempie około 14 GB/tydzień, a węzły archiwalne, które przechowują wszystkie dane od czasu genezy, zbliżają się do 12 TB (w chwili pisania tego tekstu, czyli w lutym 2023).

Tańsze dyski twarde mogą być stosowane do przechowywania starszych danych, ale te są zbyt wolne, aby nadążać za nadchodzącymi blokami. Utrzymanie obecnych modeli pamięci dla klientów przy jednoczesnym obniżaniu kosztów danych oraz ułatwianiu ich przechowywania jest tylko tymczasowym i częściowym rozwiązaniem problemu, ponieważ wzrost stanu Ethereum jest „nieograniczony”, co oznacza, że wymagania pamięci mogą tylko rosnąć, a ulepszenia technologiczne zawsze będą musiały nadążać za stałym wzrostem stanu. Zamiast tego, klienty muszą znaleźć nowe sposoby na weryfikowanie bloków i transakcji, które nie opierają się na wyszukiwaniu danych w lokalnej bazie danych.

## Zmniejszenie pamięci dla węzłów {#reducing-storage-for-nodes}

Istnieje kilka sposobów na zredukowanie ilości danych, jakie musi przechowywać każdy węzeł, a każdy z nich wymaga zaktualizowania głównego protokołu Ethereum w różnym stopniu:

- **Wygasanie historii**: umożliwia węzłom na porzucenie danych o stanie starszym niż X bloków, ale nie zmienia sposobu, w jaki klient Ethereum obsługuje dane stanu.
- **Wygasanie stanu**: umożliwia, aby dane o stanie, które nie są często używane, stały się nieaktywne. Nieaktywne dane mogą być ignorowane przez klientów do czasu ich wskrzeszenia.
- **Słaba bezstanowość**: tylko twórcy bloków potrzebują dostępu do pełnych danych o stanie, inne węzły mogą zweryfikować bloki bez lokalnej bazy danych stanu.
- **Silna bezstanowość**: żaden węzeł nie potrzebuje dostępu do pełnych danych o stanie.

## Wygasanie danych {#data-expiry}

### Wygasanie historii {#history-expiry}

Wygasanie historii odnosi się do usuwania przez klienty starszych danych, których raczej nie potrzebują, aby przechowywali oni tylko małe ilości historycznych danych, porzucając starsze dane po pojawieniu się nowych. Istnieją dwa powody, dla których klienty potrzebują historycznych danych: synchronizacja i obsługa żądań danych. Oryginalnie, klienty musiały synchronizować się od bloku genezy, weryfikując poprawność każdego kolejnego bloku, aż na początek łańcucha. Obecnie, klienty wykorzystują „punkty kontrolne słabej podmiotowości”, aby dostać się na początek łańcucha. Te punkty kontrolne są zaufanymi punktami startowymi; to tak, jakby posiadać blok genezy bliżej teraźniejszości, a nie na samym początku Ethereum. Oznacza to, że klienty mogą porzucić wszystkie dane sprzed ostatniego punktu kontroli słabej podmiotowości bez utraty możliwości synchronizacji do początku łańcucha. Obecnie klienty obsługują żądania (przychodzące za pośrednictwem JSON-RPC) dotyczące historycznych danych, pobierając je ze swoich lokalnych baz danych. Jednakże z wygasaniem historii nie będzie to możliwe, jeśli żądane dane zostały usunięte. Obsługiwanie tych historycznych danych wymaga zastosowania paru innowacyjnych rozwiązań.

Jedną z opcji może być to, że klienty pytają o historyczne dane od innych użytkowników, wykorzystując takie rozwiązanie, jak sieć Portal. Sieć Portal jest to rozwijana sieć peer-to-peer do udostępniania historycznych danych, w której każdy węzeł przechowuje mały kawałek historii Ethereum, tak aby cała historia była rozproszona w całej sieci. Zapytania są obsługiwane poprzez wyszukiwanie użytkowników przechowujących poszukiwane dane oraz poproszenie ich o nie. Ewentualnie, ponieważ to aplikacje najczęściej wymagają dostępu do historycznych danych, przechowywanie ich może stać się ich obowiązkiem. W przestrzeni Ethereum może również być wystarczająco dużo altruistycznych podmiotów skłonnych do utrzymywania historycznych archiwów. Mogłoby to być DAO, które zarządzałoby przechowywaniem historycznych danych, a najlepsze byłoby połączenie wszystkich tych opcji. Dostawcy ci mogliby dostarczać te dane na wiele sposobów, np. za pomocą torrentów, FTP, Filecoin lub IPFS.

Wygasanie historii jest nieco kontrowersyjne, ponieważ do tej chwili Ethereum zawsze gwarantowało dostępność wszystkich historycznych danych. Pełna synchronizacja od czasu genezy zawsze była standardowo możliwa, nawet jeśli opiera się na odbudowie niektórych danych z migawek. Wygasanie historii przenosi odpowiedzialność za zapewnianie tej gwarancji poza główny protokół Ethereum. Mogłoby to stworzyć nowe ryzyko cenzury, jeśli to scentralizowane organizacje ostatecznie będą tymi odpowiedzialnymi za dostarczanie historycznych danych.

EIP-4444 nie jest jeszcze gotowy do wdrożenia, ale jest obecnie tematem aktywnych dyskusji. Co ciekawe, wyzwania związanie z EIP-444 są nie tyle techniczne, co związane głównie z zarządzaniem społecznością. Aby zostało to wdrożone, potrzebne jest poparcie społeczności obejmujące nie tylko zgodę, ale również zobowiązania do przechowywania i udostępniania tych historycznych danych przez wiarygodne podmioty.

To ulepszenie nie zmienia zasadniczo sposobu, w jaki węzły Ethereum zarządzają danymi o stanie, zmienia jedynie sposób dostępu do historycznych danych.

### Wygasanie stanu {#state-expiry}

Wygasanie stanu odnosi się do usuwania stanu z poszczególnych węzłów, jeśli nie był on ostatnio używany. Można to zrealizować na parę różnych sposobów, w tym:

- **Wygasanie przez czynsz**: pobieranie „czynszu” od kont i wygasanie ich, gdy ich czynsz osiągnie zero
- **Wygasanie przez czas**: zmienianie kont na nieaktywne, jeśli nie ma odczytu/zapisu na danym koncie przez pewien określony czas

Wygasanie przez czynsz mogłoby być bezpośrednim czynszem pobieranym od kont, aby utrzymać je w bazie danych aktywnych stanów. Wygasanie przez czas mogłoby odbywać się poprzez odliczanie od ostatniej interakcji konta lub mogłoby być okresowym wygasaniem wszystkich kont. Mógłby istnieć również mechanizm, który połączyłby elementy obu tych modeli; na przykład indywidualne konto pozostawałoby w aktywnym stanie, gdyby uiściło jakąś niewielką opłatę przed wygaśnięciem opartym na czasie. W przypadku wygasania stanu warto zapamiętać, że nieaktywny stan **nie jest usuwany**, a po prostu przechowywany oddzielnie od aktywnego stanu. Stan nieaktywny może zostać przywrócony do stanu aktywnego.

Najprawdopodobniej funkcjonowałoby to poprzez posiadanie drzewa stanu dla określonych okresów (być może 1 rok). Wraz z rozpoczęciem nowego okresu rozpoczynałoby się nowe drzewo stanu. Tylko bieżące drzewo stanów podlegałoby modyfikacji, wszystkie inne byłyby niezmienne. Od węzłów Ethereum oczekiwałoby się przechowywania tylko bieżącego drzewa stanu i kolejnego najnowszego. Wymaga to sposobu na oznaczenie adresu okresem, w którym istnieje. Istnieje [kilka możliwych sposobów](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) na zrobienie tego, ale główna opcja wymaga [wydłużenia adresów](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), aby pomieścić dodatkowe informacje, co miałoby tę dodatkową zaletę, że dłuższe adresy są o wiele bardziej bezpieczne. Element planu działania, który to robi, nazywa się [rozszerzeniem przestrzeni adresu](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Podobnie jak w przypadku wygasania historii, w ramach wygasania stanu odpowiedzialność za przechowywanie starych danych stanu jest przenoszona z indywidualnych użytkowników na inne podmioty, takie jak scentralizowani dostawcy, altruistyczni członkowie społeczności lub na bardziej przyszłościowe zdecentralizowane rozwiązania, jak sieć Portal.

Wygasanie stanu jest nadal w fazie badań i nie jest gotowe do wdrożenia. Wygasanie stanu może nastąpić później niż w przypadku bezstanowych klientów i wygasania historii, ponieważ te ulepszenia sprawiają, że duże rozmiary stanu stają się łatwe w zarządzaniu dla większości walidatorów.

## Bezstanowość {#statelessness}

Bezstanowość jest nieco mylącym określeniem, ponieważ nie oznacza wyeliminowania pojęcia „stanu”, ale wiąże się ze zmianą sposobu, w jaki węzły Ethereum zarządzają danymi stanu. Sama bezstanowość występuje w dwóch wariantach: słabym oraz silnym. Słaba bezstanowość zezwala większości węzłów na przejście do bezstanowości poprzez przeniesienie odpowiedzialności za przechowywanie stanu na kilka innych węzłów. Silna bezstanowość całkowicie usuwa potrzebę przechowywania pełnych danych stanu przez każdy węzeł. Zarówno słaba, jak i silna bezstanowość oferują następujące korzyści dla normalnych walidatorów:

- prawie natychmiastowa synchronizacja
- możliwość walidacji bloków poza kolejnością
- możliwość uruchomienia węzła na sprzęcie z bardzo małymi wymaganiami sprzętowymi (np. na telefonie)
- działanie węzła na tanich dyskach twardych ze względu na brak konieczności ich odczytu/zapisu na nich
- kompatybilność z przyszłymi aktualizacjami kryptografii Ethereum

### Słaba bezstanowość {#weak-statelessness}

Słaba bezstanowość wiąże się ze zmianami sposobu, w jaki węzły Ethereum weryfikują zmiany stanu, ale nie eliminuje to całkowicie potrzeby przechowywania stanu we wszystkich węzłach w sieci. Zamiast tego słaba bezstanowość przenosi odpowiedzialność za przechowywanie stanu na proponentów bloku, podczas gdy wszystkie inne węzły w sieci weryfikują bloki bez przechowywania pełnych danych o stanie.

**W słabej bezstanowości proponowanie bloków wymaga dostępu do pełnych danych stanu, ale weryfikowanie bloków nie wymaga żadnych danych stanu**

Aby mogło tak się stać, [drzewa Verkle](/roadmap/verkle-trees/) musiałyby być już wdrożone w klientach Ethereum. Drzewa Verkle są zastępczą strukturą danych do przechowywania danych o stanie Ethereum, która pozwala na przekazywanie małych, stałych rozmiarów „świadków” danych między użytkowników i wykorzystywanie ich do weryfikowania bloków zamiast weryfikowania bloków w lokalnych bazach danych. [Podział proponent-twórca](/roadmap/pbs/) jest wymagany również dlatego, że pozwala twórcom bloków być wyspecjalizowanymi węzłami z bardziej zaawansowanym sprzętem, a to oni właśnie wymagają dostępu do pełnych danych o stanie.

<ExpandableCard title="Dlaczego poleganie na mniejszej ilości proponentów bloków jest słuszne?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Bezstanowość polega na tym, że twórcy bloków utrzymują kopię pełnych danych o stanie, tak aby mogli generować świadków, których można by wykorzystać do zweryfikowania bloku. Inne węzły nie musiałyby mieć dostępu do danych o stanie; wszystkie informacje wymagane do zweryfikowania bloku byłyby dostępne w świadku. Stwarza to sytuację, w której proponowanie bloku jest drogie, natomiast weryfikowanie bloku jest tanie, co oznacza, że mniej operatorów będzie uruchamiać węzeł proponowania bloków. Jednakże decentralizacja proponentów bloków nie jest kluczowa, o ile jak największa ilość uczestników może niezależnie weryfikować, że proponowane bloki są ważne.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Poczytaj więcej o uwagach Dankrad'a</ButtonLink>
</ExpandableCard>

Proponenci bloków używają danych o stanie do stworzenia „świadków” — minimalnego zestawu danych udowadniających wartości stanu, które zmieniają się w wyniku transakcji w bloku. Inni walidatorzy nie przechowują stanu, przechowują jedynie korzeń stanu (hash całego stanu). Otrzymują blok oraz świadka, po czym wykorzystują te dwie rzeczy do zaktualizowania swojego korzenia stanu. To sprawia, że węzeł walidacyjny jest bardzo lekki.

Słaba bezstanowość jest w zaawansowanym stadium badań, ale opiera się na podziale proponent-twórca oraz na drzewach Verkle, które należy wdrożyć tak, aby możliwe było przekazywanie małych świadków między użytkownikami. To oznacza, że słabą bezstanowość w sieci głównej Ethereum być może uda się wprowadzić za kilka lat.

### Silna bezstanowość {#strong-statelessness}

Silna bezstanowość usuwa konieczność przechowywania danych o stanie przez każdy węzeł. Zamiast tego transakcje zostają wysłane wraz ze świadkami, którzy mogą zostać zagregowani przez twórców bloków. Twórcy bloków są następnie odpowiedzialni za przechowywanie tylko tych stanów, które są potrzebne do generowania świadków dla poszczególnych kont. Odpowiedzialność za stan jest całkowicie przeniesiona na użytkowników, ponieważ to oni wysyłają świadków oraz „listy dostępu”, aby zadeklarować, z którymi kontami i kluczami przechowywania wchodzą w interakcję. Umożliwiłoby to niezwykle lekkie węzły, ale wiążą się z tym też pewne kompromisy, jak utrudnienie transakcji z inteligentnymi kontraktami.

Silna bezstanowość była badana przez badaczy, ale nie oczekuje się, że będzie ona częścią planu działania Ethereum — bardziej prawdopodobne jest to, że słaba bezstanowość jest wystarczająca dla potrzeb skalowania Ethereum.

## Aktualny postęp {#current-progress}

Słaba bezstanowość, wygasanie historii oraz wygasanie stanu są nadal w fazie badań i oczekuje się, że zostaną wdrożone za kilka lat. Nie ma gwarancji, że wszystkie te propozycje zostaną wdrożone; jeśli na przykład wygasanie stanu zostanie wdrożone jako pierwsze, może nie być konieczne jednoczesne wdrażanie wygasania historii. Istnieją również inne elementy planu działania, takie jak [drzewa Verkle](/roadmap/verkle-trees) czy [podział proponent-twórca](/roadmap/pbs), które należałoby ukończyć w pierwszej kolejności.

## Dalsza lektura {#further-reading}

- [AMA bezstanowości Vitalika](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teoria zarządzania wielkością stanu](https://hackmd.io/@vbuterin/state_size_management)
- [Konflikt wskrzeszania zminimalizował ograniczanie stanu](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Drogi do bezstanowości i wygasania stanu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Specyfikacja EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes o EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Dlaczego, przejście na bezstanowość jest takie ważne](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Uwagi do oryginalnej koncepcji klienta bezstanowego](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Więcej o wygasaniu stanu](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Jeszcze więcej o wygasaniu stanu](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
