---
title: Inteligentne kontrakty
description: Wprowadzenie do inteligentnych kontraktów w wersji nietechnicznej
lang: pl
---

# Wprowadzenie do inteligentnych kontraktów {#introduction-to-smart-contracts}

Inteligentne kontrakty to podstawowe bloki [aplikacji Ethereum](/dapps/). Są to programy komputerowe przechowywane w łańcuchu bloków, które umożliwiają przekształcenie tradycyjnych umów w ich cyfrowe odpowiedniki. Inteligentne kontrakty są skonstruowane bardzo logiczne — działają zgodnie z regułą „jeżeli to, to tamto”. Oznacza to, że zachowują się dokładnie tak, jak zostały zaprogramowane i nie można ich zmienić.

Termin „inteligentny kontrakt” stworzył Nick Szabo. W 1994 roku napisał [wprowadzenie do koncepcji](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) , a w 1996 roku [zbadał, co mogłyby umożliwić inteligentne kontrakty](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo przewidział rynek cyfrowy zbudowany na tych automatycznych, bezpiecznych procesach kryptograficznych. Miejsce, w którym transakcje i funkcje biznesowe mogą przebiegać bez potrzeby zaufania – bez pośredników. Inteligentne kontrakty na Ethereum wprowadzają tę wizję w życie.

## Co to są kontrakty? {#what-are-contracts}

Prawdopodobnie myślisz: _„Nie jestem prawnikiem! Dlaczego mam się zajmować kontraktami?”_ Dla większości ludzi kontrakty oznaczają niepotrzebnie długie umowy o warunkach lub nudne dokumenty prawne.

Kontrakty to tylko umowy. Oznacza to, że każda forma umowy może być objęta warunkami kontraktu. Umowy ustne lub umowy na papierze są dopuszczalne w wielu sprawach, ale nie są pozbawione wad.

### Zaufanie a kontrakty {#trust-and-contracts}

Jednym z największych problemów związanych z tradycyjnym kontraktem jest konieczność przestrzegania jego postanowień przez zaufane osoby.

Oto przykład:

Alicja i Bob urządzają sobie wyścig rowerowy. Przypuśćmy, że Alice założyła się z Bobem o 10 dolarów, że wygra wyścig. Bob jest przekonany, że to on będzie zwycięzcą, i przyjmuje zakład. Jednak Alice kończy wyścig znacznie przed Bobem i zdecydowanie wygrywa. Bob jednak odmawia wypłacenia pieniędzy z zakładu, twierdząc, że Alicja musiała oszukiwać.

Ten jaskrawy przykład ilustruje problem z dowolną umową nieinteligentną. Nawet jeśli warunki umowy zostaną spełnione (np. Ty jesteś zwycięzcą wyścigu), nadal musisz ufać innej osobie, że wywiąże się z umowy (np. wypłaci zakład).

## Inteligentne kontrakty {#smart-contracts}

Inteligentne kontrakty digitalizują umowy, przekształcając warunki umowy w kod komputerowy, który automatycznie wykonuje się, gdy warunki kontraktu są spełnione.

### Cyfrowy automat do sprzedaży {#vending-machine}

Prostą metaforą inteligentnego kontraktu jest automat sprzedający, który działa nieco podobnie do inteligentnego kontraktu — określone wejścia gwarantują z góry określone wyjścia.

- Wybierasz produkt.
- Automat sprzedający zwraca kwotę potrzebną do zakupu produktu.
- Wprowadzasz poprawną kwotę.
- Automat sprawdza, czy została włożona właściwa kwota.
- Automat sprzedający wydaje produkt.

Automat wyda żądany produkt dopiero po spełnieniu wszystkich wymagań. Jeśli nie wybierzesz produktu lub nie umieścisz wystarczającej ilości pieniędzy, automat sprzedający nie poda produktu.

### Automatyczne wykonanie {#automation}

Jedną z najbardziej znaczących korzyści, jakie mają inteligentne kontrakty w stosunku do zwykłych umów, jest to, że wynik jest automatycznie wykonywany po zrealizowaniu warunków umowy. Nie trzeba czekać na człowieka, aby zrealizować wynik. Innymi słowy, inteligentne kontrakty eliminują potrzebę zaufania.

Na przykład można napisać inteligentny kontrakt, który przechowuje środki finansowe na rzecz dziecka, umożliwiając mu wypłatę środków po określonej dacie. Gdyby ktoś próbował wycofać środki przed określoną datą, inteligentny kontrakt nie zostanie wykonany. Możesz też napisać kontrakt, który automatycznie udostępni Ci cyfrową wersję tytułu własności samochodu, gdy zapłacisz sprzedawcy.

### Przewidywalne wyniki {#predictability}

Czynnik ludzki jest jedną z najczęstszych przyczyn niepowodzeń w przypadku tradycyjnych umów. Na przykład dwóch różnych sędziów może w różny sposób interpretować tradycyjny kontrakt. Ich interpretacja może prowadzić do podejmowania różnych decyzji i rozbieżnych wyników. Inteligentne kontrakty eliminują możliwość różnych interpretacji. Zamiast tego, inteligentne kontrakty wykonują dokładnie to, co zostało zapisane w kodzie kontraktu. Dokładność ta oznacza, że w tych samych okolicznościach inteligentny kontrakt wygeneruje taki sam wynik.

### Rekord publiczny {#public-record}

Inteligentne kontrakty są również przydatne do celów kontroli i śledzenia. Ponieważ inteligentne kontrakty Ethereum znajdują się w publicznym łańcuchu bloków, każdy może natychmiast śledzić transfery aktywów i inne powiązane informacje. Na przykład możesz sprawdzić, czy ktoś wysłał pieniądze na Twój adres.

### Ochrona prywatności {#privacy-protection}

Inteligentne kontrakty mogą również chronić Twoją prywatność. Ponieważ Ethereum jest siecią pseudonimową (Twoje transakcje są związane publicznie z unikalnym adresem kryptograficznym, a nie z Twoją tożsamością), możesz chronić swoją prywatność przed obserwatorami.

### Widoczne terminy {#visible-terms}

Wreszcie, podobnie jak w przypadku umów, możesz sprawdzić, co jest w inteligentnym kontrakcie, zanim go podpiszesz (lub w inny sposób wejdziesz z nim w interakcję). Jeszcze lepsza przejrzystość warunków umowy oznacza, że każdy może ją obejrzeć.

## Przykłady wykorzystania inteligentnych kontraktów {#use-cases}

Tak więc inteligentne kontrakty to programy komputerowe, które istnieją w łańcuchu bloków. Mogą wykonywać je automatycznie. Możesz śledzić ich transakcje, przewidzieć, jak działają, a nawet używać ich pseudonimów. To jest fajne. Ale do czego są one dobry? Inteligentne kontrakty mogą zasadniczo robić wszystko, co robią inne programy komputerowe.

Mogą wykonywać obliczenia, tworzyć walutę, przechowywać dane, mint NFT, wysyłać komunikaty, a nawet generować grafikę. Oto kilka popularnych, rzeczywistych przykładów:

- [Stablecoiny](/stablecoins/)
- [Tworzenie i dystrybucja unikalnych zasobów cyfrowych](/nft/)
- [Automatyczna otwarta wymiana walut](/get-eth/#dex)
- [Zdecentralizowane gry](/dapps/?category=gaming)
- [Polisa ubezpieczeniowa automatycznie wypłacająca odszkodowanie](https://etherisc.com/)
- [Standard umożliwiający tworzenie niestandardowych, interoperacyjnych walut](/developers/docs/standards/tokens/)

## Jesteś raczej wzrokowcem? {#visual-learner}

Zobacz jak Finematics tłumaczy inteligentne kontrakty:

<YouTube id="pWGLtjG-F5c" />

## Dalsza lektura {#further-reading}

- [Jak inteligentne kontrakty zmienią świat](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Inteligentne kontrakty: Technologia łańcucha bloków, która zastąpi prawników](https://blockgeeks.com/guides/smart-contracts/)
- [Inteligentne kontrakty dla programistów](/developers/docs/smart-contracts/)
- [Naucz się pisać inteligentne kontrakty](/developers/learning-tools/)
- [Mastering Ethereum - Co to jest inteligentny kontrakt?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
