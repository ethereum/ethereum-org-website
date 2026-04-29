---
title: "Bezpieczeństwo przez niejawność: użycie mikrokropek do przechowywania sekretów"
description: "Przedstawienie niekonwencjonalnego podejścia do przechowywania kluczy z wykorzystaniem fizycznej technologii mikrokropek, ukrywającej frazy odzyskiwania na wydrukowanych obrazach niewidocznych gołym okiem."
lang: pl
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "prywatność-i-bezpieczeństwo"
  - "prywatność"
  - "uwierzytelnianie"
format: presentation
author: Ethereum Foundation
breadcrumb: "Bezpieczeństwo mikrokropek"
---

Krótka prezentacja (lightning talk), którą wygłosił **jseam** na Devcon SEA, badająca niekonwencjonalne podejście do przechowywania kluczy z wykorzystaniem fizycznej technologii mikrokropek, historycznie używanej w szpiegostwie do ukrywania fraz odzyskiwania na wydrukowanych obrazach, które są praktycznie niewidoczne gołym okiem.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=k9Dfg19JPEw) opublikowanego przez Fundację Ethereum. Został on lekko zredagowany w celu poprawy czytelności.*

#### Dlaczego mikrokropki? (0:00) {#why-microdots-000}

Cześć wszystkim, witajcie w Tajlandii. W mojej prezentacji opowiem o mikrokropkach — czym dokładnie są, dlaczego moglibyście ich potrzebować i jak właściwie można je zrobić. Mam kilka próbek, więc po prezentacji będziecie mogli je obejrzeć.

Pojawia się wiele pytań o OpSec (bezpieczeństwo operacyjne) i o to, jak można ukryć frazy odzyskiwania. Wiele z istniejących procesów jest w pełni cyfrowych. Ale co, jeśli istnieją procesy fizyczne? Co, jeśli można zaciemnić informacje? Przechowywanie kluczy pozostaje ogromnym problemem. Mamy współdzielenie sekretów, odzyskiwanie społecznościowe — ale wiem, że wiele osób ze świata krypto jest dość aspołecznych, więc odzyskiwanie społecznościowe może być trudne.

Spójrzcie na ten wykres: mamy teraz epidemię samotności. Więc przechowywanie kluczy i odzyskiwanie społecznościowe będą ogromnymi problemami. Co, jeśli istnieją fizyczne podejścia do ukrywania informacji?

#### Historia steganografii mikrokropek (2:00) {#the-history-of-microdot-steganography-200}

To technika steganograficzna zwana mikrokropkami. Powodem, dla którego pokazuję to dzisiaj, jest fakt, że historycznie była ona używana w szpiegostwie. Celem jest w zasadzie ukrycie wiadomości na widoku.

Cała dokumentacja na ten temat jest bardzo ograniczona. Prawdopodobnie pytacie Claude'a, a on odpowiada: „Przepraszam, brak informacji”. Sam odtwarzałem te informacje metodą inżynierii wstecznej. Slajdy dokumentują wszystko. Nie będę w stanie omówić każdego szczegółu, ale przejdę przez najciekawsze części. Stworzyłem również repozytorium na GitHubie dokumentujące te procesy.

#### Fotografia analogowa dla bezpieczeństwa (3:30) {#analog-photography-for-security-330}

Wskrzesimy fotografię analogową dla tego przypadku użycia. Dlaczego analogową? W zasadzie nie ma szans, aby ktoś zhakował aparat analogowy, chyba że fizycznie ci go ukradnie.

Jednym z głównych problemów z fotografią analogową jest ISO. W aparacie cyfrowym to nie jest wielki problem — można je dostosować. Ale w przypadku kliszy, ISO jest funkcją ziarna filmu. Staje się to problemem, gdy chcesz zminiaturyzować obraz. Im mniejsze ISO, tym ogólnie mniejsze ziarno.

Są dwie fazy. Najpierw robisz zdjęcie, wywołujesz je i utrwalasz. Druga faza to ta, w której zamiast powiększać obraz, robimy coś odwrotnego — pomniejszamy go do mikroskopijnej skali.

#### Proces brytyjski (5:00) {#the-british-process-500}

Oto jak to zrobić. Zapisujesz swoją frazę odzyskiwania. Zazwyczaj poradnik MetaMask prosi o zapisanie frazy odzyskiwania — ale gdzie ją potem umieścić? To jest jeden ze sposobów: robisz zdjęcie frazy odzyskiwania, zwijasz kliszę, wywołujesz ją. Co ciekawe — to wszystko są metale ciężkie, srebro. Nie powinieneś wylewać ich do toalety. Ja przypadkowo wlałem trochę do swojej, więc mogłem popełnić pewne wykroczenia przeciwko środowisku. W najgorszym razie prawdopodobnie skoroduje mi to rury.

Robisz zdjęcie ponownie i tada — masz tę malutką kropkę. Nazywa się to procesem brytyjskim.

#### Proces dwuchromianowy (7:00) {#the-dichromated-process-700}

Kolejnym, jeszcze bardziej ekstremalnym procesem jest proces dwuchromianowy. W ten sposób można uzyskać mikroskopijne powiększenia, takie jak 1000x. Celem jest znalezienie do tego podłoża chemicznego i tu wkracza to, co nazywam „Zakazanym Sokiem Pomarańczowym” — dwuchromian amonu. Jest bardzo toksyczny. Rozlałem trochę i prawie umarłem, gdy wdychałem pył. Prawdopodobnie będę musiał po tym pójść na badania przesiewowe w kierunku raka.

Wyświetlasz obraz i otrzymujesz te malutkie kropki na kartce papieru. Kropki są tak małe, że zdecydowanie potrzebujesz mikroskopu. Tę wykonaną w procesie brytyjskim można zobaczyć gołym okiem, ale proces dwuchromianowy tworzy coś naprawdę maleńkiego — bez mikroskopu nie jestem nawet pewien, czy to w ogóle jest obraz.

#### Pytania i odpowiedzi (8:00) {#qa-800}

Jak małe są mikrokropki? Tę wykonaną w procesie brytyjskim można zobaczyć gołym okiem, ale proces dwuchromianowy tworzy coś naprawdę maleńkiego — zdecydowanie potrzebujesz mikroskopu. Trudno powiedzieć, czy bez niego to w ogóle jest obraz.

**Pytanie:** Jak długo to przetrwa? Czy istnieje jakiś okres połowicznego rozpadu?

**jseam:** To nie jest radioaktywne. Dowiemy się za 20 lat.

**Pytanie:** Czy odwróciłeś ten proces — zakodowałeś, a następnie zdekodowałeś, aby sprawdzić, czy możesz to odzyskać?

**jseam:** Myślę, że można. Prawdopodobnie potrzebowałbyś jakiegoś rodzaju optycznego zestawu projekcyjnego.

Bardzo dziękuję. Jeśli chcecie zobaczyć próbki, będę gdzieś tutaj. Dziękuję za wasz czas.