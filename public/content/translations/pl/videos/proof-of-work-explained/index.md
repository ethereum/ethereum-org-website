---
title: "Czym jest dowód pracy (PoW)?"
description: "Przystępne dla początkujących wyjaśnienie mechanizmu konsensusu dowodu pracy (PoW), w tym tego, jak górnicy rozwiązują zagadki kryptograficzne, aby weryfikować transakcje i zabezpieczać sieć blockchain."
lang: pl
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consensus"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Dowód pracy (PoW)"
---

Materiał wyjaśniający od **Binance Academy** omawiający mechanizm konsensusu dowodu pracy (PoW), w tym jego początki, to, jak górnicy rywalizują w rozwiązywaniu zagadek kryptograficznych, oraz jak zabezpiecza on sieć blockchain.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=3EUAcxhuoU4) opublikowanego przez Binance Academy. Został on lekko zredagowany w celu poprawy czytelności.*

#### Początki dowodu pracy (0:00) {#origins-of-proof-of-work-000}

Koncepcja dowodu pracy (PoW), sięgająca swoimi początkami 1993 roku, została opracowana w celu zapobiegania atakom typu odmowa usługi (denial-of-service) i innym nadużyciom, takim jak spam w sieci, poprzez wymaganie od użytkownika usługi wykonania pewnej pracy — co zazwyczaj oznacza czas przetwarzania przez komputer.

W 2009 roku Bitcoin wprowadził innowacyjny sposób wykorzystania dowodu pracy jako algorytmu konsensusu do weryfikacji transakcji i rozgłaszania nowych bloków do blockchaina. Od tego czasu stał się on powszechnie używanym algorytmem konsensusu w wielu kryptowalutach.

#### Jak działa dowód pracy (0:33) {#how-proof-of-work-works-033}

Krótko mówiąc, górnicy w sieci rywalizują ze sobą w rozwiązywaniu złożonych zagadek obliczeniowych. Zagadki te są trudne do rozwiązania, ale łatwe do zweryfikowania, gdy ktoś znajdzie prawidłowe rozwiązanie.

Gdy górnik znajdzie rozwiązanie zagadki, może rozgłosić blok w sieci, gdzie wszyscy inni górnicy zweryfikują, czy rozwiązanie jest poprawne.

#### Przykład kopania Bitcoina (0:56) {#bitcoin-mining-example-056}

Bitcoin to system oparty na blockchainie, utrzymywany przez zbiorową pracę zdecentralizowanych węzłów. Niektóre z tych węzłów są znane jako górnicy i odpowiadają za dodawanie nowych bloków do blockchaina.

Aby to zrobić, górnicy muszą spróbować odgadnąć pseudolosową liczbę znaną jako nonce. Liczba ta, połączona z danymi zawartymi w bloku i przepuszczona przez funkcję skrótu, musi dać wynik spełniający określone warunki — na przykład hash zaczynający się od czterech zer.

Gdy pasujący wynik zostanie znaleziony, inne węzły weryfikują jego poprawność, a węzeł górnika otrzymuje nagrodę za blok. Dlatego niemożliwe jest dodanie nowego bloku do głównego łańcucha bez uprzedniego znalezienia prawidłowego nonce, co z kolei generuje rozwiązanie dla tego konkretnego bloku — nazywane hashem bloku.

#### Dlaczego nazywa się to „dowodem pracy” (1:46) {#why-its-called-proof-of-work-146}

Każdy zweryfikowany blok zawiera hash bloku, który reprezentuje pracę wykonaną przez górnika. Właśnie dlatego nazywa się to dowodem pracy (PoW).

#### Korzyści z bezpieczeństwa (1:54) {#security-benefits-154}

Dowód pracy pomaga chronić sieć przed wieloma różnymi atakami. Udany atak wymagałby ogromnej mocy obliczeniowej i mnóstwa czasu na wykonanie obliczeń. Dlatego byłoby to nieefektywne, ponieważ poniesione koszty byłyby większe niż potencjalne nagrody za zaatakowanie sieci.

#### Ograniczenia (2:10) {#limitations-210}

Jednym z problemów z dowodem pracy jest to, że kopanie wymaga drogiego sprzętu komputerowego, który zużywa duże ilości energii. Chociaż skomplikowane obliczenia algorytmiczne gwarantują bezpieczeństwo sieci, nie można ich wykorzystać do niczego innego.

#### Patrząc w przyszłość (2:25) {#looking-ahead-225}

Chociaż dowód pracy może nie być najbardziej wydajnym rozwiązaniem, nadal jest jedną z najpopularniejszych metod osiągania konsensusu w blockchainach. Istnieją już alternatywne metody i podejścia próbujące rozwiązać te problemy, ale tylko czas pokaże, jaka metoda zostanie następcą dowodu pracy.