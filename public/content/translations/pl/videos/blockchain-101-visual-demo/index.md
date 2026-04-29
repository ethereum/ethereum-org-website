---
title: "Blockchain 101: wizualna demonstracja"
description: "Demonstracja działania technologii blockchain, obejmująca haszowanie, bloki, łańcuchy, rozproszone rejestry i tokeny, aby uczynić koncepcje blockchaina namacalnymi i intuicyjnymi."
lang: pl
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "kryptografia"
format: presentation
author: Anders Brownworth
breadcrumb: "Blockchain 101"
---

Wizualna demonstracja Andersa Brownwortha pokazująca, jak działa technologia blockchain, w tym przewodnik obejmujący haszowanie SHA-256, bloki, kopanie, blockchainy, rozproszone rejestry, tokeny i wiele więcej.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=_160oMzblY8) opublikowanego przez Andersa Brownwortha. Został on lekko zredagowany w celu poprawy czytelności.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

To jest demonstracja blockchaina. Zrobimy to w bardzo wizualny sposób — sprawimy, że będzie to bardzo łatwe do zrozumienia, przechodząc przez kluczowe elementy tego, czym jest blockchain.

Zanim zaczniemy, musimy przyjrzeć się czemuś, co nazywa się hashem SHA-256. Hash wygląda jak zbiór losowych liczb, a w gruncie rzeczy jest to odcisk palca pewnych danych cyfrowych. Tak się składa, że jest to odcisk palca czegokolwiek, co wpiszę w tym polu. Jeśli wpiszę w to pole moje imię „Anders”, zobaczysz, że hash się zmienił. Właściwie zmieniał się za każdym razem, gdy wpisywałem literę.

Więc to jest hash imienia „anders”, pisanego samymi małymi literami — zaczyna się od `19ea`. Jeśli to usunę i wpiszę „anders” ponownie, zobaczysz, że zaczyna się od `19ea` — to dokładnie ten sam hash. W tym sensie jest to cyfrowy odcisk palca tych danych. Niezależnie od tego, jakie dane się tu znajdują, za każdym razem, gdy wpiszesz dokładnie te same dane, otrzymasz dokładnie ten sam hash.

Mogę wpisać, co tylko zechcę. Możesz nie mieć nic — `e3b0` — to jest hash niczego. Albo możesz wpisać mnóstwo rzeczy. Właściwie mógłbyś umieścić tu całą Bibliotekę Kongresu i otrzymałbyś hash. Ciekawe jest to, że niezależnie od tego, czy jest to niewielka ilość informacji, brak informacji, czy cała Biblioteka Kongresu, zawsze otrzymasz hash o tej samej długości. Nie będziesz w stanie z góry odgadnąć, jaki on będzie — musisz niejako wprowadzić dane, aby dowiedzieć się, jaki jest hash, ale zawsze otrzymasz dokładnie ten sam hash, niezależnie od tego, ile razy wprowadzisz dokładnie te same informacje.

#### Blok (2:10) {#block-210}

To, co teraz zrobię, to rozszerzenie tej idei hasha na coś, co nazwiemy blokiem. Blok jest dokładnie taki sam jak hash, ale sekcja danych została podzielona na trzy części: jedną zwaną „blokiem” — to tylko liczba, to jest blok numer 1 — „nonce”, który jest po prostu kolejną liczbą, a następnie trochę danych, tak jak mieliśmy wcześniej.

Hash wszystkich tych informacji znajduje się poniżej i zaczyna się od czterech zer. To stosunkowo nietypowy hash — większość z nich nie będzie zaczynać się od czterech zer w ten sposób. Ale ten tak ma, i ponieważ tak jest, całkowicie arbitralnie powiem, że ten blok jest „podpisany”.

Co by się stało, gdybym zmienił jakikolwiek fragment tych informacji? Powiedzmy, że coś tu wpiszę — hash się zmieni, a jaka jest szansa, że będzie zaczynał się od czterech zer? Dość niska. Wpiszę po prostu „cześć” — spójrz na to, ten hash nie zaczyna się od czterech zer, a tło zmieniło kolor na czerwony. Więc teraz wiesz, że ten blok z tymi informacjami nie jest prawidłowym ani podpisanym blokiem.

W tym miejscu do gry wkracza nonce. Nonce to po prostu liczba, którą możesz ustawić, aby spróbować znaleźć wartość sprawiającą, że hash znów będzie zaczynał się od czterech zer. Mógłbym tu siedzieć cały dzień i wpisywać liczby, ale mam ten mały przycisk „Kop” (Mine). Kiedy go nacisnę, program przejdzie przez wszystkie liczby od 1 w górę, aby spróbować znaleźć taką, dla której hash zaczyna się od czterech zer. Ten proces nazywa się kopaniem.

Zatrzymał się na 59 396 — i tak się składa, że ta liczba daje hash zaczynający się od czterech zer. Spełnia to moją definicję tego, czym jest podpisany blok.

#### Blockchain (5:16) {#blockchain-516}

Więc czy możesz mi powiedzieć, czym jest blockchain? To prawdopodobnie po prostu łańcuch tych bloków. Oto mój blockchain — blok numer jeden ma nonce tak jak wcześniej, obszar danych, ale ma też to pole „poprzedni” (previous), które jest ciągiem zer. Idąc dalej, to jest blok drugi, blok trzeci, blok czwarty — ten blockchain składa się z pięciu bloków.

Pole „poprzedni” dla każdego bloku to hash bloku, który go poprzedza. Możesz zobaczyć, że każdy blok wskazuje wstecz na ten przed nim. Ten pierwszy blok nie ma poprzednika, więc jest to po prostu ciąg zer.

Co się stanie, jeśli zmienię tu jakieś informacje? Zmieni to hash tego bloku i go unieważni. Ale co, jeśli zmienię coś we wcześniejszym bloku? Zmieni to jego hash, ale ten hash jest kopiowany do pola „poprzedni” następnego bloku, więc psuje to oba bloki. Możemy cofnąć się tak daleko, jak chcemy, do jakiegoś punktu w przeszłości i zepsuć ten blok, a to zepsuje wszystkie bloki od tamtego momentu. Wszystko przed nim jest nadal zielone, ale wszystko po nim staje się czerwone.

Jeśli pójdę i zmienię ostatni blok, wszystko, co muszę zrobić, to ponownie wykopać ten jeden blok. Jeśli cofnę się daleko w czasie i dokonam zmiany, muszę wykopać ten, ten, ten i ten. Im więcej bloków mija, tym trudniej jest dokonać zmiany. W ten sposób blockchain opiera się mutacjom — opiera się zmianom.

#### Rozproszony blockchain (9:18) {#distributed-blockchain-918}

Skąd więc miałbym wiedzieć, czy mój blockchain został ponownie wykopany? Teraz mamy rozproszony blockchain. Wygląda dokładnie tak samo jak poprzedni blockchain, ale to jest węzeł równorzędny A (Peer A). Jeśli zjedziesz w dół, zobaczysz węzeł równorzędny B, który ma dokładną kopię blockchaina. Jest też węzeł równorzędny C — i tak w nieskończoność. W internecie jest wiele węzłów równorzędnych i wszystkie mają kompletną kopię blockchaina.

Jeśli spojrzę na ten hash, to jest to `e4b`. Jeśli przejdę do następnego, on również ma `e4b`. Muszą być identyczne. Teraz, jeśli przejdę tutaj i coś wpiszę, ponownie wykopią ten blok, a następnie wykopią kolejne bloki — wszystkie łańcuchy są zielone. Jednak ten łańcuch mówi, że ostatni hash to `e4b`, ten na dole również mówi `e4b`, a ten środkowy mówi `4cae`.

Więc wiem, tylko rzucając okiem na ten jeden mały hash, że coś jest nie tak w tym blockchainie. Mimo że wszystkie hashe zaczynają się od czterech zer, ten jest inny. To w zasadzie dwóch na jednego — mamy tu małą demokrację. Więc `e4b` wygrywa. W ten sposób posiadanie całkowicie rozproszonej kopii na wielu różnych komputerach pozwala szybko sprawdzić, czy wszystkie bloki są identyczne.

Blockchainy mogą bardzo łatwo mieć 400 000 lub 500 000 bloków. Zamiast sprawdzać je wszystkie, wystarczy spojrzeć na hash tego najnowszego, aby zobaczyć, czy cokolwiek w przeszłości zostało zmienione.

#### Tokeny (12:17) {#tokens-1217}

To już wszystko — nie ma w tym nic więcej. Ale to w pewnym sensie niezbyt użyteczne, ponieważ nie mamy w obszarze danych niczego, co by cokolwiek znaczyło. To, czego naprawdę chcemy, to token.

Teraz mam te tokeny — całkowicie arbitralnie nazywam je dolarami. Mamy dwadzieścia pięć dolarów od Darcy'ego dla Bingleya, cztery dolary i dwadzieścia siedem centów od Elizabeth dla Jane — wiesz, o co chodzi. Mają miejsce te wszystkie transakcje, a ja po prostu zastąpiłem dane tymi transakcjami. Podobnie jak wcześniej, jeśli zjedziemy w dół, zauważymy, że mamy te wszystkie inne kopie tego samego blockchaina.

W tym miejscu ważna jest niezmienność. Jeśli zmienię coś tutaj, hash będzie inny niż ten na pozostałych kopiach. To bardzo ważne, abyśmy zauważyli, jeśli cofniesz się w czasie i zmienisz jakąś wartość. W przypadku pieniędzy bardzo ważne jest, aby nie stracić rachuby, i to jest cały sens używania blockchaina — opieranie się wszelkim modyfikacjom rzeczy, które wydarzyły się w przeszłości.

Jedna rzecz, o której chciałbym wspomnieć: nie zapisujemy „Darcy ma sto dolarów i daje 25 Bingleyowi”. Pamiętamy tylko ruchy pieniężne, a nie salda kont bankowych. To nasuwa pytanie — czy Darcy ma 25 dolarów?

#### Transakcja Coinbase (14:34) {#coinbase-transaction-1434}

Mamy problem w tej wersji blockchaina: tak naprawdę nie wiemy, czy Darcy ma 25 dolarów. Spójrzmy więc na transakcję Coinbase. Dodajemy transakcję Coinbase do naszych bloków — mówi ona, że wymyślimy sto dolarów z powietrza i damy je Andersowi. W tym bloku nie ma żadnych innych transakcji, ponieważ nikt wcześniej nie miał żadnych pieniędzy.

W następnym bloku kolejne sto dolarów pojawia się znikąd i trafia do Andersa. Teraz mamy kilka transakcji — wszystkie są od Andersa, ponieważ w tym momencie tylko ja mam jakieś pieniądze. Wysyłam dziesięć moich dolarów do Sophie. Czy mam dziesięć dolarów? Tak — patrzę wstecz i widzę, że transakcja Coinbase dała mi sto, więc mam co najmniej dziesięć.

Sumujesz to wszystko i nie przekracza to stu. Wynika to z podstawowej zasady waluty: nie można tworzyć pieniędzy z powietrza, a ich rozpraszanie jest kontrolowane.

Jeśli przeniesiemy się w czasie do przodu, zobaczymy, że Jackson daje Alexie dwa dolary. Czy Jackson faktycznie ma dwa dolary? Cofamy się o jeden blok i widzimy, że Emily dostała dziesięć dolarów od Andersa i dała dziesięć Jacksonowi. Więc Jackson ma te pieniądze. Możemy cofnąć się i to sprawdzić — to jedna z korzyści posiadania pola „poprzedni”.

#### Zakończenie (16:30) {#closing-1630}

To jest podstawowy blockchain z działającą na nim walutą. Jak wiesz, blockchainy mają wiele kopii — każdy ma kopię. Jeśli coś zmutujemy i zmienimy na sześć dolarów, bloki stają się nieważne i nie zgadzają się z innymi kopiami. To zapobiega manipulacjom, a tego właśnie oczekujesz od waluty. Działa to bardzo dobrze w przypadku rzeczy, które są małe i transakcyjne.

Blockchainy to bardzo wydajny sposób na osiągnięcie porozumienia co do tego, co wydarzyło się w przeszłości — tej niezmiennej historii, która zapisuje się z upływem czasu. Pomijamy tu niektóre główne punkty, ale jeśli zagłębisz się w demonstrację, przeklikasz te rzeczy i trochę się tym pobawisz, zyskasz coraz lepsze wyobrażenie o tym, jak to działa.