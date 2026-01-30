---
title: "Przewodnik dla tłumaczy"
lang: pl
description: "Instrukcje i wskazówki dla tłumaczy ethereum.org"
---

# Przewodnik po stylu tłumaczenia Ethereum.org {#style-guide}

Przewodnik stylu tłumaczenia ethereum.org zawiera niektóre z najważniejszych wytycznych, instrukcji i wskazówek dla tłumaczy, pomagających nam przetłumaczyć stronę.

Ten dokument służy jako ogólny przewodnik i nie jest specyficzny dla żadnego języka.

Jeśli masz jakieś pytania, sugestie lub uwagi, skontaktuj się z nami pod adresem translations@ethereum.org, wyślij wiadomość do @ethdotorg w serwisie Crowdin lub [dołącz do naszego Discorda](https://discord.gg/ethereum-org), gdzie możesz napisać do nas na kanale #translations lub skontaktować się z dowolnym członkiem zespołu.

## Korzystanie z serwisu Crowdin {#using-crowdin}

Podstawowe instrukcje dotyczące dołączania do projektu w serwisie Crowdin i korzystania z edytora online Crowdin można znaleźć na [stronie Programu Tłumaczeń](/contributing/translation-program/#how-to-translate).

Jeśli chcesz dowiedzieć się więcej o serwisie Crowdin i korzystaniu z niektórych jego zaawansowanych funkcji, [baza wiedzy Crowdin](https://support.crowdin.com/online-editor/) zawiera wiele szczegółowych przewodników i omówień wszystkich funkcji serwisu Crowdin.

## Uchwycenie istoty przekazu {#capturing-the-essence}

Podczas tłumaczenia treści ethereum.org unikaj dosłownych tłumaczeń.

Ważne jest, aby w tłumaczeniach była uchwycona esencja wiadomości. Może to oznaczać przeformułowanie niektórych zwrotów lub użycie opisowych tłumaczeń zamiast tłumaczenia treści słowo w słowo.

Różne języki mają różne zasady gramatyczne, konwencje i kolejności słów. Podczas tłumaczenia należy pamiętać o strukturze zdań w językach docelowych i unikać dosłownego tłumaczenia angielskiego tekstu źródłowego, ponieważ może to prowadzić do słabej struktury zdań i czytelności.

Zamiast tłumaczyć tekst źródłowy słowo w słowo, zaleca się przeczytanie całego zdania i dostosowanie go do konwencji języka docelowego.

## Styl formalny a nieformalny {#formal-vs-informal}

Używany formalnej formy zwracania się, która zawsze jest uprzejma i odpowiednia dla wszystkich odwiedzających.

Zwracanie się w formie formalnej pozwala nam uniknąć nieoficjalnego lub obraźliwego brzmienia i działa niezależnie od płci czy wieku odwiedzającego.

Większość języków indoeuropejskich i afroazjatyckich używa zaimków osobowych drugiej osoby, które rozróżniają płeć męską i żeńską. Zwracając się do użytkownika lub używając zaimków dzierżawczych, możemy uniknąć zakładani płci odwiedzającego, ponieważ formalna forma zwracania się jest powszechnie stosowana i spójna, niezależnie od tego, jak się identyfikują.

## Proste i jasne słownictwo oraz znaczenie {#simple-vocabulary}

Naszym celem jest uczynienie treści na stronie zrozumiałymi dla jak największej liczby osób.

W większości przypadków można to łatwo osiągnąć, używając krótkich i prostych słów, które są zrozumiałe. Jeśli istnieje wiele możliwych tłumaczeń danego słowa w Twoim języku o tym samym znaczeniu, najlepszą opcją jest najczęściej najkrótsze sowo, które wyraźnie odzwierciedla znaczenie.

## System pisma {#writing-system}

Ethereum.org jest dostępny w wielu językach, wykorzystujących alternatywne systemy pisma (lub skrypty pisma) do łaciny.

Wszystkie treści powinny być tłumaczone przy użyciu poprawnego systemu pisma dla danego języka i nie powinny zawierać żadnych słów zapisanych alfabetem łacińskim.

Podczas tłumaczenia treści należy upewnić się, że tłumaczenia są spójne i nie zawierają żadnych znaków alfabetu łacińskiego.

Powszechnym błędnym przekonaniem jest to, że Ethereum powinno być zawsze pisane po łacinie. Jest to w większości niepoprawne, prosimy o używanie pisowni Ethereum właściwej dla Twojego języka (np. 以太坊 w języku chińskim, إيثيريوم w języku arabskim itp.).

**Nie dotyczy to języków, w których nazwy własne nie powinny być tłumaczone.**

## Tłumaczenie metadanych strony {#translating-metadata}

Niektóre strony zawierają metadane na stronie, takie jak „title”, „lang”, „description”, „sidebar” itp.

Ukrywamy treści, których tłumacze nigdy nie powinni tłumaczyć podczas przesyłania nowych stron do Crowdin, co oznacza, że wszystkie metadane widoczne dla tłumaczy w Crowdin powinny zostać przetłumaczone.

Należy zachować szczególną ostrożność podczas tłumaczenia ciągów, w których tekst źródłowy jest oznaczony jako „en”. Reprezentuje to język, w którym strona jest dostępna, i powinno zostać przetłumaczone na [kod języka ISO dla Twojego języka](https://www.andiamo.co.uk/resources/iso-language-codes/). Ciągi te powinny być zawsze tłumaczone przy użyciu znaków alfabetu łacińskiego, a nie pisma rodzimego dla języka docelowego.

Jeśli nie masz pewności, którego kodu języka użyć, możesz sprawdzić pamięć tłumaczeniową w Crowdin lub znaleźć kod dla swojego języka w adresie URL strony w edytorze online Crowdin.

Kilka przykładów kodów językowych dla najczęściej używanych języków:

- Arabski — ar
- Chiński uproszczony — zh
- Francuski — fr
- Hindi — hi
- Hiszpański — es

## Tytuły artykułów zewnętrznych {#external-articles}

Niektóre ciągi zawierają tytuły artykułów zewnętrznych. Większość naszych stron z dokumentacją dla deweloperów zawiera linki do zewnętrznych artykułów do dalszego czytania. Ciągi zawierające tytuły artykułów muszą zostać przetłumaczone, niezależnie od języka artykułu, aby zapewnić bardziej spójne doświadczenia użytkowania dla odwiedzających przeglądających stronę w ich języku.

Poniżej można zaleźć kilka przykładów tego, jak te ciągi wyglądają dla tłumaczy i jak je zidentyfikować (linki do artykułów można znaleźć głównie na dole tych stron, w sekcji „Dalsza lektura”):

![Tytuły artykułów na pasku bocznym](./article-titles-in-sidebar.png)
![Tytuły artykułów w edytorze](./article-titles-in-editor.png)

## Ostrzeżenia w serwisie Crowdin {#crowdin-warnings}

Crowdin posiada wbudowaną funkcję, która ostrzega tłumaczy, gdy mają zamiar popełnić błąd. Crowdin automatycznie ostrzeże Cię o tym przed zapisaniem tłumaczenia, jeśli zapomnisz dołączyć tag ze źródła, przetłumaczysz element, który nie powinien zostać przetłumaczony, dodasz kilka kolejnych spacji, zapomnisz o interpunkcji końcowej itp.
Jeśli zobaczysz takie ostrzeżenie, wróć i sprawdź ponownie sugerowane tłumaczenie.

**Nigdy nie ignoruj tych ostrzeżeń, ponieważ zazwyczaj oznaczają, że coś jest nie tak lub że w tłumaczeniu brakuje kluczowej części tekstu źródłowego.**

Przykład ostrzeżenia w serwisie Crowdin, gdy zapomnisz dodać tag do swojego tłumaczenia:
![Przykład ostrzeżenia w serwisie Crowdin](./crowdin-warning-example.png)

## Postępowanie z tagami i fragmentami kodu {#dealing-with-tags}

Wiele treści źródłowych zawiera tagi i zmienne, które są podświetlone na żółto w edytorze Crowdin. Pełnią one różne funkcje i należy do nich odpowiednio podejść.

**Ustawienia Crowdin**

Aby ułatwić zarządzanie tagami i kopiowanie ich bezpośrednio ze źródła, zalecamy zmianę ustawień w edytorze Crowdin.

1. Otwórz ustawienia
   ![Jak otworzyć ustawienia w edytorze](./editor-settings.png)

2. Zjedź na dół do sekcji „Wyświetlanie tagów HTML”

3. Wybierz „Ukryj”
   ![Wybierz „Ukryj”](./hide-tags.png)

4. Wciśnij przycisk „Zapisz”

Po wybraniu tej opcji pełny tekst tagu nie będzie już wyświetlany i zostanie zastąpiony liczbą.
Podczas tłumaczenia kliknięcie tego tagu spowoduje automatyczne skopiowanie dokładnego tagu do pola tłumaczenia.

**Linki**

Możesz zauważyć pełne linki do stron na ethereum.org lub innych stronach.

Powinny one być identycznie jak w źródle i nie powinny być zmieniane ani tłumaczone. Jeśli przetłumaczysz link lub zmienisz go w jakikolwiek sposób, nawet usuwając tylko jego część, taką jak ukośnik (/), spowoduje to, że link się zepsuje i stanie się bezużyteczny.

Najlepszym sposobem na poradzenie sobie z linkami to skopiowanie ich bezpośrednio ze źródła, poprzez kliknięcie na nie lub użycie przycisku „Kopiuj tekst źródłowy” (Alt+C).

![Przykład linku](./example-of-link.png)

Linki pojawiają się również w tekście źródłowym w postaci tagów (tj. `<0>` `</0>`). Jeśli najedziesz kursorem na tag, edytor wyświetli jego pełną zawartość — czasami te tagi będą reprezentować linki.

Bardzo ważne jest to, aby kopiować linki ze źródła i nie zmieniać ich kolejności.

Jeśli kolejność tagów zostanie zmieniona, link, który reprezentują, zostanie uszkodzony.

![Przykład linków wewnątrz tagów](./example-of-links-inside-tags.png)

**Tagi i zmienne**

Tekst źródłowy zawiera wiele różnych typów tagów, które powinny być zawsze kopiowane ze źródła i nigdy nie zmieniane. Podobnie jak powyżej, kolejność tych tagów w tłumaczeniu powinna również pozostać taka sama jak w źródle.

Tagi zawsze zawierają tag otwierający i zamykający. W większości przypadków tekst pomiędzy tagiem otwierającym a zamykającym powinien być tłumaczony.

Przykład: `<strong x-id="1">`Zdecentralizowany`</strong>`

`<strong x-id="1">` - _Tag otwierający, który pogrubia tekst_

Zdecentralizowany - _Tekst do tłumaczenia_

`</strong>` - _Tag zamykający_

![Przykład tagów „strong”](./example-of-strong-tags.png)

Fragmenty kodu powinny być traktowane nieco inaczej niż inne tagi, ponieważ zawierają kod, który nie powinien być tłumaczony.

Przykład: `<code>`nonce`</code>`

`<code>` - _Tag otwierający, który zawiera fragment kodu_

nonce - _Tekst, którego nie należy tłumaczyć_

`</code>` - _Tag zamykający_

![Przykład fragmentów kodu](./example-of-code-snippets.png)

Tekst źródłowy zawiera również skrócone tagi, które zawierają tylko liczby, co oznacza, że ich funkcja nie jest od razu oczywista. Możesz najechać kursorem na te tagi, aby zobaczyć dokładnie, jaką funkcję pełnią.

W poniższym przykładzie widać, że najechanie kursorem na tag `<0>` pokazuje, że reprezentuje on `<code>` i zawiera fragment kodu, dlatego zawartość tych tagów nie powinna być tłumaczona.

![Przykład niejednoznacznych tagów](./example-of-ambiguous-tags.png)

## Formy skrócone a pełne/skróty {#short-vs-full-forms}

Na stronie internetowej używanych jest wiele skrótów, np. dapps, NFT, DAO, DeFi itp. Skróty te są powszechnie używane w języku angielskim i większość odwiedzających stronę jest z nimi zaznajomiona.

Ponieważ zwykle nie mają one ustalonych tłumaczeń na inne języki, najlepszym sposobem podejścia do tych i podobnych terminów jest podanie opisowego tłumaczenia pełnej formy i dodanie angielskiego skrótu w nawiasie.

Nie tłumacz tych skrótów, ponieważ większość osób nie znałaby ich, a przetłumaczone wersje nie miałyby większego sensu dla większości odwiedzających.

Przykład jak tłumaczyć dapps:

- Aplikacje zdecentralizowane (dapps) → _Przetłumaczona pełna forma (angielski skrót w nawiasach)_

## Terminy bez ustalonych tłumaczeń {#terms-without-established-translations}

Niektóre terminy mogą nie mieć ustalonych tłumaczeń na inne języki i są powszechnie znane pod oryginalnym terminem angielskim. Takie terminy obejmują głównie nowsze koncepcje, takie jak proof-of-work, proof-of-stake, Łańcuch śledzący (Beacon Chain), staking itp.

Chociaż tłumaczenie tych terminów może brzmieć nienaturalnie, ponieważ angielska wersja jest powszechnie używana również w innych językach, to jednak zaleca się ich tłumaczenie.

Tłumacząc je, nie krępuj się wykazać kreatywnością, użyj opisowych tłumaczeń lub po prostu przetłumacz je dosłownie.

**Powodem, dla którego większość terminów powinna zostać przetłumaczona, a nie pozostawiona w języku angielskim jest fakt, że ta nowa technologia stanie się w przyszłości bardziej rozpowszechniona, gdy coraz więcej osób zacznie korzystać z Ethereum i powiązanych technologii. Jeśli chcemy przyciągnąć do tej przestrzeni więcej osób z całego świata, musimy zapewnić zrozumiałą terminologię w jak największej liczbie języków, nawet jeśli sami będziemy musieli ją stworzyć.**

## Przyciski i wezwania do działania (CTA) {#buttons-and-ctas}

Strona zawiera liczne przyciski, które powinny być tłumaczone inaczej niż pozostałe treści.

Tekst przycisku można zidentyfikować, przeglądając zrzuty ekranu dołączone do większości ciągów lub sprawdzając kontekst w edytorze, który zawiera frazę „button”.

Tłumaczenia przycisków powinny być jak najkrótsze, aby zapobiec niepoprawnemu formatowaniu. Dodatkowo tłumaczenia przycisków powinny być w trybie rozkazującym, tzn. przedstawiać polecenie lub prośbę.

![Jak znaleźć przycisk](./how-to-find-a-button.png)

## Tłumaczenie inkluzywne {#translating-for-inclusivity}

Odwiedzający ethereum.org pochodzą z całego świata i z różnych środowisk. Język na stronie powinien być zatem neutralny, przyjazny dla wszystkich i niewykluczający.

Ważnym aspektem jest neutralność płciowa. Można to łatwo osiągnąć, używając formalnej formy adresowania i unikając w tłumaczeniach słów powiązanych z płcią.

Inną formą integracji jest próba tłumaczenia dla globalnej publiczności, niespecyficznej dla żadnego kraju, rasy czy regionu.

Język powinien być również odpowiedni dla wszystkich odbiorców i grup wiekowych.

## Tłumaczenia specyficzne dla języka {#language-specific-translations}

Podczas tłumaczenia ważne jest, aby przestrzegać zasad gramatyki, konwencji i formatowania używanych w danym języku, a nie kopiować ze źródła. Tekst źródłowy jest zgodny z zasadami i konwencjami gramatyki angielskiej, co nie ma zastosowania w wielu innych językach.

Należy znać zasady obowiązujące w danym języku i odpowiednio tłumaczyć. Jeśli potrzebujesz pomocy, skontaktuj się z nami, a pomożemy Ci znaleźć zasoby na temat tego, jak te elementy powinny być używane w Twoim języku.

Kilka przykładów tego, o czym należy szczególnie pamiętać:

### Interpunkcja i formatowanie {#punctuation-and-formatting}

**Stosowanie wielkich liter**

- Istnieją ogromne różnice w pisowni wielkich liter w różnych językach.
- W języku angielskim powszechne jest pisanie wielką literą tytułów i nazw, miesięcy i dni, nazw języków, świąt itp. W wielu innych językach jest to gramatycznie niepoprawne, ponieważ mają różne zasady kapitalizacji.
- Niektóre języki mają również zasady kapitalizacji zaimków osobowych, rzeczowników i niektórych przymiotników, które nie są pisane wielką literą w języku angielskim.

**Odstępy**

- Zasady ortografii definiują użycie odstępów dla każdego języka. Ponieważ odstępy są używane wszędzie, zasady te są jednymi z najbardziej wyróżniających się, a odstępy są jednymi z najczęściej błędnie tłumaczonych elementów.
- Niektóre typowe różnice w odstępach między językiem angielskim a innymi językami:
  - Odstęp przed jednostkami miary i walut (np. USD, EUR, kB, MB)
  - Odstęp przed znakami stopni (np. °C, ℉)
  - Odstęp przed niektórymi znakami interpunkcyjnymi, zwłaszcza wielokropkiem (…)
  - Odstęp przed i po ukośnikach (/)

**Listy**

- Każdy język ma zróżnicowany i złożony zestaw reguł pisania list. Mogą one znacznie różnić się od angielskiego.
- W niektórych językach pierwsze słowo każdego nowego wiersza musi być pisane wielkimi literami, podczas gdy w innych nowe wiersze powinny zaczynać się małymi literami. Wiele języków ma również różne zasady dotyczące kapitalizacji w listach, w zależności od długości każdego wiersza.
- To samo dotyczy interpunkcji na końcu wiersza. Końcowym znakiem interpunkcyjnym w listach może być kropka (.), przecinek (,) lub średnik (;), w zależności od języka.

**Cudzysłów**

- Języki używają wielu różnych cudzysłowów. Zwykłe kopiowanie angielskich cudzysłowów ze źródła jest często niepoprawne.
- Do niektórych z najpopularniejszych typów cudzysłowów należą:
  - „przykładowy tekst“
  - ‚przykładowy tekst’
  - »przykładowy tekst«
  - “przykładowy tekst”
  - ‘przykładowy tekst’
  - «przykładowy tekst»

**Dywizy i myślniki**

- W języku angielskim dywiz (-) jest używany do łączenia słów lub różnych części słowa, podczas gdy myślnik (–) jest używany do wskazania zakresu lub przerwy.
- Wiele języków ma różne zasady używania dywizów i myślników, których należy przestrzegać.

### Formaty {#formats}

**Liczby**

- Główną różnicą w zapisie liczb w różnych językach jest separator używany dla ułamków dziesiętnych i tysięcy. W przypadku tysięcy może to być kropka, przecinek lub spacja. Podobnie, niektóre języki używają kropki dziesiętnej, podczas gdy inne używają przecinka dziesiętnego.
  - Kilka przykładów dużych liczb:
    - Angielski – **1,000.50**
    - Hiszpański – **1.000,50**
    - Francuski – **1 000,50**
- Kolejną ważną kwestią podczas tłumaczenia liczb jest znak procentu. Można to zapisać na różne sposoby: **100%**, **100 %** lub **%100**.
- Liczby ujemne również mogą być wyświetlane w różny sposób, w zależności od języka: -100, 100-, (100) lub [100].

**Daty**

- Podczas tłumaczenia dat należy wziąć pod uwagę szereg czynników i różnic w zależności od języka. Obejmują one format daty, separator, wielkie litery i początkowe zera. Istnieją również różnice między datami pełnymi i numerycznymi.
  - Kilka przykładów różnych formatów daty:
    - Brytyjski Angielski (dd/mm/rrrr) — 1st January, 2022
    - Amerykański Angielski (mm/dd/rrrr) — January 1st, 2022
    - Chiński (rrrr-mm-dd) — 2022 年 1 月 1 日
    - Francuski (dd/mm/rrrr) — 1er janvier 2022
    - Włoski (dd/mm/rrrr) — 1º gennaio 2022
    - Niemiecki (dd/mm/rrrr) — 1. Januar 2022

**Waluty**

- Tłumaczenie walut może stanowić wyzwanie ze względu na różne formaty, konwencje i konwersje. Zasadniczo waluty powinny być takie same jak w źródle. Możesz dodać lokalną walutę i konwersję w nawiasach dla korzyści czytelnika.
- Główne różnice w zapisie walut w różnych językach obejmują umieszczenie symboli, przecinki dziesiętne i kropki dziesiętne, odstępy oraz skróty i symbole.
  - Umieszczenie symboli: $100 lub 100$
  - Przecinki dziesiętne i kropki dziesiętne: 100,50$ lub 100.50$
  - Odstępy: 100$ lub 100 $
  - Skróty i symbole: 100 $ lub 100 USD

**Jednostki miary**

- Zasadniczo jednostki miary powinny być takie same jak w źródle. Jeśli w Twoim kraju używany jest inny system, konwersję można podać w nawiasach.
- Oprócz tłumaczenia jednostek miar, ważne jest również, aby zwrócić uwagę na różnice w sposobie, w jaki języki podchodzą do tych jednostek. Główną różnicą jest odstęp między liczbą a jednostką, który może być różny w zależności od języka. Przykładem może być 100kB i 100 kB lub 50ºF i 50 ºF.

## Wnioski {#conclusion}

Tłumaczenie ethereum.org to świetna okazja do poznania różnych aspektów Ethereum.

Tłumacząc, staraj się nie spieszyć. Weź to na spokojnie i baw się dobrze!

Dziękujemy za zaangażowanie w Program Tłumaczeń i pomoc w udostępnieniu strony szerszemu gronu odbiorców. Społeczność Ethereum jest globalna i cieszymy się, że jesteś jej częścią!
