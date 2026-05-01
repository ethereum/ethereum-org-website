---
title: "Wypłaty ze stakingu"
description: "Strona podsumowująca, czym są wypłaty ze stakingu typu push, jak działają i co stakujący muszą zrobić, aby otrzymać swoje nagrody"
lang: pl
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "Nosorożec Leslie ze swoimi nagrodami za staking"
sidebarDepth: 2
summaryPoints:
  - Operatorzy walidatorów muszą podać adres wypłaty, aby umożliwić wypłaty
  - Z walidatorów starszego typu (legacy) nadwyżka salda powyżej 32 ETH jest automatycznie wypłacana co kilka dni
  - Walidatory z kapitalizacją (compounding) zdobywają nagrody od pełnego salda aż do 2048 ETH
  - Walidatory, które całkowicie wyjdą ze stakingu, otrzymają swoje pozostałe saldo
---

**Wypłaty ze stakingu** odnoszą się do transferów ETH z konta walidatora w warstwie konsensusu Ethereum (Beacon Chain) do warstwy wykonawczej, gdzie można nim dokonywać transakcji.

> Jeśli jesteś częścią [puli stakingowej](/staking/pools/) lub posiadasz tokeny stakingowe, powinieneś skontaktować się ze swoim dostawcą, aby uzyskać więcej szczegółów na temat obsługi wypłat ze stakingu, ponieważ każda usługa działa inaczej.

Sposób działania wypłat zależy od typu danych uwierzytelniających wypłaty Twojego walidatora:

- **Walidatory starszego typu (Typ 1)**: Nadwyżka salda powyżej 32 ETH jest automatycznie i regularnie wysyłana na adres wypłaty powiązany z walidatorem. Nagrody powyżej 32 ETH nie wpływają na wagę walidatora w sieci.
- **Walidatory z kapitalizacją (Typ 2)**: Nagrody są kapitalizowane do salda efektywnego walidatora aż do 2048 ETH, zwiększając wagę walidatora i generując więcej nagród. Tylko saldo przekraczające 2048 ETH jest automatycznie zgarniane (swept).

Użytkownicy mogą również **całkowicie wyjść ze stakingu**, przesyłając transakcję wypłaty, czekając w kolejce wypłat (w zależności od obciążenia sieci) i odblokowując pełne saldo swojego walidatora.

## Nagrody za staking {#staking-rewards}

Sposób obsługi nagród zależy od typu danych uwierzytelniających walidatora:

**Walidatory starszego typu (Typ 1)** mają saldo efektywne ograniczone do 32 ETH. Jakiekolwiek saldo powyżej 32 ETH otrzymane jako nagrody sieciowe nie wlicza się do salda efektywnego ani nie zwiększa wagi tego walidatora w sieci, a nagrody te są automatycznie wypłacane na dedykowany adres wypłaty walidatora co kilka dni. Poza jednorazowym podaniem adresu wypłaty, odbiór tych nagród nie wymaga żadnych działań ze strony operatora walidatora. Wszystko to jest inicjowane w warstwie konsensusu, dlatego na żadnym etapie nie jest wymagany gaz (opłata transakcyjna).

**Walidatory z kapitalizacją (Typ 2)** mogą mieć saldo efektywne w przedziale od 32 do 2048 ETH. Nagrody sieciowe otrzymywane przez te walidatory są kapitalizowane do ich salda efektywnego, zwiększając wagę walidatora i potencjał do otrzymywania przyszłych nagród. Automatyczne zgarnianie (sweeps) występuje tylko dla salda przekraczającego 2048 ETH. Aby wypłacić nagrody poniżej progu 2048 ETH, walidatory z kapitalizacją muszą ręcznie zainicjować częściową wypłatę z warstwy wykonawczej, co wymaga gazu.

### Jak do tego doszliśmy? {#how-did-we-get-here}

W ciągu ostatnich kilku lat [Ethereum](/) przeszło kilka aktualizacji sieci, przechodząc na sieć zabezpieczaną przez samo ETH, zamiast energochłonnego kopania, jak to miało miejsce wcześniej. Uczestnictwo w konsensusie na Ethereum jest teraz znane jako „staking”, ponieważ uczestnicy dobrowolnie zablokowali ETH, stawiając je jako stawkę („at stake”) w zamian za możliwość uczestnictwa w sieci. Użytkownicy przestrzegający zasad będą nagradzani, podczas gdy próby oszustwa mogą zostać ukarane.

Od czasu uruchomienia kontraktu depozytu stakingowego w listopadzie 2020 r., niektórzy odważni pionierzy Ethereum dobrowolnie zablokowali środki, aby aktywować „walidatory” – specjalne konta, które mają prawo do formalnego poświadczania i proponowania bloków, zgodnie z zasadami sieci.

Przed aktualizacją Szanghaj/Capella nie można było używać ani uzyskać dostępu do stakowanego ETH. Ale teraz możesz zdecydować się na automatyczne otrzymywanie nagród na wybrane konto, a także możesz wypłacić swoje stakowane ETH, kiedy tylko zechcesz.

### Jak się przygotować? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Ważne uwagi {#important-notices}

Konta walidatorów muszą podać adres wypłaty, zanim będą mogły uzyskać dostęp i wypłacić zgromadzone nagrody sieciowe lub przetworzyć pełną wypłatę po wyjściu ze stakingu.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Każdemu kontu walidatora można przypisać tylko jeden adres wypłaty, tylko raz.** Po wybraniu adresu i przesłaniu go do warstwy konsensusu nie można tego cofnąć ani zmienić. Przed przesłaniem dokładnie sprawdź własność i poprawność podanego adresu.
</AlertDescription>
</AlertContent>
</Alert>

Jeśli jeszcze nie podałeś adresu wypłaty dla swojego konta walidatora, w międzyczasie **nie ma zagrożenia dla Twoich środków**, zakładając, że Twoja fraza odzyskiwania (mnemonic/seed phrase) pozostała bezpieczna w trybie offline i nie została w żaden sposób naruszona. Brak dodania danych uwierzytelniających wypłaty po prostu pozostawi ETH zablokowane na koncie walidatora do czasu podania adresu wypłaty.

## Walidatory z kapitalizacją {#compounding-validators}

Walidatory mogą zdecydować się na **kapitalizację** (compounding), konwertując swoje dane uwierzytelniające wypłaty z Typu 1 na Typ 2. Zwiększa to maksymalne saldo efektywne z 32 ETH do **2048 ETH**, pozwalając na kapitalizację nagród do salda efektywnego walidatora zamiast ich automatycznego zgarniania.

Z włączoną kapitalizacją:

- Nagrody zwiększają saldo efektywne walidatora w krokach co 1 ETH (z zastrzeżeniem małego [bufora histerezy](https://www.attestant.io/posts/understanding-validator-effective-balance/)), generując z czasem więcej nagród
- Automatyczne zgarnianie występuje tylko dla salda przekraczającego 2048 ETH
- Częściowe wypłaty poniżej progu 2048 ETH muszą być inicjowane ręcznie z warstwy wykonawczej (to kosztuje gaz)
- Wiele walidatorów można **skonsolidować** w jeden walidator z kapitalizacją, zmniejszając narzut operacyjny

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Konwersja danych uwierzytelniających wypłaty z Typu 1 na Typ 2 jest nieodwracalna.** Użyj [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) jako oficjalnego narzędzia do tej konwersji. Aby uzyskać więcej szczegółów na temat procesu konwersji, ryzyka i konsolidacji, zobacz [szczegółowe omówienie MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Całkowite wyjście ze stakingu {#exiting-staking-entirely}

Podanie adresu wypłaty jest wymagane, zanim _jakiekolwiek_ środki będą mogły zostać przetransferowane z salda konta walidatora.

Użytkownicy chcący całkowicie wyjść ze stakingu i wypłacić z powrotem swoje pełne saldo muszą zainicjować „dobrowolne wyjście” (voluntary exit). Można to zrobić na dwa sposoby:

- **Używając kluczy walidatora**: Podpisz i roześlij wiadomość o dobrowolnym wyjściu za pomocą swojego klienta walidatora, przesłaną do Twojego węzła konsensusu. To nie wymaga gazu.
- **Używając danych uwierzytelniających wypłaty**: Zainicjuj wyjście z warstwy wykonawczej przy użyciu swojego adresu wypłaty, bez konieczności dostępu do klucza podpisującego walidatora. Wymaga to transakcji i kosztuje gaz.

Proces wyjścia walidatora ze stakingu zajmuje różną ilość czasu, w zależności od tego, ilu innych wychodzi w tym samym czasie. Po zakończeniu to konto nie będzie już odpowiedzialne za wykonywanie obowiązków walidatora w sieci, nie będzie już kwalifikować się do nagród i nie będzie już miało swojego ETH jako stawki („at stake”). W tym momencie konto zostanie oznaczone jako w pełni „gotowe do wypłaty” (withdrawable).

Gdy konto zostanie oznaczone jako „gotowe do wypłaty” i podano dane uwierzytelniające wypłaty, użytkownik nie musi robić nic więcej poza czekaniem. Konta są automatycznie i w sposób ciągły przeszukiwane przez proponujących bloki pod kątem kwalifikujących się środków z wyjścia, a saldo Twojego konta zostanie w pełni przetransferowane (znane również jako „pełna wypłata”) podczas następnego <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>zgarniania (sweep)</a>.

## Jak działają automatyczne nagrody (walidator Typu 1)? {#how-do-withdrawals-work}

To, czy dany walidator kwalifikuje się do wypłaty, czy nie, zależy od stanu samego konta walidatora. W żadnym momencie nie jest potrzebna ingerencja użytkownika, aby określić, czy konto powinno mieć zainicjowaną wypłatę, czy nie – cały proces jest wykonywany automatycznie przez warstwę konsensusu w ciągłej pętli.

### Wolisz uczyć się wzrokowo? {#visual-learner}

Sprawdź to wyjaśnienie wypłat ze stakingu Ethereum przygotowane przez Finematics:

<VideoWatch slug="ethereum-staking-withdrawals" />

### „Zgarnianie” (sweeping) walidatorów {#validator-sweeping}

Kiedy walidator jest zaplanowany do zaproponowania następnego bloku, jest zobowiązany do zbudowania kolejki wypłat, składającej się z maksymalnie 16 kwalifikujących się wypłat. Odbywa się to poprzez rozpoczęcie od indeksu walidatora 0, określenie, czy dla tego konta istnieje kwalifikująca się wypłata zgodnie z zasadami protokołu, i dodanie jej do kolejki, jeśli tak jest. Walidator wyznaczony do zaproponowania kolejnego bloku rozpocznie w miejscu, w którym skończył poprzedni, postępując w kolejności w nieskończoność.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pomyśl o zegarze analogowym. Wskazówka na zegarze wskazuje godzinę, porusza się w jednym kierunku, nie pomija żadnych godzin i ostatecznie wraca na początek po osiągnięciu ostatniej liczby.

Teraz zamiast od 1 do 12, wyobraź sobie, że zegar ma od 0 do N _(gdzie N to całkowita liczba kont walidatorów, które kiedykolwiek zostały zarejestrowane w warstwie konsensusu, ponad 1,2 miliona na kwiecień 2026 r.)._

Wskazówka na zegarze wskazuje na następny walidator, który musi zostać sprawdzony pod kątem kwalifikujących się wypłat. Zaczyna się od 0 i przechodzi dookoła bez pomijania żadnych kont. Po dotarciu do ostatniego walidatora cykl jest kontynuowany od początku.
</AlertDescription>
</AlertContent>
</Alert>

#### Sprawdzanie konta pod kątem wypłat {#checking-an-account-for-withdrawals}

Podczas gdy proponujący przeszukuje walidatory pod kątem możliwych wypłat, każdy sprawdzany walidator jest oceniany na podstawie krótkiej serii pytań, aby ustalić, czy wypłata powinna zostać zainicjowana, a jeśli tak, ile ETH powinno zostać wypłacone.

1. **Czy podano adres wypłaty?** Jeśli nie podano adresu wypłaty, konto jest pomijane i wypłata nie jest inicjowana.
2. **Czy walidator wyszedł i jest gotowy do wypłaty?** Jeśli walidator całkowicie wyszedł i osiągnęliśmy epokę, w której jego konto jest uważane za „gotowe do wypłaty” (withdrawable), zostanie przetworzona pełna wypłata. Spowoduje to transfer całego pozostałego salda na adres wypłaty.
3. **Czy saldo przekracza jego maksymalne saldo efektywne?** Dla walidatorów starszego typu (Typ 1) ten próg wynosi 32 ETH. Dla walidatorów z kapitalizacją (Typ 2) ten próg wynosi 2048 ETH. Jeśli konto posiada dane uwierzytelniające wypłaty, nie wyszło całkowicie, ma saldo efektywne na poziomie maksymalnym i posiada saldo powyżej tego progu, zostanie przetworzona częściowa wypłata, która przetransferuje tylko nadwyżkę na adres wypłaty użytkownika.

Istnieją tylko dwa działania podejmowane przez operatorów walidatorów w trakcie cyklu życia walidatora, które bezpośrednio wpływają na ten przepływ:

- Podanie danych uwierzytelniających wypłaty, aby umożliwić jakąkolwiek formę wypłaty
- Wyjście z sieci, co zainicjuje pełną wypłatę

### Bez opłat za gaz {#gas-free}

Automatyczne zgarnianie wypłat nie wymaga od stakujących ręcznego przesyłania transakcji. Oznacza to, że **nie jest wymagany gaz (opłata transakcyjna)** dla automatycznego zgarniania i nie konkurują one o istniejącą przestrzeń bloków w warstwie wykonawczej.

Należy pamiętać, że [walidatory z kapitalizacją](#compounding-validators), które chcą zainicjować częściową wypłatę poniżej progu 2048 ETH, muszą to zrobić ręcznie z warstwy wykonawczej, co wymaga gazu.

### Jak często moje nagrody za staking będą odblokowywane i dostępne w moim portfelu? {#how-soon}

W pojedynczym bloku można przetworzyć maksymalnie 16 wypłat. W tym tempie można przetworzyć 115 200 wypłat z walidatorów dziennie (zakładając brak pominiętych slotów). Jak zauważono powyżej, walidatory bez kwalifikujących się wypłat zostaną pominięte, co skraca czas potrzebny na zakończenie zgarniania.

Rozszerzając te obliczenia, możemy oszacować czas potrzebny na przetworzenie danej liczby wypłat:

<TableContainer>

| Liczba wypłat | Czas realizacji |
| :-------------------: | :--------------: |
|        400 000        |     3,5 dnia     |
|        500 000        |     4,3 dnia     |
|        600 000        |     5,2 dnia     |
|        700 000        |     6,1 dnia     |
|        800 000        |     7,0 dni     |

</TableContainer>

Jak widać, proces ten zwalnia w miarę pojawiania się większej liczby walidatorów w sieci. Wzrost liczby pominiętych slotów mógłby to proporcjonalnie spowolnić, ale generalnie będzie to reprezentować wolniejszą stronę możliwych scenariuszy.

## Często zadawane pytania {#faq}

<ExpandableCard
title="Czy po podaniu adresu wypłaty mogę go zmienić na alternatywny adres wypłaty?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nie, proces podawania danych uwierzytelniających wypłaty jest jednorazowy i nie można ich zmienić po przesłaniu.
</ExpandableCard>

<ExpandableCard
title="Dlaczego adres wypłaty walidatora można ustawić tylko raz?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Ustawienie adresu wypłaty walidatora w warstwie wykonawczej jest trwałą zmianą danych uwierzytelniających walidatora w warstwie konsensusu. Nie ma możliwości aktualizacji danych uwierzytelniających w warstwie konsensusu po ich zarejestrowaniu.

Dane uwierzytelniające adresu wypłaty walidatora mogą zostać ustawione tak, aby wskazywały na inteligentny kontrakt (kontrolowany przez jego kod) lub na konto posiadane zewnętrznie (EOA, kontrolowane przez jego klucz prywatny). Obecnie konta te nie mają możliwości przekazania wiadomości z powrotem do warstwy konsensusu, która sygnalizowałaby zmianę danych uwierzytelniających walidatora, a dodanie tej funkcjonalności wprowadziłoby niepotrzebną złożoność do protokołu.

Użytkownicy poszukujący elastycznego zarządzania wypłatami mogą ustawić portfel w formie inteligentnego kontraktu z możliwością rotacji kluczy (taki jak [Safe](https://safe.global/)) jako adres wypłaty walidatora, co skutecznie pozwala na aktualizację ostatecznego odbiorcy EOA. Jeśli użytkownik ustawił już EOA jako dane uwierzytelniające wypłaty, musi zainicjować pełne wyjście, aby odzyskać swoje stakowane ETH, a następnie użyć tych środków do aktywacji nowego walidatora z innymi danymi uwierzytelniającymi.
</ExpandableCard>

<ExpandableCard
title="Jak wypłacić środki ze stakingu, jeśli stakuję przez dostawcę, pulę stakingową lub używam płynnych tokenów stakingowych?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Jeśli korzystasz z puli stakingowej lub posiadasz tokeny stakingowe, skontaktuj się ze swoim dostawcą, aby dowiedzieć się, jak obsługuje wypłaty, ponieważ procesy różnią się w zależności od usługi. 

Ogólnie rzecz biorąc, stakując za pośrednictwem dostawcy lub puli, powinieneś mieć swobodę odzyskania swojego bazowego stakowanego ETH lub wypłaty i zmiany dostawcy stakingu, z którego korzystasz. Jeśli dana pula staje się zbyt duża, stakowane ETH można wycofać, odebrać i stakować ponownie u [mniejszego dostawcy](https://rated.network/). Albo, jeśli zgromadziłeś wystarczająco dużo ETH, możesz [stakować z domu](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Czy odbieranie nagród sieciowych (wypłaty częściowe) odbywa się automatycznie?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Dla **walidatorów starszego typu (Typ 1)**, tak – o ile Twój walidator podał adres wypłaty. Należy go podać raz, aby umożliwić jakiekolwiek wypłaty, a następnie dystrybucja nagród sieciowych na adres wypłaty będzie automatycznie inicjowana co kilka dni przy każdym zgarnianiu walidatorów.

Dla **walidatorów z kapitalizacją (Typ 2)**, nagrody są kapitalizowane do salda efektywnego walidatora (do 2048 ETH), zamiast być zgarniane na adres wypłaty. Automatyczne zgarnianie występuje tylko dla sald przekraczających 2048 ETH. Aby wypłacić nagrody poniżej tego progu, musisz ręcznie zainicjować częściową wypłatę z warstwy wykonawczej.
</ExpandableCard>

<ExpandableCard title="Czy mogę wypłacić niestandardową kwotę?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Dla **walidatorów starszego typu (Typ 1)**, wszelkie nagrody sieciowe w ETH, które zgromadziły się powyżej salda efektywnego walidatora wynoszącego 32 ETH, są automatycznie wypychane (pushed) na adres wypłaty. Walidatory Typu 1, które przesłały transakcję pełnej wypłaty i zakończyły proces wyjścia ze stakingu, mają swoje pełne saldo ETH wypłacone na swój adres wypłaty. Nie jest możliwe, aby walidator Typu 1 ręcznie zażądał wypłaty określonych kwot ETH.

**Walidatory z kapitalizacją (Typ 2)** mogą inicjować częściowe wypłaty określonej kwoty z warstwy wykonawczej, o ile pozostałe saldo walidatora utrzymuje się na poziomie 32 ETH lub wyższym. Wymaga to przesłania transakcji częściowej wypłaty i kosztuje gaz.
</ExpandableCard>

<ExpandableCard
title="Prowadzę walidatora. Gdzie znajdę więcej informacji o zarządzaniu procesem wypłaty?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Operatorom walidatorów zaleca się odwiedzenie strony [Wypłaty na Staking Launchpad](https://launchpad.ethereum.org/withdrawals/), gdzie znajdą więcej szczegółów na temat tego, jak przygotować swój walidator do wypłat, harmonogramu wydarzeń i więcej informacji o tym, jak funkcjonują wypłaty.

Aby najpierw wypróbować swoją konfigurację w sieci testowej, odwiedź [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org), aby rozpocząć.

</ExpandableCard>

<ExpandableCard
title="Czy mogę ponownie aktywować mojego walidatora po wyjściu, deponując więcej ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nie. Gdy walidator wyjdzie, a jego pełne saldo zostanie wypłacone, wszelkie dodatkowe ETH zdeponowane na tym walidatorze zostaną automatycznie przetransferowane na adres wypłaty podczas następnego zgarniania walidatorów. Aby ponownie rozpocząć staking przy użyciu tego ETH, musisz aktywować nowy walidator.
</ExpandableCard>

<ExpandableCard
title="Jaka jest różnica między walidatorami starszego typu a walidatorami z kapitalizacją?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Walidatory starszego typu używają danych uwierzytelniających wypłaty **Typu 1** (adres danych uwierzytelniających wypłaty zaczyna się od 0x01) i mają saldo efektywne ograniczone do 32 ETH. Wszelkie nadwyżki ETH otrzymane jako nagrody sieciowe są automatycznie zgarniane na adres wypłaty co kilka dni.

Walidatory z kapitalizacją używają danych uwierzytelniających wypłaty **Typu 2** (adres danych uwierzytelniających wypłaty zaczyna się od 0x02) i mogą mieć saldo efektywne do 2048 ETH. Nagrody są kapitalizowane do salda efektywnego walidatora, zwiększając wagę walidatora w sieci i potencjał do otrzymywania przyszłych nagród. Automatyczne zgarnianie występuje tylko dla salda przekraczającego 2048 ETH. Aby wypłacić ETH poniżej tego progu, należy zainicjować ręczną częściową wypłatę z warstwy wykonawczej.

Aby uzyskać więcej szczegółów, zobacz [szczegółowe omówienie MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Jak przekonwertować na walidatora z kapitalizacją?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Możesz przekonwertować dane uwierzytelniające wypłaty z Typu 1 na Typ 2 za pomocą [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Ta operacja jest **nieodwracalna** — po konwersji nie możesz wrócić do danych uwierzytelniających Typu 1.

Po konwersji możesz również **skonsolidować** wiele walidatorów w jeden, łącząc ich salda w pojedynczy walidator z kapitalizacją. Pełny opis procesu konwersji, ryzyka i narzędzi do konsolidacji znajdziesz w [szczegółowym omówieniu MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Kiedy włączono wypłaty ze stakingu?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
Funkcjonalność wypłat została pierwotnie włączona w ramach aktualizacji Szanghaj/Capella w dniu **12 kwietnia 2023 r.** Aktualizacja [Pectra](/roadmap/pectra/) (maj 2025 r.) wprowadziła później walidatory z kapitalizacją z wyższym maksymalnym saldem efektywnym wynoszącym 2048 ETH, a także wyjścia i częściowe wypłaty inicjowane z warstwy wykonawczej.

Aktualizacja Szanghaj/Capella umożliwiła odzyskanie wcześniej stakowanego ETH na zwykłe konta Ethereum. Zamknęło to pętlę płynności stakingu i przybliżyło Ethereum o krok w jego podróży w kierunku budowy zrównoważonego, skalowalnego, bezpiecznego i zdecentralizowanego ekosystemu.

- [Więcej o historii Ethereum](/ethereum-forks/)
- [Więcej o mapie drogowej Ethereum](/roadmap/)
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Wypłaty na Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Akcje walidatora na Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Szczegółowe omówienie MaxEB: kapitalizacja i konsolidacja](/roadmap/pectra/maxeb/)
- [EIP-4895: Wypłaty typu push z Beacon Chain jako operacje](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Wypłata stakowanego ETH (testowanie) z Potuz i Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Wypłaty typu push z Beacon Chain jako operacje z Alexem Stokesem](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Zrozumienie salda efektywnego walidatora](https://www.attestant.io/posts/understanding-validator-effective-balance/)