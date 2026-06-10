---
title: Przewodnik po tłumaczeniu ethereum.org
metaTitle: Często zadawane pytania (FAQ) dotyczące Programu Tłumaczeń
lang: pl
description: Często zadawane pytania dotyczące Programu Tłumaczeń ethereum.org
---

Jeśli jesteś nowym uczestnikiem Programu Tłumaczeń i wahasz się, czy dołączyć, oto kilka często zadawanych pytań (FAQ), które pomogą Ci zacząć. Skorzystaj z tego przewodnika, aby znaleźć odpowiedzi na najczęstsze pytania.

## Czy mogę otrzymać wynagrodzenie za tłumaczenie ethereum.org? {#compensation}

Ethereum.org to strona internetowa typu open-source, co oznacza, że każdy może się zaangażować i wnieść swój wkład.

Program Tłumaczeń ethereum.org jest tego rozszerzeniem i jest zorganizowany z myślą o podobnej filozofii.

Celem Programu Tłumaczeń jest udostępnienie treści o Ethereum każdemu, niezależnie od języka, którym się posługuje. Pozwala to również każdej osobie dwujęzycznej zaangażować się w ekosystem Ethereum i wnieść swój wkład w przystępny sposób.

Z tego powodu Program Tłumaczeń jest otwarty i dobrowolny, a udział w nim nie podlega wynagrodzeniu. Gdybyśmy mieli wynagradzać tłumaczy za liczbę przetłumaczonych słów, moglibyśmy zaprosić do Programu Tłumaczeń tylko osoby z odpowiednim doświadczeniem (profesjonalnych tłumaczy). Uczyniłoby to Program Tłumaczeń wykluczającym i uniemożliwiłoby nam osiągnięcie wyznaczonych celów, a w szczególności: umożliwienie każdemu uczestnictwa i zaangażowania się w ekosystem.

Dokładamy wszelkich starań, aby umożliwić naszym współtwórcom odniesienie sukcesu w ekosystemie Ethereum; istnieje wiele zachęt niefinansowych, takich jak: [oferowanie POAP-ów](/contributing/translation-program/acknowledgements/#poap) i [certyfikatu tłumacza](/contributing/translation-program/acknowledgements/#certificate), a także organizowanie [Tabeli Liderów Tłumaczeń](/contributing/translation-program/acknowledgements/) oraz [umieszczanie wszystkich naszych tłumaczy na stronie](/contributing/translation-program/contributors/).

## Jak tłumaczyć ciągi znaków zawierające `<HTML tags>`? {#tags}

Nie każdy ciąg znaków jest zapisany w postaci czystego tekstu. Istnieją ciągi, które składają się z mieszanych skryptów, takich jak tagi HTML (`<0>`, `</0>`). Zazwyczaj służą one do tworzenia hiperłączy lub alternatywnego formatowania w środku zdania.

- Przetłumacz tekst wewnątrz tagów, ale nie same tagi. Nic, co znajduje się w `<` i `>`, nie może zostać przetłumaczone ani usunięte.
- Aby zachować bezpieczeństwo ciągu znaków, zalecamy kliknięcie przycisku „Copy Source” (Kopiuj źródło) w lewym dolnym rogu. Spowoduje to skopiowanie oryginalnego ciągu i wklejenie go do pola tekstowego. Pozwala to na jasne określenie, gdzie znajdują się tagi i pomaga uniknąć błędów.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Możesz zmienić pozycję tagów w ciągu znaków, aby brzmiał on bardziej naturalnie w Twoim języku – upewnij się tylko, że przenosisz cały tag.

Bardziej szczegółowe informacje na temat radzenia sobie z tagami i fragmentami kodu można znaleźć w [Przewodniku po stylu tłumaczenia ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Gdzie znajdują się ciągi znaków? {#strings}

Często same źródłowe ciągi znaków mogą nie wystarczyć do zapewnienia dokładnego tłumaczenia.

- Zapoznaj się z sekcjami „screenshots” (zrzuty ekranu) i „context” (kontekst), aby uzyskać więcej informacji. W sekcji źródłowego ciągu znaków zobaczysz dołączony zrzut ekranu, który pokaże Ci, jak używamy danego ciągu w kontekście.
- Jeśli nadal nie masz pewności, zgłoś problem w sekcji komentarzy („comment section”). [Nie wiesz, jak zostawić komentarz?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Jak mogę zostawiać komentarze lub zadawać pytania? Chciałbym zgłosić problem lub literówki... {#comment}

Jeśli chcesz zwrócić uwagę na konkretny ciąg znaków, który wymaga poprawy, śmiało prześlij komentarz.

- Kliknij drugi przycisk na górnym pasku po prawej stronie. Po prawej stronie pojawi się ukryta zakładka. Zostaw nowy komentarz i zaznacz pole wyboru „Issue” (Problem) na dole. Możesz określić rodzaj problemu, wybierając jedną z opcji z menu rozwijanego.
- Po przesłaniu zostanie to zgłoszone naszemu zespołowi. Rozwiążemy problem i poinformujemy Cię o tym, odpowiadając na Twój komentarz i zamykając zgłoszenie.
- Jeśli zgłosisz nieprawidłowe tłumaczenie, tłumaczenie i sugerowana przez Ciebie alternatywa zostaną sprawdzone przez native speakera podczas następnego przeglądu.

![Showing how to make comments and issues](./comment-issue.png)

## Czym jest Pamięć Tłumaczeń (Translation Memory - TM)? {#translation-memory}

Pamięć Tłumaczeń (TM) to funkcja platformy Crowdin, która przechowuje wszystkie wcześniej przetłumaczone ciągi znaków na stronie ethereum.org. Kiedy ciąg znaków zostaje przetłumaczony, jest automatycznie zapisywany w TM naszego projektu. Może to być przydatne narzędzie, które pomoże Ci zaoszczędzić czas!

- Spójrz na sekcję „TM and MT Suggestions” (Sugestie TM i MT), a zobaczysz, jak inni tłumacze przetłumaczyli ten sam lub podobny ciąg znaków. Jeśli znajdziesz sugestię o wysokim wskaźniku dopasowania, możesz z niej skorzystać, klikając na nią.
- Jeśli na liście nie ma żadnych sugestii, możesz przeszukać TM pod kątem wcześniej wykonanych tłumaczeń i użyć ich ponownie w celu zachowania spójności.

![A screenshot of the translation memory](./translation-memory.png)

## Jak korzystać z glosariusza Crowdin? {#glossary}

Terminologia Ethereum to kolejna kluczowa część naszej pracy tłumaczeniowej, ponieważ często nowe terminy techniczne nie są jeszcze zlokalizowane w wielu językach. Istnieją również terminy, które mają różne znaczenia w różnych kontekstach. [Więcej o tłumaczeniu terminologii Ethereum](#terminology)

Glosariusz Crowdin to najlepsze miejsce do wyjaśniania terminów i definicji. Istnieją dwa sposoby korzystania z glosariusza.

- Po pierwsze, gdy znajdziesz podkreślony termin w źródłowym ciągu znaków, możesz najechać na niego myszką i zobaczyć jego krótką definicję.

![An example glossary definition](./glossary-definition.png)

- Po drugie, jeśli widzisz termin, który nie jest Ci znany, ale nie jest podkreślony, możesz go wyszukać w zakładce glosariusza (trzeci przycisk w prawej kolumnie). Znajdziesz tam wyjaśnienia konkretnych terminów oraz tych często używanych w projekcie.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Jeśli nadal nie możesz go znaleźć, to Twoja szansa na dodanie nowego terminu! Zachęcamy do wyszukania go w wyszukiwarce i dodania opisu do glosariusza. Będzie to ogromna pomoc dla innych tłumaczy w lepszym zrozumieniu danego terminu.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Polityka tłumaczenia terminologii {#terminology}

_Dla nazw (marek, firm, osób) i nowych terminów technicznych (Beacon Chain, łańcuchy shardów itp.)_

Ethereum wprowadza wiele nowych terminów, które zostały niedawno ukute. Niektóre terminy będą się różnić w zależności od tłumacza, ponieważ nie ma oficjalnego tłumaczenia w ich języku. Takie niespójności mogą powodować nieporozumienia i zmniejszać czytelność.

Ze względu na różnorodność językową i różne standardy w każdym języku, stworzenie ujednoliconej polityki tłumaczenia terminologii, którą można by dostosować do wszystkich obsługiwanych języków, było prawie niemożliwe.

Po dokładnym rozważeniu podjęliśmy decyzję o pozostawieniu najczęściej używanej terminologii wam, tłumaczom.

Oto co sugerujemy, gdy natrafisz na nieznany Ci termin:

- Zajrzyj do [Glosariusza terminów](#glossary), gdzie możesz sprawdzić, jak inni tłumacze przetłumaczyli go wcześniej. Jeśli uważasz, że wcześniej przetłumaczony termin nie jest odpowiedni, możesz zaproponować własne tłumaczenie, dodając nowy termin do glosariusza Crowdin.
- Jeśli takie wcześniejsze tłumaczenie nie istnieje w glosariuszu, zachęcamy do wyszukania go w wyszukiwarce lub artykule medialnym, który pokazuje, jak dany termin jest faktycznie używany w Twojej społeczności.
- Jeśli nie znajdziesz żadnych odniesień, zaufaj swojej intuicji i zasugeruj nowe tłumaczenie na swój język!
- Jeśli czujesz się mniej pewnie, pozostaw termin nieprzetłumaczony. Czasami angielskie terminy są więcej niż wystarczające do przekazania dokładnych definicji.

Zalecamy pozostawienie nazw marek, firm i personelu bez tłumaczenia, ponieważ tłumaczenie może powodować niepotrzebne zamieszanie i trudności z SEO.

## Jak wygląda proces weryfikacji? {#review-process}

Aby zapewnić odpowiedni poziom jakości i spójności naszych tłumaczeń, współpracujemy z [Acolad](https://www.acolad.com/), jednym z największych dostawców usług językowych na świecie. Acolad dysponuje 20 000 profesjonalnych lingwistów, co oznacza, że mogą zapewnić profesjonalnych weryfikatorów dla każdego języka i rodzaju treści, których potrzebujemy.

Proces weryfikacji jest prosty; gdy dany zestaw treści zostanie w 100% przetłumaczony, zlecamy jego weryfikację. Proces ten odbywa się bezpośrednio na platformie Crowdin. Po zakończeniu weryfikacji aktualizujemy stronę internetową o przetłumaczone treści.

## Jak mogę dodać treść w moim języku? {#adding-foreign-language-content}

Obecnie wszystkie treści nieanglojęzyczne są tłumaczone bezpośrednio z angielskich treści źródłowych, a żadne treści, które nie istnieją w języku angielskim, nie mogą być dodawane w innych językach.

Aby zasugerować nową treść dla ethereum.org, możesz [utworzyć zgłoszenie (issue)](https://github.com/ethereum/ethereum-org-website/issues) na GitHubie. Jeśli zostanie dodana, treść zostanie napisana w języku angielskim i przetłumaczona na inne języki za pomocą platformy Crowdin.

W niedalekiej przyszłości planujemy dodać obsługę dodawania treści w językach innych niż angielski.

## Skontaktuj się z nami {#contact}

Dziękujemy za przeczytanie całości. Mamy nadzieję, że pomoże Ci to wdrożyć się w nasz program. Dołącz do naszego [kanału tłumaczeń na Discordzie](https://discord.gg/ethereum-org), aby zadawać pytania i współpracować z innymi tłumaczami, lub skontaktuj się z nami pod adresem translations@ethereum.org!