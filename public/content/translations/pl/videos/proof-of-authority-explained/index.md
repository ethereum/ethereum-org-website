---
title: "Kryptoekonomia: dowód autorytetu"
description: "Wykład z kryptoekonomii wyjaśniający mechanizm konsensusu dowodu autorytetu (PoA), omawiający jego działanie, kompromisy w porównaniu z dowodem pracy i dowodem stawki oraz jego praktyczne zastosowania."
lang: pl
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consensus"
  - "proof-of-authority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Dowód autorytetu"
---

Wykład z kryptoekonomii autorstwa **Cryptoeconomics Study** wyjaśniający mechanizm konsensusu dowodu autorytetu (PoA), w tym sposób, w jaki centralny autorytet określa kolejność transakcji, problemy podwójnego wydatkowania i cenzury, które wprowadza, oraz podejście łagodzące z wykorzystaniem wielopodpisu.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=Mj10HSEM5_8) opublikowanego przez Cryptoeconomics Study. Został on lekko zredagowany w celu poprawy czytelności.*

#### Jak działa dowód autorytetu (0:00) {#how-proof-of-authority-works-000}

Witamy w sekcji 2.4 — dowód autorytetu — w której przywracamy ten centralny autorytet, aby określić kolejność transakcji i rozwiązać ten irytujący mały problem podwójnego wydatkowania.

Dawno, dawno temu istniał centralny autorytet, którego wszyscy w pewnym sensie lubili. Wszyscy akceptowali ten wspaniały autorytet i powiedzieli: „Dlaczego po prostu ich nie posłuchamy? Mieliśmy te problemy i nie zgadzamy się co do prawidłowego stanu, więc niech ona po prostu powie nam, jaki jest stan”.

Nasz centralny autorytet uruchamia swój duży węzeł, a teraz ludzie podpisują transakcje i zamiast wysyłać je bezpośrednio do siebie, wysyłają je do centralnego autorytetu. Centralny autorytet stosuje każdą transakcję i sam ją podpisuje, mówiąc: „Tak, zatwierdzam — to jest transakcja zero”. Następnie centralny autorytet wysyła ją do wszystkich, a wszyscy otrzymują transakcję i przyjmują ją za pewnik.

#### Problem podwójnego wydatkowania (1:05) {#the-double-spend-problem-105}

Teraz spróbujmy podwójnego wydatkowania. Co się stanie? Mallory wyśle dwie sprzeczne transakcje do centralnego autorytetu. Centralny autorytet otrzymuje pierwszą z nich i podpisuje, że jest to druga transakcja, którą widział, a następnie podpisuje, że jest to trzecia transakcja, którą widział, po czym propaguje te wiadomości.

Co się dzieje? Wszyscy otrzymują te same wiadomości i wszyscy obserwują kolejność ustaloną przez centralny autorytet. Oznacza to, że wszyscy kończą z tymi samymi historiami. Jeśli spojrzymy na stany, idzie nam dobrze — Alice wysyła do Jinga, potem Mallory wysyła do Alice, a następnie Mallory próbuje wysłać do Jinga, ale ta transakcja nie przechodzi, ponieważ Mallory nie ma wystarczająco dużo pieniędzy. Ich salda będą takie same. Wszyscy osiągnęli konsensus. Centralny autorytet — świetnie, udało nam się.

#### Gdy autorytet zostanie skompromitowany (2:09) {#when-the-authority-is-compromised-209}

Problem polega jednak na tym, że musimy ufać centralnemu autorytetowi w kwestii zapewnienia tej kolejności transakcji. Co więc się stanie, jeśli centralny autorytet zostanie wyrzucony i okaże się, że przez cały czas była to Mallory?

Wracamy do tych samych problemów, które mieliśmy wcześniej. Po pierwsze, podwójne wydatkowanie — Mallory po prostu podpisuje obie sprzeczne transakcje, twierdząc, że obie występują w tym samym czasie. Nie wiemy, która z nich jest pierwsza. Mallory selektywnie je propaguje i wprowadza zamieszanie w węzłach, przez co tracą one porozumienie.

Innym problemem jest cenzura. To nowa kwestia w naszym łańcuchu dowodu autorytetu. Co jeśli Mallory nie lubi Alice? Alice próbuje wysłać transakcję, a centralny autorytet po prostu na nią patrzy, zauważa, że to Alice, i ją odrzuca. Alice próbuje wysłać ją ponownie, i znów zostaje odrzucona. Alice nie wie, co się dzieje — jej transakcje nie przechodzą. Cenzura zakończona sukcesem, a my znów mamy problemy.

#### Łagodzenie problemów za pomocą wielopodpisu (3:21) {#mitigating-with-multi-signature-321}

Nie martw się zbytnio — istnieje potencjalne rozwiązanie łagodzące. Możemy politycznie zdecentralizować autorytet. Teoretycznie utrudni to Mallory przejęcie kontroli. Zatem zamiast jednego centralnego autorytetu mamy cztery różne autorytety. Być może wszystkie reprezentują różne interesy różnych stron i wszystkie muszą się zebrać, aby zatwierdzić transakcje.

Nazywa się to multi-sig — czyli wielopodpisem. Otrzymują oni transakcję od Alice do Jinga, a pierwszy z nich składa podpis, mówiąc: „Widziałem tę wiadomość i zatwierdzam”. Następnie podpisuje drugi i trzeci. Możemy powiedzieć, że akceptujemy wielopodpis typu dwa z czterech, trzy z czterech, a może wymagamy wszystkich stron — cztery z czterech. To zależy od ciebie, gdy projektujesz swój wielopodpis.

Oznacza to, że transakcja przechodzi i została zatwierdzona przez autorytety.

#### Ograniczenia dowodu autorytetu (4:32) {#limitations-of-proof-of-authority-432}

Ale co się stanie, jeśli wszystkie te autorytety staną się Mallory? Mamy dokładnie te same problemy — podwójne wydatkowanie i cenzurę. Więc nie jest to idealne. Jednak pod pewnymi względami jest to lepsze niż scentralizowany procesor płatności, ponieważ przynajmniej użytkownicy sami uruchamiają wszystkie transakcje. Mogą ostatecznie wykryć podwójne wydatkowanie, ale nadal mamy nasze problemy. Technicznie rzecz biorąc, nadal możemy dokonać podwójnego wydatkowania i technicznie nadal możemy cenzurować.

Nie ma otwartego dostępu — może być trudno zostać jednym z tych autorytetów. Nie ma również kar w protokole, jeśli dojdzie do podwójnego wydatkowania lub cenzury. W protokole nie ma niczego, co ukarałoby te autorytety.

#### Co dalej (5:19) {#what-comes-next-519}

Więc nasza mądra Alice decyduje, że jest inny sposób — pozbycie się autorytetu. Komu on potrzebny? Zamiast tego pozwalamy każdemu zostać górnikiem i uczestniczyć w protokole konsensusu. Daje to otwarty dostęp do uczestnictwa, zapewnia nagrody ekonomiczne za dobre zachowanie — tworzenie konsensusu w sposób, który działa — i zapewnia kary ekonomiczne za złe zachowanie, gdzie je wykrywamy i spalamy monety ludzi.

Ale o tym opowiemy w następnej kolejności przy okazji dowodu pracy (PoW) — projektowania mechanizmów w rozdziale 3.