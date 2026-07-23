---
title: Jak tłumaczyć
lang: pl
description: Instrukcje korzystania z Crowdin do tłumaczenia ethereum.org
---

## Przewodnik wizualny {#visual-guide}

Wzrokowców zachęcamy do obejrzenia filmu, w którym Luka pokazuje, jak rozpocząć pracę z Crowdin. Alternatywnie, te same kroki w formie pisemnej znajdziesz w następnej sekcji.

<VideoWatch slug="crowdin-translation-guide" />

## Przewodnik pisemny {#written-guide}

### Dołącz do naszego projektu w Crowdin {#join-project}

Musisz zalogować się na swoje konto Crowdin lub zarejestrować się, jeśli jeszcze go nie masz. Do rejestracji wymagany jest jedynie adres e-mail i hasło.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Dołącz do projektu
</ButtonLink>

### Otwórz swój język {#open-language}

Po zalogowaniu do Crowdin zobaczysz opis projektu oraz listę wszystkich dostępnych języków.
Przy każdym języku znajduje się również informacja o całkowitej liczbie słów do przetłumaczenia oraz przegląd tego, ile treści zostało już przetłumaczonych i zatwierdzonych w danym języku.

Otwórz język, na który chcesz tłumaczyć, aby zobaczyć listę plików dostępnych do tłumaczenia.

![List of languages in Crowdin](./list-of-languages.png)

### Znajdź dokument do pracy {#find-document}

Treść strony internetowej jest podzielona na wiele dokumentów i grup treści (tzw. content buckets). Postęp tłumaczenia każdego dokumentu możesz sprawdzić po prawej stronie – jeśli wynosi on poniżej 100%, zachęcamy do pomocy!

Nie widzisz swojego języka na liście? [Otwórz zgłoszenie (issue)](https://github.com/ethereum/ethereum-org-website/issues/new/choose) lub zapytaj na naszym [Discordzie](https://discord.gg/ethereum-org)

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Uwaga dotycząca grup treści: używamy „grup treści” (content buckets) w Crowdin, aby w pierwszej kolejności publikować najważniejsze materiały. Kiedy sprawdzisz dany język, na przykład [filipiński](https://crowdin.com/project/ethereum-org/fil#), zobaczysz foldery odpowiadające grupom treści („1. Homepage”, „2. Essentials”, „3. Exploring” itd.).

Zachęcamy do tłumaczenia w tej kolejności numerycznej (1 → 2 → 3 → ⋯), aby upewnić się, że strony o największym znaczeniu zostaną przetłumaczone jako pierwsze.

### Tłumacz {#translate}

Po wybraniu pliku, który chcesz przetłumaczyć, otworzy się on w edytorze online. Jeśli nigdy wcześniej nie korzystałeś z Crowdin, możesz użyć tego krótkiego przewodnika, aby zapoznać się z podstawami.

![Crowdin online editor](./online-editor.png)

**_1 – Lewy pasek boczny_**

- Nieprzetłumaczone (czerwony) – tekst, nad którym jeszcze nie pracowano. Są to ciągi znaków, które powinieneś przetłumaczyć.
- Przetłumaczone (zielony) – tekst, który został już przetłumaczony, ale jeszcze nie sprawdzony. Możesz sugerować alternatywne tłumaczenia lub oddać głos na istniejące, używając przycisków „+” i „-” w edytorze.
- Zatwierdzone (znacznik wyboru) – tekst, który został już sprawdzony i jest obecnie widoczny na stronie internetowej.

Możesz również użyć przycisków na górze, aby wyszukać konkretne ciągi znaków, filtrować je według statusu lub zmienić widok.

**_2 – Obszar edytora_**

Główny obszar tłumaczenia – tekst źródłowy wyświetlany jest na górze, wraz z dodatkowym kontekstem i zrzutami ekranu, jeśli są dostępne.
Aby zasugerować nowe tłumaczenie, wpisz je w polu „Enter translation here” (Wpisz tłumaczenie tutaj) i kliknij Save (Zapisz).

W tej sekcji znajdziesz również istniejące tłumaczenia danego ciągu znaków oraz tłumaczenia na inne języki, a także dopasowania z pamięci tłumaczeniowej i sugestie tłumaczenia maszynowego.

**_3 – Prawy pasek boczny_**

Tutaj znajdziesz komentarze, wpisy z pamięci tłumaczeniowej oraz pozycje ze słowniczka. Domyślny widok pokazuje komentarze i pozwala tłumaczom na komunikację, zgłaszanie problemów lub niepoprawnych tłumaczeń.

Używając przycisków na górze, możesz również przełączyć się na Pamięć tłumaczeniową (Translation Memory), gdzie możesz wyszukiwać istniejące tłumaczenia, lub na Słowniczek (Glossary), który zawiera opisy i standardowe tłumaczenia kluczowych terminów.

Chcesz dowiedzieć się więcej? Zapoznaj się z [dokumentacją dotyczącą korzystania z edytora online Crowdin](https://support.crowdin.com/online-editor/)

### Proces weryfikacji {#review-process}

Po zakończeniu tłumaczenia (tzn. gdy wszystkie pliki w danej grupie treści osiągną 100%), nasz profesjonalny serwis tłumaczeniowy zweryfikuje (i ewentualnie zredaguje) treść. Po zakończeniu weryfikacji (tzn. gdy postęp weryfikacji wyniesie 100%), dodamy ją na stronę internetową.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Prosimy nie używać tłumaczenia maszynowego do tłumaczenia projektu. Wszystkie tłumaczenia zostaną sprawdzone przed dodaniem ich na stronę internetową. Jeśli okaże się, że zasugerowane przez Ciebie tłumaczenia pochodzą z translatora, zostaną one odrzucone, a współtwórcy, którzy często korzystają z tłumaczenia maszynowego, zostaną usunięci z projektu.
</AlertContent>
</Alert>

### Skontaktuj się z nami {#get-in-touch}

Masz jakieś pytania? A może chcesz współpracować z naszym zespołem i innymi tłumaczami? Napisz na kanale #translations na naszym [serwerze Discord ethereum.org](https://discord.gg/ethereum-org)

Możesz również skontaktować się z nami pod adresem translations@ethereum.org

Dziękujemy za udział w Programie Tłumaczeń ethereum.org!