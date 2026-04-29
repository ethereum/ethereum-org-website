---
title: "Odblokowanie skalowania Ethereum: EIP-4844 wyjaśnione"
description: "Finematics wyjaśnia EIP-4844 (proto-danksharding), kluczową zmianę w twardym rozwidleniu Dencun, która wprowadza transakcje blob, aby drastycznie obniżyć koszty dla rollupów warstwy 2 (L2) na Ethereum."
lang: pl
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "jak-dziala-ethereum"
  - "skalowanie"
  - "eip-4844"
  - "dencun"
  - "aktualizacje"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 wyjaśnione"
---

Materiał wyjaśniający autorstwa **Finematics** omawiający EIP-4844 (proto-danksharding), kluczową zmianę w twardym rozwidleniu Dencun, która wprowadza transakcje blob, aby drastycznie obniżyć koszty dla rollupów warstwy 2 (L2) na Ethereum.

*Poniższy tekst to przystępna kopia [oryginalnej transkrypcji wideo](https://www.youtube.com/watch?v=HT9PHWloIiU) opublikowanej przez Finematics. Została ona lekko zredagowana w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Skalowanie Ethereum od dłuższego czasu jest gorąco dyskutowanym tematem. Rozwiązania warstwy 2 (L2) znajdują się na pierwszej linii tej bitwy, oferując sposób na przetwarzanie transakcji poza głównym łańcuchem, aby złagodzić zatory i obniżyć opłaty. Jest jednak pewien haczyk — nawet rozwiązania L2 napotykają ograniczenia, które utrudniają ich wydajność i skalowalność. EIP-4844 to kolejny krok w zwiększaniu potencjału L2 i dostosowywaniu Ethereum do jego mapy drogowej skalowania.

O co więc chodzi w EIP-4844? Jak dokładnie pomaga w skalowaniu L2? Jakie nowe możliwości odblokowuje? I czy to prawda, że może obniżyć opłaty za transakcje na L2 o ponad 90%?

#### Czym jest EIP-4844 i proto-danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Dla przypomnienia, EIP to skrót od Ethereum Improvement Proposal (Propozycja Ulepszenia Ethereum), procesu, dzięki któremu deweloperzy mogą sugerować zmiany w protokole Ethereum. EIP-4844 w szczególności proponuje nowy typ transakcji, który może znacznie ulepszyć sposób obsługi i przetwarzania danych w Ethereum. Być może słyszałeś również nazwę „proto-danksharding”, która jest obecnie używana zamiennie z EIP-4844.

Proto-danksharding to początkowa implementacja pełnego dankshardingu. Kładzie fundamenty pod dalsze skalowanie za pomocą dankshardingu w przyszłości. Osiąga się to poprzez wdrożenie większości logiki i „rusztowania”, które składają się na pełną specyfikację dankshardingu, bez wdrażania faktycznego shardingu danych. Zrobienie tego w ten sposób pozwala na łatwiejsze i mniej inwazyjne przejście, które może odbywać się w ramach wielu aktualizacji sieci bez wprowadzania zbyt dużego ryzyka dla Ethereum w jednej aktualizacji.

Główną ideą EIP-4844 jest wsparcie przyszłości Ethereum skoncentrowanej na rollupach. Rollupy to rozwiązania warstwy 2 (L2), które przetwarzają transakcje poza głównym łańcuchem Ethereum, ale dziedziczą jego bezpieczeństwo. EIP-4844 ma na celu uczynienie rollupów tańszymi i bardziej wydajnymi poprzez wprowadzenie nowego typu transakcji, który może zostać wykorzystany przez rollupy, aby umożliwić im obniżenie kosztów operacyjnych o rząd wielkości. To z kolei sprawi, że aplikacje zbudowane na rollupach będą znacznie tańsze w użyciu i zwiększy to adopcję całego ekosystemu Ethereum.

Wyobraź sobie, że dokonujesz wymiany na DEX na jednym z rollupów. Jeśli obecny koszt takiej operacji wynosi, powiedzmy, 1 dolara, po wdrożeniu EIP-4844 najprawdopodobniej spadnie do około 0,10 dolara. Wpływ w tym przykładzie ma jednak pewne zastrzeżenia, które omówimy w dalszej części filmu.

EIP-4844 wraz z kilkoma innymi EIP zostanie uwzględnione w nadchodzącej aktualizacji Dencun w sieci.

#### Szczegóły techniczne (2:50) {#technical-details-250}

Przyjrzyjmy się teraz bliżej, jak działa EIP-4844.

EIP-4844 wprowadza do Ethereum nowy rodzaj transakcji, który akceptuje „bloby” danych, które mają być przechowywane w węźle Beacon przez krótki czas. Zmiany te są kompatybilne w przód z mapą drogową skalowania Ethereum, a bloby są na tyle małe, że zużycie dysku pozostaje na rozsądnym poziomie. Transakcje blob mają ten sam format, w jakim mają istnieć w ostatecznej specyfikacji dankshardingu.

Wiąże się to z „rynkiem opłat za blob”, zapewniającym, że przestrzeń blobów jest wykorzystywana wydajnie i pozostaje opłacalna ekonomicznie. Osiąga się to poprzez wprowadzenie gazu blob jako nowego rodzaju gazu. Jest on niezależny od normalnego gazu. Na razie tylko bloby są wyceniane w gazie blob.

Bloby to 4096 elementów pola po 32 bajty każdy. Limit blobów na blok jest kontrolowany przez parametr MAX_BLOBS_PER_BLOCK. Limit ten może początkowo być niski i rosnąć w trakcie wielu aktualizacji sieci. Początkowo aktualizacja Dencun celuje w 6 blobów na blok. 4096 × 32 bajty × 6 na blok = 0,75 MB na blok.

Bloby są przechowywane w węzłach Beacon (warstwa konsensusu), a nie w warstwie wykonawczej. Przyszłe prace nad shardingiem wymagają jedynie zmian w węźle Beacon, co umożliwia warstwie wykonawczej równoległą pracę nad innymi inicjatywami.

Bloby są krótkotrwałe i usuwane po około dwóch tygodniach. Są one dostępne wystarczająco długo, aby wszyscy uczestnicy rollupa mogli je pobrać, ale na tyle krótko, aby zużycie dysku było możliwe do opanowania. Pozwala to na wycenę blobów taniej niż dane wywołania, które są danymi przechowywanymi w historii na zawsze.

Kryptograficznym kręgosłupem EIP-4844 są zobowiązania KZG. Nie wchodząc zbytnio w szczegóły, pozwalają one na wydajne i bezpieczne dołączanie danych, co jest kluczowe dla funkcjonalności transakcji blob. W ten sposób tylko zobowiązania do blobów muszą być interpretowane przez EVM w warstwie wykonawczej, a nie same bloby.

Aby wygenerować wspólny sekret dla zobowiązań KZG, przeprowadzono szeroko rozproszoną ceremonię opartą na przeglądarce, dzięki czemu wszyscy uczestnicy sieci Ethereum mieli szansę upewnić się, że został on wygenerowany poprawnie i bezpiecznie.

EIP-4844 dodaje nowy prekompilat zwany ewaluacją punktu, który weryfikuje dowód KZG twierdzący, że blob (reprezentowany przez zobowiązanie) ewaluuje do danej wartości w danym punkcie.

Jak dokładnie to wszystko ma się do rollupów? Dzięki nowej przestrzeni blobów, rollupy będą mogły umieszczać dane swoich bloków w blobach, a nie w droższych danych wywołania, które były do tej pory używane w tym celu. Wykorzystanie krótkotrwałej przestrzeni blobów w warstwie konsensusu jest możliwe, ponieważ rollupy potrzebują, aby dane były dostępne tylko na tyle długo, aby uczciwi uczestnicy mogli skonstruować stan rollupa.

W przypadku optymistycznych rollupów, takich jak Optimism czy Arbitrum, muszą one dostarczać dane bazowe tylko tak długo, jak otwarte jest okno na zgłaszanie oszustw. Dowód oszustwa może weryfikować przejście w mniejszych krokach, ładując co najwyżej kilka wartości bloba na raz poprzez dane wywołania.

Rollupy z wiedzą zerową (ZK rollupy) dostarczałyby dwa zobowiązania do swoich danych transakcji lub delty stanu: zobowiązanie bloba oraz własne zobowiązanie ZK rollupa, wykorzystujące dowolny system dowodzenia, którego rollup używa wewnętrznie. Używałyby również protokołu dowodu równoważności, wykorzystując wcześniej wspomniany prekompilat ewaluacji punktu, aby udowodnić, że oba zobowiązania odnoszą się do tych samych danych.

#### Wpływ (6:25) {#impact-625}

Wpływu EIP-4844 na ekosystem Ethereum nie da się przecenić. Na początek drastycznie poprawia on skalowalność rozwiązań warstwy 2 (L2), obniżając ich koszty operacyjne i czyniąc je bardziej konkurencyjnymi w stosunku do innych, tanich, alternatywnych blockchainów. Zmniejszenie kosztów operacyjnych jest możliwe, ponieważ zdecydowana większość kosztów ponoszonych obecnie przez rollupy wynika z opłat uiszczanych za dane wywołania.

Co więcej, EIP-4844 kładzie podwaliny pod jeszcze dalsze skalowanie poprzez pełny danksharding. Ta przyszła aktualizacja podzieli sieć Ethereum na wiele łańcuchów shardów danych, z których każdy będzie w stanie niezależnie przechowywać dane, co jeszcze bardziej zwiększy przepustowość sieci.

Wraz ze spadkiem kosztów operacyjnych możemy być świadkami fali nowych rozwiązań warstwy 2 (L2), przyciągających deweloperów do budowania innowacyjnych aplikacji na rollupach.

Jeśli chodzi o spadek kosztów transakcji na rollupach, zilustrowany naszym poprzednim przykładem wymiany na DEX, sytuacja jest złożona. Zakładając, że popyt na rollupy pozostanie stały po wdrożeniu EIP-4844, moglibyśmy rzeczywiście spodziewać się znacznego obniżenia kosztów dla użytkowników. Jednak poprawa skalowalności może prowadzić do nieprzewidzianych skutków ekonomicznych. Na przykład niższe opłaty transakcyjne dla użytkowników końcowych mogą skłonić więcej osób do korzystania z rollupów, co w konsekwencji zwiększy popyt na zasoby sieciowe i potencjalnie podniesie koszty transakcji.

Jedno jest pewne — nawet jeśli głównym rezultatem będzie wzrost przepustowości transakcji, a koszt transakcji pozostanie taki sam, EIP-4844 kładzie fundamenty pod jeszcze większą skalowalność w przyszłości, co ostatecznie zaowocuje tańszymi transakcjami dla użytkowników.

#### Podsumowanie (8:04) {#summary-804}

Społeczność Ethereum zakończyła już testowanie EIP-4844 w różnych sieciach testowych, a uruchomienie w Sieci głównej spodziewane jest 13 marca. To monumentalny krok w kierunku osiągnięcia niezrównanej skalowalności dla Ethereum. Już teraz widzimy, że większość głównych L2 zobowiązuje się do rozpoczęcia korzystania z nowej przestrzeni blobów, gdy tylko nastąpi aktualizacja Dencun.

Podsumowując, EIP-4844 to coś więcej niż tylko aktualizacja. To kluczowy moment w podróży Ethereum w kierunku stania się bardziej skalowalnym, wydajnym i przyjaznym dla użytkownika blockchainem. Poprzez obniżenie kosztów i zwiększenie wydajności rozwiązań warstwy 2 (L2), Ethereum ma ugruntować swoją pozycję jako wiodąca platforma dla zdecentralizowanych aplikacji.