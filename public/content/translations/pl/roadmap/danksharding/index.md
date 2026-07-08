---
title: Danksharding
description: Dowiedz się o proto-dankshardingu i dankshardingu – dwóch kolejnych aktualizacjach skalujących Ethereum.
lang: pl
summaryPoints:
  - Danksharding to wieloetapowa aktualizacja mająca na celu poprawę skalowalności i przepustowości Ethereum.
  - Pierwszy etap, proto-danksharding, dodaje bloby danych do bloków.
  - Bloby danych oferują rollupom tańszy sposób na publikowanie danych w Ethereum, a koszty te mogą zostać przeniesione na użytkowników w postaci niższych opłat transakcyjnych.
  - Później pełny danksharding rozdzieli odpowiedzialność za weryfikację blobów danych na podzbiory węzłów, co jeszcze bardziej przeskaluje Ethereum do ponad 100 000 transakcji na sekundę.
---

**Danksharding** to sposób, w jaki [Ethereum](/) staje się prawdziwie skalowalnym blockchainem, ale aby to osiągnąć, wymaganych jest kilka aktualizacji protokołu. **Proto-danksharding** jest krokiem pośrednim na tej drodze. Oba mają na celu sprawienie, by transakcje w warstwie 2 (L2) były jak najtańsze dla użytkowników i powinny przeskalować Ethereum do >100 000 transakcji na sekundę.

## Czym jest proto-danksharding? {#what-is-protodanksharding}

Proto-danksharding, znany również jako [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), to sposób dla [rollupów](/layer-2/#rollups) na dodawanie tańszych danych do bloków. Nazwa pochodzi od dwóch badaczy, którzy zaproponowali ten pomysł: Protolambdy i Dankrada Feista. Historycznie rzecz biorąc, rollupy były ograniczone w tym, jak tanie mogą być transakcje użytkowników, przez fakt, że publikują one swoje transakcje w `CALLDATA`.

Jest to drogie, ponieważ jest przetwarzane przez wszystkie węzły Ethereum i pozostaje onchain na zawsze, mimo że rollupy potrzebują tych danych tylko przez krótki czas. Proto-danksharding wprowadza bloby danych, które mogą być wysyłane i dołączane do bloków. Dane w tych blobach nie są dostępne dla EVM i są automatycznie usuwane po ustalonym czasie (w momencie pisania tego tekstu jest to 4096 epok, czyli około 18 dni). Oznacza to, że rollupy mogą wysyłać swoje dane znacznie taniej i przekazywać oszczędności użytkownikom końcowym w postaci tańszych transakcji.

<ExpandableCard title="Dlaczego bloby sprawiają, że rollupy są tańsze?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollupy to sposób na skalowanie Ethereum poprzez wsadowanie transakcji pozałańcuchowo, a następnie publikowanie wyników w Ethereum. Rollup składa się zasadniczo z dwóch części: danych i sprawdzenia wykonania. Dane to pełna sekwencja transakcji przetwarzana przez rollup w celu wygenerowania zmiany stanu publikowanej w Ethereum. Sprawdzenie wykonania to ponowne wykonanie tych transakcji przez uczciwego aktora („provera”), aby upewnić się, że proponowana zmiana stanu jest poprawna. Aby przeprowadzić sprawdzenie wykonania, dane transakcji muszą być dostępne wystarczająco długo, aby każdy mógł je pobrać i sprawdzić. Oznacza to, że każde nieuczciwe zachowanie sekwensera rollupa może zostać zidentyfikowane i zakwestionowane przez provera. Nie muszą one jednak być dostępne na zawsze.

</ExpandableCard>

<ExpandableCard title="Dlaczego można usunąć dane blobów?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollupy publikują zobowiązania do swoich danych transakcyjnych onchain, a także udostępniają rzeczywiste dane w blobach danych. Oznacza to, że provery mogą sprawdzić, czy zobowiązania są ważne, lub zakwestionować dane, które uważają za błędne. Na poziomie węzła bloby danych są przechowywane w kliencie konsensusu. Klienty konsensusu poświadczają, że widziały dane i że zostały one rozpropagowane w sieci. Gdyby dane były przechowywane na zawsze, klienty te rozrosłyby się i doprowadziły do dużych wymagań sprzętowych dla działających węzłów. Zamiast tego dane są automatycznie usuwane z węzła co 18 dni. Poświadczenia klienta konsensusu dowodzą, że provery miały wystarczającą okazję do zweryfikowania danych. Rzeczywiste dane mogą być przechowywane pozałańcuchowo przez operatorów rollupów, użytkowników lub inne podmioty.

</ExpandableCard>

### Jak weryfikowane są dane blobów? {#how-are-blobs-verified}

Rollupy publikują wykonywane przez siebie transakcje w blobach danych. Publikują również „zobowiązanie” do danych. Robią to poprzez dopasowanie funkcji wielomianowej do danych. Funkcja ta może być następnie ewaluowana w różnych punktach. Na przykład, jeśli zdefiniujemy niezwykle prostą funkcję `f(x) = 2x-1`, to możemy ewaluować tę funkcję dla `x = 1`, `x = 2`, `x = 3`, otrzymując wyniki `1, 3, 5`. Prover stosuje tę samą funkcję do danych i ewaluuje ją w tych samych punktach. Jeśli oryginalne dane zostaną zmienione, funkcja nie będzie identyczna, a zatem wartości ewaluowane w każdym punkcie również nie będą takie same. W rzeczywistości zobowiązanie i dowód są bardziej skomplikowane, ponieważ są opakowane w funkcje kryptograficzne.

### Czym jest KZG? {#what-is-kzg}

KZG to skrót od Kate-Zaverucha-Goldberg – nazwisk trzech [oryginalnych autorów](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) schematu, który redukuje blob danych do małego [kryptograficznego „zobowiązania”](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Blob danych przesłany przez rollup musi zostać zweryfikowany, aby upewnić się, że rollup nie zachowuje się nieuczciwie. Wymaga to od provera ponownego wykonania transakcji w blobie, aby sprawdzić, czy zobowiązanie było ważne. Koncepcyjnie jest to to samo, co sposób, w jaki klienty wykonawcze sprawdzają ważność transakcji Ethereum w warstwie 1 (L1) za pomocą dowodów Merkle'a. KZG to alternatywny dowód, który dopasowuje równanie wielomianowe do danych. Zobowiązanie ewaluuje wielomian w pewnych tajnych punktach danych. Prover dopasowałby ten sam wielomian do danych i ewaluował go dla tych samych wartości, sprawdzając, czy wynik jest taki sam. Jest to sposób weryfikacji danych, który jest kompatybilny z technikami z wiedzą zerową używanymi przez niektóre rollupy, a ostatecznie przez inne części protokołu Ethereum.

### Czym była ceremonia KZG? {#what-is-a-kzg-ceremony}

Ceremonia KZG była sposobem dla wielu osób z całej społeczności Ethereum na wspólne wygenerowanie tajnego, losowego ciągu liczb, który może posłużyć do weryfikacji pewnych danych. Bardzo ważne jest, aby ten ciąg liczb nie był znany i nie mógł zostać przez nikogo odtworzony. Aby to zapewnić, każda osoba biorąca udział w ceremonii otrzymywała ciąg od poprzedniego uczestnika. Następnie tworzyła nowe losowe wartości (np. pozwalając przeglądarce na pomiar ruchu myszy) i mieszała je z poprzednią wartością. Następnie przesyłała wartość do kolejnego uczestnika i niszczyła ją na swojej lokalnej maszynie. Dopóki choć jedna osoba w ceremonii zrobiła to uczciwie, ostateczna wartość będzie niemożliwa do poznania dla atakującego.

Ceremonia KZG dla EIP-4844 była otwarta dla publiczności i wzięły w niej udział dziesiątki tysięcy osób, aby dodać własną entropię (losowość). W sumie było ponad 140 000 wkładów, co czyni ją największą tego typu ceremonią na świecie. Aby ceremonia została podważona, 100% tych uczestników musiałoby być aktywnie nieuczciwych. Z perspektywy uczestników, jeśli wiedzą, że byli uczciwi, nie ma potrzeby ufać nikomu innemu, ponieważ wiedzą, że zabezpieczyli ceremonię (indywidualnie spełnili wymóg 1 z N uczciwych uczestników).

<ExpandableCard title="Do czego służy losowa liczba z ceremonii KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Kiedy rollup publikuje dane w blobie, dostarcza „zobowiązanie”, które publikuje onchain. Zobowiązanie to jest wynikiem ewaluacji wielomianu dopasowanego do danych w określonych punktach. Punkty te są zdefiniowane przez losowe liczby wygenerowane podczas ceremonii KZG. Provery mogą następnie ewaluować wielomian w tych samych punktach w celu weryfikacji danych – jeśli uzyskają te same wartości, dane są poprawne.

</ExpandableCard>

<ExpandableCard title="Dlaczego losowe dane KZG muszą pozostać tajne?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Jeśli ktoś zna losowe lokalizacje użyte do zobowiązania, łatwo jest mu wygenerować nowy wielomian, który pasuje w tych konkretnych punktach (tj. „kolizję”). Oznacza to, że mógłby dodawać lub usuwać dane z bloba i nadal dostarczać ważny dowód. Aby temu zapobiec, zamiast podawać proverom rzeczywiste tajne lokalizacje, otrzymują oni lokalizacje opakowane w kryptograficzną „czarną skrzynkę” przy użyciu krzywych eliptycznych. Skutecznie mieszają one wartości w taki sposób, że oryginalnych wartości nie można odtworzyć, ale dzięki sprytnej algebrze provery i weryfikatory mogą nadal ewaluować wielomiany w punktach, które reprezentują.

</ExpandableCard>

<Alert variant="warning">
  Ani danksharding, ani proto-danksharding nie podążają za tradycyjnym modelem „shardingu”, który ma na celu podzielenie blockchaina na wiele części. Łańcuchy shardów nie są już częścią mapy drogowej. Zamiast tego danksharding wykorzystuje rozproszone próbkowanie danych w blobach do skalowania Ethereum. Jest to znacznie prostsze do wdrożenia. Model ten był czasami określany jako „sharding danych”.
</Alert>

## Czym jest danksharding? {#what-is-danksharding}

Danksharding to pełna realizacja skalowania rollupów, która rozpoczęła się od proto-dankshardingu. Danksharding zapewni ogromne ilości miejsca w Ethereum dla rollupów do zrzucania ich skompresowanych danych transakcyjnych. Oznacza to, że Ethereum będzie w stanie z łatwością obsługiwać setki pojedynczych rollupów i sprawi, że miliony transakcji na sekundę staną się rzeczywistością.

Działa to poprzez rozszerzenie blobów dołączonych do bloków z sześciu (6) w proto-dankshardingu do 64 w pełnym dankshardingu. Reszta wymaganych zmian to aktualizacje sposobu działania klientów konsensusu, aby umożliwić im obsługę nowych, dużych blobów. Kilka z tych zmian znajduje się już na mapie drogowej w innych celach, niezależnych od dankshardingu. Na przykład danksharding wymaga wdrożenia separacji proponującego i budującego (PBS). Jest to aktualizacja, która rozdziela zadania budowania bloków i proponowania bloków pomiędzy różne walidatory. Podobnie, próbkowanie dostępności danych (DAS) jest wymagane dla dankshardingu, ale jest również wymagane do rozwoju bardzo lekkich klientów, którzy nie przechowują wielu danych historycznych („klienty bezstanowe”).

<ExpandableCard title="Dlaczego danksharding wymaga separacji proponującego i budującego?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Separacja proponującego i budującego (PBS) jest wymagana, aby zapobiec konieczności generowania przez poszczególne walidatory drogich zobowiązań i dowodów dla 32 MB danych blobów. Nałożyłoby to zbyt duże obciążenie na domowych stakerów i wymagałoby od nich inwestycji w potężniejszy sprzęt, co szkodzi decentralizacji. Zamiast tego wyspecjalizowani budujący bloki biorą odpowiedzialność za tę kosztowną pracę obliczeniową. Następnie udostępniają swoje bloki proponującym bloki do rozgłoszenia. Proponujący blok po prostu wybiera blok, który jest najbardziej opłacalny. Każdy może tanio i szybko zweryfikować bloby, co oznacza, że każdy zwykły walidator może sprawdzić, czy budujący bloki zachowują się uczciwie. Pozwala to na przetwarzanie dużych blobów bez poświęcania decentralizacji. Nieuczciwie zachowujący się budujący bloki mogliby po prostu zostać wyrzuceni z sieci i poddani cięciu – inni zajmą ich miejsce, ponieważ budowanie bloków jest opłacalną działalnością.

</ExpandableCard>

<ExpandableCard title="Dlaczego danksharding wymaga próbkowania dostępności danych?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Próbkowanie dostępności danych (DAS) jest wymagane, aby walidatory mogły szybko i skutecznie weryfikować dane blobów. Korzystając z próbkowania dostępności danych, walidatory mogą być bardzo pewne, że dane bloba były dostępne i poprawnie zobowiązane. Każdy walidator może losowo próbkować tylko kilka punktów danych i utworzyć dowód, co oznacza, że żaden walidator nie musi sprawdzać całego bloba. Jeśli brakuje jakichkolwiek danych, zostanie to szybko zidentyfikowane, a blob odrzucony.

</ExpandableCard>

### Obecny postęp {#current-progress}

Pełny danksharding to kwestia kilku lat. W międzyczasie ceremonia KZG zakończyła się z ponad 140 000 wkładów, a [EIP](https://eips.ethereum.org/EIPS/eip-4844) dla proto-dankshardingu dojrzało. Propozycja ta została w pełni wdrożona we wszystkich sieciach testowych i została uruchomiona w Sieci głównej wraz z aktualizacją sieci Cancun-Deneb („Dencun”) w marcu 2024 r.

### Dalsza lektura {#further-reading}

- [Notatki o proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) – _Vitalik Buterin_
- [Notatki Dankrada o dankshardingu](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto i Vitalik dyskutują o dankshardingu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ceremonia KZG](https://ceremony.ethereum.org/)
- [Wystąpienie Carla Beekhuizena na Devconie o zaufanych konfiguracjach](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Więcej o próbkowaniu dostępności danych dla blobów](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist o zobowiązaniach i dowodach KZG](https://youtu.be/8L2C6RDMV9Q)
- [Zobowiązania wielomianowe KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)