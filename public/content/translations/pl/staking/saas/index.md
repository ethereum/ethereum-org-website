---
title: Delegowany staking (staking jako usługa)
description: Przegląd informacji o tym, jak zacząć delegowany staking
lang: pl
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Zewnętrzni operatorzy węzłów zajmują się obsługą Twojego klienta walidatora
  - Świetna opcja dla każdego, kto posiada 32 ETH i nie chce zajmować się techniczną złożonością prowadzenia węzła
  - Delegowanie obejmuje szerokie spektrum, od usług, w których zachowujesz swoje klucze wypłaty, po w pełni powiernicze giełdy
---

## Czym jest delegowany staking? {#what-is-staking-as-a-service}

Delegowany staking to kategoria usług stakingu, w której deponujesz własne 32 ETH dla walidatora, ale delegujesz operacje węzła zewnętrznemu operatorowi. Proces ten zazwyczaj obejmuje przeprowadzenie przez początkową konfigurację, w tym generowanie kluczy i depozyt, a następnie przesłanie kluczy podpisywania do operatora. Dostarczasz ETH, ale przekazujesz obsługę sprzętu walidatora komuś innemu.

Protokół [Ethereum](/) nie obsługuje natywnie delegowania stawki, dlatego powstało wiele usług, aby zaspokoić to zapotrzebowanie. Kategoria ta jest najlepiej znana jako **staking jako usługa (SaaS)**, ale obejmuje spektrum rozwiązań, które różnią się w kluczowej kwestii tego, jak dużą kontrolę zachowujesz nad swoimi stakowanymi ETH:

- **Niepowierniczy staking jako usługa**: zachowujesz własne klucze wypłaty i delegujesz tylko działanie walidatora.
- **W pełni powierniczy staking**: dostawca, zazwyczaj giełda, przechowuje zarówno klucze, jak i środki.

W porównaniu do [stakingu solo](/staking/solo/), każda forma delegowania umieszcza oprogramowanie pośredniczące (middleware) między Tobą a protokołem Ethereum. To oprogramowanie pośredniczące to oprogramowanie i infrastruktura prowadzona przez firmę kogoś innego. Każdy krok w stronę wygody dodaje założenia dotyczące zaufania, więc przed wyborem usługi ustal, gdzie znajduje się ona w tym spektrum.

### Czym nie jest delegowany staking {#what-delegated-staking-is-not}

- **Staking grupowy i tokeny płynnego stakingu (LST)**: w przypadku pul łączysz dowolną kwotę ETH z innymi stakującymi, zazwyczaj otrzymując token, który reprezentuje Twój udział w stawce puli. Nie delegujesz własnego walidatora; inteligentne kontrakty puli i operatorzy węzłów kontrolują walidatory. [Więcej o stakingu grupowym](/staking/pools/)
- **Działanie węzła z kaucją (bonded node operation)**: niektóre protokoły stakingu pozwalają na uruchomienie walidatora na własnym sprzęcie z mniej niż 32 ETH poprzez wpłacenie kaucji. Jest to działanie węzła, przeciwieństwo delegowania, i jest omówione wraz ze [stakingiem solo](/staking/solo/).

## Dlaczego warto delegować swój staking? {#why-stake-with-a-service}

Jeśli masz 32 ETH do stakowania, ale nie czujesz się komfortowo w pracy ze sprzętem, usługi delegowanego stakingu pozwalają Ci przekazać stronę techniczną, podczas gdy Ty zdobywasz natywne nagrody za bloki Ethereum.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Zdeponuj własne 32 ETH, aby aktywować własny zestaw kluczy podpisywania, które będą uczestniczyć w konsensusie Ethereum. Monitoruj swoje postępy za pomocą pulpitów nawigacyjnych, aby obserwować, jak gromadzą się nagrody w ETH." />
  <Card title="Easy to start" icon={<Flag />} description="Zapomnij o specyfikacjach sprzętowych, konfiguracji, konserwacji węzła i aktualizacjach. Dostawcy pozwalają na zlecenie trudnej części na zewnątrz poprzez przesłanie własnych danych uwierzytelniających podpisywania, co pozwala im na uruchomienie walidatora w Twoim imieniu za niewielką opłatą." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="Dzięki usługom niepowierniczym zachowujesz kontrolę nad kluczami, które umożliwiają wypłatę lub transfer stakowanych środków. Różnią się one od kluczy podpisywania i mogą być przechowywane oddzielnie, aby ograniczyć (ale nie wyeliminować) Twoje ryzyko jako stakującego." />
</Grid>

## Porównanie opcji stakingu {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Spektrum delegowania {#the-delegation-spectrum}

Dostawcy różnią się tym, które klucze przechowują dla Ciebie, a każdy klucz, który przechowują, to coś, z czym musisz im zaufać.

### Niepowierniczy staking jako usługa {#non-custodial-staking-as-a-service}

W przypadku niepowierniczego SaaS zazwyczaj jesteś prowadzony przez proces generowania kluczy walidatora i dokonywania własnego depozytu 32 ETH, a następnie przesyłasz _klucze podpisywania_ do operatora. Klucze podpisywania pozwalają operatorowi na wykonywanie obowiązków walidatora (poświadczanie i proponowanie bloków) w Twoim imieniu. Ich niewłaściwe użycie może spowodować nałożenie kar na Twój walidator lub cięcie, ale nie mogą one zostać użyte do wypłaty, transferu ani wydania Twoich środków.

_Dane uwierzytelniające wypłaty_ walidatora pozostają skierowane na adres, który kontrolujesz. Nagrody i środki z wyjścia mogą trafić tylko tam (zobacz sekcję modelu zaufania poniżej).

### Usługi powiernicze i staking na giełdzie {#custodial-services-and-exchange-staking}

Na w pełni delegowanym końcu spektrum znajduje się powierniczy staking, najczęściej oferowany przez scentralizowane giełdy. W ogóle nie masz do czynienia z kluczami; po prostu trzymasz ETH na swoim koncie na platformie i decydujesz się na staking. Jest to najprostsze możliwe doświadczenie użytkownika i jest to uzasadniona opcja dla osób, które już trzymają środki na giełdzie i akceptują ryzyko powiernicze.

Wymaga to również największego zaufania. Dostawca kontroluje zarówno klucze podpisywania, jak i dane uwierzytelniające wypłaty; to, co posiadasz, to saldo na ich platformie, a nie walidator. Oznacza to, że:

- Twoje stakowane ETH jest narażone na wypłacalność, bezpieczeństwo i sytuację regulacyjną dostawcy, a wypłaty podlegają ich warunkom i czasom przetwarzania, a nie tylko zasadom protokołu Ethereum.
- Nie masz niezależnego sposobu na wyjście z walidatora lub odzyskanie środków, jeśli dostawca upadnie lub zamrozi wypłaty.
- Duże ilości ETH stakowane u garstki operatorów giełdowych przyczyniają się do centralizacji stawki, a wybory klientów tych operatorów wpływają na kondycję sieci. Staking w sposób, który pozostawia więcej kontroli w Twoich rękach, lub wybór dostawców, którzy w sposób udokumentowany uruchamiają mniejszościowe klienty, robi więcej dla odporności Ethereum.

## Model zaufania: co oceniać {#trust-model-what-to-evaluate}

Delegowany staking zawsze oznacza powierzenie komuś innemu części swojej konfiguracji stakingu. Odpowiedz na te pytania, zanim cokolwiek przekażesz:

- **Kto przechowuje klucze wypłaty?** Dane uwierzytelniające wypłaty walidatora (typ 0x01 lub 0x02) wskazują na adres warstwy wykonawczej, który ostatecznie kontroluje stawkę. Jeśli ten adres jest Twój, układ jest niepowierniczy; operator może uruchomić (lub źle zarządzać) walidatorem, ale ETH może zostać wypłacone tylko Tobie. Jeśli dane uwierzytelniające wskazują na adres dostawcy, posiadasz obietnicę, a nie stawkę.
- **Czy możesz wyjść bez operatora?** Od czasu [aktualizacji Pectra](/roadmap/pectra/), [wypłaty wyzwalane z warstwy wykonawczej (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) pozwalają adresowi wypłaty na wyzwolenie wyjścia walidatora (lub, w przypadku walidatorów 0x02 z kapitalizacją, częściowej wypłaty salda powyżej 32 ETH) bezpośrednio z warstwy wykonawczej, bez kluczy podpisywania. Wymaga to transakcji i kosztuje gaz, ale oznacza to, że niereagujący lub nieistniejący operator nie może już przetrzymywać Twojego walidatora jako zakładnika, pod warunkiem, że dane uwierzytelniające wypłaty należą do Ciebie.
- **Jaka jest struktura opłat?** Usługi pobierają stałą miesięczną opłatę lub procent od nagród. Sprawdź, jak opłaty mają się do przestojów i kar: kto ponosi koszty, jeśli operator osiąga gorsze wyniki, i czy oferowane są jakiekolwiek gwarancje lub ubezpieczenia.
- **Jakie klienty uruchamia operator?** Operator uruchamiający większościowe [klienty warstwy wykonawczej lub konsensusu](/developers/docs/nodes-and-clients/client-diversity/) naraża zarówno Twoją stawkę, jak i sieć na skorelowaną awarię, jeśli ten klient ma błąd. Preferuj dostawców, którzy dokumentują użycie mniejszościowych klientów.
- **Czy usługa jest otwarta i audytowana?** Dostawcy mogą uruchamiać dodatkowe oprogramowanie wokół standardowych klientów Ethereum, które nie jest oprogramowaniem typu open source ani nie podlega audytowi. Szukaj publicznych audytów, ugruntowanej historii operacyjnej i czystej historii cięć (slashing).
- **Co się stanie, jeśli dostawca zniknie?** Odpowiedzialny dostawca dokumentuje swój proces wycofywania (offboarding), dostarczając jasnych instrukcji, jak wyjść z walidatora, odzyskać klucze lub samodzielnie wyzwolić wyjście. Jeśli odpowiedź zależy całkowicie od tego, czy dostawca utrzyma się na rynku, jest to układ powierniczy.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Niektórzy dostawcy mogą uruchomić Twój walidator przy użyciu technologii rozproszonych walidatorów (DVT)**, dzieląc klucz podpisywania na wiele węzłów, dzięki czemu żadna pojedyncza maszyna ani operator nie stanowi punktu awarii. [Więcej o technologii rozproszonych walidatorów (DVT)](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Co wziąć pod uwagę {#what-to-consider}

Istnieje rosnąca liczba dostawców, którzy pomogą Ci delegować działanie Twojego walidatora, ale wszyscy mają swoje własne korzyści i ryzyka. Wszystkie opcje delegowane wymagają dodatkowych założeń dotyczących zaufania w porównaniu do stakingu solo. Opcje delegowane mogą mieć dodatkowy kod otaczający klienty Ethereum, który nie jest otwarty ani audytowalny. Delegowanie ma również szkodliwy wpływ na decentralizację sieci. W zależności od konfiguracji możesz nie kontrolować swojego walidatora, a operator może działać nieuczciwie, wykorzystując Twoje ETH.

Wskaźniki atrybutów są używane poniżej do sygnalizowania znaczących mocnych lub słabych stron, jakie może mieć wymieniony dostawca. Użyj tej sekcji jako odniesienia do tego, jak definiujemy te atrybuty podczas wyboru usługi stakingu.

<StakingConsiderations page="saas" />

## Poznaj dostawców usług stakingu {#saas-providers}

Poniżej znajduje się kilku dostępnych dostawców stakingu jako usługi. Użyj powyższych wskaźników, aby pomóc sobie w nawigacji po tych usługach.

<ProductDisclaimer />

### Dostawcy SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Zwróć uwagę na znaczenie wspierania [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza Twoje ryzyko. Usługi, które mają dowody na ograniczanie użycia większościowych klientów, są oznaczone jako <em style={{ textTransform: "uppercase" }}>"różnorodność klientów warstwy wykonawczej"</em> i <em style={{ textTransform: "uppercase" }}>"różnorodność klientów konsensusu".</em>

### Generatory kluczy {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Masz sugestię dotyczącą dostawcy stakingu jako usługi, którego pominęliśmy? Sprawdź naszą [politykę dodawania produktów](/contributing/adding-staking-products/), aby sprawdzić, czy by pasował, i prześlij go do weryfikacji.

<StakingCommunityCallout className="my-16" />

## Często zadawane pytania {#faq}

<ExpandableCard title="Kto przechowuje moje klucze?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Ustalenia różnią się w zależności od dostawcy. W przypadku usług niepowierniczych zostaniesz poprowadzony przez proces generowania kluczy podpisywania dla Twojego walidatora (każdy walidator przechowuje 32 ETH lub do 2048 ETH z danymi uwierzytelniającymi z kapitalizacją (0x02) od czasu aktualizacji Pectra) i przesłania ich do dostawcy, aby umożliwić mu walidację w Twoim imieniu. Same klucze podpisywania nie dają żadnej możliwości wypłaty, transferu ani wydawania Twoich środków. Zapewniają one jednak możliwość oddawania głosów w celu osiągnięcia konsensusu, co w przypadku niewłaściwego wykonania może skutkować karami za bycie offline lub cięciem.

W przypadku usług powierniczych, takich jak staking za pośrednictwem scentralizowanej giełdy, dostawca przechowuje wszystkie klucze: klucze podpisywania i dane uwierzytelniające wypłaty. W takim przypadku powierzasz dostawcy same środki, a nie tylko działanie walidatora.
</ExpandableCard>

<ExpandableCard title="Czyli są dwa zestawy kluczy?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Tak. Każdy walidator ma klucze _podpisywania_ i oddzielne _dane uwierzytelniające wypłaty_. Aby walidator mógł poświadczać stan łańcucha, uczestniczyć w komitetach synchronizacji i proponować bloki, klucze podpisywania muszą być łatwo dostępne dla klienta walidatora. Muszą one być w jakiejś formie podłączone do Internetu, a zatem z natury są uważane za "gorące" klucze. Klucze, które kontrolują wypłacone środki, są przechowywane oddzielnie ze względów bezpieczeństwa.

Dane uwierzytelniające wypłaty wyznaczają adres warstwy wykonawczej, na który trafiają nagrody ze stakingu i środki z wyjścia. Nowoczesne narzędzia do depozytów pozwalają na ustawienie tego adresu w momencie dokonywania depozytu, jako zwykłe (0x01) lub z kapitalizacją (0x02) dane uwierzytelniające, i powinien to być adres, który kontrolujesz, najlepiej zabezpieczony w zimnym portfelu (cold storage). Chroni to Twoje środki, nawet jeśli ktoś inny kontroluje klucze podpisywania Twojego walidatora, a od czasu aktualizacji Pectra pozwala to również na wyjście z walidatora bezpośrednio z tego adresu.

Walidatory skonfigurowane w początkach istnienia sieci bez adresu wypłaty w warstwie wykonawczej używają starszych kluczy wypłaty BLS i muszą podpisać jednorazową wiadomość deklarującą adres wypłaty, zanim wypłaty będą mogły się rozpocząć. Wiąże się to z ponownym wygenerowaniem kluczy wypłaty z mnemonicznej frazy odzyskiwania utworzonej podczas konfiguracji.

**Upewnij się, że bezpiecznie utworzyłeś kopię zapasową tej frazy odzyskiwania, w przeciwnym razie nie będziesz w stanie wygenerować kluczy wypłaty, gdy nadejdzie czas.**

Skontaktuj się ze swoim dostawcą w celu uzyskania wsparcia dotyczącego przygotowania walidatora.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę dokonać wypłaty?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Sposób działania wypłat zależy od typu danych uwierzytelniających wypłaty Twojego walidatora. W przypadku zwykłych walidatorów (0x01) każde saldo powyżej 32 ETH jest automatycznie przelewane na adres wypłaty okresowo co kilka dni. W przypadku walidatorów z kapitalizacją (0x02) nagrody są kapitalizowane do salda walidatora do 2048 ETH, a wypłata poniżej tej kwoty wymaga wyzwolenia częściowej wypłaty z Twojego adresu wypłaty, co kosztuje gaz.

Walidatory mogą również całkowicie wyjść, co odblokowuje całe pozostałe saldo ETH. Po zakończeniu procesu wyjścia pełne saldo jest transferowane na adres wypłaty podczas kolejnego cyklu wypłat walidatora (validator sweep).

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Co, jeśli mój dostawca zniknie lub nie zainicjuje wyjścia mojego walidatora?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Jeśli Twoje dane uwierzytelniające wypłaty wskazują na adres, który kontrolujesz, możesz samodzielnie wyjść z walidatora i odzyskać swoją stawkę; zobacz [Model zaufania: co oceniać](#trust-model-what-to-evaluate).

Jeśli dostawca przechowuje dane uwierzytelniające wypłaty (jak w przypadku stakingu powierniczego i na giełdzie), nie ma sposobu na poziomie protokołu, abyś mógł niezależnie odzyskać środki; Twoje możliwości ograniczają się do własnych procesów dostawcy.
</ExpandableCard>

<ExpandableCard title="Co się stanie, jeśli zostanę ukarany cięciem?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Korzystając z usług dostawcy delegowanego stakingu, powierzasz działanie swojego węzła komuś innemu. Wiąże się to z ryzykiem słabej wydajności węzła, nad którą nie masz kontroli. W przypadku cięcia Twojego walidatora nakładana jest początkowa kara proporcjonalna do salda Twojego walidatora (znacznie zmniejszona w aktualizacji Pectra), a Twój walidator jest przymusowo usuwany z zestawu walidatorów.

Po zakończeniu procesu cięcia/wyjścia pozostałe środki są transferowane na adres wypłaty przypisany do walidatora.

Skontaktuj się z poszczególnymi dostawcami, aby uzyskać więcej szczegółów na temat jakichkolwiek gwarancji lub opcji ubezpieczenia. Jeśli wolisz mieć pełną kontrolę nad konfiguracją swojego walidatora, [dowiedz się więcej o tym, jak stakować swoje ETH solo](/staking/solo/).
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Czym jest staking jako usługa?](https://figment.io/insights/what-is-staking-as-a-service/) – _Figment_
- [Katalog stakingu Ethereum](https://www.staking.directory/) – _Eridian i Spacesider_
- [Ocena usług stakingu](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_
- [EIP-7002: Wypłaty wyzwalane z warstwy wykonawczej](https://eips.ethereum.org/EIPS/eip-7002) – _specyfikacja wyjścia walidatora z jego adresu wypłaty_