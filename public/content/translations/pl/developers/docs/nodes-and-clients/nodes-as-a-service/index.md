---
title: Węzły jako usługa
description: Podstawowy przegląd usług węzłów, ich wady i zalety oraz popularni dostawcy.
lang: pl
sidebarDepth: 2
---

## Wprowadzenie {#introduction}

Uruchomienie własnego [węzła Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) może być wyzwaniem, zwłaszcza na początku lub podczas szybkiego skalowania. Istnieje [wiele usług](#popular-node-services), które uruchamiają zoptymalizowaną infrastrukturę węzłów za Ciebie, dzięki czemu możesz skupić się na rozwijaniu swojej aplikacji lub produktu. Wyjaśnimy, jak działają usługi węzłów, jakie są wady i zalety ich używania, a także wymienimy dostawców, jeśli chcesz zacząć z nich korzystać.

## Wymagania wstępne {#prerequisites}

Jeśli nie wiesz jeszcze, czym są węzły i klienty, zapoznaj się z sekcją [Węzły i klienty](/developers/docs/nodes-and-clients/).

## Stakerzy {#stakoooooooooooooors}

Samodzielni stakerzy muszą uruchamiać własną infrastrukturę, zamiast polegać na zewnętrznych dostawcach. Oznacza to uruchomienie klienta warstwy wykonawczej połączonego z klientem konsensusu. Przed [The Merge](/roadmap/merge) możliwe było uruchomienie tylko klienta konsensusu i korzystanie ze scentralizowanego dostawcy danych wykonawczych; nie jest to już możliwe – samodzielny staker musi uruchomić oba klienty. Dostępne są jednak usługi ułatwiające ten proces.

[Przeczytaj więcej o uruchamianiu węzła](/developers/docs/nodes-and-clients/run-a-node/).

Usługi opisane na tej stronie dotyczą węzłów, które nie uczestniczą w stakingu.

## Jak działają usługi węzłów? {#how-do-node-services-work}

Dostawcy usług węzłów uruchamiają za Ciebie rozproszone klienty węzłów w tle, więc nie musisz tego robić samodzielnie.

Usługi te zazwyczaj udostępniają klucz API, którego możesz użyć do zapisu i odczytu z blockchaina. Często obejmują one dostęp do [sieci testowych Ethereum](/developers/docs/networks/#ethereum-testnets) oprócz Sieci głównej (Mainnet).

Niektóre usługi oferują własny dedykowany węzeł, którym zarządzają za Ciebie, podczas gdy inne używają systemów równoważenia obciążenia (load balancers) do rozdzielania aktywności między węzłami.

Prawie wszystkie usługi węzłów są niezwykle łatwe w integracji, wymagając jedynie zmiany jednej linijki w kodzie, aby zamienić własny węzeł lub nawet przełączać się między samymi usługami.

Często usługi węzłów uruchamiają różne [klienty węzłów](/developers/docs/nodes-and-clients/#execution-clients) i ich [typy](/developers/docs/nodes-and-clients/#node-types), umożliwiając dostęp do pełnych węzłów i węzłów archiwalnych, a także metod specyficznych dla danego klienta w jednym API.

Należy pamiętać, że usługi węzłów nie przechowują i nie powinny przechowywać Twoich kluczy prywatnych ani informacji.

## Jakie są korzyści z korzystania z usługi węzła? {#benefits-of-using-a-node-service}

Główną korzyścią z korzystania z usługi węzła jest brak konieczności poświęcania czasu inżynierów na samodzielne utrzymywanie i zarządzanie węzłami. Pozwala to skupić się na budowaniu produktu, zamiast martwić się o utrzymanie infrastruktury.

Uruchamianie własnych węzłów może być bardzo kosztowne, począwszy od pamięci masowej, przez przepustowość, aż po cenny czas inżynierów. Rzeczy takie jak uruchamianie większej liczby węzłów podczas skalowania, aktualizacja węzłów do najnowszych wersji i zapewnienie spójności stanu mogą odciągać uwagę od budowania i przeznaczania zasobów na pożądany produkt Web3.

## Jakie są wady korzystania z usługi węzła? {#cons-of-using-a-node-service}

Korzystając z usługi węzła, centralizujesz aspekt infrastrukturalny swojego produktu. Z tego powodu projekty, dla których decentralizacja ma najwyższe znaczenie, mogą preferować samodzielne hostowanie węzłów zamiast zlecania tego zewnętrznym dostawcom.

Przeczytaj więcej o [korzyściach z uruchomienia własnego węzła](/developers/docs/nodes-and-clients/#benefits-to-you).

## Popularne usługi węzłów {#popular-node-services}

Oto lista niektórych z najpopularniejszych dostawców węzłów Ethereum, śmiało dodaj tych, których brakuje! Każda usługa węzła oferuje inne korzyści i funkcje, a także darmowe lub płatne plany. Przed podjęciem decyzji powinieneś sprawdzić, które z nich najlepiej odpowiadają Twoim potrzebom.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentacja](https://www.alchemy.com/docs/)
  - Funkcje
    - Największy darmowy plan z 300 mln jednostek obliczeniowych miesięcznie (~30 mln żądań getLatestBlock)
    - Obsługa wielu łańcuchów dla Polygon, Starknet, Optimism, Arbitrum
    - Obsługuje ~70% największych zdecentralizowanych aplikacji (dapp) Ethereum i wolumenu transakcji zdecentralizowanych finansów (DeFi)
    - Alerty webhook w czasie rzeczywistym za pośrednictwem Alchemy Notify
    - Najlepsze w swojej klasie wsparcie oraz niezawodność / stabilność
    - API NFT od Alchemy
    - Pulpit nawigacyjny z Request Explorer, Mempool Watcher i Composer
    - Zintegrowany dostęp do kranika sieci testowej
    - Aktywna społeczność budowniczych na Discordzie licząca 18 tys. użytkowników

- [**Allnodes**](https://www.allnodes.com/)
  - [Dokumentacja](https://docs.allnodes.com/)
  - Funkcje
    - Brak limitów zapytań z tokenem PublicNode utworzonym na stronie portfolio Allnodes.
    - Skupione na prywatności darmowe punkty końcowe RPC (ponad 100 blockchainów) na [PublicNode](https://www.publicnode.com)
    - Dedykowane węzły bez limitów zapytań dla ponad 90 blockchainów
    - Dedykowane węzły archiwalne dla ponad 30 blockchainów
    - Dostępne w 3 regionach (USA, UE, Azja)
    - Migawki (snapshots) dla ponad 100 blockchainów na [PublicNode](https://www.publicnode.com/snapshots)
    - Całodobowe wsparcie techniczne z SLA na poziomie 99,90%-99,98% czasu sprawności (w zależności od planu).
    - Cennik godzinowy
    - Płatność kartą kredytową, PayPal lub krypto

- [**All That Node**](https://allthatnode.com/)
  - [Dokumentacja](https://docs.allthatnode.com/)
  - Funkcje
    - 50 000 żądań dziennie w darmowym planie
    - Obsługa ponad 40 protokołów
    - Obsługa API JSON-RPC (EVM, Tendermint), REST i Websocket
    - Nielimitowany dostęp do danych archiwalnych
    - Całodobowe wsparcie techniczne i ponad 99,9% czasu sprawności
    - Kranik dostępny na wielu łańcuchach
    - Nielimitowany dostęp do punktów końcowych z nieograniczoną liczbą kluczy API
    - Obsługa API Trace/Debug
    - Zautomatyzowane aktualizacje

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Dokumentacja](https://aws.amazon.com/managed-blockchain/resources/)
  - Funkcje
    - W pełni zarządzane węzły Ethereum
    - Dostępne w sześciu regionach
    - JSON-RPC przez HTTP i bezpieczne WebSockets
    - Obsługuje 3 łańcuchy
    - SLA, całodobowe wsparcie AWS
    - Go-ethereum i Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Dokumentacja](https://docs.ankr.com/)
  - Funkcje
    - Protokół Ankr - otwarty dostęp do publicznych punktów końcowych API RPC dla ponad 8 łańcuchów
    - Równoważenie obciążenia i monitorowanie stanu węzłów dla szybkiej i niezawodnej bramy do najbliższego dostępnego węzła
    - Plan Premium umożliwiający punkt końcowy WSS i brak limitów zapytań
    - Wdrożenie pełnego węzła i węzła walidatora jednym kliknięciem dla ponad 40 łańcuchów
    - Skalowanie w miarę potrzeb
    - Narzędzia analityczne
    - Pulpit nawigacyjny
    - Punkty końcowe RPC, HTTPS i WSS
    - Bezpośrednie wsparcie

- [**Blast**](https://blastapi.io/)
  - [Dokumentacja](https://docs.blastapi.io/)
  - Funkcje
    - Obsługa RPC i WSS
    - Hosting węzłów w wielu regionach
    - Zdecentralizowana infrastruktura
    - Publiczne API
    - Dedykowany darmowy plan
    - Obsługa wielu łańcuchów (ponad 17 blockchainów)
    - Węzły archiwalne
    - Całodobowe wsparcie na Discordzie
    - Całodobowe monitorowanie i alerty
    - Ogólne SLA na poziomie 99,9%
    - Płatność w krypto

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentacja](https://ubiquity.docs.blockdaemon.com/)
  - Korzyści
    - Pulpit nawigacyjny
    - Rozliczenie za węzeł
    - Analityka

- [**BlockPI**](https://blockpi.io/)
  - [Dokumentacja](https://docs.blockpi.io/)
  - Funkcje
    - Solidna i rozproszona struktura węzłów
    - Do 40 punktów końcowych HTTPS i WSS
    - Darmowy pakiet powitalny i pakiet miesięczny
    - Metoda Trace + obsługa danych archiwalnych
    - Pakiety ważne do 90 dni
    - Niestandardowy plan i płatność zgodnie z użyciem (pay as you go)
    - Płatność w krypto
    - Bezpośrednie wsparcie i wsparcie techniczne

- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumentacja](https://docs.chainbase.com)
  - Funkcje
    - Wysoce dostępna, szybka i skalowalna usługa RPC
    - Obsługa wielu łańcuchów
    - Darmowe taryfy
    - Przyjazny dla użytkownika pulpit nawigacyjny
    - Zapewnia usługi danych blockchain wykraczające poza RPC

- [**Chainstack**](https://chainstack.com/)
  - [Dokumentacja](https://docs.chainstack.com/)
  - Funkcje
    - Darmowe współdzielone węzły
    - Współdzielone węzły archiwalne
    - Obsługa GraphQL
    - Punkty końcowe RPC i WSS
    - Dedykowane pełne węzły i węzły archiwalne
    - Szybki czas synchronizacji dla dedykowanych wdrożeń
    - Przynieś własną chmurę (Bring your cloud)
    - Cennik godzinowy
    - Bezpośrednie całodobowe wsparcie

- [**dRPC**](https://drpc.org/)
  - [Dokumentacja](https://drpc.org/docs)
  - NodeCloud: Infrastruktura RPC typu plug-n-play od 10 USD — pełna prędkość, brak limitów
  - Funkcje NodeCloud:
    - Obsługa API dla 185 sieci
    - Rozproszona pula ponad 40 dostawców
    - Globalny zasięg z dziewięcioma (9) klastrami geograficznymi
    - System równoważenia obciążenia oparty na sztucznej inteligencji
    - Płatność zgodnie z użyciem ze stałą stawką — bez podwyżek, bez wygasania, bez długoterminowych zobowiązań
    - Nielimitowane klucze, szczegółowe dostosowywanie kluczy, role w zespole, ochrona front-endu
    - Stała stawka za metody wynosząca 20 jednostek obliczeniowych (CU) na metodę
    - [Lista łańcuchów publicznych punktów końcowych](https://drpc.org/chainlist)
    - [Kalkulator cen](https://drpc.org/pricing#calculator)
  - NodeCore: stos open-source dla organizacji chcących pełnej kontroli

- [**GetBlock**](https://getblock.io/)
  - [Dokumentacja](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Funkcje
    - Dostęp do ponad 40 węzłów blockchain
    - 40 tys. darmowych żądań dziennie
    - Nielimitowana liczba kluczy API
    - Wysoka prędkość połączenia 1 GB/s
    - Trace+Archive
    - Zaawansowana analityka
    - Zautomatyzowane aktualizacje
    - Wsparcie techniczne

- [**InfStones**](https://infstones.com/)
  - Funkcje
    - Opcja darmowego planu
    - Skalowanie w miarę potrzeb
    - Analityka
    - Pulpit nawigacyjny
    - Unikalne punkty końcowe API
    - Dedykowane pełne węzły
    - Szybki czas synchronizacji dla dedykowanych wdrożeń
    - Bezpośrednie całodobowe wsparcie
    - Dostęp do ponad 50 węzłów blockchain

- [**Infura**](https://infura.io/)
  - [Dokumentacja](https://infura.io/docs)
  - Funkcje
    - Opcja darmowego planu
    - Skalowanie w miarę potrzeb
    - Płatne dane archiwalne
    - Bezpośrednie wsparcie
    - Pulpit nawigacyjny

- [**Kaleido**](https://kaleido.io/)
  - [Dokumentacja](https://docs.kaleido.io/)
  - Funkcje
    - Darmowy plan startowy
    - Wdrożenie węzła Ethereum jednym kliknięciem
    - Konfigurowalne klienty i algorytmy (Geth, Quorum i Besu || PoA, IBFT i Raft)
    - Ponad 500 administracyjnych i usługowych API
    - Interfejs RESTful do przesyłania transakcji Ethereum (oparty na Apache Kafka)
    - Strumienie wychodzące do dostarczania zdarzeń (oparte na Apache Kafka)
    - Bogaty zbiór usług pozałańcuchowych i pomocniczych (np. dwustronny szyfrowany transport wiadomości)
    - Prosty onboarding do sieci z zarządzaniem i kontrolą dostępu opartą na rolach
    - Zaawansowane zarządzanie użytkownikami zarówno dla administratorów, jak i użytkowników końcowych
    - Wysoce skalowalna, odporna infrastruktura klasy korporacyjnej
    - Zarządzanie kluczami prywatnymi w chmurze HSM
    - Tethering do sieci głównej Ethereum
    - Certyfikaty ISO 27k i SOC 2, Typ 2
    - Dynamiczna konfiguracja w czasie wykonywania (np. dodawanie integracji z chmurą, zmiana wejść węzłów itp.)
    - Obsługa orkiestracji wdrożeń wielochmurowych, wieloregionalnych i hybrydowych
    - Prosty cennik godzinowy oparty na modelu SaaS
    - SLA i całodobowe wsparcie

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Dokumentacja](https://docs.lavanet.xyz/)
  - Funkcje
    - Darmowe korzystanie z sieci testowej
    - Zdecentralizowana redundancja dla wysokiego czasu sprawności
    - Open-source
    - W pełni zdecentralizowane SDK
    - Integracja z Ethers.js
    - Intuicyjny interfejs zarządzania projektami
    - Integralność danych oparta na konsensusie
    - Obsługa wielu łańcuchów

- [**Moralis**](https://moralis.io/)
  - [Dokumentacja](https://docs.moralis.io/)
  - Funkcje
    - Darmowe współdzielone węzły
    - Darmowe współdzielone węzły archiwalne
    - Skupienie na prywatności (polityka braku logów)
    - Obsługa wielu łańcuchów (cross-chain)
    - Skalowanie w miarę potrzeb
    - Pulpit nawigacyjny
    - Unikalne SDK Ethereum
    - Unikalne punkty końcowe API
    - Bezpośrednie wsparcie techniczne

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentacja](https://docs.nodereal.io/docs/introduction)
  - Funkcje
    - Niezawodne, szybkie i skalowalne usługi API RPC
    - Ulepszone API dla programistów Web3
    - Obsługa wielu łańcuchów
    - Rozpocznij za darmo

- [**NodeFlare**](https://nodeflare.app/)
  - [Dokumentacja](https://nodeflare.app/docs/quick-start)
  - Funkcje
    - 8 łańcuchów EVM, w tym Ethereum, Base, Arbitrum One i Optimism
    - 4 regiony (Europa, Azja, Ameryka Północna) z automatycznym przełączaniem awaryjnym na najbliższy sprawny węzeł
    - Darmowy publiczny punkt końcowy (bez klucza API) + darmowy plan z 3 mln jednostek obliczeniowych miesięcznie
    - Rozliczanie w jednostkach obliczeniowych — płać tylko za to, z czego korzystasz, cięższe wywołania kosztują więcej
    - Brak ograniczania przepustowości (throttling) w płatnych planach

- [**NOWNodes**](https://nownodes.io/)
  - Funkcje
    - Dostęp do ponad 50 węzłów blockchain
    - Darmowy klucz API
    - Eksploratory bloków
    - Czas odpowiedzi API ⩽ 1 sek.
    - Całodobowy zespół wsparcia
    - Osobisty opiekun konta
    - Węzły współdzielone, archiwalne, zapasowe i dedykowane

- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentacja](https://docs.pokt.network/)
  - Funkcje
    - Zdecentralizowany protokół RPC i rynek
    - Darmowy plan z 1 mln żądań dziennie (na punkt końcowy, maks. 2)
    - Program Pre-Stake+ (jeśli potrzebujesz więcej niż 1 mln żądań dziennie)
    - Obsługa ponad 15 blockchainów
    - Ponad 6400 węzłów zarabiających POKT za obsługę aplikacji
    - Obsługa węzłów archiwalnych, węzłów archiwalnych z funkcją Tracing i węzłów sieci testowej
    - Różnorodność klientów węzłów w sieci głównej Ethereum
    - Brak pojedynczego punktu awarii
    - Zerowy czas przestoju
    - Opłacalna tokenomika bliska zeru (stakuj POKT raz, aby uzyskać przepustowość sieci)
    - Brak miesięcznych kosztów utopionych, zamień swoją infrastrukturę w aktywo
    - Równoważenie obciążenia wbudowane w protokół
    - Nieskończone skalowanie liczby żądań dziennie i węzłów na godzinę w miarę potrzeb
    - Najbardziej prywatna, odporna na cenzurę opcja
    - Praktyczne wsparcie dla programistów
    - Pulpit nawigacyjny i analityka [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Dokumentacja](https://www.quicknode.com/docs/)
  - Funkcje
    - Całodobowe wsparcie techniczne i społeczność programistów na Discordzie
    - Zrównoważona geograficznie, wielochmurowa/sprzętowa sieć o niskich opóźnieniach
    - Obsługa wielu łańcuchów (Optimism, Arbitrum, Polygon + 11 innych)
    - Warstwy pośrednie dla szybkości i stabilności (routing wywołań, pamięć podręczna, indeksowanie)
    - Monitorowanie inteligentnych kontraktów za pomocą Webhooków
    - Intuicyjny pulpit nawigacyjny, pakiet analityczny, kompozytor RPC
    - Zaawansowane funkcje bezpieczeństwa (JWT, maskowanie, białe listy)
    - API danych i analityki NFT
    - [Certyfikat SOC2](https://www.quicknode.com/security)
    - Odpowiednie dla programistów i przedsiębiorstw

- [**Rivet**](https://rivet.cloud/)
  - [Dokumentacja](https://rivet.readthedocs.io/en/latest/)
  - Funkcje
    - Opcja darmowego planu
    - Skalowanie w miarę potrzeb

- [**SenseiNode**](https://senseinode.com)
  - [Dokumentacja](https://docs.senseinode.com/)
  - Funkcje
    - Węzły dedykowane i współdzielone
    - Pulpit nawigacyjny
    - Hosting poza AWS u wielu dostawców hostingu w różnych lokalizacjach w Ameryce Łacińskiej
    - Klienty Prysm i Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumentacja](https://docs.settlemint.com/)
  - Funkcje
    - Darmowy okres próbny
    - Skalowanie w miarę potrzeb
    - Obsługa GraphQL
    - Punkty końcowe RPC i WSS
    - Dedykowane pełne węzły
    - Przynieś własną chmurę (Bring your cloud)
    - Narzędzia analityczne
    - Pulpit nawigacyjny
    - Cennik godzinowy
    - Bezpośrednie wsparcie

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumentacja](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Funkcje
    - Darmowy plan obejmujący 25 milionów jednostek Tenderly miesięcznie
    - Darmowy dostęp do danych historycznych
    - Do 8x szybsze obciążenia z dużą ilością odczytów
    - W 100% spójny dostęp do odczytu
    - Punkty końcowe JSON-RPC
    - Kreator żądań RPC oparty na interfejsie użytkownika i podgląd żądań
    - Ściśle zintegrowane z narzędziami Tenderly do programowania, debugowania i testowania
    - Symulacje transakcji
    - Analityka użycia i filtrowanie
    - Łatwe zarządzanie kluczami dostępu
    - Dedykowane wsparcie inżynieryjne przez czat, e-mail i Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Dokumentacja](https://services.tokenview.io/docs?type=nodeService)
  - Funkcje
    - Całodobowe wsparcie techniczne i społeczność programistów na Telegramie
    - Obsługa wielu łańcuchów (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Zarówno punkty końcowe RPC, jak i WSS są otwarte do użytku
    - Nielimitowany dostęp do API danych archiwalnych
    - Pulpit nawigacyjny z Request Explorer i Mempool Watcher
    - API danych NFT i powiadomienia Webhook
    - Płatność w krypto
    - Zewnętrzne wsparcie dla dodatkowych wymagań dotyczących zachowania

- [**Watchdata**](https://watchdata.io/)
  - [Dokumentacja](https://docs.watchdata.io/)
  - Funkcje
    - Niezawodność danych
    - Nieprzerwane połączenie bez przestojów
    - Automatyzacja procesów
    - Darmowe taryfy
    - Wysokie limity, które odpowiadają każdemu użytkownikowi
    - Obsługa różnych węzłów
    - Skalowanie zasobów
    - Wysokie prędkości przetwarzania

- [**ZMOK**](https://zmok.io/)
  - [Dokumentacja](https://docs.zmok.io/)
  - Funkcje
    - Wyprzedzanie transakcji (front-running) jako usługa
    - Globalny mempool transakcji z metodami wyszukiwania/filtrowania
    - Nielimitowana opłata za transakcję i nieskończony gaz do wysyłania transakcji
    - Najszybsze pobieranie nowego bloku i odczyt blockchaina
    - Gwarancja najlepszej ceny za wywołanie API

- [**Zeeve**](https://www.zeeve.io/)
  - [Dokumentacja](https://www.zeeve.io/docs/)
  - Funkcje
    - Platforma automatyzacji no-code klasy korporacyjnej zapewniająca wdrażanie, monitorowanie i zarządzanie węzłami i sieciami blockchain
    - Ponad 30 obsługiwanych protokołów i integracji, a wciąż dodawane są kolejne
    - Usługi infrastruktury Web3 o wartości dodanej, takie jak zdecentralizowane przechowywanie, zdecentralizowana tożsamość i API danych księgi blockchain dla rzeczywistych przypadków użycia
    - Całodobowe wsparcie i proaktywne monitorowanie zapewniają ciągłą sprawność węzłów.
    - Punkty końcowe RPC oferują uwierzytelniony dostęp do API, bezproblemowe zarządzanie dzięki intuicyjnemu pulpitowi nawigacyjnemu i analityce.
    - Zapewnia do wyboru opcje zarządzanej chmury i własnej chmury (bring your own cloud) oraz obsługuje wszystkich głównych dostawców chmury, takich jak AWS, Azure, Google Cloud, Digital Ocean, a także rozwiązania lokalne (on-premise).
    - Używamy inteligentnego routingu, aby za każdym razem trafiać do węzła znajdującego się najbliżej Twojego użytkownika


## Dalsza lektura {#further-reading}

- [Lista usług węzłów Ethereum](https://ethereumnodes.com/)

## Powiązane tematy {#related-topics}

- [Węzły i klienty](/developers/docs/nodes-and-clients/)

## Powiązane samouczki {#related-tutorials}

- [Wprowadzenie do programowania w Ethereum przy użyciu Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Przewodnik po wysyłaniu transakcji przy użyciu Web3 i Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)