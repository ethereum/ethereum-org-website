---
title: Najlepsze praktyki projektowania zdecentralizowanych giełd (DEX)
description: Przewodnik wyjaśniający decyzje UX/UI dotyczące wymiany tokenów.
lang: pl
---

Od czasu uruchomienia Uniswap w 2018 roku, na dziesiątkach różnych sieci uruchomiono setki zdecentralizowanych giełd.
Wiele z nich wprowadziło nowe elementy lub dodało coś od siebie, ale interfejs pozostał w dużej mierze taki sam.

Jednym z powodów jest [prawo Jakoba](https://lawsofux.com/jakobs-law/):

> Użytkownicy spędzają większość czasu na innych stronach. Oznacza to, że wolą, aby Twoja strona działała w taki sam sposób, jak wszystkie inne strony, które już znają.

Dzięki wczesnym innowatorom, takim jak Uniswap, Pancakeswap i Sushiswap, użytkownicy zdecentralizowanych finansów (DeFi) mają wspólne wyobrażenie o tym, jak wygląda DEX.
Z tego powodu pojawia się obecnie coś w rodzaju „najlepszych praktyk”. Widzimy, że coraz więcej decyzji projektowych jest standaryzowanych na różnych stronach. Ewolucję giełd DEX można postrzegać jako gigantyczny przykład testowania na żywo. Rzeczy, które się sprawdziły, zostały, a te, które nie, zostały odrzucone. Wciąż jest miejsce na indywidualność, ale istnieją pewne standardy, do których DEX powinien się dostosować.

Ten artykuł jest podsumowaniem:
- tego, co należy uwzględnić
- jak uczynić to możliwie najbardziej użytecznym
- głównych sposobów dostosowywania projektu

Wszystkie przykładowe makiety (wireframes) zostały stworzone specjalnie na potrzeby tego artykułu, chociaż wszystkie opierają się na rzeczywistych projektach.

Zestaw Figma jest również dołączony na dole – zachęcamy do korzystania z niego i przyspieszenia tworzenia własnych makiet!

## Podstawowa anatomia DEX-a {#basic-anatomy-of-a-dex}

Interfejs użytkownika (UI) zazwyczaj składa się z trzech elementów:
1. Głównego formularza
2. Przycisku
3. Panelu szczegółów

![Generic DEX UI, showing the three main elements](./1.png)


## Warianty {#variations}

Będzie to powracający motyw w tym artykule, ale istnieje wiele różnych sposobów organizacji tych elementów. „Panel szczegółów” może znajdować się:
- Nad przyciskiem
- Pod przyciskiem
- W ukrytym panelu rozwijanym (akordeonie)
- I/lub w oknie modalnym „podglądu”
  
Uwaga: Okno modalne „podglądu” jest opcjonalne, ale jeśli w głównym interfejsie pokazujesz bardzo mało szczegółów, staje się ono niezbędne.

## Struktura głównego formularza {#structure-of-the-main-form}

Jest to pole, w którym faktycznie wybierasz token, który chcesz wymienić. Komponent składa się z pola wprowadzania danych i małego przycisku w jednym rzędzie.

Giełdy DEX zazwyczaj wyświetlają dodatkowe szczegóły w jednym rzędzie powyżej i jednym rzędzie poniżej, chociaż można to skonfigurować inaczej.

![Input row, with a details row above and below](./2.png)

## Warianty {#variations2}

Pokazano tutaj dwa warianty interfejsu użytkownika; jeden bez żadnych obramowań, tworzący bardzo otwarty projekt, oraz drugi, w którym wiersz wprowadzania danych ma obramowanie, co skupia uwagę na tym elemencie.

![Two UI variations of the main form](./3.png)

Ta podstawowa struktura pozwala na wyświetlenie **czterech kluczowych informacji** w projekcie: po jednej w każdym rogu. Jeśli istnieje tylko jeden górny/dolny rząd, dostępne są tylko dwa miejsca.

Podczas ewolucji zdecentralizowanych finansów (DeFi) umieszczano tu wiele różnych rzeczy.

## Kluczowe informacje do uwzględnienia {#key-info-to-include}

- Saldo w portfelu
- Przycisk „Max”
- Równowartość w walucie fiducjarnej (fiat)
- Wpływ na cenę dla „otrzymywanej” kwoty

W początkach DeFi często brakowało równowartości w walucie fiducjarnej. Jeśli budujesz jakikolwiek projekt Web3, konieczne jest wyświetlanie równowartości w walucie fiat. Użytkownicy nadal myślą w kategoriach lokalnych walut, więc aby dopasować się do modeli mentalnych ze świata rzeczywistego, należy to uwzględnić.

W drugim polu (tym, w którym wybierasz token, na który wymieniasz) możesz również uwzględnić wpływ na cenę obok kwoty w walucie fiducjarnej, obliczając różnicę między kwotą wejściową a szacowanymi kwotami wyjściowymi. Jest to bardzo przydatny szczegół do uwzględnienia.

Przyciski procentowe (np. 25%, 50%, 75%) mogą być przydatną funkcją, ale zajmują więcej miejsca, dodają więcej wezwań do działania (CTA) i zwiększają obciążenie poznawcze. To samo dotyczy suwaków procentowych. Niektóre z tych decyzji dotyczących interfejsu użytkownika będą zależeć od Twojej marki i typu użytkownika.

Dodatkowe szczegóły można wyświetlić pod głównym formularzem. Ponieważ tego typu informacje są przeznaczone głównie dla zaawansowanych użytkowników, sensowne jest:
- ograniczenie ich do minimum, lub;
- ukrycie ich w panelu rozwijanym (akordeonie)

![Details shown in the corners of that main form](./4.png)

## Dodatkowe informacje do uwzględnienia {#extra-info-to-include}

- Cena tokena
- Poślizg cenowy
- Minimum do otrzymania
- Oczekiwana kwota wyjściowa
- Wpływ na cenę
- Szacunkowy koszt gazu
- Inne opłaty
- Routing zleceń

Można argumentować, że niektóre z tych szczegółów mogłyby być opcjonalne.

Routing zleceń jest interesujący, ale dla większości użytkowników nie ma większego znaczenia.

Niektóre inne szczegóły to po prostu powtarzanie tego samego na różne sposoby. Na przykład „minimum do otrzymania” i „poślizg cenowy” to dwie strony tego samego medalu. Jeśli masz poślizg cenowy ustawiony na 1%, to minimum, jakiego możesz oczekiwać = oczekiwana kwota wyjściowa - 1%. Niektóre interfejsy pokazują oczekiwaną kwotę, minimalną kwotę i poślizg cenowy... Co jest przydatne, ale prawdopodobnie przesadzone. 

Większość użytkowników i tak pozostawi domyślny poślizg cenowy.

„Wpływ na cenę” jest często pokazywany w nawiasach obok równowartości w walucie fiducjarnej w polu „do”. Jest to świetny szczegół UX do dodania, ale jeśli jest pokazywany tutaj, czy naprawdę musi być pokazywany ponownie poniżej? A potem jeszcze raz na ekranie podglądu?

Wielu użytkowników (zwłaszcza tych wymieniających małe kwoty) nie będzie dbać o te szczegóły; po prostu wpiszą liczbę i klikną wymianę.

![Some details show the same thing](./5.png)

To, jakie dokładnie szczegóły zostaną pokazane, będzie zależeć od Twoich odbiorców i tego, jaki charakter ma mieć aplikacja.

Jeśli uwzględnisz tolerancję na poślizg cenowy w panelu szczegółów, powinieneś również umożliwić jej edycję bezpośrednio z tego miejsca. Jest to dobry przykład „akceleratora”; sprytnego triku UX, który może przyspieszyć przepływ doświadczonych użytkowników, bez wpływu na ogólną użyteczność aplikacji.

![Slippage can be controlled from the details panel](./6.png)

Warto dokładnie przemyśleć nie tylko jedną konkretną informację na jednym ekranie, ale cały przepływ:
Wprowadzanie liczb w głównym formularzu → Skanowanie szczegółów → Kliknięcie ekranu podglądu (jeśli masz ekran podglądu). 
Czy panel szczegółów powinien być widoczny przez cały czas, czy użytkownik musi go kliknąć, aby go rozwinąć?
Czy powinieneś tworzyć tarcie, dodając ekran podglądu? Zmusza to użytkownika do zwolnienia i przemyślenia swojej transakcji, co może być przydatne. Ale czy chcą ponownie zobaczyć te same informacje? Co jest dla nich najbardziej przydatne w tym momencie?

## Opcje projektowe {#design-options}

Jak już wspomniano, wiele zależy od Twojego osobistego stylu.
Kim jest Twój użytkownik?
Jaka jest Twoja marka?
Czy chcesz interfejsu „pro” pokazującego każdy szczegół, czy wolisz minimalizm?
Nawet jeśli celujesz w profesjonalnych użytkowników, którzy chcą wszystkich możliwych informacji, powinieneś pamiętać mądre słowa Alana Coopera:

> Niezależnie od tego, jak piękny, jak fajny jest twój interfejs, byłoby lepiej, gdyby było go mniej.

### Struktura {#structure}

- tokeny po lewej lub tokeny po prawej stronie
- 2 rzędy lub 3
- szczegóły nad lub pod przyciskiem
- szczegóły rozwinięte, zminimalizowane lub niewyświetlane

### Styl komponentu {#component-style}

- pusty
- z obramowaniem
- wypełniony

Z czystego punktu widzenia UX, styl UI ma mniejsze znaczenie, niż myślisz. Trendy wizualne przychodzą i odchodzą w cyklach, a wiele preferencji jest subiektywnych.

Najprostszym sposobem, aby to poczuć – i pomyśleć o różnych konfiguracjach – jest przyjrzenie się kilku przykładom, a następnie samodzielne poeksperymentowanie.

Dołączony zestaw Figma zawiera puste, obramowane i wypełnione komponenty.

Spójrz na poniższe przykłady, aby zobaczyć różne sposoby na połączenie tego wszystkiego:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Ale po której stronie powinien znajdować się token? {#but-which-side-should-the-token-go-on}

Koniec końców, prawdopodobnie nie robi to ogromnej różnicy dla użyteczności. Należy jednak pamiętać o kilku rzeczach, które mogą skłonić Cię do wyboru jednej lub drugiej opcji.

Dość interesujące było obserwowanie, jak moda zmienia się z czasem. Uniswap początkowo miał token po lewej stronie, ale od tego czasu przeniósł go na prawą. Sushiswap również dokonał tej zmiany podczas aktualizacji projektu. Większość, ale nie wszystkie, protokoły poszły w ich ślady.

Konwencja finansowa tradycyjnie umieszcza symbol waluty przed liczbą, np. $50, €50, £50, ale *mówimy* 50 dolarów, 50 euro, 50 funtów.

Dla przeciętnego użytkownika – zwłaszcza kogoś, kto czyta od lewej do prawej, z góry na dół – token po prawej stronie prawdopodobnie wydaje się bardziej naturalny.

![A UI with tokens on the left](./13.png)

Umieszczenie tokena po lewej stronie i wszystkich liczb po prawej wygląda przyjemnie symetrycznie, co jest plusem, ale ten układ ma też inną wadę.

Prawo bliskości mówi, że elementy znajdujące się blisko siebie są postrzegane jako powiązane. W związku z tym chcemy umieszczać powiązane elementy obok siebie. Saldo tokena jest bezpośrednio powiązane z samym tokenem i zmieni się za każdym razem, gdy zostanie wybrany nowy token. Dlatego nieco bardziej sensowne jest, aby saldo tokena znajdowało się obok przycisku wyboru tokena. Można by je przenieść pod token, ale to zaburza symetrię układu.

Ostatecznie obie opcje mają swoje plusy i minusy, ale ciekawe jest to, że trend wydaje się zmierzać w kierunku tokena po prawej stronie.

## Zachowanie przycisku {#button-behavior}

Nie twórz osobnego przycisku do zatwierdzania. Nie wymagaj też osobnego kliknięcia, aby zatwierdzić. Użytkownik chce dokonać wymiany, więc po prostu napisz „wymiana” na przycisku i zainicjuj zatwierdzenie jako pierwszy krok. Okno modalne może pokazywać postęp za pomocą wskaźnika kroków lub prostego powiadomienia „transakcja 1 z 2 - zatwierdzanie”.

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Przycisk jako pomoc kontekstowa {#button-as-contextual-help}

Przycisk może pełnić podwójną funkcję jako alert!

Jest to w rzeczywistości dość nietypowy wzorzec projektowy poza Web3, ale stał się w nim standardem. To dobra innowacja, ponieważ oszczędza miejsce i skupia uwagę.

Jeśli główna akcja – WYMIANA – jest niedostępna z powodu błędu, powód można wyjaśnić za pomocą przycisku, np.:

- zmień sieć
- podłącz portfel
- różne błędy

Przycisk może być również **przypisany do akcji**, którą należy wykonać. Na przykład, jeśli użytkownik nie może dokonać wymiany, ponieważ znajduje się w niewłaściwej sieci, przycisk powinien mówić „przełącz na Ethereum”, a gdy użytkownik kliknie przycisk, powinien przełączyć sieć na Ethereum. To znacznie przyspiesza przepływ użytkownika.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Zbuduj własny za pomocą tego pliku Figma {#build-your-own-with-this-figma-file}

Dzięki ciężkiej pracy wielu protokołów, projektowanie DEX-ów uległo znacznej poprawie. Wiemy, jakich informacji potrzebuje użytkownik, jak powinniśmy je pokazywać i jak sprawić, by przepływ był jak najbardziej płynny.
Mamy nadzieję, że ten artykuł stanowi solidny przegląd zasad UX. 

Jeśli chcesz poeksperymentować, zachęcamy do skorzystania z zestawu makiet Figma. Jest on tak prosty, jak to tylko możliwe, ale ma wystarczającą elastyczność, aby zbudować podstawową strukturę na różne sposoby.

[Zestaw makiet Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

Zdecentralizowane finanse (DeFi) będą nadal ewoluować i zawsze jest miejsce na ulepszenia. 

Powodzenia!