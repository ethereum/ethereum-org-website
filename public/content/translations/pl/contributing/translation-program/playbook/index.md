---
title: Przewodnik po programie tłumaczeń
metaTitle: Przewodnik po programie tłumaczeń
lang: pl
description: Zbiór wskazówek i ważnych uwag dotyczących tworzenia programu tłumaczeń
---

Angielski jest jednym z najczęściej używanych języków na świecie i zdecydowanie najczęściej studiowanym językiem. Ponieważ angielski jest najpopularniejszym językiem używanym w internecie – zwłaszcza w mediach społecznościowych – a wielojęzyczne języki programowania należą do rzadkości, większość treści w przestrzeni blockchain jest natywnie pisana po angielsku.

Jednakże, ponieważ ponad 6 miliardów ludzi na świecie (ponad 75% populacji) w ogóle nie mówi po angielsku, stanowi to ogromną barierę wejścia do Ethereum dla zdecydowanej większości światowej populacji.

Z tego powodu coraz więcej projektów w tej przestrzeni dąży do przetłumaczenia swoich treści na różne języki i zlokalizowania ich dla globalnych społeczności.

Dostarczanie wielojęzycznych treści to prosty i skuteczny sposób na rozwój globalnej społeczności, edukację osób nieanglojęzycznych, upewnienie się, że Twoje treści i komunikaty docierają do szerszego grona odbiorców, oraz onboarding większej liczby osób do tej przestrzeni.

Ten przewodnik ma na celu omówienie typowych wyzwań i nieporozumień związanych z lokalizacją treści. Zawiera on instrukcje krok po kroku dotyczące zarządzania treścią, procesu tłumaczenia i weryfikacji, zapewniania jakości, docierania do tłumaczy oraz innych kluczowych aspektów procesu lokalizacji.

## Zarządzanie treścią {#content-management}

Zarządzanie treścią tłumaczeniową odnosi się do procesu automatyzacji przepływu pracy (workflow) tłumaczeniowej, co eliminuje potrzebę powtarzalnej pracy ręcznej, poprawia wydajność i jakość, pozwala na lepszą kontrolę i umożliwia współpracę.

Istnieje wiele różnych podejść do zarządzania treścią w procesie lokalizacji, w zależności od treści i Twoich potrzeb.

Podstawowym sposobem zarządzania treścią jest tworzenie plików dwujęzycznych, zawierających tekst źródłowy i docelowy. Jest to rzadko stosowane w tłumaczeniach, ponieważ nie oferuje żadnych znaczących korzyści poza prostotą.

Agencje tłumaczeniowe zazwyczaj podchodzą do zarządzania tłumaczeniami, korzystając z oprogramowania do zarządzania tłumaczeniami lub narzędzi lokalizacyjnych, które zapewniają możliwości zarządzania projektami i pozwalają na znacznie większą kontrolę nad plikami, treścią i lingwistami.

Przeczytaj więcej o zarządzaniu treścią:

[Trados o tym, czym jest zarządzanie tłumaczeniami](https://www.trados.com/solutions/translation-management/)

[Phrase o zarządzaniu treścią wielojęzyczną](https://phrase.com/blog/posts/multilingual-content-management/)

### Oprogramowanie do zarządzania tłumaczeniami {#translation-management-software}

Istnieje wiele systemów zarządzania tłumaczeniami i narzędzi lokalizacyjnych, a wybór oprogramowania zależy głównie od Twoich potrzeb.

Chociaż niektóre projekty decydują się nie korzystać z systemów zarządzania tłumaczeniami i wolą obsługiwać tłumaczenia ręcznie – bezpośrednio w plikach dwujęzycznych lub w usługach hostingowych, takich jak GitHub – drastycznie zmniejsza to kontrolę, produktywność, jakość, skalowalność i możliwości współpracy. Takie podejście może być najbardziej korzystne w przypadku projektów tłumaczeniowych na małą skalę lub jednorazowych.

Krótkie spojrzenie na niektóre z najpotężniejszych i najczęściej używanych narzędzi do zarządzania tłumaczeniami:

**Najlepsze do crowdsourcingu i współpracy**

[Crowdin](https://crowdin.com/)

- Darmowe dla projektów open-source (nieograniczona liczba ciągów znaków i projektów)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne we wszystkich planach
- Ponad 60 obsługiwanych formatów plików, ponad 70 integracji API

[Lokalise](https://lokalise.com/)

- Darmowe dla 2 członków zespołu, płatne plany dla większej liczby współtwórców (ograniczona liczba ciągów znaków w większości planów)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne w niektórych płatnych planach
- Ponad 30 obsługiwanych formatów plików, ponad 40 integracji API

[Transifex](https://www.transifex.com/)

- Tylko płatne plany (ograniczona liczba ciągów znaków w większości planów)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne we wszystkich płatnych planach
- Ponad 30 obsługiwanych formatów plików, ponad 20 integracji API

[Phrase](https://phrase.com/)

- Tylko płatne plany (nieograniczona liczba ciągów znaków we wszystkich planach, ograniczona liczba projektów i członków zespołu)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne w niektórych płatnych planach
- Ponad 40 obsługiwanych formatów plików, ponad 20 integracji API

[Smartcat](https://www.smartcat.com/)

- Podstawowy darmowy plan z płatnymi zaawansowanymi funkcjami (nieograniczona liczba ciągów znaków i projektów we wszystkich planach)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne we wszystkich planach
- Ponad 60 obsługiwanych formatów plików, ponad 20 integracji API

[POEditor](https://poeditor.com/)

- Darmowe dla projektów open-source (ograniczona liczba ciągów znaków dla wszystkich projektów, nieograniczona dla projektów open-source)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne w płatnych planach
- Ponad 20 obsługiwanych formatów plików, ponad 10 integracji API

i wiele innych...

**Profesjonalne narzędzia tłumaczeniowe**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Płatne plany dla niezależnych tłumaczy i zespołów
- Bardzo potężne narzędzie do tłumaczenia wspomaganego komputerowo (CAT) i oprogramowanie zwiększające produktywność tłumaczy

[MemoQ](https://www.memoq.com/)

- Dostępna ograniczona darmowa wersja z kilkoma płatnymi planami dla zaawansowanych funkcji
- Oprogramowanie do zarządzania tłumaczeniami dla firm, dostawców usług językowych i tłumaczy

[Memsource](https://www.memsource.com/)

- Darmowe dla indywidualnych tłumaczy z kilkoma płatnymi planami dla zespołów
- Oparty na chmurze system tłumaczenia wspomaganego komputerowo i zarządzania tłumaczeniami

i wiele innych...

Przeczytaj więcej o oprogramowaniu do zarządzania tłumaczeniami:

[Definicja systemów zarządzania tłumaczeniami w Wikipedii](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase o 7 rzeczach, które powinno mieć każde oprogramowanie do zarządzania tłumaczeniami](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ o tym, czym jest system zarządzania tłumaczeniami](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Lista 16 najlepszych systemów zarządzania tłumaczeniami według Gengo](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Przepływ pracy (Workflow) {#workflow}

W przestrzeni tłumaczeniowej przepływ pracy (workflow) może oznaczać kilka różnych rzeczy, które są ze sobą powiązane i stanowią ważne kwestie dla Twojego projektu.

Poniżej przyjrzymy się im obu.

**Znaczenie 1**

Jest to prawdopodobnie najczęstszy sposób myślenia o przepływach pracy w tłumaczeniach i coś, co zazwyczaj przychodzi na myśl, gdy słyszy się słowo „workflow”.

W swojej istocie jest to „przepływ pracy” od momentu rozpoczęcia myślenia o tłumaczeniach do wykorzystania przetłumaczonej treści w Twoim produkcie.

Przykładowy przepływ pracy w tym przypadku wyglądałby następująco:

1. **Przygotowanie plików do tłumaczenia** – Brzmi to prosto, jednak musisz wziąć pod uwagę kilka ważnych rzeczy. Na tym etapie powinieneś mieć jasny plan, jak ma działać cały proces.

- _Jakich typów plików będziesz używać? W jakim formacie chcesz otrzymać przetłumaczone pliki?_
  - Jeśli Twoje treści są dostępne w formacie DOCX lub MD, podejście będzie znacznie prostsze, niż w przypadku tłumaczenia wersji PDF Twojej białej księgi (whitepaper) lub innych dokumentów.
- _Które narzędzia lokalizacyjne obsługują ten typ pliku? Czy plik można przetłumaczyć w sposób zachowujący oryginalne formatowanie?_
  - Nie wszystkie typy plików obsługują bezpośrednią lokalizację (np. pliki PDF, pliki graficzne) i nie wszystkie narzędzia lokalizacyjne obsługują wszystkie typy plików.
- _Kto będzie tłumaczył treść? Czy będziesz zamawiać profesjonalne tłumaczenia, czy polegać na wolontariuszach?_
  - Wpływa to na szereg innych decyzji, które musisz podjąć. Na przykład profesjonalni tłumacze czują się pewniej pracując z zaawansowanymi narzędziami lokalizacyjnymi niż wolontariusze.
- _Jakie są Twoje oczekiwania wobec lingwistów? Jeśli korzystasz z usług dostawcy usług językowych, czego oni oczekują od Ciebie?_
  - To jest ten krok, w którym należy upewnić się, że Wasze cele, oczekiwania i harmonogramy są ze sobą zgodne.
- _Czy wszystkie treści do tłumaczenia są równie ważne? Czy niektóre treści powinny zostać przetłumaczone w pierwszej kolejności?_
  - Istnieją sposoby na nadanie priorytetu określonym treściom, które powinny zostać przetłumaczone i wdrożone jako pierwsze. Na przykład, jeśli masz dużo treści do przetłumaczenia, możesz użyć kontroli wersji, aby upewnić się, że tłumacze wiedzą, co powinni traktować priorytetowo.

2. **Udostępnianie plików do tłumaczenia** – Ten krok również wymaga myślenia długoterminowego i nie jest tak prosty, jak wysłanie plików źródłowych do dostawcy usług językowych.

- _Kto będzie tłumaczył treść? Ile osób będzie zaangażowanych w ten proces?_
  - Jeśli planujesz użyć narzędzia lokalizacyjnego, ten krok jest uproszczony, ponieważ możesz przesłać pliki źródłowe bezpośrednio do narzędzia. Dotyczy to również sytuacji, gdy proces tłumaczenia odbywa się w usłudze hostingowej, ponieważ plików źródłowych nie trzeba nigdzie eksportować.
- _Czy pliki źródłowe będą obsługiwane ręcznie, czy też proces ten można zautomatyzować?_
  - Większość narzędzi lokalizacyjnych pozwala na pewien rodzaj integracji lub automatyzacji procesu zarządzania plikami. Z drugiej strony, jeśli współpracujesz z indywidualnymi tłumaczami i nie korzystasz z narzędzia lokalizacyjnego, ręczne wysyłanie plików źródłowych do setek lub tysięcy tłumaczy nie jest procesem skalowalnym.
- _Jakie narzędzia zostaną użyte do lokalizacji?_
  - Odpowiedź na to pytanie zadecyduje o tym, jak podejdziesz do całej reszty. Wybór odpowiedniego narzędzia może pomóc w automatyzacji zarządzania treścią, zarządzaniu pamięcią tłumaczeniową i glosariuszem, zarządzaniu tłumaczami, śledzeniu postępów tłumaczenia/weryfikacji itp., więc poświęć trochę czasu i zrób rozeznanie, jakiego narzędzia chcesz użyć. Jeśli nie planujesz korzystać z narzędzia lokalizacyjnego, wszystkie powyższe czynności będą musiały być wykonywane ręcznie.
- _Jak długo potrwa proces tłumaczenia? Ile to będzie kosztować?_
  - W tym momencie powinieneś być gotowy do udostępnienia plików źródłowych dostawcy usług językowych lub grupie tłumaczy. Dostawca usług językowych może pomóc w analizie liczby słów i przedstawić wycenę, w tym stawki i harmonogram procesu tłumaczenia.
- _Czy planujesz wprowadzać zmiany/aktualizować treść źródłową w trakcie tego procesu?_
  - Jeśli Twoje treści są dynamiczne i często się zmieniają, wszelkie zmiany lub aktualizacje mogą zakłócić postęp tłumaczenia. Korzystanie z pamięci tłumaczeniowej może pomóc w znacznym stopniu to złagodzić, chociaż nadal ważne jest, aby przemyśleć, jak będzie działał proces i jak można zapobiec cofaniu postępów poczynionych przez tłumaczy.

3. **Zarządzanie procesem tłumaczenia** – Twoja praca nie kończy się po przekazaniu treści źródłowych dostawcy usług językowych lub tłumaczom. Aby zapewnić optymalną jakość tłumaczeń, twórcy treści powinni być jak najbardziej zaangażowani w proces tłumaczenia.

- _Jak planujesz komunikować się z tłumaczami?_
  - Jeśli planujesz korzystać z narzędzia lokalizacyjnego, komunikacja może odbywać się bezpośrednio w narzędziu. Zaleca się również skonfigurowanie alternatynego kanału komunikacji z tłumaczami, ponieważ mogą oni być mniej oporni przed nawiązaniem kontaktu, a komunikatory pozwalają na bardziej swobodną komunikację.
- _Jak radzić sobie z pytaniami od tłumaczy? Kto powinien odpowiadać na te pytania?_
  - Tłumacze (zarówno profesjonalni, jak i nieprofesjonalni) często będą kontaktować się z pytaniami i prośbami o wyjaśnienie lub dodatkowy kontekst, a także z opiniami i pomysłami na ulepszenia. Odpowiadanie na te zapytania może często prowadzić do większego zaangażowania i lepszej jakości przetłumaczonych treści. Warto również zapewnić im jak najwięcej zasobów (np. przewodniki, wskazówki, wytyczne terminologiczne, FAQ itp.).
- _Jak poradzić sobie z procesem weryfikacji? Czy chcesz go zlecić na zewnątrz, czy masz możliwości przeprowadzania weryfikacji wewnętrznie?_
  - Choć nie zawsze są konieczne, weryfikacje stanowią integralną część optymalnego procesu tłumaczenia. Zazwyczaj najłatwiej jest zlecić proces weryfikacji profesjonalnym weryfikatorom. Jeśli jednak masz duży międzynarodowy zespół, weryfikacje lub zapewnienie jakości (QA) mogą być również obsługiwane wewnętrznie.

4. **Wdrażanie przetłumaczonej treści** – Ostatnia część przepływu pracy, choć nadal ważna do wcześniejszego przemyślenia.

- _Czy wszystkie tłumaczenia zostaną ukończone w tym samym czasie?_
  - Jeśli nie, powinieneś zastanowić się, które tłumaczenia powinny być traktowane priorytetowo, jak śledzić tłumaczenia w toku i jak przebiega wdrażanie w trakcie wykonywania tłumaczeń.
- _W jaki sposób przetłumaczona treść zostanie Ci dostarczona? W jakim będzie formacie?_
  - Jest to ważna kwestia, niezależnie od tego, jakiego podejścia użyjesz. Narzędzia lokalizacyjne pozwalają zachować kontrolę nad docelowym formatem pliku i procesem eksportu, a zazwyczaj obsługują automatyzację, np. poprzez umożliwienie integracji z usługą hostingową.
- _W jaki sposób będziesz wdrażać tłumaczenia w swoim projekcie?_
  - W niektórych przypadkach może to być tak proste, jak przesłanie przetłumaczonego pliku lub dodanie go do dokumentacji. Jednak w przypadku bardziej złożonych projektów, takich jak tłumaczenia stron internetowych lub aplikacji, należy upewnić się, że kod obsługuje internacjonalizację i z wyprzedzeniem ustalić, jak będzie przebiegał proces wdrażania.
- _Co się stanie, jeśli formatowanie będzie różnić się od źródłowego?_
  - Podobnie jak powyżej, jeśli tłumaczysz proste pliki tekstowe, formatowanie prawdopodobnie nie ma kluczowego znaczenia. Jednak w przypadku bardziej złożonych plików, takich jak treść strony internetowej lub aplikacji, formatowanie i kod muszą być identyczne ze źródłem, aby mogły zostać wdrożone w Twoim projekcie. Jeśli tak nie jest, pliki docelowe będą musiały zostać edytowane przez tłumaczy lub Twoich programistów.

**Znaczenie 2**

Alternatywny przepływ pracy w tłumaczeniach, który nie uwzględnia wewnętrznych decyzji i podejść. Główną kwestią jest tutaj sam przepływ treści.

Przykładowy przepływ pracy w tym przypadku wyglądałby następująco:

1. _Tłumaczenie → Wdrożenie_

- Najprostszy przepływ pracy, w którym tłumaczenie będzie prawdopodobnie tłumaczeniem ludzkim, ponieważ nie ma procesu weryfikacji ani QA, aby ocenić jakość i edytować tłumaczenia przed wdrożeniem.
- W tym przepływie pracy ważne jest, aby tłumacze mogli utrzymać określony poziom jakości, co będzie wymagało odpowiednich zasobów i komunikacji między kierownikami projektów a tłumaczami.

2. _Tłumaczenie → Weryfikacja → Wdrożenie_

- Bardziej zaawansowany przepływ pracy, który obejmuje proces weryfikacji i edycji, aby upewnić się, że jakość tłumaczeń jest akceptowalna i spójna.
- Istnieje wiele podejść do tego przepływu pracy, w których tłumaczenia mogą być wykonywane przez profesjonalnych tłumaczy lub wolontariuszy, podczas gdy proces weryfikacji będzie prawdopodobnie obsługiwany przez profesjonalnych weryfikatorów, którzy znają wszystkie zasady gramatyki i ortografii, których należy przestrzegać w języku docelowym.

3. _Tłumaczenie → Weryfikacja → QA → Wdrożenie_

- Optymalny przepływ pracy zapewniający najwyższy poziom jakości. Chociaż QA nie zawsze jest konieczne, może być przydatne, aby dać Ci lepsze wyobrażenie o jakości przetłumaczonego tekstu po tłumaczeniu i weryfikacji.
- W tym przepływie pracy tłumaczenia mogą być wykonywane wyłącznie przez wolontariuszy lub nawet przez tłumaczenie maszynowe. Proces weryfikacji powinien być wykonywany przez profesjonalnych tłumaczy, podczas gdy QA może być wykonywane przez dostawcę usług językowych lub wewnętrznie, jeśli masz pracowników, dla których języki docelowe są językami ojczystymi.

Przeczytaj więcej o przepływach pracy w tłumaczeniach:

[Zasady dotyczące treści w pięciu fazach przepływu pracy w tłumaczeniach](https://contentrules.com/creating-translation-workflow/)

[Smartling o tym, czym jest zarządzanie przepływem pracy w tłumaczeniach](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans o przepływie pracy w tłumaczeniach](https://www.rixtrans.com/translation-workflow)

## Zarządzanie terminologią {#terminology-management}

Ustalenie jasnego planu postępowania z terminologią jest jednym z najważniejszych kroków zapewniających jakość i spójność tłumaczeń oraz oszczędzających czas tłumaczy.

W przestrzeni tłumaczeniowej jest to znane jako zarządzanie terminologią i jest jedną z kluczowych usług, które dostawcy usług językowych oferują swoim klientom, oprócz dostępu do ich bazy lingwistów i zarządzania treścią.

Zarządzanie terminologią odnosi się do procesu identyfikowania, gromadzenia i zarządzania terminologią, która jest ważna dla Twojego projektu i powinna być zawsze tłumaczona poprawnie i spójnie.

Istnieje kilka kroków, które należy wykonać, zaczynając myśleć o zarządzaniu terminologią:

- Zidentyfikuj kluczowe terminy, które powinny znaleźć się w bazie terminologicznej.
- Utwórz glosariusz terminów i ich definicji.
- Przetłumacz terminy i dodaj je do glosariusza.
- Sprawdź i zatwierdź tłumaczenia.
- Utrzymuj glosariusz i aktualizuj go o nowe terminy, gdy staną się one ważne.

Przeczytaj więcej o zarządzaniu terminologią:

[Trados o tym, czym jest zarządzanie terminologią](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific o tym, dlaczego zarządzanie terminologią ma znaczenie](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation o tym, czym jest zarządzanie terminologią i dlaczego ma to znaczenie](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Pamięć tłumaczeniowa i glosariusz {#tm-and-glossary}

Pamięć tłumaczeniowa i glosariusz to ważne narzędzia w branży tłumaczeniowej, na których polega większość dostawców usług językowych.

Przyjrzyjmy się, co oznaczają te terminy i czym się od siebie różnią:

**Pamięć tłumaczeniowa (TM)** – Baza danych, która automatycznie przechowuje segmenty lub ciągi znaków, w tym dłuższe bloki tekstu, całe zdania, akapity i poszczególne terminy, a także ich obecne i poprzednie tłumaczenia w każdym języku.

Większość narzędzi lokalizacyjnych, systemów zarządzania tłumaczeniami i narzędzi do tłumaczenia wspomaganego komputerowo ma wbudowane pamięci tłumaczeniowe, które zazwyczaj można eksportować i używać również w innych podobnych narzędziach.

Korzyści z korzystania z pamięci tłumaczeniowej obejmują szybsze tłumaczenia, lepszą jakość tłumaczenia, możliwość zachowania określonych tłumaczeń podczas aktualizacji lub zmiany treści źródłowej oraz niższe koszty tłumaczenia powtarzających się treści.

Pamięci tłumaczeniowe działają w oparciu o procentowe dopasowanie między różnymi segmentami i są zazwyczaj najbardziej przydatne, gdy dwa segmenty zawierają ponad 50% tej samej treści. Służą one również do automatycznego tłumaczenia powtarzających się segmentów, które są w 100% dopasowane, co eliminuje potrzebę wielokrotnego tłumaczenia powtarzających się treści.

Przeczytaj więcej o pamięciach tłumaczeniowych:

[Memsource o pamięciach tłumaczeniowych](https://www.memsource.com/translation-memory/)

[Smartling o tym, czym jest pamięć tłumaczeniowa](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glosariusz –** Lista ważnych lub wrażliwych terminów, ich definicji, funkcji i ustalonych tłumaczeń. Główną różnicą między glosariuszem a pamięcią tłumaczeniową jest to, że glosariusz nie jest tworzony automatycznie i nie zawiera tłumaczeń całych zdań.

Większość narzędzi lokalizacyjnych, systemów zarządzania tłumaczeniami i narzędzi do tłumaczenia wspomaganego komputerowo ma wbudowane glosariusze, które można utrzymywać, aby upewnić się, że zawierają terminologię ważną dla Twojego projektu. Podobnie jak TM, glosariusz można zazwyczaj wyeksportować i używać w innych narzędziach lokalizacyjnych.

Przed rozpoczęciem projektu tłumaczeniowego zdecydowanie zaleca się poświęcenie trochę czasu na stworzenie glosariusza dla tłumaczy i weryfikatorów. Korzystanie z glosariusza zapewnia poprawne tłumaczenie ważnych terminów, zapewnia tłumaczom bardzo potrzebny kontekst i gwarantuje spójność tłumaczeń.

Chociaż glosariusze najczęściej zawierają ustalone tłumaczenia w językach docelowych, są one przydatne również bez nich. Nawet bez ustalonych tłumaczeń glosariusz może zawierać definicje terminów technicznych, podkreślać terminy, których nie należy tłumaczyć, i informować tłumaczy, czy dany termin jest używany jako rzeczownik, czasownik, nazwa własna lub jakakolwiek inna część mowy.

Przeczytaj więcej o glosariuszach:

[Lionbridge o tym, czym jest glosariusz tłumaczeniowy](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex o glosariuszach](https://docs.transifex.com/glossary/glossary)

Jeśli nie planujesz korzystać z narzędzia lokalizacyjnego w swoim projekcie, prawdopodobnie nie będziesz w stanie korzystać z pamięci tłumaczeniowej i glosariusza (możesz utworzyć glosariusz lub bazę terminologiczną w pliku Excel, jednak zautomatyzowane glosariusze eliminują potrzebę ręcznego wyszukiwania terminów i ich definicji przez tłumaczy).

Oznacza to, że wszystkie powtarzające się i podobne treści musiałyby być za każdym razem tłumaczone ręcznie. Ponadto tłumacze musieliby kontaktować się z pytaniami, czy dany termin wymaga tłumaczenia, czy nie, jak jest używany w tekście i czy dany termin ma już ustalone tłumaczenie.

_Chcesz użyć pamięci tłumaczeniowej i glosariusza ethereum.org w swoim projekcie? Skontaktuj się z nami pod adresem translations@ethereum.org._

## Docieranie do tłumaczy {#translator-outreach}

**Współpraca z dostawcą usług językowych**

Jeśli współpracujesz z dostawcą usług językowych i jego profesjonalnymi tłumaczami, ta sekcja może nie być dla Ciebie zbyt istotna.

W takim przypadku ważne jest, aby wybrać dostawcę usług językowych, który jest w stanie świadczyć wszystkie potrzebne usługi (np. tłumaczenie, weryfikacja, QA) w wielu językach.

Chociaż wybór dostawcy usług językowych wyłącznie na podstawie oferowanych stawek może być kuszący, należy pamiętać, że najwięksi dostawcy usług językowych nie bez powodu mają wyższe stawki.

- Mają dziesiątki tysięcy lingwistów w swojej bazie danych, co oznacza, że będą w stanie przydzielić do Twojego projektu tłumaczy z wystarczającym doświadczeniem i wiedzą na temat Twojego konkretnego sektora (tj. tłumaczy technicznych).
- Mają duże doświadczenie w pracy nad różnymi projektami i zaspokajaniu różnorodnych potrzeb swoich klientów. Oznacza to, że z większym prawdopodobieństwem dostosują się do Twojego konkretnego przepływu pracy, zaoferują cenne sugestie i potencjalne ulepszenia procesu tłumaczenia oraz spełnią Twoje potrzeby, wymagania i terminy.
- Większość największych dostawców usług językowych ma również własne narzędzia lokalizacyjne, pamięci tłumaczeniowe i glosariusze, z których możesz korzystać. Jeśli nie, mają przynajmniej wystarczającą liczbę lingwistów w swojej puli, aby upewnić się, że ich tłumacze będą zaznajomieni i będą w stanie pracować z dowolnym narzędziem lokalizacyjnym, którego chcesz użyć.

Dogłębne porównanie największych dostawców usług językowych na świecie, kilka szczegółów na temat każdego z nich oraz podział według świadczonych przez nich usług, danych geograficznych itp. można znaleźć w [raporcie Nimdzi 100 z 2021 r.](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Współpraca z nieprofesjonalnymi tłumaczami**

Być może współpracujesz z nieprofesjonalnymi tłumaczami i szukasz wolontariuszy, którzy pomogą Ci w tłumaczeniu.

Istnieje kilka sposobów na dotarcie do ludzi i zaproszenie ich do przyłączenia się do Twojego projektu. Będzie to w dużej mierze zależeć od Twojego produktu i tego, jak dużą społeczność już posiadasz.

Poniżej przedstawiono kilka sposobów na onboarding wolontariuszy:

**Docieranie do odbiorców –** Chociaż jest to w pewnym stopniu omówione w poniższych punktach, dotarcie do potencjalnych wolontariuszy i upewnienie się, że są oni świadomi Twojej inicjatywy tłumaczeniowej, może być skuteczne samo w sobie.

Wiele osób chce się zaangażować i wnieść swój wkład w swoje ulubione projekty, ale często nie widzi jasnego sposobu, aby to zrobić, nie będąc programistą lub nie posiadając specjalnych umiejętności technicznych. Jeśli uda Ci się szerzyć świadomość na temat swojego projektu, wiele osób dwujęzycznych prawdopodobnie chętnie się zaangażuje.

**Szukanie w obrębie swojej społeczności –** Większość projektów w tej przestrzeni ma już duże i aktywne społeczności. Wielu członków Twojej społeczności prawdopodobnie doceniłoby szansę na wniesienie wkładu w projekt w prosty sposób.

Chociaż wkład w projekty open-source często opiera się na wewnętrznej motywacji, jest to również fantastyczne doświadczenie edukacyjne. Każdy, kto jest zainteresowany dowiedzeniem się więcej o Twoim projekcie, prawdopodobnie chętnie zaangażuje się w program tłumaczeń jako wolontariusz, ponieważ pozwoliłoby mu to połączyć fakt, że wniósł wkład w coś, na czym mu zależy, z intensywnym, praktycznym doświadczeniem edukacyjnym.

**Wspominanie o inicjatywie w swoim produkcie –** Jeśli Twój produkt jest popularny i używany przez dużą liczbę osób, podkreślenie programu tłumaczeń i wezwanie użytkowników do działania podczas korzystania z produktu może być niezwykle skuteczne.

Może to być tak proste, jak dodanie banera lub wyskakującego okienka z wezwaniem do działania (CTA) do Twojego produktu w przypadku aplikacji i stron internetowych. Jest to skuteczne, ponieważ Twoją grupą docelową jest Twoja społeczność – osoby, które z największym prawdopodobieństwem zaangażują się w pierwszej kolejności.

**Media społecznościowe –** Media społecznościowe mogą być skutecznym sposobem na szerzenie świadomości o Twoim programie tłumaczeń i docieranie do członków Twojej społeczności, a także innych osób, które jeszcze nie są członkami Twojej społeczności.

Jeśli masz serwer na Discordzie lub kanał na Telegramie, łatwo jest go użyć do docierania do odbiorców, komunikacji z tłumaczami i doceniania współtwórców.

Platformy takie jak X (dawniej Twitter) mogą być również pomocne w onboardingu nowych członków społeczności i publicznym docenianiu współtwórców.

Fundacja Linux stworzyła obszerny [Raport z ankiety dla współtwórców FOSS z 2020 r.](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analizujący współtwórców open-source i ich motywacje.

## Wnioski {#conclusion}

Ten dokument zawiera kilka kluczowych kwestii, o których powinien wiedzieć każdy program tłumaczeń. W żadnym wypadku nie jest to wyczerpujący przewodnik, chociaż może pomóc każdemu, kto nie ma doświadczenia w branży tłumaczeniowej, zorganizować program tłumaczeń dla swojego projektu.

Jeśli szukasz bardziej szczegółowych instrukcji i zestawień różnych narzędzi, procesów i krytycznych aspektów zarządzania programem tłumaczeń, niektórzy z największych dostawców usług językowych prowadzą blogi i często publikują artykuły na temat różnych aspektów procesu lokalizacji. Są to najlepsze zasoby, jeśli chcesz zagłębić się w którykolwiek z powyższych tematów i zrozumieć, jak profesjonalnie działa proces lokalizacji.

Niektóre istotne linki znajdują się na końcu każdej sekcji; jednak w internecie można znaleźć wiele innych zasobów.

W sprawie propozycji współpracy lub dodatkowych informacji, wniosków i najlepszych praktyk, które zdobyliśmy prowadząc Program Tłumaczeń ethereum.org, skontaktuj się z nami pod adresem translations@ethereum.org.