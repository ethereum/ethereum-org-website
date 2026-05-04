---
title: "Transakcje — ETH.BUILD"
description: "Demonstracja działania transakcji Ethereum przy użyciu narzędzia edukacyjnego ETH.BUILD. Zobacz, jak transakcje są konstruowane, podpisywane i wysyłane w sieci Ethereum."
lang: pl
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "Transakcje (ETH.BUILD)"
---

Samouczek autorstwa **Austina Griffitha** demonstrujący, jak działają transakcje Ethereum przy użyciu narzędzia do programowania wizualnego ETH.BUILD — obejmujący strukturę transakcji, ceny gazu, podpisywanie, rozgłaszanie i pulę transakcji.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=er-0ihqFQB0) opublikowanego przez Austina Griffitha. Został on lekko zredagowany w celu poprawy czytelności.*

#### Opłaty transakcyjne i zachęty dla górników (0:00) {#transaction-fees-and-miner-incentives-000}

Dzisiaj w ETH.BUILD porozmawiamy o transakcjach. Do tej pory mówiliśmy o tym, że transakcje są wydobywane w blokach, pakowane w bloki i wydobywane do łańcucha. Chcemy porozmawiać o tym, co motywuje górnika — poza nagrodą za blok — do wyciągnięcia naszej transakcji z puli, umieszczenia jej w bloku i wydobycia jej do łańcucha, w porównaniu do innych osób w puli. W puli mogą być tysiące osób, które w pewnym sensie licytują, a tą ofertą jest właśnie ta opłata.

Mogę mieć w swojej transakcji opłatę, która mówi: „Jestem Alice i wysyłam pięć do Boba, a moje nonce to jeden dla ochrony przed atakami typu replay”. Ponadto, ktokolwiek to wydobędzie, może zatrzymać opłatę dla siebie. Zasadniczo Alice wysyła pięć do Boba, ale płaci też górnikowi drobną kwotę za umieszczenie tego w łańcuchu.

#### Anatomia transakcji Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

Jak wygląda transakcja w Ethereum? Nie będziemy już mieli „Boba” i „Alice” — będziemy mieli adresy. Wartość będzie w wei, a nie w ETH. Opłata również będzie w wei.

Przejdźmy do rzeczy i spójrzmy na tę transakcję. Mam konto z wprowadzonym mnemonikiem i jestem podłączony do sieci głównej Ethereum. Uruchomiłem również moduł do pobierania danych cenowych z CoinMarketCap, więc widzę, że zero przecinek jeden z czymś ETH przekłada się na około dwadzieścia trzy dolary.

#### Konfiguracja transakcji (2:25) {#setting-up-the-transaction-225}

To, co zamierzam zrobić, to utworzyć transakcję i zmotywować górnika, aby ją odebrał i umieścił onchain. Mam dwie postacie — Alice i Boba. Alice wyśle za pomocą swojego klucza prywatnego pewną wartość do Boba. Nie ma tu pola adresu „od”, ponieważ — pamiętaj — podpisujemy i odzyskujemy za pomocą naszej pary kluczy. Transakcja jest pakowana, podpisywana, a następnie wysyłana przez sieć. Nikt nie może przy niej manipulować, a po drugiej stronie ktoś może ją odzyskać i stwierdzić, że to rzeczywiście my ją podpisaliśmy. Adres „od” jest wyprowadzany.

#### Strategia ceny gazu (4:20) {#gas-price-strategy-420}

Cena gazu jest domyślnie ustawiona na około 4,1 gwei — to 4,1 miliarda wei. Chcemy jednak podejść do tego bardziej strategicznie i zobaczyć, co dzieje się teraz onchain. Widzimy, że ostatni blok miał 78 transakcji, a cena gazu wahała się od około 5 w dół do pewnego minimum. Zasadniczo musielibyśmy być powyżej 5, aby zostać wydobytym w tym bloku. Ustawmy więc cenę gazu na 5,001 — tylko odrobinę więcej.

#### Konwersja na wei (5:20) {#converting-to-wei-520}

Musimy dokonać konwersji na wei. W Ethereum masz do czynienia głównie z dwoma nominałami: ETH, o którym ludzie zazwyczaj mówią, a następnie wei, które jest jak bardzo mały ułamek ETH. Gwei — to, czego używamy do cen gazu — jest pomiędzy. Powód tego jest podobny do tego, dlaczego nie chodzimy i nie rozmawiamy w ułamkach groszy.

Alice ma 0,18 ETH, a my wyślemy 0,05 ETH do Boba. Wpisujemy cenę gazu wynoszącą 5 gwei.

#### Podpisywanie i rozgłaszanie (7:02) {#signing-and-broadcasting-702}

Kiedy Alice decyduje się podpisać transakcję, wylatuje ona jako podpisana transakcja, która może przejść przez sieć. Nikt nie może przy niej majstrować — po drugiej stronie ktoś może wywnioskować, że to Alice ją podpisała, a ponadto zawiera ona wszystkie informacje o tym, do kogo chcemy wysłać środki, oraz o gazie, który trafia do górnika.

Bierzemy tę podpisaną transakcję i podłączamy ją do funkcji wysyłania modułu blockchain. Kiedy klikam wyślij, daje nam to hash — hash transakcji. Zasadniczo wysłałem ją do rozproszonej sieci, a oni zwrócili mi hash transakcji. Wychodzi ona do sieci, a następnie trafia do puli transakcji — gdzie wszyscy licytują, aby ich transakcja przeszła.

#### Sprawdzanie bloku (8:41) {#checking-the-block-841}

Możemy odpytać blockchain o naszą transakcję. Rzeczywiście, została już wydobyta. Możemy spojrzeć na blok, posortować według ceny gazu i znaleźć siebie. Oto nasza transakcja z ceną gazu 5,001 — Alice wysyłająca do Boba, bez żadnych dodatkowych danych. Jesteśmy tam, około cztery lub pięć pozycji od dołu.

#### Wysyłanie danych wraz z transakcją (9:54) {#sending-data-with-a-transaction-954}

Jesteśmy w stanie wysłać wartość i licytować, aby nasza transakcja została rozpoznana onchain. Spójrzmy jednak na jeszcze jedną rzecz — pole danych. Możemy wysyłać rzeczy wraz z naszą transakcją. Będą one w formacie szesnastkowym. Alice wyśle kolejne sześć dolarów do Boba, a my dołączymy wiadomość: „hej Bob”. Widzimy „hej Bob” przekonwertowane na format hex.

Podpisujemy tę transakcję, wysyłamy ją do górnika, trafia ona do sieci, a my otrzymujemy z powrotem hash. Obserwujemy, jak zostaje wydobyta, i tak się dzieje. Kiedy sprawdzamy ten blok, widzimy naszą transakcję z dołączonymi danymi.

#### Pula transakcji i podbijanie gazu (12:43) {#transaction-pool-and-gas-bumping-1243}

W ramach ostatniej demonstracji umieściłem transakcję w puli z bardzo niską ceną gazu — około 1,001 gwei. Siedzi tam niewydobyta, ponieważ nie motywujemy górników wystarczająco. Widzimy, że transakcja oczekuje w puli transakcji. Pula ma od stu do trzystu transakcji, ale ostatnie wydobywane bloki pokazują, że najmniejsza cena gazu wynosi około 5.

Musimy więc ponownie przesłać tę transakcję — podbijmy ją do 10. To znacznie więcej, niż potrzeba, ale prześlemy ponownie tę samą transakcję z tym samym nonce, ale wyższą ceną gazu. Sieć mówi: „ta sama osoba, ta sama transakcja, gotowa zapłacić więcej”. Zostaje ona odebrana i wydobyta w następnym bloku.

#### Podsumowanie (14:52) {#summary-1452}

Wysłaliśmy transakcję, zapłaciliśmy trochę gazu, aby zmotywować górnika do umieszczenia jej w łańcuchu bloków. Wysłaliśmy również dane wraz z transakcją — jest mnóstwo naprawdę fajnych rzeczy, które możemy teraz zrobić, gdy mamy te dane wywołania, a później zajmiemy się inteligentnymi kontraktami i wieloma innymi ciekawymi rzeczami.