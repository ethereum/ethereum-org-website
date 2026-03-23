---
title: "Najlepsze praktyki projektowania zdecentralizowanej giełdy (DEX)"
description: "Przewodnik wyjaśniający decyzje UX/UI dotyczące wymiany tokenów."
lang: pl
---

Od czasu uruchomienia Uniswap w 2018 roku na dziesiątkach różnych łańcuchów uruchomiono setki zdecentralizowanych giełd.
Wiele z nich wprowadziło nowe elementy lub własne modyfikacje, ale interfejs ogólnie pozostał taki sam.

Jednym z tego powodów jest [prawo Jakoba](https://lawsofux.com/jakobs-law/):

> Użytkownicy spędzają większość czasu na innych stronach. Oznacza to, że użytkownicy wolą, aby Twoja strona działała w taki sam sposób, jak wszystkie inne strony, które już znają.

Dzięki wczesnym innowatorom, takim jak Uniswap, Pancakeswap i Sushiswap, użytkownicy DeFi mają wspólne wyobrażenie o tym, jak wygląda DEX.
Z tego powodu pojawia się teraz coś w rodzaju „najlepszej praktyki”. Widzimy, że coraz więcej decyzji projektowych jest standaryzowanych na różnych stronach. Ewolucję giełd DEX można postrzegać jako ogromny przykład testowania na żywo. To, co działało, pozostało, a to, co nie, zostało odrzucone. Nadal jest miejsce na indywidualność, ale istnieją pewne standardy, do których giełda DEX powinna się dostosować.

Ten artykuł jest podsumowaniem:

- co należy uwzględnić
- jak sprawić, by było to jak najbardziej użyteczne
- głównych sposobów dostosowywania projektu

Wszystkie przykładowe makiety zostały stworzone specjalnie na potrzeby tego artykułu, chociaż wszystkie opierają się na prawdziwych projektach.

Zestaw Figma znajduje się również na dole – możesz go używać i przyspieszyć tworzenie własnych makiet!

## Podstawowa anatomia giełdy DEX {#basic-anatomy-of-a-dex}

Interfejs użytkownika zazwyczaj zawiera trzy elementy:

1. Główny formularz
2. Przycisk
3. Panel szczegółów

![Ogólny interfejs użytkownika DEX, pokazujący trzy główne elementy](./1.png)

## Wariacje {#variations}

Będzie to częsty motyw w tym artykule, ale istnieje wiele różnych sposobów organizacji tych elementów. „Panel szczegółów” może znajdować się:

- Powyżej przycisku
- Poniżej przycisku
- Ukryty w panelu akordeonowym
- I/lub w oknie modalnym „podglądu”

N.B. Okno modalne „podglądu” jest opcjonalne, ale jeśli w głównym interfejsie użytkownika wyświetlasz bardzo mało szczegółów, staje się ono niezbędne.

## Struktura głównego formularza {#structure-of-the-main-form}

Jest to pole, w którym faktycznie wybierasz, który token chcesz wymienić. Komponent składa się z pola wejściowego i małego przycisku w jednym rzędzie.

Giełdy DEX zazwyczaj wyświetlają dodatkowe szczegóły w jednym rzędzie powyżej i jednym poniżej, chociaż można to skonfigurować inaczej.

![Wiersz wejściowy z wierszem szczegółów powyżej i poniżej](./2.png)

## Wariacje {#variations2}

Pokazano tu dwie wariacje interfejsu użytkownika: jedną bez obramowań, tworzącą bardzo otwarty projekt, i drugą, w której wiersz wejściowy ma obramowanie, skupiając uwagę na tym elemencie.

![Dwie wariacje interfejsu użytkownika głównego formularza](./3.png)

Ta podstawowa struktura pozwala na pokazanie w projekcie **czterech kluczowych informacji**: po jednej w każdym rogu. Jeśli jest tylko jeden górny/dolny wiersz, to są tylko dwa miejsca.

Podczas ewolucji DeFi uwzględniono tu wiele różnych rzeczy.

## Kluczowe informacje do uwzględnienia {#key-info-to-include}

- Saldo w portfelu
- Przycisk Max
- Ekwiwalent w walucie fiducjarnej
- Wpływ na cenę dla „otrzymanej” kwoty

We wczesnych dniach DeFi często brakowało ekwiwalentu w walucie fiducjarnej. Jeśli tworzysz jakikolwiek projekt Web3, niezbędne jest pokazanie ekwiwalentu w walucie fiducjarnej. Użytkownicy nadal myślą w kategoriach lokalnych walut, więc aby dopasować się do rzeczywistych modeli myślowych, należy to uwzględnić.

W drugim polu (tym, w którym wybierasz token, na który wymieniasz) możesz również uwzględnić wpływ na cenę obok kwoty w walucie fiducjarnej, obliczając różnicę między kwotą wejściową a szacowaną kwotą wyjściową. Jest to dość przydatny szczegół do uwzględnienia.

Przyciski procentowe (np. 25%, 50%, 75%) mogą być użyteczną funkcją, ale zajmują więcej miejsca, dodają więcej wezwań do działania i zwiększają obciążenie psychiczne. To samo dotyczy suwaków procentowych. Niektóre z tych decyzji dotyczących interfejsu użytkownika będą zależeć od Twojej marki i typu użytkownika.

Dodatkowe szczegóły mogą być pokazane poniżej głównego formularza. Ponieważ tego typu informacje są przeznaczone głównie dla zaawansowanych użytkowników, sensowne jest, aby:

- utrzymać je na jak najbardziej minimalnym poziomie lub;
- ukryć je w panelu akordeonowym

![Szczegóły pokazane w rogach tego głównego formularza](./4.png)

## Dodatkowe informacje do uwzględnienia {#extra-info-to-include}

- Cenę tokenów
- Poślizg
- Minimalna otrzymana kwota
- Oczekiwana kwota
- Wpływ na cenę
- Szacowany koszt gazu
- Inne opłaty
- Routing zleceń

Niewątpliwie niektóre z tych szczegółów mogą być opcjonalne.

Routing zleceń jest interesujący, ale dla większości użytkowników nie robi dużej różnicy.

Niektóre inne szczegóły to po prostu powtórzenie tego samego na różne sposoby. Na przykład „minimalna otrzymana kwota” i „poślizg” to dwie strony tego samego medalu. Jeśli masz ustawiony poślizg na 1%, to minimalna kwota, jaką możesz otrzymać = oczekiwana kwota - 1%. Niektóre interfejsy użytkownika pokażą oczekiwaną kwotę, minimalną kwotę i poślizg… Co jest przydatne, ale być może to przesada.

Większość użytkowników i tak zostawi domyślny poślizg.

„Wpływ na cenę” jest często pokazywany w nawiasach obok ekwiwalentu w walucie fiducjarnej w polu „do”. To świetny szczegół UX do dodania, ale jeśli jest pokazany tutaj, czy naprawdę musi być pokazany ponownie poniżej? A potem znowu na ekranie podglądu?

Wielu użytkowników (szczególnie tych wymieniających małe kwoty) nie będzie przejmować się tymi szczegółami; po prostu wpiszą liczbę i klikną „wymień”.

![Niektóre szczegóły pokazują to samo](./5.png)

To, jakie dokładnie szczegóły są pokazywane, zależeć będzie od Twoich odbiorców i od tego, jakie odczucia ma wywoływać aplikacja.

Jeśli uwzględnisz tolerancję poślizgu w panelu szczegółów, powinieneś również umożliwić jej edycję bezpośrednio stąd. To dobry przykład „akceleratora”; zgrabna sztuczka UX, która może przyspieszyć przepływy pracy doświadczonych użytkowników, nie wpływając na ogólną użyteczność aplikacji.

![Poślizg można kontrolować z panelu szczegółów](./6.png)

Dobrym pomysłem jest dokładne przemyślenie nie tylko jednej konkretnej informacji na jednym ekranie, ale całego przepływu: Wprowadzanie liczb w głównym formularzu → Skanowanie szczegółów → Kliknięcie ekranu podglądu (jeśli masz ekran podglądu).
Czy panel szczegółów powinien być widoczny przez cały czas, czy użytkownik musi go kliknąć, aby go rozwinąć?
Czy powinieneś tworzyć tarcie, dodając ekran podglądu? Zmusza to użytkownika do zwolnienia i przemyślenia swojej transakcji, co może być przydatne. Ale czy chcą znowu widzieć te same informacje? Co jest dla nich najbardziej przydatne w tym momencie?

## Opcje projektowe {#design-options}

Jak wspomniano, wiele z tego sprowadza się do Twojego osobistego stylu
Kim jest Twój użytkownik?
Jaka jest Twoja marka?
Czy chcesz interfejsu „pro” pokazującego każdy szczegół, czy chcesz być minimalistą?
Nawet jeśli celujesz w zaawansowanych użytkowników, którzy chcą wszystkich możliwych informacji, powinieneś pamiętać o mądrych słowach Alana Coopera:

> Niezależnie od tego, jak piękny i fajny jest Twój interfejs, byłoby lepiej, gdyby było go mniej.

### Struktura {#structure}

- tokeny po lewej lub tokeny po prawej stronie
- 2 rzędy lub 3
- szczegóły nad lub pod przyciskiem
- szczegóły rozwinięte, zminimalizowane lub niepokazane

### Styl komponentu {#component-style}

- pusty
- obramowany
- wypełniony

Z czysto UX-owego punktu widzenia, styl interfejsu użytkownika ma mniejsze znaczenie, niż myślisz. Trendy wizualne przychodzą i odchodzą cyklicznie, a wiele preferencji jest subiektywnych.

Najłatwiejszym sposobem, aby to wyczuć – i pomyśleć o różnych konfiguracjach – jest przyjrzenie się kilku przykładom, a następnie samodzielne poeksperymentowanie.

Dołączony zestaw Figma zawiera puste, obramowane i wypełnione komponenty.

Spójrz na poniższe przykłady, aby zobaczyć różne sposoby, w jakie możesz to wszystko połączyć:

![3 rzędy w stylu wypełnionym](./7.png)

![3 rzędy w stylu obramowanym](./8.png)

![2 rzędy w stylu pustym](./9.png)

![3 rzędy w stylu obramowanym, z panelem szczegółów](./10.png)

![3 rzędy z wierszem wejściowym w stylu obramowanym](./11.png)

![2 rzędy w stylu wypełnionym](./12.png)

## Ale po której stronie powinien znaleźć się token? {#but-which-side-should-the-token-go-on}

Konkluzja jest taka, że prawdopodobnie nie ma to większego wpływu na użyteczność. Jest jednak kilka rzeczy, o których należy pamiętać, a które mogą Cię skłonić w jedną lub drugą stronę.

Dość interesujące jest obserwowanie, jak moda zmienia się z czasem. Początkowo Uniswap miał token po lewej stronie, ale od tego czasu przeniósł go na prawo. Sushiswap również dokonał tej zmiany podczas aktualizacji projektu. Większość, ale nie wszystkie, protokoły poszły w ich ślady.

Zgodnie z konwencją finansową, symbol waluty tradycyjnie umieszcza się przed liczbą, np. $50, €50, £50, ale _mówimy_ 50 dolarów, 50 euro, 50 funtów.

Dla ogólnego użytkownika - zwłaszcza kogoś, kto czyta od lewej do prawej, od góry do dołu - token po prawej stronie prawdopodobnie wydaje się bardziej naturalny.

![Interfejs użytkownika z tokenami po lewej stronie](./13.png)

Umieszczenie tokena po lewej stronie, a wszystkich liczb po prawej, wygląda przyjemnie symetrycznie, co jest plusem, ale ten układ ma też wadę.

Prawo bliskości mówi, że elementy, które są blisko siebie, są postrzegane jako powiązane. W związku z tym chcemy umieszczać powiązane elementy obok siebie. Saldo tokena jest bezpośrednio związane z samym tokenem i zmieni się za każdym razem, gdy zostanie wybrany nowy token. Dlatego ma nieco więcej sensu, aby saldo tokena znajdowało się obok przycisku wyboru tokena. Można by go przenieść pod token, ale to psuje symetrię układu.

Ostatecznie obie opcje mają swoje plusy i minusy, ale interesujące jest to, jak trend wydaje się zmierzać w kierunku tokena po prawej stronie.

## Zachowanie przycisku {#button-behavior}

Nie twórz osobnego przycisku do zatwierdzania. Nie twórz też osobnego kliknięcia do zatwierdzania. Użytkownik chce dokonać wymiany (Swap), więc po prostu umieść napis „wymień” na przycisku i zainicjuj zatwierdzenie jako pierwszy krok. Okno modalne może pokazywać postęp za pomocą steppera lub prostego powiadomienia „transakcja 1 z 2 – zatwierdzanie”.

![Interfejs użytkownika z osobnymi przyciskami do zatwierdzania i wymiany](./14.png)

![Interfejs użytkownika z jednym przyciskiem z napisem „zatwierdź”](./15.png)

### Przycisk jako pomoc kontekstowa {#button-as-contextual-help}

Przycisk może pełnić podwójną funkcję jako alert!

Jest to w rzeczywistości dość nietypowy wzorzec projektowy poza Web3, ale stał się standardem w jego obrębie. To dobra innowacja, ponieważ oszczędza miejsce i utrzymuje skupienie uwagi.

Jeśli główna akcja – WYMIANA (SWAP) – jest niedostępna z powodu błędu, przyczyna może być wyjaśniona za pomocą przycisku, np.:

- przełącz sieć
- połącz portfel
- różne błędy

Przycisk może być również **zmapowany do akcji**, która musi zostać wykonana. Na przykład, jeśli użytkownik nie może dokonać wymiany, ponieważ jest w niewłaściwej sieci, przycisk powinien mieć napis „przełącz na Ethereum”, a gdy użytkownik kliknie przycisk, powinien przełączyć sieć na Ethereum. To znacznie przyspiesza przepływ pracy użytkownika.

![Kluczowe akcje inicjowane z głównego CTA](./16.png)

![Komunikat o błędzie pokazany w głównym CTA](./17.png)

## Zbuduj własny za pomocą tego pliku Figma {#build-your-own-with-this-figma-file}

Dzięki ciężkiej pracy wielu protokołów projektowanie giełd DEX znacznie się poprawiło. Wiemy, jakich informacji potrzebuje użytkownik, jak powinniśmy je pokazywać i jak sprawić, by przepływ był jak najbardziej płynny.
Mam nadzieję, że ten artykuł stanowi solidny przegląd zasad UX.

Jeśli chcesz poeksperymentować, możesz skorzystać z zestawu makiet Figma. Jest tak prosty, jak to tylko możliwe, ale ma wystarczającą elastyczność, aby budować podstawową strukturę na różne sposoby.

[Zestaw makiet Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi będzie nadal ewoluować i zawsze jest miejsce na ulepszenia.

Powodzenia!
