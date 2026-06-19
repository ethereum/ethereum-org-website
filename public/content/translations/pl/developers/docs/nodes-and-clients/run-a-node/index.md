---
title: Uruchom swój własny węzeł Ethereum
description: Ogólne wprowadzenie do uruchamiania własnej instancji klienta Ethereum.
lang: pl
sidebarDepth: 2
---

Uruchomienie własnego węzła zapewnia różne korzyści, otwiera nowe możliwości i pomaga wspierać ekosystem. Ta strona poprowadzi Cię przez proces uruchamiania własnego węzła i brania udziału w walidacji transakcji [Ethereum](/).

Zauważ, że po [The Merge](/roadmap/merge) do uruchomienia węzła Ethereum wymagane są dwa klienty: klient **warstwy wykonawczej (EL)** oraz klient **warstwy konsensusu (CL)**. Ta strona pokaże, jak zainstalować, skonfigurować i połączyć te dwa klienty, aby uruchomić węzeł Ethereum.

## Wymagania wstępne {#prerequisites}

Powinieneś rozumieć, czym jest węzeł Ethereum i dlaczego warto uruchomić klienta. Zostało to omówione w sekcji [Węzły i klienty](/developers/docs/nodes-and-clients/).

Jeśli jesteś nowy w temacie uruchamiania węzła lub szukasz mniej technicznej ścieżki, zalecamy najpierw zapoznać się z naszym przyjaznym dla użytkownika wprowadzeniem do [uruchamiania węzła Ethereum](/run-a-node).

## Wybór podejścia {#choosing-approach}

Pierwszym krokiem w uruchamianiu węzła jest wybór podejścia. W oparciu o wymagania i różne możliwości musisz wybrać implementację klienta (zarówno klienta warstwy wykonawczej, jak i klienta konsensusu), środowisko (sprzęt, system) oraz parametry ustawień klienta.

Ta strona poprowadzi Cię przez te decyzje i pomoże znaleźć najbardziej odpowiedni sposób na uruchomienie Twojej instancji Ethereum.

Aby wybrać spośród implementacji klientów, zobacz wszystkie dostępne, gotowe na Sieć główną [klienty warstwy wykonawczej](/developers/docs/nodes-and-clients/#execution-clients), [klienty konsensusu](/developers/docs/nodes-and-clients/#consensus-clients) i dowiedz się o [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity).

Zdecyduj, czy uruchomić oprogramowanie na własnym [sprzęcie, czy w chmurze](#local-vs-cloud), biorąc pod uwagę [wymagania](#requirements) klientów.

Po przygotowaniu środowiska zainstaluj wybrane klienty za pomocą [przyjaznego dla początkujących interfejsu](#automatized-setup) lub [ręcznie](#manual-setup), używając terminala z zaawansowanymi opcjami.

Kiedy węzeł działa i trwa jego synchronizacja, jesteś gotowy, aby [go używać](#using-the-node), ale pamiętaj, aby mieć oko na jego [konserwację](#operating-the-node).

![Client setup](./diagram.png)

### Środowisko i sprzęt {#environment-and-hardware}

#### Lokalnie czy w chmurze {#local-vs-cloud}

Klienty Ethereum mogą działać na komputerach klasy konsumenckiej i nie wymagają żadnego specjalnego sprzętu, takiego jak na przykład koparki. Dlatego masz różne opcje wdrożenia węzła w zależności od swoich potrzeb.
Dla uproszczenia zastanówmy się nad uruchomieniem węzła zarówno na lokalnej maszynie fizycznej, jak i na serwerze w chmurze:

- Chmura
  - Dostawcy oferują wysoki czas bezawaryjnej pracy serwera (uptime) i statyczne publiczne adresy IP
  - Uzyskanie dedykowanego lub wirtualnego serwera może być wygodniejsze niż budowanie własnego
  - Kompromisem jest konieczność zaufania stronie trzeciej – dostawcy serwera
  - Ze względu na wymaganą pojemność pamięci masowej dla pełnego węzła, cena wynajętego serwera może być wysoka
- Własny sprzęt
  - Bardziej niewymagające zaufania i suwerenne podejście
  - Jednorazowa inwestycja
  - Opcja zakupu wstępnie skonfigurowanych maszyn
  - Musisz fizycznie przygotować, konserwować i potencjalnie rozwiązywać problemy z maszyną i siecią

Obie opcje mają różne zalety podsumowane powyżej. Jeśli szukasz rozwiązania w chmurze, oprócz wielu tradycyjnych dostawców usług w chmurze, istnieją również usługi skoncentrowane na wdrażaniu węzłów. Sprawdź [węzły jako usługę (nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/), aby uzyskać więcej opcji dotyczących hostowanych węzłów.

#### Sprzęt {#hardware}

Jednak odporna na cenzurę, zdecentralizowana sieć nie powinna polegać na dostawcach chmurowych. Zamiast tego uruchomienie węzła na własnym lokalnym sprzęcie jest zdrowsze dla ekosystemu. [Szacunki](https://www.ethernodes.org/networkType/cl/Hosting) pokazują, że duża część węzłów działa w chmurze, co może stać się pojedynczym punktem awarii.

Klienty Ethereum mogą działać na Twoim komputerze, laptopie, serwerze, a nawet komputerze jednopłytkowym. Chociaż uruchamianie klientów na komputerze osobistym jest możliwe, posiadanie dedykowanej maszyny tylko dla Twojego węzła może znacznie zwiększyć jego wydajność i bezpieczeństwo, minimalizując jednocześnie wpływ na Twój główny komputer.

Korzystanie z własnego sprzętu może być bardzo proste. Istnieje wiele prostych opcji, a także zaawansowanych konfiguracji dla bardziej technicznych osób. Przyjrzyjmy się więc wymaganiom i sposobom uruchamiania klientów Ethereum na Twojej maszynie.

#### Wymagania {#requirements}

Wymagania sprzętowe różnią się w zależności od klienta, ale ogólnie nie są zbyt wysokie, ponieważ węzeł musi po prostu pozostać zsynchronizowany. Nie myl tego z kopaniem, które wymaga znacznie większej mocy obliczeniowej. Czas synchronizacji i wydajność poprawiają się jednak przy użyciu mocniejszego sprzętu.

Przed zainstalowaniem jakiegokolwiek klienta upewnij się, że Twój komputer ma wystarczające zasoby do jego uruchomienia. Poniżej znajdziesz minimalne i zalecane wymagania.

Wąskim gardłem dla Twojego sprzętu jest głównie przestrzeń dyskowa. Synchronizacja blockchaina Ethereum jest bardzo intensywna pod względem operacji wejścia/wyjścia i wymaga dużo miejsca. Najlepiej mieć **dysk półprzewodnikowy (SSD)** z setkami gigabajtów wolnego miejsca do dyspozycji nawet po zakończeniu synchronizacji.

Rozmiar bazy danych i szybkość początkowej synchronizacji zależą od wybranego klienta, jego konfiguracji i [strategii synchronizacji](/developers/docs/nodes-and-clients/#sync-modes).

Upewnij się również, że Twoje połączenie internetowe nie jest ograniczone przez [limit przepustowości](https://wikipedia.org/wiki/Data_cap). Zaleca się korzystanie z nielimitowanego połączenia, ponieważ początkowa synchronizacja i dane przesyłane do sieci mogą przekroczyć Twój limit.

##### System operacyjny {#plug-and-play}

Wszystkie klienty obsługują główne systemy operacyjne – Linux, macOS, Windows. Oznacza to, że możesz uruchamiać węzły na zwykłych komputerach stacjonarnych lub serwerach z systemem operacyjnym (OS), który najbardziej Ci odpowiada. Upewnij się, że Twój system operacyjny jest aktualny, aby uniknąć potencjalnych problemów i luk w zabezpieczeniach.

##### Minimalne wymagania {#ethereum-on-a-single-board-computer}

- Procesor z 2+ rdzeniami
- 8 GB RAM
- 2 TB SSD
- Przepustowość 10+ MBit/s

##### Zalecana specyfikacja {#spinning-up-node}

- Szybki procesor z 4+ rdzeniami
- 16 GB+ RAM
- Szybki dysk SSD 2+ TB
- Przepustowość 25+ MBit/s

Wybrany tryb synchronizacji i klient wpłyną na wymagania dotyczące miejsca, ale poniżej oszacowaliśmy przestrzeń dyskową, której będziesz potrzebować dla każdego klienta.

| Klient     | Rozmiar dysku (snap sync) | Rozmiar dysku (pełne archiwum) |
| ---------- | ------------------------- | ------------------------------ |
| Besu       | 800GB+                    | 12TB+                          |
| Erigon     | N/D                       | 2.5TB+                         |
| Geth       | 500GB+                    | 12TB+                          |
| Nethermind | 500GB+                    | 12TB+                          |
| Reth       | N/D                       | 2.2TB+                         |

- Uwaga: Erigon i Reth nie oferują synchronizacji typu snap sync, ale możliwe jest pełne przycinanie (Full Pruning) (~2 TB dla Erigona, ~1,2 TB dla Retha)

W przypadku klientów konsensusu wymagania dotyczące miejsca zależą również od implementacji klienta i włączonych funkcji (np. slasher walidatora), ale ogólnie należy liczyć się z kolejnymi 200 GB potrzebnymi na dane Beacon. Przy dużej liczbie walidatorów rośnie również obciążenie przepustowości. Możesz znaleźć [szczegóły dotyczące wymagań klientów konsensusu w tej analizie](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Rozwiązania plug-and-play {#automatized-setup}

Najprostszą opcją uruchomienia węzła na własnym sprzęcie jest użycie urządzeń typu plug-and-play. Wstępnie skonfigurowane maszyny od dostawców oferują najbardziej bezpośrednie doświadczenie: zamów, podłącz, uruchom. Wszystko jest wstępnie skonfigurowane i działa automatycznie z intuicyjnym przewodnikiem i panelem do monitorowania i kontrolowania oprogramowania.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum na komputerze jednopłytkowym {#manual-setup}

Łatwym i tanim sposobem na uruchomienie węzła Ethereum jest użycie komputera jednopłytkowego, nawet z architekturą ARM, takiego jak Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) zapewnia łatwe do uruchomienia obrazy wielu klientów warstwy wykonawczej i konsensusu dla Raspberry Pi i innych płyt ARM.

Małe, niedrogie i wydajne urządzenia, takie jak te, są idealne do uruchomienia węzła w domu, ale należy pamiętać o ich ograniczonej wydajności.

## Uruchamianie węzła {#getting-the-client}

Właściwa konfiguracja klienta może być wykonana za pomocą zautomatyzowanych programów uruchamiających (launcherów) lub ręcznie, konfigurując oprogramowanie klienta bezpośrednio.

Dla mniej zaawansowanych użytkowników zalecanym podejściem jest użycie launchera, oprogramowania, które prowadzi przez instalację i automatyzuje proces konfiguracji klienta. Jeśli jednak masz pewne doświadczenie w korzystaniu z terminala, kroki ręcznej konfiguracji powinny być proste do wykonania.

### Konfiguracja z przewodnikiem {#client-setup}

Wiele przyjaznych dla użytkownika projektów ma na celu poprawę doświadczenia związanego z konfiguracją klienta. Te launchery zapewniają automatyczną instalację i konfigurację klienta, a niektóre oferują nawet interfejs graficzny do konfiguracji z przewodnikiem i monitorowania klientów.

Poniżej znajduje się kilka projektów, które mogą pomóc Ci zainstalować i kontrolować klienty za pomocą zaledwie kilku kliknięć:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) – DappNode to nie tylko maszyna od dostawcy. Oprogramowanie, właściwy launcher węzła i centrum sterowania z wieloma funkcjami mogą być używane na dowolnym sprzęcie.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) – Najszybszy i najłatwiejszy sposób na skonfigurowanie pełnego węzła. Narzędzie konfiguracyjne w jednej linii poleceń i tekstowy interfejs użytkownika (TUI) do zarządzania węzłem. Darmowe. Open source. Dobra publiczne dla Ethereum od osób uprawiających staking solo. Obsługa ARM64 i AMD64.
- [eth-docker](https://eth-docker.net/) – Zautomatyzowana konfiguracja przy użyciu Dockera skoncentrowana na łatwym i bezpiecznym stakingu, wymaga podstawowej wiedzy o terminalu i Dockerze, zalecana dla nieco bardziej zaawansowanych użytkowników.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) – Launcher do instalacji klientów na zdalnym serwerze przez połączenie SSH z przewodnikiem konfiguracji GUI, centrum sterowania i wieloma innymi funkcjami.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) – Narzędzie do konfiguracji węzła, które automatycznie generuje konfigurację Dockera za pomocą kreatora CLI. Napisane w Go przez Nethermind.
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) – Interfejs WWW i CLI do wdrażania klientów warstwy wykonawczej i konsensusu na Kubernetes. Zawiera bootstrap ze snapshotów i wbudowane monitorowanie. Darmowe. Nie wymaga konta Chainstack. Zbudowane przez Chainstack.

### Ręczna konfiguracja klientów {#starting-the-execution-client}

Inną opcją jest ręczne pobranie, zweryfikowanie i skonfigurowanie oprogramowania klienta. Nawet jeśli niektóre klienty oferują interfejs graficzny, ręczna konfiguracja nadal wymaga podstawowych umiejętności obsługi terminala, ale oferuje znacznie większą wszechstronność.

Jak wyjaśniono wcześniej, skonfigurowanie własnego węzła Ethereum będzie wymagało uruchomienia pary klientów: konsensusu i warstwy wykonawczej. Niektóre klienty mogą zawierać lekkiego klienta drugiego rodzaju i synchronizować się bez potrzeby używania innego oprogramowania. Jednak pełna, niewymagająca zaufania weryfikacja wymaga obu implementacji.

#### Pobieranie oprogramowania klienta {#running-an-execution-client}

Najpierw musisz uzyskać preferowane oprogramowanie [klienta warstwy wykonawczej](/developers/docs/nodes-and-clients/#execution-clients) i [klienta konsensusu](/developers/docs/nodes-and-clients/#consensus-clients).

Możesz po prostu pobrać aplikację wykonywalną lub pakiet instalacyjny, który pasuje do Twojego systemu operacyjnego i architektury. Zawsze weryfikuj podpisy i sumy kontrolne pobranych pakietów. Niektóre klienty oferują również repozytoria lub obrazy Dockera dla łatwiejszej instalacji i aktualizacji. Wszystkie klienty są open source, więc możesz je również zbudować ze źródeł. Jest to bardziej zaawansowana metoda, ale w niektórych przypadkach może być wymagana.

Instrukcje instalacji każdego klienta znajdują się w dokumentacji podlinkowanej na listach klientów powyżej.

Oto strony wydań klientów, na których można znaleźć ich wstępnie skompilowane pliki binarne lub instrukcje instalacji:

##### Klienty warstwy wykonawczej {#starting-the-consensus-client}

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Warto również zauważyć, że różnorodność klientów jest [problemem w warstwie wykonawczej](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Zaleca się, aby czytelnicy rozważyli uruchomienie mniejszościowego klienta warstwy wykonawczej.

##### Klienty konsensusu {#running-a-consensus-client}

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Nie udostępnia wstępnie skompilowanego pliku binarnego, tylko obraz Dockera lub do zbudowania ze źródeł)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/) ma kluczowe znaczenie dla węzłów konsensusu uruchamiających walidatory. Jeśli większość walidatorów uruchamia jedną implementację klienta, bezpieczeństwo sieci jest zagrożone. Dlatego zaleca się rozważenie wyboru mniejszościowego klienta.

[Zobacz najnowsze statystyki użycia klientów w sieci](https://clientdiversity.org/) i dowiedz się więcej o [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity).

##### Weryfikacja oprogramowania {#adding-validators}

Pobierając oprogramowanie z Internetu, zaleca się zweryfikowanie jego integralności. Ten krok jest opcjonalny, ale zwłaszcza w przypadku kluczowego elementu infrastruktury, jakim jest klient Ethereum, ważne jest, aby zdawać sobie sprawę z potencjalnych wektorów ataku i ich unikać. Jeśli pobrałeś wstępnie skompilowany plik binarny, musisz mu zaufać i zaryzykować, że atakujący mógł podmienić plik wykonywalny na złośliwy.

Deweloperzy podpisują wydane pliki binarne swoimi kluczami PGP, dzięki czemu możesz kryptograficznie zweryfikować, czy uruchamiasz dokładnie to oprogramowanie, które stworzyli. Musisz tylko uzyskać klucze publiczne używane przez deweloperów, które można znaleźć na stronach wydań klientów lub w dokumentacji. Po pobraniu wydania klienta i jego podpisu możesz użyć implementacji PGP, np. [GnuPG](https://gnupg.org/download/index.html), aby łatwo je zweryfikować. Sprawdź samouczek dotyczący weryfikacji oprogramowania open-source za pomocą `gpg` w systemie [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) lub [Windows/macOS](https://freedom.press/training/verifying-open-source-software/).

Inną formą weryfikacji jest upewnienie się, że hash, unikalny kryptograficzny odcisk palca pobranego oprogramowania, pasuje do tego dostarczonego przez deweloperów. Jest to jeszcze łatwiejsze niż użycie PGP, a niektóre klienty oferują tylko tę opcję. Wystarczy uruchomić funkcję skrótu na pobranym oprogramowaniu i porównać wynik z tym ze strony wydania. Na przykład:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Konfiguracja klienta {#using-the-node}

Po zainstalowaniu, pobraniu lub skompilowaniu oprogramowania klienta jesteś gotowy do jego uruchomienia. Oznacza to tylko, że musi zostać wykonane z odpowiednią konfiguracją. Klienty oferują bogate opcje konfiguracji, które mogą włączyć różne funkcje.

Zacznijmy od opcji, które mogą znacząco wpłynąć na wydajność klienta i zużycie danych. [Tryby synchronizacji](/developers/docs/nodes-and-clients/#sync-modes) reprezentują różne metody pobierania i walidacji danych blockchaina. Przed uruchomieniem węzła powinieneś zdecydować, jakiej sieci i trybu synchronizacji użyć. Najważniejsze rzeczy do rozważenia to przestrzeń dyskowa i czas synchronizacji, jakiego będzie potrzebował klient. Zwróć uwagę na dokumentację klienta, aby określić, który tryb synchronizacji jest domyślny. Jeśli Ci to nie odpowiada, wybierz inny w oparciu o poziom bezpieczeństwa, dostępne dane i koszty. Oprócz algorytmu synchronizacji możesz również ustawić przycinanie (pruning) różnych rodzajów starych danych. Przycinanie umożliwia usuwanie nieaktualnych danych, tj. usuwanie węzłów drzewa stanu, które są nieosiągalne z ostatnich bloków.

Inne podstawowe opcje konfiguracji to np. wybór sieci – Sieci głównej lub sieci testowych, włączenie punktu końcowego HTTP dla RPC lub WebSockets itp. Wszystkie funkcje i opcje można znaleźć w dokumentacji klienta. Różne konfiguracje klienta można ustawić, uruchamiając klienta z odpowiednimi flagami bezpośrednio w CLI lub pliku konfiguracyjnym. Każdy klient jest nieco inny; zawsze odwołuj się do jego oficjalnej dokumentacji lub strony pomocy, aby uzyskać szczegółowe informacje na temat opcji konfiguracji.

Do celów testowych możesz woleć uruchomić klienta w jednej z sieci testowych. [Zobacz przegląd obsługiwanych sieci](/developers/docs/nodes-and-clients/#execution-clients).

Przykłady uruchamiania klientów warstwy wykonawczej z podstawową konfiguracją można znaleźć w następnej sekcji.

#### Uruchamianie klienta warstwy wykonawczej {#reaching-rpc}

Przed uruchomieniem oprogramowania klienta Ethereum wykonaj ostatnie sprawdzenie, czy Twoje środowisko jest gotowe. Na przykład upewnij się, że:

- Jest wystarczająco dużo miejsca na dysku, biorąc pod uwagę wybraną sieć i tryb synchronizacji.
- Pamięć i procesor nie są obciążone przez inne programy.
- System operacyjny jest zaktualizowany do najnowszej wersji.
- System ma prawidłowy czas i datę.
- Twój router i zapora sieciowa akceptują połączenia na portach nasłuchujących. Domyślnie klienty Ethereum używają portu nasłuchującego (TCP) i portu odkrywania (UDP), oba domyślnie na 30303.

Najpierw uruchom swojego klienta w sieci testowej, aby upewnić się, że wszystko działa poprawnie.

Musisz zadeklarować wszelkie ustawienia klienta, które nie są domyślne na starcie. Możesz użyć flag lub pliku konfiguracyjnego, aby zadeklarować preferowaną konfigurację. Zestaw funkcji i składnia konfiguracji każdego klienta różnią się. Sprawdź dokumentację swojego klienta, aby poznać szczegóły.

Klienty warstwy wykonawczej i konsensusu komunikują się za pośrednictwem uwierzytelnionego punktu końcowego określonego w [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Aby połączyć się z klientem konsensusu, klient warstwy wykonawczej musi wygenerować [`jwtsecret`](https://jwt.io/) w znanej ścieżce. Ze względów bezpieczeństwa i stabilności klienty powinny działać na tej samej maszynie, a oba klienty muszą znać tę ścieżkę, ponieważ służy ona do uwierzytelniania lokalnego połączenia RPC między nimi. Klient warstwy wykonawczej musi również zdefiniować port nasłuchujący dla uwierzytelnionych interfejsów API.

Ten token jest generowany automatycznie przez oprogramowanie klienta, ale w niektórych przypadkach może być konieczne zrobienie tego samodzielnie. Możesz go wygenerować za pomocą [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Uruchamianie klienta warstwy wykonawczej {#operating-the-node}

Ta sekcja poprowadzi Cię przez uruchamianie klientów warstwy wykonawczej. Służy jedynie jako przykład podstawowej konfiguracji, która uruchomi klienta z następującymi ustawieniami:

- Określa sieć, z którą należy się połączyć, w naszych przykładach jest to Sieć główna
  - Zamiast tego możesz wybrać [jedną z sieci testowych](/developers/docs/networks/) do wstępnego przetestowania swojej konfiguracji
- Definiuje katalog danych, w którym będą przechowywane wszystkie dane, w tym blockchain
  - Upewnij się, że zastąpiłeś ścieżkę prawdziwą, np. wskazującą na dysk zewnętrzny
- Włącza interfejsy do komunikacji z klientem
  - W tym JSON-RPC i Engine API do komunikacji z klientem konsensusu
- Definiuje ścieżkę do `jwtsecret` dla uwierzytelnionego API
  - Upewnij się, że zastąpiłeś przykładową ścieżkę prawdziwą, do której klienty mają dostęp, np. `/tmp/jwtsecret`

Pamiętaj, że to tylko podstawowy przykład, wszystkie inne ustawienia zostaną ustawione na domyślne. Zwróć uwagę na dokumentację każdego klienta, aby dowiedzieć się o domyślnych wartościach, ustawieniach i funkcjach. Aby uzyskać więcej funkcji, na przykład do uruchamiania walidatorów, monitorowania itp., zapoznaj się z dokumentacją konkretnego klienta.

> Zauważ, że ukośniki odwrotne (backslashe) `\` w przykładach służą tylko do celów formatowania; flagi konfiguracyjne można zdefiniować w jednej linii.

##### Running Besu {#keeping-node-online}

Ten przykład uruchamia Besu w Sieci głównej, przechowuje dane blockchaina w domyślnym formacie w `/data/ethereum`, włącza JSON-RPC i Engine RPC do łączenia klienta konsensusu. Engine API jest uwierzytelniane za pomocą tokena `jwtsecret` i dozwolone są tylko wywołania z `localhost`.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu ma również opcję launchera, który zada serię pytań i wygeneruje plik konfiguracyjny. Uruchom interaktywny launcher za pomocą:

```sh
besu --Xlauncher
```

[Dokumentacja Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) zawiera dodatkowe opcje i szczegóły konfiguracji.

##### Running Erigon {#creating-client-services}

Ten przykład uruchamia Erigona w Sieci głównej, przechowuje dane blockchaina w `/data/ethereum`, włącza JSON-RPC, definiuje, które przestrzenie nazw są dozwolone i włącza uwierzytelnianie do łączenia klienta konsensusu, które jest zdefiniowane przez ścieżkę `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon domyślnie wykonuje pełną synchronizację z 8 GB HDD, co spowoduje powstanie ponad 2 TB danych archiwalnych. Upewnij się, że `datadir` wskazuje na dysk z wystarczającą ilością wolnego miejsca lub zapoznaj się z flagą `--prune`, która może przycinać różne rodzaje danych. Sprawdź `--help` Erigona, aby dowiedzieć się więcej.

##### Running Geth {#updating-clients}

Ten przykład uruchamia Getha w Sieci głównej, przechowuje dane blockchaina w `/data/ethereum`, włącza JSON-RPC i definiuje, które przestrzenie nazw są dozwolone. Włącza również uwierzytelnianie do łączenia klienta konsensusu, co wymaga ścieżki do `jwtsecret`, a także opcji definiującej, które połączenia są dozwolone, w naszym przykładzie tylko z `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Sprawdź [dokumentację dla wszystkich opcji konfiguracji](https://geth.ethereum.org/docs/fundamentals/command-line-options) i dowiedz się więcej o [uruchamianiu Getha z klientem konsensusu](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Running Nethermind {#running-additional-services}

Nethermind oferuje różne [opcje instalacji](https://docs.nethermind.io/get-started/installing-nethermind). Pakiet zawiera różne pliki binarne, w tym Launcher z konfiguracją z przewodnikiem, który pomoże Ci interaktywnie utworzyć konfigurację. Alternatywnie znajdziesz Runnera, który jest samym plikiem wykonywalnym i możesz go po prostu uruchomić z flagami konfiguracyjnymi. JSON-RPC jest włączone domyślnie.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Dokumentacja Nethermind oferuje [kompletny przewodnik](https://docs.nethermind.io/get-started/running-node/) dotyczący uruchamiania Nethermind z klientem konsensusu.

Klient warstwy wykonawczej zainicjuje swoje podstawowe funkcje, wybrane punkty końcowe i zacznie szukać węzłów równorzędnych (peers). Po pomyślnym odkryciu węzłów równorzędnych klient rozpoczyna synchronizację. Klient warstwy wykonawczej będzie oczekiwał na połączenie od klienta konsensusu. Aktualne dane blockchaina będą dostępne, gdy klient zostanie pomyślnie zsynchronizowany z bieżącym stanem.

##### Running Reth {#monitoring-the-node}

Ten przykład uruchamia Retha w Sieci głównej, używając domyślnej lokalizacji danych. Włącza uwierzytelnianie JSON-RPC i Engine RPC do łączenia klienta konsensusu, które jest zdefiniowane przez ścieżkę `jwtsecret`, przy czym dozwolone są tylko wywołania z `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Zobacz [Konfiguracja Retha](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth), aby dowiedzieć się więcej o domyślnych katalogach danych. [Dokumentacja Retha](https://reth.rs/run/mainnet.html) zawiera dodatkowe opcje i szczegóły konfiguracji.

#### Uruchamianie klienta konsensusu {#further-reading}

Klient konsensusu musi zostać uruchomiony z odpowiednią konfiguracją portów, aby ustanowić lokalne połączenie RPC z klientem warstwy wykonawczej. Klienty konsensusu muszą być uruchamiane z wystawionym portem klienta warstwy wykonawczej jako argumentem konfiguracji.

Klient konsensusu potrzebuje również ścieżki do `jwt-secret` klienta warstwy wykonawczej w celu uwierzytelnienia połączenia RPC między nimi. Podobnie jak w powyższych przykładach warstwy wykonawczej, każdy klient konsensusu ma flagę konfiguracyjną, która przyjmuje ścieżkę pliku tokena jwt jako argument. Musi to być spójne ze ścieżką `jwtsecret` podaną klientowi warstwy wykonawczej.

Jeśli planujesz uruchomić walidator, upewnij się, że dodałeś flagę konfiguracyjną określającą adres Ethereum odbiorcy opłat (fee recipient). To tutaj gromadzą się nagrody w etherze dla Twojego walidatora. Każdy klient konsensusu ma opcję, np. `--suggested-fee-recipient=0xabcd1`, która przyjmuje adres Ethereum jako argument.

Uruchamiając węzeł Beacon w sieci testowej, możesz zaoszczędzić znaczną ilość czasu synchronizacji, używając publicznego punktu końcowego dla [synchronizacji z punktem kontrolnym (Checkpoint sync)](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Uruchamianie klienta konsensusu {#related-topics}

##### Running Lighthouse

Przed uruchomieniem Lighthouse dowiedz się więcej o tym, jak go zainstalować i skonfigurować w [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Running Lodestar

Zainstaluj oprogramowanie Lodestar, kompilując je lub pobierając obraz Dockera. Dowiedz się więcej w [dokumentacji](https://chainsafe.github.io/lodestar/) i bardziej kompleksowym [przewodniku konfiguracji](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Running Nimbus

Nimbus jest dostarczany zarówno z klientem konsensusu, jak i warstwy wykonawczej. Może być uruchamiany na różnych urządzeniach, nawet o bardzo skromnej mocy obliczeniowej.
Po [zainstalowaniu zależności i samego Nimbusa](https://nimbus.guide/quick-start.html) możesz uruchomić jego klienta konsensusu:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Running Prysm

Prysm jest dostarczany ze skryptem, który umożliwia łatwą automatyczną instalację. Szczegóły można znaleźć w [dokumentacji Prysma](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Running Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Kiedy klient konsensusu łączy się z klientem warstwy wykonawczej, aby odczytać kontrakt depozytowy i zidentyfikować walidatory, łączy się również z innymi węzłami równorzędnymi węzła Beacon i rozpoczyna synchronizację slotów konsensusu od bloku genezy (genesis). Gdy węzeł Beacon osiągnie bieżącą epokę, Beacon API staje się użyteczne dla Twoich walidatorów. Dowiedz się więcej o [interfejsach API węzła Beacon](https://eth2docs.vercel.app/).

### Dodawanie walidatorów

Klient konsensusu służy jako węzeł Beacon, do którego mogą łączyć się walidatory. Każdy klient konsensusu ma własne oprogramowanie walidatora opisane szczegółowo w odpowiedniej dokumentacji.

Uruchomienie własnego walidatora pozwala na [staking solo](/staking/solo/), najbardziej wpływową i niewymagającą zaufania metodę wspierania sieci Ethereum. Wymaga to jednak depozytu w wysokości 32 ETH. Aby uruchomić walidator na własnym węźle z mniejszą kwotą, może Cię zainteresować zdecentralizowana pula z niewymagającymi pozwoleń operatorami węzłów, taka jak [Rocket Pool](https://rocketpool.net/node-operators).

Najłatwiejszym sposobem na rozpoczęcie stakingu i generowania kluczy walidatora jest użycie [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org/), co pozwala przetestować konfigurację poprzez [uruchomienie węzłów w sieci Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Kiedy będziesz gotowy na Sieć główną, możesz powtórzyć te kroki, używając [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Zajrzyj na [stronę o stakingu](/staking), aby zapoznać się z przeglądem opcji stakingu.

### Korzystanie z węzła

Klienty warstwy wykonawczej oferują [punkty końcowe RPC API](/developers/docs/apis/json-rpc/), których możesz użyć do przesyłania transakcji, interakcji z inteligentnymi kontraktami lub ich wdrażania w sieci Ethereum na różne sposoby:

- Ręczne wywoływanie ich za pomocą odpowiedniego protokołu (np. używając `curl`)
- Dołączanie dostarczonej konsoli (np. `geth attach`)
- Implementowanie ich w aplikacjach przy użyciu bibliotek Web3, np. [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Różne klienty mają różne implementacje punktów końcowych RPC. Istnieje jednak standardowe JSON-RPC, którego możesz używać z każdym klientem. Aby uzyskać przegląd, [przeczytaj dokumentację JSON-RPC](/developers/docs/apis/json-rpc/). Aplikacje, które potrzebują informacji z sieci Ethereum, mogą korzystać z tego RPC. Na przykład popularny portfel MetaMask pozwala na [połączenie z własnym punktem końcowym RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node), co ma duże korzyści dla prywatności i bezpieczeństwa.

Wszystkie klienty konsensusu udostępniają [Beacon API](https://ethereum.github.io/beacon-APIs), którego można użyć do sprawdzenia statusu klienta konsensusu lub pobrania bloków i danych konsensusu, wysyłając żądania za pomocą narzędzi takich jak [Curl](https://curl.se). Więcej informacji na ten temat można znaleźć w dokumentacji każdego klienta konsensusu.

#### Dostęp do RPC

Domyślnym portem dla JSON-RPC klienta warstwy wykonawczej jest `8545`, ale możesz zmodyfikować porty lokalnych punktów końcowych w konfiguracji. Domyślnie interfejs RPC jest osiągalny tylko na hoście lokalnym (localhost) Twojego komputera. Aby uczynić go zdalnie dostępnym, możesz chcieć wystawić go publicznie, zmieniając adres na `0.0.0.0`. Dzięki temu będzie on osiągalny przez sieć lokalną i publiczne adresy IP. W większości przypadków będziesz musiał również skonfigurować przekierowanie portów na swoim routerze.

Podchodź do wystawiania portów do Internetu z ostrożnością, ponieważ pozwoli to każdemu w Internecie kontrolować Twój węzeł. Złośliwi aktorzy mogą uzyskać dostęp do Twojego węzła, aby wyłączyć Twój system lub ukraść Twoje środki, jeśli używasz swojego klienta jako portfela.

Sposobem na obejście tego jest zapobieganie modyfikowaniu potencjalnie szkodliwych metod RPC. Na przykład w Geth możesz zadeklarować modyfikowalne metody za pomocą flagi: `--http.api web3,eth,txpool`.

Dostęp do interfejsu RPC można rozszerzyć poprzez rozwój interfejsów API warstwy brzegowej (edge layer) lub aplikacji serwera WWW, takich jak Nginx, i połączenie ich z lokalnym adresem i portem klienta. Wykorzystanie warstwy pośredniej może również umożliwić deweloperom skonfigurowanie certyfikatu dla bezpiecznych połączeń `https` z interfejsem RPC.

Konfiguracja serwera WWW, proxy lub zewnętrznego Rest API to nie jedyny sposób na zapewnienie dostępu do punktu końcowego RPC Twojego węzła. Innym sposobem na skonfigurowanie publicznie dostępnego punktu końcowego z zachowaniem prywatności jest hostowanie węzła we własnej usłudze cebulowej (onion service) [Tor](https://www.torproject.org/). Pozwoli to na dotarcie do RPC poza siecią lokalną bez statycznego publicznego adresu IP lub otwartych portów. Jednak użycie tej konfiguracji może pozwolić na dostęp do punktu końcowego RPC tylko przez sieć Tor, co nie jest obsługiwane przez wszystkie aplikacje i może powodować problemy z połączeniem.

Aby to zrobić, musisz utworzyć własną [usługę cebulową](https://community.torproject.org/onion-services/). Sprawdź [dokumentację](https://community.torproject.org/onion-services/setup/) dotyczącą konfiguracji usługi cebulowej, aby hostować własną. Możesz skierować ją do serwera WWW z proxy do portu RPC lub po prostu bezpośrednio do RPC.

Wreszcie, jednym z najpopularniejszych sposobów zapewnienia dostępu do sieci wewnętrznych jest połączenie VPN. W zależności od przypadku użycia i liczby użytkowników potrzebujących dostępu do Twojego węzła, bezpieczne połączenie VPN może być dobrą opcją. [OpenVPN](https://openvpn.net/) to w pełni funkcjonalny SSL VPN, który implementuje bezpieczne rozszerzenie sieci w warstwie 2 lub 3 modelu OSI przy użyciu standardowego protokołu SSL/TLS, obsługuje elastyczne metody uwierzytelniania klientów oparte na certyfikatach, kartach inteligentnych i/lub poświadczeniach nazwy użytkownika/hasła oraz umożliwia stosowanie zasad kontroli dostępu specyficznych dla użytkownika lub grupy przy użyciu reguł zapory sieciowej zastosowanych do wirtualnego interfejsu VPN.

### Obsługa węzła

Powinieneś regularnie monitorować swój węzeł, aby upewnić się, że działa prawidłowo. Może być konieczna sporadyczna konserwacja.

#### Utrzymywanie węzła online

Twój węzeł nie musi być online przez cały czas, ale powinieneś utrzymywać go online tak bardzo, jak to możliwe, aby był zsynchronizowany z siecią. Możesz go wyłączyć, aby go zrestartować, ale pamiętaj, że:

- Wyłączanie może potrwać kilka minut, jeśli ostatni stan jest nadal zapisywany na dysku.
- Wymuszone wyłączenia mogą uszkodzić bazę danych, wymagając ponownej synchronizacji całego węzła.
- Twój klient utraci synchronizację z siecią i będzie musiał zsynchronizować się ponownie po ponownym uruchomieniu. Chociaż węzeł może rozpocząć synchronizację od miejsca, w którym został ostatnio wyłączony, proces ten może zająć trochę czasu w zależności od tego, jak długo był offline.

_Nie dotyczy to węzłów walidatorów warstwy konsensusu._ Przełączenie węzła w tryb offline wpłynie na wszystkie zależne od niego usługi. Jeśli uruchamiasz węzeł w celach _stakingu_, powinieneś starać się zminimalizować przestoje tak bardzo, jak to możliwe.

#### Tworzenie usług klienta

Rozważ utworzenie usługi, która będzie automatycznie uruchamiać Twoje klienty podczas startu systemu. Na przykład na serwerach Linux dobrą praktyką byłoby utworzenie usługi, np. za pomocą `systemd`, która wykonuje klienta z odpowiednią konfiguracją, na koncie użytkownika z ograniczonymi uprawnieniami i automatycznie się restartuje.

#### Aktualizacja klientów

Musisz aktualizować oprogramowanie klienta o najnowsze poprawki bezpieczeństwa, funkcje i [EIP](/eips/). Zwłaszcza przed [hard forkami](/ethereum-forks/) upewnij się, że używasz prawidłowych wersji klienta.

> Przed ważnymi aktualizacjami sieci EF publikuje post na swoim [blogu](https://blog.ethereum.org). Możesz [zasubskrybować te ogłoszenia](https://blog.ethereum.org/category/protocol#subscribe), aby otrzymać powiadomienie na swój e-mail, gdy Twój węzeł będzie wymagał aktualizacji.

Aktualizacja klientów jest bardzo prosta. Każdy klient ma określone instrukcje w swojej dokumentacji, ale proces ten polega zazwyczaj na pobraniu najnowszej wersji i ponownym uruchomieniu klienta z nowym plikiem wykonywalnym. Klient powinien wznowić pracę w miejscu, w którym ją przerwał, ale z zastosowanymi aktualizacjami.

Każda implementacja klienta ma czytelny dla człowieka ciąg wersji używany w protokole peer-to-peer, ale jest on również dostępny z wiersza poleceń. Ten ciąg wersji pozwala użytkownikom sprawdzić, czy uruchamiają poprawną wersję, i umożliwia eksploratorom bloków oraz innym narzędziom analitycznym zainteresowanym ilościowym określeniem dystrybucji określonych klientów w sieci. Więcej informacji na temat ciągów wersji można znaleźć w dokumentacji poszczególnych klientów.

#### Uruchamianie dodatkowych usług

Uruchomienie własnego węzła pozwala na korzystanie z usług, które wymagają bezpośredniego dostępu do RPC klienta Ethereum. Są to usługi zbudowane na bazie Ethereum, takie jak [rozwiązania warstwy 2](/developers/docs/scaling/#layer-2-scaling), backend dla portfeli, eksploratory bloków, narzędzia deweloperskie i inna infrastruktura Ethereum.

#### Monitorowanie węzła

Aby prawidłowo monitorować swój węzeł, rozważ zbieranie metryk. Klienty udostępniają punkty końcowe metryk, dzięki czemu możesz uzyskać kompleksowe dane o swoim węźle. Użyj narzędzi takich jak [InfluxDB](https://www.influxdata.com/get-influxdb/) lub [Prometheus](https://prometheus.io/), aby utworzyć bazy danych, które możesz zamienić w wizualizacje i wykresy w oprogramowaniu takim jak [Grafana](https://grafana.com/). Istnieje wiele konfiguracji do korzystania z tego oprogramowania i różnych pulpitów nawigacyjnych Grafana do wizualizacji Twojego węzła i sieci jako całości. Na przykład sprawdź [samouczek dotyczący monitorowania Getha](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

W ramach monitorowania upewnij się, że masz oko na wydajność swojej maszyny. Podczas początkowej synchronizacji węzła oprogramowanie klienta może bardzo obciążać procesor i pamięć RAM. Oprócz Grafany możesz użyć narzędzi oferowanych przez Twój system operacyjny, takich jak `htop` lub `uptime`, aby to zrobić.

## Dalsza lektura

- [Przewodniki po stakingu Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) – _Somer Esat, często aktualizowane_
- [Przewodnik | Jak skonfigurować walidator do stakingu Ethereum w Sieci głównej](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, często aktualizowane_
- [Przewodniki ETHStaker dotyczące uruchamiania walidatorów w sieciach testowych](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, regularnie aktualizowane_
- [Przykładowa aplikacja AWS Blockchain Node Runner dla węzłów Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) – _AWS, często aktualizowane_
- [FAQ dotyczące The Merge dla operatorów węzłów](https://notes.ethereum.org/@launchpad/node-faq-merge) – _Lipiec 2022_
- [Analiza wymagań sprzętowych dla w pełni zwalidowanego węzła Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 września 2018_
- [Uruchamianie pełnych węzłów Ethereum: Przewodnik dla ledwie zmotywowanych](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 listopada 2019_
- [Uruchamianie węzła Hyperledger Besu w sieci głównej Ethereum: Korzyści, wymagania i konfiguracja](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 maja 2020_
- [Wdrażanie klienta Ethereum Nethermind ze stosem monitorującym](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 lipca 2020_

## Powiązane tematy

- [Węzły i klienty](/developers/docs/nodes-and-clients/)
- [Bloki](/developers/docs/blocks/)
- [Sieci](/developers/docs/networks/)