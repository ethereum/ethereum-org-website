---
title: Cancun-Deneb (Dencun)
metaTitle: FAQ Cancun-Deneb (Dencun)
description: Często zadawane pytania dotyczące aktualizacji sieci Cancun-Deneb (Dencun)
lang: pl
---

Cancun-Deneb (Dencun) to aktualizacja sieci Ethereum, która aktywuje **proto-danksharding (EIP-4844)**, wprowadzając tymczasowe **bloby** danych w celu tańszego przechowywania danych rollupów [warstwy 2 (L2)](/glossary/#layer-2).

Nowy typ transakcji umożliwia dostawcom rollupów bardziej opłacalne przechowywanie danych w tak zwanych „blobach”. Gwarantuje się, że bloby będą dostępne w sieci przez około 18 dni (dokładniej 4096 [epok](/glossary/#epoch)). Po tym okresie bloby są usuwane z sieci, ale aplikacje nadal mogą weryfikować ważność swoich danych za pomocą dowodów. 

Znacznie obniża to koszty rollupów, ogranicza rozrost łańcucha i pomaga obsługiwać większą liczbę użytkowników przy jednoczesnym zachowaniu bezpieczeństwa i zdecentralizowanego zestawu operatorów węzłów.

## Kiedy możemy spodziewać się, że rollupy odzwierciedlą niższe opłaty dzięki proto-dankshardingowi? {#when}

- Ta aktualizacja została aktywowana w epoce 269568, **13 marca 2024 r. o 13:55 (UTC)**
- Wszyscy główni dostawcy rollupów, tacy jak Arbitrum czy Optimism, zasygnalizowali, że bloby będą obsługiwane natychmiast po aktualizacji
- Harmonogram wsparcia dla poszczególnych rollupów może się różnić, ponieważ każdy dostawca musi zaktualizować swoje systemy, aby skorzystać z nowej przestrzeni blobów

## Jak można przekonwertować ETH po twardym rozwidleniu? {#scam-alert}

- **Twoje ETH nie wymaga żadnych działań**: Po aktualizacji Dencun w Ethereum nie ma potrzeby konwertowania ani aktualizowania ETH. Salda Twojego konta pozostaną takie same, a posiadane obecnie ETH pozostanie dostępne w dotychczasowej formie po twardym rozwidleniu.
- **Uwaga na oszustwa!** <Emoji text="⚠️" /> **każdy, kto instruuje Cię, aby „zaktualizować” Twoje ETH, próbuje Cię oszukać.** W związku z tą aktualizacją nie musisz nic robić. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie poinformowanym to najlepsza obrona przed oszustwami.

[Więcej o rozpoznawaniu i unikaniu oszustw](/security/)

## Jaki problem rozwiązuje aktualizacja sieci Dencun? {#network-impact}

Dencun rozwiązuje przede wszystkim problem **skalowalności** (obsługa większej liczby użytkowników i transakcji) przy **przystępnych opłatach**, jednocześnie **utrzymując decentralizację** sieci.

Społeczność Ethereum przyjęła podejście do rozwoju „skoncentrowane na rollupach”, które stawia rollupy warstwy 2 jako główny sposób na bezpieczną obsługę większej liczby użytkowników.

Sieci rollupów zajmują się _przetwarzaniem_ (lub „wykonywaniem”) transakcji oddzielnie od Sieci głównej, a następnie publikują dowód kryptograficzny i/lub skompresowane dane transakcji z wynikami z powrotem w Sieci głównej w celu prowadzenia rejestru. Przechowywanie tych dowodów wiąże się z kosztami (w postaci [gazu](/glossary/#gas)), które przed proto-dankshardingiem musiały być trwale przechowywane przez wszystkich operatorów węzłów sieci, co czyniło to drogim zadaniem.

Wprowadzenie proto-dankshardingu w aktualizacji Dencun dodaje tańsze przechowywanie danych dla tych dowodów, wymagając od operatorów węzłów przechowywania tych danych tylko przez około 18 dni, po czym dane mogą zostać bezpiecznie usunięte, aby zapobiec wzrostowi wymagań sprzętowych. Ponieważ rollupy zazwyczaj mają 7-dniowy okres wypłaty, ich model bezpieczeństwa pozostaje niezmieniony, dopóki bloby są dostępne na L1 przez ten czas. 18-dniowe okno usuwania zapewnia znaczny bufor dla tego okresu.

[Więcej o skalowaniu Ethereum](/roadmap/scaling/)

## Jak uzyskuje się dostęp do starych danych blobów? {#historical-access}

Podczas gdy zwykłe węzły Ethereum zawsze będą przechowywać _obecny stan_ sieci, historyczne dane blobów mogą zostać odrzucone około 18 dni po ich wprowadzeniu. Przed odrzuceniem tych danych Ethereum upewnia się, że zostały one udostępnione wszystkim uczestnikom sieci, dając czas na:

- Pobrane i przechowanie danych przez zainteresowane strony.
- Zakończenie wszystkich okresów wyzwań rollupów.
- Finalizację transakcji rollupów.

_Historyczne_ dane blobów mogą być pożądane z różnych powodów i można je przechowywać oraz uzyskiwać do nich dostęp za pomocą kilku zdecentralizowanych protokołów:

- **Protokoły indeksowania stron trzecich**, takie jak The Graph, przechowują te dane za pośrednictwem zdecentralizowanej sieci operatorów węzłów motywowanych mechanizmami kryptoekonomicznymi.
- **BitTorrent** to zdecentralizowany protokół, w którym wolontariusze mogą przechowywać i udostępniać te dane innym.
- **[Portal Network](/developers/docs/networking-layer/portal-network/)** ma na celu zapewnienie dostępu do wszystkich danych Ethereum za pośrednictwem zdecentralizowanej sieci operatorów węzłów poprzez dystrybucję danych wśród uczestników podobnie jak w BitTorrent.
- **Indywidualni użytkownicy** zawsze mogą swobodnie przechowywać własne kopie dowolnych danych, które chcą zachować do celów historycznych.
- **Dostawcy rollupów** są motywowani do przechowywania tych danych w celu poprawy doświadczeń użytkowników ich rollupa.
- **Eksploratory bloków** zazwyczaj uruchamiają węzły archiwalne, które indeksują i przechowują wszystkie te informacje w celu łatwego odniesienia historycznego, dostępnego dla użytkowników za pośrednictwem interfejsu internetowego.

Należy zauważyć, że odzyskiwanie historycznego stanu działa w **modelu zaufania 1 z N**. Oznacza to, że potrzebujesz danych tylko z _jednego wiarygodnego źródła_, aby zweryfikować ich poprawność przy użyciu obecnego stanu sieci.

## W jaki sposób ta aktualizacja przyczynia się do szerszej mapy drogowej Ethereum? {#roadmap-impact}

Proto-danksharding przygotowuje grunt pod pełne wdrożenie [dankshardingu](/roadmap/danksharding/). Danksharding ma na celu rozdzielenie przechowywania danych rollupów między operatorów węzłów, dzięki czemu każdy operator musi obsługiwać tylko niewielką część wszystkich danych. Ta dystrybucja zwiększy liczbę blobów danych na blok, co jest niezbędne do skalowania Ethereum w celu obsługi większej liczby użytkowników i transakcji.

Ta skalowalność ma kluczowe znaczenie dla [obsługi miliardów użytkowników na Ethereum](/roadmap/scaling/) przy przystępnych opłatach i bardziej zaawansowanych aplikacjach, przy jednoczesnym utrzymaniu zdecentralizowanej sieci. Bez tych zmian wymagania sprzętowe dla operatorów węzłów wzrosłyby, prowadząc do konieczności posiadania coraz droższego sprzętu. Mogłoby to wykluczyć mniejszych operatorów, skutkując koncentracją kontroli nad siecią wśród kilku dużych operatorów, co byłoby sprzeczne z zasadą decentralizacji.

## Czy ta aktualizacja wpływa na wszystkich klientów konsensusu i walidatorów Ethereum? {#client-impact}

Tak, proto-danksharding (EIP-4844) wymaga aktualizacji zarówno klientów wykonawczych, jak i klientów konsensusu. Wszyscy główni klienci Ethereum wydali wersje obsługujące aktualizację. Aby utrzymać synchronizację z siecią Ethereum po aktualizacji, operatorzy węzłów muszą upewnić się, że używają obsługiwanej wersji klienta. Należy pamiętać, że informacje o wydaniach klientów są wrażliwe na czas, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne szczegóły. [Zobacz szczegóły dotyczące obsługiwanych wydań klientów](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Klienci konsensusu obsługują oprogramowanie _walidatora_, które zostało w całości zaktualizowane w celu dostosowania do aktualizacji.

## Jak Cancun-Deneb (Dencun) wpływa na sieci testowe Ethereum? {#testnet-impact}

- Sieci deweloperskie (devnets), Sepolia i Holesky przeszły aktualizację Dencun i mają w pełni funkcjonujący proto-danksharding
- Deweloperzy rollupów mogą korzystać z tych sieci do testowania EIP-4844
- Większość użytkowników w ogóle nie odczuje tej zmiany w żadnej sieci testowej

## Czy wszystkie transakcje na L2 będą teraz korzystać z tymczasowej przestrzeni blobów, czy będzie można wybrać? {#calldata-vs-blobs}

Transakcje rollupów w warstwie 2 (L2) Ethereum mają możliwość korzystania z dwóch rodzajów przechowywania danych: tymczasowej przestrzeni blobów lub stałych danych wywołania inteligentnego kontraktu. Przestrzeń blobów to ekonomiczny wybór, zapewniający tymczasowe przechowywanie przy niższych kosztach. Gwarantuje dostępność danych przez wszystkie niezbędne okresy wyzwań. Z drugiej strony dane wywołania inteligentnego kontraktu oferują stałe przechowywanie, ale są droższe.

Decyzję o użyciu przestrzeni blobów lub danych wywołania podejmują przede wszystkim dostawcy rollupów. Opierają tę decyzję na bieżącym popycie na przestrzeń blobów. Jeśli popyt na przestrzeń blobów jest wysoki, rollupy mogą zdecydować się na dane wywołania, aby upewnić się, że dane zostaną opublikowane w odpowiednim czasie.

Chociaż teoretycznie możliwe jest, aby użytkownicy wybrali preferowany typ przechowywania, dostawcy rollupów zazwyczaj zarządzają tym wyborem. Zaoferowanie tej opcji użytkownikom zwiększyłoby złożoność, szczególnie w przypadku opłacalnego grupowania transakcji. Aby uzyskać szczegółowe informacje na temat tego wyboru, użytkownicy powinni zapoznać się z dokumentacją dostarczoną przez poszczególnych dostawców rollupów.

## Czy 4844 zmniejszy gaz na L1? {#l1-fee-impact}

Nieznacznie. Wprowadzany jest nowy rynek gazu wyłącznie dla przestrzeni blobów, do użytku przez dostawców rollupów. _Chociaż opłaty na L1 mogą ulec obniżeniu poprzez przeniesienie danych rollupów do blobów, ta aktualizacja skupia się przede wszystkim na obniżeniu opłat na L2. Obniżenie opłat na L1 (Sieć główna) może wystąpić jako efekt drugiego rzędu w mniejszym stopniu._

- Redukcja gazu na L1 będzie proporcjonalna do adopcji/wykorzystania danych blobów przez dostawców rollupów
- Gaz na L1 prawdopodobnie pozostanie konkurencyjny ze względu na aktywność niezwiązaną z rollupami
- Rollupy, które przyjmą wykorzystanie przestrzeni blobów, będą wymagały mniej gazu na L1, pomagając obniżyć opłaty za gaz na L1 w najbliższym czasie
- Przestrzeń blobów jest nadal ograniczona, więc jeśli bloby w bloku są nasycone/pełne, rollupy mogą być zmuszone do publikowania swoich danych jako danych stałych w międzyczasie, co spowodowałoby wzrost cen gazu na L1 i L2

## Czy to obniży opłaty na innych łańcuchach bloków warstwy 1 EVM? {#alt-l1-fee-impact}

Nie. Korzyści z proto-dankshardingu są specyficzne dla rollupów warstwy 2 Ethereum, które przechowują swoje dowody w warstwie 1 (Sieć główna).

Sama kompatybilność z Maszyną Wirtualną Ethereum (EVM) nie oznacza, że sieć odniesie jakiekolwiek korzyści z tej aktualizacji. Sieci, które działają niezależnie od Ethereum (niezależnie od tego, czy są kompatybilne z EVM, czy nie), nie przechowują swoich danych w Ethereum i nie odniosą żadnych korzyści z tej aktualizacji.

[Więcej o rollupach warstwy 2](/layer-2/)

## Wolisz uczyć się wzrokowo? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Odblokowanie skalowania Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 z Domothym — Bankless_

## Dalsza lektura {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transakcje blobów shardów (proto-danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Ogłoszenie Dencun w Sieci głównej](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog Ethereum Foundation_
- [Autostopem przez Ethereum: proto-danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQ proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dogłębne wyjaśnienie EIP-4844: rdzeń aktualizacji Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Aktualizacja AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_