---
title: Stakuj swoje ETH w domu
description: Przegląd informacji o tym, jak zacząć stakować swoje ETH w domu
lang: pl
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Otrzymuj maksymalne nagrody bezpośrednio z protokołu za utrzymywanie prawidłowego działania i dostępności walidatora w sieci
  - Uruchom sprzęt domowy i osobiście zwiększ bezpieczeństwo oraz decentralizację sieci Ethereum
  - Wyeliminuj konieczność zaufania i nigdy nie oddawaj kontroli nad kluczami do swoich środków
---

## Czym jest staking w domu? {#what-is-solo-staking}

Staking w domu to proces [uruchomienia węzła Ethereum](/run-a-node/) podłączonego do internetu i zdeponowania co najmniej 32 ETH w celu aktywacji [walidatora](#faq), co daje możliwość bezpośredniego uczestnictwa w konsensusie sieci.

Staking w domu to najbardziej bezpośredni sposób na staking. Żadne inteligentne kontrakty, operatorzy ani powiernicy nie stoją między Tobą a protokołem. Posiadasz własne klucze, aktywnie uczestniczysz w walidacji sieci [Ethereum](/) i otrzymujesz nagrody sieciowe bezpośrednio. Każda inna metoda stakingu dodaje warstwy technologii, oprogramowania pośredniczącego lub usług na wierzchu tej podstawowej aktywności sieciowej.

**Staking w domu zwiększa decentralizację sieci Ethereum**, czyniąc Ethereum bardziej odpornym na cenzurę i ataki. Inne metody stakingu mogą nie pomagać sieci w ten sam sposób. Staking w domu to najlepsza opcja stakingu dla zabezpieczenia Ethereum.

Węzeł Ethereum składa się zarówno z klienta warstwy wykonawczej (EL), jak i klienta warstwy konsensusu (CL). Klienci ci to oprogramowanie, które współpracuje ze sobą, wraz z ważnym zestawem kluczy do podpisywania, w celu weryfikacji transakcji i bloków, poświadczania prawidłowego czoła łańcucha, agregowania poświadczeń i proponowania bloków.

Osoby stakujące w domu są odpowiedzialne za obsługę sprzętu potrzebnego do uruchomienia tych klientów. Zdecydowanie zaleca się użycie do tego dedykowanej maszyny, którą obsługujesz z domu – jest to niezwykle korzystne dla kondycji sieci.

Osoba stakująca w domu otrzymuje nagrody bezpośrednio z protokołu za utrzymywanie prawidłowego działania i dostępności swojego walidatora w sieci.

## Dlaczego warto stakować w domu? {#why-stake-solo}

Staking w domu wiąże się z większą odpowiedzialnością, ale zapewnia maksymalną kontrolę nad środkami i konfiguracją stakingu.

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="Osoby stakujące w domu otrzymują 100% nagród z protokołu, wypłacanych bezpośrednio przez protokół, gdy walidator jest online." />
  <Card title="Samostanowienie" icon={<KeyRound />} description="Zachowaj własne klucze i pełną kontrolę nad swoimi środkami przez cały czas. Wybierz kombinację klientów i sprzętu, która pozwoli Ci zminimalizować ryzyko. Żadna strona trzecia nie może podejmować tych decyzji za Ciebie ani ograniczać Twoich wypłat." />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="Osoby stakujące w domu, uruchamiające klientów mniejszościowych na sprzęcie rozmieszczonym w wielu lokalizacjach, wzmacniają decentralizację i bezpieczeństwo sieci." />
</Grid>

## Kwestie do rozważenia przed rozpoczęciem stakingu w domu {#considerations-before-staking-solo}

Choć bardzo byśmy chcieli, aby staking w domu był dostępny i wolny od ryzyka dla każdego, rzeczywistość jest inna. Istnieją pewne praktyczne i poważne kwestie, o których należy pamiętać przed podjęciem decyzji o stakowaniu swojego ETH w domu.

<ExpandableCard title="Lektura obowiązkowa" eventCategory="SoloStaking" eventName="clicked required reading">
Obsługując własny węzeł, powinieneś poświęcić trochę czasu na naukę korzystania z wybranego oprogramowania. Obejmuje to czytanie odpowiedniej dokumentacji i śledzenie kanałów komunikacyjnych tych zespołów programistycznych.

Im lepiej zrozumiesz oprogramowanie, które uruchamiasz, i to, jak działa dowód stawki (PoS), tym mniejsze będzie ryzyko dla Ciebie jako stakującego i tym łatwiej będzie naprawić wszelkie problemy, które mogą pojawić się po drodze jako operator węzła.
</ExpandableCard>

<ExpandableCard title="Biegłość w obsłudze komputera" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Konfiguracja węzła wymaga rozsądnego poziomu komfortu podczas pracy z komputerami, chociaż nowe narzędzia z czasem to ułatwiają. Zrozumienie interfejsu wiersza poleceń jest pomocne, ale nie jest już bezwzględnie wymagane.

Wymaga to również bardzo podstawowej konfiguracji sprzętowej i pewnego zrozumienia minimalnych zalecanych specyfikacji.
</ExpandableCard>

<ExpandableCard title="Wymagania sprzętowe" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Obecne wytyczne społeczności dotyczące sprzętu i przepustowości dla walidatorów są utrzymywane w [rekomendacjach dotyczących sprzętu i przepustowości (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Jako ogólną wskazówkę, zaplanuj dysk SSD NVMe o pojemności 4 TB, 64 GB pamięci RAM (mniej może działać, ale jest to zalecany zapas), solidny, nowoczesny wielordzeniowy procesor oraz połączenie internetowe o prędkości około 50 Mb/s pobierania / 25 Mb/s wysyłania.

Odkąd aktualizacja Fusaka wprowadziła PeerDAS, węzeł stakingowy musi przechowywać i pobierać tylko ułamek danych blob sieci, co znacznie zmniejsza wymagania dotyczące dysku i przepustowości dla osób stakujących w domu.
</ExpandableCard>

<ExpandableCard title="Bezpieczne zarządzanie kluczami" eventCategory="SoloStaking" eventName="clicked secure key management">
Podobnie jak klucze prywatne zabezpieczają Twój adres Ethereum, będziesz musiał wygenerować klucze specjalnie dla swojego walidatora. Musisz zrozumieć, jak bezpiecznie przechowywać wszelkie frazy seed lub klucze prywatne.{' '}

[Bezpieczeństwo Ethereum i zapobieganie oszustwom](/security/)
</ExpandableCard>

<ExpandableCard title="Konserwacja" eventCategory="SoloStaking" eventName="clicked maintenance">
Sprzęt czasami ulega awarii, połączenia sieciowe zgłaszają błędy, a oprogramowanie klienta od czasu do czasu wymaga aktualizacji. Konserwacja węzła jest nieunikniona i czasami będzie wymagać Twojej uwagi. Będziesz chciał mieć pewność, że jesteś na bieżąco z wszelkimi przewidywanymi aktualizacjami sieci lub innymi krytycznymi aktualizacjami klientów.
</ExpandableCard>

<ExpandableCard title="Niezawodny czas pracy" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Twoje nagrody są proporcjonalne do czasu, w którym Twój walidator jest online i prawidłowo poświadcza. Przestoje wiążą się z karami proporcjonalnymi do tego, ile innych walidatorów jest w tym samym czasie offline, ale [nie skutkują cięciem (slashingiem)](#faq). Przepustowość również ma znaczenie, ponieważ nagrody są zmniejszane za poświadczenia, które nie zostaną odebrane na czas. Wymagania będą się różnić, ale obecne [rekomendacje dotyczące sprzętu i przepustowości (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) sugerują około 50 Mb/s pobierania i 25 Mb/s wysyłania.
</ExpandableCard>

<ExpandableCard title="Ryzyko cięcia" eventCategory="SoloStaking" eventName="clicked slashing risk">
W przeciwieństwie do kar za nieaktywność z powodu bycia offline, <em>cięcie (slashing)</em> to znacznie poważniejsza kara zarezerwowana dla złośliwych przewinień. Uruchamiając klienta mniejszościowego z kluczami załadowanymi tylko na jednej maszynie w danym momencie, ryzyko cięcia jest zminimalizowane. Niemniej jednak, wszyscy stakujący muszą być świadomi ryzyka cięcia.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Więcej o cięciu i cyklu życia walidatora</a>
</ExpandableCard>

## Porównanie opcji stakingu {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Jak to działa {#how-it-works}

<StakingHowSoloWorks />

Gdy Twój węzeł zostanie zsynchronizowany, a klucze wygenerowane, deponujesz swoją stawkę, aby aktywować walidator. Pojedynczy walidator wymaga minimum 32 ETH i może pomieścić do 2048 ETH. Sieć rozpoznaje depozyty w około 13 minut, ale nowe walidatory przechodzą przez kolejkę aktywacji, zanim zaczną poświadczać; jej długość różni się w zależności od popytu.

Będąc aktywnym, będziesz zdobywać nagrody w ETH. Dzięki danym uwierzytelniającym wypłaty z kapitalizacją (0x02), nagrody są automatycznie dodawane do Twojej stawki; w przypadku danych uwierzytelniających dla regularnych wypłat (0x01), nagrody powyżej początkowych 32 ETH są okresowo przelewane na Twój adres wypłaty.

Jeśli kiedykolwiek zechcesz, możesz dokonać wyjścia jako walidator, co eliminuje wymóg bycia online i zatrzymuje wszelkie dalsze nagrody. Twoje pozostałe saldo zostanie następnie wypłacone na adres wypłaty, który wyznaczysz podczas konfiguracji. Wyjścia mogą być inicjowane za pomocą kluczy do podpisywania walidatora lub wyzwalane bezpośrednio z adresu wypłaty za pomocą transakcji w warstwie wykonawczej, więc ostateczna kontrola nad Twoimi środkami zawsze spoczywa na Twoim adresie wypłaty.

### Kapitalizacja i maksimum 2048 ETH {#compounding}

Walidatory mają jeden z dwóch typów danych uwierzytelniających wypłaty:

- **Regularne wypłaty (0x01)**: saldo efektywne walidatora jest ograniczone do 32 ETH, a wszelkie saldo powyżej tej kwoty jest automatycznie przelewane na Twój adres wypłaty co kilka dni.
- **Kapitalizacja (0x02)**: saldo efektywne walidatora może wzrosnąć do 2048 ETH. Nagrody kapitalizują się automatycznie, a Ty zarabiasz nagrody od każdego pełnego ETH powyżej minimum 32 ETH, więc możesz stakować elastyczne kwoty, takie jak 40 ETH, a nie tylko wielokrotności 32. Tylko saldo powyżej 2048 ETH jest przelewane automatycznie; wypłata czegokolwiek innego oznacza ręczne wyzwolenie częściowej wypłaty z Twojego adresu wypłaty, co kosztuje gaz.

Jeśli prowadzisz wiele walidatorów, możesz skonsolidować je w jeden walidator z kapitalizacją bez wyjścia i ponownego wchodzenia do sieci, zmniejszając koszty konserwacji. Konsolidacja jest żądana z Twojego adresu wypłaty i podlega kolejkom przetwarzania. Przełączenie walidatora z danych uwierzytelniających 0x01 na 0x02 wykorzystuje ten sam mechanizm i **nie może zostać cofnięte** bez całkowitego wyjścia i ponownego zdeponowania.

[Więcej o wypłatach ze stakingu](/staking/withdrawals/)

## Zacznij na Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad to aplikacja open source, która pomoże Ci zostać stakującym. Przeprowadzi Cię przez wybór klientów, wygeneruje Twoje klucze i zdeponuje Twoje ETH w kontrakcie depozytu stakingowego. Dostępna jest lista kontrolna, aby upewnić się, że uwzględniłeś wszystko, aby bezpiecznie skonfigurować swój walidator.

<StakingLaunchpadWidget />

## Co wziąć pod uwagę przy narzędziach do konfiguracji węzłów i klientów {#node-tool-considerations}

Istnieje rosnąca liczba narzędzi i usług, które pomogą Ci stakować Twoje ETH w domu, ale każde z nich wiąże się z innym ryzykiem i korzyściami.

Poniżej użyto wskaźników atrybutów, aby zasygnalizować godne uwagi mocne lub słabe strony wymienionego narzędzia do stakingu. Użyj tej sekcji jako odniesienia do tego, jak definiujemy te atrybuty, podczas wybierania narzędzi, które pomogą Ci w Twojej podróży ze stakingiem.

<StakingConsiderations page="solo" />

## Poznaj narzędzia do konfiguracji węzłów i klientów {#node-and-client-tools}

Dostępnych jest wiele opcji, które pomogą Ci w konfiguracji. Użyj powyższych wskaźników, aby pomogły Ci poruszać się po poniższych narzędziach.

<ProductDisclaimer />

### Narzędzia węzła {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Należy pamiętać o znaczeniu wyboru [klienta mniejszościowego](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza Twoje ryzyko. Narzędzia, które pozwalają na konfigurację klienta mniejszościowego, są oznaczone jako <em style={{ textTransform: "uppercase" }}>"wieloklienckie" (multi-client).</em>

### Generatory kluczy {#key-generators}

Narzędzia te mogą być używane jako alternatywa dla [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), aby pomóc w generowaniu kluczy.

<StakingProductsCardGrid category="keyGen" />

Masz sugestię dotyczącą narzędzia do stakingu, które pominęliśmy? Sprawdź naszą [politykę dodawania produktów](/contributing/adding-staking-products/), aby sprawdzić, czy by pasowało, i prześlij je do sprawdzenia.

## Poznaj przewodniki po stakingu w domu {#staking-guides}

<StakingGuides />

## Staking zespołowy: staking w domu z tolerancją na błędy {#squad-staking}

**Technologia rozproszonych walidatorów (DVT)** pozwala pojedynczemu walidatorowi działać w klastrze maszyn zamiast tylko na jednej. Klucz walidatora jest dzielony na udziały za pomocą rozproszonego generowania kluczy, a próg klastra (na przykład dowolne 3 z 4 węzłów) musi podpisywać wspólnie; pełny klucz nigdy nie istnieje na żadnej pojedynczej maszynie. Jeśli jedna maszyna ulegnie awarii, przejdzie w tryb offline lub zostanie źle skonfigurowana, reszta klastra utrzymuje poświadczanie walidatora.

Dla osób stakujących w domu umożliwia to "staking zespołowy" (squad staking): łączenie sił z przyjaciółmi lub innymi członkami społeczności w celu wspólnego uruchamiania walidatorów, usuwając pojedyncze punkty awarii konfiguracji solo i zmniejszając ryzyko cięcia z powodu pojedynczej, źle działającej maszyny. Zarówno Obol, jak i SSV Network zapewniają produkcyjne implementacje DVT, używane obecnie w stakingu w domu, stakingu jako usłudze i pulach stakingowych.

[Więcej o technologii rozproszonych walidatorów](/staking/dvt/)

## Uruchom walidatory dla protokołu stakingowego {#run-validators-for-a-staking-protocol}

Jeśli masz sprzęt i umiejętności do uruchomienia węzła, ale mniej niż 32 ETH, niektóre protokoły stakingowe połączą Twój walidator z ETH od swoich stakujących grupowo. Wpłacasz mniejszą kaucję jako zabezpieczenie i uruchamiasz walidator na własnej maszynie; protokół dostarcza resztę stawki, a Ty zarabiasz część nagród.

Jest to podejście hybrydowe: zachowujesz obowiązki (i satysfakcję) z obsługi własnego sprzętu, ale Twój walidator działa zgodnie z inteligentnymi kontraktami, zarządzaniem i zasadami wydajności protokołu, co stanowi inny profil zaufania niż bezpośrednie stakowanie własnego ETH.

Dowiedz się więcej o tym, jak działają te protokoły, w tym o ich założeniach dotyczących zaufania i mechanice tokenów, na [stronie stakingu grupowego](/staking/pools/).

## Więcej sposobów na wykorzystanie Twojego węzła {#more-ways-to-use-your-node}

Wcale nie musisz stakować, aby wykorzystać umiejętności obsługi węzła. Każdy może [uruchomić węzeł Ethereum](/run-a-node/) bez deponowania jakiegokolwiek ETH. Otrzymujesz samodzielnie zweryfikowany widok łańcucha, własny prywatny punkt końcowy do wysyłania transakcji i interakcji z aplikacjami, a także przyczyniasz się do kondycji i odporności sieci. Uruchomienie węzła to również dobry sposób na zdobycie doświadczenia przed aktywacją walidatora, bez ryzykowania ETH.

<StakingCommunityCallout className="my-16" />

## Często zadawane pytania {#faq}

Oto kilka najczęstszych pytań dotyczących stakingu, o których warto wiedzieć.

<ExpandableCard title="Czym jest walidator?">

<em>Walidator</em> to wirtualny byt, który istnieje w Ethereum i uczestniczy w konsensusie protokołu Ethereum. Walidatory są reprezentowane przez saldo, klucz publiczny i inne właściwości. <em>Klient walidatora</em> to oprogramowanie, które działa w imieniu walidatora, przechowując i używając jego klucza prywatnego. Pojedynczy klient walidatora może przechowywać wiele par kluczy, kontrolując wiele walidatorów.

</ExpandableCard>

<ExpandableCard title="Czy mogę zdeponować więcej niż 32 ETH?">
Tak. Walidator z danymi uwierzytelniającymi wypłaty z _kapitalizacją_ (0x02) może utrzymywać saldo efektywne do 2048 ETH, podczas gdy minimum do aktywacji pozostaje na poziomie 32 ETH. Nagrody na walidatorze z kapitalizacją są automatycznie dodawane do jego stawki, a on sam zarabia nagrody od każdego pełnego ETH powyżej minimum 32 ETH, więc możesz stakować kwoty, które nie są wielokrotnościami 32. Zobacz [Kapitalizacja i maksimum 2048 ETH](#compounding).

Walidatory z danymi uwierzytelniającymi dla _regularnych wypłat_ (0x01) pozostają ograniczone do salda efektywnego w wysokości 32 ETH, a wszelkie saldo powyżej tej kwoty jest automatycznie przelewane na adres wypłaty co kilka dni.

W przypadku walidatora z kapitalizacją tylko saldo powyżej maksimum 2048 ETH jest przelewane automatycznie. Aby wypłacić cokolwiek poniżej tej kwoty, wyzwalasz częściową wypłatę ze swojego adresu wypłaty (transakcja, która kosztuje gaz), co może uszczuplić dowolne saldo powyżej minimum 32 ETH. Jeśli prowadzisz wiele walidatorów, możesz również skonsolidować je w jeden walidator z kapitalizacją bez wyjścia z sieci.

[Więcej o wypłatach ze stakingu](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Czy zostanę ukarany cięciem, jeśli będę offline? (w skrócie: Nie.)">
Przejście w tryb offline, gdy sieć prawidłowo się finalizuje, NIE spowoduje cięcia (slashingu). Niewielkie <em>kary za nieaktywność</em> są nakładane, jeśli Twój walidator nie jest dostępny do poświadczania w danej epoce (każda trwa 6,4 minuty), ale to zupełnie co innego niż <em>cięcie</em>. Kary te są nieco mniejsze niż nagroda, którą byś zarobił, gdyby walidator był dostępny do poświadczania, a straty można odrobić w mniej więcej takim samym czasie po powrocie do trybu online.

Należy pamiętać, że kary za nieaktywność są proporcjonalne do tego, ile walidatorów jest w tym samym czasie offline. W przypadkach, gdy duża część sieci jest jednocześnie offline, kary dla każdego z tych walidatorów będą większe niż w przypadku niedostępności pojedynczego walidatora.

W skrajnych przypadkach, jeśli sieć przestanie się finalizować w wyniku tego, że ponad jedna trzecia walidatorów jest offline, użytkownicy ci doświadczą zjawiska znanego jako <em>kwadratowy wyciek za nieaktywność</em>, co oznacza wykładniczy drenaż ETH z kont walidatorów offline. Umożliwia to sieci ostateczne samoleczenie poprzez spalenie ETH nieaktywnych walidatorów, dopóki ich saldo nie osiągnie 16 ETH, w którym to momencie zostaną oni automatycznie wyrzuceni z puli walidatorów. Pozostałe walidatory online ostatecznie znów będą stanowić ponad 2/3 sieci, spełniając wymóg większości kwalifikowanej potrzebnej do ponownego sfinalizowania łańcucha.
</ExpandableCard>

<ExpandableCard title="Jak upewnić się, że nie zostanę ukarany cięciem?">
Krótko mówiąc, nigdy nie można tego w pełni zagwarantować, ale jeśli działasz w dobrej wierze, uruchamiasz klienta mniejszościowego i przechowujesz klucze do podpisywania tylko na jednej maszynie w danym momencie, ryzyko cięcia jest bliskie zeru.

Istnieje tylko kilka konkretnych sposobów, które mogą skutkować cięciem walidatora i wyrzuceniem go z sieci. W chwili pisania tego tekstu cięcia, które miały miejsce, były wyłącznie wynikiem nadmiarowych konfiguracji sprzętowych, w których klucze do podpisywania były przechowywane na dwóch oddzielnych maszynach jednocześnie. Może to nieumyślnie doprowadzić do <em>podwójnego głosu</em> z Twoich kluczy, co jest przewinieniem podlegającym cięciu.

Uruchomienie klienta większości kwalifikowanej (dowolnego klienta używanego przez ponad 2/3 sieci) wiąże się również z ryzykiem potencjalnego cięcia w przypadku, gdy ten klient ma błąd, który skutkuje rozwidleniem łańcucha. Może to doprowadzić do sfinalizowania wadliwego rozwidlenia. Powrót do zamierzonego łańcucha wymagałby przesłania <em>głosu otaczającego (surround vote)</em> poprzez próbę cofnięcia sfinalizowanego bloku. Jest to również przewinienie podlegające cięciu i można go uniknąć, po prostu uruchamiając zamiast tego klienta mniejszościowego.

Równoważne błędy w <em>kliencie mniejszościowym nigdy by się nie sfinalizowały</em>, a zatem nigdy nie doprowadziłyby do głosu otaczającego i po prostu skutkowałyby karami za nieaktywność, <em>a nie cięciem</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Dowiedz się więcej o znaczeniu uruchamiania klienta mniejszościowego.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Dowiedz się więcej o nagrodach, karach i cięciu</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Który klient jest najlepszy?">
Poszczególni klienci mogą się nieznacznie różnić pod względem wydajności i interfejsu użytkownika, ponieważ każdy z nich jest rozwijany przez inne zespoły przy użyciu różnych języków programowania. Biorąc to pod uwagę, żaden z nich nie jest "najlepszy". Wszyscy klienci produkcyjni to doskonałe oprogramowanie, które wykonuje te same podstawowe funkcje w celu synchronizacji i interakcji z blockchainem.

Ponieważ wszyscy klienci produkcyjni zapewniają tę samą podstawową funkcjonalność, w rzeczywistości bardzo ważne jest, abyś wybrał <strong>klienta mniejszościowego</strong>, co oznacza każdego klienta, który NIE jest obecnie używany przez większość walidatorów w sieci. Może to brzmieć sprzecznie z intuicją, ale uruchomienie klienta większościowego lub większości kwalifikowanej naraża Cię na zwiększone ryzyko cięcia w przypadku błędu w tym kliencie. Uruchomienie klienta mniejszościowego drastycznie ogranicza to ryzyko.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Dowiedz się więcej, dlaczego różnorodność klientów ma kluczowe znaczenie</a>
</ExpandableCard>

<ExpandableCard title="Czy mogę po prostu użyć VPS (wirtualnego serwera prywatnego)?">
Chociaż wirtualny serwer prywatny (VPS) może być używany jako zamiennik sprzętu domowego, fizyczny dostęp i lokalizacja klienta walidatora <em>mają znaczenie</em>. Scentralizowane rozwiązania chmurowe, takie jak Amazon Web Services lub Digital Ocean, zapewniają wygodę polegającą na braku konieczności pozyskiwania i obsługi sprzętu, kosztem centralizacji sieci.

Im więcej klientów walidatora działa na jednym scentralizowanym rozwiązaniu pamięci masowej w chmurze, tym bardziej staje się to niebezpieczne dla tych użytkowników. Każde zdarzenie, które spowoduje przejście tych dostawców w tryb offline, czy to w wyniku ataku, żądań regulacyjnych, czy po prostu przerw w dostawie prądu/internetu, spowoduje, że każdy klient walidatora, który polega na tym serwerze, przejdzie w tryb offline w tym samym czasie.

Kary za bycie offline są proporcjonalne do tego, ilu innych użytkowników jest w tym samym czasie offline. Korzystanie z VPS znacznie zwiększa ryzyko, że kary za bycie offline będą surowsze, i zwiększa ryzyko kwadratowego wycieku lub cięcia w przypadku, gdy awaria będzie wystarczająco duża. Aby zminimalizować własne ryzyko oraz ryzyko dla sieci, zdecydowanie zachęca się użytkowników do pozyskiwania i obsługi własnego sprzętu.
</ExpandableCard>

<ExpandableCard title="Jak odblokować moje nagrody lub odzyskać moje ETH?">

Każda wypłata wymaga, aby Twój walidator miał ustawiony adres wypłaty. Nowi stakujący ustawiają to w momencie generowania kluczy i deponowania. Stakujący z wczesnych dni sieci, którzy jeszcze nie ustawili adresu wypłaty, będą musieli zaktualizować swoje dane uwierzytelniające wypłaty przed dokonaniem wypłaty.

W przypadku walidatorów z danymi uwierzytelniającymi dla regularnych wypłat (0x01), wypłaty nagród (zgromadzone ETH powyżej początkowych 32) są okresowo automatycznie dystrybuowane na adres wypłaty. W przypadku walidatorów z kapitalizacją (0x02) nagrody pozostają stakowane i kapitalizują się automatycznie. Możesz wypłacić dowolne saldo powyżej 32 ETH, wyzwalając częściową wypłatę ze swojego adresu wypłaty.

Aby odblokować i odzyskać całe swoje saldo, musisz dokonać wyjścia ze swojego walidatora. Możesz to zrobić za pomocą kluczy do podpisywania walidatora lub wyzwolić to bezpośrednio z adresu wypłaty za pomocą transakcji w warstwie wykonawczej, co oznacza, że Twoje środki pozostają możliwe do odzyskania, nawet jeśli zgubisz klucze do podpisywania.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ButtonLink>

## Dalsza lektura {#further-reading}

- [Statystyki różnorodności klientów i przewodniki po migracji](https://clientdiversity.org/)
- [Pomoc w różnorodności klientów](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Różnorodność klientów w warstwie konsensusu Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Jak kupować sprzęt dla walidatora Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Rekomendacje dotyczące sprzętu i przepustowości](https://eips.ethereum.org/EIPS/eip-7870)
- [Aktualizacja Pectra: maksymalne saldo efektywne i więcej](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />