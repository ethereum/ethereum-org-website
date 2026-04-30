---
title: Wypłaty ze stakingu
description: Strona podsumowująca, czym są wypłaty ze stakingu typu push, jak działają i co stakujący muszą zrobić, aby otrzymać swoje nagrody
lang: pl
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Nosorożec Leslie ze swoimi nagrodami ze stakingu
sidebarDepth: 2
summaryPoints:
  - Operatorzy walidatorów muszą podać adres wypłaty, aby umożliwić wypłaty
  - Tradycyjni walidatorzy mają nadwyżkę salda powyżej 32 ETH automatycznie wypłacaną co kilka dni
  - Walidatorzy z kapitalizacją (compounding) zdobywają nagrody od pełnego salda aż do 2048 ETH
  - Walidatorzy, którzy całkowicie zrezygnują ze stakingu, otrzymają swoje pozostałe saldo
---

**Wypłaty ze stakingu** odnoszą się do transferów ETH z konta walidatora w warstwie konsensusu Ethereum (łańcuch śledzący) do warstwy wykonawczej, gdzie można nim dokonywać transakcji.

Sposób działania wypłat zależy od typu poświadczeń wypłaty (withdrawal credential) Twojego walidatora:

- **Tradycyjni walidatorzy (Typ 1)**: Nadwyżka salda powyżej 32 ETH jest automatycznie i regularnie wysyłana na adres wypłaty powiązany z walidatorem. Nagrody powyżej 32 ETH nie wpływają na wagę walidatora w sieci.
- **Walidatorzy z kapitalizacją (Typ 2)**: Nagrody kapitalizują się w efektywnym saldzie walidatora aż do 2048 ETH, zwiększając wagę walidatora i generując więcej nagród. Tylko saldo przekraczające 2048 ETH jest automatycznie zgarniane (swept).

Użytkownicy mogą również **całkowicie wyjść ze stakingu**, odblokowując pełne saldo swojego walidatora.

## Nagrody ze stakingu {#staking-rewards}

Sposób obsługi nagród zależy od typu poświadczeń walidatora:

**Tradycyjni walidatorzy (Typ 1)** mają efektywne saldo ograniczone do 32 ETH. Jakiekolwiek saldo powyżej 32 ETH uzyskane z nagród nie powiększa kapitału głównego ani nie zwiększa wagi tego walidatora w sieci i jest automatycznie wypłacane jako nagroda co kilka dni. Poza jednorazowym podaniem adresu wypłaty, nagrody te nie wymagają żadnych działań ze strony operatora walidatora. Wszystko to jest inicjowane w warstwie konsensusu, więc na żadnym etapie nie jest wymagany gaz (opłata transakcyjna).

**Walidatorzy z kapitalizacją (Typ 2)** mogą mieć efektywne saldo w przedziale od 32 do 2048 ETH. Nagrody zdobyte przez tych walidatorów kapitalizują się w ich efektywnym saldzie, zwiększając wagę walidatora i przyszłe nagrody. Automatyczne zgarnianie (sweeps) występuje tylko dla salda przekraczającego 2048 ETH. Aby wypłacić nagrody poniżej progu 2048 ETH, walidatorzy z kapitalizacją muszą ręcznie zainicjować częściową wypłatę z warstwy wykonawczej, co wymaga gazu.

### Jak do tego doszliśmy? {#how-did-we-get-here}

W ciągu ostatnich kilku lat [Ethereum](/) przeszło kilka aktualizacji sieci, przechodząc na sieć zabezpieczoną przez samo ETH, zamiast energochłonnego wydobycia, jak to miało miejsce wcześniej. Uczestnictwo w konsensusie na Ethereum jest teraz znane jako „staking”, ponieważ uczestnicy dobrowolnie zablokowali ETH, stawiając je „na szali” (at stake) w zamian za możliwość uczestnictwa w sieci. Użytkownicy przestrzegający zasad będą nagradzani, podczas gdy próby oszustwa mogą być karane.

Od czasu uruchomienia kontraktu depozytowego (deposit contract) stakingu w listopadzie 2020 r., niektórzy odważni pionierzy Ethereum dobrowolnie zablokowali środki, aby aktywować „walidatorów”, specjalne konta, które mają prawo do formalnego poświadczania i proponowania bloków, zgodnie z zasadami sieci.

Przed aktualizacją Shanghai/Capella nie można było używać ani uzyskiwać dostępu do stakowanego ETH. Ale teraz możesz zdecydować się na automatyczne otrzymywanie nagród na wybrane konto, a także możesz wypłacić swoje stakowane ETH, kiedy tylko zechcesz.

### Jak się przygotować? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Ważne uwagi {#important-notices}

Podanie adresu wypłaty jest wymaganym krokiem dla każdego konta walidatora, zanim będzie ono uprawnione do wypłaty ETH ze swojego salda.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Każdemu kontu walidatora można przypisać tylko jeden adres wypłaty, tylko raz.** Po wybraniu adresu i przesłaniu go do warstwy konsensusu, nie można tego cofnąć ani zmienić. Przed przesłaniem dokładnie sprawdź własność i poprawność podanego adresu.
</AlertDescription>
</AlertContent>
</Alert>

W międzyczasie **nie ma zagrożenia dla Twoich środków** z powodu niepodania tego adresu, przy założeniu, że Twoja fraza mnemoniczna/seedy pozostały bezpieczne w trybie offline i nie zostały w żaden sposób naruszone. Brak dodania poświadczeń wypłaty po prostu pozostawi ETH zablokowane na koncie walidatora, tak jak to miało miejsce do momentu podania adresu wypłaty.

## Walidatorzy z kapitalizacją {#compounding-validators}

Walidatorzy mogą zdecydować się na **kapitalizację** (compounding), konwertując swoje poświadczenia wypłaty z Typu 1 na Typ 2. Zwiększa to maksymalne efektywne saldo z 32 ETH do **2048 ETH**, pozwalając nagrodom kapitalizować się w efektywnym saldzie walidatora zamiast być automatycznie zgarnianymi.

Przy włączonej kapitalizacji:

- Nagrody zwiększają efektywne saldo walidatora w przyrostach co 1 ETH (z zastrzeżeniem małego [bufora histerezy](https://www.attestant.io/posts/understanding-validator-effective-balance/)), generując z czasem więcej nagród
- Automatyczne zgarnianie występuje tylko dla salda przekraczającego 2048 ETH
- Częściowe wypłaty poniżej progu 2048 ETH muszą być inicjowane ręcznie z warstwy wykonawczej (to kosztuje gaz)
- Wielu walidatorów może zostać **skonsolidowanych** w jednego walidatora z kapitalizacją, co zmniejsza koszty operacyjne

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Konwersja poświadczeń wypłaty z Typu 1 na Typ 2 jest nieodwracalna.** Użyj [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) jako oficjalnego narzędzia do tej konwersji. Aby uzyskać więcej szczegółów na temat procesu konwersji, ryzyka i konsolidacji, zobacz [szczegółowe omówienie MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Całkowite wyjście ze stakingu {#exiting-staking-entirely}

Podanie adresu wypłaty jest wymagane, zanim _jakiekolwiek_ środki będą mogły zostać przetransferowane z salda konta walidatora.

Użytkownicy chcący całkowicie wyjść ze stakingu i wypłacić z powrotem swoje pełne saldo, muszą zainicjować „dobrowolne wyjście” (voluntary exit). Można to zrobić na dwa sposoby:

- **Używając kluczy walidatora**: Podpisz i wyemituj wiadomość o dobrowolnym wyjściu za pomocą swojego klienta walidatora, przesłaną do Twojego węzła konsensusu. To nie wymaga gazu.
- **Używając poświadczeń wypłaty**: Zainicjuj wyjście z warstwy wykonawczej przy użyciu swojego adresu wypłaty, bez konieczności dostępu do klucza podpisującego walidatora. Wymaga to transakcji i kosztuje gaz.

Proces wychodzenia walidatora ze stakingu zajmuje różną ilość czasu, w zależności od tego, ilu innych wychodzi w tym samym czasie. Po zakończeniu, to konto nie będzie już odpowiedzialne za wykonywanie obowiązków sieciowych walidatora, nie będzie już uprawnione do nagród i nie będzie już miało swojego ETH „na szali”. W tym momencie konto zostanie oznaczone jako w pełni „gotowe do wypłaty” (withdrawable).

Gdy konto zostanie oznaczone jako „gotowe do wypłaty”, a poświadczenia wypłaty zostaną podane, użytkownik nie musi robić nic więcej poza czekaniem. Konta są automatycznie i w sposób ciągły przeszukiwane przez proponentów bloków pod kątem kwalifikujących się środków z wyjścia, a saldo Twojego konta zostanie w pełni przetransferowane (znane również jako „pełna wypłata”) podczas następnego <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>zgarniania (sweep)</a>.

## Kiedy włączono wypłaty ze stakingu? {#when}

Funkcjonalność wypłat została pierwotnie włączona w ramach aktualizacji Shanghai/Capella w dniu **12 kwietnia 2023 r.** Aktualizacja [Pectra](/roadmap/pectra/) (maj 2025 r.) wprowadziła później walidatorów z kapitalizacją o wyższym maksymalnym efektywnym saldzie wynoszącym 2048 ETH, a także wyjścia i częściowe wypłaty inicjowane z warstwy wykonawczej.

Aktualizacja Shanghai/Capella umożliwiła odzyskanie wcześniej stakowanego ETH na zwykłe konta Ethereum. Zamknęło to pętlę płynności stakingu i przybliżyło Ethereum o krok w jego podróży w kierunku budowy zrównoważonego, skalowalnego, bezpiecznego i zdecentralizowanego ekosystemu.

- [Więcej o historii Ethereum](/ethereum-forks/)
- [Więcej o planie działania Ethereum](/roadmap/)

## Jak działają płatności z wypłat? {#how-do-withdrawals-work}

To, czy dany walidator kwalifikuje się do wypłaty, czy nie, zależy od stanu samego konta walidatora. W żadnym momencie nie jest potrzebna ingerencja użytkownika, aby określić, czy konto powinno mieć zainicjowaną wypłatę, czy nie — cały proces jest wykonywany automatycznie przez warstwę konsensusu w ciągłej pętli.

### Wolisz uczyć się wzrokowo? {#visual-learner}

Sprawdź to wyjaśnienie wypłat ze stakingu Ethereum autorstwa Finematics:

<YouTube id="RwwU3P9n3uo" />

### „Zgarnianie” (sweeping) walidatorów {#validator-sweeping}

Kiedy walidator jest zaplanowany do zaproponowania następnego bloku, jest on zobowiązany do zbudowania kolejki wypłat, składającej się z maksymalnie 16 kwalifikujących się wypłat. Odbywa się to poprzez rozpoczęcie od indeksu walidatora 0, określenie, czy istnieje kwalifikująca się wypłata dla tego konta zgodnie z zasadami protokołu, i dodanie jej do kolejki, jeśli tak jest. Walidator wyznaczony do zaproponowania kolejnego bloku podejmie pracę w miejscu, w którym skończył poprzedni, postępując w kolejności w nieskończoność.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pomyśl o zegarze analogowym. Wskazówka na zegarze wskazuje godzinę, przesuwa się w jednym kierunku, nie pomija żadnych godzin i ostatecznie wraca na początek po osiągnięciu ostatniej liczby.

Teraz zamiast od 1 do 12, wyobraź sobie, że zegar ma od 0 do N _(całkowita liczba kont walidatorów, które kiedykolwiek zostały zarejestrowane w warstwie konsensusu, ponad 500 000 na styczeń 2023 r.)._

Wskazówka na zegarze wskazuje na następnego walidatora, który musi zostać sprawdzony pod kątem kwalifikujących się wypłat. Zaczyna się od 0 i przesuwa się dookoła bez pomijania żadnych kont. Po dotarciu do ostatniego walidatora cykl jest kontynuowany od początku.
</AlertDescription>
</AlertContent>
</Alert>

#### Sprawdzanie konta pod kątem wypłat {#checking-an-account-for-withdrawals}

Podczas gdy proponent przeszukuje walidatorów pod kątem możliwych wypłat, każdy sprawdzany walidator jest oceniany na podstawie krótkiej serii pytań, aby ustalić, czy wypłata powinna zostać zainicjowana, a jeśli tak, ile ETH powinno zostać wypłacone.

1. **Czy podano adres wypłaty?** Jeśli nie podano adresu wypłaty, konto jest pomijane i wypłata nie jest inicjowana.
2. **Czy walidator wyszedł i jest gotowy do wypłaty?** Jeśli walidator całkowicie wyszedł i osiągnęliśmy epokę, w której jego konto jest uważane za „gotowe do wypłaty” (withdrawable), zostanie przetworzona pełna wypłata. Spowoduje to transfer całego pozostałego salda na adres wypłaty.
3. **Czy saldo przekracza maksymalne efektywne saldo?** Dla tradycyjnych walidatorów (Typ 1) ten próg wynosi 32 ETH. Dla walidatorów z kapitalizacją (Typ 2) ten próg wynosi 2048 ETH. Jeśli konto posiada poświadczenia wypłaty, nie wyszło całkowicie i ma saldo powyżej swojego progu, zostanie przetworzona częściowa wypłata, która przetransferuje tylko nadwyżkę na adres wypłaty użytkownika.

Istnieją tylko dwa działania podejmowane przez operatorów walidatorów w trakcie cyklu życia walidatora, które bezpośrednio wpływają na ten przepływ:

- Podanie poświadczeń wypłaty, aby umożliwić jakąkolwiek formę wypłaty
- Wyjście z sieci, co zainicjuje pełną wypłatę

### Bez gazu {#gas-free}

Automatyczne zgarnianie wypłat nie wymaga od stakujących ręcznego przesyłania transakcji. Oznacza to, że **nie jest wymagany gaz (opłata transakcyjna)** dla automatycznego zgarniania i nie konkurują one o istniejącą przestrzeń bloków w warstwie wykonawczej.

Należy pamiętać, że [walidatorzy z kapitalizacją](#compounding-validators), którzy chcą zainicjować częściową wypłatę poniżej progu 2048 ETH, muszą to zrobić ręcznie z warstwy wykonawczej, co wymaga gazu.

### Jak często będę otrzymywać nagrody ze stakingu? {#how-soon}

W jednym bloku można przetworzyć maksymalnie 16 wypłat. W tym tempie można przetworzyć 115 200 wypłat walidatorów dziennie (zakładając brak pominiętych slotów). Jak zauważono powyżej, walidatorzy bez kwalifikujących się wypłat zostaną pominięci, co skróci czas zakończenia zgarniania.

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

Jak widać, proces ten zwalnia w miarę pojawiania się większej liczby walidatorów w sieci. Wzrost liczby pominiętych slotów mógłby to proporcjonalnie spowolnić, ale generalnie będzie to reprezentować wolniejszą stronę możliwych wyników.

## Często zadawane pytania {#faq}

<ExpandableCard
title="Czy po podaniu adresu wypłaty mogę go zmienić na alternatywny adres wypłaty?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nie, proces podawania poświadczeń wypłaty jest procesem jednorazowym i nie można go zmienić po przesłaniu.
</ExpandableCard>

<ExpandableCard
title="Dlaczego adres wypłaty można ustawić tylko raz?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Poprzez ustawienie adresu wypłaty w warstwie wykonawczej, poświadczenia wypłaty dla tego walidatora zostały trwale zmienione. Oznacza to, że stare poświadczenia nie będą już działać, a nowe poświadczenia kierują na konto w warstwie wykonawczej.

Adresy wypłat mogą być inteligentnym kontraktem (kontrolowanym przez jego kod) lub kontem zewnętrznym (EOA, kontrolowanym przez jego klucz prywatny). Obecnie konta te nie mają możliwości przekazania z powrotem do warstwy konsensusu wiadomości, która sygnalizowałaby zmianę poświadczeń walidatora, a dodanie tej funkcjonalności wprowadziłoby niepotrzebną złożoność do protokołu.

Jako alternatywę dla zmiany adresu wypłaty dla konkretnego walidatora, użytkownicy mogą zdecydować się na ustawienie inteligentnego kontraktu jako swojego adresu wypłaty, który mógłby obsługiwać rotację kluczy, takiego jak Safe. Użytkownicy, którzy ustawią swoje środki na własne konto zewnętrzne (EOA), mogą wykonać pełne wyjście, aby wypłacić wszystkie swoje stakowane środki, a następnie ponownie je stakować przy użyciu nowych poświadczeń.
</ExpandableCard>

<ExpandableCard
title="Co jeśli uczestniczę w tokenach stakingowych lub puli stakingu?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Jeśli jesteś częścią [puli stakingu](/staking/pools/) lub posiadasz tokeny stakingowe, powinieneś skontaktować się ze swoim dostawcą, aby uzyskać więcej szczegółów na temat obsługi wypłat ze stakingu, ponieważ każda usługa działa inaczej.

Ogólnie rzecz biorąc, użytkownicy powinni mieć swobodę odzyskiwania swojego bazowego stakowanego ETH lub zmiany dostawcy stakingu, z którego korzystają. Jeśli dana pula staje się zbyt duża, środki można wycofać, zrealizować i ponownie stakować u [mniejszego dostawcy](https://rated.network/). Albo, jeśli zgromadziłeś wystarczająco dużo ETH, możesz [stakować z domu](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Czy wypłaty nagród (częściowe wypłaty) odbywają się automatycznie?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Dla **tradycyjnych walidatorów (Typ 1)**, tak — o ile Twój walidator podał adres wypłaty. Należy go podać raz, aby początkowo umożliwić jakiekolwiek wypłaty, a następnie wypłaty nagród będą automatycznie inicjowane co kilka dni przy każdym zgarnianiu walidatorów.

Dla **walidatorów z kapitalizacją (Typ 2)**, nagrody kapitalizują się w efektywnym saldzie, zamiast być zgarnianymi. Automatyczne zgarnianie występuje tylko dla salda przekraczającego 2048 ETH. Aby wypłacić nagrody poniżej tego progu, musisz ręcznie zainicjować częściową wypłatę z warstwy wykonawczej.
</ExpandableCard>

<ExpandableCard
title="Czy pełne wypłaty odbywają się automatycznie?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Nie, jeśli Twój walidator jest nadal aktywny w sieci, pełna wypłata nie nastąpi automatycznie. Wymaga to ręcznego zainicjowania dobrowolnego wyjścia.

Gdy walidator zakończy proces wychodzenia i przy założeniu, że konto posiada poświadczenia wypłaty, pozostałe saldo zostanie _wtedy_ wypłacone podczas następnego <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>zgarniania walidatorów</a>.

</ExpandableCard>

<ExpandableCard title="Czy mogę wypłacić niestandardową kwotę?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Dla **tradycyjnych walidatorów (Typ 1)** wypłaty są wypychane automatycznie, transferując każde ETH, które nie przyczynia się aktywnie do stawki. Obejmuje to pełne salda dla kont, które zakończyły proces wychodzenia. Nie jest możliwe ręczne żądanie wypłaty określonych kwot ETH dla walidatorów Typu 1.

**Walidatorzy z kapitalizacją (Typ 2)** mogą inicjować częściowe wypłaty określonej kwoty z warstwy wykonawczej, o ile pozostałe saldo utrzymuje się na poziomie 32 ETH lub wyższym. Wymaga to transakcji i kosztuje gaz.
</ExpandableCard>

<ExpandableCard
title="Jestem operatorem walidatora. Gdzie mogę znaleźć więcej informacji na temat włączania wypłat?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Operatorom walidatorów zaleca się odwiedzenie strony [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals/), gdzie można znaleźć więcej szczegółów na temat tego, jak przygotować walidatora do wypłat, harmonogramu wydarzeń i więcej szczegółów na temat funkcjonowania wypłat.

Aby najpierw wypróbować swoją konfigurację w sieci testowej, odwiedź [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org), aby rozpocząć.

</ExpandableCard>

<ExpandableCard
title="Czy mogę ponownie aktywować mojego walidatora po wyjściu, deponując więcej ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nie. Gdy walidator wyjdzie, a jego pełne saldo zostanie wypłacone, wszelkie dodatkowe środki zdeponowane na tym walidatorze zostaną automatycznie przetransferowane na adres wypłaty podczas następnego zgarniania walidatorów. Aby ponownie stakować ETH, należy aktywować nowego walidatora.
</ExpandableCard>

<ExpandableCard
title="Jaka jest różnica między tradycyjnymi walidatorami a walidatorami z kapitalizacją?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Tradycyjni walidatorzy używają poświadczeń wypłaty **Typu 1** i mają efektywne saldo ograniczone do 32 ETH. Wszelkie nadwyżki są automatycznie zgarniane na adres wypłaty co kilka dni.

Walidatorzy z kapitalizacją używają poświadczeń wypłaty **Typu 2** i mogą mieć efektywne saldo do 2048 ETH. Nagrody kapitalizują się w ich efektywnym saldzie, zwiększając wagę walidatora w sieci i przyszłe nagrody. Automatyczne zgarnianie występuje tylko dla salda przekraczającego 2048 ETH. Aby wypłacić poniżej tego progu, należy zainicjować ręczną częściową wypłatę z warstwy wykonawczej.

Aby uzyskać więcej szczegółów, zobacz [szczegółowe omówienie MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Jak przekonwertować się na walidatora z kapitalizacją?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Możesz przekonwertować poświadczenia wypłaty z Typu 1 na Typ 2 za pomocą [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Ta operacja jest **nieodwracalna** — po konwersji nie możesz wrócić do poświadczeń Typu 1.

Po konwersji możesz również **skonsolidować** wielu walidatorów w jednego, łącząc ich salda w jednego walidatora z kapitalizacją. Pełny opis procesu konwersji, ryzyka i narzędzi do konsolidacji znajdziesz w [szczegółowym omówieniu MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Wypłaty na Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Akcje walidatora na Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Szczegółowe omówienie MaxEB: kapitalizacja i konsolidacja](/roadmap/pectra/maxeb/)
- [EIP-4895: Wypłaty push z łańcucha śledzącego jako operacje](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Wypłata stakowanego ETH (Testowanie) z Potuz i Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Wypłaty push z łańcucha śledzącego jako operacje z Alexem Stokesem](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Zrozumienie efektywnego salda walidatora](https://www.attestant.io/posts/understanding-validator-effective-balance/)