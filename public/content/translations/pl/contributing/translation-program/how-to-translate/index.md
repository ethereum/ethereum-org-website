---
title: "Jak tłumaczyć"
lang: pl
description: "Instrukcje korzystania z Crowdin do tłumaczenia ethereum.org"
---

# Jak tłumaczyć {#how-to-translate}

## Przewodnik wizualny {#visual-guide}

Jeśli jesteś wzrokowcem, możesz obejrzeć jak Luka przechodzi przez proces konfiguracji Crowdin. Alternatywnie, możesz znaleźć te same kroki w formie pisemnej w następnej sekcji.

<YouTube id="Ii7bYhanLs4" />

## Przewodnik pisemny {#written-guide}

### Dołącz do naszego projektu w Crowdin {#join-project}

Wymagane będzie zalogowanie się na twoje konto Crowdin lub zarejestrowanie się, jeśli jeszcze go nie posiadasz. Do zarejestrowania się wymagany jest jedynie e-mail i hasło.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Dołącz do projektu
</ButtonLink>

### Otwórz swój język {#open-language}

Po zalogowaniu się do Crowdin zobaczysz opis projektu i listę wszystkich dostępnych języków.
Każdy język zawiera również informacje na temat całkowitej liczby słów do tłumaczenia oraz tego ile zostało już przetłumaczone i ile zostało już zatwierdzonych w danym języku.

Otwórz język, na który chcesz przetłumaczyć, aby zobaczyć listę plików dostępnych do przetłumaczenia.

![Lista języków w Crowdin](./list-of-languages.png)

### Znajdź dokument, nad którym chcesz pracować {#find-document}

Zawartość strony internetowej jest podzielona na szereg dokumentów i zestawów treści. Możesz sprawdzić postęp każdego dokumentu po prawej stronie — jeśli postęp tłumaczenia jest niższy niż 100%, prosimy o wsparcie!

Nie widzisz swojego języka na liście? [Otwórz zgłoszenie](https://github.com/ethereum/ethereum-org-website/issues/new/choose) lub zapytaj na naszym [Discordzie](https://discord.gg/ethereum-org)

![Przetłumaczone i nieprzetłumaczone pliki w Crowdin](./crowdin-files.png)

Notatka na temat zestawów treści: w Crowdin używamy „zestawów treści”, aby w pierwszej kolejności publikować treści o najwyższym priorytecie. Kiedy będziesz sprawdzać dany język, na przykład, [filipiński](https://crowdin.com/project/ethereum-org/fil#) zobaczysz foldery dla zestawów treści („1. Homepage”, „2. Essentials”, „3. Exploring” itp.).

Zachęcamy do tłumaczenia w kolejności numerycznej (1 → 2 → 3 → ⋯), aby zapewnić, że strony z największym wpływem zostaną przetłumaczone jako pierwsze.

### Tłumaczenie {#translate}

Po wybraniu pliku, który chcesz przetłumaczyć, zostanie on otwarty w edytorze online. Jeśli nie korzystałeś nigdy wcześniej z Crowdin, możesz skorzystać z tego krótkiego przewodnika, aby zapoznać się z podstawami.

![Edytor online Crowdin](./online-editor.png)

**_1 – Lewy pasek boczny_**

- Nieprzetłumaczone (czerwony) — tekst, który nie został jeszcze przetłumaczony. To są ciągi, które należy przetłumaczyć.
- Przetłumaczone (zielony) — tekst, który został już przetłumaczony, ale nie został jeszcze sprawdzony. Zachęcamy do sugerowania alternatywnych tłumaczeń lub głosowania na już istniejące za pomocą przycisków „+” i „-” w edytorze.
- Zatwierdzone (znak wyboru) — tekst, który został już sprawdzony i jest obecnie dostępny na stronie.

Możesz także użyć przycisków na górze, aby wyszukać określone ciągi i przefiltrować je według statusu lub zmienić widok.

**_2 – Obszar edytora_**

Główny obszar tłumaczenia — ciąg źródłowy jest wyświetlany na górze wraz z dodatkowym kontekstem i zrzutami ekranu, jeśli są dostępne.
Aby zasugerować nowe tłumaczenie, wprowadź swoje tłumaczenie w polu „Wpisz tutaj tłumaczenie” i kliknij przycisk Zapisz.

W tej sekcji znajdziesz również istniejące już tłumaczenia ciągu i tłumaczenia na inne języki, a także dopasowania pamięci tłumaczeniowej i sugestie tłumaczenia maszynowego.

**_3 – Prawy pasek boczny_**

Znajdziesz tutaj komentarze, zapisy pamięci tłumaczeniowej i wpisy w glosariuszu. Widok domyślny wyświetla komentarze i umożliwia tłumaczom komunikowanie się, zgłaszanie problemów lub zgłaszanie nieprawidłowych tłumaczeń.

Korzystając z przycisków na górze, możesz również przełączyć się do zakładki Pamięci Tłumaczeniowej, gdzie możesz wyszukiwać istniejące tłumaczenia, lub do zakładki Glosariusza, która zawiera opisy i standardowe tłumaczenia kluczowych terminów.

Chcesz dowiedzieć się więcej? Zachęcamy do zapoznania się z [dokumentacją dotyczącą korzystania z edytora online Crowdin](https://support.crowdin.com/online-editor/)

### Proces weryfikacji {#review-process}

Po ukończeniu tłumaczenia (tj. wszystkie pliki w zestawie treści wyświetlają 100%), nasz profesjonalny serwis tłumaczeniowy dokona weryfikacji (i potencjalnie edycji) treści. Kiedy weryfikacja zostanie zakończona (tj. postęp weryfikacji wyniesie 100%), dodamy je na stronę.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Prosimy o nieużywanie tłumaczenia maszynowego do tłumaczenia projektu. Wszystkie tłumaczenia zostaną sprawdzone przed dodaniem do strony. Jeśli sugerowane tłumaczenia zostaną uznane za przetłumaczone maszynowo, zostaną odrzucone, a osoby, które używały tłumaczenia maszynowego najczęściej zostają usunięci z projektu.
</AlertContent>
</Alert>

### Skontaktuj się z nami {#get-in-touch}

Masz jakieś pytania? A może chcesz współpracować z naszym zespołem i innymi tłumaczami? Prosimy o publikowanie postów na kanale #translations na naszym [serwerze Discord ethereum.org](https://discord.gg/ethereum-org)

Możesz również skontaktować się z nami pod adresem translations@ethereum.org

Dziękujemy za udział w Programie Tłumaczeń ethereum.org!
