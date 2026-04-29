---
title: "Aktualizacja Ethereum Pectra: co stakujący muszą wiedzieć"
description: "Wyjaśnienie aktualizacji Pectra z perspektywy stakującego, obejmujące praktyczny wpływ na walidatorów, operacje stakingu oraz kluczowe EIP, które wpływają na staking w protokole Ethereum."
lang: pl
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra dla stakujących"
---

Webinar zorganizowany przez **Blockdaemon**, w którym inżynierka blockchain Julia Schmidt (Alluvial) i Freddy Tänzer (Blockdaemon) omawiają, jak aktualizacja Pectra wpływa na staking ETH. Webinar obejmuje wypłaty wyzwalane z warstwy wykonawczej, zwiększenie maksymalnego salda efektywnego, konsolidację walidatorów oraz implikacje dla płynnego stakingu.

*Ten transkrypt jest przystępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=_UpAFpC7X6Y) opublikowanego przez Blockdaemon. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

**Prowadzący:** Witam i zapraszam na ten webinar organizowany przez Blockdaemon, skupiający się na nadchodzącej aktualizacji Ethereum Pectra. Są dziś z nami Julia Schmidt, inżynierka blockchain w Alluvial, oraz Freddy Tänzer, lider ekosystemu Ethereum w Blockdaemon, aby omówić, jak zmiany w Pectra wpłyną na staking ETH, sieć jako całość, usługi płynnego stakingu i nie tylko. Na początek, Freddy — czy mógłbyś dać nam krótki przegląd aktualizacji Pectra i jej wpływu na stakujących?

#### Czym jest Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Pectra to aktualizacja Ethereum zaplanowana na koniec pierwszego kwartału 2025 roku — około marca, choć może się to nieco przesunąć, może na kwiecień. Początkowo miało to być małe rozwidlenie, ale z czasem dodawano coraz więcej rzeczy, więc ostatecznie podzielono ją na dwie części.

Pierwsza część zawiera wiele elementów — na przykład w odniesieniu do inteligentnych kont, abstrakcji konta i tym podobnych — ale chcę się skupić na rzeczach, które są istotne dla naszej publiczności pod kątem zmian w stakingu. Są głównie dwie duże zmiany.

Pierwszą z nich jest fakt, że można wyzwalać wypłaty i wyjścia ze swojego walidatora za pośrednictwem warstwy wykonawczej — poprzez dane uwierzytelniające wypłaty — co w zasadzie eliminuje zależność od operatora węzła. Druga, prawdopodobnie jeszcze większa w skutkach, polega na tym, że maksymalne saldo efektywne walidatora może teraz ulec zmianie. Kiedyś była to stała kwota wynosząca tylko 32 ETH, a teraz może wynosić od 32 do 2048 ETH.

Jest też mniejsza zmiana, która w zasadzie sprawia, że depozyty są znacznie szybsze — rejestrowane onchain w czasie od około 14 godzin do mniej niż godziny — ale myślę, że te dwie pierwsze są najbardziej istotne dla naszej dzisiejszej dyskusji.

#### EIP-7002: wyjścia wyzwalane z warstwy wykonawczej (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Prowadzący:** Jeśli chodzi o pierwszą dużą zmianę, Julio, czy mogłabyś wyjaśnić, jak proces po aktualizacji Pectra zmieni się w stosunku do obecnych sposobów inicjowania wypłat w ekosystemie stakingu Ethereum?

**Julia Schmidt:** Aby proponować i poświadczać bloki, walidator musi być stale online i posiadać stakowane saldo w wysokości 32 ETH. Kiedy konfigurujesz walidatora, aby wziąć udział w mechanizmie konsensusu, ustawiasz dwa klucze. Pierwszy to klucz walidatora, który służy do wykonywania obowiązków walidatora — podpisywania poświadczeń bloków. Drugi to klucz wypłaty, który reprezentuje własność stakowanego ETH.

Masz dwa sposoby na staking: staking solo lub konfiguracje z wieloma powiernikami (multi-custodial), takie jak w Blockdaemon i to, co robimy w Liquid Collective, gdzie możesz wybrać operatora węzła, który wykona wszystkie obowiązki i operacje walidatora w Twoim imieniu. To daje im klucz walidatora, a Ty masz dostęp tylko do klucza wypłaty.

Właściwa wiadomość o wyjściu walidatora może zostać wysłana tylko z klucza walidatora, który jest kontrolowany przez operatora węzła. Wymaga to zaufania do operatora węzła — polegania na nim, że dokona wyjścia Twojego walidatora za Ciebie. Jeśli to zrobią, to świetnie, ale zawsze musisz polegać na tej stronie trzeciej.

Wcześniej działo się tak, że zgadzałeś się na wstępne podpisywanie wiadomości o wyjściu podczas konfiguracji tego wielopowierniczego układu stakingu. Otrzymywałeś wiadomość, której mogłeś użyć później do wyjścia ze swojego walidatora, ale nie wiedziałeś, czy ta wiadomość o wyjściu faktycznie zadziała. Za każdym razem, gdy w Ethereum pojawiała się aktualizacja zmieniająca numer wersji, Twoja wiadomość o wyjściu mogła przestać działać.

W ostatniej aktualizacji Dencun nowe EIP zmieniło czas wygaśnięcia tych wiadomości o wyjściu — ale to było tylko leczenie objawów, a nie rozwiązanie problemu. Rzeczywistym problemem jest to, że właściciel stakowanego ETH nie może wyzwolić wypłaty. Środki mogą być w zasadzie przetrzymywane jako zakładnicy przez operatora węzła.

Zostało to teraz rozwiązane dzięki EIP-7002, które pozwala zarówno kluczowi walidatora, jak i kluczowi wypłaty na wyzwolenie wyjścia z warstwy wykonawczej — po prostu poprzez wysłanie transakcji do specjalnego kontraktu wypłat, gdzie wysyłasz żądanie wypłaty i określasz pełne wyjście walidatora lub częściową wypłatę ze stakowanego salda.

#### EIP-7251: maksymalne saldo efektywne (4:15) {#eip-7251-max-effective-balance-415}

**Prowadzący:** Freddy, czy mógłbyś przedstawić nam przegląd maksymalnego salda efektywnego począwszy od aktualizacji Pectra i jak wpłynie to na osoby, które obecnie stakują?

**Freddy Tänzer:** Tylko dodam — dla naszych klientów instytucjonalnych ta zależność od operatora węzła była zazwyczaj rozwiązywana za pomocą wstępnie podpisanych wiadomości o wyjściu, głównie w celu rozwiania obaw organów regulacyjnych lub obaw o ciągłość biznesową. Musieli oni również dbać o bezpieczeństwo tych wiadomości o wyjściu. Mamy więc do czynienia z wyraźnym uproszczeniem procesu, eliminującym tę zależność.

Teraz, jeśli chodzi o maksymalne saldo efektywne: wiele rzeczy się nie zmienia, a wszystko to jest opcjonalne (opt-in). Nie musisz niczego zmieniać. Celem głównych deweloperów Ethereum i całego ekosystemu jest zmniejszenie liczby walidatorów w sieci. Mamy teraz ponad milion walidatorów, a każdy z nich musi komunikować się z innymi w sprawie poświadczeń i konsensusu. To ogromny ruch w sieci — testy wykazały, że osiągnięcie dwóch milionów walidatorów mogłoby stanowić problem.

Celem jest zmniejszenie liczby walidatorów bez wpływu na bezpieczeństwo sieci — ponieważ całkowita ilość stakowanego ETH pozostałaby stała, po prostu średnio przypadałoby więcej ETH na walidatora.

Dla klienta oznacza to głównie, że musi zdecydować, czy użyć nowego typu walidatora, czy starego. Zależy to od jego potrzeb w zakresie płynności. W obecnej konfiguracji z walidatorami 32 ETH, nagrody z protokołu będą przesyłane na Twoje dane uwierzytelniające wypłaty co dziewięć lub dziesięć dni, zapewniając Ci regularną płynność.

Jednak wiele konfiguracji zakłada, że nagrody są wykorzystywane do kapitalizacji stawki. W przeszłości, podczas kapitalizacji, trzeba było czekać, aż uzbiera się 32 ETH w nagrodach, aby ręcznie uruchomić nowego walidatora. Dzięki nowemu typowi walidatora automatycznie kapitalizujesz swoje nagrody — to więcej nagród i mniej pracy.

Kompromis polega na tym, że nie otrzymujesz nagród regularnie i musisz skonfigurować proces ich odzyskiwania. Wyzwalacze wypłat są teraz zwykłymi transakcjami, które wiążą się z opłatą za gaz, zamiast otrzymywania nagród za darmo w starym modelu.

Są też dobre wieści dotyczące cięcia: początkowa kara za cięcie drastycznie spadnie — o około 128 razy. W przypadku walidatora 32 ETH początkowa kara wynosiła jeden ETH. Po aktualizacji Pectra będzie to ułamek ETH — może 20 lub 25 dolarów. Ma to pozytywne skutki uboczne dla stakingu solo, co jest oczywiście ważne dla wiarygodnej neutralności Ethereum.

Korzyść z automatycznej kapitalizacji przynosi zyski głównie przy mniejszych kwotach stawki. Jeśli masz tysiąc walidatorów, mógłbyś ręcznie uruchamiać nowego co miesiąc. Ale jeśli masz tylko jednego walidatora, w praktyce musiałbyś czekać 32 lata na kapitalizację.

#### Implikacje dla płynnego stakingu (11:25) {#liquid-staking-implications-1125}

**Prowadzący:** Julio, jak konsolidacja większych walidatorów ma się do korzyści płynących z płynnego stakingu? Jak te decyzje będą ważyć w umyśle stakującego po aktualizacji Pectra?

**Julia Schmidt:** W Alluvial uważnie śledzimy te zmiany i chcemy zaoferować oba rozwiązania. Żądania konsolidacji w Pectra to rozwiązanie tymczasowe, które nie powinno wpłynąć na czas zarabiania Twojego salda efektywnego — nie będzie musiało ponownie przechodzić przez kolejkę aktywacji podczas konsolidacji wielu walidatorów. Proces ten jest dość płynny.

Fakt, że początkowa kara za cięcie została obniżona, zmniejsza ryzyko prowadzenia walidatorów o wysokim saldzie. Nacisk ze strony Fundacji Ethereum polega tak naprawdę na konsolidacji w jak największym stopniu, aby zmniejszyć obciążenie sieci. Jest jedna mała wada: w bardzo rzadkim przypadku, gdy walidator o maksymalnym saldzie efektywnym 2048 ETH zostanie poddany cięciu, trafiłby do kolejki wyjścia, a Twoje środki zostałyby zablokowane na dłuższy czas — byłoby to tak, jakby 64 walidatorów zostało poddanych cięciu jednocześnie. Dlatego staralibyśmy się oferować elastyczne limity walidatorów w zależności od apetytu klienta na ryzyko.

Od strony użyteczności, token płynnego stakingu (LST) oczywiście dodaje płynność — nawet przy częściowych wypłatach z warstwy wykonawczej nie będzie to natychmiastowe. Przesyłasz transakcję, trafia ona do kolejki, a następnie następuje epoka wyjścia i epoka wypłaty. Tokeny płynnego stakingu nadal oferują natychmiastową płynność, której częściowe wypłaty nie mogą zapewnić.

#### Następne kroki dla stakujących (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Widzimy, że instytucje finansowe zazwyczaj stakują od 65% do 85% swojego ETH będącego w depozycie, ponieważ potrzebują reszty jako bufora płynności na wypadek umorzeń. Dzięki płynnemu stakingowi można potencjalnie zwiększyć ilość stakowanego ETH, co generuje wyższe nagrody.

Obie strony korzystają na aktualizacji Pectra — płynny staking zyskuje opcję wypłat z warstwy wykonawczej, a tradycyjny staking eliminuje problem przyrostu o 32 ETH, szczególnie w przypadku mniejszych stawek.

**Julia Schmidt:** W protokole Liquid Collective nie oferujemy stakingu tylko jednemu operatorowi węzła — mamy konsorcjum różnych operatorów węzłów, którym przydzielamy stawki w podejściu round-robin. Zwiększa to decentralizację stakowanego ETH. Ponadto ci operatorzy węzłów przestrzegają standardu NORS (Node Operator Risk Standard), więc gwarantujemy również pokrycie w przypadku cięcia.

Kluczową zaletą, o której jeszcze nie wspomniałam, są częściowe wypłaty — teraz, gdy można wypłacić stakowane ETH z warstwy wykonawczej, otwiera to nowe możliwości dla protokołów takich jak EigenLayer do wyzwalania wypłat i wyjść. Nastąpił ogromny wzrost funkcjonalności i interoperacyjności, które zdecentralizowane finanse (DeFi) mogą teraz lepiej włączyć w pełny cykl życia walidatora, od depozytu do wyjścia. Jako inżynierka blockchain, to ekscytujące móc zautomatyzować cały przepływ pracy.

#### Zakończenie (19:50) {#closing-1950}

**Prowadzący:** Julio, gdzie można dowiedzieć się więcej o Liquid Collective i Alluvial?

**Julia Schmidt:** Możesz śledzić Alluvial i Liquid Collective na Twitterze, na X, na LinkedIn lub na stronie internetowej Alluvial. Będziemy udostępniać artykuł szczegółowo opisujący zmiany dotyczące aktualizacji Pectra i to, jak wpłyną one na krajobraz Ethereum.

**Prowadzący:** Freddy, czy masz jakieś aktualizacje do przekazania w związku z Pectra?

**Freddy Tänzer:** Wiele przed nami. Będziemy mieli dedykowaną stronę w naszej witrynie, blockdaemon.com — będzie to centralne centrum wszystkich zasobów. Opublikujemy wpis na blogu, FAQ oraz pewne wskazówki i rekomendacje dotyczące modelowania w odniesieniu do tego, jaki typ walidatora wybrać i jakiej wielkości. Niezależnie od tego, czy chcesz jednego walidatora z 2000 ETH, czy dwóch z 1000, czy czterech z 500 — wszystko to jest ogólnie możliwe i wiąże się z decyzjami kompromisowymi. Pomożemy naszym klientom przez to przejść.

**Prowadzący:** Fantastycznie. Freddy, Julio, bardzo dziękuję za wasz dzisiejszy czas — fascynująca dyskusja i świetne wprowadzenie do Pectra.