---
title: "Poza protokołem Ethereum: separacja proponującego i budującego"
description: "Prezentacja na temat separacji proponującego i budującego (PBS), wzorca projektowego, który rozdziela role budowania bloków i proponowania bloków w Ethereum."
lang: pl
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Wyjaśnienie PBS"
---

Ta prezentacja wyjaśnia, jak produkcja bloków w Ethereum ewoluowała z prostego modelu w wyrafinowany łańcuch dostaw obejmujący walidatorów, budowniczych, poszukiwaczy i przekaźniki (relays). Barnabé Monnot z Fundacji Ethereum omawia, dlaczego istnieje separacja proponującego i budującego (PBS), w jaki sposób przekaźniki MEV-Boost pośredniczą w relacjach między proponującymi a budowniczymi oraz jakie rozwiązania wewnątrz protokołu są badane w celu zmniejszenia zależności od zaufania i poprawy odporności na cenzurę, dystrybucji MEV oraz decentralizacji walidatorów.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=u8XvkTrjITs) opublikowanego przez CBER Forum. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Nazywam się Barnabé Monnot. Będę mówił trochę o tym, co dzieje się poza protokołem, a w szczególności o koncepcji separacji proponującego i budującego (PBS) oraz o tym, jak jest ona obsługiwana za pomocą przekaźników i dużej ilości infrastruktury pozałańcuchowej.

Lubię myśleć o protokole jako o abstrakcyjnym obiekcie, który ma pewne moce. Jedną z mocy, jakie posiada protokół, jest możliwość nadawania praw określonym uczestnikom. W poprzedniej prezentacji widzieliśmy, że protokół upoważnia walidatorów do wykonywania obowiązków związanych z konsensusem, ale to nie jedyna rzecz, którą robią — musimy również pakować bloki transakcjami. Nazywamy to obowiązkami wykonawczymi i na tym właśnie chcę się skupić w tej prezentacji.

#### Dlaczego walidatorzy korzystają z budowniczych (0:46) {#why-validators-use-builders-046}

Ciekawe jest to, że chociaż to protokół jest źródłem tych praw i nadaje je walidatorom, w praktyce obserwujemy, że wielu walidatorów decyduje się nie korzystać z tego prawa samodzielnie. Wolą przekazać to prawo komuś innemu, aby wykonywał je w ich imieniu. A tym „kimś innym” w Ethereum są budowniczowie.

Obserwujemy więc, że chociaż walidatorzy nadal samodzielnie wykonują obowiązki związane z konsensusem, decydują się przekazać obowiązki wykonawcze budowniczym. To w rzeczywistości dość znaczący rynek. Obecnie około 90% bloków jest tworzonych przez zewnętrznych budowniczych i tak jest od około grudnia 2022 roku — trzy miesiące po The Merge. Mediana płatności od budowniczego dla walidatora wynosi około 120 dolarów za blok. Codziennie wypłacany jest milion dolarów, a co 12 sekund istnieje możliwość, aby ten rynek doszedł do jakiegoś porozumienia między jednym proponującym a jednym budowniczym.

Dzisiaj chcę omówić, dlaczego walidatorzy korzystają z budowniczych, skąd bierze się ta relacja — przy okazji opowiem trochę o MEV i poszukiwaczach — następnie powiem, jak ta relacja jest zapośredniczona, i opowiem o przekaźnikach, które istnieją dzisiaj, oraz o rozwiązaniach wewnątrz protokołu, o których myślimy. Chcę również spojrzeć na to z szerszej perspektywy, ponieważ łatwo jest zobaczyć te obrazy i pomyśleć: „och, to bardzo przerażające, co z decentralizacją?”. Chcę wam uświadomić, że są to kompromisy, na które się decydujemy, ale moim zdaniem zmierzają one w dobrym kierunku.

#### Naiwny model i MEV (3:04) {#the-naive-model-and-mev-304}

Można wyobrazić sobie naiwny model produkcji bloków, w którym walidator jest wybierany zgodnie z procesem wyboru lidera i musi utworzyć blok zawierający listę transakcji z mempoola. W najbardziej naiwnym modelu mamy tak naprawdę tylko dwie strony — walidatora nasłuchującego mempoola, a kiedy przychodzi jego kolej na utworzenie bloku, wybiera on transakcje, które płacą najwyższe opłaty i dodaje je, zazwyczaj używając niezbyt wyrafinowanych algorytmów pakowania.

To, co zaobserwowano dość drastycznie w ciągu ostatnich pięciu lat, to fakt, że daje to ogromną władzę producentowi — w szczególności przywilej ostatniego spojrzenia (last look). Widzą oni, co użytkownicy chcą zrobić, na przykład widzą, że użytkownik chce dokonać wymiany, i mogą wykorzystać tę informację, aby wyciągnąć zysk dla siebie.

W najlepszym przypadku ten zysk pochodzi z naturalnych funkcji rynkowych, takich jak arbitraż. W najgorszym przypadku może pochodzić bezpośrednio z kieszeni użytkownika, jak w przypadku ataków kanapkowych (sandwich attacks). Na przykład użytkownik składa zlecenie wymiany tokena A na token B na jakimś rynku, takim jak Uniswap. Ta transakcja stworzy nierównowagę cenową z innym rynkiem wdrożonym na tym samym łańcuchu. Producent może zobaczyć oczekującą transakcję i wstawić własną transakcję, która dokonuje wymiany w odwrotnym kierunku na innym rynku, zgarniając po drodze zysk z arbitrażu.

To naprawdę daje dużą władzę producentowi i sprawia, że pozycja producenta bloku jest niezwykle cenna. Ten przywilej producenta to coś, co obecnie nazywamy **maksymalną wartością do wyciągnięcia (MEV - maximal extractable value)**.

#### Rola poszukiwaczy (5:43) {#the-role-of-searchers-543}

W praktyce producenci mogą nie wiedzieć, gdzie znajduje się wartość. Możemy mieć do czynienia z nieco niewyrafinowanymi producentami bloków — jak wspomniano, każdy może zostać walidatorem, o ile ma wystarczający kapitał i jest w stanie uruchomić węzeł. W praktyce mogę nie wiedzieć, jak robić arbitraż ani nic o rynkach finansowych. Chciałbym, aby ktoś powiedział mi, gdzie są te okazje — rynek ludzi rywalizujących o to, by powiedzieć mi, co najlepiej zrobić jako producent bloku.

Te podmioty, które są bardzo dobre w znajdowaniu okazji, nazywamy **poszukiwaczami**. Ujawniają one okazje producentowi bloku. Poszukiwacz może zaobserwować użytkownika dokonującego wymiany, czy to poprzez publiczny mempool, czy przez dark poole lub prywatne kanały, a następnie przekazać walidatorowi: „Trwa wymiana — jeśli spakujesz tę wymianę razem z tym arbitrażem w pakiet atomowych transakcji i dołączysz ten pakiet, możesz zarobić na arbitrażu”. Będziesz miał wielu poszukiwaczy rywalizujących o przekonanie producenta bloku.

Ten model sprawdza się w praktyce, jeśli poszukiwacz ufa producentowi, że ten zachowa atomowość pakietu. Być może słyszeliście niedawno o ataku na Ethereum, który kosztował grupę atakujących metodą kanapkową 25 milionów dolarów — główną przyczyną było to, że atakującemu udało się złamać atomowość pakietów, odbierając ich zawartość i próbując ją zreorganizować oraz zmodyfikować. To bardzo ważna właściwość, która tak naprawdę utrzymuje się tylko tak długo, jak długo można ufać producentowi, że nie złamie tej atomowości.

#### Dlaczego potrzebujemy budowniczych (8:16) {#why-we-need-builders-816}

Co zrobić, jeśli producent jest niezaufany? Po The Merge w Ethereum mamy samodzielnych stakerów — około 6% sieci — których nie znamy. Poszukiwacze nie będą zbytnio chcieli wysyłać pakietów do tych proponujących bloki, ponieważ jest to trochę zbyt niebezpieczne.

Więc projekt, do którego doszliśmy, wygląda następująco: zamiast poszukiwaczy przekazujących pakiety, które producent włącza do swojego bloku, po prostu stworzymy dla ciebie cały blok. W ten sposób możesz po prostu w ciemno podpisać blok — nie musisz wiedzieć, co w nim jest, ufasz, że budowniczy daje ci dobry blok.

Teraz masz ten jeszcze głębszy łańcuch: walidator na jednym końcu, użytkownik na drugim, a pomiędzy nimi cały ten łańcuch pośredników, który z czasem staje się coraz gęstszy. Budowniczy zajmuje się częścią wykonawczą, podczas gdy walidator zajmuje się konsensusem.

#### Jak działają przekaźniki MEV-Boost (13:01) {#how-mev-boost-relays-work-1301}

Załóżmy, że jesteś proponującym i chcesz wejść na ten rynek. Ta usługa produkcji bloków to klasyczny problem uczciwej wymiany — dwie strony próbują dojść do porozumienia, ale sobie nie ufają. Klasyczna literatura mówi, że nie można dokonać uczciwej wymiany bez zaufanej strony trzeciej.

To, czego używamy dzisiaj jako zaufanej strony trzeciej, nazywamy **przekaźnikiem (relay)** — przekaźnikiem MEV-Boost. MEV-Boost to nazwa protokołu, który pośredniczy w interakcjach między budowniczymi a walidatorami. Przekaźnik znajduje się pośrodku, aby upewnić się, że porozumienie zostanie zawarte przez obie strony.

Przekaźnik ma kilka ról. Po pierwsze, musi zweryfikować ładunek (payload) od budowniczego — przekaźnik widzi jawnym tekstem blok, który tworzy budowniczy, i może sprawdzić, czy jest on prawidłowy i czy może zostać zaproponowany sieci. Istnieje wariant zwany przekaźnikiem optymistycznym, w którym przekaźnik nie sprawdza od razu ważności, ale prosi budowniczego o zabezpieczenie na wypadek, gdyby blok ostatecznie okazał się nieprawidłowy.

Po drugie, budowniczowie składają oferty, próbując konkurować o to, by zostać budowniczym wybranym przez walidatora. Przekaźnik działa jako podmiot przekazujący oferty, wysyłając je do walidatora. Następnie w ostatnim kroku, gdy walidator wybierze jedną z ofert od przekaźnika — a walidator może połączyć się z dowolną liczbą przekaźników — podpisuje ją, wciąż nie wiedząc, jaka jest zawartość bloku, i odsyła podpisaną ofertę z powrotem do przekaźnika. Mając tę podpisaną ofertę, przekaźnik może udostępnić blok w sieci.

Ekonomia przekaźników jest skomplikowana. Niektóre są darmowe, trochę jak dobra publiczne. Inne opracowały modele przychodów — na przykład przekaźnik Ultrasound ma „korektę oferty”, w której pobierają różnicę między najlepszą a drugą najlepszą ofertą jako swój przychód.

#### Zaufanie i przekaźnik (17:01) {#trust-and-the-relay-1701}

Przekaźnik jest zaufaną stroną trzecią w systemie. Załóżmy, że przekaźnik serwuje nieprawidłowy blok — ludzie natychmiast to zobaczą, ponieważ jest on podpisany, i bardzo szybko odłączą się od tego przekaźnika. Można nawet rozgłaszać (gossip) pewnego rodzaju dowód błędu. W ciągu pięciu bloków, jeśli przekaźnik nie działa dobrze, ludzie przestaną mu ufać i po prostu się odłączą.

Opiera się to więc na zaufaniu, ale z założeniem, że można go dość szybko zastąpić. Przekaźniki nie są walidatorami — niekoniecznie mają stawkę i nie muszą mieć nic wspólnego z Ethereum. Mogą to być ludzie, których znamy i lubimy dzisiaj, ale jutro może to być ktokolwiek.

#### Wbudowanie PBS w protokół (20:01) {#enshrining-pbs-in-the-protocol-2001}

Staramy się wyeliminować status przekaźnika jako zaufanej strony trzeciej. Mamy zaufaną stronę trzecią, którą lubimy w Ethereum — i jest to samo Ethereum. Można zaprojektować rozwiązania wewnątrz protokołu, które w zasadzie próbują wbudować rolę przekaźnika i sprawić, że zależność od niego stanie się opcjonalna.

Obecnie protokół Ethereum widzi część tego, co robią walidatorzy, ale jest całkowicie ślepy na sieć budowniczych. Staramy się doprowadzić do tego, aby protokół Ethereum stał się zaufaną stroną trzecią w interakcji między proponującym a budowniczym — w tym sensie nie musimy już polegać na przekaźniku.

#### Ograniczanie budowniczych, wzmacnianie decentralizacji (22:05) {#constraining-builders-amplifying-decentralization-2205}

Szersza perspektywa jest ważna. Wydaje się, że na każdej warstwie toczą się różne gry, a różni gracze zabierają sobie nawzajem pieniądze — czy to znowu tradycyjne finanse? Chcę argumentować, że te kompromisy nie biorą się ze złych intencji. Próbują one opierać się na właściwościach tych systemów, które uważamy za pomocne w ich skalowaniu i czynieniu ich bardziej użytecznymi.

Vitalik mówił o fundamentalnej asymetrii usług, które może oferować blockchain. Konsensus wymaga bardzo dużej, zdecentralizowanej grupy ludzi sprawujących kontrolę. Ale niektóre usługi naprawdę wymagają, aby jedna osoba dobrze wykonała zadanie, a wszyscy inni zweryfikowali, czy zostało ono dobrze wykonane. Potrzebujemy tylko jednego budowniczego, aby utworzyć blok, a następnie wszyscy mogą zweryfikować, czy jest on prawidłowy.

Obecnie wyraźnie dominuje trzech budowniczych: Beaver Build, Titan i rsync Builder. Czy to dobry stan rzeczy? Nie do końca — możemy to zrobić lepiej. Ale czy realistyczne jest wyobrażenie sobie, że będziemy mieli tylu budowniczych, ilu walidatorów? Prawdopodobnie nie.

To, czego naprawdę chcemy, to ta cienka warstwa walidatorów ograniczająca i wykorzystująca fakt, że w środku znajdują się podmioty o dużej mocy obliczeniowej, które mogą wykonywać zadania niewymagające założeń o uczciwej większości.

Kilka pomysłów na ograniczenie budowniczych:

- **Listy włączeń (inclusion lists)** — gdzie walidator mówi budowniczemu: „musisz uwzględnić te transakcje w swoim bloku”
- **Częściowe budowanie bloków** — rozbicie pełnego bloku, aby budowniczy nie miał monopolu na całą przestrzeń
- **Zmniejszenie zależności od stron trzecich** — wbudowanie roli przekaźnika w protokół

Aby wzmocnić decentralizację walidatorów:

- **Separacja poświadczającego i proponującego (attester-proposer separation)** — zamiast domyślnie czynić walidatora producentem bloku, wybór innej grupy osób na producentów bloków i rozdzielenie tych ról
- **Ulepszone mechanizmy stakingu** — staking w Ethereum jest dziś nieco prymitywny i można go ulepszyć

#### Pytania i zakończenie (27:03) {#questions-and-closing-2703}

Pytanie z publiczności: w tradycyjnym świecie finansów czas rozrachunku jest skracany z dwóch dni do jednego dnia. Czy skrócenie czasu rozrachunku z 12 sekund do krótszego interwału rozwiązałoby niektóre problemy z wyprzedzaniem transakcji (front-running)?

Ludzie o tym rozmawiają — nazywają to **wstępnymi potwierdzeniami (pre-confirmations)**. Chodzi o to, że wysyłasz swoją transakcję, a ktoś mówi ci: „jesteś w środku, po tej cenie, w tym stanie”. Rzecz w tym, że nie można dokonać rozrachunku szybciej, niż działa protokół. Nie można uzyskać szybszego rozrachunku ostateczności niż 12 minut. Nie można poruszać się szybciej niż wynosi czas bloku.

Skrócenie czasu bloku jest trudne, ponieważ chcemy utrzymać warstwę walidatorów tak zdecentralizowaną, jak to tylko możliwe, a jego skrócenie po prostu zwiększa wymagania sprzętowe.