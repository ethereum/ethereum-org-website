---
title: "Często zadawane pytania (FAQ) dotyczące Programu Tłumaczeń"
lang: pl
description: "Najczęściej zadawane pytania dotyczące Programu Tłumaczeń ethereum.org"
---

# Przewodnik po tłumaczeniu ethereum.org {#translating-ethereum-guide}

Jeśli jesteś nowy w Programie Tłumaczeń i wahasz się, czy dołączyć, oto kilka najczęściej zadawanych pytań, które pomogą zacząć. Użyj tego przewodnika, aby znaleźć odpowiedzi na najpopularniejsze zapytania.

## Czy mogę otrzymać rekompensatę za tłumaczenie ethereum.org? {#compensation}

Ethereum.org jest otwarto-źródłową stroną internetową, co oznacza, że każdy może się zaangażować i wnieść swój wkład.

Program Tłumaczeń ethereum.org jest jego rozszerzeniem i jest zorganizowany z podobną filozofią.

Program Tłumaczeń ma na celu udostępnienie wszystkim treści Ethereum, niezależnie od języków, którymi mówią. Pozwala również każdej osobie dwujęzycznej zaangażowanie się w ekosystem Ethereum i przyczynienie się, aby zrobić go bardziej dostępnym.

Z tego powodu Program Tłumaczeń jest otwarty i dobrowolny, a uczestnictwo nie podlega rekompensacie. Gdybyśmy mieli wynagradzać tłumaczy za liczbę przetłumaczonych przez nich słów, moglibyśmy zaprosić do Programu Tłumaczeń tylko tych, którzy mają wystarczające doświadczenie w tłumaczeniu (profesjonalnych tłumaczy). To sprawiłoby, że Program Tłumaczeń stałby się wybiórczy i uniemożliwiłoby nam osiągnięcie wytyczonych celów, w szczególności: umożliwienie wszystkim uczestnictwa i zaangażowania się w ekosystemie.

Dokładamy wszelkich starań, aby umożliwić naszym współtwórcom odniesienie sukcesu w ekosystemie Ethereum; istnieje wiele niematerialnych zachęt, takich jak: [oferowanie POAP-ów](/contributing/translation-program/acknowledgements/#poap) i [certyfikat tłumacza](/contributing/translation-program/acknowledgements/#certificate), a także organizowanie [Rankingów tłumaczy](/contributing/translation-program/acknowledgements/) i [umieszczanie wszystkich naszych tłumaczy na stronie](/contributing/translation-program/contributors/).

## Jak tłumaczyć ciągi znaków z `<tagami HTML>`? {#tags}

Nie każdy ciąg jest zapisany w czystej formie tekstowej. Niektóre ciągi znaków składają się z mieszanych skryptów, takich jak znaczniki HTML (`<0>`, `</0>`). Zazwyczaj dotyczy to hiperłączy lub alternatywnej stylizacji w środku zdania.

- Przetłumacz tekst wewnątrz tagów, ale nie same tagi. Niczego, co znajduje się między znakami `<` i `>`, nie wolno tłumaczyć ani usuwać.
- Aby zachować bezpieczeństwo ciągu, zalecamy kliknięcie przycisku „Kopiuj tekst źródłowy” w lewym dolnym rogu. Spowoduje to skopiowanie oryginalnego ciągu i wklejenie go do pola tekstowego. Pozwala to wyjaśnić, gdzie znajdują się tagi i pomaga uniknąć błędów.

![Interfejs Crowdin z podświetlonym przyciskiem do kopiowania tekstu źródłowego](./html-tag-strings.png)

Możesz zmieniać położenie tagów w ciągu, aby uczynić je bardziej naturalnymi w swoim języku – pamiętaj tylko, aby przesunąć cały tag.

Aby uzyskać bardziej szczegółowe informacje na temat postępowania z tagami i fragmentami kodu, zapoznaj się z [Przewodnikiem po stylu tłumaczeń ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Gdzie znajdują się ciągi? {#strings}

Często sam tekst źródłowy może nie wystarczyć do zapewnienia dokładnego tłumaczenia.

- Spójrz na „zrzuty ekranu” i „kontekst” po więcej informacji. W sekcji ciągu źródłowego zobaczysz załączony zrzut ekranu, który pokaże ci, w jakim kontekście używamy danego ciągu.
- Jeśli nadal nie jesteś pewien, zajrzyj do „sekcji komentarz” i zostaw tam swój komentarz. [Nie wiesz, jak zostawić komentarz?](#comment)

![Pokazanie, w jaki sposób można zapewnić kontekst dla ciągu znaków za pomocą zrzutu ekranu](./source-string.png)

![Przykładowy zrzut ekranu dodany dla kontekstu](./source-string-2.png)

## Jak mogę zostawić komentarz lub zadać pytanie? Chciałbym zgłosić błąd lub literówkę... {#comment}

Jeśli chcesz zgłosić uwagę dotyczącą konkretnego ciągu, możesz śmiało zostawić komentarz.

- Kliknij drugi przycisk na prawym górnym pasku. Po prawej stronie pojawi się ukryta karta. Zostaw nowy komentarz i kliknij przycisk „Problem” na dole. Możesz określić rodzaj problemu, wybierając jedną z opcji z rozwijanego menu.
- Po przesłaniu zostanie on zgłoszony do naszego zespołu. Rozwiążemy problem i damy Ci znać, odpowiadając na Twój komentarz i zamykając zgłoszenie.
- Jeśli zgłosisz nieprawidłowe tłumaczenie, to zostanie ono sprawdzone wraz z zasugerowanym alternatywnym tłumaczeniem przez osobę mówiącą w danym języku podczas następnej weryfikacji.

![Pokazanie, jak dodawać komentarze i zgłaszać problemy](./comment-issue.png)

## Czym jest Pamięć Tłumaczeniowa (PT)? {#translation-memory}

Pamięć Tłumaczeniowa (PT) jest funkcją Crowdin, która przechowuje wszystkie poprzednio przetłumaczone ciągi w ethereum.org. Po przetłumaczeniu ciągu jest on automatycznie zapisywany w naszym projekcie PT. To może być użyteczne narzędzie, które pomoże Ci zaoszczędzić czas!

- Spójrz na sekcję „Sugestie z PT oraz TM” i zobaczysz, jak inni tłumacze przetłumaczyli ten sam lub podobny ciąg. Jeśli znajdziesz sugestię z wysokim wskaźnikiem dopasowania, możesz odnieść się do niej, klikając na nią.
- Jeśli nie ma niczego na liście, możesz przeszukać PT w poszukiwaniu wcześniej wykonanych tłumaczeń i użyć ich ponownie w celu zachowania spójności.

![Zrzut ekranu pamięci tłumaczeniowej](./translation-memory.png)

## Jak korzystać z glosariusza Crowdin? {#glossary}

Terminologia Ethereum jest kolejną kluczową częścią naszej pracy tłumaczeniowej, ponieważ często nowe terminy techniczne nie są jeszcze obecne w wielu językach. Istnieją również terminy, które mają różne znaczenie w różnych kontekstach. [Więcej o tłumaczeniu terminologii Ethereum](#terminology)

Glosariusz Crowdin jest najlepszym miejscem do wyjaśnienia terminów i definicji. Istnieją dwa sposoby korzystania z glosariusza.

- Po pierwsze, gdy znajdziesz podkreślony termin w ciągu źródłowym, możesz najechać na niego myszką i zobaczyć jego krótką definicję.

![Przykładowa definicja z glosariusza](./glossary-definition.png)

- Po drugie, jeśli widzisz termin, który nie jest ci znany, ale nie jest podkreślony, możesz go wyszukać w zakładce „Pojęcia” (trzeci przycisk w prawej kolumnie). Znajdziesz tu wyjaśnienia konkretnych terminów i tych często używanych w projekcie.

![Zrzut ekranu pokazujący, gdzie znaleźć zakładkę glosariusza w Crowdin](./glossary-tab.png)

- Jeśli nadal nie możesz znaleźć tego, czego szukasz, to masz szansę na dodanie nowego terminu! Zachęcamy do wyszukania go w wyszukiwarce i dodania opisu do glosariusza. Będzie to bardzo pomocne dla innych tłumaczy, aby lepiej zrozumieć ten termin.

![Zrzut ekranu pokazujący, jak dodać termin do glosariusza w Crowdin](./add-glossary-term.png)

### Polityka tłumaczenia terminologii {#terminology}

_Dla nazw (marek, firm, osób) i nowych terminów technicznych (Beacon Chain, Shard Chains itp.)_

Ethereum przedstawia wiele nowych terminów, które zostały niedawne wymyślone. Niektóre terminy będą się różnić w zależności od tłumacza, ponieważ nie ma oficjalnego tłumaczenia w danym języku. Takie niespójności mogą powodować nieporozumienia i zmniejszać czytelność.

Ze względu na różnorodność językową i różne standaryzacje w każdym języku, prawie niemożliwe było opracowanie ujednoliconej polityki tłumaczeń terminologii, którą można by dostosować we wszystkich obsługiwanych językach.

Po starannym rozważaniu podjęliśmy decyzję o pozostawieniu najczęściej używanej terminologii w rękach tłumaczy.

Oto, co proponujemy, gdy znajdziesz termin, który nie jest ci znany:

- Zapoznaj się z [Glosariuszem terminów](#glossary), możesz tam znaleźć informacje o tym, jak inni tłumacze wcześniej przetłumaczyli dany termin. Jeśli uważasz, że poprzednio przetłumaczony termin nie jest poprawny, możesz przywrócić swoje tłumaczenie, dodając nowy termin do glosariusza Crowdin.
- Jeśli w glosariuszu nie ma jeszcze takiego tłumaczenia, zachęcamy do wyszukania go w wyszukiwarce lub artykule medialnym, który pokazuje, jak termin jest faktycznie używany w Twojej społeczności.
- Jeśli nie znajdziesz żadnych odniesień, możesz zaufać swojej intuicji i zaproponować nowe tłumaczenie na swój język!
- Jeśli nie czujesz się zbyt pewnie, aby to zrobić, pozostaw termin nieprzetłumaczony. Czasami angielskie terminy są bardziej niż odpowiednie w dostarczaniu dokładnych definicji.

Zalecamy pozostawienie nazw marek, firm i personelu nieprzetłumaczonych, ponieważ ich tłumaczenie może powodować niepotrzebne zamieszanie i trudności z SEO.

## Jak przebiega proces przeglądu? {#review-process}

Aby zapewnić określony poziom jakości i spójności w naszych tłumaczeniach, współpracujemy z [Acolad](https://www.acolad.com/), jednym z największych dostawców usług językowych na świecie. Acolad ma 20,000 profesjonalnych lingwistów, co oznacza, że może zapewnić profesjonalnych recenzentów dla każdego języka i rodzaju treści, których potrzebujemy.

Proces weryfikacji jest prosty; gdy dany zestaw treści zostanie w 100% przetłumaczony, zlecamy jego weryfikację. Proces przeglądu odbywa się bezpośrednio w Crowdin. Po zakończeniu przeglądu aktualizujemy stronę internetową o przetłumaczoną treść.

## Jak dodać treści w moim języku? {#adding-foreign-language-content}

Obecnie wszystkie treści inne niż angielskie są tłumaczone bezpośrednio z treści źródłowych w języku angielskim, a wszystkie treści, które nie istnieją w języku angielskim nie mogą zostać dodane do innych języków.

Aby zasugerować nową treść dla ethereum.org, możesz [utworzyć zgłoszenie](https://github.com/ethereum/ethereum-org-website/issues) w serwisie GitHub. Jeśli zostanie dodana, treść zostanie napisana w języku angielskim i przetłumaczona na inne języki za pomocą Crowdin.

W bliskiej przyszłości planujemy dodać wsparcie dla dodatków do treści w języku innym niż angielski.

## Skontaktuj się z nami {#contact}

Dziękujemy za przeczytanie tego wszystkiego. Mamy nadzieję, że pomoże Ci to w dołączeniu do naszego programu. Dołącz do naszego [kanału tłumaczeniowego na Discordzie](https://discord.gg/ethereum-org), aby zadawać pytania i współpracować z innymi tłumaczami, lub skontaktuj się z nami pod adresem translations@ethereum.org!
