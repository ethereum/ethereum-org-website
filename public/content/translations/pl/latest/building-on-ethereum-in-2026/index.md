---
title: "Budowanie na Ethereum w 2026 roku: co się zmieniło"
description: "Trzy aktualizacje protokołu od 2023 roku zmieniły dwie rzeczy, na których zależy budowniczym: koszty korzystania z L1 oraz możliwości zwykłych portfeli. Praktyczny przewodnik po budowaniu na Ethereum w 2026 roku."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "opłaty za gaz"
  - "abstrakcja konta"
  - "aktualizacje protokołu"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Budowanie na Ethereum w 2026 roku
lang: pl
---

Jeśli twój model mentalny Ethereum ukształtował się w latach 2021–2023, jest on już nieaktualny. Trzy aktualizacje protokołu od tamtego czasu: [Dencun](/roadmap/dencun/) w marcu 2024 r., [Pectra](/roadmap/pectra/) w maju 2025 r. oraz [Fusaka](/roadmap/fusaka/) w grudniu 2025 r., zmieniły dwie rzeczy, na których zależy budowniczym: koszty korzystania z warstwy 1 (L1) oraz możliwości zwykłych portfeli.

## Sieć główna znów jest tania {#mainnet-is-cheap-again}

Reżim opłat z lat 2021–2023 nie jest już bezpiecznym domyślnym założeniem.

Według stanu na 5 maja 2026 r., monitor gazu Etherscan pokazuje standardowy gaz na poziomie około 0,15 gwei, ze średnimi dziennymi bliskimi 0,5 gwei w kwietniu. Podstawowy transfer ETH kosztuje na tym poziomie mniej niż centa, a w typowych ostatnich dniach zamyka się w niskich, jednocyfrowych wartościach centowych. Trend ten był spadkowy podczas każdej z ostatnich aktualizacji, a kolejna, [Glamsterdam](/roadmap/glamsterdam/), ma jeszcze bardziej obniżyć opłaty. To sprawia, że stwierdzenie „sieć główna Ethereum jest zbyt droga dla większości aplikacji” jest już nieaktualnym punktem wyjścia.

Jeśli szukasz prostej, praktycznej zasady, użyj matematyki gazu zamiast starych mitów. Przy 0,5 gwei (ostatnia średnia z kwietnia) i ETH na poziomie około 2350 USD, przykładowe koszty wyglądają następująco.

| Operacja | Zużyty gaz | Przykładowy koszt |
| :-------------- | :---------- | :---------------- |
| Transfer ETH | 21,000 | **$0.025** |
| Transfer ERC-20 | \~65,000 | **$0.076** |
| Zatwierdzenie ERC-20 | \~46,000 | **$0.054** |
| Wymiana | \~180,000 | **$0.21** |
| Wdrożenie ERC-20 | \~1,200,000 | **$1.41** |

To są przykłady, a nie gwarancje. Koszty zmieniają się wraz z ceną ETH, ceną gazu i złożonością kontraktu. Odczyty gwei mogą ulegać znacznym wahaniom w ciągu normalnego miesiąca, podczas gdy koszt w dolarach ledwie drgnie, ponieważ rollupy obsługują obecnie około 95 procent transakcji Ethereum, a L1 zazwyczaj działa znacznie poniżej swojego celu dla bloku. Opłaty w sieci głównej są teraz na tyle niskie, że wiele aplikacji może z powodzeniem działać w sieci głównej.

### Dlaczego koszty spadły {#why-costs-fell}

Trzy aktualizacje wykonały większość pracy.

Dencun (marzec 2024 r.) wprowadził EIP-4844 i dał rollupom ich własny pas danych poprzez bloby, z oddzielnym rynkiem opłat. Rollupy przestały konkurować ze zwykłym ruchem wykonawczym o tę samą przestrzeń w bloku.

Pectra została aktywowana 7 maja 2025 r. EIP-7691 zwiększył przepustowość blobów z docelowych 3 / maksymalnie 6 blobów na blok do docelowych 6 / maksymalnie 9, co rozszerzyło tani pas danych używany przez rollupy i obniżyło opłaty w warstwie 2 (L2).

Fusaka została aktywowana 3 grudnia 2025 r. Jej główną zmianą w zakresie pojemności był PeerDAS, który pozwala walidatorom próbkować dane blobów zamiast pobierać każdy blob w całości, a to właśnie próbkowanie sprawia, że większa liczba blobów jest bezpieczna w warstwie sieci. Równolegle społeczność podniosła limit gazu L1 z 30 mln do 60 mln w 2025 r., a EIP-7935 z aktualizacji Fusaka ustandaryzował 60 mln jako nową wartość domyślną. EIP-7825 ogranicza każdą pojedynczą transakcję do \~16,78 mln gazu, czego większość aplikacji nigdy nie zauważy, ale bardzo duże wdrożenia i monolityczne wywołania wielokrotne (multicalls) muszą się teraz w tym zmieścić. EIP-7951 dodał również natywną weryfikację secp256r1 (P-256) w sieci głównej, co sprawia, że podpisy kluczy dostępu i WebAuthn są znacznie tańsze do weryfikacji w przepływach kont.

Efekt netto jest taki, że sieć główna nie jest już wyceniana jak trwale przeciążony łańcuch.

## Jak EIP-7702 zmienia model konta {#how-eip-7702-changes-the-account-model}

Pectra wprowadziła również EIP-7702, który daje zwykłym portfelom dostęp do zachowań inteligentnych kont, takich jak wsadowanie, sponsorowanie gazu, klucze sesji, przepływy odzyskiwania i przyjazny dla kluczy dostępu UX, bez zmuszania użytkownika do migracji na nowe konto.

Działa to poprzez dodanie nowego typu transakcji (typ `0x04`, `SetCode`), który pozwala EOA ustawić wskaźnik na już wdrożony kod kontraktu. Użytkownik zachowuje ten sam adres, oryginalny klucz EOA zachowuje ostateczną kontrolę nad kontem, a delegowanie może zostać później zmienione lub zresetowane do adresu zerowego.

Dla budowniczych aplikacji praktyczna zmiana polega na proszeniu portfela o wynik, a nie o niskopoziomową konfigurację EIP-7702. Jeśli użytkownik musi zatwierdzić i dokonać wymiany w jednym przepływie, zażądaj wsadu poprzez ERC-5792 `wallet_sendCalls`. Portfel może zdecydować, czy użyć EIP-7702, ERC-4337, czy innego systemu kont.

Delegowany kod stanowi granicę bezpieczeństwa. Jeśli portfel wskaże EOA na błędny lub złośliwy kod, kod ten może wykonywać wywołania jako użytkownik, w tym zatwierdzenia tokenów, transfery i interakcje z aplikacjami. Budowniczowie powinni traktować cele delegowania jak infrastrukturę portfela, polegając na wdrożeniach zweryfikowanych przez portfel i nie prosząc użytkowników o lekkomyślne delegowanie do kodu kontrolowanego przez aplikację.

## Co to zmienia w sposobie budowania {#what-this-changes-about-how-to-build}

Domyślnym pytaniem budowniczych było kiedyś: „które L2 jest wystarczająco tanie?”. To pytanie nadal ma odpowiedzi, ale nie jest już jedynym. Przy opłatach w L1 rzędu centów za transakcję podczas normalnego obciążenia i EIP-7702 pozwalającym każdemu portfelowi na udostępnienie UX inteligentnego konta bez migracji adresów, bardziej użytecznym domyślnym pytaniem jest to, czy aplikacja powinna działać w sieci głównej, czy też konkretne L2 daje rzeczywistą przewagę w dystrybucji, płynności lub UX, której L1 nie może zapewnić.

Zmienia się również założenie dotyczące konta. Nie projektuj nowych aplikacji tak, jakby każde konto użytkownika było zwykłym EOA opartym na ECDSA, które musi posiadać ETH, zanim zrobi cokolwiek użytecznego. Preferuj interfejsy wsadowania na poziomie portfela, takie jak ERC-5792 `wallet_sendCalls`, zakładaj, że sponsorowanie gazu i klucze sesji staną się normalnymi funkcjami portfela, i traktuj klucze dostępu oraz przepływy odzyskiwania jako część powierzchni UX konta, a nie jako oddzielne hacki onboardingowe.

## Co dalej {#whats-next}

Kolejną nazwaną aktualizacją Ethereum jest Glamsterdam, której głównymi elementami są listy dostępu na poziomie bloku (BALs) oraz wbudowana separacja proponującego i budującego (ePBS). Razem sprawiają one, że bezpieczne jest podniesienie limitu gazu w bloku z dzisiejszych 60 milionów do około 200 milionów, pozostawiając budowniczym większą pojemność L1 do pracy. Aktywacja spodziewana jest w drugiej połowie 2026 roku. Po Glamsterdam planowana jest aktualizacja [Hegotá](https://forkcast.org/upgrade/hegota/), której główną funkcją będą wymuszone przez wybór rozwidlenia listy włączeń (FOCIL).

Dla budowniczych elementami wartymi śledzenia są większa pojemność L1 (BALs), bardziej niezawodne włączanie transakcji (FOCIL) oraz ścieżka w kierunku natywnej abstrakcji konta. ePBS, drugi główny punkt Glamsterdam, to w dużej mierze zmiana infrastrukturalna, która usuwa zależność od zaufania w ramach włączania transakcji w L1. Bezpośrednia zmiana na poziomie aplikacji jest niewielka.

BALs mają na celu utrzymanie niskich kosztów L1 w miarę wzrostu wykorzystania. Mówiąc prościej, blok byłby dostarczany z mapą kont i pamięci masowej, których dotyczy. Klienci mogą użyć tej mapy do wstępnego pobierania danych i równoległego wykonywania niezależnych transakcji, co sprawia, że bezpieczniejsze jest podniesienie limitu gazu L1 bez powodowania, że bloki będą zbyt wolne do weryfikacji. Praktycznym efektem dla budowniczych jest to, że więcej aktywności może powrócić do sieci głównej bez automatycznego odtwarzania reżimu gazowego z lat 2021–2023.

FOCIL polega na wprowadzaniu ważnych transakcji do bloków, nawet jeśli jeden producent bloku wolałby je pominąć. Obecnie, jeśli strona budująca blok zignoruje transakcję, reszta protokołu ma ograniczone możliwości wymuszenia jej dodania. Dzięki EIP-7805 kilku walidatorów mogłoby w efekcie powiedzieć: „widzieliśmy te ważne transakcje czekające w publicznym mempoolu”. Następny blok musi je wtedy uwzględnić, w przeciwnym razie walidatorzy mogą odmówić poparcia tego bloku. Dla budowniczych ma to znaczenie, gdy niezawodny dostęp do L1 jest częścią produktu, w tym narzędzi ochrony prywatności, regulowanych bramek fiat (onramps) lub aplikacji obsługujących użytkowników, którzy mogą być filtrowani przez niektórych dostawców infrastruktury.

Dla budowniczych aplikacji elementem aktualizacji Hegotá, który należy najuważniej obserwować, jest abstrakcja konta. EIP-8141, Transakcje Ramowe (Frame Transactions), dodałby typ transakcji, w którym walidacja, wykonanie i płatność za gaz są podzielone na ramki. W praktyce oznacza to, że inteligentne konto mogłoby samo zweryfikować transakcję, zdefiniować własne reguły podpisu, zatwierdzić, kto płaci za gaz, i wykonać jedną lub więcej akcji bez zależności od EntryPoint ERC-4337, bundlerów czy relayerów uruchamianych przez aplikację.

To zmienia założenia produktu. Sponsorowanie gazu staje się natywnym wzorcem konta zamiast infrastrukturą, którą każda aplikacja musi organizować oddzielnie. Alternatywne schematy podpisów stają się łatwiejsze do obsługi, w tym dzisiejsze klucze dostępu oraz ścieżka odejścia od ECDSA, jeśli migracja postkwantowa stanie się konieczna. Jeśli EIP-8141 lub podobny projekt natywnej abstrakcji konta zostanie wdrożony, model budowniczego zmieni się z „EOA podpisuje transakcję” na „konto definiuje, jak waliduje, płaci za i wykonuje transakcję”.

To jest kierunek, a nie obietnica. EIP-8141 ma status szkicu (Draft) i od maja 2026 r. jest jedynie „rozważany do włączenia” w Hegotá, co oznacza, że zespoły klienckie dyskutują o nim, ale nie zobowiązały się do jego dostarczenia w tej aktualizacji. Praktyczną ścieżką budowania UX konta w 2026 r. nadal jest EIP-7702 plus przepływy portfela ERC-4337, ale budowniczowie powinni projektować tak, jakby programowalne konta stawały się domyślnym modelem konta.

## Co teraz budować inaczej {#what-to-build-differently-now}

Zacznij od ponownego sprawdzenia starych założeń dotyczących opłat. Jeśli twój plan wdrożenia nadal domyślnie traktuje sieć główną Ethereum jako środowisko od 10 do 30 gwei, prawdopodobnie kieruje zbyt dużo pracy poza L1. Sieć główną warto rozważyć w pierwszej kolejności, gdy twoja aplikacja zależy od współdzielonej płynności, kompozycyjności z istniejącymi protokołami, neutralności lub stanu o wysokiej wartości, który powinien znajdować się tam, gdzie bezpieczeństwo i konsensus społeczny Ethereum są najsilniejsze.

Używaj L2 z powodów, które nadal mają znaczenie, w tym dystrybucji, bardzo wysokiego wolumenu transakcji, ekosystemów specyficznych dla aplikacji lub kosztów za akcję, które muszą być jak najbliższe zeru. Nie chodzi o to, by używać „sieci głównej do wszystkiego”. Chodzi o to, że „sieć główna jest zbyt droga” nie powinno już być pierwszym filtrem.

Po stronie konta buduj w oparciu o możliwości portfela zamiast surowych EOA. Twój frontend powinien być gotowy na wywołania wsadowe, sponsorowany gaz, klucze sesji, klucze dostępu i przepływy odzyskiwania, które będą realizowane przez portfele. EIP-7702 i ERC-4337 to dziś praktyczne narzędzia. Natywna abstrakcja konta to kierunek, który należy śledzić w następnej kolejności.

Przestań traktować sieć główną Ethereum jako drogą warstwę rozrachunku, której dotykasz tylko na końcu, i przestań traktować konta użytkowników jako statyczne klucze ECDSA, które muszą posiadać ETH, zanim będą mogły cokolwiek zrobić. Ethereum w 2026 roku zmierza w kierunku tańszego wykonywania w L1 i programowalnych kont. Buduj dla tego świata.

## Dalsza lektura {#further-reading}

- [Ogłoszenie o sieci głównej Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Ogłoszenie o sieci głównej Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Aktualizacja priorytetów protokołu na 2026 rok](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Punkt kontrolny #9 (kwi 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Wytyczne Pectra 7702 na ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 Ustawienie kodu dla EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Listy dostępu na poziomie bloku](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Wymuszone przez wybór rozwidlenia listy włączeń (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Transakcja ramowa](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast Aktualizacja Hegotá](https://forkcast.org/upgrade/hegota/)
- [Monitor gazu Etherscan](https://etherscan.io/gastracker)
- [EIP-7773 Meta hardforka Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Mapa drogowa Glamsterdam na ethereum.org](https://ethereum.org/roadmap/glamsterdam/)