---
title: "Bezstanowość, wygasanie stanu i wygasanie historii"
description: "Dowiedz się, jak wygasanie historii, wygasanie stanu i bezstanowość mogą zmniejszyć przestrzeń dyskową potrzebną do uruchomienia węzła Ethereum, utrzymując zdecentralizowany charakter sieci."
lang: pl
template: roadmap
---

Możliwość uruchamiania węzłów [Ethereum](/) na skromnym sprzęcie ma kluczowe znaczenie dla prawdziwej decentralizacji. Wynika to z faktu, że prowadzenie węzła daje użytkownikom możliwość samodzielnej weryfikacji informacji poprzez niezależne wykonywanie kontroli kryptograficznych, zamiast ufania stronie trzeciej, że dostarczy im dane. Prowadzenie węzła pozwala użytkownikom na przesyłanie transakcji bezpośrednio do sieci peer-to-peer Ethereum, zamiast polegania na pośredniku. Decentralizacja nie jest możliwa, jeśli te korzyści są dostępne tylko dla użytkowników posiadających drogi sprzęt. Zamiast tego węzły powinny być w stanie działać przy niezwykle skromnych wymaganiach dotyczących przetwarzania i pamięci, tak aby można je było uruchomić na telefonach komórkowych, mikrokomputerach lub niezauważalnie na komputerze domowym.

Obecnie wysokie wymagania dotyczące przestrzeni dyskowej są główną barierą uniemożliwiającą powszechny dostęp do węzłów. Wynika to przede wszystkim z konieczności przechowywania dużych fragmentów danych stanu Ethereum. Te dane stanu zawierają kluczowe informacje wymagane do prawidłowego przetwarzania nowych bloków i transakcji. W momencie pisania tego tekstu do uruchomienia pełnego węzła Ethereum zalecany jest szybki dysk SSD o pojemności 4 TB, który zużywa blisko 2 TB, gdy przechowuje pełną historię łańcucha (stan na wrzesień 2026 r.). Węzły archiwalne, które przechowują cały historyczny stan, potrzebują od około 2 TB do ponad 12 TB, w zależności od klienta.

Tańsze dyski twarde mogą być używane do przechowywania starszych danych, ale są one zbyt wolne, aby nadążyć za przychodzącymi blokami. Utrzymanie obecnych modeli przechowywania dla klientów przy jednoczesnym uczynieniu danych tańszymi i łatwiejszymi do przechowywania jest jedynie tymczasowym i częściowym rozwiązaniem problemu, ponieważ wzrost stanu Ethereum jest „nieograniczony”, co oznacza, że wymagania dotyczące pamięci masowej mogą tylko rosnąć, a ulepszenia technologiczne zawsze będą musiały dotrzymywać kroku ciągłemu wzrostowi stanu. Zamiast tego klienci muszą znaleźć nowe sposoby weryfikacji bloków i transakcji, które nie opierają się na wyszukiwaniu danych z lokalnych baz danych.

## Zmniejszenie pamięci masowej dla węzłów {#reducing-storage-for-nodes}

Istnieje kilka sposobów na zmniejszenie ilości danych, które musi przechowywać każdy węzeł, z których każdy wymaga aktualizacji głównego protokołu Ethereum w różnym stopniu:

- **Wygasanie historii**: umożliwia węzłom odrzucanie danych stanu starszych niż X bloków, ale nie zmienia sposobu, w jaki klienci Ethereum obsługują dane stanu.
- **Wygasanie stanu**: pozwala na to, aby rzadko używane dane stanu stały się nieaktywne. Nieaktywne dane mogą być ignorowane przez klientów, dopóki nie zostaną wskrzeszone.
- **Słaba bezstanowość**: tylko producenci bloków potrzebują dostępu do pełnych danych stanu, inne węzły mogą weryfikować bloki bez lokalnej bazy danych stanu.
- **Silna bezstanowość**: żadne węzły nie potrzebują dostępu do pełnych danych stanu.

## Wygasanie danych {#data-expiry}

### Wygasanie historii {#history-expiry}

Wygasanie historii odnosi się do odrzucania przez klientów starszych danych, których prawdopodobnie nie będą potrzebować, tak aby przechowywali tylko niewielką ilość danych historycznych, usuwając starsze dane w miarę napływu nowych. Istnieją dwa powody, dla których klienci wymagają danych historycznych: synchronizacja i obsługa żądań danych. Początkowo klienci musieli synchronizować się od bloku genezy, weryfikując poprawność każdego kolejnego bloku aż do czoła łańcucha. Obecnie klienci używają „punktów kontrolnych słabej subiektywności”, aby szybciej dotrzeć do czoła łańcucha. Te punkty kontrolne są zaufanymi punktami startowymi, podobnie jak posiadanie bloku genezy blisko teraźniejszości, a nie na samym początku Ethereum. Oznacza to, że klienci mogą odrzucić wszystkie informacje sprzed najnowszego punktu kontrolnego słabej subiektywności bez utraty zdolności do synchronizacji z czołem łańcucha. Klienci obecnie obsługują żądania (przychodzące przez interfejs JSON-RPC) dotyczące danych historycznych, pobierając je ze swoich lokalnych baz danych. Jednak w przypadku wygasania historii nie będzie to możliwe, jeśli żądane dane zostały usunięte. Obsługa tych danych historycznych wymaga innowacyjnych rozwiązań.

Jedną z opcji jest żądanie przez klientów danych historycznych od węzłów równorzędnych przy użyciu rozwiązania takiego jak Portal Network. [Portal Network](/developers/docs/networking-layer/portal-network/) to sieć peer-to-peer do obsługi danych historycznych, w której każdy węzeł przechowuje niewielki fragment historii Ethereum, dzięki czemu cała historia istnieje w formie rozproszonej w sieci. Żądania są obsługiwane poprzez wyszukiwanie węzłów równorzędnych przechowujących odpowiednie dane i żądanie ich od nich. Alternatywnie, ponieważ dostęp do danych historycznych jest na ogół wymagany przez aplikacje, ich przechowywanie może stać się ich obowiązkiem. W przestrzeni Ethereum może być również wystarczająco dużo altruistycznych podmiotów, które byłyby skłonne utrzymywać archiwa historyczne. Mogłaby to być zdecentralizowana organizacja autonomiczna (DAO), która powstanie w celu zarządzania przechowywaniem danych historycznych, lub w idealnym przypadku będzie to połączenie wszystkich tych opcji. Dostawcy ci mogliby udostępniać dane na wiele sposobów, na przykład za pośrednictwem sieci torrent, FTP, Filecoin lub IPFS.

Wygasanie historii jest nieco kontrowersyjne, ponieważ do tej pory Ethereum zawsze domyślnie gwarantowało dostępność wszelkich danych historycznych. Pełna synchronizacja od bloku genezy zawsze była możliwa w standardzie, nawet jeśli opierała się na odbudowie niektórych starszych danych z migawek. Wygasanie historii przenosi odpowiedzialność za zapewnienie tej gwarancji poza rdzenny protokół Ethereum. Mogłoby to wprowadzić nowe ryzyko cenzury, jeśli to scentralizowane organizacje ostatecznie wkroczą, aby dostarczać dane historyczne.

Pierwszy krok został już wdrożony: od momentu wprowadzenia [częściowego wygasania historii](https://blog.ethereum.org/2025/07/08/partial-history-exp) w lipcu 2025 r., klienci warstwy wykonawczej mogą odrzucać ciała i paragony każdego bloku sprzed The Merge. Ta historia jest nadal dostępna w archiwach, torrentach i Portal Network. Ciągłe wygasanie historii, jak proponuje EIP-4444, jest wciąż przedmiotem dyskusji. Co ciekawe, wyzwania związane z EIP-4444 nie są w dużej mierze techniczne, ale dotyczą głównie zarządzania społecznością. Aby to rozwiązanie mogło zostać wdrożone, potrzebne jest poparcie społeczności, które obejmuje nie tylko porozumienie, ale także zobowiązania do przechowywania i udostępniania danych historycznych przez godne zaufania podmioty.

Ta aktualizacja nie zmienia fundamentalnie sposobu, w jaki węzły Ethereum obsługują dane stanu, zmienia jedynie sposób dostępu do danych historycznych.

### Wygasanie stanu {#state-expiry}

Wygasanie stanu odnosi się do usuwania stanu z poszczególnych węzłów, jeśli nie uzyskiwano do niego ostatnio dostępu. Istnieje kilka sposobów na wdrożenie tego rozwiązania, w tym:

- **Wygasanie przez czynsz**: pobieranie „czynszu” od kont i wygasanie ich, gdy ich czynsz osiągnie zero
- **Wygasanie z upływem czasu**: czynienie kont nieaktywnymi, jeśli przez pewien czas nie ma odczytu/zapisu na tym koncie

Wygasanie przez czynsz mogłoby polegać na bezpośrednim pobieraniu opłat od kont w celu utrzymania ich w aktywnej bazie danych stanu. Wygasanie z upływem czasu mogłoby polegać na odliczaniu od ostatniej interakcji z kontem lub na okresowym wygasaniu wszystkich kont. Mogłyby również istnieć mechanizmy łączące elementy modeli opartych zarówno na czasie, jak i na czynszu, na przykład poszczególne konta pozostają w aktywnym stanie, jeśli uiszczą niewielką opłatę przed wygaśnięciem opartym na czasie. W przypadku wygasania stanu należy zauważyć, że nieaktywny stan **nie jest usuwany**, jest po prostu przechowywany oddzielnie od aktywnego stanu. Nieaktywny stan może zostać wskrzeszony do aktywnego stanu.

Sposób, w jaki by to działało, polegałby prawdopodobnie na posiadaniu drzewa stanu dla określonych okresów (być może ~1 rok). Zawsze, gdy rozpoczyna się nowy okres, powstaje również całkowicie nowe drzewo stanu. Tylko bieżące drzewo stanu może być modyfikowane, wszystkie inne są niezmienne. Oczekuje się, że węzły Ethereum będą przechowywać tylko bieżące drzewo stanu i to bezpośrednio je poprzedzające. Wymaga to sposobu na oznaczanie adresu znacznikiem czasu z okresem, w którym istnieje. Istnieje [kilka możliwych sposobów](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607), aby to zrobić, ale wiodąca opcja wymaga [wydłużenia adresów](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), aby pomieścić dodatkowe informacje, z dodatkową korzyścią, że dłuższe adresy są znacznie bezpieczniejsze. Punkt mapy drogowej, który to realizuje, nazywa się [rozszerzeniem przestrzeni adresowej](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Podobnie jak w przypadku wygasania historii, w ramach wygasania stanu odpowiedzialność za przechowywanie starych danych stanu jest zdejmowana z poszczególnych użytkowników i przenoszona na inne podmioty, takie jak scentralizowani dostawcy, altruistyczni członkowie społeczności lub bardziej futurystyczne zdecentralizowane rozwiązania, takie jak Portal Network.

Wygasanie stanu jest wciąż w fazie badań i nie jest jeszcze gotowe do wdrożenia. Wygasanie stanu może nastąpić później niż bezstanowi klienci i wygasanie historii, ponieważ te aktualizacje sprawiają, że duże rozmiary stanu są łatwe do zarządzania dla większości walidatorów.

## Bezstanowość {#statelessness-2}

Bezstanowość jest nieco mylącą nazwą, ponieważ nie oznacza wyeliminowania pojęcia „stanu”, ale wiąże się ze zmianami w sposobie, w jaki węzły Ethereum obsługują dane stanu. Sama bezstanowość występuje w dwóch odmianach: słabej bezstanowości i silnej bezstanowości. Słaba bezstanowość umożliwia większości węzłów przejście w stan bezstanowy poprzez przeniesienie odpowiedzialności za przechowywanie stanu na nieliczne z nich. Silna bezstanowość całkowicie eliminuje potrzebę przechowywania pełnych danych stanu przez jakikolwiek węzeł. Zarówno słaba, jak i silna bezstanowość oferują zwykłym walidatorom następujące korzyści:

- niemal natychmiastowa synchronizacja
- możliwość weryfikacji bloków poza kolejnością
- węzły mogące działać przy bardzo niskich wymaganiach sprzętowych (np. na telefonach)
- węzły mogą działać na tanich dyskach twardych, ponieważ nie jest wymagany odczyt/zapis na dysku
- kompatybilność z przyszłymi aktualizacjami kryptografii Ethereum

### Słaba bezstanowość {#weak-statelessness}

Słaba bezstanowość wiąże się ze zmianami w sposobie, w jaki węzły Ethereum weryfikują zmiany stanu, ale nie eliminuje całkowicie potrzeby przechowywania stanu we wszystkich węzłach w sieci. Zamiast tego słaba bezstanowość nakłada odpowiedzialność za przechowywanie stanu na proponujących bloki, podczas gdy wszystkie inne węzły w sieci weryfikują bloki bez przechowywania pełnych danych stanu.

**W słabej bezstanowości proponowanie bloków wymaga dostępu do pełnych danych stanu, ale weryfikacja bloków nie wymaga żadnych danych stanu**

Aby tak się stało, klienci Ethereum muszą najpierw przyjąć nową strukturę danych do przechowywania danych stanu Ethereum, która pozwoli na przekazywanie małych „świadków” danych między węzłami równorzędnymi i wykorzystywanie ich do weryfikacji bloków zamiast weryfikacji bloków w oparciu o lokalne bazy danych. Obecną propozycją jest ujednolicone drzewo binarne ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)), które zastąpiło wcześniejszy projekt [drzewa Verkle](/roadmap/verkle-trees/). Wymagana jest również [separacja proponującego i budującego (PBS)](/roadmap/pbs/), ponieważ pozwala to budującym bloki być wyspecjalizowanymi węzłami z potężniejszym sprzętem, a to oni wymagają dostępu do pełnych danych stanu.

<ExpandableCard title="Dlaczego można polegać na mniejszej liczbie proponujących bloki?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Bezstanowość opiera się na budujących bloki, którzy utrzymują kopię pełnych danych stanu, dzięki czemu mogą generować świadków, których można użyć do weryfikacji bloku. Inne węzły nie potrzebują dostępu do danych stanu, wszystkie informacje wymagane do weryfikacji bloku są dostępne u świadka. Stwarza to sytuację, w której proponowanie bloku jest kosztowne, ale jego weryfikacja jest tania, co oznacza, że mniej operatorów będzie uruchamiać węzeł proponujący bloki. Jednak decentralizacja proponujących bloki nie ma kluczowego znaczenia, o ile jak największa liczba uczestników może niezależnie zweryfikować, czy proponowane przez nich bloki są prawidłowe.

<ButtonLink variant="outline" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Przeczytaj więcej w notatkach Dankrada</ButtonLink>
</ExpandableCard>

Proponujący bloki używają danych stanu do tworzenia „świadków” – minimalnego zestawu danych, który dowodzi wartości stanu zmienianych przez transakcje w bloku. Inni walidatorzy nie przechowują stanu, przechowują jedynie korzeń stanu (hash całego stanu). Otrzymują oni blok i świadka, a następnie używają ich do aktualizacji swojego korzenia stanu. To sprawia, że węzeł walidujący jest niezwykle lekki.

Słaba bezstanowość znajduje się w zaawansowanej fazie badań, ale opiera się na wdrożeniu separacji proponującego i budującego (PBS) oraz nowego drzewa stanu, tak aby małe świadki mogły być przekazywane między węzłami równorzędnymi. Oznacza to, że słaba bezstanowość jest prawdopodobnie oddalona o kilka lat od wdrożenia w sieci głównej Ethereum.

[zkEVM dla weryfikacji warstwy 1 (L1)](/roadmap/zkevm/) to technologia komplementarna, która mogłaby dodatkowo usprawnić weryfikację bezstanową. Zamiast tylko sprawdzać świadków, walidatorzy mogliby weryfikować dowód z wiedzą zerową potwierdzający, że cały blok został wykonany poprawnie — zapewniając pewność kryptograficzną bez ponownego wykonywania transakcji.

### Silna bezstanowość {#strong-statelessness}

Silna bezstanowość eliminuje potrzebę przechowywania danych stanu przez jakikolwiek węzeł. Zamiast tego transakcje są wysyłane ze świadkami, którzy mogą być agregowani przez producentów bloków. Producenci bloków są wtedy odpowiedzialni za przechowywanie tylko tego stanu, który jest potrzebny do generowania świadków dla odpowiednich kont. Odpowiedzialność za stan jest prawie w całości przeniesiona na użytkowników, ponieważ wysyłają oni świadków i „listy dostępu”, aby zadeklarować, z którymi kontami i kluczami pamięci masowej wchodzą w interakcję. Umożliwiłoby to tworzenie niezwykle lekkich węzłów, ale wiąże się to z kompromisami, w tym z utrudnieniem przeprowadzania transakcji za pomocą inteligentnych kontraktów.

Silna bezstanowość była badana przez naukowców, ale obecnie nie oczekuje się, że będzie częścią mapy drogowej Ethereum – bardziej prawdopodobne jest, że słaba bezstanowość wystarczy do zaspokojenia potrzeb Ethereum w zakresie skalowania.

## Obecny postęp {#current-progress}

Częściowe wygasanie historii zostało wdrożone w lipcu 2025 r., pozwalając klientom warstwy wykonawczej na odrzucenie historii sprzed The Merge. Słaba bezstanowość, ciągłe wygasanie historii i wygasanie stanu są nadal w fazie badań i oczekuje się, że zostaną wdrożone za kilka lat. Nie ma gwarancji, że wszystkie te propozycje zostaną zrealizowane; na przykład, jeśli wygasanie stanu zostanie wdrożone jako pierwsze, może nie być potrzeby wdrażania również wygasania historii. Istnieją również inne punkty mapy drogowej, takie jak nowe drzewo stanu (obecnie proponowane jako drzewo binarne w [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) oraz [separacja proponującego i budującego (PBS)](/roadmap/pbs), które muszą zostać ukończone w pierwszej kolejności.

## Dalsza lektura {#further-reading}

- [Czym jest bezstanowe Ethereum?](https://stateless.fyi/)
- [AMA z Vitalikiem na temat bezstanowości](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teoria zarządzania rozmiarem stanu](https://hackmd.io/@vbuterin/state_size_management)
- [Ograniczanie stanu z minimalizacją konfliktów wskrzeszania](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Ścieżki do bezstanowości i wygasania stanu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Specyfikacja EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes o EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Dlaczego przejście na bezstanowość jest tak ważne](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Oryginalne notatki dotyczące koncepcji klienta bezstanowego](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Więcej o wygasaniu stanu](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Jeszcze więcej o wygasaniu stanu](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Strona informacyjna o bezstanowym Ethereum](https://stateless.fyi)
