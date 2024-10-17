---
title: Cancun-Deneb (Dencun) FAQ
description: Często zadawane pytania dotyczące uaktualnienia sieci Cancun-Deneb (Dencun)
lang: pl
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) to uaktualnienie sieci Ethereum, które aktywuje **Proto-Danksharding (EIP-4844)**, wprowadzając tymczasowe **bloby** danych do tańszego przechowywania pakietów zbiorczych [warstwy 2 (L2)](/glossary/#layer-2).

Nowy rodzaj transakcji pozwala dostawcom pakietów zbiorczych na bardziej ekonomiczne przechowywanie danych w tzw. „blobach”. Bloby gwarantują, że będą dostępne dla sieci przez około 18 dni (dokładniej 4096 [epok](/glossary/#epoch)). Po tym okresie bloby są usuwane z sieci, ale aplikacje nadal mogą zweryfikować ważność ich danych za pomocą dowodów.

Zmniejsza to znacznie koszty pakietów zbiorczych, ogranicza wzrost łańcucha i pomaga wspierać większą ilość użytkowników, jednocześnie zachowując bezpieczeństwo i zdecentralizowany zestaw operatów węzłów.

## Kiedy możemy się spodziewać niższych opłat za pakiety zbiorcze ze względu na Proto-Danksharding? {#when}

- To uaktualnienie zostało aktywowane w 269568 epoce **13 marca 2024 roku o godzinie 13:55 (UTC)**
- Wszyscy główni dostawcy pakietów zbiorczych, tacy jak Arbitrum czy Optimism, poinformowali, że bloby będą wspierane natychmiast po uaktualnieniu
- Harmonogram indywidualnej obsługi pakietów zbiorczych może się różnić, ponieważ każdy dostawca musi zaktualizować swoje systemy, aby móc korzystać z nowej przestrzeni blobów

## Jak można przekonwertować ETH po hard forku? {#scam-alert}

- **Nic nie musisz robić ze swoim ETH**: po uaktualnieniu Dencun nie ma żadnej potrzeby konwersji lub ulepszenia ETH. Salda Twoich kont pozostaną takie same, a ETH, które obecnie posiadasz, pozostanie dostępne w tej samej formie po hard forku.
- **Uważaj na oszustwa!** <Emoji text="⚠️" /> **Każdy, kto mówi Ci, aby „ulepszyć” ETH, próbuje cię oszukać.** Nie musisz nic robić w związku z tym uaktualnieniem. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie na bieżąco jest najlepszą formą obrony przed oszustwami.

[Więcej na temat rozpoznawania i unikania oszustw](/security/)

## Jaki problem rozwiązuje uaktualnienie sieci Dencun? {#network-impact}

Dencun domyślnie skupia się na **skalowalności** (obsłudze większej ilości użytkowników i transakcji) oraz **przystępności opłat**, przy jednoczesnym **zachowaniu decentralizacji** sieci.

Jeśli chodzi o jej rozwój, społeczność Ethereum przyjęła podejście skoncentrowane wokół pakietów zbiorczych, które określa pakiety zbiorcze warstwy 2 jako główny sposób bezpiecznego wsparcia większej liczby użytkowników.

Sieci pakietów zbiorczych zajmują się _przetwarzaniem_ (lub „wykonywaniem”) transakcji niezależnie od sieci głównej, a następnie publikowaniem kryptograficznego dowodu i/lub skompresowanych danych wyników transakcji z powrotem do sieci głównej na potrzeby ewidencjowania. Przechowywanie tych dowodów wiąże się z kosztem (w postaci [gazu](/glossary/#gas)), który przed Proto-Dankshardingiem musiał być przechowywany na stałe przez wszystkich operatorów węzłów sieci, przez co było to kosztowne zadanie.

Wprowadzenie Proto-Dankshardingu w uaktualnieniu Dencun dodaje tańsze przechowywanie danych dla tych dowodów, wymagając od operatorów węzłów jedynie przechowywania tych danych przez około 18 dni, po których dane można bezpiecznie usunąć, zapobiegając zwiększeniu wymagań sprzętowych.  Ponieważ pakiety zbiorcze mają 7-dniowy okres wypłacania, ich model bezpieczeństwa pozostaje niezmieniony, o ile bloby pozostają dostępne we warstwie 1 przez ten czas. 18-dniowy okres odcinania zapewnia znaczący bufor dla tego okresu.

[Więcej na temat skalowania Ethereum](/roadmap/scaling/)

## Jak uzyskuje się dostęp do danych starych blobów? {#historical-access}

Podczas gdy zwykłe węzły Ethereum zawsze będą przechowywać _obecny stan_ sieci, historyczne dane blobów mogą zostać usunięte po około 18 dniach po ich wprowadzeniu. Przed porzuceniem tych danych Ethereum upewnia się, że były one dostępne dla wszystkich uczestników sieci, dając czas na:

- Pobranie i przechowanie danych przez zainteresowane podmioty.
- Zamknięcie wszystkich okresów kwestionowania pakietu zbiorczego.
- Sfinalizowanie transakcji pakietu zbiorczego.

_Historyczne_ dane blobów mogą być pożądane z różnych powodów oraz mogą być przechowywane i udostępniane przy użyciu różnych zdecentralizowanych protokołów:

- **Zewnętrzne protokoły indeksowania**, np. The Graph, przechowują te dane za pośrednictwem zdecentralizowanych sieci operatorów węzłów, motywowanych przez mechanizmy kryptoekonomiczne.
- **BitTorrent** to zdecentralizowany protokół, w którym wolontariusze mogą przechowywać i udostępniać te dane innym.
- **[Sieć Ethereum portal](/developers/docs/networking-layer/portal-network/)** ma na celu zapewnienie dostępu do wszystkich danych Ethereum przez zdecentralizowaną sieć operatorów węzłów poprzez rozdzielanie danych pomiędzy uczestników, podobnie jak BitTorrent.
- **Indywidualni użytkownicy** zawsze mogą przechowywać własne kopie dowolnych danych do celów historycznych.
- **Dostawcy pakietów zbiorczych** są skłonni do przechowywania tych danych w celu polepszenia doświadczeń użytkownika ich pakietu zbiorczego.
- **Eksploratory bloków** zazwyczaj mają archiwalne węzły, które indeksują i przechowują te wszystkie informacje dla łatwego odniesienia historycznego, udostępniając je dla użytkowników za pomocą interfejsu internetowego.

Należy pamiętać, że odzyskiwanie historycznego stanu działa w oparciu o **model zaufania 1 z N**. Oznacza to, że potrzebujesz danych tylko od _jednego wiarygodnego źródła_, aby zweryfikować jego poprawność na podstawie obecnego stanu sieci.

## W jaki sposób to uaktualnienie przyczynia się do poszerzenia planu działania Ethereum? {#roadmap-impact}

Proto-Danksharding przygotowuje grunt pod pełne wdrożenie [Dankshardingu](/roadmap/danksharding/). Danksharding został zaprojektowany tak, aby rozdzielać dane pakietu zbiorczego pomiędzy operatorów węzłów, dzięki czemu każdy operator musiałby obsługiwać tylko niewielką część wszystkich danych. To rozdzielanie zwiększy liczbę blobów danych na blok, co jest niezbędne do skalowania Ethereum, aby mogła ona obsługiwać większą ilość użytkowników i transakcji.

Ta skalowalność ma kluczowe znaczenie dla [obsługiwania miliardów użytkowników na Ethereum](/roadmap/scaling/) z przystępnymi opłatami i bardziej zaawansowanymi aplikacjami, przy jednoczesnym zachowaniu zdecentralizowanej sieci. Bez tych zmian wymagania sprzętowe dla operatorów węzłów zwiększałyby się, stwarzając konieczność posiadania coraz droższego sprzętu. Mogłoby to wykluczyć mniejszych operatorów, powodując koncentrację kontroli sieci wokół paru dużych operatorów, co byłoby sprzeczne z zasadą decentralizacji.

## Czy to uaktualnienie ma wpływ na wszystkich klientów konsensusu i klientów walidatora Ethereum? {#client-impact}

Tak, Proto-Danksharding (EIP-4844) wymaga zaktualizowania zarówno klienta wykonawczego, jak i klienta konsensusu. Wszystkie główne klienty Ethereum wypuściły wersje wspierające to uaktualnienie. Aby zachować synchronizację z siecią Ethereum po uaktualnieniu, operatorzy węzłów muszą się upewnić, że korzystają z obsługiwanej wersji klienta. Należy pamiętać, że informacje o wersjach klienta zależą od czasu, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne szczegóły. [Sprawdź szczegółowe informacje o wspieranych wersjach klientów](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Klienty konsensusu zajmują się oprogramowaniem _walidatora_, które zostało zaktualizowane w celu uwzględnienia uaktualnienia.

## W jaki sposób Cancun-Deneb (Dencun) wpływa na Goerli lub inne sieci testowe Ethereum? {#testnet-impact}

- Devnety, Goerli, Sepolia i Holesky przeszły uaktualnienie Dencun i mają w pełni działający Proto-Danksharding
- Twórcy pakietów zbiorczych mogą używać tych sieci do testowania EIP-4844
- Większość użytkowników nie odczuje tej zmiany w każdej sieci testowej

## Czy wszystkie transakcje w warstwach 2 będą wykorzystywać tymczasową przestrzeń blob lub czy będzie można dokonać wyboru? {#calldata-vs-blobs}

Transakcje pakietu zbiorczego w warstwie 2 Ethereum zawierają opcję korzystania z dwóch rodzajów przechowywania danych: tymczasowej przestrzeni blob lub stałych danych wywoławczych (calldata) inteligentnego kontraktu. Przestrzeń blobów jest ekonomicznym wyborem, zapewniającym tymczasową pamięć przy niższych kosztach. Gwarantuje ona dostępność danych dla wszystkich potrzebnych okresów kwestionowania. Z drugiej strony dane wywoławcze inteligentnego kontraktu oferują stałą pamięć, ale jest ona droższa.

Decyzja o użyciu przestrzeni blobów lub danych wywoławczych jest podejmowana głównie przez dostawców pakietów zbiorczych. Podejmują oni tę decyzję w oparciu o aktualne zapotrzebowanie na przestrzeń blobów. Jeśli zapotrzebowanie na przestrzeń blobów jest wysokie, pakiety zbiorcze mogą zdecydować się na dane wywoławcze, aby zapewnić, że dane zostaną opublikowane w odpowiednim czasie.

Chociaż teoretycznie możliwe jest, aby użytkownicy wybierali swój preferowany rodzaj pamięci, to zazwyczaj dostawcy pakietów zbiorczych zarządzają tym wyborem. Oferowanie tej opcji użytkownikom zwiększyłoby złożoność, szczególnie w przypadku opłacalnych łączonych transakcji. Aby uzyskać szczegółowe informacje na temat tego wyboru, użytkownicy powinni zapoznać się z dokumentacją dostarczoną przez poszczególnych dostawców pakietów zbiorczych.

## Czy EIP-4844 zredukuje gaz w warstwie 1? {#l1-fee-impact}

Nieznacznie. Wprowadzony został nowy rynek gazu wyłącznie dla przestrzeni blobów, z którego mogą korzystać dostawcy pakietów zbiorczych. _Chociaż opłaty w warstwie 1 mogą zostać obniżone przez przeniesienie danych pakietu zbiorczego do blobów, to uaktualnienie koncentruje się głównie na redukcji opłat w warstwie 2. Obniżenie opłat w warstwie 1 (sieć główna) może nastąpić jako drugorzędny efekt w mniejszym stopniu._

- Obniżenie gazu w warstwie 1 będzie proporcjonalne do adopcji/użycia danych blob przez dostawców pakietów zbiorczych
- Gaz w warstwie 1 najprawdopodobniej pozostanie konkurencyjny ze względu na działalność niezwiązaną z pakietami zbiorczymi
- Pakiety zbiorcze, które wykorzystują przestrzeń blobów, będą wymagać mniej gazu w warstwie 1, co pomoże obniżyć gaz w warstwie 1 w najbliższej przyszłości
- Przestrzeń blobów jest nadal ograniczona, więc jeśli bloby w bloku są nasycone/pełne, wówczas pakiety zbiorcze mogą być w międzyczasie zobowiązane do opublikowania swoich danych jako danych stałych, co spowodowałoby wzrost cen gazu w warstwie 1 i 2

## Czy zmniejszy to opłaty w innych blockchainach EVM warstwy 1? {#alt-l1-fee-impact}

Nie. Korzyści z Proto-Dankshardingu są charakterystyczne dla pakietów zbiorczych warstwy 2 Ethereum, które przechowują swoje dowody w warstwie 1 (sieć główna).

Sama kompatybilność z wirtualną maszyną Ethereum (EVM) nie oznacza, że sieć odniesie jakiekolwiek korzyści z tego uaktualnienia. Sieci, które działają niezależnie od Ethereum (niezależnie od tego, czy są kompatybilne z EVM czy nie) nie przechowują swoich danych w Ethereum i nie odniosą jakichkolwiek korzyści z tego uaktualnienia.

[Więcej na temat pakietów zbiorczych warstwy 2](/layer-2/)

## Jesteś raczej wzrokowcem? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Odblokowanie skalowania Ethereum, EIP-4844 — Finematics_

<YouTube id="dFjyUY3e53Q" />

_Podstawy przestrzeni blobów z Domothy — Bankless_

## Further reading {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transakcje shard blob (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Ogłoszenie sieci głównej Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) — _Blog Fundacji Ethereum_
- [Przewodnik po Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) — _Jon Charbonneau_
- [Często zadawane pytania na temat Proto-Dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) — _Vitalik Buterin_
- [Dogłębne objaśnienie EIP-4844: Podstawa uaktualnienia Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) — _Ebunker_
- [AllCoreDevs aktualizacja 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) — _Tim Beiko_
