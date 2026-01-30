---
title: Rozkręć swój własny węzeł Ethereum
description: Ogólne wprowadzenie do uruchamiania własnej instancji klienta Ethereum.
lang: pl
sidebarDepth: 2
---

Uruchomienie własnego węzła zapewnia różne korzyści, otwiera nowe możliwości i pomaga wspierać ekosystem. Ta strona poprowadzi Cię przez proces tworzenia własnego węzła i udziału w walidacji transakcji Ethereum.

Należy pamiętać, że po [The Merge](/roadmap/merge) do uruchomienia węzła Ethereum wymagane są dwa klienty: klient **warstwy wykonawczej (EL)** i klient **warstwy konsensusu (CL)**. Ta strona pokaże, jak zainstalować, skonfigurować i połączyć te dwa klienty w celu uruchomienia węzła Ethereum.

## Wymagania wstępne {#prerequisites}

Wymagana jest wiedza na temat tego, czym jest węzeł Ethereum i dlaczego możesz chcieć uruchomić klienta. Jest to omówione w [Węzły i klienci](/developers/docs/nodes-and-clients/).

Jeśli jesteś nowy w temacie uruchamiania węzła lub szukasz mniej technicznej ścieżki, zalecamy najpierw sprawdzenie naszego przyjaznego dla użytkownika wprowadzenia na temat [uruchamiania węzła Ethereum](/run-a-node).

## Wybór podejścia {#choosing-approach}

Pierwszym krokiem w stworzeniu swojego węzła jest wybranie podejścia. Na podstawie wymagań i różnych możliwości należy wybrać implementację klienta (zarówno klienta wykonawczego, jak i klienta konsensusu), środowisko (sprzęt, system) oraz parametry ustawień klienta.

Ta strona poprowadzi Cię przez te decyzje i pomoże Ci znaleźć najbardziej odpowiedni sposób na uruchomienie instancji Ethereum.

Aby wybrać spośród implementacji klientów, zobacz wszystkich dostępnych gotowych na sieć główną [klientów wykonawczych](/developers/docs/nodes-and-clients/#execution-clients), [klientów konsensusu](/developers/docs/nodes-and-clients/#consensus-clients) i dowiedz się o [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity).

Zdecyduj, czy uruchomić oprogramowanie na własnym [sprzęcie, czy w chmurze](#local-vs-cloud), biorąc pod uwagę [wymagania](#requirements) klientów.

Po przygotowaniu środowiska zainstaluj wybrane klienty za pomocą [przyjaznego dla początkujących interfejsu](#automatized-setup) lub [ręcznie](#manual-setup) za pomocą terminala z zaawansowanymi opcjami.

Gdy węzeł jest uruchomiony i synchronizuje się, jesteś gotowy, aby [go używać](#using-the-node), ale pamiętaj, aby mieć oko na jego [konserwację](#operating-the-node).

![Konfiguracja klienta](./diagram.png)

### Środowisko i sprzęt {#environment-and-hardware}

#### Lokalnie czy w chmurze {#local-vs-cloud}

Klienci Ethereum mogą działać na komputerach klasy konsumenckiej i nie wymagają żadnego specjalnego sprzętu, takiego jak na przykład maszyny górnicze. W związku z tym dostępne są różne opcje wdrażania węzła w zależności od Twoich potrzeb.
Dla uproszczenia pomyślmy o uruchomieniu węzła zarówno na lokalnej maszynie fizycznej, jak i na serwerze w chmurze:

- Chmura
  - Dostawcy oferują wysoki czas pracy serwerów i statyczne publiczne adresy IP
  - Uzyskanie dedykowanego lub wirtualnego serwera może być wygodniejsze niż budowanie własnego
  - Kompromisem jest zaufanie stronie trzeciej — dostawcy serwera
  - Ze względu na wymagany rozmiar pamięci dla pełnego węzła, cena wynajmowanego serwera może być wysoka
- Własny sprzęt
  - Bardziej zaufane i niezależne podejście
  - Jednorazowa inwestycja
  - Opcja zakupu wstępnie skonfigurowanych maszyn
  - Musisz fizycznie przygotować, konserwować i potencjalnie rozwiązywać problemy z maszyną i siecią

Obydwie opcje mają różne zalety podsumowane powyżej. Jeśli szukasz rozwiązania w chmurze, oprócz wielu tradycyjnych dostawców chmury obliczeniowej, istnieją również usługi skoncentrowane na wdrażaniu węzłów. Sprawdź [węzły jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service/), aby poznać więcej opcji dotyczących hostowanych węzłów.

#### Sprzęt {#hardware}

Jednakże odporna na cenzurę, zdecentralizowana sieć nie powinna polegać na dostawcach usług w chmurze. Zamiast tego uruchomienie węzła na własnym lokalnym sprzęcie jest korzystniejsze dla ekosystemu. [Szacunki](https://www.ethernodes.org/networkType/cl/Hosting) pokazują, że duża część węzłów działa w chmurze, co może stać się pojedynczym punktem awarii.

Klienci Ethereum mogą działać na komputerze, laptopie, serwerze, a nawet komputerze jednopłytkowym. Chociaż uruchamianie klientów na komputerze osobistym jest możliwe, posiadanie dedykowanej maszyny tylko dla węzła może znacznie zwiększyć jego wydajność i bezpieczeństwo, jednocześnie minimalizując wpływ na Twój główny komputer.

Używanie własnego sprzętu może być bardzo proste. Istnieje wiele prostych opcji, a także zaawansowanych konfiguracji dla bardziej technicznych osób. Zatem przyjrzyjmy się wymaganiom i sposobom uruchamiania klientów Ethereum na Twojej maszynie.

#### Wymagania {#requirements}

Wymagania sprzętowe różnią się w zależności od klienta, ale zazwyczaj nie są wysokie, ponieważ węzeł musi po prostu pozostać zsynchronizowany. Nie należy mylić tego z kopaniem, które wymaga dużo większej mocy obliczeniowej. Jednak czas synchronizacji i wydajność poprawiają się dzięki mocniejszemu sprzętowi.

Przed zainstalowaniem klienta upewnij się, że komputer ma wystarczającą ilość zasobów, aby go uruchomić. Poniżej możesz znaleźć minimalne i zalecane wymagania.

Przeszkodą dla Twojego sprzętu jest najczęściej pamięć dyskowa. Synchronizacja blockchainu Ethereum jest bardzo intensywna na dane wejściowe/wyjściowe i wymaga dużo miejsca. Najlepiej mieć **dysk półprzewodnikowy (SSD)** z setkami GB wolnego miejsca, nawet po synchronizacji.

Rozmiar bazy danych i szybkość początkowej synchronizacji zależy od wybranego klienta, jego konfiguracji i [strategii synchronizacji](/developers/docs/nodes-and-clients/#sync-modes).

Upewnij się również, że twoje połączenie internetowe nie jest ograniczone przez [limit przepustowości](https://wikipedia.org/wiki/Data_cap). Zaleca się korzystanie z połączenia nielimitowanego, ponieważ początkowa synchronizacja i dane transmitowane do sieci mogą przekroczyć Twój limit.

##### System operacyjny

Wszystkie klienty obsługują główne systemy operacyjne — Linux, MacOS, Windows. Oznacza to, że możesz uruchamiać węzły na zwykłych komputerach stacjonarnych lub serwerach z systemem operacyjnym (OS), który najbardziej Ci odpowiada. Upewnij się, że Twój system operacyjny jest aktualny, aby uniknąć potencjalnych problemów i luk w zabezpieczeniach.

##### Wymagania minimalne

- Procesor z co najmniej 2 rdzeniami
- 8 GB RAM
- 2 TB SSD
- Przepustowość ponad 10MBit/s

##### Zalecane specyfikacje

- Szybki procesor z ponad 4 rdzeniami
- 16 GB+ RAM
- Szybki dysk SSD o pojemności ponad 2 TB
- Przepustowość ponad 25MBit/s

Wybrany tryb synchronizacji i klient będą miały wpływ na wymagania pamięciowe, ale poniżej oszacowaliśmy przestrzeń dyskową potrzebną dla każdego klienta.

| Klient     | Rozmiar dysku (synchronizacja snap) | Rozmiar dysku (pełne archiwum) |
| ---------- | ------------------------------------------------------ | ------------------------------------------------- |
| Besu       | Ponad 800 GB                                           | Ponad 12 TB                                       |
| Erigon     | nd.                                    | Ponad 2,5 TB                                      |
| Geth       | Ponad 500 GB                                           | Ponad 12 TB                                       |
| Nethermind | Ponad 500 GB                                           | Ponad 12 TB                                       |
| Reth       | nd.                                    | Ponad 2,2 TB                                      |

- Uwaga: Erigon i Reth nie oferują synchronizacji snap, ale możliwe jest pełne przycinanie (około 2 TB dla Erigon i około 1,2 TB dla Reth)

W przypadku klientów konsensusu zapotrzebowanie na miejsce również zależy od implementacji klienta i włączonych funkcji (np. slasher walidatora), ale ogólnie należy liczyć się z kolejnymi 200 GB potrzebnymi na dane beacon. Przy dużej liczbie walidatorów rośnie również obciążenie przepustowości. Możesz znaleźć [szczegóły dotyczące wymagań klienta konsensusu w tej analizie](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Rozwiązania plug-and-play {#plug-and-play}

Najłatwiejszą opcją uruchomienia węzła z własnym sprzętem jest użycie skrzynek typu Plug and Play. Wstępnie skonfigurowane maszyny od dostawców oferują najprostsze doświadczenie: zamów, podłącz, uruchom. Wszystko jest wstępnie skonfigurowane i działa automatycznie z intuicyjnym przewodnikiem i pulpitem nawigacyjnym do monitorowania i kontrolowania oprogramowania.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum na komputerze jednopłytkowym {#ethereum-on-a-single-board-computer}

Łatwym i tanim sposobem na uruchomienie węzła Ethereum jest użycie komputera jednopłytkowego, nawet z architekturą ARM jak Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) zapewnia łatwe do uruchomienia obrazy wielu klientów wykonawczych i konsensusu dla Raspberry Pi i innych płyt ARM.

Małe, opłacalne i wydajne urządzenia tego typu są idealne do uruchomienia węzła w domu, ale należy pamiętać o ich ograniczonej wydajności.

## Uruchamianie węzła {#spinning-up-node}

Rzeczywistą konfigurację klienta można przeprowadzić za pomocą automatycznych launcherów lub ręcznie, bezpośrednio konfigurując oprogramowanie klienta.

Dla mniej doświadczonych użytkowników zalecanym podejściem jest użycie launchera, oprogramowania, które prowadzi użytkownika przez instalację i automatyzuje proces konfiguracji klienta. Jeśli jednak masz pewne doświadczenie w korzystaniu z terminala, kroki ręcznej konfiguracji powinny być łatwe do wykonania.

### Instalacja z przewodnikiem {#automatized-setup}

Wiele łatwych w obsłudze projektów ma na celu poprawę doświadczenia związanego z konfiguracją klienta. Te launchery zapewniają automatyczną instalację i konfigurację klienta, a niektóre oferują nawet interfejs graficzny z przewodnikiem konfiguracji i monitorowania klientów.

Poniżej jest kilka projektów, które mogą pomóc Ci w instalacji i kontroli klientów za pomocą kilku kliknięć:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) – DappNode to nie tylko maszyna od dostawcy. Oprogramowanie, rzeczywisty launcher węzła i centrum sterowania z wieloma funkcjami mogą być używane na dowolnym sprzęcie.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) – najszybszy i najłatwiejszy sposób na skonfigurowanie pełnego węzła. Narzędzie do konfiguracji za pomocą jednej linijki i TUI do zarządzania węzłem. Bezpłatne. Otwarte źródło. Dobra publiczne dla Ethereum od solo stakerów. Wsparcie dla ARM64 i AMD64.
- [eth-docker](https://eth-docker.net/) – zautomatyzowana konfiguracja przy użyciu Dockera, skoncentrowana na łatwym i bezpiecznym stakingu, wymaga podstawowej znajomości terminala i Dockera, zalecana dla nieco bardziej zaawansowanych użytkowników.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) – launcher do instalowania klientów na zdalnym serwerze przez połączenie SSH, z graficznym przewodnikiem konfiguracji, centrum sterowania i wieloma innymi funkcjami.
- [NiceNode](https://www.nicenode.xyz/) – launcher z prostym interfejsem użytkownika do uruchamiania węzła na komputerze. Po prostu wybierz klientów i uruchom je za pomocą kilku kliknięć. Wciąż w fazie rozwoju.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) – narzędzie do konfiguracji węzła, które automatycznie generuje konfigurację Dockera za pomocą kreatora CLI. Napisane w Go przez Nethermind.

### Ręczna konfiguracja klientów {#manual-setup}

Inną opcją jest ręczne pobranie, zweryfikowanie i skonfigurowanie oprogramowania klienta. Nawet jeśli niektóre klienty oferują interfejs graficzny, ręczna konfiguracja nadal wymaga podstawowych umiejętności obsługi terminala, ale oferuje znacznie większą uniwersalność.

Jak wyjaśniono wcześniej, skonfigurowanie własnego węzła Ethereum będzie wymagało uruchomienia pary klientów konsensusu i wykonawczego. Niektóre klienty mogą zawierać lekkiego klienta innego rodzaju i synchronizować się bez potrzeby innego oprogramowania. Jednak pełna weryfikacja niewymagająca zaufania wymaga obu implementacji.

#### Pobieranie oprogramowania klienta {#getting-the-client}

Najpierw musisz pobrać preferowane oprogramowanie [klienta wykonawczego](/developers/docs/nodes-and-clients/#execution-clients) i [klienta konsensusu](/developers/docs/nodes-and-clients/#consensus-clients).

Możesz pobrać po prostu wykonywalną aplikację lub pakiet instalacyjny, który pasuje do Twojego systemu operacyjnego i architektury. Zawsze weryfikuj podpisy i sumy kontrolne pobranych pakietów. Niektóre klienty oferują również repozytoria lub obrazy Docker w celu łatwiejszej instalacji i aktualizacji. Wszystkie klienty są open source, więc możesz je również zbudować ze źródeł. Jest to bardziej zaawansowana metoda, ale w niektórych przypadkach może być wymagana.

Instrukcje dotyczące instalacji każdego klienta znajdują się w dokumentacji powiązanej z powyższymi listami klientów.

Oto strony wydań klientów, na których możesz znaleźć ich wstępnie zbudowane pliki binarne lub instrukcje dotyczące instalacji:

##### Klienty wykonawcze

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Warto również zauważyć, że różnorodność klientów jest [problemem na warstwie wykonawczej](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Zaleca się, aby czytelnicy rozważyli uruchomienie mniejszościowego klienta wykonawczego.

##### Klienty konsensusu

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source) (nie zapewnia gotowej kompilacji binarnej, tylko obraz Docker lub do zbudowania ze źródła)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/) jest kluczowa dla węzłów konsensusu uruchamiających walidatorów. Jeśli większość walidatorów korzysta z pojedynczej implementacji klienta, bezpieczeństwo sieci jest zagrożone. Dlatego zaleca się rozważenie wyboru klienta mniejszościowego.

[Zobacz najnowsze wykorzystanie klientów sieciowych](https://clientdiversity.org/) i dowiedz się więcej o [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity).

##### Weryfikowanie oprogramowania

Podczas pobierania oprogramowania z Internetu zaleca się sprawdzenie jego autentyczności. Ten krok jest opcjonalny, ale szczególnie w przypadku kluczowego elementu infrastruktury, takiego jak klient Ethereum, ważne jest, aby być świadomym potencjalnych możliwości ataku i unikać ich. Jeśli pobrałeś wstępnie zbudowany plik binarny, musisz mu zaufać i ryzykować tym, że atakujący może podmienić plik wykonywalny na złośliwy.

Deweloperzy podpisują wydane pliki binarne swoimi kluczami PGP, dzięki czemu można kryptograficznie zweryfikować, że uruchamiasz dokładnie to oprogramowanie, które stworzyli. Wystarczy uzyskać klucze publiczne używane przez deweloperów, które można znaleźć na stronach wydania klienta lub w dokumentacji. Po pobraniu wydania klienta i jego podpisu można użyć implementacji PGP, np. [GnuPG](https://gnupg.org/download/index.html), aby łatwo je zweryfikować. Sprawdź samouczek dotyczący weryfikacji oprogramowania open-source za pomocą `gpg` w systemie [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) lub [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Inną formą weryfikacji jest upewnienie się, że hash, czyli unikalny kryptograficzny ślad, pobranego oprogramowania jest zgodny z tym podanym przez deweloperów. Jest to nawet prostsze niż korzystanie z PGP, a niektóre klienty oferują tylko tę opcję. Wystarczy uruchomić funkcję haszującą na pobranym oprogramowaniu i porównać ją z tą ze strony wydań. Na przykład:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Konfiguracja klienta {#client-setup}

Po zainstalowaniu, pobraniu lub skompilowaniu oprogramowania klienta, można je uruchomić. Oznacza to tylko, że musi zostać wykonywane z odpowiednią konfiguracją. Klienty oferują bogate opcje konfiguracji, które mogą włączać różne funkcje.

Zacznijmy od opcji, które mogą znacząco wpłynąć na wydajność klienta i wykorzystanie danych. [Tryby synchronizacji](/developers/docs/nodes-and-clients/#sync-modes) reprezentują różne metody pobierania i walidacji danych blockchain. Przed uruchomieniem węzła musisz zdecydować, jakiej sieci i trybu synchronizacji będziesz używać. Najważniejszymi rzeczami, które należy wziąć pod uwagę, są przestrzeń dyskowa i czas synchronizacji potrzebny klientowi. Zwróć uwagę na dokumentację klienta, aby określić, który tryb synchronizacji jest domyślny. Jeśli Ci nie odpowiada, wybierz inny na podstawie poziomu bezpieczeństwa, dostępnych danych i kosztów. Oprócz algorytmu synchronizacji możesz również ustawić przycinanie różnych rodzajów starych danych. Przycinanie (pruning) umożliwia usuwanie przestarzałych danych, tj. usuwanie węzłów trie stanu, które są nieosiągalne z ostatnich bloków.

Inne podstawowe opcje konfiguracji to np. wybór sieci – sieć główna lub sieci testowe, włączenie punktu końcowego HTTP dla RPC lub WebSockets itp. Wszystkie funkcje i opcje można znaleźć w dokumentacji klienta. Różne konfiguracje klienta można ustawić, uruchamiając klienta z odpowiednimi znacznikami bezpośrednio w CLI lub pliku konfiguracyjnym. Każdy klient jest trochę inny; zawsze należy zapoznać się z jego oficjalną dokumentacją lub stroną pomocy po opcje konfiguracji.

Do celów testowych możesz chcieć uruchomić klienta w jednej z sieci testowych. [Zobacz przegląd obsługiwanych sieci](/developers/docs/nodes-and-clients/#execution-clients).

Przykłady uruchomionych klientów wykonawczych z podstawową konfiguracją można znaleźć w następnej sekcji.

#### Uruchamianie klienta wykonawczego {#starting-the-execution-client}

Przed uruchomieniem oprogramowania klienta Ethereum wykonaj ostatnie sprawdzenie, czy Twoje środowisko jest gotowe. Na przykład, upewnij się, że:

- Ilość miejsca na dysku jest wystarczająca, biorąc pod uwagę wybraną sieć i tryb synchronizacji.
- Pamięć i procesor nie są blokowane przez inne programy.
- System operacyjny jest zaktualizowany do najnowszej wersji.
- System ma ustawioną poprawną godzinę i datę.
- Twój router i zapora sieciowa akceptują połączenia na portach nasłuchujących. Domyślnie klienci Ethereum używają portu nasłuchiwania (TCP) i portu odkrywania (UDP), oba domyślnie na 30303.

Najpierw uruchom swojego klienta w sieci testowej, aby upewnić się, że wszystko działa poprawnie.

Na początku należy zadeklarować wszystkie ustawienia klienta, które nie są domyślne. Możesz użyć znaczników lub pliku konfiguracyjnego, aby zadeklarować preferowaną konfigurację. Zestaw funkcji i składnia konfiguracji każdego klienta jest inna. Szczegółowe specyfikacje można znaleźć w dokumentacji klienta.

Klienci wykonawczy i klienci konsensusu komunikują się za pośrednictwem uwierzytelnionego punktu końcowego określonego w [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Aby połączyć się z klientem konsensusu, klient wykonawczy musi wygenerować [`jwtsecret`](https://jwt.io/) w znanej ścieżce. Ze względów bezpieczeństwa i stabilności klienty powinni działać na tej samej maszynie i obaj klienci muszą znać tę ścieżkę, ponieważ jest ona używana do uwierzytelniania lokalnego połączenia RPC między nimi. Klient wykonawczy musi również określić port nasłuchiwania dla uwierzytelnionych interfejsów API.

Ten token generowany jest automatycznie przez oprogramowanie klienta, ale w niektórych przypadkach może być konieczne zrobienie tego samodzielnie. Można go wygenerować za pomocą [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Uruchamianie klienta wykonawczego {#running-an-execution-client}

Ta sekcja poprowadzi Cię przez proces uruchamiania klientów wykonawczych. Służy ona jedynie jako przykład podstawowej konfiguracji, która uruchomi klienta z tymi ustawieniami:

- Określa sieć, z którą ma się łączyć, w naszych przykładach jest to sieć główna
  - Zamiast tego możesz wybrać [jedną z sieci testowych](/developers/docs/networks/) do wstępnego testowania konfiguracji
- Określa katalog danych, w którym przechowywane będą wszystkie dane, w tym blockchain
  - Upewnij się, że zastąpiłeś ścieżkę prawdziwą, np. wskazującą na dysk zewnętrzny
- Zapewnia interfejsy do komunikacji z klientem
  - W tym JSON-RPC i Engine API do komunikacji z klientem konsensusu
- Definiuje ścieżkę do `jwtsecret` dla uwierzytelnionego API
  - Upewnij się, że przykładowa ścieżka została zastąpiona rzeczywistą, do której klienci mają dostęp, np. `/tmp/jwtsecret`

Należy pamiętać, że jest to tylko podstawowy przykład, wszystkie inne ustawienia zostaną ustawione na domyślne. Zwróć uwagę na dokumentację każdego klienta, aby dowiedzieć się o domyślnych wartościach, ustawieniach i funkcjach. Po więcej funkcji, na przykład do uruchamiania walidatorów, monitorowania itp., należy zapoznać się z dokumentacją konkretnego klienta.

> Zwróć uwagę, że ukośniki wsteczne `\` w przykładach służą jedynie do celów formatowania; flagi konfiguracyjne można zdefiniować w jednej linii.

##### Uruchamianie Besu

Ten przykład uruchamia Besu w sieci głównej, przechowuje dane blockchainu w domyślnym formacie w `/data/ethereum`, włącza JSON-RPC i Engine RPC do łączenia klienta konsensusu. Engine API jest uwierzytelniane za pomocą tokena `jwtsecret` i dozwolone są tylko wywołania z `localhost`.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu posiada również opcję launchera, który zada serię pytań i wygeneruje plik konfiguracyjny. Uruchom interaktywny launcher za pomocą:

```sh
besu --Xlauncher
```

[Dokumentacja Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) zawiera dodatkowe opcje i szczegóły konfiguracji.

##### Uruchamianie Erigon

Ten przykład uruchamia Erigon w sieci głównej, przechowuje dane blockchainu w `/data/ethereum`, włącza JSON-RPC, definiuje dozwolone przestrzenie nazw i włącza uwierzytelnianie do łączenia klienta konsensusu, który jest zdefiniowany przez ścieżkę `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon domyślnie wykonuje pełną synchronizację z dyskiem HDD o pojemności 8 GB, co stworzy ponad 2 TB danych archiwalnych. Upewnij się, że `datadir` wskazuje dysk z wystarczającą ilością wolnego miejsca lub zapoznaj się z flagą `--prune`, która może przycinać różne rodzaje danych. Sprawdź `--help` Erigona, aby dowiedzieć się więcej.

##### Uruchamianie Geth

Ten przykład uruchamia Geth w sieci głównej, przechowuje dane blockchainu w `/data/ethereum`, włącza JSON-RPC i definiuje dozwolone przestrzenie nazw. Umożliwia również uwierzytelnianie do łączenia klienta konsensusu, co wymaga ścieżki do `jwtsecret`, a także opcji definiującej, które połączenia są dozwolone, w naszym przykładzie tylko z `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Sprawdź [dokumentację wszystkich opcji konfiguracyjnych](https://geth.ethereum.org/docs/fundamentals/command-line-options) i dowiedz się więcej o [uruchamianiu Geth z klientem konsensusu](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Uruchamianie Nethermind

Nethermind oferuje różne [opcje instalacji](https://docs.nethermind.io/get-started/installing-nethermind). Pakiet zawiera różne pliki binarne, w tym launcher z przewodnikiem konfiguracji, który pomoże ci interaktywnie utworzyć konfigurację. Alternatywnie możesz znaleźć Runner, który jest plikiem wykonywalnym i możesz go uruchomić ze znacznikami konfiguracyjnymi. JSON-RPC jest domyślnie włączony.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Dokumentacja Nethermind oferuje [kompletny przewodnik](https://docs.nethermind.io/get-started/running-node/) po uruchamianiu Nethermind z klientem konsensusu.

Klient wykonawczy zainicjuje swoje podstawowe funkcje, wybrane punkty końcowe i zacznie szukać rówieśników. Po pomyślnym wykryciu rówieśników klient rozpocznie synchronizację. Klient wykonawczy będzie oczekiwał na połączenie od klienta konsensusu. Obecne dane blockchain będą dostępne po pomyślnym zsynchronizowaniu klienta z bieżącym stanem.

##### Uruchamianie Reth

Ten przykład uruchamia Reth w sieci głównej przy użyciu podstawowej lokalizacji danych. Włącza uwierzytelnianie JSON-RPC i Engine RPC do łączenia klienta konsensusu, który jest zdefiniowany przez ścieżkę `jwtsecret`, przy czym dozwolone są tylko wywołania z `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Zobacz [Konfiguracja Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth), aby dowiedzieć się więcej o domyślnych katalogach danych. [Dokumentacja Reth](https://reth.rs/run/mainnet.html) zawiera dodatkowe opcje i szczegóły konfiguracji.

#### Uruchamianie klienta konsensusu {#starting-the-consensus-client}

Klient konsensusu musi zostać uruchomiony z odpowiednią konfiguracją portu, aby ustanowić lokalne połączenie RPC z klientem wykonawczym. Klienci konsensusu muszą być uruchamiani z odsłoniętym portem klienta wykonawczego jako argumentem konfiguracyjnym.

Klient konsensusu potrzebuje również ścieżki do `jwt-secret` klienta wykonawczego w celu uwierzytelnienia połączenia RPC między nimi. Podobnie jak w powyższych przykładach wykonania, każdy klient konsensusu ma znacznik konfiguracyjny, który przyjmuje ścieżkę pliku tokena jwt jako argument. Musi być ona zgodna ze ścieżką `jwtsecret` podaną klientowi wykonawczemu.

Jeśli planujesz uruchomić walidator, pamiętaj o dodaniu znacznika konfiguracyjnego określającego adres Ethereum odbiorcy opłaty. Tam gromadzone są nagrody w postaci etheru Twojego walidatora. Każdy klient konsensusu ma opcję, np. `--suggested-fee-recipient=0xabcd1`, która przyjmuje adres Ethereum jako argument.

Uruchamiając węzeł Beacon w sieci testowej, możesz zaoszczędzić sporo czasu na synchronizacji, używając publicznego punktu końcowego do [synchronizacji z punktu kontrolnego](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Uruchamianie klienta konsensusu {#running-a-consensus-client}

##### Uruchamianie Lighthouse

Przed uruchomieniem Lighthouse dowiedz się więcej o tym, jak go zainstalować i skonfigurować w [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Uruchamianie Lodestar

Zainstaluj oprogramowanie Lodestar, kompilując je lub pobierając obraz Dockera. Dowiedz się więcej w [dokumentacji](https://chainsafe.github.io/lodestar/) i bardziej kompleksowym [przewodniku po konfiguracji](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Uruchamianie Nimbus

Nimbus jest dostępny zarówno z klientami konsensusu, jak i wykonawczymi. Może zostać uruchomiony na różnych urządzeniach, nawet o bardzo małej mocy obliczeniowej.
Po [zainstalowaniu zależności i samego Nimbusa](https://nimbus.guide/quick-start.html) możesz uruchomić jego klienta konsensusu:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Uruchamianie Prysm

Prysm jest dostępny ze skryptem, który umożliwia łatwą i automatyczną instalację. Szczegóły można znaleźć w [dokumentacji Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Uruchamianie Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Kiedy klient konsensusu łączy się z klientem wykonawczym w celu odczytania kontraktu depozytowego i zidentyfikowania walidatorów, łączy się również z innymi równorzędnymi klientami konsensusu i rozpoczyna synchronizację slotów konsensusu z genezy. Po tym, jak klient konsensusu osiągnie bieżącą epokę, jego interfejs API staje się użyteczny dla walidatorów. Dowiedz się więcej o [interfejsach API węzła Beacon](https://eth2docs.vercel.app/).

### Dodawanie walidatorów {#adding-validators}

Klient konsensusu służy jako węzeł śledzący, z którym mogą łączyć się walidatory. Każdy klient konsensusu ma własne oprogramowanie walidatora opisane szczegółowo w swojej dokumentacji.

Uruchomienie własnego walidatora pozwala na [solo staking](/staking/solo/), najbardziej wpływową i niewymagającą zaufania metodę wspierania sieci Ethereum. Wymaga to jednak depozytu 32 ETH. Aby uruchomić walidatora na własnym węźle z mniejszą kwotą, może Cię zainteresować zdecentralizowana pula z niewymagającymi uprawnień operatorami węzłów, taka jak [Rocket Pool](https://rocketpool.net/node-operators).

Najłatwiejszym sposobem na rozpoczęcie stakingu i generowania kluczy walidatora jest użycie [platformy startowej do stakingu w sieci testowej Hoodi](https://hoodi.launchpad.ethereum.org/), która pozwala przetestować konfigurację poprzez [uruchomienie węzłów na Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Gdy będziesz gotowy na sieć główną, możesz powtórzyć te kroki za pomocą [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Zajrzyj na [stronę stakingu](/staking), aby zapoznać się z opcjami stakingu.

### Korzystanie z węzła {#using-the-node}

Klienci wykonawczy oferują [punkty końcowe API RPC](/developers/docs/apis/json-rpc/), których można używać do przesyłania transakcji, interakcji lub wdrażania smart kontraktów w sieci Ethereum na różne sposoby:

- Ręczne wywoływanie ich za pomocą odpowiedniego protokołu (np. używając `curl`)
- Dołączanie dostarczonej konsoli (np. `geth attach`)
- Implementowanie ich w aplikacjach przy użyciu bibliotek web3, np. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Różne klienty mają różne implementacje punktów końcowych RPC. Istnieje jednak standardowy JSON-RPC, którego można używać z każdym klientem. Aby zapoznać się z omówieniem, [przeczytaj dokumentację JSON-RPC](/developers/docs/apis/json-rpc/). Aplikacje, które potrzebują informacji z sieci Ethereum, mogą korzystać z tego RPC. Na przykład popularny portfel MetaMask pozwala [połączyć się z własnym punktem końcowym RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node), co ma duże zalety w zakresie prywatności i bezpieczeństwa.

Wszystkie klienci konsensusu udostępniają [API Beacon](https://ethereum.github.io/beacon-APIs), które można wykorzystać do sprawdzania statusu klienta konsensusu lub pobierania bloków i danych konsensusu, wysyłając żądania za pomocą narzędzi takich jak [Curl](https://curl.se). Więcej informacji na ten temat możesz znaleźć w dokumentacji każdego klienta konsensusu.

#### Dostęp do RPC {#reaching-rpc}

Domyślnym portem dla JSON-RPC klienta wykonawczego jest `8545`, ale można modyfikować porty lokalnych punktów końcowych w konfiguracji. Domyślnie interfejs RPC jest dostępny tylko na lokalnym hoście komputera. Aby udostępnić go zdalnie, możesz chcieć wystawić go publicznie, zmieniając adres na `0.0.0.0`. Dzięki temu będzie on osiągalny przez sieć lokalną i publiczne adresy IP. W większości przypadków konieczne będzie również skonfigurowanie przekierowania portów na Twoim routerze.

Do udostępniania portów do Internetu należy podchodzić ostrożnie, ponieważ pozwoli to każdemu w Internecie kontrolować węzeł. Złośliwe podmioty mogą uzyskać dostęp do Twojego węzła w celu wyłączenia systemu lub kradzieży Twoich środków, jeśli używasz klienta jako portfela.

Sposobem na obejście tego problemu jest uniemożliwienie dokonywania potencjalnie szkodliwych metod RPC. Na przykład w Geth można zadeklarować modyfikowalne metody za pomocą flagi: `--http.api web3,eth,txpool`.

Dostęp do interfejsu RPC można rozszerzyć poprzez opracowanie interfejsów API warstwy brzegowej lub aplikacji serwera internetowego, takich jak Nginx, i podłączenie ich do Twojego lokalnego adresu i portu klienta. Wykorzystanie warstwy pośredniej może również umożliwić deweloperom skonfigurowanie certyfikatu dla bezpiecznych połączeń `https` z interfejsem RPC.

Konfiguracja serwera internetowego, serwera proxy lub zewnętrznego interfejsu API Rest nie jest jedynym sposobem zapewnienia dostępu do punktu końcowego RPC Twojego węzła. Innym sposobem na skonfigurowanie publicznie dostępnego punktu końcowego z zachowaniem prywatności jest hostowanie węzła we własnej usłudze onion [Tor](https://www.torproject.org/). Umożliwi Ci to dostęp do RPC poza siecią lokalną bez statycznego publicznego adresu IP lub otwartych portów. Jednak użycie tej konfiguracji może pozwolić na dostęp do punktu końcowego RPC tylko za pośrednictwem sieci Tor, która nie jest obsługiwana przez wszystkie aplikacje i może powodować problemy z połączeniem.

Aby to zrobić, musisz utworzyć własną [usługę onion](https://community.torproject.org/onion-services/). Sprawdź [dokumentację](https://community.torproject.org/onion-services/setup/) dotyczącą konfiguracji usługi onion, aby hostować własną. Możesz skierować go na serwer WWW przy użyciu proxy na port RPC lub bezpośrednio do RPC.

Ostatnią i jedną z najpopularniejszych metod zapewnienia dostępu do sieci wewnętrznych jest połączenie VPN. W zależności od przypadku użycia i liczby użytkowników potrzebujących dostępu do Twojego węzła, bezpieczne połączenie VPN może być opcją. [OpenVPN](https://openvpn.net/) to w pełni funkcjonalny SSL VPN, który implementuje bezpieczne rozszerzenie sieci warstwy 2 lub 3 OSI przy użyciu standardowego protokołu SSL/TLS, obsługuje elastyczne metody uwierzytelniania klienta oparte na certyfikatach, kartach inteligentnych i/lub poświadczeniach nazwy użytkownika/hasła oraz umożliwia zasady kontroli dostępu specyficzne dla użytkownika lub grupy przy użyciu reguł zapory sieciowej stosowanych do wirtualnego interfejsu VPN.

### Obsługa węzła {#operating-the-node}

Należy regularnie monitorować węzeł, aby upewnić się, że działa on prawidłowo. Może być konieczna sporadyczna konserwacja.

#### Utrzymywanie węzła online {#keeping-node-online}

Twój węzeł nie musi być cały czas online, ale powinno się utrzymywać go online tak długo, jak to tylko możliwe, aby był zsynchronizowany z siecią. Możesz go wyłączyć, aby go zrestartować, ale pamiętaj o tym, że:

- Wyłączanie może potrwać kilka minut, jeśli ostatni stan jest nadal zapisywany na dysku.
- Wymuszone zamknięcie może uszkodzić bazę danych, wymagając ponownej synchronizacji całego węzła.
- Twój klient nie będzie zsynchronizowany z siecią i będzie musiał zostać ponownie zsynchronizowany po zrestartowaniu. Podczas gdy węzeł może rozpocząć synchronizację od miejsca, w którym był przed ostatnim wyłączeniem, proces ten może zająć trochę czasu w zależności od tego, jak długo był offline.

_Nie dotyczy to węzłów walidatorów warstwy konsensusu._ Przełączenie węzła w tryb offline wpłynie na wszystkie zależne od niego usługi. Jeśli uruchamiasz węzeł w celach _stakingu_, powinieneś starać się minimalizować przestoje tak bardzo, jak to możliwe.

#### Tworzenie usług klienta {#creating-client-services}

Rozważ utworzenie usługi do automatycznego uruchamiania klientów podczas startu. Na przykład na serwerach z systemem Linux dobrą praktyką jest utworzenie usługi, np. za pomocą `systemd`, która uruchamia klienta z odpowiednią konfiguracją, pod użytkownikiem z ograniczonymi uprawnieniami i automatycznie go restartuje.

#### Aktualizowanie klientów {#updating-clients}

Musisz utrzymywać oprogramowanie klienta w aktualnej wersji z najnowszymi poprawkami bezpieczeństwa, funkcjami i [EIP](/eips/). Szczególnie przed [hard forkami](/ethereum-forks/) upewnij się, że używasz poprawnych wersji klienta.

> Przed ważnymi aktualizacjami sieci EF publikuje post na swoim [blogu](https://blog.ethereum.org). Możesz [zasubskrybować te ogłoszenia](https://blog.ethereum.org/category/protocol#subscribe), aby otrzymywać powiadomienia na maila, gdy Twój węzeł będzie wymagał aktualizacji.

Aktualizowanie klientów jest bardzo proste. Każdy klient ma szczegółowe instrukcje w swojej dokumentacji, ale proces ten polega na pobraniu najnowszej wersji i zrestartowaniu klienta nowym plikiem wykonywalnym. Klient powinien powrócić do miejsca, w którym zakończył, ale z zastosowanymi aktualizacjami.

Każda implementacja klienta ma czytelny dla człowieka numer wersji używany w protokole peer-to-peer, ale jest również dostępny z wiersza poleceń. Ten numer wersji pozwala użytkownikom sprawdzić, czy używają poprawnej wersji i umożliwia eksploratorom bloków i innym narzędziom analitycznym zainteresowanym ilościowym podziałem określonych klientów w sieci. Więcej informacji na temat numeru wersji można znaleźć w dokumentacji poszczególnych klientów.

#### Uruchamianie dodatkowych usług {#running-additional-services}

Uruchomienie własnego węzła umożliwia korzystanie z usług wymagających bezpośredniego dostępu do RPC klienta Ethereum. Są to usługi zbudowane na Ethereum, takie jak [rozwiązania warstwy 2](/developers/docs/scaling/#layer-2-scaling), backend dla portfeli, eksploratory bloków, narzędzia deweloperskie i inna infrastruktura Ethereum.

#### Monitorowanie węzła {#monitoring-the-node}

Aby poprawnie monitorować swój węzeł, rozważ zbieranie pomiarów. Klienty zapewniają punkty końcowe pomiarów, dzięki czemu możesz uzyskać szczegółowe dane o węźle. Użyj narzędzi takich jak [InfluxDB](https://www.influxdata.com/get-influxdb/) lub [Prometheus](https://prometheus.io/), aby tworzyć bazy danych, które można przekształcić w wizualizacje i wykresy w oprogramowaniu takim jak [Grafana](https://grafana.com/). Istnieje wiele konfiguracji korzystania z tych oprogramowań i różnych pulpitów nawigacyjnych Grafana do wizualizacji węzła i sieci jako całości. Na przykład, sprawdź [samouczek dotyczący monitorowania Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

W ramach monitorowania należy mieć oko na wydajność maszyny. Podczas początkowej synchronizacji węzła oprogramowanie klienta może bardzo obciążać procesor i RAM. Oprócz Grafany można do tego celu użyć narzędzi oferowanych przez system operacyjny, takich jak `htop` czy `uptime`.

## Dalsza lektura {#further-reading}

- [Przewodniki po stakingu Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) – _Somer Esat, często aktualizowane_
- [Przewodnik | Jak skonfigurować walidatora do stakingu Ethereum w sieci głównej](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, często aktualizowane_
- [Przewodniki ETHStaker dotyczące uruchamiania walidatorów w sieciach testowych](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, regularnie aktualizowane_
- [Przykładowa aplikacja AWS Blockchain Node Runner dla węzłów Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) – _AWS, często aktualizowane_
- [The Merge – FAQ dla operatorów węzłów](https://notes.ethereum.org/@launchpad/node-faq-merge) – _lipiec 2022_
- [Analiza wymagań sprzętowych, aby stać się pełnym zwalidowanym węzłem Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 września 2018_
- [Uruchamianie pełnych węzłów Ethereum: przewodnik dla słabo zmotywowanych](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 listopada 2019_
- [Uruchamianie węzła Hyperledger Besu w sieci głównej Ethereum: korzyści, wymagania i konfiguracja](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 maja 2020_
- [Wdrażanie klienta Nethermind Ethereum ze stosem monitorującym](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 lipca 2020_

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [Bloki](/developers/docs/blocks/)
- [Sieci](/developers/docs/networks/)
