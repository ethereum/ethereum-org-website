---
title: Przewodnik po stylu tłumaczeń ethereum.org
metaTitle: Przewodnik dla tłumaczy
lang: pl
description: Instrukcje i wskazówki dla tłumaczy ethereum.org
---

Przewodnik po stylu tłumaczeń ethereum.org zawiera jedne z najważniejszych wytycznych, instrukcji i wskazówek dla tłumaczy, pomagając nam w lokalizacji strony internetowej.

Ten dokument służy jako ogólny przewodnik i nie jest specyficzny dla żadnego konkretnego języka.

Jeśli masz jakiekolwiek pytania, sugestie lub opinie, skontaktuj się z nami pod adresem translations@ethereum.org, wyślij wiadomość do @ethdotorg na platformie Crowdin lub [dołącz do naszego serwera Discord](https://discord.gg/ethereum-org), gdzie możesz napisać do nas na kanale #translations lub skontaktować się z dowolnym członkiem zespołu.

## Korzystanie z platformy Crowdin {#using-crowdin}

Podstawowe instrukcje dotyczące dołączania do projektu w Crowdin oraz korzystania z edytora online Crowdin można znaleźć na [stronie Programu Tłumaczeń](/contributing/translation-program/#how-to-translate).

Jeśli chcesz dowiedzieć się więcej o platformie Crowdin i korzystaniu z niektórych jej zaawansowanych funkcji, [baza wiedzy Crowdin](https://support.crowdin.com/online-editor/) zawiera wiele szczegółowych przewodników i przeglądów wszystkich funkcji Crowdin.

## Oddanie sedna wiadomości {#capturing-the-essence}

Tłumacząc treści na ethereum.org, unikaj dosłownych tłumaczeń.

Ważne jest, aby tłumaczenia oddawały sedno wiadomości. Może to oznaczać przeformułowanie niektórych zwrotów lub użycie tłumaczeń opisowych zamiast tłumaczenia treści słowo w słowo.

Różne języki mają różne zasady gramatyczne, konwencje i szyk wyrazów. Podczas tłumaczenia należy pamiętać o tym, jak budowane są zdania w językach docelowych i unikać dosłownego tłumaczenia angielskiego źródła, ponieważ może to prowadzić do złej struktury zdań i słabej czytelności.

Zamiast tłumaczyć tekst źródłowy słowo w słowo, zaleca się przeczytanie całego zdania i dostosowanie go do konwencji języka docelowego.

## Styl formalny a nieformalny {#formal-vs-informal}

Używamy formalnej formy zwrotu, która jest zawsze uprzejma i odpowiednia dla wszystkich odwiedzających.

Używanie formalnych zwrotów pozwala nam uniknąć brzmienia nieoficjalnego lub obraźliwego i sprawdza się niezależnie od wieku i płci odwiedzającego.

Większość języków indoeuropejskich i afroazjatyckich używa zaimków osobowych w drugiej osobie, które rozróżniają płeć męską i żeńską. Zwracając się do użytkownika lub używając zaimków dzierżawczych, możemy uniknąć zakładania płci odwiedzającego, ponieważ formalna forma zwrotu jest ogólnie mająca zastosowanie i spójna, niezależnie od tego, jak się identyfikują.

## Proste i jasne słownictwo oraz znaczenie {#simple-vocabulary}

Naszym celem jest, aby treści na stronie były zrozumiałe dla jak największej liczby osób.

W większości przypadków można to łatwo osiągnąć, używając krótkich i prostych słów, które są łatwo zrozumiałe. Jeśli w Twoim języku istnieje wiele możliwych tłumaczeń danego słowa o tym samym znaczeniu, najlepszą opcją jest najczęściej najkrótsze słowo, które jasno oddaje to znaczenie.

## System pisma {#writing-system}

Ethereum.org jest dostępne w wielu językach, które używają alternatywnych systemów pisma (lub skryptów) w stosunku do alfabetu łacińskiego.

Cała treść powinna zostać przetłumaczona przy użyciu prawidłowego systemu pisma dla Twojego języka i nie powinna zawierać żadnych słów zapisanych znakami łacińskimi.

Podczas tłumaczenia treści należy upewnić się, że tłumaczenia są spójne i nie zawierają żadnych znaków łacińskich.

Częstym błędnym przekonaniem jest to, że słowo Ethereum powinno być zawsze zapisywane alfabetem łacińskim. Jest to w większości nieprawda, prosimy o używanie pisowni Ethereum natywnej dla Twojego języka (np. 以太坊 w języku chińskim, إيثيريوم w języku arabskim itp.).

**Powyższe nie dotyczy języków, w których z zasady nie tłumaczy się nazw własnych.**

## Tłumaczenie metadanych strony {#translating-metadata}

Niektóre strony zawierają metadane, takie jak „title”, „lang”, „description”, „sidebar” itp.

Ukrywamy treści, których tłumacze nigdy nie powinni tłumaczyć podczas przesyłania nowych stron do Crowdin, co oznacza, że wszystkie metadane widoczne dla tłumaczy w Crowdin powinny zostać przetłumaczone.

Prosimy o zachowanie szczególnej ostrożności podczas tłumaczenia jakichkolwiek ciągów znaków, w których tekstem źródłowym jest „en”. Reprezentuje to język, w którym dostępna jest strona, i powinno zostać przetłumaczone na [kod języka ISO dla Twojego języka](https://www.andiamo.co.uk/resources/iso-language-codes/). Te ciągi znaków powinny być zawsze tłumaczone przy użyciu znaków łacińskich, a nie systemu pisma natywnego dla języka docelowego.

Jeśli nie masz pewności, jakiego kodu języka użyć, możesz sprawdzić pamięć tłumaczeń w Crowdin lub znaleźć kod dla swojego języka w adresie URL strony w edytorze online Crowdin.

Kilka przykładów kodów językowych dla najczęściej używanych języków:

- Arabski - ar
- Chiński uproszczony - zh
- Francuski - fr
- Hindi - hi
- Hiszpański - es

## Tytuły artykułów zewnętrznych {#external-articles}

Niektóre ciągi znaków zawierają tytuły artykułów zewnętrznych. Większość naszych stron z dokumentacją dla programistów zawiera linki do zewnętrznych artykułów do dalszej lektury. Ciągi znaków zawierające tytuły artykułów muszą zostać przetłumaczone, niezależnie od języka artykułu, aby zapewnić bardziej spójne wrażenia użytkownikom przeglądającym stronę w ich języku.

Poniżej znajdziesz kilka przykładów tego, jak te ciągi znaków wyglądają dla tłumaczy i jak je zidentyfikować (linki do artykułów można znaleźć głównie na dole tych stron, w sekcji „Dalsza lektura”):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Ostrzeżenia w Crowdin {#crowdin-warnings}

Crowdin ma wbudowaną funkcję, która ostrzega tłumaczy, gdy mają popełnić błąd. Crowdin automatycznie ostrzeże Cię o tym przed zapisaniem tłumaczenia, jeśli zapomnisz dołączyć tag ze źródła, przetłumaczysz elementy, które nie powinny być tłumaczone, dodasz kilka spacji z rzędu, zapomnisz o interpunkcji końcowej itp.
Jeśli zobaczysz takie ostrzeżenie, wróć i dokładnie sprawdź sugerowane tłumaczenie.

**Nigdy nie ignoruj tych ostrzeżeń, ponieważ zazwyczaj oznaczają one, że coś jest nie tak lub że w tłumaczeniu brakuje kluczowej części tekstu źródłowego.**

Przykład ostrzeżenia w Crowdin, gdy zapomnisz dodać tag do swojego tłumaczenia:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Radzenie sobie z tagami i fragmentami kodu {#dealing-with-tags}

Wiele treści źródłowych zawiera tagi i zmienne, które są podświetlone na żółto w edytorze Crowdin. Pełnią one różne funkcje i należy do nich podchodzić w odpowiedni sposób.

**Ustawienia Crowdin**

Aby ułatwić zarządzanie tagami i kopiowanie ich bezpośrednio ze źródła, zalecamy zmianę ustawień w edytorze Crowdin.

1. Otwórz ustawienia
   ![How to open settings in the editor](./editor-settings.png)

2. Przewiń w dół do sekcji „Wyświetlanie tagów HTML” (HTML tags displaying)

3. Wybierz „Ukryj” (Hide)
   ![Please select 'Hide'](./hide-tags.png)

4. Kliknij „Zapisz” (Save)

Po wybraniu tej opcji pełny tekst tagu nie będzie już wyświetlany i zostanie zastąpiony liczbą.
Podczas tłumaczenia kliknięcie tego tagu automatycznie skopiuje dokładny tag do pola tłumaczenia.

**Linki**

Możesz zauważyć pełne linki do stron na ethereum.org lub innych witrynach.

Powinny one być identyczne ze źródłem i nie mogą być zmieniane ani tłumaczone. Jeśli przetłumaczysz link lub zmienisz go w jakikolwiek sposób, nawet usuwając tylko jego część, np. ukośnik (/), doprowadzi to do uszkodzonych i bezużytecznych linków.

Najlepszym sposobem obsługi linków jest skopiowanie ich bezpośrednio ze źródła, klikając na nie lub używając przycisku „Kopiuj źródło” (Copy Source) (`Alt+C`).

![Example of link.png](./example-of-link.png)

Linki pojawiają się również w tekście źródłowym w postaci tagów (tj. `<0>` `</0>`). Jeśli najedziesz kursorem na tag, edytor pokaże jego pełną zawartość – czasami te tagi będą reprezentować linki.

Bardzo ważne jest, aby kopiować linki ze źródła i nie zmieniać ich kolejności.

Jeśli kolejność tagów zostanie zmieniona, link, który reprezentują, zostanie uszkodzony.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Tagi i zmienne**

Tekst źródłowy zawiera wiele różnych typów tagów, które zawsze należy kopiować ze źródła i nigdy ich nie zmieniać. Podobnie jak powyżej, kolejność tych tagów w tłumaczeniu również powinna pozostać taka sama jak w źródle.

Tagi zawsze zawierają tag otwierający i zamykający. W większości przypadków tekst między tagiem otwierającym a zamykającym powinien zostać przetłumaczony.

Przykład: `<strong x-id="1">`Zdecentralizowany`</strong>`

`<strong x-id="1">` - _Tag otwierający, który pogrubia tekst_

Zdecentralizowany - _Tekst do przetłumaczenia_

`</strong>` - _Tag zamykający_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Do fragmentów kodu należy podchodzić nieco inaczej niż do innych tagów, ponieważ zawierają one kod, którego nie należy tłumaczyć.

Przykład: `<code>`nonce`</code>`

`<code>` - _Tag otwierający, który zawiera fragment kodu_

nonce - _Tekst niepodlegający tłumaczeniu_

`</code>` - _Tag zamykający_

![Example of code snippets.png](./example-of-code-snippets.png)

Tekst źródłowy zawiera również skrócone tagi, które zawierają tylko liczby, co oznacza, że ich funkcja nie jest od razu oczywista. Możesz najechać kursorem na te tagi, aby zobaczyć dokładnie, jaką funkcję pełnią.

W poniższym przykładzie widać, że najechanie kursorem na tag `<0>` pokazuje, że reprezentuje on `<code>` i zawiera fragment kodu, dlatego zawartość wewnątrz tych tagów nie powinna być tłumaczona.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Formy skrócone a pełne/skrótowce {#short-vs-full-forms}

Na stronie używa się wielu skrótów, np. dapps, NFT, DAO, DeFi itp. Skróty te są powszechnie używane w języku angielskim i większość odwiedzających stronę jest z nimi zaznajomiona.

Ponieważ zazwyczaj nie mają one ustalonych tłumaczeń w innych językach, najlepszym sposobem podejścia do tych i podobnych terminów jest podanie opisowego tłumaczenia pełnej formy i dodanie angielskiego skrótu w nawiasach.

Nie tłumacz tych skrótów, ponieważ większość ludzi nie byłaby z nimi zaznajomiona, a zlokalizowane wersje nie miałyby większego sensu dla większości odwiedzających.

Przykład, jak przetłumaczyć dapps:

- Zdecentralizowane aplikacje (dapps) → _Przetłumaczona pełna forma (angielski skrót w nawiasach)_

## Terminy bez ustalonych tłumaczeń {#terms-without-established-translations}

Niektóre terminy mogą nie mieć ustalonych tłumaczeń w innych językach i są powszechnie znane pod oryginalnym angielskim terminem. Takie terminy obejmują głównie nowsze koncepcje, takie jak dowód pracy (PoW), dowód stawki (PoS), Beacon Chain, staking itp.

Chociaż tłumaczenie tych terminów może brzmieć nienaturalnie, ponieważ angielska wersja jest powszechnie używana również w innych językach, wysoce zaleca się ich tłumaczenie.

Tłumacząc je, nie bój się wykazać kreatywnością, używaj tłumaczeń opisowych lub po prostu tłumacz je dosłownie.

**Powodem, dla którego większość terminów powinna być tłumaczona, zamiast pozostawiać niektóre w języku angielskim, jest fakt, że ta nowa terminologia stanie się w przyszłości bardziej powszechna, w miarę jak coraz więcej osób zacznie korzystać z Ethereum i powiązanych technologii. Jeśli chcemy wprowadzić do tej przestrzeni więcej osób z całego świata, musimy zapewnić zrozumiałą terminologię w jak największej liczbie języków, nawet jeśli musimy ją stworzyć sami.**

## Przyciski i wezwania do działania (CTA) {#buttons-and-ctas}

Strona zawiera liczne przyciski, które powinny być tłumaczone inaczej niż pozostałe treści.

Tekst przycisku można zidentyfikować, przeglądając zrzuty ekranu z kontekstem, połączone z większością ciągów znaków, lub sprawdzając kontekst w edytorze, który zawiera słowo „button”.

Tłumaczenia przycisków powinny być jak najkrótsze, aby zapobiec niedopasowaniom formatowania. Ponadto tłumaczenia przycisków powinny mieć formę trybu rozkazującego, tj. przedstawiać polecenie lub prośbę.

![How to find a button.png](./how-to-find-a-button.png)

## Tłumaczenie z myślą o inkluzywności {#translating-for-inclusivity}

Odwiedzający ethereum.org pochodzą z całego świata i z różnych środowisk. Język na stronie powinien być zatem neutralny, przyjazny dla wszystkich i niewykluczający.

Ważnym aspektem tego jest neutralność płciowa. Można to łatwo osiągnąć, używając formalnej formy zwrotu i unikając w tłumaczeniach słów specyficznych dla danej płci.

Inną formą inkluzywności jest próba tłumaczenia dla globalnej publiczności, niespecyficznej dla żadnego kraju, rasy czy regionu.

Wreszcie, język powinien być odpowiedni dla wszystkich odbiorców i grup wiekowych.

## Tłumaczenia specyficzne dla danego języka {#language-specific-translations}

Podczas tłumaczenia ważne jest przestrzeganie zasad gramatycznych, konwencji i formatowania używanych w Twoim języku, w przeciwieństwie do kopiowania ze źródła. Tekst źródłowy jest zgodny z angielskimi zasadami gramatycznymi i konwencjami, co nie ma zastosowania do wielu innych języków.

Powinieneś znać zasady obowiązujące w Twoim języku i odpowiednio tłumaczyć. Jeśli potrzebujesz pomocy, skontaktuj się z nami, a pomożemy Ci znaleźć zasoby na temat tego, jak te elementy powinny być używane w Twoim języku.

Kilka przykładów tego, na co należy zwracać szczególną uwagę:

### Interpunkcja, formatowanie {#punctuation-and-formatting}

**Wielkie litery**

- Istnieją ogromne różnice w użyciu wielkich liter w różnych językach.
- W języku angielskim powszechne jest pisanie wielką literą wszystkich słów w tytułach i nazwach, miesiącach i dniach, nazwach języków, świętach itp. W wielu innych językach jest to gramatycznie niepoprawne, ponieważ mają one inne zasady dotyczące wielkich liter.
- Niektóre języki mają również zasady dotyczące pisania wielką literą zaimków osobowych, rzeczowników i niektórych przymiotników, które w języku angielskim nie są pisane wielką literą.

**Spacje**

- Zasady ortografii określają użycie spacji dla każdego języka. Ponieważ spacje są używane wszędzie, zasady te są jednymi z najbardziej odrębnych, a spacje są jednymi z najczęściej błędnie tłumaczonych elementów.
- Niektóre typowe różnice w użyciu spacji między językiem angielskim a innymi językami:
  - Spacja przed jednostkami miary i walutami (np. USD, EUR, kB, MB)
  - Spacja przed znakami stopni (np. °C, ℉)
  - Spacja przed niektórymi znakami interpunkcyjnymi, zwłaszcza wielokropkiem (…)
  - Spacja przed i po ukośnikach (/)

**Listy**

- Każdy język ma zróżnicowany i złożony zestaw zasad pisania list. Mogą się one znacznie różnić od języka angielskiego.
- W niektórych językach pierwsze słowo każdego nowego wiersza musi być pisane wielką literą, podczas gdy w innych nowe wiersze powinny zaczynać się od małych liter. Wiele języków ma również różne zasady dotyczące wielkich liter w listach, w zależności od długości każdego wiersza.
- To samo dotyczy interpunkcji elementów listy. Interpunkcja końcowa w listach może być kropką (**.**), przecinkiem (**,**) lub średnikiem (**;**), w zależności od języka.

**Cudzysłowy**

- Języki używają wielu różnych cudzysłowów. Zwykłe kopiowanie angielskich cudzysłowów ze źródła jest często niepoprawne.
- Niektóre z najczęstszych typów cudzysłowów to:
  - „przykładowy tekst“
  - ‚przykładowy tekst’
  - »przykładowy tekst«
  - “przykładowy tekst”
  - ‘przykładowy tekst’
  - «przykładowy tekst»

**Dywizy i myślniki**

- W języku angielskim dywiz (-) służy do łączenia słów lub różnych części słowa, podczas gdy myślnik (–) służy do wskazania zakresu lub pauzy.
- Wiele języków ma inne zasady używania dywizów i myślników, których należy przestrzegać.

### Formaty {#formats}

**Liczby**

- Główną różnicą w zapisywaniu liczb w różnych językach jest separator używany dla miejsc dziesiętnych i tysięcy. W przypadku tysięcy może to być kropka, przecinek lub spacja. Podobnie niektóre języki używają kropki dziesiętnej, podczas gdy inne używają przecinka dziesiętnego.
  - Kilka przykładów dużych liczb:
    - Angielski – **1,000.50**
    - Hiszpański – **1.000,50**
    - Francuski – **1 000,50**
- Kolejną ważną kwestią przy tłumaczeniu liczb jest znak procentu. Można go zapisać na różne sposoby: **100%**, **100 %** lub **%100**.
- Wreszcie, liczby ujemne mogą być wyświetlane w różny sposób, w zależności od języka: -100, 100-, (100) lub [100].

**Daty**

- Podczas tłumaczenia dat należy wziąć pod uwagę szereg kwestii i różnic w zależności od języka. Obejmują one format daty, separator, wielkie litery i zera wiodące. Istnieją również różnice między datami pełnymi a liczbowymi.
  - Kilka przykładów różnych formatów dat:
    - Angielski brytyjski (dd/mm/rrrr) – 1st January, 2022
    - Angielski amerykański (mm/dd/rrrr) – January 1st, 2022
    - Chiński (rrrr-mm-dd) – 2022 年 1 月 1 日
    - Francuski (dd/mm/rrrr) – 1er janvier 2022
    - Włoski (dd/mm/rrrr) – 1º gennaio 2022
    - Niemiecki (dd/mm/rrrr) – 1. Januar 2022

**Waluty**

- Tłumaczenie walut może być wyzwaniem ze względu na różne formaty, konwencje i przeliczenia. Zasadniczo prosimy o zachowanie walut takich samych jak w źródle. Dla wygody czytelnika możesz dodać w nawiasach lokalną walutę i przeliczenie.
- Główne różnice w zapisywaniu walut w różnych językach obejmują umiejscowienie symbolu, przecinki dziesiętne a kropki dziesiętne, spacje oraz skróty a symbole.
  - Umiejscowienie symbolu: $100 lub 100$
  - Przecinki dziesiętne a kropki dziesiętne: 100,50$ lub 100.50$
  - Spacje: 100$ lub 100 $
  - Skróty a symbole: 100 $ lub 100 USD

**Jednostki miary**

- Zasadniczo prosimy o zachowanie jednostek miary zgodnie ze źródłem. Jeśli w Twoim kraju używany jest inny system, możesz podać przeliczenie w nawiasach.
- Poza lokalizacją jednostek miary, ważne jest również zwrócenie uwagi na różnice w podejściu języków do tych jednostek. Główną różnicą jest spacja między liczbą a jednostką, która może być różna w zależności od języka. Przykłady to 100kB a 100 kB lub 50ºF a 50 ºF.

## Podsumowanie {#conclusion}

Tłumaczenie ethereum.org to świetna okazja, aby dowiedzieć się o różnych aspektach Ethereum.

Podczas tłumaczenia staraj się nie spieszyć. Podejdź do tego na spokojnie i baw się dobrze!

Dziękujemy za zaangażowanie w Program Tłumaczeń i pomoc w udostępnieniu strony szerszemu gronu odbiorców. Społeczność Ethereum jest globalna i cieszymy się, że jesteś jej częścią!