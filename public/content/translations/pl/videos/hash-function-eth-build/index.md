---
title: "Funkcja skrótu — ETH.BUILD"
description: "Demonstracja kryptograficznych funkcji skrótu za pomocą narzędzia edukacyjnego ETH.BUILD. Dowiedz się, jak działają funkcje skrótu i dlaczego są one fundamentalne dla modelu kont i integralności danych w Ethereum."
lang: pl
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Funkcje skrótu (ETH.BUILD)"
---

Samouczek autorstwa **Austina Griffitha** demonstrujący, jak działają kryptograficzne funkcje skrótu za pomocą narzędzia do programowania wizualnego ETH.BUILD, obejmujący determinizm, stałą długość danych wyjściowych, jednokierunkowość oraz drzewa Merklego.

*Poniższa transkrypcja jest przystępną kopią [oryginalnej transkrypcji wideo](https://www.youtube.com/watch?v=QJ010l-pBpE) opublikowanej przez Austina Griffitha. Została ona nieznacznie zredagowana w celu poprawy czytelności.*

### Wprowadzenie do funkcji skrótu (0:00) {#introduction-to-hash-functions-000}

To pierwszy film z serii o nazwie ETH.BUILD. Możesz wejść na stronę eth.build, aby skorzystać z tego narzędzia, ale służy ono głównie do zabawy i zrozumienia, jak wszystko działa podczas budowania na Ethereum.

Pierwszym modułem, któremu się przyjrzymy, jest funkcja skrótu. Czym w ogóle jest funkcja skrótu? Cóż, to coś w rodzaju odcisku palca. Masz dane wejściowe — może to być cokolwiek — ale na razie użyjemy tekstu „hello world”. Z drugiej strony otrzymasz dane wyjściowe, a te dane to 64-znakowy ciąg szesnastkowy. Wyświetla się 66 znaków ze względu na prefiks „0x”, ale w rzeczywistości jest to 64-znakowy ciąg szesnastkowy.

### Wizualizacja hashów jako kolorów (0:50) {#visualizing-hashes-as-colors-050}

Jeśli spojrzysz na system szesnastkowy, przypomina on nieco kolor i może być łatwiej opisać to, co tu widzimy, jeśli po prostu zamienimy to na kolor. Zrobimy więc tak: weźmiemy pierwsze sześć znaków dowolnego ciągu i wyświetlimy je jako kolor. Jeśli na to spojrzymy, zobaczymy ładny fioletowy kolor.

Zobaczmy, jakiego koloru jest moje imię — proszę bardzo, ładna leśna zieleń. Teraz wróćmy do „hello world” — znowu mamy ten fiolet.

### Determinizm i stała długość danych wyjściowych (1:38) {#determinism-and-fixed-length-output-138}

Właśnie odkryliśmy, że jest to deterministyczne. Zasadniczo, cokolwiek wprowadzimy jako dane wejściowe, zawsze otrzymamy to samo po drugiej stronie.

Drugą właściwością jest to, że można wprowadzić cokolwiek o dowolnym rozmiarze. Mogę uderzać w klawiaturę i patrzeć, jak zmienia się kolor, ale ten ciąg znaków pozostaje przy długości 66 znaków. Bez względu na to, co tu wprowadzisz — nawet plik — mógłbym wrzucić ten plik z Leo, moim synem, i wprowadzić go jako hash, otrzymując ładny pomarańczowy kolor. Następnie mógłbym wrzucić dokument tekstowy z listą słów BIP i uzyskać ten ładny jasnoniebieski. Jeśli przywrócę Leo, zgadnij, jakiego będzie koloru? Wiemy, że będzie to ten pomarańczowy. Otrzymujesz ten deterministyczny odcisk palca rzeczy, którą wprowadziłeś.

### Właściwość jednokierunkowości (2:37) {#one-directional-property-237}

Kolejną najważniejszą właściwością jest to, że jest jednokierunkowa. Jeśli ponownie wpiszę „hello world”, otrzymamy ten hash „4717”. Jeśli weźmiemy ten hash, wyślemy go komuś i powiemy: „oto hash mojego sekretu — jeśli odgadniesz mój sekret, dam ci sto dolców”, nie będą w stanie nawet się zbliżyć.

Załóżmy, że hash zaczyna się od „4717”, a oni zaczynają szukać dopasowania. Nie można po prostu zmieniać małych znaków i zbliżać się do celu — albo trafisz, albo nie. Zasadniczo musisz zgadywać metodą siłową (brute-force). Jeśli przypadkiem zgadną „hello world”, otrzymają odpowiedź, ale jeśli nie zgadną, nigdy jej nie zdobędą. Nie ma sposobu, aby stwierdzić, czy jesteś coraz bliżej.

Zauważysz, że kryptografia bywa czasami frustrująca dla programisty, ponieważ coś albo działa, albo nie — nie otrzymujesz żadnych wskazówek, czy jesteś blisko. Ale to dobra rzecz. To jest właśnie właściwość, której oczekujemy od funkcji skrótu.

### Podsumowanie właściwości funkcji skrótu (3:43) {#summary-of-hash-function-properties-343}

Mamy więc: cokolwiek o dowolnym rozmiarze może zostać wprowadzone do funkcji skrótu, a ona wypluje dokładny 64-znakowy szesnastkowy odcisk palca tych danych. Jest to deterministyczne. Jest jednokierunkowe — nie można cofnąć się w drugą stronę. Bardzo łatwo jest stworzyć hash, ale bardzo trudno jest odgadnąć sekret hasha.

### Drzewa Merklego i łączenie hashów (4:06) {#merkle-trees-and-combining-hashes-406}

To, co możemy z tym zrobić, to naprawdę fajne rzeczy, takie jak drzewo Merklego. Mamy nasze trzy dane wejściowe i moglibyśmy je połączyć. Możemy połączyć wszystkie te hashe, a następnie zahashować tę kombinację.

Ten kolor tutaj — ten fioletowy — reprezentuje hash wszystkich tych hashów. Jeśli zmienię „hello world” na „hello world one”, ten fiolet się zmieni. Każda najmniejsza zmiana w którymkolwiek z tych wejść spowoduje zmianę końcowego hasha. Możesz wprowadzać różnego rodzaju dane na wiele różnych sposobów — nawet mieć drzewo hashów, drzewo Merklego — lub mieć kilka bloków z rzędu, a ten końcowy hash będzie oparty na wszystkich tych rzeczach. Jeśli jakakolwiek drobnostka zmieni się gdziekolwiek po drodze, końcowy hash ulegnie zmianie.

### Kluczowy wniosek (5:53) {#key-takeaway-553}

Kluczowym wnioskiem jest to, że funkcja skrótu jest w zasadzie jak odcisk palca. Jeśli coś wpiszę, deterministycznie otrzymam oczekiwany wynik. To jest właśnie funkcja skrótu — witaj w ETH.BUILD. Stwórzmy kilka fajnych rzeczy i nauczmy się wiele po drodze.