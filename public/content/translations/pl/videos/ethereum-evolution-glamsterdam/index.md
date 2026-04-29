---
title: "Ewolucja Ethereum: Fusaka, Glamsterdam i dalej"
description: "Preston Van Loon o nadchodzących aktualizacjach protokołu Ethereum, obejmujących kamienie milowe mapy drogowej Fusaka i Glamsterdam oraz długoterminową ewolucję protokołu."
lang: pl
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-and-priorities"
  - "roadmap"
  - "upgrades"
format: presentation
author: ETHDenver
breadcrumb: "Ewolucja Ethereum"
---

Prezentacja **Prestona Van Loona** z Offchain Labs i Prysm, wygłoszona na ETHDenver. Preston omawia niedawne tempo aktualizacji Ethereum i to, co czeka sieć, w tym Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, krótsze czasy slotów i szybszą ostateczność.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=GgKveVMLnoo) opublikowanego przez ETHDenver. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:07) {#introduction-007}

**Gospodarz:** W porządku, wszyscy. Przechodzimy dalej. Porozmawiamy o ewolucji Ethereum z Prestonem Van Loonem. Oddaję ci głos.

**Preston Van Loon:** W porządku. Dziękuję. GM — wiecie, że GM mówi się o każdej porze, w dzień i w nocy, niezależnie od tego, czy jest rano. Więc widzę GM przez cały dzień i noc. Chcę porozmawiać o ewolucji Ethereum, więc zaczynajmy.

Istnieje narracja, którą prawdopodobnie już słyszeliście: Ethereum zbyt wolno wdraża nowości. Wiem, że to słyszeliście. Ja to słyszałem. Słyszeliście to wiele razy. Ludzie mówili: „Kiedy merge? Czy deweloperzy nie mogą czegoś zrobić? Inne łańcuchy rozwijają się szybko. Dlaczego Ethereum działa tak wolno?”. Jestem tu, aby wam powiedzieć, że ta narracja jest martwa.

Pracuję nad klientem konsensusu Prysm. Jest to jeden z kluczowych komponentów Beacon Chain Ethereum. Byłem na pierwszej linii frontu podczas najnowszych aktualizacji — Pectra, Fusaka. Z tego, co widziałem od wewnątrz, nie była to powolna biurokracja, o którą ludzie oskarżali Ethereum przez wiele lat. W rzeczywistości była to szybka, dobrze działająca maszyna dostarczająca jedne z największych aktualizacji, jakie kiedykolwiek widzieliśmy w historii Ethereum.

#### Wdrożenie trzech aktualizacji w ciągu jednego roku (1:18) {#shipping-three-upgrades-in-one-year-118}

To, co wdrożyliśmy w 2025 roku, to trzy duże aktualizacje w ciągu jednego roku. Po pierwsze, Pectra w maju 2025 roku. Wprowadziła ona natywną abstrakcję konta, zwiększenie maksymalnego salda efektywnego walidatora pozwalające na konsolidacje oraz dziesięć kolejnych EIP. W maju była to największa aktualizacja pod względem liczby EIP, jaką Ethereum kiedykolwiek widziało.

Ale zaledwie siedem miesięcy później wdrożyliśmy Fusaka — jeszcze większą aktualizację pod względem EIP. Ta miała ich trzynaście, z innowacją o nazwie PeerDAS, co jest naprawdę ekscytujące. Zaledwie sześć dni później ponownie zaktualizowaliśmy sieć poprzez rozwidlenie BPO1, a wkrótce potem nastąpiło BPO2, zwiększając pojemność blobów w Ethereum.

To świadczy o tym, że Ethereum dowozi. Jest to współpraca między pięcioma lub sześcioma klientami konsensusu, pięcioma klientami wykonawczymi, wieloma badaczami — ponad stu osobami zaangażowanymi w główny rozwój Ethereum — i wszyscy oni wdrażają zmiany w skoordynowany sposób w tym samym czasie.

#### Skalowanie PeerDAS (2:22) {#peerdas-scaling-222}

Przyjrzyjmy się głównej atrakcji Fusaka: PeerDAS. PeerDAS to bardzo niesamowite rozwiązanie skalujące. Przed PeerDAS mieliśmy Pectra, a w Pectra musiałeś — jako operator węzła lub walidator — pobrać każdy blob, który pojawiał się wraz z blokiem. Docelowo było to sześć blobów na blok. Wszyscy musieli to pobierać, a to naprawdę stanowi wąskie gardło skalowania. Jeśli chcesz to zwiększyć, prosisz operatorów węzłów o proporcjonalne zwiększenie zużycia przepustowości dla blobów.

Teraz, dzięki Fusaka, mamy bloby, które są kodowane korekcyjnie (erasure-coded), i prosimy walidatorów o przechowywanie tylko ich części. Musisz przechowywać tylko jedną ósmą blobów. A mając dowolne 50% blobów, możesz zrekonstruować całość. Dzięki rozproszeniu tego w sieci, mamy pewność, że dostępność danych jest zapewniona i że obciążenie dla samodzielnych stakerów jest mniejsze. Daje nam to natychmiastową, prawie 90-procentową redukcję zużycia przepustowości sieci przez bloby.

Patrząc na liczby: dla Pectra mieliśmy cel sześciu i maksimum dziewięciu blobów z limitem gazu wynoszącym 36 milionów. Uznajemy to za punkt odniesienia dla użycia blobów — to było 768 kilobajtów na blok. Następnie, między Pectra a Fusaka, mieliśmy aktualizację poza standardowym cyklem, w której limit gazu został zwiększony. Był to proces zarządzania onchain, w którym walidatorzy po prostu głosowali nad tym, jaki ich zdaniem powinien być limit bloku — wzrósł on z 36 do 45 milionów. A później w tym samym roku dotarliśmy do Fusaka, która nie zmieniła celu ani maksimum blobów, ale ponownie zwiększyła limit gazu.

A potem uzyskaliśmy ten duży spadek zużycia przepustowości, gdzie każdy blok z celem sześciu blobów to teraz tylko 96 kilobajtów danych blobów, które walidator musiał przechowywać. Następnie ponownie, wraz z BPO1, rozwidleniem dotyczącym tylko parametrów blobów, zwiększyliśmy cel do 10, a maksimum do 15. BPO2, które miało miejsce zaledwie miesiąc później, podniosło te wartości do 14 i 21 — co jest dwukrotnością tego, co mieliśmy w Pectra, ale nadal oznacza o 71% mniejsze zużycie przepustowości na bloby dla samodzielnych stakerów.

#### Co nadchodzi w Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

Co dalej w Glamsterdam? Są trzy naprawdę kluczowe rzeczy i jedna, która wciąż jest przedmiotem aktywnych badań.

Pierwszą z nich jest ePBS — wbudowana w protokół separacja proponującego i budującego (PBS). Sposób, w jaki produkcja bloków odbywa się dzisiaj, polega na tym, że wiele osób zleca możliwość zbudowania bloku poprzez MEV-Boost bardzo zaawansowanym budowniczym. Dotyczy to większości sieci. Problem polega na tym, że trzeba ufać przekaźnikowi (relay) i pokładać dużą wiarę w to, że budowniczy faktycznie przedstawi blok, za który złożył ofertę. ePBS wprowadza mechanizm wewnątrz protokołu, dzięki czemu wymagane jest znacznie mniejsze zaufanie, a jest to bardzo czysta implementacja tego samego pomysłu.

Kolejną rzeczą są listy dostępu na poziomie bloku. To fajna innowacja, w której każdy blok będzie zawierał listę określającą, w którym miejscu stanu odczytywał lub zapisywał dane. Oznacza to, że można przetwarzać bloki równolegle. Obecnie trzeba przetwarzać bloki sekwencyjnie. Jeśli chcesz przetworzyć blok 10, musisz najpierw przetworzyć 9, 8 i tak dalej. Teraz, jeśli masz zbiór bloków i żaden z nich nie koliduje z informacjami o dostępie do stanu, możesz przetwarzać wszystkie osiem równolegle. Być może masz osiem rdzeni — to sprawia, że Ethereum jest bardziej wydajne i szybciej przetwarza bloki.

Trzecią rzeczą jest zmiana wyceny gazu. Przeprowadzono testy wydajności w ramach tego EIP, które pokazały, że niektóre kody operacji były zawyżone, a inne zaniżone. Teraz zaktualizujemy opłaty, które płacisz za każdy kod operacji, aby odzwierciedlały rzeczywistość, czyniąc Ethereum bezpieczniejszym i bardziej wydajnym.

#### Ewoluująca rola L2 (6:14) {#the-evolving-role-of-l2s-614}

Jest jedna rzecz, o której chcę porozmawiać, a o której Vitalik wspomniał niedawno. Kilka tygodni temu napisał w tweecie, że pierwotna wizja warstw 2 (L2) i ich roli w Ethereum nie ma już sensu. Zyskało to wiele nagłówków i myślę, że wiele osób wyciągnęło z tego błędne wnioski.

Pozwólcie, że powiem wam, co to oznacza z perspektywy kogoś z wewnątrz. Ethereum skaluje się szybciej, niż oczekiwano. Opłaty są niższe niż kiedykolwiek. Nigdy nie myślałem, że będę płacił opłaty za gaz mniejsze niż jeden gwei w Sieci głównej, ale oto jesteśmy. Bloby są obfite — mamy ich mnóstwo. Skalujemy bloby szybciej, niż się spodziewaliśmy. Nawet opłaty w L2 są naprawdę niskie.

Zatem pomysł, że potrzebujemy L2 ogólnego przeznaczenia — to znaczy L2, które są po prostu tym samym EVM, co w warstwie 1 (L1), tylko skopiowanym i wklejonym wiele razy, a jedyne co robią, to działają szybciej — to już nie jest nasza wizja. Te L2 będą się rozwijać dzięki specjalizacji. Niektóre z nich skupią się na takich rzeczach jak prywatność, gry, specyficzne rozwiązania w zdecentralizowane finanse (DeFi) lub rozszerzenia EVM. Ale jeśli są po prostu sklonowaną kopią L1, nie są częścią mapy drogowej, w której początkowo wyobrażaliśmy sobie ten rodzaj pofragmentowanego paradygmatu poprzez L2.

#### FOCIL: odporność na cenzurę na poziomie protokołu (7:25) {#focil-protocol-level-censorship-resistance-725}

Poza Glamsterdam, istnieją trzy naprawdę fajne rzeczy w fazie aktywnego rozwoju i badań. Pierwszą z nich jest FOCIL — listy włączeń wymuszane przez wybór rozwidlenia (Fork-Choice Enforced Inclusion Lists).

Problem, który ma to rozwiązać, polega na tym, że budowniczowie bloków mają wybór. To oni decydują, które transakcje zostaną włączone do bloku. Mogą preferować jedne, a innych nie — może to wynikać z przewagi MEV, a może z presji regulacyjnej. W każdym razie są w stanie cenzurować transakcje według własnego uznania i nikt nie może nic z tym zrobić.

FOCIL zmienia dynamikę władzy. Zamiast mówić, że budowniczowie bloków mogą wybierać wszystkie transakcje w bloku, istnieje losowy komitet, który wybiera — na podstawie swoich lokalnych heurystyk — niektóre transakcje, które ich zdaniem muszą zostać włączone do następnego bloku. Nie są to wszystkie transakcje w następnym bloku. Budowniczowie nadal mają dużą swobodę, ale istnieje podzbiór, który muszą uwzględnić. Proponujący blok weźmie tę krótką listę — może około ośmiu transakcji — i umieści ją na końcu bloku, a zostaną one wykonane wraz z blokiem.

Jest to wymuszane poprzez wybór rozwidlenia. Walidatorzy, którzy zobaczą blok, nie wydadzą poświadczenia dla niego, chyba że ma on dołączoną na dole listę włączeń. Jeśli zobaczą taki bez listy, uznają ten blok za nieważny i po prostu go zignorują — nie będą go propagować, nie oddadzą na niego głosu. To wciąż aktywne badania, a niektóre parametry są nadal ustalane, ale kierunek jest jasny: Ethereum zamierza uwzględnić odporność na cenzurę na poziomie protokołu.

#### Krótsze czasy slotów (9:24) {#shorter-slot-times-924}

Kolejną naprawdę ekscytującą rzeczą są krótsze czasy slotów. Wraz z Hegata — rozwidleniem po Glamsterdam — rozważamy, czy możemy uwzględnić krótsze czasy slotów lub szybkie sloty. Nie oznacza to, że od razu przeskoczymy do sześciosekundowych slotów lub jeszcze szybszych, ale budujemy fundamenty, aby to umożliwić.

Brzmi to naprawdę prosto — w stylu „po prostu działajmy szybciej”. Ale trzeba pomyśleć o propagacji w sieci, obowiązkach walidatorów związanych z poświadczeniami, na których wykonanie mają ograniczoną ilość czasu, a do tego dochodzi ekonomia. Kiedy po raz pierwszy z tym eksperymentowałem, po prostu zmieniłem 12 na 6 i nagle wszyscy generowali dwa razy większą emisję — dwa razy więcej pieniędzy — co nie jest tak naprawdę intencją stojącą za krótszymi czasami slotów. Chodzi o to, by działać szybciej, ale przy zachowaniu pozostałych warunków bez zmian. Jest to więc bardzo złożona sprawa, ale istnieje możliwość, by docelowo osiągnąć to krok po kroku.

#### Szybsza ostateczność (10:20) {#faster-finality-1020}

Trzecią rzeczą jest szybsza ostateczność. Jest to naprawdę ważne, ponieważ Ethereum finalizuje się co dwie epoki — co 13 minut — a istnieją aplikacje, które naprawdę zależą od zadania pytania: czy moja transakcja jest trwała? Jeśli transakcja nie znalazła się w sfinalizowanej epoce, odpowiedź brzmi nie — istnieje niewielka szansa, że może zostać usunięta w wyniku reorganizacji łańcucha, a transakcję trzeba będzie przesłać ponownie.

Teraz, jeśli mamy szybką ostateczność, rzeczy takie jak giełdy, mosty lub dowolna aplikacja mogą mieć pewność, że transakcja jest ostateczna. Po pierwsze, zamiast dwóch epok dla ostateczności, zróbmy to w jednej. Następnie możemy powiedzieć, że zamiast epok o długości 32 slotów, skróćmy je do czterech slotów. Teraz, jeśli połączysz to z sześciosekundowymi czasami slotów, mówimy o ostateczności w mniej niż 30 sekund. To naprawdę fajny cel końcowy.

#### Gwiazda polarna (11:15) {#the-north-star-1115}

Wszystko to wpisuje się w naszą gwiazdę polarną, gdzie mówimy, że L1 jest szybkie z finalizacją w kilka sekund. Jak do tego dojdziemy? Najpierw zaczynamy od PeerDAS — to już zostało wdrożone. Dało nam to skalowalną warstwę dla dostępności danych. Następnie mamy Glamsterdam, obejmujący głównie ePBS, co jest czystą implementacją separacji proponującego i budującego (PBS) i sprawia, że rzeczy takie jak FOCIL mają większy wpływ. FOCIL wkracza z odpornością na cenzurę, co jest bardzo harmonijne z ePBS. Dzięki szybszym slotom, krótsze czasy slotów sprawiają, że szybsza ostateczność ma jeszcze większe znaczenie. Następnie docieramy do tego ostatecznego celu, w którym naprawdę mamy szybkie transakcje, które są sfinalizowane w kilka sekund.

#### Zakończenie (12:02) {#closing-1202}

Chcę, żebyście wyobrazili sobie, jak będzie wyglądać życie za dwa lata. Trudno o tym myśleć, ponieważ krypto rozwija się tak szybko. To może być rzeczywistość już za dwa lata: cztero- lub sześciosekundowe czasy potwierdzania transakcji; ostateczność mierzona w sekundach, a nie minutach; egzekwowanie odporności na cenzurę na poziomie protokołu; zabezpieczenia przed kryptografią postkwantową; oraz L2 konkurujące pod względem funkcji i nowych innowacji, a nie tylko szybkości. Wszystko to przy jednoczesnym zachowaniu zalety, jaką jest możliwość użycia konsumenckiego laptopa lub sprzętu do uruchomienia pełnego węzła w domu. Ethereum jest dostępne i pozostanie dostępne dla każdego w przyszłości.

Wniosek, który chcę, abyście wyciągnęli, jest następujący: narracja, którą przedstawiłem wam na początku — naprawdę nie ma dowodów na jej poparcie. Ethereum szybko wdraża nowości. W ciągu zaledwie jednego roku pojawiły się trzy aktualizacje. A w ciągu najbliższych 24 miesięcy nadejdzie jeszcze więcej rzeczy i będą one pojawiać się jeszcze szybciej.

To nie są tylko fantastyczne pięcioletnie harmonogramy. To rzeczywiste rzeczy z konkretnymi propozycjami, które są opracowywane w tej chwili. Są rzeczy, które już teraz znajdują się w sieci deweloperskiej. Są ludzie, którzy w tej chwili pracują nad tymi implementacjami. Jeśli budujesz dziś na Ethereum, budujesz na najaktywniej rozwijanym blockchainie na świecie.

Nazywam się Preston Van Loon, jestem głównym deweloperem Ethereum. Pracuję w zespole Prysm w Offchain Labs. Jeśli chcesz się zaangażować, najlepszym sposobem, aby być na bieżąco z tym, co dzieje się w Ethereum, jest pomoc w jego budowaniu. Podejdź i porozmawiaj ze mną później. Zajrzyj do repozytorium Prysm lub dowolnego repozytorium specyfikacji konsensusu czy specyfikacji wykonawczej — naprawdę chętnie przyjmiemy twój wkład. Dziękuję.