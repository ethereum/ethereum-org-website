---
title: Stakuj swoje ETH w domu
description: Przegląd informacji, jak zacząć stakować swoje ETH w domu
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Nosorożec Leslie na własnym chipie komputerowym.
sidebarDepth: 2
summaryPoints:
  - Otrzymuj maksymalne nagrody bezpośrednio z protokołu za utrzymywanie prawidłowego działania i dostępności swojego walidatora
  - Uruchom sprzęt domowy i osobiście zwiększ bezpieczeństwo oraz decentralizację sieci Ethereum
  - Wyeliminuj konieczność zaufania i nigdy nie oddawaj kontroli nad kluczami do swoich środków
---

## Czym jest stakowanie w domu? {#what-is-solo-staking}

Stakowanie w domu to proces [uruchomienia węzła Ethereum](/run-a-node/) podłączonego do internetu i zdeponowania 32 ETH w celu aktywacji [walidatora](#faq), co daje możliwość bezpośredniego uczestnictwa w konsensusie sieci.

**Stakowanie w domu zwiększa decentralizację sieci Ethereum**, czyniąc [Ethereum](/) bardziej odpornym na cenzurę i ataki. Inne metody stakowania mogą nie pomagać sieci w ten sam sposób. Stakowanie w domu to najlepsza opcja stakowania dla zabezpieczenia Ethereum.

Węzeł Ethereum składa się zarówno z klienta warstwy wykonawczej (EL), jak i klienta warstwy konsensusu (CL). Klienci ci to oprogramowanie, które współpracuje ze sobą, wraz z ważnym zestawem kluczy do podpisywania, w celu weryfikacji transakcji i bloków, poświadczania prawidłowego czoła łańcucha, agregowania poświadczeń i proponowania bloków.

Osoby stakujące w domu są odpowiedzialne za obsługę sprzętu potrzebnego do uruchomienia tych klientów. Zdecydowanie zaleca się użycie do tego dedykowanej maszyny, którą obsługuje się z domu – jest to niezwykle korzystne dla kondycji sieci.

Osoba stakująca w domu otrzymuje nagrody bezpośrednio z protokołu za utrzymywanie prawidłowego działania i dostępności swojego walidatora.

## Dlaczego warto stakować w domu? {#why-stake-solo}

Stakowanie w domu wiąże się z większą odpowiedzialnością, ale zapewnia maksymalną kontrolę nad środkami i konfiguracją stakowania.

<Grid>
  <Card title="Zarabiaj nowe ETH" emoji="💸" description="Zarabiaj nagrody denominowane w ETH bezpośrednio z protokołu, gdy Twój walidator jest online, bez pośredników pobierających prowizję." />
  <Card title="Pełna kontrola" emoji="🎛️" description="Zachowaj własne klucze. Wybierz kombinację klientów i sprzętu, która pozwoli Ci zminimalizować ryzyko i najlepiej przyczynić się do zdrowia i bezpieczeństwa sieci. Zewnętrzne usługi stakingu podejmują te decyzje za Ciebie i nie zawsze dokonują najbezpieczniejszych wyborów." />
  <Card title="Bezpieczeństwo sieci" emoji="🔐" description="Staking w domu to najbardziej efektywny sposób na staking. Uruchamiając walidator na własnym sprzęcie w domu, wzmacniasz solidność, decentralizację i bezpieczeństwo protokołu Ethereum." />
</Grid>

## Kwestie do rozważenia przed rozpoczęciem stakowania w domu {#considerations-before-staking-solo}

Choć bardzo byśmy chcieli, aby stakowanie w domu było dostępne i wolne od ryzyka dla każdego, rzeczywistość jest inna. Przed podjęciem decyzji o stakowaniu swojego ETH w domu należy wziąć pod uwagę kilka praktycznych i poważnych kwestii.

<ExpandableCard title="Lektura obowiązkowa" eventCategory="SoloStaking" eventName="clicked required reading">
Obsługując własny węzeł, powinieneś poświęcić trochę czasu na naukę korzystania z wybranego oprogramowania. Obejmuje to czytanie odpowiedniej dokumentacji i śledzenie kanałów komunikacyjnych zespołów programistycznych.

Im lepiej zrozumiesz oprogramowanie, które uruchamiasz, oraz to, jak działa dowód stawki (PoS), tym mniejsze będzie ryzyko dla Ciebie jako stakującego i tym łatwiej będzie Ci naprawić wszelkie problemy, które mogą pojawić się po drodze jako operatorowi węzła.
</ExpandableCard>

<ExpandableCard title="Biegłość w obsłudze komputera" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Konfiguracja węzła wymaga rozsądnego poziomu swobody w pracy z komputerami, chociaż nowe narzędzia z czasem to ułatwiają. Zrozumienie interfejsu wiersza poleceń jest pomocne, ale nie jest już bezwzględnie wymagane.

Wymaga to również bardzo podstawowej konfiguracji sprzętowej i pewnego zrozumienia minimalnych zalecanych specyfikacji.
</ExpandableCard>

<ExpandableCard title="Bezpieczne zarządzanie kluczami" eventCategory="SoloStaking" eventName="clicked secure key management">
Podobnie jak klucze prywatne zabezpieczają Twój adres Ethereum, będziesz musiał wygenerować klucze specjalnie dla swojego walidatora. Musisz wiedzieć, jak bezpiecznie przechowywać wszelkie frazy seed lub klucze prywatne.{' '}

[Bezpieczeństwo Ethereum i zapobieganie oszustwom](/security/)
</ExpandableCard>

<ExpandableCard title="Konserwacja" eventCategory="SoloStaking" eventName="clicked maintenance">
Sprzęt czasami zawodzi, połączenia sieciowe ulegają awariom, a oprogramowanie klienta od czasu do czasu wymaga aktualizacji. Konserwacja węzła jest nieunikniona i czasami będzie wymagać Twojej uwagi. Będziesz chciał mieć pewność, że jesteś na bieżąco z wszelkimi przewidywanymi aktualizacjami sieci lub innymi krytycznymi aktualizacjami klienta.
</ExpandableCard>

<ExpandableCard title="Niezawodny czas pracy" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Twoje nagrody są proporcjonalne do czasu, w którym Twój walidator jest online i prawidłowo poświadcza. Przestoje wiążą się z karami proporcjonalnymi do tego, ile innych walidatorów jest w tym samym czasie offline, ale <a href="#faq">nie skutkują cięciem</a>. Przepustowość również ma znaczenie, ponieważ nagrody są zmniejszane za poświadczenia, które nie zostaną odebrane na czas. Wymagania mogą się różnić, ale zalecane jest minimum 10 Mb/s pobierania i wysyłania.
</ExpandableCard>

<ExpandableCard title="Ryzyko cięcia" eventCategory="SoloStaking" eventName="clicked slashing risk">
W przeciwieństwie do kar za nieaktywność z powodu bycia offline, <em>cięcie</em> jest znacznie poważniejszą karą zarezerwowaną dla złośliwych naruszeń. Uruchamiając klienta mniejszościowego z kluczami załadowanymi tylko na jednej maszynie naraz, minimalizujesz ryzyko cięcia. Niemniej jednak wszyscy stakujący muszą być świadomi ryzyka związanego z cięciem.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Więcej o cięciu i cyklu życia walidatora</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Jak to działa {#how-it-works}

<StakingHowSoloWorks />

Gdy będziesz aktywny, będziesz zdobywać nagrody w ETH, które będą okresowo deponowane na Twój adres wypłaty.

Jeśli kiedykolwiek zechcesz, możesz dokonać wyjścia jako walidator, co eliminuje wymóg bycia online i zatrzymuje wszelkie dalsze nagrody. Twoje pozostałe saldo zostanie następnie wypłacone na adres wypłaty, który wskażesz podczas konfiguracji.

[Więcej o wypłatach ze stakowania](/staking/withdrawals/)

## Zacznij na Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad to aplikacja open source, która pomoże Ci zostać stakującym. Przeprowadzi Cię przez wybór klientów, wygenerowanie kluczy i zdeponowanie ETH w kontrakcie depozytu stakingowego. Dostępna jest lista kontrolna, aby upewnić się, że uwzględniłeś wszystko, co jest potrzebne do bezpiecznej konfiguracji walidatora.

<StakingLaunchpadWidget />

## Co wziąć pod uwagę przy narzędziach do konfiguracji węzła i klienta {#node-tool-considerations}

Istnieje rosnąca liczba narzędzi i usług, które pomogą Ci stakować ETH w domu, ale każde z nich wiąże się z innym ryzykiem i korzyściami.

Poniżej użyto wskaźników atrybutów, aby zasygnalizować istotne mocne lub słabe strony wymienionego narzędzia do stakowania. Użyj tej sekcji jako odniesienia do tego, jak definiujemy te atrybuty, podczas wyboru narzędzi, które pomogą Ci w Twojej przygodzie ze stakowaniem.

<StakingConsiderations page="solo" />

## Poznaj narzędzia do konfiguracji węzła i klienta {#node-and-client-tools}

Dostępnych jest wiele opcji, które pomogą Ci w konfiguracji. Użyj powyższych wskaźników, aby pomogły Ci poruszać się po poniższych narzędziach.

<ProductDisclaimer />

### Narzędzia węzła {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Należy pamiętać o znaczeniu wyboru [klienta mniejszościowego](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza ryzyko. Narzędzia, które pozwalają na konfigurację klienta mniejszościowego, są oznaczone jako <em style={{ textTransform: "uppercase" }}>„wieloklienckie” (multi-client).</em>

### Generatory kluczy {#key-generators}

Narzędzia te mogą być używane jako alternatywa dla [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), aby pomóc w generowaniu kluczy.

<StakingProductsCardGrid category="keyGen" />

Masz sugestię dotyczącą narzędzia do stakowania, które pominęliśmy? Sprawdź naszą [politykę dodawania produktów](/contributing/adding-staking-products/), aby sprawdzić, czy by pasowało, i prześlij je do weryfikacji.

## Poznaj przewodniki po stakowaniu w domu {#staking-guides}

<StakingGuides />

## Często zadawane pytania {#faq}

Oto kilka najczęstszych pytań dotyczących stakowania, o których warto wiedzieć.

<ExpandableCard title="Czym jest walidator?">

<em>Walidator</em> to wirtualny byt, który istnieje w Ethereum i uczestniczy w konsensusie protokołu Ethereum. Walidatory są reprezentowane przez saldo, klucz publiczny i inne właściwości. <em>Klient walidatora</em> to oprogramowanie, które działa w imieniu walidatora, przechowując i używając jego klucza prywatnego. Pojedynczy klient walidatora może przechowywać wiele par kluczy, kontrolując wiele walidatorów.

</ExpandableCard>

<ExpandableCard title="Czy mogę zdeponować więcej niż 32 ETH?">
Tak, nowoczesne konta walidatorów mogą przechowywać do 2048 ETH. Dodatkowe ETH powyżej 32 będzie się kumulować w sposób krokowy, rosnąc w przyrostach całkowitych w miarę wzrostu Twojego rzeczywistego salda. Jest to znane jako Twoje <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efektywne</a>.

Aby zwiększyć saldo efektywne konta, a tym samym zwiększyć nagrody, należy przekroczyć bufor 0,25 ETH powyżej dowolnego progu pełnego ETH. Na przykład konto z rzeczywistym saldem 32,9 i saldem efektywnym 32 musiałoby zarobić kolejne 0,35 ETH, aby jego rzeczywiste saldo przekroczyło 33,25 przed wyzwoleniem wzrostu salda efektywnego.

Ten bufor zapobiega również spadkowi salda efektywnego, dopóki nie spadnie ono o 0,25 ETH poniżej jego obecnego salda efektywnego.

Każda para kluczy powiązana z walidatorem wymaga co najmniej 32 ETH do aktywacji. Wszelkie saldo powyżej tej kwoty może zostać wypłacone na powiązany adres wypłaty w dowolnym momencie za pośrednictwem transakcji podpisanej przez ten adres. Wszelkie środki powyżej maksymalnego salda efektywnego będą automatycznie wypłacane okresowo.

Jeśli stakowanie w domu wydaje Ci się zbyt wymagające, rozważ skorzystanie z usług dostawcy [stakowania jako usługi (staking-as-a-service)](/staking/saas/), a jeśli dysponujesz mniej niż 32 ETH, sprawdź [pule stakingowe](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Czy zostanę ścięty, jeśli będę offline? (w skrócie: Nie.)">
Przejście w tryb offline, gdy sieć prawidłowo się finalizuje, NIE spowoduje cięcia. Niewielkie <em>kary za nieaktywność</em> są nakładane, jeśli Twój walidator nie jest dostępny do poświadczania w danej epoce (każda trwa 6,4 minuty), ale to zupełnie co innego niż <em>cięcie</em>. Kary te są nieco mniejsze niż nagroda, którą byś zarobił, gdyby walidator był dostępny do poświadczania, a straty można odrobić w mniej więcej takim samym czasie po powrocie do trybu online.

Należy pamiętać, że kary za nieaktywność są proporcjonalne do tego, ile walidatorów jest w tym samym czasie offline. W przypadkach, gdy duża część sieci jest jednocześnie offline, kary dla każdego z tych walidatorów będą większe niż w przypadku niedostępności pojedynczego walidatora.

W skrajnych przypadkach, jeśli sieć przestanie się finalizować w wyniku tego, że ponad jedna trzecia walidatorów jest offline, użytkownicy ci doświadczą zjawiska znanego jako <em>kwadratowy wyciek za nieaktywność</em>, co oznacza wykładniczy drenaż ETH z kont walidatorów offline. Umożliwia to sieci ostateczne samouzdrawianie poprzez spalenie ETH nieaktywnych walidatorów, dopóki ich saldo nie osiągnie 16 ETH, w którym to momencie zostaną oni automatycznie wyrzuceni z puli walidatorów. Pozostałe walidatory online ostatecznie znów będą stanowić ponad 2/3 sieci, spełniając wymóg większości kwalifikowanej potrzebnej do ponownego sfinalizowania łańcucha.
</ExpandableCard>

<ExpandableCard title="Jak upewnić się, że nie zostanę ścięty?">
Krótko mówiąc, nigdy nie można tego w pełni zagwarantować, ale jeśli działasz w dobrej wierze, uruchamiasz klienta mniejszościowego i przechowujesz klucze do podpisywania tylko na jednej maszynie naraz, ryzyko cięcia jest bliskie zeru.

Istnieje tylko kilka konkretnych sposobów, które mogą skutkować cięciem walidatora i wyrzuceniem go z sieci. W chwili pisania tego tekstu cięcia, które miały miejsce, były wyłącznie wynikiem nadmiarowych konfiguracji sprzętowych, w których klucze do podpisywania są przechowywane na dwóch oddzielnych maszynach jednocześnie. Może to nieumyślnie doprowadzić do <em>podwójnego głosu</em> z Twoich kluczy, co jest naruszeniem podlegającym cięciu.

Uruchomienie klienta większości kwalifikowanej (dowolnego klienta używanego przez ponad 2/3 sieci) niesie również ryzyko potencjalnego cięcia w przypadku, gdy ten klient ma błąd, który skutkuje rozwidleniem łańcucha. Może to doprowadzić do sfinalizowania wadliwego rozwidlenia. Powrót do zamierzonego łańcucha wymagałby przesłania <em>głosu otaczającego (surround vote)</em> poprzez próbę cofnięcia sfinalizowanego bloku. Jest to również naruszenie podlegające cięciu i można go uniknąć, po prostu uruchamiając zamiast tego klienta mniejszościowego.

Równoważne błędy w <em>kliencie mniejszościowym nigdy by się nie sfinalizowały</em>, a zatem nigdy nie doprowadziłyby do głosu otaczającego i po prostu skutkowałyby karami za nieaktywność, <em>a nie cięciem</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Dowiedz się więcej o znaczeniu uruchamiania klienta mniejszościowego.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Dowiedz się więcej o zapobieganiu cięciom</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Który klient jest najlepszy?">
Poszczególni klienci mogą się nieznacznie różnić pod względem wydajności i interfejsu użytkownika, ponieważ każdy z nich jest rozwijany przez inne zespoły przy użyciu różnych języków programowania. Biorąc to pod uwagę, żaden z nich nie jest „najlepszy”. Wszyscy klienci produkcyjni to doskonałe oprogramowanie, które wykonuje te same podstawowe funkcje w celu synchronizacji i interakcji z blockchainem.

Ponieważ wszyscy klienci produkcyjni zapewniają tę samą podstawową funkcjonalność, w rzeczywistości bardzo ważne jest, aby wybrać <strong>klienta mniejszościowego</strong>, co oznacza każdego klienta, który NIE jest obecnie używany przez większość walidatorów w sieci. Może to brzmieć sprzecznie z intuicją, ale uruchomienie klienta większościowego lub klienta większości kwalifikowanej naraża Cię na zwiększone ryzyko cięcia w przypadku błędu w tym kliencie. Uruchomienie klienta mniejszościowego drastycznie ogranicza to ryzyko.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Dowiedz się więcej, dlaczego różnorodność klientów jest kluczowa</a>
</ExpandableCard>

<ExpandableCard title="Czy mogę po prostu użyć VPS (wirtualnego serwera prywatnego)?">
Chociaż wirtualny serwer prywatny (VPS) może być używany jako zamiennik sprzętu domowego, fizyczny dostęp i lokalizacja klienta walidatora <em>mają znaczenie</em>. Scentralizowane rozwiązania chmurowe, takie jak Amazon Web Services lub Digital Ocean, zapewniają wygodę polegającą na braku konieczności zakupu i obsługi sprzętu, kosztem centralizacji sieci.

Im więcej klientów walidatora działa na jednym scentralizowanym rozwiązaniu pamięci masowej w chmurze, tym bardziej niebezpieczne staje się to dla tych użytkowników. Każde zdarzenie, które spowoduje przejście tych dostawców w tryb offline, czy to w wyniku ataku, wymogów regulacyjnych, czy po prostu przerw w dostawie prądu/internetu, spowoduje, że każdy klient walidatora, który polega na tym serwerze, przejdzie w tryb offline w tym samym czasie.

Kary za bycie offline są proporcjonalne do tego, ilu innych użytkowników jest w tym samym czasie offline. Korzystanie z VPS znacznie zwiększa ryzyko, że kary za bycie offline będą surowsze, i zwiększa ryzyko kwadratowego wycieku lub cięcia w przypadku, gdy awaria będzie wystarczająco duża. Aby zminimalizować własne ryzyko oraz ryzyko dla sieci, zdecydowanie zachęca się użytkowników do zakupu i obsługi własnego sprzętu.
</ExpandableCard>

<ExpandableCard title="Jak odblokować moje nagrody lub odzyskać moje ETH?">

Wszelkiego rodzaju wypłaty z Beacon Chain wymagają ustawienia danych uwierzytelniających wypłaty.

Nowi stakujący ustawiają to w momencie generowania kluczy i deponowania. Istniejący stakujący, którzy jeszcze tego nie ustawili, mogą zaktualizować swoje klucze, aby obsługiwały tę funkcjonalność.

Po ustawieniu danych uwierzytelniających wypłaty, wypłaty nagród (zgromadzone ETH powyżej początkowych 32) będą okresowo i automatycznie dystrybuowane na adres wypłaty.

Aby odblokować i odzyskać całe swoje saldo, musisz również ukończyć proces wyjścia swojego walidatora.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakowania</ButtonLink>
</ButtonLink>

## Dalsza lektura {#further-reading}

- [Katalog stakowania Ethereum](https://www.staking.directory/) – _Eridian i Spacesider_
- [Problem różnorodności klientów Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022_
- [Wspieranie różnorodności klientów](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022_
- [Różnorodność klientów w warstwie konsensusu Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Jak kupować sprzęt dla walidatora Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Wskazówki dotyczące zapobiegania cięciom w Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />