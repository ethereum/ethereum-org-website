---
title: Stakuj ETH w domu
description: Przegląd tego, jak rozpocząć stakowanie ETH w domu
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Nosorożec Leslie na własnym chipie komputerowym.
sidebarDepth: 2
summaryPoints:
  - Otrzymuj maksymalne nagrody bezpośrednio z protokołu za utrzymywanie prawidłowego działania walidatora w trybie online
  - Korzystaj z własnego sprzętu i osobiście zwiększaj bezpieczeństwo i decentralizację sieci Ethereum
  - Wyeliminuj potrzebę zaufania i nigdy nie rezygnuj z kontroli nad kluczami do swoich funduszy
---

## Czym jest stakowanie w domu? {#what-is-solo-staking}

Stakowanie w domu polega na [uruchomieniu węzła Ethereum](/run-a-node/) podłączonego do internetu i zdeponowaniu 32 ETH w celu aktywacji [walidatora](#faq), co daje możliwość bezpośredniego uczestnictwa w konsensusie sieci.

**Stakowanie w domu zwiększa decentralizację sieci Ethereum**, czyniąc Ethereum bardziej odpornym na cenzurę i ataki. Inne metody stakowania mogą nie pomagać sieci w ten sam sposób. Stakowanie w domu jest najlepszą opcją stakowania w celu zabezpieczenia Ethereum.

Węzeł Ethereum składa się zarówno z klienta warstwy wykonawczej (EL), jak i klienta warstwy konsensusu (CL). Ci klienci to oprogramowanie, które współpracuje, wraz z prawidłowym zestawem kluczy podpisujących, w celu weryfikacji transakcji i bloków, poświadczania prawidłowego nagłówka łańcucha, agregowania poświadczeń i proponowania bloków.

Osoby stakujące w domu są odpowiedzialne za obsługę sprzętu potrzebnego do uruchomienia tych klientów. Zaleca się używanie do tego celu dedykowanej maszyny obsługiwanej z domu — jest to niezwykle korzystne dla zdrowia sieci.

Staker domowy otrzymuje nagrody bezpośrednio z protokołu za utrzymywanie swojego walidatora prawidłowo działającego i online.

## Dlaczego stakować w domu? {#why-stake-solo}

Stakowanie w domu wiąże się z większą odpowiedzialnością, ale zapewnia maksymalną kontrolę nad środkami i konfiguracją stakowania.

<CardGrid>
  <Card title="Earn fresh ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full control" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Network security" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Kwestie do rozważenia przed rozpoczęciem stakowania w domu {#considerations-before-staking-solo}

Chociaż chcielibyśmy, aby stakowanie w domu było dostępne i wolne od ryzyka dla każdego, nie jest to jednak rzeczywistością. Istnieje kilka praktycznych i poważnych kwestii, o których należy pamiętać przed podjęciem decyzji o stakowaniu ETH w domu.

<InfoGrid>
<ExpandableCard title="Required reading" eventCategory="SoloStaking" eventName="clicked required reading">
Podczas obsługi własnego węzła należy poświęcić trochę czasu na naukę obsługi wybranego oprogramowania. Obejmuje to czytanie odpowiedniej dokumentacji i bycie na bieżąco z kanałami komunikacji tych zespołów programistów.

Im lepiej rozumiesz oprogramowanie, którego używasz, oraz działanie mechanizmu proof-of-stake, tym mniejsze ponosisz ryzyko jako staker i tym łatwiej będzie Ci naprawiać ewentualne problemy jako operatorowi węzła. </ExpandableCard>

<ExpandableCard title="Comfortable with computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Konfiguracja węzła wymaga rozsądnego poziomu komfortu podczas pracy z komputerami, chociaż nowe narzędzia z czasem to ułatwiają. Zrozumienie interfejsu wiersza poleceń jest pomocne, ale nie jest już wymagane.

Wymaga również bardzo podstawowej konfiguracji sprzętu i pewnego zrozumienia minimalnych zalecanych specyfikacji. </ExpandableCard>

<ExpandableCard title="Secure key management" eventCategory="SoloStaking" eventName="clicked secure key management">
Podobnie jak w przypadku kluczy prywatnych zabezpieczających adres Ethereum, konieczne będzie wygenerowanie kluczy specjalnie dla walidatora. Musisz wiedzieć, jak bezpiecznie przechowywać wszelkie frazy seed lub klucze prywatne.{' '}

[Bezpieczeństwo Ethereum i zapobieganie oszustwom](/security/) </ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Sprzęt czasami zawodzi, połączenia sieciowe ulegają awarii, a oprogramowanie klienta czasami wymaga aktualizacji. Konserwacja węzła jest nieunikniona i od czasu do czasu będzie wymagać Twojej uwagi. Musisz mieć pewność, że będziesz na bieżąco z wszelkimi przewidywanymi aktualizacjami sieci lub innymi krytycznymi aktualizacjami klienta.
</ExpandableCard>

<ExpandableCard title="Reliable uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Twoje nagrody są proporcjonalne do czasu, w którym Twój walidator jest online i prawidłowo poświadcza. Przestój wiąże się z karami proporcjonalnymi do tego, ile innych walidatorów jest offline w tym samym czasie, ale <a href="#faq">nie powoduje cięcia</a>. Przepustowość również ma znaczenie, ponieważ nagrody są zmniejszane za poświadczenia, które nie zostaną otrzymane na czas. Wymagania będą się różnić, ale zalecane jest co najmniej 10 Mb/s wysyłania i pobierania.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
W odróżnieniu od kar za bycie offline, <em>cięcie</em> jest znacznie poważniejszą karą zarezerwowaną dla złośliwych wykroczeń. Uruchamiając klienta mniejszościowego z kluczami załadowanymi tylko na jednym urządzeniu w danym czasie, ryzyko cięcia jest zminimalizowane. Biorąc to pod uwagę, wszyscy stakerzy muszą być świadomi ryzyka związanego z cięciem.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Więcej o cięciu i cyklu życia walidatora</a> </ExpandableCard> </InfoGrid>

<StakingComparison page="solo" />

## Jak to działa {#how-it-works}

<StakingHowSoloWorks />

Podczas aktywności będziesz zdobywać nagrody ETH, które będą okresowo wpłacane na Twój adres wypłaty.

W dowolnym momencie można zrezygnować z roli walidatora, co eliminuje wymóg bycia online i wstrzymuje dalsze nagrody. Pozostałe saldo zostanie następnie wypłacone na adres wypłaty wskazany podczas konfiguracji.

[Więcej na temat wypłat ze stakingu](/staking/withdrawals/)

## Rozpocznij na Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad to aplikacja open source, która pomoże ci zostać stakerem. Poprowadzi cię przez wybór klientów, wygenerowanie kluczy i zdeponowanie ETH w kontrakcie depozytu na staking. Dostępna jest lista kontrolna, aby upewnić się, że wszystko zostało uwzględnione w celu bezpiecznej konfiguracji walidatora.

<StakingLaunchpadWidget />

## Co wziąć pod uwagę w przypadku narzędzi do konfiguracji węzłów i klientów {#node-tool-considerations}

Powstaje coraz więcej narzędzi i usług, które pomagają w stakowaniu ETH w domu, ale każde z nich wiąże się z innym ryzykiem i korzyściami.

Poniżej użyto wskaźników atrybutów, aby zasygnalizować godne uwagi mocne lub słabe strony, jakie może mieć wymienione narzędzie do stakowania. Użyj tej sekcji jako odniesienia do sposobu, w jaki definiujemy te atrybuty podczas wybierania narzędzi, które pomogą Ci w Twojej przygodzie ze stakowaniem.

<StakingConsiderations page="solo" />

## Poznaj narzędzia do konfiguracji węzłów i klientów {#node-and-client-tools}

Dostępnych jest wiele opcji ułatwiających konfigurację. Skorzystaj z powyższych wskaźników, które oprowadzą cię z poniższymi narzędziami.

<ProductDisclaimer />

### Narzędzia węzła

<StakingProductsCardGrid category="nodeTools" />

Należy pamiętać o znaczeniu wybrania [klienta mniejszościowego](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza ryzyko. Narzędzia, które pozwalają na konfigurację klienta mniejszościowego są oznaczone jako <em style={{ textTransform: "uppercase" }}>„multi-klient”.</em>

### Generatory kluczy

Narzędzia te mogą być używane jako alternatywa dla [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), aby pomóc w generowaniu kluczy.

<StakingProductsCardGrid category="keyGen" />

Masz sugestię dotyczącą narzędzia do stakingu, które pominęliśmy? Zapoznaj się z naszymi [zasadami umieszczania produktów na liście](/contributing/adding-staking-products/), aby sprawdzić, czy Twój produkt będzie pasował, i przesłać go do recenzji.

## Przeglądaj przewodniki po stakowaniu w domu {#staking-guides}

<StakingGuides />

## Często zadawane pytania {#faq}

Oto kilka najczęściej zadawanych pytań dotyczących stakingu, o których warto wiedzieć.

<ExpandableCard title="What is a validator?">

<em>Walidator</em> to wirtualny podmiot, który żyje w Ethereum i uczestniczy w konsensusie protokołu Ethereum. Walidatorzy są reprezentowani przez saldo, klucz publiczny i inne właściwości. <em>Klient walidatora</em> to oprogramowanie, które działa w imieniu walidatora, przechowując i używając jego klucza prywatnego. Pojedynczy klient walidatora może przechowywać wiele par kluczy, kontrolując wiele walidatorów.

</ExpandableCard>

<ExpandableCard title="Can I deposit more than 32 ETH?">
Tak, nowoczesne konta walidatorów mogą przechowywać do 2048 ETH. Dodatkowe ETH powyżej 32 będą się kumulować w sposób schodkowy, zwiększając saldo w przyrostach całkowitoliczbowych w miarę wzrostu rzeczywistego salda. Jest to znane jako <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efektywne</a>.

Aby zwiększyć saldo efektywne konta, a tym samym zwiększyć nagrody, należy przekroczyć bufor 0,25 ETH powyżej dowolnego progu pełnego ETH. Na przykład konto z rzeczywistym saldem 32,9 i efektywnym saldem 32 musiałoby zarobić kolejne 0,35 ETH, aby jego rzeczywiste saldo przekroczyło 33,25, zanim nastąpi wzrost salda efektywnego.

Ten bufor zapobiega również spadkowi salda efektywnego, dopóki nie spadnie ono o 0,25 ETH poniżej bieżącego salda efektywnego.

Każda para kluczy powiązana z walidatorem wymaga do aktywacji co najmniej 32 ETH. Każde saldo powyżej tej kwoty może zostać w dowolnym momencie wypłacone na powiązany adres do wypłat za pomocą transakcji podpisanej tym adresem. Wszelkie środki powyżej maksymalnego salda efektywnego będą automatycznie wypłacane okresowo.

Jeśli stakowanie w domu wydaje Ci się zbyt wymagające, rozważ skorzystanie z dostawcy [stakingu jako usługi](/staking/saas/) lub, jeśli dysponujesz kwotą mniejszą niż 32 ETH, sprawdź [pule stakingowe](/staking/pools/). </ExpandableCard>

<ExpandableCard title="Will I be slashed if I go offline? (tldr: No.)">
Przejście w tryb offline, gdy sieć prawidłowo finalizuje bloki, NIE spowoduje cięcia. Niewielkie <em>kary za brak aktywności</em> są naliczane, jeśli Twój walidator nie jest dostępny do poświadczania w danej epoce (każda o długości 6,4 minuty), ale różni się to znacznie od <em>cięcia</em>. Kary te są nieco niższe niż nagroda, którą można by uzyskać, gdyby walidator był dostępny do poświadczenia, a straty można odzyskać w przybliżeniu w takim samym czasie, jak w przypadku powrotu do trybu online.

Należy pamiętać, że kary za brak aktywności są proporcjonalne do liczby walidatorów znajdujących się w trybie offline w tym samym czasie. W przypadkach, gdy duża część sieci jest jednocześnie offline, kary dla każdego z tych walidatorów będą wyższe niż w przypadku niedostępności pojedynczego walidatora.

W skrajnych przypadkach, jeśli sieć przestanie finalizować w wyniku tego, że ponad jedna trzecia walidatorów jest offline, użytkownicy ci ucierpią z powodu tak zwanego <em>kwadratowego wycieku nieaktywności</em>, który jest wykładniczym odpływem ETH z kont walidatorów offline. Umożliwia to sieci ostateczne samonaprawienie poprzez spalenie ETH nieaktywnych walidatorów, aż ich saldo osiągnie 16 ETH, po czym zostaną oni automatycznie usunięci z puli walidatorów. Pozostałe walidatory online ostatecznie ponownie będą stanowić ponad 2/3 sieci, spełniając warunek superwiększości potrzebny do ponownego sfinalizowania łańcucha. </ExpandableCard>

<ExpandableCard title="How do I ensure I don't get slashed?">
W skrócie, nigdy nie można tego w pełni zagwarantować, ale jeśli działasz w dobrej wierze, uruchamiasz klienta mniejszościowego i przechowujesz klucze do podpisu tylko na jednym urządzeniu naraz, ryzyko cięcia jest bliskie zeru.

Istnieje tylko kilka konkretnych sposobów, które mogą skutkować cięciem walidatora i usunięciem go z sieci. W chwili pisania tego tekstu, cięcia, które miały miejsce, były wyłącznie wynikiem nadmiarowych konfiguracji sprzętowych, w których klucze do podpisu były przechowywane na dwóch oddzielnych urządzeniach jednocześnie. Może to nieumyślnie skutkować <em>podwójnym głosowaniem</em> z Twoich kluczy, co jest wykroczeniem podlegającym cięciu.

Uruchamianie klienta superwiększościowego (każdego klienta używanego przez ponad 2/3 sieci) również niesie ze sobą ryzyko potencjalnego cięcia w przypadku, gdy klient ten ma błąd, który skutkuje forkiem łańcucha. Może to skutkować błędnym forkiem, który zostanie sfinalizowany. Korekta z powrotem do zamierzonego łańcucha wymagałaby przesłania <em>głosowania otaczającego</em> poprzez próbę cofnięcia sfinalizowanego bloku. To również jest wykroczenie, za które można zostać odciętym, którego można uniknąć, po prostu uruchamiając klienta mniejszościowego.

Równoważne błędy w <em>kliencie mniejszościowym nigdy nie zostałyby sfinalizowane</em>, a zatem nigdy nie skutkowałyby głosowaniem zaokrąglonym i po prostu skutkowałyby karami za brak aktywności, a <em>nie cięciem</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Dowiedz się więcej o znaczeniu uruchamiania klienta mniejszościowego.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Dowiedz się więcej o zapobieganiu cięciom</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Which client is best?">
Poszczególni klienci mogą nieznacznie różnić się pod względem wydajności i interfejsu użytkownika, ponieważ każdy z nich jest opracowywany przez różne zespoły przy użyciu różnych języków programowania. Niemniej jednak żaden z nich nie jest „najlepszy”. Wszyscy klienci produkcyjni to doskonałe oprogramowanie, które wykonuje te same podstawowe funkcje synchronizacji i interakcji z blockchainem.

Ponieważ wszyscy klienci produkcyjni zapewniają tę samą podstawową funkcjonalność, bardzo ważne jest, aby wybrać <strong>klienta mniejszościowego</strong>, czyli dowolnego klienta, który NIE jest obecnie używany przez większość walidatorów w sieci. Może to zabrzmieć sprzecznie z intuicją, ale uruchomienie klienta większościowego lub superwiększościowego naraża Cię na zwiększone ryzyko cięcia w przypadku błędu w tym kliencie. Uruchomienie klienta mniejszościowego drastycznie ogranicza to ryzyko.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Dowiedz się więcej, dlaczego różnorodność klientów jest kluczowa</a> </ExpandableCard>

<ExpandableCard title="Can I just use a VPS (virtual private server)?">
Chociaż wirtualny serwer prywatny (VPS) może być używany jako zamiennik sprzętu domowego, fizyczny dostęp i lokalizacja klienta walidatora <em>mają znaczenie</em>. Scentralizowane rozwiązania chmurowe, takie jak Amazon Web Services czy Digital Ocean, zapewniają wygodę polegającą na braku konieczności pozyskiwania i obsługi sprzętu, kosztem centralizacji sieci.

Im więcej klientów walidatora działa na jednym scentralizowanym rozwiązaniu do przechowywania w chmurze, tym bardziej staje się to niebezpieczne dla tych użytkowników. Każde zdarzenie, które spowoduje odłączenie tych dostawców od sieci, czy to w wyniku ataku, wymogów regulacyjnych, czy po prostu przerw w dostawie prądu/internetu, spowoduje, że każdy klient walidatora, który polega na tym serwerze, zostanie w tym samym czasie odłączony od sieci.

Kary za bycie offline są proporcjonalne do liczby innych osób, które są w tym samym czasie offline. Korzystanie z VPS znacznie zwiększa ryzyko, że kary za bycie offline będą bardziej dotkliwe, a także zwiększa ryzyko kwadratowego wycieku lub cięcia w przypadku, gdy awaria jest wystarczająco duża. Aby zminimalizować własne ryzyko i ryzyko dla sieci, użytkownicy są zdecydowanie zachęcani do pozyskania i obsługi własnego sprzętu. </ExpandableCard>

<ExpandableCard title="How do I unlock my rewards or get my ETH back?">

Wypłaty wszelkiego rodzaju z łańcucha śledzącego wymagają ustawienia poświadczeń wypłaty.

Nowi stakerzy ustawiają to w momencie generowania klucza i dokonywania depozytu. Obecni stakerzy, którzy jeszcze tego nie ustawili, mogą zaktualizować swoje klucze, aby obsługiwały tę funkcję.

Po ustawieniu poświadczeń wypłaty, płatności nagród (skumulowane ETH przez początkowe 32) będą okresowo automatycznie dystrybuowane na adres wypłaty.

Aby odblokować i otrzymać całe saldo z powrotem, należy również zakończyć proces zamykania walidatora.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink> </ExpandableCard>

## Dalsza lektura {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) - _Eridian i Spacesider_
- [Problem różnorodności klientów Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022_
- [Wspieranie różnorodności klientów](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022_
- [Różnorodność klientów w warstwie konsensusu Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Jak kupić sprzęt dla walidatora Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Wskazówki dotyczące zapobiegania cięciom w Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
