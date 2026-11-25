---
title: Technologia rozproszonych walidatorów
description: Technologia rozproszonych walidatorów umożliwia rozproszone działanie walidatora Ethereum przez wiele stron.
lang: pl
template: staking
sidebarDepth: 2
summaryPoints:
  - Dzieli klucz do podpisywania walidatora na wiele maszyn i operatorów, eliminując pojedyncze punkty awarii
  - Utrzymuje walidatory online w przypadku awarii pojedynczego sprzętu, oprogramowania lub operatora
  - Infrastruktura produkcyjna używana obecnie przez osoby uprawiające staking solo, usługi stakingowe i pule stakingowe
---

## Czym jest technologia rozproszonych walidatorów? {#what-is-dvt}

Technologia rozproszonych walidatorów (DVT) to podejście do bezpieczeństwa walidatora, które rozkłada zarządzanie kluczami i obowiązki podpisywania na wiele stron, aby zredukować pojedyncze punkty awarii i zwiększyć odporność walidatora.

DVT rozprasza zarządzanie kluczami i podpisywanie poprzez **podział klucza prywatnego** używanego do zabezpieczenia walidatora **pomiędzy wiele komputerów** zorganizowanych w „klaster”. Pozwala to niektórym węzłom w klastrze na przejście w tryb offline przy jednoczesnym utrzymaniu aktywności węzła walidatora, ponieważ niezbędna praca walidacyjna może być wykonana przez podzbiór maszyn w każdym klastrze. Taka dystrybucja redukuje pojedyncze punkty awarii, czyniąc walidator bardziej solidnym. Dodatkową korzyścią z rozproszonego podpisywania w DVT jest to, że bardzo utrudnia atakującym uzyskanie dostępu do klucza, ponieważ nie jest on w całości przechowywany na żadnej pojedynczej maszynie.

![Diagram pokazujący, jak pojedynczy klucz walidatora jest dzielony na udziały w kluczu i rozdzielany pomiędzy wiele węzłów o różnych komponentach.](./dvt-cluster.png)

DVT nie jest osobnym sposobem na staking. Jest to warstwa oprogramowania, z której może korzystać każda konfiguracja stakingowa:
- [Osoby uprawiające staking solo](/staking/solo/) mogą połączyć siły, aby wspólnie prowadzić walidator, lub pojedyncza osoba uprawiająca staking solo może użyć DVT, aby zwiększyć odporność swojej konfiguracji stakingu solo.
- [Usługi stakingowe](/staking/saas/) i [pule stakingowe](/staking/pools/) mogą używać DVT, aby zwiększyć odporność i wzmocnić swoją infrastrukturę stakingową lub rozdzielić operacje walidatora pomiędzy wielu niezależnych operatorów.

## Dlaczego potrzebujemy DVT? {#why-do-we-need-dvt}

### Bezpieczeństwo {#security}

Walidatory generują dwie pary kluczy publiczno-prywatnych: klucze walidatora do uczestnictwa w konsensusie oraz klucze wypłaty do dostępu do środków. Podczas gdy walidatory mogą zabezpieczyć klucze wypłaty w tzw. zimnym portfelu (cold storage), klucze prywatne walidatora muszą być online 24/7, aby podpisywać obowiązki przypisane walidatorowi przez całą dobę, takie jak poświadczenia i propozycje bloków. Utrzymywanie klucza online naraża go na kradzież, a DVT ogranicza to ryzyko: online są zawsze tylko udziały w kluczu, nigdy pełny klucz.

Jeśli klucz prywatny walidatora zostanie skompromitowany, atakujący może przejąć kontrolę nad walidatorem, co potencjalnie prowadzi do cięcia lub utraty ETH stakującego. DVT łagodzi to ryzyko. Dzięki DVT oryginalny, pełny klucz walidatora jest szyfrowany i dzielony na udziały w kluczu. Udziały te są online, rozproszone na wiele węzłów, które wspólnie obsługują walidator, podczas gdy pełny klucz „główny” pozostaje bezpiecznie offline. Dystrybucja jest możliwa, ponieważ walidatory [Ethereum](/) używają podpisów BLS, które są addytywne, co oznacza, że pełny klucz można zrekonstruować poprzez zsumowanie jego części składowych. Częściowe podpisy wykonane za pomocą udziałów w kluczu łączą się w podpis, który jest ważny dla pełnego klucza, więc sam pełny klucz nigdy nie jest potrzebny do codziennego podpisywania. Kiedy klaster generuje nowy klucz walidatora przy użyciu rozproszonego generowania kluczy, pełny klucz prywatny nigdy nie istnieje na żadnej pojedynczej maszynie.

### Brak pojedynczych punktów awarii {#no-single-point-of-failure}

Kiedy walidator jest podzielony na wielu operatorów i wiele maszyn, może wytrzymać awarie pojedynczego sprzętu i oprogramowania bez przechodzenia w tryb offline. Ryzyko awarii można również zmniejszyć, stosując zróżnicowane konfiguracje sprzętu i oprogramowania w węzłach klastra. Dystrybucja wielooperatorska nie jest natywnie dostępna dla konfiguracji walidatora z jednym węzłem; pochodzi ona z warstwy oprogramowania pośredniczącego (middleware) DVT.

Jeśli jeden z komponentów maszyny w klastrze ulegnie awarii (na przykład, jeśli w klastrze walidatora jest czterech operatorów, a jeden używa konkretnego klienta, który ma błąd), pozostali mogą zapewnić, że walidator będzie nadal działał.

### Decentralizacja {#decentralization}

Idealnym scenariuszem dla Ethereum jest posiadanie jak największej liczby niezależnie obsługiwanych walidatorów. Jednak kilku dostawców usług stakingowych stało się bardzo popularnych i odpowiada za znaczną część całkowitego stakowanego ETH w sieci. DVT może pozwolić tym operatorom istnieć przy jednoczesnym zachowaniu decentralizacji stawki. Dzieje się tak, ponieważ klucze dla każdego walidatora są rozproszone na wiele maszyn i wymagałoby to znacznie większej zmowy, aby walidator stał się złośliwy.

Bez DVT dostawcom usług stakingowych łatwiej jest obsługiwać tylko jedną lub dwie konfiguracje klientów dla wszystkich swoich walidatorów, co zwiększa wpływ błędu klienta. DVT można wykorzystać do rozłożenia ryzyka na wiele konfiguracji klientów i różny sprzęt, tworząc odporność poprzez różnorodność.

**DVT oferuje Ethereum następujące korzyści:**

1. **Decentralizacja** konsensusu dowodu stawki (PoS) Ethereum
2. Zapewnia **żywotność** (liveness) sieci
3. Tworzy **tolerancję na błędy** walidatora
4. Działanie walidatora ze **zminimalizowanym zaufaniem**
5. **Zminimalizowane ryzyko cięcia** i przestojów
6. **Poprawia różnorodność** (klient, centrum danych, lokalizacja, regulacje itp.)
7. **Zwiększone bezpieczeństwo** zarządzania kluczami walidatora

## Jak działa DVT? {#how-does-dvt-work}

Implementacje DVT zazwyczaj działają jako dodatkowe oprogramowanie na każdej maszynie w klastrze. Oprogramowanie to działa jako warstwa pośrednicząca (middleware), znajdująca się między klientem walidatora węzła a jego klientem konsensusu, gdzie koordynuje działania z innymi węzłami w klastrze, tak aby obowiązki walidatora były podpisywane zbiorowo.

Rozwiązanie DVT zawiera następujące komponenty:

- **[Podział sekretu Shamira](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Walidatory używają [kluczy BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Klucz prywatny walidatora można podzielić na wiele „udziałów w kluczu”, a ponieważ podpisy BLS są addytywne, częściowe podpisy wykonane za pomocą tych udziałów można połączyć w jeden podpis, który jest ważny dla pełnego klucza walidatora.
- **[Schemat podpisu progowego](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Określa liczbę pojedynczych udziałów w kluczu, które są wymagane do obowiązków podpisywania, np. 3 z 4.
- **[Rozproszone generowanie kluczy (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proces kryptograficzny, który generuje udziały w kluczu i służy do dystrybucji udziałów istniejącego lub nowego klucza walidatora do węzłów w klastrze.
- **[Obliczenia wielostronne (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Pełny klucz walidatora jest generowany w tajemnicy przy użyciu obliczeń wielostronnych. Pełny klucz nigdy nie jest znany żadnemu pojedynczemu operatorowi — znają oni tylko swoją własną jego część (swój „udział”).
- **Protokół konsensusu** - Protokół konsensusu wybiera jeden węzeł jako proponującego blok. Udostępnia on blok innym węzłom w klastrze, które dodają swoje udziały w kluczu do zagregowanego podpisu. Gdy zagregowana zostanie wystarczająca liczba udziałów w kluczu, blok jest proponowany w Ethereum.

Rozproszone walidatory mają wbudowaną tolerancję na błędy i mogą nadal działać, nawet jeśli niektóre z pojedynczych węzłów przejdą w tryb offline. Klaster węzła walidatora jest odporny, nawet jeśli niektóre z jego węzłów okażą się złośliwe lub leniwe.

## DVT w produkcji {#dvt-in-production}

Rozproszone walidatory działają dziś w Sieci głównej (Mainnet) w ramach stakingu solo, usług stakingowych i stakingu grupowego. Dwie sieci odpowiadają za większość tej aktywności:

<ProductDisclaimer />

- **Obol** rozwija Charon, klienta oprogramowania pośredniczącego DVT o otwartym kodzie źródłowym, który pozwala klastrowi maszyn wspólnie obsługiwać walidator („squad staking”). Grupy przeprowadzają rozproszone generowanie kluczy i konfigurują swój klaster za pośrednictwem [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) firmy Obol. Klastry Obol są używane w produkcji przez [protokoły stakingowe](/staking/pools/) i [usługi stakingowe](/staking/saas/), w tym moduł Simple DVT Lido i program Operation Solo Staker firmy EtherFi, który wdraża domowych operatorów do klastrów odpornych na błędy.
- **SSV Network** to niewymagająca pozwoleń sieć niezależnych operatorów węzłów. Klucz walidatora jest dzielony na udziały w kluczu i dystrybuowany do wybranego zestawu operatorów, którzy wspólnie wykonują obowiązki walidatora; żaden pojedynczy operator nigdy nie posiada pełnego klucza. Usługi stakingowe i pule uruchamiają duże zestawy walidatorów w SSV i podobnie jak Obol, jest on używany przez moduł Simple DVT Lido.

## Przypadki użycia DVT {#dvt-use-cases}

DVT ma istotne implikacje dla szerszej branży stakingowej:

### Osoby uprawiające staking solo {#solo-stakers}

DVT umożliwia **squad staking**: mała grupa osób, takich jak przyjaciele, członkowie społeczności lub nieznajomi skoordynowani przez launchpad, wspólnie prowadzi jeden walidator na własnych maszynach. Próg grupy (na przykład 3 z 4) musi być online, aby walidator mógł wykonywać swoje obowiązki, więc przestój, awaria sprzętu lub błąd żadnego pojedynczego członka nie powoduje przejścia walidatora w tryb offline. Kiedy klucz jest tworzony za pomocą rozproszonego generowania kluczy, żaden członek nigdy nie posiada pełnego klucza do podpisywania.

DVT umożliwia również niepowierniczy staking, pozwalając na dystrybucję klucza walidatora na zdalne węzły przy jednoczesnym utrzymaniu pełnego klucza całkowicie offline. Oznacza to, że stakujący niekoniecznie muszą uruchamiać własny sprzęt, a dystrybucja udziałów w kluczu pomaga chronić przed potencjalnymi włamaniami.

### Staking jako usługa (SaaS) {#saas}

Operatorzy (tacy jak pule stakingowe i stakujący instytucjonalni) zarządzający wieloma walidatorami mogą używać DVT w celu zmniejszenia ryzyka. Rozpraszając swoją infrastrukturę, mogą dodać redundancję do swoich operacji i zdywersyfikować rodzaje używanego sprzętu.

DVT dzieli odpowiedzialność za zarządzanie kluczami na wiele węzłów, co oznacza, że niektóre koszty operacyjne mogą być również dzielone. DVT może również zmniejszyć ryzyko operacyjne i koszty ubezpieczenia dla dostawców usług stakingowych.

### Pule stakingowe {#staking-pools}

Ze względu na standardowe konfiguracje walidatorów, pule stakingowe i dostawcy płynnego stakingu historycznie musieli pokładać znaczne zaufanie w każdym pojedynczym operatorze, ponieważ zyski i straty są uspołeczniane w całej puli. Byli również zdani na operatorów w kwestii zabezpieczenia kluczy do podpisywania, ponieważ do czasu pojawienia się DVT nie było dla nich innej opcji.

Mimo że tradycyjnie podejmuje się wysiłki w celu rozłożenia ryzyka poprzez dystrybucję stawek pomiędzy wielu operatorów, każdy operator nadal niezależnie zarządza znaczną stawką. Poleganie na jednym operatorze stwarza ogromne ryzyko, jeśli osiąga on słabe wyniki, napotyka przestoje, zostaje skompromitowany lub działa złośliwie.

Wykorzystując DVT, można zmniejszyć zaufanie wymagane od każdego pojedynczego operatora. **Pule mogą umożliwić operatorom utrzymywanie stawek bez konieczności sprawowania pieczy nad kluczami walidatora** (ponieważ wykorzystywane są tylko udziały w kluczu). Pozwala to również na dystrybucję zarządzanych stawek pomiędzy większą liczbę operatorów (np. zamiast jednego operatora zarządzającego 1000 walidatorów, DVT umożliwia wspólne prowadzenie tych walidatorów przez wielu operatorów). Zróżnicowane konfiguracje operatorów pomagają zapewnić, że jeśli jeden operator ulegnie awarii, pozostali nadal będą w stanie poświadczać. Wynikająca z tego redundancja i dywersyfikacja mogą prowadzić do lepszej wydajności i odporności, przy jednoczesnej maksymalizacji nagród.

Kolejną korzyścią z minimalizacji zaufania do pojedynczego operatora jest to, że pule stakingowe mogą pozwolić na bardziej otwarty i niewymagający pozwoleń udział operatorów. Niektóre pule stakingowe robią to dziś w produkcji. Wielooperatorskie klastry DVT pozwalają protokołom łączyć domowych stakujących i mniejszych operatorów z większymi profesjonalistami, łącząc wyselekcjonowane i niewymagające pozwoleń zestawy operatorów.

## Potencjalne wady korzystania z DVT {#potential-drawbacks-of-using-dvt}

- **Dodatkowy komponent** - wprowadzenie węzła DVT dodaje kolejną część, która może być wadliwa lub podatna na ataki. Jest to łagodzone przez posiadanie wielu implementacji oprogramowania DVT, podobnie jak istnieje wielu klientów dla warstwy konsensusu i warstwy wykonawczej.
- **Koszty operacyjne** - ponieważ DVT rozdziela walidator pomiędzy wiele stron, do działania wymagana jest większa liczba węzłów zamiast tylko jednego, co wprowadza zwiększone koszty operacyjne.
- **Potencjalnie zwiększone opóźnienie** - ponieważ DVT wykorzystuje protokół konsensusu do osiągnięcia konsensusu między wieloma węzłami obsługującymi walidator, może to potencjalnie wprowadzić zwiększone opóźnienie.

## Często zadawane pytania {#faq}

<ExpandableCard title="Czy potrzebuję DVT, aby stakować?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Nie. Pojedyncza maszyna z uruchomionym klientem walidatora działa bez żadnego oprogramowania DVT i pozostaje to powszechną konfiguracją stakingu domowego. DVT to opcjonalna warstwa, która dodaje tolerancję na błędy i eliminuje pojedyncze punkty awarii. Jest to przydatne, jeśli chcesz, aby Twój walidator przetrwał awarie poszczególnych maszyn, lub jeśli chcesz dzielić odpowiedzialność za prowadzenie walidatora z innymi.
</ExpandableCard>

<ExpandableCard title="Czy DVT dzieli moje ETH lub moje klucze do wypłat?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Nie. DVT dzieli tylko klucz _do podpisywania_ walidatora, który jest używany do obowiązków konsensusu, takich jak poświadczenia i propozycje bloków. Twoja stawka jest zawsze kontrolowana przez adres wypłaty ustawiony dla walidatora, na który DVT nie ma wpływu. Od czasu aktualizacji Pectra posiadacz adresu wypłaty może również zainicjować wyjście walidatora bezpośrednio z warstwy wykonawczej, bez konieczności posiadania klucza do podpisywania.
</ExpandableCard>

<ExpandableCard title="Co się stanie, jeśli węzły w klastrze przejdą w tryb offline?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Dopóki próg węzłów pozostaje online (na przykład 3 z 4), walidator nadal wykonuje swoje obowiązki. Jeśli zbyt wiele węzłów przejdzie w tryb offline w tym samym czasie, walidator po prostu przechodzi w tryb offline i traci nagrody, dopóki nie powróci wystarczająca liczba węzłów, tak samo jak każdy walidator offline. Przejście w tryb offline nie jest przewinieniem podlegającym cięciu.
</ExpandableCard>

<ExpandableCard title="Czy klaster musi być 3 z 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Nie. „3 z 4” to tylko najmniejsza powszechna konfiguracja i jest używana jako przykład na tej stronie. Rozmiar klastra i próg podpisywania są wybierane podczas tworzenia klastra.

Klastry są zazwyczaj tak dobrane, aby próg wynosił większość kwalifikowaną dwóch trzecich węzłów, co pozwala klastrowi na kontynuowanie podpisywania przy jednoczesnym tolerowaniu wadliwych lub będących offline członków. Klaster 4-węzłowy podpisuje za pomocą 3 i toleruje 1 awarię; 7 węzłów podpisuje za pomocą 5 i toleruje 2; 10 węzłów podpisuje za pomocą 7 i toleruje 3. Większe klastry kupują większą tolerancję na błędy kosztem większej liczby maszyn do uruchomienia i większej koordynacji między nimi.

[Więcej o rozmiarze klastra i odporności](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="Czy DVT to to samo co staking grupowy?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Nie. Staking grupowy łączy ETH od wielu osób w celu sfinansowania walidatorów i jest jednym z kilku [sposobów na staking](/staking/). DVT to infrastruktura do _obsługi_ walidatora. Rozdziela podpisywanie jednego walidatora na wiele maszyn i operatorów. Te dwa elementy uzupełniają się; wiele pul używa DVT do dystrybucji swoich zestawów operatorów, ale samo DVT nie łączy niczyjego ETH.
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Technologia rozproszonych walidatorów (DVT) Ethereum - Pełne wprowadzenie](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [Czym jest DVT i jak ulepsza staking w Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Specyfikacje rozproszonego walidatora Ethereum (wysoki poziom)](https://github.com/ethereum/distributed-validator-specs)
- [Specyfikacje techniczne rozproszonego walidatora Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Dokumentacja Obol](https://docs.obol.org/)
- [Dokumentacja SSV Network](https://docs.ssv.network/)
- [Moduł Simple DVT Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Aplikacja demonstracyjna podziału sekretu Shamira](https://iancoleman.io/shamir/)