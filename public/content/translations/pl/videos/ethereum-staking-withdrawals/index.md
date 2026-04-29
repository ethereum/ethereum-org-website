---
title: "Jak działają wypłaty w Ethereum?"
description: "Jak działają wypłaty ze stakingu w Ethereum po aktualizacji Szanghaj/Capella, obejmujące proces techniczny, kolejkę wypłat i to, co stakujący muszą wiedzieć o dostępie do swojego stakowanego ETH."
lang: pl
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "jak działa Ethereum"
  - "staking"
  - "wypłaty"
format: explainer
author: Finematics
breadcrumb: "Wypłaty ze stakingu"
---

Wyjaśnienie autorstwa **Finematics** opisujące, jak działają wypłaty ze stakingu w Ethereum po aktualizacji Szanghaj/Capella, w tym mechanikę częściowych i pełnych wypłat, powszechne błędne przekonania oraz implikacje dla ekosystemu stakingu.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=RwwU3P9n3uo) opublikowanego przez Finematics. Został on lekko zredagowany w celu poprawy czytelności.*

#### Beacon Chain (0:31) {#the-beacon-chain-031}

Wraz z szybko zbliżającą się aktualizacją Szanghaj/Capella, toczy się wiele dyskusji na temat wypłat ze stakingu w Ethereum i tego, co to oznacza dla całego ekosystemu Ethereum.

Zacznijmy od zrozumienia, jak się tu znaleźliśmy i dlaczego wypłaty ze stakingu nie zostały włączone, gdy Ethereum przeszło z dowodu pracy (PoW) na dowód stawki (PoS).

Przejście na dowód stawki (PoS) odbyło się w wielu krokach, aby zminimalizować liczbę dużych zmian zachodzących w tym samym czasie. Takie podejście było niezbędne, zwłaszcza w przypadku ugruntowanej sieci rozliczającej biliony dolarów rocznie. Najważniejszymi krokami były: uruchomienie Beacon Chain oraz The Merge.

Uruchomienie Beacon Chain w 2020 roku stworzyło fundamenty pod tę transformację poprzez utworzenie oddzielnej warstwy konsensusu opartej na dowodzie stawki, działającej równolegle do łańcucha dowodu pracy Ethereum. Wcześniejsze uruchomienie Beacon Chain pozwoliło na zgromadzenie wystarczającej ilości ETH do zabezpieczenia sieci przed rozliczaniem transakcji o rzeczywistej wartości. Pozwoliło to również na testowanie nowego modelu konsensusu opartego na dowodzie stawki przez dłuższy czas z prawdziwymi środkami jako stawką.

Wcześni uczestnicy sieci zaangażowali miliony ETH, aby zabezpieczyć sieć dowodu stawki Ethereum, mimo że wiedzieli, że nie będą w stanie wypłacić swojego ETH aż do znacznie późniejszego czasu.

Kolejny duży krok, The Merge, połączył warstwę konsensusu opartą na dowodzie stawki z warstwą wykonawczą. Pozwoliło to na ostateczne odejście od dowodu pracy i utrzymanie tylko jednego kanonicznego łańcucha — Ethereum — zabezpieczonego teraz przez miliony stakowanych ETH. The Merge był zdecydowanie największą zmianą w historii Ethereum. Ze względu na charakter tej aktualizacji, musiała się ona odbyć bez żadnych przerw w działaniu.

Aby zminimalizować ryzyko, zakres The Merge został zmniejszony i żadne inne funkcje — poza przejściem z dowodu pracy na dowód stawki — nie zostały uwzględnione w ramach tej aktualizacji. Największe „cięcie”, jakiego trzeba było dokonać, dotyczyło wypłat, które stały się głównym celem nadchodzącej aktualizacji Szanghaj/Capella.

#### Wypłaty (2:09) {#withdrawals-209}

Wypłaty ze stakingu, jak sama nazwa wskazuje, pozwolą stakującym na wypłatę ich zablokowanego ETH. Istnieją dwa rodzaje wypłat: „częściowe” i „pełne”.

**Częściowa wypłata** ma miejsce, gdy walidator wypłaca swoje zgromadzone nagrody — dodatkowe saldo powyżej maksymalnego efektywnego salda wynoszącego 32 ETH. Częściowa wypłata może być również nazywana „wypłatą nagrody” lub „wypłatą nadwyżki salda”.

**Pełna wypłata** ma miejsce, gdy walidator zakończy proces wyjścia i całe saldo zostanie wypłacone. Dzieje się tak tylko wtedy, gdy walidator wychodzi z systemu dobrowolnie lub zostaje przymusowo usunięty w procesie zwanym „cięciem” (slashing).

Po włączeniu, wypłaty ze stakingu będą automatycznie dystrybuowane co kilka dni. Dodatkowo, proces wypłaty inicjowany jest w warstwie konsensusu, więc na żadnym z etapów nie jest wymagana opłata transakcyjna.

Aby rozpocząć wypłacanie swoich nagród ze stakingu, walidator będzie musiał podać swój adres wypłaty tylko raz. Biorąc pod uwagę, że wypłaty wpływają zarówno na warstwę konsensusu, jak i warstwę wykonawczą Ethereum, obie części sieci muszą zostać zaktualizowane. „Szanghaj” to nazwa aktualizacji warstwy wykonawczej zawierającej wypłaty, które są określone w EIP-4895. „Capella” to nazwa odpowiedniej aktualizacji warstwy konsensusu, aktywowanej w tym samym czasie. Te dwie aktualizacje są czasami określane wspólnie jako „Shapella”.

#### Mechanika (3:40) {#mechanics-340}

W ekosystemie Ethereum każdy walidator ma odpowiadający mu numer indeksu. Ponadto posiadają oni również dwa rodzaje danych uwierzytelniających wypłaty, zdefiniowane jako `0x00` lub `0x01`.

`0x00` wskazuje, że dany walidator nie ma powiązanego adresu wypłaty. Te dane uwierzytelniające są wyprowadzane jako hash klucza publicznego BLS, w którym pierwszy bajt został zamieniony na bajt zerowy — stąd nazwa.

`0x01` oznacza, że walidator podał swój adres wypłaty. Te dane uwierzytelniające wypłaty są reprezentowane jako `0x01`, po którym następuje 11 bajtów zer, a następnie wybrany adres Ethereum.

Aby umożliwić wypłaty, walidatorzy z danymi uwierzytelniającymi `0x00` będą musieli podpisać wiadomość „BLSToExecutionChange”. Będzie to możliwe po aktualizacji Capella.

Po włączeniu wypłat, walidator proponujący blok będzie liniowo skanował indeksy walidatorów, aby znaleźć pierwszych 16 walidatorów z danymi uwierzytelniającymi `0x01`, którzy:

- Mają saldo przekraczające 32 ETH (naliczone nagrody walidatora)
- Są „gotowi do wypłaty” (całkowicie wyszli z zestawu walidatorów)

Wyszukiwanie liniowe zatrzymuje się po znalezieniu 16 walidatorów spełniających te kryteria lub po 16 384 iteracjach. Algorytm zapamiętuje indeks, na którym zatrzymało się wyszukiwanie, dzięki czemu następny walidator proponujący blok może wznowić od tego indeksu. Po dotarciu do ostatniego indeksu, algorytm zaczyna od początku — indeksu 0.

Dobrą analogią byłby zegar analogowy, w którym wskazówka pokazuje godzinę, posuwa się w jednym kierunku, nie pomija żadnych godzin i ostatecznie wraca na początek po osiągnięciu ostatniej liczby.

Po zakończeniu skanowania walidator tworzy listę wypłat, które mają zostać uwzględnione w jego ładunku wykonawczym. Każda pozycja na liście zawiera:

- **WithdrawalIndex** — monotonicznie rosnący indeks, zaczynający się od 0, który zwiększa się o 1 dla każdej wypłaty, aby jednoznacznie zidentyfikować każdą wypłatę
- **ValidatorIndex** — indeks walidatora, którego saldo jest wypłacane
- **ExecutionAddress** — adres ETH w warstwie wykonawczej, na który powinna zostać wysłana wypłata
- **Amount** — kwota w gwei, która ma zostać wysłana na adres wykonawczy

Podczas budowania lub przetwarzania bloku, klienci warstwy wykonawczej stosują te wypłaty na końcu bloku. Przetwarzanie wypłat nie konkuruje z transakcjami użytkowników o miejsce w bloku. Przy maksymalnie 16 wypłatach przetwarzanych na blok, powinno być przetwarzanych maksymalnie 115 200 wypłat dziennie, zakładając brak pominiętych slotów.

Projekt wypłat jest prosty, a jednocześnie niezwykle solidny.

#### Błędne przekonania (6:30) {#misconceptions-630}

Pierwsze błędne przekonanie głosi, że podczas przetwarzania wypłat istnieje różnica między „pełną” a „częściową” wypłatą pod względem priorytetu lub kolejności. Zarówno pełne, jak i częściowe wypłaty mają miejsce, gdy skanowanie liniowe zestawu walidatorów dotrze do indeksu walidatora. Jedyną różnicą jest to, że w przypadku pełnych wypłat walidator musi opuścić kolejkę wyjścia i osiągnąć „epokę gotowości do wypłaty” (withdrawable epoch), zanim skanowanie liniowe będzie mogło go uwzględnić.

Innym błędnym przekonaniem jest to, że użytkownicy stracą swoje nagrody, jeśli nie podadzą adresu wypłaty. To nieprawda — w przypadku, gdy walidator zapomni podać adres wypłaty, jego nagrody w ETH nie zostaną wysłane w próżnię po włączeniu wypłat. Zamiast tego skanowanie pominie walidatorów, którzy nie podali swoich adresów wypłat.

Należy pamiętać, że adresu wypłaty nie można zmienić i jest on ustawiany tylko raz. Stakujący muszą być niezwykle ostrożni podczas konfigurowania adresu wypłaty, upewniając się, że mają pełne prawo własności do podanego adresu.

Istnieją również spekulacje, że stakujący wypłacą dużo ETH z ekosystemu Ethereum po włączeniu wypłat, przy czym silniejsza wersja tego argumentu zakłada, że zdestabilizuje to mechanizm konsensusu oparty na dowodzie stawki. Chociaż nie możemy w pełni przewidzieć, ile ETH zostanie wypłacone w czasie, istnieje kilka ważnych kontrargumentów:

Po pierwsze, większość stakujących to wczesne osoby adoptujące Ethereum, które były na tyle odważne, by stakować, gdy wciąż nie było pewne, kiedy wypłaty zostaną włączone. Wielu stakujących wyraziło chęć kontynuowania stakingu, aby wspierać sieć i nadal zdobywać nagrody denominowane w ETH.

Po drugie, aby zapewnić stabilność mechanizmu konsensusu opartego na dowodzie stawki i aktywnego zestawu walidatorów, Ethereum wdrożyło kolejkę wypłat dla wszystkich walidatorów chcących wyjść. Kolejka ta ogranicza liczbę walidatorów, którzy mogą opuścić ekosystem w tym samym czasie.

Pierwsze skanowanie wypłat wypłaci wiele zgromadzonych nagród — w zasadzie od momentu powstania Beacon Chain. Jednak kolejne będą przetwarzać znacznie mniejszą ilość ETH.

#### Implikacje (8:39) {#implications-839}

Włączenie wypłat stworzy otwarty, dwustronny przepływ stakingu. Obecnie przepływ stakingu jest jednostronny — ETH może tylko wpływać do sieci i nigdy jej nie opuszczać. Co ciekawe, włączenie wypłat może zachęcić jeszcze więcej osób do stakingu, ponieważ będą wiedzieć, że zawsze mogą wypłacić swoje ETH, jeśli będą go potrzebować do czegoś innego.

Stakujący, którzy nie prowadzą własnych walidatorów i stakują u scentralizowanego dostawcy stakingu, będą mogli zmienić swojego dostawcę na innego. Mogą wypłacić środki od dostawcy, który oferuje niższą stopę zwrotu ze stakingu, do takiego, który oferuje lepszą, przenieść się od scentralizowanego dostawcy do zdecentralizowanego, a nawet uruchomić własnego walidatora.

Wypłaty wpłyną również na instrumenty pochodne płynnego stakingu, takie jak Lido, Rocket Pool i inne. Tokeny płynnego stakingu (LST), takie jak stETH lub rETH, miały w przeszłości tendencję do tymczasowej utraty swojego parytetu do ceny ETH podczas zawirowań rynkowych. Jednak dzięki dwustronnemu przepływowi stakingu wszelkie znaczące rozbieżności w ich parytecie zostałyby szybko zniwelowane przez arbitraż.

Wcześni użytkownicy płynnego stakingu i scentralizowanego stakingu zdobyli zdecydowaną większość rynku, ponieważ nie mieli dużej konkurencji. Jednak udział w rynku tych zasiedziałych graczy może ulec poważnej zmianie po włączeniu wypłat, zwłaszcza jeśli nie zaoferują oni konkurencyjnej stopy zwrotu. Możliwość swobodnego przechodzenia między dostawcami stakingu przyniesie korzyści rynkowi stakingu ETH.

#### Podsumowanie (10:01) {#summary-1001}

Włączenie wypłat ze stakingu jest jedną z najbardziej oczekiwanych aktualizacji Ethereum. Niezwykle ważne będzie upewnienie się, że ta zmiana zostanie przeprowadzona płynnie. Aby pomóc w testowaniu, walidatorzy będą mieli do dyspozycji kilka sieci deweloperskich (devnets) i testowych (testnets), aby przejść przez ten proces i wyeliminować wszelkie potencjalne problemy przed uruchomieniem w Sieci głównej.

Wypłaty to kolejne ulepszenie, które przybliża Ethereum o krok do budowy zrównoważonej, bezpiecznej i zdecentralizowanej przyszłości. Oczekuje się, że aktualizacja Shapella będzie miała miejsce w pierwszej połowie 2023 roku.

W momencie tworzenia tego wideo, Beacon Chain zgromadził ponad 17 milionów ETH u ponad 530 000 walidatorów. Średnie saldo walidatora wynosi nieco powyżej 34 ETH, co oznacza ponad 1 milion ETH w zgromadzonych nagrodach. Ciekawe będzie zobaczyć, jak wypłaty wpłyną na te liczby.