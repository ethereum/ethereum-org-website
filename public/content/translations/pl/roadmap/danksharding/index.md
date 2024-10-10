---
title: Danksharding
description: Dowiedz się więcej o Proto-Danksharding i Danksharding — dwóch sukcesywnych uaktualnieniach do skalowania Ethereum.
lang: pl
summaryPoints:
  - Danksharding to wieloetapowe uaktualnienie mające na celu zwiększenie skalowalności i przepustowości Ethereum.
  - Pierwszy etap, Proto-Danksharding, dodaje bloby danych do bloków
  - Bloby danych oferują tańszy sposób dla pakietów zbiorczych na publikowanie danych w Ethereum, a koszty te mogą być przenoszone na użytkowników w postaci niższych opłat transakcyjnych.
  - Później pełny Danksharding rozłoży odpowiedzialność weryfikacji blobów danych na podzbiory węzłów, dodatkowo skalując Ethereum do ponad 100.000 transakcji na sekundę.
---

# Danksharding {#danksharding}

**Danksharding** to sposób, aby uczynić Ethereum prawdziwie skalowalnym blockchainem, ale osiągnięcie tego wymaga kilku uaktualnień protokołu. **Proto-Danksharding** jest krokiem pośrednim w tej drodze. Oba rozwiązania mają na celu zapewnienie jak najtańszych transakcji w warstwie 2 dla użytkowników i powinny skalować Ethereum do >100 000 transakcji na sekundę.

## Czym jest Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, znany również jako [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), jest sposobem dla [pakietów zbiorczych](/layer-2/#rollups) na dodawanie tańszych danych do bloków. Nazwa pochodzi od dwóch badaczy, którzy zaproponowali ten pomysł: Protolambda i Dankrad Feist. Kiedyś pakiety zbiorcze miały ograniczoną możliwość obniżania kosztów transakcji użytkowników, ponieważ publikowały swoje transakcje w `CALLDATA`.

Jest to drogie rozwiązanie, ponieważ jest przetwarzane przez wszystkie węzły Ethereum i pozostaje w łańcuchu na zawsze, nawet jeśli pakiety zbiorcze potrzebują danych tylko na krótki czas. Proto-Danksharding wprowadza bloby danych, które mogą być wysyłane i dołączane do bloków. Dane w tych blobach nie są dostępne dla EVM i są automatycznie usuwane po określonym czasie (w czasie powstawania tego tekstu jest to 4096 epok, czyli około 18 dni). Oznacza to, że pakiety zbiorcze mogą przesyłać swoje dane znacznie taniej i przekazywać oszczędności użytkownikom końcowym w postaci tańszych transakcji.

<ExpandableCard title="Dlaczego dzięki blobom pakiety zbiorcze są tańsze?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Pakiety zbiorcze są sposobem skalowania Ethereum poprzez grupowanie transakcji poza łańcuchem, a następnie przesyłanie wyników do Ethereum. Pakiety zbiorcze składają się zasadniczo z dwóch części: danych i kontroli wykonania. Dane to pełna sekwencja transakcji, które są przetwarzane przez pakiet zbiorczy w celu wygenerowania zmiany stanu publikowanej w Ethereum. Kontrola wykonania to ponowne wykonanie tych transakcji przez uczciwego uczestnika („udowadniającego”) w celu upewnienia się, że proponowana zmiana stanu jest poprawna. Aby możliwa była kontrola wykonania, dane transakcji muszą być dostępne wystarczająco długo, aby każdy mógł je pobrać i sprawdzić. Oznacza to, że każde nieuczciwe zachowanie sekwencera pakietu zbiorczego może zostać zidentyfikowane i podważone przez udowadniającego. Nie musi ono być jednak dostępne wiecznie.

</ExpandableCard>

<ExpandableCard title="Dlaczego usuwanie danych blobów jest właściwe?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Pakiety zbiorcze publikują zobowiązania do swoich danych transakcyjnych w łańcuchu, a także udostępniają rzeczywiste dane w blobach danych. Oznacza to, że udowadniający mogą sprawdzać poprawność zobowiązań lub podważać dane, które uważają za nieprawidłowe. Na poziomie węzła bloby danych są przechowywane w kliencie konsensusu. Klienci konsensusu poświadczają, że widzieli dane i że zostały one rozpowszechnione w sieci. Gdyby dane były przechowywane wiecznie, klienci ci mogliby się rozrastać i doprowadziliby do dużych wymagań sprzętowych potrzebnych do uruchomienia węzła. Zamiast tego dane są automatycznie usuwane z węzła co 18 dni. Poświadczenia klientów konsensusu pokazują, że udowadniający mieli wystarczającą możliwość zweryfikowania danych. Rzeczywiste dane mogą być przechowywane poza łańcuchem przez operatorów pakietów zbiorczych, użytkowników lub inne osoby.

</ExpandableCard>

### W jaki sposób są weryfikowane dane blobów? {#how-are-blobs-verified}

Pakiety zbiorcze publikują wykonywane transakcje w blobach danych. Publikują również „zobowiązanie” do danych. Robią to poprzez dopasowywanie funkcji wielomianowej do danych. Funkcja ta może być następnie obliczana w różnych punktach. Na przykład, jeśli zdefiniujemy bardzo prostą funkcję `f(x) = 2x-1`, możemy obliczyć tę funkcję dla `x = 1`, `x = 2`, `x = 3`, otrzymując wyniki `1, 3, 5`. Udowadniający stosuje tę samą funkcję do danych i oblicza ją w tych samych punktach. Jeśli oryginalne dane zostaną zmienione, funkcja nie będzie identyczna, a zatem wartości obliczone w każdym punkcie również nie będą identyczne. W rzeczywistości zobowiązanie i dowód są bardziej skomplikowane, ponieważ są opakowane w funkcje kryptograficzne.

### Co to jest KZG? {#what-is-kzg}

KZG to skrót od Kate-Zaverucha-Goldberg — nazwisk trzech [oryginalnych autorów](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) schematu, który redukuje blob danych do małego [kryptograficznego „zobowiązania”](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Blob danych przesłany przez pakiet zbiorczy należy zweryfikować, aby upewnić się, że pakiet zbiorczy nie działa nieprawidłowo. Wiąże się to z ponownym wykonaniem przez udowadniającego transakcji w blobie w celu sprawdzenia, czy zobowiązanie było poprawne. Zasadniczo mówimy tu o tym samym, co sposób, w jaki klienci wykonawczy sprawdzają poprawność transakcji Ethereum w warstwie 1 za pomocą dowodów Merkle. KZG to alternatywny dowód, który dopasowuje równanie wielomianowe do danych. Zobowiązanie ocenia wielomian w niektórych tajnych punktach danych. Udowadniający dopasowałby ten sam wielomian do danych i obliczyłby go dla tych samych wartości, sprawdzając, czy wynik jest taki sam. Jest to sposób weryfikacji danych, który jest zgodny z technikami wiedzy zerowej używanymi przez niektóre pakiety zbiorcze oraz później inne części protokołu Ethereum.

### Czym była ceremonia KZG? {#what-is-a-kzg-ceremony}

Ceremonia KZG była sposobem dla wielu osób z całej społeczności Ethereum na wspólne wygenerowanie tajnego losowego ciągu liczb, który można wykorzystać do weryfikacji niektórych danych. Bardzo ważne jest, aby ten ciąg liczb nie był znany i nie mógł zostać odtworzony przez nikogo. Aby to zapewnić, każda osoba biorąca udział w ceremonii otrzymywała ciąg od poprzedniego uczestnika. Następnie tworzyli nowe losowe wartości (np. pozwalając przeglądarce mierzyć ruch ich myszki) i mieszali je z poprzednią wartością. Potem wysyłali tę wartość do kolejnego uczestnika i niszczyli ją ze swojego komputera. Dopóki jedna osoba w tej ceremonii robiła to uczciwie, ostateczna wartość nie była znana atakującemu.

Ceremonia EIP-4844 KZG była dostępna publicznie, a dziesiątki tysięcy ludzi wzięło w niej udział, aby dodać własną losowość. Łącznie w ceremonii wzięło udział 140 000 osób, co czyni ją największą tego typu ceremonią na świecie. Aby ceremonia została unieważniona, 100% uczestników musiałoby być wyraźnie nieuczciwych. Jeśli uczestnicy wiedzą, że byli uczciwi, nie ma potrzeby ufać nikomu innemu, ponieważ wiedzą, że zabezpieczyli ceremonię (indywidualnie spełnili wymóg 1-z-N uczciwych uczestników).

<ExpandableCard title="Do czego służy losowa liczba z ceremonii KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Kiedy pakiet zbiorczy publikuje dane w blobie, dostarcza „zobowiązanie”, które publikuje w łańcuchu. Zobowiązanie to jest wynikiem obliczenia dopasowania wielomianu do danych w określonych punktach. Punkty te są zdefiniowane przez losowe liczby wygenerowane podczas ceremonii KZG. Udowadniający mogą następnie obliczyć wielomian w tych samych punktach, aby zweryfikować dane — jeśli otrzymają te same wartości, dane są poprawne.

</ExpandableCard>

<ExpandableCard title="Dlaczego losowe dane KZG muszą pozostać tajne?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Jeśli ktoś zna losowe lokalizacje użyte do zobowiązania, może łatwo wygenerować nowy wielomian, który pasuje do tych konkretnych punktów (tj. „kolizja”). Oznacza to, że może on dodawać lub usuwać dane z bloba i nadal dostarczać prawidłowy dowód. Aby temu zapobiec, zamiast przekazywać udowadniającym rzeczywiste tajne lokalizacje, otrzymują oni lokalizacje owinięte w kryptograficzną „czarną skrzynkę” wykorzystującą krzywe eliptyczne. Te skutecznie szyfrują wartości w taki sposób, że oryginalne wartości nie można odtworzyć, ale dzięki sprytnej algebrze udowadniający i weryfikujący mogą nadal obliczyć wielomiany w punktach, które reprezentują.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Ani Danksharding, ani Proto-Danksharding nie są zgodne z tradycyjnym modelem „shardingu”, który ma na celu podzielenie blockchainu na wiele części. Łańcuchy odłamkowe nie są już częścią planu działania. W zamian Danksharding wykorzystuje rozproszone próbkowanie danych w blobach do skalowania Ethereum. Jest to znacznie prostsze do wdrożenia. Model ten był czasami określany jako „odłamkowanie danych”.
</InfoBanner>

## Czym jest Danksharding? {#what-is-danksharding}

Danksharding to pełna realizacja skalowania pakietów zbiorczych, która rozpoczęła się od Proto-Dankshardingu. Danksharding przyniesie ogromne ilości miejsca na Ethereum dla pakietów zbiorczych w celu zrzucania ich skompresowanych danych transakcyjnych. Oznacza to, że Ethereum będzie w stanie z łatwością obsługiwać setki indywidualnych pakietów zbiorczych i realizować miliony transakcji na sekundę.

Sposób, w jaki to działa, polega na rozszerzaniu blobów dołączonych do bloków z sześciu (6) w Proto-Dankshardingu do 64 w pełnym Dankshardingu. Reszta wymaganych zmian to aktualizacje sposobu działania klientów konsensusu, mające umożliwić im obsługę nowych dużych blobów. Kilka z tych zmian znajduje się już w planie działania dla innych celów niezależnych od Dankshardingu. Na przykład Danksharding wymaga wdrożenia podziału proponent-twórca. Jest to uaktualnienie, które rozdziela zadania tworzenia bloków i proponowania bloków u różnych walidatorów. Również próbkowanie dostępności danych jest wymagane dla Dankshardingu, ale jest ono także wymagane do rozwoju bardzo lekkich klientów, które nie przechowują wielu danych historycznych („klienci bezstanowi”).

<ExpandableCard title="Dlaczego Danksharding wymaga podziału proponent-twórca?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Podział proponent-twórca jest wymagany, aby zapobiec konieczności generowania przez poszczególne walidatory kosztownych zobowiązań i dowodów dla 32 MB danych bloba. Stanowiłoby to zbyt duże obciążenie dla domowych stakerów i wymagałoby od nich inwestowania w mocniejszy sprzęt, co zaszkodziłoby decentralizacji. Zamiast tego wyspecjalizowani twórcy bloków biorą odpowiedzialność na siebie za tę kosztowną pracę obliczeniową. Następnie udostępniają swoje bloki do wysłania proponentom bloków. Proponent bloku po prostu wybiera blok, który jest najbardziej opłacalny. Każdy może zweryfikować bloby tanio i szybko, co oznacza, że każdy normalny walidator może sprawdzić, czy twórcy bloków zachowują się uczciwie. Pozwala to na przetwarzanie dużych blobów bez poświęcania decentralizacji. Niewłaściwie zachowujący się twórcy bloków mogą zostać po prostu wyrzuceni z sieci i odcięci — ich miejsce zajmą inni, ponieważ tworzenie bloków jest opłacalną czynnością.

</ExpandableCard>

<ExpandableCard title="Dlaczego Danksharding wymaga próbkowania dostępności danych?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Próbkowanie dostępności danych jest wymagane, aby walidatory mogły szybko i skutecznie weryfikować dane blobów. Korzystając z próbkowania dostępności danych, walidatory mogą mieć olbrzymią pewność, że dane blobów były dostępne i poprawnie zatwierdzone. Każdy walidator może losowo pobrać tylko kilka punktów danych i utworzyć dowód, co oznacza, że żaden walidator nie musi sprawdzać całego bloba. Jeśli brakuje jakichkolwiek danych, zostaną one szybko zidentyfikowane, a blob zostanie odrzucony.

</ExpandableCard>

### Aktualny postęp {#current-progress}

Na pełny Danksharding poczekamy jeszcze kilka lat. W międzyczasie ceremonia KZG zakończyła się przy udziale ponad 140 000 członków, a [EIP](https://eips.ethereum.org/EIPS/eip-4844) dla Proto-Dankshardingu został ulepszony. Propozycja ta została w pełni wdrożona we wszystkich sieciach testowych i została uruchomiona w sieci głównej wraz z uaktualnieniem sieci Cancun-Denceb („Dancun”) w marcu 2024.

### Dalsza lektura {#further-reading}

- [Uwagi na temat Proto-Dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) — _Vitalik Buterin_
- [Uwagi Dankrada na temat Dankshardingu](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto i Vitalik dyskutują o Dankshardingu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ceremonia KZG](https://ceremony.ethereum.org/)
- [Wykład Carla Beekhuizena na Devconie na temat zaufanych konfiguracji](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Więcej o próbkowaniu dostępności danych dla blobów](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist o zobowiązaniach KZG i dowodach](https://youtu.be/8L2C6RDMV9Q)
- [Zobowiązania wielomianowe KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
