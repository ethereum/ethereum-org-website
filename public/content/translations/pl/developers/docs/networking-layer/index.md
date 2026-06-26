---
title: Warstwa sieciowa
description: Wprowadzenie do warstwy sieciowej Ethereum.
lang: pl
sidebarDepth: 2
---

[Ethereum](/) to sieć peer-to-peer z tysiącami węzłów, które muszą być w stanie komunikować się ze sobą za pomocą ustandaryzowanych protokołów. „Warstwa sieciowa” to stos protokołów, które pozwalają tym węzłom odnajdywać się nawzajem i wymieniać informacje. Obejmuje to „plotkowanie” informacji (komunikacja jeden-do-wielu) w sieci, a także wymianę żądań i odpowiedzi między określonymi węzłami (komunikacja jeden-do-jednego). Każdy węzeł musi przestrzegać określonych reguł sieciowych, aby upewnić się, że wysyła i odbiera prawidłowe informacje.

Oprogramowanie klienta składa się z dwóch części (klienty warstwy wykonawczej i klienty konsensusu), z których każda ma swój własny, odrębny stos sieciowy. Oprócz komunikacji z innymi węzłami Ethereum, klienty warstwy wykonawczej i konsensusu muszą komunikować się ze sobą. Ta strona zawiera wstępne wyjaśnienie protokołów, które umożliwiają tę komunikację.

Klienty warstwy wykonawczej plotkują o transakcjach w sieci peer-to-peer warstwy wykonawczej. Wymaga to szyfrowanej komunikacji między uwierzytelnionymi węzłami równorzędnymi. Kiedy walidator zostanie wybrany do zaproponowania bloku, transakcje z lokalnej puli transakcji węzła zostaną przekazane do klientów konsensusu za pośrednictwem lokalnego połączenia RPC, a następnie spakowane w bloki śledzące. Klienty konsensusu będą następnie plotkować o blokach śledzących w swojej sieci p2p. Wymaga to dwóch oddzielnych sieci p2p: jednej łączącej klienty warstwy wykonawczej w celu plotkowania o transakcjach i drugiej łączącej klienty konsensusu w celu plotkowania o blokach.

## Wymagania wstępne {#prerequisites}

Pewna wiedza na temat [węzłów i klientów](/developers/docs/nodes-and-clients/) Ethereum będzie pomocna w zrozumieniu tej strony.

## Warstwa wykonawcza {#execution-layer}

Protokoły sieciowe warstwy wykonawczej są podzielone na dwa stosy:

- stos odkrywania: zbudowany na bazie UDP i pozwala nowemu węzłowi znaleźć węzły równorzędne, z którymi może się połączyć

- stos devp2p: opiera się na TCP i umożliwia węzłom wymianę informacji

Oba stosy działają równolegle. Stos odkrywania wprowadza nowych uczestników do sieci, a stos devp2p umożliwia ich interakcje.

### Odkrywanie {#discovery}

Odkrywanie to proces znajdowania innych węzłów w sieci. Jest to inicjowane przy użyciu małego zestawu węzłów rozruchowych (węzłów, których adresy są [zakodowane na stałe](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) w kliencie, dzięki czemu można je natychmiast znaleźć i połączyć klienta z węzłami równorzędnymi). Te węzły rozruchowe istnieją tylko po to, aby przedstawić nowy węzeł zestawowi węzłów równorzędnych – to ich jedyny cel, nie uczestniczą w normalnych zadaniach klienta, takich jak synchronizacja łańcucha, i są używane tylko przy pierwszym uruchomieniu klienta.

Protokół używany do interakcji węzeł-węzeł rozruchowy to zmodyfikowana forma [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), która wykorzystuje [rozproszoną tablicę hashów](https://en.wikipedia.org/wiki/Distributed_hash_table) do udostępniania list węzłów. Każdy węzeł ma wersję tej tablicy zawierającą informacje wymagane do połączenia się z najbliższymi węzłami równorzędnymi. Ta „bliskość” nie jest geograficzna – odległość jest definiowana przez podobieństwo identyfikatora węzła. Tablica każdego węzła jest regularnie odświeżana w ramach funkcji bezpieczeństwa. Na przykład w protokole odkrywania [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) węzły mogą również wysyłać „reklamy” wyświetlające podprotokoły obsługiwane przez klienta, co pozwala węzłom równorzędnym na negocjowanie protokołów, których oba mogą używać do komunikacji.

Odkrywanie zaczyna się od gry w PING-PONG. Udany PING-PONG „wiąże” nowy węzeł z węzłem rozruchowym. Początkowa wiadomość, która ostrzega węzeł rozruchowy o istnieniu nowego węzła wchodzącego do sieci, to `PING`. Ten `PING` zawiera zahashowane informacje o nowym węźle, węźle rozruchowym i znaczniku czasu wygaśnięcia. Węzeł rozruchowy odbiera `PING` i zwraca `PONG` zawierający hash `PING`. Jeśli hashe `PING` i `PONG` pasują do siebie, połączenie między nowym węzłem a węzłem rozruchowym zostaje zweryfikowane i mówi się, że zostały „związane”.

Po związaniu nowy węzeł może wysłać żądanie `FIND-NEIGHBOURS` do węzła rozruchowego. Dane zwrócone przez węzeł rozruchowy obejmują listę węzłów równorzędnych, z którymi nowy węzeł może się połączyć. Jeśli węzły nie są związane, żądanie `FIND-NEIGHBOURS` nie powiedzie się, więc nowy węzeł nie będzie mógł wejść do sieci.

Gdy nowy węzeł otrzyma listę sąsiadów od węzła rozruchowego, rozpoczyna wymianę PING-PONG z każdym z nich. Udane PING-PONGi wiążą nowy węzeł z jego sąsiadami, umożliwiając wymianę wiadomości.

```
uruchom klienta --> połącz z węzłem rozruchowym --> zwiąż z węzłem rozruchowym --> znajdź sąsiadów --> zwiąż z sąsiadami
```

Klienty warstwy wykonawczej używają obecnie protokołu odkrywania [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) i trwają aktywne prace nad migracją do protokołu [discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Rekordy węzłów Ethereum (Ethereum Node Records) {#enr}

[Rekord węzła Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) to obiekt, który zawiera trzy podstawowe elementy: podpis (hash zawartości rekordu wykonany zgodnie z pewnym uzgodnionym schematem tożsamości), numer sekwencyjny, który śledzi zmiany w rekordzie, oraz dowolną listę par klucz:wartość. Jest to przyszłościowy format, który pozwala na łatwiejszą wymianę informacji identyfikacyjnych między nowymi węzłami równorzędnymi i jest preferowanym formatem [adresu sieciowego](/developers/docs/networking-layer/network-addresses) dla węzłów Ethereum.

#### Dlaczego odkrywanie jest oparte na UDP? {#why-udp}

UDP nie obsługuje żadnego sprawdzania błędów, ponownego wysyłania nieudanych pakietów ani dynamicznego otwierania i zamykania połączeń – zamiast tego po prostu wystrzeliwuje ciągły strumień informacji do celu, niezależnie od tego, czy zostanie on pomyślnie odebrany. Ta minimalna funkcjonalność przekłada się również na minimalny narzut, dzięki czemu tego rodzaju połączenie jest bardzo szybkie. W przypadku odkrywania, gdzie węzeł po prostu chce zaznaczyć swoją obecność, aby następnie nawiązać formalne połączenie z węzłem równorzędnym, UDP jest wystarczające. Jednak w przypadku reszty stosu sieciowego UDP nie spełnia swojego zadania. Wymiana informacji między węzłami jest dość złożona i dlatego wymaga bardziej w pełni funkcjonalnego protokołu, który może obsługiwać ponowne wysyłanie, sprawdzanie błędów itp. Dodatkowy narzut związany z TCP jest wart dodatkowej funkcjonalności. Dlatego większość stosu P2P działa w oparciu o TCP.

### devp2p {#devp2p}

devp2p to cały stos protokołów, które Ethereum implementuje w celu ustanowienia i utrzymania sieci peer-to-peer. Po wejściu nowych węzłów do sieci ich interakcje są regulowane przez protokoły w stosie [devp2p](https://github.com/ethereum/devp2p). Wszystkie one opierają się na TCP i obejmują protokół transportowy RLPx, protokół sieciowy (wire protocol) i kilka podprotokołów. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) to protokół zarządzający inicjowaniem, uwierzytelnianiem i utrzymywaniem sesji między węzłami. RLPx koduje wiadomości za pomocą RLP (Recursive Length Prefix), co jest bardzo oszczędną pod względem miejsca metodą kodowania danych w minimalną strukturę do wysyłania między węzłami.

Sesja RLPx między dwoma węzłami rozpoczyna się od początkowego kryptograficznego uścisku dłoni (handshake). Polega to na wysłaniu przez węzeł wiadomości uwierzytelniającej, która jest następnie weryfikowana przez węzeł równorzędny. Po pomyślnej weryfikacji węzeł równorzędny generuje wiadomość potwierdzającą uwierzytelnienie, aby zwrócić ją do węzła inicjującego. Jest to proces wymiany kluczy, który umożliwia węzłom prywatną i bezpieczną komunikację. Udany kryptograficzny uścisk dłoni powoduje następnie, że oba węzły wysyłają do siebie wiadomość „hello” „po kablu” (on the wire). Protokół sieciowy jest inicjowany przez udaną wymianę wiadomości hello.

Wiadomości hello zawierają:

- wersję protokołu
- identyfikator klienta
- port
- identyfikator węzła
- listę obsługiwanych podprotokołów

Są to informacje wymagane do udanej interakcji, ponieważ definiują, jakie możliwości są współdzielone między obydwoma węzłami i konfigurują komunikację. Istnieje proces negocjacji podprotokołów, w którym listy podprotokołów obsługiwanych przez każdy węzeł są porównywane, a te, które są wspólne dla obu węzłów, mogą być używane w sesji.

Wraz z wiadomościami hello protokół sieciowy może również wysłać wiadomość „disconnect”, która ostrzega węzeł równorzędny, że połączenie zostanie zamknięte. Protokół sieciowy obejmuje również wiadomości PING i PONG, które są wysyłane okresowo w celu utrzymania otwartej sesji. Wymiany RLPx i protokołu sieciowego ustanawiają zatem podstawy komunikacji między węzłami, zapewniając rusztowanie dla użytecznych informacji, które mają być wymieniane zgodnie z określonym podprotokołem.

### Podprotokoły {#sub-protocols}

#### Protokół sieciowy (Wire protocol) {#wire-protocol}

Po połączeniu węzłów równorzędnych i rozpoczęciu sesji RLPx protokół sieciowy definiuje sposób komunikacji między węzłami równorzędnymi. Początkowo protokół sieciowy definiował trzy główne zadania: synchronizację łańcucha, propagację bloku i wymianę transakcji. Jednak po przejściu Ethereum na dowód stawki (PoS), propagacja bloku i synchronizacja łańcucha stały się częścią warstwy konsensusu. Wymiana transakcji nadal leży w gestii klientów warstwy wykonawczej. Wymiana transakcji odnosi się do wymiany oczekujących transakcji między węzłami, tak aby budujący bloki mogli wybrać niektóre z nich do włączenia do następnego bloku. Szczegółowe informacje na temat tych zadań są dostępne [tutaj](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Klienty obsługujące te podprotokoły udostępniają je za pośrednictwem [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (lekki podprotokół Ethereum) {#les}

Jest to minimalny protokół do synchronizacji lekkich klientów. Tradycyjnie protokół ten był rzadko używany, ponieważ pełne węzły są zobowiązane do dostarczania danych do lekkich klientów bez żadnych zachęt. Domyślnym zachowaniem klientów warstwy wykonawczej jest niedostarczanie danych lekkiego klienta przez les. Więcej informacji można znaleźć w [specyfikacji](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

[Protokół snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) to opcjonalne rozszerzenie, które pozwala węzłom równorzędnym na wymianę migawek ostatnich stanów, umożliwiając im weryfikację danych konta i pamięci masowej bez konieczności pobierania pośrednich węzłów drzewa Merkle.

#### Wit (protokół świadka) {#wit}

[Protokół świadka](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) to opcjonalne rozszerzenie, które umożliwia wymianę świadków stanu między węzłami równorzędnymi, pomagając w synchronizacji klientów z wierzchołkiem łańcucha.

#### Whisper {#whisper}

Whisper był protokołem, którego celem było dostarczanie bezpiecznych wiadomości między węzłami równorzędnymi bez zapisywania jakichkolwiek informacji w blockchainie. Był częścią protokołu sieciowego devp2p, ale jest obecnie przestarzały. Istnieją inne [powiązane projekty](https://wakunetwork.com/) o podobnych celach.

## Warstwa konsensusu {#consensus-layer}

Klienty konsensusu uczestniczą w oddzielnej sieci peer-to-peer o innej specyfikacji. Klienty konsensusu muszą uczestniczyć w plotkowaniu o blokach, aby mogły otrzymywać nowe bloki od węzłów równorzędnych i transmitować je, gdy nadejdzie ich kolej na bycie proponującym blok. Podobnie jak w przypadku warstwy wykonawczej, wymaga to najpierw protokołu odkrywania, aby węzeł mógł znaleźć węzły równorzędne i ustanowić bezpieczne sesje do wymiany bloków, poświadczeń itp.

### Odkrywanie {#consensus-discovery}

Podobnie jak klienty warstwy wykonawczej, klienty konsensusu używają [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) przez UDP do znajdowania węzłów równorzędnych. Implementacja discv5 w warstwie konsensusu różni się od implementacji klientów warstwy wykonawczej tylko tym, że zawiera adapter łączący discv5 ze stosem [libp2p](https://libp2p.io/), wycofując devp2p. Sesje RLPx warstwy wykonawczej są wycofywane na rzecz bezpiecznego uścisku dłoni kanału noise w libp2p.

### ENR {#consensus-enr}

ENR dla węzłów konsensusu obejmuje klucz publiczny węzła, adres IP, porty UDP i TCP oraz dwa pola specyficzne dla konsensusu: pole bitowe podsieci poświadczeń i klucz `eth2`. To pierwsze ułatwia węzłom znajdowanie węzłów równorzędnych uczestniczących w określonych podsieciach plotkowania o poświadczeniach. Klucz `eth2` zawiera informacje o tym, której wersji rozwidlenia Ethereum używa węzeł, zapewniając, że węzły równorzędne łączą się z właściwym Ethereum.

### libp2p {#libp2p}

Stos libp2p obsługuje całą komunikację po odkrywaniu. Klienty mogą dzwonić i nasłuchiwać na IPv4 i/lub IPv6 zgodnie z definicją w ich ENR. Protokoły w warstwie libp2p można podzielić na domeny plotkowania (gossip) i żądań/odpowiedzi (req/resp).

### Plotkowanie (Gossip) {#gossip}

Domena plotkowania obejmuje wszystkie informacje, które muszą szybko rozprzestrzeniać się w sieci. Obejmuje to bloki śledzące, dowody, poświadczenia, wyjścia i cięcia (slashings). Jest to przesyłane przy użyciu libp2p gossipsub v1 i opiera się na różnych metadanych przechowywanych lokalnie w każdym węźle, w tym na maksymalnym rozmiarze ładunków plotkowania do odbierania i przesyłania. Szczegółowe informacje na temat domeny plotkowania są dostępne [tutaj](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Żądanie-odpowiedź (Request-response) {#request-response}

Domena żądanie-odpowiedź zawiera protokoły dla klientów żądających określonych informacji od swoich węzłów równorzędnych. Przykłady obejmują żądanie określonych bloków śledzących pasujących do określonych hashów głównych lub w zakresie slotów. Odpowiedzi są zawsze zwracane jako skompresowane algorytmem snappy bajty zakodowane w SSZ.

## Dlaczego klient konsensusu preferuje SSZ od RLP? {#ssz-vs-rlp}

SSZ oznacza prostą serializację (simple serialization). Wykorzystuje stałe przesunięcia, które ułatwiają dekodowanie poszczególnych części zakodowanej wiadomości bez konieczności dekodowania całej struktury, co jest bardzo przydatne dla klienta konsensusu, ponieważ może on skutecznie pobierać określone fragmenty informacji z zakodowanych wiadomości. Został również zaprojektowany specjalnie do integracji z protokołami Merkle, z powiązanym wzrostem wydajności dla merkleizacji. Ponieważ wszystkie hashe w warstwie konsensusu są korzeniami Merkle, składa się to na znaczną poprawę. SSZ gwarantuje również unikalne reprezentacje wartości.

## Łączenie klientów warstwy wykonawczej i konsensusu {#connecting-clients}

Zarówno klienty konsensusu, jak i warstwy wykonawczej działają równolegle. Muszą być połączone, aby klient konsensusu mógł dostarczać instrukcje do klienta warstwy wykonawczej, a klient warstwy wykonawczej mógł przekazywać pakiety transakcji do klienta konsensusu w celu włączenia ich do bloków śledzących. Komunikację między dwoma klientami można osiągnąć za pomocą lokalnego połączenia RPC. API znane jako [„Engine-API”](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) definiuje instrukcje wysyłane między dwoma klientami. Ponieważ oba klienty kryją się za jedną tożsamością sieciową, współdzielą ENR (rekord węzła Ethereum), który zawiera oddzielny klucz dla każdego klienta (klucz Eth1 i klucz Eth2).

Podsumowanie przepływu sterowania przedstawiono poniżej, z odpowiednim stosem sieciowym w nawiasach.

### Gdy klient konsensusu nie jest producentem bloku: {#when-consensus-client-is-not-block-producer}

- Klient konsensusu otrzymuje blok za pośrednictwem protokołu plotkowania o blokach (p2p konsensusu)
- Klient konsensusu wstępnie waliduje blok, tj. upewnia się, że dotarł od prawidłowego nadawcy z poprawnymi metadanymi
- Transakcje w bloku są wysyłane do warstwy wykonawczej jako ładunek wykonawczy (lokalne połączenie RPC)
- Warstwa wykonawcza wykonuje transakcje i waliduje stan w nagłówku bloku (tj. sprawdza, czy hashe się zgadzają)
- Warstwa wykonawcza przekazuje dane walidacji z powrotem do warstwy konsensusu, blok jest teraz uważany za zwalidowany (lokalne połączenie RPC)
- Warstwa konsensusu dodaje blok do wierzchołka własnego blockchaina i poświadcza go, transmitując poświadczenie w sieci (p2p konsensusu)

### Gdy klient konsensusu jest producentem bloku: {#when-consensus-client-is-block-producer}

- Klient konsensusu otrzymuje powiadomienie, że jest następnym producentem bloku (p2p konsensusu)
- Warstwa konsensusu wywołuje metodę `create block` w kliencie warstwy wykonawczej (lokalne RPC)
- Warstwa wykonawcza uzyskuje dostęp do mempoola transakcji, który został wypełniony przez protokół plotkowania o transakcjach (p2p warstwy wykonawczej)
- Klient warstwy wykonawczej pakuje transakcje w blok, wykonuje transakcje i generuje hash bloku
- Klient konsensusu pobiera transakcje i hash bloku od klienta warstwy wykonawczej i dodaje je do bloku śledzącego (lokalne RPC)
- Klient konsensusu transmituje blok za pośrednictwem protokołu plotkowania o blokach (p2p konsensusu)
- Inne klienty otrzymują zaproponowany blok za pośrednictwem protokołu plotkowania o blokach i walidują go w sposób opisany powyżej (p2p konsensusu)

Gdy blok zostanie poświadczony przez wystarczającą liczbę walidatorów, jest dodawany do wierzchołka łańcucha, uzasadniony i ostatecznie sfinalizowany.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Schemat warstwy sieciowej dla klientów konsensusu i warstwy wykonawczej, z [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Dalsza lektura {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[Specyfikacje sieciowe warstwy konsensusu](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[Od Kademlia do discv5](https://vac.dev/kademlia-to-discv5)
[Praca naukowa o Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Wprowadzenie do p2p Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Relacja Eth1/Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Wideo ze szczegółami połączenia (Merge) i klienta Eth2](https://www.youtube.com/watch?v=zNIrIninMgg)