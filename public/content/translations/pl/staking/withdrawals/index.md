---
title: Wypłaty ze stakingu
description: Strona podsumowująca, czym są wypłaty ze stakingu i jak działają, a także co muszą zrobić stakerzy, aby otrzymać nagrody
lang: pl
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Nosorożec Leslie z nagrodami ze stakingu
sidebarDepth: 2
summaryPoints:
  - Aktualizacja Shanghai/Capella pozwoliła na wypłaty ze stakingu na Ethereum
  - Operatorzy walidatorów muszą podać adres wypłaty, aby umożliwić
  - Nagrody są przyznawane automatycznie co kilka dni
  - Walidatory, które w pełni opuszczą staking, otrzymają swoje pozostałe saldo
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Wypłaty ze stakingu zostały włączone wraz z aktualizacją Shanghai/Capella, która miała miejsce 12 kwietnia 2023 r.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Więcej informacji o Shanghai/Capella</a>
</UpgradeStatus>

**Wypłaty ze stakingu** odnoszą się do transferów ETH z konta walidatora w warstwie konsensusu Ethereum (łańcuch śledzący) do warstwy wykonawczej, w której można dokonywać transakcji.

**Wypłaty nagród za nadwyżkę salda** powyżej 32 ETH będą automatycznie i regularnie wysyłane na adres wypłaty powiązany z każdym walidatorem, po podaniu go przez użytkownika. Użytkownicy mogą również **całkowicie opuścić stakowanie**, odblokowując prz tym ich pełne saldo walidatora.

## Nagrody ze stakingu {#staking-rewards}

Wypłaty nagród są automatycznie przetwarzane dla aktywnych kont walidatorów z maksymalnym efektywnym saldem 32 ETH.

Każde saldo powyżej 32 ETH zarobione dzięki nagrodom w rzeczywistości nie przyczynia się do kapitału ani nie zwiększa wagi tego walidatora w sieci, a zatem jest automatycznie wypłacane jako nagroda co kilka dni. Poza jednorazowym podaniem adresu wypłaty, nagrody te nie wymagają żadnych działań ze strony operatora walidatora. Wszystko to jest inicjowane w warstwie konsensusu, więc na żadnym etapie nie jest wymagany gaz (opłata transakcyjna).

### Jak się tutaj znaleźliśmy? {#how-did-we-get-here}

W ciągu ostatnich kilku lat Ethereum przeszło kilka modernizacji sieci, przechodząc na sieć zabezpieczoną przez samo ETH, zamiast energochłonnego wydobycia, jak to było kiedyś. Uczestnictwo w konsensusie Ethereum jest obecnie znane jako „staking”, ponieważ uczestnicy dobrowolnie zablokowali ETH, stawiając je „na szali” w zamian za możliwość uczestnictwa w sieci. Użytkownicy, którzy przestrzegają zasad, zostaną nagrodzeni, podczas gdy próby oszukiwania mogą zostać ukarane.

Od czasu uruchomienia kontraktu depozytowego stakingowego w listopadzie 2020 r. niektórzy odważni pionierzy Ethereum dobrowolnie zablokowali środki, aby aktywować „walidatory”, specjalne konta, które mają prawo do formalnego poświadczania i proponowania bloków, zgodnie z zasadami sieci.

Przed aktualizacją Shanghai/Capella nie można było używać ani uzyskiwać dostępu do zestakowanego ETH. Jednakże teraz możesz zdecydować się na automatyczne otrzymywanie nagród na wybrane konto, a także możesz wypłacić zestakowane ETH, kiedy tylko chcesz.

### Jak się przygotować? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Ważne informacje {#important-notices}

Podanie adresu wypłaty jest wymaganym krokiem dla każdego konta walidatora, zanim będzie ono uprawnione do wypłaty ETH ze swojego salda.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Każde konto walidatora może mieć przypisany tylko jeden adres wypłaty, jeden raz.</strong> Po wybraniu adresu i przesłaniu go do warstwy konsensusu nie można tego cofnąć ani zmienić ponownie. Przed wysłaniem sprawdź dwukrotnie własność i poprawność podanego adresu.
</InfoBanner>

Nie ma <strong>żadnego zagrożenia dla twoich funduszy w międzyczasie</strong> za niedostarczenie tego, zakładając, że twoja fraza mnemoniczna/odzyskiwania pozostała bezpieczna offline i nie została w żaden sposób naruszona. Brak dodania danych uwierzytelniających do wypłaty spowoduje po prostu zablokowanie ETH na koncie walidatora do czasu podania adresu do wypłaty.

## Całkowite wyjście ze stakingu {#exiting-staking-entirely}

Podanie adresu wypłaty jest wymagane, zanim _jakiekolwiek_ środki będą mogły zostać przelane z salda konta walidatora.

Użytkownicy, którzy chcą całkowicie zrezygnować ze stakingu i wypłacić pełne saldo, muszą również podpisać i wysłać wiadomość o „dobrowolnym wyjściu” za pomocą kluczy walidatora, co rozpocznie proces wychodzenia ze stakingu. Odbywa się to za pomocą klienta walidatora i jest przesyłane do węzła konsensusu i nie wymaga gazu.

Proces wychodzenia walidatora ze stakingu zajmuje różną ilość czasu, w zależności od tego, ile innych osób wychodzi w tym samym czasie. Po zakończeniu, konto to nie będzie już odpowiedzialne za wykonywanie obowiązków walidatorów sieci, nie będzie już kwalifikować się do nagród i nie będzie już mieć swojego ETH „na szali”. W tym momencie konto zostanie oznaczone jako w pełni „wypłacalne”.

Po oznaczeniu konta jako „wypłacalne” i podaniu danych uwierzytelniających do wypłaty użytkownik nie musi nic więcej robić poza czekaniem. Konta są automatycznie i stale przenoszone przez wnioskodawców bloków pod kątem kwalifikujących się wycofanych środków, a saldo konta zostanie przelane w całości (znane również jako „pełna wypłata”) podczas następnej sesji <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>przeniesienia</a>.

## Kiedy wypłaty ze stakingu są możliwe? {#when}

Wypłaty ze stakingu są już dostępne! Funkcja wypłat została włączona w ramach aktualizacji Shanghai/Capella, która miała miejsce 12 kwietnia 2023 r.

Aktualizacja Shanghai/Capella umożliwiła odzyskanie wcześniej zestakowanych ETH na zwykłych kontach Ethereum. Zamknęło to pętlę płynności stakingu i przybliżyło Ethereum o krok na drodze do zbudowania zrównoważonego, skalowalnego i bezpiecznego zdecentralizowanego ekosystemu.

- [Więcej o historii Ethereum](/history/)
- [Więcej o planie działania Ethereum](/roadmap/)

## Jak działają wypłaty środków? {#how-do-withdrawals-work}

To, czy dany walidator kwalifikuje się do wypłaty, czy nie, zależy od stanu samego konta walidatora. Żadne dane wejściowe użytkownika nie są potrzebne w żadnym momencie, aby określić, czy konto powinno mieć zainicjowaną wypłatę, czy nie — cały proces jest wykonywany automatycznie przez warstwę konsensusu w ciągłej pętli.

### Jesteś raczej wzrokowcem? {#visual-learner}

Sprawdź to wyjaśnienie dotyczące wypłat ze stakingu Ethereum przez Finematics:

<YouTube id="RwwU3P9n3uo" />

### Walidator „przesunięcia” {#validator-sweeping}

Gdy walidator ma zaproponować następny blok, musi utworzyć kolejkę wypłat, składającą się z maksymalnie 16 kwalifikujących się wypłat. Odbywa się to poprzez pierwotne rozpoczęcie od indeksu walidatora 0, określając, czy istnieje kwalifikująca się wypłata dla tego konta zgodnie z zasadami protokołu i dodanie jej do kolejki, jeśli tak. Walidator ustawiony na proponowanie następnego bloku będzie kontynuował w miejscu, w którym poprzedni został pozostawiony, postępując w kolejności w nieskończoność.

<InfoBanner emoji="🕛">
Pomyśl o zegarku analogowym. Wskazówka na zegarze wskazuje godzinę, przesuwa się w jednym kierunku, nie pomija żadnych godzin i ostatecznie zawija się do początku po osiągnięciu ostatniej liczby.<br/><br/>
Teraz zamiast od 1 do 12, wyobraź sobie, że zegar ma od 0 do N <em>(całkowita liczba kont walidatorów, które kiedykolwiek zostały zarejestrowane w warstwie konsensusu, ponad 500 000 — stan na styczeń 2023 r.).</em><br/><br/>
Wskazówka na zegarze wskazuje następny walidator, który należy sprawdzić pod kątem kwalifikujących się wypłat. Zaczyna od 0 i postępuje dookoła, nie pomijając żadnego konta. Po osiągnięciu ostatniego walidatora cykl jest kontynuowany od początku.
</InfoBanner>

#### Sprawdzanie konta pod kątem wypłat {#checking-an-account-for-withdrawals}

Podczas gdy wnioskodawca przegląda walidatory pod kątem możliwych wypłat, każdy sprawdzany walidator jest oceniany pod kątem krótkiej serii pytań w celu ustalenia, czy należy uruchomić wypłatę, a jeśli tak, to ile ETH należy wypłacić.

1. **Czy został podany adres do wypłaty?** Jeśli nie podano adresu do wypłaty, konto zostanie pominięte i wypłata nie zostanie zainicjowana.
2. **Czy walidator wyszedł i jest wypłacalny?** Jeśli walidator całkowicie wyszedł, a my osiągnęliśmy epokę, w której jego konto jest uważane za „wypłacalne”, wówczas zostanie przetworzona pełna wypłata. Spowoduje to przeniesienie całego pozostałego salda na adres wypłaty.
3. **Czy efektywne saldo wynosi maksymalnie 32?** Jeśli konto ma dane uwierzytelniające do wypłaty, nie opuściło w pełni i ma oczekujące nagrody powyżej 32, zostanie przetworzona częściowa wypłata, która przeleje tylko nagrody powyżej 32 na adres wypłaty użytkownika.

Istnieją tylko dwa działania podejmowane przez operatorów walidatorów w trakcie cyklu życia walidatora, które bezpośrednio wpływają na ten przepływ:

- Podanie danych uwierzytelniających do wypłaty, aby umożliwić dowolną formę wypłaty
- Wyjście z sieci, które spowoduje całkowitą wypłatę

### Bez gazu {#gas-free}

Takie podejście do wypłat ze stakingu pozwala uniknąć konieczności ręcznego przesyłania transakcji z żądaniem wypłaty określonej kwoty ETH. Oznacza to, że **nie jest wymagany gaz (opłata transakcyjna)**, a wypłaty również nie konkurują o istniejącą przestrzeń blokową warstwy wykonawczej.

### Jak często będę otrzymywać nagrody ze stakingu? {#how-soon}

W jednym bloku może zostać przetworzonych maksymalnie 16 wypłat. W tym tempie można przetworzyć 115200 wypłat z walidatora dziennie (zakładając, że nie zostaną pominięte żadne sloty). Jak wspomniano powyżej, walidatory bez kwalifikujących się wypłat zostaną pominięte, skracając czas do zakończenia przesunięcia.

Rozszerzając te obliczenia, możemy oszacować czas potrzebny na przetworzenie danej liczby wypłat:

<TableContainer>

| Liczba wypłat | Czas realizacji |
| :-------------------: | :--------------: |
|        400,000        |     3,5 dnia     |
|        500,000        |     4,3 dnia     |
|        600,000        |     5,2 dnia     |
|        700,000        |     6,1 dnia     |
|        800,000        |     7,0 dni       |

</TableContainer>

Jak widać, spowalnia to wraz ze wzrostem liczby walidatorów w sieci. Wzrost liczby pominiętych slotów może proporcjonalnie spowolnić ten proces, ale generalnie będzie to wolniejsza strona możliwych wyników.

## Najczęściej zadawane pytania (FAQ) {#faq}

<ExpandableCard
title="Czy po podaniu adresu wypłaty mogę go zmienić na inny adres?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nie, proces dostarczania danych uwierzytelniających do wypłaty jest jednorazowy i nie można go zmienić po przesłaniu.
</ExpandableCard>

<ExpandableCard
title="Dlaczego adres wypłaty można ustawić tylko raz?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Ustawiając adres wypłat warstwy wykonawczej, dane uwierzytelniające wypłat dla tego walidatora zostały trwale zmienione. Oznacza to, że stare poświadczenia nie będą już działać, a nowe poświadczenia będą kierować do konta warstwy wykonawczej.

Adresy wypłat mogą być albo inteligentnym kontraktem (kontrolowanym przez jego kod), albo zewnętrznym kontem (EOA, kontrolowanym przez jego klucz prywatny). Obecnie konta te nie mają sposobu na przekazanie wiadomości z powrotem do warstwy konsensusu, która sygnalizowałaby zmianę poświadczeń walidatora, a dodanie tej funkcji dodałoby niepotrzebnej złożoności protokołu.

Jako alternatywę dla zmiany adresu wypłaty dla konkretnego walidatora, użytkownicy mogą zdecydować się na ustawienie inteligentnego kontraktu jako adresu wypłaty, który może obsługiwać obroty klucza, tak jak sejf. Użytkownicy, którzy ustawili swoje środki na własne EOA, mogą wykonać pełne wyjście, aby wypłacić wszystkie zestakowane środki, a następnie ponownie zestakować je przy użyciu nowych danych uwierzytelniających.
</ExpandableCard>

<ExpandableCard
title="Co, jeśli biorę udział w stakingu tokenów lub stakowaniu w puli"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Jeśli jesteś częścią <a href="/staking/pools/">puli stakingowej</a> lub posiadasz tokeny stakingowe, powinieneś skontaktować się ze swoim dostawcą, aby uzyskać więcej informacji na temat sposobu obsługi wypłat ze stakingu, ponieważ każda usługa działa inaczej.

Ogólnie rzecz biorąc, użytkownicy powinni mieć możliwość odzyskania swoich bazowych stakowanych ETH lub zmiany dostawcy stakingu, z którego korzystają. Jeśli dana pula staje się zbyt duża, środki mogą zostać wycofane, wypłacone i ponownie zestakowane u <a href="https://rated.network/">mniejszego dostawcy</a>. Lub, jeśli zgromadziłeś wystarczającą ilość ETH, możesz <a href="/staking/solo/">stakować z domu</a>.

</ExpandableCard>

<ExpandableCard
title="Czy wypłaty nagród (wypłaty częściowe) odbywają się automatycznie?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Tak, o ile weryfikator podał adres do wypłaty. Należy to podać raz, aby początkowo umożliwić jakiekolwiek wypłaty, a następnie wypłaty nagród będą automatycznie wykonywane co kilka dni przy każdym przesunięciu walidatora.
</ExpandableCard>

<ExpandableCard
title="Czy pełne wypłaty odbywają się automatycznie?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Nie, jeśli Twój walidator jest nadal aktywny w sieci, pełna wypłata nie nastąpi automatycznie. Wymaga to ręcznego zainicjowania dobrowolnego wyjścia.

Gdy walidator zakończy proces wychodzenia i zakładając, że konto ma dane uwierzytelniające do wypłaty, <em>wtedy</em> pozostanie wypłacone pozostałe saldo podczas następnego <a href="#validator-sweeping">przesunięcia walidatora</a>.

</ExpandableCard>

<ExpandableCard title="Czy mogę wypłacić niestandardową kwotę?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Wypłaty są zaprojektowane tak, aby były realizowane automatycznie, przenosząc wszelkie ETH, które nie wnoszą aktywnego wkładu do stawki. Obejmuje to pełne salda dla kont, które zakończyły proces wyjścia.

Nie jest możliwe ręczne żądanie wypłaty określonych kwot ETH.
</ExpandableCard>

<ExpandableCard
title="Obsługuję walidator. Gdzie mogę znaleźć więcej informacji na temat włączania wypłat?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Operatorom walidatorów zaleca się odwiedzenie strony <a href="https://launchpad.ethereum.org/withdrawals/">wypłaty Staking Launchpad</a>, gdzie można znaleźć więcej szczegółów na temat przygotowania walidatora do wypłat, czasu wydarzeń i więcej szczegółów na temat działania wypłat.

Aby najpierw wypróbować swoją konfigurację w sieci testowej, odwiedź <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a>, aby rozpocząć.

</ExpandableCard>

<ExpandableCard
title="Czy mogę ponownie aktywować mój walidator po wyjściu, wpłacając więcej ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nie. Po wyjściu walidatora i wypłaceniu jego pełnego salda wszelkie dodatkowe środki wpłacone na jego rzecz zostaną automatycznie przesłane na adres wypłat środków podczas następnego przesunięcia walidatorów. Aby ponownie zestakować ETH, należy aktywować nowy walidator.
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Wypłaty Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Wypłaty z łańcucha śledzącego jako operacje](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders — Szanghaj](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Wypłata zestakowanego ETH (testowanie) z Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Wypłaty push łańcucha śledzącego jako operacje z Alexem Stokesem](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Zrozumienie efektywnego bilansu walidatora](https://www.attestant.io/posts/understanding-validator-effective-balance/)
