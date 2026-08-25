---
title: "Atomy, instytucje, blockchainy"
description: "Josh Stark proponuje nowe ramy do zrozumienia, czym są blockchainy, wprowadzając koncepcję „twardości” (hardness) jako wspólnej właściwości łączącej atomy, instytucje i blockchainy jako materiały budulcowe cywilizacji."
lang: pl
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "how-ethereum-works"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atomy, instytucje, blockchainy"
---

Filozoficzne wystąpienie **Josha Starka** z Fundacji Ethereum na Pragma Denver 2024, proponujące nowe ramy do zrozumienia blockchainów. Prelekcja wprowadza koncepcję „twardości” (hardness) jako wspólnej właściwości łączącej atomy, instytucje i blockchainy jako materiały budulcowe cywilizacji.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=zI07mqNdxzA) opublikowanego przez ETHGlobal. Został on lekko zredagowany w celu poprawy czytelności.*

#### Dlaczego nie potrafimy wyjaśnić blockchainów? (0:00) {#why-cant-we-explain-blockchains-000}

Cześć wszystkim, dziękuję, że jesteście tu na Pragma w Denver. Mam na imię Josh. Pracuję w Fundacji Ethereum — jestem w EF od około pięciu lat. Lubię żartować, że moją pracą jest wymyślanie, czym powinna być moja praca, a to zmienia się co sześć miesięcy.

W mojej karierze w krypto robiłem wiele różnych rzeczy. Pracowałem nad wczesnym portfelem Bitcoin. Zbudowałem — a właściwie kupiłem — bankomat Bitcoin w Toronto i prowadziłem go przez około rok w 2015 roku. W 2017 roku współtworzyłem ETHGlobal, a także firmę o nazwie L4 pracującą nad wczesnymi rozwiązaniami skalowania warstwy 2 (L2). Przez lata napisałem też mnóstwo postów na blogu.

Mimo tego wszystkiego, nadal nie potrafiłem tak naprawdę wyjaśnić, co robimy ani dlaczego. Miałem poczucie, że to jest bardzo ważne, że to zmieni świat. Nie zrozumcie mnie źle — potrafię rozmawiać o poszczególnych aplikacjach. Możemy wyjaśnić Bitcoina, NFT, Uniswap, ENS. Wszystkie te rzeczy w ich małych silosach nie są aż tak trudne do wytłumaczenia. Ale kiedy próbujemy spojrzeć na szerszy obraz — co to znaczy, że istnieje jedna technologia, która umożliwia to wszystko — zaczynamy się potykać. Uprawiamy mentalną gimnastykę, rzucamy w ludzi modnymi hasłami, próbując im to wyjaśnić.

Naprawdę musimy dotrzeć do sedna, a nie sądzę, byśmy byli tego blisko. To problem! Jeśli potrafimy rozmawiać o tych poszczególnych aplikacjach, ale nie potrafimy wyartykułować, co je łączy — to znaczy, że coś nam umyka. Istnieje poziom wyjaśnienia, który nie został jeszcze odkryty, a uważam, że jest on ważny. Mam przeczucie, że kiedy go znajdziemy, wyda się on oczywisty.

Zaczęło się to więc od bardzo konkretnego pytania, które sobie zadałem: czym jest ta technologia ogólnego przeznaczenia? Czym jest ta fundamentalna zdolność? A przerodziło się to w coś, co uważam za znacznie ciekawsze.

#### Claude Shannon i idea informacji (4:00) {#claude-shannon-and-the-idea-of-information-400}

Pozwólcie, że opowiem wam historię. W latach 30. i 40. XX wieku Claude Shannon był otoczony początkami nowej ery. W Bell Labs pracował podczas wojny nad systemami kierowania ogniem i kryptografią, i zaczął myśleć o bardziej ogólnym podejściu do informacji. Na początku nie nazywał tego informacją — w 1939 roku napisał do kolegi, że myśli o „transmisji inteligencji”. Słowo informacja miało wtedy inne znaczenie.

W 1948 roku opublikował „Matematyczną teorię komunikacji” (The Mathematical Theory of Communications) — fundamentalną pracę, która utorowała drogę erze informacji. Co dla nas najważniejsze, po raz pierwszy wprowadzono w niej abstrakcyjną ideę informacji — definicję niezwiązaną z muzyką, mową, literaturą czy kodami. To właśnie ta praca wprowadziła bit — nieredukowalną jednostkę informacji, którą można zmierzyć w każdym kontekście.

Przed tym momentem nikt tak naprawdę nie miał koncepcji informacji jako uniwersalnej, ogólnej rzeczy. Może się to teraz wydawać szalone — używamy technologii informacyjnych od tysięcy lat. Jest to nierozerwalnie związane z tym, co to znaczy być człowiekiem, używać mowy i języka. Ale aż do niedawna nie nazwaliśmy podstawowej właściwości wspólnej dla tych wszystkich rzeczy.

Chcę, żebyście wyciągnęli z tego następujący wniosek: był czas, zanim mieliśmy ideę informacji, i czas po nim. Co jeśli nam również brakuje czegoś równie fundamentalnego? Taka jest moja hipoteza.

#### Trzy wskazówki (7:00) {#three-clues-700}

Zmagając się z wyjaśnieniem blockchainów, wciąż natrafiam na te dziwne rzeczy, które moim zdaniem są wskazówkami prowadzącymi do czegoś większego.

**Wskazówka numer jeden** — opisujemy blockchainy zarówno jako niewymagające zaufania, jak i godne zaufania. To dziwne. W białej księdze Satoshiego mówimy o wyeliminowaniu potrzeby zaufania. Ale w białej księdze Ethereum mówimy o wykorzystaniu Ethereum do uczynienia aplikacji bardziej godnymi zaufania. The Economist nazwał blockchainy „maszyną zaufania”. Mamy na myśli coś prawdziwego, kiedy mówimy, że blockchainy są niewymagające zaufania, i mamy na myśli coś prawdziwego, kiedy mówimy, że są godne zaufania. Nasz język za tym nie nadąża. Na te pozorne sprzeczności zawsze warto zwracać uwagę — czasami ujawniają one lukę w naszych abstrakcjach.

**Wskazówka numer dwa** — dużo mówimy o tym, jak blockchainy różnią się od scentralizowanych instytucji — Bitcoin kontra banki centralne, ENS kontra DNS. Ale rzadko mówimy o tym, co mają ze sobą wspólnego. Mogą być dla siebie substytutami. Jeśli kiedykolwiek wymieniłeś pieniądze fiducjarne na Bitcoina, zastąpiłeś jedno drugim. Muszą mieć coś wspólnego, skoro to zastępowanie ma miejsce tak regularnie.

W przypadku samochodów mówiliśmy o „powozach bez koni”, ale przynajmniej potrafiliśmy nazwać, czym one były — pojazdami. W przypadku zapisów cyfrowych mówiliśmy o nośnikach „bezpapierowych”, ale znaliśmy kategorię — informacja. Wygląda na to, że wynaleźliśmy technologię, zanim wymyśliliśmy kategorię, do której ona należy.

**Wskazówka numer trzy** — praca Satoshiego zaczyna się od tych słów: „handel w internecie zaczął opierać się niemal wyłącznie na instytucjach finansowych pełniących rolę zaufanych stron trzecich”. Satoshi porównywał Bitcoina do instytucji, a nie do innego oprogramowania. Coś w tym jest.

#### Wprowadzenie twardości (11:00) {#introducing-hardness-1100}

Oto moja odpowiedź na to, co znajduje się w tym pudełku. Nazywam to **twardością** (hardness). Oto historia w pięciu prostych krokach, a potem wejdziemy w szczegóły.

Po pierwsze — nasza cywilizacja zależy od infrastruktury społecznej, takiej jak pieniądze, prawo i wiele innych rzeczy, a one muszą być niezawodne. Muszą zachowywać się tak, jak tego od nich oczekujemy, przynajmniej przez większość czasu, aby były dla nas użyteczne. W przeciwnym razie nie polegalibyśmy na nich — nie stałyby się pieniądzem.

Po drugie — bardzo trudno jest osiągnąć ten niezbędny poziom niezawodności. Jak dotąd istnieją tak naprawdę tylko trzy sposoby, w jakie kiedykolwiek to zrobiliśmy: używając atomów, używając instytucji, a teraz używając blockchainów.

Po trzecie — istnieje nierozpoznana właściwość wspólna dla wszystkich trzech, którą nazywam twardością. Twardość to zdolność, moc, która pozwala nam uczynić przyszłość bardziej przewidywalną w bardzo konkretny sposób, jakiego wymagamy do złożonych gier koordynacyjnych.

Po czwarte — każde z tych trzech źródeł twardości ma inne właściwości, które czynią je użytecznymi w różnych kontekstach.

I po piąte — możemy używać ich razem i zastępować je nawzajem.

Stopa inflacji złota jest niezawodna ze względu na fizyczne właściwości naszej planety — jest twarda jak atom. Kontrakt jest niezawodny, ponieważ instytucje przyjdą i zabiorą twoje rzeczy, jeśli nie wywiążesz się ze swoich zobowiązań. Inteligentny kontrakt zadziała, ponieważ jest zabezpieczony przez protokół kryptoekonomiczny, w którym stawką są miliardy dolarów.

Możesz myśleć o atomach, instytucjach i blockchainach jak o materiałach budowlanych — jak o drewnie, betonie i stali. Są różne, ale należą do wspólnej kategorii. I używamy tych rzeczy nie do budowania budynków, ale do budowania cywilizacji. Być może dzięki lepszym materiałom będziemy w stanie zbudować większą, lepszą i silniejszą cywilizację niż ta, którą mamy obecnie.

#### Czym jest twardość? (14:00) {#what-is-hardness-1400}

Pozwólcie, że sprecyzuję, co mam na myśli mówiąc o twardości. To nie jest po prostu jakakolwiek niezawodność, którą może mieć cokolwiek. Twardość to jej szczególny rodzaj. Pierwszą rzeczą, na którą należy zwrócić uwagę, jest to, że jest to rodzaj niezawodności, który ma znaczenie dla koordynacji społecznej. Nie tylko to, że ten stół jest niezawodnie stołem — ale to, że możesz zapłacić czynsz, że kontrakt zostanie wyegzekwowany, że gospodarka jest silna. Do tego właśnie służy twardość.

A jaki dokładnie jest tego rezultat? Niestety wprowadzam tu kolejne nowe słowo, które nazywam **odlewem** (cast). Odlew to każdy możliwy przyszły stan świata, który staje się pewny lub bezpieczny dzięki użyciu twardości. Przepraszam za żargon, ale powodem, dla którego potrzebujemy tu nowego słowa, jest to, że nie sądzę, byśmy mieli takie, które można uogólnić na wszystkie źródła twardości. To może być jak bit — potrzebujemy koncepcji, o której możemy rozmawiać w wielu różnych kontekstach i przełączać się między źródłami bez bycia przywiązanym do jednego z nich.

Odlew związany z pożyczką brzmiałby: jeśli Alice nie spłaci Boba, instytucje prawne użyją coraz surowszych gróźb i działań, aby ją do tego zmusić. Ten odlew jest utwardzony za pomocą twardości instytucjonalnej. Odlew dotyczący złota mógłby polegać na tym, że określona ilość złota wejdzie na rynek każdego roku przez następne 20 lat — co staje się niezawodne dzięki fizycznym właściwościom naszej Ziemi. A odlew dotyczący Ethereum może być twierdzeniem, że aktywa mogą zostać przeniesione tylko wtedy, gdy posiadasz klucz prywatny odpowiadający określonemu kluczowi publicznemu — utwardzony przez twardość blockchaina.

W praktyce zazwyczaj wchodzimy w interakcje z pakietami tych rzeczy, które są ze sobą splecione. Jeśli posiadasz złoto i trzymasz je w banku, wiele rzeczy ma dla ciebie znaczenie: odlewy dotyczące podaży złota w przyszłości, odlewy dotyczące wytrzymałości bankowego skarbca, odlewy dotyczące siły umowy prawnej między tobą a twoim bankiem, odlewy dotyczące niezawodności systemu prawnego w twoim kraju, który wyegzekwowałby te zasady, gdyby coś poszło nie tak.

Po drugie, o twardości można mówić jako o mierze bezpieczeństwa. W teorii jest ona zawsze mierzalna, nawet jeśli w praktyce jest to trudne. Jak twardy jest ten odlew, że określona ilość złota wejdzie na rynek każdego roku przez następne 20 lat? Jednym ze sposobów spojrzenia na to jest prawdopodobieństwo — przeanalizowanie wszystkich danych i próba przewidzenia szans. Można też spojrzeć na to z perspektywy kosztów: ile kosztowałoby kogoś złamanie tego odlewu? Jeśli jesteś państwem narodowym, możesz użyć siły wojny i międzynarodowych regulacji. Albo możesz pójść w drugą stronę i sprowadzić z kosmosu asteroidę z dużą ilością złota, omijając fizyczne ograniczenia Ziemi. Złamanie prawie każdego odlewu ma swoją cenę.

I wreszcie, twardość pochodzi z określonych źródeł — atomów, instytucji i blockchainów. Każde z nich ma inne właściwości, które czynią je użytecznymi w różnych kontekstach.

W tych ramach podoba mi się to, że pozwalają nam zadawać głębsze pytania — nie tylko rozmawiać o konkretnych właściwościach blockchainów, ale porównywać wszystkie te różne rzeczy i zastanawiać się, gdzie są one odpowiednie, jak ich używamy i w jakiej kombinacji.

#### Twardość atomów (19:00) {#atom-hardness-1900}

Twardość atomów dotyczy sytuacji, w których znajdujemy niezawodność w otaczającej nas naturze — dosłownych fizycznych atomach, ale także innych naturalnie występujących właściwościach. Robimy to, gdy używamy złotych koralików jako pieniędzy, gdy używamy fizycznych struktur do definiowania praw własności lub zapisujemy prawa własności na fizycznym obiekcie, takim jak akt notarialny.

Ma to wiele zalet: automatyczne egzekwowanie, współdzielony stan, uniwersalny zestaw reguł. Dla ludzkiej cywilizacji jest bardzo wygodne, że prawa fizyki obowiązują wszędzie jednakowo, przynajmniej w skali makroskopowej, która ma dla nas największe znaczenie.

Ma to jednak swoje słabe strony. Jesteśmy ograniczeni do tego, co możemy znaleźć na świecie. Twardość atomów przypomina trochę architekta, który chce wbudować ścianę skalną w swój dom — musisz znaleźć taką, która się nada. Nie możesz po prostu stworzyć ściany skalnej. Możesz ją trochę zmienić, ale polegasz na znalezieniu naturalnie występującego elementu, który pasuje do twoich konkretnych potrzeb.

Nie możemy nadać jej nowych zasad. Mamy złoto, ale nie możemy poprosić wszechświata, aby dał nam nowy rodzaj złota z niższą inflacją, bardziej sprawiedliwym podziałem geograficznym, albo może naprawił problem z wagą. Nie możemy tego zrobić. Ma też bardzo ograniczoną programowalność — z twardości atomów można stworzyć tylko określone rodzaje utwardzonych rzeczy, głównie pieniądze. Z atomów nie da się stworzyć umowy małżeńskiej. Do tego potrzebne jest coś bardziej złożonego, jak instytucja.

A odlewy są często podważane przez naszą rosnącą ludzką kontrolę nad naturą. Używanie muszelek jako pieniędzy jest w porządku, dopóki nie staniesz się częścią globalnej gospodarki, która może radykalnie zburzyć twoje oczekiwania dotyczące inflacji muszelek, i nagle twoja gospodarka zostaje zniszczona. Używanie złota jako środka wymiany może pewnego dnia napotkać ten sam problem, jeśli i kiedy będziemy w stanie pozyskać złoto z asteroid i zmienić nasze założenia dotyczące podaży.

Ale to jest bardziej subtelne. Czasami mamy odlewy, z których istnienia nawet nie zdajemy sobie sprawy, ale potem znikają, ponieważ coś się zmieniło. Przez długi czas istniał twardy odlew dotyczący szybkości handlu na rynkach finansowych — można to było robić tylko w określonym tempie, być może w tempie, w jakim ludzie mogą do siebie krzyczeć na parkiecie. Ten odlew był twardy jak atom — po prostu nie mogliśmy komunikować się szybciej. Ale nowa technologia całkowicie podważyła te założenia. Zdaliśmy sobie sprawę, że tak naprawdę podobała nam się wersja tego starego odlewu i odtworzyliśmy go z instytucji — wprowadzając regulacje, które ograniczają prędkość handlu i wymuszają mechanizmy wstrzymujące obrót (circuit breakers).

#### Twardość instytucjonalna (22:00) {#institutional-hardness-2200}

Twardość instytucjonalna to bardzo szeroka kategoria — obejmuje większość rzeczy, o których możemy pomyśleć, gdy myślimy o cywilizacji. Nasze systemy prawne, organy ustawodawcze, siły policyjne, korporacje, wszystko. Wszystkie instytucje, które zapewniają jakiegoś rodzaju twardość. Stworzyliśmy odlewy, które zaprowadziły porządek w naszych społeczeństwach, karząc zachowania aspołeczne. Stworzyliśmy twardość jako platformę, pozwalając każdemu tworzyć własne odlewy utwardzane przez instytucje, o ile przestrzega się określonych zasad. Stworzyliśmy odlewy, które zrodziły nowe aktywa i zapewniły źródła kredytu dla rozwijających się gospodarek.

Twardość instytucjonalna ma wiele zalet. Jest bardzo programowalna — ludzie zgrupowani w organizacjach mogą przyjmować naprawdę złożone lub subtelne instrukcje. To bardzo duża przestrzeń projektowa możliwych odlewów. I są one tworzone przez ludzi, a ludzie są dobrzy. Może to dobrze, że czasami ktoś może wkroczyć i powiedzieć: „Nie zamierzam tego egzekwować, ponieważ uważam, że to złe”. To dobrze, że może czasami w systemie jest wyłom, by ktoś mógł zostać sygnalistą lub buntownikiem.

Ma jednak również wiele słabych stron. Jest ograniczona granicami — tylko w niektórych krajach masz tak naprawdę dostęp do instytucji, które egzekwują praworządność. Jest narażona na porażki polityczne lub państwowe — jeśli twój rząd po prostu nie może dojść do porozumienia w pewnych kwestiach lub zostaniesz najechany przez wojowniczy naród, niektóre instytucje, na których polegasz w kwestii pieniędzy lub kontraktów, mogą po prostu się rozpaść. Często są nieprzejrzyste — trudno powiedzieć, czy instytucja jest naprawdę twarda, czy nie, dopóki coś nie pójdzie nie tak. Mają wysoki koszt początkowy — nie możemy po prostu łatwo tworzyć nowych instytucji na skalę Fed czy systemu prawnego, aby na nich iterować. Jesteśmy niejako skazani na te, które mamy.

I są tworzone przez ludzi, a ludzie są źli. Rzeczywistość w tym kraju i wielu innych jest taka, że wiele osób tak naprawdę nie miało dostępu do twardości zapewnianej przez instytucje. Nie byli w stanie uzyskać kredytu hipotecznego. Nie byli w stanie otworzyć konta bankowego. Ponieważ kiedy obsadzasz instytucję ludźmi, jest ona podatna na ich zło, uprzedzenia, ideologie. A nasze poleganie na twardości instytucjonalnej tylko rośnie. Problem z oprogramowaniem pożerającym świat polega na tym, że większość oprogramowania jest tak naprawdę tworzona przez instytucję ukrytą za ekranem, a w rezultacie dajemy im coraz więcej władzy.

#### Twardość blockchaina (24:20) {#blockchain-hardness-2420}

Wynalazek Satoshiego był oczywiście czymś więcej niż tylko Bitcoinem — był zalążkiem techniki ogólnego przeznaczenia do tworzenia cyfrowej twardości w środowisku cyfrowym. Ma wiele mocnych stron: uniwersalny globalny dostęp, jest stworzony z oprogramowania, a każdy może pisać oprogramowanie, stopień twardości może być przejrzysty i weryfikowalny, niski koszt początkowy, łatwość iteracji i zabezpieczenie przez zachęty rynkowe — a rynki są racjonalne.

Ma jednak również słabe strony. Wymaga cywilizacji technologicznej — nie moglibyśmy mieć blockchainów wcześniej ze względu na wymagania, a cywilizacja w przyszłości, która nie będzie miała tego, co my, również nie będzie w stanie z nich korzystać. Jest stworzony z oprogramowania, a oprogramowanie może być źle napisane. Zakres odlewów jest ograniczony do środowisk onchain. I jest zabezpieczony przez zachęty rynkowe — a rynki są irracjonalne.

#### Dlaczego to ma znaczenie (25:10) {#why-this-matters-2510}

Co to zatem oznacza? Co nam to daje? Dlaczego jest to coś więcej niż tylko akademickie zainteresowanie?

Wiele rzeczy zaczyna mieć znacznie więcej sensu, gdy spojrzy się na nie przez ten pryzmat. Jedną z nich jest pytanie, od którego zaczęliśmy: dlaczego mówimy, że blockchainy są zarówno niewymagające zaufania, jak i godne zaufania? Wyjaśnienie jest następujące — kiedy mówimy, że blockchainy są niewymagające zaufania, tak naprawdę mamy na myśli to, że ich twardość nie zależy od osoby ani instytucji. A kiedy mówimy, że są godne zaufania, mamy po prostu na myśli to, że posiadają twardość — tylko innego rodzaju. Nasza niezdolność do dokonania tego rozróżnienia jest tym, co powoduje ten zagmatwany język.

Wyjaśnia to, dlaczego prywatne lub scentralizowane blockchainy nie są interesujące. Blockchain, który nie jest zdecentralizowany, po prostu zapada się z powrotem do bycia instytucją. Jeśli jest kontrolowany przez trzy banki lub garstkę walidatorów finansowanych przez tę samą organizację, to jest to po prostu EVM zabezpieczona twardością instytucjonalną. Najciekawszą rzeczą w blockchainach nie jest EVM — jest to, że istnieje inne źródło twardości, które nie jest skorelowane ani nie podlega tym samym awariom i ograniczeniom co instytucje. Dlatego jest to inne. Dlatego ma to znaczenie.

Pomaga to również zrozumieć spektrum możliwości i domyślne ideologie, w które wpadają ludzie w przestrzeni blockchain. Wiele osób jest bardzo skupionych na wykorzystaniu twardości blockchaina do konkurowania z twardością instytucjonalną lub jej zastąpienia — o to właśnie chodzi w dużej części społeczności Bitcoina, o to chodzi w dużej części zdecentralizowanych finansów (DeFi). Nawet ENS próbuje w jakiś sposób zastąpić DNS lub z nim konkurować. Ale są też ludzie, którzy widzą, że twardość blockchaina może robić rzeczy, których twardość instytucjonalna nie potrafi — pomysły, których nikt wcześniej nie próbował, ponieważ nigdy nie mieliśmy tej zdolności, tego konkretnego smaku twardości. A teraz możemy te rzeczy eksplorować. Być może są tam NFT, albo gry takie jak Dark Forest, albo ruch wokół autonomicznych światów.

#### Podnoszenie naszych ambicji (27:00) {#raising-our-ambitions-2700}

Co najważniejsze, uważam, że te ramy podnoszą nasze ambicje. Osobiście to właśnie ma dla mnie znaczenie i być może rezonuje to z wami — nie jestem tu tylko dla tych poszczególnych aplikacji. Nie jestem kimś, kto po prostu interesuje się tylko Bitcoinem, tylko DeFi lub tylko NFT. Może wy też tacy jesteście. Dzieje się tu coś większego.

Możemy szczerze mierzyć wyżej niż pieniądze. Możemy mierzyć wyżej niż finanse. Istnieje znacznie szerszy obraz. Myślę, że to faktycznie pomaga zdefiniować wizję, która wydaje się adekwatna w skali do wyzwań, przed którymi stoimy, i do możliwości, jakie oferują blockchainy.

Misją nie jest tylko zastąpienie Fed. Misją jest ulepszenie i rozszerzenie samych materiałów, których użyliśmy do zbudowania naszej cywilizacji — obniżenie kosztów tych narzędzi, aby każdy na Ziemi miał do nich dostęp, aby umożliwić zajście większej liczby zmian. A tak przy okazji, ten koszt wkrótce będzie coraz niższy.

Aby pomóc ludzkości w dalszym graniu w tę nieskończoną grę, pozwalając większej liczbie osób zmieniać zasady. Bardzo niewiele osób może uchwalić prawo, ale każdy może napisać inteligentny kontrakt. Rozszerzamy tę zdolność.

Myślę, że wiele osób w wielu różnych krajach i o wielu ideologiach czuje, że utknęliśmy — że zasady gry nie są już takie, jakie być powinny, ale jesteśmy bezsilni, by je zmienić. Utknęliśmy na tak wiele sposobów w tym lokalnym maksimum i intuicyjnie czujemy, że to jest złe. Blockchainy tego nie naprawiają, ale myślę, że mogą pomóc. Otwierają nową przestrzeń do eksperymentowania. Pozwalają większej liczbie osób zmieniać zasady, pisać nowe zasady, wnosić wkład w tę nieskończoną grę. Nie możemy pisać praw, ale możemy napisać inteligentny kontrakt.

Chcę zakończyć tym akcentem: jeśli widzieliście wcześniej wystąpienia ludzi z EF, wiecie, że lubimy książkę *Skończone i nieskończone gry* (Finite and Infinite Games). Jedną z maksym z tej książki jest to, że tylko to, co może się zmieniać, może trwać. Nie możemy tkwić w tym lokalnym maksimum. Musimy zmieniać rzeczy. I myślę, że blockchainy nam w tym pomagają. Bardzo dziękuję.