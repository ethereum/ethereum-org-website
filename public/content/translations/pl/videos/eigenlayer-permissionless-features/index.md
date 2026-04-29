---
title: "EigenLayer: dodawanie funkcji niewymagających pozwoleń do Ethereum"
description: "Sreeram Kannan przedstawia podejście EigenLayer do dodawania funkcji niewymagających pozwoleń w Ethereum."
lang: pl
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "bezpieczeństwo"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Prezentacja badawcza **Sreerama Kannana** (University of Washington / EigenLayer) na wydarzeniu badawczym a16z krypto, wyjaśniająca, w jaki sposób EigenLayer ma na celu umożliwienie innowacji niewymagających pozwoleń w Ethereum poprzez pozwolenie stakującym na zaangażowanie tego samego stakowanego kapitału w dodatkowe warunki cięcia w zamian za świadczenie nowych usług, takich jak wyrocznie, mosty, warstwy dostępności danych i alternatywne środowiska wykonawcze.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=-V-fG4J1N_M) opublikowanego przez a16z krypto. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Dzisiaj opowiem o jednym z produktów, które budujemy, będącym również ideą o nazwie EigenLayer. Nazywamy EigenLayer kolektywem restakingu, ale to, co on robi, to umożliwienie każdemu dodawania nowych funkcji do Ethereum.

Jak przedstawił mnie Tim, jestem profesorem nadzwyczajnym na University of Washington w Seattle, gdzie przez ostatnie cztery i pół roku pracowaliśmy nad blockchainami, konsensusem i innymi obszarami. Przez ostatni rok zakładałem startup EigenLayer Labs. Wykonaliśmy wiele pracy nad protokołami konsensusu — opublikowaliśmy artykuł zatytułowany „Everything is a Race”, który analizuje warunki, w jakich protokoły typu najdłuższego łańcucha oparte na dowodzie pracy (PoW), dowodzie stawki (PoS) i dowodzie przestrzeni są bezpieczne. Zbudowaliśmy na podstawie części tego zrozumienia — na przykład artykuł zatytułowany Prism, który jest protokołem dowodu pracy o bardzo niskim opóźnieniu. Pracowaliśmy również nad PoSAT, dotyczącym tego, jak stworzyć dynamicznie dostępny protokół dowodu stawki, w którym protokół nadal działa przy zmiennym udziale.

#### Kiedy blockchainy są rozliczalne (1:31) {#when-are-blockchains-accountable-131}

Badaliśmy również, kiedy blockchainy są rozliczalne. Jedną z heurystyk jest to, że gdy masz kwora i podpisy, jeśli grupa stakujących podwójnie podpisze blok, te blockchainy są rozliczalne. Istnieją jednak subtelności — na przykład protokół taki jak Algorand, który również używa kworów, nie jest rozliczalny, ponieważ opiera się na założeniach czasowych, w których można stworzyć naruszenia bezpieczeństwa, nic nie mówiąc.

#### Konsensus wielozasobowy (2:11) {#multi-resource-consensus-211}

Dwie najnowsze prace dotyczą konsensusu wielozasobowego — przypuśćmy, że chcesz zbudować protokół, który wykorzystuje dowód stawki, dowód przestrzeni i dowód pracy połączone w jeden protokół. Chcesz, aby działał, nawet jeśli większość kopiących w dowodzie pracy jest złośliwa, o ile bardzo mały ułamek kopiących w dowodzie stawki jest uczciwy. Scharakteryzowaliśmy obszary kompromisów dla wielu zasobów.

Pracowaliśmy również nad projektowaniem topologii peer-to-peer — jak upewnić się, że w sieci peer-to-peer blockchaina protokół konsensusu respektuje kolejność wiadomości? Jedną z rzeczy, która nagminnie dzieje się w blockchainach, jest wyprzedzanie transakcji. Aby zapobiec nieukierunkowanemu wyprzedzaniu transakcji — gdzie po prostu chcesz wyprzedzić wszystkich innych, ponieważ masz przewagę cenową — opublikowaliśmy artykuł zatytułowany Themis, który nadaje blockchainowi natywną właściwość FIFO (pierwsze weszło, pierwsze wyszło).

Oprócz konsensusu istnieją rozwiązania skalujące, takie jak sharding. Mieliśmy na ten temat kilka artykułów — Coded Merkle Tree i Free2Shard.

Jedną z rzeczy, którą uznaliśmy za główne tarcie w blockchainie, jest to, że tempo innowacji w warstwach podstawowych — w konsensusie, shardingu czy peer-to-peer — jest znacznie niższe niż tempo innowacji w warstwie aplikacji. Aplikacje można wdrożyć w sposób niewymagający pozwoleń — każdy może wdrożyć aplikację na istniejącym blockchainie, takim jak Ethereum. Z kolei aktualizacje podstawowego protokołu są wymagające zezwolenia w bardzo głębokim sensie. To dość mocno zahamowało naszą przestrzeń.

#### Oddzielenie zaufania od innowacji (8:30) {#decoupling-trust-and-innovation-830}

Cofając się do lat 2008–2009: Bitcoin zapoczątkował zdecentralizowane zaufanie poprzez kopanie w oparciu o dowód pracy. Oprócz kopania istnieje protokół konsensusu — najdłuższego łańcucha lub najcięższego łańcucha — który decyduje o prawidłowym łańcuchu. Ponadto Bitcoin Script określa semantykę wykonania. Mamy więc warstwę zaufania u podstaw, warstwę konsensusu powyżej i warstwę wykonawczą na samej górze.

Ale Bitcoin był również blockchainem specyficznym dla aplikacji — zaprojektowanym dla jednej aplikacji: wymiany Bitcoina między klientami. Wracając do 2011 roku, każda nowa aplikacja, która miała zostać zbudowana na blockchainie, potrzebowała własnej sieci zaufania. Na przykład ktoś chciał zbudować zdecentralizowany system nazw domen o nazwie Namecoin. Warstwa skryptowa Bitcoina nie dawała wystarczającej programowalności, więc trzeba było stworzyć nową warstwę skryptową i nową sieć zaufania. Nie było sposobu na współdzielenie zaufania między Namecoinem a Bitcoinem.

Główną ideą zbudowaną przez Ethereum było oddzielenie zaufania od innowacji. Wzięli warstwę skryptową Bitcoina i zastąpili ją warstwą programowania ogólnego przeznaczenia, kompletną w sensie Turinga — Maszyną Wirtualną Ethereum (EVM). W podstawowym sensie była to niewielka aktualizacja techniczna, ale to, co stworzyła, to modułowość zaufania. Teraz każdy może przyjść i budować zdecentralizowane aplikacje (dapps) w tym systemie. Osoba, która zbudowała ENS, nie miała nic wspólnego z siecią zaufania. Zaufanie sieci Ethereum stało się modułem, który można dostarczyć do dowolnej rozproszonej aplikacji.

#### Otwarte innowacje (10:23) {#open-innovation-1023}

Doprowadziło to do ogromnego przyspieszenia pseudonimowej gospodarki. Każdy, kto tworzy te aplikacje — sam w sobie nie jest obdarzony zaufaniem, po prostu wnosi innowacje. Wpadasz na pomysł, możesz być nikim, nie musisz cieszyć się zaufaniem, po prostu piszesz swój kod, umieszczasz go na Ethereum, a wszyscy ufają, że Ethereum będzie nadal wykonywać warunki zgodnie z ustaleniami.

Jeden ze sposobów modelowania tego: warstwy podstawowe — sieć zaufania, konsensus i maszyna wirtualna — są połączone w sieć zaufania produkującą zaufanie. Blockchain Ethereum jest producentem zaufania. Rozproszone aplikacje są konsumentami zaufania. Wymiana wartości wygląda następująco: dappy otrzymują zaufanie od Ethereum i w zamian płacą opłaty. Podobnie jak kapitał wysokiego ryzyka (venture capital) był oddzieleniem kapitału od innowacji, tak Ethereum oddzieliło zaufanie od innowacji.

Jednak bariery dla otwartych innowacji nadal się utrzymują. Jeśli mam pomysł na to, jak zaktualizować protokół konsensusu Ethereum — powiedzmy, że jest rok 2019 i wymyśliłem protokół konsensusu Avalanche — nie ma sposobu, aby wdrożyć go na Ethereum. Więc co robię? Idę i tworzę swój własny, cały świat. To era alternatywnych blockchainów warstwy 1 (L1) — każdy z innymi protokołami konsensusu, innymi maszynami wirtualnymi, ale każdy musi budować własne sieci zaufania.

Ten obraz wygląda dokładnie tak samo jak obraz Bitcoina i Namecoina z 2011 roku. Innowacje na poziomie dappów mogą po prostu opierać się na Ethereum, ale innowacje, które sięgają głębiej i dotykają serca stosu technologicznego, muszą tworzyć pofragmentowane ekosystemy zaufania.

Co więcej, Ethereum dostarcza zaufanie dappom tylko do tworzenia bloków — porządkowania transakcji i wykonywania transakcji. To wszystko. Jeśli dappy chciałyby zaufania do czegokolwiek innego — odczytywania danych z internetu, odczytywania danych z innego blockchaina, uruchamiania innego silnika wykonawczego, uruchamiania silnika gier, uruchamiania systemu uwierzytelniania — muszą stworzyć własną sieć zaufania. Chainlink jest świetnym przykładem: to protokół wyroczni, który pomaga pobierać dane z internetu do blockchaina, ale Chainlink ma własną sieć zaufania. Jego zaufanie nie jest pożyczane od stakujących w Ethereum.

#### Problem mikroekonomiczny (16:28) {#microeconomic-problem-1628}

Problem mikroekonomiczny: jeśli prowadzisz oprogramowanie pośredniczące (middleware) — powiedzmy, system przechowywania danych — musisz stworzyć własny mechanizm stakingu. Potrzebujesz wysokiego bezpieczeństwa ekonomicznego, co oznacza dużo stakowanego kapitału, a do tego dochodzi koszt alternatywny kapitału. Na przykład chcesz, aby w twojej warstwie przechowywania danych stakowano 10 miliardów dolarów. Musisz zapłacić 5% lub 10% rocznej stopy zwrotu od tego kapitału w niespekulacyjnym świecie. Dominującym kosztem nie jest koszt operacyjny przechowywania danych — jest nim koszt utrzymania ogromnej bazy kapitału ekonomicznego.

Spójrz na dowolny ekosystem dowodu stawki (PoS): 94% nagród trafia do osoby, która posiada kapitał, a tylko 6% trafia do osoby, która faktycznie wykonuje operacje. Więc nawet jeśli wpadniesz na przełomowy pomysł na zmniejszenie kosztów operacyjnych 10-krotnie, te 94% pozostaje bez zmian. Twoja struktura kosztów jest ograniczona kosztem kapitału.

Jeśli jesteś dappem, problem mikroekonomiczny polega na tym, że płacisz bardzo wysoką opłatę dużej sieci zaufania, takiej jak Ethereum, ale jesteś ograniczony przez najsłabsze zaufanie, od którego zależysz. Jeśli miałbyś wyrocznię lub most, który nie jest tak zaufany, mógłbyś zostać tam wykorzystany. Twoje bezpieczeństwo jest zawsze najmniejszym wspólnym mianownikiem.

#### Problem ekonomiczny (19:52) {#economic-problem-1952}

W przypadku głównego blockchaina, jeśli podstawową propozycją wartości jest zapewnienie zdecentralizowanego zaufania i czerpanie z niego przychodów, Ethereum jest w stanie zapewnić zdecentralizowane zaufanie tylko w zakresie tworzenia bloków — a nie we wszystkich innych rzeczach wymaganych do uruchomienia zdecentralizowanej usługi. Wyspy zdecentralizowanego zaufania są tworzone przez inne oprogramowanie pośredniczące i zamiast łączyć przychody i tworzyć ogromną sieć zaufania, przychody ulegają fragmentacji na mniejsze wyspy.

#### EigenLayer (20:44) {#eigenlayer-2044}

To w rzeczywistości absurdalnie prosty pomysł, który rozwiązuje wszystkie te problemy naraz.

EigenLayer to mechanizm wykorzystujący istniejącą sieć zaufania do robienia innych rzeczy, do których nie była przeznaczona. Ethereum dostarcza zaufanie w zakresie porządkowania i wykonywania. EigenLayer to seria inteligentnych kontraktów na Ethereum, a kluczowym słowem operacyjnym jest restaking.

Czym jest restaking? W Ethereum opartym na dowodzie stawki kilkadziesiąt miliardów dolarów jest już stakowanych w Beacon Chain. EigenLayer to mechanizm, dzięki któremu stakujący dokonują restakingu — wystawiają ten sam kapitał na dodatkowe ryzyko. Blokują swoją stawkę w Ethereum, a ta sama stawka zostaje zaangażowana w dodatkowe warunki cięcia. Cięcie to mechanizm, dzięki któremu twoja stawka może zostać odebrana, ale teraz dodajesz dodatkowe powody, dla których możesz zostać ukarany, na szczycie inteligentnych kontraktów EigenLayer.

Właściwość, której pragniemy: ta sama stawka podejmuje dodatkowe ryzyko. Dodatkowe ryzyko na co? Na świadczenie wszelkich nowych usług, które zostały zbudowane na EigenLayer — ktoś chce zbudować wyrocznię, most, warstwę dostępności danych, nowy protokół konsensusu. Każda z tych rzeczy może zostać zbudowana na EigenLayer. Jeśli jesteś stakującym, który decyduje się na udział (opt-in), określasz również, do jakiego podzbioru usług dołączasz — zyskując w ten sposób przychody, a jednocześnie podejmując dodatkowe ryzyko cięcia.

#### Jak EigenLayer dostosowuje ekosystem (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Dla oprogramowania pośredniczącego: jeśli stakujący, który już stakuje w Ethereum, zdecyduje się również świadczyć usługi dla wyroczni, nie ponosi dodatkowego kosztu kapitału. Już stakuje na Ethereum i zarabia APR. Decydując się na EigenLayer, krańcowy koszt kapitału jest albo bardzo mały, albo teoretycznie zerowy. Jeśli wiesz, że jako uczciwy węzeł nigdy nie zostaniesz ścięty, ryzyko jest zminimalizowane. Równanie staje się następujące: czy koszt operacyjny jest uzasadniony przez przychody? Struktura kosztów oprogramowania pośredniczącego nagle przekształca się z ograniczonej kapitałem na ograniczoną kosztami operacyjnymi.

Dla dappów: szczególnie popularne usługi, do których dołącza wielu stakujących, zapewniają takie samo zaufanie jak samo Ethereum. Jeśli wszyscy stakujący potencjalnie dołączą, możesz uzyskać podstawowe zaufanie Ethereum dla usług, które nie zostały natywnie wbudowane w Ethereum.

Jest to również dostosowane pod względem wartości do głównego ekosystemu. Stakujący, którzy stakowali na Ethereum, otrzymują nagrody za bloki i opłaty transakcyjne, ale mogą również otrzymywać opłaty za wyrocznie, opłaty za dostępność danych, opłaty za porządkowanie — wszystkie rzeczy, które wcześniej były niedostępne. Fakt, że istnieją dodatkowe źródła przychodów ze stakowania ETH, zwiększa wartość samego tokena.

EigenLayer to dwustronny rynek. Z jednej strony są stakujący, którzy decyduują się na udział. Z drugiej strony są oprogramowania pośredniczące i usługi zbudowane na EigenLayer, które decydują się na korzystanie z tych stakujących.

#### Nadmierne lewarowanie i zarządzanie ryzykiem (33:00) {#over-leveraging-and-risk-management-3300}

**Pytanie z widowni:** Co jeśli stawka jest nadmiernie lewarowana?

Powiedzmy, że istnieje dziesięć różnych dappów uruchamiających własne łańcuchy, z których każdy ma wartość 1 miliona dolarów i opiera się na tym samym kworum stakujących o wartości 2 milionów dolarów — ta stawka staje się nadmiernie lewarowana. EigenLayer to również warstwa zarządzania ryzykiem. Modelujemy to jako problem grafowy: każdy stakujący to węzeł, każda usługa zależy od grupy stakujących, a dla każdej usługi istnieje zysk z korupcji. Następnie obliczasz cięcia na tym grafie, aby upewnić się, że system nigdy nie jest nadmiernie lewarowany.

Jeśli system staje się nadmiernie lewarowany, opłaty rosną, więcej osób dołącza, a system ponownie staje się niedolewarowany. W miarę uruchamiania kolejnych usług rosną możliwości zysku i więcej kapitału zostaje zablokowane — zamiast 5% stakowanego ETH, możesz mieć 50%.

#### Ekonomia przestrzeni blokowej (43:58) {#block-space-economics-4358}

Przestrzeń blokowa jest określana przez limit bloku — maksymalny rozmiar, jaki blok może pomieścić. Wszystkie systemy blockchain mają samoregulującą się ekonomię, w której w miarę jak rozmiar bloku zbliża się do limitu bloku, ceny zaczynają gwałtownie rosnąć.

Limit bloku jest ustalany przez infrastrukturę najsłabszego węzła. Filozofią Ethereum jest dopuszczenie domowego walidatora w Wenezueli — może 1 megabajt na sekundę. W ten sposób ustalany jest limit bloku. Ale wszyscy stakujący działający na Amazon Web Services mają połączenia 10-gigabitowe — to 10 000-krotna różnica w stosunku do najsłabszego węzła.

EigenLayer automatycznie rozwiązuje ten problem, tworząc wolny rynek, na którym ci stakujący mogą wypożyczać swoją dodatkową przestrzeń blokową dla innych usług. Ktoś mógłby zbudować kolejny łańcuch z 15 giga-gazu na blok zamiast 15 milionów gazu. Otrzymujesz coś w rodzaju 60% bezpieczeństwa Ethereum — a to już wystarczająco dużo.

#### Heterogeniczność stakujących (48:57) {#staker-heterogeneity-4857}

Heterogeniczność stakujących wykracza poza możliwości obliczeniowe. Stakujący są wysoce heterogeniczni pod względem preferencji dotyczących ryzyka i nagród. Ty i ja możemy się zgodzić, że zostaniemy ścięci, jeśli będziemy się różnić od danych wyjściowych API Coinbase, ale dla kogoś innego jest to całkowicie nie do przyjęcia. Tego nigdy nie da się znormalizować w podstawowym protokole, ale można to uzewnętrznić w warstwie opcjonalnej (opt-in).

Stakujący są również heterogeniczni pod względem preferencji dotyczących nagród. W Ethereum przestrzeń blokowa jest wielkością bezbarwną — wszystkie transakcje są równe, a jedynym sygnałem pozwalającym je odróżnić jest cena. Bardzo trudno jest zbudować sieć społecznościową na Ethereum, ponieważ każda transakcja w sieci społecznościowej konkuruje z transakcją zdecentralizowanych finansów (DeFi), która jest znacznie bardziej opłacalna w ujęciu jednostkowym. Nasze rozwiązanie: stakujący dołączają do różnych podłańcuchów, w których mają różne preferencje dotyczące nagród.

#### Demokratyczne i zwinne innowacje (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer rozwiązuje problem tego, jak zaprojektować blockchain, który jest zarówno demokratyczny, jak i zwinny w innowacjach. Ethereum jest zarządzane bardzo demokratycznie, ale też bardzo wolno reaguje. Wszystkie dzisiejsze protokoły idą na kompromis między zwinnością a demokratycznym zarządzaniem. Ethereum plus EigenLayer czerpie to, co najlepsze z obu światów: warstwę podstawową, która jest demokratyczna i powoli aktualizowana, na której EigenLayer pozwala ludziom budować innowacje szybko reagujące na wymagania rynku w sposób całkowicie niewymagający pozwoleń.

#### EigenDA i zakończenie (52:56) {#eigenda-and-closing-5256}

Badamy budowę mostów, automatyzację opartą na zdarzeniach, usługi uczciwego porządkowania, łańcuchy poboczne i integrację MEV — wszystko to na EigenLayer. EigenLayer działa już w wewnętrznych sieciach testowych. Zbudowaliśmy już pierwszy przypadek użycia: hiperskalowalną warstwę dostępności danych dla Ethereum o nazwie EigenDA. Jest to warstwa dostępności danych, która łączy w sobie najlepsze pomysły z zakresu kodowania wymazań i zobowiązań wielomianowych. W naszej sieci testowej prędkość, z jaką można zapisywać dane, wynosi 12,4 megabajta na sekundę — 10 razy więcej niż to, co ma zostać dostarczone w Ethereum 2.0.

Kluczowym spostrzeżeniem jest to, że dzięki kodowaniu wymazań całkowity koszt przechowywania pliku nie zależy od liczby węzłów, które dołączyły. Ale cena, którą możesz pobrać, zależy od liczby węzłów, ponieważ zapewniasz większe bezpieczeństwo ekonomiczne. Istnieje samo-skalująca się ekonomia, w której coraz więcej węzłów będzie dołączać, ponieważ mogą pobierać premię za bezpieczeństwo bez zwiększania kosztów operacyjnych. Kodowanie wymazań przełamuje kompromis między skalowalnością a decentralizacją — zyskujesz pełną decentralizację i pełną skalowalność jednocześnie.

#### Najważniejsze pytania i odpowiedzi (58:00) {#qa-highlights-5800}

**O audytach oprogramowania pośredniczącego:** Podobnie jak istnieje ekosystem audytów inteligentnych kontraktów, potrzebujemy ekosystemów audytów oprogramowania pośredniczącego. Audyt inteligentnych kontraktów służy użytkownikom, którzy z założenia nic nie wiedzą. Audyt oprogramowania pośredniczącego służy stakującym, którzy z założenia powinni coś wiedzieć. Jeśli nie uda nam się sprawić, by audyty oprogramowania pośredniczącego działały, nie powinniśmy tak naprawdę ufać również audytom inteligentnych kontraktów.

**O ryzyku:** Skrajny przykład — cała stawka dołączyła do systemu EigenLayer, w którym można zostać ściętym nawet bez zrobienia niczego złego, a potem zostajesz ścięty i cały protokół jest zagrożony. To możliwe. Ale to stakujący tracą swoje pieniądze, więc powinni być bardziej ostrożni przy dołączaniu. Skupiamy się na tym, aby ułatwić im bycie ostrożnymi.

**O przestrzeni blokowej L1 a łańcuchach pobocznych:** Możesz uruchomić zupełnie inny system — jak Solana VM — na szczycie sieci zaufania Ethereum. Warunek cięcia jest prosty: jeśli podwójnie podpiszesz blok na tej samej głębokości, jest to warunek weryfikowalny onchain i zostajesz ścięty. Struktura kosztów działa, ponieważ restakujący nie ponoszą dodatkowego kosztu kapitału, a różnica między łańcuchem pobocznym EigenLayer a posiadaniem własnego łańcucha polega na tym, że nie potrzebujesz nowego tokena wartości i nie musisz płacić za utrzymanie kosztu kapitału tego tokena.