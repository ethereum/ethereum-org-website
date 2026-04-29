---
title: "Wyjaśnienie restakingu"
description: "Wyjaśnienie restakingu, który wykorzystuje już stakowany ETH do zapewnienia bezpieczeństwa dodatkowym protokołom i usługom poza warstwą bazową Ethereum."
lang: pl
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "bezpieczeństwo"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Prezentacja **Mike'a Neudera** na wydarzeniu CBER Forum omawiająca, jak działa restaking. Prezentacja definiuje samodzielny staking, delegowany staking, natywny i nienatywny restaking, mechanikę płynnego stakingu i tokenów płynnego restakingu oraz to, jak cięcie oddziałuje na restakowane pozycje.

*Ten transkrypt jest przystępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=rOJo7VwPh7I) opublikowanego przez CBER Forum. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Cześć wszystkim, jestem Mike. Będę mówił o tokenach płynnego restakingu (LRT) i tokenach płynnego stakingu (LST). LRT — czy restaking to nowy staking? Zacznę od drugiego pytania i użyję go jako punktu wyjścia do dyskusji o LST i LRT, definiując, czym one są. Jest to w dużej mierze prezentacja graficzna, więc mam nadzieję, że będziemy mogli zacząć od początku i wspólnie to wszystko poskładać.

Szybki zarys: zaczynając od samego początku, zdefiniujemy dwa tryby stakingu. Pierwszy to samodzielny staking, drugi to delegowany staking. Następnie przejdziemy do koncepcji restakingu i jej zdefiniowania. Chcę zbadać cztery różne modele — wykorzystując podział na samodzielny i delegowany, a następnie skupiając się na natywnym restakingu w porównaniu z nienatywnym restakingiem. Potem przejdziemy do upłynniania, mówiąc o płynnych tokenach — tokenach płynnego stakingu (LST) i tokenach płynnego restakingu (LRT). Uzasadnimy to, przyglądając się cięciu i restakingowi, a następnie obu typom tokenów. Na koniec podsumujemy to danymi na temat stakingu w jego obecnej formie w Ethereum.

#### Samodzielny staking (0:48) {#self-staking-048}

Zaczynając od samego początku, mamy staking, w którym Alice robi to sama. Wchodzi w bezpośrednią interakcję z protokołem, wnosi stawkę do protokołu i jest za to nagradzana poprzez emisję natywnego tokena. W przypadku Ethereum, Alice stakuje 32 ETH i otrzymuje nagrodę w ETH za uczestnictwo w konsensusie.

Należy tu zwrócić uwagę na dwie rzeczy. Po pierwsze, staking służy jako mechanizm Anty-Sybil — nie można oszukać sieci, twierdząc, że ma się wiele tożsamości, ponieważ każda tożsamość kosztuje określoną ilość tej stałej podaży tokenów. Po drugie, zabezpieczenie jest narażone na ryzyko — są to zasady protokołu dotyczące cięcia. Jeśli Alice zachowa się niewłaściwie zgodnie z bardzo dobrze zdefiniowaną specyfikacją, protokół odbierze jej kapitał i ukarze ją za to.

#### Delegowany staking (2:52) {#delegated-staking-252}

Delegowany staking dodaje kolejną warstwę pośrodku, między Alice a protokołem. Alice teraz deleguje do Boba, który stakuje w protokole Ethereum. Nagrody są wysyłane do Boba, a nagrody pomniejszone o opłaty są przekazywane Alice. Jest to najprostsza wersja delegowanego stakingu — Alice nie chce sama uruchamiać oprogramowania, być może nie ma pełnych 32 ETH, albo nie ma sprzętu lub wiedzy technicznej, aby uruchomić walidator.

Istnieje wiele różnych trybów tego delegowania na różnych poziomach zaufania. Wersja wymagająca największego zaufania jest powiernicza — wysyłasz swoje ETH do Coinbase i mówisz „stakuj w moim imieniu”. W rzeczywistości ufasz im całkowicie, ponieważ przechowują aktywa w twoim imieniu. Istnieje wersja niepowiernicza, ale zarządzana przez DAO, w której delegujesz swoją stawkę komuś wyznaczonemu przez DAO, które głosuje nad tym, kto może uruchamiać węzły — to jest staking w stylu Lido. Trzecia to wersja o zminimalizowanym zaufaniu, w której zarówno Alice, jak i Bob wnoszą pewne zabezpieczenie. Alice subsydiuje resztę zabezpieczenia Boba, a jeśli Bob zachowa się niewłaściwie i zostanie poddany cięciu, jego zabezpieczenie jest pierwszą transzą, która zostaje usunięta. Mówię „o zminimalizowanym zaufaniu”, a nie „niewymagający zaufania”, ponieważ bez względu na wszystko, istnieją scenariusze, w których zabezpieczenie Alice zostaje całkowicie wyzerowane w zależności od tego, co zrobi Bob.

#### Samodzielny restaking z natywnym ETH (4:42) {#self-restaking-with-native-eth-442}

Teraz możemy porozmawiać o tym, czym jest restaking. To zupełnie nowa koncepcja — istnieje odkąd Sreeram i EigenLayer wprowadzili ten termin może półtora roku lub dwa lata temu.

W tym modelu Alice robi to samo, co wcześniej — wysyła swoją stawkę do protokołu Ethereum i otrzymuje nagrody za uczestnictwo w konsensusie. Teraz mamy nowy protokół — nazwijmy go „Retheum” — w którym Alice dokonuje restakingu. Ważne jest tutaj to, że używa tych samych tokenów, które stakuje w protokole Ethereum, aby zabezpieczyć ten drugi protokół.

Otrzymuje za to nagrody. Wydaje się to świetne — Alice ma teraz potencjalnie podwójną nagrodę za tę samą kwotę stawki. Ryzyko polega jednak na tym, że kapitał, który stakowała w obu protokołach, jest teraz obciążony zasadami obu protokołów. Jeśli Alice zachowa się niewłaściwie w Ethereum, może stracić swój kapitał w wyniku cięcia. Jeśli zachowa się niewłaściwie w „Retheum”, również może podlegać cięciu. Z dodatkowym zyskiem wiążą się dodatkowe obowiązki — zachowania protokołu, które są obowiązkowe i karane na kolejne sposoby, jeśli obciążysz swój token do stakingu w wielu różnych protokołach.

#### Delegowany natywny restaking (8:28) {#delegated-native-restaking-828}

Druga wersja to delegowany restaking z natywnym ETH. Alice stakuje w Ethereum, a teraz chce użyć Boba, aby delegować swoją stawkę do protokołu „Retheum”. Deleguje do Boba, Bob dokonuje restakingu, protokół wydaje nagrody Bobowi, a Bob przekazuje nagrody pomniejszone o opłaty Alice.

W tym modelu 32 ETH w protokole Ethereum odpowiada za działania zarówno Alice, jak i Boba — dwóch osób, które potencjalnie mogłyby doprowadzić do cięcia tego ETH. Token jest obciążony dwoma różnymi zestawami zasad protokołu.

**Pytanie z widowni:** Kiedy stakujesz ETH w protokole Ethereum, protokół musi dać ci coś, co następnie przedstawiasz — co to jest?

W tej natywnej wersji Alice stakuje i posiada coś, co nazywa się danymi uwierzytelniającymi wypłatę z ekosystemu Ethereum. Te dane uwierzytelniające wypłatę mogą wskazywać na kontrakt w Ethereum, który obsługuje drugą warstwę stakingu. Jest to kontrakt, który kontroluje aktywa podczas ich wypłaty z Ethereum — to jak niewymagające zaufania powiernictwo w inteligentnym kontrakcie, które egzekwuje drugą warstwę kar z tytułu cięcia.

Dlaczego nazywa się to „natywnym”? Ponieważ Alice nadal wchodzi w bezpośrednią interakcję z Ethereum — jej stawka to 32 ETH, które posiada, używane do zabezpieczenia warstwy konsensusu Ethereum.

#### Nienatywny restaking (10:57) {#non-native-restaking-1057}

Samodzielny restaking w środowisku nienatywnym: Alice wchodzi w interakcję tylko z protokołem „Retheum”. Nie uruchamia węzła w Ethereum. Dokonuje restakingu — chociaż ujmuję „re” w cudzysłów, ponieważ tak naprawdę nie jest to restaking, to po prostu staking. Jedynym powodem, dla którego nazywa się to restakingiem, jest to, że odbywa się to za pośrednictwem protokołu, który ułatwia również inne rodzaje restakingu.

Bierze nienatywne tokeny — może to być USDC, stablecoin powiązany z euro, opakowany Bitcoin, cokolwiek — zapewnia je jako bezpieczeństwo ekonomiczne i odporność na ataki Sybil dla protokołu i zdobywa nagrody. To redefiniuje restaking jako rynek zdecentralizowanego zaufania, gdzie zaufanie odnosi się do wartości ekonomicznej zagrożonego kapitału.

Delegowany restaking z nienatywnymi tokenami podąża za tym samym wzorcem — Alice deleguje przez Boba i otrzymuje nagrody pomniejszone o opłaty.

#### Cięcie i restaking (13:55) {#slashing-and-restaking-1355}

Zanim przejdziemy do płynności, porozmawiajmy o cięciu. W normalnym trybie cięcia Alice stakuje w protokole Ethereum. Jeśli zrobi coś, co protokół uzna za niewłaściwe — na przykład ekwiwokację, w której używa swojego klucza kryptograficznego do podpisania dwóch informacji, które są ze sobą w konflikcie — jest to obiektywny błąd. Każdy może zweryfikować, że oba podpisy zostały złożone przez Alice, i jest to wystarczający dowód, aby dokonać cięcia jej tokenów.

Jak restaking i cięcie oddziałują na siebie? W najprostszej wersji — samodzielnym restakingu z natywnym aktywem — Alice stakuje w Ethereum, a także dokonuje restakingu przez „Retheum”. Jeśli Alice nadal wykonuje swoją pracę w protokole „Retheum”, ale dopuszcza się ekwiwokacji w Ethereum, mamy problem: podlega cięciu w Ethereum, ale „Retheum” nie zauważyło niczego przypisywanego jej, co byłoby złe według ich zasad. Musi istnieć jakaś komunikacja między tymi dwoma protokołami.

Ten kierunek komunikacji jest w rzeczywistości dość łatwy, ponieważ „Retheum” to inteligentny kontrakt w Ethereum — może odczytać stan Ethereum i powiedzieć „ten walidator został poddany cięciu według Ethereum”, więc w protokole drugiego rzędu Alice również podlega cięciu.

W drugą stronę jest trudniej. Jeśli Alice zostanie poddana cięciu na platformie do restakingu, Ethereum musiałoby zostać o tym poinformowane. Ale Ethereum jest celowo nieświadome wszystkiego, co dzieje się w jego warstwie kontraktów w kontekście mechanizmu konsensusu.

**Pytanie z widowni:** Dlaczego miałoby to mieć znaczenie? Ethereum potrzebuje stawki do tego, co robi, ale kwota restakingu jest pochodną oryginału.

Problem polega na tym, że jeśli Alice zostanie poddana cięciu na platformie do restakingu, w rzeczywistości nie posiada już tej stawki. Może robić, co chce w protokole Ethereum bez faktycznego ryzyka utraty kapitału — a to jest przecież główny cel posiadania stawki. To tak, jakbyś używał pieniędzy do dwóch rzeczy, zniknęły one w jednej z nich, a ta druga musi zdać sobie sprawę, że te pieniądze nie są już twoje. W pewnym sensie nadal mają one wartość ekonomiczną, ale ich nie kontrolujesz — więc nie obchodzi cię, co się z nimi stanie, ponieważ już przepadły.