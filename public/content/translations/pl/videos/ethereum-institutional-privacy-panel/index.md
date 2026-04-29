---
title: "Prywatność instytucjonalna na Ethereum już teraz"
description: "Panel na wydarzeniu Web3Privacy Now podczas Devconnect 2025, z udziałem ekspertów omawiających rzeczywiste potrzeby instytucjonalne w zakresie prywatności na Ethereum, od zgodności z przepisami po dowody z wiedzą zerową."
lang: pl
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "prywatność-i-bezpieczeństwo"
  - "prywatność"
format: panel
author: Web3Privacy Now
breadcrumb: "Prywatność instytucjonalna"
---

Panel na wydarzeniu Web3Privacy Now podczas Devconnect 2025, moderowany przez **Oskara Thorina** (IPTF/EF), z udziałem **Zacha Obronta** (Etherealize), **Amzaha** (ABN Amro), **Eugenio** (European Blockchain Association) oraz **François** (Polygon Miden), omawiający rzeczywiste potrzeby instytucjonalne w zakresie prywatności na Ethereum, od zgodności z przepisami po dowody z wiedzą zerową dla instytucjonalnych zdecentralizowanych finansów (DeFi).

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=cZqlg4W1Els) opublikowanego przez Web3Privacy Now. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie do Institutional Privacy Task Force (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Cześć. Słyszycie mnie? W porządku. Super. Najpierw zrobimy bardzo krótkie wprowadzenie — taką 3- do 5-minutową prelekcję — a potem przejdziemy do panelu. To jest skrócona wersja. Poprzedni panel dużo mówił o zgodności z przepisami, prywatności i tak dalej. Wcześniej wygłosiłem prelekcję na Cyban Congress, która również tego dotyczyła, a dłuższa wersja tej prelekcji odbędzie się na DeFi Day w dalszej części dnia. Ale to, o czym chcę porozmawiać, to prywatność instytucjonalna na Ethereum.

Nazywam się Oskar i jestem liderem IPTF w Fundacji Ethereum. Skrót ten oznacza Institutional Privacy Task Force (Grupę Zadaniową ds. Prywatności Instytucjonalnej). Dlaczego prywatność instytucjonalna ma znaczenie? Z kilku powodów. Myślę, że jednym z głównych jest to, że jeśli spojrzymy na te ogromne instytucje finansowe, mówimy o bilionach dolarów w przepływach pieniężnych. Kiedyś to regulacje były dla nich największą przeszkodą w przejściu onchain. Ale to, co wydarzyło się w ciągu ostatnich kilku lat, sprawiło, że obecnie to prywatność jest dla nich największą barierą.

Jaka jest więc tutaj dźwignia i wpływ? Myślę, że nawet przeniesienie zaledwie 1% tradycyjnych środków finansowych na Ethereum miałoby ogromny wpływ na to, jak Ethereum może wpłynąć na prywatność. A sam onboarding pojedynczej instytucji dotyka również milionów użytkowników, prawda? To nie są hipotezy. Istnieją instytucje, które są już onchain, a w ciągu najbliższego roku będzie się tu działo wiele rzeczy. Nadszedł na to czas, jeśli chodzi o instytucje przechodzące onchain z wbudowaną prywatnością.

Pojedyncza duża instytucja może mieć tutaj ogromny wpływ na to, który ekosystem ostatecznie wygra — czy będzie to Ethereum, czy bardziej prywatne wersje. Dlaczego chcą Ethereum? Z kilku powodów. Rzeczy takie jak płynność, odporność na cenzurę, 10-letni czas bezawaryjnego działania (uptime) i to, że jest to atut, jeśli chodzi o rozrachunek. Istnieją również inne alternatywy, ale mają one inne ograniczenia. 

Aby Ethereum mogło przeprowadzić onboarding tych instytucji, musi zająć się tymi obawami dotyczącymi prywatności. To, co staramy się robić w Institutional Privacy Task Force, to onboarding instytucji na Ethereum i upewnienie się, że ich cele w zakresie prywatności są spełnione. Organizujemy warsztaty, starając się odczarować tę przestrzeń i upewnić się, że możemy zaspokoić potrzeby instytucjonalne, jeśli chodzi konkretnie o prywatność. Pierwszym artefaktem, jaki mamy, jest ta mapa prywatności instytucjonalnej — rozmawiamy z ogromnymi instytucjami, rozumiemy ich przypadki użycia biznesowego i wymagania, udostępniamy jak najwięcej w modelu open source, a następnie rozmawiamy z dostawcami w tej przestrzeni, aby połączyć instytucje z dostępnymi rozwiązaniami. 

#### Wprowadzenia do panelu i problemy instytucjonalne (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Przepraszam, że było to trochę szybkie, ale mam nadzieję, że zrozumiałe. W tym panelu bierze udział wielu ekspertów z dziedziny badań, polityki i inżynierii, a my porozmawiamy o prywatności instytucjonalnej. 

Tylko krótkie wprowadzenie: Mamy Eugenio, który jest Head of Growth w European Blockchain Association. Mamy Zacha Obronta, dyrektora generalnego Etherealize, gdzie buduje produkty instytucjonalne i podstawowe prymitywy prywatności. Mamy Amzaha, który spędził większość swojej kariery w zarządzaniu ryzykiem finansowym, zanim głęboko zaangażował się w Ethereum, a teraz łączy tradycyjne kontrole z natywnymi rynkami Ethereum. I wreszcie mamy François, starszego inżyniera protokołu w Polygon Miden, skupiającego się na systemach dowodów z wiedzą zerową.

Na początek, w jednym lub kilku zdaniach, nad jakimi problemami instytucjonalnymi pracujecie, które faktycznie wymagają prywatności w publicznej infrastrukturze, a nie tylko w tradycyjnej bazie danych lub łańcuchu prywatnym? Może zaczniemy od François.

**François:** Tak, oczywiście zawsze można budować na prywatnym blockchainie, ale dzisiaj wierzymy, że instytucje chcą mieć dostęp do globalnej płynności oferowanej przez Ethereum, zachowując jednocześnie to, co mają z tradycyjnego świata finansów, czyli stopień prywatności, który pozwala im handlować z globalną płynnością bez upubliczniania całości swoich transakcji. Dla nas właśnie dlatego ważne jest zarówno wbudowanie prywatności, jak i budowanie na Ethereum.

**Eugenio:** Cóż, może spojrzę na to z innej perspektywy — z perspektywy standardów. W procesie standaryzacji istnieje bardzo ważna dla instytucji koncepcja, którą jest kotwica zaufania (trust anchor). Zasadniczo każda instytucja ma duże środowisko pozałańcuchowe, w którym zakotwicza odpowiedzialność wobec społeczeństwa za wszystkich korzystających z jej usług. Jedną z części dużego problemu w tworzeniu usług opartych na blockchainie dla instytucji jest to, jak stworzyć wydajny system, aby przenieść przez most kotwicę zaufania do świata onchain, a następnie jak osadzić techniki kryptograficzne, aby upewnić się, że dane są przetwarzane w minimalny, ale możliwy do audytu i weryfikacji sposób.

**Zach Obront:** Super. W Etherealize skupiamy się na ulepszaniu niektórych głębokich mechanizmów wewnętrznych rynków finansowych, w szczególności rynków kredytowych. Podejdę więc do tego z dwóch stron. Pierwsza to *dlaczego prywatność?* Obecnie wszystkie te rynki opierają się na umowach dwustronnych. Są dwie strony. Są one bardzo przyzwyczajone do tego, że wyciekają tylko te informacje, które muszą wyciec, i nic poza tym. Jedynym sposobem, w jaki rozważyliby publiczne blockchainy, jest spełnienie tego poziomu prywatności. 

Z drugiej strony, *dlaczego być na publicznym blockchainie?* Są to złożone rynki ze stronami, które niekoniecznie sobie ufają i muszą polegać na regulacjach w różnych krajach. Posiadanie źródła prawdy w centrum tych rynków jest ogromną zaletą, której nie można osiągnąć bez publicznego blockchaina. W tej chwili są w pewnym sensie w martwym punkcie, mówiąc: „Istnieje potencjał do ulepszeń, ale nie możemy tego zrobić bez prywatności, której potrzebujemy”. Staramy się połączyć te rzeczy.

**Amzah:** Tak. Pracuję dla ABN Amro, dużego holenderskiego banku. Mamy 5 milionów klientów detalicznych. Obecnie nie budujemy niczego konkretnie w zakresie prywatności, ale to, co się teraz pojawia, to na przykład portfel tożsamości cyfrowej. Zazwyczaj działa to tak, że dane są przechowywane w scentralizowanej bazie danych, a następnie łączysz się z zewnętrznym dostawcą lub stroną trzecią, ale to oczywiście nie jest do końca bezpieczne. Zaczynamy więc już myśleć o tym, jak możemy wykorzystać na przykład dowody z wiedzą zerową (ZK-proofs), abyśmy mogli mieć selektywne ujawnianie informacji podmiotom zewnętrznym. W ten sposób możemy chronić informacje o naszych klientach, a także pozwolić im połączyć się z szerszym środowiskiem Web3.

#### Konkretne przepływy pracy i przechowywanie (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Okej, świetnie. Jeśli wybierzesz jeden konkretny przepływ, na którym może ci zależeć — na przykład emisja obligacji, transakcja handlowa lub płatność ze skarbca — kto może zobaczyć co dokładnie na jakim etapie i co jest przechowywane onchain w porównaniu do środowiska pozałańcuchowego? Może zaczniemy od François.

**François:** Świetnym sposobem na podejście do tego jest spojrzenie z punktu widzenia chęci handlu z DEX na Uniswap. Fajne jest to, że możemy zaoferować na Miden coś, co zapewnia pełną anonimowość. Mamy anonimowe konta, które handlują ze sobą za pomocą not (notes). Jest to mieszanka modelu konta i modelu UTXO. 

Jeśli handlujesz z platformą (venue), ta platforma będzie chciała być publiczna. Jako DEX chcesz ponownie publikować ceny za każdym razem, gdy wejdziesz z kimś w interakcję. Emitujesz więc noty do partii (batch). Jako użytkownik nie masz nic onchain, z wyjątkiem tego, co platforma może być w stanie odszyfrować. Platforma realizuje twoją transakcję i emituje noty na wyjściu. Te noty mogą być następnie odebrane przez konta, które mogą być w pełni prywatne. Zachowujesz więc pełną anonimowość, jeśli chodzi o użytkowników — z wyjątkiem platformy, która zdecydowała się ujawnić pewne informacje publicznie. Oprócz tego budujemy przepływy zgodności, które obejmują przepływy pracy związane z audytowalnością i polityki kluczy podglądu (view-key), które pozwalają na inżynierię rynku na poziomie lokalnym.

**Eugenio:** Cóż, może spojrzę na to bardziej z perspektywy funkcjonalnej. Ogólnie rzecz biorąc, każdy przepływ emisji lub dystrybucji usług instytucjonalnych ma trzy kluczowe filary. Pierwszym z nich jest tożsamość i zaufanie, co wiąże się z procesem onboardingu dla inwestorów, procesami KYC/KYB i tak dalej.

Drugim jest egzekwowanie polityki. Konto zbiera wszystkie informacje z tego pozałańcuchowego środowiska i generuje wyzwalacz do zestawienia egzekucji na blockchainie. W tym kontekście techniki chroniące prywatność mogą zapewnić wydajną dystrybucję. Na przykład oferta, która może być dystrybuowana tylko do określonych typów inwestorów powiązanych z określonymi typami kont.

Trzecim filarem jest raportowanie. Jest to związane z onboardingiem i operacjami handlowymi onchain. Spoiwem wszystkich tych usług jest to, w jaki sposób wyodrębniamy z atestacji danych onchain te punkty danych, których faktycznie potrzebujemy w środowisku pozałańcuchowym, aby na koniec zapewnić tradycyjne raportowanie dla naszych klientów.

**Zach Obront:** Odpowiedź na to pytanie jest bardzo różna w zależności od tego, o jakim przepływie mówimy, prawda? To jedno z wyzwań w tej przestrzeni — trudno o ogólne zasady. Jednym z przykładów przepływu jest duża pożyczka, w której dokonywana jest płatność odsetek, a mnóstwo pożyczkodawców zostaje rozdzielonych. Oczekuje się, że nikt nie powinien o tym wiedzieć. Nie ma wokół tego żadnych regulacji. Może to być całkowicie prywatne i chcemy być w stanie wspierać ten koniec spektrum. 

Z drugiej strony, być może dochodzi do wymiany pozycji między pożyczkodawcami i oczekuje się, że pewne strony administracyjne będą mogły zobaczyć, że transakcja miała miejsce, ale nie jej cenę. Być może inni mogą zobaczyć wszystkie szczegóły. Zbudowaliśmy wszystko wokół tego elastycznego modelu, w którym nie chcemy na stałe kodować zasad zgodności. Chcemy powiedzieć, że użytkownik lub aplikacja mogą to określić samodzielnie. Mamy możliwość egzekwowania zasad dotyczących tego, że organy regulacyjne lub administracyjne mogą widzieć pewne rzeczy, a nawet dostarczać zagregowane dane stowarzyszeniom.

**Amzah:** Tak. W większości zgadzam się z tym, co powiedział Zach. W przeszłości, kiedy instytucje myślały o prywatności, po prostu uruchamiały łańcuch prywatny, w którym uczestniczyło może 20 banków i tylko one mogły zobaczyć, co w nim jest. Ale w rzeczywistości jest to znacznie bardziej zniuansowane. Zależy to od przypadku użycia, rodzaju przepływów i tego, co musi wiedzieć regulator. Możesz umieścić informacje o saldzie onchain w bardziej zagregowanej formie, używając na przykład dowodu rezerw (proof of reserves).

#### Wymagania niepodlegające negocjacjom (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio i Amzah, z perspektywy banków, platform i organów regulacyjnych, jakie są wymagania niepodlegające negocjacjom, o których słyszycie w kółko? Na przykład ścieżki audytu, zasady KYC czy wymogi dotyczące raportowania?

**Eugenio:** Powiedziałbym, że odpowiedzialność, jeśli chodzi o proces onboardingu, oraz zgodność związana z raportowaniem. Dla mnie chodzi o ujęcie konkretnych wymagań biznesowych w struktury techniczne. Diabeł tkwi w szczegółach — to, czy twoim użytkownikiem jest aplikacja, czy inwestor, tworzy inny przepływ procesu dla twojego ekosystemu. Celem powinno być wydajne zbudowanie tego systemu, w przeciwnym razie zostaniemy zablokowani przed adopcją. Właśnie dlatego infrastruktura kont na Ethereum ewoluuje w bardzo fajny sposób.

**Amzah:** Tak, nie mam nic do dodania. 

**François:** Nasz współzałożyciel spędza tygodnie z klientami w przestrzeni instytucjonalnej, a najważniejszym żądaniem, które się pojawia, jest „kontrola”. Kto widzi co, kiedy i z jakiego powodu. A potem te rozmowy schodzą na szczegóły i stają się niesamowicie spersonalizowane. Dla nas to świetnie, ponieważ tradycyjny świat finansów spędził dziesięciolecia na budowaniu swoich praktyk księgowych i przepływów AML/CTF. Są bardzo konkretni, jeśli chodzi o tę kontrolę. Budujemy więc te możliwości w warstwie protokołu i wspieramy klientów w ich podróży.

#### Kompromisy i globalna płynność (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** Z jakimi głównymi kompromisami obecnie się zmagacie? Wydajność kontra prywatność, globalna płynność kontra ścisłe kontrole, czy przejrzystość onchain kontra rejestry pozałańcuchowe? Zaczynając od Zacha.

**Zach Obront:** Na szczęście działamy na rynku, na którym szybkość nie jest największym priorytetem. Wiele rynków kredytowych dokonuje rozrachunku w ciągu tygodni, więc sekundy nie są dla nich najważniejsze. Ale UX prywatności jest bardzo trudny. Blockchainy są bardzo dobre w utrzymywaniu tej koncepcji zakolejkowanego stanu, radzeniu sobie ze zmianami i upewnianiu się, że transakcje są uporządkowane prawidłowo. Kiedy zaczynamy kolejkować prywatne transakcje, sprawy się komplikują. Musimy wymyślić najlepsze doświadczenie użytkownika, które współgra z prywatnością, zwłaszcza że ludzie oczekują, że systemy będą zarówno prywatne, jak i łatwe w użyciu.

**François:** Chciałem podkreślić kompromisy, których *nie* mamy, dzięki Ethereum. Instytucje tak naprawdę chcą wchodzić na rynki tylko wtedy, gdy jest to warte ich czasu, co oznacza, że chcą globalnego rynku z efektami sieciowymi, głęboką płynnością i wieloma kontrahentami. Bycie rollupem na Ethereum, a nie łańcuchem prywatnym czy kolejną warstwą 1 (L1), daje nam dostęp do tego głębokiego rynku.

Oczywiście, istnieją pewne zawiłości. Bardzo zależy nam na tym doświadczeniu najwyższej jakości (white-glove) dla instytucji wchodzącej na ten rynek, aby mogła mieć własne warunki. Jednym z wyzwań jest równowaga między prywatnością a odpornością na zagrożenia. W świecie Web3 istnieją podmioty stanowiące zagrożenie, a my chcemy lepiej sobie z tym radzić, aby zaoferować fantastyczne doświadczenie. Do decentralizacji podchodzimy ostrożnie — wiemy, jak to zrobić, ale zrobimy to w momencie, w którym najlepiej posłuży to klientom.

#### Zaufanie do systemu i czynniki napędzające adopcję (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, jak sprawić, by te rozwiązania były godne zaufania i użyteczne dla instytucji i rządów?

**Eugenio:** Wszystko zaczyna się od próby potraktowania usług instytucjonalnych jako zintegrowanych systemów, w których każda część systemu ma własną, specyficzną regułę dostępu. Od tworzenia danych po kompresję danych w warstwie 2 (L2) i decentralizację danych w warstwie 1 (L1). Jeśli połączymy ten system, w którym środowisko pozałańcuchowe utrzymuje założenie zaufania instytucji, możemy przydzielić różne procesy do warstwy 2 (L2) i warstwy 1 (L1).

**Oskar Thorin:** Amzah, jak ty patrzysz na to, by systemy były godne zaufania i użyteczne?

**Amzah:** Dla nas bardzo ważne jest to, aby można było to dostosować. Blockchain to już nie tylko jeden przypadek użycia, w którym wszystko jest w pełni publiczne lub w pełni prywatne. To nie jest rozwiązanie uniwersalne. To, co jest dla nas również najważniejsze, to zgodność z przepisami. Sektor bankowy w Europie jest silnie regulowany i jeśli coś nie jest w porządku pod względem prywatności, to po prostu nie przejdzie u regulatorów.

#### Spojrzenie w przyszłość na rok 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** W porządku, zbliżamy się do końca. Jaki jest jeden element budulcowy — techniczny, operacyjny lub polityczny — który waszym zdaniem znacząco przyspieszyłby adopcję instytucjonalną? I jeśli spotkamy się ponownie w 2026 roku, co waszym zdaniem jest realistyczne, że wydarzy się w tym roku?

**Zach Obront:** Myślę, że „instytucjonalny” i „prywatność” to obecnie bardzo szerokie pojęcia, które przecinają się w różny sposób w zależności od przypadku użycia. Niektórym zależy na podłączeniu się do płynnych rynków, podczas gdy inni chcą po prostu lepszej infrastruktury wewnętrznej. Posunęłoby nas to naprzód, gdybyśmy uzyskali jasność co do konkretnych sytuacji, które próbujemy rozwiązać. Nie było głębokiej kategoryzacji wymogów zgodności. Dążenie do zmapowania tych wymagań i przekształcenia ich w protokół, który je obsługuje, podniosłoby nasze możliwości budowania, zamiast polegać na pofragmentowanym świecie rządzonym przez prawników.

**Amzah:** Technologia przeszła długą drogę dzięki dowodom z wiedzą zerową i w pełni homomorficznemu szyfrowaniu. Myślę, że jedną z najważniejszych rzeczy do poprawy jest edukacja organów regulacyjnych i instytucji. Być może słyszeli o dowodach z wiedzą zerową, ale tak naprawdę nie wiedzą, jak one działają. Większość regulatorów nadal myśli z prawnego punktu widzenia — jeśli coś się zepsuje, do kogo możemy zadzwonić? A jeśli nie ma do kogo zadzwonić, jest to dla nich trudne do zaakceptowania.

**Eugenio:** Od strony technologicznej, dowodzenie ZK w czasie rzeczywistym i agregacja naprawdę pozwolą nam budować złożone przypadki użycia łączące aplikacje, klientów instytucjonalnych i warstwę 1 (L1). Popieram również to, co Amzah powiedział o edukacji. W 2026 roku chciałbym zobaczyć więcej współpracy między projektami, aby aplikacje mogły naprawdę zacząć mieć dostęp do globalnej płynności i globalnych sieci.

**François:** Jeśli spotkamy się za rok, chciałbym, abyśmy wiosną uruchomili Sieć główną Miden, żebyśmy mogli to świętować. Poza tym chciałbym, abyśmy byli na drodze do pełnej decentralizacji. Będzie to wymagało wysiłku wielu osób. Główną rzeczą, którą chciałbym zobaczyć, jest większe zaangażowanie. Pomysł, że prywatność kłóci się ze zgodnością, nie jest do końca prawdziwy, ale połączenie tych dwóch rzeczy wymaga pracy. Chcemy, aby instytucje pomogły kształtować rynki, które chcą zobaczyć, ponieważ wiemy, że będzie to skomplikowane i specyficzne dla ich potrzeb.

#### Przemyślenia końcowe (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Chcę tylko dać każdemu z was 10 do 20 sekund na wspomnienie o czymś, co wydarzyło się w tym tygodniu, lub na szybką reklamę, zanim skończymy.

**Amzah:** Trzy lata temu byłem wolontariuszem pomagającym na jednym z pierwszych Devconnectów. Widząc, jak ludzie patrzą teraz na instytucje w porównaniu z tamtym czasem, to ogromna poprawa.

**Zach Obront:** To po prostu niesamowite, jak bardzo prywatność wisi w powietrzu w tym roku. Moje doświadczenie to bezpieczeństwo i brakuje badaczy bezpieczeństwa, którzy to rozumieją. Każdego, kto znajduje się na tym skrzyżowaniu, zachęcam do pójścia na całość.

**Eugenio:** Wybiorę organizację regulacyjną ds. danych — myślę, że jest duża nadzieja dla ZKP w domenie zgodnych danych, a warstwa interoperacyjności Ethereum pomoże przenieść instytucje onchain.

**François:** To bardzo trudne jako inżynier; zazwyczaj słyszy się o niszowym temacie. Niedawno wprowadziliśmy prekompilacje na Miden, co otwiera weryfikację przepływów obejmujących uczenie maszynowe. Jeśli jesteś ekstremalnym nerdem, tak jak ja, naprawdę chcesz zajmować się uczeniem maszynowym i dowodami uczenia maszynowego, a to jest teraz coś, co możemy robić.

**Oskar Thorin:** Chciałbym podziękować wszystkim panelistom. Usłyszeliśmy kilka bardzo interesujących perspektyw z zakresu technologii, polityki i inżynierii. Zaledwie zarysowaliśmy temat, ale polecam porozmawiać więcej, jeśli jesteście nim zainteresowani. Dziękuję.